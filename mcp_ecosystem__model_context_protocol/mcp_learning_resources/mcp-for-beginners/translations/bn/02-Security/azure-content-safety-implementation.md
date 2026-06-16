# MCP এর সাথে Azure Content Safety বাস্তবায়ন

> **OWASP MCP ঝুঁকি সমাধান**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

প্রম্পট ইনজেকশন, টুল পয়জনিং এবং অন্যান্য AI-নির্দিষ্ট দুর্বলতার বিরুদ্ধে MCP নিরাপত্তা শক্তিশালী করতে Azure Content Safety একত্রিত করা অত্যন্ত সুপারিশ করা হয়। এই বাস্তবায়ন গাইডটি [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ক্যাম্প ৩: I/O Security এর সাথে সামঞ্জস্যপূর্ণ।

## MCP সার্ভারের সাথে একীকরণ

Azure Content Safety কে আপনার MCP সার্ভারের সাথে একীভূত করতে, আপনার অনুরোধ প্রক্রিয়াকরণ পাইপলাইনে কনটেন্ট সেফটি ফিল্টারটি মিডলওয়্যার হিসেবে যোগ করুন:

1. সার্ভার স্টার্টআপের সময় ফিল্টারটি ইনিশিয়ালাইজ করুন
2. প্রক্রিয়াকরণের আগে সমস্ত আসা টুল অনুরোধ যাচাই করুন
3. ক্লায়েন্টদের কাছে ফেরত দেওয়ার আগে সমস্ত প্রেরিত প্রতিক্রিয়া পরীক্ষা করুন
4. নিরাপত্তা লঙ্ঘনের ক্ষেত্রে লগ করুন এবং সতর্ক করুন
5. ব্যর্থ কনটেন্ট সেফটি চেকের জন্য যথাযথ ত্রুটি হ্যান্ডলিং বাস্তবায়ন করুন

এটি নিম্নলিখিতগুলোর বিরুদ্ধে একটি শক্তিশালী প্রতিরক্ষা প্রদান করে:
- প্রম্পট ইনজেকশন আক্রমণ
- টুল পয়জনিং প্রচেষ্টা
- ক্ষতিকারক ইনপুটের মাধ্যমে ডাটা চুরি
- ক্ষতিকারক কনটেন্ট তৈরি

## Azure Content Safety একীকরণের জন্য উত্তম অনুশীলন

1. **কাস্টম ব্লকলিস্ট**: MCP ইনজেকশন প্যাটার্নের জন্য বিশেষভাবে কাস্টম ব্লকলিস্ট তৈরি করুন
2. **গাম্ভীর্য সামঞ্জস্য**: আপনার নির্দিষ্ট ব্যবহারের ক্ষেত্রে এবং ঝুঁকি গ্রহণ ক্ষমতার উপর ভিত্তি করে গাম্ভীর্য থ্রেশহোল্ড সমন্বয় করুন
3. **ব্যাপক কভারেজ**: সমস্ত ইনপুট এবং আউটপুটে কনটেন্ট সেফটি চেক প্রয়োগ করুন
4. **কার্যক্ষমতা অপ্টিমাইজেশন**: পুনরাবৃত্ত কনটেন্ট সেফটি চেকের জন্য ক্যাশিং বাস্তবায়ন বিবেচনা করুন
5. **ফলব্যাক মেকানিজম**: কনটেন্ট সেফটি সেবা না পাওয়া গেলে স্পষ্ট ফলব্যাক আচরণ নির্ধারণ করুন
6. **ব্যবহাকারীর প্রতিক্রিয়া**: নিরাপত্তা উদ্বেগের কারণে কনটেন্ট ব্লক হলে ব্যবহারকারীকে স্পষ্ট প্রতিক্রিয়া প্রদান করুন
7. **একটিভ উন্নতি**: উদীয়মান হুমকির ভিত্তিতে ব্লকলিস্ট এবং প্যাটার্ন নিয়মিত আপডেট করুন

## অতিরিক্ত সম্পদসমূহ

### OWASP MCP নিরাপত্তা নির্দেশিকা
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - ব্যাপক OWASP MCP Top 10 এর Azure বাস্তবায়নসহ
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - বিস্তারিত প্রম্পট ইনজেকশন প্রতিকার প্যাটার্ন
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - কেনা-ব্যবহার ক্যাম্প ৩: I/O Security এ কনটেন্ট সেফটি আলোচনা করা হয়েছে

### Azure ডকুমেন্টেশন
- [Azure Content Safety Overview](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## পরবর্তী ধাপ

- ফিরে যান: [Security Module Overview](./README.md)
- চালিয়ে যান: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->