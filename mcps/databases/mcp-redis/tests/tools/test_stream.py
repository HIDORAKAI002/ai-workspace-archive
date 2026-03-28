"""
Unit tests for src/tools/stream.py
"""

from unittest.mock import Mock, patch

import pytest
from redis.exceptions import RedisError

from src.tools.stream import xadd, xdel, xrange


class TestStreamOperations:
    """Test cases for Redis stream operations."""

    @pytest.mark.asyncio
    async def test_xadd_success(self, mock_redis_connection_manager):
        """Test successful stream add operation."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xadd.return_value = "1234567890123-0"  # Stream entry ID

        fields = {"field1": "value1", "field2": "value2"}
        result = await xadd("test_stream", fields)

        mock_redis.xadd.assert_called_once_with("test_stream", fields)
        assert "Successfully added entry 1234567890123-0 to test_stream" in result
        assert "1234567890123-0" in result

    @pytest.mark.asyncio
    async def test_xadd_with_expiration(self, mock_redis_connection_manager):
        """Test stream add operation with expiration."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xadd.return_value = "1234567890124-0"
        mock_redis.expire.return_value = True

        fields = {"message": "test message"}
        result = await xadd("test_stream", fields, 60)

        mock_redis.xadd.assert_called_once_with("test_stream", fields)
        mock_redis.expire.assert_called_once_with("test_stream", 60)
        assert "with expiration 60 seconds" in result

    @pytest.mark.asyncio
    async def test_xadd_single_field(self, mock_redis_connection_manager):
        """Test stream add operation with single field."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xadd.return_value = "1234567890125-0"

        fields = {"message": "single field message"}
        result = await xadd("test_stream", fields)

        mock_redis.xadd.assert_called_once_with("test_stream", fields)
        assert "Successfully added entry 1234567890125-0 to test_stream" in result

    @pytest.mark.asyncio
    async def test_xadd_redis_error(self, mock_redis_connection_manager):
        """Test stream add operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xadd.side_effect = RedisError("Connection failed")

        fields = {"field1": "value1"}
        result = await xadd("test_stream", fields)

        assert "Error adding to stream test_stream: Connection failed" in result

    @pytest.mark.asyncio
    async def test_xadd_with_numeric_values(self, mock_redis_connection_manager):
        """Test stream add operation with numeric field values."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xadd.return_value = "1234567890126-0"

        fields = {"count": 42, "price": 19.99, "active": True}
        result = await xadd("test_stream", fields)

        mock_redis.xadd.assert_called_once_with("test_stream", fields)
        assert "Successfully added entry 1234567890126-0 to test_stream" in result

    @pytest.mark.asyncio
    async def test_xrange_success(self, mock_redis_connection_manager):
        """Test successful stream range operation."""
        mock_redis = mock_redis_connection_manager
        mock_entries = [
            ("1234567890123-0", {"field1": "value1", "field2": "value2"}),
            ("1234567890124-0", {"field1": "value3", "field2": "value4"}),
        ]
        mock_redis.xrange.return_value = mock_entries

        result = await xrange("test_stream")

        mock_redis.xrange.assert_called_once_with("test_stream", count=1)
        assert result == str(mock_entries)

    @pytest.mark.asyncio
    async def test_xrange_with_custom_count(self, mock_redis_connection_manager):
        """Test stream range operation with custom count."""
        mock_redis = mock_redis_connection_manager
        mock_entries = [
            ("1234567890123-0", {"message": "entry1"}),
            ("1234567890124-0", {"message": "entry2"}),
            ("1234567890125-0", {"message": "entry3"}),
        ]
        mock_redis.xrange.return_value = mock_entries

        result = await xrange("test_stream", 3)

        mock_redis.xrange.assert_called_once_with("test_stream", count=3)
        assert result == str(mock_entries)
        # Check the original mock_entries length
        assert len(mock_entries) == 3

    @pytest.mark.asyncio
    async def test_xrange_empty_stream(self, mock_redis_connection_manager):
        """Test stream range operation on empty stream."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xrange.return_value = []

        result = await xrange("empty_stream")

        assert "Stream empty_stream is empty or does not exist" in result

    @pytest.mark.asyncio
    async def test_xrange_redis_error(self, mock_redis_connection_manager):
        """Test stream range operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xrange.side_effect = RedisError("Connection failed")

        result = await xrange("test_stream")

        assert "Error reading from stream test_stream: Connection failed" in result

    @pytest.mark.asyncio
    async def test_xdel_success(self, mock_redis_connection_manager):
        """Test successful stream delete operation."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xdel.return_value = 1  # Number of entries deleted

        result = await xdel("test_stream", "1234567890123-0")

        mock_redis.xdel.assert_called_once_with("test_stream", "1234567890123-0")
        assert "Successfully deleted entry 1234567890123-0 from test_stream" in result

    @pytest.mark.asyncio
    async def test_xdel_entry_not_found(self, mock_redis_connection_manager):
        """Test stream delete operation when entry doesn't exist."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xdel.return_value = 0  # No entries deleted

        result = await xdel("test_stream", "nonexistent-entry-id")

        assert "Entry nonexistent-entry-id not found in test_stream" in result

    @pytest.mark.asyncio
    async def test_xdel_redis_error(self, mock_redis_connection_manager):
        """Test stream delete operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xdel.side_effect = RedisError("Connection failed")

        result = await xdel("test_stream", "1234567890123-0")

        assert "Error deleting from stream test_stream: Connection failed" in result

    @pytest.mark.asyncio
    async def test_xadd_with_empty_fields(self, mock_redis_connection_manager):
        """Test stream add operation with empty fields dictionary."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xadd.return_value = "1234567890127-0"

        fields = {}
        result = await xadd("test_stream", fields)

        mock_redis.xadd.assert_called_once_with("test_stream", fields)
        assert "Successfully added entry 1234567890127-0 to test_stream" in result

    @pytest.mark.asyncio
    async def test_xadd_with_unicode_values(self, mock_redis_connection_manager):
        """Test stream add operation with unicode field values."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xadd.return_value = "1234567890128-0"

        fields = {"message": "Hello 世界 🌍", "user": "测试用户"}
        result = await xadd("test_stream", fields)

        mock_redis.xadd.assert_called_once_with("test_stream", fields)
        assert "Successfully added entry 1234567890128-0 to test_stream" in result

    @pytest.mark.asyncio
    async def test_xrange_large_count(self, mock_redis_connection_manager):
        """Test stream range operation with large count."""
        mock_redis = mock_redis_connection_manager
        mock_entries = [
            (f"123456789012{i}-0", {"data": f"entry_{i}"}) for i in range(100)
        ]
        mock_redis.xrange.return_value = mock_entries

        result = await xrange("test_stream", 100)

        mock_redis.xrange.assert_called_once_with("test_stream", count=100)
        # The function returns a string representation
        assert result == str(mock_entries)
        # Check the original mock_entries length
        assert len(mock_entries) == 100

    @pytest.mark.asyncio
    async def test_xdel_multiple_entries_behavior(self, mock_redis_connection_manager):
        """Test that xdel function handles single entry correctly."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xdel.return_value = 1

        result = await xdel("test_stream", "single-entry-id")

        # Should call xdel with single entry ID, not multiple
        mock_redis.xdel.assert_called_once_with("test_stream", "single-entry-id")
        assert "Successfully deleted entry single-entry-id from test_stream" in result

    @pytest.mark.asyncio
    async def test_xadd_expiration_error(self, mock_redis_connection_manager):
        """Test stream add operation when expiration fails."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xadd.return_value = "1234567890129-0"
        mock_redis.expire.side_effect = RedisError("Expire failed")

        fields = {"message": "test"}
        result = await xadd("test_stream", fields, 60)

        assert "Error adding to stream test_stream: Expire failed" in result

    @pytest.mark.asyncio
    async def test_xrange_single_entry(self, mock_redis_connection_manager):
        """Test stream range operation returning single entry."""
        mock_redis = mock_redis_connection_manager
        mock_entries = [("1234567890123-0", {"single": "entry"})]
        mock_redis.xrange.return_value = mock_entries

        result = await xrange("test_stream", 1)

        assert result == "[('1234567890123-0', {'single': 'entry'})]"
        # Check the original mock_entries length
        assert len(mock_entries) == 1

    @pytest.mark.asyncio
    async def test_connection_manager_called_correctly(self):
        """Test that RedisConnectionManager.get_connection is called correctly."""
        with patch(
            "src.tools.stream.RedisConnectionManager.get_connection"
        ) as mock_get_conn:
            mock_redis = Mock()
            mock_redis.xadd.return_value = "1234567890123-0"
            mock_get_conn.return_value = mock_redis

            await xadd("test_stream", {"field": "value"})

            mock_get_conn.assert_called_once()

    @pytest.mark.asyncio
    async def test_function_signatures(self):
        """Test that functions have correct signatures."""
        import inspect

        # Test xadd function signature
        xadd_sig = inspect.signature(xadd)
        xadd_params = list(xadd_sig.parameters.keys())
        assert xadd_params == ["key", "fields", "expiration"]
        assert xadd_sig.parameters["expiration"].default is None

        # Test xrange function signature
        xrange_sig = inspect.signature(xrange)
        xrange_params = list(xrange_sig.parameters.keys())
        assert xrange_params == ["key", "count"]
        assert xrange_sig.parameters["count"].default == 1

        # Test xdel function signature
        xdel_sig = inspect.signature(xdel)
        xdel_params = list(xdel_sig.parameters.keys())
        assert xdel_params == ["key", "entry_id"]

    @pytest.mark.asyncio
    async def test_xadd_with_complex_fields(self, mock_redis_connection_manager):
        """Test stream add operation with complex field structure."""
        mock_redis = mock_redis_connection_manager
        mock_redis.xadd.return_value = "1234567890130-0"

        fields = {
            "event_type": "user_action",
            "user_id": "12345",
            "timestamp": "2024-01-01T12:00:00Z",
            "metadata": '{"browser": "chrome", "version": "120"}',
            "score": 95.5,
            "active": True,
        }
        result = await xadd("events_stream", fields)

        mock_redis.xadd.assert_called_once_with("events_stream", fields)
        assert "Successfully added entry 1234567890130-0 to events_stream" in result
