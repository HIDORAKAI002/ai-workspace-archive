# موسم کا MCP سرور

یہ Python میں ایک مثال MCP سرور ہے جو موسم کے آلات کو موک جوابات کے ساتھ نافذ کرتا ہے۔ اسے آپ کے اپنے MCP سرور کے لیے ایک ڈھانچہ کے طور پر استعمال کیا جا سکتا ہے۔ اس میں مندرجہ ذیل خصوصیات شامل ہیں:

- **موسم کا آلہ**: ایک آلہ جو دی گئی جگہ کی بنیاد پر موک کردہ موسم کی معلومات فراہم کرتا ہے۔
- **ایجنٹ بلڈر سے منسلک کریں**: ایک خصوصیت جو آپ کو MCP سرور کو ایجنٹ بلڈر سے منسلک کرنے کی اجازت دیتی ہے تاکہ ٹیسٹ اور ڈیبگ کیا جا سکے۔
- **[MCP انسپیکٹر](https://github.com/modelcontextprotocol/inspector) میں ڈیبگ کریں**: ایک خصوصیت جو آپ کو MCP سرور کو MCP انسپیکٹر کا استعمال کرتے ہوئے ڈیبگ کرنے کی اجازت دیتی ہے۔

## موسم کے MCP سرور ٹیمپلیٹ کے ساتھ شروع کریں

> **ضروریات**
>
> اپنے مقامی ترقیاتی مشین پر MCP سرور چلانے کے لیے، آپ کو چاہیے ہوگا:
>
> - [Python](https://www.python.org/)
> - (*اختیاری - اگر آپ uv کو ترجیح دیتے ہیں*) [uv](https://github.com/astral-sh/uv)
> - [Python ڈیبگر ایکسٹینشن](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ماحول تیار کریں

اس پروجیکٹ کے لیے ماحول سیٹ اپ کرنے کے دو طریقے ہیں۔ آپ اپنی پسند کے مطابق کسی ایک کا انتخاب کر سکتے ہیں۔

> نوٹ: ورچوئل ماحول بنانے کے بعد VSCode یا ٹرمینل کو دوبارہ لوڈ کریں تاکہ ورچوئل ماحول کا پائتھون استعمال ہو۔

| طریقہ | مراحل |
| -------- | ----- |
| `uv` استعمال کرتے ہوئے | 1. ورچوئل ماحول بنائیں: `uv venv` <br> 2. VSCode کمانڈ "***Python: Select Interpreter***" چلائیں اور بنائے گئے ورچوئل ماحول کا پائتھون منتخب کریں <br> 3. انحصار انسٹال کریں (ڈویلپمنٹ انحصار سمیت): `uv pip install -r pyproject.toml --extra dev` |
| `pip` استعمال کرتے ہوئے | 1. ورچوئل ماحول بنائیں: `python -m venv .venv` <br> 2. VSCode کمانڈ "***Python: Select Interpreter***" چلائیں اور بنائے گئے ورچوئل ماحول کا پائتھون منتخب کریں <br> 3. انحصار انسٹال کریں (ڈویلپمنٹ انحصار سمیت): `pip install -e .[dev]` |

ماحول سیٹ اپ کرنے کے بعد، آپ Agent Builder کے ذریعے MCP کلائنٹ کے طور پر اپنے مقامی ترقیاتی مشین پر سرور چلا سکتے ہیں تاکہ شروع کیا جا سکے:
1. VS Code ڈیبگ پینل کھولیں۔ `Debug in Agent Builder` منتخب کریں یا MCP سرور کو ڈیبگ کرنے کے لیے `F5` دبائیں۔
2. AI Toolkit Agent Builder کا استعمال کرتے ہوئے سرور کو [اس پرامپٹ](../../../../../../../../../../../open_prompt_builder) کے ساتھ ٹیسٹ کریں۔ سرور خود بخود ایجنٹ بلڈر سے منسلک ہو جائے گا۔
3. پرامپٹ کے ساتھ سرور کو ٹیسٹ کرنے کے لیے `Run` پر کلک کریں۔

**مبارک ہو**! آپ نے کامیابی کے ساتھ موسم کا MCP سرور اپنے مقامی ترقیاتی مشین پر Agent Builder کے ذریعے MCP کلائنٹ کے طور پر چلایا ہے۔
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ٹیمپلیٹ میں شامل مواد

| فولڈر / فائل | مواد |
| ------------ | -------------------------------------------- |
| `.vscode`    | ڈیبگ کرنے کے لیے VSCode فائلیں |
| `.aitk`      | AI Toolkit کے لیے تشکیلات |
| `src`        | موسم کے MCP سرور کا ماخذ کوڈ |

## موسم کے MCP سرور کو کیسے ڈیبگ کریں

> نوٹس:
> - [MCP انسپیکٹر](https://github.com/modelcontextprotocol/inspector) MCP سرورز کی جانچ اور ڈیبگ کرنے کے لیے ایک بصری ڈویلپر ٹول ہے۔
> - تمام ڈیبگ موڈز بریک پوائنٹس کی حمایت کرتے ہیں، لہٰذا آپ ٹول کی کوڈنگ میں بریک پوائنٹس شامل کر سکتے ہیں۔

| ڈیبگ موڈ | وضاحت | ڈیبگ کرنے کے مراحل |
| ---------- | ----------- | --------------- |
| ایجنٹ بلڈر | AI Toolkit کے ذریعے ایجنٹ بلڈر میں MCP سرور کو ڈیبگ کریں۔ | 1. VS Code ڈیبگ پینل کھولیں۔ `Debug in Agent Builder` منتخب کریں اور MCP سرور کو ڈیبگ کرنے کے لیے `F5` دبائیں۔<br> 2. AI Toolkit Agent Builder استعمال کرتے ہوئے سرور کو [اس پرامپٹ](../../../../../../../../../../../open_prompt_builder) کے ساتھ ٹیسٹ کریں۔ سرور خود بخود ایجنٹ بلڈر سے منسلک ہو جائے گا۔<br> 3. پرامپٹ کے ساتھ سرور کو ٹیسٹ کرنے کے لیے `Run` پر کلک کریں۔ |
| MCP انسپیکٹر | MCP انسپیکٹر کا استعمال کرتے ہوئے MCP سرور کو ڈیبگ کریں۔ | 1. [Node.js](https://nodejs.org/) انسٹال کریں۔<br> 2. انسپیکٹر سیٹ اپ کریں: `cd inspector` && `npm install` <br> 3. VS Code ڈیبگ پینل کھولیں۔ `Debug SSE in Inspector (Edge)` یا `Debug SSE in Inspector (Chrome)` منتخب کریں۔ `F5` دبائیں تاکہ ڈیبگ شروع ہو۔<br> 4. جب MCP انسپیکٹر براؤزر میں کھلے تو `Connect` بٹن پر کلک کریں تاکہ اس MCP سرور سے جڑ سکیں۔<br> 5. پھر آپ `List Tools` کر سکتے ہیں، کوئی آلہ منتخب کریں، پیرامیٹرز ڈالیں، اور `Run Tool` کر کے اپنے سرور کوڈ کو ڈیبگ کریں۔<br> |

## ڈیفالٹ پورٹس اور تخصیصات

| ڈیبگ موڈ | پورٹس | تعریفیں | تخصیصات | نوٹ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| ایجنٹ بلڈر | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ان پورٹس کو تبدیل کرنے کے لیے [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) میں ترمیم کریں۔ | لاگو نہیں |
| MCP انسپیکٹر | 3001 (سرور); 5173 اور 3000 (انسپیکٹر) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | ان پورٹس کو تبدیل کرنے کے لیے [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) میں ترمیم کریں۔ | لاگو نہیں |

## تاثرات

اگر آپ کے پاس اس ٹیمپلیٹ کے لیے کوئی تاثرات یا تجاویز ہیں، تو براہ کرم [AI Toolkit GitHub ریپوزیٹری](https://github.com/microsoft/vscode-ai-toolkit/issues) پر ایک مسئلہ کھولیں۔

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**وضاحتی نوٹ**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ اگرچہ ہم درستگی کی کوشش کرتے ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجموں میں غلطیاں یا بے دقتیاں ہو سکتی ہیں۔ اصل دستاویز اپنی مادری زبان میں ہی مستند ماخذ تصور کی جانی چاہیے۔ اہم معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے ہونے والی کسی بھی غلط فہمی یا غلط تعبیر کی ذمہ داری ہم پر عائد نہیں ہوتی۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->