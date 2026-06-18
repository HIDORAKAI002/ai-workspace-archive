# 시나리오 3: VS Code에서 MCP 서버를 이용한 인에디터 문서

## 개요

이 시나리오에서는 MCP 서버를 사용하여 Microsoft Learn 문서를 Visual Studio Code 환경 내에 직접 가져오는 방법을 배웁니다. 문서를 찾기 위해 브라우저 탭을 계속 전환하는 대신, 에디터 내에서 공식 문서를 액세스, 검색, 참조할 수 있습니다. 이 방법은 작업 흐름을 간소화하고 집중력을 유지하며 GitHub Copilot과 같은 도구와의 원활한 통합을 가능하게 합니다.

- VS Code 안에서 코딩 환경을 떠나지 않고 문서를 검색하고 읽기.
- 문서를 참조하고 README 또는 과정 파일에 직접 링크 삽입.
- GitHub Copilot과 MCP를 함께 사용하여 AI 기반 문서 워크플로우를 원활하게 수행.

## 학습 목표

이 장을 마치면 VS Code 내에서 MCP 서버를 설정하고 사용하여 문서 및 개발 워크플로우를 향상시키는 방법을 이해할 수 있습니다. 다음을 수행할 수 있습니다:

- MCP 서버를 문서 조회용으로 사용하도록 작업 공간 구성.
- VS Code 내에서 문서를 검색하고 직접 삽입.
- GitHub Copilot과 MCP의 결합을 통해 보다 생산적인 AI 증강 워크플로우 구축.

이 기술들은 에디터에 집중하면서 문서 품질을 개선하고 개발자 또는 기술 작가로서 생산성을 높이는 데 도움을 줄 것입니다.

## 솔루션

인에디터 문서 액세스를 위해 MCP 서버를 VS Code와 GitHub Copilot에 통합하는 일련의 단계를 따릅니다. 이 솔루션은 과정 저자, 문서 작성자, 개발자에게 적합하며, 문서와 Copilot을 다룰 때 에디터 내 집중력을 유지할 수 있습니다.

- 과정 또는 프로젝트 문서를 작성하는 동안 README에 참조 링크를 빠르게 추가.
- Copilot으로 코드를 생성하고 MCP로 관련 문서를 즉시 찾아 인용.
- 에디터 안에 집중하며 생산성을 향상.

### 단계별 가이드

시작하려면 다음 단계를 따르세요. 각 단계별로 assets 폴더에서 스크린샷을 추가하여 과정을 시각적으로 설명할 수 있습니다.

1. **MCP 구성 추가:**
   프로젝트 루트에 `.vscode/mcp.json` 파일을 만들고 다음 구성을 추가하세요:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   이 구성은 VS Code가 [`Microsoft Learn Docs MCP 서버`](https://github.com/MicrosoftDocs/mcp)에 연결하는 방법을 알려줍니다.
   
   ![Step 1: Add mcp.json to .vscode folder](../../../../../../translated_images/ko/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **GitHub Copilot 채팅 패널 열기:**
   만약 GitHub Copilot 확장 프로그램이 설치되어 있지 않다면, VS Code의 확장 뷰에서 설치하세요. [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)에서 직접 다운로드할 수 있습니다. 그런 다음 사이드바에서 Copilot 채팅 패널을 엽니다.

   ![Step 2: Open Copilot Chat panel](../../../../../../translated_images/ko/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **에이전트 모드 활성화 및 도구 확인:**
   Copilot 채팅 패널에서 에이전트 모드를 활성화하세요.

   ![Step 3: Enable agent mode and verify tools](../../../../../../translated_images/ko/step3-agent-mode.cdc32520fd7dd1d1.webp)

   에이전트 모드를 켠 후, MCP 서버가 사용 가능한 도구로 목록에 있는지 확인하세요. 이를 통해 Copilot 에이전트가 관련 정보를 가져오기 위해 문서 서버에 접근할 수 있습니다.
   
   ![Step 3: Verify MCP server tool](../../../../../../translated_images/ko/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **새 채팅 시작 및 에이전트에 질문하기:**
   Copilot 채팅 패널에서 새 채팅을 엽니다. 이제 에이전트에게 문서 관련 질문을 할 수 있습니다. 에이전트는 MCP 서버를 이용해 Microsoft Learn 문서에서 관련 내용을 직접 가져와 에디터에 표시합니다.

   - *"토픽 X에 대한 학습 계획을 작성하려고 합니다. 8주간 공부할 예정인데, 매주 어떤 내용을 공부해야 할지 제안해 주세요."*

   ![Step 4: Prompt the agent in chat](../../../../../../translated_images/ko/step4-prompt-chat.12187bb001605efc.webp)

5. **라이브 쿼리:**

   > Microsoft Foundry Discord의 [#get-help](https://discord.gg/D6cRhjHWSC) 섹션에서 라이브 쿼리를 확인해 보겠습니다 ([원본 메시지 보기](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Azure AI Foundry에서 개발된 AI 에이전트들을 이용한 다중 에이전트 솔루션을 배포하는 방법에 대해 답을 찾고 있습니다. Copilot Studio 채널처럼 직접적인 배포 방법은 보이지 않는데, 기업 사용자가 상호작용하고 작업을 수행할 수 있도록 배포하는 다양한 방법은 무엇이 있나요? MS Teams와 Azure AI Foundry 에이전트 간 다리 역할을 할 수 있는 Azure Bot 서비스를 사용하는 블로그나 기사가 많이 있는데, Azure Function을 통해 Orchestrator 에이전트에 연결되는 Azure Bot을 설정하면 작동할까요? 아니면 다중 에이전트 솔루션의 각 AI 에이전트마다 Bot 프레임워크에서 조정을 수행하는 별도의 Azure Function을 만들어야 하나요? 다른 제안도 환영합니다."*

   ![Step 5: Live queries](../../../../../../translated_images/ko/step5-live-queries.49db3e4a50bea273.webp)

   에이전트는 관련 문서 링크와 요약으로 응답하며, 이를 마크다운 파일에 직접 삽입하거나 코드 내 참조로 사용할 수 있습니다.
   
### 예제 쿼리

아래는 시도해 볼 수 있는 몇 가지 예제 쿼리입니다. 이 쿼리들은 MCP 서버와 Copilot이 VS Code를 떠나지 않고도 즉각적이며 상황에 맞는 문서 및 참조를 제공하는 방식을 보여줍니다:

- "Azure Functions 트리거 사용하는 방법을 보여줘."
- "Azure Key Vault 공식 문서 링크를 삽입해 줘."
- "Azure 리소스 보안에 대한 모범 사례는 무엇인가?"
- "Azure AI 서비스 시작 가이드를 찾아줘."

이 쿼리들은 MCP 서버와 Copilot이 VS Code 내에서 협력하여 즉각적이고 상황에 맞는 문서 및 참조를 제공하는 방법을 시연할 것입니다.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->