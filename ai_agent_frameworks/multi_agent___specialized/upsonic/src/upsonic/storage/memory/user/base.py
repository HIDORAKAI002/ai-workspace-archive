"""Base abstract class for user memory implementations."""
from __future__ import annotations

import asyncio
from abc import ABC, abstractmethod
from typing import TYPE_CHECKING, Any, Dict, List, Literal, Optional, Type, Union

if TYPE_CHECKING:
    from pydantic import BaseModel
    from upsonic.storage.base import Storage
    from upsonic.models import Model


class BaseUserMemory(ABC):
    """Abstract base class for user memory (user profile/traits) implementations.
    
    User memory is tied to user_id and is the same across all session types
    (Agent, Team, Workflow). It stores user profile information extracted
    from interactions.
    
    Subclasses must implement:
    - aget(): Async method to load user profile and format for prompt injection
    - asave(): Async method to analyze interaction and save user traits
    
    The sync versions (get, save) are provided with default implementations
    that wrap the async versions.
    """
    
    def __init__(
        self,
        storage: "Storage",
        user_id: str,
        enabled: bool = True,
        profile_schema: Optional[Type["BaseModel"]] = None,
        dynamic_profile: bool = False,
        update_mode: Literal['update', 'replace'] = 'update',
        model: Optional[Union["Model", str]] = None,
        debug: bool = False,
        debug_level: int = 1,
    ) -> None:
        """
        Initialize the user memory.
        
        Args:
            storage: Storage backend for persistence
            user_id: Unique identifier for the user
            enabled: Whether user memory is enabled
            profile_schema: Pydantic model for user profile structure
            dynamic_profile: If True, generate schema dynamically from conversation
            update_mode: How to handle profile updates ('update' merges, 'replace' overwrites)
            model: Model for trait analysis (required if enabled)
            debug: Enable debug logging
            debug_level: Debug verbosity level (1-3)
        """
        self.storage = storage
        self.user_id = user_id
        self.enabled = enabled
        self.profile_schema = profile_schema
        self.dynamic_profile = dynamic_profile
        self.update_mode = update_mode
        self.model = model
        self.debug = debug
        self.debug_level = debug_level
    
    @abstractmethod
    async def aget(
        self,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
    ) -> Optional[str]:
        """
        Get user profile formatted for prompt injection.
        
        Loads user memory from storage and formats it as a string
        suitable for injecting into the system prompt.
        
        Args:
            agent_id: Optional filter by agent ID
            team_id: Optional filter by team ID
            
        Returns:
            Formatted profile string for system prompt, or None if no profile
        """
        raise NotImplementedError
    
    @abstractmethod
    async def asave(
        self,
        output: Any,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
    ) -> None:
        """
        Analyze interaction and save user profile.
        
        Extracts user traits from the conversation and saves them
        to storage using the configured update mode.
        
        Args:
            output: The run output containing conversation data
            agent_id: Optional agent identifier for storage
            team_id: Optional team identifier for storage
        """
        raise NotImplementedError
    
    def get(
        self,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
    ) -> Optional[str]:
        """Synchronous version of aget()."""
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(asyncio.run, self.aget(agent_id, team_id)).result()
        except RuntimeError:
            return asyncio.run(self.aget(agent_id, team_id))
    
    def save(
        self,
        output: Any,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
    ) -> None:
        """Synchronous version of asave()."""
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                pool.submit(asyncio.run, self.asave(output, agent_id, team_id)).result()
        except RuntimeError:
            asyncio.run(self.asave(output, agent_id, team_id))

