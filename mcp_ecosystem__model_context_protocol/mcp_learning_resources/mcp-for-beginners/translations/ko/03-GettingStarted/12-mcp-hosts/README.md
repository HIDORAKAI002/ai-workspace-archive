# 인기 있는 MCP 호스트 클라이언트 설정

이 가이드는 인기 있는 AI 호스트 애플리케이션에서 MCP 서버를 구성하고 사용하는 방법을 다룹니다. 각 호스트는 자체 구성 방식을 가지고 있지만, 설정이 완료되면 모두 표준화된 프로토콜을 사용하여 MCP 서버와 통신합니다.

## MCP 호스트란?

**MCP 호스트**는 MCP 서버에 연결하여 기능을 확장할 수 있는 AI 애플리케이션입니다. 사용자가 상호작용하는 "프론트 엔드"로 생각할 수 있으며, MCP 서버는 "백 엔드" 도구와 데이터를 제공합니다.

```mermaid
flowchart LR
    User[👤 사용자] --> Host[🖥️ MCP 호스트]
    Host --> S1[MCP 서버 A]
    Host --> S2[MCP 서버 B]
    Host --> S3[MCP 서버 C]
    
    subgraph "인기 호스트"
        H1[클로드 데스크톱]
        H2[VS 코드]
        H3[커서]
        H4[클라인]
        H5[윈드서프]
    end
```
## 사전 준비 사항

- 연결할 MCP 서버 (자세한 내용은 [Module 3.1 - First Server](../01-first-server/README.md) 참조)
- 시스템에 설치된 호스트 애플리케이션
- JSON 구성 파일에 대한 기본 이해

---

## 1. Claude Desktop

**Claude Desktop**은 Anthropic의 공식 데스크톱 애플리케이션으로 MCP를 네이티브로 지원합니다.

### 설치

1. [claude.ai/download](https://claude.ai/download)에서 Claude Desktop 다운로드
2. 설치 후 Anthropic 계정으로 로그인

### 구성

Claude Desktop은 MCP 서버를 정의하기 위해 JSON 구성 파일을 사용합니다.

**구성 파일 위치:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**구성 예시:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### 구성 옵션

| 필드 | 설명 | 예시 |
|-------|-------------|---------|
| `command` | 실행할 실행 파일 | `"python"`, `"node"`, `"npx"` |
| `args` | 명령행 인수 | `["-m", "my_server"]` |
| `env` | 환경 변수 | `{"API_KEY": "xxx"}` |
| `cwd` | 작업 디렉터리 | `"/path/to/server"` |

### 설정 테스트

1. 구성 파일 저장
2. Claude Desktop 완전히 재시작 (종료 후 다시 열기)
3. 새 대화 열기
4. 연결된 서버를 나타내는 🔌 아이콘 확인
5. Claude에게 도구 중 하나를 사용해 보라고 요청

### Claude Desktop 문제 해결

**서버가 나타나지 않는 경우:**
- JSON 유효성 검사 도구로 구성 파일 문법 확인
- 명령 경로가 올바른지 확인
- Claude Desktop 로그 확인: 도움말 → 로그 표시

**서버가 시작 시 충돌하는 경우:**
- 터미널에서 서버를 수동으로 먼저 테스트
- 환경 변수 올바른 설정 확인
- 모든 종속 항목 설치 여부 확인

---

## 2. VS Code 및 GitHub Copilot

VS Code는 GitHub Copilot Chat 확장 기능을 통해 MCP를 지원합니다.

### 사전 준비

1. VS Code 1.99 이상 설치
2. GitHub Copilot 확장 설치
3. GitHub Copilot Chat 확장 설치

### 구성

VS Code는 작업 공간 또는 사용자 설정에 `.vscode/mcp.json` 파일을 사용합니다.

**작업 공간 구성** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**사용자 설정** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### VS Code에서 MCP 사용하기

1. Copilot Chat 패널 열기 (Ctrl+Shift+I / Cmd+Shift+I)
2. `@` 입력하여 사용 가능한 MCP 도구 보기
3. 자연어로 도구 호출: "계산기 사용하여 25 * 48 계산하기"

### VS Code 문제 해결

**MCP 서버 로드 실패:**
- 출력 패널 → "MCP"에서 오류 로그 확인
- 창 새로 고침: Ctrl+Shift+P → "Developer: Reload Window"
- 서버가 독립 실행형으로 먼저 작동하는지 확인

---

## 3. Cursor

**Cursor**는 MCP를 내장한 AI 중심 코드 에디터입니다.

### 설치

1. [cursor.sh](https://cursor.sh)에서 Cursor 다운로드
2. 설치 후 로그인

### 구성

Cursor는 Claude Desktop과 비슷한 구성 형식을 사용합니다.

**구성 파일 위치:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**구성 예시:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Cursor에서 MCP 사용하기

1. Cursor의 AI 채팅 열기 (Ctrl+L / Cmd+L)
2. MCP 도구가 제안에 자동으로 나타남
3. 연결된 서버를 사용해 AI에게 작업 요청

---

## 4. Cline (터미널 기반)

**Cline**은 터미널 기반 MCP 클라이언트로 명령줄 작업에 적합합니다.

### 설치

```bash
npm install -g @anthropic/cline
```

### 구성

Cline은 환경 변수와 명령행 인수를 사용합니다.

**환경 변수 사용:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**명령행 인수 사용:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**구성 파일** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Cline 사용법

```bash
# 대화형 세션 시작
cline

# MCP로 단일 쿼리
cline "Calculate the square root of 144 using the calculator"

# 사용 가능한 도구 목록
cline --list-tools
```

---

## 5. Windsurf

**Windsurf**는 MCP를 지원하는 또 다른 AI 기반 코드 에디터입니다.

### 설치

1. [codeium.com/windsurf](https://codeium.com/windsurf)에서 Windsurf 다운로드
2. 설치 후 계정 생성

### 구성

Windsurf 구성은 설정 UI를 통해 관리됩니다:

1. 설정 열기 (Ctrl+, / Cmd+,)
2. "MCP" 검색
3. "settings.json에서 편집" 클릭

**구성 예시:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## 전송 방식 비교

각 호스트는 다양한 전송 방식을 지원합니다:

| 호스트 | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (표준 입력/출력): 호스트가 시작한 로컬 서버에 가장 적합  
**SSE/HTTP**: 원격 서버나 여러 클라이언트에서 공유하는 서버에 가장 적합

---

## 공통 문제 해결

### 서버가 시작되지 않을 때

1. **서버를 수동으로 먼저 테스트:**
   ```bash
   # 파이썬용
   python -m your_server_module
   
   # Node.js용
   node /path/to/server/index.js
   ```

2. **명령 경로 확인:**
   - 가능하면 절대 경로 사용
   - 실행 파일이 PATH에 포함되어 있는지 확인

3. **종속 항목 확인:**
   ```bash
   # 파이썬
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### 서버는 연결되지만 도구가 작동하지 않을 때

1. **서버 로그 확인** - 대부분의 호스트는 로깅 옵션 제공
2. **도구 등록 확인** - MCP Inspector로 테스트
3. **권한 확인** - 일부 도구는 파일/네트워크 접근 권한 필요

### 환경 변수가 전달되지 않을 때

- 일부 호스트는 환경 변수를 필터링함
- `env` 구성 필드를 명시적으로 사용
- 구성 파일에 민감한 데이터 포함하지 말 것 (비밀 관리 사용)

---

## 보안 모범 사례

1. **API 키를 구성 파일에 절대 커밋하지 말 것**
2. **민감한 데이터는 환경 변수로 관리**
3. **서버 권한은 필요한 범위로 제한**
4. **시스템 접근 권한 부여 전 서버 코드 검토**
5. **파일 시스템 및 네트워크 접근에 허용 목록 사용**

---

## 다음 단계

- [3.13 - MCP Inspector로 디버깅하기](../13-mcp-inspector/README.md)
- [3.1 - 첫 번째 MCP 서버 만들기](../01-first-server/README.md)
- [모듈 5 - 고급 주제](../../05-AdvancedTopics/README.md)

---

## 추가 자료

- [Claude Desktop MCP 문서](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [VS Code MCP 확장](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [MCP 명세 - 전송 방식](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [공식 MCP 서버 레지스트리](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 노력하고 있으나, 자동 번역은 오류나 부정확성이 포함될 수 있음을 유의해 주시기 바랍니다. 원본 문서의 원어 버전이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우 전문적인 사람에 의한 번역을 권장합니다. 본 번역 사용으로 인한 어떠한 오해나 잘못된 해석에 대해서도 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->