# Azure Content Safety সহ উন্নত MCP সিকিউরিটি

> **OWASP MCP ঝুঁকি সমাধান**: [MCP06 - ইনটেন্ট ফ্লো সাবভার্শন](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety বেশ কয়েকটি শক্তিশালী টুল সরবরাহ করে যা আপনার MCP ইমপ্লিমেন্টেশনের সিকিউরিটি বাড়াতে সাহায্য করে। হাতে কলমে বাস্তবায়নের অভিজ্ঞতার জন্য দেখুন [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ক্যাম্প ৩: I/O সিকিউরিটি।

## প্রম্পট শিল্ডস্

Microsoft-এর AI প্রম্পট শিল্ডস্ সরাসরি এবং পরোক্ষ উভয় প্রম্পট ইঞ্জেকশন আক্রমণের বিরুদ্ধে দৃঢ় সুরক্ষা দেয়, যার মধ্যে রয়েছে:

1. **উন্নত সনাক্তকরণ**: কনটেন্টে প্রেসবদ্ধ দ্রোহাত্মক নির্দেশাবলী চিহ্নিত করতে মেশিন লার্নিং ব্যবহার করে।
2. **স্পটলাইটিং**: ইনপুট টেক্সট রূপান্তর করে AI সিস্টেমকে বৈধ নির্দেশনা এবং বাহ্যিক ইনপুটের মধ্যে পার্থক্য করতে সাহায্য করে।
3. **ডেলিমিটারস্ এবং ডেটামার্কিং**: বিশ্বাসযোগ্য এবং অবিশ্বাসযোগ্য ডেটার মধ্যে সীমানা চিহ্নিত করে।
4. **Content Safety ইন্টিগ্রেশন**: Azure AI Content Safety-এর সাথে কাজ করে জেলব্রেক চেষ্টার এবং ক্ষতিকারক কনটেন্ট সনাক্ত করে।
5. **নিয়মিত আপডেট**: Microsoft নিয়মিত নতুন হুমকির বিরুদ্ধে সুরক্ষা মেকানিজম আপডেট করে থাকে।

## MCP এর সাথে Azure Content Safety ইমপ্লিমেন্টেশন

এই পদ্ধতিতে বহুস্তরীয় সুরক্ষা প্রদান করা হয়:
- প্রক্রিয়াকরণের আগে ইনপুট স্ক্যানিং
- ফেরত দেওয়ার আগে আউটপুট যাচাইকরণ
- পরিচিত ক্ষতিকারক প্যাটার্নের জন্য ব্লকলিস্ট ব্যবহার
- Azure-এর চলমান আপডেট হওয়া Content Safety মডেল ব্যবহার

## Azure Content Safety সংস্থানসমূহ

আপনার MCP সার্ভারের সাথে Azure Content Safety বাস্তবায়ন সম্পর্কে আরও জানতে, এই অফিসিয়াল সংস্থানগুলি পরামর্শ করুন:

1. [Azure AI Content Safety ডকুমেন্টেশন](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety এর অফিসিয়াল ডকুমেন্টেশন।
2. [Prompt Shield ডকুমেন্টেশন](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - প্রম্পট ইঞ্জেকশন আক্রমণ প্রতিরোধের পদ্ধতি শেখার জন্য।
3. [Content Safety API রেফারেন্স](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety ইমপ্লিমেন্টেশনের বিস্তারিত API রেফারেন্স।
4. [Quickstart: C# সহ Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# ব্যবহার করে দ্রুত বাস্তবায়ন গাইড।
5. [Content Safety ক্লায়েন্ট লাইব্রেরিসমূহ](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - বিভিন্ন প্রোগ্রামিং ভাষার জন্য ক্লায়েন্ট লাইব্রেরি।
6. [জেলব্রেক চেষ্টার সনাক্তকরণ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - জেলব্রেক চেষ্টার সনাক্তকরণ এবং প্রতিরোধ বিষয়ে নির্দিষ্ট নির্দেশনা।
7. [Content Safety জন্য সেরা অনুশীলনসমূহ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - কার্যকরভাবে Content Safety ইমপ্লিমেন্ট করার সেরা অনুশীলনসমূহ।

আরও বিস্তারিত বাস্তবায়নের জন্য, দেখুন আমাদের [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md)।

## পরবর্তী পদক্ষেপ

- পড়ুন: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- ফিরে যান: [Security Module Overview](./README.md)
- চালিয়ে যান: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->