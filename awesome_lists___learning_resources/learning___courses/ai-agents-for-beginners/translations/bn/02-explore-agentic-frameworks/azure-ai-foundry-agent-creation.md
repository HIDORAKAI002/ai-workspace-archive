# মাইক্রোসফ্ট ফাউন্ড্রি এজেন্ট সেবা উন্নয়ন

এই অনুশীলনে, আপনি মাইক্রোসফ্ট ফাউন্ড্রি এজেন্ট সেবা সরঞ্জামগুলি [মাইক্রোসফ্ট ফাউন্ড্রি পোর্টালে](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) ব্যবহার করে একটি ফ্লাইট বুকিং-এর জন্য একটি এজেন্ট তৈরি করবেন। এজেন্টটি ব্যবহারকারীদের সাথে যোগাযোগ করতে এবং ফ্লাইটের তথ্য প্রদান করতে সক্ষম হবে।

## পূর্বপ্রয়োজনীয়তা

এই অনুশীলন সম্পন্ন করার জন্য আপনার নিম্নলিখিতগুলির প্রয়োজন:
1. একটি Azure একাউন্ট সক্রিয় সাবস্ক্রিপশন সহ। [ফ্রি একাউন্ট তৈরি করুন](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst)।
2. মাইক্রোসফ্ট ফাউন্ড্রি হাব তৈরি করার অনুমতি বা আপনার জন্য একটি তৈরি করা আছে।
    - যদি আপনার ভূমিকা Contributor অথবা Owner হয়, আপনি এই টিউটোরিয়ালের ধাপগুলি অনুসরণ করতে পারেন।

## একটি মাইক্রোসফ্ট ফাউন্ড্রি হাব তৈরি করুন

> **নোট:** মাইক্রোসফ্ট ফাউন্ড্রিকে পূর্বে Azure AI Studio নামে পরিচিত ছিল।

1. মাইক্রোসফ্ট ফাউন্ড্রি ব্লগ পোস্ট থেকে এই নির্দেশনাগুলি অনুসরণ করুন [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) হাব তৈরির জন্য।
2. আপনার প্রকল্প তৈরি হলে, প্রদর্শিত যেকোন টিপস বন্ধ করে মাইক্রোসফ্ট ফাউন্ড্রি পোর্টালের প্রকল্প পাতা পর্যালোচনা করুন, যা নিচের ছবির মতো হওয়া উচিত:

    ![Microsoft Foundry Project](../../../translated_images/bn/azure-ai-foundry.88d0c35298348c2f.webp)

## একটি মডেল স্থাপন করুন

1. আপনার প্রকল্পের বাম পাশের প্যানেলে, **My assets** বিভাগে **Models + endpoints** পৃষ্ঠা নির্বাচন করুন।
2. **Models + endpoints** পৃষ্ঠায়, **Model deployments** ট্যাবে, **+ Deploy model** মেনু থেকে **Deploy base model** নির্বাচন করুন।
3. তালিকা থেকে `gpt-4.1-mini` মডেলটি অনুসন্ধান করুন, তারপর এটি নির্বাচন ও নিশ্চিত করুন।

    > **নোট**: TPM হ্রাস করা সাবস্ক্রিপশনের কোটা অতিরিক্ত ব্যবহারের সমস্যা এড়াতে সাহায্য করে।

    ![Model Deployed](../../../translated_images/bn/model-deployment.3749c53fb81e18fd.webp)

## একটি এজেন্ট তৈরি করুন

এখন যেহেতু আপনি একটি মডেল স্থাপনেছেন, আপনি একটি এজেন্ট তৈরি করতে পারেন। একটি এজেন্ট হলো এমন একটি কথোপকথনসক্ষম AI মডেল যা ব্যবহারকারীদের সাথে যোগাযোগে ব্যবহৃত হয়।

1. আপনার প্রকল্পের বাম প্যানেলে, **Build & Customize** বিভাগ থেকে **Agents** পৃষ্ঠা নির্বাচন করুন।
2. একটি নতুন এজেন্ট তৈরি করতে **+ Create agent** ক্লিক করুন। **Agent Setup** সংলাপে:
    - এজেন্টের জন্য একটি নাম লিখুন, যেমন `FlightAgent`।
    - নিশ্চিত করুন যে পূর্বে আপনি তৈরি করা `gpt-4.1-mini` মডেল স্থাপন নির্বাচিত আছে
    - এজেন্টকে অনুসরণ করার জন্য আপনার পছন্দমত **Instructions** সেট করুন। এখানে একটি উদাহরণ দেওয়া হলো:
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
> বিস্তারিত প্রম্পটের জন্য, আপনি [এই সংগ্রহস্থলটি](https://github.com/ShivamGoyal03/RoamMind) দেখতে পারেন।
    
> এছাড়াও, আপনি এজেন্টের ক্ষমতা বাড়াতে **Knowledge Base** এবং **Actions** যোগ করতে পারেন যাতে ব্যবহারকারীর অনুরোধ অনুযায়ী আরও তথ্য প্রদান এবং স্বয়ংক্রিয় কাজ সম্পন্ন করা যায়। এই অনুশীলনের জন্য, আপনি এই ধাপগুলি এড়াতে পারেন।
    
![Agent Setup](../../../translated_images/bn/agent-setup.9bbb8755bf5df672.webp)

3. একটি নতুন মাল্টি-AI এজেন্ট তৈরি করতে, শুধুমাত্র **New Agent** ক্লিক করুন। নতুন তৈরি হওয়া এজেন্টটি Agents পৃষ্ঠায় প্রদর্শিত হবে।


## এজেন্ট পরীক্ষা করুন

এজেন্ট তৈরি করার পরে, আপনি এটি পরীক্ষা করতে পারেন যে এটি ব্যবহারকারীর প্রশ্নের প্রতি কেমন সাড়া দেয় মাইক্রোসফ্ট ফাউন্ড্রি পোর্টালের প্লেগ্রাউন্ডে।

1. আপনার এজেন্টের **Setup** প্যানেলের উপরে, **Try in playground** নির্বাচন করুন।
2. **Playground** প্যানেলে, চ্যাট উইন্ডোতে প্রশ্ন লিখে আপনি এজেন্টের সাথে যোগাযোগ করতে পারেন। উদাহরণস্বরূপ, আপনি এজেন্টকে ২৮ তারিখে সিয়াটল থেকে নিউ ইয়র্কে ফ্লাইট খুঁজতে বলতে পারেন।

    > **নোট**: যেহেতু এই অনুশীলনে কোনো বাস্তব-সময়ের তথ্য ব্যবহার করা হয়নি, এজেন্টটি সঠিক উত্তর নাও দিতে পারে। উদ্দেশ্য হলো প্রদত্ত নির্দেশাবলী অনুযায়ী ব্যবহারকারীর প্রশ্ন বুঝে সাড়া দেওয়ার ক্ষমতা পরীক্ষা করা।

    ![Agent Playground](../../../translated_images/bn/agent-playground.dc146586de715010.webp)

3. এজেন্ট পরীক্ষার পরে, এর ক্ষমতা বাড়াতে আরও উদ্দেশ্য, প্রশিক্ষণ ডেটা, এবং ক্রিয়া যোগ করে কাস্টমাইজেশন করতে পারেন।

## সম্পদ পরিষ্কার করুন

এজেন্ট পরীক্ষার পরে, অতিরিক্ত খরচ এড়াতে এটি মুছে ফেলতে পারেন।
1. [Azure পোর্টাল](https://portal.azure.com) খুলুন এবং সেই রিসোর্স গ্রুপের সামগ্রী দেখুন যেখানে আপনি এই অনুশীলনের জন্য হাব রিসোর্স স্থাপন করেছেন।
2. টুলবারে, **Delete resource group** নির্বাচন করুন।
3. রিসোর্স গ্রুপের নাম লিখুন এবং মুছে ফেলার বিষয়টি নিশ্চিত করুন।

## সম্পদসমূহ

- [মাইক্রোসফ্ট ফাউন্ড্রি ডকুমেন্টেশন](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [মাইক্রোসফ্ট ফাউন্ড্রি পোর্টাল](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [মাইক্রোসফ্ট ফাউন্ড্রি শুরু করা](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure এ AI এজেন্টের মৌলিক বিষয়াবলী](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->