[![AI এজেন্ট ফ্রেমওয়ার্ক অন্বেষণ](../../../translated_images/bn/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(ভিডিওটি দেখতে উপরের ছবিটি ক্লিক করুন এই পাঠের)_

# AI এজেন্ট ফ্রেমওয়ার্ক অন্বেষণ

AI এজেন্ট ফ্রেমওয়ার্ক হল সফটওয়্যার প্ল্যাটফর্ম যা AI এজেন্ট তৈরি, মোতায়েন, এবং পরিচালনা সহজ করার জন্য ডিজাইন করা হয়েছে। এই ফ্রেমওয়ার্কগুলি ডেভেলপারদের জন্য প্রি-বিল্ট উপাদান, বিমূর্ততা এবং সরঞ্জাম সরবরাহ করে যা জটিল AI সিস্টেমের বিকাশকে গতিশীল করে তোলে।

এই ফ্রেমওয়ার্কগুলি ডেভেলপারদের তাদের বিশেষ অ্যাপ্লিকেশনের অনন্য দিকগুলিতে মনোযোগ কেন্দ্রীভূত করতে সাহায্য করে, AI এজেন্ট বিকাশের সাধারণ চ্যালেঞ্জগুলোতে মানসম্মত পদ্ধতি প্রদান করে। তারা AI সিস্টেম নির্মাণে স্কেলেবিলিটি, অ্যাক্সেসিবিলিটি, এবং দক্ষতা বৃদ্ধি করে।

## পরিচিতি 

এই পাঠে আলোচনা করা হবে:

- AI এজেন্ট ফ্রেমওয়ার্ক কী এবং ডেভেলপারদের কী অর্জনের সুযোগ দেয়?
- টিমদের কীভাবে দ্রুত প্রোটোটাইপ তৈরি, পুনরাবৃত্তি এবং তাদের এজেন্টের দক্ষতা উন্নত করতে পারে?
- মাইক্রোসফটের তৈরি ফ্রেমওয়ার্ক এবং টুলের মধ্যে পার্থক্য কী (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> এবং <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- আমি কি আমার বিদ্যমান Azure ইকোসিস্টেমের সরঞ্জাম সরাসরি সংযুক্ত করতে পারব, নাকি আলাদা সমাধান প্রয়োজন?
- Microsoft Foundry Agent Service কী এবং এটি কিভাবে আমাকে সাহায্য করছে?

## শেখার লক্ষ্য

এই পাঠের লক্ষ্য হলো আপনাকে সাহায্য করা যাতে আপনি বুঝতে পারেন:

- AI উন্নয়নে AI Agent Frameworks এর ভূমিকা।
- বুদ্ধিমান এজেন্ট তৈরি করতে AI Agent Frameworks কীভাবে ব্যবহার করা যায়।
- AI Agent Frameworks দ্বারা সক্ষম করা মূল ক্ষমতাসমূহ।
- Microsoft Agent Framework এবং Microsoft Foundry Agent Service এর পার্থক্য।

## AI Agent Frameworks কী এবং তারা ডেভেলপারদের কী করতে দেয়?

প্রচলিত AI ফ্রেমওয়ার্কগুলি আপনার অ্যাপে AI সংবৃদ্ধ করতে এবং নিম্নলিখিত উপায়ে অ্যাপগুলো উন্নত করতে সাহায্য করে:

- **ব্যক্তিগতকরণ**: AI ব্যবহারকারীর আচরণ এবং পছন্দ বিশ্লেষণ করে ব্যক্তিগতকৃত সুপারিশ, বিষয়বস্তু এবং অভিজ্ঞতা প্রদান করতে পারে।
উদাহরণ: Netflix এর মতো স্ট্রিমিং সার্ভিসগুলো AI ব্যবহার করে ভিউয়িং ইতিহাসের উপর ভিত্তি করে সিনেমা ও শো সাজেস্ট করে, যা ব্যবহারকারীর নিয়োজিত হওয়া এবং সন্তুষ্টি বাড়ায়।
- **স্বয়ংক্রিয়তা এবং দক্ষতা**: AI পুনরাবৃত্তিমূলক কাজগুলো স্বয়ংক্রিয় করতে, ওয়ার্কফ্লো সহজ করতে এবং অপারেশনাল দক্ষতা বাড়াতে পারে।
উদাহরণ: গ্রাহক সেবা অ্যাপগুলো AI চালিত চ্যাটবট ব্যবহার করে সাধারণ অনুসন্ধান পরিচালনা করে, যা প্রতিক্রিয়া সময় কমায় এবং মানব এজেন্টদের জটিল বিষয় সামলানোর সুযোগ দেয়।
- **উন্নত ব্যবহারকারীর অভিজ্ঞতা**: AI বুদ্ধিমান বৈশিষ্ট্য যেমন ভয়েস রিকগনিশন, প্রাকৃতিক ভাষা প্রক্রিয়াকরণ, এবং পূর্বাভাসমূলক টেক্সট প্রদান করে সামগ্রিক ব্যবহারকারীর অভিজ্ঞতা উন্নত করে।
উদাহরণ: Siri এবং Google Assistant এর মতো ভার্চুয়াল সহকারী AI ব্যবহার করে ভয়েস কমান্ড বুঝতে এবং প্রতিক্রিয়া জানাতে, ব্যবহারকারীদের ডিভাইসের সাথে সহজে যোগাযোগ করতে সাহায্য করে।

### এটা তো ভালো শোনাচ্ছে, তাহলে কেন AI Agent Framework এর দরকার?

AI Agent ফ্রেমওয়ার্কগুলি কেবল AI ফ্রেমওয়ার্ক নয়, এর চেয়ে বেশি কিছু প্রতিনিধিত্ব করে। এগুলি বুদ্ধিমান এজেন্ট তৈরির জন্য ডিজাইন করা হয়েছে যারা ব্যবহারকারী, অন্যান্য এজেন্ট এবং পরিবেশের সাথে ইন্টারঅ্যাক্ট করে নির্দিষ্ট লক্ষ্য অর্জন করে। এই এজেন্টরা স্বায়ত্তশাসিত আচরণ প্রদর্শন করতে পারে, সিদ্ধান্ত নিতে পারে, এবং পরিবর্তিত পরিস্থিতির সাথে মানিয়ে নিতে সক্ষম। AI Agent Frameworks এর দ্বারা সক্ষম কিছু মূল ক্ষমতা হলো:

- **এজেন্ট সহযোগিতা এবং সমন্বয়**: একাধিক AI এজেন্ট তৈরি করা যায় যারা একসঙ্গে কাজ করতে, যোগাযোগ করতে এবং জটিল কাজ সমাধান করতে সমন্বয় করতে পারে।
- **কাজের স্বয়ংক্রিয়তা এবং ব্যবস্থাপনা**: বহু-ধাপের ওয়ার্কফ্লো স্বয়ংক্রিয় করা, কাজ অনুলিপি দেওয়া, এবং এজেন্টদের মধ্যে গতিশীল কাজ ব্যবস্থাপনার জন্য প্রক্রিয়া প্রদান করে।
- **সাংবাদিকিক বোধ এবং অভিযোজন**: এজেন্টদের সক্ষম করে প্রাসঙ্গিকতা বুঝতে, পরিবর্তিত পরিবেশের সাথে মানিয়ে নিতে, এবং বাস্তব-সময়ের তথ্যের ভিত্তিতে সিদ্ধান্ত নিতে।

সংক্ষেপে, এজেন্টরা আপনাকে আরও করতে দেয়, স্বয়ংক্রিয়তা পরবর্তী স্তরে নিয়ে যেতে দেয়, আরও বুদ্ধিমান সিস্টেম তৈরি করতে দেয় যা তাদের পরিবেশ থেকে শিখতে এবং মানিয়ে নিতে পারে।

## কীভাবে দ্রুত প্রোটোটাইপ তৈরি, পুনরাবৃত্তি এবং এজেন্টের দক্ষতা উন্নত করবেন?

এই ক্ষেত্রটি দ্রুত পরিবর্তিত হচ্ছে, তবে বেশিরভাগ AI Agent Frameworks এ কিছু সাধারণ বৈশিষ্ট্য রয়েছে যা দ্রুত প্রোটোটাইপ তৈরি এবং পুনরাবৃত্তিতে সাহায্য করে, যেমন মডিউলার উপাদান, সহযোগী সরঞ্জাম এবং বাস্তব-সময়ের শেখার ব্যবস্থা। আসুন এগুলো বিশদে দেখি:

- **মডিউলার উপাদান ব্যবহার করুন**: AI SDK গুলো প্রি-বিল্ট উপাদান দেয় যেমন AI এবং মেমোরি কানেক্টর, প্রাকৃতিক ভাষা বা কোড প্লাগইন দ্বারা ফাংশন কল, প্রম্পট টেমপ্লেট ইত্যাদি।
- **সহযোগী সরঞ্জামগুলো ব্যবহার করুন**: নির্দিষ্ট ভূমিকা এবং কাজ সহ এজেন্ট ডিজাইন করতে পারেন, যা তাদের সহযোগী ওয়ার্কফ্লো পরীক্ষা এবং পরিমার্জন করতে সক্ষম করে।
- **বাস্তব সময়ে শিখুন**: ফিডব্যাক লুপ প্রয়োগ করুন যেখানে এজেন্টরা ইন্টারঅ্যাকশন থেকে শিখে তাদের আচরণ গতিশীলভাবে সংশোধন করে।

### মডিউলার উপাদান ব্যবহার করুন

Microsoft Agent Framework এর মতো SDK গুলো প্রি-বিল্ট উপাদান দেয় যেমন AI কানেক্টর, টুল ডেফিনিশন, এবং এজেন্ট ব্যবস্থাপনা।

**টিমগুলো কীভাবে ব্যবহার করতে পারে**: টিমগুলো দ্রুত এই উপাদানগুলো একত্রিত করে একটি কার্যকর প্রোটোটাইপ তৈরি করতে পারে, নূতন থেকে শুরু না করেই দ্রুত পরীক্ষা ও পুনরাবৃত্তি করতে পারে।

**বাস্তবে এটি কেমন কাজ করে**: আপনি একটি প্রি-বিল্ট পার্সার ব্যবহার করতে পারেন ব্যবহারকারীর ইনপুট থেকে তথ্য আহরণ করতে, একটি মেমোরি মডিউল দিয়ে ডেটা সংরক্ষণ ও আহরণ করতে, এবং প্রম্পট জেনারেটর দিয়ে ব্যবহারকারীর সাথে ইন্টারঅ্যাক্ট করতে, সব কিছুর জন্য নিজে উপাদান তৈরি করে সময় নষ্ট না করে।

**কোড উদাহরণ**: Microsoft Agent Framework নিয়ে একটি উদাহরণ দেখা যাক কিভাবে `FoundryChatClient` ব্যবহার করে মডেল ব্যবহারকারীর ইনপুটে টুল কলিং দিয়ে প্রতিক্রিয়া দেয়:

``` python
# Microsoft এজেন্ট ফ্রেমওয়ার্ক পাইটন উদাহরণ

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# ভ্রমণ বুক করার জন্য একটি নমুনা টুল ফাংশন সংজ্ঞায়িত করুন
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # উদাহরণ আউটপুট: ১ জানুয়ারী ২০২৫ এ নিউ ইয়র্ক যাওয়ার আপনার ফ্লাইট সফলভাবে বুক হয়েছে। নিরাপদ ভ্রমণ! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

এই উদাহরণ থেকে আপনি দেখতে পাচ্ছেন কিভাবে প্রি-বিল্ট পার্সার ব্যবহার করে ব্যবহারকারীর ইনপুট থেকে মূল তথ্য যেমন উৎস, গন্তব্য এবং ফ্লাইট বুকিংয়ের তারিখ আহরণ করছেন। এই মডিউলার পদ্ধতি আপনাকে উচ্চ-স্তরের লজিকে ফোকাস করতে দেয়।

### সহযোগী সরঞ্জাম ব্যবহার করুন

Microsoft Agent Framework এর মতো ফ্রেমওয়ার্কগুলো একাধিক এজেন্ট তৈরি এবং তাদের সহযোগিতা সহজ করে।

**টিমগুলো কীভাবে ব্যবহার করতে পারে**: টিমগুলো এজেন্টদের নির্দিষ্ট ভূমিকা ও কাজ দিয়ে ডিজাইন করতে পারে, সহযোগী ওয়ার্কফ্লো পরীক্ষা ও পরিমার্জন করে সামগ্রিক সিস্টেম দক্ষতা বাড়াতে পারে।

**বাস্তবে এটি কেমন কাজ করে**: আপনি একটি এজেন্টের টিম তৈরি করতে পারেন যেখানে প্রতিটি এজেন্টের একটি বিশেষ কাজ থাকে, যেমন ডেটা আহরণ, বিশ্লেষণ, বা সিদ্ধান্ত গ্রহণ। এজেন্টগুলো যোগাযোগ করে এবং তথ্য শেয়ার করে একটি সাধারণ লক্ষ্য অর্জন করে, যেমন ব্যবহারকারীর প্রশ্নের উত্তর দেয়া বা কাজ সম্পন্ন করা।

**কোড উদাহরণ (Microsoft Agent Framework)**:

```python
# মাইক্রোসফ্ট এজেন্ট ফ্রেমওয়ার্ক ব্যবহার করে একসাথে কাজ করা একাধিক এজেন্ট তৈরি করা

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# ডেটা পুনরুদ্ধার এজেন্ট
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# ডেটা বিশ্লেষণ এজেন্ট
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# একটি কাজের ওপর অনুক্রমে এজেন্ট চালানো
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

উপরের কোডে আপনি দেখতে পাচ্ছেন কিভাবে একাধিক এজেন্ট একসঙ্গে কাজ করে ডেটা বিশ্লেষণ করার জন্য একটি কাজ তৈরি করা যায়। প্রতিটি এজেন্ট একটি নির্দিষ্ট কাজ সম্পাদন করে, এবং কাজটি সমন্বিতভাবে সম্পাদিত হয় কাঙ্খিত ফলাফল অর্জনের জন্য। বিশেষায়িত ভূমিকা সহ নিবেদিত এজেন্ট তৈরি করে আপনি কাজের দক্ষতা ও কর্মক্ষমতা বাড়াতে পারেন।

### বাস্তব সময়ে শিখুন

উন্নত ফ্রেমওয়ার্কগুলো বাস্তব-সময়ের প্রসঙ্গ বোঝা এবং অভিযোজনের সুবিধা দেয়।

**টিমগুলো কীভাবে ব্যবহার করতে পারে**: টিমগুলো ফিডব্যাক লুপ বাস্তবায়ন করতে পারে যেখানে এজেন্টরা ইন্টারঅ্যাকশন থেকে শিখে তাদের আচরণ গতিশীলভাবে সংশোধন করে, ফলে ক্ষমতার ধারাবাহিক উন্নতি এবং সাবলীলতা হয়।

**বাস্তবে এটি কেমন কাজ করে**: এজেন্টরা ব্যবহারকারীর প্রতিক্রিয়া, পরিবেশগত ডেটা, এবং কাজের ফলাফল বিশ্লেষণ করে তাদের বিদ্যমান জ্ঞান ভান্ডার আপডেট করে, সিদ্ধান্ত গ্রহণ অ্যালগরিদম সংশোধন করে, এবং সময়ের সাথে পারফরম্যান্স উন্নত করে। এই পুনরাবৃত্তিমূলক শেখার প্রক্রিয়া এজেন্টদের পরিবর্তিত পরিস্থিতি এবং ব্যবহারকারীর পছন্দের সাথে মানিয়ে নিতে সাহায্য করে, যা সামগ্রিক সিস্টেমের কার্যকারিতা বৃদ্ধি করে।

## Microsoft Agent Framework এবং Microsoft Foundry Agent Service এর মধ্যে পার্থক্য কী?

এই পদ্ধতিগুলো তুলনা করার অনেক উপায় আছে, তবে আসুন তাদের নকশা, ক্ষমতা এবং লক্ষ্য ব্যবহার ক্ষেত্রে কিছু মূল পার্থক্য দেখি:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework একটি সংক্ষিপ্ত SDK প্রদান করে যা `FoundryChatClient` ব্যবহার করে AI এজেন্ট তৈরি করার জন্য। এটি ডেভেলপারদের Azure OpenAI মডেল ব্যবহার করে এজেন্ট তৈরির সুযোগ দেয়, যার মধ্যে বিল্ট-ইন টুল কলিং, কথোপকথন ব্যবস্থাপনা, এবং Azure আইডেন্টিটির মাধ্যমে এন্টারপ্রাইজ-গ্রেড নিরাপত্তা অন্তর্ভুক্ত।

**ব্যবহার ক্ষেত্র**: টুল ব্যবহার, বহুতল ওয়ার্কফ্লো, এবং এন্টারপ্রাইজ ইন্টিগ্রেশন দৃশ্যের সাথে উৎপাদন-সক্ষম AI এজেন্ট তৈরি করা।

Microsoft Agent Framework এর কিছু গুরুত্বপূর্ণ মূল ধারণা হলো:

- **এজেন্টস**। একটি এজেন্ট `FoundryChatClient` দ্বারা তৈরি করা হয় এবং একটি নাম, নির্দেশনা, এবং টুল দিয়ে কনফিগার করা হয়। এজেন্ট যা করতে পারে:
  - **ব্যবহারকারীর মেসেজ প্রক্রিয়া করা** এবং Azure OpenAI মডেল ব্যবহার করে উত্তর তৈরি করা।
  - **কথোপকথনের প্রাসঙ্গিকতা অনুসারে টুল স্বয়ংক্রিয়ভাবে কল করা**।
  - **একাধিক ইন্টারঅ্যাকশনের মধ্যে কথোপকথন অবস্থা বজায় রাখা**।

  এখানে একটি কোড স্নিপেট যা দেখায় কিভাবে একটি এজেন্ট তৈরি করবেন:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **টুলস**। ফ্রেমওয়ার্ক টুলকে পাইথন ফাংশন হিসেবে সংজ্ঞায়িত করা সমর্থন করে যা এজেন্ট স্বয়ংক্রিয়ভাবে আহ্বান করতে পারে। টুলগুলো এজেন্ট তৈরি করার সময় নিবন্ধিত করা হয়:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **বহু-এজেন্ট সমন্বয়**। ভিন্ন ভিন্ন বিশেষায়িত এজেন্ট তৈরি করতে এবং তাদের কাজ সমন্বয় করতে পারেন:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Azure আইডেন্টিটি ইন্টিগ্রেশন**। ফ্রেমওয়ার্ক নিরাপদ, কীলেস প্রমাণীকরণের জন্য `AzureCliCredential` (বা `DefaultAzureCredential`) ব্যবহার করে, সরাসরি API কী পরিচালনার প্রয়োজন দূর করে।

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service হলো একটি নতুন অতিরিক্ত সার্ভিস, Microsoft Ignite 2024-এ পরিচিতিপ্রাপ্ত। এটি আরও নমনীয় মডেল যেমন Llama 3, Mistral, এবং Cohere-এর মতো ওপেন-সোর্স LLM সরাসরি কল করে AI এজেন্ট তৈরি ও মোতায়েনের সুযোগ দেয়।

Microsoft Foundry Agent Service শক্তিশালী এন্টারপ্রাইজ সুরক্ষা প্রক্রিয়া এবং ডেটা স্টোরেজ উপায় প্রদান করে, যা এটিকে এন্টারপ্রাইজ অ্যাপ্লিকেশনের জন্য উপযুক্ত করে তোলে।

এটি Microsoft Agent Framework সঙ্গে বক্স থেকে কাজ করে এজেন্ট নির্মাণ ও মোতায়েনের জন্য।

এই সার্ভিস বর্তমানে পাবলিক প্রিভিউতে রয়েছে এবং AI এজেন্ট তৈরির জন্য পাইথন এবং C# সাপোর্ট করে।

Microsoft Foundry Agent Service পাইথন SDK ব্যবহার করে, আমরা একটি ইউজার-ডিফাইন্ড টুল সহ একটি এজেন্ট তৈরি করতে পারি:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# টুল ফাংশনগুলি সংজ্ঞায়িত করুন
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### মূল ধারণা

Microsoft Foundry Agent Service এর নিম্নলিখিত মূল ধারণাগুলো রয়েছে:

- **এজেন্ট**. Microsoft Foundry Agent Service Microsoft Foundry-র সাথে সংযুক্ত। Microsoft Foundry এর মধ্যে, একটি AI Agent কাজ করে "স্মার্ট" মাইক্রোসার্ভিস হিসেবে যা প্রশ্নের উত্তর (RAG), কর্ম সম্পাদন, অথবা সম্পূর্ণ ওয়ার্কফ্লো স্বয়ংক্রিয় করতে পারে। এটি জেনারেটিভ AI মডেলের শক্তি এবং টুলসের সংমিশ্রণে বাস্তব-জগতের ডেটা সোর্সে প্রবেশ এবং ইন্টারঅ্যাক্ট করতে সক্ষম। এখানে একটি এজেন্টের উদাহরণ:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    এই উদাহরণে, একটি এজেন্ট তৈরি করা হয়েছে `gpt-4.1-mini` মডেল দিয়ে, যার নাম `my-agent`, এবং নির্দেশনা `You are helpful agent`। এজেন্টকে টুল এবং রিসোর্স দ্বারা সজ্জিত করা হয়েছে কোড ইন্টারপ্রিটেশন কাজ সম্পাদনের জন্য।

- **থ্রেড এবং মেসেজ**। থ্রেড আরেকটি গুরুত্বপূর্ণ ধারণা। এটি একটি কথোপকথন বা এজেন্ট এবং ব্যবহারকারীর মধ্যে ইন্টারঅ্যাকশন প্রতিনিধিত্ব করে। থ্রেড কথোপকথনের অগ্রগতি ট্র্যাক করতে, প্রসঙ্গ তথ্য সংরক্ষণ করতে, এবং ইন্টারঅ্যাকশনের অবস্থান ব্যাবস্থাপনা করতে ব্যবহৃত হয়। এখানে একটি থ্রেডের উদাহরণ:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # এজেন্টকে থ্রেডে কাজ করার জন্য বলুন
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # এজেন্টের প্রতিক্রিয়া দেখতে সমস্ত মেসেজ নিয়ে আসুন এবং লগ করুন
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    আগের কোডে একটি থ্রেড তৈরি করা হয়েছে। এরপর থ্রেডে একটি মেসেজ পাঠানো হয়েছে। `create_and_process_run` কল করে এজেন্টকে থ্রেডে কাজ করতে বলা হয়েছে। অবশেষে মেসেজগুলো আনা হয়েছে এবং লগ করা হয়েছে এজেন্টের প্রতিক্রিয়া দেখতে। মেসেজগুলো ব্যবহারকারী এবং এজেন্টের কথোপকথনের অগ্রগতি নির্দেশ করে। এটি বোঝা গুরুত্বপূর্ণ যে মেসেজগুলো বিভিন্ন ধরনের হতে পারে যেমন টেক্সট, ছবি, বা ফাইল, অর্থাৎ এজেন্টের কাজের ফলে—for example একটি ছবি বা টেক্সট ভিত্তিক প্রতিক্রিয়া। ডেভেলপার হিসেবে, আপনি এই তথ্য ব্যবহার করে উত্তর আরও প্রক্রিয়া করতে বা ব্যবহারকারীর কাছে উপস্থাপন করতে পারেন।

- **Microsoft Agent Framework এর সাথে ইন্টিগ্রেশন**। Microsoft Foundry Agent Service Microsoft Agent Framework এর সাথে নির্বিঘ্নে কাজ করে, যার অর্থ আপনি `FoundryChatClient` ব্যবহার করে এজেন্ট তৈরি করতে পারবেন এবং প্রোডাকশন পরিস্থিতির জন্য Agent Service এর মাধ্যমে মোতায়েন করতে পারবেন।

**ব্যবহার ক্ষেত্র**: Microsoft Foundry Agent Service এমন এন্টারপ্রাইজ অ্যাপ্লিকেশনের জন্য ডিজাইন করা হয়েছে যা সুরক্ষিত, স্কেলযোগ্য, এবং নমনীয় AI এজেন্ট মোতায়েনের প্রয়োজন।

## এই পদ্ধতিগুলোর মধ্যে পার্থক্য কী?
 
মনে হতে পারে ওভারল্যাপ আছে, তবে নকশা, ক্ষমতা, এবং লক্ষ্য ব্যবহার ক্ষেত্রে কিছু মূল পার্থক্য রয়েছে:
 
- **Microsoft Agent Framework (MAF)**: উৎপাদন-সক্ষম SDK AI এজেন্ট তৈরি করার জন্য। এটি টুল কল, কথোপকথন ব্যবস্থাপনা, এবং Azure আইডেন্টিটি ইন্টিগ্রেশনের জন্য একটি সরল API প্রদান করে।
- **Microsoft Foundry Agent Service**: একটি প্ল্যাটফর্ম এবং Microsoft Foundry এর এজেন্ট মোতায়েন সার্ভিস। এটি Azure OpenAI, Azure AI Search, Bing Search এবং কোড এক্সিকিউশনের মতো সেবাগুলোর বিল্ট-ইন সংযোগ সরবরাহ করে।
 
এখনও নিশ্চিত না কোনটি বেছে নেবেন?

### ব্যবহার ক্ষেত্র
 
চলুন কিছু সাধারণ ব্যবহার ক্ষেত্রে দেখে কি সাহায্য করতে পারি:
 
> প্রশ্ন: আমি উৎপাদন AI এজেন্ট অ্যাপ্লিকেশন তৈরি করছি এবং দ্রুত শুরু করতে চাই
>

>উত্তর: Microsoft Agent Framework একটি চমৎকার পছন্দ। এটি `FoundryChatClient` এর মাধ্যমে সহজ, পাইথনিক API দেয় যা কয়েক লাইন কোডে টুল এবং নির্দেশনা সহ এজেন্ট সংজ্ঞায়িত করার সুযোগ দেয়।

>প্রশ্ন: আমি এন্টারপ্রাইজ-গ্রেড মোতায়েন চাই Azure এর Search এবং কোড এক্সিকিউশন এর মতো ইন্টিগ্রেশন সহ
>
> উত্তর: Microsoft Foundry Agent Service সবচেয়ে উপযুক্ত। এটি একটি প্ল্যাটফর্ম সার্ভিস যা একাধিক মডেল, Azure AI Search, Bing Search এবং Azure Functions এর বিল্ট-ইন ক্ষমতা প্রদান করে। Foundry Portal-এ এজেন্ট তৈরি এবং স্কেলে মোতায়েন সহজ করে।
 
> প্রশ্ন: আমি এখনো বিভ্রান্ত, একটি অপশন দিন
>
> উত্তর: প্রথমে Microsoft Agent Framework ব্যবহার করে আপনার এজেন্ট তৈরি শুরু করুন, এবং প্রোডাকশনে মোতায়েন ও স্কেলে উন্নীত করার জন্য Microsoft Foundry Agent Service ব্যবহার করুন। এই পথে আপনি দ্রুত এজেন্ট লজিকে পুনরাবৃত্তি করতে পারবেন এবং স্পষ্টভাবে এন্টারপ্রাইজ মোতায়েনের পথ পেতে পারবেন।
 
আসুন টেবিলে মূল পার্থক্যগুলো সংক্ষেপে দেখি:

| ফ্রেমওয়ার্ক | ফোকাস | মূল ধারণা | ব্যবহার ক্ষেত্র |
| --- | --- | --- | --- |
| Microsoft Agent Framework | টুল কলিং সহ সংক্ষিপ্ত এজেন্ট SDK | এজেন্টস, টুলস, Azure আইডেন্টিটি | AI এজেন্ট নির্মাণ, টুল ব্যবহারে, বহু-ধাপ ওয়ার্কফ্লো |
| Microsoft Foundry Agent Service | নমনীয় মডেল, এন্টারপ্রাইজ নিরাপত্তা, কোড জেনারেশন, টুল কলিং | মডুলারিটি, সহযোগিতা, প্রক্রিয়া অর্কেস্ট্রেশন | সুরক্ষিত, স্কেলযোগ্য, নমনীয় AI এজেন্ট মোতায়েন |

## আমি কি আমার বিদ্যমান Azure ইকোসিস্টেম সরঞ্জামের সাথে সরাসরি সংযুক্ত করতে পারব, নাকি আলাদা সমাধান দরকার?


উত্তর হল হ্যাঁ, আপনি আপনার বিদ্যমান Azure ইকোসিস্টেম টুলগুলি Microsoft Foundry Agent Service এর সাথে সরাসরি সংহত করতে পারেন, বিশেষ করে যেহেতু এটি অন্যান্য Azure পরিষেবাগুলির সাথে নির্বিঘ্নে কাজ করার জন্য তৈরি করা হয়েছে। উদাহরণস্বরূপ, আপনি Bing, Azure AI Search, এবং Azure Functions সংহত করতে পারেন। Microsoft Foundry এর সাথেও গভীর সংহতি রয়েছে।

Microsoft Agent Framework `FoundryChatClient` এবং Azure পরিচয়ের মাধ্যমে Azure পরিষেবাগুলির সাথে সংহত হয়েছে, যা আপনাকে আপনার এজেন্ট টুল থেকে সরাসরি Azure পরিষেবাগুলি কল করার সুযোগ দেয়।

## নমুনা কোড

- পাইথন: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- পাইথন: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## AI Agent Framework সম্পর্কে আরও প্রশ্ন আছে?

অন্যান্য শিক্ষার্থীদের সাথে পরিচিত হতে, অফিস আওয়ার অংশগ্রহণ করতে এবং আপনার AI Agent সম্পর্কিত প্রশ্নের উত্তর পেতে [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) এ যোগ দিন।

## রেফারেন্স

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## পূর্ববর্তী পাঠ

[AI Agent এবং Agent ব্যবহার কেসের পরিচয়](../01-intro-to-ai-agents/README.md)

## পরবর্তী পাঠ

[Agentic Design Patterns বোঝা](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->