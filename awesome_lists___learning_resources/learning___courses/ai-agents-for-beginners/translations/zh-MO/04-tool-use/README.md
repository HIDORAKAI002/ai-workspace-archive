[![如何設計優秀的 AI 代理](../../../translated_images/zh-MO/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(點擊上方圖片觀看本課程視頻)_

# 工具使用設計模式

工具之所以有趣，是因為它們讓 AI 代理擁有更廣泛的能力。代理不再只能執行有限的操作，通過添加工具，代理現在可以執行廣泛的操作。在本章中，我們將探討工具使用設計模式，該模式描述了 AI 代理如何使用特定工具來實現目標。

## 介紹

本課程我們將回答以下問題：

- 什麼是工具使用設計模式？
- 它適用於哪些使用案例？
- 實現該設計模式需要哪些要素/構建模塊？
- 使用工具使用設計模式構建值得信賴的 AI 代理有哪些特殊考量？

## 學習目標

完成本課程後，您將能夠：

- 定義工具使用設計模式及其目的。
- 識別適用於工具使用設計模式的使用案例。
- 理解實現設計模式所需的關鍵要素。
- 認識確保使用此設計模式的 AI 代理可信性的考量。

## 什麼是工具使用設計模式？

<strong>工具使用設計模式</strong> 聚焦於賦予大型語言模型（LLM）與外部工具互動以達成特定目標的能力。工具是代理可執行以完成操作的程式碼。工具可以是簡單的函數，例如計算器，或是調用第三方服務的 API，如股票行情查詢或天氣預報。在 AI 代理的語境中，工具被設計成響應<strong>模型生成的函數調用</strong>由代理執行。

## 它適用於哪些使用案例？

AI 代理可利用工具完成複雜任務、檢索資訊或做決策。工具使用設計模式常用於需要與外部系統（如資料庫、網絡服務、代碼解釋器）動態交互的場景。這能力適用於多種使用案例，包括：

- **動態資訊檢索：** 代理可以查詢外部 API 或資料庫以獲取最新資料（例如，查詢 SQLite 資料庫以進行資料分析，獲取股價或天氣資訊）。
- **代碼執行與解釋：** 代理可以執行代碼或腳本來解決數學問題、生成報告或進行模擬。
- **工作流程自動化：** 通過整合任務排程器、電子郵件服務或資料管道等工具來自動化重複或多步驟流程。
- **客戶支援：** 代理可與 CRM 系統、工單平台或知識庫互動以解決用戶查詢。
- **內容生成與編輯：** 代理可利用語法檢查器、文本摘要器或內容安全評估器等工具協助內容創作任務。

## 實現工具使用設計模式需要哪些要素/構建模塊？

這些構建模塊使 AI 代理能夠完成廣泛任務。讓我們來看看實現工具使用設計模式所需的關鍵要素：

- **函數/工具結構（Schemas）**：詳細定義可用工具，包括函數名稱、用途、必需參數和預期輸出。這些結構使 LLM 了解有哪些工具可用以及如何構建有效請求。

- <strong>函數執行邏輯</strong>：根據用戶意圖和對話上下文管理何時及如何調用工具。可能包括規劃模組、路由機制或條件流程，動態決定工具使用。

- <strong>消息處理系統</strong>：管理用戶輸入、LLM 回應、工具調用及工具輸出之間的對話流程的組件。

- <strong>工具整合框架</strong>：連接代理與各種工具的基礎設施，不論是簡單函數還是複雜的外部服務。

- <strong>錯誤處理與驗證</strong>：處理工具執行失敗、參數驗證和管理異常響應的機制。

- <strong>狀態管理</strong>：追蹤對話上下文、先前工具交互及持久資料，確保多輪交互中的一致性。

接下來，讓我們更詳細地了解函數/工具調用。
 
### 函數/工具調用

函數調用是我們使大型語言模型（LLM）與工具互動的主要方式。您會經常看到「函數」和「工具」交替使用，因為「函數」（可重用代碼塊）就是代理用來執行任務的「工具」。為了使函數代碼被調用，LLM 必須將用戶請求與函數描述進行比對。為此，一個包含所有可用函數描述的結構會被傳給 LLM。LLM 然後選擇最適合任務的函數，返回其名稱和參數。所選函數被調用，其回應發回 LLM，LLM 利用此訊息回應用戶請求。

開發者實現代理的函數調用需要：

1. 支持函數調用的 LLM 模型
2. 包含函數描述的結構
3. 每個函數的代碼

我們以獲取某城市當前時間為例說明：

1. **初始化支持函數調用的 LLM：**

    並非所有模型都支持函數調用，因此重要的是確認你使用的 LLM 是否支持。<a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> 支援函數調用。我們可以開始對 Azure OpenAI 的 **Responses API**（穩定版本 `/openai/v1/` 端點 — 無需 `api_version`）初始化 OpenAI 客戶端。

    ```python
    # 初始化 Azure OpenAI 的 OpenAI 客戶端（回應 API，v1 端點）
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **建立函數結構（Function Schema）：**

    接著定義 JSON 結構，內含函數名稱、函數功能描述，以及函數參數名稱與描述。
    接著將此結構傳遞給前面建立的客戶端，連同用戶查詢舊金山時間的請求一起傳入。重要的是，返回的是<strong>工具調用</strong>，而非直接回答問題。正如先前所述，LLM 返回的是為任務選擇的函數名稱及其參數。

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

    # 第一次 API 調用：請模型使用該函數
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API 在 response.output 內，將工具調用作為 function_call 項返回。
    # 將它們附加到對話中，讓模型在下一輪擁有完整上下文。
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **執行任務所需的函數代碼：**

    一旦 LLM 選擇了要執行的函數，所需的函數代碼就必須被實現並執行。
    我們可以用 Python 實現取得當前時間的代碼，還需要編寫代碼從 response_message 中提取函數名稱與參數並獲得最後結果。

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

                # 將工具結果作為 function_call_output 項返回
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

函數調用是大多數（如果不是全部）代理工具使用設計的核心，但從零開始實作有時會令人困難。
如我們在 [Lesson 2](../../../02-explore-agentic-frameworks) 中學習，代理框架為我們提供了實現工具使用的現成構建模塊。
 
## 使用代理框架的工具使用範例

以下是使用不同代理框架實現工具使用設計模式的一些範例：

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> 是一個用於構建 AI 代理的開源框架。它簡化了函數調用過程，允許你使用 `@tool` 裝飾器將工具定義為 Python 函數。該框架處理模型與代碼之間的通信，並提供通過 `FoundryChatClient` 訪問如檔案搜尋和代碼解釋器等預設工具。

下圖展示了 Microsoft Agent Framework 中函數調用的過程：

![函數調用](../../../translated_images/zh-MO/functioncalling-diagram.a84006fc287f6014.webp)

在 Microsoft Agent Framework 中，工具定義為被裝飾的函數。我們可以用 `@tool` 裝飾器將之前看到的 `get_current_time` 函數轉換成工具。框架會自動序列化該函數及其參數，生成發送給 LLM 的結構。

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

# 建立一個代理並使用該工具運行
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> 是一個較新的代理框架，旨在幫助開發者安全地構建、部署與擴展高質量且可擴展的 AI 代理，且無需管理底層計算與存儲資源。由於它是一個完全托管的服務並具備企業級安全性，特別適合企業應用。

與直接使用 LLM API 開發相比，Microsoft Foundry Agent Service 具備以下優勢：

- 自動工具調用 — 無需自己解析工具調用、調用工具及處理回應；這些皆由伺服器端完成
- 安全管理數據 — 不需自己管理對話狀態，可依賴線程存儲所需所有資訊
- 即用型工具 — 可用於與資料源互動的工具，如 Bing、Azure AI Search 和 Azure Functions。

Microsoft Foundry Agent Service 中的工具可分為兩類：

1. 知識工具：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing 搜尋基礎</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">檔案搜尋</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI 搜尋</a>

2. 行動工具：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">函數調用</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">代碼解釋器</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI 定義工具</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

該代理服務允許我們將這些工具作為 `toolset` 一起使用。它也利用了`線程`來追蹤特定對話的訊息歷史。

假設你是 Contoso 公司銷售人員，想開發一個能回答有關銷售數據問題的對話代理。

下圖展示了如何使用 Microsoft Foundry Agent Service 來分析你的銷售數據：

![代理服務運作示意圖](../../../translated_images/zh-MO/agent-service-in-action.34fb465c9a84659e.webp)

使用服務中的任何工具，我們都可以建立客戶端並定義工具或工具集。以下 Python 代碼展示了實際應用。根據用戶請求，LLM 可查看工具集決定是使用用戶定義函數 `fetch_sales_data_using_sqlite_query` 還是預設的代碼解釋器。

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query 函數，可在 fetch_sales_data_functions.py 檔案中找到。
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# 初始化工具集
toolset = ToolSet()

# 初始化函數調用代理，使用 fetch_sales_data_using_sqlite_query 函數並加入工具集中
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# 初始化代碼解譯器工具並加入工具集中。
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## 使用工具使用設計模式構建值得信賴的 AI 代理有哪些特殊考量？

一般對 LLM 動態生成的 SQL 常有安全性疑慮，尤其是 SQL 注入或惡意操作風險，如刪除或破壞資料庫。雖然這些顧慮合理，但只要妥善配置資料庫存取權限，即可有效防範。對大多數資料庫而言，可將資料庫設定為唯讀。對像 PostgreSQL 或 Azure SQL 這類資料庫服務，應分配給應用程式唯讀（SELECT）角色。

在安全環境中執行應用程式進一步加強保護。在企業場景中，通常將資料從營運系統萃取並轉換到帶有友好結構的唯讀資料庫或資料倉儲。此方法確保資料安全、優化效能與可存取性，並確保應用程式擁有限制、唯讀的權限。

## 範例程式碼

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## 對工具使用設計模式有更多問題嗎？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)，與其他學習者交流、參加辦公時間並獲得 AI 代理問題解答。

## 附加資源

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI 代理服務工作坊</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso 創意寫作多代理工作坊</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework 概述</a>


## 對此代理進行煙霧測試（可選）

在你學會如何在[第16課](../16-deploying-scalable-agents/README.md)部署代理後，你可以使用[`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json)對本課的`TravelToolAgent`進行煙霧測試（它是否仍然調用其工具並回答？）。關於如何運行，請參見[`tests/README.md`](../tests/README.md)。

## 上一課

[理解Agentic設計模式](../03-agentic-design-patterns/README.md)

## 下一課

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->