# MCP OAuth2 デモ

## はじめに

OAuth2 は認証情報を共有することなくリソースへの安全なアクセスを可能にする、業界標準の認可プロトコルです。MCP（Model Context Protocol）実装において、OAuth2 はクライアント（AIエージェントなど）が MCP サーバーやそのツールにアクセスするための強力な認証および認可の方法を提供します。

本レッスンでは、Spring Boot を使用して MCP サーバーの OAuth2 認証を実装する方法を示します。これはエンタープライズや本番環境のデプロイで一般的なパターンです。

## 学習目標

このレッスンの終了時には、以下を理解できるようになります：
- OAuth2 が MCP サーバーとどのように統合されるか
- トークン発行のための Spring Authorization Server の実装
- JWT ベースの認証で MCP エンドポイントを保護する方法
- マシン間通信のためのクライアント認証情報フローの設定

## 前提条件

- Java と Spring Boot の基本的な知識
- 以前のモジュールで学んだ MCP の概念に慣れていること
- Maven または Gradle のインストール

---

## プロジェクト概要

このプロジェクトは、**最小限の Spring Boot アプリケーション**であり、以下の両方の役割を果たします：

* **Spring Authorization Server**（`client_credentials` フローによる JWT アクセストークンの発行）  
* **リソースサーバー**（自身の `/hello` エンドポイントを保護）

これは、[Spring ブログ投稿 (2025年4月2日)](https://spring.io/blog/2025/04/02/mcp-server-oauth2) で示されたセットアップを模倣しています。

---

## クイックスタート（ローカル）

```bash
# ビルドして実行
./mvnw spring-boot:run

# トークンを取得
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# 保護されたエンドポイントを呼び出す
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## OAuth2 設定のテスト

以下の手順で OAuth2 セキュリティ設定をテストできます：

### 1. サーバーが起動しており、保護されていることを確認する

```bash
# これは401 Unauthorizedを返すべきであり、OAuth2セキュリティが有効であることを確認します
curl -v http://localhost:8081/
```

### 2. クライアント認証情報を使ってアクセストークンを取得する

```bash
# 完全なトークンレスポンスを取得して抽出する
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# またはトークンのみを抽出する（jqが必要）
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

補足：Basic Authentication ヘッダー（`bWNwLWNsaWVudDpzZWNyZXQ=`）は `mcp-client:secret` の Base64 エンコードです。

### 3. トークンを使って保護されたエンドポイントにアクセスする

```bash
# 保存されたトークンを使用
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# またはトークンの値を直接使用
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

"Hello from MCP OAuth2 Demo!" の成功レスポンスが返ってくれば、OAuth2 設定が正しく機能していることを示しています。

---

## コンテナのビルド

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## **Azure Container Apps** へのデプロイ

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

ingress の FQDN があなたの **issuer** (`https://<fqdn>`) となります。  
Azure は `*.azurecontainerapps.io` 用に信頼された TLS 証明書を自動的に提供します。

---

## **Azure API Management** への連携

API に次のインバウンドポリシーを追加してください：

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

APIM は JWKS を取得し、すべてのリクエストを検証します。

---

## 次のステップ

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：  
本書類はAI翻訳サービス「Co-op Translator」（https://github.com/Azure/co-op-translator）を使用して翻訳されました。正確性を期しておりますが、自動翻訳には誤りや不正確な箇所が含まれる可能性があります。原文の言語によるオリジナル文書を正式な情報源としてください。重要な内容については、専門の人間による翻訳を推奨いたします。本翻訳の利用により生じたいかなる誤解や解釈の相違についても、当方は一切責任を負いません。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->