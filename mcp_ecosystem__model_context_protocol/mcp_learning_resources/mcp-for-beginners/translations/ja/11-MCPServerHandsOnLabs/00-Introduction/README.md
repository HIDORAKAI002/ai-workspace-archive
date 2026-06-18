# MCPデータベース統合入門

## 🎯 本ラボの内容

この入門ラボでは、データベース統合を伴うModel Context Protocol（MCP）サーバーの構築について包括的に解説します。https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail のZava Retail分析ユースケースを通じて、ビジネスケース、技術アーキテクチャ、および実務への応用を理解します。

## 概要

**Model Context Protocol (MCP)** は、AIアシスタントが外部データソースにリアルタイムに安全にアクセスし、対話することを可能にします。データベース統合と組み合わせることで、MCPはデータ駆動型AIアプリケーションに強力な機能を解放します。

この学習パスでは、PostgreSQLを介して小売の販売データにAIアシスタントを接続し、Row Level Securityやセマンティック検索、マルチテナントデータアクセスなどのエンタープライズパターンを実装する、実運用可能なMCPサーバーの構築方法を学びます。

## 学習目標

本ラボの終了時には以下ができるようになります：

- **Model Context Protocol** とデータベース統合の主な利点を<strong>定義する</strong>
- データベースを備えたMCPサーバーアーキテクチャの主要コンポーネントを<strong>特定する</strong>
- Zava Retailのユースケースとそのビジネス要件を<strong>理解する</strong>
- 安全でスケーラブルなデータベースアクセスのためのエンタープライズパターンを<strong>認識する</strong>
- 学習パスで使用するツールと技術を<strong>列挙する</strong>

## 🧭 課題：AIとリアルワールドデータの融合

### 従来のAIの限界

現代のAIアシスタントは強力ですが、実際のビジネスデータで作業する際には以下の重大な制約に直面します：

| <strong>課題</strong> | <strong>説明</strong> | <strong>ビジネスへの影響</strong> |
|---------------|-----------------|-------------------|
| <strong>固定知識</strong> | 固定データセットでトレーニングされたAIモデルは現行のビジネスデータにアクセスできない | 時代遅れの洞察、機会損失 |
| <strong>データサイロ</strong> | データベースやAPI、システムにロックされた情報にはAIが届かない | 不完全な分析、断片化したワークフロー |
| <strong>セキュリティ制約</strong> | 直接のデータベースアクセスはセキュリティやコンプライアンス上の懸念を生む | 導入制限、手動データ準備 |
| <strong>高度なクエリ</strong> | ビジネスユーザーはデータ洞察を得るのに技術的知識が必要 | 利用率低下、非効率なプロセス |

### MCPによる解決策

Model Context Protocolは以下を提供することでこれらの課題に対応します：

- <strong>リアルタイムデータアクセス</strong>：AIアシスタントがライブのデータベースやAPIをクエリする
- <strong>安全な統合</strong>：認証と権限で制御されたアクセス
- <strong>自然言語インターフェース</strong>：ビジネスユーザーがわかりやすい英語で質問可能
- <strong>標準化プロトコル</strong>：異なるAIプラットフォームやツール間で機能

## 🏪 Zava Retailのご紹介：https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

この学習パスを通じて、複数店舗を持つ架空のDIY小売チェーン<strong>Zava Retail</strong> のためのMCPサーバーを構築します。実務的なシナリオに基づいたエンタープライズグレードのMCP実装を示します。

### ビジネスの背景

**Zava Retail** は以下を運営しています：
- ワシントン州内にある **8つの実店舗** （シアトル、ベルビュー、タコマ、スポケーン、エバレット、レドモンド、カークランド）
- 電子商取引のための **1つのオンラインストア**
- 工具、金物、園芸用品、建築資材を含む多様な商品カタログ
- 店舗マネージャー、地域マネージャー、幹部による <strong>多層管理構造</strong>

### ビジネス要件

店舗マネージャーや幹部はAI搭載の分析ツールにより次のことを必要としています：

1. 店舗別や期間別の<strong>販売実績分析</strong>
2. <strong>在庫レベルの追跡</strong>と再入荷の必要性把握
3. <strong>顧客行動と購買パターンの理解</strong>
4. セマンティック検索を活用した<strong>商品インサイトの発見</strong>
5. 自然言語クエリによる<strong>レポート生成</strong>
6. ロールベースアクセス制御による<strong>データセキュリティの維持</strong>

### 技術要件

MCPサーバーは以下を提供する必要があります：

- 店舗マネージャーが自店舗のデータのみ閲覧できる<strong>マルチテナントデータアクセス</strong>
- 複雑なSQL操作を可能にする<strong>柔軟なクエリサポート</strong>
- 商品発見や推奨のための<strong>セマンティック検索</strong>
- 現行のビジネス状態を反映する<strong>リアルタイムデータ</strong>
- 行レベルセキュリティによる<strong>安全な認証</strong>
- 複数同時ユーザーに対応可能な<strong>スケーラブルなアーキテクチャ</strong>

## 🏗️ MCPサーバーアーキテクチャ概要

当社のMCPサーバーはデータベース統合に最適化されたレイヤードアーキテクチャを実装しています：

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### 主要コンポーネント

#### **1. MCPサーバーレイヤー**
- **FastMCPフレームワーク**：最新のPython製MCPサーバー実装
- <strong>ツール登録</strong>：型安全な宣言的ツール定義
- <strong>リクエストコンテキスト</strong>：ユーザーIDとセッション管理
- <strong>エラーハンドリング</strong>：堅牢なエラー管理とログ記録

#### **2. データベース統合レイヤー**
- <strong>接続プーリング</strong>：効率的なasyncpg接続管理
- <strong>スキーマプロバイダー</strong>：動的なテーブルスキーマ検出
- <strong>クエリエグゼキュータ</strong>：RLSコンテキスト付き安全なSQL実行
- <strong>トランザクション管理</strong>：ACID準拠とロールバック管理

#### **3. セキュリティレイヤー**
- <strong>行レベルセキュリティ</strong>：PostgreSQLのRLSによるマルチテナント分離
- **ユーザーID管理**：店舗マネージャーの認証と承認
- <strong>アクセス制御</strong>：詳細な権限管理と監査証跡
- <strong>入力検証</strong>：SQLインジェクション防止とクエリ検証

#### **4. AI拡張レイヤー**
- <strong>セマンティック検索</strong>：製品発見のためのベクトル埋め込み
- **Azure OpenAI連携**：テキスト埋め込み生成
- <strong>類似度アルゴリズム</strong>：pgvectorコサイン類似検索
- <strong>検索最適化</strong>：インデックスとパフォーマンス調整

## 🔧 技術スタック

### コア技術

| <strong>コンポーネント</strong> | <strong>技術</strong> | <strong>役割</strong> |
|---------------|----------------|-------------|
| **MCPフレームワーク** | FastMCP (Python) | 最新のMCPサーバー実装 |
| <strong>データベース</strong> | PostgreSQL 17 + pgvector | リレーショナルデータとベクトル検索 |
| **AIサービス** | Azure OpenAI | テキスト埋め込みと言語モデル |
| <strong>コンテナ技術</strong> | Docker + Docker Compose | 開発環境 |
| <strong>クラウドプラットフォーム</strong> | Microsoft Azure | 本番環境展開 |
| **IDE統合** | VS Code | AIチャットと開発ワークフロー |

### 開発ツール

| <strong>ツール</strong> | <strong>役割</strong> |
|----------|-------------|
| **asyncpg** | 高性能PostgreSQLドライバ |
| **Pydantic** | データ検証とシリアライズ |
| **Azure SDK** | クラウドサービス連携 |
| **pytest** | テストフレームワーク |
| **Docker** | コンテナ化とデプロイ |

### 本番スタック

| <strong>サービス</strong> | **Azureリソース** | <strong>役割</strong> |
|-------------|-------------------|-------------|
| <strong>データベース</strong> | Azure Database for PostgreSQL | マネージドデータベースサービス |
| <strong>コンテナ</strong> | Azure Container Apps | サーバーレスコンテナホスティング |
| **AIサービス** | Microsoft Foundry | OpenAIモデルとエンドポイント |
| <strong>モニタリング</strong> | Application Insights | 可観測性と診断 |
| <strong>セキュリティ</strong> | Azure Key Vault | シークレットと構成管理 |

## 🎬 実用シナリオ

異なるユーザーが当MCPサーバーとどのようにやりとりするか見ていきましょう：

### シナリオ1：店舗マネージャーの業績レビュー

<strong>ユーザー</strong>：シアトル店の店舗マネージャー、サラ  
<strong>目的</strong>：昨四半期の販売実績分析

<strong>自然言語クエリ</strong>：
> 「2024年第4四半期、私の店舗の売上高トップ10商品を教えて」

<strong>処理の流れ</strong>：
1. VS Code AIチャットがクエリをMCPサーバーに送信
2. MCPサーバーがサラの店舗コンテキスト（シアトル）を特定
3. RLSポリシーによりシアトル店舗のデータのみフィルタリング
4. SQLクエリが生成・実行される
5. 結果がフォーマットされAIチャットに返却
6. AIが分析結果と洞察を提示

### シナリオ2：セマンティック検索による商品発見

<strong>ユーザー</strong>：在庫管理マネージャー、マイク  
<strong>目的</strong>：顧客の要求に近い商品を探す

<strong>自然言語クエリ</strong>：
> 「『屋外用防水電気コネクタ』に似た商品は何がありますか？」

<strong>処理の流れ</strong>：
1. セマンティック検索ツールがクエリを処理
2. Azure OpenAIが埋め込みベクターを生成
3. pgvectorが類似度検索を実行
4. 関連商品が関連度順にランク付け
5. 詳細情報と在庫状況が提示される
6. AIが代替品やバンドル提案を示唆

### シナリオ3：店舗間のクロス分析

<strong>ユーザー</strong>：地域マネージャー、ジェニファー  
<strong>目的</strong>：全店舗のカテゴリ別売上比較

<strong>自然言語クエリ</strong>：
> 「過去6ヶ月の全店舗カテゴリ別売上を比較してください」

<strong>処理の流れ</strong>：
1. ジェニファーのアクセス用にRLSコンテキストが設定される
2. 複雑な複数店舗クエリが生成される
3. 店舗ロケーションごとにデータが集約
4. トレンドと比較結果が返却される
5. AIが洞察と提言を導出

## 🔒 セキュリティとマルチテナンシー詳細解説

当社の実装はエンタープライズグレードのセキュリティを最優先に設計されています：

### 行レベルセキュリティ（RLS）

PostgreSQLのRLSによりデータ分離が保証されます：

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### ユーザーアイデンティティ管理

各MCP接続には以下が含まれます：
- **店舗マネージャーID**：RLSコンテキストの一意識別子
- <strong>ロール割り当て</strong>：権限とアクセスレベル
- <strong>セッション管理</strong>：安全な認証トークン
- <strong>監査ログ</strong>：完全なアクセス履歴

### データ保護

多層のセキュリティ対策：
- <strong>接続の暗号化</strong>：すべてのデータベース接続にTLS
- **SQLインジェクション防止**：パラメータ化クエリのみ使用
- <strong>入力検証</strong>：包括的なリクエスト検証
- <strong>エラーハンドリング</strong>：敏感情報を含まないエラーメッセージ

## 🎯 重要ポイントまとめ

本入門を終えると以下が理解できるはずです：

✅ **MCPの価値提案**：AIアシスタントと実世界データの橋渡し役  
✅ <strong>ビジネス文脈</strong>：Zava Retailの要件と課題  
✅ <strong>アーキテクチャ概要</strong>：主要コンポーネントと相互作用  
✅ <strong>技術スタック</strong>：利用するツールとフレームワーク  
✅ <strong>セキュリティモデル</strong>：マルチテナントデータアクセスと保護  
✅ <strong>利用パターン</strong>：実際のクエリシナリオとワークフロー  

## 🚀 次のステップ

さらに深く学びたい方は：

**[Lab 01: Core Architecture Concepts](../01-Architecture/README.md)**

MCPサーバーのアーキテクチャパターン、データベース設計原則、および小売分析ソリューションの詳細技術実装について学びます。

## 📚 追加資料

### MCPドキュメント
- [MCP Specification](https://modelcontextprotocol.io/docs/) - 公式プロトコルドキュメント
- [MCP for Beginners](https://aka.ms/mcp-for-beginners) - MCP学習ガイド
- [FastMCP Documentation](https://github.com/modelcontextprotocol/python-sdk) - Python SDKのドキュメント

### データベース統合
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - PostgreSQLの完全リファレンス
- [pgvector Guide](https://github.com/pgvector/pgvector) - ベクトル拡張のドキュメント
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLSガイド

### Azureサービス
- [Azure OpenAI Documentation](https://docs.microsoft.com/azure/cognitive-services/openai/) - AIサービス統合
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - マネージドデータベースサービス
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - サーバーレスコンテナ

---

<strong>免責事項</strong>：本教材は架空の小売データを用いた学習演習です。実際の運用環境において同様のソリューションを実装する際は、必ず組織のデータガバナンスおよびセキュリティポリシーに従ってください。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->