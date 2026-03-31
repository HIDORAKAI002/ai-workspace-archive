"""Async/sync bridging utilities used across the Upsonic framework."""

import asyncio
import concurrent.futures
from typing import Any, Awaitable, TypeVar

T = TypeVar('T')


def run_async(coro: Any) -> Any:
    """Run an async coroutine safely from a sync context.

    Handles the case where an event loop is already running (e.g. when the
    framework wraps a sync tool call) by executing the coroutine in a
    dedicated thread with its own event loop.

    Args:
        coro: An awaitable coroutine to execute.

    Returns:
        The result of the coroutine.
    """
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        return asyncio.run(coro)

    if loop.is_running():
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(asyncio.run, coro).result()
    else:
        return loop.run_until_complete(coro)


class AsyncExecutionMixin:
    """Mixin providing a method for calling async from sync context."""

    def _run_async_from_sync(self, awaitable: Awaitable[T]) -> T:
        """Execute an awaitable from a synchronous method.

        Args:
            awaitable: The coroutine or other awaitable object to run.

        Returns:
            The result of the awaitable.
        """
        return run_async(awaitable)