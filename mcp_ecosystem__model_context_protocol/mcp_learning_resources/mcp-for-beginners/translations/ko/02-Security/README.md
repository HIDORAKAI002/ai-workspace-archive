# MCP 보안: AI 시스템을 위한 포괄적 보호

[![MCP Security Best Practices](../../../translated_images/ko/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(위 이미지를 클릭하여 이 수업의 비디오를 시청하세요)_

보안은 AI 시스템 설계의 기본으로서, 우리가 두 번째 섹션으로 우선순위를 두는 이유입니다. 이는 Microsoft의 [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)에서 제시한 **설계 단계부터 보안** 원칙과 일치합니다.

모델 컨텍스트 프로토콜(MCP)은 AI 기반 애플리케이션에 강력한 신규 기능을 제공하는 동시에 전통적인 소프트웨어 위험을 뛰어넘는 독특한 보안 과제를 제기합니다. MCP 시스템은 기존의 보안 문제(안전한 코딩, 최소 권한, 공급망 보안)뿐만 아니라 프롬프트 인젝션, 도구 변조, 세션 하이재킹, 혼동 권한 대리 공격(confused deputy attacks), 토큰 패스스루 취약점, 동적 기능 변경 등 AI 특유의 위협도 마주합니다.

이 수업에서는 MCP 구현에서 가장 중요한 보안 위험을 다룹니다—인증, 권한 부여, 과도한 권한, 간접 프롬프트 인젝션, 세션 보안, 혼동 권한 문제, 토큰 관리 및 공급망 취약점에 관한 내용을 포함합니다. 여기서 Microsoft의 Prompt Shields, Azure Content Safety, GitHub Advanced Security 같은 솔루션을 활용하여 MCP 배포를 강화하는 실질적인 제어 및 모범 사례를 배우게 됩니다.

## 학습 목표

이 수업을 마치면 다음을 할 수 있습니다:

- **MCP 고유 위협 식별**: 프롬프트 인젝션, 도구 변조, 과도한 권한, 세션 하이재킹, 혼동 권한 문제, 토큰 패스스루 취약점, 공급망 위험 등 MCP 시스템의 고유 보안 위험을 인식
- **보안 제어 적용**: 강력한 인증, 최소 권한 액세스, 안전한 토큰 관리, 세션 보안 제어, 공급망 검증 등 효과적인 완화책 구현
- **Microsoft 보안 솔루션 활용**: MCP 작업 부하 보호를 위한 Microsoft Prompt Shields, Azure Content Safety, GitHub Advanced Security 배포 및 이해
- **도구 보안 검증**: 도구 메타데이터 검증 중요성 인식, 동적 변경 모니터링, 간접 프롬프트 인젝션 공격 방어
- **모범 사례 통합**: 확립된 보안 기초(안전한 코딩, 서버 하드닝, 제로 트러스트)와 MCP 고유 제어를 결합해 포괄적 보호 달성

# MCP 보안 아키텍처 및 제어

최신 MCP 구현은 전통 소프트웨어 보안 및 AI 특화 위협을 모두 다루는 다층 보안 접근법이 필요합니다. 빠르게 진화하는 MCP 사양은 보안 제어를 지속적으로 성숙시켜 엔터프라이즈 보안 아키텍처와 확립된 모범 사례와의 통합을 지원합니다.

[Microsoft Digital Defense Report](https://aka.ms/mddr)의 연구에 따르면 **보고된 위반의 98%가 견고한 보안 위생으로 방지될 수 있습니다**. 가장 효과적인 보호 전략은 기본적인 보안 관행과 MCP 고유 제어를 결합하는 것으로, 검증된 기본 보안 조치가 전체 보안 위험 감소에 가장 큰 영향을 미칩니다.

## 현재 보안 상황

> **참고:** 이 정보는 **2026년 2월 5일** 기준 MCP 보안 표준을 반영하며, <strong>MCP 사양 2025-11-25</strong>에 맞추어져 있습니다. MCP 프로토콜은 빠르게 진화 중이며, 향후 구현에서는 새로운 인증 패턴과 강화된 제어가 도입될 수 있습니다. 최신 지침은 항상 [MCP 사양](https://spec.modelcontextprotocol.io/), [MCP GitHub 저장소](https://github.com/modelcontextprotocol), [보안 모범 사례 문서](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)를 참조하세요.

> **앞으로:** `2026-07-28` 릴리스 후보는 권한 부여를 더욱 강화합니다 — 클라이언트는 권한 부여 응답의 `iss` 매개변수를 검증해야 하며(RFC 9207), 동적 클라이언트 등록 중 OpenID Connect `application_type`을 선언하고, 등록된 자격 증명을 발급하는 권한 서버에 바인딩해야 합니다. 전체 권한 부여 SEP 목록은 [MCP 변경사항: 2026-07-28 릴리스 후보](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)를 참조하세요.

## 🏔️ MCP 보안 서밋 워크숍 (Sherpa)

<strong>실습 보안 교육</strong>을 위해 MCP 서버를 Microsoft Azure에서 보호하는 포괄적 가이드 탐험인 **MCP 보안 서밋 워크숍**(Sherpa)을 적극 추천합니다.

### 워크숍 개요

[MCP 보안 서밋 워크숍](https://azure-samples.github.io/sherpa/)은 입증된 "취약 → 악용 → 수정 → 검증" 방법론을 통해 실용적이고 실행 가능한 보안 교육을 제공합니다. 여러분은:

- **부수며 배움**: 의도적으로 불안전한 서버를 악용해 취약점을 직접 경험
- **Azure 네이티브 보안 사용**: Azure Entra ID, Key Vault, API Management, AI Content Safety 활용
- **심층 방어 따르기**: 다양한 캠프를 거쳐 포괄적 보안 레이어 구축
- **OWASP 기준 적용**: 각 기술은 [OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/)에 매핑
- **운영용 코드 획득**: 작동 확인된 구현 코드 확보

### 탐험 경로

| 캠프 | 중점 사항 | 포함된 OWASP 위험 |
|------|-------|---------------------|
| **기본 캠프** | MCP 기초 및 인증 취약점 | MCP01, MCP07 |
| **캠프 1: 인증** | OAuth 2.1, Azure 관리 ID, Key Vault | MCP01, MCP02, MCP07 |
| **캠프 2: 게이트웨이** | API 관리, 프라이빗 엔드포인트, 거버넌스 | MCP02, MCP06, MCP07, MCP09 |
| **캠프 3: 입출력 보안** | 프롬프트 인젝션, 개인 식별 정보 보호, 콘텐츠 안전 | MCP03, MCP05, MCP06, MCP10 |
| **캠프 4: 모니터링** | 로그 분석, 대시보드, 위협 탐지 | MCP04, MCP08 |
| <strong>서밋</strong> | 레드팀 / 블루팀 통합 테스트 | 모두 |

<strong>시작하기</strong>: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 보안 위험

[OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/)는 MCP 구현에 가장 중요한 10가지 보안 위험을 자세히 설명합니다:

| 위험 | 설명 | Azure 대응책 |
|------|-------------|------------------|
| **MCP01** | 토큰 잘못 관리 및 비밀 노출 | Azure Key Vault, 관리 ID |
| **MCP02** | 범위 확장에 의한 권한 상승 | RBAC, 조건부 액세스 |
| **MCP03** | 도구 변조 | 도구 검증, 무결성 확인 |
| **MCP04** | 소프트웨어 공급망 공격 및 종속성 변조 | GitHub Advanced Security, 종속성 검사 |
| **MCP05** | 명령 인젝션 및 실행 | 입력 검증, 샌드박스 |
| **MCP06** | 의도 흐름 위변조 | Azure AI Content Safety, Prompt Shields |
| **MCP07** | 불충분한 인증 및 권한 부여 | Azure Entra ID, PKCE 포함 OAuth 2.1 |
| **MCP08** | 감사 및 계측 부족 | Azure Monitor, Application Insights |
| **MCP09** | 그림자 MCP 서버 | API 센터 거버넌스, 네트워크 격리 |
| **MCP10** | 컨텍스트 인젝션 및 과도한 공유 | 데이터 분류, 최소 노출 |

### MCP 인증의 진화

MCP 사양은 인증 및 권한 부여 방식에서 크게 발전했습니다:

- **초기 방식**: 초기 사양은 개발자가 직접 인증 서버를 구현하도록 요구했으며, MCP 서버가 OAuth 2.0 인증 서버로서 사용자 인증을 직접 관리
- **현재 표준 (2025-11-25)**: 업데이트된 사양은 MCP 서버가 외부 ID 공급자(예: Microsoft Entra ID)에 인증을 위임할 수 있도록 하여 보안 태세를 향상하고 구현 복잡성을 감소
- **전송 계층 보안**: 로컬(STDIO)과 원격(스트리밍 HTTP) 연결 모두에 적합한 인증 패턴을 갖춘 안전한 전송 메커니즘 지원 강화

## 인증 및 권한 부여 보안

### 현재 보안 과제

최신 MCP 구현은 여러 인증 및 권한 부여 과제에 직면해 있습니다:

### 위험 및 위협 벡터

- **잘못 구성된 권한 부여 로직**: MCP 서버의 권한 부여 구현 오류로 민감 데이터가 노출되고 접근 통제가 잘못 적용될 수 있음
- **OAuth 토큰 탈취**: 로컬 MCP 서버 토큰 도난 시 공격자가 서버를 가장해 하위 서비스 접근 가능
- **토큰 패스스루 취약점**: 부적절한 토큰 처리로 보안 제어 우회 및 책임 추적 불가 발생
- **과도한 권한 부여**: 권한이 과다한 MCP 서버는 최소 권한 원칙을 위반하고 공격 범위를 넓힘

#### 토큰 패스스루: 중요한 안티 패턴

현재 MCP 권한 부여 사양에서는 심각한 보안 문제로 인해 <strong>토큰 패스스루를 명시적으로 금지</strong>하고 있습니다:

##### 보안 제어 회피
- MCP 서버와 하위 API는 적절한 토큰 검증에 의존하는 핵심 보안 제어(속도 제한, 요청 검증, 트래픽 모니터링)를 구현
- 클라이언트가 API에 토큰을 직접 사용하는 것은 이러한 필수 보호를 우회하여 보안 구조를 훼손

##### 책임 및 감사 문제  
- MCP 서버가 상위 발급 토큰을 사용하는 클라이언트를 구분할 수 없어 감사 추적이 깨짐
- 하위 리소스 서버 로그는 실제 MCP 서버 중개자가 아닌 오해의 소지가 있는 요청 출처를 기록
- 사고 조사 및 규정 준수 감사가 크게 어려워짐

##### 데이터 유출 위험
- 검증되지 않은 토큰 청구 정보로 도난당한 토큰을 가진 악의적 행위자가 MCP 서버를 데이터 유출용 프록시로 사용할 수 있음
- 신뢰 경계 위반으로 의도된 보안 제어를 우회하는 무단 접근 경로 허용

##### 다중 서비스 공격 벡터
- 여러 서비스에서 수용하는 탈취된 토큰을 이용해 연결된 시스템 간 측면 이동 가능
- 토큰 출처를 검증할 수 없을 경우 서비스 간 신뢰 기반이 훼손될 수 있음

### 보안 제어 및 완화책

**중요 보안 요구 사항:**

> <strong>필수</strong>: MCP 서버는 명시적으로 MCP 서버를 위해 발급되지 않은 모든 토큰을 **수락해서는 안 됩니다**

#### 인증 및 권한 부여 제어

- **엄격한 권한 검토**: MCP 서버 권한 부여 로직을 포괄적으로 감사하여 의도된 사용자 및 클라이언트만 민감 자원에 접근하도록 보장
  - **구현 가이드**: [MCP 서버용 Azure API 관리 인증 게이트웨이](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **ID 통합**: [MCP 서버 인증을 위한 Microsoft Entra ID 사용](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **안전한 토큰 관리**: [Microsoft의 토큰 검증 및 수명주기 모범 사례](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) 구현
  - 토큰 대상 청구가 MCP 서버 ID와 일치하는지 검증
  - 적절한 토큰 교체 및 만료 정책 시행
  - 토큰 재생 공격 및 무단 사용 방지

- **보호된 토큰 저장소**: 휴지 상태와 전송 중 모두 암호화된 안전한 토큰 저장소
  - **모범 사례**: [안전한 토큰 저장 및 암호화 지침](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 접근 제어 구현

- **최소 권한 원칙**: MCP 서버에 필요한 최소 권한만 부여
  - 권한 범위 확장을 방지하기 위한 정기적인 권한 검토 및 갱신
  - **Microsoft 문서**: [안전한 최소 권한 액세스](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **역할 기반 접근 제어(RBAC)**: 세분화된 역할 할당 구현
  - 역할을 특정 자원 및 작업에 엄격히 제한
  - 공격 범위를 넓히는 광범위하거나 불필요한 권한 회피

- **지속적 권한 모니터링**: 정기적인 접근 감사 및 모니터링
  - 권한 사용 패턴에 이상 징후 감시
  - 과도하거나 미사용 권한을 신속히 수정

## AI 특화 보안 위협

### 프롬프트 인젝션 및 도구 조작 공격

최신 MCP 구현은 전통 보안 조치로는 완벽히 대응하기 어려운 정교한 AI 특화 공격 벡터에 직면해 있습니다:

#### **간접 프롬프트 인젝션 (교차 도메인 프롬프트 인젝션)**

<strong>간접 프롬프트 인젝션</strong>은 MCP 기반 AI 시스템에서 가장 심각한 취약점 중 하나입니다. 공격자는 문서, 웹 페이지, 이메일 또는 AI 시스템이 합법 명령으로 처리하는 외부 콘텐츠 내에 악의적 지시사항을 삽입합니다.

**공격 시나리오:**
- **문서 기반 인젝션**: AI가 처리하는 문서에 숨겨진 악성 지시가 의도하지 않은 동작을 유발
- **웹 콘텐츠 악용**: 스크랩 시 AI 행동을 조작하는 임베디드 프롬프트가 포함된 손상된 웹 페이지
- **이메일 기반 공격**: AI 비서가 정보를 유출하거나 무단 동작을 수행하게 하는 이메일 내 악성 프롬프트
- **데이터 소스 오염**: 오염된 데이터베이스나 API가 AI 시스템에 오염된 콘텐츠 제공

**실제 영향**: 데이터 유출, 개인정보 침해, 유해 콘텐츠 생성, 사용자 상호작용 조작 등이 발생할 수 있습니다. 자세한 분석은 [MCP의 프롬프트 인젝션 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)을 참고하세요.

![프롬프트 인젝션 공격 다이어그램](../../../translated_images/ko/prompt-injection.ed9fbfde297ca877.webp)

#### **도구 변조 공격**

<strong>도구 변조</strong>는 MCP 도구를 정의하는 메타데이터를 대상으로 하며, LLM이 도구 설명과 매개변수를 해석해 실행 결정을 내리는 방식을 악용합니다.

**공격 메커니즘:**
- **메타데이터 조작**: 공격자가 도구 설명, 매개변수 정의, 사용 예시에 악의적 지시사항 삽입
- **사람이 볼 수 없는 지시**: AI 모델이 처리하지만 사용자에게는 보이지 않는 도구 메타데이터 내 숨겨진 프롬프트
- **동적 도구 변경("러그 풀")**: 사용자가 승인한 도구가 이후 몰래 악의적 동작 수행하도록 변경됨
- **매개변수 인젝션**: 모델 행동에 영향을 미치는 도구 매개변수 스키마 내 악성 콘텐츠 삽입


**호스팅 서버 위험**: 원격 MCP 서버는 도구 정의가 초기 사용자 승인 이후에 업데이트될 수 있어 이전에는 안전했던 도구가 악성화되는 시나리오를 초래하므로 위험이 높습니다. 종합적인 분석은 [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)를 참조하세요.

![Tool Injection Attack Diagram](../../../translated_images/ko/tool-injection.3b0b4a6b24de6bef.webp)

#### **추가 AI 공격 벡터**

- **교차 도메인 프롬프트 인젝션 (XPIA)**: 여러 도메인의 콘텐츠를 활용하여 보안 제어를 우회하는 정교한 공격
- **동적 기능 수정**: 초기 보안 평가를 벗어나는 도구 기능의 실시간 변경
- **컨텍스트 윈도우 포이즈닝**: 대규모 컨텍스트 윈도우를 조작하여 악성 명령을 숨기는 공격
- **모델 혼란 공격**: 모델 한계를 이용하여 예측 불가능하거나 안전하지 않은 동작 생성


### AI 보안 위험 영향

**높은 영향 결과:**
- **데이터 유출**: 민감한 기업 또는 개인 데이터의 무단 접근 및 절도
- **개인정보 침해**: 개인 식별 정보(PII) 및 기밀 비즈니스 데이터 노출  
- **시스템 조작**: 중요한 시스템과 워크플로우의 의도치 않은 변경
- **자격 증명 도용**: 인증 토큰과 서비스 자격 증명의 침해
- **측면 이동**: 손상된 AI 시스템을 넓은 네트워크 공격의 피벗으로 사용

### 마이크로소프트 AI 보안 솔루션

#### **AI 프롬프트 쉴드: 인젝션 공격에 대한 고급 보호**

마이크로소프트 <strong>AI 프롬프트 쉴드</strong>는 여러 보안 계층을 통해 직접적 및 간접적인 프롬프트 인젝션 공격 모두에 대해 포괄적인 방어를 제공합니다:

##### **핵심 보호 메커니즘:**

1. **고급 탐지 및 필터링**
   - 머신러닝 알고리즘과 NLP 기술로 외부 콘텐츠 내 악성 명령 탐지
   - 문서, 웹 페이지, 이메일, 데이터 소스에 포함된 위협의 실시간 분석
   - 합법적과 악성 프롬프트 패턴에 대한 컨텍스트 이해

2. **스포트라이트 기술**  
   - 신뢰된 시스템 명령과 잠재적으로 손상된 외부 입력 구분
   - 모델 관련성을 향상시키면서 악성 콘텐츠를 분리하는 텍스트 변환 기법
   - AI 시스템이 적절한 명령 계층을 유지하고 주입된 명령을 무시하도록 지원

3. **구분자 및 데이터마킹 시스템**
   - 신뢰된 시스템 메시지와 외부 입력 텍스트 사이의 명확한 경계 정의
   - 신뢰된 데이터 소스와 신뢰하지 않는 데이터 소스 간 경계를 강조하는 특수 마커
   - 명령 혼동과 무단 명령 실행 방지 위한 명확한 분리

4. **지속적인 위협 인텔리전스**
   - 마이크로소프트는 새로운 공격 패턴을 지속적으로 모니터링하고 방어를 업데이트
   - 새로운 인젝션 기법과 공격 벡터에 대한 선제적 위협 사냥
   - 진화하는 위협에 효과적으로 대응하기 위한 정기 보안 모델 업데이트

5. **Azure 콘텐츠 안전 통합**
   - 종합적인 Azure AI 콘텐츠 안전 제품군의 일부
   - 탈옥 시도, 유해한 콘텐츠, 보안 정책 위반에 대한 추가 탐지
   - AI 애플리케이션 구성 요소 전반에 걸친 통합 보안 제어

**구현 자료**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ko/prompt-shield.ff5b95be76e9c78c.webp)


## 고급 MCP 보안 위협

### 세션 하이재킹 취약점

<strong>세션 하이재킹</strong>은 상태 기반 MCP 구현에서 중요한 공격 벡터로, 무단 사용자가 합법적인 세션 식별자를 획득 및 악용하여 클라이언트를 가장하고 무단 작업을 수행하는 것을 의미합니다.

#### **공격 시나리오 및 위험**

- **세션 하이잭 프롬프트 인젝션**: 도난당한 세션 ID를 가진 공격자가 세션 상태를 공유하는 서버에 악성 이벤트를 주입하여 해로운 행동을 유발하거나 민감 데이터를 접근할 수 있음
- **직접 가장**: 도난당한 세션 ID로 인증을 우회하고 공격자가 정식 사용자로 간주되는 직접 MCP 서버 호출 가능
- **손상된 재개 가능 스트림**: 공격자가 요청을 조기 종료시켜 합법적 클라이언트가 잠재적으로 악성 콘텐츠와 함께 재개하도록 유도

#### **세션 관리 보안 제어**

**중요 요구사항:**
- **승인 검증**: 권한 부여를 구현하는 MCP 서버는 모든 수신 요청을 검증해야 하며 인증용 세션에 의존해서는 안 됨
- **안전한 세션 생성**: 보안 난수 생성기로 생성된 암호학적이고 비결정적인 세션 ID 사용
- **사용자별 바인딩**: `<user_id>:<session_id>` 형식 같은 사용자별 정보에 세션 ID를 바인딩하여 사용자 간 세션 악용 방지
- **세션 수명 주기 관리**: 적절한 만료, 교체 및 무효화를 구현하여 취약성 기간 제한
- **전송 보안**: 모든 통신에 대해 HTTPS 필수 적용하여 세션 ID 가로채기 방지

### 혼란스러운 대리 문제

<strong>혼란스러운 대리 문제</strong>는 MCP 서버가 클라이언트와 타사 서비스 간 인증 프록시 역할을 수행할 때 발생하며, 정적 클라이언트 ID 악용을 통한 권한 우회 기회를 만듭니다.

#### **공격 메커니즘 및 위험**

- **쿠키 기반 동의 우회**: 이전 사용자 인증으로 생성된 동의 쿠키를 공격자가 악의적 권한 요청과 조작된 리디렉션 URI를 통해 악용
- **권한 코드 도용**: 기존 동의 쿠키로 인해 권한 서버가 동의 화면 스킵, 권한 코드를 공격자 제어 엔드포인트로 리디렉션  
- **무단 API 접근**: 도난당한 권한 코드로 토큰 교환 및 사용자 가장이 승인 없이 가능

#### **완화 전략**

**의무 제어:**
- **명시적 동의 요구 사항**: 정적 클라이언트 ID를 사용하는 MCP 프록시 서버는 동적으로 등록된 각 클라이언트에 대해 사용자 동의 반드시 획득
- **OAuth 2.1 보안 구현**: 모든 권한 요청에 대해 PKCE(코드 교환 증명 키)를 포함한 최신 OAuth 보안 지침 준수
- **엄격한 클라이언트 검증**: 리디렉션 URI 및 클라이언트 식별자에 대한 엄격한 검증으로 악용 방지

### 토큰 패스스루 취약점  

<strong>토큰 패스스루</strong>는 MCP 서버가 토큰을 적절히 검증하지 않고 클라이언트 토큰을 받아 하위 API로 전달하는 명백한 안티패턴으로, MCP 권한 부여 규격을 위반합니다.

#### **보안 영향**

- **제어 우회**: 클라이언트와 API 간 직접 토큰 사용은 중요 속도 제한, 검증, 모니터링 제어 우회
- **감사 추적 손상**: 상위 발급 토큰은 클라이언트 식별을 불가능하게 하여 사고 조사 능력 저해
- **프록시 기반 데이터 유출**: 미검증 토큰으로 악성 행위자가 서버를 무단 데이터 접근용 프록시로 사용 가능
- **신뢰 경계 위반**: 토큰 출처 확인 불가 시 하위 서비스의 신뢰 가정 위반 가능
- **다중 서비스 공격 확장**: 여러 서비스에서 수용되는 손상된 토큰이 측면 이동 가능케 함

#### **필수 보안 제어**

**비협상 요구사항:**
- **토큰 검증**: MCP 서버는 명시적으로 해당 MCP 서버를 위해 발급된 토큰만 수용해야 하며 그렇지 않은 토큰은 절대 수용하지 말 것
- **수신자 검증**: 토큰 청중(claim)이 MCP 서버의 정체성과 일치하는지 항상 검증
- **적절한 토큰 수명 주기**: 짧은 수명 액세스 토큰 구현 및 안전한 교체 방식 적용


## AI 시스템 공급망 보안

공급망 보안은 전통적 소프트웨어 종속성을 넘어 AI 생태계 전체로 확장되었습니다. 최신 MCP 구현은 모든 AI 관련 구성 요소를 엄격히 검증하고 모니터링해야 하며, 각 구성 요소는 시스템 무결성을 위협할 수 있는 잠재적인 취약점을 내포합니다.

### 확장된 AI 공급망 구성 요소

**전통적 소프트웨어 종속성:**
- 오픈소스 라이브러리와 프레임워크
- 컨테이너 이미지 및 기본 시스템  
- 개발 도구 및 빌드 파이프라인
- 인프라 구성 요소 및 서비스

**AI 특화 공급망 요소:**
- **파운데이션 모델**: 출처 검증이 필요한 다양한 제공업체의 사전 학습 모델
- **임베딩 서비스**: 외부 벡터화 및 시맨틱 검색 서비스
- **컨텍스트 제공자**: 데이터 소스, 지식 베이스, 문서 저장소  
- **서드파티 API**: 외부 AI 서비스, ML 파이프라인, 데이터 처리 엔드포인트
- **모델 아티팩트**: 가중치, 구성, 미세 조정된 모델 변종
- **학습 데이터 소스**: 모델 학습 및 미세 조정에 사용된 데이터셋

### 종합 공급망 보안 전략

#### **구성 요소 검증 및 신뢰**
- **출처 검증**: 통합 전에 모든 AI 구성 요소의 출처, 라이선스, 무결성 검증
- **보안 평가**: 모델, 데이터 소스, AI 서비스에 대한 취약점 스캔 및 보안 리뷰 수행
- **평판 분석**: AI 서비스 제공자의 보안 기록 및 실천 관행 평가
- **준수 검증**: 조직의 보안 및 규제 요구 사항 충족 여부 확인

#### **안전한 배포 파이프라인**  
- **자동화된 CI/CD 보안**: 자동 배포 파이프라인 전반에 걸쳐 보안 스캔 통합
- **아티팩트 무결성**: 배포된 모든 아티팩트(코드, 모델, 구성)에 대해 암호학적 검증 구현
- **단계별 배포**: 각 단계에서 보안 검증을 수행하는 점진적 배포 전략 사용
- **신뢰된 아티팩트 저장소**: 검증된 안전한 아티팩트 레지스트리 및 저장소에서만 배포

#### **지속적인 모니터링 및 대응**
- **종속성 스캔**: 모든 소프트웨어 및 AI 구성 요소 종속성에 대한 지속적 취약점 모니터링
- **모델 모니터링**: 모델 동작, 성능 저하, 보안 이상 현상 지속 평가
- **서비스 상태 추적**: 외부 AI 서비스 가용성, 보안 사고, 정책 변경 모니터링
- **위협 인텔리전스 통합**: AI 및 ML 보안 위험에 특화된 위협 피드 통합

#### **액세스 제어 및 최소 권한**
- **구성 요소 수준 권한**: 비즈니스 필요성에 기반한 모델, 데이터, 서비스 접근 제한
- **서비스 계정 관리**: 최소한의 권한을 가진 전용 서비스 계정 구현
- **네트워크 분할**: AI 구성 요소 분리 및 서비스 간 네트워크 접근 제한
- **API 게이트웨이 제어**: 외부 AI 서비스 접근 통제 및 모니터링을 위한 중앙집중식 API 게이트웨이 사용

#### **사고 대응 및 복구**
- **신속 대응 절차**: 손상된 AI 구성 요소 패치 또는 교체를 위한 확립된 프로세스
- **자격 증명 교체**: 비밀, API 키, 서비스 자격 증명 교체를 자동화하는 시스템
- **롤백 기능**: 이전에 확인된 정상 버전으로 빠른 복원 가능
- **공급망 침해 복구**: 상위 AI 서비스 손상에 대응하는 특화된 절차

### 마이크로소프트 보안 도구 및 통합

<strong>GitHub 고급 보안</strong>은 다음을 포함하는 포괄적인 공급망 보호를 제공:
- **비밀 스캐닝**: 저장소 내 자격 증명, API 키, 토큰 자동 탐지
- **종속성 스캐닝**: 오픈소스 종속성 및 라이브러리에 대한 취약점 평가
- **CodeQL 분석**: 보안 취약점 및 코드 문제에 대한 정적 코드 분석
- **공급망 인사이트**: 종속성 상태 및 보안 상태에 대한 가시성 제공

**Azure DevOps 및 Azure Repos 통합:**
- Microsoft 개발 플랫폼 전반에 원활한 보안 스캔 통합
- AI 워크로드에 대한 Azure 파이프라인 자동 보안 검사
- 안전한 AI 구성 요소 배포를 위한 정책 시행

**마이크로소프트 내부 실천 사례:**
마이크로소프트는 모든 제품에 걸쳐 광범위한 공급망 보안 실천을 적용합니다. [Microsoft에서 소프트웨어 공급망을 보호하는 여정](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)에서 검증된 접근 방식을 알아보세요.


## 기본 보안 모범 사례

MCP 구현은 조직의 기존 보안 태세를 상속하고 이를 바탕으로 구축됩니다. 기본 보안 관행을 강화하면 AI 시스템 및 MCP 배포의 전반적인 보안이 크게 향상됩니다.

### 핵심 보안 기본 사항

#### **안전한 개발 관행**
- **OWASP 준수**: [OWASP Top 10](https://owasp.org/www-project-top-ten/) 웹 애플리케이션 취약점으로부터 보호
- **AI 특화 보호**: [LLM용 OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)에 대한 통제 구현
- **안전한 비밀 관리**: 토큰, API 키, 민감 구성 데이터를 위한 전용 금고 사용
- **종단 간 암호화**: 모든 애플리케이션 구성 요소와 데이터 흐름에 안전한 통신 구현
- **입력 검증**: 모든 사용자 입력, API 매개변수, 데이터 소스에 대한 엄격한 검증

#### **인프라 강화**
- **다단계 인증**: 모든 관리 및 서비스 계정에 대해 MFA 필수 적용
- **패치 관리**: 운영체제, 프레임워크, 종속성에 대한 자동화된 적시 패치
- **ID 제공자 통합**: 엔터프라이즈 ID 제공자(Microsoft Entra ID, Active Directory)를 통한 중앙 인증 관리
- **네트워크 분할**: 횡적 이동 가능성을 제한하는 MCP 구성 요소 논리적 분리
- **최소 권한 원칙**: 모든 시스템 구성 요소 및 계정에 최소한 필요한 권한 부여

#### **보안 모니터링 및 탐지**
- **종합 로깅**: MCP 클라이언트-서버 상호작용을 포함한 AI 애플리케이션 활동 상세 기록
- **SIEM 통합**: 이상 탐지를 위한 중앙 보안 정보 및 이벤트 관리
- **행동 분석**: 시스템 및 사용자 행동의 이상 패턴 탐지용 AI 기반 모니터링
- **위협 인텔리전스**: 외부 위협 피드 및 침해 지표(IOC) 통합
- **사고 대응**: 보안 사고 탐지, 대응, 복구를 위한 명확한 절차

#### **제로 트러스트 아키텍처**
- **절대 신뢰 금지, 항상 검증**: 사용자, 장치, 네트워크 연결에 대한 지속적 검증
- **마이크로 세분화**: 개별 워크로드 및 서비스를 격리하는 정밀 네트워크 제어
- **ID 중심 보안**: 네트워크 위치가 아닌 검증된 신원 기반 보안 정책
- **지속적 위험 평가**: 현재 컨텍스트 및 행동에 기반한 동적 보안 태세 평가
- **조건부 접근**: 위험 요소, 위치, 장치 신뢰도에 따라 적응하는 접근 제어

### 엔터프라이즈 통합 패턴

#### **마이크로소프트 보안 생태계 통합**
- **Microsoft Defender for Cloud**: 종합적인 클라우드 보안 태세 관리
- **Azure Sentinel**: AI 워크로드 보호를 위한 클라우드 네이티브 SIEM 및 SOAR 기능
- **Microsoft Entra ID**: 조건부 접근 정책을 포함한 엔터프라이즈 ID 및 접근 관리
- **Azure Key Vault**: 하드웨어 보안 모듈(HSM) 지원 중앙 비밀 관리
- **Microsoft Purview**: AI 데이터 소스 및 워크플로우에 대한 데이터 거버넌스 및 규정 준수

#### **준수 및 거버넌스**
- **규제 준수 정렬**: MCP 구현이 산업별 규정 요구사항(GDPR, HIPAA, SOC 2)을 충족하도록 보장

- **데이터 분류**: AI 시스템이 처리하는 민감한 데이터에 대한 적절한 분류 및 처리
- **감사 기록**: 규제 준수 및 법의학 조사를 위한 포괄적인 로깅
- **개인정보 보호 통제**: AI 시스템 아키텍처에 개인정보 보호 설계 원칙 구현
- **변경 관리**: AI 시스템 수정에 대한 보안 검토를 위한 공식 절차

이러한 기본 관행들은 MCP 특정 보안 통제의 효과를 강화하고 AI 기반 애플리케이션에 대한 포괄적인 보호를 제공하는 견고한 보안 기반을 만듭니다.

## 주요 보안 요점

- **계층화된 보안 접근법**: 기본 보안 관행(안전한 코딩, 최소 권한, 공급망 검증, 지속적 모니터링)과 AI 전용 통제를 결합하여 포괄적인 보호 제공

- **AI 전용 위협 환경**: MCP 시스템은 프롬프트 주입, 도구 오염, 세션 하이재킹, 혼란된 대리 문제, 토큰 전달 취약성, 과도한 권한 등 특수한 위협에 직면하며 전문화된 완화 대책 필요

- **인증 및 권한 부여 우수성**: 외부 신원 공급자(Microsoft Entra ID)를 사용한 강력한 인증 구현, 적절한 토큰 검증 강화, MCP 서버에 명시적으로 발급되지 않은 토큰 절대 수락 금지

- **AI 공격 예방**: Microsoft Prompt Shields 및 Azure Content Safety를 배포하여 간접 프롬프트 주입 및 도구 오염 공격 방어, 도구 메타데이터 검증 및 동적 변경 모니터링 수행

- **세션 및 전송 보안**: 사용자 ID에 바인딩된 암호학적으로 안전하고 비결정론적인 세션 ID 사용, 적절한 세션 생명주기 관리 구현, 세션을 인증에 사용 금지

- **OAuth 보안 모범 사례**: 동적 등록 클라이언트에 대한 명시적 사용자 동의를 통해 혼란된 대리 공격 방지, PKCE를 포함한 적절한 OAuth 2.1 구현, 엄격한 리디렉션 URI 검증  

- **토큰 보안 원칙**: 토큰 전달 안티패턴 회피, 토큰 대상 클레임 검증, 안전한 교체가 가능한 단기간 토큰 구현, 명확한 신뢰 경계 유지

- **포괄적 공급망 보안**: 모델, 임베딩, 컨텍스트 제공자, 외부 API 등 모든 AI 생태계 구성요소에 대해 전통 소프트웨어 의존성과 동일한 수준의 보안 엄격 적용

- **지속적 진화**: 빠르게 진화하는 MCP 명세를 최신 상태로 유지, 보안 커뮤니티 표준에 기여, 프로토콜 성숙에 따른 적응형 보안 태세 유지

- **Microsoft 보안 통합**: Microsoft의 포괄적 보안 생태계(Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID)를 활용한 향상된 MCP 배포 보호

## 포괄적 자원

### **공식 MCP 보안 문서**
- [MCP 명세 (현재: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 보안 모범 사례](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 인증 명세](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 저장소](https://github.com/modelcontextprotocol)

### **OWASP MCP 보안 자원**
- [OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/) - Azure 구현 지침이 포함된 포괄적 OWASP MCP Top 10
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 공식 OWASP MCP 보안 위험
- [MCP 보안 서밋 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure에서 MCP 보안을 위한 실습 교육

### **보안 표준 및 모범 사례**
- [OAuth 2.0 보안 모범 사례 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 웹 애플리케이션 보안](https://owasp.org/www-project-top-ten/)
- [대규모 언어 모델용 OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft 디지털 방어 보고서](https://aka.ms/mddr)

### **AI 보안 연구 및 분석**
- [MCP의 프롬프트 주입 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [도구 오염 공격 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 보안 연구 브리핑 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft 보안 솔루션**
- [Microsoft Prompt Shields 문서](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 서비스](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 보안](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 토큰 관리 모범 사례](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 고급 보안](https://github.com/security/advanced-security)

### **구현 가이드 및 튜토리얼**
- [Azure API Management를 통한 MCP 인증 게이트웨이](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [MCP 서버와 Microsoft Entra ID 인증](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [안전한 토큰 저장 및 암호화 (비디오)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 및 공급망 보안**
- [Azure DevOps 보안](https://azure.microsoft.com/products/devops)
- [Azure Repos 보안](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft 공급망 보안 여정](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **추가 보안 문서**

포괄적인 보안 지침을 위해 이 섹션의 전문 문서를 참조하십시오:

- **[MCP 보안 모범 사례 2025](./mcp-security-best-practices-2025.md)** - MCP 구현을 위한 완전한 보안 모범 사례
- **[Azure Content Safety 구현](./azure-content-safety-implementation.md)** - Azure Content Safety 통합을 위한 실용적인 구현 예
- **[MCP 보안 통제 2025](./mcp-security-controls-2025.md)** - MCP 배포를 위한 최신 보안 통제 및 기법
- **[MCP 모범 사례 빠른 참조](./mcp-best-practices.md)** - 필수 MCP 보안 관행에 대한 빠른 참조 가이드
- **[BlueHat 2026: AI의 미래 보안: 깊이 있는 방어 패턴으로 MCP 보안](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Microsoft 보안 대응 센터(MSRC)의 깊이 있는 방어 패턴

### **실습 보안 교육**

- **[MCP 보안 서밋 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/)** - Base Camp부터 Summit까지 점진적인 캠프가 포함된 Azure에서 MCP 서버 보안 종합 실습 워크숍
- **[OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/)** - 모든 OWASP MCP Top 10 위험에 대한 참조 아키텍처 및 구현 안내

---

## 다음 단계

다음: [3장: 시작하기](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->