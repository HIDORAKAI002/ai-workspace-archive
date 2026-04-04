from __future__ import annotations as _annotations

from collections.abc import Callable
from dataclasses import dataclass, field, fields, replace
from textwrap import dedent
from typing import Any, Dict, Optional
from typing_extensions import Self

from upsonic._json_schema import InlineDefsJsonSchemaTransformer, JsonSchemaTransformer
from upsonic.tools.builtin_tools import SUPPORTED_BUILTIN_TOOLS, AbstractBuiltinTool
from upsonic.output import StructuredOutputMode

__all__ = [
    'ModelProfile',
    'ModelProfileSpec',
    'DEFAULT_PROFILE',
    'InlineDefsJsonSchemaTransformer',
    'JsonSchemaTransformer',
]


@dataclass(kw_only=True)
class ModelProfile:
    """Describes how requests to and responses from specific models or families of models need to be constructed and processed to get the best results, independent of the model and provider classes used."""

    supports_tools: bool = True
    """Whether the model supports tools."""
    supports_json_schema_output: bool = False
    """Whether the model supports JSON schema output.

    This is also referred to as 'native' support for structured output.
    Relates to the `NativeOutput` output type.
    """
    supports_json_object_output: bool = False
    """Whether the model supports a dedicated mode to enforce JSON output, without necessarily sending a schema.

    E.g. [OpenAI's JSON mode](https://platform.openai.com/docs/guides/structured-outputs#json-mode)
    Relates to the `PromptedOutput` output type.
    """
    supports_image_output: bool = False
    """Whether the model supports image output."""
    default_structured_output_mode: StructuredOutputMode = 'tool'
    """The default structured output mode to use for the model."""
    prompted_output_template: str = dedent(
        """
        Always respond with a JSON object that's compatible with this schema:

        {schema}

        Don't include any text or Markdown fencing before or after.
        """
    )
    """The instructions template to use for prompted structured output. The '{schema}' placeholder will be replaced with the JSON schema for the output."""
    native_output_requires_schema_in_instructions: bool = False
    """Whether to add prompted output template in native structured output mode"""
    json_schema_transformer: type[JsonSchemaTransformer] | None = None
    """The transformer to use to make JSON schemas for tools and structured output compatible with the model."""

    thinking_tags: tuple[str, str] = ('<think>', '</think>')
    """The tags used to indicate thinking parts in the model's output. Defaults to ('<think>', '</think>')."""

    ignore_streamed_leading_whitespace: bool = False
    """Whether to ignore leading whitespace when streaming a response.

    This is a workaround for models that emit `<think>\n</think>\n\n` or an empty text part ahead of tool calls (e.g. Ollama + Qwen3),
    which we don't want to end up treating as a final result when using `run_stream` with `str` a valid `output_type`.

    This is currently only used by `OpenAIChatModel`, `HuggingFaceModel`, and `GroqModel`.
    """

    supported_builtin_tools: frozenset[type[AbstractBuiltinTool]] = field(
        default_factory=lambda: SUPPORTED_BUILTIN_TOOLS
    )
    """The set of builtin tool types that this model/profile supports.

    Defaults to ALL builtin tools. Profile functions should explicitly
    restrict this based on model capabilities.
    """

    @classmethod
    def from_profile(cls, profile: ModelProfile | None) -> Self:
        """Build a ModelProfile subclass instance from a ModelProfile instance."""
        if isinstance(profile, cls):
            return profile
        return cls().update(profile)

    def update(self, profile: ModelProfile | None) -> Self:
        """Update this ModelProfile (subclass) instance with the non-default values from another ModelProfile instance."""
        if not profile:
            return self
        field_names = set(f.name for f in fields(self))
        non_default_attrs = {
            f.name: getattr(profile, f.name)
            for f in fields(profile)
            if f.name in field_names and getattr(profile, f.name) != f.default
        }
        return replace(self, **non_default_attrs)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to JSON-serializable dictionary."""
        # Serialize json_schema_transformer class to its name for JSON compatibility
        json_schema_transformer_value: Optional[str] = None
        if self.json_schema_transformer is not None:
            json_schema_transformer_value = self.json_schema_transformer.__name__
        
        return {
            "supports_tools": self.supports_tools,
            "supports_json_schema_output": self.supports_json_schema_output,
            "supports_json_object_output": self.supports_json_object_output,
            "supports_image_output": self.supports_image_output,
            "default_structured_output_mode": self.default_structured_output_mode,
            "prompted_output_template": self.prompted_output_template,
            "thinking_tags": list(self.thinking_tags),  # Convert tuple to list for JSON
            "ignore_streamed_leading_whitespace": self.ignore_streamed_leading_whitespace,
            "json_schema_transformer": json_schema_transformer_value,
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "ModelProfile":
        """Reconstruct from dictionary (accepts raw Python objects)."""
        thinking_tags = data.get("thinking_tags", ('<think>', '</think>'))
        if isinstance(thinking_tags, list):
            thinking_tags = tuple(thinking_tags)
        
        # Handle json_schema_transformer - can be class reference or string name
        json_schema_transformer = data.get("json_schema_transformer")
        if isinstance(json_schema_transformer, str):
            # Map known transformer names to their classes
            transformer_map: Dict[str, type[JsonSchemaTransformer]] = {
                "InlineDefsJsonSchemaTransformer": InlineDefsJsonSchemaTransformer,
            }
            # Lazy import provider-specific transformers to avoid circular imports
            if json_schema_transformer == "OpenAIJsonSchemaTransformer":
                from upsonic.profiles.openai import OpenAIJsonSchemaTransformer
                transformer_map["OpenAIJsonSchemaTransformer"] = OpenAIJsonSchemaTransformer
            elif json_schema_transformer == "GoogleJsonSchemaTransformer":
                from upsonic.profiles.google import GoogleJsonSchemaTransformer
                transformer_map["GoogleJsonSchemaTransformer"] = GoogleJsonSchemaTransformer
            
            json_schema_transformer = transformer_map.get(json_schema_transformer, None)
        
        return cls(
            supports_tools=data.get("supports_tools", True),
            supports_json_schema_output=data.get("supports_json_schema_output", False),
            supports_json_object_output=data.get("supports_json_object_output", False),
            supports_image_output=data.get("supports_image_output", False),
            default_structured_output_mode=data.get("default_structured_output_mode", 'tool'),
            prompted_output_template=data.get("prompted_output_template", ModelProfile.prompted_output_template),
            json_schema_transformer=json_schema_transformer,
            thinking_tags=thinking_tags,  # type: ignore
            ignore_streamed_leading_whitespace=data.get("ignore_streamed_leading_whitespace", False),
        )
    
    def _to_serializable_dict(self) -> Dict[str, Any]:
        """Convert to JSON-serializable dictionary for storage."""
        result: Dict[str, Any] = {
            "supports_tools": self.supports_tools,
            "supports_json_schema_output": self.supports_json_schema_output,
            "supports_json_object_output": self.supports_json_object_output,
            "supports_image_output": self.supports_image_output,
            "default_structured_output_mode": self.default_structured_output_mode,
            "prompted_output_template": self.prompted_output_template,
            "thinking_tags": list(self.thinking_tags),
            "ignore_streamed_leading_whitespace": self.ignore_streamed_leading_whitespace,
        }
        if self.json_schema_transformer is not None:
            result["json_schema_transformer"] = self.json_schema_transformer.__name__
        return result



ModelProfileSpec = ModelProfile | Callable[[str], ModelProfile | None]

DEFAULT_PROFILE = ModelProfile()