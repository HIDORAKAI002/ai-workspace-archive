# Azure Content Safety를 활용한 고급 MCP 보안

> **OWASP MCP 위험 대응**: [MCP06 - 상황별 페이로드를 통한 프롬프트 주입](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety는 MCP 구현의 보안을 향상시킬 수 있는 여러 강력한 도구를 제공합니다. 직접 구현 경험을 원하시면 [MCP 보안 서밋 워크숍(Sherpa)](https://azure-samples.github.io/sherpa/) 3캠프: I/O 보안을 참고하세요.

## 프롬프트 쉴드

Microsoft의 AI 프롬프트 쉴드는 다음을 통해 직접적 및 간접적 프롬프트 주입 공격을 견고하게 방어합니다:

1. **고급 탐지**: 머신러닝을 사용해 콘텐츠에 숨겨진 악성 명령을 식별합니다.
2. **스포트라이트**: 입력 텍스트를 변환하여 AI 시스템이 유효한 명령과 외부 입력을 구별하도록 돕습니다.
3. **구분자 및 데이터 마킹**: 신뢰할 수 있는 데이터와 신뢰할 수 없는 데이터 경계를 표시합니다.
4. **Content Safety 통합**: Azure AI Content Safety와 연동하여 탈옥 시도 및 유해 콘텐츠를 탐지합니다.
5. **지속적인 업데이트**: Microsoft는 지속적으로 새로운 위협에 대응하기 위해 보호 메커니즘을 업데이트합니다.

## MCP와 함께 Azure Content Safety 구현하기

이 방법은 다중 계층 보호를 제공합니다:
- 처리 전 입력 스캔
- 반환 전 출력 검증
- 알려진 유해 패턴에 대한 블록리스트 활용
- Azure의 지속적으로 업데이트되는 콘텐츠 안전 모델 활용

## Azure Content Safety 자료

MCP 서버에 Azure Content Safety를 구현하는 방법에 대해 자세히 알아보려면, 다음 공식 자료를 참고하세요:

1. [Azure AI Content Safety 문서](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety 공식 문서.
2. [프롬프트 쉴드 문서](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - 프롬프트 주입 공격 방지 방법 학습.
3. [Content Safety API 참조](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety 구현을 위한 상세 API 참조.
4. [빠른 시작: C#를 사용한 Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C#을 활용한 빠른 구현 가이드.
5. [Content Safety 클라이언트 라이브러리](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - 다양한 프로그래밍 언어용 클라이언트 라이브러리.
6. [탈옥 시도 탐지](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 탈옥 시도 탐지 및 방지에 관한 구체적 가이드.
7. [Content Safety 모범 사례](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - 콘텐츠 안전 구현을 위한 모범 사례.

보다 상세한 구현은 [Azure Content Safety 구현 가이드](./azure-content-safety-implementation.md)를 참고하세요.

## 다음 단계

- 읽기: [Azure Content Safety 구현](./azure-content-safety-implementation.md)
- 돌아가기: [보안 모듈 개요](./README.md)
- 계속하기: [모듈 3: 시작하기](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 최선을 다하고 있으나, 자동 번역에는 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원래 문서의 원어 버전이 공식적인 자료로 간주되어야 합니다. 중요한 정보의 경우 전문적인 인간 번역을 권장합니다. 본 번역의 사용으로 인해 발생하는 오해나 잘못된 해석에 대해서는 당사가 책임지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->