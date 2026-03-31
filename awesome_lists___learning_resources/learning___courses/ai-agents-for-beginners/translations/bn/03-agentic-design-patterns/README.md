[![ভাল AI এজেন্ট ডিজাইন করার উপায়](../../../translated_images/bn/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(উপরের চিত্রে ক্লিক করে এই পাঠের ভিডিও দেখুন)_
# AI এজেন্টিক ডিজাইন নীতিমালা

## ভূমিকা

AI এজেন্টিক সিস্টেম নির্মাণ সম্পর্কে ভাববার অনেক উপায় আছে। জেনারেটিভ AI ডিজাইনে অনিশ্চয়তা একটি বৈশিষ্ট্য এবং ত্রুটি নয় বলে ধরে নিয়ে, ইঞ্জিনিয়ারদের জন্য কখনও কখনও কোথা থেকে শুরু করবে সেটি নির্ধারণ করা কঠিন হয়ে যায়। আমরা এমন একটি মানব-কেন্দ্রিক UX ডিজাইন নীতিমালার সেট তৈরি করেছি যাতে ডেভেলপাররা তাদের ব্যবসায়িক চাহিদা মেটাতে কাস্টমার-সেন্ট্রিক এজেন্টিক সিস্টেম তৈরি করতে পারে। এই ডিজাইন নীতিগুলো একটি নির্দেশমূলক আর্কিটেকচার নয় বরং টিমগুলোর জন্য একটি উদ্বোধনী পয়েন্ট যারা এজেন্ট অভিজ্ঞতা সংজ্ঞায়িত এবং নির্মাণ করছে।

সাধারণভাবে, এজেন্টদের উচিত:

- মানব দক্ষতাকে বিস্তৃত এবং স্কেল করা (ব্রেইনস্টর্মিং, সমস্যা সমাধান, স্বয়ংক্রিয়করণ ইত্যাদি)
- জ্ঞানগত ফাঁক পূরণ করা (জানুন আমাকে জ্ঞান ক্ষেত্রগুলিতে আপ-টু-স্পিড করে দেওয়া, অনুবাদ ইত্যাদি)
- ব্যক্তিরা যেমনভাবে অন্যদের সাথে কাজ করতে পছন্দ করে সেইভাবে সহযোগিতা সহজতর ও সহায়ক করা
- আমাদের নিজেদের আরও ভালো সংস্করণ বানানো (উদাহরণস্বরূপ, জীবন কোচ/টাস্ক মাস্টার, আবেগ নিয়ন্ত্রণ ও মাইন্ডফুলনেস দক্ষতা শেখাতে সাহায্য করা, স্থিতিস্থাপকতা গড়ে তোলা ইত্যাদি)

## এই পাঠে যা কভার করা হবে

- এজেন্টিক ডিজাইন নীতিগুলো কী
- এই ডিজাইন নীতিগুলো প্রয়োগ করার সময় অনুসরণ করার জন্য কিছু নির্দেশিকা
- ডিজাইন নীতিগুলো ব্যবহার করার কয়েকটি উদাহরণ

## শেখার লক্ষ্য

এই পাঠ সম্পন্ন করার পর, আপনি সক্ষম হবেন:

1. ব্যাখ্যা করতে পারে এজেন্টিক ডিজাইন নীতিগুলো কী
2. ব্যাখ্যা করতে পারে এজেন্টিক ডিজাইন নীতিগুলো ব্যবহার করার নির্দেশিকা কী
3. এজেন্টিক ডিজাইন নীতিগুলো ব্যবহার করে কীভাবে একটি এজেন্ট তৈরি করবেন তা বুঝতে

## এজেন্টিক ডিজাইন নীতিমালা

![এজেন্টিক ডিজাইন নীতিমালা](../../../translated_images/bn/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### এজেন্ট (স্থান)

এটি সেই পরিবেশ যেখানে এজেন্ট কার্যকর করে। এই নীতিগুলো শারীরিক এবং ডিজিটাল জগতে এজেন্ট ডিজাইন করার ক্ষেত্রে আমাদের নির্দেশ দেয়।

- **সংযোগ করা, ভেঙে ফেলা নয়** – মানুষকে অন্য মানুষ, ইভেন্ট এবং ব্যবহারযোগ্য জ্ঞানের সাথে সংযুক্ত করতে সাহায্য করুন যাতে সহযোগিতা ও সংযোগ সম্ভব হয়।
- এজেন্ট ঘটনা, জ্ঞান এবং মানুষকে সংযুক্ত করতে সাহায্য করে।
- এজেন্ট মানুষকে একে অপরের কাছে নিয়ে আসে। এগুলো মানুষকে প্রতিস্থাপন বা অবমাননা করার জন্য ডিজাইন করা হয়নি।
- **সহজে প্রবেশযোগ্য কিন্তু কখনও কখনও অদৃশ্য** – এজেন্ট বড় অংশে ব্যাকগ্রাউন্ডে কাজ করে এবং কেবল তখনই আমাদেরকে নাজ করে যখন তা প্রাসঙ্গিক এবং উপযুক্ত।
  - Agent is easily discoverable and accessible for authorized users on any device or platform.
  - Agent supports multimodal inputs and outputs (sound, voice, text, etc.).
  - Agent can seamlessly transition between foreground and background; between proactive and reactive, depending on its sensing of user needs.
  - Agent may operate in invisible form, yet its background process path and collaboration with other Agents are transparent to and controllable by the user.

### এজেন্ট (সময়)

এটি হচ্ছে কীভাবে এজেন্ট সময়ের মধ্যে কাজ করে। এই নীতিগুলো অতীত, বর্তমান এবং ভবিষ্যতের মধ্যে আন্তঃক্রিয়া করার সময় এজেন্ট ডিজাইন করার ক্ষেত্রে নির্দেশ দেয়।

- **অতীত**: ইতিহাসের প্রতিফলন যার মধ্যে রয়েছে অবস্থা এবং প্রসঙ্গ উভয়ই।
  - Agent provides more relevant results based on analysis of richer historical data beyond only the event, people, or states.
  - Agent creates connections from past events and actively reflects on memory to engage with current situations.
- **বর্তমান**: শুধু নোটিফাই না করে প্রণোদনা দেওয়া।
  - Agent embodies a comprehensive approach to interacting with people. When an event happens, the Agent goes beyond static notification or other static formality. Agent can simplify flows or dynamically generate cues to direct the user’s attention at the right moment.
  - Agent delivers information based on contextual environment, social and cultural changes and tailored to user intent.
  - Agent interaction can be gradual, evolving/growing in complexity to empower users over the long term.
- **ভবিষ্যৎ**: অভিযোজন এবং বিবর্তন।
  - Agent adapts to various devices, platforms, and modalities.
  - Agent adapts to user behavior, accessibility needs, and is freely customizable.
  - Agent is shaped by and evolves through continuous user interaction.

### এজেন্ট (কোর)

এগুলো হল এজেন্টের ডিজাইনের মূল অংশে থাকা প্রধান উপাদানগুলো।

- **অনিশ্চয়তাকে গ্রহণ করুন কিন্তু বিশ্বাস প্রতিষ্ঠা করুন**।
  - A certain level of Agent uncertainty is expected. Uncertainty is a key element of agent design.
  - Trust and transparency are foundational layers of Agent design.
  - Humans are in control of when the Agent is on/off and Agent status is clearly visible at all times.

## এই নীতিগুলো বাস্তবায়নের নির্দেশিকা

When you’re using the previous design principles, use the following guidelines:

1. **স্বচ্ছতা**: ব্যবহারকারীকে জানাতে হবে যে AI জড়িত আছে, এটি কীভাবে কাজ করে (গত কার্যক্রম সহ), এবং কীভাবে প্রতিক্রিয়া জানাতে এবং সিস্টেম পরিবর্তন করতে হয়।
2. **নিয়ন্ত্রণ**: ব্যবহারকারীকে কাস্টমাইজ, পছন্দ নির্ধারণ এবং ব্যক্তিগতকরণ করতে সক্ষম করুন, এবং সিস্টেম ও এর বৈশিষ্ট্যগুলোর উপর নিয়ন্ত্রণ দিন (ভুলে যাওয়ার ক্ষমতা সহ)।
3. **সামঞ্জস্য**: ডিভাইস ও এন্ডপয়েন্ট জুড়ে সঙ্গতিপূর্ণ, বহু-মোডাল অভিজ্ঞতা লক্ষ্য করুন। যেখানে সম্ভব পরিচিত UI/UX উপাদান ব্যবহার করুন (যেমন ভয়েস ইন্টার‌্যাকশনের জন্য মাইক্রোফোন আইকন) এবং গ্রাহকের জ্ঞানগত বোঝা যতটা সম্ভব কমান (উদাহরণস্বরূপ, সংক্ষিপ্ত উত্তর, ভিজ্যুয়াল সহায়তা, এবং ‘আরও জানুন’ কন্টেন্ট)।

## কিভাবে এই নীতিমালা ও নির্দেশিকা ব্যবহার করে একটি ভ্রমণ এজেন্ট ডিজাইন করবেন

ধরা যাক আপনি একটি ভ্রমণ এজেন্ট ডিজাইন করছেন, এখানে কীভাবে আপনি ডিজাইন নীতিমালা এবং নির্দেশিকা ব্যবহার করতে পারেন সে সম্পর্কে কিছু ভাবনা:

1. **স্বচ্ছতা** – ব্যবহারকারীকে জানান যে ট্রাভেল এজেন্টটি একটি AI-সক্ষম এজেন্ট। শুরু করার জন্য কিছু মৌলিক নির্দেশনা দিন (যেমন একটি “Hello” বার্তা, নমুনা প্রম্পট)। এটি প্রোডাক্ট পেজে স্পষ্টভাবে ডকুমেন্ট করুন। দেখান ব্যবহারকারী অতীতে কোন প্রম্পটগুলো ব্যবহার করেছে তার তালিকা। প্রতিক্রিয়া কিভাবে দেবেন তা স্পষ্ট করুন (থাম্বস আপ এবং থাম্বস ডাউন, Send Feedback বোতাম ইত্যাদি)। যদি এজেন্টের ব্যবহার বা বিষয় সীমা থাকে তা স্পষ্টভাবে উল্লেখ করুন।
2. **নিয়ন্ত্রণ** – নিশ্চিত করুন যে এজেন্ট তৈরি হওয়ার পরে ব্যবহারকারী কিভাবে সেটি পরিবর্তন করতে পারে তা স্পষ্ট আছে, যেমন System Prompt। ব্যবহারকারীকে সুযোগ দিন এজেন্ট কতটা বিস্তৃতভাবে লিখবে, এর লেখার ধরন, এবং এমন কোন বিষয় যা এজেন্টকে কথা বলার উচিত নয় তা নির্ধারণ করার। ব্যবহারকারীকে যে কোনো সংশ্লিষ্ট ফাইল বা ডেটা, প্রম্পট এবং পূর্ববর্তী কথোপকথন দেখা ও মুছতে দিতে পারেন।
3. **সামঞ্জস্য** – Share Prompt, ফাইল বা ফটো যোগ করার এবং কাউকে ট্যাগ করার আইকনগুলো স্ট্যান্ডার্ড এবং সহজে চেনার মত নিশ্চিত করুন। Agent-এ ফাইল আপলোড/শেয়ার নির্দেশ করতে পেইপারক্লিপ আইকন এবং গ্রাফিক্স আপলোড দেখানোর জন্য ইমেজ আইকন ব্যবহার করুন।

## নমুনা কোড

- Python: [এজেন্ট ফ্রেমওয়ার্ক](./code_samples/03-python-agent-framework.ipynb)
- .NET: [এজেন্ট ফ্রেমওয়ার্ক](./code_samples/03-dotnet-agent-framework.md)


## AI এজেন্টিক ডিজাইন প্যাটার্ন সম্পর্কে আরও প্রশ্ন আছে?

Join the [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet with other learners, attend office hours and get your AI Agents questions answered.

## অতিরিক্ত সম্পদ

- <a href="https://openai.com" target="_blank">এজেন্টিক AI সিস্টেম শাসনের অনুশীলনসমূহ | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">HAX টুলকিট প্রকল্প - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">দায়িত্বশীল AI টুলবক্স</a>

## পূর্ববর্তী পাঠ

[এজেন্টিক ফ্রেমওয়ার্ক অন্বেষণ](../02-explore-agentic-frameworks/README.md)

## পরবর্তী পাঠ

[টুল ব্যবহার ডিজাইন প্যাটার্ন](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
অস্বীকৃতি:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনুবাদ করা হয়েছে। আমরা সঠিকতার জন্য সর্বোচ্চ চেষ্টা করি, তবুও অনুগ্রহ করে মনে রাখুন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসামঞ্জস্য থাকতে পারে। মূল ভাষায় থাকা নথিটিকেই প্রামাণিক উৎস হিসেবে বিবেচনা করা উচিত। গুরুত্বপূর্ণ তথ্যের ক্ষেত্রে পেশাদার মানব অনুবাদ গ্রহণ করার পরামর্শ দেওয়া হয়। এই অনুবাদ ব্যবহারের ফলে যে কোনো ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়ী নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->