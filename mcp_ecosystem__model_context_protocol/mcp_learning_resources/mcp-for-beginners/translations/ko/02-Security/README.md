# MCP 보안: AI 시스템을 위한 종합 보호

[![MCP Security Best Practices](../../../translated_images/ko/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(위 이미지를 클릭하면 이 수업의 동영상을 볼 수 있습니다)_

보안은 AI 시스템 설계의 기본이므로 두 번째 섹션으로 우선순위를 둡니다. 이는 Microsoft의 [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)에 명시된 **Secure by Design** 원칙과 일치합니다.

모델 컨텍스트 프로토콜(MCP)은 AI 기반 애플리케이션에 강력한 기능을 제공하는 동시에 전통적인 소프트웨어 위험을 넘어선 독특한 보안 문제를 제기합니다. MCP 시스템은 검증된 보안 문제(안전한 코딩, 최소 권한, 공급망 보안)뿐만 아니라 프롬프트 주입, 도구 오염, 세션 탈취, 혼동된 대리인 공격, 토큰 전달 취약성, 동적 권한 수정 같은 AI 특유 위협에도 직면합니다.

이 수업에서는 MCP 구현에서 가장 중요한 보안 위험들을 탐구합니다—인증, 권한 부여, 과도한 권한, 간접 프롬프트 주입, 세션 보안, 혼동된 대리인 문제, 토큰 관리, 공급망 취약성을 다룹니다. 또한 Microsoft의 Prompt Shields, Azure Content Safety, GitHub Advanced Security와 같은 솔루션을 활용하여 MCP 배포를 강화하는 실행 가능한 제어 및 모범 사례를 배웁니다.

## 학습 목표

이 수업을 마치면 다음을 수행할 수 있습니다:

- **MCP 특유 위협 식별**: 프롬프트 주입, 도구 오염, 과도한 권한, 세션 탈취, 혼동된 대리인 문제, 토큰 전달 취약성, 공급망 위험 등 MCP 시스템 고유 보안 위험을 인식
- **보안 제어 적용**: 강력한 인증, 최소 권한 접근, 안전한 토큰 관리, 세션 보안 제어, 공급망 검증 등 효과적인 완화책 구현
- **Microsoft 보안 솔루션 활용**: MCP 작업 부하 보호를 위한 Microsoft Prompt Shields, Azure Content Safety, GitHub Advanced Security 이해 및 배포
- **도구 보안 검증**: 도구 메타데이터 검증 중요성 인식, 동적 변경 모니터링, 간접 프롬프트 주입 공격 방어
- **모범 사례 통합**: 검증된 보안 기본 원칙(안전한 코딩, 서버 강화, 제로 트러스트)과 MCP 특화 제어를 결합한 종합 보호 구현

# MCP 보안 아키텍처 및 제어

최신 MCP 구현은 전통적인 소프트웨어 보안과 AI 특화 위협을 모두 해결하는 다층 보안 접근법을 필요로 합니다. 빠르게 진화하는 MCP 명세는 보안 제어를 지속적으로 성숙시켜 기업 보안 아키텍처와 검증된 모범 사례와의 통합을 개선합니다.

[Microsoft Digital Defense Report](https://aka.ms/mddr)의 연구에 따르면 **보고된 침해 사고의 98%는 강력한 보안 위생으로 예방 가능합니다**. 가장 효과적인 보호 전략은 기본 보안 관행과 MCP 특유 제어를 결합하는 것으로, 검증된 기본 보안 조치가 전반적인 위험 감소에 가장 큰 영향을 미칩니다.

## 현재 보안 환경

> **참고:** 이 정보는 **2026년 2월 5일** 기준 MCP 보안 표준을 반영하며, **MCP Specification 2025-11-25**와 일치합니다. MCP 프로토콜은 빠르게 진화하고 있으며, 향후 구현에서는 새로운 인증 패턴과 강화된 제어가 도입될 수 있습니다. 항상 최신 지침은 [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub 저장소](https://github.com/modelcontextprotocol), [보안 모범 사례 문서](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)를 참조하세요.

## 🏔️ MCP 보안 정상 회의 워크숍 (Sherpa)

**실무형 보안 교육**을 위해서는 Microsoft Azure에서 MCP 서버 보안을 위한 포괄적 경로를 제공하는 **MCP Security Summit Workshop** (Sherpa)를 강력히 권장합니다.

### 워크숍 개요

[MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/)은 입증된 "취약점 → 공격 → 수정 → 검증" 방법론을 통해 실용적이고 실행 가능한 보안 훈련을 제공합니다. 교육에서는 다음을 경험합니다:

- **문제 해결 학습**: 고의로 취약한 서버를 공격하여 취약점 직접 경험
- **Azure 네이티브 보안 활용**: Azure Entra ID, Key Vault, API Management, AI Content Safety 활용
- **방어 심층 전략 적용**: 캠프별 단계적 보안 계층 구축
- **OWASP 표준 따르기**: 모든 기법은 [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)에 매핑
- **프로덕션 코드 획득**: 테스트된 실무 구현 코드 제공

### 탐험 경로

| 캠프 | 집중 내용 | 다루는 OWASP 위험 |
|------|----------|-------------------|
| **Base Camp** | MCP 기본 원리 및 인증 취약점 | MCP01, MCP07 |
| **Camp 1: Identity** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2: Gateway** | API Management, Private Endpoints, 거버넌스 | MCP02, MCP07, MCP09 |
| **Camp 3: I/O Security** | 프롬프트 주입, PII 보호, 콘텐츠 안전 | MCP03, MCP05, MCP06 |
| **Camp 4: Monitoring** | 로그 분석, 대시보드, 위협 탐지 | MCP08 |
| **정상 회의** | 레드 팀 / 블루 팀 통합 테스트 | 전체 |

**시작하기**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 보안 위험

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)는 MCP 구현에서 가장 중요한 10가지 보안 위험을 상세히 다룹니다:

| 위험 | 설명 | Azure 완화책 |
|------|---------|--------------|
| **MCP01** | 토큰 관리 오류 및 비밀 노출 | Azure Key Vault, Managed Identity |
| **MCP02** | 권한 상승(스코프 확대) | RBAC, Conditional Access |
| **MCP03** | 도구 오염 | 도구 검증, 무결성 확인 |
| **MCP04** | 공급망 공격 | GitHub Advanced Security, 종속성 스캔 |
| **MCP05** | 명령 주입 및 실행 | 입력 검증, 샌드박싱 |
| **MCP06** | 컨텍스트 기반 프롬프트 주입 | Azure AI Content Safety, Prompt Shields |
| **MCP07** | 미흡한 인증 및 권한 부여 | Azure Entra ID, PKCE 포함 OAuth 2.1 |
| **MCP08** | 감사 및 원격 측정 부족 | Azure Monitor, Application Insights |
| **MCP09** | 섀도우 MCP 서버 | API 센터 거버넌스, 네트워크 분리 |
| **MCP10** | 컨텍스트 주입 및 과다 노출 | 데이터 분류, 최소 노출 |

### MCP 인증 진화

MCP 명세는 인증 및 권한 부여 접근법에서 상당한 진화를 겪었습니다:

- **초기 접근 방식**: 초기 명세는 개발자가 커스텀 인증 서버를 구현하도록 요구했으며, MCP 서버는 사용자 인증을 직접 관리하는 OAuth 2.0 권한 서버 역할 수행
- **현재 표준 (2025-11-25)**: 업데이트된 명세는 MCP 서버가 외부 ID 공급자(예: Microsoft Entra ID)에게 인증을 위임할 수 있도록 허용하여 보안 자세를 개선하고 구현 복잡성 감소
- **전송 계층 보안**: 로컬(STDIO) 및 원격(Streamable HTTP) 연결 모두에 적합한 인증 패턴과 함께 강화된 보안 전송 메커니즘 지원

## 인증 및 권한 부여 보안

### 현재 보안 문제

현대 MCP 구현은 다음과 같은 인증 및 권한 부여 문제에 직면해 있습니다:

### 위험 및 위협 벡터

- **잘못된 권한 부여 논리**: MCP 서버의 올바르지 않은 권한 부여 구현은 민감 데이터 노출이나 잘못된 접근 통제 적용 가능성
- **OAuth 토큰 탈취**: 로컬 MCP 서버 토큰 도난 시 공격자가 서버를 가장해 하위 서비스에 접근 가능
- **토큰 전달 취약점**: 부적절한 토큰 처리로 보안 제어 우회 및 책임 추적 어려움 발생
- **과도한 권한**: 과도 권한 부여된 MCP 서버는 최소 권한 원칙 위반 및 공격 범위 확장

#### 토큰 전달: 심각한 안티 패턴

현재 MCP 권한 부여 명세에서는 **토큰 전달이 명백히 금지**되어 있습니다. 이는 심각한 보안 문제를 야기하기 때문입니다:

##### 보안 제어 우회  
- MCP 서버와 하위 API들은 적절한 토큰 검증에 의존하는 중요한 보안 제어(속도 제한, 요청 검증, 트래픽 모니터링)를 구현
- 클라이언트가 직접 API 토큰을 사용하는 것은 이 핵심 보호장치를 우회, 보안 구조를 훼손

##### 책임 추적 및 감사 문제  
- MCP 서버는 상류에서 발행된 토큰을 사용하는 클라이언트를 구분할 수 없어 감사 추적 흐름 파괴
- 하위 리소스 서버 로그는 실제 MCP 서버 중계자 대신 잘못된 요청 출처 표시
- 사고 조사 및 규정 준수 감사가 매우 어려워짐

##### 데이터 유출 위험  
- 검증되지 않은 토큰 청구는 토큰 탈취자가 MCP 서버를 통해 데이터를 빼돌리는 프록시로 악용 가능
- 신뢰 경계 위반으로 의도된 보안 제어를 우회하는 무단 접근 패턴 허용

##### 다중 서비스 공격 벡터  
- 여러 서비스가 동일한 토큰을 신뢰하면 가로 움직임이 가능
- 토큰 출처 확인 불가능 시 서비스 간 신뢰 가정 위배 가능

### 보안 제어 및 완화책

**중요 보안 요구 사항:**

> **의무 사항**: MCP 서버는 명시적으로 MCP 서버를 위해 발행된 토큰만 허용해야 합니다

#### 인증 및 권한 부여 제어

- **엄격한 권한 부여 검토**: MCP 서버 권한 로직을 철저히 점검해 민감 자원에 대해 의도된 사용자와 클라이언트만 접근 가능하도록 보장
  - **구현 가이드**: [Azure API Management를 MCP 서버 인증 게이트웨이로 사용](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **ID 통합**: [Microsoft Entra ID를 MCP 서버 인증에 사용하기](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **안전한 토큰 관리**: [Microsoft 토큰 검증 및 수명주기 모범 사례](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) 적용
  - 토큰 대상 청구가 MCP 서버 ID와 일치하는지 확인
  - 적절한 토큰 갱신 및 만료 정책 구현
  - 재사용 공격 및 무단 사용 방지

- **보호된 토큰 저장**: 암호화를 통해 안전한 저장(휴지 및 전송 중 모두)
  - **모범 사례**: [토큰 저장 및 암호화 가이드라인](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### 접근 제어 구현

- **최소 권한 원칙**: MCP 서버에 기능에 필요한 최소 권한만 부여
  - 정기적 권한 검토 및 권한 상승 방지
  - **Microsoft 문서**: [안전한 최소 권한 접근](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **역할 기반 접근 제어(RBAC)**: 세밀한 역할 할당 구현
  - 역할을 특정 자원 및 작업에 엄격히 제한
  - 공격 범위를 확대하는 과도하거나 불필요한 권한 부여 금지

- **지속적 권한 모니터링**: 접근 감사 및 모니터링 활성화
  - 비정상 권한 사용 패턴 감시
  - 과도하거나 미사용 권한 신속 보완

## AI 특화 보안 위협

### 프롬프트 주입 및 도구 조작 공격

최신 MCP 구현은 전통 보안 조치로는 완전히 방어 못 하는 정교한 AI 특유 공격 벡터에 직면해 있습니다:

#### **간접 프롬프트 주입 (크로스 도메인 프롬프트 주입)**

**간접 프롬프트 주입**은 MCP 기반 AI 시스템에서 가장 심각한 취약점 중 하나입니다. 공격자는 문서, 웹 페이지, 이메일, 데이터 소스 등 외부 콘텐츠에 악성 명령을 숨기고 AI 시스템이 이를 합법 명령으로 처리하도록 유도합니다.

**공격 시나리오:**
- **문서 기반 주입**: 처리되는 문서에 숨겨진 악성 명령이 의도치 않은 AI 동작 유발
- **웹 콘텐츠 악용**: 스크래핑 시 AI 행동을 조작하는 프롬프트가 포함된 손상된 웹 페이지
- **이메일 공격**: AI 보조 시스템이 정보 유출 또는 무단 작업 실행하도록 유도하는 악성 이메일 프롬프트
- **데이터 소스 오염**: 데이터베이스나 API가 조작된 내용을 AI에 제공

**실제 영향**: 데이터 유출, 개인정보 침해, 유해 콘텐츠 생성, 사용자 상호작용 조작 등으로 이어질 수 있습니다. 자세한 분석은 [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/) 참고하십시오.

![Prompt Injection Attack Diagram](../../../translated_images/ko/prompt-injection.ed9fbfde297ca877.webp)

#### **도구 오염 공격**

**도구 오염**은 MCP 도구를 정의하는 메타데이터를 타겟으로 하며, LLM이 도구 설명과 매개변수를 해석해 실행 결정을 내리는 방식을 악용합니다.

**공격 메커니즘:**
- **메타데이터 조작**: 공격자가 도구 설명, 매개변수 정의, 사용 예시 등에 악성 명령 삽입
- **숨겨진 명령어**: 인간 사용자에게는 보이지 않지만 AI 모델이 처리하는 은밀한 프롬프트
- **동적 도구 변경("러그 풀")**: 사용자가 승인한 도구가 이후 악성 작업 수행하도록 몰래 변경
- **매개변수 삽입**: 도구 매개변수 스키마에 악성 콘텐츠 포함, 모델 행동에 영향

**호스팅 서버 위험**: 원격 MCP 서버는 도구 정의를 초기 승인 후에도 업데이트할 수 있어, 이전에 안전했던 도구가 악성으로 변할 위험 존재. 자세한 분석은 [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) 참고하십시오.

![Tool Injection Attack Diagram](../../../translated_images/ko/tool-injection.3b0b4a6b24de6bef.webp)

#### **추가 AI 공격 벡터**

- **크로스 도메인 프롬프트 주입 (XPIA)**: 여러 도메인 콘텐츠를 활용해 보안 제어를 우회하는 정교한 공격
- **동적 기능 수정**: 초기 보안 평가를 통과하는 도구 기능에 대한 실시간 변경  
- **컨텍스트 윈도우 변조 공격**: 악의적인 명령을 숨기기 위해 큰 컨텍스트 윈도우를 조작하는 공격  
- **모델 혼란 공격**: 모델의 한계를 이용해 예측 불가능하거나 안전하지 않은 동작을 유발하는 공격  


### AI 보안 위험 영향

**높은 영향의 결과:**  
- **데이터 유출**: 권한 없는 민감한 기업 또는 개인 데이터 접근 및 도난  
- **개인정보 침해**: 개인 식별 정보(PII) 및 기밀 사업 데이터 노출  
- **시스템 조작**: 중요 시스템 및 워크플로의 의도치 않은 수정  
- **인증 정보 도난**: 인증 토큰 및 서비스 자격 증명 손상  
- **측면 이동 공격**: 손상된 AI 시스템을 넓은 네트워크 공격을 위한 교차 지점으로 사용  

### Microsoft AI 보안 솔루션

#### **AI 프롬프트 쉴드: 주입 공격에 대한 고급 방어**

Microsoft **AI 프롬프트 쉴드**는 직접적 및 간접적 프롬프트 주입 공격에 대해 다중 보안 계층을 통한 포괄적인 방어를 제공합니다:

##### **핵심 보호 메커니즘:**

1. **고급 탐지 및 필터링**  
   - 머신 러닝 알고리즘과 자연어 처리 기술로 외부 컨텐츠 내 악의적 명령 탐지  
   - 문서, 웹 페이지, 이메일, 데이터 소스에서 내장 위협을 실시간 분석  
   - 정상적 프롬프트 패턴과 악의적 패턴의 맥락적 이해  

2. **스포트라이팅 기법**  
   - 신뢰된 시스템 명령과 잠재적으로 손상된 외부 입력 구분  
   - 모델 적합도를 높이면서 악성 컨텐츠를 분리하는 텍스트 변환 방법  
   - AI 시스템이 명령 계층을 올바르게 유지하고 주입된 명령 무시 지원  

3. **구분자 및 데이터마킹 시스템**  
   - 신뢰된 시스템 메시지와 외부 입력 텍스트 간 명확한 경계 정의  
   - 신뢰된 소스와 신뢰되지 않은 데이터 소스 간 경계를 강조하는 특수 마커  
   - 명령 혼동과 무단 명령 실행 방지 위한 명확한 분리  

4. **지속적인 위협 인텔리전스**  
   - Microsoft는 지속적으로 새로운 공격 패턴을 모니터링하고 방어책을 업데이트  
   - 새로운 주입 기법 및 공격 벡터에 대한 선제적 위협 탐색  
   - 진화하는 위협에 대응하는 보안 모델 정기 업데이트  

5. **Azure 콘텐츠 안전 통합**  
   - 종합 Azure AI 콘텐츠 안전 제품군의 일부  
   - 탈옥 시도, 유해 콘텐츠 및 보안 정책 위반에 대한 추가 탐지  
   - AI 애플리케이션 구성요소 전반에 걸친 통합 보안 제어  

**구현 리소스**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ko/prompt-shield.ff5b95be76e9c78c.webp)


## 고급 MCP 보안 위협

### 세션 하이재킹 취약점

**세션 하이재킹**은 상태 정보를 가진 MCP 구현에서 중요한 공격 벡터로, 권한 없는 사용자가 정당한 세션 식별자를 획득해 클라이언트를 가장하고 무단 행동을 수행하는 행위입니다.

#### **공격 시나리오 및 위험**

- **세션 하이재킹 프롬프트 주입**: 도난당한 세션 ID로 세션 상태를 공유하는 서버에 악의적인 이벤트를 주입해 유해 동작 유발 또는 민감 데이터 접근  
- **직접 가장 공격**: 도난된 세션 ID로 인증 우회 MCP 서버 호출이 가능해 공격자를 정당 사용자로 처리  
- **손상된 재개 가능 스트림**: 공격자가 요청을 조기 종료하여 정상 클라이언트가 악성 컨텐츠로 재개하게 만듦  

#### **세션 관리 보안 제어**

**중요 요구사항:**  
- **권한 확인**: 권한 확인을 구현하는 MCP 서버는 모든 수신 요청을 검증해야 하며, 세션에 의존해 인증해서는 안 됨  
- **보안 세션 생성**: 암호학적으로 안전한 랜덤 번호 생성기로 비결정론적 세션 ID 생성  
- **사용자별 바인딩**: 교차 사용자 세션 오용 방지를 위해 `<user_id>:<session_id>` 같은 포맷으로 사용자별로 세션 ID 바인딩  
- **세션 수명 주기 관리**: 적절한 만료, 갱신, 무효화로 취약점 노출 시간 제한  
- **전송 보안**: 세션 ID 탈취 방지를 위한 모든 통신 HTTPS 필수  

### 혼란된 대리인 문제

**혼란된 대리인 문제**는 MCP 서버가 클라이언트와 제3자 서비스 사이 인증 프록시 역할을 할 때 발생하며, 정적 클라이언트 ID 악용을 통한 권한 우회 기회를 만듭니다.

#### **공격 메커니즘 및 위험**

- **쿠키 기반 동의 우회**: 이전 사용자 인증이 생성한 동의 쿠키를 공격자가 악성 권한 요청과 조작된 리디렉션 URI로 악용  
- **권한 코드 도난**: 기존 동의 쿠키로 인해 권한 서버가 동의 화면을 건너뛰고 공격자 제어 엔드포인트로 코드 리디렉션  
- **무단 API 접근**: 도난된 권한 코드로 토큰 교환 및 사용자 가장 가능, 명시적 승인 없이 수행  

#### **완화 전략**

**필수 제어:**  
- **명시적 동의 요구**: 정적 클라이언트 ID를 사용하는 MCP 프록시 서버는 동적으로 등록된 각 클라이언트에 대해 사용자 동의 확보 필수  
- **OAuth 2.1 보안 구현**: 모든 권한 요청에 대해 PKCE(Proof Key for Code Exchange)를 포함한 최신 OAuth 보안 모범 사례 준수  
- **엄격한 클라이언트 검증**: 리디렉션 URI 및 클라이언트 ID에 대한 엄밀한 검증으로 악용 방지  

### 토큰 전달 취약점

**토큰 전달**은 MCP 서버가 클라이언트 토큰을 적절한 검증 없이 수락하고 하위 API에 전달하는 명백한 반패턴으로, MCP 권한 사양을 위반합니다.

#### **보안 영향**

- **통제 회피**: 클라이언트에서 API로 직접 토큰 사용 시 핵심 속도 제한, 검증, 모니터링 우회  
- **감사 추적 무결성 훼손**: 상위 발급 토큰 때문에 클라이언트 식별 불가능, 사고 조사 불가  
- **프록시 데이터 유출**: 검증되지 않은 토큰으로 악성 행위자가 서버를 불법 데이터 접근 프록시로 사용  
- **신뢰 경계 위반**: 토큰 출처 확인 불가 시 하위 서비스 신뢰 가정 붕괴  
- **다중 서비스 공격 확산**: 여러 서비스에서 수락된 손상된 토큰으로 측면 이동 가능  

#### **필수 보안 제어**

**비협상 요구사항:**  
- **토큰 검증**: MCP 서버는 MCP 서버 대상이 아닌 토큰을 절대 수락하지 말아야 함  
- **대상 검증**: 토큰의 audience 클레임이 MCP 서버 신원과 일치하는지 항상 확인  
- **적절한 토큰 수명 관리**: 짧은 수명의 액세스 토큰과 안전한 갱신 관행 구현  


## AI 시스템 공급망 보안

공급망 보안은 전통적인 소프트웨어 종속성을 넘어 AI 생태계 전체를 포괄합니다. 최신 MCP 구현은 AI 관련 모든 구성요소를 엄격히 검증 및 모니터링해야 하며, 각 요소는 시스템 무결성을 손상시킬 잠재적 취약점을 내포합니다.

### 확대된 AI 공급망 구성요소

**전통적 소프트웨어 종속성:**  
- 오픈소스 라이브러리 및 프레임워크  
- 컨테이너 이미지 및 베이스 시스템  
- 개발 도구 및 빌드 파이프라인  
- 인프라 구성요소 및 서비스  

**AI 전용 공급망 요소:**  
- **기초 모델**: 여러 공급자의 사전 학습 모델로 출처 검증 필요  
- **임베딩 서비스**: 외부 벡터화 및 의미 기반 검색 서비스  
- **컨텍스트 제공자**: 데이터 소스, 지식 베이스, 문서 저장소  
- **서드파티 API**: 외부 AI 서비스, ML 파이프라인, 데이터 처리 엔드포인트  
- **모델 아티팩트**: 가중치, 구성, 세밀 튜닝 모델 변형  
- **학습 데이터 소스**: 모델 훈련 및 세밀 조정에 사용되는 데이터셋  

### 포괄적인 공급망 보안 전략

#### **구성요소 검증 및 신뢰**  
- **출처 검증**: AI 구성요소 통합 전 출처, 라이선스, 무결성 확인  
- **보안 평가**: 모델, 데이터 소스, AI 서비스 취약점 스캔 및 보안 리뷰  
- **평판 분석**: AI 서비스 공급자 보안 이력 및 관행 평가  
- **준수 검증**: 모든 구성요소가 조직 보안 및 규제 기준 충족 확인  

#### **안전한 배포 파이프라인**  
- **자동화 CI/CD 보안**: 자동 배포 파이프라인 전반에 보안 스캔 통합  
- **아티팩트 무결성**: 모든 배포 아티팩트(코드, 모델, 구성)에 대한 암호화 검증  
- **점진적 배포**: 각 단계에서 보안 검증을 수행하는 단계별 배포 전략 사용  
- **신뢰 가능한 아티팩트 저장소**: 검증된 안전 저장소 및 레지스트리에서만 배포  

#### **지속적 모니터링 및 대응**  
- **종속성 스캔**: 모든 소프트웨어 및 AI 구성요소 종속성에 대한 취약점 지속 모니터링  
- **모델 모니터링**: 모델 동작, 성능 변동, 보안 이상 지속 평가  
- **서비스 상태 추적**: 외부 AI 서비스의 가용성, 보안 사고 및 정책 변경 모니터링  
- **위협 인텔리전스 통합**: AI 및 ML 보안 위험 관련 위협 피드 통합  

#### **접근 제어 및 최소 권한 원칙**  
- **구성요소별 권한 제한**: 비즈니스 필요에 따른 모델, 데이터, 서비스 접근 제한  
- **서비스 계정 관리**: 최소 권한이 할당된 전용 서비스 계정 운영  
- **네트워크 분할**: AI 구성요소 격리 및 서비스 간 네트워크 접근 제한  
- **API 게이트웨이 제어**: 중앙 집중식 API 게이트웨이로 외부 AI 서비스 접근 통제 및 모니터링  

#### **사건 대응 및 복구**  
- **신속 대응 절차**: 손상된 AI 구성요소 패치 또는 교체를 위한 수립된 프로세스  
- **자격 증명 갱신**: 비밀, API 키, 서비스 자격증명 자동 갱신 시스템  
- **롤백 기능**: 알려진 정상 버전으로 신속 복귀 기능  
- **공급망 침해 복구**: 상류 AI 서비스 손상에 대응하는 구체적 절차  

### Microsoft 보안 도구 및 통합

**GitHub Advanced Security**는 다음과 같은 포괄적 공급망 보호 기능 제공:  
- **비밀 스캐닝**: 저장소 내 자격 증명, API 키, 토큰 자동 탐지  
- **종속성 스캐닝**: 오픈소스 종속성 및 라이브러리 취약점 평가  
- **CodeQL 분석**: 보안 취약점 및 코드 문제에 대한 정적 코드 분석  
- **공급망 인사이트**: 종속성 건강 상태 및 보안 현황 가시성  

**Azure DevOps 및 Azure Repos 통합:**  
- Microsoft 개발 플랫폼 전반에 걸친 원활한 보안 스캔 통합  
- AI 워크로드용 Azure Pipelines 내 자동 보안 검사  
- 안전한 AI 구성요소 배포를 위한 정책 시행  

**Microsoft 내부 관행:**  
Microsoft는 모든 제품에서 광범위한 공급망 보안 관행을 구현하고 있습니다. 자세한 내용은 [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)에서 확인하세요.


## 기초 보안 모범 사례

MCP 구현은 조직의 기존 보안 태세를 상속 및 확장합니다. 기초 보안 관행을 강화하면 AI 시스템 및 MCP 배포의 전반적 보안을 크게 향상할 수 있습니다.

### 핵심 보안 기본 원칙

#### **안전한 개발 관행**  
- **OWASP 준수**: [OWASP Top 10](https://owasp.org/www-project-top-ten/) 웹 애플리케이션 취약점 대비  
- **AI 특화 보호**: [OWASP LLMs Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)에 대한 제어 적용  
- **안전한 비밀 관리**: 토큰, API 키, 민감 구성 데이터 전용 금고 사용  
- **종단 간 암호화**: 모든 애플리케이션 구성요소와 데이터 흐름에 안전한 통신 구현  
- **입력 검증**: 모든 사용자 입력, API 파라미터, 데이터 소스에 대한 엄격한 검증  

#### **인프라 구조 강화**  
- **다중 요소 인증**: 모든 관리자 및 서비스 계정에 MFA 필수  
- **패치 관리**: 운영체제, 프레임워크, 종속성에 대한 자동화된 적시 패치  
- **ID 공급자 통합**: 기업 ID 공급자(예: Microsoft Entra ID, Active Directory)를 통한 중앙 집중식 ID 관리  
- **네트워크 분리**: MCP 구성요소의 논리적 분리로 측면 이동 가능성 제한  
- **최소 권한 원칙**: 모든 시스템 구성요소와 계정에 최소 요구 권한 적용  

#### **보안 모니터링 및 탐지**  
- **포괄적 로깅**: AI 애플리케이션 활동 및 MCP 클라이언트-서버 상호작용 상세 기록  
- **SIEM 통합**: 이상 탐지를 위한 중앙집중식 보안 정보 및 이벤트 관리  
- **행동 분석**: 시스템 및 사용자 행동의 비정상 패턴을 탐지하는 AI 기반 모니터링  
- **위협 인텔리전스**: 외부 위협 피드 및 침해 지표(IOC) 통합  
- **사건 대응**: 보안 사고 탐지, 대응, 복구를 위한 명확한 절차  

#### **제로 트러스트 아키텍처**  
- **절대 신뢰 금지, 항상 검증**: 사용자, 디바이스, 네트워크 연결 지속 검증  
- **마이크로 세분화**: 개별 워크로드 및 서비스 격리를 위한 세분화된 네트워크 제어  
- **ID 중심 보안**: 네트워크 위치보다 검증된 ID 기반 보안 정책  
- **지속적 위험 평가**: 현재 맥락과 행동을 기반으로 한 동적 보안 태세 평가  
- **조건부 접근**: 위험 요소, 위치, 디바이스 신뢰도에 따라 적응하는 접근 제어  

### 엔터프라이즈 통합 패턴

#### **Microsoft 보안 생태계 통합**  
- **Microsoft Defender for Cloud**: 포괄적 클라우드 보안 태세 관리  
- **Azure Sentinel**: AI 워크로드 보호를 위한 클라우드 네이티브 SIEM 및 SOAR 기능  
- **Microsoft Entra ID**: 조건부 접근 정책을 갖춘 엔터프라이즈 ID 및 접근 관리  
- **Azure Key Vault**: 하드웨어 보안 모듈(HSM) 지원 중앙 비밀 관리  
- **Microsoft Purview**: AI 데이터 소스 및 워크플로에 대한 데이터 거버넌스 및 규정 준수  

#### **준수 및 거버넌스**  
- **규제 준수 맞춤화**: MCP 구현이 GDPR, HIPAA, SOC 2 등 산업별 규제 요건 충족 보장  
- **데이터 분류**: AI 시스템이 처리하는 민감 데이터 적절 분류 및 관리  
- **감사 추적**: 규제 준수 및 포렌식 조사를 위한 포괄적 로그 기록  
- **개인정보 보호 제어**: AI 시스템 아키텍처에 개인정보 보호 설계 원칙 도입  
- **변경 관리**: AI 시스템 변경에 대한 보안 검토를 위한 공식 프로세스  

이러한 기초 관행은 MCP 특화 보안 제어의 효율성을 높이고 AI 기반 애플리케이션에 대한 포괄적 보호 기반을 마련합니다.
## 주요 보안 시사점

- **계층화된 보안 접근법**: 기본적인 보안 관행(안전한 코딩, 최소 권한, 공급망 검증, 지속적 모니터링)과 AI 특정 제어를 결합하여 포괄적인 보호 제공

- **AI 특유의 위협 환경**: MCP 시스템은 프롬프트 인젝션, 도구 중독, 세션 탈취, 혼란스러운 대리 문제, 토큰 전달 취약점, 과도한 권한 등 특수한 위험에 직면하며 이를 위해 전문적인 완화책 필요

- **인증 및 권한 부여의 탁월성**: 외부 ID 공급자(Microsoft Entra ID)를 사용한 강력한 인증 구현, 적절한 토큰 검증 적용, MCP 서버용으로 명시적으로 발급되지 않은 토큰은 절대 수락하지 않음

- **AI 공격 방지**: Microsoft Prompt Shields 및 Azure Content Safety를 배포하여 간접적인 프롬프트 인젝션과 도구 중독 공격 방어, 도구 메타데이터 검증 및 동적 변경 모니터링 수행

- **세션 및 전송 보안**: 사용자 신원에 바인딩된 암호학적으로 안전하고 비결정적인 세션 ID 사용, 적절한 세션 수명 주기 관리 구현, 인증에 세션 사용 금지

- **OAuth 보안 모범 사례**: 동적 등록 클라이언트에 대해 명시적인 사용자 동의를 통해 혼란스러운 대리 공격 방지, PKCE가 포함된 적절한 OAuth 2.1 구현, 엄격한 리디렉션 URI 검증 실시

- **토큰 보안 원칙**: 토큰 전달 반패턴 회피, 토큰 수신자 클레임 철저 검증, 짧은 수명 토큰과 보안 회전 구현, 명확한 신뢰 경계 유지

- **포괄적 공급망 보안**: 모델, 임베딩, 컨텍스트 제공자, 외부 API 등 모든 AI 생태계 구성요소를 전통적인 소프트웨어 의존성과 동일한 보안 수준으로 취급

- **지속적 진화**: 급변하는 MCP 명세에 최신 상태 유지, 보안 커뮤니티 표준에 기여, 프로토콜 성숙에 따른 적응형 보안 자세 유지

- **마이크로소프트 보안 통합**: Microsoft의 포괄적 보안 생태계(Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID)를 활용하여 MCP 배포 보호 강화

## 포괄적 자료

### **공식 MCP 보안 문서**
- [MCP 명세 (현재: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP 보안 모범 사례](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP 권한 부여 명세](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub 저장소](https://github.com/modelcontextprotocol)

### **OWASP MCP 보안 자료**
- [OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/) - Azure 구현 가이드가 포함된 포괄적 OWASP MCP Top 10
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 공식 OWASP MCP 보안 위험
- [MCP 보안 서밋 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure에서 MCP를 위한 실습 보안 교육

### **보안 표준 및 모범 사례**
- [OAuth 2.0 보안 모범 사례 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 웹 애플리케이션 보안 Top 10](https://owasp.org/www-project-top-ten/)
- [대형 언어 모델용 OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft 디지털 방어 보고서](https://aka.ms/mddr)

### **AI 보안 연구 및 분석**
- [MCP의 프롬프트 인젝션 (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [도구 중독 공격 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP 보안 연구 브리핑 (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **마이크로소프트 보안 솔루션**
- [Microsoft Prompt Shields 문서](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety 서비스](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID 보안](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure 토큰 관리 모범 사례](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub 고급 보안](https://github.com/security/advanced-security)

### **구현 가이드 및 튜토리얼**
- [Azure API Management를 MCP 인증 게이트웨이로 사용](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [MCP 서버와 Microsoft Entra ID 인증](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [안전한 토큰 저장 및 암호화 (비디오)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps 및 공급망 보안**
- [Azure DevOps 보안](https://azure.microsoft.com/products/devops)
- [Azure Repos 보안](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft 공급망 보안 여정](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **추가 보안 문서**

포괄적 보안 지침은 본 섹션의 전문 문서를 참조하십시오:

- **[MCP 보안 모범 사례 2025](./mcp-security-best-practices-2025.md)** - MCP 구현을 위한 완벽한 보안 모범 사례
- **[Azure Content Safety 구현](./azure-content-safety-implementation.md)** - Azure Content Safety 통합에 대한 실전 구현 예제
- **[MCP 보안 제어 2025](./mcp-security-controls-2025.md)** - MCP 배포를 위한 최신 보안 제어 및 기법
- **[MCP 모범 사례 빠른 참조](./mcp-best-practices.md)** - 필수 MCP 보안 관행에 대한 빠른 참조 가이드

### **실습 보안 교육**

- **[MCP 보안 서밋 워크숍 (Sherpa)](https://azure-samples.github.io/sherpa/)** - Base Camp부터 Summit까지 단계별 캠프를 포함한 Azure에서 MCP 서버 보안을 위한 포괄적 실습 워크숍
- **[OWASP MCP Azure 보안 가이드](https://microsoft.github.io/mcp-azure-security-guide/)** - 모든 OWASP MCP Top 10 위험에 대한 참조 아키텍처 및 구현 지침

---

## 다음 단계

다음: [3장: 시작하기](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 최선을 다하고 있지만, 자동 번역에는 오류나 부정확한 내용이 포함될 수 있음을 유의하시기 바랍니다. 원문 문서는 해당 언어의 권위 있는 출처로 간주되어야 합니다. 중요한 정보의 경우 전문적인 인간 번역을 권장합니다. 본 번역 사용으로 인해 발생하는 오해나 해석상의 문제에 대해서는 당사가 책임지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->