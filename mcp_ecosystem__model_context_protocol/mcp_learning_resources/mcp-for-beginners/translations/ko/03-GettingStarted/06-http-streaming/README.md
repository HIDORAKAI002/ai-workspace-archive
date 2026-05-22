# HTTPS 스트리밍과 모델 컨텍스트 프로토콜(MCP)

이 장에서는 HTTPS를 사용하여 모델 컨텍스트 프로토콜(MCP)로 보안성, 확장성 및 실시간 스트리밍을 구현하는 포괄적인 가이드를 제공합니다. 스트리밍의 동기, 사용 가능한 전송 메커니즘, MCP에서 스트림 가능한 HTTP를 구현하는 방법, 보안 모범 사례, SSE에서의 마이그레이션, 그리고 스트리밍 MCP 애플리케이션을 구축하는 실용적인 지침을 다룹니다.

## MCP의 전송 메커니즘과 스트리밍

이 섹션에서는 MCP에서 사용할 수 있는 다양한 전송 메커니즘과 이들이 클라이언트와 서버 간 실시간 통신을 가능하게 하는 스트리밍 기능에서 어떤 역할을 하는지 살펴봅니다.

### 전송 메커니즘이란 무엇인가?

전송 메커니즘은 클라이언트와 서버 간 데이터가 교환되는 방식을 정의합니다. MCP는 다양한 환경과 요구 사항에 맞춰 여러 전송 유형을 지원합니다:

- **stdio**: 표준 입력/출력으로, 로컬 및 CLI 기반 도구에 적합합니다. 단순하지만 웹이나 클라우드에는 적합하지 않습니다.
- **SSE (Server-Sent Events)**: 서버가 HTTP를 통해 클라이언트에 실시간 업데이트를 푸시할 수 있게 합니다. 웹 UI에 적합하지만 확장성과 유연성에 제한이 있습니다. MCP 규격 2025-06-18 기준으로 독립적인 SSE 전송은 더 이상 사용되지 않으며 "Streamable HTTP" 전송으로 대체되었습니다.
- **Streamable HTTP**: 알림과 더 나은 확장성을 지원하는 최신 HTTP 기반 스트리밍 전송 방식입니다. 대부분의 프로덕션 및 클라우드 환경에서 권장됩니다.

### 비교 표

아래 비교 표를 보면 이러한 전송 메커니즘 간의 차이점을 이해할 수 있습니다:

| 전송 타입         | 실시간 업데이트 | 스트리밍 | 확장성      | 사용 사례                  |
|-------------------|----------------|---------|------------|---------------------------|
| stdio             | 아니오          | 아니오  | 낮음        | 로컬 CLI 도구             |
| SSE               | 예             | 예      | 중간        | 웹, 실시간 업데이트        |
| Streamable HTTP   | 예             | 예      | 높음        | 클라우드, 다중 클라이언트 |

> **팁:** 적절한 전송 방식을 선택하는 것은 성능, 확장성, 사용자 경험에 중요한 영향을 미칩니다. <strong>Streamable HTTP</strong>는 최신의 확장 가능하고 클라우드 대응 애플리케이션에 권장됩니다.

이전 장에서 소개한 stdio 및 SSE 전송과 달리, 이 장에서는 Streamable HTTP 전송에 대해 다룹니다.

## 스트리밍: 개념과 동기

스트리밍의 기본 개념과 동기를 이해하는 것은 효과적인 실시간 통신 시스템을 구현하는 데 필수적입니다.

<strong>스트리밍</strong>은 네트워크 프로그래밍에서 전체 응답이 준비될 때까지 기다리지 않고 데이터가 작고 관리 가능한 청크로 또는 이벤트 시퀀스로 전송되고 수신될 수 있게 하는 기술입니다. 특히 다음과 같은 경우에 유용합니다:

- 대용량 파일 또는 데이터셋.
- 실시간 업데이트(예: 채팅, 진행 표시줄).
- 사용자에게 진행 상황을 알려야 하는 장시간 실행되는 계산.

스트리밍에 대해 알아야 할 주요 사항은 다음과 같습니다:

- 데이터가 한꺼번에가 아니라 점진적으로 전달됩니다.
- 클라이언트는 도착하는 데이터를 즉시 처리할 수 있습니다.
- 지각 대기 시간이 줄어들어 사용자 경험이 향상됩니다.

### 왜 스트리밍을 사용하는가?

스트리밍 사용 이유는 다음과 같습니다:

- 사용자가 작업이 끝날 때까지 기다리지 않고 즉시 피드백을 받음
- 실시간 애플리케이션과 반응형 UI를 가능하게 함
- 네트워크와 컴퓨팅 자원의 효율적 사용

### 간단한 예: HTTP 스트리밍 서버 및 클라이언트

다음은 스트리밍이 어떻게 구현될 수 있는지에 대한 간단한 예입니다:

#### Python

**서버 (Python, FastAPI 및 StreamingResponse 사용):**

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

**클라이언트 (Python, requests 사용):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

이 예는 모든 메시지가 준비될 때까지 기다리지 않고, 서버가 준비되는 대로 일련의 메시지를 클라이언트에 전송하는 방식을 보여줍니다.

**작동 방식:**

- 서버는 각 메시지가 준비될 때마다 이를 yield합니다.
- 클라이언트는 도착하는 각 청크를 수신하고 출력합니다.

**요구 사항:**

- 서버는 스트리밍 응답(e.g., FastAPI의 `StreamingResponse`)을 사용해야 합니다.
- 클라이언트는 스트림으로 응답을 처리해야 합니다(`requests`의 `stream=True`).
- Content-Type은 보통 `text/event-stream` 또는 `application/octet-stream`입니다.

#### Java

**서버 (Java, Spring Boot 및 Server-Sent Events 사용):**

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

**클라이언트 (Java, Spring WebFlux WebClient 사용):**

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

**Java 구현 주석:**

- 반응형 스택 (`Flux`)을 활용하여 스트리밍
- `ServerSentEvent` 는 이벤트 타입을 갖는 구조화된 이벤트 스트리밍 제공
- `WebClient`의 `bodyToFlux()`를 통해 반응형 스트리밍 소비 가능
- `delayElements()`로 이벤트 간 처리 시간 시뮬레이션
- 이벤트별 `info` 및 `result` 타입 부여하여 클라이언트 처리 개선

### 비교: 클래식 스트리밍 vs MCP 스트리밍

클래식 방식의 스트리밍과 MCP 스트리밍이 어떻게 다른지 다음 표에서 확인할 수 있습니다:

| 특징                  | 클래식 HTTP 스트리밍             | MCP 스트리밍 (알림)                 |
|------------------------|-------------------------------|-------------------------------------|
| 주요 응답              | 청크 단위로 전송               | 단일 응답, 끝에 전달                 |
| 진행 상황 업데이트     | 데이터 청크로 전송             | 알림으로 전송                       |
| 클라이언트 요구 사항   | 스트림 처리 필요               | 메시지 핸들러 구현 필요              |
| 사용 사례              | 대용량 파일, AI 토큰 스트림   | 진행 상황, 로그, 실시간 피드백       |

### 관찰된 주요 차이점

추가로 주요 차이점은 다음과 같습니다:

- **통신 패턴:**
  - 클래식 HTTP 스트리밍: 간단한 청크 전송 인코딩 사용
  - MCP 스트리밍: JSON-RPC 프로토콜 기반 구조화된 알림 시스템 사용

- **메시지 형식:**
  - 클래식 HTTP: 줄바꿈 포함한 텍스트 청크
  - MCP: 메타데이터가 포함된 구조화된 LoggingMessageNotification 객체

- **클라이언트 구현:**
  - 클래식 HTTP: 스트리밍 응답을 처리하는 단순 클라이언트
  - MCP: 메시지 핸들러를 구현하여 다양한 메시지 유형 처리

- **진행 상황 업데이트:**
  - 클래식 HTTP: 진행 상황이 주요 응답 스트림의 일부
  - MCP: 주요 응답은 끝에 전송되고 진행 상황은 별도 알림 메시지로 전송

### 권장 사항

클래식 스트리밍(`/stream` 엔드포인트) 구현과 MCP 스트리밍 구현 간 선택 시 다음 사항들을 권장합니다.

- **간단한 스트리밍 요구:** 클래식 HTTP 스트리밍이 구현이 간단하며 기본적인 스트리밍에 충분합니다.

- **복잡하고 상호작용이 필요한 애플리케이션:** MCP 스트리밍은 더 풍부한 메타데이터와 알림과 최종 결과의 분리를 제공하는 구조적 접근법입니다.

- **AI 애플리케이션용:** 장시간 실행되는 AI 작업에서 진행 상황을 사용자에게 알리기 위해 MCP 알림 시스템이 특히 유용합니다.

## MCP에서의 스트리밍

이제까지 클래식 스트리밍과 MCP 스트리밍 차이에 대해 권장 사항과 비교를 보셨습니다. 이제 MCP에서 스트리밍을 어떻게 활용할 수 있는지 자세히 살펴봅시다.

MCP 프레임워크 내 스트리밍이 어떻게 작동하는지 이해하는 것은 장시간 실행 작업 중 사용자에게 실시간 피드백을 제공하는 반응형 애플리케이션을 구축하는 데 중요합니다.

MCP에서 스트리밍은 주요 응답을 청크로 나누어 보내는 것이 아니라, 툴이 요청을 처리하는 동안 **알림(notification)** 을 클라이언트로 전송하는 것입니다. 이 알림에는 진행 상황 업데이트, 로그, 기타 이벤트가 포함될 수 있습니다.

### 작동 방식

주요 결과는 여전히 단일 응답으로 전송됩니다. 그러나 처리 중에 알림이 별도의 메시지로 전송되어 클라이언트에 실시간으로 업데이트할 수 있습니다. 클라이언트는 이 알림을 수신하고 표시할 수 있어야 합니다.

## 알림(Notification)이란?

"알림"이란 무엇인가라고 했는데, MCP 맥락에서 이를 정의하면?

알림은 서버에서 클라이언트로 보내는 메시지로서, 장시간 실행 작업 중 진행 상황, 상태 또는 기타 이벤트를 알리기 위해 전송됩니다. 알림은 투명성과 사용자 경험을 개선합니다.

예를 들어, 클라이언트는 서버와의 초기 핸드셰이크가 완료되면 알림을 보내야 합니다.

알림은 JSON 메시지 형태로 다음과 같습니다:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

알림은 MCP 내 ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) 토픽에 속합니다.

로깅 기능을 작동시키려면 서버는 다음과 같이 기능/역량으로 활성화해야 합니다:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 사용 중인 SDK에 따라 로깅이 기본적으로 활성화되어 있거나 서버 설정에서 명시적으로 활성화해야 할 수 있습니다.

알림에는 여러 유형이 있습니다:

| 레벨     | 설명                          | 예제 사용 사례                 |
|-----------|-------------------------------|--------------------------------|
| debug     | 상세 디버깅 정보               | 함수 진입/종료 지점             |
| info      | 일반 정보 메시지              | 작업 진행 상황 업데이트         |
| notice    | 일반적이지만 중요한 이벤트    | 설정 변경                     |
| warning   | 경고 상황                    | 사용 중단된 기능 사용             |
| error     | 오류 상황                    | 작업 실패                     |
| critical  | 치명적인 상황                | 시스템 구성 요소 실패            |
| alert     | 즉각적 조치 필요              | 데이터 손상 탐지                |
| emergency | 시스템 사용 불가             | 전체 시스템 장애               |

## MCP에서 알림 구현

MCP에서 알림을 구현하려면 서버와 클라이언트 양쪽에서 실시간 업데이트를 처리하도록 설정해야 합니다. 이를 통해 장시간 실행 작업 중 즉각적인 피드백을 사용자에게 제공할 수 있습니다.

### 서버 측: 알림 전송

먼저 서버 측부터 시작합시다. MCP에서는 요청 처리 중 알림을 보낼 수 있는 툴을 정의합니다. 서버는 컨텍스트 객체(보통 `ctx`)를 사용하여 클라이언트에 메시지를 전송합니다.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

위 예제에서 `process_files` 툴은 각 파일을 처리할 때 클라이언트에 세 번의 알림을 보냅니다. `ctx.info()` 메서드는 정보 메시지 전송에 사용됩니다.

또한 알림을 활성화하려면 서버가 스트리밍 전송(`streamable-http` 등)을 사용하고 클라이언트가 알림을 처리할 메시지 핸들러를 구현해야 합니다. 서버에서 `streamable-http` 전송을 사용하는 방법은 다음과 같습니다:

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

이 .NET 예제에서 `ProcessFiles` 툴은 `Tool` 어트리뷰트가 적용되어 있으며 각 파일 처리 시 클라이언트에 세 번 알림을 보냅니다. `ctx.Info()` 메서드는 정보 메시지 전송에 이용됩니다.

.NET MCP 서버에서 알림을 활성화하려면 스트리밍 전송이 사용되고 있는지 확인하세요:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### 클라이언트 측: 알림 수신

클라이언트는 메시지 핸들러를 구현해야 하며, 도착하는 알림을 처리하고 표시할 수 있어야 합니다.

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

위 코드에서 `message_handler` 함수는 들어오는 메시지가 알림인지 확인합니다. 알림이면 출력하며, 아니면 일반 서버 메시지로 처리합니다. 또한 `ClientSession`은 도착하는 알림을 처리하기 위해 `message_handler`로 초기화됩니다.

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

이 .NET 예제에서 `MessageHandler` 함수는 들어오는 메시지가 알림인지 체크합니다. 알림이면 출력하고, 아니면 일반 서버 메시지로 처리합니다. `ClientSession`은 `ClientSessionOptions`를 통해 메시지 핸들러로 초기화됩니다.

알림 활성화를 위해 서버가 스트리밍 전송(`streamable-http` 등)을 사용하고 클라이언트가 알림 메시지 핸들러를 구현하는지 확인하세요.

## 진행 알림 및 시나리오

이 섹션에서는 MCP에서 진행 알림의 개념과 중요성, 그리고 Streamable HTTP를 통해 이를 구현하는 방법을 설명합니다. 또한 이해를 돕기 위한 실용적인 과제도 포함되어 있습니다.

진행 알림(progress notifications)은 장시간 작업 중 서버에서 클라이언트로 실시간으로 보내는 메시지입니다. 전체 프로세스가 끝날 때까지 기다리지 않고 서버가 현재 상태를 계속해서 알립니다. 이는 투명성, 사용자 경험을 높이고 디버깅도 용이하게 합니다.

**예시:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### 왜 진행 알림을 사용하는가?

진행 알림이 중요한 이유는 다음과 같습니다:

- **더 나은 사용자 경험:** 사용자가 작업 진행 상황을 실시간으로 볼 수 있음.
- **실시간 피드백:** 클라이언트는 진행 막대나 로그를 표시하며 앱을 반응형으로 느끼게 함.
- **디버깅 및 모니터링 용이:** 개발자와 사용자가 작업이 느리거나 멈춘 위치를 쉽게 확인 가능.

### 진행 알림 구현 방법

MCP에서 진행 알림을 구현하는 방법은 다음과 같습니다:

- **서버 측:** `ctx.info()` 또는 `ctx.log()`를 사용해 각 아이템 처리 시 알림을 전송. 이는 주요 결과가 준비되기 전에 클라이언트에 메시지를 보냅니다.
- **클라이언트 측:** 알림 도착을 듣고 표시하는 메시지 핸들러를 구현. 핸들러는 알림과 최종 결과를 구분합니다.

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

## 보안 고려 사항

HTTP 기반 전송을 사용하는 MCP 서버를 구현할 때 보안은 다양한 공격 지점과 보호 메커니즘에 세심한 주의가 필요한 매우 중요한 문제입니다.

### 개요

MCP 서버를 HTTP로 노출할 때 보안은 필수적입니다. Streamable HTTP는 새로운 공격 표면을 도입하여 신중한 구성이 요구됩니다.

### 핵심 사항

- **Origin 헤더 검증:** DNS 리바인딩 공격을 방지하기 위해 항상 `Origin` 헤더를 검증하세요.
- **로컬호스트 바인딩:** 로컬 개발 시 서버를 `localhost`에 바인딩하여 공개 인터넷 노출을 방지하세요.
- **인증:** 프로덕션 배포에선 인증(API 키, OAuth 등)을 구현하세요.
- **CORS:** 교차 출처 리소스 공유 정책을 설정해 접근을 제한하세요.
- **HTTPS:** 프로덕션에서는 HTTPS를 사용해 트래픽 암호화를 보장하세요.

### 모범 사례

- 검증 없이 들어오는 요청을 신뢰하지 마세요.
- 모든 접근 및 오류를 로깅하고 모니터링하세요.
- 보안 취약점 패치를 위해 의존성을 정기적으로 업데이트하세요.

### 도전과제
- 보안과 개발의 용이성의 균형 맞추기
- 다양한 클라이언트 환경과의 호환성 보장

## SSE에서 Streamable HTTP로 업그레이드하기

현재 Server-Sent Events(SSE)를 사용하는 애플리케이션의 경우, Streamable HTTP로 마이그레이션하면 향상된 기능과 MCP 구현의 장기적 유지 가능성을 제공합니다.

### 업그레이드가 필요한 이유

SSE에서 Streamable HTTP로 업그레이드해야 하는 두 가지 설득력 있는 이유가 있습니다:

- Streamable HTTP는 SSE보다 뛰어난 확장성, 호환성, 그리고 풍부한 알림 지원을 제공합니다.
- 새로운 MCP 애플리케이션에 권장되는 전송 방식입니다.

### 마이그레이션 단계

MCP 애플리케이션에서 SSE에서 Streamable HTTP로 마이그레이션하는 방법은 다음과 같습니다:

- 서버 코드를 `mcp.run()`에서 `transport="streamable-http"`로 업데이트합니다.
- 클라이언트 코드를 SSE 클라이언트 대신 `streamablehttp_client`를 사용하도록 업데이트합니다.
- 클라이언트에서 알림을 처리할 메시지 핸들러를 구현합니다.
- 기존 도구 및 워크플로와의 호환성을 테스트합니다.

### 호환성 유지

마이그레이션 과정에서 기존 SSE 클라이언트와의 호환성을 유지하는 것이 권장됩니다. 다음과 같은 전략이 있습니다:

- 서로 다른 엔드포인트에서 두 전송 방식을 동시에 실행하여 SSE와 Streamable HTTP를 모두 지원할 수 있습니다.
- 클라이언트를 점진적으로 새 전송 방식으로 마이그레이션합니다.

### 과제

마이그레이션 시 다음 과제를 반드시 해결해야 합니다:

- 모든 클라이언트가 업데이트되었는지 확인
- 알림 전달 방식의 차이 처리

## 보안 고려사항

어떤 서버를 구현하든, 특히 MCP의 Streamable HTTP 같은 HTTP 기반 전송을 사용할 때 보안은 최우선 과제여야 합니다.

HTTP 기반 전송을 사용하는 MCP 서버를 구현할 때는 여러 공격 벡터와 보호 메커니즘에 세심한 주의를 기울여야 합니다.

### 개요

MCP 서버를 HTTP를 통해 노출할 때 보안은 매우 중요합니다. Streamable HTTP는 새로운 공격 지점을 제공하며 신중한 구성과 관리가 필요합니다.

주요 보안 고려사항은 다음과 같습니다:

- **Origin 헤더 검증**: DNS 리바인딩 공격을 방지하기 위해 항상 `Origin` 헤더를 검증합니다.
- **로컬호스트 바인딩**: 로컬 개발 시 서버를 `localhost`에 바인딩하여 공개 인터넷에 노출되지 않도록 합니다.
- <strong>인증</strong>: 운영 환경에서는 API 키, OAuth 같은 인증을 구현합니다.
- **CORS**: 접근을 제한하기 위해 교차 출처 리소스 공유(CORS) 정책을 구성합니다.
- **HTTPS**: 운영 환경에서는 트래픽 암호화를 위해 HTTPS를 사용합니다.

### 모범 사례

MCP 스트리밍 서버에서 보안을 구현할 때 따를 모범 사례는 다음과 같습니다:

- 검증 없이 들어오는 요청을 신뢰하지 마세요.
- 모든 접근과 오류를 로깅하고 모니터링하세요.
- 보안 취약점 패치를 위해 의존성을 정기적으로 업데이트하세요.

### 과제

MCP 스트리밍 서버 보안 구현 중에는 다음과 같은 과제를 직면합니다:

- 보안과 개발 편의성 간의 균형 맞추기
- 다양한 클라이언트 환경과의 호환성 보장

### 과제: 직접 나만의 스트리밍 MCP 애플리케이션 만들기

**시나리오:**  
서버가 아이템 목록(예: 파일 또는 문서)을 처리하고 처리된 각 아이템에 대해 알림을 전송하는 MCP 서버와 클라이언트를 만드세요. 클라이언트는 도착하는 각 알림을 실시간으로 표시해야 합니다.

**단계:**

1. 목록을 처리하고 각 항목에 대해 알림을 보내는 서버 도구를 구현하세요.  
2. 알림을 실시간으로 표시할 메시지 핸들러가 있는 클라이언트를 구현하세요.  
3. 서버와 클라이언트를 함께 실행하여 구현을 테스트하고 알림이 잘 표시되는지 확인하세요.  

[Solution](./solution/README.md)

## 추가 학습 및 다음 단계

MCP 스트리밍을 계속 사용하고 지식을 확장하기 위해 이 섹션에서는 추가 리소스와 더 고급 애플리케이션을 만들기 위한 권장 다음 단계를 제공합니다.

### 추가 학습

- [Microsoft: HTTP 스트리밍 소개](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET Core에서 CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: 스트리밍 요청](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 다음 단계

- 실시간 분석, 채팅, 협업 편집에 스트리밍을 사용하는 더 고급 MCP 도구를 만들어보세요.
- MCP 스트리밍을 프론트엔드 프레임워크(React, Vue 등)와 통합하여 실시간 UI 업데이트를 구현해보세요.
- 다음: [VSCode용 AI 툴킷 활용하기](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->