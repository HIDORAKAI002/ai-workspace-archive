# Penyiaran HTTPS dengan Protokol Konteks Model (MCP)

Bab ini menyediakan panduan komprehensif untuk melaksanakan penyiaran selamat, boleh skala, dan masa nyata dengan Protokol Konteks Model (MCP) menggunakan HTTPS. Ia merangkumi motivasi untuk penyiaran, mekanisme pengangkutan yang tersedia, cara melaksanakan HTTP boleh disiarkan dalam MCP, amalan terbaik keselamatan, migrasi dari SSE, dan panduan praktikal untuk membina aplikasi MCP penyiaran anda sendiri.

> **Melihat ke hadapan:** pelajaran ini menerangkan HTTP Boleh Disiarkan di bawah **Spesifikasi MCP 2025-11-25**, di mana sesi ditubuhkan semasa `initialize` dan dipautkan dengan pengepala `Mcp-Session-Id`. Calon keluaran `2026-07-28` menghapuskan jabat tangan dan ID sesi sepenuhnya, menjadikan setiap permintaan berdikari dan boleh diarahkan ke mana-mana contoh pelayan tanpa sesi melekit. Lihat [Apa Yang Berubah dalam MCP: Calon Keluaran 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) untuk perincian.

## Mekanisme Pengangkutan dan Penyiaran dalam MCP

Bahagian ini meneroka mekanisme pengangkutan yang berbeza yang tersedia dalam MCP dan peranan mereka dalam membolehkan keupayaan penyiaran untuk komunikasi masa nyata antara pelanggan dan pelayan.

### Apakah Mekanisme Pengangkutan?

Mekanisme pengangkutan mentakrifkan bagaimana data ditukar antara pelanggan dan pelayan. MCP menyokong pelbagai jenis pengangkutan untuk memenuhi persekitaran dan keperluan yang berbeza:

- **stdio**: Input/output standard, sesuai untuk alat tempatan dan berasaskan CLI. Mudah tetapi tidak sesuai untuk web atau awan.
- **SSE (Server-Sent Events)**: Membenarkan pelayan menolak kemas kini masa nyata ke pelanggan melalui HTTP. Baik untuk UI web, tetapi terhad dalam kebolehan skala dan fleksibiliti. Sejak Spesifikasi MCP 2025-06-18, pengangkutan berdiri sendiri SSE (Server-Sent Events) telah ditamatkan dan digantikan oleh pengangkutan "Streamable HTTP".
- **Streamable HTTP**: Pengangkutan penyiaran berasaskan HTTP moden, menyokong pemberitahuan dan skala lebih baik. Disyorkan untuk kebanyakan senario pengeluaran dan awan.

### Jadual Perbandingan

Lihat jadual perbandingan di bawah untuk memahami perbezaan antara mekanisme pengangkutan ini:

| Pengangkutan      | Kemas Kini Masa Nyata | Penyiaran | Kebolehan Skala | Kes Penggunaan          |
|------------------|-----------------------|-----------|-----------------|-------------------------|
| stdio            | Tidak                 | Tidak     | Rendah          | Alat CLI tempatan       |
| SSE              | Ya                    | Ya        | Sederhana       | Web, kemas kini masa nyata|
| Streamable HTTP  | Ya                    | Ya        | Tinggi          | Awan, berbilang pelanggan|

> **Petua:** Memilih pengangkutan yang betul mempengaruhi prestasi, kebolehan skala, dan pengalaman pengguna. **Streamable HTTP** disyorkan untuk aplikasi moden, boleh skala, dan sedia awan.

Perhatikan pengangkutan stdio dan SSE yang telah ditunjukkan dalam bab sebelum ini dan bagaimana HTTP boleh disiarkan adalah pengangkutan yang dibincangkan dalam bab ini.

## Penyiaran: Konsep dan Motivasi

Memahami konsep asas dan motivasi di sebalik penyiaran adalah penting untuk melaksanakan sistem komunikasi masa nyata yang berkesan.

**Penyiaran** adalah teknik dalam pengaturcaraan rangkaian yang membenarkan data dihantar dan diterima dalam potongan kecil yang boleh diurus atau sebagai satu siri peristiwa, dan bukannya menunggu keseluruhan respons selesai. Ini amat berguna untuk:

- Fail besar atau dataset.
- Kemas kini masa nyata (contohnya, sembang, bar kemajuan).
- Pengiraan jangka panjang di mana anda mahu pengguna terus dimaklumkan.

Ini yang anda perlu tahu tentang penyiaran secara am:

- Data dihantar secara progresif, bukan sekaligus.
- Pelanggan boleh memproses data sebaik tiba.
- Mengurangkan latensi yang dirasa dan meningkatkan pengalaman pengguna.

### Mengapa menggunakan penyiaran?

Sebab menggunakan penyiaran adalah seperti berikut:

- Pengguna mendapat maklum balas segera, bukan hanya di akhir
- Membolehkan aplikasi masa nyata dan UI responsif
- Penggunaan sumber rangkaian dan pengiraan lebih cekap

### Contoh Mudah: Pelayan & Pelanggan Penyiaran HTTP

Ini contoh mudah bagaimana penyiaran boleh dilaksanakan:

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

**Pelanggan (Python, menggunakan requests):**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Contoh ini menunjukkan pelayan menghantar satu siri mesej kepada pelanggan sebaik mesej tersedia, bukan menunggu semua mesej siap.

**Bagaimana ia berfungsi:**

- Pelayan menyerahkan setiap mesej sebaik ia siap.
- Pelanggan menerima dan mencetak setiap potongan sebaik ia tiba.

**Keperluan:**

- Pelayan mesti menggunakan respons berpenstriman (contoh, `StreamingResponse` dalam FastAPI).
- Pelanggan mesti memproses respons sebagai penstriman (`stream=True` dalam requests).
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

**Pelanggan (Java, menggunakan Spring WebFlux WebClient):**

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
- `ServerSentEvent` menyediakan penstriman acara berstruktur dengan jenis acara
- `WebClient` dengan `bodyToFlux()` membolehkan penggunaan penstriman reaktif
- `delayElements()` mensimulasikan masa pemprosesan antara acara
- Acara boleh mempunyai jenis (`info`, `result`) bagi pengendalian pelanggan lebih baik

### Perbandingan: Penyiaran Klasik vs Penyiaran MCP

Perbezaan antara cara penyiaran berfungsi secara "klasik" berbanding cara ia berfungsi dalam MCP boleh digambarkan seperti berikut:

| Ciri                  | Penyiaran HTTP Klasik         | Penyiaran MCP (Pemberitahuan)    |
|-----------------------|-------------------------------|---------------------------------|
| Respons utama          | Chunked                       | Tunggal, di akhir               |
| Kemas kini kemajuan    | Dihantar sebagai potongan data| Dihantar sebagai pemberitahuan   |
| Keperluan pelanggan    | Mesti memproses penstriman     | Mesti melaksanakan pengendali mesej |
| Kes penggunaan         | Fail besar, aliran token AI   | Kemajuan, log, maklum balas masa nyata |

### Perbezaan Utama Diperhatikan

Selain itu, berikut adalah beberapa perbezaan utama:

- **Corak Komunikasi:**
  - Penyiaran HTTP klasik: Menggunakan penyandian penghantaran berpotongan mudah untuk menghantar data dalam potongan
  - Penyiaran MCP: Menggunakan sistem pemberitahuan berstruktur dengan protokol JSON-RPC

- **Format Mesej:**
  - HTTP klasik: Potongan teks biasa dengan barisan baru
  - MCP: Objek LoggingMessageNotification berstruktur dengan metadata

- **Pelaksanaan Pelanggan:**
  - HTTP klasik: Pelanggan mudah yang memproses respons penstriman
  - MCP: Pelanggan lebih canggih dengan pengendali mesej untuk memproses jenis mesej berbeza

- **Kemas Kini Kemajuan:**
  - HTTP klasik: Kemajuan adalah sebahagian daripada aliran respons utama
  - MCP: Kemajuan dihantar melalui mesej pemberitahuan berasingan manakala respons utama datang di akhir

### Cadangan

Ada beberapa perkara kami cadangkan bila memilih antara melaksanakan penyiaran klasik (sebagai titik hujung yang kami tunjukkan di atas menggunakan `/stream`) berbanding memilih penyiaran melalui MCP.

- **Untuk keperluan penyiaran mudah:** Penyiaran HTTP klasik lebih mudah dilaksanakan dan mencukupi untuk keperluan penyiaran asas.

- **Untuk aplikasi interaktif yang kompleks:** Penyiaran MCP menyediakan pendekatan lebih berstruktur dengan metadata lebih kaya dan pemisahan antara pemberitahuan dan hasil akhir.

- **Untuk aplikasi AI:** Sistem pemberitahuan MCP sangat berguna untuk tugasan AI jangka panjang di mana anda mahu pengguna terus dimaklumkan tentang kemajuan.

## Penyiaran dalam MCP

Baiklah, jadi anda telah melihat beberapa cadangan dan perbandingan setakat ini mengenai perbezaan antara penyiaran klasik dan penyiaran dalam MCP. Mari kita terangkan secara terperinci bagaimana anda boleh memanfaatkan penyiaran dalam MCP.

Memahami bagaimana penyiaran berfungsi dalam rangka MCP adalah penting untuk membina aplikasi responsif yang memberikan maklum balas masa nyata kepada pengguna sepanjang operasi jangka panjang.

Dalam MCP, penyiaran bukan mengenai menghantar respons utama secara berpotongan, tetapi menghantar **pemberitahuan** kepada pelanggan semasa alat memproses permintaan. Pemberitahuan ini boleh merangkumi kemas kini kemajuan, log, atau peristiwa lain.

### Bagaimana ia berfungsi

Hasil utama masih dihantar sebagai satu respons tunggal. Walau bagaimanapun, pemberitahuan boleh dihantar sebagai mesej berasingan sepanjang pemprosesan dan dengan itu mengemas kini pelanggan secara masa nyata. Pelanggan mesti dapat mengendalikan dan memaparkan pemberitahuan ini.

## Apakah itu Pemberitahuan?

Kami kata "Pemberitahuan", apa maksud itu dalam konteks MCP?

Pemberitahuan ialah mesej yang dihantar dari pelayan ke pelanggan untuk memberitahu tentang kemajuan, status, atau peristiwa lain semasa operasi jangka panjang. Pemberitahuan memupuk ketelusan dan pengalaman pengguna.

Contohnya, pelanggan sepatutnya menghantar pemberitahuan sebaik jabat tangan awal dengan pelayan selesai dilakukan.

Pemberitahuan kelihatan seperti berikut sebagai mesej JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Pemberitahuan tergolong dalam topik dalam MCP yang dirujuk sebagai ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Untuk mengaktifkan logging, pelayan perlu mengaktifkannya sebagai ciri/keupayaan seperti berikut:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Bergantung pada SDK yang digunakan, logging mungkin diaktifkan secara lalai, atau anda mungkin perlu mengaktifkannya secara eksplisit dalam konfigurasi pelayan anda.

Terdapat pelbagai jenis pemberitahuan:

| Tahap      | Penerangan                      | Contoh Kes Penggunaan          |
|-----------|--------------------------------|-------------------------------|
| debug     | Maklumat debugging terperinci  | Titik masuk/keluar fungsi     |
| info      | Mesej maklumat umum             | Kemas kini kemajuan operasi   |
| notice    | Peristiwa biasa tetapi penting  | Perubahan konfigurasi         |
| warning   | Keadaan amaran                 | Penggunaan ciri yang tidak disokong lagi |
| error     | Keadaan ralat                  | Kegagalan operasi             |
| critical  | Keadaan kritikal               | Kegagalan komponen sistem     |
| alert     | Tindakan mesti diambil segera  | Pengesanan kerosakan data     |
| emergency | Sistem tidak boleh digunakan   | Kegagalan sistem sepenuhnya   |

## Melaksanakan Pemberitahuan dalam MCP

Untuk melaksanakan pemberitahuan dalam MCP, anda perlu menyediakan kedua-dua pihak pelayan dan pelanggan untuk mengendalikan kemas kini masa nyata. Ini membolehkan aplikasi anda memberikan maklum balas segera kepada pengguna sepanjang operasi jangka panjang.

### Pihak pelayan: Menghantar Pemberitahuan

Mari mulakan dengan pihak pelayan. Dalam MCP, anda mentakrifkan alat yang boleh menghantar pemberitahuan semasa memproses permintaan. Pelayan menggunakan objek konteks (biasanya `ctx`) untuk menghantar mesej kepada pelanggan.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Dalam contoh sebelum ini, alat `process_files` menghantar tiga pemberitahuan kepada pelanggan semasa memproses setiap fail. Kaedah `ctx.info()` digunakan untuk menghantar mesej maklumat.

Selain itu, untuk mengaktifkan pemberitahuan, pastikan pelayan anda menggunakan pengangkutan berpenstriman (seperti `streamable-http`) dan pelanggan anda melaksanakan pengendali mesej untuk memproses pemberitahuan. Ini cara anda boleh menyediakan pelayan menggunakan pengangkutan `streamable-http`:

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

Dalam contoh .NET ini, alat `ProcessFiles` dihias dengan atribut `Tool` dan menghantar tiga pemberitahuan kepada pelanggan semasa memproses setiap fail. Kaedah `ctx.Info()` digunakan untuk menghantar mesej maklumat.

Untuk mengaktifkan pemberitahuan dalam pelayan MCP .NET anda, pastikan anda menggunakan pengangkutan berpenstriman:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Pihak pelanggan: Menerima Pemberitahuan

Pelanggan mesti melaksanakan pengendali mesej untuk memproses dan memaparkan pemberitahuan sebaik tiba.

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

Dalam kod sebelum ini, fungsi `message_handler` memeriksa sama ada mesej masuk adalah pemberitahuan. Jika ya, ia mencetak pemberitahuan; jika tidak, ia memprosesnya sebagai mesej pelayan biasa. Juga perhatikan bagaimana `ClientSession` diinisialisasi dengan `message_handler` untuk mengendalikan pemberitahuan masuk.

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

Dalam contoh .NET ini, fungsi `MessageHandler` memeriksa sama ada mesej masuk adalah pemberitahuan. Jika ya, ia mencetak pemberitahuan; jika tidak, ia memprosesnya sebagai mesej pelayan biasa. `ClientSession` diinisialisasi dengan pengendali mesej melalui `ClientSessionOptions`.

Untuk mengaktifkan pemberitahuan, pastikan pelayan anda menggunakan pengangkutan berpenstriman (seperti `streamable-http`) dan pelanggan anda melaksanakan pengendali mesej untuk memproses pemberitahuan.

## Pemberitahuan Kemajuan & Senario

Bahagian ini menerangkan konsep pemberitahuan kemajuan dalam MCP, mengapa ia penting, dan cara melaksanakannya menggunakan Streamable HTTP. Anda juga akan menemui tugasan praktikal untuk mengukuhkan pemahaman anda.

Pemberitahuan kemajuan adalah mesej masa nyata yang dihantar dari pelayan ke pelanggan semasa operasi jangka panjang. Daripada menunggu seluruh proses selesai, pelayan sentiasa mengemas kini pelanggan tentang status terkini. Ini meningkatkan ketelusan, pengalaman pengguna, dan memudahkan pengesan masalah.

**Contoh:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Kenapa Gunakan Pemberitahuan Kemajuan?

Pemberitahuan kemajuan penting atas beberapa sebab:

- **Pengalaman pengguna lebih baik:** Pengguna melihat kemas kini semasa kerja berjalan, bukan hanya di akhir.
- **Maklum balas masa nyata:** Pelanggan boleh memaparkan bar kemajuan atau log, menjadikan aplikasi rasa responsif.
- **Pengesan masalah dan pemantauan lebih mudah:** Pembangun dan pengguna boleh melihat di mana proses mungkin perlahan atau tersekat.

### Cara Melaksanakan Pemberitahuan Kemajuan

Berikut cara anda boleh melaksanakan pemberitahuan kemajuan dalam MCP:

- **Di pelayan:** Gunakan `ctx.info()` atau `ctx.log()` untuk menghantar pemberitahuan semasa setiap item diproses. Ini menghantar mesej kepada pelanggan sebelum hasil utama siap.
- **Di pelanggan:** Laksanakan pengendali mesej yang mendengar dan memaparkan pemberitahuan sebaik ia tiba. Pengendali ini membezakan antara pemberitahuan dan hasil akhir.

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

Apabila melaksanakan pelayan MCP dengan pengangkutan berasaskan HTTP, keselamatan menjadi keutamaan utama yang memerlukan perhatian rapi terhadap pelbagai vektor serangan dan mekanisme perlindungan.

### Gambaran Keseluruhan

Keselamatan kritikal apabila mendedahkan pelayan MCP melalui HTTP. Streamable HTTP memperkenalkan permukaan serangan baru dan memerlukan konfigurasi teliti.

### Poin Utama


- **Pengesahan Header Origin**: Sentiasa sahkan header `Origin` untuk mengelakkan serangan DNS rebinding.
- **Binding Localhost**: Untuk pembangunan tempatan, ikat server ke `localhost` untuk mengelakkan pendedahan kepada internet awam.
- **Autentikasi**: Laksanakan autentikasi (contohnya, kunci API, OAuth) untuk pengeluaran.
- **CORS**: Konfigurasikan polisi Perkongsian Sumber Merentas-Asal (CORS) untuk mengehadkan akses.
- **HTTPS**: Gunakan HTTPS dalam pengeluaran untuk menyulitkan trafik.

### Amalan Terbaik

- Jangan sekali-kali mempercayai permintaan masuk tanpa pengesahan.
- Log dan pantau semua akses dan kesilapan.
- Kemas kini bergantung secara berkala untuk menampal kelemahan keselamatan.

### Cabaran

- Mengimbangi keselamatan dengan kemudahan pembangunan
- Memastikan keserasian dengan pelbagai persekitaran klien

## Naik taraf dari SSE ke Streamable HTTP

Untuk aplikasi yang kini menggunakan Server-Sent Events (SSE), migrasi ke Streamable HTTP menyediakan keupayaan yang dipertingkatkan dan kelangsungan jangka panjang yang lebih baik untuk pelaksanaan MCP anda.

### Kenapa Naik Taraf?

Terdapat dua sebab kuat untuk naik taraf dari SSE ke Streamable HTTP:

- Streamable HTTP menawarkan skalabiliti, keserasian, dan sokongan pemberitahuan yang lebih kaya berbanding SSE.
- Ia adalah pengangkutan yang disyorkan untuk aplikasi MCP baru.

### Langkah Migrasi

Berikut adalah cara anda boleh migrasi dari SSE ke Streamable HTTP dalam aplikasi MCP anda:

- **Kemaskini kod server** untuk menggunakan `transport="streamable-http"` dalam `mcp.run()`.
- **Kemaskini kod klien** untuk menggunakan `streamablehttp_client` menggantikan klien SSE.
- **Laksanakan pengendali mesej** dalam klien untuk memproses pemberitahuan.
- **Uji keserasian** dengan alat dan aliran kerja sedia ada.

### Mengekalkan Keserasian

Adalah disyorkan untuk mengekalkan keserasian dengan klien SSE sedia ada sepanjang proses migrasi. Berikut adalah beberapa strategi:

- Anda boleh menyokong kedua-dua SSE dan Streamable HTTP dengan menjalankan kedua-dua pengangkutan pada titik akhir yang berbeza.
- Migrasi klien secara berperingkat ke pengangkutan baru.

### Cabaran

Pastikan anda mengatasi cabaran berikut semasa migrasi:

- Memastikan semua klien dikemas kini
- Mengendalikan perbezaan dalam penghantaran pemberitahuan

## Pertimbangan Keselamatan

Keselamatan harus menjadi keutamaan tertinggi apabila melaksanakan mana-mana server, terutama apabila menggunakan pengangkutan berasaskan HTTP seperti Streamable HTTP dalam MCP.

Apabila melaksanakan server MCP dengan pengangkutan berasaskan HTTP, keselamatan menjadi keprihatinan utama yang memerlukan perhatian teliti terhadap pelbagai vektor serangan dan mekanisme perlindungan.

### Gambaran Keseluruhan

Keselamatan adalah kritikal apabila mendedahkan server MCP melalui HTTP. Streamable HTTP memperkenalkan permukaan serangan baru dan memerlukan konfigurasi yang teliti.

Berikut adalah beberapa pertimbangan keselamatan utama:

- **Pengesahan Header Origin**: Sentiasa sahkan header `Origin` untuk mengelakkan serangan DNS rebinding.
- **Binding Localhost**: Untuk pembangunan tempatan, ikat server ke `localhost` untuk mengelakkan pendedahan kepada internet awam.
- **Autentikasi**: Laksanakan autentikasi (contohnya, kunci API, OAuth) untuk pengeluaran.
- **CORS**: Konfigurasikan polisi Perkongsian Sumber Merentas-Asal (CORS) untuk mengehadkan akses.
- **HTTPS**: Gunakan HTTPS dalam pengeluaran untuk menyulitkan trafik.

### Amalan Terbaik

Selain itu, berikut adalah beberapa amalan terbaik untuk diikuti ketika melaksanakan keselamatan dalam server streaming MCP anda:

- Jangan sekali-kali mempercayai permintaan masuk tanpa pengesahan.
- Log dan pantau semua akses dan kesilapan.
- Kemas kini bergantung secara berkala untuk menampal kelemahan keselamatan.

### Cabaran

Anda akan menghadapi beberapa cabaran apabila melaksanakan keselamatan dalam server streaming MCP:

- Mengimbangi keselamatan dengan kemudahan pembangunan
- Memastikan keserasian dengan pelbagai persekitaran klien

### Tugasan: Bina Aplikasi MCP Streaming Anda Sendiri

**Senario:**
Bina server dan klien MCP di mana server memproses senarai item (contohnya, fail atau dokumen) dan menghantar pemberitahuan untuk setiap item yang diproses. Klien harus memaparkan setiap pemberitahuan sebaik ia diterima.

**Langkah-langkah:**

1. Laksanakan alat server yang memproses senarai dan menghantar pemberitahuan untuk setiap item.
2. Laksanakan klien dengan pengendali mesej untuk memaparkan pemberitahuan secara masa sebenar.
3. Uji pelaksanaan anda dengan menjalankan server dan klien, dan perhatikan pemberitahuan.

[Penyelesaian](./solution/README.md)

## Bacaan Lanjut & Apa Seterusnya?

Untuk meneruskan perjalanan anda dengan streaming MCP dan mengembangkan pengetahuan anda, bahagian ini menyediakan sumber tambahan dan langkah-langkah yang disyorkan untuk membina aplikasi yang lebih maju.

### Bacaan Lanjut

- [Microsoft: Pengenalan kepada HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS dalam ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Permintaan Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Apa Seterusnya?

- Cuba bina alat MCP yang lebih maju yang menggunakan streaming untuk analitik masa nyata, sembang, atau penyuntingan kolaboratif.
- Terokai integrasi streaming MCP dengan rangka kerja frontend (React, Vue, dan lain-lain) untuk kemas kini UI secara langsung.
- Seterusnya: [Menggunakan Alat AI untuk VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->