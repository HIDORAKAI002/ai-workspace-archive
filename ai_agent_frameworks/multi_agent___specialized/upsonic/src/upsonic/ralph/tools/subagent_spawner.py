"""
SubagentSpawner tool for RalphLoop.

This tool allows the primary agent to spawn disposable worker agents
for expensive operations like searching codebase, writing code, etc.

According to the Ralph architecture:
- Subagents have their own context window (~150kb)
- Subagents are garbage collected after completion
- Subagents have access to: read_file, write_file, search, run_command
- Test/Build subagents are bottlenecked (only one at a time)
"""

from __future__ import annotations

from pathlib import Path
from typing import Any, List, Literal, Optional, TYPE_CHECKING

from upsonic.tools import ToolKit, tool

if TYPE_CHECKING:
    from upsonic.ralph.state.models import RalphState


class SubagentSpawnerToolKit(ToolKit):
    """
    ToolKit for spawning disposable subagents.
    
    Allows the primary agent to delegate expensive operations to subagents,
    preserving the primary agent's context window.
    
    Subagents:
    - Have their own context window (~150kb)
    - Are garbage collected after completion
    - Have access to filesystem tools (read, write, search, grep, run_command)
    - Can study specs/*, PROMPT.md, AGENT.md
    - Return minimal results to preserve primary context
    
    Subagent Purposes:
    - search: Find files, search codebase (parallel OK)
    - analyze: Analyze code structure (parallel OK)
    - write: Write/edit code (parallel OK)
    - test: Run tests/builds (BOTTLENECK - only one at a time)
    """
    
    SUBAGENT_SYSTEM_PROMPT = """You are a focused subagent in an autonomous development loop.

## Your Purpose
You are a {purpose} subagent. Complete the assigned task efficiently and return a concise result.

## Workspace
Working directory: {workspace}
All file paths are relative to this directory. Use "src/main.py" not "{workspace}/src/main.py".

## Available Context
{context}

## Key Rules

1. **For EXISTING files**: Read the file first before editing to understand structure
2. **For NEW files**: Just write them directly with proper structure
3. **No placeholders**: Implement fully, no "pass" or "TODO"
4. **Proper Python structure**: Imports at top, proper indentation (4 spaces)
5. **Be efficient**: Complete the task and return results concisely
6. **Do NOT get stuck**: If searching finds nothing, report "not found" and stop

## Writing Code

When writing Python files:
- Put ALL imports at the TOP
- Use 4-space indentation
- Keep methods inside their class
- Include proper type annotations
- Write complete, runnable code
"""
    
    def __init__(
        self,
        model: str,
        workspace: Path,
        state: Optional["RalphState"] = None,
        max_result_length: int = 1000,
        **kwargs: Any,
    ):
        """
        Initialize SubagentSpawnerToolKit.
        
        Args:
            model: Model to use for subagents
            workspace: Workspace directory
            state: Optional RalphState for context access
            max_result_length: Maximum length of result returned to primary agent
            **kwargs: ToolKit params (include_tools, exclude_tools, timeout, etc.).
        """
        super().__init__(**kwargs)
        self.model = model
        self.workspace = Path(workspace)
        self.state = state
        self.max_result_length = max_result_length
    
    def _truncate_result(self, result: str) -> str:
        """
        Truncate result to preserve primary agent context.
        
        Args:
            result: Full result from subagent
            
        Returns:
            Truncated result
        """
        if len(result) <= self.max_result_length:
            return result
        return result[:self.max_result_length] + "\n... (truncated, full result was longer)"
    
    def _get_context_summary(self) -> str:
        """Get a brief context summary for subagent."""
        if self.state is None:
            return "No project context available."
        
        parts: List[str] = []
        
        if self.state.specs:
            parts.append(f"Specs available: {', '.join(self.state.specs.keys())}")
        
        if self.state.learnings:
            parts.append("Learnings available in AGENT.md")
        
        return "\n".join(parts) if parts else "Project context loaded from state files."
    
    def _create_subagent_tools(self) -> List[ToolKit]:
        """Create filesystem tools for subagent."""
        from upsonic.ralph.tools.filesystem import RalphFilesystemToolKit
        return [RalphFilesystemToolKit(self.workspace)]
    
    @tool(timeout=600.0)
    def spawn_subagent(
        self,
        task_description: str,
        purpose: Literal["search", "analyze", "write", "test"] = "search",
    ) -> str:
        """
        Spawn a subagent to perform an expensive operation.
        
        The subagent has its own context window and is garbage collected after.
        
        Purposes:
        - search: Find files, search codebase, grep for patterns
        - analyze: Analyze code structure, understand relationships
        - write: Write or edit code files
        - test: Run tests or builds (BOTTLENECK - only one at a time. DO NOT SPAWN PARALLEL TEST SUBAGENTS)
        
        The result is automatically truncated to preserve your context window.
        
        Args:
            task_description: What the subagent should do (be specific and detailed)
            purpose: Type of operation - affects behavior and parallelism
        
        Returns:
            A concise summary of what the subagent found or did
        """
        from upsonic.agent.agent import Agent
        from upsonic.tasks.tasks import Task
        
        context_summary = self._get_context_summary()
        
        system_prompt = self.SUBAGENT_SYSTEM_PROMPT.format(
            purpose=purpose,
            workspace=self.workspace,
            context=context_summary,
        )
        
        tools = self._create_subagent_tools()
        
        subagent = Agent(
            model=self.model,
            system_prompt=system_prompt,
            tools=tools,
        )
        
        try:
            purpose_instructions = self._get_purpose_instructions(purpose)
            
            full_task = f"""Task: {task_description}

Workspace: {self.workspace}

{purpose_instructions}

Complete this task and return a concise result summary."""
            
            result = subagent.do(Task(description=full_task))
            result_str = str(result) if result else "Task completed with no output"
        except Exception as e:
            result_str = f"Subagent error: {str(e)}"
        finally:
            del subagent
        
        return self._truncate_result(result_str)
    
    def _get_purpose_instructions(self, purpose: str) -> str:
        """
        Get specific instructions based on subagent purpose.
        
        Args:
            purpose: The purpose of the subagent
            
        Returns:
            Specific instructions string
        """
        if purpose == "write":
            return """## INSTRUCTIONS FOR WRITING CODE

1. **For EXISTING files**: Read the file first to understand its structure, then edit
2. **For NEW files**: Just write them directly - no need to read first

When writing Python code:
- Put imports at the TOP of the file
- Keep methods INSIDE their class  
- Use 4-space indentation
- Include proper type annotations
- NO placeholders - implement fully, no "pass" or "TODO"

After writing, the code should be complete and runnable."""
        
        elif purpose == "analyze":
            return """## INSTRUCTIONS FOR ANALYSIS

1. Read the ENTIRE file before analyzing
2. Report the structure clearly (classes, functions, imports)
3. Identify existing implementations - do NOT claim something is missing without thorough search
4. Be specific about file paths and line numbers"""
        
        elif purpose == "search":
            return """## INSTRUCTIONS FOR SEARCHING

1. Use grep_files() to search for text patterns
2. Use search_files() to find files by name pattern
3. Do ONE thorough search, then report results
4. Return file paths AND line numbers if found
5. If NOTHING is found, report "No existing implementation found" and STOP
6. Do NOT keep searching indefinitely - one search attempt is enough
7. For new projects, it's NORMAL to find nothing - that means code needs to be created"""
        
        elif purpose == "test":
            return """## INSTRUCTIONS FOR TESTING

1. This is a BOTTLENECK operation - be efficient
2. Write comprehensive but focused tests
3. Document WHY each test exists with docstrings
4. Test the actual behavior, not just that code runs
5. Include edge cases and error conditions"""
        
        return ""
    
    async def aspawn_subagent(
        self,
        task_description: str,
        purpose: Literal["search", "analyze", "write", "test"] = "search",
    ) -> str:
        """
        Spawn a subagent asynchronously to perform an expensive operation.
        
        The subagent has its own context window and is garbage collected after.
        
        Purposes:
        - search: Find files, search codebase, grep for patterns
        - analyze: Analyze code structure, understand relationships
        - write: Write or edit code files
        - test: Run tests or builds (BOTTLENECK - only one at a time. DO NOT SPAWN PARALLEL TEST SUBAGENTS)
        
        The result is automatically truncated to preserve your context window.
        
        Args:
            task_description: What the subagent should do (be specific and detailed)
            purpose: Type of operation - affects behavior and parallelism
        
        Returns:
            A concise summary of what the subagent found or did
        """
        from upsonic.agent.agent import Agent
        from upsonic.tasks.tasks import Task
        
        context_summary = self._get_context_summary()
        
        system_prompt = self.SUBAGENT_SYSTEM_PROMPT.format(
            purpose=purpose,
            workspace=self.workspace,
            context=context_summary,
        )
        
        tools = self._create_subagent_tools()
        
        subagent = Agent(
            model=self.model,
            system_prompt=system_prompt,
            tools=tools,
        )
        
        try:
            purpose_instructions = self._get_purpose_instructions(purpose)
            
            full_task = f"""Task: {task_description}

Workspace: {self.workspace}

{purpose_instructions}

Complete this task and return a concise result summary."""
            
            result = await subagent.do_async(Task(description=full_task))
            result_str = str(result) if result else "Task completed with no output"
        except Exception as e:
            result_str = f"Subagent error: {str(e)}"
        finally:
            del subagent
        
        return self._truncate_result(result_str)
