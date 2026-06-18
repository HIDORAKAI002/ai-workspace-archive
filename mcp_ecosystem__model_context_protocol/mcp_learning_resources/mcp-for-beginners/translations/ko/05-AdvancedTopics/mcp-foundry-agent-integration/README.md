# Model Context Protocol (MCP)와 Microsoft Foundry 통합

이 가이드는 Model Context Protocol (MCP) 서버를 Microsoft Foundry 에이전트와 통합하는 방법을 보여주며, 강력한 도구 오케스트레이션과 엔터프라이즈 AI 기능을 가능하게 합니다.

## 소개

Model Context Protocol (MCP)은 AI 애플리케이션이 외부 데이터 소스 및 도구에 안전하게 연결할 수 있도록 하는 오픈 표준입니다. Microsoft Foundry와 통합되면 MCP는 에이전트가 다양한 외부 서비스, API 및 데이터 소스에 표준화된 방식으로 접근하고 상호 작용할 수 있게 합니다.

이 통합은 MCP의 도구 생태계의 유연성과 Microsoft Foundry의 견고한 에이전트 프레임워크를 결합하여, 광범위한 맞춤형 기능을 갖춘 엔터프라이즈급 AI 솔루션을 제공합니다.

**참고:** Microsoft Foundry Agent Service에서 MCP를 사용하려면 현재 다음 지역만 지원됩니다: westus, westus2, uaenorth, southindia 및 switzerlandnorth

## 학습 목표

이 가이드를 끝내면 다음을 수행할 수 있습니다:

- Model Context Protocol 및 그 이점 이해
- Microsoft Foundry 에이전트와 사용할 MCP 서버 설정
- MCP 도구 통합으로 에이전트 생성 및 구성
- 실제 MCP 서버를 사용한 실습 예제 구현
- 에이전트 대화에서 도구 응답 및 인용 처리

## 사전 요구 사항

시작하기 전에 다음을 확인하세요:

- Microsoft Foundry에 액세스 가능한 Azure 구독
- Python 3.10+ 또는 .NET 8.0+
- 설치 및 구성된 Azure CLI
- AI 리소스 생성 권한

## Model Context Protocol (MCP)란?

Model Context Protocol은 AI 애플리케이션이 외부 데이터 소스 및 도구에 연결할 수 있는 표준화된 방법입니다. 주요 이점은 다음과 같습니다:

- **표준화된 통합**: 다양한 도구 및 서비스 간 일관된 인터페이스
- <strong>보안</strong>: 안전한 인증 및 권한 부여 메커니즘
- <strong>유연성</strong>: 다양한 데이터 소스, API 및 맞춤 도구 지원
- <strong>확장성</strong>: 새로운 기능 및 통합을 쉽게 추가 가능

## Microsoft Foundry와 MCP 설정

### 환경 구성

선호하는 개발 환경을 선택하세요:

- [Python 구현](#python-구현)
- [.NET 구현](#codeblock5)

---

## Python 구현

<strong><em>참고</em></strong> 이 [노트북](./mcp_support_python.ipynb)을 실행할 수 있습니다

### 1. 필요한 패키지 설치

```bash
pip install azure-ai-projects -U
pip install azure-ai-agents==1.1.0b4 -U
pip install azure-identity -U
pip install mcp==1.11.0 -U
```

### 2. 의존성 가져오기

```python
import os, time
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import McpTool, RequiredMcpToolCall, SubmitToolApprovalAction, ToolApproval
```

### 3. MCP 설정 구성

```python
mcp_server_url = os.environ.get("MCP_SERVER_URL", "https://learn.microsoft.com/api/mcp")
mcp_server_label = os.environ.get("MCP_SERVER_LABEL", "mslearn")
```

### 4. 프로젝트 클라이언트 초기화

```python
project_client = AIProjectClient(
    endpoint="https://your-project-endpoint.services.ai.azure.com/api/projects/your-project",
    credential=DefaultAzureCredential(),
)
```

### 5. MCP 도구 생성

```python
mcp_tool = McpTool(
    server_label=mcp_server_label,
    server_url=mcp_server_url,
    allowed_tools=[],  # 선택 사항: 허용된 도구 지정
)
```

### 6. 완성된 Python 예제

```python
with project_client:
    agents_client = project_client.agents

    # MCP 도구로 새 에이전트 생성
    agent = agents_client.create_agent(
        model="Your AOAI Model Deployment",
        name="my-mcp-agent",
        instructions="You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
        tools=mcp_tool.definitions,
    )
    print(f"Created agent, ID: {agent.id}")
    print(f"MCP Server: {mcp_tool.server_label} at {mcp_tool.server_url}")

    # 통신을 위한 스레드 생성
    thread = agents_client.threads.create()
    print(f"Created thread, ID: {thread.id}")

    # 스레드에 메시지 생성
    message = agents_client.messages.create(
        thread_id=thread.id,
        role="user",
        content="What's difference between Azure OpenAI and OpenAI?",
    )
    print(f"Created message, ID: {message.id}")

    # 도구 승인 처리 및 에이전트 실행
    mcp_tool.update_headers("SuperSecret", "123456")
    run = agents_client.runs.create(thread_id=thread.id, agent_id=agent.id, tool_resources=mcp_tool.resources)
    print(f"Created run, ID: {run.id}")

    while run.status in ["queued", "in_progress", "requires_action"]:
        time.sleep(1)
        run = agents_client.runs.get(thread_id=thread.id, run_id=run.id)

        if run.status == "requires_action" and isinstance(run.required_action, SubmitToolApprovalAction):
            tool_calls = run.required_action.submit_tool_approval.tool_calls
            if not tool_calls:
                print("No tool calls provided - cancelling run")
                agents_client.runs.cancel(thread_id=thread.id, run_id=run.id)
                break

            tool_approvals = []
            for tool_call in tool_calls:
                if isinstance(tool_call, RequiredMcpToolCall):
                    try:
                        print(f"Approving tool call: {tool_call}")
                        tool_approvals.append(
                            ToolApproval(
                                tool_call_id=tool_call.id,
                                approve=True,
                                headers=mcp_tool.headers,
                            )
                        )
                    except Exception as e:
                        print(f"Error approving tool_call {tool_call.id}: {e}")

            if tool_approvals:
                agents_client.runs.submit_tool_outputs(
                    thread_id=thread.id, run_id=run.id, tool_approvals=tool_approvals
                )

        print(f"Current run status: {run.status}")

    print(f"Run completed with status: {run.status}")

    # 대화 표시
    messages = agents_client.messages.list(thread_id=thread.id)
    print("\nConversation:")
    print("-" * 50)
    for msg in messages:
        if msg.text_messages:
            last_text = msg.text_messages[-1]
            print(f"{msg.role.upper()}: {last_text.text.value}")
            print("-" * 50)
```

---

## .NET 구현

<strong><em>참고</em></strong> 이 [노트북](./mcp_support_dotnet.ipynb)을 실행할 수 있습니다

### 1. 필요한 패키지 설치

```csharp
#r "nuget: Azure.AI.Agents.Persistent, 1.1.0-beta.4"
#r "nuget: Azure.Identity, 1.14.2"
```

### 2. 의존성 가져오기

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;
```

### 3. 설정 구성

```csharp
var projectEndpoint = "https://your-project-endpoint.services.ai.azure.com/api/projects/your-project";
var modelDeploymentName = "Your AOAI Model Deployment";
var mcpServerUrl = "https://learn.microsoft.com/api/mcp";
var mcpServerLabel = "mslearn";
PersistentAgentsClient agentClient = new(projectEndpoint, new DefaultAzureCredential());
```

### 4. MCP 도구 정의 생성

```csharp
MCPToolDefinition mcpTool = new(mcpServerLabel, mcpServerUrl);
```

### 5. MCP 도구와 함께 에이전트 생성

```csharp
PersistentAgent agent = await agentClient.Administration.CreateAgentAsync(
   model: modelDeploymentName,
   name: "my-learn-agent",
   instructions: "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
   tools: [mcpTool]
   );
```

### 6. 완성된 .NET 예제

```csharp
// Create thread and message
PersistentAgentThread thread = await agentClient.Threads.CreateThreadAsync();

PersistentThreadMessage message = await agentClient.Messages.CreateMessageAsync(
    thread.Id,
    MessageRole.User,
    "What's difference between Azure OpenAI and OpenAI?");

// Configure tool resources with headers
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
ToolResources toolResources = mcpToolResource.ToToolResources();

// Create and handle run
ThreadRun run = await agentClient.Runs.CreateRunAsync(thread, agent, toolResources);

while (run.Status == RunStatus.Queued || run.Status == RunStatus.InProgress || run.Status == RunStatus.RequiresAction)
{
    await Task.Delay(TimeSpan.FromMilliseconds(1000));
    run = await agentClient.Runs.GetRunAsync(thread.Id, run.Id);

    if (run.Status == RunStatus.RequiresAction && run.RequiredAction is SubmitToolApprovalAction toolApprovalAction)
    {
        var toolApprovals = new List<ToolApproval>();
        foreach (var toolCall in toolApprovalAction.SubmitToolApproval.ToolCalls)
        {
            if (toolCall is RequiredMcpToolCall mcpToolCall)
            {
                Console.WriteLine($"Approving MCP tool call: {mcpToolCall.Name}");
                toolApprovals.Add(new ToolApproval(mcpToolCall.Id, approve: true)
                {
                    Headers = { ["SuperSecret"] = "123456" }
                });
            }
        }

        if (toolApprovals.Count > 0)
        {
            run = await agentClient.Runs.SubmitToolOutputsToRunAsync(thread.Id, run.Id, toolApprovals: toolApprovals);
        }
    }
}

// Display messages
using Azure;

AsyncPageable<PersistentThreadMessage> messages = agentClient.Messages.GetMessagesAsync(
    threadId: thread.Id,
    order: ListSortOrder.Ascending
);

await foreach (PersistentThreadMessage threadMessage in messages)
{
    Console.Write($"{threadMessage.CreatedAt:yyyy-MM-dd HH:mm:ss} - {threadMessage.Role,10}: ");
    foreach (MessageContent contentItem in threadMessage.ContentItems)
    {
        if (contentItem is MessageTextContent textItem)
        {
            Console.Write(textItem.Text);
        }
        else if (contentItem is MessageImageFileContent imageFileItem)
        {
            Console.Write($"<image from ID: {imageFileItem.FileId}>");
        }
        Console.WriteLine();
    }
}
```

---

## MCP 도구 구성 옵션

에이전트용 MCP 도구를 구성할 때 여러 중요 매개변수를 지정할 수 있습니다:

### Python 구성

```python
mcp_tool = McpTool(
    server_label="unique_server_name",      # MCP 서버 식별자
    server_url="https://api.example.com/mcp", # MCP 서버 엔드포인트
    allowed_tools=[],                       # 선택 사항: 허용된 도구 지정
)
```

### .NET 구성

```csharp
MCPToolDefinition mcpTool = new(
    "unique_server_name",                   // Server label
    "https://api.example.com/mcp"          // MCP server URL
);
```

## 인증 및 헤더

두 구현 모두 인증용 사용자 지정 헤더를 지원합니다:

### Python

```python
mcp_tool.update_headers("SuperSecret", "123456")
```

### .NET

```csharp
MCPToolResource mcpToolResource = new(mcpServerLabel);
mcpToolResource.UpdateHeader("SuperSecret", "123456");
```

## 일반적인 문제 해결

### 1. 연결 문제
- MCP 서버 URL 접근 가능 여부 확인
- 인증 자격 증명 확인
- 네트워크 연결 상태 점검

### 2. 도구 호출 실패
- 도구 인수 및 형식 점검
- 서버별 요구 사항 확인
- 적절한 오류 처리 구현

### 3. 성능 문제
- 도구 호출 빈도 최적화
- 적절한 캐싱 구현
- 서버 응답 시간 모니터링

## 다음 단계

MCP 통합을 더욱 향상하려면:

1. **맞춤 MCP 서버 탐색**: 독점 데이터 소스를 위한 자체 MCP 서버 구축
2. **고급 보안 구현**: OAuth2 또는 맞춤 인증 메커니즘 추가
3. **모니터링 및 분석**: 도구 사용에 대한 로깅 및 모니터링 구현
4. **솔루션 확장**: 부하 분산 및 분산 MCP 서버 아키텍처 고려

## 추가 리소스

- [Microsoft Foundry 문서](https://learn.microsoft.com/azure/ai-foundry/)
- [Model Context Protocol 샘플](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/model-context-protocol-samples)
- [Microsoft Foundry 에이전트 개요](https://learn.microsoft.com/azure/ai-foundry/agents/)
- [MCP 사양](https://spec.modelcontextprotocol.io/)

## 지원

추가 지원 및 질문이 필요하면:
- [Microsoft Foundry 문서](https://learn.microsoft.com/azure/ai-foundry/)를 검토하세요
- [MCP 커뮤니티 리소스](https://modelcontextprotocol.io/)를 확인하세요

## 다음 내용

- [5.14 MCP 컨텍스트 엔지니어링](../mcp-contextengineering/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->