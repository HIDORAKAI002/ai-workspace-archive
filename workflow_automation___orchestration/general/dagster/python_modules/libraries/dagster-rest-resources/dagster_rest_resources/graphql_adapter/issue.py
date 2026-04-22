"""GraphQL adapter for issue operations."""

from typing import Any

from dagster_rest_resources.gql_client import IGraphQLClient
from dagster_rest_resources.schemas.issue import (
    DgApiIssue,
    DgApiIssueLinkedAsset,
    DgApiIssueLinkedRun,
    DgApiIssueList,
    DgApiIssueStatus,
)

ISSUE_FRAGMENT = """
fragment IssueFragment on Issue {
    publicId
    title
    description
    status
    context
    linkedObjects {
        ... on Run {
            __typename
            id
        }
        ... on Asset {
            __typename
            key {
                path
            }
        }
    }
    createdBy {
        email
    }
}
"""

CREATE_ISSUE_MUTATION = (
    """
mutation CliCreateIssueMutation($title: String!, $description: String!, $chatId: Int) {
    createIssue(title: $title, description: $description, chatId: $chatId) {
        ... on CreateIssueSuccess {
            __typename
            issue {
                ... IssueFragment
            }
        }
        ... on UnauthorizedError {
            __typename
            message
        }
        ... on PythonError {
            __typename
            message
        }
    }
}
"""
    + ISSUE_FRAGMENT
)

UPDATE_ISSUE_MUTATION = (
    """
mutation CliUpdateIssueMutation($issueId: String!, $status: IssueStatus, $title: String, $description: String, $context: String) {
    updateIssue(issueId: $issueId, status: $status, title: $title, description: $description, context: $context) {
        ... on UpdateIssueSuccess {
            __typename
            issue {
                ... IssueFragment
            }
        }
        ... on UnauthorizedError {
            __typename
            message
        }
        ... on PythonError {
            __typename
            message
        }
    }
}
"""
    + ISSUE_FRAGMENT
)

GET_ISSUE_WITH_CONTEXT_QUERY = (
    """
query FetchIssue($issueId: String!) {
    issue(issueId: $issueId) {
        ... on Issue {
            __typename
            ... IssueFragment
        }
        ... on UnauthorizedError {
            __typename
            message
        }
        ... on PythonError {
            __typename
            message
        }
    }
}
"""
    + ISSUE_FRAGMENT
)

LIST_ISSUES_QUERY = """
query FetchIssues($limit: Int!, $cursor: String, $filters: IssuesFilter) {
    issues(limit: $limit, cursor: $cursor, filters: $filters) {
        ... on IssueConnection {
            __typename
            issues {
                publicId
                title
                status
                createdBy {
                    email
                }
            }
            cursor
            hasMore
        }
        ... on UnauthorizedError {
            __typename
            message
        }
        ... on PythonError {
            __typename
            message
        }
    }
}
"""


ADD_LINK_TO_ISSUE_MUTATION = (
    """
mutation CliAddLinkToIssueMutation($issueId: String!, $linkedObject: IssueLinkedObjectInput!) {
    addLinkToIssue(issueId: $issueId, linkedObject: $linkedObject) {
        ... on UpdateIssueSuccess {
            __typename
            issue {
                ... IssueFragment
            }
        }
        ... on UnauthorizedError {
            __typename
            message
        }
        ... on PythonError {
            __typename
            message
        }
    }
}
"""
    + ISSUE_FRAGMENT
)
REMOVE_LINK_FROM_ISSUE_MUTATION = (
    """
mutation CliRemoveLinkFromIssueMutation($issueId: String!, $linkedObject: IssueLinkedObjectInput!) {
    removeLinkFromIssue(issueId: $issueId, linkedObject: $linkedObject) {
        ... on UpdateIssueSuccess {
            __typename
            issue {
                ... IssueFragment
            }
        }
        ... on UnauthorizedError {
            __typename
            message
        }
        ... on PythonError {
            __typename
            message
        }
    }
}
"""
    + ISSUE_FRAGMENT
)


def get_issue_via_graphql(client: IGraphQLClient, issue_id: str) -> DgApiIssue:
    """Get a single issue via GraphQL."""
    result = client.execute_generic(GET_ISSUE_WITH_CONTEXT_QUERY, variables={"issueId": issue_id})
    issue = result["issue"]

    typename = issue.get("__typename")
    if typename in ("UnauthorizedError", "PythonError"):
        raise Exception(issue["message"])
    if typename != "Issue":
        raise Exception(f"Issue not found: {issue_id}")

    return _parse_issue_from_graphql(issue)


def list_issues_via_graphql(
    client: IGraphQLClient,
    limit: int = 10,
    cursor: str | None = None,
    statuses: list[str] | None = None,
    created_after: float | None = None,
    created_before: float | None = None,
) -> DgApiIssueList:
    """List issues via GraphQL with pagination and filtering."""
    variables: dict[str, Any] = {"limit": limit}
    if cursor:
        variables["cursor"] = cursor

    filters: dict[str, Any] = {}
    if statuses:
        filters["statuses"] = statuses
    if created_after is not None:
        filters["createdAfter"] = created_after
    if created_before is not None:
        filters["createdBefore"] = created_before
    if filters:
        variables["filters"] = filters

    result = client.execute_generic(LIST_ISSUES_QUERY, variables=variables)
    issues_result = result["issues"]

    typename = issues_result.get("__typename")
    if typename in ("UnauthorizedError", "PythonError"):
        raise Exception(issues_result["message"])
    if typename != "IssueConnection":
        raise Exception(f"Unexpected response type: {typename}")

    items = []
    for issue_data in issues_result.get("issues", []):
        items.append(
            DgApiIssue(
                id=issue_data["publicId"],
                title=issue_data["title"],
                description="",
                status=DgApiIssueStatus(issue_data["status"]),
                created_by_email=issue_data["createdBy"]["email"],
                linked_objects=[],
            )
        )

    return DgApiIssueList(
        items=items,
        cursor=issues_result.get("cursor"),
        has_more=issues_result.get("hasMore", False),
    )


def _parse_issue_from_graphql(issue: dict[str, Any]) -> DgApiIssue:
    """Parse an issue dict from a GraphQL response into a DgApiIssue."""
    context = issue.get("context")
    linked_objects = []
    for linked_object in issue.get("linkedObjects", []):
        if linked_object.get("__typename") == "Run":
            linked_objects.append(DgApiIssueLinkedRun(run_id=linked_object["id"]))
        elif linked_object.get("__typename") == "Asset":
            linked_objects.append(
                DgApiIssueLinkedAsset(asset_key="/".join(linked_object["key"]["path"]))
            )

    return DgApiIssue(
        id=issue["publicId"],
        title=issue["title"],
        description=issue["description"],
        status=DgApiIssueStatus(issue["status"]),
        created_by_email=issue["createdBy"]["email"],
        linked_objects=linked_objects,
        context=context,
    )


def create_issue_via_graphql(
    client: IGraphQLClient,
    title: str,
    description: str,
) -> DgApiIssue:
    """Create a new issue via GraphQL."""
    variables: dict[str, Any] = {"title": title, "description": description, "chatId": None}
    result = client.execute_generic(CREATE_ISSUE_MUTATION, variables=variables)
    create_result = result["createIssue"]

    typename = create_result.get("__typename")
    if typename in ("UnauthorizedError", "PythonError"):
        raise Exception(create_result["message"])
    if typename != "CreateIssueSuccess":
        raise Exception(f"Unexpected response type: {typename}")

    return _parse_issue_from_graphql(create_result["issue"])


def add_link_to_issue_via_graphql(
    client: IGraphQLClient,
    issue_id: str,
    run_id: str | None = None,
    asset_key: list[str] | None = None,
) -> DgApiIssue:
    """Add a run or asset link to an issue via GraphQL."""
    linked_object: dict[str, Any] = {}
    if run_id is not None:
        linked_object["runId"] = run_id
    if asset_key is not None:
        linked_object["assetKey"] = {"path": asset_key}

    variables: dict[str, Any] = {"issueId": issue_id, "linkedObject": linked_object}
    result = client.execute_generic(ADD_LINK_TO_ISSUE_MUTATION, variables=variables)
    add_result = result["addLinkToIssue"]

    typename = add_result.get("__typename")
    if typename in ("UnauthorizedError", "PythonError"):
        raise Exception(add_result["message"])
    if typename != "UpdateIssueSuccess":
        raise Exception(f"Unexpected response type: {typename}")

    return _parse_issue_from_graphql(add_result["issue"])


def remove_link_from_issue_via_graphql(
    client: IGraphQLClient,
    issue_id: str,
    run_id: str | None = None,
    asset_key: list[str] | None = None,
) -> DgApiIssue:
    """Remove a run or asset link from an issue via GraphQL."""
    linked_object: dict[str, Any] = {}
    if run_id is not None:
        linked_object["runId"] = run_id
    if asset_key is not None:
        linked_object["assetKey"] = {"path": asset_key}

    variables: dict[str, Any] = {"issueId": issue_id, "linkedObject": linked_object}
    result = client.execute_generic(REMOVE_LINK_FROM_ISSUE_MUTATION, variables=variables)
    remove_result = result["removeLinkFromIssue"]

    typename = remove_result.get("__typename")
    if typename in ("UnauthorizedError", "PythonError"):
        raise Exception(remove_result["message"])
    if typename != "UpdateIssueSuccess":
        raise Exception(f"Unexpected response type: {typename}")

    return _parse_issue_from_graphql(remove_result["issue"])


def update_issue_via_graphql(
    client: IGraphQLClient,
    issue_id: str,
    status: DgApiIssueStatus | None = None,
    title: str | None = None,
    description: str | None = None,
    context: str | None = None,
) -> DgApiIssue:
    """Update an existing issue via GraphQL."""
    variables: dict[str, Any] = {"issueId": issue_id}
    if status is not None:
        variables["status"] = status.value
    if title is not None:
        variables["title"] = title
    if description is not None:
        variables["description"] = description
    if context is not None:
        variables["context"] = context

    result = client.execute_generic(UPDATE_ISSUE_MUTATION, variables=variables)
    update_result = result["updateIssue"]

    typename = update_result.get("__typename")
    if typename in ("UnauthorizedError", "PythonError"):
        raise Exception(update_result["message"])
    if typename != "UpdateIssueSuccess":
        raise Exception(f"Unexpected response type: {typename}")

    return _parse_issue_from_graphql(update_result["issue"])
