# MCPの高度なトピック

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/ja/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(上の画像をクリックすると、このレッスンのビデオが再生されます)_

この章では、マルチモーダル統合、スケーラビリティ、セキュリティのベストプラクティス、エンタープライズ統合など、Model Context Protocol（MCP）実装における一連の高度なトピックを扱います。これらのトピックは、最新のAIシステムの要求に応える堅牢で生産準備が整ったMCPアプリケーションを構築するために重要です。

## 概要

このレッスンでは、Model Context Protocol実装の高度な概念を探求し、マルチモーダル統合、スケーラビリティ、セキュリティのベストプラクティス、およびエンタープライズ統合に焦点を当てます。これらのトピックは、エンタープライズ環境の複雑な要件に対応できる生産クラスのMCPアプリケーションを構築するために不可欠です。

## 学習目標

このレッスンの終了時には、以下ができるようになります。

- MCPフレームワーク内でのマルチモーダル機能の実装
- 高負荷シナリオに対応するスケーラブルなMCPアーキテクチャの設計
- MCPのセキュリティ原則に基づくセキュリティのベストプラクティスの適用
- MCPをエンタープライズAIシステムやフレームワークと統合
- 生産環境でのパフォーマンスと信頼性の最適化

## レッスンとサンプルプロジェクト

| Link | タイトル | 説明 |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Azureとの統合 | Azure上でMCPサーバーを統合する方法を学びます |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | MCPマルチモーダルサンプル | 音声、画像、およびマルチモーダル応答のサンプル |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2デモ | Authorization ServerおよびResource ServerとしてのMCPのOAuth2を示す最小限のSpring Bootアプリ。安全なトークン発行、保護されたエンドポイント、Azure Container Appsデプロイ、およびAPI Management統合を実演。 |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | ルートコンテキスト | ルートコンテキストについての詳細とその実装方法を学びます |
| [5.5 Routing](./mcp-routing/README.md) | ルーティング | さまざまなタイプのルーティングを学びます |
| [5.6 Sampling](./mcp-sampling/README.md) | サンプリング | サンプリングの操作方法を学びます |
| [5.7 Scaling](./mcp-scaling/README.md) | スケーリング | スケーリングについて学びます |
| [5.8 Security](./mcp-security/README.md) | セキュリティ | MCPサーバーのセキュリティを確保します |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Web検索MCP | SerpAPIと統合したPythonのMCPサーバーとクライアント。リアルタイムのウェブ、ニュース、商品検索、Q&Aを実現。マルチツールオーケストレーション、外部API連携、堅牢なエラーハンドリングを示します。 |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | ストリーミング | リアルタイムデータストリーミングは、ビジネスやアプリケーションが即時に情報にアクセスしタイムリーな意思決定を行うために不可欠です。 |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | ウェブ検索 | リアルタイムのウェブ検索が、AIモデル、検索エンジン、アプリケーション間でのコンテキスト管理の標準化を通じてMCPによりどのように変革されるかを学びます。 |
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Entra ID認証 | Microsoft Entra IDは、認可されたユーザーとアプリケーションのみがMCPサーバーとやり取りできるようにする堅牢なクラウドベースのIDおよびアクセス管理ソリューションを提供します。 |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry統合 | Model Context ProtocolサーバーをMicrosoft Foundryエージェントと統合し、標準化された外部データソース接続を用いた強力なツールオーケストレーションとエンタープライズAI機能化を実現する方法を学びます。 |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | コンテキストエンジニアリング | MCPサーバーの将来の機会であるコンテキスト最適化、動的コンテキスト管理、およびMCPフレームワーク内での効果的なプロンプトエンジニアリング戦略を含むコンテキストエンジニアリング手法について学びます。 |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | カスタムトランスポート | 専用のMCP通信シナリオのためのカスタムトランスポートメカニズムを実装する方法を学びます。 |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | プロトコル機能 | 進行状況通知、リクエストキャンセル、リソーステンプレート、エラーハンドリングパターンなどの高度なプロトコル機能をマスターします。 |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | 対立マルチエージェント | 反対の立場を持つ2つのエージェントが単一のMCPツールセットを共有し、幻覚を検出し、エッジケースを表出し、構造化された議論によりより良い調整済みの出力を生成します。 |

> **MCP仕様 2025-11-25 の新機能**: 仕様に、進行状況追跡付きの長時間実行操作である<strong>Tasks</strong>、安全性のためのツール挙動に関する<strong>Tool Annotations</strong>、クライアントから特定URLコンテンツの要求を行う<strong>URL Mode Elicitation</strong>、およびワークスペースコンテキスト管理向けの強化された<strong>Roots</strong>の実験的サポートが含まれるようになりました。詳細は[MCP仕様の変更履歴](https://spec.modelcontextprotocol.io/)をご覧ください。

## 追加参照資料

高度なMCPトピックの最新情報は以下を参照してください。
- [MCPドキュメント](https://modelcontextprotocol.io/)
- [MCP仕様 (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHubリポジトリ](https://github.com/modelcontextprotocol)
- [OWASP MCPトップ10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - セキュリティリスクと対策
- [MCPセキュリティサミットワークショップ (Sherpa)](https://azure-samples.github.io/sherpa/) - ハンズオンセキュリティトレーニング

## 重要なポイント

- マルチモーダルMCP実装により、AIの能力がテキスト処理を超えて拡張される
- スケーラビリティはエンタープライズ展開に不可欠であり、水平方向および垂直方向のスケールアウトで対応可能
- 包括的なセキュリティ対策によりデータ保護と適切なアクセス制御を確保
- Azure OpenAIやMicrosoft AI Foundryなどのプラットフォームとのエンタープライズ統合がMCP機能を強化
- 最適化されたアーキテクチャと慎重なリソース管理が高度なMCP実装に有益

## 演習

特定のユースケースに対するエンタープライズグレードのMCP実装を設計してください。

1. ユースケースのマルチモーダル要件を特定する
2. 機密データを保護するために必要なセキュリティコントロールを概説する
3. 変動する負荷に対応できるスケーラブルなアーキテクチャを設計する
4. エンタープライズAIシステムとの統合ポイントを計画する
5. 潜在的なパフォーマンスボトルネックとその緩和戦略を文書化する

## 追加リソース

- [Azure OpenAIドキュメント](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundryドキュメント](https://learn.microsoft.com/en-us/ai-services/)

---

## 次に進むには

このモジュールのレッスンを [5.1 MCP Integration](./mcp-integration/README.md) から始めてください。

このモジュールを完了したら、次に [モジュール6: コミュニティ貢献](../06-CommunityContributions/README.md) に進みましょう。

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->