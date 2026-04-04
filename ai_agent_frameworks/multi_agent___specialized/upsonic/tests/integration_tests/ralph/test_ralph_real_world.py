"""
Real-World Integration Tests for RalphLoop Implementation.

NO MOCKS! All tests use real file operations, real commands, and real tool executions.
This file tests the Ralph architecture in actual usage scenarios.

Each test creates real files, executes real commands, and verifies real outcomes.
"""

import os
import shutil
import subprocess
import tempfile
from pathlib import Path
from datetime import datetime
from typing import Dict, List

import pytest

# ============================================================================
# IMPORTS - Real Ralph components (no mocks)
# ============================================================================

from upsonic.ralph.config import RalphConfig
from upsonic.ralph.state.models import RalphState
from upsonic.ralph.state.manager import StateManager
from upsonic.ralph.backpressure.gate import BackpressureGate
from upsonic.ralph.tools.plan_updater import PlanUpdaterToolKit
from upsonic.ralph.tools.learnings_updater import LearningsUpdaterToolKit
from upsonic.ralph.tools.backpressure import BackpressureToolKit
from upsonic.ralph.tools.filesystem import RalphFilesystemToolKit
from upsonic.ralph.tools.subagent_spawner import SubagentSpawnerToolKit
from upsonic.ralph.phases.incremental import IncrementalPhase, IterationResult
from upsonic.ralph.result import IterationRecord, RalphLoopResult
from upsonic.ralph.loop import RalphLoop


# ============================================================================
# REAL WORKSPACE FIXTURE
# ============================================================================

@pytest.fixture
def real_workspace() -> Path:
    """
    Create a real temporary workspace with actual directory structure.
    This is NOT a mock - it creates real files on disk.
    """
    workspace = Path(tempfile.mkdtemp(prefix="ralph_realworld_"))
    
    # Create real directory structure
    (workspace / "src").mkdir()
    (workspace / "tests").mkdir()
    (workspace / "specs").mkdir()
    (workspace / "docs").mkdir()
    
    yield workspace
    
    # Real cleanup
    if workspace.exists():
        shutil.rmtree(workspace)


@pytest.fixture
def populated_workspace(real_workspace: Path) -> Path:
    """
    Create a workspace with real source files for testing.
    """
    # Create real Python files
    (real_workspace / "src" / "__init__.py").write_text("")
    (real_workspace / "src" / "main.py").write_text('''"""Main application module."""

def main():
    """Entry point for the application."""
    print("Hello from Ralph!")
    return 0

def calculate_sum(a: int, b: int) -> int:
    """Calculate sum of two integers."""
    return a + b

def calculate_product(a: int, b: int) -> int:
    """Calculate product of two integers."""
    return a * b

if __name__ == "__main__":
    main()
''')
    
    (real_workspace / "src" / "utils.py").write_text('''"""Utility functions."""

import os
from pathlib import Path

def get_project_root() -> Path:
    """Get the project root directory."""
    return Path(__file__).parent.parent

def read_config(config_path: str) -> dict:
    """Read configuration from file."""
    # Placeholder implementation
    return {"debug": False, "version": "1.0.0"}

def format_output(data: dict) -> str:
    """Format data for output."""
    lines = []
    for key, value in data.items():
        lines.append(f"{key}: {value}")
    return "\\n".join(lines)
''')
    
    (real_workspace / "src" / "models.py").write_text('''"""Data models."""

from dataclasses import dataclass
from typing import Optional, List

@dataclass
class User:
    """User model."""
    id: int
    name: str
    email: str
    active: bool = True

@dataclass  
class Task:
    """Task model."""
    id: int
    title: str
    description: str
    completed: bool = False
    assignee: Optional[User] = None

@dataclass
class Project:
    """Project model."""
    id: int
    name: str
    tasks: List[Task] = None
    
    def __post_init__(self):
        if self.tasks is None:
            self.tasks = []
''')
    
    # Create real test file
    (real_workspace / "tests" / "__init__.py").write_text("")
    (real_workspace / "tests" / "test_main.py").write_text('''"""Tests for main module."""

import pytest
from src.main import calculate_sum, calculate_product

def test_calculate_sum():
    """Test sum calculation."""
    assert calculate_sum(2, 3) == 5
    assert calculate_sum(-1, 1) == 0
    assert calculate_sum(0, 0) == 0

def test_calculate_product():
    """Test product calculation."""
    assert calculate_product(2, 3) == 6
    assert calculate_product(-1, 1) == -1
    assert calculate_product(0, 5) == 0
''')
    
    # Create real config file
    (real_workspace / "config.json").write_text('''{
    "app_name": "RalphTestApp",
    "version": "1.0.0",
    "debug": true,
    "database": {
        "host": "localhost",
        "port": 5432,
        "name": "testdb"
    }
}''')
    
    # Create real requirements file
    (real_workspace / "requirements.txt").write_text('''pytest>=7.0.0
pydantic>=2.0.0
requests>=2.28.0
''')
    
    # Create real README
    (real_workspace / "README.md").write_text('''# Ralph Test Project

This is a real test project for Ralph integration testing.

## Installation

```bash
pip install -r requirements.txt
```

## Running Tests

```bash
pytest tests/
```
''')
    
    return real_workspace


# ============================================================================
# REAL-WORLD FILESYSTEM TOOL TESTS
# ============================================================================

class TestRealFilesystemTools:
    """Real-world tests for RalphFilesystemToolKit - NO MOCKS."""
    
    def test_real_read_file_python_source(self, populated_workspace: Path) -> None:
        """Read a real Python source file from disk."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        # Read actual file
        result = toolkit.read_file("src/main.py")
        
        # Verify real content
        assert "def main():" in result
        assert "calculate_sum" in result
        assert "calculate_product" in result
        assert "Hello from Ralph!" in result
        
        # Verify line numbers are present
        assert "|" in result
    
    def test_real_read_file_with_line_range(self, populated_workspace: Path) -> None:
        """Read specific lines from a real file."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        # Read lines 5-10 of main.py (0-indexed offset=4 means start at line 5)
        result = toolkit.read_file("src/main.py", offset=4, limit=6)
        
        # Verify we got a subset of lines
        assert "Showing lines" in result  # Should indicate partial read
        # First lines (module docstring) should not be present
        assert "Main application module" not in result
        # But some code should be present
        assert "return" in result or "def" in result
    
    def test_real_write_file_new_module(self, real_workspace: Path) -> None:
        """Write a real new Python module to disk."""
        toolkit = RalphFilesystemToolKit(real_workspace)
        
        new_code = '''"""New module created by Ralph."""

class NewClass:
    """A new class."""
    
    def __init__(self, name: str):
        self.name = name
    
    def greet(self) -> str:
        return f"Hello, {self.name}!"
'''
        
        result = toolkit.write_file("src/new_module.py", new_code)
        
        # Verify write succeeded
        assert "Successfully wrote" in result
        
        # Verify file exists and has correct content
        new_file = real_workspace / "src" / "new_module.py"
        assert new_file.exists()
        content = new_file.read_text()
        assert "class NewClass:" in content
        assert "def greet" in content
    
    def test_real_write_file_nested_directories(self, real_workspace: Path) -> None:
        """Write file to deeply nested directories that don't exist."""
        toolkit = RalphFilesystemToolKit(real_workspace)
        
        result = toolkit.write_file(
            "deep/nested/path/module.py",
            "# Deep module\nprint('deep')"
        )
        
        assert "Successfully wrote" in result
        
        # Verify entire path was created
        deep_file = real_workspace / "deep" / "nested" / "path" / "module.py"
        assert deep_file.exists()
        assert deep_file.read_text() == "# Deep module\nprint('deep')"
    
    def test_real_edit_file_single_replacement(self, populated_workspace: Path) -> None:
        """Edit a real file by replacing a single occurrence."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        # Read original content
        original = (populated_workspace / "src" / "main.py").read_text()
        assert "Hello from Ralph!" in original
        
        # Edit the file
        result = toolkit.edit_file(
            "src/main.py",
            "Hello from Ralph!",
            "GREETINGS FROM RALPH!"
        )
        
        assert "Replaced 1" in result
        
        # Verify edit was applied
        modified = (populated_workspace / "src" / "main.py").read_text()
        assert "GREETINGS FROM RALPH!" in modified
        assert "Hello from Ralph!" not in modified
    
    def test_real_edit_file_multiple_replacements(self, populated_workspace: Path) -> None:
        """Edit a real file replacing all occurrences."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        # Count original occurrences of "int"
        original = (populated_workspace / "src" / "main.py").read_text()
        original_count = original.count("int")
        assert original_count >= 4  # At least 4 uses of int
        
        # Replace all "int" with "integer"
        result = toolkit.edit_file(
            "src/main.py",
            "int",
            "integer",
            replace_all=True
        )
        
        assert f"Replaced {original_count}" in result
        
        # Verify all replaced
        modified = (populated_workspace / "src" / "main.py").read_text()
        assert modified.count("integer") == original_count
        # Note: "int" might still appear in other contexts
    
    def test_real_list_files_directory(self, populated_workspace: Path) -> None:
        """List real files in a directory."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.list_files("src")
        
        # Verify real files are listed
        assert "[FILE] main.py" in result
        assert "[FILE] utils.py" in result
        assert "[FILE] models.py" in result
        assert "[FILE] __init__.py" in result
        assert "Total:" in result
    
    def test_real_list_files_recursive(self, populated_workspace: Path) -> None:
        """List real files recursively."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.list_files(".", recursive=True)
        
        # Should include files from multiple directories
        assert "main.py" in result
        assert "test_main.py" in result
        assert "config.json" in result
        assert "README.md" in result
    
    def test_real_search_files_python(self, populated_workspace: Path) -> None:
        """Search for real Python files."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.search_files("*.py", ".")
        
        # Should find all Python files
        assert "main.py" in result
        assert "utils.py" in result
        assert "models.py" in result
        assert "test_main.py" in result
    
    def test_real_search_files_by_pattern(self, populated_workspace: Path) -> None:
        """Search for files matching specific patterns."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        # Search for test files
        result = toolkit.search_files("test_*.py", ".")
        
        assert "test_main.py" in result
        # Check that src/main.py is NOT in the result (only test files)
        assert "src/main.py" not in result
    
    def test_real_grep_find_function_definitions(self, populated_workspace: Path) -> None:
        """Grep for function definitions in real code."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.grep_files("def ", "src", "*.py")
        
        # Should find all function definitions
        assert "calculate_sum" in result
        assert "calculate_product" in result
        assert "get_project_root" in result
        assert "read_config" in result
    
    def test_real_grep_find_class_definitions(self, populated_workspace: Path) -> None:
        """Grep for class definitions in real code."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.grep_files("class ", "src", "*.py")
        
        # Should find all classes
        assert "User" in result
        assert "Task" in result
        assert "Project" in result
    
    def test_real_grep_find_imports(self, populated_workspace: Path) -> None:
        """Grep for import statements in real code."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.grep_files("^import|^from", "src", "*.py")
        
        # Should find imports
        assert "dataclass" in result or "Path" in result
    
    def test_real_grep_regex_pattern(self, populated_workspace: Path) -> None:
        """Grep using regex pattern."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        # Find all dataclass decorators
        result = toolkit.grep_files(r"@dataclass", "src", "*.py")
        
        assert "models.py" in result
    
    def test_real_run_command_echo(self, populated_workspace: Path) -> None:
        """Run a real echo command."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.run_command("echo 'Real command execution!'")
        
        assert "Real command execution!" in result
        assert "Exit code: 0" in result
    
    def test_real_run_command_ls(self, populated_workspace: Path) -> None:
        """Run a real ls command."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.run_command("ls -la src/")
        
        # Should list files
        assert "main.py" in result
        assert "utils.py" in result
        assert "Exit code: 0" in result
    
    def test_real_run_command_cat(self, populated_workspace: Path) -> None:
        """Run a real cat command to read file."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.run_command("cat README.md")
        
        assert "Ralph Test Project" in result
        assert "Exit code: 0" in result
    
    def test_real_run_command_python(self, populated_workspace: Path) -> None:
        """Run a real Python command."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.run_command("python3 -c \"print('Python works!')\"")
        
        assert "Python works!" in result
        assert "Exit code: 0" in result
    
    def test_real_run_command_wc(self, populated_workspace: Path) -> None:
        """Run a real word count command."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.run_command("wc -l src/main.py")
        
        # Should show line count
        assert "Exit code: 0" in result
        # Line count will be present
    
    def test_real_run_command_grep(self, populated_workspace: Path) -> None:
        """Run a real grep command."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.run_command("grep -r 'def ' src/")
        
        assert "calculate_sum" in result
        assert "calculate_product" in result
    
    def test_real_run_command_failing(self, populated_workspace: Path) -> None:
        """Run a command that fails."""
        toolkit = RalphFilesystemToolKit(populated_workspace)
        
        result = toolkit.run_command("ls /nonexistent/path/that/does/not/exist")
        
        assert "Exit code:" in result
        # Exit code should be non-zero
        assert "Exit code: 0" not in result


# ============================================================================
# REAL-WORLD STATE MANAGER TESTS
# ============================================================================

class TestRealStateManager:
    """Real-world tests for StateManager - actual file I/O."""
    
    def test_real_state_persistence_across_instances(
        self, real_workspace: Path
    ) -> None:
        """Test that state persists across multiple StateManager instances."""
        # Instance 1: Write state
        manager1 = StateManager(real_workspace)
        manager1.save_prompt("# Real Project\n\nBuilding something real.")
        manager1.save_spec("auth", "# Authentication\n\n- JWT tokens\n- OAuth")
        manager1.save_spec("api", "# API\n\n- REST endpoints\n- GraphQL")
        manager1.update_fix_plan("- Task 1: Implement auth\n- Task 2: Add API")
        manager1.append_learning("Use async for I/O", "pattern")
        
        # Delete instance
        del manager1
        
        # Instance 2: Read state (fresh instance, same workspace)
        manager2 = StateManager(real_workspace)
        state = manager2.load_state()
        
        # Verify everything persisted
        assert "Real Project" in state.prompt
        assert "auth" in state.specs
        assert "api" in state.specs
        assert "JWT tokens" in state.specs["auth"]
        assert "Task 1" in state.fix_plan
        assert "Task 2" in state.fix_plan
        assert "async for I/O" in state.learnings
    
    def test_real_fix_plan_task_workflow(self, real_workspace: Path) -> None:
        """Simulate a real task workflow: add, complete, remove."""
        manager = StateManager(real_workspace)
        
        # Add initial tasks
        manager.update_fix_plan("""- [ ] Set up project structure
- [ ] Implement user model
- [ ] Add authentication
- [ ] Create API endpoints
- [ ] Write tests""")
        
        # Verify initial state
        state = manager.load_state()
        assert len(state.get_todo_items()) == 5
        
        # Complete first task
        manager.remove_from_fix_plan("Set up project structure")
        
        state = manager.load_state()
        assert len(state.get_todo_items()) == 4
        assert "Set up project structure" not in state.fix_plan
        
        # Add a new task discovered during implementation
        manager.append_to_fix_plan("Add database migrations")
        
        state = manager.load_state()
        assert len(state.get_todo_items()) == 5
        assert "database migrations" in state.fix_plan
        
        # Complete another task
        manager.remove_from_fix_plan("Implement user model")
        
        state = manager.load_state()
        assert len(state.get_todo_items()) == 4
    
    def test_real_spec_evolution(self, real_workspace: Path) -> None:
        """Test evolving specifications over time."""
        manager = StateManager(real_workspace)
        
        # Initial spec
        manager.save_spec("api", "# API v1\n\n- GET /users")
        
        # Load and verify
        state = manager.load_state()
        assert "GET /users" in state.specs["api"]
        
        # Update spec with more endpoints
        manager.save_spec("api", """# API v2

## Endpoints

- GET /users
- POST /users
- GET /users/{id}
- PUT /users/{id}
- DELETE /users/{id}

## Authentication

All endpoints require Bearer token.
""")
        
        # Verify update
        state = manager.load_state()
        assert "POST /users" in state.specs["api"]
        assert "Bearer token" in state.specs["api"]
    
    def test_real_learnings_accumulation(self, real_workspace: Path) -> None:
        """Test accumulating learnings over multiple iterations."""
        manager = StateManager(real_workspace)
        
        # Iteration 1: Build learning
        manager.append_learning("Use 'pip install -e .' for dev install", "build")
        
        # Iteration 2: Test learning
        manager.append_learning("Run 'pytest -v' for verbose output", "test")
        
        # Iteration 3: Pattern learning
        manager.append_learning("Use dependency injection for testability", "pattern")
        
        # Iteration 4: Gotcha learning
        manager.append_learning("SQLite doesn't support concurrent writes", "gotcha")
        
        # Verify all learnings accumulated
        learnings = manager.read_learnings()
        
        assert "BUILD" in learnings
        assert "pip install -e ." in learnings
        assert "TEST" in learnings
        assert "pytest -v" in learnings
        assert "PATTERN" in learnings
        assert "dependency injection" in learnings
        assert "GOTCHA" in learnings
        assert "SQLite" in learnings


# ============================================================================
# REAL-WORLD BACKPRESSURE TESTS
# ============================================================================

class TestRealBackpressure:
    """Real-world tests for backpressure - actual command execution."""
    
    def test_real_build_command_success(self, populated_workspace: Path) -> None:
        """Test a real successful build command."""
        gate = BackpressureGate(
            workspace=populated_workspace,
            build_command="python3 -m py_compile src/main.py",
        )
        
        result = gate.validate(validation_type="build")
        
        assert result.passed is True
        assert result.results[0].returncode == 0
    
    def test_real_build_command_failure(self, real_workspace: Path) -> None:
        """Test a real failing build command with syntax error."""
        # Create a file with syntax error
        bad_file = real_workspace / "bad.py"
        bad_file.write_text("def broken(\n  # Missing closing paren")
        
        gate = BackpressureGate(
            workspace=real_workspace,
            build_command="python3 -m py_compile bad.py",
        )
        
        result = gate.validate(validation_type="build")
        
        assert result.passed is False
        assert result.results[0].returncode != 0
        assert "SyntaxError" in result.results[0].stderr or "invalid syntax" in result.results[0].stderr
    
    def test_real_lint_command(self, populated_workspace: Path) -> None:
        """Test a real lint-like command (using python -m pylint or simple check)."""
        gate = BackpressureGate(
            workspace=populated_workspace,
            lint_command="python3 -c \"import ast; ast.parse(open('src/main.py').read())\"",
        )
        
        result = gate.validate(validation_type="lint")
        
        assert result.passed is True
    
    def test_real_test_no_tests_collected(self, real_workspace: Path) -> None:
        """Test pytest with no tests - should pass due to 'no tests' detection."""
        # Create empty test directory
        (real_workspace / "tests").mkdir(exist_ok=True)
        (real_workspace / "tests" / "__init__.py").write_text("")
        
        gate = BackpressureGate(
            workspace=real_workspace,
            test_command="pytest tests/ -v",
        )
        
        result = gate.validate(validation_type="test")
        
        # Should pass because "no tests collected" is treated as pass
        assert result.passed is True
        assert result.results[0].no_tests_found is True
        
        # Verify format_for_agent shows appropriate message
        formatted = result.format_for_agent()
        assert "PASS" in formatted
        assert "no tests found" in formatted
    
    def test_real_test_with_passing_tests(self, populated_workspace: Path) -> None:
        """Test pytest with actual passing tests."""
        # The populated_workspace already has test_main.py
        # We need to add PYTHONPATH so imports work
        gate = BackpressureGate(
            workspace=populated_workspace,
            test_command="PYTHONPATH=. pytest tests/test_main.py -v",
        )
        
        result = gate.validate(validation_type="test")
        
        assert result.passed is True
        assert result.results[0].returncode == 0
        # Tests should show pass
        assert "passed" in result.results[0].stdout
    
    def test_real_test_with_failing_test(self, populated_workspace: Path) -> None:
        """Test pytest with a failing test."""
        # Add a failing test
        failing_test = populated_workspace / "tests" / "test_failing.py"
        failing_test.write_text('''"""A failing test."""

def test_this_will_fail():
    """This test intentionally fails."""
    assert 1 == 2, "One should equal two"
''')
        
        gate = BackpressureGate(
            workspace=populated_workspace,
            test_command="pytest tests/test_failing.py -v",
        )
        
        result = gate.validate(validation_type="test")
        
        assert result.passed is False
        assert result.results[0].returncode != 0
        assert "FAILED" in result.results[0].stdout or "failed" in result.results[0].stdout.lower()
    
    def test_real_all_validations_pass(self, populated_workspace: Path) -> None:
        """Test running all validations successfully."""
        gate = BackpressureGate(
            workspace=populated_workspace,
            build_command="python3 -m py_compile src/main.py",
            test_command="PYTHONPATH=. pytest tests/test_main.py -v",
            lint_command="python3 -c \"import ast; ast.parse(open('src/main.py').read())\"",
        )
        
        result = gate.validate(validation_type="all")
        
        assert result.passed is True
        assert len(result.results) == 3
        for r in result.results:
            assert r.passed is True
    
    def test_real_validation_stops_on_first_failure(
        self, populated_workspace: Path
    ) -> None:
        """Test that validation stops on first failure."""
        # Add failing test
        failing_test = populated_workspace / "tests" / "test_fail.py"
        failing_test.write_text("def test_fail(): assert False")
        
        gate = BackpressureGate(
            workspace=populated_workspace,
            build_command="echo 'build ok'",  # Will pass
            test_command="pytest tests/test_fail.py",  # Will fail
            lint_command="echo 'lint ok'",  # Won't even run
        )
        
        result = gate.validate(validation_type="all")
        
        assert result.passed is False
        # Only build and test should have run (test failed, lint skipped)
        assert len(result.results) == 2
        assert result.results[0].validation_type == "build"
        assert result.results[1].validation_type == "test"
        assert result.results[1].passed is False


# ============================================================================
# REAL-WORLD PLAN/LEARNINGS TOOLKIT TESTS
# ============================================================================

class TestRealPlanAndLearningsTools:
    """Real-world tests for PlanUpdater and LearningsUpdater toolkits."""
    
    def test_real_plan_workflow_complete_iteration(
        self, real_workspace: Path
    ) -> None:
        """Simulate a complete iteration workflow with real file I/O."""
        manager = StateManager(real_workspace)
        plan_toolkit = PlanUpdaterToolKit(manager)
        learnings_toolkit = LearningsUpdaterToolKit(manager)
        
        # Initialize plan with tasks
        plan_toolkit.update_fix_plan(
            action="replace",
            new_content="""- [ ] Create user model
- [ ] Add authentication
- [ ] Implement API endpoints
- [ ] Write documentation"""
        )
        
        # Verify initial state
        state = manager.load_state()
        assert len(state.get_todo_items()) == 4
        
        # Complete first task
        plan_toolkit.update_fix_plan(action="remove", item="Create user model")
        
        # Record learning from first task
        learnings_toolkit.update_learnings(
            learning="Use Pydantic models for validation",
            category="pattern"
        )
        
        # Verify state after iteration
        state = manager.load_state()
        assert len(state.get_todo_items()) == 3
        assert "Create user model" not in state.fix_plan
        assert "Pydantic" in state.learnings
        
        # Discover new task during implementation
        plan_toolkit.update_fix_plan(
            action="add",
            item="Add database migrations"
        )
        
        # Final state
        state = manager.load_state()
        assert len(state.get_todo_items()) == 4
        assert "database migrations" in state.fix_plan
    
    def test_real_spec_updates_via_toolkit(self, real_workspace: Path) -> None:
        """Test updating specs through toolkit."""
        manager = StateManager(real_workspace)
        toolkit = PlanUpdaterToolKit(manager)
        
        # Create initial spec
        result = toolkit.update_spec("auth", """# Authentication

## Overview
JWT-based authentication

## Endpoints
- POST /login
- POST /logout
""")
        
        assert "Updated spec" in result
        
        # Verify file was created
        spec_file = real_workspace / "specs" / "auth.md"
        assert spec_file.exists()
        assert "JWT-based" in spec_file.read_text()
        
        # Update spec
        toolkit.update_spec("auth", """# Authentication v2

## Overview
OAuth2 + JWT authentication

## Endpoints
- POST /login
- POST /logout
- POST /refresh
- POST /oauth/callback
""")
        
        # Verify update
        content = spec_file.read_text()
        assert "OAuth2" in content
        assert "/refresh" in content


# ============================================================================
# REAL-WORLD RALPH LOOP TESTS
# ============================================================================

class TestRealRalphLoop:
    """Real-world tests for RalphLoop orchestrator."""
    
    def test_real_loop_initialization(self, real_workspace: Path) -> None:
        """Test RalphLoop creates real directory structure."""
        loop = RalphLoop(
            goal="Build a REST API",
            workspace=real_workspace,
            show_progress=False,
        )
        
        # Verify real directories were created
        assert (real_workspace / "specs").exists()
        assert (real_workspace / "src").exists()
        
        # Verify state manager is working
        assert loop.state_manager.workspace == real_workspace
    
    def test_real_loop_with_predefined_specs(self, real_workspace: Path) -> None:
        """Test RalphLoop with pre-defined specs creates real files."""
        specs = {
            "auth": "# Auth Spec\n\n- JWT authentication\n- Password hashing",
            "api": "# API Spec\n\n- CRUD endpoints\n- Pagination",
            "database": "# Database Spec\n\n- PostgreSQL\n- User model",
        }
        
        loop = RalphLoop(
            goal="Build an API",
            workspace=real_workspace,
            specs=specs,
            show_progress=False,
        )
        
        # Run requirements phase (should use predefined specs)
        success = loop._run_requirements_phase()
        
        assert success is True
        
        # Verify real spec files were created
        for spec_name in specs:
            spec_file = real_workspace / "specs" / f"{spec_name}.md"
            assert spec_file.exists(), f"Spec file {spec_name}.md should exist"
        
        # Verify PROMPT.md was created
        prompt_file = real_workspace / "PROMPT.md"
        assert prompt_file.exists()
        assert "Build an API" in prompt_file.read_text()
    
    def test_real_loop_state_access(self, real_workspace: Path) -> None:
        """Test RalphLoop get_state returns real state."""
        loop = RalphLoop(
            goal="Test Goal",
            workspace=real_workspace,
            show_progress=False,
        )
        
        # Manually create some state
        loop.state_manager.save_spec("test", "# Test Spec")
        loop.state_manager.update_fix_plan("- Task 1\n- Task 2\n- Task 3")
        loop.state_manager.update_learnings("## PATTERN\n- Learning 1")
        
        # Get state
        state = loop.get_state()
        
        assert state["goal"] == "Test Goal"
        assert "test" in state["specs"]
        assert len(state["todo_items"]) == 3
        assert state["has_learnings"] is True


# ============================================================================
# REAL-WORLD INTEGRATION TESTS
# ============================================================================

class TestRealIntegration:
    """Full integration tests with real file operations."""
    
    def test_real_full_development_workflow(self, real_workspace: Path) -> None:
        """Simulate a complete development workflow with real files."""
        # Step 1: Initialize state
        manager = StateManager(real_workspace)
        manager.save_prompt("# Build a Calculator App")
        manager.save_spec("calculator", """# Calculator Spec

## Features
- Addition
- Subtraction
- Multiplication
- Division

## API
- POST /calculate with {operation, a, b}
""")
        manager.update_fix_plan("""- [ ] Create calculator module
- [ ] Add input validation
- [ ] Create API endpoint
- [ ] Add error handling
- [ ] Write tests""")
        
        # Step 2: Create filesystem toolkit and write real code
        fs_toolkit = RalphFilesystemToolKit(real_workspace)
        
        # Write calculator module
        fs_toolkit.write_file("src/calculator.py", '''"""Calculator module."""

def add(a: float, b: float) -> float:
    """Add two numbers."""
    return a + b

def subtract(a: float, b: float) -> float:
    """Subtract b from a."""
    return a - b

def multiply(a: float, b: float) -> float:
    """Multiply two numbers."""
    return a * b

def divide(a: float, b: float) -> float:
    """Divide a by b."""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
''')
        
        # Verify file was created
        calc_file = real_workspace / "src" / "calculator.py"
        assert calc_file.exists()
        
        # Step 3: Update plan - mark task complete
        plan_toolkit = PlanUpdaterToolKit(manager)
        plan_toolkit.update_fix_plan(action="remove", item="Create calculator module")
        
        # Step 4: Record learning
        learnings_toolkit = LearningsUpdaterToolKit(manager)
        learnings_toolkit.update_learnings(
            "Use type hints for clarity",
            category="pattern"
        )
        
        # Step 5: Run backpressure (verify code compiles)
        gate = BackpressureGate(
            workspace=real_workspace,
            build_command="python3 -m py_compile src/calculator.py",
        )
        result = gate.validate(validation_type="build")
        assert result.passed is True
        
        # Step 6: Write tests
        fs_toolkit.write_file("tests/test_calculator.py", '''"""Tests for calculator module."""
import sys
sys.path.insert(0, ".")

from src.calculator import add, subtract, multiply, divide
import pytest

def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0

def test_subtract():
    assert subtract(5, 3) == 2
    assert subtract(0, 5) == -5

def test_multiply():
    assert multiply(4, 5) == 20
    assert multiply(-2, 3) == -6

def test_divide():
    assert divide(10, 2) == 5
    assert divide(7, 2) == 3.5

def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(1, 0)
''')
        
        # Step 7: Run tests via backpressure
        gate_with_tests = BackpressureGate(
            workspace=real_workspace,
            test_command="pytest tests/test_calculator.py -v",
        )
        test_result = gate_with_tests.validate(validation_type="test")
        assert test_result.passed is True
        assert "passed" in test_result.results[0].stdout
        
        # Step 8: Update plan
        plan_toolkit.update_fix_plan(action="remove", item="Write tests")
        
        # Final verification
        state = manager.load_state()
        remaining_tasks = state.get_todo_items()
        # Started with 5, completed 2
        assert len(remaining_tasks) == 3
    
    def test_real_file_search_and_edit_workflow(
        self, populated_workspace: Path
    ) -> None:
        """Test searching for code and editing it."""
        fs_toolkit = RalphFilesystemToolKit(populated_workspace)
        
        # Step 1: Search for files containing "calculate"
        search_result = fs_toolkit.grep_files("calculate", "src", "*.py")
        
        assert "main.py" in search_result
        assert "calculate_sum" in search_result
        
        # Step 2: Read the file
        read_result = fs_toolkit.read_file("src/main.py")
        assert "def calculate_sum" in read_result
        
        # Step 3: Add a new function
        fs_toolkit.edit_file(
            "src/main.py",
            "if __name__",
            """def calculate_average(numbers: list) -> float:
    \"\"\"Calculate average of a list of numbers.\"\"\"
    if not numbers:
        return 0.0
    return sum(numbers) / len(numbers)

if __name__"""
        )
        
        # Step 4: Verify edit
        updated_content = fs_toolkit.read_file("src/main.py")
        assert "calculate_average" in updated_content
        
        # Step 5: Verify code still compiles
        compile_result = fs_toolkit.run_command("python3 -m py_compile src/main.py")
        assert "Exit code: 0" in compile_result
    
    def test_real_codebase_analysis(self, populated_workspace: Path) -> None:
        """Analyze a real codebase structure."""
        fs_toolkit = RalphFilesystemToolKit(populated_workspace)
        
        # Count Python files
        py_files_result = fs_toolkit.search_files("*.py", ".")
        assert "main.py" in py_files_result
        assert "utils.py" in py_files_result
        
        # Find all imports
        imports_result = fs_toolkit.grep_files("^import|^from", ".", "*.py")
        # Should find various imports
        assert any(word in imports_result for word in ["import", "from"])
        
        # Find all classes
        classes_result = fs_toolkit.grep_files("^class ", "src", "*.py")
        assert "User" in classes_result
        assert "Task" in classes_result
        
        # Find all functions
        functions_result = fs_toolkit.grep_files("^def |^    def ", "src", "*.py")
        assert "calculate_sum" in functions_result
        
        # Get line counts
        for filename in ["main.py", "utils.py", "models.py"]:
            wc_result = fs_toolkit.run_command(f"wc -l src/{filename}")
            assert "Exit code: 0" in wc_result


# ============================================================================
# RUN TESTS
# ============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
