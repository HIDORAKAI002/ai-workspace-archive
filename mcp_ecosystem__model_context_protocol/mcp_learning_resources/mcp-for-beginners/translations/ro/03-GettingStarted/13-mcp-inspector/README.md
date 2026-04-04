# Depanare cu MCP Inspector

**MCP Inspector** este un instrument esențial de depanare care îți permite să testezi și să depistezi problemele serverelor tale MCP în mod interactiv, fără a avea nevoie de o aplicație completă de gazdă AI. Gândește-l ca pe un „Postman pentru MCP” - oferă o interfață vizuală pentru a trimite cereri, a vedea răspunsuri și a înțelege cum se comportă serverul tău.

## De ce să folosești MCP Inspector?

Când construiești servere MCP, te vei confrunta adesea cu următoarele provocări:

- **„Serverul meu funcționează oare?”** - Inspector arată starea conexiunii
- **„Instrumentele mele sunt înregistrate corect?”** - Inspector listează toate instrumentele disponibile
- **„Care este formatul răspunsului?”** - Inspector afișează răspunsurile JSON complete
- **„De ce nu funcționează acest instrument?”** - Inspector afișează mesaje detaliate de eroare

## Cerințe preliminare

- Node.js 18+ instalat
- npm (vine odată cu Node.js)
- Un server MCP de testat (vezi [Modul 3.1 - Primul Server](../01-first-server/README.md))

## Instalare

### Opțiunea 1: Rulează cu npx (Recomandat pentru testare rapidă)

```bash
npx @modelcontextprotocol/inspector
```

### Opțiunea 2: Instalează global

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Opțiunea 3: Adaugă în proiectul tău

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Adaugă în `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Conectarea la serverul tău

### Servere stdio (Proces local)

Pentru servere care comunică prin intrare/ieșire standard:

```bash
# Server Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Server Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# Cu variabile de mediu
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### Servere SSE/HTTP (Rețea)

Pentru servere care rulează ca servicii HTTP:

1. Pornește mai întâi serverul:
   ```bash
   python server.py  # Serverul rulează pe http://localhost:8080
   ```

2. Lansează Inspector și conectează-te:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Prezentare generală a interfeței Inspector

Când Inspector se lansează, vei vedea o interfață web (de obicei la `http://localhost:5173`):

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

## Testarea instrumentelor

### Listarea instrumentelor disponibile

1. Dă clic pe fila **Tools**
2. Inspector apelează automat `tools/list`
3. Vei vedea toate instrumentele înregistrate cu:
   - Numele instrumentului
   - Descrierea
   - Schema de intrare (parametrii)

### Apelarea unui instrument

1. Selectează un instrument din listă
2. Completează parametrii necesari în formular
3. Apasă **Run Tool**
4. Vizualizează răspunsul în panoul de rezultate

**Exemplu: Testarea unui instrument calculator**

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

### Depanarea erorilor instrumentelor

Când un instrument eșuează, Inspector afișează:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Coduri frecvente de eroare:
| Cod | Semnificație |
|------|--------------|
| -32700 | Eroare de parsare (JSON invalid) |
| -32600 | Cerere invalidă |
| -32601 | Metodă negăsită |
| -32602 | Parametri invalizi |
| -32603 | Eroare internă |

---

## Testarea resurselor

### Listarea resurselor

1. Dă clic pe fila **Resources**
2. Inspector apelează `resources/list`
3. Vei vedea:
   - URI-urile resurselor
   - Numele și descrierile
   - Tipurile MIME

### Citirea unei resurse

1. Selectează o resursă
2. Apasă **Read Resource**
3. Vizualizează conținutul returnat

**Exemplu de ieșire:**

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

## Testarea mesajelor prompt

### Listarea prompturilor

1. Dă clic pe fila **Prompts**
2. Inspector apelează `prompts/list`
3. Vezi șabloanele disponibile de prompturi

### Obținerea unui prompt

1. Selectează un prompt
2. Completează eventualii argumente necesare
3. Apasă **Get Prompt**
4. Vezi mesajele prompt afisate

---

## Analiza jurnalului de mesaje

Jurnalul de mesaje arată toate mesajele protocolului MCP:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### La ce să fii atent

- **Perechi cerere/răspuns**: Fiecare `→` trebuie să aibă un `←` corespunzător
- **Mesaje de eroare**: Caută `"error"` în răspunsuri
- **Timp**: Intervalele mari pot indica probleme de performanță
- **Versiunea protocolului**: Asigură-te că serverul și clientul sunt pe aceeași versiune

---

## Integrarea în VS Code

Poți rula Inspector direct din VS Code:

### Folosind launch.json

Adaugă în `.vscode/launch.json`:

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

### Folosind Tasks

Adaugă în `.vscode/tasks.json`:

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

## Scenarii comune de depanare

### Scenariul 1: Serverul nu se conectează

**Simptome:** Inspector afișează „Disconnected” sau se blochează la „Connecting...”

**Lista de verificare:**
1. ✅ Comanda serverului este corectă?
2. ✅ Sunt toate dependențele instalate?
3. ✅ Calea către server este absolută sau relativă la directorul curent?
4. ✅ Sunt setate variabilele de mediu necesare?

**Pași de depanare:**
```bash
# Testați serverul manual mai întâi
python -c "import your_server_module; print('OK')"

# Verificați erorile de import
python -m your_server_module 2>&1 | head -20

# Verificați dacă MCP SDK este instalat
pip show mcp
```

### Scenariul 2: Instrumentele nu apar

**Simptome:** Fila Tools afișează o listă goală

**Cauze posibile:**
1. Instrumentele nu au fost înregistrate în timpul inițializării serverului
2. Serverul s-a blocat după pornire
3. Handler-ul `tools/list` returnează un array gol

**Pași de depanare:**
1. Verifică jurnalul de mesaje pentru răspunsul la `tools/list`
2. Adaugă logare în codul de înregistrare a instrumentelor
3. Verifică dacă decoratorii `@mcp.tool()` sunt prezenți (Python)

### Scenariul 3: Instrumentul întoarce eroare

**Simptome:** Apelul instrumentului returnează mesaj de eroare

**Abordare de depanare:**
1. Citește cu atenție mesajul de eroare
2. Verifică dacă tipurile parametrilor corespund schemei
3. Adaugă blocuri try/catch cu mesaje de eroare detaliate
4. Verifică jurnalele serverului pentru stive de apeluri

**Exemplu de gestiune îmbunătățită a erorilor:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Logica uneltei aici
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scenariul 4: Conținutul resursei este gol

**Simptome:** Resursa este returnată, dar conținutul este gol sau null

**Lista de verificare:**
1. ✅ Calea fișierului sau URI-ul este corect
2. ✅ Serverul are permisiunea de a citi resursa
3. ✅ Conținutul resursei este returnat corect

---

## Funcții avansate Inspector

### Headere personalizate (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Logare detaliată

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Înregistrarea sesiunilor

Inspector poate exporta jurnalele de mesaje pentru analiză ulterioară:
1. Click pe **Export Log** în panoul de mesaje
2. Salvează fișierul JSON
3. Distribuie colegilor pentru depanare

---

## Cele mai bune practici

1. **Testează devreme și des** - Folosește Inspector în timpul dezvoltării, nu doar când apar erori
2. **Începe simplu** - Testează conectivitatea de bază înainte de apeluri complexe la instrumente
3. **Verifică schema** - Multe erori provin din nepotriviri ale tipurilor parametrilor
4. **Citește mesajele de eroare** - Erorile MCP sunt de obicei descriptive
5. **Ține Inspector deschis** - Te ajută să depistezi probleme pe măsură ce dezvolți

---

## Următorii pași

Ai terminat Modulul 3: Începem! Continuă învățarea ta:

- [Modulul 4: Implementare practică](../../04-PracticalImplementation/README.md)

---

## Resurse suplimentare

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [Specificația MCP - Mesaje protocol](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Specificația JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere automată AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autoritară. Pentru informații critice, se recomandă o traducere profesională realizată de un traducător uman. Nu ne asumăm răspunderea pentru orice neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->