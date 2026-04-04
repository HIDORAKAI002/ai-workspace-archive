"""
Comprehensive tests for RalphLoop implementation.

This test file covers all components of the Ralph architecture:
- RalphConfig
- RalphState
- StateManager
- BackpressureGate (including "no tests collected" detection)
- All ToolKits (PlanUpdater, LearningsUpdater, Backpressure, Filesystem, SubagentSpawner)
- Phases (Requirements, Todo, Incremental)
- Result models (IterationRecord, RalphLoopResult)
- RalphLoop orchestrator
"""

import asyncio
import os
import shutil
import tempfile
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List
from unittest.mock import MagicMock, patch

import pytest

# ============================================================================
# IMPORTS - Testing each Ralph module
# ============================================================================

from upsonic.ralph.config import RalphConfig
from upsonic.ralph.state.models import RalphState
from upsonic.ralph.state.manager import StateManager
from upsonic.ralph.backpressure.gate import (
    BackpressureGate,
    BackpressureResult,
    ValidationResult,
)
from upsonic.ralph.tools.plan_updater import PlanUpdaterToolKit
from upsonic.ralph.tools.learnings_updater import LearningsUpdaterToolKit
from upsonic.ralph.tools.backpressure import BackpressureToolKit
from upsonic.ralph.tools.filesystem import RalphFilesystemToolKit
from upsonic.ralph.tools.subagent_spawner import SubagentSpawnerToolKit
from upsonic.ralph.phases.base import BasePhase, PhaseResult
from upsonic.ralph.phases.incremental import IncrementalPhase, IterationResult
from upsonic.ralph.result import IterationRecord, RalphLoopResult
from upsonic.ralph.loop import RalphLoop


# ============================================================================
# FIXTURES
# ============================================================================

@pytest.fixture
def temp_workspace() -> Path:
    """Create a temporary workspace directory."""
    workspace = Path(tempfile.mkdtemp(prefix="ralph_test_"))
    yield workspace
    # Cleanup
    if workspace.exists():
        shutil.rmtree(workspace)


@pytest.fixture
def state_manager(temp_workspace: Path) -> StateManager:
    """Create a StateManager with temporary workspace."""
    return StateManager(temp_workspace)


@pytest.fixture
def sample_specs() -> Dict[str, str]:
    """Sample specifications for testing."""
    return {
        "auth": "# Auth Spec\n\n- JWT authentication\n- Session management",
        "api": "# API Spec\n\n- REST endpoints\n- CRUD operations",
        "database": "# Database Spec\n\n- PostgreSQL\n- User table schema",
    }


@pytest.fixture
def sample_fix_plan() -> str:
    """Sample fix_plan.md content."""
    return """- [ ] Implement user authentication
- [ ] Create database models
- [ ] Add API endpoints
* Another task format
1. Numbered task format"""


# ============================================================================
# TEST: RalphConfig
# ============================================================================

class TestRalphConfig:
    """Tests for RalphConfig dataclass."""
    
    def test_config_creation_minimal(self) -> None:
        """Test creating config with only required fields."""
        config = RalphConfig(goal="Build a TODO app")
        
        assert config.goal == "Build a TODO app"
        assert config.model == "openai/gpt-4o"
        assert config.workspace is not None
        assert config.test_command is None
        assert config.build_command is None
        assert config.lint_command is None
        assert config.specs is None
        assert config.max_iterations is None
        assert config.max_subagents == 50
        assert config.debug is False
        assert config.show_progress is True
    
    def test_config_creation_full(self, temp_workspace: Path) -> None:
        """Test creating config with all fields."""
        def on_iter(result: Any) -> None:
            pass
        
        def on_err(e: Exception) -> None:
            pass
        
        specs = {"auth": "# Auth"}
        
        config = RalphConfig(
            goal="Build a REST API",
            model="openai/gpt-4.1",
            workspace=temp_workspace,
            test_command="pytest",
            build_command="pip install -e .",
            lint_command="ruff check .",
            specs=specs,
            max_iterations=10,
            max_subagents=25,
            debug=True,
            on_iteration=on_iter,
            on_error=on_err,
            show_progress=False,
        )
        
        assert config.goal == "Build a REST API"
        assert config.model == "openai/gpt-4.1"
        assert config.workspace_path == temp_workspace
        assert config.test_command == "pytest"
        assert config.build_command == "pip install -e ."
        assert config.lint_command == "ruff check ."
        assert config.specs == specs
        assert config.max_iterations == 10
        assert config.max_subagents == 25
        assert config.debug is True
        assert config.show_progress is False
    
    def test_config_validation_empty_goal(self) -> None:
        """Test that empty goal raises ValueError."""
        with pytest.raises(ValueError, match="goal is required"):
            RalphConfig(goal="")
    
    def test_config_validation_invalid_max_iterations(self) -> None:
        """Test that invalid max_iterations raises ValueError."""
        with pytest.raises(ValueError, match="max_iterations must be at least 1"):
            RalphConfig(goal="Test", max_iterations=0)
        
        with pytest.raises(ValueError, match="max_iterations must be at least 1"):
            RalphConfig(goal="Test", max_iterations=-5)
    
    def test_config_validation_invalid_max_subagents(self) -> None:
        """Test that invalid max_subagents raises ValueError."""
        with pytest.raises(ValueError, match="max_subagents must be at least 1"):
            RalphConfig(goal="Test", max_subagents=0)
    
    def test_config_workspace_path_from_string(self) -> None:
        """Test workspace path conversion from string."""
        config = RalphConfig(goal="Test", workspace="/tmp/test_workspace")
        
        assert isinstance(config.workspace_path, Path)
        assert str(config.workspace_path) == "/tmp/test_workspace"
    
    def test_config_path_properties(self, temp_workspace: Path) -> None:
        """Test all path properties."""
        config = RalphConfig(goal="Test", workspace=temp_workspace)
        
        assert config.specs_dir == temp_workspace / "specs"
        assert config.src_dir == temp_workspace / "src"
        assert config.prompt_file == temp_workspace / "PROMPT.md"
        assert config.fix_plan_file == temp_workspace / "fix_plan.md"
        assert config.learnings_file == temp_workspace / "AGENT.md"
    
    def test_config_has_backpressure(self, temp_workspace: Path) -> None:
        """Test has_backpressure method."""
        config_no_bp = RalphConfig(goal="Test", workspace=temp_workspace)
        assert config_no_bp.has_backpressure() is False
        
        config_with_test = RalphConfig(goal="Test", workspace=temp_workspace, test_command="pytest")
        assert config_with_test.has_backpressure() is True
        
        config_with_build = RalphConfig(goal="Test", workspace=temp_workspace, build_command="make")
        assert config_with_build.has_backpressure() is True
        
        config_with_lint = RalphConfig(goal="Test", workspace=temp_workspace, lint_command="ruff")
        assert config_with_lint.has_backpressure() is True
    
    def test_config_to_dict(self, temp_workspace: Path) -> None:
        """Test to_dict method."""
        config = RalphConfig(
            goal="Test Goal",
            workspace=temp_workspace,
            test_command="pytest",
            specs={"auth": "# Auth"},
        )
        
        result = config.to_dict()
        
        assert result["goal"] == "Test Goal"
        assert result["model"] == "openai/gpt-4o"
        assert result["workspace"] == str(temp_workspace)
        assert result["test_command"] == "pytest"
        assert result["has_specs"] is True
        assert "max_iterations" in result
        assert "max_subagents" in result


# ============================================================================
# TEST: RalphState
# ============================================================================

class TestRalphState:
    """Tests for RalphState model."""
    
    def test_state_creation(self, temp_workspace: Path) -> None:
        """Test creating RalphState."""
        state = RalphState(
            prompt="# Prompt",
            specs={"auth": "# Auth", "api": "# API"},
            fix_plan="- Task 1\n- Task 2",
            learnings="## PATTERN\n- Learning 1",
            workspace_path=temp_workspace,
        )
        
        assert state.prompt == "# Prompt"
        assert len(state.specs) == 2
        assert state.fix_plan == "- Task 1\n- Task 2"
        assert state.learnings == "## PATTERN\n- Learning 1"
        assert state.workspace_path == temp_workspace
    
    def test_state_defaults(self, temp_workspace: Path) -> None:
        """Test RalphState with default values."""
        state = RalphState(workspace_path=temp_workspace)
        
        assert state.prompt == ""
        assert state.specs == {}
        assert state.fix_plan == ""
        assert state.learnings == ""
    
    def test_format_specs_for_context_empty(self, temp_workspace: Path) -> None:
        """Test formatting specs when empty."""
        state = RalphState(workspace_path=temp_workspace)
        
        result = state.format_specs_for_context()
        
        assert result == "No specifications defined yet."
    
    def test_format_specs_for_context_with_specs(
        self, temp_workspace: Path, sample_specs: Dict[str, str]
    ) -> None:
        """Test formatting specs when populated."""
        state = RalphState(specs=sample_specs, workspace_path=temp_workspace)
        
        result = state.format_specs_for_context()
        
        assert "### api" in result
        assert "### auth" in result
        assert "### database" in result
        assert "REST endpoints" in result
        assert "JWT authentication" in result
    
    def test_format_for_context(
        self, temp_workspace: Path, sample_specs: Dict[str, str]
    ) -> None:
        """Test full context formatting."""
        state = RalphState(
            specs=sample_specs,
            fix_plan="- Task 1\n- Task 2",
            learnings="## PATTERN\n- Learning 1",
            workspace_path=temp_workspace,
        )
        
        result = state.format_for_context()
        
        assert "## SPECIFICATIONS" in result
        assert "## TODO LIST" in result
        assert "Task 1" in result
        assert "## LEARNINGS" in result
        assert "Learning 1" in result
    
    def test_get_todo_items_dash_format(self, temp_workspace: Path) -> None:
        """Test parsing TODO items in dash format."""
        state = RalphState(
            fix_plan="- Task One\n- Task Two\n- Task Three",
            workspace_path=temp_workspace,
        )
        
        items = state.get_todo_items()
        
        assert len(items) == 3
        assert "Task One" in items
        assert "Task Two" in items
        assert "Task Three" in items
    
    def test_get_todo_items_asterisk_format(self, temp_workspace: Path) -> None:
        """Test parsing TODO items in asterisk format."""
        state = RalphState(
            fix_plan="* Task A\n* Task B",
            workspace_path=temp_workspace,
        )
        
        items = state.get_todo_items()
        
        assert len(items) == 2
        assert "Task A" in items
        assert "Task B" in items
    
    def test_get_todo_items_numbered_format(self, temp_workspace: Path) -> None:
        """Test parsing TODO items in numbered format."""
        state = RalphState(
            fix_plan="1. First task\n2. Second task\n3. Third task",
            workspace_path=temp_workspace,
        )
        
        items = state.get_todo_items()
        
        assert len(items) == 3
        assert "First task" in items
        assert "Second task" in items
    
    def test_get_todo_items_mixed_format(
        self, temp_workspace: Path, sample_fix_plan: str
    ) -> None:
        """Test parsing TODO items in mixed formats."""
        state = RalphState(
            fix_plan=sample_fix_plan,
            workspace_path=temp_workspace,
        )
        
        items = state.get_todo_items()
        
        assert len(items) == 5
        assert "Implement user authentication" in items[0]
    
    def test_get_todo_items_empty(self, temp_workspace: Path) -> None:
        """Test parsing empty TODO list."""
        state = RalphState(fix_plan="", workspace_path=temp_workspace)
        
        items = state.get_todo_items()
        
        assert len(items) == 0
    
    def test_is_plan_empty_true(self, temp_workspace: Path) -> None:
        """Test is_plan_empty when truly empty."""
        state = RalphState(fix_plan="", workspace_path=temp_workspace)
        
        assert state.is_plan_empty() is True
    
    def test_is_plan_empty_false(self, temp_workspace: Path) -> None:
        """Test is_plan_empty when items exist."""
        state = RalphState(fix_plan="- Task 1", workspace_path=temp_workspace)
        
        assert state.is_plan_empty() is False
    
    def test_get_spec_names(
        self, temp_workspace: Path, sample_specs: Dict[str, str]
    ) -> None:
        """Test getting spec names."""
        state = RalphState(specs=sample_specs, workspace_path=temp_workspace)
        
        names = state.get_spec_names()
        
        assert set(names) == {"auth", "api", "database"}
    
    def test_has_specs(self, temp_workspace: Path) -> None:
        """Test has_specs method."""
        state_empty = RalphState(workspace_path=temp_workspace)
        assert state_empty.has_specs() is False
        
        state_with_specs = RalphState(
            specs={"auth": "# Auth"}, 
            workspace_path=temp_workspace
        )
        assert state_with_specs.has_specs() is True
    
    def test_to_dict(
        self, temp_workspace: Path, sample_specs: Dict[str, str]
    ) -> None:
        """Test to_dict serialization."""
        state = RalphState(
            prompt="# Prompt",
            specs=sample_specs,
            fix_plan="- Task 1\n- Task 2",
            learnings="## PATTERN\n- Learn",
            workspace_path=temp_workspace,
        )
        
        result = state.to_dict()
        
        assert result["prompt"] == "# Prompt"
        assert result["specs"] == sample_specs
        assert result["todo_count"] == 2
        assert result["specs_count"] == 3
        assert result["workspace_path"] == str(temp_workspace)


# ============================================================================
# TEST: StateManager
# ============================================================================

class TestStateManager:
    """Tests for StateManager."""
    
    def test_init_creates_directories(self, temp_workspace: Path) -> None:
        """Test that StateManager creates necessary directories."""
        manager = StateManager(temp_workspace)
        
        assert manager.workspace.exists()
        assert manager.specs_dir.exists()
        assert manager.src_dir.exists()
    
    def test_save_and_load_prompt(self, state_manager: StateManager) -> None:
        """Test saving and loading PROMPT.md."""
        content = "# Project Prompt\n\nBuild something great."
        
        state_manager.save_prompt(content)
        state = state_manager.load_state()
        
        assert state.prompt == content
    
    def test_save_and_load_spec(self, state_manager: StateManager) -> None:
        """Test saving and loading spec files."""
        state_manager.save_spec("auth", "# Auth Spec\n\n- Feature 1")
        state_manager.save_spec("api", "# API Spec\n\n- Endpoint 1")
        
        state = state_manager.load_state()
        
        assert len(state.specs) == 2
        assert "auth" in state.specs
        assert "api" in state.specs
        assert "Feature 1" in state.specs["auth"]
    
    def test_save_spec_with_md_extension(self, state_manager: StateManager) -> None:
        """Test saving spec with .md extension in name."""
        state_manager.save_spec("test.md", "# Test")
        
        state = state_manager.load_state()
        
        # Should normalize and use just "test" as key
        assert "test" in state.specs or "test.md" in state.specs
    
    def test_update_fix_plan(self, state_manager: StateManager) -> None:
        """Test updating fix_plan.md."""
        content = "- Task 1\n- Task 2\n- Task 3"
        
        state_manager.update_fix_plan(content)
        state = state_manager.load_state()
        
        assert state.fix_plan == content
    
    def test_append_to_fix_plan(self, state_manager: StateManager) -> None:
        """Test appending to fix_plan.md."""
        state_manager.update_fix_plan("- Task 1")
        state_manager.append_to_fix_plan("Task 2")
        
        state = state_manager.load_state()
        items = state.get_todo_items()
        
        assert len(items) == 2
        assert "Task 1" in items[0]
        assert "Task 2" in items[1]
    
    def test_remove_from_fix_plan(self, state_manager: StateManager) -> None:
        """Test removing from fix_plan.md."""
        state_manager.update_fix_plan("- Task One\n- Task Two\n- Task Three")
        state_manager.remove_pending_item("Task Two")
        
        state = state_manager.load_state()
        
        assert "Task Two" not in state.fix_plan
        assert "Task One" in state.fix_plan
        assert "Task Three" in state.fix_plan
    
    def test_remove_from_fix_plan_case_insensitive(
        self, state_manager: StateManager
    ) -> None:
        """Test that remove is case insensitive."""
        state_manager.update_fix_plan("- Implement AUTH Feature")
        state_manager.remove_pending_item("auth feature")
        
        state = state_manager.load_state()
        
        assert "AUTH" not in state.fix_plan
    
    def test_update_learnings(self, state_manager: StateManager) -> None:
        """Test updating AGENT.md."""
        content = "## PATTERN\n- Use dependency injection"
        
        state_manager.update_learnings(content)
        state = state_manager.load_state()
        
        assert state.learnings == content
    
    def test_append_learning(self, state_manager: StateManager) -> None:
        """Test appending learning to AGENT.md."""
        state_manager.append_learning("Use async/await for I/O", "pattern")
        state_manager.append_learning("Run tests first", "test")
        
        content = state_manager.read_learnings()
        
        assert "PATTERN" in content
        assert "Use async/await" in content
        assert "TEST" in content
        assert "Run tests first" in content
    
    def test_has_specs(self, state_manager: StateManager) -> None:
        """Test has_specs method."""
        assert state_manager.has_specs() is False
        
        state_manager.save_spec("test", "# Test")
        
        assert state_manager.has_specs() is True
    
    def test_has_fix_plan(self, state_manager: StateManager) -> None:
        """Test has_fix_plan method."""
        assert state_manager.has_fix_plan() is False
        
        state_manager.update_fix_plan("- Task 1")
        
        assert state_manager.has_fix_plan() is True
    
    def test_get_spec_names(self, state_manager: StateManager) -> None:
        """Test get_spec_names method."""
        state_manager.save_spec("auth", "# Auth")
        state_manager.save_spec("api", "# API")
        state_manager.save_spec("db", "# DB")
        
        names = state_manager.get_spec_names()
        
        assert set(names) == {"auth", "api", "db"}
    
    def test_load_state_empty_workspace(self, state_manager: StateManager) -> None:
        """Test loading state from empty workspace."""
        state = state_manager.load_state()
        
        assert state.prompt == ""
        assert state.specs == {}
        assert state.fix_plan == ""
        assert state.learnings == ""
        assert state.workspace_path == state_manager.workspace


# ============================================================================
# TEST: BackpressureGate
# ============================================================================

class TestBackpressureGate:
    """Tests for BackpressureGate."""
    
    def test_gate_creation(self, temp_workspace: Path) -> None:
        """Test creating BackpressureGate."""
        gate = BackpressureGate(
            workspace=temp_workspace,
            build_command="make build",
            test_command="pytest",
            lint_command="ruff check .",
            timeout=120,
        )
        
        assert gate.workspace == temp_workspace.resolve()
        assert gate.build_command == "make build"
        assert "pytest" in gate.test_command  # May have --rootdir appended
        assert gate.lint_command == "ruff check ."
        assert gate.timeout == 120
    
    def test_pytest_rootdir_normalization(self, temp_workspace: Path) -> None:
        """Test that pytest gets --rootdir appended."""
        gate = BackpressureGate(
            workspace=temp_workspace,
            test_command="pytest tests/",
        )
        
        assert "--rootdir=." in gate.test_command
        assert gate.test_command == "pytest --rootdir=. tests/"
    
    def test_pytest_with_existing_rootdir_unchanged(
        self, temp_workspace: Path
    ) -> None:
        """Test that existing --rootdir is not duplicated."""
        gate = BackpressureGate(
            workspace=temp_workspace,
            test_command="pytest --rootdir=/some/path",
        )
        
        assert gate.test_command.count("--rootdir") == 1
    
    def test_has_validations(self, temp_workspace: Path) -> None:
        """Test has_validations method."""
        gate_empty = BackpressureGate(workspace=temp_workspace)
        assert gate_empty.has_validations() is False
        
        gate_with_test = BackpressureGate(
            workspace=temp_workspace, 
            test_command="pytest"
        )
        assert gate_with_test.has_validations() is True
    
    def test_validate_no_commands(self, temp_workspace: Path) -> None:
        """Test validation with no commands configured."""
        gate = BackpressureGate(workspace=temp_workspace)
        
        result = gate.validate()
        
        assert result.passed is True
        assert len(result.results) == 0
    
    def test_validate_successful_command(self, temp_workspace: Path) -> None:
        """Test validation with successful command."""
        gate = BackpressureGate(
            workspace=temp_workspace,
            build_command="echo success",
        )
        
        result = gate.validate(validation_type="build")
        
        assert result.passed is True
        assert len(result.results) == 1
        assert result.results[0].validation_type == "build"
        assert result.results[0].returncode == 0
    
    def test_validate_failed_command(self, temp_workspace: Path) -> None:
        """Test validation with failed command."""
        gate = BackpressureGate(
            workspace=temp_workspace,
            build_command="exit 1",
        )
        
        result = gate.validate(validation_type="build")
        
        assert result.passed is False
        assert result.results[0].passed is False
        assert result.results[0].returncode == 1
    
    def test_is_no_tests_collected_pytest(self, temp_workspace: Path) -> None:
        """Test detection of 'no tests collected' for pytest."""
        gate = BackpressureGate(workspace=temp_workspace)
        
        # pytest "collected 0 items"
        assert gate._is_no_tests_collected(
            "collected 0 items", "", 5
        ) is True
        
        # pytest exit code 5
        assert gate._is_no_tests_collected(
            "some output", "", 5
        ) is True
        
        # Normal test run
        assert gate._is_no_tests_collected(
            "collected 5 items", "", 0
        ) is False
    
    def test_is_no_tests_collected_npm(self, temp_workspace: Path) -> None:
        """Test detection of 'no tests' for npm."""
        gate = BackpressureGate(workspace=temp_workspace)
        
        assert gate._is_no_tests_collected(
            "", 'Error: no test specified', 1
        ) is True
    
    def test_is_no_tests_collected_jest(self, temp_workspace: Path) -> None:
        """Test detection of 'no tests' for jest."""
        gate = BackpressureGate(workspace=temp_workspace)
        
        assert gate._is_no_tests_collected(
            "No tests found", "", 1
        ) is True
    
    def test_validate_no_tests_treated_as_pass(
        self, temp_workspace: Path
    ) -> None:
        """Test that 'no tests collected' is treated as pass."""
        # Create a workspace with no tests
        gate = BackpressureGate(
            workspace=temp_workspace,
            test_command="echo 'collected 0 items' && exit 5",
        )
        
        result = gate.validate(validation_type="test")
        
        assert result.passed is True
        assert result.results[0].no_tests_found is True
    
    def test_format_for_agent_pass(self, temp_workspace: Path) -> None:
        """Test format_for_agent with pass result."""
        result = BackpressureResult(
            passed=True,
            results=[
                ValidationResult(
                    validation_type="test",
                    passed=True,
                    command="pytest",
                    returncode=0,
                )
            ]
        )
        
        formatted = result.format_for_agent()
        
        assert formatted == "PASS"
    
    def test_format_for_agent_pass_no_tests(self, temp_workspace: Path) -> None:
        """Test format_for_agent with 'no tests found' pass."""
        result = BackpressureResult(
            passed=True,
            results=[
                ValidationResult(
                    validation_type="test",
                    passed=True,
                    command="pytest",
                    returncode=5,
                    no_tests_found=True,
                )
            ]
        )
        
        formatted = result.format_for_agent()
        
        assert "PASS" in formatted
        assert "no tests found" in formatted
    
    def test_format_for_agent_fail(self, temp_workspace: Path) -> None:
        """Test format_for_agent with fail result."""
        result = BackpressureResult(
            passed=False,
            results=[
                ValidationResult(
                    validation_type="build",
                    passed=False,
                    command="make",
                    returncode=2,
                    stderr="Build failed: missing dependency",
                )
            ]
        )
        
        formatted = result.format_for_agent()
        
        assert "FAIL" in formatted
        assert "build failed" in formatted.lower()
        assert "missing dependency" in formatted
    
    def test_get_failures(self) -> None:
        """Test get_failures method."""
        result = BackpressureResult(
            passed=False,
            results=[
                ValidationResult(
                    validation_type="build",
                    passed=True,
                    command="make",
                    returncode=0,
                ),
                ValidationResult(
                    validation_type="test",
                    passed=False,
                    command="pytest",
                    returncode=1,
                ),
            ]
        )
        
        failures = result.get_failures()
        
        assert len(failures) == 1
        assert failures[0].validation_type == "test"
    
    @pytest.mark.asyncio
    async def test_avalidate_successful(self, temp_workspace: Path) -> None:
        """Test async validation with success."""
        gate = BackpressureGate(
            workspace=temp_workspace,
            build_command="echo success",
        )
        
        result = await gate.avalidate(validation_type="build")
        
        assert result.passed is True


# ============================================================================
# TEST: ValidationResult
# ============================================================================

class TestValidationResult:
    """Tests for ValidationResult dataclass."""
    
    def test_get_error_summary_truncation(self) -> None:
        """Test error summary truncation."""
        long_error = "x" * 1000
        result = ValidationResult(
            validation_type="test",
            passed=False,
            command="pytest",
            returncode=1,
            stderr=long_error,
        )
        
        summary = result.get_error_summary(max_length=100)
        
        assert len(summary) <= 120  # 100 + "... (truncated)"
        assert "truncated" in summary
    
    def test_get_error_summary_no_tests(self) -> None:
        """Test error summary for no tests found."""
        result = ValidationResult(
            validation_type="test",
            passed=True,
            command="pytest",
            returncode=5,
            no_tests_found=True,
        )
        
        summary = result.get_error_summary()
        
        assert "NO TESTS FOUND" in summary


# ============================================================================
# TEST: PlanUpdaterToolKit
# ============================================================================

class TestPlanUpdaterToolKit:
    """Tests for PlanUpdaterToolKit."""
    
    def test_update_fix_plan_add(self, state_manager: StateManager) -> None:
        """Test adding item to fix_plan."""
        toolkit = PlanUpdaterToolKit(state_manager)
        
        result = toolkit.update_fix_plan(action="add", item="New task")
        
        assert "Added" in result
        state = state_manager.load_state()
        assert "New task" in state.fix_plan
    
    def test_update_fix_plan_add_missing_item(
        self, state_manager: StateManager
    ) -> None:
        """Test add action without item."""
        toolkit = PlanUpdaterToolKit(state_manager)
        
        result = toolkit.update_fix_plan(action="add", item="")
        
        assert "Error" in result
    
    def test_update_fix_plan_remove(self, state_manager: StateManager) -> None:
        """Test removing item from fix_plan."""
        state_manager.update_fix_plan("- Task A\n- Task B\n- Task C")
        toolkit = PlanUpdaterToolKit(state_manager)
        
        result = toolkit.update_fix_plan(action="delete", item="Task B")
        
        assert "Deleted" in result
        state = state_manager.load_state()
        assert "Task B" not in state.fix_plan
        assert "Task A" in state.fix_plan
    
    def test_update_fix_plan_replace(self, state_manager: StateManager) -> None:
        """Test replacing entire fix_plan content."""
        state_manager.update_fix_plan("- Old task")
        toolkit = PlanUpdaterToolKit(state_manager)
        
        new_content = "- New task 1\n- New task 2"
        result = toolkit.update_fix_plan(action="replace", new_content=new_content)
        
        assert "replaced" in result
        state = state_manager.load_state()
        assert state.fix_plan == new_content
    
    def test_update_fix_plan_replace_missing_content(
        self, state_manager: StateManager
    ) -> None:
        """Test replace action without new_content."""
        toolkit = PlanUpdaterToolKit(state_manager)
        
        result = toolkit.update_fix_plan(action="replace")
        
        assert "Error" in result
    
    def test_update_spec(self, state_manager: StateManager) -> None:
        """Test updating spec file."""
        toolkit = PlanUpdaterToolKit(state_manager)
        
        result = toolkit.update_spec("auth", "# Auth Specification\n\n- JWT")
        
        assert "Updated spec" in result
        state = state_manager.load_state()
        assert "auth" in state.specs
        assert "JWT" in state.specs["auth"]


# ============================================================================
# TEST: LearningsUpdaterToolKit
# ============================================================================

class TestLearningsUpdaterToolKit:
    """Tests for LearningsUpdaterToolKit."""
    
    def test_update_learnings(self, state_manager: StateManager) -> None:
        """Test recording a learning."""
        toolkit = LearningsUpdaterToolKit(state_manager)
        
        result = toolkit.update_learnings(
            learning="Always use async for I/O",
            category="pattern",
        )
        
        assert "Learning recorded" in result
        assert "PATTERN" in result
        
        learnings = state_manager.read_learnings()
        assert "async for I/O" in learnings
    
    def test_update_learnings_different_categories(
        self, state_manager: StateManager
    ) -> None:
        """Test learnings in different categories."""
        toolkit = LearningsUpdaterToolKit(state_manager)
        
        toolkit.update_learnings("Build with make", "build")
        toolkit.update_learnings("Run pytest with -v", "test")
        toolkit.update_learnings("Watch out for race conditions", "gotcha")
        
        learnings = state_manager.read_learnings()
        
        assert "BUILD" in learnings
        assert "TEST" in learnings
        assert "GOTCHA" in learnings
    
    def test_update_learnings_empty_content(
        self, state_manager: StateManager
    ) -> None:
        """Test error when learning content is empty."""
        toolkit = LearningsUpdaterToolKit(state_manager)
        
        result = toolkit.update_learnings(learning="", category="pattern")
        
        assert "Error" in result


# ============================================================================
# TEST: BackpressureToolKit
# ============================================================================

class TestBackpressureToolKit:
    """Tests for BackpressureToolKit."""
    
    def test_run_backpressure_pass(self, temp_workspace: Path) -> None:
        """Test running backpressure that passes."""
        gate = BackpressureGate(
            workspace=temp_workspace,
            test_command="echo success",
        )
        toolkit = BackpressureToolKit(gate)
        
        result = toolkit.run_backpressure(validation_type="test")
        
        assert "PASS" in result
    
    def test_run_backpressure_fail(self, temp_workspace: Path) -> None:
        """Test running backpressure that fails."""
        gate = BackpressureGate(
            workspace=temp_workspace,
            build_command="exit 1",
        )
        toolkit = BackpressureToolKit(gate)
        
        result = toolkit.run_backpressure(validation_type="build")
        
        assert "FAIL" in result
    
    def test_run_backpressure_all(self, temp_workspace: Path) -> None:
        """Test running all validation types."""
        gate = BackpressureGate(
            workspace=temp_workspace,
            build_command="echo build",
            test_command="echo test",
            lint_command="echo lint",
        )
        toolkit = BackpressureToolKit(gate)
        
        result = toolkit.run_backpressure(validation_type="all")
        
        assert "PASS" in result


# ============================================================================
# TEST: RalphFilesystemToolKit
# ============================================================================

class TestRalphFilesystemToolKit:
    """Tests for RalphFilesystemToolKit."""
    
    def test_read_file(self, temp_workspace: Path) -> None:
        """Test reading a file."""
        # Create test file
        test_file = temp_workspace / "test.txt"
        test_file.write_text("Line 1\nLine 2\nLine 3")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.read_file("test.txt")
        
        assert "Line 1" in result
        assert "Line 2" in result
        assert "Line 3" in result
        # Check line numbers present
        assert "1|" in result or "     1|" in result
    
    def test_read_file_with_offset_limit(self, temp_workspace: Path) -> None:
        """Test reading file with offset and limit."""
        test_file = temp_workspace / "test.txt"
        test_file.write_text("Line 1\nLine 2\nLine 3\nLine 4\nLine 5")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.read_file("test.txt", offset=1, limit=2)
        
        assert "Line 2" in result
        assert "Line 3" in result
        assert "Line 1" not in result
        assert "Line 4" not in result
    
    def test_read_file_not_found(self, temp_workspace: Path) -> None:
        """Test reading nonexistent file."""
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.read_file("nonexistent.txt")
        
        assert "Error" in result
        assert "not found" in result
    
    def test_read_file_outside_workspace(self, temp_workspace: Path) -> None:
        """Test that reading outside workspace fails."""
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.read_file("/etc/passwd")
        
        assert "Error" in result
        assert "outside workspace" in result
    
    def test_write_file(self, temp_workspace: Path) -> None:
        """Test writing a file."""
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.write_file("new_file.txt", "Hello World!")
        
        assert "Successfully wrote" in result
        assert (temp_workspace / "new_file.txt").read_text() == "Hello World!"
    
    def test_write_file_creates_dirs(self, temp_workspace: Path) -> None:
        """Test writing file creates parent directories."""
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.write_file("deep/nested/dir/file.txt", "Content")
        
        assert "Successfully" in result
        assert (temp_workspace / "deep/nested/dir/file.txt").exists()
    
    def test_edit_file(self, temp_workspace: Path) -> None:
        """Test editing a file."""
        test_file = temp_workspace / "edit_me.txt"
        test_file.write_text("Hello World!")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.edit_file("edit_me.txt", "World", "Universe")
        
        assert "Replaced 1" in result
        assert test_file.read_text() == "Hello Universe!"
    
    def test_edit_file_replace_all(self, temp_workspace: Path) -> None:
        """Test editing file with replace_all."""
        test_file = temp_workspace / "edit_me.txt"
        test_file.write_text("foo bar foo baz foo")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.edit_file(
            "edit_me.txt", "foo", "qux", replace_all=True
        )
        
        assert "Replaced 3" in result
        assert test_file.read_text() == "qux bar qux baz qux"
    
    def test_edit_file_not_found(self, temp_workspace: Path) -> None:
        """Test editing nonexistent file."""
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.edit_file("nofile.txt", "old", "new")
        
        assert "Error" in result
        assert "not found" in result
    
    def test_edit_file_string_not_found(self, temp_workspace: Path) -> None:
        """Test editing file when string not found."""
        test_file = temp_workspace / "test.txt"
        test_file.write_text("Hello World")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.edit_file("test.txt", "nonexistent", "new")
        
        assert "Error" in result
        assert "not found" in result
    
    def test_list_files(self, temp_workspace: Path) -> None:
        """Test listing files in directory."""
        # Create some files and dirs
        (temp_workspace / "file1.txt").write_text("content")
        (temp_workspace / "file2.py").write_text("content")
        (temp_workspace / "subdir").mkdir()
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.list_files(".")
        
        assert "[FILE] file1.txt" in result
        assert "[FILE] file2.py" in result
        assert "[DIR]  subdir/" in result
    
    def test_list_files_recursive(self, temp_workspace: Path) -> None:
        """Test recursive file listing."""
        (temp_workspace / "file1.txt").write_text("content")
        (temp_workspace / "subdir").mkdir()
        (temp_workspace / "subdir/file2.txt").write_text("content")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.list_files(".", recursive=True)
        
        assert "file1.txt" in result
        assert "file2.txt" in result
    
    def test_list_files_excludes_node_modules(
        self, temp_workspace: Path
    ) -> None:
        """Test that node_modules is excluded in recursive listing."""
        (temp_workspace / "node_modules").mkdir()
        (temp_workspace / "node_modules/package").mkdir()
        (temp_workspace / "node_modules/package/index.js").write_text("js")
        (temp_workspace / "src").mkdir()
        (temp_workspace / "src/app.js").write_text("app")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.list_files(".", recursive=True)
        
        assert "app.js" in result
        assert "node_modules" not in result
    
    def test_search_files(self, temp_workspace: Path) -> None:
        """Test searching for files by pattern."""
        (temp_workspace / "file1.py").write_text("content")
        (temp_workspace / "file2.py").write_text("content")
        (temp_workspace / "file3.txt").write_text("content")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.search_files("*.py", ".")
        
        assert "file1.py" in result
        assert "file2.py" in result
        assert "file3.txt" not in result
    
    def test_search_files_excludes_node_modules(
        self, temp_workspace: Path
    ) -> None:
        """Test that search excludes node_modules."""
        (temp_workspace / "src").mkdir()
        (temp_workspace / "src/app.js").write_text("app")
        (temp_workspace / "node_modules").mkdir()
        (temp_workspace / "node_modules/lib.js").write_text("lib")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.search_files("*.js", ".")
        
        assert "app.js" in result
        assert "lib.js" not in result
    
    def test_grep_files(self, temp_workspace: Path) -> None:
        """Test grepping for text in files."""
        (temp_workspace / "file1.py").write_text("def hello():\n    print('world')")
        (temp_workspace / "file2.py").write_text("x = 1\ny = 2")
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.grep_files("hello", ".", "*.py")
        
        assert "file1.py" in result
        assert "def hello" in result
        assert "file2.py" not in result
    
    def test_grep_files_regex(self, temp_workspace: Path) -> None:
        """Test grepping with regex pattern."""
        (temp_workspace / "test.py").write_text(
            "foo123\nbar456\nbaz789"
        )
        
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.grep_files(r"\d{3}", ".", "*.py")
        
        assert "foo123" in result or "123" in result
    
    def test_run_command(self, temp_workspace: Path) -> None:
        """Test running shell command."""
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.run_command("echo 'Hello World'")
        
        assert "Hello World" in result
        assert "Exit code: 0" in result
    
    def test_run_command_captures_stderr(self, temp_workspace: Path) -> None:
        """Test that stderr is captured."""
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.run_command("echo 'error' >&2")
        
        assert "STDERR" in result
        assert "error" in result
    
    def test_run_command_timeout(self, temp_workspace: Path) -> None:
        """Test command timeout."""
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        result = toolkit.run_command("sleep 10", timeout=1)
        
        assert "timed out" in result


# ============================================================================
# TEST: SubagentSpawnerToolKit
# ============================================================================

class TestSubagentSpawnerToolKit:
    """Tests for SubagentSpawnerToolKit."""
    
    def test_truncate_result_short(self, temp_workspace: Path) -> None:
        """Test that short results are not truncated."""
        state = RalphState(workspace_path=temp_workspace)
        toolkit = SubagentSpawnerToolKit(
            model="test-model",
            workspace=temp_workspace,
            state=state,
            max_result_length=100,
        )
        
        short_result = "Short result"
        truncated = toolkit._truncate_result(short_result)
        
        assert truncated == short_result
    
    def test_truncate_result_long(self, temp_workspace: Path) -> None:
        """Test that long results are truncated."""
        state = RalphState(workspace_path=temp_workspace)
        toolkit = SubagentSpawnerToolKit(
            model="test-model",
            workspace=temp_workspace,
            state=state,
            max_result_length=50,
        )
        
        long_result = "x" * 100
        truncated = toolkit._truncate_result(long_result)
        
        assert len(truncated) < len(long_result)
        assert "truncated" in truncated
    
    def test_get_context_summary_no_state(self, temp_workspace: Path) -> None:
        """Test context summary when state is None."""
        toolkit = SubagentSpawnerToolKit(
            model="test-model",
            workspace=temp_workspace,
            state=None,
        )
        
        summary = toolkit._get_context_summary()
        
        assert "No project context" in summary
    
    def test_get_context_summary_with_specs(
        self, temp_workspace: Path, sample_specs: Dict[str, str]
    ) -> None:
        """Test context summary with specs."""
        state = RalphState(specs=sample_specs, workspace_path=temp_workspace)
        toolkit = SubagentSpawnerToolKit(
            model="test-model",
            workspace=temp_workspace,
            state=state,
        )
        
        summary = toolkit._get_context_summary()
        
        assert "Specs available" in summary
        assert "auth" in summary or "api" in summary
    
    def test_create_subagent_tools(self, temp_workspace: Path) -> None:
        """Test that subagent tools include filesystem toolkit."""
        state = RalphState(workspace_path=temp_workspace)
        toolkit = SubagentSpawnerToolKit(
            model="test-model",
            workspace=temp_workspace,
            state=state,
        )
        
        tools = toolkit._create_subagent_tools()
        
        assert len(tools) == 1
        assert isinstance(tools[0], RalphFilesystemToolKit)


# ============================================================================
# TEST: IterationResult & IterationRecord
# ============================================================================

class TestIterationResult:
    """Tests for IterationResult from incremental phase."""
    
    def test_iteration_result_defaults(self) -> None:
        """Test IterationResult with defaults."""
        result = IterationResult(iteration=1)
        
        assert result.iteration == 1
        assert result.task_picked == ""
        assert result.success is False
        assert result.backpressure_passed is False
        assert result.execution_time == 0.0
        assert result.plan_is_empty is False
    
    def test_iteration_result_to_dict(self) -> None:
        """Test IterationResult to_dict."""
        result = IterationResult(
            iteration=5,
            task_picked="Implement auth",
            success=True,
            backpressure_passed=True,
            message="Task completed",
            execution_time=10.5,
            plan_is_empty=False,
        )
        
        d = result.to_dict()
        
        assert d["iteration"] == 5
        assert d["task_picked"] == "Implement auth"
        assert d["success"] is True
        assert d["execution_time"] == 10.5


class TestIterationRecord:
    """Tests for IterationRecord model."""
    
    def test_record_creation(self) -> None:
        """Test creating IterationRecord."""
        record = IterationRecord(
            iteration=3,
            task_picked="Create API endpoints",
            success=True,
            backpressure_passed=True,
            message="Completed successfully",
            execution_time=25.3,
            learnings_added=["Use async", "Cache results"],
        )
        
        assert record.iteration == 3
        assert record.task_picked == "Create API endpoints"
        assert record.success is True
        assert len(record.learnings_added) == 2
    
    def test_record_to_dict(self) -> None:
        """Test IterationRecord to_dict."""
        record = IterationRecord(
            iteration=1,
            task_picked="Task",
            success=True,
        )
        
        d = record.to_dict()
        
        assert d["iteration"] == 1
        assert d["task_picked"] == "Task"
        assert d["success"] is True


# ============================================================================
# TEST: RalphLoopResult
# ============================================================================

class TestRalphLoopResult:
    """Tests for RalphLoopResult model."""
    
    def test_result_creation(self, temp_workspace: Path) -> None:
        """Test creating RalphLoopResult."""
        result = RalphLoopResult(
            goal="Build API",
            workspace=temp_workspace,
            start_time=datetime.now(),
        )
        
        assert result.goal == "Build API"
        assert result.total_iterations == 0
        assert result.final_status == "completed"
    
    def test_duration(self) -> None:
        """Test duration calculation."""
        start = datetime.now()
        end = start + timedelta(seconds=100)
        
        result = RalphLoopResult(
            goal="Test",
            start_time=start,
            end_time=end,
        )
        
        assert result.duration() == pytest.approx(100.0, abs=1)
    
    def test_duration_no_times(self) -> None:
        """Test duration when times not set."""
        result = RalphLoopResult(goal="Test")
        
        assert result.duration() == 0.0
    
    def test_success_rate(self) -> None:
        """Test success rate calculation."""
        result = RalphLoopResult(
            goal="Test",
            total_iterations=10,
            successful_iterations=7,
            failed_iterations=3,
        )
        
        assert result.success_rate() == pytest.approx(70.0)
    
    def test_success_rate_no_iterations(self) -> None:
        """Test success rate with no iterations."""
        result = RalphLoopResult(goal="Test")
        
        assert result.success_rate() == 0.0
    
    def test_add_iteration(self) -> None:
        """Test adding iteration records."""
        result = RalphLoopResult(goal="Test")
        
        record1 = IterationRecord(iteration=1, success=True)
        record2 = IterationRecord(iteration=2, success=False)
        record3 = IterationRecord(iteration=3, success=True)
        
        result.add_iteration(record1)
        result.add_iteration(record2)
        result.add_iteration(record3)
        
        assert result.total_iterations == 3
        assert result.successful_iterations == 2
        assert result.failed_iterations == 1
        assert len(result.iterations) == 3
    
    def test_summary(self, temp_workspace: Path) -> None:
        """Test summary generation."""
        result = RalphLoopResult(
            goal="Build a REST API",
            workspace=temp_workspace,
            total_iterations=5,
            successful_iterations=4,
            failed_iterations=1,
            final_status="completed",
            specs_generated=["auth", "api"],
            start_time=datetime.now(),
            end_time=datetime.now() + timedelta(seconds=120),
        )
        
        summary = result.summary()
        
        assert "RalphLoop Execution Summary" in summary
        assert "Build a REST API" in summary
        assert "COMPLETED" in summary
        assert "Total Iterations: 5" in summary
        assert "Successful: 4" in summary
        assert "80.0%" in summary
        assert "auth" in summary
        assert "api" in summary
    
    def test_to_dict(self, temp_workspace: Path) -> None:
        """Test to_dict serialization."""
        start = datetime.now()
        end = start + timedelta(seconds=60)
        
        result = RalphLoopResult(
            goal="Test Goal",
            workspace=temp_workspace,
            total_iterations=3,
            successful_iterations=2,
            failed_iterations=1,
            final_status="max_iterations",
            start_time=start,
            end_time=end,
            specs_generated=["spec1"],
        )
        
        d = result.to_dict()
        
        assert d["goal"] == "Test Goal"
        assert d["total_iterations"] == 3
        assert d["final_status"] == "max_iterations"
        assert d["duration"] == pytest.approx(60.0, abs=1)
        assert d["success_rate"] == pytest.approx(66.67, abs=1)


# ============================================================================
# TEST: RalphLoop
# ============================================================================

class TestRalphLoop:
    """Tests for RalphLoop orchestrator."""
    
    def test_loop_creation_minimal(self) -> None:
        """Test creating RalphLoop with minimal args."""
        loop = RalphLoop(goal="Build something")
        
        assert loop.goal == "Build something"
        assert loop.model == "openai/gpt-4o"
        assert loop.is_running is False
    
    def test_loop_creation_full(self, temp_workspace: Path) -> None:
        """Test creating RalphLoop with all args."""
        loop = RalphLoop(
            goal="Build REST API",
            model="openai/gpt-4.1",
            workspace=temp_workspace,
            test_command="pytest",
            build_command="make build",
            lint_command="ruff",
            max_iterations=5,
            show_progress=False,
        )
        
        assert loop.goal == "Build REST API"
        assert loop.model == "openai/gpt-4.1"
        assert loop.workspace == temp_workspace
        assert loop.config.max_iterations == 5
    
    def test_loop_config_is_set(self, temp_workspace: Path) -> None:
        """Test that config is properly set."""
        loop = RalphLoop(
            goal="Test",
            workspace=temp_workspace,
            test_command="pytest",
        )
        
        assert loop.config.goal == "Test"
        assert "pytest" in loop.config.test_command
    
    def test_loop_state_manager_is_set(self, temp_workspace: Path) -> None:
        """Test that state_manager is created."""
        loop = RalphLoop(goal="Test", workspace=temp_workspace)
        
        assert loop.state_manager is not None
        assert loop.state_manager.workspace == temp_workspace
    
    def test_loop_backpressure_gate_is_set(self, temp_workspace: Path) -> None:
        """Test that backpressure_gate is created."""
        loop = RalphLoop(
            goal="Test",
            workspace=temp_workspace,
            test_command="pytest",
        )
        
        assert loop.backpressure_gate is not None
        assert loop.backpressure_gate.has_validations() is True
    
    def test_loop_stop(self, temp_workspace: Path) -> None:
        """Test stop method."""
        loop = RalphLoop(goal="Test", workspace=temp_workspace)
        
        loop.stop()
        
        assert loop._should_stop is True
    
    def test_loop_get_state_empty(self, temp_workspace: Path) -> None:
        """Test get_state on fresh loop."""
        loop = RalphLoop(
            goal="Test Goal",
            workspace=temp_workspace,
            show_progress=False,
        )
        
        state = loop.get_state()
        
        assert state["is_running"] is False
        assert state["goal"] == "Test Goal"
        assert state["workspace"] == str(temp_workspace)
        assert state["specs"] == []
        assert state["todo_items"] == []
        assert state["has_learnings"] is False
    
    def test_loop_get_state_with_content(self, temp_workspace: Path) -> None:
        """Test get_state with populated state files."""
        loop = RalphLoop(goal="Test", workspace=temp_workspace)
        
        # Populate state
        loop.state_manager.save_spec("auth", "# Auth")
        loop.state_manager.update_fix_plan("- Task 1\n- Task 2")
        loop.state_manager.update_learnings("## PATTERN\n- Learning")
        
        state = loop.get_state()
        
        assert "auth" in state["specs"]
        assert len(state["todo_items"]) == 2
        assert state["has_learnings"] is True
    
    def test_loop_with_predefined_specs(self, temp_workspace: Path) -> None:
        """Test loop with pre-defined specs skips requirements phase."""
        specs = {
            "auth": "# Auth Spec",
            "api": "# API Spec",
        }
        
        loop = RalphLoop(
            goal="Test",
            workspace=temp_workspace,
            specs=specs,
            show_progress=False,
        )
        
        # Specs should be saved during requirements phase
        success = loop._run_requirements_phase()
        
        assert success is True
        assert loop.state_manager.has_specs() is True
        
        state = loop.state_manager.load_state()
        assert "auth" in state.specs
        assert "api" in state.specs


# ============================================================================
# TEST: PhaseResult
# ============================================================================

class TestPhaseResult:
    """Tests for PhaseResult dataclass."""
    
    def test_phase_result_success(self) -> None:
        """Test successful PhaseResult."""
        result = PhaseResult(
            phase_name="requirements",
            success=True,
            message="Generated 3 specs",
            data={"specs": ["auth", "api", "db"]},
        )
        
        assert result.phase_name == "requirements"
        assert result.success is True
        assert result.message == "Generated 3 specs"
        assert result.data["specs"] == ["auth", "api", "db"]
        assert result.errors == []
    
    def test_phase_result_failure(self) -> None:
        """Test failed PhaseResult."""
        result = PhaseResult(
            phase_name="todo",
            success=False,
            message="Failed to generate TODO list",
            errors=["API error", "Timeout"],
        )
        
        assert result.success is False
        assert len(result.errors) == 2


# ============================================================================
# TEST: IncrementalPhase
# ============================================================================

class TestIncrementalPhase:
    """Tests for IncrementalPhase."""
    
    def test_phase_name(self, state_manager: StateManager) -> None:
        """Test phase name property."""
        gate = BackpressureGate(workspace=state_manager.workspace)
        phase = IncrementalPhase(
            state_manager=state_manager,
            model="test-model",
            backpressure_gate=gate,
        )
        
        assert phase.name == "incremental"
    
    def test_execute_iteration_empty_plan(
        self, state_manager: StateManager
    ) -> None:
        """Test iteration when plan is empty."""
        # Don't set any fix_plan content
        gate = BackpressureGate(workspace=state_manager.workspace)
        phase = IncrementalPhase(
            state_manager=state_manager,
            model="test-model",
            backpressure_gate=gate,
        )
        
        result = phase.execute_iteration()
        
        assert result.success is True
        assert result.plan_is_empty is True
        assert "All tasks completed" in result.message
    
    def test_reset_iteration_count(self, state_manager: StateManager) -> None:
        """Test reset_iteration_count method."""
        gate = BackpressureGate(workspace=state_manager.workspace)
        phase = IncrementalPhase(
            state_manager=state_manager,
            model="test-model",
            backpressure_gate=gate,
        )
        
        phase._current_iteration = 10
        phase.reset_iteration_count()
        
        assert phase._current_iteration == 0
    
    def test_create_tools(self, state_manager: StateManager) -> None:
        """Test _create_tools method."""
        gate = BackpressureGate(
            workspace=state_manager.workspace,
            test_command="echo test",
        )
        phase = IncrementalPhase(
            state_manager=state_manager,
            model="test-model",
            backpressure_gate=gate,
        )
        
        state = state_manager.load_state()
        tools = phase._create_tools(state)
        
        # Should have: PlanUpdater, LearningsUpdater, Backpressure, 
        # Filesystem, SubagentSpawner
        assert len(tools) == 5
        
        tool_types = [type(t).__name__ for t in tools]
        assert "PlanUpdaterToolKit" in tool_types
        assert "LearningsUpdaterToolKit" in tool_types
        assert "BackpressureToolKit" in tool_types
        assert "RalphFilesystemToolKit" in tool_types
        assert "SubagentSpawnerToolKit" in tool_types


# ============================================================================
# INTEGRATION TESTS
# ============================================================================

class TestRalphIntegration:
    """Integration tests for Ralph components working together."""
    
    def test_state_roundtrip(
        self, state_manager: StateManager, sample_specs: Dict[str, str]
    ) -> None:
        """Test saving and loading complete state."""
        # Save all state components
        state_manager.save_prompt("# Project Prompt")
        for name, content in sample_specs.items():
            state_manager.save_spec(name, content)
        state_manager.update_fix_plan("- Task 1\n- Task 2")
        state_manager.update_learnings("## PATTERN\n- Learning 1")
        
        # Load and verify
        state = state_manager.load_state()
        
        assert state.prompt == "# Project Prompt"
        assert len(state.specs) == 3
        assert len(state.get_todo_items()) == 2
        assert "Learning 1" in state.learnings
    
    def test_plan_updater_integration(
        self, state_manager: StateManager
    ) -> None:
        """Test PlanUpdaterToolKit with StateManager."""
        toolkit = PlanUpdaterToolKit(state_manager)
        
        # Add tasks
        toolkit.update_fix_plan(action="add", item="Task 1")
        toolkit.update_fix_plan(action="add", item="Task 2")
        toolkit.update_fix_plan(action="add", item="Task 3")
        
        state = state_manager.load_state()
        assert len(state.get_todo_items()) == 3
        
        # Remove a task
        toolkit.update_fix_plan(action="delete", item="Task 2")
        
        state = state_manager.load_state()
        assert len(state.get_todo_items()) == 2
        assert "Task 2" not in state.fix_plan
    
    def test_backpressure_with_filesystem(
        self, temp_workspace: Path
    ) -> None:
        """Test backpressure with filesystem operations."""
        # Create a simple shell script (more portable than python)
        (temp_workspace / "test.sh").write_text("echo hello")
        
        # Run backpressure that uses shell
        gate = BackpressureGate(
            workspace=temp_workspace,
            build_command=f"sh {temp_workspace}/test.sh",
        )
        
        result = gate.validate(validation_type="build")
        
        assert result.passed is True
        assert "hello" in result.results[0].stdout
    
    def test_filesystem_and_grep_integration(
        self, temp_workspace: Path
    ) -> None:
        """Test filesystem operations together."""
        toolkit = RalphFilesystemToolKit(temp_workspace)
        
        # Write files
        toolkit.write_file("src/module.py", "def process_data():\n    return 'processed'")
        toolkit.write_file("src/utils.py", "def helper():\n    return True")
        
        # Search for files
        search_result = toolkit.search_files("*.py", "src")
        assert "module.py" in search_result
        assert "utils.py" in search_result
        
        # Grep for content
        grep_result = toolkit.grep_files("def ", "src", "*.py")
        assert "process_data" in grep_result
        assert "helper" in grep_result
        
        # Edit file
        edit_result = toolkit.edit_file(
            "src/module.py", "processed", "transformed"
        )
        assert "Replaced 1" in edit_result
        
        # Verify edit
        read_result = toolkit.read_file("src/module.py")
        assert "transformed" in read_result


# ============================================================================
# RUN TESTS
# ============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
