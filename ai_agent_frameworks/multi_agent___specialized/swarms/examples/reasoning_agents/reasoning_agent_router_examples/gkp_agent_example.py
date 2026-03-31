from swarms.agents.reasoning_agent_router import ReasoningAgentRouter

router = ReasoningAgentRouter(
    swarm_type="GKPAgent",
    model_name="gpt-5.4",
    num_knowledge_items=3,
)

result = router.run("What is artificial intelligence?")
