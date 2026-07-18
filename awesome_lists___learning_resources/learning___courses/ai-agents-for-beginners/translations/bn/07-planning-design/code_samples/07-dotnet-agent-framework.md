# 🎯 Azure OpenAI (Responses API) সহ পরিকল্পনা এবং ডিজাইন প্যাটার্নস (.NET)

## 📋 শেখার লক্ষ্যসমূহ

এই নোটবুকটি মাইক্রোসফট এজেন্ট ফ্রেমওয়ার্ক ব্যবহার করে .NET এ Azure OpenAI (Responses API)-এর মাধ্যমে বুদ্ধিমান এজেন্ট তৈরির জন্য এন্টারপ্রাইজ-গ্রেড পরিকল্পনা এবং ডিজাইন প্যাটার্ন দেখায়। আপনি শিখবেন কীভাবে এমন এজেন্ট তৈরি করবেন যা জটিল সমস্যাগুলি ভেঙে ফেলতে পারে, বহু-ধাপ সমাধান পরিকল্পনা করতে পারে এবং .NET-এর এন্টারপ্রাইজ ফিচারগুলোর মাধ্যমে উন্নত ওয়ার্কফ্লো সম্পাদন করতে পারে।

## ⚙️ প্রয়োজনীয়তা ও সেটআপ

**ডেভেলপমেন্ট পরিবেশ:**
- .NET 9.0 SDK অথবা তার উপরে
- Visual Studio 2022 অথবা C# এক্সটেনশনসহ VS Code
- Azure OpenAI রিসোর্স এবং মডেল ডিপ্লয়মেন্ট সহ একটি Azure সাবস্ক্রিপশন
- Azure CLI — `az login` দিয়ে সাইন ইন করুন

**প্রয়োজনীয় নির্ভরশীলতা:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**পরিবেশ কনফিগারেশন (.env ফাইল):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## কোড চালানো

এই লেসনে একটি .NET সিঙ্গল ফাইল অ্যাপ ইমপ্লিমেন্টেশন অন্তর্ভুক্ত আছে। এটি চালাতে:

```bash
# ফাইলটিকে নির্বাহযোগ্য করুন (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# অ্যাপ্লিকেশন চালান
./07-dotnet-agent-framework.cs
```

অথবা dotnet run কমান্ড ব্যবহার করুন:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## কোড ইমপ্লিমেন্টেশন

সম্পূর্ণ ইমপ্লিমেন্টেশন `07-dotnet-agent-framework.cs` ফাইলে পাওয়া যাবে, যা প্রদর্শন করে:

- DotNetEnv ব্যবহার করে পরিবেশ কনফিগারেশন লোডিং
- Azure OpenAI ক্লায়েন্ট কনফিগারেশন এবং `GetChatClient().AsAIAgent()` ব্যবহার করে AI এজেন্ট তৈরি
- JSON সিরিয়ালাইজেশনসহ স্ট্রাকচার্ড ডেটা মডেল (Plan এবং TravelPlan) সংজ্ঞায়িতকরণ
- JSON স্কিমা ব্যবহার করে স্ট্রাকচার্ড আউটপুট সহ AI এজেন্ট তৈরি
- টাইপ-সেফ রেসপন্স সহ পরিকল্পনা অনুরোধ সম্পাদন

## মূল ধারণাসমূহ

### টাইপ-সেফ মডেলস সহ স্ট্রাকচার্ড পরিকল্পনা

এজেন্ট পরিকল্পনার আউটপুটের কাঠামো সংজ্ঞায়িত করতে C# ক্লাস ব্যবহার করে:

```csharp
public class Plan
{
    [JsonPropertyName("assigned_agent")]
    public string? Assigned_agent { get; set; }

    [JsonPropertyName("task_details")]
    public string? Task_details { get; set; }
}

public class TravelPlan
{
    [JsonPropertyName("main_task")]
    public string? Main_task { get; set; }

    [JsonPropertyName("subtasks")]
    public IList<Plan> Subtasks { get; set; }
}
```

### স্ট্রাকচার্ড আউটপুটের জন্য JSON স্কিমা

এজেন্টকে TravelPlan স্কিমার সাথে মিলে এমন রেসপন্স ফেরত দেওয়ার জন্য কনফিগার করা হয়েছে:

```csharp
ChatClientAgentOptions agentOptions = new()
{
    Name = AGENT_NAME,
    Description = AGENT_INSTRUCTIONS,
    ChatOptions = new()
    {
        ResponseFormat = ChatResponseFormatJson.ForJsonSchema(
            schema: AIJsonUtilities.CreateJsonSchema(typeof(TravelPlan)),
            schemaName: "TravelPlan",
            schemaDescription: "Travel Plan with main_task and subtasks")
    }
};
```

### পরিকল্পনা এজেন্ট নির্দেশিকা

এজেন্ট সমন্বয়কারী হিসেবে কাজ করে, বিশেষায়িত সাব-এজেন্টদের কাছে টাস্ক প্রেরণ করে:

- FlightBooking: ফ্লাইট বুকিং এবং ফ্লাইট তথ্য প্রদান করার জন্য
- HotelBooking: হোটেল বুকিং এবং হোটেল তথ্য দেওয়ার জন্য
- CarRental: কার বুকিং এবং কার রেন্টাল তথ্যের জন্য
- ActivitiesBooking: কার্যক্রম বুকিং এবং তথ্য প্রদানের জন্য
- DestinationInfo: গন্তব্যস্থলের তথ্য প্রদানের জন্য
- DefaultAgent: সাধারণ অনুরোধ পরিচালনার জন্য

## প্রত্যাশিত আউটপুট

যখন আপনি একটি ভ্রমণ পরিকল্পনার অনুরোধ নিয়ে এজেন্ট চালাবেন, তখন এটি অনুরোধটি বিশ্লেষণ করবে এবং TravelPlan স্কিমার সাথে সঙ্গতিপূর্ণ JSON আকারে উপযুক্ত কাজ বরাদ্দ সহ একটি স্ট্রাকচার্ড পরিকল্পনা তৈরি করবে।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->