"""
RalphLoop - Main orchestrator for autonomous AI development.

This module implements the Ralph/Groundhog technique for autonomous,
eventually-consistent AI-driven software development.
"""

from __future__ import annotations

import signal
from datetime import datetime
from pathlib import Path
from typing import Any, Callable, Dict, Optional, Union

from upsonic.ralph.config import RalphConfig
from upsonic.ralph.state.manager import StateManager
from upsonic.ralph.backpressure.gate import BackpressureGate
from upsonic.ralph.phases.requirements import RequirementsPhase
from upsonic.ralph.phases.todo import TodoPhase
from upsonic.ralph.phases.incremental import IncrementalPhase, IterationResult
from upsonic.ralph.result import RalphLoopResult, IterationRecord


class RalphLoop:
    """
    Autonomous AI Development Loop.
    
    RalphLoop implements the "Ralph/Groundhog" technique for autonomous,
    eventually-consistent AI-driven software development. It orchestrates
    an infinite loop where fresh Agent instances execute one task per
    iteration, using subagents for expensive operations and backpressure
    gates (build/test) for validation.
    
    Example:
        ```python
        from upsonic import RalphLoop
        
        loop = RalphLoop(
            goal="Build a FastAPI TODO app",
            model="openai/gpt-4o",
            test_command="pytest",
        )
        result = loop.run()
        print(result.summary())
        ```
    
    The loop consists of three phases:
    1. Requirements Phase: Generate specifications from the goal
    2. TODO Phase: Create a prioritized list of tasks
    3. Incremental Phase: Execute one task per iteration until done
    """
    
    def __init__(
        self,
        goal: str,
        model: str = "openai/gpt-4o",
        workspace: Optional[Union[str, Path]] = None,
        test_command: Optional[str] = None,
        build_command: Optional[str] = None,
        lint_command: Optional[str] = None,
        specs: Optional[Dict[str, str]] = None,
        max_iterations: Optional[int] = None,
        max_subagents: int = 50,
        debug: bool = False,
        on_iteration: Optional[Callable[[IterationResult], None]] = None,
        on_error: Optional[Callable[[Exception], None]] = None,
        show_progress: bool = True,
    ):
        """
        Initialize RalphLoop.
        
        Args:
            goal: High-level project goal describing what to build
            model: LLM model identifier (e.g., "openai/gpt-4o")
            workspace: Path where code will be created/modified
            test_command: Command to run tests (e.g., "pytest")
            build_command: Command to build project
            lint_command: Command to run linter
            specs: Pre-defined specifications (skip requirements phase)
            max_iterations: Safety limit for number of iterations
            max_subagents: Maximum parallel subagents
            debug: Enable debug logging
            on_iteration: Callback after each iteration
            on_error: Callback on errors
            show_progress: Whether to display progress
        """
        self.config = RalphConfig(
            goal=goal,
            model=model,
            workspace=workspace,
            test_command=test_command,
            build_command=build_command,
            lint_command=lint_command,
            specs=specs,
            max_iterations=max_iterations,
            max_subagents=max_subagents,
            debug=debug,
            on_iteration=on_iteration,
            on_error=on_error,
            show_progress=show_progress,
        )
        
        self.state_manager = StateManager(self.config.workspace_path)
        
        self.backpressure_gate = BackpressureGate(
            workspace=self.config.workspace_path,
            build_command=build_command,
            test_command=test_command,
            lint_command=lint_command,
        )
        
        self.is_running = False
        self._should_stop = False
        self._result: Optional[RalphLoopResult] = None
    
    @property
    def goal(self) -> str:
        """Get the project goal."""
        return self.config.goal
    
    @property
    def model(self) -> str:
        """Get the model identifier."""
        return self.config.model
    
    @property
    def workspace(self) -> Path:
        """Get the workspace path."""
        return self.config.workspace_path
    
    def _print(self, message: str, level: str = "info") -> None:
        """Print message if progress display is enabled."""
        if self.config.show_progress:
            prefix = {
                "info": "  ",
                "success": "  ✓",
                "error": "  ✗",
                "phase": "▶",
                "iteration": "→",
            }.get(level, "  ")
            print(f"{prefix} {message}")
    
    def _print_header(self) -> None:
        """Print the RalphLoop header."""
        if not self.config.show_progress:
            return
        
        print()
        print("┌" + "─" * 60 + "┐")
        print("│  RalphLoop - Autonomous Development" + " " * 23 + "│")
        print("├" + "─" * 60 + "┤")
        print(f"│  Goal: {self.config.goal[:50]:<51}│")
        print(f"│  Model: {self.config.model:<50}│")
        if self.config.test_command:
            print(f"│  Backpressure: {self.config.test_command:<43}│")
        print("└" + "─" * 60 + "┘")
        print()
    
    def _run_requirements_phase(self) -> bool:
        """
        Run the requirements phase to generate specs.
        
        Returns:
            True if specs were generated successfully
        """
        if self.config.specs:
            self._print("Using pre-defined specifications", "info")
            for name, content in self.config.specs.items():
                self.state_manager.save_spec(name, content)
            
            prompt_content = RequirementsPhase.DEFAULT_PROMPT_TEMPLATE.format(
                goal=self.config.goal
            )
            self.state_manager.save_prompt(prompt_content)
            return True
        
        if self.state_manager.has_specs():
            self._print("Specifications already exist", "info")
            return True
        
        self._print("Phase 1: Generating specifications...", "phase")
        
        phase = RequirementsPhase(
            state_manager=self.state_manager,
            model=self.config.model,
            goal=self.config.goal,
        )
        
        result = phase.execute()
        
        if result.success:
            specs = result.data.get("specs", [])
            for spec in specs:
                self._print(f"Created specs/{spec}.md", "success")
            return True
        
        self._print(result.message, "error")
        return False
    
    async def _arun_requirements_phase(self) -> bool:
        """
        Run the requirements phase asynchronously.
        
        Returns:
            True if specs were generated successfully
        """
        if self.config.specs:
            self._print("Using pre-defined specifications", "info")
            for name, content in self.config.specs.items():
                self.state_manager.save_spec(name, content)
            
            prompt_content = RequirementsPhase.DEFAULT_PROMPT_TEMPLATE.format(
                goal=self.config.goal
            )
            self.state_manager.save_prompt(prompt_content)
            return True
        
        if self.state_manager.has_specs():
            self._print("Specifications already exist", "info")
            return True
        
        self._print("Phase 1: Generating specifications...", "phase")
        
        phase = RequirementsPhase(
            state_manager=self.state_manager,
            model=self.config.model,
            goal=self.config.goal,
        )
        
        result = await phase.aexecute()
        
        if result.success:
            specs = result.data.get("specs", [])
            for spec in specs:
                self._print(f"Created specs/{spec}.md", "success")
            return True
        
        self._print(result.message, "error")
        return False
    
    def _run_todo_phase(self) -> bool:
        """
        Run the TODO phase to generate fix_plan.md.
        
        Returns:
            True if TODO list was generated successfully
        """
        if self.state_manager.has_fix_plan():
            self._print("TODO list already exists", "info")
            return True
        
        self._print("Phase 2: Creating TODO list...", "phase")
        
        phase = TodoPhase(
            state_manager=self.state_manager,
            model=self.config.model,
            max_subagents=self.config.max_subagents,
        )
        
        result = phase.execute()
        
        if result.success:
            todo_count = result.data.get("todo_count", 0)
            self._print(f"Created fix_plan.md ({todo_count} items)", "success")
            return True
        
        self._print(result.message, "error")
        return False
    
    async def _arun_todo_phase(self) -> bool:
        """
        Run the TODO phase asynchronously.
        
        Returns:
            True if TODO list was generated successfully
        """
        if self.state_manager.has_fix_plan():
            self._print("TODO list already exists", "info")
            return True
        
        self._print("Phase 2: Creating TODO list...", "phase")
        
        phase = TodoPhase(
            state_manager=self.state_manager,
            model=self.config.model,
            max_subagents=self.config.max_subagents,
        )
        
        result = await phase.aexecute()
        
        if result.success:
            todo_count = result.data.get("todo_count", 0)
            self._print(f"Created fix_plan.md ({todo_count} items)", "success")
            return True
        
        self._print(result.message, "error")
        return False
    
    def _handle_signal(self, signum: int, frame: Any) -> None:
        """Handle interrupt signal."""
        self._print("Received interrupt signal, stopping after current iteration...", "info")
        self._should_stop = True
    
    def run(self, max_iterations: Optional[int] = None) -> RalphLoopResult:
        """
        Run the RalphLoop synchronously.
        
        Args:
            max_iterations: Override max_iterations from config
            
        Returns:
            RalphLoopResult with execution summary
        """
        max_iter = max_iterations or self.config.max_iterations
        
        self._result = RalphLoopResult(
            goal=self.config.goal,
            workspace=self.config.workspace_path,
            start_time=datetime.now(),
        )
        
        self.is_running = True
        self._should_stop = False
        
        original_handler = signal.signal(signal.SIGINT, self._handle_signal)
        
        try:
            self._print_header()
            
            if not self._run_requirements_phase():
                self._result.final_status = "error"
                self._result.error_message = "Failed to generate specifications"
                self._result.end_time = datetime.now()
                return self._result
            
            self._result.specs_generated = self.state_manager.get_spec_names()
            
            if not self._run_todo_phase():
                self._result.final_status = "error"
                self._result.error_message = "Failed to generate TODO list"
                self._result.end_time = datetime.now()
                return self._result
            
            if self.config.show_progress:
                print()
                print("Phase 3: Incremental Loop")
                print("─" * 60)
                print()
            
            incremental_phase = IncrementalPhase(
                state_manager=self.state_manager,
                model=self.config.model,
                backpressure_gate=self.backpressure_gate,
                max_subagents=self.config.max_subagents,
            )
            
            iteration_count = 0
            
            while not self._should_stop:
                iteration_count += 1
                
                if max_iter and iteration_count > max_iter:
                    self._result.final_status = "max_iterations"
                    break
                
                if self.config.show_progress:
                    print(f"[Iteration {iteration_count}]")
                
                iter_result = incremental_phase.execute_iteration()
                
                if self.config.show_progress:
                    self._print(f"Task: {iter_result.task_picked[:50]}", "iteration")
                    status = "✓ COMPLETED" if iter_result.success else "✗ FAILED"
                    self._print(f"Status: {status}", "info")
                    self._print(f"Time: {iter_result.execution_time:.1f}s", "info")
                    print()
                
                record = IterationRecord(
                    iteration=iter_result.iteration,
                    task_picked=iter_result.task_picked,
                    success=iter_result.success,
                    backpressure_passed=iter_result.backpressure_passed,
                    message=iter_result.message,
                    execution_time=iter_result.execution_time,
                )
                self._result.add_iteration(record)
                
                if self.config.on_iteration:
                    self.config.on_iteration(iter_result)
                
                if iter_result.plan_is_empty:
                    self._result.final_status = "completed"
                    self._print("All tasks completed!", "success")
                    break
            
            if self._should_stop:
                self._result.final_status = "stopped"
        
        except Exception as e:
            self._result.final_status = "error"
            self._result.error_message = str(e)
            
            if self.config.on_error:
                self.config.on_error(e)
        
        finally:
            signal.signal(signal.SIGINT, original_handler)
            self.is_running = False
            self._result.end_time = datetime.now()
        
        if self.config.show_progress:
            print()
            print(self._result.summary())
        
        return self._result
    
    async def arun(self, max_iterations: Optional[int] = None) -> RalphLoopResult:
        """
        Run the RalphLoop asynchronously.
        
        Args:
            max_iterations: Override max_iterations from config
            
        Returns:
            RalphLoopResult with execution summary
        """
        max_iter = max_iterations or self.config.max_iterations
        
        self._result = RalphLoopResult(
            goal=self.config.goal,
            workspace=self.config.workspace_path,
            start_time=datetime.now(),
        )
        
        self.is_running = True
        self._should_stop = False
        
        try:
            self._print_header()
            
            if not await self._arun_requirements_phase():
                self._result.final_status = "error"
                self._result.error_message = "Failed to generate specifications"
                self._result.end_time = datetime.now()
                return self._result
            
            self._result.specs_generated = self.state_manager.get_spec_names()
            
            if not await self._arun_todo_phase():
                self._result.final_status = "error"
                self._result.error_message = "Failed to generate TODO list"
                self._result.end_time = datetime.now()
                return self._result
            
            if self.config.show_progress:
                print()
                print("Phase 3: Incremental Loop")
                print("─" * 60)
                print()
            
            incremental_phase = IncrementalPhase(
                state_manager=self.state_manager,
                model=self.config.model,
                backpressure_gate=self.backpressure_gate,
                max_subagents=self.config.max_subagents,
            )
            
            iteration_count = 0
            
            while not self._should_stop:
                iteration_count += 1
                
                if max_iter and iteration_count > max_iter:
                    self._result.final_status = "max_iterations"
                    break
                
                if self.config.show_progress:
                    print(f"[Iteration {iteration_count}]")
                
                iter_result = await incremental_phase.aexecute_iteration()
                
                if self.config.show_progress:
                    self._print(f"Task: {iter_result.task_picked[:50]}", "iteration")
                    status = "✓ COMPLETED" if iter_result.success else "✗ FAILED"
                    self._print(f"Status: {status}", "info")
                    self._print(f"Time: {iter_result.execution_time:.1f}s", "info")
                    print()
                
                record = IterationRecord(
                    iteration=iter_result.iteration,
                    task_picked=iter_result.task_picked,
                    success=iter_result.success,
                    backpressure_passed=iter_result.backpressure_passed,
                    message=iter_result.message,
                    execution_time=iter_result.execution_time,
                )
                self._result.add_iteration(record)
                
                if self.config.on_iteration:
                    self.config.on_iteration(iter_result)
                
                if iter_result.plan_is_empty:
                    self._result.final_status = "completed"
                    self._print("All tasks completed!", "success")
                    break
            
            if self._should_stop:
                self._result.final_status = "stopped"
        
        except Exception as e:
            self._result.final_status = "error"
            self._result.error_message = str(e)
            
            if self.config.on_error:
                self.config.on_error(e)
        
        finally:
            self.is_running = False
            self._result.end_time = datetime.now()
        
        if self.config.show_progress:
            print()
            print(self._result.summary())
        
        return self._result
    
    def stop(self) -> None:
        """Signal the loop to stop after the current iteration."""
        self._should_stop = True
    
    def get_state(self) -> Dict[str, Any]:
        """
        Get the current state.
        
        Returns:
            Dictionary with current state information
        """
        state = self.state_manager.load_state()
        return {
            "is_running": self.is_running,
            "goal": self.config.goal,
            "workspace": str(self.config.workspace_path),
            "specs": list(state.specs.keys()),
            "todo_items": state.get_todo_items(),
            "has_learnings": bool(state.learnings),
        }
