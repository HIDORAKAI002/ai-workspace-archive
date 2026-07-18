# 🔍 Microsoft Agent Framework'ü Keşfetmek - Temel Ajan (.NET)

## 📋 Öğrenme Hedefleri

Bu örnek, Microsoft Agent Framework'un temel kavramlarını .NET üzerinde basit bir ajan uygulaması ile keşfeder. Temel ajan desenlerini öğrenecek ve C# ile .NET ekosistemini kullanarak zeki ajanların iç işleyişini anlayacaksınız.

### Neler Öğreneceksiniz

- 🏗️ **Ajan Mimarisi**: .NET'te AI ajanlarının temel yapısını anlamak  
- 🛠️ **Araç Entegrasyonu**: Ajanların yeteneklerini genişletmek için harici fonksiyonları nasıl kullandığı  
- 💬 **Konuşma Akışı**: Çok turlu konuşmaları ve bağlamı iş parçacığı yönetimi ile yönetmek  
- 🔧 **Konfigürasyon Desenleri**: .NET'te ajan kurulum ve yönetimi için en iyi uygulamalar  

## 🎯 Öne Çıkan Kavramlar

### Agentic Framework İlkeleri

- **Otonomi**: Ajanların .NET AI soyutlamalarıyla bağımsız kararlar alması  
- **Reaktivite**: Çevresel değişikliklere ve kullanıcı girdilerine tepki verme  
- **Proaktivite**: Hedefler ve bağlama dayalı inisiyatif alma  
- **Sosyal Yetkinlik**: Konuşma iş parçacıkları aracılığıyla doğal dil ile etkileşim  

### Teknik Bileşenler

- **AIAgent**: Temel ajan orkestrasyonu ve konuşma yönetimi (.NET)  
- **Araç Fonksiyonları**: C# metotları ve öznitelikleriyle ajan yeteneklerini genişletme  
- **Azure OpenAI Entegrasyonu**: Azure OpenAI Responses API üzerinden dil modellerinden faydalanma  
- **Güvenli Konfigürasyon**: Ortama bağlı uç nokta yönetimi  

## 🔧 Teknik Yığın

### Temel Teknolojiler

- Microsoft Agent Framework (.NET)  
- Azure OpenAI (Responses API) entegrasyonu  
- Azure.AI.OpenAI istemci desenleri  
- DotNetEnv ile ortama bağlı konfigürasyon  

### Ajan Yetenekleri

- Doğal dil anlama ve üretme  
- C# öznitelikleri ile fonksiyon çağrısı ve araç kullanımı  
- Konuşma oturumlarıyla bağlam farkındalıklı yanıtlar  
- Bağımlılık enjeksiyonu desenleriyle genişletilebilir mimari  

## 📚 Framework Karşılaştırması

Bu örnek, Microsoft Agent Framework yaklaşımını diğer ajan çerçeveleriyle karşılaştırır:

| Özellik | Microsoft Agent Framework | Diğer Frameworkler |
|---------|-------------------------|------------------|
| **Entegrasyon** | Yerel Microsoft ekosistemi | Farklı uyumluluklar |
| **Basitlik** | Temiz, sezgisel API | Genellikle karmaşık kurulum |
| **Genişletilebilirlik** | Kolay araç entegrasyonu | Framework’e bağlı |
| **Kurumsal Hazır** | Üretime uygun olarak tasarlanmıştır | Framework’e göre değişir |

## 🚀 Başlarken

### Önkoşullar

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) veya üstü  
- Azure OpenAI kaynağı ve model dağıtımı içeren bir [Azure aboneliği](https://azure.microsoft.com/free/)  
- `az login` ile giriş yaparak kullanacağınız [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)  

### Gerekli Ortam Değişkenleri

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Ardından AzureCliCredential bir jeton alabilmesi için oturum açın
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Ardından AzureCliCredential bir jeton alabilmesi için giriş yapın
az login
```

### Örnek Kod

Örnek kodu çalıştırmak için,

```bash
# zsh/bash
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

Veya dotnet CLI kullanarak:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

Tam kod için [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs) dosyasına bakın.

```csharp
#!/usr/bin/dotnet run

#:package Microsoft.Extensions.AI@10.*
#:package Microsoft.Agents.AI.OpenAI@1.*-*
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

// Define Agent Identity and Comprehensive Instructions
// Agent name for identification and logging purposes
var AGENT_NAME = "TravelAgent";

// Detailed instructions that define the agent's personality, capabilities, and behavior
// This system prompt shapes how the agent responds and interacts with users
var AGENT_INSTRUCTIONS = """
You are a helpful AI Agent that can help plan vacations for customers.

Important: When users specify a destination, always plan for that location. Only suggest random destinations when the user hasn't specified a preference.

When the conversation begins, introduce yourself with this message:
"Hello! I'm your TravelAgent assistant. I can help plan vacations and suggest interesting destinations for you. Here are some things you can ask me:
1. Plan a day trip to a specific location
2. Suggest a random vacation destination
3. Find destinations with specific features (beaches, mountains, historical sites, etc.)
4. Plan an alternative trip if you don't like my first suggestion

What kind of trip would you like me to help you plan today?"

Always prioritize user preferences. If they mention a specific destination like "Bali" or "Paris," focus your planning on that location rather than suggesting alternatives.
""";

// Create AI Agent with Advanced Travel Planning Capabilities
// Get the Responses client for the deployment and create the AI agent
// Configure agent with name, detailed instructions, and available tools
// This demonstrates the .NET agent creation pattern with full configuration
AIAgent agent = azureClient
    .GetChatClient(deployment)
    .AsAIAgent(
        name: AGENT_NAME,
        instructions: AGENT_INSTRUCTIONS,
        tools: [AIFunctionFactory.Create(GetRandomDestination)]
    );

// Create New Session for Context Management.
// Initialize a new conversation session to maintain context across multiple interactions
// Sessions enable the agent to remember previous exchanges and maintain conversational state
// This is essential for multi-turn conversations and contextual understanding
AgentSession session = await agent.CreateSessionAsync();

// Execute Agent: First Travel Planning Request
// Run the agent with an initial request that will likely trigger the random destination tool
// The agent will analyze the request, use the GetRandomDestination tool, and create an itinerary
// Using the session parameter maintains conversation context for subsequent interactions
await foreach (var update in agent.RunStreamingAsync("Plan me a day trip", session))
{
    await Task.Delay(10);
    Console.Write(update);
}

Console.WriteLine();

// Execute Agent: Follow-up Request with Context Awareness
// Demonstrate contextual conversation by referencing the previous response
// The agent remembers the previous destination suggestion and will provide an alternative
// This showcases the power of conversation sessions and contextual understanding in .NET agents
await foreach (var update in agent.RunStreamingAsync("I don't like that destination. Plan me another vacation.", session))
{
    await Task.Delay(10);
    Console.Write(update);
}
```

## 🎓 Temel Çıkarımlar

1. **Ajan Mimarisi**: Microsoft Agent Framework, .NET'te AI ajanları oluşturmak için temiz, tür-güvenli bir yaklaşım sunar  
2. **Araç Entegrasyonu**: `[Description]` özniteliği ile süslenmiş fonksiyonlar ajan için kullanılabilir araçlar haline gelir  
3. **Konuşma Bağlamı**: Oturum yönetimi, tam bağlam farkındalığıyla çok turlu konuşmalara olanak tanır  
4. **Konfigürasyon Yönetimi**: Ortam değişkenleri ve güvenli kimlik bilgisi işleme .NET en iyi uygulamalarına uygundur  
5. **Azure OpenAI Responses API**: Ajan, Azure.AI.OpenAI SDK aracılığıyla Azure OpenAI Responses API'yi kullanır  

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