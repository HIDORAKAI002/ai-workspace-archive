# سرور MCP هواشناسی

این یک نمونه سرور MCP در پایتون است که ابزارهای هواشناسی را با پاسخ‌های شبیه‌سازی شده پیاده‌سازی می‌کند. می‌توان از آن به عنوان چارچوبی برای سرور MCP خود استفاده کرد. ویژگی‌های زیر را شامل می‌شود:

- **ابزار هواشناسی**: ابزاری که اطلاعات هواشناسی شبیه‌سازی شده را بر اساس مکان داده شده ارائه می‌دهد.
- **ابزار کلون کردن گیت**: ابزاری که یک مخزن گیت را در یک پوشه مشخص کلون می‌کند.
- **ابزار باز کردن در VS Code**: ابزاری که یک پوشه را در VS Code یا VS Code Insiders باز می‌کند.
- **اتصال به Agent Builder**: ویژگی‌ای که به شما اجازه می‌دهد سرور MCP را برای تست و اشکال‌زدایی به Agent Builder متصل کنید.
- **اشکال‌زدایی در [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ویژگی‌ای که به شما اجازه می‌دهد سرور MCP را با استفاده از MCP Inspector اشکال‌زدایی کنید.

## شروع کار با قالب Weather MCP Server

> **پیش‌نیازها**
>
> برای اجرای سرور MCP در ماشین توسعه محلی خود، به موارد زیر نیاز خواهید داشت:
>
> - [پایتون](https://www.python.org/)
> - [گیت](https://git-scm.com/) (برای ابزار git_clone_repo نیاز است)
> - [VS Code](https://code.visualstudio.com/) یا [VS Code Insiders](https://code.visualstudio.com/insiders/) (برای ابزار open_in_vscode نیاز است)
> - (*اختیاری - اگر ترجیح می‌دهید uv را استفاده کنید*) [uv](https://github.com/astral-sh/uv)
> - [افزونه اشکال‌زدایی پایتون](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## آماده‌سازی محیط

دو رویکرد برای راه‌اندازی محیط این پروژه وجود دارد. می‌توانید بر اساس ترجیح خود هرکدام را انتخاب کنید.

> توجه: پس از ایجاد محیط مجازی، VSCode یا ترمینال را رفرش کنید تا مطمئن شوید از پایتون محیط مجازی استفاده می‌شود.

| رویکرد | مراحل |
| -------- | ----- |
| استفاده از `uv` | 1. ایجاد محیط مجازی: `uv venv` <br>2. اجرای فرمان VSCode "***Python: Select Interpreter***" و انتخاب پایتون از محیط مجازی ایجاد شده <br>3. نصب وابستگی‌ها (شامل وابستگی‌های توسعه): `uv pip install -r pyproject.toml --extra dev` |
| استفاده از `pip` | 1. ایجاد محیط مجازی: `python -m venv .venv` <br>2. اجرای فرمان VSCode "***Python: Select Interpreter***" و انتخاب پایتون از محیط مجازی ایجاد شده<br>3. نصب وابستگی‌ها (شامل وابستگی‌های توسعه): `pip install -e .[dev]` |

پس از راه‌اندازی محیط، می‌توانید سرور را در ماشین توسعه محلی خود از طریق Agent Builder به عنوان کلاینت MCP اجرا کنید تا شروع کنید:
1. پنل اشکال‌زدایی VS Code را باز کنید. گزینه `Debug in Agent Builder` را انتخاب کرده یا کلید `F5` را بزنید تا اشکال‌زدایی سرور MCP شروع شود.
2. از AI Toolkit Agent Builder برای تست سرور با [این درخواست](../../../../../../../../../../../open_prompt_builder) استفاده کنید. سرور به صورت خودکار به Agent Builder متصل می‌شود.
3. روی `Run` کلیک کنید تا سرور را با درخواست تست کنید.

**تبریک می‌گوییم**! شما با موفقیت Weather MCP Server را در ماشین توسعه محلی خود از طریق Agent Builder به عنوان کلاینت MCP اجرا کرده‌اید.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## محتویات قالب

| پوشه / فایل | محتویات                                   |
| ------------ | ------------------------------------------- |
| `.vscode`    | فایل‌های VSCode برای اشکال‌زدایی           |
| `.aitk`      | تنظیمات ابزار AI Toolkit                  |
| `src`        | کد منبع برای سرور MCP هواشناسی             |

## چطور Weather MCP Server را اشکال‌زدایی کنیم

> نکات:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ابزاری بصری برای توسعه‌دهندگان جهت تست و اشکال‌زدایی سرورهای MCP است.
> - همه حالت‌های اشکال‌زدایی از نقاط شکستن (breakpoints) پشتیبانی می‌کنند، بنابراین می‌توانید نقاط شکستن را به کد پیاده‌سازی ابزار اضافه کنید.

## ابزارهای موجود

### ابزار هواشناسی
ابزار `get_weather` اطلاعات هواشناسی شبیه‌سازی شده را برای یک مکان مشخص فراهم می‌کند.

| پارامتر   | نوع    | شرح                              |
| --------- | ------ | -------------------------------- |
| `location` | رشته   | مکانی که باید برای آن هواشناسی گرفته شود (مثلاً نام شهر، استان یا مختصات) |

### ابزار کلون کردن گیت
ابزار `git_clone_repo` یک مخزن گیت را به یک پوشه مشخص کلون می‌کند.

| پارامتر        | نوع    | شرح                              |
| -------------- | ------ | -------------------------------- |
| `repo_url`     | رشته   | آدرس URL مخزن گیت برای کلون کردن |
| `target_folder` | رشته   | مسیر پوشه‌ای که مخزن باید در آن کلون شود |

ابزار یک شیء JSON با موارد زیر بازمی‌گرداند:
- `success`: بولین که نشان می‌دهد عملیات موفق بوده است یا خیر
- `target_folder` یا `error`: مسیر مخزن کلون شده یا پیام خطا

### ابزار باز کردن در VS Code
ابزار `open_in_vscode` یک پوشه را در برنامه VS Code یا VS Code Insiders باز می‌کند.

| پارامتر       | نوع      | شرح                                      |
| ------------- | -------- | ---------------------------------------- |
| `folder_path` | رشته     | مسیر پوشه برای باز کردن                   |
| `use_insiders` | بولین (اختیاری) | آیا به جای VS Code از VS Code Insiders استفاده شود یا خیر |

ابزار یک شیء JSON با موارد زیر بازمی‌گرداند:
- `success`: بولین که نشان می‌دهد عملیات موفق بوده است یا خیر
- `message` یا `error`: پیام تایید یا پیام خطا

| حالت اشکال‌زدایی | شرح                                            | مراحل اشکال‌زدایی                                                                                                      |
| ---------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Agent Builder    | اشکال‌زدایی سرور MCP در Agent Builder از طریق AI Toolkit | 1. پنل اشکال‌زدایی VS Code را باز کنید. گزینه `Debug in Agent Builder` را انتخاب کرده و کلید `F5` را بزنید تا اشکال‌زدایی سرور MCP شروع شود.<br>2. از AI Toolkit Agent Builder برای تست سرور با [این درخواست](../../../../../../../../../../../open_prompt_builder) استفاده کنید. سرور به صورت خودکار به Agent Builder متصل می‌شود.<br>3. روی `Run` کلیک کنید تا سرور را با درخواست تست کنید. |
| MCP Inspector   | اشکال‌زدایی سرور MCP با استفاده از MCP Inspector | 1. نصب [Node.js](https://nodejs.org/)<br>2. آماده‌سازی Inspector: `cd inspector` و سپس `npm install` <br>3. پنل اشکال‌زدایی VS Code را باز کنید. `Debug SSE in Inspector (Edge)` یا `Debug SSE in Inspector (Chrome)` را انتخاب کنید. کلید F5 را بزنید تا اشکال‌زدایی شروع شود.<br>4. هنگامی که MCP Inspector در مرورگر باز شد، روی دکمه `Connect` کلیک کنید تا این سرور MCP متصل شود.<br>5. سپس می‌توانید `List Tools` را انجام دهید، یک ابزار انتخاب کنید، پارامترها را وارد کنید و برای اشکال‌زدایی کد سرور `Run Tool` را بزنید.<br> |

## پورت‌های پیش‌فرض و سفارشی‌سازی‌ها

| حالت اشکال‌زدایی | پورت‌ها                | تعاریف                                     | سفارشی‌سازی‌ها                                                                                  | یادداشت |
| ---------------- | ----------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------ | --------- |
| Agent Builder    | 3001                    | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)           | ویرایش [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) برای تغییر پورت‌ها. | بدون    |
| MCP Inspector   | 3001 (سرور)؛ 5173 و 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)           | ویرایش [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) برای تغییر پورت‌ها. | بدون    |

## بازخورد

اگر هرگونه بازخورد یا پیشنهادی برای این قالب دارید، لطفاً یک issue در [مخزن GitHub ابزار AI Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues) باز کنید.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. اگرچه ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است حاوی خطا یا نادقتی باشند. سند اصلی به زبان بومی خود باید منبع معتبر تلقی شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما مسئول هیچ گونه سوء تفاهم یا تفسیر نادرستی که از استفاده این ترجمه ناشی شود، نیستیم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->