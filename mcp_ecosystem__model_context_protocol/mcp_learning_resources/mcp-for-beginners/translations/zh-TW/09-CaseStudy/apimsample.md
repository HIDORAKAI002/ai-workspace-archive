# 個案研究：在 API 管理中以 MCP 伺服器身份公開 REST API

Azure API 管理是一項在您的 API 端點之上提供閘道的服務。其運作方式是 Azure API 管理扮演您的 API 之前的代理，可以決定如何處理進入的請求。

使用它，您可以新增許多功能，例如：

- **安全性**，您可以使用從 API 金鑰、JWT 到託管身份的所有方案。
- **速率限制**，強大的功能，可決定每個時間單位允許通過多少次呼叫。這有助於確保所有用戶都有良好的體驗，也能防止您的服務被大量請求淹沒。
- **擴展與負載平衡**。您可以設定多個端點以平衡負載，也可以決定如何進行「負載平衡」。
- **AI 功能，如語義快取、令牌限制與令牌監控等**。這些都是提升反應速度及幫助您掌握令牌花費的優秀功能。 [請參閱詳細資訊](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)。

## 為何選擇 MCP + Azure API 管理？

模型上下文協定（Model Context Protocol, MCP）正迅速成為代理 AI 應用程式以及一致性公開工具與資料的標準。Azure API 管理是需要「管理」API 時的自然選擇。MCP 伺服器常跟其他 API 整合，以例如解決請求到某工具。因此結合 Azure API 管理與 MCP 十分合理。

## 概覽

在此特定案例中，我們將學習如何以 MCP 伺服器身份公開 API 端點。藉此，我們能輕鬆將這些端點變成代理應用的一部分，同時利用 Azure API 管理的功能。

## 主要功能

- 您可選擇想作為工具公開的端點方法。
- 您獲得的額外功能取決於 API 的政策區段中設定的內容。但這裡我們將示範如何新增速率限制。

## 前置步驟：匯入 API

如果您在 Azure API 管理已有 API，則可跳過此步驟。若無，請參考此連結，[將 API 匯入 Azure API 管理](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)。

## 以 MCP 伺服器公開 API

公開 API 端點，請按照以下步驟進行：

1. 前往 Azure 入口網站，地址為 <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
   瀏覽至您的 API 管理實例。

1. 在左側選單中，選擇 APIs > MCP Servers > + 建立新的 MCP 伺服器。

1. 在 API 選擇要公開為 MCP 伺服器的 REST API。

1. 選擇一個或多個 API 操作作為工具公開。您可以選擇全數操作或僅特定操作。

    ![Select methods to expose](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. 選擇 **建立**。

1. 瀏覽至選單項目 **APIs** 和 **MCP Servers**，您應該看到以下畫面：

    ![See the MCP Server in the main pane](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP 伺服器已建立，且 API 操作公開為工具。MCP 伺服器列在 MCP Servers 面板。URL 欄位顯示 MCP 伺服器的端點，可供測試或用於客戶端應用程式。

## 選擇性步驟：設定政策

Azure API 管理有一核心概念是政策，您可在此為端點設置不同規則，像是速率限制或語義快取。這些政策是以 XML 編寫。

以下示範如何設定政策來對 MCP 伺服器進行速率限制：

1. 在入口網站的 APIs 下，選擇 **MCP Servers**。

1. 選擇您建立的 MCP 伺服器。

1. 在左側選單中，MCP 下，點選 **Policies**。

1. 在政策編輯器中，新增或編輯您想套用到 MCP 伺服器工具的政策。政策以 XML 格式定義。例如，您可新增一條政策限制調用 MCP 伺服器工具的次數（此示例每個用戶端 IP 地址每 30 秒限 5 次調用）。以下是造成速率限制的 XML：

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    以下是政策編輯器畫面：

    ![Policy editor](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## 試用看看

讓我們確保 MCP 伺服器正常運作。

為此，我們將使用 Visual Studio Code 與 GitHub Copilot 的代理模式。我們會將 MCP 伺服器加入 *mcp.json*，這樣 Visual Studio Code 就能作為具有代理功能的客戶端，最終用戶能夠輸入提示詞並與該伺服器互動。

以下示範如何在 Visual Studio Code 中新增 MCP 伺服器：

1. 使用 MCP：從命令面板執行 **Add Server** 指令。

1. 提示時，選擇伺服器類型：**HTTP (HTTP 或 Server Sent Events)**。

1. 輸入 Azure API 管理中 MCP 伺服器的 URL。例如：**https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse**（SSE 端點）或 **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp**（MCP 端點），注意傳輸方式的差異是 `/sse` 或 `/mcp`。

1. 輸入您選擇的伺服器 ID。這不是重要值，但有助於您記憶此伺服器實例。

1. 選擇要將設定儲存至工作區設定或使用者設定。

  - **工作區設定** - 伺服器設定將儲存至目前工作區的 .vscode/mcp.json 檔案中。

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    若選擇串流 HTTP 傳輸則稍有不同：

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **使用者設定** - 伺服器設定會加入全域 *settings.json* 檔並適用於所有工作區。設定類似以下格式：

    ![User setting](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. 您還需要新增設定，加入標頭以確保正確驗證至 Azure API 管理。它使用一個名為 **Ocp-Apim-Subscription-Key* 的標頭。
   
    - 以下示範如何加入至設定：

    ![Adding header for authentication](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)，這將會出現提示要求您輸入 API 金鑰值，可於 Azure 入口網站中找尋您的 Azure API 管理實例。

   - 若要改為加入至 *mcp.json*，可如此編輯：

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

### 使用代理模式

現在無論是在設定裡還是 *.vscode/mcp.json* 中都已設定完畢，讓我們試試看。

應會看到像這樣的工具圖示，列出您伺服器公開的工具：

![Tools from the server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. 點擊工具圖示，您應會看到如以下的工具清單：

    ![Tools](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. 在聊天框中輸入提示以調用工具。例如，如果您選擇過工具查詢訂單資訊，可以向代理詢問訂單。以下是一個範例提示：

    ```text
    get information from order 2
    ```

    接著會顯示工具圖示，詢問您是否執行工具。選擇繼續執行該工具，您應會看到如下輸出：

    ![Result from prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **上方所見內容取決於您設定的工具，但概念是您會收到像上述的文字回應**


## 參考資料

以下是您可以進一步了解的資源：

- [有關 Azure API 管理與 MCP 的教學](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python 範例：使用 Azure API 管理安全遠端 MCP 伺服器（實驗性）](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP 用戶端授權實驗室](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [使用 Azure API 管理 VS Code 延伸功能匯入與管理 API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [在 Azure API Center 註冊與探索遠端 MCP 伺服器](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) 出色的資源庫，展示許多與 Azure API 管理整合的 AI 功能
- [AI Gateway 工作坊](https://azure-samples.github.io/AI-Gateway/) 包含使用 Azure 入口網站的工作坊，這是評估 AI 功能的極佳起點。

## 接著做什麼

- 返回：[案例研究總覽](./README.md)
- 下一步：[Azure AI 旅遊代理](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們致力於確保準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原文的原始語言版本應被視為權威來源。如涉及重要資訊，建議尋求專業人工翻譯。我們對因使用此翻譯而產生的任何誤解或誤判概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->