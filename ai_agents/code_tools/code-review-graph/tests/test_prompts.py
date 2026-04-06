"""Tests for MCP prompt templates."""

from code_review_graph.prompts import (
    architecture_map_prompt,
    debug_issue_prompt,
    onboard_developer_prompt,
    pre_merge_check_prompt,
    review_changes_prompt,
)


class TestReviewChangesPrompt:
    def test_returns_list_with_messages(self):
        result = review_changes_prompt()
        assert isinstance(result, list)
        assert len(result) >= 1

    def test_message_has_role_and_content(self):
        result = review_changes_prompt()
        for msg in result:
            assert "role" in msg
            assert "content" in msg
            assert msg["role"] == "user"

    def test_default_base(self):
        result = review_changes_prompt()
        assert "HEAD~1" in result[0]["content"]

    def test_custom_base(self):
        result = review_changes_prompt(base="main")
        assert "main" in result[0]["content"]

    def test_mentions_detect_changes(self):
        result = review_changes_prompt()
        assert "detect_changes" in result[0]["content"]

    def test_mentions_affected_flows(self):
        result = review_changes_prompt()
        assert "affected_flows" in result[0]["content"]

    def test_mentions_test_gaps(self):
        result = review_changes_prompt()
        assert "tests_for" in result[0]["content"]


class TestArchitectureMapPrompt:
    def test_returns_list_with_messages(self):
        result = architecture_map_prompt()
        assert isinstance(result, list)
        assert len(result) >= 1

    def test_message_has_role_and_content(self):
        result = architecture_map_prompt()
        for msg in result:
            assert "role" in msg
            assert "content" in msg
            assert msg["role"] == "user"

    def test_mentions_communities(self):
        result = architecture_map_prompt()
        assert "communities" in result[0]["content"].lower()

    def test_mentions_mermaid(self):
        result = architecture_map_prompt()
        assert "Mermaid" in result[0]["content"]


class TestDebugIssuePrompt:
    def test_returns_list_with_messages(self):
        result = debug_issue_prompt()
        assert isinstance(result, list)
        assert len(result) >= 1

    def test_message_has_role_and_content(self):
        result = debug_issue_prompt()
        for msg in result:
            assert "role" in msg
            assert "content" in msg
            assert msg["role"] == "user"

    def test_includes_description(self):
        result = debug_issue_prompt(description="login fails with 500 error")
        assert "login fails with 500 error" in result[0]["content"]

    def test_empty_description(self):
        result = debug_issue_prompt()
        content = result[0]["content"]
        assert "debugging" in content.lower()

    def test_mentions_search(self):
        result = debug_issue_prompt(description="test issue")
        assert "semantic_search_nodes" in result[0]["content"]

    def test_mentions_recent_changes(self):
        result = debug_issue_prompt()
        assert "detect_changes" in result[0]["content"]


class TestOnboardDeveloperPrompt:
    def test_returns_list_with_messages(self):
        result = onboard_developer_prompt()
        assert isinstance(result, list)
        assert len(result) >= 1

    def test_message_has_role_and_content(self):
        result = onboard_developer_prompt()
        for msg in result:
            assert "role" in msg
            assert "content" in msg
            assert msg["role"] == "user"

    def test_mentions_stats(self):
        result = onboard_developer_prompt()
        assert "list_graph_stats" in result[0]["content"]

    def test_mentions_architecture(self):
        result = onboard_developer_prompt()
        assert "architecture" in result[0]["content"].lower()

    def test_mentions_critical_flows(self):
        result = onboard_developer_prompt()
        assert "critical" in result[0]["content"].lower()


class TestPreMergeCheckPrompt:
    def test_returns_list_with_messages(self):
        result = pre_merge_check_prompt()
        assert isinstance(result, list)
        assert len(result) >= 1

    def test_message_has_role_and_content(self):
        result = pre_merge_check_prompt()
        for msg in result:
            assert "role" in msg
            assert "content" in msg
            assert msg["role"] == "user"

    def test_default_base(self):
        result = pre_merge_check_prompt()
        assert "HEAD~1" in result[0]["content"]

    def test_custom_base(self):
        result = pre_merge_check_prompt(base="develop")
        assert "develop" in result[0]["content"]

    def test_mentions_risk_scoring(self):
        result = pre_merge_check_prompt()
        assert "risk" in result[0]["content"].lower()

    def test_mentions_test_gaps(self):
        result = pre_merge_check_prompt()
        assert "tests_for" in result[0]["content"]

    def test_mentions_dead_code(self):
        result = pre_merge_check_prompt()
        assert "dead_code" in result[0]["content"]
