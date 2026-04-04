"""
Comprehensive smoke tests for FAISS vector database provider.

Tests all methods, attributes, and file-based persistence.
"""

import os
import pytest
import tempfile
import asyncio
import shutil
from pathlib import Path
from typing import List, Dict, Any, Optional

import numpy as np

from upsonic.vectordb.providers.faiss import FaissProvider
from upsonic.vectordb.config import (
    FaissConfig,
    DistanceMetric,
    HNSWIndexConfig,
    FlatIndexConfig,
    IVFIndexConfig
)
from upsonic.utils.package.exception import (
    VectorDBConnectionError,
    ConfigurationError,
    VectorDBError,
    SearchError,
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


def assert_vector_matches(actual_vector: Any, expected_vector: List[float], vector_id: str = "", tolerance: float = 1e-5) -> None:
    """
    Assert that a retrieved vector matches the expected vector.
    
    Note: FAISS normalizes vectors for cosine similarity, so we need to account for that.
    
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
    
    # For normalized vectors, we check magnitude and direction
    # Calculate magnitude
    actual_mag = np.linalg.norm(vector_list)
    expected_mag = np.linalg.norm(expected_vector)
    
    # If vectors are normalized, magnitude should be ~1.0
    # We check if the normalized versions match direction-wise
    if actual_mag > 0 and expected_mag > 0:
        actual_normalized = [x / actual_mag for x in vector_list]
        expected_normalized = [x / expected_mag for x in expected_vector]
        
        # Compare normalized vectors
        for j, (actual, expected) in enumerate(zip(actual_normalized, expected_normalized)):
            assert abs(actual - expected) < tolerance, \
                f"Normalized vector element {j} mismatch for {vector_id}: {actual} != {expected} (diff: {abs(actual - expected)})"


def assert_result_vector_matches(result: VectorSearchResult, expected_vector: List[float], result_index: int = 0) -> None:
    """
    Assert that a search result's vector matches the expected vector.
    
    Args:
        result: The VectorSearchResult from search/fetch operations
        expected_vector: The original vector that was inserted
        result_index: Index for better error messages
    """
    assert_vector_matches(result.vector, expected_vector, vector_id=f"result[{result_index}] (id={result.id})")


def get_expected_vector_by_content(content: str) -> List[float]:
    """
    Get the expected vector for a given content string.
    
    Args:
        content: The content string
    
    Returns:
        The original vector that was inserted for this content
    """
    if content in SAMPLE_CHUNKS:
        idx = SAMPLE_CHUNKS.index(content)
        return SAMPLE_VECTORS[idx]
    raise ValueError(f"Unknown content: {content}")


class TestFaissProvider:
    """Comprehensive tests for FaissProvider with file-based persistence."""
    
    @pytest.fixture
    def temp_dir(self):
        """Create a temporary directory for FAISS database."""
        temp_path = tempfile.mkdtemp()
        yield temp_path
        # Cleanup
        if os.path.exists(temp_path):
            shutil.rmtree(temp_path, ignore_errors=True)
    
    @pytest.fixture
    def config(self, request, temp_dir) -> FaissConfig:
        """Create FaissConfig with unique collection name and temp directory."""
        import uuid
        unique_name = f"test_faiss_{uuid.uuid4().hex[:8]}"
        db_path = os.path.join(temp_dir, unique_name)
        return FaissConfig(
            vector_size=5,
            collection_name=unique_name,
            db_path=db_path,
            distance_metric=DistanceMetric.COSINE,
            index=HNSWIndexConfig(m=16, ef_construction=200),
            normalize_vectors=True
        )
    
    @pytest.fixture
    def provider(self, config: FaissConfig) -> FaissProvider:
        """Create FaissProvider instance."""
        return FaissProvider(config)
    
    @pytest.mark.asyncio
    async def test_initialization(self, provider: FaissProvider, config: FaissConfig):
        """Test provider initialization and attributes."""
        assert provider._config == config
        assert provider._config.collection_name.startswith("test_faiss_")
        assert provider._config.vector_size == 5
        assert provider._config.distance_metric == DistanceMetric.COSINE
        assert not provider._is_connected
        assert provider._index is None
        assert provider._normalize_vectors is True
        
        # Test internal state
        assert provider._metadata_store == {}
        assert provider._content_id_to_faiss_id == {}
        assert provider._faiss_id_to_content_id == {}
        assert provider._field_indexes == {}
    
    @pytest.mark.asyncio
    async def test_connect(self, provider: FaissProvider):
        """Test connection to FAISS."""
        await provider.connect()
        assert provider._is_connected is True
    
    @pytest.mark.asyncio
    async def test_connect_sync(self, provider: FaissProvider):
        """Test synchronous connection."""
        provider.connect_sync()
        assert provider._is_connected is True
    
    @pytest.mark.asyncio
    async def test_disconnect(self, provider: FaissProvider):
        """Test disconnection."""
        await provider.connect()
        assert provider._is_connected is True
        await provider.disconnect()
        assert provider._is_connected is False
        assert provider._index is None
    
    @pytest.mark.asyncio
    async def test_disconnect_sync(self, provider: FaissProvider):
        """Test synchronous disconnection."""
        provider.connect_sync()
        assert provider._is_connected is True
        provider.disconnect_sync()
        assert provider._is_connected is False
    
    @pytest.mark.asyncio
    async def test_is_ready(self, provider: FaissProvider):
        """Test is_ready check."""
        assert await provider.is_ready() is False
        await provider.connect()
        assert await provider.is_ready() is False  # Not ready until collection is created
        await provider.create_collection()
        assert await provider.is_ready() is True
        await provider.disconnect()
        assert await provider.is_ready() is False
    
    @pytest.mark.asyncio
    async def test_is_ready_sync(self, provider: FaissProvider):
        """Test synchronous is_ready check."""
        assert provider.is_ready_sync() is False
        provider.connect_sync()
        assert provider.is_ready_sync() is False
        provider.create_collection_sync()
        assert provider.is_ready_sync() is True
        provider.disconnect_sync()
        assert provider.is_ready_sync() is False
    
    @pytest.mark.asyncio
    async def test_create_collection(self, provider: FaissProvider):
        """Test collection creation."""
        await provider.connect()
        assert not await provider.collection_exists()
        await provider.create_collection()
        # After creation, index exists in memory but not on disk until disconnect
        assert provider._index is not None
        await provider.disconnect()
        # After disconnect, collection should exist on disk
        assert await provider.collection_exists()
    
    @pytest.mark.asyncio
    async def test_create_collection_sync(self, provider: FaissProvider):
        """Test synchronous collection creation."""
        provider.connect_sync()
        try:
            if provider.collection_exists_sync():
                provider.delete_collection_sync()
        except Exception:
            pass
        assert not provider.collection_exists_sync()
        provider.create_collection_sync()
        assert provider._index is not None
        provider.disconnect_sync()
        # After disconnect, collection should exist on disk
        assert provider.collection_exists_sync()
    
    @pytest.mark.asyncio
    async def test_collection_exists(self, provider: FaissProvider):
        """Test collection existence check."""
        await provider.connect()
        try:
            if await provider.collection_exists():
                await provider.delete_collection()
        except Exception:
            pass
        assert not await provider.collection_exists()
        await provider.create_collection()
        assert provider._index is not None
        await provider.disconnect()
        # After disconnect, collection should exist on disk
        assert await provider.collection_exists()
    
    @pytest.mark.asyncio
    async def test_collection_exists_sync(self, provider: FaissProvider):
        """Test synchronous collection existence check."""
        provider.connect_sync()
        try:
            if provider.collection_exists_sync():
                provider.delete_collection_sync()
        except Exception:
            pass
        assert not provider.collection_exists_sync()
        provider.create_collection_sync()
        assert provider._index is not None
        provider.disconnect_sync()
        # After disconnect, collection should exist on disk
        assert provider.collection_exists_sync()
    
    @pytest.mark.asyncio
    async def test_delete_collection(self, provider: FaissProvider):
        """Test collection deletion."""
        await provider.connect()
        await provider.create_collection()
        assert provider._index is not None
        await provider.disconnect()
        # After disconnect, collection exists on disk
        assert await provider.collection_exists()
        await provider.connect()
        await provider.delete_collection()
        assert not await provider.collection_exists()
        assert provider._index is None
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_collection_sync(self, provider: FaissProvider):
        """Test synchronous collection deletion."""
        provider.connect_sync()
        provider.create_collection_sync()
        assert provider._index is not None
        provider.disconnect_sync()
        # After disconnect, collection exists on disk
        assert provider.collection_exists_sync()
        provider.connect_sync()
        provider.delete_collection_sync()
        assert not provider.collection_exists_sync()
        assert provider._index is None
        provider.disconnect_sync()
    
    @pytest.mark.asyncio
    async def test_upsert(self, provider: FaissProvider):
        """Test upsert operation with content validation."""
        await provider.connect()
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        # Verify data was actually stored with correct content
        # Since content_id is auto-generated, fetch all and verify content
        content_ids = list(provider._content_id_to_faiss_id.keys())
        assert len(content_ids) == 5
        all_results = await provider.fetch(ids=content_ids)
        assert len(all_results) == 5
        for result in all_results:
            assert result.id is not None
            assert result.payload is not None
            content = result.text
            assert content in SAMPLE_CHUNKS
            idx = SAMPLE_CHUNKS.index(content)
            assert result.payload.get("category") == SAMPLE_PAYLOADS[idx]["category"]
            assert result.payload.get("author") == SAMPLE_PAYLOADS[idx]["author"]
            assert result.payload.get("year") == SAMPLE_PAYLOADS[idx]["year"]
            assert result.text == SAMPLE_CHUNKS[idx]
            # Validate vector is retrieved and has correct length
            assert result.vector is not None
            assert len(result.vector) == len(SAMPLE_VECTORS[idx])
            # Validate vector matches (accounting for normalization)
            assert_result_vector_matches(result, SAMPLE_VECTORS[idx])
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_upsert_sync(self, provider: FaissProvider):
        """Test synchronous upsert with content validation."""
        provider.connect_sync()
        provider.create_collection_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        # Verify data was stored
        content_ids = list(provider._content_id_to_faiss_id.keys())
        results = provider.fetch_sync(ids=content_ids[:3])
        assert len(results) >= 3
        for result in results:
            assert result.id is not None
            assert result.payload is not None
            assert result.text is not None
            assert result.vector is not None
        provider.disconnect_sync()
    
    @pytest.mark.asyncio
    async def test_upsert_with_document_tracking(self, provider: FaissProvider):
        """Test upsert with document_name, document_id, content_id and validate metadata."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_tracking = []
        for i, payload in enumerate(SAMPLE_PAYLOADS[:2]):
            payload_copy = payload.copy()
            payload_copy["document_name"] = f"faiss_doc{i+1}"
            payload_copy["document_id"] = f"faiss_doc_id_{i+1}"
            payload_copy["content_id"] = f"faiss_content_{i+1}"
            payloads_with_tracking.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_tracking,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        # Verify tracking metadata was stored correctly
        results = await provider.fetch(ids=["faiss_content_1", "faiss_content_2"])
        assert len(results) == 2
        for result in results:
            content_id = result.payload.get("content_id")
            assert content_id in ["faiss_content_1", "faiss_content_2"]
            idx = int(content_id.split("_")[-1]) - 1
            assert result.payload.get("document_name") == f"faiss_doc{idx+1}"
            assert result.payload.get("document_id") == f"faiss_doc_id_{idx+1}"
            assert result.payload.get("content_id") == f"faiss_content_{idx+1}"
            assert result.payload.get("category") == SAMPLE_PAYLOADS[idx]["category"]
            assert result.text == SAMPLE_CHUNKS[idx]
            # Validate vector is retrieved and matches
            assert result.vector is not None
            assert len(result.vector) == len(SAMPLE_VECTORS[idx])
            assert_result_vector_matches(result, SAMPLE_VECTORS[idx])
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_upsert_validation_error(self, provider: FaissProvider):
        """Test upsert with mismatched lengths raises error."""
        await provider.connect()
        await provider.create_collection()
        with pytest.raises(UpsertError):
            await provider.upsert(
                vectors=SAMPLE_VECTORS[:2],
                payloads=SAMPLE_PAYLOADS[:3],
                ids=SAMPLE_IDS[:2],
                chunks=SAMPLE_CHUNKS[:2]
            )
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_fetch(self, provider: FaissProvider):
        """Test fetch operation with detailed validation."""
        await provider.connect()
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        # Get content_ids from metadata store
        content_ids = list(provider._content_id_to_faiss_id.keys())
        results = await provider.fetch(ids=content_ids[:3])
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
            # Validate that content matches
            assert result.text in SAMPLE_CHUNKS
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_fetch_sync(self, provider: FaissProvider):
        """Test synchronous fetch with content validation."""
        provider.connect_sync()
        provider.create_collection_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        content_ids = list(provider._content_id_to_faiss_id.keys())
        results = provider.fetch_sync(ids=content_ids[:3])
        assert len(results) == 3
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert result.score == 1.0
            assert result.payload is not None
            assert result.text is not None
            assert result.vector is not None
        provider.disconnect_sync()
    
    @pytest.mark.asyncio
    async def test_delete(self, provider: FaissProvider):
        """Test delete operation."""
        await provider.connect()
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        content_ids = list(provider._content_id_to_faiss_id.keys())
        await provider.delete(ids=content_ids[:2])
        results = await provider.fetch(ids=content_ids[:2])
        assert len(results) == 0
        results = await provider.fetch(ids=content_ids[2:])
        assert len(results) == 3
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_sync(self, provider: FaissProvider):
        """Test synchronous delete with validation."""
        provider.connect_sync()
        provider.create_collection_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        content_ids = list(provider._content_id_to_faiss_id.keys())
        provider.delete_sync(ids=content_ids[:2])
        results = provider.fetch_sync(ids=content_ids[:2])
        assert len(results) == 0
        results = provider.fetch_sync(ids=content_ids[2:])
        assert len(results) == 3
        provider.disconnect_sync()
    
    @pytest.mark.asyncio
    async def test_dense_search(self, provider: FaissProvider):
        """Test dense search with detailed result validation."""
        await provider.connect()
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
        scores = [r.score for r in results]
        assert scores == sorted(scores, reverse=True)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_dense_search_sync(self, provider: FaissProvider):
        """Test synchronous dense search with content validation."""
        provider.connect_sync()
        provider.create_collection_sync()
        provider.upsert_sync(
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
        provider.disconnect_sync()
    
    @pytest.mark.asyncio
    async def test_full_text_search(self, provider: FaissProvider):
        """Test full-text search raises NotImplementedError."""
        await provider.connect()
        await provider.create_collection()
        with pytest.raises(NotImplementedError):
            await provider.full_text_search(
                query_text="physics",
                top_k=3,
                similarity_threshold=0.0
            )
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_hybrid_search(self, provider: FaissProvider):
        """Test hybrid search falls back to dense search."""
        await provider.connect()
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        # Hybrid search should fall back to dense search
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
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_search_with_filter(self, provider: FaissProvider):
        """Test search with metadata filter."""
        await provider.connect()
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
        results = await provider.dense_search(
            query_vector=QUERY_VECTOR,
            top_k=5,
            filter={"metadata.category": "science"}
        )
        assert len(results) > 0
        for result in results:
            assert result.payload.get("metadata", {}).get("category") == "science"
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_get_count(self, provider: FaissProvider):
        """Test get_count."""
        await provider.connect()
        await provider.create_collection()
        initial_count = len(provider._content_id_to_faiss_id)
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        # FAISS doesn't have a get_count method, so we check internal state
        assert len(provider._content_id_to_faiss_id) == initial_count + 5
        content_ids = list(provider._content_id_to_faiss_id.keys())
        await provider.delete(ids=content_ids[:2])
        assert len(provider._content_id_to_faiss_id) == initial_count + 3
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_update_metadata(self, provider: FaissProvider):
        """Test update_metadata with validation."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "faiss_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        updated = await provider.async_update_metadata("faiss_content_1", {"new_field": "new_value", "updated": True})
        assert updated is True
        results = await provider.fetch(ids=["faiss_content_1"])
        assert len(results) == 1
        assert results[0].payload.get("metadata", {}).get("new_field") == "new_value"
        assert results[0].payload.get("metadata", {}).get("updated") is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_by_filter(self, provider: FaissProvider):
        """Test delete_by_metadata."""
        await provider.connect()
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
        # Use metadata.category in the filter since that's where it's stored
        deleted = await provider.async_delete_by_metadata({"metadata.category": "science"})
        assert deleted is True
        content_ids = list(provider._content_id_to_faiss_id.keys())
        results = await provider.fetch(ids=content_ids)
        assert len(results) == 3
        for result in results:
            assert result.payload.get("metadata", {}).get("category") != "science"
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_by_document_name(self, provider: FaissProvider):
        """Test delete_by_document_name with validation."""
        await provider.connect()
        await provider.create_collection()
        initial_count = len(provider._content_id_to_faiss_id)
        payloads_with_doc_name = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["document_name"] = "faiss_doc"
            payloads_with_doc_name.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_doc_name,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_document_name("faiss_doc")
        assert deleted is True
        count = len(provider._content_id_to_faiss_id)
        assert count == initial_count
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_delete_by_document_name(self, provider: FaissProvider):
        """Test async_delete_by_document_name."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_doc_name = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["document_name"] = "faiss_doc"
            payloads_with_doc_name.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_doc_name,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_document_name("faiss_doc")
        assert deleted is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_by_document_id(self, provider: FaissProvider):
        """Test delete_by_document_id with validation."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_doc_id = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["document_id"] = "faiss_doc_id_1"
            payloads_with_doc_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_doc_id,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_document_id("faiss_doc_id_1")
        assert deleted is True
        content_ids = list(provider._content_id_to_faiss_id.keys())
        results = await provider.fetch(ids=content_ids)
        assert len(results) == 0
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_delete_by_document_id(self, provider: FaissProvider):
        """Test async_delete_by_document_id."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_doc_id = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["document_id"] = "faiss_doc_id_1"
            payloads_with_doc_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_doc_id,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_document_id("faiss_doc_id_1")
        assert deleted is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_delete_by_content_id(self, provider: FaissProvider):
        """Test delete_by_content_id with validation."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "faiss_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_content_id("faiss_content_1")
        assert deleted is True
        content_ids = list(provider._content_id_to_faiss_id.keys())
        results = await provider.fetch(ids=content_ids)
        assert len(results) == 0
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_delete_by_content_id(self, provider: FaissProvider):
        """Test async_delete_by_content_id."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:2]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "faiss_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        deleted = await provider.async_delete_by_content_id("faiss_content_1")
        assert deleted is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_delete_by_metadata(self, provider: FaissProvider):
        """Test async_delete_by_metadata."""
        await provider.connect()
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
        # Use metadata.category in the filter since that's where it's stored
        deleted = await provider.async_delete_by_metadata({"metadata.category": "science"})
        assert deleted is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_content_id_exists(self, provider: FaissProvider):
        """Test content_id_exists."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "faiss_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert provider.content_id_exists("faiss_content_1")
        assert not provider.content_id_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_content_id_exists(self, provider: FaissProvider):
        """Test async_content_id_exists."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "faiss_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.async_content_id_exists("faiss_content_1")
        assert not await provider.async_content_id_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_document_name_exists(self, provider: FaissProvider):
        """Test document_name_exists."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_doc_name = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["document_name"] = "faiss_doc"
            payloads_with_doc_name.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_doc_name,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert provider.document_name_exists("faiss_doc")
        assert not provider.document_name_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_document_name_exists(self, provider: FaissProvider):
        """Test async_document_name_exists."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_doc_name = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["document_name"] = "faiss_doc"
            payloads_with_doc_name.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_doc_name,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.async_document_name_exists("faiss_doc")
        assert not await provider.async_document_name_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_document_id_exists(self, provider: FaissProvider):
        """Test document_id_exists."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_doc_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["document_id"] = "faiss_doc_id_1"
            payloads_with_doc_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_doc_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert provider.document_id_exists("faiss_doc_id_1")
        assert not provider.document_id_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_document_id_exists(self, provider: FaissProvider):
        """Test async_document_id_exists."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_doc_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["document_id"] = "faiss_doc_id_1"
            payloads_with_doc_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_doc_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        assert await provider.async_document_id_exists("faiss_doc_id_1")
        assert not await provider.async_document_id_exists("nonexistent")
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_async_update_metadata(self, provider: FaissProvider):
        """Test async_update_metadata with validation."""
        await provider.connect()
        await provider.create_collection()
        payloads_with_content_id = []
        for payload in SAMPLE_PAYLOADS[:1]:
            payload_copy = payload.copy()
            payload_copy["content_id"] = "faiss_content_1"
            payloads_with_content_id.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:1],
            payloads=payloads_with_content_id,
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1]
        )
        updated = await provider.async_update_metadata("faiss_content_1", {"new_field": "new_value", "updated": True})
        assert updated is True
        results = await provider.fetch(ids=["faiss_content_1"])
        assert results[0].payload.get("metadata", {}).get("new_field") == "new_value"
        assert results[0].payload.get("metadata", {}).get("updated") is True
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_optimize(self, provider: FaissProvider):
        """Test optimize operation."""
        await provider.connect()
        await provider.create_collection()
        result = await provider.async_optimize()
        assert result is True
    
    @pytest.mark.asyncio
    async def test_async_optimize(self, provider: FaissProvider):
        """Test async optimize."""
        await provider.connect()
        await provider.create_collection()
        result = await provider.async_optimize()
        assert result is True
    
    @pytest.mark.asyncio
    async def test_get_supported_search_types(self, provider: FaissProvider):
        """Test get_supported_search_types."""
        supported = provider.get_supported_search_types()
        assert isinstance(supported, list)
        assert "dense" in supported
        assert "full_text" not in supported
        assert "hybrid" not in supported
    
    @pytest.mark.asyncio
    async def test_async_get_supported_search_types(self, provider: FaissProvider):
        """Test async_get_supported_search_types."""
        supported = await provider.async_get_supported_search_types()
        assert isinstance(supported, list)
        assert "dense" in supported
        assert "full_text" not in supported
        assert "hybrid" not in supported
    
    @pytest.mark.asyncio
    async def test_search_master_method(self, provider: FaissProvider):
        """Test master search method with content validation."""
        await provider.connect()
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
        assert all(r.text is not None for r in results)
        assert all(r.vector is not None for r in results)
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_search_sync(self, provider: FaissProvider):
        """Test synchronous master search with validation."""
        provider.connect_sync()
        provider.create_collection_sync()
        provider.upsert_sync(
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
        assert all(r.vector is not None for r in results)
        provider.disconnect_sync()
    
    @pytest.mark.asyncio
    async def test_recreate_if_exists(self, provider: FaissProvider):
        """Test recreate_if_exists configuration."""
        import uuid
        temp_path = tempfile.mkdtemp()
        try:
            unique_name = f"test_recreate_{uuid.uuid4().hex[:8]}"
            db_path = os.path.join(temp_path, unique_name)
            config = FaissConfig(
                vector_size=5,
                collection_name=unique_name,
                db_path=db_path,
                recreate_if_exists=True
            )
            provider2 = FaissProvider(config)
            await provider2.connect()
            await provider2.create_collection()
            await provider2.upsert(
                vectors=SAMPLE_VECTORS[:1],
                payloads=SAMPLE_PAYLOADS[:1],
                ids=SAMPLE_IDS[:1],
                chunks=SAMPLE_CHUNKS[:1]
            )
            await provider2.create_collection()
            count = len(provider2._content_id_to_faiss_id)
            assert count == 0
            await provider2.disconnect()
        finally:
            shutil.rmtree(temp_path, ignore_errors=True)
    
    @pytest.mark.asyncio
    async def test_flat_index_config(self, provider: FaissProvider):
        """Test FlatIndexConfig."""
        import uuid
        temp_path = tempfile.mkdtemp()
        try:
            unique_name = f"test_flat_{uuid.uuid4().hex[:8]}"
            db_path = os.path.join(temp_path, unique_name)
            config = FaissConfig(
                vector_size=5,
                collection_name=unique_name,
                db_path=db_path,
                index=FlatIndexConfig()
            )
            provider2 = FaissProvider(config)
            await provider2.connect()
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
        finally:
            shutil.rmtree(temp_path, ignore_errors=True)
    
    @pytest.mark.asyncio
    async def test_distance_metrics(self, provider: FaissProvider):
        """Test different distance metrics."""
        import uuid
        temp_path = tempfile.mkdtemp()
        try:
            for metric in [DistanceMetric.COSINE, DistanceMetric.EUCLIDEAN, DistanceMetric.DOT_PRODUCT]:
                unique_name = f"test_{metric.value}_{uuid.uuid4().hex[:8]}"
                db_path = os.path.join(temp_path, unique_name)
                config = FaissConfig(
                    vector_size=5,
                    collection_name=unique_name,
                    db_path=db_path,
                    distance_metric=metric,
                    normalize_vectors=(metric == DistanceMetric.COSINE)
                )
                provider2 = FaissProvider(config)
                await provider2.connect()
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
        finally:
            shutil.rmtree(temp_path, ignore_errors=True)
    
    @pytest.mark.asyncio
    async def test_persistence(self, provider: FaissProvider):
        """Test that data persists across disconnect/connect cycles."""
        await provider.connect()
        await provider.create_collection()
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=SAMPLE_PAYLOADS[:2],
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2]
        )
        content_ids = list(provider._content_id_to_faiss_id.keys())
        await provider.disconnect()
        
        # Reconnect and verify data is still there
        await provider.connect()
        # After connect, data is loaded from disk, so index exists
        await provider.create_collection()  # This should load existing data
        # Verify data persisted
        results = await provider.fetch(ids=content_ids)
        assert len(results) == 2
        for result in results:
            assert result.text in SAMPLE_CHUNKS[:2]
            assert result.vector is not None
        await provider.disconnect()
    
    @pytest.mark.asyncio
    async def test_fetch_and_search_consistency(self, provider: FaissProvider):
        """Test that fetch and search return consistent data - MOST IMPORTANT TEST."""
        await provider.connect()
        await provider.create_collection()
        
        # Upsert with explicit content_ids for easier tracking
        payloads_with_ids = []
        for i, payload in enumerate(SAMPLE_PAYLOADS):
            payload_copy = payload.copy()
            payload_copy["content_id"] = f"test_content_{i+1}"
            payloads_with_ids.append(payload_copy)
        
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=payloads_with_ids,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS
        )
        
        # Fetch all records
        fetch_results = await provider.fetch(ids=[f"test_content_{i+1}" for i in range(5)])
        assert len(fetch_results) == 5
        
        # Perform search
        search_results = await provider.dense_search(
            query_vector=QUERY_VECTOR,
            top_k=5,
            similarity_threshold=0.0
        )
        assert len(search_results) == 5
        
        # Create mapping by content_id for comparison
        fetch_by_id = {r.id: r for r in fetch_results}
        search_by_id = {r.id: r for r in search_results}
        
        # Verify all search results exist in fetch results
        for search_id, search_result in search_by_id.items():
            assert search_id in fetch_by_id, f"Search result {search_id} not found in fetch results"
            fetch_result = fetch_by_id[search_id]
            
            # Compare IDs
            assert search_result.id == fetch_result.id, f"ID mismatch: {search_result.id} != {fetch_result.id}"
            
            # Compare text content
            assert search_result.text == fetch_result.text, f"Text mismatch for {search_id}: {search_result.text} != {fetch_result.text}"
            
            # Compare payloads (metadata)
            assert search_result.payload == fetch_result.payload, f"Payload mismatch for {search_id}"
            
            # Compare vectors (accounting for normalization)
            assert search_result.vector is not None
            assert fetch_result.vector is not None
            assert len(search_result.vector) == len(fetch_result.vector)
            # Vectors should match (accounting for normalization)
            search_vec = np.array(search_result.vector)
            fetch_vec = np.array(fetch_result.vector)
            # Check if normalized vectors match
            search_norm = search_vec / np.linalg.norm(search_vec) if np.linalg.norm(search_vec) > 0 else search_vec
            fetch_norm = fetch_vec / np.linalg.norm(fetch_vec) if np.linalg.norm(fetch_vec) > 0 else fetch_vec
            assert np.allclose(search_norm, fetch_norm, atol=1e-5), \
                f"Vector mismatch for {search_id}: normalized vectors don't match"
        
        await provider.disconnect()
