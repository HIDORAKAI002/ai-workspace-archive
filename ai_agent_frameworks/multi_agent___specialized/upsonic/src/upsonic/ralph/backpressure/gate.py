"""
Backpressure gate for RalphLoop.

This module implements validation gates that must pass before
a loop iteration can be considered complete.
"""

from __future__ import annotations

import subprocess
import asyncio
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Literal, Optional


@dataclass
class ValidationResult:
    """Result of a single validation check."""
    
    validation_type: Literal["build", "test", "lint"]
    passed: bool
    command: str
    returncode: int
    stdout: str = ""
    stderr: str = ""
    execution_time: float = 0.0
    no_tests_found: bool = False  # Special case: no tests collected
    
    def get_error_summary(self, max_length: int = 500) -> str:
        """
        Get a summary of the error for LLM context.
        
        Args:
            max_length: Maximum length of error summary
            
        Returns:
            Truncated error output
        """
        if self.no_tests_found:
            return "NO TESTS FOUND - This is not a failure, but you should create tests."
        error_text = self.stderr or self.stdout
        if len(error_text) > max_length:
            return error_text[:max_length] + "... (truncated)"
        return error_text


@dataclass
class BackpressureResult:
    """Result of all backpressure validations."""
    
    passed: bool
    results: List[ValidationResult] = field(default_factory=list)
    
    def get_failures(self) -> List[ValidationResult]:
        """Get list of failed validations."""
        return [r for r in self.results if not r.passed]
    
    def get_first_failure(self) -> Optional[ValidationResult]:
        """Get first failed validation or None."""
        failures = self.get_failures()
        return failures[0] if failures else None
    
    def format_for_agent(self) -> str:
        """
        Format result for agent feedback.
        
        Returns:
            "PASS", "PASS (no tests found)", or "FAIL: <reason>"
        """
        if self.passed:
            # Check if any result had no_tests_found flag
            no_tests_results = [r for r in self.results if r.no_tests_found]
            if no_tests_results:
                return "PASS (no tests found - consider adding tests)"
            return "PASS"
        
        failure = self.get_first_failure()
        if failure:
            return f"FAIL: {failure.validation_type} failed:\n{failure.get_error_summary()}"
        
        return "FAIL: Unknown error"


class BackpressureGate:
    """
    Centralized validation gate for RalphLoop.
    
    Runs build, test, and lint commands to validate code changes.
    All validations must pass before an iteration is considered complete.
    """
    
    def __init__(
        self,
        workspace: Path,
        build_command: Optional[str] = None,
        test_command: Optional[str] = None,
        lint_command: Optional[str] = None,
        timeout: int = 300,
    ):
        """
        Initialize BackpressureGate.
        
        Args:
            workspace: Working directory for commands
            build_command: Command to build project
            test_command: Command to run tests
            lint_command: Command to run linter
            timeout: Command timeout in seconds
        """
        self.workspace = Path(workspace).resolve()
        self.build_command = build_command
        self.lint_command = lint_command
        self.timeout = timeout
        
        # Ensure pytest uses workspace as rootdir to avoid picking up parent config
        if test_command:
            test_command = self._normalize_test_command(test_command)
        self.test_command = test_command
    
    def _normalize_test_command(self, command: str) -> str:
        """
        Normalize test command to ensure it runs from workspace.
        
        Adds --rootdir=. for pytest to prevent picking up parent configs.
        
        Args:
            command: Original test command
            
        Returns:
            Normalized command
        """
        # If it's a pytest command and doesn't already have --rootdir
        if "pytest" in command and "--rootdir" not in command:
            # Insert --rootdir=. after pytest
            return command.replace("pytest", "pytest --rootdir=.", 1)
        return command
    
    def validate(
        self, 
        validation_type: Literal["build", "test", "lint", "all"] = "all"
    ) -> BackpressureResult:
        """
        Run configured validations synchronously.
        
        Args:
            validation_type: Which validation(s) to run
        
        Returns:
            BackpressureResult with validation outcomes
        """
        results: List[ValidationResult] = []
        
        run_build = validation_type in ("build", "all")
        run_test = validation_type in ("test", "all")
        run_lint = validation_type in ("lint", "all")
        
        if run_build and self.build_command:
            result = self._run_validation("build", self.build_command)
            results.append(result)
            if not result.passed:
                return BackpressureResult(passed=False, results=results)
        
        if run_test and self.test_command:
            result = self._run_validation("test", self.test_command)
            results.append(result)
            if not result.passed:
                return BackpressureResult(passed=False, results=results)
        
        if run_lint and self.lint_command:
            result = self._run_validation("lint", self.lint_command)
            results.append(result)
            if not result.passed:
                return BackpressureResult(passed=False, results=results)
        
        # If no validations configured for the requested type, still pass
        if not results:
            return BackpressureResult(passed=True, results=results)
        
        return BackpressureResult(passed=True, results=results)
    
    async def avalidate(
        self,
        validation_type: Literal["build", "test", "lint", "all"] = "all"
    ) -> BackpressureResult:
        """
        Run configured validations asynchronously.
        
        Args:
            validation_type: Which validation(s) to run
        
        Returns:
            BackpressureResult with validation outcomes
        """
        results: List[ValidationResult] = []
        
        run_build = validation_type in ("build", "all")
        run_test = validation_type in ("test", "all")
        run_lint = validation_type in ("lint", "all")
        
        if run_build and self.build_command:
            result = await self._arun_validation("build", self.build_command)
            results.append(result)
            if not result.passed:
                return BackpressureResult(passed=False, results=results)
        
        if run_test and self.test_command:
            result = await self._arun_validation("test", self.test_command)
            results.append(result)
            if not result.passed:
                return BackpressureResult(passed=False, results=results)
        
        if run_lint and self.lint_command:
            result = await self._arun_validation("lint", self.lint_command)
            results.append(result)
            if not result.passed:
                return BackpressureResult(passed=False, results=results)
        
        # If no validations configured for the requested type, still pass
        if not results:
            return BackpressureResult(passed=True, results=results)
        
        return BackpressureResult(passed=True, results=results)
    
    def _is_no_tests_collected(self, stdout: str, stderr: str, returncode: int) -> bool:
        """
        Check if the test command failed because no tests were collected.
        
        This is a special case that shouldn't block progress - just means
        tests need to be written, not that existing tests are failing.
        """
        combined = (stdout + stderr).lower()
        # pytest: "collected 0 items" or exit code 5 (no tests collected)
        if "collected 0 items" in combined or returncode == 5:
            return True
        # npm test: "no test specified"
        if "no test specified" in combined:
            return True
        # jest: "no tests found"
        if "no tests found" in combined:
            return True
        # mocha: no test files
        if "no test files" in combined:
            return True
        return False

    def _run_validation(
        self, 
        validation_type: Literal["build", "test", "lint"], 
        command: str
    ) -> ValidationResult:
        """
        Run a single validation command synchronously.
        
        Args:
            validation_type: Type of validation
            command: Command to run
            
        Returns:
            ValidationResult
        """
        import time
        start_time = time.time()
        
        try:
            result = subprocess.run(
                command,
                shell=True,
                cwd=self.workspace,
                capture_output=True,
                text=True,
                timeout=self.timeout,
            )
            
            execution_time = time.time() - start_time
            
            # Check for "no tests collected" special case
            no_tests = (
                validation_type == "test" and
                self._is_no_tests_collected(result.stdout, result.stderr, result.returncode)
            )
            
            # If no tests were found, treat as pass but flag it
            passed = result.returncode == 0 or no_tests
            
            return ValidationResult(
                validation_type=validation_type,
                passed=passed,
                command=command,
                returncode=result.returncode,
                stdout=result.stdout,
                stderr=result.stderr,
                execution_time=execution_time,
                no_tests_found=no_tests,
            )
        except subprocess.TimeoutExpired:
            return ValidationResult(
                validation_type=validation_type,
                passed=False,
                command=command,
                returncode=-1,
                stderr=f"Command timed out after {self.timeout} seconds",
                execution_time=self.timeout,
            )
        except Exception as e:
            return ValidationResult(
                validation_type=validation_type,
                passed=False,
                command=command,
                returncode=-1,
                stderr=f"Command execution failed: {str(e)}",
                execution_time=time.time() - start_time,
            )
    
    async def _arun_validation(
        self, 
        validation_type: Literal["build", "test", "lint"], 
        command: str
    ) -> ValidationResult:
        """
        Run a single validation command asynchronously.
        
        Args:
            validation_type: Type of validation
            command: Command to run
            
        Returns:
            ValidationResult
        """
        import time
        start_time = time.time()
        
        try:
            process = await asyncio.create_subprocess_shell(
                command,
                cwd=self.workspace,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            
            try:
                stdout, stderr = await asyncio.wait_for(
                    process.communicate(), 
                    timeout=self.timeout
                )
            except asyncio.TimeoutError:
                process.kill()
                await process.wait()
                return ValidationResult(
                    validation_type=validation_type,
                    passed=False,
                    command=command,
                    returncode=-1,
                    stderr=f"Command timed out after {self.timeout} seconds",
                    execution_time=self.timeout,
                )
            
            execution_time = time.time() - start_time
            stdout_str = stdout.decode("utf-8", errors="replace")
            stderr_str = stderr.decode("utf-8", errors="replace")
            returncode = process.returncode or 0
            
            # Check for "no tests collected" special case
            no_tests = (
                validation_type == "test" and
                self._is_no_tests_collected(stdout_str, stderr_str, returncode)
            )
            
            # If no tests were found, treat as pass but flag it
            passed = returncode == 0 or no_tests
            
            return ValidationResult(
                validation_type=validation_type,
                passed=passed,
                command=command,
                returncode=returncode,
                stdout=stdout_str,
                stderr=stderr_str,
                execution_time=execution_time,
                no_tests_found=no_tests,
            )
        except Exception as e:
            return ValidationResult(
                validation_type=validation_type,
                passed=False,
                command=command,
                returncode=-1,
                stderr=f"Command execution failed: {str(e)}",
                execution_time=time.time() - start_time,
            )
    
    def has_validations(self) -> bool:
        """Check if any validations are configured."""
        return bool(self.build_command or self.test_command or self.lint_command)
