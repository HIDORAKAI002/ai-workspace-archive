# 案例研究：在 API 管理中以 MCP 服务器方式暴露 REST API

Azure API Management 是一项服务，可在您的 API 端点之上提供网关。其工作原理是，Azure API Management 充当您 API 之前的代理，可决定如何处理传入请求。

使用它，您可以添加一系列功能，例如：

- **安全性**，您可以使用从 API 密钥、JWT 到托管身份的各种认证方式。
- **速率限制**，一个很棒的功能是能够决定在一定时间单位内允许多少调用通过。这有助于确保所有用户获得良好的体验，同时防止您的服务因请求过多而不堪重负。
- **扩展与负载均衡**。您可以设置多个端点以均衡负载，并且还可以决定如何“负载均衡”。
- **AI 功能，如语义缓存、令牌限制和令牌监控等**。这些都是提升响应速度并帮助您控制令牌消耗的绝佳功能。[详细阅读](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)。

## 为什么选择 MCP + Azure API Management？

Model Context Protocol 正迅速成为智慧型 AI 应用的标准，用于一致地暴露工具和数据。当需要“管理”API 时，Azure API Management 是理所当然的选择。MCP 服务器通常与其他 API 集成，以解决请求到某工具。因此结合 Azure API Management 和 MCP 十分合理。

## 概述

在此具体用例中，我们将学习如何将 API 端点作为 MCP 服务器暴露。这样，我们不仅可以轻松将这些端点作为智慧型应用的一部分，还能利用 Azure API Management 的各项功能。

## 主要功能

- 您可选择希望暴露为工具的端点方法。
- 获得的附加功能取决于您在 API 的策略部分配置的内容。在此，我们将展示如何添加速率限制。

## 预备步骤：导入 API

如果您已经在 Azure API Management 中有 API，则可以跳过此步骤。否则，请查看此链接，[将 API 导入 Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)。

## 将 API 作为 MCP 服务器暴露

要暴露 API 端点，请按以下步骤操作：

1. 进入 Azure 门户，访问地址 <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>，导航至您的 API Management 实例。

1. 在左侧菜单选择 APIs > MCP Servers > + 创建新的 MCP 服务器。

1. 在 API 中，选择一个 REST API 以暴露为 MCP 服务器。

1. 选择一个或多个 API 操作作为工具暴露。您可以选择所有操作，也可以只选择特定操作。

    ![选择要暴露的方法](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. 选择 **创建**。

1. 导航至菜单选项 **APIs** 和 **MCP Servers**，您应该看到如下内容：

    ![在主窗格中查看 MCP 服务器](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP 服务器已创建，并且 API 操作作为工具暴露。MCP 服务器列在 MCP Servers 窗格中。URL 列显示您可以调用的 MCP 服务器端点，用于测试或客户端应用。

## 可选：配置策略

Azure API Management 有一个核心概念叫做策略，您可以为端点设置不同规则，如速率限制或语义缓存。这些策略以 XML 编写。

以下示例展示如何设置策略来对 MCP 服务器进行速率限制：

1. 在门户中的 APIs 下，选择 **MCP Servers**。

1. 选择您创建的 MCP 服务器。

1. 在左侧菜单中，MCP 下选择 **Policies**。

1. 在策略编辑器中，添加或编辑您想应用到 MCP 服务器工具的策略。策略以 XML 格式定义。例如，您可以添加一个策略限制每个客户端 IP 地址对 MCP 服务器工具的调用次数（本示例为每 30 秒最多 5 次调用）。以下是实现此速率限制的 XML：

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```


    以下为策略编辑器截图：

    ![策略编辑器](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)

## 试用

让我们确保 MCP 服务器按预期工作。

为此，我们将使用 Visual Studio Code 和 GitHub Copilot 及其 Agent 模式。我们将将 MCP 服务器添加到 *mcp.json* 中。通过此操作，Visual Studio Code 将作为具备智能的客户端，最终用户可以输入提示并与该服务器交互。

来看如何在 Visual Studio Code 中添加 MCP 服务器：

1. 从命令面板使用 MCP: **添加服务器命令**。

1. 提示时，选择服务器类型：**HTTP (HTTP 或 Server Sent Events)**。

1. 输入 Azure API Management 中 MCP 服务器的 URL。例如：**https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse**（SSE 端点）或 **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp**（MCP 端点），注意传输方式的差异是 `/sse` 或 `/mcp`。

1. 输入您选择的服务器 ID。这个值不重要，但有助于您记住该服务器实例。

1. 选择是否将配置保存到工作区设置或用户设置。

  - **工作区设置** — 服务器配置保存到当前工作区内的 .vscode/mcp.json 文件中。

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```


    如果您选择流式 HTTP 作为传输，内容会稍有不同：

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```


  - **用户设置** — 服务器配置添加到全局 *settings.json* 文件，所有工作区均可使用。配置示例如下：

    ![用户设置](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. 您还需添加配置，即一个用于向 Azure API Management 正确认证的请求头。它使用名为 **Ocp-Apim-Subscription-Key** 的请求头。

    - 您可以这样添加到设置：

    ![添加认证请求头](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)，随后会弹出提示要求您输入 API 密钥，您可在 Azure 门户中对应的 Azure API Management 实例获取此密钥。

   - 如果要添加到 *mcp.json*，可以这样写：

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```


### 使用 Agent 模式

现在无论是在设置还是 *.vscode/mcp.json* 中都配置好后，来试用一下。

您应该能看到一个工具图标，里面列出了您服务器暴露的工具：

![服务器工具](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. 点击工具图标，您将看到工具列表：

    ![工具列表](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. 在聊天窗口输入提示以调用工具。例如，如果您选择了一个用于查询订单信息的工具，可向智能代理询问订单。示例提示：

    ```text
    get information from order 2
    ```


    您将看到一个工具图标提示您继续调用工具。选择继续执行工具后，您应能看到如下输出：

    ![提示结果](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **以上显示结果取决于您设置的工具，基本想法是获得类似的文字响应。**


## 参考资料

您可以通过以下链接了解更多内容：

- [Azure API Management 和 MCP 教程](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python 示例：使用 Azure API Management 保护远程 MCP 服务器（实验性）](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP 客户端授权实验](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [使用 Azure API Management VS Code 扩展导入和管理 API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [在 Azure API Center 注册和发现远程 MCP 服务器](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) 极佳的仓库，展示了许多 Azure API Management 的 AI 功能
- [AI Gateway 研讨会](https://azure-samples.github.io/AI-Gateway/) 包含使用 Azure 门户的研讨会，是评估 AI 功能的绝佳起点。

## 后续内容

- 返回：[案例研究总览](./README.md)
- 下一步：[Azure AI 旅行代理](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文件使用人工智能翻译服务[Co-op Translator](https://github.com/Azure/co-op-translator)进行翻译。尽管我们力求准确，但请注意自动翻译可能存在错误或不准确之处。请以原文为权威版本。如涉及重要信息，建议采用专业人工翻译。对于因使用本翻译而引起的任何误解或错误解释，我们概不负责。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->