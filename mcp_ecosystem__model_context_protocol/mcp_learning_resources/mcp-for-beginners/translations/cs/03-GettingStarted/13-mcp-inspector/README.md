# Ladění s MCP Inspector

**MCP Inspector** je zásadní nástroj pro ladění, který vám umožní interaktivně testovat a řešit problémy s vašimi MCP servery bez nutnosti plné AI hostitelské aplikace. Myslete na něj jako na „Postmana pro MCP“ – poskytuje vizuální rozhraní pro odesílání požadavků, zobrazování odpovědí a pochopení chování vašeho serveru.

## Proč použít MCP Inspector?

Při vytváření MCP serverů se často setkáte s těmito výzvami:

- **„Běží můj server vůbec?“** – Inspector zobrazuje stav připojení
- **„Jsou moje nástroje správně registrované?“** – Inspector vyjmenuje všechny dostupné nástroje
- **„Jaký je formát odpovědi?“** – Inspector zobrazuje úplné JSON odpovědi
- **„Proč tento nástroj nefunguje?“** – Inspector ukazuje podrobné chybové zprávy

## Požadavky

- Nainstalovaný Node.js 18+
- npm (součástí Node.js)
- MCP server k otestování (viz [Modul 3.1 - První server](../01-first-server/README.md))

## Instalace

### Možnost 1: Spuštění přes npx (doporučeno pro rychlé testování)

```bash
npx @modelcontextprotocol/inspector
```

### Možnost 2: Globální instalace

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Možnost 3: Přidání do projektu

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Přidat do `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Připojení k vašemu serveru

### Servery stdio (lokální proces)

Pro servery komunikující přes standardní vstup/výstup:

```bash
# Python server
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js server
npx @modelcontextprotocol/inspector node ./build/index.js

# S proměnnými prostředí
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP servery (síťové)

Pro servery běžící jako HTTP služby:

1. Nejprve spusťte svůj server:
   ```bash
   python server.py  # Server běží na http://localhost:8080
   ```

2. Spusťte Inspector a připojte se:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Přehled rozhraní Inspectoru

Po spuštění Inspectoru uvidíte webové rozhraní (typicky na `http://localhost:5173`):

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

## Testování nástrojů

### Výpis dostupných nástrojů

1. Klikněte na záložku **Tools**
2. Inspector automaticky zavolá `tools/list`
3. Uvidíte všechny registrované nástroje s:
   - názvem nástroje
   - popisem
   - vstupním schématem (parametry)

### Zavolání nástroje

1. Vyberte nástroj ze seznamu
2. Vyplňte požadované parametry ve formuláři
3. Klikněte na **Run Tool**
4. Výsledek si zobrazíte v panelu výsledků

**Příklad: Testování kalkulačního nástroje**

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

### Ladění chyb nástroje

Když nástroj selže, Inspector zobrazí:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Běžné chybové kódy:
| Kód | Význam |
|------|---------|
| -32700 | Chyba parsování (neplatný JSON) |
| -32600 | Neplatný požadavek |
| -32601 | Metoda nenalezena |
| -32602 | Neplatné parametry |
| -32603 | Interní chyba |

---

## Testování zdrojů

### Výpis zdrojů

1. Klikněte na záložku **Resources**
2. Inspector zavolá `resources/list`
3. Zobrazí se:
   - URI zdrojů
   - názvy a popisy
   - MIME typy

### Čtení zdroje

1. Vyberte zdroj
2. Klikněte na **Read Resource**
3. Zobrazí se vrácený obsah

**Příklad výstupu:**

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

## Testování promptů

### Výpis promptů

1. Klikněte na záložku **Prompts**
2. Inspector zavolá `prompts/list`
3. Zobrazí dostupné šablony promptů

### Získání promptu

1. Vyberte prompt
2. Vyplňte případné požadované argumenty
3. Klikněte na **Get Prompt**
4. Uvidíte vykreslené prompt zprávy

---

## Analýza protokolu zpráv

Protokol zpráv ukazuje všechny zprávy protokolu MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Na co se zaměřit

- **Páry požadavek/odpověď**: Každý `→` by měl mít odpovídající `←`
- **Chybové zprávy**: Sledujte `"error"` v odpovědích
- **Časování**: Velké mezery mohou naznačovat problém s výkonem
- **Verze protokolu**: Ověřte, že server a klient se shodují ve verzi

---

## Integrace do VS Code

Inspector můžete spustit přímo z VS Code:

### Použití launch.json

Přidejte do `.vscode/launch.json`:

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

### Použití Tasks

Přidejte do `.vscode/tasks.json`:

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

## Běžné scénáře ladění

### Scénář 1: Server se nepřipojuje

**Příznaky:** Inspector zobrazuje „Disconnected“ nebo visí na „Connecting...“

**Kontrolní seznam:**
1. ✅ Je příkaz pro server správný?
2. ✅ Jsou všechny závislosti nainstalovány?
3. ✅ Je cesta k serveru absolutní nebo relativní k aktuálnímu adresáři?
4. ✅ Jsou nastaveny požadované proměnné prostředí?

**Kroky ladění:**
```bash
# Nejprve ručně otestujte server
python -c "import your_server_module; print('OK')"

# Zkontrolujte chyby při importu
python -m your_server_module 2>&1 | head -20

# Ověřte, že je nainstalován MCP SDK
pip show mcp
```

### Scénář 2: Nástroje se nezobrazují

**Příznaky:** Záložka Tools zobrazuje prázdný seznam

**Možné příčiny:**
1. Nástroje nejsou registrovány při inicializaci serveru
2. Server havaroval po spuštění
3. Handler `tools/list` vrací prázdné pole

**Kroky ladění:**
1. Zkontrolujte v protokolu zpráv odpověď `tools/list`
2. Přidejte logování do kódu registrace nástrojů
3. Ověřte, že jsou přítomny dekorátory `@mcp.tool()` (Python)

### Scénář 3: Nástroj vrací chybu

**Příznaky:** Volání nástroje vrací chybovou odpověď

**Postup ladění:**
1. Pečlivě si přečtěte chybovou zprávu
2. Ověřte, zda typy parametrů odpovídají schématu
3. Přidejte try/catch s podrobnými chybovými hlášeními
4. Zkontrolujte logy serveru pro stack trace

**Příklad vylepšené manipulace s chybami:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Zde je logika nástroje
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scénář 4: Obsah zdroje prázdný

**Příznaky:** Zdroj se načte, ale obsah je prázdný nebo null

**Kontrolní seznam:**
1. ✅ Je cesta k souboru nebo URI správná
2. ✅ Má server oprávnění číst zdroj
3. ✅ Obsah zdroje je správně vracen

---

## Pokročilé funkce Inspectoru

### Vlastní hlavičky (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Podrobné logování

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Nahrávání sezení

Inspector může exportovat protokol zpráv pro pozdější analýzu:
1. Klikněte na **Export Log** v panelu zpráv
2. Uložte JSON soubor
3. Sdílejte jej s členy týmu pro ladění

---

## Nejlepší postupy

1. **Testujte brzy a často** – Používejte Inspector během vývoje, nejen když něco selže
2. **Začněte jednoduše** – Ověřte základní konektivitu před složitými voláními nástrojů
3. **Zkontrolujte schéma** – Většina chyb pochází z nesouladu typů parametrů
4. **Čtěte chybové zprávy** – Chyby MCP jsou obvykle popisné
5. **Mějte Inspector otevřený** – Pomáhá odhalit problémy během vývoje

---

## Co dál

Dokončili jste Modul 3: Začínáme! Pokračujte ve vzdělávání:

- [Modul 4: Praktická implementace](../../04-PracticalImplementation/README.md)

---

## Další zdroje

- [GitHub repozitář MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Specifikace MCP - Protokolové zprávy](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Specifikace](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o vyloučení odpovědnosti**:  
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o přesnost, mějte prosím na paměti, že automatické překlady mohou obsahovat chyby nebo nepřesnosti. Původní dokument v jeho mateřském jazyce by měl být považován za závazný zdroj. Pro důležité informace doporučujeme profesionální lidský překlad. Nejsme odpovědní za jakákoliv nedorozumění nebo chybné výklady vyplývající z použití tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->