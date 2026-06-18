# موسمی MCP سرور

یہ ایک نمونہ MCP سرور ہے جو موسمی اوزاروں کو جعلی جوابات کے ساتھ لاگو کرتا ہے۔ اسے آپ کے اپنے MCP سرور کے لیے ایک سانچہ کے طور پر استعمال کیا جا سکتا ہے۔ اس میں درج ذیل خصوصیات شامل ہیں:

- **موسمی ٹول**: ایک ایسا ٹول جو دی گئی جگہ کی بنیاد پر جعلی موسمی معلومات فراہم کرتا ہے۔
- **ایجنٹ بلڈر سے کنیکٹ کریں**: ایک خصوصیت جو آپ کو MCP سرور کو ایجنٹ بلڈر سے کنیکٹ کرنے کی اجازت دیتی ہے تاکہ ٹیسٹنگ اور ڈیبگنگ کی جا سکے۔
- **[MCP انسپکٹر](https://github.com/modelcontextprotocol/inspector) میں ڈیبگ کریں**: ایک خصوصیت جو آپ کو MCP سرور کو MCP انسپکٹر کے ذریعے ڈیبگ کرنے کی اجازت دیتی ہے۔

## موسم کا MCP سرور ٹیمپلیٹ کے ساتھ شروع کریں

> **ضروریات**
>
> اپنے مقامی ڈویلپمنٹ مشین پر MCP سرور کو چلانے کے لیے، آپ کو ضرورت ہو گی:
>
> - [Python](https://www.python.org/)
> - (*اختیاری - اگر آپ uv پسند کرتے ہیں*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger ایکسٹینشن](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ماحول کی تیاری

اس پروجیکٹ کے ماحول کو ترتیب دینے کے دو طریقے ہیں۔ آپ اپنی پسند کے مطابق کوئی بھی طریقہ منتخب کر سکتے ہیں۔

> نوٹ: ورچوئل ماحول بنانے کے بعد اس بات کو یقینی بنانے کے لیے VSCode یا ٹرمینل کو ری لوڈ کریں کہ ورچوئل ماحول کا Python استعمال ہو رہا ہے۔

| طریقہ | مراحل |
| -------- | ----- |
| `uv` استعمال کرنا | 1. ورچوئل ماحول بنائیں: `uv venv` <br>2. VSCode کمانڈ "***Python: Select Interpreter***" چلائیں اور بنائے گئے ورچوئل ماحول سے Python کو منتخب کریں <br>3. ڈیپینڈنسیاں انسٹال کریں (ڈویلپمنٹ کی ڈیپینڈنسیاں شامل ہیں): `uv pip install -r pyproject.toml --extra dev` |
| `pip` استعمال کرنا | 1. ورچوئل ماحول بنائیں: `python -m venv .venv` <br>2. VSCode کمانڈ "***Python: Select Interpreter***" چلائیں اور بنائے گئے ورچوئل ماحول سے Python کو منتخب کریں<br>3. ڈیپینڈنسیاں انسٹال کریں (ڈویلپمنٹ کی ڈیپینڈنسیاں شامل ہیں): `pip install -e .[dev]` |

ماحول سیٹ اپ کرنے کے بعد، آپ ایجنٹ بلڈر کے ذریعے MCP کلائنٹ کے طور پر اپنے مقامی ڈویلپمنٹ مشین پر سرور چلا سکتے ہیں تاکہ شروع کیا جا سکے:
1. VS Code کا ڈیبگ پینل کھولیں۔ `Debug in Agent Builder` منتخب کریں یا MCP سرور کو ڈیبگ کرنے کے لیے `F5` دبائیں۔
2. Microsoft Foundry Toolkit Agent Builder استعمال کریں تاکہ سرور کو [اس پرمپٹ](../../../../../../../../../../../open_prompt_builder) کے ساتھ ٹیسٹ کریں۔ سرور خود بخود ایجنٹ بلڈر سے کنیکٹ ہو جائے گا۔
3. سرور کو پرمپٹ کے ساتھ ٹیسٹ کرنے کے لیے `Run` پر کلک کریں۔

**مبارک ہو!** آپ نے ایجنٹ بلڈر کے ذریعے MCP کلائنٹ کے طور پر اپنے مقامی ڈویلپمنٹ مشین پر کامیابی سے Weather MCP Server چلایا ہے۔
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ٹیمپلیٹ میں کیا شامل ہے

| فولڈر / فائل | مواد                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | ڈیبگنگ کے لیے VSCode فائلز                   |
| `.aitk`      | Microsoft Foundry Toolkit کی کنفیگریشنز                |
| `src`        | موسم کے MCP سرور کا سورس کوڈ                  |

## Weather MCP Server کو کیسے ڈیبگ کریں

> نوٹس:
> - [MCP انسپکٹر](https://github.com/modelcontextprotocol/inspector) ایک بصری ڈویلپر ٹول ہے جو MCP سرورز کی جانچ اور ڈیبگ کے لیے ہے۔
> - تمام ڈیبگنگ موڈز بریک پوائنٹس کو سپورٹ کرتے ہیں، یعنی آپ ٹول کی امپلیمنٹیشن کوڈ میں بریک پوائنٹس شامل کر سکتے ہیں۔

| ڈیبگ موڈ | وضاحت | ڈیبگ کرنے کے اقدامات |
| ---------- | ----------- | --------------- |
| ایجنٹ بلڈر | Microsoft Foundry Toolkit کے ذریعے ایجنٹ بلڈر میں MCP سرور کو ڈیبگ کریں۔ | 1. VS Code کا ڈیبگ پینل کھولیں۔ `Debug in Agent Builder` منتخب کریں اور MCP سرور کو ڈیبگ کرنا شروع کرنے کے لیے `F5` دبائیں۔<br>2. Microsoft Foundry Toolkit Agent Builder استعمال کریں تاکہ سرور کو [اس پرمپٹ](../../../../../../../../../../../open_prompt_builder) کے ساتھ ٹیسٹ کریں۔ سرور خود بخود ایجنٹ بلڈر سے کنیکٹ ہو جائے گا۔<br>3. پرمپٹ کے ساتھ سرور کی جانچ کرنے کے لیے `Run` پر کلک کریں۔ |
| MCP انسپکٹر | MCP انسپکٹر کا استعمال کرتے ہوئے MCP سرور کو ڈیبگ کریں۔ | 1. [Node.js](https://nodejs.org/) انسٹال کریں<br> 2. انسپکٹر سیٹ اپ کریں: `cd inspector` && `npm install` <br> 3. VS Code کا ڈیبگ پینل کھولیں۔ `Debug SSE in Inspector (Edge)` یا `Debug SSE in Inspector (Chrome)` منتخب کریں۔ `F5` دبائیں تاکہ ڈیبگ شروع ہو سکے۔<br> 4. جب MCP انسپکٹر براؤزر میں لانچ ہو، `Connect` بٹن پر کلک کریں تاکہ اس MCP سرور سے کنکشن قائم ہو سکے۔<br> 5. پھر آپ `List Tools` کر سکتے ہیں، کوئی ٹول منتخب کریں، پیرامیٹرز انپٹ کریں، اور `Run Tool` کرکے اپنے سرور کوڈ کو ڈیبگ کر سکتے ہیں۔<br> |

## ڈیفالٹ پورٹس اور تخصیصات

| ڈیبگ موڈ | پورٹس | تفصیلات | تخصیصات | نوٹ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| ایجنٹ بلڈر | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) کو ایڈیٹ کریں تاکہ پورٹس کو تبدیل کیا جا سکے۔ | لاگو نہیں |
| MCP انسپکٹر | 3001 (سرور); 5173 اور 3000 (انسپکٹر) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) کو ایڈیٹ کریں تاکہ پورٹس کو تبدیل کیا جا سکے۔| لاگو نہیں |

## تاثرات

اگر آپ کے پاس اس ٹیمپلیٹ کے بارے میں کوئی فیڈبیک یا تجاویز ہیں تو براہ کرم [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) پر ایک مسئلہ کھولیں۔

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->