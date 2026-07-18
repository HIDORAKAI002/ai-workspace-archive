[![探索 AI 代理框架](../../../translated_images/zh-TW/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(點擊上方圖片觀看本課程影片)_

# 探索 AI 代理框架

AI 代理框架是設計用來簡化 AI 代理的建立、部署和管理的軟體平臺。這些框架為開發人員提供了預建元件、抽象層和工具，簡化了複雜 AI 系統的開發流程。

這些框架幫助開發人員專注於應用程序的獨特部分，透過標準化方法解決 AI 代理開發中的常見挑戰。它們提升了可擴展性、易用性與建構 AI 系統的效率。

## 介紹

本課程將涵蓋：

- 什麼是 AI 代理框架，以及它們讓開發人員能達成什麼目標？
- 團隊如何利用這些框架快速原型、迭代及提升代理的能力？
- 微軟所推出的框架和工具（<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> 及 <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>）有何不同？
- 我能否直接整合現有的 Azure 生態系工具，還是需要獨立解決方案？
- 什麼是 Microsoft Foundry Agent Service，這服務如何幫助我？

## 學習目標

本課程的目標是幫助你了解：

- AI 代理框架在 AI 開發中的角色。
- 如何利用 AI 代理框架建構智慧代理。
- AI 代理框架所提供的主要能力。
- 微軟 Agent Framework 與 Microsoft Foundry Agent Service 之間的差異。

## 什麼是 AI 代理框架，開發者能藉此做什麼？

傳統的 AI 框架可以幫助你整合 AI 到應用程序中，並透過以下方式提升這些應用的表現：

- <strong>個性化</strong>：AI 可分析用戶行為與喜好，提供個人化的推薦、內容與體驗。
範例：Netflix 等串流服務利用 AI 根據觀看歷史建議電影與節目，提升用戶參與與滿意度。
- <strong>自動化與效率</strong>：AI 能自動化重複性任務，簡化工作流程，提升營運效率。
範例：客服應用使用 AI 聊天機器人處理常見詢問，縮短回應時間，並釋放真人客服處理更複雜的問題。
- <strong>增強使用者體驗</strong>：AI 提供智慧功能如語音識別、自然語言處理和預測輸入，改善整體使用者體驗。
範例：Siri 和 Google Assistant 等虛擬助理利用 AI 理解並回應語音指令，讓用戶更輕鬆與裝置互動。

### 聽起來都很棒，為什麼還需要 AI 代理框架？

AI 代理框架不僅僅是 AI 框架。它們旨在允許建立能與使用者、其他代理及環境互動的智慧代理，以達成特定目標。這些代理具備自主行為、決策能力並能適應變化環境。以下是 AI 代理框架提供的一些核心能力：

- <strong>代理協作與協調</strong>：支持建立多個能共同協作、溝通並協調以解決複雜任務的 AI 代理。
- <strong>工作自動化與管理</strong>：提供自動執行多步驟工作流程、任務委派及代理間動態任務管理的機制。
- <strong>情境理解與適應</strong>：讓代理具備理解上下文、適應變化環境及根據即時資訊做出決策的能力。

總結來說，代理能讓你做更多事，將自動化提升到新層次，打造更智慧且能從環境學習與適應的系統。

## 如何快速原型、迭代與提升代理能力？

這是個快速演進的領域，但大多數 AI 代理框架共有一些關鍵特點助你快速原型與迭代，包含模組化元件、協作工具及即時學習。以下逐一說明：

- <strong>使用模組化元件</strong>：AI SDK 提供預建元件，如 AI 與記憶體連接器、自然語言或程式碼插件的函式呼叫、提示範本等。
- <strong>利用協作工具</strong>：設計具備特定角色與任務的代理，讓它們能測試與優化協作工作流程。
- <strong>即時學習</strong>：實作回饋迴路，讓代理從互動中學習並動態調整行為。

### 使用模組化元件

像 Microsoft Agent Framework 這類 SDK 提供預建元件，如 AI 連接器、工具定義及代理管理等。

<strong>團隊如何利用</strong>：團隊可快速組合這些元件，創建功能性原型，免去從零開始，促進快速實驗與迭代。

<strong>實務作法</strong>：你可以使用預建解析器來提取使用者輸入的資訊，用記憶模組儲存與檢索資料，並用提示產生器與使用者互動，無需從零開發這些元件。

<strong>範例程式碼</strong>。以下示範如何使用 Microsoft Agent Framework 搭配 `FoundryChatClient` 讓模型以工具呼叫回應使用者輸入：

``` python
# Microsoft Agent Framework Python 範例

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# 定義一個用於預訂旅遊的範例工具函數
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # 範例輸出：您於 2025 年 1 月 1 日飛往紐約的航班已成功預訂。祝旅途愉快！✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

範例展示如何利用預建解析器提取用戶輸入中如航班訂票請求的起點、終點與日期等關鍵資訊。這種模組化方法讓你可專注於高階邏輯。

### 利用協作工具

微軟 Agent Framework 等框架支持建立能共同工作的多重代理。

<strong>團隊如何利用</strong>：團隊能為代理設計具體職責與任務，讓代理測試並優化協作流程，提高整體系統效率。

<strong>實務作法</strong>：可創建一組代理團隊，每個代理專責資料擷取、分析或決策。這些代理彼此溝通並共享資訊，以達成共同目標，如回答用戶查詢或完成任務。

**範例程式碼（Microsoft Agent Framework）**：

```python
# 使用 Microsoft Agent Framework 創建多個協同工作的代理

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# 資料擷取代理
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# 資料分析代理
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# 依序執行代理完成任務
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

範例中展示如何建立一項涉及多代理協同分析數據的任務。每個代理擔任特定功能，透過協調代理執行任務以達成預期結果。藉由建立專責角色的代理，可提升任務效率與執行效能。

### 即時學習

先進框架提供即時情境理解與適應能力。

<strong>團隊如何利用</strong>：團隊可實作回饋迴路，讓代理從互動中學習，動態調整行為，持續改進並精進能力。

<strong>實務作法</strong>：代理可分析用戶回饋、環境數據和任務結果，更新知識庫，調整決策算法，並隨時間改進效能。此迭代學習過程使代理能適應變化的條件與用戶偏好，提升系統整體效能。

## Microsoft Agent Framework 與 Microsoft Foundry Agent Service 有何不同？

比較這些方法有多種方式，以下重點說明它們在設計、能力及主要使用案例上的差異：

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework 提供簡化的 SDK，透過 `FoundryChatClient` 建立 AI 代理。它使開發人員能使用 Azure OpenAI 模型，並內建工具呼叫、會話管理以及透過 Azure 身份達成企業級安全。

<strong>使用案例</strong>：建構具工具調用、多步驟工作流程與企業整合場景的生產級 AI 代理。

微軟 Agent Framework 的核心概念包括：

- **代理（Agents）**。代理是透過 `FoundryChatClient` 建立，並設置名稱、指令與工具。代理能：
  - <strong>處理使用者訊息</strong>，透過 Azure OpenAI 模型產生回應。
  - <strong>根據會話上下文自動呼叫工具</strong>。
  - <strong>維持多次互動的會話狀態</strong>。

  下方為建立代理的程式碼片段：

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **工具（Tools）**。框架支持將工具定義為 Python 函式，代理可自動呼叫。工具在建立代理時註冊：

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **多代理協調（Multi-Agent Coordination）**。你可以建立多個不同專長的代理並協調他們的工作：

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Azure 身份整合**。框架使用 `AzureCliCredential`（或 `DefaultAzureCredential`）進行安全無密鑰驗證，免去直接管理 API 金鑰。

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service 是較新的服務，於 Microsoft Ignite 2024 發布。它允許使用較靈活的模型建置與部署 AI 代理，例如可直接呼叫開源大型語言模型 Llama 3、Mistral 和 Cohere。

Microsoft Foundry Agent Service 提供更強的企業安全機制和資料存儲方法，適合企業應用。

它可與 Microsoft Agent Framework 無縫整合，用於代理構建與部署。

本服務目前處於公開預覽階段，支援 Python 與 C# 代理開發。

使用 Microsoft Foundry Agent Service Python SDK，我們可以建立帶有自訂工具的代理：

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# 定義工具函數
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### 核心概念

Microsoft Foundry Agent Service 的核心概念包括：

- **代理（Agent）**。Microsoft Foundry Agent Service 與 Microsoft Foundry 緊密整合。於 Microsoft Foundry 中，AI 代理扮演「智慧」微服務角色，可用於回答問題（RAG）、執行動作或完全自動化工作流程。它透過結合生成式 AI 模型與可存取並互動的實際數據源工具達成此目標。以下為代理示例：

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    範例中建立了使用 `gpt-4.1-mini` 模型、名稱為 `my-agent`、指令為「你是有幫助的代理」的代理。該代理配備工具與資源，用於執行程式碼解譯任務。

- **線程與訊息（Thread and messages）**。線程是另一重要概念，代表代理與使用者間的對話或互動。線程可用於追蹤對話進度、儲存上下文資訊及管理互動狀態。以下為線程示例：

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # 請代理人在該執行緒上執行工作
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # 擷取並記錄所有訊息以查看代理人的回應
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    範例創建了一個線程，隨後向該線程傳送訊息。透過呼叫 `create_and_process_run`，代理被要求在此線程執行工作。最後取得並記錄回應訊息以查看代理回應。訊息反映了使用者與代理對話的進展。重要的是了解訊息可為多種類型，如文字、圖片或檔案，代表代理作業結果為圖片或文本。例如，開發者可利用此資訊進一步處理回應或呈現給使用者。

- **與 Microsoft Agent Framework 整合**。Microsoft Foundry Agent Service 可與 Microsoft Agent Framework 無縫協作，意味著你可使用 `FoundryChatClient` 建立代理，再透過代理服務在生產環境部署。

<strong>使用案例</strong>：Microsoft Foundry Agent Service 適用於需安全、可擴展及彈性 AI 代理部署的企業應用。

## 這些方案的差異是什麼？
 
看起來有重疊，但在設計、能力及目標使用場景上仍有關鍵差別：
 
- **Microsoft Agent Framework (MAF)**：為生產級 SDK，提供簡化 API 用於建置具工具調用、會話管理及 Azure 身份整合的代理。
- **Microsoft Foundry Agent Service**：為 Microsoft Foundry 的平臺與部署服務，提供 Azure OpenAI、Azure AI 搜尋、Bing 搜尋及程式碼執行等內建連接能力。
 
還是不確定該選哪一個？

### 使用案例
 
讓我們透過一些常見使用案例來協助你：
 
> 問：我在打造生產級 AI 代理應用，想快速開始
>

>答：Microsoft Agent Framework 是極佳選擇。它透過 `FoundryChatClient` 提供簡潔的 Python API，讓你只需幾行程式碼即可定義帶工具與指令的代理。

>問：我需要企業級部署且要整合 Azure 搜尋和程式碼執行
>
> 答：Microsoft Foundry Agent Service 最合適。它是平臺服務，內建多模型、Azure AI 搜尋、Bing 搜尋及 Azure Functions 能力。你可輕鬆在 Foundry 入口網站構建與大規模部署代理。
 
> 問：我還是不清楚，請給我一個選項
>
> 答：先從 Microsoft Agent Framework 建立代理，當需要大規模生產部署時，再使用 Microsoft Foundry Agent Service。此策略讓你能快速迭代代理邏輯，同時擁有清晰的企業部署路徑。
 
以下是差異重點的表格總結：

| 框架 | 焦點 | 核心概念 | 使用案例 |
| --- | --- | --- | --- |
| Microsoft Agent Framework | 精簡的具工具調用代理 SDK | 代理、工具、Azure 身份認證 | 建構 AI 代理、工具使用、多步驟工作流程 |
| Microsoft Foundry Agent Service | 彈性模型、企業安全、程式碼生成、工具調用 | 模組化、協作、流程協調 | 安全、可擴展且彈性的 AI 代理部署 |

## 我能直接整合現有 Azure 生態系工具，還是需要獨立解決方案？


答案是肯定的，您可以將現有的 Azure 生態系統工具直接整合到 Microsoft Foundry Agent Service，尤其是因為它已經設計為能與其他 Azure 服務無縫合作。例如，您可以整合 Bing、Azure AI Search 和 Azure Functions。Microsoft Foundry 也有深度整合。

Microsoft Agent Framework 也透過 `FoundryChatClient` 和 Azure 身份認證整合 Azure 服務，讓您能直接從代理工具呼叫 Azure 服務。

## 範例程式碼

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## 想了解更多關於 AI 代理框架的問題嗎？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)，與其他學習者交流，參加辦公時間並獲得 AI 代理的問題解答。

## 參考資料

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## 前一課

[AI 代理與代理使用案例簡介](../01-intro-to-ai-agents/README.md)

## 下一課

[了解 Agentic 設計模式](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->