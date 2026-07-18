# AGENTS.md

## 项目概览

本仓库包含“初学者的 AI 代理”——一门全面的教育课程，教授构建 AI 代理所需的所有内容。课程共有 18 课（编号 00-18），涵盖基础知识、设计模式、框架、生产部署、本地/设备代理及 AI 代理的安全性。

**关键技术：**
- Python 3.12+
- 用于互动学习的 Jupyter 笔记本
- AI 框架：微软代理框架 (MAF)
- Azure AI 服务：微软 Foundry，微软 Foundry 代理服务 V2

**架构：**
- 基于课程的结构（00-15+ 目录）
- 每课包含：README 文档、代码示例（Jupyter 笔记本）和图片
- 通过自动翻译系统支持多语言
- 每课一个使用微软代理框架的 Python 笔记本

## 安装命令

### 前提条件
- Python 3.12 或更高版本
- Azure 订阅（适用于微软 Foundry）
- 已安装并登录 Azure CLI（`az login`）

### 初始设置

1. **克隆或分叉仓库：**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # 或者
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **创建并激活 Python 虚拟环境：**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # 在 Windows 上：venv\Scripts\activate
   ```

3. **安装依赖：**
   ```bash
   pip install -r requirements.txt
   ```

4. **设置环境变量：**
   ```bash
   cp .env.example .env
   # 使用您的API密钥和端点编辑.env
   ```

### 必需的环境变量

针对 **微软 Foundry**（必须）：
- `AZURE_AI_PROJECT_ENDPOINT` - 微软 Foundry 项目端点
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - 模型部署名称（例如 gpt-4.1-mini）

针对 **Azure AI 搜索**（课程 05 - RAG）：
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI 搜索端点
- `AZURE_SEARCH_API_KEY` - Azure AI 搜索 API 密钥

认证：运行 `az login` 后再运行笔记本（使用 `AzureCliCredential`）。

## 开发工作流

### 运行 Jupyter 笔记本

每课包含多个用于不同框架的 Jupyter 笔记本：

1. **启动 Jupyter：**
   ```bash
   jupyter notebook
   ```

2. <strong>导航到课程目录</strong>（例如 `01-intro-to-ai-agents/code_samples/`）

3. **打开并运行笔记本：**
   - `*-python-agent-framework.ipynb` - 使用微软代理框架（Python）
   - `*-dotnet-agent-framework.ipynb` - 使用微软代理框架（.NET）

### 使用微软代理框架

**微软代理框架 + 微软 Foundry：**
- 需要 Azure 订阅
- 使用 `FoundryChatClient` 访问代理服务 V2（代理在 Foundry 门户可见）
- 生产就绪，内置可观察性功能
- 文件模式：`*-python-agent-framework.ipynb`

## 测试说明

这是一个教育仓库，包含示例代码，而非带自动测试的生产代码。要验证设置与更改：

### 手动测试

1. **测试 Python 环境：**
   ```bash
   python --version  # 应该是3.12及以上
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **测试笔记本执行：**
   ```bash
   # 将笔记本转换为脚本并运行（测试导入）
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **验证环境变量：**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### 运行单个笔记本

在 Jupyter 中打开笔记本，依次执行代码单元。每个笔记本都是独立的，包含：
- 导入语句
- 配置加载
- 示例代理实现
- 预期输出的 markdown 单元

### 部署代理冒烟测试

对于作为微软 Foundry 托管代理部署的课程（01、04、05、16），仓库会通过 `.github/workflows/smoke-test.yml` 工作流，使用 [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) 操作，运行位于 `tests/` 下的冒烟测试目录。这是轻量级的部署后检查（代理是否可访问且符合基本提示预期？），补充课程 10 和 16 的评估流水线。请参阅 [tests/README.md](./tests/README.md) 了解测试目录到课程再到代理的映射。课程 17 本地运行，使用 Foundry Local，无托管端点，因此通过直接运行笔记本来验证。

## 代码规范

### Python 规范

- **Python 版本**：3.12+
- <strong>代码风格</strong>：遵循标准 Python PEP 8 规范
- <strong>笔记本</strong>：使用清晰的 markdown 单元解释概念
- <strong>导入</strong>：按照标准库、第三方、本地导入分组

### Jupyter 笔记本规范

- 在代码单元前加入描述性 markdown 单元
- 在笔记本中加入输出示例以供参考
- 使用与课程概念匹配的清晰变量名
- 保持笔记本执行顺序线性（单元 1 → 2 → 3...）

### 文件组织

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## 构建与部署

### 构建文档

本仓库使用 Markdown 作为文档格式：
- 每门课文件夹中的 README.md 文件
- 仓库根目录的主 README.md
- 通过 GitHub Actions 自动翻译系统

### CI/CD 流水线

位于 `.github/workflows/`：

1. **co-op-translator.yml** - 自动翻译成 50 多种语言
2. **welcome-issue.yml** - 欢迎新提问者
3. **welcome-pr.yml** - 欢迎新的拉取请求贡献者

### 部署

这是一个教育仓库，无正式部署流程。用户可：
1. 分叉或克隆仓库
2. 在本地或 GitHub Codespaces 中运行笔记本
3. 通过修改和实验示例学习

## 拉取请求指南

### 提交前

1. **测试你的更改：**
   - 完整运行受影响的笔记本
   - 确认所有单元执行无误
   - 检查输出是否合适

2. **文档更新：**
   - 新增概念时更新 README.md
   - 对复杂代码在笔记本中添加注释
   - 确保 markdown 单元解释目的

3. **文件变更：**
   - 避免提交 `.env` 文件（使用 `.env.example`）
   - 不提交 `venv/` 或 `__pycache__/` 目录
   - 当笔记本输出演示概念时保留它们
   - 删除临时文件和备份笔记本（`*-backup.ipynb`）

### PR 标题格式

使用描述性标题：
- `[Lesson-XX] 为 <concept> 添加新示例`
- `[Fix] 修正 lesson-XX README 中的拼写错误`
- `[Update] 改进 lesson-XX 中的代码示例`
- `[Docs] 更新安装说明`

### 必需检查

- 笔记本应无错误执行
- README 文件应简明准确
- 遵循仓库现有代码模式
- 保持与其他课程一致性

## 其他备注

### 常见陷阱

1. **Python 版本不匹配：**
   - 确保使用 Python 3.12+ 版本
   - 某些包在旧版本上可能无法正常工作
   - 使用 `python3 -m venv` 明确指定 Python 版本

2. **环境变量：**
   - 总是从 `.env.example` 创建 `.env`
   - 不要提交 `.env` 文件（该文件在 `.gitignore` 中）
   - 使用 `az login` 登录，实现无密钥的 Entra ID 认证

3. **包冲突：**
   - 使用全新的虚拟环境
   - 从 `requirements.txt` 安装，不要单独安装包
   - 某些笔记本可能需额外包，见对应 markdown 单元说明

4. **Azure 服务：**
   - Azure AI 服务需有效订阅
   - 部分功能受地域限制
   - 确保你的 Azure OpenAI 模型部署支持响应 API

### 学习路径

推荐按顺序学习：
1. **00-course-setup** - 从这里开始环境搭建
2. **01-intro-to-ai-agents** - 了解 AI 代理基础
3. **02-explore-agentic-frameworks** - 了解不同框架
4. **03-agentic-design-patterns** - 核心设计模式
5. 按编号课依次学习

### 框架选择

根据目标选框架：
- <strong>所有课程</strong>：微软代理框架 (MAF) 与 `FoundryChatClient`
- <strong>代理服务器端注册</strong>于微软 Foundry 代理服务 V2，且可在 Foundry 门户查看

### 求助

- 加入 [微软 Foundry 社区 Discord](https://aka.ms/ai-agents/discord)
- 查看课程 README 获取具体指导
- 查阅主 [README.md](./README.md) 了解课程概览
- 参考 [课程设置](./00-course-setup/README.md) 了解详细安装步骤

### 贡献

这是一个开放教育项目，欢迎贡献：
- 改进代码示例
- 修正错别字或错误
- 添加注释说明
- 建议新增课程主题
- 翻译成更多语言

参见 [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) 获取当前需求。

## 项目专属背景

### 多语言支持

本仓库使用自动翻译系统：
- 支持 50 多种语言
- 翻译文件位于 `/translations/<lang-code>/` 目录
- 通过 GitHub Actions 工作流自动处理翻译更新
- 源文件为仓库根目录的英文版本

### 课程结构

每门课遵循一致模式：
1. 视频缩略图及链接
2. 书面课程内容（README.md）
3. 多框架代码示例
4. 学习目标和前置条件
5. 链接额外学习资源

### 代码示例命名

格式：`<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - 课程 1，MAF Python
- `14-sequential.ipynb` - 课程 14，MAF 高级模式
- `16-python-agent-framework.ipynb` - 课程 16，生产级客户支持代理
- `17-local-agent-foundry-local.ipynb` - 课程 17，Foundry Local + Qwen 本地代理

### 特殊目录

- `translated_images/` - 已本地化的翻译用图片
- `images/` - 英文原始图片
- `.devcontainer/` - VS Code 开发容器配置
- `.github/` - GitHub Actions 工作流与模板

### 依赖项

`requirements.txt` 中关键包：
- `agent-framework` - 微软代理框架
- `a2a-sdk` - 代理间协议支持
- `azure-ai-inference`、`azure-ai-projects` - Azure AI 服务
- `azure-identity` - Azure 身份认证（AzureCliCredential）
- `azure-search-documents` - Azure AI 搜索集成
- `mcp[cli]` - 模型上下文协议支持

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->