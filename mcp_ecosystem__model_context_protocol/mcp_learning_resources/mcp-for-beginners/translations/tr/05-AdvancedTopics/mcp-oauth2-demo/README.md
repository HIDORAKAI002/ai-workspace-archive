# MCP OAuth2 Demo

## Giriş

OAuth2, kimlik bilgileri paylaşmadan kaynaklara güvenli erişim sağlayan endüstri standardı yetkilendirme protokolüdür. MCP (Model Context Protocol) uygulamalarında, OAuth2, MCP sunucularına ve araçlarına erişmek için istemcileri (örneğin yapay zeka ajanları) kimlik doğrulama ve yetkilendirme için sağlam bir yol sağlar.

Bu ders, kurumsal ve üretim dağıtımları için yaygın bir desen olan Spring Boot kullanarak MCP sunucuları için OAuth2 kimlik doğrulamasının nasıl uygulanacağını göstermektedir.

## Öğrenme Hedefleri

Bu dersin sonunda:
- OAuth2'nin MCP sunucularıyla nasıl entegre olduğunu anlayacaksınız
- Token verme için bir Spring Yetkilendirme Sunucusu uygulayacaksınız
- JWT tabanlı kimlik doğrulama ile MCP uç noktalarını koruyacaksınız
- Makineden makineye iletişim için istemci kimlik bilgileri akışını yapılandıracaksınız

## Önkoşullar

- Java ve Spring Boot hakkında temel bilgi
- Önceki modüllerden MCP kavramlarına aşinalık
- Maven veya Gradle yüklü

---

## Proje Genel Bakışı

Bu proje, aşağıdakileri yapan **minimal bir Spring Boot uygulamasıdır**:

* **Spring Yetkilendirme Sunucusu** (`client_credentials` akışı ile JWT erişim tokenleri verme), ve  
* **Kaynak Sunucusu** (kendi `/hello` uç noktasını koruma).

Bu yapılandırma, [Spring blog yazısında (2 Nis 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) gösterilenle benzerlik gösterir.

---

## Hızlı Başlangıç (yerel)

```bash
# derle ve çalıştır
./mvnw spring-boot:run

# bir belirteç al
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# korumalı uç noktayı çağır
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 Yapılandırmasını Test Etme

OAuth2 güvenlik yapılandırmasını aşağıdaki adımlarla test edebilirsiniz:

### 1. Sunucunun çalıştığını ve güvenli olduğunu doğrulayın

```bash
# Bu, OAuth2 güvenliğinin aktif olduğunu doğrulayarak 401 Yetkisiz döndürmelidir
curl -v http://localhost:8081/
```

### 2. İstemci kimlik bilgilerini kullanarak erişim tokeni alın

```bash
# Tam belirteç yanıtını alın ve çıkarın
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Veya sadece belirteci çıkarmak için (jq gerektirir)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Not: Temel Kimlik Doğrulama başlığı (`bWNwLWNsaWVudDpzZWNyZXQ=`), `mcp-client:secret` ifadesinin Base64 kodlamasıdır.

### 3. Token kullanarak korunan uç noktaya erişin

```bash
# Kaydedilen token kullanılarak
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Ya da doğrudan token değeri ile
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" içeren başarılı bir yanıt, OAuth2 yapılandırmasının doğru çalıştığını onaylar.

---

## Konteyner oluşturma

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps**'e dağıtma

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingress FQDN'niz, **issuer** (`https://<fqdn>`) olarak kullanılır.  
Azure, `*.azurecontainerapps.io` için otomatik olarak güvenilen bir TLS sertifikası sağlar.

---

## **Azure API Management** ile entegrasyon

API'nize aşağıdaki gelen politika ekleyin:

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

APIM, JWKS'i alır ve her isteği doğrular.

---

## Sonraki adımlar

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba gösterilse de, otomatik çevirilerin hata veya yanlışlıklar içerebileceğini lütfen unutmayın. Orijinal belge, kendi ana dilindeki versiyonu yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucunda ortaya çıkabilecek yanlış anlamalar veya yorum hatalarından sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->