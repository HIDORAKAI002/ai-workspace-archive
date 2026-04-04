# MCP 보안 통제 - 2026년 2월 업데이트

> **현재 표준**: 이 문서는 [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) 보안 요구 사항과 공식 [MCP 보안 모범 사례](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)를 반영합니다.

Model Context Protocol (MCP)은 전통적인 소프트웨어 보안과 AI 특화 위협 모두를 다루는 강화된 보안 통제를 통해 크게 성숙해졌습니다. 이 문서는 OWASP MCP Top 10 프레임워크에 맞춰 안전한 MCP 구현을 위한 포괄적인 보안 통제를 제공합니다.

## 🏔️ 실습형 보안 교육

실무 중심의 보안 구현 경험을 위해, 우리는 **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** 를 추천합니다 - 취약점 → 공격 → 수정 → 검증 방식을 사용하는 Azure에서 MCP 서버 보안을 위한 종합 가이드 탐험입니다.

이 문서의 모든 보안 통제는 **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** 와 일치하며, OWASP MCP Top 10 위험에 대한 참조 아키텍처와 Azure 특화 구현 지침을 제공합니다.

## **필수 보안 요구사항**

### **MCP 명세의 중요 금지 사항:**

> **금지됨**: MCP 서버는 MCP 서버를 위해 명시적으로 발급되지 않은 토큰을 **받아들여서는 안 됩니다**
>
> **엄격 금지**: MCP 서버는 인증을 위해 세션을 사용해서는 안 됩니다  
>
> **필수**: 권한 부여를 구현하는 MCP 서버는 모든 수신 요청을 **검증해야 합니다**
>
> **의무**: 정적 클라이언트 ID를 사용하는 MCP 프록시 서버는 동적으로 등록된 각 클라이언트에 대해 사용자 동의를 **반드시** 받아야 합니다

---

## 1. **인증 및 권한 부여 통제**

### **외부 ID 공급자 통합**

**현재 MCP 표준(2025-11-25)**은 MCP 서버가 인증을 외부 ID 공급자에게 위임할 수 있도록 허용하여 중요한 보안 개선을 제공합니다:

**OWASP MCP 위험 주소**: [MCP07 - 불충분한 인증 및 권한 부여](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**보안 이점:**
1. **맞춤 인증 위험 제거**: 맞춤 인증 구현을 피하여 취약점 면적 축소
2. **기업급 보안**: Microsoft Entra ID와 같은 검증된 ID 공급자의 고급 보안 기능 활용
3. **중앙 집중식 신원 관리**: 사용자 수명 주기 관리, 접근 제어, 규정 준수 감사 간소화
4. **다중 인증(MFA)**: 기업용 ID 공급자의 MFA 기능 상속
5. **조건부 접근 정책**: 위험 기반 접근 통제 및 적응형 인증 활용

**구현 요구사항:**
- **토큰 수신자 검증**: 모든 토큰이 MCP 서버용으로 명시적으로 발급되었는지 확인
- **발행자 검증**: 토큰 발행자가 예상 ID 공급자와 일치하는지 확인
- **서명 검증**: 토큰 무결성의 암호학적 검증 수행
- **만료 적용**: 토큰 수명 제한을 엄격하게 적용
- **스코프 검증**: 토큰에 요청된 작업에 적절한 권한이 포함되었는지 확인

### **권한 부여 논리 보안**

**중요 통제:**
- **포괄적인 권한 감사**: 모든 권한 결정 지점에 대한 정기적 보안 검토
- **안전한 실패 기본값**: 권한 논리가 명확한 결정을 내리지 못할 때 접근 거부
- **권한 경계**: 다양한 권한 수준 및 리소스 접근 간 명확한 분리
- **감사 로깅**: 보안 모니터링을 위한 모든 권한 결정 완전 로깅
- **정기적 접근 검토**: 사용자 권한과 권한 할당 주기적 검증

## 2. **토큰 보안 및 패스스루 방지 통제**

**OWASP MCP 위험 주소**: [MCP01 - 토큰 관리 부실 및 비밀 노출](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **토큰 패스스루 방지**

토큰 패스스루는 심각한 보안 위험으로 인해 MCP 권한 부여 명세에서 명백히 금지됩니다:

**해결되는 보안 위험:**
- **통제 회피**: 속도 제한, 요청 검증, 트래픽 모니터링 등 필수 보안 통제 우회
- **책임성 붕괴**: 클라이언트 식별이 불가능해져 감사 추적 및 사고 조사 방해
- **프록시 기반 유출**: 악의적 행위자가 서버를 무단 데이터 접근을 위한 프록시로 사용 가능
- **트러스트 경계 위반**: 하위 서비스의 토큰 출처 신뢰 가정 붕괴
- **측면 이동**: 여러 서비스에 걸친 토큰 손상으로 공격 확산 용이

**구현 통제:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **안전한 토큰 관리 패턴**

**모범 사례:**
- **단기간 토큰**: 잦은 토큰 갱신으로 노출 시간 최소화
- **적기 발급**: 특정 작업 필요 시에만 토큰 발급
- **안전 저장소**: 하드웨어 보안 모듈(HSM) 또는 안전한 키 볼트 사용
- **토큰 바인딩**: 가능한 경우 특정 클라이언트, 세션 또는 작업에 토큰 바인딩
- **모니터링 및 알림**: 토큰 오용 및 무단 접근 실시간 탐지

## 3. **세션 보안 통제**

### **세션 하이재킹 방지**

**대응하는 공격 벡터:**
- **세션 하이재킹 프롬프트 주입**: 공유 세션 상태에 악의적 이벤트 주입
- **세션 사칭**: 도난된 세션 ID를 무단으로 사용하여 인증 우회
- **재개 가능한 스트림 공격**: 서버 전송 이벤트 재개 기능을 악용한 악성 콘텐츠 주입

**필수 세션 통제:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**전송 보안:**
- **HTTPS 강제 적용**: 모든 세션 통신을 TLS 1.3으로 암호화
- **안전한 쿠키 속성**: HttpOnly, Secure, SameSite=Strict 적용
- **인증서 고정**: MITM 공격 방지를 위한 중요 연결 고정

### **상태 저장 vs 상태 비저장 고려사항**

**상태 저장 구현 시:**
- 공유 세션 상태는 주입 공격으로부터 추가 보호 필요
- 큐 기반 세션 관리의 무결성 검증 필요
- 다중 서버 인스턴스 간 안전한 세션 상태 동기화 필요

**상태 비저장 구현 시:**
- JWT 또는 유사 토큰 기반 세션 관리
- 세션 상태 무결성의 암호학적 검증
- 공격 면적 감소하지만 강력한 토큰 검증 필요

## 4. **AI 특화 보안 통제**

**OWASP MCP 위험 주소**:
- [MCP06 - 컨텍스츄얼 페이로드를 통한 프롬프트 주입](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - 도구 중독](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - 명령어 주입 및 실행](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **프롬프트 주입 방어**

**Microsoft Prompt Shields 통합:**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**구현 통제:**
- **입력 정화**: 모든 사용자 입력에 대해 포괄적 검증 및 필터링
- **컨텐츠 경계 정의**: 시스템 명령과 사용자 콘텐츠 간 명확한 분리
- **명령 우선순위**: 상충하는 명령에 대한 적절한 우선순위 규칙
- **출력 모니터링**: 잠재적 해악성 또는 변조된 출력 탐지

### **도구 중독 방지**

**도구 보안 프레임워크:**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**동적 도구 관리:**
- **승인 워크플로우**: 도구 수정에 대한 명확한 사용자 동의
- **롤백 기능**: 이전 도구 버전으로 복원 가능
- **변경 감사**: 도구 정의 변경 이력 완전 기록
- **위험 평가**: 도구 보안 상태의 자동 평가

## 5. **혼란 대리인 공격 방지**

### **OAuth 프록시 보안**

**공격 방지 통제:**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**구현 요구사항:**
- **사용자 동의 검증**: 동적 클라이언트 등록 시 동의 화면 절대 생략 금지
- **리디렉션 URI 검증**: 화이트리스트 기반 엄격한 리디렉션 대상 검증
- **권한 코드 보호**: 단기간, 단일 사용 권한 코드 적용
- **클라이언트 신원 검증**: 클라이언트 자격 증명 및 메타데이터 강력 검증

## 6. **도구 실행 보안**

### **샌드박싱 및 격리**

**컨테이너 기반 격리:**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**프로세스 격리:**
- **별도 프로세스 컨텍스트**: 각 도구 실행을 격리된 프로세스 공간에서 수행
- **프로세스 간 통신(IPC)**: 검증된 안전한 IPC 메커니즘 사용
- **프로세스 모니터링**: 런타임 행동 분석 및 이상 탐지
- **자원 제한 적용**: CPU, 메모리, I/O에 대한 엄격한 한도 적용

### **최소 권한 구현**

**권한 관리:**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. **공급망 보안 통제**

**OWASP MCP 위험 주소**: [MCP04 - 공급망 공격](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **종속성 검증**

**포괄적 구성요소 보안:**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **지속적 모니터링**

**공급망 위협 탐지:**
- **종속성 상태 모니터링**: 모든 종속성에 대한 보안 문제 지속 평가
- **위협 인텔리전스 통합**: 신규 공급망 위협에 대한 실시간 업데이트
- **행동 분석**: 외부 구성요소 내 이상 행동 탐지
- **자동 대응**: 손상된 구성요소 즉각 차단

## 8. **모니터링 및 탐지 통제**

**OWASP MCP 위험 주소**: [MCP08 - 감사 및 텔레메트리 부족](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **보안 정보 및 이벤트 관리 (SIEM)**

**포괄적 로깅 전략:**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **실시간 위협 탐지**

**행동 분석:**
- **사용자 행동 분석(UBA)**: 비정상 사용자 접근 패턴 탐지
- **엔터티 행동 분석(EBA)**: MCP 서버 및 도구 행동 모니터링
- **머신러닝 이상 탐지**: AI 기반 보안 위협 식별
- **위협 인텔리전스 상관관계**: 관찰된 활동과 알려진 공격 패턴 매칭

## 9. **사고 대응 및 복구**

### **자동화된 대응 기능**

**즉각적 대응 조치:**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **포렌식 기능**

**조사 지원:**
- **감사 추적 보존**: 암호학적 무결성을 갖춘 변경 불가능한 로깅
- **증거 수집**: 관련 보안 자료 자동 수집
- **타임라인 재구성**: 보안 사고에 이르는 상세 사건 순서
- **영향 평가**: 침해 범위 및 데이터 노출 평가

## **주요 보안 아키텍처 원칙**

### **심층 방어**
- **다중 보안 계층**: 보안 아키텍처 내 단일 실패 지점 없음
- **중복 통제**: 중요 기능을 위한 중첩된 보안 조치
- **안전한 실패 메커니즘**: 오류나 공격 시 보안 기본값 적용

### **제로 트러스트 구현**
- **절대 신뢰 금지, 항상 검증**: 모든 엔터티와 요청에 대한 지속적 검증
- **최소 권한 원칙**: 모든 구성요소에 최소한의 접근 권한 부여
- **마이크로 세그멘테이션**: 세분화된 네트워크 및 접근 제어

### **지속적 보안 진화**
- **위협 환경 적응**: 출현하는 위협에 대응하는 정기적 업데이트
- **보안 통제 효과성**: 통제의 지속 평가 및 개선
- **명세 준수**: 발전하는 MCP 보안 표준과의 정렬

---

## **구현 참고 자료**

### **공식 MCP 문서**
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP 보안 자료**
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Azure 구현을 포함한 OWASP MCP Top 10 종합 안내서
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 공식 OWASP MCP 보안 위험
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure용 MCP 실습 보안 교육

### **Microsoft 보안 솔루션**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **보안 표준**
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP 대형 언어 모델 Top 10](https://genai.owasp.org/)
- [NIST 사이버보안 프레임워크](https://www.nist.gov/cyberframework)

---

> **중요**: 본 보안 통제는 현재 MCP 명세(2025-11-25)를 반영합니다. 표준이 빠르게 발전하고 있으니 항상 최신 [공식 문서](https://spec.modelcontextprotocol.io/)를 참고하시기 바랍니다.

## 다음 단계

- 돌아가기: [보안 모듈 개요](./README.md)
- 계속하기: [모듈 3: 시작하기](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 노력하고 있으나, 자동 번역물에는 오류나 부정확한 부분이 있을 수 있음을 유의해 주시기 바랍니다. 원문 문서가 권위 있는 출처로 간주되어야 합니다. 중요한 정보의 경우 전문적인 인공 번역을 권장합니다. 본 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->