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

__all__ = ('LMStudioModel', 'LMStudioModelSettings')

_OPENAI_CHAT_PROVIDER_LITERAL = Literal[
    'azure',
    'cerebras',
    'deepseek',
    'fireworks',
    'github',
    'grok',
    'heroku',
    'litellm',
    'lmstudio',
    'moonshotai',
    'nebius',
    'ollama',
    'openai',
    'openai-chat',
    'openrouter',
    'ovhcloud',
    'together',
    'vercel',
    'gateway',
]


class LMStudioModelSettings(OpenAIChatModelSettings, total=False):
    """Settings for LM Studio model requests. Inherits all options from OpenAIChatModelSettings."""


class LMStudioModel(OpenAIChatModel):
    """Model that uses LM Studio's OpenAI-compatible API.

    Convenience wrapper around `OpenAIChatModel` with default provider `'lmstudio'`.
    LM Studio serves the API at http://localhost:1234/v1 by default.
    """

    @overload
    def __init__(
        self,
        model_name: OpenAIModelName,
        *,
        provider: _OPENAI_CHAT_PROVIDER_LITERAL | Provider[AsyncOpenAI] = 'lmstudio',
        profile: ModelProfileSpec | None = None,
        settings: ModelSettings | None = None,
    ) -> None: ...

    def __init__(
        self,
        model_name: OpenAIModelName,
        *,
        provider: _OPENAI_CHAT_PROVIDER_LITERAL | Provider[AsyncOpenAI] = 'lmstudio',
        profile: ModelProfileSpec | None = None,
        settings: ModelSettings | None = None,
    ) -> None:
        """Initialize an LM Studio model.

        Args:
            model_name: Model name (e.g. the name shown in LM Studio).
            provider: Provider to use. Defaults to `'lmstudio'`.
            profile: Model profile. Defaults to provider-derived from model name.
            settings: Default model settings for this instance.
        """
        super().__init__(
            model_name=model_name,
            provider=provider,
            profile=profile,
            settings=settings,
        )
