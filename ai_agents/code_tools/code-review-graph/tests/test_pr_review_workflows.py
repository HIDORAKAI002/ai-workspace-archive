"""Static security regressions for the split fork-PR review workflows."""

from pathlib import Path

ROOT = Path(__file__).parents[1]
ANALYSIS_WORKFLOW = ROOT / ".github" / "workflows" / "pr-review.yml"
COMMENT_WORKFLOW = ROOT / ".github" / "workflows" / "pr-review-comment.yml"
ACTION = ROOT / "action.yml"
DOCS = ROOT / "docs" / "GITHUB_ACTION.md"


def test_analysis_workflow_is_unprivileged_and_exports_temp_artifact():
    workflow = ANALYSIS_WORKFLOW.read_text(encoding="utf-8")

    assert "permissions:\n  contents: read\n" in workflow
    assert "pull-requests: write" not in workflow
    assert 'comment: "false"' in workflow
    assert "id: review" in workflow
    assert "steps.review.outputs.comment-file" in workflow
    assert "${{ runner.temp }}/crg-report" in workflow
    assert "actions/upload-artifact@v7" in workflow
    assert "if-no-files-found: error" in workflow
    assert "retention-days: 1" in workflow


def test_action_exposes_the_rendered_comment_file():
    action = ACTION.read_text(encoding="utf-8")

    assert "outputs:" in action
    assert "comment-file:" in action
    assert "value: ${{ steps.render.outputs.comment-file }}" in action
    assert "id: render" in action
    assert 'echo "comment-file=${RUNNER_TEMP}/crg-comment.md" >> "${GITHUB_OUTPUT}"' in action


def test_privileged_workflow_has_minimal_permissions_and_source_gate():
    workflow = COMMENT_WORKFLOW.read_text(encoding="utf-8")

    assert "actions: read" in workflow
    assert "pull-requests: write" in workflow
    assert "workflow_run.conclusion == 'success'" in workflow
    assert "workflow_run.event == 'pull_request'" in workflow
    assert "actions/checkout" not in workflow
    assert "uses: ./" not in workflow


def test_privileged_workflow_confines_and_validates_untrusted_artifact():
    workflow = COMMENT_WORKFLOW.read_text(encoding="utf-8")

    assert "MAX_ARCHIVE_BYTES" in workflow
    assert "size_in_bytes" in workflow
    assert "artifact-ids: ${{ steps.artifact.outputs.artifact-id }}" in workflow
    assert "path: ${{ runner.temp }}/crg-report-download" in workflow
    assert "actions/download-artifact@v8" in workflow
    assert "MAX_REPORT_BYTES" in workflow
    assert "MAX_PR_NUMBER_BYTES" in workflow
    assert 'decode("utf-8")' in workflow
    assert "fullmatch" in workflow
    assert "is_symlink" in workflow
    assert "workflow_run.head_sha" in workflow
    assert "actual_sha" in workflow


def test_privileged_workflow_adds_its_own_marker_before_posting():
    workflow = COMMENT_WORKFLOW.read_text(encoding="utf-8")

    assert "TRUSTED_MARKER: <!-- code-review-graph-report -->" in workflow
    assert 'text.replace(marker, "")' in workflow
    assert 'body = f"{marker}\\n\\n{text}"' in workflow
    assert '-F body=@"${COMMENT_BODY}"' in workflow
    assert "-F body=@crg-comment.md" not in workflow


def test_docs_recommend_the_split_workflow_instead_of_pull_request_target():
    docs = DOCS.read_text(encoding="utf-8")

    assert "pr-review-comment.yml" in docs
    assert "workflow_run" in docs
    assert "`actions: read`" in docs
    assert "default branch" in docs
    assert "Avoid `pull_request_target`" in docs
