# Changelog

All notable changes to the **AI Agents for Beginners** course are documented in this file.

## [Unreleased] — 2026-07-06

This release migrates the course to the **Azure OpenAI Responses API**, standardizes product naming on **Microsoft Foundry** and the **Microsoft Agent Framework (MAF)**, retires GitHub Models, updates SDK versions, and adds new content on local models and hosting other frameworks on Foundry.

### Added

- **Migration skill** — Installed the [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) Agent Skill (from [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) under `.agents/skills/`, including its references and scanner script.
- **Foundry Local (run models on-device)** — New "Alternative Provider: Foundry Local" section in [00-course-setup/README.md](./00-course-setup/README.md) covering install (`winget` / `brew`), `foundry model run`, the `foundry-local-sdk`, and wiring `FoundryLocalManager` to the Microsoft Agent Framework via `OpenAIChatClient`.
- **Hosting LangChain / LangGraph agents on Microsoft Foundry** — New section in [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) plus a runnable sample [14-langchain-hosted-agent.py](./14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) using `langchain-azure-ai[hosting]` and `ResponsesHostServer` (the `/responses` protocol), based on [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — New "Real-World Example: Microsoft Project Opal" section in [15-browser-use/README.md](./15-browser-use/README.md) framing Opal as an enterprise computer-use agent and mapping it to course concepts (human-in-the-loop, trust/security, planning, Skills).
- **Second Lesson 02 Python sample** — Added [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (see "Changed" — migrated from the former Semantic Kernel notebook) and linked it in the lesson README.
- **Models and Providers** section added to [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Changed

- **Chat Completions → Responses API (Python).** Samples that called the model directly were migrated from Chat Completions to the Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), using the `OpenAI` client against the stable Azure OpenAI `/openai/v1/` endpoint (no `api_version`). Affected samples include:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — the full function-calling walkthrough (tool schema flattened to the Responses format, tool results returned as `function_call_output`, `max_output_tokens`, etc.).
- **GitHub Models → Azure OpenAI.** GitHub Models is deprecated (retiring **July 2026**) and does not support the Responses API. All GitHub Models code paths were converted to Azure OpenAI / Microsoft Foundry across Python and .NET samples:
  - Python: Lesson 08 workflow notebooks (`01`–`03`), Lesson 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + companion `.md` docs, and the Lesson 08 dotNET workflow notebooks/`.md` (`01`–`03`) now use `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` with `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** The former `02-semantic-kernel.ipynb` was rewritten to use the Microsoft Agent Framework with Azure OpenAI (Responses API) and renamed to `02-python-agent-framework-azure-openai.ipynb`.
- **Standardized on `FoundryChatClient` + `as_agent`.** README and notebook code that referenced `AzureAIProjectAgentProvider` were standardized on the canonical pattern used by Lesson 01 and the framework's own samples: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` with `provider.as_agent(...)`. Updated across the Lesson 02–14 READMEs and notebooks (e.g., Lesson 13 memory, all Lesson 14 notebooks, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Product naming.** Renamed throughout the English content:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Unchanged: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", and environment-variable names.)
- **Dependencies** ([requirements.txt](./requirements.txt)):
  - Pinned `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Pinned `openai>=1.108.1` (minimum for the Responses API).
  - Removed `azure-ai-inference` (was only used by the migrated GitHub Models samples).
- **Environment configuration** ([.env.example](./.env.example)): removed the GitHub Models variables (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); added `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, and optional `AZURE_OPENAI_API_KEY`; updated naming to Microsoft Foundry.
- **Docs** — Updated [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), and [STUDY_GUIDE.md](./STUDY_GUIDE.md) for the above (setup env vars, verification snippet, provider guidance, naming).

### Removed

- GitHub Models onboarding steps and environment variables from the setup docs (superseded by Azure OpenAI / Microsoft Foundry).

### Security / Privacy (public-sharing cleanup)

- Cleared Jupyter notebook execution outputs that leaked a real **Azure subscription ID**, resource-group / resource names, and Bing connection ID, plus developer **local file paths and usernames**, in:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`
  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Verified no API keys, tokens, subscription IDs, or personal paths remain in the tracked English content (the `GITHUB_TOKEN` references that remain are the GitHub Actions token in workflows and the GitHub MCP server PAT in Lesson 11 setup — both legitimate and unrelated to GitHub Models).

### Notes and known limitations

- **Not executed/compiled.** These are educational samples updated for API/naming correctness; they were not run against live Azure resources, and the .NET samples were not compiled in this environment. Validate against your own Microsoft Foundry / Azure OpenAI deployment.
- **Model deployment must support the Responses API.** Use a deployment such as `gpt-4o-mini`, `gpt-4.1`, or a `gpt-5.x` model. Older models support core Responses functionality but not every feature.
- **Agent-framework version.** The samples target the latest MAF (`>=1.10.0`). The canonical agent-creation call is `client.as_agent(...)`; APIs were validated against the framework's published docs and an installed build. If you pin a different version, confirm method availability (`as_agent` vs `create_agent`).
- **Lesson 08 workflow notebook 04** intentionally keeps `AzureAIAgentClient` (from `agent-framework-azure-ai`) because it uses Microsoft Foundry Agent Service hosted tools (Bing grounding, code interpreter); it is already Responses-based.
- **.NET default deployment.** Two Lesson 08 dotNET workflow samples previously hard-coded `gpt-4o`; they now default to `AZURE_OPENAI_DEPLOYMENT` (`gpt-4o-mini`). If a sample relies on multimodal/vision input, set `AZURE_OPENAI_DEPLOYMENT` to a suitable model.
- **Foundry Local** exposes an OpenAI-compatible **Chat Completions** endpoint and is intended for local development; use Azure OpenAI / Microsoft Foundry for the full Responses API feature set.
