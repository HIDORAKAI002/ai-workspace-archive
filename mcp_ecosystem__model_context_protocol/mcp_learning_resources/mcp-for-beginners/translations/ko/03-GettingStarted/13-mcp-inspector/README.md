# MCP Inspector로 디버깅하기

**MCP Inspector**는 전체 AI 호스트 애플리케이션 없이도 MCP 서버를 대화형으로 테스트하고 문제를 해결할 수 있는 필수 디버깅 도구입니다. "MCP를 위한 Postman"으로 생각할 수 있으며, 요청을 보내고, 응답을 보고, 서버 동작 방식을 이해할 수 있는 시각적 인터페이스를 제공합니다.

## MCP Inspector를 사용하는 이유

MCP 서버를 구축할 때 자주 겪는 문제들:

- **"내 서버가 실행 중인가?"** - Inspector가 연결 상태를 보여줌
- **"내 도구들이 올바르게 등록되었나?"** - Inspector가 모든 도구 목록을 표시함
- **"응답 형식이 어떻게 되지?"** - Inspector가 전체 JSON 응답을 표시함
- **"이 도구가 왜 작동하지 않지?"** - Inspector가 상세한 오류 메시지를 보여줌

## 전제 조건

- Node.js 18 이상 설치
- npm (Node.js에 포함)
- 테스트할 MCP 서버 ([Module 3.1 - First Server](../01-first-server/README.md) 참조)

## 설치

### 옵션 1: npx로 실행 (빠른 테스트 권장)

```bash
npx @modelcontextprotocol/inspector
```

### 옵션 2: 전역 설치

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### 옵션 3: 프로젝트에 추가

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

`package.json`에 추가:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## 서버에 연결하기

### stdio 서버 (로컬 프로세스)

표준 입력/출력으로 통신하는 서버용:

```bash
# 파이썬 서버
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js 서버
npx @modelcontextprotocol/inspector node ./build/index.js

# 환경 변수 사용
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP 서버 (네트워크)

HTTP 서비스로 실행되는 서버용:

1. 먼저 서버를 시작하세요:
   ```bash
   python server.py  # 서버가 http://localhost:8080 에서 실행 중입니다
   ```

2. Inspector를 실행하고 연결하세요:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspector 인터페이스 개요

Inspector 실행 시 보이는 웹 인터페이스(보통 `http://localhost:5173`):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 도구 테스트

### 사용 가능한 도구 목록 확인

1. **Tools** 탭 클릭
2. Inspector가 자동으로 `tools/list` 호출
3. 등록된 모든 도구가 다음과 함께 표시됨:
   - 도구 이름
   - 설명
   - 입력 스키마(매개변수)

### 도구 호출하기

1. 목록에서 도구 선택
2. 폼에 필요한 매개변수 입력
3. **Run Tool** 클릭
4. 결과 패널에서 응답 확인

**예: 계산기 도구 테스트**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### 도구 오류 디버깅

도구 실패 시 Inspector가 보여주는 내용:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

일반 오류 코드:
| 코드 | 의미 |
|------|---------|
| -32700 | 파싱 오류 (잘못된 JSON) |
| -32600 | 잘못된 요청 |
| -32601 | 메서드 없음 |
| -32602 | 매개변수 오류 |
| -32603 | 내부 오류 |

---

## 리소스 테스트

### 리소스 목록 확인

1. **Resources** 탭 클릭
2. Inspector가 `resources/list` 호출
3. 다음 항목을 볼 수 있음:
   - 리소스 URI
   - 이름 및 설명
   - MIME 타입

### 리소스 읽기

1. 리소스 선택
2. **Read Resource** 클릭
3. 반환된 콘텐츠 확인

**예시 출력:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## 프롬프트 테스트

### 프롬프트 목록 확인

1. **Prompts** 탭 클릭
2. Inspector가 `prompts/list` 호출
3. 사용 가능한 프롬프트 템플릿 확인

### 프롬프트 가져오기

1. 프롬프트 선택
2. 필요한 인수 입력
3. **Get Prompt** 클릭
4. 렌더링된 프롬프트 메시지 확인

---

## 메시지 로그 분석

메시지 로그는 모든 MCP 프로토콜 메시지를 보여줌:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### 확인할 내용

- **요청/응답 쌍**: 각 `→`는 대응하는 `←`가 있어야 함
- **오류 메시지**: 응답에서 `"error"` 확인
- **시간 간격**: 큰 간격은 성능 문제 가능성
- **프로토콜 버전**: 서버와 클라이언트 버전 일치 여부 확인

---

## VS Code 통합

VS Code에서 Inspector를 직접 실행 가능:

### launch.json 사용

`.vscode/launch.json`에 추가:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### Tasks 사용

`.vscode/tasks.json`에 추가:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## 일반적인 디버깅 시나리오

### 시나리오 1: 서버 연결 실패

**증상:** Inspector가 "Disconnected" 표시하거나 "Connecting..." 상태에서 멈춤

**점검 목록:**
1. ✅ 서버 명령어가 올바른가?
2. ✅ 모든 종속성이 설치되었나?
3. ✅ 서버 경로가 절대 경로인지 현재 디렉터리 기준 상대 경로인지 확인
4. ✅ 필수 환경 변수 설정 여부

**디버그 단계:**
```bash
# 서버를 먼저 수동으로 테스트하세요
python -c "import your_server_module; print('OK')"

# 가져오기 오류를 확인하세요
python -m your_server_module 2>&1 | head -20

# MCP SDK가 설치되었는지 확인하세요
pip show mcp
```

### 시나리오 2: 도구 목록이 나타나지 않음

**증상:** Tools 탭에 빈 목록 표시

**가능 원인:**
1. 서버 초기화 중 도구가 등록되지 않음
2. 서버 시작 후 크래시 발생
3. `tools/list` 핸들러가 빈 배열 반환

**디버그 단계:**
1. 메시지 로그에서 `tools/list` 응답 확인
2. 도구 등록 코드에 로깅 추가
3. Python의 경우 `@mcp.tool()` 데코레이터 존재 여부 확인

### 시나리오 3: 도구 오류 반환

**증상:** 도구 호출 시 오류 응답

**디버그 방법:**
1. 오류 메시지 꼼꼼히 읽기
2. 매개변수 타입이 스키마와 일치하는지 확인
3. 상세 오류 메시지를 위한 try/catch 추가
4. 서버 로그에서 스택 트레이스 확인

**개선된 오류 처리 예:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # 여기 도구 로직
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### 시나리오 4: 리소스 내용이 비어 있음

**증상:** 리소스는 반환되나 내용이 비었거나 null

**점검 목록:**
1. ✅ 파일 경로나 URI가 정확한가
2. ✅ 서버에 리소스 읽기 권한이 있는가
3. ✅ 리소스 내용이 올바르게 반환되는가

---

## 고급 Inspector 기능

### 사용자 정의 헤더 (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### 자세한 로깅

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### 세션 기록

Inspector는 메시지 로그를 내보내서 나중에 분석할 수 있음:
1. 메시지 패널에서 **Export Log** 클릭
2. JSON 파일 저장
3. 팀과 공유하여 디버깅

---

## 모범 사례

1. **조기에 자주 테스트하세요** - 문제가 생겼을 때만이 아니라 개발 중에도 Inspector 사용
2. **단순하게 시작하세요** - 복잡한 도구 호출 전에 기본 연결부터 확인
3. **스키마 체크** - 많은 오류가 매개변수 타입 불일치에서 발생
4. **오류 메시지 읽기** - MCP 오류는 대체로 설명적임
5. **Inspector를 열어두세요** - 개발 중 문제를 발견하는 데 도움됨

---

## 다음 단계

Module 3: Getting Started를 완료했습니다! 학습을 계속하세요:

- [Module 4: Practical Implementation](../../04-PracticalImplementation/README.md)

---

## 추가 자료

- [MCP Inspector GitHub 저장소](https://github.com/modelcontextprotocol/inspector)
- [MCP 명세 - 프로토콜 메시지](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 명세](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 노력하고 있으나, 자동 번역에는 오류나 부정확성이 포함될 수 있음을 양지해 주시기 바랍니다. 원본 문서의 원어 버전이 권위 있는 출처로 간주되어야 합니다. 중요한 정보의 경우, 전문 인력에 의한 번역을 권장합니다. 본 번역 사용으로 인한 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->