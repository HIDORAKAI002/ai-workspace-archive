"""MCP prompt templates for Code Review Graph.

Provides 5 pre-built prompt workflows:
1. review_changes   - pre-commit review using detect_changes + affected_flows + test gaps
2. architecture_map - architecture docs using communities, flows, Mermaid diagrams
3. debug_issue      - guided debugging using search, flow tracing, recent changes
4. onboard_developer - new dev orientation using stats, architecture, critical flows
5. pre_merge_check  - PR readiness with risk scoring, test gaps, dead code
"""

from __future__ import annotations


def review_changes_prompt(base: str = "HEAD~1") -> list[dict]:
    """Pre-commit review workflow.

    Guides the LLM through a structured code review using detect_changes,
    affected_flows, and test gap analysis.

    Args:
        base: Git ref to diff against. Default: HEAD~1.
    """
    return [
        {
            "role": "user",
            "content": (
                f"I need a thorough code review of changes since {base}. "
                "Please follow this workflow:\n\n"
                "1. **Detect changes**: Use `detect_changes` with base="
                f'"{base}" to get risk-scored change analysis.\n'
                "2. **Trace affected flows**: Use `get_affected_flows` with base="
                f'"{base}" to find execution paths impacted by these changes.\n'
                "3. **Check test coverage**: For each high-risk changed function, "
                "use `query_graph` with pattern=\"tests_for\" to identify test gaps.\n"
                "4. **Review impact radius**: Use `get_impact_radius` to understand "
                "the blast radius of the changes.\n\n"
                "For each finding, provide:\n"
                "- **Risk level** (high/medium/low)\n"
                "- **What changed** and why it matters\n"
                "- **Test gaps** that should be addressed\n"
                "- **Suggested improvements** if any\n\n"
                "Conclude with an overall assessment: safe to merge, needs fixes, "
                "or needs discussion."
            ),
        }
    ]


def architecture_map_prompt() -> list[dict]:
    """Architecture documentation workflow.

    Guides the LLM through generating architecture docs using communities,
    flows, and Mermaid diagrams.
    """
    return [
        {
            "role": "user",
            "content": (
                "Generate a comprehensive architecture map of this codebase. "
                "Please follow this workflow:\n\n"
                "1. **Get overview**: Use `get_architecture_overview` to understand "
                "the high-level community structure and cross-community coupling.\n"
                "2. **List communities**: Use `list_communities` sorted by size to "
                "identify the major code modules.\n"
                "3. **Map critical flows**: Use `list_flows` sorted by criticality "
                "to find the most important execution paths.\n"
                "4. **Get stats**: Use `list_graph_stats` for overall codebase metrics.\n\n"
                "Then produce:\n"
                "- A **Mermaid diagram** showing communities as nodes and their "
                "dependencies as edges\n"
                "- A **summary table** of each community (name, size, languages, "
                "cohesion score)\n"
                "- A **critical flows section** listing the top 10 flows with their "
                "entry points and depth\n"
                "- **Coupling warnings** for any communities with high cross-boundary "
                "dependencies\n"
                "- **Architecture recommendations** based on the analysis"
            ),
        }
    ]


def debug_issue_prompt(description: str = "") -> list[dict]:
    """Guided debugging workflow.

    Guides the LLM through debugging using search, flow tracing, and
    recent change analysis.

    Args:
        description: Description of the issue to debug.
    """
    desc_section = (
        f'The issue is: "{description}"\n\n' if description else ""
    )
    return [
        {
            "role": "user",
            "content": (
                f"I need help debugging an issue in this codebase. {desc_section}"
                "Please follow this systematic debugging workflow:\n\n"
                "1. **Search for relevant code**: Use `semantic_search_nodes` to find "
                "functions and classes related to the issue description.\n"
                "2. **Trace execution flows**: For the most relevant functions found, "
                "use `query_graph` with pattern=\"callers_of\" and \"callees_of\" to "
                "understand the call chain.\n"
                "3. **Check affected flows**: Use `list_flows` and `get_flow` to see "
                "which execution paths pass through the suspected area.\n"
                "4. **Review recent changes**: Use `detect_changes` to check if recent "
                "changes might have introduced the issue.\n"
                "5. **Examine dependencies**: Use `get_impact_radius` on the suspected "
                "files to understand what else could be affected.\n\n"
                "For each step, explain:\n"
                "- What you found and why it's relevant\n"
                "- Potential root causes\n"
                "- Suggested fixes with specific file and function references"
            ),
        }
    ]


def onboard_developer_prompt() -> list[dict]:
    """New developer orientation workflow.

    Guides the LLM through creating an onboarding guide using stats,
    architecture overview, and critical flows.
    """
    return [
        {
            "role": "user",
            "content": (
                "I'm a new developer on this codebase. Help me get oriented. "
                "Please follow this workflow:\n\n"
                "1. **Get codebase stats**: Use `list_graph_stats` to understand "
                "the size and languages used.\n"
                "2. **Architecture overview**: Use `get_architecture_overview` to "
                "understand the high-level structure.\n"
                "3. **Key communities**: Use `list_communities` to identify the major "
                "modules, then use `get_community` on the top 3-5 communities for "
                "details.\n"
                "4. **Critical flows**: Use `list_flows` sorted by criticality to "
                "find the most important execution paths, then use `get_flow` on the "
                "top 3-5 flows.\n"
                "5. **Entry points**: Use `query_graph` with pattern=\"children_of\" "
                "on key files to understand module structure.\n\n"
                "Then produce a developer onboarding guide with:\n"
                "- **Codebase overview** (languages, size, architecture style)\n"
                "- **Module guide** (what each community/module does)\n"
                "- **Key flows** (how the main features work end-to-end)\n"
                "- **Where to start** (suggested files to read first)\n"
                "- **Common patterns** (naming conventions, error handling, etc.)"
            ),
        }
    ]


def pre_merge_check_prompt(base: str = "HEAD~1") -> list[dict]:
    """PR readiness check workflow.

    Guides the LLM through a pre-merge review with risk scoring,
    test gaps, and dead code detection.

    Args:
        base: Git ref to diff against. Default: HEAD~1.
    """
    return [
        {
            "role": "user",
            "content": (
                f"Run a pre-merge readiness check on changes since {base}. "
                "Please follow this checklist:\n\n"
                "1. **Risk assessment**: Use `detect_changes` with base="
                f'"{base}" to get risk-scored analysis of all changes.\n'
                "2. **Test coverage gaps**: For each changed function, use "
                "`query_graph` with pattern=\"tests_for\" to verify test coverage. "
                "Flag any high-risk functions without tests.\n"
                "3. **Affected flows**: Use `get_affected_flows` with base="
                f'"{base}" to identify impacted execution paths.\n'
                "4. **Dead code check**: Use `refactor_tool` with mode=\"dead_code\" "
                "to detect any unreferenced code that may have been left behind.\n"
                "5. **Large function check**: Use `find_large_functions` to flag "
                "any changed functions that exceed size thresholds.\n"
                "6. **Impact radius**: Use `get_impact_radius` to understand the "
                "full blast radius.\n\n"
                "Produce a merge readiness report with:\n"
                "- **Overall risk score** (low/medium/high/critical)\n"
                "- **Test gaps** that must be addressed before merge\n"
                "- **Dead code** that should be cleaned up\n"
                "- **Breaking change risks** based on affected flows\n"
                "- **Merge recommendation**: approve, request changes, or block"
            ),
        }
    ]
