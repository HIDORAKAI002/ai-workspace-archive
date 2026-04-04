"""
TODO phase for RalphLoop.

This phase analyzes specs and creates a prioritized TODO list.
"""

from __future__ import annotations

from typing import List

from upsonic.ralph.phases.base import BasePhase, PhaseResult
from upsonic.ralph.state.manager import StateManager
from upsonic.ralph.tools.subagent_spawner import SubagentSpawnerToolKit


class TodoPhase(BasePhase):
    """
    Generate prioritized TODO list from specifications.
    
    This phase analyzes the specs and creates fix_plan.md with
    a prioritized list of items to implement.
    """
    
    TODO_PROMPT = """You are a project planner for an AI-driven autonomous coding system (RALPH technique).

Your job is to analyze specifications and create a prioritized TODO list for the fix_plan.md file.

## Key Principle: One Task Per Iteration
Each item in the TODO list will be picked and implemented in a single iteration.
Therefore, each item MUST be:
- Specific and actionable (not vague)
- Completable in one focused work session
- Self-contained (minimal dependencies on other incomplete items)

## Output Format

Create a markdown list with priorities. Output ONLY the TODO list:

```todo
- [ ] Set up project structure with requirements.txt and main entry point (CRITICAL - do first)
- [ ] Create core data models with proper type annotations
- [ ] Implement main business logic function for [specific feature]
- [ ] Add error handling and input validation to [specific module]
- [ ] Create unit tests for [specific module] with edge cases
- [ ] Implement [specific feature] following the spec
- [ ] Add integration tests for the complete workflow
- [ ] Write documentation with usage examples
```

## Priority Rules
1. **CRITICAL first**: Project setup, dependencies, core structure
2. **Core functionality second**: Main features that other things depend on
3. **Supporting features third**: Error handling, validation, utilities
4. **Tests alongside features**: Each feature should have tests
5. **Documentation last**: After implementation is stable

## Item Formatting Rules
1. Each item should be SPECIFIC - not "implement feature" but "implement X that does Y"
2. Each item should include CONTEXT - which module/file it affects
3. Each item should be TESTABLE - you can verify when it's done
4. Include test items for each major feature
5. Dependencies should come before dependents

## What Makes a Good TODO Item
GOOD: "Create data_collection.py with FinancialDataCollector class that fetches from Alpha Vantage API"
BAD: "Implement data collection"

GOOD: "Add unit tests for parse_revenue_and_market_cap() function with edge cases"
BAD: "Add tests"

GOOD: "Set up project with requirements.txt including requests, pandas, beautifulsoup4"
BAD: "Setup project"

## Anti-Patterns to Avoid
- Do NOT create vague items like "implement core functionality"
- Do NOT bundle multiple features into one item
- Do NOT forget test items - every feature needs tests
- Do NOT create items with hidden dependencies
"""
    
    def __init__(
        self,
        state_manager: StateManager,
        model: str,
        max_subagents: int = 50,
    ):
        """
        Initialize TodoPhase.
        
        Args:
            state_manager: StateManager for state file access
            model: LLM model identifier
            max_subagents: Maximum subagents for parallel analysis
        """
        super().__init__(state_manager, model)
        self.max_subagents = max_subagents
    
    @property
    def name(self) -> str:
        return "todo"
    
    def _parse_todo_list(self, content: str) -> str:
        """
        Parse TODO list from LLM response and normalize to checkbox format.
        
        All items will be normalized to `- [ ] task` format for consistency.
        
        Args:
            content: LLM response content
            
        Returns:
            Cleaned and normalized TODO list content with checkbox format
        """
        import re
        
        raw_content = ""
        
        todo_match = re.search(r"```todo\s*\n(.*?)```", content, re.DOTALL)
        if todo_match:
            raw_content = todo_match.group(1).strip()
        else:
            lines: List[str] = []
            in_list = False
            for line in content.split("\n"):
                stripped = line.strip()
                if stripped.startswith("- ") or stripped.startswith("* ") or re.match(r"^\d+\.", stripped):
                    in_list = True
                    lines.append(stripped)
                elif in_list and stripped == "":
                    continue
                elif in_list:
                    break
            
            if lines:
                raw_content = "\n".join(lines)
            else:
                raw_content = content.strip()
        
        # Normalize all items to checkbox format: - [ ] task
        normalized_lines: List[str] = []
        for line in raw_content.split("\n"):
            stripped = line.strip()
            if not stripped:
                continue
            
            # Already has checkbox format - keep as is
            if stripped.startswith("- [ ] ") or stripped.startswith("- [x] ") or stripped.startswith("- [X] "):
                normalized_lines.append(stripped)
            # Bullet without checkbox: - task or * task
            elif stripped.startswith("- "):
                task = stripped[2:].strip()
                normalized_lines.append(f"- [ ] {task}")
            elif stripped.startswith("* "):
                task = stripped[2:].strip()
                normalized_lines.append(f"- [ ] {task}")
            # Numbered format: 1. task
            elif re.match(r"^\d+\.\s+", stripped):
                task = re.sub(r"^\d+\.\s+", "", stripped)
                normalized_lines.append(f"- [ ] {task}")
            # Handle nested items with indentation
            elif line.startswith("  ") and (stripped.startswith("- ") or stripped.startswith("* ")):
                task = stripped[2:].strip() if stripped.startswith(("- ", "* ")) else stripped
                # Preserve indentation for nested items
                indent = line[:len(line) - len(stripped)]
                if stripped.startswith("- [ ] ") or stripped.startswith("- [x] "):
                    normalized_lines.append(f"{indent}{stripped}")
                else:
                    normalized_lines.append(f"{indent}- [ ] {task}")
        
        return "\n".join(normalized_lines)
    
    def execute(self) -> PhaseResult:
        """
        Execute TODO phase synchronously.
        
        Returns:
            PhaseResult with generated TODO list
        """
        from upsonic.agent.agent import Agent
        from upsonic.tasks.tasks import Task
        
        state = self.state_manager.load_state()
        
        if not state.has_specs():
            return PhaseResult(
                phase_name=self.name,
                success=False,
                message="No specs found. Run requirements phase first.",
                errors=["No specification files found"],
            )
        
        subagent_toolkit = SubagentSpawnerToolKit(
            model=self.model,
            workspace=state.workspace_path,
            state=state,
        )
        
        agent = Agent(
            model=self.model,
            system_prompt=self.TODO_PROMPT,
            tools=[subagent_toolkit],
        )
        
        try:
            specs_content = state.format_specs_for_context()
            
            task = Task(
                description=f"""Analyze these specifications and create a prioritized TODO list for fix_plan.md.

SPECIFICATIONS:
{specs_content}

## Instructions

Create a prioritized TODO list in the ```todo format.

### Each item MUST be:
- **Specific**: Not "implement feature" but "implement X that does Y in module Z"
- **Actionable**: Clear what needs to be done
- **Completable in one iteration**: Can be done in one focused session
- **Testable**: You can verify when it's done

### Include for each major feature:
1. The implementation task
2. A corresponding test task

### Priority Order:
1. Project setup (dependencies, structure)
2. Core models and data structures
3. Main business logic
4. Supporting utilities
5. Error handling
6. Tests for each feature
7. Documentation

### Example Good Items:
- [ ] Set up project with requirements.txt (requests, pandas, beautifulsoup4)
- [ ] Create src/data_collection.py with FinancialDataCollector class
- [ ] Add unit tests for FinancialDataCollector.fetch_data()
- [ ] Implement error handling for API failures in data_collection.py

You can use subagents to analyze existing code structure if needed."""
            )
            
            result = agent.do(task)
            result_str = str(result) if result else ""
            
            todo_content = self._parse_todo_list(result_str)
            
            if not todo_content:
                return PhaseResult(
                    phase_name=self.name,
                    success=False,
                    message="Failed to generate TODO list",
                    errors=["No TODO items parsed from LLM response"],
                )
            
            self.state_manager.update_fix_plan(todo_content)
            
            todo_count = len([line for line in todo_content.split("\n") if line.strip()])
            
            return PhaseResult(
                phase_name=self.name,
                success=True,
                message=f"Generated TODO list with {todo_count} items",
                data={"todo_count": todo_count},
            )
        
        except Exception as e:
            return PhaseResult(
                phase_name=self.name,
                success=False,
                message=f"TODO phase failed: {str(e)}",
                errors=[str(e)],
            )
        finally:
            del agent
    
    async def aexecute(self) -> PhaseResult:
        """
        Execute TODO phase asynchronously.
        
        Returns:
            PhaseResult with generated TODO list
        """
        from upsonic.agent.agent import Agent
        from upsonic.tasks.tasks import Task
        
        state = self.state_manager.load_state()
        
        if not state.has_specs():
            return PhaseResult(
                phase_name=self.name,
                success=False,
                message="No specs found. Run requirements phase first.",
                errors=["No specification files found"],
            )
        
        subagent_toolkit = SubagentSpawnerToolKit(
            model=self.model,
            workspace=state.workspace_path,
            state=state,
        )
        
        agent = Agent(
            model=self.model,
            system_prompt=self.TODO_PROMPT,
            tools=[subagent_toolkit],
        )
        
        try:
            specs_content = state.format_specs_for_context()
            
            task = Task(
                description=f"""Analyze these specifications and create a prioritized TODO list for fix_plan.md.

SPECIFICATIONS:
{specs_content}

## Instructions

Create a prioritized TODO list in the ```todo format.

### Each item MUST be:
- **Specific**: Not "implement feature" but "implement X that does Y in module Z"
- **Actionable**: Clear what needs to be done
- **Completable in one iteration**: Can be done in one focused session
- **Testable**: You can verify when it's done

### Include for each major feature:
1. The implementation task
2. A corresponding test task

### Priority Order:
1. Project setup (dependencies, structure)
2. Core models and data structures
3. Main business logic
4. Supporting utilities
5. Error handling
6. Tests for each feature
7. Documentation

### Example Good Items:
- [ ] Set up project with requirements.txt (requests, pandas, beautifulsoup4)
- [ ] Create src/data_collection.py with FinancialDataCollector class
- [ ] Add unit tests for FinancialDataCollector.fetch_data()
- [ ] Implement error handling for API failures in data_collection.py

You can use subagents to analyze existing code structure if needed."""
            )
            
            result = await agent.do_async(task)
            result_str = str(result) if result else ""
            
            todo_content = self._parse_todo_list(result_str)
            
            if not todo_content:
                return PhaseResult(
                    phase_name=self.name,
                    success=False,
                    message="Failed to generate TODO list",
                    errors=["No TODO items parsed from LLM response"],
                )
            
            self.state_manager.update_fix_plan(todo_content)
            
            todo_count = len([line for line in todo_content.split("\n") if line.strip()])
            
            return PhaseResult(
                phase_name=self.name,
                success=True,
                message=f"Generated TODO list with {todo_count} items",
                data={"todo_count": todo_count},
            )
        
        except Exception as e:
            return PhaseResult(
                phase_name=self.name,
                success=False,
                message=f"TODO phase failed: {str(e)}",
                errors=[str(e)],
            )
        finally:
            del agent
