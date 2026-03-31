# Kutatua matatizo na MCP Inspector

**MCP Inspector** ni chombo muhimu cha kutatua matatizo kinachokuwezesha kujaribu kwa mwingiliano na kuchunguza seva zako za MCP bila haja ya programu kamili ya mwenyeji wa AI. Fikiria kama "Postman kwa MCP" - kinatoa kiolesura cha kuona kupeleka maombi, kuona majibu, na kuelewa jinsi seva yako inavyoenda.

## Kwa Nini Utumie MCP Inspector?

Unapojenga seva za MCP, mara nyingi utakutana na changamoto hizi:

- **"Je seva yangu inafanya kazi hata?"** - Inspector inaonyesha hali ya muunganisho
- **"Je zana zangu zimeorodheshwa vizuri?"** - Inspector inaorodhesha zana zote zinazopatikana
- **"Muundo wa majibu ni gani?"** - Inspector inaonyesha majibu kamili ya JSON
- **"Kwa nini zana hii haifanyi kazi?"** - Inspector inaonyesha ujumbe wa makosa kwa undani

## Mahitaji

- Node.js 18+ imewekwa
- npm (inaambatana na Node.js)
- Seva ya MCP ya kujaribu (angalia [Module 3.1 - Server ya Kwanza](../01-first-server/README.md))

## Ufungaji

### Chaguo 1: Endesha kwa npx (Inapendekezwa kwa Jaribio la Haraka)

```bash
npx @modelcontextprotocol/inspector
```

### Chaguo 2: Sakinisha Kwa Ulimwenguni

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Chaguo 3: Ongeza Kwenye Mradi Wako

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Ongeza kwenye `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Kuungana na Seva Yako

### seva za stdio (Mchakato wa Kanda)

Kwa seva zinazozungumza kupitia pembejeo/pembezaji ya kawaida:

```bash
# Server ya Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Server ya Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# Kwa vigezo vya mazingira
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### seva SSE/HTTP (Mtandao)

Kwa seva zinazotumia huduma za HTTP:

1. Anzisha seva yako kwanza:
   ```bash
   python server.py  # Seva inayoendesha kwenye http://localhost:8080
   ```

2. Anzisha Inspector na uunganishe:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Muhtasari wa Kiolesura cha Inspector

Unapoanzisha Inspector, utaona kiolesura cha wavuti (kawaida kwenye `http://localhost:5173`):

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

## Kupima Zana

### Orodhesha Zana Zinazopatikana

1. Bonyeza kichupo cha **Tools**
2. Inspector huorodhesha `tools/list` kwa kiotomatiki
3. Utaona zana zote zilizoandikishwa kwa:
   - Jina la zana
   - Maelezo
   - Muundo wa pembejeo (vigezo)

### Kwenda kwa Zana

1. Chagua zana kutoka kwenye orodha
2. Jaza vigezo vinavyohitajika kwenye fomu
3. Bonyeza **Run Tool**
4. Tazama jibu kwenye paneli ya matokeo

**Mfano: Kupima zana ya kalkuleta**

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

### Kutatua Makosa ya Zana

Wakati zana inashindwa, Inspector inaonyesha:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Nambari za kawaida za makosa:
| Nambari | Maana |
|------|---------|
| -32700 | Hitilafu ya kusoma (JSON isiyo sahihi) |
| -32600 | Ombi halali |
| -32601 | Mbinu haijapatikana |
| -32602 | Vigezo batili |
| -32603 | Hitilafu ya ndani |

---

## Kupima Rasilimali

### Orodhesha Rasilimali

1. Bonyeza kichupo cha **Resources**
2. Inspector huita `resources/list`
3. Utaona:
   - URI za rasilimali
   - Majina na maelezo
   - Aina za MIME

### Kusoma Rasilimali

1. Chagua rasilimali
2. Bonyeza **Read Resource**
3. Tazama yaliyorejeshwa

**Matokeo ya mfano:**

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

## Kupima Msaada

### Orodhesha Misaada

1. Bonyeza kichupo cha **Prompts**
2. Inspector huita `prompts/list`
3. Tazama templeti za msaada zinazopatikana

### Kupata Msaada

1. Chagua msaada
2. Jaza hoja zinazohitajika
3. Bonyeza **Get Prompt**
4. Tazama ujumbe wa msaada uliotengenezwa

---

## Uchambuzi wa Rekodi ya Ujumbe

Rekodi ya ujumbe inaonyesha ujumbe wote wa itifaki ya MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Unachopaswa Kuangalia

- **Mikapo ya Ombi/Jibu**: Kila `→` inapaswa kuwa na `←` inayolingana
- **Ujumbe wa Makosa**: Angalia `"error"` katika majibu
- **Muda**: Mapengo makubwa yanaweza kuashiria matatizo ya utendaji
- **Toleo la itifaki**: Hakikisha seva na mteja wanakubaliana juu ya toleo

---

## Muunganisho wa VS Code

Unaweza kuendesha Inspector moja kwa moja kutoka VS Code:

### Kutumia launch.json

Ongeza kwenye `.vscode/launch.json`:

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

### Kutumia Tasks

Ongeza kwenye `.vscode/tasks.json`:

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

## Hali za Kawaida za Kuchunguza

### Hali 1: Seva Haikuunganishi

**Dalili:** Inspector inaonyesha "Disconnected" au inasimama kwenye "Connecting..."

**Orodha ya kuchunguza:**
1. ✅ Je amri ya seva ni sahihi?
2. ✅ Je utegemezi wote umewekwa?
3. ✅ Je njia ya seva ni ya kudumu au inahusiana na saraka ya sasa?
4. ✅ Je vigezo vya mazingira vilivyohitajika vimewekwa?

**Hatua za kuchunguza:**
```bash
# Jaribu seva kwa mkono kwanza
python -c "import your_server_module; print('OK')"

# Angalia makosa ya uingizaji
python -m your_server_module 2>&1 | head -20

# Thibitisha MCP SDK imewekwa
pip show mcp
```

### Hali 2: Zana Hazionekani

**Dalili:** Kichupo cha Zana kinaonyesha orodha tupu

**Sababu zinazowezekana:**
1. Zana hazijaandikishwa wakati wa kuanzisha seva
2. Seva ilifanikiwa baada ya kuanzisha
3. Msimamizi wa `tools/list` anarejesha orodha tupu

**Hatua za kuchunguza:**
1. Angalia rekodi ya ujumbe kwa jibu la `tools/list`
2. Ongeza kuandika kwenye kumbukumbu kwenye msimbo wako wa usajili wa zana
3. Hakikisha mapambo ya `@mcp.tool()` yapo (Python)

### Hali 3: Zana Inarudisha Hitsilafu

**Dalili:** Mwito wa zana unarejesha jibu la hitilafu

**Njia ya kuchunguza:**
1. Soma kwa makini ujumbe wa makosa
2. Angalia aina za vigezo zinakubaliana na muundo
3. Ongeza jaribu/kamata pamoja na ujumbe wa makosa kwa undani
4. Angalia kumbukumbu za seva kwa mistari ya makosa

**Mfano wa kuboresha usimamizi wa makosa:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Hapa ni mantiki ya chombo
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Hali 4: Maudhui ya Rasilimali Yamo Tupu

**Dalili:** Rasilimali inarudisha lakini maudhui ni tupu au ni null

**Orodha ya kuchunguza:**
1. ✅ Njia ya faili au URI ni sahihi
2. ✅ Seva ina ruhusa ya kusoma rasilimali
3. ✅ Maudhui ya rasilimali yanarudishwa ipasavyo

---

## Sifa Zaidi za Inspector

### Vichwa vya Habari Maalum (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Kumbukumbu za Undani Zaidi

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Kurekodi Vikao

Inspector inaweza kuuza kumbukumbu za ujumbe kwa uchambuzi wa baadaye:
1. Bonyeza **Export Log** kwenye paneli ya ujumbe
2. Hifadhi faili la JSON
3. Shiriki na wanahabari wa timu kwa ajili ya utatuzi

---

## Misingi Bora

1. **Jaribu mapema na mara kwa mara** - Tumia Inspector wakati wa maendeleo, sio tu wakati vitu vina-vunja
2. **Anzisha kwa urahisi** - Jaribu muunganisho wa msingi kabla ya kuita zana ngumu
3. **Kagua muundo** - Makosa mengi hutokana na aina za vigezo zisizoendana
4. **Soma ujumbe wa hitilafu** - Makosa ya MCP mara nyingi yana maelezo
5. **Weka Inspector wazi** - Husaidia kugundua matatizo wakati wa maendeleo

---

## Nini Kifuatacho

Umekamilisha Moduli 3: Kuanzia! Endelea kujifunza:

- [Moduli 4: Utekelezaji wa Vitendo](../../04-PracticalImplementation/README.md)

---

## Rasilimali Zaidi

- [Hifadhi ya MCP Inspector GitHub](https://github.com/modelcontextprotocol/inspector)
- [Maelezo ya MCP - Ujumbe wa Itifaki](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Maelezo ya JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kumbusho**:
Nyaraka hii imetafsiriwa kwa kutumia huduma ya utafsiri wa AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kwa usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au ukosefu wa usahihi. Nyaraka ya asili katika lugha yake ya asili inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inashauriwa. Hatuna dhamana kwa kutoelewana au tafsiri potofu zinazotokana na utumiaji wa tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->