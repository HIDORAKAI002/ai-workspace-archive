# MCP সহ Azure Content Safety বাস্তবায়ন

> **OWASP MCP ঝুঁকি সমাধান**: [MCP06 - প্রম্পট ইনজেকশন কনটেক্সটুয়াল পে-লোডের মাধ্যমে](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

প্রম্পট ইনজেকশন, টুল পয়জনিং এবং অন্যান্য AI-নির্দিষ্ট দুর্বলতার বিরুদ্ধে MCP সুরক্ষা শক্তিশালী করার জন্য Azure Content Safety একীভূত করা অত্যন্ত সুপারিশ করা হয়। এই বাস্তবায়ন গাইডটি [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ক্যাম্প ৩: I/O Security অনুসারে তৈরি।

## MCP সার্ভারের সাথে ইন্টিগ্রেশন

আপনার MCP সার্ভারের সাথে Azure Content Safety ইন্টিগ্রেট করতে, অনুরোধ প্রক্রিয়াকরণ পাইপলাইনে মিডলওয়্যার হিসাবে কনটেন্ট সেফটি ফিল্টার যোগ করুন:

1. সার্ভার স্টার্টআপের সময় ফিল্টার ইনিশিয়ালাইজ করুন
2. প্রক্রিয়াকরণের আগে সব ইনকামিং টুল অনুরোধ যাচাই করুন
3. ক্লায়েন্টদের ফিরিয়ে দেওয়ার আগে সব আউটগোয়িং রেসপন্স চেক করুন
4. সেফটি লঙ্ঘনের ক্ষেত্রে লগ এবং অ্যালার্ট করুন
5. ব্যর্থ কনটেন্ট সেফটি চেকের জন্য উপযুক্ত ত্রুটি হ্যান্ডলিং বাস্তবায়ন করুন

এটি নিম্নলিখিতগুলোর বিরুদ্ধে একটি শক্তিশালী প্রতিরক্ষা প্রদান করে:
- প্রম্পট ইনজেকশন আক্রমণ
- টুল পয়জনিং প্রচেষ্টা
- ক্ষতিকর ইনপুটের মাধ্যমে তথ্য ফাঁস
- ক্ষতিকর বিষয়বস্তু সৃষ্টিকরণ

## Azure Content Safety একীভেশনের জন্য সেরা অনুশীলনসমূহ

1. **কাস্টম ব্লকলিস্ট**: MCP ইনজেকশন প্যাটার্নের জন্য নির্দিষ্ট কাস্টম ব্লকলিস্ট তৈরি করুন
2. **গুরুত্বের মাননীয়তা**: আপনার নির্দিষ্ট ব্যবহারের ক্ষেত্র এবং ঝুঁকি সহনশীলতার ভিত্তিতে গুরুতরতা স্তর সামঞ্জস্য করুন
3. **সম্পূর্ণ কভারেজ**: সব ইনপুট এবং আউটপুটে কনটেন্ট সেফটি চেক প্রয়োগ করুন
4. **পারফরমেন্স অপটিমাইজেশন**: বারবার ব্যবহৃত কনটেন্ট সেফটি চেকের জন্য ক্যাশিং বাস্তবায়নের কথা বিবেচনা করুন
5. **ফলব্যাক মেকানিজম**: কনটেন্ট সেফটি পরিষেবা অনুপলব্ধ থাকলে স্পষ্ট ফলব্যাক আচরণ নির্ধারণ করুন
6. **ব্যবহারকারী প্রতিক্রিয়া**: নিরাপত্তাজনিত কারণে ব্লক হওয়া বিষয়বস্তু সম্পর্কে ব্যবহারকারীদের স্পষ্ট প্রতিক্রিয়া প্রদান করুন
7. **অবিচ্ছিন্ন উন্নতি**: আবির্ভূত হুমকির ভিত্তিতে নিয়মিত ব্লকলিস্ট এবং প্যাটার্ন আপডেট করুন

## অতিরিক্ত সম্পদ

### OWASP MCP Security Guidance
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Azure বাস্তবায়নের সাথে বিস্তৃত OWASP MCP শীর্ষ ১০
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - বিস্তৃত প্রম্পট ইনজেকশন প্রশমন প্যাটার্ন
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - অনুশীলনী ক্যাম্প ৩: I/O Security কনটেন্ট সেফটি কভার করে

### Azure ডকুমেন্টেশন
- [Azure Content Safety Overview](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## পরবর্তী ধাপ

- ফেরত যান: [Security Module Overview](./README.md)
- এগিয়ে যান: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**বচ্ছেদী বক্তব্য**:
এই নথিটি AI অনুবাদ সেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। আমরা যথাসম্ভব সঠিকতার চেষ্টা করি, তবে অনুগ্রহ করে জানুন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। সংশ্লিষ্ট ভাষায় মুল নথিটিকে কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচনা করা উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদের পরামর্শ দেওয়া হয়। এই অনুবাদের ব্যবহারে সৃষ্ট কোনও ভুলবুঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->