# 更新日志：MCP 初学者课程

本文档记录了面向初学者的模型上下文协议（MCP）课程所有重要变更。变更按时间倒序记录（最新变更优先）。

## 2026年6月16日

### MCP 规范对齐与示例验证

根据当前的 **MCP 规范 2025-11-25** 及最新官方 SDK 验证了课程，并且修正了所有过时的规范引用，确认核心示例依旧能构建和运行。

#### 规范版本修正（2025-06-18 / 2025-03-26 → 2025-11-25）

更新了仍声明旧规范版本为<em>当前/最新</em>标准的英文内容，并将链接指向权威的 `modelcontextprotocol.io` 规范路径：
- **05-AdvancedTopics/mcp-security/README.md**：更新了“当前标准”横幅、介绍、核心安全原则标题、强制要求标题、Microsoft Entra ID 部分、参考资料链接和结尾安全通知（8处引用）为 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**：更新了附加资源的规范链接和“当前标准”横幅为 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**：用当前的 2025-11-25 安全最佳实践页面替换了过时的 `2025-03-26` 安全和信任链接
- **03-GettingStarted/14-sampling/README.md**：更新了官方采样文档链接至 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**：更新了现在时的“当前 MCP 规范”引用和附加资源的规范链接至 2025-11-25（保留了历史 SSE 弃用注释以保持准确性）

#### 当前 SDK 示例验证

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**：用 `npm install` 解决了 `@modelcontextprotocol/sdk@1.29.0`；`tsc --noEmit` 无类型错误 — 现有的 `McpServer`/`StdioServerTransport` API 仍然有效
- **Python (03-GettingStarted/01-first-server/solution/python)**：在隔离 `.venv` 内使用 `mcp[cli]` (1.27.2) 验证；`py_compile` 通过，`FastMCP.list_tools()` 正确返回了 `add` 和 `subtract` 工具
- 确认所有示例中 `@modelcontextprotocol/sdk` 的版本范围（`>=1.26.0` / `^1.26.0` / `^1.27.0`）均能干净解析到当前的 `1.29.0`，无重大 API 变更

#### 依赖版本对齐（补齐版本差距）

将过时的 SDK 版本固定提升，使每个示例均跟踪当前 MCP 发行版，符合全库惯例：
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**：将 `@modelcontextprotocol/sdk` 从 `^1.8.0` 提升到 `>=1.26.0`，并将过时的“更新于 MCP 2025-06-18”包描述改为“与 MCP 规范 2025-11-25 对齐”
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 和 **lab4/code/github_mcp_server/pyproject.toml**：将精确固定的 `mcp==1.23.0` 提升到 `mcp>=1.26.0`；重新生成了两个 `uv.lock` 文件 (`uv lock`)，使锁文件解析为当前 `mcp 1.27.2`，与清单保持同步

#### 课程内容差距分析 — 最新规范功能覆盖

确认课程已涵盖 MCP 2025-11-25 中新增及扩展的所有原语，无内容缺口：
- <strong>采样</strong>：课程 03-GettingStarted/14-sampling 及 05-AdvancedTopics/mcp-sampling
- **引导（含 URL 模式）**：文档在 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features
- <strong>根上下文</strong>：文档在 00-Introduction、01-CoreConcepts 和 05-AdvancedTopics/mcp-root-contexts
- **任务（实验性、长时间运行操作）**：文档在 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features
- <strong>工具注释</strong>（`readOnlyHint` / `destructiveHint`）：文档在 01-CoreConcepts 和 05-AdvancedTopics/mcp-protocol-features

### 安全强化与依赖漏洞修复

对每个依赖清单和示例源代码进行了全面安全扫描，修复了所有报告的 npm 漏洞和一处代码级问题。修复后，`npm audit` 在所有审计目录中报告 **0 个漏洞**。

#### npm 依赖漏洞（传递）— 已修复

审核了全部 15 个提交的 `package-lock.json` 文件。漏洞仅限于 MCP Inspector 开发工具、OpenAI 客户端和 MCP SDK 引入的传递依赖；现均在不破坏示例的前提下修复：
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 与 **lab3/code/weather_mcp/inspector**：升级了 `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`)，清除绑定的 `ajv`、`brace-expansion`、`diff`、`path-to-regexp` 和 `ws` 漏洞。新增 npm `overrides` 条目强制打补丁的 `shell-quote@1.8.4` 消除 `concurrently` 带来的严重漏洞；重新生成了两个锁文件（现 0 漏洞）
- **03-GettingStarted/samples/typescript**：通过 `npm audit fix` 更新了传递依赖 `qs`（中等）到打补丁版本
- **03-GettingStarted/samples/javascript**：通过 `npm audit fix` 更新了传递依赖 `hono`（中等）到打补丁版本
- **03-GettingStarted/03-llm-client/solution/typescript**：通过 `npm audit fix` 更新了传递依赖 `form-data`（高危）到打补丁版本
- **03-GettingStarted/11-simple-auth/solution/typescript**：生成了缺失的 `package-lock.json`，使项目可复现并可审计（0 漏洞）

#### 代码级安全修复（OWASP A03：注入）

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**：移除了 `open_in_vscode` 工具中的 `shell=True`。之前的 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` 允许文件夹路径中的 shell 元字符被 `cmd.exe` 解释（命令注入向量）。现直接调用解析后的 `Code.exe` 并传递文件夹参数，无 shell，功能等效且安全

#### Python 依赖审计

- 使用 `pip-audit` 审计了所有 Python 依赖集。`05-AdvancedTopics` 和 `03-GettingStarted/samples/python` 报告 <strong>无已知漏洞</strong>（其 `mcp` / `httpx` / `pydantic` / `python-dotenv` 范围解析为当前打补丁版本）
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**：`pip-audit` 发现传递依赖 **`werkzeug` 3.1.1** 存在三个 `safe_join` Windows 设备名 DoS 漏洞 — `CVE-2025-66221`、`CVE-2026-21860` 和 `CVE-2026-27199`（均已在 3.1.6 修复）。添加了显式安全版本约束 `werkzeug>=3.1.6` 以解析为打补丁版本；验证该约束与 `chainlit` / `mcp` / `semantic-kernel` 堆栈兼容

### 产品名称重塑

将所有课程内容更新为微软产品的新品牌：

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**：更新 Discord 社区链接
- **AGENTS.md**：更新 Discord 服务器引用
- **README.md**：更新技术生态引用
- **study_guide.md**：更新案例研究引用
- **05-AdvancedTopics/README.md**：更新第 5.13 章标题和描述
- **05-AdvancedTopics/mcp-integration/README.md**：更新章节标题和描述
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**：完整模块标题和内容更新
- **05-AdvancedTopics/mcp-security-entra/README.md**：更新交叉引用链接
- **07-LessonsfromEarlyAdoption/README.md**：更新案例研究引用
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**：更新第 9 节标题、标识和功能
- **08-BestPractices/README.md**：更新 Discord 社区链接
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**：更新 Discord 频道引用
- **09-CaseStudy/docs-mcp/solution/python/README.md**：更新模型部署引用
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**：更新 AI 服务表
- **11-MCPServerHandsOnLabs/03-Setup/README.md**：更新资源引用

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**：更新主课程引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**：更新模块标题、概述及所有模块标题
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**：更新标题、学习目标、设置说明和资源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**：更新标题、学习目标、MCP 主机表和交叉引用
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**：更新标题、徽章、先决条件和资源
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**：更新代理构建器引用和反馈链接
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**：更新先决条件和扩展引用

---

## 2026年4月11日

### 新课程、文档修复与依赖更新

#### 新增课程内容

**模块 05 - 高级主题**  
- **第 5.17 课：使用 MCP 的对抗式多代理推理** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`)：新增全面教程，涵盖多代理系统的对抗辩论模式  
  - Mermaid 架构图：两个代理 → 共享的 MCP 服务器 → 辩论记录 → 裁判 → 裁决  
  - 共享 MCP 工具服务器（`web_search` + `run_python`）以 Python 和 TypeScript 实现  
  - 对立系统提示（正方 / 反方 / 裁判），含明确定义的工具使用要求  
  - 用 Python、TypeScript 和 C# 实现的辩论协调器，管理轮次和论点路由  
  - 负责工具调用的 MCP `ClientSession` 用于辩论协调器  
  - 用例表（幻觉检测、威胁建模、API 设计评审、事实核查、技术选择）  
  - 安全注意事项：沙箱执行、工具调用验证、速率限制、审计日志  
  - 含三个实用场景的结构化练习（代码审查、架构决策、内容监管）

#### 文档修复

**模块 03 - 入门**  
- **05-stdio-server/README.md**：修正了不完整的 TypeScript stdio 服务器示例 — 补充了缺失的传输实例化(`new StdioServerTransport()`)和 `server.connect(transport)` 调用，与同节 Python 和 .NET 示例对应  
- **14-sampling/README.md**：修复拼写错误 — 将 `"Sampling is an davanced features"` 改为 `"Sampling is an advanced feature"`

#### 课程更新

**主 README.md**  
- 在课程表中添加了 5.17 课（使用 MCP 的对抗式多代理推理）并附直链

**05-AdvancedTopics/README.md**  
- 添加了第 5.17 课行至课程列表

**study_guide.md**  
- 将对抗式多代理推理主题纳入心智图及高级主题描述中

#### 代码和安全修复

**模块 05 - 对抗代理 (`mcp-adversarial-agents`)**  
- **安全修复 — 命令注入**：用 `execFile` + `promisify` 替换了 TypeScript `run_python` 工具中的 `execSync` Shell 插值，消除了命令注入风险（LLM 控制的代码作为字面 argv 元素传入，无 shell 参与）
- **MCP 工具循环连接**：更新 Python 辩论协调器以使用 `AsyncAnthropic` 客户端（替换阻塞同步的 `Anthropic`），直接传递实时的 `ClientSession` 给每个代理回合，每回合通过 `session.list_tools()` 获取工具定义，循环通过 `session.call_tool()` 调度 `tool_use` 块，直到模型发出最终文本响应

#### 依赖更新

- 多个包（03-GettingStarted、04-PracticalImplementation、10-StreamliningAIWorkflows）中将 `hono` 升级至 4.12.12
- TypeScript 包中将 `@hono/node-server` 从 1.19.11 升级至 1.19.13
- Python 包（10-StreamliningAIWorkflows 实验室 3 和 4）中将 `cryptography` 从 46.0.5 升级至 46.0.7
- 10-StreamliningAIWorkflows inspector 中将 `lodash` 从 4.17.23 升级至 4.18.1

#### 翻译

- 同步了 48+ 种语言的翻译与最新源代码变更（i18n 更新）

---

## 2026年2月5日

### 全库范围的校验和导航改进

#### 新增课程内容

**模块 03 - 入门**
- **12-mcp-hosts/README.md**：新增 MCP 主机设置综合指南
  - Claude 桌面版、VS Code、Cursor、Cline、Windsurf 配置示例
  - 所有主要主机的 JSON 配置模板
  - 传输类型对比表（stdio、SSE/HTTP、WebSocket）
  - 常见连接问题排查
  - 主机配置的安全最佳实践

- **13-mcp-inspector/README.md**：新增 MCP Inspector 调试指南
  - 安装方式（npx、npm 全局安装、源码安装）
  - 通过 stdio 和 HTTP/SSE 连接服务器
  - 测试工具、资源和提示流程
  - VS Code 与 MCP Inspector 集成
  - 常见调试场景及解决方案

**模块 04 - 实践应用**
- **pagination/README.md**：新增分页实现指南
  - Python、TypeScript、Java 中的基于 Cursor 的分页模式
  - 客户端分页处理
  - Cursor 设计策略（不透明与结构化）
  - 性能优化建议

**模块 05 - 高级主题**
- **mcp-protocol-features/README.md**：新增协议功能深入解析
  - 进度通知实现
  - 请求取消模式
  - 带 URI 模式的资源模板
  - 服务器生命周期管理
  - 日志级别控制
  - 使用 JSON-RPC 代码的错误处理模式

#### 导航修复（更新 24+ 文件）

**主模块 README 文件**
 现链接到第一个课程及下一个模块

**02-Security 子文件**
- 所有 5 个补充安全文档现均包含“下一步”导航：

**09-CaseStudy 文件**
- 所有案例研究文件现均支持顺序导航：

**10-StreamliningAI 实验室**
在模块 10 概览及模块 11 添加“下一步”部分

#### 代码及内容修复

**SDK 和依赖更新**
修复空白的 openai 版本为 `^4.95.0`  
将 SDK 从 `^1.8.0` 更新至 `>=1.26.0`  
将 mcp 版本依赖锁定为 `>=1.26.0`

<strong>代码修复</strong>
修正无效模型名称 `gpt-4o-mini` 为 `gpt-4.1-mini`

<strong>内容修复</strong>
修正破损链接 `READMEmd` → `README.md`，修正课程标题 `Module 1-3` → `Module 0-3`，修正大小写敏感路径  
删除损坏重复的案例研究 5 内容

<strong>初学者指南改进</strong>
为初学者新增适当介绍、学习目标和前置条件

#### 课程更新

**主 README.md**
- 向课程表新增条目 3.12（MCP 主机）、3.13（MCP Inspector）、4.1（分页）、5.16（协议功能）

**模块 README 文件**
新增 12 和 13 课  
新增分页实践指南部分链接  
新增课程 5.15（自定义传输）及 5.16（协议功能）

**study_guide.md**
- 更新思维导图，包含所有新主题：MCP 主机设置、MCP Inspector、分页策略、协议功能深度解析

## 2026年1月28日

### MCP 规范 2025-11-25 合规性审查

#### 核心概念增强（01-CoreConcepts/）
- **新增客户端原语 “Roots”**：新增全面文档，支持服务器理解文件系统边界和访问权限
- <strong>工具注解</strong>：新增工具行为注解文档（`readOnlyHint`，`destructiveHint`），优化工具执行决策
- <strong>采样中的工具调用</strong>：更新采样文档，支持 `tools` 和 `toolChoice` 参数，允许模型驱动采样请求中工具调用
- **URL 模式引导**：新增 URL 基础引导文档，支持服务器发起外部网页交互
- **任务（实验性）**：新增任务特性文档，支持持久执行包装及延迟结果检索
- <strong>图标支持</strong>：指出工具、资源、资源模板和提示均可包含图标作为附加元数据

#### 文档更新
- **README.md**：新增 MCP 规范 2025-11-25 版本引用及基于日期的版本说明
- **study_guide.md**：更新课程地图，包含任务和工具注释在核心概念部分；更新时间戳

#### 规范合规验证
- <strong>协议版本</strong>：确认所有文档引用当前 MCP 规范 2025-11-25
- <strong>架构一致性</strong>：确认文档准确描述两层架构（数据层 + 传输层）
- <strong>原语文档</strong>：验证服务器原语（资源、提示、工具）及客户端原语（采样、引导、日志、Roots）
- <strong>传输机制</strong>：确认 STDIO 和可流式 HTTP 传输文档准确
- <strong>安全指南</strong>：确认符合当前 MCP 安全最佳实践文档

#### MCP 2025-11-25 关键特性说明
- **OpenID Connect 发现**：通过 OIDC 实现认证服务器发现
- **OAuth 客户端 ID 元数据文档**：推荐客户端注册机制
- **JSON Schema 2020-12**：MCP 架构定义默认方言
- **SDK 分层体系**：正式需求 SDK 特性支持和维护
- <strong>治理结构</strong>：MCP 治理中的工作组与兴趣组形式化

### 安全文档重大更新（02-Security/）

#### MCP 安全峰会研讨会（Sherpa）集成
- <strong>新增实操培训资源</strong>：全线安全文档整合 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- <strong>远征路线覆盖</strong>：记录从基地营到峰会的完整路径
- **OWASP 对齐**：所有安全指导均映射到 OWASP MCP Azure 安全指南风险

#### OWASP MCP Top 10 集成
- <strong>新增部分</strong>：主安全 README 中新增 OWASP MCP Top 10 风险表及 Azure 缓解措施
- <strong>风险驱动文档</strong>：在 mcp-security-controls-2025.md 增加 OWASP MCP 风险（MCP01-MCP08）关联
- <strong>参考架构</strong>：链接到 OWASP MCP Azure 安全指南参考架构及实现范式

#### 更新的安全文件
- **README.md**：新增 Sherpa 研讨会概述、远征路线表、OWASP MCP Top 10 风险总结与实操培训部分
- **mcp-security-controls-2025.md**：更新标题至 2026年2月，添加 OWASP 风险引用，修正规范版本不一致
- **mcp-security-best-practices-2025.md**：新增 Sherpa 与 OWASP 资源部分，更新时间戳
- **mcp-best-practices.md**：新增实操培训部分含 Sherpa 与 OWASP 链接
- **azure-content-safety-implementation.md**：新增 OWASP MCP06 参考、Sherpa 3号营对齐及额外资源部分

#### 新增资源链接
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 单独 OWASP MCP 风险页面（MCP01-MCP10）

### 全课程 MCP 规范 2025-11-25 对齐

#### 模块 03 - 入门
- **SDK 文档**：加入 Go SDK 至官方列表；所有 SDK 引用均更新对应 MCP 规范 2025-11-25
- <strong>传输说明</strong>：更新 STDIO 和 HTTP 流传输描述，明确规范引用

#### 模块 04 - 实践实现
- **SDK 更新**：加入 Go SDK，SDK 列表更新规范版本引用
- <strong>授权规范</strong>：更新 MCP 授权规范链接至当前 2025-11-25 版本

#### 模块 05 - 高级主题
- <strong>新增特性</strong>：新增 MCP 规范 2025-11-25 特性说明（任务、工具注解、URL 模式引导、Roots）
- <strong>安全资源</strong>：新增 OWASP MCP Top 10 和 Sherpa 研讨会链接

#### 模块 06 - 社区贡献
- **SDK 列表**：新增 Swift 和 Rust SDK；更新规范链接至 2025-11-25
- <strong>规范引用</strong>：更新 MCP 规范链接至官方规范 URL

#### 模块 07 - 早期采用经验
- <strong>资源更新</strong>：新增 MCP 规范 2025-11-25 链接及 OWASP MCP Top 10 至附加资源

#### 模块 08 - 最佳实践
- <strong>规范版本</strong>：更新 MCP 规范引用至 2025-11-25
- <strong>安全资源</strong>：新增 OWASP MCP Top 10 和 Sherpa 研讨会链接

#### 模块 10 - 优化 AI 工作流
- <strong>徽章更新</strong>：将 MCP 版本徽章从 SDK 版本（1.9.3）更改为规范版本（2025-11-25）
- <strong>资源链接</strong>：更新 MCP 规范链接；新增 OWASP MCP Top 10

#### 模块 11 - MCP 服务器实操实验
- <strong>规范引用</strong>：更新 MCP 规范链接至 2025-11-25 版本
- <strong>安全资源</strong>：新增 OWASP MCP Top 10 至官方资源

## 2025年12月18日

### 安全文档更新 - MCP 规范 2025-11-25

#### MCP 安全最佳实践（02-Security/mcp-best-practices.md）- 规范版本更新
- <strong>协议版本升级</strong>：更新引用为最新 MCP 规范 2025-11-25（2025年11月25日发布）
  - 所有规范版本引用从 2025-06-18 更新至 2025-11-25
  - 文档日期从 2025年8月18日更新至 2025年12月18日
  - 确认所有规范 URL 指向当前文档
- <strong>内容验证</strong>：全面验证安全最佳实践和最新标准一致性
  - <strong>微软安全解决方案</strong>：核实 Prompt Shields（前称“越狱风险检测”）、Azure 内容安全、Microsoft Entra ID 和 Azure Key Vault 的术语及链接
  - **OAuth 2.1 安全**：确认与最新 OAuth 安全最佳实践一致
  - **OWASP 标准**：验证与 LLMs 相关的 OWASP Top 10 引用仍然有效
  - **Azure 服务**：校验所有微软 Azure 文档链接及最佳实践
- <strong>标准对齐</strong>：所有引用的安全标准均确认最新
  - NIST AI 风险管理框架
  - ISO 27001:2022
  - OAuth 2.1 安全最佳实践
  - Azure 安全与合规框架
- <strong>实施资源</strong>：验证所有实施指南链接和资源的有效性
  - Azure API 管理认证模式
  - Microsoft Entra ID 集成指南
  - Azure Key Vault 密钥管理
  - DevSecOps 管道及监控解决方案

### 文档质量保证
- <strong>规范合规</strong>：确保所有必须的 MCP 安全要求（MUST/MUST NOT）符合最新规范
- <strong>资源更新</strong>：核实所有外部链接至微软文档、安全标准和实施指南有效
- <strong>最佳实践涵盖</strong>：确认覆盖所有认证、授权、AI 特有威胁、供应链安全及企业模式

## 2025年10月6日

### 入门部分扩展 – 高级服务器使用与简单认证

#### 高级服务器使用（03-GettingStarted/10-advanced）
- <strong>新增章节</strong>：引入全面的高级 MCP 服务器使用指南，涵盖常规及底层服务器架构
  - <strong>常规与底层服务器比较</strong>：提供 Python 和 TypeScript 的详细比较及代码示例
  - <strong>基于处理器的设计</strong>：解释基于处理器的工具/资源/提示管理，以实现可扩展且灵活的服务器实现
  - <strong>实用模式</strong>：介绍低层服务器模式在高级特性和架构中的实际应用场景
#### 简单认证 (03-GettingStarted/11-simple-auth)
- <strong>新增章节</strong>：分步骤指导在 MCP 服务器中实现简单认证。
  - <strong>认证概念</strong>：清晰解释认证与授权的区别，以及凭证处理。
  - <strong>基础认证实现</strong>：基于中间件的认证模式，分别在 Python (Starlette) 和 TypeScript (Express) 中提供代码示例。
  - <strong>进阶安全指引</strong>：指导从简单认证开始，逐步进阶到 OAuth 2.1 和 RBAC，并提供高级安全模块参考。

这些新增内容为构建更健壮、安全和灵活的 MCP 服务器实现提供实用的动手指导，桥接基础概念与高级生产模式。

## 2025年9月29日

### MCP 服务器数据库集成实验室 - 全面动手学习路径

#### 11-MCPServerHandsOnLabs - 全新完整数据库集成课程
- **完整13个实验路径**：新增通过 PostgreSQL 数据库集成构建生产级 MCP 服务器的全面动手课程
  - <strong>真实案例实现</strong>：Zava 零售分析用例展示企业级模式
  - <strong>结构化学习进阶</strong>：
    - **实验00-03：基础篇** - 介绍、核心架构、安全与多租户、环境搭建
    - **实验04-06：构建 MCP 服务器** - 数据库设计与模式、MCP 服务器实现、工具开发
    - **实验07-09：高级功能** - 语义搜索集成、测试与调试、VS Code 集成
    - **实验10-12：生产与最佳实践** - 部署策略、监控与可观测性、最佳实践与优化
  - <strong>企业级技术栈</strong>：FastMCP 框架、带 pgvector 的 PostgreSQL、Azure OpenAI 嵌入、Azure 容器应用、应用程序洞察
  - <strong>高级功能</strong>：行级安全 (RLS)、语义搜索、多租户数据访问、向量嵌入、实时监控

#### 术语标准化 - 模块到实验转换
- <strong>全面文档更新</strong>：系统性更新所有 11-MCPServerHandsOnLabs 的 README 文件，将“模块”术语改为“实验”
  - <strong>章节标题</strong>：将“本模块涵盖”更新为“本实验涵盖”覆盖全部13个实验
  - <strong>内容描述</strong>：将“本模块提供...”改为“本实验提供...”遍及所有文档
  - <strong>学习目标</strong>：将“本模块结束时...”改为“本实验结束时...”
  - <strong>导航链接</strong>：所有“模块 XX:”引用统一改为“实验 XX:”的交叉引用和导航
  - <strong>完成追踪</strong>：将“完成本模块后...”改为“完成本实验后...”
  - <strong>保持技术引用</strong>：配置文件中保留 Python 模块引用（如 `"module": "mcp_server.main"`）

#### 学习指南增强 (study_guide.md)
- <strong>可视课程图</strong>：新增“11. 数据库集成实验”章节，全面展示实验结构
- <strong>仓库结构</strong>：主章节由10更新为11，详细描述 11-MCPServerHandsOnLabs
- <strong>学习路径指导</strong>：增强导航说明涵盖章节00-11
- <strong>技术覆盖</strong>：新增 FastMCP、PostgreSQL、Azure 服务集成细节
- <strong>学习成果</strong>：强调生产就绪服务器开发、数据库集成模式及企业安全

#### 主 README 结构优化
- <strong>基于实验的术语</strong>：更新 11-MCPServerHandsOnLabs 主 README.md，统一使用“实验”结构
- <strong>学习路径组织</strong>：清晰展示基础概念到高级实现再到生产部署的进阶
- <strong>真实案例聚焦</strong>：突出实战操作，应用企业级模式和技术

### 文档质量及一致性改进
- <strong>强调动手学习</strong>：贯穿文档强化基于实验的实践方法
- <strong>聚焦企业模式</strong>：突出生产环境实现和企业安全考量
- <strong>技术集成</strong>：涵盖现代 Azure 服务及 AI 集成模式
- <strong>学习进阶</strong>：构建从基础概念到生产部署的清晰路线

## 2025年9月26日

### 案例研究增强 - GitHub MCP Registry 集成

#### 案例研究 (09-CaseStudy/) - 生态系统发展聚焦
- **README.md**：大幅扩展，新增全面 GitHub MCP Registry 案例研究
  - **GitHub MCP Registry 案例研究**：详尽分析 2025年9月 GitHub MCP Registry 发布
    - <strong>问题分析</strong>：深入拆解分散的 MCP 服务器发现与部署难题
    - <strong>解决方案架构</strong>：GitHub 集中式登记中心及一键 VS Code 安装
    - <strong>业务影响</strong>：显著提升开发者入门及生产效率
    - <strong>战略价值</strong>：聚焦模块化代理部署及跨工具互操作
    - <strong>生态发展</strong>：定位为代理系统集成的基础平台
  - <strong>优化案例结构</strong>：统一格式，详细描述7个案例研究
    - Azure AI 旅行代理：多代理编排强调
    - Azure DevOps 集成：工作流自动化聚焦
    - 实时文档检索：Python 控制台客户端实现
    - 交互式学习计划生成器：Chainlit 对话式 Web 应用
    - 编辑器内文档：VS Code 与 GitHub Copilot 集成
    - Azure API 管理：企业级 API 集成模式
    - GitHub MCP Registry：生态系统开发与社区平台
  - <strong>综合结论</strong>：重写总结，涵盖七个案例，贯穿多维 MCP 实现
    - 企业集成、多代理编排、开发者生产力
    - 生态系统开发、教育应用分类
    - 深化架构模式、实现策略与最佳实践洞察
    - 强调 MCP 作为成熟生产协议

#### 学习指南更新 (study_guide.md)
- <strong>可视课程地图</strong>：更新心智图，包含 GitHub MCP Registry 的案例研究
- <strong>案例描述强化</strong>：从概述升级为七个详尽案例研究
- <strong>仓库结构调整</strong>：更新第10章节反映案例全面覆盖及具体实现细节
- <strong>变更日志更新</strong>：新增 2025年9月26日变动，记录 GitHub MCP Registry 及案例研究强化
- <strong>日期更新</strong>：页脚更新时间同步至最新修订（2025年9月26日）

### 文档质量提升
- <strong>一致性增强</strong>：统一7个案例研究格式与结构
- <strong>全面覆盖</strong>：案例涵盖企业、开发者效率及生态系统发展场景
- <strong>战略定位</strong>：强化 MCP 作为代理系统部署基础平台
- <strong>资源整合</strong>：补充 GitHub MCP Registry 相关链接

## 2025年9月15日

### 高级主题扩展 - 自定义传输与上下文工程

#### MCP 自定义传输 (05-AdvancedTopics/mcp-transport/) - 新增高级实现指南
- **README.md**：完整自定义 MCP 传输机制实现指南
  - **Azure 事件网格传输**：全面无服务器事件驱动传输实现
    - C#、TypeScript 与 Python 示例及 Azure Functions 集成
    - 可扩展 MCP 解决方案事件驱动架构模式
    - Webhook 接收及推送式消息处理
  - **Azure 事件中心传输**：高吞吐流式传输实现
    - 低延迟场景实时流式能力
    - 分区策略与检查点管理
    - 消息批处理与性能优化
  - <strong>企业集成模式</strong>：生产就绪架构示例
    - 跨多个 Azure Functions 分布式 MCP 处理
    - 多种传输类型混合架构
    - 消息持久性、可靠性与错误处理策略
  - <strong>安全与监控</strong>：Azure Key Vault 集成与可观测模式
    - 托管身份验证与最小权限访问
    - 应用程序洞察遥测和性能监控
    - 熔断器与容错模式
  - <strong>测试框架</strong>：自定义传输的全面测试策略
    - 单元测试中的模拟与测试替身
    - Azure 测试容器集成测试
    - 性能与负载测试考量

#### 上下文工程 (05-AdvancedTopics/mcp-contextengineering/) - 新兴 AI 领域
- **README.md**：全面探讨上下文工程作为新兴学科
  - <strong>核心原则</strong>：完整上下文共享、行为决策感知及上下文窗口管理
  - **MCP 协议契合**：MCP 设计如何应对上下文工程挑战
    - 上下文窗口限制及渐进加载策略
    - 相关性判定与动态上下文检索
    - 多模态上下文处理及安全考量
  - <strong>实现方法</strong>：单线程与多代理架构对比
    - 上下文分块与优先级策略
    - 渐进加载与压缩技术
    - 分层上下文方法与检索优化
  - <strong>度量框架</strong>：上下文有效性新兴指标
    - 输入效率、性能、质量与用户体验考量
    - 上下文优化的实验方法
    - 失败分析与改进方法论

#### 课程导航更新 (README.md)
- <strong>模块结构增强</strong>：更新课程表包含新高级主题
  - 新增上下文工程 (5.14) 与自定义传输 (5.15)
  - 模块格式与导航链接统一
  - 描述更新反映当前内容范围

### 目录结构优化
- <strong>命名标准化</strong>：将“mcp transport”重命名为“mcp-transport”，统一高级主题文件夹命名规范
- <strong>内容组织</strong>：全部 05-AdvancedTopics 文件夹遵循一致命名模式（mcp-[topic]）

### 文档质量提升
- **MCP 规范对齐**：所有新内容均依 MCP 规范 2025-06-18
- <strong>多语言示例</strong>：C#、TypeScript 与 Python 综合代码示例
- <strong>企业聚焦</strong>：贯穿生产级模式与 Azure 云集成
- <strong>可视化文档</strong>：架构及流程 Mermaid 图示

## 2025年8月18日

### 文档全面更新 - MCP 2025-06-18 标准

#### MCP 安全最佳实践 (02-Security/) - 全面现代化
- **MCP-SECURITY-BEST-PRACTICES-2025.md**：完全重写，对齐 MCP 规范 2025-06-18
  - <strong>强制性要求</strong>：新增官方规范中明确的 MUST / MUST NOT 条款，配以可视指示
  - **12大核心安全实践**：由15条清单重构为综合安全领域
    - 令牌安全与认证，集成外部身份提供者
    - 会话管理与传输安全，含密码学要求
    - AI 特有威胁防护，集成 Microsoft Prompt Shields
    - 访问控制与权限，遵循最小权限原则
    - 内容安全与监控，集成 Azure 内容安全
    - 供应链安全，全面组件验证
    - OAuth 安全及混淆代理防范，包含 PKCE 实现
    - 事件响应与恢复，自动化能力
    - 合规与治理，符合监管要求
    - 高级安全控制，零信任架构
    - Microsoft 安全生态集成，全面解决方案
    - 持续安全演进，适应性实践
  - **Microsoft 安全解决方案**：增强对 Prompt Shields、Azure 内容安全、Entra ID 与 GitHub 高级安全的集成指导
  - <strong>实施资源</strong>：按官方 MCP 文档、Microsoft 安全方案、安全标准及实施指南分类的资源链接

#### 高级安全控制 (02-Security/) - 企业级实现
- **MCP-SECURITY-CONTROLS-2025.md**：全面革新，打造企业级安全框架
  - **9大安全领域**：由基础控制扩展为详尽企业框架
    - 高级认证与授权，含 Microsoft Entra ID 集成
    - 令牌安全与防止透传控制，综合验证
    - 会话安全控制，防止会话劫持
    - AI 特有安全，防范提示注入与工具中毒
    - 混淆代理攻击防护，OAuth 代理安全
    - 工具执行安全，沙箱隔离
    - 供应链安全控制，依赖验证
    - 监控与检测控制，SIEM 集成
    - 事件响应与恢复，自动化支持
  - <strong>实施示例</strong>：新增详尽 YAML 配置及代码示例
  - **Microsoft 解决方案集成**：涵盖 Azure 安全服务、GitHub 高级安全及企业身份管理

#### 高级主题安全 (05-AdvancedTopics/mcp-security/) - 生产就绪实现
- **README.md**：全面重写，面向企业级安全实现
  - <strong>规范对齐</strong>：更新至 MCP 规范 2025-06-18，含强制安全要求
  - <strong>增强认证</strong>：集成 Microsoft Entra ID，含 .NET 和 Java Spring Security 详示例
  - **AI 安全集成**：Microsoft Prompt Shields 与 Azure 内容安全，含详尽 Python 示例
  - <strong>高级威胁缓解</strong>：全面示例涵盖
    - 混淆代理攻击防护，使用 PKCE 与用户同意验证
    - 令牌透传防护，含受众验证及安全令牌管理
    - 会话劫持防护，密码学绑定与行为分析
  - <strong>企业安全集成</strong>：Azure 应用程序洞察监控、威胁检测管道与供应链安全
  - <strong>实施清单</strong>：明确强制与推荐安全控制及 Microsoft 安全集成优势

### 文档质量与标准对齐
- <strong>规范参考</strong>：更新所有参考至当前MCP规范2025-06-18  
- <strong>微软安全生态系统</strong>：增强所有安全文档中的集成指导  
- <strong>实用实现</strong>：添加包含企业模式的.NET、Java和Python详细代码示例  
- <strong>资源组织</strong>：全面分类官方文档、安全标准和实现指南  
- <strong>视觉指示器</strong>：明确标注强制要求与推荐实践  

#### 核心概念 (01-CoreConcepts/) - 完全现代化  
- <strong>协议版本更新</strong>：更新至参考当前MCP规范2025-06-18，采用基于日期的版本格式（YYYY-MM-DD）  
- <strong>架构优化</strong>：增强主机、客户端和服务器描述以反映当前MCP架构模式  
  - 主机现被明确定义为协调多个MCP客户端连接的AI应用  
  - 客户端描述为维护一对一服务器关系的协议连接器  
  - 服务器增补了本地与远程部署场景  
- <strong>基础原语重构</strong>：服务器和客户端原语全面重塑  
  - 服务器原语：资源（数据源）、提示（模板）、工具（可执行函数），附详细说明和示例  
  - 客户端原语：采样（LLM完成）、引出（用户输入）、日志（调试/监控）  
  - 更新为当前发现（`*/list`）、检索（`*/get`）和执行（`*/call`）方法模式  
- <strong>协议架构</strong>：引入两层架构模型  
  - 数据层：基于JSON-RPC 2.0，包含生命周期管理与原语  
  - 传输层：本地STDIO及支持SSE的可流HTTP远程传输机制  
- <strong>安全框架</strong>：全面安全原则，包括明确用户同意、数据隐私保护、工具执行安全和传输层安全  
- <strong>通信模式</strong>：更新协议消息以展示初始化、发现、执行和通知流程  
- <strong>代码示例</strong>：刷新多语言示例（.NET、Java、Python、JavaScript）以反映当前MCP SDK模式  

#### 安全 (02-Security/) - 全面安全重构  
- <strong>标准对齐</strong>：与MCP规范2025-06-18安全要求完全一致  
- <strong>认证演进</strong>：记录从自定义OAuth服务器到外部身份提供者委托（Microsoft Entra ID）的演变  
- **AI特定威胁分析**：增强现代AI攻击向量覆盖  
  - 详述提示注入攻击场景及真实例子  
  - 工具投毒机制与“割韭菜”攻击模式  
  - 上下文窗口投毒与模型混淆攻击  
- **微软AI安全解决方案**：全面覆盖微软安全生态系统  
  - 具备高级检测、聚焦和分隔符技术的AI提示屏障  
  - Azure内容安全集成模式  
  - GitHub高级安全用于供应链保护  
- <strong>高级威胁缓解</strong>：详细安全控制  
  - 会话劫持，包含MCP特定攻击场景和加密会话ID要求  
  - MCP代理混淆代理问题及明确同意要求  
  - 令牌透传漏洞及强制验证控制  
- <strong>供应链安全</strong>：扩展AI供应链覆盖，包括基础模型、嵌入服务、上下文提供者和第三方API  
- <strong>基础安全</strong>：加强与企业安全模式集成，包括零信任架构和微软安全生态  
- <strong>资源组织</strong>：按类型分类全面资源链接（官方文档、标准、研究、微软解决方案、实施指南）  

### 文档质量改进  
- <strong>结构化学习目标</strong>：增强学习目标，具备具体可行动果  
- <strong>交叉引用</strong>：添加相关安全与核心概念主题间链接  
- <strong>当前信息</strong>：更新所有日期引用及规范链接至当前标准  
- <strong>实现指导</strong>：在两个部分均添加具体可操作的实现指南  

## 2025年7月16日

### README及导航改进  
- 完全重新设计README.md中的课程导航  
- 用更易访问的表格格式替换了`<details>`标签  
- 在新建的“alternative_layouts”文件夹中创建备选布局选项  
- 添加卡片式、选项卡式及手风琴式导航示例  
- 更新仓库结构章节以涵盖最新所有文件  
- 增强“如何使用本课程”部分，给出明确建议  
- 更新MCP规范链接指向正确URL  
- 在课程结构中添加上下文工程章节（5.14）  

### 学习指南更新  
- 完全修订学习指南以对应当前仓库结构  
- 新增MCP客户端和工具及受欢迎的MCP服务器章节  
- 更新视觉课程地图，准确反映所有主题  
- 增强高级主题描述，覆盖所有专业领域  
- 更新案例研究部分，反映实际示例  
- 添加本详尽变更日志  

### 社区贡献 (06-CommunityContributions/)  
- 添加有关图像生成MCP服务器的详细信息  
- 新增在VSCode中使用Claude的综合章节  
- 新增Cline终端客户端安装和使用说明  
- 更新MCP客户端章节，涵盖所有流行客户端选项  
- 增强贡献示例，包含更准确代码样例  

### 高级主题 (05-AdvancedTopics/)  
- 统一命名所有专业主题文件夹  
- 添加上下文工程材料与示例  
- 添加Foundry代理集成文档  
- 增强Entra ID安全集成文档  

## 2025年6月11日

### 初始创建  
- 发布MCP初学者课程首个版本  
- 创建全部10个主要章节的基本结构  
- 实现视觉课程地图便于导航  
- 添加多语言示例项目  

### 入门 (03-GettingStarted/)  
- 创建首批服务器实现示例  
- 增加客户端开发指南  
- 包含LLM客户端集成说明  
- 添加VS Code集成文档  
- 实现服务器发送事件（SSE）示例  

### 核心概念 (01-CoreConcepts/)  
- 添加客户端-服务器架构详细说明  
- 创建关键协议组件文档  
- 记录MCP中的消息传递模式  

## 2025年5月23日

### 仓库结构  
- 初始化仓库基本文件夹结构  
- 为各主要章节创建README文件  
- 建立翻译架构  
- 添加图像资源和图示  

### 文档  
- 创建初始README.md，包含课程概览  
- 增添CODE_OF_CONDUCT.md和SECURITY.md  
- 设置SUPPORT.md，提供求助指导  
- 创建初步学习指南结构  

## 2025年4月15日

### 规划与框架  
- 初步规划MCP初学者课程  
- 确定学习目标和目标受众  
- 概括10章节课程结构  
- 开发示例与案例研究的概念框架  
- 创建关键概念的初步原型示例  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->