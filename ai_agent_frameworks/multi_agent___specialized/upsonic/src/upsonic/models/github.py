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

__all__ = ('GitHubModel', 'GitHubModelSettings')

_GITHUB_PROVIDER_LITERAL = Literal[
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


class GitHubModelSettings(OpenAIChatModelSettings, total=False):
    """Settings for GitHub Models API model requests. Inherits all options from OpenAIChatModelSettings."""


class GitHubModel(OpenAIChatModel):
    """A model that uses the GitHub Models API via OpenAI-compatible interface.

    This class is a convenience wrapper around `OpenAIChatModel` that sets the provider to `'github'` by default.
    All functionality is provided by the underlying `OpenAIChatModel` instance.
    """

    @overload
    def __init__(
        self,
        model_name: OpenAIModelName,
        *,
        provider: _GITHUB_PROVIDER_LITERAL | Provider[AsyncOpenAI] = 'github',
        profile: ModelProfileSpec | None = None,
        settings: ModelSettings | None = None,
    ) -> None: ...

    def __init__(
        self,
        model_name: OpenAIModelName,
        *,
        provider: _GITHUB_PROVIDER_LITERAL | Provider[AsyncOpenAI] = 'github',
        profile: ModelProfileSpec | None = None,
        settings: ModelSettings | None = None,
    ):
        """Initialize a GitHub Models model.

        Args:
            model_name: The name of the model in 'provider/model' format (e.g. xai/grok-2) or plain model name for OpenAI.
            provider: The provider to use. Defaults to `'github'`.
            profile: The model profile to use. Defaults to a profile picked by the provider based on the model name.
            settings: Default model settings for this model instance.
        """
        super().__init__(
            model_name=model_name,
            provider=provider,
            profile=profile,
            settings=settings,
        )
