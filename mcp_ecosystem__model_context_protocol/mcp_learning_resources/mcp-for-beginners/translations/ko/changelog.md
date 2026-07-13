# 변경 로그: MCP 초보자 교육 과정

이 문서는 Model Context Protocol (MCP) 초보자 교육 과정에 대해 이루어진 모든 주요 변경 사항을 기록하는 문서입니다. 변경 내용은 역순으로(최신 변경 사항이 먼저) 기록되어 있습니다.

## 2026년 7월 2일

### 새 수업: 2026-07-28 MCP 명세 릴리스 후보 버전

2026년 7월 28일 최종 릴리스 예정인 `2026-07-28` MCP 명세 릴리스 후보(2026년 5월 21일 발표)에 대한 내용을 추가하였습니다. 이 내용은 [공식 발표 블로그 게시물](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)에서 요약된 것입니다. 커리큘럼의 기준 버전은 새 버전 출시 전까지 <strong>MCP Specification 2025-11-25</strong>로 유지되므로, 이는 기존 수업을 재작성하는 것이 아니라 향후 안내용으로 제공됩니다.

- **새로운 수업**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — 상태 비저장 프로토콜 코어(`initialize` 핸드셰이크 및 `Mcp-Session-Id` 제거), 새로운 `Mcp-Method`/`Mcp-Name` 라우팅 헤더, `ttlMs`/`cacheScope` 캐싱 메타데이터, `_meta` 내 W3C Trace Context, 공식 확장 프레임워크(MCP 앱 및 새로운 Tasks 확장), 6가지 권한 강화 SEP, Roots/Sampling/Logging 폐지, 도구 스키마를 위한 완전한 JSON Schema 2020-12 전환 수업 전체 내용 포함
- 새로운 수업에 연결되는 향후 업데이트 알림 반영:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): 프로토콜 버전 주석, Sampling/Roots/Logging/Tasks 섹션, "앞으로의 방향"
  - [02-Security/README.md](./02-Security/README.md): 권한 강화 알림
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): 상태 비저장 전송 알림
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): Sampling 폐지 알림
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): Logging 폐지 및 Tasks 확장 알림
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): 상태 비저장/세션 라우팅 알림
  - [README.md](./README.md): 명세 섹션 내 "앞으로의 방향" 주석 및 커리큘럼 모듈 표에 `1.1` 항목 추가
  - [study_guide.md](./study_guide.md): Core Concepts 개요 아래 미래 지향적 항목 추가 및 날짜가 명시된 부록 주석
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): 상태 비저장 요청 모델을 앞두고 `mcp-session-id` 전송 맵 관련 알림
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): Root Contexts/Sampling 폐지 및 Tasks 확장 모듈 개요 알림
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security.md): 권한 강화 알림

## 2026년 6월 24일

### 새 수업: Copilot 앱에서 MCP 사용

- [툴링 섹션](./12-tooling/README.md) 추가됨.
- [Copilot 앱에서 MCP 사용](./12-tooling/01-copilot-app/README.md)

## 2026년 6월 16일

### MCP 명세 일치 및 샘플 검증

현재 **MCP Specification 2025-11-25** 및 최신 공식 SDK와 커리큘럼을 검증하고, 남아 있던 오래된 명세 참조를 수정했으며 핵심 샘플들이 정상적으로 빌드되고 실행됨을 확인했습니다.

#### 명세 버전 수정 (2025-06-18 / 2025-03-26 → 2025-11-25)

아직 이전 명세 개정판을 *최신/현재* 기준으로 언급하는 영어 콘텐츠를 업데이트하고, 링크를 정식 `modelcontextprotocol.io` 명세 경로로 재연결:
- **05-AdvancedTopics/mcp-security/README.md**: "현재 표준" 배너, 소개, 핵심 보안 원칙 제목, 필수 요구 사항 제목, Microsoft Entra ID 섹션, 참고 문헌 및 리소스 링크, 최종 보안 안내 (8개 참조) 를 2025-11-25로 업데이트
- **05-AdvancedTopics/mcp-transport/README.md**: 추가 리소스 명세 링크와 "현재 표준" 배너를 2025-11-25로 업데이트
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: 이전의 `2025-03-26` 보안 및 신뢰 링크를 현재의 2025-11-25 보안 모범 사례 페이지로 교체
- **03-GettingStarted/14-sampling/README.md**: 공식 샘플링 문서 링크를 2025-11-25로 업데이트
- **03-GettingStarted/05-stdio-server/README.md**: 현재 시제 "현재 MCP 명세" 참조와 추가 리소스 명세 링크를 2025-11-25로 업데이트 (역사적 SSE 폐지 주석은 정확성을 위해 그대로 둠)

#### 최신 SDK에 맞춘 샘플 검증

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install`을 통해 `@modelcontextprotocol/sdk@1.29.0`가 설치됨; `tsc --noEmit`에서 타입 오류 없이 통과 — 기존 `McpServer`/`StdioServerTransport` API는 여전히 유효
- **Python (03-GettingStarted/01-first-server/solution/python)**: `.venv` 환경에서 `mcp[cli]` (1.27.2)로 검증; `py_compile` 무사통과, `FastMCP.list_tools()`가 `add`와 `subtract` 도구를 정상 반환함
- 모든 샘플의 `@modelcontextprotocol/sdk` 버전 범위(`>=1.26.0` / `^1.26.0` / `^1.27.0`)가 현재 `1.29.0`로 문제없이 해석되며 API 변경 없음을 확인함

#### 의존성 버전 동기화 (버전 격차 해소)

오래된 SDK 고정 버전을 올려서 모든 샘플이 현재 MCP 릴리스를 따르도록 조정, 저장소 전체 관례와 일치:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: `@modelcontextprotocol/sdk`를 `^1.8.0`에서 `>=1.26.0`으로 올리고, 오래된 `"updated for MCP 2025-06-18"` 패키지 설명을 `"aligned with MCP Specification 2025-11-25"`로 수정
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** 및 **lab4/code/github_mcp_server/pyproject.toml**: 정확한 핀 버전 `mcp==1.23.0`을 `mcp>=1.26.0`으로 올리고, 두 `uv.lock` 파일을 재생성하여 락파일들이 현재 `mcp 1.27.2`로 해석되며 매니페스트와 동기화되도록 함

#### 커리큘럼 갭 분석 — 최신 명세 기능 포함 여부

커리큘럼이 MCP 2025-11-25에서 새로 도입되거나 확장된 모든 원시 기능을 이미 포함하고 있어 내용상의 갭이 없음 확인:
- **Sampling**: 수업 03-GettingStarted/14-sampling 및 05-AdvancedTopics/mcp-sampling
- **Elicitation (URL 모드 포함)**: 01-CoreConcepts 및 05-AdvancedTopics/mcp-protocol-features에 문서화됨
- **Roots**: 00-Introduction, 01-CoreConcepts, 05-AdvancedTopics/mcp-root-contexts에 문서화됨
- **Tasks (실험적, 장시간 운영)**: 01-CoreConcepts 및 05-AdvancedTopics/mcp-protocol-features에 문서화됨
- **도구 주석** (`readOnlyHint` / `destructiveHint`): 01-CoreConcepts 및 05-AdvancedTopics/mcp-protocol-features에 문서화됨

### 보안 강화 및 의존성 취약점 수정

모든 의존성 매니페스트와 샘플 소스 코드를 포함하여 전체 보안 점검을 실행하고, 보고된 npm 권고사항과 한 건의 코드 관련 문제를 모두 수정했습니다. 수정 후 `npm audit` 결과 모든 감사 디렉터리에 대해 **0개의 취약점** 보고됨.

#### npm 의존성 취약점 (간접 의존성) — 수정 완료

커밋된 15개 `package-lock.json` 파일 모두 감사함. 취약점은 MCP Inspector 개발 도구, OpenAI 클라이언트, MCP SDK에서 유입된 간접 의존성에 제한되었으며, 모두 샘플을 깨뜨리지 않고 해결됨:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** 및 **lab3/code/weather_mcp/inspector**: `@modelcontextprotocol/inspector` 버전을 (`0.16.6` / `0.14.1`)에서 `0.22.0`으로 올려 번들된 `ajv`, `brace-expansion`, `diff`, `path-to-regexp`, `ws` 권고사항 해소. 남아 있던 `concurrently`의 심각 권고를 제거하기 위해 `shell-quote@1.8.4` 패치 버전을 강제하는 npm `overrides` 항목 추가. 두 락파일 모두 재생성 (현재 0개 취약점)
- **03-GettingStarted/samples/typescript**: `npm audit fix`로 간접 의존성 `qs`(중간 등급)를 패치된 버전으로 업데이트
- **03-GettingStarted/samples/javascript**: `npm audit fix`로 간접 의존성 `hono`(중간 등급)를 패치된 버전으로 업데이트
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix`로 간접 의존성 `form-data`(높음)를 패치된 버전으로 업데이트
- **03-GettingStarted/11-simple-auth/solution/typescript**: 누락된 `package-lock.json` 생성, 프로젝트 재현 가능하고 감사 가능하게 함 (0개 취약점)

#### 코드 수준 보안 수정 (OWASP A03: 주입 공격)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: `open_in_vscode` 도구에서 `shell=True` 제거. 이전 `subprocess.run(["start", "", vscode_path, folder_path], shell=True)`는 폴더 경로 내 셸 메타문자를 `cmd.exe`가 해석할 여지를 주어 명령어 주입 가능성이 있었음. 이제 해결된 `Code.exe`를 폴더 경로를 인자로 하여 직접 실행(셸 미사용)하여 기능상 동등하면서 안전함

#### Python 의존성 감사

- 모든 Python 요구사항 집합을 `pip-audit`으로 감사함. `05-AdvancedTopics` 및 `03-GettingStarted/samples/python`은 알려진 취약점 없음 보고 (그들의 `mcp` / `httpx` / `pydantic` / `python-dotenv` 범위가 현재 패치된 릴리스로 해석됨)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit`에서 간접 의존성 **`werkzeug` 3.1.1**에 대해 세 가지 `safe_join` 윈도우 장치명 DoS 권고사항(`CVE-2025-66221`, `CVE-2026-21860`, `CVE-2026-27199`, 모두 3.1.6에서 수정됨) 보고. 명시적 보안 핀 `werkzeug>=3.1.6` 추가하여 패치 릴리스가 해석되도록 조치; `chainlit` / `mcp` / `semantic-kernel` 스택과 함께 제한 조건이 문제없이 해석됨 검증

### 제품명 리브랜딩

교육 과정 콘텐츠 전반에 걸쳐 마이크로소프트 제품명 리브랜딩을 반영하여 업데이트함:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Discord 커뮤니티 링크 업데이트
- **AGENTS.md**: Discord 서버 참조 업데이트
- **README.md**: 기술 생태계 참조 업데이트
- **study_guide.md**: 사례 연구 참조 업데이트
- **05-AdvancedTopics/README.md**: 모듈 5.13 제목 및 설명 업데이트
- **05-AdvancedTopics/mcp-integration/README.md**: 섹션 제목 및 설명 업데이트
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: 모듈 전체 제목과 내용 업데이트
- **05-AdvancedTopics/mcp-security-entra/README.md**: 교차 참조 링크 업데이트
- **07-LessonsfromEarlyAdoption/README.md**: 사례 연구 참조 업데이트
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: 섹션 9 제목, 배지, 기능 업데이트
- **08-BestPractices/README.md**: Discord 커뮤니티 링크 업데이트
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Discord 채널 참조 업데이트
- **09-CaseStudy/docs-mcp/solution/python/README.md**: 모델 배포 참조 업데이트
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: AI 서비스 표 업데이트
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: 리소스 참조 업데이트

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code

- **README.md**: 주요 커리큘럼 참조 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: 모듈 제목, 개요 및 모든 모듈 헤더 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: 제목, 학습 목표, 설치 지침 및 리소스 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: 제목, 학습 목표, MCP 호스트 표 및 교차 참조 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: 제목, 배지, 전제 조건 및 리소스 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Agent Builder 참조 및 피드백 링크 업데이트
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: 전제 조건 및 확장 참조 업데이트

---

## 2026년 4월 11일

### 새로운 수업, 문서 수정 및 종속성 업데이트

#### 새 커리큘럼 콘텐츠 추가

**모듈 05 - 고급 주제**
- **수업 5.17: MCP를 이용한 적대적 다중 에이전트 추론**(`05-AdvancedTopics/mcp-adversarial-agents/README.md`): 다중 에이전트 시스템의 적대적 토론 패턴을 다룬 새로운 종합 가이드
  - 머메이드 아키텍처 다이어그램: 두 에이전트 → 공유 MCP 서버 → 토론 원고 → 심판 → 평결
  - 공유 MCP 도구 서버(`web_search` + `run_python`), Python과 TypeScript로 구현
  - 명확한 도구 사용 요구사항이 포함된 상반된 시스템 프롬프트 (FOR / AGAINST / 심판)
  - 라운드 관리 및 주장을 라우팅하는 Python, TypeScript, C# 토론 조정자
  - 실제 도구 호출을 위한 MCP `ClientSession` 조정자 연결
  - 사용 사례 표 (환각 감지, 위협 모델링, API 설계 검토, 사실 검증, 기술 선택)
  - 보안 고려사항: 샌드박스 실행, 도구 호출 검증, 속도 제한, 감사 로그
  - 세 가지 실습 시나리오로 구성된 구조화된 연습 (코드 리뷰, 아키텍처 결정, 콘텐츠 검열)

#### 문서 수정

**모듈 03 - 시작하기**
- **05-stdio-server/README.md**: 불완전했던 TypeScript stdio 서버 예시 수정 — 누락된 전송 인스턴스화(`new StdioServerTransport()`)와 `server.connect(transport)` 호출 추가, Python 및 .NET 예제와 일치하도록 수정
- **14-sampling/README.md**: 오타 수정 — `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`로 정정

#### 커리큘럼 업데이트

**메인 README.md**
- 새 수업에 대한 직접 링크와 함께 커리큘럼 표에 5.17 (MCP를 이용한 적대적 다중 에이전트 추론) 항목 추가

**05-AdvancedTopics/README.md**
- 수업 표에 5.17 행 추가

**study_guide.md**
- 고급 주제의 마인드맵과 설명에 적대적 다중 에이전트 추론 항목 추가

#### 코드 및 보안 수정

**모듈 05 - 적대적 에이전트 (`mcp-adversarial-agents`)**
- **보안 수정 — 명령어 삽입 방지**: TypeScript `run_python` 도구의 `execSync` 셸 보간을 `execFile` + `promisify`로 교체하여 명령어 삽입 취약점 제거 (LLM 제어 코드를 셸 관여 없이 리터럴 argv 요소로 전달)
- **MCP 도구 루프 연결**: Python 토론 조정자를 `AsyncAnthropic` 클라이언트로 업데이트(동기 `Anthropic` 대체), 각 에이전트 턴에 라이브 `ClientSession` 직접 전달, 각 턴마다 `session.list_tools()`로 도구 정의 조회, 모델이 최종 텍스트 응답 생성할 때까지 `session.call_tool()` 루프 내 전달

#### 종속성 업데이트

- 여러 패키지에서 `hono` 4.12.12로 업데이트(03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- TypeScript 패키지에서 `@hono/node-server`를 1.19.11에서 1.19.13으로 업데이트
- Python 패키지(10-StreamliningAIWorkflows 실습 3, 4)에서 `cryptography` 46.0.5에서 46.0.7로 업데이트
- 10-StreamliningAIWorkflows inspector에서 `lodash` 4.17.23에서 4.18.1로 업데이트

#### 번역

- 최신 소스 변경 사항과 동기화된 48개 이상 언어 번역(i18n 업데이트)

---

## 2026년 2월 5일

### 저장소 전반의 검증 및 탐색 개선

#### 새 커리큘럼 콘텐츠 추가

**모듈 03 - 시작하기**
- **12-mcp-hosts/README.md**: MCP 호스트 설정에 대한 새로운 종합 가이드   
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf 설정 예제  
  - 모든 주요 호스트에 대한 JSON 구성 템플릿  
  - 전송 유형 비교 표(stdio, SSE/HTTP, WebSocket)  
  - 일반적인 연결 문제 해결  
  - 호스트 구성에 대한 보안 모범 사례  

- **13-mcp-inspector/README.md**: MCP Inspector용 새로운 디버깅 가이드  
  - 설치 방법(npx, npm 전역, 소스에서)  
  - stdio 및 HTTP/SSE를 통한 서버 연결  
  - 테스트 도구, 리소스 및 프롬프트 워크플로우  
  - MCP Inspector와 VS Code 통합  
  - 일반적인 디버깅 시나리오 및 해결책  

**모듈 04 - 실용 구현**
- **pagination/README.md**: 새로운 페이지네이션 구현 가이드  
  - Python, TypeScript, Java에서의 커서 기반 페이지네이션 패턴  
  - 클라이언트 측 페이지네이션 처리  
  - 커서 설계 전략(불투명 커서 vs. 구조화 커서)  
  - 성능 최적화 권장사항  

**모듈 05 - 고급 주제**
- **mcp-protocol-features/README.md**: 새로운 프로토콜 기능 심층 탐구  
  - 진행 알림 구현  
  - 요청 취소 패턴  
  - URI 패턴을 포함한 리소스 템플릿  
  - 서버 라이프사이클 관리  
  - 로깅 레벨 제어  
  - JSON-RPC 코드 기반 에러 처리 패턴  

#### 탐색 수정 (24개 이상 파일 업데이트)

**메인 모듈 README들**  
 지금은 첫 수업과 다음 모듈 모두로 링크  

**02-Security 부 파일들**  
- 모든 5개 보안 보조 문서에 "What’s Next" 탐색 추가:  

**09-CaseStudy 파일들**  
- 모든 사례 연구 파일에 순차 탐색 추가:  

**10-StreamliningAI 실습들**  
모듈 10 개요와 모듈 11에 What’s Next 섹션 추가  

#### 코드 및 콘텐츠 수정

**SDK 및 종속성 업데이트**  
빈 openai 버전 고정: `^4.95.0`  
SDK를 `^1.8.0`에서 `>=1.26.0`으로 업데이트  
mcp 버전 핀을 `>=1.26.0`으로 업데이트  

**코드 수정**  
잘못된 모델 `gpt-4o-mini`를 `gpt-4.1-mini`로 수정  

**콘텐츠 수정**  
깨진 링크 `READMEmd` → `README.md` 수정, 커리큘럼 헤더 `Module 1-3` → `Module 0-3` 수정, 대소문자 민감 경로 수정  
손상된 중복 사례 연구 5 컨텐츠 제거  

**초보자 가이드 개선**
초보자를 위한 적절한 소개, 학습 목표 및 전제 조건 추가  

#### 커리큘럼 업데이트

**메인 README.md**
- 커리큘럼 표에 3.12 (MCP 호스트), 3.13 (MCP Inspector), 4.1 (페이지네이션), 5.16 (프로토콜 기능) 항목 추가

**모듈 README들**
수업 목록에 12와 13 추가  
페이지네이션 링크가 포함된 실용 가이드 섹션 추가  
5.15(맞춤형 전송) 및 5.16(프로토콜 기능) 수업 추가  

**study_guide.md**
- MCP 호스트 설정, MCP Inspector, 페이지네이션 전략, 프로토콜 기능 심층 탐구 등 모든 새 주제로 마인드맵 업데이트  

## 2026년 1월 28일

### MCP 사양 2025-11-25 준수 검토

#### 핵심 개념 개선 (01-CoreConcepts/)
- **새 클라이언트 원시 요소 - Roots**: 서버가 파일 시스템 경계 및 접근 권한을 이해할 수 있게 하는 Roots 클라이언트 원시 요소에 대한 종합 문서 추가  
- **도구 주석**: 도구 실행 결정을 위한 도구 행위 주석(`readOnlyHint`, `destructiveHint`) 문서 추가  
- **샘플링 시 도구 호출**: 샘플링 문서에 모델 주도 도구 호출을 위한 `tools` 및 `toolChoice` 매개변수 포함 추가  
- **URL 모드 이끌어내기**: 서버 주도 외부 웹 상호 작용을 위한 URL 기반 이끌어내기 문서 추가  
- **작업(실험적)**: 지속 실행 래퍼 및 연기 결과 검색용 실험적 작업 기능에 관한 새 섹션 추가  
- **아이콘 지원**: 도구, 리소스, 리소스 템플릿, 프롬프트에 아이콘을 추가 메타데이터로 포함할 수 있음을 명시  

#### 문서 업데이트
- **README.md**: MCP 사양 2025-11-25 버전 참조 및 날짜 기반 버전 관리 설명 추가  
- **study_guide.md**: 핵심 개념 섹션에 작업 및 도구 주석 포함하도록 커리큘럼 맵 업데이트; 문서 타임스탬프 갱신  

#### 사양 준수 검증
- **프로토콜 버전**: 모든 문서가 최신 MCP 사양 2025-11-25 참조하는지 확인  
- **아키텍처 정렬**: 2층 아키텍처(데이터 계층 + 전송 계층) 문서 정확성 확인  
- **원시 요소 문서**: 서버 원시 요소(리소스, 프롬프트, 도구) 및 클라이언트 원시 요소(샘플링, 이끌어내기, 로깅, Roots) 검증  
- **전송 메커니즘**: STDIO 및 스트리밍 HTTP 전송 문서 정확성 검증  
- **보안 지침**: 최신 MCP 보안 모범 사례 문서와 일치 여부 확인  

#### 주요 MCP 2025-11-25 기능 문서화
- **OpenID Connect 검색**: OIDC를 통한 인증 서버 검색  
- **OAuth 클라이언트 ID 메타데이터 문서**: 권장 클라이언트 등록 메커니즘  
- **JSON 스키마 2020-12**: MCP 스키마 정의의 기본 방언  
- **SDK 티어링 시스템**: SDK 기능 지원 및 유지에 대한 공식 요구사항화  
- **거버넌스 구조**: MCP 거버넌스 내 워킹 그룹 및 관심 그룹 공식화  

### 보안 문서 대규모 업데이트 (02-Security/)

#### MCP 보안 서밋 워크숍 (Sherpa) 통합
- **새 실습 교육 리소스**: 모든 보안 문서에 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)와의 포괄적 통합 추가  
- **원정 경로 커버리지**: 베이스캠프부터 정상까지 캠프 간 진행 전 구간 문서화  
- **OWASP 정렬**: 모든 보안 지침이 OWASP MCP Azure 보안 가이드 위험에 매핑됨  

#### OWASP MCP Top 10 통합
- **새 섹션**: OWASP MCP Top 10 보안 위험 테이블 및 Azure 완화책을 메인 보안 README에 추가  
- **위험 기반 문서화**: 각 보안 도메인에 대한 OWASP MCP 위험 참조를 포함하도록 mcp-security-controls-2025.md 업데이트  
- **참조 아키텍처**: OWASP MCP Azure 보안 가이드 참조 아키텍처 및 구현 패턴 링크  

#### 업데이트된 보안 파일들
- **README.md**: Sherpa 워크숍 개요, 원정 경로 표, OWASP MCP Top 10 위험 요약 및 실습 교육 섹션 추가  
- **mcp-security-controls-2025.md**: 헤더를 2026년 2월로 업데이트, OWASP 위험 참조 추가(MCP01-MCP08), 사양 버전 불일치 수정  
- **mcp-security-best-practices-2025.md**: Sherpa 및 OWASP 리소스 섹션 추가, 타임스탬프 업데이트  
- **mcp-best-practices.md**: Sherpa 및 OWASP 링크가 포함된 실습 교육 섹션 추가  
- **azure-content-safety-implementation.md**: OWASP MCP06 참조, Sherpa 캠프 3 정렬 및 추가 리소스 섹션 추가  

#### 새 리소스 링크 추가
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- 개별 OWASP MCP 위험 페이지 (MCP01-MCP10)

### 커리큘럼 전반의 MCP 사양 2025-11-25 정렬

#### 모듈 03 - 시작하기
- **SDK 문서**: 공식 SDK 목록에 Go SDK 추가; 모든 SDK 참조를 MCP 사양 2025-11-25에 맞게 업데이트  
- **전송 명확화**: STDIO 및 HTTP 스트리밍 전송 설명에 명시적 사양 참조 추가  

#### 모듈 04 - 실용 구현
- **SDK 업데이트**: Go SDK 추가; 사양 버전 참조로 SDK 목록 업데이트  
- **권한 부여 사양**: MCP 권한 부여 사양 링크를 최신 2025-11-25 버전으로 업데이트  

#### 모듈 05 - 고급 주제
- **새 기능**: MCP 사양 2025-11-25 신규 기능(작업, 도구 주석, URL 모드 이끌어내기, Roots)에 대한 메모 추가  
- **보안 리소스**: 추가 참고자료에 OWASP MCP Top 10 및 Sherpa 워크숍 링크 추가  

#### 모듈 06 - 커뮤니티 기여
- **SDK 목록**: Swift 및 Rust SDK 추가; 사양 링크를 2025-11-25로 업데이트  
- **사양 참조**: MCP 사양 링크를 사양 직링크 URL로 업데이트  

#### 모듈 07 - 초기 도입에서의 교훈

- **리소스 업데이트**: MCP Specification 2025-11-25 링크 및 OWASP MCP Top 10을 추가 리소스에 추가함

#### 모듈 08 - 모범 사례
- **스펙 버전**: MCP Specification 참조를 2025-11-25로 업데이트함
- **보안 리소스**: OWASP MCP Top 10과 Sherpa 워크숍을 추가 참고자료로 추가함

#### 모듈 10 - AI 워크플로우 간소화
- **배지 업데이트**: MCP 버전 배지를 SDK 버전(1.9.3)에서 사양 버전(2025-11-25)으로 변경함
- **리소스 링크**: MCP Specification 링크 업데이트; OWASP MCP Top 10 추가

#### 모듈 11 - MCP 서버 실습 실험실
- **사양 참조**: MCP Specification 링크를 2025-11-25 버전으로 업데이트함
- **보안 리소스**: 공식 리소스에 OWASP MCP Top 10 추가

## 2025년 12월 18일

### 보안 문서 업데이트 - MCP Specification 2025-11-25

#### MCP 보안 모범 사례 (02-Security/mcp-best-practices.md) - 사양 버전 업데이트
- **프로토콜 버전 업데이트**: 최신 MCP Specification 2025-11-25 참조로 업데이트됨 (2025년 11월 25일 출시)
  - 모든 사양 버전 참조를 2025-06-18에서 2025-11-25로 업데이트함
  - 문서 날짜 참조를 2025년 8월 18일에서 2025년 12월 18일로 업데이트함
  - 모든 사양 URL이 최신 문서로 연결되는지 확인함
- **내용 검증**: 최신 기준에 따른 보안 모범 사례의 포괄적 검증
  - **Microsoft 보안 솔루션**: Prompt Shields(이전 명칭 “Jailbreak 위험 감지”), Azure Content Safety, Microsoft Entra ID, Azure Key Vault에 대한 최신 용어와 링크 검증
  - **OAuth 2.1 보안**: 최신 OAuth 보안 모범 사례와 일치함을 확인함
  - **OWASP 기준**: LLM용 OWASP Top 10 참조가 최신임을 검증함
  - **Azure 서비스**: 모든 Microsoft Azure 문서 링크와 모범 사례 재검증
- **기준 정렬**: 참조된 모든 보안 표준이 최신임을 확인함
  - NIST AI 위험 관리 프레임워크
  - ISO 27001:2022
  - OAuth 2.1 보안 모범 사례
  - Azure 보안 및 컴플라이언스 프레임워크
- **구현 리소스**: 모든 구현 가이드 링크 및 리소스 검증 완료
  - Azure API 관리 인증 패턴
  - Microsoft Entra ID 통합 가이드
  - Azure Key Vault 비밀 관리
  - DevSecOps 파이프라인 및 모니터링 솔루션

### 문서 품질 보증
- **사양 준수**: 모든 필수 MCP 보안 요구사항(MUST/MUST NOT)이 최신 사양과 일치함을 보장함
- **리소스 최신성**: Microsoft 문서, 보안 표준 및 구현 가이드에 대한 모든 외부 링크 검증
- **모범 사례 적용 범위**: 인증, 권한 부여, AI 특화 위협, 공급망 보안 및 엔터프라이즈 패턴 전반에 걸친 포괄적 커버리지 확인

## 2025년 10월 6일

### 시작하기 섹션 확장 – 고급 서버 사용 및 간단 인증

#### 고급 서버 사용법 (03-GettingStarted/10-advanced)
- **신규 장 추가**: 정규 및 저수준 서버 아키텍처를 모두 다루는 고급 MCP 서버 사용법에 대한 포괄적 가이드 추가
  - **정규 서버 vs 저수준 서버**: Python 및 TypeScript 코드 예제와 함께 두 접근 방식의 상세 비교
  - **핸들러 기반 설계**: 확장 가능하고 유연한 서버 구현을 위한 도구/리소스/프롬프트 관리에 핸들러 기반 설계 설명
  - **실용적 패턴**: 고급 기능 및 아키텍처에 유용한 저수준 서버 패턴의 실제 시나리오

#### 간단 인증 (03-GettingStarted/11-simple-auth)
- **신규 장 추가**: MCP 서버에서 간단 인증 구현을 단계별로 안내하는 가이드 추가
  - **인증 개념**: 인증과 권한 부여, 자격 증명 처리에 대한 명확한 설명
  - **기본 인증 구현**: Python (Starlette)과 TypeScript (Express)에서 미들웨어 기반 인증 패턴 및 코드 샘플 제공
  - **고급 보안으로의 단계적 전환**: 간단 인증으로 시작해 OAuth 2.1 및 RBAC로 발전하는 안내 및 고급 보안 모듈 참조

이 추가 내용은 보다 견고하고 안전하며 유연한 MCP 서버 구현을 구축하기 위한 실용적 실습 지침을 제공하여 기초 개념과 고급 프로덕션 패턴을 연결합니다.

## 2025년 9월 29일

### MCP 서버 데이터베이스 통합 실습 - 포괄적 실습 학습 경로

#### 11-MCPServerHandsOnLabs - 완전한 데이터베이스 통합 커리큘럼 신규 추가
- **총 13개 실습 과정**: PostgreSQL 데이터베이스 통합을 갖춘 프로덕션 준비 MCP 서버 구축을 위한 포괄적 실습 커리큘럼 추가
  - **실제 구현 사례**: 엔터프라이즈 수준 패턴을 보여주는 Zava Retail 분석 사례
  - **체계적 학습 진행**:
    - **실습 00-03: 기초** - 소개, 핵심 아키텍처, 보안 및 멀티테넌시, 환경 설정
    - **실습 04-06: MCP 서버 빌드** - 데이터베이스 설계 및 스키마, MCP 서버 구현, 도구 개발  
    - **실습 07-09: 고급 기능** - 시맨틱 검색 통합, 테스트 및 디버깅, VS Code 통합
    - **실습 10-12: 프로덕션 및 모범 사례** - 배포 전략, 모니터링 및 관찰 가능성, 모범 사례 및 최적화
  - **엔터프라이즈 기술**: FastMCP 프레임워크, pgvector 포함 PostgreSQL, Azure OpenAI 임베딩, Azure Container Apps, Application Insights
  - **고급 기능**: 행 수준 보안(RLS), 시맨틱 검색, 멀티테넌트 데이터 액세스, 벡터 임베딩, 실시간 모니터링

#### 용어 표준화 - 모듈에서 실습으로 전환
- **포괄적 문서 업데이트**: 11-MCPServerHandsOnLabs 내 모든 README 파일에서 "Lab" 용어를 “Module” 대신 체계적으로 사용하도록 변경
  - **섹션 제목**: 13개 실습 모두 “이 모듈이 다루는 내용”을 “이 실습이 다루는 내용”으로 변경
  - **내용 설명**: 문서 전체에서 “이 모듈은...”을 “이 실습은...”으로 변경
  - **학습 목표**: “이 모듈이 끝날 때까지...”를 “이 실습이 끝날 때까지...”로 수정
  - **내비게이션 링크**: 모든 교차 참조와 네비게이션에서 "Module XX:"를 "Lab XX:"로 변환
  - **완료 추적**: “이 모듈을 완료한 후...”를 “이 실습을 완료한 후...”로 업데이트
  - **기술 참조 유지**: 구성 파일 내 Python 모듈 참조는 유지됨(예: `"module": "mcp_server.main"`)

#### 학습 가이드 개선 (study_guide.md)
- **비주얼 커리큘럼 맵**: “11. Database Integration Labs” 섹션을 새로 추가하여 실습 구조를 시각화함
- **저장소 구조**: 주 섹션 수를 열 개에서 열한 개로 업데이트하고 11-MCPServerHandsOnLabs 상세 설명 추가
- **학습 경로 안내**: 00-11 섹션 내비게이션 지침 강화
- **기술 적용 범위**: FastMCP, PostgreSQL, Azure 서비스 통합 세부사항 추가
- **학습 성과**: 프로덕션 준비 서버 개발, 데이터베이스 통합 패턴, 엔터프라이즈 보안 강조

#### 메인 README 구조 개선
- **실습 기반 용어 사용**: 11-MCPServerHandsOnLabs의 메인 README.md에서 일관되게 “Lab” 구조 사용으로 업데이트
- **학습 경로 조직**: 기초 개념에서 고급 구현을 거쳐 프로덕션 배포까지 명확한 진행 경로 제공
- **실제 적용 강조**: 엔터프라이즈 수준 패턴 및 기술에 초점을 맞춘 실용적 실습 강조

### 문서 품질 및 일관성 향상
- **실습 중심 학습 강조**: 문서 전반에 실습 기반 접근법 강화
- **엔터프라이즈 패턴 강조**: 프로덕션 준비 구현 및 엔터프라이즈 보안 고려사항 강조
- **기술 통합**: 현대 Azure 서비스 및 AI 통합 패턴의 포괄적 다룸
- **학습 진행**: 기본 개념부터 프로덕션 배포까지 명확하고 구조화된 경로 제공

## 2025년 9월 26일

### 사례 연구 강화 - GitHub MCP 레지스트리 통합

#### 사례 연구 (09-CaseStudy/) - 생태계 개발 초점
- **README.md**: 포괄적인 GitHub MCP 레지스트리 사례 연구로 대폭 확장
  - **GitHub MCP 레지스트리 사례 연구**: 2025년 9월 GitHub MCP 레지스트리 출시에 관한 신규 포괄 사례 연구
    - **문제 분석**: 단절된 MCP 서버 검색 및 배포 과제 상세 검토
    - **솔루션 아키텍처**: GitHub의 중앙집중식 레지스트리 접근 방식과 원클릭 VS Code 설치
    - **비즈니스 영향**: 개발자 온보딩 및 생산성에서 측정 가능한 개선
    - **전략적 가치**: 모듈식 에이전트 배포 및 도구 간 상호 운용성 강조
    - **생태계 개발**: 에이전트 통합을 위한 기반 플랫폼으로서의 위치
  - **강화된 사례 연구 구조**: 7개 모든 사례 연구를 일관된 형식과 포괄적 설명으로 업데이트
    - Azure AI 여행 에이전트: 다중 에이전트 오케스트레이션 강조
    - Azure DevOps 통합: 워크플로우 자동화 집중
    - 실시간 문서 검색: Python 콘솔 클라이언트 구현
    - 인터랙티브 학습 계획 생성기: Chainlit 대화형 웹 앱
    - 인에디터 문서: VS Code 및 GitHub Copilot 통합
    - Azure API 관리: 엔터프라이즈 API 통합 패턴
    - GitHub MCP 레지스트리: 생태계 개발 및 커뮤니티 플랫폼
  - **포괄적 결론**: 여러 MCP 구현 차원을 아우르는 7개 사례 연구를 강조하는 결론 부분 재작성
    - 엔터프라이즈 통합, 다중 에이전트 오케스트레이션, 개발자 생산성
    - 생태계 개발, 교육 응용 분야 분류
    - 아키텍처 패턴, 구현 전략 및 모범 사례에 대한 향상된 통찰
    - 성숙하고 프로덕션 준비된 프로토콜로서의 MCP 강조

#### 학습 가이드 업데이트 (study_guide.md)
- **비주얼 커리큘럼 맵**: 사례 연구 섹션에 GitHub MCP 레지스트리 포함하도록 마인드맵 업데이트
- **사례 연구 설명**: 일반 설명에서 7개 포괄적 사례 연구의 상세 분석으로 강화
- **저장소 구조**: 10번 섹션을 상세 구현 내용으로 사례 연구 포괄에 맞게 업데이트
- **변경 로그 통합**: 2025년 9월 26일 항목에 GitHub MCP 레지스트리 추가 및 사례 연구 강화 내역 기록
- **날짜 업데이트**: 최신 수정일(2025년 9월 26일)로 푸터 타임스탬프 업데이트

### 문서 품질 개선
- **일관성 강화**: 7개 모든 사례 연구에 일관된 형식 및 구조 표준화
- **포괄적 적용**: 사례 연구가 엔터프라이즈, 개발자 생산성 및 생태계 개발 시나리오 전반을 아우름
- **전략적 위치화**: 에이전틱 시스템 배포를 위한 기반 플랫폼으로서의 MCP 강조 강화
- **리소스 통합**: GitHub MCP 레지스트리 링크를 추가하여 추가 리소스 업데이트

## 2025년 9월 15일

### 고급 주제 확장 - 맞춤 전송 및 컨텍스트 엔지니어링

#### MCP 맞춤 전송 (05-AdvancedTopics/mcp-transport/) - 신규 고급 구현 가이드
- **README.md**: 맞춤 MCP 전송 메커니즘에 대한 완전한 구현 가이드
  - **Azure Event Grid 전송**: 포괄적인 서버리스 이벤트 기반 전송 구현
    - C#, TypeScript 및 Python 예제와 Azure Functions 통합
    - 확장 가능한 MCP 솔루션을 위한 이벤트 기반 아키텍처 패턴
    - 웹훅 수신기 및 푸시 기반 메시지 처리
  - **Azure Event Hubs 전송**: 고처리량 스트리밍 전송 구현
    - 저지연 시나리오를 위한 실시간 스트리밍 기능
    - 파티셔닝 전략 및 체크포인트 관리
    - 메시지 배치 및 성능 최적화
  - **엔터프라이즈 통합 패턴**: 프로덕션 준비 아키텍처 예제
    - 여러 Azure Functions에 분산된 MCP 처리
    - 다양한 전송 유형을 결합한 하이브리드 전송 아키텍처
    - 메시지 내구성, 신뢰성 및 오류 처리 전략
  - **보안 및 모니터링**: Azure Key Vault 통합 및 관찰 패턴
    - 관리형 ID 인증 및 최소 권한 액세스
    - Application Insights 원격 측정 및 성능 모니터링
    - 회로 차단기 및 결함 허용 패턴
  - **테스트 프레임워크**: 맞춤 전송을 위한 포괄적 테스트 전략
    - 테스트 더블 및 모킹 프레임워크를 사용한 단위 테스트
    - Azure Test Containers를 활용한 통합 테스트
    - 성능 및 부하 테스트 고려사항

#### 컨텍스트 엔지니어링 (05-AdvancedTopics/mcp-contextengineering/) - 신흥 AI 분야
- **README.md**: 신흥 분야로서 컨텍스트 엔지니어링에 대한 포괄적 탐구
  - **핵심 원리**: 완전한 컨텍스트 공유, 행동 결정 인식, 컨텍스트 창 관리
  - **MCP 프로토콜 정렬**: MCP 설계가 컨텍스트 엔지니어링 과제를 어떻게 해결하는지
    - 컨텍스트 창 제한 및 점진적 로딩 전략
    - 관련성 결정 및 동적 컨텍스트 검색
    - 다중 모달 컨텍스트 처리 및 보안 고려사항
  - **구현 접근법**: 단일 스레드 대 다중 에이전트 아키텍처
    - 컨텍스트 청킹 및 우선순위 지정 기술
    - 점진적 컨텍스트 로딩 및 압축 전략
    - 계층화된 컨텍스트 접근법 및 검색 최적화
  - **측정 프레임워크**: 컨텍스트 효과성 평가를 위한 신흥 메트릭
    - 입력 효율성, 성능, 품질 및 사용자 경험 고려사항
    - 컨텍스트 최적화를 위한 실험적 접근법
    - 실패 분석 및 개선 방법론

#### 커리큘럼 네비게이션 업데이트 (README.md)
- **강화된 모듈 구조**: 신규 고급 주제를 포함하도록 커리큘럼 표 업데이트
  - 컨텍스트 엔지니어링(5.14) 및 맞춤 전송(5.15) 항목 추가
  - 모든 모듈에 걸쳐 일관된 서식과 내비게이션 링크 적용
  - 현재 콘텐츠 범위를 반영하도록 설명 업데이트

### 디렉터리 구조 개선
- **명명 표준화**: “mcp transport”를 다른 고급 주제 폴더와 일관성을 위해 “mcp-transport”로 이름 변경
- **콘텐츠 조직화**: 모든 05-AdvancedTopics 폴더가 일관된 명명 규칙(mcp-[topic])을 따름

### 문서 품질 향상
- **MCP 사양 정렬**: 모든 신규 콘텐츠가 최신 MCP Specification 2025-06-18 참조
- **다국어 예제**: C#, TypeScript 및 Python의 포괄적 코드 예제 제공

- **기업 중심**: 프로덕션 준비 패턴 및 Azure 클라우드 통합 전반에 걸쳐
- **시각적 문서화**: 아키텍처 및 흐름 시각화를 위한 Mermaid 다이어그램

## 2025년 8월 18일

### 문서 종합 업데이트 - MCP 2025-06-18 표준

#### MCP 보안 모범 사례 (02-Security/) - 완전한 현대화
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP 명세 2025-06-18에 맞춘 전면 재작성
  - **필수 요구사항**: 명확한 시각적 표시와 함께 공식 명세의 MUST/MUST NOT 요구사항 추가
  - **12가지 핵심 보안 관행**: 15항목 목록에서 종합 보안 도메인으로 재구조화
    - 외부 ID 공급자 통합을 통한 토큰 보안 및 인증
    - 암호화 요구사항을 포함한 세션 관리 및 전송 보안
    - Microsoft Prompt Shields 통합을 통한 AI 특정 위협 보호
    - 최소 권한 원칙을 적용한 접근 제어 및 권한 관리
    - Azure Content Safety 통합을 통한 콘텐츠 안전 및 모니터링
    - 포괄적 구성 요소 검증을 포함한 공급망 보안
    - PKCE 구현을 통한 OAuth 보안 및 혼동 대리자 방지
    - 자동화 역량을 갖춘 사고 대응 및 복구
    - 규제 준수를 포함한 컴플라이언스 및 거버넌스
    - 제로 트러스트 아키텍처를 통한 고급 보안 제어
    - 포괄적 솔루션을 갖춘 Microsoft 보안 생태계 통합
    - 적응형 관행을 통한 지속적 보안 진화
  - **Microsoft 보안 솔루션**: Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security에 대한 통합 가이드 강화
  - **구현 리소스**: 공식 MCP 문서, Microsoft 보안 솔루션, 보안 표준, 구현 가이드별로 포괄적 리소스 링크 분류

#### 고급 보안 제어 (02-Security/) - 엔터프라이즈 구현
- **MCP-SECURITY-CONTROLS-2025.md**: 엔터프라이즈급 보안 프레임워크로 완전 재구성
  - **9가지 종합 보안 도메인**: 기본 제어에서 상세 엔터프라이즈 프레임워크로 확장
    - Microsoft Entra ID 통합을 통한 고급 인증 및 권한 부여
    - 포괄적 검증을 통한 토큰 보안 및 전달 통제
    - 하이재킹 방지를 포함한 세션 보안 제어
    - 프롬프트 주입 및 도구 중독 방지를 위한 AI 특정 보안 제어
    - OAuth 프록시 보안을 통한 혼동 대리자 공격 방지
    - 샌드박싱 및 격리를 통한 도구 실행 보안
    - 의존성 검증을 포함한 공급망 보안 제어
    - SIEM 통합을 통한 모니터링 및 탐지 제어
    - 자동화 역량을 갖춘 사고 대응 및 복구
  - **구현 사례**: 상세한 YAML 구성 블록 및 코드 예제 추가
  - **Microsoft 솔루션 통합**: Azure 보안 서비스, GitHub Advanced Security, 엔터프라이즈 신원 관리 전반에 걸친 포괄적 적용

#### 고급 주제 보안 (05-AdvancedTopics/mcp-security/) - 프로덕션 준비 구현
- **README.md**: 엔터프라이즈 보안 구현을 위한 전체 재작성
  - **현재 명세와의 정렬**: MCP 명세 2025-06-18에 맞춘 업데이트 및 필수 보안 요구사항 포함
  - **강화된 인증**: Microsoft Entra ID 통합과 포괄적 .NET 및 Java Spring Security 예제 포함
  - **AI 보안 통합**: Microsoft Prompt Shields 및 Azure Content Safety 구현과 상세한 Python 예제 포함
  - **고급 위협 완화**: 다음 구현 사례의 포괄적 예제
    - PKCE 및 사용자 동의 검증을 통한 혼동 대리자 공격 방지
    - 대상 검증 및 안전한 토큰 관리로 토큰 전달 방지
    - 암호화 바인딩 및 행동 분석을 통한 세션 하이재킹 방지
  - **기업 보안 통합**: Azure Application Insights 모니터링, 위협 탐지 파이프라인, 공급망 보안 포함
  - **구현 체크리스트**: 필수 대 권장 보안 제어를 명확하게 구분하고 Microsoft 보안 생태계 혜택 포함

### 문서 품질 및 표준 정렬
- **명세 참조**: 모든 참조를 현재 MCP 명세 2025-06-18로 업데이트
- **Microsoft 보안 생태계**: 전 보안 문서에 통합 가이드 강화
- **실용적 구현**: 엔터프라이즈 패턴과 함께 .NET, Java, Python의 상세 코드 예제 추가
- **리소스 구성**: 공식 문서, 보안 표준, 구현 가이드 분류 포괄적 정리
- **시각적 표시기**: 필수 요구사항과 권장 관행을 명확히 구분


#### 핵심 개념 (01-CoreConcepts/) - 완전한 현대화
- **프로토콜 버전 업데이트**: 기준 MCP 명세 2025-06-18 (YYYY-MM-DD 형식)을 참조하도록 업데이트
- **아키텍처 정제**: Hosts, Clients, Servers 설명을 현재 MCP 아키텍처 패턴에 맞게 강화
  - Hosts는 이제 여러 MCP 클라이언트 연결을 조율하는 AI 애플리케이션으로 명확히 정의
  - Clients는 일대일 서버 관계를 유지하는 프로토콜 커넥터로 설명
  - Servers는 로컬 및 원격 배포 시나리오로 강화
- **프리미티브 재구성**: 서버 및 클라이언트 프리미티브 완전 개편
  - 서버 프리미티브: 리소스(데이터 소스), 프롬프트(템플릿), 도구(실행 함수)에 대한 상세 설명과 예제
  - 클라이언트 프리미티브: 샘플링(LLM 완성), 유도(사용자 입력), 로깅(디버깅/모니터링)
  - 현재 발견(`*/list`), 검색(`*/get`), 실행(`*/call`) 메서드 패턴으로 업데이트
- **프로토콜 아키텍처**: 2계층 아키텍처 모델 도입
  - 데이터 계층: JSON-RPC 2.0 기반 수명주기 관리 및 프리미티브 포함
  - 전송 계층: STDIO(로컬) 및 Streamable HTTP with SSE(원격) 전송 메커니즘
- **보안 프레임워크**: 명시적 사용자 동의, 데이터 프라이버시 보호, 도구 실행 안전성, 전송 계층 보안을 포함한 종합 보안 원칙
- **통신 패턴**: 초기화, 발견, 실행, 알림 흐름을 보여주는 프로토콜 메시지 업데이트
- **코드 예제**: 최신 MCP SDK 패턴을 반영한 다중 언어(.NET, Java, Python, JavaScript) 예제 갱신

#### 보안 (02-Security/) - 종합 보안 개편  
- **표준 정렬**: MCP 명세 2025-06-18 보안 요구사항과 완전 정렬
- **인증 진화**: 맞춤 OAuth 서버에서 외부 ID 공급자 위임(Microsoft Entra ID)으로 발전 문서화
- **AI 특정 위협 분석**: 최신 AI 공격 벡터 보강
  - 실세계 예제와 함께 상세한 프롬프트 주입 공격 시나리오
  - 도구 중독 메커니즘 및 "러그 풀" 공격 패턴
  - 컨텍스트 윈도우 중독 및 모델 혼란 공격
- **Microsoft AI 보안 솔루션**: Microsoft 보안 생태계 전반에 걸친 포괄적 적용
  - 고급 탐지, 스포트라이트, 구분기술을 갖춘 AI Prompt Shields
  - Azure Content Safety 통합 패턴
  - 공급망 보호를 위한 GitHub Advanced Security
- **고급 위협 완화**: 상세 보안 제어
  - MCP 특화 공격 시나리오와 암호화 세션 ID 요구사항을 포함한 세션 하이재킹
  - 명시적 동의 요구사항이 포함된 MCP 프록시 상황의 혼동 대리자 문제
  - 필수 검증 제어가 적용된 토큰 전달 취약점
- **공급망 보안**: 기초 모델, 임베딩 서비스, 컨텍스트 제공자, 서드파티 API를 포함한 AI 공급망 범위 확대
- **기반 보안**: 제로 트러스트 아키텍처 및 Microsoft 보안 생태계를 포함한 엔터프라이즈 보안 패턴 강화
- **리소스 구성**: 유형별(공식 문서, 표준, 연구, Microsoft 솔루션, 구현 가이드)로 포괄적 리소스 링크 분류

### 문서 품질 향상
- **구조화된 학습 목표**: 구체적이고 실행 가능한 학습 목표 강화
- **상호 참조**: 관련 보안 및 핵심 개념 주제 간 링크 추가
- **최신 정보**: 모든 날짜 참조 및 명세 링크를 최신 표준으로 업데이트
- **구현 안내**: 두 섹션 전반에 걸쳐 구체적이고 실행 가능한 구현 지침 추가

## 2025년 7월 16일

### README 및 내비게이션 개선
- README.md의 커리큘럼 내비게이션 완전 재설계
- `<details>` 태그를 더 접근성 좋은 표 기반 형식으로 대체
- 새로운 "alternative_layouts" 폴더에 대체 레이아웃 옵션 생성
- 카드 기반, 탭 스타일, 아코디언 스타일 내비게이션 예제 추가
- 최신 파일을 모두 포함하도록 저장소 구조 섹션 업데이트
- 명확한 권장사항으로 "이 커리큘럼 사용법" 섹션 강화
- MCP 명세 링크를 올바른 URL로 업데이트
- 커리큘럼 구조에 Context Engineering 섹션(5.14) 추가

### 학습 가이드 업데이트
- 현재 저장소 구조에 맞춰 학습 가이드 전면 개정
- MCP 클라이언트 및 도구, 인기 MCP 서버에 대한 새로운 섹션 추가
- 시각적 커리큘럼 맵을 전체 주제에 정확히 반영하도록 업데이트
- 고급 주제 설명을 강화하여 모든 전문 분야 포함
- 사례 연구 섹션을 실제 예제로 업데이트
- 이 종합 변경 로그 추가

### 커뮤니티 기여 (06-CommunityContributions/)
- 이미지 생성용 MCP 서버에 대한 상세 정보 추가
- VSCode에서 Claude 사용에 관한 포괄적 섹션 추가
- Cline 터미널 클라이언트 설정 및 사용법 안내 추가
- 인기 있는 모든 MCP 클라이언트 옵션을 포함하도록 MCP 클라이언트 섹션 업데이트
- 더 정확한 코드 샘플로 기여 예제 강화

### 고급 주제 (05-AdvancedTopics/)
- 일관된 명명법으로 모든 전문 주제 폴더 구성
- 컨텍스트 엔지니어링 자료 및 예제 추가
- Foundry 에이전트 통합 문서 추가
- Entra ID 보안 통합 문서 강화

## 2025년 6월 11일

### 초기 생성
- MCP for Beginners 커리큘럼 첫 버전 공개
- 10개 주요 섹션의 기본 구조 생성
- 내비게이션용 시각적 커리큘럼 맵 구현
- 여러 프로그래밍 언어의 초기 샘플 프로젝트 추가

### 시작하기 (03-GettingStarted/)
- 최초 서버 구현 예제 생성
- 클라이언트 개발 가이드 추가
- LLM 클라이언트 통합 지침 포함
- VS Code 통합 문서 추가
- Server-Sent Events (SSE) 서버 예제 구현

### 핵심 개념 (01-CoreConcepts/)
- 클라이언트-서버 아키텍처에 대한 상세 설명 추가
- 주요 프로토콜 구성 요소 문서화
- MCP의 메시징 패턴 문서화

## 2025년 5월 23일

### 저장소 구조
- 기본 폴더 구조로 저장소 초기화
- 각 주요 섹션별 README 파일 생성
- 번역 인프라 설정
- 이미지 자산 및 다이어그램 추가

### 문서
- 커리큘럼 개요를 포함한 초기 README.md 생성
- CODE_OF_CONDUCT.md 및 SECURITY.md 추가
- 도움말 안내를 위한 SUPPORT.md 설정
- 예비 학습 가이드 구조 생성

## 2025년 4월 15일

### 계획 및 프레임워크
- MCP for Beginners 커리큘럼 초기 계획
- 학습 목표 및 대상 사용자 정의
- 커리큘럼 10개 섹션 구조 개요
- 예제 및 사례 연구를 위한 개념적 프레임워크 개발
- 핵심 개념을 위한 초기 프로토타입 예제 생성

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->