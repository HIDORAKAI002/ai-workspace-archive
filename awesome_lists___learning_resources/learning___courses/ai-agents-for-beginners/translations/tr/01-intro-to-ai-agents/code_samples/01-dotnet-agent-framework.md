# 🌍 Microsoft Agent Framework ile AI Seyahat Acentesi (.NET)

## 📋 Senaryo Özeti

Bu örnek, Microsoft Agent Framework for .NET kullanarak nasıl zeki bir seyahat planlama acentesi oluşturulacağını göstermektedir. Acenta, dünyadaki rastgele destinasyonlar için otomatik olarak kişiselleştirilmiş günlük gezi planları oluşturabilir.

### Temel Yetenekler:

- 🎲 **Rastgele Destinasyon Seçimi**: Tatil yerlerini seçmek için özel bir araç kullanır
- 🗺️ **Zeki Seyahat Planlama**: Gün gün detaylı gezi planları oluşturur
- 🔄 **Gerçek Zamanlı Akış**: Hem anlık hem de akışlı yanıtları destekler
- 🛠️ **Özel Araç Entegrasyonu**: Acenta yeteneklerinin nasıl genişletileceğini gösterir

## 🔧 Teknik Mimari

### Temel Teknolojiler

- **Microsoft Agent Framework**: AI acente geliştirme için en son .NET uygulaması
- **Azure OpenAI (Yanıtlar API'si)**: Model çıkarımı için Azure OpenAI Yanıtlar API'si kullanılır
- **Azure Identity**: `AzureCliCredential` (`az login`) ile güvenli oturum açma
- **Güvenli Yapılandırma**: Ortama dayalı uç nokta yönetimi

### Ana Bileşenler

1. **AIAgent**: Konuşma akışını yöneten ana acente orkestratörü
2. **Özel Araçlar**: Acentanın kullanımına açık `GetRandomDestination()` fonksiyonu
3. **Yanıt İstemcisi**: Azure OpenAI Yanıtlar tabanlı konuşma arayüzü
4. **Akış Desteği**: Gerçek zamanlı yanıt oluşturma yetenekleri

### Entegrasyon Deseni

```mermaid
graph LR
    A[Kullanıcı Talebi] --> B[AI Ajanı]
    B --> C[Azure OpenAI (Yanıtlar API'si)]
    B --> D[RastgeleHedefAl Aracı]
    C --> E[Seyahat Programı]
    D --> E
```

## 🚀 Başlarken

### Ön Koşullar

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) veya üzeri
- Azure OpenAI kaynağı ve model dağıtımı olan bir [Azure aboneliği](https://azure.microsoft.com/free/)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` ile oturum açın

### Gerekli Ortam Değişkenleri

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# AzureCliCredential bir jeton alabilmesi için giriş yapın
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Daha sonra AzureCliCredential bir belirteç alabilmesi için oturum açın
az login
```

### Örnek Kod

Örnek kodu çalıştırmak için,

```bash
# zsh/bash
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

Ya da dotnet CLI kullanarak:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

Tam kod için [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) dosyasına bakın.

```csharp
#!/usr/bin/dotnet run

#:package Microsoft.Extensions.AI@10.4.1
#:package Microsoft.Agents.AI.OpenAI@1.1.0
#:package Azure.AI.OpenAI@2.1.0
#:package Azure.Identity@1.13.1

using System.ComponentModel;

using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

using Azure.AI.OpenAI;
using Azure.Identity;

// Tool Function: Random Destination Generator
// This static method will be available to the agent as a callable tool
// The [Description] attribute helps the AI understand when to use this function
// This demonstrates how to create custom tools for AI agents
[Description("Provides a random vacation destination.")]
static string GetRandomDestination()
{
    // List of popular vacation destinations around the world
    // The agent will randomly select from these options
    var destinations = new List<string>
    {
        "Paris, France",
        "Tokyo, Japan",
        "New York City, USA",
        "Sydney, Australia",
        "Rome, Italy",
        "Barcelona, Spain",
        "Cape Town, South Africa",
        "Rio de Janeiro, Brazil",
        "Bangkok, Thailand",
        "Vancouver, Canada"
    };

    // Generate random index and return selected destination
    // Uses System.Random for simple random selection
    var random = new Random();
    int index = random.Next(destinations.Count);
    return destinations[index];
}

// Azure OpenAI with the Responses API (stable v1 endpoint). Sign in with `az login`.
var azureEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deployment = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT") ?? "gpt-4.1-mini";

var azureClient = new AzureOpenAIClient(new Uri(azureEndpoint), new AzureCliCredential());

// Create AI Agent with Travel Planning Capabilities
// Get the Responses client for the specified deployment and create the AI agent
// Configure agent with travel planning instructions and random destination tool
// The agent can now plan trips using the GetRandomDestination function
AIAgent agent = azureClient
    .GetChatClient(deployment)
    .AsAIAgent(
        instructions: "You are a helpful AI Agent that can help plan vacations for customers at random destinations",
        tools: [AIFunctionFactory.Create(GetRandomDestination)]
    );

// Execute Agent: Plan a Day Trip
// Run the agent with streaming enabled for real-time response display
// Shows the agent's thinking and response as it generates the content
// Provides better user experience with immediate feedback
await foreach (var update in agent.RunStreamingAsync("Plan me a day trip"))
{
    await Task.Delay(10);
    Console.Write(update);
}
```

## 🎓 Temel Çıkarımlar

1. **Acenta Mimarisi**: Microsoft Agent Framework, .NET'te AI acenteleri oluşturmak için temiz ve tip güvenli bir yaklaşım sunar
2. **Araç Entegrasyonu**: `[Description]` özniteliği ile süslenmiş fonksiyonlar acente için kullanılabilir araçlar haline gelir
3. **Yapılandırma Yönetimi**: Ortam değişkenleri ve güvenli kimlik bilgisi yönetimi, .NET en iyi uygulamalarını takip eder
4. **Azure OpenAI Yanıtlar API**: Acenta, Azure.AI.OpenAI SDK aracılığıyla Azure OpenAI Yanıtlar API'sini kullanır

## 🔗 Ek Kaynaklar

- [Microsoft Agent Framework Belgeleri](https://learn.microsoft.com/agent-framework)
- [Microsoft Foundry'de Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Tek Dosya Uygulamaları](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->