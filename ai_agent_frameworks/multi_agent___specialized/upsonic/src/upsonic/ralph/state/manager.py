"""
State manager for RalphLoop.

This module handles reading and writing state files that persist
across loop iterations.
"""

from __future__ import annotations

from pathlib import Path
from typing import Dict, List, Optional

from upsonic.ralph.state.models import RalphState


class StateManager:
    """
    Manages the deterministic stack (state files) for RalphLoop.
    
    State files are loaded fresh every iteration to provide clean context
    while persisting learnings and progress across iterations.
    
    Files managed:
        - PROMPT.md: Main instructions for the agent
        - specs/*.md: Specification files (one per feature/component)
        - fix_plan.md: TODO list (prioritized items to implement)
        - AGENT.md: Accumulated learnings
    """
    
    def __init__(self, workspace: Path):
        """
        Initialize StateManager.
        
        Args:
            workspace: Path to workspace directory
        """
        self.workspace = workspace
        self._ensure_workspace_exists()
    
    def _ensure_workspace_exists(self) -> None:
        """Create workspace and subdirectories if they don't exist."""
        self.workspace.mkdir(parents=True, exist_ok=True)
        self.specs_dir.mkdir(exist_ok=True)
        self.src_dir.mkdir(exist_ok=True)
    
    @property
    def specs_dir(self) -> Path:
        """Get specs directory path."""
        return self.workspace / "specs"
    
    @property
    def src_dir(self) -> Path:
        """Get source directory path."""
        return self.workspace / "src"
    
    @property
    def prompt_file(self) -> Path:
        """Get PROMPT.md file path."""
        return self.workspace / "PROMPT.md"
    
    @property
    def fix_plan_file(self) -> Path:
        """Get fix_plan.md file path."""
        return self.workspace / "fix_plan.md"
    
    @property
    def learnings_file(self) -> Path:
        """Get AGENT.md file path."""
        return self.workspace / "AGENT.md"
    
    def load_state(self) -> RalphState:
        """
        Load complete state from disk.
        
        Returns:
            RalphState containing all state file contents
        """
        prompt = self._read_file(self.prompt_file)
        specs = self._load_specs()
        fix_plan = self._read_file(self.fix_plan_file)
        learnings = self._read_file(self.learnings_file)
        
        return RalphState(
            prompt=prompt,
            specs=specs,
            fix_plan=fix_plan,
            learnings=learnings,
            workspace_path=self.workspace,
        )
    
    def _load_specs(self) -> Dict[str, str]:
        """
        Load all spec files from specs/ directory.
        
        Returns:
            Dictionary of spec_name -> content
        """
        specs: Dict[str, str] = {}
        
        if not self.specs_dir.exists():
            return specs
        
        for spec_file in self.specs_dir.glob("*.md"):
            spec_name = spec_file.stem
            specs[spec_name] = self._read_file(spec_file)
        
        return specs
    
    def _read_file(self, path: Path) -> str:
        """
        Read file content, returning empty string if file doesn't exist.
        
        Args:
            path: Path to file
            
        Returns:
            File content or empty string
        """
        if not path.exists():
            return ""
        return path.read_text(encoding="utf-8")
    
    def _write_file(self, path: Path, content: str) -> None:
        """
        Write content to file, creating parent directories if needed.
        
        Args:
            path: Path to file
            content: Content to write
        """
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
    
    def save_prompt(self, content: str) -> None:
        """
        Save content to PROMPT.md.
        
        Args:
            content: Prompt content
        """
        self._write_file(self.prompt_file, content)
    
    def save_spec(self, name: str, content: str) -> None:
        """
        Save a spec file.
        
        Args:
            name: Spec name (without .md extension)
            content: Spec content
        """
        if not name.endswith(".md"):
            name = f"{name}.md"
        spec_path = self.specs_dir / name
        self._write_file(spec_path, content)
    
    def update_fix_plan(self, content: str) -> None:
        """
        Replace fix_plan.md content.
        
        Args:
            content: New fix_plan content
        """
        self._write_file(self.fix_plan_file, content)
    
    def append_to_fix_plan(self, item: str) -> None:
        """
        Append an item to fix_plan.md with proper checkbox format.
        
        Args:
            item: TODO item to add (will be formatted as '- [ ] item')
        """
        current = self._read_file(self.fix_plan_file)
        if current and not current.endswith("\n"):
            current += "\n"
        
        # Normalize item format - remove any existing checkbox/bullet prefix
        normalized_item = item.strip()
        if normalized_item.startswith("- [ ] "):
            normalized_item = normalized_item[6:]
        elif normalized_item.startswith("- [x] ") or normalized_item.startswith("- [X] "):
            normalized_item = normalized_item[6:]
        elif normalized_item.startswith("- "):
            normalized_item = normalized_item[2:]
        elif normalized_item.startswith("* "):
            normalized_item = normalized_item[2:]
        
        new_content = f"{current}- [ ] {normalized_item}\n"
        self._write_file(self.fix_plan_file, new_content)
    
    def complete_fix_plan_item(self, item: str) -> bool:
        """
        Mark an item as completed in fix_plan.md by changing [ ] to [x].
        
        IMPORTANT: Does NOT remove items from the file. Items remain in place
        with [x] checkbox to maintain history and prevent confusion.
        
        Args:
            item: Item text to mark as complete (partial match supported)
            
        Returns:
            True if an item was marked complete, False if no match found
        """
        current = self._read_file(self.fix_plan_file)
        if not current:
            return False
        
        # Normalize the search item - extract just the task description
        search_text = item.strip().lower()
        # Remove common prefixes for matching
        for prefix in ["- [ ] ", "- [x] ", "- [X] ", "- ", "* "]:
            if search_text.startswith(prefix.lower()):
                search_text = search_text[len(prefix):]
                break
        
        lines = current.split("\n")
        updated_lines: List[str] = []
        found_match = False
        
        for line in lines:
            # Check if this line contains the item text and is unchecked
            if not found_match and search_text in line.lower():
                # Mark unchecked items as checked
                if "- [ ]" in line:
                    updated_line = line.replace("- [ ]", "- [x]", 1)
                    updated_lines.append(updated_line)
                    found_match = True
                elif line.strip().startswith("- ") and "[ ]" not in line and "[x]" not in line.lower():
                    # Handle lines like "- task" without checkbox
                    stripped = line.lstrip()
                    indent = line[:len(line) - len(stripped)]
                    task_text = stripped[2:].strip()
                    updated_lines.append(f"{indent}- [x] {task_text}")
                    found_match = True
                else:
                    updated_lines.append(line)
            else:
                updated_lines.append(line)
        
        if found_match:
            new_content = "\n".join(updated_lines)
            self._write_file(self.fix_plan_file, new_content)
        
        return found_match
    
    def remove_pending_item(self, item: str) -> bool:
        """
        Remove a PENDING (unchecked) item from fix_plan.md entirely.
        
        Use this when a task is no longer needed or was added by mistake.
        ONLY pending items (- [ ]) can be removed. Completed items (- [x])
        are protected and cannot be removed to preserve history.
        
        Args:
            item: Item text to remove (partial match supported)
            
        Returns:
            True if a pending item was removed, False if no match or item was completed
        """
        current = self._read_file(self.fix_plan_file)
        if not current:
            return False
        
        # Normalize the search item - extract just the task description
        search_text = item.strip().lower()
        for prefix in ["- [ ] ", "- [x] ", "- [X] ", "- ", "* "]:
            if search_text.startswith(prefix.lower()):
                search_text = search_text[len(prefix):]
                break
        
        lines = current.split("\n")
        new_lines: List[str] = []
        found_and_removed = False
        
        for line in lines:
            line_lower = line.lower()
            
            # Check if this line matches the search text
            if not found_and_removed and search_text in line_lower:
                # Only remove if it's a PENDING item (has [ ] checkbox or no checkbox at all)
                stripped = line.strip()
                
                # Completed items cannot be removed - they are protected
                if stripped.startswith("- [x] ") or stripped.startswith("- [X] "):
                    new_lines.append(line)  # Keep completed items
                # Pending items can be removed
                elif stripped.startswith("- [ ] "):
                    found_and_removed = True  # Skip this line (remove it)
                # Legacy format without checkbox - treat as pending, allow removal
                elif stripped.startswith("- ") or stripped.startswith("* "):
                    found_and_removed = True  # Skip this line (remove it)
                else:
                    new_lines.append(line)
            else:
                new_lines.append(line)
        
        if found_and_removed:
            # Clean up any double blank lines that might result from removal
            new_content = "\n".join(new_lines)
            # Remove trailing whitespace but keep the file ending with newline
            new_content = new_content.rstrip() + "\n" if new_content.strip() else ""
            self._write_file(self.fix_plan_file, new_content)
        
        return found_and_removed
    
    def update_learnings(self, content: str) -> None:
        """
        Replace AGENT.md content.
        
        Args:
            content: New learnings content
        """
        self._write_file(self.learnings_file, content)
    
    def append_learning(self, learning: str, category: str = "pattern") -> None:
        """
        Append a learning to AGENT.md.
        
        Args:
            learning: What was learned
            category: Category (build, test, pattern, gotcha)
        """
        current = self._read_file(self.learnings_file)
        if current and not current.endswith("\n"):
            current += "\n"
        
        new_content = f"{current}\n## {category.upper()}\n- {learning}\n"
        self._write_file(self.learnings_file, new_content)
    
    def read_learnings(self) -> str:
        """
        Read current learnings from AGENT.md.
        
        Returns:
            Learnings content
        """
        return self._read_file(self.learnings_file)
    
    def has_specs(self) -> bool:
        """
        Check if any spec files exist.
        
        Returns:
            True if at least one spec file exists
        """
        if not self.specs_dir.exists():
            return False
        return any(self.specs_dir.glob("*.md"))
    
    def has_fix_plan(self) -> bool:
        """
        Check if fix_plan.md exists and has content.
        
        Returns:
            True if fix_plan has content
        """
        return bool(self._read_file(self.fix_plan_file).strip())
    
    def get_spec_names(self) -> List[str]:
        """
        Get list of spec file names.
        
        Returns:
            List of spec names (without .md extension)
        """
        if not self.specs_dir.exists():
            return []
        return [f.stem for f in self.specs_dir.glob("*.md")]
