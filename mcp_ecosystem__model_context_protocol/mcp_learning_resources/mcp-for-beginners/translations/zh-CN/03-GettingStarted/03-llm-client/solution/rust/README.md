# 运行此示例

这是 LLM 客户端示例的 Rust 解决方案。你需要安装 Rust 工具链；请参见[官方安装指南](https://www.rust-lang.org/tools/install)。

客户端通过 GitHub 模型推理端点（`https://models.github.ai/inference/chat`）调用模型，并从 `OPENAI_API_KEY` 环境变量读取你的 GitHub 个人访问令牌（PAT）。

> [!NOTE]
> 本仓库中的其他解决方案使用 `GITHUB_TOKEN`。对于 Rust，请将 `OPENAI_API_KEY` 设置为相同的值，以匹配 OpenAI 客户端配置。

## -0- 设置你的 GitHub 令牌

```bash
# zsh/bash
export OPENAI_API_KEY="{{YOUR_GITHUB_PAT}}"
```

```powershell
# PowerShell
$env:OPENAI_API_KEY = "{{YOUR_GITHUB_PAT}}"
```

## -1- 构建示例

```bash
cargo build
```

## -2- 运行示例

```bash
cargo run
```

客户端启动计算器 MCP 服务器，获取其工具列表，并使用模型（`openai/gpt-5-mini`）调用 `add` 工具。你应该会看到显示工具调用（例如，“Calling tool: add”）以及调用结果的输出。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->