from __future__ import annotations

import asyncio
import os
from hashlib import md5
from typing import Any, Dict, List, Optional, Union, Literal, TYPE_CHECKING

if TYPE_CHECKING:
    from supermemory import AsyncSupermemory

try:
    from supermemory import AsyncSupermemory
    _SUPERMEMORY_AVAILABLE = True
except ImportError:
    AsyncSupermemory = None  # type: ignore[assignment,misc]
    _SUPERMEMORY_AVAILABLE = False


from upsonic.vectordb.base import BaseVectorDBProvider
from upsonic.utils.printing import info_log, debug_log, warning_log, error_log

from upsonic.vectordb.config import SuperMemoryConfig

from upsonic.utils.package.exception import (
    VectorDBConnectionError,
    VectorDBError,
    SearchError,
    UpsertError,
)

from upsonic.schemas.vector_schemas import VectorSearchResult


class SuperMemoryProvider(BaseVectorDBProvider):
    """
    A vector database provider that wraps the SuperMemory managed memory API.
    """

    def __init__(
        self,
        config: Union[SuperMemoryConfig, Dict[str, Any]],
    ) -> None:
        if not _SUPERMEMORY_AVAILABLE:
            from upsonic.utils.printing import import_error
            import_error(
                package_name="supermemory",
                install_command='pip install "upsonic[supermemory]"',
                feature_name="SuperMemory vector database provider",
            )

        if isinstance(config, dict):
            config = SuperMemoryConfig.from_dict(config)

        super().__init__(config)
        self._config: SuperMemoryConfig = config

        self._async_client_instance: Optional[AsyncSupermemory] = None

        self.provider_name: str = config.provider_name or f"SuperMemoryProvider_{config.collection_name}"
        self.provider_description: Optional[str] = config.provider_description
        self.provider_id: str = config.provider_id or self._generate_provider_id()

        self._ingested_ids: set[str] = set()

    def _generate_provider_id(self) -> str:
        identifier = f"supermemory#{self._config.container_tag or self._config.collection_name}"
        return md5(identifier.encode()).hexdigest()[:16]

    def _resolve_api_key(self) -> str:
        if self._config.api_key is not None:
            return self._config.api_key.get_secret_value()
        env_key: Optional[str] = os.environ.get("SUPERMEMORY_API_KEY")
        if env_key:
            return env_key
        raise VectorDBConnectionError(
            "SuperMemory API key not provided. Set it via SuperMemoryConfig.api_key "
            "or the SUPERMEMORY_API_KEY environment variable."
        )

    @property
    def _container_tag(self) -> str:
        return self._config.container_tag or self._config.collection_name


    async def connect(self) -> None:
        if self._is_connected:
            return

        debug_log("Connecting to SuperMemory API...", context="SuperMemoryVectorDB")

        try:
            api_key = self._resolve_api_key()

            self._async_client_instance = AsyncSupermemory(
                api_key=api_key,
                max_retries=self._config.max_retries,
                timeout=self._config.timeout,
            )

            self._is_connected = True
            info_log("SuperMemory connection established.", context="SuperMemoryVectorDB")

        except Exception as e:
            raise VectorDBConnectionError(f"Failed to connect to SuperMemory: {e}") from e

    def connect_sync(self) -> None:
        return self._run_async_from_sync(self.connect())

    async def disconnect(self) -> None:
        if not self._is_connected:
            return

        debug_log("Disconnecting from SuperMemory...", context="SuperMemoryVectorDB")

        try:
            if self._async_client_instance is not None:
                await self._async_client_instance.close()
        except Exception:
            pass
        finally:
            self._async_client_instance = None
            self._is_connected = False
            self._ingested_ids.clear()
            info_log("SuperMemory client session closed.", context="SuperMemoryVectorDB")

    def disconnect_sync(self) -> None:
        return self._run_async_from_sync(self.disconnect())

    async def is_ready(self) -> bool:
        if not self._is_connected or self._async_client_instance is None:
            return False
        try:
            await self._async_client_instance.search.execute(q="ping", limit=1)
            return True
        except Exception:
            return False

    def is_ready_sync(self) -> bool:
        return self._run_async_from_sync(self.is_ready())


    async def create_collection(self) -> None:
        debug_log(
            f"create_collection called (no-op for SuperMemory, container_tag='{self._container_tag}')",
            context="SuperMemoryVectorDB",
        )

    def create_collection_sync(self) -> None:
        pass

    async def delete_collection(self) -> None:
        if not self._is_connected or self._async_client_instance is None:
            raise VectorDBConnectionError("Not connected to SuperMemory.")

        debug_log(
            f"Deleting all documents for container_tag='{self._container_tag}'",
            context="SuperMemoryVectorDB",
        )

        try:
            await self._async_client_instance.documents.delete_bulk(
                container_tags=[self._container_tag],
            )
            self._ingested_ids.clear()
            info_log("SuperMemory collection deleted.", context="SuperMemoryVectorDB")
        except Exception as e:
            raise VectorDBError(f"Failed to delete SuperMemory collection: {e}") from e

    def delete_collection_sync(self) -> None:
        return self._run_async_from_sync(self.delete_collection())

    async def collection_exists(self) -> bool:
        if not self._is_connected or self._async_client_instance is None:
            return False

        if self._ingested_ids:
            return True

        try:
            results = await self._async_client_instance.search.execute(
                q="*",
                container_tags=[self._container_tag],
                limit=1,
            )
            return bool(results.results)
        except Exception:
            return False

    def collection_exists_sync(self) -> bool:
        return self._run_async_from_sync(self.collection_exists())

    async def upsert(
        self,
        vectors: List[List[float]],
        payloads: List[Dict[str, Any]],
        ids: List[Union[str, int]],
        chunks: Optional[List[str]] = None,
        sparse_vectors: Optional[List[Dict[str, Any]]] = None,
        **kwargs: Any,
    ) -> None:
        if not self._is_connected or self._async_client_instance is None:
            raise VectorDBConnectionError("Not connected to SuperMemory.")

        if chunks is None:
            raise UpsertError(
                "SuperMemoryProvider requires chunk texts for ingestion. "
                "The 'chunks' parameter must not be None."
            )

        if len(ids) != len(chunks):
            raise UpsertError(
                f"Length mismatch: {len(ids)} ids vs {len(chunks)} chunks."
            )

        debug_log(
            f"Upserting {len(chunks)} chunks to SuperMemory (container_tag='{self._container_tag}')",
            context="SuperMemoryVectorDB",
        )

        valid_docs: List[Dict[str, Any]] = []
        valid_ids: List[str] = []

        for idx, (chunk_id, chunk_text) in enumerate(zip(ids, chunks)):
            if not chunk_text or not chunk_text.strip():
                debug_log(f"Skipping empty chunk at index {idx}", context="SuperMemoryVectorDB")
                continue

            payload = payloads[idx] if idx < len(payloads) else {}
            metadata = self._prepare_metadata(payload)

            valid_docs.append({
                "content": chunk_text,
                "custom_id": str(chunk_id),
                "metadata": metadata,
            })
            valid_ids.append(str(chunk_id))

        if not valid_docs:
            info_log("No valid chunks to upsert (all empty).", context="SuperMemoryVectorDB")
            return

        batch_size: int = self._config.batch_size
        errors: List[str] = []
        total_succeeded: int = 0

        for batch_start in range(0, len(valid_docs), batch_size):
            batch_docs = valid_docs[batch_start:batch_start + batch_size]
            batch_ids = valid_ids[batch_start:batch_start + batch_size]

            try:
                await self._async_client_instance.documents.batch_add(
                    documents=batch_docs,  # type: ignore[arg-type]
                    container_tag=self._container_tag,
                )
                self._ingested_ids.update(batch_ids)
                total_succeeded += len(batch_docs)
            except Exception as e:
                error_msg = f"Batch upsert failed (items {batch_start}-{batch_start + len(batch_docs)}): {e}"
                error_log(error_msg, context="SuperMemoryVectorDB")
                errors.append(error_msg)

            if self._config.batch_delay > 0 and batch_start + batch_size < len(valid_docs):
                await asyncio.sleep(self._config.batch_delay)

        if errors and total_succeeded == 0:
            raise UpsertError(f"All batch upserts failed. First error: {errors[0]}")

        info_log(
            f"Upserted {total_succeeded}/{len(valid_docs)} chunks successfully.",
            context="SuperMemoryVectorDB",
        )

    def upsert_sync(
        self,
        vectors: List[List[float]],
        payloads: List[Dict[str, Any]],
        ids: List[Union[str, int]],
        chunks: Optional[List[str]] = None,
        sparse_vectors: Optional[List[Dict[str, Any]]] = None,
        **kwargs: Any,
    ) -> None:
        return self._run_async_from_sync(
            self.upsert(vectors, payloads, ids, chunks, sparse_vectors, **kwargs)
        )

    async def delete(self, ids: List[Union[str, int]], **kwargs: Any) -> None:
        if not self._is_connected or self._async_client_instance is None:
            raise VectorDBConnectionError("Not connected to SuperMemory.")

        debug_log(f"Deleting {len(ids)} documents from SuperMemory", context="SuperMemoryVectorDB")

        for doc_id in ids:
            try:
                await self._async_client_instance.documents.delete(str(doc_id))
                self._ingested_ids.discard(str(doc_id))
            except Exception as e:
                warning_log(f"Failed to delete document '{doc_id}': {e}", context="SuperMemoryVectorDB")

    def delete_sync(self, ids: List[Union[str, int]], **kwargs: Any) -> None:
        return self._run_async_from_sync(self.delete(ids, **kwargs))

    async def fetch(self, ids: List[Union[str, int]], **kwargs: Any) -> List[VectorSearchResult]:
        if not self._is_connected or self._async_client_instance is None:
            raise VectorDBConnectionError("Not connected to SuperMemory.")

        results: List[VectorSearchResult] = []

        for doc_id in ids:
            try:
                doc = await self._async_client_instance.documents.get(str(doc_id))
                raw_metadata = getattr(doc, "metadata", None)
                payload: Dict[str, Any] = raw_metadata if isinstance(raw_metadata, dict) else {}
                results.append(VectorSearchResult(
                    id=str(doc_id),
                    score=1.0,
                    payload=payload,
                    vector=None,
                    text=getattr(doc, "content", None),
                ))
            except Exception as e:
                warning_log(f"Failed to fetch document '{doc_id}': {e}", context="SuperMemoryVectorDB")

        return results

    def fetch_sync(self, ids: List[Union[str, int]], **kwargs: Any) -> List[VectorSearchResult]:
        return self._run_async_from_sync(self.fetch(ids, **kwargs))

    async def search(
        self,
        top_k: Optional[int] = None,
        query_vector: Optional[List[float]] = None,
        query_text: Optional[str] = None,
        filter: Optional[Dict[str, Any]] = None,
        alpha: Optional[float] = None,
        fusion_method: Optional[Literal["rrf", "weighted"]] = None,
        similarity_threshold: Optional[float] = None,
        **kwargs: Any,
    ) -> List[VectorSearchResult]:
        if query_text:
            return await self.hybrid_search(
                query_vector=query_vector or [],
                query_text=query_text,
                top_k=top_k or self._config.default_top_k,
                filter=filter,
                alpha=alpha,
                fusion_method=fusion_method,
                similarity_threshold=similarity_threshold,
                **kwargs,
            )

        if query_vector is not None:
            return await self.dense_search(
                query_vector=query_vector,
                top_k=top_k or self._config.default_top_k,
                filter=filter,
                similarity_threshold=similarity_threshold,
                **kwargs,
            )

        raise SearchError("Either query_text or query_vector must be provided for search.")

    def search_sync(
        self,
        top_k: Optional[int] = None,
        query_vector: Optional[List[float]] = None,
        query_text: Optional[str] = None,
        filter: Optional[Dict[str, Any]] = None,
        alpha: Optional[float] = None,
        fusion_method: Optional[Literal["rrf", "weighted"]] = None,
        similarity_threshold: Optional[float] = None,
        **kwargs: Any,
    ) -> List[VectorSearchResult]:
        return self._run_async_from_sync(
            self.search(top_k, query_vector, query_text, filter, alpha, fusion_method, similarity_threshold, **kwargs)
        )

    async def dense_search(
        self,
        query_vector: List[float],
        top_k: int,
        filter: Optional[Dict[str, Any]] = None,
        similarity_threshold: Optional[float] = None,
        **kwargs: Any,
    ) -> List[VectorSearchResult]:
        warning_log(
            "SuperMemory does not support raw vector search. "
            "Use hybrid or full-text search by providing query_text. "
            "Returning empty results.",
            context="SuperMemoryVectorDB",
        )
        return []

    def dense_search_sync(
        self,
        query_vector: List[float],
        top_k: int,
        filter: Optional[Dict[str, Any]] = None,
        similarity_threshold: Optional[float] = None,
        **kwargs: Any,
    ) -> List[VectorSearchResult]:
        return self._run_async_from_sync(
            self.dense_search(query_vector, top_k, filter, similarity_threshold, **kwargs)
        )

    async def full_text_search(
        self,
        query_text: str,
        top_k: int,
        filter: Optional[Dict[str, Any]] = None,
        similarity_threshold: Optional[float] = None,
        **kwargs: Any,
    ) -> List[VectorSearchResult]:
        return await self._execute_search(
            query_text=query_text,
            top_k=top_k,
            search_mode="memories",
            filter=filter,
            similarity_threshold=similarity_threshold,
        )

    def full_text_search_sync(
        self,
        query_text: str,
        top_k: int,
        filter: Optional[Dict[str, Any]] = None,
        similarity_threshold: Optional[float] = None,
        **kwargs: Any,
    ) -> List[VectorSearchResult]:
        return self._run_async_from_sync(
            self.full_text_search(query_text, top_k, filter, similarity_threshold, **kwargs)
        )

    async def hybrid_search(
        self,
        query_vector: List[float],
        query_text: str,
        top_k: int,
        filter: Optional[Dict[str, Any]] = None,
        alpha: Optional[float] = None,
        fusion_method: Optional[Literal["rrf", "weighted"]] = None,
        similarity_threshold: Optional[float] = None,
        **kwargs: Any,
    ) -> List[VectorSearchResult]:
        return await self._execute_search(
            query_text=query_text,
            top_k=top_k,
            search_mode=self._config.search_mode,
            filter=filter,
            similarity_threshold=similarity_threshold,
        )

    def hybrid_search_sync(
        self,
        query_vector: List[float],
        query_text: str,
        top_k: int,
        filter: Optional[Dict[str, Any]] = None,
        alpha: Optional[float] = None,
        fusion_method: Optional[Literal["rrf", "weighted"]] = None,
        similarity_threshold: Optional[float] = None,
        **kwargs: Any,
    ) -> List[VectorSearchResult]:
        return self._run_async_from_sync(
            self.hybrid_search(query_vector, query_text, top_k, filter, alpha, fusion_method, similarity_threshold, **kwargs)
        )

    async def _execute_search(
        self,
        query_text: str,
        top_k: int,
        search_mode: Literal["hybrid", "memories", "documents"],
        filter: Optional[Dict[str, Any]] = None,
        similarity_threshold: Optional[float] = None,
    ) -> List[VectorSearchResult]:
        if not self._is_connected or self._async_client_instance is None:
            raise VectorDBConnectionError("Not connected to SuperMemory.")

        threshold = similarity_threshold or self._config.threshold

        debug_log(
            f"SuperMemory search: q='{query_text[:80]}...', mode={search_mode}, "
            f"top_k={top_k}, threshold={threshold}",
            context="SuperMemoryVectorDB",
        )

        try:
            search_kwargs: Dict[str, Any] = {
                "q": query_text,
                "container_tag": self._container_tag,
                "search_mode": search_mode,
                "limit": top_k,
                "threshold": threshold,
                "rerank": self._config.rerank,
            }

            if filter:
                sm_filters = self._convert_filters(filter)
                if sm_filters:
                    search_kwargs["filters"] = sm_filters

            response = await self._async_client_instance.search.memories(**search_kwargs)

            results: List[VectorSearchResult] = []
            for item in response.results:
                text_content: Optional[str] = getattr(item, "memory", None) or getattr(item, "chunk", None)
                score: float = getattr(item, "similarity", 0.0)
                item_id: str = getattr(item, "id", "")
                metadata: Optional[Dict[str, Any]] = getattr(item, "metadata", None)

                results.append(VectorSearchResult(
                    id=item_id,
                    score=score,
                    payload=metadata,
                    vector=None,
                    text=text_content,
                ))

            info_log(f"SuperMemory returned {len(results)} results.", context="SuperMemoryVectorDB")
            return results

        except Exception as e:
            raise SearchError(f"SuperMemory search failed: {e}") from e


    def document_id_exists(self, document_id: str) -> bool:
        return self._run_async_from_sync(self.async_document_id_exists(document_id))

    async def async_document_id_exists(self, document_id: str) -> bool:
        if not self._is_connected or self._async_client_instance is None:
            return False
        try:
            await self._async_client_instance.documents.get(document_id)
            return True
        except Exception:
            return False

    def document_name_exists(self, document_name: str) -> bool:
        return self._run_async_from_sync(self.async_document_name_exists(document_name))

    async def async_document_name_exists(self, document_name: str) -> bool:
        if not self._is_connected or self._async_client_instance is None:
            return False
        try:
            results = await self._async_client_instance.search.execute(
                q=document_name,
                container_tags=[self._container_tag],
                limit=1,
                filters={"AND": [{"key": "document_name", "value": document_name}]},
            )
            return bool(results.results)
        except Exception:
            return False

    def content_id_exists(self, content_id: str) -> bool:
        return self._run_async_from_sync(self.async_content_id_exists(content_id))

    async def async_content_id_exists(self, content_id: str) -> bool:
        return content_id in self._ingested_ids



    def delete_by_document_name(self, document_name: str) -> bool:
        return self._run_async_from_sync(self.async_delete_by_document_name(document_name))

    async def async_delete_by_document_name(self, document_name: str) -> bool:
        if not self._is_connected or self._async_client_instance is None:
            return False
        try:
            results = await self._async_client_instance.search.execute(
                q="*",
                container_tags=[self._container_tag],
                limit=100,
                filters={"AND": [{"key": "document_name", "value": document_name}]},
            )
            if results.results:
                ids_to_delete = [r.id for r in results.results if r.id]
                if ids_to_delete:
                    await self._async_client_instance.documents.delete_bulk(ids=ids_to_delete)
                    for did in ids_to_delete:
                        self._ingested_ids.discard(str(did))
            return True
        except Exception as e:
            warning_log(f"delete_by_document_name failed: {e}", context="SuperMemoryVectorDB")
            return False

    def delete_by_document_id(self, document_id: str) -> bool:
        return self._run_async_from_sync(self.async_delete_by_document_id(document_id))

    async def async_delete_by_document_id(self, document_id: str) -> bool:
        if not self._is_connected or self._async_client_instance is None:
            return False
        try:
            await self._async_client_instance.documents.delete(document_id)
            self._ingested_ids.discard(document_id)
            return True
        except Exception as e:
            warning_log(f"delete_by_document_id failed: {e}", context="SuperMemoryVectorDB")
            return False

    def delete_by_content_id(self, content_id: str) -> bool:
        return self._run_async_from_sync(self.async_delete_by_content_id(content_id))

    async def async_delete_by_content_id(self, content_id: str) -> bool:
        return await self.async_delete_by_document_id(content_id)

    def delete_by_metadata(self, metadata: Dict[str, Any]) -> bool:
        return self._run_async_from_sync(self.async_delete_by_metadata(metadata))

    async def async_delete_by_metadata(self, metadata: Dict[str, Any]) -> bool:
        if not self._is_connected or self._async_client_instance is None:
            return False
        try:
            sm_filters = self._convert_filters(metadata)
            results = await self._async_client_instance.search.execute(
                q="*",
                container_tags=[self._container_tag],
                limit=100,
                filters=sm_filters,
            )
            if results.results:
                ids_to_delete = [r.id for r in results.results if r.id]
                if ids_to_delete:
                    await self._async_client_instance.documents.delete_bulk(ids=ids_to_delete)
                    for did in ids_to_delete:
                        self._ingested_ids.discard(str(did))
            return True
        except Exception as e:
            warning_log(f"delete_by_metadata failed: {e}", context="SuperMemoryVectorDB")
            return False

    def update_metadata(self, content_id: str, metadata: Dict[str, Any]) -> bool:
        return self._run_async_from_sync(self.async_update_metadata(content_id, metadata))

    async def async_update_metadata(self, content_id: str, metadata: Dict[str, Any]) -> bool:
        if not self._is_connected or self._async_client_instance is None:
            return False
        try:
            await self._async_client_instance.documents.update(
                content_id,
                metadata=metadata,
            )
            return True
        except Exception as e:
            warning_log(f"update_metadata failed: {e}", context="SuperMemoryVectorDB")
            return False

    def optimize(self) -> bool:
        return True

    async def async_optimize(self) -> bool:
        return True

    def get_supported_search_types(self) -> List[str]:
        types: List[str] = []
        if self._config.full_text_search_enabled:
            types.append("full_text")
        if self._config.hybrid_search_enabled:
            types.append("hybrid")
        return types

    async def async_get_supported_search_types(self) -> List[str]:
        return self.get_supported_search_types()

    def _prepare_metadata(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        metadata: Dict[str, Any] = {}

        if self._config.default_metadata:
            metadata.update(self._config.default_metadata)

        for key, value in payload.items():
            if isinstance(value, (str, int, float, bool)):
                metadata[key] = value
            elif value is None:
                continue
            else:
                metadata[key] = str(value)

        return metadata

    @staticmethod
    def _convert_filters(filters: Dict[str, Any]) -> Dict[str, Any]:
        if "AND" in filters or "OR" in filters:
            return filters

        conditions: List[Dict[str, Any]] = []
        for key, value in filters.items():
            conditions.append({"key": key, "value": str(value) if not isinstance(value, str) else value})

        if len(conditions) == 1:
            return {"AND": conditions}
        return {"AND": conditions}
