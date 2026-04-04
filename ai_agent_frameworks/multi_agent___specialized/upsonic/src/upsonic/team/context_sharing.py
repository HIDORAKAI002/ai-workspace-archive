"""
Context sharing module for managing context between tasks in multi-agent workflows.
Supports both Agent and Team entities.
"""
from __future__ import annotations

from typing import List, Any, Union, TYPE_CHECKING
from upsonic.tasks.tasks import Task

if TYPE_CHECKING:
    from upsonic.agent.agent import Agent
    from upsonic.team.team import Team


class ContextSharing:
    """Handles context sharing and management between tasks in multi-agent workflows."""
    
    @staticmethod
    def _describe_entity(entity: Union[Agent, Team]) -> str:
        """
        Produce a human-readable string describing an entity (Agent or Team)
        so the selection LLM can make an informed choice.

        Args:
            entity: An Agent or Team instance.

        Returns:
            A descriptive string summarizing the entity's identity and capabilities.
        """
        entity_id: str = entity.get_entity_id()
        role: str = getattr(entity, "role", None) or "No specific role"
        goal: str = getattr(entity, "goal", None) or "No specific goal"

        if hasattr(entity, "entities") and hasattr(entity, "mode"):
            mode: str = getattr(entity, "mode", "unknown")
            sub_names = [
                sub.get_entity_id()
                for sub in getattr(entity, "entities", [])
                if hasattr(sub, "get_entity_id")
            ]
            sub_str = ", ".join(sub_names) if sub_names else "none"
            return (
                f"Entity '{entity_id}' (Team, mode={mode}) — "
                f"Role: {role}. Goal: {goal}. Sub-entities: [{sub_str}]"
            )

        tools_info = ""
        if hasattr(entity, "tools") and entity.tools:
            tool_names = []
            for tool in entity.tools:
                name = getattr(tool, "__name__", None) or getattr(tool, "name", None) or str(type(tool).__name__)
                tool_names.append(name)
            tools_info = f" Tools: [{', '.join(tool_names)}]."

        return (
            f"Entity '{entity_id}' (Agent) — "
            f"Role: {role}. Goal: {goal}.{tools_info}"
        )

    @staticmethod
    def enhance_task_context(
        current_task: Task, 
        all_tasks: List[Task], 
        task_index: int, 
        entity_configurations: List[Union[Agent, Team]], 
        completed_results: List[Task]
    ) -> None:
        """
        Enhance a task's context with all relevant information from the workflow.
        
        Args:
            current_task: The task to enhance.
            all_tasks: All tasks in the workflow.
            task_index: Index of the current task.
            entity_configurations: Available entity configurations (Agent and/or Team).
            completed_results: Previously completed tasks with results.
        """
        if not hasattr(current_task, 'context') or current_task.context is None:
            current_task.context = []
        elif not isinstance(current_task.context, list):
            current_task.context = [current_task.context]
        
        other_tasks: List[Task] = [task for i, task in enumerate(all_tasks) if i != task_index]
        current_task.context.extend(other_tasks)
        
        current_task.context.extend(entity_configurations)
        
    
    @staticmethod
    def build_selection_context(
        current_task: Task, 
        all_tasks: List[Task], 
        task_index: int, 
        entity_configurations: List[Union[Agent, Team]], 
        completed_results: List[Task]
    ) -> List[Any]:
        """
        Build context for entity selection process.
        
        Entity objects are converted to descriptive strings so the
        selection LLM can understand each entity's role, goal, and tools.
        
        Args:
            current_task: The task for which to select an entity.
            all_tasks: All tasks in the workflow.
            task_index: Index of the current task.
            entity_configurations: Available entity configurations (Agent and/or Team).
            completed_results: Previously completed tasks with results.
            
        Returns:
            List of context items for entity selection.
        """
        context: List[Any] = [current_task]
        context += [task for i, task in enumerate(all_tasks) if i != task_index]
        context += [
            ContextSharing._describe_entity(entity)
            for entity in entity_configurations
        ]
        
        return context
