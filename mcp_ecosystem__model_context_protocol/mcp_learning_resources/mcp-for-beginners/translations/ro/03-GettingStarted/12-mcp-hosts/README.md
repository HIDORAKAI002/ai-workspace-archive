# Configurarea Clienților Populari MCP Host

Acest ghid acoperă cum să configurezi și să folosești servere MCP cu aplicații populare de găzduire AI. Fiecare gazdă are propria abordare de configurare, dar odată setată, toate comunică cu serverele MCP folosind protocolul standardizat.

## Ce este un MCP Host?

Un **MCP Host** este o aplicație AI care se poate conecta la servere MCP pentru a-i extinde capabilitățile. Gândește-te la el ca la „interfața principală” cu care interacționează utilizatorii, în timp ce serverele MCP oferă instrumentele și datele de „backend”.

```mermaid
flowchart LR
    User[👤 Utilizator] --> Host[🖥️ Gazdă MCP]
    Host --> S1[Server MCP A]
    Host --> S2[Server MCP B]
    Host --> S3[Server MCP C]
    
    subgraph "Gazde Populare"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Cerințe Prealabile

- Un server MCP la care să te conectezi (vezi [Modulul 3.1 - Primul Server](../01-first-server/README.md))
- Aplicația gazdă instalată pe sistemul tău
- Familiaritate de bază cu fișierele de configurare JSON

---

## 1. Claude Desktop

**Claude Desktop** este aplicația oficială desktop a Anthropic care suportă nativ MCP.

### Instalare

1. Descarcă Claude Desktop de la [claude.ai/download](https://claude.ai/download)
2. Instalează și autentifică-te cu contul tău Anthropic

### Configurare

Claude Desktop folosește un fișier de configurare JSON pentru a defini serverele MCP.

**Locația fișierului de configurare:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Exemplu de configurație:**

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

### Opțiuni de Configurare

| Câmp  | Descriere | Exemplu |
|-------|-----------|---------|
| `command` | Executabilul de rulat | `"python"`, `"node"`, `"npx"` |
| `args` | Argumentele liniei de comandă | `["-m", "my_server"]` |
| `env` | Variabilele de mediu | `{"API_KEY": "xxx"}` |
| `cwd` | Directorul de lucru | `"/path/to/server"` |

### Testarea Configurării

1. Salvează fișierul de configurare
2. Reporneste complet Claude Desktop (închide și redeschide aplicația)
3. Deschide o conversație nouă
4. Caută pictograma 🔌 care indică serverele conectate
5. Încearcă să ceri lui Claude să folosească unul din instrumentele tale

### Depanarea Claude Desktop

**Serverul nu apare:**
- Verifică sintaxa fișierului de configurare cu un validator JSON
- Asigură-te că calea către comandă este corectă
- Verifică logurile Claude Desktop: Ajutor → Afișează Loguri

**Serverul se blochează la pornire:**
- Testează serverul manual în terminal mai întâi
- Verifică dacă variabilele de mediu sunt setate corect
- Asigură-te că toate dependențele sunt instalate

---

## 2. VS Code cu GitHub Copilot

VS Code suportă MCP prin extensiile GitHub Copilot Chat.

### Cerințe Prealabile

1. VS Code versiunea 1.99+ instalat
2. Extensia GitHub Copilot instalată
3. Extensia GitHub Copilot Chat instalată

### Configurare

VS Code folosește `.vscode/mcp.json` în spațiul de lucru sau în setările utilizatorului.

**Configurație spațiu de lucru** (`.vscode/mcp.json`):

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

**Setări utilizator** (`settings.json`):

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

### Folosirea MCP în VS Code

1. Deschide panoul Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Tastează `@` pentru a vedea instrumentele MCP disponibile
3. Folosește limbaj natural pentru a activa instrumentele: "Calculează 25 * 48 folosind calculatorul"

### Depanarea VS Code

**Serverele MCP nu se încarcă:**
- Verifică panoul Output → "MCP" pentru loguri de eroare
- Reîncarcă fereastra: Ctrl+Shift+P → "Developer: Reload Window"
- Verifică dacă serverul rulează singur mai întâi

---

## 3. Cursor

**Cursor** este un editor de cod axat pe AI cu suport încorporat MCP.

### Instalare

1. Descarcă Cursor de la [cursor.sh](https://cursor.sh)
2. Instalează și autentifică-te

### Configurare

Cursor folosește un format similar de configurare ca Claude Desktop.

**Locația fișierului de configurare:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Exemplu de configurație:**

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

### Folosirea MCP în Cursor

1. Deschide chat-ul AI al Cursor (Ctrl+L / Cmd+L)
2. Instrumentele MCP apar automat în sugestii
3. Cere AI-ului să execute sarcini folosind serverele conectate

---

## 4. Cline (bazat pe Terminal)

**Cline** este un client MCP bazat pe terminal, ideal pentru fluxuri de lucru pe linia de comandă.

### Instalare

```bash
npm install -g @anthropic/cline
```

### Configurare

Cline folosește variabile de mediu și argumente din linia de comandă.

**Folosirea variabilelor de mediu:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Folosirea argumentelor din linia de comandă:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Fișierul de configurare** (`~/.clinerc`):

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

### Folosirea Cline

```bash
# Pornește o sesiune interactivă
cline

# Cerere unică cu MCP
cline "Calculate the square root of 144 using the calculator"

# Listează uneltele disponibile
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** este un alt editor de cod alimentat de AI cu suport MCP.

### Instalare

1. Descarcă Windsurf de la [codeium.com/windsurf](https://codeium.com/windsurf)
2. Instalează și creează un cont

### Configurare

Configurarea Windsurf se gestionează prin interfața setărilor:

1. Deschide Setările (Ctrl+, / Cmd+,)
2. Caută „MCP”
3. Apasă pe „Editare în settings.json”

**Exemplu de configurație:**

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

## Compararea Tipurilor de Transport

Diferite gazde suportă mecanisme diferite de transport:

| Gazdă | stdio | SSE/HTTP | WebSocket |
|-------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (intrare/ieșire standard): Cel mai bun pentru servere locale pornite de gazdă  
**SSE/HTTP**: Cel mai bun pentru servere la distanță sau servere partajate între mai mulți clienți

---

## Probleme Comune de Depanare

### Serverul nu pornește

1. **Testează serverul manual mai întâi:**
   ```bash
   # Pentru Python
   python -m your_server_module
   
   # Pentru Node.js
   node /path/to/server/index.js
   ```

2. **Verifică calea comenzii:**
   - Folosește căi absolute când este posibil
   - Asigură-te că executabilul este în PATH-ul tău

3. **Verifică dependențele:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Serverul se conectează, dar instrumentele nu funcționează

1. **Verifică logurile serverului** - Majoritatea gazdelor au opțiuni de logare
2. **Verifică înregistrarea instrumentelor** - Folosește MCP Inspector pentru testare
3. **Verifică permisiunile** - Unele instrumente necesită acces la fișiere/rețea

### Variabilele de mediu nu sunt transmise

- Unele gazde curăță variabilele de mediu
- Folosește explicit câmpul `env` de configurare
- Evită datele sensibile în fișierele de configurare (folosește managementul secretelor)

---

## Cele Mai Bune Practici de Securitate

1. **Nu comite niciodată cheile API** în fișierele de configurare
2. **Folosește variabile de mediu** pentru date sensibile
3. **Limitează permisiunile serverului** doar la ce este necesar
4. **Revizuiește codul serverului** înainte de a acorda acces la sistemul tău
5. **Folosește liste permise** pentru acces la sistemul de fișiere și rețea

---

## Următorii Pași

- [3.13 - Debugging cu MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Creează primul tău server MCP](../01-first-server/README.md)
- [Modulul 5 - Subiecte Avansate](../../05-AdvancedTopics/README.md)

---

## Resurse Suplimentare

- [Documentația Claude Desktop MCP](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [Extensia VS Code MCP](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [Specificația MCP - Transporturi](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Registrul Oficial al Serverelor MCP](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:  
Acest document a fost tradus folosind serviciul de traducere automată AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim să asigurăm acuratețea, vă rugăm să aveți în vedere că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa oficială. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care pot rezulta din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->