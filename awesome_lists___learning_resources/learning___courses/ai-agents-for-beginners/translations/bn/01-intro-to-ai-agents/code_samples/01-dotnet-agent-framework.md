# 🌍 মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক (.NET) সহ AI ট্রাভেল এজেন্ট

## 📋 পরিস্থিতির সংক্ষিপ্ত বিবরণ

এই উদাহরণটি দেখায় কীভাবে .NET-এর জন্য মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক ব্যবহার করে একটি বুদ্ধিমান ট্রাভেল পরিকল্পনা এজেন্ট তৈরি করা যায়। এজেন্টটি বিশ্বব্যাপী বিভিন্ন গন্তব্যের জন্য স্বয়ংক্রিয়ভাবে ব্যক্তিগতকৃত একদিনের ভ্রমণের পরিকল্পনা তৈরি করতে পারে।

### প্রধান সক্ষমতাসমূহ:

- 🎲 **স随机 গন্তব্য নির্বাচন**: ছুটির স্থান নির্বাচন করার জন্য একটি কাস্টম টুল ব্যবহার করে
- 🗺️ **বুদ্ধিমান সফর পরিকল্পনা**: দিনের ভিত্তিতে বিস্তারিত ভ্রমণসূচি তৈরি করে
- 🔄 **রিয়েল-টাইম স্ট্রিমিং**: সঙ্গে সঙ্গে এবং স্ট্রিমিং উভয় প্রতিক্রিয়া সমর্থন করে
- 🛠️ **কাস্টম টুল ইন্টিগ্রেশন**: এজেন্টের সক্ষমতা বৃদ্ধির উপায় দেখায়

## 🔧 প্রযুক্তিগত আর্কিটেকচার

### মূল প্রযুক্তি

- **মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক**: AI এজেন্ট উন্নয়নের জন্য সর্বশেষ .NET বাস্তবায়ন
- **আজুর ওপেনএআই (Responses API)**: মডেল ইন্সফারেন্সের জন্য আজুর ওপেনএআই Responses API ব্যবহার
- **আজুর আইডেন্টিটি**: `AzureCliCredential` (`az login`) দ্বারা নিরাপদ সাইন-ইন
- **নিরাপদ কনফিগারেশন**: পরিবেশ-ভিত্তিক এন্ডপয়েন্ট ব্যবস্থাপনা

### মূল উপাদানসমূহ

1. **AIAgent**: প্রধান এজেন্ট অর্কেস্ট্রেটর যা কথোপকথনের প্রবাহ নিয়ন্ত্রণ করে
2. **কাস্টম টুলস**: এজেন্টের জন্য উপলব্ধ `GetRandomDestination()` ফাংশন
3. **Responses ক্লায়েন্ট**: আজুর ওপেনএআই Responses-ভিত্তিক কথোপকথন ইন্টারফেস
4. **স্ট্রিমিং সমর্থন**: রিয়েল-টাইম প্রতিক্রিয়া তৈরি সক্ষমতা

### ইন্টিগ্রেশনের ধরণ

```mermaid
graph LR
    A[ব্যবহারকারী অনুরোধ] --> B[এআই এজেন্ট]
    B --> C[আজুর ওপেনএআই (প্রতিক্রিয়া এপিআই)]
    B --> D[GetRandomDestination টুল]
    C --> E[ভ্রমণ সময়সূচী]
    D --> E
```

## 🚀 শুরু করুন

### প্রয়োজনীয়তা

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) বা তার উপরে
- আজুর ওপেনএআই রিসোর্স এবং মডেল ডিপ্লয়মেন্ট সহ একটি [আজুর সাবস্ক্রিপশন](https://azure.microsoft.com/free/)
- [আজুর CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — `az login` দিয়ে সাইন ইন করুন

### প্রয়োজনীয় পরিবেশ পরিবর্তনশীলসমূহ

```bash
# জেডএসএইচ/ব্যাশ
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# এরপর সাইন ইন করুন যাতে AzureCliCredential একটি টোকেন পেতে পারে
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

কোড উদাহরণ চালানোর জন্য,

```bash
# জিএসএইচ/বাশ
chmod +x ./01-dotnet-agent-framework.cs
./01-dotnet-agent-framework.cs
```

অথবা dotnet CLI ব্যবহার করে:

```bash
dotnet run ./01-dotnet-agent-framework.cs
```

সম্পূর্ণ কোডের জন্য দেখুন [`01-dotnet-agent-framework.cs`](../../../../01-intro-to-ai-agents/code_samples/01-dotnet-agent-framework.cs)।

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

## 🎓 প্রধান শেখার বিষয়সমূহ

1. **এজেন্ট আর্কিটেকচার**: মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক .NET-এ AI এজেন্ট তৈরি করার জন্য একটি পরিষ্কার, টাইপ-সেফ পদ্ধতি প্রদান করে
2. **টুল ইন্টিগ্রেশন**: `[Description]` বৈশিষ্ট্যযুক্ত ফাংশনগুলো এজেন্টের জন্য উপলব্ধ টুল হিসেবে পরিণত হয়
3. **কনফিগারেশন ব্যবস্থাপনা**: পরিবেশ পরিবর্তনশীল এবং নিরাপদ প্রমাণীকরণ পরিচালনা .NET-এর সেরা প্রক্রিয়াগুলো অনুসরণ করে
4. **আজুর ওপেনএআই Responses API**: এজেন্টটি Azure.AI.OpenAI SDK এর মাধ্যমে আজুর ওপেনএআই Responses API ব্যবহার করে

## 🔗 অতিরিক্ত রিসোর্স

- [মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক ডকুমেন্টেশন](https://learn.microsoft.com/agent-framework)
- [মাইক্রোসফ্ট ফাউন্ড্রিতে আজুর ওপেনএআই](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET সিঙ্গেল ফাইল অ্যাপস](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->