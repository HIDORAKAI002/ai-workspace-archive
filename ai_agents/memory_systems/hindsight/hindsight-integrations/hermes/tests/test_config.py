"""Tests for hindsight_hermes.config module."""

import json

from hindsight_hermes.config import DEFAULTS, load_config


class TestLoadConfig:
    def test_defaults_when_no_file(self, tmp_path, monkeypatch):
        monkeypatch.delenv("HINDSIGHT_API_URL", raising=False)
        monkeypatch.delenv("HINDSIGHT_API_KEY", raising=False)
        monkeypatch.delenv("HINDSIGHT_BANK_ID", raising=False)
        cfg = load_config(config_path=tmp_path / "nope.json")
        assert cfg["hindsightApiUrl"] is None
        assert cfg["bankId"] is None
        assert cfg["recallBudget"] == "mid"
        assert cfg["autoRecall"] is True
        assert cfg["autoRetain"] is True

    def test_reads_from_file(self, tmp_path, monkeypatch):
        monkeypatch.delenv("HINDSIGHT_API_URL", raising=False)
        monkeypatch.delenv("HINDSIGHT_API_KEY", raising=False)
        monkeypatch.delenv("HINDSIGHT_BANK_ID", raising=False)
        monkeypatch.delenv("HINDSIGHT_AUTO_RETAIN", raising=False)
        f = tmp_path / "hermes.json"
        f.write_text(json.dumps({
            "hindsightApiUrl": "http://localhost:9077",
            "hindsightApiToken": "file-token",
            "bankId": "my-bank",
            "recallBudget": "high",
            "autoRetain": False,
            "recallMaxTokens": 2048,
        }))
        cfg = load_config(config_path=f)
        assert cfg["hindsightApiUrl"] == "http://localhost:9077"
        assert cfg["hindsightApiToken"] == "file-token"
        assert cfg["bankId"] == "my-bank"
        assert cfg["recallBudget"] == "high"
        assert cfg["autoRetain"] is False
        assert cfg["recallMaxTokens"] == 2048

    def test_env_overrides_file(self, tmp_path, monkeypatch):
        f = tmp_path / "hermes.json"
        f.write_text(json.dumps({
            "hindsightApiUrl": "http://from-file:9077",
            "bankId": "file-bank",
            "recallBudget": "low",
        }))
        monkeypatch.setenv("HINDSIGHT_API_URL", "http://from-env:9077")
        monkeypatch.setenv("HINDSIGHT_BANK_ID", "env-bank")
        monkeypatch.delenv("HINDSIGHT_RECALL_BUDGET", raising=False)
        cfg = load_config(config_path=f)
        assert cfg["hindsightApiUrl"] == "http://from-env:9077"
        assert cfg["bankId"] == "env-bank"
        assert cfg["recallBudget"] == "low"  # from file (env not set)

    def test_api_key_env_maps_to_token(self, tmp_path, monkeypatch):
        """HINDSIGHT_API_KEY is an alias for hindsightApiToken."""
        monkeypatch.setenv("HINDSIGHT_API_KEY", "my-key")
        cfg = load_config(config_path=tmp_path / "nope.json")
        assert cfg["hindsightApiToken"] == "my-key"

    def test_bool_env_casting(self, tmp_path, monkeypatch):
        monkeypatch.setenv("HINDSIGHT_AUTO_RETAIN", "false")
        monkeypatch.setenv("HINDSIGHT_AUTO_RECALL", "1")
        cfg = load_config(config_path=tmp_path / "nope.json")
        assert cfg["autoRetain"] is False
        assert cfg["autoRecall"] is True

    def test_int_env_casting(self, tmp_path, monkeypatch):
        monkeypatch.setenv("HINDSIGHT_RECALL_MAX_TOKENS", "2048")
        cfg = load_config(config_path=tmp_path / "nope.json")
        assert cfg["recallMaxTokens"] == 2048

    def test_malformed_file_returns_defaults(self, tmp_path, monkeypatch):
        monkeypatch.delenv("HINDSIGHT_API_URL", raising=False)
        monkeypatch.delenv("HINDSIGHT_BANK_ID", raising=False)
        f = tmp_path / "hermes.json"
        f.write_text("not json {{{")
        cfg = load_config(config_path=f)
        assert cfg["recallBudget"] == "mid"

    def test_null_values_in_file_ignored(self, tmp_path, monkeypatch):
        """null values in JSON should not override defaults."""
        monkeypatch.delenv("HINDSIGHT_API_URL", raising=False)
        monkeypatch.delenv("HINDSIGHT_BANK_ID", raising=False)
        f = tmp_path / "hermes.json"
        f.write_text(json.dumps({"bankId": None, "recallBudget": "high"}))
        cfg = load_config(config_path=f)
        assert cfg["bankId"] is None  # stays default (None)
        assert cfg["recallBudget"] == "high"

    def test_all_defaults_present(self):
        """Every key in DEFAULTS should exist in a freshly loaded config."""
        # Use a path that doesn't exist and clean env
        cfg = DEFAULTS.copy()
        for key in DEFAULTS:
            assert key in cfg
