# stdio 전송을 사용하는 MCP 서버

> **⚠️ 중요 업데이트**: MCP 사양 2025-06-18 버전부터 독립형 SSE(Server-Sent Events) 전송은 **더 이상 사용되지 않으며** "Streamable HTTP" 전송으로 대체되었습니다. 현재 MCP 사양은 두 가지 주요 전송 메커니즘을 정의합니다:
> 1. **stdio** - 표준 입력/출력 (로컬 서버에 권장)
> 2. **Streamable HTTP** - 내부적으로 SSE를 사용할 수 있는 원격 서버용
>
> 이 수업은 대부분의 MCP 서버 구현에 권장되는 <strong>stdio 전송</strong>에 초점을 맞추도록 업데이트되었습니다.

stdio 전송은 MCP 서버가 표준 입력과 출력 스트림을 통해 클라이언트와 통신할 수 있도록 합니다. 이는 현재 MCP 사양에서 가장 일반적으로 사용되고 권장되는 전송 메커니즘으로, 다양한 클라이언트 애플리케이션과 쉽게 통합할 수 있는 간단하고 효율적인 MCP 서버 구축 방식을 제공합니다.

## 개요

이 수업에서는 stdio 전송을 사용하는 MCP 서버를 구축하고 사용하는 방법을 다룹니다.

## 학습 목표

이 수업을 마치면 다음을 할 수 있습니다:

- stdio 전송을 사용하여 MCP 서버를 구축할 수 있습니다.
- Inspector를 사용하여 MCP 서버를 디버깅할 수 있습니다.
- Visual Studio Code에서 MCP 서버를 사용할 수 있습니다.
- 현재 MCP 전송 메커니즘과 stdio가 권장되는 이유를 이해할 수 있습니다.


## stdio 전송 - 작동 원리

stdio 전송은 현재 MCP 사양(2025-11-25)에서 지원하는 두 가지 전송 유형 중 하나입니다. 작동 방식은 다음과 같습니다:

- **간단한 통신**: 서버는 표준 입력(`stdin`)에서 JSON-RPC 메시지를 읽고 표준 출력(`stdout`)으로 메시지를 보냅니다.
- **프로세스 기반**: 클라이언트가 MCP 서버를 하위 프로세스로 실행합니다.
- **메시지 형식**: 메시지는 개별 JSON-RPC 요청, 알림 또는 응답이며, 줄바꿈으로 구분됩니다.
- <strong>로깅</strong>: 서버는 로깅 목적으로 UTF-8 문자열을 표준 오류(`stderr`)에 쓸 수 있습니다.

### 주요 요구사항:
- 메시지는 줄바꿈으로 구분되어야 하며, 내장된 줄바꿈을 포함해서는 안 됩니다.
- 서버는 유효한 MCP 메시지가 아닌 내용을 `stdout`에 작성해서는 안 됩니다.
- 클라이언트는 서버의 `stdin`에 유효하지 않은 MCP 메시지를 작성해서는 안 됩니다.

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

위 코드에서는:

- MCP SDK에서 `Server` 클래스와 `StdioServerTransport`를 가져옵니다.
- 기본 구성과 기능으로 서버 인스턴스를 생성합니다.
- `StdioServerTransport` 인스턴스를 생성하고 서버와 연결하여 stdin/stdout을 통한 통신을 활성화합니다.

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# 서버 인스턴스 생성
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

위 코드에서는:

- MCP SDK로 서버 인스턴스를 생성합니다.
- 데코레이터를 사용해 도구를 정의합니다.
- stdio_server 컨텍스트 관리자를 사용하여 전송을 처리합니다.

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

SSE와 다른 주요 차이점은 stdio 서버가:

- 웹 서버 설정이나 HTTP 엔드포인트가 필요하지 않습니다.
- 클라이언트가 하위 프로세스로 서버를 실행합니다.
- stdin/stdout 스트림을 통해 통신합니다.
- 구현 및 디버깅이 더 간단합니다.

## 실습: stdio 서버 만들기

서버를 만들려면 두 가지를 염두에 두어야 합니다:

- 연결과 메시지를 위한 엔드포인트를 노출하는 웹 서버가 필요하다.
## 실습: 간단한 MCP stdio 서버 만들기

이 실습에서는 권장되는 stdio 전송을 사용해 간단한 MCP 서버를 만듭니다. 이 서버는 클라이언트가 표준 모델 컨텍스트 프로토콜을 사용해 호출할 수 있는 도구를 노출합니다.

### 전제 조건

- Python 3.8 이상
- MCP Python SDK: `pip install mcp`
- 비동기 프로그래밍에 대한 기본 이해

먼저 첫 MCP stdio 서버를 만들어 봅시다:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# 로깅 구성
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 서버 생성
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # stdio 전송 사용
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## 더 이상 사용되지 않는 SSE 방식과의 주요 차이점

**Stdio 전송 (현재 표준):**
- 간단한 하위 프로세스 모델 - 클라이언트가 서버를 자식 프로세스로 실행
- stdin/stdout을 통한 JSON-RPC 메시지 사용 통신
- HTTP 서버 설정 불필요
- 더 나은 성능과 보안
- 디버깅 및 개발 용이

**SSE 전송 (MCP 2025-06-18 이후 사용 중단):**
- SSE 엔드포인트가 있는 HTTP 서버 필요
- 웹 서버 인프라 구축이 복잡
- HTTP 엔드포인트에 대한 추가 보안 고려 사항
- 웹 기반 시나리오를 위해 Streamable HTTP로 대체됨

### stdio 전송 서버 만들기

stdio 서버를 만들려면:

1. **필요한 라이브러리 가져오기** - MCP 서버 구성 요소와 stdio 전송 필요
2. **서버 인스턴스 생성** - 서버와 기능 정의
3. **도구 정의** - 노출할 기능 추가
4. **전송 설정** - stdio 통신 구성
5. **서버 실행** - 서버 시작 및 메시지 처리

단계별로 만들어 봅시다:

### 1단계: 기본 stdio 서버 생성

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# 로깅 구성
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 서버 생성
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### 2단계: 도구 추가

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### 3단계: 서버 실행하기

코드를 `server.py`로 저장하고 명령줄에서 실행하세요:

```bash
python server.py
```

서버가 시작되어 stdin에서 입력을 기다립니다. stdio 전송을 통해 JSON-RPC 메시지로 통신합니다.

### 4단계: Inspector로 테스트하기

MCP Inspector를 사용해 서버를 테스트할 수 있습니다:

1. Inspector 설치: `npx @modelcontextprotocol/inspector`
2. Inspector 실행 후 서버에 연결
3. 생성한 도구 테스트

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## stdio 서버 디버깅하기

### MCP Inspector 사용

MCP Inspector는 MCP 서버 디버깅 및 테스트에 유용한 도구입니다. stdio 서버와 함께 사용하는 방법은 다음과 같습니다:

1. **Inspector 설치**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Inspector 실행**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **서버 테스트**: Inspector 웹 인터페이스에서 다음 작업이 가능합니다:
   - 서버 기능 보기
   - 다양한 매개변수로 도구 테스트
   - JSON-RPC 메시지 모니터링
   - 연결 문제 디버깅

### VS Code 사용

VS Code에서 MCP 서버를 직접 디버깅할 수도 있습니다:

1. `.vscode/launch.json`에 실행 구성 만들기:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. 서버 코드에 중단점 설정
3. 디버거 실행 후 Inspector로 테스트

### 일반 디버깅 팁

- 로깅은 `stderr`에 작성 - `stdout`에는 MCP 메시지 전용
- 모든 JSON-RPC 메시지가 줄바꿈으로 구분되어 있는지 확인
- 복잡한 기능 추가 전 간단한 도구부터 테스트
- Inspector로 메시지 형식 검증

## VS Code에서 stdio 서버 사용하기

stdio MCP 서버를 구축한 후에는 VS Code와 통합하여 Claude 또는 기타 MCP 호환 클라이언트와 사용할 수 있습니다.

### 구성

1. Windows의 경우 `%APPDATA%\Claude\claude_desktop_config.json`, Mac의 경우 `~/Library/Application Support/Claude/claude_desktop_config.json`에 MCP 구성 파일 생성:

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Claude 재시작**: Claude를 종료했다가 다시 열어 새 서버 구성을 로드합니다.

3. **연결 테스트**: Claude와 대화를 시작하고 서버 도구를 사용해 봅니다:
   - "인사 도구로 인사해 줄래?"
   - "15와 27의 합을 계산해 줘"
   - "서버 정보가 뭐야?"

### TypeScript stdio 서버 예시

참고용 완전한 TypeScript 예시는 다음과 같습니다:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 도구 추가
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### .NET stdio 서버 예시

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## 요약

업데이트된 이 수업에서 다음을 배웠습니다:

- 현재 권장되는 <strong>stdio 전송</strong>을 사용해 MCP 서버를 구축하는 방법
- SSE 전송이 stdio 및 Streamable HTTP로 대체된 이유
- MCP 클라이언트가 호출할 수 있는 도구를 만드는 방법
- MCP Inspector를 사용해 서버를 디버그하는 방법
- VS Code와 Claude에 stdio 서버를 통합하는 방법

stdio 전송은 더 이상 사용되지 않는 SSE 방식에 비해 MCP 서버를 더 간단하고, 안전하며, 고성능으로 구축할 수 있는 방법입니다. 2025-06-18 사양 기준 대부분 MCP 서버 구현에 권장되는 전송 방식입니다.


### .NET

1. 먼저 도구를 만들어 봅시다. 이를 위해 다음 내용을 포함한 *Tools.cs* 파일을 만듭니다:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## 실습: stdio 서버 테스트하기

stdio 서버를 구축했으니 제대로 작동하는지 테스트해 봅시다.

### 전제 조건

1. MCP Inspector가 설치되어 있어야 합니다:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. 서버 코드는 저장되어 있어야 합니다 (예: `server.py`)

### Inspector로 테스트하기

1. **서버와 함께 Inspector 시작**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **웹 인터페이스 열기**: Inspector가 브라우저를 열어 서버 기능을 표시합니다.

3. **도구 테스트**: 
   - 다양한 이름으로 `get_greeting` 도구 사용해 보기
   - 여러 숫자로 `calculate_sum` 도구 테스트
   - `get_server_info` 호출해 서버 메타데이터 확인

4. **통신 모니터링**: Inspector는 클라이언트와 서버 간 주고받는 JSON-RPC 메시지를 보여줍니다.

### 예상되는 결과

서버가 정상 시작되면 다음을 볼 수 있습니다:
- Inspector에 서버 기능 목록 표시
- 테스트에 사용할 수 있는 도구
- 성공적인 JSON-RPC 메시지 교환
- 인터페이스에 표시되는 도구 응답

### 일반 발생 문제 및 해결법

**서버가 시작되지 않을 때:**
- 모든 종속성이 설치되었는지 확인: `pip install mcp`
- Python 문법 및 들여쓰기 확인
- 콘솔의 오류 메시지 확인

**도구가 나타나지 않을 때:**
- `@server.tool()` 데코레이터가 있어야 함
- 도구 함수가 `main()` 전에 정의되어야 함
- 서버 구성 확인

**연결 문제:**
- 서버가 stdio 전송을 올바르게 사용하는지 확인
- 다른 프로세스 간섭 여부 확인
- Inspector 명령어 구문 확인

## 과제

더 많은 기능으로 서버를 확장해 보세요. 예를 들어 [이 페이지](https://api.chucknorris.io/)를 참고해 API를 호출하는 도구를 추가할 수도 있습니다. 서버가 어떻게 생겼으면 하는지 결정하세요. 재미있게 해보세요 :)
## 솔루션

[솔루션](./solution/README.md) 작동하는 코드가 포함된 가능한 솔루션입니다.

## 주요 내용 요약

이 장의 주요 내용은 다음과 같습니다:

- stdio 전송은 로컬 MCP 서버에 권장되는 메커니즘입니다.
- stdio 전송은 표준 입력 및 출력 스트림을 사용해 MCP 서버와 클라이언트 간 원활한 통신을 지원합니다.
- Inspector와 Visual Studio Code를 모두 사용하여 stdio 서버를 직접 사용하고 디버깅 및 통합할 수 있습니다.

## 샘플

- [Java 계산기](../samples/java/calculator/README.md)
- [.Net 계산기](../../../../03-GettingStarted/samples/csharp)
- [JavaScript 계산기](../samples/javascript/README.md)
- [TypeScript 계산기](../samples/typescript/README.md)
- [Python 계산기](../../../../03-GettingStarted/samples/python) 

## 추가 자료

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## 다음 단계

## 다음 단계

stdio 전송을 사용해 MCP 서버를 구축하는 방법을 배웠으므로 다음 심화 주제를 탐색할 수 있습니다:

- <strong>다음</strong>: [MCP의 HTTP 스트리밍 (Streamable HTTP)](../06-http-streaming/README.md) - 원격 서버용으로 지원되는 다른 전송 메커니즘 학습
- <strong>고급</strong>: [MCP 보안 모범 사례](../../02-Security/README.md) - MCP 서버에 보안 구현
- <strong>운영</strong>: [배포 전략](../09-deployment/README.md) - 프로덕션 환경용 서버 배포

## 추가 자료

- [MCP 사양 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - 공식 사양
- [MCP SDK 문서](https://github.com/modelcontextprotocol/sdk) - 모든 언어용 SDK 참조
- [커뮤니티 예시](../../06-CommunityContributions/README.md) - 커뮤니티에서 만든 더 많은 서버 예시

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->