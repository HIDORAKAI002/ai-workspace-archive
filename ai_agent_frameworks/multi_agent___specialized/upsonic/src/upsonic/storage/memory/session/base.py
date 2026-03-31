"""Base abstract class for session memory implementations."""
from __future__ import annotations

import asyncio
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Any, Dict, List, Optional, Union

if TYPE_CHECKING:
    from upsonic.session.base import SessionType, Session
    from upsonic.storage.base import Storage
    from upsonic.models import Model


@dataclass
class PreparedSessionInputs:
    """Structured output from session memory get operations.
    
    Contains all the prepared data needed for task execution:
    - message_history: Chat history messages for LLM context
    - context_injection: Session summary or other context (injected into user prompt)
    - metadata_injection: Session/agent metadata (injected into user prompt)
    - session: The raw session object (optional, for further processing)
    """
    message_history: List[Any] = field(default_factory=list)
    context_injection: str = ""
    metadata_injection: str = ""
    session: Optional[Any] = None


class BaseSessionMemory(ABC):
    """Abstract base class for session memory implementations.
    
    Each session type (Agent, Team, Workflow) has its own implementation
    that handles the specific session class and its data format.
    
    Subclasses must define:
    - session_type: Class attribute identifying which SessionType this handles
    - aget(): Async method to load session and prepare inputs
    - asave(): Async method to save session to storage
    - aload_resumable_run(): Async method to load resumable runs for HITL
    
    The sync versions (get, save, load_resumable_run) are provided with
    default implementations that wrap the async versions.
    """
    
    # Subclasses MUST define their session type as a class attribute
    session_type: "SessionType"
    
    def __init__(
        self,
        storage: "Storage",
        session_id: str,
        enabled: bool = True,
        summary_enabled: bool = False,
        num_last_messages: Optional[int] = None,
        feed_tool_call_results: bool = False,
        model: Optional[Union["Model", str]] = None,
        debug: bool = False,
        debug_level: int = 1,
    ) -> None:
        """
        Initialize the session memory.
        
        Args:
            storage: Storage backend for persistence
            session_id: Unique identifier for the session
            enabled: Whether full session memory (chat history) is enabled
            summary_enabled: Whether to generate/use session summaries
            num_last_messages: Limit on number of message turns to keep
            feed_tool_call_results: Whether to include tool call results in history
            model: Model for summary generation (required if summary_enabled)
            debug: Enable debug logging
            debug_level: Debug verbosity level (1-3)
        """
        self.storage = storage
        self.session_id = session_id
        self.enabled = enabled
        self.summary_enabled = summary_enabled
        self.num_last_messages = num_last_messages
        self.feed_tool_call_results = feed_tool_call_results
        self.model = model
        self.debug = debug
        self.debug_level = debug_level
    
    @abstractmethod
    async def aget(self) -> PreparedSessionInputs:
        """
        Get session from storage and prepare inputs for task execution.
        
        This method:
        1. Loads the session from storage
        2. Prepares message history (with limiting/filtering if configured)
        3. Prepares context injection (summary if enabled)
        4. Prepares metadata injection
        
        Returns:
            PreparedSessionInputs with all prepared data
        """
        raise NotImplementedError
    
    @abstractmethod
    async def asave(self, output: Any, is_completed: bool) -> None:
        """
        Save session to storage.
        
        Args:
            output: The run output (AgentRunOutput, TeamRunOutput, etc.)
            is_completed: Whether the run completed successfully
                - If True: Process memory features (summary, flatten messages)
                - If False: Save checkpoint only (for HITL resumption)
        """
        raise NotImplementedError
    
    @abstractmethod
    async def aload_resumable_run(
        self,
        run_id: str,
        agent_id: Optional[str] = None,
    ) -> Optional[Any]:
        """
        Load a resumable run from storage.
        
        Resumable runs include:
        - paused: External tool execution pause
        - error: Durable execution (error recovery)
        - cancelled: Cancel run resumption
        
        Args:
            run_id: The run ID to search for
            agent_id: Optional agent_id to search across sessions
            
        Returns:
            RunData if found and resumable, None otherwise
        """
        raise NotImplementedError
    
    @abstractmethod
    async def aload_run(
        self,
        run_id: str,
        agent_id: Optional[str] = None,
    ) -> Optional[Any]:
        """
        Load a run from storage by run_id (regardless of status).
        
        Args:
            run_id: The run ID to search for
            agent_id: Optional agent_id to search across sessions
            
        Returns:
            RunData if found, None otherwise
        """
        raise NotImplementedError
    
    def get(self) -> PreparedSessionInputs:
        """Synchronous version of aget()."""
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(asyncio.run, self.aget()).result()
        except RuntimeError:
            return asyncio.run(self.aget())
    
    def save(self, output: Any, is_completed: bool) -> None:
        """Synchronous version of asave()."""
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                pool.submit(asyncio.run, self.asave(output, is_completed)).result()
        except RuntimeError:
            asyncio.run(self.asave(output, is_completed))
    
    def load_resumable_run(
        self,
        run_id: str,
        agent_id: Optional[str] = None,
    ) -> Optional[Any]:
        """Synchronous version of aload_resumable_run()."""
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(
                    asyncio.run, 
                    self.aload_resumable_run(run_id, agent_id)
                ).result()
        except RuntimeError:
            return asyncio.run(self.aload_resumable_run(run_id, agent_id))
    
    def load_run(
        self,
        run_id: str,
        agent_id: Optional[str] = None,
    ) -> Optional[Any]:
        """Synchronous version of aload_run()."""
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(
                    asyncio.run, 
                    self.aload_run(run_id, agent_id)
                ).result()
        except RuntimeError:
            return asyncio.run(self.aload_run(run_id, agent_id))

