# 🌍 អ្នកប្រឹក្សាធ្វើដំណើរដោយ AI ជាមួយ Microsoft Agent Framework (.NET)

## 📋 ជម្រើសទរុប

ឧទាហរណ៍នេះបង្ហាញពីវិធីបង្កើតអ្នកប្រឹក្សាធ្វើដំណើរយ៉ាងឆ្លាតវៃដោយប្រើ Microsoft Agent Framework សម្រាប់ .NET។ អ្នកប្រឹក្សាអាចបង្កើតផែនការដំណើរថ្ងៃតែមួយដែលផ្ទាល់ខ្លួនសម្រាប់គោលដៅចៃដន្យនៅជុំវិញពិភពលោកដោយស្វ័យប្រវត្តិ។

### សមត្ថភាពសំខាន់ៗ៖

- 🎲 **ការជ្រើសរើសគោលដៅចៃដន្យ**: ប្រើឧបករណ៍ប្ដូររបស់ផ្ទាល់ខ្លួនដើម្បីជ្រើសទីកន្លែងនៃការឈប់សម្រាក
- 🗺️ **គម្រោងដំណើរយ៉ាងឆ្លាតវៃ**: បង្កើតផែនការជារបាយការណ៍លម្អិតថ្នាក់ថ្ងៃមួយមួយ
- 🔄 **ការផ្ទេរបន្តផ្ទាល់ពេលពិត**: គាំទ្រពីចម្លើយភ្លាមៗនិងការផ្ទេរផ្លាស់ប្តូរនៅពេលពិត
- 🛠️ **ការចងក្រងឧបករណ៍ផ្ទាល់ខ្លួន**: បង្ហាញរបៀបពង្រីកសមត្ថភាពអ្នកប្រឹក្សា

## 🔧 ស្ថាបតិការជាតិបច្ចេកវិទ្យា

### បច្ចេកវិទ្យាសំខាន់ៗ

- **Microsoft Agent Framework**: ការអនុវត្ត .NET ថ្មីបំផុតសម្រាប់ការអភិវឌ្ឍអ្នកប្រឹក្សាធ្វើដោយ AI
- **Azure OpenAI (Responses API)**: ប្រើ Azure OpenAI Responses API សម្រាប់ការព្យាករណ៍ម៉ូឌែល
- **Azure Identity**: ចូលប្រព័ន្ធដោយសុវត្ថិភាពតាមរយៈ `AzureCliCredential` (`az login`)
- **ការគ្រប់គ្រងជាសុវត្ថិភាព**: ការគ្រប់គ្រងចំណុចចូលតាមបរិស្ថាន

### សមាសធាតុសំខាន់ៗ

1. **AIAgent**: អ្នកគ្រប់គ្រងចម្បងជាអ្នកប្រឹក្សាដែលដំណើរការសំឡេងជជែក
2. **ឧបករណ៍ផ្ទាល់ខ្លួន**: មុខងារ `GetRandomDestination()` មានស្រាប់សម្រាប់អ្នកប្រឹក្សា
3. **Responses Client**: ផ្ទាំងជជែកជាមួយ Responses របស់ Azure OpenAI
4. **គាំទ្រការផ្ទេរបន្តផ្ទាល់**: សមត្ថភាពបង្កើតចម្លើយពេលពិត

### គំរូការចងក្រង

```mermaid
graph LR
    A[សំណើអ្នកប្រើ] --> B[អ្នកចៃដន្យ AI]
    B --> C[Azure OpenAI (API ជម្លើយ)]
    B --> D[ឧបករណ៍ GetRandomDestination]
    C --> E[ផែនការធ្វើដំណើរ]
    D --> E
```

## 🚀 ការចាប់ផ្តើម

### អ្វីដែលត្រូវមានជាមុន

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ឬខ្ពស់ជាងនេះ
- មាន [ការជាវអាសុីរ](https://azure.microsoft.com/free/) ដែលមានធនធាន Azure OpenAI និងការចេញផ្សាយម៉ូឌែល
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — ចូលប្រើដោយ `az login`

### អថេរក្នុងបរិស្ថានត្រូវការ

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# បន្ទាប់មកចូលកម្មវិធី ដើម្បីឲ្យ AzureCliCredential អាចទទួលបានtokenមួយ
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# បន្ទាប់​មក​ចូល​ដើម្បី​ឲ្យ AzureCliCredential អាច​ទទួលបាន رمز​សញ្ញា
az login
```

### កូដគំរូ

ដើម្បីបើកប្រាថ្នាគំរូកូដនេះ,

```bash
# zsh/bash
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

ឬប្រើ dotnet CLI:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

មើល [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs) សម្រាប់កូដពេញលេញ។

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

## 🎓 ចំណុចសំខាន់ៗដែលទទួលបាន

1. **ស្ថាបតិការអ្នកប្រឹក្សា**: Microsoft Agent Framework ផ្តល់ជម្រើសដែលស្អាតនិងមានសុវត្ថិភាពប្រភេទសម្រាប់ការបង្កើតអ្នកប្រឹក្សា AI នៅក្នុង .NET
2. **ការចងក្រងឧបករណ៍**: មុខងារដែលត្រូវបានតុបតែងដោយ `[Description]` ក្លាយជាឧបករណ៍ដែលអាចប្រើបានសម្រាប់អ្នកប្រឹក្សា
3. **ការគ្រប់គ្រងការកំណត់**: អថេរបរិស្ថាន និងការគ្រប់គ្រងសមត្ថភាពសុវត្ថិភាពអនុវត្តតាមអនុស្សាវរីយ៍ល្អបំផុតរបស់ .NET
4. **Azure OpenAI Responses API**: អ្នកប្រឹក្សាប្រើ Azure OpenAI Responses API តាម SDK Azure.AI.OpenAI

## 🔗 ឯកសារបន្ថែម

- [ឯកសារ Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI នៅ Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->