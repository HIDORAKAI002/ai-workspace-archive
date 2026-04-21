"""CLI command group for monorepo sync operations."""

import json
from dataclasses import asdict
from pathlib import Path

import click
from rich.console import Console

from automation.dagster_dev.monorepo_sync.audit import (
    CompletenessResult,
    CorrectnessResult,
    audit_inbound_completeness,
    audit_inbound_correctness,
    audit_outbound_completeness,
    audit_outbound_correctness,
    format_commit_info_short,
    format_mismatch,
)
from automation.dagster_dev.monorepo_sync.config import SYNC_CONFIGS, SyncConfig, get_sync_config

SYNC_CHOICES = ["dagster-inbound", "dagster-outbound", "skills-inbound", "skills-outbound", "all"]
CHECK_CHOICES = ["completeness", "correctness", "all"]
FORMAT_CHOICES = ["text", "json"]


def _detect_internal_repo() -> Path:
    """Walk up from CWD looking for the internal repo root."""
    candidate = Path.cwd()
    for _ in range(20):
        if (candidate / "dagster-oss").is_dir() and (candidate / "copy.bara.sky").is_file():
            return candidate
        parent = candidate.parent
        if parent == candidate:
            break
        candidate = parent
    raise click.ClickException(
        "Could not detect internal repo root. Use --internal-repo to specify it."
    )


def _run_checks(
    configs: list[SyncConfig],
    checks: list[str],
    public_repo: Path,
    internal_repo: Path,
) -> list[CompletenessResult | CorrectnessResult]:
    """Run the requested checks for the given configs."""
    results: list[CompletenessResult | CorrectnessResult] = []

    for config in configs:
        if "completeness" in checks:
            if config.direction == "inbound":
                results.append(
                    audit_inbound_completeness(
                        public_repo=public_repo,
                        internal_repo=internal_repo,
                        config=config,
                    )
                )
            else:
                results.append(
                    audit_outbound_completeness(
                        public_repo=public_repo,
                        internal_repo=internal_repo,
                        config=config,
                    )
                )

        if "correctness" in checks:
            if config.direction == "inbound":
                results.append(
                    audit_inbound_correctness(
                        public_repo=public_repo,
                        internal_repo=internal_repo,
                        config=config,
                    )
                )
            else:
                results.append(
                    audit_outbound_correctness(
                        public_repo=public_repo,
                        internal_repo=internal_repo,
                        config=config,
                    )
                )

    return results


# ########################
# ##### TEXT OUTPUT
# ########################


def _print_completeness_text(console: Console, result: CompletenessResult) -> None:
    header = f"{result.direction.upper()} completeness: {result.source_repo_name} -> {result.dest_repo_name}"
    console.print(f"\n[bold]{header}[/bold]")
    console.print(f"  Synced commits: {result.synced_count}")

    if not result.missing:
        console.print("  [green]All commits synced.[/green]")
        return

    console.print(f"  [red]Missing {len(result.missing)} commit(s):[/red]")
    for commit in result.missing[:10]:
        console.print(f"    {format_commit_info_short(commit)}")
    if len(result.missing) > 10:
        console.print(f"    ... and {len(result.missing)} total")


def _print_correctness_text(console: Console, result: CorrectnessResult) -> None:
    header = f"{result.direction.upper()} correctness: {result.source_repo_name} -> {result.dest_repo_name}"
    console.print(f"\n[bold]{header}[/bold]")
    console.print(f"  Synced commits: {result.synced_count}")

    unknown = [m for m in result.mismatches if not m.known_incorrect]
    known = [m for m in result.mismatches if m.known_incorrect]

    if not result.mismatches:
        console.print("  [green]All synced commits are correct.[/green]")
        return

    if unknown:
        console.print(f"  [red]{len(unknown)} NEW mismatch(es):[/red]")
        for m in unknown:
            console.print(format_mismatch(m, result.source_repo_name, result.dest_repo_name))

    if known:
        console.print(f"  [dim]{len(known)} known mismatch(es) (already addressed):[/dim]")
        for m in known:
            console.print(
                format_mismatch(m, result.source_repo_name, result.dest_repo_name),
                style="dim",
            )


def _print_text(results: list[CompletenessResult | CorrectnessResult]) -> None:
    console = Console()
    for result in results:
        if isinstance(result, CompletenessResult):
            _print_completeness_text(console, result)
        elif isinstance(result, CorrectnessResult):
            _print_correctness_text(console, result)


# ########################
# ##### JSON OUTPUT
# ########################


def _to_json(results: list[CompletenessResult | CorrectnessResult]) -> str:
    return json.dumps(
        {"results": [asdict(r) for r in results]},
        indent=2,
    )


# ########################
# ##### CLI
# ########################


@click.group(name="monorepo-sync")
def monorepo_sync():
    """Monorepo sync tools (copybara sync between internal and public repos)."""
    pass


@monorepo_sync.command()
@click.option(
    "-s",
    "--sync",
    "sync_name",
    type=click.Choice(SYNC_CHOICES, case_sensitive=False),
    default="all",
    help="Which sync pair to audit.",
)
@click.option(
    "-c",
    "--check",
    "check_name",
    type=click.Choice(CHECK_CHOICES, case_sensitive=False),
    default="all",
    help="Which check to run.",
)
@click.option(
    "-f",
    "--format",
    "output_format",
    type=click.Choice(FORMAT_CHOICES, case_sensitive=False),
    default="text",
    help="Output format.",
)
@click.option(
    "--dagster-repo",
    "dagster_repo_path",
    type=click.Path(exists=True),
    default=None,
    help="Path to dagster-io/dagster clone. Required for dagster-* syncs.",
)
@click.option(
    "--skills-repo",
    "skills_repo_path",
    type=click.Path(exists=True),
    default=None,
    help="Path to dagster-io/skills clone. Required for skills-* syncs.",
)
@click.option(
    "--internal-repo",
    "internal_repo_path",
    type=click.Path(exists=True),
    default=None,
    help="Path to internal repo. If omitted, auto-detects from CWD.",
)
def audit(
    sync_name: str,
    check_name: str,
    output_format: str,
    dagster_repo_path: str | None,
    skills_repo_path: str | None,
    internal_repo_path: str | None,
):
    """Audit completeness and correctness of copybara syncs.

    Checks that commits are synced between internal and public repos, and
    that synced commits touch the same set of files as their partners.

    Examples:
        dagster-dev monorepo-sync audit --dagster-repo /path/to/dagster --skills-repo /path/to/skills

        dagster-dev monorepo-sync audit --dagster-repo /path/to/dagster -s dagster-outbound -c correctness

        dagster-dev monorepo-sync audit --dagster-repo /path/to/dagster -f json
    """
    internal_repo = Path(internal_repo_path) if internal_repo_path else _detect_internal_repo()

    checks = ["completeness", "correctness"] if check_name == "all" else [check_name]

    if sync_name == "all":
        configs_to_run = list(SYNC_CONFIGS)
    else:
        configs_to_run = [get_sync_config(sync_name)]

    # Validate that required repo paths are provided
    slugs_needed = {c.public_repo_slug for c in configs_to_run}
    slug_to_repo: dict[str, Path] = {}
    if "dagster" in slugs_needed:
        if not dagster_repo_path:
            raise click.ClickException("--dagster-repo is required for dagster-* syncs.")
        slug_to_repo["dagster"] = Path(dagster_repo_path)
    if "skills" in slugs_needed:
        if not skills_repo_path:
            raise click.ClickException("--skills-repo is required for skills-* syncs.")
        slug_to_repo["skills"] = Path(skills_repo_path)

    all_results: list[CompletenessResult | CorrectnessResult] = []
    for slug, public_repo in slug_to_repo.items():
        slug_configs = [c for c in configs_to_run if c.public_repo_slug == slug]
        all_results.extend(_run_checks(slug_configs, checks, public_repo, internal_repo))

    if output_format == "json":
        click.echo(_to_json(all_results))
    else:
        _print_text(all_results)
