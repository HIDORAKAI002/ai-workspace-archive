"""
Simulation result and report classes.

This module provides the SimulationResult class and various report generators
for analyzing and exporting simulation data.
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Dict, List, Literal, Optional, Type, Union, TYPE_CHECKING

from pydantic import BaseModel

if TYPE_CHECKING:
    from upsonic.simulation.base import BaseSimulationObject, SimulationConfig
    from upsonic.simulation.time_step import TimeStepManager


@dataclass
class SimulationStepRecord:
    """
    Record of a single simulation step.
    
    Attributes:
        step: Step number (0-indexed for initial state)
        timestamp: Formatted timestamp for the step
        prompt: The prompt sent to the LLM
        raw_response: Raw LLM response as string
        parsed_response: Parsed response as Pydantic model
        metrics: Extracted metric values
        execution_time: Time taken for this step in seconds
        success: Whether the step completed successfully
        error: Error message if step failed
    """
    step: int
    timestamp: str
    prompt: str
    raw_response: str
    parsed_response: Optional[BaseModel]
    metrics: Dict[str, Any]
    execution_time: float
    success: bool
    error: Optional[str]
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for serialization."""
        return {
            "step": self.step,
            "timestamp": self.timestamp,
            "prompt": self.prompt,
            "raw_response": self.raw_response,
            "parsed_response": (
                self.parsed_response.model_dump() 
                if self.parsed_response and hasattr(self.parsed_response, 'model_dump')
                else None
            ),
            "metrics": self.metrics,
            "execution_time": self.execution_time,
            "success": self.success,
            "error": self.error
        }


class BaseReport:
    """
    Base class for all simulation reports.
    
    Reports provide chainable methods for exporting simulation data
    in various formats.
    """
    
    def __init__(
        self,
        result: "SimulationResult",
        report_type: str
    ):
        """
        Initialize the report.
        
        Args:
            result: The simulation result to report on
            report_type: The type of this report
        """
        self._result = result
        self._report_type = report_type
    
    @property
    def report_type(self) -> str:
        """Get the report type."""
        return self._report_type
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert report to dictionary.
        
        Returns:
            Dict[str, Any]: Report data as dictionary
        """
        raise NotImplementedError("Subclasses must implement to_dict()")
    
    def to_json(self, file_path: str, indent: int = 2) -> "BaseReport":
        """
        Export report to JSON file.
        
        Args:
            file_path: Path to save JSON file
            indent: JSON indentation level
            
        Returns:
            Self for method chaining
        """
        data = self.to_dict()
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=indent, default=str, ensure_ascii=False)
        return self
    
    def to_csv(self, file_path: str) -> "BaseReport":
        """
        Export report to CSV file.
        
        Args:
            file_path: Path to save CSV file
            
        Returns:
            Self for method chaining
        """
        import csv
        
        data = self._get_csv_data()
        if not data:
            return self
        
        with open(file_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)
        
        return self
    
    def to_pdf(self, file_path: str) -> "BaseReport":
        """
        Export report to PDF file.
        
        Args:
            file_path: Path to save PDF file
            
        Returns:
            Self for method chaining
        """
        try:
            from reportlab.lib.pagesizes import letter
            from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
            from reportlab.lib.units import inch
            from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
            from reportlab.lib import colors
        except ImportError:
            raise ImportError(
                "reportlab is required for PDF export. "
                "Install it with: pip install reportlab"
            )
        
        doc = SimpleDocTemplate(file_path, pagesize=letter)
        styles = getSampleStyleSheet()
        story = self._build_pdf_content(styles)
        doc.build(story)
        
        return self
    
    def to_html(self, file_path: str) -> "BaseReport":
        """
        Export report to HTML file.
        
        Args:
            file_path: Path to save HTML file
            
        Returns:
            Self for method chaining
        """
        html_content = self._build_html_content()
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        return self
    
    def show(self) -> "BaseReport":
        """
        Display the report (for Jupyter notebooks).
        
        Returns:
            Self for method chaining
        """
        try:
            from IPython.display import display, HTML
            html_content = self._build_html_content()
            display(HTML(html_content))
        except ImportError:
            # Not in Jupyter, print to console instead
            from rich.console import Console
            from rich.table import Table
            
            console = Console()
            self._print_to_console(console)
        
        return self
    
    def _get_csv_data(self) -> List[Dict[str, Any]]:
        """Get data formatted for CSV export."""
        return []
    
    def _build_pdf_content(self, styles: Any) -> List[Any]:
        """Build PDF content elements."""
        return []
    
    def _build_html_content(self) -> str:
        """Build HTML content string."""
        return "<html><body><p>Report content not implemented</p></body></html>"
    
    def _print_to_console(self, console: Any) -> None:
        """Print report to console."""
        console.print(f"[bold]{self._report_type.title()} Report[/bold]")


class SummaryReport(BaseReport):
    """
    Summary report with high-level simulation statistics.
    """
    
    def __init__(self, result: "SimulationResult"):
        super().__init__(result, "summary")
    
    def to_dict(self) -> Dict[str, Any]:
        """Get summary data as dictionary."""
        result = self._result
        
        # Calculate statistics
        successful_steps = sum(1 for s in result.steps if s.success)
        failed_steps = sum(1 for s in result.steps if not s.success)
        total_execution_time = sum(s.execution_time for s in result.steps)
        
        # Get final metrics
        final_metrics = result.steps[-1].metrics if result.steps else {}
        initial_metrics = result.steps[0].metrics if result.steps else {}
        
        # Calculate metric changes
        metric_changes: Dict[str, Dict[str, Any]] = {}
        for metric in result.metrics_to_track:
            initial = initial_metrics.get(metric, 0)
            final = final_metrics.get(metric, 0)
            if isinstance(initial, (int, float)) and isinstance(final, (int, float)):
                change = final - initial
                percent_change = (change / initial * 100) if initial != 0 else 0
                metric_changes[metric] = {
                    "initial": initial,
                    "final": final,
                    "change": change,
                    "percent_change": percent_change
                }
        
        return {
            "simulation_id": result.simulation_id,
            "simulation_name": result.simulation_object.name,
            "description": result.simulation_object.description,
            "total_steps": len(result.steps) - 1,  # Exclude initial state
            "successful_steps": successful_steps - 1,  # Exclude initial state
            "failed_steps": failed_steps,
            "total_execution_time": total_execution_time,
            "average_step_time": total_execution_time / max(1, len(result.steps) - 1),
            "start_time": result.start_time,
            "end_time": result.end_time,
            "duration_seconds": result.end_time - result.start_time,
            "metrics_tracked": result.metrics_to_track,
            "initial_metrics": initial_metrics,
            "final_metrics": final_metrics,
            "metric_changes": metric_changes
        }
    
    def _get_csv_data(self) -> List[Dict[str, Any]]:
        """Get summary data for CSV export."""
        data = self.to_dict()
        # Flatten nested dictionaries
        flat_data: Dict[str, Any] = {}
        for key, value in data.items():
            if isinstance(value, dict):
                for sub_key, sub_value in value.items():
                    if isinstance(sub_value, dict):
                        for sub_sub_key, sub_sub_value in sub_value.items():
                            flat_data[f"{key}_{sub_key}_{sub_sub_key}"] = sub_sub_value
                    else:
                        flat_data[f"{key}_{sub_key}"] = sub_value
            elif isinstance(value, list):
                flat_data[key] = ", ".join(str(v) for v in value)
            else:
                flat_data[key] = value
        return [flat_data]
    
    def _build_html_content(self) -> str:
        """Build HTML summary report."""
        data = self.to_dict()
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Simulation Summary - {data['simulation_name']}</title>
            <style>
                body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                       margin: 40px; background: #f5f5f5; }}
                .container {{ max-width: 900px; margin: 0 auto; background: white; 
                             padding: 40px; border-radius: 12px; box-shadow: 0 2px 20px rgba(0,0,0,0.1); }}
                h1 {{ color: #1a1a2e; border-bottom: 3px solid #4a90d9; padding-bottom: 15px; }}
                h2 {{ color: #4a90d9; margin-top: 30px; }}
                .stats {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }}
                .stat-box {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                            color: white; padding: 20px; border-radius: 10px; text-align: center; }}
                .stat-value {{ font-size: 28px; font-weight: bold; }}
                .stat-label {{ font-size: 14px; opacity: 0.9; }}
                .metric-table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
                .metric-table th, .metric-table td {{ padding: 12px; text-align: left; border-bottom: 1px solid #eee; }}
                .metric-table th {{ background: #f8f9fa; }}
                .positive {{ color: #28a745; }}
                .negative {{ color: #dc3545; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📊 {data['simulation_name']}</h1>
                <p><em>{data['description']}</em></p>
                
                <h2>Overview</h2>
                <div class="stats">
                    <div class="stat-box">
                        <div class="stat-value">{data['total_steps']}</div>
                        <div class="stat-label">Total Steps</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">{data['successful_steps']}</div>
                        <div class="stat-label">Successful</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">{data['duration_seconds']:.1f}s</div>
                        <div class="stat-label">Duration</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">{data['average_step_time']:.2f}s</div>
                        <div class="stat-label">Avg Step Time</div>
                    </div>
                </div>
                
                <h2>Metric Changes</h2>
                <table class="metric-table">
                    <thead>
                        <tr><th>Metric</th><th>Initial</th><th>Final</th><th>Change</th><th>% Change</th></tr>
                    </thead>
                    <tbody>
        """
        
        for metric, change_data in data['metric_changes'].items():
            change_class = "positive" if change_data['change'] >= 0 else "negative"
            sign = "+" if change_data['change'] >= 0 else ""
            html += f"""
                        <tr>
                            <td><strong>{metric}</strong></td>
                            <td>{change_data['initial']:,.2f}</td>
                            <td>{change_data['final']:,.2f}</td>
                            <td class="{change_class}">{sign}{change_data['change']:,.2f}</td>
                            <td class="{change_class}">{sign}{change_data['percent_change']:.1f}%</td>
                        </tr>
            """
        
        html += """
                    </tbody>
                </table>
                
                <p style="margin-top: 40px; color: #888; font-size: 12px;">
                    Simulation ID: {simulation_id} | Generated at {end_time}
                </p>
            </div>
        </body>
        </html>
        """.format(**data)
        
        return html
    
    def _build_pdf_content(self, styles: Any) -> List[Any]:
        """Build PDF content for summary report."""
        from reportlab.platypus import Paragraph, Spacer, Table, TableStyle
        from reportlab.lib import colors
        from reportlab.lib.units import inch
        
        data = self.to_dict()
        story = []
        
        # Title
        story.append(Paragraph(f"Simulation Summary: {data['simulation_name']}", styles['Title']))
        story.append(Paragraph(data['description'], styles['Normal']))
        story.append(Spacer(1, 0.25*inch))
        
        # Overview stats
        story.append(Paragraph("Overview", styles['Heading2']))
        overview_data = [
            ['Total Steps', str(data['total_steps'])],
            ['Successful Steps', str(data['successful_steps'])],
            ['Failed Steps', str(data['failed_steps'])],
            ['Duration', f"{data['duration_seconds']:.1f} seconds"],
            ['Avg Step Time', f"{data['average_step_time']:.2f} seconds"],
        ]
        t = Table(overview_data, colWidths=[2.5*inch, 2.5*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('PADDING', (0, 0), (-1, -1), 8),
        ]))
        story.append(t)
        story.append(Spacer(1, 0.25*inch))
        
        # Metric changes
        story.append(Paragraph("Metric Changes", styles['Heading2']))
        metric_data = [['Metric', 'Initial', 'Final', 'Change', '% Change']]
        for metric, change_data in data['metric_changes'].items():
            sign = "+" if change_data['change'] >= 0 else ""
            metric_data.append([
                metric,
                f"{change_data['initial']:,.2f}",
                f"{change_data['final']:,.2f}",
                f"{sign}{change_data['change']:,.2f}",
                f"{sign}{change_data['percent_change']:.1f}%"
            ])
        t = Table(metric_data)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightblue),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('PADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(t)
        
        return story
    
    def _print_to_console(self, console: Any) -> None:
        """Print summary to console."""
        from rich.table import Table
        from rich.panel import Panel
        
        data = self.to_dict()
        
        console.print(Panel(
            f"[bold]{data['simulation_name']}[/bold]\n{data['description']}",
            title="📊 Simulation Summary"
        ))
        
        table = Table(title="Metric Changes")
        table.add_column("Metric", style="cyan")
        table.add_column("Initial", justify="right")
        table.add_column("Final", justify="right")
        table.add_column("Change", justify="right")
        table.add_column("% Change", justify="right")
        
        for metric, change_data in data['metric_changes'].items():
            sign = "+" if change_data['change'] >= 0 else ""
            change_style = "green" if change_data['change'] >= 0 else "red"
            table.add_row(
                metric,
                f"{change_data['initial']:,.2f}",
                f"{change_data['final']:,.2f}",
                f"[{change_style}]{sign}{change_data['change']:,.2f}[/{change_style}]",
                f"[{change_style}]{sign}{change_data['percent_change']:.1f}%[/{change_style}]"
            )
        
        console.print(table)


class DetailedReport(BaseReport):
    """
    Detailed report with step-by-step data.
    """
    
    def __init__(self, result: "SimulationResult"):
        super().__init__(result, "detailed")
    
    def to_dict(self) -> Dict[str, Any]:
        """Get detailed data as dictionary."""
        return {
            "simulation_id": self._result.simulation_id,
            "simulation_name": self._result.simulation_object.name,
            "config": {
                "model": self._result.config.model,
                "time_step": self._result.config.time_step,
                "duration": self._result.config.simulation_duration,
                "temperature": self._result.config.temperature,
            },
            "steps": [step.to_dict() for step in self._result.steps]
        }
    
    def _get_csv_data(self) -> List[Dict[str, Any]]:
        """Get step data formatted for CSV export."""
        result: List[Dict[str, Any]] = []
        for step in self._result.steps:
            row = {
                "step": step.step,
                "timestamp": step.timestamp,
                "execution_time": step.execution_time,
                "success": step.success,
                "error": step.error or "",
            }
            # Add metrics as columns
            for metric, value in step.metrics.items():
                row[metric] = value
            result.append(row)
        return result
    
    def _build_html_content(self) -> str:
        """Build HTML detailed report."""
        data = self.to_dict()
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Detailed Report - {data['simulation_name']}</title>
            <style>
                body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                       margin: 40px; background: #f0f4f8; }}
                .container {{ max-width: 1200px; margin: 0 auto; }}
                h1 {{ color: #1a1a2e; }}
                table {{ width: 100%; border-collapse: collapse; background: white; 
                        border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
                th {{ background: #4a90d9; color: white; padding: 15px; text-align: left; }}
                td {{ padding: 12px 15px; border-bottom: 1px solid #eee; }}
                tr:hover {{ background: #f8f9fa; }}
                .success {{ color: #28a745; }}
                .error {{ color: #dc3545; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📋 Detailed Report: {data['simulation_name']}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Step</th>
                            <th>Timestamp</th>
                            <th>Execution Time</th>
                            <th>Status</th>
        """
        
        # Add metric columns
        for metric in self._result.metrics_to_track:
            html += f"<th>{metric}</th>"
        
        html += "</tr></thead><tbody>"
        
        for step in data['steps']:
            status_class = "success" if step['success'] else "error"
            status_text = "✓ Success" if step['success'] else f"✗ {step['error']}"
            
            html += f"""
                <tr>
                    <td>{step['step']}</td>
                    <td>{step['timestamp']}</td>
                    <td>{step['execution_time']:.2f}s</td>
                    <td class="{status_class}">{status_text}</td>
            """
            
            for metric in self._result.metrics_to_track:
                value = step['metrics'].get(metric, 'N/A')
                if isinstance(value, (int, float)):
                    html += f"<td>{value:,.2f}</td>"
                else:
                    html += f"<td>{value}</td>"
            
            html += "</tr>"
        
        html += """
                    </tbody>
                </table>
            </div>
        </body>
        </html>
        """
        
        return html


class VisualReport(BaseReport):
    """
    Visual report with charts and graphs.
    """
    
    def __init__(self, result: "SimulationResult"):
        super().__init__(result, "visual")
    
    def to_dict(self) -> Dict[str, Any]:
        """Get visual report data."""
        # Extract time series data for each metric
        series: Dict[str, List[Any]] = {}
        timestamps: List[str] = []
        
        for step in self._result.steps:
            timestamps.append(step.timestamp)
            for metric in self._result.metrics_to_track:
                if metric not in series:
                    series[metric] = []
                series[metric].append(step.metrics.get(metric, None))
        
        return {
            "simulation_id": self._result.simulation_id,
            "simulation_name": self._result.simulation_object.name,
            "timestamps": timestamps,
            "series": series
        }
    
    def _build_html_content(self) -> str:
        """Build HTML visual report with Chart.js."""
        data = self.to_dict()
        
        # Generate colors for each metric
        colors = [
            'rgb(75, 192, 192)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
        ]
        
        # Build datasets for Chart.js
        datasets_js = []
        for i, (metric, values) in enumerate(data['series'].items()):
            color = colors[i % len(colors)]
            datasets_js.append(f"""{{
                label: '{metric}',
                data: {json.dumps(values)},
                borderColor: '{color}',
                backgroundColor: '{color.replace("rgb", "rgba").replace(")", ", 0.1)")}',
                tension: 0.3,
                fill: true
            }}""")
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Visual Report - {data['simulation_name']}</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                       margin: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                       min-height: 100vh; }}
                .container {{ max-width: 1200px; margin: 0 auto; background: white; 
                             padding: 40px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }}
                h1 {{ color: #1a1a2e; text-align: center; margin-bottom: 30px; }}
                .chart-container {{ position: relative; height: 500px; margin-bottom: 40px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📈 {data['simulation_name']}</h1>
                <div class="chart-container">
                    <canvas id="mainChart"></canvas>
                </div>
            </div>
            <script>
                const ctx = document.getElementById('mainChart').getContext('2d');
                new Chart(ctx, {{
                    type: 'line',
                    data: {{
                        labels: {json.dumps(data['timestamps'])},
                        datasets: [{', '.join(datasets_js)}]
                    }},
                    options: {{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {{
                            title: {{
                                display: true,
                                text: 'Simulation Metrics Over Time',
                                font: {{ size: 18 }}
                            }},
                            legend: {{
                                position: 'top'
                            }}
                        }},
                        scales: {{
                            y: {{
                                beginAtZero: false,
                                ticks: {{
                                    callback: function(value) {{
                                        return value.toLocaleString();
                                    }}
                                }}
                            }}
                        }},
                        interaction: {{
                            intersect: false,
                            mode: 'index'
                        }}
                    }}
                }});
            </script>
        </body>
        </html>
        """
        
        return html
    
    def show(self) -> "VisualReport":
        """Display the visual report."""
        try:
            # Try to use matplotlib for Jupyter
            import matplotlib.pyplot as plt
            
            data = self.to_dict()
            
            fig, ax = plt.subplots(figsize=(12, 6))
            
            steps = list(range(len(data['timestamps'])))
            
            for metric, values in data['series'].items():
                # Filter out None values
                valid_steps = [s for s, v in zip(steps, values) if v is not None]
                valid_values = [v for v in values if v is not None]
                ax.plot(valid_steps, valid_values, label=metric, linewidth=2, marker='o', markersize=3)
            
            ax.set_xlabel('Step')
            ax.set_ylabel('Value')
            ax.set_title(f"{data['simulation_name']} - Metrics Over Time")
            ax.legend()
            ax.grid(True, alpha=0.3)
            
            plt.tight_layout()
            plt.show()
            
        except ImportError:
            # Fall back to HTML display
            super().show()
        
        return self


class StatisticalReport(BaseReport):
    """
    Statistical analysis report with metrics analytics.
    """
    
    def __init__(self, result: "SimulationResult"):
        super().__init__(result, "statistical")
    
    def to_dict(self) -> Dict[str, Any]:
        """Calculate statistical metrics."""
        stats: Dict[str, Dict[str, Any]] = {}
        
        for metric in self._result.metrics_to_track:
            values = [
                step.metrics.get(metric) 
                for step in self._result.steps 
                if step.metrics.get(metric) is not None
                and isinstance(step.metrics.get(metric), (int, float))
            ]
            
            if values:
                import statistics
                
                sorted_values = sorted(values)
                n = len(values)
                
                stats[metric] = {
                    "count": n,
                    "min": min(values),
                    "max": max(values),
                    "mean": statistics.mean(values),
                    "median": statistics.median(values),
                    "stdev": statistics.stdev(values) if n > 1 else 0,
                    "variance": statistics.variance(values) if n > 1 else 0,
                    "range": max(values) - min(values),
                    "q1": sorted_values[n // 4] if n >= 4 else sorted_values[0],
                    "q3": sorted_values[3 * n // 4] if n >= 4 else sorted_values[-1],
                    "first_value": values[0],
                    "last_value": values[-1],
                    "total_change": values[-1] - values[0],
                    "percent_change": ((values[-1] - values[0]) / values[0] * 100) if values[0] != 0 else 0,
                }
                
                # Calculate trend (simple linear regression slope)
                if n > 1:
                    x_mean = sum(range(n)) / n
                    y_mean = statistics.mean(values)
                    
                    numerator = sum((i - x_mean) * (v - y_mean) for i, v in enumerate(values))
                    denominator = sum((i - x_mean) ** 2 for i in range(n))
                    
                    slope = numerator / denominator if denominator != 0 else 0
                    stats[metric]["trend_slope"] = slope
                    stats[metric]["trend_direction"] = "up" if slope > 0 else "down" if slope < 0 else "flat"
        
        return {
            "simulation_id": self._result.simulation_id,
            "simulation_name": self._result.simulation_object.name,
            "statistics": stats
        }
    
    def _build_html_content(self) -> str:
        """Build HTML statistical report."""
        data = self.to_dict()
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Statistical Report - {data['simulation_name']}</title>
            <style>
                body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                       margin: 40px; background: #f5f5f5; }}
                .container {{ max-width: 1000px; margin: 0 auto; }}
                h1 {{ color: #1a1a2e; text-align: center; }}
                .metric-card {{ background: white; padding: 25px; margin: 20px 0; 
                               border-radius: 12px; box-shadow: 0 2px 15px rgba(0,0,0,0.1); }}
                .metric-title {{ font-size: 20px; font-weight: bold; color: #4a90d9; margin-bottom: 15px; }}
                .stats-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }}
                .stat {{ text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px; }}
                .stat-value {{ font-size: 18px; font-weight: bold; color: #1a1a2e; }}
                .stat-label {{ font-size: 12px; color: #666; margin-top: 5px; }}
                .trend-up {{ color: #28a745; }}
                .trend-down {{ color: #dc3545; }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📊 Statistical Analysis: {data['simulation_name']}</h1>
        """
        
        for metric, stats in data['statistics'].items():
            trend_class = "trend-up" if stats.get('trend_direction') == 'up' else "trend-down"
            trend_arrow = "↑" if stats.get('trend_direction') == 'up' else "↓" if stats.get('trend_direction') == 'down' else "→"
            
            html += f"""
                <div class="metric-card">
                    <div class="metric-title">{metric} <span class="{trend_class}">{trend_arrow}</span></div>
                    <div class="stats-grid">
                        <div class="stat">
                            <div class="stat-value">{stats['mean']:,.2f}</div>
                            <div class="stat-label">Mean</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">{stats['median']:,.2f}</div>
                            <div class="stat-label">Median</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">{stats['stdev']:,.2f}</div>
                            <div class="stat-label">Std Dev</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">{stats['min']:,.2f}</div>
                            <div class="stat-label">Min</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">{stats['max']:,.2f}</div>
                            <div class="stat-label">Max</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">{stats['range']:,.2f}</div>
                            <div class="stat-label">Range</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value class="{trend_class}">{stats['percent_change']:+.1f}%</div>
                            <div class="stat-label">Total Change</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">{stats['count']}</div>
                            <div class="stat-label">Data Points</div>
                        </div>
                    </div>
                </div>
            """
        
        html += """
            </div>
        </body>
        </html>
        """
        
        return html


class ReportsCollection:
    """
    Collection of all available reports for batch operations.
    """
    
    def __init__(self, result: "SimulationResult"):
        self._result = result
        self._reports: Dict[str, BaseReport] = {
            "summary": SummaryReport(result),
            "detailed": DetailedReport(result),
            "visual": VisualReport(result),
            "statistical": StatisticalReport(result),
        }
    
    def __iter__(self):
        return iter(self._reports.values())
    
    def __getitem__(self, key: str) -> BaseReport:
        return self._reports[key]
    
    def save_all(
        self, 
        directory: str = "./reports", 
        format: str = "pdf"
    ) -> "ReportsCollection":
        """
        Save all reports to a directory.
        
        Args:
            directory: Output directory path
            format: Export format ("pdf", "html", "json", "csv")
            
        Returns:
            Self for method chaining
        """
        os.makedirs(directory, exist_ok=True)
        
        for report_type, report in self._reports.items():
            file_name = f"{report_type}_report"
            
            if format == "pdf":
                report.to_pdf(os.path.join(directory, f"{file_name}.pdf"))
            elif format == "html":
                report.to_html(os.path.join(directory, f"{file_name}.html"))
            elif format == "json":
                report.to_json(os.path.join(directory, f"{file_name}.json"))
            elif format == "csv":
                report.to_csv(os.path.join(directory, f"{file_name}.csv"))
        
        return self


class SimulationResult:
    """
    Complete result from a simulation run.
    
    Provides access to all simulation data and report generation.
    
    Example:
        ```python
        result = simulation.run()
        
        # Access individual reports with chainable methods
        result.report("summary").to_pdf("summary.pdf")
        result.report("detailed").to_csv("data.csv")
        result.report("visual").to_html("charts.html")
        result.report("statistical").to_json("stats.json")
        
        # Show directly in Jupyter
        result.report("visual").show()
        
        # Save all reports at once
        result.reports().save_all(directory="./reports", format="pdf")
        ```
    """
    
    def __init__(
        self,
        simulation_id: str,
        simulation_object: "BaseSimulationObject",
        config: "SimulationConfig",
        steps: List[SimulationStepRecord],
        start_time: float,
        end_time: float,
        time_manager: "TimeStepManager",
        metrics_to_track: List[str]
    ):
        """
        Initialize the simulation result.
        
        Args:
            simulation_id: Unique identifier for this simulation run
            simulation_object: The simulation scenario object
            config: Simulation configuration
            steps: List of step records
            start_time: Unix timestamp when simulation started
            end_time: Unix timestamp when simulation ended
            time_manager: Time step manager used
            metrics_to_track: List of tracked metric names
        """
        self._simulation_id = simulation_id
        self._simulation_object = simulation_object
        self._config = config
        self._steps = steps
        self._start_time = start_time
        self._end_time = end_time
        self._time_manager = time_manager
        self._metrics_to_track = metrics_to_track
        
        # Lazy-loaded reports collection
        self._reports_collection: Optional[ReportsCollection] = None
    
    @property
    def simulation_id(self) -> str:
        """Get the simulation ID."""
        return self._simulation_id
    
    @property
    def simulation_object(self) -> "BaseSimulationObject":
        """Get the simulation scenario object."""
        return self._simulation_object
    
    @property
    def config(self) -> "SimulationConfig":
        """Get the simulation configuration."""
        return self._config
    
    @property
    def steps(self) -> List[SimulationStepRecord]:
        """Get all step records."""
        return self._steps
    
    @property
    def start_time(self) -> float:
        """Get simulation start time."""
        return self._start_time
    
    @property
    def end_time(self) -> float:
        """Get simulation end time."""
        return self._end_time
    
    @property
    def metrics_to_track(self) -> List[str]:
        """Get list of tracked metrics."""
        return self._metrics_to_track
    
    @property
    def duration(self) -> float:
        """Get simulation duration in seconds."""
        return self._end_time - self._start_time
    
    @property
    def total_steps(self) -> int:
        """Get total number of steps (excluding initial state)."""
        return len(self._steps) - 1
    
    @property
    def successful_steps(self) -> int:
        """Get number of successful steps."""
        return sum(1 for s in self._steps[1:] if s.success)
    
    @property
    def failed_steps(self) -> int:
        """Get number of failed steps."""
        return sum(1 for s in self._steps[1:] if not s.success)
    
    def report(
        self, 
        report_type: Literal["summary", "detailed", "visual", "statistical"]
    ) -> BaseReport:
        """
        Get a specific report type.
        
        Args:
            report_type: Type of report to generate
            
        Returns:
            The requested report object with chainable export methods
        """
        if self._reports_collection is None:
            self._reports_collection = ReportsCollection(self)
        
        return self._reports_collection[report_type]
    
    def reports(self) -> ReportsCollection:
        """
        Get all reports as a collection.
        
        Returns:
            ReportsCollection with all report types
        """
        if self._reports_collection is None:
            self._reports_collection = ReportsCollection(self)
        
        return self._reports_collection
    
    def get_metric_series(self, metric: str) -> List[Any]:
        """
        Get the time series data for a specific metric.
        
        Args:
            metric: Name of the metric
            
        Returns:
            List of metric values across all steps
        """
        return [step.metrics.get(metric) for step in self._steps]
    
    def get_final_metrics(self) -> Dict[str, Any]:
        """
        Get the final metric values from the last step.
        
        Returns:
            Dictionary of final metric values
        """
        return self._steps[-1].metrics if self._steps else {}
    
    def get_initial_metrics(self) -> Dict[str, Any]:
        """
        Get the initial metric values from step 0.
        
        Returns:
            Dictionary of initial metric values
        """
        return self._steps[0].metrics if self._steps else {}
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert the entire result to a dictionary.
        
        Returns:
            Complete simulation result as dictionary
        """
        return {
            "simulation_id": self._simulation_id,
            "simulation_object": self._simulation_object.to_dict(),
            "config": {
                "model": self._config.model,
                "time_step": self._config.time_step,
                "simulation_duration": self._config.simulation_duration,
                "metrics_to_track": self._config.metrics_to_track,
                "temperature": self._config.temperature,
            },
            "steps": [step.to_dict() for step in self._steps],
            "start_time": self._start_time,
            "end_time": self._end_time,
            "duration": self.duration,
            "total_steps": self.total_steps,
            "successful_steps": self.successful_steps,
            "failed_steps": self.failed_steps,
        }
    
    def to_json(self, file_path: str, indent: int = 2) -> "SimulationResult":
        """
        Export the complete result to JSON.
        
        Args:
            file_path: Path to save JSON file
            indent: JSON indentation level
            
        Returns:
            Self for method chaining
        """
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(self.to_dict(), f, indent=indent, default=str, ensure_ascii=False)
        return self
