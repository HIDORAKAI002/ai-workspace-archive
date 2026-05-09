from swarms import Agent, SequentialWorkflow

workflow = SequentialWorkflow(
    agents=[
        Agent(
            agent_name="Researcher",
            system_prompt="Write two short bullet points on the topic.",
            model_name="gpt-5.4-mini",
            max_loops=1,
            persistent_memory=False,
        ),
        Agent(
            agent_name="Writer",
            system_prompt="Combine the bullets into one short paragraph.",
            model_name="gpt-5.4-mini",
            max_loops=1,
            persistent_memory=False,
        ),
    ],
)

for evt in workflow.run_stream(
    "what is your name?", with_events=True
):
    if evt["type"] == "agent_start":
        print(f"\n--- {evt['agent']} ---")
    elif evt["type"] == "token":
        print(evt["token"], end="", flush=True)
    elif evt["type"] == "agent_end":
        print(f"\n--- {evt['agent']} finished ---")
print()
