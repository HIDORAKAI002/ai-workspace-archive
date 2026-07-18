[![ভাল AI এজেন্ট ডিজাইন করবেন কিভাবে](../../../translated_images/bn/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(এই পাঠের ভিডিও দেখতে উপরের ছবিতে ক্লিক করুন)_

# টুল ব্যবহার ডিজাইন প্যাটার্ন

সরঞ্জামগুলি আকর্ষণীয় কারণ এগুলি AI এজেন্টদের একটি বিস্তৃত ক্ষমতার পরিধি প্রদান করে। একটি এজেন্টের কাজের সীমিত সেটের পরিবর্তে, একটি সরঞ্জাম যোগ করে, এজেন্ট এখন বিভিন্ন ধরনের কাজ করতে পারে। এই অধ্যায়ে, আমরা টুল ইউজ ডিজাইন প্যাটার্ন দেখব, যা বর্ণনা করে কিভাবে AI এজেন্টরা নির্দিষ্ট সরঞ্জাম ব্যবহার করে তাদের লক্ষ্য অর্জন করতে পারে।

## পরিচিতি

এই পাঠে, আমরা নিম্নলিখিত প্রশ্নগুলোর উত্তর খুঁজতে যাচ্ছি:

- টুল ব্যবহার ডিজাইন প্যাটার্ন কী?
- কোন ব্যবহারের ক্ষেত্রে এটি প্রযোজ্য?
- ডিজাইন প্যাটার্ন বাস্তবায়নের জন্য কি উপাদান/বিল্ডিং ব্লক প্রয়োজন?
- বিশ্বাসযোগ্য AI এজেন্ট তৈরির জন্য টুল ব্যবহার ডিজাইন প্যাটার্ন ব্যবহারে বিশেষ কোন বিবেচনা দরকার?

## শেখার লক্ষ্য

এই পাঠ সম্পন্ন করার পরে, আপনি সক্ষম হবেন:

- টুল ব্যবহার ডিজাইন প্যাটার্ন এবং তার উদ্দেশ্য সংজ্ঞায়িত করতে।
- যেসব ক্ষেত্রগুলোতে টুল ব্যবহার ডিজাইন প্যাটার্ন প্রযোজ্য সেগুলো সনাক্ত করতে।
- ডিজাইন প্যাটার্ন বাস্তবায়নে প্রয়োজনীয় মূল উপাদানগুলো বুঝতে।
- এই ডিজাইন প্যাটার্ন ব্যবহার করে AI এজেন্টদের বিশ্বাসযোগ্যতা নিশ্চিত করার বিবেচনাগুলো চিনতে।

## টুল ব্যবহার ডিজাইন প্যাটার্ন কী?

**টুল ব্যবহার ডিজাইন প্যাটার্ন** মূলত LLM-দের বাইরের সরঞ্জামগুলোর সাথে যোগাযোগ করার ক্ষমতা দেয় নির্দিষ্ট লক্ষ্য অর্জনের জন্য। সরঞ্জাম হল কোড যা একটি এজেন্টের দ্বারা কার্যকর করা যায় কাজ সম্পাদনের জন্য। একটি সরঞ্জাম হতে পারে একটি সাধারণ ফাংশন যেমন ক্যালকুলেটর, বা তৃতীয় পক্ষের সেবায় API কল যেমন স্টক মূল্য অনুসন্ধান বা আবহাওয়ার পূর্বাভাস। AI এজেন্টদের প্রসঙ্গে, সরঞ্জামগুলি ডিজাইন করা হয় যাতে তারা **মডেল-জেনারেটেড ফাংশন কলসমূহের** প্রতিক্রিয়ায় এজেন্ট দ্বারা কার্যকর করা যায়।

## কোন কোন ক্ষেত্রে এটি প্রযোজ্য?

AI এজেন্টরা সরঞ্জাম ব্যবহার করে জটিল কাজ সম্পন্ন করতে পারে, তথ্য উদ্ধার করতে পারে, বা সিদ্ধান্ত নিতে পারে। টুল ব্যবহার ডিজাইন প্যাটার্ন সাধারণত তখন ব্যবহার হয় যখন বাইরের সিস্টেম যেমন ডেটাবেস, ওয়েব সার্ভিস, বা কোড ইন্টারপ্রেটারগুলোর সাথে গতিশীল যোগাযোগ প্রয়োজন। এটি বিভিন্ন ব্যবহারের ক্ষেত্রে উপকারী, যেমন:

- **গতিশীল তথ্য উদ্ধার:** এজেন্টরা আপডেট হওয়া তথ্য পেতে বাইরের API বা ডেটাবেসে অনুসন্ধান করতে পারে (যেমন, SQLite ডেটাবেস থেকে ডেটা বিশ্লেষণের জন্য প্রশ্ন করা, স্টক মূল্য বা আবহাওয়া তথ্য সংগ্রহ করা)।
- **কোড এক্সিকিউশন এবং ব্যাখ্যা:** এজেন্টরা গণিত সমস্যা সমাধান, রিপোর্ট তৈরি বা সিমুলেশন করার জন্য কোড বা স্ক্রিপ্ট চালাতে পারে।
- **ওয়ার্কফ্লে অটোমেশন:** টাস্ক শিডিউলার, ইমেইল সার্ভিস, বা ডেটা পাইপলাইনগুলোর মতো সরঞ্জাম সংযুক্ত করে পুনরাবৃত্তিমূলক বা বহু-ধাপের কাজ অটোমেট করা।
- **গ্রাহক সমর্থন:** এজেন্টরা CRM সিস্টেম, টিকেটিং প্ল্যাটফর্ম, বা জ্ঞানভাণ্ডারের সাথে যোগাযোগ করে ব্যবহারকারীর প্রশ্ন সমাধান করতে পারে।
- **কনটেন্ট তৈরি ও সম্পাদনা:** ব্যাকরণ পরীক্ষক, টেক্সট সারাংশকারী, বা কনটেন্ট সুরক্ষা মূল্যায়ক এর মতো সরঞ্জাম ব্যবহার করে বিষয়বস্তু তৈরি কাজে সহায়তা করা।

## ডিজাইন প্যাটার্ন বাস্তবায়নের জন্য কি উপাদান প্রয়োজন?

এই উপাদানগুলো AI এজেন্টকে বিস্তৃত ধরণের কাজ করতে সক্ষম করে। টুল ইউজ ডিজাইন প্যাটার্ন বাস্তবায়নের জন্য মূল উপাদানগুলো হলো:

- **ফাংশন/টুল স্কিমাস**: উপলব্ধ সরঞ্জামগুলোর বিশদ বিবরণ, যা ফাংশনের নাম, উদ্দেশ্য, প্রয়োজনীয় প্যারামিটার, এবং প্রত্যাশিত আউটপুটসহ। এসব স্কিমা LLM-কে সাহায্য করে বুঝতে কি ধরনের সরঞ্জাম উপলব্ধ এবং বৈধ অনুরোধ তৈরি কিভাবে করা যায়।

- **ফাংশন এক্সিকিউশন লজিক**: ব্যবহারকারীর উদ্দেশ্য এবং কথোপকথনের প্রসঙ্গের ভিত্তিতে কখন এবং কিভাবে সরঞ্জাম চালাতে হয় তা নিয়ন্ত্রণ করে। এর মধ্যে থাকতে পারে পরিকল্পনাকারী মডিউল, রাউটিং মেকানিজম, বা শর্তাধীন প্রবাহ যা সরঞ্জাম ব্যবহারের সিদ্ধান্ত নেয়।

- **মেসেজ হ্যান্ডলিং সিস্টেম**: ব্যবহারকারীর ইনপুট, LLM উত্তর, টুল কল, এবং টুল আউটপুটের মধ্যে কথোপকথনের প্রবাহ পরিচালনা করে।

- **টুল ইন্টিগ্রেশন ফ্রেমওয়ার্ক**: এজেন্টকে বিভিন্ন সরঞ্জামের সাথে সংযুক্ত করার অবকাঠামো, হয় সহজ ফাংশন অথবা জটিল বাইরের সেবা।

- **এরর হ্যান্ডলিং ও ভ্যালিডেশন**: টুল ব্যবস্থাপনার ব্যর্থতা, প্যারামিটার যাচাই, এবং অপ্রত্যাশিত প্রতিক্রিয়া পরিচালনার পদ্ধতি।

- **স্টেট ম্যানেজমেন্ট**: কথোপকথনের প্রসঙ্গ, পূর্বের টুল ইন্টারঅ্যাকশন, এবং স্থায়ী তথ্য ট্র্যাক করে যাতে বহু-ধাপের কথোপকথনে সঙ্গতি বজায় থাকে।

এরপর, আমরা ফাংশন/টুল কলিং এর বিস্তারিত দেখব।
 
### ফাংশন/টুল কলিং

ফাংশন কলিং হল মূল উপায় যা দ্বারা আমরা LLM-দের সরঞ্জামের সাথে যোগাযোগ করার অনুমতি দিই। আপনি প্রায়ই 'ফাংশন' এবং 'টুল' শব্দ দুটি বিনিময়ে দেখতে পাবেন কারণ 'ফাংশন' (পুনরায় ব্যবহারযোগ্য কোড ব্লক) হল 'টুল' যা এজেন্টরা কাজ করতে ব্যবহার করে। একটি ফাংশনের কোড চালানোর জন্য LLM-কে ব্যবহারকারীর অনুরোধের সাথে ফাংশনের বর্ণনা মিলিয়ে দেখতে হয়। এজন্য একটি স্কিমা যা সব উপলব্ধ ফাংশনের বর্ণনা ধারণ করে, LLM-কে পাঠানো হয়। LLM তারপর কাজের জন্য সবচেয়ে উপযুক্ত ফাংশনটি নির্বাচন করে তার নাম এবং আর্গুমেন্ট প্রদান করে। নির্বাচিত ফাংশনটি চালানো হয়, এর প্রতিক্রিয়া LLM-এ পাঠানো হয়, যা তথ্য ব্যবহার করে ব্যবহারকারীর অনুরোধের উত্তর দেয়।

ডেভেলপারদের জন্য এজেন্টদের জন্য ফাংশন কলিং বাস্তবায়নের জন্য প্রয়োজন হবে:

১. ফাংশন কলিং সমর্থনকারী একটি LLM মডেল
২. ফাংশন বর্ণনা ধারণকারী একটি স্কিমা
৩. প্রতিটি বর্ণিত ফাংশনের কোড

চলুন একটি শহরের বর্তমান সময় পাওয়ার উদাহরণ দিয়ে দেখাই:

১. **ফাংশন কলিং সমর্থনকারী একটি LLM ইনিশিয়ালাইজ করুন:**

    সব মডেল ফাংশন কলিং সমর্থন করে না, তাই আপনি যে LLM ব্যবহার করছেন তা একবার পরীক্ষা করা গুরুত্বপূর্ণ। <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> ফাংশন কলিং সমর্থন করে। আমরা OpenAI ক্লায়েন্টটি Azure OpenAI **Responses API** (স্থির `/openai/v1/` এন্ডপয়েন্ট — কোনো `api_version` প্রয়োজন নেই) এর বিরুদ্ধে শুরু করতে পারি।

    ```python
    # Azure OpenAI (Responses API, v1 endpoint) এর জন্য OpenAI ক্লায়েন্ট ইনিশিয়ালাইজ করুন
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

১. **একটি ফাংশন স্কিমা তৈরি করুন**:

    পরবর্তী আমরা একটি JSON স্কিমা সংজ্ঞায়িত করব যাতে ফাংশনের নাম, এর কাজের বর্ণনা, এবং ফাংশনের প্যারামিটারগুলোর নাম ও বর্ণনা থাকবে।
    তারপর আমরা এই স্কিমা পূর্বে তৈরি ক্লায়েন্টকে দেব, ব্যবহারকারীর অনুরোধ সহ যাতে সান ফ্রান্সিসকোর সময় পাওয়া যায়। গুরুত্বপূর্ণ যে একটি **টুল কল** ফেরত দেয়, প্রশ্নের চূড়ান্ত উত্তর নয়। আগেই বলা হয়েছে, LLM কাজের জন্য নির্বাচিত ফাংশনের নাম এবং আর্গুমেন্ট ফেরত দেয়।

    ```python
    # মডেল পড়ার জন্য ফাংশনের বর্ণনা (Responses API ফ্ল্যাট টুল ফরম্যাট)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # প্রাথমিক ব্যবহারকারীর বার্তা
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # প্রথম API কল: মডেলকে ফাংশন ব্যবহার করতে বলুন
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Responses API টুল কলগুলি function_call আইটেম হিসাবে response.output এ ফেরত দেয়।
    # তাদের কথোপকথনে সংযুক্ত করুন যাতে মডেলের পরবর্তী টার্নে সম্পূর্ণ প্রেক্ষাপট থাকে।
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
১. **কাজটি সম্পাদনের জন্য প্রয়োজনীয় ফাংশন কোড:**

এখন LLM নির্বাচিত ফাংশনটির কোড লিখে কার্যকর করতে হবে।
পাইথনে বর্তমান সময় পাওয়ার কোড আমরা লিখতে পারি। এছাড়াও প্রতিক্রিয়া থেকে নাম ও আর্গুমেন্ট বের করার কোড দরকার।

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # ফাংশন কলগুলি হ্যান্ডেল করুন
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # টুল ফলাফলকে একটি function_call_output আইটেম হিসাবে রিটার্ন করুন
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # দ্বিতীয় API কল: মডেল থেকে চূড়ান্ত প্রতিক্রিয়া পান
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

ফাংশন কলিং হল অধিকাংশ, সম্ভবত সব, এজেন্ট টুল ব্যবহার ডিজাইনের মূল, তবে এটি শুরু থেকে বাস্তবায়ন করা কিছু সময় চ্যালেঞ্জিং হতে পারে।
আমরা [Lesson 2](../../../02-explore-agentic-frameworks) থেকে শিখেছি এজেন্টিক ফ্রেমওয়ার্কস পুরোপুরি ব্যবহারের জন্য পূর্বনির্মিত বিল্ডিং ব্লক সরবরাহ করে।
 
## এজেন্টিক ফ্রেমওয়ার্কসের মাধ্যমে টুল ব্যবহার উদাহরণ

এখানে কিছু উদাহরণ দেওয়া হয়েছে কিভাবে আপনি বিভিন্ন এজেন্টিক ফ্রেমওয়ার্ক ব্যবহার করে টুল ইউজ ডিজাইন প্যাটার্ন বাস্তবায়ন করতে পারেন:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> একটি ওপেন সোর্স AI ফ্রেমওয়ার্ক যা AI এজেন্ট তৈরি করা সহজ করে তোলে। এটি ফাংশন কলিং ব্যবহারের প্রক্রিয়াকে সরল করে, আপনি সরঞ্জামগুলোকে পাইথন ফাংশন হিসেবে `@tool` ডেকোরেটর দিয়ে সংজ্ঞায়িত করতে পারেন। ফ্রেমওয়ার্ক মডেল এবং আপনার কোডের মধ্যে বার্তা আদান-প্রদান পরিচালনা করে। এটি যেমন File Search এবং Code Interpreter এর মতো প্রি-বিল্ট টুলও প্রদান করে `FoundryChatClient` এর মাধ্যমে।

নিচের চিত্রটি Microsoft Agent Framework এর ফাংশন কলিং প্রক্রিয়া দেখায়:

![function calling](../../../translated_images/bn/functioncalling-diagram.a84006fc287f6014.webp)

Microsoft Agent Framework-এ সরঞ্জামগুলো ডেকোরেটেড ফাংশন হিসেবে সংজ্ঞায়িত করা হয়। আমরা আগের `get_current_time` ফাংশনটিকে `@tool` ডেকোরেটর ব্যবহার করে সরঞ্জামে রূপান্তর করতে পারি। ফ্রেমওয়ার্ক স্বয়ংক্রিয়ভাবে ফাংশন ও প্যারামিটার সেরিয়ালাইজ করে LLM-কে পাঠানোর জন্য স্কিমা তৈরি করবে।

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# ক্লায়েন্ট তৈরি করুন
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# একটি এজেন্ট তৈরি করুন এবং সরঞ্জামের সাথে চালান
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> একটি আধুনিক এজেন্টিক ফ্রেমওয়ার্ক যা ডেভেলপারদের নিরাপদভাবে উচ্চমানের এবং প্রসারযোগ্য AI এজেন্ট তৈরি, মোতায়েন এবং স্কেল করতে সাহায্য করে, যার জন্য মূল কম্পিউটিং এবং স্টোরেজ ব্যবস্থাপনা করতে হয় না। এটি বিশেষভাবে এন্টারপ্রাইজ অ্যাপ্লিকেশনের জন্য উপযোগী কারণ এটি একটি সম্পূর্ণ ব্যবস্থাপিত সেবা এবং এন্টারপ্রাইজ স্তরের নিরাপত্তা প্রদান করে।

সরাসরি LLM API ব্যবহার করার তুলনায় Microsoft Foundry Agent Service কিছু সুবিধা প্রদান করে:

- স্বয়ংক্রিয় টুল কলিং – টুল কল পার্স করা, টুল চালানো, এবং প্রতিক্রিয়া পরিচালনা করা প্রয়োজন নেই; সবই এখন সার্ভার-সাইডে হয়
- নিরাপদভাবে তথ্য পরিচালনা – নিজের কথোপকথন অবস্থা সংরক্ষণ করার পরিবর্তে থ্রেডগুলোর মাধ্যমে সব তথ্য সংরক্ষণ করা যায়
- রেডি-টু-ইউজ টুল – Bing, Azure AI Search, এবং Azure Functions এর মতো আপনার ডেটা সোর্সের সাথে ইন্টারঅ্যাক্ট করার জন্য টুলগুলি

Microsoft Foundry Agent Service-এর সরঞ্জামগুলি দুই ভাগে বিভক্ত:

১. জ্ঞান সরঞ্জাম:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing Search-এ গ্রাউন্ডিং</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">ফাইল সার্চ</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

২. অ্যাকশন টুল:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">ফাংশন কলিং</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">কোড ইন্টারপ্রেটার</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI সংজ্ঞায়িত টুল</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

এজেন্ট সার্ভিস এই টুলগুলোকে `toolset` হিসেবে ব্যবহার করার সুযোগ দেয়। এটি `threads` ব্যবহার করে যা বিশেষ একটি কথোপকথনের বার্তার ইতিহাস ট্র্যাক করে।

ভাবুন আপনি একটি কোম্পানি Contoso-এর সেলস এজেন্ট। আপনি একটি কথোপকথন ভিত্তিক এজেন্ট তৈরি করতে চান যা আপনার সেলস ডেটা সম্পর্কে প্রশ্নের উত্তর দিতে পারে।

নিচের ছবি দেখায় কিভাবে Microsoft Foundry Agent Service ব্যবহার করে আপনার সেলস ডেটা বিশ্লেষণ করা যায়:

![Agentic Service In Action](../../../translated_images/bn/agent-service-in-action.34fb465c9a84659e.webp)

এই সেবার সাথে যেকোনো টুল ব্যবহার করতে আমরা একটি ক্লায়েন্ট তৈরি করে একটি টুল অথবা টুলসেট সংজ্ঞায়িত করতে পারি। ব্যবহারিক বাস্তবায়নের জন্য আমরা নিম্নলিখিত পাইথন কোড ব্যবহার করতে পারি। LLM টুলসেট দেখে নির্ধারণ করবে ব্যবহারকারী তৈরি ফাংশন `fetch_sales_data_using_sqlite_query` ব্যবহার করবে নাকি প্রি-বিল্ট কোড ইন্টারপ্রেটার, ব্যবহারকারীর অনুরোধ অনুসারে।

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_using_sqlite_query ফাংশন যা fetch_sales_data_functions.py ফাইলে পাওয়া যাবে।
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# টুলসেট ইনিশিয়ালাইজ করুন
toolset = ToolSet()

# fetch_sales_data_using_sqlite_query ফাংশনের সাথে ফাংশন কলিং এজেন্ট ইনিশিয়ালাইজ করুন এবং তা টুলসেটে যোগ করুন
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# কোড ইন্টারপ্রেটার টুল ইনিশিয়ালাইজ করুন এবং তা টুলসেটে যোগ করুন।
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## বিশ্বাসযোগ্য AI এজেন্ট নির্মাণে টুল ব্যবহার ডিজাইন প্যাটার্ন ব্যবহারের বিশেষ বিবেচনা কী?

LLM দ্বারা ডাইনামিক্যালি তৈরি SQL এর সাধারণ উদ্বেগ হলো নিরাপত্তা, বিশেষ করে SQL ইনজেকশন বা দূষিত ক্রিয়াকলাপ যেমন ডেটাবেস ড্রপ করা বা ছিনতাই। এই উদ্বেগ সঠিকভাবে ডেটাবেস অ্যাক্সেস পারমিশন সেটিং করে সফলভাবে মোকাবেলা করা যায়। বেশিরভাগ ডেটাবেসে এটি ডেটাবেসকে রিড-অনলি কনফিগার করার মাধ্যমে করা হয়। PostgreSQL বা Azure SQL মত ডেটাবেস সার্ভিসের ক্ষেত্রে, অ্যাপ্লিকেশনের জন্য রিড-অনলি (SELECT) রোল দেওয়া উচিত।

নিরাপদ পরিবেশে অ্যাপ চালানো এই সুরক্ষা আরও বাড়ায়। এন্টারপ্রাইজ ক্ষেত্রে, ডেটা সাধারণত অপারেশনাল সিস্টেম থেকে বিউঁচানো এবং রিড-অনলি ডেটাবেস বা ডেটা ওয়্যারহাউসে রূপান্তরিত হয় যাতে ব্যবহারকারী-বান্ধব স্কিমা থাকে। এই পদ্ধতি ডেটাকে নিরাপদ, কর্মক্ষম ও অ্যাক্সেসযোগ্য করে এবং অ্যাপের রিড-অনলি সীমিত অ্যাক্সেস নিশ্চিত করে।

## নমুনা কোড

- পাইথন: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## টুল ব্যবহার ডিজাইন প্যাটার্ন সম্পর্কে আরো প্রশ্ন রয়েছে?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)-এ যোগ দিন অন্য শিক্ষার্থীদের সাথে দেখা করার জন্য, অফিস আওয়ার্সে অংশ নিতে এবং আপনার AI এজেন্ট প্রশ্নের উত্তর পেতে।

## অতিরিক্ত সম্পদ

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service কর্মশালা</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Multi-Agent কর্মশালা</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework পরিচিতি</a>


## এই এজেন্টটি স্মোক-টেস্ট করুন (ঐচ্ছিক)

আপনি [Lesson 16](../16-deploying-scalable-agents/README.md)-এ এজেন্ট মোতায়েন করা শিখার পর, আপনি এই লেসনের `TravelToolAgent` (এখনো কি এটি তার টুলগুলি কল করে এবং উত্তর দেয়?) স্মোক-টেস্ট করতে পারেন [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) দিয়ে। এটি কীভাবে চালাতে হয় তা দেখতে [`tests/README.md`](../tests/README.md) দেখুন।

## পূর্ববর্তী লেসন

[Agentic Design Patterns বোঝা](../03-agentic-design-patterns/README.md)

## পরবর্তী লেসন

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->