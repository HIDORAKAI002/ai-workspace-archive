"""
Unit tests for src/tools/sorted_set.py
"""

from unittest.mock import Mock, patch

import pytest
from redis.exceptions import RedisError

from src.tools.sorted_set import zadd, zrange, zrem


class TestSortedSetOperations:
    """Test cases for Redis sorted set operations."""

    @pytest.mark.asyncio
    async def test_zadd_success(self, mock_redis_connection_manager):
        """Test successful sorted set add operation."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zadd.return_value = 1  # Number of elements added

        result = await zadd("test_zset", 1.5, "member1")

        mock_redis.zadd.assert_called_once_with("test_zset", {"member1": 1.5})
        assert "Successfully added member1 to test_zset with score 1.5" in result

    @pytest.mark.asyncio
    async def test_zadd_with_expiration(self, mock_redis_connection_manager):
        """Test sorted set add operation with expiration."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zadd.return_value = 1
        mock_redis.expire.return_value = True

        result = await zadd("test_zset", 2.0, "member1", 60)

        mock_redis.zadd.assert_called_once_with("test_zset", {"member1": 2.0})
        mock_redis.expire.assert_called_once_with("test_zset", 60)
        assert "and expiration 60 seconds" in result

    @pytest.mark.asyncio
    async def test_zadd_member_updated(self, mock_redis_connection_manager):
        """Test sorted set add operation when member score is updated."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zadd.return_value = 0  # Member already exists, score updated

        result = await zadd("test_zset", 3.0, "existing_member")

        assert (
            "Successfully added existing_member to test_zset with score 3.0" in result
        )

    @pytest.mark.asyncio
    async def test_zadd_redis_error(self, mock_redis_connection_manager):
        """Test sorted set add operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zadd.side_effect = RedisError("Connection failed")

        result = await zadd("test_zset", 1.0, "member1")

        assert "Error adding to sorted set test_zset: Connection failed" in result

    @pytest.mark.asyncio
    async def test_zadd_integer_score(self, mock_redis_connection_manager):
        """Test sorted set add operation with integer score."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zadd.return_value = 1

        result = await zadd("test_zset", 5, "member1")

        mock_redis.zadd.assert_called_once_with("test_zset", {"member1": 5})
        assert "Successfully added member1 to test_zset with score 5" in result

    @pytest.mark.asyncio
    async def test_zrange_success_without_scores(self, mock_redis_connection_manager):
        """Test successful sorted set range operation without scores."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zrange.return_value = ["member1", "member2", "member3"]

        result = await zrange("test_zset", 0, 2)

        mock_redis.zrange.assert_called_once_with("test_zset", 0, 2, withscores=False)
        assert result == "['member1', 'member2', 'member3']"

    @pytest.mark.asyncio
    async def test_zrange_success_with_scores(self, mock_redis_connection_manager):
        """Test successful sorted set range operation with scores."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zrange.return_value = [
            ("member1", 1.0),
            ("member2", 2.0),
            ("member3", 3.0),
        ]

        result = await zrange("test_zset", 0, 2, True)

        mock_redis.zrange.assert_called_once_with("test_zset", 0, 2, withscores=True)
        assert result == "[('member1', 1.0), ('member2', 2.0), ('member3', 3.0)]"

    @pytest.mark.asyncio
    async def test_zrange_default_parameters(self, mock_redis_connection_manager):
        """Test sorted set range operation with default parameters."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zrange.return_value = ["member1", "member2"]

        result = await zrange("test_zset", 0, -1)

        mock_redis.zrange.assert_called_once_with("test_zset", 0, -1, withscores=False)
        assert result == "['member1', 'member2']"

    @pytest.mark.asyncio
    async def test_zrange_empty_set(self, mock_redis_connection_manager):
        """Test sorted set range operation on empty set."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zrange.return_value = []

        result = await zrange("empty_zset", 0, -1)

        mock_redis.zrange.assert_called_once_with("empty_zset", 0, -1, withscores=False)
        assert "Sorted set empty_zset is empty or does not exist" in result

    @pytest.mark.asyncio
    async def test_zrange_redis_error(self, mock_redis_connection_manager):
        """Test sorted set range operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zrange.side_effect = RedisError("Connection failed")

        result = await zrange("test_zset", 0, -1)

        assert "Error retrieving sorted set test_zset: Connection failed" in result

    @pytest.mark.asyncio
    async def test_zrem_success(self, mock_redis_connection_manager):
        """Test successful sorted set remove operation."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zrem.return_value = 1  # Number of elements removed

        result = await zrem("test_zset", "member1")

        mock_redis.zrem.assert_called_once_with("test_zset", "member1")
        assert "Successfully removed member1 from test_zset" in result

    @pytest.mark.asyncio
    async def test_zrem_member_not_exists(self, mock_redis_connection_manager):
        """Test sorted set remove operation when member doesn't exist."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zrem.return_value = 0  # Member doesn't exist

        result = await zrem("test_zset", "nonexistent_member")

        assert "Member nonexistent_member not found in test_zset" in result

    @pytest.mark.asyncio
    async def test_zrem_redis_error(self, mock_redis_connection_manager):
        """Test sorted set remove operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zrem.side_effect = RedisError("Connection failed")

        result = await zrem("test_zset", "member1")

        assert "Error removing from sorted set test_zset: Connection failed" in result

    @pytest.mark.asyncio
    async def test_zadd_negative_score(self, mock_redis_connection_manager):
        """Test sorted set add operation with negative score."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zadd.return_value = 1

        result = await zadd("test_zset", -1.5, "negative_member")

        mock_redis.zadd.assert_called_once_with("test_zset", {"negative_member": -1.5})
        assert (
            "Successfully added negative_member to test_zset with score -1.5" in result
        )

    @pytest.mark.asyncio
    async def test_zadd_zero_score(self, mock_redis_connection_manager):
        """Test sorted set add operation with zero score."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zadd.return_value = 1

        result = await zadd("test_zset", 0, "zero_member")

        mock_redis.zadd.assert_called_once_with("test_zset", {"zero_member": 0})
        assert "Successfully added zero_member to test_zset with score 0" in result

    @pytest.mark.asyncio
    async def test_zrange_negative_indices(self, mock_redis_connection_manager):
        """Test sorted set range operation with negative indices."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zrange.return_value = ["last_member"]

        result = await zrange("test_zset", -1, -1)

        mock_redis.zrange.assert_called_once_with("test_zset", -1, -1, withscores=False)
        assert result == "['last_member']"

    @pytest.mark.asyncio
    async def test_zadd_expiration_error(self, mock_redis_connection_manager):
        """Test sorted set add operation when expiration fails."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zadd.return_value = 1
        mock_redis.expire.side_effect = RedisError("Expire failed")

        result = await zadd("test_zset", 1.0, "member1", 60)

        assert "Error adding to sorted set test_zset: Expire failed" in result

    @pytest.mark.asyncio
    async def test_zadd_with_unicode_member(self, mock_redis_connection_manager):
        """Test sorted set add operation with unicode member."""
        mock_redis = mock_redis_connection_manager
        mock_redis.zadd.return_value = 1

        unicode_member = "测试成员 🚀"
        result = await zadd("test_zset", 1.0, unicode_member)

        mock_redis.zadd.assert_called_once_with("test_zset", {unicode_member: 1.0})
        assert (
            f"Successfully added {unicode_member} to test_zset with score 1.0" in result
        )

    @pytest.mark.asyncio
    async def test_zrange_large_range(self, mock_redis_connection_manager):
        """Test sorted set range operation with large range."""
        mock_redis = mock_redis_connection_manager
        large_result = [f"member_{i}" for i in range(1000)]
        mock_redis.zrange.return_value = large_result

        result = await zrange("large_zset", 0, 999)

        # The function returns a string representation
        assert result == str(large_result)
        # Check that the original list had 1000 items
        assert len(large_result) == 1000

    @pytest.mark.asyncio
    async def test_connection_manager_called_correctly(self):
        """Test that RedisConnectionManager.get_connection is called correctly."""
        with patch(
            "src.tools.sorted_set.RedisConnectionManager.get_connection"
        ) as mock_get_conn:
            mock_redis = Mock()
            mock_redis.zadd.return_value = 1
            mock_get_conn.return_value = mock_redis

            await zadd("test_zset", 1.0, "member1")

            mock_get_conn.assert_called_once()

    @pytest.mark.asyncio
    async def test_function_signatures(self):
        """Test that functions have correct signatures."""
        import inspect

        # Test zadd function signature
        zadd_sig = inspect.signature(zadd)
        zadd_params = list(zadd_sig.parameters.keys())
        assert zadd_params == ["key", "score", "member", "expiration"]
        assert zadd_sig.parameters["expiration"].default is None

        # Test zrange function signature
        zrange_sig = inspect.signature(zrange)
        zrange_params = list(zrange_sig.parameters.keys())
        assert zrange_params == ["key", "start", "end", "with_scores"]
        # start and end are required parameters (no defaults)
        assert zrange_sig.parameters["start"].default == inspect.Parameter.empty
        assert zrange_sig.parameters["end"].default == inspect.Parameter.empty
        assert zrange_sig.parameters["with_scores"].default is False

        # Test zrem function signature
        zrem_sig = inspect.signature(zrem)
        zrem_params = list(zrem_sig.parameters.keys())
        assert zrem_params == ["key", "member"]
