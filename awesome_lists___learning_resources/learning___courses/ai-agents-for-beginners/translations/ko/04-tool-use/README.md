[![좋은 AI 에이전트 설계 방법](../../../translated_images/ko/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(위 이미지를 클릭하여 이 수업의 비디오를 시청하세요)_

# 도구 사용 디자인 패턴

도구는 AI 에이전트가 더 넓은 범위의 기능을 가질 수 있게 해주기 때문에 흥미롭습니다. 에이전트가 수행할 수 있는 제한된 행동 집합을 가진 대신, 도구를 추가하면 에이전트가 이제 다양한 행동을 수행할 수 있습니다. 이 장에서는 AI 에이전트가 목표를 달성하기 위해 특정 도구를 어떻게 사용할 수 있는지를 설명하는 도구 사용 디자인 패턴을 살펴보겠습니다.

## 소개

이번 수업에서 우리는 다음 질문들에 답하려고 합니다:

- 도구 사용 디자인 패턴이란 무엇인가?
- 적용할 수 있는 사용 사례는 무엇인가?
- 디자인 패턴을 구현하는 데 필요한 요소/구성 요소는 무엇인가?
- 신뢰할 수 있는 AI 에이전트를 구축하기 위해 도구 사용 디자인 패턴을 사용할 때의 특별한 고려사항은 무엇인가?

## 학습 목표

이 수업을 완료한 후, 여러분은 다음을 할 수 있게 될 것입니다:

- 도구 사용 디자인 패턴과 그 목적을 정의할 수 있다.
- 도구 사용 디자인 패턴이 적용 가능한 사용 사례를 식별할 수 있다.
- 디자인 패턴 구현에 필요한 핵심 요소를 이해할 수 있다.
- 이 디자인 패턴을 사용하는 AI 에이전트의 신뢰성을 보장하기 위한 고려사항을 인지할 수 있다.

## 도구 사용 디자인 패턴이란 무엇인가?

<strong>도구 사용 디자인 패턴</strong>은 LLM에게 특정 목표를 달성하기 위해 외부 도구와 상호작용할 수 있는 능력을 부여하는 데 중점을 둡니다. 도구는 에이전트가 액션을 수행하기 위해 실행할 수 있는 코드입니다. 도구는 계산기 같은 단순 함수일 수도 있고, 주식 가격 조회나 날씨 예보 같은 타사 서비스에 대한 API 호출일 수도 있습니다. AI 에이전트의 맥락에서는 도구가 <strong>모델이 생성한 함수 호출</strong>에 대해 에이전트가 실행하도록 설계됩니다.

## 적용 가능한 사용 사례는 무엇인가?

AI 에이전트는 도구를 활용하여 복잡한 작업을 완료하거나 정보를 검색하거나 결정을 내릴 수 있습니다. 도구 사용 디자인 패턴은 데이터베이스, 웹 서비스, 코드 인터프리터 등 외부 시스템과 동적 상호작용이 필요한 시나리오에서 자주 사용됩니다. 이 기능은 다음과 같은 여러 사용 사례에 유용합니다:

- **동적 정보 검색:** 에이전트는 외부 API 또는 데이터베이스에 질의하여 최신 데이터를 가져올 수 있습니다 (예: SQLite 데이터베이스 질의를 통한 데이터 분석, 주식 가격 또는 날씨 정보 조회).
- **코드 실행 및 해석:** 에이전트는 코드를 실행하거나 스크립트를 해석하여 수학 문제를 해결하거나 리포트를 생성하거나 시뮬레이션을 수행할 수 있습니다.
- **워크플로우 자동화:** 작업 스케줄러, 이메일 서비스, 데이터 파이프라인 등의 도구를 통합하여 반복적이거나 다단계 워크플로우를 자동화합니다.
- **고객 지원:** 에이전트가 CRM 시스템, 티켓팅 플랫폼, 또는 지식 베이스와 상호작용하여 사용자 문의를 해결할 수 있습니다.
- **콘텐츠 생성 및 편집:** 문법 검사기, 텍스트 요약기, 콘텐츠 안전 평가기 같은 도구를 활용하여 콘텐츠 제작 업무를 지원합니다.

## 도구 사용 디자인 패턴 구현에 필요한 요소/구성 요소는 무엇인가?

이러한 구성 요소들은 AI 에이전트가 다양한 작업을 수행할 수 있도록 합니다. 도구 사용 디자인 패턴 구현에 필요한 핵심 요소들을 살펴보겠습니다:

- **함수/도구 스키마**: 함수 이름, 목적, 필요한 매개변수 및 예상 출력 등 사용 가능한 도구에 대한 상세 정의. 이 스키마는 LLM이 어떤 도구가 사용 가능하며 유효한 요청을 어떻게 구성할지 이해하도록 합니다.

- **함수 실행 논리**: 사용자 의도와 대화 맥락에 따라 도구가 언제 어떻게 호출될지를 결정합니다. 여기에는 플래너 모듈, 라우팅 메커니즘, 조건부 흐름 등이 포함될 수 있습니다.

- **메시지 처리 시스템**: 사용자 입력, LLM 응답, 도구 호출 및 도구 출력 간의 대화 흐름을 관리합니다.

- **도구 통합 프레임워크**: 에이전트가 단순 함수든 복잡한 외부 서비스든 다양한 도구에 연결할 수 있는 인프라입니다.

- **오류 처리 및 검증**: 도구 실행 실패 처리, 매개변수 검증, 예기치 않은 응답 관리 메커니즘입니다.

- **상태 관리**: 대화 맥락, 이전 도구 상호작용, 지속 데이터 추적을 통해 다중 턴 상호작용 간 일관성을 유지합니다.

다음으로 함수/도구 호출에 대해 더 자세히 살펴보겠습니다.
 
### 함수/도구 호출

함수 호출은 대형 언어 모델(LLM)이 도구와 상호작용할 수 있게 하는 주요 방법입니다. '함수'와 '도구'가 종종 같은 의미로 사용되는 이유는, '함수'(재사용 가능한 코드 블록)가 에이전트가 작업을 수행할 때 사용하는 '도구'이기 때문입니다. 함수의 코드를 호출하려면 LLM이 사용자의 요청을 함수 설명과 비교해야 합니다. 이를 위해 모든 사용 가능한 함수들의 설명을 담은 스키마를 LLM에 전달합니다. LLM은 작업에 가장 적합한 함수를 선택하고 그 이름과 인수를 반환합니다. 선택된 함수가 호출되고, 함수의 응답이 LLM으로 돌아오며, LLM은 이 정보를 사용해 사용자 요청에 응답합니다.

개발자가 에이전트용 함수 호출을 구현하려면 다음이 필요합니다:

1. 함수 호출을 지원하는 LLM 모델
2. 함수 설명이 포함된 스키마
3. 설명된 각 함수의 코드

도시에서 현재 시간을 얻는 예시를 통해 설명해보겠습니다:

1. **함수 호출을 지원하는 LLM 초기화하기:**

    모든 모델이 함수 호출을 지원하는 것은 아니므로, 사용하는 LLM이 이를 지원하는지 확인하는 것이 중요합니다.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a>는 함수 호출을 지원합니다. Azure OpenAI **Responses API** (안정적인 `/openai/v1/` 엔드포인트 — `api_version` 불필요)를 사용하여 OpenAI 클라이언트를 시작할 수 있습니다. 

    ```python
    # Azure OpenAI(OpenAI 응답 API, v1 엔드포인트)를 위한 OpenAI 클라이언트를 초기화합니다
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **함수 스키마 생성하기**:

    다음으로 함수 이름, 함수가 수행하는 작업에 대한 설명, 함수 매개변수의 이름과 설명이 포함된 JSON 스키마를 정의합니다.
    그리고 이 스키마를 이전에 생성한 클라이언트에 사용자의 요청(샌프란시스코의 시간을 찾기 위한)을 함께 전달합니다. 중요한 점은, <strong>도구 호출</strong>이 반환된다는 것이지 질문에 대한 최종 답변이 아니라는 점입니다. 앞서 설명했듯, LLM은 작업에 적합하다고 선택한 함수 이름과 그 함수에 전달될 인수를 반환합니다.

    ```python
    # 모델이 읽을 함수 설명 (응답 API 평면 도구 형식)
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
  
    # 초기 사용자 메시지
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # 첫 번째 API 호출: 모델에게 함수를 사용하도록 요청
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API는 response.output에 function_call 항목으로 도구 호출을 반환합니다.
    # 다음 턴에서 모델이 전체 컨텍스트를 가질 수 있도록 대화에 추가합니다.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **작업 수행에 필요한 함수 코드:**

    이제 LLM이 실행할 함수가 결정되었으므로, 작업을 수행할 코드를 구현하고 실행해야 합니다.
    파이썬으로 현재 시간을 얻는 코드를 구현할 수 있습니다. 또한 최종 결과를 얻기 위해 응답 메시지에서 함수 이름과 인수를 추출하는 코드도 작성해야 합니다.

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
    # 함수 호출 처리
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # 도구 결과를 function_call_output 항목으로 반환
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # 두 번째 API 호출: 모델로부터 최종 응답 받기
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

함수 호출은 대부분, 아니면 모든 에이전트 도구 사용 설계의 핵심입니다만, 이를 처음부터 구현하는 것은 때때로 어려울 수 있습니다.
[Lesson 2](../../../02-explore-agentic-frameworks)에서 배웠듯이, 에이전틱 프레임워크는 도구 사용을 구현하기 위한 미리 만들어진 구성 요소를 제공합니다.
 
## 에이전틱 프레임워크를 활용한 도구 사용 예제

여러 에이전틱 프레임워크를 사용하여 도구 사용 디자인 패턴을 구현하는 몇 가지 예제는 다음과 같습니다:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a>는 AI 에이전트를 구축하기 위한 오픈 소스 AI 프레임워크입니다. `@tool` 데코레이터를 사용하여 도구를 파이썬 함수로 정의할 수 있게 함으로써 함수 호출 사용을 단순화합니다. 프레임워크는 모델과 코드 간의 양방향 통신을 처리합니다. 또한 File Search와 Code Interpreter 같은 미리 만들어진 도구를 `FoundryChatClient`를 통해 제공합니다.

다음 다이어그램은 Microsoft Agent Framework에서 함수 호출이 이루어지는 과정을 보여줍니다:

![function calling](../../../translated_images/ko/functioncalling-diagram.a84006fc287f6014.webp)

Microsoft Agent Framework에서는 도구가 데코레이터가 적용된 함수로 정의됩니다. 앞서 본 `get_current_time` 함수를 `@tool` 데코레이터를 사용해 도구로 변환할 수 있습니다. 프레임워크는 함수와 그 매개변수를 자동으로 직렬화하여 LLM으로 보낼 스키마를 만듭니다.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# 클라이언트를 생성합니다
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# 에이전트를 생성하고 도구와 함께 실행합니다
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>는 개발자가 기본 컴퓨팅 및 저장소 자원을 관리할 필요 없이 고품질, 확장 가능하고 확장 가능한 AI 에이전트를 안전하게 구축, 배포 및 확장할 수 있도록 설계된 최신 에이전틱 프레임워크입니다. 특히 기업용 애플리케이션에 유용하며, 엔터프라이즈 급 보안을 갖춘 완전 관리형 서비스입니다.

LLM API를 직접 사용하는 것과 비교해서, Microsoft Foundry Agent Service가 제공하는 몇 가지 장점은 다음과 같습니다:

- 자동 도구 호출 – 도구 호출을 분석하거나 도구를 호출하고 응답을 처리할 필요가 없으며, 이 모든 과정이 서버 측에서 처리됩니다.
- 안전하게 관리되는 데이터 – 대화 상태를 직접 관리하는 대신, 필요한 모든 정보를 저장하는 `threads`에 의존할 수 있습니다.
- 기본 제공 도구 – Bing, Azure AI Search, Azure Functions 등 데이터 소스와 상호작용할 수 있는 도구를 제공합니다.

Microsoft Foundry Agent Service에서 제공하는 도구는 크게 두 가지 범주로 나눌 수 있습니다:

1. 지식 도구:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing 검색 기반</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">파일 검색</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI 검색</a>

2. 액션 도구:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">함수 호출</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">코드 인터프리터</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI 정의 도구</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Agent Service는 이러한 도구들을 `toolset`으로 함께 사용할 수 있게 해 줍니다. 또한 특정 대화의 메시지 내역을 추적하는 `threads`를 활용합니다.

여러분이 Contoso라는 회사의 영업 에이전트라고 상상해보세요. 영업 데이터에 관한 질문에 답할 수 있는 대화형 에이전트를 개발하고자 합니다.

다음 이미지는 Microsoft Foundry Agent Service를 사용하여 영업 데이터를 분석하는 방법을 보여줍니다:

![Agentic Service In Action](../../../translated_images/ko/agent-service-in-action.34fb465c9a84659e.webp)

이 서비스에서 이러한 도구를 사용하려면 클라이언트를 생성하고 도구 또는 도구 모음을 정의할 수 있습니다. 실제 구현을 위해 다음 파이썬 코드를 사용할 수 있습니다. LLM은 도구 모음을 보고 사용자 정의 함수 `fetch_sales_data_using_sqlite_query` 또는 미리 만들어진 코드 인터프리터 중 어떤 것을 사용할지 사용자 요청에 따라 결정할 수 있습니다.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_functions.py 파일에서 찾을 수 있는 fetch_sales_data_using_sqlite_query 함수입니다.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# 도구 세트 초기화
toolset = ToolSet()

# fetch_sales_data_using_sqlite_query 함수를 사용하여 함수 호출 에이전트를 초기화하고 도구 세트에 추가합니다.
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# 코드 인터프리터 도구를 초기화하고 도구 세트에 추가합니다.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## 신뢰할 수 있는 AI 에이전트를 구축하기 위해 도구 사용 디자인 패턴 사용 시 고려사항은 무엇인가?

LLM이 동적으로 생성하는 SQL에 대한 일반적인 우려는 보안, 특히 SQL 인젝션 또는 데이터베이스 삭제나 변조 같은 악의적인 행위의 위험입니다. 이러한 우려는 데이터베이스 접근 권한을 적절히 구성함으로써 효과적으로 완화할 수 있습니다. 대부분의 데이터베이스는 읽기 전용으로 구성하는 것이 포함됩니다. PostgreSQL이나 Azure SQL 같은 데이터베이스 서비스에서는 애플리케이션에 읽기 전용(SELECT) 역할을 할당해야 합니다.

애플리케이션을 안전한 환경에서 실행하면 보호가 더욱 강화됩니다. 기업 시나리오에서는 일반적으로 운영 시스템에서 데이터를 추출하고 변환하여 사용자 친화적인 스키마를 갖춘 읽기 전용 데이터베이스 또는 데이터 웨어하우스로 이전합니다. 이 방법은 데이터 보안, 성능 및 접근성을 최적화하며, 애플리케이션에 제한된 읽기 전용 접근 권한을 부여합니다.

## 샘플 코드

- 파이썬: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## 도구 사용 디자인 패턴에 대해 궁금한 점이 더 있나요?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)에 참여하여 다른 학습자와 만남을 갖고, 오피스 아워에 참석하며 AI 에이전트 관련 질문에 답변을 받아보세요.

## 추가 자료

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service 워크숍</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer 다중 에이전트 워크숍</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework 개요</a>


## 이 에이전트 스모크 테스트하기 (선택 사항)

[Lesson 16](../16-deploying-scalable-agents/README.md)에서 에이전트 배포 방법을 배운 후, [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json)로 이번 레슨의 `TravelToolAgent`가 여전히 도구를 호출하고 답변하는지 스모크 테스트할 수 있습니다. 실행 방법은 [`tests/README.md`](../tests/README.md)를 참조하세요.

## 이전 레슨

[에이전트 디자인 패턴 이해하기](../03-agentic-design-patterns/README.md)

## 다음 레슨

[에이전트 RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->