# PlannerWorkerSwarm Examples

This page provides practical examples of how to use the `PlannerWorkerSwarm` for various real-world scenarios.

## Basic Example: Market Research

```python
from swarms import Agent
from swarms.structs.planner_worker_swarm import PlannerWorkerSwarm

workers = [
    Agent(
        agent_name="Research-Agent",
        agent_description="Gathers factual information and data points",
        system_prompt=(
            "You are a research specialist. Provide thorough, factual "
            "information with specific details. Be concise but comprehensive."
        ),
        model_name="gpt-5.4",
        max_loops=1,
    ),
    Agent(
        agent_name="Analysis-Agent",
        agent_description="Analyzes data and identifies patterns",
        system_prompt=(
            "You are an analysis specialist. Analyze information critically, "
            "identify patterns, and provide structured conclusions."
        ),
        model_name="gpt-5.4",
        max_loops=1,
    ),
    Agent(
        agent_name="Writing-Agent",
        agent_description="Creates clear, well-structured content",
        system_prompt=(
            "You are a writing specialist. Produce clear, well-organized "
            "content with good readability and logical flow."
        ),
        model_name="gpt-5.4",
        max_loops=1,
    ),
]

swarm = PlannerWorkerSwarm(
    name="Market-Research-Swarm",
    agents=workers,
    max_loops=1,
    max_workers=3,
    worker_timeout=120,
    output_type="string",
)

result = swarm.run(
    task="Research the current state of the electric vehicle market. "
    "Cover: top manufacturers by market share, key technology trends, "
    "and biggest challenges facing EV adoption."
)
print(result)
```

## Multi-Cycle Example: Comprehensive Report

Use `max_loops > 1` so the judge can request additional cycles when gaps are found:

```python
from swarms import Agent
from swarms.structs.planner_worker_swarm import PlannerWorkerSwarm

workers = [
    Agent(
        agent_name="Research-Agent",
        agent_description="Gathers factual information and statistics",
        model_name="gpt-5.4",
        max_loops=1,
    ),
    Agent(
        agent_name="Analysis-Agent",
        agent_description="Analyzes data and identifies trends",
        model_name="gpt-5.4",
        max_loops=1,
    ),
    Agent(
        agent_name="Strategy-Agent",
        agent_description="Evaluates strategic implications and recommendations",
        model_name="gpt-5.4",
        max_loops=1,
    ),
    Agent(
        agent_name="Data-Agent",
        agent_description="Compiles statistics, comparisons, and quantitative data",
        model_name="gpt-5.4",
        max_loops=1,
    ),
]

swarm = PlannerWorkerSwarm(
    name="Report-Swarm",
    agents=workers,
    max_loops=3,            # up to 3 cycles for iterative refinement
    max_workers=4,
    worker_timeout=180,
    task_timeout=60,        # 60s per individual task
    output_type="string",
)

result = swarm.run(
    task="Produce a comprehensive investment report on the cloud computing "
    "industry. Include: market size and growth projections, major players "
    "and competitive positioning, key technology trends (AI, edge, serverless), "
    "risk factors, and a 5-year outlook with specific recommendations."
)
print(result)
```

## Recursive Sub-Planners

Set `max_planner_depth > 1` to automatically decompose CRITICAL-priority tasks into smaller subtasks:

```python
from swarms import Agent
from swarms.structs.planner_worker_swarm import PlannerWorkerSwarm

workers = [
    Agent(
        agent_name="Backend-Dev",
        agent_description="Designs and implements backend systems and APIs",
        model_name="gpt-5.4",
        max_loops=1,
    ),
    Agent(
        agent_name="Frontend-Dev",
        agent_description="Designs and implements user interfaces",
        model_name="gpt-5.4",
        max_loops=1,
    ),
    Agent(
        agent_name="DevOps-Engineer",
        agent_description="Handles deployment, infrastructure, and CI/CD",
        model_name="gpt-5.4",
        max_loops=1,
    ),
]

swarm = PlannerWorkerSwarm(
    name="Engineering-Swarm",
    agents=workers,
    max_loops=2,
    max_planner_depth=2,    # CRITICAL tasks get decomposed by sub-planner
    max_workers=3,
    worker_timeout=120,
)

result = swarm.run(
    task="Design a REST API for a task management system. "
    "Include endpoint specifications, database schema, "
    "authentication strategy, and deployment architecture."
)
print(result)
```

## SwarmRouter Integration

Use `PlannerWorkerSwarm` through the `SwarmRouter` factory:

```python
from swarms import Agent
from swarms.structs.swarm_router import SwarmRouter

workers = [
    Agent(
        agent_name="Analyst",
        agent_description="Financial analysis and valuation",
        model_name="gpt-5.4",
        max_loops=1,
    ),
    Agent(
        agent_name="Researcher",
        agent_description="Market research and data gathering",
        model_name="gpt-5.4",
        max_loops=1,
    ),
]

router = SwarmRouter(agents=workers, swarm_type="PlannerWorkerSwarm")
result = router.run("Analyze the competitive landscape of cloud computing providers")
print(result)
```

## Monitoring Task Queue Status

Inspect the task queue after execution to see what each worker did:

```python
from swarms import Agent
from swarms.structs.planner_worker_swarm import PlannerWorkerSwarm

workers = [
    Agent(agent_name="W1", model_name="gpt-5.4", max_loops=1),
    Agent(agent_name="W2", model_name="gpt-5.4", max_loops=1),
]

swarm = PlannerWorkerSwarm(
    agents=workers,
    max_loops=1,
    max_workers=2,
    worker_timeout=120,
)

result = swarm.run(task="Compare Python and Rust for systems programming")

# Inspect what happened
status = swarm.get_status()
print(f"Total tasks: {status['queue']['total']}")
print(f"Progress: {status['queue']['progress']}")

for task in status["queue"]["tasks"]:
    print(
        f"  [{task['status']:>9}] {task['title']:<50} "
        f"-> {task['assigned_worker'] or 'unassigned'}"
    )
```

## With Timeouts for Production

Always set timeouts in production to prevent runaway execution:

```python
from swarms import Agent
from swarms.structs.planner_worker_swarm import PlannerWorkerSwarm

workers = [
    Agent(agent_name="Agent-1", model_name="gpt-5.4", max_loops=1),
    Agent(agent_name="Agent-2", model_name="gpt-5.4", max_loops=1),
    Agent(agent_name="Agent-3", model_name="gpt-5.4", max_loops=1),
]

swarm = PlannerWorkerSwarm(
    agents=workers,
    max_loops=2,
    max_workers=3,
    worker_timeout=120,     # 2 min max for worker phase per cycle
    task_timeout=30,        # 30s max per individual task
    planner_model_name="gpt-5.4",
    judge_model_name="gpt-5.4",
)

result = swarm.run(task="Summarize the top 5 AI research papers from 2025")
print(result)
```

## Key Takeaways

1. **Agent Specialization**: Create workers with specific, well-defined expertise areas so the planner can match tasks to strengths
2. **Agent Descriptions**: Provide clear `agent_description` fields — the planner uses these to understand worker capabilities
3. **Single-Loop Workers**: Set `max_loops=1` on worker agents — the swarm's outer loop handles iteration
4. **Timeouts in Production**: Always set `worker_timeout` and `task_timeout` to prevent runaway execution
5. **Multi-Cycle Refinement**: Use `max_loops > 1` for complex tasks — the judge identifies gaps and the planner fills them
6. **Context Preservation**: The swarm maintains full conversation history automatically across cycles

For more detailed information about the `PlannerWorkerSwarm` API and advanced usage patterns, see the [reference documentation](../structs/planner_worker_swarm.md).
