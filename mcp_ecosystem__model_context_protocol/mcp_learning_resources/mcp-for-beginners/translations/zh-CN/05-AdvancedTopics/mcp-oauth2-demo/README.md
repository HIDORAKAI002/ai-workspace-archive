# MCP OAuth2 演示

## 介绍

OAuth2 是行业标准的授权协议，实现无需共享凭据即可安全访问资源。在 MCP（模型上下文协议）实现中，OAuth2 提供了一种强健的方式来验证和授权客户端（如 AI 代理）访问 MCP 服务器及其工具。

本课程演示了如何使用 Spring Boot 实现 MCP 服务器的 OAuth2 认证，这是一种企业和生产部署中的常见模式。

## 学习目标

完成本课后，您将能够：
- 理解 OAuth2 如何与 MCP 服务器集成
- 实现用于颁发令牌的 Spring 授权服务器
- 使用基于 JWT 的认证保护 MCP 端点
- 配置客户端凭据流程以实现机器对机器的通信

## 先决条件

- 具备 Java 和 Spring Boot 的基础知识
- 熟悉早期模块中的 MCP 概念
- 安装 Maven 或 Gradle

---

## 项目概述

本项目是一个**最简化的 Spring Boot 应用程序**，同时作为：

* 一个**Spring 授权服务器**（通过 `client_credentials` 流程颁发 JWT 访问令牌），以及  
* 一个**资源服务器**（保护其自身的 `/hello` 端点）。

它复刻了[Spring 博客文章（2025 年 4 月 2 日）](https://spring.io/blog/2025/04/02/mcp-server-oauth2)中展示的设置。

---

## 快速开始（本地）

```bash
# 构建并运行
./mvnw spring-boot:run

# 获取令牌
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# 调用受保护的端点
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## 测试 OAuth2 配置

您可以通过以下步骤测试 OAuth2 安全配置：

### 1. 验证服务器正在运行并已安全保护

```bash
# 这应该返回401未授权，确认OAuth2安全性已激活
curl -v http://localhost:8081/
```

### 2. 使用客户端凭据获取访问令牌

```bash
# 获取并提取完整的令牌响应
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

注：Basic 认证头（`bWNwLWNsaWVudDpzZWNyZXQ=`）是 `mcp-client:secret` 的 Base64 编码。

### 3. 使用令牌访问受保护端点

```bash
# 使用保存的令牌
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# 或直接使用令牌值
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

返回 "Hello from MCP OAuth2 Demo!" 的成功响应确认 OAuth2 配置正常工作。

---

## 容器构建

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## 部署到 **Azure 容器应用**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

入口 FQDN 会成为您的**发行者**（`https://<fqdn>`）。  
Azure 会自动为 `*.azurecontainerapps.io` 提供受信任的 TLS 证书。

---

## 连接至 **Azure API 管理**

向您的 API 添加此入站策略：

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

APIM 会获取 JWKS 并验证每个请求。

---

## 下一步

- [5.4 根上下文](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文件由人工智能翻译服务[Co-op Translator](https://github.com/Azure/co-op-translator)翻译。尽管我们努力确保准确性，但请注意，自动翻译可能存在错误或不准确之处。原始语言的原文应被视为权威来源。对于重要信息，建议使用专业人工翻译。我们不对因使用此翻译而产生的任何误解或误释承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->