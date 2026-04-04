# Ladenie s MCP Inspectorom

**MCP Inspector** je základný nástroj na ladenie, ktorý vám umožňuje interaktívne testovať a riešiť problémy s vašimi MCP servermi bez potreby plnej hostovskej AI aplikácie. Predstavte si ho ako „Postman pre MCP“ - poskytuje vizuálne rozhranie na odosielanie požiadaviek, zobrazovanie odpovedí a pochopenie správania vášho servera.

## Prečo používať MCP Inspector?

Pri tvorbe MCP serverov často narazíte na tieto výzvy:

- **„Beží môj server vôbec?“** - Inspector zobrazuje stav pripojenia
- **„Sú moje nástroje správne zaregistrované?“** - Inspector zobrazuje všetky dostupné nástroje
- **„Aký je formát odpovede?“** - Inspector zobrazuje kompletné JSON odpovede
- **„Prečo tento nástroj nefunguje?“** - Inspector zobrazuje podrobné chybové správy

## Predpoklady

- Nainštalovaný Node.js 18+
- npm (súčasť Node.js)
- Testovací MCP server (pozri [Modul 3.1 - Prvý Server](../01-first-server/README.md))

## Inštalácia

### Možnosť 1: Spustenie pomocou npx (odporúčané pre rýchle testovanie)

```bash
npx @modelcontextprotocol/inspector
```

### Možnosť 2: Globálna inštalácia

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Možnosť 3: Pridanie do vášho projektu

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Pridajte do `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Pripojenie k vášmu serveru

### stdio servery (lokálny proces)

Pre servery komunikujúce cez štandardný vstup/výstup:

```bash
# Python server
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js server
npx @modelcontextprotocol/inspector node ./build/index.js

# S premennými prostredia
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP servery (sieť)

Pre servery bežiace ako HTTP služby:

1. Najskôr spustite svoj server:
   ```bash
   python server.py  # Server beží na http://localhost:8080
   ```

2. Spustite Inspector a pripojte sa:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Prehľad rozhrania Inspector

Po spustení Inspectora uvidíte webové rozhranie (zvyčajne na `http://localhost:5173`):

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

## Testovanie nástrojov

### Zoznam dostupných nástrojov

1. Kliknite na záložku **Tools**
2. Inspector automaticky zavolá `tools/list`
3. Uvidíte všetky zaregistrované nástroje s:
   - Názvom nástroja
   - Popisom
   - Vstupnou schémou (parametrami)

### Volanie nástroja

1. Vyberte nástroj zo zoznamu
2. Vyplňte potrebné parametre vo formulári
3. Kliknite na **Run Tool**
4. Výsledok uvidíte v paneli výsledkov

**Príklad: testovanie kalkulačného nástroja**

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

### Ladenie chýb nástrojov

Ak nástroj zlyhá, Inspector zobrazí:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Bežné chybové kódy:
| Kód | Význam |
|------|---------|
| -32700 | Chyba pri parsovaní (neplatný JSON) |
| -32600 | Neplatná požiadavka |
| -32601 | Metóda nenájdená |
| -32602 | Neplatné parametre |
| -32603 | Interná chyba |

---

## Testovanie zdrojov

### Zoznam zdrojov

1. Kliknite na záložku **Resources**
2. Inspector zavolá `resources/list`
3. Uvidíte:
   - URI zdrojov
   - Názvy a popisy
   - MIME typy

### Načítanie zdroja

1. Vyberte zdroj
2. Kliknite na **Read Resource**
3. Zobrazí sa vrátený obsah

**Príklad výstupu:**

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

## Testovanie výziev (promptov)

### Zoznam výziev

1. Kliknite na záložku **Prompts**
2. Inspector zavolá `prompts/list`
3. Zobrazia sa dostupné šablóny výziev

### Získanie výzvy

1. Vyberte výzvu
2. Vyplňte všetky potrebné argumenty
3. Kliknite na **Get Prompt**
4. Zobrazia sa vykreslené správy výzvy

---

## Analýza záznamu správ

Záznam správ zobrazuje všetky správy protokolu MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Na čo sa zamerať

- **Páry požiadaviek/odpovedí**: Každý `→` by mal mať zodpovedajúci `←`
- **Chybové správy**: Hľadajte `"error"` v odpovediach
- **Časovanie**: Veľké medzery môžu naznačovať problémy s výkonom
- **Verzia protokolu**: Uistite sa, že server a klient súhlasia s verziou

---

## Integrácia vo VS Code

Inspectora môžete spustiť priamo z VS Code:

### Použitie launch.json

Pridajte do `.vscode/launch.json`:

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

### Použitie Tasks

Pridajte do `.vscode/tasks.json`:

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

## Bežné scenáre ladenia

### Scenár 1: Server sa nepripája

**Príznaky:** Inspector zobrazuje „Disconnected“ alebo sa zasekne na „Connecting…“

**Kontrolný zoznam:**
1. ✅ Je príkaz na server správny?
2. ✅ Sú všetky závislosti nainštalované?
3. ✅ Je cesta k serveru absolútna alebo relatívna k aktuálnemu adresáru?
4. ✅ Sú nastavené potrebné premenné prostredia?

**Kroky na ladenie:**
```bash
# Najskôr manuálne otestujte server
python -c "import your_server_module; print('OK')"

# Skontrolujte chyby importu
python -m your_server_module 2>&1 | head -20

# Overte, či je nainštalovaný MCP SDK
pip show mcp
```

### Scenár 2: Nástroje sa nezobrazujú

**Príznaky:** Záložka Tools zobrazuje prázdny zoznam

**Možné príčiny:**
1. Nástroje neboli zaregistrované počas inicializácie servera
2. Server spadol po spustení
3. Handler `tools/list` vracia prázdne pole

**Kroky na ladenie:**
1. Skontrolujte záznam správ pre odpoveď `tools/list`
2. Pridajte logovanie do kódu registrácie nástrojov
3. Overte, či sú prítomné dekorátory `@mcp.tool()` (Python)

### Scenár 3: Nástroj vracia chybu

**Príznaky:** Volanie nástroja vracia chybovú odpoveď

**Postup pri ladení:**
1. Pozorne si prečítajte chybovú správu
2. Skontrolujte, či typy parametrov zodpovedajú schéme
3. Pridajte try/catch s podrobnými chybovými správami
4. Skontrolujte logy servera pre stopy volaní (stack traces)

**Príklad vylepšeného spracovania chýb:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Logika nástroja tu
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scenár 4: Obsah zdroja je prázdny

**Príznaky:** Zdroj vracia, ale obsah je prázdny alebo null

**Kontrolný zoznam:**
1. ✅ Je cesta alebo URI správna
2. ✅ Server má oprávnenie čítať zdroj
3. ✅ Obsah zdroja sa správne vracia

---

## Pokročilé funkcie Inspectora

### Vlastné hlavičky (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Podrobné logovanie

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Záznam relácií

Inspector dokáže exportovať záznam správ na neskoršiu analýzu:
1. Kliknite na **Export Log** v paneli správ
2. Uložte JSON súbor
3. Zdieľajte so členmi tímu na ladenie

---

## Odporúčané postupy

1. **Testujte skoro a často** – používajte Inspector počas vývoja, nielen pri problémoch
2. **Začnite jednoducho** – najskôr otestujte základné pripojenie pred komplexnými volaniami nástrojov
3. **Overte schému** – mnoho chýb vzniká kvôli nezhode typov parametrov
4. **Čítajte chybové správy** – MCP chyby sú často popisné
5. **Udržujte Inspector otvorený** – pomáha odhaliť problémy počas vývoja

---

## Čo ďalej

Dokončili ste Modul 3: Začíname! Pokračujte v učení:

- [Modul 4: Praktická implementácia](../../04-PracticalImplementation/README.md)

---

## Dodatočné zdroje

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [MCP špecifikácia - Protokolové správy](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 špecifikácia](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zrieknutie sa zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Aj keď sa snažíme o presnosť, berte prosím na vedomie, že automatizované preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre dôležité informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z používania tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->