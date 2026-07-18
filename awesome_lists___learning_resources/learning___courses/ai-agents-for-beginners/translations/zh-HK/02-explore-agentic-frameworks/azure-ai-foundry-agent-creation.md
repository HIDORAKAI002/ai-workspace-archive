# Microsoft Foundry 代理服務開發

在此練習中，您將使用 [Microsoft Foundry 入口網站](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) 中的 Microsoft Foundry 代理服務工具，建立一個飛行訂票代理。該代理將能夠與使用者互動並提供航班相關資訊。

## 先決條件

完成此練習，您需要以下項目：
1. 一個具有有效訂閱的 Azure 帳戶。[免費建立帳戶](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)。
2. 您需要有權限建立 Microsoft Foundry 集線器或由他人為您建立。
    - 如果您的角色是參與者（Contributor）或擁有者（Owner），可以按照本教學的步驟操作。

## 建立 Microsoft Foundry 集線器

> **注意：** Microsoft Foundry 原名為 Azure AI Studio。

1. 請參考 [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) 部落格文章中的指引來建立 Microsoft Foundry 集線器。
2. 當您的專案建立完成後，關閉任何顯示的提示，並檢視 Microsoft Foundry 入口網站中的專案頁面，應該類似以下圖片：

    ![Microsoft Foundry Project](../../../translated_images/zh-HK/azure-ai-foundry.88d0c35298348c2f.webp)

## 部署模型

1. 在專案左側窗格的 <strong>我的資產</strong> 區域，選擇 **模型 + 端點** 頁面。
2. 在 **模型 + 端點** 頁面中，切換到 <strong>模型部署</strong> 標籤，點選 **+ 部署模型** 選單中的 <strong>部署基礎模型</strong>。
3. 在列表中搜尋 `gpt-4.1-mini` 模型，然後選擇並確認。

    > <strong>注意</strong>：降低 TPM 有助於避免過度使用您所使用訂閱的額度。

    ![Model Deployed](../../../translated_images/zh-HK/model-deployment.3749c53fb81e18fd.webp)

## 建立代理

現在您已經部署一個模型，可以建立一個代理。代理是一個對話式人工智能模型，可用於與使用者互動。

1. 在專案左側窗格的 <strong>建置與自訂</strong> 區域，選擇 <strong>代理</strong> 頁面。
2. 點選 **+ 建立代理** 來建立新代理。在 <strong>代理設定</strong> 對話方塊中：
    - 輸入代理名稱，如 `FlightAgent`。
    - 確認選擇先前建立的 `gpt-4.1-mini` 模型部署。
    - 根據您希望代理遵循的提示設定 <strong>指令</strong>。以下是範例：
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
> 有關詳細提示，您可以參考 [此資源庫](https://github.com/ShivamGoyal03/RoamMind) 以取得更多資訊。
    
> 此外，您可以新增 <strong>知識庫</strong> 及 <strong>動作</strong>，以提升代理的能力，根據使用者請求提供更多資訊並執行自動任務。本練習中可跳過這些步驟。
    
![Agent Setup](../../../translated_images/zh-HK/agent-setup.9bbb8755bf5df672.webp)

3. 若要建立新的多 AI 代理，只需點選 <strong>新代理</strong>。新建立的代理將會出現在代理頁面上。


## 測試代理

建立代理後，可以在 Microsoft Foundry 入口網站的遊樂場中測試代理對使用者詢問的回應。

1. 在代理的 <strong>設定</strong> 面板頂端，選擇 <strong>在遊樂場中嘗試</strong>。
2. 在 <strong>遊樂場</strong> 面板中，您可以在聊天視窗輸入查詢與代理互動。例如，您可以請代理搜尋 28 日從西雅圖飛往紐約的航班。

    > <strong>注意</strong>：由於本練習未使用即時資料，代理可能無法提供準確回應。目的在於測試代理根據提供的指令理解及回應使用者查詢的能力。

    ![Agent Playground](../../../translated_images/zh-HK/agent-playground.dc146586de715010.webp)

3. 測試完代理後，您還可以透過新增更多意圖、訓練資料及動作，進一步自訂以提升其能力。

## 清除資源

完成代理測試後，請刪除代理以避免產生額外費用。
1. 開啟 [Azure 入口網站](https://portal.azure.com)，檢視您在此練習中部署集線器資源的資源群組內容。
2. 在工具列上，選擇 <strong>刪除資源群組</strong>。
3. 輸入資源群組名稱並確認刪除。

## 資源

- [Microsoft Foundry 文件](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 入口網站](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 入門](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 上 AI 代理基礎](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->