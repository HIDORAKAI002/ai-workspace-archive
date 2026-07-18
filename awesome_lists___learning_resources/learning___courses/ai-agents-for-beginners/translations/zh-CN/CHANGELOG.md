# 更新日志

本文件记录了 **AI Agents for Beginners** 课程的所有重要变更。

## [发布] — 2026-07-13

本次发布新增了两个完成部署章节的课程——将代理扩展到 Microsoft Foundry 和缩减到单个工作站——以及一个冒烟测试流水线、焕新的课程导航、新增学习者技能和更新的品牌标识。

### 新增

- **第16课 — 使用 Microsoft Foundry 部署可扩展代理。** 新增课程 [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) 和可运行笔记本 [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb)，构建生产级客户支持代理（工具、RAG、记忆、模型路由、响应缓存、人工审批、评估门控和 OpenTelemetry 跟踪），包含开发/部署/运行时的 Mermaid 图，知识检测、作业和挑战。
- **第17课 — 使用 Foundry Local 和 Qwen 创建本地 AI 代理。** 新增课程 [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) 和笔记本 [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb)，构建完全在设备上的工程助理（通过 Foundry Local 使用 Qwen 函数调用，沙箱文件工具，本地 Chroma RAG，可选本地 MCP），包含本地专用/本地 RAG/调用工具的图示，知识检测、作业和挑战。
- **冒烟测试流水线。** 新增 [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) 工作流 [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml)，以及为第01、04、05 和 16 课中可部署代理提供的各课目录 [tests/](./tests/README.md)，带有索引 README 将各目录映射到对应课程和托管代理名。第16课增加“使用冒烟测试验证已部署代理”章节；第01/04/05课新增可选冒烟测试指引。
- **学习者技能。** 新增代理技能于 `.agents/skills/`： [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md)、[local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md)（涵盖第16和17课指导），和[testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md)（如何针对实时 Microsoft Foundry / Azure OpenAI 设置验证笔记本示例）。
- **笔记本验证运行器。** 新增 [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1)，使用 `nbconvert` 无头执行所有 Python 笔记本并输出通过/失败矩阵（和 `results.json`）。自动检测仓库根目录和 Python，默认排除非课程笔记本（如 `.venv`、`site-packages`、`translations`、技能模板资源）及 `.NET` 笔记本，支持参数 `-Filter`、`-Timeout`、`-List`、`-IncludeDotnet` 及 `-Python`。
- **课程导航。** 为第11至15课补充增加了前一课/后一课链接，保证整套课程 00 → 18 双向连贯跳转。
- **新缩略图。** 第16和17课的课程缩略图，以及更新的仓库社交分享图像 [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png)（现展示两个新课程和 `aka.ms/ai-agents-beginners` 链接）。
- <strong>依赖项</strong> ([requirements.txt](../../requirements.txt))：为第17课新增 `foundry-local-sdk` 和 `chromadb`。

### 变更

- **主 [README.md](./README.md)** 课程表：第16和17课现已链接到内容（之前显示“敬请期待”）；仓库主图更换为 `repo-thumbnailv3.png`。
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**：新增第16和17课至逐课指南和学习路径，及增加“通过冒烟测试验证已部署代理”章节。
- **[AGENTS.md](./AGENTS.md)**：更新课程数量/描述（00–18），新增冒烟测试验证章节，添加第16和17课示例命名。
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**：“上一课”链接更新为第17课（原为第15课），完成课程链。
- **非弃用模型的标准化引用。** 将课程中所有 `gpt-4o` / `gpt-4o-mini` 替换为 `gpt-4.1-mini`（全部版本的 `gpt-4o` 将于2026年退役）。第16课的模型路由示例继续使用小型 `gpt-4.1-mini` 和大型 `gpt-4.1` 对比。Python 笔记本改从环境变量（`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`）选取模型，避免硬编码。

### 注意事项及已知限制

- **未对实时 Azure 运行。** 新课程的笔记本为教学示例；请在您的 Microsoft Foundry / Foundry Local 环境中运行验证。冒烟测试工作流需部署课程代理并配置拥有 **Azure AI User** 角色的 Azure OIDC 秘钥（`AZURE_CLIENT_ID`、`AZURE_TENANT_ID`、`AZURE_SUBSCRIPTION_ID`），作用域为 Foundry 项目级。
- **第17课仅限本地运行。** 无 Foundry Responses 端点，冒烟测试不适用；通过在本地工作站运行笔记本验证。

## [发布] — 2026-07-06

本次发布将课程迁移为 **Azure OpenAI Responses API**，统一产品命名为 **Microsoft Foundry** 和 **Microsoft Agent Framework (MAF)**，淘汰 GitHub 模型，更新 SDK 版本，新增本地模型和在 Foundry 上托管其他框架的内容。

### 新增

- <strong>迁移技能</strong> — 安装 [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) 代理技能（来自 [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)），放置于 `.agents/skills/`，包含引用和扫描脚本。
- **Foundry Local（设备端运行模型）** — 在 [00-course-setup/README.md](./00-course-setup/README.md) 增加“备用提供方：Foundry Local”章节，涵盖安装 (`winget` / `brew`)、`foundry model run` 命令、`foundry-local-sdk`，以及如何通过 `OpenAIChatClient` 将 `FoundryLocalManager` 接入 Microsoft Agent Framework。
- **在 Microsoft Foundry 上托管 LangChain / LangGraph 代理** — 在 [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) 新增章节，并提供可运行示例 [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py)，使用 `langchain-azure-ai[hosting]` 和 `ResponsesHostServer` （即 `/responses` 协议），基于 [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents)。
- **微软 Opal 计划** — 在 [15-browser-use/README.md](./15-browser-use/README.md) 新增“真实案例：微软 Opal 计划”章节，将 Opal 定义为企业计算使用代理，并映射到课程概念（人类在环、信任/安全、规划、技能）。
- **第二个第02课 Python 示例** — 新增 [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb)（见“变更”——从之前的语义内核笔记本迁移），并在课程 README 中链接。
- **新增“模型与提供方”章** 于 [STUDY_GUIDE.md](./STUDY_GUIDE.md)。

### 变更

- **聊天补全 → 响应 API（Python）**。直接调用模型的示例迁移到响应 API（`client.responses.create(input=..., store=False)`，`resp.output_text`），使用针对稳定版 Azure OpenAI `/openai/v1/` 端点的 `OpenAI` 客户端（无 `api_version`）。受影响示例包括：
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — 功能调用完整流程（工具结构扁平化为响应格式，工具结果返回为 `function_call_output`、`max_output_tokens` 等字段）。
- **GitHub 模型 → Azure OpenAI。** GitHub 模型已弃用（2026年7月退役），且不支持响应 API。所有 GitHub 模型代码路径已迁移为 Azure OpenAI / Microsoft Foundry，覆盖 Python 和 .NET 示例：
  - Python：第08课工作流笔记本（`01`–`03`），第14课（`14-handoff`、`14-human-loop`、`hotel_booking_workflow_sample.py`）。
  - .NET：`01`–`04`、`07`、`08`，包含 `*-dotnet-agent-framework.cs` 和相关 `.md` 文档，第08课 .NET 工作流笔记本/文档（`01`–`03`）现使用 `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)`，配合 `AzureCliCredential`。
- **语义内核 → Microsoft Agent Framework。** 原 `02-semantic-kernel.ipynb` 重写为结合 Microsoft Agent Framework 和 Azure OpenAI（响应 API），并更名为 `02-python-agent-framework-azure-openai.ipynb`。
- **统一使用 `FoundryChatClient` + `as_agent` 模式。** README 及笔记本中引用 `AzureAIProjectAgentProvider` 调用统一采用第01课和框架示例使用的标准模式：`FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` 和 `provider.as_agent(...)`。升级覆盖第02至14课 README 和笔记本（如第13课内存，第14课所有示例，`11-agentic-protocols/code_samples/github-mcp/app.py`）。
- **产品命名调整。** 英文内容中统一替换：
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - （保持不变：“Azure OpenAI”、“Azure AI Search”、“Azure AI Inference”及环境变量名称）
- <strong>依赖项</strong> ([requirements.txt](../../requirements.txt))：
  - 固定版本 `agent-framework>=1.10.0`、`agent-framework-foundry>=1.10.0`、`agent-framework-openai>=1.10.0`。
  - 固定版本 `openai>=1.108.1`（响应 API 所需最低版本）。
  - 移除 `azure-ai-inference`（仅用于已迁移的 GitHub 模型示例）。
- <strong>环境配置</strong> ([.env.example](../../.env.example))：移除 GitHub 模型变量（`GITHUB_TOKEN`、`GITHUB_ENDPOINT`、`GITHUB_MODEL_ID`）；新增 `AZURE_OPENAI_ENDPOINT`、`AZURE_OPENAI_DEPLOYMENT` 和可选 `AZURE_OPENAI_API_KEY`；命名更新为 Microsoft Foundry。
- <strong>文档</strong> — 更新 [00-course-setup/README.md](./00-course-setup/README.md)、[AGENTS.md](./AGENTS.md)、[README.md](./README.md) 和 [STUDY_GUIDE.md](./STUDY_GUIDE.md) 以反映上述内容（环境变量配置、验证代码段、提供方指导、命名等）。

### 移除

- 移除设置文档中的 GitHub 模型入门步骤及环境变量（被 Azure OpenAI / Microsoft Foundry 替代）。

### 安全 / 隐私（公开共享清理）

- 清理了泄露真实 **Azure 订阅 ID**、资源组/资源名称和 Bing 连接 ID 以及开发者 <strong>本地文件路径和用户名</strong> 的 Jupyter 笔记本输出，具体文件：
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- 已确认跟踪的英文内容中不存在任何 API 密钥、令牌、订阅 ID 或个人路径（遗留的 `GITHUB_TOKEN` 引用是工作流程中的 GitHub Actions 令牌和第 11 课设置中的 GitHub MCP 服务器 PAT —— 两者都是合法且与 GitHub 模型无关）。

### 备注和已知限制

- **未执行/编译。** 这些是更新了 API/命名正确性的教学示例；未针对实时 Azure 资源运行，也未在此环境中编译 .NET 示例。请基于您自己的 Microsoft Foundry / Azure OpenAI 部署进行验证。
- **模型部署必须支持 Responses API。** 使用诸如 `gpt-4.1-mini`、`gpt-4.1` 或 `gpt-5.x` 模型的部署。旧模型支持核心 Responses 功能但并非全部功能。
- **代理框架版本。** 示例针对最新的 MAF（`>=1.10.0`）。规范的代理创建调用为 `client.as_agent(...)`；API 经框架发布文档及已安装版本验证。如选择其他版本，请确认方法是否可用（`as_agent` 与 `create_agent`）。
- **第 08 课工作流笔记本 04** 有意保留了 `AzureAIAgentClient`（来自 `agent-framework-azure-ai`），因为它使用了 Microsoft Foundry Agent Service 托管工具（Bing 定位、代码解释器）；该客户端已基于 Responses。
- **.NET 默认部署。** 之前第 08 课中的两份 dotNET 工作流示例硬编码了特定模型；现在默认使用 `AZURE_OPENAI_DEPLOYMENT`（`gpt-4.1-mini`）。如果示例涉及多模态/视觉输入，请将 `AZURE_OPENAI_DEPLOYMENT` 设置为合适模型。
- **Foundry Local** 暴露 OpenAI 兼容的 **Chat Completions** 端点，适用于本地开发；若需完整 Responses API 功能集，请使用 Azure OpenAI / Microsoft Foundry。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->