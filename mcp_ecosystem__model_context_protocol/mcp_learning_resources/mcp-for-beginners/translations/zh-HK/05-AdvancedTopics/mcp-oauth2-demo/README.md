# MCP OAuth2 演示

## 介紹

OAuth2 是業界標準的授權協議，能夠在不分享認證資料的情況下安全地存取資源。在 MCP（模型上下文協議）實作中，OAuth2 提供了一種強健的方式，來驗證和授權客戶端（例如 AI 代理）存取 MCP 伺服器及其工具。

本課示範如何使用 Spring Boot 來實作 MCP 伺服器的 OAuth2 身份驗證，這是企業和生產部署的常見模式。

## 學習目標

完成本課後，你將會：
- 了解 OAuth2 如何與 MCP 伺服器整合
- 實作 Spring 授權伺服器以簽發令牌
- 使用基於 JWT 的身份驗證保護 MCP 端點
- 配置用於機器對機器通訊的客戶端憑證流程

## 先備知識

- 基本的 Java 與 Spring Boot 知識
- 熟悉早期單元的 MCP 概念
- 安裝了 Maven 或 Gradle

---

## 專案概覽

本專案是一個**最簡版的 Spring Boot 應用**，同時擔任：

* **Spring 授權伺服器**（透過 `client_credentials` 流程簽發 JWT 存取令牌），以及  
* **資源伺服器**（保護其自身的 `/hello` 端點）。

它複製了[Spring 部落格文章 (2025 年 4 月 2 日)](https://spring.io/blog/2025/04/02/mcp-server-oauth2)中示範的設置。

---

## 快速開始（本地）

```bash
# 建構及執行
./mvnw spring-boot:run

# 獲取一個令牌
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# 調用受保護的端點
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## 測試 OAuth2 配置

你可以透過以下步驟測試 OAuth2 的安全配置：

### 1. 驗證伺服器是否已啟動並且受保護

```bash
# 這應該返回 401 未經授權，確認 OAuth2 安全性已啟動
curl -v http://localhost:8081/
```

### 2. 使用客戶端憑證取得存取令牌

```bash
# 獲取並提取完整的令牌回應
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# 或只提取令牌（需要 jq）
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

注意：Basic 認證標頭 (`bWNwLWNsaWVudDpzZWNyZXQ=`) 是 `mcp-client:secret` 的 Base64 編碼。

### 3. 使用該令牌存取受保護端點

```bash
# 使用已儲存的令牌
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# 或直接使用令牌值
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

收到「Hello from MCP OAuth2 Demo!」的成功回應，表示 OAuth2 配置正確運作。

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

入口 FQDN 會成為你的 **issuer**（`https://<fqdn>`）。  
Azure 會自動為 `*.azurecontainerapps.io` 提供受信任的 TLS 證書。

---

## 整合到 **Azure API 管理**

將以下入站策略加入你的 API：

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

APIM 將會取得 JWKS 並驗證每一筆請求。

---

## 接著做什麼

- [5.4 根上下文](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件經由人工智能翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。儘管我們致力於確保準確性，但請注意，自動翻譯可能存在錯誤或不準確之處。原始文件的母語版本應被視為具有權威性的來源。對於重要資訊，建議採用專業人工翻譯。我們不對因使用此翻譯而引起的任何誤解或誤釋負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->