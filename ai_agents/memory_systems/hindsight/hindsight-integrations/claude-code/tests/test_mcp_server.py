"""Regression tests for mcp_server.py.

The MCP server runs as a stdio subprocess; the Claude Code MCP client buffers
up to 16 MB looking for a JSON-RPC message boundary (newline) and disconnects
if a single response exceeds that ceiling. The /mental-models LIST endpoint
defaults to detail=full, which returns synthesized content + reflect_response
for every page in the bank — at realistic agent scales (tens of pages with
~100 KB content each) this exceeds 16 MB in a single response and triggers a
deterministic disconnect during agent_knowledge_list_pages. The fix is to
request detail=metadata, which the API supports specifically for this use case
(see the upstream PR that added the parameter: "reduces payload for agent
boot flows and MCP clients where context budget is limited").
"""

import os

SCRIPTS_DIR = os.path.join(os.path.dirname(__file__), "..", "scripts")


def _read_mcp_server_source() -> str:
    return open(os.path.join(SCRIPTS_DIR, "mcp_server.py"), encoding="utf-8").read()


class TestListPagesUsesMetadataProjection:
    """`agent_knowledge_list_pages` must request the API's metadata projection.

    The /mental-models endpoint accepts a `detail` query parameter with values
    `metadata` / `content` / `full`, defaulting to `full`. The full projection
    returns synthesized content + reflect_response for every page in the bank,
    which has caused real disconnects (>16 MB single JSON-RPC response). The
    docstring promises "IDs and names only", so the request must pin
    `detail=metadata`.
    """

    def test_list_pages_request_uses_detail_metadata(self):
        src = _read_mcp_server_source()
        assert "/mental-models?detail=metadata" in src, (
            "list_pages must request detail=metadata; the API defaults to full"
        )
        list_pages_def = src.find("def agent_knowledge_list_pages")
        next_def = src.find("def agent_knowledge_get_page")
        assert list_pages_def > 0 and next_def > list_pages_def
        list_pages_body = src[list_pages_def:next_def]
        assert "detail=metadata" in list_pages_body
