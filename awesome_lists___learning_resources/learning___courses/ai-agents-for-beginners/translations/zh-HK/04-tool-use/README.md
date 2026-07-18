[![如何設計優秀的 AI 代理](../../../translated_images/zh-HK/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(點擊上方圖片觀看本課程影片)_

# 工具使用設計模式

工具很有趣，因為它們允許 AI 代理擁有更廣泛的能力。代理不再只能執行有限的動作，透過新增工具，代理現在可以執行各種不同的動作。本章將探討工具使用設計模式，該模式描述了 AI 代理如何使用特定工具來達成目標。

## 介紹

在本課中，我們將嘗試回答以下問題：

- 什麼是工具使用設計模式？
- 它能應用於哪些使用案例？
- 實現該設計模式需要哪些元素/組件？
- 使用工具使用設計模式來構建可信 AI 代理有哪些特別考量？

## 學習目標

完成本課後，您將能夠：

- 定義工具使用設計模式及其目的。
- 辨識適用工具使用設計模式的使用案例。
- 理解實現該設計模式所需的關鍵元素。
- 辨識確保使用此設計模式的 AI 代理可信性的考量。

## 什麼是工具使用設計模式？

<strong>工具使用設計模式</strong> 著重於賦予大型語言模型 (LLM) 與外部工具互動的能力，以完成特定目標。工具是代理可執行的程式碼，用以執行動作。工具可以是簡單的函數，例如計算機，或是呼叫第三方服務的 API，如查詢股價或天氣預報。在 AI 代理的語境中，工具是設計用於對模型生成的函數呼叫做出回應而執行。

## 適用的使用案例有哪些？

AI 代理可利用工具完成複雜任務、擷取資訊或做出決策。工具使用設計模式常應用於需要動態與外部系統互動的場景，如資料庫、網路服務或程式碼解譯器的互動。此能力對多種不同的使用案例都有用，包括：

- **動態資訊擷取：** 代理可以查詢外部 API 或資料庫，取得最新資料（例如使用 SQLite 資料庫進行數據分析，或擷取股價及天氣資訊）。
- **程式執行及解譯：** 代理可以執行程式碼或腳本，以解決數學問題、生成報告或執行模擬。
- **工作流程自動化：** 透過整合任務排程、電子郵件服務或資料管道等工具，自動化重複或多步驟的工作流程。
- **客戶支援：** 代理可互動 CRM 系統、工單平台或知識庫，以解決用戶疑問。
- **內容生成及編輯：** 代理可利用語法檢查、文字摘要或內容安全評估等工具，協助內容創作任務。

## 實現工具使用設計模式所需的元素/組件有哪些？

這些組件讓 AI 代理能執行各種任務。以下是實現工具使用設計模式所需的關鍵元素：

- **函數/工具結構 (Schemas)**：對可用工具的詳細定義，包括函數名稱、用途、必需參數和預期輸出。這些結構幫助 LLM 理解有哪些工具可用及如何構造有效請求。

- <strong>函數執行邏輯</strong>：根據使用者意圖與對話上下文，決定何時及如何調用工具。此邏輯可能包含規劃器模組、路由機制或動態決定工具使用的條件流程。

- <strong>訊息處理系統</strong>：管理使用者輸入、LLM 回應、工具呼叫及工具輸出之間對話流程的元件。

- <strong>工具整合框架</strong>：連結代理與各種工具的基礎設施，無論是簡單函數或複雜外部服務。

- <strong>錯誤處理與驗證</strong>：處理工具執行失敗、參數驗證及管理意外回應的機制。

- <strong>狀態管理</strong>：追蹤對話上下文、先前工具互動及持久資料，以確保多輪對話的一致性。

接下來，我們更詳細地探討函數/工具呼叫。
 
### 函數/工具呼叫

函數呼叫是我們讓大型語言模型 (LLM) 與工具互動的主要方式。您常會看到「函數」和「工具」被交替使用，因為「函數」（可重用程式碼區塊）就是代理用來執行任務的「工具」。為了讓函數的程式碼被執行，LLM 必須根據使用者請求與函數描述進行比對。為此，我們會將包含所有可用函數描述的結構傳送給 LLM。LLM 會選擇最適合該任務的函數，並回傳函數名稱與參數。選定的函數會被呼叫執行，其回應會返回給 LLM，LLM 再使用此資訊回應使用者請求。

對開發者來說，實作代理的函數呼叫需要：

1. 支援函數呼叫的 LLM 模型
2. 含函數描述的結構 (schema)
3. 各函數的程式碼實現

我們用取得某城市當前時間的例子來說明：

1. **初始化支持函數呼叫的 LLM：**

    並非所有模型都支持函數呼叫，因此使用前請確認目前所用 LLM 支援該功能。     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> 支持函數呼叫。我們可從對 Azure OpenAI 的 **Responses API** (穩定的 `/openai/v1/` 端點，無需 `api_version`) 啟動 OpenAI 用戶端開始。

    ```python
    # 為 Azure OpenAI（回應 API，v1 端點）初始化 OpenAI 客戶端
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **建立函數結構 (Function Schema)：**

    接著定義一個 JSON 結構，包含函數名稱、函數功能說明，及參數名稱與描述。
    然後將此結構與查詢「舊金山時間」的使用者請求一起傳給先前建立的用戶端。重點是，返還的是<strong>工具呼叫</strong>結果，而非問題的最終答案。如前所述，LLM 會回傳為此任務選擇的函數名稱及將要傳入的參數。

    ```python
    # 模型閱讀用的功能描述（回應 API 扁平工具格式）
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

    # 第一次 API 調用：要求模型使用該功能
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API 將工具調用作為 function_call 項目返回於 response.output 中。
    # 將它們附加到對話中，以便模型在下一輪對話中擁有完整上下文。
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **執行任務所需的函數程式碼：**

    現在 LLM 已選定需要執行的函數，我們需要實作並執行執行該任務的程式碼。
    我們在 Python 中實現取得當前時間的程式碼，並撰寫程式碼用以從 `response_message` 取出函數名稱及參數，得到最終結果。

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
    # 處理函數調用
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

    # 第二次 API 調用：從模型獲取最終回應
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

函數呼叫是大多數甚至所有代理工具使用設計的核心，但自行從零實作有時也具挑戰性。
如我們在[第 2 課](../../../02-explore-agentic-frameworks)了解到的，代理框架為我們提供了預構建的組件來實現工具使用。
 
## 使用代理框架的工具使用範例

以下是幾個使用不同代理框架實作工具使用設計模式的範例：

### 微軟代理框架

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">微軟代理框架</a> 是一個開源 AI 框架，用於建構 AI 代理。它簡化了函數呼叫的使用，允許您以 `@tool` 裝飾器定義工具為 Python 函數。此框架處理模型與您程式碼間的雙向通訊，並通過 `FoundryChatClient` 提供訪問預建工具，如檔案搜尋及程式碼解譯器。

下圖說明了使用微軟代理框架的函數呼叫流程：

![function calling](../../../translated_images/zh-HK/functioncalling-diagram.a84006fc287f6014.webp)

在微軟代理框架中，工具定義為裝飾函數。我們可以將先前的 `get_current_time` 函數改裝為使用 `@tool` 裝飾器的工具。框架會自動序列化函數及其參數，建立傳給 LLM 的結構。

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
  
### 微軟 Foundry 代理服務

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">微軟 Foundry 代理服務</a> 是較新的代理框架，專為讓開發者能安全構建、部署並擴展高品質且可延展的 AI 代理而設，無需管理底層計算與儲存資源。這對企業應用特別有用，因為它是全托管服務且具企業級安全防護。

與直接使用 LLM API 相比，微軟 Foundry 代理服務具備以下優勢：

- 自動工具呼叫——不需您自行解析工具呼叫、執行並處理回應，這些全部由伺服器端完成
- 安全管理的資料——不需管理您的對話狀態，可依靠執行緒保存所有所需資訊
- 即時可用工具——提供與您的資料來源互動的工具，如 Bing、Azure AI 搜尋和 Azure Functions

微軟 Foundry 代理服務中的工具可分為兩大類：

1. 知識工具：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">使用 Bing 搜尋做資料引導</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">檔案搜尋</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI 搜尋</a>

2. 動作工具：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">函數呼叫</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">程式碼解譯器</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI 定義工具</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

代理服務允許我們將這些工具作為一個 `toolset` 一起使用。它同時利用 `threads` 追蹤特定對話的訊息歷史。

想像你是 Contoso 公司的銷售代理，想開發一個能回答銷售資料問題的對話代理。

下圖說明了如何使用微軟 Foundry 代理服務來分析銷售資料：

![Agentic Service In Action](../../../translated_images/zh-HK/agent-service-in-action.34fb465c9a84659e.webp)

想使用服務中的任何工具，我們可建立用戶端並定義工具或工具集。實作上，我們可以使用如下 Python 程式碼。LLM 將會檢視工具集，根據使用者請求決定要使用用戶自訂函數 `fetch_sales_data_using_sqlite_query`，或是內建的程式碼解譯器。

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

# 初始化工具組
toolset = ToolSet()

# 使用 fetch_sales_data_using_sqlite_query 函數初始化函數調用代理，並將其添加到工具組中
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# 初始化代碼解釋器工具，並將其添加到工具組中。
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## 使用工具使用設計模式建構可信 AI 代理的特別考量有哪些？

由 LLM 動態生成的 SQL 常見的疑慮是安全性，特別是 SQL 注入攻擊或惡意行為的風險，如刪除或竄改資料庫。這些顧慮雖然合理，但可透過適當設定資料庫存取權限有效減輕。對大多數資料庫而言，這涉及將資料庫設定為唯讀。對 PostgreSQL 或 Azure SQL 等資料庫服務來說，應分配給應用唯讀（SELECT）角色。

在安全的環境中執行應用程式能進一步強化保護。企業場景下，資料通常會從營運系統抽取轉換至擁有友善結構的唯讀資料庫或資料倉儲。此做法確保資料安全、優化性能與易用性，且應用只能以受限唯讀權限存取。

## 範例程式碼

- Python: [代理框架](./code_samples/04-python-agent-framework.ipynb)
- .NET: [代理框架](./code_samples/04-dotnet-agent-framework.md)

## 對工具使用設計模式還有疑問嗎？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)，與其他學習者交流，參加辦公時間課程，並獲得 AI 代理相關問題的解答。

## 附加資源

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI 代理服務工作坊</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso 創意寫手多代理工作坊</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">微軟代理框架概述</a>


## 對此代理進行煙霧測試（可選）

在你學會在[第16課](../16-deploying-scalable-agents/README.md)中部署代理後，你可以使用[`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json)對本課的 `TravelToolAgent` 進行煙霧測試（它是否仍然調用其工具並回答？）。詳情請參見[`tests/README.md`](../tests/README.md)了解如何運行。

## 上一課

[理解代理設計模式](../03-agentic-design-patterns/README.md)

## 下一課

[代理式RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。雖然我們致力於確保準確性，但請注意，機器自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議進行專業人工翻譯。我們不對因使用本翻譯而產生的任何誤解或誤釋承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->