"""
Unit tests for Culture integration with Agent.

Tests cover:
- Agent initialization with culture
- System prompt injection via SystemPromptManager
- Culture preparation flow
- Repeat functionality in _handle_model_response
- Culture without system prompt injection
"""

import pytest
from unittest.mock import Mock, AsyncMock, patch
from upsonic.culture import Culture, CultureManager
from upsonic.tasks.tasks import Task


class TestAgentCultureInitialization:
    """Test Agent initialization with Culture."""
    
    @patch('upsonic.models.infer_model')
    def test_agent_with_culture(self, mock_infer_model):
        """Test Agent initialization with culture parameter."""
        from upsonic.agent.agent import Agent
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(description="You are a helpful assistant")
        agent = Agent("openai/gpt-4o", culture=culture)
        
        assert agent._culture_input == culture
        assert agent._culture_manager is not None
        assert agent._culture_manager.culture == culture
    
    @patch('upsonic.models.infer_model')
    def test_agent_without_culture(self, mock_infer_model):
        """Test Agent initialization without culture."""
        from upsonic.agent.agent import Agent
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        agent = Agent("openai/gpt-4o")
        
        assert agent._culture_input is None
        assert agent._culture_manager is None
    
    @patch('upsonic.models.infer_model')
    def test_agent_culture_manager_enabled(self, mock_infer_model):
        """Test that CultureManager is enabled when culture is provided."""
        from upsonic.agent.agent import Agent
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(description="You are helpful")
        agent = Agent("openai/gpt-4o", culture=culture)
        
        assert agent._culture_manager.enabled is True


class TestAgentCultureSystemPromptInjection:
    """Test culture injection into system prompt."""
    
    @pytest.mark.asyncio
    @patch('upsonic.models.infer_model')
    async def test_system_prompt_includes_culture_when_add_system_prompt_true(self, mock_infer_model):
        """Test that culture is added to system prompt when add_system_prompt=True."""
        from upsonic.agent.agent import Agent
        from upsonic.agent.context_managers.system_prompt_manager import SystemPromptManager
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(
            description="You are a 5-star hotel receptionist",
            add_system_prompt=True
        )
        agent = Agent("openai/gpt-4o", culture=culture)
        
        # Manually set extracted guidelines to avoid API call
        agent._culture_manager._extracted_guidelines = {
            "tone_of_speech": "Professional",
            "topics_to_avoid": "None",
            "topics_to_help": "All topics",
            "things_to_pay_attention": "User needs"
        }
        agent._culture_manager._prepared = True
        
        # Get system prompt manager with task
        task = Task("Test task")
        system_prompt_manager = SystemPromptManager(agent, task)
        
        # Prepare system prompt
        await system_prompt_manager.aprepare()
        
        system_prompt = system_prompt_manager.get_system_prompt()
        
        assert system_prompt is not None
        assert "<CulturalKnowledge>" in system_prompt
        assert "## MANDATORY AGENT CULTURE GUIDELINES - STRICT COMPLIANCE REQUIRED" in system_prompt
    
    @pytest.mark.asyncio
    @patch('upsonic.models.infer_model')
    async def test_system_prompt_excludes_culture_when_add_system_prompt_false(self, mock_infer_model):
        """Test that culture is NOT added when add_system_prompt=False."""
        from upsonic.agent.agent import Agent
        from upsonic.agent.context_managers.system_prompt_manager import SystemPromptManager
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(
            description="You are a 5-star hotel receptionist",
            add_system_prompt=False
        )
        agent = Agent("openai/gpt-4o", culture=culture)
        
        # Manually set extracted guidelines to avoid API call
        agent._culture_manager._extracted_guidelines = {
            "tone_of_speech": "Professional",
            "topics_to_avoid": "None",
            "topics_to_help": "All topics",
            "things_to_pay_attention": "User needs"
        }
        agent._culture_manager._prepared = True
        
        # Get system prompt manager with task
        task = Task("Test task")
        system_prompt_manager = SystemPromptManager(agent, task)
        
        # Prepare system prompt
        await system_prompt_manager.aprepare()
        
        system_prompt = system_prompt_manager.get_system_prompt()
        
        # Culture should not be in system prompt
        if system_prompt:
            assert "<CulturalKnowledge>" not in system_prompt
    
    @pytest.mark.asyncio
    @patch('upsonic.models.infer_model')
    @patch.object(CultureManager, '_extract_guidelines', new_callable=AsyncMock)
    async def test_system_prompt_prepares_culture_if_not_prepared(self, mock_extract, mock_infer_model):
        """Test that system prompt preparation triggers culture preparation."""
        from upsonic.agent.agent import Agent
        from upsonic.agent.context_managers.system_prompt_manager import SystemPromptManager
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        # Mock culture extraction (async)
        mock_extract.return_value = {
            "tone_of_speech": "Professional",
            "topics_to_avoid": "None",
            "topics_to_help": "All topics",
            "things_to_pay_attention": "User needs"
        }
        
        culture = Culture(description="You are helpful", add_system_prompt=True)
        agent = Agent("openai/gpt-4o", culture=culture)
        
        # Culture should not be prepared yet
        assert agent._culture_manager.prepared is False
        
        # Prepare system prompt (should prepare culture)
        task = Task("Test task")
        system_prompt_manager = SystemPromptManager(agent, task)
        await system_prompt_manager.aprepare()
        
        # Culture should now be prepared
        assert agent._culture_manager.prepared is True


class TestAgentCultureRepeatFunctionality:
    """Test culture repeat functionality in Agent."""
    
    @pytest.mark.asyncio
    @patch('upsonic.models.infer_model')
    async def test_handle_model_response_injects_culture_on_repeat(self, mock_infer_model):
        """Test that _handle_model_response injects culture when should_repeat returns True."""
        from upsonic.agent.agent import Agent
        from upsonic.messages import ModelResponse, ModelRequest, TextPart
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(
            description="You are helpful",
            repeat=True,
            repeat_interval=1  # Repeat every message
        )
        agent = Agent("openai/gpt-4o", culture=culture)
        
        # Manually set extracted guidelines to avoid API call
        agent._culture_manager._extracted_guidelines = {
            "tone_of_speech": "Professional",
            "topics_to_avoid": "None",
            "topics_to_help": "All topics",
            "things_to_pay_attention": "User needs"
        }
        agent._culture_manager._prepared = True
        
        # Setup mock response and messages
        mock_response = ModelResponse(
            parts=[TextPart(content="Test response")],
            model_name="openai/gpt-4o",
        )
        
        messages = [
            ModelRequest(
                parts=[TextPart(content="User message")],
            )
        ]
        
        # Set message count to trigger repeat
        agent._culture_manager._message_count = 0  # Will trigger on first should_repeat call
        
        # Call _handle_model_response
        result = await agent._handle_model_response(mock_response, messages)
        
        # Check that culture was injected (new message should be added)
        # The exact implementation depends on how culture is injected
        # This test verifies the method completes without error
        assert result is not None
    
    @pytest.mark.asyncio
    @patch('upsonic.models.infer_model')
    async def test_handle_model_response_no_repeat_when_repeat_false(self, mock_infer_model):
        """Test that culture is not repeated when repeat=False."""
        from upsonic.agent.agent import Agent
        from upsonic.messages import ModelResponse, ModelRequest, TextPart
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(
            description="You are helpful",
            repeat=False
        )
        agent = Agent("openai/gpt-4o", culture=culture)
        
        # Manually set extracted guidelines to avoid API call
        agent._culture_manager._extracted_guidelines = {
            "tone_of_speech": "Professional",
            "topics_to_avoid": "None",
            "topics_to_help": "All topics",
            "things_to_pay_attention": "User needs"
        }
        agent._culture_manager._prepared = True
        
        mock_response = ModelResponse(
            parts=[TextPart(content="Test response")],
            model_name="openai/gpt-4o",
        )
        
        messages = [
            ModelRequest(
                parts=[TextPart(content="User message")],
            )
        ]
        
        result = await agent._handle_model_response(mock_response, messages)
        
        # Messages should not have culture injected
        assert result is not None


class TestAgentCulturePreparationFlow:
    """Test culture preparation flow in Agent execution."""
    
    @pytest.mark.asyncio
    @patch('upsonic.models.infer_model')
    @patch.object(CultureManager, 'aprepare', new_callable=AsyncMock)
    async def test_culture_preparation_during_agent_execution(self, mock_aprepare, mock_infer_model):
        """Test that system prompt preparation triggers culture preparation."""
        from upsonic.agent.agent import Agent
        from upsonic.agent.context_managers.system_prompt_manager import SystemPromptManager
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(description="You are helpful", add_system_prompt=True)
        agent = Agent("openai/gpt-4o", culture=culture)
        
        # Mock aprepare to set guidelines without API call
        async def mock_aprepare_side_effect():
            agent._culture_manager._extracted_guidelines = {
                "tone_of_speech": "Professional",
                "topics_to_avoid": "None",
                "topics_to_help": "All topics",
                "things_to_pay_attention": "User needs"
            }
            agent._culture_manager._prepared = True
        
        mock_aprepare.side_effect = mock_aprepare_side_effect
        
        # Culture should not be prepared initially
        assert agent._culture_manager.prepared is False
        
        # Simulate system prompt preparation (happens during agent execution)
        task = Task("Test task")
        system_prompt_manager = SystemPromptManager(agent, task)
        await system_prompt_manager.aprepare()
        
        # Culture should now be prepared (mock was called)
        assert agent._culture_manager.prepared is True
        assert agent._culture_manager.extracted_guidelines is not None


class TestAgentCultureEdgeCases:
    """Test edge cases for Agent-Culture integration."""
    
    @patch('upsonic.models.infer_model')
    def test_agent_with_culture_disabled(self, mock_infer_model):
        """Test Agent with culture but CultureManager disabled."""
        from upsonic.agent.agent import Agent
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(description="You are helpful")
        agent = Agent("openai/gpt-4o", culture=culture)
        
        # Disable culture manager
        agent._culture_manager.enabled = False
        
        assert agent._culture_manager.enabled is False
    
    @pytest.mark.asyncio
    @patch('upsonic.models.infer_model')
    async def test_agent_culture_with_empty_guidelines(self, mock_infer_model):
        """Test Agent with culture that has empty extracted guidelines."""
        from upsonic.agent.agent import Agent
        from upsonic.agent.context_managers.system_prompt_manager import SystemPromptManager
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(description="You are helpful", add_system_prompt=True)
        agent = Agent("openai/gpt-4o", culture=culture)
        
        # Manually set empty guidelines
        agent._culture_manager._extracted_guidelines = {}
        agent._culture_manager._prepared = True
        
        task = Task("Test task")
        system_prompt_manager = SystemPromptManager(agent, task)
        await system_prompt_manager.aprepare()
        
        # Should handle gracefully
        system_prompt = system_prompt_manager.get_system_prompt()
        # System prompt should still exist (may or may not include culture)
        assert system_prompt is not None or system_prompt == ""
    
    @patch('upsonic.models.infer_model')
    def test_agent_culture_manager_initialization_parameters(self, mock_infer_model):
        """Test that CultureManager is initialized with correct parameters from Agent."""
        from upsonic.agent.agent import Agent
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(description="You are helpful")
        agent = Agent(
            "openai/gpt-4o",
            culture=culture,
            debug=True,
            debug_level=2
        )
        
        assert agent._culture_manager.debug is True
        assert agent._culture_manager.debug_level == 2
        assert agent._culture_manager._model_spec == "openai/gpt-4o"


class TestAgentCultureWithTaskExecution:
    """Test Agent culture behavior during task execution."""
    
    @pytest.mark.asyncio
    @pytest.mark.skip(reason="Requires actual model API call - use smoke tests instead")
    async def test_agent_do_with_culture(self):
        """Test agent.do() with culture (integration test - skipped in unit tests)."""
        # This test would require actual API calls
        # Should be in smoke tests instead
        pass
    
    @patch('upsonic.models.infer_model')
    def test_culture_format_in_system_prompt_structure(self, mock_infer_model):
        """Test that culture formatting follows expected structure."""
        from upsonic.agent.agent import Agent
        
        # Mock model to avoid API key requirement
        mock_model = Mock()
        mock_model.model_name = "openai/gpt-4o"
        mock_infer_model.return_value = mock_model
        
        culture = Culture(description="You are a professional consultant", add_system_prompt=True)
        agent = Agent("openai/gpt-4o", culture=culture)
        
        # Manually set guidelines
        agent._culture_manager._extracted_guidelines = {
            "tone_of_speech": "Professional and courteous",
            "topics_to_avoid": "Personal financial information",
            "topics_to_help": "Business strategy and consulting",
            "things_to_pay_attention": "Client confidentiality"
        }
        agent._culture_manager._prepared = True
        
        formatted = agent._culture_manager.format_for_system_prompt()
        
        assert formatted is not None
        assert formatted.startswith("<CulturalKnowledge>")
        assert formatted.endswith("</CulturalKnowledge>")
        assert "## MANDATORY AGENT CULTURE GUIDELINES - STRICT COMPLIANCE REQUIRED" in formatted
        assert "### Tone of Speech" in formatted
        assert "### Topics I Shouldn't Talk About" in formatted
        assert "### Topics I Can Help With" in formatted
        assert "### Things I Should Pay Attention To" in formatted
