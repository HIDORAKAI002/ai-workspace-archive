# Weather MCP সার্ভার

এটি একটি Python এ তৈরি নমুনা MCP সার্ভার যা মক রেসপন্স দিয়ে আবহাওয়া টুলগুলি বাস্তবায়ন করে। এটি আপনার নিজস্ব MCP সার্ভারের জন্য একটি কাঠামো হিসেবে ব্যবহার করা যেতে পারে। এতে নিম্নলিখিত বৈশিষ্ট্যগুলি অন্তর্ভুক্ত রয়েছে:

- **আবহাওয়া টুল**: একটি টুল যা প্রদত্ত অবস্থানের উপর ভিত্তি করে মক করা আবহাওয়ার তথ্য প্রদান করে।
- **এজেন্ট বিল্ডারের সাথে সংযোগ**: একটি বৈশিষ্ট্য যা MCP সার্ভারকে পরীক্ষা ও ডিবাগিংয়ের জন্য এজেন্ট বিল্ডারের সাথে সংযুক্ত করতে দেয়।
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector)-এ ডিবাগ করুন**: একটি বৈশিষ্ট্য যা MCP সার্ভার MCP Inspector ব্যবহার করে ডিবাগ করতে দেয়।

## Weather MCP সার্ভার টেমপ্লেট দিয়ে শুরু করুন

> **প্রয়োজনীয়তা**
>
> আপনার লোকাল ডেভ মেশিনে MCP সার্ভার চালানোর জন্য আপনার প্রয়োজন হবে:
>
> - [Python](https://www.python.org/)
> - (*ঐচ্ছিক - যদি আপনি uv পছন্দ করেন*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## পরিবেশ প্রস্তুত করুন

এই প্রজেক্টের পরিবেশ সেটআপ করার জন্য দুটি পদ্ধতি আছে। আপনি আপনার পছন্দ অনুযায়ী যে কোনো একটি পদ্ধতি নির্বাচন করতে পারেন।

> মনে রাখবেন: ভার্চুয়াল পরিবেশ তৈরি করার পরে VSCode অথবা টার্মিনাল রিলোড করুন যাতে ভার্চুয়াল পরিবেশের Python ব্যবহৃত হয়।

| পদ্ধতি      | ধাপসমূহ  |
| ----------- | -------- |
| `uv` ব্যবহার | 1. ভার্চুয়াল পরিবেশ তৈরি করুন: `uv venv` <br>2. VSCode কমান্ড "***Python: Select Interpreter***" চালিয়ে তৈরি হওয়া ভার্চুয়াল পরিবেশ থেকে Python নির্বাচন করুন <br>3. ডিপেন্ডেন্সি ইনস্টল করুন (ডেভ ডিপেন্ডেন্সি সহ): `uv pip install -r pyproject.toml --extra dev` |
| `pip` ব্যবহার | 1. ভার্চুয়াল পরিবেশ তৈরি করুন: `python -m venv .venv` <br>2. VSCode কমান্ড "***Python: Select Interpreter***" চালিয়ে তৈরি হওয়া ভার্চুয়াল পরিবেশ থেকে Python নির্বাচন করুন <br>3. ডিপেন্ডেন্সি ইনস্টল করুন (ডেভ ডিপেন্ডেন্সি সহ): `pip install -e .[dev]` |

পরিবেশ প্রস্তুত করার পরে, আপনি Agent Builder এর মাধ্যমে MCP ক্লায়েন্ট হিসেবে আপনার লোকাল ডেভ মেশিনে সার্ভার চালাতে পারেন শুরু করার জন্য:
1. VS Code Debug প্যানেল খুলুন। `Debug in Agent Builder` নির্বাচন করুন অথবা MCP সার্ভার ডিবাগ করতে `F5` চাপুন।
2. Microsoft Foundry Toolkit Agent Builder ব্যবহার করে [এই প্রম্পট](../../../../../../../../../../../open_prompt_builder) দিয়ে সার্ভার পরীক্ষা করুন। সার্ভার স্বয়ংক্রিয়ভাবে Agent Builder এর সাথে সংযোগ স্থাপন করবে।
3. প্রম্পট দিয়ে সার্ভার পরীক্ষা করতে `Run` এ ক্লিক করুন।

**অভিনন্দন**! আপনি সফলভাবে Agent Builder ব্যবহার করে MCP ক্লায়েন্ট হিসেবে আপনার লোকাল ডেভ মেশিনে Weather MCP সার্ভার চালিয়েছেন।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## টেমপ্লেটে কি কি রয়েছে

| ফোল্ডার / ফাইল | বিষয়বস্তু                                   |
| --------------- | -------------------------------------------- |
| `.vscode`       | ডিবাগিংয়ের জন্য VSCode ফাইল                 |
| `.aitk`         | Microsoft Foundry Toolkit এর কনফিগারেশন    |
| `src`           | আবহাওয়া MCP সার্ভারের সোর্স কোড            |

## Weather MCP সার্ভার কীভাবে ডিবাগ করবেন

> নোটসমূহ:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) হলো MCP সার্ভার পরীক্ষা ও ডিবাগিংয়ের জন্য একটি ভিজ্যুয়াল ডেভেলপার টুল।
> - সমস্ত ডিবাগিং মোড ব্রেকপয়েন্ট সমর্থন করে, তাই আপনি টুল ইমপ্লিমেন্টেশনের কোডে ব্রেকপয়েন্ট যোগ করতে পারেন।

| ডিবাগ মোড      | বিবরণ | ডিবাগ করার ধাপসমূহ |
| -------------- | ------ | ------------------ |
| Agent Builder  | Microsoft Foundry Toolkit এর মাধ্যমে Agent Builder-এ MCP সার্ভার ডিবাগ করুন। | 1. VS Code Debug প্যানেল খুলুন। `Debug in Agent Builder` নির্বাচন করুন এবং MCP সার্ভার ডিবাগ শুরু করতে `F5` চাপুন।<br>2. Microsoft Foundry Toolkit Agent Builder ব্যবহার করে [এই প্রম্পট](../../../../../../../../../../../open_prompt_builder) দিয়ে সার্ভার পরীক্ষা করুন। সার্ভার স্বয়ংক্রিয়ভাবে Agent Builder এর সাথে সংযুক্ত হবে।<br>3. প্রম্পট দিয়ে সার্ভার পরীক্ষা করতে `Run` এ ক্লিক করুন। |
| MCP Inspector | MCP Inspector ব্যবহার করে MCP সার্ভার ডিবাগ করুন। | 1. [Node.js](https://nodejs.org/) ইনস্টল করুন।<br> 2. Inspector সেটআপ করুন: `cd inspector` && `npm install` <br> 3. VS Code Debug প্যানেল খুলুন। `Debug SSE in Inspector (Edge)` অথবা `Debug SSE in Inspector (Chrome)` নির্বাচন করুন। ডিবাগ শুরু করতে `F5` চাপুন।<br> 4. যখন MCP Inspector ব্রাউজারে চালু হবে, `Connect` বোতামে ক্লিক করে এই MCP সার্ভারের সাথে সংযোগ করুন।<br> 5. এরপর আপনি `List Tools` করতে পারবেন, একটি টুল নির্বাচন করুন, প্যারামিটার ইনপুট করুন এবং `Run Tool` ক্লিক করে সার্ভার কোড ডিবাগ করুন।<br> |

## ডিফল্ট পোর্ট এবং কাস্টমাইজেশন

| ডিবাগ মোড      | পোর্টস | সংজ্ঞা | কাস্টমাইজেশন | নোট |
| -------------- | -------|--------|--------------|------|
| Agent Builder  | 3001   | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | উপরের পোর্ট পরিবর্তন করতে [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) সম্পাদনা করুন। | প্রযোজ্য নয় |
| MCP Inspector  | 3001 (সার্ভার); 5173 এবং 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | উপরের পোর্ট পরিবর্তন করতে [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [__init__.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) সম্পাদনা করুন।| প্রযোজ্য নয় |

## ফিডব্যাক

যদি এই টেমপ্লেট সম্পর্কে আপনার কোন ফিডব্যাক বা প্রস্তাবনা থাকে, অনুগ্রহ করে [Microsoft Foundry Toolkit এর GitHub রিপোজিটরিতে](https://github.com/microsoft/vscode-ai-toolkit/issues) একটি ইস্যু খুলুন।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->