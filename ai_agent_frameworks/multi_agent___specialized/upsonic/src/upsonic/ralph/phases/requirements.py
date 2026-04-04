"""
Requirements phase for RalphLoop.

This phase generates specifications from the project goal.
"""

from __future__ import annotations

import re
from typing import Dict, List, Optional

from upsonic.ralph.phases.base import BasePhase, PhaseResult
from upsonic.ralph.state.manager import StateManager


class RequirementsPhase(BasePhase):
    """
    Generate specifications from the project goal.
    
    This phase runs once at the start to create spec files
    that describe what should be built.
    """
    
    REQUIREMENTS_PROMPT = """You are a requirements analyst for an AI-driven autonomous coding system.

Your job is to analyze the project goal and generate detailed specifications.

## Output Format

For each major feature or component, output a spec in this format:

```spec:feature_name
# Feature Name

## Description
What this feature does...

## Requirements
- Requirement 1
- Requirement 2

## Implementation Notes
Technical notes...
```

## Rules
1. Create ONE spec file per major feature/component
2. Be specific and detailed
3. Include technical implementation notes
4. Consider dependencies between features
5. Name specs clearly (e.g., auth, api, models, etc.)
"""
    
    DEFAULT_PROMPT_TEMPLATE = """# Project: {goal}

## Your Role
You are an AI software engineer building this project autonomously using the RALPH technique.
Each iteration, you pick ONE item from fix_plan.md and implement it completely.

## The RALPH Technique Principles
1. **One Task Per Iteration** - Focus on a single task. Do it completely.
2. **Fresh Context Each Loop** - Each iteration starts with clean context
3. **Specs are Source of Truth** - specs/* define what to build
4. **fix_plan.md is Your TODO** - Prioritized list of tasks
5. **AGENT.md is Your Memory** - Learnings persist across iterations

## Critical Rules

### 1. ONE TASK ONLY
Pick exactly ONE unchecked item from fix_plan.md per iteration.
Focus and complete it before moving on.

### 2. QUICK SEARCH, THEN IMPLEMENT
Do a quick search to check if related code exists.
- If found: use or extend it
- If NOT found: CREATE the code (this is normal for new projects)
Do NOT get stuck searching. One quick search is enough.

### 3. READ BEFORE EDITING EXISTING FILES
If editing an existing file, read it first to understand its structure.
For new files, just write them directly.

### 4. NO PLACEHOLDERS
Implement features FULLY. No "pass", "TODO", or stub code.

### 5. WRITE TESTS
After implementing functionality, write tests for it.

### 6. BACKPRESSURE MUST PASS
Run backpressure validation after changes. Fix failures before moving on.

### 7. MARK COMPLETE
After backpressure passes, mark the task complete:
update_fix_plan(action="complete", item="<task>")

### 8. RECORD LEARNINGS
Update AGENT.md with useful patterns and gotchas for future iterations.

## Subagent Strategy
- Use subagents for: searching codebase, reading files, analyzing code, writing code
- ONLY ONE subagent for: build, test (these are bottlenecks)
- Subagents have their own context window - they preserve your main context
- Return minimal results to preserve context

## After Each Task
1. Write tests for the implemented functionality
2. Run backpressure validation (build/test)
3. If PASS: Mark item complete in fix_plan.md
4. If FAIL: Fix the issue, re-run backpressure
5. Record learnings in AGENT.md

## Remember
- Study specs/* to learn about requirements
- Study AGENT.md to learn from past iterations
- One thing at a time. Focus. Complete it.
"""
    
    def __init__(self, state_manager: StateManager, model: str, goal: str):
        """
        Initialize RequirementsPhase.
        
        Args:
            state_manager: StateManager for state file access
            model: LLM model identifier
            goal: Project goal
        """
        super().__init__(state_manager, model)
        self.goal = goal
    
    @property
    def name(self) -> str:
        return "requirements"
    
    def _parse_specs(self, content: str) -> Dict[str, str]:
        """
        Parse spec blocks from LLM response.
        
        Args:
            content: LLM response content
            
        Returns:
            Dictionary of spec_name -> content
        """
        specs: Dict[str, str] = {}
        
        pattern = r"```spec:(\w+)\s*\n(.*?)```"
        matches = re.findall(pattern, content, re.DOTALL)
        
        for spec_name, spec_content in matches:
            specs[spec_name] = spec_content.strip()
        
        if not specs:
            pattern = r"```(\w+)\.md\s*\n(.*?)```"
            matches = re.findall(pattern, content, re.DOTALL)
            for spec_name, spec_content in matches:
                specs[spec_name] = spec_content.strip()
        
        if not specs and "# " in content:
            specs["main"] = content.strip()
        
        return specs
    
    def execute(self) -> PhaseResult:
        """
        Execute requirements phase synchronously.
        
        Returns:
            PhaseResult with generated specs
        """
        from upsonic.agent.agent import Agent
        from upsonic.tasks.tasks import Task
        
        agent = Agent(
            model=self.model,
            system_prompt=self.REQUIREMENTS_PROMPT,
        )
        
        try:
            task = Task(
                description=f"""Analyze the following project goal and generate detailed specifications.

PROJECT GOAL:
{self.goal}

Generate one spec file per major feature/component using the ```spec:name format."""
            )
            
            result = agent.do(task)
            result_str = str(result) if result else ""
            
            specs = self._parse_specs(result_str)
            
            if not specs:
                return PhaseResult(
                    phase_name=self.name,
                    success=False,
                    message="Failed to generate specifications",
                    errors=["No specs parsed from LLM response"],
                )
            
            for spec_name, spec_content in specs.items():
                self.state_manager.save_spec(spec_name, spec_content)
            
            prompt_content = self.DEFAULT_PROMPT_TEMPLATE.format(goal=self.goal)
            self.state_manager.save_prompt(prompt_content)
            
            return PhaseResult(
                phase_name=self.name,
                success=True,
                message=f"Generated {len(specs)} specification files",
                data={"specs": list(specs.keys())},
            )
        
        except Exception as e:
            return PhaseResult(
                phase_name=self.name,
                success=False,
                message=f"Requirements phase failed: {str(e)}",
                errors=[str(e)],
            )
        finally:
            del agent
    
    async def aexecute(self) -> PhaseResult:
        """
        Execute requirements phase asynchronously.
        
        Returns:
            PhaseResult with generated specs
        """
        from upsonic.agent.agent import Agent
        from upsonic.tasks.tasks import Task
        
        agent = Agent(
            model=self.model,
            system_prompt=self.REQUIREMENTS_PROMPT,
        )
        
        try:
            task = Task(
                description=f"""Analyze the following project goal and generate detailed specifications.

PROJECT GOAL:
{self.goal}

Generate one spec file per major feature/component using the ```spec:name format."""
            )
            
            result = await agent.do_async(task)
            result_str = str(result) if result else ""
            
            specs = self._parse_specs(result_str)
            
            if not specs:
                return PhaseResult(
                    phase_name=self.name,
                    success=False,
                    message="Failed to generate specifications",
                    errors=["No specs parsed from LLM response"],
                )
            
            for spec_name, spec_content in specs.items():
                self.state_manager.save_spec(spec_name, spec_content)
            
            prompt_content = self.DEFAULT_PROMPT_TEMPLATE.format(goal=self.goal)
            self.state_manager.save_prompt(prompt_content)
            
            return PhaseResult(
                phase_name=self.name,
                success=True,
                message=f"Generated {len(specs)} specification files",
                data={"specs": list(specs.keys())},
            )
        
        except Exception as e:
            return PhaseResult(
                phase_name=self.name,
                success=False,
                message=f"Requirements phase failed: {str(e)}",
                errors=[str(e)],
            )
        finally:
            del agent
