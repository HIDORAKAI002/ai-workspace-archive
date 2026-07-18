[![Exploring AI Agent Frameworks](../../../translated_images/ko/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(위 이미지를 클릭하면 이 강의의 동영상을 볼 수 있습니다)_

# AI 에이전트 프레임워크 탐색하기

AI 에이전트 프레임워크는 AI 에이전트의 생성, 배포 및 관리를 단순화하기 위해 설계된 소프트웨어 플랫폼입니다. 이 프레임워크들은 개발자에게 복잡한 AI 시스템 개발을 간소화하는 사전 제작된 구성 요소, 추상화, 도구를 제공합니다.

이 프레임워크들은 공통적인 AI 에이전트 개발 과제를 표준화된 방법으로 제공하여 개발자가 자신의 애플리케이션 고유의 부분에 집중할 수 있도록 돕습니다. 또한 AI 시스템 구축 시 확장성, 접근성, 효율성을 향상시킵니다.

## 소개

이 강의에서는 다음 내용을 다룹니다:

- AI 에이전트 프레임워크란 무엇이며, 개발자가 이를 통해 무엇을 달성할 수 있는가?
- 팀이 어떻게 빠르게 프로토타입을 만들고 반복하며 에이전트의 기능을 개선할 수 있는가?
- Microsoft가 만든 프레임워크 및 도구 (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a>와 <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>) 간의 차이점은 무엇인가?
- 기존 Azure 생태계 도구를 직접 통합할 수 있나, 아니면 독립형 솔루션이 필요한가?
- Microsoft Foundry Agent Service가 무엇이며, 어떻게 도움이 되는가?

## 학습 목표

이 강의의 목표는 다음을 이해하는 데 도움이 되는 것입니다:

- AI 에이전트 프레임워크가 AI 개발에서 맡는 역할.
- AI 에이전트 프레임워크를 활용하여 지능형 에이전트를 구축하는 방법.
- AI 에이전트 프레임워크가 제공하는 주요 기능.
- Microsoft Agent Framework와 Microsoft Foundry Agent Service 간의 차이점.

## AI 에이전트 프레임워크란 무엇이며, 개발자가 이를 통해 무엇을 할 수 있는가?

전통적인 AI 프레임워크는 AI를 애플리케이션에 통합하고 다음과 같은 방식으로 애플리케이션을 개선하는 데 도움을 줄 수 있습니다:

- <strong>개인화</strong>: AI는 사용자 행동과 선호를 분석해 개인화된 추천, 콘텐츠 및 경험을 제공합니다.
예시: Netflix와 같은 스트리밍 서비스는 시청 기록을 기반으로 영화와 프로그램을 추천해 사용자 참여와 만족도를 높입니다.
- **자동화 및 효율성**: AI는 반복 작업을 자동화하고 워크플로우를 간소화하여 운영 효율성을 향상시킵니다.
예시: 고객 서비스 애플리케이션은 AI 기반 챗봇을 사용해 일반 문의를 처리하며 응답 시간을 줄이고 복잡한 문제는 인간 상담원에게 맡깁니다.
- **향상된 사용자 경험**: AI는 음성 인식, 자연어 처리, 예측 텍스트 등 지능형 기능으로 전반적인 사용자 경험을 개선합니다.
예시: Siri와 Google Assistant 같은 가상 비서는 음성 명령을 이해하고 대응해 사용자가 기기와 쉽게 상호작용할 수 있게 합니다.

### 이 모든 것이 훌륭하죠? 그렇다면 왜 AI 에이전트 프레임워크가 필요한가요?

AI 에이전트 프레임워크는 단순한 AI 프레임워크 그 이상을 의미합니다. 이는 사용자, 다른 에이전트, 환경과 상호작용하여 특정 목표를 달성할 수 있는 지능형 에이전트를 생성할 수 있도록 설계되었습니다. 이 에이전트는 자율 행동을 보이고, 결정을 내리며, 변화하는 상황에 적응할 수 있습니다. AI 에이전트 프레임워크가 제공하는 주요 기능은 다음과 같습니다:

- **에이전트 협업 및 조정**: 여러 AI 에이전트가 함께 작업, 소통, 조정하여 복잡한 작업을 해결할 수 있도록 지원합니다.
- **작업 자동화 및 관리**: 다단계 워크플로우 자동화, 작업 위임, 에이전트 간 동적 작업 관리 메커니즘을 제공합니다.
- **맥락 이해 및 적응**: 에이전트가 맥락을 이해하고 변화하는 환경에 적응하며 실시간 정보를 기반으로 의사 결정을 내릴 수 있게 합니다.

요약하면, 에이전트는 더 많은 것을 수행할 수 있게 하며, 자동화를 한 단계 끌어올리고, 환경에 적응하며 학습할 수 있는 더 지능적인 시스템을 만드는 데 기여합니다.

## 에이전트의 기능을 빠르게 프로토타이핑하고, 반복하며, 개선하는 방법은?

이 분야는 매우 빠르게 발전 중이지만, 대부분 AI 에이전트 프레임워크에서 공통적으로 사용할 수 있는 모듈 구성 요소, 협업 도구, 실시간 학습 같은 기능이 있어 빠른 프로토타이핑과 반복 작업을 돕습니다. 자세히 살펴보겠습니다:

- **모듈 구성 요소 사용**: AI SDK는 AI 및 메모리 커넥터, 자연어 또는 코드 플러그인을 이용한 함수 호출, 프롬프트 템플릿 등 사전 제작된 구성 요소를 제공합니다.
- **협업 도구 활용**: 특정 역할과 작업을 갖는 에이전트를 설계해 협업 워크플로우를 테스트하고 개선할 수 있습니다.
- **실시간 학습**: 에이전트가 상호작용에서 배우고 동적으로 행동을 조정하는 피드백 루프를 구현합니다.

### 모듈 구성 요소 사용하기

Microsoft Agent Framework와 같은 SDK는 AI 커넥터, 도구 정의, 에이전트 관리 같은 사전 제작 구성 요소를 제공합니다.

**팀이 활용하는 방식**: 팀은 이러한 구성 요소를 빠르게 조합해 기능성 프로토타입을 만들고 신속한 실험 및 반복이 가능합니다.

**실제 작동 방식**: 사용자 입력에서 정보를 추출하는 사전 제작 파서, 데이터를 저장 및 검색하는 메모리 모듈, 사용자와 상호작용하는 프롬프트 생성기를 별도로 구축하지 않아도 사용할 수 있습니다.

**예제 코드**. 다음은 `FoundryChatClient`를 사용해 Microsoft Agent Framework로 툴 호출과 함께 사용자 입력에 응답하는 모델 예제입니다:

``` python
# 마이크로소프트 에이전트 프레임워크 파이썬 예제

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# 여행 예약을 위한 샘플 도구 함수 정의
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
    # 예시 출력: 2025년 1월 1일 뉴욕행 항공편이 성공적으로 예약되었습니다. 안전한 여행 되세요! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

이 예제에서 볼 수 있듯이, 사전 제작된 파서를 활용해 비행기 예약 요청의 출발지, 목적지, 날짜와 같은 핵심 정보를 사용자 입력에서 추출할 수 있습니다. 이러한 모듈식 접근법은 고수준 로직에 집중할 수 있게 합니다.

### 협업 도구 활용하기

Microsoft Agent Framework와 같은 프레임워크는 협력할 수 있는 다수의 에이전트 생성을 용이하게 합니다.

**팀이 활용하는 방식**: 팀은 특정 역할과 작업을 가진 에이전트를 설계해 협업 워크플로우를 테스트하고 다듬어 시스템 전체 효율성을 개선할 수 있습니다.

**실제 작동 방식**: 데이터 검색, 분석, 의사 결정 등 각기 전문화된 기능을 가진 여러 에이전트 팀을 구성할 수 있습니다. 이들 에이전트는 공동 목표(예: 사용자 문의 답변, 작업 완료)를 위해 정보를 공유하고 소통합니다.

**예제 코드 (Microsoft Agent Framework)**:

```python
# Microsoft Agent Framework를 사용하여 함께 작업하는 여러 에이전트 생성

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# 데이터 검색 에이전트
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# 데이터 분석 에이전트
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# 작업에 대해 에이전트를 순차적으로 실행
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

이전 코드에서 볼 수 있듯, 여러 에이전트가 함께 일하는 작업을 생성하는 방법을 보여줍니다. 각 에이전트는 특정 기능을 수행하고, 작업은 원하는 결과를 달성하도록 에이전트간 조정을 통해 실행됩니다. 전문 역할을 가진 전담 에이전트를 만들면 작업 효율성과 성능이 향상됩니다.

### 실시간 학습하기

고급 프레임워크는 실시간 맥락 이해 및 적응 기능을 제공합니다.

**팀이 활용하는 방식**: 팀은 에이전트가 상호작용에서 배우고 행동을 동적으로 조정하는 피드백 루프를 구현해 지속적인 능력 개선과 정제를 이끌어냅니다.

**실제 작동 방식**: 에이전트는 사용자 피드백, 환경 데이터, 작업 결과를 분석해 지식 기반을 갱신하고 의사 결정 알고리즘을 조정하며 시간이 지남에 따라 성능을 향상시킵니다. 이 반복 학습 과정은 에이전트가 변화하는 조건과 사용자 선호에 적응하여 시스템 효과성을 높입니다.

## Microsoft Agent Framework와 Microsoft Foundry Agent Service의 차이점은 무엇인가?

이 두 접근법을 비교하는 방법은 많지만, 디자인, 기능, 주요 사용 사례 측면에서 몇 가지 주요 차이점이 있습니다:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework는 `FoundryChatClient`를 사용해 AI 에이전트를 구축할 수 있는 간소화된 SDK를 제공합니다. Azure OpenAI 모델을 활용한 툴 호출, 대화 관리, Azure 인증을 통한 엔터프라이즈급 보안을 지원합니다.

**사용 사례**: 툴 사용, 다단계 워크플로우, 엔터프라이즈 통합 시나리오용 프로덕션 준비 AI 에이전트를 구축.

Microsoft Agent Framework의 주요 핵심 개념은 다음과 같습니다:

- <strong>에이전트</strong>. `FoundryChatClient`를 통해 이름, 지시사항, 도구를 설정해 에이전트를 생성합니다. 에이전트는:
  - **사용자 메시지 처리** 및 Azure OpenAI 모델을 활용한 응답 생성.
  - **대화 맥락에 따라 자동으로 도구 호출**.
  - **다중 상호작용 동안 대화 상태 유지**.

  에이전트를 생성하는 코드 예제는 다음과 같습니다:

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

- <strong>도구</strong>. 프레임워크는 에이전트가 자동 호출할 수 있는 파이썬 함수로 도구를 정의하는 것을 지원합니다. 도구는 에이전트 생성 시 등록합니다:

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

- **다중 에이전트 조정**. 서로 다른 전문성을 지닌 여러 에이전트를 생성하고 작업을 조정할 수 있습니다:

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

- **Azure 인증 통합**. 프레임워크는 API 키 관리가 필요 없는 `AzureCliCredential` (또는 `DefaultAzureCredential`)를 사용해 안전하고 무키 인증을 지원합니다.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service는 Microsoft Ignite 2024에서 소개된 최신 서비스입니다. Llama 3, Mistral, Cohere 같은 오픈 소스 LLM을 직접 호출하는 등 더 유연한 모델로 AI 에이전트를 개발 및 배포할 수 있도록 지원합니다.

Microsoft Foundry Agent Service는 더 강력한 엔터프라이즈 보안 메커니즘과 데이터 저장 방법을 제공하여 엔터프라이즈 애플리케이션에 적합합니다.

Microsoft Agent Framework와 즉시 연동되어 에이전트를 구축하고 배포할 수 있습니다.

이 서비스는 현재 공개 프리뷰 단계이며, Python과 C#으로 에이전트 개발을 지원합니다.

Microsoft Foundry Agent Service Python SDK를 사용해 사용자 정의 도구가 포함된 에이전트를 생성할 수 있습니다:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# 도구 기능 정의
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

### 핵심 개념

Microsoft Foundry Agent Service의 핵심 개념은 다음과 같습니다:

- <strong>에이전트</strong>. Microsoft Foundry Agent Service는 Microsoft Foundry와 통합됩니다. Microsoft Foundry 내에서 AI 에이전트는 질문 응답(RAG), 작업 수행, 워크플로우 완전 자동화에 사용 가능한 '스마트' 마이크로서비스로 작동합니다. 생성 AI 모델 능력과 실제 데이터 소스에 접근 및 상호작용하는 도구를 결합해 기능을 수행합니다. 다음은 에이전트 예제입니다:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    이 예제에서 `gpt-4.1-mini` 모델, 이름 `my-agent`, 지시사항 `You are helpful agent`를 가진 에이전트가 생성됩니다. 이 에이전트는 코드 해석 작업을 수행하는 도구와 리소스를 갖추고 있습니다.

- **스레드 및 메시지**. 스레드는 에이전트와 사용자 간 대화나 상호작용을 나타내는 또 다른 중요한 개념입니다. 스레드는 대화 진행 상황을 추적하고, 맥락 정보를 저장하며, 상호작용 상태를 관리하는 데 사용됩니다. 스레드 예시는 다음과 같습니다:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # 에이전트에게 스레드에서 작업을 수행하도록 요청합니다
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # 에이전트의 응답을 확인하기 위해 모든 메시지를 가져와 기록합니다
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    이전 코드에서는 스레드가 생성되고, 그 후 메시지가 스레드에 전송됩니다. `create_and_process_run`을 호출해 에이전트에게 스레드 작업을 수행하도록 요청합니다. 마지막으로 메시지를 가져오고 기록하여 에이전트의 응답을 확인합니다. 메시지는 사용자와 에이전트 간 대화 진행을 나타냅니다. 메시지는 텍스트, 이미지, 파일 등 다양한 유형일 수 있으며, 예를 들어 에이전트 작업 결과로 이미지나 텍스트 응답이 만들어질 수 있습니다. 개발자는 이 정보를 사용해 응답을 추가로 처리하거나 사용자에게 보여줄 수 있습니다.

- **Microsoft Agent Framework와의 통합**. Microsoft Foundry Agent Service는 Microsoft Agent Framework와 원활히 작동하여, `FoundryChatClient`를 사용해 에이전트를 구축하고 에이전트 서비스를 통해 프로덕션 환경에 배포할 수 있습니다.

**사용 사례**: Microsoft Foundry Agent Service는 보안성, 확장성, 유연한 AI 에이전트 배포가 필요한 엔터프라이즈 애플리케이션용으로 설계되었습니다.

## 이 두 접근법의 차이점은 무엇인가?
 
겹치는 부분도 있지만 디자인, 기능, 주요 사용 사례 측면에서 주요 차이점이 존재합니다:
 
- **Microsoft Agent Framework (MAF)**: AI 에이전트 구축을 위한 프로덕션 준비 SDK입니다. 툴 호출, 대화 관리, Azure 인증 통합을 위한 간소화된 API를 제공합니다.
- **Microsoft Foundry Agent Service**: Microsoft Foundry 내 에이전트용 플랫폼 및 배포 서비스입니다. Azure OpenAI, Azure AI Search, Bing Search, 코드 실행 등 서비스와의 내장 연결성을 제공합니다.
 
아직도 어떤 것을 선택해야 할지 확신이 없나요?

### 사용 사례
 
일반적인 사용 사례 몇 가지를 살펴보며 도움을 드리고자 합니다:
 
> Q: 프로덕션 수준의 AI 에이전트 애플리케이션을 빠르게 시작하고 싶습니다.
>

>A: Microsoft Agent Framework가 훌륭한 선택입니다. `FoundryChatClient`를 통한 간단하고 파이썬스타일 API로 몇 줄의 코드만으로 도구와 지시사항을 가진 에이전트를 정의할 수 있습니다.

>Q: Azure의 Search, 코드 실행 등과 연동된 엔터프라이즈급 배포가 필요합니다.
>
> A: Microsoft Foundry Agent Service가 최적입니다. 다양한 모델, Azure AI Search, Bing Search, Azure Functions 등의 내장 기능을 갖춘 플랫폼 서비스로, Foundry 포털에서 에이전트를 쉽게 구축하고 대규모로 배포할 수 있습니다.
 
> Q: 아직 헷갈리는데 한 가지만 추천해 주세요.
>
> A: 우선 Microsoft Agent Framework로 에이전트를 구축하고, 프로덕션 배포 및 확장이 필요할 때 Microsoft Foundry Agent Service를 사용하세요. 이 방법은 에이전트 로직을 빠르게 반복하면서 엔터프라이즈 배포까지 명확한 경로를 제공합니다.
 
주요 차이점을 표로 요약하면 다음과 같습니다:

| 프레임워크 | 중점 | 핵심 개념 | 사용 사례 |
| --- | --- | --- | --- |
| Microsoft Agent Framework | 툴 호출 기능을 갖춘 간소화된 에이전트 SDK | 에이전트, 도구, Azure 인증 | AI 에이전트 구축, 도구 사용, 다단계 워크플로우 |
| Microsoft Foundry Agent Service | 유연한 모델, 엔터프라이즈 보안, 코드 생성, 툴 호출 | 모듈화, 협업, 프로세스 오케스트레이션 | 보안성 높고 확장 가능하며 유연한 AI 에이전트 배포 |

## 기존 Azure 생태계 도구를 직접 통합할 수 있나요, 아니면 독립형 솔루션이 필요한가요?


답은 예입니다. Microsoft Foundry Agent Service는 특히 다른 Azure 서비스와 원활하게 작동하도록 구축되었기 때문에 기존 Azure 생태계 도구를 직접 통합할 수 있습니다. 예를 들어 Bing, Azure AI Search, Azure Functions를 통합할 수 있습니다. 또한 Microsoft Foundry와도 깊이 통합되어 있습니다.

Microsoft Agent Framework는 또한 `FoundryChatClient`와 Azure 아이덴티티를 통해 Azure 서비스와 통합되어 에이전트 도구에서 직접 Azure 서비스를 호출할 수 있게 해줍니다.

## 샘플 코드

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## AI Agent Framework에 관한 추가 질문이 있으신가요?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)에 참여하여 다른 학습자들과 만나고, 오피스 아워에 참석하며 AI Agents에 관한 질문에 답을 얻으세요.

## 참고 자료

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## 이전 강의

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

## 다음 강의

[Understanding Agentic Design Patterns](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->