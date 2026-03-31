from __future__ import annotations as _annotations

from typing import Literal
from typing_extensions import overload

from upsonic.profiles import ModelProfileSpec
from upsonic.providers import Provider
from upsonic.models.settings import ModelSettings
from upsonic.models.openai import OpenAIChatModel, OpenAIChatModelSettings, OpenAIModelName

try:
    from openai import AsyncOpenAI
except ImportError:
    AsyncOpenAI = None  # type: ignore

__all__ = ('CerebrasModel', 'CerebrasModelSettings')

_CEREBRAS_PROVIDER_LITERAL = Literal[
    'azure',
    'deepseek',
    'cerebras',
    'fireworks',
    'github',
    'grok',
    'heroku',
    'moonshotai',
    'ollama',
    'openai',
    'openai-chat',
    'openrouter',
    'together',
    'vercel',
    'litellm',
    'vllm',
    'nebius',
    'ovhcloud',
    'gateway',
    'sambanova',
]


class CerebrasModelSettings(OpenAIChatModelSettings, total=False):
    """Settings for Cerebras API model requests. Inherits all options from OpenAIChatModelSettings.

    Note: Cerebras does not support frequency_penalty, logit_bias, presence_penalty,
    parallel_tool_calls, or service_tier; these are ignored when using the Cerebras provider.
    """


class CerebrasModel(OpenAIChatModel):
    """A model that uses the Cerebras API via OpenAI-compatible interface.

    This class is a convenience wrapper around `OpenAIChatModel` that sets the provider to `'cerebras'` by default.
    All functionality is provided by the underlying `OpenAIChatModel` instance.
    """

    @overload
    def __init__(
        self,
        model_name: OpenAIModelName,
        *,
        provider: _CEREBRAS_PROVIDER_LITERAL | Provider[AsyncOpenAI] = 'cerebras',
        profile: ModelProfileSpec | None = None,
        settings: ModelSettings | None = None,
    ) -> None: ...

    def __init__(
        self,
        model_name: OpenAIModelName,
        *,
        provider: _CEREBRAS_PROVIDER_LITERAL | Provider[AsyncOpenAI] = 'cerebras',
        profile: ModelProfileSpec | None = None,
        settings: ModelSettings | None = None,
    ):
        """Initialize a Cerebras model.

        Args:
            model_name: The name of the model (e.g. llama-3.3-70b, qwen-3-235b-a22b-instruct-2507).
            provider: The provider to use. Defaults to `'cerebras'`.
            profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
            settings: Default model settings for this model instance.
        """
        super().__init__(
            model_name=model_name,
            provider=provider,
            profile=profile,
            settings=settings,
        )
