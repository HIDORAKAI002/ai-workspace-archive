# Model Context Protokolü (MCP) ile HTTPS Yayını

Bu bölüm, Model Context Protokolü (MCP) kullanarak HTTPS üzerinden güvenli, ölçeklenebilir ve gerçek zamanlı yayın yapmanın kapsamlı bir rehberini sunar. Yayın yapma motivasyonunu, mevcut taşıma mekanizmalarını, MCP'de yayın yapılabilir HTTP'nin nasıl uygulanacağını, güvenlik en iyi uygulamalarını, SSE'den geçişi ve kendi yayın yapan MCP uygulamalarınızı oluşturmak için pratik rehberi kapsar.

> **İleriye bakış:** Bu ders, bir oturumun `initialize` esnasında kurulduğu ve `Mcp-Session-Id` başlığı ile sabitlendiği **MCP Specification 2025-11-25** altındaki Yayın Yapılabilir HTTP’yi açıklar. `2026-07-28` sürüm adayı el sıkışmayı ve oturum kimliğini tamamen kaldırarak her isteğin kendi içinde bağımsız ve herhangi bir sunucu örneğine yönlendirilebilir olmasını sağlar; sticky oturumlara gerek kalmaz. Ayrıntılar için bkz. [MCP’de Neler Değişiyor: 2026-07-28 Sürüm Adayı](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## MCP'de Taşıma Mekanizmaları ve Yayın

Bu bölüm, MCP’de mevcut farklı taşıma mekanizmalarını ve bunların istemciler ile sunucular arasında gerçek zamanlı iletişim için yayın yapma yeteneklerini nasıl sağladığını inceler.

### Taşıma Mekanizması Nedir?

Bir taşıma mekanizması, verinin istemci ve sunucu arasında nasıl değiş tokuş edildiğini tanımlar. MCP, farklı ortamlar ve gereksinimlere uygun birden çok taşıma tipi destekler:

- **stdio**: Standart giriş/çıkış, yerel ve CLI tabanlı araçlar için uygundur. Basit ancak web veya bulut için uygun değildir.
- **SSE (Server-Sent Events)**: Sunucuların HTTP üzerinden istemcilere gerçek zamanlı güncellemeler göndermesine olanak tanır. Web UI için iyidir ancak ölçeklenebilirlik ve esneklik açısından sınırlıdır. MCP Specification 2025-06-18 itibarıyla bağımsız SSE taşıması kullanımdan kaldırılmış ve yerine "Yayın Yapılabilir HTTP" taşınmıştır.
- **Yayın Yapılabilir HTTP**: Bildirimleri destekleyen ve daha iyi ölçeklenebilirlik sağlayan modern HTTP tabanlı yayın taşımasıdır. Çoğu üretim ve bulut senaryosu için önerilir.

### Karşılaştırma Tablosu

Aşağıdaki karşılaştırma tablosuna göz atarak bu taşıma mekanizmaları arasındaki farkları anlayın:

| Taşıma           | Gerçek Zamanlı Güncellemeler | Yayın     | Ölçeklenebilirlik | Kullanım Durumu         |
|------------------|------------------------------|-----------|-------------------|------------------------|
| stdio            | Hayır                        | Hayır     | Düşük             | Yerel CLI araçları     |
| SSE              | Evet                         | Evet      | Orta              | Web, gerçek zamanlı güncellemeler |
| Yayın Yapılabilir HTTP | Evet                    | Evet      | Yüksek            | Bulut, çoklu istemci    |

> **İpucu:** Doğru taşıyıcıyı seçmek performansı, ölçeklenebilirliği ve kullanıcı deneyimini etkiler. Modern, ölçeklenebilir ve bulut hazır uygulamalar için **Yayın Yapılabilir HTTP** önerilir.

Önceki bölümlerde size gösterilen stdio ve SSE taşıma türlerine ve bu bölümde ele alınan yayın yapılabilir HTTP taşımasına dikkat edin.

## Yayın: Kavramlar ve Motivasyon

Yayın yapmanın temel kavramlarını ve motivasyonlarını anlamak, etkili gerçek zamanlı iletişim sistemleri uygulamak için esastır.

**Yayın**, ağ programlamada, tüm yanıt hazır olana kadar beklemek yerine verilerin küçük, yönetilebilir parçalar veya bir dizi olay olarak gönderilip alınmasına olanak tanıyan bir tekniktir. Özellikle şu durumlar için faydalıdır:

- Büyük dosyalar veya veri kümeleri.
- Gerçek zamanlı güncellemeler (ör. sohbet, ilerleme çubukları).
- Uzun süren işlemler sırasında kullanıcıyı bilgilendirmek.

Yayın hakkında bilmeniz gerekenler:

- Veri aşamalı olarak iletilir, hepsi birden değil.
- İstemci veriyi geldiği gibi işleyebilir.
- Algılanan gecikmeyi azaltır ve kullanıcı deneyimini iyileştirir.

### Neden yayın kullanılır?

Yayın kullanmanın nedenleri şunlardır:

- Kullanıcılar sadece sonda değil, hemen geri bildirim alır.
- Gerçek zamanlı uygulamalar ve duyarlı kullanıcı arayüzlerini mümkün kılar.
- Ağ ve bilgi işlem kaynaklarının daha verimli kullanımı.

### Basit Örnek: HTTP Yayın Sunucusu & İstemcisi

Yayınlamanın nasıl uygulanabileceğine dair basit bir örnek:

#### Python

**Sunucu (Python, FastAPI ve StreamingResponse kullanarak):**

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

**İstemci (Python, requests kullanarak):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Bu örnek, sunucunun tüm mesajlar hazır olana kadar beklemek yerine, mesajlar hazır oldukça istemciye bir dizi mesaj göndermesini göstermektedir.

**Nasıl çalışır:**

- Sunucu her mesajı hazır olur olmaz üretir.
- İstemci gelen her parçayı alır ve yazdırır.

**Gereksinimler:**

- Sunucu yayın yanıtı kullanmalıdır (örneğin FastAPI’de `StreamingResponse`).
- İstemci yanıtı bir akış olarak işlemelidir (`requests`'te `stream=True`).
- İçerik türü genellikle `text/event-stream` veya `application/octet-stream` olur.

#### Java

**Sunucu (Java, Spring Boot ve Server-Sent Events kullanarak):**

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

**İstemci (Java, Spring WebFlux WebClient kullanarak):**

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

**Java Uygulama Notları:**

- Spring Boot’ın reaktif yığını `Flux` kullanılarak yayın yapılır
- `ServerSentEvent` tür bazlı yapılandırılmış olay yayını sağlar
- `WebClient` ile `bodyToFlux()` çağrısı reaktif yayın tüketimini mümkün kılar
- `delayElements()` olaylar arası işlem süresi simüle eder
- Olaylar türlere (`info`, `result`) sahip olabilir, böylece istemci için daha iyi yönetilebilir

### Karşılaştırma: Klasik Yayın vs MCP Yayın

Yayınlamanın klasik yöntemlerle MCP’de nasıl çalıştığının farkları şu şekilde özetlenebilir:

| Özellik               | Klasik HTTP Yayını           | MCP Yayını (Bildirimler)         |
|-----------------------|-----------------------------|---------------------------------|
| Ana yanıt             | Parçalanmış (chunked)       | Tek parça, sonda                 |
| İlerleme güncellemeleri| Veri parçaları olarak gönderilir | Bildirimler olarak gönderilir    |
| İstemci gereksinimleri | Akışı işleyebilmelidir      | Mesaj işleyici uygulamalıdır     |
| Kullanım durumu       | Büyük dosyalar, AI token akışları | İlerleme, loglar, gerçek zamanlı geri bildirim |

### Fark Edilen Ana Farklar

Buna ek olarak, bazı önemli farklar:

- **İletişim Deseni:**
  - Klasik HTTP yayını: Basit parçalanmış transfer kodlamasıyla veri gönderir
  - MCP yayını: JSON-RPC protokolü ile yapılandırılmış bildirim sistemi kullanır

- **Mesaj Formatı:**
  - Klasik HTTP: Yeni satırlarla ayrılmış düz metin parçaları
  - MCP: Meta veriler içeren yapılandırılmış LoggingMessageNotification nesneleri

- **İstemci Uygulaması:**
  - Klasik HTTP: Yayın yanıtlarını işleyen basit istemci
  - MCP: Farklı mesaj türlerini işleyen gelişmiş mesaj işleyici

- **İlerleme Güncellemeleri:**
  - Klasik HTTP: İlerleme ana yanıt akışının parçası
  - MCP: İlerleme ayrı bildirim mesajları olarak gönderilir, ana yanıt sonda gelir

### Öneriler

Klasik yayınlama (örneğin yukarıda `/stream` ile gösterilen uç nokta) ile MCP üzerinden yayın arasında seçim yaparken bazı öneriler:

- **Basit yayın ihtiyaçları için:** Klasik HTTP yayını uygulaması daha basittir ve temel ihtiyaçlar için yeterlidir.
- **Karmaşık, etkileşimli uygulamalar için:** MCP yayını, zengin meta veriler ve bildirimlerle sonuçlar arasında ayrım sunan, daha yapılandırılmış bir yaklaşım sağlar.
- **Yapay zeka uygulamaları için:** MCP’nin bildirim sistemi, uzun süren AI görevleri sırasında kullanıcıları ilerleme hakkında bilgilendirmek için özellikle faydalıdır.

## MCP’de Yayın Yapmak

Tamam, şimdiye kadar klasik yayın ile MCP yayın arasındaki farklar ve öneriler hakkında bilgi edindiniz. MCP’de yayınlamayı nasıl kullanacağınızı ayrıntılı ele alalım.

MCP çerçevesinde yayınlamanın nasıl çalıştığını anlamak, uzun süren işlemler sırasında kullanıcılara gerçek zamanlı geri bildirim sağlayan duyarlı uygulamalar geliştirmek için gereklidir.

MCP’de yayın, ana yanıtı parçalar halinde göndermekten ziyade, bir aracın isteği işlerken istemciye **bildirimler** göndermesi ile ilgilidir. Bu bildirimler ilerleme güncellemeleri, loglar veya diğer olayları içerebilir.

### Nasıl çalışır

Ana sonuç hâlâ tek bir yanıt olarak gönderilir. Ancak bildirimler işleme sırasında ayrı mesajlar olarak gönderilebilir ve böylece istemci gerçek zamanlı olarak güncellenir. İstemcinin bu bildirimleri işleyip gösterebilmesi gerekir.

## Bildirim Nedir?

"Bildirim" dedik, Peki MCP bağlamında ne anlama gelir?

Bir bildirim, sunucudan istemciye uzun süren bir işlem sırasında ilerleme, durum veya diğer olaylar hakkında bilgi vermek için gönderilen mesajdır. Bildirimler şeffaflığı ve kullanıcı deneyimini artırır.

Örneğin, istemci sunucu ile ilk el sıkışma yapıldıktan sonra bir bildirim göndermelidir.

Bir bildirim JSON mesajı olarak şu şekildedir:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Bildirimler, MCP’de ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) olarak adlandırılan bir konuya aittir.

Loglamanın çalışması için sunucunun bu özelliği/fonksiyonu şu şekilde etkinleştirmesi gerekir:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Kullanılan SDK’ya bağlı olarak, loglama varsayılan olarak etkin olabilir veya sunucu yapılandırmanızda açıkça etkinleştirmeniz gerekebilir.

Farklı bildirim türleri vardır:

| Seviyeler  | Açıklama                      | Örnek Kullanım Durumu       |
|------------|-------------------------------|-----------------------------|
| debug      | Ayrıntılı hata ayıklama bilgisi | Fonksiyon giriş/çıkış noktaları |
| info       | Genel bilgilendirici mesajlar  | İşlem ilerleme güncellemeleri |
| notice     | Normal ama önemli olaylar       | Yapılandırma değişiklikleri  |
| warning    | Uyarı durumları                | Kullanımdan kalkmış özellik kullanımı |
| error      | Hata durumları                | İşlem hataları              |
| critical   | Kritik durumlar               | Sistem bileşeni hataları     |
| alert      | Hemen işlem yapılması gereken durum | Veri bozulması tespit edildi |
| emergency  | Sistem kullanılamaz durumda   | Tam sistem arızası           |

## MCP'de Bildirimleri Uygulamak

Bildirimleri uygulamak için hem sunucu tarafını hem de istemci tarafını gerçek zamanlı güncellemeleri işleyebilecek şekilde yapılandırmanız gerekir. Bu, uygulamanızın uzun süren işlemler sırasında kullanıcılara anlık geri bildirim sunmasını sağlar.

### Sunucu tarafı: Bildirim Gönderimi

Başlangıç sunucu tarafı ile. MCP’de, istekleri işlerken bildirim gönderebilen araçları tanımlarsınız. Sunucu, bağlam nesnesi (genellikle `ctx`) aracılığıyla istemciye mesaj gönderir.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Yukarıdaki örnekte, `process_files` aracı her dosya işlendikçe istemciye üç bildirim gönderir. `ctx.info()` yöntemi bilgilendirici mesajlar göndermek için kullanılır.

Ayrıca bildirimleri etkinleştirmek için sunucunuzun yayın taşıması (örneğin `streamable-http`) kullanması ve istemcinizin bildirimleri işlemek için bir mesaj işleyici uygulaması gerekir. Sunucuyu `streamable-http` taşımasını kullanacak şekilde şöyle yapılandırabilirsiniz:

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

Bu .NET örneğinde, `ProcessFiles` aracı `Tool` özniteliği ile işaretlenmiş ve her dosya işlendikçe istemciye üç bildirim gönderir. `ctx.Info()` yöntemi bilgilendirici mesajlar göndermek için kullanılır.

.NET MCP sunucunuzda bildirimleri etkinleştirmek için streaming taşıması kullandığınızdan emin olun:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### İstemci tarafı: Bildirim Alımı

İstemci, bildirimleri geldiği gibi işlemek ve göstermek için bir mesaj işleyici uygulamalıdır.

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

Yukarıdaki kodda `message_handler` fonksiyonu gelen mesajın bildirim olup olmadığını kontrol eder. Eğer bildirimse ekrana yazdırır, değilse normal bir sunucu mesajı olarak işler. `ClientSession` ise bildirimleri işlemek üzere `message_handler` ile başlatılır.

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

Bu .NET örneğinde `MessageHandler` fonksiyonu gelen mesajın bildirim olup olmadığını denetler. Bildirimse ekrana yazdırır, değilse normal sunucu mesajı olarak işler. `ClientSession`, `ClientSessionOptions` aracılığıyla mesaj işleyici ile başlatılır.

Bildirimleri etkinleştirmek için sunucunuzun streaming taşıması (örneğin `streamable-http`) kullandığından ve istemcinizin bildirimleri işleyebilen bir mesaj işleyici uyguladığından emin olun.

## İlerleme Bildirimleri & Senaryolar

Bu bölüm MCP’de ilerleme bildirimleri kavramını, neden önemli olduklarını ve Streamable HTTP ile nasıl uygulanacaklarını açıklar. Ayrıca öğreniminizi pekiştirmek için pratik bir ödev içerir.

İlerleme bildirimleri, uzun süren işlemler sırasında sunucudan istemciye gerçek zamanlı gönderilen mesajlardır. Tüm sürecin bitmesini beklemek yerine, sunucu istemciyi mevcut durum hakkında güncel tutar. Bu şeffaflığı, kullanıcı deneyimini artırır ve hata ayıklamayı kolaylaştırır.

**Örnek:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Neden İlerleme Bildirimleri Kullanılır?

İlerleme bildirimleri şu nedenlerle çok önemlidir:

- **Daha iyi kullanıcı deneyimi:** Kullanıcılar, işlem tamamlanmadan güncellemeleri görür.
- **Gerçek zamanlı geri bildirim:** İstemciler ilerleme çubukları veya loglar göstererek uygulamanın duyarlı hale gelmesini sağlar.
- **Kolay hata ayıklama ve izleme:** Geliştiriciler ve kullanıcılar işlemin yavaş veya takılmış olduğu yeri görebilir.

### İlerleme Bildirimleri Nasıl Uygulanır

MCP’de ilerleme bildirimlerini şöyle uygulayabilirsiniz:

- **Sunucu tarafında:** Her öğe işlendiğinde `ctx.info()` veya `ctx.log()` ile bildirim gönderin. Bu, ana sonuç hazır olmadan istemciye mesaj gönderir.
- **İstemci tarafında:** Gelen bildirimleri dinleyip gösteren bir mesaj işleyici uygulayın. Bu işleyici bildirimler ile final sonucu ayırt eder.

**Sunucu Örneği:**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**İstemci Örneği:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Güvenlik Hususları

HTTP tabanlı taşıma kullanan MCP sunucuları uygularken, güvenlik çok önemli bir konudur ve birden fazla saldırı vektörü ile koruma mekanizmasına dikkatle yaklaşılması gerekir.

### Genel Bakış

MCP sunucularını HTTP üzerinden açarken güvenlik kritiktir. Yayın Yapılabilir HTTP yeni saldırı yüzeyleri getirir ve dikkatli yapılandırma gerektirir.

### Ana Noktalar
- **Origin Başlık Doğrulaması**: DNS yeniden bağlama saldırılarını önlemek için `Origin` başlığını her zaman doğrulayın.
- **Localhost Bağlama**: Yerel geliştirme için, sunucuları herkese açık internetten korumak için `localhost`'a bağlayın.
- **Kimlik Doğrulama**: Üretim dağıtımları için kimlik doğrulama (örneğin, API anahtarları, OAuth) uygulayın.
- **CORS**: Erişimi kısıtlamak için Çapraz Kaynak Paylaşımı (CORS) politikalarını yapılandırın.
- **HTTPS**: Üretimde trafiği şifrelemek için HTTPS kullanın.

### En İyi Uygulamalar

- Gelen isteklere doğrulama olmadan asla güvenmeyin.
- Tüm erişimleri ve hataları kaydedin ve izleyin.
- Güvenlik açıklarını gidermek için bağımlılıkları düzenli olarak güncelleyin.

### Zorluklar

- Güvenlik ile geliştirme kolaylığını dengelemek
- Farklı istemci ortamlarıyla uyumluluğu sağlamak

## SSE’den Streamable HTTP’ye Yükseltme

Şu anda Server-Sent Events (SSE) kullanan uygulamalar için, Streamable HTTP’ye geçiş, MCP uygulamalarınıza gelişmiş özellikler ve daha iyi uzun vadeli sürdürülebilirlik sunar.

### Neden Yükseltmelisiniz?

SSE’den Streamable HTTP’ye geçmek için iki önemli neden vardır:

- Streamable HTTP, SSE’ye kıyasla daha iyi ölçeklenebilirlik, uyumluluk ve zengin bildirim desteği sunar.
- Yeni MCP uygulamaları için önerilen taşıma protokolüdür.

### Geçiş Adımları

MCP uygulamalarınızda SSE’den Streamable HTTP’ye şu şekilde geçiş yapabilirsiniz:

- Sunucu kodunu `mcp.run()` içinde `transport="streamable-http"` kullanacak şekilde güncelleyin.
- İstemci kodunu SSE istemcisi yerine `streamablehttp_client` olarak güncelleyin.
- Bildirimleri işlemek için istemcide bir mesaj işleyici uygulayın.
- Mevcut araçlar ve iş akışlarıyla uyumluluğu test edin.

### Uyumluluğu Korumak

Geçiş sürecinde mevcut SSE istemcileriyle uyumluluğu korumanız önerilir. İşte bazı stratejiler:

- Farklı uç noktalar üzerinde hem SSE hem de Streamable HTTP taşıma protokolünü destekleyebilirsiniz.
- İstemcileri kademeli olarak yeni taşıma protokolüne geçirin.

### Zorluklar

Geçiş sırasında şu zorlukları göz önünde bulundurun:

- Tüm istemcilerin güncellendiğinden emin olmak
- Bildirim teslimatındaki farklılıkları yönetmek

## Güvenlik Hususları

Özellikle MCP’de Streamable HTTP gibi HTTP tabanlı taşıma protokolleri kullanırken, herhangi bir sunucuyu uygularken güvenlik birinci öncelik olmalıdır.

HTTP tabanlı taşıma protokolleriyle MCP sunucuları uygularken, birden çok saldırı vektörü ve koruma mekanizmasına dikkat edilmesi gereken kritik bir güvenlik gereksinimi ortaya çıkar.

### Genel Bakış

MCP sunucularını HTTP üzerinden açarken güvenlik kritik önemdedir. Streamable HTTP yeni saldırı yüzeyleri ortaya çıkarır ve dikkatli yapılandırma gerektirir.

İşte bazı önemli güvenlik hususları:

- **Origin Başlık Doğrulaması**: DNS yeniden bağlama saldırılarını önlemek için `Origin` başlığını her zaman doğrulayın.
- **Localhost Bağlama**: Yerel geliştirme için, sunucuları herkese açık internetten korumak için `localhost`'a bağlayın.
- **Kimlik Doğrulama**: Üretim dağıtımları için kimlik doğrulama (örneğin, API anahtarları, OAuth) uygulayın.
- **CORS**: Erişimi kısıtlamak için Çapraz Kaynak Paylaşımı (CORS) politikalarını yapılandırın.
- **HTTPS**: Üretimde trafiği şifrelemek için HTTPS kullanın.

### En İyi Uygulamalar

Ayrıca, MCP akış sunucunuzu güvenli hale getirirken aşağıdaki en iyi uygulamaları takip edin:

- Gelen isteklere doğrulama olmadan asla güvenmeyin.
- Tüm erişimleri ve hataları kaydedin ve izleyin.
- Güvenlik açıklarını gidermek için bağımlılıkları düzenli olarak güncelleyin.

### Zorluklar

MCP akış sunucularında güvenlik uygularken karşılaşacağınız bazı zorluklar:

- Güvenlik ile geliştirme kolaylığını dengelemek
- Farklı istemci ortamlarıyla uyumluluğu sağlamak

### Ödev: Kendi Akışçı MCP Uygulamanızı Oluşturun

**Senaryo:**  
Sunucu, bir öğe listesini (örneğin, dosyalar veya belgeler) işleyen ve işlenen her öğe için bir bildirim gönderen bir MCP sunucusu ve istemcisi oluşturun. İstemci, her bildirimi varır varmaz görüntülemelidir.

**Adımlar:**

1. Bir listeyi işleyen ve her öğe için bildirim gönderen bir sunucu aracı uygulayın.  
2. Bildirimleri gerçek zamanlı göstermek için istemcide bir mesaj işleyici uygulayın.  
3. Hem sunucuyu hem de istemciyi çalıştırarak uygulamanızı test edin ve bildirimleri gözlemleyin.

[Çözüm](./solution/README.md)

## Daha Fazla Okuma ve Sonraki Adımlar

MCP akışını öğrenmeye devam etmek ve bilginizi genişletmek için bu bölüm, daha gelişmiş uygulamalar inşa etmek üzere ek kaynaklar ve önerilen sonraki adımları sunar.

### Daha Fazla Okuma

- [Microsoft: HTTP Akışına Giriş](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET Core’da CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Akışlı İstekler](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Sonraki Adımlar

- Gerçek zamanlı analizler, sohbet veya ortak düzenleme için akış kullanan daha gelişmiş MCP araçları oluşturmayı deneyin.  
- MCP akışını canlı UI güncellemeleri için frontend frameworkleri (React, Vue vb.) ile entegre etmeyi keşfedin.  
- Sonraki: [VSCode için AI Araç Kiti Kullanımı](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->