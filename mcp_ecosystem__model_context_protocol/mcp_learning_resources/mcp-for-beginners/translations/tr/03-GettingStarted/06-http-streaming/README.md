# Model Context Protocol (MCP) ile HTTPS Akışı

Bu bölüm, Model Context Protocol (MCP) kullanarak HTTPS ile güvenli, ölçeklenebilir ve gerçek zamanlı akış uygulamaya yönelik kapsamlı bir rehber sunar. Akışın motivasyonu, mevcut taşıma mekanizmaları, MCP'de akış yapılabilir HTTP'nin nasıl uygulanacağı, güvenlik en iyi uygulamaları, SSE'den geçiş ve kendi akış uygulamanızı oluşturmak için pratik rehberlik konularını kapsar.

> **İleriye bakış:** Bu ders, bir oturumun `initialize` sırasında kurulduğu ve `Mcp-Session-Id` başlığı ile sabitlendiği **MCP Spesifikasyonu 2025-11-25** altındaki Akış Yapılabilir HTTP'yi anlatır. `2026-07-28` sürüm adayı, el sıkışmayı ve oturum kimliğini tamamen kaldırarak, her isteğin kendi içinde bağımsız olmasını ve herhangi bir sunucu örneğine yapışkan oturumlar olmadan yönlendirilmesini sağlar. Detaylar için [MCP'de Değişenler: 2026-07-28 Sürüm Adayı](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) sayfasına bakınız.

## MCP'deki Taşıma Mekanizmaları ve Akış

Bu bölüm, MCP'de mevcut farklı taşıma mekanizmalarını ve istemciler ile sunucular arasında gerçek zamanlı iletişim için akış yeteneklerini etkinleştirmedeki rollerini incelemektedir.

### Taşıma Mekanizması Nedir?

Bir taşıma mekanizması, verilerin istemci ve sunucu arasında nasıl değiştirileceğini tanımlar. MCP, farklı ortamlar ve gereksinimler için birden çok taşıma türünü destekler:

- **stdio**: Standart giriş/çıkış, yerel ve CLI tabanlı araçlar için uygundur. Basit ama web veya bulut için uygun değildir.
- **SSE (Sunucu Gönderimli Olaylar)**: Sunucuların HTTP üzerinden istemcilere gerçek zamanlı güncellemeler göndermesini sağlar. Web arayüzleri için iyidir, ancak ölçeklenebilirlik ve esneklik açısından sınırlıdır. MCP Spesifikasyonu 2025-06-18 itibariyle, bağımsız SSE taşıması kullanım dışı bırakılmış ve "Akış Yapılabilir HTTP" taşıması ile değiştirilmiştir.
- **Akış Yapılabilir HTTP**: Bildirimler ve daha iyi ölçeklenebilirlik destekleyen modern HTTP tabanlı akış taşıması. Çoğu üretim ve bulut senaryosu için önerilir.

### Karşılaştırma Tablosu

Aşağıdaki karşılaştırma tablosuna bakarak bu taşıma mekanizmaları arasındaki farkları anlayabilirsiniz:

| Taşıma Türü      | Gerçek Zamanlı Güncellemeler | Akış       | Ölçeklenebilirlik | Kullanım Alanı          |
|-------------------|------------------------------|------------|-------------------|-------------------------|
| stdio             | Hayır                        | Hayır      | Düşük             | Yerel CLI araçları      |
| SSE               | Evet                         | Evet       | Orta              | Web, gerçek zamanlı güncellemeler |
| Akış Yapılabilir HTTP | Evet                      | Evet       | Yüksek            | Bulut, çoklu istemci     |

> **İpucu:** Doğru taşıma seçimi performans, ölçeklenebilirlik ve kullanıcı deneyimini etkiler. Modern, ölçeklenebilir ve buluta hazır uygulamalar için **Akış Yapılabilir HTTP** önerilir.

Önceki bölümlerde gösterilen stdio ve SSE taşıma türlerini ve bu bölümde ele alınan akış yapılabilir HTTP taşımasını not edin.

## Akış: Kavramlar ve Motivasyon

Akışın temel kavramlarını ve motivasyonlarını anlamak, etkili gerçek zamanlı iletişim sistemlerini uygulamak için önemlidir.

**Akış**, tüm yanıtın hazır olmasını beklemek yerine verilerin küçük, yönetilebilir parçalar halinde veya olaylar dizisi olarak gönderilip alınmasını sağlayan bir ağ programlama tekniğidir. Bu özellikle şunlar için faydalıdır:

- Büyük dosyalar veya veri setleri.
- Gerçek zamanlı güncellemeler (örneğin sohbet, ilerleme çubukları).
- Kullanıcıyı bilgilendirmek istediğiniz uzun süren hesaplamalar.

İşte akış hakkında üst düzey bilmeniz gerekenler:

- Veri kademeli olarak teslim edilir, hepsi bir anda değil.
- İstemci, veriler geldikçe işleyebilir.
- Algılanan gecikmeyi azaltır ve kullanıcı deneyimini geliştirir.

### Neden akış kullanılır?

Akış kullanmanın sebepleri şunlardır:

- Kullanıcılar sadece sonunda değil, anında geri bildirim alır.
- Gerçek zamanlı uygulamalara ve yanıt veren arayüzlere izin verir.
- Ağ ve hesaplama kaynaklarının daha verimli kullanımı sağlar.

### Basit Örnek: HTTP Akış Sunucusu ve İstemcisi

Akışın nasıl uygulanabileceğine dair basit bir örnek:

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

Bu örnek, sunucunun tüm mesajların hazır olmasını beklemek yerine mesajları hazır oldukça istemciye göndermesini gösterir.

**Nasıl çalışır:**

- Sunucu her mesaj hazır olur olmaz veri üretir.
- İstemci gelen her parçayı alır ve yazdırır.

**Gereksinimler:**

- Sunucu akış yanıtı kullanmalıdır (örneğin FastAPI'de `StreamingResponse`).
- İstemci yanıtı akış olarak işlemelidir (`requests`'de `stream=True`).
- İçerik Türü genellikle `text/event-stream` veya `application/octet-stream` olur.

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

- Akış için Spring Boot'un tepkisel yığını `Flux` kullanılır
- `ServerSentEvent` yapılandırılmış olay akışı tipleri sağlar
- `WebClient`'in `bodyToFlux()` tepkisel akışı tüketmeyi sağlar
- `delayElements()` olaylar arasındaki işlem süresini simüle eder
- Olaylar daha iyi istemci işleme için tipler (`info`, `result`) içerebilir

### Karşılaştırma: Klasik Akış vs MCP Akışı

Klasik anlamda akış ile MCP'deki akış arasındaki farklar şöyle gösterilebilir:

| Özellik                | Klasik HTTP Akışı           | MCP Akışı (Bildirimler)        |
|------------------------|-----------------------------|--------------------------------|
| Ana yanıt              | Parçalanmış                  | Tek parça, sonunda              |
| İlerleme güncellemeleri | Veri parçaları olarak gönderilir | Bildirimler olarak gönderilir    |
| İstemci gereksinimleri | Akışı işlemeli               | Mesaj işleyicisi uygulamalı     |
| Kullanım alanı         | Büyük dosyalar, AI token akışları | İlerleme, günlükler, gerçek zamanlı geri bildirim  |

### Öne Çıkan Temel Farklar

Ayrıca, bazı temel farklar şunlardır:

- **İletişim Deseni:**
  - Klasik HTTP akışı: Basit parçalanmış transfer kodlamasıyla veri gönderir
  - MCP akışı: JSON-RPC protokolü ile yapılandırılmış bildirim sistemi kullanır

- **Mesaj Formatı:**
  - Klasik HTTP: Yeni satırlı düz metin parçaları
  - MCP: Meta verili yapılandırılmış LoggingMessageNotification nesneleri

- **İstemci Uygulaması:**
  - Klasik HTTP: Akış yanıtlarını işleyen basit istemci
  - MCP: Farklı mesaj türlerini işlemek için mesaj işleyicisi içeren daha gelişmiş istemci

- **İlerleme Güncellemeleri:**
  - Klasik HTTP: İlerleme ana yanıt akışının bir parçasıdır
  - MCP: İlerleme, ana yanıt sonunda gelmeden önce ayrı bildirim mesajlarıyla gönderilir

### Öneriler

Klasik akış (yukarıda `/stream` ile gösterilen uç nokta gibi) ile MCP üzerinden akış arasında seçim yaparken bazı önerilerimiz var.

- **Basit akış ihtiyaçları için:** Klasik HTTP akışı uygulaması daha basittir ve temel ihtiyaçlar için yeterlidir.

- **Karmaşık, etkileşimli uygulamalar için:** MCP akışı, bildirimler ve sonuçlar arasında ayrım ve zengin meta verilerle daha yapılandırılmış bir yaklaşım sağlar.

- **AI uygulamaları için:** MCP'nin bildirim sistemi, uzun süren AI görevlerinde kullanıcıları ilerleme hakkında bilgilendirmek için özellikle faydalıdır.

## MCP'de Akış

Şimdiye kadar klasik akış ile MCP akışı arasındaki farklara ve önerilere baktınız. MCP'de akışı nasıl kullanabileceğinizi detaylarıyla görelim.

MCP çerçevesinde akışın nasıl çalıştığını anlamak, uzun süren işlemler sırasında kullanıcılara gerçek zamanlı geri bildirim sağlayan yanıt veren uygulamalar oluşturmak için esastır.

MCP'de akış, ana yanıtı parçalara bölerek göndermek değildir; bir araç isteği işlerken istemciye **bildirimler** göndermektir. Bu bildirimler ilerleme güncellemeleri, günlükler veya diğer olayları içerebilir.

### Nasıl çalışır

Ana sonuç hala tek yanıt olarak gönderilir. Ancak, bildirimler işleme sırasında ayrı mesajlar olarak gönderilebilir ve böylece istemci gerçek zamanlı olarak güncellenir. İstemci bu bildirimleri işleyip gösterebilmelidir.

## Bildirim Nedir?

"Bildirim" dedik, MCP bağlamında bu ne anlama geliyor?

Bildirim, uzun süren bir işlem boyunca ilerleme, durum veya diğer olaylar hakkında bilgi vermek için sunucudan istemciye gönderilen mesajdır. Bildirimler şeffaflığı ve kullanıcı deneyimini artırır.

Örneğin, istemcinin sunucu ile ilk el sıkışma yapıldıktan sonra bir bildirim göndermesi gerekir.

Bir bildirim JSON mesajı olarak şöyle görünür:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Bildirimler, MCP'de ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) olarak adlandırılan bir konuya aittir.

> **Kaldırma bildirimi:** `2026-07-28` MCP spesifikasyon sürüm adayı, Logging özelliğini stdio taşıma türleri için `stderr` ve yapılandırılmış gözlemlenebilirlik için OpenTelemetry lehine kullanımdan kaldırma işaret eder. Logging özelliği `2025-11-25` sürümünde ve resmi kaldırmadan en az bir yıl sonra çalışmaya devam edecektir. Detaylar için [MCP'de Değişenler: 2026-07-28 Sürüm Adayı](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) sayfasına bakınız.

Logging'in çalışması için sunucunun bunu özellik/kabiliyet olarak etkinleştirmesi gerekir:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Kullanılan SDK'ya bağlı olarak, logging varsayılan olarak etkin olabilir veya sunucu yapılandırmanızda bunu açıkça etkinleştirmeniz gerekebilir.

Farklı bildirim türleri vardır:

| Seviye    | Açıklama                     | Örnek Kullanım Durumu          |
|-----------|------------------------------|-------------------------------|
| debug     | Detaylı hata ayıklama bilgisi | Fonksiyon giriş/çıkış noktaları|
| info      | Genel bilgi mesajları         | İşlem ilerleme güncellemeleri   |
| notice    | Normal ama önemli olaylar     | Yapılandırma değişiklikleri    |
| warning   | Uyarı durumları              | Kullanımdan kaldırılan özellik |
| error     | Hata durumları               | İşlem başarısızlıkları          |
| critical  | Kritik durumlar              | Sistem bileşeni hataları        |
| alert     | Hemen müdahale gerek           | Veri bozulması tespiti          |
| emergency | Sistem kullanılamaz durumda  | Tam sistem arızası              |

## MCP'de Bildirimlerin Uygulanması

MCP'de bildirimleri uygulamak için, hem sunucu hem de istemci taraflarını gerçek zamanlı güncellemeleri işleyebilecek şekilde ayarlamanız gerekir. Bu, uygulamanızın uzun süren işlemler sırasında kullanıcılara anlık geri bildirim sağlamasına imkan tanır.

### Sunucu tarafı: Bildirim Gönderimi

Sunucu tarafı ile başlayalım. MCP'de, istekler işlenirken bildirim gönderebilen araçlar tanımlanır. Sunucu, istemciye mesaj göndermek için genellikle `ctx` olan context nesnesini kullanır.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Önceki örnekte, `process_files` aracı her dosya işlenirken istemciye üç bildirim gönderir. Bilgi mesajları göndermek için `ctx.info()` yöntemi kullanılır.

Ayrıca, bildirimleri etkinleştirmek için sunucunuzun akış taşımasını (örneğin `streamable-http`) kullanması ve istemcinizin bildirimleri işlemek için mesaj işleyicisi uygulaması gerekir. İşte sunucuyu `streamable-http` taşımayı kullanacak şekilde nasıl ayarlayabileceğiniz:

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

Bu .NET örneğinde, `ProcessFiles` aracı `Tool` niteliği ile süslenmiş ve her dosya işlenirken istemciye üç bildirim gönderir. Bilgi mesajları göndermek için `ctx.Info()` yöntemi kullanılır.

.NET MCP sunucunuzda bildirimleri etkinleştirmek için akış taşıması kullandığınızdan emin olun:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### İstemci tarafı: Bildirim Alma

İstemci, gelen bildirimleri işlemek ve görüntülemek için mesaj işleyicisi uygulamalıdır.

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

Önceki kodda, `message_handler` fonksiyonu gelen mesajın bildirim olup olmadığını kontrol eder. Bildirimse yazdırır, değilse normal sunucu mesajı olarak işler. Ayrıca, alınan bildirimleri işlemek için `message_handler` ile `ClientSession` başlatılır.

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

Bu .NET örneğinde, `MessageHandler` fonksiyonu gelen mesajın bildirim olup olmadığını kontrol eder. Bildirimse yazdırır, değilse normal sunucu mesajı olarak işler. `ClientSession`, `ClientSessionOptions` üzerinden mesaj işleyici ile başlatılır.

Bildirimleri etkinleştirmek için, sunucunuzun akış taşıması (örneğin `streamable-http`) kullandığından ve istemcinizin bildirimleri işlemek için mesaj işleyicisi uyguladığından emin olun.

## İlerleme Bildirimleri ve Senaryolar

Bu bölüm, MCP'de ilerleme bildirimleri kavramını, neden önemli olduklarını ve Akış Yapılabilir HTTP kullanarak nasıl uygulanacaklarını açıklar. Ayrıca, konuyu pekiştirmek için pratik bir görev bulabilirsiniz.

İlerleme bildirimleri, uzun süren işlemler sırasında sunucunun istemciye gerçek zamanlı gönderdiği mesajlardır. Bütün süreç bitene kadar beklemek yerine, sunucu istemciyi mevcut durum hakkında güncellemeye devam eder. Bu, şeffaflığı artırır, kullanıcı deneyimini iyileştirir ve hata ayıklamayı kolaylaştırır.

**Örnek:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Neden İlerleme Bildirimleri Kullanılır?

İlerleme bildirimleri birkaç sebepten dolayı önemlidir:

- **Daha iyi kullanıcı deneyimi:** Kullanıcılar iş ilerledikçe güncellemeleri görür, sadece sonunda değil.
- **Gerçek zamanlı geri bildirim:** İstemciler ilerleme çubukları veya günlükler göstererek uygulamanın yanıt verdiğini hissettirir.
- **Daha kolay hata ayıklama ve izleme:** Geliştiriciler ve kullanıcılar sürecin nerede yavaşladığını veya takıldığını görebilir.

### İlerleme Bildirimleri Nasıl Uygulanır?

İşte MCP'de ilerleme bildirimlerini nasıl uygulayabileceğiniz:

- **Sunucu tarafında:** İşlenen her öğe için `ctx.info()` veya `ctx.log()` kullanarak bildirim gönderin. Bu, ana sonuç hazır olmadan önce istemciye mesaj gönderir.
- **İstemci tarafında:** Gelen bildirimleri dinleyen ve gösteren mesaj işleyici uygulayın. Bu işleyici bildirimler ile son sonuç arasında ayrım yapar.

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

HTTP tabanlı taşıyıcılarla MCP sunucuları uygularken, güvenlik çok önemli bir endişe haline gelir ve birden çok saldırı vektörüne ve koruma mekanizmalarına dikkatli bir şekilde odaklanmayı gerektirir.

### Genel Bakış

MCP sunucularını HTTP üzerinden açarken güvenlik kritik önemdedir. Akış yapılabilir HTTP yeni saldırı yüzeyleri sunar ve dikkatli yapılandırma gerektirir.

### Ana Noktalar

- **Origin Başlığı Doğrulaması**: DNS bağlama saldırılarını önlemek için `Origin` başlığını her zaman doğrulayın.
- **Localhost Bağlama**: Yerel geliştirme için, sunucuları herkese açık internete maruz bırakmamak için `localhost` üzerine bağlayın.
- **Kimlik Doğrulama**: Üretim dağıtımları için kimlik doğrulama (örn. API anahtarları, OAuth) uygulayın.
- **CORS**: Erişimi kısıtlamak için Cross-Origin Resource Sharing (CORS) politikalarını yapılandırın.
- **HTTPS**: Trafiği şifrelemek için üretimde HTTPS kullanın.

### En İyi Uygulamalar

- Gelen istekleri doğrulamadan asla güvenmeyin.
- Tüm erişim ve hataları kaydedin ve izleyin.
- Güvenlik açıklarını gidermek için bağımlılıkları düzenli olarak güncelleyin.

### Zorluklar

- Güvenlik ile geliştirme kolaylığını dengelemek
- Çeşitli istemci ortamlarıyla uyumluluğu sağlamak

## SSE'den Akış Yapılabilir HTTP'ye Geçiş

Şu anda Server-Sent Events (SSE) kullanan uygulamalar için, Streamable HTTP'ye geçiş MCP uygulamalarınız için geliştirilmiş yetenekler ve daha iyi uzun vadeli sürdürülebilirlik sağlar.

### Neden Geçiş Yapmalı?

SSE'den Streamable HTTP'ye geçiş için iki güçlü neden vardır:

- Streamable HTTP, SSE'ye kıyasla daha iyi ölçeklenebilirlik, uyumluluk ve daha zengin bildirim desteği sunar.
- Yeni MCP uygulamaları için önerilen taşıyıcıdır.

### Geçiş Adımları

MCP uygulamalarınızda SSE'den Streamable HTTP'ye şu şekilde geçiş yapabilirsiniz:

- Sunucu kodunu `mcp.run()` içinde `transport="streamable-http"` olacak şekilde güncelleyin.
- İstemci kodunu SSE istemcisi yerine `streamablehttp_client` kullanacak şekilde güncelleyin.
- İstemcide bildirimleri işlemek için bir mesaj işleyici uygulayın.
- Mevcut araçlar ve iş akışlarıyla uyumluluğu test edin.

### Uyumluluğu Korumak

Geçiş sürecinde mevcut SSE istemcileriyle uyumluluğu korumanız önerilir. İşte bazı stratejiler:

- Hem SSE hem de Streamable HTTP'yi farklı uç noktalarda çalıştırarak destekleyebilirsiniz.
- İstemcileri kademeli olarak yeni taşıyıcıya geçiriniz.

### Zorluklar

Geçiş sırasında aşağıdaki zorlukları ele aldığınızdan emin olun:

- Tüm istemcilerin güncellenmesini sağlamak
- Bildirim iletimindeki farkları yönetmek

## Güvenlik Hususları

Güvenlik, özellikle MCP'de Streamable HTTP gibi HTTP tabanlı taşıyıcılar kullanılırken herhangi bir sunucu uygulamasında en üst düzey öncelik olmalıdır.

HTTP tabanlı taşıyıcılarla MCP sunucuları uygularken, güvenlik çok önemli bir endişe haline gelir ve birden çok saldırı vektörüne ve koruma mekanizmalarına dikkatli bir şekilde odaklanmayı gerektirir.

### Genel Bakış

MCP sunucularını HTTP üzerinden açarken güvenlik kritik önemdedir. Akış yapılabilir HTTP yeni saldırı yüzeyleri sunar ve dikkatli yapılandırma gerektirir.

İşte bazı önemli güvenlik hususları:

- **Origin Başlığı Doğrulaması**: DNS bağlama saldırılarını önlemek için `Origin` başlığını her zaman doğrulayın.
- **Localhost Bağlama**: Yerel geliştirme için, sunucuları herkese açık internete maruz bırakmamak için `localhost` üzerine bağlayın.
- **Kimlik Doğrulama**: Üretim dağıtımları için kimlik doğrulama (örn. API anahtarları, OAuth) uygulayın.
- **CORS**: Erişimi kısıtlamak için Cross-Origin Resource Sharing (CORS) politikalarını yapılandırın.
- **HTTPS**: Trafiği şifrelemek için üretimde HTTPS kullanın.

### En İyi Uygulamalar

Ayrıca, MCP akış sunucunuzda güvenliği uygularken aşağıdaki en iyi uygulamaları takip edin:

- Gelen istekleri doğrulamadan asla güvenmeyin.
- Tüm erişim ve hataları kaydedin ve izleyin.
- Güvenlik açıklarını gidermek için bağımlılıkları düzenli olarak güncelleyin.

### Zorluklar

MCP akış sunucularında güvenlik uygularken bazı zorluklarla karşılaşacaksınız:

- Güvenlik ile geliştirme kolaylığını dengelemek
- Çeşitli istemci ortamlarıyla uyumluluğu sağlamak

### Ödev: Kendi Akış Yapan MCP Uygulamanızı Oluşturun

**Senaryo:**
Sunucu bir öğe listesi (örn. dosya veya belge) işlesin ve işlenen her öğe için bildirim gönderilsin. İstemci her bildirimi geldiği anda görüntülemelidir.

**Adımlar:**

1. Bir liste işleyen ve her öğe için bildirim gönderen bir sunucu aracı uygulayın.
2. Bildirimleri gerçek zamanlı göstermek için bir mesaj işleyiciye sahip bir istemci uygulayın.
3. Sunucu ve istemciyi çalıştırarak uygulamanızı test edin ve bildirimleri gözlemleyin.

[Çözüm](./solution/README.md)

## Daha Fazla Okuma & Sonraki Adımlar

MCP akışıyla yolculuğunuza devam etmek ve bilginizi genişletmek için, bu bölüm daha gelişmiş uygulamalar oluşturmak üzere ek kaynaklar ve önerilen sonraki adımları sağlar.

### Daha Fazla Okuma

- [Microsoft: HTTP Akışa Giriş](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: ASP.NET Core'da CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Akışlı İstekler](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Sonraki Adımlar

- Gerçek zamanlı analiz, sohbet veya ortak düzenleme için akış kullanan daha gelişmiş MCP araçları geliştirmeyi deneyin.
- Canlı kullanıcı arayüzü güncellemeleri için MCP akışını frontend çerçeveleriyle (React, Vue, vb.) entegre etmeyi keşfedin.
- Sonraki: [VSCode için AI Araç Kiti Kullanımı](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->