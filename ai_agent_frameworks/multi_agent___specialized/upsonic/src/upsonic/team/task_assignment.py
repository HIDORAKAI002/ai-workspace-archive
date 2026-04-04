"""
Task assignment module for selecting appropriate entities for tasks in multi-agent workflows.
Supports both Agent and Team entities.
"""
from __future__ import annotations

from pydantic import BaseModel

from typing import List, Any, Optional, Dict, Union, TYPE_CHECKING
from upsonic.tasks.tasks import Task

if TYPE_CHECKING:
    from upsonic.agent.agent import Agent
    from upsonic.team.team import Team


class TaskAssignment:
    """Handles task assignment and entity selection in multi-agent workflows."""
    
    def __init__(self) -> None:
        pass
    
    def prepare_entities_registry(
        self, entity_configurations: List[Union[Agent, Team]]
    ) -> tuple[Dict[str, Union[Agent, Team]], List[str]]:
        """
        Prepare a registry of entities indexed by their IDs.
        
        Args:
            entity_configurations: List of Agent and/or Team instances.
            
        Returns:
            Tuple of (entities_dict, entity_names_list)
        """
        entities_registry: Dict[str, Union[Agent, Team]] = {}
        
        for entity in entity_configurations:
            entity_name: str = entity.get_entity_id()
            entities_registry[entity_name] = entity
        
        entity_names: List[str] = list(entities_registry.keys())
        return entities_registry, entity_names
    
    def _find_selection_model(self, entity_configurations: List[Union[Agent, Team]]) -> Optional[Any]:
        """
        Find the first usable model from the entity list for the selection agent.
        Traverses Agent-like entities first, then falls back to Team models.
        
        Args:
            entity_configurations: List of Agent and/or Team instances.
            
        Returns:
            A model identifier or None.
        """
        for entity in entity_configurations:
            if not hasattr(entity, 'entities') and hasattr(entity, 'model') and entity.model:
                return entity.model
        for entity in entity_configurations:
            if hasattr(entity, 'entities') and hasattr(entity, 'model') and entity.model:
                return entity.model
        for entity in entity_configurations:
            if hasattr(entity, '_find_first_model'):
                nested_model = entity._find_first_model()
                if nested_model:
                    return nested_model
        return None

    async def select_entity_for_task(
        self, 
        current_task: Task, 
        context: List[Any], 
        entities_registry: Dict[str, Union[Agent, Team]], 
        entity_names: List[str], 
        entity_configurations: List[Union[Agent, Team]]
    ) -> Optional[str]:
        """
        Select the most appropriate entity for a given task.
        
        Args:
            current_task: The task that needs an entity.
            context: Context for entity selection.
            entities_registry: Dictionary of available entities.
            entity_names: List of entity names.
            entity_configurations: Original entity configurations.
            
        Returns:
            Selected entity name or None if selection fails.
        """
        from upsonic.agent.agent import Agent as AgentClass

        if current_task.agent is not None:
            for entity_name, entity_instance in entities_registry.items():
                if entity_instance == current_task.agent:
                    return entity_name
            
            predefined_entity_id: Optional[str] = getattr(current_task.agent, 'get_entity_id', lambda: None)()
            if predefined_entity_id and predefined_entity_id in entities_registry:
                return predefined_entity_id
        
        class SelectedEntity(BaseModel):
            selected_agent: str
        
        max_attempts: int = 3
        attempts: int = 0

        selection_model = self._find_selection_model(entity_configurations)
        if not selection_model:
            raise ValueError("Cannot perform entity selection: No entity in the team has a valid model.")

        while attempts < max_attempts:
            selecting_task = Task(
                description="Select the most appropriate agent or team from the available entities to handle the current task. Consider all tasks in the workflow and previous results to make the best choice. Return only the exact entity name from the list.",
                attachments=current_task.attachments, 
                response_format=SelectedEntity, 
                context=context
            )
            
            await AgentClass(model=selection_model).do_async(selecting_task)

            if not isinstance(selecting_task.response, SelectedEntity):
                attempts += 1
                continue

            selected_name: str = selecting_task.response.selected_agent
            
            if selected_name in entities_registry:
                return selected_name
            
            for entity_name in entity_names:
                if (entity_name.lower() in selected_name.lower() or 
                    selected_name.lower() in entity_name.lower()):
                    return entity_name
            
            attempts += 1
        
        return entity_names[0] if entity_names else None
