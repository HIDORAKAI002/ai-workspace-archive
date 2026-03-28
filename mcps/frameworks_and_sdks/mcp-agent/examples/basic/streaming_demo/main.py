"""
Streaming Demo - Real-time LLM Response Streaming

This example demonstrates the streaming capabilities of mcp-agent:
1. Basic text streaming with real-time display
2. Streaming with tool calls and execution
3. Multi-iteration agentic loops with streaming
4. Event-based monitoring of agent activity
5. Convenience methods for text-only streaming
"""

import asyncio
import sys
from rich.console import Console
from rich.panel import Panel
from rich.live import Live
from rich.markdown import Markdown
from rich.progress import Progress, SpinnerColumn, TextColumn

from mcp_agent import Agent
from mcp_agent.workflows.llm.streaming_events import StreamEventType
from mcp_agent.workflows.llm.augmented_llm_anthropic import AnthropicAugmentedLLM


console = Console()


async def demo_basic_streaming(agent: Agent):
    """Demo 1: Basic text streaming with real-time display."""
    console.print("\n[bold cyan]Demo 1: Basic Text Streaming[/bold cyan]")
    console.print("Asking: 'Tell me a short story about a robot learning to paint'\n")

    llm = agent.llm
    full_text = ""

    # Create a live display for streaming text
    with Live("", refresh_per_second=10, console=console) as live:
        async for event in llm.generate_stream(
            "Tell me a short story (3 paragraphs) about a robot learning to paint"
        ):
            if event.type == StreamEventType.TEXT_DELTA:
                if event.content:
                    full_text += event.content
                    live.update(Markdown(full_text))

            elif event.type == StreamEventType.COMPLETE:
                if event.usage:
                    input_tokens = event.usage.get('input_tokens', 0)
                    output_tokens = event.usage.get('output_tokens', 0)
                    console.print(
                        f"\n[dim]✓ Complete (Tokens: in={input_tokens}, "
                        f"out={output_tokens})[/dim]"
                    )


async def demo_streaming_with_tools(agent: Agent):
    """Demo 2: Streaming with tool calls and multi-iteration."""
    console.print("\n[bold cyan]Demo 2: Streaming with Tool Calls[/bold cyan]")
    console.print(
        "Asking: 'What files are in the current directory and what's in the README?'\n"
    )

    llm = agent.llm
    full_text = ""
    current_iteration = 0

    with Live("", refresh_per_second=10, console=console) as live:
        async for event in llm.generate_stream(
            "List the files in the current directory, then read and summarize the README.md file"
        ):
            if event.type == StreamEventType.ITERATION_START:
                current_iteration = event.iteration
                console.print(f"\n[yellow]→ Iteration {current_iteration + 1}[/yellow]")

            elif event.type == StreamEventType.TEXT_DELTA:
                if event.content:
                    full_text += event.content
                    live.update(Markdown(full_text))

            elif event.type == StreamEventType.TOOL_USE_START:
                if event.content:
                    tool_name = event.content.get('name', 'unknown')
                    tool_input = event.content.get('input', {})
                    console.print(f"\n[blue]⚙ Calling tool: {tool_name}[/blue]")
                    console.print(f"[dim]  Input: {tool_input}[/dim]")

            elif event.type == StreamEventType.TOOL_RESULT:
                if event.content:
                    is_error = event.content.get("is_error", False)
                    status = (
                        "[red]✗ Error[/red]" if is_error else "[green]✓ Success[/green]"
                    )
                    console.print(f"[blue]  {status}[/blue]")

            elif event.type == StreamEventType.ITERATION_END:
                if event.usage:
                    input_tokens = event.usage.get('input_tokens', 0)
                    output_tokens = event.usage.get('output_tokens', 0)
                    console.print(
                        f"[dim]  Tokens: in={input_tokens}, "
                        f"out={output_tokens}[/dim]"
                    )

            elif event.type == StreamEventType.COMPLETE:
                console.print("\n[green]✓ All iterations complete[/green]")
                metadata = event.metadata or {}
                console.print(
                    f"[dim]  Total iterations: {metadata.get('iterations', 0)}[/dim]"
                )


async def demo_simple_text_stream(agent: Agent):
    """Demo 3: Convenience method for text-only streaming."""
    console.print(
        "\n[bold cyan]Demo 3: Simple Text Streaming (Convenience Method)[/bold cyan]"
    )
    console.print("Using generate_str_stream() - filters out non-text events\n")

    llm = agent.llm

    console.print("[dim]Streaming response...[/dim]\n")

    # Using the convenience method that only yields text
    async for text_chunk in llm.generate_str_stream("Write a haiku about programming"):
        console.print(text_chunk, end="", style="cyan")
        await asyncio.sleep(0.05)  # Simulate reading pace

    console.print("\n")


async def demo_event_monitoring(agent: Agent):
    """Demo 4: Detailed event monitoring for debugging/logging."""
    console.print("\n[bold cyan]Demo 4: Detailed Event Monitoring[/bold cyan]")
    console.print("Tracking all streaming events for analysis\n")

    llm = agent.llm

    # Collect all events for analysis
    events = []

    console.print("[dim]Generating response...[/dim]\n")

    async for event in llm.generate_stream(
        "Count to 5 and explain why each number is important"
    ):
        events.append(event)

        # Show event type indicators
        if event.type == StreamEventType.TEXT_DELTA:
            console.print(".", end="", style="dim")
        elif event.type == StreamEventType.ITERATION_START:
            console.print(" [I]", end="", style="yellow")
        elif event.type == StreamEventType.ITERATION_END:
            console.print(" [/I]", end="", style="yellow")

    # Analyze collected events
    console.print("\n\n[bold]Event Analysis:[/bold]")

    text_deltas = [e for e in events if e.type == StreamEventType.TEXT_DELTA]
    iterations = [e for e in events if e.type == StreamEventType.ITERATION_START]
    tools = [e for e in events if e.type == StreamEventType.TOOL_USE_START]

    console.print(f"  • Total events: {len(events)}")
    console.print(f"  • Text chunks: {len(text_deltas)}")
    console.print(f"  • Iterations: {len(iterations)}")
    console.print(f"  • Tool calls: {len(tools)}")

    # Show full text
    full_text = "".join(e.content for e in text_deltas if e.content)
    console.print("\n[bold]Full Response:[/bold]")
    console.print(Panel(Markdown(full_text), border_style="cyan"))


async def demo_progress_tracking(agent: Agent):
    """Demo 5: Progress tracking with streaming."""
    console.print("\n[bold cyan]Demo 5: Progress Tracking[/bold cyan]")
    console.print("Show progress indicators during generation\n")

    llm = agent.llm

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:
        task = progress.add_task("Generating response...", total=None)

        token_count = 0

        async for event in llm.generate_stream(
            "Explain how neural networks work in simple terms (2 paragraphs)"
        ):
            if event.type == StreamEventType.TEXT_DELTA:
                token_count += 1
                progress.update(
                    task,
                    description=f"Generating response... ({token_count} chunks)",
                )

            elif event.type == StreamEventType.TOOL_USE_START:
                if event.content:
                    progress.update(
                        task,
                        description=f"Calling tool: {event.content.get('name', 'unknown')}...",
                    )

            elif event.type == StreamEventType.ITERATION_END:
                tokens = event.usage
                if tokens:
                    progress.update(
                        task,
                        description=f"Iteration complete (in={tokens.get('input_tokens', 0)}, out={tokens.get('output_tokens', 0)})",
                    )

            elif event.type == StreamEventType.COMPLETE:
                progress.update(task, description="[green]✓ Complete[/green]")

        progress.stop()

    console.print()


async def main():
    """Run all streaming demos."""
    console.print(
        Panel.fit(
            "[bold cyan]MCP Agent Streaming Demo[/bold cyan]\n"
            "Demonstrating real-time LLM response streaming",
            border_style="cyan",
        )
    )

    # Initialize agent with async context manager
    agent = Agent(name="streaming_demo")

    try:
        async with agent:
            # Attach LLM to the agent
            await agent.attach_llm(AnthropicAugmentedLLM)

            # Run all demos
            await demo_basic_streaming(agent)
            await demo_simple_text_stream(agent)
            await demo_event_monitoring(agent)
            await demo_progress_tracking(agent)

            # This demo requires filesystem tools - optional
            if agent.mcp_servers:
                await demo_streaming_with_tools(agent)
            else:
                console.print(
                    "\n[yellow]Note: Skipping tool demo (no MCP servers configured)[/yellow]"
                )

            console.print(
                "\n[bold green]✓ All demos completed successfully![/bold green]\n"
            )

    except KeyboardInterrupt:
        console.print("\n[yellow]Demo interrupted by user[/yellow]")
        sys.exit(0)
    except Exception as e:
        console.print(f"\n[red]Error: {e}[/red]")
        raise


if __name__ == "__main__":
    asyncio.run(main())
