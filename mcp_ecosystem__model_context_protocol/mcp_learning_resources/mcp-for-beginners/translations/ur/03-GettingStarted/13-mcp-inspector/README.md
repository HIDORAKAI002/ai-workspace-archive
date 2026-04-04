# MCP انسپکٹر کے ساتھ ڈیبگ کرنا

**MCP انسپکٹر** ایک اہم ڈیبگنگ ٹول ہے جو آپ کو اپنے MCP سرورز کو انٹرایکٹو طریقے سے ٹیسٹ اور مسئلے حل کرنے کی سہولت دیتا ہے بغیر کسی پورے AI ہوسٹ ایپلیکیشن کی ضرورت کے۔ اسے "MCP کے لیے پوسٹ مین" سمجھیں - یہ درخواستیں بھیجنے، جوابات دیکھنے، اور یہ سمجھنے کے لیے ایک بصری انٹرفیس فراہم کرتا ہے کہ آپ کا سرور کیسے کام کرتا ہے۔

## MCP انسپکٹر کیوں استعمال کریں؟

جب آپ MCP سرورز بنا رہے ہوں گے، تو آپ کو اکثر یہ چیلنجز درپیش آئیں گے:

- **"کیا میرا سرور چل رہا ہے؟"** - انسپکٹر کنکشن کی صورتحال دکھاتا ہے
- **"کیا میرے ٹولز درست طریقے سے رجسٹر ہیں؟"** - انسپکٹر تمام دستیاب ٹولز کی فہرست دکھاتا ہے
- **"جواب کا فارمٹ کیا ہے؟"** - انسپکٹر مکمل JSON جوابات دکھاتا ہے
- **"یہ ٹول کیوں کام نہیں کر رہا؟"** - انسپکٹر تفصیلی خرابی پیغامات دکھاتا ہے

## درکار چیزیں

- Node.js 18+ انسٹال شدہ
- npm (Node.js کے ساتھ آتا ہے)
- ایک MCP سرور ٹیسٹ کرنے کے لیے (دیکھیں [Module 3.1 - First Server](../01-first-server/README.md))

## تنصیب

### آپشن 1: npx کے ساتھ چلائیں (تیز ٹیسٹنگ کے لیے سفارش کردہ)

```bash
npx @modelcontextprotocol/inspector
```

### آپشن 2: عالمی سطح پر انسٹال کریں

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### آپشن 3: اپنے پروجیکٹ میں شامل کریں

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

`package.json` میں شامل کریں:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## اپنے سرور سے کنیکٹ ہونا

### stdio سرورز (مقامی عمل)

ایسے سرورز کے لیے جو معیاری ان پٹ/آؤٹ پٹ کے ذریعے بات چیت کرتے ہیں:

```bash
# پائتھون سرور
npx @modelcontextprotocol/inspector python -m your_server_module

# نوڈ.جے ایس سرور
npx @modelcontextprotocol/inspector node ./build/index.js

# ماحولیاتی متغیرات کے ساتھ
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP سرورز (نیٹ ورک)

ایسے سرورز کے لیے جو HTTP خدمات کے طور پر چل رہے ہوں:

1. سب سے پہلے اپنے سرور کو چلائیں:
   ```bash
   python server.py  # سرور http://localhost:8080 پر چل رہا ہے
   ```

2. انسپکٹر شروع کریں اور کنیکٹ کریں:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## انسپکٹر انٹرفیس کا جائزہ

جب انسپکٹر شروع ہوتا ہے، آپ کو ویب انٹرفیس نظر آئے گا (عمومی طور پر `http://localhost:5173` پر):

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ٹولز کی جانچ

### دستیاب ٹولز کی فہرست

1. **Tools** ٹیب پر کلک کریں
2. انسپکٹر خود بخود `tools/list` کال کرتا ہے
3. آپ تمام رجسٹر شدہ ٹولز دیکھیں گے جن میں:
   - ٹول کا نام
   - وضاحت
   - ان پٹ اسکیمہ (پیرامیٹرز)

### ایک ٹول چلانا

1. فہرست سے ایک ٹول منتخب کریں
2. فارم میں مطلوبہ پیرامیٹرز پُر کریں
3. **Run Tool** کلک کریں
4. جواب نتائج کے پینل میں دیکھیں

**مثال: کیلکولیٹر ٹول کی جانچ**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### ٹول کی خرابیوں کی ڈیبگنگ

جب کوئی ٹول فیل ہوتا ہے، انسپکٹر دکھاتا ہے:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

عام خرابی کوڈز:
| کوڈ | معنی |
|------|---------|
| -32700 | تجزیہ کی غلطی (غلط JSON) |
| -32600 | غلط درخواست |
| -32601 | طریقہ کار نہیں ملا |
| -32602 | غلط پیرامیٹرز |
| -32603 | داخلی خرابی |

---

## وسائل کی جانچ

### وسائل کی فہرست

1. **Resources** ٹیب پر کلک کریں
2. انسپکٹر `resources/list` کال کرتا ہے
3. آپ دیکھیں گے:
   - وسائل کے URI
   - نام اور وضاحتیں
   - MIME اقسام

### ایک وسیلہ پڑھنا

1. کوئی وسیلہ منتخب کریں
2. **Read Resource** کلک کریں
3. واپسی شدہ مواد دیکھیں

**مثال کے نتیجے:**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## پرامپٹس کی جانچ

### پرامپٹس کی فہرست

1. **Prompts** ٹیب پر کلک کریں
2. انسپکٹر `prompts/list` کال کرتا ہے
3. دستیاب پرامپٹ ٹیمپلیٹس دیکھیں

### ایک پرامپٹ حاصل کرنا

1. کوئی پرامپٹ منتخب کریں
2. کوئی ضروری دلائل پُر کریں
3. **Get Prompt** کلک کریں
4. رینڈر شدہ پرامپٹ پیغامات دیکھیں

---

## میسج لاگ تجزیہ

میسج لاگ تمام MCP پروٹوکول پیغامات دکھاتا ہے:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### کیا دیکھنا ہے

- **درخواست/جواب جوڑے**: ہر `→` کے لیے ایک مماثل `←` ہونا چاہیے
- **خرابی کے پیغام**: جوابات میں `"error"` تلاش کریں
- **وقت**: بڑے وقفے کارکردگی کے مسائل کی نشاندہی کر سکتے ہیں
- **پروٹوکول ورژن**: یقینی بنائیں کہ سرور اور کلائنٹ ورژن پر متفق ہیں

---

## VS کوڈ انضمام

آپ VS کوڈ سے براہ راست انسپکٹر چلا سکتے ہیں:

### launch.json کا استعمال

`.vscode/launch.json` میں شامل کریں:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### ٹاسکس کا استعمال

`.vscode/tasks.json` میں شامل کریں:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## عام ڈیبگنگ مناظر

### منظر 1: سرور کنیکٹ نہیں ہو رہا

**علامات:** انسپکٹر "Disconnected" دکھاتا ہے یا "Connecting..." پر رکا ہوا ہے

**چیک لسٹ:**
1. ✅ کیا سرور کمانڈ درست ہے؟
2. ✅ کیا تمام انحصارات انسٹال ہیں؟
3. ✅ کیا سرور کا راستہ موجودہ ڈائریکٹری کے حساب سے مطلق یا نسبتی ہے؟
4. ✅ کیا ضروری ماحول کے متغیر سیٹ ہیں؟

**ڈیبگ کے اقدامات:**
```bash
# پہلے سرور کو دستی طور پر آزمائیں
python -c "import your_server_module; print('OK')"

# درآمد کی غلطیوں کی جانچ کریں
python -m your_server_module 2>&1 | head -20

# تصدیق کریں کہ MCP SDK نصب ہے
pip show mcp
```

### منظر 2: ٹولز ظاہر نہیں ہو رہے

**علامات:** Tools ٹیب خالی فہرست دکھا رہا ہے

**ممکنہ وجوہات:**
1. سرور کی ابتدائی کاری کے دوران ٹولز رجسٹر نہیں ہوئے
2. سرور اسٹارٹ اپ کے بعد کریش ہو گیا
3. `tools/list` ہینڈلر خالی ارے لوٹا رہا ہے

**ڈیبگ کے اقدامات:**
1. میسج لاگ میں `tools/list` کے جواب کو چیک کریں
2. اپنے ٹول رجسٹریشن کوڈ میں لاگنگ شامل کریں
3. تصدیق کریں کہ `@mcp.tool()` ڈیکوریٹرز موجود ہیں (Python)

### منظر 3: ٹول خرابی واپس کر رہا ہے

**علامات:** ٹول کال خرابی کا جواب دیتی ہے

**ڈیبگ طریقہ:**
1. خرابی کا پیغام غور سے پڑھیں
2. پیرامیٹر کی اقسام اسکیمہ سے میل کھاتی ہیں یا نہیں چیک کریں
3. تفصیلی خرابی پیغامات کے لیے try/catch شامل کریں
4. سرور لاگز میں اسٹیگ ٹریس کی جانچ کریں

**بہتر کردہ خرابی ہینڈلنگ کی مثال:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # یہاں ٹول کا منطق
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### منظر 4: وسیلے کا مواد خالی ہے

**علامات:** وسیلہ لوٹتا ہے لیکن مواد خالی یا null ہے

**چیک لسٹ:**
1. ✅ فائل کا راستہ یا URI درست ہے
2. ✅ سرور کو وسیلہ پڑھنے کی اجازت ہے
3. ✅ وسیلے کا مواد صحیح طریقے سے واپس آ رہا ہے

---

## ایڈوانس انسپکٹر خصوصیات

### کسٹم ہیڈرز (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### تفصیلی لاگنگ

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### سیشن ریکارڈنگ

انسپکٹر میسج لاگز بعد کی تجزیہ کے لیے برآمد کر سکتا ہے:
1. میسج پینل میں **Export Log** پر کلک کریں
2. JSON فائل محفوظ کریں
3. مسئلے کے حل کے لیے ٹیم ممبرز کے ساتھ شیئر کریں

---

## بہترین طریقے

1. **جلد اور بار بار ٹیسٹ کریں** - ترقی کے دوران انسپکٹر کا استعمال کریں، صرف جب مسائل ہوں تو نہیں
2. **سادہ سے شروع کریں** - پیچیدہ ٹول کالز سے پہلے بنیادی کنیکٹیویٹی ٹیسٹ کریں
3. **اسکیمہ چیک کریں** - زیادہ تر خامیاں پیرامیٹر کی اقسام کی مطابقت نہ ہونے کی وجہ سے ہوتی ہیں
4. **خرابی پیغامات پڑھیں** - MCP کی غلطیاں عمومًا وضاحتی ہوتی ہیں
5. **انسپکٹر کھلا رکھیں** - یہ آپ کی ترقی کے دوران مسائل کو پکڑنے میں مدد دیتا ہے

---

## اگلا کیا ہے

آپ نے ماڈیول 3 مکمل کر لیا ہے: شروع کرنا! اپنی تعلیم جاری رکھیں:

- [Module 4: Practical Implementation](../../04-PracticalImplementation/README.md)

---

## اضافی وسائل

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [MCP Specification - Protocol Messages](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**اعلانِ دستبرداری**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کی مدد سے ترجمہ کی گئی ہے۔ اگرچہ ہم درستگی کے لیے کوشاں ہیں، براہِ کرم آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا بے ضابطگیاں ہو سکتی ہیں۔ اصل دستاویز اپنی مادری زبان میں ہی معتبر ماخذ سمجھی جانی چاہیے۔ اہم معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم پر نہیں ہوگی۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->