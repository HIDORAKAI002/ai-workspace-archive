"""Tests for CLI helpers and MCP serve command wiring."""

import json
import logging
import sys
from importlib.metadata import PackageNotFoundError
from unittest.mock import MagicMock, patch

from code_review_graph import cli


def test_get_version_falls_back_to_package_attr_when_metadata_missing(
    monkeypatch, caplog,
):
    """When importlib.metadata can't find the dist, fall back to __version__.

    This matters on filesystems where iCloud / OneDrive leave orphan
    dist-info dirs that confuse the metadata lookup. Before v2.3.5 the
    fallback returned the literal string "dev", which produced confusing
    output for installed users whose lookup happened to fail.
    """
    def _raise_package_not_found(_dist_name: str) -> str:
        raise PackageNotFoundError("code-review-graph")

    monkeypatch.setattr(cli, "pkg_version", _raise_package_not_found)

    with caplog.at_level(logging.DEBUG, logger="code_review_graph.cli"):
        version = cli._get_version()

    # Falls back to the package's __version__, not "dev"
    from code_review_graph import __version__ as expected
    assert version == expected
    assert "Package metadata unavailable" in caplog.text


def test_get_version_returns_dev_when_both_sources_fail(monkeypatch, caplog):
    """The literal "dev" fallback still fires when __version__ also fails."""
    def _raise_package_not_found(_dist_name: str) -> str:
        raise PackageNotFoundError("code-review-graph")

    monkeypatch.setattr(cli, "pkg_version", _raise_package_not_found)

    import code_review_graph
    monkeypatch.delattr(code_review_graph, "__version__", raising=False)

    with caplog.at_level(logging.DEBUG, logger="code_review_graph.cli"):
        version = cli._get_version()

    assert version == "dev"


class TestServeCommand:
    def test_serve_passes_auto_watch_flag(self):
        argv = [
            "code-review-graph",
            "serve",
            "--repo",
            "repo-root",
            "--auto-watch",
        ]
        with patch.object(sys, "argv", argv):
            with patch("code_review_graph.main.main") as mock_serve:
                cli.main()

        mock_serve.assert_called_once_with(
            repo_root="repo-root",
            auto_watch=True,
            tools=None,
        )

    def test_mcp_alias_maps_to_serve(self):
        argv = [
            "code-review-graph",
            "mcp",
            "--repo",
            "repo-root",
        ]
        with patch.object(sys, "argv", argv):
            with patch("code_review_graph.main.main") as mock_serve:
                cli.main()

        mock_serve.assert_called_once_with(
            repo_root="repo-root",
            auto_watch=False,
        )


class TestWatchInteraction:
    def test_watch_exits_when_lock_is_held(self):
        argv = ["code-review-graph", "watch", "--repo", "repo-root"]
        with patch.object(sys, "argv", argv):
            with patch("code_review_graph.graph.GraphStore") as mock_store:
                mock_store.return_value = MagicMock()
                with patch("code_review_graph.incremental.get_db_path") as mock_db:
                    mock_db.return_value = MagicMock()
                    with patch("code_review_graph.incremental.watch") as mock_watch:
                        mock_watch.side_effect = RuntimeError("watcher already running")
                        try:
                            cli.main()
                            assert False, "Expected SystemExit"
                        except SystemExit as exc:
                            assert exc.code == 1


class TestBuildUpdateCommands:
    def test_build_skip_postprocess_does_not_run_extra_cli_postprocess(self):
        argv = [
            "code-review-graph",
            "build",
            "--skip-postprocess",
            "--repo",
            "repo-root",
        ]
        result = {
            "files_parsed": 1,
            "total_nodes": 2,
            "total_edges": 1,
            "postprocess_level": "none",
        }

        with patch.object(sys, "argv", argv):
            with patch("code_review_graph.graph.GraphStore") as mock_store:
                mock_store.return_value = MagicMock()
                with patch("code_review_graph.incremental.get_db_path") as mock_db:
                    mock_db.return_value = MagicMock()
                    with patch(
                        "code_review_graph.tools.build.build_or_update_graph",
                        return_value=result,
                    ) as mock_build:
                        with patch(
                            "code_review_graph.postprocessing.run_post_processing",
                        ) as mock_postprocess:
                            cli.main()

        mock_build.assert_called_once_with(
            full_rebuild=True,
            repo_root="repo-root",
            postprocess="none",
        )
        mock_postprocess.assert_not_called()

    def test_update_skip_flows_does_not_run_extra_cli_postprocess(self):
        argv = [
            "code-review-graph",
            "update",
            "--skip-flows",
            "--repo",
            "repo-root",
        ]
        result = {
            "files_updated": 1,
            "total_nodes": 2,
            "total_edges": 1,
            "postprocess_level": "minimal",
        }

        with patch.object(sys, "argv", argv):
            with patch("code_review_graph.graph.GraphStore") as mock_store:
                mock_store.return_value = MagicMock()
                with patch("code_review_graph.incremental.get_db_path") as mock_db:
                    mock_db.return_value = MagicMock()
                    with patch(
                        "code_review_graph.tools.build.build_or_update_graph",
                        return_value=result,
                    ) as mock_build:
                        with patch(
                            "code_review_graph.postprocessing.run_post_processing",
                        ) as mock_postprocess:
                            cli.main()

        mock_build.assert_called_once_with(
            full_rebuild=False,
            repo_root="repo-root",
            base="HEAD~1",
            postprocess="minimal",
        )
        mock_postprocess.assert_not_called()


class TestDetectChangesCommand:
    def test_brief_output_includes_token_savings_panel(self, tmp_path, capsys):
        """v2.3.5: --brief output renders a boxed Token Savings panel.

        Replaces the v2.3.4 one-line `Estimated context saved: …` format.
        The panel must include the title, the saved-tokens line, the
        percent suffix, and box borders.
        """
        repo = tmp_path / "repo"
        repo.mkdir()
        (repo / ".git").mkdir()
        (repo / "app.py").write_text("x" * 2000, encoding="utf-8")
        argv = [
            "code-review-graph",
            "detect-changes",
            "--repo",
            str(repo),
            "--brief",
        ]

        with patch.object(sys, "argv", argv):
            with patch("code_review_graph.graph.GraphStore") as mock_store:
                mock_store.return_value = MagicMock()
                with patch("code_review_graph.incremental.get_db_path") as mock_db:
                    mock_db.return_value = MagicMock()
                    with patch(
                        "code_review_graph.incremental.get_changed_files",
                        return_value=["app.py"],
                    ):
                        with patch(
                            "code_review_graph.changes.analyze_changes",
                            return_value={"summary": "summary only"},
                        ):
                            cli.main()

        output = capsys.readouterr().out
        assert "summary only" in output
        # Panel structure: title, the three core rows, and box borders.
        assert "Token Savings" in output
        assert "Full context would be:" in output
        assert "Graph context used:" in output
        assert "Saved:" in output
        # Box drawing characters from format_context_savings_panel
        assert "┌" in output and "┘" in output

    def test_json_output_includes_compact_savings_metadata(self, tmp_path, capsys):
        repo = tmp_path / "repo"
        repo.mkdir()
        (repo / ".git").mkdir()
        (repo / "app.py").write_text("x" * 2000, encoding="utf-8")
        argv = [
            "code-review-graph",
            "detect-changes",
            "--repo",
            str(repo),
        ]

        with patch.object(sys, "argv", argv):
            with patch("code_review_graph.graph.GraphStore") as mock_store:
                mock_store.return_value = MagicMock()
                with patch("code_review_graph.incremental.get_db_path") as mock_db:
                    mock_db.return_value = MagicMock()
                    with patch(
                        "code_review_graph.incremental.get_changed_files",
                        return_value=["app.py"],
                    ):
                        with patch(
                            "code_review_graph.changes.analyze_changes",
                            return_value={"summary": "json summary"},
                        ):
                            cli.main()

        result = json.loads(capsys.readouterr().out)
        assert set(result["context_savings"]) == {
            "estimated",
            "saved_tokens",
            "saved_percent",
        }
