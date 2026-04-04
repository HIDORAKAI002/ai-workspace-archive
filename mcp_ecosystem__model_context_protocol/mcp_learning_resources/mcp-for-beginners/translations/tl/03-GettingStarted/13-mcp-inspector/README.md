# Pag-debug gamit ang MCP Inspector

Ang **MCP Inspector** ay isang mahalagang kasangkapan sa pag-debug na nagpapahintulot sa iyo na subukan at ayusin nang interaktibo ang iyong mga MCP server nang hindi nangangailangan ng buong AI host application. Isipin ito bilang "Postman para sa MCP" - nagbibigay ito ng visual na interface upang magpadala ng mga kahilingan, tingnan ang mga tugon, at maunawaan kung paano kumikilos ang iyong server.

## Bakit Gamitin ang MCP Inspector?

Kapag gumagawa ng mga MCP server, madalas kang makatagpo ng mga sumusunod na hamon:

- **"Tumatakbo ba ang aking server?"** - Ipinapakita ng Inspector ang status ng koneksyon
- **"Narehistro ba nang tama ang aking mga tool?"** - Ipinapakita ng Inspector ang lahat ng magagamit na tool
- **"Ano ang format ng tugon?"** - Ipinapakita ng Inspector ang buong JSON na mga tugon
- **"Bakit hindi gumagana ang tool na ito?"** - Ipinapakita ng Inspector ang detalyadong mga mensahe ng error

## Mga Kinakailangan

- Nakainstall na Node.js 18+
- npm (kasama sa Node.js)
- Isang MCP server na susubukan (tingnan ang [Module 3.1 - First Server](../01-first-server/README.md))

## Pag-install

### Opsyon 1: Patakbuhin gamit ang npx (Inirerekomenda para sa Mabilisang Pagsubok)

```bash
npx @modelcontextprotocol/inspector
```

### Opsyon 2: I-install Globally

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Opsyon 3: Idagdag sa Iyong Proyekto

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Idagdag sa `package.json`:
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Pagkonekta sa Iyong Server

### stdio Servers (Local Process)

Para sa mga server na nakikipag-usap gamit ang standard input/output:

```bash
# Server ng Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Server ng Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# May mga environment variable
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### SSE/HTTP Servers (Network)

Para sa mga server na tumatakbo bilang HTTP na serbisyo:

1. Patakbuhin muna ang iyong server:
   ```bash
   python server.py  # Server na tumatakbo sa http://localhost:8080
   ```

2. Ilunsad ang Inspector at mag-konekta:
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Pangkalahatang-ideya ng Interface ng Inspector

Kapag nailunsad ang Inspector, makikita mo ang web interface (karaniwang sa `http://localhost:5173`):

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

## Pagsusubok ng mga Tool

### Paglilista ng mga Magagamit na Tool

1. I-click ang tab na **Tools**
2. Awtomatikong tatawagin ng Inspector ang `tools/list`
3. Makikita mo ang lahat ng narehistrong mga tool kasama ang:
   - Pangalan ng tool
   - Deskripsyon
   - Input schema (mga parameter)

### Pagtawag ng Isang Tool

1. Piliin ang isang tool mula sa listahan
2. Punan ang kinakailangang mga parameter sa form
3. I-click ang **Run Tool**
4. Tingnan ang tugon sa resulta na panel

**Halimbawa: Pagsusubok ng calculator tool**

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

### Pag-debug sa Mga Error ng Tool

Kapag pumalya ang isang tool, ipinapakita ng Inspector:

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Karaniwang mga kodigong error:
| Code | Kahulugan |
|------|---------|
| -32700 | Parse error (di-wastong JSON) |
| -32600 | Hindi wastong kahilingan |
| -32601 | Hindi natagpuang metodo |
| -32602 | Hindi wastong mga parameter |
| -32603 | Panloob na error |

---

## Pagsusubok ng Mga Mapagkukunan

### Paglilista ng Mga Mapagkukunan

1. I-click ang tab na **Resources**
2. Tatawagin ng Inspector ang `resources/list`
3. Makikita mo ang:
   - Mga URI ng Resource
   - Mga pangalan at deskripsyon
   - Mga MIME type

### Pagbasa ng Isang Resource

1. Piliin ang isang resource
2. I-click ang **Read Resource**
3. Tingnan ang nilalaman na ibinalik

**Halimbawang output:**

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

## Pagsusubok ng Mga Prompt

### Paglilista ng Mga Prompt

1. I-click ang tab na **Prompts**
2. Tatawagin ng Inspector ang `prompts/list`
3. Tingnan ang magagamit na mga template ng prompt

### Pagkuha ng Isang Prompt

1. Piliin ang isang prompt
2. Punan ang anumang kinakailangang argumentong
3. I-click ang **Get Prompt**
4. Tingnan ang na-render na mga mensahe ng prompt

---

## Pagsusuri ng Log ng Mensahe

Ipinapakita ng log ng mensahe ang lahat ng mga mensahe ng MCP protocol:

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Ano ang Hanapin

- **Mga pares ng Request/Response**: Ang bawat `→` ay dapat may katugmang `←`
- **Mga mensahe ng error**: Hanapin ang `"error"` sa mga tugon
- **Oras**: Malalaking puwang ay maaaring magpahiwatig ng isyu sa pagganap
- **Bersyon ng protocol**: Tiyakin na ang server at client ay magkasundo sa bersyon

---

## Integrasyon sa VS Code

Maaari mong patakbuhin ang Inspector nang direkta mula sa VS Code:

### Gamit ang launch.json

Idagdag sa `.vscode/launch.json`:

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

### Gamit ang Tasks

Idagdag sa `.vscode/tasks.json`:

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

## Karaniwang Mga Senaryo sa Pag-debug

### Senaryo 1: Hindi Makakonekta ang Server

**Sintomas:** Ipinapakita ng Inspector ang "Disconnected" o naghihintay sa "Connecting..."

**Checklist:**
1. ✅ Tama ba ang command ng server?
2. ✅ Nakainstall ba lahat ng dependencies?
3. ✅ Absoluto ba o kaugnay sa kasalukuyang direktoryo ang path ng server?
4. ✅ Naayos ba ang mga kinakailangang environment variable?

**Hakbang sa pag-debug:**
```bash
# Subukan muna ang server nang manu-mano
python -c "import your_server_module; print('OK')"

# Suriin para sa mga error sa pag-import
python -m your_server_module 2>&1 | head -20

# Tiyaking naka-install ang MCP SDK
pip show mcp
```

### Senaryo 2: Hindi Lumalabas ang Mga Tool

**Sintomas:** Walang laman ang tab ng Tools

**Mga posibleng dahilan:**
1. Hindi narehistro ang mga tool sa pagsisimula ng server
2. Nag-crash ang server pagkatapos magsimula
3. Nagbabalik ng empty array ang handler na `tools/list`

**Hakbang sa pag-debug:**
1. Suriin ang log ng mensahe para sa tugon ng `tools/list`
2. Magdagdag ng pag-log sa iyong code ng pagrerehistro ng tool
3. Siguraduhing naroon ang mga dekorator na `@mcp.tool()` (Python)

### Senaryo 3: Nagbabalik ng Error ang Tool

**Sintomas:** Ang pagtawag sa tool ay nagbabalik ng error na tugon

**Lapitan sa pag-debug:**
1. Basahing mabuti ang mensahe ng error
2. Suriing tugma ang mga uri ng parameter sa schema
3. Magdagdag ng try/catch kasama ng detalyadong mga mensahe ng error
4. Tingnan ang mga log ng server para sa mga stack trace

**Halimbawa ng pinahusay na paghawak ng error:**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Loģika ng kasangkapan dito
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Senaryo 4: Walang Nilalaman ang Resource

**Sintomas:** Nagbabalik ang resource ngunit walang nilalaman o null

**Checklist:**
1. ✅ Tama ang file path o URI
2. ✅ May permiso ang server na basahin ang resource
3. ✅ Tama ang pagbabalik ng nilalaman ng resource

---

## Mga Advanced na Tampok ng Inspector

### Custom Headers (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Verbose Logging

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Pagre-record ng Mga Session

Maaaring i-export ng Inspector ang mga log ng mensahe para sa susunod na pagsusuri:
1. I-click ang **Export Log** sa panel ng mensahe
2. I-save ang JSON file
3. Ibahagi sa mga kasamahan para sa pag-debug

---

## Mga Pinakamahusay na Praktis

1. **Subukan nang maaga at madalas** - Gamitin ang Inspector habang nagde-develop, hindi lang kapag may sira
2. **Magsimula sa simple** - Subukan muna ang basic connectivity bago ang mga komplikadong pagtawag ng tool
3. **Suriin ang schema** - Maraming error ay galing sa di-tugmang uri ng parameter
4. **Basahin ang mga mensahe ng error** - Karaniwang deskriptibo ang mga error sa MCP
5. **Panatilihing bukas ang Inspector** - Nakakatulong ito na makita agad ang mga problema habang nagde-develop

---

## Ano ang Susunod

Natapos mo na ang Module 3: Getting Started! Ipagpatuloy ang iyong pag-aaral:

- [Module 4: Practical Implementation](../../04-PracticalImplementation/README.md)

---

## Karagdagang Mga Mapagkukunan

- [MCP Inspector GitHub Repository](https://github.com/modelcontextprotocol/inspector)
- [MCP Specification - Protocol Messages](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:
Ang dokumentong ito ay isinalin gamit ang AI na serbisyo sa pagsasalin na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagamat aming pinagsisikapan ang katumpakan, pakatandaan na ang mga awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o kamalian. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->