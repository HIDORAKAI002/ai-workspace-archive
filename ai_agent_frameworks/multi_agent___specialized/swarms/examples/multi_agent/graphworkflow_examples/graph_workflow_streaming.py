"""
GraphWorkflow Token Streaming Example

Demonstrates real token-by-token streaming from multiple agents.
You'll see tokens appear in the terminal as each agent generates
them, with color-coded labels showing which agent is "speaking".

Architecture:
    Coordinator (Layer 0)
        -> Market-Analyst   (Layer 1, parallel)
        -> Tech-Analyst     (Layer 1, parallel)
        -> Risk-Analyst     (Layer 1, parallel)
            -> Synthesizer  (Layer 2)
"""

import sys
import threading
import time

from swarms.structs.agent import Agent
from swarms.structs.graph_workflow import GraphWorkflow

# ANSI colors for each agent
COLORS = {
    "Coordinator": "\033[96m",  # cyan
    "Market-Analyst": "\033[93m",  # yellow
    "Tech-Analyst": "\033[92m",  # green
    "Risk-Analyst": "\033[91m",  # red
    "Synthesizer": "\033[95m",  # magenta
}
RESET = "\033[0m"
BOLD = "\033[1m"

# Lock to avoid garbled output from parallel agents
print_lock = threading.Lock()


def create_agent(name: str, description: str) -> Agent:
    return Agent(
        agent_name=name,
        agent_description=description,
        system_prompt=f"You are {name}. {description} Keep your response to 2-3 sentences.",
        model_name="gpt-5.4",
        max_loops=1,
        verbose=False,
        print_on=False,
        streaming_on=True,
    )


def main():
    # -- Build agents --
    coordinator = create_agent(
        "Coordinator",
        "You coordinate analysis tasks. Briefly outline what each team member should focus on.",
    )
    market_analyst = create_agent(
        "Market-Analyst",
        "You analyse market trends and competitive landscape.",
    )
    tech_analyst = create_agent(
        "Tech-Analyst",
        "You evaluate technical feasibility and architecture.",
    )
    risk_analyst = create_agent(
        "Risk-Analyst",
        "You identify risks and propose mitigations.",
    )
    synthesizer = create_agent(
        "Synthesizer",
        "You synthesize inputs from multiple analysts into a concise executive summary.",
    )

    # -- Build workflow --
    workflow = GraphWorkflow(name="Streaming-Demo")
    for agent in [
        coordinator,
        market_analyst,
        tech_analyst,
        risk_analyst,
        synthesizer,
    ]:
        workflow.add_node(agent)

    workflow.add_edges_from_source(
        "Coordinator",
        ["Market-Analyst", "Tech-Analyst", "Risk-Analyst"],
    )
    workflow.add_edges_to_target(
        ["Market-Analyst", "Tech-Analyst", "Risk-Analyst"],
        "Synthesizer",
    )

    # -- Token-by-token streaming callback --
    # Track which agents have printed their header
    active_agents = {}

    def on_token(node_id: str, token: str) -> None:
        color = COLORS.get(node_id, "")
        with print_lock:
            if node_id not in active_agents:
                active_agents[node_id] = True
                sys.stdout.write(
                    f"\n{color}{BOLD}[{node_id}]{RESET}{color} "
                )
            sys.stdout.write(f"{color}{token}{RESET}")
            sys.stdout.flush()

    def on_complete(node_id: str, output) -> None:
        with print_lock:
            sys.stdout.write("\n")
            sys.stdout.flush()
        # Clear so next run of same agent gets a new header
        active_agents.pop(node_id, None)

    # -- Run --
    task = "Evaluate the feasibility of launching an AI-powered personal finance assistant."

    print(f"{BOLD}{'=' * 60}")
    print("  GraphWorkflow Token Streaming Demo")
    print(f"{'=' * 60}{RESET}")
    print(f"\n  Task: {task}\n")

    start = time.time()
    result = workflow.run(
        task,
        streaming_callback=on_token,
        on_node_complete=on_complete,
    )
    elapsed = time.time() - start

    print(f"\n{BOLD}{'=' * 60}")
    print(
        f"  Done in {elapsed:.1f}s  |  Agents: {list(result.keys())}"
    )
    print(f"{'=' * 60}{RESET}")


if __name__ == "__main__":
    main()
