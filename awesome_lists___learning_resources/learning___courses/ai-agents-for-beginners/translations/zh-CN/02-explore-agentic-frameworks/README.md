[![探索 AI 代理框架](../../../translated_images/zh-CN/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(点击上方图片查看本课视频)_

# 探索 AI 代理框架

AI 代理框架是旨在简化 AI 代理创建、部署和管理的软件平台。这些框架为开发者提供预构建组件、抽象层和工具，简化复杂 AI 系统的开发流程。

这些框架帮助开发者专注于应用程序的独特部分，提供了标准化的方法来应对 AI 代理开发中的常见挑战。它们提升了 AI 系统构建的可扩展性、易用性和效率。

## 介绍

本课将涵盖：

- 什么是 AI 代理框架，它们能帮助开发者实现什么？
- 团队如何利用这些框架快速原型开发、反复迭代并提升代理能力？
- 微软提供的不同框架和工具（<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> 和 <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>）有何区别？
- 我能否直接集成现有的 Azure 生态工具，还是需要独立解决方案？
- 什么是 Microsoft Foundry Agent Service，它如何助力我？

## 学习目标

本课目标是帮助你理解：

- AI 代理框架在 AI 开发中的作用。
- 如何利用 AI 代理框架构建智能代理。
- AI 代理框架启用的关键能力。
- Microsoft Agent Framework 和 Microsoft Foundry Agent Service 之间的区别。

## 什么是 AI 代理框架，它们使开发者能做什么？

传统 AI 框架可以帮助你将 AI 集成到应用中，并以下方面提升应用性能：

- <strong>个性化</strong>：AI 可以分析用户行为和偏好，提供个性化推荐、内容和体验。
示例：像 Netflix 这样的流媒体服务使用 AI 根据观看历史推荐电影和节目，提升用户参与度和满意度。
- <strong>自动化和效率提升</strong>：AI 可以自动化重复任务，简化工作流程，提高运营效率。
示例：客户服务应用使用 AI 驱动的聊天机器人处理常见咨询，减少响应时间，让人工客服专注于复杂问题。
- <strong>增强用户体验</strong>：AI 通过语音识别、自然语言处理和预测文本等智能功能提升整体用户体验。
示例：像 Siri 和 Google Assistant 这样的虚拟助手使用 AI 理解并响应语音命令，让用户更方便地与设备互动。

### 这听起来很棒，为什么我们还需要 AI 代理框架？

AI 代理框架不仅仅是普通的 AI 框架。它们旨在创建能与用户、其他代理及环境交互以完成特定目标的智能代理。这些代理可以展现自主行为，做出决策并适应变化条件。让我们看看 AI 代理框架所支持的一些关键能力：

- <strong>代理协作与协调</strong>：支持创建多个 AI 代理，它们能协同工作、沟通并协调解决复杂任务。
- <strong>任务自动化与管理</strong>：提供自动化多步骤工作流、任务委派及动态任务管理的机制。
- <strong>上下文理解与适应</strong>：具备理解上下文、适应环境变化并基于实时信息做决策的能力。

总结来说，智能代理让你做得更多，将自动化提升到新层次，创建能适应环境并自主学习的智能系统。

## 如何快速原型开发、迭代与提升代理能力？

这是一个快速发展的领域，但大多数 AI 代理框架都有一些共通点，能帮助你快速构建原型和迭代方案，主要是模块化组件、协作工具和实时学习。接下来我们详细探讨这些：

- <strong>使用模块化组件</strong>：AI SDK 提供预构建组件，如 AI 连接器、内存连接器、自然语言或代码插件调用函数、提示模板等。
- <strong>利用协作工具</strong>：设计具有特定角色和任务的代理，支持测试和优化协作工作流。
- <strong>实时学习</strong>：实现反馈循环，代理可从交互中学习并动态调整行为。

### 使用模块化组件

像 Microsoft Agent Framework 这样的 SDK 提供预构建组件，如 AI 连接器、工具定义和代理管理。

<strong>团队如何使用</strong>：团队可以快速组装这些组件创建功能原型，无需从零开始，加快实验和迭代速度。

<strong>实际工作原理</strong>：你可以使用预构建的解析器从用户输入中提取信息，使用内存模块存储和检索数据，用提示生成器与用户交互，所有这些都无需自己开发这些组件。

<strong>示例代码</strong>。看一个如何使用 Microsoft Agent Framework 搭配 `FoundryChatClient` 让模型通过工具调用响应用户输入的示例：

``` python
# 微软代理框架Python示例

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# 定义一个预订旅行的示例工具函数
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
    # 示例输出：您2025年1月1日飞往纽约的航班已成功预订。旅途愉快！✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

从这个示例中你能看到如何利用预构建解析器，从用户输入中提取关键信息，如航班预订请求的起点、终点和日期。这样的模块化方式让你能专注于高层逻辑。

### 利用协作工具

像 Microsoft Agent Framework 这样的框架支持创建多个协同工作的代理。

<strong>团队如何使用</strong>：团队可以为代理设计具体角色和任务，支持测试和调优协作工作流，提高整体系统效率。

<strong>实际工作原理</strong>：你可创建一个代理团队，每个代理负责专门功能，如数据检索、分析或决策。代理间可通信分享信息，以完成共同目标，比如回答用户查询或执行任务。

**示例代码（Microsoft Agent Framework）**：

```python
# 使用微软代理框架创建多个协作代理

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# 数据检索代理
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# 数据分析代理
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# 顺序运行任务中的代理
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

上面代码展示了如何创建一个多代理协作分析数据的任务。每个代理执行特定功能，通过协调实现目标。创建专业分工的代理可提升任务效率和性能。

### 实时学习

高级框架提供实时上下文理解和适应功能。

<strong>团队如何使用</strong>：团队可实现反馈循环，让代理从交互中学习，动态调整行为，实现持续改进和能力提升。

<strong>实际工作原理</strong>：代理可分析用户反馈、环境数据和任务结果，更新知识库，调整决策算法，逐步提升性能。此迭代学习过程使代理能适应变化条件和用户偏好，提高系统整体效能。

## Microsoft Agent Framework 和 Microsoft Foundry Agent Service 有何区别？

这两种方案有多种对比方式，以下是设计、能力和目标使用场景上的几个关键区别：

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework 提供简洁的 SDK，用于使用 `FoundryChatClient` 构建 AI 代理。它支持开发者利用 Azure OpenAI 模型，内置工具调用，会话管理，以及通过 Azure 身份实现企业级安全。

<strong>使用场景</strong>：构建可投入生产的 AI 代理，支持工具调用、多步骤工作流和企业集成方案。

这是 Microsoft Agent Framework 的一些核心概念：

- <strong>代理</strong>。代理通过 `FoundryChatClient` 创建，并配置名称、指令和工具。代理可：
  - <strong>处理用户消息</strong> 并使用 Azure OpenAI 模型生成回应。
  - <strong>基于会话上下文自动调用工具</strong>。
  - <strong>维护多次交互的会话状态</strong>。

  这是一段创建代理的代码示例：

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

- <strong>工具</strong>。框架支持将工具定义为 Python 函数，代理可自动调用。工具在创建代理时注册：

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

- <strong>多代理协调</strong>。你可以创建多个具有不同专业的代理，并协调他们的工作：

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

- **Azure 身份集成**。该框架使用 `AzureCliCredential`（或 `DefaultAzureCredential`）实现安全无钥匙认证，无需直接管理 API 密钥。

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service 是微软在 Ignite 2024 推出的新服务。它支持更灵活的模型，如直接调用开源大语言模型（LLM）Llama 3、Mistral 以及 Cohere，提供 AI 代理开发和部署能力。

Microsoft Foundry Agent Service 提供更强的企业安全机制和数据存储方式，适合企业应用。

它与 Microsoft Agent Framework 原生兼容，用于构建和部署代理。

该服务目前处于公测阶段，支持使用 Python 和 C# 构建代理。

使用 Microsoft Foundry Agent Service Python SDK，我们可以创建一个带有自定义工具的代理：

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# 定义工具函数
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

Microsoft Foundry Agent Service 具有以下核心概念：

- <strong>代理</strong>。Microsoft Foundry Agent Service 集成于 Microsoft Foundry。AI 代理作为“智能”微服务用于回答问题（RAG）、执行操作或完全自动化工作流。它结合生成式 AI 模型与工具，访问并互动真实数据源。以下是一个代理示例：

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    该示例中，代理使用模型 `gpt-4.1-mini`，名称为 `my-agent`，指令为 `You are helpful agent`。代理配备工具和资源，执行代码解释任务。

- <strong>线程和消息</strong>。线程是另一个重要概念，代表代理与用户之间的一次对话或交互。线程用于跟踪对话进展、存储上下文信息及管理交互状态。以下是一个线程示例：

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # 请求代理在线程上执行工作
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # 获取并记录所有消息以查看代理的响应
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    代码中首先创建线程，然后向线程发送消息。通过调用 `create_and_process_run`，代理被请求在此线程上执行任务。最后获取消息并记录，以查看代理回复。消息显示用户与代理的对话进程。消息可能是文本、图像或文件类型，表明代理的工作结果，如图像或文本响应。作为开发者，你可以利用这些信息进一步处理响应或展示给用户。

- **与 Microsoft Agent Framework 集成**。Microsoft Foundry Agent Service 与 Microsoft Agent Framework 无缝协作，意味着你可使用 `FoundryChatClient` 构建代理，再通过 Agent Service 部署到生产环境。

<strong>使用场景</strong>：Microsoft Foundry Agent Service 专为要求安全、可扩展且灵活 AI 代理部署的企业应用设计。

## 这些方案有什么区别？
 
虽然有重叠，但它们的设计、能力和目标使用场景存在一些关键差异：
 
- **Microsoft Agent Framework (MAF)**：面向生产的 AI 代理构建 SDK，提供简化的工具调用、会话管理及 Azure 身份集成 API。
- **Microsoft Foundry Agent Service**：Microsoft Foundry 中的代理平台和部署服务，内建连接 Azure OpenAI、Azure AI Search、必应搜索及代码执行能力。
 
还不确定选哪个？

### 使用场景
 
我们通过一些常见场景来帮你选择：
 
> 问：我想快速开始构建生产级 AI 代理应用
>

>答：Microsoft Agent Framework 是极佳选择。它提供简洁的 Python 风格 API (`FoundryChatClient`)，让你用几行代码定义带工具和指令的代理。

>问：我需要企业级部署，集成 Azure 搜索和代码执行
>
> 答：Microsoft Foundry Agent Service 最合适。它是一个平台服务，提供多模型、Azure AI 搜索、必应搜索和 Azure Functions 的内建能力。你可以在 Foundry 门户轻松构建代理，并大规模部署。
 
> 问：我依然困惑，只想选一个
>
> 答：先用 Microsoft Agent Framework 构建代理，之后在需要生产部署和扩展时使用 Microsoft Foundry Agent Service。此方法让你快速迭代代理逻辑，同时拥有清晰的企业部署路径。
 
让我们用表格总结主要区别：

| 框架 | 重点 | 核心概念 | 使用场景 |
| --- | --- | --- | --- |
| Microsoft Agent Framework | 简化的代理 SDK，支持工具调用 | 代理、工具、Azure 身份 | 构建 AI 代理，工具使用，多步骤工作流 |
| Microsoft Foundry Agent Service | 灵活模型，企业安全，代码生成，工具调用 | 模块化、协作、流程编排 | 安全、可扩展、灵活的 AI 代理部署 |

## 我能否直接集成现有 Azure 生态工具，还是需要独立解决方案？


答案是肯定的，您可以将现有的 Azure 生态系统工具直接集成到 Microsoft Foundry Agent Service 中，特别是因为它已被构建为可与其他 Azure 服务无缝协作。例如，您可以集成 Bing、Azure AI 搜索和 Azure Functions。Microsoft Foundry 也有深度集成。

Microsoft Agent Framework 还通过 `FoundryChatClient` 和 Azure 身份验证集成 Azure 服务，使您能够直接从代理工具调用 Azure 服务。

## 示例代码

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## 关于 AI Agent Frameworks 有更多问题吗？

加入 [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) ，与其他学习者交流，参加答疑时间，解决您的 AI Agents 问题。

## 参考资料

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## 上一课

[AI 代理介绍及代理用例](../01-intro-to-ai-agents/README.md)

## 下一课

[理解代理设计模式](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->