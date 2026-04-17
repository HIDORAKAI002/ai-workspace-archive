"""Issue schema definitions."""

from enum import Enum

from pydantic import BaseModel


class DgApiIssueStatus(str, Enum):
    """Issue status."""

    OPEN = "OPEN"
    CLOSED = "CLOSED"
    TRIAGE = "TRIAGE"


class DgApiIssueLinkedRun(BaseModel):
    """A run linked to an issue."""

    run_id: str


class DgApiIssueLinkedAsset(BaseModel):
    """An asset linked to an issue."""

    asset_key: str  # Slash-separated asset key (e.g., "my/asset/key")


class DgApiIssue(BaseModel):
    """Single issue model."""

    id: str
    title: str
    description: str
    status: DgApiIssueStatus
    created_by_email: str
    linked_objects: list[DgApiIssueLinkedRun | DgApiIssueLinkedAsset]
    context: str | None = None


class DgApiIssueList(BaseModel):
    """List of issues with pagination support."""

    items: list[DgApiIssue]
    cursor: str | None = None
    has_more: bool = False
