[![探索 AI 代理框架](../../../translated_images/zh-HK/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(點擊上方圖片以觀看本課程之影片)_

# 探索 AI 代理框架

AI 代理框架是設計用來簡化 AI 代理創建、部署與管理的軟件平台。這些框架提供開發者預先構建的元件、抽象層和工具，能夠使開發複雜的 AI 系統更流暢。

這些框架幫助開發者專注於其應用的獨特面向，藉由提供 AI 代理開發中常見挑戰的標準化方法。它們強化了 AI 系統的可擴充性、可及性與效率。

## 介紹

本課將涵蓋：

- 什麼是 AI 代理框架，以及它們如何幫助開發者達成目標？
- 團隊如何利用這些框架快速原型開發、迭代與提升代理能力？
- 微軟開發的框架與工具（<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> 與 <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>）有何不同？
- 我是否能直接整合現有的 Azure 生態系工具，還是需要獨立方案？
- 什麼是 Microsoft Foundry Agent Service？它如何協助我？

## 學習目標

本課程目標幫助你理解：

- AI 代理框架在 AI 開發中的角色。
- 如何運用 AI 代理框架來構建智能代理。
- AI 代理框架所啟用的關鍵功能。
- Microsoft Agent Framework 與 Microsoft Foundry Agent Service 的差異。

## 什麼是 AI 代理框架？它們能讓開發者做什麼？

傳統的 AI 框架可以協助你將 AI 整合到應用程式中，並透過以下方式提升這些應用：

- <strong>個人化</strong>：AI 可以分析用戶行為與偏好，提供個人化建議、內容與體驗。
範例：Netflix 等串流服務利用 AI 根據觀看歷史推薦電影與節目，提升用戶參與度與滿意度。
- <strong>自動化與效率</strong>：AI 能自動化重複性任務，簡化工作流程，提升營運效率。
範例：客服應用使用 AI 聊天機器人處理常見詢問，縮短回應時間並讓人類代理專注於複雜問題。
- <strong>增強用戶體驗</strong>：AI 可透過語音識別、自然語言處理及預測文字等智能功能改善整體用戶體驗。
範例：Siri 與 Google Assistant 等虛擬助理利用 AI 理解與回應語音指令，使用戶與裝置互動更方便。

### 以上聽起來都很不錯，那為什麼我們還需要 AI 代理框架？

AI 代理框架不只是 AI 框架那麼簡單。它們設計用於創建可與用戶、其他代理及環境互動以達成目標的智能代理。這些代理能展現自主行為、做決策並適應變化。讓我們看看 AI 代理框架啟用的一些關鍵功能：

- <strong>代理協作與協調</strong>：建立多個 AI 代理能合作、溝通及協調以解決複雜任務。
- <strong>任務自動化與管理</strong>：提供多步工作流程自動化、任務委派和代理排行動的動態管理機制。
- <strong>情境理解與適應</strong>：賦予代理理解情境、適應變化環境並根據即時資訊做決策的能力。

總結來說，代理讓你能做更多，將自動化提升到新層次，創建更智慧且能從環境學習和適應的系統。

## 如何快速原型開發、迭代與提升代理能力？

這是一個快速演進的領域，但大部分 AI 代理框架具備讓你快速原型和迭代的共通元素，即模組組件、協作工具與即時學習。讓我們深入看看：

- <strong>使用模組化組件</strong>：AI SDK 提供預構建元件，如 AI 與記憶鏈接器、使用自然語言或程式碼插件的函式呼叫、提示模板等等。
- <strong>運用協作工具</strong>：設計具特定角色與任務的代理，使它們能測試及精煉協作工作流程。
- <strong>即時學習</strong>：實現反饋迴路，讓代理從互動中學習並動態調整行為。

### 使用模組化組件

SDK 如 Microsoft Agent Framework 提供預先構建的元件，如 AI 連接器、工具定義及代理管理。

<strong>團隊如何運用</strong>：團隊可快速組合這些元件，建立功能性原型，避免從零開始，促進快速實驗與迭代。

<strong>實務操作</strong>：你可以使用預製的解析器從用戶輸入擷取資訊，使用記憶模組儲存和檢索資料，並用提示產生器與用戶互動，這一切都不需從頭打造這些組件。

<strong>程式範例</strong>。讓我們看看如何使用 Microsoft Agent Framework 與 `FoundryChatClient` 讓模型透過工具呼叫回應用戶輸入：

``` python
# Microsoft Agent Framework Python 範例

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# 定義一個範例工具函數用於預訂旅遊
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
    # 範例輸出：您於2025年1月1日飛往紐約的航班已成功預訂。祝您旅途愉快！✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

這個例子展示你如何利用預製的解析器從用戶輸入擷取關鍵資訊，如航班訂票請求的出發地、目的地及日期。這種模組化方式讓你能專注於高階邏輯。

### 運用協作工具

框架如 Microsoft Agent Framework 方便創建多個能協作的代理。

<strong>團隊如何運用</strong>：團隊可以設計具特定角色和任務的代理，測試及優化協作工作流程，提高系統整體效率。

<strong>實務操作</strong>：你可創建一組代理，其中每個代理負責特定功能，如資料檢索、分析或決策。這些代理可相互通訊和分享資訊，以達成共通目標，如回答用戶查詢或完成任務。

**程式範例（Microsoft Agent Framework）**：

```python
# 使用 Microsoft Agent Framework 創建多個協作代理

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# 數據檢索代理
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# 數據分析代理
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# 按順序執行代理以完成任務
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

先前程式碼範例示範如何建立一項涉及多代理合作分析資料的任務。每個代理執行專門功能，透過協調代理執行任務以達成期望結果。藉由打造具專門角色的代理，可以提升任務效率與效能。

### 即時學習

先進框架提供即時情境理解和適應的功能。

<strong>團隊如何運用</strong>：團隊可以實現反饋迴路，讓代理從互動中學習並動態調整行為，達成能力的持續改善與優化。

<strong>實務操作</strong>：代理可分析用戶回饋、環境資料與任務結果，更新知識庫、調整決策算法，並隨時間提升效能。這種迭代學習流程使代理適應變化條件與用戶偏好，增強系統整體效能。

## Microsoft Agent Framework 與 Microsoft Foundry Agent Service 有什麼差異？

雖然有多種比較方式，讓我們從設計、功能及目標使用場景的關鍵差異來看：

## Microsoft Agent Framework（MAF）

Microsoft Agent Framework 提供簡化的 SDK，供使用 `FoundryChatClient` 建立 AI 代理。它使開發者能創建利用 Azure OpenAI 模型且內建工具呼叫、對話管理及透過 Azure 身份認證企業級安全的代理。

<strong>使用場景</strong>：建立支援工具使用、多步工作流程及企業整合的生產級 AI 代理。

以下是 Microsoft Agent Framework 的一些重要核心概念：

- <strong>代理</strong>。代理透過 `FoundryChatClient` 創建，並配置名稱、指令與工具。代理能：
  - <strong>處理用戶訊息</strong>，並使用 Azure OpenAI 模型生成回應。
  - <strong>根據對話情境自動呼叫工具</strong>。
  - <strong>跨多次互動維持對話狀態</strong>。

  下面是一段展示如何建立代理的程式碼：

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

- <strong>工具</strong>。此框架支持將工具定義為 Python 函式，代理能自動調用。工具在建立代理時註冊：

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

- <strong>多代理協調</strong>。你可建立多個具有不同專長的代理，並協調它們的工作：

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

- **Azure 身份整合**。框架利用 `AzureCliCredential`（或 `DefaultAzureCredential`）進行安全無金鑰驗證，避免直接管理 API 金鑰。

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service 是近期推出的服務（於 Microsoft Ignite 2024 發表），允許使用更靈活的模型開發與部署 AI 代理，例如直接調用開源大型語言模型如 Llama 3、Mistral 與 Cohere。

Microsoft Foundry Agent Service 提供更強的企業安全機制與資料儲存方式，適合企業級應用。

它可與 Microsoft Agent Framework 即時整合，協助建立與部署代理。

此服務目前於公開預覽階段，支援 Python 與 C# 用於代理建構。

使用 Microsoft Foundry Agent Service Python SDK，我們可創建具自訂工具的代理：

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# 定義工具功能
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

Microsoft Foundry Agent Service 擁有以下核心概念：

- <strong>代理</strong>。Microsoft Foundry Agent Service 與 Microsoft Foundry 整合。在 Microsoft Foundry 內，AI 代理作為「智能」微服務，用於回答問題（RAG）、執行行動或完全自動化工作流程。它結合生成式 AI 模型的力量與工具，能訪問及互動現實世界資料來源。以下是代理範例：

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    在此範例中，代理使用模型 `gpt-4.1-mini`，命名為 `my-agent`，其指令是「你是有幫助的代理」。代理配備工具和資源來執行程式碼解釋任務。

- <strong>主題與訊息</strong>。主題是另一重要概念，代表代理與用戶之間的對話或互動。主題可用來追蹤對話進度、儲存上下文與管理互動狀態。以下為主題範例：

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # 請代理在線程上執行工作
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # 抓取並記錄所有訊息以查看代理的回應
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    在上述程式碼中，建立了主題，隨後發送訊息到該主題。透過呼叫 `create_and_process_run`，代理被要求在該主題工作。最後取得並記錄訊息以查看代理回應。這些訊息顯示用戶與代理間的對話進度。也需理解訊息可為不同類型，如文字、圖片或檔案，代表代理的工作成果，例如生成圖片或文字回應。作為開發者，你可利用這些資訊進行後續處理或呈現給用戶。

- **與 Microsoft Agent Framework 整合**。Microsoft Foundry Agent Service 可與 Microsoft Agent Framework 無縫協作，代表你可以用 `FoundryChatClient` 建立代理，並透過代理服務進行生產部署。

<strong>使用場景</strong>：Microsoft Foundry Agent Service 設計用於需要安全、可擴充且靈活 AI 代理部署的企業應用。

## 這些方法有什麼差異？
 
聽起來有重疊，但在設計、功能及目標使用場景有一些關鍵差異：
 
- **Microsoft Agent Framework（MAF）**：為生產可用的 AI 代理建構 SDK。提供簡潔 API，支援工具呼叫、對話管理及 Azure 身份整合。
- **Microsoft Foundry Agent Service**：為 Microsoft Foundry 內的代理平台及部署服務。提供內建連結 Azure OpenAI、Azure AI 搜尋、Bing 搜尋及程式碼執行。
 
還是不確定選哪個？

### 使用場景
 
來看看常見使用案例，也許能幫到你：
 
> 問：我在建立生產級 AI 代理應用，想快速入門
>

> 答：Microsoft Agent Framework 很適合。它透過 `FoundryChatClient` 提供簡潔且 Python 風格 API，只需幾行程式碼即能定義具工具和指令的代理。

> 問：我需要企業級部署，並整合 Azure 搜尋與程式碼執行等功能
>
> 答：Microsoft Foundry Agent Service 最合適。它是一個平台服務，內建多模型支援、Azure AI 搜尋、Bing 搜尋及 Azure Functions，方便在 Foundry Portal 建立代理並大規模部署。
 
> 問：我仍感困惑，只想要一個選項
>
> 答：先使用 Microsoft Agent Framework 建立代理，當需要在生產環境中部署及擴展時，再使用 Microsoft Foundry Agent Service。這樣可在代理邏輯上快速迭代，同時有明確路徑走向企業部署。
 
讓我們透過表格總結主要差異：

| 框架 | 重點 | 核心概念 | 使用場景 |
| --- | --- | --- | --- |
| Microsoft Agent Framework | 精簡代理 SDK，支援工具呼叫 | 代理、工具、Azure 身份 | 建立 AI 代理、工具使用、多步工作流程 |
| Microsoft Foundry Agent Service | 靈活模型、企業安全、程式碼生成、工具呼叫 | 模組化、協作、流程編排 | 安全、可擴充靈活 AI 代理部署 |

## 我能否直接整合現有的 Azure 生態系工具，還是需要獨立方案？


答案是肯定的，您可以直接將現有的 Azure 生態系統工具與 Microsoft Foundry Agent Service 整合，特別是它已被設計為與其他 Azure 服務無縫合作。舉例來說，您可以整合 Bing、Azure AI Search 和 Azure Functions。Microsoft Foundry 也有深度整合。

Microsoft Agent Framework 也透過 `FoundryChatClient` 和 Azure 身分驗證與 Azure 服務整合，使您能夠直接從代理工具呼叫 Azure 服務。

## 範例程式碼

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## 對 AI Agent Framework 有更多疑問嗎？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)，與其他學習者交流、參加辦公時間並獲得 AI Agents 問題的解答。

## 參考資料

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## 上一課

[AI Agents 與 Agent 使用案例介紹](../01-intro-to-ai-agents/README.md)

## 下一課

[理解 Agentic 設計模式](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->