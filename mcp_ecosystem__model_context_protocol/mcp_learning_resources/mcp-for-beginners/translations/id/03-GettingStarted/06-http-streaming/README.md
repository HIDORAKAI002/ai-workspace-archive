# Streaming HTTPS dengan Model Context Protocol (MCP)

Bab ini menyediakan panduan komprehensif untuk mengimplementasikan streaming yang aman, skalabel, dan real-time dengan Model Context Protocol (MCP) menggunakan HTTPS. Bab ini mencakup motivasi untuk streaming, mekanisme transportasi yang tersedia, bagaimana mengimplementasikan HTTP yang dapat di-stream di MCP, praktik keamanan terbaik, migrasi dari SSE, dan panduan praktis untuk membangun aplikasi streaming MCP Anda sendiri.

> **Melihat ke depan:** pelajaran ini menjelaskan Streamable HTTP di bawah **Spesifikasi MCP 2025-11-25**, di mana sesi dibuat selama `initialize` dan dipasang dengan header `Mcp-Session-Id`. Kandidat rilis `2026-07-28` menghapus sepenuhnya handshake dan ID sesi, menjadikan setiap permintaan berdiri sendiri dan dapat diarahkan ke instance server mana saja tanpa sesi yang melekat. Lihat [Perubahan dalam MCP: Kandidat Rilis 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) untuk detailnya.

## Mekanisme Transportasi dan Streaming di MCP

Bagian ini mengeksplorasi berbagai mekanisme transportasi yang tersedia di MCP dan perannya dalam memungkinkan kemampuan streaming untuk komunikasi real-time antara klien dan server.

### Apa itu Mekanisme Transportasi?

Mekanisme transportasi mendefinisikan bagaimana data dipertukarkan antara klien dan server. MCP mendukung berbagai jenis transportasi untuk menyesuaikan berbagai lingkungan dan kebutuhan:

- **stdio**: Input/output standar, cocok untuk alat lokal dan berbasis CLI. Sederhana tetapi tidak cocok untuk web atau cloud.
- **SSE (Server-Sent Events)**: Memungkinkan server mengirim pembaruan real-time ke klien melalui HTTP. Baik untuk UI web, tetapi terbatas dalam skalabilitas dan fleksibilitas. Mulai Spesifikasi MCP 2025-06-18, transport SSE mandiri telah tidak digunakan dan digantikan oleh transport "Streamable HTTP".
- **Streamable HTTP**: Transport streaming berbasis HTTP modern, mendukung notifikasi dan skalabilitas lebih baik. Direkomendasikan untuk sebagian besar skenario produksi dan cloud.

### Tabel Perbandingan

Lihat tabel perbandingan di bawah ini untuk memahami perbedaan antar mekanisme transportasi ini:

| Transport         | Pembaruan Real-time | Streaming | Skalabilitas | Kasus Penggunaan          |
|-------------------|--------------------|-----------|--------------|-------------------------|
| stdio             | Tidak              | Tidak     | Rendah       | Alat CLI lokal           |
| SSE               | Ya                 | Ya        | Sedang       | Web, pembaruan real-time |
| Streamable HTTP   | Ya                 | Ya        | Tinggi       | Cloud, multi-klien       |

> **Tip:** Memilih transport yang tepat memengaruhi performa, skalabilitas, dan pengalaman pengguna. **Streamable HTTP** direkomendasikan untuk aplikasi modern, skalabel, dan siap cloud.

Perhatikan transport stdio dan SSE yang telah Anda lihat di bab sebelumnya dan bagaimana streamable HTTP adalah transport yang dibahas di bab ini.

## Streaming: Konsep dan Motivasi

Memahami konsep dan motivasi dasar di balik streaming sangat penting untuk mengimplementasikan sistem komunikasi real-time yang efektif.

**Streaming** adalah teknik dalam pemrograman jaringan yang memungkinkan data dikirim dan diterima dalam potongan kecil yang dapat dikelola atau sebagai rangkaian kejadian, bukan menunggu seluruh respons siap. Ini sangat berguna untuk:

- File atau dataset besar.
- Pembaruan real-time (misalnya, chat, batang kemajuan).
- Perhitungan lama yang Anda ingin memberi tahu pengguna secara berkala.

Berikut yang perlu Anda ketahui tentang streaming secara umum:

- Data dikirim secara bertahap, tidak sekaligus semua.
- Klien dapat memproses data saat tiba.
- Mengurangi persepsi latensi dan memperbaiki pengalaman pengguna.

### Mengapa menggunakan streaming?

Alasan menggunakan streaming adalah sebagai berikut:

- Pengguna mendapat umpan balik segera, bukan hanya di akhir
- Memungkinkan aplikasi real-time dan UI yang responsif
- Penggunaan sumber daya jaringan dan komputasi yang lebih efisien

### Contoh Sederhana: Server & Klien Streaming HTTP

Berikut contoh sederhana bagaimana streaming dapat diimplementasikan:

#### Python

**Server (Python, menggunakan FastAPI dan StreamingResponse):**

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

Contoh ini memperlihatkan server mengirim serangkaian pesan kepada klien saat pesan tersebut siap, daripada menunggu semua pesan selesai.

**Cara kerjanya:**

- Server mengirim setiap pesan saat sudah siap.
- Klien menerima dan mencetak setiap potongan saat tiba.

**Persyaratan:**

- Server harus menggunakan respons streaming (misalnya, `StreamingResponse` di FastAPI).
- Klien harus memproses respons sebagai stream (`stream=True` dalam requests).
- Content-Type biasanya `text/event-stream` atau `application/octet-stream`.

#### Java

**Server (Java, menggunakan Spring Boot dan Server-Sent Events):**

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

**Catatan Implementasi Java:**

- Menggunakan tumpukan reaktif Spring Boot dengan `Flux` untuk streaming
- `ServerSentEvent` menyediakan streaming event terstruktur dengan tipe event
- `WebClient` dengan `bodyToFlux()` memungkinkan konsumsi streaming reaktif
- `delayElements()` mensimulasikan waktu pemrosesan antar event
- Event dapat memiliki tipe (`info`, `result`) untuk penanganan klien yang lebih baik

### Perbandingan: Streaming Klasik vs Streaming MCP

Perbedaan cara streaming bekerja secara "klasik" dibanding streaming di MCP dapat digambarkan sebagai berikut:

| Fitur                  | Streaming HTTP Klasik          | Streaming MCP (Notifikasi)       |
|------------------------|-------------------------------|---------------------------------|
| Respons utama           | Terpotong                     | Tunggal, di akhir                |
| Pembaruan kemajuan     | Dikirim sebagai potongan data | Dikirim sebagai notifikasi       |
| Persyaratan klien      | Harus memproses stream        | Harus mengimplementasikan handler pesan |
| Kasus penggunaan       | File besar, aliran token AI   | Kemajuan, log, umpan balik real-time |

### Perbedaan Utama yang Terlihat

Berikut beberapa perbedaan utama:

- **Polanya Komunikasi:**
  - Streaming HTTP klasik: Menggunakan enkoding transfer terpotong sederhana untuk mengirim data secara potongan
  - Streaming MCP: Menggunakan sistem notifikasi terstruktur dengan protokol JSON-RPC

- **Format Pesan:**
  - HTTP klasik: Potongan teks polos dengan baris baru
  - MCP: Objek LoggingMessageNotification terstruktur dengan metadata

- **Implementasi Klien:**
  - HTTP klasik: Klien sederhana yang memproses respons streaming
  - MCP: Klien lebih canggih dengan handler pesan untuk memproses berbagai tipe pesan

- **Pembaruan Kemajuan:**
  - HTTP klasik: Kemajuan adalah bagian dari stream respons utama
  - MCP: Kemajuan dikirim lewat pesan notifikasi terpisah sementara respons utama datang di akhir

### Rekomendasi

Kami merekomendasikan beberapa hal ketika memilih antara menerapkan streaming klasik (seperti endpoint `/stream` yang kami tunjukkan di atas) versus streaming lewat MCP.

- **Untuk kebutuhan streaming sederhana:** Streaming HTTP klasik lebih mudah diterapkan dan cukup untuk kebutuhan streaming dasar.

- **Untuk aplikasi interaktif dan kompleks:** Streaming MCP memberikan pendekatan yang lebih terstruktur dengan metadata yang lebih kaya dan pemisahan antara notifikasi dan hasil akhir.

- **Untuk aplikasi AI:** Sistem notifikasi MCP sangat berguna untuk tugas AI yang berjalan lama di mana Anda ingin memberi tahu pengguna tentang kemajuan.

## Streaming di MCP

Baik, Anda sudah melihat beberapa rekomendasi dan perbandingan sejauh ini tentang perbedaan antara streaming klasik dan streaming di MCP. Mari kita bahas secara detail bagaimana Anda bisa memanfaatkan streaming di MCP.

Memahami bagaimana streaming bekerja dalam kerangka MCP sangat penting untuk membangun aplikasi responsif yang memberikan umpan balik real-time kepada pengguna selama operasi yang berjalan lama.

Dalam MCP, streaming bukan tentang mengirim respons utama secara potongan, melainkan mengirim **notifikasi** ke klien selagi alat memproses permintaan. Notifikasi ini bisa mencakup pembaruan kemajuan, log, atau event lainnya.

### Cara kerjanya

Hasil utama tetap dikirim sebagai satu respons tunggal. Namun, notifikasi dapat dikirim sebagai pesan terpisah selama pemrosesan dan dengan demikian memperbarui klien secara real-time. Klien harus dapat menangani dan menampilkan notifikasi ini.

## Apa itu Notifikasi?

Kami sebut "Notifikasi", apa maknanya dalam konteks MCP?

Notifikasi adalah pesan yang dikirim dari server ke klien untuk memberitahukan tentang kemajuan, status, atau event lain selama operasi berjalan lama. Notifikasi meningkatkan transparansi dan pengalaman pengguna.

Contohnya, klien seharusnya mengirim notifikasi setelah handshake awal dengan server berhasil dilakukan.

Sebuah notifikasi terlihat seperti ini sebagai pesan JSON:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikasi termasuk dalam topik MCP yang dinamakan ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

> **Pemberitahuan deprecasi:** kandidat rilis spesifikasi MCP `2026-07-28` menandai primitif Logging sebagai deprecated demi `stderr` untuk transport stdio dan OpenTelemetry untuk observabilitas terstruktur. Logging tetap berfungsi di `2025-11-25` dan setidaknya satu tahun setelah deprecasi resmi. Lihat [Perubahan dalam MCP: Kandidat Rilis 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Untuk mengaktifkan logging, server perlu mengaktifkannya sebagai fitur/kapabilitas seperti ini:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Tergantung SDK yang digunakan, logging mungkin sudah diaktifkan secara default, atau Anda perlu mengaktifkannya secara eksplisit di konfigurasi server.

Ada berbagai tipe notifikasi:

| Level     | Deskripsi                    | Contoh Kasus Penggunaan         |
|-----------|-----------------------------|--------------------------------|
| debug     | Informasi debugging detail  | Titik masuk/keluar fungsi      |
| info      | Pesan informasi umum        | Pembaruan kemajuan operasi     |
| notice    | Event normal tapi signifikan | Perubahan konfigurasi          |
| warning   | Kondisi peringatan          | Penggunaan fitur deprecated   |
| error     | Kondisi error               | Kegagalan operasi             |
| critical  | Kondisi kritis              | Kegagalan komponen sistem     |
| alert     | Tindakan harus segera diambil | Terdeteksi kerusakan data    |
| emergency | Sistem tidak dapat digunakan | Kegagalan sistem total        |

## Mengimplementasikan Notifikasi di MCP

Untuk mengimplementasikan notifikasi di MCP, Anda perlu menyiapkan sisi server dan klien untuk menangani pembaruan real-time. Ini memungkinkan aplikasi Anda memberi umpan balik segera kepada pengguna selama operasi berjalan lama.

### Sisi Server: Mengirim Notifikasi

Mulai dari sisi server. Di MCP, Anda mendefinisikan alat yang dapat mengirim notifikasi saat memproses permintaan. Server menggunakan objek konteks (biasanya `ctx`) untuk mengirim pesan ke klien.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Dalam contoh sebelumnya, alat `process_files` mengirim tiga notifikasi ke klien saat memproses setiap file. Metode `ctx.info()` digunakan untuk mengirim pesan informasi.

Selain itu, untuk mengaktifkan notifikasi, pastikan server Anda menggunakan transport streaming (seperti `streamable-http`) dan klien Anda mengimplementasikan handler pesan untuk memproses notifikasi. Berikut cara mengatur server menggunakan transport `streamable-http`:

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

Dalam contoh .NET ini, alat `ProcessFiles` dihias dengan atribut `Tool` dan mengirim tiga notifikasi ke klien saat memproses setiap file. Metode `ctx.Info()` digunakan untuk mengirim pesan informasi.

Untuk mengaktifkan notifikasi di server MCP .NET Anda, pastikan menggunakan transport streaming:

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Sisi Klien: Menerima Notifikasi

Klien harus mengimplementasikan handler pesan untuk memproses dan menampilkan notifikasi saat tiba.

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

Dalam kode tadi, fungsi `message_handler` memeriksa apakah pesan masuk adalah notifikasi. Jika iya, notifikasi dicetak; jika tidak, diproses sebagai pesan server biasa. Juga perhatikan bagaimana `ClientSession` diinisialisasi dengan `message_handler` untuk menangani notifikasi masuk.

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

Dalam contoh .NET ini, fungsi `MessageHandler` memeriksa apakah pesan masuk adalah notifikasi. Jika iya, notifikasi dicetak; jika tidak, diproses sebagai pesan server biasa. `ClientSession` diinisialisasi dengan handler pesan melalui `ClientSessionOptions`.

Untuk mengaktifkan notifikasi, pastikan server Anda menggunakan transport streaming (seperti `streamable-http`) dan klien Anda mengimplementasikan handler pesan untuk memproses notifikasi.

## Notifikasi Kemajuan & Skenario

Bagian ini menjelaskan konsep notifikasi kemajuan di MCP, mengapa penting, dan cara mengimplementasikannya menggunakan Streamable HTTP. Anda juga akan menemukan tugas praktis untuk memperkuat pemahaman Anda.

Notifikasi kemajuan adalah pesan real-time yang dikirim dari server ke klien selama operasi yang berjalan lama. Alih-alih menunggu keseluruhan proses selesai, server terus memberi tahu klien tentang status terkini. Ini meningkatkan transparansi, pengalaman pengguna, dan memudahkan debugging.

**Contoh:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Mengapa Menggunakan Notifikasi Kemajuan?

Notifikasi kemajuan penting karena beberapa alasan:

- **Pengalaman pengguna lebih baik:** Pengguna melihat pembaruan saat pekerjaan berjalan, bukan hanya di akhir.
- **Umpan balik real-time:** Klien dapat menampilkan batang kemajuan atau log, membuat aplikasi terasa responsif.
- **Debugging dan pemantauan lebih mudah:** Pengembang dan pengguna dapat melihat dimana proses berjalan lambat atau terhenti.

### Cara Mengimplementasikan Notifikasi Kemajuan

Berikut cara mengimplementasikan notifikasi kemajuan di MCP:

- **Di sisi server:** Gunakan `ctx.info()` atau `ctx.log()` untuk mengirim notifikasi saat setiap item diproses. Ini mengirim pesan ke klien sebelum hasil utama siap.
- **Di sisi klien:** Implementasikan handler pesan yang mendengarkan dan menampilkan notifikasi saat tiba. Handler ini membedakan antara notifikasi dan hasil akhir.

**Contoh Server:**


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

## Pertimbangan Keamanan

Saat mengimplementasikan server MCP dengan transportasi berbasis HTTP, keamanan menjadi perhatian utama yang memerlukan perhatian cermat terhadap berbagai vektor serangan dan mekanisme perlindungan.

### Gambaran Umum

Keamanan sangat penting saat mengekspos server MCP melalui HTTP. Streamable HTTP memperkenalkan permukaan serangan baru dan memerlukan konfigurasi yang teliti.

### Poin Kunci

- **Validasi Header Origin**: Selalu validasi header `Origin` untuk mencegah serangan DNS rebinding.
- **Pengikatan ke Localhost**: Untuk pengembangan lokal, ikat server ke `localhost` agar tidak terekspos ke internet publik.
- **Autentikasi**: Terapkan autentikasi (misalnya, kunci API, OAuth) untuk deployment produksi.
- **CORS**: Konfigurasikan kebijakan Cross-Origin Resource Sharing (CORS) untuk membatasi akses.
- **HTTPS**: Gunakan HTTPS pada produksi untuk mengenkripsi lalu lintas.

### Praktik Terbaik

- Jangan pernah mempercayai permintaan masuk tanpa validasi.
- Catat dan pantau semua akses dan kesalahan.
- Perbarui dependensi secara rutin untuk menambal kerentanan keamanan.

### Tantangan

- Menyeimbangkan keamanan dengan kemudahan pengembangan
- Memastikan kompatibilitas dengan berbagai lingkungan klien

## Upgrade dari SSE ke Streamable HTTP

Untuk aplikasi yang saat ini menggunakan Server-Sent Events (SSE), migrasi ke Streamable HTTP memberikan kemampuan yang lebih baik dan keberlanjutan jangka panjang yang lebih optimal untuk implementasi MCP Anda.

### Mengapa Melakukan Upgrade?

Ada dua alasan kuat untuk melakukan upgrade dari SSE ke Streamable HTTP:

- Streamable HTTP menawarkan skalabilitas yang lebih baik, kompatibilitas, dan dukungan notifikasi yang lebih kaya dibandingkan SSE.
- Ini merupakan transportasi yang direkomendasikan untuk aplikasi MCP baru.

### Langkah Migrasi

Berikut cara Anda dapat bermigrasi dari SSE ke Streamable HTTP dalam aplikasi MCP Anda:

- **Perbarui kode server** untuk menggunakan `transport="streamable-http"` dalam `mcp.run()`.
- **Perbarui kode klien** untuk menggunakan `streamablehttp_client` menggantikan klien SSE.
- **Implementasikan handler pesan** dalam klien untuk memproses notifikasi.
- **Uji kompatibilitas** dengan alat dan workflow yang sudah ada.

### Mempertahankan Kompatibilitas

Disarankan untuk mempertahankan kompatibilitas dengan klien SSE yang ada selama proses migrasi. Berikut beberapa strategi:

- Anda dapat mendukung baik SSE maupun Streamable HTTP dengan menjalankan keduanya di endpoint yang berbeda.
- Migrasi klien secara bertahap ke transportasi baru.

### Tantangan

Pastikan Anda mengatasi tantangan berikut selama migrasi:

- Memastikan semua klien diperbarui
- Menangani perbedaan dalam pengiriman notifikasi

## Pertimbangan Keamanan

Keamanan harus menjadi prioritas utama saat mengimplementasikan server apa pun, terutama saat menggunakan transportasi berbasis HTTP seperti Streamable HTTP dalam MCP.

Saat mengimplementasikan server MCP dengan transportasi berbasis HTTP, keamanan menjadi perhatian utama yang memerlukan perhatian cermat terhadap berbagai vektor serangan dan mekanisme perlindungan.

### Gambaran Umum

Keamanan sangat penting saat mengekspos server MCP melalui HTTP. Streamable HTTP memperkenalkan permukaan serangan baru dan memerlukan konfigurasi yang teliti.

Berikut beberapa pertimbangan keamanan utama:

- **Validasi Header Origin**: Selalu validasi header `Origin` untuk mencegah serangan DNS rebinding.
- **Pengikatan ke Localhost**: Untuk pengembangan lokal, ikat server ke `localhost` agar tidak terekspos ke internet publik.
- **Autentikasi**: Terapkan autentikasi (misalnya, kunci API, OAuth) untuk deployment produksi.
- **CORS**: Konfigurasikan kebijakan Cross-Origin Resource Sharing (CORS) untuk membatasi akses.
- **HTTPS**: Gunakan HTTPS pada produksi untuk mengenkripsi lalu lintas.

### Praktik Terbaik

Selain itu, berikut beberapa praktik terbaik yang perlu diikuti saat mengimplementasikan keamanan di server streaming MCP Anda:

- Jangan pernah mempercayai permintaan masuk tanpa validasi.
- Catat dan pantau semua akses dan kesalahan.
- Perbarui dependensi secara rutin untuk menambal kerentanan keamanan.

### Tantangan

Anda akan menghadapi beberapa tantangan saat mengimplementasikan keamanan di server streaming MCP:

- Menyeimbangkan keamanan dengan kemudahan pengembangan
- Memastikan kompatibilitas dengan berbagai lingkungan klien

### Tugas: Bangun Aplikasi Streaming MCP Anda Sendiri

**Skenario:**
Bangun server dan klien MCP di mana server memproses daftar item (misalnya, file atau dokumen) dan mengirim notifikasi untuk setiap item yang diproses. Klien harus menampilkan setiap notifikasi saat tiba.

**Langkah-langkah:**

1. Implementasikan alat server yang memproses daftar dan mengirim notifikasi untuk setiap item.
2. Implementasikan klien dengan handler pesan untuk menampilkan notifikasi secara waktu nyata.
3. Uji implementasi Anda dengan menjalankan server dan klien, lalu amati notifikasi.

[Solusi](./solution/README.md)

## Bacaan Lanjutan & Langkah Selanjutnya?

Untuk melanjutkan perjalanan Anda dengan streaming MCP dan memperluas pengetahuan, bagian ini menyediakan sumber daya tambahan dan langkah yang disarankan untuk membangun aplikasi yang lebih canggih.

### Bacaan Lanjutan

- [Microsoft: Pengenalan HTTP Streaming](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS di ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Permintaan Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Langkah Selanjutnya?

- Coba bangun alat MCP yang lebih canggih yang menggunakan streaming untuk analitik waktu nyata, chat, atau pengeditan kolaboratif.
- Jelajahi integrasi streaming MCP dengan framework frontend (React, Vue, dll.) untuk pembaruan UI langsung.
- Selanjutnya: [Memanfaatkan AI Toolkit untuk VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->