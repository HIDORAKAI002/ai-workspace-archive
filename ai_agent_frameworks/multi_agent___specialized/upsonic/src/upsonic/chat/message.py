"""Developer-friendly ChatMessage representation.

This module provides ChatMessage - a clean, developer-friendly interface for
accessing message content without exposing internal ModelMessage complexity.

Key Design Principle:
    ChatMessage is ONLY for developer-facing display. Internal logic should
    use ModelMessage from session.messages in storage. ChatMessage is created
    on-demand when users access chat history.
"""
from __future__ import annotations

import time
from dataclasses import dataclass
from typing import TYPE_CHECKING, Any, Dict, List, Literal, Optional, Sequence

if TYPE_CHECKING:
    from upsonic.messages.messages import (
        ModelMessage,
        ModelRequest,
        ModelResponse,
    )


@dataclass
class ChatAttachment:
    """
    Represents an attachment in a chat message.
    
    Attachments can be images, PDFs, audio, video, or other binary content.
    
    Attributes:
        type: The type of attachment (image, audio, document, video, binary)
        identifier: The URL, path, or identifier of the attachment
        media_type: Optional MIME type for the attachment
        index: The index of this attachment within the message (for manipulation)
    """
    type: str
    identifier: str
    media_type: Optional[str] = None
    index: int = 0
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        result: Dict[str, Any] = {
            "type": self.type,
            "identifier": self.identifier,
            "index": self.index,
        }
        if self.media_type:
            result["media_type"] = self.media_type
        return result


@dataclass
class ChatMessage:
    """
    Developer-friendly representation of a chat message.
    
    This class provides a clean interface for accessing message content
    and metadata without exposing the internal ModelMessage complexity.
    
    Usage:
        # Get messages from chat (automatically converts from storage)
        messages = chat.all_messages
        
        for msg in messages:
            print(f"{msg.role}: {msg.content}")
            if msg.attachments:
                for att in msg.attachments:
                    print(f"  Attachment: {att.type} - {att.identifier}")
    
    Attributes:
        content: The text content of the message
        role: Either "user" or "assistant"
        timestamp: Unix timestamp when the message was created
        attachments: Optional list of attachments (images, PDFs, etc.)
        tool_calls: Optional list of tool call information
        metadata: Optional additional metadata
        message_index: The index of this message in the session (for manipulation)
    """
    content: str
    role: Literal["user", "assistant"]
    timestamp: float
    attachments: Optional[List[ChatAttachment]] = None
    tool_calls: Optional[List[Dict[str, Any]]] = None
    metadata: Optional[Dict[str, Any]] = None
    message_index: int = -1
    
    @classmethod
    def from_model_message(
        cls,
        message: "ModelMessage",
        message_index: int = -1
    ) -> "ChatMessage":
        """
        Create a ChatMessage from a single ModelMessage.
        
        Handles both ModelRequest (user messages) and ModelResponse (assistant messages).
        
        Args:
            message: A ModelMessage (ModelRequest or ModelResponse)
            message_index: The index of this message in the session
            
        Returns:
            ChatMessage representation with message_index set
        """
        from upsonic.messages.messages import ModelRequest, ModelResponse
        
        if isinstance(message, ModelRequest):
            return cls._from_model_request(message, message_index)
        elif isinstance(message, ModelResponse):
            return cls._from_model_response(message, message_index)
        else:
            return cls._from_unknown_message(message, message_index)
    
    @classmethod
    def from_model_messages(cls, messages: List["ModelMessage"]) -> List["ChatMessage"]:
        """
        Convert a list of ModelMessage to a list of ChatMessage.
        
        This is the primary method for converting storage messages to
        developer-friendly format.
        
        Args:
            messages: List of ModelMessage from session.messages
            
        Returns:
            List of ChatMessage objects with message_index set
        """
        if not messages:
            return []
        
        result: List[ChatMessage] = []
        for idx, message in enumerate(messages):
            try:
                chat_message = cls.from_model_message(message, message_index=idx)
                result.append(chat_message)
            except Exception:
                pass
        
        return result
    
    @classmethod
    def _from_model_request(
        cls,
        message: "ModelRequest",
        message_index: int = -1
    ) -> "ChatMessage":
        """
        Convert ModelRequest to ChatMessage.
        
        Handles UserPromptPart.content which can be:
        - str: Direct text content
        - Sequence[UserContent]: List of content items where UserContent is:
            - str: Text content
            - MultiModalContent: ImageUrl, AudioUrl, DocumentUrl, VideoUrl, BinaryContent
            - CachePoint: Cache marker (skipped)
        """
        from upsonic.messages.messages import UserPromptPart, SystemPromptPart
        
        content_parts: List[str] = []
        attachments: List[ChatAttachment] = []
        
        for part in message.parts:
            if isinstance(part, UserPromptPart):
                cls._extract_user_prompt_content(part.content, content_parts, attachments)
            elif isinstance(part, SystemPromptPart):
                continue
        
        return cls(
            content=" ".join(content_parts),
            role="user",
            timestamp=time.time(),
            attachments=attachments if attachments else None,
            message_index=message_index
        )
    
    @classmethod
    def _extract_user_prompt_content(
        cls,
        content: Any,
        content_parts: List[str],
        attachments: Optional[List["ChatAttachment"]] = None
    ) -> None:
        """
        Extract text content and attachments from UserPromptPart.content.
        
        Args:
            content: str | Sequence[UserContent] where UserContent = str | MultiModalContent | CachePoint
            content_parts: List to append extracted text content to
            attachments: Optional list to append extracted attachments to
        """
        from upsonic.messages.messages import (
            CachePoint,
            ImageUrl,
            AudioUrl,
            DocumentUrl,
            VideoUrl,
            BinaryContent,
        )
        
        if content is None:
            return
        
        if isinstance(content, str):
            content_parts.append(content)
            return
        
        if not isinstance(content, Sequence):
            return
        
        attachment_index = 0
        for item in content:
            if isinstance(item, str):
                content_parts.append(item)
            elif isinstance(item, CachePoint):
                continue
            elif isinstance(item, ImageUrl):
                identifier = getattr(item, 'identifier', None) or getattr(item, 'url', '')
                content_parts.append(f"[Image: {identifier}]")
                if attachments is not None:
                    attachments.append(ChatAttachment(
                        type="image",
                        identifier=identifier,
                        index=attachment_index
                    ))
                    attachment_index += 1
            elif isinstance(item, AudioUrl):
                identifier = getattr(item, 'identifier', None) or getattr(item, 'url', '')
                content_parts.append(f"[Audio: {identifier}]")
                if attachments is not None:
                    attachments.append(ChatAttachment(
                        type="audio",
                        identifier=identifier,
                        index=attachment_index
                    ))
                    attachment_index += 1
            elif isinstance(item, DocumentUrl):
                identifier = getattr(item, 'identifier', None) or getattr(item, 'url', '')
                content_parts.append(f"[Document: {identifier}]")
                if attachments is not None:
                    attachments.append(ChatAttachment(
                        type="document",
                        identifier=identifier,
                        index=attachment_index
                    ))
                    attachment_index += 1
            elif isinstance(item, VideoUrl):
                identifier = getattr(item, 'identifier', None) or getattr(item, 'url', '')
                content_parts.append(f"[Video: {identifier}]")
                if attachments is not None:
                    attachments.append(ChatAttachment(
                        type="video",
                        identifier=identifier,
                        index=attachment_index
                    ))
                    attachment_index += 1
            elif isinstance(item, BinaryContent):
                identifier = getattr(item, 'identifier', None) or 'binary_data'
                media_type = getattr(item, 'media_type', 'unknown')
                content_parts.append(f"[Binary: {identifier} ({media_type})]")
                if attachments is not None:
                    attachments.append(ChatAttachment(
                        type="binary",
                        identifier=identifier,
                        media_type=media_type,
                        index=attachment_index
                    ))
                    attachment_index += 1
            else:
                if hasattr(item, 'content') and isinstance(item.content, str):
                    content_parts.append(item.content)
    
    @classmethod
    def _from_model_response(
        cls,
        message: "ModelResponse",
        message_index: int = -1
    ) -> "ChatMessage":
        """Convert ModelResponse to ChatMessage."""
        from upsonic.messages.messages import (
            TextPart,
            ToolCallPart,
            BuiltinToolCallPart,
            ThinkingPart,
        )
        
        content_parts: List[str] = []
        tool_calls: List[Dict[str, Any]] = []
        
        for part in message.parts:
            if isinstance(part, TextPart):
                content_parts.append(part.content)
            elif isinstance(part, (ToolCallPart, BuiltinToolCallPart)):
                tool_calls.append({
                    "tool_name": part.tool_name,
                    "tool_call_id": part.tool_call_id,
                    "args": part.args_as_dict() if part.args else {}
                })
            elif isinstance(part, ThinkingPart):
                pass
        
        content = " ".join(content_parts).strip()
        if not content and tool_calls:
            content = f"Used {len(tool_calls)} tool(s)"
        
        metadata: Dict[str, Any] = {}
        if hasattr(message, 'model_name') and message.model_name:
            metadata["model_name"] = message.model_name
        if hasattr(message, 'provider_name') and message.provider_name:
            metadata["provider_name"] = message.provider_name
        if hasattr(message, 'usage') and message.usage:
            metadata["usage"] = {
                "input_tokens": message.usage.input_tokens,
                "output_tokens": message.usage.output_tokens,
            }
        if hasattr(message, 'finish_reason'):
            metadata["finish_reason"] = message.finish_reason
        if hasattr(message, 'timestamp') and message.timestamp:
            metadata["timestamp"] = message.timestamp.isoformat()
        
        return cls(
            content=content,
            role="assistant",
            timestamp=time.time(),
            tool_calls=tool_calls if tool_calls else None,
            metadata=metadata if metadata else None,
            message_index=message_index
        )
    
    @classmethod
    def _from_unknown_message(
        cls,
        message: Any,
        message_index: int = -1
    ) -> "ChatMessage":
        """Fallback conversion for unknown message types."""
        content = str(message)
        
        if hasattr(message, 'parts') and message.parts:
            content_parts: List[str] = []
            for part in message.parts:
                if hasattr(part, 'content'):
                    content_parts.append(str(part.content))
            if content_parts:
                content = " ".join(content_parts)
        
        return cls(
            content=content,
            role="assistant",
            timestamp=time.time(),
            message_index=message_index
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert ChatMessage to dictionary."""
        result: Dict[str, Any] = {
            "content": self.content,
            "role": self.role,
            "timestamp": self.timestamp,
            "message_index": self.message_index,
        }
        if self.attachments:
            result["attachments"] = [att.to_dict() for att in self.attachments]
        if self.tool_calls:
            result["tool_calls"] = self.tool_calls
        if self.metadata:
            result["metadata"] = self.metadata
        return result
    
    def __repr__(self) -> str:
        """String representation."""
        content_preview = self.content[:50] + "..." if len(self.content) > 50 else self.content
        attachment_info = f", attachments={len(self.attachments)}" if self.attachments else ""
        return f"ChatMessage(role='{self.role}', content='{content_preview}'{attachment_info})"
