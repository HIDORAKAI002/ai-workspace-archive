[![如何设计优秀的 AI 代理](../../../translated_images/zh-CN/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(点击上方图片观看本课视频)_

# 工具使用设计模式

工具很有趣，因为它们使 AI 代理拥有更广泛的能力范围。代理不再局限于能执行的有限动作集合，通过添加工具，代理现在可以执行各种各样的动作。在本章中，我们将介绍工具使用设计模式，它描述了 AI 代理如何使用特定工具来实现目标。

## 介绍

在本课中，我们旨在解答以下问题：

- 什么是工具使用设计模式？
- 它可以应用于哪些用例？
- 实现该设计模式需要哪些元素/构建模块？
- 使用工具使用设计模式构建可信 AI 代理时有哪些特别的考虑事项？

## 学习目标

完成本课后，您将能够：

- 定义工具使用设计模式及其目的。
- 确认适用工具使用设计模式的应用场景。
- 理解实现该设计模式所需的关键元素。
- 认识确保使用该设计模式的 AI 代理可信性的注意事项。

## 什么是工具使用设计模式？

<strong>工具使用设计模式</strong> 聚焦于赋予大型语言模型（LLM）与外部工具交互以实现特定目标的能力。工具是代理可执行的代码以执行操作。工具可以是简单的函数，例如计算器，或者是调用第三方服务的 API，如股票价格查询或天气预报。在 AI 代理的上下文中，工具的设计是响应<strong>模型生成的函数调用</strong>由代理执行。

## 它可以应用于哪些用例？

AI 代理可以利用工具完成复杂任务、检索信息或做出决策。工具使用设计模式常用于需要与外部系统（如数据库、网络服务或代码解释器）动态交互的场景。这种能力对多种用例非常有用，包括：

- **动态信息检索：** 代理可以查询外部 API 或数据库以获取最新数据（例如，查询 SQLite 数据库进行数据分析，获取股票价格或天气信息）。
- **代码执行与解释：** 代理可以执行代码或脚本以解决数学问题、生成报告或进行仿真。
- **工作流自动化：** 通过集成任务调度器、电子邮件服务或数据管道等工具，实现重复或多步骤工作流的自动化。
- **客户支持：** 代理可与 CRM 系统、工单平台或知识库交互，以解决用户查询。
- **内容生成与编辑：** 代理可借助语法检查器、文本摘要器或内容安全评估工具辅助内容创作任务。

## 实现工具使用设计模式需要哪些元素/构建模块？

这些构建模块使 AI 代理能够执行各种任务。让我们来看一下实现工具使用设计模式所需的关键元素：

- **函数/工具架构**：详细定义可用工具，包括函数名称、用途、所需参数和预期输出。这些架构使 LLM 能理解哪些工具可用以及如何构造有效请求。

- <strong>函数执行逻辑</strong>：根据用户意图和对话上下文决定如何及何时调用工具。可能包含规划模块、路由机制或条件流程，以动态确定工具的使用。

- <strong>消息处理系统</strong>：管理用户输入、LLM 响应、工具调用及工具输出间对话流程的组件。

- <strong>工具集成框架</strong>：将代理与各种工具（无论是简单函数还是复杂外部服务）连接起来的基础设施。

- <strong>错误处理与校验</strong>：处理工具执行失败、验证参数及管理异常响应的机制。

- <strong>状态管理</strong>：跟踪对话上下文、先前工具交互及持久化数据，以确保多轮交互中的一致性。

接下来，让我们更详细地了解函数/工具调用。
 
### 函数/工具调用

函数调用是我们让大型语言模型（LLM）与工具交互的主要方式。您常会看到“函数”和“工具”被交替使用，因为“函数”（一段可复用代码）就是代理用来执行任务的“工具”。为了调用函数代码，LLM 需要将用户请求与函数描述进行匹配。为此，会将包含所有可用函数描述的架构发送给 LLM。LLM 随后选择最合适的函数，返回其名称和参数。选定函数被调用，其响应发送回 LLM，LLM 利用该信息回应用户请求。

开发者若要实现代理的函数调用，需要：

1. 支持函数调用的 LLM 模型
2. 包含函数描述的架构
3. 每个函数对应的代码

我们用获取某城市当前时间为例说明：

1. **初始化支持函数调用的 LLM：**

    并非所有模型都支持函数调用，因此务必确认所用 LLM 支持此功能。<a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> 支持函数调用。我们可以通过 Azure OpenAI **Response API**（稳定的 `/openai/v1/` 端点，无需提供 `api_version`）初始化 OpenAI 客户端。

    ```python
    # 初始化用于 Azure OpenAI（Responses API，v1 端点）的 OpenAI 客户端
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. <strong>创建函数架构</strong>：

    接下来定义一个 JSON 架构，包含函数名、函数作用描述以及函数参数的名称和描述。
    然后将此架构与用户请求（如查询旧金山时间）一同传递给刚创建的客户端。重要的是要注意，返回的是<strong>工具调用</strong>，<strong>不是</strong>问题的最终答案。如前所述，LLM 返回的是其为任务选择的函数名称及传递给它的参数。

    ```python
    # 模型读取的函数描述（响应API平面工具格式）
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
  
    # 初始用户消息
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # 第一次API调用：请求模型使用该函数
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API将工具调用作为function_call项目返回在response.output中。
    # 将它们追加到对话中，以便模型在下一轮拥有完整的上下文。
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **执行任务所需的函数代码：**

    既然 LLM 已决定运行哪个函数，就需要实现并执行该函数代码。
    我们可以用 Python 实现获取当前时间的代码，还需编写代码从响应消息中提取函数名和参数，获取最终结果。

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
    # 处理函数调用
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # 将工具结果作为 function_call_output 项返回
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # 第二次 API 调用：从模型获取最终响应
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

函数调用是大多数，甚至所有代理工具使用设计的核心，但自行实现有时颇具挑战。
正如我们在[第二课](../../../02-explore-agentic-frameworks)中学习的，代理框架为我们提供了预构建的构建模块，以实现工具使用。
 
## 使用代理框架的工具使用示例

以下是使用不同代理框架实现工具使用设计模式的一些示例：

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> 是一个开源 AI 框架，用于构建 AI 代理。它简化了函数调用的过程，允许您将工具定义为带有 `@tool` 装饰器的 Python 函数。该框架负责模型与代码之间的双向通信，还通过 `FoundryChatClient` 提供了现成工具，如文件搜索和代码解释器。

下图展示了 Microsoft Agent Framework 中的函数调用流程：

![函数调用](../../../translated_images/zh-CN/functioncalling-diagram.a84006fc287f6014.webp)

在 Microsoft Agent Framework 中，工具定义为带装饰器的函数。我们可以将之前看到的 `get_current_time` 函数通过 `@tool` 装饰器转换为一个工具。框架会自动序列化函数及参数，创建用于发送给 LLM 的架构。

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# 创建客户端
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# 创建代理并与工具一起运行
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> 是一款较新的代理框架，旨在使开发者能够安全构建、部署和扩展高质量且可扩展的 AI 代理，无需管理底层计算和存储资源。该服务适用于企业应用，因其是全面托管且具备企业级安全性的服务。

相较于直接使用 LLM API，Microsoft Foundry Agent Service 具备一些优势，包括：

- 自动工具调用——无需自己解析工具调用、触发工具及处理响应，这些均由服务器端完成
- 安全数据管理——无需自主管理会话状态，可依赖线程存储所有所需信息
- 开箱即用工具——可使用如 Bing、Azure AI Search、Azure Functions 等工具与数据源交互

Microsoft Foundry Agent Service 中的工具可分为两类：

1. 知识工具：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">基于 Bing 搜索的定位</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">文件搜索</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI 搜索</a>

2. 行动工具：
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">函数调用</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">代码解释器</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI 定义的工具</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Agent Service 允许我们将这些工具作为一个 `工具集` 一起使用。它还利用了 `threads`，用于跟踪特定对话的消息历史。

设想你是 Contoso 公司的销售代理，想开发一个能够回答销售数据问题的对话代理。

下图展示了如何使用 Microsoft Foundry Agent Service 分析你的销售数据：

![Agentic Service 演示](../../../translated_images/zh-CN/agent-service-in-action.34fb465c9a84659e.webp)

要在服务中使用这些工具，我们可以创建客户端并定义工具或工具集。以下 Python 代码演示了实现方式。LLM 能查看工具集，并根据用户请求决定是使用自定义函数 `fetch_sales_data_using_sqlite_query` 还是预构建的代码解释器。

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query 函数，位于 fetch_sales_data_functions.py 文件中。
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# 初始化工具集
toolset = ToolSet()

# 使用 fetch_sales_data_using_sqlite_query 函数初始化函数调用代理，并将其添加到工具集中
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# 初始化代码解释器工具并将其添加到工具集中。
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## 使用工具使用设计模式构建可信 AI 代理的特别考虑事项？

LLM 动态生成 SQL 的一个常见担忧是安全性，尤其是 SQL 注入风险或恶意操作（如删除或篡改数据库）。虽然这些担忧存在，但通过合理配置数据库访问权限可以有效缓解。对大多数数据库而言，这意味着配置为只读模式。对于 PostgreSQL 或 Azure SQL 这类数据库服务，应用应被分配只读（SELECT）角色。

在安全环境中运行应用进一步增强保护。在企业场景中，数据通常从运营系统提取并转化到只读数据库或数据仓库，且架构便于用户使用。此方法确保数据安全、性能优化且易于访问，同时应用仅具有受限的只读权限。

## 示例代码

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## 关于工具使用设计模式还有更多疑问？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)，与其他学习者交流、参加答疑时间并获得 AI 代理相关问题的解答。

## 额外资源

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents 服务工作坊</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso 创意写作多代理工作坊</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework 概述</a>


## 对该代理进行冒烟测试（可选）

在您学习了如何在[第16课](../16-deploying-scalable-agents/README.md)中部署代理后，您可以使用[`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json)对本课的`TravelToolAgent`进行冒烟测试（它是否仍然调用其工具并回答？）。有关如何运行测试，请参见[`tests/README.md`](../tests/README.md)。

## 之前的课程

[理解代理设计模式](../03-agentic-design-patterns/README.md)

## 下一课

[代理RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->