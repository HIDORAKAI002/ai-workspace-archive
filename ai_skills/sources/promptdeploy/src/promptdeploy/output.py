"""Structured output formatting for promptdeploy."""

from __future__ import annotations

import sys
import time
from enum import IntEnum
from typing import Optional


class Verbosity(IntEnum):
    QUIET = 0
    NORMAL = 1
    VERBOSE = 2


class Output:
    """Handles all user-facing output with verbosity control."""

    def __init__(self, verbosity: Verbosity = Verbosity.NORMAL) -> None:
        self.verbosity = verbosity
        self._start_time: Optional[float] = None

    def start_timer(self) -> None:
        self._start_time = time.monotonic()

    def elapsed(self) -> Optional[float]:
        if self._start_time is None:
            return None
        return time.monotonic() - self._start_time

    def action(
        self,
        symbol: str,
        item_type: str,
        name: str,
        target_id: str,
        prefix: str = "",
        diff: Optional[str] = None,
    ) -> None:
        """Print a deploy action line. Shows diff in verbose mode."""
        if self.verbosity == Verbosity.QUIET:
            return
        print(f"  {prefix}{symbol}  {item_type:8s} {name:30s} -> {target_id}")
        if diff and self.verbosity == Verbosity.VERBOSE:
            for line in diff.splitlines():
                print(f"    {line}")

    def warning(self, message: str) -> None:
        if self.verbosity == Verbosity.QUIET:
            return
        print(f"WARNING: {message}", file=sys.stderr)

    def error(self, message: str) -> None:
        print(f"ERROR: {message}", file=sys.stderr)

    def summary(
        self,
        created: int,
        updated: int,
        removed: int,
        skipped: int,
        prefix: str = "",
        pre_existing: int = 0,
    ) -> None:
        if self.verbosity == Verbosity.QUIET:
            return
        parts = (
            f"{prefix}{created} created, {updated} updated, "
            f"{removed} removed, {skipped} unchanged"
        )
        if pre_existing:
            parts += f", {pre_existing} pre-existing"
        elapsed = self.elapsed()
        if elapsed is not None and self.verbosity == Verbosity.VERBOSE:
            parts += f" ({elapsed:.2f}s)"
        print(f"\n{parts}")
