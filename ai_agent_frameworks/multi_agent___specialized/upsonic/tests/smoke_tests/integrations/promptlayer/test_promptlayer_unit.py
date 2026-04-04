"""
Unit tests for the PromptLayer integration class.

Tests every public method of PromptLayer (sync and async variants),
initialization from explicit args and env vars, prompt metadata tracking,
and the unified log/alog method.

Requires:
    - PROMPTLAYER_API_KEY env var (or pass via --promptlayer-key)

Run with: uv run pytest tests/smoke_tests/integrations/promptlayer/test_promptlayer_unit.py -v -s
"""

from __future__ import annotations

import os
import time
from typing import Any, Dict, List, TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.integrations.promptlayer import PromptLayer

import pytest

PROMPTLAYER_API_KEY: str = os.getenv("PROMPTLAYER_API_KEY", "")
HAS_PL_KEY: bool = bool(PROMPTLAYER_API_KEY)

pytestmark = pytest.mark.skipif(
    not HAS_PL_KEY,
    reason="PROMPTLAYER_API_KEY not set",
)


@pytest.fixture()
def pl():
    """Create a PromptLayer instance from env var and tear down after test."""
    from upsonic.integrations.promptlayer import PromptLayer

    instance = PromptLayer()
    yield instance
    instance.shutdown()


@pytest.fixture()
def pl_async():
    """Create a PromptLayer instance for async tests."""
    from upsonic.integrations.promptlayer import PromptLayer

    instance = PromptLayer()
    yield instance


class TestPromptLayerInit:
    def test_init_from_env_var(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        instance = PromptLayer()
        assert instance._api_key == PROMPTLAYER_API_KEY
        assert instance._base_url == "https://api.promptlayer.com"
        instance.shutdown()

    def test_init_with_explicit_key(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        instance = PromptLayer(api_key=PROMPTLAYER_API_KEY)
        assert instance._api_key == PROMPTLAYER_API_KEY
        instance.shutdown()

    def test_init_missing_key_raises(self, monkeypatch: pytest.MonkeyPatch) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        monkeypatch.delenv("PROMPTLAYER_API_KEY", raising=False)
        with pytest.raises(ValueError, match="api_key is required"):
            PromptLayer(api_key="")

    def test_init_no_env_no_arg_raises(self, monkeypatch: pytest.MonkeyPatch) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        monkeypatch.delenv("PROMPTLAYER_API_KEY", raising=False)
        with pytest.raises(ValueError, match="api_key is required"):
            PromptLayer()

    def test_init_custom_base_url(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        instance = PromptLayer(base_url="https://custom.example.com/")
        assert instance._base_url == "https://custom.example.com"
        instance.shutdown()

    def test_init_base_url_from_env(self, monkeypatch: pytest.MonkeyPatch) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        monkeypatch.setenv("PROMPTLAYER_BASE_URL", "https://env-custom.example.com/")
        instance = PromptLayer()
        assert instance._base_url == "https://env-custom.example.com"
        instance.shutdown()

    def test_init_defaults(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        instance = PromptLayer()
        assert instance._client is None
        assert instance._async_client is None
        assert instance._last_prompt_id is None
        assert instance._last_prompt_version is None
        instance.shutdown()

    def test_repr(self, pl: "PromptLayer") -> None:
        r: str = repr(pl)
        assert "PromptLayer(" in r
        assert "base_url=" in r

    def test_double_shutdown_safe(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        instance = PromptLayer()
        instance.shutdown()
        instance.shutdown()

    @pytest.mark.asyncio
    async def test_async_shutdown_safe(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        instance = PromptLayer()
        await instance.ashutdown()
        await instance.ashutdown()


class TestHTTPClients:
    def test_sync_client_lazy_creation(self, pl: "PromptLayer") -> None:
        assert pl._client is None
        client = pl._get_client()
        assert client is not None
        assert pl._client is client

    def test_sync_client_reused(self, pl: "PromptLayer") -> None:
        c1 = pl._get_client()
        c2 = pl._get_client()
        assert c1 is c2

    @pytest.mark.asyncio
    async def test_async_client_lazy_creation(self, pl_async: "PromptLayer") -> None:
        assert pl_async._async_client is None
        client = pl_async._get_async_client()
        assert client is not None
        assert pl_async._async_client is client
        await pl_async.ashutdown()

    @pytest.mark.asyncio
    async def test_async_client_reused(self, pl_async: "PromptLayer") -> None:
        c1 = pl_async._get_async_client()
        c2 = pl_async._get_async_client()
        assert c1 is c2
        await pl_async.ashutdown()


class TestLog:
    def test_log_returns_request_id(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="custom",
            model="test_model",
            input_text="Hello",
            output_text="World",
        )
        assert isinstance(request_id, int)
        assert request_id > 0

    def test_log_with_tags(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="custom",
            model="test_model",
            input_text="Test input",
            output_text="Test output",
            tags=["test-tag", "unit-test"],
        )
        assert request_id > 0

    def test_log_with_metadata(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="custom",
            model="test_model",
            input_text="Meta input",
            output_text="Meta output",
            metadata={"env": "test", "version": "1.0"},
        )
        assert request_id > 0

    def test_log_with_timestamps(self, pl: "PromptLayer") -> None:
        start: float = time.time() - 1.0
        end: float = time.time()
        request_id: int = pl.log(
            provider="custom",
            model="test_model",
            input_text="Timed input",
            output_text="Timed output",
            start_time=start,
            end_time=end,
        )
        assert request_id > 0

    def test_log_with_all_params(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="openai",
            model="gpt-4o",
            input_text="Full params input",
            output_text="Full params output",
            tags=["combined-test"],
            metadata={"env": "ci", "version": "2", "active": "true"},
            start_time=time.time() - 1.0,
            end_time=time.time(),
            input_tokens=50,
            output_tokens=30,
            price=0.001,
            parameters={"temperature": 0.7, "max_tokens": 1000},
            score=85,
            status="SUCCESS",
            function_name="openai/gpt-4o",
        )
        assert request_id > 0

    def test_log_with_scores_dict(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="custom",
            model="test_model",
            input_text="Scores input",
            output_text="Scores output",
            score=90,
            scores={"accuracy": 95, "relevance": 85},
        )
        assert request_id > 0

    def test_log_with_parameters(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="anthropic",
            model="claude-sonnet-4-6",
            input_text="Params test",
            output_text="Params response",
            parameters={
                "temperature": 1.0,
                "max_tokens": 64000,
                "top_p": 0.9,
                "thinking": {"type": "enabled", "budget_tokens": 10000},
            },
        )
        assert request_id > 0


class TestALog:
    @pytest.mark.asyncio
    async def test_alog_returns_request_id(self, pl_async: "PromptLayer") -> None:
        request_id: int = await pl_async.alog(
            provider="custom",
            model="test_model_async",
            input_text="Async hello",
            output_text="Async world",
        )
        assert isinstance(request_id, int)
        assert request_id > 0
        await pl_async.ashutdown()

    @pytest.mark.asyncio
    async def test_alog_with_all_params(self, pl_async: "PromptLayer") -> None:
        request_id: int = await pl_async.alog(
            provider="anthropic",
            model="claude-sonnet-4-6",
            input_text="Full async input",
            output_text="Full async output",
            tags=["async-test"],
            metadata={"async_test": "true"},
            start_time=time.time() - 2.0,
            end_time=time.time(),
            input_tokens=20,
            output_tokens=15,
            price=0.0005,
            parameters={"temperature": 0.5},
            score=75,
        )
        assert request_id > 0
        await pl_async.ashutdown()


class TestScore:
    def test_score_request(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="custom",
            model="score_test",
            input_text="Score input",
            output_text="Score output",
        )
        success: bool = pl.score(request_id, score=8.5, name="quality")
        assert isinstance(success, bool)

    def test_score_with_default_name(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="custom",
            model="score_default",
            input_text="in",
            output_text="out",
        )
        success: bool = pl.score(request_id, score=7)
        assert isinstance(success, bool)

    @pytest.mark.asyncio
    async def test_ascore_request(self, pl_async: "PromptLayer") -> None:
        request_id: int = await pl_async.alog(
            provider="custom",
            model="async_score_test",
            input_text="Async score in",
            output_text="Async score out",
        )
        success: bool = await pl_async.ascore(request_id, score=9, name="accuracy")
        assert isinstance(success, bool)
        await pl_async.ashutdown()


class TestMetadata:
    def test_add_metadata(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="custom",
            model="meta_test",
            input_text="Meta in",
            output_text="Meta out",
        )
        success: bool = pl.add_metadata(request_id, {"test_domain": "unit_testing", "test_priority": "high"})
        assert isinstance(success, bool)

    @pytest.mark.asyncio
    async def test_aadd_metadata(self, pl_async: "PromptLayer") -> None:
        request_id: int = await pl_async.alog(
            provider="custom",
            model="async_meta_test",
            input_text="Async meta in",
            output_text="Async meta out",
        )
        success: bool = await pl_async.aadd_metadata(request_id, {"test_async_domain": "unit_testing"})
        assert isinstance(success, bool)
        await pl_async.ashutdown()


class TestExtractPromptText:
    def test_extract_template_string(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        result: Dict[str, Any] = {
            "prompt_template": {"template": "You are a helpful assistant."}
        }
        text: str = PromptLayer._extract_prompt_text(result)
        assert text == "You are a helpful assistant."

    def test_extract_messages_simple(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        result: Dict[str, Any] = {
            "prompt_template": {
                "messages": [
                    {"role": "system", "content": "You are helpful."},
                    {"role": "user", "content": "Hello!"},
                ]
            }
        }
        text: str = PromptLayer._extract_prompt_text(result)
        assert "You are helpful." in text
        assert "Hello!" in text

    def test_extract_messages_structured_content(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        result: Dict[str, Any] = {
            "prompt_template": {
                "messages": [
                    {
                        "role": "system",
                        "content": [
                            {"type": "text", "text": "First part."},
                            {"type": "text", "text": "Second part."},
                        ],
                    }
                ]
            }
        }
        text: str = PromptLayer._extract_prompt_text(result)
        assert "First part." in text
        assert "Second part." in text

    def test_extract_empty_template(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        result: Dict[str, Any] = {"prompt_template": {}}
        text: str = PromptLayer._extract_prompt_text(result)
        assert isinstance(text, str)

    def test_extract_no_prompt_template(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        result: Dict[str, Any] = {}
        text: str = PromptLayer._extract_prompt_text(result)
        assert isinstance(text, str)


class TestPromptMetadataTracking:
    def test_initial_state_is_none(self, pl: "PromptLayer") -> None:
        assert pl._last_prompt_id is None
        assert pl._last_prompt_version is None


class TestParseProviderModel:
    def test_standard_format(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        provider, model = PromptLayer._parse_provider_model("openai/gpt-4o")
        assert provider == "openai"
        assert model == "gpt-4o"

    def test_with_prefix(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        provider, model = PromptLayer._parse_provider_model("accuracy_eval:anthropic/claude-sonnet-4-6")
        assert provider == "anthropic"
        assert model == "claude-sonnet-4-6"

    def test_plain_name(self) -> None:
        from upsonic.integrations.promptlayer import PromptLayer

        provider, model = PromptLayer._parse_provider_model("reliability_eval")
        assert provider == "custom"
        assert model == "reliability_eval"


class TestFullRoundTrip:
    def test_log_then_score_then_metadata(self, pl: "PromptLayer") -> None:
        request_id: int = pl.log(
            provider="custom",
            model="roundtrip_model",
            input_text="Roundtrip input",
            output_text="Roundtrip output",
            tags=["roundtrip"],
        )
        assert request_id > 0

        score_ok: bool = pl.score(request_id, score=9, name="quality")
        assert isinstance(score_ok, bool)

        meta_ok: bool = pl.add_metadata(request_id, {"test_reviewed": "true"})
        assert isinstance(meta_ok, bool)

    @pytest.mark.asyncio
    async def test_async_log_then_score_then_metadata(self, pl_async: "PromptLayer") -> None:
        request_id: int = await pl_async.alog(
            provider="custom",
            model="async_roundtrip",
            input_text="Async RT in",
            output_text="Async RT out",
        )
        assert request_id > 0

        await pl_async.ascore(request_id, score=10, name="perfection")
        await pl_async.aadd_metadata(request_id, {"test_async_reviewed": "true"})
        await pl_async.ashutdown()
