# 🔍 ਮਾਈਕ੍ਰੋਸੌਫਟ ਏਜੰਟ ਫਰੇਮਵਰਕ ਦੀ ਖੋਜ - ਬੇਸਿਕ ਏਜੰਟ (.NET)

## 📋 ਸਿੱਖਣ ਦੇ ਉਦੇਸ਼

ਇਹ ਉਦਾਹਰਨ .NET ਵਿੱਚ ਇੱਕ ਬੇਸਿਕ ਏਜੰਟ ਲਾਗੂ ਕਰ ਕੇ ਮਾਈਕ੍ਰੋਸੌਫਟ ਏਜੰਟ ਫਰੇਮਵਰਕ ਦੇ ਮੂਲ ਸੰਕਲਪਾਂ ਦੀ ਖੋਜ ਕਰਦੀ ਹੈ। ਤੁਸੀਂ ਮੁੱਖ ਏਜੰਟਿਕ ਪੈਟਰਨ ਸਿੱਖੋਗੇ ਅਤੇ ਸਮਝੋਗੇ ਕਿ C# ਅਤੇ .NET ਇਕੋਸਿਸਟਮ ਦ੍ਵਾਰਾ ਬੁੱਧੀਮਾਨ ਏਜੰਟ ਕਿਵੇਂ ਕੰਮ ਕਰਦੇ ਹਨ।

### ਤੁਹਾਨੂੰ ਕੀ ਮਿਲੇਗਾ

- 🏗️ **ਏਜੰਟ ਆਰਕੀਟੈਕਚਰ**: .NET ਵਿੱਚ AI ਏਜੰਟਾਂ ਦੀ ਬੁਨਿਆਦੀ ਸੰਰਚਨਾ ਦੀ ਸਮਝ
- 🛠️ **ਟੂਲ ਇੰਟਿਗ੍ਰੇਸ਼ਨ**: ਏਜੰਟ ਆਪਣੀਆਂ ਯੋਗਤਾਵਾਂ ਵਧਾਉਣ ਲਈ ਬਾਹਰੀ ਫੰਕਸ਼ਨਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਨ  
- 💬 **ਗੱਲਬਾਤ ਦਾ ਪੈਟਰਨ**: ਮਲਟੀ-ਟਰਨ ਗੱਲਬਾਤਾਂ ਅਤੇ ਕਾਂਟੈਕਸਟ ਦੀ ਥ੍ਰੈਡ ਪ੍ਰਬੰਧਨ ਨਾਲ ਸੰਭਾਲ
- 🔧 **ਕੰਫਿਗਰੇਸ਼ਨ ਪੈਟਰਨ**: .NET ਵਿੱਚ ਏਜੰਟ ਸੈਟਅਪ ਅਤੇ ਪ੍ਰਬੰਧਨ ਲਈ ਸਰੋਤਾਵਾਂ ਦੀਆਂ ਸਰਵੋਤਮ ਪ੍ਰਥਾਵਾਂ

## 🎯 ਮੁੱਖ ਸੰਕਲਪ ਜੋ ਕਵਰ ਕੀਤੇ ਗਏ

### ਏਜੰਟਿਕ ਫਰੇਮਵਰਕ ਸਿਧਾਂਤ

- **ਸਵਤੰਤਰਤਾ**: ਕਿੱਵੇਂ .NET AI ਐਬਸਟ੍ਰੈਕਸ਼ਨਾਂ ਨਾਲ ਏਜੰਟ ਸਵਤੰਤਰ ਫੈਸਲੇ ਕਰਨ
- **ਪਰਤੀਕਿਰਿਆ**: ਪਰਿਵਾਰਤਨ ਅਤੇ ਯੂਜ਼ਰ ਇਨਪੁਟਾਂ 'ਤੇ ਪ੍ਰਤੀਕਿਰਿਆ ਕਰਨ
- **ਪ੍ਰੋਐਕਟਿਵਿਟੀ**: ਮਕਸਦਾਂ ਅਤੇ ਸੰਦਰਭ ਦੇ ਅਧਾਰ ਤੇ ਪਹਿਲ ਜਮਾਉਣਾ
- **ਸਮਾਜਿਕ ਯੋਗਤਾ**: ਗੱਲਬਾਤ ਥ੍ਰੈਡਾਂ ਨਾਲ ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਰਾਹੀਂ ਮੂਲ-ਚਰਚਾ

### ਤਕਨੀਕੀ ਭਾਗ

- **AIAgent**: ਮੁੱਖ ਏਜੰਟ ਨਿਆਂਤੇਤਰਣ ਅਤੇ ਗੱਲਬਾਤ ਪ੍ਰਬੰਧਨ (.NET)
- **ਟੂਲ ਫੰਕਸ਼ਨਸ**: C# ਮੈਥਡਸ ਅਤੇ ਐਟ੍ਰੀਬਿਊਟਸ ਨਾਲ ਏਜੰਟ ਯੋਗਤਾਵਾਂ ਵਧਾਉਣਾ
- **Azure OpenAI ਇੰਟਿਗ੍ਰੇਸ਼ਨ**: Azure OpenAI Responses API ਰਾਹੀਂ ਭਾਸ਼ਾ ਮਾਡਲਾਂ ਦੀ ਵਰਤੋਂ
- **ਸੁਰੱਖਿਅਤ ਕੰਫਿਗਰੇਸ਼ਨ**: ਵਾਤਾਵਰਣ ਅਧਾਰਿਤ ਐਂਡਪੌਇੰਟ ਪ੍ਰਬੰਧਨ

## 🔧 ਤਕਨੀਕੀ ਸਟੈਕ

### ਮੁੱਖ ਤਕਨੀਕਾਂ

- Microsoft Agent Framework (.NET)
- Azure OpenAI (Responses API) ਇੰਟਿਗ੍ਰੇਸ਼ਨ
- Azure.AI.OpenAI ਕਲਾਇੰਟ ਪੈਟਰਨ
- DotNetEnv ਨਾਲ ਵਾਤਾਵਰਣ-ਅਧਾਰਿਤ ਕੰਫਿਗਰੇਸ਼ਨ

### ਏਜੰਟ ਯੋਗਤਾਵਾਂ

- ਕੁਦਰਤੀ ਭਾਸ਼ਾ ਦੀ ਸਮਝ ਅਤੇ ਉਤਪਾਦਨ
- C# ਐਟ੍ਰੀਬਿਊਟਸ ਨਾਲ ਫੰਕਸ਼ਨ ਕਾਲ ਅਤੇ ਟੂਲ ਦੀ ਵਰਤੋਂ
- ਗੱਲਬਾਤ ਸੈਸ਼ਨਾਂ ਨਾਲ ਸੰਦਰਭ-ਜਾਣੂ ਜਵਾਬ
- ਡਿਪੈਂਡੇਨਸੀ ਇੰਜੈਕਸ਼ਨ ਪੈਟਰਨ ਨਾਲ ਵਿਰੰਧਯੋਗ ਆਰਕੀਟੈਕਚਰ

## 📚 ਫਰੇਮਵਰਕ ਤੁਲਨਾ

ਇਹ ਉਦਾਹਰਨ ਦੂਜੇ ਏਜੰਟਿਕ ਫਰੇਮਵਰਕਸ ਨਾਲੋਂ Microsoft Agent Framework ਦੇ ਸਰੋਤ ਬਾਰੇ ਵਿਸਥਾਰ ਦਿੰਦੀ ਹੈ:

| ਵਿਸ਼ੇਸ਼ਤਾ | Microsoft Agent Framework | ਹੋਰ ਫਰੇਮਵਰਕਸ |
|---------|-------------------------|------------------|
| **ਇੰਟਿਗ੍ਰੇਸ਼ਨ** | ਮੂਲ Microsoft ਇਕੋਸਿਸਟਮ | ਵੱਖ-ਵੱਖ ਸੰਗਤਤਾ |
| **ਸਰਲਤਾ** | ਸਾਫ਼, ਬੁਝਵਾਨ API | ਅਕਸਰ ਜਟਿਲ ਸੈਟਅਪ |
| **ਵਿਰੰਧਯੋਗਤਾ** | ਅਸਾਨ ਟੂਲ ਇੰਟਿਗ੍ਰੇਸ਼ਨ | ਫਰੇਮਵਰਕ 'ਤੇ ਨਿਰਭਰ |
| **ਐਂਟਰਪਰਾਈਜ਼ ਤਯਾਰ** | ਉਤਪਾਦਨ ਲਈ ਬਣਾਇਆ | ਫਰੇਮਵਰਕ ਦੇ ਅਨੁਸਾਰ ਵੱਖ-ਵੱਖ |

## 🚀 ਸ਼ੁਰੂਆਤ ਕਿਵੇਂ ਕਰੀਏ

### ਜ਼ਰੂਰੀ ਚੀਜ਼ਾਂ

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ਜਾਂ ਵੱਧ
- ਇੱਕ [Azure ਸਬਸਕ੍ਰਿਪਸ਼ਨ](https://azure.microsoft.com/free/) ਜਿਸ ਵਿੱਚ Azure OpenAI ਸਰੋਤ ਅਤੇ ਮਾਡਲ ਡਿਪਲੋਇਮੈਂਟ ਹੈ
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` ਨਾਲ ਸਾਈਨ ਇਨ

### ਜ਼ਰੂਰੀ ਵਾਤਾਵਰਣ ਵੈਰੀਏਬਲ

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# ਫਿਰ ਸਾਈਨ ਇਨ ਕਰੋ ਤਾਂ ਜੋ AzureCliCredential ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰ ਸਕੇ
az login
```

```powershell
# پاور شیل
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# ਫਿਰ ਸਾਇਨ ਇਨ ਕਰੋ ਤਾਂ ਜੋ AzureCliCredential ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰ ਸਕੇ
az login
```

### ਨਮੂਨਾ ਕੋਡ

ਕੋਡ ਉਦਾਹਰਨ ਚਲਾਉਣ ਲਈ,

```bash
# ਜ਼ਸ਼/ਬੈਸ਼
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

ਜਾਂ dotnet CLI ਦੀ ਵਰਤੋਂ ਨਾਲ:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

ਪੂਰਾ ਕੋਡ ਦੇਖਣ ਲਈ [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs) ਵੇਖੋ।

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

## 🎓 ਮੁੱਖ ਸਿੱਖੀਆਂ

1. **ਏਜੰਟ ਆਰਕੀਟੈਕਚਰ**: Microsoft Agent Framework .NET ਵਿੱਚ AI ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਸਾਫ, ਟਾਈਪ-ਸੇਫ਼ ਢੰਗ ਦਿੰਦਾ ਹੈ
2. **ਟੂਲ ਇੰਟਿਗ੍ਰੇਸ਼ਨ**: `[Description]` ਐਟ੍ਰੀਬਿਊਟ ਨਾਲ ਸਜਾਏ ਗਏ ਫੰਕਸ਼ਨ ਏਜੰਟ ਲਈ ਉਪਲਬਧ ਟੂਲ ਬਣ ਜਾਂਦੇ ਹਨ
3. **ਗੱਲਬਾਤ ਸੰਦਰਭ**: ਸੈਸ਼ਨ ਪ੍ਰਬੰਧਨ ਪੂਰੇ ਸੰਦਰਭ ਸਮੇਤ ਕਈ ਮੁੜ ਗੱਲਬਾਤਾਂ ਨੂੰ ਸਮਭਾਲਦਾ ਹੈ
4. **ਕੰਫਿਗਰੇਸ਼ਨ ਪ੍ਰਬੰਧਨ**: ਵਾਤਾਵਰਣ ਵੈਰੀਏਬਲ ਅਤੇ ਸੁਰੱਖਿਅਤ ਪ੍ਰਮਾਣਪੱਤਰ ਸੰਭਾਲ .NET ਦੀਆਂ ਸਰਵੋਤਮ ਪ੍ਰਥਾਵਾਂ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹਨ
5. **Azure OpenAI Responses API**: ਏਜੰਟ Azure.AI.OpenAI SDK ਰਾਹੀਂ Azure OpenAI Responses API ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ

## 🔗 ਹੋਰ ਸਾਧਨ

- [Microsoft Agent Framework ਦਸਤਾਵੇਜ਼](https://learn.microsoft.com/agent-framework)
- [Microsoft Foundry ਵਿੱਚ Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET ਸਿੰਗਲ ਫਾਈਲ ਐਪਸ](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->