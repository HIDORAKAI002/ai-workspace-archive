from __future__ import annotations
import asyncio
import copy
import logging
import threading
import time
import tracemalloc
import statistics
from typing import Any, Optional, Union, List, Dict, TYPE_CHECKING

from upsonic.agent.agent import Agent
from upsonic.graph.graph import Graph
from upsonic.team.team import Team
from upsonic.tasks.tasks import Task
from upsonic.eval.models import PerformanceRunResult, PerformanceEvaluationResult
from upsonic.eval._pl_helpers import extract_model_parameters, accumulate_agent_usage
from upsonic.utils.printing import console, debug_log

from rich.table import Table

_logger = logging.getLogger(__name__)

if TYPE_CHECKING:
    from upsonic.integrations.promptlayer import PromptLayer


class PerformanceEvaluator:
    """
    The main user-facing profiler for measuring the latency and memory
    footprint of Upsonic agents, graphs, or teams.
    """

    def __init__(
        self,
        agent_under_test: Union[Agent, Graph, Team],
        task: Union[Task, List[Task]],
        num_iterations: int = 10,
        warmup_runs: int = 2,
        promptlayer: Optional["PromptLayer"] = None,
    ):
        if not isinstance(agent_under_test, (Agent, Graph, Team)):
            raise TypeError("The `agent_under_test` must be an instance of `Agent`, `Graph`, or `Team`.")
        if not isinstance(task, (Task, list)):
            raise TypeError("The `task` must be an instance of `Task` or a list of `Task` objects.")
        if not isinstance(num_iterations, int) or num_iterations < 1:
            raise ValueError("`num_iterations` must be a positive integer.")
        if not isinstance(warmup_runs, int) or warmup_runs < 0:
            raise ValueError("`warmup_runs` must be a non-negative integer.")

        self.agent_under_test: Union[Agent, Graph, Team] = agent_under_test
        self.task: Union[Task, List[Task]] = task
        self.num_iterations: int = num_iterations
        self.warmup_runs: int = warmup_runs
        self.promptlayer: Optional["PromptLayer"] = promptlayer

    async def run(self, print_results: bool = True) -> PerformanceEvaluationResult:
        tracemalloc.start()
        eval_start_time: float = time.time()
        total_input_tokens: int = 0
        total_output_tokens: int = 0
        total_price: float = 0.0

        try:
            if self.warmup_runs > 0:
                console.print(f"[bold dim]Running {self.warmup_runs} warmup iteration(s)...[/bold dim]")
                for _ in range(self.warmup_runs):
                    task_for_this_run = copy.deepcopy(self.task)
                    await self._execute_component(self.agent_under_test, task_for_this_run)

            all_run_results: List[PerformanceRunResult] = []
            console.print(f"[bold blue]Running {self.num_iterations} measurement iteration(s)...[/bold blue]")
            for _ in range(self.num_iterations):
                task_for_this_run = copy.deepcopy(self.task)

                tracemalloc.clear_traces()
                start_mem, _ = tracemalloc.get_traced_memory()
                debug_log(f"start_mem: {start_mem}", context="PerformanceEvaluator")
                
                start_time = time.perf_counter()

                await self._execute_component(self.agent_under_test, task_for_this_run)

                end_time = time.perf_counter()
                latency = end_time - start_time
                
                end_mem, peak_mem = tracemalloc.get_traced_memory()
                debug_log(f"end_mem: {end_mem}, peak_mem: {peak_mem}", context="PerformanceEvaluator")
                
                if isinstance(self.agent_under_test, Agent):
                    in_tok, out_tok, cost = accumulate_agent_usage(self.agent_under_test)
                    total_input_tokens += in_tok
                    total_output_tokens += out_tok
                    total_price += cost

                run_result = PerformanceRunResult(
                    latency_seconds=latency,
                    memory_increase_bytes=end_mem - start_mem,
                    memory_peak_bytes=peak_mem - start_mem
                )
                all_run_results.append(run_result)
        finally:
            tracemalloc.stop()

        eval_end_time: float = time.time()
        final_result: PerformanceEvaluationResult = self._aggregate_results(all_run_results)

        if print_results:
            self._print_formatted_results(final_result)

        if self.promptlayer is not None:
            self._log_eval_to_promptlayer_background(
                final_result,
                start_time=eval_start_time,
                end_time=eval_end_time,
                input_tokens=total_input_tokens,
                output_tokens=total_output_tokens,
                price=total_price,
            )

        return final_result

    def _log_eval_to_promptlayer_background(
        self,
        result: PerformanceEvaluationResult,
        *,
        start_time: float,
        end_time: float,
        input_tokens: int,
        output_tokens: int,
        price: float,
    ) -> None:
        """Fire-and-forget: launches PromptLayer eval logging in a background thread."""
        def _run():
            try:
                asyncio.run(self._log_eval_to_promptlayer(
                    result,
                    start_time=start_time,
                    end_time=end_time,
                    input_tokens=input_tokens,
                    output_tokens=output_tokens,
                    price=price,
                ))
            except Exception as e:
                _logger.warning("Background PromptLayer eval logging failed: %s", e)

        thread = threading.Thread(target=_run, daemon=True)
        thread.start()

    async def _log_eval_to_promptlayer(
        self,
        result: PerformanceEvaluationResult,
        *,
        start_time: float,
        end_time: float,
        input_tokens: int,
        output_tokens: int,
        price: float,
    ) -> None:
        if self.promptlayer is None:
            return

        agent_model: str = getattr(self.agent_under_test, "model_name", "unknown")
        provider: str
        model: str
        provider, model = self.promptlayer._parse_provider_model(str(agent_model))

        avg_latency: float = result.latency_stats.get("average", 0.0)
        latency_score: int = max(0, min(100, 100 - int(round(avg_latency * 10))))

        model_params: Optional[Dict[str, Any]] = None
        if isinstance(self.agent_under_test, Agent):
            model_params = extract_model_parameters(self.agent_under_test)

        task_desc: str = ""
        if isinstance(self.task, list):
            task_desc = ", ".join(str(t.description) for t in self.task if hasattr(t, "description"))
        elif hasattr(self.task, "description"):
            task_desc = str(self.task.description)

        await self.promptlayer.alog(
            provider=provider,
            model=model,
            input_text=task_desc,
            output_text=f"{avg_latency:.4f}s",
            start_time=start_time,
            end_time=end_time,
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            price=price,
            parameters=model_params,
            tags=["upsonic-eval", "performance-eval"],
            metadata={
                "eval_type": "performance",
                "num_iterations": result.num_iterations,
                "warmup_runs": result.warmup_runs,
                "avg_latency_seconds": avg_latency,
                "median_latency_seconds": result.latency_stats.get("median", 0.0),
                "avg_peak_memory_bytes": result.memory_peak_stats.get("average", 0.0),
                "latency_stats": result.latency_stats,
                "memory_increase_stats": result.memory_increase_stats,
                "memory_peak_stats": result.memory_peak_stats,
            },
            score=latency_score,
            status="SUCCESS",
            function_name=f"performance_eval:{agent_model}",
            scores={"latency_score": latency_score},
        )

    async def _execute_component(self, agent: Union[Agent, Graph, Team], task: Union[Task, List[Task]]) -> None:
        if isinstance(agent, Agent):
            task_to_run = task[0] if isinstance(task, list) else task
            await agent.do_async(task_to_run)
        elif isinstance(agent, Graph):
            await agent.run_async(verbose=False, show_progress=False)
        elif isinstance(agent, Team):
            await agent.multi_agent_async(
                entity_configurations=agent.entities,
                tasks=task,
            )

    def _calculate_stats(self, data: List[float]) -> Dict[str, float]:
        if not data:
            return {}
        return {
            "average": statistics.mean(data),
            "median": statistics.median(data),
            "min": min(data),
            "max": max(data),
            "std_dev": statistics.stdev(data) if len(data) > 1 else 0.0,
        }

    def _aggregate_results(self, run_results: List[PerformanceRunResult]) -> PerformanceEvaluationResult:
        latencies = [r.latency_seconds for r in run_results]
        mem_increases = [float(r.memory_increase_bytes) for r in run_results]
        mem_peaks = [float(r.memory_peak_bytes) for r in run_results]

        return PerformanceEvaluationResult(
            all_runs=run_results,
            num_iterations=self.num_iterations,
            warmup_runs=self.warmup_runs,
            latency_stats=self._calculate_stats(latencies),
            memory_increase_stats=self._calculate_stats(mem_increases),
            memory_peak_stats=self._calculate_stats(mem_peaks),
        )

    def _print_formatted_results(self, result: PerformanceEvaluationResult) -> None:
        table = Table(title=f"[bold]Performance Evaluation Results[/bold]\n({result.num_iterations} iterations, {result.warmup_runs} warmups)")
        table.add_column("Metric", style="cyan", no_wrap=True)
        table.add_column("Average", style="magenta")
        table.add_column("Median", style="green")
        table.add_column("Min", style="blue")
        table.add_column("Max", style="red")
        table.add_column("Std. Dev.", style="yellow")

        def format_mem(byte_val: float) -> str:
            if abs(byte_val) < 1024:
                return f"{byte_val:.2f} B"
            elif abs(byte_val) < 1024**2:
                return f"{byte_val / 1024:.2f} KB"
            else:
                return f"{byte_val / 1024**2:.2f} MB"

        ls = result.latency_stats
        table.add_row(
            "Latency",
            f"{ls['average'] * 1000:.2f} ms",
            f"{ls['median'] * 1000:.2f} ms",
            f"{ls['min'] * 1000:.2f} ms",
            f"{ls['max'] * 1000:.2f} ms",
            f"{ls['std_dev'] * 1000:.2f} ms",
        )

        mis = result.memory_increase_stats
        table.add_row(
            "Memory Increase",
            format_mem(mis['average']),
            format_mem(mis['median']),
            format_mem(mis['min']),
            format_mem(mis['max']),
            format_mem(mis['std_dev']),
        )

        mps = result.memory_peak_stats
        table.add_row(
            "Memory Peak",
            format_mem(mps['average']),
            format_mem(mps['median']),
            format_mem(mps['min']),
            format_mem(mps['max']),
            format_mem(mps['std_dev']),
        )

        console.print(table)
