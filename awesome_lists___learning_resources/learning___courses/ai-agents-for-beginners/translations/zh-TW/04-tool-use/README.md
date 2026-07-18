[![如何設計良好的 AI 代理](../../../translated_images/zh-TW/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(點擊上方圖片觀看本課程影片)_

# 工具使用設計模式

工具很有趣，因為它們讓 AI 代理能夠擁有更廣泛的能力。代理不僅限於一組有限的行動，通過添加工具，代理現在可以執行各種各樣的行動。在本章中，我們將探討工具使用設計模式，描述 AI 代理如何使用特定工具來達成目標。

## 介紹

在本課程中，我們將回答以下問題：

- 什麼是工具使用設計模式？
- 它適用於哪些使用案例？
- 實現此設計模式需要哪些元素/組件？
- 使用工具使用設計模式構建值得信賴的 AI 代理有何特別注意事項？

## 學習目標

完成本課程後，你將能夠：

- 定義工具使用設計模式及其目的。
- 辨識適用工具使用設計模式的使用案例。
- 理解實現設計模式所需的關鍵元素。
- 了解使用此設計模式確保 AI 代理可信任性的考量因素。

## 什麼是工具使用設計模式？

<strong>工具使用設計模式</strong> 著重於賦予大型語言模型（LLM）與外部工具互動的能力以達成特定目標。工具是能被代理執行以完成任務的程式碼。工具可以是簡單的功能，例如計算機，或是調用第三方服務的 API，如股票價格查詢或天氣預報。在 AI 代理的語境下，工具設計成由代理根據<strong>模型生成的函數調用</strong>來執行。

## 適用的使用案例有哪些？

AI 代理可以利用工具完成複雜任務、檢索資訊或做決策。工具使用設計模式常見於需與外部系統（如資料庫、網路服務或程式碼解釋器）動態互動的場景。此能力對多種不同用例皆有用，包括：

- **動態資訊檢索：** 代理可以查詢外部 API 或資料庫來取得最新數據（例如查詢 SQLite 資料庫作數據分析，取得股價或天氣資訊）。
- **程式碼執行與解釋：** 代理可以執行程式碼或腳本來解決數學問題、產生報告或進行模擬。
- **工作流程自動化：** 通過整合工具如任務排程器、電子郵件服務或數據管線來自動化重複或多步驟的工作流程。
- **客戶支援：** 代理可以與 CRM 系統、工單平台或知識庫互動，解決使用者疑問。
- **內容生成與編輯：** 代理可利用語法檢查器、文本摘要器或內容安全評估器等工具協助內容創作工作。

## 實現工具使用設計模式所需的元素/組件有哪些？

這些組件使 AI 代理能執行各種任務。讓我們看看實現工具使用設計模式所需的關鍵元素：

- **功能/工具結構描述（Schema）**：詳細定義可用工具，包括函數名稱、用途、所需參數及預期輸出。這些結構描述讓 LLM 理解可用工具與如何構造有效請求。

- <strong>功能執行邏輯</strong>：根據使用者意圖與對話上下文調控何時調用工具。這可能包含規劃模組、路由機制或條件流程來動態決定工具使用。

- <strong>訊息處理系統</strong>：管理使用者輸入、LLM 回應、工具調用及工具輸出之間對話流程的組件。

- <strong>工具整合框架</strong>：連接代理與各種工具的基礎架構，不論是簡單函數或複雜的外部服務。

- <strong>錯誤處理與驗證</strong>：處理工具執行失敗、驗證參數及管理異常回應的機制。

- <strong>狀態管理</strong>：追蹤對話上下文、先前工具互動及持久資料，確保多回合互動的一致性。

接著，我們更詳細看看功能/工具調用。
 
### 功能/工具調用

功能調用是讓大型語言模型（LLM）與工具互動的主要方式。你常會看到「功能」與「工具」交替使用，因為「功能」（可重用的程式碼區塊）就是代理用來執行任務的「工具」。為使功能程式碼被調用，LLM 必須根據使用者的請求與功能描述進行比較。為此，我們將包含所有可用功能描述的結構描述發送給 LLM。LLM 然後選擇最適合該任務的功能並回傳其名稱及參數。選定的功能被調用，回應送回 LLM，LLM 利用資訊回應使用者的請求。

開發者若要為代理實現功能調用，需準備：

1. 支援功能調用的 LLM 模型
2. 包含功能描述的結構描述
3. 每個描述功能所需的程式碼

讓我們用取得城市目前時間的例子來說明：

1. **初始化支援功能調用的 LLM：**

    並非所有模型都支援功能調用，因此確認使用的 LLM 是否支援很重要。 <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> 支援功能調用。我們可以從針對 Azure OpenAI **Responses API**（穩定的 `/openai/v1/` 端點—不需 `api_version`）初始化 OpenAI 客戶端開始。

    ```python
    # 初始化 Azure OpenAI 的 OpenAI 用戶端（回應 API，v1 端點）
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **建立功能結構描述：**

    接著定義一個 JSON 結構描述，包含功能名稱、功能作用描述，以及功能參數的名稱和說明。
    然後將此結構描述與先前建立的客戶端一起傳遞，搭配使用者請求查詢舊金山時間。重點是，回傳的是一個<strong>工具呼叫</strong>，<strong>不是</strong>問題的最終答案。如前所述，LLM 回傳為該任務選擇的功能名稱及將傳遞的參數。

    ```python
    # 模型閱讀的功能描述（回應 API 扁平工具格式）
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # 初始用戶訊息
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # 第一次 API 呼叫：請模型使用該功能
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API 在 response.output 中以 function_call 項目返回工具呼叫。
    # 將它們附加到對話中，以便模型在下一輪擁有完整的上下文。
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **執行任務所需的功能程式碼：**

    現在 LLM 已選擇需執行的功能，需實作並執行完成任務的程式碼。
    我們可以使用 Python 實作取得當前時間的程式碼，也需寫出解析 response_message 取得功能名稱及參數的程式碼，以獲取最終結果。

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # 處理函式呼叫
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # 將工具結果作為 function_call_output 項目返回
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # 第二次 API 呼叫：從模型獲取最終回應
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

功能調用是大多數代理工具使用設計的核心，但從零實作有時候可能頗具挑戰。
如我們在 [課程 2](../../../02-explore-agentic-frameworks) 中學到，代理框架提供我們預置的組建塊以實現工具使用。
 
## 使用代理框架的工具使用範例

以下是利用不同代理框架實現工具使用設計模式的範例：

### Microsoft 代理框架

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft 代理框架</a> 是一個開源 AI 框架，用於構建 AI 代理。它簡化了使用功能調用的流程，允許你透過 `@tool` 裝飾器將工具定義為 Python 函數。該框架處理模型與程式碼之間的來回通信，並透過 `FoundryChatClient` 提供諸如檔案搜尋與程式碼解釋器等預建工具的存取。

下圖說明 Microsoft 代理框架中功能調用的流程：

![function calling](../../../translated_images/zh-TW/functioncalling-diagram.a84006fc287f6014.webp)

在 Microsoft 代理框架中，工具定義為裝飾過的函數。我們可如先前所見，使用 `@tool` 裝飾器將 `get_current_time` 函數轉為工具。框架將自動序列化函數和其參數，創建發送給 LLM 的結構描述。

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# 建立客戶端
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# 建立代理並使用工具執行
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry 代理服務

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry 代理服務</a> 是一個較新的代理框架，設計用於幫助開發者安全地建置、部署及擴展高品質且可延展的 AI 代理，無需管理底層計算與儲存資源。此服務對企業應用特別有用，因為它是完全托管的服務，具備企業級安全性。

與直接使用 LLM API 開發相比，Microsoft Foundry 代理服務提供以下優勢：

- 自動工具調用 — 無需手動解析工具呼叫、執行工具、處理回應；所有這些在伺服器端自動完成
- 安全管理資料 — 無需自行管理對話狀態，可依靠執行緒存儲所有必要資訊
- 開箱即用的工具 — 提供與資料來源互動的工具，如 Bing、Azure AI 搜尋及 Azure Functions。

Microsoft Foundry 代理服務中的工具可分為兩大類：

1. 知識工具：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing 搜尋輔助</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">檔案搜尋</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI 搜尋</a>

2. 執行工具：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">功能調用</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">程式碼解釋器</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI 定義的工具</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

代理服務允許我們將這些工具作為 `toolset` 一起使用，並利用 `threads` 追蹤特定對話的訊息歷史。

想像你是一家名為 Contoso 公司的銷售代表，想開發一個能回答銷售數據問題的對話代理。

下圖說明如何使用 Microsoft Foundry 代理服務來分析銷售數據：

![Agentic Service In Action](../../../translated_images/zh-TW/agent-service-in-action.34fb465c9a84659e.webp)

要使用服務的任一工具，我們可以建立一個客戶端並定義一個工具或工具集。實作時可參考如下 Python 程式碼。LLM 將根據使用者請求決定使用使用者自訂函數 `fetch_sales_data_using_sqlite_query` 或預建程式碼解釋器。

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query 函數，可以在 fetch_sales_data_functions.py 檔案中找到。
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# 初始化工具集
toolset = ToolSet()

# 使用 fetch_sales_data_using_sqlite_query 函數初始化函數調用代理，並將其添加到工具集中
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# 初始化程式碼解譯器工具並將其添加到工具集中。
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## 使用工具使用設計模式構建值得信賴的 AI 代理時有什麼特別考量？

LLM 動態生成的 SQL 常見安全疑慮，特別是 SQL 注入或惡意操作（如刪除或竄改資料庫）。儘管這些疑慮存在，但若妥善配置資料庫存取權限可有效減輕。大多數資料庫可設定為唯讀，對於像 PostgreSQL 或 Azure SQL 之類的資料庫服務，應為應用程式分配唯讀（SELECT）角色。

在安全環境中執行應用程式進一步提高保護安全性。企業場景下通常會將資料從營運系統抽取並轉換至唯讀資料庫或資料倉儲，並具使用者友好的結構描述。此方式確保資料安全、性能與存取優化，且應用程式能以限制唯讀權限存取。

## 範例程式碼

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## 對工具使用設計模式有更多問題嗎？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)，與其他學習者交流，參加辦公時間並解答你的 AI 代理問題。

## 額外資源

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI 代理服務工作坊</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso 創意作家多代理工作坊</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft 代理框架概述</a>


## 簡單測試此代理程式（可選）

在學習如何部署代理程式於 [Lesson 16](../16-deploying-scalable-agents/README.md) 後，您可以使用 [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) 來對本課的 `TravelToolAgent` 進行簡單測試（它是否仍然呼叫其工具並提供回應？）。參考 [`tests/README.md`](../tests/README.md) 了解如何執行。

## 前一課

[理解代理設計模式](../03-agentic-design-patterns/README.md)

## 下一課

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
此文件已使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們努力追求準確性，但請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用此翻譯所產生的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->