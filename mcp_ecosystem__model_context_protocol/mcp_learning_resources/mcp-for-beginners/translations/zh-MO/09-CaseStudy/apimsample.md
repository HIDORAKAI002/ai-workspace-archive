# 個案研究：在 API 管理中將 REST API 作為 MCP 伺服器公開

Azure API 管理是一項在您的 API 端點之上提供閘道的服務。其運作方式是 Azure API 管理充當 API 的代理，並可決定如何處理進來的請求。

透過使用它，您可以新增一整套功能，例如：

- **安全性**，您可以使用從 API 金鑰、JWT 到受管理的身分識別等所有方式。
- **速率限制**，一個很棒的功能是能夠決定每個特定時間單位內允許通過多少呼叫。這有助於確保所有使用者都有良好的體驗，且您的服務不會因請求過多而超載。
- **擴展與負載平衡**。您可以設定多個端點以分散負載，也可以決定如何「負載平衡」。
- **AI 功能如語義快取**、令牌限制與令牌監控等。這些是改善回應速度並幫助您掌握令牌花費的優秀功能。[在此閱讀更多](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities)。

## 為何選擇 MCP + Azure API 管理？

模型上下文協定（Model Context Protocol）正迅速成為代理式 AI 應用程式和以一致方式公開工具及資料的標準。當您需要「管理」API 時，Azure API 管理是自然的選擇。MCP 伺服器通常會整合其他 API 來將請求解決到工具上。因此結合 Azure API 管理和 MCP 有很大的意義。

## 總覽

在這個特定的用例中，我們將學習如何將 API 端點公開為 MCP 伺服器。透過這樣做，我們可以輕鬆地將這些端點整合成代理式應用程式的一部分，同時也利用 Azure API 管理的功能。

## 主要功能

- 您可選擇希望公開為工具的端點方法。
- 您所獲得的額外功能取決於您在 API 的政策(policy)區段配置的內容。但這裡會示範如何加入速率限制。

## 預備步驟：匯入 API

如果您已在 Azure API 管理中有 API，則可以跳過此步驟。若沒有，請參考此鏈結，[將 API 匯入 Azure API 管理](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api)。

## 將 API 公開為 MCP 伺服器

要公開 API 端點，請依照以下步驟：

1. 前往 Azure 入口網站並訪問以下地址 <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
   導覽到您的 API 管理解決方案。

1. 在左側選單中，選擇 APIs > MCP Servers > + 建立新的 MCP 伺服器。

1. 在 API 中，選擇一個 REST API 並將其公開為 MCP 伺服器。

1. 選擇一個或多個 API 操作要公開為工具。您可以選擇全部操作或僅特定操作。

    ![選擇要公開的方法](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. 按下 **建立**。

1. 導覽到選單中的 **APIs** 和 **MCP Servers**，您應該會看到以下介面：

    ![在主面板中看到 MCP 伺服器](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP 伺服器已建立，API 操作將作為工具公開。MCP 伺服器會列在 MCP Servers 窗格中。URL 欄位顯示 MCP 伺服器的端點，您可以用它進行測試或在用戶端應用程式中呼叫。

## 選用：設定政策

Azure API 管理的核心概念之一是政策，您可以設定多種規則到您的端點，例如速率限制或語義快取。這些政策是以 XML 格式撰寫。

這裡說明如何設定政策來限制 MCP 伺服器的速率：

1. 在入口網站中，於 APIs 下選擇 **MCP Servers**。

1. 選擇您建立的 MCP 伺服器。

1. 在左側選單中，於 MCP 下選擇 **Policies**。

1. 在政策編輯器中，新增或編輯要套用到 MCP 伺服器工具的政策。政策以 XML 格式定義。例如，您可以新增政策限制對 MCP 伺服器工具的呼叫（在此範例中為每 30 秒每個客戶端 IP 限制 5 次呼叫）。以下為會造成速率限制的 XML：

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    以下為政策編輯器的截圖：

    ![政策編輯器](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## 試用

讓我們確認 MCP 伺服器是否按預期運作。

為此，我們將使用 Visual Studio Code 及 GitHub Copilot 的代理模式。會將 MCP 伺服器加入一個 *mcp.json* 設定中。透過如此一來，Visual Studio Code 就會作為具備代理功能的用戶端，最終使用者可輸入提示並與該伺服器互動。

以下是如何在 Visual Studio Code 中加入 MCP 伺服器：

1. 使用命令面板中的 MCP: **Add Server 指令**。

1. 被提示時，選擇伺服器類型：**HTTP (HTTP 或 Server Sent Events)**。

1. 輸入 API 管理中 MCP 伺服器的 URL，範例：**https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse**（SSE 端點）或 **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp**（MCP 端點），差異在於傳輸路徑為 `/sse` 或 `/mcp`。

1. 輸入您選擇的伺服器 ID。這不是重要的值，但有助於您記憶此伺服器實例。

1. 選擇是否將設定儲存到工作區設定或使用者設定。

  - **工作區設定** — 伺服器設定會儲存至當前工作區僅可用的 .vscode/mcp.json 檔案。

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    或者若您選擇以串流 HTTP 作為傳輸，則有些微差異：

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **使用者設定** — 伺服器設定會加入全球性的 *settings.json* 檔案，並在所有工作區中可用。設定如下範例：

    ![使用者設定](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. 您也需要新增設定，加入標頭以確保能正確驗證至 Azure API 管理。它使用名為 **Ocp-Apim-Subscription-Key** 的標頭。

    - 以下為如何將其新增到設定中：

    ![新增驗證標頭](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png)，此動作將顯示提示要求您輸入 API 金鑰，該金鑰可在您的 Azure API 管理實例的 Azure 入口網站中找到。

   - 若要將它新增到 *mcp.json*，可以如下加入：

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

現在我們已在設定中或 *.vscode/mcp.json* 中完成設定。讓我們試試看。

應會有一個工具圖示，如下所示，列出您伺服器暴露的工具：

![伺服器工具](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. 點擊工具圖示，您應該會看到工具清單，如下：

    ![工具](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. 在聊天視窗輸入提示以呼叫工具。例如，若您選擇的是查詢訂單資訊的工具，則可向代理詢問訂單資訊。以下為提示範例：

    ```text
    get information from order 2
    ```

    接著您將看到工具圖示提示是否繼續呼叫工具。選擇繼續執行工具，您將看到類似的輸出結果：

    ![提示結果](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **您看到的結果依您設定的工具而異，但理念是您會得到上述形式的文字回應**


## 參考資料

您可以從以下資源深入了解：

- [Azure API 管理與 MCP 的教學](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python 範例：使用 Azure API 管理保護遠程 MCP 伺服器（實驗性）](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP 用戶端授權實驗室](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [使用 Azure API 管理 VS Code 延伸功能來匯入及管理 API](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [在 Azure API Center 註冊並發現遠端 MCP 伺服器](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) 優秀的資源庫展示多項 Azure API 管理的 AI 功能
- [AI Gateway 工作坊](https://azure-samples.github.io/AI-Gateway/) 包含使用 Azure 入口網站的工作坊，是開始評估 AI 功能的絕佳途徑。

## 下一步

- 返回：[案例研究總覽](./README.md)
- 下一章：[Azure AI 旅遊代理](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件乃使用人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。雖然我們致力於確保準確性，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件之母語版本應被視為權威來源。對於重要資訊，建議聘請專業人工翻譯。本公司概不對因使用此翻譯所引致之任何誤解或誤譯負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->