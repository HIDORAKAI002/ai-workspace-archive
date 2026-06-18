# Chainlit 및 Microsoft Learn Docs MCP를 이용한 학습 계획 생성기

## 사전 준비 사항

- Python 3.8 이상
- pip (Python 패키지 관리자)
- Microsoft Learn Docs MCP 서버에 연결할 인터넷 접속

## 설치

1. 이 저장소를 클론하거나 프로젝트 파일을 다운로드하세요.
2. 필요한 종속성을 설치하세요:

   ```bash
   pip install -r requirements.txt
   ```

## 사용법

### 시나리오 1: Docs MCP에 간단한 쿼리 보내기
Docs MCP 서버에 연결하여 쿼리를 보내고 결과를 출력하는 명령줄 클라이언트입니다.

1. 스크립트를 실행하세요:
   ```bash
   python scenario1.py
   ```
2. 프롬프트에 문서 관련 질문을 입력하세요.

### 시나리오 2: 학습 계획 생성기 (Chainlit 웹 앱)
사용자가 기술 주제별로 주간별 개인 맞춤 학습 계획을 생성할 수 있는 웹 기반 인터페이스(Chainlit 사용)입니다.

1. Chainlit 앱을 시작하세요:
   ```bash
   chainlit run scenario2.py
   ```
2. 터미널에 제공된 로컬 URL(예: http://localhost:8000)을 브라우저에서 열으세요.
3. 채팅 창에 학습할 주제와 학습 기간(예: "AI-900 certification, 8 weeks")을 입력하세요.
4. 앱이 관련 Microsoft Learn 문서 링크와 함께 주차별 학습 계획을 응답합니다.

**필요한 환경 변수:**

시나리오 2 (Azure OpenAI를 사용하는 Chainlit 웹 앱)를 사용하려면 `python` 디렉터리 내의 `.env` 파일에 다음 환경 변수를 설정해야 합니다:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

앱을 실행하기 전에 Azure OpenAI 리소스 세부 정보를 이 값들에 입력하세요.

> [!TIP]
> [Microsoft Foundry](https://ai.azure.com/)를 통해 자신의 모델을 쉽게 배포할 수 있습니다.

### 시나리오 3: VS Code에서 MCP 서버를 이용한 인에디터 문서

브라우저 탭을 전환하지 않고 Microsoft Learn Docs를 VS Code 내부에서 직접 사용할 수 있습니다. 이를 통해:
- 코딩 환경을 벗어나지 않고 VS Code 내에서 문서 검색 및 열람 가능
- README 또는 강의 자료에 직접 문서 참조 링크 삽입 가능
- GitHub Copilot과 MCP를 함께 사용하여 AI 기반 문서 작성 워크플로우 구현 가능

**예시 활용 사례:**
- 강의나 프로젝트 문서 작성 중 README에 참조 링크를 빠르게 추가
- Copilot으로 코드를 생성하고 MCP로 관련 문서 즉시 찾아 인용
- 편집기에 집중하며 생산성 향상

> [!IMPORTANT]
> 작업 공간에 유효한 [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) 설정이 있는지 확인하세요 (위치는 `.vscode/mcp.json`).

## 왜 시나리오 2에 Chainlit인가?

Chainlit은 대화형 웹 애플리케이션을 만드는 현대적인 오픈소스 프레임워크입니다. Microsoft Learn Docs MCP 서버와 같은 백엔드 서비스에 연결되는 채팅 기반 사용자 인터페이스를 쉽게 만들 수 있습니다. 이 프로젝트는 Chainlit을 활용해 실시간으로 개인 맞춤형 학습 계획을 간단하고 인터랙티브하게 생성할 수 있도록 합니다. Chainlit을 사용하면 생산성과 학습을 돕는 채팅 기반 도구를 빠르게 빌드하고 배포할 수 있습니다.

## 이 앱의 기능

사용자가 주제와 기간을 입력하면 개인화된 학습 계획을 생성합니다. 입력값을 파싱하여 Microsoft Learn Docs MCP 서버에 관련 콘텐츠를 쿼리하고 주차별로 구조화된 계획을 만듭니다. 각 주차의 추천 학습 내용이 채팅에 표시되어 따라가고 진행 상황을 추적하기 쉽습니다. 통합 덕분에 항상 최신의 가장 관련성 높은 학습 자료를 받을 수 있습니다.

## 샘플 쿼리

채팅 창에서 다음 쿼리를 입력해 앱의 응답을 확인해보세요:

- `AI-900 certification, 8 weeks`
- `Learn Azure Functions, 4 weeks`
- `Azure DevOps, 6 weeks`
- `Data engineering on Azure, 10 weeks`
- `Microsoft security fundamentals, 5 weeks`
- `Power Platform, 7 weeks`
- `Azure AI services, 12 weeks`
- `Cloud architecture, 9 weeks`

이 예시들은 다양한 학습 목표와 기간에 대한 앱의 유연성을 보여줍니다.

## 참고 자료

- [Chainlit 문서](https://docs.chainlit.io/)
- [MCP 문서](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->