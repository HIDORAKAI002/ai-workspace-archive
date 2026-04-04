# MCP와 함께 Azure 콘텐츠 안전 구현

> **OWASP MCP 리스크 대응**: [MCP06 - 문맥 페이로드를 통한 프롬프트 인젝션](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

프롬프트 인젝션, 도구 오염, 기타 AI 특유의 취약점에 대한 MCP 보안을 강화하기 위해 Azure 콘텐츠 안전 통합이 강력히 권장됩니다. 이 구현 가이드는 [MCP 보안 서밋 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/) 캠프 3: I/O 보안과 일치합니다.

## MCP 서버와의 통합

Azure 콘텐츠 안전을 MCP 서버와 통합하려면, 요청 처리 파이프라인에 콘텐츠 안전 필터를 미들웨어로 추가하십시오:

1. 서버 시작 시 필터 초기화
2. 모든 들어오는 도구 요청을 처리 전에 검증
3. 클라이언트에 응답을 반환하기 전에 모든 나가는 응답 점검
4. 안전 위반 시 로깅 및 경고
5. 콘텐츠 안전 검사 실패에 대한 적절한 오류 처리 구현

이로써 다음에 대한 강력한 방어를 제공합니다:
- 프롬프트 인젝션 공격
- 도구 오염 시도
- 악성 입력을 통한 데이터 유출
- 유해 콘텐츠 생성

## Azure 콘텐츠 안전 통합을 위한 모범 사례

1. **사용자 지정 차단 목록**: MCP 인젝션 패턴에 특화된 사용자 지정 차단 목록 생성
2. **심각도 조정**: 특정 사용 사례와 위험 감내도에 따라 심각도 임계값 조정
3. **포괄적 적용**: 모든 입력 및 출력에 콘텐츠 안전 검사 적용
4. **성능 최적화**: 반복되는 콘텐츠 안전 검사에 캐싱 구현 고려
5. **대체 메커니즘**: 콘텐츠 안전 서비스 이용 불가 시 명확한 대체 동작 정의
6. **사용자 피드백**: 안전 문제로 콘텐츠 차단 시 사용자에게 명확한 피드백 제공
7. **지속적 개선**: 새로 발생하는 위협에 따른 차단 목록 및 패턴 정기 업데이트

## 추가 자료

### OWASP MCP 보안 가이드
- [OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/) - Azure 구현과 함께하는 종합 OWASP MCP Top 10
- [MCP06 - 프롬프트 인젝션](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - 상세한 프롬프트 인젝션 완화 패턴
- [MCP 보안 서밋 워크숍](https://azure-samples.github.io/sherpa/) - 캠프 3: I/O 보안 실습 포함 콘텐츠 안전

### Azure 문서
- [Azure 콘텐츠 안전 개요](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [프롬프트 쉴드 문서](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI 콘텐츠 안전 빠른 시작](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## 다음 단계

- 돌아가기: [보안 모듈 개요](./README.md)
- 계속하기: [모듈 3: 시작하기](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 최선을 다하고 있으나, 자동 번역에는 오류나 부정확성이 포함될 수 있음을 유의하시기 바랍니다. 원문 문서는 권위 있는 출처로 간주되어야 합니다. 중요한 정보의 경우, 전문적인 인간 번역을 권장합니다. 본 번역의 사용으로 인해 발생하는 모든 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->