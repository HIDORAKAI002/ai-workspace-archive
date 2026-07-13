# モデルコンテキストプロトコルにおけるルーティング

ルーティングは、MCPエコシステム内の適切なモデルやツール、サービスへリクエストを誘導するために不可欠です。

## はじめに

モデルコンテキストプロトコル（MCP）におけるルーティングは、コンテンツタイプ、ユーザーコンテキスト、システム負荷などのさまざまな基準に基づき、最も適切なモデルやサービスへリクエストを振り分けることを含みます。これにより効率的な処理と最適なリソース利用が保証されます。

## 学習目標

このレッスンの終了時には、以下ができるようになります：

- MCPにおけるルーティングの原則を理解する。
- コンテンツベースのルーティングを実装し、リクエストを専門サービスに誘導する。
- インテリジェントな負荷分散戦略を適用してリソース利用を最適化する。
- リクエストコンテキストに基づく動的なツールルーティングを実装する。

## コンテンツベースのルーティング

コンテンツベースのルーティングは、リクエストの内容に基づいてリクエストを専門サービスに振り分けます。例えば、コード生成に関連するリクエストは専門のコードモデルへ、創造的な執筆に関するリクエストは創造的執筆モデルへ送られます。

さまざまなプログラミング言語での実装例を見てみましょう。

<details>
<summary>.NET</summary>

```csharp
// .NET Example: Content-based routing in MCP
public class ContentBasedRouter
{
    private readonly Dictionary<string, McpClient> _specializedClients;
    private readonly RoutingClassifier _classifier;
    
    public ContentBasedRouter()
    {
        // Initialize specialized clients for different domains
        _specializedClients = new Dictionary<string, McpClient>
        {
            ["code"] = new McpClient("https://code-specialized-mcp.com"),
            ["creative"] = new McpClient("https://creative-specialized-mcp.com"),
            ["scientific"] = new McpClient("https://scientific-specialized-mcp.com"),
            ["general"] = new McpClient("https://general-mcp.com")
        };
        
        // Initialize content classifier
        _classifier = new RoutingClassifier();
    }
    
    public async Task<McpResponse> RouteAndProcessAsync(string prompt, IDictionary<string, object> parameters = null)
    {
        // Classify the prompt to determine the best specialized service
        string category = await _classifier.ClassifyPromptAsync(prompt);
        
        // Get the appropriate client or fall back to general
        var client = _specializedClients.ContainsKey(category) 
            ? _specializedClients[category] 
            : _specializedClients["general"];
            
        Console.WriteLine($"Routing request to {category} specialized service");
        
        // Send request to the selected service
        return await client.SendPromptAsync(prompt, parameters);
    }
    
    // Simple classifier for routing decisions
    private class RoutingClassifier
    {
        public Task<string> ClassifyPromptAsync(string prompt)
        {
            prompt = prompt.ToLowerInvariant();
            
            if (prompt.Contains("code") || prompt.Contains("function") || 
                prompt.Contains("program") || prompt.Contains("algorithm"))
            {
                return Task.FromResult("code");
            }
            
            if (prompt.Contains("story") || prompt.Contains("creative") || 
                prompt.Contains("imagine") || prompt.Contains("design"))
            {
                return Task.FromResult("creative");
            }
            
            if (prompt.Contains("science") || prompt.Contains("research") || 
                prompt.Contains("analyze") || prompt.Contains("study"))
            {
                return Task.FromResult("scientific");
            }
            
            return Task.FromResult("general");
        }
    }
}
```

上記のコードでは、以下のことを行いました：

- プロンプトの内容に基づいてリクエストをルーティングする`ContentBasedRouter`クラスを作成。
- 異なるドメイン（コード、クリエイティブ、科学、一般）の専門クライアントを初期化。
- プロンプトのカテゴリを判定し、適切な専門サービスへルーティングする簡単な分類器を実装。
- 専門サービスが利用できない場合に一般サービスへルーティングするフォールバック機構を使用。
- 効率的なリクエスト処理のため非同期処理を実装。
- コンテンツカテゴリと専門MCPクライアントをマッピングする辞書を使用。
- プロンプトを分析し、適切なカテゴリを返す簡単な分類器を実装。
- 専門クライアントを使用してリクエストを送信し、レスポンスを受信。
- プロンプトが専門カテゴリに一致しない場合に一般サービスへルーティングする処理を実装。

</details>

## インテリジェントな負荷分散

負荷分散はリソース利用を最適化し、MCPサービスの高可用性を確保します。ラウンドロビン、加重応答時間、コンテンツ対応など、さまざまな負荷分散戦略があります。

以下の戦略を使った実装例を見てみましょう：

- <strong>ラウンドロビン</strong>：利用可能なサーバーに均等にリクエストを配分。
- <strong>加重応答時間</strong>：サーバーの平均応答時間に基づいてリクエストをルーティング。
- <strong>コンテンツ対応</strong>：リクエストの内容に応じて専門サーバーへルーティング。

<details>
<summary>Java</summary>

```java
// Javaの例：MCPサーバー向けのインテリジェントな負荷分散
public class McpLoadBalancer {
    private final List<McpServerNode> serverNodes;
    private final LoadBalancingStrategy strategy;
    
    public McpLoadBalancer(List<McpServerNode> nodes, LoadBalancingStrategy strategy) {
        this.serverNodes = new ArrayList<>(nodes);
        this.strategy = strategy;
    }
    
    public McpResponse processRequest(McpRequest request) {
        // 戦略に基づいて最適なサーバーを選択
        McpServerNode selectedNode = strategy.selectNode(serverNodes, request);
        
        try {
            // 選択したノードにリクエストをルーティング
            return selectedNode.processRequest(request);
        } catch (Exception e) {
            // 障害時の処理 - リトライまたはフォールバックロジックを実装
            System.err.println("Error processing request on node " + selectedNode.getId() + ": " + e.getMessage());
            
            // ノードを潜在的に不健康としてマーク
            selectedNode.recordFailure();
            
            // フォールバックとして次に良いノードを試す
            List<McpServerNode> remainingNodes = new ArrayList<>(serverNodes);
            remainingNodes.remove(selectedNode);
            
            if (!remainingNodes.isEmpty()) {
                McpServerNode fallbackNode = strategy.selectNode(remainingNodes, request);
                return fallbackNode.processRequest(request);
            } else {
                throw new RuntimeException("All MCP server nodes failed to process the request");
            }
        }
    }
    
    // ノードのヘルスチェックタスク
    public void startHealthChecks(Duration interval) {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(() -> {
            for (McpServerNode node : serverNodes) {
                try {
                    boolean isHealthy = node.checkHealth();
                    System.out.println("Node " + node.getId() + " health status: " + 
                                      (isHealthy ? "HEALTHY" : "UNHEALTHY"));
                } catch (Exception e) {
                    System.err.println("Health check failed for node " + node.getId());
                    node.setHealthy(false);
                }
            }
        }, 0, interval.toMillis(), TimeUnit.MILLISECONDS);
    }
    
    // 負荷分散戦略のためのインターフェース
    public interface LoadBalancingStrategy {
        McpServerNode selectNode(List<McpServerNode> nodes, McpRequest request);
    }
    
    // ラウンドロビン戦略
    public static class RoundRobinStrategy implements LoadBalancingStrategy {
        private AtomicInteger counter = new AtomicInteger(0);
        
        @Override
        public McpServerNode selectNode(List<McpServerNode> nodes, McpRequest request) {
            List<McpServerNode> healthyNodes = nodes.stream()
                .filter(McpServerNode::isHealthy)
                .collect(Collectors.toList());
            
            if (healthyNodes.isEmpty()) {
                throw new RuntimeException("No healthy nodes available");
            }
            
            int index = counter.getAndIncrement() % healthyNodes.size();
            return healthyNodes.get(index);
        }
    }
    
    // 重み付け応答時間戦略
    public static class ResponseTimeStrategy implements LoadBalancingStrategy {
        @Override
        public McpServerNode selectNode(List<McpServerNode> nodes, McpRequest request) {
            return nodes.stream()
                .filter(McpServerNode::isHealthy)
                .min(Comparator.comparing(McpServerNode::getAverageResponseTime))
                .orElseThrow(() -> new RuntimeException("No healthy nodes available"));
        }
    }
    
    // コンテンツ認識戦略
    public static class ContentAwareStrategy implements LoadBalancingStrategy {
        @Override
        public McpServerNode selectNode(List<McpServerNode> nodes, McpRequest request) {
            // リクエストの特性を判定
            boolean isCodeRequest = request.getPrompt().contains("code") || 
                                   request.getAllowedTools().contains("codeInterpreter");
            
            boolean isCreativeRequest = request.getPrompt().contains("creative") || 
                                       request.getPrompt().contains("story");
            
            // 専門化されたノードを見つける
            Optional<McpServerNode> specializedNode = nodes.stream()
                .filter(McpServerNode::isHealthy)
                .filter(node -> {
                    if (isCodeRequest && node.getSpecialization().equals("code")) {
                        return true;
                    }
                    if (isCreativeRequest && node.getSpecialization().equals("creative")) {
                        return true;
                    }
                    return false;
                })
                .findFirst();
            
            // 専門化されたノードまたは最も負荷の少ないノードを返す
            return specializedNode.orElse(
                nodes.stream()
                    .filter(McpServerNode::isHealthy)
                    .min(Comparator.comparing(McpServerNode::getCurrentLoad))
                    .orElseThrow(() -> new RuntimeException("No healthy nodes available"))
            );
        }
    }
}
```

上記のコードでは、以下のことを行いました：

- MCPのサーバーノード一覧を管理し、選択した負荷分散戦略でリクエストをルーティングする`McpLoadBalancer`クラスを作成。
- 複数の負荷分散戦略：`RoundRobinStrategy`、`ResponseTimeStrategy`、`ContentAwareStrategy`を実装。
- 定期的にサーバーノードの健康状態をチェックするために`ScheduledExecutorService`を使用。
- 健康チェックの応答に基づきノードを健康または非健康としてマークするヘルスチェック機構を実装。
- 高可用性を保証するためのエラーハンドリングとフォールバックロジックを用いたリクエスト処理を実装。
- 各MCPサーバーノードを表す`McpServerNode`クラスを作成し、健康状態、平均応答時間、現在の負荷を管理。
- プロンプトや許可ツールなどのリクエスト詳細を封じ込める`McpRequest`クラスを実装。
- Java Streamsを用いて健康状態や専門性に基づきノードのフィルタリングと選択を行う。

</details>

## 動的ツールルーティング

ツールルーティングは、ツールコールをコンテキストに基づき最適なサービスへ誘導します。例として、天気ツール呼び出しはユーザーの地域に応じたエンドポイントへ、計算ツールは特定バージョンのAPIを使用する必要があります。

リクエスト分析、地域エンドポイント、およびバージョン管理に基づく動的ツールルーティングを示す実装例を見てみましょう。

<details>
<summary>Python</summary>

```python
# Pythonの例：リクエスト解析に基づく動的ツールルーティング
class McpToolRouter:
    def __init__(self):
        # 利用可能なツールエンドポイントを登録する
        self.tool_endpoints = {
            "weatherTool": "https://weather-service.example.com/api",
            "calculatorTool": "https://calculator-service.example.com/compute",
            "databaseTool": "https://database-service.example.com/query",
            "searchTool": "https://search-service.example.com/search"
        }
        
        # グローバル分散のためのリージョン別エンドポイント
        self.regional_endpoints = {
            "us": {
                "weatherTool": "https://us-west.weather-service.example.com/api",
                "searchTool": "https://us.search-service.example.com/search"
            },
            "europe": {
                "weatherTool": "https://eu.weather-service.example.com/api",
                "searchTool": "https://eu.search-service.example.com/search"
            },
            "asia": {
                "weatherTool": "https://asia.weather-service.example.com/api",
                "searchTool": "https://asia.search-service.example.com/search"
            }
        }
        
        # ツールのバージョン管理サポート
        self.tool_versions = {
            "weatherTool": {
                "default": "v2",
                "v1": "https://weather-service.example.com/api/v1",
                "v2": "https://weather-service.example.com/api/v2",
                "beta": "https://weather-service.example.com/api/beta"
            }
        }
    
    async def route_tool_request(self, tool_name, parameters, user_context=None):
        """Route a tool request to the appropriate endpoint based on context"""
        endpoint = self._select_endpoint(tool_name, parameters, user_context)
        
        if not endpoint:
            raise ValueError(f"No endpoint available for tool: {tool_name}")
        
        # 選択されたエンドポイントに対して実際のリクエストを実行する
        return await self._execute_tool_request(endpoint, tool_name, parameters)
    
    def _select_endpoint(self, tool_name, parameters, user_context=None):
        """Select the most appropriate endpoint based on context"""
        # レジストリからの基本エンドポイント
        if tool_name not in self.tool_endpoints:
            return None
            
        base_endpoint = self.tool_endpoints[tool_name]
        
        # 特定のツールバージョンを使用する必要があるかどうかを確認する
        if tool_name in self.tool_versions:
            version_info = self.tool_versions[tool_name]
            
            # 指定されたバージョンまたはデフォルトを使用する
            requested_version = parameters.get("_version", version_info["default"])
            if requested_version in version_info:
                base_endpoint = version_info[requested_version]
        
        # ユーザーのリージョンが判明している場合のリージョン別ルーティングを確認する
        if user_context and "region" in user_context:
            user_region = user_context["region"]
            
            if user_region in self.regional_endpoints:
                regional_tools = self.regional_endpoints[user_region]
                
                if tool_name in regional_tools:
                    # リージョン固有のエンドポイントを使用する
                    return regional_tools[tool_name]
        
        # データ所在要件を確認する
        if user_context and "data_residency" in user_context:
            # これはデータが指定された管轄区域内に留まることを確実にするロジックを実装する
            pass
        
        # レイテンシに基づくルーティングを確認する
        if user_context and "latency_sensitive" in user_context and user_context["latency_sensitive"]:
            # これは最も低レイテンシのエンドポイントを選択するロジックを実装する
            pass
            
        return base_endpoint
        
    async def _execute_tool_request(self, endpoint, tool_name, parameters):
        """Execute the actual tool request to the selected endpoint"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    endpoint,
                    json={"toolName": tool_name, "parameters": parameters},
                    headers={"Content-Type": "application/json"}
                ) as response:
                    if response.status == 200:
                        result = await response.json()
                        return result
                    else:
                        error_text = await response.text()
                        raise Exception(f"Tool execution failed: {error_text}")
        except Exception as e:
            # リトライロジックまたはフォールバック戦略を実装する
            print(f"Error executing tool {tool_name} at {endpoint}: {str(e)}")
            raise
```

上記のコードでは、以下を行いました：

- リクエスト分析、地域エンドポイント、バージョン管理に基づいてツールルーティングを管理する`McpToolRouter`クラスを作成。
- 利用可能なツールエンドポイントとグローバル配布のための地域エンドポイントを登録。
- 地域やデータ所在要件などユーザーコンテキストに基づく適切なエンドポイントを選択する動的ルーティングロジックを実装。
- ツールのバージョン指定を可能にし、ユーザーが使用したいツールバージョンを指定できるようにバージョンサポートを実装。
- 非同期HTTPリクエストを用いてツール呼び出しを実行しレスポンスを処理。

</details>

## MCPにおけるサンプリングとルーティングのアーキテクチャ

サンプリングは、効率的なリクエスト処理およびルーティングを可能にするMCPの重要な要素です。これにより、コンテンツタイプ、ユーザーコンテキスト、システム負荷などの基準に基づいて最適なモデルやサービスを判断します。

サンプリングとルーティングを組み合わせることで、リソース利用を最適化し高可用性を確保する堅牢なアーキテクチャを構築できます。サンプリングによりリクエストを分類し、ルーティングで適切なモデルやサービスに振り分けます。

下図は、包括的なMCPアーキテクチャにおけるサンプリングとルーティングの協調動作を示しています：

```mermaid
flowchart TB
    Client([MCP クライアント])
    
    subgraph 「リクエスト処理」
        Router{リクエストルーター}
        Analyzer[コンテンツ解析器]
        Sampler[サンプリング設定]
    end
    
    subgraph 「サーバー選択」
        LoadBalancer{ロードバランサー}
        ModelSelector[モデルセレクター]
        ServerPool[（サーバープール）]
    end
    
    subgraph 「モデル処理」
        ModelA[専用モデル A]
        ModelB[専用モデル B]
        ModelC[汎用モデル]
    end
    
    subgraph 「ツール実行」
        ToolRouter{ツールルーター}
        ToolRegistryA[（主要ツール）]
        ToolRegistryB[（地域ツール）]
    end
    
    Client -->|リクエスト| Router
    Router -->|分析| Analyzer
    Analyzer -->|設定| Sampler
    Router -->|リクエストをルート| LoadBalancer
    LoadBalancer --> ServerPool
    ServerPool --> ModelSelector
    ModelSelector --> ModelA
    ModelSelector --> ModelB
    ModelSelector --> ModelC
    
    ModelA -->|ツール呼び出し| ToolRouter
    ModelB -->|ツール呼び出し| ToolRouter
    ModelC -->|ツール呼び出し| ToolRouter
    
    ToolRouter --> ToolRegistryA
    ToolRouter --> ToolRegistryB
    
    ToolRegistryA -->|結果| ModelA
    ToolRegistryA -->|結果| ModelB
    ToolRegistryA -->|結果| ModelC
    ToolRegistryB -->|結果| ModelA
    ToolRegistryB -->|結果| ModelB
    ToolRegistryB -->|結果| ModelC
    
    ModelA -->|レスポンス| Client
    ModelB -->|レスポンス| Client
    ModelC -->|レスポンス| Client
    
    style Client fill:#d5e8f9,stroke:#333
    style Router fill:#f9d5e5,stroke:#333
    style LoadBalancer fill:#f9d5e5,stroke:#333
    style ToolRouter fill:#f9d5e5,stroke:#333
    style ModelA fill:#c2f0c2,stroke:#333
    style ModelB fill:#c2f0c2,stroke:#333
    style ModelC fill:#c2f0c2,stroke:#333
```

## 次に行うこと

- [5.6 Sampling](../mcp-sampling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->