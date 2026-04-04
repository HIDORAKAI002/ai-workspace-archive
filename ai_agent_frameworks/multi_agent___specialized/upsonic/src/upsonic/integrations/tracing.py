"""Centralized OpenTelemetry tracing provider management for Upsonic.

All tracing backends (Langfuse, Jaeger, Datadog, custom OTLP, etc.) inherit
from :class:`TracingProvider`.  The base class owns every piece of OTel setup:

* ``TracerProvider`` / ``MeterProvider`` creation
* Sampler configuration
* ``InstrumentationSettings`` instantiation
* Lifecycle management (``shutdown``, ``flush``, ``atexit``)

Subclasses only implement :meth:`_create_exporter` to return their specific
``SpanExporter``.

Usage::

    from upsonic import Agent, DefaultTracingProvider

    provider = DefaultTracingProvider(endpoint="http://localhost:4317")
    agent = Agent("openai/gpt-4o", instrument=provider)
"""

from __future__ import annotations

import abc
import atexit
import os
from typing import Any, Dict, Optional, Tuple, TYPE_CHECKING

if TYPE_CHECKING:
    import httpx as _httpx
    from opentelemetry.sdk.metrics import MeterProvider as _MeterProvider
    from opentelemetry.sdk.resources import Resource as _Resource
    from opentelemetry.sdk.trace import TracerProvider as _TracerProvider
    from opentelemetry.sdk.trace.export import SpanExporter as _SpanExporter
    from upsonic.models.instrumented import InstrumentationSettings as _InstrumentationSettings


class TracingProvider(abc.ABC):
    """Base class for all OpenTelemetry tracing providers.

    Centralizes *all* OpenTelemetry bootstrapping so that concrete providers
    (Langfuse, default OTLP, …) only need to supply an exporter.

    The resulting instance is accepted directly by ``Agent(instrument=...)``.

    Args:
        service_name: Service name reported in traces (default ``"upsonic"``).
        sample_rate: Fraction of traces to sample (``0.0``–``1.0``, default ``1.0``).
        include_content: Include prompt/response content in traces.
        use_aggregated_usage_attribute_names: Use ``gen_ai.aggregated_usage.*``
            prefix to avoid double-counting.
        flush_on_exit: Register ``atexit`` handler for automatic shutdown.
    """

    def __init__(
        self,
        *,
        service_name: str = "upsonic",
        sample_rate: float = 1.0,
        include_content: bool = True,
        use_aggregated_usage_attribute_names: bool = False,
        flush_on_exit: bool = True,
    ) -> None:
        self._service_name: str = service_name
        self._sample_rate: float = max(0.0, min(1.0, sample_rate))
        self._include_content: bool = include_content
        self._use_aggregated: bool = use_aggregated_usage_attribute_names
        self._flush_on_exit: bool = flush_on_exit
        self._shutdown_called: bool = False

        # HTTP clients for REST API access (lazy-initialized).
        # Subclasses that need REST access should set ``_api_base_url``
        # before calling ``super().__init__()``.
        if not hasattr(self, "_api_base_url"):
            self._api_base_url: str = ""
        if not hasattr(self, "_client"):
            self._client: Optional[_httpx.Client] = None
        if not hasattr(self, "_async_client"):
            self._async_client: Optional[_httpx.AsyncClient] = None

        self._tracer_provider: _TracerProvider
        self._meter_provider: _MeterProvider
        self._settings: _InstrumentationSettings
        self._tracer_provider, self._meter_provider, self._settings = self._setup()

        if self._flush_on_exit:
            atexit.register(self.shutdown)

    @abc.abstractmethod
    def _create_exporter(self) -> "_SpanExporter":
        """Return a ``SpanExporter`` configured for this backend.

        Subclasses **must** implement this.  It is called exactly once during
        ``__init__`` and the returned exporter is attached to a
        ``BatchSpanProcessor`` on the ``TracerProvider``.
        """
        ...

    def _create_resource(self) -> "_Resource":
        """Create the OpenTelemetry ``Resource``."""
        from opentelemetry.sdk.resources import Resource
        return Resource.create({"service.name": self._service_name})

    def _create_sampler(self) -> Optional[Any]:
        """Create a sampler when ``sample_rate < 1.0``."""
        if self._sample_rate >= 1.0:
            return None
        try:
            from opentelemetry.sdk.trace.sampling import TraceIdRatioBasedSampler
            return TraceIdRatioBasedSampler(self._sample_rate)
        except ImportError:
            from opentelemetry.sdk.trace.sampling import TraceIdRatioBased
            return TraceIdRatioBased(self._sample_rate)

    def _setup(
        self,
    ) -> Tuple["_TracerProvider", "_MeterProvider", "_InstrumentationSettings"]:
        """Create TracerProvider, MeterProvider, and InstrumentationSettings."""
        try:
            from opentelemetry.sdk.trace import TracerProvider
            from opentelemetry.sdk.trace.export import BatchSpanProcessor
            from opentelemetry.sdk.metrics import MeterProvider
        except ImportError as exc:
            raise ImportError(
                "OpenTelemetry SDK packages are required for tracing. "
                "Install with: pip install opentelemetry-sdk"
            ) from exc

        resource = self._create_resource()
        sampler = self._create_sampler()

        tracer_provider = TracerProvider(
            resource=resource,
            **({"sampler": sampler} if sampler is not None else {}),
        )

        exporter = self._create_exporter()
        tracer_provider.add_span_processor(BatchSpanProcessor(exporter))

        # BaggageSpanProcessor copies OTel Baggage entries to span attributes.
        # Langfuse requires trace-level attributes (user.id, session.id, etc.)
        # to be present on ALL spans in a trace for proper filtering.
        try:
            from opentelemetry.processor.baggage import (
                BaggageSpanProcessor,
                ALLOW_ALL_BAGGAGE_KEYS,
            )
            tracer_provider.add_span_processor(
                BaggageSpanProcessor(ALLOW_ALL_BAGGAGE_KEYS)
            )
        except ImportError:
            pass

        meter_provider = MeterProvider(resource=resource)

        from upsonic.models.instrumented import InstrumentationSettings

        settings = InstrumentationSettings(
            tracer_provider=tracer_provider,
            meter_provider=meter_provider,
            include_content=self._include_content,
            use_aggregated_usage_attribute_names=self._use_aggregated,
        )

        return tracer_provider, meter_provider, settings

    @property
    def settings(self) -> "_InstrumentationSettings":
        """The ``InstrumentationSettings`` used by the Agent."""
        return self._settings

    @property
    def tracer_provider(self) -> "_TracerProvider":
        """The ``TracerProvider`` owned by this instance."""
        return self._tracer_provider

    @property
    def meter_provider(self) -> "_MeterProvider":
        """The ``MeterProvider`` owned by this instance."""
        return self._meter_provider

    # ------------------------------------------------------------------
    # HTTP plumbing for REST API access (scores, metadata, etc.)
    # ------------------------------------------------------------------

    def _api_headers(self) -> Dict[str, str]:
        """Return headers for REST API requests.

        Subclasses override this to supply authentication headers.
        The default implementation returns an empty dict.
        """
        return {}

    def _get_client(self) -> "_httpx.Client":
        """Return a lazily-initialized sync ``httpx.Client``."""
        if self._client is None:
            import httpx
            self._client = httpx.Client(base_url=self._api_base_url, timeout=30.0)
        return self._client

    def _get_async_client(self) -> "_httpx.AsyncClient":
        """Return a lazily-initialized async ``httpx.AsyncClient``."""
        if self._async_client is None:
            import httpx
            self._async_client = httpx.AsyncClient(base_url=self._api_base_url, timeout=30.0)
        return self._async_client

    @staticmethod
    def _raise_api_error(method: str, path: str, response: Any) -> None:
        """Raise an informative error with the response body included."""
        try:
            detail = response.json()
        except Exception:
            detail = response.text
        from httpx import HTTPStatusError
        raise HTTPStatusError(
            f"{method} {path} failed ({response.status_code}): {detail}",
            request=response.request,
            response=response,
        )

    def _post(self, path: str, body: Dict[str, Any]) -> Dict[str, Any]:
        """Send a POST request and return the JSON response."""
        response = self._get_client().post(path, json=body, headers=self._api_headers())
        if response.status_code >= 400:
            self._raise_api_error("POST", path, response)
        return response.json()

    async def _apost(self, path: str, body: Dict[str, Any]) -> Dict[str, Any]:
        """Async variant of :meth:`_post`."""
        response = await self._get_async_client().post(path, json=body, headers=self._api_headers())
        if response.status_code >= 400:
            self._raise_api_error("POST", path, response)
        return response.json()

    def _get(
        self, path: str, params: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Send a GET request and return the JSON response."""
        response = self._get_client().get(
            path, params=params, headers=self._api_headers(),
        )
        if response.status_code >= 400:
            self._raise_api_error("GET", path, response)
        return response.json()

    async def _aget(
        self, path: str, params: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Async variant of :meth:`_get`."""
        response = await self._get_async_client().get(
            path, params=params, headers=self._api_headers(),
        )
        if response.status_code >= 400:
            self._raise_api_error("GET", path, response)
        return response.json()

    def _patch(self, path: str, body: Dict[str, Any]) -> Dict[str, Any]:
        """Send a PATCH request and return the JSON response."""
        response = self._get_client().patch(
            path, json=body, headers=self._api_headers(),
        )
        if response.status_code >= 400:
            self._raise_api_error("PATCH", path, response)
        return response.json()

    async def _apatch(self, path: str, body: Dict[str, Any]) -> Dict[str, Any]:
        """Async variant of :meth:`_patch`."""
        response = await self._get_async_client().patch(
            path, json=body, headers=self._api_headers(),
        )
        if response.status_code >= 400:
            self._raise_api_error("PATCH", path, response)
        return response.json()

    def _delete(self, path: str) -> None:
        """Send a DELETE request."""
        response = self._get_client().delete(path, headers=self._api_headers())
        if response.status_code >= 400:
            self._raise_api_error("DELETE", path, response)

    async def _adelete(self, path: str) -> None:
        """Async variant of :meth:`_delete`."""
        response = await self._get_async_client().delete(path, headers=self._api_headers())
        if response.status_code >= 400:
            self._raise_api_error("DELETE", path, response)

    def _delete_with_body(self, path: str, body: Dict[str, Any]) -> Dict[str, Any]:
        """Send a DELETE request with a JSON body and return the JSON response."""
        response = self._get_client().request(
            "DELETE", path, json=body, headers=self._api_headers(),
        )
        if response.status_code >= 400:
            self._raise_api_error("DELETE", path, response)
        return response.json()

    async def _adelete_with_body(self, path: str, body: Dict[str, Any]) -> Dict[str, Any]:
        """Async variant of :meth:`_delete_with_body`."""
        response = await self._get_async_client().request(
            "DELETE", path, json=body, headers=self._api_headers(),
        )
        if response.status_code >= 400:
            self._raise_api_error("DELETE", path, response)
        return response.json()

    # ------------------------------------------------------------------
    # Lifecycle
    # ------------------------------------------------------------------

    def shutdown(self) -> None:
        """Flush pending spans, shut down providers, and close HTTP clients.

        Safe to call multiple times.
        """
        if self._shutdown_called:
            return
        self._shutdown_called = True
        try:
            self._tracer_provider.shutdown()
        except Exception:
            pass
        try:
            self._meter_provider.shutdown()
        except Exception:
            pass
        if self._client is not None:
            self._client.close()
            self._client = None

    async def ashutdown(self) -> None:
        """Async variant — also closes the async HTTP client."""
        self.shutdown()
        if self._async_client is not None:
            await self._async_client.aclose()
            self._async_client = None

    def flush(self) -> None:
        """Force-flush pending spans without shutting down."""
        try:
            self._tracer_provider.force_flush()
        except Exception:
            pass

    def __getattr__(self, name: str) -> Any:
        if name.startswith("_"):
            raise AttributeError(name)
        return getattr(self._settings, name)

    def __repr__(self) -> str:
        return (
            f"{self.__class__.__name__}("
            f"service_name={self._service_name!r}, "
            f"include_content={self._include_content}, "
            f"sample_rate={self._sample_rate})"
        )


class DefaultTracingProvider(TracingProvider):
    """Default OTLP-based tracing provider.

    Reads configuration from ``UPSONIC_OTEL_*`` environment variables when
    arguments are not supplied explicitly.  Tries gRPC exporter first, falls
    back to HTTP, then to console.

    Args:
        endpoint: OTLP collector endpoint.
            Falls back to ``UPSONIC_OTEL_ENDPOINT`` (default ``http://localhost:4317``).
        headers: Extra headers for the exporter.
            Falls back to ``UPSONIC_OTEL_HEADERS`` (comma-separated ``key=value``).
        service_name: Overrides ``UPSONIC_OTEL_SERVICE_NAME`` (default ``"upsonic"``).
        sample_rate: Overrides ``UPSONIC_OTEL_SAMPLE_RATE`` (default ``1.0``).
        include_content: Include prompt/response content in traces.
        use_aggregated_usage_attribute_names: Use ``gen_ai.aggregated_usage.*`` prefix.
        flush_on_exit: Register ``atexit`` handler.

    Example::

        from upsonic import Agent, DefaultTracingProvider

        provider = DefaultTracingProvider(endpoint="http://jaeger:4317")
        agent = Agent("openai/gpt-4o", instrument=provider)
    """

    def __init__(
        self,
        *,
        endpoint: Optional[str] = None,
        headers: Optional[Dict[str, str]] = None,
        service_name: Optional[str] = None,
        sample_rate: Optional[float] = None,
        include_content: bool = True,
        use_aggregated_usage_attribute_names: bool = False,
        flush_on_exit: bool = True,
    ) -> None:
        self._endpoint: str = endpoint or os.getenv(
            "UPSONIC_OTEL_ENDPOINT", "http://localhost:4317"
        )

        if headers is not None:
            self._headers: Dict[str, str] = headers
        else:
            raw: str = os.getenv("UPSONIC_OTEL_HEADERS", "")
            self._headers = self._parse_headers(raw) if raw else {}

        resolved_service: str = service_name or os.getenv(
            "UPSONIC_OTEL_SERVICE_NAME", "upsonic"
        )

        if sample_rate is not None:
            resolved_rate: float = sample_rate
        else:
            rate_str: str = os.getenv("UPSONIC_OTEL_SAMPLE_RATE", "1.0")
            try:
                resolved_rate = float(rate_str)
            except (ValueError, TypeError):
                resolved_rate = 1.0

        super().__init__(
            service_name=resolved_service,
            sample_rate=resolved_rate,
            include_content=include_content,
            use_aggregated_usage_attribute_names=use_aggregated_usage_attribute_names,
            flush_on_exit=flush_on_exit,
        )

    def _create_exporter(self) -> "_SpanExporter":
        """Try gRPC -> HTTP -> Console exporter, in order of preference.

        When falling back from gRPC to HTTP, the default gRPC port (4317)
        is swapped to the standard HTTP OTLP port (4318) automatically.
        """
        exporter_kwargs: Dict[str, Any] = {"endpoint": self._endpoint}
        if self._headers:
            exporter_kwargs["headers"] = self._headers

        try:
            from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import (
                OTLPSpanExporter,
            )
            if "insecure" not in exporter_kwargs:
                exporter_kwargs["insecure"] = not self._endpoint.startswith("https")
            return OTLPSpanExporter(**exporter_kwargs)
        except ImportError:
            pass

        try:
            from opentelemetry.exporter.otlp.proto.http.trace_exporter import (
                OTLPSpanExporter as OTLPHttpExporter,
            )
            http_kwargs = {k: v for k, v in exporter_kwargs.items() if k != "insecure"}
            http_endpoint: str = http_kwargs.get("endpoint", "")
            if http_endpoint.endswith(":4317"):
                http_kwargs["endpoint"] = http_endpoint.replace(":4317", ":4318")
            return OTLPHttpExporter(**http_kwargs)
        except ImportError:
            pass

        from opentelemetry.sdk.trace.export import ConsoleSpanExporter
        return ConsoleSpanExporter()

    @staticmethod
    def _parse_headers(raw: str) -> Dict[str, str]:
        """Parse ``key=value,key2=value2`` into a dict."""
        headers: Dict[str, str] = {}
        for pair in raw.split(","):
            pair = pair.strip()
            if "=" not in pair:
                continue
            key, _, value = pair.partition("=")
            key = key.strip()
            value = value.strip()
            if key:
                headers[key] = value
        return headers

    def __repr__(self) -> str:
        return (
            f"DefaultTracingProvider("
            f"endpoint={self._endpoint!r}, "
            f"service_name={self._service_name!r}, "
            f"include_content={self._include_content}, "
            f"sample_rate={self._sample_rate})"
        )
