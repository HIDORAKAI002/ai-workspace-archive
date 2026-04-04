# Azure AI Agent Service 開發

在本練習中，您將使用 [Microsoft Foundry 入口網站](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) 中的 Azure AI Agent 服務工具來建立一個航班預訂代理。該代理將能夠與使用者互動並提供有關航班的資訊。

## 先決條件

完成此練習，您需要以下條件：
1. 具有有效訂閱的 Azure 帳戶。[免費建立帳戶](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)。
2. 您需要有權限建立 Microsoft Foundry 中心，或已為您建立一個。
    - 如果您的角色是貢獻者（Contributor）或擁有者（Owner），即可按照本教學的步驟進行。

## 建立 Microsoft Foundry 中心

> **注意：** Microsoft Foundry 之前稱為 Azure AI Studio。

1. 請遵循 [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) 部落格文章中的指引，建立 Microsoft Foundry 中心。
2. 專案建立完成後，關閉任何顯示的小提示，並檢視 Microsoft Foundry 入口網站中的專案頁面，其應與下方圖片類似：

    ![Microsoft Foundry Project](../../../translated_images/zh-TW/azure-ai-foundry.88d0c35298348c2f.webp)

## 部署模型

1. 在專案左側窗格中，於 **My assets** 區段，選擇 **Models + endpoints** 頁面。
2. 在 **Models + endpoints** 頁面中，點選 **Model deployments** 標籤，於 **+ Deploy model** 功能表中選擇 **Deploy base model**。
3. 在清單中搜尋 `gpt-4o-mini` 模型，選取後確認。

    > **注意**：降低 TPM 有助於避免超出您使用的訂閱可用配額。

    ![Model Deployed](../../../translated_images/zh-TW/model-deployment.3749c53fb81e18fd.webp)

## 建立代理

既然您已經部署了模型，就可以建立代理了。代理是用於與使用者互動的對話式 AI 模型。

1. 在專案左側窗格中，於 **Build & Customize** 區段中選擇 **Agents** 頁面。
2. 點擊 **+ Create agent** 以建立新代理。在 **Agent Setup** 對話框中：
    - 輸入代理名稱，例如 `FlightAgent`。
    - 確認已選取之前建立的 `gpt-4o-mini` 模型部署。
    - 根據您希望代理遵循的提示設定 **Instructions**。以下是一個範例：
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
> 若想要更詳細的提示，您可以參考 [此儲存庫](https://github.com/ShivamGoyal03/RoamMind) 以取得更多資訊。
    
> 此外，您可以新增 **Knowledge Base** 及 **Actions** 來增強代理功能，以根據使用者請求提供更多資訊或執行自動化任務。本次練習可以跳過這些步驟。
    
![Agent Setup](../../../translated_images/zh-TW/agent-setup.9bbb8755bf5df672.webp)

3. 要建立新的多 AI 代理，只需點擊 **New Agent**。新建立的代理將會顯示在 Agents 頁面上。

## 測試代理

建立代理後，您可以測試其在 Microsoft Foundry 入口網站 playground 中對使用者查詢的回應。

1. 在代理的 **Setup** 窗格頂端，選擇 **Try in playground**。
2. 在 **Playground** 窗格中，您可以透過聊天室視窗輸入查詢與代理互動。例如，您可以要求代理搜尋 28 號從西雅圖飛往紐約的航班。

    > **注意**：由於本練習中未使用即時資料，代理的回應可能不完全準確。此目的為測試代理根據提供的指令理解並回應使用者查詢的能力。

    ![Agent Playground](../../../translated_images/zh-TW/agent-playground.dc146586de715010.webp)

3. 測試完代理後，您可進一步自訂代理，新增更多意圖、訓練資料及動作，增強其功能。

## 清除資源

完成代理測試後，可刪除代理以避免產生額外費用。
1. 開啟 [Azure 入口網站](https://portal.azure.com)，檢視您用於此練習中部署中心資源的資源群組內容。
2. 在工具列上選擇 **Delete resource group**。
3. 輸入資源群組名稱並確認刪除。

## 資源

- [Microsoft Foundry 文件](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 入口網站](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio 入門指南](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure 上 AI 代理基礎](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。雖然我們力求準確，但請注意，機器翻譯可能包含錯誤或不準確之處。文件之原始語言版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->