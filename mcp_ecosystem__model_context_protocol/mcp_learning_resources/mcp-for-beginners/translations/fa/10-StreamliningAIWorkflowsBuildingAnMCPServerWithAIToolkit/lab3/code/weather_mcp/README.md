# سرور MCP هواشناسی

این یک نمونه سرور MCP به زبان پایتون است که ابزارهای هواشناسی را با پاسخ‌های شبیه‌سازی‌شده پیاده‌سازی می‌کند. می‌توان از آن به عنوان پایه‌ای برای سرور MCP خودتان استفاده کرد. این سرور شامل ویژگی‌های زیر است:

- **ابزار هواشناسی**: ابزاری که اطلاعات هواشناسی شبیه‌سازی‌شده را بر اساس موقعیت داده‌شده ارائه می‌دهد.
- **اتصال به Agent Builder**: ویژگی‌ای که به شما امکان می‌دهد سرور MCP را برای تست و اشکال‌زدایی به Agent Builder وصل کنید.
- **اشکال‌زدایی با [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: ویژگی‌ای که اجازه می‌دهد سرور MCP را با استفاده از MCP Inspector اشکال‌زدایی کنید.

## شروع به کار با قالب سرور MCP هواشناسی

> **پیش‌نیازها**
>
> برای اجرای سرور MCP در ماشین توسعه محلی خود به موارد زیر نیاز دارید:
>
> - [پایتون](https://www.python.org/)
> - (*اختیاری - اگر ترجیح می‌دهید از uv استفاده کنید*) [uv](https://github.com/astral-sh/uv)
> - [افزونه اشکال‌زدایی پایتون](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## آماده‌سازی محیط

دو روش برای راه‌اندازی محیط این پروژه وجود دارد. می‌توانید یکی از آن‌ها را بر اساس ترجیح خود انتخاب کنید.

> نکته: پس از ایجاد محیط مجازی، VSCode یا ترمینال را مجدداً بارگذاری کنید تا از پایتون محیط مجازی استفاده شود.

| روش | مراحل |
| -------- | ----- |
| استفاده از `uv` | 1. ایجاد محیط مجازی: `uv venv` <br>2. اجرای دستور VSCode "***Python: Select Interpreter***" و انتخاب پایتون از محیط مجازی ایجادشده <br>3. نصب وابستگی‌ها (شامل وابستگی‌های توسعه): `uv pip install -r pyproject.toml --extra dev` |
| استفاده از `pip` | 1. ایجاد محیط مجازی: `python -m venv .venv` <br>2. اجرای دستور VSCode "***Python: Select Interpreter***" و انتخاب پایتون از محیط مجازی ایجادشده<br>3. نصب وابستگی‌ها (شامل وابستگی‌های توسعه): `pip install -e .[dev]` | 

پس از راه‌اندازی محیط، می‌توانید سرور را در ماشین توسعه محلی خود از طریق Agent Builder به عنوان کلاینت MCP اجرا کنید تا شروع کنید:
1. پنل اشکال‌زدایی VS Code را باز کنید. گزینه `Debug in Agent Builder` را انتخاب کنید یا کلید `F5` را فشار دهید تا اشکال‌زدایی سرور MCP آغاز شود.
2. از AI Toolkit Agent Builder برای تست سرور با [این درخواست](../../../../../../../../../../../open_prompt_builder) استفاده کنید. سرور به صورت خودکار به Agent Builder متصل خواهد شد.
3. روی `Run` کلیک کنید تا سرور را با درخواست تست کنید.

**تبریک می‌گوییم**! شما با موفقیت سرور MCP هواشناسی را در ماشین توسعه محلی خود از طریق Agent Builder به عنوان کلاینت MCP اجرا کرده‌اید.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## محتویات قالب

| پوشه / فایل| محتویات                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | فایل‌های VSCode برای اشکال‌زدایی                   |
| `.aitk`      | پیکربندی‌های AI Toolkit                |
| `src`        | کد منبع سرور MCP هواشناسی   |

## نحوه اشکال‌زدایی سرور MCP هواشناسی

> نکات:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) یک ابزار بصری برای توسعه‌دهندگان جهت تست و اشکال‌زدایی سرورهای MCP است.
> - همه حالت‌های اشکال‌زدایی از نقاط توقف پشتیبانی می‌کنند، بنابراین می‌توانید نقاط توقف را به کد پیاده‌سازی ابزار اضافه کنید.

| حالت اشکال‌زدایی | توضیحات | مراحل اشکال‌زدایی |
| ---------- | ----------- | --------------- |
| Agent Builder | اشکال‌زدایی سرور MCP در Agent Builder از طریق AI Toolkit. | 1. پنل اشکال‌زدایی VS Code را باز کنید. گزینه `Debug in Agent Builder` را انتخاب کنید و کلید `F5` را فشار دهید تا اشکال‌زدایی آغاز شود.<br>2. از AI Toolkit Agent Builder برای تست سرور با [این درخواست](../../../../../../../../../../../open_prompt_builder) استفاده کنید. سرور به طور خودکار به Agent Builder متصل می‌شود.<br>3. روی `Run` کلیک کنید تا سرور را با درخواست تست کنید. |
| MCP Inspector | اشکال‌زدایی سرور MCP با استفاده از MCP Inspector. | 1. نصب [Node.js](https://nodejs.org/)<br> 2. راه‌اندازی Inspector: `cd inspector` && `npm install` <br> 3. پنل اشکال‌زدایی VS Code را باز کنید. گزینه `Debug SSE in Inspector (Edge)` یا `Debug SSE in Inspector (Chrome)` را انتخاب کنید و کلید F5 را فشار دهید تا اشکال‌زدایی شروع شود.<br> 4. هنگامی که MCP Inspector در مرورگر باز شد، روی دکمه `Connect` کلیک کنید تا این سرور MCP متصل شود.<br> 5. سپس می‌توانید ابزارها را فهرست کنید، یک ابزار را انتخاب کنید، پارامترها را وارد کنید و با `Run Tool` کد سرور خود را اشکال‌زدایی کنید.<br> |

## پورت‌های پیش‌فرض و سفارشی‌سازی‌ها

| حالت اشکال‌زدایی | پورت‌ها | تعاریف | سفارشی‌سازی‌ها | توضیحات |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ویرایش [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) برای تغییر پورت‌ها. | ندارد |
| MCP Inspector | 3001 (سرور); 5173 و 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ویرایش [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) برای تغییر پورت‌ها.| ندارد |

## بازخورد

اگر پیشنهادی یا بازخوردی درباره این قالب دارید، لطفاً یک issue در [مخزن GitHub AI Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues) باز کنید.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:  
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است حاوی اشتباهات یا نادرستی‌هایی باشند. سند اصلی به زبان مبدا به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما مسئول هیچگونه سوءتفاهم یا برداشت نادرستی که از استفاده از این ترجمه ناشی شود، نمی‌باشیم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->