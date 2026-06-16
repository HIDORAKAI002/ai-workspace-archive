# MCP 보안: AI 시스템을 위한 종합 보호

[![MCP Security Best Practices](../../../translated_images/ko/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(위 이미지를 클릭하여 이 수업의 영상을 시청하세요)_

보안은 AI 시스템 설계의 기본이며, 그래서 우리는 이를 두 번째 섹션으로 우선순위를 두고 있습니다. 이는 Microsoft의 [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)의 **Secure by Design** 원칙과 일치합니다.

모델 컨텍스트 프로토콜(MCP)은 AI 기반 애플리케이션에 강력한 새로운 기능을 제공하는 동시에 전통적인 소프트웨어 위험을 넘어서는 독특한 보안 과제를 도입합니다. MCP 시스템은 확립된 보안 문제(안전한 코딩, 최소 권한, 공급망 보안)뿐만 아니라 프롬프트 인젝션, 도구 중독, 세션 탈취, 혼란된 대리인 공격, 토큰 패스스루 취약점, 동적 기능 수정 등 AI 특유의 위협에 직면합니다.

이 수업에서는 인증, 권한 부여, 과도한 권한, 간접 프롬프트 인젝션, 세션 보안, 혼란된 대리인 문제, 토큰 관리, 공급망 취약점을 포함한 MCP 구현에서 가장 중요한 보안 위험을 탐구합니다. 또한 Microsoft의 Prompt Shields, Azure Content Safety, GitHub Advanced Security 같은 솔루션을 활용하여 MCP 배포를 강화하는 실질적인 통제 및 모범 사례도 배웁니다.

## 학습 목표

이 수업이 끝나면 다음을 수행할 수 있습니다:

- **MCP 특유의 위협 식별**: 프롬프트 인젝션, 도구 중독, 과도한 권한, 세션 탈취, 혼란된 대리인 문제, 토큰 패스스루 취약점, 공급망 위험 등 MCP 시스템 고유의 보안 위험 인식
- **보안 통제 적용**: 견고한 인증, 최소 권한 접근, 안전한 토큰 관리, 세션 보안 제어, 공급망 검증 등 효과적인 완화책 구현
- **Microsoft 보안 솔루션 활용**: MCP 작업 부하 보호를 위한 Microsoft Prompt Shields, Azure Content Safety, GitHub Advanced Security의 이해 및 적용
- **도구 보안 검증**: 도구 메타데이터 검증의 중요성 인식, 동적 변경 모니터링 및 간접 프롬프트 인젝션 공격 방어
- **모범 사례 통합**: 확립된 보안 기본 원리(안전한 코딩, 서버 강화, 제로 트러스트)와 MCP 특화 통제를 결합한 종합적 보호

# MCP 보안 아키텍처 및 통제

현대의 MCP 구현은 전통적인 소프트웨어 보안과 AI 특유의 위협을 모두 다루는 다계층 보안 방식을 필요로 합니다. 빠르게 진화하는 MCP 사양은 보안 통제를 성숙시키며, 엔터프라이즈 보안 아키텍처 및 확립된 모범 사례와의 더 나은 통합을 가능하게 합니다.

[Microsoft Digital Defense Report](https://aka.ms/mddr)의 연구에 따르면 **보고된 침해 사고의 98%가 견고한 보안 위생으로 예방될 수 있습니다**. 가장 효과적인 보호 전략은 기초적인 보안 관행과 MCP 특화 통제를 결합하는 것으로, 검증된 기본 보안 조치가 전체 보안 위험을 줄이는 데 가장 큰 영향을 미칩니다.

## 현재 보안 환경

> **참고:** 이 정보는 <strong>2026년 2월 5일 기준</strong>의 MCP 보안 표준을 반영하며, <strong>MCP Specification 2025-11-25</strong>에 맞춰져 있습니다. MCP 프로토콜은 빠르게 진화하고 있으며, 향후 구현에서는 새로운 인증 패턴과 향상된 통제가 도입될 수 있습니다. 최신 지침은 항상 현재 [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub 저장소](https://github.com/modelcontextprotocol), [보안 모범 사례 문서](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)를 참조하세요.

## 🏔️ MCP Security Summit 워크숍 (Sherpa)

<strong>실습 보안 교육</strong>을 위해 Microsoft Azure에서 MCP 서버 보안을 위한 포괄적인 안내 원정인 **MCP Security Summit Workshop** (Sherpa)을 적극 추천합니다.

### 워크숍 개요

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/)은 입증된 "취약점 → 공격 → 수정 → 검증" 방법론을 통해 실용적이고 실천 가능한 보안 교육을 제공합니다. 다음을 경험할 수 있습니다:

- **실제 취약점 체험**: 의도적으로 취약한 서버를 공격하며 학습
- **Azure 기본 보안 활용**: Azure Entra ID, Key Vault, API Management, AI Content Safety 활용
- **다층 방어 적용**: 단계별로 포괄적 보안 계층 구축
- **OWASP 표준 준수**: 모든 기법은 [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)에 연동
- **실제 코드 획득**: 작동하며 검증된 구현 코드 획득

### 원정 경로

| 캠프 | 집중 분야 | 다루는 OWASP 위험 |
|------|---------|-------------------|
| **Base Camp** | MCP 기본 및 인증 취약점 | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure 관리 ID, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API 관리, 프라이빗 엔드포인트, 거버넌스 | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3: I/O 보안** | 프롬프트 인젝션, PII 보호, 콘텐츠 안전 | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4: 모니터링** | 로그 분석, 대시보드, 위협 탐지 | MCP04, MCP08 |
| **The Summit** | 레드팀 / 블루팀 통합 테스트 | 전체 |

<strong>시작하기</strong>: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 보안 위험

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)는 MCP 구현 시 가장 중요한 10가지 보안 위험을 자세히 설명합니다:

| 위험 | 설명 | Azure 완화책 |
|------|-------|--------------|
| **MCP01** | 토큰 오용 및 비밀 노출 | Azure Key Vault, Managed Identity |
| **MCP02** | 범위 증가에 따른 권한 상승 | RBAC, 조건부 접근 |
| **MCP03** | 도구 중독 | 도구 검증, 무결성 확인 |
| **MCP04** | 소프트웨어 공급망 공격 및 의존성 변조 | GitHub Advanced Security, 의존성 스캔 |
| **MCP05** | 명령어 인젝션 및 실행 | 입력 검증, 샌드박싱 |
| **MCP06** | 의도 흐름 전복 | Azure AI Content Safety, Prompt Shields |
| **MCP07** | 불충분한 인증 및 권한 부여 | Azure Entra ID, PKCE가 포함된 OAuth 2.1 |
| **MCP08** | 감사 및 원격 측정 부족 | Azure Monitor, Application Insights |
| **MCP09** | 그림자 MCP 서버 | API 센터 거버넌스, 네트워크 격리 |
| **MCP10** | 컨텍스트 주입 및 과도한 데이터 노출 | 데이터 분류, 최소 노출 |

### MCP 인증의 진화

MCP 사양은 인증 및 권한 부여 접근 방식에서 크게 발전해왔습니다:

- **초기 접근**: 초기 사양은 개발자가 커스텀 인증 서버를 구현해야 했으며, MCP 서버가 사용자 인증을 직접 관리하는 OAuth 2.0 권한 서버 역할을 수행
- **현재 표준 (2025-11-25)**: 업데이트된 사양은 MCP 서버가 외부 인증 공급자(예: Microsoft Entra ID)에 인증 위임을 가능하게 하여 보안 태세를 개선하고 구현 복잡성을 줄임
- **전송 계층 보안**: 로컬(STDIO) 및 원격(Streamable HTTP) 연결 모두에 적합한 인증 패턴이 포함된 강화된 전송 보안 지원

## 인증 및 권한 부여 보안

### 현재 보안 과제

현대 MCP 구현은 여러 인증 및 권한 부여 관련 과제에 직면해 있습니다:

### 위험 및 위협 벡터

- **잘못 구성된 권한 부여 로직**: MCP 서버 내 권한 부여 구현 오류는 민감 데이터 노출 및 잘못된 접근 제어 적용 초래
- **OAuth 토큰 유출**: 로컬 MCP 서버 토큰도용으로 공격자가 서버를 가장해 하위 서비스 접근 가능
- **토큰 패스스루 취약점**: 부적절한 토큰 처리로 보안 통제 우회 및 추적 불가능 발생
- **과도한 권한**: 과도한 권한 보유 MCP 서버는 최소 권한 원칙 위배 및 공격 면 확대

#### 토큰 패스스루: 치명적 반패턴

**현재 MCP 권한 부여 사양에서 토큰 패스스루는 명시적으로 금지되어 있습니다**. 심각한 보안 문제 때문입니다:

##### 보안 통제 우회
- MCP 서버와 하위 API는 올바른 토큰 검증에 의존하는 핵심 보안 통제(속도 제한, 요청 검증, 트래픽 모니터링) 구현
- 클라이언트가 API 토큰을 직접 사용하면 필수 보호가 우회돼 보안 구조가 약화

##### 책임 추적 및 감사 문제  
- MCP 서버는 상위에서 발급된 토큰을 사용하는 클라이언트를 식별 불가, 감사 추적이 파괴됨
- 하위 리소스 서버 로그에서는 실제 MCP 서버 중개자가 아닌 요청 출처가 잘못 기록
- 사고 조사 및 컴플라이언스 감사가 현저히 어려워짐

##### 데이터 탈취 위험
- 검증되지 않은 토큰 클레임은 탈취된 토큰을 가진 악의적 행위자가 MCP 서버를 프록시로 데이터 탈취에 활용 가능
- 신뢰 경계 위반으로 인해 의도된 보안 통제가 우회되는 무단 접근 가능

##### 다중 서비스 공격 벡터
- 복합 서비스가 탈취된 토큰을 수용하면 연계된 시스템 간 횡적 이동 가능
- 토큰 출처 검증 불가 시 서비스 간 신뢰 가정 위협

### 보안 통제 및 완화책

**핵심 보안 요구사항:**

> <strong>필수</strong>: MCP 서버는 명시적으로 MCP 서버용으로 발급되지 않은 토큰을 절대 수락해서는 안 됩니다

#### 인증 및 권한 부여 통제

- **엄격한 권한 부여 검토**: MCP 서버 권한 로직 전면 감사 실행으로 의도한 사용자 및 클라이언트만 민감 자원 접근 가능하도록 보장
  - **구현 안내**: [Azure API Management를 이용한 MCP 서버 인증 게이트웨이](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **ID 통합**: [Microsoft Entra ID를 활용한 MCP 서버 인증](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **안전한 토큰 관리**: [Microsoft 토큰 검증 및 수명주기 모범 사례](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) 적용
  - 토큰 대상자 클레임이 MCP 서버 ID와 일치하는지 검증
  - 적절한 토큰 갱신 및 만료 정책 구현
  - 토큰 재사용 공격 및 무단 사용 방지

- **토큰 암호화 저장**: 휴지 상태 및 전송 중 모두 토큰 저장 암호화
  - **모범 사례**: [안전한 토큰 저장 및 암호화 가이드라인](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 접근 제어 구현

- **최소 권한 원칙**: MCP 서버에는 의도한 기능 수행에 필요한 최소 권한만 부여
  - 권한 검토 및 업데이트를 정기적으로 수행해 권한 증가 방지
  - **Microsoft 문서**: [안전한 최소 권한 접근](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **역할 기반 접근 제어(RBAC)**: 세부적 역할 할당 구현
  - 역할 범위를 특정 자원 및 작업에 한정
  - 공격 면을 넓히는 광범위하거나 불필요한 권한 회피

- **지속적 권한 모니터링**: 실시간 접근 감사 및 모니터링 적용
  - 권한 사용 패턴 이상 탐지
  - 과도하거나 미사용 권한 신속 제거

## AI 특유의 보안 위협

### 프롬프트 인젝션 및 도구 조작 공격

최신 MCP 구현은 전통 보안 조치만으로는 완전히 대응할 수 없는 정교한 AI 특유 공격 벡터에 직면해 있습니다:

#### **간접 프롬프트 인젝션(교차 도메인 프롬프트 인젝션)**

<strong>간접 프롬프트 인젝션</strong>은 MCP 기반 AI 시스템에서 가장 치명적인 취약점 중 하나입니다. 공격자는 외부 콘텐츠(문서, 웹페이지, 이메일, 데이터 소스)에 악의적인 지시문을 숨겨 AI 시스템이 정당한 명령으로 처리하도록 합니다.

**공격 시나리오:**
- **문서 기반 인젝션**: 처리된 문서 내 숨겨진 악성 명령이 AI의 의도치 않은 동작 유발
- **웹 콘텐츠 악용**: 스크랩되는 손상된 웹 페이지에 포함된 프롬프트가 AI 동작을 조작
- **이메일 공격**: 이메일 속 악성 프롬프트가 AI 어시스턴트로 하여금 정보 누출 또는 무단 행위 수행 유발
- **데이터 소스 오염**: 손상된 데이터베이스나 API가 오염된 컨텐츠를 AI에 제공

**실제 영향**: 데이터 유출, 개인정보 침해, 유해 콘텐츠 생성, 사용자 상호작용 조작 등 발생 가능. 자세한 분석은 [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/) 참고.

![Prompt Injection Attack Diagram](../../../translated_images/ko/prompt-injection.ed9fbfde297ca877.webp)

#### **도구 중독 공격**

<strong>도구 중독</strong>은 MCP 도구를 정의하는 메타데이터를 타겟으로 하며, LLM이 도구 설명 및 매개변수를 해석해 실행 결정을 내리는 방식을 악용합니다.

**공격 방식:**
- **메타데이터 조작**: 공격자가 도구 설명, 매개변수 정의, 사용 예시에 악성 지시문 삽입
- **은밀한 지시문**: 도구 메타데이터에 숨겨진 프롬프트로 AI 모델이 처리하지만 인간 사용자는 인지 불가
- **동적 도구 수정("러그 풀")**: 사용자 승인된 도구가 이후 악의적 작업으로 변경되어 사용자 모르게 동작
- **매개변수 인젝션**: 도구 매개변수 스키마에 삽입된 악성 내용이 모델 행동에 영향

**호스팅 서버 위험**: 원격 MCP 서버는 사용자 승인이 완료된 이후 도구 정의가 업데이트될 수 있어, 이전에 안전했던 도구가 악성으로 변할 수 있는 상황 발생. 자세한 분석은 [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) 참조.

![Tool Injection Attack Diagram](../../../translated_images/ko/tool-injection.3b0b4a6b24de6bef.webp)

#### **추가 AI 공격 벡터**

- **교차 도메인 프롬프트 인젝션(XPIA)**: 다중 도메인의 콘텐츠를 활용해 보안 통제를 우회하는 정교한 공격
- **동적 기능 수정**: 초기 보안 평가를 회피하는 도구 기능의 실시간 변경  
- **컨텍스트 윈도우 중독**: 악의적 명령을 숨기기 위해 큰 컨텍스트 윈도우를 조작하는 공격  
- **모델 혼동 공격**: 모델의 한계를 이용해 예측 불가능하거나 안전하지 않은 행동을 유발하는 공격  


### AI 보안 위험 영향

**높은 영향의 결과:**  
- **데이터 유출**: 권한 없는 민감한 기업 또는 개인 데이터 접근 및 탈취  
- **개인정보 침해**: 개인 식별 정보(PII) 및 기밀 비즈니스 데이터 노출  
- **시스템 조작**: 중요한 시스템과 워크플로우의 의도치 않은 수정  
- **자격 증명 탈취**: 인증 토큰과 서비스 자격 증명의 침해  
- **측면 이동**: 손상된 AI 시스템을 이용한 광범위한 네트워크 공격의 발판  

### 마이크로소프트 AI 보안 솔루션

#### **AI 프롬프트 쉴드: 인젝션 공격에 대한 고급 보호**

마이크로소프트 <strong>AI 프롬프트 쉴드</strong>는 다중 보안 계층을 통해 직접적 및 간접적인 프롬프트 인젝션 공격 모두에 대한 포괄적인 방어를 제공합니다.

##### **핵심 보호 메커니즘:**

1. **고급 탐지 및 필터링**  
   - 기계 학습 알고리즘과 NLP 기술로 외부 콘텐츠의 악의적 명령 탐지  
   - 문서, 웹 페이지, 이메일 및 데이터 소스에서 내재된 위협에 대한 실시간 분석  
   - 합법적 프롬프트 패턴과 악의적 패턴의 맥락적 이해  

2. **스포트라이트 기법**  
   - 신뢰된 시스템 명령과 잠재적 손상된 외부 입력 구분  
   - 모델 관련성을 향상하면서 악의적 내용을 분리하는 텍스트 변환 기법  
   - AI 시스템이 올바른 명령 계층을 유지하고 삽입된 명령을 무시하도록 지원  

3. **구분자 및 데이터 마킹 시스템**  
   - 신뢰된 시스템 메시지와 외부 입력 텍스트 사이의 명확한 경계 정의  
   - 신뢰된 데이터와 비신뢰 데이터 소스 간 경계를 표시하는 특별 마커  
   - 명령 혼동 및 무단 명령 실행 방지를 위한 명확한 분리  

4. **지속적인 위협 인텔리전스**  
   - 마이크로소프트가 신규 공격 패턴 모니터링 및 방어 업데이트 지속  
   - 신규 인젝션 기법과 공격 벡터에 대한 사전적 위협 사냥  
   - 진화하는 위협에 효과적으로 대응하기 위한 보안 모델 정기 업데이트  

5. **Azure 콘텐츠 안전 통합**  
   - 종합 Azure AI 콘텐츠 안전 제품군의 일부  
   - 탈옥 탐지, 유해 콘텐츠 및 보안 정책 위반 추가 탐지  
   - AI 애플리케이션 구성 요소 전반에 걸친 통합 보안 제어  

**구현 자료**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ko/prompt-shield.ff5b95be76e9c78c.webp)


## 고급 MCP 보안 위협

### 세션 하이재킹 취약점

<strong>세션 하이재킹</strong>은 상태 저장 MCP 구현에서 중요한 공격 벡터로, 권한 없는 공격자가 정상 세션 식별자를 획득해 클라이언트로 가장하여 무단 작업을 수행합니다.

#### **공격 시나리오 및 위험**

- **세션 하이재킹 프롬프트 인젝션**: 도난당한 세션 ID를 가진 공격자가 세션 상태를 공유하는 서버에 악의적 이벤트를 주입하여 유해 동작 유발 또는 민감 데이터 접근  
- **직접 가장**: 도난 세션 ID로 인증을 우회해 MCP 서버 호출, 공격자를 정당한 사용자로 취급  
- **손상된 재개 가능한 스트림**: 공격자가 요청을 조기 종료시켜 정상 클라이언트가 잠재적 악의적 콘텐츠로 재개  

#### **세션 관리 보안 통제**

**중요 요구사항:**  
- **인가 검증**: MCP 서버는 모든 수신 요청을 검증해야 하며 세션 인증에 의존해서는 안됨  
- **안전한 세션 생성**: 보안 난수 발생기로 생성된 암호학적 비결정적 세션 ID 사용  
- **사용자별 바인딩**: `<user_id>:<session_id>` 형식 등으로 사용자별 정보에 세션 ID 바인딩해 교차 사용자 세션 오용 방지  
- **세션 수명 관리**: 적절한 만료, 회전, 무효화로 취약점 기간 제한  
- **전송 보안**: 모든 통신에 대해 HTTPS 필수  

### 혼동 부대표 문제

<strong>혼동 부대표 문제</strong>는 MCP 서버가 클라이언트와 제3자 서비스 간 인증 프록시 역할을 하면서 고정된 클라이언트 ID 악용을 통한 인가 우회가 발생하는 문제입니다.

#### **공격 메커니즘 및 위험**

- **쿠키 기반 동의 우회**: 이전 사용자 인증 과정에서 생성된 동의 쿠키를 공격자가 악의적 권한 요청과 조작된 리디렉션 URI로 악용  
- **인가 코드 탈취**: 동의 쿠키로 인해 인가 서버가 동의 화면을 생략하고 공격자 제어 지점으로 코드 리디렉션  
- **무단 API 접근**: 탈취한 인가 코드로 토큰 교환 및 사용자 가장 행위 허용  

#### **완화 전략**

**필수 통제:**  
- **명시적 동의 요구**: 고정 클라이언트 ID를 사용하는 MCP 프록시 서버는 동적으로 등록된 클라이언트마다 사용자 동의 획득 필수  
- **OAuth 2.1 보안 적용**: PKCE 포함 최신 OAuth 보안 권고사항 준수  
- **엄격한 클라이언트 검증**: 리디렉션 URI 및 클라이언트 ID의 엄격한 유효성 검사  

### 토큰 패스스루 취약점  

<strong>토큰 패스스루</strong>는 MCP 서버가 클라이언트 토큰을 적절한 검증 없이 수용해 하위 API에 전달함으로써 MCP 인가 명세를 위반하는 명백한 안티패턴입니다.

#### **보안 영향**

- **통제 회피**: 클라이언트-API 직접 토큰 사용이 중요한 속도 제한, 검증, 모니터링 통제 우회  
- **감사 추적 훼손**: 상위 발급 토큰 사용으로 클라이언트 식별 불가해 사건 조사 방해  
- **프록시 기반 데이터 유출**: 검증되지 않은 토큰이 공격자에게 서버를 통한 무단 데이터 접근 경로 제공  
- **신뢰 경계 위반**: 토큰 출처 확인 불가 시 하위 서비스의 신뢰 시나리오 깨짐  
- **다중 서비스 공격 확대**: 여러 서비스에서 허용된 손상된 토큰을 통한 측면 이동  

#### **필수 보안 통제**

**무조건 준수 사항:**  
- **토큰 검증**: MCP 서버는 MCP 서버를 위해 명시적으로 발급되지 않은 토큰을 절대 수용하지 말 것  
- **청중 검증**: 토큰 청중 클레임이 MCP 서버 신원과 일치하는지 항상 검증  
- **적절한 토큰 수명 관리**: 단기 액세스 토큰 및 안전한 회전 방식 적용  


## AI 시스템 공급망 보안

공급망 보안은 전통 소프트웨어 의존성을 넘어 AI 생태계 전체를 포함하도록 진화했습니다. 최신 MCP 구현은 시스템 무결성을 침해할 수 있는 잠재 취약점이 있는 모든 AI 관련 구성 요소를 엄격히 검증하고 모니터링해야 합니다.

### 확장된 AI 공급망 구성 요소

**전통적 소프트웨어 의존성:**  
- 오픈소스 라이브러리 및 프레임워크  
- 컨테이너 이미지 및 기본 시스템  
- 개발 도구 및 빌드 파이프라인  
- 인프라 구성 요소 및 서비스  

**AI 특화 공급망 요소:**  
- **기초 모델**: 다양한 공급자에서 제공하는 사전훈련 모델의 출처 검증 필요  
- **임베딩 서비스**: 외부 벡터화 및 의미 검색 서비스  
- **컨텍스트 공급자**: 데이터 소스, 지식 베이스, 문서 저장소  
- **서드파티 API**: 외부 AI 서비스, ML 파이프라인, 데이터 처리 엔드포인트  
- **모델 아티팩트**: 가중치, 구성, 미세조정 버전  
- **훈련 데이터 소스**: 모델 훈련 및 미세조정에 사용되는 데이터셋  

### 포괄적 공급망 보안 전략

#### **구성 요소 검증 및 신뢰**  
- **출처 검증**: 통합 전 모든 AI 구성요소의 출처, 라이선스, 무결성 확인  
- **보안 평가**: 모델, 데이터 소스, AI 서비스 취약점 스캔 및 보안 리뷰 수행  
- **평판 분석**: AI 서비스 제공 업체의 보안 이력 및 관행 평가  
- **규정 준수 확인**: 모든 구성 요소가 조직 보안 및 규제 요구사항 충족  

#### **안전한 배포 파이프라인**  
- **자동화 CI/CD 보안**: 배포 파이프라인 전반에 보안 스캔 통합  
- **아티팩트 무결성**: 배포 아티팩트(코드, 모델, 구성)에 대한 암호학적 검증 적용  
- **단계별 배포**: 각 단계별 보안 검증을 포함한 점진적 배포 전략  
- **신뢰할 수 있는 아티팩트 저장소**: 검증된 보안 저장소에서만 배포  

#### **지속적 모니터링 및 대응**  
- **의존성 스캔**: 모든 소프트웨어 및 AI 구성 요소 의존성의 취약점 지속 감시  
- **모델 모니터링**: 모델 동작, 성능 변화, 보안 이상 지속 평가  
- **서비스 상태 추적**: 외부 AI 서비스의 가용성, 보안 사고, 정책 변경 모니터링  
- **위협 인텔리전스 통합**: AI 및 ML 보안 위험에 특화된 위협 피드 활용  

#### **접근 통제 및 최소 권한**  
- **구성요소별 권한**: 비즈니스 필요성에 따른 모델, 데이터, 서비스 접근 제한  
- **서비스 계정 관리**: 최소 권한 서비스 계정 구현  
- **네트워크 분할**: AI 구성 요소 격리 및 서비스 간 네트워크 접근 제한  
- **API 게이트웨이 통제**: 외부 AI 서비스 접근을 제어 및 모니터링하는 중앙화 게이트웨이  

#### **사고 대응 및 복구**  
- **신속 대응 절차**: 손상된 AI 구성 요소 패치 또는 교체 프로세스 확립  
- **자격 증명 회전**: 비밀, API 키, 서비스 자격 증명의 자동 회전 시스템  
- **롤백 기능**: 이전 정상 버전 AI 구성 요소로 신속 복귀 가능  
- **공급망 위반 대응**: 상위 AI 서비스 손상 시 대응 절차  

### 마이크로소프트 보안 도구 및 통합

<strong>GitHub Advanced Security</strong>는 포괄적 공급망 보호 제공:  
- **비밀 스캐닝**: 저장소 내 자격 증명, API 키, 토큰 자동 탐지  
- **의존성 스캐닝**: 오픈소스 의존성 취약점 평가  
- **CodeQL 분석**: 보안 취약점 및 코딩 문제에 대한 정적 코드 분석  
- **공급망 인사이트**: 의존성 상태 및 보안 현황 가시성 제공  

**Azure DevOps 및 Azure Repos 통합:**  
- 마이크로소프트 개발 플랫폼 전반의 보안 스캔 통합  
- AI 워크로드용 Azure Pipelines 자동 보안 검사  
- 안전한 AI 구성 요소 배포용 정책 집행  

**마이크로소프트 내부 관행:**  
마이크로소프트는 모든 제품에서 광범위한 공급망 보안 관행을 구현합니다. [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)에서 검증된 접근법을 확인하세요.


## 기초 보안 모범 사례

MCP 구현은 조직 기존 보안 태세를 계승하고 기반 위에 구축됩니다. 기초 보안 실천 강화는 AI 시스템 및 MCP 배포의 전반적 보안을 크게 향상시킵니다.

### 핵심 보안 기본 요소

#### **안전한 개발 관행**  
- **OWASP 준수**: [OWASP Top 10](https://owasp.org/www-project-top-ten/) 웹 애플리케이션 취약점 방어  
- **AI 특화 보호**: [LLM용 OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559) 제어 적용  
- **안전한 비밀 관리**: 토큰, API 키, 민감 구성 데이터를 위한 전용 금고 사용  
- **종단간 암호화**: 모든 애플리케이션 구성 요소와 데이터 흐름 간 안전한 통신 구현  
- **입력 검증**: 모든 사용자 입력, API 매개변수, 데이터 소스 엄격 검증  

#### **인프라 강화**  
- **다중 인증**: 모든 관리자 및 서비스 계정에 MFA 필수  
- **패치 관리**: 운영 체제, 프레임워크, 의존성의 자동 및 신속 패치 적용  
- **ID 공급자 통합**: 엔터프라이즈 ID 공급자(Microsoft Entra ID, Active Directory)로 중앙 집중형 ID 관리  
- **네트워크 분할**: 측면 이동 제한을 위한 MCP 구성요소 논리적 격리  
- **최소 권한 원칙**: 모든 시스템 구성요소 및 계정에 필요한 최소 권한만 부여  

#### **보안 모니터링 및 탐지**  
- **포괄적 로깅**: MCP 클라이언트-서버 상호작용 포함 AI 애플리케이션 활동 상세 기록  
- **SIEM 통합**: 이상 탐지를 위한 중앙 집중형 보안 정보 및 이벤트 관리  
- **행동 분석**: 시스템 및 사용자 행동에서 비정상 패턴 탐지를 위한 AI 기반 모니터링  
- **위협 인텔리전스**: 외부 위협 피드 및 침해 지표(IOC) 통합  
- **사고 대응**: 보안 사고 탐지, 대응, 복구를 위한 명확한 절차  

#### **제로 트러스트 아키텍처**  
- **절대 신뢰 금지, 항상 검증**: 사용자, 장치, 네트워크 연결에 대한 지속적 검증  
- **마이크로 세분화**: 개별 워크로드 및 서비스 격리용 세밀한 네트워크 제어  
- **ID 중심 보안**: 네트워크 위치가 아닌 검증된 신원을 기반으로 한 보안 정책  
- **지속 위험 평가**: 현재 맥락 및 행동에 따른 동적 보안 태세 평가  
- **조건부 접근**: 위험 요소, 위치, 장치 신뢰도에 따라 유연한 접근 통제  

### 엔터프라이즈 통합 패턴

#### **마이크로소프트 보안 생태계 통합**  
- **Microsoft Defender for Cloud**: 포괄적 클라우드 보안 태세 관리  
- **Azure Sentinel**: AI 워크로드 보호를 위한 클라우드 네이티브 SIEM 및 SOAR 기능  
- **Microsoft Entra ID**: 조건부 접근 정책을 포함한 엔터프라이즈 ID 및 접근 관리  
- **Azure Key Vault**: 하드웨어 보안 모듈(HSM) 지원 중앙 집중형 비밀 관리  
- **Microsoft Purview**: AI 데이터 소스 및 워크플로우를 위한 데이터 거버넌스 및 규정 준수  

#### **규정 준수 및 거버넌스**  
- **규제 정렬**: MCP 구현이 산업별 규제 요건(GDPR, HIPAA, SOC 2) 충족 보장  
- **데이터 분류**: AI 시스템이 처리하는 민감 데이터 적절 분류 및 처리  
- **감사 추적**: 규제 준수 및 포렌식 조사를 위한 포괄적 로깅  
- **개인정보 보호 제어**: AI 시스템 아키텍처에 프라이버시 바이 디자인 원칙 적용  
- **변경 관리**: AI 시스템 변경에 대한 공식 보안 검토 절차  

이러한 기초 관행은 강력한 보안 기준을 조성하여 MCP 특화 보안 통제의 효과를 강화하고 AI 기반 애플리케이션에 대한 포괄적 보호를 제공합니다.

## 주요 보안 요점
- **계층화된 보안 접근법**: 기본적인 보안 관행(안전한 코딩, 최소 권한, 공급망 검증, 지속적인 모니터링)과 AI 전용 통제를 결합하여 포괄적인 보호 제공

- **AI 전용 위협 환경**: MCP 시스템은 프롬프트 인젝션, 도구 변조, 세션 하이재킹, 혼동 대리자 문제, 토큰 전달 취약점, 과도한 권한 등 고유한 위험에 직면하며, 특화된 완화 조치 필요

- **인증 및 권한 부여 우수성**: 외부 ID 공급자(Microsoft Entra ID)를 활용한 강력한 인증 구현, 적절한 토큰 검증 시행, MCP 서버용으로 명시적으로 발급되지 않은 토큰은 절대 수용하지 않음

- **AI 공격 방지**: Microsoft Prompt Shields 및 Azure Content Safety를 배포하여 간접적인 프롬프트 인젝션 및 도구 변조 공격 방어, 도구 메타데이터 검증과 동적 변경 모니터링 수행

- **세션 및 전송 보안**: 사용자 ID에 바인딩된 암호화 적이고 비결정적인 세션 ID 사용, 적절한 세션 수명 주기 관리 구현, 세션을 인증 수단으로 절대 사용하지 않음

- **OAuth 보안 모범 사례**: 동적 등록 클라이언트에 대해 명백한 사용자 동의를 통해 혼동 대리자 공격 방지, PKCE를 포함한 적절한 OAuth 2.1 구현 및 엄격한 리디렉션 URI 검증

- **토큰 보안 원칙**: 토큰 전달 반패턴 회피, 토큰 대상 청구 검증, 안전한 회전이 가능한 단명 토큰 구현, 명확한 신뢰 경계 유지

- **포괄적 공급망 보안**: AI 생태계의 모든 구성 요소(모델, 임베딩, 컨텍스트 공급자, 외부 API)를 전통적인 소프트웨어 종속성과 동일한 엄격한 보안 기준으로 취급

- **지속적 진화**: 급속도로 진화하는 MCP 사양 최신 상태 유지, 보안 커뮤니티 표준에 기여, 프로토콜 성숙에 따라 적응형 보안 태세 유지

- **마이크로소프트 보안 통합**: MCP 배포 보호 강화를 위해 Microsoft의 포괄적 보안 생태계(Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) 활용

## 포괄적 리소스

### **공식 MCP 보안 문서**
- [MCP 사양 (현재: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 보안 모범 사례](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 권한 부여 사양](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 저장소](https://github.com/modelcontextprotocol)

### **OWASP MCP 보안 리소스**
- [OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/) - Azure 구현 지침을 포함한 포괄적 OWASP MCP Top 10
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 공식 OWASP MCP 보안 위험
- [MCP 보안 서밋 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure에서 MCP 보안 실습 교육

### **보안 표준 및 모범 사례**
- [OAuth 2.0 보안 모범 사례 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 웹 애플리케이션 보안 Top 10](https://owasp.org/www-project-top-ten/)
- [대형 언어 모델용 OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft 디지털 방어 보고서](https://aka.ms/mddr)

### **AI 보안 연구 및 분석**
- [MCP의 프롬프트 인젝션 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [도구 변조 공격 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 보안 연구 브리핑 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **마이크로소프트 보안 솔루션**
- [Microsoft Prompt Shields 문서](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 서비스](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 보안](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 토큰 관리 모범 사례](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 고급 보안](https://github.com/security/advanced-security)

### **구현 가이드 및 튜토리얼**
- [Azure API Management를 이용한 MCP 인증 게이트웨이](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID와 MCP 서버 인증](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [보안 토큰 저장 및 암호화 (영상)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 및 공급망 보안**
- [Azure DevOps 보안](https://azure.microsoft.com/products/devops)
- [Azure Repos 보안](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft 공급망 보안 여정](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **추가 보안 문서**

포괄적 보안 지침은 이 섹션의 전문 문서를 참조하십시오:

- **[MCP 보안 모범 사례 2025](./mcp-security-best-practices-2025.md)** - MCP 구현을 위한 완전한 보안 모범 사례
- **[Azure Content Safety 구현](./azure-content-safety-implementation.md)** - Azure Content Safety 통합을 위한 실용 구현 예제  
- **[MCP 보안 통제 2025](./mcp-security-controls-2025.md)** - MCP 배포를 위한 최신 보안 통제 및 기법
- **[MCP 모범 사례 빠른 참조](./mcp-best-practices.md)** - 필수 MCP 보안 관행 빠른 참조 가이드
- **[BlueHat 2026: AI의 미래 보안: 다층 방어 패턴으로 MCP 보호](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Microsoft Security Response Center (MSRC)의 다층 방어 패턴

### **실습 보안 교육**

- **[MCP 보안 서밋 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/)** - Base Camp부터 Summit까지 단계별 진도를 제공하는 Azure에서 MCP 서버 보안을 위한 포괄적 실습 워크숍
- **[OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/)** - 모든 OWASP MCP Top 10 위험에 대한 참조 아키텍처 및 구현 지침

---

## 다음 단계

다음: [3장: 시작하기](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->