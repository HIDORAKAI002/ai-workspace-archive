# Model Context Protocol (MCP) による HTTPS ストリーミング

この章では、HTTPS を使用した Model Context Protocol (MCP) による安全でスケーラブルかつリアルタイムなストリーミングの実装に関する包括的なガイドを提供します。ストリーミングの動機、利用可能なトランスポートメカニズム、MCP におけるストリーム可能な HTTP の実装方法、セキュリティのベストプラクティス、SSE からの移行、そして独自のストリーミング MCP アプリケーションを構築するための実践的な指針を取り扱います。

## MCP におけるトランスポートメカニズムとストリーミング

このセクションでは、MCP で利用可能な異なるトランスポートメカニズムと、それらがクライアントとサーバー間のリアルタイム通信のためのストリーミング機能をどのように有効にしているかを探ります。

### トランスポートメカニズムとは？

トランスポートメカニズムはクライアントとサーバー間でデータがどのように交換されるかを定義します。MCP は異なる環境や要件に対応するために複数のトランスポートタイプをサポートしています：

- **stdio**：標準入出力。ローカル環境や CLI ベースのツールに適しています。簡単ですが、ウェブやクラウドには適しません。
- **SSE (Server-Sent Events)**：サーバーが HTTP 経由でクライアントにリアルタイム更新情報をプッシュ可能。Web UI に適していますが、スケーラビリティと柔軟性に制限があります。MCP 仕様 2025-06-18 以降、独立した SSE トランスポートは廃止され、「Streamable HTTP」トランスポートに置き換えられました。
- **Streamable HTTP**：モダンな HTTP ベースのストリーミングトランスポートで通知に対応し、スケーラビリティが向上。ほとんどの本番およびクラウドシナリオで推奨されます。

### 比較表

以下の比較表でこれらのトランスポートメカニズムの違いを理解してください：

| トランスポート      | リアルタイム更新    | ストリーミング | スケーラビリティ | ユースケース               |
|-------------------|------------------|-----------|-------------|-------------------------|
| stdio             | いいえ           | いいえ    | 低           | ローカル CLI ツール      |
| SSE               | はい             | はい      | 中           | Web、リアルタイム更新     |
| Streamable HTTP   | はい             | はい      | 高           | クラウド、多クライアント  |

> **ヒント:** 適切なトランスポートを選択することはパフォーマンス、スケーラビリティ、ユーザーエクスペリエンスに影響します。**Streamable HTTP** はモダンでスケーラブル、クラウド対応アプリケーションに推奨されます。

前の章で紹介した stdio と SSE のトランスポートに注意し、この章で扱うのはストリーム可能な HTTP トランスポートであることを理解してください。

## ストリーミング：概念と動機

ストリーミングの基本的な概念と動機を理解することは、効果的なリアルタイム通信システムを実装する上で不可欠です。

<strong>ストリーミング</strong> は、ネットワークプログラミングにおいて、全体のレスポンスが準備されるのを待つのではなく、小さな扱いやすいチャンクやイベントの連続としてデータを送受信できる技術です。特に以下に有用です：

- 大容量のファイルやデータセット
- リアルタイム更新（例：チャット、進捗バー）
- ユーザーへの情報提供を継続しながら行う長時間処理

ストリーミングについて知っておくべき高レベルのポイントは以下の通りです：

- データは一括でなく段階的に配信される
- クライアントは到着次第データを処理できる
- 体感遅延を減らしユーザーエクスペリエンスを向上させる

### なぜストリーミングを使うのか？

ストリーミングを利用する理由は以下の通りです：

- ユーザーが処理完了時だけでなく即座にフィードバックを得られる
- リアルタイムなアプリケーションや応答性の高い UI が実現できる
- ネットワークや計算資源の効率的な利用が可能になる

### 簡単な例：HTTP ストリーミングサーバーとクライアント

ストリーミングを実装する簡単な例を紹介します：

#### Python

**サーバー（Python、FastAPI と StreamingResponse を使用）：**

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
  
**クライアント（Python、requests を使用）：**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```
  
この例は、サーバーがメッセージを全て準備完了を待つのではなく、利用可能になり次第クライアントへ連続的に送信する様子を示しています。

**動作原理：**

- サーバーはメッセージが準備でき次第それを順次 yield する
- クライアントは受信したチャンクを逐次処理し表示する

**要件：**

- サーバーは StreamingResponse のようなストリーミングレスポンスを使用すること
- クライアントは stream=True でレスポンスをストリームとして処理すること
- Content-Type は通常 `text/event-stream` または `application/octet-stream`

#### Java

**サーバー（Java、Spring Boot と Server-Sent Events を使用）：**

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
  
**クライアント（Java、Spring WebFlux WebClient を使用）：**

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
  
**Java 実装メモ：**

- Spring Boot のリアクティブスタックで `Flux` を使ったストリーミング
- `ServerSentEvent` はイベントタイプ付き構造化イベントストリーミングを提供
- `WebClient` の `bodyToFlux()` でリアクティブストリームを受信
- `delayElements()` でイベント間の処理時間をシミュレート
- イベントに `info`、`result` といったタイプを持たせてクライアント側処理を向上

### 比較：従来のストリーミング vs MCP ストリーミング

クラシックなストリーミングと MCP におけるストリーミングの働きの違いを次の表に表します：

| 特徴                  | クラシック HTTP ストリーミング    | MCP ストリーミング（通知）           |
|------------------------|-------------------------------|-----------------------------------|
| メインレスポンス       | チャンク形式                   | 単一レスポンス、最後に送信            |
| 進捗更新               | データチャンクとして送信        | 通知として送信                       |
| クライアント要件       | ストリーム処理が必須           | メッセージハンドラーの実装が必須      |
| 利用シーン             | 大容量ファイル、AI トークン列    | 進捗、ログ、リアルタイムフィードバック  |

### 重要な違い

さらに、以下が主な違いです：

- **通信パターン：**
  - クラシック HTTP ストリーミング：単純なチャンク転送エンコーディングでデータを送信
  - MCP ストリーミング：JSON-RPC プロトコルを用いた構造化通知システム

- **メッセージ形式：**
  - クラシック HTTP：改行入りのプレーンテキストチャンク
  - MCP：メタデータ付きの構造化 LoggingMessageNotification オブジェクト

- **クライアント実装：**
  - クラシック HTTP：ストリーミングレスポンスを処理する単純なクライアント
  - MCP：メッセージハンドラーを持ち、多様な種類のメッセージを処理

- **進捗更新：**
  - クラシック HTTP：メインストリームの一部として進捗を含む
  - MCP：メインレスポンスの前に独立した通知メッセージで進捗を送る

### 推奨事項

クラシックストリーミング (`/stream` のようなエンドポイント) の実装と MCP 経由のストリーミングの利用についての推奨は以下の通りです。

- **単純なストリーミングニーズには：** クラシック HTTP ストリーミングは実装が簡単で、基本的なストリーミングには十分。

- **複雑なインタラクティブアプリには：** MCP ストリーミングは豊富なメタデータや通知と最終結果の分離といった構造化を提供。

- **AI アプリケーションには：** MCP の通知システムは、進捗状況を継続的に伝えたい長時間 AI タスクで特に有効。

## MCP におけるストリーミング

これまでの章でクラシックストリーミングと MCP ストリーミングの比較や推奨を見てきました。ここからは MCP でストリーミングを活用する方法について詳しく解説します。

MCP フレームワーク内でのストリーミングの仕組みを理解することは、長時間処理中にユーザーへリアルタイムフィードバックを提供する応答性の高いアプリケーションを構築する上で重要です。

MCP におけるストリーミングは、メインレスポンスをチャンクで送るのではなく、ツールがリクエスト処理中に <strong>通知</strong> をクライアントへ送ることを指します。この通知には進捗状況やログ、その他のイベントが含まれます。

### 動作原理

メイン結果は単一のレスポンスとして送信されますが、処理中に別途通知メッセージを送信してクライアントをリアルタイムで更新します。クライアントはこれらの通知を処理し表示する能力が必要です。

## 通知とは何か？

「通知」とは MCP の文脈でどういう意味でしょうか？

通知は、長時間処理の進捗、状態、その他のイベントを伝えるためにサーバーからクライアントへ送られるメッセージです。通知によって透明性とユーザー体験が向上します。

たとえば、クライアントはサーバーとの初期ハンドシェイク完了時に通知を送ることが想定されます。

通知は JSON メッセージとして次のような形式になります：

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```
  
通知は MCP のトピック ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) に属します。

ログ機能を有効にするには、サーバー側で次のように機能/キャパビリティとして有効化する必要があります：

```json
{
  "capabilities": {
    "logging": {}
  }
}
```
  
> [!NOTE]  
> 使用する SDK によっては、ログはデフォルトで有効か、サーバー設定で明示的に有効化する必要がある場合があります。

通知には以下のような種類があります：

| レベル      | 説明                          | 使用例                            |
|------------|-------------------------------|----------------------------------|
| debug      | 詳細なデバッグ情報             | 関数の開始/終了ポイント           |
| info       | 一般的な情報メッセージ         | 操作の進捗更新                   |
| notice     | 通常だが重要なイベント         | 設定変更                        |
| warning    | 警告状態                      | 非推奨機能の使用                 |
| error      | エラー状態                    | 操作失敗                        |
| critical   | 重大な状態                   | システムコンポーネントの障害      |
| alert      | 直ちに対応が必要な事項          | データ破損の検出                 |
| emergency  | システム使用不可             | システム全体の故障               |

## MCP における通知の実装

通知を MCP で実装するには、サーバー側とクライアント側の両方でリアルタイム更新が処理できるよう設定します。これにより、長時間処理中にユーザーに即時フィードバックを提供可能になります。

### サーバー側：通知の送信

まずサーバー側から始めましょう。MCP では、リクエスト処理中に通知を送れるツールを定義します。サーバーは通常 `ctx` とされるコンテキストオブジェクトを使ってクライアントへメッセージを送信します。

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```
  
前述の例では、`process_files` ツールがファイル処理のたびに 3 件の通知をクライアントに送ります。`ctx.info()` メソッドは情報メッセージ送信に使われます。

加えて通知を有効化するには、サーバーが `streamable-http` のようなストリーミングトランスポートを用い、クライアントが通知処理のメッセージハンドラーを実装していることを保証してください。以下はサーバーで `streamable-http` トランスポートを設定する例です：

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
  
この .NET 例では、`ProcessFiles` ツールに `Tool` 属性が付与され、各ファイル処理時に 3 件の通知をクライアントへ送信します。`ctx.Info()` メソッドは情報メッセージの送信に使用されます。

.NET MCP サーバーで通知を有効化するには、ストリーミングトランスポートを使っているか確認してください：

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```
  
### クライアント側：通知の受信

クライアント側は、通信される通知を受け取って処理・表示できるメッセージハンドラーを実装する必要があります。

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
  
上のコードでは、`message_handler` 関数は受信メッセージが通知かどうかを判別します。通知なら印刷し、そうでなければ通常のサーバーメッセージとして処理します。また、`ClientSession` が通知処理のためメッセージハンドラーと共に初期化されている点にも注目してください。

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
  
この .NET 例では、`MessageHandler` 関数が受信メッセージを通知かどうか判定し、通知であれば印刷しそうでなければ通常のサーバーメッセージとして処理します。`ClientSession` は `ClientSessionOptions` 経由でメッセージハンドラーを設定して初期化されます。

通知を有効にするには、サーバーは `streamable-http` のようなストリーミングトランスポートを使い、クライアントは通知を処理するメッセージハンドラーを実装する必要があります。

## 進捗通知と利用例

このセクションでは MCP における進捗通知の概念、重要性、Streamable HTTP を使った実装方法を解説し、理解を深めるための実践課題も提供します。

進捗通知は、長時間の処理中にサーバーからクライアントへリアルタイム送信されるメッセージです。処理の完了を待つことなく、サーバーが現在の状況をクライアントに随時伝えます。これにより透明性とユーザー体験の向上、デバッグの容易さが実現されます。

**例：**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```
  
### なぜ進捗通知を使うのか？

進捗通知が重要な理由は以下の通りです：

- **ユーザー体験の向上：** 処理途中の更新が見えるため、終了時だけでなく継続的に状態を把握可能。
- **リアルタイムフィードバック：** クライアントは進捗バーやログを表示して応答性を感じさせることができる。
- **デバッグと監視の容易化：** 開発者やユーザーは処理の遅延箇所や停滞場所を把握可能。

### 進捗通知の実装方法

MCP で進捗通知を実装する手順は以下の通りです：

- **サーバー側：** アイテム処理のたびに `ctx.info()` または `ctx.log()` を使い通知を送信する。メイン結果が準備完了する前にクライアントへメッセージを送れる。
- **クライアント側：** 通知を受信し表示するメッセージハンドラーを実装する。通知と最終結果を区別できるようにする。

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
  
## セキュリティ上の考慮点

HTTP ベースのトランスポートで MCP サーバーを実装する際は、複数の攻撃ベクトルと防御機構に対処するためにセキュリティが最重要課題となります。

### 概要

HTTP 経由で MCP サーバーを公開する場合、ストリーム可能な HTTP は新たな攻撃面を生じるため、慎重な設定が必要です。

### 主要ポイント

- **Origin ヘッダー検証**：DNS リバインディング攻撃を防ぐために常に `Origin` ヘッダーを検証すること。
- <strong>ローカルホストバインド</strong>：ローカル開発時は公開インターネットにさらされぬようサーバーを `localhost` にバインドすること。
- <strong>認証</strong>：本番環境では API キーや OAuth などの認証を導入すること。
- **CORS**：クロスオリジンリソース共有ポリシーを構成しアクセス制限を行うこと。
- **HTTPS**：通信の暗号化のため本番環境では HTTPS を利用すること。

### ベストプラクティス

- 送信されるリクエストは必ず検証を行い、盲目的に信頼しないこと。
- 全てのアクセスとエラーをログ記録し監視すること。
- セキュリティ脆弱性のパッチ適用のため依存ライブラリを定期的に更新すること。

### 課題
- セキュリティと開発の容易さのバランスを取る
- さまざまなクライアント環境との互換性を確保する

## SSEからStreamable HTTPへのアップグレード

現在Server-Sent Events（SSE）を使用しているアプリケーションでは、Streamable HTTPへの移行により、MCP実装の能力が向上し、長期的な持続可能性が向上します。

### なぜアップグレードするのか？

SSEからStreamable HTTPにアップグレードするには2つの説得力のある理由があります：

- Streamable HTTPは、SSEよりも優れたスケーラビリティ、互換性、より豊富な通知サポートを提供します。
- 新しいMCPアプリケーションには推奨されるトランスポートです。

### 移行手順

MCPアプリケーションでSSEからStreamable HTTPに移行する方法は次のとおりです：

- サーバーコードを更新し、`mcp.run()`で`transport="streamable-http"`を使用します。
- クライアントコードを更新し、SSEクライアントの代わりに`streamablehttp_client`を使用します。
- クライアントにメッセージハンドラーを実装し、通知を処理します。
- 既存のツールやワークフローとの互換性をテストします。

### 互換性の維持

移行プロセス中は既存のSSEクライアントとの互換性を維持することを推奨します。以下はそのための戦略です：

- 異なるエンドポイントで両方のトランスポート（SSEとStreamable HTTP）を実行してサポートできます。
- 徐々にクライアントを新しいトランスポートへ移行します。

### 課題

移行中に次の課題に対処してください：

- すべてのクライアントが更新されることを確実にする
- 通知の配信方法の違いを処理する

## セキュリティに関する考慮事項

特にMCPでStreamable HTTPのようなHTTPベースのトランスポートを使用する場合、サーバーの実装時にはセキュリティが最重要課題となります。

HTTPベースのトランスポートを用いたMCPサーバーの実装では、多数の攻撃ベクトルおよび防御メカニズムに注意を払う必要があります。

### 概要

MCPサーバーをHTTP公開する場合、セキュリティは極めて重要です。Streamable HTTPは新たな攻撃面を生じるため、慎重な設定が求められます。

主なセキュリティ考慮点は以下のとおりです：

- **Originヘッダーの検証**：DNSリバインディング攻撃を防ぐために`Origin`ヘッダーを必ず検証してください。
- <strong>ローカルホストバインド</strong>：開発環境では、サーバーを`localhost`にバインドして公開インターネットからのアクセスを避けてください。
- <strong>認証</strong>：本番環境ではAPIキーやOAuthなどの認証を実装してください。
- **CORS**：アクセスを制限するためにクロスオリジンリソース共有（CORS）ポリシーを設定してください。
- **HTTPS**：トラフィックを暗号化するため、本番ではHTTPSを使用してください。

### ベストプラクティス

MCPストリーミングサーバーのセキュリティ実装においては、以下のベストプラクティスを遵守してください：

- 検証なしに受信リクエストを信用しない。
- すべてのアクセスとエラーをログおよび監視する。
- セキュリティ脆弱性の修正のため定期的に依存関係を更新する。

### 課題

MCPストリーミングサーバーのセキュリティ実装では次の課題に直面します：

- セキュリティと開発の容易さのバランスを取る
- さまざまなクライアント環境との互換性を確保する

### 課題：独自のストリーミングMCPアプリを構築する

**シナリオ：**  
サーバーはアイテムのリスト（例：ファイルやドキュメント）を処理し、処理ごとに通知を送信します。クライアントは届いた通知を逐次表示します。

**手順：**

1. アイテムのリストを処理し、各アイテムの通知を送信するサーバーツールを実装します。  
2. 通知をリアルタイムに表示するメッセージハンドラーを備えたクライアントを実装します。  
3. サーバーとクライアントの両方を実行して実装をテストし、通知を観察します。

[Solution](./solution/README.md)

## さらなる学習と今後の展開

MCPストリーミングの理解を深め、より高度なアプリケーション構築へ進むための追加リソースや次のステップを紹介します。

### さらなる学習

- [Microsoft: Introduction to HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)  
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Microsoft: CORS in ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Python requests: Streaming Requests](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)  

### 今後の展開

- ストリーミングを利用したリアルタイム解析、チャット、コラボレーション編集などのより高度なMCPツールの構築に挑戦しましょう。  
- MCPストリーミングをReactやVueなどのフロントエンドフレームワークと統合し、ライブUI更新を探求しましょう。  
- 次へ: [Utilising AI Toolkit for VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責事項**：
本書類は AI 翻訳サービス [Co-op Translator](https://github.com/Azure/co-op-translator) を使用して翻訳されています。正確性を期していますが、自動翻訳には誤りや不正確な部分が含まれる可能性があることをご承知おきください。原文の原語版が正式な情報源とみなされるべきです。重要な情報については、専門の人間による翻訳を推奨します。本翻訳の利用により生じたいかなる誤解や解釈違いについても、当方は責任を負いかねます。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->