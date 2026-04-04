"""
Result combiner module for combining results from multiple tasks into final answers.
"""
from __future__ import annotations

from typing import List, Any, Optional, Union, TYPE_CHECKING
from upsonic.tasks.tasks import Task
from upsonic.agent.agent import Agent

if TYPE_CHECKING:
    from upsonic.team.team import Team

class ResultCombiner:
    """Handles combining results from multiple tasks into coherent final answers."""
    
    def __init__(self, model: Optional[Any] = None, debug: bool = False):
        """
        Initialize the result combiner.
        
        Args:
            model: The model provider to use for combining results.
            debug: Whether to enable debug mode.
        """
        self.model: Optional[Any] = model
        self.debug: bool = debug
    
    def should_combine_results(self, results: List[Task]) -> bool:
        """
        Determine if results need to be combined or if single result should be returned.
        
        Args:
            results: List of completed tasks with results.
            
        Returns:
            True if results should be combined, False if single result should be returned.
        """
        return len(results) > 1
    
    def get_single_result(self, results: List[Task]) -> Any:
        """
        Get the result from a single task.
        
        Args:
            results: List containing one completed task.
            
        Returns:
            The response from the single task.
        """
        if not results:
            return None
        return results[0].response
    
    async def combine_results(
        self, 
        results: List[Task], 
        response_format: Any = str, 
        entities: Optional[List[Union[Agent, Team]]] = None
    ) -> Any:
        """
        Combine multiple task results into a coherent final answer.
        
        Args:
            results: List of completed tasks with results.
            response_format: The desired format for the final response.
            entities: List of entities (used for fallback debug setting).
            
        Returns:
            Combined final response.
        """

        end_task = Task(
            description=(
                "Combined results from all previous tasks that in your context. "
                "You Need to prepare an final answer to your users. "
                "Dont talk about yourself or tasks directly. "
                "Just catch everything from prevously things and prepare an final return. "
                "But please try to give answer to user questions. "
                "If there is an just one question, just return that answer. "
                "If there is an multiple questions, just return all of them. "
                "but with an summary of all of them."
            ),
            context=results,
            response_format=response_format
        )
        
        debug_setting: bool = self.debug
        if not debug_setting and entities and len(entities) > 0:
            last_entity = entities[-1]
            if hasattr(last_entity, 'debug'):
                debug_setting = last_entity.debug
        
        if not self.model:
             raise ValueError("ResultCombiner requires a model to be initialized.")

        end_agent = Agent(model=self.model, debug=debug_setting)
        await end_agent.do_async(end_task)
        
        return end_task.response
