import json
import logging
import os
import threading
from typing import List, Optional, Dict, Any
from pathlib import Path
from datetime import datetime

import portalocker

from .models import ThoughtData, ThoughtStage
from .logging_conf import configure_logging
from .storage_utils import prepare_thoughts_for_serialization, save_thoughts_to_file, load_thoughts_from_file

logger = configure_logging("sequential-thinking.storage")


class ThoughtStorage:
    """Storage manager for thought data."""

    def __init__(self, storage_dir: Optional[str] = None):
        """Initialize the storage manager.

        Args:
            storage_dir: Directory to store thought data files. If None, uses a default directory.
        """
        if storage_dir is None:
            # Use user's home directory by default
            home_dir = Path.home()
            self.storage_dir = home_dir / ".mcp_sequential_thinking"
        else:
            self.storage_dir = Path(storage_dir)

        # Create storage directory if it doesn't exist
        self.storage_dir.mkdir(parents=True, exist_ok=True)

        # Default session file
        self.current_session_file = self.storage_dir / "current_session.json"
        self.lock_file = self.storage_dir / "current_session.lock"

        # Thread safety
        self._lock = threading.RLock()
        self.thought_history: List[ThoughtData] = []

        # Load existing session if available
        self._load_session()

    def _load_session(self) -> None:
        """Load thought history from the current session file if it exists."""
        with self._lock:
            # Use the utility function to handle loading with proper error handling
            self.thought_history = load_thoughts_from_file(self.current_session_file, self.lock_file)

    def _save_session(self) -> None:
        """Save the current thought history to the session file."""
        # Use thread lock to ensure consistent data
        with self._lock:
            # Use utility functions to prepare and save thoughts
            thoughts_with_ids = prepare_thoughts_for_serialization(self.thought_history)
        
        # Save to file with proper locking
        save_thoughts_to_file(self.current_session_file, thoughts_with_ids, self.lock_file)

    def add_thought(self, thought: ThoughtData) -> None:
        """Add a thought to the history and save the session.

        Args:
            thought: The thought data to add
        """
        with self._lock:
            self.thought_history.append(thought)
        self._save_session()

    def get_all_thoughts(self) -> List[ThoughtData]:
        """Get all thoughts in the current session.

        Returns:
            List[ThoughtData]: All thoughts in the current session
        """
        with self._lock:
            # Return a copy to avoid external modification
            return list(self.thought_history)

    def get_thoughts_by_stage(self, stage: ThoughtStage) -> List[ThoughtData]:
        """Get all thoughts in a specific stage.

        Args:
            stage: The thinking stage to filter by

        Returns:
            List[ThoughtData]: Thoughts in the specified stage
        """
        with self._lock:
            return [t for t in self.thought_history if t.stage == stage]

    def clear_history(self) -> None:
        """Clear the thought history and save the empty session."""
        with self._lock:
            self.thought_history.clear()
        self._save_session()

    def export_session(self, file_path: str) -> None:
        """Export the current session to a file.

        Args:
            file_path: Path to save the exported session
        """
        with self._lock:
            # Use utility function to prepare thoughts for serialization
            thoughts_with_ids = prepare_thoughts_for_serialization(self.thought_history)
            
            # Create export-specific metadata
            metadata = {
                "exportedAt": datetime.now().isoformat(),
                "metadata": {
                    "totalThoughts": len(self.thought_history),
                    "stages": {
                        stage.value: len([t for t in self.thought_history if t.stage == stage])
                        for stage in ThoughtStage
                    }
                }
            }
        
        # Convert string path to Path object for compatibility with utility
        file_path_obj = Path(file_path)
        lock_file = file_path_obj.with_suffix('.lock')
        
        # Use utility function to save with proper locking
        save_thoughts_to_file(file_path_obj, thoughts_with_ids, lock_file, metadata)

    def import_session(self, file_path: str) -> None:
        """Import a session from a file.

        Args:
            file_path: Path to the file to import

        Raises:
            FileNotFoundError: If the file doesn't exist
            json.JSONDecodeError: If the file is not valid JSON
            KeyError: If the file doesn't contain valid thought data
        """
        # Convert string path to Path object for compatibility with utility
        file_path_obj = Path(file_path)
        lock_file = file_path_obj.with_suffix('.lock')
        
        # Use utility function to load thoughts with proper error handling
        thoughts = load_thoughts_from_file(file_path_obj, lock_file)
        
        with self._lock:
            self.thought_history = thoughts

        self._save_session()
