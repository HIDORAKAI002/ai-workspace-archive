# MCP OAuth2 데모

## 소개

OAuth2는 자격 증명을 공유하지 않고도 리소스에 안전하게 액세스할 수 있도록 하는 업계 표준 권한 부여 프로토콜입니다. MCP(Model Context Protocol) 구현에서 OAuth2는 클라이언트(예: AI 에이전트)가 MCP 서버와 해당 도구에 액세스할 수 있도록 인증하고 권한을 부여하는 강력한 방법을 제공합니다.

이 수업에서는 엔터프라이즈 및 프로덕션 배포에 일반적인 패턴인 Spring Boot를 사용하여 MCP 서버에 대한 OAuth2 인증을 구현하는 방법을 보여줍니다.

## 학습 목표

이 수업이 끝나면 다음을 할 수 있습니다:
- OAuth2가 MCP 서버와 어떻게 통합되는지 이해하기
- 토큰 발급을 위한 Spring Authorization Server 구현하기
- JWT 기반 인증으로 MCP 엔드포인트 보호하기
- 머신 간 통신을 위한 클라이언트 자격 증명 흐름 구성하기

## 전제 조건

- Java 및 Spring Boot의 기본 이해
- 이전 모듈에서 MCP 개념에 익숙함
- Maven 또는 Gradle 설치

---

## 프로젝트 개요

이 프로젝트는 **최소한의 Spring Boot 애플리케이션**으로 다음 역할을 모두 수행합니다:

* **Spring Authorization Server** (`client_credentials` 흐름을 통해 JWT 액세스 토큰 발급), 그리고  
* **리소스 서버** (자체 `/hello` 엔드포인트 보호)

이 설정은 [Spring 블로그 게시물(2025년 4월 2일)](https://spring.io/blog/2025/04/02/mcp-server-oauth2)에서 보여준 내용을 반영합니다.

---

## 빠른 시작 (로컬)

```bash
# 빌드 및 실행
./mvnw spring-boot:run

# 토큰 획득
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# 보호된 엔드포인트 호출
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 구성 테스트

다음 단계를 통해 OAuth2 보안 구성을 테스트할 수 있습니다:

### 1. 서버가 실행 중이며 보호되고 있는지 확인

```bash
# 이는 OAuth2 보안이 활성화되어 있음을 확인하며 401 Unauthorized를 반환해야 합니다
curl -v http://localhost:8081/
```

### 2. 클라이언트 자격 증명을 사용해 액세스 토큰 받기

```bash
# 전체 토큰 응답을 가져와서 추출합니다
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# 또는 토큰만 추출하기 (jq 필요)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

참고: Basic 인증 헤더(`bWNwLWNsaWVudDpzZWNyZXQ=`)는 `mcp-client:secret`의 Base64 인코딩 값입니다.

### 3. 토큰을 사용해 보호된 엔드포인트에 접근

```bash
# 저장된 토큰 사용
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# 또는 토큰 값으로 직접 사용
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!"라는 응답이 성공적으로 나오면 OAuth2 구성이 정상적으로 작동하는 것입니다.

---

## 컨테이너 빌드

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps**에 배포

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

인그레스 FQDN은 귀하의 **issuer**(`https://<fqdn>`)가 됩니다.  
Azure는 `*.azurecontainerapps.io`에 대해 신뢰할 수 있는 TLS 인증서를 자동으로 제공합니다.

---

## **Azure API Management**와 연동

API에 다음 인바운드 정책을 추가하세요:

```xml
<inbound>
  <validate-jwt header-name="Authorization">
    <openid-config url="https://<fqdn>/.well-known/openid-configuration"/>
    <audiences>
      <audience>mcp-client</audience>
    </audiences>
  </validate-jwt>
  <base/>
</inbound>
```
  
APIM은 JWKS를 가져와 모든 요청을 검증합니다.

---

## 다음 단계

- [5.4 루트 컨텍스트](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:  
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 위해 최선을 다하고 있으나, 자동 번역에는 오류나 부정확성이 포함될 수 있음을 알려드립니다. 원문은 해당 문서의 권위 있는 출처로 간주되어야 합니다. 중요한 정보의 경우 전문적인 인간 번역을 권장합니다. 본 번역 사용으로 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->