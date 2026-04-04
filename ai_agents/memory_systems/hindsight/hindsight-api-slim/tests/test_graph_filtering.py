"""
Tests for server-side filtering in the graph API endpoint.

Verifies that q (text search) and tags filters work correctly
when passed as query parameters to GET /v1/default/banks/{bank_id}/graph.
"""
from datetime import datetime

import httpx
import pytest
import pytest_asyncio

from hindsight_api.api import create_app


@pytest_asyncio.fixture
async def api_client(memory):
    """Create an async test client for the FastAPI app."""
    app = create_app(memory, initialize_memory=False)
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        yield client


@pytest.fixture
def test_bank_id():
    """Provide a unique bank ID for this test run."""
    return f"graph_filter_test_{datetime.now().timestamp()}"


@pytest.mark.asyncio
async def test_graph_no_filter_returns_all(api_client, test_bank_id):
    """Without filters the graph endpoint returns all memories."""
    response = await api_client.post(
        f"/v1/default/banks/{test_bank_id}/memories",
        json={
            "items": [
                {"content": "Alice loves hiking in the mountains.", "tags": ["user_alice"]},
                {"content": "Bob enjoys swimming at the beach.", "tags": ["user_bob"]},
            ]
        },
    )
    assert response.status_code == 200

    response = await api_client.get(f"/v1/default/banks/{test_bank_id}/graph")
    assert response.status_code == 200
    data = response.json()
    assert "table_rows" in data
    texts = [row["text"] for row in data["table_rows"]]
    assert any("Alice" in t for t in texts)
    assert any("Bob" in t for t in texts)


@pytest.mark.asyncio
async def test_graph_q_filter_returns_matching(api_client, test_bank_id):
    """The q parameter filters memories by text content."""
    response = await api_client.post(
        f"/v1/default/banks/{test_bank_id}/memories",
        json={
            "items": [
                {"content": "Alice loves hiking in the mountains."},
                {"content": "Bob enjoys swimming at the beach."},
            ]
        },
    )
    assert response.status_code == 200

    response = await api_client.get(f"/v1/default/banks/{test_bank_id}/graph", params={"q": "Alice"})
    assert response.status_code == 200
    data = response.json()
    texts = [row["text"] for row in data["table_rows"]]
    assert all("Alice" in t or "alice" in t.lower() for t in texts), (
        f"Expected only Alice memories, got: {texts}"
    )
    assert not any("Bob" in t for t in texts)


@pytest.mark.asyncio
async def test_graph_q_filter_case_insensitive(api_client, test_bank_id):
    """The q filter is case-insensitive."""
    response = await api_client.post(
        f"/v1/default/banks/{test_bank_id}/memories",
        json={
            "items": [
                {"content": "Alice loves hiking in the mountains."},
                {"content": "Bob enjoys swimming at the beach."},
            ]
        },
    )
    assert response.status_code == 200

    response = await api_client.get(f"/v1/default/banks/{test_bank_id}/graph", params={"q": "alice"})
    assert response.status_code == 200
    data = response.json()
    texts = [row["text"] for row in data["table_rows"]]
    assert any("Alice" in t for t in texts)
    assert not any("Bob" in t for t in texts)


@pytest.mark.asyncio
async def test_graph_tags_filter_returns_matching(api_client, test_bank_id):
    """The tags parameter filters memories to only those with matching tags."""
    response = await api_client.post(
        f"/v1/default/banks/{test_bank_id}/memories",
        json={
            "items": [
                {"content": "Alice loves hiking.", "tags": ["user_alice"]},
                {"content": "Bob enjoys swimming.", "tags": ["user_bob"]},
            ]
        },
    )
    assert response.status_code == 200

    response = await api_client.get(
        f"/v1/default/banks/{test_bank_id}/graph",
        params={"tags": "user_alice", "tags_match": "all_strict"},
    )
    assert response.status_code == 200
    data = response.json()
    texts = [row["text"] for row in data["table_rows"]]
    assert any("Alice" in t for t in texts)
    assert not any("Bob" in t for t in texts)


@pytest.mark.asyncio
async def test_graph_q_and_tags_filter_combined(api_client, test_bank_id):
    """Combining q and tags filters applies both server-side."""
    response = await api_client.post(
        f"/v1/default/banks/{test_bank_id}/memories",
        json={
            "items": [
                {"content": "Alice loves hiking.", "tags": ["user_alice"]},
                {"content": "Alice also loves coding.", "tags": ["user_alice"]},
                {"content": "Bob enjoys swimming.", "tags": ["user_bob"]},
            ]
        },
    )
    assert response.status_code == 200

    response = await api_client.get(
        f"/v1/default/banks/{test_bank_id}/graph",
        params={"q": "hiking", "tags": "user_alice", "tags_match": "all_strict"},
    )
    assert response.status_code == 200
    data = response.json()
    texts = [row["text"] for row in data["table_rows"]]
    assert any("hiking" in t.lower() for t in texts)
    assert not any("coding" in t.lower() for t in texts)
    assert not any("Bob" in t for t in texts)


@pytest.mark.asyncio
async def test_graph_q_filter_empty_results(api_client, test_bank_id):
    """The q filter returns empty results when no memory matches."""
    response = await api_client.post(
        f"/v1/default/banks/{test_bank_id}/memories",
        json={
            "items": [
                {"content": "Alice loves hiking."},
            ]
        },
    )
    assert response.status_code == 200

    response = await api_client.get(
        f"/v1/default/banks/{test_bank_id}/graph",
        params={"q": "zzznomatchzzz"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["table_rows"] == []
