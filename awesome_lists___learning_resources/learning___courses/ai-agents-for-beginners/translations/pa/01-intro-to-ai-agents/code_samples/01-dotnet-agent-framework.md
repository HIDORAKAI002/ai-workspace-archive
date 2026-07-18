# 🌍 ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੰਟ ਫਰੇਮਵਰਕ (.NET) ਨਾਲ AI ਯਾਤਰਾ ਏਜੰਟ

## 📋 ਸਿਧਾਂਤ ਝਲਕ

ਇਸ ਉਦਾਹਰਨ ਵਿੱਚ ਦਿਖਾਇਆ ਗਿਆ ਹੈ ਕਿ ਕਿਵੇਂ ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੰਟ ਫਰੇਮਵਰਕ ਲਈ .NET ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇੱਕ ਬੁੱਧੀਮਾਨ ਯਾਤਰਾ ਯੋਜਨਾ ਏਜੰਟ ਬਣਾਈ ਜਾ ਸਕਦੀ ਹੈ। ਏਜੰਟ ਦੁਨੀਆ ਭਰ ਦੇ ਬੇਤਰਤੀਬੀ ਮੰਜ਼ਿਲਾਂ ਲਈ ਵਿਅਕਤੀਗਤ ਦਿਨ-ਦੌਰੇ ਦੀ ਯੋਜਨਾ ਆਪਣੇ ਆਪ ਤਿਆਰ ਕਰ ਸਕਦਾ ਹੈ।

### ਮੁੱਖ ਯੋਗਤਾਵਾਂ:

- 🎲 **ਬੇਤਰਤੀਬੀ ਮੰਜ਼ਿਲ ਚੋਣ**: ਛੁੱਟੀਆਂ ਵਾਲੀਆਂ ਥਾਵਾਂ ਚੁੱਕਣ ਲਈ ਕਸਟਮ ਟੂਲ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ
- 🗺️ **ਬੁੱਧੀਮਾਨ ਦੌਰਾ ਯੋਜਨਾ**: ਦਿਨ ਦਰ ਦਿਨ ਵਿਸਥਾਰ ਨਾਲ ਯੋਜਨਾਵਾਂ ਬਣਾਉਂਦਾ ਹੈ
- 🔄 **ਹਕੀਕਤੀ ਸਮੇਂ ਸਟ੍ਰੀਮਿੰਗ**: ਤੁਰੰਤ ਅਤੇ ਸਟ੍ਰੀਮਿੰਗ ਜਵਾਬ ਦੋਹਾਂ ਨੂੰ ਸਹਿਯੋਗ ਕਰਦਾ ਹੈ
- 🛠️ **ਕਸਟਮ ਟੂਲ ਇੰਟੀਗਰੇਸ਼ਨ**: ਏਜੰਟ ਦੀਆਂ ਸਮਰੱਥਾਵਾਂ ਨੂੰ ਵਧਾਉਣ ਦਾ ਤਰੀਕਾ ਦਰਸਾਉਂਦਾ ਹੈ

## 🔧 ਤਕਨੀਕੀ ਬਣਤਰ

### ਮੁੱਖ ਤਕਨੀਕਾਂ

- **ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੰਟ ਫਰੇਮਵਰਕ**: AI ਏਜੰਟ ਵਿਕਾਸ ਲਈ ਤਾਜ਼ਾ .NET ਅਮਲੀਕਰਨ
- **ਆਜ਼ੋਰ ਓਪਨAI (Responses API)**: ਮਾਡਲ ਅਨੁਮਾਨਕ ਲਈ ਆਜ਼ੋਰ ਓਪਨAI Responses API ਦੀ ਵਰਤੋਂ
- **ਆਜ਼ੋਰ ਆਈਡੈਂਟਿਟੀ**: `AzureCliCredential` (`az login`) ਰਾਹੀਂ ਸੁਰੱਖਿਅਤ ਸਾਈਨ-ਇਨ
- **ਸੁਰੱਖਿਅਤ ਸੰਰਚਨਾ**: ਮਾਹੌਲ ਅਧਾਰਿਤ ਐਂਡਪੌਇੰਟ ਪ੍ਰਬੰਧਨ

### ਮੁੱਖ ਹਿੱਸੇ

1. **AIAgent**: ਮੁੱਖ ਏਜੰਟ ਜੋ ਗੱਲਬਾਤ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਦਾ ਹੈ
2. **ਕਸਟਮ ਟੂਲ**: ਏਜੰਟ ਲਈ ਉਪਲਬਧ `GetRandomDestination()` ਫੰਕਸ਼ਨ
3. **Responses ਕਲਾਇਂਟ**: ਆਜ਼ੋਰ ਓਪਨAI Responses ਆਧਾਰਤ ਗੱਲਬਾਤ ਮਾਹੌਲ
4. **ਸਟ੍ਰੀਮਿੰਗ ਸਹਿਯੋਗ**: ਹਕੀਕਤੀ ਸਮੇਂ ਜਵਾਬ ਤਿਆਰ ਕਰਨ ਦੀ ਸਮਰੱਥਾ

### ਇੰਟੀਗਰੇਸ਼ਨ ਪੈਟਰਨ

```mermaid
graph LR
    A[ਯੂਜ਼ਰ ਬਿਨੈ] --> B[ਏਆਈ ਏਜੰਟ]
    B --> C[ਅਜ਼ੂਰ ਓਪਨਏਆਈ (ਜਵਾਬ API)]
    B --> D[ਗੇਟਰੈਂਡਮਡੈਸਟਿਨੇਸ਼ਨ ਟੂਲ]
    C --> E[ਯਾਤਰਾ ਯੋਜਨਾ]
    D --> E
```

## 🚀 ਸ਼ੁਰੂਆਤ

### ਲੋੜੀਂਦੀਆਂ ਚੀਜ਼ਾਂ

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ਜਾਂ ਉੱਪਰ
- ਇੱਕ [ਆਜ਼ੋਰ ਸਬਸਕ੍ਰਿਪਸ਼ਨ](https://azure.microsoft.com/free/) ਜਿਸ ਵਿੱਚ ਆਜ਼ੋਰ ਓਪਨAI ਸਾਧਨ ਅਤੇ ਮਾਡਲ ਡਿਪਲੋਇਮੈਂਟ ਹੋਵੇ
- [ਆਜ਼ੋਰ CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` ਨਾਲ ਸਾਈਨ-ਇਨ ਕਰੋ

### ਲੋੜੀਂਦੇ ਮਾਹੌਲ ਵੈਰੀਏਬਲ

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
# ਫਿਰ ਸਾਈਨ ਇਨ ਕਰੋ ਤਾਂ ਜੋ AzureCliCredential ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰ ਸਕੇ
az login
```

### ਨਮੂਨਾ ਕੋਡ

ਕੋਡ ਉਦਾਹਰਨ ਨੂੰ ਚਲਾਉਣ ਲਈ,

```bash
# zsh/bash
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

ਜਾਂ ਡੌਟਨੈੱਟ CLI ਦੀ ਵਰਤੋਂ ਕਰਕੇ:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

ਪੂਰੇ ਕੋਡ ਲਈ [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) ਨੂੰ ਦੇਖੋ।

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

## 🎓 ਮੁੱਖ ਸਿੱਖਿਆ

1. **ਏਜੰਟ ਬਣਤਰ**: ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੰਟ ਫਰੇਮਵਰਕ .NET ਵਿੱਚ AI ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਸਾਫ, ਟਾਈਪ-ਸੇਫ਼ ਢੰਗ ਦਿੰਦਾ ਹੈ
2. **ਟੂਲ ਇੰਟੀਗਰੇਸ਼ਨ**: `[Description]` ਐਟ੍ਰਿਬਿਊਟ ਨਾਲ ਸਜਾਏ ਗਏ ਫੰਕਸ਼ਨ ਏਜੰਟ ਲਈ ਉਪਲਬਧ ਟੂਲ ਬਣ ਜਾਂਦੇ ਹਨ
3. **ਸੰਰਚਨਾ ਪ੍ਰਬੰਧਨ**: ਮਾਹੌਲ ਵੈਰੀਏਬਲ ਅਤੇ ਸੁਰੱਖਿਅਤ ਪ੍ਰਮਾਣਪੱਤਰ ਸੰਭਾਲ .NET ਦੀਆਂ ਸਭ ਤੋਂ ਵਧੀਆ ਪ੍ਰਥਾਵਾਂ ਨੂੰ ਫਾਲੋ ਕਰਦੇ ਹਨ
4. **ਆਜ਼ੋਰ ਓਪਨAI Responses API**: ਏਜੰਟ ਆਜ਼ੋਰ.AI.OpenAI SDK ਰਾਹੀਂ ਆਜ਼ੋਰ ਓਪਨAI Responses API ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ

## 🔗 ਵਾਧੂ ਸਰੋਤ

- [ਮਾਇਕ੍ਰੋਸਾਫਟ ਏਜੰਟ ਫਰੇਮਵਰਕ ਦਸਤਾਵੇਜ਼](https://learn.microsoft.com/agent-framework)
- [ਮਾਇਕ੍ਰੋਸਾਫਟ ਫਾਊਂਡਰੀ ਵਿੱਚ ਆਜ਼ੋਰ ਓਪਨAI](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET ਸਿੰਗਲ ਫਾਇਲ ਐਪਸ](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->