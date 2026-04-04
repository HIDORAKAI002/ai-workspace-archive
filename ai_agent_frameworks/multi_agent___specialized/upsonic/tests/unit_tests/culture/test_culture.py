"""
Unit tests for Culture dataclass.

Tests cover:
- Initialization with all parameters
- Default values
- Validation (empty description, invalid repeat_interval)
- Serialization (to_dict/from_dict)
- __repr__ method
"""

import pytest
from upsonic.culture import Culture


class TestCultureInitialization:
    """Test Culture initialization with various parameters."""
    
    def test_culture_with_all_parameters(self):
        """Test Culture initialization with all parameters provided."""
        culture = Culture(
            description="You are a helpful assistant",
            add_system_prompt=True,
            repeat=True,
            repeat_interval=3
        )
        
        assert culture.description == "You are a helpful assistant"
        assert culture.add_system_prompt is True
        assert culture.repeat is True
        assert culture.repeat_interval == 3
    
    def test_culture_with_defaults(self):
        """Test Culture initialization with only required parameter."""
        culture = Culture(description="You are a helpful assistant")
        
        assert culture.description == "You are a helpful assistant"
        assert culture.add_system_prompt is True  # Default
        assert culture.repeat is False  # Default
        assert culture.repeat_interval == 5  # Default
    
    def test_culture_with_custom_defaults(self):
        """Test Culture initialization with custom default values."""
        culture = Culture(
            description="You are a professional consultant",
            add_system_prompt=False,
            repeat=True,
            repeat_interval=10
        )
        
        assert culture.description == "You are a professional consultant"
        assert culture.add_system_prompt is False
        assert culture.repeat is True
        assert culture.repeat_interval == 10


class TestCultureValidation:
    """Test Culture validation logic."""
    
    def test_empty_description_raises_error(self):
        """Test that empty description raises ValueError."""
        with pytest.raises(ValueError, match="description must be a non-empty string"):
            Culture(description="")
    
    def test_whitespace_only_description_raises_error(self):
        """Test that whitespace-only description raises ValueError."""
        with pytest.raises(ValueError, match="description must be a non-empty string"):
            Culture(description="   ")
    
    def test_repeat_interval_zero_raises_error(self):
        """Test that repeat_interval of 0 raises ValueError."""
        with pytest.raises(ValueError, match="repeat_interval must be at least 1"):
            Culture(description="Test", repeat_interval=0)
    
    def test_repeat_interval_negative_raises_error(self):
        """Test that negative repeat_interval raises ValueError."""
        with pytest.raises(ValueError, match="repeat_interval must be at least 1"):
            Culture(description="Test", repeat_interval=-1)
    
    def test_repeat_interval_one_is_valid(self):
        """Test that repeat_interval of 1 is valid."""
        culture = Culture(description="Test", repeat_interval=1)
        assert culture.repeat_interval == 1
    
    def test_repeat_interval_large_value_is_valid(self):
        """Test that large repeat_interval values are valid."""
        culture = Culture(description="Test", repeat_interval=100)
        assert culture.repeat_interval == 100


class TestCultureSerialization:
    """Test Culture serialization methods."""
    
    def test_to_dict_with_all_fields(self):
        """Test to_dict with all fields populated."""
        culture = Culture(
            description="You are a helpful assistant",
            add_system_prompt=False,
            repeat=True,
            repeat_interval=7
        )
        
        result = culture.to_dict()
        
        assert result == {
            "description": "You are a helpful assistant",
            "add_system_prompt": False,
            "repeat": True,
            "repeat_interval": 7
        }
    
    def test_to_dict_with_defaults(self):
        """Test to_dict with default values."""
        culture = Culture(description="Test description")
        
        result = culture.to_dict()
        
        assert result == {
            "description": "Test description",
            "add_system_prompt": True,
            "repeat": False,
            "repeat_interval": 5
        }
    
    def test_from_dict_with_all_fields(self):
        """Test from_dict with all fields."""
        data = {
            "description": "You are a professional",
            "add_system_prompt": True,
            "repeat": False,
            "repeat_interval": 3
        }
        
        culture = Culture.from_dict(data)
        
        assert culture.description == "You are a professional"
        assert culture.add_system_prompt is True
        assert culture.repeat is False
        assert culture.repeat_interval == 3
    
    def test_from_dict_with_defaults(self):
        """Test from_dict with minimal fields (should use defaults)."""
        data = {
            "description": "Test",
        }
        
        culture = Culture.from_dict(data)
        
        assert culture.description == "Test"
        assert culture.add_system_prompt is True  # Default
        assert culture.repeat is False  # Default
        assert culture.repeat_interval == 5  # Default
    
    def test_round_trip_serialization(self):
        """Test that to_dict -> from_dict preserves all data."""
        original = Culture(
            description="You are a helpful assistant",
            add_system_prompt=False,
            repeat=True,
            repeat_interval=8
        )
        
        data = original.to_dict()
        restored = Culture.from_dict(data)
        
        assert restored.description == original.description
        assert restored.add_system_prompt == original.add_system_prompt
        assert restored.repeat == original.repeat
        assert restored.repeat_interval == original.repeat_interval


class TestCultureRepr:
    """Test Culture __repr__ method."""
    
    def test_repr_short_description(self):
        """Test __repr__ with short description."""
        culture = Culture(description="Short")
        repr_str = repr(culture)
        
        assert "Culture" in repr_str
        assert "Short" in repr_str
        assert "add_system_prompt" in repr_str
        assert "repeat" in repr_str
        assert "repeat_interval" in repr_str
    
    def test_repr_long_description_truncated(self):
        """Test __repr__ truncates long descriptions."""
        long_desc = "A" * 100
        culture = Culture(description=long_desc)
        repr_str = repr(culture)
        
        assert "Culture" in repr_str
        assert "..." in repr_str  # Should truncate
        assert len(repr_str) < len(long_desc) + 100  # Should be shorter
    
    def test_repr_includes_all_fields(self):
        """Test __repr__ includes all important fields."""
        culture = Culture(
            description="Test",
            add_system_prompt=False,
            repeat=True,
            repeat_interval=10
        )
        repr_str = repr(culture)
        
        assert "add_system_prompt=False" in repr_str
        assert "repeat=True" in repr_str
        assert "repeat_interval=10" in repr_str


class TestCultureEdgeCases:
    """Test edge cases and special scenarios."""
    
    def test_description_with_special_characters(self):
        """Test Culture with description containing special characters."""
        special_desc = "You are a 5-star ⭐ hotel receptionist! 🏨"
        culture = Culture(description=special_desc)
        
        assert culture.description == special_desc
    
    def test_description_with_newlines(self):
        """Test Culture with description containing newlines."""
        multiline_desc = "You are helpful.\nYou are professional.\nYou are kind."
        culture = Culture(description=multiline_desc)
        
        assert culture.description == multiline_desc
    
    def test_repeat_false_with_interval(self):
        """Test that repeat_interval can be set even when repeat is False."""
        culture = Culture(
            description="Test",
            repeat=False,
            repeat_interval=20
        )
        
        assert culture.repeat is False
        assert culture.repeat_interval == 20  # Should still be set
    
    def test_add_system_prompt_false_with_repeat_true(self):
        """Test combination of add_system_prompt=False and repeat=True."""
        culture = Culture(
            description="Test",
            add_system_prompt=False,
            repeat=True,
            repeat_interval=3
        )
        
        assert culture.add_system_prompt is False
        assert culture.repeat is True
        assert culture.repeat_interval == 3
