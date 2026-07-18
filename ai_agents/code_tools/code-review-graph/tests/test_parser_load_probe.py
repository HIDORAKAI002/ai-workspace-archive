"""Failure-mode tests for bounded tree-sitter parser loading."""

from __future__ import annotations

import subprocess
from types import SimpleNamespace

import pytest

from code_review_graph import parser as parser_module
from code_review_graph.parser import CodeParser


@pytest.fixture(autouse=True)
def _clear_probe_cache():
    parser_module._clear_parser_probe_cache()
    yield
    parser_module._clear_parser_probe_cache()


class _FakeLanguagePack:
    def __init__(self, failures: dict[str, Exception] | None = None) -> None:
        self.failures = failures or {}
        self.calls: list[str] = []

    def get_parser(self, grammar: str):
        self.calls.append(grammar)
        failure = self.failures.get(grammar)
        if failure is not None:
            raise failure
        return object()


def _completed(returncode: int = 0) -> SimpleNamespace:
    return SimpleNamespace(returncode=returncode)


def test_successful_probe_runs_once_across_parser_instances(monkeypatch):
    probe_calls: list[str] = []
    language_pack = _FakeLanguagePack()

    def fake_run(command, **_kwargs):
        probe_calls.append(command[-1])
        return _completed()

    monkeypatch.setattr(parser_module.subprocess, "run", fake_run)
    monkeypatch.setattr(
        parser_module.importlib,
        "import_module",
        lambda _name: language_pack,
    )

    assert all(CodeParser()._get_parser("python") is not None for _ in range(4))
    assert probe_calls == ["python"]
    assert language_pack.calls == ["python"] * 4


def test_probe_timeout_skips_only_the_failing_grammar(monkeypatch):
    probe_calls: list[str] = []
    language_pack = _FakeLanguagePack()

    def fake_run(command, **kwargs):
        grammar = command[-1]
        probe_calls.append(grammar)
        if grammar == "tsx":
            raise subprocess.TimeoutExpired(command, kwargs["timeout"])
        return _completed()

    monkeypatch.setattr(parser_module.subprocess, "run", fake_run)
    monkeypatch.setattr(
        parser_module.importlib,
        "import_module",
        lambda _name: language_pack,
    )

    parser = CodeParser()
    assert parser._get_parser("tsx") is None
    assert parser._get_parser("python") is not None
    assert CodeParser()._get_parser("tsx") is None
    assert probe_calls == ["tsx", "python"]
    assert language_pack.calls == ["python"]


def test_nonzero_probe_skips_only_the_failing_grammar(monkeypatch):
    probe_calls: list[str] = []
    language_pack = _FakeLanguagePack()

    def fake_run(command, **_kwargs):
        grammar = command[-1]
        probe_calls.append(grammar)
        return _completed(1 if grammar == "verilog" else 0)

    monkeypatch.setattr(parser_module.subprocess, "run", fake_run)
    monkeypatch.setattr(
        parser_module.importlib,
        "import_module",
        lambda _name: language_pack,
    )

    parser = CodeParser()
    assert parser._get_parser("verilog") is None
    assert parser._get_parser("rust") is not None
    assert probe_calls == ["verilog", "rust"]
    assert language_pack.calls == ["rust"]


def test_expected_parent_load_failure_is_cached(monkeypatch):
    probe_calls: list[str] = []
    language_pack = _FakeLanguagePack({"zig": LookupError("missing grammar")})

    def fake_run(command, **_kwargs):
        probe_calls.append(command[-1])
        return _completed()

    monkeypatch.setattr(parser_module.subprocess, "run", fake_run)
    monkeypatch.setattr(
        parser_module.importlib,
        "import_module",
        lambda _name: language_pack,
    )

    assert CodeParser()._get_parser("zig") is None
    assert CodeParser()._get_parser("zig") is None
    assert probe_calls == ["zig"]
    assert language_pack.calls == ["zig"]


def test_unexpected_parent_load_failure_still_surfaces(monkeypatch):
    language_pack = _FakeLanguagePack({"tsx": RuntimeError("native loader bug")})
    monkeypatch.setattr(
        parser_module.subprocess,
        "run",
        lambda *_args, **_kwargs: _completed(),
    )
    monkeypatch.setattr(
        parser_module.importlib,
        "import_module",
        lambda _name: language_pack,
    )

    with pytest.raises(RuntimeError, match="native loader bug"):
        CodeParser()._get_parser("tsx")
