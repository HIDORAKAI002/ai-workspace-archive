"""
Real-time token streaming from a SequentialWorkflow.

Each agent in the pipeline streams its tokens as the LLM produces them.
When an agent finishes, its full output is handed off to the next agent
(same hand-off as workflow.run(), just streamed in real time).

Two consumption modes:

    1. Plain tokens                         (default)
    2. Structured events (with_events=True) — emits agent_start / token /
       agent_end dicts, useful for per-agent UI panels or attributing each
       token to its emitting agent.

Run:
    export OPENAI_API_KEY=sk-...
    python examples/streaming/sequential_workflow_streaming.py
"""

import asyncio
import sys

from swarms import Agent, SequentialWorkflow


def make_agent(name: str, system_prompt: str) -> Agent:
    return Agent(
        agent_name=name,
        system_prompt=system_prompt,
        model_name="gpt-4.1-mini",
        max_loops=1,
        persistent_memory=False,
        print_on=False,
    )


def build_workflow() -> SequentialWorkflow:
    return SequentialWorkflow(
        agents=[
            make_agent(
                "Researcher",
                "Research the topic and produce a concise factual brief.",
            ),
            make_agent(
                "Analyst",
                "Take the brief and produce sharp analytical insights.",
            ),
            make_agent(
                "Writer",
                "Take the analysis and produce a polished, reader-friendly summary.",
            ),
        ],
        autosave=False,
    )


# ---------------------------------------------------------------------------
# 1. Sync streaming — yields plain token strings.
# ---------------------------------------------------------------------------
def sync_streaming() -> None:
    print("=== SequentialWorkflow.run_stream (sync) ===\n")
    workflow = build_workflow()
    for token in workflow.run_stream(
        "the rise of solid-state batteries"
    ):
        sys.stdout.write(token)
        sys.stdout.flush()
    print("\n")


# ---------------------------------------------------------------------------
# 2. Async streaming — same plain-token shape, async generator.
# ---------------------------------------------------------------------------
async def async_streaming() -> None:
    print("=== SequentialWorkflow.arun_stream (async) ===\n")
    workflow = build_workflow()
    async for token in workflow.arun_stream(
        "the rise of solid-state batteries"
    ):
        sys.stdout.write(token)
        sys.stdout.flush()
    print("\n")


# ---------------------------------------------------------------------------
# 3. Structured events — yields agent_start / token / agent_end dicts.
#    Useful when you want to render a separate panel for each agent.
# ---------------------------------------------------------------------------
async def async_streaming_with_events() -> None:
    print(
        "=== SequentialWorkflow.arun_stream(with_events=True) ===\n"
    )
    workflow = build_workflow()
    async for evt in workflow.arun_stream(
        "the rise of solid-state batteries",
        with_events=True,
    ):
        if evt["type"] == "agent_start":
            print(f"\n--- {evt['agent']} starting ---")
        elif evt["type"] == "token":
            sys.stdout.write(evt["token"])
            sys.stdout.flush()
        elif evt["type"] == "agent_end":
            print(
                f"\n--- {evt['agent']} finished "
                f"({len(evt['output'])} chars) ---"
            )
    print()


async def main() -> None:
    sync_streaming()
    await async_streaming()
    await async_streaming_with_events()


if __name__ == "__main__":
    asyncio.run(main())
