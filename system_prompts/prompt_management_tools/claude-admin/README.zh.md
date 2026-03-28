🌍 [English](README.md) | [Deutsch](README.de.md) | [Nederlands](README.nl.md) | [Português](README.pt.md) | [Español](README.es.md) | [Français](README.fr.md) | [Italiano](README.it.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | **中文** | [Polski](README.pl.md) | [Türkçe](README.tr.md)

# ClaudeAdmin

一个基于 Web 的管理控制台，用于管理您的 [Claude Code](https://claude.com/claude-code) 配置。

当您同时处理多个项目时，在 `~/.claude/` 中跟踪技能、规则、记忆文件、MCP 服务器和设置会变得十分繁琐。ClaudeAdmin 为您提供单一界面来统一管理这一切——无需再手动编辑 JSON 和 YAML 文件。

> **注意：** 这是一个独立的社区项目，与 Anthropic 无任何关联，亦未获得 Anthropic 的认可。

![ClaudeAdmin Dashboard](https://github.com/conradBruchmann/claude-admin/blob/master/docs/screenshot.png?raw=true)

## 功能特性

- **仪表板** — 包含统计数据、近期更改和项目快速访问的概览
- **项目** — 浏览项目，编辑 CLAUDE.md，按项目管理规则、技能、记忆和权限
- **项目顾问** — AI 驱动的分析，支持一键操作（创建 CLAUDE.md、初始化记忆、添加规则）
- **技能** — 创建、编辑和浏览全局技能（YAML 前置元数据 + Markdown）
- **技能浏览器** — 一键发现并安装社区技能
- **规则** — 管理全局和项目级规则，支持冲突检测
- **记忆** — 查看和编辑每个项目的记忆文件（MEMORY.md 及主题文件）
- **MCP 服务器** — 通过结构化表单（command/args/env）或原始 JSON 进行完整管理，支持健康检查和工具浏览器
- **MCP 浏览器** — 从精选目录中发现并安装热门 MCP 服务器
- **代理** — 使用特定提示词和工具配置定义自定义 Claude 代理
- **插件** — 管理已安装的 Claude Code 插件
- **启动配置** — 可复用的 CLI 配置（模型、工作量、工具、预算）
- **系统提示词** — 创建和管理可复用的系统提示词
- **时间线** — 基于 Git 的 `~/.claude/` 配置版本历史，支持差异查看器和恢复
- **设置** — 编辑全局设置、钩子、API 密钥、存储概览
- **权限** — 查看工具权限、安全警告和配置健康状态
- **计划** — 管理计划文件
- **会话** — 带搜索功能的会话历史浏览
- **分析** — 使用指标、按项目洞察和 CSV/JSON 导出
- **工作树** — 跨项目查看和管理 Git 工作树
- **搜索** — 跨技能、规则和配置的全文搜索
- **帮助聊天** — 具有对话记忆的上下文感知 AI 助手
- **备份** — 浏览、比较和恢复自动备份
- **12 种语言** — 完整国际化：英语、德语、西班牙语、法语、意大利语、日语、韩语、中文、荷兰语、波兰语、葡萄牙语、土耳其语

## 架构

```
┌─────────────────────┐     ┌──────────────────────┐
│  claude-admin-       │     │  claude-admin-        │
│  backend             │◄────│  frontend             │
│  Rust + Axum 0.7     │     │  Leptos 0.6 CSR/WASM  │
│  Port 9022           │     │  Port 9023 (dev)       │
└──────────┬──────────┘     └──────────────────────┘
           │                         │
           │    claude-admin-shared  │
           │    (shared types)       │
           │                         │
           ▼                         │
   ~/.claude/  (filesystem)          │
                                     │
   In production, the WASM frontend  │
   is embedded into the backend      │
   binary via rust-embed.            │
```

- **无数据库** — 直接从文件系统（`~/.claude/`）读写数据
- **自动备份** — 每次写操作前在 `~/.claude/backups/` 创建带时间戳的备份
- **Claude API 可选** — 无需 `ANTHROPIC_API_KEY` 也可完整运行
- **单一二进制文件** — 生产构建通过 `rust-embed` 将前端嵌入其中

## 安全性

ClaudeAdmin **在您的本地机器上运行**，专为开发工作站的单用户使用而设计。

- 仅读写 `~/.claude/` 和 `~/.claude.json` 目录下的文件
- 无遥测、无分析、无远程调用（已配置的 Anthropic API 除外）
- **可选身份验证** — 设置 `CLAUDE_ADMIN_TOKEN` 以启用 Bearer 令牌认证和会话管理
- **RBAC** — 通过 `~/.claude/users.json` 实现可选的基于角色的访问控制（Admin、Editor、Viewer）
- 安全头：CSP、X-Frame-Options DENY、X-Content-Type-Options nosniff
- 所有 API 端点均有速率限制
- 路径遍历防护

## 快速开始

### 前置条件

- [Rust](https://rustup.rs/)（稳定版）
- 用于 WASM 构建的 [Trunk](https://trunkrs.dev/)：`cargo install trunk`
- WASM 目标：`rustup target add wasm32-unknown-unknown`

### 开发环境

```bash
# 克隆并进入项目目录
git clone https://github.com/conradbruchmann/claude-admin.git
cd claude-admin

# 启动后端
cargo run -p claude-admin-backend

# 在另一个终端中：启动支持热重载的前端
cd claude-admin-frontend && trunk serve --port 9023
```

后端：`http://localhost:9022` — 前端：`http://localhost:9023`

### 生产构建

```bash
# 构建 WASM 前端
cd claude-admin-frontend && trunk build --release && cd ..

# 构建后端（嵌入前端）
cargo build --release -p claude-admin-backend

# 运行单一二进制文件
./target/release/claude-admin-backend
```

适用于 Linux、macOS 和 Windows 的预构建二进制文件可在 [Releases](https://github.com/conradBruchmann/claude-admin/releases) 页面下载。

### macOS 安装

从最新发布版本下载 `.dmg` 文件，打开后将 **ClaudeAdmin.app** 拖入 `/Applications` 文件夹。

由于该应用未使用 Apple 开发者证书签名，macOS Gatekeeper 将在首次启动时阻止它。请运行以下命令以允许其运行：

```bash
xattr -dr com.apple.quarantine /Applications/ClaudeAdmin.app
```

然后双击应用——它将启动服务器并在浏览器中打开 `http://localhost:9022`。DMG 包含通用二进制文件，可在 Intel 和 Apple Silicon Mac 上原生运行。

### Windows 安装

从最新发布版本下载 `ClaudeAdmin-*-Setup.exe` 并运行安装程序。安装至用户配置文件目录（无需管理员权限），自动创建开始菜单和桌面快捷方式，并在"应用和功能"中注册以便干净卸载。

安装完成后，从开始菜单或桌面启动 ClaudeAdmin——它将启动服务器并在浏览器中打开 `http://localhost:9022`。

## 配置路径

ClaudeAdmin 读写标准的 Claude Code 配置：

| 路径                                   | 描述                   |
| -------------------------------------- | ---------------------- |
| `~/.claude.json`                       | 项目注册表、MCP 服务器 |
| `~/.claude/settings.json`              | 全局设置、钩子         |
| `~/.claude/skills/`                    | 全局技能               |
| `~/.claude/rules/`                     | 全局规则               |
| `~/.claude/plans/`                     | 计划文件               |
| `~/.claude/projects/<encoded>/memory/` | 每个项目的记忆         |
| `~/.claude/projects/<encoded>/rules/`  | 每个项目的规则         |
| `~/.claude/system-prompts/`            | 可复用的系统提示词     |
| `~/.claude/agents/`                    | 自定义代理定义         |
| `~/.claude/launch-profiles/`           | CLI 启动配置           |
| `~/.claude/backups/`                   | 自动备份（带时间戳）   |
| `~/.claude/users.json`                 | RBAC 用户角色（可选）  |

## 许可证

[MIT](LICENSE) — Copyright (c) 2024-2026 Conrad Bruchmann, BRUCHMANN [TEC] INNOVATION GMBH
