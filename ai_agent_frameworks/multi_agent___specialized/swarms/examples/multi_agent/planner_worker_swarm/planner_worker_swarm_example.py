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
    Agent(
        agent_name="Strategy-Agent",
        agent_description="Evaluates strategic implications and recommendations",
        system_prompt=(
            "You are a strategy specialist. Evaluate information from a "
            "strategic perspective and provide actionable recommendations."
        ),
        model_name="gpt-5.4",
        max_loops=1,
    ),
    Agent(
        agent_name="Data-Agent",
        agent_description="Compiles statistics, comparisons, and quantitative data",
        system_prompt=(
            "You are a data specialist. Compile relevant statistics, "
            "create comparisons, and present quantitative insights clearly."
        ),
        model_name="gpt-5.4",
        max_loops=1,
    ),
]

swarm = PlannerWorkerSwarm(
    name="Market-Research-Swarm",
    description="Conducts market research through parallel agent collaboration",
    agents=workers,
    max_loops=1,
    planner_model_name="gpt-5.4",
    judge_model_name="gpt-5.4",
    max_workers=5,
    worker_timeout=120,
    output_type="string",
)

print(
    swarm.run(
        task="Research the current state of the electric vehicle (EV) market. "
        "Cover: top manufacturers by market share, key technology trends, "
        "biggest challenges facing EV adoption, regional market differences, "
        "and a 5-year outlook."
    )
)
