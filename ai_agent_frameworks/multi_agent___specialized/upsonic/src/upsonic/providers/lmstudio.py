from __future__ import annotations as _annotations

import os

import httpx

from upsonic.profiles import ModelProfile
from upsonic.utils.package.exception import UserError
from upsonic.models import cached_async_http_client
from upsonic.profiles.cohere import cohere_model_profile
from upsonic.profiles.deepseek import deepseek_model_profile
from upsonic.profiles.google import google_model_profile
from upsonic.profiles.harmony import harmony_model_profile
from upsonic.profiles.meta import meta_model_profile
from upsonic.profiles.mistral import mistral_model_profile
from upsonic.profiles.openai import OpenAIJsonSchemaTransformer, OpenAIModelProfile
from upsonic.profiles.qwen import qwen_model_profile
from upsonic.providers import Provider

try:
    from openai import AsyncOpenAI
except ImportError:  # pragma: no cover
    from upsonic.utils.printing import import_error
    import_error(
        package_name="openai",
        install_command="pip install openai",
        feature_name="LM Studio provider"
    )


class LMStudioProvider(Provider[AsyncOpenAI]):
    """Provider for LM Studio's OpenAI-compatible API."""


    @property
    def name(self) -> str:
        return 'lmstudio'

    @property
    def base_url(self) -> str:
        return str(self._client.base_url)

    @property
    def client(self) -> AsyncOpenAI:
        return self._client

    def model_profile(self, model_name: str) -> ModelProfile | None:
        prefix_to_profile = {
            'llama': meta_model_profile,
            'gemma': google_model_profile,
            'qwen': qwen_model_profile,
            'qwq': qwen_model_profile,
            'deepseek': deepseek_model_profile,
            'mistral': mistral_model_profile,
            'command': cohere_model_profile,
            'gpt-oss': harmony_model_profile,
        }

        profile: ModelProfile | None = None
        name_lower = model_name.lower()
        for prefix, profile_func in prefix_to_profile.items():
            if name_lower.startswith(prefix):
                profile = profile_func(name_lower)

        return OpenAIModelProfile(json_schema_transformer=OpenAIJsonSchemaTransformer).update(profile)

    def __init__(
        self,
        base_url: str | None = None,
        api_key: str | None = None,
        openai_client: AsyncOpenAI | None = None,
        http_client: httpx.AsyncClient | None = None,
    ) -> None:
        """Create a new LM Studio provider.

        Args:
            base_url: Base URL for the LM Studio API. If not provided, `LMSTUDIO_BASE_URL` must be set.
            api_key: API key (optional for local). Defaults to `LMSTUDIO_API_KEY` env var, or a placeholder.
            openai_client: Existing AsyncOpenAI client. If set, `base_url`, `api_key`, and `http_client` must be None.
            http_client: Existing httpx.AsyncClient. If set, used for requests.
        """
        if openai_client is not None:
            assert base_url is None, 'Cannot provide both `openai_client` and `base_url`'
            assert http_client is None, 'Cannot provide both `openai_client` and `http_client`'
            assert api_key is None, 'Cannot provide both `openai_client` and `api_key`'
            self._client: AsyncOpenAI = openai_client
        else:
            base_url = base_url or os.getenv('LMSTUDIO_BASE_URL')
            if not base_url:
                raise UserError(
                    'Set the `LMSTUDIO_BASE_URL` environment variable or pass it via '
                    '`LMStudioProvider(base_url=...)` to use the LM Studio provider.'
                )
            api_key = api_key or os.getenv('LMSTUDIO_API_KEY') or 'api-key-not-set'

            if http_client is not None:
                self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=http_client)
            else:
                client = cached_async_http_client(provider='lmstudio')
                self._client = AsyncOpenAI(base_url=base_url, api_key=api_key, http_client=client)
