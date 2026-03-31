# Straničenje in velike zbirke rezultatov v MCP

Ko vaš MCP strežnik obdeluje velike podatkovne zbirke - naj gre za seznam tisočih datotek, zapisov v podatkovni bazi ali rezultatov iskanja - potrebujete straničenje za učinkovito upravljanje pomnilnika in zagotavljanje odzivnih uporabniških izkušenj. Ta vodič zajema, kako implementirati in uporabljati straničenje v MCP.

## Zakaj je straničenje pomembno

Brez straničenja lahko veliki odgovori povzročijo:

- **Izčrpanje pomnilnika** - Nalaganje milijonov zapisov naenkrat
- **Počasen odzivni čas** - Uporabniki čakajo, medtem ko se vsi podatki naložijo
- **Napake zaradi poteka časa** - Zahteve presežejo omejitve časa
- **Slabo delovanje AI** - LLM-ji imajo težave z ogromnim kontekstom

MCP uporablja **straničenje na osnovi kazalca** za zanesljivo in dosledno stranjevanje skozi rezultate.

---

## Kako deluje straničenje v MCP

### Koncept kazalca

**Kazalec** je neprozoren niz, ki označuje vaš položaj v naboru rezultatov. Predstavljajte si ga kot zaznamek v dolgi knjigi.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/list (brez kazalca)
    Server-->>Client: tools [1-10], nextCursor: "abc123"
    
    Client->>Server: tools/list (kazalec: "abc123")
    Server-->>Client: tools [11-20], nextCursor: "def456"
    
    Client->>Server: tools/list (kazalec: "def456")
    Server-->>Client: tools [21-25], nextCursor: null (konec)
```
### Straničenje v MCP metodah

Te MCP metode podpirajo straničenje:

| Metoda | Vrača | Podpora za kazalec |
|--------|-------|--------------------|
| `tools/list` | Definicije orodij | ✅ |
| `resources/list` | Definicije virov | ✅ |
| `prompts/list` | Definicije pozivov | ✅ |
| `resources/templates/list` | Predloge virov | ✅ |

---

## Implementacija na strežniku

### Python (FastMCP)

```python
from mcp.server import Server
from mcp.types import Tool, ListToolsResult
import math

app = Server("paginated-server")

# Simulirani velik nabor podatkov
ALL_TOOLS = [
    Tool(name=f"tool_{i}", description=f"Tool number {i}", inputSchema={})
    for i in range(100)
]

PAGE_SIZE = 10

@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    """List tools with pagination support."""
    
    # Dekodiraj kazalec, da dobiš začetni indeks
    start_index = 0
    if cursor:
        try:
            start_index = int(cursor)
        except ValueError:
            start_index = 0
    
    # Pridobi stran rezultatov
    end_index = min(start_index + PAGE_SIZE, len(ALL_TOOLS))
    page_tools = ALL_TOOLS[start_index:end_index]
    
    # Izračunaj naslednji kazalec
    next_cursor = None
    if end_index < len(ALL_TOOLS):
        next_cursor = str(end_index)
    
    return ListToolsResult(
        tools=page_tools,
        nextCursor=next_cursor
    )
```

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsResultSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({
  name: "paginated-server",
  version: "1.0.0"
});

// Simulirani velik podatkovni niz
const ALL_TOOLS = Array.from({ length: 100 }, (_, i) => ({
  name: `tool_${i}`,
  description: `Tool number ${i}`,
  inputSchema: { type: "object", properties: {} }
}));

const PAGE_SIZE = 10;

server.setRequestHandler(ListToolsResultSchema, async (request) => {
  // Dekodiraj kazalec
  let startIndex = 0;
  if (request.params?.cursor) {
    startIndex = parseInt(request.params.cursor, 10) || 0;
  }
  
  // Pridobi stran rezultatov
  const endIndex = Math.min(startIndex + PAGE_SIZE, ALL_TOOLS.length);
  const pageTools = ALL_TOOLS.slice(startIndex, endIndex);
  
  // Izračunaj naslednji kazalec
  const nextCursor = endIndex < ALL_TOOLS.length ? String(endIndex) : undefined;
  
  return {
    tools: pageTools,
    nextCursor
  };
});
```

### Java (Spring MCP)

```java
@Service
public class PaginatedToolService {
    
    private static final int PAGE_SIZE = 10;
    private final List<Tool> allTools;
    
    public PaginatedToolService() {
        // Inicializiraj velik niz podatkov
        this.allTools = IntStream.range(0, 100)
            .mapToObj(i -> new Tool("tool_" + i, "Tool number " + i, Map.of()))
            .collect(Collectors.toList());
    }
    
    @McpMethod("tools/list")
    public ListToolsResult listTools(@Param("cursor") String cursor) {
        // Dekodiraj kazalec
        int startIndex = 0;
        if (cursor != null && !cursor.isEmpty()) {
            try {
                startIndex = Integer.parseInt(cursor);
            } catch (NumberFormatException e) {
                startIndex = 0;
            }
        }
        
        // Pridobi stran rezultatov
        int endIndex = Math.min(startIndex + PAGE_SIZE, allTools.size());
        List<Tool> pageTools = allTools.subList(startIndex, endIndex);
        
        // Izračunaj naslednji kazalec
        String nextCursor = endIndex < allTools.size() ? String.valueOf(endIndex) : null;
        
        return new ListToolsResult(pageTools, nextCursor);
    }
}
```

---

## Implementacija na odjemalcu

### Python odjemalec

```python
from mcp import ClientSession

async def get_all_tools(session: ClientSession) -> list:
    """Fetch all tools using pagination."""
    all_tools = []
    cursor = None
    
    while True:
        result = await session.list_tools(cursor=cursor)
        all_tools.extend(result.tools)
        
        if result.nextCursor is None:
            break
        cursor = result.nextCursor
    
    return all_tools

# Uporaba
async with client_session as session:
    tools = await get_all_tools(session)
    print(f"Found {len(tools)} tools")
```

### TypeScript odjemalec

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function getAllTools(client: Client): Promise<Tool[]> {
  const allTools: Tool[] = [];
  let cursor: string | undefined = undefined;
  
  do {
    const result = await client.listTools({ cursor });
    allTools.push(...result.tools);
    cursor = result.nextCursor;
  } while (cursor);
  
  return allTools;
}

// Uporaba
const tools = await getAllTools(client);
console.log(`Found ${tools.length} tools`);
```

### Vzorec lenobnega nalaganja

Za zelo velike podatkovne zbirke naložite strani po potrebi:

```python
class PaginatedToolIterator:
    """Lazily iterate through paginated tools."""
    
    def __init__(self, session: ClientSession):
        self.session = session
        self.cursor = None
        self.buffer = []
        self.exhausted = False
    
    async def __anext__(self):
        # Vrni iz predpomnilnika, če je na voljo
        if self.buffer:
            return self.buffer.pop(0)
        
        # Preveri, ali smo izčrpali vse strani
        if self.exhausted:
            raise StopAsyncIteration
        
        # Pridobi naslednjo stran
        result = await self.session.list_tools(cursor=self.cursor)
        self.buffer = list(result.tools)
        self.cursor = result.nextCursor
        
        if self.cursor is None:
            self.exhausted = True
        
        if not self.buffer:
            raise StopAsyncIteration
        
        return self.buffer.pop(0)
    
    def __aiter__(self):
        return self

# Uporaba - pomnilniku prijazno za velike podatkovne nabore
async for tool in PaginatedToolIterator(session):
    process_tool(tool)
```

---

## Straničenje za vire

Viri pogosto potrebujejo straničenje za imenike ali velike podatkovne zbirke:

```python
from mcp.server import Server
from mcp.types import Resource, ListResourcesResult
import os

app = Server("file-server")

@app.list_resources()
async def list_resources(cursor: str | None = None) -> ListResourcesResult:
    """List files in directory with pagination."""
    
    directory = "/data/files"
    all_files = sorted(os.listdir(directory))
    
    # Dekodiraj kazalec (indeks datoteke)
    start_index = int(cursor) if cursor else 0
    page_size = 20
    end_index = min(start_index + page_size, len(all_files))
    
    # Ustvari seznam virov za to stran
    resources = []
    for filename in all_files[start_index:end_index]:
        filepath = os.path.join(directory, filename)
        resources.append(Resource(
            uri=f"file://{filepath}",
            name=filename,
            mimeType="application/octet-stream"
        ))
    
    # Izračunaj naslednji kazalec
    next_cursor = str(end_index) if end_index < len(all_files) else None
    
    return ListResourcesResult(
        resources=resources,
        nextCursor=next_cursor
    )
```

---

## Strategije oblikovanja kazalca

### Strategija 1: Na osnovi indeksa (preprosto)

```python
# Kazalec je samo indeks
cursor = "50"  # Začni pri elementu 50
```

**Prednosti:** Preprosto, brez stanja  
**Slabosti:** Rezultati se lahko premaknejo, če se elementi dodajo/odstranijo

### Strategija 2: Na osnovi ID-ja (stabilno)

```python
# Kazalec je zadnji viden ID
cursor = "item_abc123"  # Začni po tem elementu
```

**Prednosti:** Stabilno tudi, če se elementi spremenijo  
**Slabosti:** Zahteva urejene ID-je

### Strategija 3: Kodirano stanje (zahtevno)

```python
import base64
import json

def encode_cursor(state: dict) -> str:
    return base64.b64encode(json.dumps(state).encode()).decode()

def decode_cursor(cursor: str) -> dict:
    return json.loads(base64.b64decode(cursor).decode())

# Kazalec vsebuje več polj stanja
cursor = encode_cursor({
    "offset": 50,
    "filter": "active",
    "sort": "name"
})
```

**Prednosti:** Omogoča kodiranje kompleksnega stanja  
**Slabosti:** Bolj zapleteno, daljši nizi kazalcev

---

## Najboljše prakse

### 1. Izberite ustrezne velikosti strani

```python
# Upoštevajte velikost podatkov
PAGE_SIZE_SMALL_ITEMS = 100   # Preprosti metapodatki
PAGE_SIZE_MEDIUM_ITEMS = 20   # Bogatejši objekti
PAGE_SIZE_LARGE_ITEMS = 5     # Kompleksna vsebina
```

### 2. Ravnajte z neveljavnimi kazalci spoštljivo

```python
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    try:
        start_index = int(cursor) if cursor else 0
        if start_index < 0 or start_index >= len(ALL_TOOLS):
            start_index = 0  # Ponastavi na začetek
    except (ValueError, TypeError):
        start_index = 0  # Neveljaven kazalec, začni znova
    # ...
```

### 3. Vključite skupno število (opcijsko)

```python
return ListToolsResult(
    tools=page_tools,
    nextCursor=next_cursor,
    # Nekatere implementacije vključujejo skupno za napredek uporabniškega vmesnika
    _meta={"total": len(ALL_TOOLS)}
)
```

### 4. Testirajte mejne primere

```python
async def test_pagination():
    # Prazen niz rezultatov
    result = await session.list_tools()
    assert result.tools == []
    assert result.nextCursor is None
    
    # Ena stran
    result = await session.list_tools()
    assert len(result.tools) <= PAGE_SIZE
    
    # Neveljaven kazalec
    result = await session.list_tools(cursor="invalid")
    assert result.tools  # Mora vrniti prvo stran
```

---

## Pogoste past

### ❌ Vrnitev vseh rezultatov in nato straničenje na odjemalcu

```python
# SLABO: Naloži vse v pomnilnik
@app.list_tools()
async def list_tools() -> ListToolsResult:
    all_tools = load_all_tools()  # 1 milijon orodij!
    return ListToolsResult(tools=all_tools)
```

### ✅ Straničenje na viru podatkov

```python
# DOBRO: Nalaga samo tisto, kar je potrebno
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    offset = int(cursor) if cursor else 0
    tools = await db.query_tools(offset=offset, limit=PAGE_SIZE)
    return ListToolsResult(tools=tools, nextCursor=...)
```

---

## Kaj sledi

- [Modul 5.14 - Inženiring konteksta](../../05-AdvancedTopics/mcp-contextengineering/README.md)
- [Modul 8 - Najboljše prakse](../../08-BestPractices/README.md)
- [3.8 - Testiranje vašega MCP strežnika](../../03-GettingStarted/08-testing/README.md)

---

## Dodatni viri

- [Specifikacija MCP - Straničenje](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Pojasnilo straničenja na osnovi kazalca](https://slack.engineering/evolving-api-pagination-at-slack/)
- [Testi straničenja v Python SDK](https://github.com/modelcontextprotocol/python-sdk/blob/main/tests/client/test_list_methods_cursor.py)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Opozorilo**:  
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v izvorni jezik se šteje za avtoritativni vir. Za ključne informacije priporočamo strokovni človeški prevod. Nismo odgovorni za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->