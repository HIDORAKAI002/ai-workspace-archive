# Microsoft Foundry 代理服務開發

在此練習中，您將使用 [Microsoft Foundry 門戶](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) 中的 Microsoft Foundry 代理服務工具，建立一個用於航班預訂的代理。該代理能夠與用戶互動並提供航班相關資訊。

## 先決條件

完成此練習，您需要以下條件：
1. 一個具有有效訂閱的 Azure 帳戶。 [免費建立帳戶](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)。
2. 您需要有權限建立 Microsoft Foundry 中樞，或請人為您建立。
    - 如果您的角色是「貢獻者」或「擁有者」，可以遵循本教程中的步驟。

## 建立 Microsoft Foundry 中樞

> **注意：** Microsoft Foundry 之前稱為 Azure AI Studio。

1. 請依照 [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) 部落格文章中的指引建立 Microsoft Foundry 中樞。
2. 建立專案後，關閉任何出現的提示，並在 Microsoft Foundry 門戶中檢視專案頁面，應與下圖相似：

    ![Microsoft Foundry Project](../../../translated_images/zh-MO/azure-ai-foundry.88d0c35298348c2f.webp)

## 部署模型

1. 在專案左側面板的 <strong>我的資產</strong> 區段中，選擇 **模型 + 端點** 頁面。
2. 在 **模型 + 端點** 頁面中的 <strong>模型部署</strong> 標籤下，於 **+ 部署模型** 選單中選擇 <strong>部署基礎模型</strong>。
3. 在清單中搜尋 `gpt-4.1-mini` 模型，然後選擇並確認。

    > <strong>注意</strong>：降低 TPM 有助於避免過度使用您訂閱中可用的配額。

    ![Model Deployed](../../../translated_images/zh-MO/model-deployment.3749c53fb81e18fd.webp)

## 建立代理

現在您已部署模型，可以建立代理。代理是一種會話式 AI 模型，可用於與用戶互動。

1. 在專案左側面板的 <strong>建置與自訂</strong> 區段中，選擇 <strong>代理</strong> 頁面。
2. 點擊 **+ 建立代理** 以建立新代理。在 <strong>代理設定</strong> 對話框中：
    - 為代理輸入名稱，如 `FlightAgent`。
    - 確認先前建立的 `gpt-4.1-mini` 模型部署已被選取。
    - 按照您希望代理遵循的提示設定 <strong>指令</strong>。以下是範例：
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
> 您可以參考 [這個資源庫](https://github.com/ShivamGoyal03/RoamMind) 獲得更詳細的提示資訊。
    
> 此外，您還可以新增 <strong>知識庫</strong> 和 <strong>動作</strong>，以增強代理的能力，為用戶提供更多資訊和執行自動化任務。本練習中可跳過這些步驟。
    
![Agent Setup](../../../translated_images/zh-MO/agent-setup.9bbb8755bf5df672.webp)

3. 若要建立新的多 AI 代理，只需點擊 <strong>新代理</strong>。剛建立的代理隨即會顯示在代理頁面上。


## 測試代理

建立代理後，您可以在 Microsoft Foundry 門戶的遊樂場中測試其對用戶查詢的回應。

1. 在代理的 <strong>設定</strong> 面板頂端，選擇 <strong>在遊樂場嘗試</strong>。
2. 在 <strong>遊樂場</strong> 面板中，您可以透過聊天視窗與代理互動。例如，您可以請代理搜尋 28 號從西雅圖到紐約的航班。

    > <strong>注意</strong>：代理可能無法提供準確回應，因為本練習未使用即時資料。目的在於測試代理根據指令理解並回應用戶查詢的能力。

    ![Agent Playground](../../../translated_images/zh-MO/agent-playground.dc146586de715010.webp)

3. 測試代理後，您可以透過新增更多意圖、訓練數據和動作來進一步自訂代理，增強其能力。

## 清除資源

完成代理測試後，可以刪除代理以避免產生額外費用。
1. 開啟 [Azure 入口網站](https://portal.azure.com)，檢視您於本練習中部署中樞資源的資源群組內容。
2. 在工具列選擇 <strong>刪除資源群組</strong>。
3. 輸入資源群組名稱，並確認刪除。

## 資源

- [Microsoft Foundry 文件](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 門戶](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 入門指南](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 上 AI 代理基礎](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->