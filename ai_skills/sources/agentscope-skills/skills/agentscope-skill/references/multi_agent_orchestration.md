# Multi-Agent Orchestration
There are two types of multi-agent orchestrations:

- Master-worker: a master agent assigns tasks to multiple worker agents, and the worker agents only report to the master agent.
- Peer-to-peer (or conversational): multiple agents interact with each other, and each agent can perceive the information from different identities in the conversation.

## Master-Worker
In AgentScope, the master-worker orchestration can be implemented by wrapping the worker agents as tools for the master agent.
The worker agents can be designed to perform specific tasks, or a unified worker agent can be assigned with different tasks by providing different system prompts or tools.

The following is an example of how to wrap a worker agent as a tool for the master agent.

> Note: the tool name, input arguments, and output organization of the worker agent can be customized as needed.

```python
from agentscope.pipeline import stream_printing_messages
from agentscope.tool import ToolResponse, Toolkit, execute_shell_command
from agentscope.agent import ReActAgent
from agentscope.message import Msg

from typing import AsyncGenerator

async def create_worker(task: str) -> AsyncGenerator[ToolResponse, None]:
    """{description}

    Args:
        task (`str`):
            The task to be performed by the worker agent.
    """
    toolkit = Toolkit()
    toolkit.register_tool_function(execute_shell_command)

    agent = ReActAgent(...)

    # We disable the terminal printing to avoid messy outputs
    agent.set_console_output_enabled(False)

    async for msg, _ in stream_printing_messages(
        agents=[agent],
        coroutine_task=agent(
            # Wrap the task into a user Msg object
            Msg("user", f"Please perform the following task: {task}", "user")
        ),
    ):
        # Optionally, you can process the message here before yielding it to the master agent
        # to control the information exposed to the master agent. For example, filter out the
        # reasoning process and only expose the final action to the master agent.
        yield msg
```

## Peer-to-Peer

Because agentscope supports explicit message passing, the peer-to-peer orchestration can be implemented by allowing multiple agents to perceive the messages from each other.
Additionally, the `pipeline` module provides different syntactic sugers to facilitate the implementation of different conversation patterns among multiple agents, such as broadcasting, fan-out, and so on.

The following is an example of how to implement a peer-to-peer conversation among multiple agents.

```python
from agentscope.pipeline import MsgHub
... # other imports

alice = ReActAgent(...)
bob = ReActAgent(...)
charlie = ReActAgent(...)

# Create a message hub
async with MsgHub(
    participants=[alice, bob, charlie],
    # The announcement message will be broadcasted to all participants at the beginning of the conversation
    announcement=Msg(
        "user",
        "Now introduce yourself in one sentence, including your name, age and career.",
        "user",
    ),
) as hub:
    # Group chat without manual message passing
    await alice()
    await bob()
    await charlie()
```

## Further Reading
More information about multi-agent orchestration or pipeline can be found in the following references:
- Tutorial of pipeline:
    - [Online link](https://doc.agentscope.io/tutorial/task_pipeline.html)
    - [Source Code]({path_to_agentscope_repo}/agentscope/docs/tutorial/en/src/task_pipeline.py)