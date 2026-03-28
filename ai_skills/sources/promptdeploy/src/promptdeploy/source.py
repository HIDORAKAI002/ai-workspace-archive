"""Source item discovery for prompts, agents, skills, and MCP servers."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterator, List, Optional

import yaml

from promptdeploy.filetags import parse_filetags
from promptdeploy.frontmatter import parse_frontmatter


@dataclass
class SourceItem:
    """A discovered source item ready for deployment."""

    item_type: str  # 'agent', 'command', 'skill', 'mcp', 'models', 'hook'
    name: str
    path: Path
    metadata: Optional[dict]
    content: bytes
    filetags: List[str] = field(default_factory=list)


class SourceDiscovery:
    """Discovers deployable items from a source root directory."""

    def __init__(self, source_root: Path) -> None:
        self.source_root = source_root

    def discover_all(self) -> Iterator[SourceItem]:
        """Yield all discoverable source items."""
        yield from self.discover_agents()
        yield from self.discover_commands()
        yield from self.discover_skills()
        yield from self.discover_mcp_servers()
        yield from self.discover_models()
        yield from self.discover_hooks()

    def discover_agents(self) -> Iterator[SourceItem]:
        """Discover agent definitions from agents/*.md."""
        agents_dir = self.source_root / "agents"
        if not agents_dir.is_dir():
            return
        for path in sorted(agents_dir.iterdir()):
            if path.name.startswith(".") or path.suffix != ".md":
                continue
            yield self._load_markdown_item("agent", path)

    def discover_commands(self) -> Iterator[SourceItem]:
        """Discover command prompts from commands/*.md."""
        commands_dir = self.source_root / "commands"
        if not commands_dir.is_dir():
            return
        for path in sorted(commands_dir.iterdir()):
            if path.name.startswith(".") or path.suffix != ".md":
                continue
            yield self._load_markdown_item("command", path)

    def discover_skills(self) -> Iterator[SourceItem]:
        """Discover skills from skills/*/SKILL.md."""
        skills_dir = self.source_root / "skills"
        if not skills_dir.is_dir():
            return
        skip_names = {"README.md", "agent_skills_spec.md"}
        for entry in sorted(skills_dir.iterdir()):
            if entry.name.startswith(".") or entry.name in skip_names:
                continue
            if not entry.is_dir():
                continue
            skill_md = entry / "SKILL.md"
            if not skill_md.exists():
                continue
            # Parse filetags from directory name
            base_name, tags = parse_filetags(entry.name)
            # Resolve symlinks for content but preserve original path
            resolved = skill_md.resolve()
            content = resolved.read_bytes()
            metadata, _ = parse_frontmatter(content)
            name = (metadata or {}).get("name", base_name)
            yield SourceItem(
                item_type="skill",
                name=name,
                path=skill_md,
                metadata=metadata,
                content=content,
                filetags=tags,
            )

    def discover_mcp_servers(self) -> Iterator[SourceItem]:
        """Discover MCP server configs from mcp/*.yaml."""
        mcp_dir = self.source_root / "mcp"
        if not mcp_dir.is_dir():
            return
        for path in sorted(mcp_dir.iterdir()):
            if path.name.startswith(".") or path.suffix != ".yaml":
                continue
            base_name, tags = parse_filetags(path.stem)
            content = path.read_bytes()
            try:
                metadata = yaml.safe_load(content)
            except yaml.YAMLError:
                metadata = None
            if not isinstance(metadata, dict):
                metadata = None
            name = (metadata or {}).get("name", base_name)
            yield SourceItem(
                item_type="mcp",
                name=name,
                path=path,
                metadata=metadata,
                content=content,
                filetags=tags,
            )

    def discover_models(self) -> Iterator[SourceItem]:
        """Discover model definitions from models.yaml."""
        models_path = self.source_root / "models.yaml"
        if not models_path.exists():
            return
        content = models_path.read_bytes()
        try:
            metadata = yaml.safe_load(content)
        except yaml.YAMLError:
            metadata = None
        if not isinstance(metadata, dict):
            metadata = None
        yield SourceItem(
            item_type="models",
            name="models",
            path=models_path,
            metadata=metadata,
            content=content,
        )

    def discover_hooks(self) -> Iterator[SourceItem]:
        """Discover hook group configs from hooks/*.yaml."""
        hooks_dir = self.source_root / "hooks"
        if not hooks_dir.is_dir():
            return
        for path in sorted(hooks_dir.iterdir()):
            if path.name.startswith(".") or path.suffix != ".yaml":
                continue
            base_name, tags = parse_filetags(path.stem)
            content = path.read_bytes()
            try:
                metadata = yaml.safe_load(content)
            except yaml.YAMLError:
                metadata = None
            if not isinstance(metadata, dict):
                metadata = None
            name = (metadata or {}).get("name", base_name)
            yield SourceItem(
                item_type="hook",
                name=name,
                path=path,
                metadata=metadata,
                content=content,
                filetags=tags,
            )

    def _load_markdown_item(self, item_type: str, path: Path) -> SourceItem:
        """Load a markdown file as a SourceItem, parsing frontmatter for metadata."""
        base_name, tags = parse_filetags(path.stem)
        resolved = path.resolve()
        content = resolved.read_bytes()
        metadata, _ = parse_frontmatter(content)
        name = (metadata or {}).get("name", base_name)
        return SourceItem(
            item_type=item_type,
            name=name,
            path=path,
            metadata=metadata,
            content=content,
            filetags=tags,
        )
