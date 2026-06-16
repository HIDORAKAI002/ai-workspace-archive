# Azure Content Safety로 강화된 MCP 보안

> **해결된 OWASP MCP 위험**: [MCP06 - 의도 흐름 전복](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety는 MCP 구현의 보안을 향상시킬 수 있는 여러 강력한 도구를 제공합니다. 실습 경험을 위해 [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) 캠프 3: I/O 보안을 참조하세요.

## 프롬프트 실드

Microsoft의 AI 프롬프트 실드는 다음을 통해 직접적이고 간접적인 프롬프트 주입 공격에 대해 강력한 보호를 제공합니다:

1. **고급 탐지**: 콘텐츠에 포함된 악의적 지시사항을 식별하기 위해 기계 학습을 사용합니다.
2. <strong>스포트라이팅</strong>: AI 시스템이 유효한 지시사항과 외부 입력을 구분할 수 있도록 입력 텍스트를 변환합니다.
3. **구분자 및 데이터 마킹**: 신뢰된 데이터와 신뢰할 수 없는 데이터 간의 경계를 표시합니다.
4. **Content Safety 통합**: Azure AI Content Safety와 협력하여 탈옥 시도 및 유해 콘텐츠를 감지합니다.
5. **지속적 업데이트**: Microsoft는 신흥 위협에 대응하기 위해 보호 메커니즘을 정기적으로 업데이트합니다.

## MCP와 함께 Azure Content Safety 구현하기

이 접근법은 다중 계층의 보호를 제공합니다:
- 처리 전 입력 스캔
- 반환 전 출력 검증
- 알려진 유해 패턴에 대한 차단 목록 사용
- Azure의 지속적으로 업데이트되는 콘텐츠 안전 모델 활용

## Azure Content Safety 자료

MCP 서버와 함께 Azure Content Safety를 구현하는 방법에 대해 자세히 알아보려면 다음 공식 자료를 참고하세요:

1. [Azure AI Content Safety 문서](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety 공식 문서.
2. [Prompt Shield 문서](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - 프롬프트 주입 공격 방지 방법.
3. [Content Safety API 참조](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety 구현용 상세 API 참조.
4. [빠른 시작: C#을 이용한 Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# 사용 빠른 구현 가이드.
5. [Content Safety 클라이언트 라이브러리](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - 다양한 프로그래밍 언어용 클라이언트 라이브러리.
6. [탈옥 시도 감지](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - 탈옥 시도 감지 및 방지에 관한 특정 안내.
7. [Content Safety 모범 사례](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - 콘텐츠 안전 구현의 모범 사례.

보다 심층적인 구현은 [Azure Content Safety 구현 가이드](./azure-content-safety-implementation.md)를 참고하세요.

## 다음 단계

- 읽기: [Azure Content Safety 구현](./azure-content-safety-implementation.md)
- 돌아가기: [보안 모듈 개요](./README.md)
- 계속하기: [모듈 3: 시작하기](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->