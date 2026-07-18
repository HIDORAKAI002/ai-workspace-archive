# 🌍 माइक्रोसफ्ट एजेन्ट फ्रेमवर्क (.NET) सहित AI यात्रा एजेन्ट

## 📋 स्थिति अवलोकन

यस उदाहरणले माइक्रोसफ्ट एजेन्ट फ्रेमवर्क प्रयोग गरेर .NET का लागि बुद्धिमानीपूर्ण यात्रा योजना एजेन्ट कसरी बनाउने देखाउँछ। एजेन्टले स्वतः व्यक्तिगत दिन-यात्रा तालिकाहरू विश्वका विभिन्न गन्तव्यहरूका लागि सिर्जना गर्न सक्छ।

### मुख्य क्षमता:

- 🎲 **यादृच्छिक गन्तव्य छनोट**: छुट्टी स्थानहरू छनोट गर्न कस्टम उपकरण प्रयोग गर्दछ
- 🗺️ **बुद्धिमानी यात्रा योजना बनाउने**: विस्तृत दिन-बाई-दिन यात्रा तालिकाहरू बनाउँछ
- 🔄 **रियल-टाइम स्ट्रिमिङ**: तत्काल र स्ट्रिमिङ दुवै प्रतिक्रिया समर्थन गर्दछ
- 🛠️ **कस्टम उपकरण एकीकरण**: एजेन्ट क्षमताहरू विस्तार कसरी गर्ने देखाउँछ

## 🔧 प्राविधिक संरचना

### मुख्य प्रविधिहरू

- **Microsoft Agent Framework**: AI एजेन्ट विकासका लागि नवीनतम .NET कार्यान्वयन
- **Azure OpenAI (Responses API)**: मोडेल अनुमानका लागि Azure OpenAI Responses API प्रयोग गर्दछ
- **Azure Identity**: `AzureCliCredential` (`az login`) मार्फत सुरक्षित लगइन
- **सुरक्षित कन्फिगरेसन**: वातावरण-आधारित अन्त बिन्दु व्यवस्थापन

### मुख्य कम्पोनेन्टहरू

1. **AIAgent**: संवाद प्रवाह सम्हाल्ने मुख्य एजेन्ट आयोजक
2. **कस्टम उपकरणहरू**: एजेन्टका लागि उपलब्ध `GetRandomDestination()` कार्य
3. **प्रतिक्रिया क्लाइन्ट**: Azure OpenAI Responses-आधारित संवाद इन्टरफेस
4. **स्ट्रिमिङ समर्थन**: रियल-टाइम प्रतिक्रिया सिर्जना क्षमता

### एकीकरण ढाँचा

```mermaid
graph LR
    A[प्रयोगकर्ता अनुरोध] --> B[AI एजेन्ट]
    B --> C[Azure OpenAI (प्रतिक्रिया API)]
    B --> D[GetRandomDestination उपकरण]
    C --> E[यात्रा कार्यक्रम]
    D --> E
```

## 🚀 सुरु गर्ने तरिका

### आवश्यकताहरू

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) वा त्यो भन्दा माथि
- Azure OpenAI स्रोत र मोडल डिप्लोयमेन्ट सहितको [Azure सदस्यता](https://azure.microsoft.com/free/)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` मार्फत लगइन

### आवश्यक वातावरण चरहरू

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# त्यसपछि साइन इन गर्नुहोस् ताकि AzureCliCredential ले टोकन प्राप्त गर्न सकोस्
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# त्यसपछि AzureCliCredential ले टोकन प्राप्त गर्न साईन इन गर्नुहोस्
az login
```

### नमूना कोड

कोड उदाहरण चलाउनको लागि,

```bash
# zsh/bash
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

वा dotnet CLI प्रयोग गर्दा:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

पूर्ण कोडका लागि [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) हेर्नुहोस्।

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

## 🎓 मुख्य सिकाईहरू

1. **एजेन्ट संरचना**: माइक्रोसफ्ट एजेन्ट फ्रेमवर्कले .NET मा AI एजेन्टहरू बनाउन सफा, प्रकार-सुरक्षित तरीका प्रदान गर्दछ
2. **उपकरण एकीकरण**: `[Description]` विशेषता सहितका कार्यहरू एजेन्टका लागि उपलब्ध उपकरणहरू बन्छन्
3. **कन्फिगरेसन व्यवस्थापन**: वातावरण चर र सुरक्षित प्रमाणपत्र ह्यान्डलिङ .NET को सबैभन्दा राम्रो अभ्यासहरू अनुसरण गर्दछ
4. **Azure OpenAI Responses API**: एजेन्टले Azure.AI.OpenAI SDK मार्फत Azure OpenAI Responses API प्रयोग गर्दछ

## 🔗 अतिरिक्त स्रोतहरू

- [Microsoft Agent Framework दस्तावेज](https://learn.microsoft.com/agent-framework)
- [Microsoft Foundry मा Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET सिंगल फाइल एपहरू](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->