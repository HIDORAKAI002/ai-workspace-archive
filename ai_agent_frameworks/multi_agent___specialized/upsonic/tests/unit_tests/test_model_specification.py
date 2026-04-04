import unittest
from unittest.mock import patch, MagicMock

# Patch GoogleFinishReason.NO_IMAGE before any imports that might use it
try:
    from google.genai.types import FinishReason as GoogleFinishReason
    if not hasattr(GoogleFinishReason, 'NO_IMAGE'):
        GoogleFinishReason.NO_IMAGE = MagicMock()
except (ImportError, AttributeError):
    pass

from upsonic import Agent
from upsonic.models import infer_model
from upsonic.providers.openai import OpenAIProvider


class TestModelSpecification(unittest.TestCase):
    @patch('upsonic.providers.openai.AsyncOpenAI')
    def test_string_based_specifications(self, mock_openai):
        # Mock the OpenAI client
        mock_openai.return_value = MagicMock()
        
        # Test string-based model specifications
        agent1 = Agent(name="String Agent 1", model="openai/gpt-4o")
        self.assertEqual(agent1.model.model_name, "gpt-4o")
        self.assertIsInstance(agent1.model._provider, OpenAIProvider)

    @patch('upsonic.models.infer_model')
    @patch.dict('os.environ', {'ANTHROPIC_API_KEY': 'test-key'})
    def test_anthropic_specification(self, mock_infer_model):
        from upsonic.providers import infer_provider as real_infer_provider
        mock_provider = MagicMock()
        mock_provider.name = 'anthropic'
        mock_provider.base_url = 'https://api.anthropic.com'
        mock_provider.client = MagicMock()
        mock_provider.model_profile.return_value = None

        def side_effect(model: str, provider_factory: object = None):
            if isinstance(model, str) and model.startswith('anthropic/'):
                mock_result = MagicMock()
                mock_result.model_name = model.split('/', 1)[1]
                mock_result._provider = mock_provider
                return mock_result
            return infer_model(model, provider_factory=provider_factory or real_infer_provider)
        mock_infer_model.side_effect = side_effect

        agent2 = Agent(name="String Agent 2", model="anthropic/claude-3-5-sonnet-latest")
        self.assertEqual(agent2.model.model_name, "claude-3-5-sonnet-latest")
        self.assertEqual(agent2.model._provider.name, "anthropic")

    @patch('upsonic.models.infer_model')
    @patch.dict('os.environ', {'GOOGLE_API_KEY': 'test-key'})
    def test_google_specification(self, mock_infer_model):
        from upsonic.providers import infer_provider as real_infer_provider
        mock_provider = MagicMock()
        mock_provider.name = 'google-gla'
        mock_provider.base_url = 'https://generativelanguage.googleapis.com'
        mock_provider.client = MagicMock()
        mock_provider.model_profile.return_value = None

        def side_effect(model: str, provider_factory: object = None):
            if isinstance(model, str) and (
                model.startswith('google-gla/') or model.startswith('google-vertex/') or model.startswith('gemini/')
            ):
                mock_result = MagicMock()
                mock_result.model_name = model.split('/', 1)[1]
                mock_result._provider = mock_provider
                return mock_result
            return infer_model(model, provider_factory=provider_factory or real_infer_provider)
        mock_infer_model.side_effect = side_effect

        agent3 = Agent(name="String Agent 3", model="google-gla/gemini-2.5-pro")
        self.assertEqual(agent3.model.model_name, "gemini-2.5-pro")
        self.assertEqual(agent3.model._provider.name, "google-gla")

    @patch('upsonic.providers.openai.AsyncOpenAI')
    def test_model_inference_direct(self, mock_openai):
        # Mock the OpenAI client
        mock_openai.return_value = MagicMock()
        
        # Test direct model inference
        openai_model = infer_model("openai/gpt-4o")
        
        self.assertEqual(openai_model.model_name, "gpt-4o")
        self.assertIsInstance(openai_model._provider, OpenAIProvider)

    def test_error_handling(self):
        # Test cases that should raise exceptions
        error_cases = [
            ("invalid/gpt-4o", "unknown provider"),
            ("just-a-model-name", "unknown model"),
        ]
        for model_spec, expected_error in error_cases:
            with self.assertRaises(Exception) as excinfo:
                Agent(name="Invalid Agent", model=model_spec)
            self.assertIn(expected_error, str(excinfo.exception).lower())
        
        # Test case that should only show a warning (not raise exception)
        # This tests that invalid model names are handled gracefully
        with patch('upsonic.providers.openai.AsyncOpenAI') as mock_openai:
            mock_openai.return_value = MagicMock()
            try:
                agent = Agent(name="Warning Agent", model="openai/invalid-model")
                # Should not raise exception, just show warning
                self.assertIsNotNone(agent)
                self.assertEqual(agent.model.model_name, "invalid-model")
            except Exception as e:
                self.fail(f"openai/invalid-model should not raise exception, but got: {e}")

if __name__ == "__main__":
    unittest.main()
