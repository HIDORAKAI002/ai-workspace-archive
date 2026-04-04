"""
Tests for PromptLayer Reports / Evaluations / Datasets API integration.

Covers:
  - Dataset group creation and listing
  - Dataset version upload
  - Report CRUD (create, get, get score, delete by name)
  - List evaluations
  - AccuracyEvaluator with promptlayer parameter (automatic dataset group + logging)

Requires:
    - PROMPTLAYER_API_KEY env var
    - OPENAI_API_KEY env var (for evaluator tests)

Run with: uv run pytest tests/smoke_tests/integrations/promptlayer/test_promptlayer_reports.py -v -s
"""

from __future__ import annotations

import os
import time
import uuid
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.integrations.promptlayer import PromptLayer

import pytest

PROMPTLAYER_API_KEY: str = os.getenv("PROMPTLAYER_API_KEY", "")
HAS_PL_KEY: bool = bool(PROMPTLAYER_API_KEY)
HAS_OPENAI_KEY: bool = bool(os.getenv("OPENAI_API_KEY", ""))

MODEL: str = "openai/gpt-4o-mini"

pytestmark = pytest.mark.skipif(
    not HAS_PL_KEY,
    reason="PROMPTLAYER_API_KEY not set",
)


@pytest.fixture()
def pl():
    """Create a PromptLayer instance and tear down after test."""
    from upsonic.integrations.promptlayer import PromptLayer

    instance = PromptLayer()
    yield instance
    instance.shutdown()


# ==================================================================
# List Evaluations
# ==================================================================


class TestListEvaluations:
    def test_list_evaluations(self, pl: "PromptLayer") -> None:
        result = pl.list_evaluations()
        assert "evaluations" in result
        assert isinstance(result["evaluations"], list)

    def test_list_evaluations_with_pagination(self, pl: "PromptLayer") -> None:
        result = pl.list_evaluations(page=1, per_page=5)
        assert "evaluations" in result
        assert "page" in result
        assert "per_page" in result

    def test_list_evaluations_with_name_filter(self, pl: "PromptLayer") -> None:
        result = pl.list_evaluations(name="nonexistent-eval-xyz")
        assert "evaluations" in result
        assert len(result["evaluations"]) == 0

    @pytest.mark.asyncio
    async def test_alist_evaluations(self, pl: "PromptLayer") -> None:
        result = await pl.alist_evaluations()
        assert "evaluations" in result
        assert isinstance(result["evaluations"], list)


# ==================================================================
# Dataset Groups
# ==================================================================


class TestDatasetGroups:
    def test_create_dataset_group(self, pl: "PromptLayer") -> None:
        name = f"pytest-ds-{uuid.uuid4().hex[:8]}"
        result = pl.create_dataset_group(name)
        assert result.get("success") is True
        assert result.get("dataset_group", {}).get("name") == name
        assert result.get("dataset_group", {}).get("id") is not None

    def test_list_datasets(self, pl: "PromptLayer") -> None:
        result = pl.list_datasets()
        assert "datasets" in result
        assert isinstance(result["datasets"], list)

    def test_list_datasets_by_name(self, pl: "PromptLayer") -> None:
        name = f"pytest-ds-{uuid.uuid4().hex[:8]}"
        pl.create_dataset_group(name)
        time.sleep(2)
        result = pl.list_datasets(name=name)
        assert "datasets" in result
        found_names = [
            ds.get("dataset_group", {}).get("name")
            for ds in result["datasets"]
        ]
        assert name in found_names

    @pytest.mark.asyncio
    async def test_acreate_dataset_group(self, pl: "PromptLayer") -> None:
        name = f"pytest-ds-{uuid.uuid4().hex[:8]}"
        result = await pl.acreate_dataset_group(name)
        assert result.get("success") is True
        assert result.get("dataset_group", {}).get("name") == name

    @pytest.mark.asyncio
    async def test_alist_datasets(self, pl: "PromptLayer") -> None:
        result = await pl.alist_datasets()
        assert "datasets" in result


# ==================================================================
# Dataset Version from File
# ==================================================================


class TestDatasetVersionFromFile:
    def test_upload_csv(self, pl: "PromptLayer") -> None:
        import base64

        name = f"pytest-upload-{uuid.uuid4().hex[:8]}"
        group_result = pl.create_dataset_group(name)
        group_id = group_result["dataset_group"]["id"]

        csv_content = "query,expected_output\nWhat is 2+2?,4\nWhat is 3+3?,6\n"
        b64 = base64.b64encode(csv_content.encode()).decode()

        result = pl.create_dataset_version_from_file(
            group_id,
            file_name="test_data.csv",
            file_content_base64=b64,
        )
        assert result.get("success") is True
        assert result.get("dataset_id") is not None


# ==================================================================
# Reports CRUD
# ==================================================================


class TestReportsCRUD:
    def test_create_and_get_report(self, pl: "PromptLayer") -> None:
        name = f"pytest-report-{uuid.uuid4().hex[:8]}"
        group_result = pl.create_dataset_group(name)
        group_id = group_result["dataset_group"]["id"]

        import base64
        csv_content = "query,expected_output\nWhat is 2+2?,4\n"
        b64 = base64.b64encode(csv_content.encode()).decode()
        pl.create_dataset_version_from_file(group_id, "data.csv", b64)
        time.sleep(10)

        report_result = pl.create_report(group_id, name=name)
        assert report_result.get("success") is True
        report_id = report_result.get("report_id")
        assert report_id is not None

        time.sleep(2)
        fetched = pl.get_report(report_id)
        assert fetched.get("success") is True
        assert fetched.get("report", {}).get("id") == report_id

    def test_delete_report_by_name(self, pl: "PromptLayer") -> None:
        name = f"pytest-del-{uuid.uuid4().hex[:8]}"
        group_result = pl.create_dataset_group(name)
        group_id = group_result["dataset_group"]["id"]

        import base64
        csv_content = "query,expected_output\ntest,test\n"
        b64 = base64.b64encode(csv_content.encode()).decode()
        pl.create_dataset_version_from_file(group_id, "data.csv", b64)
        time.sleep(10)

        pl.create_report(group_id, name=name)
        time.sleep(2)

        result = pl.delete_report_by_name(name)
        assert result.get("success") is True

    @pytest.mark.asyncio
    async def test_acreate_report(self, pl: "PromptLayer") -> None:
        name = f"pytest-areport-{uuid.uuid4().hex[:8]}"
        group_result = await pl.acreate_dataset_group(name)
        group_id = group_result["dataset_group"]["id"]

        import base64
        csv_content = "query,expected_output\nWhat is 1+1?,2\n"
        b64 = base64.b64encode(csv_content.encode()).decode()
        await pl.acreate_dataset_version_from_file(group_id, "data.csv", b64)
        time.sleep(10)

        report_result = await pl.acreate_report(group_id, name=name)
        assert report_result.get("success") is True
        assert report_result.get("report_id") is not None


# ==================================================================
# AccuracyEvaluator + PromptLayer Datasets
# ==================================================================


ACCURACY_DATASET_NAME: str = "pytest-accuracy-eval"


@pytest.mark.skipif(not HAS_OPENAI_KEY, reason="OPENAI_API_KEY not set")
class TestAccuracyEvaluatorPromptLayer:
    @pytest.mark.asyncio
    async def test_accuracy_eval_creates_dataset_item(
        self, pl: "PromptLayer",
    ) -> None:
        """First eval run: creates dataset group + uploads CSV row."""
        from upsonic import Agent
        from upsonic.eval.accuracy import AccuracyEvaluator

        agent = Agent(MODEL)
        judge = Agent(MODEL)

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is 2 + 2? Reply with just the number.",
            expected_output="4",
            promptlayer=pl,
            promptlayer_dataset_name=ACCURACY_DATASET_NAME,
        )

        result = await evaluator.run(print_results=False)
        assert result.average_score > 0

        # Wait for background threads
        time.sleep(15)

        # Verify dataset group was created
        datasets = pl.list_datasets(name=ACCURACY_DATASET_NAME)
        found = any(
            ds.get("dataset_group", {}).get("name") == ACCURACY_DATASET_NAME
            for ds in datasets.get("datasets", [])
        )
        assert found, f"Dataset group '{ACCURACY_DATASET_NAME}' not found"

    @pytest.mark.asyncio
    async def test_accuracy_eval_run_with_output(
        self, pl: "PromptLayer",
    ) -> None:
        """Second eval run: reuses same dataset group, adds another CSV row."""
        from upsonic import Agent
        from upsonic.eval.accuracy import AccuracyEvaluator

        agent = Agent(MODEL)
        judge = Agent(MODEL)

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is the capital of France?",
            expected_output="Paris",
            promptlayer=pl,
            promptlayer_dataset_name=ACCURACY_DATASET_NAME,
        )

        result = await evaluator.run_with_output("Paris", print_results=False)
        assert result.average_score > 0

        # Wait for background threads
        time.sleep(15)

        # Verify same dataset group is reused
        datasets = pl.list_datasets(name=ACCURACY_DATASET_NAME)
        found = any(
            ds.get("dataset_group", {}).get("name") == ACCURACY_DATASET_NAME
            for ds in datasets.get("datasets", [])
        )
        assert found

    @pytest.mark.asyncio
    async def test_accuracy_eval_third_run(
        self, pl: "PromptLayer",
    ) -> None:
        """Third eval run: same dataset group, third CSV row."""
        from upsonic import Agent
        from upsonic.eval.accuracy import AccuracyEvaluator

        agent = Agent(MODEL)
        judge = Agent(MODEL)

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is 3 + 5? Reply with just the number.",
            expected_output="8",
            promptlayer=pl,
            promptlayer_dataset_name=ACCURACY_DATASET_NAME,
        )

        result = await evaluator.run_with_output("8", print_results=False)
        assert result.average_score > 0

        # Wait for background threads
        time.sleep(15)

        # Verify same dataset group is used
        datasets = pl.list_datasets(name=ACCURACY_DATASET_NAME)
        found_datasets = [
            ds for ds in datasets.get("datasets", [])
            if ds.get("dataset_group", {}).get("name") == ACCURACY_DATASET_NAME
        ]
        assert len(found_datasets) >= 1

    @pytest.mark.asyncio
    async def test_accuracy_eval_multiple_iterations_single_version(
        self, pl: "PromptLayer",
    ) -> None:
        """num_iterations=3 produces 3 rows in a single CSV upload (one version)."""
        from upsonic import Agent
        from upsonic.eval.accuracy import AccuracyEvaluator

        agent = Agent(MODEL)
        judge = Agent(MODEL)

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is 10 + 5? Reply with just the number.",
            expected_output="15",
            num_iterations=3,
            promptlayer=pl,
            promptlayer_dataset_name=ACCURACY_DATASET_NAME,
        )

        result = await evaluator.run_with_output("15", print_results=False)
        assert result.average_score > 0
        assert len(result.evaluation_scores) == 3

        # Wait for background threads
        time.sleep(15)

        # Verify dataset group exists
        datasets = pl.list_datasets(name=ACCURACY_DATASET_NAME)
        found = any(
            ds.get("dataset_group", {}).get("name") == ACCURACY_DATASET_NAME
            for ds in datasets.get("datasets", [])
        )
        assert found

    @pytest.mark.asyncio
    async def test_accuracy_eval_no_promptlayer_still_works(self) -> None:
        """AccuracyEvaluator without promptlayer should work normally."""
        from upsonic import Agent
        from upsonic.eval.accuracy import AccuracyEvaluator

        judge = Agent(MODEL)
        agent = Agent(MODEL)

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is 1 + 1?",
            expected_output="2",
        )

        result = await evaluator.run_with_output("2", print_results=False)
        assert result.average_score > 0
