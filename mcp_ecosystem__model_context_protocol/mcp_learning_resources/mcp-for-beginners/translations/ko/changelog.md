# 변경 로그: MCP 초보자용 커리큘럼

이 문서는 Model Context Protocol (MCP) 초보자용 커리큘럼에 대해 이루어진 모든 주요 변경 사항을 기록한 것입니다. 변경 사항은 역순으로 기록됩니다 (최신 변경 사항이 먼저).

## 2026년 6월 16일

### MCP 사양 정렬 및 샘플 검증

커리큘럼을 현재 **MCP 사양 2025-11-25** 및 최신 공식 SDK와 대조하여 검증한 후, 남아 있던 오래된 사양 참조를 수정하고 핵심 샘플이 여전히 빌드 및 실행됨을 확인했습니다.

#### 사양 버전 수정 (2025-06-18 / 2025-03-26 → 2025-11-25)

영문 콘텐츠 중 아직 이전 사양 개정판을 *현재/최신* 표준으로 주장하는 부분을 업데이트하고, 링크를 정규 `modelcontextprotocol.io` 사양 경로로 변경함:
- **05-AdvancedTopics/mcp-security/README.md**: "현재 표준" 배너, 소개, 핵심 보안 원칙 제목, 필수 요구 사항 제목, Microsoft Entra ID 섹션, 참고 문헌 및 리소스 링크, 마지막 보안 안내 (8개 참조)를 2025-11-25로 업데이트
- **05-AdvancedTopics/mcp-transport/README.md**: 추가 리소스 사양 링크 및 "현재 표준" 배너를 2025-11-25로 업데이트
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: 구식 `2025-03-26` security-and-trust 링크를 현재 2025-11-25 보안 권고문 페이지로 교체
- **03-GettingStarted/14-sampling/README.md**: 공식 샘플링 문서 링크를 2025-11-25로 업데이트
- **03-GettingStarted/05-stdio-server/README.md**: 현재 시제로 된 "현재 MCP 사양" 참조 및 추가 리소스 사양 링크를 2025-11-25로 업데이트 (과거 SSE 폐기 알림은 정확성을 위해 그대로 둠)

#### 최신 SDK와 샘플 검증

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install`로 `@modelcontextprotocol/sdk@1.29.0` 성공; `tsc --noEmit`에서 타입 오류 없이 통과 — 기존 `McpServer`/`StdioServerTransport` API 유효
- **Python (03-GettingStarted/01-first-server/solution/python)**: 격리된 `.venv` 안에서 `mcp[cli]` (1.27.2)로 검증; `py_compile` 통과, `FastMCP.list_tools()`가 `add`와 `subtract` 도구를 올바르게 반환함 확인
- 모든 샘플의 `@modelcontextprotocol/sdk` 버전 범위 (`>=1.26.0` / `^1.26.0` / `^1.27.0`)가 현재 `1.29.0`으로 문제 없이 해소됨을 확인 (API 파괴 변화 없음)

#### 의존성 고정 정렬 (버전 격차 해소)

모든 샘플이 현재 MCP 릴리스를 따르도록 구식 SDK 고정을 상향 조정, 저장소 전체 관례와 정렬:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk`를 `^1.8.0`에서 `>=1.26.0`으로 올리고, "MCP 2025-06-18 업데이트" 패키지 설명을 "MCP 사양 2025-11-25에 맞춤"으로 업데이트
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 및 **lab4/code/github_mcp_server/pyproject.toml**: 정확한 핀 `mcp==1.23.0`을 `mcp>=1.26.0`으로 올리고, 두 `uv.lock` 파일을 재생성하여 현재 `mcp 1.27.2`로 락파일을 해결하며 매니페스트와 동기화 유지

#### 커리큘럼 격차 분석 — 최신 사양 기능 커버리지

커리큘럼이 이미 MCP 2025-11-25에 도입/확장된 모든 원시 기능을 다루므로 내용 격차가 없음 확인:
- <strong>샘플링</strong>: 03-GettingStarted/14-sampling 및 05-AdvancedTopics/mcp-sampling
- **이끌어내기 (URL 모드 포함)**: 01-CoreConcepts 및 05-AdvancedTopics/mcp-protocol-features 문서화
- <strong>루트</strong>: 00-Introduction, 01-CoreConcepts, 05-AdvancedTopics/mcp-root-contexts 문서화
- **작업 (실험적, 장기 실행 작업)**: 01-CoreConcepts 및 05-AdvancedTopics/mcp-protocol-features 문서화
- **툴 주석** (`readOnlyHint` / `destructiveHint`): 01-CoreConcepts 및 05-AdvancedTopics/mcp-protocol-features 문서화

### 보안 강화 및 의존성 취약점 해결

모든 의존성 매니페스트와 샘플 소스 코드 전반에 대해 전면적인 보안 점검을 실시하고, 보고된 npm 권고사항과 코드 수준 발견사항을 모두 해결. 조치 후 `npm audit` 결과는 모든 검사 디렉터리에서 **0 취약점** 보고.

#### npm 의존성 취약점 (전이적) — 해결 완료

커밋된 15개 `package-lock.json` 파일 모두 감사. 취약점은 MCP Inspector 개발 도구, OpenAI 클라이언트, MCP SDK가 호출하는 전이적 의존성에 한정됨; 모두 샘플 손상 없이 해결됨:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 및 **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`)로 상향 조정, 번들된 `ajv`, `brace-expansion`, `diff`, `path-to-regexp`, `ws` 권고 해결. `concurrently`가 남긴 심각 권고를 제거하기 위해 npm `overrides`에 패치된 `shell-quote@1.8.4` 강제 적용; 두 락파일 재생성(현재 0 취약점)
- **03-GettingStarted/samples/typescript**: `npm audit fix`로 전이적 `qs` (중간 위험) 패치된 릴리스로 업데이트
- **03-GettingStarted/samples/javascript**: `npm audit fix`로 전이적 `hono` (중간 위험) 패치된 릴리스로 업데이트
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix`로 전이적 `form-data` (높음) 패치 릴리스로 업데이트
- **03-GettingStarted/11-simple-auth/solution/typescript**: 누락된 `package-lock.json` 생성, 프로젝트 재현 가능 및 감사 가능 상태 확보 (0 취약점)

#### 코드 수준 보안 수정 (OWASP A03: 인젝션)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `open_in_vscode` 도구의 `shell=True` 제거. 이전의 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)`는 폴더 경로 내 셸 메타문자가 `cmd.exe`에 의해 해석될 수 있어 명령 주입 벡터 가능성을 내포함. 이제 셸 없이 직접 해결된 `Code.exe`를 폴더 인수와 함께 실행 — 기능상 동등하며 안전함

#### Python 의존성 감사

- 모든 Python 요구 사항 세트를 `pip-audit`으로 감사. `05-AdvancedTopics`와 `03-GettingStarted/samples/python`은 **알려진 취약점 없음** 보고(`mcp` / `httpx` / `pydantic` / `python-dotenv` 범위가 최신 패치 릴리스에 해소됨)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit`가 전이적 의존성 **`werkzeug` 3.1.1**에 대해 세 가지 `safe_join` Windows 장치명 DoS 권고 - `CVE-2025-66221`, `CVE-2026-21860`, `CVE-2026-27199` (모두 3.1.6에서 수정됨)을 표시함. 패치된 릴리스 해결을 위해 명시적 보안 핀 `werkzeug>=3.1.6` 추가; `chainlit` / `mcp` / `semantic-kernel` 스택에서 제약 조건이 원활히 해소됨 확인

### 제품명 리브랜딩

모든 커리큘럼 콘텐츠를 Microsoft의 제품 리브랜딩에 맞춰 업데이트:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord 커뮤니티 링크 업데이트
- **AGENTS.md**: Discord 서버 참조 업데이트
- **README.md**: 기술 생태계 참조 업데이트
- **study_guide.md**: 사례 연구 참조 업데이트
- **05-AdvancedTopics/README.md**: 모듈 5.13 제목 및 설명 업데이트
- **05-AdvancedTopics/mcp-integration/README.md**: 섹션 제목 및 설명 업데이트
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: 전체 모듈 제목 및 내용 업데이트
- **05-AdvancedTopics/mcp-security-entra/README.md**: 교차 참조 링크 업데이트
- **07-LessonsfromEarlyAdoption/README.md**: 사례 연구 참조 업데이트
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: 섹션 9 제목, 배지, 기능 업데이트
- **08-BestPractices/README.md**: Discord 커뮤니티 링크 업데이트
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord 채널 참조 업데이트
- **09-CaseStudy/docs-mcp/solution/python/README.md**: 모델 배포 참조 업데이트
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI 서비스 테이블 업데이트
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: 리소스 참조 업데이트

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md**: 주요 커리큘럼 참조 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: 모듈 제목, 개요 및 모든 모듈 헤더 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: 제목, 학습 목표, 설치 지침 및 리소스 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: 제목, 학습 목표, MCP 호스트 표 및 교차 참조 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: 제목, 배지, 사전 요구 사항 및 리소스 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: 에이전트 빌더 참조 및 피드백 링크 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: 사전 요구 사항 및 확장 참조 업데이트

---

## 2026년 4월 11일

### 신규 강의, 문서 수정 및 의존성 업데이트

#### 신규 커리큘럼 콘텐츠 추가

**모듈 05 - 고급 주제**
- **강의 5.17: MCP를 사용한 대립적 다중 에이전트 추론** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): 다중 에이전트 시스템을 위한 대립적 토론 패턴에 관한 포괄적 가이드
  - Mermaid 아키텍처 다이어그램: 두 에이전트 → 공유 MCP 서버 → 토론 대본 → 심판 → 판결
  - 공유 MCP 도구 서버 (`web_search` + `run_python`) Python과 TypeScript로 구현
  - 명시적 도구 사용 요구가 포함된 상반 시스템 프롬프트 (찬성 / 반대 / 심판)
  - Python, TypeScript, C#에서 라운드 관리 및 논점 라우팅을 수행하는 토론 진행자
  - 토론 진행자의 MCP `ClientSession` 실 도구 호출 연동
  - 사용 사례 표 (환각 탐지, 위협 모델링, API 설계 검토, 사실 검증, 기술 선택)
  - 보안 고려 사항: 샌드박스 실행, 도구 호출 검증, 속도 제한, 감사 로깅
  - 코드 리뷰, 아키텍처 결정, 콘텐츠 검열의 세 가지 실습 시나리오로 구성된 구조화 된 연습

#### 문서 수정

**모듈 03 - 시작하기**
- **05-stdio-server/README.md**: 불완전한 TypeScript stdio 서버 예제 수정 — 누락된 전송 인스턴스화(`new StdioServerTransport()`) 및 `server.connect(transport)` 호출을 추가하여 동일 섹션 내 Python 및 .NET 예제와 일치하도록 함
- **14-sampling/README.md**: 오타 수정 — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### 커리큘럼 업데이트

**메인 README.md**
- 커리큘럼 표에 항목 5.17 (MCP를 사용한 대립적 다중 에이전트 추론) 추가 및 신규 강의 직링크 추가

**05-AdvancedTopics/README.md**
- 강의 표에 5.17 행 추가

**study_guide.md**
- 고급 주제의 마인드맵과 문장 설명에 대립적 다중 에이전트 추론 항목 추가

#### 코드 및 보안 수정

**모듈 05 - 대립 에이전트 (`mcp-adversarial-agents`)**
- **보안 수정 — 명령어 인젝션**: TypeScript `run_python` 도구에서 `execSync` 셸 인터폴레이션을 `execFile` + `promisify`로 교체하여 명령어 인젝션 취약점 제거 (LLM이 제어하는 코드가 셸 관여 없이 리터럴 argv 요소로 전달됨)
- **MCP 도구 루프 배선**: 블로킹 동기 `Anthropic`을 대체하는 `AsyncAnthropic` 클라이언트를 사용하도록 Python 토론 오케스트레이터를 업데이트, 각 에이전트 턴에 라이브 `ClientSession`을 직접 전달, 매 턴마다 `session.list_tools()`로 도구 정의를 가져오고, 모델이 최종 텍스트 응답을 내보낼 때까지 루프 내에서 `session.call_tool()`을 통해 `tool_use` 블록을 디스패치함

#### 종속성 업데이트

- 여러 패키지(03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)에서 `hono`를 4.12.12로 상향 조정
- TypeScript 패키지에서 `@hono/node-server`를 1.19.11에서 1.19.13으로 상향 조정
- Python 패키지(10-StreamliningAIWorkflows 랩 3 및 4)에서 `cryptography`를 46.0.5에서 46.0.7로 상향 조정
- 10-StreamliningAIWorkflows 인스펙터의 `lodash`를 4.17.23에서 4.18.1로 상향 조정

#### 번역

- 최신 소스 변경사항과 함께 48개 이상의 언어 번역 동기화(i18n 업데이트)

---

## 2026년 2월 5일

### 리포지토리 전체 검증 및 내비게이션 개선

#### 신규 커리큘럼 콘텐츠 추가

**모듈 03 - 시작하기**
- **12-mcp-hosts/README.md**: MCP 호스트 설정을 위한 신규 종합 가이드
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf 구성 예시
  - 주요 호스트별 JSON 구성 템플릿
  - 전송 유형 비교표(stdio, SSE/HTTP, WebSocket)
  - 일반적인 연결 문제 해결법
  - 호스트 구성 보안 모범 사례

- **13-mcp-inspector/README.md**: MCP 인스펙터 디버깅 가이드 신규 추가
  - 설치 방법(npx, npm 글로벌, 소스에서)
  - stdio 및 HTTP/SSE를 통한 서버 연결
  - 도구 테스트, 리소스, 프롬프트 워크플로우
  - VS Code와 MCP 인스펙터 통합
  - 일반적인 디버깅 시나리오 및 해결책

**모듈 04 - 실전 구현**
- **pagination/README.md**: 신규 페이지네이션 구현 가이드
  - Python, TypeScript, Java의 커서 기반 페이지네이션 패턴
  - 클라이언트 사이드 페이지네이션 처리법
  - 커서 설계 전략(불투명 vs. 구조화)
  - 성능 최적화 권장사항

**모듈 05 - 고급 주제**
- **mcp-protocol-features/README.md**: 신규 프로토콜 기능 심층 분석
  - 진행 알림 구현법
  - 요청 취소 패턴
  - URI 패턴이 포함된 리소스 템플릿
  - 서버 수명주기 관리
  - 로깅 레벨 제어
  - JSON-RPC 코드 기반 오류 처리 패턴

#### 내비게이션 수정(24개 이상 파일 업데이트)

**주요 모듈 README들**
 첫 수업과 다음 모듈 모두에 대한 링크 추가

**02-Security 서브파일들**
- 모든 5개 보안 보조 문서에 "다음은?" 내비게이션 추가

**09-사례 연구 파일들**
- 모든 사례 연구 파일에 순차 내비게이션 추가

**10-StreamliningAI 랩들**
모듈 10 개요 및 모듈 11에 "다음은?" 섹션 추가

#### 코드 및 콘텐츠 수정

**SDK 및 종속성 업데이트**
빈 openai 버전을 `^4.95.0`으로 수정
SDK 버전을 `^1.8.0`에서 `>=1.26.0`으로 업데이트
mcp 버전 핀을 `>=1.26.0`으로 업데이트

**코드 수정**
잘못된 모델 `gpt-4o-mini`를 `gpt-4.1-mini`로 수정

**콘텐츠 수정**
깨진 링크 `READMEmd`→`README.md` 수정, 커리큘럼 헤더 `Module 1-3`→`Module 0-3` 수정, 대소문자 구분 경로 수정
손상된 중복 사례 연구 5 콘텐츠 제거

**초보자 안내 개선**
초보자용 올바른 소개, 학습 목표 및 선수 조건 추가

#### 커리큘럼 업데이트

**주요 README.md**
- 커리큘럼 표에 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protocol Features) 항목 추가

**모듈 README들**
수업 목록에 12 및 13번 수업 추가
실전 가이드 섹션에 페이지네이션 링크 추가
수업 5.15 (커스텀 전송) 및 5.16 (프로토콜 기능) 추가

**study_guide.md**
- 모든 신규 주제 포함하여 마인드맵 업데이트: MCP Hosts 설정, MCP Inspector, 페이지네이션 전략, 프로토콜 기능 심층분석

## 2026년 1월 28일

### MCP 사양 2025-11-25 준수 검토

#### 핵심 개념 강화 (01-CoreConcepts/)
- **신규 클라이언트 원시 객체 - Roots**: 파일시스템 경계 및 접근 권한 이해를 위한 Roots 클라이언트 원시 객체에 대한 종합 문서 추가
- **도구 주석**: 더 나은 도구 실행 결정을 위해 도구 동작 주석(`readOnlyHint`, `destructiveHint`) 문서 추가
- **샘플링 내 도구 호출**: 샘플링 문서에 `tools` 및 `toolChoice` 파라미터 추가하여 모델 기반 도구 호출 가능하도록 업데이트
- **URL 모드 유도**: 서버 주도 외부 웹 상호작용을 위한 URL 기반 유도 문서 추가
- **작업(실험적 기능)**: 지속 실행 래퍼 및 연기된 결과 조회를 위한 작업 기능 문서 추가
- **아이콘 지원**: 도구, 리소스, 리소스 템플릿 및 프롬프트에 아이콘 메타데이터 포함 가능 안내

#### 문서 업데이트
- **README.md**: MCP 사양 2025-11-25 버전 참조 및 날짜 기반 버전 관리 설명 추가
- **study_guide.md**: 핵심 개념 섹션에 작업 및 도구 주석 포함하도록 커리큘럼 맵 업데이트; 문서 타임스탬프 갱신

#### 사양 준수 검증
- **프로토콜 버전**: 모든 문서가 MCP 사양 2025-11-25 최신 버전 참조 확인
- **아키텍처 정합성**: 2계층 아키텍처(데이터 레이어 + 전송 레이어) 문서 정확성 확인
- **원시 객체 문서**: 서버 원시 객체(리소스, 프롬프트, 도구) 및 클라이언트 원시 객체(샘플링, 유도, 로깅, Roots) 검증
- **전송 메커니즘**: STDIO 및 스트리밍 HTTP 전송 문서 정확성 검증
- **보안 가이드**: 최신 MCP 보안 모범 사례 문서와 일치 확인

#### 주요 MCP 2025-11-25 기능 문서화
- **OpenID Connect 탐색**: 인증 서버 OIDC 탐색
- **OAuth 클라이언트 ID 메타데이터 문서**: 권장 클라이언트 등록 방법
- **JSON 스키마 2020-12**: MCP 스키마 기본 방언 지정
- **SDK 계층화 시스템**: SDK 기능 지원 및 유지보수 공식 요구사항
- **거버넌스 구조**: MCP 내 작업 그룹 및 이해관계 그룹 공식화

### 보안 문서 주요 업데이트 (02-Security/)

#### MCP 보안 정상 회의 워크숍(Sherpa) 통합
- **신규 실습 리소스**: [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)를 모든 보안 문서에 포괄적으로 통합
- **원정 경로 적용**: 베이스 캠프부터 정상까지 전체 캠프 간 진행 경로 문서화
- **OWASP 정렬**: 모든 보안 지침이 OWASP MCP Azure 보안 가이드 위험에 매핑됨

#### OWASP MCP Top 10 통합
- **신규 섹션**: 메인 보안 README에 OWASP MCP Top 10 보안 위험 테이블 및 Azure 완화책 추가
- **위험 기반 문서화**: mcp-security-controls-2025.md에 각 보안 영역별 OWASP MCP 위험 참조 추가
- **참조 아키텍처**: OWASP MCP Azure 보안 가이드 참조 아키텍처 및 구현 패턴 링크 연결

#### 보안 파일 업데이트
- **README.md**: Sherpa 워크숍 개요, 원정 경로 표, OWASP MCP Top 10 위험 요약 및 실습 섹션 추가
- **mcp-security-controls-2025.md**: 헤더 2026년 2월로 업데이트, OWASP 위험 참조(MCP01-MCP08) 추가, 사양 버전 불일치 수정
- **mcp-security-best-practices-2025.md**: Sherpa 및 OWASP 리소스 섹션 추가, 타임스탬프 갱신
- **mcp-best-practices.md**: Sherpa 및 OWASP 링크 포함한 실습 섹션 추가
- **azure-content-safety-implementation.md**: OWASP MCP06 참조, Sherpa 캠프 3 정렬 및 추가 리소스 섹션 추가

#### 신규 리소스 링크 추가
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 개별 OWASP MCP 위험 페이지 (MCP01-MCP10)

### 커리큘럼 전반 MCP 사양 2025-11-25 정렬

#### 모듈 03 - 시작하기
- **SDK 문서**: 공식 SDK 목록에 Go SDK 추가; 모든 SDK 참조를 MCP 사양 2025-11-25에 맞게 업데이트
- **전송 명확화**: STDIO 및 HTTP 스트리밍 전송 설명에 명시적 사양 참조 추가

#### 모듈 04 - 실전 구현
- **SDK 업데이트**: Go SDK 추가; 사양 버전 참조와 함께 SDK 목록 갱신
- **권한 부여 사양**: MCP 권한 부여 사양 링크를 최신 2025-11-25 버전으로 업데이트

#### 모듈 05 - 고급 주제
- **신규 기능**: MCP 사양 2025-11-25 신규 기능(작업, 도구 주석, URL 모드 유도, Roots) 안내 추가
- **보안 리소스**: OWASP MCP Top 10 및 Sherpa 워크숍 링크 추가

#### 모듈 06 - 커뮤니티 기여
- **SDK 목록**: Swift와 Rust SDK 추가; 사양 링크를 2025-11-25로 갱신
- **사양 참조**: MCP 사양 직접 URL로 업데이트

#### 모듈 07 - 초기 도입 사례
- **리소스 업데이트**: MCP 사양 2025-11-25 링크 및 OWASP MCP Top 10 추가

#### 모듈 08 - 모범 사례
- **사양 버전**: MCP 사양 참조를 2025-11-25로 업데이트
- **보안 리소스**: OWASP MCP Top 10 및 Sherpa 워크숍 추가

#### 모듈 10 - AI 워크플로우 간소화
- **배지 업데이트**: MCP 버전 배지를 SDK 버전(1.9.3)에서 사양 버전(2025-11-25)으로 변경
- **리소스 링크**: MCP 사양 링크 업데이트 및 OWASP MCP Top 10 추가

#### 모듈 11 - MCP 서버 실습 랩
- **사양 참조**: MCP 사양 링크를 2025-11-25 버전으로 업데이트
- **보안 리소스**: 공식 리소스에 OWASP MCP Top 10 추가

## 2025년 12월 18일

### 보안 문서 업데이트 - MCP 사양 2025-11-25

#### MCP 보안 모범 사례 (02-Security/mcp-best-practices.md) - 사양 버전 업데이트
- **프로토콜 버전 업데이트**: 최신 MCP 사양 2025-11-25 (2025년 11월 25일 발표) 참조로 업데이트
  - 모든 사양 버전 참조를 2025-06-18에서 2025-11-25로 갱신
  - 문서 날짜 참조를 2025년 8월 18일에서 2025년 12월 18일로 변경
  - 모든 사양 URL이 최신 문서로 연결되는지 확인
- **내용 검증**: 최신 표준에 따른 보안 모범 사례 종합 검증
  - **마이크로소프트 보안 솔루션**: 프롬프트 실드(구 "Jailbreak 위험 탐지"), Azure 콘텐츠 안전, Microsoft Entra ID, Azure Key Vault 용어 및 링크 확인
  - **OAuth 2.1 보안**: 최신 OAuth 보안 모범 사례와 일치 확인
  - **OWASP 표준**: LLM용 OWASP Top 10 참조의 최신성 검증
  - **Azure 서비스**: 모든 Microsoft Azure 문서 링크 및 모범 사례 확인
- **표준 정합성**: 참조하는 모든 보안 표준 최신성 확인
  - NIST AI 위험 관리 프레임워크
  - ISO 27001:2022
  - OAuth 2.1 보안 모범 사례
  - Azure 보안 및 컴플라이언스 프레임워크
- **구현 리소스**: 모든 구현 가이드 링크 및 리소스 검증
  - Azure API 관리 인증 패턴
  - Microsoft Entra ID 통합 가이드
  - Azure Key Vault 비밀 관리
  - DevSecOps 파이프라인 및 모니터링 솔루션

### 문서 품질 보증
- **사양 준수**: 모든 필수 MCP 보안 요구사항(MUST/MUST NOT)이 최신 사양과 일치하는지 확인
- **리소스 최신성**: 모든 외부 Microsoft 문서, 보안 표준, 구현 가이드 링크 검증
- **모범 사례 적용 범위**: 인증, 권한 부여, AI 특유 위협, 공급망 보안, 엔터프라이즈 패턴을 포괄적으로 다루었는지 검증

## 2025년 10월 6일

### 시작하기 섹션 확장 – 고급 서버 사용 및 간단한 인증

#### 고급 서버 사용 (03-GettingStarted/10-advanced)
- **신규 챕터 추가**: 정규 및 저수준 서버 아키텍처를 모두 다루는 종합 MCP 서버 고급 사용 가이드 도입
  - **정규 서버 vs. 저수준 서버**: Python과 TypeScript 코드 예제 포함 상세 비교
  - **핸들러 기반 설계**: 확장 가능하고 유연한 서버 구현을 위한 도구/리소스/프롬프트 관리용 핸들러 설계 설명
  - **실전 패턴**: 고급 기능과 아키텍처에 유용한 저수준 서버 패턴의 실제 시나리오
#### 간단 인증 (03-GettingStarted/11-simple-auth)
- **새로운 챕터 추가**: MCP 서버에서 간단 인증 구현 단계별 가이드
  - **인증 개념**: 인증과 권한 부여, 자격 증명 처리에 대한 명확한 설명
  - **기본 인증 구현**: Python(Starlette) 및 TypeScript(Express)에서 미들웨어 기반 인증 패턴과 코드 샘플
  - **고급 보안으로의 발전**: 간단한 인증부터 OAuth 2.1 및 RBAC로 발전하는 안내 및 고급 보안 모듈 참조

이 추가 사항은 기초 개념과 고급 프로덕션 패턴을 잇는 실용적이고 실습 중심의 MCP 서버 구현 가이드를 제공합니다.

## 2025년 9월 29일

### MCP 서버 데이터베이스 통합 실습 - 종합 실습 학습 경로

#### 11-MCPServerHandsOnLabs - 완전한 데이터베이스 통합 교육 과정 추가
- **총 13개 실습 과정**: PostgreSQL 데이터베이스 통합으로 프로덕션 준비된 MCP 서버 구축 종합 실습 과정 추가
  - **실세계 구현 예제**: 기업급 패턴을 보여주는 Zava Retail 분석 사례
  - **구조화된 학습 진행**:
    - **실습 00-03: 기초** - 소개, 핵심 아키텍처, 보안 및 멀티테넌시, 환경 설정
    - **실습 04-06: MCP 서버 구축** - 데이터베이스 설계 및 스키마, MCP 서버 구현, 도구 개발
    - **실습 07-09: 고급 기능** - 의미론적 검색 통합, 테스트 및 디버깅, VS Code 통합
    - **실습 10-12: 프로덕션 및 모범 사례** - 배포 전략, 모니터링 및 가시성, 모범 사례 및 최적화
  - **엔터프라이즈 기술**: FastMCP 프레임워크, pgvector가 포함된 PostgreSQL, Azure OpenAI 임베딩, Azure Container Apps, Application Insights
  - **고급 기능**: 행 수준 보안(RLS), 의미론적 검색, 멀티테넌트 데이터 액세스, 벡터 임베딩, 실시간 모니터링

#### 용어 표준화 - 모듈을 실습으로 변환
- **문서 전면 업데이트**: 11-MCPServerHandsOnLabs 내 모든 README 파일에서 "Module" 대신 "Lab" 용어 일괄 적용
  - **섹션 헤더**: 모든 13개 실습에 걸쳐 "What This Module Covers"를 "What This Lab Covers"로 업데이트
  - **내용 설명**: 문서 전반에 걸쳐 "This module provides..."를 "This lab provides..."로 변경
  - **학습 목표**: "By the end of this module..."을 "By the end of this lab..."로 업데이트
  - **내비게이션 링크**: 모든 "Module XX:" 참조를 "Lab XX:"로 전환
  - **완료 추적**: "After completing this module..." 항목을 "After completing this lab..."으로 변경
  - **기술 참조 유지**: 구성 파일 내 Python 모듈 참조(예: `"module": "mcp_server.main"`)는 유지

#### 학습 가이드 개선 (study_guide.md)
- **시각적 교육 과정 지도**: 새 섹션 "11. Database Integration Labs"와 종합적인 실습 구조 시각화 추가
- **저장소 구조**: 주 섹션이 10개에서 11개로 업데이트되고 11-MCPServerHandsOnLabs 상세 설명 포함
- **학습 경로 안내**: 00-11 섹션을 아우르는 내비게이션 안내 강화
- **기술 범위**: FastMCP, PostgreSQL, Azure 서비스 통합 상세 정보 추가
- **학습 결과**: 프로덕션 준비 서버 개발, 데이터베이스 통합 패턴 및 엔터프라이즈 보안 강조

#### 메인 README 구조 개선
- **실습 기반 용어 사용**: 11-MCPServerHandsOnLabs의 메인 README.md에서 "Lab" 구조 일관 적용
- **학습 경로 조직**: 기초 개념에서 고급 구현, 프로덕션 배포까지 명확한 진행
- **실세계 중심**: 엔터프라이즈급 패턴 및 기술을 활용한 실습형 학습 강조

### 문서 품질 및 일관성 개선
- **실습 중심 학습 강조**: 문서 전반에 걸쳐 실용적인 실습 기반 접근 강화
- **엔터프라이즈 패턴 집중**: 프로덕션 준비 구현 및 엔터프라이즈 보안 고려사항 강조
- **기술 통합**: 최신 Azure 서비스 및 AI 통합 패턴을 폭넓게 다룸
- **학습 진행**: 기본 개념부터 프로덕션 배포까지 명확하고 구조화된 경로 제시

## 2025년 9월 26일

### 사례 연구 강화 - GitHub MCP Registry 통합

#### 사례 연구 (09-CaseStudy/) - 생태계 개발 중심
- **README.md**: 포괄적 GitHub MCP Registry 사례 연구로 대폭 확장
  - **GitHub MCP Registry 사례 연구**: 2025년 9월 GitHub MCP Registry 출시에 대한 종합 분석
    - **문제 분석**: 분산된 MCP 서버 검색 및 배포 문제 상세 검토
    - **솔루션 아키텍처**: GitHub의 중앙화된 레지스트리 및 원클릭 VS Code 설치 방식
    - **비즈니스 영향**: 개발자 온보딩 및 생산성 향상 수치화
    - **전략적 가치**: 모듈식 에이전트 배포 및 도구 간 상호 운용성 중점
    - **생태계 개발**: 에이전틱 통합을 위한 기본 플랫폼 위치 부각
  - **사례 연구 구조 강화**: 일곱 개 사례 연구 모두 일관된 형식 및 상세 설명으로 업데이트
    - Azure AI 여행 에이전트: 멀티 에이전트 오케스트레이션 강조
    - Azure DevOps 통합: 워크플로우 자동화 집중
    - 실시간 문서 검색: Python 콘솔 클라이언트 구현
    - 상호작용 학습 계획 생성기: Chainlit 대화형 웹 앱
    - 인에디터 문서: VS Code 및 GitHub Copilot 통합
    - Azure API Management: 엔터프라이즈 API 통합 패턴
    - GitHub MCP Registry: 생태계 개발 및 커뮤니티 플랫폼
  - **종합 결론**: 다중 MCP 구현 차원에 걸친 7개 사례 연구를 강조한 결론 섹션 재작성
    - 엔터프라이즈 통합, 멀티 에이전트 오케스트레이션, 개발자 생산성
    - 생태계 개발, 교육용 애플리케이션 분류
    - 아키텍처 패턴, 구현 전략, 모범 사례에 대한 심층적 인사이트
    - MCP를 성숙하고 프로덕션 준비된 프로토콜로 강조

#### 학습 가이드 업데이트 (study_guide.md)
- **시각적 교육 과정 지도**: 사례 연구 섹션에 GitHub MCP Registry 추가된 마인드맵 업데이트
- **사례 연구 설명 강화**: 일반 서술에서 7개 포괄적 사례 연구 상세 구분으로 확대
- **저장소 구조**: 10번 섹션을 사례 연구 구체적 구현 세부 내역 반영하여 업데이트
- **변경 로그 통합**: 2025년 9월 26일 항목에 GitHub MCP Registry 추가 및 사례 연구 강화 문서화
- **날짜 업데이트**: 최신 개정판(2025년 9월 26일) 반영하여 푸터 타임스탬프 갱신

### 문서 품질 개선
- **일관성 강화**: 모든 7개 사례 연구에 걸쳐 형식 및 구조 표준화
- **포괄적 적용 범위**: 엔터프라이즈, 개발자 생산성, 생태계 개발 시나리오 확대
- **전략적 포지셔닝**: 에이전틱 시스템 배포를 위한 MCP 기본 플랫폼 강조
- **리소스 통합**: 추가 자원에 GitHub MCP Registry 링크 포함

## 2025년 9월 15일

### 고급 주제 확장 - 맞춤형 전송 및 컨텍스트 엔지니어링

#### MCP 맞춤형 전송 (05-AdvancedTopics/mcp-transport/) - 새로운 고급 구현 가이드
- **README.md**: 맞춤형 MCP 전송 메커니즘 완전 구현 가이드
  - **Azure Event Grid 전송**: 서버리스 이벤트 기반 전송 완전 구현
    - C#, TypeScript, Python 예제와 Azure Functions 통합
    - 확장 가능한 MCP 솔루션용 이벤트 기반 아키텍처 패턴
    - 웹훅 수신기 및 푸시 기반 메시지 처리
  - **Azure Event Hubs 전송**: 고처리량 스트리밍 전송 구현
    - 지연시간이 낮은 실시간 스트리밍 기능
    - 파티셔닝 전략 및 체크포인트 관리
    - 메시지 배치 및 성능 최적화
  - **엔터프라이즈 통합 패턴**: 프로덕션 준비 아키텍처 사례
    - 다중 Azure Functions에 걸친 분산 MCP 처리
    - 다중 전송 유형 결합 하이브리드 아키텍처
    - 메시지 내구성, 신뢰성 및 오류 처리 전략
  - **보안 및 모니터링**: Azure Key Vault 통합 및 가시성 패턴
    - 관리형 ID 인증 및 최소 권한 액세스
    - Application Insights 텔레메트리 및 성능 모니터링
    - 회로 차단기 및 내결함성 패턴
  - **테스트 프레임워크**: 맞춤형 전송에 대한 종합 테스트 전략
    - 테스팅 더블 및 모킹 프레임워크를 사용한 단위 테스트
    - Azure Test Containers를 이용한 통합 테스트
    - 성능 및 부하 테스트 고려사항

#### 컨텍스트 엔지니어링 (05-AdvancedTopics/mcp-contextengineering/) - 신흥 AI 분야
- **README.md**: 신흥 분야로서의 컨텍스트 엔지니어링 종합 탐구
  - **핵심 원리**: 완전한 컨텍스트 공유, 액션 의사결정 인지, 컨텍스트 창 관리
  - **MCP 프로토콜 조화**: MCP 설계가 컨텍스트 엔지니어링 문제 해결에 어떻게 기여하는지
    - 컨텍스트 창 제한 및 점진적 로딩 전략
    - 관련성 판단 및 동적 컨텍스트 조회
    - 다중 모달 컨텍스트 처리 및 보안 고려사항
  - **구현 접근법**: 단일 스레드 대 다중 에이전트 아키텍처
    - 컨텍스트 청킹 및 우선순위 지정 기법
    - 점진적 컨텍스트 로딩 및 압축 전략
    - 계층형 컨텍스트 접근법 및 조회 최적화
  - **측정 프레임워크**: 컨텍스트 효과성 평가를 위한 신흥 지표
    - 입력 효율성, 성능, 품질 및 사용자 경험 고려사항
    - 컨텍스트 최적화를 위한 실험적 접근
    - 실패 분석 및 개선 방법론

#### 교육 과정 내비게이션 업데이트 (README.md)
- **개선된 모듈 구조**: 새로운 고급 주제를 포함하도록 교육 과정 표 업데이트
  - 컨텍스트 엔지니어링(5.14) 및 맞춤형 전송(5.15) 항목 추가
  - 모든 모듈에 일관된 포맷 및 내비게이션 링크 적용
  - 현재 내용 범위를 반영한 설명 업데이트

### 디렉터리 구조 개선
- **명명 표준화**: "mcp transport"를 다른 고급 주제 폴더와 일관되게 "mcp-transport"로 변경
- **내용 구성**: 모든 05-AdvancedTopics 폴더가 일관된 명명 규칙(mcp-[topic]) 준수

### 문서 품질 향상
- **MCP 사양 조화**: 모든 새 콘텐츠가 MCP Specification 2025-06-18 참조
- **다중 언어 예제**: C#, TypeScript, Python에서 종합적인 코드 예제 제공
- **엔터프라이즈 집중**: 프로덕션 수준 패턴 및 Azure 클라우드 통합 전체 적용
- **시각 문서화**: 아키텍처 및 플로우 시각화를 위한 Mermaid 다이어그램 포함

## 2025년 8월 18일

### 문서 종합 업데이트 - MCP 2025-06-18 표준

#### MCP 보안 모범 사례 (02-Security/) - 완전한 현대화
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP Specification 2025-06-18에 맞춘 완전 개정
  - **필수 요건**: 공식 사양에서 명시된 MUST/MUST NOT 요구사항을 명확한 시각적 표시와 함께 추가
  - **12가지 핵심 보안 실천사항**: 기존 15개 항목에서 보안 도메인별 종합 체계로 재구성
    - 외부 ID 공급자 통합을 포함한 토큰 보안 및 인증
    - 세션 관리 및 전송 보안에 대한 암호화 요구사항
    - Microsoft Prompt Shields 통합을 통한 AI 특정 위협 보호
    - 최소 권한 원칙을 통한 액세스 제어 및 권한 관리
    - Azure Content Safety 통합을 통한 콘텐츠 안전 및 모니터링
    - 종합적인 컴포넌트 검증을 포함한 공급망 보안
    - PKCE 구현을 통한 OAuth 보안 및 혼동 대리인 공격 방지
    - 자동화된 기능을 포함한 사고 대응 및 복구
    - 규제 준수를 위한 컴플라이언스 및 거버넌스
    - 제로 트러스트 아키텍처를 포함한 고급 보안 통제
    - Microsoft 보안 생태계 통합 (Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security)
    - 적응형 실천을 통한 지속적 보안 진화
  - **Microsoft 보안 솔루션**: Prompt Shields, Azure Content Safety, Entra ID 및 GitHub Advanced Security 통합 강화
  - **구현 리소스**: 공식 MCP 문서, Microsoft 보안 솔루션, 보안 표준 및 구현 가이드별 분류된 포괄적 자원 링크

#### 고급 보안 통제 (02-Security/) - 엔터프라이즈 구현
- **MCP-SECURITY-CONTROLS-2025.md**: 엔터프라이즈급 보안 프레임워크로 완전 개편
  - **9개 보안 도메인 심화**: 기본 통제에서 상세 엔터프라이즈 프레임워크로 확장
    - Microsoft Entra ID 통합을 포함한 고급 인증 및 권한 부여
    - 종합 검증을 포함한 토큰 보안 및 안티 패스스루 통제
    - 세션 보안 통제 (탈취 방지 포함)
    - 프롬프트 인젝션 및 도구 중독 방지를 포함한 AI 특정 보안 통제
    - OAuth 프록시 보안을 통한 혼동 대리인 공격 방지
    - 샌드박스 및 격리를 포함한 도구 실행 보안
    - 종속성 검증을 포함한 공급망 보안 통제
    - SIEM 통합을 통한 모니터링 및 탐지 통제
    - 자동화된 기능을 포함한 사고 대응 및 복구
  - **구현 예제**: 상세 YAML 구성 블록 및 코드 예제 추가
  - **Microsoft 솔루션 통합**: Azure 보안 서비스, GitHub Advanced Security, 엔터프라이즈 ID 관리 폭넓게 포함

#### 고급 주제 보안 (05-AdvancedTopics/mcp-security/) - 프로덕션 준비 구현
- **README.md**: 엔터프라이즈 보안 구현을 위한 완전 개정
  - **현재 사양 조화**: MCP Specification 2025-06-18에 따른 필수 보안 요구사항 업데이트
  - **고급 인증**: Microsoft Entra ID 통합 및 .NET, Java Spring Security 상세 예제 포함
  - **AI 보안 통합**: Microsoft Prompt Shields 및 Azure Content Safety 구현과 Python 상세 예제
  - **고급 위협 완화**: 다음에 대한 종합 구현 예제
    - PKCE 및 사용자 동의 검증을 포함한 혼동 대리인 공격 방지
    - 오디언스 검증 및 안전한 토큰 관리를 포함한 토큰 패스스루 방지
    - 암호화 바인딩 및 행동 분석을 통한 세션 탈취 방지
  - **엔터프라이즈 보안 통합**: Azure Application Insights 모니터링, 위협 탐지 파이프라인, 공급망 보안 포함
  - **구현 체크리스트**: 필수 대 권장 보안 통제 구분 및 Microsoft 보안 생태계 혜택 명확화

### 문서 품질 및 표준 정합성  

- **사양 참조**: 모든 참조를 최신 MCP 사양 2025-06-18로 업데이트  
- **Microsoft 보안 생태계**: 모든 보안 문서 전반에 걸쳐 통합 가이드 강화  
- **실용 구현**: 엔터프라이즈 패턴을 포함한 .NET, Java, Python의 상세 코드 예제 추가  
- **리소스 조직**: 공식 문서, 보안 표준, 구현 가이드의 종합적 분류  
- **시각적 표시기**: 필수 요구사항과 권장 관행에 대한 명확한 표시  

#### 핵심 개념 (01-CoreConcepts/) - 완전한 현대화  
- **프로토콜 버전 업데이트**: 현재 MCP 사양 2025-06-18 참조 및 날짜 기반 버전 관리(YYYY-MM-DD 형식)  
- **아키텍처 정교화**: 현재 MCP 아키텍처 패턴을 반영하여 Hosts, Clients, Servers 설명 강화  
  - Hosts는 이제 여러 MCP 클라이언트 연결을 조율하는 AI 애플리케이션으로 명확히 정의  
  - Clients는 1:1 서버 관계를 유지하는 프로토콜 커넥터로 설명  
  - Servers는 로컬과 원격 배포 시나리오로 개선  
- **프리미티브 재구성**: 서버 및 클라이언트 프리미티브의 완전한 개편  
  - 서버 프리미티브: 리소스(데이터 소스), 프롬프트(템플릿), 도구(실행 가능한 함수)에 대한 상세 설명 및 예제  
  - 클라이언트 프리미티브: 샘플링(LLM 완료), 이리시테이션(사용자 입력), 로깅(디버깅/모니터링)  
  - 현재 검색(`*/list`), 조회(`*/get`), 실행(`*/call`) 메서드 패턴 반영  
- **프로토콜 아키텍처**: 2계층 아키텍처 모델 도입  
  - 데이터 계층: 수명 주기 관리 및 프리미티브를 포함한 JSON-RPC 2.0 기반  
  - 전송 계층: STDIO(로컬) 및 SSE가 포함된 스트리밍 HTTP(원격) 전송 메커니즘  
- **보안 프레임워크**: 명시적 사용자 동의, 데이터 프라이버시 보호, 도구 실행 안전성, 전송 계층 보안을 포함한 포괄적 보안 원칙  
- **통신 패턴**: 초기화, 검색, 실행 및 알림 흐름을 보여주는 프로토콜 메시지 업데이트  
- **코드 예제**: 현재 MCP SDK 패턴을 반영한 다국어(.NET, Java, Python, JavaScript) 예제 갱신  

#### 보안 (02-Security/) - 종합적인 보안 개편  
- **표준 정렬**: MCP 사양 2025-06-18 보안 요구사항과 완전히 정렬  
- **인증 진화**: 맞춤 OAuth 서버에서 외부 ID 제공자 위임(Microsoft Entra ID)으로의 진화 문서화  
- **AI 특화 위협 분석**: 최신 AI 공격 벡터 다룸 강화  
  - 실사례를 포함한 프롬프트 인젝션 공격 시나리오 상세 설명  
  - 도구 오염 메커니즘 및 "러그 풀" 공격 패턴  
  - 컨텍스트 윈도우 오염 및 모델 혼란 공격  
- **Microsoft AI 보안 솔루션**: Microsoft 보안 생태계 전반에 걸친 포괄적 설명  
  - 고급 탐지, 스포트라이트, 구분자 기술을 갖춘 AI 프롬프트 쉴드  
  - Azure 콘텐츠 안전 통합 패턴  
  - 공급망 보호를 위한 GitHub 고급 보안  
- **고급 위협 완화**:  
  - MCP 특화 공격 시나리오 및 암호화된 세션 ID 요구사항과 함께 세션 탈취에 대한 보안 제어  
  - MCP 프록시 시나리오에서의 혼란스러운 대리 문제와 명시적 동의 요구사항  
  - 필수 검증 제어를 갖춘 토큰 패스스루 취약점  
- **공급망 보안**: 파운데이션 모델, 임베딩 서비스, 컨텍스트 제공자 및 타사 API를 포함한 확장된 AI 공급망 다룸  
- **기반 보안**: 제로 트러스트 아키텍처 및 Microsoft 보안 생태계와의 통합 강화  
- **리소스 조직**: 유형별(공식 문서, 표준, 연구, Microsoft 솔루션, 구현 가이드) 리소스 링크 분류  

### 문서 품질 향상  
- **구조화된 학습 목표**: 구체적이고 실행 가능한 결과를 포함한 학습 목표 강화  
- **교차 참조**: 관련 보안 및 핵심 개념 주제 간 링크 추가  
- **최신 정보**: 모든 날짜 참조 및 사양 링크를 최신 표준으로 업데이트  
- **구현 가이드**: 두 섹션 전반에 걸쳐 구체적이고 실행 가능한 구현 지침 추가  

## 2025년 7월 16일

### README 및 내비게이션 개선  
- README.md의 커리큘럼 내비게이션 완전 재설계  
- `<details>` 태그를 보다 접근성 좋은 표 기반 포맷으로 교체  
- 새로운 "alternative_layouts" 폴더에 대체 레이아웃 옵션 생성  
- 카드 기반, 탭 스타일, 아코디언 스타일 네비게이션 예제 추가  
- 최신 파일을 모두 포함하도록 저장소 구조 섹션 업데이트  
- "이 커리큘럼 사용하는 방법" 섹션을 명확한 권장사항으로 강화  
- MCP 사양 링크를 올바른 URL로 업데이트  
- 커리큘럼 구조에 Context Engineering 섹션(5.14) 추가  

### 학습 가이드 업데이트  
- 현재 저장소 구조에 맞추어 학습 가이드 완전 개정  
- MCP 클라이언트 및 도구, 인기 MCP 서버에 대한 새로운 섹션 추가  
- 시각적 커리큘럼 맵을 모든 주제를 정확히 반영하도록 업데이트  
- 고급 주제 설명을 모든 전문 영역을 포함하도록 강화  
- 실제 사례를 반영하도록 사례 연구 섹션 업데이트  
- 이 종합적인 변경 로그 추가  

### 커뮤니티 기여 (06-CommunityContributions/)  
- 이미지 생성용 MCP 서버에 관한 상세 정보 추가  
- VSCode에서 Claude 사용법에 관한 포괄적 섹션 추가  
- Cline 터미널 클라이언트 설정 및 사용법 설명 추가  
- 모든 인기 클라이언트 옵션을 포함하도록 MCP 클라이언트 섹션 업데이트  
- 더 정확한 코드 예제들로 기여 예시 강화  

### 고급 주제 (05-AdvancedTopics/)  
- 일관된 명명법으로 모든 전문 주제 폴더 구성  
- 컨텍스트 엔지니어링 자료 및 예제 추가  
- Foundry 에이전트 통합 문서 추가  
- Entra ID 보안 통합 문서 강화  

## 2025년 6월 11일

### 초판 작성  
- MCP for Beginners 커리큘럼 첫 버전 공개  
- 10개 주요 섹션의 기본 구조 생성  
- 내비게이션용 시각적 커리큘럼 맵 구현  
- 다수 프로그래밍 언어의 초기 샘플 프로젝트 추가  

### 시작하기 (03-GettingStarted/)  
- 첫 번째 서버 구현 예제 생성  
- 클라이언트 개발 가이드 추가  
- LLM 클라이언트 통합 지침 포함  
- VS Code 통합 문서 추가  
- SSE 서버 예제 구현  

### 핵심 개념 (01-CoreConcepts/)  
- 클라이언트-서버 아키텍처에 대한 상세 설명 추가  
- 주요 프로토콜 구성요소 문서화  
- MCP의 메시징 패턴 문서화  

## 2025년 5월 23일

### 저장소 구조  
- 기본 폴더 구조로 저장소 초기화  
- 각 주요 섹션 별 README 파일 생성  
- 번역 인프라 설정  
- 이미지 자산 및 다이어그램 추가  

### 문서  
- 커리큘럼 개요를 포함한 초기 README.md 생성  
- CODE_OF_CONDUCT.md 및 SECURITY.md 추가  
- 도움말 가이드가 포함된 SUPPORT.md 설정  
- 예비 학습 가이드 구조 생성  

## 2025년 4월 15일

### 기획 및 프레임워크  
- MCP for Beginners 커리큘럼 초기 기획  
- 학습 목표 및 대상 청중 정의  
- 커리큘럼 10개 섹션 구조 개요 작성  
- 사례 연구 및 예제에 대한 개념적 프레임워크 개발  
- 주요 개념에 대한 초기 프로토타입 예제 생성

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->