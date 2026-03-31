"""Base abstract class for culture memory implementations."""
from __future__ import annotations

from abc import ABC, abstractmethod
from typing import TYPE_CHECKING, Any, Dict, List, Optional, Union

if TYPE_CHECKING:
    from upsonic.storage.base import Storage
    from upsonic.culture.cultural_knowledge import CulturalKnowledge
    from upsonic.models import Model


class BaseCultureMemory(ABC):
    """Abstract base class for culture memory implementations.
    
    Culture memory manages cultural knowledge storage and retrieval.
    Unlike user memory (per-user), culture is shared across all agents
    and provides universal principles, guidelines, and best practices.
    
    Subclasses must implement:
    - aget(): Async method to load cultural knowledge from storage
    - asave(): Async method to save cultural knowledge to storage
    - aget_all(): Async method to load all cultural knowledge
    - adelete(): Async method to delete cultural knowledge
    """
    
    def __init__(
        self,
        storage: "Storage",
        enabled: bool = True,
        model: Optional[Union["Model", str]] = None,
        debug: bool = False,
        debug_level: int = 1,
    ) -> None:
        """
        Initialize the culture memory.
        
        Args:
            storage: Storage backend for persistence
            enabled: Whether culture memory is enabled
            model: Model for culture extraction (required if enabled)
            debug: Enable debug logging
            debug_level: Debug verbosity level (1-3)
        """
        self.storage = storage
        self.enabled = enabled
        self.model = model
        self.debug = debug
        self.debug_level = debug_level
    
    @abstractmethod
    async def aget(
        self,
        culture_id: Optional[str] = None,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
    ) -> Optional["CulturalKnowledge"]:
        """
        Get cultural knowledge from storage.
        
        Args:
            culture_id: Specific culture ID to retrieve
            agent_id: Filter by agent ID
            team_id: Filter by team ID
            
        Returns:
            CulturalKnowledge instance if found, None otherwise
        """
        raise NotImplementedError
    
    @abstractmethod
    async def aget_all(
        self,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
        categories: Optional[List[str]] = None,
        limit: Optional[int] = None,
    ) -> List["CulturalKnowledge"]:
        """
        Get all cultural knowledge entries from storage.
        
        Args:
            agent_id: Filter by agent ID
            team_id: Filter by team ID
            categories: Filter by categories
            limit: Maximum number of entries to return
            
        Returns:
            List of CulturalKnowledge instances
        """
        raise NotImplementedError
    
    @abstractmethod
    async def asave(
        self,
        cultural_knowledge: "CulturalKnowledge",
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
    ) -> Optional["CulturalKnowledge"]:
        """
        Save cultural knowledge to storage.
        
        Args:
            cultural_knowledge: The CulturalKnowledge instance to store
            agent_id: Optional agent identifier for storage
            team_id: Optional team identifier for storage
            
        Returns:
            The saved CulturalKnowledge instance
        """
        raise NotImplementedError
    
    @abstractmethod
    async def adelete(
        self,
        culture_id: str,
    ) -> bool:
        """
        Delete cultural knowledge from storage.
        
        Args:
            culture_id: ID of the cultural knowledge to delete
            
        Returns:
            True if deleted successfully, False otherwise
        """
        raise NotImplementedError
    
    def get(
        self,
        culture_id: Optional[str] = None,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
    ) -> Optional["CulturalKnowledge"]:
        """Synchronous version of aget()."""
        import asyncio
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(
                    asyncio.run, 
                    self.aget(culture_id, agent_id, team_id)
                ).result()
        except RuntimeError:
            return asyncio.run(self.aget(culture_id, agent_id, team_id))
    
    def get_all(
        self,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
        categories: Optional[List[str]] = None,
        limit: Optional[int] = None,
    ) -> List["CulturalKnowledge"]:
        """Synchronous version of aget_all()."""
        import asyncio
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(
                    asyncio.run,
                    self.aget_all(agent_id, team_id, categories, limit)
                ).result()
        except RuntimeError:
            return asyncio.run(self.aget_all(agent_id, team_id, categories, limit))
    
    def save(
        self,
        cultural_knowledge: "CulturalKnowledge",
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
    ) -> Optional["CulturalKnowledge"]:
        """Synchronous version of asave()."""
        import asyncio
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(
                    asyncio.run,
                    self.asave(cultural_knowledge, agent_id, team_id)
                ).result()
        except RuntimeError:
            return asyncio.run(self.asave(cultural_knowledge, agent_id, team_id))
    
    def delete(
        self,
        culture_id: str,
    ) -> bool:
        """Synchronous version of adelete()."""
        import asyncio
        try:
            loop = asyncio.get_running_loop()
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(asyncio.run, self.adelete(culture_id)).result()
        except RuntimeError:
            return asyncio.run(self.adelete(culture_id))
