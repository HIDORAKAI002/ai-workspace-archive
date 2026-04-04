# လူကြိုက်များသော MCP ဟုတ်စ်ကလိုင်န့်များ စနစ်တကျ သတ်မှတ်ခြင်း

ဤ လမ်းညွှန်သည် လူကြိုက်များသော AI ဟုတ်စ် အက်ပ်ပလီကေးရှင်းများနှင့် MCP ဆာဗာများကို မည်သို့ ဖွဲ့စည်းအသုံးပြုရမည်ကို ဖော်ပြထားသည်။ တစ်ခုချင်းစီဟုတ်စ်တွင် ကိုယ်ပိုင် ဖွဲ့စည်းအသုံးပြုမှု လုပ်ထုံးလုပ်နည်းရှိသော်လည်း တစ်ချက်တည်း ပြင်ဆင်ပြီးနောက် MCP ဆာဗာများနှင့် စံပြ ပရိုတိုကောအား အသုံးပြုကာ ဆက်သွယ်ဆောင်ရွက်သည်။

## MCP ဟုတ်စ် ဆိုတာဘာလဲ?

**MCP ဟုတ်စ်** ဆိုသည်မှာ ၎င်း၏ စွမ်းရည်များကို တိုးချဲ့ရန် MCP ဆာဗာများနှင့် ချိတ်ဆက်နိုင်သော AI အက်ပ်ပလီကေးရှင်းတစ်ခု ဖြစ်သည်။ ၎င်းကို အသုံးပြုသူများ စတင်ထိတွေ့ဆက်ဆံသော "ရှေ့ဦးပိုင်း" အဖြစ် အမြင် ရစေရန် ဖြတ်မြောက်နိုင်ပြီး MCP ဆာဗာများက "နောက်ခံ" ကိရိယာများနှင့် ဒေတာများကို ဖြည့်ဆည်းပေးသည်။

```mermaid
flowchart LR
    User[👤 အသုံးပြုသူ] --> Host[🖥️ MCP အိမ်ရှင်]
    Host --> S1[MCP ဆာဗာ A]
    Host --> S2[MCP ဆာဗာ B]
    Host --> S3[MCP ဆာဗာ C]
    
    subgraph "လူကြိုက်များသော အိမ်ရှင်များ"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## လိုအပ်ချက်များ

- ချိတ်ဆက်ရန် MCP ဆာဗာတစ်ခု (ကြည့်ရန် [Module 3.1 - First Server](../01-first-server/README.md))
- သင်၏စနစ်တွင် ဟုတ်စ်အက်ပ်လီကေးရှင်း ထည့်သွင်းထားခြင်း
- JSON ဖိုင် ဖွဲ့စည်းမှုကို အခြေခံနားလည်မှု

---

## ၁။ Claude Desktop

**Claude Desktop** သည် Anthropic ၏ တရားဝင်နေရာ Desktop အက်ပ်ပလီကေးရှင်းဖြစ်ပြီး MCP ကို ဇာတိပိုင်ထောက်ပံ့သည်။

### ထည့်သွင်းခြင်း

၁။ [claude.ai/download](https://claude.ai/download) မှ Claude Desktop ကို ဒေါင်းလုပ်လုပ်ရယူပါ  
၂။ ထည့်သွင်းပြီး Anthropic အကောင့်ဖြင့် ဝင်ပါ

### ဖွဲ့စည်းမှု

Claude Desktop သည် MCP ဆာဗာများကို သတ်မှတ်ရန် JSON ဖိုင်ကို အသုံးပြုသည်။

**ဖိုင်တည်နေရာ:**  
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
- **Linux**: `~/.config/Claude/claude_desktop_config.json`  

**ဖွဲ့စည်းမှု ဥပမာ:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### ဖွဲ့စည်းမှု ရွေးချယ်စရာများ

| အကွက် | ဖော်ပြချက် | ဥပမာ |
|-------|------------|----------|
| `command` | ပြေးဆောင်မည့် အကောင့်၊ command | `"python"`, `"node"`, `"npx"` |
| `args` | command လိုင်း အကြောင်းအရာများ | `["-m", "my_server"]` |
| `env` | ပတ်ဝန်းကျင် ပြောင်းလဲမှုများ | `{"API_KEY": "xxx"}` |
| `cwd` | လုပ်ငန်းထားဖိုလ်ဒါ | `"/path/to/server"` |

### သင်၏ ဖွဲ့စည်းမှု စမ်းသပ်ခြင်း

၁။ ဖိုင်ကို သိမ်းဆည်းပါ  
၂။ Claude Desktop ကို လုံးဝပိတ်ပြီး ပြန်ဖွင့်ပါ  
၃။ စကားပြောအသစ် တစ်ခုဖွင့်ပါ  
၄။ ဆာဗာချိတ်ဆက်ထားသည်ကို ဖော်ပြသော 🔌 အိုင်ကုန်ကို ရှာဖွေပါ  
၅။ Claude ကို သင်၏ကိရိယာတစ်ခုကို အသုံးပြုရန် မေးခွန်း မေးပါ

### Claude Desktop ပြဿနာခြင်း ဖြေရှင်းနည်း

**ဆာဗာ ပြပေါ်မလာခြင်း**  
- ဖိုင် ဖွဲ့စည်းမှု စနစ် ကို JSON စစ်စစ်က တိုင်းတာကြည့်ပါ  
- command လမ်းကြောင်း မှန်ကန်မှု စစ်ဆေးပါ  
- Claude Desktop မှတ်တမ်းများကို ကြည့်ပါ: အကူအညီ → မှတ်တမ်းပြပါ

**ဆာဗာ စတင်ချိန် ချို့ယွင်းခြင်း**  
- သင်၏ဆာဗာကို တိုက်ရိုက် terminal မှာ စမ်းသပ်ကြည့်ပါ  
- ပတ်ဝန်းကျင် ပြောင်းလဲမှုများမှန်၍ ရှိကြောင်း သေချာပါစေ  
- လိုအပ်သော သိမ်းဆည်းမှုများ စစ်ဆေးပါ

---

## ၂။ VS Code နှင့် GitHub Copilot

VS Code သည် GitHub Copilot Chat တိုးချဲ့မှုမှတဆင့် MCP ထောက်ပံ့သည်။

### လိုအပ်ချက်များ

၁။ VS Code 1.99 နှင့်အထက် ထည့်သွင်းထားရှိခြင်း  
၂။ GitHub Copilot တိုးချဲ့မှု ထည့်သွင်းထားရှိခြင်း  
၃။ GitHub Copilot Chat တိုးချဲ့မှု ထည့်သွင်းထားရှိခြင်း

### ဖွဲ့စည်းမှု

VS Code သည် သင်၏ မိမိလုပ်ငန်းရှေ့အတွင်း သို့မဟုတ် အသုံးပြုသူ ဆက်တင်များတွင် `.vscode/mcp.json` ကို အသုံးပြုသည်။

**လုပ်ငန်းရှေ့ ဖွဲ့စည်းမှု** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**အသုံးပြုသူ ဆက်တင်များ** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### VS Code တွင် MCP အသုံးပြုခြင်း

၁။ Copilot Chat ပနယ်ကို ဖွင့်ပါ (Ctrl+Shift+I / Cmd+Shift+I)  
၂။ `@` အက္ခရာမှ စတင်ပြီး MCP ကိရိယာများကို ကြည့်ပါ  
၃။ သဘာဝဘာသာစကား သုံး၍ ကိရိယာများကို ခေါ်ယူရန်: "မှတ်တမ်းကိန်းဂဏန်းထား၍ 25 * 48 ကိုတွက်ပါ"

### VS Code ပြဿနာဖြေရှင်းခြင်း

**MCP ဆာဗာများ မဖွင့်ပေါ်ခြင်း**  
- Output ပနယ် → "MCP" မှာ အမှားမှတ်တမ်းများ စစ်ဆေးပါ  
- ပြန်ဖွင့်ခြင်း: Ctrl+Shift+P → "Developer: Reload Window"  
- ဆာဗာကို မည်သူမဆို သီးသန့် run စစ်ဆေးပါ

---

## ၃။ Cursor

**Cursor** သည် MCP ထောက်ပံ့မှု ပါသော AI ရှေ့ပြေး ကုဒ်အယ်ဒီတာဖြစ်သည်။

### ထည့်သွင်းခြင်း

၁။ [cursor.sh](https://cursor.sh) မှ Cursor ကို ဒေါင်းလုပ်လုပ်ပါ  
၂။ ထည့်သွင်းပြီး ဝင်ရောက် ခွင့်ပြုပါ

### ဖွဲ့စည်းမှု

Cursor သည် Claude Desktop နှင့် ဆင်တူသော ဖွဲ့စည်းမှု ပုံစံကို အသုံးပြုသည်။

**ဖိုင်တည်နေရာ:**  
- **macOS**: `~/.cursor/mcp.json`  
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`  
- **Linux**: `~/.cursor/mcp.json`  

**ဖွဲ့စည်းမှု ဥပမာ:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Cursor တွင် MCP အသုံးပြုခြင်း

၁။ Cursor ၏ AI စကားပြော (Ctrl+L / Cmd+L) ကို ဖွင့်ပါ  
၂။ MCP ကိရိယာများကို အလိုအလျောက် အကြံပြုချက်များတွင် မြင်ရစေသည်  
၃။ ချိတ်ဆက်ထားသော ဆာဗာများကို သုံး၍ AI ကို တာဝန်များ စေလိုက်ပါ

---

## ၄။ Cline (Terminal-Based)

**Cline** သည် command-line workflow များအတွက် အထူးသင့်လျော်သည့် termial အခြေပြု MCP client ဖြစ်သည်။

### ထည့်သွင်းခြင်း

```bash
npm install -g @anthropic/cline
```

### ဖွဲ့စည်းမှု

Cline သည် ပတ်ဝန်းကျင် မူဝါဒများနှင့် command-line အကြောင်းအရာများကို အသုံးပြုသည်။

**ပတ်ဝန်းကျင် မူဝါဒ အသုံးပြုခြင်း:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**command-line အကြောင်းအရာ အသုံးပြုခြင်း:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**ဖွဲ့စည်းမှု ဖိုင်** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Cline အသုံးပြုခြင်း

```bash
# ပူးပေါင်းဆွေးနွေးမှုအစပြုပါ
cline

# MCP နှင့် တစ်ခုတည်းသော မေးခွန်း
cline "Calculate the square root of 144 using the calculator"

# အသုံးပြုနိုင်သော ကိရိယာများကို စာရင်းပြုစုပါ
cline --list-tools
```

---

## ၅။ Windsurf

**Windsurf** သည် MCP ထောက်ပံ့မှု ပါသော AI အခြေပြု ကုဒ်အယ်ဒီတာ တစ်ခုဖြစ်သည်။

### ထည့်သွင်းခြင်း

၁။ [codeium.com/windsurf](https://codeium.com/windsurf) မှ Windsurf ကို ဒေါင်းလုပ်လုပ်ပါ  
၂။ ထည့်သွင်းပြီး အကောင့်တစ်ခု ဖန်တီးပါ

### ဖွဲ့စည်းမှု

Windsurf ဖွဲ့စည်းမှုကို ဆက်တင် UI မှတစ်ဆင့် စီမံခန့်ခွဲသည်။

၁။ ဆက်တင်များ ဖွင့်ပါ (Ctrl+, / Cmd+,)  
၂။ "MCP" ကို ရှာဖွေပါ  
၃။ "settings.json တွင် အပ်ဒိတ်လုပ်ပါ" ကို နှိပ်ပါ

**ဖွဲ့စည်းမှု ဥပမာ:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## သယ်ယူပို့ဆောင်မှု အမျိုးအစား နှိုင်းယှဉ်ခြင်း

ဟုတ်စ်များသည် သယ်ယူပို့ဆောင်မှုနည်းလမ်းများ မတူကွဲပြားစွာ ထောက်ပံ့သည်-

| ဟုတ်စ် | stdio | SSE/HTTP | WebSocket |
|--------|--------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (စံပြ ထဲထွက်/ထဲဝင်): ဟုတ်စ်မှ စတင်ထိန်းချုပ်သော ဒေသဆာဗာများအတွက် အကောင်းဆုံး  
**SSE/HTTP**: ရှေ့ဘက်ဆာဗာများ သို့မဟုတ် များစွာသော ဆက်သွယ်သူများ သုံးနေသော ဆာဗာများအတွက် အကောင်းဆုံး

---

## အများဆုံး ကြုံတွေ့ရသော ပြဿနာများ နှင့် ဖြေရှင်းနည်းများ

### ဆာဗာ စတင်မရခြင်း

၁။ **ဆာဗာကို မန်ယူးအဖြစ် စမ်းသပ်ပါ:**  
   ```bash
   # Python အတွက်
   python -m your_server_module
   
   # Node.js အတွက်
   node /path/to/server/index.js
   ```
  
၂။ **command လမ်းကြောင်း စစ်ဆေးပါ:**  
   - မဖြစ်မနေ လမ်းကြောင်း စဉ်ဆက်အသုံးပြုပါ  
   - executable သည် PATH တွင် ရှိရန် သေချာစေပါ  

၃။ **လိုအပ်ချက်များ စစ်ဆေးပါ:**  
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```
  
### ဆာဗာ ချိတ်ဆက်ပြီး ကိရိယာ မအလုပ်လုပ်ခြင်း

၁။ **ဆာဗာ မှတ်တမ်းများ စစ်ဆေးရန်** - အများစုဟုတ်စ်တွင် မှတ်တမ်း ရေးရန် နည်းလမ်းများ ပါရှိသည်  
၂။ **ကိရိယာ မှတ်ပုံတင်ခြင်း စစ်ဆေးရန်** - MCP Inspector အသုံးပြုပြီး စမ်းသပ်ပါ  
၃။ **ခွင့်ပြုချက်များ စစ်ဆေးရန်** - အချို့ကိရိယာများတွင် ဖိုင်/ကွန်ရက် ဝင်ရောက်ခွင့် လိုအပ်သည်

### ပတ်ဝန်းကျင် မူဝါဒ မပေးပို့ခြင်း

- ဟုတ်စ်တချို့သည် ပတ်ဝန်းကျင် မူဝါဒများကို သန့်ရှင်းစေသည်  
- `env` ဖွဲ့စည်းမှု အကွက်ကို သေချာ သတ်မှတ်ပါ  
- ဖိုင်တွင် အချက်အလက်တွေကို မထည့်သင့် (လျှို့ဝှက် စီမံခန့်ခွဲမှု ကို အသုံးပြုပါ)

---

## လုံခြုံရေးအကောင်းဆုံးလေ့လာမှုများ

၁။ API Key များကို ဖိုင်ထဲတွင် မတင်သွင်းပါနှင့်  
၂။ အရေးကြီး ဒေတာများအတွက် ပတ်ဝန်းကျင် မူဝါဒများ သုံးပါ  
၃။ ဆာဗာ ခွင့်ပြုချက်များ ကို လိုအပ်သလောက် သာ ကန့်သတ်ပါ  
၄။ သင်၏ စနစ်တွင် ဝင်ရောက်ခွင့် ပေးရန်မတိုင်မှီ ဆာဗာ ကုဒ်ကို သေချာ ပြန်လည် သုံးသပ်ပါ  
၅။ ဖိုင်စနစ် နှင့် ကွန်ရက် ဝင်ရောက်ခွင့် အတွက် allowlists အသုံးပြုပါ

---

## ပိုမို ယခုခေတ်ဆက်လက်လုပ်ဆောင်ရန်

- [3.13 - MCP Inspector ဖြင့် ပြဿနာရှာဖွေခြင်း](../13-mcp-inspector/README.md)  
- [3.1 - ပထမဆုံး MCP ဆာဗာ ဖန်တီးခြင်း](../01-first-server/README.md)  
- [Module 5 - အဆင့်မြင့် ကဏ္ဍများ](../../05-AdvancedTopics/README.md)

---

## အပိုသော အရင်းအမြစ်များ

- [Claude Desktop MCP စာတမ်းများ](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [VS Code MCP တိုးချဲ့မှု](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [MCP အတိအကျ ဖော်ပြချက် - သယ်ယူပို့ဆောင်မှု](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [တရားဝင် MCP ဆာဗာများ စာရင်း](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**အချက်ပြချက်**  
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားခြင်းဖြစ်ပါသည်။ ကျွန်ုပ်တို့သည် မှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း အလိုအလျောက် ဘာသာပြန်ချက်များတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။ မူရင်းစာတမ်းကို မိခင်ဘာသာဖြင့်သာ အတည်ပြုရမည့်အရင်းအမြစ်ဟု သတ်မှတ်ရန်လိုအပ်ပါသည်။ အရေးကြီးသော သတင်းအချက်အလက်များအတွက် နိုင်ငံတကာ အသိအမှတ်ပြု လူ့ဘာသာပြန် ဝန်ဆောင်မှုကို သုံးစွဲရန် အကြံပြုပါသည်။ ဤဘာသာပြန်ချက် အသုံးပြုမှုကြောင့် ဖြစ်ပေါ်နိုင်သည့် နားလည်မှုလွဲမှားမှုများအတွက် ကျွန်ုပ်တို့မှ တာဝန်မယူပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->