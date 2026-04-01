"""
Retain operation performance benchmark.

Measures retain operation performance by:
1. Loading a document from a file or directory
2. Sending it to the retain endpoint via HTTP (batched for directories)
3. Measuring time taken and token usage
4. Reporting performance metrics

Usage:
    # Single file
    uv run python hindsight-dev/benchmarks/perf/retain_perf.py --document <file_path> [options]

    # Directory (batches all files)
    uv run python hindsight-dev/benchmarks/perf/retain_perf.py --document <dir_path> [options]
"""

import argparse
import asyncio
import json
import os
import sys
import time
from pathlib import Path
from typing import Any

import httpx
from rich.console import Console
from rich.table import Table

console = Console()


async def retain_via_memory_engine(
    bank_id: str,
    items: list[dict[str, Any]],
) -> tuple[float, dict[str, Any]]:
    """
    Send retain request directly to MemoryEngine (in-memory, no HTTP).

    Args:
        bank_id: Bank ID to retain into
        items: List of items to retain

    Returns:
        Tuple of (duration_seconds, response_data)
    """
    from hindsight_api import MemoryEngine
    from hindsight_api.models import RequestContext

    # Initialize memory engine
    memory = MemoryEngine(
        db_url=os.getenv("HINDSIGHT_API_DATABASE_URL", "pg0"),
        memory_llm_provider=os.getenv("HINDSIGHT_API_LLM_PROVIDER", "groq"),
        memory_llm_api_key=os.getenv("HINDSIGHT_API_LLM_API_KEY"),
        memory_llm_model=os.getenv("HINDSIGHT_API_LLM_MODEL", "openai/gpt-oss-20b"),
        memory_llm_base_url=os.getenv("HINDSIGHT_API_LLM_BASE_URL") or None,
    )
    await memory.initialize()

    # Measure time
    start_time = time.time()

    try:
        # Call retain_batch_async directly
        result, usage = await memory.retain_batch_async(
            bank_id=bank_id,
            contents=items,
            request_context=RequestContext(),
            return_usage=True,
        )

        duration = time.time() - start_time

        # Format response to match HTTP response structure
        response_data = {
            "success": True,
            "bank_id": bank_id,
            "items_count": len(items),
            "async": False,
            "usage": usage.model_dump() if usage else None,
        }

        return duration, response_data
    finally:
        # Close memory engine connections
        pool = await memory._get_pool()
        await pool.close()


async def retain_via_http(
    base_url: str,
    bank_id: str,
    items: list[dict[str, Any]],
    timeout: float = 300.0,
) -> tuple[float, dict[str, Any]]:
    """
    Send retain request via HTTP and measure performance.

    Args:
        base_url: API base URL (e.g., http://localhost:8000)
        bank_id: Bank ID to retain into
        items: List of items to retain (each with 'content' and optional 'context', 'metadata')
        timeout: Request timeout in seconds

    Returns:
        Tuple of (duration_seconds, response_data)
    """
    url = f"{base_url}/v1/default/banks/{bank_id}/memories"

    payload = {"items": items}

    headers = {"Content-Type": "application/json"}

    # Measure time
    start_time = time.time()

    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.post(url, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()

    duration = time.time() - start_time

    return duration, result


def load_documents(path: str) -> tuple[list[dict[str, Any]], int]:
    """
    Load document(s) from file or directory.

    For directories: loads all .json, .txt, and .md files
    For JSON files with 'content' field: extracts content
    For other files: reads entire file as content

    Returns:
        Tuple of (items_list, total_content_length)
        items_list: List of dicts with 'content' and optional 'metadata'/'context'
        total_content_length: Total character count across all documents
    """
    file_path = Path(path)
    if not file_path.exists():
        raise FileNotFoundError(f"Path not found: {path}")

    items = []
    total_length = 0

    if file_path.is_file():
        # Single file
        content, metadata = _load_single_file(file_path)
        total_length = len(content)
        item = {"content": content}
        if metadata:
            item["metadata"] = metadata
        items.append(item)
    else:
        # Directory - load all supported files
        supported_extensions = {".json", ".txt", ".md"}
        files = [f for f in file_path.rglob("*") if f.is_file() and f.suffix in supported_extensions]

        if not files:
            raise ValueError(f"No supported files (.json, .txt, .md) found in directory: {path}")

        console.print(f"Found {len(files)} files in directory")

        for file in sorted(files):
            try:
                content, metadata = _load_single_file(file)
                total_length += len(content)
                item = {"content": content}
                if metadata:
                    item["metadata"] = metadata
                # Add filename as context for batch processing
                item["context"] = f"Source: {file.name}"
                items.append(item)
            except Exception as e:
                console.print(f"[yellow]Warning: Failed to load {file.name}: {e}[/yellow]")
                continue

    return items, total_length


def _load_single_file(file_path: Path) -> tuple[str, dict[str, Any] | None]:
    """
    Load a single file and extract content.

    Returns:
        Tuple of (content, metadata)
    """
    if file_path.suffix == ".json":
        # Try to parse as JSON and extract 'content' field
        try:
            data = json.loads(file_path.read_text())
            if isinstance(data, dict) and "content" in data:
                # Extract metadata if present
                metadata = data.get("metadata", {})
                # Add doc_id to metadata if present
                if "doc_id" in data:
                    metadata["doc_id"] = data["doc_id"]
                return data["content"], metadata if metadata else None
            else:
                # Fallback: use entire JSON as string
                return file_path.read_text(), None
        except json.JSONDecodeError:
            # Not valid JSON, read as text
            return file_path.read_text(), None
    else:
        # Read as plain text
        return file_path.read_text(), None


def display_results(
    duration: float,
    usage: dict[str, int] | None,
    content_length: int,
    bank_id: str,
    num_documents: int,
) -> None:
    """Display benchmark results in a formatted table."""
    table = Table(title="Retain Performance Benchmark Results")
    table.add_column("Metric", style="cyan")
    table.add_column("Value", style="green")

    table.add_row("Bank ID", bank_id)
    table.add_row("Documents", f"{num_documents:,}")
    table.add_row("Total Content Length", f"{content_length:,} chars")
    if num_documents > 1:
        table.add_row("Avg Content/Doc", f"{content_length / num_documents:,.0f} chars")
    table.add_row("", "")  # Separator
    table.add_row("Duration", f"{duration:.3f}s")
    table.add_row("Throughput", f"{content_length / duration:,.0f} chars/sec")
    if num_documents > 1:
        table.add_row("Docs/Second", f"{num_documents / duration:.2f}")

    if usage:
        table.add_row("", "")  # Separator
        table.add_row("Input Tokens", f"{usage.get('input_tokens', 0):,}")
        table.add_row("Output Tokens", f"{usage.get('output_tokens', 0):,}")
        table.add_row("Total Tokens", f"{usage.get('total_tokens', 0):,}")
        table.add_row("Tokens/Second", f"{usage.get('total_tokens', 0) / duration:,.1f}")
        if num_documents > 1:
            table.add_row("Avg Tokens/Doc", f"{usage.get('total_tokens', 0) / num_documents:,.0f}")
    else:
        table.add_row("", "")  # Separator
        table.add_row("Token Usage", "Not available (async mode or error)")

    console.print("\n")
    console.print(table)


def save_results(
    output_path: Path,
    duration: float,
    usage: dict[str, int] | None,
    content_length: int,
    bank_id: str,
    document_path: str,
    num_documents: int,
) -> None:
    """Save results to JSON file."""
    results = {
        "bank_id": bank_id,
        "document_path": document_path,
        "num_documents": num_documents,
        "content_length": content_length,
        "avg_content_per_doc": content_length / num_documents if num_documents > 0 else 0,
        "duration_seconds": duration,
        "chars_per_second": content_length / duration,
        "docs_per_second": num_documents / duration if num_documents > 0 else 0,
        "usage": usage,
    }

    if usage:
        results["tokens_per_second"] = usage.get("total_tokens", 0) / duration
        results["avg_tokens_per_doc"] = usage.get("total_tokens", 0) / num_documents if num_documents > 0 else 0

    with open(output_path, "w") as f:
        json.dump(results, f, indent=2)

    console.print(f"\n[green]✓[/green] Results saved to {output_path}")


async def main():
    """Run the retain performance benchmark."""
    parser = argparse.ArgumentParser(
        description="Benchmark retain operation performance",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Benchmark with a single document file
  uv run python hindsight-dev/benchmarks/perf/retain_perf.py \\
      --document ./test_data/large_doc.txt \\
      --bank-id perf-test-001

  # Benchmark with a directory (batches all files)
  uv run python hindsight-dev/benchmarks/perf/retain_perf.py \\
      --document ~/Documents/my-docs/ \\
      --bank-id perf-test-batch \\
      --output results/batch_perf.json

  # With custom API URL and save results
  uv run python hindsight-dev/benchmarks/perf/retain_perf.py \\
      --document ./test_data/ \\
      --bank-id perf-test-001 \\
      --api-url http://localhost:8000 \\
      --output results/retain_perf_001.json
        """,
    )

    parser.add_argument(
        "--document",
        required=True,
        help="Path to document file or directory (for directories, batches all .json/.txt/.md files)",
    )
    parser.add_argument(
        "--bank-id",
        default="perf-test",
        help="Bank ID to use (default: perf-test)",
    )
    parser.add_argument(
        "--context",
        help="Optional context for the retain operation (only used for single file mode)",
    )
    parser.add_argument(
        "--api-url",
        default="http://localhost:8000",
        help="API base URL (default: http://localhost:8000)",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=300.0,
        help="Request timeout in seconds (default: 300)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Path to save results JSON (optional)",
    )
    parser.add_argument(
        "--in-memory",
        action="store_true",
        help="Use in-memory MemoryEngine instead of HTTP (bypasses API server, useful for isolating performance)",
    )

    args = parser.parse_args()

    console.print("\n[bold cyan]Retain Performance Benchmark[/bold cyan]")
    console.print("=" * 80)

    # Check mode
    if args.in_memory:
        console.print("\n[cyan]Mode: IN-MEMORY (direct MemoryEngine, no HTTP)[/cyan]")
    else:
        console.print(f"\n[cyan]Mode: HTTP (via {args.api_url})[/cyan]")

    # Check if server is running (skip for in-memory mode)
    if not args.in_memory:
        console.print(f"\n[1] Checking API server at {args.api_url}...")
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{args.api_url}/health", timeout=5.0)
                response.raise_for_status()
            console.print("    [green]✓[/green] API server is running")
        except Exception as e:
            console.print(f"    [red]✗[/red] API server is not accessible: {e}")
            console.print("\n[yellow]Please ensure the API server is running:[/yellow]")
            console.print("  ./scripts/dev/start-api.sh")
            sys.exit(1)

    # Load document(s)
    doc_path = Path(args.document)
    if doc_path.is_dir():
        console.print(f"\n[2] Loading documents from directory {args.document}...")
    else:
        console.print(f"\n[2] Loading document from {args.document}...")

    try:
        items, total_content_length = load_documents(args.document)
        num_docs = len(items)

        # Add context to single file if provided
        if num_docs == 1 and args.context:
            items[0]["context"] = args.context

        console.print(
            f"    [green]✓[/green] Loaded {num_docs:,} document{'s' if num_docs > 1 else ''} ({total_content_length:,} characters)"
        )
        if num_docs > 1:
            console.print(
                f"    [cyan]Average content per document: {total_content_length / num_docs:,.0f} chars[/cyan]"
            )
    except Exception as e:
        console.print(f"    [red]✗[/red] Failed to load documents: {e}")
        sys.exit(1)

    # Run benchmark
    console.print(f"\n[3] {'Processing' if args.in_memory else 'Sending retain request to'} bank '{args.bank_id}'...")
    console.print(f"    [cyan]Retaining {num_docs:,} document{'s' if num_docs > 1 else ''} in batch...[/cyan]")
    try:
        if args.in_memory:
            # In-memory mode: call MemoryEngine directly
            duration, result = await retain_via_memory_engine(
                bank_id=args.bank_id,
                items=items,
            )
        else:
            # HTTP mode: call API endpoint
            duration, result = await retain_via_http(
                base_url=args.api_url,
                bank_id=args.bank_id,
                items=items,
                timeout=args.timeout,
            )
        console.print(f"    [green]✓[/green] Retain completed in {duration:.3f}s")

        # Extract usage
        usage = result.get("usage")

    except httpx.HTTPStatusError as e:
        console.print(f"    [red]✗[/red] HTTP error: {e.response.status_code}")
        console.print(f"    Response: {e.response.text}")
        sys.exit(1)
    except Exception as e:
        console.print(f"    [red]✗[/red] Request failed: {e}")
        sys.exit(1)

    # Display results
    console.print("\n[4] Results:")
    display_results(
        duration=duration,
        usage=usage,
        content_length=total_content_length,
        bank_id=args.bank_id,
        num_documents=num_docs,
    )

    # Save results if requested
    if args.output:
        console.print("\n[5] Saving results...")
        args.output.parent.mkdir(parents=True, exist_ok=True)
        save_results(
            output_path=args.output,
            duration=duration,
            usage=usage,
            content_length=total_content_length,
            bank_id=args.bank_id,
            document_path=args.document,
            num_documents=num_docs,
        )

    console.print("\n[bold green]✓ Benchmark Complete![/bold green]\n")


if __name__ == "__main__":
    asyncio.run(main())
