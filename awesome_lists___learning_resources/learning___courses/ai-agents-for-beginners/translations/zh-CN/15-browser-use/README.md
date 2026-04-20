# 构建计算机使用代理（CUA）

计算机使用代理能够像人一样与网站交互：打开浏览器，检查页面，并根据所见采取最佳后续操作。在本课程中，你将构建一个浏览器自动化代理，搜索 Airbnb，提取结构化的房源数据，并识别斯德哥尔摩最便宜的住宿。

本课程结合了用于 AI 驱动导航的 Browser-Use、用于浏览器控制的 Playwright 和 Chrome DevTools 协议 (CDP)、支持视觉推理的 Azure OpenAI，以及用于结构化提取的 Pydantic。

## 引言

本课程将涵盖：

- 理解何时计算机使用代理比仅使用 API 自动化更合适
- 结合 Browser-Use 与 Playwright 和 CDP，实现可靠的浏览器生命周期管理
- 使用 Azure OpenAI 视觉功能和结构化 Pydantic 输出，从动态网页提取房源数据
- 判断何时采用以代理为先、以执行者为先，或混合模式的浏览器自动化工作流

## 学习目标

完成本课程后，你将掌握：

- 配置 Browser-Use 以使用 Azure OpenAI 和 Playwright
- 构建一个浏览器自动化工作流，导航真实网站并处理动态 UI 元素
- 从可见页面内容中提取类型化结果，并将其用于下游业务逻辑
- 根据浏览器任务的可预测性，在代理模式和执行者模式间做选择

## 代码示例

本课程包含一个笔记本教程：

- [15-browser-user.ipynb](./15-browser-user.ipynb)：通过 CDP 启动 Chrome 会话，搜索 Airbnb 斯德哥尔摩房源，使用 Browser-Use 视觉提取价格，并以结构化数据返回最便宜选项。

## 先决条件

- Python 3.12+
- 环境中配置了 Azure OpenAI 部署
- 本地已安装 Chrome 或 Chromium
- 已安装 Playwright 依赖
- 基本的异步 Python 知识

## 设置

安装笔记本使用的包：

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

配置笔记本使用的 Azure OpenAI 环境变量：

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# 可选：省略时默认为最新的 API 版本
AZURE_OPENAI_API_VERSION=...
```

## 架构概览

笔记本演示了一个混合浏览器自动化工作流：

1. 启用 CDP 的 Chrome 启动，Playwright 和 Browser-Use 共享同一浏览器会话。
2. Browser-Use 代理处理开放式导航任务，如打开 Airbnb、关闭弹窗、搜索斯德哥尔摩。
3. 使用结构化 Pydantic 模式检查活动页面，提取房源标题、每晚价格、评分和链接。
4. Python 逻辑比较提取的房源，突出显示价格最低的结果。

该方法保留了 Browser-Use 擅长的灵活视觉推理，同时在需要时仍能实现确定性的浏览器控制。

## 主要收获与最佳实践

### 何时使用代理 vs 执行者

| 场景 | 使用代理 | 使用执行者 |
|------|-----------|-----------|
| 动态布局 | 是，AI 能适应页面变化 | 否，脆弱的选择器易崩溃 |
| 已知结构 | 否，代理比直接控制慢 | 是，快速且精确 |
| 查找元素 | 是，自然语言效果好 | 否，需要精确选择器 |
| 定时控制 | 否，预测性差 | 是，可完全控制等待和重试 |
| 复杂工作流 | 是，能应对意外 UI 状态 | 否，需显式分支 |

### Browser-Use 最佳实践

1. 初期探索和动态导航使用代理。
2. 交互变得可预测时切换到直接页面控制。
3. 使用结构化输出模型验证提取数据类型安全。
4. 在触发明显 UI 变化的动作后，策略性添加延迟。
5. 迭代时抓取截图，方便调试失败。
6. 预期网站会变，设计弹窗和布局变化的应对策略。
7. 混合代理和执行者模式，实现灵活与精确兼备。

### 真实应用场景

- 旅游预订和价格监控
- 电商价格对比与库存检查
- 动态网站结构化提取
- 具备视觉感知的 UI 测试与验证
- 网站监控与告警
- 跨多步骤流程的智能表单填写

## 附加资源

- [Browser-Use Playwright 集成模板](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use 执行者参数和内容提取](https://docs.browser-use.com/customize/actor/all-parameters)
- [课程设置](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文档使用AI翻译服务[Co-op Translator](https://github.com/Azure/co-op-translator)进行翻译。虽然我们努力保证准确性，但请注意自动翻译可能存在错误或不准确之处。原文档的原始语言版本应被视为权威来源。对于关键信息，建议采用专业人工翻译。对于因使用本翻译导致的任何误解或曲解，我们概不负责。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->