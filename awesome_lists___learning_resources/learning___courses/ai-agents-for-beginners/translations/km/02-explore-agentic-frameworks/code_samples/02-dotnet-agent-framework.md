# 🔍 ការស្វែងយល់អំពី Microsoft Agent Framework - Agent មូលដ្ឋាន (.NET)

## 📋 គោលដៅការសិក្សា

ឧទាហរណ៍នេះស្វែងយល់ពីយោបល់មូលដ្ឋាននៃ Microsoft Agent Framework តាមរយៈការអនុវត្តភ្នាក់ងារមូលដ្ឋានក្នុង .NET។ អ្នកនឹងរៀនពីលំនាំភ្នាក់ងារមូលដ្ឋាន និងយល់ពីរបៀបដែលភ្នាក់ងារញញឹមធ្វើការផ្ទៃក្នុងដោយប្រើ C# និង ពិភព .NET។

### អ្វីដែលអ្នកនឹងរកឃើញ

- 🏗️ **រចនាសម្ព័ន្ធភ្នាក់ងារ**: ការយល់ដឹងពីរចនាសម្ព័ន្ធមូលដ្ឋាននៃភ្នាក់ងារ AI ក្នុង .NET  
- 🛠️ **ការរួមបញ្ចូលឧបករណ៍**: វិធីដែលភ្នាក់ងារ​ប្រើមុខងារ​ខាងក្រៅ ដើម្បីពង្រីកសមត្ថភាព  
- 💬 **លំហូរការសន្ទនា**: គ្រប់គ្រងការសន្ទនាច្រើនជុំ និងបរិបទដោយការគ្រប់គ្រង thread  
- 🔧 **លំនាំកំណត់រចនាប័ទ្ម**: អនុវត្តិល្អបំផុតសម្រាប់ការតំឡើង និងគ្រប់គ្រងភ្នាក់ងារ​នៅក្នុង .NET

## 🎯 គំនិតសំខាន់ដែលបានគ្របដណ្តប់

### គោលការណ៍នៃមូលដ្ឋានភ្នាក់ងារ

- **Autonomy**: របៀបដែលភ្នាក់ងារ​ធ្វើសេចក្តីសម្រេចដោយឯករាជ្យ ដោយប្រើ abstraction នៃ AI ក្នុង .NET  
- **Reactivity**: ឆ្លើយតបទៅនឹងការផ្លាស់ប្តូរបរិស្ថាន និងការបញ្ចូលពីអ្នកប្រើ  
- **Proactivity**: ធ្វើជាសកម្មភាពដើមដោយផ្អែកលើគោលដៅ និងបរិបទ  
- **Social Ability**: ធ្វើអន្តរកម្មតាមភាសាធម្មជាតិនិង thread នៃការសន្ទនា

### សមាសភាគបច្ចេកទេស

- **AIAgent**: ការត្រួតត្រាភ្នាក់ងារ និងការគ្រប់គ្រងការសន្ទនា ជាចម្បង (.NET)  
- **Tool Functions**: ពង្រីកសមត្ថភាពភ្នាក់ងារជាមួយវិធីសាស្ត្រ និង attributes របស់ C#  
- **OpenAI Integration**: ប្រើម៉ូឌែលភាសាតាមរយៈ API តាមស្តង់ដារ .NET  
- **Secure Configuration**: ការគ្រប់គ្រងកូនសោ API ដោយផ្អែកលើ​បរិយាកាស

## 🔧 សំណុំបច្ចេកវិទ្យា

### បច្ចេកវិទ្យាមូលដ្ឋាន

- Microsoft Agent Framework (.NET)  
- ការរួមបញ្ចូល GitHub Models API  
- គំរូ client ដែលសមស្របជាមួយ OpenAI  
- ការកំណត់តាមបរិយាកាសជាមួយ DotNetEnv

### សមត្ថភាពរបស់ភ្នាក់ងារ

- ការយល់ និងបង្កើតភាសាធម្មជាតិ  
- ការហៅមុខងារ និងការប្រើឧបករណ៍ជាមួយ attributes នៃ C#  
- ការឆ្លើយតបដែលយល់ពីបរិបទជាមួយ thread នៃការសន្ទនា  
- ស្ថាបត្យកម្មដែលពង្រីកបានជាមួយលំនាំ dependency injection

## 📚 ការប្រៀបធៀប Framework

ឧទាហរណ៍នេះបង្ហាញពីវិធាន Microsoft Agent Framework នៅក្នុងការប្រៀបធៀបជាមួយ frameworks ផ្សេងៗ:

| Feature | Microsoft Agent Framework | Other Frameworks |
|---------|-------------------------|------------------|
| **Integration** | Native Microsoft ecosystem | Varied compatibility |
| **Simplicity** | Clean, intuitive API | Often complex setup |
| **Extensibility** | Easy tool integration | Framework-dependent |
| **Enterprise Ready** | Built for production | Varies by framework |

## 🚀 ការចាប់ផ្ដើម

### តម្រូវការ​ដំបូង

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ឬកាន់តែថ្មីជាងនេះ  
- [កូនសោចូលប្រើ GitHub Models API](https://docs.github.com/github-models/github-models-at-scale/using-your-own-api-keys-in-github-models)

### អថេរបរិយាកាសដែលត្រូវការ

```bash
# zsh/bash
export GH_TOKEN=<your_github_token>
export GH_ENDPOINT=https://models.github.ai/inference
export GH_MODEL_ID=openai/gpt-5-mini
```

```powershell
# PowerShell
$env:GH_TOKEN = "<your_github_token>"
$env:GH_ENDPOINT = "https://models.github.ai/inference"
$env:GH_MODEL_ID = "openai/gpt-5-mini"
```

### កូដឧទាហរណ៍

ដើម្បីរត់ឧទាហរណ៍កូដ,

```bash
# zsh/bash
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

រឺប្រើ dotnet CLI:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

មើល [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs) សម្រាប់កូដពេញលេញ។

```csharp
#!/usr/bin/dotnet run

#:package Microsoft.Extensions.AI@10.*
#:package Microsoft.Agents.AI.OpenAI@1.*-*

using System.ClientModel;
using System.ComponentModel;

using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

using OpenAI;

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

// Extract configuration from environment variables
// Retrieve the GitHub Models API endpoint, defaults to https://models.github.ai/inference if not specified
// Retrieve the model ID, defaults to openai/gpt-5-mini if not specified
// Retrieve the GitHub token for authentication, throws exception if not specified
var github_endpoint = Environment.GetEnvironmentVariable("GH_ENDPOINT") ?? "https://models.github.ai/inference";
var github_model_id = Environment.GetEnvironmentVariable("GH_MODEL_ID") ?? "openai/gpt-5-mini";
var github_token = Environment.GetEnvironmentVariable("GH_TOKEN") ?? throw new InvalidOperationException("GH_TOKEN is not set.");

// Configure OpenAI Client Options
// Create configuration options to point to GitHub Models endpoint
// This redirects OpenAI client calls to GitHub's model inference service
var openAIOptions = new OpenAIClientOptions()
{
    Endpoint = new Uri(github_endpoint)
};

// Initialize OpenAI Client with GitHub Models Configuration
// Create OpenAI client using GitHub token for authentication
// Configure it to use GitHub Models endpoint instead of OpenAI directly
var openAIClient = new OpenAIClient(new ApiKeyCredential(github_token), openAIOptions);

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
// Initialize complete agent pipeline: OpenAI client → Chat client → AI agent
// Configure agent with name, detailed instructions, and available tools
// This demonstrates the .NET agent creation pattern with full configuration
AIAgent agent = openAIClient
    .GetChatClient(github_model_id)
    .CreateAIAgent(
        name: AGENT_NAME,
        instructions: AGENT_INSTRUCTIONS,
        tools: [AIFunctionFactory.Create(GetRandomDestination)]
    );

// Create New Conversation Thread for Context Management
// Initialize a new conversation thread to maintain context across multiple interactions
// Threads enable the agent to remember previous exchanges and maintain conversational state
// This is essential for multi-turn conversations and contextual understanding
AgentThread thread = agent.GetNewThread();

// Execute Agent: First Travel Planning Request
// Run the agent with an initial request that will likely trigger the random destination tool
// The agent will analyze the request, use the GetRandomDestination tool, and create an itinerary
// Using the thread parameter maintains conversation context for subsequent interactions
await foreach (var update in agent.RunStreamingAsync("Plan me a day trip", thread))
{
    await Task.Delay(10);
    Console.Write(update);
}

Console.WriteLine();

// Execute Agent: Follow-up Request with Context Awareness
// Demonstrate contextual conversation by referencing the previous response
// The agent remembers the previous destination suggestion and will provide an alternative
// This showcases the power of conversation threads and contextual understanding in .NET agents
await foreach (var update in agent.RunStreamingAsync("I don't like that destination. Plan me another vacation.", thread))
{
    await Task.Delay(10);
    Console.Write(update);
}
```

## 🎓 ចំណុចសំខាន់ដែលយកចិត្តទុកដាក់

1. **Agent Architecture**: Microsoft Agent Framework ផ្ដល់វិធីសាស្ត្រស្អាត និងមានប្រភេទសុវត្ថិភាពក្នុងការកសាងភ្នាក់ងារ AI ក្នុង .NET  
2. **Tool Integration**: មុខងារ​ដែលត្រូវបានតុបតែងជាមួយ attributes `[Description]` នឹងក្លាយជា​ឧបករណ៍ដែលភ្នាក់ងារអាចប្រើបាន  
3. **Conversation Context**: ការគ្រប់គ្រង thread អាចអនុញ្ញាតឱ្យមានការសន្ទនាច្រើនជុំ ដោយមានការយល់ដឹងពេញលេញពីបរិបទ  
4. **Configuration Management**: អថេរបរិយាកាស និងការគ្រប់គ្រងសម្គាល់សុវត្ថិភាព អនុវត្តតាមអនុវត្តិល្អបំផុតរបស់ .NET  
5. **OpenAI Compatibility**: ការរួមបញ្ចូល GitHub Models ធ្វើការងារយ៉ាងរលូនតាមរយៈ API ដែលសមស្របជាមួយ OpenAI

## 🔗 ធនធានបន្ថែម

- [ឯកសារ Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)  
- [ទីផ្សារ GitHub Models](https://github.com/marketplace?type=models)  
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)  
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការមិនទទួលខុសត្រូវ**:
ឯកសារនេះត្រូវបានបកប្រែដោយប្រើសេវាកម្មបកប្រែ AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះបីយើងខិតខំប្រឹងប្រែងក្នុងការធានាថាត្រឹមត្រូវក៏ដោយ សូមយល់ថាការបកប្រែដោយស្វ័យប្រវត្តិអាចមានកំហុស ឬភាពមិនត្រឹមត្រូវបាន។ ឯកសារដើមនៅក្នុងភាសាដើមគួរត្រូវបានចាត់ទុកជាឯកសារយោងដែលមានសុពលភាព។ សម្រាប់ព័ត៌មានសំខាន់ណាស់ បានណែនាំឲ្យប្រើការបកប្រែដោយអ្នកបកប្រែវិជ្ជាជីវៈ។ យើងមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកសម្រាយខុសណាមួយដែលកើតឡើងពីការប្រើប្រាស់ការបកប្រែនេះឡើយ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->