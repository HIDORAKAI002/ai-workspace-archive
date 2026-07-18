# 변경 로그

**AI Agents for Beginners** 코스의 모든 주요 변경 사항은 이 파일에 기록되어 있습니다.

## [출시됨] — 2026-07-13

이번 릴리스에서는 배포 아크를 완성하는 두 개의 새로운 레슨 — Microsoft Foundry로의 에이전트 확장과 단일 워크스테이션까지 축소 — 가 추가되었으며, 스모크 테스트 파이프라인, 새롭게 단장한 코스 내비게이션, 새로운 학습자 기술, 그리고 업데이트된 브랜딩이 포함되어 있습니다.

### 추가됨

- **레슨 16 — Microsoft Foundry와 함께하는 확장 가능한 에이전트 배포.** 새로운 레슨 [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) 및 실행 가능한 노트북 [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb)에서는 프로덕션 고객 지원 에이전트(도구, RAG, 메모리, 모델 라우팅, 응답 캐싱, 인간 승인, 평가 게이트, OpenTelemetry 추적)를 구축하며, 개발/배포/런타임 Mermaid 다이어그램, 지식 확인, 과제, 챌린지가 포함되어 있습니다.
- **레슨 17 — Foundry Local 및 Qwen과 함께하는 로컬 AI 에이전트 생성.** 새로운 레슨 [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) 및 노트북 [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb)에서는 완전한 온디바이스 엔지니어링 어시스턴트(Qwen 함수 호출 via Foundry Local, 샌드박스 파일 도구, 로컬 RAG with Chroma, 선택적 로컬 MCP)를 구축하며, 로컬 전용 / 로컬-RAG / 도구 호출 다이어그램, 지식 확인, 과제, 챌린지가 포함되어 있습니다.
- **스모크 테스트 파이프라인.** 새로운 [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) 워크플로우 [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) 및 각 레슨마다 배포 가능한 에이전트가 포함된 카탈로그 [tests/](./tests/README.md) (레슨 01, 04, 05, 16)와 각 카탈로그를 레슨 및 호스팅 에이전트 이름에 매핑하는 인덱스 README가 추가되었습니다. 레슨 16에는 "스모크 테스트를 통한 배포된 에이전트 검증" 섹션이 포함되었으며, 레슨 01/04/05에는 선택적 스모크 테스트 포인터가 추가되었습니다.
- **학습자 기술.** `.agents/skills/` 아래에 새로운 에이전트 스킬 추가: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (레슨 16 및 17 가이드 포함), 그리고 [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (라이브 Microsoft Foundry / Azure OpenAI 설정에 대해 노트북 샘플을 검증하는 방법).
- **노트북 검증 실행기.** 모든 Python 노트북을 헤드리스로 실행하여 PASS/FAIL 매트릭스(및 `results.json`)를 출력하는 새로운 [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1). 리포지토리 루트와 Python을 자동 감지하며 기본적으로 강의 외 노트북(`.venv`, `site-packages`, `translations`, 스킬 템플릿 자산) 및 `.NET` 노트북을 제외하고, `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, `-Python` 옵션을 지원합니다.
- **코스 내비게이션.** 레슨 11–15에 이전/다음 레슨 링크를 추가하여 전체 코스가 00 → 18까지 양방향으로 연결되도록 했습니다.
- **새로운 썸네일.** 레슨 16과 17용 썸네일과 리포지터리 소셜 이미지의 새 버전 [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (두 개의 새 레슨과 `aka.ms/ai-agents-beginners` URL 홍보 포함).
- <strong>종속성</strong> ([requirements.txt](../../requirements.txt)): 레슨 17에 `foundry-local-sdk`와 `chromadb` 추가.

### 변경됨

- **메인 [README.md](./README.md)** 레슨 표: 레슨 16과 17이 이제 본문으로 링크됨(이전에는 "Coming Soon"), 리포지터리 이미지가 `repo-thumbnailv3.png`로 업데이트됨.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: 레슨별 가이드 및 학습 경로에 레슨 16과 17 추가, 그리고 "스모크 테스트를 통한 배포된 에이전트 검증" 섹션 추가.
- **[AGENTS.md](./AGENTS.md)**: 레슨 수/설명(00–18) 업데이트, 스모크 테스트 검증 섹션 추가, 레슨 16/17 샘플 명명 예시 추가.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: "이전 레슨"이 이제 레슨 17을 가리키도록 변경(이전에는 레슨 15), 체인이 닫힘.
- **비폐기 모델에 대한 모델 참조 표준화.** 전체 코스(문서, `.env.example`, Python/.NET 노트북 및 샘플)에서 모든 `gpt-4o` / `gpt-4o-mini` 참조를 `gpt-4.1-mini`로 교체 — `gpt-4o`(모든 버전)는 2026년에 중단 예정. 레슨 16의 모델 라우팅 예제는 `gpt-4.1-mini`(소형)와 `gpt-4.1`(대형)을 사용하여 크기 대비 유지. Python 노트북은 모델 이름을 하드코딩하지 않고 환경 변수 (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`)에서 모델을 선택하도록 변경됨.

### 참고 및 알려진 제한 사항

- **라이브 Azure에 대해 실행되지 않음.** 새로운 레슨의 노트북은 교육용 샘플이며, 사용자의 Microsoft Foundry / Foundry Local 설정에 대해 실행 및 검증해야 합니다. 스모크 테스트 워크플로우는 레슨 에이전트를 배포하고 Azure OIDC 비밀 (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`)을 Foundry 프로젝트 범위에서 **Azure AI User** 역할로 구성해야 합니다.
- **레슨 17은 로컬 전용.** Foundry Responses 엔드포인트가 없어 스모크 테스트 액션이 적용되지 않으므로, 워크스테이션에서 노트북을 실행하여 검증해야 합니다.

## [출시됨] — 2026-07-06

이번 릴리스는 코스를 <strong>Azure OpenAI Responses API</strong>로 이전하며, 제품 명칭을 <strong>Microsoft Foundry</strong>와 <strong>Microsoft Agent Framework (MAF)</strong>로 표준화하고, GitHub Models를 폐기하며, SDK 버전을 업데이트하고, 로컬 모델 및 Foundry에서 다른 프레임워크 호스팅에 관한 새 콘텐츠를 추가합니다.

### 추가됨

- **마이그레이션 스킬** — `.agents/skills/` 아래에 [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) 에이전트 스킬 설치 (출처: [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)), 참조 및 스캐너 스크립트 포함.
- **Foundry Local (온디바이스 모델 실행)** — [00-course-setup/README.md](./00-course-setup/README.md) 내 새로운 "대체 제공자: Foundry Local" 섹션 추가 (설치(`winget` / `brew`), `foundry model run`, `foundry-local-sdk`, `OpenAIChatClient`를 통한 Microsoft Agent Framework 내 `FoundryLocalManager` 연결).
- **Microsoft Foundry에서의 LangChain / LangGraph 에이전트 호스팅** — [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) 내 새로운 섹션 및 실행 가능한 샘플 [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) (langchain-azure-ai[hosting] 및 `ResponsesHostServer` (`/responses` 프로토콜) 사용), [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) 기반.
- **Microsoft Project Opal** — [15-browser-use/README.md](./15-browser-use/README.md) 내 새로운 "실제 사례: Microsoft Project Opal" 섹션 추가, Opal을 엔터프라이즈 컴퓨터 사용 에이전트로 설정하고 코스 개념(인간 개입, 신뢰/보안, 계획, 스킬)과 연결.
- **두 번째 레슨 02 Python 샘플** — [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) 추가 ("변경됨" 참조 — 기존 Semantic Kernel 노트북에서 이전) 및 레슨 README에 링크 추가.
- **모델 및 제공자** 섹션 [STUDY_GUIDE.md](./STUDY_GUIDE.md) 추가.

### 변경됨

- **채팅 완성 → Responses API (Python).** 모델을 직접 호출하던 샘플이 채팅 완성에서 Responses API로 이전(`client.responses.create(input=..., store=False)`, `resp.output_text` 사용), `OpenAI` 클라이언트를 이용해 안정적인 Azure OpenAI `/openai/v1/` 엔드포인트 대상으로 실행(버전 정보 없음). 다음 샘플에 영향:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — 전체 함수 호출 워크스루 (도구 스키마가 Responses 포맷으로 평탄화되고, 도구 결과가 `function_call_output`, `max_output_tokens` 등으로 반환됨).
- **GitHub Models → Azure OpenAI.** GitHub Models는 더 이상 지원하지 않음 (2026년 7월 폐기 예정) 및 Responses API를 지원하지 않음. Python 및 .NET 샘플 전반에서 GitHub Models 코드 경로가 Azure OpenAI / Microsoft Foundry로 전환됨:
  - Python: 레슨 08 워크플로우 노트북(`01`–`03`), 레슨 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + 관련 `.md` 문서, 레슨 08 dotNET 워크플로우 노트북/`.md`(`01`–`03`)가 이제 `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)`와 `AzureCliCredential` 사용.
- **Semantic Kernel → Microsoft Agent Framework.** 이전 `02-semantic-kernel.ipynb`가 Azure OpenAI(Responses API)를 사용하는 Microsoft Agent Framework로 재작성되어 `02-python-agent-framework-azure-openai.ipynb`로 이름 변경됨.
- **`FoundryChatClient` + `as_agent` 표준화.** `AzureAIProjectAgentProvider` 참조가 있던 README와 노트북 코드가 레슨 01과 프레임워크 자체 샘플에서 사용하는 표준 패턴인 `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` 및 `provider.as_agent(...)`로 변경됨. 레슨 02–14 README 및 노트북 전반에 업데이트됨(예: 레슨 13 메모리, 모든 레슨 14 노트북, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **제품 명칭.** 영어 콘텐츠 전반에 걸쳐 이름 변경:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (변경 없음: "Azure OpenAI", "Azure AI Search", "Azure AI Inference", 환경 변수명)
- <strong>종속성</strong> ([requirements.txt](../../requirements.txt)):
  - `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0` 고정.
  - Responses API 최소 버전인 `openai>=1.108.1`로 고정.
  - 마이그레이션된 GitHub Models 샘플에서만 사용되었던 `azure-ai-inference` 제거.
- **환경 구성** ([.env.example](../../.env.example)): GitHub Models 변수(`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`) 제거; `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, 선택적 `AZURE_OPENAI_API_KEY` 추가; Microsoft Foundry 명칭으로 업데이트.
- <strong>문서</strong> — 위 변경 사항에 맞춰 [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), [STUDY_GUIDE.md](./STUDY_GUIDE.md) 업데이트(환경 변수 설정, 검증 스니펫, 제공자 안내, 명칭).

### 제거됨

- GitHub Models 온보딩 단계 및 환경 변수 제거 (대체됨: Azure OpenAI / Microsoft Foundry).

### 보안 / 개인정보 보호 (공개 공유 정리)

- 실제 **Azure 구독 ID**, 리소스 그룹 / 리소스 이름, Bing 연결 ID, 그리고 개발자의 <strong>로컬 파일 경로 및 사용자명</strong>이 노출된 Jupyter 노트북 실행 출력 삭제:
  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- 추적된 영어 콘텐츠에 API 키, 토큰, 구독 ID 또는 개인 경로가 남아 있지 않음을 확인했습니다 (`GITHUB_TOKEN` 참조는 워크플로우 내 GitHub Actions 토큰과 Lesson 11 설정의 GitHub MCP 서버 PAT이며, 둘 다 정당하고 GitHub 모델과 관련이 없습니다).

### 참고 사항 및 알려진 제한 사항

- **실행/컴파일되지 않음.** 이들은 API/명명 규칙의 정확성을 위해 업데이트된 교육용 샘플이며, 라이브 Azure 리소스를 대상으로 실행되지 않았고 .NET 샘플은 이 환경에서 컴파일되지 않았습니다. Microsoft Foundry / Azure OpenAI 배포 환경에서 검증하십시오.
- **모델 배포는 Responses API를 지원해야 합니다.** `gpt-4.1-mini`, `gpt-4.1` 또는 `gpt-5.x` 모델 배포를 사용하세요. 이전 모델은 핵심 Responses 기능을 지원하지만 모든 기능을 지원하지는 않습니다.
- **Agent-framework 버전.** 샘플은 최신 MAF (`>=1.10.0`)를 대상으로 합니다. 표준 에이전트 생성 호출은 `client.as_agent(...)`이며, API는 프레임워크의 공식 문서와 설치된 빌드를 기준으로 검증되었습니다. 다른 버전을 고정할 경우 메서드 사용 가능 여부 (`as_agent` 대 `create_agent`)를 확인하세요.
- <strong>Lesson 08 워크플로우 노트북 04</strong>는 Microsoft Foundry Agent Service 호스팅 도구(빙 기반, 코드 인터프리터)를 사용하기 때문에 `agent-framework-azure-ai`의 `AzureAIAgentClient`를 의도적으로 유지하며, 이는 이미 Responses 기반입니다.
- **.NET 기본 배포.** 이전에 Lesson 08 dotNET 워크플로우 샘플 두 개는 특정 모델을 하드코딩했으나, 이제는 기본값이 `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`)입니다. 샘플이 멀티모달/비전 입력에 의존하는 경우 적절한 모델로 `AZURE_OPENAI_DEPLOYMENT`를 설정하세요.
- <strong>Foundry Local</strong>은 OpenAI 호환 **Chat Completions** 엔드포인트를 제공하며 로컬 개발용입니다; 전체 Responses API 기능 세트는 Azure OpenAI / Microsoft Foundry를 사용하세요.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->