# 变更日志：MCP 初学者课程

本文档记录了针对Model Context Protocol (MCP) 初学者课程所做的所有重大更改。变更以逆时间顺序记录（最新变更在前）。

## 2026年7月2日

### 新课程：2026-07-28 MCP 规范发布候选版

新增涵盖即将发布的 `2026-07-28` MCP 规范发布候选版（2026年5月21日宣布；最终发布计划于2026年7月28日），内容总结自[官方公告博客文章](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)。课程基线保持为 **MCP 规范 2025-11-25**，直到新版本发布，因此此内容作为前瞻性指引，而非现有课程重写。

- <strong>新</strong>: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — 全面涵盖无状态协议核心（移除 `initialize` 握手和 `Mcp-Session-Id`），新的 `Mcp-Method`/`Mcp-Name` 路由头，`ttlMs`/`cacheScope` 缓存元数据，_meta中的W3C Trace Context，正式的扩展框架（MCP 应用和新的任务扩展），六项授权强化SEPs，Roots/Sampling/Logging的废弃，以及工具架构转向全面JSON Schema 2020-12。
- <strong>更新</strong>，增加指向新课程的前瞻性提示链接：
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md)：协议版本注释、Sampling/Roots/Logging/Tasks章节及“下一步”内容
  - [02-Security/README.md](./02-Security/README.md)：授权强化提示
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md)：无状态传输提示
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md)：Sampling 废弃提示
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md)：Logging 废弃和任务扩展提示
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md)：无状态/会话路由提示
  - [README.md](./README.md)：规范章节中的“展望未来”注释及课程模块表中的新 `1.1` 条目
  - [study_guide.md](./study_guide.md)：Core Concepts 概览下的前瞻性加点和带日期的附录注释
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md)：无状态请求模型前的 `mcp-session-id` 传输映射提示
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md)：模块概览中关于 Root Contexts/Sampling 废弃和任务扩展的提示
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md)：授权强化提示

## 2026年6月24日

### 新课程：在 Copilot 应用中使用 MCP

- [工具部分](./12-tooling/README.md) 新增工具部分。
- [在 Copilot 应用中使用 MCP](./12-tooling/01-copilot-app/README.md)

## 2026年6月16日

### MCP 规范对齐及样例验证

根据当前 **MCP 规范 2025-11-25** 和最新官方 SDK 对课程进行了验证，修正了残留的陈旧规范引用，并确认核心示例仍能构建和运行。

#### 规范版本修正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新了仍声称旧版规范为<em>当前/最新</em>标准的英文内容，重定向链接至标准的 `modelcontextprotocol.io` 规范路径：
- **05-AdvancedTopics/mcp-security/README.md**：更新“当前标准”横幅、介绍、核心安全原则标题、强制性要求标题、Microsoft Entra ID部分、参考资料链接和结尾安全通知（共8条参考）为2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新额外资源规范链接和“当前标准”横幅为2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：用当前2025-11-25安全最佳实践页面替代过时的2025-03-26安全与信任链接
- **03-GettingStarted/14-sampling/README.md**：更新官方抽样文档链接为2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新现在时态的“MCP当前规范”引用和额外资源规范链接为2025-11-25（保留历史SSE废弃注释以确保准确性）

#### 样例对当前SDK验证

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：`npm install` 成功解析 `@modelcontextprotocol/sdk@1.29.0`；`tsc --noEmit` 无类型错误 — 现有 `McpServer`/`StdioServerTransport` API 依然有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：在独立 `.venv` 中用 `mcp[cli]` (1.27.2) 验证；`py_compile` 通过，`FastMCP.list_tools()` 正确返回 `add` 和 `subtract` 工具
- 确认所有示例的 `@modelcontextprotocol/sdk` 版本范围 (`>=1.26.0` / `^1.26.0` / `^1.27.0`) 均顺利解析至当前 `1.29.0`，无破坏性 API 变更

#### 依赖版本统一（弥合版本差距）

提升过时SDK依赖版本，使所有样例均跟踪当前 MCP 发布版本，符合整个仓库惯例：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：将 `@modelcontextprotocol/sdk` 从 `^1.8.0` 提升至 `>=1.26.0`，并将陈旧的 `"更新至 MCP 2025-06-18"` 包描述改为 `"与 MCP 规范 2025-11-25 对齐"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 和 **lab4/code/github_mcp_server/pyproject.toml**：将精确版本锁定 `mcp==1.23.0` 提升至 `mcp>=1.26.0`；重新生成两个 `uv.lock` 文件（使用 `uv lock`），使锁文件解析为当前 `mcp 1.27.2`，与清单保持同步

#### 课程差距分析 — 最新规范功能覆盖

确认课程已涵盖 MCP 2025-11-25 引入/扩展的所有原语，无内容缺口：
- **Sampling**：课程 03-GettingStarted/14-sampling 及 05-AdvancedTopics/mcp-sampling
- **Elicitation（含 URL 模式）**：记录于 01-CoreConcepts 与 05-AdvancedTopics/mcp-protocol-features
- **Roots**：记录于 00-Introduction、01-CoreConcepts 和 05-AdvancedTopics/mcp-root-contexts
- **Tasks（实验性，长时间运行操作）**：记录于 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features
- <strong>工具注释</strong> (`readOnlyHint` / `destructiveHint`)：记录于 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features

### 安全强化及依赖漏洞修复

对每个依赖清单和示例源码进行了全面安全检查，修复了所有报告的 npm 安全建议和一项代码层面问题。修复后，`npm audit` 报告所有被审计目录均无安全漏洞。

#### npm 依赖漏洞（传递性）— 已修复

审计了所有 15 个已提交的 `package-lock.json` 文件。漏洞仅限于 MCP Inspector 开发工具、OpenAI 客户端和 MCP SDK 引入的传递依赖；均已修复且不破坏示例：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 和 **lab3/code/weather_mcp/inspector**：将 `@modelcontextprotocol/inspector` 从 (`0.16.6` / `0.14.1`) 提升至 `0.22.0`，清除了打包的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 和 `ws` 安全建议。新增 npm `overrides` 条目，强制修补 `shell-quote@1.8.4`，消除 `concurrently` 中残留的严重建议；重新生成两个锁文件（现均为 0 漏洞）
- **03-GettingStarted/samples/typescript**：执行 `npm audit fix`，将传递依赖 `qs`（中等风险）更新至补丁版本
- **03-GettingStarted/samples/javascript**：执行 `npm audit fix`，将传递依赖 `hono`（中等风险）更新至补丁版本
- **03-GettingStarted/03-llm-client/solution/typescript**：执行 `npm audit fix`，将传递依赖 `form-data`（高风险）更新至补丁版本
- **03-GettingStarted/11-simple-auth/solution/typescript**：生成缺失的 `package-lock.json`，使项目可重现且可审计（无漏洞）

#### 代码层面安全修复（OWASP A03：注入攻击）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除了 `open_in_vscode` 工具中的 `shell=True`。之前的 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 会让路径中的 shell 元字符被 `cmd.exe` 解释（命令注入风险）。现直接启动解析后的 `Code.exe` 并传入文件夹路径参数——无 shell——功能等效且安全

#### Python 依赖审计

- 使用 `pip-audit` 审计了所有 Python 依赖集。`05-AdvancedTopics` 和 `03-GettingStarted/samples/python` 报告无已知漏洞（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 版本均解析至当前修补版）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 发现传递依赖 **`werkzeug` 3.1.1** 存在三个 `safe_join` Windows 设备名拒绝服务漏洞警告——`CVE-2025-66221`、`CVE-2026-21860` 和 `CVE-2026-27199`（均在3.1.6修复）。新增明确安全版本约束 `werkzeug>=3.1.6`，确保解析为修补版；验证该约束在 `chainlit` / `mcp` / `semantic-kernel` 堆栈中能正常解析

### 产品名称更名

更新所有课程内容以反映微软产品更名：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社区链接
- **AGENTS.md**：更新 Discord 服务器引用
- **README.md**：更新技术生态引用
- **study_guide.md**：更新案例研究引用
- **05-AdvancedTopics/README.md**：更新模块 5.13 标题和描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新章节标题和描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：全面更新模块标题和内容
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉引用链接
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究引用
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第9节标题、徽章和功能
- **08-BestPractices/README.md**：更新 Discord 社区链接
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 频道引用
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署引用
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服务表格
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新资源引用

#### AI 工具包 / AITK → Microsoft Foundry Toolkit Extension for VS Code

- **README.md**：更新了主课程引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新了模块标题、概述和所有模块标题
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新了标题、学习目标、设置说明和资源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新了标题、学习目标、MCP 主机表和交叉引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新了标题、徽章、先决条件和资源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新了代理构建器引用和反馈链接
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新了先决条件和扩展引用

---

## 2026年4月11日

### 新课程、文档修复及依赖更新

#### 新增课程内容

**模块 05 - 高级主题**
- **第5.17课：利用MCP进行对抗性多代理推理** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`)：新增全面指南，涵盖多代理系统的对抗性辩论模式
  - Mermaid 架构图：两个代理 → 共享 MCP 服务器 → 辩论记录 → 裁判 → 判决
  - 共享 MCP 工具服务器（`web_search` + `run_python`）由 Python 和 TypeScript 实现
  - 对立系统提示（支持 / 反对 / 裁判）及明确的工具使用要求
  - 用 Python、TypeScript 和 C# 实现的辩论协调器，管理回合和论点路由
  - MCP `ClientSession` 为协调器连接实际工具调用
  - 用例表（幻觉检测、威胁建模、API设计复审、事实核查、技术选择）
  - 安全注意事项：沙箱执行、工具调用校验、速率限制、审计日志
  - 结构化练习，包含三个实际场景（代码审查、架构决策、内容审核）

#### 文档修复

**模块 03 - 入门**
- **05-stdio-server/README.md**：修正了不完整的 TypeScript stdio 服务器示例——添加了缺失的传输实例化 (`new StdioServerTransport()`) 以及 `server.connect(transport)` 调用，匹配同节的 Python 和 .NET 示例
- **14-sampling/README.md**：修正拼写错误——将“Sampling is an davanced features”更正为“Sampling is an advanced feature”

#### 课程更新

**主 README.md**
- 添加了 5.17 (利用MCP进行对抗性多代理推理) 到课程表，并附带新课程的直接链接

**05-AdvancedTopics/README.md**
- 为课程表新增第5.17课行

**study_guide.md**
- 在高级主题部分心智图及说明中添加“对抗性多代理推理”主题

#### 代码和安全修复

**模块 05 - 对抗代理 (`mcp-adversarial-agents`)**
- **安全修复 - 命令注入**：在 TypeScript `run_python` 工具中用 `execFile` + `promisify` 替代了 `execSync` 的 shell 插值，消除了命令注入风险（现在 LLM 控制的代码作为字面 argv 元素传递，无 shell 参与）
- **MCP 工具循环连接**：更新 Python 辩论协调器，使用 `AsyncAnthropic` 客户端（替代阻塞同步 `Anthropic`），每回合传递实时 `ClientSession` 给代理，动态通过 `session.list_tools()` 获取工具定义，循环调用 `session.call_tool()` 直至模型输出最终文本

#### 依赖更新

- 多个包（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）中的 `hono` 升级到 4.12.12
- TypeScript 包中将 `@hono/node-server` 从 1.19.11 升级到 1.19.13
- Python 包（10-StreamliningAIWorkflows 实验室3和4）中将 `cryptography` 升级从 46.0.5 到 46.0.7
- 10-StreamliningAIWorkflows inspector 中将 `lodash` 从 4.17.23 升级到 4.18.1

#### 译文同步

- 同步了48余种语言的最新源代码更改（i18n更新）

---

## 2026年2月5日

### 仓库级验证与导航改进

#### 新增课程内容

**模块 03 - 入门**
- **12-mcp-hosts/README.md**：新增 MCP 主机配置的全面指南
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf 配置示例
  - 所有主要主机的 JSON 配置模板
  - 传输类型对比表（stdio, SSE/HTTP, WebSocket）
  - 常见连接问题排查
  - 主机配置安全最佳实践

- **13-mcp-inspector/README.md**：新增 MCP Inspector 调试指南
  - 安装方式（npx、npm 全局安装、源码安装）
  - 通过 stdio 和 HTTP/SSE 连接服务器
  - 测试工具、资源和提示工作流
  - VS Code 与 MCP Inspector 集成
  - 常见调试场景及解决方案

**模块 04 - 实践实现**
- **pagination/README.md**：新增分页实现指南
  - Python、TypeScript、Java 中基于游标的分页模式
  - 客户端分页处理
  - 游标设计策略（不透明 vs 结构化）
  - 性能优化建议

**模块 05 - 高级主题**
- **mcp-protocol-features/README.md**：新增协议特性深度解析
  - 进度通知实现
  - 请求取消模式
  - 资源模板及 URI 模式
  - 服务器生命周期管理
  - 日志级别控制
  - JSON-RPC 错误处理模式

#### 导航修复（更新了24+文件）

**主模块 README**
 现在链接到首堂课和下一个模块

**02-Security 子文件**
- 五个补充安全文档均新增“下一步”导航：

**09-CaseStudy 文件**
- 所有案例研究文件新增顺序导航：

**10-StreamliningAI 实验室**
在模块10总览和模块11中添加了“下一步”部分

#### 代码与内容修复

**SDK 与依赖更新**
修正空的 openai 版本为 `^4.95.0`
SDK 从 `^1.8.0` 更新至 `>=1.26.0`
mcp 版本固定更新至 `>=1.26.0`

<strong>代码修复</strong>
修正无效模型 `gpt-4o-mini` 为 `gpt-4.1-mini`

<strong>内容修复</strong>
修正损坏链接 `READMEmd` → `README.md`，课程表头部修正 `Module 1-3` → `Module 0-3`，修正大小写路径
删除损坏的重复案例研究5内容

<strong>初学者指导改进</strong>
添加了适当的介绍、学习目标和先决条件

#### 课程更新

**主 README.md**
- 在课程表中添加了3.12（MCP 主机）、3.13（MCP Inspector）、4.1（分页）、5.16（协议特性）

**模块 README**
添加了第12和13课至课程列表
新增实践指南部分并包含分页链接
添加了5.15课（自定义传输）和5.16课（协议特性）

**study_guide.md**
- 更新了心智图，包含所有新主题：MCP 主机设置、MCP Inspector、分页策略、协议特性深度解析

## 2026年1月28日

### MCP 规范 2025-11-25 合规审查

#### 核心概念增强（01-CoreConcepts/）
- **新增客户端原语 - Roots**：添加了关于 Roots 客户端原语的全面文档，帮助服务器理解文件系统边界和访问权限
- <strong>工具注释</strong>：新增关于工具行为注释（`readOnlyHint`、`destructiveHint`）的文档，以便更好地决策工具执行
- <strong>采样中的工具调用</strong>：更新采样文档，加入了模型驱动工具调用期间的 `tools` 和 `toolChoice` 参数
- **URL 模式引导**：新增服务器发起的外部网页交互 URL 引导说明
- **任务（实验性）**：新增实验性任务功能章节，用于持久执行包装和延迟结果检索
- <strong>图标支持</strong>：注释工具、资源、资源模板及提示现在可额外包含图标元数据

#### 文档更新
- **README.md**：添加 MCP 规范 2025-11-25 版本引用和基于日期的版本控制说明
- **study_guide.md**：更新课程地图，包含核心概念栏中的任务和工具注释，更新文档时间戳

#### 规范合规验证
- <strong>协议版本</strong>：确认所有文档引用当前 MCP 规范 2025-11-25
- <strong>架构对齐</strong>：确认两层架构（数据层 + 传输层）文档准确无误
- <strong>原语文档</strong>：验证服务器端原语（资源、提示、工具）与客户端原语（采样、引导、日志、Roots）
- <strong>传输机制</strong>：确认 STDIO 和可流式 HTTP 传输文档准确度
- <strong>安全指导</strong>：确认与当前 MCP 安全最佳实践文档保持一致

#### 关键 MCP 2025-11-25 特性文档
- **OpenID Connect 发现**：通过 OIDC 进行认证服务器发现
- **OAuth 客户端 ID 元数据文档**：推荐的客户端注册机制
- **JSON Schema 2020-12**：MCP 模式定义的默认方言
- **SDK 分层系统**：正式化 SDK 功能支持与维护要求
- <strong>治理结构</strong>：正式化 MCP 治理中的工作组和利益组

### 安全文档重大更新（02-Security/）

#### MCP 安全峰会研讨会（Sherpa）集成
- <strong>新增动手培训资源</strong>：在所有安全文档中全面集成了 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- <strong>探险路线覆盖</strong>：文档覆盖了从大本营到峰顶的完整营地进程
- **OWASP 对齐**：所有安全指导映射至 OWASP MCP Azure 安全指南风险

#### OWASP MCP Top 10 集成
- <strong>新增章节</strong>：在主安全 README 中添加了 OWASP MCP Top 10 安全风险表及 Azure 缓解措施
- <strong>基于风险的文档</strong>：更新了 mcp-security-controls-2025.md，加入了 OWASP MCP 风险引用（MCP01-MCP08）
- <strong>参考架构</strong>：链接了 OWASP MCP Azure 安全指南的参考架构及实施模式

#### 更新安全文件
- **README.md**：添加了 Sherpa 研讨会概览、探险路线表、OWASP MCP Top 10 风险总结和动手培训部分
- **mcp-security-controls-2025.md**：更新了标题至2026年2月，加入 OWASP 风险引用（MCP01-MCP08），修正规范版本不一致
- **mcp-security-best-practices-2025.md**：添加 Sherpa 和 OWASP 资源部分，更新时间戳
- **mcp-best-practices.md**：新增包含 Sherpa 和 OWASP 链接的动手培训部分
- **azure-content-safety-implementation.md**：添加 OWASP MCP06 引用、Sherpa 第三营地对齐及额外资源部分

#### 新增资源链接
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 各个 OWASP MCP 风险页面（MCP01-MCP10）

### 全课程 MCP 规范 2025-11-25 对齐

#### 模块 03 - 入门
- **SDK 文档**：新增 Go SDK 至官方 SDK 列表；更新所有 SDK 以符合 MCP 规范 2025-11-25
- <strong>传输说明</strong>：更新 STDIO 和 HTTP 流传输描述，明确规范引用

#### 模块 04 - 实践实现
- **SDK 更新**：新增 Go SDK；更新 SDK 列表以包含规范版本引用
- <strong>授权规范</strong>：更新 MCP 授权规范链接至当前 2025-11-25 版本

#### 模块 05 - 高级主题
- <strong>新特性</strong>：添加关于 MCP 规范 2025-11-25 新功能（任务、工具注释、URL 模式引导、Roots）的说明
- <strong>安全资源</strong>：新增 OWASP MCP Top 10 和 Sherpa 研讨会链接作为附加参考

#### 模块 06 - 社区贡献
- **SDK 列表**：新增 Swift 和 Rust SDK；更新规范链接至 2025-11-25
- <strong>规范引用</strong>：更新 MCP 规范链接为直接的规范 URL

#### 模块 07 - 早期采用经验教训

- <strong>资源更新</strong>：添加了 MCP 规范 2025-11-25 链接和 OWASP MCP 十大至补充资源

#### 模块 08 - 最佳实践
- <strong>规范版本</strong>：更新了 MCP 规范引用为 2025-11-25
- <strong>安全资源</strong>：添加了 OWASP MCP 十大和 Sherpa 研讨会至补充参考

#### 模块 10 - 简化 AI 工作流
- <strong>徽章更新</strong>：将 MCP 版本徽章由 SDK 版本 (1.9.3) 更改为规范版本 (2025-11-25)
- <strong>资源链接</strong>：更新了 MCP 规范链接；添加了 OWASP MCP 十大

#### 模块 11 - MCP 服务器动手实验
- <strong>规范引用</strong>：更新 MCP 规范链接至 2025-11-25 版本
- <strong>安全资源</strong>：添加了 OWASP MCP 十大至官方资源

## 2025 年 12 月 18 日

### 安全文档更新 - MCP 规范 2025-11-25

#### MCP 安全最佳实践 (02-Security/mcp-best-practices.md) - 规范版本更新
- <strong>协议版本更新</strong>：更新引用至最新 MCP 规范 2025-11-25（2025 年 11 月 25 日发布）
  - 将所有规范版本引用从 2025-06-18 更新至 2025-11-25
  - 将文档日期引用从 2025 年 8 月 18 日更新至 2025 年 12 月 18 日
  - 校验所有规范 URL 指向当前文档
- <strong>内容验证</strong>：全面验证安全最佳实践符合最新标准
  - <strong>微软安全解决方案</strong>：核实 Prompt Shields（前称“越狱风险检测”）、Azure 内容安全、Microsoft Entra ID 和 Azure 密钥保管的当前术语和链接
  - **OAuth 2.1 安全**：确认符合最新 OAuth 安全最佳实践
  - **OWASP 标准**：确认 OWASP LLM 十大参考仍然最新
  - **Azure 服务**：校验所有微软 Azure 文档链接和最佳实践
- <strong>标准一致性</strong>：确认所有引用的安全标准均为当前版本
  - NIST AI 风险管理框架
  - ISO 27001:2022
  - OAuth 2.1 安全最佳实践
  - Azure 安全与合规框架
- <strong>实施资源</strong>：验证所有实施指南链接和资源
  - Azure API 管理认证模式
  - Microsoft Entra ID 集成指南
  - Azure 密钥保管机密管理
  - DevSecOps 流水线和监控方案

### 文档质量保障
- <strong>规范合规性</strong>：确保所有强制性 MCP 安全要求（必须/必须不）符合最新规范
- <strong>资源时效性</strong>：验证所有外部链接指向微软文档、安全标准及实施指南
- <strong>最佳实践覆盖</strong>：确认全面涵盖认证、授权、AI 特定威胁、供应链安全和企业模式

## 2025 年 10 月 6 日

### 入门部分扩展 – 高级服务器使用与简单认证

#### 高级服务器使用 (03-GettingStarted/10-advanced)
- <strong>新增章节</strong>：引入全面指南，涵盖高级 MCP 服务器使用，包括常规与低级服务器架构
  - **常规 vs 低级服务器**：详述两种方案的比较及 Python 和 TypeScript 代码示例
  - <strong>基于处理程序的设计</strong>：解释基于处理程序的工具/资源/提示管理，支持可扩展、灵活的服务器实现
  - <strong>实用模式</strong>：低级服务器模式在高级功能与架构中的实际场景

#### 简单认证 (03-GettingStarted/11-simple-auth)
- <strong>新增章节</strong>：分步指南指导在 MCP 服务器中实现简单认证
  - <strong>认证概念</strong>：清晰解释认证与授权，以及凭据处理
  - <strong>基本认证实现</strong>：Python (Starlette) 和 TypeScript (Express) 中基于中间件的认证模式及代码示例
  - <strong>向高级安全的进阶</strong>：从简单认证起步，进阶至 OAuth 2.1 和基于角色的访问控制（RBAC），并附带高级安全模块参考

这些新增内容为构建更健壮、安全且灵活的 MCP 服务器实现提供了实用的动手指导，连接基础概念与高级生产模式。

## 2025 年 9 月 29 日

### MCP 服务器数据库集成实验 - 全面动手学习路径

#### 11-MCPServerHandsOnLabs - 新完整数据库集成课程
- **完整 13 实验学习路径**：新增全面动手课程，涵盖生产级 MCP 服务器构建及 PostgreSQL 数据库集成
  - <strong>真实应用实现</strong>：Zava Retail 分析用例展示企业级模式
  - <strong>结构化学习进阶</strong>：
    - **实验 00-03：基础** - 介绍、核心架构、安全与多租户、环境设置
    - **实验 04-06：构建 MCP 服务器** - 数据库设计与模式、MCP 服务器实现、工具开发  
    - **实验 07-09：高级功能** - 语义搜索集成、测试与调试、VS Code 集成
    - **实验 10-12：生产及最佳实践** - 部署策略、监控与可观测性、最佳实践与优化
  - <strong>企业技术</strong>：FastMCP 框架、带 pgvector 的 PostgreSQL、Azure OpenAI 向量化、Azure 容器应用、应用洞察
  - <strong>高级功能</strong>：行级安全（RLS）、语义搜索、多租户数据访问、向量嵌入、实时监控

#### 术语标准化 - 模块到实验转换
- <strong>全面文档更新</strong>：系统更新所有 11-MCPServerHandsOnLabs 中的 README 文件，将“模块”术语替换为“实验”
  - <strong>章节标题</strong>：将所有 13 个实验中的“本模块涵盖内容”更新为“本实验涵盖内容”
  - <strong>内容描述</strong>：“本模块提供...”改为“本实验提供...”贯穿文档
  - <strong>学习目标</strong>：将“本模块结束时...”改为“本实验结束时...”
  - <strong>导航链接</strong>：交叉引用和导航中的所有“模块 XX:”改为“实验 XX:”
  - <strong>完成跟踪</strong>：将“完成本模块后...”改为“完成本实验后...”
  - <strong>保留技术引用</strong>：保持配置文件中的 Python 模块引用不变（如 `"module": "mcp_server.main"`）

#### 学习指南增强 (study_guide.md)
- <strong>可视化课程地图</strong>：新增“11. 数据库集成实验”部分及完整实验结构可视化
- <strong>仓库结构</strong>：主结构由十部分更新为十一部分，详细描述 11-MCPServerHandsOnLabs
- <strong>学习路径指导</strong>：增强导航指令，涵盖 00-11 章节
- <strong>技术覆盖</strong>：添加 FastMCP、PostgreSQL、Azure 服务集成细节
- <strong>学习成果</strong>：强调生产就绪服务器开发、数据库集成模式及企业安全

#### 主要 README 结构增强
- <strong>基于实验的术语</strong>：将 11-MCPServerHandsOnLabs 的主 README.md 中统一采用“实验”结构
- <strong>学习路径组织</strong>：明确从基础概念到高级实现再到生产部署的进阶
- <strong>真实案例聚焦</strong>：强调实操学习与企业级模式及技术

### 文档质量及一致性改进
- <strong>动手学习强化</strong>：贯穿文档突出实践、基于实验的学习方法
- <strong>企业模式聚焦</strong>：强调生产就绪实现与企业安全考虑
- <strong>技术集成</strong>：全面覆盖现代 Azure 服务与 AI 集成模式
- <strong>学习进阶</strong>：清晰、有结构的路径从基础到生产部署

## 2025 年 9 月 26 日

### 案例研究增强 - GitHub MCP 注册表集成

#### 案例研究 (09-CaseStudy/) - 生态系统开发聚焦
- **README.md**：大幅扩展，新增全面的 GitHub MCP 注册表案例研究
  - **GitHub MCP 注册表案例研究**：新增对 2025 年 9 月 GitHub MCP 注册表发布的全面分析
    - <strong>问题分析</strong>：深入探讨分散 MCP 服务器发现与部署挑战
    - <strong>解决方案架构</strong>：GitHub 集中注册表方法与一键 VS Code 安装
    - <strong>业务影响</strong>：显著提升开发者入门和生产力
    - <strong>战略价值</strong>：聚焦模块化代理部署与跨工具互操作性
    - <strong>生态系统开发</strong>：定位为代理集成基础平台
  - <strong>案例研究结构增强</strong>：更新所有七个案例研究，统一格式和详细描述
    - Azure AI 旅行代理：多代理编排重点
    - Azure DevOps 集成：工作流自动化重点
    - 实时文档检索：Python 控制台客户端实现
    - 交互式学习计划生成器：Chainlit 会话式网络应用
    - 编辑器内文档：VS Code 与 GitHub Copilot 集成
    - Azure API 管理：企业 API 集成模式
    - GitHub MCP 注册表：生态系统开发与社区平台
  - <strong>综合结论</strong>：改写结论部分，强调涵盖多维度 MCP 实现的七个案例研究
    - 企业集成、多代理编排、开发者生产力
    - 生态系统开发、教育应用分类
    - 深化架构模式、实施策略与最佳实践见解
    - 强调 MCP 作为成熟、生产就绪协议

#### 学习指南更新 (study_guide.md)
- <strong>可视化课程地图</strong>：更新思维导图，包含 GitHub MCP 注册表在案例研究部分
- <strong>案例研究描述</strong>：由泛泛描述增强为七个全面案例的详细拆解
- <strong>仓库结构</strong>：更新第 10 部分，反映全面案例研究覆盖和具体实现细节
- <strong>更新日志集成</strong>：添加 2025 年 9 月 26 日条目，记录 GitHub MCP 注册表新增及案例研究增强
- <strong>日期更新</strong>：更新页脚时间戳以反映最新修订（2025 年 9 月 26 日）

### 文档质量改进
- <strong>一致性提升</strong>：标准化所有七个案例的格式与结构
- <strong>全面覆盖</strong>：案例研究涵盖企业、开发者生产力及生态系统开发场景
- <strong>战略定位</strong>：强化 MCP 作为代理系统部署基础平台
- <strong>资源整合</strong>：更新附加资源，包含 GitHub MCP 注册表链接

## 2025 年 9 月 15 日

### 高级主题扩展 - 自定义传输与上下文工程

#### MCP 自定义传输 (05-AdvancedTopics/mcp-transport/) - 新版高级实现指南
- **README.md**：完整自定义 MCP 传输机制实现指南
  - **Azure 事件网格传输**：全面无服务器事件驱动传输实现
    - 包含 C#、TypeScript 及 Python 示例，集成 Azure Functions
    - 事件驱动架构模式，支持可扩展 MCP 解决方案
    - Webhook 接收器及基于推送的消息处理
  - **Azure 事件中心传输**：高吞吐量流式传输实现
    - 支持低延迟场景的实时流式能力
    - 分区策略与检查点管理
    - 消息批处理及性能优化
  - <strong>企业集成模式</strong>：生产级架构示例
    - 跨多个 Azure Functions 的分布式 MCP 处理
    - 混合传输架构结合多种传输类型
    - 消息持久性、可靠性及错误处理策略
  - <strong>安全与监控</strong>：Azure 密钥保管集成与可观测性模式
    - 托管身份认证与最小权限访问
    - 应用洞察遥测和性能监控
    - 熔断器与容错模式
  - <strong>测试框架</strong>：自定义传输综合测试策略
    - 使用测试替身和模拟框架的单元测试
    - 使用 Azure 测试容器的集成测试
    - 性能和负载测试注意事项

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新兴 AI 领域
- **README.md**：对上下文工程作为新兴领域的全面探讨
  - <strong>核心原则</strong>：完整上下文共享、动作决策感知及上下文窗口管理
  - **MCP 协议对齐**：MCP 设计如何应对上下文工程挑战
    - 上下文窗口限制与渐进加载策略
    - 相关性判定与动态上下文检索
    - 多模态上下文处理与安全考量
  - <strong>实现方法</strong>：单线程与多代理架构
    - 上下文切块与优先级技术
    - 渐进上下文加载和压缩策略
    - 分层上下文方法及检索优化
  - <strong>测量框架</strong>：新兴上下文有效性评估指标
    - 输入效率、性能、质量与用户体验考量
    - 上下文优化的实验方法
    - 故障分析与改进方法论

#### 课程导航更新 (README.md)
- <strong>增强模块结构</strong>：更新课程表，包含新增高级主题
  - 添加上下文工程（5.14）和自定义传输（5.15）条目
  - 各模块格式和导航链接保持一致
  - 更新描述以反映当前内容范围

### 目录结构改进
- <strong>命名标准化</strong>：将“mcp transport”重命名为“mcp-transport”，与其他高级主题文件夹保持一致
- <strong>内容组织</strong>：所有 05-AdvancedTopics 文件夹现遵循一致命名模式（mcp-[topic]）

### 文档质量提升
- **符合 MCP 规范**：所有新内容均引用当前 MCP 规范 2025-06-18
- <strong>多语言示例</strong>：提供 C#、TypeScript 和 Python 的全面代码示例

- <strong>企业聚焦</strong>：贯穿始终的生产就绪模式和Azure云集成
- <strong>可视化文档</strong>：使用Mermaid图表进行架构和流程可视化

## 2025年8月18日

### 文档全面更新 - MCP 2025-06-18 标准

#### MCP 安全最佳实践 (02-Security/) - 完全现代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：按照MCP规范2025-06-18全面重写
  - <strong>强制性要求</strong>：新增官方规范中的明确MUST/MUST NOT要求，并附带清晰的视觉指示
  - **12项核心安全实践**：从15项列表重构为全面的安全领域
    - 令牌安全与身份验证，集成外部身份提供者
    - 会话管理与传输安全，含加密要求
    - AI专用威胁防护，集成Microsoft Prompt Shields
    - 访问控制与权限，遵循最小权限原则
    - 内容安全与监控，集成Azure内容安全
    - 供应链安全，包含全面组件验证
    - OAuth安全与混淆代理预防，实施PKCE
    - 事件响应与恢复，含自动化能力
    - 合规与治理，符合法规要求
    - 高级安全控制，零信任架构
    - 微软安全生态系统集成，全面解决方案
    - 持续安全演进，适应性实践
  - <strong>微软安全解决方案</strong>：增强对Prompt Shields、Azure内容安全、Entra ID和GitHub高级安全的集成指导
  - <strong>实施资源</strong>：按官方MCP文档、微软安全解决方案、安全标准和实施指南分类的资源链接指南

#### 高级安全控制 (02-Security/) - 企业级实施
- **MCP-SECURITY-CONTROLS-2025.md**：企业级安全框架的全面重构
  - **9大安全领域**：由基础控制扩展至详细的企业框架
    - 高级身份验证与授权，集成Microsoft Entra ID
    - 令牌安全及防绕过控制，全面验证
    - 会话安全控制，防止会话劫持
    - AI专用安全控制，防止提示注入和工具毒害
    - 混淆代理攻击预防，OAuth代理安全
    - 工具执行安全，沙箱与隔离
    - 供应链安全控制，依赖项验证
    - 监控与检测控制，SIEM集成
    - 事件响应与恢复，自动化能力
  - <strong>实施示例</strong>：新增详细的YAML配置块和代码示例
  - <strong>微软解决方案集成</strong>：全面覆盖Azure安全服务、GitHub高级安全及企业身份管理

#### 高级主题安全 (05-AdvancedTopics/mcp-security/) - 生产就绪实现
- **README.md**：企业安全实施的全面重写
  - <strong>当前规范对齐</strong>：更新至MCP规范2025-06-18并含强制安全要求
  - <strong>增强身份验证</strong>：Microsoft Entra ID集成，含全面的.NET和Java Spring Security示例
  - **AI安全集成**：Microsoft Prompt Shields和Azure内容安全实现，附详尽的Python示例
  - <strong>高级威胁缓解</strong>：全面实现示例，包括
    - 混淆代理攻击预防，PKCE及用户同意验证
    - 令牌转发预防，包含受众验证及安全令牌管理
    - 会话劫持预防，采用加密绑定与行为分析
  - <strong>企业安全集成</strong>：Azure应用洞察监控、威胁检测流水线及供应链安全
  - <strong>实施清单</strong>：明确强制与推荐安全控制及微软安全生态系统优势

### 文档质量与标准对齐
- <strong>规范引用</strong>：所有引用更新至当前MCP规范2025-06-18
- <strong>微软安全生态系统</strong>：增强所有安全文档中的集成指导
- <strong>实用实施</strong>：新增.NET、Java和Python的详细代码示例及企业模式
- <strong>资源组织</strong>：官方文档、安全标准及实施指南的全面分类
- <strong>视觉指示</strong>：清晰标示强制要求与推荐实践


#### 核心概念 (01-CoreConcepts/) - 完全现代化
- <strong>协议版本更新</strong>：更新至当前MCP规范2025-06-18，采用基于日期的版本格式（YYYY-MM-DD）
- <strong>架构优化</strong>：增强Hosts、Clients和Servers的描述，以反映当前MCP架构模式
  - Hosts现明确定义为协调多个MCP客户端连接的AI应用
  - Clients描述为维护与单一服务器的一对一协议连接器
  - Servers增强为本地与远程部署场景
- <strong>原语重构</strong>：服务器及客户端原语的全面重构
  - 服务器原语：资源（数据源）、提示（模板）、工具（可执行函数），附详细说明和示例
  - 客户端原语：采样（LLM完成）、引出（用户输入）、日志（调试/监控）
  - 更新为当前发现（`*/list`）、检索（`*/get`）和执行（`*/call`）方法模式
- <strong>协议架构</strong>：引入双层架构模型
  - 数据层：基于JSON-RPC 2.0，含生命周期管理和原语
  - 传输层：本地STDIO及支持SSE的流HTTP远程传输机制
- <strong>安全框架</strong>：覆盖明确的用户同意、数据隐私保护、工具执行安全及传输层安全的全面安全原则
- <strong>通信模式</strong>：更新协议消息以展示初始化、发现、执行及通知流
- <strong>代码示例</strong>：刷新多语言示例（.NET、Java、Python、JavaScript）以反映当前MCP SDK模式

#### 安全 (02-Security/) - 全面安全重构  
- <strong>标准对齐</strong>：完全对齐MCP规范2025-06-18的安全要求
- <strong>身份验证演变</strong>：记录从自定义OAuth服务器到外部身份提供者委托（Microsoft Entra ID）的演进
- **AI专用威胁分析**：增强对现代AI攻击矢量的覆盖
  - 详细提示注入攻击场景及真实案例
  - 工具毒害机制及“拔地毯”攻击模式
  - 上下文窗口毒害与模型混淆攻击
- **微软AI安全解决方案**：微软安全生态系统的全面覆盖
  - AI提示盾牌，含先进检测、聚光及分隔符技术
  - Azure内容安全集成模式
  - GitHub高级安全用于供应链保护
- <strong>高级威胁缓解</strong>：详细安全控制措施针对
  - 会话劫持，涵盖MCP特定攻击场景与加密会话ID要求
  - MCP代理中的混淆代理问题及明确同意要求
  - 令牌转发漏洞及强制验证控制
- <strong>供应链安全</strong>：扩展AI供应链覆盖，包括基础模型、嵌入服务、上下文提供者及第三方API
- <strong>基础安全</strong>：增强企业安全模式集成，包括零信任架构与微软安全生态系统
- <strong>资源组织</strong>：按类型（官方文档、标准、研究、微软解决方案、实施指南）分类的全面资源链接

### 文档质量提升
- <strong>结构化学习目标</strong>：增强具体且可操作的学习目标
- <strong>交叉引用</strong>：新增相关安全与核心概念主题间的链接
- <strong>当前信息</strong>：更新所有日期引用及规范链接至当前标准
- <strong>实施指导</strong>：在两部分均增加具体且可操作的实施指导

## 2025年7月16日

### README 和导航改进
- 完全重新设计README.md中的课程导航
- 用更易访问的表格格式替换`<details>`标签
- 在新建的“alternative_layouts”文件夹中创建替代布局选项
- 新增基于卡片、标签式及手风琴式导航示例
- 更新仓库结构部分以包含所有最新文件
- 增强“如何使用本课程”部分，给出明确推荐
- 更新MCP规范链接指向正确的URL
- 新增课程结构中的上下文工程部分（5.14）

### 学习指南更新
- 完全修订学习指南以符合当前仓库结构
- 新增MCP客户端与工具、流行MCP服务器章节
- 更新视觉课程地图以准确反映所有主题
- 增强高级主题的描述，涵盖所有专业领域
- 更新案例研究部分以反映真实示例
- 新增此全面变更日志

### 社区贡献 (06-CommunityContributions/)
- 增加有关图像生成MCP服务器的详细信息
- 新增在VSCode中使用Claude的全面章节
- 新增Cline终端客户端的设置与使用说明
- 更新MCP客户端部分，包含所有流行客户端选项
- 增强贡献示例，附更准确的代码样例

### 高级主题 (05-AdvancedTopics/)
- 统一命名组织所有专业主题文件夹
- 增加上下文工程材料与示例
- 新增Foundry代理集成文档
- 增强Entra ID安全集成文档

## 2025年6月11日

### 初始创建
- 发布首个MCP初学者课程版本
- 创建所有10个主要部分的基本结构
- 实现可视化课程地图用于导航
- 添加多种编程语言的初始示例项目

### 入门 (03-GettingStarted/)
- 创建第一个服务器实现示例
- 增加客户端开发指导
- 包含LLM客户端集成说明
- 增加VS Code集成文档
- 实现服务器发送事件（SSE）服务器示例

### 核心概念 (01-CoreConcepts/)
- 增加客户端-服务器架构的详细说明
- 创建关键协议组件文档
- 记录MCP中的消息模式

## 2025年5月23日

### 仓库结构
- 初始化仓库的基础文件夹结构
- 为每个主要部分创建README文件
- 设置翻译基础设施
- 添加图像资源和图表

### 文档
- 创建初始README.md，含课程概览
- 添加CODE_OF_CONDUCT.md及SECURITY.md
- 设置SUPPORT.md，提供获取帮助的指导
- 创建初步学习指南结构

## 2025年4月15日

### 规划与框架
- MCP初学者课程的初步规划
- 定义学习目标和目标受众
- 概述课程的10部分结构
- 制定示例和案例研究的概念框架
- 创建关键概念的初始原型示例

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->