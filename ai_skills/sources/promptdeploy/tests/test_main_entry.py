"""Tests for the __main__.py entry point."""

import runpy

import pytest


class TestMainModule:
    def test_main_module_no_args_exits(self, monkeypatch):
        """python -m promptdeploy with no args should exit with error."""
        monkeypatch.setattr("sys.argv", ["promptdeploy"])
        with pytest.raises(SystemExit) as exc_info:
            runpy.run_module("promptdeploy", run_name="__main__")
        assert exc_info.value.code == 2  # argparse missing required subcommand

    def test_main_module_invokes_main(self, tmp_path, monkeypatch, capsys):
        """python -m promptdeploy deploy --dry-run routes correctly."""
        from promptdeploy.config import Config

        config = Config(source_root=tmp_path, targets={}, groups={})
        monkeypatch.setattr("promptdeploy.cli.load_config", lambda *a, **kw: config)
        monkeypatch.setattr("sys.argv", ["promptdeploy", "deploy", "--dry-run"])
        runpy.run_module("promptdeploy", run_name="__main__")
