"""
Incremental phase for RalphLoop.

This is the main execution loop that processes one task per iteration.
"""

from __future__ import annotations

import time
from dataclasses import dataclass, field
from typing import Any, Dict, List

from upsonic.ralph.phases.base import BasePhase, PhaseResult
from upsonic.ralph.state.manager import StateManager
from upsonic.ralph.backpressure.gate import BackpressureGate
from upsonic.ralph.tools.plan_updater import PlanUpdaterToolKit
from upsonic.ralph.tools.learnings_updater import LearningsUpdaterToolKit
from upsonic.ralph.tools.backpressure import BackpressureToolKit
from upsonic.ralph.tools.subagent_spawner import SubagentSpawnerToolKit
from upsonic.ralph.tools.filesystem import RalphFilesystemToolKit


@dataclass
class IterationResult:
    """Result of a single loop iteration."""
    
    iteration: int
    task_picked: str = ""
    success: bool = False
    backpressure_passed: bool = False
    message: str = ""
    execution_time: float = 0.0
    plan_is_empty: bool = False
    data: Dict[str, Any] = field(default_factory=dict)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary."""
        return {
            "iteration": self.iteration,
            "task_picked": self.task_picked,
            "success": self.success,
            "backpressure_passed": self.backpressure_passed,
            "message": self.message,
            "execution_time": self.execution_time,
            "plan_is_empty": self.plan_is_empty,
        }


class IncrementalPhase(BasePhase):
    """
    Main execution loop for RalphLoop.
    
    This phase is executed repeatedly, with each iteration:
    1. Loading fresh state
    2. Creating a fresh agent
    3. Executing one task
    4. Running backpressure validation
    5. Updating state files
    """
    
    SCHEDULER_PROMPT = """
## Iteration Instructions

You are a scheduler agent in an autonomous development loop (RALPH technique).

### Your Goal for This Iteration
1. Study specs/* and AGENT.md to understand the project
2. Review fix_plan.md - look for UNCHECKED items: `- [ ]`
3. Pick the SINGLE most important/urgent unchecked item
4. **SEARCH FIRST**: Use subagents to search codebase BEFORE assuming anything is missing
5. **READ BEFORE EDIT**: Always read the ENTIRE file before making any edits
6. Implement the task COMPLETELY using subagents
7. Write a TEST for the implemented functionality
8. Run validation via backpressure tool
9. **ALWAYS mark the task as COMPLETE in fix_plan.md using update_fix_plan(action="complete")**
10. Record learnings in AGENT.md

### Understanding fix_plan.md Format
The TODO list uses checkbox format:
- `- [ ]` = Pending task (needs to be done)
- `- [x]` = Completed task (already done, ignore these)

Only work on UNCHECKED items. Skip any items marked with [x].

### Managing the TODO List
Use update_fix_plan tool with these actions:
- `action="complete"`: Mark a task as done ([ ] → [x]) - use after successfully completing a task
- `action="add"`: Add a new pending task - use when you discover additional work needed
- `action="delete"`: Remove a pending task entirely - use if a task is no longer needed or was a mistake
  - NOTE: Only PENDING tasks can be deleted. Completed tasks ([x]) are protected and cannot be deleted.

### Using Subagents - CRITICAL RULES
Use subagents for expensive operations:
- **SEARCH CODEBASE**: Before implementing ANYTHING, spawn subagents to search if it already exists
- **READ FILES**: Subagents MUST read the ENTIRE file before editing. Never edit blindly.
- **WRITE CODE**: Spawn subagents to write/edit code files
- **WRITE TESTS**: After implementing, spawn subagent to write test for that specific unit
- **TEST/BUILD**: BOTTLENECK - Only 1 subagent for build/test at a time

The subagent results are automatically truncated to preserve your context.

### After Implementation - TEST CREATION IS MANDATORY
1. After implementing ANY functionality, you MUST create a test file for that unit
2. The test should verify the implemented functionality works correctly
3. Spawn a subagent with purpose="write" to create the test
4. Document WHY the test exists and what it validates
5. Then run backpressure to validate everything passes

### Backpressure Validation
After implementation AND test creation, run the backpressure tool:
- If PASS: **IMMEDIATELY mark the item as complete using update_fix_plan(action="complete", item="<task>")**
- If FAIL with actual errors: fix the issue, re-run backpressure, DO NOT mark complete until it passes
- Keep iterating until backpressure passes

### Critical Rules (FOLLOW STRICTLY)

1. **ONE TASK ONLY**: Pick exactly ONE unchecked item per iteration. Do not try to be a hero.

2. **QUICK SEARCH, THEN IMPLEMENT**: Do a quick search to check if something already exists.
   - If found: use/extend the existing code
   - If NOT found: IMMEDIATELY proceed with implementation
   - Do NOT get stuck searching. One quick search per concept is enough.
   - For greenfield projects, most things WON'T exist yet - that's expected!

3. **READ BEFORE EDIT**: Before editing an EXISTING file, read it first to understand structure.
   For NEW files, just write them directly.

4. **NO PLACEHOLDERS**: Implement features FULLY. No "pass", "TODO", or stub code.

5. **WRITE TESTS**: After implementing, create tests for the functionality.

6. **RUN BACKPRESSURE**: After changes, run backpressure. Fix failures before moving on.

7. **MARK COMPLETE**: After backpressure passes, call:
   update_fix_plan(action="complete", item="<the task>")

8. **RECORD LEARNINGS**: Document useful patterns in AGENT.md for future iterations.

### Important: DO NOT GET STUCK

- If a search returns no results, that means you need to CREATE the code. Proceed immediately.
- If you've searched once and found nothing, MOVE ON to implementation.
- Do not search repeatedly for the same thing.
- For new projects, most code doesn't exist yet. This is NORMAL. Just implement it.

### Workflow Summary

1. Pick ONE task from fix_plan.md
2. Quick search: Does related code exist? (ONE search, not infinite)
3. If exists: read and extend it
4. If not exists: CREATE it (this is the normal case for new projects)
5. Write tests
6. Run backpressure
7. Mark complete
"""
    
    def __init__(
        self,
        state_manager: StateManager,
        model: str,
        backpressure_gate: BackpressureGate,
        max_subagents: int = 50,
    ):
        """
        Initialize IncrementalPhase.
        
        Args:
            state_manager: StateManager for state file access
            model: LLM model identifier
            backpressure_gate: BackpressureGate for validation
            max_subagents: Maximum parallel subagents
        """
        super().__init__(state_manager, model)
        self.backpressure_gate = backpressure_gate
        self.max_subagents = max_subagents
        self._current_iteration = 0
    
    @property
    def name(self) -> str:
        return "incremental"
    
    def _create_tools(self, state: Any) -> List[Any]:
        """
        Create tools for the primary agent.
        
        Args:
            state: RalphState loaded from state manager
        """
        return [
            PlanUpdaterToolKit(self.state_manager),
            LearningsUpdaterToolKit(self.state_manager),
            BackpressureToolKit(self.backpressure_gate),
            RalphFilesystemToolKit(state.workspace_path),  # Direct file access
            SubagentSpawnerToolKit(
                model=self.model,
                workspace=state.workspace_path,
                state=state,
            ),
        ]
    
    def execute(self) -> PhaseResult:
        """
        Execute requirements phase is not used for IncrementalPhase.
        Use execute_iteration instead.
        """
        result = self.execute_iteration()
        return PhaseResult(
            phase_name=self.name,
            success=result.success,
            message=result.message,
            data=result.to_dict(),
        )
    
    async def aexecute(self) -> PhaseResult:
        """
        Execute requirements phase is not used for IncrementalPhase.
        Use aexecute_iteration instead.
        """
        result = await self.aexecute_iteration()
        return PhaseResult(
            phase_name=self.name,
            success=result.success,
            message=result.message,
            data=result.to_dict(),
        )
    
    def execute_iteration(self) -> IterationResult:
        """
        Execute a single iteration of the loop synchronously.
        
        Returns:
            IterationResult with iteration outcome
        """
        from upsonic.agent.agent import Agent
        from upsonic.tasks.tasks import Task
        
        self._current_iteration += 1
        start_time = time.time()
        
        state_before = self.state_manager.load_state()
        
        if state_before.is_plan_empty():
            return IterationResult(
                iteration=self._current_iteration,
                success=True,
                plan_is_empty=True,
                message="All tasks completed - no pending items in fix_plan.md",
                execution_time=time.time() - start_time,
            )
        
        # Only get pending (unchecked) items - items marked with [x] are ignored
        pending_items_before = state_before.get_pending_items()
        first_item = pending_items_before[0] if pending_items_before else "Unknown task"
        pending_count_before = len(pending_items_before)
        
        system_prompt = state_before.prompt + "\n" + self.SCHEDULER_PROMPT
        
        context = state_before.format_for_context()
        
        tools = self._create_tools(state_before)
        
        agent = Agent(
            model=self.model,
            system_prompt=system_prompt,
            tools=tools,
        )
        
        try:
            task_description = f"""This is iteration {self._current_iteration}.

{context}

## Your Task This Iteration

1. **Pick ONE task** from fix_plan.md (look for `- [ ]`, skip `- [x]`)
2. **Implement it** using subagents for writing code
3. **Write tests** for the implemented functionality  
4. **Run backpressure** to validate (run_backpressure tool)
5. **Mark complete** when backpressure passes (update_fix_plan action="complete")

## Key Rules

- **ONE task only** - focus and complete it
- **Quick search, then implement** - if code doesn't exist, CREATE it (normal for new projects)
- **Read before editing existing files** - but for new files, just write them
- **No placeholders** - implement fully, no "TODO" or "pass"
- **Tests are required** - create tests for your implementation
- **Backpressure must pass** - fix any failures before marking complete

## Do NOT Get Stuck

If you search and find nothing, that means you need to CREATE the code.
For new projects, most code doesn't exist yet. This is NORMAL.
Do one quick search, then PROCEED with implementation.

## After Backpressure Passes

Call: update_fix_plan(action="complete", item="<the task you completed>")
This changes `- [ ]` to `- [x]` in fix_plan.md."""
            
            result = agent.do(Task(description=task_description))
            result_str = str(result) if result else ""
            
            execution_time = time.time() - start_time
            
            # Check if fix_plan.md was actually updated - compare pending items count
            state_after = self.state_manager.load_state()
            pending_items_after = state_after.get_pending_items()
            pending_count_after = len(pending_items_after)
            
            # True success: a pending item was marked as complete ([ ] -> [x])
            task_completed = pending_count_after < pending_count_before
            
            return IterationResult(
                iteration=self._current_iteration,
                task_picked=first_item,
                success=task_completed,
                backpressure_passed=task_completed,  # Infer from plan update
                message=result_str[:200] if result_str else "Iteration completed",
                execution_time=execution_time,
                plan_is_empty=state_after.is_plan_empty(),
            )
        
        except Exception as e:
            return IterationResult(
                iteration=self._current_iteration,
                task_picked=first_item,
                success=False,
                message=f"Iteration failed: {str(e)}",
                execution_time=time.time() - start_time,
            )
        finally:
            del agent
    
    async def aexecute_iteration(self) -> IterationResult:
        """
        Execute a single iteration of the loop asynchronously.
        
        Returns:
            IterationResult with iteration outcome
        """
        from upsonic.agent.agent import Agent
        from upsonic.tasks.tasks import Task
        
        self._current_iteration += 1
        start_time = time.time()
        
        state_before = self.state_manager.load_state()
        
        if state_before.is_plan_empty():
            return IterationResult(
                iteration=self._current_iteration,
                success=True,
                plan_is_empty=True,
                message="All tasks completed - no pending items in fix_plan.md",
                execution_time=time.time() - start_time,
            )
        
        # Only get pending (unchecked) items - items marked with [x] are ignored
        pending_items_before = state_before.get_pending_items()
        first_item = pending_items_before[0] if pending_items_before else "Unknown task"
        pending_count_before = len(pending_items_before)
        
        system_prompt = state_before.prompt + "\n" + self.SCHEDULER_PROMPT
        
        context = state_before.format_for_context()
        
        tools = self._create_tools(state_before)
        
        agent = Agent(
            model=self.model,
            system_prompt=system_prompt,
            tools=tools,
        )
        
        try:
            task_description = f"""This is iteration {self._current_iteration}.

{context}

## Your Task This Iteration

1. **Pick ONE task** from fix_plan.md (look for `- [ ]`, skip `- [x]`)
2. **Implement it** using subagents for writing code
3. **Write tests** for the implemented functionality  
4. **Run backpressure** to validate (run_backpressure tool)
5. **Mark complete** when backpressure passes (update_fix_plan action="complete")

## Key Rules

- **ONE task only** - focus and complete it
- **Quick search, then implement** - if code doesn't exist, CREATE it (normal for new projects)
- **Read before editing existing files** - but for new files, just write them
- **No placeholders** - implement fully, no "TODO" or "pass"
- **Tests are required** - create tests for your implementation
- **Backpressure must pass** - fix any failures before marking complete

## Do NOT Get Stuck

If you search and find nothing, that means you need to CREATE the code.
For new projects, most code doesn't exist yet. This is NORMAL.
Do one quick search, then PROCEED with implementation.

## After Backpressure Passes

Call: update_fix_plan(action="complete", item="<the task you completed>")
This changes `- [ ]` to `- [x]` in fix_plan.md."""
            
            result = await agent.do_async(Task(description=task_description))
            result_str = str(result) if result else ""
            
            execution_time = time.time() - start_time
            
            # Check if fix_plan.md was actually updated - compare pending items count
            state_after = self.state_manager.load_state()
            pending_items_after = state_after.get_pending_items()
            pending_count_after = len(pending_items_after)
            
            # True success: a pending item was marked as complete ([ ] -> [x])
            task_completed = pending_count_after < pending_count_before
            
            return IterationResult(
                iteration=self._current_iteration,
                task_picked=first_item,
                success=task_completed,
                backpressure_passed=task_completed,  # Infer from plan update
                message=result_str[:200] if result_str else "Iteration completed",
                execution_time=execution_time,
                plan_is_empty=state_after.is_plan_empty(),
            )
        
        except Exception as e:
            return IterationResult(
                iteration=self._current_iteration,
                task_picked=first_item,
                success=False,
                message=f"Iteration failed: {str(e)}",
                execution_time=time.time() - start_time,
            )
        finally:
            del agent
    
    def reset_iteration_count(self) -> None:
        """Reset the iteration counter."""
        self._current_iteration = 0
