"""Tests for source item discovery against the actual repo structure."""

from pathlib import Path

import pytest

from promptdeploy.source import SourceDiscovery, SourceItem

# Test against the actual repo at the project root
REPO_ROOT = Path(__file__).parent.parent


@pytest.fixture
def discovery():
    return SourceDiscovery(REPO_ROOT)


class TestSourceItem:
    def test_fields(self):
        item = SourceItem(
            item_type="agent",
            name="test",
            path=Path("/tmp/test.md"),
            metadata={"name": "test"},
            content=b"content",
        )
        assert item.item_type == "agent"
        assert item.name == "test"
        assert item.path == Path("/tmp/test.md")
        assert item.metadata == {"name": "test"}
        assert item.content == b"content"

    def test_none_metadata(self):
        item = SourceItem("agent", "test", Path("/tmp/x"), None, b"")
        assert item.metadata is None


class TestDiscoverAgents:
    def test_discovers_agents(self, discovery):
        agents = list(discovery.discover_agents())
        assert len(agents) >= 20
        names = {a.name for a in agents}
        assert "rust-pro" in names
        assert "python-reviewer" in names
        assert "haskell-pro" in names

    def test_agent_properties(self, discovery):
        agents = list(discovery.discover_agents())
        for agent in agents:
            assert agent.item_type == "agent"
            assert agent.path.suffix == ".md"
            assert agent.path.parent.name == "agents"
            assert len(agent.content) > 0
            assert not agent.path.name.startswith(".")

    def test_agents_have_frontmatter(self, discovery):
        agents = list(discovery.discover_agents())
        for agent in agents:
            assert agent.metadata is not None
            assert "name" in agent.metadata
            assert "description" in agent.metadata

    def test_agent_name_from_frontmatter(self, discovery):
        agents = {a.name: a for a in discovery.discover_agents()}
        rust = agents["rust-pro"]
        assert rust.metadata["name"] == "rust-pro"
        assert rust.path.name == "rust-pro.md"


class TestDiscoverCommands:
    def test_discovers_commands(self, discovery):
        commands = list(discovery.discover_commands())
        assert len(commands) >= 30
        names = {c.name for c in commands}
        assert "commit" in names
        assert "fix" in names
        assert "forge" in names

    def test_command_properties(self, discovery):
        commands = list(discovery.discover_commands())
        for cmd in commands:
            assert cmd.item_type == "command"
            assert cmd.path.suffix == ".md"
            assert cmd.path.parent.name == "commands"
            assert len(cmd.content) > 0
            assert not cmd.path.name.startswith(".")

    def test_command_name_fallback_to_stem(self, discovery):
        from promptdeploy.filetags import parse_filetags

        commands = list(discovery.discover_commands())
        for cmd in commands:
            # Name comes from frontmatter 'name' or falls back to stem
            # (with filetags stripped)
            if cmd.metadata and "name" in cmd.metadata:
                assert cmd.name == cmd.metadata["name"]
            else:
                base_name, _ = parse_filetags(cmd.path.stem)
                assert cmd.name == base_name


class TestDiscoverSkills:
    def test_discovers_skills(self, discovery):
        skills = list(discovery.discover_skills())
        assert len(skills) >= 7
        names = {s.name for s in skills}
        assert "forge" in names
        assert "caveman" in names

    def test_skill_properties(self, discovery):
        skills = list(discovery.discover_skills())
        for skill in skills:
            assert skill.item_type == "skill"
            assert skill.path.name == "SKILL.md"
            assert len(skill.content) > 0

    def test_skills_have_frontmatter(self, discovery):
        skills = list(discovery.discover_skills())
        for skill in skills:
            assert skill.metadata is not None
            assert "name" in skill.metadata
            assert "description" in skill.metadata

    def test_symlinked_skills_discovered(self, tmp_path):
        # Create a real skill directory and symlink to it
        real_skill = tmp_path / "real-skill"
        real_skill.mkdir()
        (real_skill / "SKILL.md").write_bytes(
            b"---\nname: linked-skill\ndescription: A linked skill\n---\nBody.\n"
        )

        src = tmp_path / "source"
        src.mkdir()
        skills_dir = src / "skills"
        skills_dir.mkdir()
        (skills_dir / "linked-skill").symlink_to(real_skill)

        disc = SourceDiscovery(src)
        skills = {s.name: s for s in disc.discover_skills()}
        assert "linked-skill" in skills
        linked = skills["linked-skill"]
        assert linked.path == src / "skills" / "linked-skill" / "SKILL.md"
        assert len(linked.content) > 0

    def test_skips_non_skill_entries(self, discovery):
        skills = list(discovery.discover_skills())
        names = {s.name for s in skills}
        paths = {s.path.parent.name for s in skills}
        # These should be skipped
        assert ".claude-plugin" not in paths
        assert ".gitignore" not in names

    def test_skips_humanizer_no_skill_md(self, discovery):
        """humanizer/ exists but has no SKILL.md, so should be skipped."""
        skills = list(discovery.discover_skills())
        skill_dirs = {s.path.parent.name for s in skills}
        assert "humanizer" not in skill_dirs


class TestDiscoverMcpServers:
    def test_discovers_mcp_servers(self, discovery):
        mcps = list(discovery.discover_mcp_servers())
        assert len(mcps) >= 3
        names = {m.name for m in mcps}
        assert "perplexity" in names

    def test_mcp_properties(self, discovery):
        mcps = list(discovery.discover_mcp_servers())
        for mcp in mcps:
            assert mcp.item_type == "mcp"
            assert mcp.path.suffix == ".yaml"
            assert mcp.path.parent.name == "mcp"
            assert len(mcp.content) > 0

    def test_mcp_full_yaml_parse(self, discovery):
        mcps = {m.name: m for m in discovery.discover_mcp_servers()}
        ctx = mcps["context7"]
        assert ctx.metadata is not None
        assert "command" in ctx.metadata
        assert "args" in ctx.metadata

    def test_mcp_skips_non_yaml(self, discovery):
        mcps = list(discovery.discover_mcp_servers())
        for mcp in mcps:
            assert mcp.path.suffix == ".yaml"
        # schema.md should not appear
        names = {m.path.name for m in mcps}
        assert "schema.md" not in names


class TestDiscoverAll:
    def test_yields_all_types(self, discovery):
        items = list(discovery.discover_all())
        types = {item.item_type for item in items}
        assert types == {"agent", "command", "skill", "mcp", "models", "hook"}

    def test_total_count(self, discovery):
        items = list(discovery.discover_all())
        assert len(items) >= 60

    def test_order(self, discovery):
        """Items appear in order: agents, commands, skills, mcp, models, hooks."""
        items = list(discovery.discover_all())
        types_seen = []
        for item in items:
            if not types_seen or types_seen[-1] != item.item_type:
                types_seen.append(item.item_type)
        assert types_seen == ["agent", "command", "skill", "mcp", "models", "hook"]


class TestFiletagParsing:
    """Filetags in filenames are parsed and stored on SourceItem."""

    def test_command_filetags_parsed(self, tmp_path):
        commands_dir = tmp_path / "commands"
        commands_dir.mkdir()
        (commands_dir / "heavy -- positron.md").write_bytes(b"Heavy body.\n")
        d = SourceDiscovery(tmp_path)
        commands = list(d.discover_commands())
        assert len(commands) == 1
        assert commands[0].name == "heavy"
        assert commands[0].filetags == ["positron"]

    def test_command_multiple_filetags(self, tmp_path):
        commands_dir = tmp_path / "commands"
        commands_dir.mkdir()
        (commands_dir / "heavy -- positron local.md").write_bytes(b"Body.\n")
        d = SourceDiscovery(tmp_path)
        commands = list(d.discover_commands())
        assert len(commands) == 1
        assert commands[0].name == "heavy"
        assert commands[0].filetags == ["positron", "local"]

    def test_command_no_filetags(self, tmp_path):
        commands_dir = tmp_path / "commands"
        commands_dir.mkdir()
        (commands_dir / "simple.md").write_bytes(b"Body.\n")
        d = SourceDiscovery(tmp_path)
        commands = list(d.discover_commands())
        assert len(commands) == 1
        assert commands[0].name == "simple"
        assert commands[0].filetags == []

    def test_agent_filetags_parsed(self, tmp_path):
        agents_dir = tmp_path / "agents"
        agents_dir.mkdir()
        (agents_dir / "helper -- personal.md").write_bytes(
            b"---\nname: helper\ndescription: test\n---\nBody.\n"
        )
        d = SourceDiscovery(tmp_path)
        agents = list(d.discover_agents())
        assert len(agents) == 1
        assert agents[0].name == "helper"
        assert agents[0].filetags == ["personal"]

    def test_skill_filetags_from_dirname(self, tmp_path):
        skills_dir = tmp_path / "skills"
        skill = skills_dir / "my-skill -- positron"
        skill.mkdir(parents=True)
        (skill / "SKILL.md").write_bytes(
            b"---\nname: my-skill\ndescription: A skill\n---\nBody.\n"
        )
        d = SourceDiscovery(tmp_path)
        skills = list(d.discover_skills())
        assert len(skills) == 1
        assert skills[0].name == "my-skill"
        assert skills[0].filetags == ["positron"]

    def test_mcp_filetags_parsed(self, tmp_path):
        mcp_dir = tmp_path / "mcp"
        mcp_dir.mkdir()
        (mcp_dir / "server -- personal.yaml").write_bytes(
            b"name: server\ncommand: echo\n"
        )
        d = SourceDiscovery(tmp_path)
        mcps = list(d.discover_mcp_servers())
        assert len(mcps) == 1
        assert mcps[0].name == "server"
        assert mcps[0].filetags == ["personal"]

    def test_hook_filetags_parsed(self, tmp_path):
        hooks_dir = tmp_path / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / "my-hook -- claude.yaml").write_bytes(
            b"name: my-hook\nhooks: {}\n"
        )
        d = SourceDiscovery(tmp_path)
        hooks = list(d.discover_hooks())
        assert len(hooks) == 1
        assert hooks[0].name == "my-hook"
        assert hooks[0].filetags == ["claude"]

    def test_models_no_filetags(self, tmp_path):
        (tmp_path / "models.yaml").write_bytes(b"providers: {}\n")
        d = SourceDiscovery(tmp_path)
        models = list(d.discover_models())
        assert len(models) == 1
        assert models[0].filetags == []

    def test_frontmatter_name_overrides_filetag_base(self, tmp_path):
        commands_dir = tmp_path / "commands"
        commands_dir.mkdir()
        (commands_dir / "heavy -- positron.md").write_bytes(
            b"---\nname: custom-name\n---\nBody.\n"
        )
        d = SourceDiscovery(tmp_path)
        commands = list(d.discover_commands())
        assert len(commands) == 1
        assert commands[0].name == "custom-name"
        assert commands[0].filetags == ["positron"]

    def test_real_heavy_command(self, discovery):
        """The actual heavy -- positron.md file in the repo is parsed correctly."""
        commands = {c.name: c for c in discovery.discover_commands()}
        assert "heavy" in commands
        heavy = commands["heavy"]
        assert heavy.filetags == ["positron"]


class TestNonExistentDirectories:
    def test_missing_agents_dir(self, tmp_path):
        d = SourceDiscovery(tmp_path)
        assert list(d.discover_agents()) == []

    def test_missing_commands_dir(self, tmp_path):
        d = SourceDiscovery(tmp_path)
        assert list(d.discover_commands()) == []

    def test_missing_skills_dir(self, tmp_path):
        d = SourceDiscovery(tmp_path)
        assert list(d.discover_skills()) == []

    def test_missing_mcp_dir(self, tmp_path):
        d = SourceDiscovery(tmp_path)
        assert list(d.discover_mcp_servers()) == []

    def test_discover_all_empty(self, tmp_path):
        d = SourceDiscovery(tmp_path)
        assert list(d.discover_all()) == []


class TestDotfileSkipping:
    def test_dotfiles_ignored_in_agents(self, tmp_path):
        agents_dir = tmp_path / "agents"
        agents_dir.mkdir()
        (agents_dir / ".hidden.md").write_bytes(b"---\nname: hidden\n---\n")
        (agents_dir / "visible.md").write_bytes(b"---\nname: visible\n---\n")
        d = SourceDiscovery(tmp_path)
        names = [a.name for a in d.discover_agents()]
        assert "visible" in names
        assert "hidden" not in names

    def test_dotfiles_ignored_in_skills(self, tmp_path):
        skills_dir = tmp_path / "skills"
        skills_dir.mkdir()
        hidden = skills_dir / ".hidden-skill"
        hidden.mkdir()
        (hidden / "SKILL.md").write_bytes(b"---\nname: hidden\n---\n")
        visible = skills_dir / "real-skill"
        visible.mkdir()
        (visible / "SKILL.md").write_bytes(b"---\nname: real\n---\n")
        d = SourceDiscovery(tmp_path)
        names = [s.name for s in d.discover_skills()]
        assert "real" in names
        assert "hidden" not in names


class TestNonMdFilesInCommands:
    def test_non_md_files_ignored_in_commands(self, tmp_path):
        """Non-.md files in commands/ are skipped."""
        commands_dir = tmp_path / "commands"
        commands_dir.mkdir()
        (commands_dir / "valid.md").write_bytes(b"---\nname: valid\n---\nBody\n")
        (commands_dir / "readme.txt").write_bytes(b"not a command")
        (commands_dir / "script.py").write_bytes(b"print('hello')")
        d = SourceDiscovery(tmp_path)
        commands = list(d.discover_commands())
        assert len(commands) == 1
        assert commands[0].name == "valid"


class TestSkillDirWithoutSkillMd:
    def test_skill_dir_without_skill_md_skipped(self, tmp_path):
        """A subdirectory in skills/ without SKILL.md is skipped."""
        skills_dir = tmp_path / "skills"
        skills_dir.mkdir()
        empty = skills_dir / "no-skill-md"
        empty.mkdir()
        valid = skills_dir / "real-skill"
        valid.mkdir()
        (valid / "SKILL.md").write_bytes(b"---\nname: real\n---\nBody\n")
        d = SourceDiscovery(tmp_path)
        skills = list(d.discover_skills())
        assert len(skills) == 1
        assert skills[0].name == "real"


class TestNonDirInSkills:
    def test_non_directory_entries_skipped_in_skills(self, tmp_path):
        """Files (not directories) in skills/ are skipped."""
        skills_dir = tmp_path / "skills"
        skills_dir.mkdir()
        # A regular file in the skills directory (not a subdirectory)
        (skills_dir / "stray-file.md").write_bytes(b"not a skill")
        # A valid skill directory
        valid = skills_dir / "real-skill"
        valid.mkdir()
        (valid / "SKILL.md").write_bytes(b"---\nname: real\n---\nBody\n")
        d = SourceDiscovery(tmp_path)
        skills = list(d.discover_skills())
        assert len(skills) == 1
        assert skills[0].name == "real"


class TestDiscoverModels:
    def test_models_yaml_with_invalid_yaml(self, tmp_path):
        (tmp_path / "models.yaml").write_bytes(b"invalid: yaml: [broken\n")
        d = SourceDiscovery(tmp_path)
        items = list(d.discover_models())
        assert len(items) == 1
        assert items[0].metadata is None
        assert items[0].name == "models"

    def test_models_yaml_with_non_dict_content(self, tmp_path):
        (tmp_path / "models.yaml").write_bytes(b"just a string\n")
        d = SourceDiscovery(tmp_path)
        items = list(d.discover_models())
        assert len(items) == 1
        assert items[0].metadata is None
        assert items[0].name == "models"

    def test_models_yaml_missing(self, tmp_path):
        d = SourceDiscovery(tmp_path)
        items = list(d.discover_models())
        assert items == []

    def test_models_yaml_valid(self, tmp_path):
        (tmp_path / "models.yaml").write_bytes(
            b"providers:\n  acme:\n    display_name: Acme\n"
        )
        d = SourceDiscovery(tmp_path)
        items = list(d.discover_models())
        assert len(items) == 1
        assert items[0].item_type == "models"
        assert items[0].name == "models"
        assert items[0].metadata is not None
        assert "providers" in items[0].metadata


class TestNameFallback:
    def test_agent_name_from_stem_when_no_frontmatter(self, tmp_path):
        agents_dir = tmp_path / "agents"
        agents_dir.mkdir()
        (agents_dir / "my-agent.md").write_bytes(b"No frontmatter here.\n")
        d = SourceDiscovery(tmp_path)
        agents = list(d.discover_agents())
        assert len(agents) == 1
        assert agents[0].name == "my-agent"
        assert agents[0].metadata is None

    def test_skill_name_from_dirname_when_no_frontmatter(self, tmp_path):
        skills_dir = tmp_path / "skills"
        skill = skills_dir / "my-skill"
        skill.mkdir(parents=True)
        (skill / "SKILL.md").write_bytes(b"No frontmatter.\n")
        d = SourceDiscovery(tmp_path)
        skills = list(d.discover_skills())
        assert len(skills) == 1
        assert skills[0].name == "my-skill"

    def test_mcp_name_from_stem_when_invalid_yaml(self, tmp_path):
        mcp_dir = tmp_path / "mcp"
        mcp_dir.mkdir()
        (mcp_dir / "broken.yaml").write_bytes(b"not: valid: yaml: [broken\n")
        d = SourceDiscovery(tmp_path)
        mcps = list(d.discover_mcp_servers())
        assert len(mcps) == 1
        assert mcps[0].name == "broken"
        assert mcps[0].metadata is None

    def test_mcp_name_from_stem_when_non_dict_yaml(self, tmp_path):
        mcp_dir = tmp_path / "mcp"
        mcp_dir.mkdir()
        (mcp_dir / "scalar.yaml").write_bytes(b"just a string\n")
        d = SourceDiscovery(tmp_path)
        mcps = list(d.discover_mcp_servers())
        assert len(mcps) == 1
        assert mcps[0].name == "scalar"
        assert mcps[0].metadata is None


class TestDiscoverHooks:
    def test_discovers_hooks(self, discovery):
        hooks = list(discovery.discover_hooks())
        assert len(hooks) >= 1
        names = {h.name for h in hooks}
        assert "claude-vault" in names

    def test_hook_properties(self, discovery):
        hooks = list(discovery.discover_hooks())
        for hook in hooks:
            assert hook.item_type == "hook"
            assert hook.path.suffix == ".yaml"
            assert hook.path.parent.name == "hooks"
            assert len(hook.content) > 0

    def test_hook_full_yaml_parse(self, discovery):
        hooks = {h.name: h for h in discovery.discover_hooks()}
        vault = hooks["claude-vault"]
        assert vault.metadata is not None
        assert "hooks" in vault.metadata
        assert "PreCompact" in vault.metadata["hooks"]

    def test_hook_name_from_frontmatter(self, discovery):
        hooks = {h.name: h for h in discovery.discover_hooks()}
        vault = hooks["claude-vault"]
        assert vault.metadata["name"] == "claude-vault"
        assert vault.path.name == "claude-vault.yaml"

    def test_missing_hooks_dir(self, tmp_path):
        d = SourceDiscovery(tmp_path)
        assert list(d.discover_hooks()) == []

    def test_skips_dotfiles(self, tmp_path):
        hooks_dir = tmp_path / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / ".hidden.yaml").write_bytes(b"name: hidden\nhooks: {}\n")
        (hooks_dir / "visible.yaml").write_bytes(
            b"name: visible\nhooks:\n  Stop:\n    - matcher: ''\n      hooks: []\n"
        )
        d = SourceDiscovery(tmp_path)
        names = [h.name for h in d.discover_hooks()]
        assert "visible" in names
        assert "hidden" not in names

    def test_skips_non_yaml(self, tmp_path):
        hooks_dir = tmp_path / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / "hook.yaml").write_bytes(b"name: myhook\nhooks: {}\n")
        (hooks_dir / "readme.md").write_bytes(b"# readme")
        d = SourceDiscovery(tmp_path)
        hooks = list(d.discover_hooks())
        assert len(hooks) == 1
        assert hooks[0].name == "myhook"

    def test_hook_name_fallback_to_stem(self, tmp_path):
        hooks_dir = tmp_path / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / "no-name.yaml").write_bytes(b"hooks: {}\n")
        d = SourceDiscovery(tmp_path)
        hooks = list(d.discover_hooks())
        assert len(hooks) == 1
        assert hooks[0].name == "no-name"
        assert hooks[0].metadata is not None

    def test_hook_invalid_yaml(self, tmp_path):
        hooks_dir = tmp_path / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / "broken.yaml").write_bytes(b"not: valid: yaml: [broken\n")
        d = SourceDiscovery(tmp_path)
        hooks = list(d.discover_hooks())
        assert len(hooks) == 1
        assert hooks[0].name == "broken"
        assert hooks[0].metadata is None

    def test_hook_non_dict_yaml(self, tmp_path):
        hooks_dir = tmp_path / "hooks"
        hooks_dir.mkdir()
        (hooks_dir / "scalar.yaml").write_bytes(b"just a string\n")
        d = SourceDiscovery(tmp_path)
        hooks = list(d.discover_hooks())
        assert len(hooks) == 1
        assert hooks[0].name == "scalar"
        assert hooks[0].metadata is None
