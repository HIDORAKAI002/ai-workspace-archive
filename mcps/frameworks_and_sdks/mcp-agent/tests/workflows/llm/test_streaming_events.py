"""Tests for streaming event types and models."""

import json
import time

import pytest
from pydantic import ValidationError

from mcp_agent.workflows.llm.streaming_events import StreamEvent, StreamEventType


class TestStreamEventType:
    """Tests for StreamEventType enum."""

    def test_event_type_values(self):
        """Test that all event types have correct string values."""
        assert StreamEventType.TEXT_DELTA == "text_delta"
        assert StreamEventType.THINKING == "thinking"
        assert StreamEventType.TOOL_USE_START == "tool_use_start"
        assert StreamEventType.TOOL_USE_END == "tool_use_end"
        assert StreamEventType.TOOL_RESULT == "tool_result"
        assert StreamEventType.ITERATION_START == "iteration_start"
        assert StreamEventType.ITERATION_END == "iteration_end"
        assert StreamEventType.COMPLETE == "complete"
        assert StreamEventType.ERROR == "error"

    def test_event_type_membership(self):
        """Test that string values can be checked for membership."""
        assert "text_delta" in [e.value for e in StreamEventType]
        assert "invalid_type" not in [e.value for e in StreamEventType]

    def test_event_type_iteration(self):
        """Test that all event types can be iterated."""
        event_types = list(StreamEventType)
        assert len(event_types) == 9
        assert all(isinstance(et, StreamEventType) for et in event_types)


class TestStreamEvent:
    """Tests for StreamEvent model."""

    def test_create_text_delta_event(self):
        """Test creating a text delta event."""
        event = StreamEvent(
            type=StreamEventType.TEXT_DELTA, content="Hello, world!", iteration=0
        )

        assert event.type == StreamEventType.TEXT_DELTA
        assert event.content == "Hello, world!"
        assert event.iteration == 0
        assert isinstance(event.metadata, dict)
        assert len(event.metadata) == 0
        assert isinstance(event.timestamp, float)
        assert event.model is None
        assert event.stop_reason is None
        assert event.usage is None

    def test_create_tool_use_start_event(self):
        """Test creating a tool use start event."""
        tool_data = {"name": "search_tool", "input": {"query": "test query"}}

        event = StreamEvent(
            type=StreamEventType.TOOL_USE_START,
            content=tool_data,
            iteration=1,
            metadata={"tool_id": "tool_123"},
        )

        assert event.type == StreamEventType.TOOL_USE_START
        assert event.content == tool_data
        assert event.iteration == 1
        assert event.metadata == {"tool_id": "tool_123"}

    def test_create_complete_event(self):
        """Test creating a completion event with usage."""
        usage = {"input_tokens": 100, "output_tokens": 50}

        event = StreamEvent(
            type=StreamEventType.COMPLETE,
            iteration=2,
            model="claude-3-7-sonnet-latest",
            stop_reason="end_turn",
            usage=usage,
        )

        assert event.type == StreamEventType.COMPLETE
        assert event.content is None
        assert event.iteration == 2
        assert event.model == "claude-3-7-sonnet-latest"
        assert event.stop_reason == "end_turn"
        assert event.usage == usage

    def test_create_error_event(self):
        """Test creating an error event."""
        error_info = {"error": "API request failed", "details": "Connection timeout"}

        event = StreamEvent(
            type=StreamEventType.ERROR,
            content=error_info,
            iteration=1,
            metadata={"error_code": 500},
        )

        assert event.type == StreamEventType.ERROR
        assert event.content == error_info
        assert event.metadata["error_code"] == 500

    def test_default_values(self):
        """Test that default values are correctly applied."""
        event = StreamEvent(type=StreamEventType.ITERATION_START)

        assert event.content is None
        assert event.iteration == 0
        assert event.metadata == {}
        assert event.model is None
        assert event.stop_reason is None
        assert event.usage is None

    def test_timestamp_generation(self):
        """Test that timestamp is automatically generated."""
        before = time.time()
        event = StreamEvent(type=StreamEventType.TEXT_DELTA, content="test")
        after = time.time()

        assert before <= event.timestamp <= after

    def test_custom_timestamp(self):
        """Test that custom timestamp can be provided."""
        custom_timestamp = 1704724800.0
        event = StreamEvent(
            type=StreamEventType.TEXT_DELTA, content="test", timestamp=custom_timestamp
        )

        assert event.timestamp == custom_timestamp

    def test_serialization_to_dict(self):
        """Test serialization to dictionary."""
        event = StreamEvent(
            type=StreamEventType.TEXT_DELTA,
            content="test",
            iteration=1,
            metadata={"key": "value"},
            model="claude-3-7-sonnet-latest",
        )

        data = event.model_dump()

        assert isinstance(data, dict)
        assert data["type"] == "text_delta"
        assert data["content"] == "test"
        assert data["iteration"] == 1
        assert data["metadata"] == {"key": "value"}
        assert data["model"] == "claude-3-7-sonnet-latest"
        assert "timestamp" in data

    def test_serialization_to_json(self):
        """Test serialization to JSON string."""
        event = StreamEvent(
            type=StreamEventType.TOOL_USE_START,
            content={"name": "search", "input": {"q": "test"}},
            iteration=0,
        )

        json_str = event.model_dump_json()
        assert isinstance(json_str, str)

        # Verify it's valid JSON and can be parsed
        data = json.loads(json_str)
        assert data["type"] == "tool_use_start"
        assert data["content"]["name"] == "search"

    def test_deserialization_from_dict(self):
        """Test deserialization from dictionary."""
        data = {
            "type": "text_delta",
            "content": "Hello",
            "iteration": 0,
            "metadata": {},
            "timestamp": 1704724800.0,
        }

        event = StreamEvent(**data)

        assert event.type == StreamEventType.TEXT_DELTA
        assert event.content == "Hello"
        assert event.iteration == 0
        assert event.timestamp == 1704724800.0

    def test_invalid_event_type(self):
        """Test that invalid event type raises validation error."""
        with pytest.raises(ValidationError):
            StreamEvent(type="invalid_type", content="test")

    def test_content_can_be_string_or_dict(self):
        """Test that content accepts both string and dict."""
        # String content
        event1 = StreamEvent(type=StreamEventType.TEXT_DELTA, content="text")
        assert isinstance(event1.content, str)

        # Dict content
        event2 = StreamEvent(
            type=StreamEventType.TOOL_USE_START, content={"name": "tool"}
        )
        assert isinstance(event2.content, dict)

        # None content
        event3 = StreamEvent(type=StreamEventType.COMPLETE)
        assert event3.content is None

    def test_metadata_is_mutable(self):
        """Test that metadata can be updated after creation."""
        event = StreamEvent(type=StreamEventType.TEXT_DELTA, content="test")

        assert event.metadata == {}

        event.metadata["key"] = "value"
        assert event.metadata == {"key": "value"}

    def test_iteration_event_with_usage(self):
        """Test iteration end event with token usage."""
        event = StreamEvent(
            type=StreamEventType.ITERATION_END,
            iteration=1,
            usage={
                "input_tokens": 150,
                "output_tokens": 75,
                "cache_read_input_tokens": 0,
                "cache_creation_input_tokens": 0,
            },
            stop_reason="tool_use",
        )

        assert event.usage is not None
        assert event.usage.get("input_tokens") == 150
        assert event.usage.get("output_tokens") == 75
        assert event.stop_reason == "tool_use"

    def test_thinking_event(self):
        """Test thinking event for extended thinking models."""
        thinking_content = "Let me analyze this step by step..."

        event = StreamEvent(
            type=StreamEventType.THINKING, content=thinking_content, iteration=0
        )

        assert event.type == StreamEventType.THINKING
        assert event.content == thinking_content

    def test_tool_result_event(self):
        """Test tool result event."""
        result_content = {"result": "Search completed", "items": ["item1", "item2"]}

        event = StreamEvent(
            type=StreamEventType.TOOL_RESULT,
            content=result_content,
            iteration=1,
            metadata={"tool_id": "tool_123", "tool_name": "search", "is_error": False},
        )

        assert event.type == StreamEventType.TOOL_RESULT
        assert event.content == result_content
        assert event.metadata["tool_name"] == "search"
        assert event.metadata["is_error"] is False

    def test_equality(self):
        """Test event equality comparison."""
        timestamp = 1704724800.0

        event1 = StreamEvent(
            type=StreamEventType.TEXT_DELTA, content="test", timestamp=timestamp
        )

        event2 = StreamEvent(
            type=StreamEventType.TEXT_DELTA, content="test", timestamp=timestamp
        )

        # Note: Pydantic models use field comparison for equality
        assert event1.type == event2.type
        assert event1.content == event2.content
        assert event1.timestamp == event2.timestamp

    def test_repr(self):
        """Test event string representation."""
        event = StreamEvent(type=StreamEventType.TEXT_DELTA, content="test")

        repr_str = repr(event)
        assert "StreamEvent" in repr_str
        assert "text_delta" in repr_str
