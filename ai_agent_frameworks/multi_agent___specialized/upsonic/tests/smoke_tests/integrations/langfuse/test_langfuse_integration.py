"""
Live Langfuse integration tests with real LLM API calls and Langfuse API verification.

Sends actual traces to Langfuse via the OTLP exporter, then queries the
Langfuse REST API to verify traces were received with correct attributes.

Requires:
    - LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY env vars
    - An LLM provider key (OPENAI_API_KEY or ANTHROPIC_API_KEY)

Run with: uv run pytest tests/smoke_tests/agent/test_langfuse_integration.py -v -s
"""

from __future__ import annotations

import base64
import json
import os
import time
import uuid
from typing import Any, Dict, List, Optional, TYPE_CHECKING
from urllib.request import Request, urlopen
from urllib.error import HTTPError

if TYPE_CHECKING:
    from upsonic.integrations.langfuse import Langfuse

import pytest

from upsonic import Agent, Task

LANGFUSE_PUBLIC_KEY: str = os.getenv("LANGFUSE_PUBLIC_KEY", "")
LANGFUSE_SECRET_KEY: str = os.getenv("LANGFUSE_SECRET_KEY", "")
LANGFUSE_HOST: str = os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com")
HAS_LANGFUSE_CREDS: bool = bool(LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY)

MODEL: str = "openai/gpt-4o-mini"

pytestmark = pytest.mark.skipif(
    not HAS_LANGFUSE_CREDS,
    reason="LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY not set",
)


def _langfuse_api_get(
    path: str,
    params: Optional[Dict[str, str]] = None,
) -> Dict[str, Any]:
    """Call the Langfuse public REST API and return parsed JSON."""
    auth_raw: str = f"{LANGFUSE_PUBLIC_KEY}:{LANGFUSE_SECRET_KEY}"
    auth_b64: str = base64.b64encode(auth_raw.encode()).decode()

    url: str = f"{LANGFUSE_HOST.rstrip('/')}/api/public{path}"
    if params:
        qs: str = "&".join(f"{k}={v}" for k, v in params.items())
        url = f"{url}?{qs}"

    req = Request(url, headers={
        "Authorization": f"Basic {auth_b64}",
        "Content-Type": "application/json",
    })
    with urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode())


def _poll_traces(
    session_id: str,
    *,
    expected_count: int = 1,
    max_wait: float = 30.0,
    poll_interval: float = 2.0,
) -> List[Dict[str, Any]]:
    """Poll the Langfuse API until *expected_count* traces appear for *session_id*."""
    deadline: float = time.time() + max_wait
    traces: List[Dict[str, Any]] = []

    while time.time() < deadline:
        try:
            resp = _langfuse_api_get("/traces", {"sessionId": session_id, "limit": "50"})
            traces = resp.get("data", [])
            if len(traces) >= expected_count:
                return traces
        except (HTTPError, OSError):
            pass
        time.sleep(poll_interval)

    return traces


def _poll_single_trace(
    session_id: str,
    *,
    max_wait: float = 30.0,
) -> Optional[Dict[str, Any]]:
    """Poll until one trace appears, then fetch its full detail."""
    traces = _poll_traces(session_id, expected_count=1, max_wait=max_wait)
    if not traces:
        return None
    trace_id: str = traces[0]["id"]
    try:
        detail: Dict[str, Any] = _langfuse_api_get(f"/traces/{trace_id}")
        raw_obs = detail.get("observations", [])
        # The /traces/{id} endpoint may return observation IDs as strings
        # instead of full observation objects. Always fetch full objects.
        if not raw_obs or not isinstance(raw_obs[0], dict):
            obs = _poll_observations(trace_id, max_wait=10.0)
            detail["observations"] = obs
        return detail
    except (HTTPError, OSError):
        return traces[0]


def _poll_observations(
    trace_id: str,
    *,
    min_count: int = 2,
    max_wait: float = 20.0,
    poll_interval: float = 3.0,
) -> List[Dict[str, Any]]:
    """Poll for observations belonging to a trace until *min_count* appear."""
    deadline: float = time.time() + max_wait
    obs: List[Dict[str, Any]] = []
    while time.time() < deadline:
        try:
            resp = _langfuse_api_get("/observations", {"traceId": trace_id, "limit": "100"})
            obs = resp.get("data", [])
            if len(obs) >= min_count:
                return obs
        except (HTTPError, OSError):
            pass
        time.sleep(poll_interval)
    return obs


@pytest.fixture()
def langfuse_provider():
    """Create a real Langfuse TracingProvider and tear it down after the test."""
    from upsonic.integrations.langfuse import Langfuse

    lf = Langfuse(flush_on_exit=False)
    yield lf
    lf.shutdown()


@pytest.fixture()
def session_id() -> str:
    """Unique session ID per test so traces are isolated."""
    return f"pytest-{uuid.uuid4().hex[:12]}"


class TestLangfuseInitialization:
    def test_init_from_env_vars(self) -> None:
        from upsonic.integrations.langfuse import Langfuse

        lf = Langfuse(flush_on_exit=False)
        assert lf._public_key == LANGFUSE_PUBLIC_KEY
        assert lf._secret_key == LANGFUSE_SECRET_KEY
        assert lf._endpoint.endswith("/api/public/otel/v1/traces")
        assert lf.settings is not None
        lf.shutdown()

    def test_init_with_explicit_keys(self) -> None:
        from upsonic.integrations.langfuse import Langfuse

        lf = Langfuse(
            public_key=LANGFUSE_PUBLIC_KEY,
            secret_key=LANGFUSE_SECRET_KEY,
            flush_on_exit=False,
        )
        assert lf._public_key == LANGFUSE_PUBLIC_KEY
        lf.shutdown()

    def test_init_missing_keys_raises(self, monkeypatch: pytest.MonkeyPatch) -> None:
        from upsonic.integrations.langfuse import Langfuse

        monkeypatch.delenv("LANGFUSE_PUBLIC_KEY", raising=False)
        monkeypatch.delenv("LANGFUSE_SECRET_KEY", raising=False)

        with pytest.raises(ValueError, match="public_key and secret_key are required"):
            Langfuse(public_key="", secret_key="", flush_on_exit=False)

    def test_region_eu_default(self) -> None:
        from upsonic.integrations.langfuse import Langfuse

        lf = Langfuse(flush_on_exit=False)
        if not os.getenv("LANGFUSE_HOST"):
            assert "cloud.langfuse.com" in lf._host
        lf.shutdown()

    def test_region_us(self) -> None:
        from upsonic.integrations.langfuse import Langfuse

        lf = Langfuse(region="us", flush_on_exit=False)
        if not os.getenv("LANGFUSE_HOST"):
            assert "us.cloud.langfuse.com" in lf._host
        lf.shutdown()

    def test_repr(self) -> None:
        from upsonic.integrations.langfuse import Langfuse

        lf = Langfuse(flush_on_exit=False)
        r = repr(lf)
        assert "Langfuse(" in r
        assert "service_name=" in r
        lf.shutdown()

    def test_inherits_tracing_provider(self) -> None:
        from upsonic.integrations.langfuse import Langfuse
        from upsonic.integrations.tracing import TracingProvider

        lf = Langfuse(flush_on_exit=False)
        assert isinstance(lf, TracingProvider)
        lf.shutdown()

    def test_settings_has_tracer(self) -> None:
        from upsonic.integrations.langfuse import Langfuse

        lf = Langfuse(flush_on_exit=False)
        assert lf.settings is not None
        assert lf.settings.tracer is not None
        lf.shutdown()

    def test_double_shutdown_safe(self) -> None:
        from upsonic.integrations.langfuse import Langfuse

        lf = Langfuse(flush_on_exit=False)
        lf.shutdown()
        lf.shutdown()

    def test_flush_does_not_crash(self) -> None:
        from upsonic.integrations.langfuse import Langfuse

        lf = Langfuse(flush_on_exit=False)
        lf.flush()
        lf.shutdown()


def test_agent_do_with_langfuse(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """agent.do() should succeed and produce a trace visible in Langfuse."""
    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-do",
    )
    result = agent.do("What is 2 + 2? Reply with just the number.")
    assert result is not None
    assert "4" in str(result)

    trace = _poll_single_trace(session_id)
    assert trace is not None, f"Trace not found in Langfuse for session {session_id}"


@pytest.mark.asyncio
async def test_agent_do_async_with_langfuse(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """agent.do_async() should succeed and produce a trace in Langfuse."""
    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-async",
    )
    result = await agent.do_async("What is 3 + 3? Reply with just the number.")
    assert result is not None
    assert "6" in str(result)

    trace = _poll_single_trace(session_id)
    assert trace is not None, f"Trace not found in Langfuse for session {session_id}"


def test_user_id_in_langfuse(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """Langfuse should display the correct userId on the trace."""
    user_id: str = f"user-{uuid.uuid4().hex[:8]}"

    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id=user_id,
    )
    agent.do("Say hello.")

    trace = _poll_single_trace(session_id)
    assert trace is not None

    trace_user: str = trace.get("userId", "")
    assert trace_user == user_id, f"Expected userId={user_id!r}, got {trace_user!r}"


def test_session_grouping(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """Two runs with the same session_id should produce two traces under one session."""
    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-session",
    )

    agent.do("First task: say A.")
    agent.do("Second task: say B.")

    traces = _poll_traces(session_id, expected_count=2)
    assert len(traces) >= 2, (
        f"Expected 2 traces for session {session_id}, got {len(traces)}"
    )

    session_ids = {t.get("sessionId") for t in traces}
    assert session_ids == {session_id}, (
        f"All traces should share session {session_id}, got {session_ids}"
    )


def test_input_output_in_langfuse(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """Langfuse trace should have non-null input and output."""
    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-io",
    )
    agent.do("What is the capital of France? Reply in one word.")

    trace = _poll_single_trace(session_id)
    assert trace is not None

    trace_input = trace.get("input")
    trace_output = trace.get("output")
    assert trace_input is not None, "Trace input should not be null"
    assert trace_output is not None, "Trace output should not be null"


def test_tool_usage_in_langfuse(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """Traces with tool calls should contain tool.execute observations."""
    from upsonic.tools.config import tool

    @tool(docstring_format="google")
    def add_numbers(a: int, b: int) -> int:
        """Add two numbers together.

        Args:
            a: First number
            b: Second number

        Returns:
            Sum of a and b
        """
        return a + b

    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-tools",
        tools=[add_numbers],
    )
    result = agent.do("Use the add_numbers tool to add 10 and 20. Return only the result number.")
    assert result is not None

    trace = _poll_single_trace(session_id)
    assert trace is not None

    observations: List[Dict[str, Any]] = trace.get("observations", [])
    obs_names = [o.get("name", "") for o in observations]
    assert any("tool" in n.lower() or n == "tool.execute" for n in obs_names), (
        f"Expected a tool observation in trace. Got observation names: {obs_names}"
    )


@pytest.mark.asyncio
async def test_astream_with_langfuse(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """agent.astream() should produce a trace in Langfuse."""
    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-stream",
    )
    task = Task(description="Count from 1 to 3, one per line.")

    chunks: List[str] = []
    async for chunk in agent.astream(task, events=False):
        chunks.append(chunk)

    assert len(chunks) > 0
    accumulated: str = "".join(chunks)
    assert len(accumulated) > 0

    trace = _poll_single_trace(session_id)
    assert trace is not None, f"Trace not found in Langfuse for streamed run"


def test_stream_with_langfuse(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """agent.stream() should produce a trace in Langfuse."""
    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-sync-stream",
    )
    task = Task(description="Say hello world.")

    chunks: List[str] = []
    for chunk in agent.stream(task, events=False):
        chunks.append(chunk)

    assert len(chunks) > 0

    trace = _poll_single_trace(session_id)
    assert trace is not None


def test_structured_output_with_langfuse(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """Structured output (Pydantic model) should produce a valid trace."""
    from pydantic import BaseModel, Field

    class MathAnswer(BaseModel):
        answer: int = Field(description="The numeric answer")

    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-structured",
    )
    task = Task(description="What is 5 times 6?", response_format=MathAnswer)
    output = agent.do(task, return_output=True)

    assert output is not None
    assert isinstance(output.output, MathAnswer)
    assert output.output.answer == 30

    trace = _poll_single_trace(session_id)
    assert trace is not None


def test_trace_name_is_task_description(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """Langfuse trace name should be the task description, not generic 'agent.run'."""
    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-name",
    )
    agent.do("What is the speed of light?")

    trace = _poll_single_trace(session_id)
    assert trace is not None

    trace_name: str = trace.get("name", "")
    assert trace_name != "agent.run", (
        f"Trace name should not be 'agent.run', should be the task description"
    )
    assert "speed" in trace_name.lower() or "light" in trace_name.lower(), (
        f"Expected task description in trace name, got: {trace_name!r}"
    )


def test_llm_generation_observation(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """Trace should include multiple observations (pipeline, steps, LLM call)."""
    agent = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-user-gen",
    )
    agent.do("Say hi.")

    trace = _poll_single_trace(session_id, max_wait=40.0)
    assert trace is not None

    trace_id: str = trace.get("id", "")
    observations = _poll_observations(trace_id, max_wait=25.0)

    assert len(observations) >= 2, (
        f"Trace should have multiple observations (agent.run + pipeline + steps + chat). "
        f"Got {len(observations)}: {[o.get('name', '') for o in observations]}"
    )


def test_include_content_false(session_id: str) -> None:
    """With include_content=False, trace input/output might be null in Langfuse."""
    from upsonic.integrations.langfuse import Langfuse

    lf = Langfuse(include_content=False, flush_on_exit=False)
    try:
        agent = Agent(
            MODEL,
            instrument=lf,
            session_id=session_id,
            user_id="test-user-no-content",
        )
        agent.do("Tell me a secret: XYZZY_SECRET_123.")

        trace = _poll_single_trace(session_id)
        assert trace is not None

        trace_input = trace.get("input")
        trace_output = trace.get("output")
        if trace_input is not None:
            assert "XYZZY_SECRET_123" not in str(trace_input), (
                "With include_content=False, secret should not appear in trace input"
            )
    finally:
        lf.shutdown()


def test_multiple_agents_same_provider(
    langfuse_provider: "Langfuse",
    session_id: str,
) -> None:
    """Multiple agents sharing one Langfuse provider should all produce traces."""
    agent1 = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-agent-1",
        name="Agent1",
    )
    agent2 = Agent(
        MODEL,
        instrument=langfuse_provider,
        session_id=session_id,
        user_id="test-agent-2",
        name="Agent2",
    )

    agent1.do("Say A.")
    agent2.do("Say B.")

    traces = _poll_traces(session_id, expected_count=2)
    assert len(traces) >= 2, (
        f"Expected 2 traces from 2 agents, got {len(traces)}"
    )



def test_langfuse_api_reachable() -> None:
    """Verify we can reach the Langfuse API with the configured credentials."""
    resp = _langfuse_api_get("/traces", {"limit": "1"})
    assert "data" in resp, f"Unexpected API response structure: {list(resp.keys())}"
