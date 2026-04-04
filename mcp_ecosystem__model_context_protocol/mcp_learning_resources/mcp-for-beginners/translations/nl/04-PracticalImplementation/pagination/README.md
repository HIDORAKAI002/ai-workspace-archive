# Paginering en Grote Resultaatsets in MCP

Wanneer je MCP-server grote datasets verwerkt - of het nu duizenden bestanden, databasegegevens, of zoekresultaten zijn - heb je paginering nodig om het geheugen efficiënt te beheren en responsieve gebruikerservaringen te bieden. Deze gids behandelt hoe je paginering implementeert en gebruikt in MCP.

## Waarom Paginering Belangrijk Is

Zonder paginering kunnen grote reacties leiden tot:

- **Geheugenuitputting** - Het tegelijk laden van miljoenen records
- **Trage responstijden** - Gebruikers wachten terwijl alle data wordt geladen
- **Timeoutfouten** - Verzoeken overschrijden de time-out limieten
- **Slechte AI-prestaties** - LLM's hebben moeite met enorme contexten

MCP gebruikt **cursor-gebaseerde paginering** voor betrouwbare, consistente navigatie door resultaatsets.

---

## Hoe MCP Paginering Werkt

### Het Cursor Concept

Een **cursor** is een ondoorzichtig tekenreeks dat je positie in een resultaatset markeert. Zie het als een bladwijzer in een lang boek.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/list (geen cursor)
    Server-->>Client: tools [1-10], nextCursor: "abc123"
    
    Client->>Server: tools/list (cursor: "abc123")
    Server-->>Client: tools [11-20], nextCursor: "def456"
    
    Client->>Server: tools/list (cursor: "def456")
    Server-->>Client: tools [21-25], nextCursor: null (einde)
```
### Paginering in MCP Methodes

Deze MCP-methodes ondersteunen paginering:

| Methode | Retourneert | Cursor Ondersteuning |
|---------|-------------|---------------------|
| `tools/list` | Tooldefinities | ✅ |
| `resources/list` | Resource-definities | ✅ |
| `prompts/list` | Prompt-definities | ✅ |
| `resources/templates/list` | Resource-templates | ✅ |

---

## Serverimplementatie

### Python (FastMCP)

```python
from mcp.server import Server
from mcp.types import Tool, ListToolsResult
import math

app = Server("paginated-server")

# Gesimuleerde grote dataset
ALL_TOOLS = [
    Tool(name=f"tool_{i}", description=f"Tool number {i}", inputSchema={})
    for i in range(100)
]

PAGE_SIZE = 10

@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    """List tools with pagination support."""
    
    # Decodeer cursor om startindex te krijgen
    start_index = 0
    if cursor:
        try:
            start_index = int(cursor)
        except ValueError:
            start_index = 0
    
    # Haal pagina met resultaten op
    end_index = min(start_index + PAGE_SIZE, len(ALL_TOOLS))
    page_tools = ALL_TOOLS[start_index:end_index]
    
    # Bereken volgende cursor
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

// Gesimuleerde grote dataset
const ALL_TOOLS = Array.from({ length: 100 }, (_, i) => ({
  name: `tool_${i}`,
  description: `Tool number ${i}`,
  inputSchema: { type: "object", properties: {} }
}));

const PAGE_SIZE = 10;

server.setRequestHandler(ListToolsResultSchema, async (request) => {
  // Decodeer cursor
  let startIndex = 0;
  if (request.params?.cursor) {
    startIndex = parseInt(request.params.cursor, 10) || 0;
  }
  
  // Haal pagina resultaten op
  const endIndex = Math.min(startIndex + PAGE_SIZE, ALL_TOOLS.length);
  const pageTools = ALL_TOOLS.slice(startIndex, endIndex);
  
  // Bereken volgende cursor
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
        // Initialiseer grote dataset
        this.allTools = IntStream.range(0, 100)
            .mapToObj(i -> new Tool("tool_" + i, "Tool number " + i, Map.of()))
            .collect(Collectors.toList());
    }
    
    @McpMethod("tools/list")
    public ListToolsResult listTools(@Param("cursor") String cursor) {
        // Decodeer cursor
        int startIndex = 0;
        if (cursor != null && !cursor.isEmpty()) {
            try {
                startIndex = Integer.parseInt(cursor);
            } catch (NumberFormatException e) {
                startIndex = 0;
            }
        }
        
        // Haal pagina met resultaten op
        int endIndex = Math.min(startIndex + PAGE_SIZE, allTools.size());
        List<Tool> pageTools = allTools.subList(startIndex, endIndex);
        
        // Bereken volgende cursor
        String nextCursor = endIndex < allTools.size() ? String.valueOf(endIndex) : null;
        
        return new ListToolsResult(pageTools, nextCursor);
    }
}
```

---

## Clientimplementatie

### Python Client

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

# Gebruik
async with client_session as session:
    tools = await get_all_tools(session)
    print(f"Found {len(tools)} tools")
```

### TypeScript Client

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

// Gebruik
const tools = await getAllTools(client);
console.log(`Found ${tools.length} tools`);
```

### Lazy Loading Patroon

Voor zeer grote datasets, laad pagina's op aanvraag:

```python
class PaginatedToolIterator:
    """Lazily iterate through paginated tools."""
    
    def __init__(self, session: ClientSession):
        self.session = session
        self.cursor = None
        self.buffer = []
        self.exhausted = False
    
    async def __anext__(self):
        # Terugkeren uit buffer indien beschikbaar
        if self.buffer:
            return self.buffer.pop(0)
        
        # Controleren of we alle pagina's hebben uitgeput
        if self.exhausted:
            raise StopAsyncIteration
        
        # Volgende pagina ophalen
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

# Gebruik - geheugen-efficiënt voor grote datasets
async for tool in PaginatedToolIterator(session):
    process_tool(tool)
```

---

## Paginering voor Resources

Resources hebben vaak paginering nodig voor mappen of grote datasets:

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
    
    # Decodeer cursor (bestandsindex)
    start_index = int(cursor) if cursor else 0
    page_size = 20
    end_index = min(start_index + page_size, len(all_files))
    
    # Maak een lijst met bronnen voor deze pagina
    resources = []
    for filename in all_files[start_index:end_index]:
        filepath = os.path.join(directory, filename)
        resources.append(Resource(
            uri=f"file://{filepath}",
            name=filename,
            mimeType="application/octet-stream"
        ))
    
    # Bereken de volgende cursor
    next_cursor = str(end_index) if end_index < len(all_files) else None
    
    return ListResourcesResult(
        resources=resources,
        nextCursor=next_cursor
    )
```

---

## Strategieën voor Cursorontwerp

### Strategie 1: Index-Gebaseerd (Eenvoudig)

```python
# Cursor is gewoon de index
cursor = "50"  # Begin bij item 50
```

**Voordelen:** Eenvoudig, stateloos  
**Nadelen:** Resultaten kunnen verschuiven als items worden toegevoegd/verwijderd

### Strategie 2: ID-Gebaseerd (Stabiel)

```python
# Cursus is de laatst geziene ID
cursor = "item_abc123"  # Begin na dit item
```

**Voordelen:** Stabiel zelfs als items veranderen  
**Nadelen:** Vereist geordende ID's

### Strategie 3: Geëncodeerde Staat (Complex)

```python
import base64
import json

def encode_cursor(state: dict) -> str:
    return base64.b64encode(json.dumps(state).encode()).decode()

def decode_cursor(cursor: str) -> dict:
    return json.loads(base64.b64decode(cursor).decode())

# Cursor bevat meerdere statusvelden
cursor = encode_cursor({
    "offset": 50,
    "filter": "active",
    "sort": "name"
})
```

**Voordelen:** Kan complexe staat coderen  
**Nadelen:** Complexer, grotere cursor-strings

---

## Beste Praktijken

### 1. Kies Passende Paginagroottes

```python
# Houd rekening met de gegevensgrootte
PAGE_SIZE_SMALL_ITEMS = 100   # Eenvoudige metadata
PAGE_SIZE_MEDIUM_ITEMS = 20   # Rijkere objecten
PAGE_SIZE_LARGE_ITEMS = 5     # Complexe inhoud
```

### 2. Ga Sluw om met Ongeldige Cursors

```python
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    try:
        start_index = int(cursor) if cursor else 0
        if start_index < 0 or start_index >= len(ALL_TOOLS):
            start_index = 0  # Terug naar begin
    except (ValueError, TypeError):
        start_index = 0  # Ongeldige cursor, opnieuw beginnen
    # ...
```

### 3. Voeg Totaaltelling toe (Optioneel)

```python
return ListToolsResult(
    tools=page_tools,
    nextCursor=next_cursor,
    # Sommige implementaties bevatten totaal voor UI-voortgang
    _meta={"total": len(ALL_TOOLS)}
)
```

### 4. Test Randgevallen

```python
async def test_pagination():
    # Lege resultaatset
    result = await session.list_tools()
    assert result.tools == []
    assert result.nextCursor is None
    
    # Enkele pagina
    result = await session.list_tools()
    assert len(result.tools) <= PAGE_SIZE
    
    # Ongeldige cursor
    result = await session.list_tools(cursor="invalid")
    assert result.tools  # Zou de eerste pagina moeten retourneren
```

---

## Veelvoorkomende Valkuilen

### ❌ Alle Resultaten Teruggeven en Daarna Pagineren aan de Clientzijde

```python
# SLECHT: Laadt alles in het geheugen
@app.list_tools()
async def list_tools() -> ListToolsResult:
    all_tools = load_all_tools()  # 1 miljoen gereedschappen!
    return ListToolsResult(tools=all_tools)
```

### ✅ Pagineer bij de Datasource

```python
# GOED: Laadt alleen wat nodig is
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    offset = int(cursor) if cursor else 0
    tools = await db.query_tools(offset=offset, limit=PAGE_SIZE)
    return ListToolsResult(tools=tools, nextCursor=...)
```

---

## Wat Nu?

- [Module 5.14 - Context Engineering](../../05-AdvancedTopics/mcp-contextengineering/README.md)
- [Module 8 - Beste Praktijken](../../08-BestPractices/README.md)
- [3.8 - Testen van Je MCP Server](../../03-GettingStarted/08-testing/README.md)

---

## Aanvullende Bronnen

- [MCP Specificatie - Paginering](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Cursor-gebaseerde Paginering Uitgelegd](https://slack.engineering/evolving-api-pagination-at-slack/)
- [Python SDK pagineringstests](https://github.com/modelcontextprotocol/python-sdk/blob/main/tests/client/test_list_methods_cursor.py)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI-vertalingsservice [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, kan het voorkomen dat automatische vertalingen fouten of onjuistheden bevatten. Het oorspronkelijke document in de oorspronkelijke taal geldt als de gezaghebbende bron. Voor cruciale informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortkomen uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->