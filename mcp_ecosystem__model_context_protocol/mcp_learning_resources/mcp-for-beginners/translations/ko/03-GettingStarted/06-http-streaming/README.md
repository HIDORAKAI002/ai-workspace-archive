# 모델 컨텍스트 프로토콜(MCP)을 이용한 HTTPS 스트리밍

이 장에서는 HTTPS를 사용하여 모델 컨텍스트 프로토콜(MCP)로 보안성, 확장성, 실시간 스트리밍을 구현하는 종합 가이드를 제공합니다. 스트리밍의 동기, 사용 가능한 전송 메커니즘, MCP에서 스트리밍 가능한 HTTP 구현 방법, 보안 모범 사례, SSE에서의 마이그레이션, 그리고 자체 스트리밍 MCP 애플리케이션을 구축하는 실용적인 지침을 다룹니다.

> **앞을 내다보며:** 이 강의는 세션이 `initialize` 동안 성립되고 `Mcp-Session-Id` 헤더로 고정되는 **MCP 사양 2025-11-25** 하에서의 스트리밍 가능한 HTTP를 설명합니다. `2026-07-28` 릴리스 후보 버전에서는 핸드셰이크와 세션 ID를 완전히 제거하여 모든 요청이 자체 포함되고 스티키 세션 없이도 모든 서버 인스턴스에 라우팅될 수 있도록 합니다. 자세한 내용은 [MCP 변화 사항: 2026-07-28 릴리스 후보](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)를 참고하세요.

## MCP의 전송 메커니즘과 스트리밍

이 섹션에서는 MCP에서 사용 가능한 다양한 전송 메커니즘과 이들이 클라이언트와 서버 간 실시간 통신을 가능하게 하는 스트리밍 기능에 어떤 역할을 하는지 살펴봅니다.

### 전송 메커니즘이란?

전송 메커니즘은 클라이언트와 서버 간 데이터가 교환되는 방식을 정의합니다. MCP는 다양한 환경과 요구를 충족하기 위해 여러 전송 유형을 지원합니다:

- **stdio**: 표준 입출력으로, 로컬과 CLI 기반 도구에 적합합니다. 간단하지만 웹이나 클라우드에는 적합하지 않습니다.
- **SSE (서버 전송 이벤트)**: 서버가 HTTP를 통해 클라이언트에 실시간 업데이트를 푸시할 수 있게 합니다. 웹 UI에는 좋지만 확장성과 유연성에 한계가 있습니다. MCP 사양 2025-06-18부터 독립형 SSE 전송은 폐기되고 "스트리밍 가능한 HTTP" 전송으로 대체되었습니다.
- **스트리밍 가능한 HTTP**: 알림과 더 나은 확장성을 지원하는 최신 HTTP 기반 스트리밍 전송입니다. 대부분의 프로덕션 및 클라우드 시나리오에 권장됩니다.

### 비교 표

아래 비교 표를 보면 이 전송 메커니즘들의 차이를 이해할 수 있습니다:

| 전송 수단          | 실시간 업데이트 | 스트리밍 | 확장성     | 사용 사례               |
|-------------------|----------------|----------|-----------|------------------------|
| stdio             | 아니요         | 아니요   | 낮음      | 로컬 CLI 도구          |
| SSE               | 예             | 예       | 중간      | 웹, 실시간 업데이트    |
| 스트리밍 가능한 HTTP | 예             | 예       | 높음      | 클라우드, 다중 클라이언트 |

> **팁:** 적절한 전송 수단을 선택하는 것은 성능, 확장성, 사용자 경험에 영향을 미칩니다. <strong>스트리밍 가능한 HTTP</strong>는 현대적이고 확장 가능하며 클라우드 준비된 애플리케이션에 권장됩니다.

앞 장에서 보여준 stdio와 SSE 전송과 이번 장에서 다루는 스트리밍 가능한 HTTP 전송을 비교해 보세요.

## 스트리밍: 개념과 동기

스트리밍의 기본 개념과 동기를 이해하는 것은 효과적인 실시간 통신 시스템을 구현하는 데 필수적입니다.

<strong>스트리밍</strong>은 전체 응답이 준비될 때까지 기다리지 않고, 데이터가 작은 청크나 일련의 이벤트로 나뉘어 전송 및 수신될 수 있도록 하는 네트워크 프로그래밍 기법입니다. 특히 다음에 유용합니다:

- 대용량 파일 또는 데이터셋
- 실시간 업데이트(예: 채팅, 진행 바)
- 사용자에게 계속 정보를 제공하고자 하는 장시간 실행 계산

스트리밍에 대해 알아야 할 주요 사항은 다음과 같습니다:

- 데이터가 점진적으로 전달되며 한 번에 모두 전달되지 않습니다.
- 클라이언트가 도착하는 데이터를 즉시 처리할 수 있습니다.
- 체감 지연이 줄어들고 사용자 경험이 향상됩니다.

### 왜 스트리밍을 사용하는가?

스트리밍을 사용하는 이유는 다음과 같습니다:

- 사용자가 끝까지 기다리지 않고 즉시 피드백을 받을 수 있습니다.
- 실시간 애플리케이션과 반응형 UI를 가능하게 합니다.
- 네트워크 및 계산 자원을 더 효율적으로 사용합니다.

### 간단한 예제: HTTP 스트리밍 서버 및 클라이언트

스트리밍을 구현하는 간단한 예제입니다:

#### 파이썬

**서버 (파이썬, FastAPI와 StreamingResponse 사용):**

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time

app = FastAPI()

async def event_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)

@app.get("/stream")
def stream():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**클라이언트 (파이썬, requests 사용):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

이 예제는 서버가 모든 메시지가 준비될 때까지 기다리지 않고 메시지를 순차적으로 클라이언트에 전송하는 것을 보여줍니다.

**작동 원리:**

- 서버는 준비되는 즉시 각 메시지를 전달합니다.
- 클라이언트는 도착하는 각 청크를 수신하여 출력합니다.

**필요 조건:**

- 서버는 스트리밍 응답을 사용해야 합니다(예: FastAPI의 `StreamingResponse`).
- 클라이언트는 응답을 스트림으로 처리해야 합니다(`requests`에서 `stream=True`).
- Content-Type은 보통 `text/event-stream` 또는 `application/octet-stream`입니다.

#### 자바

**서버 (자바, Spring Boot와 Server-Sent Events 사용):**

```java
@RestController
public class CalculatorController {

    @GetMapping(value = "/calculate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> calculate(@RequestParam double a,
                                                   @RequestParam double b,
                                                   @RequestParam String op) {
        
        double result;
        switch (op) {
            case "add": result = a + b; break;
            case "sub": result = a - b; break;
            case "mul": result = a * b; break;
            case "div": result = b != 0 ? a / b : Double.NaN; break;
            default: result = Double.NaN;
        }

        return Flux.<ServerSentEvent<String>>just(
                    ServerSentEvent.<String>builder()
                        .event("info")
                        .data("Calculating: " + a + " " + op + " " + b)
                        .build(),
                    ServerSentEvent.<String>builder()
                        .event("result")
                        .data(String.valueOf(result))
                        .build()
                )
                .delayElements(Duration.ofSeconds(1));
    }
}
```

**클라이언트 (자바, Spring WebFlux WebClient 사용):**

```java
@SpringBootApplication
public class CalculatorClientApplication implements CommandLineRunner {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:8080")
            .build();

    @Override
    public void run(String... args) {
        client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/calculate")
                        .queryParam("a", 7)
                        .queryParam("b", 5)
                        .queryParam("op", "mul")
                        .build())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(System.out::println)
                .blockLast();
    }
}
```

**자바 구현 참고사항:**

- Spring Boot의 반응형 스택과 `Flux`를 사용하여 스트리밍
- `ServerSentEvent`는 이벤트 타입과 함께 구조화된 이벤트 스트리밍을 제공
- `WebClient`의 `bodyToFlux()`는 반응형 스트리밍 처리 가능
- `delayElements()`는 이벤트 간 처리 시간을 시뮬레이션
- 이벤트는 클라이언트 처리를 위한 `info`, `result` 등의 타입을 가질 수 있음

### 비교: 고전적 스트리밍 vs MCP 스트리밍

고전적인 방식과 MCP에서의 스트리밍 작동 방식을 비교하면 다음과 같습니다:

| 특징                   | 고전 HTTP 스트리밍                | MCP 스트리밍 (알림)               |
|------------------------|---------------------------------|---------------------------------|
| 주 응답                 | 청크 단위                        | 단일, 마지막에                    |
| 진행 업데이트           | 데이터 청크로 전송               | 알림으로 전송                     |
| 클라이언트 요구사항      | 스트림 처리 필요                 | 메시지 핸들러 구현 필요           |
| 사용 사례               | 대용량 파일, AI 토큰 스트림      | 진행 상태, 로그, 실시간 피드백    |

### 주요 차이점

추가로, 다음과 같은 주요 차이점들이 있습니다:

- **통신 패턴:**  
  - 고전 HTTP 스트리밍: 단순 청크 전송 인코딩 사용  
  - MCP 스트리밍: JSON-RPC 프로토콜을 사용하는 구조화된 알림 시스템  

- **메시지 형식:**  
  - 고전 HTTP: 줄바꿈을 포함한 일반 텍스트 청크  
  - MCP: 메타데이터가 포함된 구조화된 LoggingMessageNotification 객체  

- **클라이언트 구현:**  
  - 고전 HTTP: 단순 스트림 응답 처리 클라이언트  
  - MCP: 다양한 메시지 타입 처리를 위한 메시지 핸들러가 포함된 정교한 클라이언트  

- **진행 업데이트:**  
  - 고전 HTTP: 진행 상태가 주 응답 스트림의 일부  
  - MCP: 진행 상태는 별도 알림 메시지로 전송되며 주 응답은 마지막에 도착  

### 권장사항

위에서 보여준 `/stream` 엔드포인트를 사용하는 고전적 스트리밍과 MCP 스트리밍 중 선택할 때 권장하는 사항들이 있습니다.


- **간단한 스트리밍이 필요할 경우:** 클래식 HTTP 스트리밍은 구현이 더 간단하며 기본 스트리밍 요구 사항에 충분합니다.

- **복잡하고 인터랙티브한 애플리케이션의 경우:** MCP 스트리밍은 더 풍부한 메타데이터와 알림 및 최종 결과 간 분리를 통해 보다 구조화된 접근 방식을 제공합니다.

- **AI 애플리케이션의 경우:** MCP의 알림 시스템은 진행 상황을 사용자에게 지속적으로 알리고자 하는 장기 실행 AI 작업에 특히 유용합니다.

## MCP에서의 스트리밍

자, 지금까지 클래식 스트리밍과 MCP 스트리밍 간의 차이에 대해 몇 가지 추천 및 비교를 보았습니다. 이제 MCP에서 스트리밍을 어떻게 활용할 수 있는지 자세히 살펴보겠습니다.

MCP 프레임워크 내에서 스트리밍이 어떻게 작동하는지 이해하는 것은 장기 실행 작업 중에 사용자에게 실시간 피드백을 제공하는 응답성 높은 애플리케이션을 구축하는 데 필수적입니다.

MCP에서는 스트리밍이 주 응답을 청크로 보내는 것이 아니라 도구가 요청을 처리하는 동안 클라이언트에 <strong>알림</strong>을 보내는 것입니다. 이러한 알림은 진행 상황 업데이트, 로그 또는 기타 이벤트를 포함할 수 있습니다.

### 작동 방식

주요 결과는 여전히 단일 응답으로 전송됩니다. 그러나 알림은 처리 중 별도의 메시지로 전송되어 클라이언트를 실시간으로 업데이트할 수 있습니다. 클라이언트는 이러한 알림을 처리하고 표시할 수 있어야 합니다.

## 알림이란 무엇인가?

"알림"이라고 했는데, MCP 맥락에서 무슨 의미일까요?

알림은 장기 실행 작업 중 진행 상황, 상태 또는 기타 이벤트를 알리기 위해 서버가 클라이언트에 보내는 메시지입니다. 알림은 투명성과 사용자 경험을 향상시킵니다.

예를 들어, 클라이언트는 서버와의 초기 핸드셰이크가 완료되면 알림을 보내야 합니다.

알림은 JSON 메시지로 다음과 같습니다:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

알림은 MCP에서 ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging)이라는 주제에 속합니다.

> **폐기 알림:** `2026-07-28` MCP 사양 릴리스 후보는 stdio 전송을 위한 `stderr`와 구조적 관측성을 위한 OpenTelemetry를 선호하며 Logging 원시형은 폐기 예정임을 표시합니다. Logging은 `2025-11-25` 버전과 공식 폐기 이후 최소 1년간 계속 작동합니다. 자세한 내용은 [MCP 변경 사항: 2026-07-28 릴리스 후보](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)를 참조하세요.

로깅을 작동시키려면 서버에서 다음과 같이 기능/능력으로 활성화해야 합니다:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 사용하는 SDK에 따라 로깅이 기본적으로 활성화되어 있거나, 서버 구성에서 명시적으로 활성화해야 할 수도 있습니다.

다양한 유형의 알림이 있습니다:

| 레벨        | 설명                         | 사용 사례 예                  |
|-------------|------------------------------|------------------------------|
| debug       | 상세한 디버깅 정보            | 함수 진입/종료 시점           |
| info        | 일반 정보 메시지             | 작업 진행 상황 업데이트       |
| notice      | 정상적이지만 의미 있는 이벤트 | 구성 변경                     |
| warning     | 경고 조건                   | 폐기된 기능 사용               |
| error       | 오류 조건                   | 작업 실패                     |
| critical    | 치명적인 조건               | 시스템 구성 요소 실패          |
| alert       | 즉시 조치를 취해야 함        | 데이터 손상 감지               |
| emergency   | 시스템 사용 불능             | 전체 시스템 고장              |

## MCP에서 알림 구현하기

MCP에서 알림을 구현하려면 서버와 클라이언트 쪽 모두 실시간 업데이트를 처리할 수 있도록 설정해야 합니다. 이렇게 하면 장기 실행 작업 중 사용자에게 즉각적인 피드백을 제공할 수 있습니다.

### 서버 측: 알림 보내기

서버 측부터 시작해 보겠습니다. MCP에서는 도구가 요청을 처리하는 동안 알림을 보낼 수 있도록 정의합니다. 서버는 컨텍스트 객체(일반적으로 `ctx`)를 사용해 클라이언트에 메시지를 보냅니다.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

이전 예시에서 `process_files` 도구는 각 파일을 처리하면서 세 번의 알림을 클라이언트에 보냅니다. `ctx.info()` 메서드는 정보 메시지를 보내는 데 사용됩니다.

또한 알림을 활성화하려면 서버가 스트리밍 전송(예: `streamable-http`)을 사용하고 클라이언트가 알림을 처리할 메시지 핸들러를 구현해야 합니다. 서버를 `streamable-http` 전송 사용으로 설정하는 방법은 다음과 같습니다:

```python
mcp.run(transport="streamable-http")
```

#### .NET

```csharp
[Tool("A tool that sends progress notifications")]
public async Task<TextContent> ProcessFiles(string message, ToolContext ctx)
{
    await ctx.Info("Processing file 1/3...");
    await ctx.Info("Processing file 2/3...");
    await ctx.Info("Processing file 3/3...");
    return new TextContent
    {
        Type = "text",
        Text = $"Done: {message}"
    };
}
```

이 .NET 예시에서 `ProcessFiles` 도구는 `Tool` 속성으로 장식되어 있으며 각 파일을 처리하면서 세 번의 알림을 클라이언트에 보냅니다. `ctx.Info()` 메서드는 정보 메시지를 보내는 데 사용됩니다.

.NET MCP 서버에서 알림을 활성화하려면 스트리밍 전송을 사용하고 있는지 확인하세요:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 클라이언트 측: 알림 받기

클라이언트는 도착하는 알림을 처리하고 표시할 메시지 핸들러를 구현해야 합니다.

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)

async with ClientSession(
   read_stream, 
   write_stream,
   logging_callback=logging_collector,
   message_handler=message_handler,
) as session:
```

상기 코드에서 `message_handler` 함수는 수신된 메시지가 알림인지 확인합니다. 알림이면 출력하고, 아니면 일반 서버 메시지로 처리합니다. 또한 `ClientSession`이 수신 알림을 처리할 메시지 핸들러와 함께 초기화되는 방법도 보여줍니다.

#### .NET

```csharp
// Define a message handler
void MessageHandler(IJsonRpcMessage message)
{
    if (message is ServerNotification notification)
    {
        Console.WriteLine($"NOTIFICATION: {notification}");
    }
    else
    {
        Console.WriteLine($"SERVER MESSAGE: {message}");
    }
}

// Create and use a client session with the message handler
var clientOptions = new ClientSessionOptions
{
    MessageHandler = MessageHandler,
    LoggingCallback = (level, message) => Console.WriteLine($"[{level}] {message}")
};

using var client = new ClientSession(readStream, writeStream, clientOptions);
await client.InitializeAsync();

// Now the client will process notifications through the MessageHandler
```

이 .NET 예시에서 `MessageHandler` 함수는 수신된 메시지가 알림인지 확인합니다. 알림일 경우 출력하고, 그렇지 않으면 일반 서버 메시지로 처리합니다. `ClientSession`은 `ClientSessionOptions`를 통해 메시지 핸들러와 함께 초기화됩니다.

알림을 활성화하려면 서버가 스트리밍 전송(예: `streamable-http`)을 사용하고 클라이언트가 알림을 처리할 메시지 핸들러를 구현해야 합니다.

## 진행 상황 알림 및 시나리오

이 섹션에서는 MCP에서 진행 상황 알림 개념, 그 중요성, 그리고 Streamable HTTP를 사용해 구현하는 방법을 설명합니다. 또한 이해도를 높이기 위한 실습 과제가 포함되어 있습니다.

진행 상황 알림은 장기 실행 작업 중 서버가 클라이언트에 보내는 실시간 메시지입니다. 전체 프로세스가 완료될 때까지 기다리지 않고 서버가 현재 상태를 지속해서 클라이언트에 알립니다. 이는 투명성과 사용자 경험을 개선하고 디버깅을 용이하게 합니다.

**예:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 진행 상황 알림을 사용하는 이유

진행 상황 알림이 중요한 이유는 다음과 같습니다:

- **더 나은 사용자 경험:** 작업이 진행됨에 따라 사용자가 업데이트를 볼 수 있으며, 결과만 보는 것이 아닙니다.
- **실시간 피드백:** 클라이언트는 진행 막대나 로그를 표시해 애플리케이션이 반응하고 있음을 느끼게 합니다.
- **디버깅 및 모니터링 용이:** 개발자 및 사용자는 프로세스가 느리거나 막힌 위치를 쉽게 알 수 있습니다.

### 진행 상황 알림 구현 방법

MCP에서 진행 상황 알림을 구현하는 방법은 다음과 같습니다:

- **서버에서:** 각 항목이 처리될 때 `ctx.info()` 또는 `ctx.log()`를 사용해 알림을 보냅니다. 이는 주 결과가 준비되기 전에 클라이언트에 메시지를 보냅니다.

- **클라이언트 측:** 도착하는 알림을 수신하고 표시하는 메시지 핸들러를 구현합니다. 이 핸들러는 알림과 최종 결과를 구분합니다.

**서버 예제:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**클라이언트 예제:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## 보안 고려사항

HTTP 기반 전송을 사용하는 MCP 서버를 구현할 때, 보안은 여러 공격 벡터와 보호 메커니즘에 세심한 주의가 필요한 가장 중요한 문제입니다.

### 개요

MCP 서버를 HTTP로 노출할 때 보안은 매우 중요합니다. 스트리밍 HTTP는 새로운 공격 표면을 도입하며 신중한 구성이 필요합니다.

### 핵심 사항

- **Origin 헤더 검증**: DNS 리바인딩 공격을 방지하기 위해 항상 `Origin` 헤더를 검증해야 합니다.
- **로컬호스트 바인딩**: 로컬 개발 시 서버를 `localhost`에 바인딩하여 공개 인터넷 노출을 방지합니다.
- <strong>인증</strong>: 프로덕션 배포 시 인증(예: API 키, OAuth)을 구현해야 합니다.
- **CORS**: 접근을 제한하기 위해 교차 출처 리소스 공유(CORS) 정책을 구성합니다.
- **HTTPS**: 트래픽 암호화를 위해 프로덕션에서는 HTTPS를 사용해야 합니다.

### 모범 사례

- 검증 없는 인커밍 요청을 절대 신뢰하지 마십시오.
- 모든 접근과 오류를 기록하고 모니터링하십시오.
- 보안 취약점을 수정하기 위해 의존성을 정기적으로 업데이트하십시오.

### 도전 과제

- 보안과 개발 용이성의 균형 맞추기
- 다양한 클라이언트 환경과의 호환성 보장

## SSE에서 스트리밍 HTTP로 업그레이드하기

현재 서버 전송 이벤트(SSE)를 사용하는 애플리케이션의 경우, 스트리밍 HTTP로 마이그레이션하면 향상된 기능과 장기적인 지속 가능성을 제공합니다.

### 업그레이드 이유

SSE에서 스트리밍 HTTP로 업그레이드해야 하는 두 가지 주요 이유가 있습니다:

- 스트리밍 HTTP는 SSE보다 더 나은 확장성, 호환성, 풍부한 알림 지원을 제공합니다.
- 이는 새로운 MCP 애플리케이션에 권장되는 전송 방식입니다.

### 마이그레이션 단계

MCP 애플리케이션을 SSE에서 스트리밍 HTTP로 마이그레이션하는 방법은 다음과 같습니다:

- **서버 코드 업데이트**: `mcp.run()`에서 `transport="streamable-http"`로 변경합니다.
- **클라이언트 코드 업데이트**: SSE 클라이언트 대신 `streamablehttp_client`를 사용합니다.
- **메시지 핸들러 구현**: 클라이언트에 알림을 처리할 핸들러를 추가합니다.
- **호환성 테스트**: 기존 도구 및 워크플로우와의 호환성을 검증합니다.

### 호환성 유지

마이그레이션 진행 중 기존 SSE 클라이언트와의 호환성 유지를 권장합니다. 다음은 몇 가지 전략입니다:

- SSE와 스트리밍 HTTP를 각각 다른 엔드포인트에서 동시에 지원할 수 있습니다.
- 클라이언트를 점진적으로 새 전송 방식으로 이전합니다.

### 도전 과제

마이그레이션 중 다음과 같은 도전 과제를 해결해야 합니다:

- 모든 클라이언트가 업데이트되도록 보장
- 알림 전달 방식의 차이를 처리

## 보안 고려사항

MCP에서 스트리밍 HTTP와 같은 HTTP 기반 전송을 사용할 때는 서버 구현 시 보안이 최우선이어야 합니다.

HTTP 기반 전송을 사용하는 MCP 서버를 구현할 때, 보안은 여러 공격 벡터와 보호 메커니즘에 세심한 주의가 필요한 가장 중요한 문제입니다.

### 개요

MCP 서버를 HTTP로 노출할 때 보안은 매우 중요합니다. 스트리밍 HTTP는 새로운 공격 표면을 도입하며 신중한 구성이 필요합니다.

다음은 주요 보안 고려사항입니다:

- **Origin 헤더 검증**: DNS 리바인딩 공격을 방지하기 위해 항상 `Origin` 헤더를 검증해야 합니다.
- **로컬호스트 바인딩**: 로컬 개발 시 서버를 `localhost`에 바인딩하여 공개 인터넷 노출을 방지합니다.
- <strong>인증</strong>: 프로덕션 배포 시 인증(예: API 키, OAuth)을 구현해야 합니다.
- **CORS**: 접근을 제한하기 위해 교차 출처 리소스 공유(CORS) 정책을 구성합니다.
- **HTTPS**: 트래픽 암호화를 위해 프로덕션에서는 HTTPS를 사용해야 합니다.

### 모범 사례

MCP 스트리밍 서버의 보안을 구현할 때 다음 모범 사례를 따르십시오:

- 검증 없는 인커밍 요청을 절대 신뢰하지 마십시오.
- 모든 접근과 오류를 기록하고 모니터링하십시오.
- 보안 취약점을 수정하기 위해 의존성을 정기적으로 업데이트하십시오.

### 도전 과제

MCP 스트리밍 서버 보안 구현 시 다음과 같은 도전 과제가 있습니다:

- 보안과 개발 용이성의 균형 맞추기
- 다양한 클라이언트 환경과의 호환성 보장

### 과제: 직접 스트리밍 MCP 앱 구축하기

**시나리오:**
아이템 목록(예: 파일 또는 문서)을 처리하고 각 아이템 처리 시 알림을 보내는 MCP 서버와 클라이언트를 구축합니다. 클라이언트는 도착하는 알림을 실시간으로 표시해야 합니다.

**단계:**

1. 목록을 처리하고 각 아이템에 대해 알림을 보내는 서버 도구를 구현합니다.
2. 알림을 실시간으로 표시할 메시지 핸들러를 포함한 클라이언트를 구현합니다.
3. 서버와 클라이언트를 실행하여 알림을 관찰하며 구현을 테스트합니다.

[솔루션](./solution/README.md)

## 추가 자료 및 다음 단계

MCP 스트리밍 여정을 계속하고 지식을 확장하기 위해 이 섹션에서는 추가 리소스와 고급 애플리케이션 구축을 위한 다음 단계를 제공합니다.

### 추가 자료

- [Microsoft: HTTP 스트리밍 소개](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: 서버 전송 이벤트 (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET Core에서의 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: 스트리밍 요청](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 다음 단계

- 실시간 분석, 채팅 또는 공동 편집에 스트리밍을 사용하는 더 고급 MCP 도구를 만들어 보세요.
- 프론트엔드 프레임워크(React, Vue 등)와 MCP 스트리밍을 통합하여 라이브 UI 업데이트를 탐색해 보세요.
- 다음: [VSCode용 AI 툴킷 활용](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->