"""
PlanUpdater tool for RalphLoop.

This tool allows the agent to update fix_plan.md during execution.

The fix_plan.md file uses checkbox format:
- [ ] Pending task
- [x] Completed task

When a task is completed, it is marked with [x] to maintain history.
Pending tasks can be deleted if the agent changes its mind, but
completed tasks are protected and cannot be deleted.
"""

from __future__ import annotations

from typing import Any, Literal, Optional, TYPE_CHECKING

from upsonic.tools import ToolKit, tool

if TYPE_CHECKING:
    from upsonic.ralph.state.manager import StateManager


class PlanUpdaterToolKit(ToolKit):
    """
    ToolKit for managing fix_plan.md.
    
    Provides tools for adding, completing, and deleting TODO items in fix_plan.md.
    Items use checkbox format: - [ ] for pending, - [x] for completed.
    
    Actions available:
    - add: Add a new pending task (- [ ] format)
    - complete: Mark a task as done ([ ] → [x])
    - delete: Remove a PENDING task entirely (cannot delete completed tasks)
    - replace: Replace entire file content
    
    Completed tasks are protected and cannot be deleted to preserve history.
    """
    
    def __init__(self, state_manager: "StateManager", **kwargs: Any):
        """
        Initialize PlanUpdaterToolKit.
        
        Args:
            state_manager: StateManager instance for file operations
            **kwargs: ToolKit params (include_tools, exclude_tools, timeout, etc.).
        """
        super().__init__(**kwargs)
        self.state_manager = state_manager
    
    @tool
    def update_fix_plan(
        self,
        action: Literal["add", "complete", "delete", "replace"],
        item: str = "",
        new_content: Optional[str] = None,
    ) -> str:
        """
        Update the fix_plan.md TODO list.
        
        Use this tool to manage the TODO list after completing tasks,
        discovering new items, or removing tasks that are no longer needed.
        
        IMPORTANT: 
        - Use "complete" to mark tasks as done ([ ] → [x])
        - Use "delete" to remove a pending task entirely (only works on unchecked tasks)
        - Completed tasks ([x]) cannot be deleted - they are preserved as history
        
        Args:
            action: What to do:
                - "add": Add a new pending item (will be formatted as "- [ ] item")
                - "complete": Mark an item as done (changes [ ] to [x])
                - "delete": Remove a PENDING task entirely (does NOT work on completed tasks)
                - "replace": Replace entire file content (use with caution)
            item: The task description (required for add/complete/delete)
            new_content: Full new content (required for replace action)
        
        Returns:
            Confirmation message
        """
        if action == "add":
            if not item:
                return "Error: item is required for 'add' action"
            self.state_manager.append_to_fix_plan(item)
            return f"Added to fix_plan.md: - [ ] {item}"
        
        elif action == "complete":
            if not item:
                return "Error: item is required for 'complete' action"
            success = self.state_manager.complete_fix_plan_item(item)
            if success:
                return f"Marked as complete in fix_plan.md: - [x] {item}"
            else:
                return f"Warning: Could not find matching item to complete: {item}"
        
        elif action == "delete":
            if not item:
                return "Error: item is required for 'delete' action"
            success = self.state_manager.remove_pending_item(item)
            if success:
                return f"Deleted pending task from fix_plan.md: {item}"
            else:
                return (
                    f"Could not delete item: {item}. "
                    "Either the item was not found, or it's already completed (completed tasks cannot be deleted)."
                )
        
        elif action == "replace":
            if new_content is None:
                return "Error: new_content is required for 'replace' action"
            self.state_manager.update_fix_plan(new_content)
            return "fix_plan.md replaced with new content"
        
        return f"Error: Unknown action '{action}'. Use 'add', 'complete', 'delete', or 'replace'."
    
    @tool
    def update_spec(
        self,
        spec_name: str,
        content: str,
    ) -> str:
        """
        Update or create a specification file.
        
        Use this when you find inconsistencies or need to clarify requirements.
        Always keep specs as the Source of Truth.
        
        Args:
            spec_name: Name of the spec (e.g., "auth", "api")
            content: Full markdown content of the spec
            
        Returns:
            Confirmation message
        """
        self.state_manager.save_spec(spec_name, content)
        return f"Updated spec: specs/{spec_name}.md"