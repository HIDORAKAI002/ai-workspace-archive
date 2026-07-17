> [USANG: 2026-07-28 CALON SIARAN](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Pengambilan Sampel dalam Protokol Konteks Model

> **Pemberitahuan penggunaan usang:** calon siaran spesifikasi MCP `2026-07-28` menandakan Pengambilan Sampel sebagai usang bagi integrasi terus dengan API penyedia LLM. Pengambilan sampel masih berfungsi dalam `2025-11-25` dan sekurang-kurangnya selama setahun selepas mana-mana penggunaan usang rasmi, jadi segala yang terkandung dalam pelajaran ini kekal sah - tetapi reka bentuk pelayan baru harus menilai corak penggantian. Lihat [Apakah Perubahan dalam MCP: Calon Siaran 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Pengambilan sampel adalah ciri MCP yang hebat yang membolehkan pelayan meminta penyempurnaan LLM melalui klien, membolehkan tingkah laku agen yang sofistikated sambil mengekalkan keselamatan dan privasi. Konfigurasi pengambilan sampel yang betul boleh meningkatkan kualiti dan prestasi tindak balas dengan ketara. MCP menyediakan cara piawai untuk mengawal bagaimana model menjana teks dengan parameter khusus yang mempengaruhi kebetulan, kreativiti, dan koheren.

## Pengenalan

Dalam pelajaran ini, kita akan meneroka cara mengkonfigurasi parameter pengambilan sampel dalam permintaan MCP dan memahami mekanik protokol asas bagi pengambilan sampel.

## Objektif Pembelajaran

Menjelang akhir pelajaran ini, anda akan dapat:

- Memahami parameter pengambilan sampel utama yang tersedia dalam MCP.
- Mengkonfigurasi parameter pengambilan sampel untuk pelbagai kegunaan.
- Melaksanakan pengambilan sampel deterministik untuk hasil yang boleh dihasilkan semula.
- Melaraskan parameter pengambilan sampel secara dinamik berdasarkan konteks dan keutamaan pengguna.
- Mengaplikasikan strategi pengambilan sampel untuk meningkatkan prestasi model dalam pelbagai senario.
- Memahami bagaimana pengambilan sampel berfungsi dalam aliran klien-pelayan MCP.

## Cara Pengambilan Sampel Berfungsi dalam MCP

Aliran pengambilan sampel dalam MCP mengikuti langkah-langkah ini:

1. Pelayan menghantar permintaan `sampling/createMessage` kepada klien
2. Klien menyemak permintaan dan boleh mengubahnya
3. Klien mengambil sampel dari LLM
4. Klien menyemak penyempurnaan
5. Klien memulangkan hasil kepada pelayan

Reka bentuk manusia dalam gelung ini memastikan pengguna mengekalkan kawalan ke atas apa yang LLM lihat dan hasilkan.

## Ringkasan Parameter Pengambilan Sampel

MCP mentakrifkan parameter pengambilan sampel berikut yang boleh dikonfigurasi dalam permintaan klien:

| Parameter | Penerangan | Julat Lazim |
|-----------|-------------|---------------|
| `temperature` | Mengawal kebetulan dalam pemilihan token | 0.0 - 1.0 |
| `maxTokens` | Bilangan maksimum token untuk dijana | Nilai integer |
| `stopSequences` | Urutan khusus yang memberhentikan penjanaan apabila ditemui | Tatasusunan string |
| `metadata` | Parameter tambahan khusus penyedia | Objek JSON |

Banyak penyedia LLM menyokong parameter tambahan melalui medan `metadata`, yang mungkin termasuk:

| Parameter Sambungan Biasa | Penerangan | Julat Lazim |
|-----------|-------------|---------------|
| `top_p` | Pengambilan nukleus - hadkan token kepada kebarangkalian kumulatif tertinggi | 0.0 - 1.0 |
| `top_k` | Hadkan pemilihan token kepada pilihan K teratas | 1 - 100 |
| `presence_penalty` | Menghukum token berdasarkan kehadiran mereka dalam teks setakat ini | -2.0 - 2.0 |
| `frequency_penalty` | Menghukum token berdasarkan kekerapan mereka dalam teks setakat ini | -2.0 - 2.0 |
| `seed` | Benih rawak khusus untuk hasil yang boleh dihasilkan semula | Nilai integer |

## Contoh Format Permintaan

Berikut adalah contoh permintaan pengambilan sampel dari klien dalam MCP:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## Format Respons

Klien memulangkan hasil penyempurnaan:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## Kawalan Manusia dalam Gelung

Pengambilan sampel MCP direka dengan pengawasan manusia:

- **Untuk arahan**:
  - Klien harus menunjukkan kepada pengguna arahan yang dicadangkan
  - Pengguna harus dapat mengubah atau menolak arahan
  - Arahan sistem boleh ditapis atau diubah
  - Penyertaan konteks dikawal oleh klien

- **Untuk penyempurnaan**:
  - Klien harus menunjukkan kepada pengguna penyempurnaan yang dihasilkan
  - Pengguna harus dapat mengubah atau menolak penyempurnaan
  - Klien boleh menapis atau mengubah penyempurnaan
  - Pengguna mengawal model mana yang digunakan

Dengan prinsip ini, mari kita lihat bagaimana melaksanakan pengambilan sampel dalam pelbagai bahasa pengaturcaraan, menumpukan pada parameter yang biasa disokong di kalangan penyedia LLM.

## Pertimbangan Keselamatan

Apabila melaksanakan pengambilan sampel dalam MCP, pertimbangkan amalan terbaik keselamatan berikut:

- **Sahkan semua kandungan mesej** sebelum menghantarnya kepada klien
- **Bersihkan maklumat sensitif** daripada arahan dan penyempurnaan
- **Laksanakan had kadar** untuk mengelakkan penyalahgunaan
- **Pantau penggunaan pengambilan sampel** untuk pola luar biasa
- **Sulitkan data dalam transit** menggunakan protokol selamat
- **Urus privasi data pengguna** mengikut peraturan yang relevan
- **Audit permintaan pengambilan sampel** untuk pematuhan dan keselamatan
- **Kawal pendedahan kos** dengan had yang sesuai
- **Laksanakan had masa** untuk permintaan pengambilan sampel
- **Urus ralat model dengan baik** menggunakan pelindung yang sesuai

Parameter pengambilan sampel membenarkan penyelarasan tingkah laku model bahasa untuk mencapai keseimbangan yang diingini antara output deterministik dan kreatif.

Mari kita lihat cara mengkonfigurasi parameter ini dalam pelbagai bahasa pengaturcaraan.

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

Dalam kod sebelum ini kita telah:

- Mewujudkan klien MCP dengan URL pelayan tertentu.
- Mengkonfigurasi permintaan dengan parameter pengambilan sampel seperti `temperature`, `top_p`, dan `top_k`.
- Menghantar permintaan dan mencetak teks yang dijana.
- Menggunakan:
    - `allowedTools` untuk menentukan alat mana model boleh gunakan semasa penjanaan. Dalam kes ini, kami membenarkan alat `ideaGenerator` dan `marketAnalyzer` untuk membantu menjana idea aplikasi kreatif.
    - `frequencyPenalty` dan `presencePenalty` untuk mengawal pengulangan dan kepelbagaian dalam output.
    - `temperature` untuk mengawal kebetulan output, di mana nilai yang lebih tinggi menghasilkan tindak balas yang lebih kreatif.
    - `top_p` untuk mengehadkan pemilihan token kepada mereka yang menyumbang kepada jisim kebarangkalian kumulatif tertinggi, meningkatkan kualiti teks yang dijana.
    - `top_k` untuk menghadkan model kepada token paling berkemungkinan dalam K teratas, yang boleh membantu menjana tindak balas yang lebih koheren.
    - `frequencyPenalty` dan `presencePenalty` untuk mengurangkan pengulangan dan menggalakkan kepelbagaian dalam teks yang dijana.

# [JavaScript](#tab/javascript)

```javascript
// Contoh JavaScript: Konfigurasi pensampelan Suhu dan Top-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Mulakan klien MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Konfigurasikan permintaan dengan parameter pensampelan yang berbeza
  const creativeSampling = {
    temperature: 0.9,    // Suhu yang lebih tinggi = lebih rawak/kreativiti
    topP: 0.92,          // Pertimbangkan token dengan jisim kebarangkalian top 92%
    frequencyPenalty: 0.6, // Kurangkan pengulangan siri token
    presencePenalty: 0.4   // Penalti token yang telah muncul dalam teks setakat ini
  };
  
  const factualSampling = {
    temperature: 0.2,    // Suhu lebih rendah = lebih deterministik/faktual
    topP: 0.85,          // Pemilihan token yang sedikit lebih fokus
    frequencyPenalty: 0.2, // Penalti pengulangan minimum
    presencePenalty: 0.1   // Penalti kehadiran minimum
  };
  
  try {
    // Hantar dua permintaan dengan konfigurasi pensampelan yang berbeza
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

Dalam kod sebelum ini kita telah:

- Memulakan klien MCP dengan URL pelayan dan kunci API.
- Mengkonfigurasi dua set parameter pengambilan sampel: satu untuk tugas kreatif dan satu lagi untuk tugas fakta.
- Menghantar permintaan dengan konfigurasi ini, membenarkan model menggunakan alat tertentu untuk setiap tugas.
- Mencetak tindak balas yang dijana untuk menunjukkan kesan parameter pengambilan sampel yang berbeza.
- Menggunakan `allowedTools` untuk menentukan alat yang model boleh gunakan semasa penjanaan. Dalam kes ini, kami membenarkan `ideaGenerator` dan `environmentalImpactTool` untuk tugas kreatif, dan `factChecker` dan `dataAnalysisTool` untuk tugas fakta.
- Menggunakan `temperature` untuk mengawal kebetulan output, di mana nilai yang lebih tinggi menghasilkan tindak balas yang lebih kreatif.
- Menggunakan `top_p` untuk mengehadkan pemilihan token kepada mereka yang menyumbang kepada jisim kebarangkalian kumulatif tertinggi, meningkatkan kualiti teks yang dijana.
- Menggunakan `frequencyPenalty` dan `presencePenalty` untuk mengurangkan pengulangan dan menggalakkan kepelbagaian dalam output.
- Menggunakan `top_k` untuk menghadkan model kepada token paling berkemungkinan dalam K teratas, yang boleh membantu menjana tindak balas yang lebih koheren.

---

## Pengambilan Sampel Deterministik

Untuk aplikasi yang memerlukan output konsisten, pengambilan sampel deterministik memastikan hasil yang boleh dihasilkan semula. Caranya adalah dengan menggunakan benih rawak yang tetap dan menetapkan suhu kepada sifar.

Mari lihat contoh pelaksanaan di bawah untuk menunjukkan pengambilan sampel deterministik dalam pelbagai bahasa pengaturcaraan.

# [Java](#tab/java)

```java
// Contoh Java: Respons deterministik dengan benih tetap
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Menggunakan benih tetap untuk hasil deterministik
        
        // Permintaan pertama dengan benih tetap
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Suhu sifar untuk determinisme maksimum
            .build();
            
        // Permintaan kedua dengan benih yang sama
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Laksanakan kedua-dua permintaan
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Respons harus sama kerana benih dan suhu=0 yang sama
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Dalam kod sebelum ini kita telah:

- Mewujudkan klien MCP dengan URL pelayan yang ditetapkan.
- Mengkonfigurasi dua permintaan dengan arahan yang sama, benih tetap, dan suhu sifar.
- Menghantar kedua-dua permintaan dan mencetak teks yang dijana.
- Menunjukkan bahawa tindak balas adalah sama kerana sifat deterministik konfigurasi pengambilan sampel (benih dan suhu yang sama).
- Menggunakan `setSeed` untuk menentukan benih rawak tetap, memastikan model menjana output yang sama untuk input yang sama setiap kali.
- Menetapkan `temperature` kepada sifar untuk memastikan determinisme maksimum, bermakna model akan sentiasa memilih token seterusnya yang paling berkemungkinan tanpa kebetulan.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Contoh JavaScript: Respons deterministik dengan kawalan benih
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Permintaan pertama dengan benih tetap
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Suhu sifar untuk ketentuan maksimum
    });
    
    // Permintaan kedua dengan benih dan suhu yang sama
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Permintaan ketiga dengan benih berbeza tetapi suhu yang sama
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

Dalam kod sebelum ini kita telah:

- Memulakan klien MCP dengan URL pelayan.
- Mengkonfigurasi dua permintaan dengan arahan yang sama, benih tetap, dan suhu sifar.
- Menghantar kedua-dua permintaan dan mencetak teks yang dijana.
- Menunjukkan bahawa tindak balas adalah sama kerana sifat deterministik konfigurasi pengambilan sampel (benih dan suhu yang sama).
- Menggunakan `seed` untuk menentukan benih rawak tetap, memastikan model menjana output yang sama untuk input yang sama setiap kali.
- Menetapkan `temperature` kepada sifar untuk memastikan determinisme maksimum, bermakna model akan sentiasa memilih token seterusnya yang paling berkemungkinan tanpa kebetulan.
- Menggunakan benih berbeza untuk permintaan ketiga untuk menunjukkan bahawa perubahan benih menghasilkan output berbeza, walaupun dengan arahan dan suhu yang sama.

---

## Konfigurasi Pengambilan Sampel Dinamik

Pengambilan sampel pintar menyesuaikan parameter berdasarkan konteks dan keperluan setiap permintaan. Ini bermakna melaraskan secara dinamik parameter seperti suhu, top_p, dan penalti berdasarkan jenis tugas, keutamaan pengguna, atau prestasi sejarah.

Mari lihat bagaimana melaksanakan pengambilan sampel dinamik dalam pelbagai bahasa pengaturcaraan.

# [Python](#tab/python)

```python
# Contoh Python: Pensampelan dinamik berdasarkan konteks permintaan
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Tetapkan pratetap pensampelan untuk jenis tugas yang berbeza
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Pilih pratetap asas
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Laraskan berdasarkan keutamaan pengguna jika disediakan
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Skala suhu berdasarkan keutamaan kreativiti (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Laraskan top_p berdasarkan variasi respons yang dikehendaki
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Cipta dan hantar permintaan dengan parameter pensampelan tersuai
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Pulangkan respons dengan metadata pensampelan untuk ketelusan
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Dalam kod sebelum ini kita telah:

- Mewujudkan kelas `DynamicSamplingService` yang mengurus pengambilan sampel adaptif.
- Mendefinisikan pratetap pengambilan sampel untuk jenis tugas berbeza (kreatif, fakta, kod, analitik).
- Memilih pratetap asas berdasarkan jenis tugas.
- Melaraskan parameter pengambilan sampel berdasarkan keutamaan pengguna, seperti tahap kreativiti dan kepelbagaian.
- Menghantar permintaan dengan parameter pengambilan sampel yang dikendalikan secara dinamik.
- Memulangkan teks yang dijana bersama dengan parameter pengambilan sampel dan jenis tugas untuk ketelusan.
- Menggunakan `temperature` untuk mengawal kebetulan output, di mana nilai yang lebih tinggi menghasilkan tindak balas yang lebih kreatif.
- Menggunakan `top_p` untuk mengehadkan pemilihan token kepada mereka yang menyumbang kepada jisim kebarangkalian kumulatif tertinggi, meningkatkan kualiti teks yang dijana.
- Menggunakan `frequency_penalty` untuk mengurangkan pengulangan dan menggalakkan kepelbagaian dalam output.
- Menggunakan `user_preferences` untuk membolehkan penyesuaian parameter pengambilan sampel berdasarkan tahap kreativiti dan kepelbagaian yang ditentukan pengguna.
- Menggunakan `task_type` untuk menentukan strategi pengambilan sampel yang sesuai untuk permintaan, membolehkan tindak balas yang lebih disesuaikan berdasarkan sifat tugas.
- Menggunakan kaedah `send_request` untuk menghantar arahan dengan parameter pengambilan sampel yang dikonfigurasi, memastikan model menjana teks mengikut keperluan yang ditetapkan.
- Menggunakan `generated_text` untuk mendapatkan respons model, yang kemudian dipulangkan bersama parameter pengambilan sampel dan jenis tugas untuk analisis atau paparan lanjut.
- Menggunakan fungsi `min` dan `max` untuk memastikan keutamaan pengguna dipasang dalam julat sah, mengelakkan konfigurasi pengambilan sampel yang tidak sah.

# [JavaScript Dinamik](#tab/javascript-dynamic)

```javascript
// Contoh JavaScript: Konfigurasi pensampelan dinamik berdasarkan konteks pengguna
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Tetapkan profil pensampelan asas
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Jejak prestasi sejarah
    this.performanceHistory = [];
  }
  
  // Mengesan jenis tugasan dari arahan
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Pengesanan heuristik mudah - boleh dipertingkatkan dengan klasifikasi ML
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // Lalai kepada perbualan jika tiada jenis jelas dikesan
    return 'conversational';
  }
  
  // Kira parameter pensampelan berdasarkan konteks dan keutamaan pengguna
  getSamplingParameters(prompt, context = {}) {
    // Mengesan jenis tugasan
    const taskType = this.detectTaskType(prompt, context);
    
    // Dapatkan profil asas
    let params = {...this.samplingProfiles[taskType]};
    
    // Laraskan berdasarkan keutamaan pengguna
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Skala dari 1-10 ke julat suhu yang sesuai
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Ketepatan lebih tinggi bermakna topP lebih rendah (pemilihan lebih fokus)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Konsistensi lebih tinggi bermakna penalti lebih rendah
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Terapkan pelarasan yang dipelajari dari sejarah prestasi
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Logik adaptif mudah - boleh dipertingkatkan dengan algoritma yang lebih canggih
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Hanya ambil kira sejarah terkini
    
    if (relevantHistory.length > 0) {
      // Kira purata skor prestasi
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Jika prestasi di bawah ambang, laraskan parameter
      if (avgScore < 0.7) {
        // Pelarasan sedikit ke arah nilai yang lebih selamat
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Rekod prestasi untuk pelarasan masa depan
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Penarafan 0-1 bagi kualiti respons
    });
    
    // Hadkan saiz sejarah
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Dapatkan parameter pensampelan yang dioptimumkan
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Hantar permintaan dengan parameter yang dioptimumkan
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Jika pengguna memberi maklum balas, rekod untuk pengoptimuman masa depan
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// Contoh penggunaan
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Tugasan kreatif dengan keutamaan pengguna tersuai
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Kreativiti tinggi (1-10)
          consistency: 3  // Konsistensi rendah (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Tugasan penjanaan kod
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Kreativiti rendah
          precision: 8,   // Ketepatan tinggi
          consistency: 9  // Konsistensi tinggi
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

Dalam kod sebelum ini kita telah:

- Mewujudkan kelas `AdaptiveSamplingManager` yang mengurus pengambilan sampel dinamik berdasarkan jenis tugas dan keutamaan pengguna.
- Mendefinisikan profil pengambilan sampel untuk jenis tugas berbeza (kreatif, fakta, kod, perbualan).
- Melaksanakan kaedah untuk mengesan jenis tugas dari arahan menggunakan heuristik mudah.
- Mengira parameter pengambilan sampel berdasarkan jenis tugas yang dikesan dan keutamaan pengguna.
- Mengaplikasi penyesuaian berdasarkan prestasi sejarah untuk mengoptimumkan parameter pengambilan sampel.
- Merekod prestasi untuk penyesuaian masa depan, membolehkan sistem belajar daripada interaksi lalu.
- Menghantar permintaan dengan parameter pengambilan sampel yang dikonfigurasi secara dinamik dan memulangkan teks yang dijana bersama parameter yang dikenakan dan jenis tugas yang dikesan.
- Menggunakan:
    - `userPreferences` untuk membolehkan penyesuaian parameter pengambilan sampel berdasarkan tahap kreativiti, ketepatan, dan konsistensi yang ditetapkan pengguna.
    - `detectTaskType` untuk menentukan sifat tugas berdasarkan arahan, membolehkan tindak balas yang lebih disesuaikan.
    - `recordPerformance` untuk merekod prestasi respon yang dijana, membolehkan sistem menyesuaikan dan memperbaiki dari masa ke masa.
    - `applyLearnedAdjustments` untuk mengubah parameter pengambilan sampel berdasarkan prestasi sejarah, meningkatkan keupayaan model untuk menghasilkan respon berkualiti tinggi.
    - `generateResponse` untuk merangkumi keseluruhan proses menghasilkan respon dengan pengambilan sampel adaptif, memudahkan panggilan dengan arahan dan konteks berbeza.
    - `allowedTools` untuk menentukan alat mana model boleh gunakan semasa penjanaan, membolehkan respon yang lebih peka konteks.
    - `feedbackScore` untuk membolehkan pengguna memberi maklum balas tentang kualiti respon yang dijana, yang boleh digunakan untuk menambah baik prestasi model dari masa ke masa.
    - `performanceHistory` untuk mengekalkan rekod interaksi lalu, membolehkan sistem belajar daripada kejayaan dan kegagalan sebelumnya.
    - `getSamplingParameters` untuk melaraskan parameter pengambilan sampel secara dinamik berdasarkan konteks permintaan, membolehkan tingkah laku model yang lebih fleksibel dan responsif.
    - `detectTaskType` untuk mengklasifikasikan tugas berdasarkan arahan, membolehkan sistem mengaplikasikan strategi pengambilan sampel yang sesuai untuk jenis permintaan berbeza.
    - `samplingProfiles` untuk mentakrifkan konfigurasi pengambilan sampel asas untuk jenis tugas berbeza, membolehkan penyesuaian pantas berdasarkan sifat permintaan.

---

## Apa seterusnya

- [5.7 Skala](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->