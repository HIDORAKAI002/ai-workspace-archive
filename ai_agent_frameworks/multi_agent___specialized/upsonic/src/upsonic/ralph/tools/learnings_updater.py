"""
LearningsUpdater tool for RalphLoop.

This tool allows the agent to update AGENT.md with learnings
for future iterations.
"""

from __future__ import annotations

from typing import Any, Literal, TYPE_CHECKING

from upsonic.tools import ToolKit, tool

if TYPE_CHECKING:
    from upsonic.ralph.state.manager import StateManager


class LearningsUpdaterToolKit(ToolKit):
    """
    ToolKit for managing AGENT.md learnings.
    
    Allows the agent to record learnings that persist across iterations,
    improving future performance.
    """
    
    def __init__(self, state_manager: "StateManager", **kwargs: Any):
        """
        Initialize LearningsUpdaterToolKit.
        
        Args:
            state_manager: StateManager instance for file operations
            **kwargs: ToolKit params (include_tools, exclude_tools, timeout, etc.).
        """
        super().__init__(**kwargs)
        self.state_manager = state_manager
    
    @tool
    def update_learnings(
        self,
        learning: str,
        category: Literal["build", "test", "pattern", "gotcha"] = "pattern",
    ) -> str:
        """
        Record a learning in AGENT.md for future iterations.
        
        IMPORTANT: Learnings persist across iterations. Future loops will
        benefit from what you document here. Be helpful to your future self!
        
        ## When to Record Learnings
        - **build**: How to build the project, commands that work, dependencies
        - **test**: How to run tests, test patterns, what makes tests pass
        - **pattern**: Code patterns that work well, architectural decisions
        - **gotcha**: Pitfalls to avoid, things that cause errors
        
        ## What Makes a Good Learning
        GOOD: "When implementing API clients, always add a rate limiter decorator to prevent 429 errors"
        BAD: "Added rate limiter"
        
        GOOD: "The data_collection module requires reading the full file before editing to avoid syntax corruption"
        BAD: "Fixed syntax error"
        
        Keep learnings:
        - Brief but actionable
        - Specific to this codebase
        - Focused on the WHY, not just the WHAT
        
        Args:
            learning: What you learned (keep it brief and actionable)
            category: Type of learning - "build", "test", "pattern", or "gotcha"
        
        Returns:
            Confirmation message
        """
        if not learning:
            return "Error: learning content is required"
        
        self.state_manager.append_learning(learning, category)
        return f"Learning recorded in AGENT.md under {category.upper()}"
