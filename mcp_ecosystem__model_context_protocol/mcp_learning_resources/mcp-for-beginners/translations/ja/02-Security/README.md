# MCPセキュリティ：AIシステムの包括的保護

[![MCPセキュリティのベストプラクティス](../../../translated_images/ja/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(上の画像をクリックすると、このレッスンのビデオが視聴できます)_

セキュリティはAIシステム設計の基本であり、だからこそ我々はこれを第2セクションとして重視しています。これは、Microsoftの[Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/)に由来する<strong>Secure by Design</strong>原則と一致しています。

モデルコンテキストプロトコル（MCP）は、AI駆動アプリケーションに強力な新機能をもたらしつつ、従来のソフトウェアリスクを超えるユニークなセキュリティ課題も伴います。MCPシステムは、確立されたセキュリティ上の懸念（安全なコーディング、最小権限、サプライチェーンセキュリティ）だけでなく、プロンプトインジェクション、ツールポイズニング、セッションハイジャック、困惑代理攻撃、トークンパススルー脆弱性、動的機能変更などのAI固有の脅威にも直面しています。

本レッスンでは、MCP実装における最も重要なセキュリティリスクを検討します。認証、認可、過剰な権限、間接的なプロンプトインジェクション、セッションセキュリティ、困惑代理問題、トークン管理、サプライチェーン脆弱性をカバーします。MicrosoftのPrompt Shields、Azure Content Safety、GitHub Advanced Securityなどのソリューションを活用し、これらのリスクを軽減するための実用的な対策とベストプラクティスを学びます。

## 学習目標

このレッスンの終了時には、以下ができるようになります：

- **MCP固有の脅威の特定**：プロンプトインジェクション、ツールポイズニング、過剰な権限、セッションハイジャック、困惑代理問題、トークンパススルー脆弱性、サプライチェーンリスクなどのMCPシステム独自のセキュリティリスクを認識する
- <strong>セキュリティコントロールの適用</strong>：堅牢な認証、最小権限アクセス、安全なトークン管理、セッションセキュリティ制御、サプライチェーン検証などの効果的な軽減策を実装する
- **Microsoftセキュリティソリューションの活用**：MCPワークロード保護のためにMicrosoft Prompt Shields、Azure Content Safety、GitHub Advanced Securityを理解して展開する
- <strong>ツールセキュリティの検証</strong>：ツールのメタデータ検証の重要性、動的変更の監視、および間接的なプロンプトインジェクション攻撃からの防御を認識する
- <strong>ベストプラクティスの統合</strong>：確立されたセキュリティ基礎（安全なコーディング、サーバーの強化、ゼロトラスト）をMCP固有のコントロールと組み合わせて包括的な保護を実現する

# MCPセキュリティアーキテクチャとコントロール

現代のMCP実装には、従来のソフトウェアセキュリティとAI固有の脅威の両方に対応する多層的なセキュリティアプローチが求められます。急速に進化するMCP仕様はセキュリティコントロールの成熟を続けており、エンタープライズセキュリティアーキテクチャや確立されたベストプラクティスとの統合を可能にしています。

[Microsoft Digital Defense Report](https://aka.ms/mddr)の調査では、<strong>報告された侵害の98％は堅固なセキュリティ衛生で防止可能</strong>であることが示されています。最も効果的な保護戦略は、基盤となるセキュリティ実践とMCP固有のコントロールを組み合わせたものであり、証明されたベースラインセキュリティ対策が全体のリスク削減に最も影響力を持つことがわかっています。

## 現状のセキュリティ状況

> **注:** この情報は<strong>2026年2月5日</strong>時点のMCPセキュリティ標準を反映しており、<strong>MCP仕様2025-11-25</strong>に準拠しています。MCPプロトコルは急速に進化を続けており、将来の実装では新たな認証パターンや強化されたコントロールが導入される可能性があります。最新のガイダンスについては、常に現在の[MCP仕様](https://spec.modelcontextprotocol.io/)、[MCP GitHubリポジトリ](https://github.com/modelcontextprotocol)、および[セキュリティベストプラクティス文書](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)を参照してください。

> **将来展望:** `2026-07-28`リリース候補は認可をさらに強化します—クライアントは認可応答の`iss`パラメーターを検証する必要があり（RFC 9207）、動的クライアント登録時にOpenID Connectの`application_type`を宣言し、登録済み資格情報を発行認可サーバーにバインドしなければなりません。詳細な認可SEPのリストは[「MCPの変更点：2026-07-28リリース候補」](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)をご覧ください。

## 🏔️ MCPセキュリティサミットワークショップ（Sherpa）

<strong>実践的なセキュリティトレーニング</strong>として、Microsoft Azure上でMCPサーバーのセキュリティを確保する包括的な案内付き探検である<strong>MCPセキュリティサミットワークショップ</strong>（Sherpa）を強くお勧めします。

### ワークショップ概要

[MCPセキュリティサミットワークショップ](https://azure-samples.github.io/sherpa/)は、「脆弱 → エクスプロイト → 修正 → 検証」という実証済みの方法論を通じて実践的かつ具体的なセキュリティトレーニングを提供します。参加者は：

- <strong>壊して学ぶ</strong>：意図的に脆弱なサーバーを攻撃して実際に脆弱性を体験する
- **Azureネイティブセキュリティを活用**：Azure Entra ID、Key Vault、API Management、およびAI Content Safetyを利用
- <strong>多層防御を実践</strong>：キャンプを進みながら包括的なセキュリティ層を構築
- **OWASP標準に準拠**：すべての技術は[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)にマッピングされています
- <strong>実用的なコードを入手</strong>：動作確認済みの実装を持ち帰ることができます

### 探検ルート

| キャンプ | 焦点 | 対応するOWASPリスク |
|------|-------|---------------------|
| <strong>ベースキャンプ</strong> | MCPの基本 & 認証の脆弱性 | MCP01, MCP07 |
| **キャンプ1：アイデンティティ** | OAuth 2.1、Azureマネージドアイデンティティ、Key Vault | MCP01, MCP02, MCP07 |
| **キャンプ2：ゲートウェイ** | API Management、プライベートエンドポイント、ガバナンス | MCP02, MCP06, MCP07, MCP09 |
| **キャンプ3：I/Oセキュリティ** | プロンプトインジェクション、PII保護、コンテンツセーフティ | MCP03, MCP05, MCP06, MCP10 |
| **キャンプ4：モニタリング** | ログ分析、ダッシュボード、脅威検出 | MCP04, MCP08 |
| <strong>サミット</strong> | レッドチーム/ブルーチーム統合テスト | 全て |

<strong>開始はこちら</strong>：[https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP トップ10セキュリティリスク

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)には、MCP実装における最も重要な10のセキュリティリスクが詳細に記載されています：

| リスク | 説明 | Azureによる軽減策 |
|------|-------------|------------------|
| **MCP01** | トークンの誤管理と秘密情報の露出 | Azure Key Vault、マネージドアイデンティティ |
| **MCP02** | スコープの拡大による権限昇格 | RBAC、条件付きアクセス |
| **MCP03** | ツールポイズニング | ツール検証、整合性検証 |
| **MCP04** | ソフトウェアサプライチェーン攻撃と依存関係の改ざん | GitHub Advanced Security、依存関係スキャン |
| **MCP05** | コマンドインジェクションと実行 | 入力検証、サンドボックス |
| **MCP06** | 意図の流れの改ざん | Azure AI Content Safety、Prompt Shields |
| **MCP07** | 認証と認可の不備 | Azure Entra ID、PKCE対応OAuth 2.1 |
| **MCP08** | 監査とテレメトリの欠如 | Azure Monitor、Application Insights |
| **MCP09** | シャドウMCPサーバー | APIセンターガバナンス、ネットワーク分離 |
| **MCP10** | コンテキストインジェクションと過剰共有 | データ分類、最小露出 |

### MCP認証の進化

MCP仕様は認証および認可のアプローチにおいて大きく進化しています：

- <strong>初期アプローチ</strong>：初期仕様では開発者がカスタム認証サーバーを実装し、MCPサーバーがOAuth 2.0認可サーバーとしてユーザー認証を直接管理していました
- **現在の標準（2025-11-25）**：更新された仕様では、MCPサーバーが外部のIDプロバイダー（例：Microsoft Entra ID）に認証を委任できるようになり、セキュリティ態勢を向上させ実装の複雑さを軽減しています
- <strong>トランスポート層セキュリティ</strong>：ローカル（STDIO）接続とリモート（ストリーミングHTTP）接続の両方に対する適切な認証パターンを備えた安全なトランスポートメカニズムのサポートが強化されています

## 認証・認可のセキュリティ

### 現在のセキュリティ課題

現代のMCP実装は認証と認可の複数の課題に直面しています：

### リスクと脅威ベクトル

- <strong>誤設定された認可ロジック</strong>：MCPサーバーにおける不適切な認可実装は機密データを露出し、アクセス制御を誤適用する恐れがあります
- **OAuthトークンの侵害**：ローカルMCPサーバーのトークンが盗まれると、攻撃者がサーバーを偽装して下流サービスにアクセス可能になります
- <strong>トークンパススルー脆弱性</strong>：不適切なトークン取り扱いがセキュリティコントロールの回避や説明責任の欠如を招きます
- <strong>過剰な権限</strong>：権限が過剰なMCPサーバーは最小権限の原則に反し、攻撃対象領域を拡大します

#### トークンパススルー：重大なアンチパターン

現行のMCP認可仕様では、<strong>トークンパススルーは明確に禁止されています</strong>。これは重大なセキュリティ影響があるためです：

##### セキュリティコントロールの迂回
- MCPサーバーと下流APIはレート制限、リクエスト検証、トラフィック監視などの重要なセキュリティ制御を適用しており、適切なトークン検証に依存しています
- クライアントからAPIへの直接トークン使用はこれらの保護を回避し、セキュリティアーキテクチャを損ないます

##### 説明責任と監査の課題  
- MCPサーバーは上流から発行されたトークンを使用するクライアントを区別できず、監査トレイルが断絶します
- 下流のリソースサーバーログは実際のMCPサーバー仲介者ではなく誤解を招くリクエストの発信元を示します
- インシデント調査やコンプライアンス監査が著しく困難になります

##### データ流出リスク
- 検証されていないトークンクレームにより、盗まれたトークンを持つ悪意のある者がMCPサーバーを代理としてデータを流出させる可能性があります
- 信頼境界の違反により、意図しないアクセスパターンがセキュリティコントロールを回避します

##### マルチサービス攻撃ベクトル
- 複数のサービスが受け入れる侵害されたトークンは接続されたシステム間での横移動を許します
- トークンの起源が検証できない場合、サービス間の信頼性が損なわれる可能性があります

### セキュリティコントロールと軽減策

**重要なセキュリティ要件：**

> **必須:** MCPサーバーは明示的にMCPサーバー用に発行されていないトークンを<strong>絶対に受け入れてはなりません</strong>

#### 認証・認可コントロール

- <strong>厳格な認可レビュー</strong>：MCPサーバーの認可ロジックを包括的に監査し、意図したユーザーやクライアントのみが機密リソースにアクセスできることを保証する
  - <strong>実装ガイド</strong>：[Azure API Managementを認証ゲートウェイとしてMCPサーバーに利用する](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **ID統合**：[Microsoft Entra IDを用いたMCPサーバー認証](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全なトークン管理</strong>：[Microsoftのトークン検証とライフサイクルのベストプラクティス](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)を実装
  - トークンのaudienceクレームがMCPサーバーのIDと一致することを検証
  - 適切なトークンローテーションと有効期限ポリシーを実施
  - トークンリプレイ攻撃や不正使用を防止

- <strong>保護されたトークンストレージ</strong>：保存時および転送時に暗号化された安全なトークン保管
  - <strong>ベストプラクティス</strong>：[安全なトークンストレージおよび暗号化ガイドライン](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### アクセス制御の実装

- <strong>最小権限の原則</strong>：MCPサーバーには意図した機能実行に必要最低限の権限のみを付与
  - 権限の定期的な見直しと更新で権限拡張を防止
  - **Microsoftドキュメント**：[安全な最小権限アクセス](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **ロールベースアクセス制御（RBAC）**：詳細な役割割当を実装
  - 特定のリソースやアクションにロールを厳密に限定
  - 攻撃対象領域を広げる広範または不要な権限付与を避ける

- <strong>継続的な権限監視</strong>：アクセスの監査とモニタリングを継続的に実施
  - 権限使用パターンの異常を監視
  - 過剰または未使用の権限を速やかに是正

## AI固有のセキュリティ脅威

### プロンプトインジェクションとツール操作攻撃

現代のMCP実装は、従来のセキュリティ対策では完全に対応できない高度なAI固有の攻撃ベクトルに直面しています：

#### **間接的なプロンプトインジェクション（クロスドメインプロンプトインジェクション）**

<strong>間接的なプロンプトインジェクション</strong>は、MCP対応AIシステムにおける最も重大な脆弱性の一つです。攻撃者は悪意のある命令を外部コンテンツ（ドキュメント、ウェブページ、メール、データソース）に埋め込み、その後AIシステムがこれらを正当な指示として処理します。

**攻撃シナリオ：**
- <strong>文書ベースのインジェクション</strong>：処理される文書内に隠された悪意のある命令がAIの意図しない動作を誘発
- **Webコンテンツの悪用**：収集された悪意のあるプロンプトを含む改ざんされたウェブページがAIの挙動を操作
- <strong>メールベース攻撃</strong>：メール内の悪意のあるプロンプトがAIアシスタントに情報漏えいや不正操作を引き起こす
- <strong>データソース汚染</strong>：汚染されたデータベースやAPIがAIシステムに汚れたコンテンツを提供

<strong>実際の影響</strong>：これらの攻撃はデータ流出、プライバシー侵害、有害コンテンツの生成、ユーザーインタラクションの操作を引き起こし得ます。詳細な分析については[Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)をご覧ください。

![プロンプトインジェクション攻撃図](../../../translated_images/ja/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>ツールポイズニング攻撃</strong>

<strong>ツールポイズニング</strong>は、MCPツールの定義に関するメタデータを標的とし、LLMがツールの説明やパラメーターを解釈して実行判断する仕組みを悪用します。

**攻撃メカニズム：**
- <strong>メタデータ操作</strong>：攻撃者がツールの説明、パラメーター定義、使用例に悪意のある命令を注入
- <strong>不可視の命令</strong>：AIモデルには処理されるが人間ユーザーには見えないツールメタデータ内の隠れたプロンプト
- **動的ツール改変（「ラグプル」）**：ユーザーに承認されたツールが後から悪意ある動作を行うよう改変される
- <strong>パラメーターインジェクション</strong>：モデル動作に影響を与えるツールパラメーター仕様に埋め込まれた悪意のあるコンテンツ


<strong>ホスト型サーバーのリスク</strong>：リモートMCPサーバーは、ユーザーの初期承認後にツール定義が更新される可能性があるためリスクが高まり、以前は安全だったツールが悪意のあるものになるシナリオが発生します。詳細な分析については [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) を参照してください。

![Tool Injection Attack Diagram](../../../translated_images/ja/tool-injection.3b0b4a6b24de6bef.webp)

#### **追加のAI攻撃ベクトル**

- **クロスドメインプロンプトインジェクション（XPIA）**：複数のドメインのコンテンツを利用してセキュリティ制御を回避する高度な攻撃
- <strong>動的な機能変更</strong>：初期のセキュリティ評価を逃れるリアルタイムのツール機能変更
- <strong>コンテキストウィンドウポイズニング</strong>：大規模なコンテキストウィンドウを操作し悪意ある指示を隠す攻撃
- <strong>モデル混乱攻撃</strong>：モデルの制限を悪用し予測不可能または安全でない動作を引き起こす攻撃


### AIセキュリティリスクの影響

**重大な影響:**
- <strong>データ流出</strong>：企業または個人の機密データへの不正アクセスおよび窃取
- <strong>プライバシー侵害</strong>：個人識別情報（PII）や機密業務データの露呈  
- <strong>システム操作</strong>：重要システムおよびワークフローの意図しない変更
- <strong>認証情報窃取</strong>：認証トークンやサービス認証情報の乗っ取り
- <strong>ラテラルムーブメント</strong>：侵害されたAIシステムを足がかりとした広範なネットワーク攻撃

### Microsoft AIセキュリティソリューション

#### **AIプロンプトシールド：インジェクション攻撃に対する高度な防御**

Microsoftの<strong>AIプロンプトシールド</strong>は、複数のセキュリティ層を通じて直接的および間接的なプロンプトインジェクション攻撃から包括的な防御を提供します：

##### **主要防御メカニズム：**

1. **高度な検出＆フィルタリング**
   - 機械学習アルゴリズムとNLP技術により外部コンテンツ内の悪意ある指示を検出
   - ドキュメント、ウェブページ、メール、データソースのリアルタイム分析による埋め込み脅威の検出
   - 正当なプロンプトパターンと悪意あるパターンの文脈的理解

2. <strong>スポットライト技術</strong>  
   - 信頼できるシステム指示と潜在的に侵害された外部入力を区別
   - モデルの関連性を高めるテキスト変換手法で悪意あるコンテンツを分離
   - AIシステムが適切な指示階層を維持し注入コマンドを無視するのに役立つ

3. **デリミタ＆データマーキングシステム**
   - 信頼されたシステムメッセージと外部入力テキスト間の明確な境界定義
   - 特別なマーカーで信頼できるデータソースと信頼できないデータソースの境界を強調
   - 明確な分離により指示の混乱や不正コマンド実行を防止

4. <strong>継続的な脅威インテリジェンス</strong>
   - Microsoftは新興の攻撃パターンを継続的に監視し防御を更新
   - 新しいインジェクション技術や攻撃ベクトルの積極的脅威ハンティング
   - 進化する脅威に対抗するための定期的なセキュリティモデル更新

5. **Azure Content Safetyの統合**
   - 包括的なAzure AI Content Safetyスイートの一部
   - ジェイルブレイク試行、有害コンテンツ、セキュリティポリシー違反の追加検出
   - AIアプリケーションコンポーネント全体で統一されたセキュリティ制御

<strong>実装リソース</strong>：[Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ja/prompt-shield.ff5b95be76e9c78c.webp)


## 高度なMCPセキュリティ脅威

### セッションハイジャックの脆弱性

<strong>セッションハイジャック</strong>は、ステートフルなMCP実装における重要な攻撃ベクトルであり、不正な第三者が正当なセッションIDを入手・悪用してクライアントになりすまし、不正な操作を実行します。

#### <strong>攻撃シナリオとリスク</strong>

- <strong>セッションハイジャックによるプロンプトインジェクション</strong>：盗まれたセッションIDでセッション状態を共有するサーバーに悪意あるイベントを注入し、有害な動作や機密データへのアクセスを引き起こす可能性
- <strong>直接的ななりすまし</strong>：盗まれたセッションIDにより認証を回避して直接MCPサーバー呼び出しが可能となり、攻撃者が正当なユーザーとして扱われる
- <strong>侵害された再開可能ストリーム</strong>：攻撃者が要求を途中で終了させることで、正当なクライアントが潜在的に悪意ある内容で再開することが可能

#### <strong>セッション管理のセキュリティ制御</strong>

**重要な要件:**
- <strong>認可検証</strong>：認可を実装するMCPサーバーはすべての受信要求を検証し、セッションに認証を依存してはならない
- <strong>安全なセッション生成</strong>：安全な乱数生成器を用いて暗号的に安全な非決定論的セッションIDを生成
- <strong>ユーザー固有の紐付け</strong>：`<user_id>:<session_id>` のようにユーザー固有情報にセッションIDを紐付けて、ユーザー間のセッション悪用を防止
- <strong>セッションライフサイクル管理</strong>：適切な有効期限設定、ローテーション、および無効化を実装し脆弱性の窓を制限
- <strong>通信の安全性</strong>：すべての通信にHTTPSを必須とし、セッションIDの盗聴を防止

### 混乱代理問題

<strong>混乱代理問題</strong>は、MCPサーバーがクライアントとサードパーティサービス間の認証プロキシとして機能するときに発生し、静的なクライアントIDを悪用した認可の回避が可能となります。

#### <strong>攻撃の仕組みとリスク</strong>

- <strong>クッキーによる同意回避</strong>：以前のユーザー認証によって作成された同意クッキーを、攻撃者が悪意のある認可要求と偽造リダイレクトURIで悪用
- <strong>認可コード窃取</strong>：既存の同意クッキーにより認可サーバーが同意画面をスキップし、コードが攻撃者制御のエンドポイントにリダイレクトされる可能性  
- **不正なAPIアクセス**：盗まれた認可コードを使用してトークン交換やユーザーなりすましを許可なく実行

#### <strong>緩和戦略</strong>

**必須の制御:**
- <strong>明示的な同意要件</strong>：静的クライアントIDを使用するMCPプロキシサーバーは、動的登録された各クライアントに対してユーザーの同意を必ず取得
- **OAuth 2.1のセキュリティ実装**：認可要求には最新のOAuthベストプラクティス（PKCEを含む）を適用
- <strong>厳格なクライアント検証</strong>：リダイレクトURIとクライアント識別子を厳しく検証し悪用を防止

### トークンパススルーの脆弱性  

<strong>トークンパススルー</strong>は、MCPサーバーがクライアントトークンを適切に検証せずに受け入れて下流APIに転送する明確なアンチパターンであり、MCP認可仕様に違反します。

#### <strong>セキュリティ上の影響</strong>

- <strong>制御の回避</strong>：クライアントからAPIへの直接トークン使用により、重要なレート制限、検証、モニタリング制御が回避される
- <strong>監査ログの破損</strong>：上流発行のトークンによりクライアント識別が不可能となりインシデント調査が困難に
- <strong>プロキシを使ったデータ流出</strong>：未検証のトークンがサーバーを不正データアクセスのプロキシとして悪用される
- <strong>信頼境界の違反</strong>：トークンの起源が検証できないため、下流サービスの信頼前提が侵害される可能性
- <strong>複数サービスへの攻撃拡大</strong>：複数サービスで受け入れられた侵害トークンによりラテラルムーブメントが可能に

#### <strong>必須のセキュリティ制御</strong>

**交渉不可の要件:**
- <strong>トークン検証</strong>：MCPサーバーは、MCPサーバー向けに明示的に発行されていないトークンを受け入れてはならない
- <strong>オーディエンス検証</strong>：トークンのaudクレームが必ずMCPサーバーのIDと一致することを検証
- <strong>適切なトークンライフサイクル</strong>：短命アクセストークンを適用し安全なローテーションを実施


## AIシステムのサプライチェーンセキュリティ

サプライチェーンセキュリティは従来のソフトウェア依存関係を超えてAIエコシステム全体を包含しています。最新のMCP実装では、すべてのAI関連コンポーネントを厳格に検証・監視し、それぞれが潜在的脆弱性となってシステムの完全性を損なう可能性があります。

### 拡張されたAIサプライチェーン構成要素

**従来のソフトウェア依存関係:**
- オープンソースライブラリとフレームワーク
- コンテナイメージとベースシステム  
- 開発ツールおよびビルドパイプライン
- インフラストラクチャコンポーネントとサービス

**AI特有のサプライチェーン要素:**
- <strong>基盤モデル</strong>：さまざまなプロバイダーからの事前学習済みモデルで出所検証が必要
- <strong>埋め込みサービス</strong>：外部ベクトル化およびセマンティック検索サービス
- <strong>コンテキストプロバイダー</strong>：データソース、ナレッジベース、文書リポジトリ  
- **サードパーティAPI**：外部AIサービス、MLパイプライン、データ処理エンドポイント
- <strong>モデルアーティファクト</strong>：重み、設定、およびファインチューニング済みモデルのバリエーション
- <strong>トレーニングデータソース</strong>：モデルのトレーニングとファインチューニングに使用されるデータセット

### 包括的なサプライチェーンセキュリティ戦略

#### <strong>コンポーネント検証と信頼</strong>
- <strong>出所の検証</strong>：すべてのAIコンポーネントの起源、ライセンス、および整合性を統合前に確認
- <strong>セキュリティ評価</strong>：モデル、データソース、およびAIサービスの脆弱性スキャンとセキュリティレビューの実施
- <strong>評判分析</strong>：AIサービスプロバイダーのセキュリティ実績と運用状況の評価
- <strong>コンプライアンス検証</strong>：すべてのコンポーネントが組織のセキュリティおよび規制要件を満たしていることを保証

#### <strong>安全な展開パイプライン</strong>  
- **自動CI/CDセキュリティ**：自動展開パイプライン全体にセキュリティスキャンを統合
- <strong>アーティファクトの整合性</strong>：すべての配備アーティファクト（コード、モデル、設定）に対し暗号的検証を実施
- <strong>段階的展開</strong>：それぞれの段階でセキュリティ検証を伴う段階的展開戦略の採用
- <strong>信頼できるアーティファクトリポジトリ</strong>：検証済みかつ安全なアーティファクトレジストリおよびリポジトリからのみ展開

#### <strong>継続的監視と対応</strong>
- <strong>依存関係スキャン</strong>：すべてのソフトウェアおよびAIコンポーネント依存関係に対する継続的な脆弱性監視
- <strong>モデル監視</strong>：モデル行動、性能のドリフト、セキュリティ異常の継続的評価
- <strong>サービスヘルストラッキング</strong>：外部AIサービスの可用性、セキュリティインシデント、ポリシー変更の監視
- <strong>脅威インテリジェンス統合</strong>：AIおよびMLセキュリティリスクに特化した脅威情報フィードの組み込み

#### <strong>アクセス制御と最小権限</strong>
- <strong>コンポーネントレベルの権限</strong>：業務必要性に基づいてモデル、データ、サービスへのアクセスを制限
- <strong>サービスアカウント管理</strong>：必要最小限の権限を持つ専用サービスアカウントを実装
- <strong>ネットワーク分離</strong>：AIコンポーネントの分離とサービス間のネットワークアクセス制限
- **APIゲートウェイ制御**：外部AIサービスへのアクセスを制御および監視する中央APIゲートウェイの利用

#### <strong>インシデント対応と復旧</strong>
- <strong>迅速な対応手順</strong>：侵害されたAIコンポーネントの修正または交換のための確立されたプロセス
- <strong>認証情報のローテーション</strong>：シークレット、APIキー、サービス認証情報を自動的にローテーション
- <strong>ロールバック機能</strong>：既知の安全な以前のAIコンポーネントバージョンへの迅速な復旧能力
- <strong>サプライチェーン侵害からの復旧</strong>：上流AIサービスの侵害に対応する特化手順

### Microsoftのセキュリティツールと統合

**GitHub Advanced Security** は包括的なサプライチェーン保護を提供し、以下を含みます：
- <strong>シークレットスキャン</strong>：リポジトリ内の資格情報、APIキー、トークンの自動検出
- <strong>依存関係スキャン</strong>：オープンソース依存関係およびライブラリの脆弱性評価
- **CodeQL分析**：セキュリティ脆弱性およびコーディング問題の静的コード解析
- <strong>サプライチェーンの洞察</strong>：依存関係の健全性とセキュリティ状態の可視化

**Azure DevOps＆Azure Repos統合:**
- Microsoft開発プラットフォーム全体でのシームレスなセキュリティスキャン統合
- AIワークロード向けのAzure Pipelinesにおける自動セキュリティチェック
- 安全なAIコンポーネント展開のためのポリシー適用

**Microsoft社内部の実践:**
Microsoftはすべての製品で広範囲なサプライチェーンセキュリティ実践を実施しています。実証済みのアプローチは [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/) をご覧ください。


## 基盤セキュリティのベストプラクティス

MCPの実装は組織の既存のセキュリティ姿勢を継承し拡張します。基盤となるセキュリティ実践の強化は、AIシステムおよびMCP配備の全体的なセキュリティを大幅に向上させます。

### 中核的なセキュリティ基盤

#### <strong>安全な開発実践</strong>
- **OWASP準拠**：[OWASP Top 10](https://owasp.org/www-project-top-ten/)によるウェブアプリケーション脆弱性から保護
- **AI固有の保護**：[OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) に基づくコントロールの実装
- <strong>安全なシークレット管理</strong>：トークン、APIキー、機密設定データ用の専用ボールトの使用
- <strong>エンドツーエンド暗号化</strong>：すべてのアプリケーションコンポーネントとデータフロー間で安全な通信を実装
- <strong>入力検証</strong>：すべてのユーザー入力、APIパラメーター、データソースの厳格な検証

#### <strong>インフラストラクチャ強化</strong>
- <strong>多要素認証</strong>：すべての管理およびサービスアカウントに必須のMFA
- <strong>パッチ管理</strong>：OS、フレームワーク、依存関係の自動かつ迅速なパッチ適用  
- **IDプロバイダー統合**：企業IDプロバイダー（Microsoft Entra ID、Active Directory）による集中ID管理
- <strong>ネットワーク分離</strong>：MCPコンポーネントの論理的分離によりラテラルムーブメントのリスクを制限
- <strong>最小権限の原則</strong>：すべてのシステムコンポーネントとアカウントに必要最小限の権限だけを付与

#### <strong>セキュリティ監視と検出</strong>
- <strong>包括的ログ記録</strong>：MCPのクライアント-サーバーインタラクションを含むAIアプリケーション活動の詳細ログ記録
- **SIEM統合**：異常検出のための集中セキュリティ情報・イベント管理
- <strong>行動分析</strong>：システムおよびユーザーの異常行動パターン検出にAIを活用した監視
- <strong>脅威インテリジェンス</strong>：外部の脅威フィードおよび侵害インジケーター(IOC)の統合
- <strong>インシデント対応</strong>：セキュリティインシデントの検出、対応、および復旧のための明確な手順

#### <strong>ゼロトラストアーキテクチャ</strong>
- <strong>信頼しないことを前提に常に検証</strong>：ユーザー、デバイス、ネットワーク接続を継続的に検証
- <strong>マイクロセグメンテーション</strong>：個別のワークロードおよびサービスを分離する細分化されたネットワーク制御
- <strong>アイデンティティ中心のセキュリティ</strong>：ネットワーク位置ではなく検証済みのアイデンティティに基づくセキュリティポリシー
- <strong>継続的リスク評価</strong>：現在のコンテキストと行動に基づく動的なセキュリティ姿勢評価
- <strong>条件付きアクセス</strong>：リスク要因、場所、デバイスの信頼に応じて適応するアクセス制御

### エンタープライズ統合パターン

#### **Microsoftセキュリティエコシステムの統合**
- **Microsoft Defender for Cloud**：包括的なクラウドセキュリティ姿勢管理
- **Azure Sentinel**：AIワークロード保護のためのクラウドネイティブなSIEMおよびSOAR機能
- **Microsoft Entra ID**：条件付きアクセスポリシーを備えた企業向けアイデンティティとアクセス管理
- **Azure Key Vault**：ハードウェアセキュリティモジュール(HSM)対応の集中シークレット管理
- **Microsoft Purview**：AIデータソースおよびワークフローのデータガバナンスとコンプライアンス

#### <strong>コンプライアンスとガバナンス</strong>
- <strong>規制遵守</strong>：MCP実装が業界特有のコンプライアンス要件（GDPR、HIPAA、SOC 2）を確実に満たすこと

- <strong>データ分類</strong>: AIシステムで処理される機密データの適切な分類と取り扱い  
- <strong>監査ログ</strong>: 規制遵守およびフォレンジック調査のための包括的なログ記録  
- <strong>プライバシー制御</strong>: AIシステムアーキテクチャにおけるプライバシーバイデザイン原則の実装  
- <strong>変更管理</strong>: AIシステムの変更に対する正式なセキュリティレビューのプロセス  

これらの基盤となる実践は、堅牢なセキュリティ基盤を形成し、MCP固有のセキュリティコントロールの効果を高め、AI駆動アプリケーションに包括的な保護を提供します。  

## 主要なセキュリティのポイント  

- <strong>多層防御アプローチ</strong>: 基盤的なセキュリティプラクティス（安全なコーディング、最小特権、サプライチェーン検証、継続的監視）とAI特有のコントロールを組み合わせて包括的な保護を実現  

- **AI固有の脅威環境**: MCPシステムは、プロンプトインジェクション、ツール中毒、セッションハイジャック、混乱デピュティ問題、トークンパススルー脆弱性、過剰な権限など、専門的な緩和策を必要とする独自のリスクに直面  

- <strong>認証と認可の優秀性</strong>: 外部アイデンティティプロバイダー（Microsoft Entra ID）を用いた強固な認証を実装し、適切なトークン検証を強制、MCPサーバー用に明示的に発行されていないトークンは決して受け入れない  

- **AI攻撃防御**: Microsoft Prompt Shields と Azure Content Safety を展開して間接的なプロンプトインジェクションやツール中毒攻撃から防御し、ツールのメタデータを検証し動的な変化を監視  

- **セッション＆通信のセキュリティ**: ユーザーIDに紐づく暗号的に安全で非決定的なセッションIDを使用し、適切なセッションライフサイクル管理を実装し、認証にセッションを使用しない  

- **OAuthのセキュリティベストプラクティス**: 動的登録クライアントに対して明示的なユーザー同意を得ることで混乱デピュティ攻撃を防止し、PKCEを備えたOAuth 2.1の適切な実装と厳格なリダイレクトURI検証を行う  

- <strong>トークンのセキュリティ原則</strong>: トークンパススルーのアンチパターンを回避し、トークンのオーディエンスクレームを検証し、短寿命トークンの安全なローテーションを実装し、明確な信頼境界を維持  

- <strong>包括的なサプライチェーンセキュリティ</strong>: モデル、埋め込み、コンテキストプロバイダー、外部APIなど、すべてのAIエコシステムコンポーネントを従来のソフトウェア依存関係と同様のセキュリティ厳格さで取り扱う  

- <strong>継続的な進化</strong>: 急速に進化するMCP仕様を常に更新し、セキュリティコミュニティの標準に貢献し、プロトコルの成熟に応じて適応的なセキュリティ姿勢を維持  

- **Microsoftのセキュリティ統合**: Microsoftの包括的なセキュリティエコシステム（Prompt Shields、Azure Content Safety、GitHub Advanced Security、Entra ID）を活用してMCP展開の保護を強化  

## 包括的なリソース  

### **公式MCPセキュリティドキュメント**  
- [MCP仕様（最新版: 2025-11-25）](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [MCPセキュリティベストプラクティス](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [MCP認可仕様](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  
- [MCP GitHubリポジトリ](https://github.com/modelcontextprotocol)  

### **OWASP MCPセキュリティリソース**  
- [OWASP MCP Azureセキュリティガイド](https://microsoft.github.io/mcp-azure-security-guide/) - Azure実装ガイダンス付きの包括的なOWASP MCPトップ10  
- [OWASP MCPトップ10](https://owasp.org/www-project-mcp-top-10/) - 公式OWASP MCPセキュリティリスク  
- [MCPセキュリティサミットワークショップ（Sherpa）](https://azure-samples.github.io/sherpa/) - Azure上のMCP向け実践的セキュリティトレーニング  

### **セキュリティ標準＆ベストプラクティス**  
- [OAuth 2.0セキュリティベストプラクティス（RFC 9700）](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASPトップ10ウェブアプリケーションセキュリティ](https://owasp.org/www-project-top-ten/)  
- [大型言語モデル向けOWASPトップ10](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- [Microsoftデジタルディフェンスレポート](https://aka.ms/mddr)  

### **AIセキュリティリサーチ＆分析**  
- [MCPにおけるプロンプトインジェクション（Simon Willison）](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)  
- [ツール中毒攻撃（Invariant Labs）](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)  
- [MCPセキュリティリサーチブリーフィング（Wiz Security）](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)  

### **Microsoftセキュリティソリューション**  
- [Microsoft Prompt Shieldsドキュメント](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safetyサービス](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Microsoft Entra IDセキュリティ](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  
- [Azureトークン管理ベストプラクティス](https://learn.microsoft.com/entra/identity-platform/access-tokens)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  

### **実装ガイド＆チュートリアル**  
- [Azure API ManagementをMCP認証ゲートウェイとして利用](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
- [Microsoft Entra ID認証とMCPサーバー](https://den.dev/blog/mcp-server-auth-entra-id-session/)  
- [安全なトークン保存と暗号化（ビデオ）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

### **DevOps＆サプライチェーンセキュリティ**  
- [Azure DevOpsセキュリティ](https://azure.microsoft.com/products/devops)  
- [Azure Reposセキュリティ](https://azure.microsoft.com/products/devops/repos/)  
- [Microsoftのサプライチェーンセキュリティの軌跡](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)  

## <strong>追加のセキュリティドキュメント</strong>  

包括的なセキュリティ指針については、このセクションの専門資料を参照してください：  

- **[MCPセキュリティベストプラクティス2025](./mcp-security-best-practices-2025.md)** - MCP実装向けの完全なセキュリティベストプラクティス  
- **[Azure Content Safety実装](./azure-content-safety-implementation.md)** - Azure Content Safety統合の実用的な実装例  
- **[MCPセキュリティコントロール2025](./mcp-security-controls-2025.md)** - MCP展開向け最新のセキュリティコントロールと手法  
- **[MCPベストプラクティスクイックリファレンス](./mcp-best-practices.md)** - 重要なMCPセキュリティプラクティスのクイックリファレンスガイド  
- **[BlueHat 2026: AIの未来を守る：深層防御パターンによるMCP保護](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Microsoftセキュリティレスポンスセンター（MSRC）による防御の深層パターン  

### <strong>実践的セキュリティトレーニング</strong>  

- **[MCPセキュリティサミットワークショップ（Sherpa）](https://azure-samples.github.io/sherpa/)** - Base CampからSummitまで段階的に学べるAzure上のMCPセキュリティ総合ハンズオンワークショップ  
- **[OWASP MCP Azureセキュリティガイド](https://microsoft.github.io/mcp-azure-security-guide/)** - OWASP MCPトップ10リスクのリファレンスアーキテクチャと実装ガイダンス  

---

## 次のステップ  

次へ: [第3章: はじめに](../03-GettingStarted/README.md)  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->