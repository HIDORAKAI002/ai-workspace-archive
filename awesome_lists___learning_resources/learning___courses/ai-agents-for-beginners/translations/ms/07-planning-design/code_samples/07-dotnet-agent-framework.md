# 🎯 Corak Perancangan & Reka Bentuk dengan Azure OpenAI (Responses API) (.NET)

## 📋 Objektif Pembelajaran

Buku nota ini mempamerkan corak perancangan dan reka bentuk gred perusahaan untuk membina ejen pintar menggunakan Microsoft Agent Framework dalam .NET dengan Azure OpenAI (Responses API). Anda akan belajar bagaimana membuat ejen yang boleh mengurai masalah kompleks, merancang penyelesaian berbilang langkah, dan melaksanakan aliran kerja yang canggih dengan ciri perusahaan .NET.

## ⚙️ Keperluan & Persediaan

**Persekitaran Pembangunan:**
- SDK .NET 9.0 atau lebih tinggi
- Visual Studio 2022 atau VS Code dengan sambungan C#
- Langganan Azure dengan sumber Azure OpenAI dan penyebaran model
- Azure CLI — log masuk dengan `az login`

**Kebergantungan Diperlukan:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Konfigurasi Persekitaran (fail .env):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Menjalankan Kod

Pelajaran ini termasuk pelaksanaan Aplikasi Fail Tunggal .NET. Untuk menjalankannya:

```bash
# Jadikan fail boleh dijalankan (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Jalankan aplikasi
./07-dotnet-agent-framework.cs
```

Atau gunakan arahan dotnet run:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Pelaksanaan Kod

Pelaksanaan lengkap terdapat dalam `07-dotnet-agent-framework.cs`, yang menunjukkan:

- Memuat konfigurasi persekitaran dengan DotNetEnv
- Mengkonfigurasi klien Azure OpenAI dan mencipta ejen AI menggunakan `GetChatClient().AsAIAgent()`
- Mendefinisikan model data berstruktur (Plan dan TravelPlan) dengan penjerihan JSON
- Mencipta ejen AI dengan keluaran berstruktur menggunakan skema JSON
- Melaksanakan permintaan perancangan dengan respons yang selamat jenis

## Konsep Utama

### Perancangan Berstruktur dengan Model Selamat Jenis

Ejen menggunakan kelas C# untuk mentakrifkan struktur keluaran perancangan:

```csharp
public class Plan
{
    [JsonPropertyName("assigned_agent")]
    public string? Assigned_agent { get; set; }

    [JsonPropertyName("task_details")]
    public string? Task_details { get; set; }
}

public class TravelPlan
{
    [JsonPropertyName("main_task")]
    public string? Main_task { get; set; }

    [JsonPropertyName("subtasks")]
    public IList<Plan> Subtasks { get; set; }
}
```

### Skema JSON untuk Keluaran Berstruktur

Ejen dikonfigurasi untuk memulangkan respons yang mematuhi skema TravelPlan:

```csharp
ChatClientAgentOptions agentOptions = new()
{
    Name = AGENT_NAME,
    Description = AGENT_INSTRUCTIONS,
    ChatOptions = new()
    {
        ResponseFormat = ChatResponseFormatJson.ForJsonSchema(
            schema: AIJsonUtilities.CreateJsonSchema(typeof(TravelPlan)),
            schemaName: "TravelPlan",
            schemaDescription: "Travel Plan with main_task and subtasks")
    }
};
```

### Arahan Ejen Perancangan

Ejen bertindak sebagai penyelaras, mendelegasi tugas kepada sub-ejen khusus:

- TempahanPenerbangan: Untuk menempah penerbangan dan menyediakan maklumat penerbangan
- TempahanHotel: Untuk menempah hotel dan menyediakan maklumat hotel
- SewaKereta: Untuk menempah kereta dan menyediakan maklumat sewa kereta
- TempahanAktiviti: Untuk menempah aktiviti dan menyediakan maklumat aktiviti
- MaklumatDestinasi: Untuk menyediakan maklumat tentang destinasi
- EjenLalai: Untuk mengendalikan permintaan umum

## Keluaran Dijangka

Apabila anda menjalankan ejen dengan permintaan perancangan perjalanan, ia akan menganalisis permintaan dan menjana rancangan berstruktur dengan tugasan yang sesuai kepada ejen khusus, diformatkan sebagai JSON yang mematuhi skema TravelPlan.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->