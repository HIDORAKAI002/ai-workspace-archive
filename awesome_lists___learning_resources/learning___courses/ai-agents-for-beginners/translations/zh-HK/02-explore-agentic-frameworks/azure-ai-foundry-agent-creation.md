# Azure AI Agent 服務開發

在此練習中，你會使用 [Microsoft Foundry 入口網站](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) 的 Azure AI Agent 服務工具來建立一個航班預訂代理。該代理能與使用者互動並提供航班資訊。

## 先決條件

要完成此練習，你需要以下項目：
1. 一個具有有效訂閱的 Azure 帳戶。 [免費建立帳戶](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. 你需要權限以建立 Microsoft Foundry hub 或由他人為你建立一個。
    - 如果你的角色是 Contributor 或 Owner，你可以按照本教學中的步驟。

## 建立 Microsoft Foundry hub

> **注意：** Microsoft Foundry 之前稱為 Azure AI Studio。

1. 根據此 [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) 部落格文章中的指引建立 Microsoft Foundry hub.
2. 當你的專案建立後，關閉所有顯示的提示，然後檢視 Microsoft Foundry 入口網站上的專案頁面，應該會與以下圖片相似：

    ![Microsoft Foundry 專案](../../../translated_images/zh-HK/azure-ai-foundry.88d0c35298348c2f.webp)

## 部署模型

1. 在專案左側窗格的 **My assets** 區段，選取 **Models + endpoints** 頁面。
2. 在 **Models + endpoints** 頁面，於 **Model deployments** 標籤，從 **+ Deploy model** 選單選擇 **Deploy base model**。
3. 在清單中搜尋 `gpt-4o-mini` 模型，然後選取並確認它。

    > **注意**：降低 TPM 有助於避免超出你所使用訂閱的配額。

    ![已部署的模型](../../../translated_images/zh-HK/model-deployment.3749c53fb81e18fd.webp)

## 建立代理

現在已部署模型，你可以建立一個代理。代理是一個可用來與使用者互動的對話式 AI 模型。

1. 在專案左側窗格的 **Build & Customize** 區段，選取 **Agents** 頁面。
2. 按一下 **+ Create agent** 以建立新代理。於 **Agent Setup** 對話方塊下：
    - 輸入代理名稱，例如 `FlightAgent`。
    - 確保已選取你先前建立的 `gpt-4o-mini` 模型部署。
    - 依據你希望代理遵循的提示設定 **Instructions**。以下是一個範例：
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> 有關詳細提示，你可以查看 [此儲存庫](https://github.com/ShivamGoyal03/RoamMind) 以取得更多資訊。
    
> 此外，你可以新增 **Knowledge Base** 與 **Actions** 以增強代理的能力，提供更多資訊並根據使用者要求執行自動化任務。在此練習中，你可以跳過這些步驟。
    
![代理設定](../../../translated_images/zh-HK/agent-setup.9bbb8755bf5df672.webp)

3. 若要建立新的多 AI 代理，只需按 **New Agent**。新建立的代理將顯示在 Agents 頁面。

## 測試代理

建立代理後，你可以在 Microsoft Foundry 入口網站的 playground 中測試它，以查看它如何回應使用者查詢。

1. 在代理的 **Setup** 窗格頂部，選取 **Try in playground**。
2. 在 **Playground** 窗格中，你可以在聊天視窗輸入查詢與代理互動。例如，你可以要求代理搜尋 28 日從 Seattle 到 New York 的航班。

    > **注意**：代理可能不會提供準確的回應，因為本練習中沒有使用即時資料。其目的是測試代理根據所提供指示理解並回應使用者查詢的能力。

    ![代理 Playground](../../../translated_images/zh-HK/agent-playground.dc146586de715010.webp)

3. 測試代理後，你可以透過新增更多 intents、training data 與 actions 來進一步自訂以增強其能力。

## 清理資源

完成測試後，你可以刪除它以避免產生額外費用。
1. 開啟 [Azure 入口網站](https://portal.azure.com) 並檢視你在本練習中部署 hub 資源的資源群組內容。
2. 在工具列上，選取 **Delete resource group**。
3. 輸入資源群組名稱並確認要刪除。

## 資源

- [Microsoft Foundry 文件](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 入口網站](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio 入門](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 上的 AI 代理基礎](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
免責聲明：
本文件已透過 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意自動化翻譯可能包含錯誤或不準確之處。原始語言版本應視為具權威性的參考來源。對於重要或關鍵資訊，建議採用專業的人工作業翻譯。我們不就使用本翻譯而導致的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->