"""
RalphLoop configuration.

This module contains the RalphConfig dataclass that holds all configuration
options for RalphLoop execution.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable, Dict, List, Literal, Optional, Union


@dataclass
class RalphConfig:
    """
    Configuration for RalphLoop execution.
    
    Attributes:
        goal: High-level project goal describing what to build
        model: LLM model identifier (e.g., "openai/gpt-4o")
        workspace: Path where code will be created/modified
        test_command: Command to run tests (e.g., "pytest")
        build_command: Command to build project (e.g., "pip install -e .")
        lint_command: Command to run linter (e.g., "ruff check .")
        specs: Pre-defined specifications (skip requirements phase if provided)
        max_iterations: Safety limit for number of iterations
        max_subagents: Maximum parallel subagents for non-bottleneck operations
        debug: Enable debug logging
        on_iteration: Callback called after each iteration
        on_error: Callback called on errors
        show_progress: Whether to display progress in console
    """
    
    goal: str
    model: str = "openai/gpt-4o"
    workspace: Optional[Union[str, Path]] = None
    test_command: Optional[str] = None
    build_command: Optional[str] = None
    lint_command: Optional[str] = None
    specs: Optional[Dict[str, str]] = None
    max_iterations: Optional[int] = None
    max_subagents: int = 50
    debug: bool = False
    on_iteration: Optional[Callable[[Any], None]] = None
    on_error: Optional[Callable[[Exception], None]] = None
    show_progress: bool = True
    
    def __post_init__(self) -> None:
        """Validate and normalize configuration."""
        if not self.goal:
            raise ValueError("goal is required and cannot be empty")
        
        if self.workspace is None:
            self.workspace = Path.cwd() / "ralph_project"
        elif isinstance(self.workspace, str):
            self.workspace = Path(self.workspace)
        
        if self.max_iterations is not None and self.max_iterations < 1:
            raise ValueError("max_iterations must be at least 1")
        
        if self.max_subagents < 1:
            raise ValueError("max_subagents must be at least 1")
    
    @property
    def workspace_path(self) -> Path:
        """Get workspace as Path object."""
        if isinstance(self.workspace, str):
            return Path(self.workspace)
        return self.workspace
    
    @property
    def specs_dir(self) -> Path:
        """Get specs directory path."""
        return self.workspace_path / "specs"
    
    @property
    def src_dir(self) -> Path:
        """Get source directory path."""
        return self.workspace_path / "src"
    
    @property
    def prompt_file(self) -> Path:
        """Get PROMPT.md file path."""
        return self.workspace_path / "PROMPT.md"
    
    @property
    def fix_plan_file(self) -> Path:
        """Get fix_plan.md file path."""
        return self.workspace_path / "fix_plan.md"
    
    @property
    def learnings_file(self) -> Path:
        """Get AGENT.md file path."""
        return self.workspace_path / "AGENT.md"
    
    def has_backpressure(self) -> bool:
        """Check if any backpressure commands are configured."""
        return bool(self.test_command or self.build_command or self.lint_command)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert config to dictionary."""
        return {
            "goal": self.goal,
            "model": self.model,
            "workspace": str(self.workspace_path),
            "test_command": self.test_command,
            "build_command": self.build_command,
            "lint_command": self.lint_command,
            "max_iterations": self.max_iterations,
            "max_subagents": self.max_subagents,
            "debug": self.debug,
            "show_progress": self.show_progress,
            "has_specs": self.specs is not None,
        }
