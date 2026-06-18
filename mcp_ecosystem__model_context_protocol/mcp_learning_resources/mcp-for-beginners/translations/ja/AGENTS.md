# AGENTS.md

## プロジェクト概要

**MCP for Beginners** は、Model Context Protocol (MCP) を学ぶためのオープンソースの教育カリキュラムです。MCPはAIモデルとクライアントアプリケーション間のやり取りの標準化フレームワークです。本リポジトリは複数のプログラミング言語にまたがる実用的なコード例を含む包括的な学習資料を提供します。

### 主要技術

- <strong>プログラミング言語</strong>: C#, Java, JavaScript, TypeScript, Python, Rust
- **フレームワーク & SDK**:
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- <strong>データベース</strong>: pgvector拡張付きPostgreSQL
- <strong>クラウドプラットフォーム</strong>: Azure（Container Apps、OpenAI、Content Safety、Application Insights）
- <strong>ビルドツール</strong>: npm、Maven、pip、Cargo
- <strong>ドキュメント</strong>: Markdown + 自動多言語翻訳（48言語以上）

### アーキテクチャ

- **11コアモジュール（00-11）**: 基礎から高度まで順序立てた学習パス
- <strong>ハンズオンラボ</strong>: 複数言語に対応した実践演習と完全な解答コード
- <strong>サンプルプロジェクト</strong>: 実動作するMCPサーバー・クライアント実装
- <strong>翻訳システム</strong>: GitHub Actionsによる自動多言語対応ワークフロー
- <strong>画像資産</strong>: 集中管理された画像ディレクトリと翻訳版

## セットアップコマンド

本リポジトリはドキュメント重視です。セットアップは主に各サンプルプロジェクトやラボ内で行います。

### リポジトリセットアップ

```bash
# リポジトリをクローンする
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### サンプルプロジェクトの利用

サンプルプロジェクトの場所は以下の通りです:
- `03-GettingStarted/samples/` - 言語別サンプル
- `03-GettingStarted/01-first-server/solution/` - 初期サーバー実装
- `03-GettingStarted/02-client/solution/` - クライアント実装
- `11-MCPServerHandsOnLabs/` - 総合的なデータベース統合ラボ

各サンプルプロジェクト内にセットアップ手順があります：

#### TypeScript/JavaScriptプロジェクト
```bash
cd <project-directory>
npm install
npm start
```

#### Pythonプロジェクト
```bash
cd <project-directory>
pip install -r requirements.txt
# または
pip install -e .
python main.py
```

#### Javaプロジェクト
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## 開発ワークフロー

### ドキュメント構成

- **モジュール 00-11**: 順序付きの基本カリキュラムコンテンツ
- **translations/**: 言語別版（自動生成のため直接編集禁止）
- **translated_images/**: ローカライズ済み画像（自動生成）
- **images/**: ソース画像・図版

### ドキュメント変更手順

1. ルートモジュールディレクトリ（00-11）の英語Markdownのみ編集
2. 必要に応じて `images/` ディレクトリ内の画像を更新
3. co-op-translator GitHub Actionが自動で翻訳生成
4. mainブランチへのプッシュで翻訳が再生成されます

### 翻訳作業について

- <strong>自動翻訳</strong>: GitHub Actionsワークフローが翻訳を全て担当
- `translations/`ディレクトリのファイルを手動で編集しないこと
- 翻訳メタデータは各ファイルに埋め込み済み
- 対応言語は48以上（アラビア語、中国語、フランス語、ドイツ語、ヒンディー語、日本語、韓国語、ポルトガル語、ロシア語、スペイン語など多数）

## テスト手順

### ドキュメント検証

本リポジトリは主にドキュメントのため、テストは以下に重点を置きます：

1. <strong>リンク検証</strong>: 全内部リンクの正常動作確認
```bash
# 壊れたマークダウンリンクをチェックする
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. <strong>コード例検証</strong>: コードサンプルがコンパイル・実行されるか確認
```bash
# 特定のサンプルに移動してそのテストを実行する
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Markdown整形チェック**: フォーマットの一貫性検査
```bash
# 必要に応じてmarkdownlintを使用してください
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### サンプルプロジェクトのテスト

言語ごとのサンプルに独自のテスト手法があります：

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## コードスタイルガイドライン

### ドキュメントスタイル

- 分かりやすく初心者向けの言葉を使用
- 複数言語のコード例を含める
- Markdownのベストプラクティスに従う：
  - ATX式見出し（`#`構文）
  - 言語指定付きフェンス付きコードブロック
  - 画像の説明的altテキストを付与
  - 行の長さは妥当な範囲内（明確な制限はなし）

### コード例スタイル

#### TypeScript/JavaScript
- ESモジュール (`import`/`export`) を使用
- TypeScriptの厳格モード慣習に従う
- 型注釈を付ける
- ES2022をターゲット

#### Python
- PEP 8スタイルガイドを遵守
- 適切な型ヒントを使用
- 関数・クラスにドキュメンテーション文字列を含める
- Python 3.8以降のモダン機能を使用

#### Java
- Spring Bootの慣習に従う
- Java 21の機能を使用
- 標準的なMavenプロジェクト構造に従う
- Javadocコメントを含める

### ファイル構成

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## ビルドとデプロイ

### ドキュメントデプロイ

リポジトリはGitHub Pagesなどでドキュメントをホスト（該当する場合）。mainブランチ更新時には以下を実行：

1. 翻訳ワークフロー（`.github/workflows/co-op-translator.yml`）
2. すべての英語Markdownファイル自動翻訳
3. 必要に応じた画像のローカライズ

### ビルドプロセス不要

本リポジトリは主にMarkdownドキュメントを含むため、カリキュラム内容のためのコンパイルやビルドは不要です。

### サンプルプロジェクトのデプロイ

個別のサンプルプロジェクトにデプロイ手順がある場合があります：
- `03-GettingStarted/09-deployment/` にMCPサーバーデプロイのガイダンス
- `11-MCPServerHandsOnLabs/` にAzure Container Apps例

## コントリビュートガイドライン

### プルリクエスト手順

1. **Fork & Clone**: リポジトリをフォークしローカルにクローン
2. <strong>ブランチ作成</strong>: 説明的な名前を使用（例：`fix/typo-module-3`, `add/python-example`）
3. <strong>変更作業</strong>: 英語のMarkdownファイルのみ編集（翻訳ファイルは触らない）
4. <strong>ローカルテスト</strong>: Markdown表示が正しいか確認
5. **PR提出**: PRタイトル・説明は明確に
6. **CLA署名**: 求められたらMicrosoft Contributor License Agreementに署名

### PRタイトルフォーマット

分かりやすく説明的に：
- `[Module XX] 簡単な説明`（モジュール固有の変更用）
- `[Samples] 説明`（サンプルコード変更）
- `[Docs] 説明`（一般ドキュメント更新）

### 寄稿内容例

- ドキュメントやコードサンプルのバグ修正
- 新しいプログラミング言語のコード例の追加
- 既存コンテンツの説明強化・改善
- 新規ケーススタディ・実践例
- 不明瞭あるいは誤情報の報告

### 避けるべきこと

- `translations/` ディレクトリの直接編集禁止
- `translated_images/` ディレクトリの編集禁止
- 大容量バイナリファイルの無断追加禁止
- 翻訳ワークフロー関連ファイルの無断変更禁止

## 追加情報

### リポジトリ管理

- <strong>変更履歴</strong>: `changelog.md` に全重要変更を記録
- <strong>学習ガイド</strong>: `study_guide.md` でカリキュラム全体概要を提供
- **Issueテンプレート**: バグ報告・機能要望にGitHubのテンプレート利用
- <strong>行動規範</strong>: すべての参加者はMicrosoftオープンソース行動規範を遵守

### 学習パス

00から11のモジュールを順序立てて学習推奨：
1. **00-02**: 基礎（導入、コアコンセプト、セキュリティ）
2. **03**: ハンズオンの開始
3. **04-05**: 実装と応用
4. **06-10**: コミュニティ・ベストプラクティス・実例
5. **11**: 総合的なDB統合ラボ（全13ラボ）

### サポートリソース

- <strong>ドキュメント</strong>: https://modelcontextprotocol.io/
- <strong>仕様書</strong>: https://spec.modelcontextprotocol.io/
- <strong>コミュニティ</strong>: https://github.com/orgs/modelcontextprotocol/discussions
- **Discord**: Microsoft Foundry Discordサーバー
- <strong>関連コース</strong>: README.md参照（Microsoft学習パス）

### よくあるトラブルと対策

**Q: PRが翻訳チェックで失敗する**
A: 原因は、ルートの英語Markdown以外を編集した可能性があります。翻訳ファイルは変更しないでください。

**Q: 新しい言語を追加したい**
A: co-op-translatorワークフローで言語管理しています。言語追加の要望はIssueでご相談ください。

**Q: コードサンプルが動かない**
A: サンプルのREADMEに従いセットアップが正しいか確認してください。依存関係のバージョンも要確認です。

**Q: 画像が表示されない**
A: 画像パスは相対パスかつスラッシュ区切りであることを確認してください。画像は`images/`または`translated_images/`内に配置してください。

### パフォーマンス上の考慮点

- 翻訳ワークフローは数分かかることがあります
- 大きな画像はコミット前に最適化推奨
- Markdownファイルは意味のあるサイズに保つ
- リンクは相対パスで作成すると移植性が高い

### プロジェクト管理

本プロジェクトはMicrosoftのオープンソース慣行に従います：
- MITライセンス（コード＆ドキュメント）
- Microsoftオープンソース行動規範
- 貢献にはCLA契約が必要
- セキュリティ問題はSECURITY.md参照
- サポート情報はSUPPORT.md参照

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->