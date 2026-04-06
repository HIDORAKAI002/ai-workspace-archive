# Evaluation Report

## Methodology

Benchmarks are run against real open-source repositories.
Token counts use a consistent `len(text) // 4` approximation.
Impact accuracy uses graph edges as ground truth.

## Token Efficiency

| repo | commit | description | changed_files | naive_tokens | standard_tokens | graph_tokens | naive_to_graph_ratio | standard_to_graph_ratio |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| express | 925a1dff1e42f1b393c977b8b77757fcf633e09f | fix: bump qs minimum to ^6.14.2 for CVE-2026-2391 | 1 | 682 | 82 | 995 | 0.7 | 0.1 |
| express | b4ab7d65d7724d9309b6faaaf82ad492da2a6d35 | test: include edge case tests for res.type() | 1 | 703 | 510 | 970 | 0.7 | 0.5 |
| fastapi | fa3588c38c7473aca7536b12d686102de4b0f407 | Fix typo for client_secret in OAuth2 form docstrings | 1 | 6044 | 298 | 612 | 9.9 | 0.5 |
| fastapi | 0227991a01e61bf5cdd93cc00e9e243f52b47a4a | Exclude spam comments from statistics in scripts/people.py | 1 | 3844 | 734 | 616 | 6.2 | 1.2 |
| flask | fbb6f0bc4c60a0bada0e03c3480d0ccf30a3c1df | all teardown callbacks are called despite errors | 10 | 75757 | 4651 | 6143 | 12.3 | 0.8 |
| flask | a29f88ce6f2f9843bd6fcbbfce1390a2071965d6 | document that headers must be set before streaming | 4 | 13744 | 1134 | 2360 | 5.8 | 0.5 |
| gin | 052d1a79aafe3f04078a2716f8e77d4340308383 | feat(render): add PDF renderer and tests | 5 | 45453 | 958 | 1862 | 24.4 | 0.5 |
| gin | 472d086af2acd924cb4b9d7be0525f7d790f69bc | fix(tree): panic in findCaseInsensitivePathRec with RedirectFixedPath | 2 | 15065 | 1347 | 859 | 17.5 | 1.6 |
| gin | 5c00df8afadd06cc5be530dde00fe6d9fa4a2e4a | fix(render): write content length in Data.Render | 2 | 5398 | 517 | 738 | 7.3 | 0.7 |
| httpx | ae1b9f66238f75ced3ced5e4485408435de10768 | Expose FunctionAuth in __all__ | 3 | 16841 | 267 | 1796 | 9.4 | 0.1 |
| httpx | b55d4635701d9dc22928ee647880c76b078ba3f2 | Upgrade Python type checker mypy | 4 | 7246 | 820 | 1660 | 4.4 | 0.5 |
| nextjs | 528801f841e519567ef54d6e52e9b9831d162e1b | feat: add multi-platform MCP server installation support | 3 | 11254 | 4147 | 1486 | 7.6 | 2.8 |
| nextjs | 84bde35459c52e1e0c4b25c6c4799743021e0fc7 | feat: add Google Antigravity platform support for MCP install | 2 | 8509 | 394 | 1012 | 8.4 | 0.4 |

## Impact Accuracy

| repo | commit | predicted_files | actual_files | true_positives | precision | recall | f1 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| express | 925a1dff1e42f1b393c977b8b77757fcf633e09f | 2 | 1 | 1 | 0.5 | 1.0 | 0.667 |
| express | b4ab7d65d7724d9309b6faaaf82ad492da2a6d35 | 2 | 1 | 1 | 0.5 | 1.0 | 0.667 |
| fastapi | fa3588c38c7473aca7536b12d686102de4b0f407 | 2 | 1 | 1 | 0.5 | 1.0 | 0.667 |
| fastapi | 0227991a01e61bf5cdd93cc00e9e243f52b47a4a | 3 | 1 | 1 | 0.333 | 1.0 | 0.5 |
| flask | fbb6f0bc4c60a0bada0e03c3480d0ccf30a3c1df | 18 | 10 | 10 | 0.556 | 1.0 | 0.714 |
| flask | a29f88ce6f2f9843bd6fcbbfce1390a2071965d6 | 30 | 4 | 4 | 0.133 | 1.0 | 0.235 |
| gin | 052d1a79aafe3f04078a2716f8e77d4340308383 | 10 | 5 | 5 | 0.5 | 1.0 | 0.667 |
| gin | 472d086af2acd924cb4b9d7be0525f7d790f69bc | 10 | 2 | 2 | 0.2 | 1.0 | 0.333 |
| gin | 5c00df8afadd06cc5be530dde00fe6d9fa4a2e4a | 12 | 2 | 2 | 0.167 | 1.0 | 0.286 |
| httpx | ae1b9f66238f75ced3ced5e4485408435de10768 | 4 | 3 | 3 | 0.75 | 1.0 | 0.857 |
| httpx | b55d4635701d9dc22928ee647880c76b078ba3f2 | 8 | 4 | 4 | 0.5 | 1.0 | 0.667 |
| nextjs | 528801f841e519567ef54d6e52e9b9831d162e1b | 14 | 3 | 3 | 0.214 | 1.0 | 0.353 |
| nextjs | 84bde35459c52e1e0c4b25c6c4799743021e0fc7 | 11 | 2 | 2 | 0.182 | 1.0 | 0.308 |

## Flow Completeness

| repo | known_entry_points | detected_entry_points | recall | detected_flows | avg_flow_depth | max_flow_depth |
| --- | --- | --- | --- | --- | --- | --- |
| express | 2 | 0 | 0.0 | 240 | 1.0 | 1 |
| fastapi | 2 | 2 | 1.0 | 367 | 1.2 | 4 |
| flask | 2 | 0 | 0.0 | 255 | 1.2 | 4 |
| gin | 2 | 0 | 0.0 | 247 | 1.4 | 5 |
| httpx | 2 | 2 | 1.0 | 253 | 1.9 | 10 |
| nextjs | 2 | 0 | 0.0 | 205 | 1.4 | 5 |

## Search Quality

| repo | query | expected | rank | reciprocal_rank |
| --- | --- | --- | --- | --- |
| express | app handle | lib/application.js::app | 0 | 0.0 |
| express | response send | lib/response.js::res | 0 | 0.0 |
| express | request | lib/request.js::req | 0 | 0.0 |
| fastapi | FastAPI application | fastapi/applications.py::FastAPI | 1 | 1.0 |
| fastapi | APIRoute routing | fastapi/routing.py::APIRoute | 1 | 1.0 |
| fastapi | Depends injection | fastapi/params.py::Depends | 0 | 0.0 |
| flask | Flask wsgi | src/flask/app.py::Flask | 1 | 1.0 |
| flask | AppContext globals | src/flask/ctx.py::AppContext | 0 | 0.0 |
| flask | create logger | src/flask/logging.py::create_logger | 1 | 1.0 |
| gin | Engine ServeHTTP | gin.go::Engine | 0 | 0.0 |
| gin | Context request | context.go::Context | 0 | 0.0 |
| gin | node tree | tree.go::node | 1 | 1.0 |
| httpx | Client request | httpx/_client.py::Client | 4 | 0.25 |
| httpx | Response headers | httpx/_models.py::Response | 0 | 0.0 |
| httpx | BaseClient | httpx/_client.py::BaseClient | 1 | 1.0 |
| nextjs | GraphStore nodes | code_review_graph/graph.py::GraphStore | 1 | 1.0 |
| nextjs | parse AST | code_review_graph/parser.py::CodeParser | 0 | 0.0 |
| nextjs | full build | code_review_graph/incremental.py::full_build | 1 | 1.0 |

## Build Performance

| repo | file_count | node_count | edge_count | flow_detection_seconds | community_detection_seconds | search_avg_ms | nodes_per_second |
| --- | --- | --- | --- | --- | --- | --- | --- |
| express | 141 | 1910 | 17553 | 0.106 | 0.104 | 0.7 | 18041 |
| fastapi | 1122 | 6285 | 27117 | 0.128 | 0.911 | 1.5 | 49085 |
| flask | 83 | 1446 | 7974 | 0.095 | 0.043 | 0.7 | 15245 |
| gin | 99 | 1286 | 16762 | 0.111 | 0.095 | 0.5 | 11593 |
| httpx | 60 | 1253 | 7896 | 0.096 | 0.04 | 0.4 | 12998 |
| nextjs | 98 | 1443 | 9167 | 0.08 | 0.055 | 0.6 | 17987 |
