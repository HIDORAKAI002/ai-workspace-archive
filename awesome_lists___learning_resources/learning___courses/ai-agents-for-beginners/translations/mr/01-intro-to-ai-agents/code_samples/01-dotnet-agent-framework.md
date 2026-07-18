# 🌍 मायक्रोसॉफ्ट एजंट फ्रेमवर्क (.NET) सह AI ट्रॅव्हल एजंट

## 📋 परिदृश्य आढावा

हा उदाहरण कसे मायक्रोसॉफ्ट एजंट फ्रेमवर्क फॉर .NET वापरून एक बुद्धिमान प्रवास नियोजन एजंट तयार करायचा हे दाखवतो. एजंट स्वयंचलीतपणे जगभरातील विविध गंतव्यांसाठी वैयक्तिकृत दिवसभरातील ट्रिपचे नियोजन तयार करू शकतो.

### मुख्य क्षमता:

- 🎲 **यादृच्छिक गंतव्य निवड**: सुट्टीसाठी ठिकाणे निवडण्यासाठी कस्टम साधन वापरतो
- 🗺️ **बुद्धिमान ट्रिप प्लॅनिंग**: सविस्तर दिवसभरातील प्रवासाचे नियोजन तयार करतो
- 🔄 **रियल-टाइम स्ट्रीमिंग**: त्वरित आणि स्ट्रीमिंग प्रत्युत्तर दोन्ही समर्थन करतो
- 🛠️ **कस्टम टूल इंटिग्रेशन**: एजंटच्या क्षमतांचा विस्तार कसा करायचा हे दाखवतो

## 🔧 तांत्रिक रचना

### मुख्य तंत्रज्ञान

- **Microsoft Agent Framework**: AI एजंट विकासासाठी नवीनतम .NET अंमलबजावणी
- **Azure OpenAI (Responses API)**: मॉडेल इन्फरन्ससाठी Azure OpenAI Responses API वापरतो
- **Azure Identity**: `AzureCliCredential` (`az login`) द्वारे सुरक्षित साइन-इन
- **सुरक्षित संरचना**: पर्यावरण-आधारित एंडपॉईंट व्यवस्थापन

### मुख्य घटक

1. **AIAgent**: संभाषण प्रवाह हाताळणारा मुख्य एजंट आयोजक
2. **कस्टम टूल्स**: एजंटसाठी उपलब्ध `GetRandomDestination()` फंक्शन
3. **Responses Client**: Azure OpenAI Responses-आधारित संभाषण इंटरफेस
4. **स्ट्रीमिंग समर्थन**: रियल-टाइम प्रतिसाद निर्मितीची क्षमता

### एकत्रीकरण नमुना

```mermaid
graph LR
    A[वापरकर्ता विनंती] --> B[एआय एजंट]
    B --> C[Azure OpenAI (प्रतिक्रिया API)]
    B --> D[GetRandomDestination साधन]
    C --> E[प्रवास क्रमवारीपत्रक]
    D --> E
```

## 🚀 प्रारंभ करा

### पूर्व शर्ती

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) किंवा उच्चतर आवृत्ती
- Azure OpenAI स्रोत आणि मॉडेल डिप्लॉयमेंट सह [Azure सदस्यत्व](https://azure.microsoft.com/free/)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` सह साइन इन करा

### आवश्यक पर्यावरणीय चल

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# नंतर साइन इन करा ज्यामुळे AzureCliCredential टोकन मिळवू शकेल
az login
```

```powershell
# पॉवरशेल
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# नंतर साइन इन करा जेणेकरून AzureCliCredential टोकन मिळवू शकेल
az login
```

### नमुना कोड

कोड उदाहरण चालवण्यासाठी,

```bash
# झश/बॅश
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

किंवा dotnet CLI वापरून:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

पूर्ण कोडसाठी [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) पहा.

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

## 🎓 मुख्य शिकवण

1. **एजंट आर्किटेक्चर**: Microsoft Agent Framework .NET मध्ये AI एजंट तयार करण्यासाठी स्वच्छ, type-safe पध्दत प्रदान करतो
2. **साधन एकत्रीकरण**: `[Description]` वैशिष्ट्यांसह फंक्शन्स एजंटसाठी उपलब्ध साधने बनतात
3. **संरचना व्यवस्थापन**: पर्यावरणीय चल आणि सुरक्षित निर्देशांक हाताळणी .NET सर्वोत्तम पद्धतींचे पालन करते
4. **Azure OpenAI Responses API**: एजंट Azure.AI.OpenAI SDK द्वारे Azure OpenAI Responses API वापरतो

## 🔗 अतिरिक्त संसाधने

- [Microsoft Agent Framework दस्तऐवज](https://learn.microsoft.com/agent-framework)
- [Microsoft Foundry मधील Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->