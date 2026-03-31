from __future__ import annotations
from contextlib import asynccontextmanager
from typing import TYPE_CHECKING, Any, Dict, List, Optional
import asyncio


if TYPE_CHECKING:
    from upsonic.storage.memory.memory import Memory
    from upsonic.run.agent.output import AgentRunOutput


class MemoryManager:
    """
    A context manager that integrates the Memory orchestrator into the agent's
    execution pipeline.

    This manager is responsible for:
    1. Preparing memory inputs before the LLM call (prepare_inputs_for_task)
    2. Saving the session after the run completes or pauses (save_session_async)
    """

    def __init__(
        self,
        memory: Optional["Memory"],
        agent_metadata: Optional[Dict[str, Any]] = None,
    ):
        """
        Initializes the MemoryManager.

        Args:
            memory: The configured Memory object from the parent agent.
            agent_metadata: Optional metadata dict from the Agent to inject into prompts.
        """
        self.memory = memory
        self.agent_metadata = agent_metadata or {}
        self._prepared_inputs: Dict[str, Any] = {
            "message_history": [],
            "context_injection": "",
            "system_prompt_injection": "",
            "metadata_injection": ""
        }
        self._agent_run_output: Optional["AgentRunOutput"] = None

    def get_message_history(self) -> List[Any]:
        """
        Provides the prepared message history (full session memory) to the
        agent's core run method.
        """
        return self._prepared_inputs.get("message_history", [])

    def get_context_injection(self) -> str:
        """
        Provides the prepared context string (e.g., session summary) to the
        ContextManager.
        """
        return self._prepared_inputs.get("context_injection", "")

    def get_system_prompt_injection(self) -> str:
        """
        Provides the prepared system prompt string (e.g., user profile) to
        the SystemPromptManager.
        """
        return self._prepared_inputs.get("system_prompt_injection", "")
    
    def get_metadata_injection(self) -> str:
        """
        Provides the prepared metadata string to inject into the user prompt.
        This includes both agent-level metadata and session-level metadata.
        """
        return self._prepared_inputs.get("metadata_injection", "")
    

    
    def set_run_output(self, run_output: "AgentRunOutput") -> None:
        """
        Set the AgentRunOutput for session save.
        
        Args:
            run_output: The AgentRunOutput to save
        """
        self._agent_run_output = run_output

    async def aprepare(self) -> None:
        """
        Prepare memory inputs before the LLM call.
        
        This method prepares message history, context injection, system prompt 
        injection, and metadata injection from the memory module.
        """
        if self.memory:
            self._prepared_inputs = await self.memory.prepare_inputs_for_task(
                agent_metadata=self.agent_metadata
            )

            if self.agent_metadata:
                metadata_parts = []
                for key, value in self.agent_metadata.items():
                    metadata_parts.append(f"  {key}: {value}")
                if metadata_parts:
                    self._prepared_inputs["metadata_injection"] = (
                        "<AgentMetadata>\n" + "\n".join(metadata_parts) + "\n</AgentMetadata>"
                    )
    
    async def afinalize(self) -> None:
        """
        Finalize and save session after the run.
        
        This method saves the session to storage via Memory.save_session_async().
        """
        if self.memory and self._agent_run_output:
            await self.memory.save_session_async(
                output=self._agent_run_output,
            )
    
    def prepare(self) -> None:
        """Synchronous version of aprepare."""
        asyncio.get_event_loop().run_until_complete(self.aprepare())
    
    def finalize(self) -> None:
        """Synchronous version of afinalize."""
        asyncio.get_event_loop().run_until_complete(self.afinalize())

    @asynccontextmanager
    async def manage_memory(self):
        """
        The asynchronous context manager for orchestrating memory operations
        throughout a task's lifecycle.
        
        Note: This context manager is kept for backward compatibility.
        For step-based architecture, use aprepare() and afinalize() directly.
        """
        await self.aprepare()
        
        try:
            yield self
        finally:
            await self.afinalize()
