import pytest
from upsonic import Task, Agent
#t

def test_models(capsys):
    list_of_models = [
        "openai/gpt-4o",
        "anthropic/claude-sonnet-4-5",
        "gemini/gemini-2.5-pro",
    ]
    for model in list_of_models:
        task = Task("What is the capital of Turkey?")
        agent = Agent(model=model)
        agent.print_do(task)

    captured = capsys.readouterr()
    out = captured.out

    agent_started_count = out.count("Agent Started")
    task_result_count = out.count("Task Result")

    assert agent_started_count == len(list_of_models), (
        f"Expected {len(list_of_models)} 'Agent Started', got {agent_started_count}"
    )
    assert task_result_count == len(list_of_models), (
        f"Expected {len(list_of_models)} 'Task Result', got {task_result_count}"
    )
