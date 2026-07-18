# Microsoft Foundry 代理服務開發

在此練習中，您將使用 [Microsoft Foundry 入口網站](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) 裡的 Microsoft Foundry 代理服務工具來建立一個航班訂票代理。該代理將能夠與使用者互動並提供航班資訊。

## 前置條件

完成此練習，您需要以下條件：
1. 一個具有有效訂閱的 Azure 帳戶。[免費建立帳戶](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)。
2. 您需要具有建立 Microsoft Foundry 中樞的權限，或有他人為您建立。
    - 如果您的角色是貢獻者或擁有者，您可以按照本教學的步驟進行。

## 建立 Microsoft Foundry 中樞

> **注意：** Microsoft Foundry 先前稱為 Azure AI Studio。

1. 請參考 [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) 部落格文章中的指引，建立 Microsoft Foundry 中樞。
2. 當您的專案建立完成後，關閉所顯示的提示，並在 Microsoft Foundry 入口網站中檢視專案頁面，應類似下圖：

    ![Microsoft Foundry Project](../../../translated_images/zh-TW/azure-ai-foundry.88d0c35298348c2f.webp)

## 部署模型

1. 在專案左側窗格的 <strong>我的資產</strong> 區段，選擇 **模型 + 端點** 頁面。
2. 在 **模型 + 端點** 頁面裡的 <strong>模型部署</strong> 索引標籤中，於 **+ 部署模型** 選單選擇 <strong>部署基礎模型</strong>。
3. 從清單中搜尋 `gpt-4.1-mini` 模型，然後選擇並確認它。

    > <strong>注意</strong>：降低 TPM 有助於避免過度使用您訂閱中的配額。

    ![Model Deployed](../../../translated_images/zh-TW/model-deployment.3749c53fb81e18fd.webp)

## 建立代理

現在您已部署了一個模型，可以建立一個代理。代理是一個可以用來與使用者互動的對話式 AI 模型。

1. 在專案左側窗格的 <strong>建立與自訂</strong> 區段，選擇 <strong>代理</strong> 頁面。
2. 點擊 **+ 建立代理** 以建立新代理。在 <strong>代理設定</strong> 對話方塊中：
    - 輸入代理的名稱，例如 `FlightAgent`。
    - 確認您先前建立的 `gpt-4.1-mini` 模型部署已被選擇。
    - 根據您希望代理遵循的提示設定 <strong>指示</strong>。以下是一個範例：
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
> 有關詳細的提示，可以參考 [此程式庫](https://github.com/ShivamGoyal03/RoamMind) 以取得更多資訊。
    
> 此外，您可以新增 <strong>知識庫</strong> 與 <strong>動作</strong> 以增強代理的能力，提供更多資訊和根據使用者請求執行自動任務。在本練習中，您可以跳過這些步驟。
    
![Agent Setup](../../../translated_images/zh-TW/agent-setup.9bbb8755bf5df672.webp)

3. 要建立新的多 AI 代理，只需點擊 <strong>新代理</strong>。新建立的代理將顯示在代理頁面上。


## 測試代理

建立代理之後，您可以在 Microsoft Foundry 入口網站的遊樂場中測試它，看看它如何回應使用者查詢。

1. 在代理的 <strong>設定</strong> 窗格頂端，選擇 <strong>在遊樂場中嘗試</strong>。
2. 在 <strong>遊樂場</strong> 窗格中，您可以在聊天視窗輸入查詢來與代理互動。例如，您可以要求代理搜尋 28 日從西雅圖到紐約的航班。

    > <strong>注意</strong>：代理可能無法提供準確的回答，因為本練習中未使用即時數據。目的在於測試代理根據所提供指示理解並回應使用者查詢的能力。

    ![Agent Playground](../../../translated_images/zh-TW/agent-playground.dc146586de715010.webp)

3. 測試代理後，您可以進一步自訂代理，新增更多意圖、訓練資料與動作，以增強其功能。

## 清除資源

測試完成後，您可以刪除代理以避免產生額外費用。
1. 開啟 [Azure 入口網站](https://portal.azure.com) 並查看您在本練習中部署中樞資源的資源群組內容。
2. 在工具列上，選擇 <strong>刪除資源群組</strong>。
3. 輸入資源群組名稱並確認刪除。

## 相關資源

- [Microsoft Foundry 文件](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 入口網站](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 入門指南](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 上 AI 代理基礎](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->