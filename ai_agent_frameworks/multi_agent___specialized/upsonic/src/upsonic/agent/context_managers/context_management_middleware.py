from __future__ import annotations

import json
from typing import TYPE_CHECKING, Any, List, Literal, Optional, Union
from upsonic.messages.messages import ModelMessage

from pydantic import BaseModel, Field

if TYPE_CHECKING:
    from upsonic.messages.messages import ModelMessage, ModelResponse
    from upsonic.models import Model


CONTEXT_FULL_MESSAGE: str = (
    "[SYSTEM] The conversation context window has been exceeded. "
    "I am unable to process further messages in this session. "
    "Please start a new conversation or reduce the context size."
)

DEFAULT_KEEP_RECENT_COUNT: int = 5


class SummarizedRequestPart(BaseModel):
    """A single part inside a summarized ModelRequest."""
    part_kind: Literal["system-prompt", "user-prompt", "tool-return"] = Field(
        description="The type of part: 'system-prompt', 'user-prompt', or 'tool-return'."
    )
    content: str = Field(
        description="The text content for this part."
    )
    tool_name: Optional[str] = Field(
        default=None,
        description="Tool name (required when part_kind is 'tool-return')."
    )
    tool_call_id: Optional[str] = Field(
        default=None,
        description="Tool call ID linking a tool-return to its tool-call (required when part_kind is 'tool-return')."
    )


class SummarizedResponsePart(BaseModel):
    """A single part inside a summarized ModelResponse."""
    part_kind: Literal["text", "tool-call"] = Field(
        description="The type of part: 'text' for assistant text, 'tool-call' for a tool invocation."
    )
    content: Optional[str] = Field(
        default=None,
        description="The text content (required when part_kind is 'text')."
    )
    tool_name: Optional[str] = Field(
        default=None,
        description="Tool name (required when part_kind is 'tool-call')."
    )
    tool_call_id: Optional[str] = Field(
        default=None,
        description="Tool call identifier (required when part_kind is 'tool-call')."
    )
    args: Optional[str] = Field(
        default=None,
        description="Tool call arguments as a JSON string (required when part_kind is 'tool-call')."
    )


class SummarizedRequest(BaseModel):
    """A summarized ModelRequest (user/system → model)."""
    kind: Literal["request"] = "request"
    parts: List[SummarizedRequestPart] = Field(
        description="Ordered list of parts in this request."
    )


class SummarizedResponse(BaseModel):
    """A summarized ModelResponse (model → user)."""
    kind: Literal["response"] = "response"
    parts: List[SummarizedResponsePart] = Field(
        description="Ordered list of parts in this response."
    )


class ConversationSummary(BaseModel):
    """The complete summarized conversation returned by the LLM."""
    messages: List[Union[SummarizedRequest, SummarizedResponse]] = Field(
        description=(
            "Ordered list of summarized messages. "
            "Must alternate between 'request' and 'response' kinds. "
            "The first message must be a 'request'."
        )
    )



SUMMARY_SYSTEM_PROMPT: str = """\
You are a conversation summarizer. You will receive a structured conversation \
and must return a CONDENSED version of it as valid JSON matching the schema below.

CRITICAL RULES — STRUCTURE PRESERVATION:
1. You MUST output the EXACT same number of messages as the input. \
   Do NOT merge, drop, or reorder any messages.
2. You MUST output the EXACT same number and types of parts within each message \
   in the same order. Do NOT merge, drop, or reorder parts.
3. Preserve the request/response alternation order exactly as given.

CONTENT RULES — WHAT TO CONDENSE:
4. For user-prompt text: condense into a concise summary preserving key intent, \
   facts, and constraints. Make it shorter, not different.
5. For assistant text parts: condense into a concise summary preserving key facts, \
   decisions, outcomes, and data. Make it shorter, not different.
6. Keep system prompts COMPLETELY intact — do NOT modify them at all.

TOOL RULES — WHAT TO PRESERVE EXACTLY:
7. Keep every tool-call part EXACTLY as-is: copy tool_name, tool_call_id, \
   and args unchanged. Do NOT modify or omit any tool-call.
8. Keep every tool-return part: copy tool_name and tool_call_id EXACTLY as-is. \
   You may lightly condense the content text but preserve all key data and values.
9. Every tool-return MUST have a matching tool-call with the same tool_call_id \
   in a preceding response.

OUTPUT:
10. Return ONLY the JSON object. No markdown fences, no extra text.

JSON SCHEMA:
{schema}
"""


_LOG_CONTEXT: str = "ContextManagement"


class ContextManagementMiddleware:
    """Middleware that manages context window overflow for agent conversations.

    When the message history exceeds the model's maximum context window,
    this middleware applies a series of strategies in order:

    1. Prune old tool call/return pairs, keeping only the last ``keep_recent_count``.
    2. Summarize old messages via the LLM into properly structured
       ModelRequest / ModelResponse objects.
    3. If the context is still full after all strategies, inject a fixed
       "context full" response and stop further processing.

    An optional ``context_compression_model`` can be provided to use a
    different (typically higher-context-window) model specifically for
    the summarization step, while still using the agent's primary model
    for context-window limit checks.
    """

    def __init__(
        self,
        model: "Model",
        keep_recent_count: int = DEFAULT_KEEP_RECENT_COUNT,
        safety_margin_ratio: float = 0.90,
        context_compression_model: Optional["Model"] = None,
    ) -> None:
        """
        Args:
            model: The Model instance, used for token counting and context window lookup.
            keep_recent_count: Number of recent conversation pairs
                (ModelRequest + ModelResponse) or tool interaction rounds
                (ToolCallPart + ToolReturnPart) to preserve when pruning
                or summarizing (default 5).
            safety_margin_ratio: Use this fraction of the max context window as
                the effective limit (default 0.90 = 90%).
            context_compression_model: Optional separate Model instance with a
                larger context window to use for the summarization LLM call.
                If None, the primary ``model`` is used for summarization.
        """
        self.model: "Model" = model
        self.keep_recent_count: int = keep_recent_count
        self.safety_margin_ratio: float = safety_margin_ratio
        self.context_compression_model: Optional["Model"] = context_compression_model
        self._last_summarization_usage: Optional[Any] = None

    def _get_summarization_model(self) -> "Model":
        """Return the model to use for the summarization LLM call."""
        if self.context_compression_model is not None:
            return self.context_compression_model
        return self.model

    def _get_max_context_window(self) -> Optional[int]:
        """Get the max context window for the current model."""
        from upsonic.utils.usage import get_model_context_window

        model_name: str = self.model.model_name
        return get_model_context_window(model_name)

    def _estimate_message_tokens(self, messages: List["ModelMessage"]) -> int:
        """Estimate the total token count of the conversation.

        The ``messages`` list may span multiple agent runs. Each
        ``ModelResponse`` carries a ``usage`` field (``RequestUsage``)
        whose ``input_tokens`` reflects the input context sent to the
        model for *that particular turn*, and ``output_tokens`` reflects
        the tokens the model generated in that turn.

        Because the list can contain responses from different runs,
        we accumulate **all** ``input_tokens`` and **all**
        ``output_tokens`` across every ``ModelResponse`` to get the
        total token footprint of the conversation.

        Falls back to a character-based heuristic (~4 chars/token) when no
        ``ModelResponse`` with usage data exists in the message list.
        """
        from upsonic.messages import ModelResponse

        total_input_tokens: int = 0
        total_output_tokens: int = 0
        has_usage: bool = False

        for message in messages:
            if isinstance(message, ModelResponse) and hasattr(message, 'usage'):
                usage = message.usage
                if usage.input_tokens > 0 or usage.output_tokens > 0:
                    has_usage = True
                    total_input_tokens += usage.input_tokens
                    total_output_tokens += usage.output_tokens

        if has_usage:
            return total_input_tokens + total_output_tokens

        total_chars: int = 0
        for message in messages:
            if hasattr(message, 'parts'):
                for part in message.parts:
                    if hasattr(part, 'content'):
                        content = part.content
                        if isinstance(content, str):
                            total_chars += len(content)
                        elif isinstance(content, (dict, list)):
                            total_chars += len(json.dumps(content, default=str))
                        else:
                            total_chars += len(str(content))
                    if hasattr(part, 'tool_name'):
                        total_chars += len(str(getattr(part, 'tool_name', '')))
                    if hasattr(part, 'args'):
                        args = getattr(part, 'args', '')
                        if isinstance(args, str):
                            total_chars += len(args)
                        elif isinstance(args, dict):
                            total_chars += len(json.dumps(args, default=str))
        return total_chars // 4

    def _is_context_exceeded(self, messages: List["ModelMessage"]) -> bool:
        """Check if the current messages exceed the model's context window."""
        max_window: Optional[int] = self._get_max_context_window()
        if max_window is None:
            return False

        effective_limit: int = int(max_window * self.safety_margin_ratio)
        estimated_tokens: int = self._estimate_message_tokens(messages)
        return estimated_tokens > effective_limit

    def _has_tool_related_messages(self, messages: List["ModelMessage"]) -> bool:
        """Check whether the message list contains any tool call or tool return parts."""
        from upsonic.messages import ToolCallPart, ToolReturnPart

        for msg in messages:
            if not hasattr(msg, 'parts'):
                continue
            for part in msg.parts:
                if isinstance(part, (ToolCallPart, ToolReturnPart)):
                    return True
        return False

    def _group_into_conversation_pairs(
        self,
        messages: List["ModelMessage"],
    ) -> List[tuple["ModelMessage", ...]]:
        """Group messages into conversation turn pairs.

        A pair is ``(ModelRequest, ModelResponse)`` when they appear
        consecutively in the list.  Any lone / unpaired message becomes
        a single-element tuple so the caller can always iterate uniformly.
        """
        from upsonic.messages import ModelRequest, ModelResponse

        pairs: List[tuple["ModelMessage", ...]] = []
        i: int = 0
        while i < len(messages):
            if (
                i + 1 < len(messages)
                and isinstance(messages[i], ModelRequest)
                and isinstance(messages[i + 1], ModelResponse)
            ):
                pairs.append((messages[i], messages[i + 1]))
                i += 2
            else:
                pairs.append((messages[i],))
                i += 1
        return pairs

    def _identify_tool_rounds(
        self,
        messages: List["ModelMessage"],
    ) -> List[tuple[int, int]]:
        """Identify tool interaction rounds as pairs of message indices.

        A tool round is a consecutive pair of:
        - ``messages[resp_idx]``: a ``ModelResponse`` containing ``ToolCallPart``(s)
        - ``messages[req_idx]``:  the immediately following ``ModelRequest``
          containing matching ``ToolReturnPart``(s) or ``RetryPromptPart``(s).

        Returns:
            Ordered list of ``(response_idx, request_idx)`` tuples.
        """
        from upsonic.messages import (
            ModelRequest,
            ModelResponse,
            RetryPromptPart,
            ToolCallPart,
            ToolReturnPart,
        )

        rounds: List[tuple[int, int]] = []

        for i in range(len(messages) - 1):
            msg: "ModelMessage" = messages[i]
            next_msg: "ModelMessage" = messages[i + 1]

            if not isinstance(msg, ModelResponse) or not isinstance(next_msg, ModelRequest):
                continue

            tool_call_ids: set[str] = {
                part.tool_call_id
                for part in msg.parts
                if isinstance(part, ToolCallPart)
            }

            if not tool_call_ids:
                continue

            has_matching_return: bool = any(
                isinstance(part, (ToolReturnPart, RetryPromptPart))
                and getattr(part, 'tool_call_id', None) in tool_call_ids
                for part in next_msg.parts
            )

            if has_matching_return:
                rounds.append((i, i + 1))

        return rounds

    def _prune_tool_call_history(
        self,
        messages: List["ModelMessage"],
    ) -> List["ModelMessage"]:
        """Remove old tool interaction rounds, keeping the most recent ones.

        A tool round is a paired ``(ModelResponse`` with ``ToolCallPart``\\s,
        ``ModelRequest`` with matching ``ToolReturnPart``\\s /
        ``RetryPromptPart``\\s).

        ``keep_recent_count`` determines how many recent *rounds* to
        preserve.  Old rounds have their tool-related parts removed; if
        a message has no remaining parts after removal it is dropped
        entirely.
        """
        from dataclasses import replace

        from upsonic.messages import (
            ModelRequest,
            ModelResponse,
            RetryPromptPart,
            ToolCallPart,
            ToolReturnPart,
        )

        rounds: List[tuple[int, int]] = self._identify_tool_rounds(messages)

        print(f"\n  [PRUNE] Identified {len(rounds)} tool round(s), keep_recent_count={self.keep_recent_count}")

        if len(rounds) <= self.keep_recent_count:
            print(f"  [PRUNE] No pruning needed ({len(rounds)} <= {self.keep_recent_count})")
            return list(messages)

        old_rounds: List[tuple[int, int]] = (
            rounds if self.keep_recent_count == 0
            else rounds[:-self.keep_recent_count]
        )
        print(f"  [PRUNE] Will remove {len(old_rounds)} old round(s), keep {self.keep_recent_count} recent")

        stale_ids_by_msg: dict[int, set[str]] = {}
        for resp_idx, req_idx in old_rounds:
            resp_msg: "ModelMessage" = messages[resp_idx]
            tool_ids: set[str] = {
                part.tool_call_id
                for part in resp_msg.parts  # type: ignore[union-attr]
                if isinstance(part, ToolCallPart)
            }
            stale_ids_by_msg.setdefault(resp_idx, set()).update(tool_ids)
            stale_ids_by_msg.setdefault(req_idx, set()).update(tool_ids)

        result: List["ModelMessage"] = []
        for i, msg in enumerate(messages):
            if i not in stale_ids_by_msg:
                result.append(msg)
                continue

            stale_ids: set[str] = stale_ids_by_msg[i]

            if isinstance(msg, ModelResponse):
                remaining_parts = [
                    p for p in msg.parts
                    if not (isinstance(p, ToolCallPart) and p.tool_call_id in stale_ids)
                ]
            elif isinstance(msg, ModelRequest):
                remaining_parts = [
                    p for p in msg.parts
                    if not (
                        isinstance(p, (ToolReturnPart, RetryPromptPart))
                        and getattr(p, 'tool_call_id', None) in stale_ids
                    )
                ]
            else:
                result.append(msg)
                continue

            if remaining_parts:
                result.append(replace(msg, parts=remaining_parts))

        print(f"  [PRUNE] Before: {len(messages)} messages → After: {len(result)} messages (removed {len(messages) - len(result)})")
        return result


    def _serialize_messages_for_prompt(
        self,
        messages: List["ModelMessage"],
    ) -> str:
        """Serialize a list of ModelMessage objects into a human-readable
        structured text representation for the LLM prompt.
        """
        from upsonic.messages import (
            ModelRequest,
            ModelResponse,
            SystemPromptPart,
            TextPart,
            ToolCallPart,
            ToolReturnPart,
            UserPromptPart,
        )

        lines: List[str] = []
        for idx, msg in enumerate(messages):
            if isinstance(msg, ModelRequest):
                lines.append(f"MESSAGE {idx + 1} [REQUEST]:")
                for p_idx, part in enumerate(msg.parts):
                    prefix = f"  Part {p_idx + 1}"
                    if isinstance(part, SystemPromptPart):
                        lines.append(f"{prefix} [system-prompt]: {part.content}")
                    elif isinstance(part, UserPromptPart):
                        content_str = part.content if isinstance(part.content, str) else str(part.content)
                        lines.append(f"{prefix} [user-prompt]: {content_str}")
                    elif isinstance(part, ToolReturnPart):
                        content_str = part.content if isinstance(part.content, str) else json.dumps(part.content, default=str)
                        lines.append(
                            f"{prefix} [tool-return] tool_name={part.tool_name} "
                            f"tool_call_id={part.tool_call_id}: {content_str}"
                        )
                    else:
                        lines.append(f"{prefix} [unknown-request-part]: {part}")
            elif isinstance(msg, ModelResponse):
                lines.append(f"MESSAGE {idx + 1} [RESPONSE]:")
                for p_idx, part in enumerate(msg.parts):
                    prefix = f"  Part {p_idx + 1}"
                    if isinstance(part, TextPart):
                        lines.append(f"{prefix} [text]: {part.content}")
                    elif isinstance(part, ToolCallPart):
                        args_str = part.args if isinstance(part.args, str) else json.dumps(part.args, default=str)
                        lines.append(
                            f"{prefix} [tool-call] tool_name={part.tool_name} "
                            f"tool_call_id={part.tool_call_id} args={args_str}"
                        )
                    else:
                        lines.append(f"{prefix} [other-response-part]: {part}")
            else:
                lines.append(f"MESSAGE {idx + 1} [UNKNOWN]: {msg}")

        return "\n".join(lines)

    def _reconstruct_messages(
        self,
        summary: ConversationSummary,
    ) -> List["ModelMessage"]:
        """Reconstruct proper ModelRequest / ModelResponse objects from
        the Pydantic ``ConversationSummary`` returned by the LLM.
        """
        from upsonic.messages import (
            ModelRequest,
            ModelResponse,
            SystemPromptPart,
            TextPart,
            ToolCallPart,
            ToolReturnPart,
            UserPromptPart,
        )
        from upsonic._utils import now_utc

        reconstructed: List["ModelMessage"] = []

        for msg in summary.messages:
            if msg.kind == "request":
                parts: List[Any] = []
                for p in msg.parts:
                    if p.part_kind == "system-prompt":
                        parts.append(SystemPromptPart(content=p.content))
                    elif p.part_kind == "user-prompt":
                        parts.append(UserPromptPart(content=p.content))
                    elif p.part_kind == "tool-return":
                        parts.append(ToolReturnPart(
                            tool_name=p.tool_name or "",
                            content=p.content,
                            tool_call_id=p.tool_call_id or "",
                        ))
                if parts:
                    reconstructed.append(ModelRequest(parts=parts, timestamp=now_utc()))

            elif msg.kind == "response":
                parts_resp: List[Any] = []
                for p in msg.parts:
                    if p.part_kind == "text":
                        parts_resp.append(TextPart(content=p.content or ""))
                    elif p.part_kind == "tool-call":
                        parts_resp.append(ToolCallPart(
                            tool_name=p.tool_name or "",
                            args=p.args,
                            tool_call_id=p.tool_call_id or "",
                        ))
                if parts_resp:
                    has_tool_calls: bool = any(
                        isinstance(p, ToolCallPart) for p in parts_resp
                    )
                    reconstructed.append(ModelResponse(
                        parts=parts_resp,
                        model_name=self.model.model_name,
                        timestamp=now_utc(),
                        finish_reason='tool_call' if has_tool_calls else 'stop',
                    ))

        return reconstructed

    def _merge_system_parts_into_result(
        self,
        system_parts: List[Any],
        messages: List["ModelMessage"],
    ) -> List["ModelMessage"]:
        """Re-merge extracted SystemPromptParts into the first ModelRequest.

        When the first message of a conversation contains both
        SystemPromptPart and UserPromptPart, we split them for proper
        pair-based summarization.  This method puts the SystemPromptParts
        back at the front of the first ModelRequest so the output
        structure matches what the model providers expect.
        """
        from dataclasses import replace
        from upsonic.messages import ModelRequest

        if not system_parts:
            return list(messages)

        result: List["ModelMessage"] = list(messages)
        if result and isinstance(result[0], ModelRequest):
            merged_parts: List[Any] = system_parts + list(result[0].parts)
            result[0] = replace(result[0], parts=merged_parts)
        else:
            result.insert(0, ModelRequest(parts=system_parts))

        return result

    async def _summarize_old_messages(
        self,
        messages: List["ModelMessage"],
    ) -> List["ModelMessage"]:
        """Summarize old messages via the LLM into structured ModelRequest /
        ModelResponse objects, keeping the last ``self.keep_recent_count``
        *conversation pairs* (``ModelRequest`` + ``ModelResponse``) verbatim.

        Uses the ``context_compression_model`` if set, otherwise falls
        back to the primary agent model.

        Args:
            messages: The full message list.

        Returns:
            A new list with old messages replaced by LLM-summarized messages.
        """
        from upsonic.messages import (
            ModelRequest,
            SystemPromptPart,
            UserPromptPart,
        )
        from upsonic.utils.printing import info_log

        if len(messages) <= self.keep_recent_count:
            return list(messages)

        system_parts: List[Any] = []
        non_system_messages: List["ModelMessage"] = []

        for i, msg in enumerate(messages):
            if i == 0 and isinstance(msg, ModelRequest):
                sys_p: List[Any] = [
                    p for p in msg.parts if isinstance(p, SystemPromptPart)
                ]
                non_sys_p: List[Any] = [
                    p for p in msg.parts if not isinstance(p, SystemPromptPart)
                ]
                if sys_p:
                    system_parts = sys_p
                    if non_sys_p:
                        non_system_messages.append(ModelRequest(parts=non_sys_p))
                    continue
            non_system_messages.append(msg)

        conversation_pairs: List[tuple["ModelMessage", ...]] = (
            self._group_into_conversation_pairs(non_system_messages)
        )

        if len(conversation_pairs) <= self.keep_recent_count:
            return list(messages)

        old_pairs: List[tuple["ModelMessage", ...]] = conversation_pairs[:-self.keep_recent_count]
        recent_pairs: List[tuple["ModelMessage", ...]] = conversation_pairs[-self.keep_recent_count:]

        old_messages: List["ModelMessage"] = [msg for pair in old_pairs for msg in pair]
        recent_messages: List["ModelMessage"] = [msg for pair in recent_pairs for msg in pair]

        print(f"\n  [SUMMARIZE] Conversation pairs: {len(conversation_pairs)} total")
        print(f"  [SUMMARIZE] Old pairs to summarize: {len(old_pairs)} ({len(old_messages)} messages)")
        print(f"  [SUMMARIZE] Recent pairs kept verbatim: {len(recent_pairs)} ({len(recent_messages)} messages)")
        print(f"  [SUMMARIZE] System parts preserved: {len(system_parts)}")

        serialized_conversation: str = self._serialize_messages_for_prompt(old_messages)

        if not serialized_conversation.strip():
            return self._merge_system_parts_into_result(
                system_parts, recent_messages
            )

        schema_json: str = json.dumps(
            ConversationSummary.model_json_schema(), indent=2
        )
        system_instruction: str = SUMMARY_SYSTEM_PROMPT.format(schema=schema_json)

        summary_prompt: str = (
            f"<conversation>\n{serialized_conversation}\n</conversation>"
        )

        from upsonic.models import ModelRequestParameters

        request_msg = ModelRequest(parts=[
            SystemPromptPart(content=system_instruction),
            UserPromptPart(content=summary_prompt),
        ])
        model_params = ModelRequestParameters(
            function_tools=[],
            allow_text_output=True,
            output_tools=[],
        )

        from upsonic.messages import TextPart

        summarization_model: "Model" = self._get_summarization_model()

        info_log(
            f"Summarizing {len(old_messages)} old messages using model "
            f"'{summarization_model.model_name}' (keeping {len(recent_messages)} recent)",
            context=_LOG_CONTEXT,
        )

        try:
            llm_response: "ModelResponse" = await summarization_model.request(
                messages=[request_msg],
                model_settings=summarization_model.settings,
                model_request_parameters=model_params,
            )
            # Store usage from the summarization LLM call for parent context aggregation
            if hasattr(llm_response, 'usage') and llm_response.usage:
                self._last_summarization_usage = llm_response.usage
        except Exception as exc:
            from upsonic.utils.printing import warning_log
            warning_log(
                f"Summarization LLM call failed ({type(exc).__name__}: {exc}). "
                f"Returning original messages without summarization.",
                context=_LOG_CONTEXT,
            )
            return list(messages)

        raw_text: str = ""
        for part in llm_response.parts:
            if isinstance(part, TextPart):
                raw_text += part.content

        raw_text = raw_text.strip()
        if raw_text.startswith("```"):
            first_newline = raw_text.find("\n")
            if first_newline != -1:
                raw_text = raw_text[first_newline + 1:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3].strip()

        try:
            summary: ConversationSummary = ConversationSummary.model_validate_json(raw_text)
        except Exception as exc:
            from upsonic.utils.printing import warning_log
            warning_log(
                f"Failed to parse summarization response ({type(exc).__name__}: {exc}). "
                f"Returning original messages without summarization.",
                context=_LOG_CONTEXT,
            )
            return list(messages)

        summarized_messages: List["ModelMessage"] = self._reconstruct_messages(summary)

        if not summarized_messages:
            info_log(
                "Summarization produced no messages; falling back to recent messages only",
                context=_LOG_CONTEXT,
            )
            return self._merge_system_parts_into_result(
                system_parts, recent_messages
            )

        info_log(
            f"Summarization complete: {len(old_messages)} old messages → "
            f"{len(summarized_messages)} summarized messages",
            context=_LOG_CONTEXT,
        )

        combined: List["ModelMessage"] = summarized_messages + recent_messages
        result: List["ModelMessage"] = self._merge_system_parts_into_result(
            system_parts, combined
        )
        print(f"  [SUMMARIZE] Result: {len(system_parts)} system parts merged + {len(summarized_messages)} summarized + {len(recent_messages)} recent = {len(result)} total")
        return result



    def _build_context_full_response(
        self,
        model_name: Optional[str] = None,
    ) -> "ModelResponse":
        """Build a fixed ModelResponse indicating the context window is full."""
        from upsonic._utils import now_utc
        from upsonic.messages import ModelResponse, TextPart

        return ModelResponse(
            parts=[TextPart(content=CONTEXT_FULL_MESSAGE)],
            model_name=model_name,
            timestamp=now_utc(),
            finish_reason="length",
        )

    async def apply(
        self,
        messages: List["ModelMessage"],
    ) -> tuple[List["ModelMessage"], bool]:
        """Apply context management strategies to messages.

        Checks if the context window is exceeded and applies strategies in order:
        1. If tool calls exist, prune old tool call history first.
        2. Summarize old messages via LLM (independent of whether pruning occurred).
        3. If still exceeded, return a context_full flag.

        Args:
            messages: The current message list (will NOT be mutated).

        Returns:
            A tuple of (processed_messages, context_full).
            If context_full is True, the caller should stop processing and
            return a context-full response.
        """
        from upsonic.utils.printing import info_log

        if not self._is_context_exceeded(messages):
            print("\n" + "=" * 80)
            print(f"[CTX] Context NOT exceeded - no action needed ({len(messages)} messages)")
            print("=" * 80)
            return list(messages), False

        estimated_tokens: int = self._estimate_message_tokens(messages)
        max_window: Optional[int] = self._get_max_context_window()
        effective_limit: int = int(max_window * self.safety_margin_ratio)

        print("\n" + "=" * 80)
        print("[CTX] CONTEXT WINDOW EXCEEDED")
        print(f"[CTX]   Messages: {len(messages)}")
        print(f"[CTX]   Estimated tokens: {estimated_tokens:,}")
        print(f"[CTX]   Model window: {max_window:,}")
        print(f"[CTX]   Safety margin: {self.safety_margin_ratio}")
        print(f"[CTX]   Effective limit: {effective_limit:,}")
        print(f"[CTX]   Over by: {estimated_tokens - effective_limit:,} tokens")
        print("=" * 80)

        info_log(
            f"Context window exceeded: ~{estimated_tokens:,} tokens estimated, "
            f"limit {int(max_window * self.safety_margin_ratio):,} "
            f"(model window {max_window:,} × {self.safety_margin_ratio}). "
            f"Applying compression strategies...",
            context=_LOG_CONTEXT,
        )

        current_messages: List["ModelMessage"] = list(messages)

        # Step 1: Prune tool call history (only if tool calls exist)
        has_tools: bool = self._has_tool_related_messages(current_messages)
        if has_tools:
            pruned: List["ModelMessage"] = self._prune_tool_call_history(current_messages)
            pruned_count: int = len(current_messages) - len(pruned)
            if pruned_count > 0:
                info_log(
                    f"Step 1 — Tool pruning: removed {pruned_count} messages from old tool "
                    f"interaction rounds (kept {self.keep_recent_count} recent rounds)",
                    context=_LOG_CONTEXT,
                )
                current_messages = pruned

                if not self._is_context_exceeded(current_messages):
                    remaining: int = self._estimate_message_tokens(current_messages)
                    print("\n[CTX] RESOLVED by Step 1 (tool pruning)")
                    print(f"[CTX]   Tokens after pruning: {remaining:,} (limit: {effective_limit:,})")
                    print("=" * 80 + "\n")
                    info_log(
                        "Context within limits after tool pruning. No further action needed.",
                        context=_LOG_CONTEXT,
                    )
                    return current_messages, False
            else:
                info_log(
                    f"Step 1 — Tool pruning: no old tool rounds to remove "
                    f"(tool rounds within keep_recent_count={self.keep_recent_count})",
                    context=_LOG_CONTEXT,
                )
        else:
            info_log(
                "Step 1 — Tool pruning: skipped (no tool call/return parts in messages)",
                context=_LOG_CONTEXT,
            )

        # Step 2: Summarize old messages via LLM
        info_log(
            "Step 2 — Summarizing old messages via LLM...",
            context=_LOG_CONTEXT,
        )
        summarized: List["ModelMessage"] = await self._summarize_old_messages(current_messages)

        if not self._is_context_exceeded(summarized):
            remaining_after_summary: int = self._estimate_message_tokens(summarized)
            print("\n[CTX] RESOLVED by Step 2 (summarization)")
            print(f"[CTX]   Tokens after summarization: {remaining_after_summary:,} (limit: {effective_limit:,})")
            print(f"[CTX]   Messages: {len(summarized)}")
            print("=" * 80 + "\n")
            info_log(
                "Context within limits after summarization. Compression successful.",
                context=_LOG_CONTEXT,
            )
            return summarized, False

        # Step 3: Context is still full — signal to caller
        remaining_tokens: int = self._estimate_message_tokens(summarized)
        print("\n[CTX] Step 3 — CONTEXT FULL (all strategies exhausted)")
        print(f"[CTX]   Tokens remaining: {remaining_tokens:,} (limit: {effective_limit:,})")
        print(f"[CTX]   Still over by: {remaining_tokens - effective_limit:,} tokens")
        print(f"[CTX]   Messages: {len(summarized)}")
        print("=" * 80 + "\n")
        info_log(
            f"Step 3 — Context still exceeded after all strategies: "
            f"~{remaining_tokens:,} tokens remaining vs limit "
            f"{int(max_window * self.safety_margin_ratio):,}. Signaling context_full.",
            context=_LOG_CONTEXT,
        )
        return summarized, True
