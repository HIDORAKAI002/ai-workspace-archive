> [অপ্রচলিত: ২০২৬-০৭-২৮ রিলিজ প্রার্থী](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# মডেল কন্টেক্সট প্রোটোকলে স্যাম্পলিং

> **অপ্রচলিতকারী নোটিশ:** `২০২৬-০৭-২৮` MCP স্পেসিফিকেশন রিলিজ প্রার্থী সরাসরি এলএলএম প্রদানকারী এপিআই-র সাথে ইন্টিগ্রেশনের পক্ষে স্যাম্পলিং অপ্রচলিত হিসেবে চিহ্নিত করেছে। স্যাম্পলিং `২০২৫-১১-২৫` এ এবং যেকোনো আনুষ্ঠানিক অপ্রচলনের অন্তত এক বছর পর পর্যন্ত কাজ করবে, তাই এই পাঠে সবকিছু সঠিক আছে - কিন্তু নতুন সার্ভার ডিজাইন গুলো প্রতিস্থাপন প্যাটার্ন মূল্যায়ন করা উচিৎ। দেখুন [MCP-এ কী পরিবর্তন হচ্ছে: ২০২৬-০৭-২৮ রিলিজ প্রার্থী](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

স্যাম্পলিং একটি শক্তিশালী MCP বৈশিষ্ট্য যা সার্ভারগুলোকে ক্লায়েন্টের মাধ্যমে এলএলএম পরিপূরণের অনুরোধ করার অনুমতি দেয়, নিরাপত্তা ও গোপনীয়তা বজায় রেখে উন্নত এজেন্টিক আচরণ সক্ষম করে। সঠিক স্যাম্পলিং কনফিগারেশন উত্তর গুণমান এবং কার্যকারিতা নাটকীয়ভাবে বৃদ্ধি করতে পারে। MCP একটি মানকৃত উপায় প্রদান করে যাতে মডেলগুলি কীভাবে নির্দিষ্ট প্যারামিটার দিয়ে টেক্সট তৈরি করবে যা এলোমেলোতা, সৃজনশীলতা, এবং সামঞ্জস্যতাকে প্রভাবিত করে তা নিয়ন্ত্রণ করতে পারে।

## পরিচিতি

এই পাঠে, আমরা MCP অনুরোধগুলিতে স্যাম্পলিং প্যারামিটারগুলি কনফিগার করা এবং স্যাম্পলিংয়ের অন্তর্নিহিত প্রোটোকল কার্যপ্রণালী বোঝার চেষ্টা করব।

## শেখার লক্ষ্যসমূহ

এই পাঠের শেষ পর্যন্ত, আপনি সক্ষম হবেন:

- MCP-এ উপলব্ধ প্রধান স্যাম্পলিং প্যারামিটারগুলো বোঝা।
- বিভিন্ন ব্যবহারের জন্য স্যাম্পলিং প্যারামিটার কনফিগার করা।
- পুনরুত্পাদনযোগ্য ফলাফলের জন্য ডিটারমিনিস্টিক স্যাম্পলিং প্রয়োগ করা।
- প্রসঙ্গ এবং ব্যবহারকারীর পছন্দ অনুযায়ী স্যাম্পলিং প্যারামিটারগুলি গতিশীলভাবে সামঞ্জস্য করা।
- বিভিন্ন পরিস্থিতিতে মডেল পারফরম্যান্স উন্নত করতে স্যাম্পলিং কৌশল প্রয়োগ করা।
- MCP-এর ক্লায়েন্ট-সার্ভার প্রবাহে স্যাম্পলিং কীভাবে কাজ করে তা বোঝা।

## MCP-এ স্যাম্পলিং কিভাবে কাজ করে

MCP-তে স্যাম্পলিং প্রবাহ নিম্নলিখিত ধাপগুলি অনুসরণ করে:

1. সার্ভার ক্লায়েন্টকে একটি `sampling/createMessage` অনুরোধ পাঠায়
2. ক্লায়েন্ট অনুরোধ পর্যালোচনা করে এবং তা সংশোধন করতে পারে
3. ক্লায়েন্ট একটি এলএলএম থেকে স্যাম্পল করে
4. ক্লায়েন্ট পরিপূরণ পর্যালোচনা করে
5. ক্লায়েন্ট ফলাফল সার্ভারে ফেরত পাঠায়

এই মানব-ইন-দ্য-লুপ ডিজাইন নিশ্চিত করে ব্যবহারকারীরা এলএলএম কী দেখে এবং কী তৈরি করে তাতে নিয়ন্ত্রণ রাখেন।

## স্যাম্পলিং প্যারামিটার প্রারম্ভিক দৃশ্য

MCP নিম্নলিখিত স্যাম্পলিং প্যারামিটার সনাক্ত করে যা ক্লায়েন্ট অনুরোধে কনফিগার করা যায়:

| প্যারামিটার | বর্ণনা | সাধারণ পরিসর |
|-----------|-------------|---------------|
| `temperature` | টোকেন নির্বাচনে এলোমেলোতা নিয়ন্ত্রণ করে | 0.0 - 1.0 |
| `maxTokens` | সর্বোচ্চ টোকেন সংখ্যা তৈরি করার জন্য | পূর্ণসংখ্যা মান |
| `stopSequences` | নির্দিষ্ট সিকোয়েন্স যা পাওয়া গেলে উৎপাদন বন্ধ করে | স্ট্রিংগুলোর অ্যারে |
| `metadata` | অতিরিক্ত প্রদানকারী-নির্দিষ্ট প্যারামিটার | JSON অবজেক্ট |

অনেক এলএলএম প্রদানকারী `metadata` ক্ষেত্রের মাধ্যমে অতিরিক্ত প্যারামিটার সমর্থন করে, যা অন্তর্ভুক্ত হতে পারে:

| সাধারণ এক্সটেনশন প্যারামিটার | বর্ণনা | সাধারণ পরিসর |
|-----------|-------------|---------------|
| `top_p` | নিউক্লিয়াস স্যাম্পলিং - টোকেনগুলোকে শীর্ষ সমষ্টিগত সম্ভাবনার মধ্যে সীমাবদ্ধ করে | 0.0 - 1.0 |
| `top_k` | টোকেন নির্বাচনে শীর্ষ K বিকল্পে সীমাবদ্ধ করে | 1 - 100 |
| `presence_penalty` | টেক্সটের পূর্ববর্তী উপস্থিতির ভিত্তিতে টোকেনকে শাস্তি দেয় | -2.0 - 2.0 |
| `frequency_penalty` | টেক্সটের পূর্ববর্তী ফ্রিকোয়েন্সির ভিত্তিতে টোকেনের পুনরাবৃত্তি কমায় | -2.0 - 2.0 |
| `seed` | পুনরুত্পাদনযোগ্য ফলাফলের জন্য নির্দিষ্ট এলোমেলো সিড | পূর্ণসংখ্যা মান |

## উদাহরণ অনুরোধ বিন্যাস

ক্লায়েন্ট থেকে MCP-তে স্যাম্পলিং অনুরোধের একটি উদাহরণ এখানে:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## উত্তর বিন্যাস

ক্লায়েন্ট একটি পরিপূরণ ফলাফল ফেরত দেয়:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## মানব নিয়ন্ত্রণ

MCP স্যাম্পলিং মানব তদারকির কথা মাথায় রেখে ডিজাইন করা হয়েছে:

- **প্রম্পটের জন্য**:
  - ক্লায়েন্টদের উচিত ব্যবহারকারীদের প্রস্তাবিত প্রম্পট দেখানো
  - ব্যবহারকারীরা প্রম্পট পরিবর্তন বা প্রত্যাখ্যান করতে পাবে
  - সিস্টেম প্রম্পট ফিল্টার বা পরিবর্তনযোগ্য
  - প্রসঙ্গ অন্তর্ভুক্তি ক্লায়েন্ট দ্বারা নিয়ন্ত্রণ করা হয়

- **পরিপূরণের জন্য**:
  - ক্লায়েন্টদের উচিত ব্যবহারকারীদের পরিপূরণ দেখানো
  - ব্যবহারকারীরা পরিপূরণ পরিবর্তন বা প্রত্যাখ্যান করতে পারে
  - ক্লায়েন্টরা পরিপূরণ ফিল্টার বা পরিবর্তন করতে পারে
  - ব্যবহারকারীরা নিয়ন্ত্রণ করে মডেল কোনটি ব্যবহার হবে

এই নীতিমালা মাথায় রেখে, চলুন দেখি কিভাবে বিভিন্ন প্রোগ্রামিং ভাষায় সাধারণত সমর্থিত প্যারামিটারগুলোর ওপর ভিত্তি করে স্যাম্পলিং বাস্তবায়ন করা যায়।

## নিরাপত্তা বিবেচনা

MCP-তে স্যাম্পলিং বাস্তবায়নের সময়, নিচের নিরাপত্তা সেরা অনুশীলনগুলো বিবেচনা করুন:

- ক্লায়েন্টকে পাঠানোর আগে সব বার্তা বিষয়বস্তু যাচাই করুন
- প্রম্পট এবং পরিপূরণের থেকে সংবেদনশীল তথ্য পরিষ্কার করুন
- অপব্যবহার প্রতিরোধে রেট লিমিট বাস্তবায়ন করুন
- অস্বাভাবিক প্যাটার্নের জন্য স্যাম্পলিং ব্যবহার মনিটর করুন
- নিরাপদ প্রোটোকল ব্যবহার করে ডেটা এনক্রিপ্ট করুন
- প্রাসঙ্গিক বিধিমালা অনুযায়ী ব্যবহারকারীর ডেটা গোপনীয়তা পরিচালনা করুন
- সামঞ্জস্য ও নিরাপত্তার জন্য স্যাম্পলিং অনুরোধের অডিট করুন
- যথাযথ সীমা দিয়ে খরচ নিয়ন্ত্রণ করুন
- স্যাম্পলিং অনুরোধের জন্য টাইমআউট প্রয়োগ করুন
- মডেল ত্রুটিগুলো সুন্দরভাবে পরিচালনা করুন উপযুক্ত বিকল্প সহ

স্যাম্পলিং প্যারামিটারগুলি ভাষাগত মডেলের আচরণ সূক্ষ্মভাবে নিয়ন্ত্রণ করতে দেয়, যা ডিটারমিনিস্টিক এবং সৃজনশীল আউটপুটগুলোর মধ্যে পছন্দসই সমতা অর্জন করে।

চলুন দেখি বিভিন্ন প্রোগ্রামিং ভাষায় এই প্যারামিটার কিভাবে কনফিগার করা যায়।

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

পূর্ববর্তী কোডে আমরা:

- নির্দিষ্ট সার্ভার URL দিয়ে একটি MCP ক্লায়েন্ট তৈরি করেছি।
- `temperature`, `top_p`, এবং `top_k` মত স্যাম্পলিং প্যারামিটারসহ একটি অনুরোধ কনফিগার করেছি।
- অনুরোধ পাঠিয়েছি এবং তৈরি করা টেক্সট প্রিন্ট করেছি।
- ব্যবহার করেছি:
    - `allowedTools` মডেলকে কোন কোন টুল ব্যবহারের অনুমতি দিতে হবে নির্ধারণ করতে। এখানে আমরা `ideaGenerator` এবং `marketAnalyzer` টুলগুলোকে সৃজনশীল অ্যাপ আইডিয়া তৈরিতে সাহায্য করার জন্য অনুমতি দিয়েছি।
    - `frequencyPenalty` এবং `presencePenalty` পুনরাবৃত্তি এবং বৈচিত্র্য নিয়ন্ত্রণের জন্য।
    - `temperature` আউটপুটের এলোমেলোতা নিয়ন্ত্রণের জন্য, যেখানে উচ্চ মান বেশি সৃজনশীল উত্তর দেয়।
    - `top_p` টোকেন নির্বাচনের সীমা নির্ধারণ করে, যা শীর্ষ সমষ্টিগত সম্ভাবনাময় টোকেনগুলোকে অন্তর্ভুক্ত করে, এতে উৎপাদিত টেক্সটের মান উন্নত হয়।
    - `top_k` মডেলকে শীর্ষ K সম্ভাব্য টোকেনে সীমাবদ্ধ করে, যা আরো সামঞ্জস্যপূর্ণ উত্তর তৈরি করতে সাহায্য করে।
    - `frequencyPenalty` এবং `presencePenalty` পুনরাবৃত্তি কমাতে এবং বৈচিত্র্য উৎসাহিত করে।

# [JavaScript](#tab/javascript)

```javascript
// জাভাস্ক্রিপ্ট উদাহরণ: তাপমাত্রা এবং টপ-প স্যাম্পলিং কনফিগারেশন
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // এমসিপি ক্লায়েন্ট শুরু করুন
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // বিভিন্ন স্যাম্পলিং প্যারামিটার দিয়ে অনুরোধ কনফিগার করুন
  const creativeSampling = {
    temperature: 0.9,    // উচ্চ তাপমাত্রা = বেশি এলোমেলোতা/সৃজনশীলতা
    topP: 0.92,          // টপ ৯২% সম্ভাব্যতা ভরের সাথে টোকেন বিবেচনা করুন
    frequencyPenalty: 0.6, // টোকেন সিকোয়েন্সের পুনরাবৃত্তি কমান
    presencePenalty: 0.4   // টোকেনগুলিকে মূল্যায়ন করুন যেগুলি এখন পর্যন্ত টেক্সটে উপস্থিত হয়েছে
  };
  
  const factualSampling = {
    temperature: 0.2,    // কম তাপমাত্রা = বেশি সিদ্ধান্তমূলক/তথ্যসমৃদ্ধ
    topP: 0.85,          // সামান্য বেশি ফোকাসড টোকেন নির্বাচন
    frequencyPenalty: 0.2, // ন্যূনতম পুনরাবৃত্তি শাস্তি
    presencePenalty: 0.1   // ন্যূনতম উপস্থিতি শাস্তি
  };
  
  try {
    // দুইটি অনুরোধ পাঠান বিভিন্ন স্যাম্পলিং কনফিগারেশন নিয়ে
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

পূর্ববর্তী কোডে আমরা:

- একটি MCP ক্লায়েন্ট সার্ভার URL ও API কী সহ ইনিশিয়ালাইজ করেছি।
- দুটি সেট স্যাম্পলিং প্যারামিটার কনফিগার করেছি: একটি সৃজনশীল কাজের জন্য এবং অন্যটি তথ্য-ভিত্তিক কাজের জন্য।
- এই কনফিগারেশন সহ অনুরোধ পাঠিয়েছি, মডেলকে প্রতিটি কাজের জন্য নির্দিষ্ট টুল ব্যবহারের অনুমতি দিয়ে।
- বিভিন্ন স্যাম্পলিং প্যারামিটারের প্রভাব প্রদর্শনের জন্য তৈরি উত্তরের প্রিন্ট করেছি।
- `allowedTools` ব্যবহার করেছি যা টুলগুলো মডেল জেনারেশনের সময় ব্যবহার করতে পারে তা নির্দিষ্ট করে। এখানে সৃজনশীল কাজের জন্য `ideaGenerator` এবং `environmentalImpactTool`, এবং তথ্যমূলক কাজের জন্য `factChecker` এবং `dataAnalysisTool` ব্যবহার করেছি।
- `temperature` ব্যবহার করেছি আউটপুটের এলোমেলোতা নিয়ন্ত্রণের জন্য, উচ্চ মান বেশি সৃজনশীল উত্তর দেয়।
- `top_p` ব্যবহার করেছি নির্বাচিত টোকেনগুলোকে শীর্ষ সম্ভাবনাযুক্ত টোকেনে সীমাবদ্ধ করার জন্য, এতে উৎপাদিত টেক্সটের মান উন্নতি হয়।
- `frequencyPenalty` এবং `presencePenalty` ব্যবহার করেছি পুনরাবৃত্তি কমাতে এবং আউটপুটে বৈচিত্র্য উৎসাহিত করতে।
- `top_k` ব্যবহার করেছি মডেলকে শীর্ষ K সম্ভাবনাযুক্ত টোকেনের মধ্যে সীমাবদ্ধ করতে, যা সামঞ্জস্যপূর্ণ উত্তর তৈরিতে সাহায্য করে।

---

## ডিটারমিনিস্টিক স্যাম্পলিং

ধারাবাহিক আউটপুট প্রয়োজন এমন অ্যাপ্লিকেশনগুলোর জন্য, ডিটারমিনিস্টিক স্যাম্পলিং পুনরুত্পাদনযোগ্য ফলাফল নিশ্চিত করে। এটি করে একটি নির্দিষ্ট এলোমেলো সিড ব্যবহার করে এবং তাপমাত্রা শূন্যে সেট করে।

বিভিন্ন প্রোগ্রামিং ভাষায় ডিটারমিনিস্টিক স্যাম্পলিং প্রদর্শনের জন্য নিচের উদাহরণ দেখুন।

# [Java](#tab/java)

```java
// জাভা উদাহরণ: নির্দিষ্ট ফলাফলের জন্য স্থির সীড সহ
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // নির্ধারিত ফলাফলের জন্য স্থির সীড ব্যবহার করা হচ্ছে
        
        // স্থির সীড সহ প্রথম অনুরোধ
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // সর্বোচ্চ নির্ধারিততার জন্য জিরো তাপমাত্রা
            .build();
            
        // একই সীড সহ দ্বিতীয় অনুরোধ
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // উভয় অনুরোধ কার্যকর করুন
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // একই সীড এবং তাপমাত্রা=০ থাকার কারণে প্রতিক্রিয়াগুলি অভিন্ন হওয়া উচিত
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

পূর্ববর্তী কোডে আমরা:

- নির্দিষ্ট সার্ভার URL সহ একটি MCP ক্লায়েন্ট তৈরি করেছি।
- একই প্রম্পট, নির্দিষ্ট সিড, এবং শূন্য তাপমাত্রা সহ দুটি অনুরোধ কনফিগার করেছি।
- উভয় অনুরোধ পাঠিয়েছি এবং তৈরি টেক্সট প্রিন্ট করেছি।
- দেখিয়েছি যে প্রতিক্রিয়াগুলো একই কারণ ডিটারমিনিস্টিক স্যাম্পলিং কনফিগারেশনের (একই সিড এবং তাপমাত্রা) কারণে।
- `setSeed` ব্যবহার করেছি নির্দিষ্ট এলোমেলো সিড দিতে, মডেল প্রতিবার একই ইনপুটের জন্য একই আউটপুট তৈরি করবে তা নিশ্চিত করতে।
- `temperature` শূন্যে সেট করেছি সর্বোচ্চ ডিটারমিনিজম নিশ্চিত করতে, অর্থাৎ মডেল সর্বদা সবচেয়ে সম্ভাবনাময় পরবর্তী টোকেন নির্বাচন করবে এলোমেলোর ঝুঁকি ছাড়াই।

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript উদাহরণ: বীজ নিয়ন্ত্রণ সহ নিশ্চিত প্রতিক্রিয়া
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // স্থির বীজ সহ প্রথম অনুরোধ
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // সর্বাধিক নিশ্চিততার জন্য শূন্য তাপমাত্রা
    });
    
    // একই বীজ এবং তাপমাত্রা সহ দ্বিতীয় অনুরোধ
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // ভিন্ন বীজ কিন্তু একই তাপমাত্রা সহ তৃতীয় অনুরোধ
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

পূর্ববর্তী কোডে আমরা:

- একটি MCP ক্লায়েন্ট সার্ভার URL সহ ইনিশিয়ালাইজ করেছি।
- একই প্রম্পট, নির্দিষ্ট সিড, এবং শূন্য তাপমাত্রা সহ দুটি অনুরোধ কনফিগার করেছি।
- উভয় অনুরোধ পাঠিয়েছি এবং তৈরি টেক্সট প্রিন্ট করেছি।
- দেখিয়েছি যে প্রতিক্রিয়াগুলো একই কারণ ডিটারমিনিস্টিক স্যাম্পলিং কনফিগারেশনের (একই সিড এবং তাপমাত্রা) কারণে।
- `seed` ব্যবহার করেছি নির্দিষ্ট এলোমেলো সিড দিতে, মডেল প্রতিবার একই ইনপুটের জন্য একই আউটপুট তৈরি করবে তা নিশ্চিত করতে।
- `temperature` শূন্যে সেট করেছি সর্বোচ্চ ডিটারমিনিজম নিশ্চিত করতে, অর্থাৎ মডেল সর্বদা সবচেয়ে সম্ভাবনাময় পরবর্তী টোকেন নির্বাচন করবে এলোমেলোর ঝুঁকি ছাড়াই।
- তৃতীয় অনুরোধের জন্য একটি ভিন্ন সিড ব্যবহার করেছি দেখানোর জন্য যে সিড পরিবর্তন করলে আলাদা আউটপুট পাওয়া যায়, একই প্রম্পট ও তাপমাত্রায়ও।

---

## গতিশীল স্যাম্পলিং কনফিগারেশন

বুদ্ধিমান স্যাম্পলিং প্রতিটি অনুরোধের প্রসঙ্গ এবং চাহিদা অনুযায়ী প্যারামিটার সামঞ্জস্য করে। এর মানে হলো কাজের ধরণ, ব্যবহারকারীর পছন্দ বা ঐতিহাসিক পারফরম্যান্স অনুযায়ী `temperature`, `top_p`, এবং শাস্তি প্যারামিটারগুলি গতিশীলভাবে পরিবর্তন করা।

চলুন দেখি বিভিন্ন প্রোগ্রামিং ভাষায় গতিশীল স্যাম্পলিং কিভাবে বাস্তবায়ন করা যায়।

# [Python](#tab/python)

```python
# পাইথন উদাহরণ: অনুরোধ প্রসঙ্গে ভিত্তি করে ডাইনামিক স্যাম্পলিং
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # বিভিন্ন কাজের ধরনের জন্য স্যাম্পলিং প্রিসেট নির্ধারণ করুন
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # বেস প্রিসেট নির্বাচন করুন
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # ব্যবহারকারীর পছন্দ অনুযায়ী সামঞ্জস্য করুন যদি দেওয়া থাকে
        if user_preferences:
            if "creativity_level" in user_preferences:
                # সৃজনশীলতা পছন্দ অনুযায়ী তাপমাত্রা স্কেল করুন (১-১০)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # প্রয়োজনীয় প্রতিক্রিয়া বৈচিত্র্যের ভিত্তিতে top_p সামঞ্জস্য করুন
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # কাস্টম স্যাম্পলিং প্যারামিটার সহ অনুরোধ তৈরি ও প্রেরণ করুন
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # স্বচ্ছতার জন্য স্যাম্পলিং মেটাডেটা সহ প্রতিক্রিয়া ফেরত দিন
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

পূর্ববর্তী কোডে আমরা:

- একটি `DynamicSamplingService` ক্লাস তৈরি করেছি যা অভিযোজিত স্যাম্পলিং পরিচালনা করে।
- বিভিন্ন কাজের ধরণের জন্য স্যাম্পলিং প্রিসেট সংজ্ঞায়িত করেছি (সৃজনশীল, তথ্যমূলক, কোড, বিশ্লেষণাত্মক)।
- কাজের ধরণের উপর ভিত্তি করে একটি বেস স্যাম্পলিং প্রিসেট নির্বাচন করেছি।
- ব্যবহারকারীর পছন্দ, যেমন সৃজনশীলতা স্তর এবং বৈচিত্র্যের উপর ভিত্তি করে স্যাম্পলিং প্যারামিটার সামঞ্জস্য করেছি।
- গতিশীলভাবে কনফিগার করা স্যাম্পলিং প্যারামিটারসহ অনুরোধ পাঠিয়েছি।
- উত্পন্ন টেক্সট এবং প্রয়োগকৃত স্যাম্পলিং প্যারামিটার ও কাজের ধরণ সহ ফলাফল ফেরত দিয়েছি উভয়কে স্বচ্ছতার জন্য।
- `temperature` ব্যবহার করেছি আউটপুটের এলোমেলোতা নিয়ন্ত্রণের জন্য, যেখানে উচ্চ মান বেশি সৃজনশীল উত্তর দেয়।
- `top_p` ব্যবহার করেছি নির্বাচিত টোকেনগুলোকে শীর্ষ সম্ভাবনাযুক্ত টোকেনে সীমাবদ্ধ করার জন্য, এতে উৎপাদিত টেক্সটের মান উন্নতি হয়।
- `frequency_penalty` ব্যবহার করেছি পুনরাবৃত্তি কমাতে এবং আউটপুটে বৈচিত্র্য উৎসাহিত করতে।
- `user_preferences` ব্যবহার করে ব্যবহারকারী-পরিভাষিত সৃজনশীলতা এবং বৈচিত্র্য স্তরের ভিত্তিতে স্যাম্পলিং প্যারামিটার কাস্টমাইজেশন সম্ভব করেছি।
- `task_type` ব্যবহৃত হয়েছে অনুরোধের প্রয়োজনীয়তা অনুযায়ী উপযুক্ত স্যাম্পলিং কৌশল নির্ধারণে, কাজের প্রকারভেদের জন্য বেশি উপযোগী উত্তর তৈরি করতে।
- `send_request` পদ্ধতি ব্যবহার করে নির্ধারিত প্যারামিটার সহ প্রম্পট পাঠিয়েছি, নিশ্চিত করছি মডেল অভিযোগ অনুযায়ী টেক্সট তৈরি করে।
- `generated_text` থেকে মডেলের প্রতিক্রিয়া নিয়ে স্যাম্পলিং প্যারামিটার ও কাজের ধরণের সঙ্গে ফেরত দিয়েছি পরবর্তী বিশ্লেষণ বা প্রদর্শনের জন্য।
- `min` এবং `max` ফাংশন ব্যবহার করে ব্যবহারকারীর পছন্দগুলো বৈধ পরিসরে সীমাবদ্ধ করেছি, অবৈধ স্যাম্পলিং কনফিগারেশন প্রতিরোধে।

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// জাভাস্ক্রিপ্ট উদাহরণ: ব্যবহারকারীর প্রসঙ্গের উপর ভিত্তি করে গতিশীল স্যাম্পলিং কনফিগারেশন
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // মূল স্যাম্পলিং প্রোফাইল সংজ্ঞায়িত করুন
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // ঐতিহাসিক কর্মক্ষমতা ট্র্যাক করুন
    this.performanceHistory = [];
  }
  
  // প্রম্পট থেকে টাস্কের ধরন সনাক্ত করুন
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // সহজ হিউরিস্টিক সনাক্তকরণ - এটিকে এমএল শ্রেণিবিভাজনের মাধ্যমে উন্নত করা যেতে পারে
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // যদি স্পষ্ট টাইপ সনাক্ত না হয় তবে ডিফল্টভাবে কথোপকথনগত নির্বাচন করুন
    return 'conversational';
  }
  
  // প্রসঙ্গ এবং ব্যবহারকারীর পছন্দ অনুযায়ী স্যাম্পলিং প্যারামিটার গণনা করুন
  getSamplingParameters(prompt, context = {}) {
    // টাস্কের ধরন সনাক্ত করুন
    const taskType = this.detectTaskType(prompt, context);
    
    // মূল প্রোফাইল নিন
    let params = {...this.samplingProfiles[taskType]};
    
    // ব্যবহারকারীর পছন্দ অনুযায়ী সামঞ্জস্য করুন
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // ১ থেকে ১০ এর স্কেলকে প্রাসঙ্গিক তাপমাত্রা পরিসরে রূপান্তর করুন
        params.temperature = 0.1 + (creativity * 0.09); // ০.১-১.০
      }
      
      if (precision !== undefined) {
        // উচ্চতর সঙ্গতি মানে কম topP (বেশ ফোকাসযুক্ত নির্বাচন)
        params.topP = 1.0 - (precision * 0.05); // ০.৫-১.০
      }
      
      if (consistency !== undefined) {
        // উচ্চতর স্থায়িত্ব মানে কম জরিমানা
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // ০.১-০.৯
      }
    }
    
    // পারফরম্যান্স ইতিহাস থেকে শেখা সমন্বয় প্রয়োগ করুন
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // সহজ অভিযোজিত লজিক - এটিকে আরো জটিল অ্যালগোরিদম দিয়ে উন্নত করা যেতে পারে
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // শুধুমাত্র সাম্প্রতিক ইতিহাস বিবেচনা করুন
    
    if (relevantHistory.length > 0) {
      // গড় কর্মক্ষমতা স্কোর গণনা করুন
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // যদি কর্মক্ষমতা নির্দিষ্ট মানের নিচে হয়, প্যারামিটার সমন্বয় করুন
      if (avgScore < 0.7) {
        // নিরাপদ মানের দিকে সামান্য সমন্বয়
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // ভবিষ্যত সমন্বয়ের জন্য কর্মক্ষমতা রেকর্ড করুন
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // প্রতিক্রিয়া গুণমানের ০-১ রেটিং
    });
    
    // ইতিহাসের আকার সীমাবদ্ধ করুন
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // অপ্টিমাইজড স্যাম্পলিং প্যারামিটার নিন
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // অপ্টিমাইজড প্যারামিটার সহ অনুরোধ পাঠান
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // ব্যবহারকারী মতামত দিলে, ভবিষ্যত অপ্টিমাইজেশনের জন্য তা রেকর্ড করুন
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// উদাহরণ ব্যবহার
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // কাস্টম ব্যবহারকারী পছন্দ সহ সৃজনশীল কাজ
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // উচ্চ সৃজনশীলতা (১-১০)
          consistency: 3  // কম স্থায়িত্ব (১-১০)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // কোড নির্মাণ টাস্ক
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // কম সৃজনশীলতা
          precision: 8,   // উচ্চ নিখুঁততা
          consistency: 9  // উচ্চ স্থায়িত্ব
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

পূর্ববর্তী কোডে আমরা:

- একটি `AdaptiveSamplingManager` ক্লাস তৈরি করেছি যা কাজের প্রকারভেদ এবং ব্যবহারকারীর পছন্দ অনুযায়ী গতিশীল স্যাম্পলিং পরিচালনা করে।
- বিভিন্ন কাজের জন্য স্যাম্পলিং প্রোফাইল সংজ্ঞায়িত করেছি (সৃজনশীল, তথ্যমূলক, কোড, কথোপকথনমূলক)।
- সহজ হিউরিস্টিক ব্যবহার করে প্রম্পটের কাজের ধরণ সনাক্তের একটি পদ্ধতি বাস্তবায়িত করেছি।
- সনাক্তকৃত কাজের ধরণ ও ব্যবহারকারী পছন্দের ওপর ভিত্তি করে স্যাম্পলিং প্যারামিটার গণনা করেছি।
- ঐতিহাসিক পারফরম্যান্সে ভিত্তি করে শেখা সংশোধনাগুলো প্রয়োগ করেছি স্যাম্পলিং প্যারামিটার অপ্টিমাইজ করার জন্য।
- ভবিষ্যৎ সংশোধনের জন্য পারফরম্যান্স রেকর্ড করেছি, যাতে সিস্টেম অতীত ইন্টারঅ্যাকশন থেকে শিখতে পারে।
- গতিশীলভাবে কনফিগার করা স্যাম্পলিং প্যারামিটার সহ অনুরোধ পাঠিয়ে এবং প্রয়োগকৃত প্যারামিটার ও সনাক্তকৃত কাজের ধরণের সঙ্গে তৈরি টেক্সট ফেরত দিয়েছি।
- ব্যবহার করেছি:
    - `userPreferences` ব্যবহারকারীর সংজ্ঞায়িত সৃজনশীলতা, নির্ভুলতা এবং ধারাবাহিকতার স্তরের উপর ভিত্তি করে স্যাম্পলিং প্যারামিটার কাস্টমাইজেশন সম্ভব করতে।
    - `detectTaskType` প্রম্পটের ওপর ভিত্তি করে কাজের প্রকৃতি নির্ধারণ করতে, যাতে বিভিন্ন ধরনের অনুরোধের জন্য উপযুক্ত স্যাম্পলিং কৌশল প্রয়োগ করা যায়।
    - `recordPerformance` তৈরি উত্তরের পারফরম্যান্স লগ করতে, সিস্টেমকে সময়ের সাথে অভিযোজিত ও উন্নত হতে সাহায্য করে।
    - `applyLearnedAdjustments` ঐতিহাসিক পারফরম্যান্সের ভিত্তিতে স্যাম্পলিং প্যারামিটার সংশোধন করতে, মডেলের উচ্চ-স্তরের উত্তর তৈরি করার ক্ষমতা বাড়াতে।
    - `generateResponse` গতিশীল স্যাম্পলিং সহ সম্পূর্ণ উত্তর তৈরি করার প্রক্রিয়া একত্রিত করতে, যাতে এটি বিভিন্ন প্রম্পট ও প্রসঙ্গের সাথে সহজে কল করা যায়।
    - `allowedTools` মডেলকে কোন টুল ব্যবহারের অনুমতি দিতে, যা প্রসঙ্গ-বিজ্ঞ উত্তর তৈরিতে সহায়ক।
    - `feedbackScore` ব্যবহারকারীদের তৈরি উত্তরের গুণগত মান সম্পর্কে মতামত দিতে দেয়, যা মডেলের পারফরম্যান্স আরও পরিমার্জনের জন্য ব্যবহার করা যায়।
    - `performanceHistory` অতীত ইন্টারঅ্যাকশনের রেকর্ড রাখে, সিস্টেমকে পূর্ব অভিজ্ঞতা থেকে শিখতে সাহায্য করে।
    - `getSamplingParameters` অনুরোধের প্রসঙ্গের উপর ভিত্তি করে স্যাম্পলিং প্যারামিটার নিয়ন্ত্রণ করতে, মডেলের আচরণকে আরও নমনীয় ও প্রতিক্রিয়াশীল করতে।
    - `detectTaskType` প্রম্পটের ভিত্তিতে কাজের শ্রেণীবিন্যাস করতে, যাতে বিভিন্ন ধরনের অনুরোধের জন্য যথাযথ স্যাম্পলিং কৌশল প্রয়োগ করা যায়।
    - `samplingProfiles` বিভিন্ন কাজের জন্য বেসিক স্যাম্পলিং কনফিগারেশন সংজ্ঞায়িত করতে, কাজের প্রকৃতির ওপর ভিত্তি করে দ্রুত সামঞ্জস্য করতে।

---

## পরবর্তী পদক্ষেপ

- [5.7 স্কেলিং](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->