# Azure AI Agent Service Development

在本練習中，您將使用 [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) 中的 Azure AI Agent 服務工具來建立一個航班預訂代理。該代理將能夠與使用者互動並提供有關航班的資訊。

## 先決條件

完成本練習，您需要以下條件：
1. 一個具有有效訂閱的 Azure 帳戶。[免費建立帳戶](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)。
2. 您需要具備建立 Microsoft Foundry 中心的權限，或已有一個為您建立。
    - 如果您的角色是貢獻者或擁有者，您可以按照本教學中的步驟操作。

## 建立 Microsoft Foundry 中心

> **注意：** Microsoft Foundry 之前稱為 Azure AI Studio。

1. 請依照 [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) 部落格文章提供的指引，建立 Microsoft Foundry 中心。
2. 專案建立完成後，關閉所有顯示的提示訊息，並查看 Microsoft Foundry 入口網站的專案頁面，應類似下方圖片：

    ![Microsoft Foundry Project](../../../translated_images/zh-MO/azure-ai-foundry.88d0c35298348c2f.webp)

## 部署模型

1. 在專案左側窗格的 **My assets** 區段，選擇 **Models + endpoints** 頁面。
2. 在 **Models + endpoints** 頁面中的 **Model deployments** 標籤下，點擊 **+ Deploy model** 選單，選擇 **Deploy base model**。
3. 在列表中搜尋 `gpt-4o-mini` 模型，選擇並確認部署。

    > **注意：** 降低 TPM 有助於避免過度使用您訂閱中可用的配額。

    ![Model Deployed](../../../translated_images/zh-MO/model-deployment.3749c53fb81e18fd.webp)

## 建立代理

既然已經部署模型，您就可以建立代理。代理是一種可用於與使用者互動的對話式 AI 模型。

1. 在專案左側窗格中，於 **Build & Customize** 區段選擇 **Agents** 頁面。
2. 點擊 **+ Create agent** 以建立新的代理。在 **Agent Setup** 對話框中：
    - 輸入代理名稱，例如 `FlightAgent`。
    - 確認已選擇先前建立的 `gpt-4o-mini` 模型部署。
    - 根據您希望代理遵循的提示設定 **Instructions**。以下是範例：
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
> 詳細的提示，您可以參考 [這個程式庫](https://github.com/ShivamGoyal03/RoamMind) 以獲取更多資訊。
    
> 此外，您還可新增 **Knowledge Base** 和 **Actions**，以增強代理提供更多資訊及根據使用者需求執行自動化任務的能力。本練習中，您可略過這些步驟。
    
![Agent Setup](../../../translated_images/zh-MO/agent-setup.9bbb8755bf5df672.webp)

3. 若要建立新的多 AI 代理，只需點選 **New Agent**。新建立的代理將顯示在 Agents 頁面。

## 測試代理

建立代理後，您可以在 Microsoft Foundry 入口網站的 playground 中測試代理如何回應使用者查詢。

1. 在代理的 **Setup** 窗格頂端，選擇 **Try in playground**。
2. 在 **Playground** 窗格中，您能透過聊天室輸入查詢與代理互動。例如，您可以要求代理搜尋從西雅圖到紐約在 28 日的航班。

    > **注意：** 代理可能不會提供準確回應，因為本練習中未使用即時數據。目的是測試代理根據所提供指示理解並回應使用者查詢的能力。

    ![Agent Playground](../../../translated_images/zh-MO/agent-playground.dc146586de715010.webp)

3. 測試完成後，您可透過新增更多意圖、訓練資料和動作來進一步自訂代理並增強其功能。

## 清理資源

測試完成後，您可以刪除代理以避免產生額外費用。
1. 開啟 [Azure portal](https://portal.azure.com)，查看您在本練習中部署中心資源的資源群組內容。
2. 在工具列中，選擇 **Delete resource group**。
3. 輸入資源群組名稱，並確認欲刪除資源群組。

## 資源

- [Microsoft Foundry 文件](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 入口網站](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [使用 Azure AI Studio 入門](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 上 AI 代理基礎知識](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件是使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。儘管我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。文件的原始語言版本應被視為權威來源。對於重要資訊，建議使用專業人工翻譯。我們對因使用此翻譯而引起的任何誤解或誤譯概不負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->