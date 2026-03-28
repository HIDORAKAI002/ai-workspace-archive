import argparse
import sys
from pathlib import Path

from .config import load_config, expand_target_arg


def main():
    parser = argparse.ArgumentParser(
        prog="promptdeploy",
        description="Deploy prompts, agents, skills, and MCP servers to multiple tools.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    # deploy subcommand
    deploy_parser = subparsers.add_parser("deploy", help="Deploy items to targets")
    deploy_parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be done without making changes",
    )
    deploy_parser.add_argument(
        "--target", action="append", help="Target environment(s) to deploy to"
    )
    deploy_parser.add_argument(
        "--only-type",
        action="append",
        choices=["agents", "commands", "skills", "mcp", "models", "hooks"],
        help="Only deploy specific item types",
    )
    deploy_parser.add_argument("--verbose", action="store_true", help="Verbose output")
    deploy_parser.add_argument("--quiet", action="store_true", help="Suppress output")
    deploy_parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite items even when unchanged or pre-existing",
    )
    deploy_parser.add_argument(
        "--target-root",
        type=Path,
        metavar="DIR",
        help="Redirect all deployment output under DIR (using target IDs as subdirectories)",
    )

    # validate subcommand
    subparsers.add_parser("validate", help="Validate source items and configuration")

    # status subcommand
    status_parser = subparsers.add_parser("status", help="Show deployment status")
    status_parser.add_argument(
        "--target", action="append", help="Target environment(s) to check"
    )
    status_parser.add_argument(
        "--target-root",
        type=Path,
        metavar="DIR",
        help="Redirect all deployment output under DIR (using target IDs as subdirectories)",
    )

    # list subcommand
    list_parser = subparsers.add_parser("list", help="List deployable items")
    list_parser.add_argument(
        "--target", action="append", help="Filter by target environment(s)"
    )
    list_parser.add_argument(
        "--target-root",
        type=Path,
        metavar="DIR",
        help="Redirect all deployment output under DIR (using target IDs as subdirectories)",
    )

    args = parser.parse_args()

    if args.command == "deploy":
        _run_deploy(args)
    elif args.command == "validate":
        _run_validate()
    elif args.command == "status":
        _run_status(args)
    elif args.command == "list":
        _run_list(args)


def _run_deploy(args):
    from .deploy import deploy
    from .filters import FilterError
    from .output import Output, Verbosity

    if args.verbose:
        verbosity = Verbosity.VERBOSE
    elif args.quiet:
        verbosity = Verbosity.QUIET
    else:
        verbosity = Verbosity.NORMAL

    out = Output(verbosity)
    out.start_timer()

    config = load_config()

    from .envsubst import load_dotenv

    load_dotenv(config.source_root / ".env")

    if args.target_root:
        from .config import remap_targets_to_root

        config = remap_targets_to_root(config, args.target_root.resolve())
    target_ids = expand_target_arg(args.target, config)

    try:
        actions = deploy(
            config,
            target_ids=target_ids,
            dry_run=args.dry_run,
            verbose=args.verbose,
            quiet=args.quiet,
            item_types=args.only_type,
            force=args.force,
        )
    except FilterError as exc:
        out.error(str(exc))
        sys.exit(1)

    prefix = "[dry-run] " if args.dry_run else ""
    symbols = {
        "create": "A",
        "update": "M",
        "remove": "D",
        "skip": " ",
        "pre-existing": "P",
    }

    for act in actions:
        if act.action == "skip" and verbosity < Verbosity.VERBOSE:
            continue
        symbol = symbols.get(act.action, "?")
        out.action(symbol, act.item_type, act.name, act.target_id, prefix=prefix)

    created = sum(1 for a in actions if a.action == "create")
    updated = sum(1 for a in actions if a.action == "update")
    removed = sum(1 for a in actions if a.action == "remove")
    skipped = sum(1 for a in actions if a.action == "skip")
    pre_existing = sum(1 for a in actions if a.action == "pre-existing")
    out.summary(
        created, updated, removed, skipped, pre_existing=pre_existing, prefix=prefix
    )


def _run_validate():
    from .validate import validate_all

    config = load_config()
    issues = validate_all(config)
    if not issues:
        print("All items valid.")
        return
    errors = 0
    warnings = 0
    for issue in issues:
        prefix = "ERROR" if issue.level == "error" else "WARNING"
        line_info = f":{issue.line}" if issue.line else ""
        print(f"{prefix}: {issue.file_path}{line_info}: {issue.message}")
        if issue.level == "error":
            errors += 1
        else:
            warnings += 1
    print(f"\n{errors} error(s), {warnings} warning(s)")
    if errors > 0:
        sys.exit(1)


def _run_status(args):
    from .status import get_status

    config = load_config()
    if args.target_root:
        from .config import remap_targets_to_root

        config = remap_targets_to_root(config, args.target_root.resolve())
    target_ids = expand_target_arg(args.target, config)
    entries = get_status(config, target_ids)
    if not entries:
        print("No items to report.")
        return
    for entry in entries:
        symbol = {
            "current": " ",
            "changed": "M",
            "new": "A",
            "pending_removal": "D",
        }.get(entry.state, "?")
        print(f"  {symbol}  {entry.item_type:8s} {entry.name:30s} -> {entry.target_id}")


def _run_list(args):
    from .manifest import load_manifest
    from .targets import create_target

    config = load_config()
    if args.target_root:
        from .config import remap_targets_to_root

        config = remap_targets_to_root(config, args.target_root.resolve())
    target_ids = expand_target_arg(args.target, config)

    for target_id in target_ids:
        target_config = config.targets[target_id]
        target = create_target(target_config)
        try:
            target.prepare()

            if not target.exists():
                print(f"{target_id} (not installed)")
                continue

            manifest = load_manifest(target.manifest_path())
            total = sum(len(items) for items in manifest.items.values())

            if total == 0:
                print(f"{target_id}: no managed items")
                continue

            print(f"{target_id}:")
            category_labels = {
                "agents": "Agents",
                "commands": "Commands",
                "skills": "Skills",
                "mcp_servers": "MCP Servers",
                "models": "Models",
                "hooks": "Hooks",
            }
            for category in (
                "agents",
                "commands",
                "skills",
                "mcp_servers",
                "models",
                "hooks",
            ):
                items = manifest.items.get(category, {})
                if not items:
                    continue
                label = category_labels.get(category, category)
                print(f"  {label}:")
                for name in sorted(items):
                    print(f"    - {name}")
        finally:
            target.cleanup()


if __name__ == "__main__":
    main()
