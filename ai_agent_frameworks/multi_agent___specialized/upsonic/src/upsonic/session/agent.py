from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Mapping, Optional, Union, TYPE_CHECKING

from upsonic.messages.messages import ModelMessage
from upsonic.run.agent.output import AgentRunOutput
from upsonic.run.base import RunStatus
from upsonic.utils.logging_config import get_logger
from upsonic.session.base import SessionType

if TYPE_CHECKING:
    from upsonic.storage.base import Storage
    from upsonic.run.agent.input import AgentRunInput
    from upsonic.usage import RunUsage

_logger = get_logger("upsonic.session")



@dataclass
class RunData:
    """Container for run output - stored in AgentSession.
    
    AgentRunOutput is now the single source of truth for all run state,
    including execution context needed for HITL resumption.
    """
    output: AgentRunOutput
    deserialize_flag: bool = False
    
    def to_dict(self, serialize_flag: bool = False) -> Dict[str, Any]:
        """Serialize to dictionary."""
        return {
            "output": self.output.to_dict(serialize_flag=serialize_flag) if self.output else None,
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any], deserialize_flag: bool = False) -> "RunData":
        """Reconstruct from dictionary."""
        output = None
        
        output_data = data.get("output")
        if output_data:
            if isinstance(output_data, dict):
                output = AgentRunOutput.from_dict(output_data, deserialize_flag=deserialize_flag)
            else:
                output = output_data
        
        return cls(output=output, deserialize_flag=deserialize_flag)


@dataclass
class AgentSession:
    """Agent Session that is stored in the database."""

    session_id: str
    agent_id: Optional[str] = None
    team_id: Optional[str] = None
    workflow_id: Optional[str] = None
    user_id: Optional[str] = None

    session_type: SessionType = SessionType.AGENT

    session_data: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None
    agent_data: Optional[Dict[str, Any]] = None

    runs: Optional[Dict[str, RunData]] = field(default_factory=dict)
    
    summary: Optional[str] = None
    messages: Optional[Union[List[ModelMessage]]] = field(default_factory=list)
    
    # Session-level aggregated usage (sum of all run usages)
    usage: Optional["RunUsage"] = None

    created_at: Optional[int] = None
    updated_at: Optional[int] = None
    
    def to_dict(self, serialize_flag: bool = False) -> Dict[str, Any]:
        """
        Convert to dictionary.
        
        Args:
            serialize_flag: Passed to RunData.to_dict for Task cloudpickle serialization.
        
        Uses ModelMessagesTypeAdapter for messages serialization.
        """
        from upsonic.messages.messages import ModelMessagesTypeAdapter
        
        runs_dict = {}
        if self.runs:
            for run_id, run_data in self.runs.items():
                runs_dict[run_id] = run_data.to_dict(serialize_flag=serialize_flag)
        
        # Handle messages with ModelMessagesTypeAdapter
        if self.messages and isinstance(self.messages, list):
            # Check if it's a list of ModelMessage (not dicts)
            if self.messages and not isinstance(self.messages[0], dict):
                messages_data = ModelMessagesTypeAdapter.dump_python(self.messages, mode="json")
            else:
                messages_data = self.messages
        else:
            messages_data = self.messages
        
        # Serialize usage
        usage_data = None
        if self.usage is not None:
            usage_data = self.usage.to_dict()
        
        return {
            "session_id": self.session_id,
            "agent_id": self.agent_id,
            "user_id": self.user_id,
            "team_id": self.team_id,
            "workflow_id": self.workflow_id,
            "session_type": self.session_type.to_dict(),
            "session_data": self.session_data,
            "metadata": self.metadata,
            "agent_data": self.agent_data,
            "summary": self.summary,
            "messages": messages_data,
            "usage": usage_data,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "runs": runs_dict,
        }

    @classmethod
    def from_dict(cls, data: Mapping[str, Any], deserialize_flag: bool = False) -> Optional["AgentSession"]:
        """
        Reconstruct from dictionary.
        
        Args:
            data: Dictionary containing AgentSession data
            deserialize_flag: Passed to RunData.from_dict for Task cloudpickle deserialization.
        
        Uses ModelMessagesTypeAdapter for messages deserialization.
        """
        from upsonic.messages.messages import ModelMessagesTypeAdapter
        
        if data is None or data.get("session_id") is None:
            _logger.warning("AgentSession is missing session_id")
            return None

        # Handle runs (dict of run_id -> RunData)
        runs_data = data.get("runs", {})
        runs: Dict[str, RunData] = {}
        
        for run_id, run_data in runs_data.items():
            if isinstance(run_data, RunData):
                runs[run_id] = run_data
            elif isinstance(run_data, dict):
                try:
                    runs[run_id] = RunData.from_dict(run_data, deserialize_flag=deserialize_flag)
                except Exception as e:
                    _logger.warning(f"Failed to deserialize run {run_id}: {e}")
            else:
                _logger.warning(f"Unknown run data type for {run_id}: {type(run_data)}")
        
        # Handle messages with ModelMessagesTypeAdapter
        messages_data = data.get("messages")
        if messages_data and isinstance(messages_data, list):
            messages = ModelMessagesTypeAdapter.validate_python(messages_data)
        else:
            messages = messages_data
        
        # Handle usage (dict or RunUsage)
        from upsonic.usage import RunUsage
        usage_data = data.get("usage")
        usage = None
        if usage_data and isinstance(usage_data, dict):
            usage = RunUsage.from_dict(usage_data)
        elif isinstance(usage_data, RunUsage):
            usage = usage_data

        return cls(
            session_id=data.get("session_id"),
            agent_id=data.get("agent_id"),
            user_id=data.get("user_id"),
            team_id=data.get("team_id"),
            workflow_id=data.get("workflow_id"),
            session_type=SessionType.from_dict(data.get("session_type")),
            agent_data=data.get("agent_data"),
            session_data=data.get("session_data"),
            metadata=data.get("metadata"),
            messages=messages,
            usage=usage,
            created_at=data.get("created_at"),
            updated_at=data.get("updated_at"),
            runs=runs if runs else None,
            summary=data.get("summary"),
        )

    
    def upsert_run(self, output: AgentRunOutput) -> None:
        """
        Upsert a run into the session.
        
        Adds or updates a run in self.runs dict. Messages are set separately
        via populate_from_run_output() which uses output.chat_history.
        
        Args:
            output: AgentRunOutput to store (single source of truth for all run state)
        """
        if output is None:
            return
        
        run_id = output.run_id
        if not run_id:
            _logger.warning("Cannot upsert run without run_id")
            return
        
        # Initialize runs dict if needed
        if self.runs is None:
            self.runs = {}
        
        # Create or update RunData
        if run_id in self.runs:
            # Update existing
            self.runs[run_id] = RunData(output=output)
            _logger.debug(f"Updated run: {run_id}")
        else:
            self.runs[run_id] = RunData(output=output)
            _logger.debug(f"Added run (total: {len(self.runs)})")
    
    def flatten_messages_from_completed_runs(self) -> None:
        """Flatten messages from completed runs."""
        if not self.runs:
            self.messages = []
            return
        
        all_messages = []
        for run_data in self.runs.values():
            # Only include completed runs
            if run_data.output and getattr(run_data.output, 'status', None) == RunStatus.completed:
                if run_data.output.messages:
                    all_messages.extend(run_data.output.messages)
        return all_messages

    def get_run(self, run_id: str) -> Optional[AgentRunOutput]:
        """Get run output by run_id."""
        if not self.runs or run_id not in self.runs:
            return None
        return self.runs[run_id].output
    
    def get_run_data(self, run_id: str) -> Optional[RunData]:
        """Get full RunData by run_id."""
        if not self.runs or run_id not in self.runs:
            return None
        return self.runs[run_id]
    
    def get_last_run(self) -> Optional[AgentRunOutput]:
        """Get the most recently added run output."""
        if not self.runs:
            return None
        # Dict preserves insertion order in Python 3.7+
        last_run_id = list(self.runs.keys())[-1]
        return self.runs[last_run_id].output
    
    def get_last_run_data(self) -> Optional[RunData]:
        """Get the most recently added RunData."""
        if not self.runs:
            return None
        last_run_id = list(self.runs.keys())[-1]
        return self.runs[last_run_id]
    
    def get_run_count(self) -> int:
        return len(self.runs) if self.runs else 0
    
    def clear_runs(self) -> None:
        self.runs = {}
    
    def get_paused_runs(self) -> List[RunData]:
        """Get all paused runs (for HITL). Returns RunData for access to both output and context."""
        if not self.runs:
            return []
        
        return [
            run_data for run_data in self.runs.values() 
            if run_data.output and getattr(run_data.output, 'status', None) == RunStatus.paused
        ]
    
    def get_error_runs(self) -> List[RunData]:
        """Get all error runs (for durable execution). Returns RunData for access to both output and context."""
        if not self.runs:
            return []
        
        return [
            run_data for run_data in self.runs.values() 
            if run_data.output and getattr(run_data.output, 'status', None) == RunStatus.error
        ]
    
    def get_cancelled_runs(self) -> List[RunData]:
        """Get all cancelled runs (for cancel resumption). Returns RunData for access to both output and context."""
        if not self.runs:
            return []
        
        return [
            run_data for run_data in self.runs.values() 
            if run_data.output and getattr(run_data.output, 'status', None) == RunStatus.cancelled
        ]
    
    def get_resumable_runs(self) -> List[RunData]:
        """Get all resumable runs (paused, error, or cancelled). Returns RunData for HITL resumption."""
        if not self.runs:
            return []
        
        resumable_statuses = {RunStatus.paused, RunStatus.error, RunStatus.cancelled}
        return [
            run_data for run_data in self.runs.values() 
            if run_data.output and getattr(run_data.output, 'status', None) in resumable_statuses
        ]
    
    def get_messages_by_run_id(self, run_id: str) -> List[ModelMessage]:
        """
        Get messages from a specific run by run_id.
        
        Args:
            run_id: The run_id to get messages for
            
        Returns:
            List of ModelMessage from the specified run, or empty list if run not found
        """
        run = self.get_run(run_id)
        if run and run.messages:
            return run.messages.copy()
        return []
    
    # ==================== REUSABLE HELPER METHODS ====================
    
    @staticmethod
    def _extract_messages_from_runs(
        runs: Optional[Dict[str, RunData]],
        exclude_run_id: Optional[str] = None
    ) -> List[ModelMessage]:
        """
        Extract all messages from runs, optionally excluding a specific run_id.
        
        Args:
            runs: Dict of run_id -> RunData
            exclude_run_id: Optional run_id to exclude
            
        Returns:
            List of ModelMessage from all runs (excluding specified run_id if provided)
        """
        if not runs:
            return []
        
        messages = []
        for run_id, run_data in runs.items():
            # Skip the excluded run_id if specified
            if exclude_run_id and run_id == exclude_run_id:
                continue
            
            # Get messages from output
            if run_data.output and run_data.output.messages:
                messages.extend(run_data.output.messages)
        
        return messages
    
    @staticmethod
    def _extract_user_prompts_from_messages(messages: List[ModelMessage]) -> List[str]:
        """
        Extract user prompt content strings from a list of messages.
        
        Args:
            messages: List of ModelMessage objects
            
        Returns:
            List of user prompt content strings
        """
        from upsonic.messages.messages import ModelRequest, UserPromptPart
        
        user_prompts = []
        for message in messages:
            if isinstance(message, ModelRequest):
                for part in message.parts:
                    if isinstance(part, UserPromptPart):
                        user_prompts.append(part.content)
        
        return user_prompts
    
    @staticmethod
    def _extract_messages_from_session(
        session: "AgentSession",
        exclude_run_id: Optional[str] = None
    ) -> List[ModelMessage]:
        """
        Extract all messages from a session, optionally excluding a specific run_id.
        
        Args:
            session: AgentSession object
            exclude_run_id: Optional run_id to exclude
            
        Returns:
            List of ModelMessage from the session
        """
        if not session:
            return []
        
        # If we need to exclude a run_id, we MUST extract from runs (not from session.messages)
        # because session.messages is flattened and doesn't preserve run boundaries
        if exclude_run_id:
            if session.runs:
                return AgentSession._extract_messages_from_runs(session.runs, exclude_run_id)
            # If no runs but exclude_run_id is provided, return empty (can't exclude from flattened messages)
            return []
        
        # If no exclusion needed, use session.messages if available (flattened), otherwise extract from runs
        if session.messages:
            return session.messages.copy()
        
        # Fallback to extracting from runs
        if session.runs:
            return AgentSession._extract_messages_from_runs(session.runs, exclude_run_id)
        
        return []
    
    @classmethod
    async def _get_sessions_by_user_id_async(
        cls,
        storage: "Storage",
        user_id: str
    ) -> List["AgentSession"]:
        """
        Get all sessions for a user_id.
        
        Args:
            storage: Storage instance to query
            user_id: The user_id to get sessions for
            
        Returns:
            List of AgentSession objects for the user_id
        """
        from upsonic.session.base import SessionType
        from upsonic.storage.base import AsyncStorage
        
        if isinstance(storage, AsyncStorage):
            sessions = await storage.aget_sessions(
                user_id=user_id,
                session_type=SessionType.AGENT,
                deserialize=True
            )
        else:
            sessions = storage.get_sessions(
                user_id=user_id,
                session_type=SessionType.AGENT,
                deserialize=True
            )
        
        if isinstance(sessions, list):
            return sessions
        return []
    
    @classmethod
    async def _get_session_by_session_id_async(
        cls,
        storage: "Storage",
        session_id: str
    ) -> Optional["AgentSession"]:
        """
        Get a session by session_id.
        
        Args:
            storage: Storage instance to query
            session_id: The session_id to get
            
        Returns:
            AgentSession object or None if not found
        """
        from upsonic.session.base import SessionType
        from upsonic.storage.base import AsyncStorage
        
        if isinstance(storage, AsyncStorage):
            return await storage.aget_session(
                session_id=session_id,
                session_type=SessionType.AGENT,
                deserialize=True
            )
        else:
            return storage.get_session(
                session_id=session_id,
                session_type=SessionType.AGENT,
                deserialize=True
            )
    
    # ==================== PUBLIC HELPER METHODS ====================
    
    @classmethod
    async def get_all_messages_for_session_id_async(
        cls,
        storage: "Storage",
        session_id: str,
        exclude_run_id: Optional[str] = None
    ) -> List[ModelMessage]:
        """
        Get all messages from a session by session_id (all runs in that session).
        
        Args:
            storage: Storage instance to query
            session_id: The session_id to get messages for
            exclude_run_id: Optional run_id to exclude
            
        Returns:
            List of all ModelMessage from all runs in the session
        """
        session = await cls._get_session_by_session_id_async(storage, session_id)
        return cls._extract_messages_from_session(session, exclude_run_id)
    
    @classmethod
    def get_all_messages_for_session_id(
        cls,
        storage: "Storage",
        session_id: str,
        exclude_run_id: Optional[str] = None
    ) -> List[ModelMessage]:
        """Synchronous version of get_all_messages_for_session_id_async."""
        import asyncio
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(asyncio.run, cls.get_all_messages_for_session_id_async(storage, session_id, exclude_run_id)).result()
        except RuntimeError:
            return asyncio.run(cls.get_all_messages_for_session_id_async(storage, session_id, exclude_run_id))
    
    @classmethod
    async def get_all_user_prompt_messages_for_user_id_async(
        cls,
        storage: "Storage",
        user_id: str,
        exclude_run_id: Optional[str] = None
    ) -> List[str]:
        """
        Get all user prompt content from all sessions for a user_id.
        
        Args:
            storage: Storage instance to query
            user_id: The user_id to get messages for
            exclude_run_id: Optional run_id to exclude (e.g., current run)
            
        Returns:
            List of user prompt content strings from all sessions for the user_id
        """
        # Get all sessions for this user_id
        all_sessions = await cls._get_sessions_by_user_id_async(storage, user_id)
        
        # Extract messages from all sessions (excluding specified run_id)
        all_messages = []
        for session in all_sessions:
            session_messages = cls._extract_messages_from_session(session, exclude_run_id)
            all_messages.extend(session_messages)
        
        # Extract user prompts from all messages
        return cls._extract_user_prompts_from_messages(all_messages)
    
    @classmethod
    def get_all_user_prompt_messages_for_user_id(
        cls,
        storage: "Storage",
        user_id: str,
        exclude_run_id: Optional[str] = None
    ) -> List[str]:
        """Synchronous version of get_all_user_prompt_messages_for_user_id_async."""
        import asyncio
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(asyncio.run, cls.get_all_user_prompt_messages_for_user_id_async(storage, user_id, exclude_run_id)).result()
        except RuntimeError:
            return asyncio.run(cls.get_all_user_prompt_messages_for_user_id_async(storage, user_id, exclude_run_id))
    
    @classmethod
    async def get_messages_for_run_id_async(
        cls,
        storage: "Storage",
        session_id: str,
        run_id: str
    ) -> List[ModelMessage]:
        """
        Get all messages from a specific run_id within a session.
        
        Args:
            storage: Storage instance to query
            session_id: The session_id containing the run
            run_id: The run_id to get messages for
            
        Returns:
            List of ModelMessage from the specified run
        """
        session = await cls._get_session_by_session_id_async(storage, session_id)
        if not session or not session.runs:
            return []
        
        run_data = session.runs.get(run_id)
        if run_data and run_data.output and run_data.output.messages:
            return run_data.output.messages.copy()
        
        return []
    
    @classmethod
    def get_messages_for_run_id(
        cls,
        storage: "Storage",
        session_id: str,
        run_id: str
    ) -> List[ModelMessage]:
        """Synchronous version of get_messages_for_run_id_async."""
        import asyncio
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(asyncio.run, cls.get_messages_for_run_id_async(storage, session_id, run_id)).result()
        except RuntimeError:
            return asyncio.run(cls.get_messages_for_run_id_async(storage, session_id, run_id))

    def get_messages(
        self,
        agent_id: Optional[str] = None,
        last_n_runs: Optional[int] = None,
        limit: Optional[int] = None,
        skip_roles: Optional[List[str]] = None,
        skip_statuses: Optional[List[RunStatus]] = None,
        include_paused: bool = False,
    ) -> List[ModelMessage]:
        """
        Get messages from session runs.
        
        Args:
            agent_id: Filter by agent ID
            last_n_runs: Only include last N runs
            limit: Max messages to return
            skip_roles: Roles to skip (e.g., ["system", "tool", "user", "assistant"])
            skip_statuses: Run statuses to skip
            include_paused: Include paused runs (for HITL resumption)
        """
        from upsonic.messages.messages import (
            ModelRequest, ModelResponse, SystemPromptPart, ToolReturnPart
        )
        
        if not self.runs:
            return []

        # Default: Skip paused/cancelled/error runs
        if skip_statuses is None:
            skip_statuses = [RunStatus.cancelled, RunStatus.error]
            if not include_paused:
                skip_statuses.append(RunStatus.paused)

        # Filter runs - get outputs from RunData
        run_outputs = []
        for run_data in self.runs.values():
            output = run_data.output
            if output is None:
                continue
            if getattr(output, 'parent_run_id', None) is not None:  # Skip child runs
                continue
            if getattr(output, 'status', None) in skip_statuses:
                continue
            run_outputs.append(output)
        
        if agent_id:
            run_outputs = [r for r in run_outputs if getattr(r, 'agent_id', None) == agent_id]
        
        if last_n_runs is not None:
            run_outputs = run_outputs[-last_n_runs:]

        # Collect messages
        result: List[ModelMessage] = []
        system_msg = None
        skip_roles = skip_roles or []

        for run in run_outputs:
            for msg in (run.messages or []):
                # Handle system messages - keep first one separate
                if isinstance(msg, ModelRequest):
                    has_system = any(isinstance(p, SystemPromptPart) for p in msg.parts)
                    if has_system and system_msg is None:
                        system_msg = msg
                        continue
                    
                    # Check if it's a tool return message
                    is_tool_return = any(isinstance(p, ToolReturnPart) for p in msg.parts)
                    if is_tool_return and 'tool' in skip_roles:
                        continue
                    if not is_tool_return and 'user' in skip_roles:
                        continue
                
                elif isinstance(msg, ModelResponse):
                    if 'assistant' in skip_roles:
                        continue
                
                result.append(msg)

        # Apply limit
        if limit and limit > 0:
            result = result[-limit:]
            # Remove leading tool returns
            while result and isinstance(result[0], ModelRequest):
                if any(isinstance(p, ToolReturnPart) for p in result[0].parts):
                    result.pop(0)
                else:
                    break

        _logger.debug(f"Retrieved {len(result)} messages")
        return result

    def get_chat_history(self, last_n_runs: Optional[int] = None) -> List[ModelMessage]:
        """Get chat history (skips system and tool messages)."""
        return self.get_messages(skip_roles=["system", "tool"], last_n_runs=last_n_runs)

    def get_tool_calls(self, num_calls: Optional[int] = None) -> List[Dict[str, Any]]:
        tool_calls: List[Dict[str, Any]] = []
        
        if not self.runs:
            return tool_calls

        # Iterate in reverse order (most recent first)
        for run_id in reversed(list(self.runs.keys())):
            run_data = self.runs[run_id]
            if not run_data.output:
                continue
            messages = getattr(run_data.output, 'messages', None) or []
            for message in messages:
                message_tool_calls = getattr(message, 'tool_calls', None)
                if message_tool_calls:
                    for tool_call in message_tool_calls:
                        tool_calls.append(tool_call)
                        if num_calls and len(tool_calls) >= num_calls:
                            return tool_calls
        
        return tool_calls

    def get_session_summary(self) -> Optional[str]:
        return self.summary
    
    # ==================== USAGE METHODS ====================
    
    def get_session_usage(self) -> "RunUsage":
        """Get the session-level aggregated usage.
        
        Returns the stored session usage, or computes it by aggregating
        usage from all runs if not yet set.
        
        Returns:
            RunUsage with aggregated metrics from all runs in this session.
        """
        from upsonic.usage import RunUsage
        
        # If we have a stored usage, return it
        if self.usage is not None:
            return self.usage
        
        # Otherwise, compute from runs
        return self._compute_usage_from_runs()
    
    def _compute_usage_from_runs(self) -> "RunUsage":
        """Compute aggregated usage from all runs.
        
        Returns:
            RunUsage with aggregated metrics.
        """
        from upsonic.usage import RunUsage
        
        aggregated = RunUsage()
        
        if not self.runs:
            return aggregated
        
        for run_data in self.runs.values():
            if run_data.output and run_data.output.usage:
                aggregated = aggregated + run_data.output.usage
        
        return aggregated
    
    def update_usage_from_run(self, run_output: AgentRunOutput) -> None:
        """Update session usage by adding run's usage.
        
        This method adds the run's usage to the session-level aggregated usage.
        Should be called after each run completes.
        
        Args:
            run_output: The AgentRunOutput with usage to add.
        """
        from upsonic.usage import RunUsage
        
        if run_output is None or run_output.usage is None:
            return
        
        if self.usage is None:
            self.usage = RunUsage()
        
        self.usage = self.usage + run_output.usage
    
    def reset_usage(self) -> None:
        """Reset the session usage to zero.
        
        Use this to clear accumulated usage, e.g., after billing.
        """
        from upsonic.usage import RunUsage
        self.usage = RunUsage()

    def update_metadata(self, key: str, value: Any) -> None:
        if self.metadata is None:
            self.metadata = {}
        self.metadata[key] = value

    def get_metadata(self, key: str, default: Any = None) -> Any:
        if not self.metadata:
            return default
        return self.metadata.get(key, default)
    
    def update_agent_data(
        self,
        agent_name: Optional[str] = None,
        model_name: Optional[str] = None,
    ) -> None:
        """
        Update agent_data with agent name and model name.
        
        Args:
            agent_name: The name of the agent
            model_name: The model name (e.g., "openai/gpt-4o")
        """
        if self.agent_data is None:
            self.agent_data = {}
        
        if agent_name is not None:
            self.agent_data["agent_name"] = agent_name
        if model_name is not None:
            self.agent_data["model_name"] = model_name
    
    def add_input_to_session_data(
        self,
        user_prompt: Optional[str] = None,
        image_identifiers: Optional[List[str]] = None,
        document_identifiers: Optional[List[str]] = None,
    ) -> None:
        """
        Add input data references to session_data.
        
        This accumulates input references over multiple runs. Stores:
        - user_prompts: List of user prompt strings
        - image_identifiers: List of image file paths/identifiers
        - document_identifiers: List of document file paths/identifiers
        
        Args:
            user_prompt: The user prompt text for this run
            image_identifiers: List of image file paths/identifiers
            document_identifiers: List of document file paths/identifiers
        """
        if self.session_data is None:
            self.session_data = {
                "user_prompts": [],
                "image_identifiers": [],
                "document_identifiers": [],
            }
        
        # Ensure lists exist
        if "user_prompts" not in self.session_data:
            self.session_data["user_prompts"] = []
        if "image_identifiers" not in self.session_data:
            self.session_data["image_identifiers"] = []
        if "document_identifiers" not in self.session_data:
            self.session_data["document_identifiers"] = []
        
        # Add user prompt
        if user_prompt is not None:
            self.session_data["user_prompts"].append(user_prompt)
        
        # Add image identifiers (avoid duplicates)
        if image_identifiers:
            for img_id in image_identifiers:
                if img_id not in self.session_data["image_identifiers"]:
                    self.session_data["image_identifiers"].append(img_id)
        
        # Add document identifiers (avoid duplicates)
        if document_identifiers:
            for doc_id in document_identifiers:
                if doc_id not in self.session_data["document_identifiers"]:
                    self.session_data["document_identifiers"].append(doc_id)
    
    def get_user_prompts(self) -> List[str]:
        """Get all user prompts from session_data."""
        if not self.session_data:
            return []
        return self.session_data.get("user_prompts", [])
    
    def get_image_identifiers(self) -> List[str]:
        """Get all image identifiers from session_data."""
        if not self.session_data:
            return []
        return self.session_data.get("image_identifiers", [])
    
    def get_document_identifiers(self) -> List[str]:
        """Get all document identifiers from session_data."""
        if not self.session_data:
            return []
        return self.session_data.get("document_identifiers", [])
    
    def get_agent_name(self) -> Optional[str]:
        """Get agent name from agent_data."""
        if not self.agent_data:
            return None
        return self.agent_data.get("agent_name")
    
    def get_model_name(self) -> Optional[str]:
        """Get model name from agent_data."""
        if not self.agent_data:
            return None
        return self.agent_data.get("model_name")
    
    def populate_from_run_output(self, run_output: "AgentRunOutput") -> None:
        """
        Populate session metadata from an AgentRunOutput.
        
        Extracts and sets:
        - agent_data: agent_name, model_name
        - session_data: user_prompt, image_identifiers, document_identifiers
        
        NOTE: This method does NOT update session.messages. Message updates
        are handled by append_new_messages_from_run_output() to ensure only
        NEW messages from the run are appended (avoiding information loss
        due to memory filtering/limiting).
        
        Args:
            run_output: The AgentRunOutput containing input and agent info
        """
        if run_output is None:
            return
        
        self._populate_agent_data_from_output(run_output)
        self._populate_session_data_from_output(run_output)
    
    def append_new_messages_from_run_output(self, run_output: "AgentRunOutput") -> int:
        """
        Append only NEW messages from a run to session.messages.
        
        This method properly handles message tracking by only appending
        the new messages generated during this specific run, NOT the
        full chat_history which may have been filtered/limited by memory settings.
        
        Uses run_output.new_messages() which internally tracks:
        - Where historical messages ended (via init_run_message_tracking)
        - Which messages are new from this run (via finalize_run_messages)
        
        Args:
            run_output: The AgentRunOutput containing new messages from the run
            
        Returns:
            Number of new messages appended
        """
        if run_output is None:
            return 0
        
        # Get only the new messages from this run
        new_messages = run_output.new_messages()
        
        if not new_messages:
            return 0
        
        # Initialize messages list if needed
        if self.messages is None:
            self.messages = []
        
        # Append new messages to session
        self.messages.extend(new_messages)
        
        _logger.debug(f"Appended {len(new_messages)} new messages to session (total: {len(self.messages)})")
        return len(new_messages)
    
    def _populate_agent_data_from_output(self, run_output: "AgentRunOutput") -> None:
        """
        Extract and populate agent_data from run output.
        
        Args:
            run_output: The AgentRunOutput containing agent info
        """
        agent_name = getattr(run_output, 'agent_name', None)
        model_name = getattr(run_output, 'model', None)
        
        if agent_name or model_name:
            self.update_agent_data(
                agent_name=agent_name,
                model_name=str(model_name) if model_name else None
            )
    
    def _populate_session_data_from_output(self, run_output: "AgentRunOutput") -> None:
        """
        Extract and populate session_data from run output's input.
        
        Args:
            run_output: The AgentRunOutput containing input data
        """
        run_input = getattr(run_output, 'input', None)
        if not run_input:
            return
        
        image_identifiers = self._extract_image_identifiers(run_input)
        document_identifiers = self._extract_document_identifiers(run_input)
        user_prompt = self._extract_user_prompt(run_input)
        
        self.add_input_to_session_data(
            user_prompt=user_prompt,
            image_identifiers=image_identifiers,
            document_identifiers=document_identifiers
        )
    
    @staticmethod
    def _extract_image_identifiers(run_input: "AgentRunInput") -> Optional[List[str]]:
        """Extract image identifiers from run input."""
        if not hasattr(run_input, 'images') or not run_input.images:
            return None
        
        identifiers = [
            img.identifier for img in run_input.images 
            if hasattr(img, 'identifier') and img.identifier
        ]
        return identifiers if identifiers else None
    
    @staticmethod
    def _extract_document_identifiers(run_input: "AgentRunInput") -> Optional[List[str]]:
        """Extract document identifiers from run input."""
        if not hasattr(run_input, 'documents') or not run_input.documents:
            return None
        
        identifiers = [
            doc.identifier for doc in run_input.documents 
            if hasattr(doc, 'identifier') and doc.identifier
        ]
        return identifiers if identifiers else None
    
    @staticmethod
    def _extract_user_prompt(run_input: "AgentRunInput") -> Optional[str]:
        """Extract user prompt string from run input."""
        if not hasattr(run_input, 'user_prompt') or not run_input.user_prompt:
            return None
        
        if isinstance(run_input.user_prompt, str):
            return run_input.user_prompt
        return str(run_input.user_prompt)
    
