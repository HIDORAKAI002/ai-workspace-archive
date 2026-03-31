# MCP OAuth2 示範

## 介紹

OAuth2 是業界標準的授權協定，能夠在不分享憑證的情況下安全存取資源。在 MCP（Model Context Protocol）實作中，OAuth2 提供了一種強健的方式來驗證和授權客戶端（例如 AI 代理）以存取 MCP 伺服器及其工具。

本課程示範如何使用 Spring Boot 實作 MCP 伺服器的 OAuth2 認證，這是在企業和生產部署中常見的模式。

## 學習目標

課程結束時，您將能夠：
- 了解 OAuth2 如何整合 MCP 伺服器
- 實作用於發行令牌的 Spring 授權伺服器
- 使用基於 JWT 的認證保護 MCP 端點
- 配置用於機器對機器通訊的客戶端憑證流程

## 先備知識

- 具備基本的 Java 和 Spring Boot 知識
- 熟悉先前模組中的 MCP 概念
- 已安裝 Maven 或 Gradle

---

## 專案概述

此專案是一個 **最小化的 Spring Boot 應用程式**，同時扮演：

* 一個 **Spring 授權伺服器**（透過 `client_credentials` 流程發行 JWT 存取令牌），以及  
* 一個 **資源伺服器**（保護自身的 `/hello` 端點）。

它與 [Spring 部落格文章 (2025 年 4 月 2 日)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) 中展示的設定相同。

---

## 快速開始（本機）

```bash
# 建置並執行
./mvnw spring-boot:run

# 取得一個令牌
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# 呼叫受保護的端點
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## 測試 OAuth2 配置

您可以透過下列步驟測試 OAuth2 安全配置：

### 1. 驗證伺服器正在運作並受保護

```bash
# 這應該會回傳 401 未授權，確認 OAuth2 安全性已啟用
curl -v http://localhost:8081/
```

### 2. 使用客戶端憑證取得存取令牌

```bash
# 取得並解析完整的 token 回應
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# 或是只解析 token（需要 jq）
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

注意：Basic 認證標頭（`bWNwLWNsaWVudDpzZWNyZXQ=`）是 `mcp-client:secret` 的 Base64 編碼。

### 3. 使用令牌存取受保護的端點

```bash
# 使用已儲存的令牌
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# 或直接使用令牌值
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

回傳「Hello from MCP OAuth2 Demo!」成功響應表示 OAuth2 配置運作正常。

---

## 建立容器映像檔

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

進入點 FQDN 成為您的 **issuer**（`https://<fqdn>`）。  
Azure 自動為 `*.azurecontainerapps.io` 提供受信任的 TLS 憑證。

---

## 整合 **Azure API Management**

新增此進入政策到您的 API：

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

APIM 將會取得 JWKS 並驗證每個請求。

---

## 接下來學習

- [5.4 根上下文](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：  
本文件係使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 所翻譯。雖然我們致力於提高準確性，但請注意自動翻譯可能包含錯誤或不準確之處，原文文件的母語版本應視為權威來源。對於關鍵資訊，建議採用專業人工翻譯。我們不對因使用本翻譯所引起的任何誤解或曲解負責。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->