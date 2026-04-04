# MCP OAuth2 演示

## 簡介

OAuth2 是業界標準的授權協議，能夠在不分享認證憑證的情況下，實現安全存取資源。在 MCP（模型上下文協議）的實作中，OAuth2 提供了一種強健的方法來驗證和授權客戶端（例如 AI 代理）存取 MCP 伺服器及其工具。

本課程示範如何使用 Spring Boot 實作 MCP 伺服器的 OAuth2 驗證，這是企業和生產環境部署的常見模式。

## 學習目標

完成本課程後，您將能夠：
- 理解 OAuth2 如何整合 MCP 伺服器
- 實作 Spring 授權伺服器以發行權杖
- 使用基於 JWT 的驗證保護 MCP 端點
- 配置客戶端憑證流程以實現機器對機器通訊

## 先決條件

- 具備 Java 和 Spring Boot 的基本知識
- 熟悉早先模組的 MCP 概念
- 已安裝 Maven 或 Gradle

---

## 專案概覽

此專案是一個**最簡化的 Spring Boot 應用程式**，同時扮演：

* **Spring 授權伺服器**（透過 `client_credentials` 流程發行 JWT 存取權杖），以及  
* **資源伺服器**（保護自身的 `/hello` 端點）。

其設定與[Spring 部落格文章 (2025 年 4 月 2 日)](https://spring.io/blog/2025/04/02/mcp-server-oauth2)中所示相似。

---

## 快速開始 (本機)

```bash
# 建構及執行
./mvnw spring-boot:run

# 獲取令牌
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# 調用受保護的端點
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## 測試 OAuth2 配置

您可以透過下列步驟測試 OAuth2 安全配置：

### 1. 確認伺服器正在運行且已受保護

```bash
# 這應該會回傳 401 未經授權，確認 OAuth2 安全性已啟用
curl -v http://localhost:8081/
```

### 2. 使用客戶端憑證取得存取權杖

```bash
# 獲取並提取完整的令牌響應
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# 或者只提取令牌（需要 jq）
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

注意：基本驗證標頭（`bWNwLWNsaWVudDpzZWNyZXQ=`）是 `mcp-client:secret` 的 Base64 編碼。

### 3. 使用該權杖存取受保護的端點

```bash
# 使用已儲存的令牌
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# 或直接使用令牌值
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

若成功回應「Hello from MCP OAuth2 Demo!」，表示 OAuth2 配置運作正常。

---

## 容器建置

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## 部署到 **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Ingress 的完整網域名稱成為您的**發行者**（`https://<fqdn>`）。  
Azure 自動為 `*.azurecontainerapps.io` 提供受信任的 TLS 證書。

---

## 整合到 **Azure API Management**

將此入站政策新增至您的 API：

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

APIM 會擷取 JWKS 並驗證每次請求。

---

## 接下來的內容

- [5.4 根上下文](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件由 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻譯而成。儘管我們致力於準確性，請注意自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為唯一權威來源。對於重要資訊，建議採用專業人工翻譯。我們不對使用此翻譯所引起的任何誤解或誤譯承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->