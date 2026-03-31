"""
Smoke Test: Culture Feature Usage

This test verifies the new Culture feature usage pattern:
- Creating Culture with description, add_system_prompt, repeat, repeat_interval
- Using Culture with Agent
- Verifying culture extraction and system prompt injection
- Testing repeat functionality

Usage:
    python tests/smoke_tests/culture/test_culture_usage.py
    pytest tests/smoke_tests/culture/test_culture_usage.py -v
"""

import pytest
from upsonic import Agent, Task
from upsonic.culture import Culture, CultureManager


def test_culture_creation():
    """Test creating Culture with the provided usage pattern."""
    print("\n" + "=" * 70)
    print("TEST 1: Culture Creation")
    print("=" * 70)
    
    my_culture = Culture(
        description="You are a 5-star hotel receptionist",
        add_system_prompt=True,  # default true
        repeat=False,  # default false
        repeat_interval=5  # default 5
    )
    
    assert my_culture is not None, "Culture should be created"
    assert my_culture.description == "You are a 5-star hotel receptionist", "Description should match"
    assert my_culture.add_system_prompt == True, "add_system_prompt should be True"
    assert my_culture.repeat == False, "repeat should be False"
    assert my_culture.repeat_interval == 5, "repeat_interval should be 5"
    
    print("✓ Culture created successfully")
    print(f"  Description: {my_culture.description}")
    print(f"  add_system_prompt: {my_culture.add_system_prompt}")
    print(f"  repeat: {my_culture.repeat}")
    print(f"  repeat_interval: {my_culture.repeat_interval}")


def test_culture_defaults():
    """Test Culture with default values."""
    print("\n" + "=" * 70)
    print("TEST 2: Culture Defaults")
    print("=" * 70)
    
    culture = Culture(description="Test description")
    
    assert culture.add_system_prompt == True, "add_system_prompt should default to True"
    assert culture.repeat == False, "repeat should default to False"
    assert culture.repeat_interval == 5, "repeat_interval should default to 5"
    
    print("✓ Default values are correct")


def test_agent_with_culture():
    """Test creating Agent with Culture."""
    print("\n" + "=" * 70)
    print("TEST 3: Agent with Culture")
    print("=" * 70)
    
    my_culture = Culture(
        description="You are a 5-star hotel receptionist",
        add_system_prompt=True,
        repeat=False,
        repeat_interval=5
    )
    
    agent = Agent("openai/gpt-4o", culture=my_culture)
    
    assert agent is not None, "Agent should be created"
    assert agent._culture_manager is not None, "CultureManager should be created"
    assert agent._culture_manager.culture == my_culture, "Culture should be set"
    assert agent._culture_manager.enabled == True, "CultureManager should be enabled"
    
    print("✓ Agent created with culture")
    print(f"  CultureManager exists: {agent._culture_manager is not None}")
    print(f"  Culture enabled: {agent._culture_manager.enabled}")


@pytest.mark.asyncio
async def test_culture_extraction():
    """Test that culture guidelines are extracted from description."""
    print("\n" + "=" * 70)
    print("TEST 4: Culture Extraction")
    print("=" * 70)
    
    my_culture = Culture(
        description="You are a 5-star hotel receptionist who welcomes guests warmly and helps with hotel services",
        add_system_prompt=True,
        repeat=False,
        repeat_interval=5
    )
    
    manager = CultureManager(
        model="openai/gpt-4o",
        enabled=True,
        debug=True
    )
    
    manager.set_culture(my_culture)
    assert manager.culture == my_culture, "Culture should be set"
    assert manager.prepared == False, "Culture should not be prepared yet"
    
    # Prepare culture (extract guidelines)
    await manager.aprepare()
    
    assert manager.prepared == True, "Culture should be prepared"
    assert manager.extracted_guidelines is not None, "Guidelines should be extracted"
    
    guidelines = manager.extracted_guidelines
    assert "tone_of_speech" in guidelines, "Should have tone_of_speech"
    assert "topics_to_avoid" in guidelines, "Should have topics_to_avoid"
    assert "topics_to_help" in guidelines, "Should have topics_to_help"
    assert "things_to_pay_attention" in guidelines, "Should have things_to_pay_attention"
    
    print("✓ Culture guidelines extracted")
    print(f"  Tone of Speech: {guidelines['tone_of_speech'][:50]}...")
    print(f"  Topics to Avoid: {guidelines['topics_to_avoid'][:50]}...")
    print(f"  Topics to Help: {guidelines['topics_to_help'][:50]}...")
    print(f"  Things to Pay Attention: {guidelines['things_to_pay_attention'][:50]}...")


@pytest.mark.asyncio
async def test_culture_format_for_system_prompt():
    """Test formatting culture for system prompt with tags."""
    print("\n" + "=" * 70)
    print("TEST 5: Culture Format for System Prompt")
    print("=" * 70)
    
    my_culture = Culture(
        description="You are a 5-star hotel receptionist",
        add_system_prompt=True,
        repeat=False,
        repeat_interval=5
    )
    
    manager = CultureManager(
        model="openai/gpt-4o",
        enabled=True,
        debug=True
    )
    
    manager.set_culture(my_culture)
    await manager.aprepare()
    
    formatted = manager.format_for_system_prompt()
    
    assert formatted is not None, "Formatted string should not be None"
    assert "<CulturalKnowledge>" in formatted, "Should contain opening tag"
    assert "</CulturalKnowledge>" in formatted, "Should contain closing tag"
    assert (
        "Agent Culture Guidelines" in formatted or "AGENT CULTURE GUIDELINES" in formatted
    ), "Should contain header"
    assert "Tone of Speech" in formatted, "Should contain Tone of Speech section"
    assert "Topics I Shouldn't Talk About" in formatted, "Should contain Topics to Avoid section"
    assert "Topics I Can Help With" in formatted, "Should contain Topics to Help section"
    assert "Things I Should Pay Attention To" in formatted, "Should contain Things to Pay Attention section"
    
    print("✓ Culture formatted correctly for system prompt")
    print(f"  Contains <CulturalKnowledge> tags: {('<CulturalKnowledge>' in formatted and '</CulturalKnowledge>' in formatted)}")
    print(f"  Length: {len(formatted)} characters")


@pytest.mark.asyncio
async def test_agent_with_culture_execution():
    """Test Agent with Culture executing a task."""
    print("\n" + "=" * 70)
    print("TEST 6: Agent with Culture Execution")
    print("=" * 70)
    
    my_culture = Culture(
        description="You are a 5-star hotel receptionist who welcomes guests warmly",
        add_system_prompt=True,
        repeat=False,
        repeat_interval=5
    )
    
    agent = Agent("openai/gpt-4o", culture=my_culture)
    
    # Verify culture manager is set up
    assert agent._culture_manager is not None, "CultureManager should exist"
    assert agent._culture_manager.culture == my_culture, "Culture should be set"
    
    # Execute a task
    task = Task("Greet me as I arrive at the hotel")
    result = await agent.do_async(task)
    
    assert result is not None, "Task result should not be None"
    assert len(str(result)) > 0, "Result should not be empty"
    
    print("✓ Task executed successfully with culture")
    print(f"  Result preview: {str(result)[:100]}...")


def test_culture_repeat_settings():
    """Test Culture with repeat enabled."""
    print("\n" + "=" * 70)
    print("TEST 7: Culture Repeat Settings")
    print("=" * 70)
    
    culture_with_repeat = Culture(
        description="You are a helpful assistant",
        add_system_prompt=True,
        repeat=True,
        repeat_interval=3
    )
    
    assert culture_with_repeat.repeat == True, "repeat should be True"
    assert culture_with_repeat.repeat_interval == 3, "repeat_interval should be 3"
    
    manager = CultureManager(model="openai/gpt-4o")
    manager.set_culture(culture_with_repeat)
    
    # Test should_repeat logic
    manager.reset_message_count()  # Start fresh
    
    # Test that should_repeat increments counter
    # Initially count is 0, after first call it becomes 1
    result1 = manager.should_repeat()
    assert result1 == False, "Should not repeat initially (count=1 < interval=3)"
    assert manager._message_count == 1, "Count should be 1 after first call"
    
    # After second call, count becomes 2
    result2 = manager.should_repeat()
    assert result2 == False, "Should not repeat yet (count=2 < interval=3)"
    assert manager._message_count == 2, "Count should be 2 after second call"
    
    # After third call, count becomes 3, which triggers repeat
    result3 = manager.should_repeat()
    assert result3 == True, "Should repeat when count reaches interval (3)"
    assert manager._message_count == 0, "Count should reset to 0 after repeat"
    
    print("✓ Repeat logic works correctly")


def test_culture_without_system_prompt():
    """Test Culture with add_system_prompt=False."""
    print("\n" + "=" * 70)
    print("TEST 8: Culture Without System Prompt")
    print("=" * 70)
    
    culture_no_system = Culture(
        description="You are a helpful assistant",
        add_system_prompt=False,
        repeat=False,
        repeat_interval=5
    )
    
    assert culture_no_system.add_system_prompt == False, "add_system_prompt should be False"
    
    agent = Agent("openai/gpt-4o", culture=culture_no_system)
    
    assert agent._culture_manager is not None, "CultureManager should exist"
    assert agent._culture_manager.culture == culture_no_system, "Culture should be set"
    
    print("✓ Culture created with add_system_prompt=False")


def test_culture_to_dict_from_dict():
    """Test Culture serialization."""
    print("\n" + "=" * 70)
    print("TEST 9: Culture Serialization")
    print("=" * 70)
    
    original = Culture(
        description="You are a 5-star hotel receptionist",
        add_system_prompt=True,
        repeat=False,
        repeat_interval=5
    )
    
    data = original.to_dict()
    assert "description" in data, "Should have description"
    assert "add_system_prompt" in data, "Should have add_system_prompt"
    assert "repeat" in data, "Should have repeat"
    assert "repeat_interval" in data, "Should have repeat_interval"
    
    restored = Culture.from_dict(data)
    assert restored.description == original.description, "Description should match"
    assert restored.add_system_prompt == original.add_system_prompt, "add_system_prompt should match"
    assert restored.repeat == original.repeat, "repeat should match"
    assert restored.repeat_interval == original.repeat_interval, "repeat_interval should match"
    
    print("✓ Culture serialization works correctly")


def main():
    """Run all culture usage tests."""
    print("\n" + "=" * 70)
    print("CULTURE FEATURE - USAGE TEST")
    print("Testing new Culture usage pattern")
    print("=" * 70)
    
    results = []
    
    try:
        results.append(("Culture Creation", test_culture_creation()))
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        results.append(("Culture Creation", False))
    
    try:
        results.append(("Culture Defaults", test_culture_defaults()))
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        results.append(("Culture Defaults", False))
    
    try:
        results.append(("Agent with Culture", test_agent_with_culture()))
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        results.append(("Agent with Culture", False))
    
    try:
        import asyncio
        results.append(("Culture Extraction", asyncio.run(test_culture_extraction())))
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        results.append(("Culture Extraction", False))
    
    try:
        import asyncio
        results.append(("Culture Format", asyncio.run(test_culture_format_for_system_prompt())))
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        results.append(("Culture Format", False))
    
    try:
        import asyncio
        results.append(("Agent Execution", asyncio.run(test_agent_with_culture_execution())))
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        results.append(("Agent Execution", False))
    
    try:
        results.append(("Culture Repeat", test_culture_repeat_settings()))
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        results.append(("Culture Repeat", False))
    
    try:
        results.append(("Culture Without System Prompt", test_culture_without_system_prompt()))
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        results.append(("Culture Without System Prompt", False))
    
    try:
        results.append(("Culture Serialization", test_culture_to_dict_from_dict()))
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        import traceback
        traceback.print_exc()
        results.append(("Culture Serialization", False))
    
    # Summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    
    all_passed = True
    for name, passed in results:
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{status}: {name}")
        if not passed:
            all_passed = False
    
    print("\n" + "=" * 70)
    if all_passed:
        print("🎉 ALL TESTS PASSED!")
    else:
        print("⚠️ SOME TESTS FAILED")
    print("=" * 70)
    
    return all_passed


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
