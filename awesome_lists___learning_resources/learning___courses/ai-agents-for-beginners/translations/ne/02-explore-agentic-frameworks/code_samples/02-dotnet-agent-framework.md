# 🔍 माइक्रोसफ्ट एजेन्ट फ्रेमवर्कको अन्वेषण - आधारभूत एजेन्ट (.NET)

## 📋 सिकाइ उद्देश्यहरू

यो उदाहरणले .NET मा एक आधारभूत एजेन्ट कार्यान्वयन मार्फत माइक्रोसफ्ट एजेन्ट फ्रेमवर्कका आधारभूत अवधारणाहरू अन्वेषण गर्दछ। तपाईंले मुख्य एजेन्टिक ढाँचाहरू सिक्नुहुनेछ र C# र .NET इकोसिस्टम प्रयोग गरेर बौद्धिक एजेन्टहरू कसरी काम गर्छन् भन्ने बुझ्नुहुनेछ।

### के तपाईं पत्ता लगाउनुहुनेछ

- 🏗️ **एजेन्ट आर्किटेक्चर**: .NET मा AI एजेन्टहरूको आधारभूत संरचनाको बुझाइ
- 🛠️ **उपकरण एकीकरण**: एजेन्टहरूले क्षमता विस्तार गर्न बाह्य कार्यहरू कसरी प्रयोग गर्छन्  
- 💬 **वार्तालाप प्रवाह**: थ्रेड व्यवस्थापनको साथ बहु-चरण वार्तालाप र सन्दर्भ व्यवस्थापन
- 🔧 **कॉन्फिगरेसन ढाँचाहरू**: .NET मा एजेन्ट सेटअप र व्यवस्थापनका लागि उत्तम अभ्यासहरू

## 🎯 मुख्य अवधारणाहरू समेटिएको

### एजेन्टिक फ्रेमवर्क सिद्धान्तहरू

- **स्वायत्तता**: एजेन्टहरूले .NET AI अमूर्तताहरू प्रयोग गरेर स्वतन्त्र निर्णय कसरी गर्छन्
- **प्रतिक्रियाशीलता**: वातावरणीय परिवर्तन र प्रयोगकर्ता इनपुटहरूमा प्रतिक्रिया दिनु
- **पूर्वसक्रियता**: लक्ष्य र सन्दर्भको आधारमा पहल लिनु
- **सामाजिक क्षमता**: वार्तालाप थ्रेडहरूसँग प्राकृतिक भाषामा अन्तर्क्रिया

### प्राविधिक घटकहरू

- **AIAgent**: मुख्य एजेन्ट समन्वय र वार्तालाप व्यवस्थापन (.NET)
- **उपकरण कार्यहरू**: C# विधिहरू र विशेषताहरू मार्फत एजेन्ट क्षमताहरू विस्तार गर्नु
- **Azure OpenAI एकीकरण**: Azure OpenAI Responses API मार्फत भाषा मोडेलहरूको उपयोग
- **सुरक्षित कन्फिगरेसन**: वातावरण आधारित अन्तबिन्दु व्यवस्थापन

## 🔧 प्राविधिक स्ट्याक

### मुख्य प्रविधिहरू

- माइक्रोसफ्ट एजेन्ट फ्रेमवर्क (.NET)
- Azure OpenAI (Responses API) एकीकरण
- Azure.AI.OpenAI क्लाइन्ट ढाँचाहरू
- DotNetEnv सँग वातावरण आधारित कन्फिगरेसन

### एजेन्ट क्षमताहरू

- प्राकृतिक भाषा बुझाइ र उत्पादन
- C# विशेषताहरूसँग कार्यकलाप कल र उपकरण प्रयोग
- वार्तालाप सत्रहरूमा सन्दर्भ-सचेत प्रतिक्रियाहरू
- निर्भरता इंजेक्शन ढाँचाहरू सहित विस्तारयोग्य आर्किटेक्चर

## 📚 फ्रेमवर्क तुलना

यो उदाहरणले माइक्रोसफ्ट एजेन्ट फ्रेमवर्क दृष्टिकोणलाई अन्य एजेन्टिक फ्रेमवर्कहरूसँग तुलना गर्दछ:

| सुविधा | माइक्रोसफ्ट एजेन्ट फ्रेमवर्क | अन्य फ्रेमवर्कहरू |
|---------|-------------------------|------------------|
| **एकीकरण** | नेटिभ माइक्रोसफ्ट इकोसिस्टम | विविध अनुकूलता |
| **सरलता** | सफा, सहज API | प्रायः जटिल सेटअप |
| **विस्तारयोग्यता** | सजिलो उपकरण एकीकरण | फ्रेमवर्क-निर्भर |
| **उद्यम तयार** | उत्पादनका लागि बनाइएको | फ्रेमवर्क अनुसार फरक |

## 🚀 सुरुवात गर्ने तरिका

### पूर्व आवश्यकताहरू

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) वा माथि
- Azure OpenAI स्रोत र मोडेल डिप्लोइमेन्ट सहितको [Azure सदस्यता](https://azure.microsoft.com/free/)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` कमाण्डसहित लगइन गर्नुहोस्

### आवश्यक वातावरण चरहरू

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# त्यसपछि साइन इन गर्नुहोस् ताकि AzureCliCredential टोकन प्राप्त गर्न सकून्
az login
```

```powershell
# पावरशेल
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# त्यसपछि साइन इन गर्नुहोस् ताकि AzureCliCredential टोकन प्राप्त गर्न सकोस्
az login
```

### नमूना कोड

कोड उदाहरण चलाउन,

```bash
# zsh/bash
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

वा dotnet CLI प्रयोग गरेर:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

पूर्ण कोडका लागि [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs) हेर्नुहोस्।

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

## 🎓 मुख्य सिकाइहरू

1. **एजेन्ट आर्किटेक्चर**: माइक्रोसफ्ट एजेन्ट फ्रेमवर्क .NET मा AI एजेन्टहरू निर्माण गर्न सफा, प्रकार-सुरक्षित दृष्टिकोण प्रदान गर्दछ
2. **उपकरण एकीकरण**: `[Description]` विशेषताहरूले सजावट गरिएका कार्यहरू एजेन्टका लागि उपलब्ध उपकरणहरू बन्नेछन्
3. **वार्तालाप सन्दर्भ**: सत्र व्यवस्थापनले पूर्ण सन्दर्भ सचेतता सहित बहु-पटक वार्तालाप सक्षम बनाउँछ
4. **कन्फिगरेसन व्यवस्थापन**: वातावरण चरहरू र सुरक्षित प्रमाणपत्र ह्यान्डलिङ .NET का उत्तम अभ्यासहरू अनुसार हुन्छ
5. **Azure OpenAI Responses API**: एजेन्टले Azure.AI.OpenAI SDK मार्फत Azure OpenAI Responses API प्रयोग गर्छ

## 🔗 अतिरिक्त स्रोतहरू

- [Microsoft Agent Framework Documentation](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->