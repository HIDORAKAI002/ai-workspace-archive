"""Tests for Anthropic streaming implementation."""

from unittest.mock import AsyncMock, MagicMock, patch
from types import SimpleNamespace

import pytest
from anthropic.types import Message, TextBlock, ToolUseBlock, Usage

from mcp_agent.config import AnthropicSettings
from mcp_agent.workflows.llm.augmented_llm_anthropic import AnthropicAugmentedLLM
from mcp_agent.workflows.llm.streaming_events import StreamEventType


class TestAnthropicStreaming:
    """Tests for AnthropicAugmentedLLM streaming functionality."""

    @pytest.fixture
    def mock_llm(self, mock_context):
        """Creates a mock LLM instance with common mocks set up."""
        mock_context.config.anthropic = AnthropicSettings(api_key="test_key")
        mock_context.config.default_model = "claude-3-7-sonnet-latest"

        llm = AnthropicAugmentedLLM(name="test", context=mock_context)

        llm.agent = MagicMock()
        llm.agent.list_tools = AsyncMock(return_value=MagicMock(tools=[]))
        llm.history = MagicMock()
        llm.history.get = MagicMock(return_value=[])
        llm.history.set = MagicMock()
        llm.select_model = AsyncMock(return_value="claude-3-7-sonnet-latest")
        llm._log_chat_progress = MagicMock()
        llm._log_chat_finished = MagicMock()
        llm._annotate_span_for_generation_message = MagicMock()
        llm._annotate_span_for_completion_response = MagicMock()

        return llm

    @pytest.fixture
    def default_usage(self):
        """Returns a default usage object for testing."""
        return Usage(
            cache_creation_input_tokens=0,
            cache_read_input_tokens=0,
            input_tokens=100,
            output_tokens=50,
        )

    @staticmethod
    def create_mock_stream_event(event_type, delta_text=None, content_block=None):
        """Creates a mock streaming event."""
        event = SimpleNamespace(type=event_type)
        if delta_text is not None:
            event.delta = SimpleNamespace(text=delta_text)
        if content_block is not None:
            event.content_block = content_block
        return event

    @staticmethod
    def create_mock_stream(events, final_message):
        """Creates a mock stream that yields events and returns final message."""

        class MockStream:
            def __init__(self, events_list, final_msg):
                self.events = list(events_list)
                self.final_message = final_msg
                self.index = 0

            def __aiter__(self):
                return self

            async def __anext__(self):
                if self.index < len(self.events):
                    event = self.events[self.index]
                    self.index += 1
                    return event
                raise StopAsyncIteration

            async def __aenter__(self):
                return self

            async def __aexit__(self, exc_type, exc_val, exc_tb):
                return None

            async def get_final_message(self):
                return self.final_message

        return MockStream(events, final_message)

    @pytest.mark.asyncio
    async def test_single_turn_text_streaming(self, mock_llm, default_usage):
        """Test single-turn text generation with streaming."""
        # Create mock streaming events
        text_deltas = ["Hello", " ", "world", "!"]
        mock_events = [
            self.create_mock_stream_event("content_block_delta", delta_text=delta)
            for delta in text_deltas
        ]

        # Create final message
        final_message = Message(
            role="assistant",
            content=[TextBlock(type="text", text="Hello world!")],
            model="claude-3-7-sonnet-latest",
            stop_reason="end_turn",
            id="msg_1",
            type="message",
            usage=default_usage,
        )

        # Mock the stream
        mock_stream = self.create_mock_stream(mock_events, final_message)

        # Mock the AsyncAnthropic client
        with patch(
            "mcp_agent.workflows.llm.augmented_llm_anthropic.AsyncAnthropic"
        ) as MockAsyncAnthropic:
            mock_client = MockAsyncAnthropic.return_value
            mock_client.messages.stream = MagicMock(return_value=mock_stream)
            mock_client.__aenter__ = AsyncMock(return_value=mock_client)
            mock_client.__aexit__ = AsyncMock(return_value=None)

            # Collect events
            events = []
            async for event in mock_llm.generate_stream("Hello"):
                events.append(event)

        # Verify event sequence
        assert len(events) > 0

        # Check ITERATION_START event
        assert events[0].type == StreamEventType.ITERATION_START
        assert events[0].iteration == 0

        # Check TEXT_DELTA events
        text_delta_events = [e for e in events if e.type == StreamEventType.TEXT_DELTA]
        assert len(text_delta_events) == 4
        assert [e.content for e in text_delta_events if e.content is not None] == text_deltas

        # Check ITERATION_END event
        iteration_end_events = [
            e for e in events if e.type == StreamEventType.ITERATION_END
        ]
        assert len(iteration_end_events) == 1
        assert iteration_end_events[0].stop_reason == "end_turn"
        assert iteration_end_events[0].usage is not None
        assert iteration_end_events[0].usage.get("input_tokens") == 100
        assert iteration_end_events[0].usage.get("output_tokens") == 50

        # Check COMPLETE event
        complete_events = [e for e in events if e.type == StreamEventType.COMPLETE]
        assert len(complete_events) == 1

    @pytest.mark.asyncio
    async def test_multi_iteration_with_tool_calls(self, mock_llm, default_usage):
        """Test multi-iteration streaming with tool calls."""
        # First iteration: tool use
        tool_use_message = Message(
            role="assistant",
            content=[
                ToolUseBlock(
                    type="tool_use",
                    name="search",
                    input={"query": "test"},
                    id="tool_1",
                )
            ],
            model="claude-3-7-sonnet-latest",
            stop_reason="tool_use",
            id="msg_1",
            type="message",
            usage=default_usage,
        )

        # Second iteration: final text
        text_message = Message(
            role="assistant",
            content=[TextBlock(type="text", text="Based on search: result")],
            model="claude-3-7-sonnet-latest",
            stop_reason="end_turn",
            id="msg_2",
            type="message",
            usage=default_usage,
        )

        # Mock tool execution
        mock_tool_result = MagicMock()
        mock_tool_result.content = [MagicMock(text="tool result")]
        mock_tool_result.isError = False
        mock_llm.call_tool = AsyncMock(return_value=mock_tool_result)
        mock_llm.from_mcp_tool_result = MagicMock(
            return_value={"role": "user", "content": [{"type": "tool_result"}]}
        )

        # Create streams for both iterations
        stream1 = self.create_mock_stream([], tool_use_message)
        stream2 = self.create_mock_stream(
            [
                self.create_mock_stream_event(
                    "content_block_delta", delta_text="Based"
                ),
                self.create_mock_stream_event(
                    "content_block_delta", delta_text=" on search"
                ),
            ],
            text_message,
        )

        with patch(
            "mcp_agent.workflows.llm.augmented_llm_anthropic.AsyncAnthropic"
        ) as MockAsyncAnthropic:
            mock_client = MockAsyncAnthropic.return_value

            # Mock stream method to return different streams
            mock_client.messages.stream = MagicMock(side_effect=[stream1, stream2])
            mock_client.__aenter__ = AsyncMock(return_value=mock_client)
            mock_client.__aexit__ = AsyncMock(return_value=None)

            # Collect events
            events = []
            async for event in mock_llm.generate_stream("Search for something"):
                events.append(event)

        # Verify we have multiple iterations
        iteration_start_events = [
            e for e in events if e.type == StreamEventType.ITERATION_START
        ]
        assert len(iteration_start_events) == 2

        # Check tool events
        tool_use_start_events = [
            e for e in events if e.type == StreamEventType.TOOL_USE_START
        ]
        assert len(tool_use_start_events) == 1
        assert tool_use_start_events[0].content is not None
        assert tool_use_start_events[0].content.get("name") == "search"

        tool_result_events = [
            e for e in events if e.type == StreamEventType.TOOL_RESULT
        ]
        assert len(tool_result_events) == 1

        tool_use_end_events = [
            e for e in events if e.type == StreamEventType.TOOL_USE_END
        ]
        assert len(tool_use_end_events) == 1

        # Check final completion
        complete_events = [e for e in events if e.type == StreamEventType.COMPLETE]
        assert len(complete_events) == 1

    @pytest.mark.asyncio
    async def test_thinking_block_streaming(self, mock_llm, default_usage):
        """Test streaming with thinking blocks (extended thinking models)."""
        # Create thinking block event
        thinking_block = SimpleNamespace(
            type="thinking", thinking="Let me think about this..."
        )
        mock_events = [
            self.create_mock_stream_event(
                "content_block_start", content_block=thinking_block
            ),
            self.create_mock_stream_event("content_block_delta", delta_text="Answer"),
        ]

        final_message = Message(
            role="assistant",
            content=[TextBlock(type="text", text="Answer")],
            model="claude-3-7-sonnet-latest",
            stop_reason="end_turn",
            id="msg_1",
            type="message",
            usage=default_usage,
        )

        mock_stream = self.create_mock_stream(mock_events, final_message)

        with patch(
            "mcp_agent.workflows.llm.augmented_llm_anthropic.AsyncAnthropic"
        ) as MockAsyncAnthropic:
            mock_client = MockAsyncAnthropic.return_value
            mock_client.messages.stream = MagicMock(return_value=mock_stream)
            mock_client.__aenter__ = AsyncMock(return_value=mock_client)
            mock_client.__aexit__ = AsyncMock(return_value=None)

            events = []
            async for event in mock_llm.generate_stream("Think about this"):
                events.append(event)

        # Check for THINKING event
        thinking_events = [e for e in events if e.type == StreamEventType.THINKING]
        assert len(thinking_events) == 1
        assert thinking_events[0].content is not None
        assert "think about this" in thinking_events[0].content.lower()

    @pytest.mark.asyncio
    async def test_error_handling(self, mock_llm):
        """Test error handling in streaming."""
        with patch(
            "mcp_agent.workflows.llm.augmented_llm_anthropic.AsyncAnthropic"
        ) as MockAsyncAnthropic:
            # Make the client raise an exception
            mock_client = MockAsyncAnthropic.return_value
            mock_client.__aenter__ = AsyncMock(side_effect=Exception("API Error"))

            events = []
            async for event in mock_llm.generate_stream("Test"):
                events.append(event)

        # Should have an ERROR event
        error_events = [e for e in events if e.type == StreamEventType.ERROR]
        assert len(error_events) == 1
        assert "API Error" in str(error_events[0].content)

    @pytest.mark.asyncio
    async def test_history_management(self, mock_llm, default_usage):
        """Test that history is properly managed during streaming."""
        final_message = Message(
            role="assistant",
            content=[TextBlock(type="text", text="Response")],
            model="claude-3-7-sonnet-latest",
            stop_reason="end_turn",
            id="msg_1",
            type="message",
            usage=default_usage,
        )

        mock_stream = self.create_mock_stream([], final_message)

        with patch(
            "mcp_agent.workflows.llm.augmented_llm_anthropic.AsyncAnthropic"
        ) as MockAsyncAnthropic:
            mock_client = MockAsyncAnthropic.return_value
            mock_client.messages.stream = MagicMock(return_value=mock_stream)
            mock_client.__aenter__ = AsyncMock(return_value=mock_client)
            mock_client.__aexit__ = AsyncMock(return_value=None)

            _ = list([e async for e in mock_llm.generate_stream("Test")])

        # Verify history.set was called
        assert mock_llm.history.set.called

    @pytest.mark.asyncio
    async def test_generate_str_stream_convenience_method(
        self, mock_llm, default_usage
    ):
        """Test the generate_str_stream convenience method."""
        text_deltas = ["Hello", " ", "world"]
        mock_events = [
            self.create_mock_stream_event("content_block_delta", delta_text=delta)
            for delta in text_deltas
        ]

        final_message = Message(
            role="assistant",
            content=[TextBlock(type="text", text="Hello world")],
            model="claude-3-7-sonnet-latest",
            stop_reason="end_turn",
            id="msg_1",
            type="message",
            usage=default_usage,
        )

        mock_stream = self.create_mock_stream(mock_events, final_message)

        with patch(
            "mcp_agent.workflows.llm.augmented_llm_anthropic.AsyncAnthropic"
        ) as MockAsyncAnthropic:
            mock_client = MockAsyncAnthropic.return_value
            mock_client.messages.stream = MagicMock(return_value=mock_stream)
            mock_client.__aenter__ = AsyncMock(return_value=mock_client)
            mock_client.__aexit__ = AsyncMock(return_value=None)

            text_chunks = []
            async for text in mock_llm.generate_str_stream("Test"):
                text_chunks.append(text)

        # Should only get text deltas, no other events
        assert text_chunks == text_deltas
