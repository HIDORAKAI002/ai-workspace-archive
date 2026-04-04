"""
Comprehensive smoke tests for SuperMemory vector database provider.

Tests all methods, attributes, sync/async variants, error handling,
and configuration options against the live SuperMemory API.

Requires SUPER_MEMORY_API_KEY in the .env file.
"""

import os
import uuid
import asyncio
import pytest
from typing import List, Dict, Any, Optional

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from pydantic import SecretStr

from upsonic.vectordb.providers.supermemory import SuperMemoryProvider
from upsonic.vectordb.config import SuperMemoryConfig
from upsonic.vectordb.base import BaseVectorDBProvider
from upsonic.utils.package.exception import (
    VectorDBConnectionError,
    VectorDBError,
    SearchError,
    UpsertError,
)
from upsonic.schemas.vector_schemas import VectorSearchResult


SAMPLE_VECTORS: List[List[float]] = [
    [0.1, 0.2, 0.3, 0.4, 0.5],
    [0.6, 0.7, 0.8, 0.9, 1.0],
    [1.1, 1.2, 1.3, 1.4, 1.5],
    [1.6, 1.7, 1.8, 1.9, 2.0],
    [2.1, 2.2, 2.3, 2.4, 2.5],
]

SAMPLE_PAYLOADS: List[Dict[str, Any]] = [
    {"category": "science", "author": "Einstein", "year": 1905},
    {"category": "science", "author": "Newton", "year": 1687},
    {"category": "literature", "author": "Shakespeare", "year": 1600},
    {"category": "literature", "author": "Dickens", "year": 1850},
    {"category": "philosophy", "author": "Plato", "year": -400},
]

SAMPLE_CHUNKS: List[str] = [
    "The theory of relativity revolutionized physics and our understanding of spacetime",
    "Laws of motion and universal gravitation describe how objects move and attract",
    "To be or not to be, that is the question from Hamlet by Shakespeare",
    "It was the best of times, it was the worst of times from A Tale of Two Cities",
    "The unexamined life is not worth living according to Socratic philosophy",
]

SAMPLE_IDS: List[str] = ["sm_doc1", "sm_doc2", "sm_doc3", "sm_doc4", "sm_doc5"]

QUERY_VECTOR: List[float] = [0.15, 0.25, 0.35, 0.45, 0.55]
QUERY_TEXT: str = "physics theory relativity"


def _get_api_key() -> Optional[str]:
    return os.getenv("SUPER_MEMORY_API_KEY")


def _unique_tag() -> str:
    return f"upsonic_test_{uuid.uuid4().hex[:8]}"


# ============================================================================
# Config-only tests (no API key needed)
# ============================================================================


class TestSuperMemoryConfig:
    """Tests for SuperMemoryConfig validation and defaults."""

    def test_defaults(self) -> None:
        config = SuperMemoryConfig(collection_name="test_col")
        assert config.collection_name == "test_col"
        assert config.container_tag == "test_col"
        assert config.vector_size == 0
        assert config.dense_search_enabled is False
        assert config.full_text_search_enabled is True
        assert config.hybrid_search_enabled is True
        assert config.search_mode == "hybrid"
        assert config.threshold == 0.5
        assert config.rerank is False
        assert config.max_retries == 2
        assert config.timeout == 60.0
        assert config.batch_delay == 0.1
        assert config.batch_size == 50
        assert config.api_key is None

    def test_container_tag_defaults_to_collection_name(self) -> None:
        config = SuperMemoryConfig(collection_name="my_kb")
        assert config.container_tag == "my_kb"

    def test_explicit_container_tag(self) -> None:
        config = SuperMemoryConfig(
            collection_name="my_kb",
            container_tag="custom_tag",
        )
        assert config.container_tag == "custom_tag"

    def test_api_key_via_config(self) -> None:
        config = SuperMemoryConfig(
            collection_name="test",
            api_key=SecretStr("sm_test_key_123"),
        )
        assert config.api_key is not None
        assert config.api_key.get_secret_value() == "sm_test_key_123"

    def test_threshold_validation(self) -> None:
        with pytest.raises(ValueError):
            SuperMemoryConfig(collection_name="t", threshold=1.5)
        with pytest.raises(ValueError):
            SuperMemoryConfig(collection_name="t", threshold=-0.1)

    def test_search_mode_literal(self) -> None:
        config_h = SuperMemoryConfig(collection_name="t", search_mode="hybrid")
        assert config_h.search_mode == "hybrid"
        config_m = SuperMemoryConfig(collection_name="t", search_mode="memories")
        assert config_m.search_mode == "memories"
        config_d = SuperMemoryConfig(collection_name="t", search_mode="documents")
        assert config_d.search_mode == "documents"

    def test_batch_size_config(self) -> None:
        config_default = SuperMemoryConfig(collection_name="t")
        assert config_default.batch_size == 50
        config_custom = SuperMemoryConfig(collection_name="t", batch_size=10)
        assert config_custom.batch_size == 10

    def test_from_dict(self) -> None:
        config = SuperMemoryConfig.from_dict({
            "collection_name": "dict_test",
            "container_tag": "dict_tag",
            "threshold": 0.7,
        })
        assert config.collection_name == "dict_test"
        assert config.container_tag == "dict_tag"
        assert config.threshold == 0.7

    def test_frozen_immutability(self) -> None:
        config = SuperMemoryConfig(collection_name="frozen")
        with pytest.raises(Exception):
            config.collection_name = "changed"  # type: ignore[misc]

    def test_factory_create_config(self) -> None:
        from upsonic.vectordb.config import create_config
        config = create_config("supermemory", collection_name="factory")
        assert isinstance(config, SuperMemoryConfig)
        assert config.collection_name == "factory"


# ============================================================================
# Provider instantiation tests (no API call needed)
# ============================================================================


class TestSuperMemoryProviderInit:
    """Tests for provider initialization without making API calls."""

    def test_isinstance_base(self) -> None:
        config = SuperMemoryConfig(collection_name="test")
        provider = SuperMemoryProvider(config)
        assert isinstance(provider, BaseVectorDBProvider)

    def test_provider_attributes(self) -> None:
        config = SuperMemoryConfig(
            collection_name="attr_test",
            container_tag="attr_tag",
            provider_name="MyProvider",
            provider_description="Test provider",
        )
        provider = SuperMemoryProvider(config)
        assert provider.provider_name == "MyProvider"
        assert provider.provider_description == "Test provider"
        assert provider._config is config
        assert provider._container_tag == "attr_tag"
        assert provider._is_connected is False
        assert provider._async_client_instance is None

    def test_default_provider_name(self) -> None:
        config = SuperMemoryConfig(collection_name="my_coll")
        provider = SuperMemoryProvider(config)
        assert provider.provider_name == "SuperMemoryProvider_my_coll"

    def test_provider_id_generation(self) -> None:
        config = SuperMemoryConfig(collection_name="id_test", container_tag="id_tag")
        provider = SuperMemoryProvider(config)
        assert len(provider.provider_id) == 16
        provider2 = SuperMemoryProvider(config)
        assert provider.provider_id == provider2.provider_id

    def test_custom_provider_id(self) -> None:
        config = SuperMemoryConfig(collection_name="t", provider_id="custom_id_123")
        provider = SuperMemoryProvider(config)
        assert provider.provider_id == "custom_id_123"

    def test_init_from_dict(self) -> None:
        provider = SuperMemoryProvider({
            "collection_name": "dict_init",
            "container_tag": "dict_tag",
        })
        assert provider._config.collection_name == "dict_init"
        assert provider._container_tag == "dict_tag"

    def test_supported_search_types(self) -> None:
        config = SuperMemoryConfig(collection_name="t")
        provider = SuperMemoryProvider(config)
        types = provider.get_supported_search_types()
        assert "full_text" in types
        assert "hybrid" in types
        assert "dense" not in types

    def test_optimize_noop(self) -> None:
        config = SuperMemoryConfig(collection_name="t")
        provider = SuperMemoryProvider(config)
        assert provider.optimize() is True

    def test_ingested_ids_empty_initially(self) -> None:
        config = SuperMemoryConfig(collection_name="t")
        provider = SuperMemoryProvider(config)
        assert len(provider._ingested_ids) == 0


# ============================================================================
# Live API tests (require SUPER_MEMORY_API_KEY)
# ============================================================================


class TestSuperMemoryProviderCloud:
    """Comprehensive tests against the live SuperMemory API."""

    @pytest.fixture
    def config(self) -> Optional[SuperMemoryConfig]:
        api_key = _get_api_key()
        if not api_key:
            return None
        tag = _unique_tag()
        return SuperMemoryConfig(
            collection_name=tag,
            container_tag=tag,
            api_key=SecretStr(api_key),
            batch_delay=0.1,
            threshold=0.1,
        )

    @pytest.fixture
    def provider(self, config: Optional[SuperMemoryConfig]) -> Optional[SuperMemoryProvider]:
        if config is None:
            return None
        return SuperMemoryProvider(config)

    def _skip_if_unavailable(self, provider: Optional[SuperMemoryProvider]) -> None:
        if provider is None:
            pytest.skip("SUPER_MEMORY_API_KEY not available")

    async def _ensure_connected(self, provider: SuperMemoryProvider) -> None:
        try:
            await provider.connect()
        except VectorDBConnectionError:
            pytest.skip("SuperMemory connection failed")

    async def _upsert_sample_data(
        self,
        provider: SuperMemoryProvider,
        count: int = 5,
    ) -> None:
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:count],
            payloads=SAMPLE_PAYLOADS[:count],
            ids=SAMPLE_IDS[:count],
            chunks=SAMPLE_CHUNKS[:count],
        )
        await asyncio.sleep(10)

    async def _search_with_retry(
        self,
        provider: SuperMemoryProvider,
        query_text: str,
        top_k: int = 3,
        max_attempts: int = 5,
        delay: float = 5.0,
        **kwargs: Any,
    ) -> List[VectorSearchResult]:
        for attempt in range(max_attempts):
            results = await provider.search(query_text=query_text, top_k=top_k, **kwargs)
            if len(results) > 0:
                return results
            if attempt < max_attempts - 1:
                await asyncio.sleep(delay)
        return results

    # ------------------------------------------------------------------
    # Connection Management
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_connect(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        assert provider._is_connected is False
        await provider.connect()
        assert provider._is_connected is True
        assert provider._async_client_instance is not None
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_connect_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        assert provider._is_connected is True
        assert provider._async_client_instance is not None
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_connect_idempotent(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await provider.connect()
        client_ref = provider._async_client_instance
        await provider.connect()
        assert provider._async_client_instance is client_ref
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_disconnect(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await provider.connect()
        assert provider._is_connected is True
        await provider.disconnect()
        assert provider._is_connected is False
        assert provider._async_client_instance is None

    @pytest.mark.asyncio
    async def test_disconnect_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        assert provider._is_connected is True
        provider.disconnect_sync()
        assert provider._is_connected is False

    @pytest.mark.asyncio
    async def test_disconnect_when_not_connected(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await provider.disconnect()
        assert provider._is_connected is False

    # ------------------------------------------------------------------
    # is_ready
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_is_ready_false_when_disconnected(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        assert await provider.is_ready() is False

    @pytest.mark.asyncio
    async def test_is_ready_true_when_connected(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        assert await provider.is_ready() is True
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_is_ready_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        assert provider.is_ready_sync() is False
        provider.connect_sync()
        assert provider.is_ready_sync() is True
        provider.disconnect_sync()
        assert provider.is_ready_sync() is False

    # ------------------------------------------------------------------
    # Collection Management (no-op create, container-tag based delete)
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_create_collection(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await provider.create_collection()
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_create_collection_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.create_collection_sync()

    @pytest.mark.asyncio
    async def test_collection_exists_empty(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        exists = await provider.collection_exists()
        assert isinstance(exists, bool)
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_collection_exists_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        exists = provider.collection_exists_sync()
        assert isinstance(exists, bool)
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_collection_exists_after_upsert(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider, count=1)
        assert await provider.collection_exists() is True
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_delete_collection(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider, count=1)
        await provider.delete_collection()
        assert len(provider._ingested_ids) == 0
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_delete_collection_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        provider.delete_collection_sync()
        assert len(provider._ingested_ids) == 0
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_delete_collection_not_connected_raises(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        with pytest.raises(VectorDBConnectionError):
            await provider.delete_collection()

    # ------------------------------------------------------------------
    # Upsert
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_upsert(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=SAMPLE_PAYLOADS[:2],
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2],
        )
        assert SAMPLE_IDS[0] in provider._ingested_ids
        assert SAMPLE_IDS[1] in provider._ingested_ids
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_upsert_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS[:1],
            payloads=SAMPLE_PAYLOADS[:1],
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1],
        )
        assert SAMPLE_IDS[0] in provider._ingested_ids
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_upsert_no_chunks_raises(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        with pytest.raises(UpsertError):
            await provider.upsert(
                vectors=SAMPLE_VECTORS[:1],
                payloads=SAMPLE_PAYLOADS[:1],
                ids=SAMPLE_IDS[:1],
                chunks=None,
            )
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_upsert_length_mismatch_raises(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        with pytest.raises(UpsertError):
            await provider.upsert(
                vectors=SAMPLE_VECTORS[:2],
                payloads=SAMPLE_PAYLOADS[:2],
                ids=SAMPLE_IDS[:2],
                chunks=SAMPLE_CHUNKS[:3],
            )
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_upsert_not_connected_raises(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        with pytest.raises(VectorDBConnectionError):
            await provider.upsert(
                vectors=SAMPLE_VECTORS[:1],
                payloads=SAMPLE_PAYLOADS[:1],
                ids=SAMPLE_IDS[:1],
                chunks=SAMPLE_CHUNKS[:1],
            )

    @pytest.mark.asyncio
    async def test_upsert_skips_empty_chunks(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=SAMPLE_PAYLOADS[:2],
            ids=["empty_1", "empty_2"],
            chunks=["", "   "],
        )
        assert "empty_1" not in provider._ingested_ids
        assert "empty_2" not in provider._ingested_ids
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_upsert_with_document_tracking(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        payloads_with_tracking: List[Dict[str, Any]] = []
        for i, payload in enumerate(SAMPLE_PAYLOADS[:2]):
            p = payload.copy()
            p["document_name"] = f"tracked_doc_{i}"
            p["document_id"] = f"tracked_doc_id_{i}"
            p["content_id"] = f"tracked_content_{i}"
            payloads_with_tracking.append(p)

        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=payloads_with_tracking,
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2],
        )
        assert SAMPLE_IDS[0] in provider._ingested_ids
        assert SAMPLE_IDS[1] in provider._ingested_ids
        await provider.disconnect()

    # ------------------------------------------------------------------
    # Search — hybrid (primary path for SuperMemory)
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_hybrid_search(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider)
        results: List[VectorSearchResult] = []
        for attempt in range(5):
            results = await provider.hybrid_search(
                query_vector=QUERY_VECTOR,
                query_text=QUERY_TEXT,
                top_k=3,
                similarity_threshold=0.0,
            )
            if len(results) > 0:
                break
            await asyncio.sleep(5)
        assert len(results) > 0, "Expected results after retries (eventual consistency)"
        assert len(results) <= 3
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert isinstance(result.score, float)
            assert result.score >= 0.0
            assert result.text is not None
            assert result.vector is None
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_hybrid_search_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS,
        )
        results: List[VectorSearchResult] = []
        for attempt in range(5):
            await asyncio.sleep(5)
            results = provider.hybrid_search_sync(
                query_vector=QUERY_VECTOR,
                query_text=QUERY_TEXT,
                top_k=3,
                similarity_threshold=0.0,
            )
            if len(results) > 0:
                break
        assert len(results) > 0, "Expected results after retries (eventual consistency)"
        for result in results:
            assert isinstance(result, VectorSearchResult)
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_hybrid_search_scores_sorted(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider)
        results = await provider.hybrid_search(
            query_vector=QUERY_VECTOR,
            query_text=QUERY_TEXT,
            top_k=5,
            similarity_threshold=0.0,
        )
        if len(results) > 1:
            scores = [r.score for r in results]
            assert scores == sorted(scores, reverse=True)
        await provider.disconnect()

    # ------------------------------------------------------------------
    # Search — full-text (memories-only mode)
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_full_text_search(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider)
        results = await provider.full_text_search(
            query_text="relativity physics spacetime",
            top_k=3,
            similarity_threshold=0.0,
        )
        assert len(results) >= 0
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert isinstance(result.score, float)
            assert result.text is not None
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_full_text_search_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS,
        )
        await asyncio.sleep(3)
        results = provider.full_text_search_sync(
            query_text="Shakespeare Hamlet",
            top_k=3,
            similarity_threshold=0.0,
        )
        assert isinstance(results, list)
        provider.disconnect_sync()

    # ------------------------------------------------------------------
    # Search — dense (returns empty, SuperMemory limitation)
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_dense_search_returns_empty(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        results = await provider.dense_search(
            query_vector=QUERY_VECTOR,
            top_k=3,
        )
        assert results == []
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_dense_search_sync_returns_empty(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        results = provider.dense_search_sync(
            query_vector=QUERY_VECTOR,
            top_k=3,
        )
        assert results == []
        provider.disconnect_sync()

    # ------------------------------------------------------------------
    # Search — master dispatch method
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_search_with_query_text(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider)
        results = await self._search_with_retry(provider, query_text=QUERY_TEXT, top_k=3)
        assert len(results) > 0, "Expected results after retries (eventual consistency)"
        assert all(isinstance(r, VectorSearchResult) for r in results)
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_search_with_query_vector_only(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        results = await provider.search(
            query_vector=QUERY_VECTOR,
            top_k=3,
        )
        assert results == []
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_search_no_args_raises(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        with pytest.raises(SearchError):
            await provider.search(top_k=3)
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_search_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS,
        )
        results: List[VectorSearchResult] = []
        for attempt in range(5):
            await asyncio.sleep(5)
            results = provider.search_sync(
                query_text=QUERY_TEXT,
                top_k=3,
            )
            if len(results) > 0:
                break
        assert len(results) > 0, "Expected results after retries (eventual consistency)"
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_search_not_connected_raises(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        with pytest.raises((VectorDBConnectionError, SearchError)):
            await provider.search(query_text="test", top_k=1)

    # ------------------------------------------------------------------
    # Delete
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_delete(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider, count=2)
        assert SAMPLE_IDS[0] in provider._ingested_ids
        await provider.delete(ids=[SAMPLE_IDS[0]])
        assert SAMPLE_IDS[0] not in provider._ingested_ids
        assert SAMPLE_IDS[1] in provider._ingested_ids
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_delete_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS[:1],
            payloads=SAMPLE_PAYLOADS[:1],
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1],
        )
        provider.delete_sync(ids=[SAMPLE_IDS[0]])
        assert SAMPLE_IDS[0] not in provider._ingested_ids
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_delete_not_connected_raises(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        with pytest.raises(VectorDBConnectionError):
            await provider.delete(ids=["nonexistent"])

    # ------------------------------------------------------------------
    # Fetch
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_fetch(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider, count=2)
        results = await provider.fetch(ids=SAMPLE_IDS[:2])
        for result in results:
            assert isinstance(result, VectorSearchResult)
            assert result.id is not None
            assert result.score == 1.0
            assert result.vector is None
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_fetch_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS[:1],
            payloads=SAMPLE_PAYLOADS[:1],
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1],
        )
        await asyncio.sleep(2)
        results = provider.fetch_sync(ids=SAMPLE_IDS[:1])
        assert isinstance(results, list)
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_fetch_not_connected_raises(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        with pytest.raises(VectorDBConnectionError):
            await provider.fetch(ids=["nonexistent"])

    @pytest.mark.asyncio
    async def test_fetch_nonexistent_returns_empty(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        results = await provider.fetch(ids=["totally_nonexistent_id_xyz"])
        assert results == []
        await provider.disconnect()

    # ------------------------------------------------------------------
    # Existence Checks
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_content_id_exists(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider, count=1)
        assert await provider.async_content_id_exists(SAMPLE_IDS[0]) is True
        assert await provider.async_content_id_exists("nonexistent") is False
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_content_id_exists_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        provider.upsert_sync(
            vectors=SAMPLE_VECTORS[:1],
            payloads=SAMPLE_PAYLOADS[:1],
            ids=SAMPLE_IDS[:1],
            chunks=SAMPLE_CHUNKS[:1],
        )
        assert provider.content_id_exists(SAMPLE_IDS[0]) is True
        assert provider.content_id_exists("nonexistent") is False
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_document_id_exists(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        exists = await provider.async_document_id_exists("nonexistent_doc_id_xyz")
        assert exists is False
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_document_name_exists(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        exists = await provider.async_document_name_exists("nonexistent_doc_name_xyz")
        assert exists is False
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_document_name_exists_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        exists = provider.document_name_exists("nonexistent_doc_name_xyz")
        assert exists is False
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_document_id_exists_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        exists = provider.document_id_exists("nonexistent_doc_id_xyz")
        assert exists is False
        provider.disconnect_sync()

    # ------------------------------------------------------------------
    # Delete by metadata variants
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_delete_by_document_id(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        result = await provider.async_delete_by_document_id("nonexistent_id")
        assert isinstance(result, bool)
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_delete_by_document_id_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        result = provider.delete_by_document_id("nonexistent_id")
        assert isinstance(result, bool)
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_delete_by_document_name(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        result = await provider.async_delete_by_document_name("nonexistent_name")
        assert result is True
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_delete_by_document_name_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        result = provider.delete_by_document_name("nonexistent_name")
        assert result is True
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_delete_by_content_id(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        result = await provider.async_delete_by_content_id("nonexistent_content")
        assert isinstance(result, bool)
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_delete_by_content_id_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        result = provider.delete_by_content_id("nonexistent_content")
        assert isinstance(result, bool)
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_delete_by_metadata(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        result = await provider.async_delete_by_metadata({"category": "nonexistent"})
        assert result is True
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_delete_by_metadata_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        result = provider.delete_by_metadata({"category": "nonexistent"})
        assert result is True
        provider.disconnect_sync()

    # ------------------------------------------------------------------
    # Metadata Updates
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_update_metadata(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        result = await provider.async_update_metadata(
            "nonexistent_content_id",
            {"new_field": "new_value"},
        )
        assert isinstance(result, bool)
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_update_metadata_sync(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        provider.connect_sync()
        result = provider.update_metadata(
            "nonexistent_content_id",
            {"new_field": "new_value"},
        )
        assert isinstance(result, bool)
        provider.disconnect_sync()

    @pytest.mark.asyncio
    async def test_update_metadata_not_connected(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        result = await provider.async_update_metadata("x", {"k": "v"})
        assert result is False

    # ------------------------------------------------------------------
    # Optimize (no-op)
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_optimize(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        assert provider.optimize() is True

    @pytest.mark.asyncio
    async def test_async_optimize(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        assert await provider.async_optimize() is True

    # ------------------------------------------------------------------
    # Supported Search Types
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_get_supported_search_types(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        supported = provider.get_supported_search_types()
        assert isinstance(supported, list)
        assert "full_text" in supported
        assert "hybrid" in supported
        assert "dense" not in supported

    @pytest.mark.asyncio
    async def test_async_get_supported_search_types(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        supported = await provider.async_get_supported_search_types()
        assert isinstance(supported, list)
        assert "full_text" in supported
        assert "hybrid" in supported

    # ------------------------------------------------------------------
    # Helper methods
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_prepare_metadata(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        payload: Dict[str, Any] = {
            "category": "science",
            "year": 1905,
            "score": 0.95,
            "active": True,
            "nested": {"key": "value"},
            "empty": None,
        }
        metadata = provider._prepare_metadata(payload)
        assert metadata["category"] == "science"
        assert metadata["year"] == 1905
        assert metadata["score"] == 0.95
        assert metadata["active"] is True
        assert metadata["nested"] == "{'key': 'value'}"
        assert "empty" not in metadata

    @pytest.mark.asyncio
    async def test_convert_filters_simple(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        result = SuperMemoryProvider._convert_filters({"category": "science"})
        assert "AND" in result
        assert len(result["AND"]) == 1
        assert result["AND"][0]["key"] == "category"
        assert result["AND"][0]["value"] == "science"

    @pytest.mark.asyncio
    async def test_convert_filters_multiple(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        result = SuperMemoryProvider._convert_filters({"cat": "sci", "year": "1905"})
        assert "AND" in result
        assert len(result["AND"]) == 2

    @pytest.mark.asyncio
    async def test_convert_filters_passthrough(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        original: Dict[str, Any] = {"AND": [{"key": "x", "value": "y"}]}
        result = SuperMemoryProvider._convert_filters(original)
        assert result is original

    # ------------------------------------------------------------------
    # End-to-end: upsert + search + validate content
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_e2e_upsert_and_search(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider, count=5)

        results = await self._search_with_retry(
            provider, query_text="theory of relativity physics", top_k=3,
        )
        assert len(results) > 0, "Expected results after retries (eventual consistency)"
        top_result = results[0]
        assert isinstance(top_result, VectorSearchResult)
        assert top_result.text is not None
        assert top_result.score > 0.0
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_e2e_upsert_search_delete(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider, count=5)

        found = False
        for attempt in range(5):
            results = await provider.search(query_text=QUERY_TEXT, top_k=5)
            if len(results) > 0:
                found = True
                break
            await asyncio.sleep(3)
        assert found, "Expected search results after upsert (eventual consistency)"

        await provider.delete_collection()
        assert len(provider._ingested_ids) == 0
        await provider.disconnect()

    # ------------------------------------------------------------------
    # Config-based search mode
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_memories_search_mode(self) -> None:
        api_key = _get_api_key()
        if not api_key:
            pytest.skip("SUPER_MEMORY_API_KEY not available")
        tag = _unique_tag()
        config = SuperMemoryConfig(
            collection_name=tag,
            container_tag=tag,
            api_key=SecretStr(api_key),
            search_mode="memories",
            batch_delay=0.1,
            threshold=0.1,
        )
        provider = SuperMemoryProvider(config)
        await provider.connect()
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=SAMPLE_PAYLOADS[:2],
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2],
        )
        await asyncio.sleep(3)
        results = await provider.hybrid_search(
            query_vector=QUERY_VECTOR,
            query_text=QUERY_TEXT,
            top_k=3,
            similarity_threshold=0.0,
        )
        assert isinstance(results, list)
        await provider.disconnect()

    # ------------------------------------------------------------------
    # Rerank option
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_rerank_config(self) -> None:
        api_key = _get_api_key()
        if not api_key:
            pytest.skip("SUPER_MEMORY_API_KEY not available")
        tag = _unique_tag()
        config = SuperMemoryConfig(
            collection_name=tag,
            container_tag=tag,
            api_key=SecretStr(api_key),
            rerank=True,
            batch_delay=0.1,
            threshold=0.1,
        )
        provider = SuperMemoryProvider(config)
        await provider.connect()
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=SAMPLE_PAYLOADS[:2],
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2],
        )
        await asyncio.sleep(3)
        results = await provider.search(query_text=QUERY_TEXT, top_k=3)
        assert isinstance(results, list)
        await provider.disconnect()

    # ------------------------------------------------------------------
    # Batch upsert (documents.batch_add)
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_upsert_batch_add(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS,
        )
        for sid in SAMPLE_IDS:
            assert sid in provider._ingested_ids
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_upsert_with_small_batch_size(self) -> None:
        api_key = _get_api_key()
        if not api_key:
            pytest.skip("SUPER_MEMORY_API_KEY not available")
        tag = _unique_tag()
        config = SuperMemoryConfig(
            collection_name=tag,
            container_tag=tag,
            api_key=SecretStr(api_key),
            batch_size=2,
            batch_delay=0.1,
            threshold=0.1,
        )
        provider = SuperMemoryProvider(config)
        await provider.connect()
        await provider.upsert(
            vectors=SAMPLE_VECTORS,
            payloads=SAMPLE_PAYLOADS,
            ids=SAMPLE_IDS,
            chunks=SAMPLE_CHUNKS,
        )
        for sid in SAMPLE_IDS:
            assert sid in provider._ingested_ids
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_upsert_all_empty_chunks_skipped(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:3],
            payloads=SAMPLE_PAYLOADS[:3],
            ids=["e1", "e2", "e3"],
            chunks=["", "   ", "\n"],
        )
        assert "e1" not in provider._ingested_ids
        assert "e2" not in provider._ingested_ids
        assert "e3" not in provider._ingested_ids
        await provider.disconnect()

    # ------------------------------------------------------------------
    # Search — documents mode (pure chunk search)
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_documents_search_mode(self) -> None:
        api_key = _get_api_key()
        if not api_key:
            pytest.skip("SUPER_MEMORY_API_KEY not available")
        tag = _unique_tag()
        config = SuperMemoryConfig(
            collection_name=tag,
            container_tag=tag,
            api_key=SecretStr(api_key),
            search_mode="documents",
            batch_delay=0.1,
            threshold=0.1,
        )
        provider = SuperMemoryProvider(config)
        await provider.connect()
        await provider.upsert(
            vectors=SAMPLE_VECTORS[:2],
            payloads=SAMPLE_PAYLOADS[:2],
            ids=SAMPLE_IDS[:2],
            chunks=SAMPLE_CHUNKS[:2],
        )
        await asyncio.sleep(5)
        results = await provider.hybrid_search(
            query_vector=QUERY_VECTOR,
            query_text=QUERY_TEXT,
            top_k=3,
            similarity_threshold=0.0,
        )
        assert isinstance(results, list)
        for result in results:
            assert isinstance(result, VectorSearchResult)
        await provider.disconnect()

    # ------------------------------------------------------------------
    # Fetch — payload is always dict
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_fetch_payload_is_always_dict(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider, count=1)
        results = await provider.fetch(ids=SAMPLE_IDS[:1])
        for result in results:
            assert isinstance(result.payload, dict), (
                f"Expected dict payload, got {type(result.payload)}"
            )
        await provider.disconnect()

    @pytest.mark.asyncio
    async def test_fetch_nonexistent_gives_empty_dict_payload(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        results = await provider.fetch(ids=["does_not_exist_xyz"])
        assert results == []
        await provider.disconnect()

    # ------------------------------------------------------------------
    # Disconnect clears ingested IDs
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_disconnect_clears_state(self, provider: Optional[SuperMemoryProvider]) -> None:
        self._skip_if_unavailable(provider)
        assert provider is not None
        await self._ensure_connected(provider)
        await self._upsert_sample_data(provider, count=2)
        assert len(provider._ingested_ids) == 2
        await provider.disconnect()
        assert len(provider._ingested_ids) == 0
        assert provider._async_client_instance is None
        assert provider._is_connected is False

    # ------------------------------------------------------------------
    # Imports via __init__.py
    # ------------------------------------------------------------------

    @pytest.mark.asyncio
    async def test_import_from_vectordb_module(self) -> None:
        from upsonic.vectordb import SuperMemoryProvider as SP
        from upsonic.vectordb import SuperMemoryConfig as SC
        assert SP is SuperMemoryProvider
        assert SC is SuperMemoryConfig

    @pytest.mark.asyncio
    async def test_import_in_all(self) -> None:
        from upsonic.vectordb import __all__ as exports
        assert "SuperMemoryProvider" in exports
        assert "SuperMemoryConfig" in exports


# ============================================================================
# Final cleanup — runs last to wipe all test data from SuperMemory
# ============================================================================


class TestSuperMemoryFinalCleanup:
    """
    Runs after all other tests to delete every document created during the
    test session.  SuperMemory's search index has eventual consistency, so we
    loop: search → collect container_tags + internal IDs → delete_bulk/delete,
    until the search returns zero results.
    """

    @pytest.mark.asyncio
    async def test_zz_final_cleanup_and_verify(self) -> None:
        api_key = _get_api_key()
        if not api_key:
            pytest.skip("SUPER_MEMORY_API_KEY not available")

        from supermemory import AsyncSupermemory

        client = AsyncSupermemory(
            api_key=api_key,
            max_retries=5,
            timeout=120.0,
        )
        all_tags_deleted: set[str] = set()
        max_attempts: int = 40

        try:
            for attempt in range(max_attempts):
                await asyncio.sleep(2)

                try:
                    search_results = await client.search.execute(q="*", limit=100)
                except Exception:
                    await asyncio.sleep(5)
                    continue

                if not search_results.results:
                    break

                container_tags: set[str] = set()
                internal_ids: set[str] = set()

                for doc in search_results.results:
                    custom_id: Optional[str] = getattr(doc, "document_id", None)
                    if not custom_id:
                        continue
                    try:
                        got = await client.documents.get(str(custom_id))
                        iid: Optional[str] = getattr(got, "id", None)
                        ctags: List[str] = getattr(got, "container_tags", [])
                        if iid:
                            internal_ids.add(str(iid))
                        for tag in ctags:
                            container_tags.add(tag)
                    except Exception:
                        pass
                    await asyncio.sleep(0.3)

                for tag in container_tags:
                    if tag not in all_tags_deleted:
                        try:
                            await client.documents.delete_bulk(container_tags=[tag])
                            all_tags_deleted.add(tag)
                        except Exception:
                            pass
                        await asyncio.sleep(0.5)

                for iid in internal_ids:
                    try:
                        await client.documents.delete(iid)
                    except Exception:
                        pass
                    await asyncio.sleep(0.3)

            await asyncio.sleep(3)

            # ---- Verify the database is clean ----
            search_final = await client.search.execute(q="*", limit=100)
            docs_final = await client.documents.list(limit=100)
            docs_remaining: int = len(docs_final.results) if hasattr(docs_final, "results") else 0

            assert len(search_final.results) == 0, (
                f"Search still returns {len(search_final.results)} results after {max_attempts} cleanup passes"
            )
            assert docs_remaining == 0, (
                f"Document list still has {docs_remaining} entries after cleanup"
            )
        finally:
            await client.close()
