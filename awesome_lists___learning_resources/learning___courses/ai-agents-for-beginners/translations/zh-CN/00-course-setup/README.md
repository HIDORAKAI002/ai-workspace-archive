# 课程设置

## 介绍

本课程将介绍如何运行本课程的代码示例。

## 加入其他学习者并获取帮助

在开始克隆您的代码库之前，请加入 [AI Agents For Beginners Discord 频道](https://aka.ms/ai-agents/discord)，以获取任何安装帮助、课程相关问题的解答，或与其他学习者交流。

## 克隆或 Fork 本仓库

开始之前，请克隆或 Fork GitHub 仓库。这将为您创建本课程资料的个人版本，以便您可以运行、测试和调整代码！

您可以点击链接 <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">Fork 本仓库</a> 来完成此操作

您现在应该已经获得了本课程的 Fork 版本，链接如下：

![Forked Repo](../../../translated_images/zh-CN/forked-repo.33f27ca1901baa6a.webp)

### 浅层克隆（推荐用于研讨会 / Codespaces）

  > 当您下载完整历史和所有文件时，整个仓库可能非常大（约3 GB）。如果您只参加研讨会或只需要部分课程文件夹，浅层克隆（或稀疏克隆）通过截断历史记录和/或跳过 blobs 来避免大部分下载。

#### 快速浅层克隆 — 最小历史记录，所有文件

请将下面命令中的 `<your-username>` 替换为您的 Fork URL（或您偏好的上游 URL）。

仅克隆最新提交历史（下载量小）：

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

克隆指定分支：

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### 部分（稀疏）克隆 — 最小 blobs + 仅选择的文件夹

使用部分克隆和稀疏检出（需要 Git 2.25+，推荐使用支持部分克隆的现代 Git）：

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

进入仓库文件夹：

```bash|powershell
cd ai-agents-for-beginners
```

然后指定您需要的文件夹（下面示例显示了两个文件夹）：

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

克隆并验证文件后，如果您只需要文件且想释放空间（无 git 历史），请删除仓库元数据（💀不可恢复 —— 这样您将失去所有 Git 功能：无法提交、拉取、推送或访问历史）。

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### 使用 GitHub Codespaces（推荐，避免本地大文件下载）

- 通过 [GitHub UI](https://github.com/codespaces) 为本仓库创建新的 Codespace。  

- 在新建 Codespace 的终端中，运行上面的浅层/稀疏克隆命令，将所需课程文件夹带入 Codespace 工作区。
- 可选操作：在 Codespaces 内克隆后，删除 .git 以释放额外空间（参考上文删除命令）。
- 注意：如果您想直接在 Codespaces 中打开仓库（不另外克隆），需要注意 Codespaces 会构建 devcontainer 环境，可能仍会配置超出您需要的内容。在新建 Codespace 内克隆浅拷贝，可让您更好地控制磁盘使用。

#### 提示

- 如果您需要编辑/提交，一定要把克隆 URL 替换为您的 Fork。
- 如果之后需要更多历史或文件，可以拉取它们或调整稀疏检出以包含更多文件夹。

## 运行代码

本课程提供一系列 Jupyter 笔记本，您可以运行它们以获得构建 AI 代理的实践经验。

代码示例使用 **Microsoft Agent Framework (MAF)** 和 `FoundryChatClient`，通过 **Microsoft Foundry** 连接到 **Microsoft Foundry Agent Service V2**（即 Responses API）。

所有的 Python 笔记本文件标注为 `*-python-agent-framework.ipynb`。

## 需求

- Python 3.12 及以上版本
  - <strong>注意</strong>：如果您未安装 Python3.12，请确保安装它。然后用 python3.12 创建虚拟环境以确保 requirements.txt 中的正确版本被安装。
  
    >示例

    创建 Python 虚拟环境目录：

    ```bash|powershell
    python -m venv venv
    ```

    然后激活虚拟环境：

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10 及以上版本: 对于使用 .NET 的示例代码，确保安装了 [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) 及以上版本，然后检查已安装的 .NET SDK 版本：

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — 认证所需。可从 [aka.ms/installazurecli](https://aka.ms/installazurecli) 安装。
- **Azure 订阅** — 访问 Microsoft Foundry 和 Microsoft Foundry Agent Service 所需。
- **Microsoft Foundry 项目** — 需要有部署模型的项目（例如 `gpt-4.1-mini`）。见下方 [步骤 1](#步骤-1：创建-microsoft-foundry-项目)。

本仓库根目录中包含了一个 `requirements.txt` 文件，列出了运行代码示例所需的所有 Python 包。

您可以在仓库根目录的终端运行以下命令安装它们：

```bash|powershell
pip install -r requirements.txt
```

我们建议您创建 Python 虚拟环境，以避免任何冲突和问题。

## 设置 VSCode

确保在 VSCode 中使用的是正确版本的 Python。

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## 设置 Microsoft Foundry 和 Microsoft Foundry Agent Service

### 步骤 1：创建 Microsoft Foundry 项目

要运行笔记本，您需要一个 Microsoft Foundry **hub** 和 **project**，且项目中已有部署模型。

1. 访问 [ai.azure.com](https://ai.azure.com) 并使用 Azure 账号登录。
2. 创建一个 **hub**（或使用已有的）。详情见：[Hub 资源概述](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources)。
3. 在 hub 内创建一个 <strong>项目</strong>。
4. 从 **模型 + 端点** → <strong>部署模型</strong> 部署一个模型（例如 `gpt-4.1-mini`）。

### 步骤 2：获取项目端点和模型部署名称

在 Microsoft Foundry 门户中的项目：

- <strong>项目端点</strong> — 进入 <strong>概览</strong> 页面并复制端点 URL。

![Project Connection String](../../../translated_images/zh-CN/project-endpoint.8cf04c9975bbfbf1.webp)

- <strong>模型部署名称</strong> — 前往 **模型 + 端点**，选择已部署模型，记下 <strong>部署名称</strong>（例如 `gpt-4.1-mini`）。

### 步骤 3：使用 `az login` 登录 Azure

所有笔记本都使用 **`AzureCliCredential`** 进行认证 — 无需管理 API 密钥，但需通过 Azure CLI 登录。

1. **如果尚未安装 Azure CLI**，请安装： [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. <strong>登录</strong>，运行：

    ```bash|powershell
    az login
    ```

    如果您处于无浏览器的远程/Codespace 环境：

    ```bash|powershell
    az login --use-device-code
    ```

3. 如果系统提示，<strong>选择订阅</strong> — 选中包含 Foundry 项目的那个订阅。

4. <strong>确认登录状态</strong>：

    ```bash|powershell
    az account show
    ```

> **为什么需要 `az login`？** 这些笔记本使用 `azure-identity` 包中的 `AzureCliCredential` 进行认证。这意味着您的 Azure CLI 会话提供凭据 — `.env` 文件中无需 API 密钥或密匙 这是一种[安全最佳实践](https://learn.microsoft.com/azure/developer/ai/keyless-connections)。

### 步骤 4：创建您的 `.env` 文件

复制示例文件：

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

打开 `.env` 并填写以下两个值：

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| 变量 | 获取位置 |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry 门户 → 您的项目 → <strong>概览</strong> 页面 |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry 门户 → **模型 + 端点** → 已部署模型的名称 |

大部分课程就此准备完毕！笔记本将自动通过您的 `az login` 会话进行认证。

### 步骤 5：安装 Python 依赖包

```bash|powershell
pip install -r requirements.txt
```

推荐在您之前创建的虚拟环境内运行此命令。

## 第 5 课（Agentic RAG）的额外设置

第 5 课使用了 **Azure AI Search** 进行增强检索。如果您打算运行该课，请将以下变量添加到您的 `.env` 文件：

| 变量 | 获取位置 |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure 门户 → 您的 **Azure AI Search** 资源 → <strong>概览</strong> → URL |
| `AZURE_SEARCH_API_KEY` | Azure 门户 → 您的 **Azure AI Search** 资源 → <strong>设置</strong> → <strong>密钥</strong> → 主管理密钥 |

## 直接调用 Azure OpenAI 的课程额外设置（第 6 和 8 课）

部分第 6 和 8 课的笔记本直接调用 **Azure OpenAI**（使用 **Responses API**），而不是通过 Microsoft Foundry 项目。这些示例之前使用 GitHub 模型，现已弃用（将于2026年7月退休），且不支持 Responses API。如果您打算运行这些示例，请将以下变量添加到 `.env` 文件：

| 变量 | 获取位置 |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure 门户 → 您的 **Azure OpenAI** 资源 → <strong>密钥与端点</strong> → 端点（例如 `https://<your-resource>.openai.azure.com`） |
| `AZURE_OPENAI_DEPLOYMENT` | 您部署模型的名称（例如 `gpt-4.1-mini`），支持 Responses API |
| `AZURE_OPENAI_API_KEY` | 可选 — 仅当您使用基于密钥的认证而非 `az login` / Entra ID 时填写 |

> Responses API 使用稳定的 `/openai/v1/` 端点，无需 `api-version` 参数。通过 `az login` 登录，即可使用无密钥 Entra ID 认证。

## 替代提供商：MiniMax（兼容 OpenAI）

[MiniMax](https://platform.minimaxi.com/) 提供大上下文模型（最多 204K 令牌）通过兼容 OpenAI 的 API。由于 Microsoft Agent Framework 的 `OpenAIChatClient` 兼容任何 OpenAI 兼容端点，您可以将 MiniMax 作为 Azure OpenAI 或 OpenAI 的替代方案直接使用。

将以下变量添加到您的 `.env` 文件：

| 变量 | 获取位置 |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax 平台](https://platform.minimaxi.com/) → API 密钥 |
| `MINIMAX_BASE_URL` | 使用默认值 `https://api.minimax.io/v1` |
| `MINIMAX_MODEL_ID` | 使用的模型名称（例如 `MiniMax-M3`） |

<strong>示例模型</strong>：`MiniMax-M3`（推荐）、`MiniMax-M2.7`、`MiniMax-M2.7-highspeed`（响应更快）。模型名称和可用性会随着时间变化，且某些模型的访问权限取决于您的账户或地区 — 请查看 [MiniMax 平台](https://platform.minimaxi.com/) 获取最新列表。如果您无法访问 `MiniMax-M3`，请将 `MINIMAX_MODEL_ID` 设置为您能访问的模型（如 `MiniMax-M2.7`）。

使用 `OpenAIChatClient` 的代码示例（如第 14 课酒店预订工作流）将在检测到 `MINIMAX_API_KEY` 被设置时自动使用 MiniMax 配置。

## 替代提供商：Foundry Local（本地运行模型）

[Foundry Local](https://foundrylocal.ai) 是一个轻量级运行时，通过兼容 OpenAI 的 API，将语言模型<strong>完全在您自己的机器上</strong>下载、管理和提供服务 — 无需云服务、无 Azure 订阅、无 API 密钥。非常适合离线开发、无云成本实验或本地数据存储。

由于 Microsoft Agent Framework 的 `OpenAIChatClient` 兼容任何 OpenAI 兼容端点，Foundry Local 是 Azure OpenAI 的一个本地替代方案。

**1. 安装 Foundry Local**

```bash
# Windows 系统
winget install Microsoft.FoundryLocal

# macOS 系统
brew install foundrylocal
```

**2. 下载并运行模型**（这也会启动本地服务）：

```bash
foundry model list          # 查看可用模型
foundry model run phi-4-mini
```

**3. 安装用于发现本地端点的 Python SDK：**

```bash
pip install foundry-local-sdk
```

**4. 将 Microsoft Agent Framework 指向您的本地模型：**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# 下载（如果需要）并在本地提供模型服务，然后发现端点/端口。
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # 例如 http://localhost:<port>/v1
    api_key=manager.api_key,        # 对于 Foundry Local 始终为“not-required”
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **注意：** Foundry Local 提供 OpenAI 兼容的 <strong>聊天补全</strong> 端点。适合本地开发和离线场景。要使用完整的 **Responses API** 功能（有状态对话、深度工具编排和代理式开发），请使用 **Azure OpenAI** 或课程中演示的 **Microsoft Foundry** 项目。详情请参阅 [Foundry Local 文档](https://foundrylocal.ai) 了解当前模型目录和平台支持。


## 课程8的额外设置（Bing 绑定工作流）

课程8中的条件工作流笔记本使用了通过 Microsoft Foundry 的<strong>Bing 绑定</strong>。如果你计划运行该示例，请将此变量添加到你的 `.env` 文件中：

| 变量 | 位置 |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry 门户 → 你的项目 → <strong>管理</strong> → <strong>已连接资源</strong> → 你的 Bing 连接 → 复制连接 ID |

## 故障排除

### macOS 上的 SSL 证书验证错误

如果你在 macOS 遇到了如下错误：

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

这是 macOS 上 Python 已知的问题，系统 SSL 证书默认没有被自动信任。请依次尝试以下解决方案：

**选项 1：运行 Python 的安装证书脚本（推荐）**

```bash
# 将3.XX替换为您安装的Python版本（例如，3.12或3.13）：
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**选项 2：在笔记本中使用 `connection_verify=False` （仅限 GitHub Models 笔记本）**

在课程6的笔记本（`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`）中，已经包含了此解决方法的注释代码。创建客户端时取消注释 `connection_verify=False`：

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # 如果遇到证书错误，请禁用 SSL 验证
)
```

> **⚠️ 警告：** 禁用 SSL 验证 (`connection_verify=False`) 通过跳过证书校验降低了安全性。仅作为开发环境中的临时解决办法，绝不要在生产环境使用。

**选项 3：安装并使用 `truststore`**

```bash
pip install truststore
```

然后在你的笔记本或脚本顶部，在进行任何网络调用之前添加以下内容：

```python
import truststore
truststore.inject_into_ssl()
```

## 卡住了吗？

如果你在运行此设置时遇到任何问题，请加入我们的 <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI 社区 Discord</a> 或 <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">创建一个问题</a>。

## 下一课

你现在已经准备好运行本课程的代码了。祝你在 AI 代理的世界中学习愉快！

[AI 代理介绍及代理用例](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->