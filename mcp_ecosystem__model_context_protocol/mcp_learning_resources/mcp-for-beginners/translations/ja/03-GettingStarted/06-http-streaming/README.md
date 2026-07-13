# モデルコンテキストプロトコル（MCP）によるHTTPSストリーミング

この章では、Model Context Protocol（MCP）を用いた安全でスケーラブルなリアルタイムストリーミングの実装について包括的に解説します。ストリーミングの動機、利用可能なトランスポート機構、MCPでのストリーミング可能なHTTPの実装方法、安全上のベストプラクティス、SSEからの移行、および独自のストリーミングMCPアプリケーション構築の実践的ガイドをカバーします。

> **今後の見通し:** 本レッスンでは、セッションが `initialize` 時に確立され `Mcp-Session-Id` ヘッダーで固定される **MCP仕様 2025-11-25** におけるストリーミング可能HTTPを説明しています。`2026-07-28` のリリース候補では、ハンドシェイクとセッションIDが完全に廃止され、すべてのリクエストが自己完結型かつステッキーセッションなしで任意のサーバーインスタンスにルーティング可能になります。詳細は[What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md)をご覧ください。

## MCPにおけるトランスポート機構とストリーミング

このセクションでは、MCPで利用可能なさまざまなトランスポート機構と、クライアントとサーバー間のリアルタイム通信におけるストリーミング機能の役割について探ります。

### トランスポート機構とは？

トランスポート機構とは、クライアントとサーバー間でデータがどのように交換されるかを定義するものです。MCPはさまざまな環境や要件に適応するため、複数のトランスポートタイプをサポートしています：

- **stdio**：標準入力/出力で、ローカルやCLIベースのツールに適します。単純ですが、ウェブやクラウドには適しません。
- **SSE（Server-Sent Events）**：サーバーがHTTP経由でクライアントにリアルタイム更新をプッシュできます。ウェブUIに適していますが、スケーラビリティと柔軟性に限界があります。MCP仕様 2025-06-18以降、スタンドアロンのSSEトランスポートは非推奨となり、「ストリーミング可能HTTP」トランスポートに置き換えられています。
- **ストリーミング可能HTTP**：通知や高いスケーラビリティをサポートするモダンなHTTPベースのストリーミングトランスポートです。ほとんどのプロダクションおよびクラウドシナリオで推奨されます。

### 比較表

下記の比較表を参照して、これらのトランスポート機構の違いを理解しましょう：

| トランスポート       | リアルタイム更新      | ストリーミング | スケーラビリティ | 用途                     |
|---------------------|---------------------|--------------|--------------|--------------------------|
| stdio               | いいえ              | いいえ       | 低           | ローカルCLIツール         |
| SSE                 | はい                | はい         | 中           | ウェブ、リアルタイム更新 |
| ストリーミング可能HTTP | はい                | はい         | 高           | クラウド、マルチクライアント |

> **ヒント:** 適切なトランスポートを選択することはパフォーマンス、スケーラビリティ、ユーザー体験に影響します。**ストリーミング可能HTTP** はモダンでスケーラブル、クラウド対応のアプリケーションに推奨されます。

これまでの章で紹介したstdioとSSEというトランスポートや、当章で扱うストリーミング可能HTTPについて覚えておいてください。

## ストリーミング：概念と動機

ストリーミングの基本概念と動機を理解することは、有効なリアルタイム通信システムを実装する上で不可欠です。

<strong>ストリーミング</strong> とは、ネットワークプログラミングの技術であり、データを一度に全て受信するのを待つのではなく、小さな扱いやすいチャンクやイベントの連続として送受信することを可能にします。特に以下に有効です：

- 大きなファイルやデータセット
- リアルタイム更新（例：チャット、進捗バー）
- ユーザーに情報を提供し続けたい長時間実行される計算

ストリーミングの概要として知っておくべき点は以下の通りです：

- データは一度にではなく段階的に渡される
- クライアントはデータが届くごとに処理できる
- 知覚される遅延を減らしユーザー体験を向上させる

### なぜストリーミングを使うのか？

ストリーミングを使う理由は以下の通りです：

- ユーザーは最後まで待つことなく即座にフィードバックを得られる
- リアルタイムアプリケーションや応答性の高いUIが実現できる
- ネットワークおよび計算リソースの効率的利用

### 簡単な例：HTTPストリーミングサーバー＆クライアント

ここにストリーミングの実装例があります：

#### Python

**サーバー（Python、FastAPIとStreamingResponse使用）：**

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time

app = FastAPI()

async def event_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)

@app.get("/stream")
def stream():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**クライアント（Python、requests使用）：**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

この例では、サーバーがすべてのメッセージが準備されるのを待たずに、準備できた順にクライアントにメッセージを送信しています。

**動作の仕組み：**

- サーバーは準備できたメッセージを逐次返す
- クライアントは届いたチャンクを受け取り逐次表示する

**要件：**

- サーバーはストリーミングレスポンス（例：FastAPIの `StreamingResponse`）を使用する必要がある
- クライアントはレスポンスをストリームとして処理する必要がある（requestsでの `stream=True`）
- Content-Typeは通常 `text/event-stream` または `application/octet-stream` を使用

#### Java

**サーバー（Java、Spring BootとServer-Sent Events使用）：**

```java
@RestController
public class CalculatorController {

    @GetMapping(value = "/calculate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> calculate(@RequestParam double a,
                                                   @RequestParam double b,
                                                   @RequestParam String op) {
        
        double result;
        switch (op) {
            case "add": result = a + b; break;
            case "sub": result = a - b; break;
            case "mul": result = a * b; break;
            case "div": result = b != 0 ? a / b : Double.NaN; break;
            default: result = Double.NaN;
        }

        return Flux.<ServerSentEvent<String>>just(
                    ServerSentEvent.<String>builder()
                        .event("info")
                        .data("Calculating: " + a + " " + op + " " + b)
                        .build(),
                    ServerSentEvent.<String>builder()
                        .event("result")
                        .data(String.valueOf(result))
                        .build()
                )
                .delayElements(Duration.ofSeconds(1));
    }
}
```

**クライアント（Java、Spring WebFlux WebClient使用）：**

```java
@SpringBootApplication
public class CalculatorClientApplication implements CommandLineRunner {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:8080")
            .build();

    @Override
    public void run(String... args) {
        client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/calculate")
                        .queryParam("a", 7)
                        .queryParam("b", 5)
                        .queryParam("op", "mul")
                        .build())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(System.out::println)
                .blockLast();
    }
}
```

**Java実装メモ：**

- Spring Bootのリアクティブスタックの `Flux` を用いたストリーミング
- `ServerSentEvent` はイベントタイプ付きの構造化されたストリームを提供
- `WebClient` の `bodyToFlux()` でリアクティブなストリーミング消費を実現
- `delayElements()` はイベント間の処理時間をシミュレート
- イベントはクライアントでのハンドリング向上のためタイプ（`info`, `result`）を持つ

### 比較：クラシックストリーミング vs MCPストリーミング

クラシックなストリーミングの動作とMCPでのストリーミングの違いは以下のように表せます：

| 特徴                    | クラシックHTTPストリーミング      | MCPストリーミング（通知）          |
|-------------------------|---------------------------------|-----------------------------------|
| メインレスポンス        | チャンク形式                     | 最後に一括送信                    |
| 進捗更新                | データチャンクとして送信         | 通知として送信                    |
| クライアント要件         | ストリーム処理が必須             | メッセージハンドラーの実装が必須   |
| 用途                    | 大容量ファイル、AIトークンストリーム | 進捗、ログ、リアルタイムフィードバック |

### 重要な違いのまとめ

さらに、以下のような重要な違いもあります：

- **通信パターン：**
  - クラシックHTTPストリーミング：シンプルなチャンク転送エンコーディングを使用してデータを送信
  - MCPストリーミング：JSON-RPCプロトコルによる構造化された通知システムを使用

- **メッセージフォーマット：**
  - クラシックHTTP：改行を含む単純なテキストチャンク
  - MCP：メタデータ付きの構造化されたLoggingMessageNotificationオブジェクト

- **クライアント実装：**
  - クラシックHTTP：ストリーミングレスポンスを処理するシンプルクライアント
  - MCP：異なるタイプのメッセージを処理するメッセージハンドラーを備えた高度なクライアント

- **進捗更新：**
  - クラシックHTTP：進捗はメインレスポンスストリームの一部
  - MCP：進捗は通知メッセージで個別に送信され、メインレスポンスは最後に送られる

### 推奨事項

クラシックなストリーミング（上記の `/stream` エンドポイントのようなもの）とMCPによるストリーミングのどちらを実装すべきかに関して、以下の推奨事項があります。

- **単純なストリーミング用途には：** クラシックHTTPストリーミングは簡単に実装でき、基本的なストリーミングニーズに十分対応可能です。

- **複雑でインタラクティブなアプリケーションには：** MCPストリーミングは通知と最終結果を分離し、豊富なメタデータを伴う構造化されたアプローチを提供します。

- **AIアプリケーションの場合：** MCPの通知システムは、長時間に及ぶAIタスクでユーザーに進捗を知らせたい場合に特に有効です。

## MCPにおけるストリーミング

ここまでで、クラシックストリーミングとMCPストリーミングの違いと推奨事項を見てきました。次に、MCPでストリーミングをどのように活用できるか詳しく説明します。

MCPフレームワーク内でストリーミングがどのように機能するかを理解することは、長時間実行される操作中にユーザーへリアルタイムフィードバックを提供する応答性の高いアプリケーションを構築する上で不可欠です。

MCPのストリーミングは、メインレスポンスをチャンクで送信するのではなく、ツールがリクエストを処理中にクライアントへ<strong>通知</strong>を送ることにあります。これらの通知には進捗更新、ログまたはその他のイベントが含まれます。

### 動作の仕組み

メインの結果は依然として単一のレスポンスとして送られます。ただし、処理中に通知が別メッセージとして送信されることでクライアントがリアルタイムに更新を受け取れます。クライアントはこれらの通知を処理し表示できる必要があります。

## 通知とは何か？

「通知」とはMCPの文脈で何を意味するのでしょうか？

通知とは、長時間実行される操作中に進捗状況、状態またはその他のイベントをサーバーからクライアントに知らせるメッセージです。通知は透明性とユーザー体験の向上に寄与します。

例えば、クライアントはサーバーとの初期ハンドシェイクが完了したら通知を送信することになっています。

通知は以下のようなJSONメッセージになります：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知はMCPのトピックの一つである["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging)に属します。

ロギングを有効にするには、サーバーが以下のように機能／機能セットとして有効化する必要があります：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 使用しているSDKにより、ロギングがデフォルトで有効になっている場合や、サーバー設定で明示的に有効化が必要な場合があります。

通知にはいくつかの種類があります：

| レベル     | 説明                          | 使用例                       |
|-----------|-------------------------------|-----------------------------|
| debug     | 詳細なデバッグ情報            | 関数の入り口/出口            |
| info      | 一般的な情報メッセージ         | 操作の進捗更新              |
| notice    | 通常だが重要なイベント         | 設定変更                   |
| warning   | 警告状態                      | 非推奨機能の使用           |
| error     | エラー状態                    | 操作失敗                   |
| critical  | 重大な状態                    | システム構成部品の障害    |
| alert     | 直ちに対処が必要              | データ破損検知             |
| emergency | システムが使用不能            | 完全なシステム障害         |

## MCPでの通知の実装

MCPで通知を実装するには、リアルタイム更新を処理できるようにサーバー側とクライアント側の両方をセットアップする必要があります。これにより、長時間処理中のユーザーに即時のフィードバックを提供できます。

### サーバー側：通知の送信

まずはサーバー側から説明します。MCPでは、処理中に通知を送信できるツールを定義します。サーバーはコンテキストオブジェクト（通常 `ctx`）を使ってクライアントへメッセージを送ります。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

先の例では、`process_files` ツールが各ファイル処理時に3つの通知をクライアントに送っています。`ctx.info()` メソッドは情報メッセージの送信に使われます。

さらに、通知を可能にするため、サーバーはストリーミングトランスポート（例えば `streamable-http`）を使い、クライアントは通知を処理するメッセージハンドラーを実装する必要があります。サーバーで `streamable-http` トランスポートを設定する方法は次の通りです：

```python
mcp.run(transport="streamable-http")
```

#### .NET

```csharp
[Tool("A tool that sends progress notifications")]
public async Task<TextContent> ProcessFiles(string message, ToolContext ctx)
{
    await ctx.Info("Processing file 1/3...");
    await ctx.Info("Processing file 2/3...");
    await ctx.Info("Processing file 3/3...");
    return new TextContent
    {
        Type = "text",
        Text = $"Done: {message}"
    };
}
```

この.NETの例では、`ProcessFiles` ツールが各ファイル処理時に3つの通知をクライアントに送信しています。`ctx.Info()` メソッドは情報メッセージの送信に使われます。

.NET MCPサーバーで通知を有効にするには、ストリーミングトランスポートを使用していることを確認してください：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### クライアント側：通知の受信

クライアントは、通知を受け取って処理・表示するためのメッセージハンドラーを実装する必要があります。

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)

async with ClientSession(
   read_stream, 
   write_stream,
   logging_callback=logging_collector,
   message_handler=message_handler,
) as session:
```

前のコードでは、`message_handler` 関数が受信メッセージが通知かどうかを判定し、通知なら表示し、そうでなければ通常のサーバーメッセージとして処理します。また、`ClientSession` が通知処理のため `message_handler` で初期化されている点に注目してください。

#### .NET

```csharp
// Define a message handler
void MessageHandler(IJsonRpcMessage message)
{
    if (message is ServerNotification notification)
    {
        Console.WriteLine($"NOTIFICATION: {notification}");
    }
    else
    {
        Console.WriteLine($"SERVER MESSAGE: {message}");
    }
}

// Create and use a client session with the message handler
var clientOptions = new ClientSessionOptions
{
    MessageHandler = MessageHandler,
    LoggingCallback = (level, message) => Console.WriteLine($"[{level}] {message}")
};

using var client = new ClientSession(readStream, writeStream, clientOptions);
await client.InitializeAsync();

// Now the client will process notifications through the MessageHandler
```

.NETのこの例でも、`MessageHandler` 関数がメッセージが通知かどうかを判定し、通知なら表示、そうでなければ通常のサーバーメッセージとして処理します。`ClientSession` は `ClientSessionOptions` を使ってメッセージハンドラーとともに初期化されています。

通知を有効にするには、サーバーがストリーミングトランスポート（例えば `streamable-http`）を使い、クライアントが通知を処理するメッセージハンドラーを実装していることが必要です。

## 進捗通知とシナリオ

このセクションでは、MCPにおける進捗通知の概念、その重要性、およびストリーミング可能HTTPを用いた実装方法について説明します。また理解を深めるための実践課題も用意しています。

進捗通知は、長時間実行される操作中にサーバーがクライアントへリアルタイムで送信するメッセージです。全プロセスの完了を待つのではなく、サーバーが現在の状況を継続的に更新することで透明性が向上し、ユーザー体験が改善され、デバッグも容易になります。

**例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### なぜ進捗通知を使うのか？

進捗通知が重要な理由は以下の通りです：

- **より良いユーザー体験:** ユーザーは処理中に更新を見られ、完了時だけでなくなる
- **リアルタイムフィードバック:** クライアントは進捗バーやログを表示でき、アプリが応答的に感じられる
- **デバッグ・監視の容易さ:** 開発者やユーザーはどこで処理が遅延または停止しているかを把握できる

### 進捗通知の実装方法

MCPで進捗通知を実装する方法は以下の通りです：

- **サーバー側：** 各項目の処理時に `ctx.info()` や `ctx.log()` を使って通知を送信します。これによりメインの結果が準備される前にクライアントにメッセージが送られます。
- **クライアント側：** メッセージハンドラーを実装し、届いた通知を受信・表示します。このハンドラーは通知と最終結果を区別します。

**サーバー例：**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**クライアント例：**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## セキュリティ考慮事項

MCPサーバーをHTTPベースのトランスポートで実装する場合、セキュリティは最重要課題となり、多様な攻撃経路と防御策に注意を払う必要があります。

### 概要

MCPサーバーをHTTPで公開する際にはセキュリティが極めて重要です。ストリーミング可能HTTPは新たな攻撃面を持ち、慎重な設定が求められます。

### 重要ポイント


- **Origin ヘッダーの検証**：DNSリバインディング攻撃を防ぐために `Origin` ヘッダーを常に検証してください。
- <strong>ローカルホストバインディング</strong>：ローカル開発時は、サーバーを `localhost` にバインドしてパブリックインターネットからのアクセスを防ぎます。
- <strong>認証</strong>：本番環境展開では認証（例：APIキー、OAuth）を実装してください。
- **CORS**：アクセス制限のためにクロスオリジンリソース共有（CORS）ポリシーを設定してください。
- **HTTPS**：本番環境ではトラフィックを暗号化するためにHTTPSを使用してください。

### ベストプラクティス

- 検証なしに受信リクエストを信用しないでください。
- すべてのアクセスとエラーをログおよび監視してください。
- セキュリティ脆弱性を修正するために定期的に依存関係を更新してください。

### 課題

- セキュリティと開発のしやすさのバランスを取ること
- 様々なクライアント環境との互換性を確保すること

## SSEからStreamable HTTPへのアップグレード

現在Server-Sent Events（SSE）を使用しているアプリケーションでは、Streamable HTTPに移行することで、MCP実装の機能向上と長期的な持続可能性の向上が期待できます。

### なぜアップグレードするのか？

SSEからStreamable HTTPへアップグレードするには、以下の2つの強力な理由があります：

- Streamable HTTPはSSEよりもスケーラビリティ、互換性、通知機能が優れています。
- 新しいMCPアプリケーションには推奨されるトランスポートです。

### 移行手順

MCPアプリケーションでSSEからStreamable HTTPに移行する方法は以下の通りです：

- サーバーコードを `mcp.run()` 内で `transport="streamable-http"` を使うように更新します。
- クライアントコードをSSEクライアントから `streamablehttp_client` に更新します。
- クライアントに通知を処理するメッセージハンドラを実装します。
- 既存のツールやワークフローとの互換性をテストします。

### 互換性維持

移行プロセス中は既存のSSEクライアントとの互換性を維持することが推奨されます。以下はいくつかの戦略です：

- 異なるエンドポイントでSSEとStreamable HTTPの両方のトランスポートを運用して両対応を可能にします。
- クライアントを徐々に新しいトランスポートへ移行します。

### 課題

移行中に以下の課題に対処してください：

- すべてのクライアントが更新されていることを確認すること
- 通知配信の違いを扱うこと

## セキュリティに関する考慮事項

MCPでHTTPベースのトランスポート、特にStreamable HTTPを使用する際には、サーバーの実装においてセキュリティが最優先となります。

MCPサーバーをHTTPベースのトランスポートで実装する場合、複数の攻撃経路と防御手段に注意を払う必要があります。

### 概要

MCPサーバーをHTTPで公開する場合、セキュリティが非常に重要です。Streamable HTTPは新たな攻撃面をもたらし、慎重な設定が要求されます。

重要なセキュリティ上の考慮点は次の通りです：

- **Origin ヘッダーの検証**：DNSリバインディング攻撃防止のため、 `Origin` ヘッダーを常に検証してください。
- <strong>ローカルホストバインディング</strong>：ローカル開発時はサーバーを `localhost` にバインドし、パブリックインターネットへの公開を防ぎます。
- <strong>認証</strong>：本番展開では認証（例：APIキー、OAuth）を実装してください。
- **CORS**：アクセスを制限するためクロスオリジンリソース共有（CORS）ポリシーを設定してください。
- **HTTPS**：本番環境ではトラフィックを暗号化するためにHTTPSを使用してください。

### ベストプラクティス

また、MCPストリーミングサーバーのセキュリティ実装時には以下のベストプラクティスの遵守が推奨されます：

- 検証なしに入ってきたリクエストを信用しない。
- すべてのアクセスとエラーをログに記録・監視する。
- セキュリティ脆弱性の修正のため、依存関係を定期的に更新する。

### 課題

MCPストリーミングサーバーでセキュリティを実装する際には以下の課題に直面します：

- セキュリティと開発の容易さのバランスを取ること
- 多様なクライアント環境との互換性を確保すること

### 課題: 自分のストリーミングMCPアプリを作ろう

**シナリオ：**
MCPサーバーとクライアントを構築し、サーバーがアイテム（例：ファイルや文書）リストを処理し、処理ごとに通知を送信するものとします。クライアントは通知を受信次第表示します。

**手順：**

1. リストを処理して各アイテムの通知を送るサーバーツールを実装する。
2. 通知をリアルタイムに表示するためのメッセージハンドラを持つクライアントを実装する。
3. サーバーとクライアントの両方を起動して、通知が表示されることを確認する。

[Solution](./solution/README.md)

## 続きを読む & 次に何をするか？

MCPストリーミングの学習を続け、更に高度なアプリケーションを構築するための追加リソースと次のステップを紹介します。

### 追加のリソース

- [Microsoft: HTTPストリーミング入門](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET CoreにおけるCORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: ストリーミングリクエスト](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 次に何をするか？

- リアルタイム分析、チャット、共同編集などにストリーミングを使ったより高度なMCPツール構築に挑戦してください。
- MCPストリーミングをフロントエンドフレームワーク（React、Vueなど）と統合し、ライブUI更新を試してみてください。
- 次へ: [VSCode用AIツールキットの活用](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->