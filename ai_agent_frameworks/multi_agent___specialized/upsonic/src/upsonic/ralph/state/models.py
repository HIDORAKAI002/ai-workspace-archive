"""
State models for RalphLoop.

This module contains Pydantic models representing the state files
that persist across loop iterations.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field, ConfigDict


class RalphState(BaseModel):
    """
    Represents the complete state of a RalphLoop execution.
    
    This state is loaded fresh at the start of each iteration from disk,
    ensuring each iteration has clean context while preserving learnings.
    
    Attributes:
        prompt: Content of PROMPT.md (main instructions)
        specs: Dictionary of spec filename -> content
        fix_plan: Content of fix_plan.md (TODO list)
        learnings: Content of AGENT.md (accumulated learnings)
        workspace_path: Path to the workspace directory
    """
    
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    prompt: str = Field(default="", description="PROMPT.md content")
    specs: Dict[str, str] = Field(default_factory=dict, description="specs/*.md contents")
    fix_plan: str = Field(default="", description="fix_plan.md content")
    learnings: str = Field(default="", description="AGENT.md content")
    workspace_path: Path = Field(description="Workspace directory path")
    
    def format_specs_for_context(self) -> str:
        """
        Format all specs for inclusion in agent context.
        
        Returns:
            Formatted string with all specs
        """
        if not self.specs:
            return "No specifications defined yet."
        
        formatted_parts: List[str] = []
        for spec_name, spec_content in sorted(self.specs.items()):
            formatted_parts.append(f"### {spec_name}\n{spec_content}")
        
        return "\n\n".join(formatted_parts)
    
    def format_for_context(self) -> str:
        """
        Format complete state for agent context.
        
        Returns:
            Formatted string containing specs, fix_plan, and learnings
        """
        sections: List[str] = []
        
        sections.append("## SPECIFICATIONS")
        sections.append(self.format_specs_for_context())
        
        # Include pending count to help agent understand remaining work
        pending_count = len(self.get_pending_items())
        completed_count = len(self.get_completed_items())
        
        sections.append(f"\n## TODO LIST ({pending_count} pending, {completed_count} completed)")
        sections.append("Format: `- [ ]` = pending (do these), `- [x]` = completed (skip these)")
        sections.append("")
        sections.append(self.fix_plan if self.fix_plan else "No items in TODO list.")
        
        if self.learnings:
            sections.append("\n## LEARNINGS (from previous iterations)")
            sections.append(self.learnings)
        
        return "\n".join(sections)
    
    def get_todo_items(self, include_completed: bool = False) -> List[str]:
        """
        Parse fix_plan.md into list of TODO items.
        
        By default, only returns unchecked/pending items (- [ ] format).
        Completed items (- [x] format) are excluded unless include_completed=True.
        
        Args:
            include_completed: If True, include completed items as well
        
        Returns:
            List of pending TODO items (or all items if include_completed=True)
        """
        if not self.fix_plan:
            return []
        
        items: List[str] = []
        for line in self.fix_plan.split("\n"):
            stripped = line.strip()
            
            # Check for checkbox format: - [ ] or - [x]
            if stripped.startswith("- ["):
                # Completed items: - [x] or - [X]
                if stripped.startswith("- [x] ") or stripped.startswith("- [X] "):
                    if include_completed:
                        items.append(stripped[6:].strip())
                    # Skip completed items otherwise
                # Pending items: - [ ]
                elif stripped.startswith("- [ ] "):
                    items.append(stripped[6:].strip())
            # Legacy format without checkbox: - item or * item
            elif stripped.startswith("- ") or stripped.startswith("* "):
                # Items without checkbox are considered pending
                items.append(stripped[2:].strip())
            # Numbered format: 1. item
            elif re.match(r"^\d+\.\s+", stripped):
                item = re.sub(r"^\d+\.\s+", "", stripped)
                items.append(item)
        
        return items
    
    def get_pending_items(self) -> List[str]:
        """
        Get only pending (unchecked) TODO items.
        
        Returns:
            List of pending TODO items
        """
        return self.get_todo_items(include_completed=False)
    
    def get_completed_items(self) -> List[str]:
        """
        Get only completed (checked) TODO items.
        
        Returns:
            List of completed TODO items
        """
        if not self.fix_plan:
            return []
        
        completed: List[str] = []
        for line in self.fix_plan.split("\n"):
            stripped = line.strip()
            if stripped.startswith("- [x] ") or stripped.startswith("- [X] "):
                completed.append(stripped[6:].strip())
        
        return completed
    
    def is_plan_empty(self) -> bool:
        """
        Check if no more pending TODO items remain.
        
        Returns:
            True if fix_plan has no pending (unchecked) items
        """
        return len(self.get_pending_items()) == 0
    
    def get_spec_names(self) -> List[str]:
        """
        Get list of spec file names.
        
        Returns:
            List of spec names (without .md extension)
        """
        return list(self.specs.keys())
    
    def has_specs(self) -> bool:
        """
        Check if any specs are defined.
        
        Returns:
            True if at least one spec exists
        """
        return len(self.specs) > 0
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Serialize state to dictionary.
        
        Returns:
            Dictionary representation of state
        """
        return {
            "prompt": self.prompt,
            "specs": self.specs,
            "fix_plan": self.fix_plan,
            "learnings": self.learnings,
            "workspace_path": str(self.workspace_path),
            "todo_count": len(self.get_todo_items()),
            "specs_count": len(self.specs),
        }
