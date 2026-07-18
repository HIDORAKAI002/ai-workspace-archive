---
name: testing-course-samples
---
# 测试课程示例

验证课程笔记本和代码示例是否能在实时的
Microsoft Foundry / Azure OpenAI 环境中运行。该仓库提供了一个运行器，
位于 [`scripts/validate-notebooks.ps1`](../../../../../scripts/validate-notebooks.ps1)，
可无界面执行每个 Python 笔记本并输出通过/失败矩阵。

## 何时使用
- “验证我 Azure 订阅下所有笔记本/示例。”
- “升级包或更改模型后进行课程冒烟测试。”
- “哪些课程仍然通过/失败于实时环境？”

<strong>不要</strong> 使用此工具进行 AI 冒烟测试 GitHub Action（该动作验证<em>部署的</em>
托管代理 — 详见 [`tests/README.md`](../../../tests/README.md)）。此功能在本地运行笔记本。


1. **Python 3.12+** 及课程依赖：`python -m pip install -r requirements.txt`
   以及执行器：`python -m pip install nbconvert ipykernel`。
2. **仓库根目录下的 `.env` 文件**（从 [`.env.example`](../../../../../.env.example) 复制），
   至少包含：
   - `AZURE_AI_PROJECT_ENDPOINT` — Foundry 项目端点
     (`https://<account>.services.ai.azure.com/api/projects/<project>`)
   - `AZURE_AI_MODEL_DEPLOYMENT_NAME` — 非弃用的部署名称（例如 `gpt-4.1-mini`）
   - `AZURE_OPENAI_ENDPOINT` (`https://<account>.openai.azure.com`) 和 `AZURE_OPENAI_DEPLOYMENT`
     用于直接调用 Azure OpenAI 的课程（课程 06、02-azure-openai、14 handoff/human-loop）。
3. 完成 **`az login`** — 示例通过 `AzureCliCredential` 认证（Entra ID，无需密钥）。
4. 确认模型部署存在：
   运行 `az cognitiveservices account deployment list -g <rg> -n <account> -o table`。

## 运行验证
```powershell
# 所有Python笔记本（跳过.NET、.venv、site-packages、翻译、技能资源）
pwsh scripts/validate-notebooks.ps1

# 一个单独的课时，每个单元格有更长的超时
pwsh scripts/validate-notebooks.ps1 -Filter '08-*' -Timeout 600

# 仅列出将会运行的内容（不执行）
pwsh scripts/validate-notebooks.ps1 -List

# 明确指定解释器（如果`python`未在PATH中，比如Windows Store别名）
pwsh scripts/validate-notebooks.ps1 -Python "C:/path/to/python.exe"
```
该脚本将执行后的副本、每个笔记本的日志和 `results.json` 写入
`$env:TEMP\aiab-nbval` 目录，并以失败数量作为退出码。

## 结果说明
- `PASS` — 笔记本完整运行且无单元格错误。
- `FAIL` — 显示首个 `*Error` / `*Exception` 行；打开输出目录中的对应
  `log_*.txt` 查看完整回溯。
- 单个笔记本失败由 `-Timeout` 限制（每个单元格），因此卡住的人机循环单元格
  会显示为 `StdinNotImplementedError`，而不会挂起。

## 需要额外资源的课程（无额外资源时预计失败）
| 课程 | 额外要求 |
|--------|-------------------|
| 05 Agentic RAG | Azure AI Search（需 `AZURE_SEARCH_SERVICE_ENDPOINT`、密钥）— 有内存回退路径 |
| 11 MCP / GitHub | GitHub MCP 服务器 + PAT |
| 13 memory (cognee) | 配置了提供模型的 `cognee` |
| 15 browser-use | 安装 Playwright 浏览器（`playwright install`）+ `AZURE_OPENAI_CHAT_DEPLOYMENT_NAME` |
| 17 local agent | Foundry 本地运行时 + 已下载的 Qwen 模型（本地设备，无云端） |
| `*-dotnet-*` 笔记本 | .NET Interactive 内核（默认不包含，使用 `-IncludeDotnet`） |

## 报告反馈
汇总为按课程分组的通过/失败表格。将真正的回归
（代码/配置错误需修复）与环境缺失（缺少 Search/Foundry 本地/PAT）分开，
并为每个实际失败引用对应的失败 `log_*.txt` 文件。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->