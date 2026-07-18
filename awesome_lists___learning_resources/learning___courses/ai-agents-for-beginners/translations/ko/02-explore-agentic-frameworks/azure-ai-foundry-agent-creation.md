# Microsoft Foundry 에이전트 서비스 개발

이 연습에서는 [Microsoft Foundry 포털](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)의 Microsoft Foundry 에이전트 서비스 도구를 사용하여 항공편 예약용 에이전트를 생성합니다. 이 에이전트는 사용자와 상호작용하며 항공편 정보를 제공할 수 있습니다.

## 전제 조건

이 연습을 완료하려면 다음이 필요합니다:
1. 활성 구독이 있는 Azure 계정. [무료로 계정 만들기](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Microsoft Foundry 허브를 생성할 권한이 있거나 허브가 생성되어 있어야 합니다.
    - 역할이 Contributor 또는 Owner인 경우 이 자습서의 단계를 따를 수 있습니다.

## Microsoft Foundry 허브 생성

> **참고:** Microsoft Foundry는 이전에 Azure AI Studio로 알려졌습니다.

1. Microsoft Foundry 블로그 게시물의 [지침](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)에 따라 Microsoft Foundry 허브를 생성하세요.
2. 프로젝트가 생성되면 표시되는 힌트를 모두 닫고 Microsoft Foundry 포털의 프로젝트 페이지를 검토합니다. 페이지는 다음 이미지와 유사하게 보입니다:

    ![Microsoft Foundry Project](../../../translated_images/ko/azure-ai-foundry.88d0c35298348c2f.webp)

## 모델 배포

1. 프로젝트 왼쪽 창에서 **My assets** 섹션에 있는 **Models + endpoints** 페이지를 선택합니다.
2. **Models + endpoints** 페이지의 **Model deployments** 탭에서 **+ Deploy model** 메뉴를 클릭하여 <strong>Deploy base model</strong>을 선택합니다.
3. 목록에서 `gpt-4.1-mini` 모델을 검색한 다음 선택하고 확인합니다.

    > <strong>참고</strong>: TPM을 줄이면 사용 중인 구독의 할당량 과다 사용을 방지할 수 있습니다.

    ![Model Deployed](../../../translated_images/ko/model-deployment.3749c53fb81e18fd.webp)

## 에이전트 생성

모델을 배포했으므로 이제 에이전트를 만들 수 있습니다. 에이전트는 사용자와 상호작용할 수 있는 대화형 AI 모델입니다.

1. 프로젝트 왼쪽 창에서 **Build & Customize** 섹션의 **Agents** 페이지를 선택합니다.
2. <strong>+ Create agent</strong>를 클릭하여 새 에이전트를 생성합니다. **Agent Setup** 대화 상자에서:
    - 에이전트 이름을 `FlightAgent`와 같이 입력합니다.
    - 이전에 생성한 `gpt-4.1-mini` 모델 배포가 선택되어 있는지 확인합니다.
    - <strong>Instructions</strong>를 에이전트가 따르도록 할 프롬프트에 맞게 설정합니다. 예시는 다음과 같습니다:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> 보다 자세한 프롬프트는 [이 저장소](https://github.com/ShivamGoyal03/RoamMind)에서 참고할 수 있습니다.
    
> 또한, <strong>Knowledge Base</strong>와 <strong>Actions</strong>를 추가하여 에이전트의 정보 제공 능력과 자동화된 작업 수행 능력을 향상시킬 수 있습니다. 이번 연습에서는 이 단계를 건너뛸 수 있습니다.
    
![Agent Setup](../../../translated_images/ko/agent-setup.9bbb8755bf5df672.webp)

3. 새 다중 AI 에이전트를 만들려면 <strong>New Agent</strong>를 클릭하세요. 새로 생성된 에이전트가 Agents 페이지에 표시됩니다.


## 에이전트 테스트

에이전트를 생성한 후 Microsoft Foundry 포털 플레이그라운드에서 사용자 문의에 대한 응답을 테스트할 수 있습니다.

1. 에이전트의 **Setup** 창 상단에서 <strong>Try in playground</strong>를 선택합니다.
2. **Playground** 창에서 채팅 창에 쿼리를 입력하여 에이전트와 상호작용할 수 있습니다. 예를 들어, 28일에 Seattle에서 New York으로 가는 항공편을 검색해 달라고 요청할 수 있습니다.

    > <strong>참고</strong>: 이 연습에서는 실시간 데이터가 사용되지 않으므로 에이전트가 정확한 응답을 제공하지 않을 수 있습니다. 목적은 제공된 지침에 따라 사용자 쿼리를 이해하고 응답하는 에이전트의 능력을 테스트하는 것입니다.

    ![Agent Playground](../../../translated_images/ko/agent-playground.dc146586de715010.webp)

3. 에이전트를 테스트한 후에는 더 많은 인텐트, 학습 데이터, 액션을 추가하여 기능을 개선할 수 있습니다.

## 리소스 정리

에이전트 테스트를 마친 후 추가 비용이 발생하지 않도록 삭제할 수 있습니다.
1. [Azure 포털](https://portal.azure.com)을 열고 이 연습에서 사용한 허브 리소스가 배포된 리소스 그룹 내용을 확인합니다.
2. 도구 모음에서 <strong>리소스 그룹 삭제</strong>를 선택합니다.
3. 리소스 그룹 이름을 입력하고 삭제를 확인합니다.

## 리소스

- [Microsoft Foundry 문서](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 포털](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry 시작하기](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure에서 AI 에이전트 기초](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->