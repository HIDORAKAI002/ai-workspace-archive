"""Tests for hindsight_hermes.tools module."""

import asyncio
import json
import sys
from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from hindsight_hermes.config import DEFAULTS
from hindsight_hermes.errors import HindsightError
from hindsight_hermes.tools import (
    RECALL_SCHEMA,
    REFLECT_SCHEMA,
    RETAIN_SCHEMA,
    _resolve_bank_id,
    _resolve_client,
    get_tool_definitions,
    memory_instructions,
    register,
    register_tools,
)


# --- Fixtures ---


@pytest.fixture(autouse=True)
def _clean_env(monkeypatch):
    """Ensure no stale env vars leak between tests."""
    for key in ("HINDSIGHT_API_URL", "HINDSIGHT_API_KEY", "HINDSIGHT_API_TOKEN",
                "HINDSIGHT_BANK_ID", "HINDSIGHT_AUTO_RETAIN", "HINDSIGHT_RECALL_BUDGET"):
        monkeypatch.delenv(key, raising=False)


@pytest.fixture()
def mock_client():
    client = MagicMock()
    # Sync methods (used by memory_instructions and register_tools sync path)
    client.create_bank = MagicMock()
    client.retain = MagicMock()
    client.recall = MagicMock(
        return_value=SimpleNamespace(
            results=[
                SimpleNamespace(text="Memory 1"),
                SimpleNamespace(text="Memory 2"),
            ]
        )
    )
    client.reflect = MagicMock(return_value=SimpleNamespace(text="Synthesized answer"))
    # Async methods (used by tool handlers and hooks)
    client.acreate_bank = AsyncMock()
    client.aretain = AsyncMock()
    client.arecall = AsyncMock(
        return_value=SimpleNamespace(
            results=[
                SimpleNamespace(text="Memory 1"),
                SimpleNamespace(text="Memory 2"),
            ]
        )
    )
    client.areflect = AsyncMock(return_value=SimpleNamespace(text="Synthesized answer"))
    return client


@pytest.fixture()
def mock_registry():
    """Patch tools.registry.registry so register_tools() can import it."""
    mock_reg = MagicMock()
    mock_module = MagicMock()
    mock_module.registry = mock_reg
    with patch.dict(sys.modules, {"tools": MagicMock(), "tools.registry": mock_module}):
        yield mock_reg


# --- Schema tests ---


class TestSchemas:
    def test_retain_schema_has_content(self):
        assert RETAIN_SCHEMA["name"] == "hindsight_retain"
        assert "content" in RETAIN_SCHEMA["parameters"]["properties"]
        assert "content" in RETAIN_SCHEMA["parameters"]["required"]

    def test_recall_schema_has_query(self):
        assert RECALL_SCHEMA["name"] == "hindsight_recall"
        assert "query" in RECALL_SCHEMA["parameters"]["properties"]
        assert "query" in RECALL_SCHEMA["parameters"]["required"]

    def test_reflect_schema_has_query(self):
        assert REFLECT_SCHEMA["name"] == "hindsight_reflect"
        assert "query" in REFLECT_SCHEMA["parameters"]["properties"]

    def test_get_tool_definitions(self):
        defs = get_tool_definitions()
        assert len(defs) == 3
        names = {d["name"] for d in defs}
        assert names == {"hindsight_retain", "hindsight_recall", "hindsight_reflect"}


# --- Bank resolution tests ---


class TestResolveBankId:
    def test_bank_resolver_takes_priority(self):
        resolver = lambda args: "resolved-bank"
        assert _resolve_bank_id({}, "static-bank", resolver) == "resolved-bank"

    def test_static_bank_id(self):
        assert _resolve_bank_id({}, "static-bank", None) == "static-bank"

    def test_env_var_fallback(self, monkeypatch):
        monkeypatch.setenv("HINDSIGHT_BANK_ID", "env-bank")
        assert _resolve_bank_id({}, None, None) == "env-bank"

    def test_raises_when_no_bank(self, monkeypatch):
        monkeypatch.delenv("HINDSIGHT_BANK_ID", raising=False)
        with pytest.raises(HindsightError, match="No bank_id available"):
            _resolve_bank_id({}, None, None)


# --- Client resolution tests ---


class TestResolveClient:
    def test_returns_provided_client(self, mock_client):
        assert _resolve_client(mock_client, None, None) is mock_client

    def test_creates_client_from_args(self):
        with patch("hindsight_hermes.tools.Hindsight") as MockH:
            _resolve_client(None, "http://localhost:9999", "key")
            MockH.assert_called_once_with(base_url="http://localhost:9999", timeout=30.0, api_key="key")

    def test_raises_without_url(self):
        with pytest.raises(HindsightError, match="No Hindsight API URL"):
            _resolve_client(None, None, None)


# --- register_tools tests ---


class TestRegisterTools:
    def test_registers_three_tools(self, mock_client, mock_registry):
        register_tools(bank_id="b", client=mock_client)
        assert mock_registry.register.call_count == 3
        names = {call.kwargs["name"] for call in mock_registry.register.call_args_list}
        assert names == {"hindsight_retain", "hindsight_recall", "hindsight_reflect"}

    @pytest.mark.asyncio
    async def test_retain_handler_success(self, mock_client, mock_registry):
        register_tools(bank_id="b", client=mock_client)
        handler = mock_registry.register.call_args_list[0].kwargs["handler"]
        result = json.loads(await handler({"content": "hello"}))
        assert result["result"] == "Memory stored successfully."
        mock_client.aretain.assert_called_once_with(bank_id="b", content="hello")

    @pytest.mark.asyncio
    async def test_retain_handler_with_tags(self, mock_client, mock_registry):
        register_tools(bank_id="b", client=mock_client, tags=["tag1"])
        handler = mock_registry.register.call_args_list[0].kwargs["handler"]
        await handler({"content": "hello"})
        mock_client.aretain.assert_called_once_with(bank_id="b", content="hello", tags=["tag1"])

    @pytest.mark.asyncio
    async def test_recall_handler_success(self, mock_client, mock_registry):
        register_tools(bank_id="b", client=mock_client)
        handler = mock_registry.register.call_args_list[1].kwargs["handler"]
        result = json.loads(await handler({"query": "test"}))
        assert "Memory 1" in result["result"]
        assert "Memory 2" in result["result"]

    @pytest.mark.asyncio
    async def test_recall_handler_no_results(self, mock_client, mock_registry):
        mock_client.arecall.return_value = SimpleNamespace(results=[])
        register_tools(bank_id="b", client=mock_client)
        handler = mock_registry.register.call_args_list[1].kwargs["handler"]
        result = json.loads(await handler({"query": "test"}))
        assert result["result"] == "No relevant memories found."

    @pytest.mark.asyncio
    async def test_reflect_handler_success(self, mock_client, mock_registry):
        register_tools(bank_id="b", client=mock_client)
        handler = mock_registry.register.call_args_list[2].kwargs["handler"]
        result = json.loads(await handler({"query": "test"}))
        assert result["result"] == "Synthesized answer"

    @pytest.mark.asyncio
    async def test_handler_returns_error_on_exception(self, mock_client, mock_registry):
        mock_client.aretain.side_effect = RuntimeError("boom")
        register_tools(bank_id="b", client=mock_client)
        handler = mock_registry.register.call_args_list[0].kwargs["handler"]
        result = json.loads(await handler({"content": "hello"}))
        assert "error" in result
        assert "boom" in result["error"]

    @pytest.mark.asyncio
    async def test_ensure_bank_called(self, mock_client, mock_registry):
        register_tools(bank_id="b", client=mock_client)
        handler = mock_registry.register.call_args_list[0].kwargs["handler"]
        await handler({"content": "hello"})
        mock_client.acreate_bank.assert_called_once_with(bank_id="b", name="b")

    @pytest.mark.asyncio
    async def test_ensure_bank_idempotent(self, mock_client, mock_registry):
        register_tools(bank_id="b", client=mock_client)
        handler = mock_registry.register.call_args_list[0].kwargs["handler"]
        await handler({"content": "first"})
        await handler({"content": "second"})
        # acreate_bank should only be called once
        mock_client.acreate_bank.assert_called_once()


# --- register (plugin entry point) tests ---


class TestRegisterPlugin:
    def test_register_calls_ctx_register_tool(self, monkeypatch, mock_client):
        monkeypatch.setenv("HINDSIGHT_API_URL", "http://localhost:8888")
        monkeypatch.setenv("HINDSIGHT_BANK_ID", "test-bank")
        ctx = MagicMock()
        with patch("hindsight_hermes.tools._resolve_client", return_value=mock_client):
            register(ctx)
        assert ctx.register_tool.call_count == 3

    def test_register_skips_without_config(self):
        empty_cfg = dict(DEFAULTS)  # no apiUrl, no apiToken
        ctx = MagicMock()
        with patch("hindsight_hermes.tools.load_config", return_value=empty_cfg):
            register(ctx)
        ctx.register_tool.assert_not_called()

    def test_register_hooks(self, monkeypatch, mock_client):
        monkeypatch.setenv("HINDSIGHT_API_URL", "http://localhost:8888")
        monkeypatch.setenv("HINDSIGHT_BANK_ID", "test-bank")
        ctx = MagicMock()
        with patch("hindsight_hermes.tools._resolve_client", return_value=mock_client):
            register(ctx)
        hook_names = {call.args[0] for call in ctx.register_hook.call_args_list}
        assert hook_names == {"pre_llm_call", "post_llm_call"}


# --- lifecycle hook tests ---


class TestLifecycleHooks:
    """Tests for pre_llm_call and post_llm_call hook callbacks.

    Hooks are synchronous functions (hermes-agent 0.5.0 calls them via
    invoke_hook which is sync), so these tests call them directly without await.
    """

    def _get_hook(self, ctx_mock, hook_name: str):
        """Extract the registered hook callback by name from the mock ctx."""
        for call in ctx_mock.register_hook.call_args_list:
            if call.args[0] == hook_name:
                return call.args[1]
        raise AssertionError(f"Hook {hook_name!r} not registered")

    def _register_with_hooks(self, monkeypatch, mock_client, **env_overrides):
        monkeypatch.setenv("HINDSIGHT_API_URL", "http://localhost:8888")
        monkeypatch.setenv("HINDSIGHT_BANK_ID", "test-bank")
        for k, v in env_overrides.items():
            monkeypatch.setenv(k, v)
        ctx = MagicMock()
        with patch("hindsight_hermes.tools._resolve_client", return_value=mock_client):
            register(ctx)
        return ctx

    # -- pre_llm_call --

    def test_pre_llm_call_returns_context(self, monkeypatch, mock_client):
        ctx = self._register_with_hooks(monkeypatch, mock_client)
        hook = self._get_hook(ctx, "pre_llm_call")
        result = hook(
            session_id="s1",
            user_message="what color do I like?",
            conversation_history=[],
            is_first_turn=True,
            model="test",
        )
        assert result is not None
        assert "context" in result
        assert "Memory 1" in result["context"]
        assert "Memory 2" in result["context"]
        mock_client.recall.assert_called_once()

    def test_pre_llm_call_returns_none_on_no_results(self, monkeypatch, mock_client):
        mock_client.recall.return_value = SimpleNamespace(results=[])
        ctx = self._register_with_hooks(monkeypatch, mock_client)
        hook = self._get_hook(ctx, "pre_llm_call")
        result = hook(user_message="hello")
        assert result is None

    def test_pre_llm_call_returns_none_on_empty_message(self, monkeypatch, mock_client):
        ctx = self._register_with_hooks(monkeypatch, mock_client)
        hook = self._get_hook(ctx, "pre_llm_call")
        result = hook(user_message="")
        assert result is None
        mock_client.recall.assert_not_called()

    def test_pre_llm_call_returns_none_on_error(self, monkeypatch, mock_client):
        mock_client.recall.side_effect = RuntimeError("connection failed")
        ctx = self._register_with_hooks(monkeypatch, mock_client)
        hook = self._get_hook(ctx, "pre_llm_call")
        result = hook(user_message="hello")
        assert result is None

    # -- post_llm_call --

    def test_post_llm_call_retains_turn(self, monkeypatch, mock_client):
        ctx = self._register_with_hooks(monkeypatch, mock_client)
        hook = self._get_hook(ctx, "post_llm_call")
        hook(
            session_id="s1",
            user_message="remember I like green",
            assistant_response="Got it, you like green!",
            model="test",
        )
        mock_client.retain.assert_called_once()
        content = mock_client.retain.call_args.kwargs["content"]
        assert "remember I like green" in content
        assert "Got it, you like green!" in content

    def test_post_llm_call_skips_empty_messages(self, monkeypatch, mock_client):
        ctx = self._register_with_hooks(monkeypatch, mock_client)
        hook = self._get_hook(ctx, "post_llm_call")
        hook(user_message="", assistant_response="hello")
        mock_client.retain.assert_not_called()

    def test_post_llm_call_skips_when_disabled(self, monkeypatch, mock_client):
        ctx = self._register_with_hooks(
            monkeypatch, mock_client, HINDSIGHT_AUTO_RETAIN="false"
        )
        hook = self._get_hook(ctx, "post_llm_call")
        hook(user_message="hi", assistant_response="hello")
        mock_client.retain.assert_not_called()

    def test_post_llm_call_does_not_raise_on_error(self, monkeypatch, mock_client):
        mock_client.retain.side_effect = RuntimeError("boom")
        ctx = self._register_with_hooks(monkeypatch, mock_client)
        hook = self._get_hook(ctx, "post_llm_call")
        # Should not raise
        hook(user_message="hi", assistant_response="hello")


# --- memory_instructions tests ---


class TestMemoryInstructions:
    def test_returns_formatted_memories(self, mock_client):
        result = memory_instructions(bank_id="b", client=mock_client)
        assert "Relevant memories:" in result
        assert "1. Memory 1" in result
        assert "2. Memory 2" in result

    def test_returns_empty_on_no_results(self, mock_client):
        mock_client.recall.return_value = SimpleNamespace(results=[])
        result = memory_instructions(bank_id="b", client=mock_client)
        assert result == ""

    def test_returns_empty_on_exception(self, mock_client):
        mock_client.recall.side_effect = RuntimeError("fail")
        result = memory_instructions(bank_id="b", client=mock_client)
        assert result == ""

    def test_returns_empty_on_no_client(self):
        result = memory_instructions(bank_id="b")
        assert result == ""

    def test_respects_max_results(self, mock_client):
        result = memory_instructions(bank_id="b", client=mock_client, max_results=1)
        assert "1. Memory 1" in result
        assert "Memory 2" not in result

    def test_custom_prefix(self, mock_client):
        result = memory_instructions(bank_id="b", client=mock_client, prefix="Context:\n")
        assert result.startswith("Context:")


# --- Integration tests with real hermes-agent plugin system ---


class TestHermesPluginIntegration:
    """Tests that verify hooks work correctly when invoked through
    hermes-agent's real PluginManager.invoke_hook (sync dispatch)."""

    def _setup_plugin_manager(self, monkeypatch, mock_client):
        """Register our plugin via the real PluginContext and return the PluginManager."""
        from hermes_cli.plugins import PluginManager, PluginManifest, PluginContext

        monkeypatch.setenv("HINDSIGHT_API_URL", "http://localhost:8888")
        monkeypatch.setenv("HINDSIGHT_BANK_ID", "test-bank")

        manager = PluginManager()
        manifest = PluginManifest(name="hindsight", source="test")
        ctx = PluginContext(manifest, manager)

        with (
            patch("hindsight_hermes.tools._resolve_client", return_value=mock_client),
            patch.dict(sys.modules, {"tools": MagicMock(), "tools.registry": MagicMock()}),
        ):
            register(ctx)

        return manager

    def test_invoke_pre_llm_call_returns_context_dict(self, monkeypatch, mock_client):
        """invoke_hook('pre_llm_call') should return a list with a context dict."""
        manager = self._setup_plugin_manager(monkeypatch, mock_client)

        results = manager.invoke_hook(
            "pre_llm_call",
            session_id="s1",
            user_message="what is my favorite color?",
            conversation_history=[],
            is_first_turn=True,
            model="test",
        )

        assert len(results) == 1
        assert isinstance(results[0], dict)
        assert "context" in results[0]
        assert "Memory 1" in results[0]["context"]
        mock_client.recall.assert_called_once()

    def test_invoke_post_llm_call_retains(self, monkeypatch, mock_client):
        """invoke_hook('post_llm_call') should call retain synchronously."""
        manager = self._setup_plugin_manager(monkeypatch, mock_client)

        results = manager.invoke_hook(
            "post_llm_call",
            session_id="s1",
            user_message="remember I like blue",
            assistant_response="Noted, you like blue!",
            model="test",
        )

        # post_llm_call returns None, so results should be empty
        assert results == []
        mock_client.retain.assert_called_once()
        content = mock_client.retain.call_args.kwargs["content"]
        assert "remember I like blue" in content

    def test_invoke_pre_llm_call_no_results(self, monkeypatch, mock_client):
        """invoke_hook returns empty list when recall finds nothing."""
        mock_client.recall.return_value = SimpleNamespace(results=[])
        manager = self._setup_plugin_manager(monkeypatch, mock_client)

        results = manager.invoke_hook(
            "pre_llm_call",
            session_id="s1",
            user_message="hello",
            conversation_history=[],
            is_first_turn=True,
            model="test",
        )

        assert results == []

    def test_hooks_are_not_coroutines(self, monkeypatch, mock_client):
        """Hooks must be plain functions, not async — verify invoke_hook
        doesn't return coroutine objects."""
        manager = self._setup_plugin_manager(monkeypatch, mock_client)

        results = manager.invoke_hook(
            "pre_llm_call",
            session_id="s1",
            user_message="test",
            conversation_history=[],
            is_first_turn=True,
            model="test",
        )

        for r in results:
            assert not asyncio.iscoroutine(r), (
                "Hook returned a coroutine — hermes invoke_hook is sync and "
                "will not await it"
            )
