# 🔍 মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক অন্বেষণ - বেসিক এজেন্ট (.NET)

## 📋 শেখার উদ্দেশ্য

এই উদাহরণটি .NET এ একটি বেসিক এজেন্ট বাস্তবায়নের মাধ্যমে মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক এর মৌলিক ধারণাগুলি অন্বেষণ করে। আপনি মূল এজেন্টিক প্যাটার্নগুলি শিখবেন এবং C# ও .NET ইকোসিস্টেম ব্যবহার করে বুদ্ধিমান এজেন্টগুলি কীভাবে কাজ করে তা বুঝতে পারবেন।

### আপনি কী আবিষ্কার করবেন

- 🏗️ **এজেন্ট আর্কিটেকচার**: .NET এ AI এজেন্টগুলির মৌলিক গঠন বোঝা  
- 🛠️ **টুল ইন্টিগ্রেশন**: এজেন্টগুলি কীভাবে বাহ্যিক ফাংশন ব্যবহার করে ক্ষমতা বৃদ্ধি করে  
- 💬 **আলোচনা প্রবাহ**: থ্রেড ব্যবস্থাপনার মাধ্যমে বহু-বার্তালাপ ও প্রসঙ্গ পরিচালনা  
- 🔧 **কনফিগারেশন প্যাটার্নস**: .NET এ এজেন্ট সেটআপ ও ব্যবস্থাপনার সেরা অনুশীলন  

## 🎯 আলোচিত মূল ধারণাসমূহ

### এজেন্টিক ফ্রেমওয়ার্ক নীতি

- **স্বায়ত্তশাসন**: .NET AI বিমূর্তকরণের মাধ্যমে এজেন্ট কিভাবে স্বাধীন সিদ্ধান্ত নেয়  
- **প্রতিক্রিয়াশীলতা**: পরিবেশগত পরিবর্তন এবং ব্যবহারকারী ইনপুটে সাড়া দেওয়া  
- **সক্রিয়তা**: লক্ষ্য এবং প্রসঙ্গ অনুসারে উদ্যোগ নেওয়া  
- **সামাজিক ক্ষমতা**: প্রাকৃতিক ভাষায় কথোপকথন থ্রেডের মাধ্যমে ইন্টারঅ্যাকশন  

### প্রযুক্তিগত উপাদান

- **AIAgent**: কোর এজেন্ট অর্কেস্ট্রেশন ও কথোপকথন ব্যবস্থাপনা (.NET)  
- **টুল ফাংশনস**: C# মেথড ও অ্যাট্রিবিউট দিয়ে এজেন্টের ক্ষমতা সম্প্রসারণ  
- **Azure OpenAI ইন্টিগ্রেশন**: Azure OpenAI Responses API এর মাধ্যমে ভাষা মডেল ব্যবহার  
- **সুরক্ষিত কনফিগারেশন**: পরিবেশ-ভিত্তিক এন্ডপয়েন্ট ব্যবস্থাপনা  

## 🔧 প্রযুক্তিগত স্ট্যাক

### কোর প্রযুক্তি

- Microsoft Agent Framework (.NET)  
- Azure OpenAI (Responses API) ইন্টিগ্রেশন  
- Azure.AI.OpenAI ক্লায়েন্ট প্যাটার্ন  
- DotNetEnv দিয়ে পরিবেশ-ভিত্তিক কনফিগারেশন  

### এজেন্ট ক্ষমতা

- প্রাকৃতিক ভাষা বোঝা ও প্রজন্ম  
- C# অ্যাট্রিবিউটের মাধ্যমে ফাংশন কলিং ও টুল ব্যবহার  
- কথোপকথন সেশনসমূহের সাথে প্রসঙ্গ-সচেতন প্রতিক্রিয়া  
- ডিপেনডেন্সি ইনজেকশন প্যাটার্ন দিয়ে সম্প্রসারিতযোগ্য আর্কিটেকচার  

## 📚 ফ্রেমওয়ার্ক তুলনা

এই উদাহরণটি অন্যান্য এজেন্টিক ফ্রেমওয়ার্কের তুলনায় মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক পদ্ধতি প্রদর্শন করে:

| বৈশিষ্ট্য | Microsoft Agent Framework | অন্যান্য ফ্রেমওয়ার্ক |
|---------|-------------------------|------------------|
| **ইন্টিগ্রেশন** | নেটিভ মাইক্রোসফ্ট ইকোসিস্টেম | বিভিন্ন সামঞ্জস্যতা |
| **সরলতা** | পরিষ্কার, সহজবোধ্য API | প্রায়ই জটিল সেটআপ |
| **সম্প্রসারণযোগ্যতা** | সহজ টুল ইন্টিগ্রেশন | ফ্রেমওয়ার্ক-নির্ভর |
| **এন্টারপ্রাইজ প্রস্তুত** | উৎপাদনের জন্য নির্মিত | ফ্রেমওয়ার্ক অনুযায়ী পরিবর্তিত |

## 🚀 শুরু করা

### প্রয়োজনীয় শর্তাবলী

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) অথবা উপরের সংস্করণ  
- একটি [Azure সাবস্ক্রিপশন](https://azure.microsoft.com/free/) যেখানে একটি Azure OpenAI রিসোর্স এবং একটি মডেল ডিপ্লয়মেন্ট আছে  
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` দিয়ে সাইন ইন করুন  

### প্রয়োজনীয় পরিবেশ ভেরিয়েবল

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# তারপর সাইন ইন করুন যাতে AzureCliCredential একটি টোকেন পেতে পারে
az login
```

```powershell
# পাওয়ারশেল
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# তারপর সাইন ইন করুন যাতে AzureCliCredential একটি টোকেন পেতে পারে
az login
```

### নমুনা কোড

কোড উদাহরণ চালাতে,

```bash
# জেডএসএইচ/ব্যাশ
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

অথবা dotnet CLI ব্যবহার করে:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

সম্পূর্ণ কোডের জন্য দেখে নিন [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs)

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

## 🎓 মূল শিক্ষা

1. **এজেন্ট আর্কিটেকচার**: মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক .NET এ AI এজেন্ট তৈরি করার জন্য একটি পরিষ্কার, টাইপ-সেফ পন্থা প্রদান করে  
2. **টুল ইন্টিগ্রেশন**: `[Description]` অ্যাট্রিবিউট দিয়ে সজ্জিত ফাংশনগুলি এজেন্টের উপলভ্য টুলে পরিনত হয়  
3. **আলোচনা প্রসঙ্গ**: সেশন ব্যবস্থাপনা পূর্ণ প্রসঙ্গ সচেতনতার সাথে বহু-বার্তালাপ সক্ষম করে  
4. **কনফিগারেশন ব্যবস্থাপনা**: পরিবেশ ভেরিয়েবল ও নিরাপদ ক্রেডেনশিয়াল হ্যান্ডলিং .NET এর সেরা অনুশীলন অনুসরণ করে  
5. **Azure OpenAI Responses API**: এজেন্ট Azure.AI.OpenAI SDK এর মাধ্যমে Azure OpenAI Responses API ব্যবহার করে  

## 🔗 অতিরিক্ত সম্পদ

- [Microsoft Agent Framework ডকুমেন্টেশন](https://learn.microsoft.com/agent-framework)  
- [Microsoft Foundry তে Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/)  
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)  
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->