# 🎯 Azure OpenAI (Responses API) ile Planlama ve Tasarım Desenleri (.NET)

## 📋 Öğrenme Hedefleri

Bu not defteri, Azure OpenAI (Responses API) kullanarak .NET'te Microsoft Agent Framework ile akıllı ajanlar oluşturmak için kurumsal seviye planlama ve tasarım desenlerini gösterir. Karmaşık problemleri parçalara ayırabilen, çok adımlı çözümler planlayabilen ve .NET'in kurumsal özellikleriyle gelişmiş iş akışlarını yürütebilen ajanlar oluşturmayı öğreneceksiniz.

## ⚙️ Ön Koşullar & Kurulum

**Geliştirme Ortamı:**
- .NET 9.0 SDK veya üstü
- Visual Studio 2022 veya C# uzantılı VS Code
- Azure OpenAI kaynağı ve model dağıtımı içeren bir Azure aboneliği
- Azure CLI — `az login` ile giriş yapın

**Gerekli Bağımlılıklar:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Ortam Konfigürasyonu (.env dosyası):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Kodu Çalıştırma

Bu derste .NET Tek Dosya Uygulaması uygulanmıştır. Çalıştırmak için:

```bash
# Dosyayı çalıştırılabilir yap (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Uygulamayı çalıştır
./07-dotnet-agent-framework.cs
```

Ya da dotnet run komutunu kullanın:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Kod Uygulaması

Tam uygulama `07-dotnet-agent-framework.cs` dosyasında mevcuttur ve şunları gösterir:

- DotNetEnv ile ortam konfigürasyonunun yüklenmesi
- Azure OpenAI istemcisinin yapılandırılması ve `GetChatClient().AsAIAgent()` ile bir yapay zeka ajanı oluşturulması
- JSON serileştirme ile yapılandırılmış veri modellerinin tanımlanması (Plan ve TravelPlan)
- JSON şeması kullanarak yapılandırılmış çıktı üreten bir yapay zeka ajanı oluşturulması
- Tip-güvenli yanıtlarla planlama isteklerinin yürütülmesi

## Ana Kavramlar

### Tip-Güvenli Modellerle Yapılandırılmış Planlama

Ajan, planlama çıktılarının yapısını tanımlamak için C# sınıflarını kullanır:

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

### Yapılandırılmış Çıktılar için JSON Şeması

Ajan, TravelPlan şemasına uygun yanıtlar dönecek şekilde yapılandırılmıştır:

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

### Planlama Ajanı Talimatları

Ajan koordinatör olarak görev yapar ve uzman alt ajanlara görevleri devreder:

- FlightBooking: Uçuş rezervasyonları ve uçuş bilgisi sağlama
- HotelBooking: Otel rezervasyonları ve otel bilgisi sağlama
- CarRental: Araç kiralama ve araç kiralama bilgisi sağlama
- ActivitiesBooking: Aktivite rezervasyonları ve aktivite bilgisi sağlama
- DestinationInfo: Varış yerleri hakkında bilgi sağlama
- DefaultAgent: Genel istekleri işleme

## Beklenen Çıktı

Seyahat planlama isteği ile ajanı çalıştırdığınızda, istek analiz edilir ve uzman ajanlara uygun görev atamalarıyla yapılandırılmış, TravelPlan şemasına uygun JSON formatında bir plan oluşturulur.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->