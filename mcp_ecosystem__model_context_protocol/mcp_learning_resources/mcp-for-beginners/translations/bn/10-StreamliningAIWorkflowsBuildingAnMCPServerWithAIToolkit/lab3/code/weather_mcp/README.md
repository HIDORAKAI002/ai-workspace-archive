# ওয়েদার MCP সার্ভার

এটি পাইথনে একটি নমুনা MCP সার্ভার যা মক প্রতিক্রিয়াসহ আবহাওয়া সরঞ্জামগুলি বাস্তবায়ন করে। এটি আপনার নিজস্ব MCP সার্ভারের জন্য একটি কাঠামো হিসাবে ব্যবহার করা যেতে পারে। এর মধ্যে নিম্নলিখিত বৈশিষ্ট্যগুলিও রয়েছে:

- **আবহাওয়া সরঞ্জাম**: একটি সরঞ্জাম যা প্রদত্ত অবস্থানের উপর ভিত্তি করে মক করা আবহাওয়ার তথ্য প্রদান করে।
- **এজেন্ট বিল্ডারের সাথে সংযোগ করুন**: একটি বৈশিষ্ট্য যা আপনাকে MCP সার্ভারটিকে পরীক্ষণ এবং ডিবাগ করার জন্য এজেন্ট বিল্ডারের সাথে সংযোগ করার সুযোগ দেয়।
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) এ ডিবাগ করুন**: একটি বৈশিষ্ট্য যা MCP Inspector ব্যবহার করে MCP সার্ভার ডিবাগ করার সুযোগ দেয়।

## ওয়েদার MCP সার্ভার টেমপ্লেট দিয়ে শুরু করুন

> **প্রয়োজনীয়তা**
>
> আপনার লোকাল ডেভ মেশিনে MCP সার্ভার চালানোর জন্য আপনার দরকার:
>
> - [Python](https://www.python.org/)
> - (*ঐচ্ছিক - আপনি যদি uv পছন্দ করেন*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## পরিবেশ প্রস্তুত করুন

এই প্রকল্পের জন্য পরিবেশ সেট আপ করার দুটি পদ্ধতি রয়েছে। আপনি আপনার পছন্দ অনুযায়ী যেকোনো একটি পদ্ধতি বেছে নিতে পারেন।

> নোট: ভার্চুয়াল পরিবেশ তৈরির পর পরিবেশের পাইথন ব্যবহারের নিশ্চয়তার জন্য VSCode বা টার্মিনাল রিলোড করুন।

| পদ্ধতি | ধাপসমূহ |
| -------- | ----- |
| `uv` ব্যবহার করে | ১. ভার্চুয়াল পরিবেশ তৈরি করুন: `uv venv` <br>২. VSCode কমান্ড "***Python: Select Interpreter***" চালান এবং তৈরি ভার্চুয়াল পরিবেশের পাইথন নির্বাচন করুন <br>৩. নির্ভরশীলতাসমূহ ইনস্টল করুন (ডেভ নির্ভরশীলতা সহ): `uv pip install -r pyproject.toml --extra dev` |
| `pip` ব্যবহার করে | ১. ভার্চুয়াল পরিবেশ তৈরি করুন: `python -m venv .venv` <br>২. VSCode কমান্ড "***Python: Select Interpreter***" চালান এবং তৈরি ভার্চুয়াল পরিবেশের পাইথন নির্বাচন করুন<br>৩. নির্ভরশীলতাসমূহ ইনস্টল করুন (ডেভ নির্ভরশীলতা সহ): `pip install -e .[dev]` | 

পরিবেশ সেট আপ করার পর, আপনি Agent Builder এর মাধ্যমে MCP ক্লায়েন্ট হিসেবে আপনার লোকাল ডেভ মেশিনে সার্ভার চালাতে পারেন শুরু করতে:
১. VS Code ডিবাগ প্যানেল খুলুন। `Debug in Agent Builder` নির্বাচন করুন অথবা MCP সার্ভার ডিবাগ শুরু করতে `F5` চাপুন।
২. AI Toolkit Agent Builder ব্যবহার করে [এই প্রম্পট](../../../../../../../../../../../open_prompt_builder) দিয়ে সার্ভার পরীক্ষা করুন। সার্ভার স্বয়ংক্রিয়ভাবে এজেন্ট বিল্ডারের সাথে সংযুক্ত হবে।
৩. প্রম্পটের সঙ্গে সার্ভার পরীক্ষা করার জন্য `Run` ক্লিক করুন।

**অভিনন্দন**! আপনি সফলভাবে Agent Builder এর মাধ্যমে MCP ক্লায়েন্ট হিসেবে আপনার লোকাল ডেভ মেশিনে ওয়েদার MCP সার্ভার চালিয়েছেন।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## টেমপ্লেটে কি কি অন্তর্ভুক্ত আছে

| ফোল্ডার / ফাইল| বিষয়বস্তু                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | ডিবাগিংয়ের জন্য VSCode ফাইলসমূহ                |
| `.aitk`      | AI Toolkit এর কনফিগারেশনগুলো                   |
| `src`        | ওয়েদার MCP সার্ভারের সোর্স কোড                 |

## কিভাবে ওয়েদার MCP সার্ভার ডিবাগ করবেন

> নোট:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) MCP সার্ভারগুলি পরীক্ষা ও ডিবাগ করার জন্য একটি ভিজ্যুয়াল ডেভেলপার টুল।
> - সব ডিবাগ মোড ব্রেকপয়েন্ট সমর্থন করে, তাই আপনি সরঞ্জাম বাস্তবায়নের কোডে ব্রেকপয়েন্ট যুক্ত করতে পারেন।

| ডিবাগ মোড | বর্ণনা | ডিবাগ করার ধাপসমূহ |
| ---------- | ----------- | --------------- |
| Agent Builder | AI Toolkit এর মাধ্যমে এজেন্ট বিল্ডারে MCP সার্ভার ডিবাগ করা। | ১. VS Code ডিবাগ প্যানেল খুলুন। `Debug in Agent Builder` নির্বাচন করুন এবং MCP সার্ভার ডিবাগ শুরু করতে `F5` চাপুন।<br>২. AI Toolkit Agent Builder ব্যবহার করে [এই প্রম্পট](../../../../../../../../../../../open_prompt_builder) দিয়ে সার্ভার পরীক্ষা করুন। সার্ভার স্বয়ংক্রিয়ভাবে এজেন্ট বিল্ডারের সাথে সংযুক্ত হবে।<br>৩. প্রম্পট দিয়ে সার্ভার পরীক্ষা করতে `Run` ক্লিক করুন। |
| MCP Inspector | MCP Inspector ব্যবহার করে MCP সার্ভার ডিবাগ করা। | ১. [Node.js](https://nodejs.org/) ইনস্টল করুন<br> ২. Inspector সেটআপ করুন: `cd inspector` && `npm install` <br> ৩. VS Code ডিবাগ প্যানেল খুলুন। `Debug SSE in Inspector (Edge)` অথবা `Debug SSE in Inspector (Chrome)` নির্বাচন করুন। ডিবাগ শুরু করতে F5 চাপুন।<br> ৪. MCP Inspector ব্রাউজারে চালু হলে, এই MCP সার্ভার সংযোগ করার জন্য `Connect` বোতামে ক্লিক করুন।<br> ৫. এরপর আপনি `List Tools` করতে পারবেন, একটি টুল নির্বাচন করুন, প্যারামিটার ইনপুট করুন, এবং `Run Tool` করে আপনার সার্ভারের কোড ডিবাগ করতে পারবেন।<br> |

## ডিফল্ট পোর্ট এবং কাস্টমাইজেশন

| ডিবাগ মোড | পোর্টসমূহ | সংজ্ঞাসমূহ | কাস্টমাইজেশন | নোট |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | উপরের পোর্ট পরিবর্তনের জন্য [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) সম্পাদনা করুন। | প্রযোজ্য নয় |
| MCP Inspector | 3001 (সার্ভার); 5173 এবং 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | উপরের পোর্ট পরিবর্তনের জন্য [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) সম্পাদনা করুন।| প্রযোজ্য নয় |

## প্রতিক্রিয়া

আপনার এই টেমপ্লেট সংক্রান্ত কোন প্রতিক্রিয়া বা পরামর্শ থাকলে অনুগ্রহ করে [AI Toolkit GitHub রিপোজিটোরি](https://github.com/microsoft/vscode-ai-toolkit/issues) তে একটি ইস্যু খুলুন।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**দায়িত্ব অস্বীকার**:  
এই নথিটি AI অনুবাদ সেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। আমরা যথাসাধ্য সঠিকতার জন্য চেষ্টা করি, তবে দয়া করে জানুন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অযথা ভুল থাকতে পারে। মূল নথি তার নিজস্ব ভাষায়ই সর্বোচ্চ কর্তৃপক্ষ হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদের পরামর্শ দেওয়া হয়। এই অনুবাদের ব্যবহারে সৃষ্ট কোনো ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায় বোধ করি না।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->