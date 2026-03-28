"""
Unit tests for src/tools/server_management.py
"""

import pytest
from redis.exceptions import ConnectionError, RedisError

from src.tools.server_management import client_list, dbsize, info


class TestServerManagementOperations:
    """Test cases for Redis server management operations."""

    @pytest.mark.asyncio
    async def test_dbsize_success(self, mock_redis_connection_manager):
        """Test successful database size operation."""
        mock_redis = mock_redis_connection_manager
        mock_redis.dbsize.return_value = 1000

        result = await dbsize()

        mock_redis.dbsize.assert_called_once()
        assert result == 1000

    @pytest.mark.asyncio
    async def test_dbsize_zero_keys(self, mock_redis_connection_manager):
        """Test database size operation with empty database."""
        mock_redis = mock_redis_connection_manager
        mock_redis.dbsize.return_value = 0

        result = await dbsize()

        assert result == 0

    @pytest.mark.asyncio
    async def test_dbsize_redis_error(self, mock_redis_connection_manager):
        """Test database size operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.dbsize.side_effect = RedisError("Connection failed")

        result = await dbsize()

        assert "Error getting database size: Connection failed" in result

    @pytest.mark.asyncio
    async def test_info_success_default_section(self, mock_redis_connection_manager):
        """Test successful info operation with default section."""
        mock_redis = mock_redis_connection_manager
        mock_info = {
            "redis_version": "7.0.0",
            "used_memory": "1024000",
            "connected_clients": "5",
            "total_commands_processed": "1000",
        }
        mock_redis.info.return_value = mock_info

        result = await info()

        mock_redis.info.assert_called_once_with("default")
        assert result == mock_info

    @pytest.mark.asyncio
    async def test_info_success_specific_section(self, mock_redis_connection_manager):
        """Test successful info operation with specific section."""
        mock_redis = mock_redis_connection_manager
        mock_memory_info = {
            "used_memory": "2048000",
            "used_memory_human": "2.00M",
            "used_memory_peak": "3072000",
            "used_memory_peak_human": "3.00M",
        }
        mock_redis.info.return_value = mock_memory_info

        result = await info("memory")

        mock_redis.info.assert_called_once_with("memory")
        assert result == mock_memory_info

    @pytest.mark.asyncio
    async def test_info_all_sections(self, mock_redis_connection_manager):
        """Test info operation with 'all' section."""
        mock_redis = mock_redis_connection_manager
        mock_all_info = {
            "redis_version": "7.0.0",
            "used_memory": "1024000",
            "connected_clients": "5",
            "keyspace_hits": "500",
            "keyspace_misses": "100",
        }
        mock_redis.info.return_value = mock_all_info

        result = await info("all")

        mock_redis.info.assert_called_once_with("all")
        assert result == mock_all_info

    @pytest.mark.asyncio
    async def test_info_redis_error(self, mock_redis_connection_manager):
        """Test info operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.info.side_effect = RedisError("Connection failed")

        result = await info("server")

        assert "Error retrieving Redis info: Connection failed" in result

    @pytest.mark.asyncio
    async def test_info_invalid_section(self, mock_redis_connection_manager):
        """Test info operation with invalid section."""
        mock_redis = mock_redis_connection_manager
        mock_redis.info.side_effect = RedisError("Unknown section")

        result = await info("invalid_section")

        assert "Error retrieving Redis info: Unknown section" in result

    @pytest.mark.asyncio
    async def test_client_list_success(self, mock_redis_connection_manager):
        """Test successful client list operation."""
        mock_redis = mock_redis_connection_manager
        mock_clients = [
            {
                "id": "1",
                "addr": "127.0.0.1:12345",
                "name": "client1",
                "age": "100",
                "idle": "0",
                "flags": "N",
                "db": "0",
                "sub": "0",
                "psub": "0",
                "multi": "-1",
                "qbuf": "0",
                "qbuf-free": "32768",
                "obl": "0",
                "oll": "0",
                "omem": "0",
                "events": "r",
                "cmd": "client",
            },
            {
                "id": "2",
                "addr": "127.0.0.1:12346",
                "name": "client2",
                "age": "200",
                "idle": "5",
                "flags": "N",
                "db": "1",
                "sub": "0",
                "psub": "0",
                "multi": "-1",
                "qbuf": "0",
                "qbuf-free": "32768",
                "obl": "0",
                "oll": "0",
                "omem": "0",
                "events": "r",
                "cmd": "get",
            },
        ]
        mock_redis.client_list.return_value = mock_clients

        result = await client_list()

        mock_redis.client_list.assert_called_once()
        assert result == mock_clients
        assert len(result) == 2
        assert result[0]["id"] == "1"
        assert result[1]["id"] == "2"

    @pytest.mark.asyncio
    async def test_client_list_empty(self, mock_redis_connection_manager):
        """Test client list operation with no clients."""
        mock_redis = mock_redis_connection_manager
        mock_redis.client_list.return_value = []

        result = await client_list()

        assert result == []

    @pytest.mark.asyncio
    async def test_client_list_redis_error(self, mock_redis_connection_manager):
        """Test client list operation with Redis error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.client_list.side_effect = RedisError("Connection failed")

        result = await client_list()

        assert "Error retrieving client list: Connection failed" in result

    @pytest.mark.asyncio
    async def test_client_list_connection_error(self, mock_redis_connection_manager):
        """Test client list operation with connection error."""
        mock_redis = mock_redis_connection_manager
        mock_redis.client_list.side_effect = ConnectionError("Redis server unavailable")

        result = await client_list()

        assert "Error retrieving client list: Redis server unavailable" in result

    @pytest.mark.asyncio
    async def test_info_stats_section(self, mock_redis_connection_manager):
        """Test info operation with stats section."""
        mock_redis = mock_redis_connection_manager
        mock_stats_info = {
            "total_connections_received": "1000",
            "total_commands_processed": "5000",
            "instantaneous_ops_per_sec": "10",
            "total_net_input_bytes": "1024000",
            "total_net_output_bytes": "2048000",
            "instantaneous_input_kbps": "1.5",
            "instantaneous_output_kbps": "3.0",
            "rejected_connections": "0",
            "sync_full": "0",
            "sync_partial_ok": "0",
            "sync_partial_err": "0",
            "expired_keys": "100",
            "evicted_keys": "0",
            "keyspace_hits": "4000",
            "keyspace_misses": "1000",
            "pubsub_channels": "0",
            "pubsub_patterns": "0",
            "latest_fork_usec": "0",
        }
        mock_redis.info.return_value = mock_stats_info

        result = await info("stats")

        mock_redis.info.assert_called_once_with("stats")
        assert result == mock_stats_info
        assert "keyspace_hits" in result
        assert "keyspace_misses" in result

    @pytest.mark.asyncio
    async def test_info_replication_section(self, mock_redis_connection_manager):
        """Test info operation with replication section."""
        mock_redis = mock_redis_connection_manager
        mock_replication_info = {
            "role": "master",
            "connected_slaves": "2",
            "master_replid": "abc123def456",
            "master_replid2": "0000000000000000000000000000000000000000",
            "master_repl_offset": "1000",
            "second_repl_offset": "-1",
            "repl_backlog_active": "1",
            "repl_backlog_size": "1048576",
            "repl_backlog_first_byte_offset": "1",
            "repl_backlog_histlen": "1000",
        }
        mock_redis.info.return_value = mock_replication_info

        result = await info("replication")

        mock_redis.info.assert_called_once_with("replication")
        assert result == mock_replication_info
        assert result["role"] == "master"
        assert result["connected_slaves"] == "2"

    @pytest.mark.asyncio
    async def test_dbsize_large_number(self, mock_redis_connection_manager):
        """Test database size operation with large number of keys."""
        mock_redis = mock_redis_connection_manager
        mock_redis.dbsize.return_value = 1000000  # 1 million keys

        result = await dbsize()

        assert result == 1000000

    @pytest.mark.asyncio
    async def test_client_list_single_client(self, mock_redis_connection_manager):
        """Test client list operation with single client."""
        mock_redis = mock_redis_connection_manager
        mock_clients = [
            {
                "id": "1",
                "addr": "127.0.0.1:12345",
                "name": "",
                "age": "50",
                "idle": "0",
                "flags": "N",
                "db": "0",
                "sub": "0",
                "psub": "0",
                "multi": "-1",
                "qbuf": "0",
                "qbuf-free": "32768",
                "obl": "0",
                "oll": "0",
                "omem": "0",
                "events": "r",
                "cmd": "ping",
            }
        ]
        mock_redis.client_list.return_value = mock_clients

        result = await client_list()

        assert len(result) == 1
        assert result[0]["id"] == "1"
        assert result[0]["cmd"] == "ping"
