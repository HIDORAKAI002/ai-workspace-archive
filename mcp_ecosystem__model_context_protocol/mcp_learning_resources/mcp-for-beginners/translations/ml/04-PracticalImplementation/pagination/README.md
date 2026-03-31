# MCP-ലിലെ പേജ് നമ്ബർ നിർണ്ണയം (Pagination)യും വലിയ ഫലസംഖ്യകളും

നിങ്ങളുടെ MCP സെർവർ വൻഡാറ്റാസെറ്റുകൾ കൈകാര്യം ചെയ്യുമ്പോൾ - ആയിരങ്ങൾ ഫയലുകൾ, ഡേറ്റാബേസ് രേഖകൾ, അല്ലെങ്കിൽ സെർച്ച് ഫലങ്ങൾ ലിസ്റ്റ് ചെയ്യുമ്പോൾ - മെമ്മറി കാര്യക്ഷമമായി നിയന്ത്രിക്കാൻ പേജ് നമ്ബർ നിർണ്ണയം (pagination) ആവശ്യമാണ്, കൂടാതെ പ്രതികരണശേഷിയുള്ള ഉപയോക്തൃ അനുഭവങ്ങൾ നൽകാൻ ഇത് സഹായിക്കുന്നു. ഈ ഗൈഡ് MCP-ൽ pagination എങ്ങനെ നടപ്പിലാക്കാം എന്നതിനെക്കുറിച്ച് വിശദീകരിക്കുന്നു.

## Pagination പ്രധാനമാണെന്ന് എന്തുകൊണ്ട്?

pagination ഇല്ലാതെ, വൻ മറുപടികൾ ഉണ്ടാക്കാം:

- **മെമ്മറി ക്ഷയം** - ഒരേസമയം ബില്യണുകൾ രേഖകൾ ലോഡ് ചെയ്യുന്നത്
- **മന്ദഗതിയുള്ള പ്രതികരണ സമയം** - എല്ലാ ഡാറ്റയും ലോഡ് ആയിട്ടുള്ളതുവരെ ഉപയോക്താക്കൾ കാത്തിരിക്കുന്നു
- **ടൈംഔട്ട് പിഴവുകൾ** - അഭ്യർത്ഥനകൾ ടൈംഔട്ട് പരിമിതികൾ മറികടക്കുന്നു
- **ദുർബലമായ AI പ്രകടനം** - LLMs വലിയ കോൺടെക്സ്റ്റിൽ പോരാടുന്നു

MCP ഫലസഹിതങ്ങളിൽ വിശ്വസനീയവും സ്ഥിരവുമായ പേജിംഗ് നടത്താൻ **കഴ്‌സർ അടിസ്ഥാന pagination** ഉപയോഗിക്കുന്നു.

---

## MCP Pagination എങ്ങനെ പ്രവർത്തിക്കുന്നു

### കഴ്സർ ആശയം

ഒരു **കഴ്സർ** ഫലസഞ്ചയത്തിൽ നിന്നുള്ള നിങ്ങളുടെ സ്ഥാനം അടയാളപ്പെടുത്തുന്ന അപരിഗണനീയമായ സ്ട്രിങ് ആണ്. ഇത് ഒരു വലിയ പുസ്തകത്തിലെ ബുക്ക്മാർക്ക്സ് പോലെ ചിന്തിക്കാൻ കഴിയും.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/list (കഴുകിയില്ലാത്ത ക്വഴ്സർ)
    Server-->>Client: tools [1-10], nextCursor: "abc123"
    
    Client->>Server: tools/list (ക്വഴ്സർ: "abc123")
    Server-->>Client: tools [11-20], nextCursor: "def456"
    
    Client->>Server: tools/list (ക്വഴ്സർ: "def456")
    Server-->>Client: tools [21-25], nextCursor: null (അവസാനം)
```
### MCP-ൽ pagination 方法് 方法് മെതഡ്സ്

ഈ MCP メथഡ്സുകളിpagination പിന്തുണയ്ക്കുന്നു:

| 方法 | മടിയുള്ളത് | കഴ്സർ പിന്തുണ |
|--------|---------|----------------|
| `tools/list` | ടൂൾ നിർവചനങ്ങൾ | ✅ |
| `resources/list` | റിസോഴ്സ് നിർവചനങ്ങൾ | ✅ |
| `prompts/list` | പ്രോംപ്റ്റ് നിർവചനങ്ങൾ | ✅ |
| `resources/templates/list` | റിസോഴ്സ് ടെംപ്ലേറ്റുകൾ | ✅ |

---

## സെർവർ നടപ്പിലാക്കൽ

### പേത്തൺ (FastMCP)

```python
from mcp.server import Server
from mcp.types import Tool, ListToolsResult
import math

app = Server("paginated-server")

# അനുകരിച്ച വലിയ ഡാറ്റാസെറ്റ്
ALL_TOOLS = [
    Tool(name=f"tool_{i}", description=f"Tool number {i}", inputSchema={})
    for i in range(100)
]

PAGE_SIZE = 10

@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    """List tools with pagination support."""
    
    # സ്റ്റാർട്ടിംഗ് ഇൻഡക്സ് നേടാൻ കേഴ്സർ ഡികോഡ് ചെയ്യുക
    start_index = 0
    if cursor:
        try:
            start_index = int(cursor)
        except ValueError:
            start_index = 0
    
    # ഫലങ്ങളുടെ പേജ് നേടുക
    end_index = min(start_index + PAGE_SIZE, len(ALL_TOOLS))
    page_tools = ALL_TOOLS[start_index:end_index]
    
    # അടുത്ത കേഴ്സർ ගണന ചെയ്യുക
    next_cursor = None
    if end_index < len(ALL_TOOLS):
        next_cursor = str(end_index)
    
    return ListToolsResult(
        tools=page_tools,
        nextCursor=next_cursor
    )
```

### ടൈപ്പ്എസ്ക്രിപ്റ്റ്

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsResultSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({
  name: "paginated-server",
  version: "1.0.0"
});

// അനുഭവശീലമുള്ള വലിയ ഡാറ്റാസെറ്റ്
const ALL_TOOLS = Array.from({ length: 100 }, (_, i) => ({
  name: `tool_${i}`,
  description: `Tool number ${i}`,
  inputSchema: { type: "object", properties: {} }
}));

const PAGE_SIZE = 10;

server.setRequestHandler(ListToolsResultSchema, async (request) => {
  // കറസർ ഡികോഡ് ചെയ്യുക
  let startIndex = 0;
  if (request.params?.cursor) {
    startIndex = parseInt(request.params.cursor, 10) || 0;
  }
  
  // ഫലം പേജ് നേടുക
  const endIndex = Math.min(startIndex + PAGE_SIZE, ALL_TOOLS.length);
  const pageTools = ALL_TOOLS.slice(startIndex, endIndex);
  
  // അടുത്ത കറസർ കണക്കുകൂട്ടുക
  const nextCursor = endIndex < ALL_TOOLS.length ? String(endIndex) : undefined;
  
  return {
    tools: pageTools,
    nextCursor
  };
});
```

### ജावा (Spring MCP)

```java
@Service
public class PaginatedToolService {
    
    private static final int PAGE_SIZE = 10;
    private final List<Tool> allTools;
    
    public PaginatedToolService() {
        // വലിയ ഡാറ്റാസെറ്റ് ആരംഭിക്കുക
        this.allTools = IntStream.range(0, 100)
            .mapToObj(i -> new Tool("tool_" + i, "Tool number " + i, Map.of()))
            .collect(Collectors.toList());
    }
    
    @McpMethod("tools/list")
    public ListToolsResult listTools(@Param("cursor") String cursor) {
        // കേഴ്സർ ഡികോഡ് ചെയ്യുക
        int startIndex = 0;
        if (cursor != null && !cursor.isEmpty()) {
            try {
                startIndex = Integer.parseInt(cursor);
            } catch (NumberFormatException e) {
                startIndex = 0;
            }
        }
        
        // ഫലങ്ങളുടേ പേജ് എടുക്കുക
        int endIndex = Math.min(startIndex + PAGE_SIZE, allTools.size());
        List<Tool> pageTools = allTools.subList(startIndex, endIndex);
        
        // അടുത്ത കേഴ്സർ കണക്കാക്കുക
        String nextCursor = endIndex < allTools.size() ? String.valueOf(endIndex) : null;
        
        return new ListToolsResult(pageTools, nextCursor);
    }
}
```

---

## ക്ലയന്റ് നടപ്പിലാക്കൽ

### പേത്തൺ ക്ലയന്റ്

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

# ഉപയോഗം
async with client_session as session:
    tools = await get_all_tools(session)
    print(f"Found {len(tools)} tools")
```

### ടൈപ്പ്എസ്ക്രിപ്റ്റ് ക്ലയന്റ്

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

// ഉപയോഗം
const tools = await getAllTools(client);
console.log(`Found ${tools.length} tools`);
```

### സ്ലോ ലോഡിങ്ങ് പാറ്റേൺ

വളരെ വൻ ഡാറ്റാസെറ്റുകൾക്കായി പേജുകൾ ആവശ്യത്തിന് ലോഡ് ചെയ്യുക:

```python
class PaginatedToolIterator:
    """Lazily iterate through paginated tools."""
    
    def __init__(self, session: ClientSession):
        self.session = session
        self.cursor = None
        self.buffer = []
        self.exhausted = False
    
    async def __anext__(self):
        # ബഫറിൽ നിന്നു ലഭ്യമെങ്കിൽ തിരിച്ചറിഞ്ഞു നൽകുക
        if self.buffer:
            return self.buffer.pop(0)
        
        # നാം എല്ലാ പേജുകളും വിഴുങ്ങിയോ എന്ന് പരിശോധിക്കുക
        if self.exhausted:
            raise StopAsyncIteration
        
        # അടുത്ത പേജ് എടുക്കുക
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

# ഉപയോഗം - വലിയ ഡാറ്റാസെറ്റുകൾക്ക് മെമ്മറി കാര്യക്ഷമമായത്
async for tool in PaginatedToolIterator(session):
    process_tool(tool)
```

---

## റിസോഴ്സുകൾക്കുള്ള pagination

റിസോഴ്സുകൾക്ക് സാധാരണയായി ഡയറക്ടറികൾക്കോ വലിയ ഡാറ്റാസെറ്റുകൾക്കോ pagination ആവശ്യമുണ്ട്:

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
    
    # കേഴ്സർ ഡികോഡ് ചെയ്യുക (ഫയൽ ഇൻഡക്സ്)
    start_index = int(cursor) if cursor else 0
    page_size = 20
    end_index = min(start_index + page_size, len(all_files))
    
    # ഈ പേജിനான റിസോർസ് ലിസ്റ്റ് സൃഷ്‌ടിക്കുക
    resources = []
    for filename in all_files[start_index:end_index]:
        filepath = os.path.join(directory, filename)
        resources.append(Resource(
            uri=f"file://{filepath}",
            name=filename,
            mimeType="application/octet-stream"
        ))
    
    # അടുത്ത കേഴ്സർ കാൽകുലേറ്റ് ചെയ്യുക
    next_cursor = str(end_index) if end_index < len(all_files) else None
    
    return ListResourcesResult(
        resources=resources,
        nextCursor=next_cursor
    )
```

---

## കഴ്സർ ഡിസൈൻ തന്ത്രങ്ങൾ

### തന്ത്രം 1: ഇൻഡക്സ് അടിസ്ഥാനമാക്കിയുള്ളത് (സരളം)

```python
# കർസർ എന്നത് വെറും ഇൻഡക്സാണ്
cursor = "50"  # ഇനം 50-ൽ നിന്ന് ആരംഭിക്കുക
```

**നന്മകൾ:** സരളം, സ്റ്റേറ്റ് ലെസ്സ്  
**ദുർബലതകൾ:** വിഭവങ്ങൾ ചേർക്കുകയോ നീക്കം ചെയ്യുകയോ ചെയ്താൽ ഫലങ്ങൾ മാറാം

### തന്ത്രം 2: ഐഡി അടിസ്ഥാനമIZED (സ്ഥിരം)

```python
# കർസർ അവസാനമായി കാണപ്പെട്ട ഐഡി ആണ്
cursor = "item_abc123"  # ഈ ഐറ്റത്തിന്റെ ശേഷം ആരംഭിക്കുക
```

**നന്മകൾ:** വിഭവങ്ങൾ മാറിയാലും സ്ഥിരം  
**ദുർബലതകൾ:** ക്രമീകരിച്ച IDകൾ ആവശ്യമാണ്

### തന്ത്രം 3: എൻകോഡഡ് സ്റ്റേറ്റ് (സങ്കീർണ്ണം)

```python
import base64
import json

def encode_cursor(state: dict) -> str:
    return base64.b64encode(json.dumps(state).encode()).decode()

def decode_cursor(cursor: str) -> dict:
    return json.loads(base64.b64decode(cursor).decode())

# കേഴ്സർ നിരവധി സ്റ്റേറ്റ് ഫീൽഡുകൾ ഉൾക്കൊള്ളുന്നു
cursor = encode_cursor({
    "offset": 50,
    "filter": "active",
    "sort": "name"
})
```

**നന്മകൾ:** സങ്കീർണ്ണ സ്റ്റേറ്റ് എൻകോഡ് ചെയ്യാം  
**ദുർബലതകൾ:** കൂടുതൽ സങ്കീർണ്ണം, വലിയ കഴ്സർ സ്ട്രിങ്ങുകൾ

---

## മികച്ച അഭ്യസനങ്ങളെല്ലാം

### 1. അനുയോജ്യമായ പേജ് വലുപ്പങ്ങൾ തിരഞ്ഞെടുക്കുക

```python
# ഡാറ്റ വലിപ്പം പരിഗണിക്കുക
PAGE_SIZE_SMALL_ITEMS = 100   # എളുപ്പത്തിലുള്ള മെറ്റാഡേറ്റ
PAGE_SIZE_MEDIUM_ITEMS = 20   # സമ്പന്നമായ വസ്തുക്കൾ
PAGE_SIZE_LARGE_ITEMS = 5     # സങ്കീർണ്ണമായ ഉള്ളടക്കം
```

### 2. തെറ്റായ കഴ്സറുകൾ നൈസർഗ്ഗികമായി കൈകാര്യം ചെയ്യുക

```python
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    try:
        start_index = int(cursor) if cursor else 0
        if start_index < 0 or start_index >= len(ALL_TOOLS):
            start_index = 0  # തുടക്കത്തിന് പുനഃസജ്ജമാക്കുക
    except (ValueError, TypeError):
        start_index = 0  # അസാധുവായ കേഴ്സർ, പുതുതായി ആരംഭിക്കുക
    # ...
```

### 3. മൊത്തം എണ്ണത്തിൽ ഉൾപ്പെടുത്തുക (ഐച്ഛികം)

```python
return ListToolsResult(
    tools=page_tools,
    nextCursor=next_cursor,
    # ചില നടപ്പിലാക്കലുകളിൽ UI പുരോഗതിക്ക് മൊത്തം ഉൾക്കൊള്ളുന്നു
    _meta={"total": len(ALL_TOOLS)}
)
```

### 4. എഡ്ജ് കേസുകൾ പരിശോധിക്കുക

```python
async def test_pagination():
    # ഫലസഞ്ചയം ശൂന്യമാണ്
    result = await session.list_tools()
    assert result.tools == []
    assert result.nextCursor is None
    
    # ഏകപേജ്
    result = await session.list_tools()
    assert len(result.tools) <= PAGE_SIZE
    
    # അസാധുവായ കേഴ്സർ
    result = await session.list_tools(cursor="invalid")
    assert result.tools  # ആദ്യ പേജ് തിരിച്ചറിയണം
```

---

## സാധാരണ പിഴവുകൾ

### ❌ എല്ലാ ഫലങ്ങളും മടക്കി നൽകുകയും തുടർന്ന് ക്ലയന്റ്-സൈഡിൽ pagination നടത്തുകയും ചെയ്യുക

```python
# ദോഷം: എല്ലാ വസ്തുക്കളും മെയിംറിയിലേക്ക് ലോഡുചെയ്യുന്നു
@app.list_tools()
async def list_tools() -> ListToolsResult:
    all_tools = load_all_tools()  # 1 ദശലക്ഷം ഉപകരണങ്ങൾ!
    return ListToolsResult(tools=all_tools)
```

### ✅ ഡാറ്റ സ്രോതസ്സിൽ തന്നെ pagination നടത്തുക

```python
# നല്ലത്: ആവശ്യമുള്ളതേ മാത്രം ലോഡുചെയ്യുന്നു
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    offset = int(cursor) if cursor else 0
    tools = await db.query_tools(offset=offset, limit=PAGE_SIZE)
    return ListToolsResult(tools=tools, nextCursor=...)
```

---

## അടുത്തതു എന്ത്

- [Module 5.14 - Context Engineering](../../05-AdvancedTopics/mcp-contextengineering/README.md)
- [Module 8 - Best Practices](../../08-BestPractices/README.md)
- [3.8 - Testing Your MCP Server](../../03-GettingStarted/08-testing/README.md)

---

## അധിക സ്രോതസ്സുകൾ

- [MCP Specification - Pagination](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Cursor-Based Pagination Explained](https://slack.engineering/evolving-api-pagination-at-slack/)
- [Python SDK pagination tests](https://github.com/modelcontextprotocol/python-sdk/blob/main/tests/client/test_list_methods_cursor.py)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അസാധുവാക്കുന്ന അറിയിപ്പ്**:  
ഈ രേഖ [Co-op Translator](https://github.com/Azure/co-op-translator) എന്ന എ.ഐ. പരിഭാഷാ സേവനം ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിച്ചാലും, സ്വയം പ്രവർത്തിക്കുന്ന പരിഭാഷകൾ പിഴവുകളോ അക്ഷരദോഷങ്ങളോ ഉൾക്കൊള്ളാമെന്ന് ദയവായി ശ്രദ്ധിക്കൂ. ഈ രേഖയുടെ ആത്മഭാഷയിൽ ഉള്ള അസൽ കോപ്പി ആണ് പ്രാമാണിക ഉറവിടം. അത്യന്തം പ്രധാനമായ വിവരങ്ങൾക്ക് പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർഷ ചെയ്യുന്നു. ഈ പരിഭാഷയുടെ ഉപയോഗത്തിൽ ഉണ്ടാകാനിടയുള്ള തെറ്റിദ്ധാരണകൾക്കും തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കും ഞങ്ങൾ ഉത്തരവാദിത്വം ഏറ്റെടുക്കുന്നില്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->