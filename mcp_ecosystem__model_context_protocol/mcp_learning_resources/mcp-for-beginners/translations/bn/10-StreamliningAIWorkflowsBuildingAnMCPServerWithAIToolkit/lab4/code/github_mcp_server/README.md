# Weather MCP Server

এটি একটি উদাহরণ MCP Server যা Python এ তৈরি এবং weather tools সহ mock responses প্রদান করে। এটি আপনার নিজস্ব MCP Server তৈরির জন্য একটি কাঠামো হিসেবে ব্যবহৃত হতে পারে। এতে নিম্নলিখিত বৈশিষ্ট্যগুলো অন্তর্ভুক্ত রয়েছে:

- **Weather Tool**: একটি টুল যা নির্দিষ্ট স্থানের উপর ভিত্তি করে মক করা আবহাওয়ার তথ্য প্রদান করে।
- **Git Clone Tool**: একটি টুল যা একটি git রেপোজিটোরি নির্দিষ্ট ফোল্ডারে ক্লোন করে।
- **VS Code Open Tool**: একটি টুল যা VS Code বা VS Code Insiders এ একটি ফোল্ডার খোলে।
- **Connect to Agent Builder**: একটি বৈশিষ্ট্য যা MCP সার্ভারকে Agent Builder এর সাথে সংযোগ করার সুযোগ দেয় পরীক্ষণ ও ডিবাগিং এর জন্য।
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: একটি বৈশিষ্ট্য যা MCP Inspector ব্যবহার করে MCP Server ডিবাগ করার সুযোগ দেয়।

## Weather MCP Server টেমপ্লেট দিয়ে শুরু করা

> **প্রারম্ভিক শর্তাবলী**
>
> আপনার লোকাল ডেভ মেশিনে MCP Server চালানোর জন্য আপনাকে প্রয়োজন হবে:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo টুলের জন্য আবশ্যক)
> - [VS Code](https://code.visualstudio.com/) বা [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode টুলের জন্য আবশ্যক)
> - (*ঐচ্ছিক - যদি আপনি uv পছন্দ করেন*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## পরিবেশ প্রস্তুত করা

এই প্রকল্পের পরিবেশ সেটআপ করার জন্য দুটি পদ্ধতি আছে। আপনি আপনার পছন্দ অনুযায়ী যেকোনো একটি নির্বাচন করতে পারেন।

> নোট: ভার্চুয়াল পরিবেশ তৈরি করার পর নিশ্চিত হোন যে VSCode বা টার্মিনাল রিলোড করা হয়েছে যাতে ভার্চুয়াল এনভায়রনমেন্টের পাইথন ব্যবহৃত হয়।

| পদ্ধতি | ধাপসমূহ |
| -------- | ----- |
| `uv` ব্যবহার করে | 1. ভার্চুয়াল পরিবেশ তৈরি করুন: `uv venv` <br>2. VSCode কমান্ড "***Python: Select Interpreter***" চালিয়ে তৈরি ভার্চুয়াল পরিবেশ থেকে পাইথন নির্বাচন করুন <br>3. ডিপেন্ডেন্সি ইনস্টল করুন (ডেভ ডিপেন্ডেন্সি সহ): `uv pip install -r pyproject.toml --extra dev` |
| `pip` ব্যবহার করে | 1. ভার্চুয়াল পরিবেশ তৈরি করুন: `python -m venv .venv` <br>2. VSCode কমান্ড "***Python: Select Interpreter***" চালিয়ে তৈরি ভার্চুয়াল পরিবেশ থেকে পাইথন নির্বাচন করুন<br>3. ডিপেন্ডেন্সি ইনস্টল করুন (ডেভ ডিপেন্ডেন্সি সহ): `pip install -e .[dev]` |

পরিবেশ সেটআপের পরে, আপনি Agent Builder কে MCP Client হিসেবে ব্যবহার করে আপনার লোকাল ডেভ মেশিনে সার্ভার চালাতে পারেন শুরু করার জন্য:
1. VS Code এর Debug প্যানেল খুলুন। `Debug in Agent Builder` নির্বাচন করুন অথবা MCP সার্ভার ডিবাগ শুরু করতে `F5` চাপুন।
2. AI Toolkit Agent Builder ব্যবহার করে [এই প্রম্পট](../../../../../../../../../../../open_prompt_builder) দিয়ে সার্ভার পরীক্ষা করুন। সার্ভার স্বয়ংক্রিয়ভাবে Agent Builder এর সাথে সংযুক্ত হবে।
3. প্রম্পটের সাথে সার্ভার পরীক্ষা করতে `Run` ক্লিক করুন।

**অভিনন্দন**! আপনি সফলভাবে Agent Builder এর মাধ্যমে MCP Client হিসাবে আপনার লোকাল ডেভ মেশিনে Weather MCP Server চালাতে পেরেছেন।
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## টেমপ্লেটে কী কী অন্তর্ভুক্ত আছে

| ফোল্ডার / ফাইল | বিষয়বস্তু                                      |
| --------------- | -------------------------------------------- |
| `.vscode`       | ডিবাগ করার জন্য VSCode ফাইলসমূহ               |
| `.aitk`         | AI Toolkit এর কনফিগারেশন                     |
| `src`           | weather mcp server এর সোর্স কোড                 |

## Weather MCP Server কীভাবে ডিবাগ করবেন

> নোটসমূহ:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) হল একটি ভিজ্যুয়াল ডেভেলপার টুল যা MCP সার্ভার পরীক্ষণ ও ডিবাগ করার জন্য।
> - সব ডিবাগ মোডে ব্রেকপয়েন্ট সাপোর্ট রয়েছে, তাই আপনি টুল ইমপ্লিমেন্টেশন কোডে ব্রেকপয়েন্ট যোগ করতে পারবেন।

## প্রাপ্ত টুলসমূহ

### Weather Tool
`get_weather` টুলটি একটি নির্দিষ্ট স্থানের জন্য মক করা আবহাওয়ার তথ্য প্রদান করে।

| প্যারামিটার | ধরনের | বিবরণ |
| --------- | ------- | ------- |
| `location` | string | আবহাওয়া পাওয়ার জন্য স্থান (যেমন: শহরের নাম, রাজ্য, অথবা স্থানাঙ্ক) |

### Git Clone Tool
`git_clone_repo` টুলটি একটি git রেপোজিটোরি নির্দিষ্ট ফোল্ডারে ক্লোন করে।

| প্যারামিটার | ধরনের | বিবরণ |
| --------- | ------- | ------- |
| `repo_url` | string | ক্লোন করার git রেপোজিটোরির URL |
| `target_folder` | string | যে ফোল্ডারে রেপোজিটোরি ক্লোন করা হবে তার পাথ |

টুলটি JSON অবজেক্ট রিটার্ন করে যাতে থাকে:
- `success`: অপারেশন সফল হয়েছে কিনা তার জন্য বুলিয়ান
- `target_folder` বা `error`: ক্লোন করা রেপোজিটোরির পাথ অথবা একটি ত্রুটির বার্তা

### VS Code Open Tool
`open_in_vscode` টুলটি একটি ফোল্ডার VS Code বা VS Code Insiders অ্যাপে খোলে।

| প্যারামিটার | ধরনের | বিবরণ |
| --------- | ------- | ------- |
| `folder_path` | string | খোলার জন্য ফোল্ডারের পাথ |
| `use_insiders` | boolean (ঐচ্ছিক) | সাধারণ VS Code এর বদলে VS Code Insiders ব্যবহার করবেন কিনা |

টুলটি JSON অবজেক্ট রিটার্ন করে যাতে থাকে:
- `success`: অপারেশন সফল হয়েছে কিনা তার জন্য বুলিয়ান
- `message` বা `error`: একটি নিশ্চিতকরণ বার্তা বা একটি ত্রুটির বার্তা

| ডিবাগ মোড | বিবরণ | ডিবাগ করার ধাপসমূহ |
| --------- | ------- | --------------------- |
| Agent Builder | AI Toolkit এর মাধ্যমে Agent Builder এ MCP সার্ভার ডিবাগ করুন। | 1. VS Code Debug প্যানেল খুলুন। `Debug in Agent Builder` নির্বাচন করুন এবং MCP সার্ভার ডিবাগ শুরু করতে `F5` চাপুন।<br>2. AI Toolkit Agent Builder ব্যবহার করে [এই প্রম্পট](../../../../../../../../../../../open_prompt_builder) দিয়ে সার্ভার পরীক্ষা করুন। সার্ভার স্বয়ংক্রিয়ভাবে Agent Builder এর সাথে সংযুক্ত হবে।<br>3. প্রম্পটের সঙ্গে সার্ভার পরীক্ষা করতে `Run` ক্লিক করুন। |
| MCP Inspector | MCP Inspector ব্যবহার করে MCP সার্ভার ডিবাগ করুন। | 1. [Node.js](https://nodejs.org/) ইনস্টল করুন<br>2. Inspector সেটআপ করুন: `cd inspector` && `npm install` <br>3. VS Code Debug প্যানেল খুলুন। `Debug SSE in Inspector (Edge)` বা `Debug SSE in Inspector (Chrome)` নির্বাচন করুন। ডিবাগ শুরু করতে `F5` চাপুন।<br>4. MCP Inspector যখন ব্রাউজারে লঞ্চ হবে, `Connect` বাটনে ক্লিক করে MCP সার্ভারের সাথে সংযোগ করুন।<br>5. এরপর আপনি `List Tools` ক্লিক করুন, একটি টুল নির্বাচন করুন, প্যারামিটার ইনপুট দিন এবং `Run Tool` করে আপনার সার্ভার কোড ডিবাগ করতে পারবেন।<br> |

## ডিফল্ট পোর্ট এবং কাস্টমাইজেশন

| ডিবাগ মোড | পোর্টসমূহ | সংজ্ঞাসমূহ | কাস্টমাইজেশন | নোট |
| --------- | --------- | ----------- | -------------- | ---- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | উপরোক্ত পোর্ট পরিবর্তনের জন্য [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) এডিট করুন। | প্রযোজ্য নয় |
| MCP Inspector | 3001 (সার্ভার); 5173 এবং 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | উপরোক্ত পোর্ট পরিবর্তনের জন্য [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) এডিট করুন। | প্রযোজ্য নয় |

## প্রতিক্রিয়া

এই টেমপ্লেট নিয়ে আপনার যদি কোনো প্রতিক্রিয়া বা প্রস্তাবনা থাকে, দয়া করে [AI Toolkit GitHub রিপোজিটোরিতে](https://github.com/microsoft/vscode-ai-toolkit/issues) একটি ইস্যু ওপেন করুন।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ডিসক্লেইমার**:  
এই নথিটি AI অনুবাদ সেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। আমরা যথাসম্ভব সঠিকতার জন্য চেষ্টা করি, তবে স্বয়ংক্রিয় অনুবাদে ভুল বা ত্রুটি থাকতে পারে। মূল নথিটির ভাষিক সংস্করণকে সর্বোচ্চ প্রামাণিক উৎস হিসেবে গণ্য করা উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ গ্রহণ করার পরামর্শ দেওয়া হয়। এই অনুবাদের ব্যবহারে কোন ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা কোনো দায়বদ্ধতা গ্রহণ করি না।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->