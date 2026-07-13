# MCPの高度なトピック

[![高度なMCP：セキュアでスケーラブル、多モーダルAIエージェント](../../../translated_images/ja/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(ビデオを視聴するには上の画像をクリックしてください)_

本章では、モデルコンテキストプロトコル（MCP）実装における多モーダル統合、スケーラビリティ、セキュリティのベストプラクティス、企業統合など一連の高度なトピックを扱います。これらのトピックは、現代のAIシステムのニーズに応えうる堅牢で本番対応のMCPアプリケーション構築に不可欠です。

## 概要

本レッスンでは、モデルコンテキストプロトコルの実装における高度な概念を探求し、多モーダル統合、スケーラビリティ、セキュリティのベストプラクティス、企業統合に焦点を当てます。これらは複雑な要件を持つ企業環境で運用可能な本番品質のMCPアプリケーション構築に不可欠なトピックです。

> <strong>今後の展望：</strong>以下のいくつかのトピックは `2026-07-28` のMCP仕様リリース候補の影響を受けています。ルートコンテキスト（5.4）とサンプリング（5.6）はリリース候補で非推奨とされたプリミティブに基づいており、プロトコル機能（5.16）で言及されている実験的なTasks機能は専用のTasks拡張に移行します。詳細は[What's Changing in MCP: The 2026-07-28 Release Candidate](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)をご覧ください。

## 学習目標

このレッスンの終了時には、以下ができるようになります：

- MCPフレームワーク内で多モーダル機能を実装する
- 高負荷シナリオ向けにスケーラブルなMCPアーキテクチャを設計する
- MCPのセキュリティ原則に沿ったセキュリティのベストプラクティスを適用する
- MCPを企業のAIシステムやフレームワークと統合する
- 本番環境でのパフォーマンスと信頼性を最適化する

## レッスンとサンプルプロジェクト

| リンク | タイトル | 説明 |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Azureとの統合 | Azure上のMCPサーバーとの統合方法を学びます |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCP多モーダルサンプル | 音声、画像、マルチモーダル応答のサンプル |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2デモ | OAuth2を認可サーバーとリソースサーバー両方で使用する簡単なSpring Bootアプリ。安全なトークン発行、保護されたエンドポイント、Azure Container Appsへのデプロイ、API管理との連携を示します。 |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | ルートコンテキスト | ルートコンテキストの詳細と実装方法を学びます |
| [5.5 Routing](./mcp-routing/README.md) | ルーティング | 各種ルーティング方法を学びます |
| [5.6 Sampling](./mcp-sampling/README.md) | サンプリング | サンプリングの取り扱い方法を学びます |
| [5.7 Scaling](./mcp-scaling/README.md) | スケーリング | スケーリングに関する学習 |
| [5.8 Security](./mcp-security/README.md) | セキュリティ | MCPサーバーをセキュアに保つ |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web検索MCP | SerpAPIと連携したPythonベースのMCPサーバーとクライアント。リアルタイムのウェブ、ニュース、商品検索、Q&A対応を実例で示します。複数ツールの調整、外部API統合、堅牢なエラーハンドリングも実証。 |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | ストリーミング | 今日のデータ駆動型社会において、即時の情報アクセスが必要な場面で不可欠なリアルタイムデータストリーミング|
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Web検索 | MCPがAIモデル、検索エンジン、アプリケーション間のコンテキスト管理を標準化し、リアルタイムWeb検索をどのように変革するかを学びます。 | 
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID認証 | Microsoft Entra IDはクラウドベースの強力なID・アクセス管理ソリューションを提供し、認可されたユーザーとアプリのみがMCPサーバーとやり取りできるようにします。|
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry統合 | MCPサーバーとMicrosoft Foundryエージェントを統合し、強力なツール調整と企業向けAI機能を標準化された外部データソース接続で実現する方法を学びます。|
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | コンテキストエンジニアリング | MCPサーバーのコンテキスト最適化、動的管理、効果的なプロンプトエンジニアリング戦略など、将来のコンテキストエンジニアリング技術の可能性。|
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | カスタムトランスポート | 専用のMCP通信シナリオ向けにカスタムトランスポート機構を実装する方法を学びます。|
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | プロトコル機能 | 進捗通知、リクエストキャンセル、リソーステンプレート、エラーハンドリングパターンなど、プロトコルの高度な機能を習得します。|
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | 反競合エージェント | 立場の異なる2つのエージェントが単一のMCPツールセットを共有し、誤認識の検出、エッジケースの洗い出し、構造的な議論を通じたより適切な出力生成を可能にします。|

> **MCP仕様2025-11-25新要素**：仕様に実験的な<strong>Tasks</strong>（進捗追跡付き長時間操作）、**Tool Annotations**（安全性のためのツール動作メタデータ）、**URLモード要請**（クライアントから特定URLコンテンツを要求）、および強化された<strong>Roots</strong>（ワークスペースコンテキスト管理）対応が含まれました。詳細は[MCP仕様変更履歴](https://spec.modelcontextprotocol.io/)をご覧ください。

## 追加参照資料

高度なMCPトピックの最新情報については以下を参照してください：
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Specification (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Repository](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - セキュリティリスクと対策
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - 実践的セキュリティトレーニング

## 重要ポイントのまとめ

- 多モーダルMCP実装はテキスト処理を超えたAI機能拡張をもたらす
- スケーラビリティは企業展開に不可欠で、水平方向・垂直方向のスケーリングで対応可能
- 包括的なセキュリティ対策がデータ保護と適切なアクセス制御を確実にする
- Azure OpenAIやMicrosoft AI Foundryといったプラットフォームとの企業統合がMCP機能を強化する
- 高度なMCP実装は最適化されたアーキテクチャと慎重なリソース管理で恩恵を受ける

## 演習

特定のユースケースに向けた企業向けのMCP実装を設計してください：

1. ユースケースに必要な多モーダル要件を特定する
2. 機密データを保護するためのセキュリティ制御を概説する
3. 変動する負荷に対応できるスケーラブルなアーキテクチャを設計する
4. 企業AIシステムとの統合ポイントを計画する
5. 潜在的な性能ボトルネックと緩和戦略を文書化する

## 追加リソース

- [Azure OpenAI Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Documentation](https://learn.microsoft.com/en-us/ai-services/)

---

## 次のステップ

このモジュールのレッスンは、[5.1 MCP Integration](./mcp-integration/README.md)から始めましょう

このモジュールを完了したら、[モジュール6：コミュニティ貢献](../06-CommunityContributions/README.md)へ進んでください

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->