# 变更日志：MCP 入门课程

本文档记录了针对 Model Context Protocol (MCP) 入门课程的所有重大变更。变更按时间倒序记录（最新变更优先）。

## 2026年6月24日

### 新课程：在 Copilot 应用中使用 MCP

- [工具章节](./12-tooling/README.md) 新增了工具章节。
- [Copilot 应用中的 MCP](./12-tooling/01-copilot-app/README.md)

## 2026年6月16日

### MCP 规范对齐与示例验证

根据当前的 **MCP Specification 2025-11-25** 以及最新官方 SDK 验证了课程内容，修正了剩余的过时规范引用，并确认核心示例仍能成功构建和运行。

#### 规范版本校正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新了仍然声称旧版规范为<em>当前/最新</em>标准的英文内容，并将链接重新指向规范的权威 `modelcontextprotocol.io` 路径：
- **05-AdvancedTopics/mcp-security/README.md**：更新了“当前标准”横幅、简介、核心安全原则标题、强制要求标题、Microsoft Entra ID 部分、参考资料及资源链接，以及关闭的安全通知（8个引用）至 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新了附加资源规范链接和“当前标准”横幅为 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：将过时的 `2025-03-26` 安全与信任链接替换为当前的 2025-11-25 安全最佳实践页面
- **03-GettingStarted/14-sampling/README.md**：更新了官方采样文档链接为 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新现在时态中“当前 MCP 规范”的引用和附加资源规范链接为 2025-11-25（历史 SSE 弃用注释保持不变以确保准确）

#### 针对当前 SDK 的示例验证

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：`npm install` 解析为 `@modelcontextprotocol/sdk@1.29.0`；`tsc --noEmit` 编译无类型错误 — 现有 `McpServer`/`StdioServerTransport` API 依然有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：在隔离的 `.venv` 中使用 `mcp[cli]`（1.27.2）验证；`py_compile` 通过，`FastMCP.list_tools()` 正确返回 `add` 和 `subtract` 工具
- 确认所有示例中 `@modelcontextprotocol/sdk` 版本范围（`>=1.26.0` / `^1.26.0` / `^1.27.0`）均可干净解析为当前 `1.29.0`，无破坏性 API 变更

#### 依赖项版本对齐（补齐版本差距）

将过时的 SDK 版本固定点升级，使每个示例都跟踪当前 MCP 发行版本，符合仓库范围的规范：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：将 `@modelcontextprotocol/sdk` 版本从 `^1.8.0` 升级到 `>=1.26.0`，并更新了过时的 `"updated for MCP 2025-06-18"` 包描述为 `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 和 **lab4/code/github_mcp_server/pyproject.toml**：将精确版本 `mcp==1.23.0` 升级为 `mcp>=1.26.0`；重新生成了两个 `uv.lock` 文件（`uv lock`），以确保锁文件解析至当前的 `mcp 1.27.2` 并与清单保持同步

#### 课程差距分析 — 最新规范特性覆盖

确认课程已覆盖 MCP 2025-11-25 中引入或扩展的所有原语，无内容缺口：
- <strong>采样</strong>：课程 03-GettingStarted/14-sampling 以及 05-AdvancedTopics/mcp-sampling
- **引出（包括 URL 模式）**：记录于 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features
- <strong>根上下文</strong>：记录于 00-Introduction、01-CoreConcepts 和 05-AdvancedTopics/mcp-root-contexts
- **任务（实验性质长时间运行操作）**：记录于 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features
- <strong>工具注解</strong>（`readOnlyHint` / `destructiveHint`）：记录于 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features

### 安全强化与依赖漏洞修复

对每个依赖配置和示例源代码执行全面的安全检查，修复了所有报告的 npm 安全咨询和一个代码级别的发现。修复后，`npm audit` 在所有审计目录中报告 **0 漏洞**。

#### npm 依赖安全漏洞（传递依赖）— 已修复

审计了所有 15 个提交的 `package-lock.json` 文件。漏洞仅限于由 MCP Inspector 开发工具、OpenAI 客户端和 MCP SDK 引入的传递依赖；现在均已修复且未破坏示例：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 和 **lab3/code/weather_mcp/inspector**：升级 `@modelcontextprotocol/inspector`（从 `0.16.6` / `0.14.1` 到 `0.22.0`），清除了打包的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 和 `ws` 的安全咨询。添加了 npm `overrides` 条目，强制使用修补的 `shell-quote@1.8.4`，消除 `concurrently` 存在的剩余严重警告；重新生成锁文件（现无漏洞）
- **03-GettingStarted/samples/typescript**：`npm audit fix` 更新了传递依赖 `qs`（中危）至修补版本
- **03-GettingStarted/samples/javascript**：`npm audit fix` 更新了传递依赖 `hono`（中危）至修补版本
- **03-GettingStarted/03-llm-client/solution/typescript**：`npm audit fix` 更新了传递依赖 `form-data`（高危）至修补版本
- **03-GettingStarted/11-simple-auth/solution/typescript**：生成了缺失的 `package-lock.json`，使项目可复现和可审计（0 漏洞）

#### 代码级安全修复（OWASP A03: 注入）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除了 `open_in_vscode` 工具中 `shell=True`。之前的 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允许文件夹路径中的 shell 元字符被 `cmd.exe` 解读（命令注入向量）。现直接以无 shell 方式启动解析后的 `Code.exe`，传入文件夹作为参数，功能等效且安全

#### Python 依赖审核

- 使用 `pip-audit` 审计所有 Python 依赖集。`05-AdvancedTopics` 和 `03-GettingStarted/samples/python` 均报告 <strong>无已知漏洞</strong>（它们的 `mcp` / `httpx` / `pydantic` / `python-dotenv` 版本范围解析为当前修补版本）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 发现传递依赖 **`werkzeug` 3.1.1** 存在三个 `safe_join` Windows 设备名拒绝服务漏洞 — `CVE-2025-66221`、`CVE-2026-21860` 和 `CVE-2026-27199`（全部在 3.1.6 中修复）。添加了明确的安全版本固定 `werkzeug>=3.1.6`，确保解析为修补版；已验证该约束可与 `chainlit` / `mcp` / `semantic-kernel` 堆栈正常兼容

### 产品命名重塑

更新所有课程内容以反映微软的产品重新命名：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社区链接
- **AGENTS.md**：更新 Discord 服务器引用
- **README.md**：更新技术生态引用
- **study_guide.md**：更新案例研究引用
- **05-AdvancedTopics/README.md**：更新模块 5.13 标题和描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新章节标题和描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：完整模块标题与内容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉引用链接
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究引用
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第9节标题、徽章和功能
- **08-BestPractices/README.md**：更新 Discord 社区链接
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 频道引用
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署引用
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服务表
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新资源引用

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**：更新主要课程引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新模块标题、概述和所有模块标题
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新标题、学习目标、设置说明和资源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新标题、学习目标、MCP 主机表格和交叉引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新标题、徽章、先决条件和资源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新代理构建器引用和反馈链接
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新先决条件和扩展引用

---

## 2026年4月11日

### 新课程、文档修正和依赖更新

#### 新增课程内容

**模块 05 - 高级主题**
- **课程 5.17：使用 MCP 进行对抗性多智能体推理**（`05-AdvancedTopics/mcp-adversarial-agents/README.md`）：新全面指南，涵盖多智能体系统的对抗辩论模式
  - Mermaid 架构图：两个智能体 → 共享 MCP 服务器 → 辩论记录 → 裁判 → 判决
  - 共享 MCP 工具服务器（`web_search` + `run_python`），使用 Python 和 TypeScript 实现
  - 对立系统提示（支持 / 反对 / 裁判），带明确的工具使用要求
  - Python、TypeScript 和 C# 中的辩论协调者，管理回合与论据路由
  - MCP `ClientSession` 用于协调实际工具调用
  - 用例表（幻觉检测、威胁建模、API 设计审查、事实验证、技术选择）
  - 安全考虑：沙箱执行、工具调用验证、速率限制、审计日志
  - 结构化练习，包含三种实用场景（代码审查、架构决策、内容审核）

#### 文档修复

**模块 03 - 入门指南**
- **05-stdio-server/README.md**：修正不完整的 TypeScript stdio 服务器示例 — 添加缺失的 transport 实例化（`new StdioServerTransport()`）和 `server.connect(transport)` 调用，以匹配同节中的 Python 和 .NET 示例
- **14-sampling/README.md**：修正拼写错误 — 将 `"Sampling is an davanced features"` 更正为 `"Sampling is an advanced feature"`

#### 课程更新

**主 README.md**
- 在课程表中新增条目 5.17（使用 MCP 进行对抗性多智能体推理），并附上新课程的直接链接

**05-AdvancedTopics/README.md**
- 在课程表中新增课程 5.17 行

**study_guide.md**
- 将对抗性多智能体推理主题添加到思维导图和高级主题的文字描述中

#### 代码和安全修复

**模块 05 - 对抗智能体（`mcp-adversarial-agents`）**
- **安全修复 — 命令注入**：在 TypeScript 的 `run_python` 工具中将 `execSync` 的 shell 插值替换为 `execFile` + `promisify`，消除了命令注入风险（LLM 控制的代码现在作为字面参数元素传递，无需 shell 参与）
- **MCP 工具循环连接**：更新了 Python 辩论协调器，使用 `AsyncAnthropic` 客户端（替代阻塞的同步 `Anthropic`），直接向每个代理轮次传递活动 `ClientSession`，每轮通过 `session.list_tools()` 获取工具定义，并在循环中通过 `session.call_tool()` 调度 `tool_use` 块，直到模型发出最终文本响应

#### 依赖更新

- 将多个包中的 `hono` 升级至 4.12.12（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）
- 将 TypeScript 包中的 `@hono/node-server` 从 1.19.11 升级至 1.19.13
- 将 Python 包中的 `cryptography` 从 46.0.5 升级至 46.0.7（10-StreamliningAIWorkflows 的实验 3 和 4）
- 将 10-StreamliningAIWorkflows 检查器中的 `lodash` 从 4.17.23 升级至 4.18.1

#### 翻译

- 同步了 48 种以上语言的翻译，包含最新源变更（i18n 更新）

---

## 2026 年 2 月 5 日

### 仓库范围内的验证和导航改进

#### 新增课程内容

**模块 03 - 入门**
- **12-mcp-hosts/README.md**：新增关于 MCP 主机设置的全面指南
  - Claude Desktop、VS Code、Cursor、Cline、Windsurf 配置示例
  - 所有主流主机的 JSON 配置模板
  - 传输类型对比表（stdio、SSE/HTTP、WebSocket）
  - 常见连接问题排查
  - 主机配置的安全最佳实践

- **13-mcp-inspector/README.md**：新增 MCP Inspector 调试指南
  - 安装方法（npx、npm 全局安装、从源码）
  - 通过 stdio 和 HTTP/SSE 连接服务器
  - 测试工具、资源和提示流程
  - 与 VS Code 集成 MCP Inspector
  - 常见调试场景及解决方案

**模块 04 - 实践实现**
- **pagination/README.md**：新增分页实现指南
  - Python、TypeScript、Java 的基于游标的分页模式
  - 客户端分页处理
  - 游标设计策略（不透明与结构化）
  - 性能优化建议

**模块 05 - 高级主题**
- **mcp-protocol-features/README.md**：新增协议功能深度解析
  - 进度通知实现
  - 请求取消模式
  - 带 URI 模式的资源模板
  - 服务器生命周期管理
  - 日志级别控制
  - 带 JSON-RPC 代码的错误处理模式

#### 导航修正（24+ 文件更新）

**主模块 README**
 现链接至首节课和下一个模块

**02-Security 子文件**
- 5 篇安全补充文档均新增“接下来做什么”导航：

**09-CaseStudy 文件**
- 所有案例研究文件均新增顺序导航：

**10-StreamliningAI 实验**
在模块 10 概览和模块 11 添加了“接下来做什么”部分

#### 代码和内容修复

**SDK 和依赖更新**
修正了空 openai 版本为 `^4.95.0`
将 SDK 从 `^1.8.0` 升级至 `>=1.26.0`
将 mcp 版本限定升级至 `>=1.26.0`

<strong>代码修复</strong>
修正无效模型名 `gpt-4o-mini` 为 `gpt-4.1-mini`

<strong>内容修复</strong>
修复断链 `READMEmd` → `README.md`，修正课程标题 `Module 1-3` → `Module 0-3`，修复大小写敏感路径
移除受损的重复案例研究 5 内容

<strong>初学者引导改进</strong>
为初学者增加了合适的介绍、学习目标和先决条件

#### 课程更新

**主 README.md**
- 在课程表中新增条目 3.12（MCP Hosts）、3.13（MCP Inspector）、4.1（分页）、5.16（协议功能）

**模块 README**
新增第 12 和 13 课列表
添加分页的实践指南部分
新增 5.15（自定义传输）和 5.16（协议功能）课

**study_guide.md**
- 更新思维导图，包含所有新主题：MCP 主机设置、MCP Inspector、分页策略、协议功能深度解析

## 2026 年 1 月 28 日

### MCP 规范 2025-11-25 合规审查

#### 核心概念增强 (01-CoreConcepts/)
- **新增客户端原语 - Roots**：新增详尽文档，介绍 Roots 客户端原语，帮助服务器理解文件系统边界与访问权限
- <strong>工具注释</strong>：新增工具行为注释文档（`readOnlyHint`、`destructiveHint`），用于优化工具执行决策
- <strong>采样中的工具调用</strong>：更新采样文档，新增 `tools` 和 `toolChoice` 参数，支持模型驱动的采样请求中的工具调用
- **URL 模式外发**：新增基于 URL 的外部调用文档，用于服务器启动的外部网页交互
- **任务（实验性）**：新增实验性任务功能部分，介绍持久执行包装器和延迟结果检索
- <strong>图标支持</strong>：指出工具、资源、资源模板和提示可以包含图标作为附加元数据

#### 文档更新
- **README.md**：新增 MCP 规范 2025-11-25 版本参考及基于日期的版本控制说明
- **study_guide.md**：更新课程地图，包含核心概念部分的任务和工具注释；更新文档时间戳

#### 规范合规验证
- <strong>协议版本</strong>：确认所有文档均引用当前 MCP 规范 2025-11-25
- <strong>架构一致性</strong>：确认两层架构（数据层 + 传输层）文档准确
- <strong>原语文档</strong>：验证服务器原语（资源、提示、工具）和客户端原语（采样、外发、日志、Roots）
- <strong>传输机制</strong>：验证 STDIO 和可流式 HTTP 传输文档的准确性
- <strong>安全指导</strong>：确认与最新 MCP 安全最佳实践文档一致

#### MCP 2025-11-25 关键特性文档
- **OpenID Connect 发现**：通过 OIDC 实现认证服务器发现
- **OAuth 客户端 ID 元数据文档**：推荐的客户端注册机制
- **JSON Schema 2020-12**：MCP 架构定义的默认方言
- **SDK 分层系统**：SDK 功能支持与维护的正式要求
- <strong>治理结构</strong>：MCP 治理中的工作组和兴趣组规范化

### 安全文档重大更新 (02-Security/)

#### MCP 安全峰会研讨会（Sherpa）集成
- <strong>新增实操培训资源</strong>：在所有安全文档中全面集成 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- <strong>远征路线覆盖</strong>：详细记录从基地营到峰会的营地逐步进展
- **OWASP 对齐**：所有安全指导均映射到 OWASP MCP Azure 安全指南风险

#### OWASP MCP Top 10 集成
- <strong>新增章节</strong>：在主安全 README 中添加 OWASP MCP Top 10 安全风险表及 Azure 缓解措施
- <strong>风险驱动文档</strong>：更新 mcp-security-controls-2025.md，按安全领域引用 OWASP MCP 风险
- <strong>参考架构</strong>：链接至 OWASP MCP Azure 安全指南参考架构和实施模式

#### 更新的安全文件
- **README.md**：新增 Sherpa 研讨会概览、远征路线表、OWASP MCP Top 10 风险摘要及实操培训部分
- **mcp-security-controls-2025.md**：更新文件头至 2026 年 2 月，添加 OWASP 风险引用（MCP01-MCP08），修正规范版本不一致问题
- **mcp-security-best-practices-2025.md**：新增 Sherpa 和 OWASP 资源章节，更新时间戳
- **mcp-best-practices.md**：新增实操培训章节，含 Sherpa 和 OWASP 链接
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 引用，Sherpa 第三营对齐及额外资源章节

#### 新增资源链接
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 各个 OWASP MCP 风险页面（MCP01-MCP10）

### 课程全局 MCP 规范 2025-11-25 对齐

#### 模块 03 - 入门
- **SDK 文档**：将 Go SDK 加入官方 SDK 列表；更新所有 SDK 引用以符合 MCP 规范 2025-11-25
- <strong>传输说明</strong>：在 STDIO 和 HTTP 流式传输描述中添加明确定规参照

#### 模块 04 - 实践实现
- **SDK 更新**：新增 Go SDK；更新 SDK 列表与规范版本引用
- <strong>授权规范</strong>：将 MCP 授权规范链接更新为当前 2025-11-25 版本

#### 模块 05 - 高级主题
- <strong>新增特性</strong>：添加关于 MCP 规范 2025-11-25 新特性（任务、工具注释、URL 模式外发、Roots）的说明
- <strong>安全资源</strong>：新增 OWASP MCP Top 10 和 Sherpa 研讨会链接至附加参考

#### 模块 06 - 社区贡献
- **SDK 列表**：新增 Swift 和 Rust SDK；更新规范链接到 2025-11-25
- <strong>规范引用</strong>：更新 MCP 规范链接为直接规范 URL

#### 模块 07 - 早期采用经验
- <strong>资源更新</strong>：新增 MCP 规范 2025-11-25 链接和 OWASP MCP Top 10 至附加资源

#### 模块 08 - 最佳实践
- <strong>规范版本</strong>：更新 MCP 规范参考为 2025-11-25
- <strong>安全资源</strong>：新增 OWASP MCP Top 10 和 Sherpa 研讨会链接至附加参考

#### 模块 10 - 简化 AI 工作流
- <strong>徽章更新</strong>：将 MCP 版本徽章从 SDK 版本（1.9.3）更改为规范版本（2025-11-25）
- <strong>资源链接</strong>：更新 MCP 规范链接；新增 OWASP MCP Top 10

#### 模块 11 - MCP 服务器实操实验
- <strong>规范引用</strong>：更新 MCP 规范链接为 2025-11-25 版本
- <strong>安全资源</strong>：新增 OWASP MCP Top 10 到官方资源

## 2025 年 12 月 18 日

### 安全文档更新 - MCP 规范 2025-11-25

#### MCP 安全最佳实践 (02-Security/mcp-best-practices.md) - 规范版本更新
- <strong>协议版本更新</strong>：更新为最新 MCP 规范 2025-11-25（2025 年 11 月 25 日发布）
  - 将所有规范版本引用从 2025-06-18 更新为 2025-11-25
  - 将文档日期引用从 2025 年 8 月 18 日更新为 2025 年 12 月 18 日
  - 验证所有规范 URL 指向最新文档
- <strong>内容验证</strong>：全面验证安全最佳实践符合最新标准
  - <strong>微软安全解决方案</strong>：验证 Prompt Shields（原“越狱风险检测”）、Azure 内容安全、Microsoft Entra ID 和 Azure Key Vault 的当前术语和链接
  - **OAuth 2.1 安全**：确认与最新 OAuth 安全最佳实践一致
  - **OWASP 标准**：验证 LLM 相关 OWASP Top 10 参考仍然有效
  - **Azure 服务**：验证所有 Microsoft Azure 文档链接和最佳实践
- <strong>标准对齐</strong>：所有引用的安全标准均为最新
  - NIST AI 风险管理框架
  - ISO 27001:2022
  - OAuth 2.1 安全最佳实践
  - Azure 安全与合规框架
- <strong>实施资源</strong>：验证所有实施指南链接和资源
  - Azure API 管理认证模式
  - Microsoft Entra ID 集成指南
  - Azure Key Vault 密钥管理
  - DevSecOps 管道与监控方案

### 文档质量保证
- <strong>规范合规性</strong>：确保所有强制性 MCP 安全要求（必须/禁止）符合最新规范
- <strong>资源时效性</strong>：核实所有微软文档、安全标准及实施指南的外部链接有效
- <strong>最佳实践覆盖</strong>：确认全面覆盖认证、授权、AI 特定威胁、供应链安全和企业模式

## 2025 年 10 月 6 日

### 入门章节扩展 – 高级服务器使用与简单认证

#### 高级服务器使用 (03-GettingStarted/10-advanced)
- <strong>新增章节</strong>：引入有关高级 MCP 服务器使用的全面指南，涵盖常规和低级服务器架构。
  - <strong>常规服务器与低级服务器</strong>：详细比较及 Python 和 TypeScript 代码示例，涵盖两种方法。
  - <strong>基于处理器的设计</strong>：阐述基于处理器的工具/资源/提示管理，用于可扩展且灵活的服务器实现。
  - <strong>实用模式</strong>：低级服务器模式在高级功能和架构中的实际应用场景。

#### 简单认证 (03-GettingStarted/11-simple-auth)
- <strong>新增章节</strong>：MCP 服务器中实现简单认证的逐步指南。
  - <strong>认证概念</strong>：清晰解释认证与授权，以及凭证处理。
  - <strong>基础认证实现</strong>：基于中间件的 Python（Starlette）和 TypeScript（Express）认证模式，附代码示例。
  - <strong>向高级安全进阶</strong>：指导从简单认证起步，逐步提升至 OAuth 2.1 和 RBAC，附高级安全模块参考。

这些新增内容为构建更健壮、安全且灵活的 MCP 服务器实现提供实用的操作指导，搭建基础概念与高级生产模式的桥梁。

## 2025年9月29日

### MCP 服务器数据库集成实验室 - 综合实战学习路径

#### 11-MCPServerHandsOnLabs - 全新完整数据库集成课程
- **完整13个实验路径**：新增构建生产级 MCP 服务器与 PostgreSQL 数据库集成的综合实战课程
  - <strong>真实案例实践</strong>：Zava 零售分析用例，展示企业级模式
  - <strong>结构化学习进阶</strong>：
    - **实验00-03：基础** — 介绍、核心架构、安全与多租户、环境搭建
    - **实验04-06：构建 MCP 服务器** — 数据库设计与模式、MCP 服务器实现、工具开发  
    - **实验07-09：高级功能** — 语义搜索集成、测试与调试、VS Code 集成
    - **实验10-12：生产及最佳实践** — 部署策略、监控与可观测性、最佳实践与优化
  - <strong>企业级技术</strong>：FastMCP 框架，集成 pgvector 的 PostgreSQL，Azure OpenAI 嵌入向量，Azure Container Apps，应用洞察
  - <strong>高级功能</strong>：行级安全（RLS）、语义搜索、多租户数据访问、向量嵌入、实时监控

#### 术语标准化 - 模块改为实验
- <strong>文档全面更新</strong>：系统性更新 11-MCPServerHandsOnLabs 下所有 README 文件，统一使用“实验”术语替换“模块”
  - <strong>章节标题</strong>：将“本模块涵盖内容”改为“本实验涵盖内容”，适用于全部13个实验
  - <strong>内容描述</strong>：将“本模块提供...”改为“本实验提供...”
  - <strong>学习目标</strong>：将“完成本模块后...”改为“完成本实验后...”
  - <strong>导航链接</strong>：所有“模块 XX:”跨引用及导航均改写为“实验 XX:”
  - <strong>完成追踪</strong>：将“完成本模块后...”改为“完成本实验后...”
  - <strong>技术引用保留</strong>：保留配置文件中的 Python 模块引用（如 `"module": "mcp_server.main"`）

#### 学习指南增强 (study_guide.md)
- <strong>可视化课程地图</strong>：新增“11. 数据库集成实验室”部分，提供详细实验结构图
- <strong>仓库结构</strong>：将主结构由十部分更新为十一部分，详细描述 11-MCPServerHandsOnLabs
- <strong>学习路径指引</strong>：完善导航说明，包含 00-11 部分
- <strong>技术覆盖</strong>：新增 FastMCP、PostgreSQL、Azure 服务集成细节
- <strong>学习成果</strong>：突出生产级服务器开发、数据库集成模式和企业安全

#### 主 README 结构增强
- <strong>基于实验术语</strong>：更新 11-MCPServerHandsOnLabs 下主 README.md，始终采用“实验”结构
- <strong>学习路线组织</strong>：从基础概念到高级实现再到生产部署的清晰进阶
- <strong>现实案例聚焦</strong>：强调实践操作与企业级模式和技术

### 文档质量与一致性改进
- <strong>实操学习强化</strong>：全篇文档突出实验式、实操导向学习方法
- <strong>企业模式聚焦</strong>：强调生产级实现与企业安全考量
- <strong>技术集成</strong>：全面覆盖现代 Azure 服务与 AI 集成模式
- <strong>学习进阶</strong>：从基础到生产部署的清晰、有结构的路径

## 2025年9月26日

### 案例研究增强 - GitHub MCP 注册表集成

#### 案例研究 (09-CaseStudy/) - 生态系统发展聚焦
- **README.md**：大幅扩展，新增详尽 GitHub MCP 注册表案例研究
  - **GitHub MCP 注册表案例研究**：2025年9月 GitHub MCP 注册表发布深度案例分析
    - <strong>问题分析</strong>：分散化 MCP 服务器发现与部署难题详述
    - <strong>解决架构</strong>：GitHub 中央注册表及一键 VS Code 安装方案
    - <strong>业务影响</strong>：开发者入门与生产效率显著提升
    - <strong>战略价值</strong>：聚焦模块化代理部署及跨工具互操作性
    - <strong>生态发展</strong>：定位为代理系统集成的基础平台
  - <strong>案例研究结构增强</strong>：七个案例统一格式与内容详尽描述
    - Azure AI 旅游代理：多代理编排重点
    - Azure DevOps 集成：工作流自动化聚焦
    - 实时文档检索：Python 控制台客户端实现
    - 交互式学习计划生成器：Chainlit 对话式网页应用
    - 编辑器内文档：VS Code 与 GitHub Copilot 集成
    - Azure API 管理：企业级 API 集成模式
    - GitHub MCP 注册表：生态系统开发与社区平台
  - <strong>综合总结</strong>：重写结论，覆盖七个案例跨越多 MCP 实现维度
    - 企业集成、多代理编排、开发者生产力
    - 生态发展、教育应用分类
    - 增强架构模式、实现策略及最佳实践见解
    - 突出 MCP 作为成熟生产协议

#### 学习指南更新 (study_guide.md)
- <strong>课程地图更新</strong>：将 GitHub MCP 注册表纳入案例研究部分思维导图
- <strong>案例描述增强</strong>：由泛泛描述改为七个具体案例的详细拆解
- <strong>仓库结构</strong>：第10部分更新为全面案例研究覆盖及具体实现细节
- <strong>变更日志集成</strong>：新增2025年9月26日条目，记录 GitHub MCP 注册表及案例研究增强
- <strong>日期更新</strong>：页脚时间戳更新至最新修订（2025年9月26日）

### 文档质量改进
- <strong>一致性提升</strong>：七个案例统一格式与结构标准化
- <strong>全面覆盖</strong>：案例范畴涵盖企业、开发者效率与生态系统发展
- <strong>战略定位</strong>：强化 MCP 作为代理系统部署基础平台的定位
- <strong>资源集成</strong>：附加资源更新，包含 GitHub MCP 注册表链接

## 2025年9月15日

### 高级主题扩展 - 自定义传输与上下文工程

#### MCP 自定义传输 (05-AdvancedTopics/mcp-transport/) - 新增高级实现指南
- **README.md**：详尽自定义 MCP 传输机制实现指导
  - **Azure 事件网格传输**：无服务器事件驱动传输完整实现
    - C#、TypeScript 和 Python 示例，集成 Azure Functions
    - 可扩展 MCP 解决方案的事件驱动架构模式
    - Webhook 接收器与推送式消息处理
  - **Azure 事件中心传输**：高吞吐量流传输实现
    - 支持低延迟场景的实时流处理能力
    - 分区策略与检查点管理
    - 消息批处理与性能优化
  - <strong>企业集成模式</strong>：生产级架构示例
    - 多 Azure Functions 分布式 MCP 处理
    - 混合传输架构，结合多种传输类型
    - 消息持久性、可靠性与错误处理策略
  - <strong>安全与监控</strong>：Azure Key Vault 集成与可观测性模式
    - 托管身份验证与最小权限访问
    - 应用洞察遥测与性能监控
    - 断路器与容错设计模式
  - <strong>测试框架</strong>：自定义传输的全面测试策略
    - 利用测试替身和模拟框架进行单元测试
    - Azure 测试容器集成测试
    - 性能及负载测试考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新兴 AI 领域
- **README.md**：上下文工程作为新兴学科的全面探讨
  - <strong>核心原则</strong>：完整上下文共享、动作决策意识与上下文窗口管理
  - **MCP 协议对齐**：MCP 设计如何应对上下文工程挑战
    - 上下文窗口限制与渐进加载策略
    - 相关性判断与动态上下文获取
    - 多模态上下文处理与安全考量
  - <strong>实现方法</strong>：单线程与多代理架构对比
    - 上下文分块与优先级技术
    - 渐进式上下文加载与压缩策略
    - 分层上下文方法与检索优化
  - <strong>度量框架</strong>：上下文有效性评估的新兴指标体系
    - 输入效率、性能、质量与用户体验
    - 实验性上下文优化方法
    - 失败分析与改进方法论

#### 课程导航更新 (README.md)
- <strong>模块结构增强</strong>：更新课程表，加入新高级主题
  - 新增上下文工程（5.14）与自定义传输（5.15）
  - 全模块格式及导航链接统一
  - 更新描述反映当前内容范围

### 目录结构改进
- <strong>命名标准化</strong>：将“mcp transport”重命名为“mcp-transport”，与其他高级主题文件夹一致
- <strong>内容组织</strong>：所有 05-AdvancedTopics 文件夹遵循 mcp-[主题] 命名模式

### 文档质量提升
- **MCP 规范对齐**：所有新内容均参考 MCP 规范 2025-06-18
- <strong>多语言示例</strong>：提供 C#、TypeScript 和 Python 代码示例
- <strong>企业聚焦</strong>：贯穿生产级模式和 Azure 云集成
- <strong>视觉文档</strong>：架构及流程采用 Mermaid 图示

## 2025年8月18日

### 文档全面更新 - MCP 2025-06-18 标准

#### MCP 安全最佳实践 (02-Security/) - 全面现代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：完全重写，符合 MCP 规范 2025-06-18
  - <strong>强制性要求</strong>：新增官方规范中明确的 MUST/MUST NOT 要求，附清晰视觉标识
  - **12大核心安全实践**：由原15项列表重构为全面安全域
    - 令牌安全与认证，集成外部身份提供者
    - 会话管理与传输安全，含加密要求
    - AI 特定威胁防护，集成 Microsoft Prompt Shields
    - 访问控制与权限，践行最小权限原则
    - 内容安全与监测，集成 Azure 内容安全
    - 供应链安全，全面组件验证
    - OAuth 安全与防混淆代理，实施 PKCE
    - 事件响应与恢复，自动化能力
    - 合规与治理，符合法规要求
    - 高级安全控制，零信任架构
    - Microsoft 安全生态集成，全面方案覆盖
    - 持续安全演进，适应性实践
  - **Microsoft 安全解决方案**：增强 Prompt Shields、Azure 内容安全、Entra ID 与 GitHub Advanced Security 集成指南
  - <strong>实施资源</strong>：按官方 MCP 文档、微软安全方案、安全标准和实现指南分类的全面资源链接

#### 高级安全控制 (02-Security/) - 企业级实现
- **MCP-SECURITY-CONTROLS-2025.md**：全面改版，企业级安全框架
  - **9大安全域**：由基础控件扩展为详尽企业框架
    - 高级认证与授权，集成 Microsoft Entra ID
    - 令牌安全与反直通控件，全面验证
    - 会话安全控件，防止劫持
    - AI 特定安全控件，防提示注入与工具中毒
    - 混淆代理攻击防范，OAuth 代理安全
    - 工具执行安全，沙箱与隔离
    - 供应链安全控件，依赖性验证
    - 监控与检测控件，SIEM 集成
    - 事件响应与恢复，自动化能力
  - <strong>实现示例</strong>：新增详细 YAML 配置块与代码示例
  - <strong>微软解决方案集成</strong>：涵盖 Azure 安全服务、GitHub Advanced Security 与企业身份管理

#### 高级主题安全 (05-AdvancedTopics/mcp-security/) - 生产级实现
- **README.md**：企业安全实现完全重写
  - <strong>规范对齐</strong>：更新至 MCP 规范 2025-06-18，包含强制安全要求
  - <strong>增强认证</strong>：集成 Microsoft Entra ID，配有 .NET 和 Java Spring Security 详尽示例
  - **AI 安全集成**：Microsoft Prompt Shields 和 Azure 内容安全，附详细 Python 示例
  - <strong>高级威胁缓解</strong>：提供
    - 混淆代理攻击防护示例，含 PKCE 和用户同意验证
    - 令牌直通防护，含受众验证和安全令牌管理示例
- 使用加密绑定和行为分析防止会话劫持
- <strong>企业安全集成</strong>：Azure Application Insights 监控、威胁检测管道和供应链安全
- <strong>实施清单</strong>：明确区分强制性与推荐安全控制及微软安全生态系统的优势

### 文档质量与标准对齐
- <strong>规范引用</strong>：更新所有引用为当前 MCP 规范 2025-06-18
- <strong>微软安全生态系统</strong>：增强所有安全文档中的集成指导
- <strong>实践实现</strong>：新增 .NET、Java 和 Python 的详细代码示例及企业模式
- <strong>资源组织</strong>：全面分类官方文档、安全标准和实施指南
- <strong>视觉指示</strong>：清晰标注强制性要求与推荐实践


#### 核心概念 (01-CoreConcepts/) - 完整现代化
- <strong>协议版本更新</strong>：更新为引用当前 MCP 规范 2025-06-18，采用基于日期的版本（YYYY-MM-DD 格式）
- <strong>架构优化</strong>：增强 Hosts、Clients 和 Servers 的描述以反映当前 MCP 架构模式
  - Hosts 现明确定义为协调多个 MCP 客户端连接的 AI 应用
  - Clients 描述为维护一对一服务器关系的协议连接器
  - Servers 加强了本地与远程部署场景说明
- <strong>原语重构</strong>：服务器和客户端原语全面重写
  - 服务器原语：资源（数据源）、提示（模板）、工具（可执行函数）及详细说明与示例
  - 客户端原语：采样（LLM 完成）、引导（用户输入）、日志（调试/监控）
  - 更新为当前发现（`*/list`）、检索（`*/get`）和执行（`*/call`）方法模式
- <strong>协议架构</strong>：引入双层架构模型
  - 数据层：基于 JSON-RPC 2.0，带生命周期管理和原语
  - 传输层：STDIO（本地）和支持 SSE 流式 HTTP（远程）传输机制
- <strong>安全框架</strong>：全面安全原则涵盖显式用户同意、数据隐私保护、工具执行安全及传输层安全
- <strong>通信模式</strong>：更新协议消息以展示初始化、发现、执行与通知流程
- <strong>代码示例</strong>：多语言示例（.NET、Java、Python、JavaScript）刷新，反映当前 MCP SDK 模式

#### 安全 (02-Security/) - 全面安全大修  
- <strong>标准对齐</strong>：全面符合 MCP 规范 2025-06-18 安全需求
- <strong>认证演进</strong>：记录从自定义 OAuth 服务器到外部身份提供商委托（Microsoft Entra ID）的演变
- **AI 特定威胁分析**：增强现代 AI 攻击向量覆盖
  - 详述提示注入攻击场景及真实案例
  - 工具中毒机制及“拽地毯”攻击模式
  - 上下文窗口中毒和模型混淆攻击
- **微软 AI 安全解决方案**：全面覆盖微软安全生态系统
  - AI 提示屏障，含高级检测、聚焦与分隔符技术
  - Azure 内容安全集成模式
  - GitHub 高级安全保障供应链保护
- <strong>高级威胁缓解</strong>：详细安全控制措施
  - 会话劫持，含 MCP 特定攻击场景与加密会话 ID 要求
  - MCP 代理场景下的混淆代表问题及显式同意要求
  - 令牌透传漏洞及强制验证控制
- <strong>供应链安全</strong>：扩展 AI 供应链覆盖基础模型、嵌入服务、上下文提供者及第三方 API
- <strong>基础安全</strong>：强化与企业安全模式集成，涵盖零信任架构和微软安全生态体系
- <strong>资源组织</strong>：按类型分类综合资源链接（官方文档、标准、研究、微软解决方案、实施指南）

### 文档质量改进
- <strong>结构化学习目标</strong>：增强具体且可执行的学习成果
- <strong>交叉引用</strong>：新增相关安全与核心概念主题间链接
- <strong>信息更新</strong>：更新所有日期引用及规范链接至最新标准
- <strong>实施指导</strong>：在两部分均增添具体且可执行的实施建议

## 2025年7月16日

### README 及导航改进
- 完全重新设计 README.md 中的课程导航
- 用更易访问的表格格式替代 `<details>` 标签
- 在新建的 "alternative_layouts" 文件夹中创建替代布局选项
- 添加基于卡片、标签式和手风琴式导航示例
- 更新仓库结构部分以包括所有最新文件
- 增强“如何使用本课程”部分，提供明确建议
- 更新 MCP 规范链接指向正确 URL
- 增加上下文工程部分（5.14）到课程结构

### 学习指南更新
- 完全修订学习指南与当前仓库结构对齐
- 新增 MCP 客户端与工具、流行 MCP 服务器章节
- 更新视觉课程地图，准确反映所有主题
- 加强高级主题描述，涵盖所有专业领域
- 更新案例研究部分，反映实际示例
- 添加此全面更新日志

### 社区贡献 (06-CommunityContributions/)
- 新增关于 MCP 服务器的图像生成详细信息
- 新增在 VSCode 中使用 Claude 的综合章节
- 新增 Cline 终端客户端设置与使用说明
- 更新 MCP 客户端章节，包含所有流行客户端选项
- 用更准确的代码示例丰富贡献示例

### 高级主题 (05-AdvancedTopics/)
- 统一所有专业主题文件夹命名并组织
- 新增上下文工程材料和示例
- 新增 Foundry 代理集成文档
- 增强 Entra ID 安全集成文档

## 2025年6月11日

### 初始创建
- 发布 MCP 入门课程第一个版本
- 创建全部 10 个主章节的基本结构
- 实现导航用视觉课程地图
- 添加多种编程语言的初始示例项目

### 入门 (03-GettingStarted/)
- 创建首批服务器实现示例
- 添加客户端开发指导
- 包含 LLM 客户端集成说明
- 增加 VS Code 集成文档
- 实现服务器推送事件（SSE）服务器示例

### 核心概念 (01-CoreConcepts/)
- 添加客户端-服务器架构的详细讲解
- 创建关键协议组件文档
- 记录 MCP 中的消息模式

## 2025年5月23日

### 仓库结构
- 初始化仓库基本文件夹结构
- 为每个主要章节创建 README 文件
- 设置翻译基础设施
- 添加图像资源和图示

### 文档
- 创建初始 README.md，含课程概述
- 添加行为准则 CODE_OF_CONDUCT.md 和安全指南 SECURITY.md
- 设置帮助支持文档 SUPPORT.md
- 创建初步的学习指南结构

## 2025年4月15日

### 规划与框架
- MCP 入门课程初步规划
- 定义学习目标和目标受众
- 概述课程的十个章节结构
- 开发示例和案例研究的概念框架
- 创建关键概念的初步原型示例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->