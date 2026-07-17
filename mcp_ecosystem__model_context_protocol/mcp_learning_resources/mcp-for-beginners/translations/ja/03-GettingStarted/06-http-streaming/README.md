# Model Context Protocol（MCP）によるHTTPSストリーミング

この章では、Model Context Protocol（MCP）を使用したHTTPSによる安全でスケーラブルでリアルタイムなストリーミングの実装について包括的に解説します。ストリーミングの動機、利用可能なトランスポート機構、MCPにおけるストリーム対応HTTPの実装方法、セキュリティのベストプラクティス、SSEからの移行、そしてストリーミングMCPアプリケーションを構築するための実践的なガイダンスを取り扱います。

> **将来展望：** 本レッスンは、`initialize`時にセッションを確立し `Mcp-Session-Id` ヘッダーで固定する **MCP仕様 2025-11-25** に基づくストリーム対応HTTPについて説明します。`2026-07-28` のリリース候補ではハンドシェイクとセッションIDが完全に廃止され、すべてのリクエストが自己完結型となり、ステッキーセッションなしで任意のサーバーインスタンスにルーティングされます。詳細は [MCPの変更点: 2026-07-28リリース候補](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) を参照してください。

## MCPにおけるトランスポート機構とストリーミング

このセクションでは、MCPで利用可能なさまざまなトランスポート機構について探り、それらがクライアントとサーバー間のリアルタイム通信におけるストリーミング機能を可能にする役割を説明します。

### トランスポート機構とは何か？

トランスポート機構は、クライアントとサーバー間でデータがどのように交換されるかを定義します。MCPは異なる環境や要件に応じて複数のトランスポートタイプをサポートしています：

- **stdio**: 標準入出力。ローカルやCLIベースのツールに適しています。シンプルですがウェブやクラウドには不向きです。
- **SSE（Server-Sent Events）**: サーバーがHTTP経由でクライアントにリアルタイムアップデートをプッシュできます。ウェブUIに適していますがスケーラビリティと柔軟性に制限があります。MCP仕様2025-06-18以降、独立したSSEトランスポートは廃止され、「Streamable HTTP」トランスポートに置き換えられました。
- **Streamable HTTP**: 最新のHTTPベースのストリーミングトランスポートで、通知とスケーラビリティの向上をサポートしています。ほとんどの本番およびクラウド環境で推奨されます。

### 比較表

下記の比較表でこれらのトランスポート機構の違いを理解してください：

| トランスポート     | リアルタイムアップデート | ストリーミング | スケーラビリティ | 利用ケース               |
|-------------------|----------------------------|--------------|----------------|--------------------------|
| stdio             | いいえ                     | いいえ       | 低             | ローカルCLIツール         |
| SSE               | はい                       | はい         | 中             | ウェブ、リアルタイム更新  |
| Streamable HTTP   | はい                       | はい         | 高             | クラウド、マルチクライアント |

> **ヒント：** 適切なトランスポートの選択はパフォーマンス、スケーラビリティ、ユーザー体験に影響します。**Streamable HTTP** は現代的でスケーラブル、クラウド対応アプリケーションに推奨されます。

前章で示したstdioとSSEトランスポートと比較し、本章で扱うのがStreamable HTTPトランスポートであることに注目してください。

## ストリーミング：概念と動機

ストリーミングの基本的な概念と動機を理解することは、効果的なリアルタイム通信システムの実装に必須です。

<strong>ストリーミング</strong>は、ネットワークプログラミングにおける技術で、応答全体が準備できるのを待つ代わりに、小さく管理しやすいチャンクやイベントの連続としてデータを送受信します。特に以下の用途に役立ちます：

- 大きなファイルやデータセット。
- リアルタイムアップデート（例：チャット、プログレスバー）。
- 長時間実行される計算でユーザーに進捗を知らせたい場合。

ストリーミングの特徴を大まかにまとめると以下のようになります：

- データは段階的に配信され、一度に全て渡されるわけではない。
- クライアントはデータを受信しながら処理できる。
- 知覚的なレイテンシを低減しユーザー体験を向上させる。

### なぜストリーミングを使うのか？

ストリーミングを使う理由は以下の通りです：

- ユーザーが終了時だけでなく即時にフィードバックを受け取れる。
- リアルタイムアプリケーションやレスポンシブなUIを可能にする。
- ネットワークと計算資源の効率的な利用ができる。

### シンプルな例：HTTPストリーミングサーバーとクライアント

ストリーミングの実装例を簡単に示します：

#### Python

**サーバー（Python、FastAPIとStreamingResponseを使用）：**

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

**クライアント（Python、requestsを使用）：**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

この例は、サーバーがすべてのメッセージが準備できるのを待つのではなく、メッセージが利用可能になるたびにクライアントに一連のメッセージを送る仕組みを示しています。

**仕組み：**

- サーバーはメッセージが準備でき次第それをyieldする。
- クライアントは到着したチャンクを逐次受信し印刷する。

**要件：**

- サーバーはストリーミングレスポンス（例：FastAPIの`StreamingResponse`）を使用する必要がある。
- クライアントはレスポンスをストリームとして処理する必要がある（requestsの`stream=True`）。
- Content-Typeは通常 `text/event-stream` または `application/octet-stream`。

#### Java

**サーバー（Java、Spring BootとServer-Sent Eventsを使用）：**

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

**クライアント（Java、Spring WebFlux WebClientを使用）：**

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

- Spring Bootのリアクティブスタックで`Flux`を用いたストリーミング
- `ServerSentEvent`がイベントタイプ付きの構造化ストリームを提供
- `WebClient`の`bodyToFlux()`がリアクティブストリーム消費を実現
- `delayElements()`でイベント間の処理時間をシミュレーション
- イベントはクライアント側で扱いやすいよう`info`, `result`などのタイプ指定が可能

### 比較：従来のストリーミング vs MCPストリーミング

従来型のストリーミングとMCPストリーミングの挙動の違いは以下のようにまとめられます：

| 特徴                  | 従来のHTTPストリーミング       | MCPストリーミング（通知）         |
|------------------------|-------------------------------|-------------------------------------|
| メインレスポンス        | チャンク分割                   | 単一レスポンス（最後に送信）       |
| 進捗アップデート         | データチャンクとして送信       | 通知として送信                     |
| クライアントの要件       | ストリームを処理する必要あり   | メッセージハンドラーを実装する必要あり |
| 利用ケース             | 大きなファイル、AIトークンストリーム | 進捗、ログ、リアルタイムフィードバック |

### 観察される主な違い

さらに、以下の主な違いがあります：

- **通信パターン：**
  - 従来のHTTPストリーミング：シンプルなチャンク転送エンコーディングを使ってデータを送信
  - MCPストリーミング：JSON-RPCプロトコルによる構造化された通知システムを使用

- **メッセージフォーマット：**
  - 従来のHTTP：改行を含むプレーンテキストチャンク
  - MCP：メタデータ付き構造化LoggingMessageNotificationオブジェクト

- **クライアント実装：**
  - 従来のHTTP：ストリーミングレスポンスを処理するシンプルなクライアント
  - MCP：異なるタイプのメッセージを処理するためのメッセージハンドラーを持つ高度なクライアント

- **進捗アップデート：**
  - 従来のHTTP：進捗はメインレスポンスストリームの一部
  - MCP：進捗は別の通知メッセージで送信され、メインレスポンスは最後に送る

### 推奨事項

従来のストリーミング（前節の `/stream` エンドポイントを例に示した方式）とMCPストリーミングを選択する際の推奨事項を紹介します。

- **シンプルなストリーミングが必要な場合：** 従来のHTTPストリーミングは実装が簡単で基本的なニーズに十分対応可能です。

- **複雑でインタラクティブなアプリケーションの場合：** MCPストリーミングは豊富なメタデータと通知と最終結果の分離を持つ構造化されたアプローチを提供します。

- **AIアプリケーションに対して：** MCPの通知システムはユーザーに進捗を知らせる長時間実行されるAIタスクに特に有効です。

## MCPにおけるストリーミング

ここまで従来のストリーミングとMCPストリーミングの違いと推奨例を見てきました。次に、MCP内でストリーミングをどのように活用できるか詳細に説明します。

MCPフレームワーク内でストリーミングがどのように機能するか理解することは、長時間実行操作中にユーザーへリアルタイムフィードバックを提供するレスポンシブなアプリケーション構築に不可欠です。

MCPにおけるストリーミングは、メインレスポンスをチャンクごとに送ることではなく、ツールがリクエストを処理している間に<strong>通知</strong>をクライアントへ送ることです。これらの通知は進捗更新、ログ、その他のイベントを含みます。

### 仕組み

メイン結果は単一のレスポンスで送信されますが、処理中に通知を別メッセージとして送信でき、クライアントはリアルタイムにそれらを受け取って表示できます。クライアントは通知を適切に処理・表示できる必要があります。

## 通知とは何か？

「通知」とはMCP文脈で何を意味するのでしょうか？

通知は、長時間の処理中に進捗や状態、その他イベントをクライアントに知らせるためにサーバーから送られるメッセージです。通知は透明性とユーザー体験を向上させます。

例えばクライアントは、サーバーとの初回ハンドシェイクが完了したら通知を送ることが想定されます。

通知はJSONメッセージとして次のようになります：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

通知はMCP内の「[Logging](https://modelcontextprotocol.io/specification/draft/server/utilities/logging)」トピックに属します。

> **廃止通知：** 2026-07-28リリース候補ではLoggingプリミティブはstdioトランスポート向けに `stderr`、構造化された観測性向けにOpenTelemetryへ置き換えられるため廃止予定です。Loggingは2025-11-25仕様および正式廃止後少なくとも1年間は機能します。詳細は [MCP変更点：2026-07-28リリース候補](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) をご覧ください。

ロギングを機能させるには、サーバーが以下のように機能/能力として有効化する必要があります：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> 利用するSDKによっては、ログ機能はデフォルトで有効か、サーバー構成で明示的に有効化が必要な場合があります。

通知には複数の種類があります：

| レベル     | 説明                      | 利用例                        |
|-----------|----------------------------|------------------------------|
| debug     | 詳細なデバッグ情報         | 関数の開始・終了ポイント    |
| info      | 一般的な情報メッセージ     | 処理の進捗更新              |
| notice    | 通常だが重要なイベント     | 設定変更                    |
| warning   | 警告状態                   | 廃止予定機能の利用          |
| error     | エラー状態                 | 処理失敗                    |
| critical  | 重大状態                   | システムコンポーネントの障害 |
| alert     | 直ちに対処が必要           | データ破損の検知            |
| emergency | システムが使用不能         | 完全なシステム障害          |

## MCPでの通知実装

MCPで通知を実装するには、リアルタイムアップデートを処理可能なサーバー側とクライアント側の両方を構築する必要があります。これにより長時間操作中の即時フィードバックが可能になります。

### サーバー側：通知を送信する

まずサーバー側です。MCPではリクエスト処理中に通知を送信できるツールを定義します。サーバーはコンテキストオブジェクト（通常は `ctx`）を使ってメッセージをクライアントに送信します。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

上記の例では、`process_files`ツールは各ファイルの処理中に3回クライアントに通知を送信します。`ctx.info()` メソッドは情報メッセージ送信に使われます。

さらに通知を有効にするには、サーバーがストリーミングトランスポート（例：`streamable-http`）を使い、クライアントが通知処理のためのメッセージハンドラーを実装する必要があります。以下はサーバーで `streamable-http` トランスポートを使う設定例です：

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

こちらの.NET例では、`ProcessFiles`ツールはファイル処理中に3つの通知をクライアントに送っています。`ctx.Info()` メソッドで情報メッセージを送信します。

.NET MCPサーバーで通知を有効にするには、ストリーミングトランスポートを使用していることを確認してください：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### クライアント側：通知を受信する

クライアントは通知を受信・表示するためのメッセージハンドラーを実装する必要があります。

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

上記コードでは、`message_handler`関数がメッセージが通知かどうかを判定し、通知であれば印刷し、そうでなければ通常のサーバーメッセージとして処理します。`ClientSession`の初期化時に`message_handler`を渡して通知ハンドリングを有効にしている点に注意してください。

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

この.NET例では、`MessageHandler`関数が受信メッセージが通知かをチェックし通知であれば印刷、それ以外は通常のサーバーメッセージとして処理します。`ClientSession`は`ClientSessionOptions`でメッセージハンドラーを設定して初期化されています。

通知を有効にするには、サーバーがストリーミングトランスポート（例：`streamable-http`）を使い、クライアントが通知処理のメッセージハンドラーを実装していることが必要です。

## 進捗通知とシナリオ

このセクションでは、MCPにおける進捗通知の概念、その重要性、およびStreamable HTTPを使った実装方法を説明します。理解を深めるための実践課題も用意しています。

進捗通知は、長時間の処理中にサーバーからクライアントへリアルタイムに送られるメッセージです。処理完了を待つ代わりに、サーバーは現在の状態を逐次クライアントに知らせ続けます。これにより透明性とユーザー体験が向上し、デバッグも容易になります。

**例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### なぜ進捗通知を使うのか？

進捗通知が重要な理由は以下の通りです：

- **ユーザー体験の向上：** ユーザーは処理の進行状況が随時見られ、終了時だけでなくなる。
- **リアルタイムフィードバック：** クライアントはプログレスバーやログを表示し、アプリが反応的に感じられる。
- **デバッグや監視が容易に：** 開発者やユーザーは処理がどこで遅延または停止しているかを把握できる。

### 進捗通知の実装方法

進捗通知の実装手順は以下の通りです：

- **サーバー側：** 各処理アイテムごとに`ctx.info()`や`ctx.log()`で通知を送信し、メイン結果が準備される前にクライアントへメッセージを送る。
- **クライアント側：** 到着した通知を受信して表示するメッセージハンドラーを実装し、通知と最終結果を区別する。

**サーバー側の例：**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**クライアント例:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## セキュリティ上の考慮事項

HTTPベースのトランスポートを使用してMCPサーバーを実装する場合、セキュリティは最重要課題となり、複数の攻撃ベクトルと防御機構に細心の注意が必要です。

### 概要

HTTPでMCPサーバーを公開する際にはセキュリティが非常に重要です。Streamable HTTPは新たな攻撃面をもたらし、慎重な設定が求められます。

### 重要ポイント

- **Originヘッダーの検証**: DNSリバインド攻撃を防ぐために`Origin`ヘッダーを常に検証してください。
- <strong>ローカルホストバインディング</strong>: ローカル開発では、サーバーを`localhost`にバインドしてパブリックインターネットに公開しないようにしてください。
- <strong>認証</strong>: 本番環境では認証（例：APIキー、OAuth）を実装してください。
- **CORS**: アクセス制限のためクロスオリジンリソースシェアリング（CORS）ポリシーを設定してください。
- **HTTPS**: トラフィックを暗号化するために本番環境ではHTTPSを使用してください。

### ベストプラクティス

- 到着するリクエストを検証なしに信用しないでください。
- すべてのアクセスとエラーをログおよび監視してください。
- 依存関係を定期的に更新し、セキュリティ脆弱性を修正してください。

### 課題

- セキュリティと開発のしやすさのバランスを取ること
- 多様なクライアント環境との互換性を確保すること

## SSEからStreamable HTTPへのアップグレード

現在Server-Sent Events（SSE）を使用しているアプリケーションは、Streamable HTTPに移行することでMCP実装の機能強化と長期的な持続性向上が期待できます。

### なぜアップグレードするのか？

SSEからStreamable HTTPにアップグレードする理由は主に2つあります：

- Streamable HTTPはSSEよりもスケーラビリティ、互換性、通知機能が優れている。
- 新しいMCPアプリケーションには推奨されるトランスポートである。

### 移行手順

MCPアプリケーションでSSEからStreamable HTTPへ移行する方法は次の通りです：

- サーバーコードを更新し、`mcp.run()`で`transport="streamable-http"`を使用する。
- クライアントコードを更新し、SSEクライアントの代わりに`streamablehttp_client`を使用する。
- クライアント側で通知を処理するメッセージハンドラーを実装する。
- 既存のツールやワークフローとの互換性をテストする。

### 互換性の維持

移行の過程で既存のSSEクライアントと互換性を維持することを推奨します。以下の戦略があります：

- 異なるエンドポイントでSSEとStreamable HTTPの両方のトランスポートを実行してサポートする。
- クライアントを段階的に新しいトランスポートに移行する。

### 課題

移行中に以下の課題に対処してください：

- すべてのクライアントが更新されていることを確実にする
- 通知配信の違いをハンドリングする

## セキュリティ上の考慮事項

HTTPベースのトランスポート（Streamable HTTPなど）を使用する際は、セキュリティを最優先に考慮してください。

HTTPベースのトランスポートを使用してMCPサーバーを実装する場合、複数の攻撃ベクトルと防御機構に細心の注意が必要です。

### 概要

MCPサーバーをHTTPに公開する場合、セキュリティは重要です。Streamable HTTPは新たな攻撃面をもたらし、慎重な設定が必要です。

いくつかの重要なセキュリティ考慮事項を示します：

- **Originヘッダーの検証**: DNSリバインド攻撃を防ぐために`Origin`ヘッダーを必ず検証してください。
- <strong>ローカルホストバインディング</strong>: ローカル開発では`localhost`にバインドしてパブリックに公開しないようにしてください。
- <strong>認証</strong>: 本番環境ではAPIキーやOAuthなどの認証を実装してください。
- **CORS**: アクセス制限のためにCORSポリシーを設定してください。
- **HTTPS**: 通信を暗号化するために本番環境ではHTTPSを使用してください。

### ベストプラクティス

MCPストリーミングサーバーのセキュリティを実装する際に従うべきベストプラクティスは以下の通りです：

- 必ずリクエストの検証を行い、検証なしで信用しないでください。
- すべてのアクセスとエラーをログに記録し、監視してください。
- セキュリティ脆弱性を修正するため依存関係を定期的に更新してください。

### 課題

MCPストリーミングサーバーのセキュリティ実装では以下の課題があります：

- セキュリティと開発のしやすさのバランスを取ること
- 多様なクライアント環境への対応

### 課題：独自のストリーミングMCPアプリを構築する

**シナリオ：**
サーバーが項目リスト（例：ファイルやドキュメント）を処理し、処理した各項目ごとに通知を送信するMCPサーバーとクライアントを構築します。クライアントは通知を受け取ったらリアルタイムで表示します。

**手順：**

1. リストを処理し、各項目に対して通知を送信するサーバーツールを実装します。
2. 通知をリアルタイム表示するためのメッセージハンドラーを備えたクライアントを実装します。
3. サーバーとクライアントを実行して通知の動作を確認します。

[ソリューション](./solution/README.md)

## 続けて読む & 次にすべきこと

MCPストリーミングの学習を続けて知識を深めるために、ここでは追加のリソースとより高度なアプリを構築するための次のステップを提供します。

### 参考文献

- [Microsoft: HTTPストリーミング入門](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET CoreにおけるCORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: ストリーミングリクエスト](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### 次にすべきこと

- ストリーミングを使ってリアルタイム分析、チャット、共同編集を行うより高度なMCPツールを構築してみましょう。
- MCPストリーミングをフロントエンドフレームワーク（React、Vueなど）と統合し、ライブUI更新を探求しましょう。
- 次へ: [VSCode用AIツールキットの活用](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->