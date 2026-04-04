# উন্নত MCP সুরক্ষা Azure Content Safety সহ

> **OWASP MCP ঝুঁকি সমাধান করা হয়েছে**: [MCP06 - প্রসঙ্গ ভিত্তিক পে-লোডের মাধ্যমে প্রম্পট ইনজেকশন](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety আপনার MCP বাস্তবায়নে বেশ কয়েকটি শক্তিশালী সরঞ্জাম প্রদান করে যা নিরাপত্তা বৃদ্ধিতে সাহায্য করে। ব্যবহারিক বাস্তবায়ন অভিজ্ঞতার জন্য দেখুন [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ক্যাম্প ৩: I/O সিকিউরিটি।

## প্রম্পট শিল্ড

মাইক্রোসফটের AI প্রম্পট শিল্ড সরাসরি এবং পরোক্ষ উভয় প্রকারের প্রম্পট ইনজেকশন আক্রমণের বিরুদ্ধে শক্তিশালী সুরক্ষা প্রদান করে:

1. **উন্নত সনাক্তকরণ**: কন্টেন্টে নিহিত ক্ষতিকর নির্দেশাবলী চিহ্নিত করতে মেশিন লার্নিং ব্যবহার করে।
2. **স্পটলাইটিং**: ইনপুট টেক্সট রূপান্তর করে AI সিস্টেমকে বৈধ নির্দেশনা এবং বাহ্যিক ইনপুট আলাদা করতে সাহায্য করে।
3. **ডেলিমিটার এবং ডেটামার্কিং**: বিশ্বাসযোগ্য এবং অবিশ্বাসযোগ্য ডেটার মধ্যে সীমানা চিহ্নিত করে।
4. **কন্টেন্ট সেফটি ইন্টিগ্রেশন**: Azure AI Content Safety এর সাথে কাজ করে জেলব্রেক প্রচেষ্টা এবং ক্ষতিকর কন্টেন্ট সনাক্ত করতে।
5. **অবিরত আপডেট**: মাইক্রোসফট নিয়মিত নতুন উদ্ভূত হুমকির বিরুদ্ধে সুরক্ষা ব্যবস্থা আপডেট করে।

## MCP এর সাথে Azure Content Safety বাস্তবায়ন

এই পদ্ধতি বহুপর্দা সুরক্ষা প্রদান করে:
- প্রক্রিয়াকরণের আগে ইনপুট স্ক্যানিং
- ফেরত দেওয়ার আগে আউটপুট যাচাই
- পরিচিত ক্ষতিকর প্যাটার্নের জন্য ব্লকলিস্ট ব্যবহার
- Azure এর অবিরত আপডেট হওয়া কন্টেন্ট সেফটি মডেলগুলোর সুবিধা গ্রহণ

## Azure Content Safety রিসোর্স

আপনার MCP সার্ভারের সাথে Azure Content Safety বাস্তবায়ন সম্পর্কে আরও জানতে নিম্নলিখিত অফিসিয়াল রিসোর্সগুলি পরামর্শ করুন:

1. [Azure AI Content Safety ডকুমেন্টেশন](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety এর অফিসিয়াল ডকুমেন্টেশন।
2. [প্রম্পট শিল্ড ডকুমেন্টেশন](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - কিভাবে প্রম্পট ইনজেকশন আক্রমণ প্রতিরোধ করবেন।
3. [Content Safety API রেফারেন্স](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety বাস্তবায়নের বিস্তারিত API রেফারেন্স।
4. [কুইকস্টার্ট: C# সহ Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# ব্যবহার করে দ্রুত বাস্তবায়ন গাইড।
5. [Content Safety ক্লায়েন্ট লাইব্রেরি](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - বিভিন্ন প্রোগ্রামিং ভাষার জন্য ক্লায়েন্ট লাইব্রেরি।
6. [জেলব্রেক প্রচেষ্টা সনাক্তকরণ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - জেলব্রেক প্রচেষ্টা সনাক্ত এবং প্রতিরোধের জন্য বিশেষ নির্দেশিকা।
7. [Content Safety জন্য সর্বোত্তম প্র্যাকটিস](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - কার্যকরভাবে Content Safety বাস্তবায়নের সর্বোত্তম প্র্যাকটিস।

আরো গভীর বাস্তবায়নের জন্য, আমাদের [Azure Content Safety বাস্তবায়ন গাইড](./azure-content-safety-implementation.md) দেখুন।

## পরবর্তী ধাপ

- পড়ুন: [Azure Content Safety বাস্তবায়ন](./azure-content-safety-implementation.md)
- ফিরে যান: [সিকিউরিটি মডিউল ওভারভিউ](./README.md)
- চালিয়ে যান: [মডিউল ৩: শুরু করা](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি এআই অনুবাদ সেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। আমরা যথাসম্ভব সঠিকতার চেষ্টা করি, তবে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসামঞ্জস্য থাকতে পারে দয়া করে তা বুঝে নিন। মুল নথির নিজ ভাষাই কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে যেকোন অপার্থিব বা ভুল ব্যাখ্যার জন্য আমরা দায়ী নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->