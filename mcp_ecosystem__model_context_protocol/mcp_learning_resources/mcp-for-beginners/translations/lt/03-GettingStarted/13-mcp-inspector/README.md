# Derinimas su MCP Inspector

**MCP Inspector** yra svarbi derinimo priemonė, leidžianti interaktyviai testuoti ir spręsti problemas jūsų MCP serveriuose, nereikalaujant pilnos AI pagrindinės programos. Galvokite apie tai kaip apie „Postman“ MCP – ji suteikia vizualią sąsają užklausoms siųsti, atsakymams peržiūrėti ir serverio elgesio supratimui.

## Kodėl naudoti MCP Inspector?

Kuriant MCP serverius dažnai susidursite su šiomis problemomis:

- **„Ar mano serveris iš vis veikia?“** - Inspector rodo ryšio būseną
- **„Ar mano įrankiai tinkamai užregistruoti?“** - Inspector rodo visus galimus įrankius
- **„Koks atsakymo formatas?“** - Inspector rodo pilnus JSON atsakymus
- **„Kodėl šis įrankis neveikia?“** - Inspector pateikia išsamius klaidų pranešimus

## Prieš sąlygos

- Įdiegta Node.js 18+
- npm (pridedamas su Node.js)
- MCP serveris testavimui (žr. [3.1 Modulis - Pirmas Serveris](../01-first-server/README.md))

## Įdiegimas

### 1 variantas: paleisti su npx (Rekomenduojama greitam testavimui)

```bash
npx @modelcontextprotocol/inspector
```

### 2 variantas: įdiegti globaliai

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### 3 variantas: pridėti prie jūsų projekto

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Pridėkite į `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Ryšys su jūsų serveriu

### stdio Serveriai (vietinis procesas)

Serveriams, kurie komunikuoja per standartinę įvestį/išvestį:

```bash
# Python serveris
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js serveris
npx @modelcontextprotocol/inspector node ./build/index.js

# Su aplinkos kintamaisiais
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP serveriai (tinklas)

Serveriams, veikiančioms kaip HTTP paslaugoms:

1. Pirmiausia paleiskite savo serverį:
   ```bash
   python server.py  # Serveris veikia adresu http://localhost:8080
   ```

2. Paleiskite Inspector ir prisijunkite:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Inspector sąsajos apžvalga

Paleidus Inspector, matysite žiniatinklio sąsają (įprastai adresu `http://localhost:5173`):

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

## Įrankių testavimas

### Galimų įrankių sąrašas

1. Spauskite skirtuką **Tools**
2. Inspector automatiškai iškviečia `tools/list`
3. Matysite visus užregistruotus įrankius su:
   - Įrankio pavadinimu
   - Aprašymu
   - Įvesties schema (parametrais)

### Įrankio kvietimas

1. Pasirinkite įrankį sąraše
2. Užpildykite reikalingus parametrus formoje
3. Spauskite **Run Tool**
4. Peržiūrėkite atsakymą rezultatų skydelyje

**Pavyzdys: Skaičiuoklio įrankio testavimas**

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

### Įrankio klaidų derinimas

Kai įrankis nepavyksta, Inspector rodo:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Dažniausios klaidų kodai:
| Kodas | Reikšmė |
|------|---------|
| -32700 | Analizės klaida (neteisingas JSON) |
| -32600 | Neteisingas užklausimas |
| -32601 | Metodas nerastas |
| -32602 | Netinkami parametrai |
| -32603 | Vidinė klaida |

---

## Išteklių testavimas

### Išteklių sąrašo rodymas

1. Spauskite skirtuką **Resources**
2. Inspector iškviečia `resources/list`
3. Matysite:
   - Išteklių URI
   - Pavadinimus ir aprašymus
   - MIME tipus

### Išteklių skaitymas

1. Pasirinkite išteklių
2. Spauskite **Read Resource**
3. Peržiūrėkite grąžintą turinį

**Pavyzdinis išėjimas:**

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

## Promptų testavimas

### Promptų sąrašo rodymas

1. Spauskite skirtuką **Prompts**
2. Inspector iškviečia `prompts/list`
3. Peržiūrėkite galimus promptų šablonus

### Promptų gavimas

1. Pasirinkite promptą
2. Užpildykite reikiamus argumentus
3. Spauskite **Get Prompt**
4. Peržiūrėkite sugeneruotus promptų pranešimus

---

## Pranešimų žurnalo analizė

Pranešimų žurnalas rodo visus MCP protokolo pranešimus:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Ką stebėti

- **Užklausos/atsakymo poros**: Kiekvienam `→` turi būti atitinkamas `←`
- **Klaidų pranešimai**: Stebėkite `"error"` atsakymuose
- **Laiko tarpai**: Didelės pertraukos gali reikšti našumo problemas
- **Protokolo versija**: Užtikrinkite, kad serveris ir klientas sutartų dėl versijos

---

## VS Code integracija

Galite paleisti Inspector tiesiogiai iš VS Code:

### Naudojant launch.json

Pridėkite prie `.vscode/launch.json`:

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

### Naudojant Tasks

Pridėkite prie `.vscode/tasks.json`:

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

## Dažniausios derinimo situacijos

### Situacija 1: Serveris nesijungia

**Simptomai:** Inspector rodo „Disconnected“ arba užstringa prie „Connecting...“

**Kontrolinis sąrašas:**
1. ✅ Ar komanda serveriui teisinga?
2. ✅ Ar visos priklausomybės įdiegtos?
3. ✅ Ar serverio kelias absoliutus ar susijęs su dabartiniu katalogu?
4. ✅ Ar nustatyti reikiami aplinkos kintamieji?

**Derinimo veiksmai:**
```bash
# Pirmiausia rankiniu būdu išbandykite serverį
python -c "import your_server_module; print('OK')"

# Patikrinkite importavimo klaidas
python -m your_server_module 2>&1 | head -20

# Patikrinkite, ar įdiegtas MCP SDK
pip show mcp
```

### Situacija 2: Įrankiai nerodomi

**Simptomai:** Įrankių skirtuke rodomas tuščias sąrašas

**Galimos priežastys:**
1. Įrankiai nebuvo registruoti serverio inicializacijos metu
2. Serveris sudužo po paleidimo
3. `tools/list` apdorojimo funkcija grąžina tuščią masyvą

**Derinimo veiksmai:**
1. Patikrinkite pranešimų žurnalą dėl `tools/list` atsakymo
2. Pridėkite žurnalavimą į savo įrankių registracijos kodą
3. Patikrinkite, ar yra `@mcp.tool()` dekoratoriai (Python)

### Situacija 3: Įrankis grąžina klaidą

**Simptomai:** Įrankio kvietimas grąžina klaidos atsakymą

**Derinimo būdas:**
1. Atidžiai perskaitykite klaidos pranešimą
2. Patikrinkite, ar parametrų tipai atitinka schemą
3. Pridėkite try/catch bloką su išsamesniais klaidos pranešimais
4. Patikrinkite serverio žurnalus dėl stack trace

**Pavyzdys: patobulintas klaidų valdymas:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Įrankio logika čia
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Situacija 4: Išteklių turinys tuščias

**Simptomai:** Išteklius grąžinamas, bet turinys yra tuščias arba null

**Kontrolinis sąrašas:**
1. ✅ Failo kelias arba URI yra teisingas
2. ✅ Serveris turi leidimą skaityti išteklius
3. ✅ Išteklių turinys grąžinamas teisingai

---

## Pažangios Inspector funkcijos

### Tinkinti antraštės (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Detalus žurnalavimas

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Sesijų įrašymas

Inspector gali eksportuoti pranešimų žurnalus vėlesnei analizei:
1. Spauskite **Export Log** pranešimų skydelyje
2. Išsaugokite JSON failą
3. Dalinkitės su komandos nariais derinimui

---

## Geriausios praktikos

1. **Testuokite anksti ir dažnai** – Naudokite Inspector kūrimo metu, ne tik kai kažkas sugenda
2. **Pradėkite nuo paprastumo** – Išbandykite pagrindinį ryšį prieš sudėtingus įrankių kvietimus
3. **Patikrinkite schemą** – Daug klaidų kyla dėl parametro tipo neatitikimų
4. **Skaitykite klaidų pranešimus** – MCP klaidos paprastai yra aprašomos
5. **Palikite Inspector atidarytą** – Tai padeda greitai pastebėti problemas kūrimo metu

---

## Kas toliau

Jūs baigėte 3 modulį: Pradžia! Toliau tęskite mokymąsi:

- [4 modulis: Praktinė įgyvendinimas](../../04-PracticalImplementation/README.md)

---

## Papildomi šaltiniai

- [MCP Inspector GitHub saugykla](https://github.com/modelcontextprotocol/inspector)
- [MCP specifikacija – protokolo pranešimai](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 specifikacija](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors stengiamės užtikrinti tikslumą, atkreipkite dėmesį, kad automatizuoti vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Kritiniais atvejais rekomenduojama naudotis profesionalių vertėjų paslaugomis. Mes neatsakome už bet kokius nesusipratimus ar neteisingus aiškinimus, kylančius dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->