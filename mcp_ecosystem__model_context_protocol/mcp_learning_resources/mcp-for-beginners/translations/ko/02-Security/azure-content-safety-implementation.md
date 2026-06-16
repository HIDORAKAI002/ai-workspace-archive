# MCP로 Azure 콘텐츠 안전 구현하기

> **OWASP MCP 위험 해결**: [MCP06 - 의도 흐름 변조](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

프롬프트 주입, 도구 변조 및 기타 AI 특화 취약점에 대한 MCP 보안을 강화하기 위해 Azure 콘텐츠 안전을 통합하는 것이 강력히 권장됩니다. 이 구현 가이드는 [MCP 보안 서밋 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/) 캠프 3: I/O 보안과 일치합니다.

## MCP 서버와의 통합

Azure 콘텐츠 안전을 MCP 서버와 통합하려면 요청 처리 파이프라인에 콘텐츠 안전 필터를 미들웨어로 추가하세요:

1. 서버 시작 시 필터 초기화
2. 모든 들어오는 도구 요청을 처리 전에 검증
3. 모든 나가는 응답을 클라이언트에 반환 전에 검사
4. 안전 위반 사항 로그 기록 및 알림
5. 콘텐츠 안전 검사 실패 시 적절한 오류 처리 구현

이로써 다음과 같은 강력한 방어가 가능합니다:
- 프롬프트 주입 공격
- 도구 변조 시도
- 악성 입력을 통한 데이터 유출
- 유해 콘텐츠 생성

## Azure 콘텐츠 안전 통합을 위한 모범 사례

1. **맞춤 차단 목록**: MCP 주입 패턴 전용의 맞춤 차단 목록 생성
2. **심각도 조정**: 특정 사용 사례 및 위험 허용도에 맞춰 심각도 임계값 조정
3. **포괄적 적용**: 모든 입력과 출력에 콘텐츠 안전 검사 적용
4. **성능 최적화**: 반복되는 콘텐츠 안전 검사에 캐싱 구현 고려
5. **대체 메커니즘**: 콘텐츠 안전 서비스가 사용할 수 없을 때 명확한 대체 동작 정의
6. **사용자 피드백**: 안전 문제로 인해 콘텐츠가 차단될 경우 사용자에게 명확한 피드백 제공
7. **지속적 개선**: 새로 등장하는 위협에 기반한 차단 목록 및 패턴 정기 업데이트

## 추가 자료

### OWASP MCP 보안 안내
- [OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/) - Azure 구현이 포함된 포괄적 OWASP MCP Top 10
- [MCP06 - 프롬프트 주입](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 상세한 프롬프트 주입 완화 패턴
- [MCP 보안 서밋 워크숍](https://azure-samples.github.io/sherpa/) - 콘텐츠 안전을 다루는 캠프 3: I/O 보안 실습

### Azure 문서
- [Azure 콘텐츠 안전 개요](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [프롬프트 차단 문서](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI 콘텐츠 안전 빠른 시작](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## 다음 단계

- 돌아가기: [보안 모듈 개요](./README.md)
- 계속하기: [모듈 3: 시작하기](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->