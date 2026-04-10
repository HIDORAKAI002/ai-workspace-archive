"""Issue API implementation."""

from dataclasses import dataclass
from typing import TYPE_CHECKING

from dagster_rest_resources.gql_client import IGraphQLClient
from dagster_rest_resources.graphql_adapter.issue import (
    get_issue_via_graphql,
    list_issues_via_graphql,
)

if TYPE_CHECKING:
    from dagster_rest_resources.schemas.issue import DgApiIssue, DgApiIssueList


@dataclass(frozen=True)
class DgApiIssueApi:
    """API for issue operations."""

    client: IGraphQLClient

    def get_issue(self, issue_id: str) -> "DgApiIssue":
        """Get an issue by ID."""
        return get_issue_via_graphql(self.client, issue_id)

    def list_issues(self, limit: int = 10, cursor: str | None = None) -> "DgApiIssueList":
        """List issues with pagination."""
        return list_issues_via_graphql(self.client, limit=limit, cursor=cursor)
