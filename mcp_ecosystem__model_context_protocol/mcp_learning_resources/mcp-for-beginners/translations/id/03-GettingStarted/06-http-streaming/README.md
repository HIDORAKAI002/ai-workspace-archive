# Streaming HTTPS dengan Model Context Protocol (MCP)

Bab ini memberikan panduan komprehensif untuk mengimplementasikan streaming yang aman, dapat diskalakan, dan real-time dengan Model Context Protocol (MCP) menggunakan HTTPS. Bab ini mencakup motivasi untuk streaming, mekanisme transport yang tersedia, cara mengimplementasikan HTTP yang dapat distreaming di MCP, praktik terbaik keamanan, migrasi dari SSE, dan panduan praktis untuk membangun aplikasi MCP streaming Anda sendiri.

> **Melihat ke depan:** pelajaran ini menjelaskan Streamable HTTP di bawah **Spesifikasi MCP 2025-11-25**, di mana sesi dibuat saat `initialize` dan dipin dengan header `Mcp-Session-Id`. Kandidat rilis `2026-07-28` menghapus sambungan dan ID sesi sepenuhnya, menjadikan setiap permintaan berdiri sendiri dan dapat diarahkan ke instance server mana pun tanpa sesi lengket. Lihat [Apa yang Berubah di MCP: Kandidat Rilis 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) untuk detailnya.

## Mekanisme Transport dan Streaming di MCP

Bagian ini menjelaskan berbagai mekanisme transport yang tersedia di MCP dan perannya dalam memungkinkan kemampuan streaming untuk komunikasi real-time antara klien dan server.

### Apa itu Mekanisme Transport?

Mekanisme transport mendefinisikan bagaimana data dipertukarkan antara klien dan server. MCP mendukung beberapa jenis transport untuk menyesuaikan dengan berbagai lingkungan dan kebutuhan:

- **stdio**: Input/output standar, cocok untuk alat lokal dan berbasis CLI. Sederhana tetapi tidak cocok untuk web atau cloud.
- **SSE (Server-Sent Events)**: Memungkinkan server mengirim pembaruan real-time ke klien melalui HTTP. Baik untuk UI web, tetapi terbatas dalam skalabilitas dan fleksibilitas. Mulai dari Spesifikasi MCP 2025-06-18, transport SSE (Server-Sent Events) mandiri telah dihentikan dan digantikan oleh transport "Streamable HTTP".
- **Streamable HTTP**: Transport streaming berbasis HTTP modern, mendukung notifikasi dan skalabilitas lebih baik. Direkomendasikan untuk sebagian besar skenario produksi dan cloud.

### Tabel Perbandingan

Lihat tabel perbandingan di bawah ini untuk memahami perbedaan antara mekanisme transport ini:

| Transport         | Pembaruan Real-time | Streaming | Skalabilitas | Kasus Penggunaan         |
|-------------------|--------------------|-----------|--------------|-------------------------|
| stdio             | Tidak              | Tidak     | Rendah       | Alat CLI lokal          |
| SSE               | Ya                 | Ya        | Sedang       | Web, pembaruan real-time|
| Streamable HTTP   | Ya                 | Ya        | Tinggi       | Cloud, multi-klien      |

> **Tip:** Memilih transport yang tepat berdampak pada performa, skalabilitas, dan pengalaman pengguna. **Streamable HTTP** direkomendasikan untuk aplikasi modern, dapat diskalakan, dan siap cloud.

Perhatikan transport stdio dan SSE yang telah Anda lihat pada bab sebelumnya dan bagaimana Streamable HTTP adalah transport yang dibahas dalam bab ini.

## Streaming: Konsep dan Motivasi

Memahami konsep dasar dan motivasi di balik streaming penting untuk mengimplementasikan sistem komunikasi real-time yang efektif.

**Streaming** adalah teknik dalam pemrograman jaringan yang memungkinkan data dikirim dan diterima dalam potongan kecil yang dapat diatur atau sebagai urutan peristiwa, daripada menunggu seluruh respons siap. Ini sangat berguna untuk:

- File besar atau kumpulan data.
- Pembaruan real-time (misalnya, obrolan, bilah kemajuan).
- Perhitungan jangka panjang di mana Anda ingin terus memberi tahu pengguna.

Berikut hal-hal yang perlu Anda ketahui tentang streaming secara garis besar:

- Data dikirim secara bertahap, tidak sekaligus.
- Klien dapat memproses data saat tiba.
- Mengurangi latensi yang dirasakan dan meningkatkan pengalaman pengguna.

### Mengapa menggunakan streaming?

Alasan menggunakan streaming adalah sebagai berikut:

- Pengguna mendapatkan umpan balik segera, bukan hanya di akhir.
- Memungkinkan aplikasi real-time dan UI yang responsif.
- Penggunaan sumber daya jaringan dan komputasi yang lebih efisien.

### Contoh Sederhana: Server & Klien HTTP Streaming

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

Contoh ini menunjukkan sebuah server yang mengirim serangkaian pesan ke klien saat pesan tersebut tersedia, bukan menunggu semua pesan siap.

**Cara kerjanya:**

- Server menghasilkan setiap pesan saat siap.
- Klien menerima dan mencetak setiap potongan data saat tiba.

**Persyaratan:**

- Server harus menggunakan respons streaming (misalnya, `StreamingResponse` di FastAPI).
- Klien harus memproses respons sebagai stream (`stream=True` pada requests).
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

- Menggunakan stack reaktif Spring Boot dengan `Flux` untuk streaming
- `ServerSentEvent` menyediakan streaming event terstruktur dengan jenis event
- `WebClient` dengan `bodyToFlux()` memungkinkan konsumsi streaming reaktif
- `delayElements()` mensimulasikan waktu pemrosesan antar event
- Event dapat memiliki tipe (`info`, `result`) untuk penanganan klien yang lebih baik

### Perbandingan: Streaming Klasik vs Streaming MCP

Perbedaan bagaimana streaming bekerja secara "klasik" versus bagaimana ia bekerja di MCP dapat digambarkan sebagai berikut:

| Fitur                  | Streaming HTTP Klasik         | Streaming MCP (Notifikasi)        |
|------------------------|-------------------------------|-----------------------------------|
| Respons utama          | Chunked                       | Tunggal, di akhir                 |
| Pembaruan progres      | Dikirim sebagai potongan data | Dikirim sebagai notifikasi        |
| Persyaratan klien      | Harus memproses streaming     | Harus mengimplementasikan handler pesan |
| Kasus penggunaan       | File besar, aliran token AI   | Progres, log, umpan balik real-time |

### Perbedaan Kunci yang Diamati

Selain itu, berikut adalah beberapa perbedaan kunci:

- **Polanya Komunikasi:**
  - Streaming HTTP klasik: Menggunakan encoding transfer chunked sederhana untuk mengirim data dalam potongan
  - Streaming MCP: Menggunakan sistem notifikasi terstruktur dengan protokol JSON-RPC

- **Format Pesan:**
  - HTTP Klasik: Potongan teks polos dengan baris baru
  - MCP: Objek LoggingMessageNotification terstruktur dengan metadata

- **Implementasi Klien:**
  - HTTP Klasik: Klien sederhana yang memproses respons streaming
  - MCP: Klien yang lebih canggih dengan handler pesan untuk memproses berbagai jenis pesan

- **Pembaruan Progres:**
  - HTTP Klasik: Progres adalah bagian dari aliran respons utama
  - MCP: Progres dikirim melalui pesan notifikasi terpisah sementara respons utama datang di akhir

### Rekomendasi

Ada beberapa hal yang kami rekomendasikan saat memilih antara mengimplementasikan streaming klasik (seperti endpoint yang kami tunjukkan di atas menggunakan `/stream`) versus memilih streaming melalui MCP.

- **Untuk kebutuhan streaming sederhana:** Streaming HTTP klasik lebih mudah diimplementasikan dan cukup untuk kebutuhan streaming dasar.

- **Untuk aplikasi yang kompleks dan interaktif:** Streaming MCP menyediakan pendekatan yang lebih terstruktur dengan metadata yang lebih kaya serta pemisahan antara notifikasi dan hasil akhir.

- **Untuk aplikasi AI:** Sistem notifikasi MCP sangat berguna untuk tugas AI jangka panjang di mana Anda ingin terus memberi tahu pengguna tentang progres.

## Streaming dalam MCP

Baik, jadi Anda sudah melihat beberapa rekomendasi dan perbandingan sejauh ini tentang perbedaan antara streaming klasik dan streaming dalam MCP. Mari kita bahas secara detail bagaimana Anda dapat memanfaatkan streaming dalam MCP.

Memahami bagaimana streaming bekerja dalam kerangka MCP penting untuk membangun aplikasi responsif yang memberikan umpan balik real-time kepada pengguna selama operasi jangka panjang.

Dalam MCP, streaming bukan tentang mengirim respons utama dalam potongan, tetapi tentang mengirim **notifikasi** ke klien saat sebuah alat sedang memproses permintaan. Notifikasi ini dapat mencakup pembaruan progres, log, atau peristiwa lainnya.

### Cara kerjanya

Hasil utama masih dikirim sebagai respons tunggal. Namun, notifikasi dapat dikirim sebagai pesan terpisah selama pemrosesan dan dengan demikian memperbarui klien secara real time. Klien harus mampu menangani dan menampilkan notifikasi ini.

## Apa itu Notifikasi?

Kami menyebut "Notifikasi", apa artinya dalam konteks MCP?

Notifikasi adalah pesan yang dikirim dari server ke klien untuk memberi tahu tentang progres, status, atau peristiwa lain selama operasi jangka panjang. Notifikasi meningkatkan transparansi dan pengalaman pengguna.

Misalnya, klien diharapkan mengirim notifikasi setelah handshake awal dengan server dilakukan.

Sebuah notifikasi terlihat seperti pesan JSON berikut:

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Notifikasi termasuk dalam topik di MCP yang disebut ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Agar logging bekerja, server perlu mengaktifkannya sebagai fitur/kapabilitas seperti berikut:

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Tergantung pada SDK yang digunakan, logging mungkin sudah aktif secara default, atau Anda mungkin perlu mengaktifkannya secara eksplisit dalam konfigurasi server Anda.

Ada berbagai jenis notifikasi:

| Level     | Deskripsi                    | Contoh Kasus Penggunaan       |
|-----------|------------------------------|------------------------------|
| debug     | Informasi debugging rinci    | Titik masuk/keluar fungsi     |
| info      | Pesan informasi umum         | Pembaruan progres operasi     |
| notice    | Kejadian normal tapi penting | Perubahan konfigurasi         |
| warning   | Kondisi peringatan           | Penggunaan fitur usang        |
| error     | Kondisi kesalahan            | Kegagalan operasi             |
| critical  | Kondisi kritis               | Kegagalan komponen sistem     |
| alert     | Harus segera ditindaklanjuti | Deteksi kerusakan data        |
| emergency | Sistem tidak dapat digunakan | Kegagalan sistem total        |

## Mengimplementasikan Notifikasi di MCP

Untuk mengimplementasikan notifikasi di MCP, Anda perlu menyiapkan sisi server dan klien untuk menangani pembaruan real-time. Ini memungkinkan aplikasi Anda memberikan umpan balik segera kepada pengguna selama operasi jangka panjang.

### Sisi Server: Mengirim Notifikasi

Mari mulai dari sisi server. Di MCP, Anda mendefinisikan alat yang dapat mengirim notifikasi saat memproses permintaan. Server menggunakan objek konteks (biasanya `ctx`) untuk mengirim pesan ke klien.

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

Selain itu, untuk mengaktifkan notifikasi, pastikan server Anda menggunakan transport streaming (seperti `streamable-http`) dan klien Anda mengimplementasikan handler pesan untuk memproses notifikasi. Berikut cara mengatur server untuk menggunakan transport `streamable-http`:

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

Dalam contoh .NET ini, alat `ProcessFiles` dihiasi dengan atribut `Tool` dan mengirim tiga notifikasi ke klien saat memproses setiap file. Metode `ctx.Info()` digunakan untuk mengirim pesan informasi.

Untuk mengaktifkan notifikasi di server MCP .NET Anda, pastikan Anda menggunakan transport streaming:

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

Dalam kode sebelumnya, fungsi `message_handler` memeriksa apakah pesan masuk adalah notifikasi. Jika ya, ia mencetak notifikasi tersebut; jika tidak, ia memprosesnya sebagai pesan server biasa. Juga perhatikan bagaimana `ClientSession` diinisialisasi dengan `message_handler` untuk menangani notifikasi masuk.

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

Dalam contoh .NET ini, fungsi `MessageHandler` memeriksa apakah pesan masuk adalah notifikasi. Jika ya, ia mencetak notifikasi tersebut; jika tidak, ia memprosesnya sebagai pesan server biasa. `ClientSession` diinisialisasi dengan handler pesan melalui `ClientSessionOptions`.

Untuk mengaktifkan notifikasi, pastikan server Anda menggunakan transport streaming (seperti `streamable-http`) dan klien Anda mengimplementasikan handler pesan untuk memproses notifikasi.

## Notifikasi Progres & Skenario

Bagian ini menjelaskan konsep notifikasi progres di MCP, mengapa mereka penting, dan cara mengimplementasikannya menggunakan Streamable HTTP. Anda juga akan menemukan tugas praktis untuk memperkuat pemahaman Anda.

Notifikasi progres adalah pesan real-time yang dikirim dari server ke klien selama operasi jangka panjang. Alih-alih menunggu seluruh proses selesai, server terus memperbarui klien tentang status saat ini. Ini meningkatkan transparansi, pengalaman pengguna, dan mempermudah debugging.

**Contoh:**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Mengapa Menggunakan Notifikasi Progres?

Notifikasi progres penting karena beberapa alasan:

- **Pengalaman pengguna lebih baik:** Pengguna melihat pembaruan saat pekerjaan berlangsung, bukan hanya di akhir.
- **Umpan balik real-time:** Klien dapat menampilkan bilah progres atau log, membuat aplikasi terasa responsif.
- **Debugging dan monitoring lebih mudah:** Pengembang dan pengguna dapat melihat di mana proses mungkin lambat atau tersendat.

### Cara Mengimplementasikan Notifikasi Progres

Berikut cara mengimplementasikan notifikasi progres di MCP:

- **Di server:** Gunakan `ctx.info()` atau `ctx.log()` untuk mengirim notifikasi setiap kali sebuah item diproses. Ini mengirim pesan ke klien sebelum hasil utama siap.
- **Di klien:** Implementasikan handler pesan yang mendengarkan dan menampilkan notifikasi saat tiba. Handler ini membedakan antara notifikasi dan hasil akhir.

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

Saat mengimplementasikan server MCP dengan transport berbasis HTTP, keamanan menjadi perhatian utama yang membutuhkan perhatian cermat terhadap berbagai vektor serangan dan mekanisme perlindungan.

### Ikhtisar

Keamanan sangat penting ketika mengekspos server MCP melalui HTTP. Streamable HTTP memperkenalkan permukaan serangan baru dan membutuhkan konfigurasi yang hati-hati.

### Poin Kunci


- **Validasi Header Origin**: Selalu validasi header `Origin` untuk mencegah serangan DNS rebinding.
- **Binding Localhost**: Untuk pengembangan lokal, lakukan binding server ke `localhost` agar tidak terekspos ke internet publik.
- **Autentikasi**: Terapkan autentikasi (misalnya API key, OAuth) untuk deployment produksi.
- **CORS**: Konfigurasikan kebijakan Cross-Origin Resource Sharing (CORS) untuk membatasi akses.
- **HTTPS**: Gunakan HTTPS di produksi untuk mengenkripsi lalu lintas.

### Praktik Terbaik

- Jangan pernah percaya pada permintaan yang masuk tanpa validasi.
- Catat dan pantau semua akses dan kesalahan.
- Perbarui dependensi secara rutin untuk memperbaiki kerentanan keamanan.

### Tantangan

- Menyeimbangkan keamanan dengan kemudahan pengembangan
- Memastikan kompatibilitas dengan berbagai lingkungan klien

## Meningkatkan dari SSE ke Streamable HTTP

Untuk aplikasi yang saat ini menggunakan Server-Sent Events (SSE), migrasi ke Streamable HTTP memberikan kemampuan yang lebih baik dan keberlanjutan jangka panjang yang lebih baik untuk implementasi MCP Anda.

### Mengapa Meningkatkan?

Ada dua alasan kuat untuk meningkatkan dari SSE ke Streamable HTTP:

- Streamable HTTP menawarkan skalabilitas, kompatibilitas, dan dukungan notifikasi yang lebih kaya dibandingkan SSE.
- Ini adalah transport yang direkomendasikan untuk aplikasi MCP baru.

### Langkah Migrasi

Berikut cara Anda dapat bermigrasi dari SSE ke Streamable HTTP dalam aplikasi MCP Anda:

- **Perbarui kode server** untuk menggunakan `transport="streamable-http"` dalam `mcp.run()`.
- **Perbarui kode klien** untuk menggunakan `streamablehttp_client` sebagai pengganti klien SSE.
- **Implementasikan handler pesan** di klien untuk memproses notifikasi.
- **Uji kompatibilitas** dengan alat dan alur kerja yang sudah ada.

### Mempertahankan Kompatibilitas

Disarankan untuk mempertahankan kompatibilitas dengan klien SSE yang ada selama proses migrasi. Berikut beberapa strategi:

- Anda dapat mendukung kedua transport, SSE dan Streamable HTTP, dengan menjalankan keduanya di endpoint yang berbeda.
- Migrasi klien secara bertahap ke transport baru.

### Tantangan

Pastikan Anda mengatasi tantangan berikut selama migrasi:

- Memastikan semua klien diperbarui
- Menangani perbedaan dalam pengiriman notifikasi

## Pertimbangan Keamanan

Keamanan harus menjadi prioritas utama saat mengimplementasikan server apa pun, terutama saat menggunakan transport berbasis HTTP seperti Streamable HTTP di MCP.

Ketika mengimplementasikan server MCP dengan transport berbasis HTTP, keamanan menjadi perhatian utama yang memerlukan perhatian cermat terhadap berbagai vektor serangan dan mekanisme perlindungan.

### Ikhtisar

Keamanan adalah hal yang kritis saat mengekspos server MCP melalui HTTP. Streamable HTTP memperkenalkan permukaan serangan baru dan membutuhkan konfigurasi yang cermat.

Berikut beberapa pertimbangan keamanan penting:

- **Validasi Header Origin**: Selalu validasi header `Origin` untuk mencegah serangan DNS rebinding.
- **Binding Localhost**: Untuk pengembangan lokal, lakukan binding server ke `localhost` agar tidak terekspos ke internet publik.
- **Autentikasi**: Terapkan autentikasi (misalnya API key, OAuth) untuk deployment produksi.
- **CORS**: Konfigurasikan kebijakan Cross-Origin Resource Sharing (CORS) untuk membatasi akses.
- **HTTPS**: Gunakan HTTPS di produksi untuk mengenkripsi lalu lintas.

### Praktik Terbaik

Selain itu, berikut beberapa praktik terbaik yang harus diikuti saat mengimplementasikan keamanan di server streaming MCP Anda:

- Jangan pernah percaya pada permintaan yang masuk tanpa validasi.
- Catat dan pantau semua akses dan kesalahan.
- Perbarui dependensi secara rutin untuk memperbaiki kerentanan keamanan.

### Tantangan

Anda akan menghadapi beberapa tantangan saat mengimplementasikan keamanan di server streaming MCP:

- Menyeimbangkan keamanan dengan kemudahan pengembangan
- Memastikan kompatibilitas dengan berbagai lingkungan klien

### Tugas: Bangun Aplikasi Streaming MCP Anda Sendiri

**Skenario:**
Bangun server dan klien MCP di mana server memproses daftar item (misalnya file atau dokumen) dan mengirimkan notifikasi untuk setiap item yang diproses. Klien harus menampilkan setiap notifikasi saat tiba.

**Langkah-langkah:**

1. Implementasikan alat server yang memproses daftar dan mengirimkan notifikasi untuk setiap item.
2. Implementasikan klien dengan handler pesan untuk menampilkan notifikasi secara real-time.
3. Uji implementasi Anda dengan menjalankan server dan klien, dan amati notifikasi yang muncul.

[Solusi](./solution/README.md)

## Bacaan Lanjutan & Langkah Selanjutnya?

Untuk melanjutkan perjalanan Anda dengan streaming MCP dan memperluas pengetahuan Anda, bagian ini menyediakan sumber daya tambahan dan saran langkah berikutnya untuk membangun aplikasi yang lebih maju.

### Bacaan Lanjutan

- [Microsoft: Pengantar Streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft: Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft: CORS di ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests: Permintaan Streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Langkah Selanjutnya?

- Cobalah membangun alat MCP yang lebih maju yang menggunakan streaming untuk analitik real-time, obrolan, atau pengeditan kolaboratif.
- Jelajahi integrasi streaming MCP dengan framework frontend (React, Vue, dll.) untuk pembaruan UI secara live.
- Selanjutnya: [Memanfaatkan AI Toolkit untuk VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->