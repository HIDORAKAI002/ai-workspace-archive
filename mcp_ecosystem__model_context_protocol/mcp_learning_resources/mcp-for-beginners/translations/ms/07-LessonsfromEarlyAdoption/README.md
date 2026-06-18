# 🌟 Pengajaran daripada Pengguna Awal

[![Lessons from MCP Early Adopters](../../../translated_images/ms/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Klik imej di atas untuk menonton video pengajaran ini)_

## 🎯 Apa Yang Dikupas Dalam Modul Ini

Modul ini meneroka bagaimana organisasi sebenar dan pembangun memanfaatkan Model Context Protocol (MCP) untuk menyelesaikan cabaran sebenar dan memacu inovasi. Melalui kajian kes terperinci, projek praktikal, dan contoh yang boleh digunakan, anda akan menemui bagaimana MCP membolehkan integrasi AI yang selamat dan berskala yang menghubungkan model bahasa, alat, dan data perusahaan.

### 📚 Lihat MCP Beraksi

Ingin melihat prinsip-prinsip ini diterapkan ke alat yang sedia digunakan di pengeluaran? Lihat [**10 Pelayan MCP Microsoft Yang Mengubah Produktiviti Pembangun**](microsoft-mcp-servers.md), yang memaparkan pelayan MCP Microsoft sebenar yang anda boleh gunakan hari ini.

## Gambaran Keseluruhan

Pengajaran ini menerangkan bagaimana pengguna awal menggunakan Model Context Protocol (MCP) untuk menyelesaikan cabaran dunia sebenar dan memacu inovasi merentasi pelbagai industri. Melalui kajian kes terperinci dan projek praktikal, anda akan melihat bagaimana MCP membolehkan integrasi AI yang distandardkan, selamat, dan berskala — menghubungkan model bahasa besar, alat, dan data perusahaan dalam rangka kerja yang bersatu. Anda akan memperoleh pengalaman praktikal dalam mereka bentuk dan membina penyelesaian berasaskan MCP, mempelajari corak pelaksanaan yang terbukti, dan menemui amalan terbaik untuk menggunakan MCP dalam persekitaran pengeluaran. Pengajaran ini juga menyorot tren terkini, hala tuju masa depan, dan sumber terbuka untuk membantu anda kekal di hadapan teknologi MCP dan ekosistemnya yang berkembang.

## Objektif Pembelajaran

- Menganalisis pelaksanaan MCP sebenar merentasi pelbagai industri
- Mereka dan membina aplikasi lengkap berasaskan MCP
- Meneroka tren baru dan hala tuju masa depan dalam teknologi MCP
- Mengaplikasikan amalan terbaik dalam senario pembangunan sebenar

## Pelaksanaan MCP Dunia Sebenar

### Kajian Kes 1: Automasi Sokongan Pelanggan Perusahaan

Sebuah syarikat multinasional melaksanakan penyelesaian berasaskan MCP untuk menstandardkan interaksi AI merentasi sistem sokongan pelanggan mereka. Ini membolehkan mereka:

- Mencipta antara muka bersatu untuk pelbagai penyedia LLM
- Menyelaraskan pengurusan arahan merentasi jabatan
- Melaksanakan kawalan keselamatan dan pematuhan yang kukuh
- Beralih mudah antara model AI berbeza mengikut keperluan tertentu

**Pelaksanaan Teknikal:**

```python
# Pelaksanaan pelayan MCP Python untuk sokongan pelanggan
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Konfigurasi log
logging.basicConfig(level=logging.INFO)

async def main():
    # Cipta konfigurasi pelayan
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Inisialisasi pelayan MCP
    server = create_server(config)
    
    # Daftarkan sumber pangkalan pengetahuan
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Daftarkan templat prompt
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Daftarkan alat sokongan
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Mulakan pelayan dengan pengangkutan HTTP
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Keputusan:** Pengurangan kos model sebanyak 30%, peningkatan konsistensi respons sebanyak 45%, dan pematuhan yang dipertingkatkan merentasi operasi global.

### Kajian Kes 2: Pembantu Diagnostik Kesihatan

Pembekal penjagaan kesihatan membangunkan infrastruktur MCP untuk mengintegrasikan pelbagai model AI perubatan khusus sambil memastikan data pesakit yang sensitif kekal dilindungi:

- Beralih lancar antara model perubatan pakar dan am
- Kawalan privasi ketat dan jejak audit
- Integrasi dengan sistem Rekod Kesihatan Elektronik (EHR) sedia ada
- Kejuruteraan arahan yang konsisten untuk terminologi perubatan

**Pelaksanaan Teknikal:**

```csharp
// C# MCP host application implementation in healthcare application
using Microsoft.Extensions.DependencyInjection;
using ModelContextProtocol.SDK.Client;
using ModelContextProtocol.SDK.Security;
using ModelContextProtocol.SDK.Resources;

public class DiagnosticAssistant
{
    private readonly MCPHostClient _mcpClient;
    private readonly PatientContext _patientContext;
    
    public DiagnosticAssistant(PatientContext patientContext)
    {
        _patientContext = patientContext;
        
        // Configure MCP client with healthcare-specific settings
        var clientOptions = new ClientOptions
        {
            Name = "Healthcare Diagnostic Assistant",
            Version = "1.0.0",
            Security = new SecurityOptions
            {
                Encryption = EncryptionLevel.Medical,
                AuditEnabled = true
            }
        };
        
        _mcpClient = new MCPHostClientBuilder()
            .WithOptions(clientOptions)
            .WithTransport(new HttpTransport("https://healthcare-mcp.example.org"))
            .WithAuthentication(new HIPAACompliantAuthProvider())
            .Build();
    }
    
    public async Task<DiagnosticSuggestion> GetDiagnosticAssistance(
        string symptoms, string patientHistory)
    {
        // Create request with appropriate resources and tool access
        var resourceRequest = new ResourceRequest
        {
            Name = "patient_records",
            Parameters = new Dictionary<string, object>
            {
                ["patientId"] = _patientContext.PatientId,
                ["requestingProvider"] = _patientContext.ProviderId
            }
        };
        
        // Request diagnostic assistance using appropriate prompt
        var response = await _mcpClient.SendPromptRequestAsync(
            promptName: "diagnostic_assistance",
            parameters: new Dictionary<string, object>
            {
                ["symptoms"] = symptoms,
                patientHistory = patientHistory,
                relevantGuidelines = _patientContext.GetRelevantGuidelines()
            });
            
        return DiagnosticSuggestion.FromMCPResponse(response);
    }
}
```
  
**Keputusan:** Cadangan diagnostik yang dipertingkatkan untuk doktor sambil mengekalkan pematuhan penuh HIPAA dan pengurangan signifikan dalam pertukaran konteks antara sistem.

### Kajian Kes 3: Analisis Risiko Perkhidmatan Kewangan

Institusi kewangan melaksanakan MCP untuk menstandardkan proses analisis risiko merentasi jabatan yang berbeza:

- Mencipta antara muka bersatu untuk risiko kredit, pengesanan penipuan, dan model risiko pelaburan
- Melaksanakan kawalan akses ketat dan versi model
- Memastikan kebolehlauditan semua cadangan AI
- Mengekalkan pemformatan data yang konsisten merentasi sistem berbeza

**Pelaksanaan Teknikal:**

```java
// Pelayan MCP Java untuk penilaian risiko kewangan
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Cipta pelayan MCP dengan ciri pematuhan kewangan
        MCPServer server = new MCPServerBuilder()
            .withModelProviders(
                new ModelProvider("risk-assessment-primary", new AzureOpenAIProvider()),
                new ModelProvider("risk-assessment-audit", new LocalLlamaProvider())
            )
            .withPromptTemplateDirectory("./compliance/templates")
            .withAccessControls(new SOCCompliantAccessControl())
            .withDataEncryption(EncryptionStandard.FINANCIAL_GRADE)
            .withVersionControl(true)
            .withAuditLogging(new DatabaseAuditLogger())
            .build();
            
        server.addRequestValidator(new FinancialDataValidator());
        server.addResponseFilter(new PII_RedactionFilter());
        
        server.start(9000);
        
        System.out.println("Financial Risk MCP Server running on port 9000");
    }
}
```
  
**Keputusan:** Pematuhan peraturan yang dipertingkatkan, kitaran penyebaran model 40% lebih cepat, dan konsistensi penilaian risiko yang lebih baik merentasi jabatan.

### Kajian Kes 4: Pelayan Playwright MCP Microsoft untuk Automasi Pelayar

Microsoft membangunkan [Pelayan Playwright MCP](https://github.com/microsoft/playwright-mcp) untuk membolehkan automasi pelayar yang selamat dan distandardkan melalui Model Context Protocol. Pelayan sedia guna ini membolehkan ejen AI dan LLM berinteraksi dengan pelayar web secara terkawal, boleh diaudit, dan boleh dikembangkan — membolehkan kes penggunaan seperti ujian web automatik, pengektrakan data, dan aliran kerja hujung-ke-hujung.

> **🎯 Alat Sedia Produksi**
> 
> Kajian kes ini memaparkan pelayan MCP sebenar yang anda boleh gunakan hari ini! Ketahui lebih lanjut tentang Pelayan MCP Playwright dan 9 pelayan MCP Microsoft lain yang siap digunakan dalam [**Panduan Pelayan MCP Microsoft**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Ciri Utama:**  
- Memaparkan keupayaan automasi pelayar (navigasi, mengisi borang, tangkapan skrin, dsb.) sebagai alat MCP  
- Melaksanakan kawalan akses ketat dan sandbox untuk menghalang tindakan tanpa kebenaran  
- Menyediakan log audit terperinci untuk semua interaksi pelayar  
- Menyokong integrasi dengan Azure OpenAI dan penyedia LLM lain untuk automasi dipacu ejen  
- Menggerakkan Agen Pengkodan GitHub Copilot dengan keupayaan pelayaran web

**Pelaksanaan Teknikal:**

```typescript
// TypeScript: Mendaftarkan alat automasi pelayar Playwright di dalam pelayan MCP
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Daftarkan alat untuk melayari URL dan menangkap tangkapan skrin
server.tools.register(
  new ToolDefinition({
    name: 'navigate_and_screenshot',
    description: 'Navigate to a URL and capture a screenshot',
    parameters: {
      url: { type: 'string', description: 'The URL to visit' }
    }
  }),
  async ({ url }) => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    return { screenshot };
  }
);

// Mulakan pelayan MCP
server.listen(8080);
```
  
**Keputusan:**

- Mengaktifkan automasi pelayar secara programatik yang selamat untuk ejen AI dan LLM  
- Mengurangkan usaha ujian manual dan memperbaiki liputan ujian untuk aplikasi web  
- Menyediakan rangka kerja yang boleh digunakan semula dan dikembangkan untuk integrasi alat berasaskan pelayar di persekitaran perusahaan  
- Menggerakkan kemampuan pelayaran web GitHub Copilot

**Rujukan:**  
- [Repositori GitHub Pelayan Playwright MCP](https://github.com/microsoft/playwright-mcp)  
- [Penyelesaian AI dan Automasi Microsoft](https://azure.microsoft.com/en-us/products/ai-services/)

### Kajian Kes 5: Azure MCP – Model Context Protocol Gred Perusahaan sebagai Perkhidmatan

Pelayan Azure MCP ([https://aka.ms/azmcp](https://aka.ms/azmcp)) adalah pelaksanaan MCP gred perusahaan yang diurus sepenuhnya oleh Microsoft, direka untuk menyediakan kemampuan pelayan MCP yang berskala, selamat, dan mematuhi piawaian sebagai perkhidmatan awan. Azure MCP membolehkan organisasi menyebar, mengurus, dan mengintegrasi pelayan MCP dengan perkhidmatan AI, data, dan keselamatan Azure dengan pantas, mengurangkan beban operasi dan mempercepatkan penerapan AI.

> **🎯 Alat Sedia Produksi**
> 
> Ini adalah pelayan MCP sebenar yang anda boleh gunakan hari ini! Ketahui lebih lanjut tentang Pelayan MCP Microsoft Foundry dalam [**Panduan Pelayan MCP Microsoft**](microsoft-mcp-servers.md).

- Hosting pelayan MCP yang diurus sepenuhnya dengan skala, pemantauan, dan keselamatan terbina dalam  
- Integrasi asli dengan Azure OpenAI, Azure AI Search, dan perkhidmatan Azure lain  
- Pengesahan dan kebenaran perusahaan melalui Microsoft Entra ID  
- Sokongan untuk alat tersuai, templat arahan, dan penyambung sumber  
- Pematuhan dengan keperluan keselamatan dan peraturan perusahaan

**Pelaksanaan Teknikal:**

```yaml
# Example: Azure MCP server deployment configuration (YAML)
apiVersion: mcp.microsoft.com/v1
kind: McpServer
metadata:
  name: enterprise-mcp-server
spec:
  modelProviders:
    - name: azure-openai
      type: AzureOpenAI
      endpoint: https://<your-openai-resource>.openai.azure.com/
      apiKeySecret: <your-azure-keyvault-secret>
  tools:
    - name: document_search
      type: AzureAISearch
      endpoint: https://<your-search-resource>.search.windows.net/
      apiKeySecret: <your-azure-keyvault-secret>
  authentication:
    type: EntraID
    tenantId: <your-tenant-id>
  monitoring:
    enabled: true
    logAnalyticsWorkspace: <your-log-analytics-id>
```
  
**Keputusan:**  
- Mengurangkan masa untuk mendapatkan nilai bagi projek AI perusahaan dengan menyediakan platform pelayan MCP yang siap guna dan mematuhi piawaian  
- Menyederhanakan integrasi LLM, alat, dan sumber data perusahaan  
- Meningkatkan keselamatan, keterlihatan, dan kecekapan operasi untuk beban kerja MCP  
- Memperbaiki kualiti kod dengan amalan terbaik SDK Azure dan corak pengesahan semasa

**Rujukan:**  
- [Dokumentasi Azure MCP](https://aka.ms/azmcp)  
- [Repositori GitHub Pelayan Azure MCP](https://github.com/Azure/azure-mcp)  
- [Perkhidmatan Azure AI](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Pusat MCP Microsoft](https://mcp.azure.com)

## Kajian Kes 6: NLWeb  
MCP (Model Context Protocol) adalah protokol baru untuk Chatbot dan pembantu AI berinteraksi dengan alat. Setiap instans NLWeb juga adalah pelayan MCP, yang menyokong satu kaedah teras, ask, yang digunakan untuk bertanya kepada laman web dalam bahasa semula jadi. Respons yang dikembalikan memanfaatkan schema.org, satu kosa kata yang banyak digunakan untuk menerangkan data web. Secara kasarnya, MCP adalah NLWeb seperti Http adalah kepada HTML. NLWeb menggabungkan protokol, format Schema.org, dan contoh kod untuk membantu laman dengan pantas mencipta titik akhir ini, memberi manfaat kepada manusia melalui antara muka perbualan dan mesin melalui interaksi ejen-ke-ejen semula jadi.

Terdapat dua komponen berbeza kepada NLWeb.

- Satu protokol, sangat mudah untuk bermula, untuk berinteraksi dengan laman dalam bahasa semula jadi dan format, menggunakan json dan schema.org untuk menjawab yang dikembalikan. Lihat dokumentasi API REST untuk maklumat lanjut.  
- Satu pelaksanaan mudah (1) yang menggunakan penandaan sedia ada, untuk laman yang boleh diwakili sebagai senarai item (produk, resepi, tarikan, ulasan, dsb.). Bersama dengan set widget antara muka pengguna, laman boleh menyediakan antara muka perbualan dengan kandungan mereka dengan mudah. Lihat dokumentasi tentang Life of a chat query untuk maklumat lanjut bagaimana ini berfungsi.

**Rujukan:**  
- [Dokumentasi Azure MCP](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Kajian Kes 7: Pelayan Microsoft Foundry MCP – Integrasi Ejen AI Perusahaan

Pelayan Microsoft Foundry MCP menunjukkan bagaimana MCP boleh digunakan untuk mengatur dan mengurus ejen AI dan aliran kerja dalam persekitaran perusahaan. Dengan mengintegrasi MCP dengan Microsoft Foundry, organisasi dapat menstandardkan interaksi ejen, memanfaatkan pengurusan aliran kerja Foundry, dan memastikan penyebaran yang selamat dan berskala.

> **🎯 Alat Sedia Produksi**
> 
> Ini adalah pelayan MCP sebenar yang anda boleh gunakan hari ini! Ketahui lebih lanjut tentang Pelayan MCP Microsoft Foundry dalam [**Panduan Pelayan MCP Microsoft**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Ciri Utama:**  
- Akses komprehensif ke ekosistem AI Azure, termasuk katalog model dan pengurusan penyebaran  
- Pengindeksan pengetahuan dengan Azure AI Search untuk aplikasi RAG  
- Alat penilaian bagi prestasi model AI dan jaminan kualiti  
- Integrasi dengan Katalog Microsoft Foundry dan Makmal untuk model penyelidikan terkini  
- Pengurusan ejen dan keupayaan penilaian untuk senario pengeluaran

**Keputusan:**  
- Prototip cepat dan pemantauan kukuh aliran kerja ejen AI  
- Integrasi lancar dengan perkhidmatan Azure AI untuk senario maju  
- Antara muka bersatu untuk membina, menyebar, dan memantau saluran ejen  
- Keselamatan, pematuhan, dan kecekapan operasi yang dipertingkatkan untuk perusahaan  
- Mempercepat penerapan AI sambil mengekalkan kawalan ke atas proses ejen yang kompleks

**Rujukan:**  
- [Repositori GitHub Pelayan Microsoft Foundry MCP](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Mengintegrasi Ejen Azure AI dengan MCP (Blog Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Kajian Kes 8: Foundry MCP Playground – Eksperimen dan Prototip

Foundry MCP Playground menawarkan persekitaran siap guna untuk bereksperimen dengan pelayan MCP dan integrasi Microsoft Foundry. Pembangun boleh dengan cepat membuat prototaip, menguji, dan menilai model AI serta aliran kerja ejen menggunakan sumber daripada Katalog dan Makmal Microsoft Foundry. Playground mempermudah persediaan, menyediakan projek contoh, dan menyokong pembangunan kolaboratif, memudahkan penerokaan amalan terbaik dan senario baru dengan overhead minimum. Ia sangat berguna untuk pasukan yang mahu mengesahkan idea, berkongsi eksperimen, dan mempercepat pembelajaran tanpa perlu infrastruktur kompleks. Dengan menurunkan halangan kemasukan, playground membantu memupuk inovasi dan sumbangan komuniti dalam ekosistem MCP dan Microsoft Foundry.

**Rujukan:**

- [Repositori GitHub Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Kajian Kes 9: Pelayan Microsoft Learn Docs MCP – Akses Dokumentasi Dipacu AI

Pelayan Microsoft Learn Docs MCP adalah perkhidmatan berasaskan awan yang menyediakan pembantu AI dengan akses masa nyata kepada dokumentasi rasmi Microsoft melalui Model Context Protocol. Pelayan sedia guna ini menghubungkan ke ekosistem Microsoft Learn yang komprehensif dan membolehkan carian semantik merentas semua sumber rasmi Microsoft.

> **🎯 Alat Sedia Produksi**
> 
> Ini adalah pelayan MCP sebenar yang anda boleh gunakan hari ini! Ketahui lebih lanjut tentang Pelayan Microsoft Learn Docs MCP dalam [**Panduan Pelayan MCP Microsoft**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Ciri Utama:**  
- Akses masa nyata kepada dokumentasi rasmi Microsoft, dokumentasi Azure, dan dokumentasi Microsoft 365  
- Keupayaan carian semantik maju yang memahami konteks dan niat  
- Sentiasa maklumat terkini apabila kandungan Microsoft Learn diterbitkan  
- Liputan komprehensif merentas Microsoft Learn, dokumentasi Azure dan sumber Microsoft 365  
- Mengembalikan sehingga 10 segment kandungan berkualiti tinggi dengan tajuk artikel dan URL

**Kenapa Ini Penting:**  
- Menyelesaikan masalah "pengetahuan AI ketinggalan zaman" untuk teknologi Microsoft  
- Memastikan pembantu AI mempunyai akses kepada ciri terkini .NET, C#, Azure, dan Microsoft 365  
- Menyediakan maklumat berautoriti dan rasmi untuk penjanaan kod yang tepat  
- Penting untuk pembangun yang bekerja dengan teknologi Microsoft yang berubah dengan cepat

**Keputusan:**  
- Ketepatan penjanaan kod AI untuk teknologi Microsoft meningkat dengan ketara  
- Masa mencari dokumentasi terkini dan amalan terbaik dikurangkan  
- Produktiviti pembangun dipertingkatkan dengan pengambilan dokumentasi peka konteks  
- Integrasi lancar dengan aliran kerja pembangunan tanpa keluar dari IDE

**Rujukan:**  
- [Repositori GitHub Pelayan Microsoft Learn Docs MCP](https://github.com/MicrosoftDocs/mcp)  
- [Dokumentasi Microsoft Learn](https://learn.microsoft.com/)

## Projek Praktikal

### Projek 1: Bina Pelayan MCP Pelbagai Penyedia

**Objektif:** Cipta pelayan MCP yang boleh menghala permintaan ke pelbagai penyedia model AI berdasarkan kriteria tertentu.

**Keperluan:**

- Menyokong sekurang-kurangnya tiga penyedia model berbeza (contoh: OpenAI, Anthropic, model tempatan)  
- Melaksanakan mekanisme penghalaan berdasarkan metadata permintaan  
- Mencipta sistem konfigurasi untuk mengurus kepercayaan penyedia  
- Tambahkan caching untuk mengoptimumkan prestasi dan kos  
- Bina papan pemuka ringkas untuk memantau penggunaan

**Langkah Pelaksanaan:**

1. Sediakan infrastruktur pelayan MCP asas  
2. Laksanakan penyesuai penyedia untuk setiap perkhidmatan model AI  
3. Cipta logik penghalaan berdasarkan atribut permintaan  
4. Tambah mekanisme caching untuk permintaan kerap  
5. Bangunkan papan pemuka pemantauan  
6. Uji dengan pelbagai pola permintaan

**Teknologi:** Pilih daripada Python (.NET/Java/Python mengikut pilihan anda), Redis untuk caching, dan rangka kerja web ringkas untuk papan pemuka.

### Projek 2: Sistem Pengurusan Arahan Perusahaan

**Objektif:** Bangunkan sistem berasaskan MCP untuk mengurus, versi, dan menyebar templat arahan merentasi organisasi.

**Keperluan:**
- Ciptakan repositori pusat untuk templat prompt
- Laksanakan pengurusan versi dan aliran kerja kelulusan
- Bangunkan keupayaan pengujian templat dengan input contoh
- Bangunkan kawalan capaian berasaskan peranan
- Ciptakan API untuk pengambilan dan penempatan templat

**Langkah Pelaksanaan:**

1. Reka bentuk skema pangkalan data untuk penyimpanan templat
2. Cipta API teras untuk operasi CRUD templat
3. Laksanakan sistem pengurusan versi
4. Bangunkan aliran kerja kelulusan
5. Bangunkan rangka kerja pengujian
6. Buat antara muka web mudah untuk pengurusan
7. Integrasi dengan pelayan MCP

**Teknologi:** Pilihan rangka kerja backend anda, pangkalan data SQL atau NoSQL, dan rangka kerja frontend untuk antara muka pengurusan.

### Projek 3: Platform Penjanaan Kandungan Berasaskan MCP

**Objektif:** Membangunkan platform penjanaan kandungan yang menggunakan MCP untuk memberikan hasil konsisten merentasi pelbagai jenis kandungan.

**Keperluan:**

- Sokong pelbagai format kandungan (artikel blog, media sosial, salinan pemasaran)
- Laksanakan penjanaan berasaskan templat dengan pilihan penyesuaian
- Cipta sistem semakan kandungan dan maklum balas
- Jejak metrik prestasi kandungan
- Sokong pengurusan versi dan iterasi kandungan

**Langkah Pelaksanaan:**

1. Sediakan infrastruktur klien MCP
2. Cipta templat untuk pelbagai jenis kandungan
3. Bangunkan saluran penjanaan kandungan
4. Laksanakan sistem semakan
5. Bangunkan sistem penjejakan metrik
6. Cipta antara muka pengguna untuk pengurusan templat dan penjanaan kandungan

**Teknologi:** Bahasa pengaturcaraan kegemaran anda, rangka kerja web, dan sistem pangkalan data.

## Arah Tujuan Masa Depan untuk Teknologi MCP

### Trend Baru

1. **MCP Multi-Modal**
   - Perluasan MCP untuk menstandardkan interaksi dengan model imej, audio, dan video
   - Pembangunan keupayaan penaakulan rentas-modal
   - Format prompt yang distandardkan untuk pelbagai modaliti

2. **Infrastruktur MCP Federasi**
   - Rangkaian MCP teragih yang dapat berkongsi sumber merentasi organisasi
   - Protokol yang distandardkan untuk perkongsian model yang selamat
   - Teknik pengiraan pelindung privasi

3. **Pasaran MCP**
   - Ekosistem untuk berkongsi dan memonetisasi templat dan plugin MCP
   - Proses jaminan kualiti dan pensijilan
   - Integrasi dengan pasaran model

4. **MCP untuk Pengkomputeran Edge**
   - Penyesuaian standard MCP untuk peranti edge dengan sumber terhad
   - Protokol dioptimumkan untuk persekitaran berjalur lebar rendah
   - Pelaksanaan MCP khusus untuk ekosistem IoT

5. **Rangka Kerja Peraturan**
   - Pembangunan pelanjutan MCP untuk pematuhan peraturan
   - Jejak audit dan antara muka keterjelasan yang distandardkan
   - Integrasi dengan rangka kerja tadbir urus AI yang sedang muncul

### Penyelesaian MCP dari Microsoft

Microsoft dan Azure telah membangunkan beberapa repositori sumber terbuka untuk membantu pembangun melaksanakan MCP dalam pelbagai senario:

#### Organisasi Microsoft

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Pelayan MCP Playwright untuk automasi dan pengujian pelayar
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - Pelaksanaan pelayan MCP OneDrive untuk pengujian tempatan dan sumbangan komuniti
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb adalah koleksi protokol terbuka dan alat sumber terbuka berkaitan. Fokus utamanya adalah mewujudkan lapisan asas untuk AI Web

#### Organisasi Azure-Samples

1. [mcp](https://github.com/Azure-Samples/mcp) - Pautan kepada sampel, alat, dan sumber untuk membina dan mengintegrasi pelayan MCP di Azure menggunakan pelbagai bahasa
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Rujukan pelayan MCP yang menunjukkan pengesahan dengan spesifikasi Model Context Protocol terkini
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Halaman utama untuk pelaksanaan Pelayan MCP Jauh dalam Azure Functions dengan pautan ke repos setiap bahasa
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Templat permulaan pantas untuk membina dan melaksanakan pelayan MCP Jauh tersuai menggunakan Azure Functions dengan Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Templat permulaan pantas untuk membina dan melaksanakan pelayan MCP Jauh tersuai menggunakan Azure Functions dengan .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Templat permulaan pantas untuk membina dan melaksanakan pelayan MCP Jauh tersuai menggunakan Azure Functions dengan TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Pengurusan API Azure sebagai AI Gateway ke pelayan MCP Jauh menggunakan Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - Eksperimen APIM ❤️ AI termasuk keupayaan MCP, integrasi dengan Azure OpenAI dan AI Foundry

Repositori ini menyediakan pelbagai pelaksanaan, templat, dan sumber untuk bekerja dengan Model Context Protocol menggunakan pelbagai bahasa pengaturcaraan dan perkhidmatan Azure. Mereka merangkumi pelbagai kes penggunaan dari pelaksanaan pelayan asas hingga pengesahan, penempatan awan, dan senario integrasi perusahaan.

#### Direktori Sumber MCP

[Direktori Sumber MCP](https://github.com/microsoft/mcp/tree/main/Resources) dalam repositori rasmi Microsoft MCP menyediakan koleksi sumber contoh, templat prompt, dan definisi alat yang dikurasi untuk digunakan dengan pelayan Model Context Protocol. Direktori ini direka untuk membantu pembangun memulakan dengan MCP dengan cepat dengan menawarkan blok bina semula guna dan contoh amalan terbaik untuk:

- **Templat Prompt:** Templat prompt siap guna untuk tugas dan senario AI biasa, yang boleh disesuaikan untuk pelaksanaan pelayan MCP anda sendiri.
- **Definisi Alat:** Skema alat contoh dan metadata untuk menstandardkan integrasi dan panggilan alat merentasi pelayan MCP berbeza.
- **Sampel Sumber:** Definisi sumber contoh untuk menyambung ke sumber data, API, dan perkhidmatan luaran dalam rangka kerja MCP.
- **Pelaksanaan Rujukan:** Sampel praktikal yang menunjukkan cara menyusun dan mengatur sumber, prompt, dan alat dalam projek MCP dunia sebenar.

Sumber ini mempercepat pembangunan, mempromosikan standardisasi, dan membantu memastikan amalan terbaik semasa membina dan menempatkan penyelesaian berasaskan MCP.

#### Direktori Sumber MCP

- [Sumber MCP (Prompt Sampel, Alat, dan Definisi Sumber)](https://github.com/microsoft/mcp/tree/main/Resources)

### Peluang Penyelidikan

- Teknik pengoptimuman prompt cekap dalam rangka kerja MCP
- Model keselamatan untuk penempatan MCP berbilang penyewa
- Penanda aras prestasi merentasi pelaksanaan MCP berbeza
- Kaedah pengesahan formal untuk pelayan MCP

## Kesimpulan

Protokol Konteks Model (MCP) sedang membentuk masa depan integrasi AI yang distandardkan, selamat, dan boleh berinteroperasi merentasi industri dengan pesat. Melalui kajian kes dan projek praktikal dalam pelajaran ini, anda telah melihat bagaimana penerima awal—termasuk Microsoft dan Azure—memanfaatkan MCP untuk menyelesaikan cabaran dunia sebenar, mempercepat penerimaan AI, dan memastikan pematuhan, keselamatan, dan kebolehskalaan. Pendekatan modular MCP membolehkan organisasi menghubungkan model bahasa besar, alat, dan data perusahaan dalam rangka kerja bersatu dan mudah diaudit. Semasa MCP terus berkembang, kekal terlibat dengan komuniti, meneroka sumber terbuka, dan mengamalkan amalan terbaik akan menjadi kunci untuk membina penyelesaian AI yang teguh dan bersedia masa depan.

## Sumber Tambahan

- [Repositori GitHub MCP Foundry](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Mengintegrasi Ejen Azure AI dengan MCP (Blog Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [Repositori MCP GitHub (Microsoft)](https://github.com/microsoft/mcp)
- [Direktori Sumber MCP (Prompt Sampel, Alat, dan Definisi Sumber)](https://github.com/microsoft/mcp/tree/main/Resources)
- [Komuniti & Dokumentasi MCP](https://modelcontextprotocol.io/introduction)
- [Spesifikasi MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Dokumentasi Azure MCP](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Amalan terbaik keselamatan
- [Repositori Playwright MCP Server GitHub](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Penyelesaian AI dan Automasi Microsoft](https://azure.microsoft.com/en-us/products/ai-services/)

## Latihan

1. Analisis salah satu kajian kes dan cadangkan pendekatan pelaksanaan alternatif.
2. Pilih salah satu idea projek dan cipta spesifikasi teknikal terperinci.
3. Kajian satu industri yang tidak diliputi dalam kajian kes dan garis besar bagaimana MCP boleh menangani cabaran khususnya.
4. Terokai salah satu arah masa depan dan cipta konsep pelanjutan MCP baru untuk menyokongnya.

## Apa Seterusnya

Terokai lebih lanjut: [Pelayan MCP Microsoft](./microsoft-mcp-servers.md)

Teruskan ke: [Modul 8: Amalan Terbaik](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->