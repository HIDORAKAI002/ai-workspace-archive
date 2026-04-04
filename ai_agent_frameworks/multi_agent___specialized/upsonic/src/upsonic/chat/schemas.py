from dataclasses import dataclass
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from upsonic.run.agent.output import AgentRunOutput

@dataclass
class InvokeResult:
    """Result of Chat.invoke when return_run_output=True.

    When the run is paused (e.g. for confirmation), run_output is set so the
    caller can show HITL UI and later call continue_run_async.
    """

    text: str
    run_output: Optional["AgentRunOutput"] = None