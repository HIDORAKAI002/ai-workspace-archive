# Konsep Teras MCP: Menguasai Protokol Konteks Model untuk Integrasi AI

[![Konsep Teras MCP](../../../translated_images/ms/02.8203e26c6fb5a797.webp)](https://youtu.be/earDzWGtE84)

_(Klik imej di atas untuk menonton video pelajaran ini)_

[Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) adalah rangka kerja standard yang berkuasa yang mengoptimumkan komunikasi antara Model Bahasa Besar (LLM) dan alat, aplikasi, serta sumber data luaran.  
Panduan ini akan membimbing anda melalui konsep teras MCP. Anda akan mempelajari tentang seni bina klien-pelayan, komponen penting, mekanisme komunikasi, dan amalan terbaik pelaksanaan.

- **Persetujuan Pengguna Eksplisit**: Semua akses data dan operasi memerlukan kelulusan pengguna yang jelas sebelum dilaksanakan. Pengguna mesti faham dengan jelas data apa yang akan diakses dan tindakan apa yang akan dilakukan, dengan kawalan terperinci ke atas kebenaran dan pengesahan.

- **Perlindungan Privasi Data**: Data pengguna hanya didedahkan dengan persetujuan eksplisit dan mesti dilindungi oleh kawalan akses yang kukuh sepanjang kitaran interaksi. Pelaksanaan mesti menghalang penghantaran data tanpa kebenaran dan mengekalkan sempadan privasi yang ketat.

- **Keselamatan Pelaksanaan Alat**: Setiap panggilan alat memerlukan persetujuan eksplisit pengguna dengan kefahaman jelas mengenai fungsi alat, parameter, dan kesan potensi. Sempadan keselamatan yang kuat mesti menghalang pelaksanaan alat yang tidak sengaja, tidak selamat, atau berniat jahat.

- **Keselamatan Lapisan Penghantaran**: Semua saluran komunikasi harus menggunakan penyulitan dan mekanisme pengesahan yang sesuai. Sambungan jauh hendaklah melaksanakan protokol penghantaran yang selamat dan pengurusan kelayakan yang betul.

#### Garis Panduan Pelaksanaan:

- **Pengurusan Kebenaran**: Melaksanakan sistem kebenaran berbutir halus yang membolehkan pengguna mengawal pelayan, alat, dan sumber yang boleh diakses  
- **Pengesahan & Pemberian Kebenaran**: Gunakan kaedah pengesahan selamat (OAuth, kunci API) dengan pengurusan token dan tarikh luput yang betul  
- **Pengesahan Input**: Sahkan semua parameter dan input data mengikut skema yang ditetapkan untuk mengelak serangan suntikan  
- **Log Audit**: Simpan log komprehensif semua operasi untuk pemantauan keselamatan dan pematuhan

## Gambaran Keseluruhan

Pelajaran ini meneroka seni bina asas dan komponen yang membentuk ekosistem Model Context Protocol (MCP). Anda akan mempelajari seni bina klien-pelayan, komponen utama, dan mekanisme komunikasi yang menggerakkan interaksi MCP.

## Objektif Pembelajaran Utama

Pada penghujung pelajaran ini, anda akan:

- Memahami seni bina klien-pelayan MCP.  
- Mengenal pasti peranan dan tanggungjawab Hos, Klien, dan Pelayan.  
- Menganalisis ciri teras yang menjadikan MCP lapisan integrasi yang fleksibel.  
- Mempelajari bagaimana aliran maklumat dalam ekosistem MCP.  
- Mendapatkan pandangan praktikal melalui contoh kod dalam .NET, Java, Python, dan JavaScript.

## Seni Bina MCP: Pandangan Mendalam

Ekosistem MCP dibina atas model klien-pelayan. Struktur modular ini membolehkan aplikasi AI berinteraksi dengan alat, pangkalan data, API, dan sumber kontekstual dengan cekap. Mari kita pecahkan seni bina ini kepada komponen terasnya.

Pada asasnya, MCP mengikuti seni bina klien-pelayan di mana aplikasi hos boleh menyambung ke pelbagai pelayan:

```mermaid
flowchart LR
    subgraph "Komputer Anda"
        Host["Hos dengan MCP (Visual Studio, VS Code, IDE, Alat)"]
        S1["Server MCP A"]
        S2["Server MCP B"]
        S3["Server MCP C"]
        Host <-->|"Protokol MCP"| S1
        Host <-->|"Protokol MCP"| S2
        Host <-->|"Protokol MCP"| S3
        S1 <--> D1[("Sumber Data Tempatan A")]
        S2 <--> D2[("Sumber Data Tempatan B")]
    end
    subgraph "Internet"
        S3 <-->|"API Web"| D3[("Perkhidmatan Jauh")]
    end
```
- **Hos MCP**: Program seperti VSCode, Claude Desktop, IDE, atau alat AI yang ingin mengakses data melalui MCP  
- **Klien MCP**: Klien protokol yang mengekalkan sambungan 1:1 dengan pelayan  
- **Pelayan MCP**: Program ringan yang masing-masing mendedahkan keupayaan tertentu melalui Model Context Protocol yang standard  
- **Sumber Data Tempatan**: Fail, pangkalan data, dan perkhidmatan komputer anda yang boleh diakses dengan selamat oleh pelayan MCP  
- **Perkhidmatan Jauh**: Sistem luaran yang tersedia melalui internet yang boleh disambung oleh pelayan MCP melalui API.

Protokol MCP adalah piawaian yang sentiasa berkembang menggunakan versi berasaskan tarikh (format YYYY-MM-DD). Versi protokol semasa adalah **2025-11-25**. Anda boleh melihat kemas kini terkini pada [spesifikasi protokol](https://modelcontextprotocol.io/specification/2025-11-25/)

### 1. Hos

Dalam Model Context Protocol (MCP), **Hos** adalah aplikasi AI yang berfungsi sebagai antara muka utama yang membolehkan pengguna berinteraksi dengan protokol. Hos mengkoordinasi dan mengurus sambungan ke beberapa pelayan MCP dengan mencipta klien MCP khusus untuk setiap sambungan pelayan. Contoh Hos termasuk:

- **Aplikasi AI**: Claude Desktop, Visual Studio Code, Claude Code  
- **Persekitaran Pembangunan**: IDE dan penyunting kod dengan integrasi MCP  
- **Aplikasi Tersuai**: Ejen dan alat AI yang dibina khas

**Hos** adalah aplikasi yang mengkoordinasi interaksi model AI. Mereka:

- **Mengatur Model AI**: Melaksanakan atau berinteraksi dengan LLM untuk menghasilkan respons dan mengkoordinasi aliran kerja AI  
- **Mengurus Sambungan Klien**: Mencipta dan mengekalkan satu klien MCP bagi setiap sambungan pelayan MCP  
- **Mengawal Antara Muka Pengguna**: Mengendalikan aliran perbualan, interaksi pengguna, dan pembentangan respons  
- **Mematuhi Keselamatan**: Mengawal kebenaran, kekangan keselamatan, dan pengesahan  
- **Mengendalikan Persetujuan Pengguna**: Mengurus kelulusan pengguna untuk perkongsian data dan pelaksanaan alat  

### 2. Klien

**Klien** adalah komponen penting yang mengekalkan sambungan satu-ke-satu khusus antara Hos dan pelayan MCP. Setiap klien MCP dihasilkan oleh Hos untuk menyambung ke pelayan MCP tertentu, memastikan saluran komunikasi yang tersusun dan selamat. Pelbagai klien membolehkan Hos berhubung dengan beberapa pelayan serentak.

**Klien** adalah komponen penyambung dalam aplikasi hos. Mereka:

- **Komunikasi Protokol**: Menghantar permintaan JSON-RPC 2.0 kepada pelayan dengan isyarat dan arahan  
- **Rundingan Keupayaan**: Merundingkan ciri disokong dan versi protokol dengan pelayan semasa inisialisasi  
- **Pelaksanaan Alat**: Mengurus permintaan pelaksanaan alat dari model dan memproses respons  
- **Kemas Kini Masa Nyata**: Mengendalikan notifikasi dan kemas kini masa nyata dari pelayan  
- **Pemprosesan Respons**: Memproses dan memformat respons pelayan untuk paparan kepada pengguna

### 3. Pelayan

**Pelayan** adalah program yang menyediakan konteks, alat, dan keupayaan kepada klien MCP. Mereka boleh dijalankan secara tempatan (pada mesin yang sama dengan Hos) atau jauh (pada platform luaran), dan bertanggungjawab mengendalikan permintaan klien serta memberikan respons berstruktur. Pelayan mendedahkan fungsi tertentu melalui Model Context Protocol yang standard.

**Pelayan** adalah perkhidmatan yang menyediakan konteks dan keupayaan. Mereka:

- **Pendaftaran Ciri**: Mendaftar dan mendedahkan primitif yang tersedia (sumber, isyarat, alat) kepada klien  
- **Pemprosesan Permintaan**: Menerima dan melaksanakan panggilan alat, permintaan sumber, dan permintaan isyarat dari klien  
- **Penyediaan Konteks**: Menyediakan maklumat kontekstual dan data untuk meningkatkan respons model  
- **Pengurusan Keadaan**: Mengekalkan keadaan sesi dan mengendalikan interaksi berkeadaan apabila perlu  
- **Notifikasi Masa Nyata**: Menghantar notifikasi mengenai perubahan keupayaan dan kemas kini kepada klien yang disambungkan

Pelayan boleh dibangunkan oleh sesiapa sahaja untuk memperluas keupayaan model dengan fungsi khas, dan mereka menyokong kedua-dua senario pelaksanaan tempatan dan jauh.

### 4. Primitif Pelayan

Pelayan dalam Model Context Protocol (MCP) menyediakan tiga **primitif** teras yang mendefinisikan blok binaan asas untuk interaksi kaya antara klien, hos, dan model bahasa. Primitif ini menetapkan jenis maklumat kontekstual dan tindakan yang tersedia melalui protokol.

Pelayan MCP boleh mendedahkan kombinasi mana-mana tiga primitif teras berikut:

#### Sumber

**Sumber** adalah sumber data yang menyediakan maklumat kontekstual kepada aplikasi AI. Mereka mewakili kandungan statik atau dinamik yang boleh meningkatkan pemahaman model dan pembuatan keputusan:

- **Data Kontekstual**: Maklumat berstruktur dan konteks untuk penggunaan model AI  
- **Pangkalan Pengetahuan**: Repositori dokumen, artikel, manual, dan kertas kajian  
- **Sumber Data Tempatan**: Fail, pangkalan data, dan maklumat sistem tempatan  
- **Data Luaran**: Respons API, perkhidmatan web, dan data sistem jauh  
- **Kandungan Dinamik**: Data masa nyata yang dikemas kini berdasarkan keadaan luaran

Sumber dikenal pasti melalui URI dan menyokong penemuan melalui kaedah `resources/list` dan pengambilan melalui kaedah `resources/read`:

```text
file://documents/project-spec.md
database://production/users/schema
api://weather/current
```

#### Isyarat

**Isyarat** adalah templat boleh guna semula yang membantu menyusun interaksi dengan model bahasa. Mereka menyediakan corak interaksi standard dan aliran kerja berasaskan templat:

- **Interaksi Berasaskan Templat**: Mesej yang sudah distruktur dan pemula perbualan  
- **Templat Aliran Kerja**: Urutan standard untuk tugas dan interaksi biasa  
- **Contoh Few-shot**: Templat berasaskan contoh untuk arahan model  
- **Isyarat Sistem**: Isyarat asas yang mentakrifkan kelakuan dan konteks model  
- **Templat Dinamik**: Isyarat berparameter yang menyesuaikan dengan konteks tertentu

Isyarat menyokong penggantian pembolehubah dan boleh ditemui melalui `prompts/list` dan diambil melalui `prompts/get`:

```markdown
Generate a {{task_type}} for {{product}} targeting {{audience}} with the following requirements: {{requirements}}
```

#### Alat

**Alat** adalah fungsi boleh jalankan yang boleh dipanggil oleh model AI untuk melaksanakan tindakan tertentu. Mereka mewakili "kata kerja" dalam ekosistem MCP, membolehkan model berinteraksi dengan sistem luaran:

- **Fungsi Boleh Jalankan**: Operasi terpisah yang boleh dipanggil model dengan parameter tertentu  
- **Integrasi Sistem Luaran**: Panggilan API, kueri pangkalan data, operasi fail, pengiraan  
- **Identiti Unik**: Setiap alat mempunyai nama, penerangan, dan skema parameter yang tersendiri  
- **I/O Berstruktur**: Alat menerima parameter yang disahkan dan mengembalikan respons berstruktur dan bertipe  
- **Keupayaan Tindakan**: Membolehkan model melakukan tindakan dunia sebenar dan mendapatkan data langsung

Alat ditakrifkan dengan JSON Schema untuk pengesahan parameter dan ditemui melalui `tools/list` serta dilaksanakan melalui `tools/call`. Alat juga boleh menyertakan **ikon** sebagai metadata tambahan untuk penyampaian UI yang lebih baik.

**Anotasi Alat**: Alat menyokong anotasi tingkah laku (contohnya, `readOnlyHint`, `destructiveHint`) yang menerangkan sama ada alat itu hanya baca atau merosakkan, membantu klien membuat keputusan berinformasi mengenai pelaksanaan alat.

Contoh definisi alat:

```typescript
server.tool(
  "search_products", 
  {
    query: z.string().describe("Search query for products"),
    category: z.string().optional().describe("Product category filter"),
    max_results: z.number().default(10).describe("Maximum results to return")
  }, 
  async (params) => {
    // Laksanakan carian dan kembalikan keputusan yang berstruktur
    return await productService.search(params);
  }
);
```

## Primitif Klien

Dalam Model Context Protocol (MCP), **klien** boleh mendedahkan primitif yang membenarkan pelayan membuat permintaan keupayaan tambahan daripada aplikasi hos. Primitif sisi-klien ini membolehkan pelaksanaan pelayan yang lebih kaya dan interaktif yang boleh mengakses keupayaan model AI dan interaksi pengguna.

### Pensampelan

**Pensampelan** membenarkan pelayan membuat permintaan lengkapan model bahasa daripada aplikasi AI klien. Primitif ini membolehkan pelayan mengakses keupayaan LLM tanpa menyertakan kebergantungan model sendiri:

- **Akses Bebas Model**: Pelayan boleh meminta lengkapan tanpa memasukkan SDK LLM atau mengurus akses model  
- **AI Dimulakan Pelayan**: Membolehkan pelayan menjana kandungan secara autonomi menggunakan model AI klien  
- **Interaksi LLM Rekursif**: Menyokong senario kompleks di mana pelayan memerlukan bantuan AI untuk pemprosesan  
- **Penjanaan Kandungan Dinamik**: Membolehkan pelayan mencipta respons kontekstual menggunakan model hos  
- **Sokongan Panggilan Alat**: Pelayan boleh menyertakan parameter `tools` dan `toolChoice` untuk membolehkan model klien memanggil alat semasa pensampelan

Pensampelan dimulakan melalui kaedah `sampling/complete`, di mana pelayan menghantar permintaan lengkapan kepada klien.

### Akar

**Akar** menyediakan cara standard untuk klien mendedahkan sempadan sistem fail kepada pelayan, membantu pelayan memahami direktori dan fail mana yang mereka boleh akses:

- **Sempadan Sistem Fail**: Menetapkan sempadan di mana pelayan boleh beroperasi dalam sistem fail  
- **Kawalan Akses**: Membantu pelayan faham direktori dan fail mana yang mereka dibenarkan akses  
- **Kemas Kini Dinamik**: Klien boleh memberitahu pelayan apabila senarai akar berubah  
- **Pengenalan Berasaskan URI**: Akar menggunakan URI `file://` untuk mengenal pasti direktori dan fail yang boleh diakses

Akar ditemui melalui kaedah `roots/list`, dengan klien menghantar `notifications/roots/list_changed` apabila akar berubah.

### Permintaan Maklumat  

**Permintaan Maklumat** membolehkan pelayan meminta maklumat tambahan atau pengesahan daripada pengguna melalui antara muka klien:

- **Permintaan Input Pengguna**: Pelayan boleh meminta maklumat tambahan apabila diperlukan untuk pelaksanaan alat  
- **Dialog Pengesahan**: Meminta kelulusan pengguna untuk operasi sensitif atau berimpak tinggi  
- **Aliran Kerja Interaktif**: Membolehkan pelayan mencipta interaksi pengguna langkah demi langkah  
- **Pengumpulan Parameter Dinamik**: Mengumpul parameter yang hilang atau pilihan semasa pelaksanaan alat

Permintaan maklumat dibuat menggunakan kaedah `elicitation/request` untuk mengumpul input pengguna melalui antara muka klien.

**Mod URL Permintaan Maklumat**: Pelayan juga boleh meminta interaksi pengguna berasaskan URL, membolehkan pelayan mengarahkan pengguna ke laman web luaran untuk pengesahan, kelulusan, atau input data.

### Log

**Log** membolehkan pelayan menghantar mesej log berstruktur kepada klien untuk debugging, pemantauan, dan keterlihatan operasi:

- **Sokongan Debugging**: Membolehkan pelayan menyediakan log pelaksanaan terperinci untuk menyelesaikan masalah  
- **Pemantauan Operasi**: Menghantar kemas kini status dan metrik prestasi kepada klien  
- **Laporan Ralat**: Menyediakan konteks ralat terperinci dan maklumat diagnostik  
- **Jejak Audit**: Mencipta log komprehensif operasi dan keputusan pelayan

Mesej log dihantar kepada klien untuk memberikan ketelusan operasi pelayan dan memudahkan debugging.

## Aliran Maklumat dalam MCP

Model Context Protocol (MCP) menetapkan aliran maklumat berstruktur antara hos, klien, pelayan, dan model. Memahami aliran ini membantu menjelaskan bagaimana permintaan pengguna diproses dan bagaimana alat serta data luaran diintegrasikan ke dalam respons model.
- **Hos Memulakan Sambungan**  
  Aplikasi hos (seperti IDE atau antara muka sembang) mewujudkan sambungan ke pelayan MCP, biasanya melalui STDIO, WebSocket, atau pengangkutan yang disokong lain.

- **Perundingan Keupayaan**  
  Klien (terbenam dalam hos) dan pelayan bertukar maklumat mengenai ciri-ciri, alat, sumber, dan versi protokol yang disokong. Ini memastikan kedua-dua pihak memahami apa keupayaan yang tersedia untuk sesi tersebut.

- **Permintaan Pengguna**  
  Pengguna berinteraksi dengan hos (contohnya, memasukkan arahan atau perintah). Hos mengumpul input ini dan menyerahkannya kepada klien untuk diproses.

- **Penggunaan Sumber atau Alat**  
  - Klien mungkin meminta konteks tambahan atau sumber daripada pelayan (seperti fail, entri pangkalan data, atau artikel pangkalan pengetahuan) untuk memperkayakan pemahaman model.  
  - Jika model menentukan bahawa alat diperlukan (contohnya, untuk mendapatkan data, melakukan pengiraan, atau memanggil API), klien menghantar permintaan panggilan alat kepada pelayan, menyatakan nama alat dan parameter.

- **Pelaksanaan Pelayan**  
  Pelayan menerima permintaan sumber atau alat, melaksanakan operasi perlu (contohnya menjalankan fungsi, membuat pertanyaan pangkalan data, atau mengambil fail), dan mengembalikan hasil kepada klien dalam format berstruktur.

- **Penjanaan Respons**  
  Klien menggabungkan respons pelayan (data sumber, output alat, dll.) ke dalam interaksi model yang sedang berjalan. Model menggunakan maklumat ini untuk menjana respons yang komprehensif dan relevan secara kontekstual.

- **Pembentangan Hasil**  
  Hos menerima output akhir daripada klien dan membentangkannya kepada pengguna, biasanya termasuk teks yang dijana model dan sebarang hasil daripada pelaksanaan alat atau pencarian sumber.

Aliran ini membolehkan MCP menyokong aplikasi AI lanjutan, interaktif, dan peka konteks dengan menyambungkan model secara lancar dengan alat luaran dan sumber data.

## Seni Bina & Lapisan Protokol

MCP terdiri daripada dua lapisan seni bina berbeza yang bekerjasama untuk menyediakan rangka kerja komunikasi lengkap:

### Lapisan Data

**Lapisan Data** melaksanakan protokol teras MCP menggunakan **JSON-RPC 2.0** sebagai asasnya. Lapisan ini mentakrifkan struktur mesej, semantik, dan corak interaksi:

#### Komponen Teras:

- **Protokol JSON-RPC 2.0**: Semua komunikasi menggunakan format mesej JSON-RPC 2.0 piawai untuk panggilan kaedah, respons, dan notifikasi  
- **Pengurusan Kitaran Hayat**: Mengendalikan inisialisasi sambungan, perundingan keupayaan, dan penamatan sesi antara klien dan pelayan  
- **Primitif Pelayan**: Membolehkan pelayan menyediakan fungsi teras melalui alat, sumber, dan prompt  
- **Primitif Klien**: Membolehkan pelayan meminta pensampelan daripada LLM, mendapatkan input pengguna, dan menghantar log mesej  
- **Notifikasi Masa Nyata**: Menyokong notifikasi tak segerak untuk kemas kini dinamik tanpa perlu penyoalan berterusan

#### Ciri Utama:

- **Perundingan Versi Protokol**: Menggunakan penomboran versi berdasarkan tarikh (YYYY-MM-DD) untuk memastikan keserasian  
- **Penemuan Keupayaan**: Klien dan pelayan bertukar maklumat ciri yang disokong semasa inisialisasi  
- **Sesi Berstatus**: Mengekalkan status sambungan merentasi interaksi berkali-kali untuk kesinambungan konteks

### Lapisan Pengangkutan

**Lapisan Pengangkutan** menguruskan saluran komunikasi, pembingkaian mesej, dan pengesahan antara peserta MCP:

#### Mekanisme Pengangkutan Disokong:

1. **Pengangkutan STDIO**:  
   - Menggunakan aliran input/output standard untuk komunikasi proses terus  
   - Optimum bagi proses tempatan pada mesin yang sama tanpa beban rangkaian  
   - Biasa digunakan untuk pelaksanaan pelayan MCP tempatan

2. **Pengangkutan HTTP Boleh Alir**:  
   - Menggunakan HTTP POST untuk mesej klien-ke-pelayan  
   - Pilihan Server-Sent Events (SSE) untuk penstriman pelayan-ke-klien  
   - Membolehkan komunikasi pelayan jauh merentasi rangkaian  
   - Menyokong pengesahan HTTP standard (token bearer, kunci API, header tersuai)  
   - MCP mengesyorkan OAuth untuk pengesahan token yang selamat

#### Abstraksi Pengangkutan:

Lapisan pengangkutan memisahkan butiran komunikasi daripada lapisan data, membolehkan format mesej JSON-RPC 2.0 yang sama digunakan merentasi semua mekanisme pengangkutan. Abstraksi ini membenarkan aplikasi bertukar antara pelayan tempatan dan jauh dengan lancar.

### Pertimbangan Keselamatan

Pelaksanaan MCP mesti mematuhi beberapa prinsip keselamatan kritikal untuk memastikan interaksi selamat, boleh dipercayai, dan terjamin sepanjang operasi protokol:

- **Persetujuan dan Kawalan Pengguna**: Pengguna mesti memberikan persetujuan jelas sebelum data diakses atau operasi dilakukan. Mereka harus mempunyai kawalan yang jelas terhadap data yang dikongsi dan tindakan yang dibenarkan, disokong oleh antara muka pengguna yang intuitif untuk menyemak dan meluluskan aktiviti.

- **Privasi Data**: Data pengguna hanya boleh didedahkan dengan persetujuan eksplisit dan mesti dilindungi oleh kawalan akses yang sesuai. Pelaksanaan MCP mesti melindungi daripada penghantaran data tanpa kebenaran dan memastikan privasi dikekalkan sepanjang semua interaksi.

- **Keselamatan Alat**: Sebelum memanggil mana-mana alat, persetujuan jelas daripada pengguna diperlukan. Pengguna harus memahami fungsi setiap alat dengan jelas dan had keselamatan kukuh mesti dikuatkuasakan untuk mengelakkan pelaksanaan alat yang tidak diingini atau tidak selamat.

Dengan mematuhi prinsip keselamatan ini, MCP memastikan kepercayaan pengguna, privasi, dan keselamatan dipelihara sepanjang interaksi protokol sambil membolehkan integrasi AI yang kuat.

## Contoh Kod: Komponen Utama

Berikut adalah contoh kod dalam beberapa bahasa pengaturcaraan popular yang menggambarkan cara melaksanakan komponen pelayan MCP dan alat utama.

### Contoh .NET: Mencipta Pelayan MCP Ringkas dengan Alat

Berikut adalah contoh kod praktikal .NET yang menunjukkan cara melaksanakan pelayan MCP ringkas dengan alat tersuai. Contoh ini memaparkan cara mentakrif dan mendaftar alat, mengendalikan permintaan, dan menyambungkan pelayan menggunakan Model Context Protocol.

```csharp
using System;
using System.Threading.Tasks;
using ModelContextProtocol.Server;
using ModelContextProtocol.Server.Transport;
using ModelContextProtocol.Server.Tools;

public class WeatherServer
{
    public static async Task Main(string[] args)
    {
        // Create an MCP server
        var server = new McpServer(
            name: "Weather MCP Server",
            version: "1.0.0"
        );
        
        // Register our custom weather tool
        server.AddTool<string, WeatherData>("weatherTool", 
            description: "Gets current weather for a location",
            execute: async (location) => {
                // Call weather API (simplified)
                var weatherData = await GetWeatherDataAsync(location);
                return weatherData;
            });
        
        // Connect the server using stdio transport
        var transport = new StdioServerTransport();
        await server.ConnectAsync(transport);
        
        Console.WriteLine("Weather MCP Server started");
        
        // Keep the server running until process is terminated
        await Task.Delay(-1);
    }
    
    private static async Task<WeatherData> GetWeatherDataAsync(string location)
    {
        // This would normally call a weather API
        // Simplified for demonstration
        await Task.Delay(100); // Simulate API call
        return new WeatherData { 
            Temperature = 72.5,
            Conditions = "Sunny",
            Location = location
        };
    }
}

public class WeatherData
{
    public double Temperature { get; set; }
    public string Conditions { get; set; }
    public string Location { get; set; }
}
```

### Contoh Java: Komponen Pelayan MCP

Contoh ini menunjukkan pelayan MCP yang sama dan pendaftaran alat seperti contoh .NET di atas, tetapi dilaksanakan dalam Java.

```java
import io.modelcontextprotocol.server.McpServer;
import io.modelcontextprotocol.server.McpToolDefinition;
import io.modelcontextprotocol.server.transport.StdioServerTransport;
import io.modelcontextprotocol.server.tool.ToolExecutionContext;
import io.modelcontextprotocol.server.tool.ToolResponse;

public class WeatherMcpServer {
    public static void main(String[] args) throws Exception {
        // Cipta sebuah pelayan MCP
        McpServer server = McpServer.builder()
            .name("Weather MCP Server")
            .version("1.0.0")
            .build();
            
        // Daftarkan alat cuaca
        server.registerTool(McpToolDefinition.builder("weatherTool")
            .description("Gets current weather for a location")
            .parameter("location", String.class)
            .execute((ToolExecutionContext ctx) -> {
                String location = ctx.getParameter("location", String.class);
                
                // Dapatkan data cuaca (dipermudahkan)
                WeatherData data = getWeatherData(location);
                
                // Pulangkan respons dalam format
                return ToolResponse.content(
                    String.format("Temperature: %.1f°F, Conditions: %s, Location: %s", 
                    data.getTemperature(), 
                    data.getConditions(), 
                    data.getLocation())
                );
            })
            .build());
        
        // Sambungkan pelayan menggunakan pengangkutan stdio
        try (StdioServerTransport transport = new StdioServerTransport()) {
            server.connect(transport);
            System.out.println("Weather MCP Server started");
            // Kekalkan pelayan berjalan sehingga proses dihentikan
            Thread.currentThread().join();
        }
    }
    
    private static WeatherData getWeatherData(String location) {
        // Pelaksanaan akan memanggil API cuaca
        // Dipermudahkan untuk tujuan contoh
        return new WeatherData(72.5, "Sunny", location);
    }
}

class WeatherData {
    private double temperature;
    private String conditions;
    private String location;
    
    public WeatherData(double temperature, String conditions, String location) {
        this.temperature = temperature;
        this.conditions = conditions;
        this.location = location;
    }
    
    public double getTemperature() {
        return temperature;
    }
    
    public String getConditions() {
        return conditions;
    }
    
    public String getLocation() {
        return location;
    }
}
```

### Contoh Python: Membina Pelayan MCP

Contoh ini menggunakan fastmcp, sila pastikan anda memasangnya terlebih dahulu:

```python
pip install fastmcp
```
Kod Contoh:

```python
#!/usr/bin/env python3
import asyncio
from fastmcp import FastMCP
from fastmcp.transports.stdio import serve_stdio

# Cipta pelayan FastMCP
mcp = FastMCP(
    name="Weather MCP Server",
    version="1.0.0"
)

@mcp.tool()
def get_weather(location: str) -> dict:
    """Gets current weather for a location."""
    return {
        "temperature": 72.5,
        "conditions": "Sunny",
        "location": location
    }

# Pendekatan alternatif menggunakan kelas
class WeatherTools:
    @mcp.tool()
    def forecast(self, location: str, days: int = 1) -> dict:
        """Gets weather forecast for a location for the specified number of days."""
        return {
            "location": location,
            "forecast": [
                {"day": i+1, "temperature": 70 + i, "conditions": "Partly Cloudy"}
                for i in range(days)
            ]
        }

# Daftar alat kelas
weather_tools = WeatherTools()

# Mulakan pelayan
if __name__ == "__main__":
    asyncio.run(serve_stdio(mcp))
```

### Contoh JavaScript: Mencipta Pelayan MCP

Contoh ini menunjukkan penciptaan pelayan MCP dalam JavaScript dan cara mendaftar dua alat berkaitan cuaca.

```javascript
// Menggunakan SDK Protokol Konteks Model rasmi
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // Untuk pengesahan parameter

// Membuat pelayan MCP
const server = new McpServer({
  name: "Weather MCP Server",
  version: "1.0.0"
});

// Mentakrifkan alat cuaca
server.tool(
  "weatherTool",
  {
    location: z.string().describe("The location to get weather for")
  },
  async ({ location }) => {
    // Ini biasanya akan memanggil API cuaca
    // Dipermudahkan untuk demonstrasi
    const weatherData = await getWeatherData(location);
    
    return {
      content: [
        { 
          type: "text", 
          text: `Temperature: ${weatherData.temperature}°F, Conditions: ${weatherData.conditions}, Location: ${weatherData.location}` 
        }
      ]
    };
  }
);

// Mentakrifkan alat ramalan
server.tool(
  "forecastTool",
  {
    location: z.string(),
    days: z.number().default(3).describe("Number of days for forecast")
  },
  async ({ location, days }) => {
    // Ini biasanya akan memanggil API cuaca
    // Dipermudahkan untuk demonstrasi
    const forecast = await getForecastData(location, days);
    
    return {
      content: [
        { 
          type: "text", 
          text: `${days}-day forecast for ${location}: ${JSON.stringify(forecast)}` 
        }
      ]
    };
  }
);

// Fungsi pembantu
async function getWeatherData(location) {
  // Mensimulasikan panggilan API
  return {
    temperature: 72.5,
    conditions: "Sunny",
    location: location
  };
}

async function getForecastData(location, days) {
  // Mensimulasikan panggilan API
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    temperature: 70 + Math.floor(Math.random() * 10),
    conditions: i % 2 === 0 ? "Sunny" : "Partly Cloudy"
  }));
}

// Sambungkan pelayan menggunakan pengangkutan stdio
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);

console.log("Weather MCP Server started");
```

Contoh JavaScript ini menunjukkan cara mencipta pelayan MCP menggunakan SDK Model Context Protocol. Ia menunjukkan cara mendaftar dua alat bernama `weatherTool` dan `forecastTool` dan menjadikannya tersedia kepada klien MCP melalui `StdioServerTransport`.

## Keselamatan dan Kebenaran

MCP termasuk beberapa konsep dan mekanisme terbina dalam untuk mengurus keselamatan dan kebenaran sepanjang protokol:

1. **Kawalan Kebenaran Alat**:  
   Klien boleh menentukan alat mana yang dibenarkan model gunakan semasa sesi. Ini memastikan hanya alat yang jelas dibenarkan boleh diakses, mengurangkan risiko operasi tidak diingini atau tidak selamat. Kebenaran boleh dikonfigurasikan secara dinamik berdasarkan pilihan pengguna, polisi organisasi, atau konteks interaksi.

2. **Pengesahan**:  
   Pelayan boleh memerlukan pengesahan sebelum membenarkan akses ke alat, sumber, atau operasi sensitif. Ini mungkin melibatkan kunci API, token OAuth, atau skim pengesahan lain. Pengesahan yang betul memastikan hanya klien dan pengguna dipercayai dapat memanggil keupayaan sisi pelayan.

3. **Pengesahan Parameter**:  
   Pengesahan parameter dikuatkuasakan bagi semua panggilan alat. Setiap alat mentakrifkan jenis, format, dan kekangan parameter yang dijangka, dan pelayan mengesahkan permintaan masuk dengan sewajarnya. Ini menghalang input yang salah bentuk atau berniat jahat daripada sampai ke pelaksanaan alat dan membantu mengekalkan integriti operasi.

4. **Had Kadar**:  
   Untuk mengelakkan penyalahgunaan dan memastikan penggunaan adil sumber pelayan, pelayan MCP boleh melaksanakan had kadar untuk panggilan alat dan akses sumber. Had kadar boleh digunakan mengikut pengguna, sesi, atau secara global, dan membantu melindungi daripada serangan penafian perkhidmatan atau penggunaan sumber berlebihan.

Dengan menggabungkan mekanisme ini, MCP menyediakan asas selamat untuk mengintegrasi model bahasa dengan alat luaran dan sumber data, sambil memberi pengguna dan pembangun kawalan terperinci ke atas akses dan penggunaan.

## Mesej Protokol & Aliran Komunikasi

Komunikasi MCP menggunakan mesej berstruktur **JSON-RPC 2.0** untuk memudahkan interaksi jelas dan boleh dipercayai antara hos, klien, dan pelayan. Protokol mentakrif corak mesej khusus untuk pelbagai jenis operasi:

### Jenis Mesej Teras:

#### **Mesej Inisialisasi**
- **Permintaan `initialize`**: Menubuhkan sambungan dan merunding versi protokol serta keupayaan  
- **Respons `initialize`**: Mengesahkan ciri disokong dan maklumat pelayan  
- **`notifications/initialized`**: Menandakan inisialisasi lengkap dan sesi sedia

#### **Mesej Penemuan**
- **Permintaan `tools/list`**: Mencari alat yang tersedia daripada pelayan  
- **Permintaan `resources/list`**: Senaraikan sumber yang ada (sumber data)  
- **Permintaan `prompts/list`**: Dapatkan templat prompt yang tersedia

#### **Mesej Pelaksanaan**  
- **Permintaan `tools/call`**: Melaksanakan alat tertentu dengan parameter yang diberikan  
- **Permintaan `resources/read`**: Mengambil kandungan dari sumber tertentu  
- **Permintaan `prompts/get`**: Mendapatkan templat prompt dengan parameter pilihan

#### **Mesej Pihak Klien**
- **Permintaan `sampling/complete`**: Pelayan meminta penyempurnaan LLM daripada klien  
- **`elicitation/request`**: Pelayan meminta input pengguna melalui antara muka klien  
- **Mesej Log**: Pelayan menghantar mesej log berstruktur ke klien

#### **Mesej Notifikasi**
- **`notifications/tools/list_changed`**: Pelayan memaklumkan klien mengenai perubahan alat  
- **`notifications/resources/list_changed`**: Pelayan memaklumkan klien mengenai perubahan sumber  
- **`notifications/prompts/list_changed`**: Pelayan memaklumkan klien mengenai perubahan prompt

### Struktur Mesej:

Semua mesej MCP mengikuti format JSON-RPC 2.0 dengan:  
- **Mesej Permintaan**: Termasuk `id`, `method`, dan `params` pilihan  
- **Mesej Respons**: Termasuk `id` dan sama ada `result` atau `error`  
- **Mesej Notifikasi**: Termasuk `method` dan `params` pilihan (tiada `id` atau respons dijangka)

Komunikasi berstruktur ini memastikan interaksi yang boleh dipercayai, boleh dijejak, dan boleh dikembangkan menyokong senario lanjutan seperti kemas kini masa nyata, rantai alat, dan pengendalian ralat teguh.

### Tugas (Eksperimen)

**Tugas** adalah ciri eksperimen yang menyediakan pembungkus pelaksanaan tahan lama membolehkan pengambilan hasil tertunda dan penjejakan status untuk permintaan MCP:

- **Operasi Jangka Panjang**: Menjejaki pengiraan mahal, automasi aliran kerja, dan pemprosesan kumpulan  
- **Keputusan Tertunda**: Menyoal status tugas dan mengambil hasil apabila operasi selesai  
- **Penjejakan Status**: Memantau kemajuan tugas melalui keadaan kitaran hayat yang ditakrifkan  
- **Operasi Pelbagai Langkah**: Menyokong aliran kerja kompleks yang merangkumi beberapa interaksi

Tugas membungkus permintaan MCP standard untuk menyokong corak pelaksanaan tak segerak bagi operasi yang tidak dapat diselesaikan serta-merta.

## Ringkasan Utama

- **Seni Bina**: MCP menggunakan seni bina klien-pelayan di mana hos mengurus pelbagai sambungan klien ke pelayan  
- **Peserta**: Ekosistem merangkumi hos (aplikasi AI), klien (penghubung protokol), dan pelayan (penyedia keupayaan)  
- **Mekanisme Pengangkutan**: Komunikasi menyokong STDIO (tempatan) dan HTTP Boleh Alir dengan SSE pilihan (jarak jauh)  
- **Primitif Teras**: Pelayan mendedahkan alat (fungsi boleh jalankan), sumber (sumber data), dan prompt (templat)  
- **Primitif Klien**: Pelayan boleh meminta pensampelan (penyempurnaan LLM dengan sokongan panggilan alat), elicitation (input pengguna termasuk mod URL), roots (sematan sistem fail), dan log dari klien  
- **Ciri Eksperimen**: Tugas menyediakan pembungkus pelaksanaan tahan lama untuk operasi jangka panjang  
- **Asas Protokol**: Dibina atas JSON-RPC 2.0 dengan penomboran versi berasaskan tarikh (terkini: 2025-11-25)  
- **Keupayaan Masa Nyata**: Menyokong notifikasi untuk kemas kini dinamik dan penyelarasan masa nyata  
- **Keselamatan Pertama**: Persetujuan pengguna jelas, perlindungan privasi data, dan pengangkutan selamat adalah keperluan teras

## Latihan

Reka bentuk alat MCP ringkas yang berguna dalam domain anda. Takrifkan:  
1. Nama alat tersebut  
2. Parameter yang diterima  
3. Output yang dikembalikan  
4. Cara model menggunakan alat ini untuk menyelesaikan masalah pengguna


---

## Apa seterusnya

Seterusnya: [Bab 2: Keselamatan](../02-Security/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan manusia profesional adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->