# Model Bağlam Protokolü (MCP) ile HTTPS Akışı

Bu bölüm, Model Bağlam Protokolü (MCP) ile HTTPS kullanarak güvenli, ölçeklenebilir ve gerçek zamanlı akış uygulaması için kapsamlı bir rehber sunar. Akışın motivasyonunu, mevcut taşıma mekanizmalarını, MCP’de akış destekli HTTP’nin nasıl uygulanacağını, güvenlik en iyi uygulamalarını, SSE’den geçişi ve kendi akış MCP uygulamalarınızı oluşturmak için pratik rehberliği kapsar.

## MCP’de Taşıma Mekanizmaları ve Akış

Bu bölüm, MCP’de kullanılabilen farklı taşıma mekanizmalarını ve bunların istemciler ile sunucular arasında gerçek zamanlı iletişim için akış yeteneklerini nasıl sağladığını inceler.

### Taşıma Mekanizması Nedir?

Bir taşıma mekanizması, verilerin istemci ve sunucu arasında nasıl değiş tokuş edildiğini tanımlar. MCP, farklı ortamlar ve gereksinimler için birden çok taşıma türünü destekler:

- **stdio**: Standart giriş/çıkış; yerel ve CLI tabanlı araçlar için uygundur. Basittir ancak web veya bulut için uygun değildir.
- **SSE (Sunucu Gönderimli Olaylar)**: Sunucuların HTTP üzerinden istemcilere gerçek zamanlı güncellemeler göndermesine olanak tanır. Web kullanıcı arayüzleri için iyidir, ancak ölçeklenebilirlik ve esneklik açısından sınırlıdır. MCP Spesifikasyonu 2025-06-18 itibarıyla, bağımsız SSE taşıması kullanım dışı bırakılmış ve "Streamable HTTP" taşıması ile değiştirilmiştir.
- **Streamable HTTP**: Bildirimleri ve daha iyi ölçeklenebilirliği destekleyen modern HTTP tabanlı akış taşımasıdır. Çoğu üretim ve bulut senaryosu için önerilir.

### Karşılaştırma Tablosu

Bu taşıma mekanizmaları arasındaki farkları aşağıdaki karşılaştırma tablosunda inceleyebilirsiniz:

| Taşıma            | Gerçek Zamanlı Güncellemeler | Akış      | Ölçeklenebilirlik | Kullanım Durumu          |
|-------------------|------------------------------|-----------|-------------------|-------------------------|
| stdio             | Hayır                        | Hayır     | Düşük             | Yerel CLI araçları       |
| SSE               | Evet                         | Evet      | Orta              | Web, gerçek zamanlı güncellemeler |
| Streamable HTTP   | Evet                         | Evet      | Yüksek            | Bulut, çoklu istemci    |

> **İpucu:** Doğru taşıma mekanizmasını seçmek performansı, ölçeklenebilirliği ve kullanıcı deneyimini etkiler. Modern, ölçeklenebilir ve bulut hazır uygulamalar için **Streamable HTTP** önerilir.

Önceki bölümlerde gösterilen stdio ve SSE taşıma mekanizmalarını ve bu bölümde ele alınan streamable HTTP taşımacılığını not edin.

## Akış: Kavramlar ve Motivasyon

Akışın temel kavramlarını ve motivasyonlarını anlamak, etkili gerçek zamanlı iletişim sistemleri uygulamak için çok önemlidir.

**Akış**, ağ programlamasında verilerin tüm yanıtın hazır olmasını beklemek yerine küçük, yönetilebilir parçalar halinde ya da olay dizisi olarak gönderilip alınmasını sağlayan bir tekniktir. Bu özellikle şunlar için yararlıdır:

- Büyük dosya veya veri setleri,
- Gerçek zamanlı güncellemeler (ör. sohbet, ilerleme çubukları),
- Kullanıcıyı bilgilendirmek istediğiniz uzun süren işlemler.

Akış hakkında genel olarak bilmeniz gerekenler:

- Veriler aşamalı olarak iletilir, hepsi bir anda değil.
- İstemci verileri geldikçe işleyebilir.
- Algılanan gecikmeyi azaltır ve kullanıcı deneyimini artırır.

### Neden Akış Kullanılır?

Akış kullanımının nedenleri şunlardır:

- Kullanıcılar hemen geri bildirim alır, sadece sonunda değil.
- Gerçek zamanlı uygulamalar ve duyarlı kullanıcı arayüzleri sağlar.
- Ağ ve işlem kaynaklarının daha verimli kullanımı.

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

Bu örnek, tüm mesajlar hazır olmasını beklemek yerine, sunucunun mesajları hazır oldukça istemciye göndermesini gösterir.

**Nasıl Çalışır:**

- Sunucu her mesajı hazır olduğunda gönderir.
- İstemci her parçayı geldikçe alır ve yazdırır.

**Gereksinimler:**

- Sunucunun akış yanıtı kullanması gerekir (örneğin FastAPI'de `StreamingResponse`).
- İstemci yanıtı akış olarak işleyecek (requests’te `stream=True`).
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

- Akış için Spring Boot’un reaktif yığını ve `Flux` kullanıyor
- `ServerSentEvent` olay türleriyle yapılandırılmış akış sunuyor
- `WebClient` ve `bodyToFlux()` ile reaktif akış tüketimi sağlıyor
- `delayElements()` olaylar arasındaki işlem süresini simüle ediyor
- Olaylar `info`, `result` gibi türlerde olabilir, böylece istemci daha iyi yönetebilir

### Karşılaştırma: Klasik Akış ile MCP Akışı

Klasik akış ile MCP’de akışın nasıl farklı çalıştığını aşağıdaki tabloda görebilirsiniz:

| Özellik                | Klasik HTTP Akışı             | MCP Akışı (Bildirimler)          |
|------------------------|-------------------------------|---------------------------------|
| Ana yanıt             | Parçalanmış                   | Tek, sonunda                    |
| İlerleme güncellemeleri| Veri parçaları olarak gönderilir | Bildirimler olarak gönderilir     |
| İstemci gereksinimleri  | Akışı işlemeli                | Mesaj işleyici uygulamalı       |
| Kullanım durumu        | Büyük dosyalar, AI token akışları| İlerleme, günlükler, gerçek zamanlı geri bildirim |

### Öne Çıkan Temel Farklar

Ayrıca bazı temel farklar şunlardır:

- **İletişim Modeli:**
  - Klasik HTTP akışı: Basit parçalanmış transfer kodlamasıyla veri gönderir
  - MCP akışı: JSON-RPC protokolü ile yapılandırılmış bildirim sistemi kullanır

- **Mesaj Formatı:**
  - Klasik HTTP: Yeni satırlarla ayrılmış düz metin parçaları
  - MCP: Meta veriler içeren yapılandırılmış LoggingMessageNotification nesneleri

- **İstemci Uygulaması:**
  - Klasik HTTP: Akış yanıtı işleyen basit istemci
  - MCP: Farklı mesaj türlerini işleyen gelişmiş mesaj işleyici istemci

- **İlerleme Güncellemeleri:**
  - Klasik HTTP: İlerleme ana yanıt akışının parçasıdır
  - MCP: İlerleme ayrı bildirim mesajlarıyla gönderilir, ana yanıt sonradan gelir

### Öneriler

Klasik akış ile MCP üzerinden akış arasında tercih yaparken şu önerilere dikkat edin:

- **Basit akış ihtiyaçları için:** Klasik HTTP akışı daha basit ve temel akış ihtiyaçları için yeterlidir.
- **Karmaşık etkileşimli uygulamalar için:** MCP akışı daha yapılandırılmış; zengin meta veri ve bildirim ile nihai sonuç ayrımı sağlar.
- **Yapay zeka uygulamaları için:** MCP’nin bildirim sistemi, uzun süren AI görevlerinde ilerleme bilgisini kullanıcıya anlık vermek için idealdir.

## MCP’de Akış

Peki, klasik akış ile MCP akışı arasındaki farkları ve önerileri gördünüz. Şimdi MCP kapsamında akıştan nasıl faydalanabileceğinize daha detaylı bakalım.

MCP içinde akış, ana yanıtın parçalar halinde gönderilmesi değil, bir araç isteği işlerken istemciye **bildirimler** gönderilmesidir. Bu bildirimler ilerleme güncellemeleri, günlükler veya diğer olayları içerebilir.

### Nasıl Çalışır?

Ana sonuç tek bir yanıt olarak gönderilir. Ancak, işlem sırasında ayrı mesajlar olarak bildirimler gönderilebilir ve böylece istemci gerçek zamanlı olarak güncellenir. İstemci bu bildirimleri işleyip göstermelidir.

## Bildirim Nedir?

“Bildirim” dedik; MCP bağlamında ne anlama geliyor?

Bildirim, uzun süreli işlem sırasında ilerleme, durum veya diğer olayları bildirmek üzere sunucudan istemciye gönderilen bir mesajdır. Bildirimler şeffaflığı ve kullanıcı deneyimini artırır.

Örneğin, istemcinin sunucuyla ilk el sıkışması tamamlandığında bir bildirim göndermesi gerekir.

Bildirim JSON mesajı şu şekildedir:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Bildirimler MCP’de ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging) başlıklı bir konuya aittir.

Günlüklemeyi etkinleştirmek için sunucu bunu özellik/yetenek olarak şun şeklinde açmalıdır:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Kullanılan SDK’ya bağlı olarak, günlükleme varsayılan olarak etkin olabilir ya da sunucu konfigürasyonunda açıkça etkinleştirmeniz gerekebilir.

Farklı bildirim seviyeleri vardır:

| Seviyesi  | Tanımı                        | Örnek Kullanım Durumu        |
|-----------|------------------------------|------------------------------|
| debug     | Ayrıntılı hata ayıklama bilgisi | Fonksiyon giriş/çıkış noktaları |
| info      | Genel bilgilendirici mesajlar | İşlem ilerleme güncellemeleri |
| notice    | Normal ancak önemli olaylar    | Konfigürasyon değişiklikleri  |
| warning   | Uyarı durumları               | Kullanımı kaldırılmış özellikler |
| error     | Hata durumları               | İşlem başarısızlıkları         |
| critical  | Kritik durumlar               | Sistem bileşen hataları        |
| alert     | Derhal aksiyon alınmalı       | Veri bozulması tespit edildi   |
| emergency | Sistem kullanılamaz durumda   | Tam sistem arızası             |

## MCP’de Bildirimleri Uygulamak

Bildirimleri MCP’de uygulamak için hem sunucu hem de istemci taraflarını gerçek zamanlı güncellemeleri işlemek üzere ayarlamanız gerekir. Bu, uzun süren işlemler sırasında kullanıcıya anlık geri bildirim sağlar.

### Sunucu Tarafı: Bildirim Gönderme

Sunucu tarafıyla başlayalım. MCP’de, istekleri işlerken bildirim gönderebilen araçlar tanımlarsınız. Sunucu, istemciye mesaj göndermek için genellikle `ctx` adlı context nesnesini kullanır.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Örnekte `process_files` aracı her dosyayı işlerken üç bildirim gönderir. `ctx.info()` metodu bilgilendirici mesaj göndermek için kullanılır.

Ayrıca bildirimlerin çalışması için, sunucunuzun akış taşımasını (örneğin `streamable-http`) kullandığından ve istemcinizin bildirimleri işlemek için mesaj işleyici uyguladığından emin olun. Sunucuda `streamable-http` taşımasını şöyle ayarlayabilirsiniz:

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

Bu .NET örneğinde, `ProcessFiles` aracı her dosyayı işlerken üç bildirim gönderir. `ctx.Info()` metodu bilgilendirici mesaj göndermek için kullanılır.

.NET MCP sunucunuzda bildirimleri etkinleştirmek için akış taşıması kullanın:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### İstemci Tarafı: Bildirim Alma

İstemci, gelen bildirimleri işlemek ve göstermek için mesaj işleyici uygulamalıdır.

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

Kodda `message_handler` fonksiyonu gelen mesajın bildirim olup olmadığını kontrol eder. Bildirimse yazdırır, değilse normal sunucu mesajı olarak işler. Ayrıca `ClientSession` bildirimleri işlemek için `message_handler` ile başlatılmıştır.

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

Bu .NET örneğinde, `MessageHandler` fonksiyonu gelen mesajın bildirim olup olmadığını kontrol eder. Bildirimse yazdırır, değilse normal sunucu mesajı olarak işler. `ClientSession`, `ClientSessionOptions` aracılığıyla mesaj işleyici ile başlatılır.

Bildirimlerin çalışması için sunucunuzun akış taşıması (örneğin `streamable-http`) kullandığından ve istemcinizin bildirimleri işlemek üzere mesaj işleyici uyguladığından emin olun.

## İlerleme Bildirimleri ve Senaryoları

Bu bölüm, MCP’de ilerleme bildirimleri kavramını, neden önemli olduklarını ve Streamable HTTP kullanarak nasıl uygulanacağını açıklar. Anlayışınızı pekiştirmek için pratik bir görev de sağlar.

İlerleme bildirimleri, uzun süren işlemler sırasında sunucudan istemciye gerçek zamanlı gönderilen mesajlardır. Tüm sürecin bitmesini beklemek yerine sunucu istemciyi mevcut durum hakkında günceller. Bu şeffaflığı, kullanıcı deneyimini artırır ve hata ayıklamayı kolaylaştırır.

**Örnek:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Neden İlerleme Bildirimleri Kullanılır?

İlerleme bildirimleri şu nedenlerle önemlidir:

- **Daha iyi kullanıcı deneyimi:** Kullanıcılar, sadece sonunda değil, süreç ilerledikçe güncellemeler görür.
- **Gerçek zamanlı geri bildirim:** İstemciler ilerleme çubukları veya günlükler gösterebilir, uygulamanın duyarlı olmasını sağlar.
- **Hata ayıklama ve izleme kolaylığı:** Geliştiriciler ve kullanıcılar işlemin nerede yavaşladığını veya takıldığını görebilir.

### İlerleme Bildirimleri Nasıl Uygulanır?

MCP’de ilerleme bildirimleri şöyle uygulanabilir:

- **Sunucuda:** Her öğe işlendikçe `ctx.info()` veya `ctx.log()` ile bildirim gönderin. Bu, ana sonuç hazır olmadan önce istemciye mesaj gönderir.
- **İstemcide:** Gelen bildirimi dinleyen ve gösteren mesaj işleyici uygulayın. Bu işleyici bildirimler ile nihai sonuç arasında ayrım yapar.

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

## Güvenlik Düşünceleri

HTTP tabanlı taşıma ile MCP sunucuları oluştururken, güvenlik birincil öncelik olup, çok sayıda saldırı vektörü ve koruma mekanizmasına dikkat edilmesini gerektirir.

### Genel Bakış

MCP sunucularını HTTP üzerinden açmak kritik güvenlik gereksinimleri doğurur. Streamable HTTP yeni saldırı yüzeyleri getirir ve dikkatli yapılandırma ister.

### Ana Noktalar

- **Origin Header Doğrulaması:** DNS yeniden bağlama saldırılarını engellemek için `Origin` başlığını daima doğrulayın.
- **Localhost Bağlama:** Yerel geliştirme için sunucuyu `localhost`a bağlayarak genel internet erişimine kapatın.
- **Kimlik Doğrulama:** Üretim ortamlarında API anahtarları veya OAuth gibi kimlik doğrulama uygulayın.
- **CORS:** Erişimi sınırlamak için Cross-Origin Resource Sharing (CORS) politikaları yapılandırın.
- **HTTPS:** Üretimde trafiği şifrelemek için HTTPS kullanın.

### En İyi Uygulamalar

- Gelen istekleri doğrulamadan asla güvenmeyin.
- Tüm erişimleri ve hataları loglayıp izleyin.
- Güvenlik açıklarını gidermek için bağımlılıkları düzenli güncelleyin.

### Zorluklar
- Güvenlik ile geliştirme kolaylığını dengeleme  
- Çeşitli istemci ortamlarıyla uyumluluğu sağlama  

## SSE'den Streamable HTTP'ye Yükseltme

Şu anda Server-Sent Events (SSE) kullanan uygulamalar için Streamable HTTP'ye geçiş, MCP uygulamalarınızda geliştirilmiş yetenekler ve daha iyi uzun vadeli sürdürülebilirlik sağlar.

### Neden Yükseltme?

SSE'den Streamable HTTP'ye yükseltmek için iki güçlü neden vardır:

- Streamable HTTP, SSE'den daha iyi ölçeklenebilirlik, uyumluluk ve daha zengin bildirim desteği sunar.  
- Yeni MCP uygulamaları için önerilen taşıma protokolüdür.

### Göç Adımları

MCP uygulamalarınızda SSE'den Streamable HTTP'ye nasıl geçiş yapabileceğiniz aşağıda belirtilmiştir:

- **Sunucu kodunu güncelleyin** ve `mcp.run()` içinde `transport="streamable-http"` kullanın.  
- **İstemci kodunu güncelleyin** ve SSE istemcisi yerine `streamablehttp_client` kullanın.  
- **İstemciye bir mesaj işleyici** uygulayın, bildirimleri işlemek için.  
- **Mevcut araçlar ve iş akışlarıyla uyumluluğu test edin.**

### Uyumluluğun Korunması

Geçiş sürecinde mevcut SSE istemcileriyle uyumluluğu korumanız önerilir. İşte bazı stratejiler:

- Hem SSE hem de Streamable HTTP'yi farklı uç noktalarda çalıştırarak destekleyebilirsiniz.  
- İstemcileri kademeli olarak yeni taşıma protokolüne geçirin.

### Zorluklar

Göç sırasında aşağıdaki zorlukları ele aldığınızdan emin olun:

- Tüm istemcilerin güncellenmesini sağlamak  
- Bildirim teslimatı farklılıklarını yönetmek  

## Güvenlik Dikkatleri

Herhangi bir sunucu uygulamasında, özellikle MCP'de Streamable HTTP gibi HTTP tabanlı taşıyıcılar kullanılırken, güvenlik en öncelikli konu olmalıdır.

HTTP tabanlı taşıyıcılar ile MCP sunucuları uygularken güvenlik, birçok saldırı vektörü ve koruma mekanizmasına dikkat gerektiren kritik bir husustur.

### Genel Bakış

MCP sunucularını HTTP üzerinden erişime açarken güvenlik son derece önemlidir. Streamable HTTP yeni saldırı yüzeyleri sunar ve dikkatli yapılandırma gerektirir.

İşte bazı önemli güvenlik dikkate alınması gerekenler:

- **Origin Başlığı Doğrulaması**: DNS yeniden bağlama saldırılarını önlemek için `Origin` başlığını mutlaka doğrulayın.  
- **Localhost Bağlama**: Yerel geliştirme için sunucuları `localhost`'a bağlayarak herkese açık internetten erişimi engelleyin.  
- **Kimlik Doğrulama**: Üretim ortamında API anahtarları, OAuth gibi kimlik doğrulama mekanizmaları uygulayın.  
- **CORS**: Erişimi kısıtlamak için Cross-Origin Resource Sharing (CORS) politikalarını yapılandırın.  
- **HTTPS**: Trafiği şifrelemek için üretimde HTTPS kullanın.

### En İyi Uygulamalar

MCP streaming sunucusunda güvenlik uygularlken takip edilecek bazı en iyi pratikler:

- Gelen istekleri doğrulamadan asla güvenmeyin.  
- Tüm erişim ve hataları kayıt altına alın ve izleyin.  
- Güvenlik açıklarını gidermek için bağımlılıkları düzenli olarak güncelleyin.

### Zorluklar

MCP streaming sunucularında güvenlik uygularken karşılaşacağınız zorluklar:

- Güvenlik ile geliştirme kolaylığı arasında denge kurmak  
- Çeşitli istemci ortamlarıyla uyumluluğu sağlamak  

### Görev: Kendi Streaming MCP Uygulamanızı Oluşturun

**Senaryo:**  
Sunucu bir öğe listesi (örneğin dosyalar veya belgeler) işleyen ve her işlenen öğe için bir bildirim gönderen bir MCP sunucusu ve istemci oluşturun. İstemci ise her bildirimi geldiği anda görüntülemelidir.

**Adımlar:**

1. Bir listeyi işleyen ve her öğe için bildirim gönderen bir sunucu aracı uygulayın.  
2. Bildirimleri gerçek zamanlı göstermek için mesaj işleyiciye sahip bir istemci oluşturun.  
3. Hem sunucu hem de istemciyi çalıştırarak uygulamanızı test edin ve bildirimleri gözlemleyin.  

[Çözüm](./solution/README.md)  

## Daha Fazla Okuma & Sonraki Adımlar

MCP streaming yolculuğunuza devam etmek ve bilginizi genişletmek için, bu bölüm daha ileri kaynaklar ve gelişmiş uygulamalar geliştirmek için önerilen adımları içerir.

### Daha Fazla Okuma

- [Microsoft: HTTP Streaming'e Giriş](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)  
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Microsoft: ASP.NET Core'da CORS](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)  
- [Python requests: Streaming İstekleri](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)  

### Sonraki Adımlar

- Gerçek zamanlı analiz, sohbet veya iş birliğine dayalı düzenleme için streaming kullanan daha gelişmiş MCP araçları oluşturmayı deneyin.  
- MCP streaming'i canlı kullanıcı arayüzü güncellemeleri için frontend çerçeveleri (React, Vue, vb.) ile bütünleştirmeyi keşfedin.  
- Sonraki: [VSCode için AI Araç Kiti Kullanımı](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->