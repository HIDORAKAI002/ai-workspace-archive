"""
Commodities investing analysis pipeline with drift detection.

Three agents run sequentially: macro research → portfolio construction →
risk assessment. DriftDetection scores the final output against the
original task; if it falls below the threshold the pipeline reruns.
"""

from swarms import Agent, SequentialWorkflow

macro_agent = Agent(
    agent_name="Macro-Commodities-Researcher",
    system_prompt="""You are a macro commodities research specialist.
Analyze global supply/demand dynamics, geopolitical factors, and
monetary policy impacts on commodity markets (energy, metals, agriculture).
Identify which commodity sectors are positioned for outperformance
and explain the macroeconomic thesis driving each.""",
    model_name="gpt-5.4",
    max_loops=1,
    output_type="string",
)

portfolio_agent = Agent(
    agent_name="Commodities-Portfolio-Strategist",
    system_prompt="""You are a commodities portfolio strategist.
Given macro research inputs, construct a specific, investable
commodities portfolio. Recommend concrete instruments (ETFs, futures,
mining equities, royalty companies). Include target allocations,
entry rationale, and expected holding periods for each position.""",
    model_name="gpt-5.4",
    max_loops=1,
    output_type="string",
)

risk_agent = Agent(
    agent_name="Commodities-Risk-Analyst",
    system_prompt="""You are a commodities risk analyst.
Evaluate the proposed portfolio for: price volatility and drawdown risk,
currency and geopolitical exposure, liquidity constraints, correlation
to equities in a risk-off environment, and tail-risk scenarios
(supply shock, demand collapse, policy reversal). Provide a clear
risk-adjusted verdict and any suggested hedges.""",
    model_name="gpt-5.4",
    max_loops=1,
    output_type="string",
)

workflow = SequentialWorkflow(
    name="commodities-investing-pipeline",
    description="Sequential macro → portfolio → risk analysis for commodities investing",
    agents=[macro_agent, portfolio_agent, risk_agent],
    max_loops=1,
    drift_detection=True,
    drift_threshold=0.75,
    drift_model="claude-sonnet-4-5",
)

if __name__ == "__main__":
    result = workflow.run(
        "Build a commodities investing strategy for 2025–2026. "
        "Focus on energy transition metals (copper, lithium, uranium), "
        "agricultural commodities under climate stress, and oil & gas "
        "names with strong free cash flow. Provide a full macro thesis, "
        "specific portfolio allocations, and a risk assessment."
    )
    print(result)
