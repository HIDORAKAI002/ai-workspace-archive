# Azure AI Agent Service Development

এই অনুশীলনে, আপনি [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) এ Azure AI Agent সার্ভিস টুলগুলি ব্যবহার করে Flight Booking এর জন্য একটি এজেন্ট তৈরি করবেন। এজেন্টটি ব্যবহারকারীদের সাথে ইন্টারঅ্যাক্ট করতে এবং ফ্লাইট সম্পর্কিত তথ্য প্রদান করতে সক্ষম হবে।

## Prerequisites

এই অনুশীলন সম্পন্ন করতে, আপনার নিম্নলিখিতগুলির প্রয়োজন:
1. একটি সক্রিয় সাবস্ক্রিপশন সহ Azure অ্যাকাউন্ট। [একটি ফ্রি অ্যাকাউন্ট তৈরি করুন](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)।
2. আপনাকে Microsoft Foundry হাব তৈরি করার অনুমতি থাকতে হবে অথবা কেউ আপনার জন্য এটি তৈরি করবে।
    - যদি আপনার ভূমিকা Contributor বা Owner হয়, তাহলে আপনি এই টিউটোরিয়ালের ধাপগুলি অনুসরণ করতে পারবেন।

## Create an Microsoft Foundry hub

> **Note:** Microsoft Foundry পূর্বে Azure AI Studio নামে পরিচিত ছিল।

1. [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) ব্লগ পোস্ট থেকে Microsoft Foundry হাব তৈরির নির্দেশনাগুলি অনুসরণ করুন।
2. যখন আপনার প্রকল্প তৈরি হয়ে যাবে, প্রদর্শিত কোনো টিপস বন্ধ করুন এবং Microsoft Foundry পোর্টালে প্রকল্প পৃষ্ঠাটি পর্যালোচনা করুন, যা নিম্নলিখিত ছবির মত দেখাবে:

    ![Microsoft Foundry Project](../../../translated_images/bn/azure-ai-foundry.88d0c35298348c2f.webp)

## Deploy a model

1. আপনার প্রকল্পের বাম পাশে, **My assets** সেকশনে, **Models + endpoints** পৃষ্ঠা নির্বাচন করুন।
2. **Models + endpoints** পৃষ্ঠায়, **Model deployments** ট্যাবে, **+ Deploy model** মেনু থেকে **Deploy base model** নির্বাচন করুন।
3. তালিকায় `gpt-4o-mini` মডেলটি অনুসন্ধান করুন এবং নির্বাচন করে নিশ্চিত করুন।

    > **Note**: TPM কমানো সাবস্ক্রিপশনটির কোটা অতিরিক্ত ব্যবহার এড়াতে সাহায্য করে যা আপনি ব্যবহার করছেন।

    ![Model Deployed](../../../translated_images/bn/model-deployment.3749c53fb81e18fd.webp)

## Create an agent

এখন যেহেতু আপনি একটি মডেল ডিপ্লয় করেছেন, আপনি একটি এজেন্ট তৈরি করতে পারেন। একটি এজেন্ট হলো একটি কথোপকথনমূলক AI মডেল যা ব্যবহারকারীদের সাথে ইন্টারঅ্যাক্ট করার জন্য ব্যবহৃত হয়।

1. আপনার প্রকল্পের বাম পাশের প্যানেলে, **Build & Customize** সেকশনে **Agents** পৃষ্ঠা নির্বাচন করুন।
2. নতুন একটি এজেন্ট তৈরির জন্য **+ Create agent** ক্লিক করুন। **Agent Setup** ডায়ালগ বাক্সে:
    - এজেন্টের জন্য একটি নাম লিখুন, যেমন `FlightAgent`।
    - নিশ্চিত করুন যে আপনি পূর্বে তৈরি করা `gpt-4o-mini` মডেল ডিপ্লয়মেন্ট নির্বাচন করেছেন।
    - এজেন্টের অনুসরণ করার জন্য প্রম্পট অনুযায়ী **Instructions** সেট করুন। এখানে একটি উদাহরণ দেওয়া হল:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> বিস্তারিত প্রম্পটের জন্য, আপনি আরও তথ্যের জন্য [এই রিপোজিটরি](https://github.com/ShivamGoyal03/RoamMind) দেখতে পারেন।
    
> উপরন্তু, আপনি এজেন্টের ক্ষমতা বৃদ্ধির জন্য **Knowledge Base** এবং **Actions** যোগ করতে পারেন ব্যবহারকারীর অনুরোধ অনুযায়ী আরো তথ্য সরবরাহ এবং স্বয়ংক্রিয় কাজ সম্পাদনের জন্য। এই অনুশীলনের জন্য, আপনি এই ধাপগুলি এড়াতে পারেন।
    
![Agent Setup](../../../translated_images/bn/agent-setup.9bbb8755bf5df672.webp)

3. নতুন একটি মাল্টি-AI এজেন্ট তৈরির জন্য, সরাসরি **New Agent** ক্লিক করুন। নতুন তৈরি হওয়া এজেন্টটি Agents পৃষ্ঠায় প্রদর্শিত হবে।


## Test the agent

এজেন্ট তৈরি করার পর, আপনি এটি পরীক্ষা করতে পারেন যাতে ব্যবহারকারীর প্রশ্নের প্রতি এটি কীভাবে সাড়া দেয় তা দেখতে পারেন Microsoft Foundry পোর্টাল প্লে‌গ্রাউন্ডে।

1. আপনার এজেন্টের **Setup** প্যানেলের উপরে, **Try in playground** নির্বাচন করুন।
2. **Playground** প্যানেলে, আপনি চ্যাট উইন্ডোতে প্রশ্ন লিখে এজেন্টের সাথে ইন্টারঅ্যাক্ট করতে পারেন। উদাহরণস্বরূপ, আপনি এজেন্টকে ২৮ তারিখে সিয়াটল থেকে নিউ ইয়র্কে ফ্লাইট খুঁজে দিতে বলতে পারেন।

    > **Note**: এই অনুশীলনে কোনো রিয়েল-টাইম ডেটা ব্যবহৃত হচ্ছে না, তাই এজেন্ট সঠিক উত্তর নাও দিতে পারে। উদ্দেশ্য হলো এজেন্টের ব্যবহারকারীর প্রশ্ন বোঝার এবং নির্দেশনা অনুসারে সাড়া দেওয়ার ক্ষমতা পরীক্ষা করা।

    ![Agent Playground](../../../translated_images/bn/agent-playground.dc146586de715010.webp)

3. এজেন্ট পরীক্ষা করার পর, আপনি এটি আরও কাস্টমাইজ করতে পারেন আরো intents, প্রশিক্ষণ ডেটা এবং actions যোগ করে এর ক্ষমতা বাড়ানোর জন্য।

## Clean up resources

আপনি যখন এজেন্ট পরীক্ষার কাজ শেষ করবেন, অতিরিক্ত খরচ এড়াতে এটি মুছে দিতে পারেন।
1. [Azure portal](https://portal.azure.com) খুলুন এবং সেই রিসোর্স গ্রুপের বিষয়বস্তু দেখুন যেখানে আপনি এই অনুশীলনে ব্যবহৃত হাব রিসোর্সগুলো ডিপ্লয় করেছেন।
2. টুলবারে, **Delete resource group** নির্বাচন করুন।
3. রিসোর্স গ্রুপের নাম লিখুন এবং মুছে ফেলা নিশ্চিত করুন।

## Resources

- [Microsoft Foundry documentation](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portal](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Getting Started with Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Fundamentals of AI agents on Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**দ্রষ্টব্য**:  
এই নথিটি AI অনুবাদক সেবা [Co-op Translator](https://github.com/Azure/co-op-translator) দ্বারা অনূদিত হয়েছে। আমরা যথাসাধ্য সঠিকতা নিশ্চিত করার চেষ্টা করি, তবে স্বয়ংক্রিয় অনুবাদে ভুল বা অসম্পূর্ণতা থাকতে পারে। মূল ভাষায় থাকা নথিটি কর্তৃপক্ষ স্বীকৃত উৎস হিসেবে বিবেচনা করা উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানবরচিত অনুবাদ গ্রহণ করা উচিৎ। এই অনুবাদের ব্যবহারে কোনো ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়ী নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->