# 设置流行的 MCP 主机客户端

本指南介绍如何使用流行的 AI 主机关联 MCP 服务器进行配置和使用。每个主机都有自己的配置方式，但配置完成后，它们都会使用标准化协议与 MCP 服务器通信。

## 什么是 MCP 主机？

**MCP 主机** 是能够连接到 MCP 服务器以扩展功能的 AI 应用程序。可以将其视为用户交互的“前端”，而 MCP 服务器则提供“后端”的工具和数据。

```mermaid
flowchart LR
    User[👤 用户] --> Host[🖥️ MCP 主机]
    Host --> S1[MCP 服务器 A]
    Host --> S2[MCP 服务器 B]
    Host --> S3[MCP 服务器 C]
    
    subgraph "热门主机"
        H1[Claude 桌面版]
        H2[VS 代码]
        H3[Cursor]
        H4[Cline]
        H5[帆板]
    end
```
## 前提条件

- 一个可连接的 MCP 服务器（参见[模块 3.1 - 第一个服务器](../01-first-server/README.md)）
- 在系统上安装的主机应用程序
- 对 JSON 配置文件有基本了解

---

## 1. Claude Desktop

**Claude Desktop** 是 Anthropic 官方的桌面应用，原生支持 MCP。

### 安装

1. 从 [claude.ai/download](https://claude.ai/download) 下载 Claude Desktop
2. 安装并使用您的 Anthropic 账号登录

### 配置

Claude Desktop 使用 JSON 配置文件定义 MCP 服务器。

**配置文件位置：**
- **macOS**：`~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**：`%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**：`~/.config/Claude/claude_desktop_config.json`

**示例配置：**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### 配置选项

| 字段 | 说明 | 示例 |
|-------|-------------|---------|
| `command` | 要运行的可执行文件 | `"python"`, `"node"`, `"npx"` |
| `args` | 命令行参数 | `["-m", "my_server"]` |
| `env` | 环境变量 | `{"API_KEY": "xxx"}` |
| `cwd` | 工作目录 | `"/path/to/server"` |

### 测试您的设置

1. 保存配置文件
2. 完全重启 Claude Desktop（退出再打开）
3. 打开新对话
4. 查看带有 🔌 图标的已连接服务器
5. 试着让 Claude 使用您的某个工具

### Claude Desktop 故障排查

**服务器未出现：**
- 使用 JSON 校验器检查配置文件语法
- 确认命令路径正确
- 查看 Claude Desktop 日志：帮助 → 显示日志

**服务器启动时崩溃：**
- 先在终端手动测试服务器
- 检查环境变量是否正确设置
- 确保所有依赖已安装

---

## 2. VS Code 与 GitHub Copilot

VS Code 通过 GitHub Copilot 聊天扩展支持 MCP。

### 前提条件

1. 安装 VS Code 1.99 及以上版本
2. 安装 GitHub Copilot 扩展
3. 安装 GitHub Copilot 聊天扩展

### 配置

VS Code 使用工作区或用户设置中的 `.vscode/mcp.json`。

**工作区配置** (`.vscode/mcp.json`)：

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**用户设置** (`settings.json`)：

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### 在 VS Code 中使用 MCP

1. 打开 Copilot 聊天面板（Ctrl+Shift+I / Cmd+Shift+I）
2. 输入 `@` 查看可用的 MCP 工具
3. 用自然语言调用工具：“使用计算器计算 25 * 48”

### VS Code 故障排查

**MCP 服务器未加载：**
- 检查输出面板 → “MCP” 错误日志
- 重载窗口：Ctrl+Shift+P → “开发者：重载窗口”
- 确认服务器可独立运行

---

## 3. Cursor

**Cursor** 是以 AI 为核心的代码编辑器，内置支持 MCP。

### 安装

1. 从 [cursor.sh](https://cursor.sh) 下载 Cursor
2. 安装并登录

### 配置

Cursor 使用与 Claude Desktop 类似的配置格式。

**配置文件位置：**
- **macOS**：`~/.cursor/mcp.json`
- **Windows**：`%USERPROFILE%\.cursor\mcp.json`
- **Linux**：`~/.cursor/mcp.json`

**示例配置：**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### 在 Cursor 中使用 MCP

1. 打开 Cursor 的 AI 聊天（Ctrl+L / Cmd+L）
2. MCP 工具会自动出现在建议中
3. 让 AI 使用连接的服务器执行任务

---

## 4. Cline（基于终端）

**Cline** 是一个基于终端的 MCP 客户端，非常适合命令行工作流程。

### 安装

```bash
npm install -g @anthropic/cline
```

### 配置

Cline 使用环境变量和命令行参数。

**使用环境变量：**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**使用命令行参数：**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**配置文件** (`~/.clinerc`)：

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### 使用 Cline

```bash
# 开始一个交互会话
cline

# 使用MCP的单次查询
cline "Calculate the square root of 144 using the calculator"

# 列出可用工具
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** 是另一个支持 MCP 的 AI 驱动代码编辑器。

### 安装

1. 从 [codeium.com/windsurf](https://codeium.com/windsurf) 下载 Windsurf
2. 安装并创建账户

### 配置

Windsurf 配置通过设置界面管理：

1. 打开设置（Ctrl+, / Cmd+,）
2. 搜索 “MCP”
3. 点击“在 settings.json 中编辑”

**示例配置：**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## 传输类型比较

不同主机支持不同的传输机制：

| 主机 | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio**（标准输入/输出）：适用于由主机启动的本地服务器  
**SSE/HTTP**：适合远程服务器或多个客户端共享的服务器

---

## 常见故障排查

### 服务器无法启动

1. **先手动测试服务器：**
   ```bash
   # 适用于 Python
   python -m your_server_module
   
   # 适用于 Node.js
   node /path/to/server/index.js
   ```

2. **检查命令路径：**
   - 尽可能使用绝对路径
   - 确保可执行文件在 PATH 中

3. **验证依赖：**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### 服务器连接但工具无效

1. **检查服务器日志** - 大多数主机支持日志
2. **验证工具注册** - 使用 MCP Inspector 测试
3. **检查权限** - 部分工具需要文件/网络访问权限

### 环境变量未传递

- 有些主机会清理环境变量
- 明确使用 `env` 配置字段
- 避免在配置文件中存放敏感信息（使用密钥管理）

---

## 安全最佳实践

1. **绝不将 API 密钥提交到配置文件**
2. **使用环境变量保管敏感数据**
3. **限制服务器权限至必要范围**
4. **授予系统权限前审查服务器代码**
5. **使用允许列表管理文件系统和网络访问**

---

## 接下来做什么

- [3.13 - 使用 MCP Inspector 调试](../13-mcp-inspector/README.md)
- [3.1 - 创建你的第一个 MCP 服务器](../01-first-server/README.md)
- [模块 5 - 高级主题](../../05-AdvancedTopics/README.md)

---

## 额外资源

- [Claude Desktop MCP 文档](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP 扩展](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP 规范 - 传输](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [官方 MCP 服务器注册表](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件通过AI翻译服务[Co-op Translator](https://github.com/Azure/co-op-translator)翻译完成。虽然我们力求准确，但请注意自动翻译可能包含错误或不准确之处。原始的本地语言文件应视为权威来源。对于关键信息，建议使用专业人工翻译。因使用本翻译而产生的任何误解或误释，我们概不负责。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->