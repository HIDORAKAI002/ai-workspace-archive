"""
BackpressureExecutor tool for RalphLoop.

This tool runs validation (build/test/lint) with controlled parallelism.
It is marked as sequential to ensure only one runs at a time.
"""

from __future__ import annotations

from typing import Any, Literal, TYPE_CHECKING

from upsonic.tools import ToolKit, tool

if TYPE_CHECKING:
    from upsonic.ralph.backpressure.gate import BackpressureGate


class BackpressureToolKit(ToolKit):
    """
    ToolKit for running backpressure validation.
    
    Provides a tool to run build/test/lint validation. This tool
    is intentionally a bottleneck - only one validation runs at a time.
    """
    
    def __init__(self, backpressure_gate: "BackpressureGate", **kwargs: Any):
        """
        Initialize BackpressureToolKit.
        
        Args:
            backpressure_gate: BackpressureGate instance for validation
            **kwargs: ToolKit params (include_tools, exclude_tools, timeout, etc.).
        """
        super().__init__(**kwargs)
        self.backpressure_gate = backpressure_gate
    
    @tool(sequential=True, timeout=600.0)
    def run_backpressure(
        self,
        validation_type: Literal["build", "test", "lint", "all"] = "all",
    ) -> str:
        """
        Run validation checks. This is a BOTTLENECK operation - only one runs at a time.
        
        Must pass before considering a task complete. Always run this after
        making code changes to ensure they work correctly.
        
        ## Before Running Backpressure
        Make sure you have:
        1. Implemented the feature COMPLETELY (no placeholders)
        2. Written tests for the implemented functionality
        3. Verified the code is syntactically correct
        
        ## Interpreting Results
        - PASS: All validations passed. Mark task complete in fix_plan.md.
        - FAIL: Read error output carefully. Fix issues and run again.
        
        Do NOT proceed with broken code. Fix failures before moving on.
        
        Args:
            validation_type: What to validate - "build", "test", "lint", or "all"
        
        Returns:
            "PASS" if all validations pass, or "FAIL: <reason>" with error details
        """
        result = self.backpressure_gate.validate(validation_type=validation_type)
        return result.format_for_agent()
    
    async def arun_backpressure(
        self,
        validation_type: Literal["build", "test", "lint", "all"] = "all",
    ) -> str:
        """
        Run validation checks asynchronously. This is a BOTTLENECK operation.
        
        Must pass before considering a task complete. Always run this after
        making code changes to ensure they work correctly.
        
        ## Before Running Backpressure
        Make sure you have:
        1. Implemented the feature COMPLETELY (no placeholders)
        2. Written tests for the implemented functionality
        3. Verified the code is syntactically correct
        
        ## Interpreting Results
        - PASS: All validations passed. Mark task complete in fix_plan.md.
        - FAIL: Read error output carefully. Fix issues and run again.
        
        Do NOT proceed with broken code. Fix failures before moving on.
        
        Args:
            validation_type: What to validate - "build", "test", "lint", or "all"
        
        Returns:
            "PASS" if all validations pass, or "FAIL: <reason>" with error details
        """
        result = await self.backpressure_gate.avalidate(validation_type=validation_type)
        return result.format_for_agent()
