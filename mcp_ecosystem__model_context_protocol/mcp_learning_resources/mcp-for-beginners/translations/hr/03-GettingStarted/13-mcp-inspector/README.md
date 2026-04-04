# Debugiranje s MCP Inspectorom

**MCP Inspector** je bitan alat za debugiranje koji vam omogućuje interaktivno testiranje i rješavanje problema vaših MCP poslužitelja bez potrebe za punom AI host aplikacijom. Zamislite ga kao "Postman za MCP" – pruža vizualno sučelje za slanje zahtjeva, pregled odgovora i razumijevanje kako se vaš poslužitelj ponaša.

## Zašto koristiti MCP Inspector?

Kada gradite MCP poslužitelje, često ćete naići na ove izazove:

- **"Radi li moj poslužitelj uopće?"** – Inspector prikazuje status veze
- **"Jesu li moji alati ispravno registrirani?"** – Inspector prikazuje sve dostupne alate
- **"Kakav je format odgovora?"** – Inspector prikazuje potpune JSON odgovore
- **"Zašto ovaj alat ne radi?"** – Inspector prikazuje detaljne poruke o pogrešci

## Preduvjeti

- Instaliran Node.js 18+
- npm (dolazi uz Node.js)
- MCP poslužitelj za testiranje (pogledajte [Modul 3.1 - Prvi poslužitelj](../01-first-server/README.md))

## Instalacija

### Opcija 1: Pokretanje s npx (Preporučeno za brzo testiranje)

```bash
npx @modelcontextprotocol/inspector
```

### Opcija 2: Globalna instalacija

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Opcija 3: Dodavanje u vaš projekt

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Dodajte u `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Povezivanje s vašim poslužiteljem

### stdio poslužitelji (lokalni proces)

Za poslužitelje koji komuniciraju putem standardnog ulaza/izlaza:

```bash
# Python poslužitelj
npx @modelcontextprotocol/inspector python -m your_server_module

# Node.js poslužitelj
npx @modelcontextprotocol/inspector node ./build/index.js

# S varijablama okoline
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP poslužitelji (mreža)

Za poslužitelje koji rade kao HTTP servisi:

1. Prvo pokrenite poslužitelj:
   ```bash
   python server.py  # Poslužitelj radi na http://localhost:8080
   ```

2. Pokrenite Inspector i povežite se:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Pregled sučelja Inspectora

Kada se Inspector pokrene, vidjet ćete web sučelje (obično na `http://localhost:5173`):

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

## Testiranje alata

### Popis dostupnih alata

1. Kliknite na karticu **Tools**
2. Inspector automatski poziva `tools/list`
3. Vidjet ćete sve registrirane alate s:
   - Ime alata
   - Opis
   - Ulazna shema (parametri)

### Pozivanje alata

1. Odaberite alat s popisa
2. Ispunite potrebne parametre u obrascu
3. Kliknite **Run Tool**
4. Pogledajte odgovor u panelu s rezultatima

**Primjer: Testiranje kalkulator alata**

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

### Debugiranje pogrešaka alata

Kad alat ne uspije, Inspector prikazuje:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Uobičajeni kodovi pogreške:
| Kod | Značenje |
|------|---------|
| -32700 | Greška parsiranja (neispravan JSON) |
| -32600 | Neispravan zahtjev |
| -32601 | Metoda nije pronađena |
| -32602 | Neispravni parametri |
| -32603 | Interna pogreška |

---

## Testiranje resursa

### Popis resursa

1. Kliknite na karticu **Resources**
2. Inspector poziva `resources/list`
3. Vidjet ćete:
   - URI resursa
   - Imena i opise
   - MIME tipove

### Čitanje resursa

1. Odaberite resurs
2. Kliknite **Read Resource**
3. Pogledajte vraćeni sadržaj

**Primjer izlaza:**

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

## Testiranje promptova

### Popis promptova

1. Kliknite na karticu **Prompts**
2. Inspector poziva `prompts/list`
3. Pregledajte dostupne predloške promptova

### Dohvaćanje prompta

1. Odaberite prompt
2. Ispunite eventualne potrebne argumente
3. Kliknite **Get Prompt**
4. Pogledajte prikazane poruke prompta

---

## Analiza zapisnika poruka

Zapisnik poruka prikazuje sve MCP protokol poruke:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Na što obratiti pažnju

- **Parovi zahtjev/odgovor**: Svaki `→` treba imati odgovarajući `←`
- **Poruke o pogrešci**: Potražite `"error"` u odgovorima
- **Vremenski razmaci**: Velike praznine mogu ukazivati na probleme s performansama
- **Verzija protokola**: Provjerite slažu li se verzije poslužitelja i klijenta

---

## Integracija s VS Codeom

Inspector možete pokretati direktno iz VS Codea:

### Korištenje launch.json

Dodajte u `.vscode/launch.json`:

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

### Korištenje Tasks

Dodajte u `.vscode/tasks.json`:

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

## Uobičajeni scenariji debugiranja

### Scenarij 1: Poslužitelj se ne može povezati

**Simptomi:** Inspector prikazuje „Disconnected“ ili se "vječno" spaja na "Connecting..."

**Kontrolna lista:**
1. ✅ Je li naredba za poslužitelj točna?
2. ✅ Jesu li sve ovisnosti instalirane?
3. ✅ Je li put do poslužitelja apsolutan ili relativan na trenutni direktorij?
4. ✅ Jesu li potrebne varijable okoline postavljene?

**Koraci debugiranja:**
```bash
# Prvo ručno testirajte poslužitelj
python -c "import your_server_module; print('OK')"

# Provjerite ima li pogrešaka u uvozu
python -m your_server_module 2>&1 | head -20

# Provjerite je li MCP SDK instaliran
pip show mcp
```

### Scenarij 2: Alati se ne prikazuju

**Simptomi:** Kartica Alati prikazuje prazan popis

**Mogući uzroci:**
1. Alati nisu registrirani prilikom inicijalizacije poslužitelja
2. Poslužitelj se srušio nakon pokretanja
3. Handler za `tools/list` vraća prazan niz

**Koraci debugiranja:**
1. Provjerite zapisnik poruka za odgovor na `tools/list`
2. Dodajte logiranje u kod registracije vašeg alata
3. Provjerite jesu li prisutni `@mcp.tool()` dekoratori (Python)

### Scenarij 3: Alat vraća pogrešku

**Simptomi:** Poziv alata vraća odgovor s pogreškom

**Pristup debugiranju:**
1. Pažljivo pročitajte poruku o pogrešci
2. Provjerite slažu li se tipovi parametara sa shemom
3. Dodajte try/catch blok s detaljnim porukama o pogrešci
4. Provjerite zapisnike poslužitelja za stogove poziva

**Primjer poboljšanog rukovanja pogreškama:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Logika alata ovdje
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scenarij 4: Sadržaj resursa je prazan

**Simptomi:** Resurs se vraća, ali sadržaj je prazan ili null

**Kontrolna lista:**
1. ✅ Put ili URI datoteke je točan
2. ✅ Poslužitelj ima dopuštenje za čitanje resursa
3. ✅ Sadržaj resursa se ispravno vraća

---

## Napredne značajke Inspectora

### Prilagođeni zaglavlja (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Detaljno logiranje

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Snimanje sesija

Inspector može izvesti zapisnike poruka za kasniju analizu:
1. Kliknite **Export Log** u panelu poruka
2. Spremite JSON datoteku
3. Podijelite s članovima tima za debugiranje

---

## Najbolje prakse

1. **Testirajte rano i često** – Koristite Inspector tijekom razvoja, ne samo kad stvari zakažu
2. **Počnite jednostavno** – Testirajte osnovnu povezivost prije složenih poziva alata
3. **Provjerite shemu** – Mnogo pogrešaka nastaje zbog neusklađenosti tipova parametara
4. **Čitajte poruke o pogrešci** – MCP pogreške su obično opisne
5. **Držite Inspector otvorenim** – Pomaže otkriti probleme dok razvijate

---

## Što dalje

Završili ste Modul 3: Početak rada! Nastavite s učenjem:

- [Modul 4: Praktična implementacija](../../04-PracticalImplementation/README.md)

---

## Dodatni resursi

- [MCP Inspector GitHub spremište](https://github.com/modelcontextprotocol/inspector)
- [MCP specifikacija - Protokol poruke](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 specifikacija](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument preveden je pomoću AI usluge za prevođenje [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo osigurati točnost, molimo imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvornik dokumenta na njegovom izvornom jeziku treba smatrati službenim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakve nesporazume ili kriva tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->