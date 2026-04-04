# ویڈر MCP سرور

یہ ایک نمونہ MCP سرور ہے جو Python میں موسم کے آلات کو موک جوابات کے ساتھ نافذ کرتا ہے۔ اسے آپ کے اپنے MCP سرور کے لیے ایک ڈھانچہ کے طور پر استعمال کیا جا سکتا ہے۔ اس میں درج ذیل خصوصیات شامل ہیں:

- **ویڈر ٹول**: ایک ٹول جو دی گئی جگہ کی بنیاد پر موک شدہ موسم کی معلومات فراہم کرتا ہے۔
- **Git Clone Tool**: ایک ٹول جو گٹ ریپوزیٹری کو مخصوص فولڈر میں کلون کرتا ہے۔
- **VS Code Open Tool**: ایک ٹول جو فولڈر کو VS Code یا VS Code Insiders میں کھولتا ہے۔
- **ایجنٹ بلڈر سے رابطہ کریں**: ایک خصوصیت جو آپ کو MCP سرور کو ایجنٹ بلڈر سے ٹیسٹنگ اور ڈی بگنگ کے لیے جوڑنے کی اجازت دیتی ہے۔
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) میں ڈی بگ کریں**: ایک خصوصیت جو آپ کو MCP سرور کو MCP Inspector کے ذریعے ڈی بگ کرنے کی اجازت دیتی ہے۔

## ویڈر MCP سرور ٹیمپلیٹ کے ساتھ شروع کریں

> **شرائط**
>
> اپنے لوکل ڈویلپمنٹ مشین پر MCP سرور چلانے کے لیے آپ کو درکار ہیں:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo ٹول کے لیے ضروری)
> - [VS Code](https://code.visualstudio.com/) یا [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode ٹول کے لیے ضروری)
> - (*اختیاری - اگر آپ uv پسند کرتے ہیں*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## ماحول تیار کریں

اس پروجیکٹ کے لیے ماحول تیار کرنے کے دو طریقے ہیں۔ آپ اپنی پسند کے مطابق کوئی بھی طریقہ منتخب کر سکتے ہیں۔

> نوٹ: ورچوئل انوائرنمنٹ بنانے کے بعد VSCode یا ٹرمینل کو ری لوڈ کریں تاکہ ورچوئل انوائرنمنٹ کا Python استعمال ہو۔

| طریقہ | اقدامات |
| -------- | ----- |
| `uv` کا استعمال | 1. ورچوئل انوائرنمنٹ بنائیں: `uv venv` <br>2. VSCode کمانڈ "***Python: Select Interpreter***" چلائیں اور بنائی گئی ورچوئل انوائرنمنٹ کا Python منتخب کریں <br>3. انحصار (dependencies) انسٹال کریں (ڈویلپمنٹ انحصار سمیت): `uv pip install -r pyproject.toml --extra dev` |
| `pip` کا استعمال | 1. ورچوئل انوائرنمنٹ بنائیں: `python -m venv .venv` <br>2. VSCode کمانڈ "***Python: Select Interpreter***" چلائیں اور بنائی گئی ورچوئل انوائرنمنٹ کا Python منتخب کریں<br>3. انحصار انسٹال کریں (ڈویلپمنٹ انحصار سمیت): `pip install -e .[dev]` | 

ماحول سیٹ اپ کرنے کے بعد، آپ ایجنٹ بلڈر کے ذریعے MCP کلائنٹ کے طور پر اپنے لوکل مشین پر سرور چلانا شروع کر سکتے ہیں:
1. VS Code کے Debug پینل کو کھولیں۔ `Debug in Agent Builder` منتخب کریں یا MCP سرور کو ڈی بگ کرنے کے لیے `F5` دبائیں۔
2. AI Toolkit Agent Builder استعمال کریں اور [اس پرامپٹ](../../../../../../../../../../../open_prompt_builder) کے ذریعے سرور کا ٹیسٹ کریں۔ سرور خود بخود ایجنٹ بلڈر سے جڑ جائے گا۔
3. پرامپٹ کے ساتھ سرور ٹیسٹ کرنے کے لیے `Run` پر کلک کریں۔

**مبارک ہو**! آپ نے کامیابی سے ایجنٹ بلڈر کے ذریعے MCP کلائنٹ کے طور پر اپنے لوکل مشین پر ویڈر MCP سرور چلایا ہے۔
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## ٹیمپلیٹ میں کیا شامل ہے

| فولڈر / فائل | مواد                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | VSCode کی فائلیں ڈی بگنگ کے لیے               |
| `.aitk`      | AI Toolkit کی کنفیگریشنز                          |
| `src`        | ویڈر MCP سرور کا سورس کوڈ                      |

## ویڈر MCP سرور کو کس طرح ڈی بگ کریں

> نوٹس:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) ایک بصری ڈویلپر ٹول ہے جو MCP سرورز کی ٹیسٹنگ اور ڈی بگنگ کے لیے استعمال ہوتا ہے۔
> - تمام ڈی بگنگ موڈز بریک پوائنٹس کی حمایت کرتے ہیں، لہٰذا آپ ٹول کے امپلیمنٹیشن کوڈ میں بریک پوائنٹس شامل کر سکتے ہیں۔

## دستیاب آلات

### ویڈر ٹول
`get_weather` ٹول دی گئی جگہ کے لیے موک شدہ موسم کی معلومات فراہم کرتا ہے۔

| پیرامیٹر | قسم | وضاحت |
| --------- | ---- | ----------- |
| `location` | سٹرنگ | موسم حاصل کرنے کے لیے جگہ (جیسے شہر کا نام، ریاست، یا کوآرڈینیٹس) |

### Git Clone Tool
`git_clone_repo` ٹول گٹ ریپوزیٹری کو مخصوص فولڈر میں کلون کرتا ہے۔

| پیرامیٹر | قسم | وضاحت |
| --------- | ---- | ----------- |
| `repo_url` | سٹرنگ | کلون کرنے کے لیے گٹ ریپوزیٹری کا URL |
| `target_folder` | سٹرنگ | فولڈر کا راستہ جہاں ریپوزیٹری کلون کرنی ہے |

یہ ٹول ایک JSON آبجیکٹ واپس کرتا ہے جس میں شامل ہیں:
- `success`: بلیئن جو بتاتا ہے کہ آپریشن کامیاب ہوا یا نہیں
- `target_folder` یا `error`: کلون کی گئی ریپوزیٹری کا راستہ یا کوئی ایرر پیغام

### VS Code Open Tool
`open_in_vscode` ٹول فولڈر کو VS Code یا VS Code Insiders ایپلیکیشن میں کھولتا ہے۔

| پیرامیٹر | قسم | وضاحت |
| --------- | ---- | ----------- |
| `folder_path` | سٹرنگ | فولڈر کا راستہ جو کھولنا ہے |
| `use_insiders` | بلیئن (اختیاری) | آیا عام VS Code کی بجائے VS Code Insiders استعمال کرنا ہے یا نہیں |

یہ ٹول ایک JSON آبجیکٹ واپس کرتا ہے جس میں شامل ہیں:
- `success`: بلیئن جو بتاتا ہے کہ آپریشن کامیاب تھا یا نہیں
- `message` یا `error`: تصدیقی پیغام یا ایرر پیغام

| ڈی بگ موڈ | وضاحت | ڈی بگ کرنے کے اقدامات |
| ---------- | ----------- | --------------- |
| Agent Builder | AI Toolkit کے ذریعے ایجنٹ بلڈر میں MCP سرور کو ڈی بگ کریں۔ | 1. VS Code کے Debug پینل کو کھولیں۔ `Debug in Agent Builder` منتخب کریں اور MCP سرور ڈی بگ کرنے کے لیے `F5` دبائیں۔<br>2. AI Toolkit Agent Builder کا استعمال کرتے ہوئے [اس پرامپٹ](../../../../../../../../../../../open_prompt_builder) کے ساتھ سرور کو ٹیسٹ کریں۔ سرور خود بخود ایجنٹ بلڈر سے جڑ جائے گا۔<br>3. پرامپٹ کے ساتھ سرور ٹیسٹ کرنے کے لیے `Run` پر کلک کریں۔ |
| MCP Inspector | MCP Inspector کا استعمال کرتے ہوئے MCP سرور کو ڈی بگ کریں۔ | 1. [Node.js](https://nodejs.org/) انسٹال کریں<br> 2. Inspector سیٹ اپ کریں: `cd inspector` && `npm install` <br> 3. VS Code کے Debug پینل کو کھولیں۔ `Debug SSE in Inspector (Edge)` یا `Debug SSE in Inspector (Chrome)` منتخب کریں۔ ڈی بگنگ شروع کرنے کے لیے `F5` دبائیں۔<br> 4. جب MCP Inspector براؤزر میں لانچ ہو جائے، تو اس MCP سرور کو جوڑنے کے لیے `Connect` بٹن پر کلک کریں۔<br> 5. پھر آپ `List Tools` کر سکتے ہیں، کوئی ٹول منتخب کریں، پیرامیٹرز داخل کریں، اور `Run Tool` کر کے اپنے سرور کو ڈی بگ کر سکتے ہیں۔<br> |

## ڈیفالٹ پورٹس اور حسب ضرورت تبدیلیاں

| ڈی بگ موڈ | پورٹس | تعریفیں | حسب ضرورت تبدیلیاں | نوٹ |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | مذکورہ پورٹس کو تبدیل کرنے کے لیے [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) کو ترمیم کریں۔ | لاگو نہیں |
| MCP Inspector | 3001 (سرور)؛ 5173 اور 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | مذکورہ پورٹس کو تبدیل کرنے کے لیے [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json)، [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)، [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py)، [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) کو ترمیم کریں۔ | لاگو نہیں |

## تاثرات

اگر آپ کے پاس اس ٹیمپلیٹ کے بارے میں کوئی فیڈبیک یا تجاویز ہیں، تو براہ کرم [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues) پر مسئلہ کھولیں۔

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**انتباہ**:  
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ اگرچہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات کا خیال رکھیں کہ خودکار ترجمے میں غلطیاں یا نقصانات ہو سکتے ہیں۔ اصل دستاویز اپنی مادری زبان میں ہی معتبر ماخذ سمجھی جانی چاہیے۔ اہم معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم پر عائد نہیں ہوتی۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->