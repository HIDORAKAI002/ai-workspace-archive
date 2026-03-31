from swarms.agents.reasoning_agent_router import ReasoningAgentRouter

router = ReasoningAgentRouter(
    swarm_type="ReflexionAgent",
    model_name="gpt-5.4",
    max_loops=1,
    memory_capacity=3,
)

result = router.run("What is machine learning?")
