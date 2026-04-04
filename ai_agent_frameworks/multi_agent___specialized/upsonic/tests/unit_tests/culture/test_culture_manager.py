"""
Unit tests for CultureManager.

Tests cover:
- Initialization
- set_culture
- aprepare/prepare (with and without model)
- format_for_system_prompt
- should_repeat logic
- reset_message_count
- Serialization (to_dict/from_dict)
- Edge cases (no culture, no model, extraction failures)
"""

import pytest
from unittest.mock import Mock, AsyncMock, patch, MagicMock
from upsonic.culture import Culture, CultureManager


class TestCultureManagerInitialization:
    """Test CultureManager initialization."""
    
    def test_initialization_with_model_string(self):
        """Test initialization with model as string."""
        manager = CultureManager(model="openai/gpt-4o")
        
        assert manager._model_spec == "openai/gpt-4o"
        assert manager.enabled is True
        assert manager._culture is None
        assert manager._extracted_guidelines is None
        assert manager._prepared is False
        assert manager._message_count == 0
    
    def test_initialization_with_all_parameters(self):
        """Test initialization with all parameters."""
        manager = CultureManager(
            model="openai/gpt-4o",
            enabled=False,
            agent_id="agent_123",
            team_id="team_456",
            debug=True,
            debug_level=2
        )
        
        assert manager._model_spec == "openai/gpt-4o"
        assert manager.enabled is False
        assert manager.agent_id == "agent_123"
        assert manager.team_id == "team_456"
        assert manager.debug is True
        assert manager.debug_level == 2
    
    def test_initialization_without_model(self):
        """Test initialization without model (should use fallback)."""
        manager = CultureManager()
        
        assert manager._model_spec is None
        assert manager.enabled is True
        assert manager._culture is None


class TestCultureManagerSetCulture:
    """Test CultureManager.set_culture method."""
    
    def test_set_culture(self):
        """Test setting culture."""
        manager = CultureManager()
        culture = Culture(description="You are helpful")
        
        manager.set_culture(culture)
        
        assert manager._culture == culture
        assert manager._prepared is False  # Should reset prepared state
        assert manager._extracted_guidelines is None  # Should reset guidelines
    
    def test_set_culture_resets_prepared_state(self):
        """Test that set_culture resets prepared state."""
        manager = CultureManager()
        culture1 = Culture(description="First")
        culture2 = Culture(description="Second")
        
        manager.set_culture(culture1)
        manager._prepared = True
        manager._extracted_guidelines = {"test": "data"}
        
        manager.set_culture(culture2)
        
        assert manager._prepared is False
        assert manager._extracted_guidelines is None


class TestCultureManagerPrepare:
    """Test CultureManager preparation methods."""
    
    @pytest.mark.asyncio
    async def test_aprepare_without_culture(self):
        """Test aprepare when no culture is set."""
        manager = CultureManager()
        
        await manager.aprepare()
        
        assert manager._prepared is False
        assert manager._extracted_guidelines is None
    
    @pytest.mark.asyncio
    async def test_aprepare_without_model_uses_fallback(self):
        """Test aprepare without model uses basic fallback."""
        manager = CultureManager()
        culture = Culture(description="You are helpful")
        manager.set_culture(culture)
        
        await manager.aprepare()
        
        assert manager._prepared is True
        assert manager._extracted_guidelines is not None
        assert "tone_of_speech" in manager._extracted_guidelines
        assert "topics_to_avoid" in manager._extracted_guidelines
        assert "topics_to_help" in manager._extracted_guidelines
        assert "things_to_pay_attention" in manager._extracted_guidelines
    
    @pytest.mark.asyncio
    async def test_aprepare_idempotent(self):
        """Test that aprepare is idempotent (can be called multiple times)."""
        manager = CultureManager()
        culture = Culture(description="You are helpful")
        manager.set_culture(culture)
        
        await manager.aprepare()
        first_guidelines = manager._extracted_guidelines.copy()
        
        await manager.aprepare()  # Call again
        
        assert manager._prepared is True
        assert manager._extracted_guidelines == first_guidelines
    
    @pytest.mark.asyncio
    @patch('upsonic.agent.agent.Agent')
    async def test_aprepare_with_model_extracts_guidelines(self, mock_agent_class):
        """Test aprepare with model extracts guidelines using Agent."""
        # Setup mock agent
        mock_agent = AsyncMock()
        mock_task = Mock()
        mock_result = Mock()
        mock_result.tone_of_speech = "Professional"
        mock_result.topics_to_avoid = "Personal information"
        mock_result.topics_to_help = "Technical questions"
        mock_result.things_to_pay_attention = "User preferences"
        mock_result.output = mock_result

        mock_agent.do_async = AsyncMock(return_value=mock_result)
        mock_agent_class.return_value = mock_agent
        
        manager = CultureManager(model="openai/gpt-4o")
        culture = Culture(description="You are a professional assistant")
        manager.set_culture(culture)
        
        await manager.aprepare()
        
        assert manager._prepared is True
        assert manager._extracted_guidelines is not None
        assert manager._extracted_guidelines["tone_of_speech"] == "Professional"
        assert manager._extracted_guidelines["topics_to_avoid"] == "Personal information"
        assert manager._extracted_guidelines["topics_to_help"] == "Technical questions"
        assert manager._extracted_guidelines["things_to_pay_attention"] == "User preferences"
    
    @pytest.mark.asyncio
    @patch('upsonic.agent.agent.Agent')
    async def test_aprepare_with_model_extraction_failure_uses_fallback(self, mock_agent_class):
        """Test that extraction failure falls back to basic guidelines."""
        # Setup mock agent that raises exception
        mock_agent = AsyncMock()
        mock_agent.do_async = AsyncMock(side_effect=Exception("Extraction failed"))
        mock_agent_class.return_value = mock_agent
        
        manager = CultureManager(model="openai/gpt-4o", debug=True)
        culture = Culture(description="You are helpful")
        manager.set_culture(culture)
        
        await manager.aprepare()
        
        assert manager._prepared is True
        assert manager._extracted_guidelines is not None
        # Should have fallback values
        assert "tone_of_speech" in manager._extracted_guidelines
    
    @pytest.mark.asyncio
    @patch('upsonic.agent.agent.Agent')
    async def test_aprepare_with_model_no_result_uses_fallback(self, mock_agent_class):
        """Test that None result from extraction uses fallback."""
        # Setup mock agent that returns None
        mock_agent = AsyncMock()
        mock_agent.do_async = AsyncMock(return_value=None)
        mock_agent_class.return_value = mock_agent
        
        manager = CultureManager(model="openai/gpt-4o", debug=True)
        culture = Culture(description="You are helpful")
        manager.set_culture(culture)
        
        await manager.aprepare()
        
        assert manager._prepared is True
        assert manager._extracted_guidelines is not None
        # Should have fallback values
        assert "tone_of_speech" in manager._extracted_guidelines
    
    def test_prepare_synchronous(self):
        """Test synchronous prepare method."""
        manager = CultureManager()
        culture = Culture(description="You are helpful")
        manager.set_culture(culture)
        
        manager.prepare()
        
        assert manager._prepared is True
        assert manager._extracted_guidelines is not None


class TestCultureManagerFormatForSystemPrompt:
    """Test CultureManager.format_for_system_prompt method."""
    
    def test_format_for_system_prompt_without_culture(self):
        """Test format_for_system_prompt when no culture is set."""
        manager = CultureManager()
        
        result = manager.format_for_system_prompt()
        
        assert result is None
    
    def test_format_for_system_prompt_without_preparation(self):
        """Test format_for_system_prompt when culture not prepared."""
        manager = CultureManager()
        culture = Culture(description="You are helpful")
        manager.set_culture(culture)
        
        result = manager.format_for_system_prompt()
        
        assert result is None
    
    def test_format_for_system_prompt_with_guidelines(self):
        """Test format_for_system_prompt with extracted guidelines."""
        manager = CultureManager()
        culture = Culture(description="You are helpful")
        manager.set_culture(culture)
        manager._extracted_guidelines = {
            "tone_of_speech": "Professional and friendly",
            "topics_to_avoid": "Personal information",
            "topics_to_help": "Technical questions",
            "things_to_pay_attention": "User preferences"
        }
        manager._prepared = True
        
        result = manager.format_for_system_prompt()
        
        assert result is not None
        assert "<CulturalKnowledge>" in result
        assert "</CulturalKnowledge>" in result
        assert "## MANDATORY AGENT CULTURE GUIDELINES - STRICT COMPLIANCE REQUIRED" in result
        assert "### Tone of Speech" in result
        assert "Professional and friendly" in result
        assert "### Topics I Shouldn't Talk About" in result
        assert "Personal information" in result
        assert "### Topics I Can Help With" in result
        assert "Technical questions" in result
        assert "### Things I Should Pay Attention To" in result
        assert "User preferences" in result
    
    def test_format_for_system_prompt_with_missing_fields(self):
        """Test format_for_system_prompt with missing guideline fields."""
        manager = CultureManager()
        culture = Culture(description="You are helpful")
        manager.set_culture(culture)
        manager._extracted_guidelines = {
            "tone_of_speech": "Professional",
            # Missing other fields
        }
        manager._prepared = True
        
        result = manager.format_for_system_prompt()
        
        assert result is not None
        assert "Professional" in result
        assert "N/A" in result  # Should use N/A for missing fields


class TestCultureManagerRepeatLogic:
    """Test CultureManager repeat functionality."""
    
    def test_should_repeat_without_culture(self):
        """Test should_repeat when no culture is set."""
        manager = CultureManager()
        
        result = manager.should_repeat()
        
        assert result is False
    
    def test_should_repeat_with_repeat_disabled(self):
        """Test should_repeat when repeat is False."""
        manager = CultureManager()
        culture = Culture(description="Test", repeat=False)
        manager.set_culture(culture)
        
        result = manager.should_repeat()
        
        assert result is False
    
    def test_should_repeat_increments_count(self):
        """Test that should_repeat increments message count."""
        manager = CultureManager()
        culture = Culture(description="Test", repeat=True, repeat_interval=3)
        manager.set_culture(culture)
        
        assert manager._message_count == 0
        manager.should_repeat()
        assert manager._message_count == 1
        manager.should_repeat()
        assert manager._message_count == 2
    
    def test_should_repeat_returns_true_at_interval(self):
        """Test that should_repeat returns True when interval is reached."""
        manager = CultureManager()
        culture = Culture(description="Test", repeat=True, repeat_interval=3)
        manager.set_culture(culture)
        
        # First two calls should return False
        assert manager.should_repeat() is False
        assert manager._message_count == 1
        assert manager.should_repeat() is False
        assert manager._message_count == 2
        
        # Third call should return True and reset
        assert manager.should_repeat() is True
        assert manager._message_count == 0  # Should reset
    
    def test_should_repeat_resets_after_interval(self):
        """Test that message count resets after reaching interval."""
        manager = CultureManager()
        culture = Culture(description="Test", repeat=True, repeat_interval=2)
        manager.set_culture(culture)
        
        manager.should_repeat()  # count = 1
        assert manager.should_repeat() is True  # count = 2, resets to 0
        assert manager._message_count == 0
        
        # Next cycle
        manager.should_repeat()  # count = 1
        assert manager.should_repeat() is True  # count = 2, resets to 0
        assert manager._message_count == 0
    
    def test_reset_message_count(self):
        """Test reset_message_count method."""
        manager = CultureManager()
        culture = Culture(description="Test", repeat=True, repeat_interval=5)
        manager.set_culture(culture)
        
        manager.should_repeat()  # count = 1
        manager.should_repeat()  # count = 2
        assert manager._message_count == 2
        
        manager.reset_message_count()
        assert manager._message_count == 0


class TestCultureManagerSerialization:
    """Test CultureManager serialization methods."""
    
    def test_to_dict_with_culture(self):
        """Test to_dict with culture set."""
        manager = CultureManager(
            model="openai/gpt-4o",
            enabled=True,
            agent_id="agent_123",
            team_id="team_456"
        )
        culture = Culture(
            description="You are helpful",
            add_system_prompt=True,
            repeat=False,
            repeat_interval=5
        )
        manager.set_culture(culture)
        manager._prepared = True
        manager._extracted_guidelines = {"test": "data"}
        manager._message_count = 3
        
        result = manager.to_dict()
        
        assert result["enabled"] is True
        assert result["agent_id"] == "agent_123"
        assert result["team_id"] == "team_456"
        assert result["prepared"] is True
        assert result["message_count"] == 3
        assert result["culture"] == culture.to_dict()
        assert result["extracted_guidelines"] == {"test": "data"}
    
    def test_to_dict_without_culture(self):
        """Test to_dict without culture."""
        manager = CultureManager()
        
        result = manager.to_dict()
        
        assert result["culture"] is None
        assert result["extracted_guidelines"] is None
    
    def test_from_dict_with_culture(self):
        """Test from_dict with culture data."""
        data = {
            "enabled": True,
            "agent_id": "agent_123",
            "team_id": "team_456",
            "prepared": True,
            "message_count": 2,
            "culture": {
                "description": "You are helpful",
                "add_system_prompt": True,
                "repeat": False,
                "repeat_interval": 5
            },
            "extracted_guidelines": {
                "tone_of_speech": "Professional"
            }
        }
        
        manager = CultureManager.from_dict(data, model="openai/gpt-4o")
        
        assert manager.enabled is True
        assert manager.agent_id == "agent_123"
        assert manager.team_id == "team_456"
        assert manager._prepared is True
        assert manager._message_count == 2
        assert manager._culture is not None
        assert manager._culture.description == "You are helpful"
        assert manager._extracted_guidelines == {"tone_of_speech": "Professional"}
    
    def test_from_dict_without_culture(self):
        """Test from_dict without culture data."""
        data = {
            "enabled": False,
            "agent_id": None,
            "team_id": None,
            "prepared": False,
            "message_count": 0,
            "culture": None,
            "extracted_guidelines": None
        }
        
        manager = CultureManager.from_dict(data)
        
        assert manager.enabled is False
        assert manager._culture is None
        assert manager._extracted_guidelines is None
    
    def test_round_trip_serialization(self):
        """Test that to_dict -> from_dict preserves all data."""
        original = CultureManager(
            model="openai/gpt-4o",
            enabled=True,
            agent_id="agent_123",
            team_id="team_456"
        )
        culture = Culture(
            description="You are helpful",
            add_system_prompt=False,
            repeat=True,
            repeat_interval=7
        )
        original.set_culture(culture)
        original._prepared = True
        original._extracted_guidelines = {"test": "value"}
        original._message_count = 5
        
        data = original.to_dict()
        restored = CultureManager.from_dict(data, model="openai/gpt-4o")
        
        assert restored.enabled == original.enabled
        assert restored.agent_id == original.agent_id
        assert restored.team_id == original.team_id
        assert restored._prepared == original._prepared
        assert restored._message_count == original._message_count
        assert restored._culture.description == original._culture.description
        assert restored._extracted_guidelines == original._extracted_guidelines


class TestCultureManagerProperties:
    """Test CultureManager properties."""
    
    def test_culture_property(self):
        """Test culture property."""
        manager = CultureManager()
        culture = Culture(description="Test")
        manager.set_culture(culture)
        
        assert manager.culture == culture
    
    def test_extracted_guidelines_property(self):
        """Test extracted_guidelines property."""
        manager = CultureManager()
        guidelines = {"test": "data"}
        manager._extracted_guidelines = guidelines
        
        assert manager.extracted_guidelines == guidelines
    
    def test_prepared_property(self):
        """Test prepared property."""
        manager = CultureManager()
        assert manager.prepared is False
        
        manager._prepared = True
        assert manager.prepared is True
