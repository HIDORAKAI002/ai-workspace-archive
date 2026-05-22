# Penstriman HTTPS dengan Protokol Konteks Model (MCP)

Bab ini menyediakan panduan komprehensif untuk melaksanakan penstriman selamat, boleh skala, dan masa nyata dengan Protokol Konteks Model (MCP) menggunakan HTTPS. Ia merangkumi motivasi untuk penstriman, mekanisme pengangkutan yang tersedia, cara melaksanakan HTTP yang boleh distrim dalam MCP, amalan terbaik keselamatan, migrasi dari SSE, dan panduan praktikal untuk membina aplikasi MCP penstriman anda sendiri.

## Mekanisme Pengangkutan dan Penstriman dalam MCP

Bahagian ini meneroka pelbagai mekanisme pengangkutan yang tersedia dalam MCP dan peranan mereka dalam membolehkan keupayaan penstriman untuk komunikasi masa nyata antara klien dan pelayan.

### Apakah Mekanisme Pengangkutan?

Mekanisme pengangkutan menentukan bagaimana data ditukar antara klien dan pelayan. MCP menyokong pelbagai jenis pengangkutan untuk menyesuaikan dengan persekitaran dan keperluan yang berbeza:

- **stdio**: Input/output standard, sesuai untuk alat tempatan dan berasaskan CLI. Mudah tetapi tidak sesuai untuk web atau awan.
- **SSE (Server-Sent Events)**: Membenarkan pelayan menolak kemas kini masa nyata kepada klien melalui HTTP. Baik untuk UI web, tetapi terhad dalam skala dan fleksibiliti. Sejak Spesifikasi MCP 2025-06-18, pengangkutan SSE (Server-Sent Events) berdiri sendiri telah dihentikan dan digantikan dengan pengangkutan "Streamable HTTP".
- **Streamable HTTP**: Pengangkutan penstriman berasaskan HTTP moden, menyokong notifikasi dan skala yang lebih baik. Disyorkan untuk kebanyakan senario pengeluaran dan awan.

### Jadual Perbandingan

Lihat jadual perbandingan di bawah untuk memahami perbezaan antara mekanisme pengangkutan ini:

| Pengangkutan      | Kemas Kini Masa Nyata | Penstriman | Kebolehan Skala | Kes Penggunaan        |
|-------------------|----------------------|------------|-----------------|-----------------------|
| stdio             | Tidak                | Tidak      | Rendah          | Alat CLI tempatan     |
| SSE               | Ya                   | Ya         | Sederhana       | Web, kemas kini masa nyata |
| Streamable HTTP   | Ya                   | Ya         | Tinggi          | Awan, pelbagai klien  |

> **Petua:** Memilih pengangkutan yang betul memberi kesan kepada prestasi, kebolehan skala, dan pengalaman pengguna. **Streamable HTTP** disyorkan untuk aplikasi moden, boleh skala, dan sedia awan.

Perhatikan pengangkutan stdio dan SSE yang telah anda lihat dalam bab sebelumnya dan bagaimana Streamable HTTP adalah pengangkutan yang dibincangkan dalam bab ini.

## Penstriman: Konsep dan Motivasi

Memahami konsep asas dan motivasi di sebalik penstriman adalah penting untuk melaksanakan sistem komunikasi masa nyata yang berkesan.

**Penstriman** ialah teknik dalam pengaturcaraan rangkaian yang membenarkan data dihantar dan diterima dalam bahagian kecil yang mudah diurus atau sebagai urutan peristiwa, bukannya menunggu satu respons penuh sedia. Ini sangat berguna untuk:

- Fail atau set data besar.
- Kemas kini masa nyata (contohnya, sembang, bar kemajuan).
- Pengiraan berlari panjang di mana anda ingin sentiasa memaklumkan pengguna.

Ini yang perlu anda ketahui tentang penstriman pada tahap tinggi:

- Data dihantar secara berperingkat, bukan sekaligus.
- Klien boleh memproses data sebaik sahaja ia tiba.
- Mengurangkan kelewatan yang dirasai dan meningkatkan pengalaman pengguna.

### Kenapa guna penstriman?

Sebab menggunakan penstriman adalah seperti berikut:

- Pengguna mendapat maklum balas segera, bukan hanya pada akhirnya
- Membolehkan aplikasi masa nyata dan UI yang responsif
- Penggunaan lebih cekap sumber rangkaian dan pengiraan

### Contoh Mudah: Pelayan & Klien Penstriman HTTP

Berikut adalah contoh mudah cara penstriman boleh dilaksanakan:

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

Contoh ini menunjukkan pelayan menghantar satu siri mesej kepada klien apabila pesanan tersebut tersedia, bukan menunggu semua mesej sedia.

**Bagaimana ia berfungsi:**

- Pelayan menghasilkan setiap mesej bila ia sedia.
- Klien menerima dan mencetak setiap bahagian sebaik ia tiba.

**Keperluan:**

- Pelayan mesti menggunakan respons penstriman (contohnya, `StreamingResponse` dalam FastAPI).
- Klien mesti memproses respons sebagai penstriman (`stream=True` dalam requests).
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

- Menggunakan stack reaktif Spring Boot dengan `Flux` untuk penstriman
- `ServerSentEvent` menyediakan penstriman peristiwa berstruktur dengan jenis peristiwa
- `WebClient` dengan `bodyToFlux()` membolehkan penggunaan penstriman reaktif
- `delayElements()` mensimulasikan masa pemprosesan antara peristiwa
- Peristiwa boleh mempunyai jenis (`info`, `result`) untuk pengendalian klien yang lebih baik

### Perbandingan: Penstriman Klasik vs Penstriman MCP

Perbezaan bagaimana penstriman berfungsi secara "klasik" berbanding dalam MCP boleh digambarkan seperti berikut:

| Ciri                  | Penstriman HTTP Klasik         | Penstriman MCP (Notifikasi)         |
|-----------------------|-------------------------------|------------------------------------|
| Respons utama          | Berpecah (chunked)             | Tunggal, di akhir                  |
| Kemas kini kemajuan    | Dihantar sebagai bahagian data | Dihantar sebagai notifikasi        |
| Keperluan klien        | Mesti memproses penstriman     | Mesti melaksanakan pengendali mesej|
| Kes penggunaan         | Fail besar, aliran token AI    | Kemajuan, log, maklum balas masa nyata|

### Perbezaan Utama Yang Diperhatikan

Selain itu, berikut adalah beberapa perbezaan utama:

- **Corak Komunikasi:**
  - Penstriman HTTP klasik: Menggunakan pengekodan pemindahan berpecah mudah untuk menghantar data dalam bahagian
  - Penstriman MCP: Menggunakan sistem notifikasi berstruktur dengan protokol JSON-RPC

- **Format Mesej:**
  - HTTP klasik: Bahagian teks biasa dengan garis baru
  - MCP: Objek LoggingMessageNotification berstruktur dengan metadata

- **Pelaksanaan Klien:**
  - HTTP klasik: Klien mudah yang memproses respons penstriman
  - MCP: Klien lebih maju dengan pengendali mesej untuk memproses pelbagai jenis mesej

- **Kemas Kini Kemajuan:**
  - HTTP klasik: Kemajuan sebahagian dari aliran respons utama
  - MCP: Kemajuan dihantar melalui mesej notifikasi berasingan sementara respons akhir datang di penghujung

### Cadangan

Terdapat beberapa perkara yang kami cadangkan apabila memilih antara melaksanakan penstriman klasik (seperti titik akhir yang kami tunjukkan sebelum ini menggunakan `/stream`) berbanding penstriman melalui MCP.

- **Untuk keperluan penstriman mudah:** Penstriman HTTP klasik lebih mudah dilaksanakan dan mencukupi untuk keperluan penstriman asas.

- **Untuk aplikasi interaktif kompleks:** Penstriman MCP menyediakan pendekatan berstruktur dengan metadata lebih kaya dan pemisahan antara notifikasi dan keputusan akhir.

- **Untuk aplikasi AI:** Sistem notifikasi MCP amat berguna untuk tugas AI berlari panjang di mana anda ingin memaklumkan pengguna tentang kemajuan.

## Penstriman dalam MCP

Oleh itu, anda telah melihat beberapa cadangan dan perbandingan setakat ini mengenai perbezaan antara penstriman klasik dan penstriman dalam MCP. Mari kita bincangkan secara terperinci bagaimana anda boleh menggunakan penstriman dalam MCP.

Memahami bagaimana penstriman berfungsi dalam rangka kerja MCP adalah penting untuk membina aplikasi yang responsif yang menyediakan maklum balas masa nyata kepada pengguna semasa operasi berlari panjang.

Dalam MCP, penstriman bukanlah mengenai menghantar respons utama dalam bahagian, tetapi menghantar **notifikasi** kepada klien semasa alat sedang memproses permintaan. Notifikasi ini boleh termasuk kemas kini kemajuan, log, atau peristiwa lain.

### Bagaimana ia berfungsi

Keputusan utama masih dihantar sebagai satu respons. Namun, notifikasi boleh dihantar sebagai mesej berasingan semasa pemprosesan dan dengan itu mengemas kini klien secara masa nyata. Klien mesti dapat mengendalikan dan memaparkan notifikasi ini.

## Apakah Notifikasi?

Kami sebut "Notifikasi", apakah maksudnya dalam konteks MCP?

Notifikasi ialah mesej yang dihantar dari pelayan ke klien untuk memaklumkan tentang kemajuan, status, atau peristiwa lain semasa operasi berlari panjang. Notifikasi meningkatkan ketelusan dan pengalaman pengguna.

Contohnya, klien sepatutnya menghantar notifikasi selepas jabat tangan awal dengan pelayan telah dibuat.

Notifikasi kelihatan seperti mesej JSON seperti berikut:

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

Untuk mendapatkan log berfungsi, pelayan perlu mengaktifkannya sebagai ciri/keupayaan seperti berikut:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Bergantung pada SDK yang digunakan, log mungkin diaktifkan secara lalai, atau anda mungkin perlu mengaktifkannya secara eksplisit dalam konfigurasi pelayan anda.

Terdapat pelbagai jenis notifikasi:

| Tahap      | Penerangan                    | Contoh Kes Penggunaan            |
|------------|------------------------------|--------------------------------|
| debug      | Maklumat debugging terperinci | Titik masuk/keluar fungsi      |
| info       | Mesej maklumat umum           | Kemas kini kemajuan operasi    |
| notice     | Peristiwa normal tetapi penting| Perubahan konfigurasi          |
| warning    | Keadaan amaran                | Penggunaan ciri yang sudah usang|
| error      | Keadaan ralat                | Kegagalan operasi              |
| critical   | Keadaan kritikal             | Kegagalan komponen sistem      |
| alert      | Tindakan mesti diambil segera| Rasuah data dikesan            |
| emergency  | Sistem tidak boleh digunakan | Kegagalan sistem sepenuhnya    |

## Melaksanakan Notifikasi dalam MCP

Untuk melaksanakan notifikasi dalam MCP, anda perlu menyediakan kedua-dua pihak pelayan dan klien untuk mengendalikan kemas kini masa nyata. Ini membolehkan aplikasi anda memberi maklum balas segera kepada pengguna semasa operasi berlari panjang.

### Pihak Pelayan: Menghantar Notifikasi

Mari mulakan dengan pihak pelayan. Dalam MCP, anda mendefinisikan alat yang boleh menghantar notifikasi semasa memproses permintaan. Pelayan menggunakan objek konteks (biasanya `ctx`) untuk menghantar mesej kepada klien.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Dalam contoh sebelumnya, alat `process_files` menghantar tiga notifikasi kepada klien semasa memproses setiap fail. Kaedah `ctx.info()` digunakan untuk menghantar mesej maklumat.

Selain itu, untuk mengaktifkan notifikasi, pastikan pelayan anda menggunakan pengangkutan penstriman (seperti `streamable-http`) dan klien anda melaksanakan pengendali mesej untuk memproses notifikasi. Berikut adalah cara anda boleh menyediakan pelayan untuk menggunakan pengangkutan `streamable-http`:

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

Untuk mengaktifkan notifikasi dalam pelayan MCP .NET anda, pastikan anda menggunakan pengangkutan penstriman:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Pihak Klien: Menerima Notifikasi

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

Dalam kod sebelumnya, fungsi `message_handler` memeriksa sama ada mesej yang masuk adalah notifikasi. Jika ya, ia mencetak notifikasi; jika tidak, ia memprosesnya sebagai mesej pelayan biasa. Juga perhatikan bagaimana `ClientSession` diinisialisasi dengan `message_handler` untuk mengendalikan notifikasi masuk.

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

Dalam contoh .NET ini, fungsi `MessageHandler` memeriksa sama ada mesej yang masuk adalah notifikasi. Jika ya, ia mencetak notifikasi; jika tidak, ia memprosesnya sebagai mesej pelayan biasa. `ClientSession` diinisialisasi dengan pengendali mesej melalui `ClientSessionOptions`.

Untuk mengaktifkan notifikasi, pastikan pelayan anda menggunakan pengangkutan penstriman (seperti `streamable-http`) dan klien anda melaksanakan pengendali mesej untuk memproses notifikasi.

## Notifikasi Kemajuan & Senario

Bahagian ini menerangkan konsep notifikasi kemajuan dalam MCP, mengapa ia penting, dan cara melaksanakannya menggunakan Streamable HTTP. Anda juga akan menemui tugasan praktikal untuk mengukuhkan pemahaman anda.

Notifikasi kemajuan ialah mesej masa nyata yang dihantar dari pelayan ke klien semasa operasi berlari panjang. Daripada menunggu keseluruhan proses selesai, pelayan mengemas kini klien tentang status semasa. Ini meningkatkan ketelusan, pengalaman pengguna, dan memudahkan penyahpepijatan.

**Contoh:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Kenapa Guna Notifikasi Kemajuan?

Notifikasi kemajuan penting atas beberapa sebab:

- **Pengalaman pengguna lebih baik:** Pengguna melihat kemas kini semasa kerja berjalan, bukan hanya di akhir.
- **Maklum balas masa nyata:** Klien boleh memaparkan bar kemajuan atau log, menjadikan aplikasi terasa responsif.
- **Penyahpepijatan dan pemantauan lebih mudah:** Pembangun dan pengguna boleh melihat di mana proses mungkin perlahan atau tersekat.

### Cara Melaksanakan Notifikasi Kemajuan

Berikut cara anda boleh melaksanakan notifikasi kemajuan dalam MCP:

- **Pada pelayan:** Gunakan `ctx.info()` atau `ctx.log()` untuk menghantar notifikasi setiap kali item diproses. Ini menghantar mesej kepada klien sebelum keputusan utama siap.
- **Pada klien:** Melaksanakan pengendali mesej yang mendengar dan memaparkan notifikasi apabila ia tiba. Pengendali ini membezakan antara notifikasi dan keputusan akhir.

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

**Contoh Klien:**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Pertimbangan Keselamatan

Apabila melaksanakan pelayan MCP dengan pengangkutan berasaskan HTTP, keselamatan menjadi perhatian utama yang memerlukan perhatian teliti terhadap pelbagai vektor serangan dan mekanisme perlindungan.

### Gambaran Keseluruhan

Keselamatan kritikal apabila mendedahkan pelayan MCP melalui HTTP. Streamable HTTP memperkenalkan permukaan serangan baru dan memerlukan konfigurasi teliti.

### Perkara Utama

- **Pengesahan Header Origin**: Sentiasa sahkan header `Origin` untuk mengelakkan serangan DNS rebinding.
- **Pengikatan Localhost**: Untuk pembangunan tempatan, ikat pelayan ke `localhost` untuk mengelakkan pendedahan kepada internet awam.
- **Autentikasi**: Laksanakan autentikasi (contohnya, kunci API, OAuth) untuk pengeluaran.
- **CORS**: Konfigurasikan polisi Perkongsian Sumber Merentas-Asal (CORS) untuk mengehadkan akses.
- **HTTPS**: Gunakan HTTPS dalam pengeluaran untuk menyulitkan trafik.

### Amalan Terbaik

- Jangan percaya permintaan yang masuk tanpa pengesahan.
- Log dan pantau semua akses dan ralat.
- Kemas kini kebergantungan secara berkala untuk membaiki kelemahan keselamatan.

### Cabaran
- Mengimbangi keselamatan dengan kemudahan pembangunan
- Memastikan keserasian dengan pelbagai persekitaran klien

## Menaik taraf dari SSE ke Streamable HTTP

Bagi aplikasi yang kini menggunakan Server-Sent Events (SSE), migrasi ke Streamable HTTP menyediakan keupayaan yang dipertingkatkan dan kelangsungan jangka panjang yang lebih baik untuk pelaksanaan MCP anda.

### Kenapa Menaik Taraf?

Terdapat dua sebab kukuh untuk menaik taraf dari SSE ke Streamable HTTP:

- Streamable HTTP menawarkan kebolehskalaan yang lebih baik, keserasian, dan sokongan pemberitahuan yang lebih kaya berbanding SSE.
- Ia adalah pengangkutan yang disyorkan untuk aplikasi MCP baru.

### Langkah Migrasi

Berikut adalah cara anda boleh bermigrasi dari SSE ke Streamable HTTP dalam aplikasi MCP anda:

- **Kemas kini kod pelayan** untuk menggunakan `transport="streamable-http"` dalam `mcp.run()`.
- **Kemas kini kod klien** untuk menggunakan `streamablehttp_client` menggantikan klien SSE.
- **Laksanakan pengendali mesej** dalam klien untuk memproses pemberitahuan.
- **Uji keserasian** dengan alat dan aliran kerja sedia ada.

### Mengekalkan Keserasian

Disyorkan untuk mengekalkan keserasian dengan klien SSE sedia ada semasa proses migrasi. Berikut adalah beberapa strategi:

- Anda boleh menyokong kedua-dua SSE dan Streamable HTTP dengan menjalankan kedua-dua pengangkutan pada titik akhir yang berbeza.
- Migrasi klien secara berperingkat ke pengangkutan baru.

### Cabaran

Pastikan anda menangani cabaran berikut semasa migrasi:

- Memastikan semua klien dikemas kini
- Mengendalikan perbezaan dalam penghantaran pemberitahuan

## Pertimbangan Keselamatan

Keselamatan harus menjadi keutamaan utama apabila melaksanakan mana-mana pelayan, terutamanya apabila menggunakan pengangkutan berasaskan HTTP seperti Streamable HTTP dalam MCP.

Apabila melaksanakan pelayan MCP dengan pengangkutan berasaskan HTTP, keselamatan menjadi keprihatinan utama yang memerlukan perhatian teliti terhadap pelbagai vektor serangan dan mekanisme perlindungan.

### Gambaran Keseluruhan

Keselamatan adalah kritikal apabila mendedahkan pelayan MCP melalui HTTP. Streamable HTTP memperkenalkan permukaan serangan baru dan memerlukan konfigurasi yang teliti.

Berikut adalah beberapa pertimbangan keselamatan utama:

- **Pengesahan Kepala Origin**: Sentiasa sahkan kepala `Origin` untuk mengelakkan serangan DNS rebinding.
- **Pengikatan Localhost**: Untuk pembangunan tempatan, ikat pelayan ke `localhost` bagi mengelakkan ia terdedah kepada internet awam.
- **Pengesahan**: Laksanakan pengesahan (contohnya, kunci API, OAuth) untuk penyebaran produksi.
- **CORS**: Konfigurasikan polisi Cross-Origin Resource Sharing (CORS) untuk mengehadkan akses.
- **HTTPS**: Gunakan HTTPS dalam produksi untuk menyulitkan trafik.

### Amalan Terbaik

Selain itu, berikut adalah beberapa amalan terbaik untuk diikuti apabila melaksanakan keselamatan dalam pelayan streaming MCP anda:

- Jangan sesekali percaya pada permintaan masuk tanpa pengesahan.
- Log dan pantau semua akses dan ralat.
- Kemas kini ketergantungan secara berkala untuk membaiki kelemahan keselamatan.

### Cabaran

Anda akan menghadapi beberapa cabaran apabila melaksanakan keselamatan dalam pelayan streaming MCP:

- Mengimbangi keselamatan dengan kemudahan pembangunan
- Memastikan keserasian dengan pelbagai persekitaran klien

### Tugasan: Bina Aplikasi Streaming MCP Anda Sendiri

**Senario:**
Bina pelayan dan klien MCP di mana pelayan memproses senarai item (contohnya, fail atau dokumen) dan menghantar pemberitahuan untuk setiap item yang diproses. Klien harus memaparkan setiap pemberitahuan sebaik ia tiba.

**Langkah-langkah:**

1. Laksanakan alat pelayan yang memproses senarai dan menghantar pemberitahuan untuk setiap item.
2. Laksanakan klien dengan pengendali mesej untuk memaparkan pemberitahuan secara masa nyata.
3. Uji pelaksanaan anda dengan menjalankan kedua-dua pelayan dan klien, dan perhatikan pemberitahuan.

[Solution](./solution/README.md)

## Bacaan Lanjut & Apa Seterusnya?

Untuk meneruskan perjalanan anda dengan streaming MCP dan mengembangkan pengetahuan, bahagian ini menyediakan sumber tambahan dan langkah seterusnya yang dicadangkan untuk membina aplikasi yang lebih maju.

### Bacaan Lanjut

- [Microsoft: Pengenalan kepada Streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS dalam ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Permintaan Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Apa Seterusnya?

- Cuba bina alat MCP yang lebih maju yang menggunakan streaming untuk analitik masa nyata, sembang, atau penyuntingan kolaboratif.
- Terokai integrasi streaming MCP dengan rangka kerja frontend (React, Vue, dll.) untuk kemas kini UI secara langsung.
- Seterusnya: [Memanfaatkan AI Toolkit untuk VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->