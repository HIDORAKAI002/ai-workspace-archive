"""Langfuse integration for Upsonic OpenTelemetry instrumentation.

Inherits from :class:`TracingProvider` — only overrides exporter creation
to point at the Langfuse OTLP endpoint with Basic-Auth headers.

Also provides scoring, score configs, and annotation queue management
through the Langfuse REST API.

Usage::

    from upsonic import Agent, Langfuse

    langfuse = Langfuse(public_key="pk-lf-...", secret_key="sk-lf-...")
    agent = Agent("openai/gpt-4o", instrument=langfuse)
    agent.print_do("Hello!")

    # Score a trace
    langfuse.score(
        trace_id="trace-id",
        name="quality",
        value=0.9,
        data_type="NUMERIC",
    )

    langfuse.shutdown()
"""

from __future__ import annotations

import base64
import datetime
import os
import uuid
from typing import Any, Dict, List, Literal, Optional, Union, TYPE_CHECKING

from upsonic.integrations.tracing import TracingProvider

if TYPE_CHECKING:
    from opentelemetry.sdk.trace.export import SpanExporter as _SpanExporter

_LANGFUSE_EU_HOST: str = "https://cloud.langfuse.com"
_LANGFUSE_US_HOST: str = "https://us.cloud.langfuse.com"


class Langfuse(TracingProvider):
    """Langfuse observability integration for Upsonic agents.

    Sends OpenTelemetry traces to the Langfuse ``/api/public/otel`` endpoint
    using HTTP/protobuf with Basic-Auth.

    Args:
        public_key: Langfuse public key (``pk-lf-...``).
            Falls back to ``LANGFUSE_PUBLIC_KEY`` env var.
        secret_key: Langfuse secret key (``sk-lf-...``).
            Falls back to ``LANGFUSE_SECRET_KEY`` env var.
        host: Langfuse host URL.
            Falls back to ``LANGFUSE_HOST`` env var, then defaults to EU cloud.
        region: Shortcut for host selection: ``"eu"`` or ``"us"``.
            Ignored if ``host`` is explicitly provided.
        include_content: Whether to include prompt/response content in traces.
        service_name: Service name reported in traces (default ``"upsonic"``).
        sample_rate: Fraction of traces to sample (default ``1.0``).
        flush_on_exit: Register ``atexit`` handler (default ``True``).
        use_aggregated_usage_attribute_names: Use ``gen_ai.aggregated_usage.*``
            prefix on root spans.

    Raises:
        ValueError: If public_key or secret_key cannot be resolved.
        ImportError: If required OpenTelemetry packages are not installed.

    Example::

        # Minimal — keys from env vars
        langfuse = Langfuse()
        agent = Agent("openai/gpt-4o", instrument=langfuse)

        # Explicit keys, US region, no content in traces
        langfuse = Langfuse(
            public_key="pk-lf-abc",
            secret_key="sk-lf-xyz",
            region="us",
            include_content=False,
        )
        agent = Agent("openai/gpt-4o", instrument=langfuse)
        agent.do("What is 2+2?")
        langfuse.shutdown()
    """

    def __init__(
        self,
        *,
        public_key: Optional[str] = None,
        secret_key: Optional[str] = None,
        host: Optional[str] = None,
        region: Literal["eu", "us"] = "eu",
        include_content: bool = True,
        service_name: str = "upsonic",
        sample_rate: float = 1.0,
        flush_on_exit: bool = True,
        use_aggregated_usage_attribute_names: bool = False,
    ) -> None:
        self._public_key: str = public_key or os.getenv("LANGFUSE_PUBLIC_KEY", "")
        self._secret_key: str = secret_key or os.getenv("LANGFUSE_SECRET_KEY", "")

        if not self._public_key or not self._secret_key:
            raise ValueError(
                "Langfuse public_key and secret_key are required. "
                "Pass them as arguments or set LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY env vars."
            )

        if host is not None:
            self._host: str = host.rstrip("/")
        else:
            env_host: str = os.getenv("LANGFUSE_HOST", "")
            if env_host:
                self._host = env_host.rstrip("/")
            else:
                self._host = _LANGFUSE_US_HOST if region == "us" else _LANGFUSE_EU_HOST

        self._endpoint: str = f"{self._host}/api/public/otel/v1/traces"
        self._auth_header: str = self._build_auth_header(self._public_key, self._secret_key)
        self._api_base_url: str = self._host

        super().__init__(
            service_name=service_name,
            sample_rate=sample_rate,
            include_content=include_content,
            use_aggregated_usage_attribute_names=use_aggregated_usage_attribute_names,
            flush_on_exit=flush_on_exit,
        )

    def _create_exporter(self) -> "_SpanExporter":
        """HTTP/protobuf OTLP exporter aimed at the Langfuse endpoint."""
        try:
            from opentelemetry.exporter.otlp.proto.http.trace_exporter import (
                OTLPSpanExporter,
            )
        except ImportError as exc:
            raise ImportError(
                "HTTP OTLP exporter is required for Langfuse (gRPC is not supported). "
                "Install with: pip install opentelemetry-exporter-otlp-proto-http"
            ) from exc

        return OTLPSpanExporter(
            endpoint=self._endpoint,
            headers={"Authorization": self._auth_header},
        )

    @staticmethod
    def _build_auth_header(public_key: str, secret_key: str) -> str:
        raw: str = f"{public_key}:{secret_key}"
        encoded: str = base64.b64encode(raw.encode("utf-8")).decode("ascii")
        return f"Basic {encoded}"

    def _api_headers(self) -> Dict[str, str]:
        """Langfuse Basic Auth headers for REST API requests."""
        return {
            "Authorization": self._auth_header,
            "Content-Type": "application/json",
        }

    # ==================================================================
    # Scores API
    # ==================================================================

    def score(
        self,
        trace_id: str,
        name: str,
        value: Union[int, float, str],
        *,
        observation_id: Optional[str] = None,
        session_id: Optional[str] = None,
        data_type: Optional[Literal["NUMERIC", "CATEGORICAL", "BOOLEAN"]] = None,
        comment: Optional[str] = None,
        score_id: Optional[str] = None,
        config_id: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        environment: Optional[str] = None,
        queue_id: Optional[str] = None,
        dataset_run_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Create or update a score on a Langfuse trace or observation.

        Scores can be numeric (float), categorical (string), or boolean.
        If ``data_type`` is not provided, Langfuse infers it from the value.

        Args:
            trace_id: The trace ID to attach the score to.
            name: Name/label of the score (e.g. ``"quality"``, ``"correctness"``).
            value: The score value. For NUMERIC: a float. For CATEGORICAL: a
                string. For BOOLEAN: ``0`` or ``1`` (as int/float).
            observation_id: Scope the score to a specific span/generation.
            session_id: Associate the score with a session.
            data_type: Explicit type — ``"NUMERIC"``, ``"CATEGORICAL"``,
                or ``"BOOLEAN"``. Inferred from value if omitted.
            comment: Free-text explanation for the score.
            score_id: Idempotency key for upsert behaviour.
            config_id: Reference to a ScoreConfig for server-side validation.
            metadata: Arbitrary metadata dict attached to the score.
            environment: Environment label (e.g. ``"production"``).
            queue_id: Annotation queue that originated this score.
            dataset_run_id: Link to a dataset run.

        Returns:
            Dict with at least ``{"id": "<score-id>"}``.

        Example::

            langfuse.score("trace-abc", "quality", 0.95)
            langfuse.score("trace-abc", "sentiment", "positive",
                           data_type="CATEGORICAL")
            langfuse.score("trace-abc", "factual", 1,
                           data_type="BOOLEAN", comment="Verified")
        """
        body = self._build_score_body(
            trace_id=trace_id, name=name, value=value,
            observation_id=observation_id, session_id=session_id,
            data_type=data_type, comment=comment, score_id=score_id,
            config_id=config_id, metadata=metadata,
            environment=environment, queue_id=queue_id,
            dataset_run_id=dataset_run_id,
        )
        return self._post("/api/public/scores", body)

    async def ascore(
        self,
        trace_id: str,
        name: str,
        value: Union[int, float, str],
        *,
        observation_id: Optional[str] = None,
        session_id: Optional[str] = None,
        data_type: Optional[Literal["NUMERIC", "CATEGORICAL", "BOOLEAN"]] = None,
        comment: Optional[str] = None,
        score_id: Optional[str] = None,
        config_id: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        environment: Optional[str] = None,
        queue_id: Optional[str] = None,
        dataset_run_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`score`."""
        body = self._build_score_body(
            trace_id=trace_id, name=name, value=value,
            observation_id=observation_id, session_id=session_id,
            data_type=data_type, comment=comment, score_id=score_id,
            config_id=config_id, metadata=metadata,
            environment=environment, queue_id=queue_id,
            dataset_run_id=dataset_run_id,
        )
        return await self._apost("/api/public/scores", body)

    def get_scores(
        self,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
        name: Optional[str] = None,
        user_id: Optional[str] = None,
        trace_id: Optional[str] = None,
        observation_id: Optional[str] = None,
        session_id: Optional[str] = None,
        source: Optional[Literal["ANNOTATION", "API", "EVAL"]] = None,
        data_type: Optional[Literal["NUMERIC", "CATEGORICAL", "BOOLEAN"]] = None,
        config_id: Optional[str] = None,
        queue_id: Optional[str] = None,
        dataset_run_id: Optional[str] = None,
        from_timestamp: Optional[str] = None,
        to_timestamp: Optional[str] = None,
        environment: Optional[List[str]] = None,
        operator: Optional[str] = None,
        value: Optional[float] = None,
        score_ids: Optional[str] = None,
        trace_tags: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """Retrieve a paginated list of scores with optional filters.

        Uses ``GET /api/public/v2/scores``.

        Args:
            page: Page number (starts at 1).
            limit: Items per page.
            name: Filter by score name.
            user_id: Filter by user ID on the linked trace.
            trace_id: Filter by trace ID.
            observation_id: Comma-separated observation IDs.
            session_id: Filter by session ID.
            source: Filter by source (``"ANNOTATION"``, ``"API"``, ``"EVAL"``).
            data_type: Filter by data type.
            config_id: Filter by score config ID.
            queue_id: Filter by annotation queue ID.
            dataset_run_id: Filter by dataset run ID.
            from_timestamp: ISO 8601 datetime lower bound.
            to_timestamp: ISO 8601 datetime upper bound.
            environment: List of environment strings.
            operator: Comparison operator for value filter (e.g. ``">"``, ``"<"``).
            value: Numeric value for value filter (used with *operator*).
            score_ids: Comma-separated list of score IDs.
            trace_tags: Only return scores on traces with all these tags.

        Returns:
            Paginated response with ``data`` (list of scores) and ``meta``.
        """
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        if name is not None:
            params["name"] = name
        if user_id is not None:
            params["userId"] = user_id
        if trace_id is not None:
            params["traceId"] = trace_id
        if observation_id is not None:
            params["observationId"] = observation_id
        if session_id is not None:
            params["sessionId"] = session_id
        if source is not None:
            params["source"] = source
        if data_type is not None:
            params["dataType"] = data_type
        if config_id is not None:
            params["configId"] = config_id
        if queue_id is not None:
            params["queueId"] = queue_id
        if dataset_run_id is not None:
            params["datasetRunId"] = dataset_run_id
        if from_timestamp is not None:
            params["fromTimestamp"] = from_timestamp
        if to_timestamp is not None:
            params["toTimestamp"] = to_timestamp
        if environment is not None:
            params["environment"] = environment
        if operator is not None:
            params["operator"] = operator
        if value is not None:
            params["value"] = value
        if score_ids is not None:
            params["scoreIds"] = score_ids
        if trace_tags is not None:
            params["traceTags"] = trace_tags
        return self._get("/api/public/v2/scores", params or None)

    async def aget_scores(
        self,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
        name: Optional[str] = None,
        user_id: Optional[str] = None,
        trace_id: Optional[str] = None,
        observation_id: Optional[str] = None,
        session_id: Optional[str] = None,
        source: Optional[Literal["ANNOTATION", "API", "EVAL"]] = None,
        data_type: Optional[Literal["NUMERIC", "CATEGORICAL", "BOOLEAN"]] = None,
        config_id: Optional[str] = None,
        queue_id: Optional[str] = None,
        dataset_run_id: Optional[str] = None,
        from_timestamp: Optional[str] = None,
        to_timestamp: Optional[str] = None,
        environment: Optional[List[str]] = None,
        operator: Optional[str] = None,
        value: Optional[float] = None,
        score_ids: Optional[str] = None,
        trace_tags: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`get_scores`."""
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        if name is not None:
            params["name"] = name
        if user_id is not None:
            params["userId"] = user_id
        if trace_id is not None:
            params["traceId"] = trace_id
        if observation_id is not None:
            params["observationId"] = observation_id
        if session_id is not None:
            params["sessionId"] = session_id
        if source is not None:
            params["source"] = source
        if data_type is not None:
            params["dataType"] = data_type
        if config_id is not None:
            params["configId"] = config_id
        if queue_id is not None:
            params["queueId"] = queue_id
        if dataset_run_id is not None:
            params["datasetRunId"] = dataset_run_id
        if from_timestamp is not None:
            params["fromTimestamp"] = from_timestamp
        if to_timestamp is not None:
            params["toTimestamp"] = to_timestamp
        if environment is not None:
            params["environment"] = environment
        if operator is not None:
            params["operator"] = operator
        if value is not None:
            params["value"] = value
        if score_ids is not None:
            params["scoreIds"] = score_ids
        if trace_tags is not None:
            params["traceTags"] = trace_tags
        return await self._aget("/api/public/v2/scores", params or None)

    def delete_score(self, score_id: str) -> None:
        """Delete a score by its Langfuse score ID.

        Args:
            score_id: The unique Langfuse identifier of the score to delete.
        """
        self._delete(f"/api/public/scores/{score_id}")

    async def adelete_score(self, score_id: str) -> None:
        """Async variant of :meth:`delete_score`."""
        await self._adelete(f"/api/public/scores/{score_id}")

    @staticmethod
    def _build_score_body(
        *,
        trace_id: str,
        name: str,
        value: Union[int, float, str],
        observation_id: Optional[str] = None,
        session_id: Optional[str] = None,
        data_type: Optional[str] = None,
        comment: Optional[str] = None,
        score_id: Optional[str] = None,
        config_id: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        environment: Optional[str] = None,
        queue_id: Optional[str] = None,
        dataset_run_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        body: Dict[str, Any] = {
            "traceId": trace_id,
            "name": name,
            "value": value,
        }
        if observation_id is not None:
            body["observationId"] = observation_id
        if session_id is not None:
            body["sessionId"] = session_id
        if data_type is not None:
            body["dataType"] = data_type
        if comment is not None:
            body["comment"] = comment
        if score_id is not None:
            body["id"] = score_id
        if config_id is not None:
            body["configId"] = config_id
        if metadata is not None:
            body["metadata"] = metadata
        if environment is not None:
            body["environment"] = environment
        if queue_id is not None:
            body["queueId"] = queue_id
        if dataset_run_id is not None:
            body["datasetRunId"] = dataset_run_id
        return body

    # ==================================================================
    # Score Configs API
    # ==================================================================

    def create_score_config(
        self,
        name: str,
        data_type: Literal["NUMERIC", "CATEGORICAL", "BOOLEAN"],
        *,
        categories: Optional[List[Dict[str, Any]]] = None,
        min_value: Optional[float] = None,
        max_value: Optional[float] = None,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Create a score configuration that defines scoring structure.

        Args:
            name: Name of the score config.
            data_type: ``"NUMERIC"``, ``"CATEGORICAL"``, or ``"BOOLEAN"``.
            categories: Custom categories for categorical scores.
                Each item: ``{"label": "...", "value": <number>}``.
                Auto-generated for boolean configs.
            min_value: Minimum for numeric scores (default ``-inf``).
            max_value: Maximum for numeric scores (default ``+inf``).
            description: Human-readable description shown in the Langfuse UI.

        Returns:
            The created ``ScoreConfig`` object.

        Example::

            # Numeric config with range
            langfuse.create_score_config(
                "quality", "NUMERIC", min_value=0, max_value=1,
                description="Quality score between 0 and 1",
            )

            # Categorical config
            langfuse.create_score_config(
                "sentiment", "CATEGORICAL",
                categories=[
                    {"label": "positive", "value": 1},
                    {"label": "neutral",  "value": 0},
                    {"label": "negative", "value": -1},
                ],
            )

            # Boolean config
            langfuse.create_score_config("factual", "BOOLEAN")
        """
        body: Dict[str, Any] = {"name": name, "dataType": data_type}
        if categories is not None:
            body["categories"] = categories
        if min_value is not None:
            body["minValue"] = min_value
        if max_value is not None:
            body["maxValue"] = max_value
        if description is not None:
            body["description"] = description
        return self._post("/api/public/score-configs", body)

    async def acreate_score_config(
        self,
        name: str,
        data_type: Literal["NUMERIC", "CATEGORICAL", "BOOLEAN"],
        *,
        categories: Optional[List[Dict[str, Any]]] = None,
        min_value: Optional[float] = None,
        max_value: Optional[float] = None,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`create_score_config`."""
        body: Dict[str, Any] = {"name": name, "dataType": data_type}
        if categories is not None:
            body["categories"] = categories
        if min_value is not None:
            body["minValue"] = min_value
        if max_value is not None:
            body["maxValue"] = max_value
        if description is not None:
            body["description"] = description
        return await self._apost("/api/public/score-configs", body)

    def get_score_configs(
        self,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """List all score configs.

        Args:
            page: Page number (starts at 1).
            limit: Items per page.

        Returns:
            Paginated response with ``data`` (list of configs) and ``meta``.
        """
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return self._get("/api/public/score-configs", params or None)

    async def aget_score_configs(
        self,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`get_score_configs`."""
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return await self._aget("/api/public/score-configs", params or None)

    def get_score_config(self, config_id: str) -> Dict[str, Any]:
        """Get a single score config by ID.

        Args:
            config_id: The unique identifier of the score config.

        Returns:
            The ``ScoreConfig`` object.
        """
        return self._get(f"/api/public/score-configs/{config_id}")

    async def aget_score_config(self, config_id: str) -> Dict[str, Any]:
        """Async variant of :meth:`get_score_config`."""
        return await self._aget(f"/api/public/score-configs/{config_id}")

    def update_score_config(
        self,
        config_id: str,
        *,
        name: Optional[str] = None,
        is_archived: Optional[bool] = None,
        categories: Optional[List[Dict[str, Any]]] = None,
        min_value: Optional[float] = None,
        max_value: Optional[float] = None,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Update an existing score config.

        Args:
            config_id: The unique identifier of the score config.
            name: New name for the config.
            is_archived: Archive or unarchive the config.
            categories: Updated category definitions.
            min_value: Updated minimum for numeric scores.
            max_value: Updated maximum for numeric scores.
            description: Updated description.

        Returns:
            The updated ``ScoreConfig`` object.
        """
        body: Dict[str, Any] = {}
        if name is not None:
            body["name"] = name
        if is_archived is not None:
            body["isArchived"] = is_archived
        if categories is not None:
            body["categories"] = categories
        if min_value is not None:
            body["minValue"] = min_value
        if max_value is not None:
            body["maxValue"] = max_value
        if description is not None:
            body["description"] = description
        return self._patch(f"/api/public/score-configs/{config_id}", body)

    async def aupdate_score_config(
        self,
        config_id: str,
        *,
        name: Optional[str] = None,
        is_archived: Optional[bool] = None,
        categories: Optional[List[Dict[str, Any]]] = None,
        min_value: Optional[float] = None,
        max_value: Optional[float] = None,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`update_score_config`."""
        body: Dict[str, Any] = {}
        if name is not None:
            body["name"] = name
        if is_archived is not None:
            body["isArchived"] = is_archived
        if categories is not None:
            body["categories"] = categories
        if min_value is not None:
            body["minValue"] = min_value
        if max_value is not None:
            body["maxValue"] = max_value
        if description is not None:
            body["description"] = description
        return await self._apatch(f"/api/public/score-configs/{config_id}", body)

    # ==================================================================
    # Annotation Queues API
    # ==================================================================

    def create_annotation_queue(
        self,
        name: str,
        score_config_ids: List[str],
        *,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Create an annotation queue for human review workflows.

        Args:
            name: Queue name.
            score_config_ids: List of ScoreConfig IDs that define which
                scoring dimensions annotators will use.
            description: Optional queue description.

        Returns:
            The created ``AnnotationQueue`` object.

        Example::

            cfg = langfuse.create_score_config("quality", "NUMERIC",
                                                min_value=1, max_value=5)
            queue = langfuse.create_annotation_queue(
                "Review batch 42",
                score_config_ids=[cfg["id"]],
                description="Weekly quality review",
            )
        """
        body: Dict[str, Any] = {
            "name": name,
            "scoreConfigIds": score_config_ids,
        }
        if description is not None:
            body["description"] = description
        return self._post("/api/public/annotation-queues", body)

    async def acreate_annotation_queue(
        self,
        name: str,
        score_config_ids: List[str],
        *,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`create_annotation_queue`."""
        body: Dict[str, Any] = {
            "name": name,
            "scoreConfigIds": score_config_ids,
        }
        if description is not None:
            body["description"] = description
        return await self._apost("/api/public/annotation-queues", body)

    def get_annotation_queues(
        self,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """List all annotation queues.

        Args:
            page: Page number (starts at 1).
            limit: Items per page.

        Returns:
            Paginated response with ``data`` and ``meta``.
        """
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return self._get("/api/public/annotation-queues", params or None)

    async def aget_annotation_queues(
        self,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`get_annotation_queues`."""
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return await self._aget("/api/public/annotation-queues", params or None)

    def get_annotation_queue(self, queue_id: str) -> Dict[str, Any]:
        """Get a single annotation queue by ID.

        Args:
            queue_id: The unique identifier of the annotation queue.

        Returns:
            The ``AnnotationQueue`` object.
        """
        return self._get(f"/api/public/annotation-queues/{queue_id}")

    async def aget_annotation_queue(self, queue_id: str) -> Dict[str, Any]:
        """Async variant of :meth:`get_annotation_queue`."""
        return await self._aget(f"/api/public/annotation-queues/{queue_id}")

    # ------------------------------------------------------------------
    # Annotation Queue Items
    # ------------------------------------------------------------------

    def create_annotation_queue_item(
        self,
        queue_id: str,
        object_id: str,
        object_type: Literal["TRACE", "OBSERVATION", "SESSION"],
        *,
        status: Optional[Literal["PENDING", "COMPLETED"]] = None,
    ) -> Dict[str, Any]:
        """Add an item to an annotation queue.

        Args:
            queue_id: The queue to add the item to.
            object_id: ID of the trace, observation, or session.
            object_type: ``"TRACE"``, ``"OBSERVATION"``, or ``"SESSION"``.
            status: Initial status (defaults to ``"PENDING"``).

        Returns:
            The created ``AnnotationQueueItem`` object.

        Example::

            langfuse.create_annotation_queue_item(
                queue_id="queue-abc",
                object_id="trace-xyz",
                object_type="TRACE",
            )
        """
        body: Dict[str, Any] = {
            "objectId": object_id,
            "objectType": object_type,
        }
        if status is not None:
            body["status"] = status
        return self._post(
            f"/api/public/annotation-queues/{queue_id}/items", body,
        )

    async def acreate_annotation_queue_item(
        self,
        queue_id: str,
        object_id: str,
        object_type: Literal["TRACE", "OBSERVATION", "SESSION"],
        *,
        status: Optional[Literal["PENDING", "COMPLETED"]] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`create_annotation_queue_item`."""
        body: Dict[str, Any] = {
            "objectId": object_id,
            "objectType": object_type,
        }
        if status is not None:
            body["status"] = status
        return await self._apost(
            f"/api/public/annotation-queues/{queue_id}/items", body,
        )

    def get_annotation_queue_items(
        self,
        queue_id: str,
        *,
        status: Optional[Literal["PENDING", "COMPLETED"]] = None,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """List items in an annotation queue.

        Args:
            queue_id: The queue to list items for.
            status: Filter by ``"PENDING"`` or ``"COMPLETED"``.
            page: Page number (starts at 1).
            limit: Items per page.

        Returns:
            Paginated response with ``data`` and ``meta``.
        """
        params: Dict[str, Any] = {}
        if status is not None:
            params["status"] = status
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return self._get(
            f"/api/public/annotation-queues/{queue_id}/items",
            params or None,
        )

    async def aget_annotation_queue_items(
        self,
        queue_id: str,
        *,
        status: Optional[Literal["PENDING", "COMPLETED"]] = None,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`get_annotation_queue_items`."""
        params: Dict[str, Any] = {}
        if status is not None:
            params["status"] = status
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return await self._aget(
            f"/api/public/annotation-queues/{queue_id}/items",
            params or None,
        )

    def get_annotation_queue_item(
        self, queue_id: str, item_id: str,
    ) -> Dict[str, Any]:
        """Get a specific annotation queue item.

        Args:
            queue_id: The queue ID.
            item_id: The item ID.

        Returns:
            The ``AnnotationQueueItem`` object.
        """
        return self._get(
            f"/api/public/annotation-queues/{queue_id}/items/{item_id}",
        )

    async def aget_annotation_queue_item(
        self, queue_id: str, item_id: str,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`get_annotation_queue_item`."""
        return await self._aget(
            f"/api/public/annotation-queues/{queue_id}/items/{item_id}",
        )

    def update_annotation_queue_item(
        self,
        queue_id: str,
        item_id: str,
        *,
        status: Optional[Literal["PENDING", "COMPLETED"]] = None,
    ) -> Dict[str, Any]:
        """Update an annotation queue item (e.g. mark as completed).

        Args:
            queue_id: The queue ID.
            item_id: The item ID.
            status: New status — ``"PENDING"`` or ``"COMPLETED"``.

        Returns:
            The updated ``AnnotationQueueItem`` object.
        """
        body: Dict[str, Any] = {}
        if status is not None:
            body["status"] = status
        return self._patch(
            f"/api/public/annotation-queues/{queue_id}/items/{item_id}",
            body,
        )

    async def aupdate_annotation_queue_item(
        self,
        queue_id: str,
        item_id: str,
        *,
        status: Optional[Literal["PENDING", "COMPLETED"]] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`update_annotation_queue_item`."""
        body: Dict[str, Any] = {}
        if status is not None:
            body["status"] = status
        return await self._apatch(
            f"/api/public/annotation-queues/{queue_id}/items/{item_id}",
            body,
        )

    def delete_annotation_queue_item(
        self, queue_id: str, item_id: str,
    ) -> Dict[str, Any]:
        """Remove an item from an annotation queue.

        Args:
            queue_id: The queue ID.
            item_id: The item ID.

        Returns:
            ``{"success": True, "message": "..."}``.
        """
        self._delete(
            f"/api/public/annotation-queues/{queue_id}/items/{item_id}",
        )
        return {"success": True}

    async def adelete_annotation_queue_item(
        self, queue_id: str, item_id: str,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`delete_annotation_queue_item`."""
        await self._adelete(
            f"/api/public/annotation-queues/{queue_id}/items/{item_id}",
        )
        return {"success": True}

    # ------------------------------------------------------------------
    # Delete Annotation Queue
    # ------------------------------------------------------------------

    def delete_annotation_queue(self, queue_id: str) -> Dict[str, Any]:
        """Clear an annotation queue by removing all its items.

        The Langfuse public API does not expose a queue-level DELETE
        endpoint, so only the items are removed.  The empty queue shell
        remains and can be reused via :meth:`create_annotation_queue_item`.

        Args:
            queue_id: The queue ID.

        Returns:
            ``{"success": True, "items_removed": <int>}``.
        """
        removed = 0
        while True:
            page = self.get_annotation_queue_items(queue_id, limit=50)
            items = page.get("data", [])
            if not items:
                break
            for item in items:
                self.delete_annotation_queue_item(queue_id, item["id"])
                removed += 1

        return {"success": True, "items_removed": removed}

    async def adelete_annotation_queue(self, queue_id: str) -> Dict[str, Any]:
        """Async variant of :meth:`delete_annotation_queue`."""
        removed = 0
        while True:
            page = await self.aget_annotation_queue_items(queue_id, limit=50)
            items = page.get("data", [])
            if not items:
                break
            for item in items:
                await self.adelete_annotation_queue_item(queue_id, item["id"])
                removed += 1

        return {"success": True, "items_removed": removed}

    # ------------------------------------------------------------------
    # Annotation Queue Assignments
    # ------------------------------------------------------------------

    def create_annotation_queue_assignment(
        self, queue_id: str, user_id: str,
    ) -> Dict[str, Any]:
        """Assign a user to an annotation queue.

        Args:
            queue_id: The queue ID.
            user_id: The user ID to assign.

        Returns:
            Assignment object with ``userId``, ``queueId``, ``projectId``.
        """
        return self._post(
            f"/api/public/annotation-queues/{queue_id}/assignments",
            {"userId": user_id},
        )

    async def acreate_annotation_queue_assignment(
        self, queue_id: str, user_id: str,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`create_annotation_queue_assignment`."""
        return await self._apost(
            f"/api/public/annotation-queues/{queue_id}/assignments",
            {"userId": user_id},
        )

    def delete_annotation_queue_assignment(
        self, queue_id: str, user_id: str,
    ) -> Dict[str, Any]:
        """Remove a user assignment from an annotation queue.

        Args:
            queue_id: The queue ID.
            user_id: The user ID to unassign.

        Returns:
            ``{"success": True}``.
        """
        return self._delete_with_body(
            f"/api/public/annotation-queues/{queue_id}/assignments",
            {"userId": user_id},
        )

    async def adelete_annotation_queue_assignment(
        self, queue_id: str, user_id: str,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`delete_annotation_queue_assignment`."""
        return await self._adelete_with_body(
            f"/api/public/annotation-queues/{queue_id}/assignments",
            {"userId": user_id},
        )

    # ==================================================================
    # Traces API
    # ==================================================================

    def update_trace(
        self,
        trace_id: str,
        *,
        output: Optional[Any] = None,
        metadata: Optional[Dict[str, Any]] = None,
        tags: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """Update a trace's attributes (output, metadata, tags).

        Uses the Langfuse ingestion API with a ``trace-create`` event,
        which upserts by ``id``.

        Args:
            trace_id: The trace ID to update.
            output: New output value for the trace.
            metadata: Metadata dict to merge into the trace.
            tags: Tags to set on the trace.

        Returns:
            The ingestion API response.
        """
        trace_body: Dict[str, Any] = {"id": trace_id}
        if output is not None:
            trace_body["output"] = output
        if metadata is not None:
            trace_body["metadata"] = metadata
        if tags is not None:
            trace_body["tags"] = tags
        # Use a timestamp far enough in the future to ensure this update
        # takes precedence over any OTel trace events still being processed.
        event_ts = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=5)
        batch = {
            "batch": [
                {
                    "id": str(uuid.uuid4()),
                    "type": "trace-create",
                    "timestamp": event_ts.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
                    "body": trace_body,
                }
            ],
        }
        return self._post("/api/public/ingestion", batch)

    async def aupdate_trace(
        self,
        trace_id: str,
        *,
        output: Optional[Any] = None,
        metadata: Optional[Dict[str, Any]] = None,
        tags: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`update_trace`."""
        trace_body: Dict[str, Any] = {"id": trace_id}
        if output is not None:
            trace_body["output"] = output
        if metadata is not None:
            trace_body["metadata"] = metadata
        if tags is not None:
            trace_body["tags"] = tags
        event_ts = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=5)
        batch = {
            "batch": [
                {
                    "id": str(uuid.uuid4()),
                    "type": "trace-create",
                    "timestamp": event_ts.strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
                    "body": trace_body,
                }
            ],
        }
        return await self._apost("/api/public/ingestion", batch)

    # ==================================================================
    # Datasets API
    # ==================================================================

    def create_dataset(
        self,
        name: str,
        *,
        description: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        input_schema: Optional[Dict[str, Any]] = None,
        expected_output_schema: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Create a new dataset.

        Args:
            name: Dataset name (unique within the project).
            description: Optional description.
            metadata: Arbitrary metadata dict.
            input_schema: JSON Schema describing the input structure.
            expected_output_schema: JSON Schema describing the expected output structure.

        Returns:
            The created dataset object.
        """
        body: Dict[str, Any] = {"name": name}
        if description is not None:
            body["description"] = description
        if metadata is not None:
            body["metadata"] = metadata
        if input_schema is not None:
            body["inputSchema"] = input_schema
        if expected_output_schema is not None:
            body["expectedOutputSchema"] = expected_output_schema
        return self._post("/api/public/v2/datasets", body)

    async def acreate_dataset(
        self,
        name: str,
        *,
        description: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        input_schema: Optional[Dict[str, Any]] = None,
        expected_output_schema: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`create_dataset`."""
        body: Dict[str, Any] = {"name": name}
        if description is not None:
            body["description"] = description
        if metadata is not None:
            body["metadata"] = metadata
        if input_schema is not None:
            body["inputSchema"] = input_schema
        if expected_output_schema is not None:
            body["expectedOutputSchema"] = expected_output_schema
        return await self._apost("/api/public/v2/datasets", body)

    def get_datasets(
        self,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """List all datasets.

        Args:
            page: Page number (starts at 1).
            limit: Items per page.

        Returns:
            Paginated response with ``data`` and ``meta``.
        """
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return self._get("/api/public/v2/datasets", params or None)

    async def aget_datasets(
        self,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`get_datasets`."""
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return await self._aget("/api/public/v2/datasets", params or None)

    def get_dataset(self, dataset_name: str) -> Dict[str, Any]:
        """Get a dataset by name.

        Args:
            dataset_name: The dataset name.

        Returns:
            The dataset object.
        """
        return self._get(f"/api/public/v2/datasets/{dataset_name}")

    async def aget_dataset(self, dataset_name: str) -> Dict[str, Any]:
        """Async variant of :meth:`get_dataset`."""
        return await self._aget(f"/api/public/v2/datasets/{dataset_name}")

    # ------------------------------------------------------------------
    # Dataset Items
    # ------------------------------------------------------------------

    def create_dataset_item(
        self,
        dataset_name: str,
        *,
        input: Any,
        expected_output: Optional[Any] = None,
        metadata: Optional[Dict[str, Any]] = None,
        source_trace_id: Optional[str] = None,
        source_observation_id: Optional[str] = None,
        item_id: Optional[str] = None,
        status: Optional[Literal["ACTIVE", "ARCHIVED"]] = None,
    ) -> Dict[str, Any]:
        """Create or upsert a dataset item.

        Args:
            dataset_name: Name of the dataset to add the item to.
            input: The input data for this item.
            expected_output: The expected/ground-truth output.
            metadata: Arbitrary metadata dict.
            source_trace_id: Link to an originating trace.
            source_observation_id: Link to an originating observation.
            item_id: Idempotency key for upsert behaviour.
            status: ``"ACTIVE"`` or ``"ARCHIVED"``.

        Returns:
            The created/updated dataset item object.
        """
        body: Dict[str, Any] = {
            "datasetName": dataset_name,
            "input": input,
        }
        if expected_output is not None:
            body["expectedOutput"] = expected_output
        if metadata is not None:
            body["metadata"] = metadata
        if source_trace_id is not None:
            body["sourceTraceId"] = source_trace_id
        if source_observation_id is not None:
            body["sourceObservationId"] = source_observation_id
        if item_id is not None:
            body["id"] = item_id
        if status is not None:
            body["status"] = status
        return self._post("/api/public/dataset-items", body)

    async def acreate_dataset_item(
        self,
        dataset_name: str,
        *,
        input: Any,
        expected_output: Optional[Any] = None,
        metadata: Optional[Dict[str, Any]] = None,
        source_trace_id: Optional[str] = None,
        source_observation_id: Optional[str] = None,
        item_id: Optional[str] = None,
        status: Optional[Literal["ACTIVE", "ARCHIVED"]] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`create_dataset_item`."""
        body: Dict[str, Any] = {
            "datasetName": dataset_name,
            "input": input,
        }
        if expected_output is not None:
            body["expectedOutput"] = expected_output
        if metadata is not None:
            body["metadata"] = metadata
        if source_trace_id is not None:
            body["sourceTraceId"] = source_trace_id
        if source_observation_id is not None:
            body["sourceObservationId"] = source_observation_id
        if item_id is not None:
            body["id"] = item_id
        if status is not None:
            body["status"] = status
        return await self._apost("/api/public/dataset-items", body)

    def get_dataset_items(
        self,
        dataset_name: str,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
        source_trace_id: Optional[str] = None,
        source_observation_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """List items in a dataset.

        Args:
            dataset_name: The dataset name.
            page: Page number (starts at 1).
            limit: Items per page.
            source_trace_id: Filter by source trace ID.
            source_observation_id: Filter by source observation ID.

        Returns:
            Paginated response with ``data`` and ``meta``.
        """
        params: Dict[str, Any] = {"datasetName": dataset_name}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        if source_trace_id is not None:
            params["sourceTraceId"] = source_trace_id
        if source_observation_id is not None:
            params["sourceObservationId"] = source_observation_id
        return self._get("/api/public/dataset-items", params)

    async def aget_dataset_items(
        self,
        dataset_name: str,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
        source_trace_id: Optional[str] = None,
        source_observation_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`get_dataset_items`."""
        params: Dict[str, Any] = {"datasetName": dataset_name}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        if source_trace_id is not None:
            params["sourceTraceId"] = source_trace_id
        if source_observation_id is not None:
            params["sourceObservationId"] = source_observation_id
        return await self._aget("/api/public/dataset-items", params)

    def get_dataset_item(self, item_id: str) -> Dict[str, Any]:
        """Get a single dataset item by ID.

        Args:
            item_id: The dataset item ID.

        Returns:
            The dataset item object.
        """
        return self._get(f"/api/public/dataset-items/{item_id}")

    async def aget_dataset_item(self, item_id: str) -> Dict[str, Any]:
        """Async variant of :meth:`get_dataset_item`."""
        return await self._aget(f"/api/public/dataset-items/{item_id}")

    def delete_dataset_item(self, item_id: str) -> None:
        """Delete a dataset item.

        Args:
            item_id: The dataset item ID.
        """
        self._delete(f"/api/public/dataset-items/{item_id}")

    async def adelete_dataset_item(self, item_id: str) -> None:
        """Async variant of :meth:`delete_dataset_item`."""
        await self._adelete(f"/api/public/dataset-items/{item_id}")

    # ------------------------------------------------------------------
    # Dataset Run Items
    # ------------------------------------------------------------------

    def create_dataset_run_item(
        self,
        run_name: str,
        dataset_item_id: str,
        trace_id: str,
        *,
        observation_id: Optional[str] = None,
        run_description: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Link a dataset item to a trace via a dataset run.

        Runs are auto-created when posting a run item with a new
        ``run_name``.

        Args:
            run_name: Name of the dataset run (auto-created if new).
            dataset_item_id: The dataset item ID.
            trace_id: The trace ID produced by executing the item's input.
            observation_id: Scope to a specific observation within the trace.
            run_description: Description for the auto-created run.
            metadata: Arbitrary metadata dict.

        Returns:
            The created run item object.
        """
        body: Dict[str, Any] = {
            "runName": run_name,
            "datasetItemId": dataset_item_id,
            "traceId": trace_id,
        }
        if observation_id is not None:
            body["observationId"] = observation_id
        if run_description is not None:
            body["runDescription"] = run_description
        if metadata is not None:
            body["metadata"] = metadata
        return self._post("/api/public/dataset-run-items", body)

    async def acreate_dataset_run_item(
        self,
        run_name: str,
        dataset_item_id: str,
        trace_id: str,
        *,
        observation_id: Optional[str] = None,
        run_description: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`create_dataset_run_item`."""
        body: Dict[str, Any] = {
            "runName": run_name,
            "datasetItemId": dataset_item_id,
            "traceId": trace_id,
        }
        if observation_id is not None:
            body["observationId"] = observation_id
        if run_description is not None:
            body["runDescription"] = run_description
        if metadata is not None:
            body["metadata"] = metadata
        return await self._apost("/api/public/dataset-run-items", body)

    # ------------------------------------------------------------------
    # Dataset Runs
    # ------------------------------------------------------------------

    def get_dataset_runs(
        self,
        dataset_name: str,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """List runs for a dataset.

        Args:
            dataset_name: The dataset name.
            page: Page number (starts at 1).
            limit: Items per page.

        Returns:
            Paginated response with ``data`` and ``meta``.
        """
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return self._get(
            f"/api/public/datasets/{dataset_name}/runs", params or None,
        )

    async def aget_dataset_runs(
        self,
        dataset_name: str,
        *,
        page: Optional[int] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`get_dataset_runs`."""
        params: Dict[str, Any] = {}
        if page is not None:
            params["page"] = page
        if limit is not None:
            params["limit"] = limit
        return await self._aget(
            f"/api/public/datasets/{dataset_name}/runs", params or None,
        )

    def get_dataset_run(
        self, dataset_name: str, run_name: str,
    ) -> Dict[str, Any]:
        """Get a specific dataset run.

        Args:
            dataset_name: The dataset name.
            run_name: The run name.

        Returns:
            The dataset run object.
        """
        return self._get(
            f"/api/public/datasets/{dataset_name}/runs/{run_name}",
        )

    async def aget_dataset_run(
        self, dataset_name: str, run_name: str,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`get_dataset_run`."""
        return await self._aget(
            f"/api/public/datasets/{dataset_name}/runs/{run_name}",
        )

    def delete_dataset_run(
        self, dataset_name: str, run_name: str,
    ) -> None:
        """Delete a dataset run.

        Args:
            dataset_name: The dataset name.
            run_name: The run name.
        """
        self._delete(
            f"/api/public/datasets/{dataset_name}/runs/{run_name}",
        )

    async def adelete_dataset_run(
        self, dataset_name: str, run_name: str,
    ) -> None:
        """Async variant of :meth:`delete_dataset_run`."""
        await self._adelete(
            f"/api/public/datasets/{dataset_name}/runs/{run_name}",
        )

    # ==================================================================
    # repr
    # ==================================================================

    def __repr__(self) -> str:
        return (
            f"Langfuse(host={self._host!r}, "
            f"service_name={self._service_name!r}, "
            f"include_content={self._include_content}, "
            f"sample_rate={self._sample_rate})"
        )
