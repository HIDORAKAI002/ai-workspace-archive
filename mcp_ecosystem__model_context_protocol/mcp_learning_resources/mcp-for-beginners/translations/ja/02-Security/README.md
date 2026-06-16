# MCP セキュリティ：AI システムの包括的な保護

[![MCP Security Best Practices](../../../translated_images/ja/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(上記の画像をクリックすると、このレッスンの動画を視聴できます)_

セキュリティは AI システム設計の基本であり、そのため本セクションを第二章として優先しています。これは Microsoft の [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) の **Secure by Design** 原則と一致しています。

Model Context Protocol（MCP）は、AI 駆動アプリケーションに強力な新機能をもたらす一方で、従来のソフトウェアリスクを超える独自のセキュリティ課題も導入します。MCP システムは確立されたセキュリティ懸念（安全なコーディング、最小権限、サプライチェーンセキュリティ）と、プロンプトインジェクション、ツール中毒、セッションハイジャック、混乱代理攻撃、トークンパススルーの脆弱性、動的機能変更などの新しい AI 特有の脅威の両方に直面しています。

このレッスンでは、MCP 実装における最も重要なセキュリティリスクを探り、認証、認可、過剰な権限、間接的なプロンプトインジェクション、セッションセキュリティ、混乱代理問題、トークン管理、およびサプライチェーンの脆弱性をカバーします。Microsoft の Prompt Shields、Azure Content Safety、GitHub Advanced Security などの Microsoft ソリューションを活用しながら、これらのリスクを軽減するための実践的な対策とベストプラクティスを学びます。

## 学習目標

このレッスンの終了時には、以下ができるようになります：

- **MCP 特有の脅威を識別する**：プロンプトインジェクション、ツール中毒、過剰権限、セッションハイジャック、混乱代理問題、トークンパススルーの脆弱性、およびサプライチェーンリスクなど、MCP システムに特有なセキュリティリスクを認識する
- <strong>セキュリティコントロールを適用する</strong>：強固な認証、最小権限アクセス、安全なトークン管理、セッションセキュリティコントロール、およびサプライチェーン検証を含む効果的な対策を実装する
- **Microsoft のセキュリティソリューションを活用する**：Microsoft Prompt Shields、Azure Content Safety、GitHub Advanced Security を理解し、MCP ワークロード保護のために展開する
- <strong>ツールセキュリティを検証する</strong>：ツールのメタデータ検証の重要性、動的変更の監視、および間接的なプロンプトインジェクション攻撃への防御を認識する
- <strong>ベストプラクティスを統合する</strong>：確立されたセキュリティの基本（安全なコーディング、サーバーハードニング、ゼロトラスト）と MCP 固有のコントロールを組み合わせて包括的な保護を実現する

# MCP セキュリティアーキテクチャとコントロール

最新の MCP 実装には、従来のソフトウェアセキュリティと AI 特有の脅威の両方に対応する層状のセキュリティアプローチが必要です。急速に進化する MCP 仕様はセキュリティコントロールを成熟させ続けており、企業のセキュリティアーキテクチャおよび確立されたベストプラクティスとのより良い統合を可能にしています。

[Microsoft Digital Defense Report](https://aka.ms/mddr) の調査によると、<strong>報告された侵害の98%は堅牢なセキュリティ衛生によって防止可能</strong>です。最も効果的な保護戦略は、基礎的なセキュリティプラクティスと MCP 固有のコントロールを組み合わせたものであり、検証されたベースラインセキュリティ措置が全体的なリスク低減に最も効果的であることが示されています。

## 現状のセキュリティ状況

> <strong>注意：</strong>この情報は **2026年2月5日** 時点の MCP セキュリティ標準を反映しており、**MCP Specification 2025-11-25** に準拠しています。MCP プロトコルは急速に進化を続けており、将来的な実装では新たな認証パターンや強化されたコントロールが導入される可能性があります。最新の案内については常に現在の [MCP Specification](https://spec.modelcontextprotocol.io/)、[MCP GitHub repository](https://github.com/modelcontextprotocol)、および [セキュリティベストプラクティスドキュメント](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) を参照してください。

## 🏔️ MCP セキュリティサミットワークショップ（Sherpa）

<strong>実践的なセキュリティトレーニング</strong>として、Microsoft Azure 上の MCP サーバーを保護するための包括的なガイド付き探検である **MCP セキュリティサミットワークショップ**（Sherpa）を強く推奨します。

### ワークショップ概要

[MCP セキュリティサミットワークショップ](https://azure-samples.github.io/sherpa/) は、実証済みの「脆弱 → 攻撃 → 修正 → 検証」方法論を通じた実践的かつ具体的なセキュリティ教育を提供します。内容は以下の通りです：

- <strong>破壊を通じた学習</strong>：意図的に脆弱なサーバーを攻撃して脆弱性を体験
- **Azure ネイティブのセキュリティ活用**：Azure Entra ID、Key Vault、API Management、AI Content Safety を活用
- <strong>多層防御の進行</strong>：キャンプを進みながら包括的なセキュリティレイヤーを構築
- **OWASP 標準の適用**：[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) すべての技術にマッピング
- <strong>実働コードの提供</strong>：動作確認済みの実装を持ち帰る

### 探検ルート

| キャンプ | フォーカス | 対応する OWASP リスク |
|------|-------|---------------------|
| <strong>ベースキャンプ</strong> | MCP 基本および認証の脆弱性 | MCP01, MCP07 |
| **キャンプ 1: アイデンティティ** | OAuth 2.1、Azure 管理アイデンティティ、Key Vault | MCP01, MCP02, MCP07 |
| **キャンプ 2: ゲートウェイ** | API Management、プライベートエンドポイント、ガバナンス | MCP02, MCP06, MCP07, MCP09 |
| **キャンプ 3: 入出力セキュリティ** | プロンプトインジェクション、PII 保護、コンテンツセーフティ | MCP03, MCP05, MCP06, MCP10 |
| **キャンプ 4: 監視** | ログ分析、ダッシュボード、脅威検出 | MCP04, MCP08 |
| <strong>サミット</strong> | レッドチーム／ブルーチーム統合テスト | 全て |

<strong>開始はこちら</strong>： [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP Top 10 セキュリティリスク

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) では、MCP 実装における最も重大な10のセキュリティリスクを詳細に説明しています：

| リスク | 説明 | Azure の対策 |
|------|-------------|------------------|
| **MCP01** | トークン管理不備およびシークレット露出 | Azure Key Vault、Managed Identity |
| **MCP02** | スコープの拡大による特権昇格 | RBAC、条件付きアクセス |
| **MCP03** | ツール中毒 | ツールの検証、整合性確認 |
| **MCP04** | ソフトウェアサプライチェーン攻撃および依存関係改ざん | GitHub Advanced Security、依存関係スキャン |
| **MCP05** | コマンドインジェクションおよび実行 | 入力検証、サンドボックス化 |
| **MCP06** | 意図のフロー乗っ取り | Azure AI Content Safety、Prompt Shields |
| **MCP07** | 不十分な認証および認可 | Azure Entra ID、PKCE付き OAuth 2.1 |
| **MCP08** | 監査およびテレメトリの欠如 | Azure Monitor、Application Insights |
| **MCP09** | シャドウ MCP サーバー | API センターガバナンス、ネットワーク分離 |
| **MCP10** | コンテキストインジェクションおよび過剰共有 | データ分類、最小限の公開 |

### MCP 認証の進化

MCP 仕様は認証と認可のアプローチにおいて大きく進化しています：

- <strong>初期のアプローチ</strong>：早期仕様では開発者がカスタム認証サーバーを実装し、MCP サーバーは OAuth 2.0 認可サーバーとしてユーザー認証を直接管理していました
- **現在の標準（2025-11-25）**：MCP サーバーは外部のアイデンティティプロバイダー（Microsoft Entra ID など）に認証を委任できるようになり、セキュリティ態勢が向上し実装の複雑性が軽減されました
- <strong>トランスポート層のセキュリティ</strong>：ローカル（STDIO）およびリモート（Streamable HTTP）接続のための適切な認証パターンを伴う安全な輸送機構の強化

## 認証および認可のセキュリティ

### 現在のセキュリティ課題

最新の MCP 実装は、複数の認証および認可に関わる課題に直面しています：

### リスクと攻撃ベクトル

- <strong>誤設定された認可ロジック</strong>：MCP サーバーでの不適切な認可実装により、機密データが暴露され、アクセス制御が誤って適用される可能性
- **OAuth トークンの侵害**：ローカル MCP サーバーのトークン窃盗により、攻撃者がサーバーを偽装し下流サービスへアクセス可能
- <strong>トークンパススルーの脆弱性</strong>：不適切なトークン処理がセキュリティ制御のバイパスや説明責任のギャップを生む
- <strong>過剰権限</strong>：権限の過剰付与により最小権限原則が破られ、攻撃対象範囲が拡大

#### トークンパススルー：重大なアンチパターン

現在の MCP 認可仕様では、<strong>トークンパススルーは明確に禁止</strong>されています。これは深刻なセキュリティ問題を引き起こすためです：

##### セキュリティコントロールの回避
- MCP サーバーおよび下流 API は、正しいトークン検証に依存してレート制限、リクエスト検証、トラフィック監視などの重要なセキュリティコントロールを実装しています
- クライアントから API への直接的なトークン使用は、これらの基本的な保護策を回避し、セキュリティアーキテクチャを損ないます

##### 責任追跡および監査の困難
- MCP サーバーは、上流で発行されたトークンを使用するクライアントを識別できず、監査ログが破綻します
- 下流リソースサーバーのログは誤ったリクエスト発信元を示し、実際の MCP サーバー仲介者を隠蔽します
- インシデント調査やコンプライアンスの監査が著しく困難になります

##### データ流出リスク
- 検証されていないトークン要求により、盗まれたトークンを使った悪意ある者が MCP サーバーをデータ持ち出しのプロキシとして利用できる
- 信頼境界が破壊され、不正アクセスパターンがセキュリティ制御を回避します

##### 複数サービスを横断する攻撃ベクトル
- 複数のサービスが同一の侵害トークンを受け入れることで、連携システム間で横展開が可能に
- トークン発行元が検証できない場合、サービス間の信頼前提が破壊されることがあります

### セキュリティコントロールと対策

**重要なセキュリティ要件：**

> <strong>必須</strong>：MCP サーバーは MCP サーバー向けに明示的に発行された以外のトークンを<strong>絶対に受け入れてはならない</strong>

#### 認証および認可コントロール

- <strong>厳密な認可レビュー</strong>：MCP サーバーの認可ロジックの包括的な監査を実施し、想定外のユーザーやクライアントが機密リソースにアクセスできないようにする
  - <strong>実装ガイド</strong>：[Azure API Management を MCP サーバーの認証ゲートウェイとして使用する方法](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - <strong>アイデンティティ統合</strong>：[Microsoft Entra ID を用いた MCP サーバー認証](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- <strong>安全なトークン管理</strong>：[Microsoft のトークン検証とライフサイクルベストプラクティス](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) を実装
  - トークンのオーディエンスクレームが MCP サーバーの ID と一致することを検証
  - 適切なトークンローテーションおよび有効期限ポリシーを実施
  - トークンのリプレイ攻撃および不正使用を防止

- <strong>保護されたトークンストレージ</strong>：保存時および転送時の暗号化を施した安全なトークン保管
  - <strong>ベストプラクティス</strong>：[安全なトークンストレージと暗号化のガイドライン](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### アクセス制御の実装

- <strong>最小権限の原則</strong>：MCP サーバーに対して必要な機能に最低限の権限のみを付与
  - 定期的な権限レビューと更新により特権の拡大を防止
  - **Microsoft ドキュメント**：[Secure Least-Privileged Access](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **役割ベースアクセス制御 (RBAC)**：細かく制御された役割割り当てを実装
  - 特定のリソースおよび操作に役割の範囲を限定
  - 攻撃対象を広げる過剰または不必要な権限を避ける

- <strong>継続的な権限監視</strong>：アクセスの継続的な監査と監視を実施
  - 異常な権限利用パターンを監視
  - 過剰または未使用の権限を速やかに是正

## AI 固有のセキュリティ脅威

### プロンプトインジェクションとツール操作攻撃

最新の MCP 実装は、従来のセキュリティ対策では完全に対応できない高度な AI 特有の攻撃ベクトルに直面しています：

#### **間接プロンプトインジェクション（クロスドメインプロンプトインジェクション）**

<strong>間接プロンプトインジェクション</strong>は、MCP 対応 AI システムにおける最も深刻な脆弱性の一つです。攻撃者は、外部コンテンツ（文書、ウェブページ、メール、データソース）に悪意のある命令を埋め込み、AI システムがそれらを正当なコマンドとして処理させます。

**攻撃シナリオ：**
- <strong>文書ベースのインジェクション</strong>：処理対象の文書に潜む悪意の命令が意図しない AI 動作を引き起こす
- <strong>ウェブコンテンツの悪用</strong>：スクレイピング時に埋め込まれたプロンプトが AI 行動を操作
- <strong>メール攻撃</strong>：AI アシスタントが情報漏洩や権限のない操作を行うように誘導する悪意あるメール内のプロンプト
- <strong>データソースの汚染</strong>：汚染されたデータベースや API が AI システムへ不正なコンテンツを提供

<strong>実世界の影響</strong>：これらはデータ持ち出し、プライバシー侵害、有害コンテンツ生成、ユーザー操作の悪用につながる可能性があります。詳細は [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/) をご覧ください。

![Prompt Injection Attack Diagram](../../../translated_images/ja/prompt-injection.ed9fbfde297ca877.webp)

#### <strong>ツール中毒攻撃</strong>

<strong>ツール中毒</strong>は MCP ツールを定義するメタデータを標的とし、LLM がツールの説明やパラメーターを解釈して実行を決定する方法を悪用します。

**攻撃メカニズム：**
- <strong>メタデータ操作</strong>：攻撃者が悪意のある命令をツールの説明、パラメーター定義、使用例に注入
- <strong>不可視指示</strong>：人間には見えないが AI モデルに処理されるツールメタデータ内の隠れたプロンプト
- **動的ツール変更（「ラグプル」）**：ユーザーが承認したツールが後で知らぬ間に悪意ある動作を行うよう変更される
- <strong>パラメーターインジェクション</strong>：モデルの振る舞いに影響を与えるツールパラメーター構造内に悪意のコンテンツが埋め込まれる

<strong>ホステッドサーバーのリスク</strong>：リモート MCP サーバーでは、ユーザー承認後にツール定義が更新されるリスクが高く、以前は安全だったツールが悪意あるものに変わるシナリオが存在します。詳細は [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) を参照してください。

![Tool Injection Attack Diagram](../../../translated_images/ja/tool-injection.3b0b4a6b24de6bef.webp)

#### **その他の AI 攻撃ベクトル**

- **クロスドメインプロンプトインジェクション（XPIA）**：複数ドメインのコンテンツを悪用し、セキュリティコントロールを回避する高度な攻撃
- <strong>動的能力変更</strong>: 初期のセキュリティ評価をすり抜けるツールの能力のリアルタイム変更
- <strong>コンテキストウィンドウ汚染</strong>: 大規模コンテキストウィンドウを操作して悪意ある指示を隠蔽する攻撃
- <strong>モデル混乱攻撃</strong>: モデルの制限を悪用し、予測不能または安全でない動作を引き起こす

### AIセキュリティリスクの影響

**高影響の結果:**
- <strong>データ流出</strong>: 企業・個人の機密データへの不正アクセスおよび窃取
- <strong>プライバシー侵害</strong>: 個人を特定可能な情報（PII）および機密業務データの露出  
- <strong>システム操作</strong>: 重要システムやワークフローの意図しない変更
- <strong>認証情報の窃取</strong>: 認証トークンやサービス認証情報の侵害
- <strong>横移動</strong>: 侵害されたAIシステムを足掛かりにしたネットワーク全体への攻撃

### Microsoft AIセキュリティソリューション

#### **AIプロンプトシールド：注入攻撃に対する高度な防御**

Microsoftの<strong>AIプロンプトシールド</strong>は、直接的かつ間接的なプロンプト注入攻撃に対して多層のセキュリティを提供します。

##### **コア保護メカニズム:**

1. **高度な検出＆フィルタリング**
   - 機械学習アルゴリズムと自然言語処理技術で外部コンテンツ内の悪意ある指示を検出
   - 文書、ウェブページ、メール、データソースのリアルタイム分析で埋め込まれた脅威を特定
   - 正当なプロンプトパターンと悪意あるパターンの文脈理解

2. <strong>スポットライト技術</strong>  
   - 信頼されたシステム指示と潜在的に侵害された外部入力を区別
   - テキスト変換メソッドでモデルの関連性を向上させつつ悪意ある内容を分離
   - AIシステムが適切な指示階層を維持し、注入された命令を無視するのに寄与

3. **区切り文字＆データマーキングシステム**
   - 信頼されたシステムメッセージと外部入力テキストの明確な境界線定義
   - 信頼できるデータソースと非信頼データソース間の境界を示す特殊マーカー
   - 指示の混乱や不正な命令実行を防止

4. <strong>継続的な脅威インテリジェンス</strong>
   - Microsoftは新興の攻撃パターンを監視し、防御を随時更新
   - 新しい注入手法や攻撃ベクトルの積極的な脅威ハンティング
   - 進化する脅威に対応するための定期的なセキュリティモデル更新

5. **Azure Content Safety統合**
   - 包括的なAzure AI Content Safetyスイートの一部
   - ジェイルブレイク試行、有害コンテンツ、セキュリティポリシー違反の追加検出
   - AIアプリケーションコンポーネント全体での統合セキュリティ制御

<strong>実装リソース</strong>: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/ja/prompt-shield.ff5b95be76e9c78c.webp)


## 高度なMCPセキュリティ脅威

### セッションハイジャックの脆弱性

<strong>セッションハイジャック</strong>は、状態を保持するMCP実装において、正当なセッション識別子を不正取得し悪用することで、クライアントを偽装し不正操作を行う重大な攻撃ベクトルです。

#### <strong>攻撃シナリオとリスク</strong>

- <strong>セッションハイジャックプロンプト注入</strong>: 盗まれたセッションIDを使い、セッション状態を共有するサーバーに悪意あるイベントを注入し、有害行動や機密データへのアクセスを引き起こす可能性
- <strong>直接ななりすまし</strong>: 盗用されたセッションIDにより認証を回避したMCPサーバー呼び出しが可能となり、攻撃者が正規ユーザーとして扱われる
- <strong>破損した再開可能ストリーム</strong>: 攻撃者が要求を途中で終了させることで、正規クライアントの再開時に悪意あるコンテンツを注入できる恐れ

#### <strong>セッション管理におけるセキュリティ制御</strong>

**重要要件:**
- <strong>認可検証</strong>: 認可を実装するMCPサーバーは全ての着信リクエストを検証し、認証にセッションを利用してはならない
- <strong>安全なセッション生成</strong>: 暗号学的に安全で非決定論的なセッションIDを、安全な乱数生成器で生成すること
- <strong>ユーザー固有バインディング</strong>: `<user_id>:<session_id>` の形式などでユーザー固有情報にセッションIDを結びつけ、ユーザー間のセッション悪用を防止
- <strong>セッションライフサイクル管理</strong>: 適切な有効期限、ローテーション、無効化を実装し脆弱性の期間を制限
- <strong>通信の保護</strong>: すべての通信は必ずHTTPSを使用し、セッションIDの傍受を防止

### 混乱代理問題

<strong>混乱代理問題</strong>は、MCPサーバーがクライアントとサードパーティサービス間の認証プロキシとして機能する際に、静的クライアントIDの悪用による認可回避の機会が生まれる現象です。

#### <strong>攻撃メカニズムとリスク</strong>

- **Cookieベースの同意回避**: 既存のユーザー認証により同意Cookieが作られ、攻撃者が細工したリダイレクトURIを用いた悪意ある認可リクエストで悪用
- <strong>認可コード窃取</strong>: 既存の同意Cookieにより認可サーバーが同意画面をスキップし、認可コードを攻撃者管理下のエンドポイントにリダイレクト
- **不正APIアクセス**: 窃取された認可コードでトークン交換し、明示的な承認なしにユーザーを偽装可能

#### <strong>緩和策</strong>

**必須制御:**
- <strong>明示的同意要求</strong>: 静的クライアントIDを用いるMCPプロキシサーバーは、動的に登録された各クライアントに対しユーザー同意を取得すること
- **OAuth 2.1準拠**: すべての認可リクエストに対してPKCE（Proof Key for Code Exchange）などの最新OAuthセキュリティベストプラクティスを実装
- <strong>クライアント検証の厳格化</strong>: リダイレクトURIやクライアント識別子の厳格な検証を実施し悪用を防止

### トークンパススルーの脆弱性

<strong>トークンパススルー</strong>は、MCPサーバーがクライアント発行のトークンを適切に検証せずに下流APIへ転送する明確なアンチパターンであり、MCP認可仕様に違反します。

#### <strong>セキュリティ上の影響</strong>

- <strong>制御回避</strong>: クライアントからAPIへの直接トークン使用が、重要なレート制限や検証・監視制御を回避
- <strong>監査記録の破壊</strong>: 上流発行トークンではクライアントの識別が不可能となり、インシデント調査に支障
- <strong>プロキシ経由のデータ流出</strong>: 未検証トークンにより、攻撃者がサーバーを無許可データアクセスのプロキシとして利用
- <strong>信頼境界の侵害</strong>: トークンの発行元が検証できず、下流サービスの信頼前提が破壊される
- <strong>マルチサービス攻撃拡大</strong>: 複数サービスでトークンが受け入れられ、横展開を許す

#### <strong>必須セキュリティ制御</strong>

**交渉不可の要件:**
- <strong>トークン検証</strong>: MCPサーバーはMCPサーバー自身に明示的に発行されたトークン以外は受け入れてはならない
- <strong>オーディエンス検証</strong>: トークンのaudクレームがMCPサーバーのIDであることを常に検証
- <strong>適切なトークンライフサイクル管理</strong>: 短命アクセス・トークンと安全なローテーションを実装

## AIシステムのサプライチェーンセキュリティ

サプライチェーンセキュリティは従来のソフトウェア依存に留まらず、AIエコシステム全体を包含するものへと進化しています。最新のMCP実装では、すべてのAI関連コンポーネントを厳密に検証・監視し、各コンポーネントが潜在的な脆弱性になりシステムの統合性を脅かさないようにすることが必須です。

### 拡張されたAIサプライチェーン構成要素

**従来のソフトウェア依存:**
- オープンソースライブラリとフレームワーク
- コンテナイメージとベースシステム  
- 開発ツールとビルドパイプライン
- インフラコンポーネントとサービス

**AI固有のサプライチェーン要素:**
- <strong>基盤モデル</strong>: さまざまなプロバイダーからの事前学習済みモデルで、出所検証が必要
- <strong>埋め込みサービス</strong>: 外部のベクトル化・セマンティック検索サービス
- <strong>コンテキストプロバイダー</strong>: データソース、知識ベース、文書リポジトリ  
- **サードパーティAPI**: 外部AIサービス、機械学習パイプライン、データ処理エンドポイント
- <strong>モデルアーティファクト</strong>: 重み、設定、ファインチューニング済みモデルのバリアント
- <strong>訓練データソース</strong>: モデル訓練と微調整に使用されるデータセット

### 包括的なサプライチェーンセキュリティ戦略

#### <strong>コンポーネント検証と信頼</strong>
- <strong>出所検証</strong>: すべてのAIコンポーネントの出所、ライセンス、完全性を統合前に検証
- <strong>セキュリティ評価</strong>: モデル、データソース、AIサービスの脆弱性スキャンとセキュリティレビューを実施
- <strong>評判分析</strong>: AIサービスプロバイダーのセキュリティ実績と運用を評価
- <strong>コンプライアンス検証</strong>: 組織のセキュリティおよび規制要件への準拠確認

#### <strong>安全なデプロイパイプライン</strong>  
- **自動化CI/CDセキュリティ**: 自動化デプロイパイプライン全体にわたるセキュリティスキャン統合
- <strong>アーティファクト完全性</strong>: 配備されるすべてのアーティファクト（コード、モデル、設定）に暗号的検証を適用
- <strong>段階的デプロイ</strong>: 各ステージでのセキュリティ検証を含む進行的な展開戦略
- <strong>信頼済みアーティファクトリポジトリ</strong>: 検証済み安全なアーティファクトレジストリからのみ配備

#### <strong>継続的監視と対応</strong>
- <strong>依存関係スキャン</strong>: すべてのソフトウェアおよびAIコンポーネント依存の脆弱性監視を継続
- <strong>モデル監視</strong>: モデル動作、性能変動、セキュリティ異常の継続的評価
- <strong>サービス稼働監視</strong>: 外部AIサービスの可用性、セキュリティインシデントおよびポリシー変更を監視
- <strong>脅威インテリジェンス統合</strong>: AI・MLセキュリティリスクに特化した脅威情報フィードの活用

#### <strong>アクセス制御と最小権限</strong>
- <strong>コンポーネント単位の許可</strong>: ビジネス必要性に基づきモデル、データ、サービスへのアクセスを制限
- <strong>サービスアカウント管理</strong>: 最小限の権限を持つ専用サービスアカウントを実装
- <strong>ネットワーク分割</strong>: AIコンポーネントを分離し、サービス間のネットワークアクセスを制限
- **APIゲートウェイ制御**: 外部AIサービスへのアクセスを集中管理し監視するAPIゲートウェイを使用

#### <strong>インシデント対応と復旧</strong>
- <strong>迅速な対応手順</strong>: 侵害されたAIコンポーネントを修正または置換する確立されたプロセス
- <strong>認証情報ローテーション</strong>: 秘密情報、APIキー、サービス認証情報の自動ローテーションシステム
- <strong>ロールバック機能</strong>: 既知の良好バージョンに即座に戻せる能力
- <strong>サプライチェーン侵害対応</strong>: 上流AIサービス侵害に特化した対応手順

### Microsoftのセキュリティツール＆統合

**GitHub Advanced Security** は包括的なサプライチェーン保護を提供し、以下を含みます:
- <strong>シークレットスキャン</strong>: リポジトリ内の認証情報、APIキー、トークンの自動検出
- <strong>依存関係スキャン</strong>: オープンソース依存関係やライブラリの脆弱性評価
- **CodeQL解析**: セキュリティ脆弱性やコーディング問題の静的コード解析
- <strong>サプライチェーンインサイト</strong>: 依存関係の健全性とセキュリティステータスの可視化

**Azure DevOps & Azure Repos統合:**
- Microsoft開発プラットフォーム全体でのシームレスなセキュリティスキャン統合
- AIワークロード向けAzureパイプラインでの自動セキュリティチェック
- 安全なAIコンポーネント配備のためのポリシー適用

**Microsoft内部の実践例:**
Microsoftは全製品で広範なサプライチェーンセキュリティを実装しています。詳細は[The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/) を参照してください。


## 基盤となるセキュリティベストプラクティス

MCP実装は組織の既存のセキュリティ姿勢を継承し拡張します。基盤的なセキュリティ慣行を強化することは、AIシステムとMCP展開の全体的な安全性を大幅に向上させます。

### コアセキュリティの基本

#### <strong>安全な開発プラクティス</strong>
- **OWASP準拠**: [OWASP Top 10](https://owasp.org/www-project-top-ten/) のウェブアプリケーション脆弱性防止
- **AI固有の保護**: [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)に対する対策実装
- <strong>秘密管理の徹底</strong>: トークン、APIキー、機密設定を専用の秘密保管庫で管理
- <strong>エンドツーエンド暗号化</strong>: すべてのアプリケーションコンポーネントおよびデータフローで安全な通信を実装
- <strong>入力検証</strong>: すべてのユーザー入力、APIパラメーター、データソースを厳密に検証

#### <strong>インフラ強化</strong>
- <strong>多要素認証</strong>: すべての管理者およびサービスアカウントに必須のMFA
- <strong>パッチ管理</strong>: OS、フレームワーク、依存関係の自動かつ迅速なパッチ適用  
- <strong>アイデンティティプロバイダー統合</strong>: Microsoft Entra IDやActive Directoryによる統合ID管理
- <strong>ネットワーク分割</strong>: MCPコンポーネントの論理分離により横展開を抑制
- <strong>最小権限の原則</strong>: すべてのシステムコンポーネント・アカウントに必要最小限の権限設定

#### <strong>セキュリティ監視と検知</strong>
- <strong>包括的ログ</strong>: MCPクライアントサーバー間の動作を含むAIアプリケーションの詳細なログ取得
- **SIEM統合**: 異常検知のための集中型セキュリティ情報・イベント管理
- <strong>行動解析</strong>: AIによるシステムおよびユーザーの異常パターン検知
- <strong>脅威インテリジェンス活用</strong>: 外部の脅威情報や侵害指標（IOC）の統合
- <strong>インシデント対応</strong>: セキュリティインシデントの検知、対応、復旧手順の整備

#### <strong>ゼロトラストアーキテクチャ</strong>
- **決して信頼せず、常に検証**: ユーザー、デバイス、ネットワーク接続を継続的に検証
- <strong>マイクロセグメンテーション</strong>: 個別のワークロードやサービスを隔離する詳細なネットワーク制御
- <strong>アイデンティティ中心のセキュリティ</strong>: ネットワークの場所ではなく検証済みアイデンティティに基づくポリシー
- <strong>継続的リスク評価</strong>: 現在の状況や行動に基づく動的なセキュリティ姿勢評価
- <strong>条件付きアクセス</strong>: リスク要因、場所、デバイス信頼性に応じてアクセス制御を適用

### エンタープライズ統合パターン

#### **Microsoftセキュリティエコシステム統合**
- **Microsoft Defender for Cloud**: 包括的なクラウドセキュリティ姿勢管理
- **Azure Sentinel**: AIワークロード保護のためのクラウドネイティブSIEMおよびSOAR機能
- **Microsoft Entra ID**: 条件付きアクセスを備えたエンタープライズアイデンティティとアクセス管理
- **Azure Key Vault**: ハードウェアセキュリティモジュール（HSM）対応の中央秘密管理
- **Microsoft Purview**: AIデータソースおよびワークフローのデータガバナンスとコンプライアンス

#### <strong>コンプライアンスとガバナンス</strong>
- <strong>規制対応</strong>: MCP実装が業界固有の規制要件（GDPR、HIPAA、SOC 2）を満たすことを保証
- <strong>データ分類</strong>: AIシステムで処理される機密データの適切な分類と取り扱い
- <strong>監査証跡</strong>: 規制対応およびフォレンジック調査のための包括的なログ記録
- <strong>プライバシー制御</strong>: AIシステム設計にプライバシー・バイ・デザインの原則を実装
- <strong>変更管理</strong>: AIシステム変更のセキュリティレビューを行う正式な手続き

これらの基盤的慣行はMCP固有のセキュリティ制御の効果を高め、AI駆動アプリケーションに対する包括的な保護を提供します。

## 主要なセキュリティ要点
- <strong>多層防御アプローチ</strong>: 基盤となるセキュリティ実践（セキュアコーディング、最小特権、サプライチェーン検証、継続的モニタリング）とAI特有のコントロールを組み合わせて包括的な保護を実現

- **AI特有の脅威環境**: MCPシステムは、プロンプトインジェクション、ツール毒性、セッションハイジャック、混乱代行問題、トークン透過脆弱性、過剰権限など、専門的な緩和策が必要な固有のリスクに直面

- <strong>認証と認可の卓越性</strong>: 外部アイデンティティプロバイダー（Microsoft Entra ID）を使用した堅牢な認証を実装し、適切なトークン検証を強制し、MCPサーバー専用に発行されていないトークンを絶対に受け入れない

- **AI攻撃防止**: Microsoft Prompt Shields と Azure Content Safety を展開して間接的なプロンプトインジェクションとツール毒性攻撃を防御しつつ、ツールメタデータの検証と動的変化の監視を実施

- <strong>セッションと通信のセキュリティ</strong>: 暗号的に安全で非決定論的なセッションIDをユーザーIDに紐付けて使用し、適切なセッションライフサイクル管理を行い、認証にセッションを使用しないこと

- **OAuthセキュリティベストプラクティス**: 動的登録クライアントに対する明示的ユーザー同意、PKCEを用いた適切なOAuth 2.1実装、および厳格なリダイレクトURI検証によって混乱代行攻撃を防止

- <strong>トークンセキュリティの原則</strong>: トークン透過のアンチパターンを避け、トークンのオーディエンスクレームを検証し、短期間の有効期限を持つトークンの安全なローテーションを実装し、明確な信頼境界を維持

- <strong>包括的なサプライチェーンセキュリティ</strong>: AIエコシステムのすべてのコンポーネント（モデル、埋め込み、コンテキストプロバイダー、外部API）を従来のソフトウェア依存関係と同様の厳密なセキュリティで扱う

- <strong>継続的進化</strong>: 急速に進化するMCP仕様に常に追従し、セキュリティコミュニティ標準に貢献し、プロトコルの成熟に伴って適応的なセキュリティ態勢を維持

- **Microsoftセキュリティ統合**: Microsoftの包括的なセキュリティエコシステム（Prompt Shields、Azure Content Safety、GitHub Advanced Security、Entra ID）を活用してMCP展開の保護を強化

## 包括的リソース

### **公式MCPセキュリティドキュメント**
- [MCP仕様 (現行: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCPセキュリティベストプラクティス](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP認可仕様](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHubリポジトリ](https://github.com/modelcontextprotocol)

### **OWASP MCPセキュリティリソース**
- [OWASP MCP Azureセキュリティガイド](https://microsoft.github.io/mcp-azure-security-guide/) - Azure実装ガイダンス付きの包括的OWASP MCP Top 10
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - 公式OWASP MCPセキュリティリスク
- [MCPセキュリティサミットワークショップ (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure上でのMCP向けハンズオンセキュリティトレーニング

### **セキュリティ標準＆ベストプラクティス**
- [OAuth 2.0セキュリティベストプラクティス (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 ウェブアプリケーションセキュリティ](https://owasp.org/www-project-top-ten/)
- [大型言語モデル向けOWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft デジタルディフェンスレポート](https://aka.ms/mddr)

### **AIセキュリティ研究＆分析**
- [MCPにおけるプロンプトインジェクション (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [ツール毒性攻撃 (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCPセキュリティ研究ブリーフィング (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoftセキュリティソリューション**
- [Microsoft Prompt Shieldsドキュメント](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safetyサービス](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra IDセキュリティ](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azureトークン管理ベストプラクティス](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **実装ガイド＆チュートリアル**
- [Azure API ManagementをMCP認証ゲートウェイとして活用](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID認証とMCPサーバー](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [安全なトークンストレージと暗号化（ビデオ）](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps＆サプライチェーンセキュリティ**
- [Azure DevOpsセキュリティ](https://azure.microsoft.com/products/devops)
- [Azure Reposセキュリティ](https://azure.microsoft.com/products/devops/repos/)
- [Microsoftサプライチェーンセキュリティの歩み](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## <strong>追加セキュリティドキュメント</strong>

包括的なセキュリティガイダンスについては、このセクションの専門文書を参照してください:

- **[MCPセキュリティベストプラクティス2025](./mcp-security-best-practices-2025.md)** - MCP実装に関する完全なセキュリティベストプラクティス
- **[Azure Content Safety実装](./azure-content-safety-implementation.md)** - Azure Content Safety統合の実用的な実装例  
- **[MCPセキュリティコントロール2025](./mcp-security-controls-2025.md)** - MCP導入のための最新セキュリティコントロールと技術
- **[MCPベストプラクティスクイックリファレンス](./mcp-best-practices.md)** - 重要なMCPセキュリティ実践のクイックリファレンスガイド
- **[BlueHat 2026: AIの未来を守る：多層防御パターンでMCPを保護](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Microsoft Security Response Center (MSRC)による深層的防御パターン

### <strong>実践型セキュリティトレーニング</strong>

- **[MCPセキュリティサミットワークショップ (Sherpa)](https://azure-samples.github.io/sherpa/)** - Base CampからSummitまで進行するAzure上のMCPサーバー保護の包括的ハンズオンワークショップ
- **[OWASP MCP Azureセキュリティガイド](https://microsoft.github.io/mcp-azure-security-guide/)** - すべてのOWASP MCP Top 10リスクに対するリファレンスアーキテクチャと実装ガイダンス

---

## 次に進む

次: [第3章: はじめに](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->