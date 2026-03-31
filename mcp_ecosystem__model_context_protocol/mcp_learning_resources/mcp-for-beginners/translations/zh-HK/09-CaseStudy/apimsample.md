# 案例研究：在 API 管理中以 MCP 伺服器形式公開 REST API

Azure API Management 是一項在您的 API 端點之上提供閘道的服務。它的運作方式是，Azure API Management 充當您 API 前端的代理，並可決定如何處理進來的請求。

使用此服務，您可新增一系列功能，例如：

- **安全性**，您可以使用從 API 金鑰、JWT 到受管身分識別等所有方式。
- **流量限制**，一個很棒的功能是能決定每個特定時間單位允許的呼叫數量。這有助確保所有使用者都享有良好體驗，也能避免您的服務被請求淹沒。
- **擴展與負載平衡**。您可以設定多個端點來分散負載，並且也能決定如何「負載平衡」。
- **AI 功能，如語義快取**、代幣限制及代幣監控等。這些都是能提升響應能力並幫助管理代幣消耗的優秀功能。[按此了解更多](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)。

## 為什麼選擇 MCP + Azure API Management？

Model Context Protocol 正快速成為 agentic AI 應用及如何一致地公開工具和資料的標準。在您需要「管理」API 時，Azure API Management 是自然的選擇。MCP 伺服器通常會整合其他 API 以解決工具請求。因此將 Azure API Management 與 MCP 結合非常合理。

## 概覽

在此特定使用案例中，我們將學習如何將 API 端點公開為 MCP 伺服器。透過此方法，我們可以輕鬆將這些端點納入 agentic 應用，同時也能利用 Azure API Management 的功能。

## 主要特點

- 您可選擇想公開為工具的端點方法。
- 額外功能取決於您在 API 政策區段所設定的內容，但這裡將示範如何新增流量限制。

## 預備步驟：匯入 API

如果您在 Azure API Management 已有 API，則可跳過此步驟。否則，請參考此連結：[將 API 匯入 Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)。

## 將 API 以 MCP 伺服器方式公開

將 API 端點公開，請依照以下步驟：

1. 前往 Azure 入口網站 <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
   進入您的 API 管理實例。

1. 在左側選單，選擇 APIs > MCP Servers > + Create new MCP Server。

1. 在 API 中，選擇一個 REST API 以公開為 MCP 伺服器。

1. 選擇一個或多個 API 操作以公開為工具。您可以選擇全部操作或只選特定操作。

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)

1. 選擇 **Create**。

1. 導航至功能表選項 **APIs** 和 **MCP Servers**，您將看到如下畫面：

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP 伺服器已建立，API 操作已公開為工具。MCP 伺服器會列在 MCP Servers 面板中。URL 欄位顯示 MCP 伺服器的端點，您可以用於測試或客戶端應用程式中呼叫。

## 選擇性：配置政策

Azure API Management 具有核心的政策概念，您可以為端點設定不同規則，如流量限制或語義快取。這些政策以 XML 格式撰寫。

以下示範如何設定政策，為 MCP 伺服器新增流量限制：

1. 在入口網站中，於 APIs 下選擇 **MCP Servers**。

1. 選擇您建立的 MCP 伺服器。

1. 在左側選單的 MCP 下，選擇 **Policies**。

1. 在政策編輯器中，新增或編輯您想套用於 MCP 伺服器工具的政策。政策以 XML 格式定義。例如，您可新增政策，限制 MCP 伺服器工具呼叫次數（此例為每個用戶端 IP 位址每 30 秒最多 5 次呼叫）。以下為會造成流量限制的 XML：

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    以下為政策編輯器畫面：

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)

## 試用

確保 MCP 伺服器正常運作。

這裡將使用 Visual Studio Code 及 GitHub Copilot 的 Agent 模式。我們將 MCP 伺服器新增到 *mcp.json*，如此一來，Visual Studio Code 將作為具 agent 功能的客戶端，最終使用者便可輸入提示語與該伺服器互動。

以下示範如何於 Visual Studio Code 新增 MCP 伺服器：

1. 使用指令面板的 MCP: **Add Server** 命令。

1. 出現提示時，選擇伺服器類型：**HTTP (HTTP 或 Server Sent Events)**。

1. 輸入 API 管理中的 MCP 伺服器 URL。範例：  
   **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse**（SSE 端點）或  
   **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp**（MCP 端點），請注意傳輸型態的差別是以 `/sse` 或 `/mcp` 後綴區分。

1. 輸入您選擇的伺服器 ID。此數值非必要，但可幫助您記憶該伺服器實例。

1. 選擇是將設定儲存至工作區設定或使用者設定。

  - **工作區設定** - 伺服器設定會儲存在工作區內的 .vscode/mcp.json 檔案中。

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    若您選擇串流 HTTP 方式，內容會略有不同：

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **使用者設定** - 伺服器設定會新增至您的全域 *settings.json*，並於所有工作區有效。設定內容類似如下：

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. 您還需新增設定，增加標頭以確保向 Azure API Management 進行正確驗證。此標頭名稱為 **Ocp-Apim-Subscription-Key**。

    - 您可以如下方式將其新增至設定：

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)，系統會提示您輸入 API 金鑰值，可於 Azure 入口網站的 Azure API Management 實例中找到。

   - 若想新增至 *mcp.json*，可透過如下方式：

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

設定完成後，無論是在設定檔或 *.vscode/mcp.json*，我們來試用看看。

應該會有一個類似下圖的工具圖示，呈列您從伺服器公開的工具：

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. 點擊工具圖示，將看到工具清單如下：

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. 在聊天框輸入提示語以調用工具。例如，若您選擇了查詢訂單資訊的工具，您可以向代理詢問訂單。以下為示範提示：

    ```text
    get information from order 2
    ```

    接著您會看到工具圖示，並提示是否繼續呼叫工具。選擇繼續執行工具，您應該會看到類似以下的輸出結果：

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **上述畫面將取決於您所設定的工具，不過概念是會取得如上所示的文字回應**

## 參考資料

以下為您深入了解的資源：

- [Azure API Management 與 MCP 教學](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python 範例：使用 Azure API Management 安全遠端 MCP 伺服器 (實驗性)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP 用戶端授權實驗室](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [使用 Azure API Management 擴充功能於 VS Code 匯入及管理 API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [在 Azure API Center 註冊並發現遠端 MCP 伺服器](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) 一個極佳的 Repo，展示許多 Azure API Management 的 AI 能力
- [AI Gateway 工作坊](https://azure-samples.github.io/AI-Gateway/) 包含使用 Azure 入口網站的工作坊，是開始評估 AI 能力的絕佳管道。

## 後續步驟

- 回到：[案例研究總覽](./README.md)
- 下一章：[Azure AI 旅遊代理](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保翻譯的準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件以其母語版本為權威來源。對於重要資訊，建議採用專業人工翻譯。本公司不對因使用此翻譯而引致的任何誤解或誤讀承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->