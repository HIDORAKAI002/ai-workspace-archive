# Flowise‑to‑LangChain Code Converter

**Status**  Draft 0.9  |  **Owner**  Gregg Coppen  |  **Author**  ChatGPT (o3)  |  **Last updated**  14 Jul 2025

---

## 1   Overview

Flowise offers an intuitive visual interface for building LLM‑powered applications on top of LangChain.js, but lacks a native **“export to code”** capability. This project delivers a **TypeScript command‑line tool and library** that converts a Flowise *chatflow* JSON export into **fully‑fledged, production‑ready LangChain TS code**, with **optional deep LangFuse instrumentation** for observability.

A future release will add a Python backend that outputs LangChain‑py code, sharing the same intermediate representation.

---

## 2   Problem Statement

1. **Prototype vs production gap**  Teams prototype sophisticated flows in Flowise, but productionizing requires either hosting Flowise or rebuilding the logic by hand.
2. **Vendor lock‑in & Ops overhead**  Running a separate Flowise server in prod adds latency, scaling complexity, and an extra surface area for failure.
3. **Lack of version control & CI/CD**  Flowise flows are opaque JSON blobs; converting to code enables Git workflows, automated testing, and granular code reviews.

---

## 3   Goals & Objectives

| #  | Goal                                                                                                                                     | Success Metric                              |
| -- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| G1 | Generate *functionally equivalent* TypeScript code for ≥ 95 % of Flowise core nodes                                                      | Pass automated golden‑flow regression tests |
| G2 | Provide a single command‑line interface (CLI) that converts a `.json` export to a runnable project scaffold in ≤ 10 s for a 50‑node flow | CLI UX time‑to‑code ≤ 10 s                  |
| G3 | Offer **opt‑in** LangFuse instrumentation covering 100 % of LLM/tool calls                                                               | Trace completeness verified in LangFuse UI  |
| G4 | Be *extensible*: new Flowise nodes mapable via JSON schema + plug‑in registry                                                            | New node conversion added with ≤ 50 LOC     |

**Non‑goals** for v1.0

- Graphical editing of flows
- Real‑time sync back to Flowise UI
- Auto‑deployment (handled by downstream CI/CD)

---

## 4   Personas & Use‑Cases

### 4.1   AI Engineer “Sam”

- Rapid‑prototypes in Flowise → needs version‑controlled code to embed in a larger Node microservice.

### 4.2   Consultant “Jamie”

- Delivers bespoke chatbots for clients; wants to hand off readable code plus LangFuse dashboards for post‑launch monitoring.

### 4.3   Open Cloud Flow Platform

- Wants to batch‑convert stored Flowise templates into code for serverless execution at scale.

---

## 5   User Stories (MoSCoW)

| Priority | As a / role | I want to                                        | So that                                                                  |
| -------- | ----------- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| **M**    | CLI user    | run `flowise‑export‑to‑lc myflow.json --out src` | generate a TypeScript project scaffold                                   |
| **M**    | Dev         | enable `--with‑langfuse`                         | capture full traces in my LangFuse instance                              |
| **M**    | Dev         | pass `--flowise‑version 1.5.0`                   | ensure correct node mapping when multiple Flowise versions are supported |
| **S**    | DevOps      | set API keys via `.env`                          | avoid hard‑coding credentials in code output                             |
| **C**    | Python dev  | output Python instead of TS                      | integrate with existing Python stack (post‑v1)                           |
| **W**    | GUI user    | drag‑drop JSON file into a web UI                | convert without CLI (nice‑to‑have)                                       |

---

## 6   Functional Requirements

### 6.1   Input Handling

- Accept single Flowise chatflow JSON via CLI arg or STDIN.
- Validate JSON schema; detect unsupported/malformed nodes → output actionable error messages.
- Support Flowise **v1.4 → current**; parse `nodes`, `edges`, flow metadata.

### 6.2   Node‑to‑Code Mapping Engine

- Maintain registry: `flowise_type -> converter(moduleFn)`
- Core categories to support v1.0:
  - **LLM & Chat Models** – OpenAI, Anthropic, Claude, Ollama, Azure.
  - **Prompts & Prompt Templates** – incl. partials/formatters.
  - **Chains** – LLMChain, ConversationChain, RetrievalQA, QAGeneration, VectorDBQA.
  - **Agents & Tools** – Zero‑Shot ReAct, Function Agent, Tool nodes (SerpAPI, Calculator, Custom JS Function).
  - **Vector Stores & Embeddings** – FAISS, Pinecone, Qdrant.
  - **Memory** – BufferMemory, SummaryBuffer, VectorStoreRetrieverMemory.
  - **Control Flow** – If/Else, ConditionAgent, Parallel merge.
  - **Utilities** – Text splitters, loaders, output parsers.

### 6.3   Code Generation

- Emit **ES‑module** TypeScript (`.ts`) files, compiled target `ES2022`.
- Provide project scaffold:
  - `src/generated/${flowName}.ts` – core conversion output
  - `src/index.ts` – entry sample (`runFlow("Hello")`)
  - `package.json` with LangChain, dotenv, optionally LangFuse deps
  - ESLint + Prettier config
- Preserve variable/parameter names from Flowise for traceability.
- Insert TODO comments where manual credential insertion required.

### 6.4   LangFuse Integration (optional)

- CLI flag `--with‑langfuse` adds:
  - Import `@langfuse/langchain` callback
  - Instantiate handler reading `LANGFUSE_*` env vars
  - Pass handler via `callbacks` array on `invoke` / `call` wrappers
  - Auto‑flush on process exit

### 6.5   Validation Test Harness

- After generation, tool can optionally `--self‑test`:
  - Spin up Node process, run flow with sample prompt
  - Compare against Flowise REST run output (requires Flowise URL) or golden snapshot
  - Report mismatches.

---

## 7   Non‑Functional Requirements

| Category          | Requirement                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| **Performance**   | Generation time < 10 s for 100‑node flow; runtime overhead ≤ 5 % vs hand‑written chain              |
| **Reliability**   | Conversion CLI error codes with clear remediation; 90 %+ automated test coverage                    |
| **Extensibility** | New converters pluggable via JSON mapping & single Factory class                                    |
| **Security**      | Never print secrets; instruct users to load creds from `.env`; scan output for accidental key dumps |
| **Compatibility** | Supports Node >= 18; LangChain >= 0.2.12; Flowise 1.4 → current                                     |
| **Docs**          | Auto‑generate README with usage examples + FAQ                                                      |

---

## 8   Tech Architecture

```text
[CLI] → [JSON Parser] → [Intermediate Graph IR] →
    ├─[Mapping Registry] ↴
    ├─[Code Emitter (TS)]
    │     └─ emits src/generated/*.ts
    └─[Validation Suite] (optional runtime diff)

Future:   +─[Python Emitter] (shares IR)
```

- **IR = Intermediate Representation** capturing nodes, edges, metadata, parameters.
- **Mapping Registry** houses conversion functions per Flowise node type.
- **Emitters** traverse IR to produce language‑specific source files.

---

## 9   Dependencies

- **Flowise JSON spec** (reverse‑engineered), Flowise OSS repo.
- **LangChain JS** (NPM `langchain`)
- **LangFuse JS SDK** (NPM `@langfuse/langchain`)
- **Node & TypeScript**
- Dev tooling: ESLint, Prettier, ts‑node, Jest.

---

## 10  Assumptions

- Flowise exports will continue to include all node metadata required for mapping.
- Flowise core nodes map 1‑to‑1 to public LangChain JS classes.
- Users are comfortable installing Node dependencies & editing generated code.

---

## 11  Open Questions

1. **Complex Branching** – Does Flowise allow loops or more than binary branches? If so, how will generator handle recursion or iteration?
2. **Custom JS Nodes** – Should we inline user‑authored code snippets or generate import stubs?
3. **Flowise Version Drift** – Strategy for validating node schemas across versions? JSON Schema + SemVer mapping table?
4. **Plugin Store** – Will we expose converter as Flowise plugin (button in UI)?

---

## 12  Milestones & Timeline (T‑month)

| Date     | Milestone          | Deliverables                                              |
| -------- | ------------------ | --------------------------------------------------------- |
| T + 0 w  | Kick‑off           | Repo scaffolding, PRD approval                            |
| T + 4 w  | **Alpha 1**        | Parsing + mapping of LLM, Prompt, LLMChain (linear flows) |
| T + 8 w  | **Alpha 2**        | Agents, Tools, Vector Stores, Retrievers                  |
| T + 10 w | **Beta**           | If/Else, Memory, LangFuse flag, CLI UX polished           |
| T + 12 w | **RC1**            | 90 % node coverage, doc site, CI tests, sample templates  |
| T + 14 w | **v1.0 GA**        | Public release, blog post, community feedback             |
| Post v1  | Python Emitter PoC | Same IR, Python mapping; coverage parity 50 %             |

---

## 13  Success Metrics

- **Adoption** – 100+ GitHub stars first month; 10+ external issues filed.
- **Accuracy** – ≥ 95 % of sample flows converted & pass functional diff test.
- **DX** – Surveyed users rate overall satisfaction ≥ 8/10.
- **Perf** – Converting + running generated code at least 30 % faster than Flowise REST runtime for 10‑node query.

---

## 14  Risks & Mitigations

| Risk                                | Impact                            | Mitigation                                                           |
| ----------------------------------- | --------------------------------- | -------------------------------------------------------------------- |
| Flowise JSON changes unexpectedly   | Converter breaks                  | Automated nightly schema validation against Flowise `main` branch CI |
| Unsupported node discovered by user | Conversion fails                  | Gracefully warn, stub code with TODO + fallback to Flowise REST call |
| LangChain API deprecations          | Generated code becomes invalid    | Pin tested LangChain version in `package.json` + release notes       |
| Security mis‑configuration          | Leaked API keys in generated code | Redact fields, enforce `.env` usage, add secret‑scan CI step         |

---

## 15  Appendix

- **Glossary**: Flowise = visual builder; LangChain = LLM framework; LangFuse = observability.
- **Related Work**: LangFlow export, chainlit builder, etc.

