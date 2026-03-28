"""
Token tracking decorator for AugmentedLLM methods
"""

import functools
import inspect
from typing import Callable, Any


def track_tokens(
    node_type: str = "llm",
) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
    """
    Decorator to track token usage for AugmentedLLM methods.
    Automatically pushes/pops token context around method execution.

    Supports both regular async methods and async generators.

    Args:
        node_type: The type of node for token tracking. Default is "llm" for base AugmentedLLM classes.
                  Higher-order AugmentedLLM classes should use "agent".
    """

    def _should_skip_tracking(self) -> bool:
        """Check if we should skip tracking (no context or in Temporal replay)."""
        # Fast-path: only perform Temporal replay checks if engine is Temporal
        is_temporal_replay = False
        try:
            cfg = getattr(getattr(self, "context", None), "config", None)
            is_temporal_engine = getattr(cfg, "execution_engine", None) == "temporal"

            if is_temporal_engine:
                try:
                    from temporalio import workflow as _twf  # type: ignore

                    if _twf.in_workflow():
                        is_temporal_replay = _twf.unsafe.is_replaying()  # type: ignore[attr-defined]
                except Exception:
                    pass
        except Exception:
            pass

        # Skip tracking if no token counter or in replay
        return not (
            hasattr(self, "context")
            and self.context
            and self.context.token_counter
            and not is_temporal_replay
        )

    def _build_metadata(self, method: Callable) -> dict:
        """Build metadata dictionary for token tracking."""
        metadata = {
            "method": method.__name__,
            "class": self.__class__.__name__,
        }
        if hasattr(self, "provider"):
            metadata["provider"] = getattr(self, "provider")
        return metadata

    def decorator(method: Callable[..., Any]) -> Callable[..., Any]:
        # Check if method is an async generator and create appropriate wrapper
        if inspect.isasyncgenfunction(method):

            @functools.wraps(method)
            async def async_gen_wrapper(self, *args, **kwargs):
                # Check if we should skip tracking
                if _should_skip_tracking(self):
                    # No tracking - just execute the method
                    async for item in method(self, *args, **kwargs):
                        yield item
                else:
                    # Track tokens during execution
                    metadata = _build_metadata(self, method)
                    async with self.context.token_counter.scope(
                        name=getattr(self, "name", self.__class__.__name__),
                        node_type=node_type,
                        metadata=metadata,
                    ):
                        async for item in method(self, *args, **kwargs):
                            yield item

            return async_gen_wrapper
        else:

            @functools.wraps(method)
            async def async_wrapper(self, *args, **kwargs) -> Any:
                # Check if we should skip tracking
                if _should_skip_tracking(self):
                    # No tracking - just execute the method
                    return await method(self, *args, **kwargs)
                else:
                    # Track tokens during execution
                    metadata = _build_metadata(self, method)
                    async with self.context.token_counter.scope(
                        name=getattr(self, "name", self.__class__.__name__),
                        node_type=node_type,
                        metadata=metadata,
                    ):
                        return await method(self, *args, **kwargs)

            return async_wrapper

    return decorator
