"""
Tests for Langfuse Datasets integration with AccuracyEvaluator.

Covers:
  - Dataset CRUD methods on the Langfuse class (create, get, list, delete)
  - Dataset Item CRUD methods
  - Dataset Run Item creation and retrieval
  - AccuracyEvaluator with langfuse parameter (dataset item + run item creation)

Requires:
    - LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY env vars
    - OPENAI_API_KEY env var (for evaluator tests that run agents)

Run with: uv run pytest tests/smoke_tests/integrations/langfuse/test_langfuse_datasets.py -v -s
"""

from __future__ import annotations

import os
import time
import uuid
from typing import Any, Dict, List, TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.integrations.langfuse import Langfuse

import pytest

LANGFUSE_PUBLIC_KEY: str = os.getenv("LANGFUSE_PUBLIC_KEY", "")
LANGFUSE_SECRET_KEY: str = os.getenv("LANGFUSE_SECRET_KEY", "")
HAS_LANGFUSE_CREDS: bool = bool(LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY)
HAS_OPENAI_KEY: bool = bool(os.getenv("OPENAI_API_KEY", ""))

MODEL: str = "openai/gpt-4o-mini"

pytestmark = pytest.mark.skipif(
    not HAS_LANGFUSE_CREDS,
    reason="LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY not set",
)


@pytest.fixture()
def langfuse_provider():
    """Create a real Langfuse instance and tear it down after the test."""
    from upsonic.integrations.langfuse import Langfuse

    lf = Langfuse(flush_on_exit=False)
    yield lf
    lf.shutdown()


@pytest.fixture()
def unique_dataset_name() -> str:
    """Unique dataset name per test to avoid collisions."""
    return f"pytest-ds-{uuid.uuid4().hex[:10]}"


# ==================================================================
# Dataset CRUD
# ==================================================================


class TestDatasetCRUD:
    def test_create_dataset(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        ds = langfuse_provider.create_dataset(
            unique_dataset_name,
            description="Test dataset from pytest",
        )
        assert ds.get("name") == unique_dataset_name

    def test_create_dataset_with_metadata(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        ds = langfuse_provider.create_dataset(
            unique_dataset_name,
            metadata={"source": "pytest", "version": 1},
        )
        assert ds.get("name") == unique_dataset_name

    def test_create_dataset_with_schemas(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        input_schema = {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The user query"},
            },
            "required": ["query"],
        }
        output_schema = {
            "type": "object",
            "properties": {
                "output": {"type": "string", "description": "Expected output"},
            },
            "required": ["output"],
        }
        ds = langfuse_provider.create_dataset(
            unique_dataset_name,
            description="Dataset with schemas",
            input_schema=input_schema,
            expected_output_schema=output_schema,
        )
        assert ds.get("name") == unique_dataset_name

        # Verify schemas are returned
        time.sleep(2)
        fetched = langfuse_provider.get_dataset(unique_dataset_name)
        assert fetched.get("inputSchema") is not None
        assert fetched.get("expectedOutputSchema") is not None
        assert fetched["inputSchema"]["properties"]["query"]["type"] == "string"
        assert fetched["expectedOutputSchema"]["properties"]["output"]["type"] == "string"

    def test_get_dataset(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        langfuse_provider.create_dataset(unique_dataset_name)
        time.sleep(2)
        fetched = langfuse_provider.get_dataset(unique_dataset_name)
        assert fetched.get("name") == unique_dataset_name

    def test_get_datasets_list(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        langfuse_provider.create_dataset(unique_dataset_name)
        time.sleep(2)
        result = langfuse_provider.get_datasets(limit=10)
        assert "data" in result
        names = [d.get("name") for d in result["data"]]
        assert unique_dataset_name in names

    @pytest.mark.asyncio
    async def test_acreate_dataset(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        ds = await langfuse_provider.acreate_dataset(
            unique_dataset_name,
            description="Async test dataset",
        )
        assert ds.get("name") == unique_dataset_name

    @pytest.mark.asyncio
    async def test_aget_dataset(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        await langfuse_provider.acreate_dataset(unique_dataset_name)
        time.sleep(2)
        fetched = await langfuse_provider.aget_dataset(unique_dataset_name)
        assert fetched.get("name") == unique_dataset_name

    @pytest.mark.asyncio
    async def test_aget_datasets(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        await langfuse_provider.acreate_dataset(unique_dataset_name)
        time.sleep(2)
        result = await langfuse_provider.aget_datasets(limit=10)
        assert "data" in result


# ==================================================================
# Dataset Item CRUD
# ==================================================================


class TestDatasetItemCRUD:
    def test_create_dataset_item(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        langfuse_provider.create_dataset(unique_dataset_name)
        item = langfuse_provider.create_dataset_item(
            unique_dataset_name,
            input={"query": "What is 2+2?"},
            expected_output={"answer": "4"},
        )
        assert item.get("id") is not None
        assert item.get("input") == {"query": "What is 2+2?"}

    def test_create_dataset_item_with_metadata(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        langfuse_provider.create_dataset(unique_dataset_name)
        item = langfuse_provider.create_dataset_item(
            unique_dataset_name,
            input={"query": "Hello"},
            metadata={"category": "greeting"},
        )
        assert item.get("id") is not None

    def test_get_dataset_items(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        langfuse_provider.create_dataset(unique_dataset_name)
        langfuse_provider.create_dataset_item(
            unique_dataset_name, input={"q": "test1"},
        )
        langfuse_provider.create_dataset_item(
            unique_dataset_name, input={"q": "test2"},
        )
        time.sleep(2)
        items = langfuse_provider.get_dataset_items(unique_dataset_name)
        assert "data" in items
        assert len(items["data"]) >= 2

    def test_get_dataset_item_by_id(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        langfuse_provider.create_dataset(unique_dataset_name)
        item = langfuse_provider.create_dataset_item(
            unique_dataset_name, input={"q": "fetch me"},
        )
        time.sleep(2)
        fetched = langfuse_provider.get_dataset_item(item["id"])
        assert fetched.get("id") == item["id"]

    def test_upsert_dataset_item(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        """Passing the same item_id should upsert (update) the item."""
        langfuse_provider.create_dataset(unique_dataset_name)
        item_id = str(uuid.uuid4())
        item1 = langfuse_provider.create_dataset_item(
            unique_dataset_name,
            input={"q": "v1"},
            item_id=item_id,
        )
        item2 = langfuse_provider.create_dataset_item(
            unique_dataset_name,
            input={"q": "v2"},
            item_id=item_id,
        )
        assert item1["id"] == item2["id"]
        assert item2.get("input") == {"q": "v2"}

    def test_delete_dataset_item(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        langfuse_provider.create_dataset(unique_dataset_name)
        item = langfuse_provider.create_dataset_item(
            unique_dataset_name, input={"q": "delete me"},
        )
        langfuse_provider.delete_dataset_item(item["id"])

    @pytest.mark.asyncio
    async def test_acreate_dataset_item(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        await langfuse_provider.acreate_dataset(unique_dataset_name)
        item = await langfuse_provider.acreate_dataset_item(
            unique_dataset_name,
            input={"query": "async item"},
            expected_output={"answer": "yes"},
        )
        assert item.get("id") is not None

    @pytest.mark.asyncio
    async def test_aget_dataset_items(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        await langfuse_provider.acreate_dataset(unique_dataset_name)
        await langfuse_provider.acreate_dataset_item(
            unique_dataset_name, input={"q": "async1"},
        )
        time.sleep(2)
        items = await langfuse_provider.aget_dataset_items(unique_dataset_name)
        assert "data" in items
        assert len(items["data"]) >= 1


# ==================================================================
# Dataset Run Items
# ==================================================================


class TestDatasetRunItems:
    def test_create_dataset_run_item(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        """Create a run item linking a dataset item to a (fake) trace ID."""
        langfuse_provider.create_dataset(unique_dataset_name)
        item = langfuse_provider.create_dataset_item(
            unique_dataset_name, input={"q": "run test"},
        )
        # Use a fake but valid-format trace ID
        fake_trace_id = str(uuid.uuid4())
        run_item = langfuse_provider.create_dataset_run_item(
            run_name=f"test-run-{uuid.uuid4().hex[:8]}",
            dataset_item_id=item["id"],
            trace_id=fake_trace_id,
            metadata={"test": True},
        )
        # The API should return a response (run item object)
        assert run_item is not None

    @pytest.mark.asyncio
    async def test_acreate_dataset_run_item(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        await langfuse_provider.acreate_dataset(unique_dataset_name)
        item = await langfuse_provider.acreate_dataset_item(
            unique_dataset_name, input={"q": "async run test"},
        )
        fake_trace_id = str(uuid.uuid4())
        run_item = await langfuse_provider.acreate_dataset_run_item(
            run_name=f"async-run-{uuid.uuid4().hex[:8]}",
            dataset_item_id=item["id"],
            trace_id=fake_trace_id,
        )
        assert run_item is not None


# ==================================================================
# Dataset Runs
# ==================================================================


class TestDatasetRuns:
    def test_get_dataset_runs(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        langfuse_provider.create_dataset(unique_dataset_name)
        item = langfuse_provider.create_dataset_item(
            unique_dataset_name, input={"q": "runs test"},
        )
        run_name = f"run-{uuid.uuid4().hex[:8]}"
        langfuse_provider.create_dataset_run_item(
            run_name=run_name,
            dataset_item_id=item["id"],
            trace_id=str(uuid.uuid4()),
        )
        time.sleep(2)
        runs = langfuse_provider.get_dataset_runs(unique_dataset_name)
        assert "data" in runs

    def test_get_dataset_run_by_name(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        langfuse_provider.create_dataset(unique_dataset_name)
        item = langfuse_provider.create_dataset_item(
            unique_dataset_name, input={"q": "single run"},
        )
        run_name = f"named-run-{uuid.uuid4().hex[:8]}"
        langfuse_provider.create_dataset_run_item(
            run_name=run_name,
            dataset_item_id=item["id"],
            trace_id=str(uuid.uuid4()),
        )
        time.sleep(2)
        run = langfuse_provider.get_dataset_run(unique_dataset_name, run_name)
        assert run.get("name") == run_name

    @pytest.mark.asyncio
    async def test_aget_dataset_runs(
        self, langfuse_provider: "Langfuse", unique_dataset_name: str,
    ) -> None:
        await langfuse_provider.acreate_dataset(unique_dataset_name)
        item = await langfuse_provider.acreate_dataset_item(
            unique_dataset_name, input={"q": "async runs"},
        )
        run_name = f"async-runs-{uuid.uuid4().hex[:8]}"
        await langfuse_provider.acreate_dataset_run_item(
            run_name=run_name,
            dataset_item_id=item["id"],
            trace_id=str(uuid.uuid4()),
        )
        time.sleep(2)
        runs = await langfuse_provider.aget_dataset_runs(unique_dataset_name)
        assert "data" in runs


# ==================================================================
# AccuracyEvaluator + Langfuse Datasets
# ==================================================================


ACCURACY_DATASET_NAME: str = "pytest-accuracy-eval"


@pytest.mark.skipif(not HAS_OPENAI_KEY, reason="OPENAI_API_KEY not set")
class TestAccuracyEvaluatorLangfuse:
    @pytest.mark.asyncio
    async def test_accuracy_eval_creates_dataset_item(
        self, langfuse_provider: "Langfuse",
    ) -> None:
        """AccuracyEvaluator with langfuse param should create a dataset item."""
        from upsonic import Agent
        from upsonic.eval.accuracy import AccuracyEvaluator

        agent = Agent(MODEL, instrument=langfuse_provider)
        judge = Agent(MODEL)

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is 2 + 2? Reply with just the number.",
            expected_output="4",
            langfuse=langfuse_provider,
            langfuse_dataset_name=ACCURACY_DATASET_NAME,
            langfuse_run_name=f"accuracy-test-{uuid.uuid4().hex[:8]}",
        )

        result = await evaluator.run(print_results=False)
        assert result.average_score > 0

        # Wait for background thread (flush + 10s sleep + API calls)
        time.sleep(20)

        # Verify dataset was created with schemas
        ds = langfuse_provider.get_dataset(ACCURACY_DATASET_NAME)
        assert ds.get("name") == ACCURACY_DATASET_NAME

        # Verify dataset item was created
        items = langfuse_provider.get_dataset_items(ACCURACY_DATASET_NAME)
        assert len(items.get("data", [])) >= 1
        item = items["data"][0]
        assert item["input"] is not None
        assert item["expectedOutput"] is not None

    @pytest.mark.asyncio
    async def test_accuracy_eval_run_with_output_and_trace(
        self, langfuse_provider: "Langfuse",
    ) -> None:
        """run_with_output() with explicit trace_id should create run item."""
        from upsonic import Agent, Task
        from upsonic.eval.accuracy import AccuracyEvaluator

        # Run a real agent with Langfuse instrumentation to get a real trace_id
        agent = Agent(MODEL, instrument=langfuse_provider)
        task = Task(description="What is the capital of France? Reply with just the city name.")
        run_output = await agent.do_async(task, return_output=True)

        real_trace_id = run_output.trace_id
        agent_output = str(run_output.output)
        assert real_trace_id is not None, "Agent run should produce a trace_id when instrumented with Langfuse"

        judge = Agent(MODEL)

        evaluator = AccuracyEvaluator(
            judge_agent=judge,
            agent_under_test=agent,
            query="What is the capital of France?",
            expected_output="Paris",
            langfuse=langfuse_provider,
            langfuse_dataset_name=ACCURACY_DATASET_NAME,
            langfuse_run_name=f"acc-output-{uuid.uuid4().hex[:8]}",
        )

        result = await evaluator.run_with_output(
            agent_output, print_results=False, trace_id=real_trace_id,
        )
        assert result.average_score > 0

        time.sleep(20)
        items = langfuse_provider.get_dataset_items(ACCURACY_DATASET_NAME)
        assert len(items.get("data", [])) >= 1

    @pytest.mark.asyncio
    async def test_accuracy_eval_no_langfuse_still_works(self) -> None:
        """AccuracyEvaluator without langfuse should work normally."""
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
