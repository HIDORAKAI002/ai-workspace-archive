# Deployment Guide

In agent application, [agentscope-runtime](https://github.com/agentscope-ai/agentscope-runtime) addresses three critical production deployment challenges:

* Deployment: Unified `AgentApp` interface abstracts deployment targets (local, Docker, K8s, serverless, etc.)
* Security Risks: Sandboxed execution environment isolate tool calls (Python, shell, browser, filesystem, etc.)

## Quickstart

```bash
uv pip install agentscope-runtime
# or
# pip install agentscope-runtime
```

## Deployment

AgentScope Runtime provides `AgentApp`, a FastAPI-based service wrapper that turns your agents into production-ready APIs with streaming responses, health checks, and lifecycle management. It supports multiple deployment targets from local development to cloud platforms.

> Note: The `AgentApp` provides a unified interface for deployment, but you can also choose to deploy your agent service using your own FastAPI server or other web frameworks if you prefer.

### Complete Example

The following example can also be found in the README.md of the [agentscope-runtime repository](https://github.com/agentscope-ai/agentscope-runtime)

```python
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from agentscope.agent import ReActAgent
from agentscope.model import DashScopeChatModel
from agentscope.formatter import DashScopeChatFormatter
from agentscope.tool import Toolkit, execute_python_code
from agentscope.pipeline import stream_printing_messages
from agentscope.memory import InMemoryMemory
from agentscope.session import RedisSession

from agentscope_runtime.engine import AgentApp
from agentscope_runtime.engine.schemas.agent_schemas import AgentRequest


# 1. Define lifespan manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage resources during service startup and shutdown"""
    # Startup: Initialize Session manager
    import fakeredis

    fake_redis = fakeredis.aioredis.FakeRedis(decode_responses=True)
    # NOTE: This FakeRedis instance is for development/testing only.
    # In production, replace it with your own Redis client/connection
    # (e.g., aioredis.Redis)
    app.state.session = RedisSession(connection_pool=fake_redis.connection_pool)

    yield  # Service is running

    # Shutdown: Add cleanup logic here (e.g., closing database connections)
    print("AgentApp is shutting down...")


# 2. Create AgentApp instance
agent_app = AgentApp(
    app_name="Friday",
    app_description="A helpful assistant",
    lifespan=lifespan,
)


# 3. Define request handling logic
@agent_app.query(framework="agentscope")
async def query_func(
        self,
        msgs,
        request: AgentRequest = None,
        **kwargs,
):
    session_id = request.session_id
    user_id = request.user_id

    toolkit = Toolkit()
    toolkit.register_tool_function(execute_python_code)

    agent = ReActAgent(
        name="Friday",
        model=DashScopeChatModel(
            "qwen-turbo",
            api_key=os.getenv("DASHSCOPE_API_KEY"),
            stream=True,
        ),
        sys_prompt="You're a helpful assistant named Friday.",
        toolkit=toolkit,
        memory=InMemoryMemory(),
        formatter=DashScopeChatFormatter(),
    )
    agent.set_console_output_enabled(enabled=False)

    # Load state
    await agent_app.state.session.load_session_state(
        session_id=session_id,
        user_id=user_id,
        agent=agent,
    )

    async for msg, last in stream_printing_messages(
            agents=[agent],
            coroutine_task=agent(msgs),
    ):
        yield msg, last

    # Save state
    await agent_app.state.session.save_session_state(
        session_id=session_id,
        user_id=user_id,
        agent=agent,
    )


# 4. Run the application
agent_app.run(host="127.0.0.1", port=8090)
```

## Tool Sandbox

Tool Sandbox provides secure, isolated environments for executing code and tools without affecting your system. It supports multiple sandbox types including base Python/shell execution, GUI operations, browser automation, filesystem access, and mobile interactions, with both synchronous and asynchronous APIs.

### Complete Example

```python
# --- Synchronous version ---
from agentscope_runtime.sandbox import BaseSandbox

with BaseSandbox() as box:
    # By default, pulls `agentscope/runtime-sandbox-base:latest` from DockerHub
    print(box.list_tools()) # List all available tools
    print(box.run_ipython_cell(code="print('hi')"))  # Run Python code
    print(box.run_shell_command(command="echo hello"))  # Run shell command
    input("Press Enter to continue...")

# --- Asynchronous version ---
from agentscope_runtime.sandbox import BaseSandboxAsync

async with BaseSandboxAsync() as box:
    # Default image is `agentscope/runtime-sandbox-base:latest`
    print(await box.list_tools_async())  # List all available tools
    print(await box.run_ipython_cell(code="print('hi')"))  # Run Python code
    print(await box.run_shell_command(command="echo hello"))  # Run shell command
    input("Press Enter to continue...")
```

## Further Reading

* [AgentScope-Runtime Documentation](https://runtime.agentscope.io/en/intro.html)
* [AgentScope-Runtime GitHub Repository](https://github.com/agentscope-ai/agentscope-runtime)