"""Unit tests for ToolProcessor."""

import inspect
import pytest
from unittest.mock import Mock, AsyncMock, patch
from typing import Dict, Any, List

from upsonic.tools.processor import (
    ToolProcessor,
    ToolValidationError,
    ExternalExecutionPause,
)
from upsonic.tools.base import Tool, ToolKit, ToolResult
from upsonic.tools.metrics import ToolMetrics
from upsonic.tools.config import ToolConfig, tool


# ============================================================
# Fixtures
# ============================================================


class SimpleToolKit(ToolKit):
    """ToolKit with two @tool methods and one async counterpart."""

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)

    @tool
    def greet(self, name: str) -> str:
        """Greet a person by name."""
        return f"Hello {name}"

    async def agreet(self, name: str) -> str:
        """Async greet a person by name."""
        return f"Hello {name}"

    @tool
    def farewell(self, name: str) -> str:
        """Say goodbye to a person by name."""
        return f"Bye {name}"

    def _internal_helper(self) -> None:
        """Private helper -- must NOT be registered as a tool."""
        pass


class DecoratedToolKit(ToolKit):
    """ToolKit where one method has explicit decorator config."""

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)

    @tool(requires_confirmation=True, timeout=999.0)
    def dangerous(self, x: int) -> int:
        """A dangerous action that needs confirmation."""
        return x * 2

    @tool
    def safe(self, y: str) -> str:
        """A safe action with bare @tool."""
        return y.upper()


# ============================================================
# TestToolProcessor -- core functionality
# ============================================================


class TestToolProcessor:
    """Test suite for ToolProcessor."""

    @pytest.fixture
    def processor(self) -> ToolProcessor:
        return ToolProcessor()

    @pytest.fixture
    def mock_tool(self) -> Mock:
        t = Mock(spec=Tool)
        t.name = "test_tool"
        t.description = "A test tool"
        t.schema = Mock()
        t.execute = AsyncMock(return_value="result")
        return t

    @pytest.fixture
    def mock_context(self) -> ToolMetrics:
        return ToolMetrics()

    # ----------------------------------------------------------
    # Initialization
    # ----------------------------------------------------------

    def test_initialization(self, processor: ToolProcessor) -> None:
        assert processor.registered_tools == {}
        assert processor.mcp_handlers == []

    # ----------------------------------------------------------
    # Process function tools
    # ----------------------------------------------------------

    def test_process_tool_calls(self, processor: ToolProcessor, mock_tool: Mock) -> None:
        def test_function(query: str) -> str:
            """Test function."""
            return f"Result: {query}"

        with patch.object(processor, "_process_function_tool", return_value=mock_tool):
            processed: Dict[str, Tool] = processor.process_tools([test_function])
            assert "test_tool" in processed
            assert processed["test_tool"] == mock_tool

    def test_validate_tool_calls(self, processor: ToolProcessor) -> None:
        def valid_function(query: str) -> str:
            """Valid function with type hints and docstring."""
            return f"Result: {query}"

        def invalid_function(query):
            """Invalid function without type hints."""
            return f"Result: {query}"

        t = processor._process_function_tool(valid_function)
        assert t is not None

        with pytest.raises(ToolValidationError):
            processor._process_function_tool(invalid_function)

    @pytest.mark.asyncio
    async def test_execute_tool_calls(
        self, processor: ToolProcessor, mock_tool: Mock, mock_context: ToolMetrics
    ) -> None:
        processor.registered_tools["test_tool"] = mock_tool

        with patch.object(processor, "create_behavioral_wrapper") as mock_wrapper:
            mock_wrapped = AsyncMock(return_value="executed_result")
            mock_wrapper.return_value = mock_wrapped

            wrapper = processor.create_behavioral_wrapper(mock_tool, mock_context)
            result = await wrapper(query="test")

            assert result is not None
            mock_wrapped.assert_called_once()

    def test_process_function_tool(self, processor: ToolProcessor) -> None:
        def test_function(query: str) -> str:
            """Test function.

            Args:
                query: The query string.

            Returns:
                The result string.
            """
            return f"Result: {query}"

        t = processor._process_function_tool(test_function)
        assert t is not None
        assert t.name == "test_function"

    # ----------------------------------------------------------
    # Builtin tools
    # ----------------------------------------------------------

    def test_is_builtin_tool(self, processor: ToolProcessor) -> None:
        from upsonic.tools.builtin_tools import WebSearchTool

        builtin = WebSearchTool()
        assert processor._is_builtin_tool(builtin) is True
        assert processor._is_builtin_tool(Mock()) is False

    def test_extract_builtin_tools(self, processor: ToolProcessor) -> None:
        from upsonic.tools.builtin_tools import WebSearchTool

        builtin = WebSearchTool()
        regular = Mock()
        builtin_tools = processor.extract_builtin_tools([builtin, regular, None])

        assert len(builtin_tools) == 1
        assert builtin_tools[0] == builtin


# ============================================================
# TestToolkitProcessing -- toolkit discovery & registration
# ============================================================


class TestToolkitProcessing:
    """Tests for _process_toolkit: discovery, filtering, config, async swap."""

    @pytest.fixture
    def processor(self) -> ToolProcessor:
        return ToolProcessor()

    # ----------------------------------------------------------
    # Basic discovery
    # ----------------------------------------------------------

    def test_discovers_tool_methods(self, processor: ToolProcessor) -> None:
        """Only @tool-decorated methods are discovered."""
        tk = SimpleToolKit()
        tools = processor._process_toolkit(tk)

        assert "greet" in tools
        assert "farewell" in tools
        assert "_internal_helper" not in tools
        assert "agreet" not in tools  # async counterpart without @tool

    def test_empty_toolkit(self, processor: ToolProcessor) -> None:
        """ToolKit with no @tool methods produces empty dict."""

        class EmptyToolKit(ToolKit):
            def __init__(self, **kw: Any) -> None:
                super().__init__(**kw)

            def helper(self) -> None:
                """Not a tool."""
                pass

        tk = EmptyToolKit()
        tools = processor._process_toolkit(tk)
        assert tools == {}
        assert tk.tools == []

    # ----------------------------------------------------------
    # toolkit.tools / toolkit.functions populated
    # ----------------------------------------------------------

    def test_toolkit_tools_populated_after_processing(self, processor: ToolProcessor) -> None:
        """After _process_toolkit, toolkit.tools should contain wrapped callables."""
        tk = SimpleToolKit()
        assert tk.tools == []

        processor._process_toolkit(tk)

        assert len(tk.tools) == 2
        names = sorted([m.__name__ for m in tk.tools])
        assert names == ["farewell", "greet"]

    def test_toolkit_functions_property(self, processor: ToolProcessor) -> None:
        """toolkit.functions should return the same list as toolkit.tools."""
        tk = SimpleToolKit()
        processor._process_toolkit(tk)

        assert tk.functions is tk.tools
        assert len(tk.functions) == 2

    # ----------------------------------------------------------
    # include_tools / exclude_tools
    # ----------------------------------------------------------

    def test_include_tools_is_additive(self, processor: ToolProcessor) -> None:
        """include_tools adds methods on top of @tool-decorated ones."""
        tk = SimpleToolKit(include_tools=["agreet"])
        tools = processor._process_toolkit(tk)

        assert "greet" in tools
        assert "farewell" in tools
        assert "agreet" in tools
        assert len(tk.functions) == 3

    def test_exclude_tools_filter(self, processor: ToolProcessor) -> None:
        tk = SimpleToolKit(exclude_tools=["farewell"])
        tools = processor._process_toolkit(tk)

        assert "greet" in tools
        assert "farewell" not in tools
        assert len(tk.functions) == 1

    def test_include_and_exclude_combined(self, processor: ToolProcessor) -> None:
        """exclude_tools is supreme and removes even include_tools entries."""
        tk = SimpleToolKit(include_tools=["agreet"], exclude_tools=["farewell"])
        tools = processor._process_toolkit(tk)

        assert "greet" in tools
        assert "agreet" in tools
        assert "farewell" not in tools

    # ----------------------------------------------------------
    # Config priority: toolkit init > decorator
    # ----------------------------------------------------------

    def test_decorator_applies_when_no_toolkit_defaults(self, processor: ToolProcessor) -> None:
        """Without toolkit init params, decorator config is used as-is."""
        tk = DecoratedToolKit()
        processor._process_toolkit(tk)

        for m in tk.functions:
            cfg: ToolConfig = getattr(m, "_upsonic_tool_config")
            if m.__name__ == "dangerous":
                assert cfg.requires_confirmation is True
                assert cfg.timeout == 999.0
            elif m.__name__ == "safe":
                assert cfg.requires_confirmation is False

    def test_toolkit_init_overrides_decorator(self, processor: ToolProcessor) -> None:
        """Toolkit __init__ params override @tool decorator config."""
        tk = DecoratedToolKit(timeout=120.0, cache_results=True)
        processor._process_toolkit(tk)

        for m in tk.functions:
            cfg: ToolConfig = getattr(m, "_upsonic_tool_config")
            if m.__name__ == "safe":
                assert cfg.timeout == 120.0
                assert cfg.cache_results is True
            elif m.__name__ == "dangerous":
                assert cfg.timeout == 120.0
                assert cfg.cache_results is True
                assert cfg.requires_confirmation is True

    def test_toolkit_true_decorator_true_both_win(self, processor: ToolProcessor) -> None:
        """When both toolkit and decorator set the same bool True, result is True."""
        tk = DecoratedToolKit(requires_confirmation=True)
        processor._process_toolkit(tk)

        for m in tk.functions:
            cfg: ToolConfig = getattr(m, "_upsonic_tool_config")
            assert cfg.requires_confirmation is True

    # ----------------------------------------------------------
    # Deepcopy isolation between instances
    # ----------------------------------------------------------

    def test_deepcopy_isolation(self, processor: ToolProcessor) -> None:
        """Two ToolKit instances must not share configs."""
        tk_a = SimpleToolKit(timeout=10.0)
        tk_b = SimpleToolKit(timeout=99.0)

        processor._process_toolkit(tk_a)
        processor._process_toolkit(tk_b)

        cfg_a: ToolConfig = getattr(tk_a.functions[0], "_upsonic_tool_config")
        cfg_b: ToolConfig = getattr(tk_b.functions[0], "_upsonic_tool_config")

        assert cfg_a.timeout == 10.0
        assert cfg_b.timeout == 99.0

    # ----------------------------------------------------------
    # use_async mode
    # ----------------------------------------------------------

    def test_use_async_discovers_all_async_methods(self, processor: ToolProcessor) -> None:
        """use_async=True registers all async methods, drops sync ones."""
        tk = SimpleToolKit(use_async=True)
        tools = processor._process_toolkit(tk)

        assert "agreet" in tools
        assert inspect.iscoroutinefunction(tk.functions[0])
        assert "greet" not in tools
        assert "farewell" not in tools
        assert len(tk.functions) == 1

    def test_use_async_disabled_by_default(self, processor: ToolProcessor) -> None:
        """By default, only @tool-decorated sync methods are registered."""
        tk = SimpleToolKit()
        processor._process_toolkit(tk)

        for m in tk.functions:
            assert not inspect.iscoroutinefunction(m)

    def test_tool_decorator_on_async_method(self, processor: ToolProcessor) -> None:
        """@tool on an async method registers it as-is without use_async."""

        class AsyncDecKit(ToolKit):
            def __init__(self, **kw: Any) -> None:
                super().__init__(**kw)

            @tool
            async def aaction(self, x: int) -> int:
                """Async action."""
                return x

            @tool
            def other(self, y: str) -> str:
                """Another action."""
                return y

        tk = AsyncDecKit()
        tools = processor._process_toolkit(tk)

        assert "aaction" in tools
        assert "other" in tools
        for m in tk.functions:
            if m.__name__ == "aaction":
                assert inspect.iscoroutinefunction(m)
            elif m.__name__ == "other":
                assert not inspect.iscoroutinefunction(m)

    def test_use_async_with_include_tools_adds_sync(self, processor: ToolProcessor) -> None:
        """use_async=True + include_tools can force a sync method back in."""
        tk = SimpleToolKit(use_async=True, include_tools=["farewell"])
        tools = processor._process_toolkit(tk)

        assert "agreet" in tools
        assert "farewell" in tools
        assert "greet" not in tools

    def test_use_async_with_exclude_tools(self, processor: ToolProcessor) -> None:
        """use_async=True + exclude_tools removes async methods."""
        tk = SimpleToolKit(use_async=True, exclude_tools=["agreet"])
        tools = processor._process_toolkit(tk)

        assert "agreet" not in tools
        assert len(tk.functions) == 0

    # ----------------------------------------------------------
    # Callable wrappers
    # ----------------------------------------------------------

    def test_wrappers_are_callable(self, processor: ToolProcessor) -> None:
        """Processed tools must be callable and return correct results."""
        tk = SimpleToolKit()
        processor._process_toolkit(tk)

        for m in tk.functions:
            if m.__name__ == "greet":
                assert m("World") == "Hello World"
            elif m.__name__ == "farewell":
                assert m("World") == "Bye World"

    # ----------------------------------------------------------
    # _make_tool_wrapper
    # ----------------------------------------------------------

    def test_make_tool_wrapper_sync(self, processor: ToolProcessor) -> None:
        """_make_tool_wrapper creates sync wrapper with correct attributes."""

        def dummy(x: int) -> int:
            """Dummy."""
            return x * 2

        config = ToolConfig(timeout=42.0)
        wrapper = processor._make_tool_wrapper(dummy, "my_tool", config)

        assert wrapper.__name__ == "my_tool"
        assert getattr(wrapper, "_upsonic_is_tool") is True
        assert getattr(wrapper, "_upsonic_tool_config") is config
        assert not inspect.iscoroutinefunction(wrapper)
        assert wrapper(5) == 10

    @pytest.mark.asyncio
    async def test_make_tool_wrapper_async(self, processor: ToolProcessor) -> None:
        """_make_tool_wrapper creates async wrapper for coroutine functions."""

        async def dummy(x: int) -> int:
            """Dummy."""
            return x * 2

        config = ToolConfig()
        wrapper = processor._make_tool_wrapper(dummy, "async_tool", config)

        assert wrapper.__name__ == "async_tool"
        assert inspect.iscoroutinefunction(wrapper)
        assert await wrapper(5) == 10

    # ----------------------------------------------------------
    # _apply_toolkit_config_overrides
    # ----------------------------------------------------------

    def test_apply_overrides_toolkit_fills_defaults(self, processor: ToolProcessor) -> None:
        """Toolkit defaults should fill in bare decorator config fields."""
        tk = SimpleToolKit(timeout=60.0, cache_results=True)
        bare_config = ToolConfig()

        merged = processor._apply_toolkit_config_overrides(tk, bare_config)

        assert merged.timeout == 60.0
        assert merged.cache_results is True
        assert merged.requires_confirmation is False  # neither set

    def test_apply_overrides_toolkit_wins(self, processor: ToolProcessor) -> None:
        """Toolkit init params override decorator config where explicitly set."""
        tk = SimpleToolKit(timeout=60.0, requires_confirmation=True)
        decorator_config = ToolConfig(timeout=999.0)

        merged = processor._apply_toolkit_config_overrides(tk, decorator_config)

        assert merged.timeout == 60.0  # toolkit init wins
        assert merged.requires_confirmation is True  # toolkit fills in

    def test_apply_overrides_empty_toolkit(self, processor: ToolProcessor) -> None:
        """No toolkit defaults -> deepcopy of decorator config returned."""
        tk = SimpleToolKit()
        decorator_config = ToolConfig(timeout=42.0)

        merged = processor._apply_toolkit_config_overrides(tk, decorator_config)

        assert merged.timeout == 42.0
        assert merged is not decorator_config  # must be a copy

    # ----------------------------------------------------------
    # Case 5 & 6: no discovery without @tool or use_async
    # ----------------------------------------------------------

    def test_init_params_alone_do_not_create_tools(self, processor: ToolProcessor) -> None:
        """No @tool, no include_tools, no use_async -> nothing registered
        even when toolkit init params are set."""

        class NoToolKit(ToolKit):
            def __init__(self, **kw: Any) -> None:
                super().__init__(**kw)

            def action(self, x: int) -> int:
                """An action."""
                return x

        tk = NoToolKit(timeout=60.0, cache_results=True)
        tools = processor._process_toolkit(tk)

        assert tools == {}
        assert tk.tools == []

    def test_no_decorator_no_config_empty(self, processor: ToolProcessor) -> None:
        """No @tool, no config -> nothing registered."""

        class BareToolKit(ToolKit):
            def __init__(self, **kw: Any) -> None:
                super().__init__(**kw)

            def action(self, x: int) -> int:
                """An action."""
                return x

        tk = BareToolKit()
        tools = processor._process_toolkit(tk)

        assert tools == {}
        assert tk.tools == []

    # ----------------------------------------------------------
    # include_tools adds non-decorated methods
    # ----------------------------------------------------------

    def test_include_tools_adds_non_decorated_method(self, processor: ToolProcessor) -> None:
        """include_tools can add a method even without @tool."""

        class MixedToolKit(ToolKit):
            def __init__(self, **kw: Any) -> None:
                super().__init__(**kw)

            @tool
            def primary(self, x: int) -> int:
                """Primary tool."""
                return x

            def helper(self, y: str) -> str:
                """Helper without @tool."""
                return y.upper()

        tk = MixedToolKit(include_tools=["helper"])
        tools = processor._process_toolkit(tk)

        assert "primary" in tools
        assert "helper" in tools
        assert len(tk.functions) == 2

    # ----------------------------------------------------------
    # Toolkit tracking in processor
    # ----------------------------------------------------------

    def test_class_instance_tracking(self, processor: ToolProcessor) -> None:
        """Processed toolkit should be tracked in class_instance_to_tools."""
        tk = SimpleToolKit()
        processor._process_toolkit(tk)

        kit_id = id(tk)
        assert kit_id in processor.class_instance_to_tools
        tracked_names = processor.class_instance_to_tools[kit_id]
        assert "greet" in tracked_names
        assert "farewell" in tracked_names
