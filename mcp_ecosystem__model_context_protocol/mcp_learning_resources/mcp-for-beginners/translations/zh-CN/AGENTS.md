# AGENTS.md

## 项目概述

**MCP初学者指南** 是一个开源的教育课程，旨在学习模型上下文协议（MCP）——一种针对AI模型与客户端应用程序交互的标准化框架。本仓库提供覆盖多种编程语言的全面学习材料和实操代码示例。

### 关键技术

- <strong>编程语言</strong>：C#, Java, JavaScript, TypeScript, Python, Rust
- **框架与SDK**：
  - MCP SDK（`@modelcontextprotocol/sdk`）
  - Spring Boot（Java）
  - FastMCP（Python）
  - LangChain4j（Java）
- <strong>数据库</strong>：带pgvector扩展的PostgreSQL
- <strong>云平台</strong>：Azure（容器应用、OpenAI、内容安全、应用洞察）
- <strong>构建工具</strong>：npm, Maven, pip, Cargo
- <strong>文档</strong>：Markdown，支持自动多语言翻译（48+种语言）

### 架构

- **11个核心模块（00-11）**：按照顺序学习基础到高级内容
- <strong>实操实验</strong>：多种语言的完整解决方案代码实操练习
- <strong>示例项目</strong>：功能齐全的MCP服务器和客户端实现
- <strong>翻译系统</strong>：基于GitHub Actions的自动多语言支持工作流
- <strong>图片资源</strong>：集中存放的图片目录及其翻译版本

## 安装命令

本仓库主要聚焦文档。大部分安装配置发生在各个示例项目和实验中。

### 仓库设置

```bash
# 克隆仓库
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### 使用示例项目

示例项目位于：
- `03-GettingStarted/samples/` - 语言特定示例
- `03-GettingStarted/01-first-server/solution/` - 首个服务器实现
- `03-GettingStarted/02-client/solution/` - 客户端实现
- `11-MCPServerHandsOnLabs/` - 完整的数据库集成实验

每个示例项目都有自己的安装说明：

#### TypeScript/JavaScript项目
```bash
cd <project-directory>
npm install
npm start
```

#### Python项目
```bash
cd <project-directory>
pip install -r requirements.txt
# 或
pip install -e .
python main.py
```

#### Java项目
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## 开发工作流程

### 文档结构

- **模块 00-11**：核心课程内容，按顺序排列
- **translations/**：语言特定版本（自动生成，勿直接编辑）
- **translated_images/**：本地化图片版本（自动生成）
- **images/**：源图片和示意图

### 修改文档指南

1. 仅编辑根模块目录（00-11）中的英文markdown文件
2. 如有需要，更新 `images/` 目录中的图片
3. co-op-translator GitHub Action会自动生成翻译
4. 每次推送到main分支时会重新生成翻译

### 使用翻译说明

- <strong>自动翻译</strong>：由GitHub Actions工作流处理所有翻译
- <strong>请勿手动编辑</strong> `translations/` 目录中的文件
- 翻译文件中嵌入了翻译元数据
- 支持48+种语言，包括阿拉伯语、中文、法语、德语、印地语、日语、韩语、葡萄牙语、俄语、西班牙语等多种

## 测试说明

### 文档验证

作为主要文档仓库，测试重点在于：

1. <strong>链接验证</strong>：确保所有内部链接有效
```bash
# 检查损坏的Markdown链接
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. <strong>代码示例验证</strong>：确保代码示例能够编译/运行
```bash
# 导航到特定示例并运行其测试
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown格式检查**：确保格式一致
```bash
# 如有需要，请使用 markdownlint
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### 示例项目测试

各语言示例包含各自的测试方式：

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## 代码风格指南

### 文档风格

- 使用清晰、适合初学者的语言
- 包含多种语言的代码示例（如适用）
- 遵循Markdown最佳实践：
  - 使用ATX风格标题（`#`语法）
  - 使用带语言标识的代码块
  - 为图片添加描述性替代文本
  - 保持合理的行长度（无硬限制，但要合理）

### 代码示例风格

#### TypeScript/JavaScript
- 使用ES模块（`import`/`export`）
- 遵循TypeScript严格模式惯例
- 添加类型注释
- 目标版本为ES2022

#### Python
- 遵循PEP 8风格指南
- 适当使用类型提示
- 函数和类包含docstrings
- 使用现代Python特性（3.8+）

#### Java
- 遵循Spring Boot惯例
- 使用Java 21特性
- 遵循标准Maven项目结构
- 添加Javadoc注释

### 文件组织

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## 构建与部署

### 文档部署

本仓库文档托管采用 GitHub Pages 或类似服务（如适用）。对main分支的更改触发：

1. 翻译工作流（`.github/workflows/co-op-translator.yml`）
2. 自动翻译所有英文markdown文件
3. 图片本地化处理（如需）

### 无需构建流程

本仓库主要包含Markdown文档，核心课程内容无需编译或构建步骤。

### 示例项目部署

各示例项目可能有部署说明：
- 参见 `03-GettingStarted/09-deployment/` 了解MCP服务器部署指导
- `11-MCPServerHandsOnLabs/`中有Azure容器应用部署示例

## 贡献指南

### 拉取请求流程

1. **Fork并克隆**：Fork本仓库并克隆你的副本
2. <strong>创建分支</strong>：使用描述性分支名（如 `fix/typo-module-3`，`add/python-example`）
3. <strong>进行修改</strong>：仅编辑英文markdown文件（非翻译文件）
4. <strong>本地测试</strong>：确认markdown正确渲染
5. **提交PR**：使用清晰的PR标题和描述
6. **签署CLA**：根据提示签署微软贡献者许可协议

### PR标题格式

使用清晰、描述性的标题：
- `[Module XX] 简要描述` 用于模块相关更改
- `[Samples] 描述` 用于示例代码更改
- `[Docs] 描述` 用于一般文档更新

### 贡献内容建议

- 文档或代码示例的Bug修复
- 新的代码示例（支持更多编程语言）
- 现有内容的澄清和改进
- 新案例研究或实用示例
- 针对不清晰或错误内容的Issue报告

### 禁止事项

- 不要直接编辑 `translations/` 目录中的文件
- 不要编辑 `translated_images/` 目录
- 未经讨论，不要添加大容量二进制文件
- 未经协调，不要更改翻译工作流文件

## 其他说明

### 仓库维护

- <strong>变更日志</strong>：所有重大改动记录在 `changelog.md`
- <strong>学习指南</strong>：课程导航使用 `study_guide.md`
- **Issue 模板**：使用GitHub issue模板报告错误和提出功能请求
- <strong>行为准则</strong>：所有贡献者须遵守微软开源行为准则

### 学习路径

建议按顺序完成模块（00-11）：
1. **00-02**：基础（介绍、核心概念、安全）
2. **03**：动手机实操入门
3. **04-05**：实用实现与高级主题
4. **06-10**：社区实践、最佳实践及真实应用
5. **11**：完整数据库集成实验（13个连续实验）

### 支持资源

- <strong>文档</strong>：https://modelcontextprotocol.io/
- <strong>规范</strong>：https://spec.modelcontextprotocol.io/
- <strong>社区</strong>：https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**：微软Foundry Discord服务器
- <strong>相关课程</strong>：参考README.md了解其他微软课程路径

### 常见疑难解答

**问：我的PR翻译检查未通过怎么办？**  
答：确认只修改了根模块目录中的英文markdown文件，未改动任何翻译版本。

**问：怎样添加新语言？**  
答：语言支持通过co-op-translator工作流管理。可提交Issue讨论新增语言。

**问：代码示例无法运行怎么办？**  
答：确保按照对应示例README中的安装步骤进行，且依赖版本正确。

**问：图片无法显示？**  
答：检查图片路径是否为相对路径且使用正斜杠。图片应位于 `images/` 或 `translated_images/` 目录。

### 性能考虑

- 翻译工作流可能需几分钟完成
- 提交前请优化大型图片
- 保持单个markdown文件聚焦且适中大小
- 使用相对链接提高可移植性

### 项目治理

本项目遵循微软开源最佳实践：  
- 采用MIT许可协议（代码和文档）
- 遵循微软开源行为准则
- 贡献需签署CLA
- 安全问题请遵循SECURITY.md指导
- 支持文档见SUPPORT.md

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->