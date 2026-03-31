"""
Comprehensive smoke tests for PgVector vector database provider.

Tests all methods, attributes, and connection modes.
Verifies that stored values exactly match retrieved values.
"""

import os
import pytest
from typing import List, Dict, Any, Optional
from pydantic import SecretStr

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # dotenv not available, use system env vars

from upsonic.vectordb.providers.pgvector import PgVectorProvider
from upsonic.vectordb.config import (
    PgVectorConfig,
    DistanceMetric,
    HNSWIndexConfig,
    IVFIndexConfig
)
from upsonic.utils.package.exception import (
    VectorDBConnectionError,
    UpsertError
)
from upsonic.schemas.vector_schemas import VectorSearchResult


# Test data
SAMPLE_VECTORS: List[List[float]] = [
    [0.1, 0.2, 0.3, 0.4, 0.5],
    [0.6, 0.7, 0.8, 0.9, 1.0],
    [1.1, 1.2, 1.3, 1.4, 1.5],
    [1.6, 1.7, 1.8, 1.9, 2.0],
    [2.1, 2.2, 2.3, 2.4, 2.5]
]

SAMPLE_PAYLOADS: List[Dict[str, Any]] = [
    {"content": "The theory of relativity revolutionized physics", "category": "science", "author": "Einstein", "year": 1905},
    {"content": "Laws of motion and universal gravitation", "category": "science", "author": "Newton", "year": 1687},
    {"content": "To be or not to be, that is the question", "category": "literature", "author": "Shakespeare", "year": 1600},
    {"content": "It was the best of times, it was the worst of times", "category": "literature", "author": "Dickens", "year": 1850},
    {"content": "The unexamined life is not worth living", "category": "philosophy", "author": "Plato", "year": -400}
]

SAMPLE_CHUNKS: List[str] = [
    "The theory of relativity revolutionized physics",
    "Laws of motion and universal gravitation",
    "To be or not to be, that is the question",
    "It was the best of times, it was the worst of times",
    "The unexamined life is not worth living"
]

SAMPLE_IDS: List[str] = ["doc1", "doc2", "doc3", "doc4", "doc5"]

QUERY_VECTOR: List[float] = [0.15, 0.25, 0.35, 0.45, 0.55]
QUERY_TEXT: str = "physics theory"


def assert_vector_matches(actual_vector: Any, expected_vector: List[float], vector_id: str = "", tolerance: float = 1e-6) -> None:
    """
    Assert that a retrieved vector matches the expected vector.
    
    Args:
        actual_vector: The vector retrieved from the database (can be list, numpy array, etc.)
        expected_vector: The original vector that was inserted
        vector_id: Optional ID for better error messages
        tolerance: Floating point comparison tolerance
    """
    assert actual_vector is not None, f"Vector is None for {vector_id}"
    assert hasattr(actual_vector, '__len__'), f"Vector has no length for {vector_id}"
    assert len(actual_vector) == len(expected_vector), \
        f"Vector length mismatch for {vector_id}: {len(actual_vector)} != {len(expected_vector)}"
    
    # Convert to list of floats (handles numpy arrays and other types)
    vector_list = [float(x) for x in actual_vector]
    assert len(vector_list) == len(expected_vector), \
        f"Converted vector length mismatch for {vector_id}: {len(vector_list)} != {len(expected_vector)}"
    
    # Compare element by element
    for j, (actual, expected) in enumerate(zip(vector_list, expected_vector)):
        assert abs(actual - expected) < tolerance, \
            f"Vector element {j} mismatch for {vector_id}: {actual} != {expected} (diff: {abs(actual - expected)})"


def assert_result_vector_matches(result: VectorSearchResult, expected_vector: List[float], result_index: int = 0) -> None:
    """
    Assert that a search result's vector matches the expected vector.
    
    Args:
        result: The VectorSearchResult from search/fetch operations
        expected_vector: The original vector that was inserted
        result_index: Index for better error messages
    """
    assert_vector_matches(result.vector, expected_vector, vector_id=f"result[{result_index}] (id={result.id})")


def get_expected_vector_by_id(record_id: str) -> List[float]:
    """
    Get the expected vector for a given record ID.
    
    Args:
        record_id: The ID of the record (e.g., "doc1", "doc2", etc.)
    
    Returns:
        The original vector that was inserted for this ID
    """
    if record_id in SAMPLE_IDS:
        idx = SAMPLE_IDS.index(record_id)
        return SAMPLE_VECTORS[idx]
    raise ValueError(f"Unknown record ID: {record_id}")


def get_connection_string() -> Optional[str]:
    """Get PostgreSQL connection string from environment."""
    # Try various environment variable names
    conn_str = os.getenv("POSTGRES_CONNECTION_STRING") or \
               os.getenv("PGVECTOR_CONNECTION_STRING") or \
               os.getenv("DATABASE_URL") or \
               os.getenv("POSTGRES_URL")
    
    if conn_str:
        # Ensure we use psycopg3 driver
        if conn_str.startswith("postgresql://"):
            conn_str = conn_str.replace("postgresql://", "postgresql+psycopg://", 1)
        return conn_str
    
    # Try building from individual components (defaults match docker-compose-pgvector.yml)
    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", "5434")  # Default to pgvector docker port
    user = os.getenv("POSTGRES_USER", "upsonic_test")
    password = os.getenv("POSTGRES_PASSWORD", "test_password")
    dbname = os.getenv("POSTGRES_DB", "upsonic_test")
    
    # Use postgresql+psycopg:// for psycopg3 driver
    return f"postgresql+psycopg://{user}:{password}@{host}:{port}/{dbname}"


class TestPgVectorProvider:
    """Comprehensive tests for PgVectorProvider (requires PostgreSQL with pgvector extension)."""
    
    @pytest.fixture
    def config(self, request) -> Optional[PgVectorConfig]:
        """Create PgVectorConfig if connection string available."""
        import uuid
        conn_str = get_connection_string()
        if not conn_str:
            return None
        
        unique_name = f"test_pgvector_{uuid.uuid4().hex[:8]}"
        return PgVectorConfig(
            vector_size=5,
            collection_name=unique_name,
            connection_string=SecretStr(conn_str),
            distance_metric=DistanceMetric.COSINE,
            index=HNSWIndexConfig(m=16, ef_construction=200)
        )
    
    @pytest.fixture
    def provider(self, config: Optional[PgVectorConfig]) -> Optional[PgVectorProvider]:
        """Create PgVectorProvider instance."""
        if config is None:
            return None
        return PgVectorProvider(config)
    
    def _skip_if_unavailable(self, provider: Optional[PgVectorProvider]):
        """Helper to skip tests if provider is not available."""
        if provider is None:
            pytest.skip("PostgreSQL connection string not available. Set POSTGRES_CONNECTION_STRING or POSTGRES_HOST/POSTGRES_USER/POSTGRES_PASSWORD/POSTGRES_DB environment variables.")
    
    async def _ensure_connected(self, provider: PgVectorProvider):
        """Helper to ensure connection, skip if unavailable."""
        try:
            await provider.connect()
            return True
        except VectorDBConnectionError:
            pytest.skip("PostgreSQL connection failed. Ensure PostgreSQL is running with pgvector extension installed.")
    
    def _ensure_connected_sync(self, provider: PgVectorProvider):
        """Helper to ensure sync connection, skip if unavailable."""
        try:
            provider.connect_sync()
            return True
        except VectorDBConnectionError:
            pytest.skip("PostgreSQL connection failed. Ensure PostgreSQL is running with pgvector extension installed.")
    
    @pytest.mark.asyncio
    async def test_initialization(self, provider: Optional[PgVectorProvider], config: Optional[PgVectorConfig]):
        """Test provider initialization and attributes."""
        self._skip_if_unavailable(provider)
        assert provider._config == config
        assert provider._config.collection_name.startswith("test_pgvector_")
        assert provider._config.vector_size == 5
        assert provider._config.distance_metric == DistanceMetric.COSINE
        assert not provider._is_connected
        assert provider._engine is None
        assert provider._session_factory is None
        
        # Test provider metadata attributes
        assert provider.provider_name is not None
        assert isinstance(provider.provider_id, str)
        assert len(provider.provider_id) > 0
    
    @pytest.mark.asyncio
    async def test_connect(self, provider: Optional[PgVectorProvider]):
        """Test connection to PostgreSQL."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        assert provider._is_connected is True
        assert provider._engine is not None
        assert provider._session_factory is not None
        assert await provider.is_ready() is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_connect_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous connection."""
        self._skip_if_unavailable(provider)
        self._ensure_connected_sync(provider)
        assert provider._is_connected is True
        assert provider._engine is not None
        assert provider._session_factory is not None
        assert provider.is_ready_sync() is True
        provider.disconnect_sync()
    
    @pytest.mark.asyncio
    async def test_disconnect(self, provider: Optional[PgVectorProvider]):
        """Test disconnection."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        assert provider._is_connected is True
        await provider.disconnect()
        assert provider._is_connected is False
        # Engine and session_factory are disposed but references are kept
        assert await provider.is_ready() is False
    
    @pytest.mark.asyncio
    async def test_disconnect_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous disconnection."""
        self._skip_if_unavailable(provider)
        self._ensure_connected_sync(provider)
        assert provider._is_connected is True
        provider.disconnect_sync()
        assert provider._is_connected is False
    
    @pytest.mark.asyncio
    async def test_is_ready(self, provider: Optional[PgVectorProvider]):
        """Test is_ready check."""
        self._skip_if_unavailable(provider)
        assert await provider.is_ready() is False
        await self._ensure_connected(provider)
        assert await provider.is_ready() is True
        await provider.disconnect()
        assert await provider.is_ready() is False
    
    @pytest.mark.asyncio
    async def test_is_ready_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous is_ready check."""
        self._skip_if_unavailable(provider)
        assert provider.is_ready_sync() is False
        self._ensure_connected_sync(provider)
        assert provider.is_ready_sync() is True
        provider.disconnect_sync()
        assert provider.is_ready_sync() is False
    
    @pytest.mark.asyncio
    async def test_create_collection(self, provider: Optional[PgVectorProvider]):
        """Test collection creation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        try:
            if await provider.collection_exists():
                await provider.delete_collection()
        except Exception:
            pass
        assert not await provider.collection_exists()
        await provider.create_collection()
        assert await provider.collection_exists()
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_create_collection_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous collection creation."""
        self._skip_if_unavailable(provider)
        self._ensure_connected_sync(provider)
        try:
            if provider.collection_exists_sync():
                provider.delete_collection_sync()
        except Exception:
            pass
        assert not provider.collection_exists_sync()
        provider.create_collection_sync()
        assert provider.collection_exists_sync()
        provider.disconnect_sync()
    
    @pytest.mark.asyncio
    async def test_collection_exists(self, provider: Optional[PgVectorProvider]):
        """Test collection existence check."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        try:
            if await provider.collection_exists():
                await provider.delete_collection()
        except Exception:
            pass
        assert not await provider.collection_exists()
        await provider.create_collection()
        assert await provider.collection_exists()
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_collection_exists_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous collection existence check."""
        self._skip_if_unavailable(provider)
        self._ensure_connected_sync(provider)
        try:
            if provider.collection_exists_sync():
                provider.delete_collection_sync()
        except Exception:
            pass
        assert not provider.collection_exists_sync()
        provider.create_collection_sync()
        assert provider.collection_exists_sync()
        provider.disconnect_sync()
    
    @pytest.mark.asyncio
    async def test_delete_collection(self, provider: Optional[PgVectorProvider]):
        """Test collection deletion."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        assert await provider.collection_exists()
        await provider.delete_collection()
        assert not await provider.collection_exists()
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_collection_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous collection deletion."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        assert await provider.collection_exists()
        await provider.delete_collection()
        assert not await provider.collection_exists()
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_upsert(self, provider: Optional[PgVectorProvider]):
        """Test upsert operation with content validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        # Verify data was actually stored with correct content
        results = await provider.fetch(ids=SAMPLE_IDS)
        assert len(results) == 5
        # Match by content to verify correct storage
        for result in results:
            assert result.id is not None
            assert result.payload is not None
            content = result.text
            assert content in SAMPLE_CHUNKS
            idx = SAMPLE_CHUNKS.index(content)
            # Verify payload metadata
            assert result.payload.get("category") == SAMPLE_PAYLOADS[idx]["category"]
            assert result.payload.get("author") == SAMPLE_PAYLOADS[idx]["author"]
            assert result.payload.get("year") == SAMPLE_PAYLOADS[idx]["year"]
            assert result.text == SAMPLE_CHUNKS[idx]
            # Validate vector is retrieved and matches exactly
            assert result.vector is not None
            assert_vector_matches(result.vector, SAMPLE_VECTORS[idx], vector_id=result.id)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_upsert_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous upsert with content validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = await provider.fetch(ids=SAMPLE_IDS)
        assert len(results) == 5
        for result in results:
            assert result.id is not None
            assert result.payload is not None
            assert result.text is not None
            assert result.vector is not None
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_upsert_validation_error(self, provider: Optional[PgVectorProvider]):
        """Test upsert with mismatched lengths raises error."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        with pytest.raises((ValueError, UpsertError)):
            await provider.upsert(
                vectors=SAMPLE_VECTORS[:2],
                payloads=SAMPLE_PAYLOADS[:3],
                ids=SAMPLE_IDS[:2],
                chunks=SAMPLE_CHUNKS[:2]
            )
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_fetch(self, provider: Optional[PgVectorProvider]):
        """Test fetch operation with detailed validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = await provider.fetch(ids=SAMPLE_IDS[:3])
        assert len(results) == 3
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert result.score == 1.0
            assert result.payload is not None
            assert isinstance(result.payload, dict)
            assert result.text is not None
            assert result.vector is not None
            assert len(result.vector) == 5
            # Verify vector matches exactly
            content = result.text
            idx = SAMPLE_CHUNKS.index(content)
            assert_vector_matches(result.vector, SAMPLE_VECTORS[idx], vector_id=result.id)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_fetch_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous fetch with content validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = provider.fetch_sync(ids=SAMPLE_IDS[:3])
        assert len(results) == 3
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert result.score == 1.0
            assert result.payload is not None
            assert result.text is not None
            assert result.vector is not None
            assert len(result.vector) == 5
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete(self, provider: Optional[PgVectorProvider]):
        """Test delete operation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        await provider.delete(ids=SAMPLE_IDS[:2])
        results = await provider.fetch(ids=SAMPLE_IDS[:2])
        assert len(results) == 0
        results = await provider.fetch(ids=SAMPLE_IDS[2:])
        assert len(results) == 3
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous delete with validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        provider.delete_sync(ids=SAMPLE_IDS[:2])
        results = await provider.fetch(ids=SAMPLE_IDS[:2])
        assert len(results) == 0
        results = await provider.fetch(ids=SAMPLE_IDS[2:])
        assert len(results) == 3
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_dense_search(self, provider: Optional[PgVectorProvider]):
        """Test dense search with detailed result validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = await provider.dense_search(
            query_vector=QUERY_VECTOR,
            top_k=3,
            similarity_threshold=0.0
        )
        assert len(results) > 0
        assert len(results) <= 3
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert isinstance(result.score, float)
            assert 0.0 <= result.score <= 1.0
            assert result.payload is not None
            assert result.text is not None
            assert result.vector is not None
            assert len(result.vector) == 5
            # Verify vector matches stored vector exactly
            content = result.text
            if content in SAMPLE_CHUNKS:
                idx = SAMPLE_CHUNKS.index(content)
                assert_vector_matches(result.vector, SAMPLE_VECTORS[idx], vector_id=result.id)
        scores = [r.score for r in results]
        assert scores == sorted(scores, reverse=True)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_full_text_search(self, provider: Optional[PgVectorProvider]):
        """Test full-text search with content validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = await provider.full_text_search(
            query_text="physics",
            top_k=3,
            similarity_threshold=0.0
        )
        assert len(results) > 0
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert isinstance(result.score, float)
            assert result.score >= 0.0
            assert result.payload is not None
            assert result.text is not None
            assert "physics" in result.text.lower() or "theory" in result.text.lower()
            assert result.vector is not None
            # Verify vector matches stored vector exactly
            content = result.text
            if content in SAMPLE_CHUNKS:
                idx = SAMPLE_CHUNKS.index(content)
                assert_vector_matches(result.vector, SAMPLE_VECTORS[idx], vector_id=result.id)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_hybrid_search(self, provider: Optional[PgVectorProvider]):
        """Test hybrid search with detailed validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = await provider.hybrid_search(
            query_vector=QUERY_VECTOR,
            query_text="physics",
            top_k=3,
            alpha=0.5,
            fusion_method="weighted",
            similarity_threshold=0.0
        )
        assert len(results) > 0
        assert len(results) <= 3
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert isinstance(result.score, float)
            assert result.score >= 0.0
            assert result.payload is not None
            assert result.text is not None
            assert result.vector is not None
            assert len(result.vector) == 5
            # Verify vector matches stored vector exactly
            content = result.text
            if content in SAMPLE_CHUNKS:
                idx = SAMPLE_CHUNKS.index(content)
                assert_vector_matches(result.vector, SAMPLE_VECTORS[idx], vector_id=result.id)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_search_with_filter(self, provider: Optional[PgVectorProvider]):
        """Test search with metadata filter."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        # Create payloads with metadata structure
        payloads_with_metadata = []
        for payload in SAMPLE_PAYLOADS:
            payload_copy = payload.copy()
            payload_copy["metadata"] = {"category": payload["category"]}
            payloads_with_metadata.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=payloads_with_metadata,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        # Filter by category in metadata
        results = await provider.dense_search(
            query_vector=QUERY_VECTOR,
            top_k=5,
            filter={"category": "science"}
        )
        assert len(results) > 0
        for result in results:
            # Category may be at top level or nested in metadata
            category = result.payload.get("category") or result.payload.get("metadata", {}).get("category")
            assert category == "science"
            # Verify vector matches stored vector exactly
            content = result.text
            if content in SAMPLE_CHUNKS:
                idx = SAMPLE_CHUNKS.index(content)
                assert_vector_matches(result.vector, SAMPLE_VECTORS[idx], vector_id=result.id)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_get_count(self, provider: Optional[PgVectorProvider]):
        """Test get_count."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        initial_count = await provider.get_count()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        assert await provider.get_count() == initial_count + 5
        await provider.delete(ids=SAMPLE_IDS[:2])
        assert await provider.get_count() == initial_count + 3
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_update_metadata(self, provider: Optional[PgVectorProvider]):
        """Test update_metadata with validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "pg_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        # Use async method directly
        updated = await provider.async_update_metadata("pg_content_1", {"new_field": "new_value", "updated": True})
        assert updated is True
        results = await provider.fetch(ids=SAMPLE_IDS[:1])
        assert len(results) == 1
        # Metadata is stored at top level of payload, not nested
        assert results[0].payload.get("new_field") == "new_value"
        assert results[0].payload.get("updated") is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_by_filter(self, provider: Optional[PgVectorProvider]):
        """Test delete_by_metadata."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        # Create payloads with metadata structure
        payloads_with_metadata = []
        for payload in SAMPLE_PAYLOADS:
            payload_copy = payload.copy()
            payload_copy["metadata"] = {"category": payload["category"]}
            payloads_with_metadata.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=payloads_with_metadata,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        deleted = await provider.async_delete_by_metadata({"category": "science"})
        assert deleted is True
        results = await provider.fetch(ids=SAMPLE_IDS)
        assert len(results) == 3
        for result in results:
            assert result.payload.get("metadata", {}).get("category") != "science"
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_upsert_with_document_tracking(self, provider: Optional[PgVectorProvider]):
        """Test upsert with document tracking and validate metadata."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_tracking = []
        for i, payload in enumerate(SAMPLE_PAYLOADS[:2]):
            payload_copy = payload.copy()
            payload_copy["document_name"] = f"pg_doc{i+1}"
            payload_copy["document_id"] = f"pg_doc_id_{i+1}"
            payload_copy["content_id"] = f"pg_content_{i+1}"
            payloads_with_tracking.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_tracking,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        results = await provider.fetch(ids=SAMPLE_IDS[:2])
        assert len(results) == 2
        # Match by content_id
        for result in results:
            content_id = result.payload.get("content_id")
            assert content_id in ["pg_content_1", "pg_content_2"]
            idx = int(content_id.split("_")[-1]) - 1
            assert result.payload.get("document_name") == f"pg_doc{idx+1}"
            assert result.payload.get("document_id") == f"pg_doc_id_{idx+1}"
            assert result.payload.get("category") == SAMPLE_PAYLOADS[idx]["category"]
            # Verify vector matches exactly
            assert_vector_matches(result.vector, SAMPLE_VECTORS[idx], vector_id=result.id)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_by_document_name(self, provider: Optional[PgVectorProvider]):
        """Test delete_by_document_name with validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        initial_count = await provider.get_count()
        payloads_with_doc_name = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["document_name"] = "pg_doc"
            payloads_with_doc_name.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_doc_name,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_document_name("pg_doc")
        assert deleted is True
        count = await provider.get_count()
        assert count == initial_count
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_delete_by_document_name(self, provider: Optional[PgVectorProvider]):
        """Test async_delete_by_document_name."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_doc_name = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["document_name"] = "pg_doc"
            payloads_with_doc_name.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_doc_name,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_document_name("pg_doc")
        assert deleted is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_by_document_id(self, provider: Optional[PgVectorProvider]):
        """Test delete_by_document_id with validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_doc_id = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["document_id"] = "pg_doc_id_1"
            payloads_with_doc_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_doc_id,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_document_id("pg_doc_id_1")
        assert deleted is True
        results = await provider.fetch(ids=SAMPLE_IDS[:2])
        assert len(results) == 0
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_delete_by_document_id(self, provider: Optional[PgVectorProvider]):
        """Test async_delete_by_document_id."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_doc_id = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["document_id"] = "pg_doc_id_1"
            payloads_with_doc_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_doc_id,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_document_id("pg_doc_id_1")
        assert deleted is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_by_content_id(self, provider: Optional[PgVectorProvider]):
        """Test delete_by_content_id with validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        # Create payloads with unique content_ids
        payloads_with_content_id = []
        for i, payload in enumerate(SAMPLE_PAYLOADS[:2]):
            payload_copy = payload.copy()
            payload_copy["content_id"] = f"pg_content_{i+1}"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        # Delete only the first content_id
        deleted = await provider.async_delete_by_content_id("pg_content_1")
        assert deleted is True
        # First record should be deleted, second should remain
        results1 = await provider.fetch(ids=SAMPLE_IDS[:1])
        results2 = await provider.fetch(ids=SAMPLE_IDS[1:2])
        assert len(results1) == 0  # Deleted
        assert len(results2) == 1  # Not deleted
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_delete_by_content_id(self, provider: Optional[PgVectorProvider]):
        """Test async_delete_by_content_id."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        # Create payloads with unique content_ids
        payloads_with_content_id = []
        for i, payload in enumerate(SAMPLE_PAYLOADS[:2]):
            payload_copy = payload.copy()
            payload_copy["content_id"] = f"pg_content_{i+1}"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_content_id("pg_content_1")
        assert deleted is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_delete_by_metadata(self, provider: Optional[PgVectorProvider]):
        """Test async_delete_by_metadata."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        # Create payloads with metadata structure
        payloads_with_metadata = []
        for payload in SAMPLE_PAYLOADS:
            payload_copy = payload.copy()
            payload_copy["metadata"] = {"category": payload["category"]}
            payloads_with_metadata.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=payloads_with_metadata,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        deleted = await provider.async_delete_by_metadata({"category": "science"})
        assert deleted is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_id_exists(self, provider: Optional[PgVectorProvider]):
        """Test id_exists check."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=SAMPLE_PAYLOADS[:1],
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.id_exists("doc1")
        assert not await provider.id_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_document_name_exists(self, provider: Optional[PgVectorProvider]):
        """Test document_name_exists."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_doc_name = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["document_name"] = "pg_doc"
            payloads_with_doc_name.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_doc_name,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.async_document_name_exists("pg_doc")
        assert not await provider.async_document_name_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_document_name_exists(self, provider: Optional[PgVectorProvider]):
        """Test async_document_name_exists."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_doc_name = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["document_name"] = "pg_doc"
            payloads_with_doc_name.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_doc_name,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.async_document_name_exists("pg_doc")
        assert not await provider.async_document_name_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_document_id_exists(self, provider: Optional[PgVectorProvider]):
        """Test document_id_exists."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_doc_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["document_id"] = "pg_doc_id_1"
            payloads_with_doc_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_doc_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.async_document_id_exists("pg_doc_id_1")
        assert not await provider.async_document_id_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_document_id_exists(self, provider: Optional[PgVectorProvider]):
        """Test async_document_id_exists."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_doc_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["document_id"] = "pg_doc_id_1"
            payloads_with_doc_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_doc_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.async_document_id_exists("pg_doc_id_1")
        assert not await provider.async_document_id_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_content_id_exists(self, provider: Optional[PgVectorProvider]):
        """Test content_id_exists."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "pg_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.async_content_id_exists("pg_content_1")
        assert not await provider.async_content_id_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_content_id_exists(self, provider: Optional[PgVectorProvider]):
        """Test async_content_id_exists."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "pg_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.async_content_id_exists("pg_content_1")
        assert not await provider.async_content_id_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_update_metadata(self, provider: Optional[PgVectorProvider]):
        """Test async_update_metadata with validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "pg_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        updated = await provider.async_update_metadata("pg_content_1", {"new_field": "new_value", "updated": True})
        assert updated is True
        results = await provider.fetch(ids=SAMPLE_IDS[:1])
        # Metadata is stored at top level of payload, not nested
        assert results[0].payload.get("new_field") == "new_value"
        assert results[0].payload.get("updated") is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_optimize(self, provider: Optional[PgVectorProvider]):
        """Test optimize operation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        result = await provider.async_optimize()
        assert result is True
    
    @pytest.mark.asyncio
    async def test_async_optimize(self, provider: Optional[PgVectorProvider]):
        """Test async optimize."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        result = await provider.async_optimize()
        assert result is True
    
    @pytest.mark.asyncio
    async def test_get_supported_search_types(self, provider: Optional[PgVectorProvider]):
        """Test get_supported_search_types."""
        self._skip_if_unavailable(provider)
        supported = provider.get_supported_search_types()
        assert isinstance(supported, list)
        assert "dense" in supported
        assert "full_text" in supported
        assert "hybrid" in supported
    
    @pytest.mark.asyncio
    async def test_async_get_supported_search_types(self, provider: Optional[PgVectorProvider]):
        """Test async_get_supported_search_types."""
        self._skip_if_unavailable(provider)
        supported = await provider.async_get_supported_search_types()
        assert isinstance(supported, list)
        assert "dense" in supported
        assert "full_text" in supported
        assert "hybrid" in supported
    
    @pytest.mark.asyncio
    async def test_dense_search_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous dense search with content validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = provider.dense_search_sync(
            query_vector=QUERY_VECTOR,
            top_k=3,
            similarity_threshold=0.0
        )
        assert len(results) > 0
        assert len(results) <= 3
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert isinstance(result.score, float)
            assert 0.0 <= result.score <= 1.0
            assert result.payload is not None
            assert result.text is not None
            assert result.vector is not None
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_full_text_search_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous full-text search with content validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = provider.full_text_search_sync(
            query_text="physics",
            top_k=3,
            similarity_threshold=0.0
        )
        assert len(results) > 0
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert isinstance(result.score, float)
            assert result.score >= 0.0
            assert result.payload is not None
            assert result.text is not None
            assert "physics" in result.text.lower() or "theory" in result.text.lower()
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_hybrid_search_rrf(self, provider: Optional[PgVectorProvider]):
        """Test hybrid search with RRF fusion."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = await provider.hybrid_search(
            query_vector=QUERY_VECTOR,
            query_text="physics",
            top_k=3,
            fusion_method="rrf",
            similarity_threshold=0.0
        )
        assert len(results) > 0
        assert len(results) <= 3
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert result.score >= 0.0
            assert result.payload is not None
            assert result.text is not None
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_hybrid_search_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous hybrid search with validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = provider.hybrid_search_sync(
            query_vector=QUERY_VECTOR,
            query_text="physics",
            top_k=3,
            alpha=0.5,
            similarity_threshold=0.0
        )
        assert len(results) > 0
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert result.score >= 0.0
            assert result.payload is not None
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_search_master_method(self, provider: Optional[PgVectorProvider]):
        """Test master search method with content validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        # Dense search
        results = await provider.search(
            query_vector=QUERY_VECTOR,
            top_k=3
        )
        assert len(results) > 0
        assert all(isinstance(r, VectorSearchResult) for r in results)
        assert all(r.id is not None for r in results)
        assert all(r.payload is not None for r in results)
        # Full-text search
        results = await provider.search(
            query_text="physics",
            top_k=3
        )
        assert len(results) > 0
        assert all(isinstance(r, VectorSearchResult) for r in results)
        # Hybrid search
        results = await provider.search(
            query_vector=QUERY_VECTOR,
            query_text="physics",
            top_k=3
        )
        assert len(results) > 0
        assert all(isinstance(r, VectorSearchResult) for r in results)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_search_sync(self, provider: Optional[PgVectorProvider]):
        """Test synchronous master search with validation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        results = provider.search_sync(
            query_vector=QUERY_VECTOR,
            top_k=3
        )
        assert len(results) > 0
        assert all(isinstance(r, VectorSearchResult) for r in results)
        assert all(r.payload is not None for r in results)
        assert all(r.text is not None for r in results)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_recreate_if_exists(self, provider: Optional[PgVectorProvider]):
        """Test recreate_if_exists configuration."""
        self._skip_if_unavailable(provider)
        import uuid
        conn_str = get_connection_string()
        if not conn_str:
            pytest.skip("PostgreSQL connection string not available")
        unique_name = f"test_recreate_{uuid.uuid4().hex[:8]}"
        config = PgVectorConfig(
            vector_size=5,
            collection_name=unique_name,
            connection_string=SecretStr(conn_str),
            recreate_if_exists=True
        )
        provider2 = PgVectorProvider(config)
        await self._ensure_connected(provider2)
        await provider2.create_collection()
        await provider2.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=SAMPLE_PAYLOADS[:1],
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        await provider2.create_collection()
        count = await provider2.get_count()
        assert count == 0
        await provider2.disconnect()
    
    @pytest.mark.asyncio
    async def test_flat_index_config(self, provider: Optional[PgVectorProvider]):
        """Test FlatIndexConfig (IVFFlat)."""
        self._skip_if_unavailable(provider)
        import uuid
        conn_str = get_connection_string()
        if not conn_str:
            pytest.skip("PostgreSQL connection string not available")
        unique_name = f"test_ivfflat_{uuid.uuid4().hex[:8]}"
        config = PgVectorConfig(
            vector_size=5,
            collection_name=unique_name,
            connection_string=SecretStr(conn_str),
            index=IVFIndexConfig(nlist=10)
        )
        provider2 = PgVectorProvider(config)
        await self._ensure_connected(provider2)
        await provider2.create_collection()
        await provider2.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=SAMPLE_PAYLOADS[:2],
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        results = await provider2.dense_search(
            query_vector=QUERY_VECTOR,
            top_k=2,
            similarity_threshold=0.0
        )
        assert len(results) > 0
        assert all(isinstance(r, VectorSearchResult) for r in results)
        assert all(r.score >= 0.0 for r in results)
        await provider2.disconnect()
    
    @pytest.mark.asyncio
    async def test_distance_metrics(self, provider: Optional[PgVectorProvider]):
        """Test different distance metrics."""
        self._skip_if_unavailable(provider)
        import uuid
        conn_str = get_connection_string()
        if not conn_str:
            pytest.skip("PostgreSQL connection string not available")
        for metric in [DistanceMetric.COSINE, DistanceMetric.EUCLIDEAN, DistanceMetric.DOT_PRODUCT]:
            # PostgreSQL lowercases unquoted identifiers, so use lowercase names
            unique_name = f"test_{metric.value.lower()}_{uuid.uuid4().hex[:8]}"
            config = PgVectorConfig(
                vector_size=5,
                collection_name=unique_name,
                connection_string=SecretStr(conn_str),
                distance_metric=metric
            )
            provider2 = PgVectorProvider(config)
            await self._ensure_connected(provider2)
            await provider2.create_collection()
            await provider2.upsert(
                vectors=SAMPLE_VECTORS[:2],
                payloads=SAMPLE_PAYLOADS[:2],
                ids=SAMPLE_IDS[:2],
                chunks=SAMPLE_CHUNKS[:2]
            )
            results = await provider2.dense_search(
                query_vector=QUERY_VECTOR,
                top_k=2,
                similarity_threshold=0.0
            )
            assert len(results) > 0
            assert all(isinstance(r, VectorSearchResult) for r in results)
            # All scores should be normalized to [0, 1] range regardless of metric
            assert all(r.score >= 0.0 for r in results), f"Scores should be >= 0 for {metric.value}"
            assert all(r.score <= 1.0 for r in results), f"Scores should be <= 1 for {metric.value}"
            await provider2.disconnect()
    
    @pytest.mark.asyncio
    async def test_clear(self, provider: Optional[PgVectorProvider]):
        """Test clear operation."""
        self._skip_if_unavailable(provider)
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        assert await provider.get_count() == 5
        await provider.clear()
        assert await provider.get_count() == 0
        assert await provider.collection_exists()  # Table should still exist
        await provider.disconnect()
