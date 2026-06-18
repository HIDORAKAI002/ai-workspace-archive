# سرور MCP هواشناسی

این یک نمونه سرور MCP در پایتون است که ابزارهای هواشناسی را با پاسخ‌های شبیه‌سازی شده پیاده‌سازی می‌کند. می‌توان از آن به عنوان اسکافلد برای سرور MCP خودتان استفاده کرد. این نمونه شامل ویژگی‌های زیر است:

- **ابزار هواشناسی**: ابزاری که بر اساس محل داده شده، اطلاعات هواشناسی شبیه‌سازی شده ارائه می‌دهد.
- **اتصال به Agent Builder**: ویژگی که به شما اجازه می‌دهد سرور MCP را برای تست و اشکال‌زدایی به Agent Builder متصل کنید.
- **اشکال‌زدایی در [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ویژگی که امکان اشکال‌زدایی سرور MCP با استفاده از MCP Inspector را فراهم می‌کند.

## شروع به کار با قالب سرور MCP هواشناسی

> **پیش‌نیازها**
>
> برای اجرای سرور MCP روی دستگاه محلی توسعه خود، به موارد زیر نیاز دارید:
>
> - [پایتون](https://www.python.org/)
> - (*اختیاری - اگر uv را ترجیح می‌دهید*) [uv](https://github.com/astral-sh/uv)
> - [افزونه اشکال‌زدای پایتون](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## آماده‌سازی محیط

دو روش برای تنظیم محیط برای این پروژه وجود دارد. می‌توانید بر اساس ترجیح خود، یکی از این روش‌ها را انتخاب کنید.

> توجه: پس از ایجاد محیط مجازی، VSCode یا ترمینال را مجدداً بارگذاری کنید تا از پایتون محیط مجازی استفاده شود.

| روش | مراحل |
| -------- | ----- |
| استفاده از `uv` | 1. ایجاد محیط مجازی: `uv venv` <br>2. اجرای فرمان VSCode "***Python: Select Interpreter***" و انتخاب پایتون از محیط مجازی ایجاد شده <br>3. نصب وابستگی‌ها (شامل وابستگی‌های توسعه): `uv pip install -r pyproject.toml --extra dev` |
| استفاده از `pip` | 1. ایجاد محیط مجازی: `python -m venv .venv` <br>2. اجرای فرمان VSCode "***Python: Select Interpreter***" و انتخاب پایتون از محیط مجازی ایجاد شده<br>3. نصب وابستگی‌ها (شامل وابستگی‌های توسعه): `pip install -e .[dev]` | 

پس از راه‌اندازی محیط، می‌توانید سرور را در دستگاه محلی توسعه خود از طریق Agent Builder به عنوان مشتری MCP اجرا کنید تا شروع کنید:
1. پنل اشکال‌زدایی VS Code را باز کنید. گزینه `Debug in Agent Builder` را انتخاب کنید یا کلید `F5` را فشار دهید تا اشکال‌زدایی سرور MCP شروع شود.
2. از Microsoft Foundry Toolkit Agent Builder برای تست سرور با [این درخواست](../../../../../../../../../../../open_prompt_builder) استفاده کنید. سرور به طور خودکار به Agent Builder متصل خواهد شد.
3. روی `Run` کلیک کنید تا سرور را با درخواست تست کنید.

**تبریک می‌گوییم**! شما با موفقیت سرور MCP هواشناسی را در دستگاه محلی توسعه خود از طریق Agent Builder به عنوان مشتری MCP اجرا کردید.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## موارد موجود در قالب

| پوشه / فایل | محتویات                                  |
| ------------ | --------------------------------------- |
| `.vscode`    | فایل‌های VSCode برای اشکال‌زدایی       |
| `.aitk`      | پیکربندی‌ها برای Microsoft Foundry Toolkit                |
| `src`        | کد منبع سرور MCP هواشناسی               |

## چگونه سرور MCP هواشناسی را اشکال‌زدایی کنیم

> نکات:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ابزاری بصری برای توسعه‌دهندگان جهت تست و اشکال‌زدایی سرورهای MCP است.
> - همه حالت‌های اشکال‌زدایی از نقاط شکست پشتیبانی می‌کنند، بنابراین می‌توانید نقاط شکست را به کد پیاده‌سازی ابزار اضافه کنید.

| حالت اشکال‌زدایی | توضیح | مراحل اشکال‌زدایی |
| ---------- | ----------- | --------------- |
| Agent Builder | اشکال‌زدایی سرور MCP در Agent Builder از طریق Microsoft Foundry Toolkit. | 1. پنل اشکال‌زدایی VS Code را باز کنید. گزینه `Debug in Agent Builder` را انتخاب و کلید `F5` را فشار دهید تا اشکال‌زدایی سرور MCP آغاز شود.<br>2. از Microsoft Foundry Toolkit Agent Builder برای تست سرور با [این درخواست](../../../../../../../../../../../open_prompt_builder) استفاده کنید. سرور به طور خودکار به Agent Builder متصل خواهد شد.<br>3. روی `Run` کلیک کنید تا سرور را با درخواست تست کنید. |
| MCP Inspector | اشکال‌زدایی سرور MCP با استفاده از MCP Inspector. | 1. نصب [Node.js](https://nodejs.org/)<br> 2. راه‌اندازی Inspector: `cd inspector` && `npm install` <br> 3. پنل اشکال‌زدایی VS Code را باز کنید. `Debug SSE in Inspector (Edge)` یا `Debug SSE in Inspector (Chrome)` را انتخاب کنید. کلید F5 را فشار دهید تا اشکال‌زدایی آغاز شود.<br> 4. وقتی MCP Inspector در مرورگر باز شد، روی دکمه `Connect` کلیک کنید تا به این سرور MCP متصل شوید.<br> 5. سپس می‌توانید `List Tools` را انتخاب کنید، یک ابزار را برگزینید، پارامترها را وارد کرده و با `Run Tool` کد سرورتان را اشکال‌زدایی کنید.<br> |

## پورت‌های پیش‌فرض و سفارشی‌سازی‌ها

| حالت اشکال‌زدایی | پورت‌ها | تعاریف | سفارشی‌سازی‌ها | توضیح |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ویرایش [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) برای تغییر پورت‌ها. | ندارد |
| MCP Inspector | 3001 (سرور)؛ 5173 و 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ویرایش [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) برای تغییر پورت‌ها.| ندارد |

## بازخورد

اگر هرگونه بازخورد یا پیشنهاد برای این قالب دارید، لطفاً یک issue در [مخزن Microsoft Foundry Toolkit در گیت‌هاب](https://github.com/microsoft/vscode-ai-toolkit/issues) باز کنید.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->