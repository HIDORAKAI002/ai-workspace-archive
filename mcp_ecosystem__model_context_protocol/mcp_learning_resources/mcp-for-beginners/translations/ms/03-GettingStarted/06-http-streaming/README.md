# Penstriman HTTPS dengan Protokol Konteks Model (MCP)

Bab ini menyediakan panduan menyeluruh untuk melaksanakan penstriman yang selamat, boleh skala, dan masa nyata dengan Protokol Konteks Model (MCP) menggunakan HTTPS. Ia merangkumi motivasi untuk penstriman, mekanisme penghantaran yang tersedia, cara melaksanakan HTTP yang boleh distrim dalam MCP, amalan terbaik keselamatan, migrasi dari SSE, dan panduan praktikal untuk membina aplikasi MCP penstriman anda sendiri.

> **Melihat ke hadapan:** pelajaran ini menerangkan HTTP Boleh Strim di bawah **Spesifikasi MCP 2025-11-25**, di mana sesi ditetapkan semasa `initialize` dan diikat dengan header `Mcp-Session-Id`. Calon pelepasan `2026-07-28` membuang jabat tangan dan ID sesi sepenuhnya, menjadikan setiap permintaan berdikari dan boleh dihalakan ke mana-mana contoh pelayan tanpa sesi melekat. Lihat [Apa Yang Berubah dalam MCP: Calon Pelepasan 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) untuk butiran.

## Mekanisme Penghantaran dan Penstriman dalam MCP

Bahagian ini meneroka pelbagai mekanisme penghantaran yang tersedia dalam MCP dan peranan mereka dalam membolehkan keupayaan penstriman untuk komunikasi masa nyata antara klien dan pelayan.

### Apakah Mekanisme Penghantaran?

Mekanisme penghantaran mentakrifkan bagaimana data dipertukarkan antara klien dan pelayan. MCP menyokong pelbagai jenis penghantaran untuk menyesuaikan dengan persekitaran dan keperluan yang berbeza:

- **stdio**: Input/output standard, sesuai untuk alat tempatan dan berasaskan CLI. Mudah tetapi tidak sesuai untuk web atau awan.
- **SSE (Server-Sent Events)**: Membolehkan pelayan menghantar kemas kini masa nyata kepada klien melalui HTTP. Baik untuk UI web, tetapi terhad dari segi kebolehsikalaan dan fleksibiliti. Sejak Spesifikasi MCP 2025-06-18, penghantaran SSE (Server-Sent Events) berdiri sendiri telah digantikan oleh penghantaran "HTTP Boleh Strim".
- **HTTP Boleh Strim**: Penghantaran penstriman berasaskan HTTP moden, menyokong notifikasi dan kebolehsikalaan lebih baik. Disyorkan untuk kebanyakan senario pengeluaran dan awan.

### Jadual Perbandingan

Lihat jadual perbandingan di bawah untuk memahami perbezaan antara mekanisme penghantaran ini:

| Penghantaran      | Kemas Kini Masa Nyata | Penstriman | Kebolehsikalaan | Kes Penggunaan          |
|------------------|----------------------|------------|-----------------|-------------------------|
| stdio            | Tidak                | Tidak      | Rendah          | Alat CLI tempatan       |
| SSE              | Ya                   | Ya         | Sederhana       | Web, kemas kini masa nyata|
| HTTP Boleh Strim | Ya                   | Ya         | Tinggi          | Awan, berbilang klien   |

> **Tip:** Memilih penghantaran yang tepat memberi kesan kepada prestasi, kebolehsikalaan, dan pengalaman pengguna. **HTTP Boleh Strim** disyorkan untuk aplikasi moden, boleh skala, dan sedia awan.

Perhatikan penghantaran stdio dan SSE yang anda lihat dalam bab sebelum ini dan bagaimana HTTP boleh strim adalah penghantaran yang dibincangkan dalam bab ini.

## Penstriman: Konsep dan Motivasi

Memahami konsep asas dan motivasi di sebalik penstriman adalah penting untuk melaksanakan sistem komunikasi masa nyata yang berkesan.

**Penstriman** ialah teknik dalam pengaturcaraan rangkaian yang membolehkan data dihantar dan diterima dalam bahagian kecil yang boleh diurus atau sebagai satu siri acara, daripada menunggu keseluruhan respons siap. Ini amat berguna untuk:

- Fail atau set data besar.
- Kemas kini masa nyata (contohnya, sembang, bar kemajuan).
- Pengiraan jangka panjang di mana anda mahu pengguna sentiasa dimaklumkan.

Inilah yang anda perlu tahu tentang penstriman secara umum:

- Data dihantar secara progresif, bukan sekaligus.
- Klien boleh memproses data sebaik tiba.
- Mengurangkan latensi yang dirasai dan meningkatkan pengalaman pengguna.

### Kenapa guna penstriman?

Sebab-sebab menggunakan penstriman adalah:

- Pengguna mendapat maklum balas serta-merta, bukan hanya di akhir
- Membolehkan aplikasi masa nyata dan UI responsif
- Penggunaan sumber rangkaian dan pengkomputeran lebih cekap

### Contoh Mudah: Pelayan & Klien Penstriman HTTP

Berikut adalah contoh mudah bagaimana penstriman boleh dilaksanakan:

#### Python

**Pelayan (Python, menggunakan FastAPI dan StreamingResponse):**

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

**Klien (Python, menggunakan requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Contoh ini menunjukkan pelayan menghantar satu siri mesej kepada klien apabila mesej tersebut tersedia, dan bukannya menunggu semua mesej sedia.

**Cara ia berfungsi:**

- Pelayan mengeluarkan setiap mesej apabila ia sedia.
- Klien menerima dan mencetak setiap bahagian semasa tiba.

**Keperluan:**

- Pelayan mesti menggunakan respons penstriman (contoh, `StreamingResponse` dalam FastAPI).
- Klien mesti memproses respons sebagai strim (`stream=True` dalam requests).
- Content-Type biasanya `text/event-stream` atau `application/octet-stream`.

#### Java

**Pelayan (Java, menggunakan Spring Boot dan Server-Sent Events):**

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

**Klien (Java, menggunakan Spring WebFlux WebClient):**

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

**Nota Pelaksanaan Java:**

- Menggunakan tumpukan reaktif Spring Boot dengan `Flux` untuk penstriman
- `ServerSentEvent` menyediakan penstriman acara berstruktur dengan jenis acara
- `WebClient` dengan `bodyToFlux()` membolehkan penggunaan penstriman reaktif
- `delayElements()` mensimulasikan masa pemprosesan antara acara
- Acara boleh mempunyai jenis (`info`, `result`) untuk pengendalian klien yang lebih baik

### Perbandingan: Penstriman Klasik vs Penstriman MCP

Perbezaan cara penstriman berfungsi secara "klasik" berbanding dalam MCP boleh digambarkan seperti berikut:

| Ciri                  | Penstriman HTTP Klasik       | Penstriman MCP (Notifikasi)      |
|-----------------------|------------------------------|---------------------------------|
| Respons utama          | Berbentuk potongan            | Tunggal, di hujung              |
| Kemas kini kemajuan    | Dihantar sebagai potongan data| Dihantar sebagai notifikasi      |
| Keperluan klien       | Mesti memproses strim        | Mesti melaksanakan pengendali mesej |
| Kes penggunaan         | Fail besar, aliran token AI  | Kemajuan, log, maklum balas masa nyata |

### Perbezaan Utama Diperhatikan

Selain itu, berikut adalah beberapa perbezaan utama:

- **Corak Komunikasi:**
  - Penstriman HTTP klasik: Menggunakan kod penstriman potongan mudah untuk menghantar data secara potongan
  - Penstriman MCP: Menggunakan sistem notifikasi berstruktur dengan protokol JSON-RPC

- **Format Mesej:**
  - HTTP klasik: Potongan teks biasa dengan garis baru
  - MCP: Objek LoggingMessageNotification berstruktur dengan metadata

- **Pelaksanaan Klien:**
  - HTTP klasik: Klien mudah yang memproses respons penstriman
  - MCP: Klien lebih sofistikated dengan pengendali mesej untuk memproses pelbagai jenis mesej

- **Kemas Kini Kemajuan:**
  - HTTP klasik: Kemajuan adalah sebahagian daripada aliran respons utama
  - MCP: Kemajuan dihantar melalui mesej notifikasi berasingan manakala respons utama datang di hujung

### Cadangan

Terdapat beberapa perkara yang kami cadangkan apabila memilih antara melaksanakan penstriman klasik (seperti titik akhir yang kami tunjukkan di atas menggunakan `/stream`) berbanding memilih penstriman melalui MCP.

- **Untuk keperluan penstriman mudah:** Penstriman HTTP klasik lebih mudah dilaksanakan dan mencukupi untuk keperluan penstriman asas.

- **Untuk aplikasi kompleks dan interaktif:** Penstriman MCP menyediakan pendekatan lebih berstruktur dengan metadata yang lebih kaya dan pemisahan antara notifikasi dan hasil akhir.

- **Untuk aplikasi AI:** Sistem notifikasi MCP amat berguna untuk tugas AI jangka panjang di mana anda mahu sentiasa memaklumkan pengguna tentang kemajuan.

## Penstriman dalam MCP

Baiklah, jadi anda telah melihat beberapa cadangan dan perbandingan setakat ini mengenai perbezaan antara penstriman klasik dan penstriman dalam MCP. Mari kita lihat dengan terperinci bagaimana anda boleh memanfaatkan penstriman dalam MCP.

Memahami bagaimana penstriman berfungsi dalam rangka kerja MCP adalah penting untuk membina aplikasi responsif yang menyediakan maklum balas masa nyata kepada pengguna semasa operasi berjalan lama.

Dalam MCP, penstriman bukan mengenai menghantar respons utama dalam potongan, tetapi mengenai menghantar **notifikasi** kepada klien semasa alat memproses permintaan. Notifikasi ini boleh termasuk kemas kini kemajuan, log, atau acara lain.

### Cara ia berfungsi

Keputusan utama masih dihantar sebagai satu respons tunggal. Walau bagaimanapun, notifikasi boleh dihantar sebagai mesej berasingan semasa pemprosesan dan dengan itu mengemas kini klien secara masa nyata. Klien mesti dapat mengendalikan dan memaparkan notifikasi ini.

## Apakah Notifikasi?

Kami sebut "Notifikasi", apa maksudnya dalam konteks MCP?

Notifikasi ialah mesej yang dihantar dari pelayan kepada klien untuk memaklumkan tentang kemajuan, status, atau acara lain semasa operasi berjalan lama. Notifikasi meningkatkan ketelusan dan pengalaman pengguna.

Contohnya, klien dijangka menghantar notifikasi apabila jabat tangan awal dengan pelayan telah dibuat.

Notifikasi kelihatan seperti mesej JSON berikut:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikasi tergolong dalam topik dalam MCP yang dirujuk sebagai ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Notis Penghentian:** calon pelepasan spesifikasi MCP `2026-07-28` menandakan primitif Logging sebagai dihentikan demi `stderr` untuk penghantaran stdio dan OpenTelemetry untuk pemerhatian berstruktur. Logging terus berfungsi dalam `2025-11-25` dan sekurang-kurangnya setahun selepas apa-apa penghentian rasmi. Lihat [Apa Yang Berubah dalam MCP: Calon Pelepasan 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Untuk menjayakan logging, pelayan perlu mengaktifkannya sebagai ciri/kemampuan seperti berikut:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Bergantung pada SDK yang digunakan, logging mungkin diaktifkan secara lalai, atau anda mungkin perlu mengaktifkannya secara eksplisit dalam konfigurasi pelayan anda.

Terdapat pelbagai jenis notifikasi:

| Tahap     | Penerangan                  | Contoh Kes Penggunaan          |
|-----------|-----------------------------|-------------------------------|
| debug     | Maklumat debug terperinci   | Titik masuk/keluar fungsi      |
| info      | Mesej maklumat umum         | Kemas kini kemajuan operasi    |
| notice    | Acara normal tetapi penting | Perubahan konfigurasi          |
| warning   | Keadaan amaran              | Penggunaan ciri yang tidak lagi disokong |
| error     | Keadaan ralat               | Kegagalan operasi              |
| critical  | Keadaan kritikal            | Kegagalan komponen sistem      |
| alert     | Tindakan mesti diambil segera | Pengesanan kerosakan data    |
| emergency | Sistem tidak boleh digunakan| Kegagalan sistem sepenuhnya    |

## Melaksanakan Notifikasi dalam MCP

Untuk melaksanakan notifikasi dalam MCP, anda perlu menyediakan kedua-dua bahagian pelayan dan klien untuk mengendalikan kemas kini masa nyata. Ini membolehkan aplikasi anda memberikan maklum balas serta-merta kepada pengguna semasa operasi berjalan lama.

### Bahagian Pelayan: Menghantar Notifikasi

Mari mulakan dengan bahagian pelayan. Dalam MCP, anda mentakrifkan alat yang boleh menghantar notifikasi semasa memproses permintaan. Pelayan menggunakan objek konteks (biasanya `ctx`) untuk menghantar mesej kepada klien.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Dalam contoh di atas, alat `process_files` menghantar tiga notifikasi kepada klien semasa memproses setiap fail. Kaedah `ctx.info()` digunakan untuk menghantar mesej maklumat.

Selain itu, untuk mengaktifkan notifikasi, pastikan pelayan anda menggunakan penghantaran penstriman (seperti `streamable-http`) dan klien anda melaksanakan pengendali mesej untuk memproses notifikasi. Berikut cara menyediakan pelayan untuk menggunakan penghantaran `streamable-http`:

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

Dalam contoh .NET ini, alat `ProcessFiles` dihiasi dengan atribut `Tool` dan menghantar tiga notifikasi kepada klien semasa memproses setiap fail. Kaedah `ctx.Info()` digunakan untuk menghantar mesej maklumat.

Untuk mengaktifkan notifikasi dalam pelayan MCP .NET anda, pastikan anda menggunakan penghantaran penstriman:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Bahagian Klien: Menerima Notifikasi

Klien mesti melaksanakan pengendali mesej untuk memproses dan memaparkan notifikasi semasa ia tiba.

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

Dalam kod tadi, fungsi `message_handler` memeriksa sama ada mesej masuk adalah notifikasi. Jika ya, ia mencetak notifikasi; jika tidak, ia memprosesnya sebagai mesej pelayan biasa. Juga perhatikan bagaimana `ClientSession` diinisialisasi dengan `message_handler` untuk mengendalikan notifikasi yang masuk.

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

Dalam contoh .NET ini, fungsi `MessageHandler` memeriksa sama ada mesej masuk adalah notifikasi. Jika ya, ia mencetak notifikasi; jika tidak, ia memprosesnya sebagai mesej pelayan biasa. `ClientSession` diinisialisasi dengan pengendali mesej melalui `ClientSessionOptions`.

Untuk mengaktifkan notifikasi, pastikan pelayan anda menggunakan penghantaran penstriman (seperti `streamable-http`) dan klien anda melaksanakan pengendali mesej untuk memproses notifikasi.

## Notifikasi Kemajuan & Senario

Bahagian ini menerangkan konsep notifikasi kemajuan dalam MCP, mengapa ia penting, dan bagaimana melaksanakannya menggunakan HTTP Boleh Strim. Anda juga akan menemui tugasan praktikal untuk menguatkan pemahaman anda.

Notifikasi kemajuan adalah mesej masa nyata yang dihantar dari pelayan ke klien semasa operasi berjalan lama. Daripada menunggu keseluruhan proses selesai, pelayan sentiasa mengemas kini klien tentang status terkini. Ini meningkatkan ketelusan, pengalaman pengguna, dan memudahkan penyahpepijatan.

**Contoh:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Kenapa Guna Notifikasi Kemajuan?

Notifikasi kemajuan penting untuk beberapa sebab:

- **Pengalaman pengguna lebih baik:** Pengguna melihat kemas kini semasa kerja berjalan, bukan hanya di akhir.
- **Maklum balas masa nyata:** Klien boleh memaparkan bar kemajuan atau log, menjadikan aplikasi rasa responsif.
- **Penyahpepijatan dan pemantauan lebih mudah:** Pembangun dan pengguna boleh melihat di mana proses mungkin perlahan atau tersekat.

### Cara Melaksanakan Notifikasi Kemajuan

Berikut cara anda boleh melaksanakan notifikasi kemajuan dalam MCP:

- **Pada pelayan:** Gunakan `ctx.info()` atau `ctx.log()` untuk menghantar notifikasi semasa setiap item diproses. Ini menghantar mesej kepada klien sebelum keputusan utama sedia.
- **Pada klien:** Laksanakan pengendali mesej yang mendengar dan memaparkan notifikasi semasa tiba. Pengendali ini membezakan antara notifikasi dan hasil akhir.

**Contoh Pelayan:**


#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Contoh Pelanggan:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Pertimbangan Keselamatan

Apabila melaksanakan pelayan MCP dengan pengangkutan berasaskan HTTP, keselamatan menjadi keutamaan utama yang memerlukan perhatian rapi kepada pelbagai vektor serangan dan mekanisme perlindungan.

### Gambaran Keseluruhan

Keselamatan adalah penting apabila mendedahkan pelayan MCP melalui HTTP. HTTP yang boleh distrim memperkenalkan permukaan serangan baru dan memerlukan konfigurasi yang teliti.

### Perkara Utama

- **Pengesahan Tajuk Origin**: Sentiasa sahkan tajuk `Origin` untuk mengelakkan serangan pengikatan semula DNS.
- **Pengikatan Localhost**: Untuk pembangunan tempatan, ikat pelayan ke `localhost` untuk mengelakkan pendedahan kepada internet awam.
- **Pengesahan**: Laksanakan pengesahan (contohnya, kekunci API, OAuth) untuk penghantaran pengeluaran.
- **CORS**: Konfigurasikan dasar Perkongsian Sumber Rentas Asal (CORS) untuk mengehadkan akses.
- **HTTPS**: Gunakan HTTPS dalam pengeluaran untuk menyulitkan trafik.

### Amalan Terbaik

- Jangan mempercayai permintaan masuk tanpa pengesahan.
- Catat dan pantau semua akses dan ralat.
- Kemas kini kebergantungan secara berkala untuk menampal kelemahan keselamatan.

### Cabaran

- Menyeimbangkan keselamatan dengan kemudahan pembangunan
- Memastikan keserasian dengan pelbagai persekitaran pelanggan

## Meningkatkan dari SSE ke HTTP yang Boleh Distrim

Untuk aplikasi yang kini menggunakan Server-Sent Events (SSE), migrasi ke HTTP yang Boleh Distrim memberikan keupayaan yang dipertingkatkan dan kelestarian jangka panjang yang lebih baik untuk pelaksanaan MCP anda.

### Mengapa Meningkatkan?

Terdapat dua sebab kukuh untuk meningkatkan dari SSE ke HTTP yang Boleh Distrim:

- HTTP yang Boleh Distrim menawarkan kebolehskalaan, keserasian, dan sokongan pemberitahuan yang lebih kaya berbanding SSE.
- Ia adalah pengangkutan yang disyorkan untuk aplikasi MCP baru.

### Langkah Migrasi

Berikut adalah cara anda boleh migrasi dari SSE ke HTTP yang Boleh Distrim dalam aplikasi MCP anda:

- **Kemas kini kod pelayan** untuk menggunakan `transport="streamable-http"` dalam `mcp.run()`.
- **Kemas kini kod pelanggan** untuk menggunakan `streamablehttp_client` menggantikan pelanggan SSE.
- **Laksanakan pengendali mesej** dalam pelanggan untuk memproses pemberitahuan.
- **Uji keserasian** dengan alat dan aliran kerja yang sedia ada.

### Mengekalkan Keserasian

Disyorkan untuk mengekalkan keserasian dengan pelanggan SSE sedia ada semasa proses migrasi. Berikut adalah beberapa strategi:

- Anda boleh menyokong kedua-dua SSE dan HTTP yang Boleh Distrim dengan menjalankan kedua-dua pengangkutan pada titik akhir yang berbeza.
- Migrasi pelanggan secara beransur-ansur ke pengangkutan baru.

### Cabaran

Pastikan anda menangani cabaran berikut semasa migrasi:

- Memastikan semua pelanggan dikemas kini
- Mengendalikan perbezaan dalam penghantaran pemberitahuan

## Pertimbangan Keselamatan

Keselamatan harus menjadi keutamaan utama apabila melaksanakan mana-mana pelayan, terutamanya apabila menggunakan pengangkutan berasaskan HTTP seperti HTTP yang Boleh Distrim dalam MCP.

Apabila melaksanakan pelayan MCP dengan pengangkutan berasaskan HTTP, keselamatan menjadi keutamaan utama yang memerlukan perhatian rapi kepada pelbagai vektor serangan dan mekanisme perlindungan.

### Gambaran Keseluruhan

Keselamatan adalah penting apabila mendedahkan pelayan MCP melalui HTTP. HTTP yang boleh distrim memperkenalkan permukaan serangan baru dan memerlukan konfigurasi yang teliti.

Berikut adalah beberapa pertimbangan keselamatan utama:

- **Pengesahan Tajuk Origin**: Sentiasa sahkan tajuk `Origin` untuk mengelakkan serangan pengikatan semula DNS.
- **Pengikatan Localhost**: Untuk pembangunan tempatan, ikat pelayan ke `localhost` untuk mengelakkan pendedahan kepada internet awam.
- **Pengesahan**: Laksanakan pengesahan (contohnya, kekunci API, OAuth) untuk penghantaran pengeluaran.
- **CORS**: Konfigurasikan dasar Perkongsian Sumber Rentas Asal (CORS) untuk mengehadkan akses.
- **HTTPS**: Gunakan HTTPS dalam pengeluaran untuk menyulitkan trafik.

### Amalan Terbaik

Selain itu, berikut adalah beberapa amalan terbaik yang perlu diikuti apabila melaksanakan keselamatan dalam pelayan penstriman MCP anda:

- Jangan mempercayai permintaan masuk tanpa pengesahan.
- Catat dan pantau semua akses dan ralat.
- Kemas kini kebergantungan secara berkala untuk menampal kelemahan keselamatan.

### Cabaran

Anda akan menghadapi beberapa cabaran apabila melaksanakan keselamatan dalam pelayan penstriman MCP:

- Menyeimbangkan keselamatan dengan kemudahan pembangunan
- Memastikan keserasian dengan pelbagai persekitaran pelanggan

### Tugasan: Bina Aplikasi MCP Streaming Anda Sendiri

**Senario:**
Bina pelayan dan pelanggan MCP di mana pelayan memproses senarai item (contohnya, fail atau dokumen) dan menghantar pemberitahuan untuk setiap item yang diproses. Pelanggan harus memaparkan setiap pemberitahuan sebaik sahaja ia tiba.

**Langkah-langkah:**

1. Laksanakan alat pelayan yang memproses senarai dan menghantar pemberitahuan untuk setiap item.
2. Laksanakan pelanggan dengan pengendali mesej untuk memaparkan pemberitahuan secara masa nyata.
3. Uji pelaksanaan anda dengan menjalankan kedua-dua pelayan dan pelanggan, dan perhatikan pemberitahuan.

[Penyelesaian](./solution/README.md)

## Bacaan Lanjut & Apa Seterusnya?

Untuk meneruskan perjalanan anda dengan penstriman MCP dan meluaskan pengetahuan anda, bahagian ini menyediakan sumber tambahan dan cadangan langkah seterusnya untuk membina aplikasi yang lebih maju.

### Bacaan Lanjut

- [Microsoft: Pengenalan kepada Penstriman HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS dalam ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Permintaan Penstriman](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Apa Seterusnya?

- Cuba bina alat MCP yang lebih maju yang menggunakan penstriman untuk analitik masa nyata, sembang, atau suntingan kolaboratif.
- Terokai integrasi penstriman MCP dengan rangka kerja depan (React, Vue, dan lain-lain) untuk kemas kini UI secara langsung.
- Seterusnya: [Menggunakan AI Toolkit untuk VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->