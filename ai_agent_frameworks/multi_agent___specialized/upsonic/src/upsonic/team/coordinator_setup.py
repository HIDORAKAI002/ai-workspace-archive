from __future__ import annotations
import inspect
from typing import TYPE_CHECKING, List, Any, Callable, Literal, Union

if TYPE_CHECKING:
    from upsonic.agent.agent import Agent
    from upsonic.tasks.tasks import Task
    from upsonic.knowledge_base.knowledge_base import KnowledgeBase
    from upsonic.team.team import Team

class CoordinatorSetup:
    """
    Manages the setup and configuration of the Team Leader agent.
    
    This class is mode-aware and can generate different system prompts
    for different team operational modes ('coordinate' or 'route').
    Supports both Agent and Team entities in the member roster.
    """
    def __init__(self, members: List[Union[Agent, Team]], tasks: List[Task], mode: Literal["coordinate", "route"]):
        """
        Initializes the CoordinatorSetup manager.

        Args:
            members: The list of member entities (Agent or Team) available to the team.
            tasks: The initial list of tasks for the team to accomplish.
            mode: The operational mode for the team.
        """
        self.members: List[Union[Agent, Team]] = members
        self.tasks: List[Task] = tasks
        self.mode: Literal["coordinate", "route"] = mode

    def _summarize_tool(self, tool: Callable) -> str:
        """Creates a human-readable summary of a tool from its name and docstring."""
        tool_name = getattr(tool, '__name__', 'Unnamed Tool')
        docstring = inspect.getdoc(tool)
        if docstring:
            description = docstring
        else:
            description = "No description available."
        return f"{tool_name}: {description}"

    def _format_entity_manifest(self) -> str:
        """Format the manifest of all entities (Agents and Teams) for the leader prompt."""
        if not self.members:
            return "No team members are available."
        manifest_parts: List[str] = []
        for entity in self.members:
            entity_id = entity.get_entity_id()

            if hasattr(entity, 'entities') and hasattr(entity, 'mode'):
                role = getattr(entity, 'role', None) or "No specific role defined."
                goal = getattr(entity, 'goal', None) or "No specific goal defined."
                mode = getattr(entity, 'mode', "sequential")
                sub_entity_names = [e.get_entity_id() for e in entity.entities]
                sub_entities_str = ", ".join(sub_entity_names) if sub_entity_names else "None"
                
                part = (
                    f"- Member ID: `{entity_id}`\n"
                    f"  - Type: Team ({mode} mode)\n"
                    f"  - Role: {role}\n"
                    f"  - Goal: {goal}\n"
                    f"  - Sub-entities: {sub_entities_str}"
                )
            else:
                role = getattr(entity, 'role', None) or "No specific role defined."
                goal = getattr(entity, 'goal', None) or "No specific goal defined."
                system_prompt = getattr(entity, 'system_prompt', None) or "No system prompt defined."
                
                tools_info = ""
                if hasattr(entity, 'tools') and entity.tools:
                    tool_summaries = [self._summarize_tool(tool) for tool in entity.tools]
                    tools_str = "\n    ".join([f"- {summary}" for summary in tool_summaries])
                    tools_info = f"\n  - Agent Tools:\n    {tools_str}"
                
                part = (
                    f"- Member ID: `{entity_id}`\n"
                    f"  - Role: {role}\n"
                    f"  - Goal: {goal}\n"
                    f"  - System Prompt: {system_prompt}\n"
                    f"  - Agent Tools: {tools_info}"
                )

            manifest_parts.append(part)
        return "\n".join(manifest_parts)

    def _serialize_context_item(self, item: Any) -> str:
        from upsonic.tasks.tasks import Task
        from upsonic.knowledge_base.knowledge_base import KnowledgeBase
        if isinstance(item, str):
            return item
        if isinstance(item, Task):
            return f"Reference to another task with description: '{item.description}'"
        if isinstance(item, KnowledgeBase):
            return f"Reference to KnowledgeBase '{item.name}' containing markdown or RAG-enabled content."
        try:
            return str(item)
        except Exception:
            return "Unserializable context object."

    def _format_tasks_manifest(self) -> str:
        if not self.tasks:
            return "<Tasks>\nNo initial tasks provided.\n</Tasks>"

        manifest_parts: List[str] = ["<Tasks>"]
        for i, task in enumerate(self.tasks, 1):
            task_parts: List[str] = [f"  <Task index='{i}'>"]
            task_parts.append(f"    <Description>{task.description}</Description>")

            if task.tools:
                summaries = [self._summarize_tool(tool) for tool in task.tools]
                tools_str = "\n".join([f"      - {summary}" for summary in summaries])
                task_parts.append(f"    <Tools>\n{tools_str}\n    </Tools>")
            else:
                task_parts.append("    <Tools>None</Tools>")

            if task.context:
                context_items = [self._serialize_context_item(item) for item in task.context]
                context_str = "\n".join([f"      - {item}" for item in context_items])
                task_parts.append(f"    <Context>\n{context_str}\n    </Context>")
            else:
                 task_parts.append("    <Context>None</Context>")

            if task.attachments:
                attachment_str = ", ".join(task.attachments)
                task_parts.append(f"    <Attachments>{attachment_str}</Attachments>")
            else:
                task_parts.append("    <Attachments>None</Attachments>")

            task_parts.append("  </Task>")
            manifest_parts.append("\n".join(task_parts))
        
        manifest_parts.append("</Tasks>")
        return "\n".join(manifest_parts)
    
    def create_leader_prompt(self) -> str:
        """
        Constructs the complete system prompt for the Team Leader agent
        based on the team's operational mode.
        """
        if self.mode == "coordinate":
            return self._create_coordinate_prompt()
        elif self.mode == "route":
            return self._create_route_prompt()
        else:
            return "You are a helpful assistant."    

    def _create_coordinate_prompt(self) -> str:
        """
        Constructs the complete system prompt for the Team Leader agent,
        including manifests for both team members and initial tasks with full tool schemas.
        """
        members_manifest = self._format_entity_manifest()
        tasks_manifest = self._format_tasks_manifest()

        leader_system_prompt = (
            "### IDENTITY AND MISSION ###\n"
            "You are the Strategic Coordinator of an elite team of specialized AI agents and teams. "
            "Your SOLE function is to achieve the user's objectives by orchestrating your team. "
            "You do not perform tasks yourself; you analyze, plan, delegate, and synthesize.\n\n"

            "--- INTEL-PACKAGE ---\n"
            "This is the complete intelligence available for your mission.\n\n"

            "**1. TEAM ROSTER:**\n"
            f"{members_manifest}\n\n"
            
            "**2. MISSION OBJECTIVES (INITIAL TASKS):**\n"
            f"{tasks_manifest}\n\n"

            "--- OPERATIONAL PROTOCOL ---\n"
            "You must adhere to the following protocol for mission execution:\n\n"

            "**1. Analyze:** Review all `<Task>` blocks in your MISSION OBJECTIVES. "
            "Cross-reference each task with the TEAM ROSTER — consider each member's role, goal, and available tools. "
            "Formulate a step-by-step plan, deciding which member is best suited for each step.\n\n"

            "**2. Delegate:** To assign a sub-task, you MUST call your one and only tool, `delegate_task`. "
            "Each member already has their own tools pre-configured and will autonomously decide which tools to use. "
            "Your job is to pick the right member and give them a clear task description.\n\n"

            "   **`delegate_task` Parameters:**\n"
            "   - `member_id` (string, **required**): The ID of the agent or team you are assigning the task to.\n"
            "   - `description` (string, **required**): A clear description of the task objective and the expected output.\n"
            "   - `tools` (List[string], optional): A list of task-level tool **names** to make available for this sub-task. You should derive these from the `<Tools>` tag in the MISSION OBJECTIVES. The agent will autonomously decide which tools to use.\n"
            "   - `context` (Any, optional): The result from a previous delegation step or any other data the member needs.\n"
            "   - `attachments` (List[string], optional): A list of file paths the member needs.\n\n"

            "   **EXAMPLE:**\n"
            "     `delegate_task(\n"
            "       member_id='Data Analyst',\n"
            "       description='Retrieve and analyze Q4 2024 financial data for Tesla (TSLA). Return a summary including revenue, net income, and stock price trend for the quarter.',\n"
            "       tools=['get_stock_price', 'get_financials']\n"
            "     )`\n\n"

            "**3. Iterate & Synthesize:** You MUST delegate to ALL relevant members for ALL objectives. "
            "After a member returns a result, pass it as `context` to the next delegation step when there is a dependency. "
            "Once ALL objectives are complete, combine all results into a single, comprehensive final answer. "
            "Do not mention your internal processes in the final report."
        )
        return leader_system_prompt
    
    def _create_route_prompt(self) -> str:
        """Generates the specialized system prompt for the 'route' mode."""
        members_manifest = self._format_entity_manifest()
        tasks_manifest = self._format_tasks_manifest()

        return (
            "### IDENTITY AND MISSION ###\n"
            "You are an intelligent AI Router. Your SOLE purpose is to analyze the user's full request and determine which single specialist (agent or team) is best suited to handle the entire set of objectives. You do not answer the query yourself; you only decide who should.\n\n"
            
            "--- INTEL-PACKAGE ---\n"
            "**1. TEAM ROSTER:** This is the list of available specialists.\n"
            f"{members_manifest}\n\n"
            
            "**2. MISSION OBJECTIVES (INITIAL TASKS):** This is the complete user request you must route.\n"
            f"{tasks_manifest}\n\n"

            "--- OPERATIONAL PROTOCOL ---\n"
            "Your process is a strict two-step sequence:\n\n"
            
            "**1. Analyze and Decide:**\n"
            "   - Read all `<Task>` blocks in the MISSION OBJECTIVES. Pay close attention to the `<Description>` and the required capabilities listed in the `<Tools>` tag for each task.\n"
            "   - Compare the overall requirements of the mission against the `role` and `goal` of each member in your TEAM ROSTER.\n"
            "   - Select the **single best member** whose skills most closely match the entire set of tasks.\n\n"

            "**2. Execute Handoff:**\n"
            "   - Once you have made your final decision, you MUST call your one and only tool, `route_request_to_member`.\n"
            "   - Provide the `member_id` of your chosen member as the sole argument.\n"
            "   - This is your final action. Your job is complete after making this tool call.\n\n"

            "### FINAL DIRECTIVE ###\n"
            "Do not attempt to answer the user's query or break it down. Your only task is to analyze the full mission objective and route it to the single most qualified specialist. Make one tool call and then stop."
        )
