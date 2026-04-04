import os
from upsonic import Agent, Task


def test_print_do_default_prints():
    """Test: print_do should print by default"""
    print("test_print_do_default_prints")
    my_agent = Agent(model="anthropic/claude-sonnet-4-5")
    task = Task("test task")
    my_agent.print_do(task)


def test_do_default_no_prints():
    """Test: do should not print by default"""
    print("test_do_default_no_prints")
    my_agent = Agent(model="anthropic/claude-sonnet-4-5")
    task = Task("test task")
    my_agent.do(task)


def test_print_do_with_print_false():
    """Test: print_do should not print when print=False"""
    print("test_print_do_with_print_false")
    my_agent = Agent(model="anthropic/claude-sonnet-4-5", print=False)
    task = Task("test task")
    my_agent.print_do(task)


def test_do_with_print_true():
    """Test: do should print when print=True"""
    print("test_do_with_print_true")
    my_agent = Agent(model="anthropic/claude-sonnet-4-5", print=True)
    task = Task("test task")
    my_agent.do(task)


def test_do_with_env_print_true():
    """Test: do should print when ENV UPSONIC_AGENT_PRINT=true"""
    print("test_do_with_env_print_true")
    original_env = os.environ.get("UPSONIC_AGENT_PRINT")
    try:
        os.environ["UPSONIC_AGENT_PRINT"] = "true"
        my_agent = Agent(model="anthropic/claude-sonnet-4-5")
        task = Task("test task")
        my_agent.do(task)
    finally:
        if original_env is not None:
            os.environ["UPSONIC_AGENT_PRINT"] = original_env
        elif "UPSONIC_AGENT_PRINT" in os.environ:
            del os.environ["UPSONIC_AGENT_PRINT"]


def test_do_with_env_print_false_and_agent_print_true():
    """Test: do should not print when ENV=false but agent print=True (ENV overrides)"""
    print("test_do_with_env_print_false_and_agent_print_true")
    original_env = os.environ.get("UPSONIC_AGENT_PRINT")
    try:
        os.environ["UPSONIC_AGENT_PRINT"] = "false"
        my_agent = Agent(model="anthropic/claude-sonnet-4-5", print=True)
        task = Task("test task")
        my_agent.do(task)
    finally:
        if original_env is not None:
            os.environ["UPSONIC_AGENT_PRINT"] = original_env
        elif "UPSONIC_AGENT_PRINT" in os.environ:
            del os.environ["UPSONIC_AGENT_PRINT"]


def test_print_do_with_env_print_false():
    """Test: print_do should not print when ENV UPSONIC_AGENT_PRINT=false"""
    print("test_print_do_with_env_print_false")
    original_env = os.environ.get("UPSONIC_AGENT_PRINT")
    try:
        os.environ["UPSONIC_AGENT_PRINT"] = "false"
        my_agent = Agent(model="anthropic/claude-sonnet-4-5")
        task = Task("test task")
        my_agent.print_do(task)
    finally:
        if original_env is not None:
            os.environ["UPSONIC_AGENT_PRINT"] = original_env
        elif "UPSONIC_AGENT_PRINT" in os.environ:
            del os.environ["UPSONIC_AGENT_PRINT"]


if __name__ == "__main__":
    test_print_do_default_prints()
    test_do_default_no_prints()
    test_print_do_with_print_false()
    test_do_with_print_true()
    test_do_with_env_print_true()
    test_do_with_env_print_false_and_agent_print_true()
    test_print_do_with_env_print_false()