# MCP 심화 주제

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/ko/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(위 이미지 클릭 시 이 수업의 영상이 재생됩니다)_

이 장에서는 Model Context Protocol (MCP) 구현의 심화 주제로 다중 모달 통합, 확장성, 보안 모범 사례, 그리고 엔터프라이즈 통합을 다룹니다. 이 주제들은 현대 AI 시스템의 요구를 충족할 수 있는 견고하고 프로덕션 준비가 된 MCP 애플리케이션을 구축하는 데 매우 중요합니다.

## 개요

이 수업에서는 Model Context Protocol 구현에서 다중 모달 통합, 확장성, 보안 모범 사례, 엔터프라이즈 통합에 초점을 맞춘 고급 개념을 탐구합니다. 이 주제들은 기업 환경에서 복잡한 요구사항을 처리할 수 있는 프로덕션급 MCP 애플리케이션을 구축하는 데 필수적입니다.

> **앞으로의 내용:** 아래 여러 주제들은 `2026-07-28` MCP 사양 릴리스 후보의 영향을 받습니다 — 루트 컨텍스트(5.4)와 샘플링(5.6)은 릴리스 후보에서 더 이상 사용하지 않는 것으로 표시된 기본 요소를 기반으로 하며, 프로토콜 기능(5.16)에 참조된 실험적 작업(Tasks) 기능은 전용 작업 확장으로 이동합니다. 자세한 내용은 [MCP 변경사항: 2026-07-28 릴리스 후보](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)를 참조하세요.

## 학습 목표

이 수업이 끝나면 다음을 할 수 있습니다:

- MCP 프레임워크 내에서 다중 모달 기능 구현
- 고부하 시나리오에 적합한 확장 가능한 MCP 아키텍처 설계
- MCP의 보안 원칙에 맞는 보안 모범 사례 적용
- MCP를 엔터프라이즈 AI 시스템 및 프레임워크와 통합
- 프로덕션 환경에서 성능 및 신뢰성 최적화

## 수업 및 샘플 프로젝트

| 링크 | 제목 | 설명 |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Azure 통합 | Azure에서 MCP 서버를 통합하는 방법 학습 |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP 다중 모달 샘플 | 오디오, 이미지 및 다중 모달 응답 샘플 |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 데모 | OAuth2를 MCP의 인증 및 리소스 서버로 사용하는 최소한의 Spring Boot 앱. 보안 토큰 발급, 보호된 엔드포인트, Azure 컨테이너 앱 배포, API 관리 통합 시연. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | 루트 컨텍스트 | 루트 컨텍스트에 대해 배우고 구현하는 방법 ( `2026-07-28` 릴리스 후보에서는 더 이상 사용되지 않음; `2025-11-25` 버전에서는 여전히 유효) |
| [5.5 Routing](./mcp-routing/README.md) | 라우팅 | 다양한 라우팅 유형 학습 |
| [5.6 Sampling](./mcp-sampling/README.md) | 샘플링 | 샘플링 작업 방법 학습 ( `2026-07-28` 릴리스 후보에서 더 이상 사용되지 않음; `2025-11-25` 버전에서 유효) |
| [5.7 Scaling](./mcp-scaling/README.md) | 확장 | 확장에 대해 학습 |
| [5.8 Security](./mcp-security/README.md) | 보안 | MCP 서버 보안 강화 |
| [5.9 Web Search sample](./web-search-mcp/README.md) | 웹 검색 MCP | SerpAPI와 통합된 Python MCP 서버 및 클라이언트로 실시간 웹, 뉴스, 제품 검색 및 Q&A 실행. 다중 도구 오케스트레이션, 외부 API 통합, 강력한 오류 처리 시연. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | 스트리밍 | 실시간 데이터 스트리밍은 오늘날 데이터 중심 세계에서 비즈니스 및 애플리케이션이 신속한 의사 결정을 위해 즉시 정보에 접근하는 데 필수적입니다. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | 웹 검색 | MCP가 AI 모델, 검색 엔진, 애플리케이션 전반에서 컨텍스트 관리를 표준화하여 실시간 웹 검색을 어떻게 혁신하는지 학습. | 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID 인증 | Microsoft Entra ID는 강력한 클라우드 기반 ID 및 액세스 관리 솔루션을 제공하여 권한이 있는 사용자와 애플리케이션만 MCP 서버와 상호작용할 수 있도록 지원합니다. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry 통합 | MCP 서버를 Microsoft Foundry 에이전트와 통합하여 강력한 도구 오케스트레이션과 표준화된 외부 데이터 소스 연결을 통한 엔터프라이즈 AI 기능 활성화 방법 학습. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | 컨텍스트 엔지니어링 | MCP 서버를 위한 미래 지향적 컨텍스트 엔지니어링 기법, 컨텍스트 최적화, 동적 컨텍스트 관리, MCP 프레임워크 내 효과적인 프롬프트 엔지니어링 전략 포함. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | 맞춤형 전송 | 특수 MCP 통신 시나리오를 위한 맞춤형 전송 메커니즘 구현 방법 학습. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | 프로토콜 기능 | 진행 알림, 요청 취소, 리소스 템플릿, 오류 처리 패턴 등 고급 프로토콜 기능 마스터. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | 적대적 에이전트 | 상반되는 입장을 가진 두 에이전트가 단일 MCP 도구 집합을 공유하여 환각 감지, 특이 사례 노출, 구조화된 토론을 통해 보다 정확하게 보정된 결과 도출 방법 학습. |

> **MCP 사양 2025-11-25의 새로운 내용:** 사양에 이제 실험적 지원이 포함된 **작업(Tasks)** (진행 추적이 가능한 장기 작업), **도구 주석** (안전을 위한 도구 동작에 대한 메타데이터), **URL 모드 유도** (클라이언트에게 특정 URL 콘텐츠 요청), 그리고 향상된 <strong>루츠</strong> (작업 공간 컨텍스트 관리용)가 포함됩니다. 전체 내용은 [MCP 사양 변경 로그](https://spec.modelcontextprotocol.io/)를 참조하세요.

## 추가 참고자료

최신 MCP 심화 주제 정보는 다음을 참고하세요:
- [MCP 문서](https://modelcontextprotocol.io/)
- [MCP 사양 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub 저장소](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - 보안 위험 및 완화 방법
- [MCP 보안 정상 회의 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/) - 실습 보안 교육

## 핵심 내용 요약

- 다중 모달 MCP 구현은 텍스트 처리 이상으로 AI 기능 확장
- 확장성은 엔터프라이즈 배포에 필수이며 수평 및 수직 확장으로 해결 가능
- 종합적인 보안 조치는 데이터를 보호하고 적절한 접근 통제를 보장
- Azure OpenAI와 Microsoft AI Foundry 같은 플랫폼과의 엔터프라이즈 통합은 MCP 기능 강화
- 고급 MCP 구현은 최적화된 아키텍처와 신중한 자원 관리를 통해 이득을 봄

## 연습 과제

특정 사용 사례를 위한 엔터프라이즈급 MCP 구현 설계:

1. 사용 사례에 대한 다중 모달 요구 사항 확인
2. 민감한 데이터 보호에 필요한 보안 통제 개요 작성
3. 다양한 부하를 처리할 수 있는 확장 가능한 아키텍처 설계
4. 엔터프라이즈 AI 시스템과의 통합 지점 계획
5. 잠재적 성능 병목과 완화 전략 문서화

## 추가 자료

- [Azure OpenAI 문서](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry 문서](https://learn.microsoft.com/en-us/ai-services/)

---

## 다음 단계

이 모듈의 수업은 [5.1 MCP 통합](./mcp-integration/README.md)부터 시작하세요

이 모듈을 완료한 후, 다음으로 진행하세요: [모듈 6: 커뮤니티 기여](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->