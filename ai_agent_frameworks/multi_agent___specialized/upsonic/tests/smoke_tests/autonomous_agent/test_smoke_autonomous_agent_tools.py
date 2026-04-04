"""
Smoke tests for ALL autonomous agent tools.

Covers every @tool in:
- AutonomousFilesystemToolKit: read_file, write_file, edit_file, list_files,
  search_files, grep_files, move_file, copy_file, delete_file, file_info, create_directory (sync + async)
- AutonomousShellToolKit: run_command, run_python, check_command_exists (sync + async)
- Workspace sandboxing and toolkit instantiation

Runnable via: pytest tests/smoke_tests/autonomous_agent/test_smoke_autonomous_agent_tools.py
"""

from __future__ import annotations

import os
import shutil
import tempfile
from pathlib import Path

import pytest

from upsonic.agent.autonomous_agent import (
    AutonomousFilesystemToolKit,
    AutonomousShellToolKit,
)

pytestmark = pytest.mark.timeout(30)


@pytest.fixture
def temp_workspace() -> str:
    workspace: str = tempfile.mkdtemp(prefix="autonomous_tools_smoke_")
    yield workspace
    if os.path.exists(workspace):
        shutil.rmtree(workspace)


@pytest.fixture
def sample_file_path(temp_workspace: str) -> str:
    path: Path = Path(temp_workspace) / "sample.txt"
    path.write_text("line1\nline2\nline3\n")
    return str(path)


# ---------------------------------------------------------------------------
# Filesystem toolkit smoke – all tools
# ---------------------------------------------------------------------------


class TestSmokeFilesystemToolKit:
    def test_instantiation(self, temp_workspace: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        assert toolkit.workspace == Path(temp_workspace).resolve()

    def test_read_file(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.read_file("sample.txt")
        assert "line1" in result
        assert "line2" in result
        assert "1|" in result or "line1" in result

    def test_write_file(self, temp_workspace: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        content: str = "smoke content"
        result: str = toolkit.write_file("out.txt", content)
        assert "✅" in result or "Successfully" in result
        assert (Path(temp_workspace) / "out.txt").read_text() == content

    def test_edit_file_requires_read_first(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.edit_file("sample.txt", "line1", "edited")
        assert "❌" in result
        assert "read_file" in result

    def test_edit_file_after_read(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        toolkit.read_file("sample.txt")
        result: str = toolkit.edit_file("sample.txt", "line1", "edited_line")
        assert "✅" in result
        assert (Path(temp_workspace) / "sample.txt").read_text().startswith("edited_line")

    def test_list_files(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.list_files(".")
        assert "sample.txt" in result

    def test_list_files_recursive(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.list_files(".", recursive=True)
        assert "sample.txt" in result

    def test_search_files(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.search_files("*.txt")
        assert "sample.txt" in result

    def test_grep_files(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.grep_files("line2", file_pattern="*.txt")
        assert "line2" in result
        assert "sample.txt" in result

    def test_move_file(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.move_file("sample.txt", "moved.txt")
        assert "✅" in result
        assert not (Path(temp_workspace) / "sample.txt").exists()
        assert (Path(temp_workspace) / "moved.txt").exists()

    def test_copy_file(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.copy_file("sample.txt", "copied.txt")
        assert "✅" in result
        assert (Path(temp_workspace) / "copied.txt").read_text() == "line1\nline2\nline3\n"

    def test_delete_file(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.delete_file("sample.txt")
        assert "✅" in result
        assert not (Path(temp_workspace) / "sample.txt").exists()

    def test_file_info(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.file_info("sample.txt")
        assert "sample.txt" in result
        assert "File" in result
        assert "Size" in result

    def test_create_directory(self, temp_workspace: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.create_directory("subdir/nested")
        assert "✅" in result or "Created" in result
        assert (Path(temp_workspace) / "subdir" / "nested").is_dir()

    def test_workspace_sandbox_blocks_escape(self, temp_workspace: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        with pytest.raises(ValueError) as exc_info:
            toolkit._validate_path("/etc/passwd")
        assert "outside workspace" in str(exc_info.value)

    @pytest.mark.asyncio
    async def test_aread_file(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.aread_file("sample.txt")
        assert "line1" in result

    @pytest.mark.asyncio
    async def test_awrite_file(self, temp_workspace: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.awrite_file("async_out.txt", "async content")
        assert "✅" in result or "Successfully" in result
        assert (Path(temp_workspace) / "async_out.txt").read_text() == "async content"

    @pytest.mark.asyncio
    async def test_aedit_file(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        await toolkit.aread_file("sample.txt")
        result: str = await toolkit.aedit_file("sample.txt", "line2", "line2_edited")
        assert "✅" in result
        assert "line2_edited" in (Path(temp_workspace) / "sample.txt").read_text()

    @pytest.mark.asyncio
    async def test_alist_files(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.alist_files(".")
        assert "sample.txt" in result

    @pytest.mark.asyncio
    async def test_asearch_files(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.asearch_files("*.txt")
        assert "sample.txt" in result

    @pytest.mark.asyncio
    async def test_agrep_files(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.agrep_files("line3", file_pattern="*.txt")
        assert "line3" in result

    @pytest.mark.asyncio
    async def test_amove_file(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.amove_file("sample.txt", "async_moved.txt")
        assert "✅" in result
        assert (Path(temp_workspace) / "async_moved.txt").exists()

    @pytest.mark.asyncio
    async def test_acopy_file(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.acopy_file("sample.txt", "async_copied.txt")
        assert "✅" in result
        assert (Path(temp_workspace) / "async_copied.txt").exists()

    @pytest.mark.asyncio
    async def test_adelete_file(self, temp_workspace: str) -> None:
        path: Path = Path(temp_workspace) / "to_delete.txt"
        path.write_text("x")
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.adelete_file("to_delete.txt")
        assert "✅" in result
        assert not path.exists()

    @pytest.mark.asyncio
    async def test_afile_info(self, temp_workspace: str, sample_file_path: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.afile_info("sample.txt")
        assert "sample.txt" in result
        assert "File" in result

    @pytest.mark.asyncio
    async def test_acreate_directory(self, temp_workspace: str) -> None:
        toolkit: AutonomousFilesystemToolKit = AutonomousFilesystemToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.acreate_directory("async_dir/leaf")
        assert "✅" in result or "Created" in result
        assert (Path(temp_workspace) / "async_dir" / "leaf").is_dir()


# ---------------------------------------------------------------------------
# Shell toolkit smoke – all tools
# ---------------------------------------------------------------------------


class TestSmokeShellToolKit:
    def test_instantiation(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        assert toolkit.workspace == Path(temp_workspace).resolve()

    def test_run_command_echo(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.run_command("echo smoke_ok")
        assert "smoke_ok" in result
        assert "Exit code: 0" in result or "0" in result

    def test_run_command_pwd(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.run_command("pwd")
        assert temp_workspace in result

    def test_run_python(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.run_python("print(1 + 1)")
        assert "2" in result
        assert "Exit code: 0" in result or "0" in result

    def test_check_command_exists(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.check_command_exists("python3")
        assert "✅" in result or "available" in result

    def test_check_command_not_exists(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.check_command_exists("nonexistent_cmd_xyz_12345")
        assert "❌" in result or "not available" in result

    def test_blocked_command(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        result: str = toolkit.run_command("rm -rf /")
        assert "blocked" in result.lower() or "error" in result.lower()

    @pytest.mark.asyncio
    async def test_arun_command(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.arun_command("echo async_ok")
        assert "async_ok" in result

    @pytest.mark.asyncio
    async def test_arun_python(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.arun_python("print(7 * 8)")
        assert "56" in result

    @pytest.mark.asyncio
    async def test_acheck_command_exists(self, temp_workspace: str) -> None:
        toolkit: AutonomousShellToolKit = AutonomousShellToolKit(
            workspace=temp_workspace
        )
        result: str = await toolkit.acheck_command_exists("echo")
        assert "✅" in result or "available" in result
