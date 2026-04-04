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

__all__ = ('MoonshotAIModel', 'MoonshotAIModelSettings')

_MOONSHOTAI_PROVIDER_LITERAL = Literal[
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


class MoonshotAIModelSettings(OpenAIChatModelSettings, total=False):
    """Settings for Moonshot AI (Kimi) model requests. Inherits all options from OpenAIChatModelSettings."""


class MoonshotAIModel(OpenAIChatModel):
    """A model that uses the Moonshot AI (Kimi) API via OpenAI-compatible interface.

    This class is a convenience wrapper around `OpenAIChatModel` that sets the provider to `'moonshotai'` by default.
    All functionality is provided by the underlying `OpenAIChatModel` instance.
    """

    @overload
    def __init__(
        self,
        model_name: OpenAIModelName,
        *,
        provider: _MOONSHOTAI_PROVIDER_LITERAL | Provider[AsyncOpenAI] = 'moonshotai',
        profile: ModelProfileSpec | None = None,
        settings: ModelSettings | None = None,
    ) -> None: ...

    def __init__(
        self,
        model_name: OpenAIModelName,
        *,
        provider: _MOONSHOTAI_PROVIDER_LITERAL | Provider[AsyncOpenAI] = 'moonshotai',
        profile: ModelProfileSpec | None = None,
        settings: ModelSettings | None = None,
    ):
        """Initialize a Moonshot AI (Kimi) model.

        Args:
            model_name: The name of the model (e.g. moonshot-v1-128k, kimi-latest).
            provider: The provider to use. Defaults to `'moonshotai'`.
            profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
            settings: Default model settings for this model instance.
        """
        super().__init__(
            model_name=model_name,
            provider=provider,
            profile=profile,
            settings=settings,
        )
