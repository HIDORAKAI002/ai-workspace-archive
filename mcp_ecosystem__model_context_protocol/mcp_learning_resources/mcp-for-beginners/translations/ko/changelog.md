# 변경 로그: MCP 초보자 커리큘럼

이 문서는 Model Context Protocol (MCP) 초보자 커리큘럼에 이루어진 모든 주요 변경 사항을 기록합니다. 변경 사항은 역순으로 기록되어 있습니다(최신 변경 사항이 먼저 나옴).

## 2026년 6월 24일

### 새로운 강의: Copilot 앱에서 MCP 사용하기

- [도구 섹션](./12-tooling/README.md) 도구 섹션 추가됨.
- [Copilot 앱에서 MCP](./12-tooling/01-copilot-app/README.md)

## 2026년 6월 16일

### MCP 사양 정렬 및 샘플 검증

현재 **MCP Specification 2025-11-25** 및 최신 공식 SDK와 커리큘럼을 비교 검토한 후, 오래된 사양 참조를 수정하고 핵심 샘플들이 여전히 빌드 및 실행되는 것을 확인했습니다.

#### 사양 버전 수정 (2025-06-18 / 2025-03-26 → 2025-11-25)

구버전 사양이 현재/최신 표준으로 잘못 표기된 영어 콘텐츠를 업데이트하고, 링크를 정식 `modelcontextprotocol.io` 사양 경로로 변경했습니다:
- **05-AdvancedTopics/mcp-security/README.md**: "현재 표준" 배너, 소개, 핵심 보안 원칙 제목, 필수 요구사항 제목, Microsoft Entra ID 섹션, 참고 자료 링크 및 보안 공지(8개 링크)를 2025-11-25로 업데이트
- **05-AdvancedTopics/mcp-transport/README.md**: 추가 자료 사양 링크와 "현재 표준" 배너를 2025-11-25로 업데이트
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: 이전 `2025-03-26` 보안 및 신뢰 링크를 현재 2025-11-25 보안 최선 사례 페이지로 대체
- **03-GettingStarted/14-sampling/README.md**: 공식 샘플링 문서 링크를 2025-11-25로 업데이트
- **03-GettingStarted/05-stdio-server/README.md**: 현재형 "현재 MCP 사양" 참조와 추가 자료 사양 링크를 2025-11-25로 업데이트 (역사적 SSE 폐기 노트는 사실성 유지를 위해 그대로 둠)

#### 현재 SDK에 따른 샘플 검증

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` 로 `@modelcontextprotocol/sdk@1.29.0` 설치됨; `tsc --noEmit` 실행 시 타입 오류 없이 통과 — 기존 `McpServer`/`StdioServerTransport` API 유효 확인
- **Python (03-GettingStarted/01-first-server/solution/python)**: 격리 된 `.venv`에서 `mcp[cli]`(1.27.2)로 검증; `py_compile` 통과 및 `FastMCP.list_tools()`가 `add`와 `subtract` 도구를 정확히 반환
- 모든 샘플의 `@modelcontextprotocol/sdk` 버전 범위(`>=1.26.0` / `^1.26.0` / `^1.27.0`)가 현재 `1.29.0`으로 문제 없이 해석됨을 확인

#### 의존성 버전 정렬 (버전 격차 해소)

모든 샘플이 현재 MCP 릴리스를 추적하도록 구버전 SDK 핀을 조정하여 저장소 전반의 관례와 맞춤:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk`를 `^1.8.0`에서 `>=1.26.0`로 상향 조정하고 `"updated for MCP 2025-06-18"` 패키지 설명을 `"aligned with MCP Specification 2025-11-25"`로 수정
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 및 **lab4/code/github_mcp_server/pyproject.toml**: 정확한 핀 `mcp==1.23.0`에서 `mcp>=1.26.0`으로 상향 조정; 두 `uv.lock` 파일 `uv lock` 재생성하여 현재 `mcp 1.27.2`를 잠금파일에서 해결되도록 하고 매니페스트와 동기화 유지

#### 커리큘럼 갭 분석 — 최신 사양 기능 적용

MCP 2025-11-25에서 소개하거나 확장한 모든 원시 기능을 커리큘럼이 이미 다루고 있어 콘텐츠 갭이 없음을 확인:
- <strong>샘플링</strong>: 03-GettingStarted/14-sampling 및 05-AdvancedTopics/mcp-sampling
- **유도 (URL 모드 포함)**: 01-CoreConcepts 및 05-AdvancedTopics/mcp-protocol-features에 문서화됨
- <strong>루트</strong>: 00-Introduction, 01-CoreConcepts, 05-AdvancedTopics/mcp-root-contexts에 문서화됨
- **작업(실험적, 장기 실행 작업)**: 01-CoreConcepts, 05-AdvancedTopics/mcp-protocol-features에 문서화됨
- **도구 주석**(`readOnlyHint` / `destructiveHint`): 01-CoreConcepts, 05-AdvancedTopics/mcp-protocol-features에 문서화됨

### 보안 강화 및 의존성 취약점 수정

모든 의존성 매니페스트와 샘플 소스 코드를 전면 보안 점검한 후 모든 npm 권고 사항과 한 건의 코드 수준 문제를 수정함. 수정을 적용한 후 `npm audit`은 모든 감사 디렉터리에서 <strong>0 취약점</strong>을 보고함.

#### npm 의존성 취약점(전이) — 수정 완료

커밋된 15개 `package-lock.json` 파일 전수 감사. 취약점은 MCP Inspector 개발 도구, OpenAI 클라이언트, MCP SDK가 불러오는 전이 의존성에 제한되었으며, 모두 샘플에 영향없이 해결됨:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 및 **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`) 상향 조정으로 패키지 내 `ajv`, `brace-expansion`, `diff`, `path-to-regexp`, `ws` 권고 사항 해소. npm `overrides`에 패치된 `shell-quote@1.8.4` 강제 적용해 `concurrently`가 가진 남은 치명적 권고 사항 제거; 잠금파일 재생성 후 0 취약점 확인
- **03-GettingStarted/samples/typescript**: `npm audit fix`로 중간 등급 `qs` 패치 릴리스로 수정
- **03-GettingStarted/samples/javascript**: `npm audit fix`로 중간 등급 `hono` 패치 릴리스로 수정
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix`로 고등급 `form-data` 패치 릴리스로 수정
- **03-GettingStarted/11-simple-auth/solution/typescript**: 누락된 `package-lock.json` 생성으로 프로젝트 재현 및 감사 가능하게 함 (0 취약점)

#### 코드 수준 보안 수정 (OWASP A03: 인젝션)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `open_in_vscode` 도구에서 `shell=True` 제거. 이전 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)`는 폴더 경로 내 쉘 메타문자가 `cmd.exe`에 의해 해석되는 명령 인젝션 위험이 있었음. 이제 쉘 없이 폴더 인자를 가지고 `Code.exe`를 직접 실행하여 기능적으로 동일하면서 안전함

#### Python 의존성 감사

- 모든 Python 요구사항 세트를 `pip-audit`로 감사. `05-AdvancedTopics` 와 `03-GettingStarted/samples/python`에서 **알려진 취약점 없음** 보고됨 (각 `mcp` / `httpx` / `pydantic` / `python-dotenv` 범위가 최신 패치 릴리스와 일치)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit`가 세 건의 `safe_join` 윈도우 디바이스명 DoS 권고(`CVE-2025-66221`, `CVE-2026-21860`, `CVE-2026-27199`)가 보고된 전이 의존성 **`werkzeug` 3.1.1**을 지적—모두 3.1.6에서 수정됨. 명시적 보안 핀 `werkzeug>=3.1.6` 추가하여 패치 릴리스 해석; `chainlit` / `mcp` / `semantic-kernel` 스택과 함께 제한이 정상 작동함을 확인

### 제품명 리브랜딩

모든 커리큘럼 콘텐츠를 Microsoft 제품 리브랜딩에 맞게 업데이트:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord 커뮤니티 링크 업데이트
- **AGENTS.md**: Discord 서버 참조 업데이트
- **README.md**: 기술 생태계 참조 업데이트
- **study_guide.md**: 사례 연구 참조 업데이트
- **05-AdvancedTopics/README.md**: 모듈 5.13 제목과 설명 업데이트
- **05-AdvancedTopics/mcp-integration/README.md**: 섹션 헤더와 설명 업데이트
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: 모듈 제목과 콘텐츠 전체 업데이트
- **05-AdvancedTopics/mcp-security-entra/README.md**: 교차 참조 링크 업데이트
- **07-LessonsfromEarlyAdoption/README.md**: 사례 연구 참조 업데이트
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: 9절 헤더, 배지 및 기능 업데이트
- **08-BestPractices/README.md**: Discord 커뮤니티 링크 업데이트
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord 채널 참조 업데이트
- **09-CaseStudy/docs-mcp/solution/python/README.md**: 모델 배포 참조 업데이트
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI 서비스 표 업데이트
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: 리소스 참조 업데이트

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: 메인 커리큘럼 참조 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: 모듈 제목, 개요 및 모듈 내 모든 헤더 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: 제목, 학습 목표, 설정 지침 및 리소스 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: 제목, 학습 목표, MCP 호스트 테이블 및 교차 참조 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: 제목, 배지, 선수 조건 및 리소스 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: 에이전트 빌더 참조 및 피드백 링크 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: 선수 조건 및 확장 참조 업데이트

---

## 2026년 4월 11일

### 새로운 강의, 문서 수정 및 의존성 업데이트

#### 신규 커리큘럼 콘텐츠 추가

**모듈 05 - 고급 주제**
- **강의 5.17: MCP를 활용한 적대적 다중 에이전트 추론** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): 다중 에이전트 시스템의 적대적 토론 패턴을 포괄적으로 다루는 신규 가이드
  - Mermaid 아키텍처 다이어그램: 두 에이전트 → 공유 MCP 서버 → 토론 기록 → 심판 → 판결
  - Python 및 TypeScript로 구현된 공유 MCP 도구 서버 (`web_search` + `run_python`)
  - 명시적 도구 사용 요구 사항이 있는 상반된 시스템 프롬프트 (찬성 / 반대 / 심판)
  - 라운드 및 주장 라우팅을 관리하는 Python, TypeScript, C# 토론 조율자
  - 조율자를 위한 MCP `ClientSession` 연결로 실제 도구 호출
  - 사용 사례 표 (환각 감지, 위협 모델링, API 설계 검토, 사실 검증, 기술 선택)
  - 보안 고려 사항: 샌드박스 실행, 도구 호출 검증, 속도 제한, 감사 로깅
  - 코드 검토, 아키텍처 결정, 콘텐츠 검열의 세 가지 실용적 시나리오가 포함된 구조화된 연습

#### 문서 수정

**모듈 03 - 시작하기**
- **05-stdio-server/README.md**: 불완전한 TypeScript stdio 서버 예제 수정 — 누락된 전송 인스턴스화(`new StdioServerTransport()`) 및 `server.connect(transport)` 호출 추가, Python과 .NET 예제와 일치하도록 수정
- **14-sampling/README.md**: 오타 수정 — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### 커리큘럼 업데이트

**주요 README.md**
- 강의 5.17 (MCP를 활용한 적대적 다중 에이전트 추론)을 커리큘럼 표에 새 강의로 추가

**05-AdvancedTopics/README.md**
- 강의 5.17 행을 강의 표에 추가

**study_guide.md**
- 고급 주제 마인드맵과 서술 설명에 적대적 다중 에이전트 추론 토픽 추가

#### 코드 및 보안 수정

**모듈 05 - 적대적 에이전트 (`mcp-adversarial-agents`)**
- **보안 수정 — 명령어 삽입 방지**: TypeScript `run_python` 도구에서 `execSync` 쉘 인터폴레이션을 `execFile` + `promisify`로 대체하여 명령어 삽입 취약점 제거 (이제 LLM이 제어하는 코드는 쉘 개입 없이 리터럴 argv 요소로 전달됨)
- **MCP 도구 루프 배선**: Python 토론 조율기를 동기 `Anthropic`에서 비동기 `AsyncAnthropic` 클라이언트로 변경, 각 에이전트 턴에 라이브 `ClientSession` 직접 전달, 매 턴마다 `session.list_tools()`로 도구 정의 가져오기, 모델이 최종 텍스트 응답을 보낼 때까지 루프 내에서 `session.call_tool()`로 `tool_use` 블록 디스패치

#### 의존성 업데이트

- 여러 패키지(03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)에서 `hono`를 4.12.12로 업그레이드
- TypeScript 패키지에서 `@hono/node-server`를 1.19.11에서 1.19.13로 업그레이드
- Python 패키지(10-StreamliningAIWorkflows 실습 3 및 4)에서 `cryptography`를 46.0.5에서 46.0.7로 업그레이드
- 10-StreamliningAIWorkflows 인스펙터에서 `lodash`를 4.17.23에서 4.18.1로 업그레이드

#### 번역

- 48개 이상 언어에 대해 최신 소스 변경 사항과 번역 동기화(i18n 업데이트)

---

## 2026년 2월 5일

### 저장소 전체 검증 및 탐색 개선

#### 새로운 교육 과정 내용 추가

**모듈 03 - 시작하기**
- **12-mcp-hosts/README.md**: MCP 호스트 설정에 대한 새로운 종합 가이드
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf 구성 예시
  - 주요 모든 호스트용 JSON 구성 템플릿
  - 전송 유형 비교표(stdio, SSE/HTTP, WebSocket)
  - 일반적인 연결 문제 해결
  - 호스트 구성 보안 모범 사례

- **13-mcp-inspector/README.md**: MCP Inspector 디버깅 가이드
  - 설치 방법(npx, npm 글로벌, 소스에서 설치)
  - stdio 및 HTTP/SSE를 통한 서버 연결
  - 테스트 도구, 리소스, 프롬프트 워크플로우
  - VS Code와 MCP Inspector 통합
  - 일반 디버깅 시나리오 및 해결책

**모듈 04 - 실제 구현**
- **pagination/README.md**: 새로운 페이지네이션 구현 가이드
  - Python, TypeScript, Java의 커서 기반 페이지네이션 패턴
  - 클라이언트 측 페이지네이션 처리
  - 커서 설계 전략(불투명 vs. 구조화)
  - 성능 최적화 권장 사항

**모듈 05 - 고급 주제**
- **mcp-protocol-features/README.md**: 신규 프로토콜 기능 심층 분석
  - 진행 알림 구현
  - 요청 취소 패턴
  - URI 패턴을 포함한 리소스 템플릿
  - 서버 수명 주기 관리
  - 로깅 레벨 제어
  - JSON-RPC 코드의 오류 처리 패턴

#### 탐색 수정 (24개 이상 파일 업데이트)

**주요 모듈 README**
 첫 수업과 다음 모듈 모두로 연결되는 링크 추가

**02-Security 하위 파일**
- 5개의 보조 보안 문서 모두에 "다음 단계" 탐색 추가

**09-CaseStudy 파일**
- 모든 사례 연구 파일에 연속 탐색 추가

**10-StreamliningAI 실습**
모듈 10 개요 및 모듈 11에 다음 단계 섹션 추가

#### 코드 및 콘텐츠 수정

**SDK 및 의존성 업데이트**
빈 openai 버전을 `^4.95.0`으로 수정
SDK를 `^1.8.0`에서 `>=1.26.0`으로 업데이트
mcp 버전 핀을 `>=1.26.0`으로 업데이트

**코드 수정**
잘못된 모델 `gpt-4o-mini`를 `gpt-4.1-mini`로 수정

**콘텐츠 수정**
깨진 링크 `READMEmd` → `README.md` 수정, 교육 과정 헤더 `Module 1-3` → `Module 0-3`으로 수정, 대소문자 경로 문제 수정
손상된 중복 사례 연구 5 콘텐츠 제거

**초보자 안내 개선**
초보자를 위한 적절한 소개, 학습 목표 및 선수 조건 추가

#### 커리큘럼 업데이트

**주요 README.md**
- 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) 항목 커리큘럼 표에 추가

**모듈 README**
수업 12 및 13을 수업 목록에 추가
실용 가이드 섹션에 페이지네이션 링크 추가
수업 5.15 (Custom Transport) 및 5.16 (Protocol Features) 추가

**study_guide.md**
- MCP Hosts 설정, MCP Inspector, 페이지네이션 전략, 프로토콜 기능 심층 분석 등 모든 신규 주제로 마인드맵 업데이트

## 2026년 1월 28일

### MCP 사양 2025-11-25 준수 검토

#### 핵심 개념 향상 (01-CoreConcepts/)
- **새 클라이언트 원시 요소 - Roots**: 서버가 파일시스템 경계와 접근 권한을 이해할 수 있도록 Roots 클라이언트 원시 요소에 대한 포괄적 문서 추가
- **도구 주석**: 더 나은 도구 실행 결정을 위한 도구 동작 주석(`readOnlyHint`, `destructiveHint`) 문서화
- **샘플링 내 도구 호출**: 샘플링 문서에 모델 기반 도구 호출을 위한 `tools`와 `toolChoice` 매개변수 추가
- **URL 모드 엘리시테이션**: 서버 주도 외부 웹 인터랙션을 위한 URL 기반 엘리시테이션 문서 추가
- **작업(실험적)**: 내구 실행 래퍼 및 지연 결과 검색용 실험적 작업 기능 문서 추가
- **아이콘 지원**: 도구, 리소스, 리소스 템플릿, 프롬프트에 아이콘을 추가 메타데이터로 포함 가능 명시

#### 문서 업데이트
- **README.md**: MCP 사양 2025-11-25 버전 참조 및 날짜 기반 버전 관리 설명 추가
- **study_guide.md**: 핵심 개념 섹션에 작업 및 도구 주석 추가, 문서 타임스탬프 갱신

#### 사양 준수 확인
- **프로토콜 버전**: 모든 문서가 최신 MCP 사양 2025-11-25 참조함 확인
- **아키텍처 정렬**: 2층 아키텍처(데이터 계층 + 전송 계층) 문서 정확성 검증
- **원시 요소 문서화**: 서버 원시 요소(리소스, 프롬프트, 도구) 및 클라이언트 원시 요소(샘플링, 엘리시테이션, 로깅, Roots) 검증
- **전송 메커니즘**: STDIO 및 스트리밍 HTTP 전송 문서 정확성 검증
- **보안 지침**: 최신 MCP 보안 모범 사례 문서와 일치함 확인

#### 주요 MCP 2025-11-25 기능 문서화
- **OpenID Connect 탐색**: 인증 서버의 OIDC 탐색
- **OAuth 클라이언트 ID 메타데이터 문서**: 권장 클라이언트 등록 메커니즘
- **JSON 스키마 2020-12**: MCP 스키마 정의 기본 방언
- **SDK 계층 시스템**: SDK 기능 지원 및 유지 관리를 위한 공식 요구 사항
- **거버넌스 구조**: MCP 거버넌스의 워킹 그룹 및 관심 그룹 공식화

### 보안 문서 주요 업데이트 (02-Security/)

#### MCP 보안 서밋 워크숍(Sherpa) 통합
- **새 실습 자료**: [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)와 모든 보안 문서의 종합적 통합
- **원정 경로 적용**: 베이스 캠프부터 서밋까지 전체 캠프 간 진행 경로 문서화
- **OWASP 연계**: 모든 보안 지침이 OWASP MCP Azure 보안 가이드 위험에 매핑됨

#### OWASP MCP Top 10 통합
- **신규 섹션**: 주 보안 README에 OWASP MCP Top 10 보안 위험 및 Azure 대응책 표 추가
- **위험 기반 문서화**: mcp-security-controls-2025.md에 각 보안 영역별 OWASP MCP 위험 참조 업데이트
- **참조 아키텍처**: OWASP MCP Azure 보안 가이드 참조 아키텍처 및 구현 패턴 링크 연결

#### 보안 문서 파일 업데이트
- **README.md**: Sherpa 워크숍 개요, 원정 경로 표, OWASP MCP Top 10 위험 요약 및 실습 섹션 추가
- **mcp-security-controls-2025.md**: 2026년 2월로 헤더 갱신, OWASP 위험(MCP01-MCP08) 참조 추가, 사양 버전 불일치 수정
- **mcp-security-best-practices-2025.md**: Sherpa 및 OWASP 리소스 섹션 추가, 타임스탬프 갱신
- **mcp-best-practices.md**: Sherpa 및 OWASP 링크와 함께 실습 섹션 추가
- **azure-content-safety-implementation.md**: OWASP MCP06 참조, Sherpa Camp 3 정렬, 추가 리소스 섹션 추가

#### 신규 리소스 링크 추가
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 개별 OWASP MCP 위험 페이지 (MCP01-MCP10)

### 교육 과정 전체 MCP 사양 2025-11-25 정렬

#### 모듈 03 - 시작하기
- **SDK 문서**: 공식 SDK 목록에 Go SDK 추가; 모든 SDK 참조를 MCP 사양 2025-11-25에 맞게 업데이트
- **전송 명확화**: STDIO 및 HTTP 스트리밍 전송 설명을 명확한 사양 참조로 업데이트

#### 모듈 04 - 실제 구현
- **SDK 업데이트**: Go SDK 추가; 사양 버전 참조 포함 SDK 목록 업데이트
- **승인 사양**: MCP 승인 사양 링크를 최신 2025-11-25 버전으로 업데이트

#### 모듈 05 - 고급 주제
- **새 기능**: MCP 사양 2025-11-25 신규 기능(작업, 도구 주석, URL 모드 엘리시테이션, Roots) 설명 추가
- **보안 자료**: OWASP MCP Top 10 및 Sherpa 워크숍 링크 추가

#### 모듈 06 - 커뮤니티 기여
- **SDK 목록**: Swift 및 Rust SDK 추가; 사양 링크를 2025-11-25 버전으로 업데이트
- **사양 참조**: MCP 사양 링크를 직접 사양 URL로 업데이트

#### 모듈 07 - 초기 채택 교훈
- **리소스 업데이트**: MCP 사양 2025-11-25 링크 및 OWASP MCP Top 10 추가

#### 모듈 08 - 모범 사례
- **사양 버전**: MCP 사양 참조를 2025-11-25로 업데이트
- **보안 자료**: OWASP MCP Top 10 및 Sherpa 워크숍 링크 추가

#### 모듈 10 - AI 워크플로우 간소화
- **배지 업데이트**: MCP 버전 배지를 SDK 버전(1.9.3)에서 사양 버전(2025-11-25)으로 변경
- **리소스 링크**: MCP 사양 링크 업데이트; OWASP MCP Top 10 추가

#### 모듈 11 - MCP 서버 실습 실험실
- **사양 참조**: MCP 사양 링크를 2025-11-25 버전으로 업데이트
- **보안 자료**: 공식 리소스에 OWASP MCP Top 10 추가

## 2025년 12월 18일

### 보안 문서 업데이트 - MCP 사양 2025-11-25

#### MCP 보안 모범 사례 (02-Security/mcp-best-practices.md) - 사양 버전 업데이트
- **프로토콜 버전 업데이트**: 최신 MCP 사양 2025-11-25 (2025년 11월 25일 공개) 참조로 변경
  - 모든 사양 버전 참조를 2025-06-18에서 2025-11-25로 업데이트
  - 문서 날짜 참조를 2025년 8월 18일에서 2025년 12월 18일로 변경
  - 모든 사양 URL이 최신 문서를 가리키는지 검증
- **콘텐츠 검증**: 최신 표준에 따라 보안 모범 사례 종합 점검
  - **Microsoft 보안 솔루션**: Prompt Shields(이전 'Jailbreak 위험 감지'), Azure Content Safety, Microsoft Entra ID, Azure Key Vault 관련 최신 용어 및 링크 검증
  - **OAuth 2.1 보안**: 최신 OAuth 보안 모범 사례와 일치 확인
  - **OWASP 표준**: LLM을 위한 OWASP Top 10 참조 현행성 검증
  - **Azure 서비스**: 모든 Microsoft Azure 문서 링크 및 모범 사례 검증
- **표준 정렬**: 참조된 모든 보안 표준이 최신임 확인
  - NIST AI 위험 관리 프레임워크
  - ISO 27001:2022
  - OAuth 2.1 보안 모범 사례
  - Azure 보안 및 컴플라이언스 프레임워크
- **구현 리소스**: 모든 구현 가이드 링크 및 리소스 검증
  - Azure API Management 인증 패턴
  - Microsoft Entra ID 통합 가이드
  - Azure Key Vault 비밀 관리
  - DevSecOps 파이프라인 및 모니터링 솔루션

### 문서 품질 보증
- **사양 준수**: 모든 필수 MCP 보안 요구사항(MUST/MUST NOT)이 최신 사양과 일치함 보장
- **리소스 최신성**: Microsoft 문서, 보안 표준, 구현 가이드에 대한 외부 링크 모두 최신 상태 검증
- **모범 사례 범위**: 인증, 권한 부여, AI 특화 위협, 공급망 보안, 엔터프라이즈 패턴 전반에 걸친 포괄적 커버리지 확인

## 2025년 10월 6일

### 시작하기 섹션 확장 – 고급 서버 사용법 및 간단한 인증

#### 고급 서버 사용법 (03-GettingStarted/10-advanced)
- **신규 챕터 추가**: 정규 서버 아키텍처와 저수준 서버 아키텍처를 모두 다루는 고급 MCP 서버 사용법 종합 가이드 도입
  - **일반 서버 vs 저수준 서버**: 두 가지 접근법에 대한 상세 비교 및 Python과 TypeScript 코드 예제 제공.
  - **핸들러 기반 설계**: 확장 가능하고 유연한 서버 구현을 위한 핸들러 기반 도구/리소스/프롬프트 관리 설명.
  - **실용적 패턴**: 고급 기능과 아키텍처에 유리한 저수준 서버 패턴의 실제 사례.

#### 간단한 인증 (03-GettingStarted/11-simple-auth)
- **새로운 장 추가됨**: MCP 서버에서 간단한 인증 구현 단계별 가이드.
  - **인증 개념**: 인증과 권한 부여, 자격 증명 처리 명확한 설명.
  - **기본 인증 구현**: Python(Starlette) 및 TypeScript(Express) 미들웨어 기반 인증 패턴과 코드 샘플.
  - **고급 보안으로 발전**: 간단한 인증에서 OAuth 2.1 및 RBAC로 발전하는 가이드와 고급 보안 모듈 참조.

이 추가사항들은 기초 개념과 고급 프로덕션 패턴을 잇는 견고하고 안전하며 유연한 MCP 서버 구현을 위한 실용적인 핸즈온 지침을 제공합니다.

## 2025년 9월 29일

### MCP 서버 데이터베이스 통합 실습 - 포괄적 핸즈온 학습 경로

#### 11-MCPServerHandsOnLabs - 완전한 데이터베이스 통합 커리큘럼 추가
- **완전한 13개 실습 경로**: PostgreSQL 데이터베이스 통합으로 프로덕션 준비된 MCP 서버 구축을 위한 포괄적인 실습 커리큘럼 추가
  - **실제 적용 사례**: 엔터프라이즈급 패턴을 보여주는 Zava Retail 분석 활용 사례
  - **구조적 학습 진행**:
    - **실습 00-03: 기초** - 소개, 핵심 아키텍처, 보안 및 다중 테넌시, 환경 설정
    - **실습 04-06: MCP 서버 구축** - 데이터베이스 설계 및 스키마, MCP 서버 구현, 도구 개발  
    - **실습 07-09: 고급 기능** - 의미 기반 검색 통합, 테스트 및 디버깅, VS Code 통합
    - **실습 10-12: 프로덕션 및 모범 사례** - 배포 전략, 모니터링 및 관찰성, 최적화 및 모범 사례
  - **엔터프라이즈 기술**: FastMCP 프레임워크, PostgreSQL과 pgvector, Azure OpenAI 임베딩, Azure Container Apps, Application Insights
  - **고급 기능**: 행 수준 보안(RLS), 의미 검색, 다중 테넌트 데이터 접근, 벡터 임베딩, 실시간 모니터링

#### 용어 표준화 - 모듈에서 실습으로 변경
- **포괄적 문서 갱신**: 11-MCPServerHandsOnLabs 내 모든 README 파일에서 "모듈"을 "실습" 용어로 체계적 변경
  - **섹션 헤더**: 모든 13개 실습에서 "이 모듈의 내용"을 "이 실습의 내용"으로 수정
  - **내용 설명**: 문서 전반에서 "이 모듈은 ..."을 "이 실습은 ..."으로 변경
  - **학습 목표**: "이 모듈 종료 시"를 "이 실습 종료 시"로 업데이트
  - **내비게이션 링크**: 모든 "모듈 XX:" 참조를 "실습 XX:"로 변경
  - **완료 추적**: "이 모듈 완료 후"를 "이 실습 완료 후"로 갱신
  - **기술 참조 유지**: 구성 파일 내 Python 모듈 참조(예: `"module": "mcp_server.main"`)는 그대로 유지

#### 학습 가이드 개선 (study_guide.md)
- **시각적 커리큘럼 지도**: 새로운 "11. 데이터베이스 통합 실습" 섹션과 완전한 실습 구조 시각화 추가
- **리포지토리 구조**: 10개가 아닌 11개 주요 섹션과 상세 11-MCPServerHandsOnLabs 설명 추가
- **학습 경로 안내**: 00~11섹션 탐색 안내 강화
- **기술 적용 범위**: FastMCP, PostgreSQL, Azure 서비스 통합 관련 내용 추가
- **학습 결과**: 프로덕션 준비된 서버 개발, 데이터베이스 통합 패턴, 엔터프라이즈 보안 강조

#### 메인 README 구조 향상
- **실습 기반 용어 통일**: 11-MCPServerHandsOnLabs의 메인 README.md에서 "실습" 용어 일관 적용
- **학습 경로 조직**: 기초 개념에서 고급 구현, 프로덕션 배포까지 명확한 진행
- **실제 사례 중심**: 엔터프라이즈급 패턴과 기술을 사용한 실용적 핸즈온 학습 강조

### 문서 품질 및 일관성 개선
- **핸즈온 학습 강조**: 문서 전반에 실습 기반 접근 강화
- **엔터프라이즈 패턴 집중**: 프로덕션 준비된 구현 및 엔터프라이즈 보안 고려사항 부각
- **기술 통합**: 최신 Azure 서비스 및 AI 통합 패턴 포괄적 다룸
- **학습 진행**: 기본 개념부터 프로덕션 배포까지 명확하고 구조적인 경로 제시

## 2025년 9월 26일

### 사례 연구 향상 - GitHub MCP Registry 통합

#### 사례 연구 (09-CaseStudy/) - 생태계 개발 중심
- **README.md**: 포괄적 GitHub MCP Registry 사례 연구로 대대적 확장
  - **GitHub MCP Registry 사례 연구**: 2025년 9월 GitHub MCP Registry 출시를 상세 분석
    - **문제 분석**: 분산된 MCP 서버 탐색 및 배포 문제 심층 검토
    - **솔루션 아키텍처**: 중앙 집중식 레지스트리와 클릭 한 번 VS Code 설치 방식
    - **비즈니스 영향**: 개발자 온보딩 및 생산성 가시적 개선
    - **전략적 가치**: 모듈형 에이전트 배포 및 도구 간 상호운용성 중점
    - **생태계 개발**: 에이전틱 통합을 위한 기초 플랫폼 포지셔닝
  - **사례 연구 구조 개선**: 7개 사례 연구 모두 일관된 포맷과 상세 설명 적용
    - Azure AI 여행 에이전트: 다중 에이전트 조정 중점
    - Azure DevOps 통합: 워크플로우 자동화 집중
    - 실시간 문서 검색: Python 콘솔 클라이언트 구현
    - 대화형 학습 계획 생성기: Chainlit 대화형 웹 앱
    - 인에디터 문서: VS Code 및 GitHub Copilot 통합
    - Azure API 관리: 엔터프라이즈 API 통합 패턴
    - GitHub MCP Registry: 생태계 개발 및 커뮤니티 플랫폼
  - **포괄적 결론**: 여러 MCP 구현 측면을 아우르는 7개 사례 연구 요약 및 강조
    - 엔터프라이즈 통합, 다중 에이전트 조정, 개발자 생산성
    - 생태계 개발, 교육 적용 범주화
    - 아키텍처 패턴, 구현 전략, 모범 사례에 대한 심층 인사이트
    - MCP를 성숙하고 프로덕션 준비된 프로토콜로 강조

#### 학습 가이드 업데이트 (study_guide.md)
- **시각적 커리큘럼 지도**: 사례 연구 섹션에 GitHub MCP Registry 포함하여 업데이트
- **사례 연구 설명**: 일반적 설명에서 7개 상세 사례 연구 분해로 개선
- **리포지토리 구조**: 10섹션에 상세 사례 연구 커버리지 및 구체적 구현 내역 반영
- **변경 로그 포함**: 2025년 9월 26일자 GitHub MCP Registry 추가 및 사례 연구 향상 기록
- **날짜 업데이트**: 최신 개정일(2025년 9월 26일)로 푸터 타임스탬프 갱신

### 문서 품질 개선
- **일관성 강화**: 7개 모든 사례 연구에 표준 포맷 및 구조 적용
- **포괄적 커버리지**: 엔터프라이즈, 개발자 생산성, 생태계 개발 시나리오 전반 포함
- **전략적 포지셔닝**: 에이전틱 시스템 배포를 위한 MCP의 기초 플랫폼 역할 부각
- **리소스 통합**: 추가 자료에 GitHub MCP Registry 링크 반영

## 2025년 9월 15일

### 고급 주제 확장 - 맞춤형 전송 및 컨텍스트 엔지니어링

#### MCP 맞춤형 전송 (05-AdvancedTopics/mcp-transport/) - 최신 고급 구현 가이드
- **README.md**: 맞춤형 MCP 전송 메커니즘에 대한 완전한 구현 가이드
  - **Azure Event Grid 전송**: 서버리스 이벤트 기반 전송 완전 구현
    - C#, TypeScript, Python 예제와 Azure Functions 통합
    - 확장 가능한 MCP 솔루션을 위한 이벤트 기반 아키텍처 패턴
    - 웹후크 수신기 및 푸시 기반 메시지 처리
  - **Azure Event Hubs 전송**: 고처리량 스트리밍 전송 구현
    - 저지연 시나리오를 위한 실시간 스트리밍 기능
    - 파티셔닝 전략 및 체크포인트 관리
    - 메시지 배치 및 성능 최적화
  - **엔터프라이즈 통합 패턴**: 프로덕션 준비된 아키텍처 예제
    - 여러 Azure Functions에 걸친 분산 MCP 처리
    - 여러 전송 유형 결합 하이브리드 아키텍처
    - 메시지 내구성, 신뢰성, 오류 처리 전략
  - **보안 및 모니터링**: Azure Key Vault 통합 및 관찰성 패턴
    - 관리 ID 인증 및 최소 권한 접근
    - Application Insights 텔레메트리 및 성능 모니터링
    - 회로 차단기 및 내결함성 패턴
  - **테스트 프레임워크**: 맞춤형 전송을 위한 종합 테스트 전략
    - 테스트 더블 및 모킹 프레임워크를 이용한 단위 테스트
    - Azure Test Containers 기반 통합 테스트
    - 성능 및 부하 테스트 고려사항

#### 컨텍스트 엔지니어링 (05-AdvancedTopics/mcp-contextengineering/) - 신흥 AI 분야
- **README.md**: 신흥 분야로서의 컨텍스트 엔지니어링 종합 탐구
  - **핵심 원칙**: 완전한 컨텍스트 공유, 행동 결정 인지, 컨텍스트 윈도우 관리
  - **MCP 프로토콜 정렬**: MCP 설계가 컨텍스트 엔지니어링 문제 해결에 미치는 영향
    - 컨텍스트 윈도우 한계 및 점진적 로딩 전략
    - 관련성 판단 및 동적 컨텍스트 검색
    - 멀티모달 컨텍스트 처리 및 보안 고려사항
  - **구현 접근법**: 단일 스레드 대 다중 에이전트 아키텍처
    - 컨텍스트 청킹 및 우선순위 기법
    - 점진적 컨텍스트 로딩 및 압축 전략
    - 계층적 컨텍스트 접근법 및 검색 최적화
  - **측정 프레임워크**: 컨텍스트 효율성 평가 신흥 지표
    - 입력 효율성, 성능, 품질, 사용자 경험 고려
    - 컨텍스트 최적화를 위한 실험적 접근
    - 실패 분석 및 개선 방법론

#### 커리큘럼 내비게이션 업데이트 (README.md)
- **모듈 구조 개선**: 신규 고급 주제 포함 커리큘럼 표 업데이트
  - 컨텍스트 엔지니어링(5.14)과 맞춤형 전송(5.15) 항목 추가
  - 모든 모듈에 걸친 일관된 포맷 및 내비게이션 링크
  - 현재 콘텐츠 범위 반영한 설명 갱신

### 디렉터리 구조 개선
- **명명 표준화**: "mcp transport" 폴더명을 "mcp-transport"로 변경하여 다른 고급 주제 폴더와 일관성 유지
- **콘텐츠 조직화**: 모든 05-AdvancedTopics 폴더가 일관된 네이밍 패턴(mcp-[topic]) 적용

### 문서 품질 향상
- **MCP 규격 정렬**: 모든 새 콘텐츠는 MCP Specification 2025-06-18 최신 버전을 참조
- **다국어 예제**: C#, TypeScript, Python의 포괄적 코드 샘플 제공
- **엔터프라이즈 중점**: 프로덕션 준비 패턴과 Azure 클라우드 통합 전면 적용
- **시각 문서화**: 아키텍처 및 흐름 시각화용 Mermaid 다이어그램 포함

## 2025년 8월 18일

### 문서 종합 업데이트 - MCP 2025-06-18 표준 준수

#### MCP 보안 모범 사례 (02-Security/) - 완전한 현대화
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP Specification 2025-06-18 최신 버전과 완전 일치하도록 재작성
  - **필수 요구사항**: 공식 규격의 MUST/MUST NOT 요구사항을 명확한 시각적 표시와 함께 추가
  - **12개 핵심 보안 관행**: 기존 15개 목록에서 포괄적 보안 도메인 구조로 개편
    - 외부 신원 공급자 통합을 포함한 토큰 보안 및 인증
    - 암호화 요구사항이 포함된 세션 관리 및 전송 보안
    - Microsoft Prompt Shields 통합을 포함한 AI 전용 위협 보호
    - 최소 권한 원칙을 적용한 접근 통제 및 권한 관리
    - Azure Content Safety 통합을 포함한 콘텐츠 안전성 및 모니터링
    - 구성요소 검증을 포함한 공급망 보안
    - PKCE 구현을 통한 OAuth 보안 및 혼란스런 대리자 방지
    - 자동화된 대응을 포함한 사고 대응 및 복구
    - 규제 준수를 포함한 컴플라이언스 및 거버넌스
    - 제로 트러스트 아키텍처를 포함한 고급 보안 제어
    - Prompt Shields, Azure Content Safety, Entra ID 및 GitHub Advanced Security 포함 Microsoft 보안 생태계 통합
    - 적응형 관행을 포함한 지속적 보안 진화
  - **Microsoft 보안 솔루션**: Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security 통합 가이드 강화
  - **구현 자원**: 공식 MCP 문서, Microsoft 보안 솔루션, 보안 표준, 구현 가이드를 카테고리별로 정리한 포괄적 자료 링크

#### 고급 보안 제어 (02-Security/) - 엔터프라이즈 구현
- **MCP-SECURITY-CONTROLS-2025.md**: 엔터프라이즈급 보안 프레임워크로 완전 개편
  - **9개 종합 보안 도메인**: 기본 제어에서 상세한 엔터프라이즈 프레임워크로 확장
    - Microsoft Entra ID 통합을 포함한 고급 인증 및 권한 부여
    - 종합 검증을 포함한 토큰 보안 및 안티 패스스루 제어
    - 하이재킹 방지를 위한 세션 보안 제어
    - 프롬프트 인젝션 및 도구 오염 방지를 포함한 AI 전용 보안 제어
    - OAuth 프록시 보안을 포함한 혼란스런 대리자 공격 방지
    - 샌드박싱과 격리를 포함한 도구 실행 보안
    - 종속성 검증을 포함한 공급망 보안 제어
    - SIEM 통합을 포함한 모니터링 및 탐지 제어
    - 자동화 대응을 포함한 사고 대응 및 복구
  - **구현 예제**: 상세 YAML 구성 블록과 코드 예제 추가
  - **Microsoft 솔루션 통합**: Azure 보안 서비스, GitHub Advanced Security, 엔터프라이즈 신원 관리 광범위 적용

#### 고급 주제 보안 (05-AdvancedTopics/mcp-security/) - 프로덕션 준비 구현
- **README.md**: 엔터프라이즈 보안 구현을 위한 완전 개편
  - **최신 규격 정렬**: MCP Specification 2025-06-18과 필수 보안 요구사항 반영
  - **강화된 인증**: Microsoft Entra ID 통합과 .NET 및 Java Spring Security 상세 예제 포함
  - **AI 보안 통합**: Microsoft Prompt Shields 및 Azure Content Safety 구현과 상세 Python 예제 포함
  - **고급 위협 완화**:  
    - PKCE와 사용자 동의 검증을 활용한 혼란스런 대리자 공격 방지  
    - 오디언스 검증과 안전한 토큰 관리를 포함한 토큰 패스스루 방지  

- 세션 하이재킹 방지: 암호화 결합 및 행동 분석  
- **기업 보안 통합**: Azure Application Insights 모니터링, 위협 탐지 파이프라인, 공급망 보안  
- **구현 체크리스트**: Microsoft 보안 생태계 혜택과 함께 명확한 필수 및 권장 보안 통제  

### 문서 품질 및 표준 정렬  
- **사양 참조**: 최신 MCP Specification 2025-06-18로 모든 참조 업데이트  
- **Microsoft 보안 생태계**: 모든 보안 문서에 걸친 통합 지침 강화  
- **실용적 구현**: 엔터프라이즈 패턴을 포함한 .NET, Java, Python의 상세 코드 예제 추가  
- **자원 구성**: 공식 문서, 보안 표준, 구현 가이드를 포괄적으로 분류  
- **시각적 표시기**: 필수 요구사항과 권장 관행의 명확한 구분  

#### 핵심 개념 (01-CoreConcepts/) - 완전한 현대화  
- **프로토콜 버전 업데이트**: 날짜 기반 버전 관리(YYYY-MM-DD 형식)로 최신 MCP Specification 2025-06-18 참조로 업데이트  
- **아키텍처 세분화**: 현재 MCP 아키텍처 패턴을 반영한 호스트, 클라이언트, 서버 설명 강화  
  - 호스트는 현재 다중 MCP 클라이언트 연결을 조정하는 AI 애플리케이션으로 명확히 정의됨  
  - 클라이언트는 일대일 서버 관계를 유지하는 프로토콜 커넥터로 설명됨  
  - 서버는 로컬 및 원격 배포 시나리오로 강화  
- **프리미티브 재구조화**: 서버 및 클라이언트 프리미티브 전면 개편  
  - 서버 프리미티브: 리소스(데이터 소스), 프롬프트(템플릿), 도구(실행 가능한 함수)에 상세 설명 및 예제 포함  
  - 클라이언트 프리미티브: 샘플링(LLM 완성), 유도(사용자 입력), 로깅(디버깅/모니터링)  
  - 최신 발견(`*/list`), 검색(`*/get`), 실행(`*/call`) 메서드 패턴으로 업데이트  
- **프로토콜 아키텍처**: 2계층 아키텍처 모델 도입  
  - 데이터 계층: 라이프사이클 관리 및 프리미티브가 포함된 JSON-RPC 2.0 기반  
  - 전송 계층: STDIO(로컬) 및 SSE가 포함된 스트리머블 HTTP(원격) 전송 메커니즘  
- **보안 프레임워크**: 명시적 사용자 동의, 데이터 개인정보 보호, 도구 실행 안전성, 전송 계층 보안 등 포괄적 보안 원칙  
- **통신 패턴**: 초기화, 발견, 실행, 알림 흐름을 나타내도록 프로토콜 메시지 업데이트  
- **코드 예제**: 현재 MCP SDK 패턴을 반영한 다중 언어(.NET, Java, Python, JavaScript) 예제 갱신  

#### 보안 (02-Security/) - 종합 보안 전면 개편  
- **표준 정렬**: MCP Specification 2025-06-18 보안 요구사항 전면 준수  
- **인증 진화**: 커스텀 OAuth 서버에서 외부 ID 공급자 위임(Microsoft Entra ID)으로의 진화 문서화  
- **AI 특화 위협 분석**: 최신 AI 공격 벡터에 대한 보강된 내용  
  - 현실 사례가 포함된 상세 프롬프트 인젝션 공격 시나리오  
  - 도구 오염 메커니즘 및 "러그 풀" 공격 패턴  
  - 컨텍스트 창 오염 및 모델 혼란 공격  
- **Microsoft AI 보안 솔루션**: Microsoft 보안 생태계 전반에 걸친 포괄적 설명  
  - 고도화된 탐지, 강조, 구분자 기술이 포함된 AI 프롬프트 방패  
  - Azure Content Safety 통합 패턴  
  - 공급망 보호를 위한 GitHub Advanced Security  
- **고급 위협 완화**:  
  - MCP 특정 공격 시나리오 및 암호화 세션 ID 필수 요구와 함께 세션 하이재킹 대응  
  - 명확한 동의 요구사항이 있는 MCP 프록시 혼란된 대리 문제  
  - 필수 검증 통제 포함한 토큰 전달 취약점  
- **공급망 보안**: 기초 모델, 임베딩 서비스, 컨텍스트 제공자, 제3자 API 등을 포함한 AI 공급망 범위 확대  
- **기초 보안**: 제로 트러스트 아키텍처 및 Microsoft 보안 생태계 포함 엔터프라이즈 보안 패턴과 강화된 통합  
- **자원 구성**: 유형별(공식 문서, 표준, 연구, Microsoft 솔루션, 구현 가이드)로 포괄적 자원 링크 분류  

### 문서 품질 개선  
- **구조화된 학습 목표**: 구체적이고 실행 가능한 결과를 포함한 학습 목표 강화  
- **교차 참조**: 관련 보안 및 핵심 개념 주제 간 링크 추가  
- **최신 정보**: 모든 날짜 참조 및 사양 링크 최신 표준으로 업데이트  
- **구현 지침**: 두 섹션 전반에 구체적이고 실행 가능한 구현 가이드 추가  

## 2025년 7월 16일

### README 및 탐색 개선  
- README.md 내 커리큘럼 탐색 전면 재설계  
- `<details>` 태그를 접근성 높은 표 기반 형식으로 교체  
- 새로운 "alternative_layouts" 폴더에 대체 레이아웃 옵션 생성  
- 카드 기반, 탭 스타일, 아코디언 스타일 탐색 예시 추가  
- 최신 파일 모두를 포함하도록 저장소 구조 섹션 업데이트  
- "이 커리큘럼 사용법" 섹션 명확한 추천으로 강화  
- MCP 사양 링크 올바른 URL로 업데이트  
- 커리큘럼 구조에 Context Engineering 섹션(5.14) 추가  

### 학습 가이드 업데이트  
- 현재 저장소 구조에 맞게 학습 가이드 전면 개정  
- MCP 클라이언트 및 도구, 인기 MCP 서버에 대한 새 섹션 추가  
- 모든 주제를 정확히 반영하는 시각적 커리큘럼 맵 업데이트  
- 모든 전문 분야를 포함하는 고급 주제 설명 강화  
- 실제 사례를 반영하도록 사례 연구 섹션 업데이트  
- 이 포괄적 변경 로그 추가  

### 커뮤니티 기여 (06-CommunityContributions/)  
- 이미지 생성용 MCP 서버에 대한 상세 정보 추가  
- VSCode에서 Claude 사용법에 관한 포괄 섹션 추가  
- Cline 터미널 클라이언트 설정 및 사용법 문서 추가  
- 모든 인기 있는 클라이언트 옵션을 포함하도록 MCP 클라이언트 섹션 업데이트  
- 보다 정확한 코드 샘플로 기여 예제 강화  

### 고급 주제 (05-AdvancedTopics/)  
- 일관된 명명법으로 모든 전문 주제 폴더 정리  
- 컨텍스트 엔지니어링 자료 및 예제 추가  
- Foundry 에이전트 통합 문서 추가  
- Entra ID 보안 통합 문서 강화  

## 2025년 6월 11일

### 초기 생성  
- MCP for Beginners 커리큘럼 첫 버전 출시  
- 10개 주요 섹션의 기본 구조 생성  
- 탐색용 시각적 커리큘럼 맵 구현  
- 다중 프로그래밍 언어 샘플 프로젝트 초기 추가  

### 시작하기 (03-GettingStarted/)  
- 최초 서버 구현 예제 생성  
- 클라이언트 개발 가이드 추가  
- LLM 클라이언트 통합 지침 포함  
- VS Code 통합 문서 추가  
- Server-Sent Events (SSE) 서버 예제 구현  

### 핵심 개념 (01-CoreConcepts/)  
- 클라이언트-서버 아키텍처 상세 설명 추가  
- 주요 프로토콜 구성 요소 문서화  
- MCP 내 메시징 패턴 문서화  

## 2025년 5월 23일

### 저장소 구조  
- 기본 폴더 구조로 저장소 초기화  
- 각 주요 섹션별 README 파일 생성  
- 번역 인프라 설정  
- 이미지 자산 및 다이어그램 추가  

### 문서화  
- 커리큘럼 개요 포함 초기 README.md 생성  
- CODE_OF_CONDUCT.md 및 SECURITY.md 추가  
- 도움말 요청 안내를 위한 SUPPORT.md 설정  
- 예비 학습 가이드 구조 생성  

## 2025년 4월 15일

### 기획 및 프레임워크  
- MCP for Beginners 커리큘럼 초기 기획  
- 학습 목표 및 대상 정의  
- 커리큘럼 10개 섹션 구조 개요 작성  
- 예제 및 사례 연구 개념적 프레임워크 개발  
- 핵심 개념용 초기 프로토타입 예제 생성

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->