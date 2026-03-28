"""
Unit tests for src/tools/pub_sub.py
"""

from unittest.mock import Mock, patch

import pytest
from redis.exceptions import ConnectionError, RedisError

from src.tools.pub_sub import publish, subscribe, unsubscribe


class TestPubSubOperations:
    """Test cases for Redis pub/sub operations."""

    @pytest.mark.asyncio
    async def test_publish_success(self, mock_redis_connection_manager):
        """Test successful publish operation."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.return_value = (
            2  # Number of subscribers that received the message
        )

        result = await publish("test_channel", "Hello World")

        mock_redis.publish.assert_called_once_with("test_channel", "Hello World")
        assert "Message published to channel 'test_channel'" in result

    @pytest.mark.asyncio
    async def test_publish_no_subscribers(self, mock_redis_connection_manager):
        """Test publish operation with no subscribers."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.return_value = 0  # No subscribers

        result = await publish("empty_channel", "Hello World")

        mock_redis.publish.assert_called_once_with("empty_channel", "Hello World")
        assert "Message published to channel 'empty_channel'" in result

    @pytest.mark.asyncio
    async def test_publish_redis_error(self, mock_redis_connection_manager):
        """Test publish operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.side_effect = RedisError("Connection failed")

        result = await publish("test_channel", "Hello World")

        assert (
            "Error publishing message to channel 'test_channel': Connection failed"
            in result
        )

    @pytest.mark.asyncio
    async def test_publish_connection_error(self, mock_redis_connection_manager):
        """Test publish operation with connection error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.side_effect = ConnectionError("Redis server unavailable")

        result = await publish("test_channel", "Hello World")

        assert (
            "Error publishing message to channel 'test_channel': Redis server unavailable"
            in result
        )

    @pytest.mark.asyncio
    async def test_publish_empty_message(self, mock_redis_connection_manager):
        """Test publish operation with empty message."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.return_value = 1

        result = await publish("test_channel", "")

        mock_redis.publish.assert_called_once_with("test_channel", "")
        assert "Message published to channel 'test_channel'" in result

    @pytest.mark.asyncio
    async def test_publish_numeric_message(self, mock_redis_connection_manager):
        """Test publish operation with numeric message."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.return_value = 1

        result = await publish("test_channel", 42)

        mock_redis.publish.assert_called_once_with("test_channel", 42)
        assert "Message published to channel 'test_channel'" in result

    @pytest.mark.asyncio
    async def test_publish_json_message(self, mock_redis_connection_manager):
        """Test publish operation with JSON-like message."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.return_value = 3

        json_message = (
            '{"type": "notification", "data": {"user": "john", "action": "login"}}'
        )
        result = await publish("notifications", json_message)

        mock_redis.publish.assert_called_once_with("notifications", json_message)
        assert "Message published to channel 'notifications'" in result

    @pytest.mark.asyncio
    async def test_publish_unicode_message(self, mock_redis_connection_manager):
        """Test publish operation with unicode message."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.return_value = 1

        unicode_message = "Hello 世界 🌍"
        result = await publish("test_channel", unicode_message)

        mock_redis.publish.assert_called_once_with("test_channel", unicode_message)
        assert "Message published to channel 'test_channel'" in result

    @pytest.mark.asyncio
    async def test_subscribe_success(self, mock_redis_connection_manager):
        """Test successful subscribe operation."""
        mock_redis = mock_redis_connection_manager
        mock_pubsub = Mock()
        mock_redis.pubsub.return_value = mock_pubsub
        mock_pubsub.subscribe.return_value = None

        result = await subscribe("test_channel")

        mock_redis.pubsub.assert_called_once()
        mock_pubsub.subscribe.assert_called_once_with("test_channel")
        assert "Subscribed to channel 'test_channel'" in result

    @pytest.mark.asyncio
    async def test_subscribe_redis_error(self, mock_redis_connection_manager):
        """Test subscribe operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.pubsub.side_effect = RedisError("Connection failed")

        result = await subscribe("test_channel")

        assert (
            "Error subscribing to channel 'test_channel': Connection failed" in result
        )

    @pytest.mark.asyncio
    async def test_subscribe_pubsub_error(self, mock_redis_connection_manager):
        """Test subscribe operation with pubsub creation error."""
        mock_redis = mock_redis_connection_manager
        mock_pubsub = Mock()
        mock_redis.pubsub.return_value = mock_pubsub
        mock_pubsub.subscribe.side_effect = RedisError("Subscribe failed")

        result = await subscribe("test_channel")

        assert "Error subscribing to channel 'test_channel': Subscribe failed" in result

    @pytest.mark.asyncio
    async def test_subscribe_multiple_channels_pattern(
        self, mock_redis_connection_manager
    ):
        """Test subscribe operation with pattern-like channel name."""
        mock_redis = mock_redis_connection_manager
        mock_pubsub = Mock()
        mock_redis.pubsub.return_value = mock_pubsub
        mock_pubsub.subscribe.return_value = None

        pattern_channel = "notifications:*"
        result = await subscribe(pattern_channel)

        mock_pubsub.subscribe.assert_called_once_with(pattern_channel)
        assert f"Subscribed to channel '{pattern_channel}'" in result

    @pytest.mark.asyncio
    async def test_unsubscribe_success(self, mock_redis_connection_manager):
        """Test successful unsubscribe operation."""
        mock_redis = mock_redis_connection_manager
        mock_pubsub = Mock()
        mock_redis.pubsub.return_value = mock_pubsub
        mock_pubsub.unsubscribe.return_value = None

        result = await unsubscribe("test_channel")

        mock_redis.pubsub.assert_called_once()
        mock_pubsub.unsubscribe.assert_called_once_with("test_channel")
        assert "Unsubscribed from channel 'test_channel'" in result

    @pytest.mark.asyncio
    async def test_unsubscribe_redis_error(self, mock_redis_connection_manager):
        """Test unsubscribe operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.pubsub.side_effect = RedisError("Connection failed")

        result = await unsubscribe("test_channel")

        assert (
            "Error unsubscribing from channel 'test_channel': Connection failed"
            in result
        )

    @pytest.mark.asyncio
    async def test_unsubscribe_pubsub_error(self, mock_redis_connection_manager):
        """Test unsubscribe operation with pubsub error."""
        mock_redis = mock_redis_connection_manager
        mock_pubsub = Mock()
        mock_redis.pubsub.return_value = mock_pubsub
        mock_pubsub.unsubscribe.side_effect = RedisError("Unsubscribe failed")

        result = await unsubscribe("test_channel")

        assert (
            "Error unsubscribing from channel 'test_channel': Unsubscribe failed"
            in result
        )

    @pytest.mark.asyncio
    async def test_unsubscribe_from_all_channels(self, mock_redis_connection_manager):
        """Test unsubscribe operation without specifying channel (unsubscribe from all)."""
        mock_redis = mock_redis_connection_manager
        mock_pubsub = Mock()
        mock_redis.pubsub.return_value = mock_pubsub
        mock_pubsub.unsubscribe.return_value = None

        # Test unsubscribing from specific channel
        result = await unsubscribe("specific_channel")

        mock_pubsub.unsubscribe.assert_called_once_with("specific_channel")
        assert "Unsubscribed from channel 'specific_channel'" in result

    @pytest.mark.asyncio
    async def test_publish_to_pattern_channel(self, mock_redis_connection_manager):
        """Test publish operation to pattern-like channel."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.return_value = 5

        pattern_channel = "user:123:notifications"
        result = await publish(pattern_channel, "User notification")

        mock_redis.publish.assert_called_once_with(pattern_channel, "User notification")
        assert f"Message published to channel '{pattern_channel}'" in result

    @pytest.mark.asyncio
    async def test_subscribe_with_special_characters(
        self, mock_redis_connection_manager
    ):
        """Test subscribe operation with special characters in channel name."""
        mock_redis = mock_redis_connection_manager
        mock_pubsub = Mock()
        mock_redis.pubsub.return_value = mock_pubsub
        mock_pubsub.subscribe.return_value = None

        special_channel = "channel:with:colons-and-dashes_and_underscores"
        result = await subscribe(special_channel)

        mock_pubsub.subscribe.assert_called_once_with(special_channel)
        assert f"Subscribed to channel '{special_channel}'" in result

    @pytest.mark.asyncio
    async def test_connection_manager_called_correctly(self):
        """Test that RedisConnectionManager.get_connection is called correctly."""
        with patch(
            "src.tools.pub_sub.RedisConnectionManager.get_connection"
        ) as mock_get_conn:
            mock_redis = Mock()
            mock_redis.publish.return_value = 1
            mock_get_conn.return_value = mock_redis

            await publish("test_channel", "test_message")

            mock_get_conn.assert_called_once()

    @pytest.mark.asyncio
    async def test_function_signatures(self):
        """Test that functions have correct signatures."""
        import inspect

        # Test publish function signature
        publish_sig = inspect.signature(publish)
        publish_params = list(publish_sig.parameters.keys())
        assert publish_params == ["channel", "message"]

        # Test subscribe function signature
        subscribe_sig = inspect.signature(subscribe)
        subscribe_params = list(subscribe_sig.parameters.keys())
        assert subscribe_params == ["channel"]

        # Test unsubscribe function signature
        unsubscribe_sig = inspect.signature(unsubscribe)
        unsubscribe_params = list(unsubscribe_sig.parameters.keys())
        assert unsubscribe_params == ["channel"]

    @pytest.mark.asyncio
    async def test_publish_large_message(self, mock_redis_connection_manager):
        """Test publish operation with large message."""
        mock_redis = mock_redis_connection_manager
        mock_redis.publish.return_value = 1

        large_message = "x" * 10000  # 10KB message
        result = await publish("test_channel", large_message)

        mock_redis.publish.assert_called_once_with("test_channel", large_message)
        assert "Message published to channel 'test_channel'" in result
