# Malalim na Pagsusuri sa Mga Tampok ng MCP Protocol

Ang gabay na ito ay sumusuri sa mga advanced na tampok ng MCP protocol na lampas sa mga pangunahing pangangasiwa ng tool at resource. Ang pag-unawa sa mga tampok na ito ay tumutulong sa iyo na bumuo ng mas matatag, user-friendly, at handang gamitin sa produksyon na mga MCP server.

> **Tumingin sa hinaharap:** ang release candidate ng `2026-07-28` ay hindi na gagamitin ang Logging primitive (mas pinapaboran ang `stderr` para sa stdio at OpenTelemetry para sa structured observability), inaalis ang modelong `initialize`/session na binanggit sa Server Lifecycle Events sa ibaba, at inililipat ang experimental na Tampok na Tasks sa isang dedikadong Tasks extension na may bagong lifecycle na `tasks/get`/`tasks/update`/`tasks/cancel`. Tingnan ang [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## Mga Tampok na Tinalakay

1. **Progress Notifications** - Mag-ulat ng progreso para sa mga operasyon na tumatagal
2. **Request Cancellation** - Payagan ang mga kliyente na kanselahin ang mga nakabinbing kahilingan
3. **Resource Templates** - Dinamikong mga URI ng resource na may mga parameter
4. **Server Lifecycle Events** - Angkop na initialization at shutdown
5. **Logging Control** - Konfigurasyon ng pag-log sa server side
6. **Error Handling Patterns** - Konsistenteng mga tugon sa error

---

## 1. Progress Notifications

Para sa mga operasyon na tumatagal (pagproseso ng data, pag-download ng file, API calls), pinananatiling may alam ang mga gumagamit sa pamamagitan ng mga notification ng progreso.

### Paano Ito Gumagana

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/call (mahabang operasyon)
    Server-->>Client: abiso: progreso 10%
    Server-->>Client: abiso: progreso 50%
    Server-->>Client: abiso: progreso 90%
    Server->>Client: resulta (tapos na)
```

### Implementasyon sa Python

```python
from mcp.server import Server, NotificationOptions
from mcp.types import ProgressNotification
import asyncio

app = Server("progress-server")

@app.tool()
async def process_large_file(file_path: str, ctx) -> str:
    """Process a large file with progress updates."""
    
    # Kunin ang laki ng file para sa pagkalkula ng progreso
    file_size = os.path.getsize(file_path)
    processed = 0
    
    with open(file_path, 'rb') as f:
        while chunk := f.read(8192):
            # Proseso ang bahagi
            await process_chunk(chunk)
            processed += len(chunk)
            
            # Magpadala ng abiso ng progreso
            progress = (processed / file_size) * 100
            await ctx.send_notification(
                ProgressNotification(
                    progressToken=ctx.request_id,
                    progress=progress,
                    total=100,
                    message=f"Processing: {progress:.1f}%"
                )
            )
    
    return f"Processed {file_size} bytes"

@app.tool()
async def batch_operation(items: list[str], ctx) -> str:
    """Process multiple items with progress."""
    
    results = []
    total = len(items)
    
    for i, item in enumerate(items):
        result = await process_item(item)
        results.append(result)
        
        # Iulat ang progreso pagkatapos ng bawat item
        await ctx.send_notification(
            ProgressNotification(
                progressToken=ctx.request_id,
                progress=i + 1,
                total=total,
                message=f"Processed {i + 1}/{total}: {item}"
            )
        )
    
    return f"Completed {total} items"
```

### Implementasyon sa TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

server.setRequestHandler(CallToolSchema, async (request, extra) => {
  const { name, arguments: args } = request.params;
  
  if (name === "process_data") {
    const items = args.items as string[];
    const results = [];
    
    for (let i = 0; i < items.length; i++) {
      const result = await processItem(items[i]);
      results.push(result);
      
      // Magpadala ng abiso ng progreso
      await extra.sendNotification({
        method: "notifications/progress",
        params: {
          progressToken: request.id,
          progress: i + 1,
          total: items.length,
          message: `Processing item ${i + 1}/${items.length}`
        }
      });
    }
    
    return { content: [{ type: "text", text: JSON.stringify(results) }] };
  }
});
```

### Pangangasiwa ng Kliyente (Python)

```python
async def handle_progress(notification):
    """Handle progress notifications from server."""
    params = notification.params
    print(f"Progress: {params.progress}/{params.total} - {params.message}")

# Magrehistro ng tagapamahala
session.on_notification("notifications/progress", handle_progress)

# Tawagan ang kasangkapan (ang mga pag-update ng progreso ay darating sa pamamagitan ng tagapamahala)
result = await session.call_tool("process_large_file", {"file_path": "/data/large.csv"})
```

---

## 2. Pagkansela ng Kahilingan

Payagan ang mga kliyente na kanselahin ang mga kahilingan na hindi na kailangan o masyadong matagal.

### Implementasyon sa Python

```python
from mcp.server import Server
from mcp.types import CancelledError
import asyncio

app = Server("cancellable-server")

@app.tool()
async def long_running_search(query: str, ctx) -> str:
    """Search that can be cancelled."""
    
    results = []
    
    try:
        for page in range(100):  # Maghanap sa maraming mga pahina
            # Suriin kung hiniling ang pagkansela
            if ctx.is_cancelled:
                raise CancelledError("Search cancelled by user")
            
            # I-simulate ang paghahanap ng pahina
            page_results = await search_page(query, page)
            results.extend(page_results)
            
            # Maliit na pagkaantala para payagan ang pagsusuri ng pagkansela
            await asyncio.sleep(0.1)
            
    except CancelledError:
        # Ibalik ang bahagyang mga resulta
        return f"Cancelled. Found {len(results)} results before cancellation."
    
    return f"Found {len(results)} total results"

@app.tool()
async def download_file(url: str, ctx) -> str:
    """Download with cancellation support."""
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            total_size = int(response.headers.get('content-length', 0))
            downloaded = 0
            chunks = []
            
            async for chunk in response.content.iter_chunked(8192):
                if ctx.is_cancelled:
                    return f"Download cancelled at {downloaded}/{total_size} bytes"
                
                chunks.append(chunk)
                downloaded += len(chunk)
            
            return f"Downloaded {downloaded} bytes"
```

### Pagpapatupad ng Cancellation Context

```python
class CancellableContext:
    """Context object that tracks cancellation state."""
    
    def __init__(self, request_id: str):
        self.request_id = request_id
        self._cancelled = asyncio.Event()
        self._cancel_reason = None
    
    @property
    def is_cancelled(self) -> bool:
        return self._cancelled.is_set()
    
    def cancel(self, reason: str = "Cancelled"):
        self._cancel_reason = reason
        self._cancelled.set()
    
    async def check_cancelled(self):
        """Raise if cancelled, otherwise continue."""
        if self.is_cancelled:
            raise CancelledError(self._cancel_reason)
    
    async def sleep_or_cancel(self, seconds: float):
        """Sleep that can be interrupted by cancellation."""
        try:
            await asyncio.wait_for(
                self._cancelled.wait(),
                timeout=seconds
            )
            raise CancelledError(self._cancel_reason)
        except asyncio.TimeoutError:
            pass  # Karaniwang timeout, magpatuloy
```

### Pagkansela sa Panig ng Kliyente

```python
import asyncio

async def search_with_timeout(session, query, timeout=30):
    """Search with automatic cancellation on timeout."""
    
    task = asyncio.create_task(
        session.call_tool("long_running_search", {"query": query})
    )
    
    try:
        result = await asyncio.wait_for(task, timeout=timeout)
        return result
    except asyncio.TimeoutError:
        # Kahilingan ng pagkansela
        await session.send_notification({
            "method": "notifications/cancelled",
            "params": {"requestId": task.request_id, "reason": "Timeout"}
        })
        return "Search timed out"
```

---

## 3. Resource Templates

Pinapayagan ng mga resource template ang dinamiko na pagkakagawa ng URI gamit ang mga parameter, na kapaki-pakinabang para sa mga API at database.

### Pagtukoy ng Mga Template

```python
from mcp.server import Server
from mcp.types import ResourceTemplate

app = Server("template-server")

@app.list_resource_templates()
async def list_templates() -> list[ResourceTemplate]:
    """Return available resource templates."""
    return [
        ResourceTemplate(
            uriTemplate="db://users/{user_id}",
            name="User Profile",
            description="Fetch user profile by ID",
            mimeType="application/json"
        ),
        ResourceTemplate(
            uriTemplate="api://weather/{city}/{date}",
            name="Weather Data",
            description="Historical weather for city and date",
            mimeType="application/json"
        ),
        ResourceTemplate(
            uriTemplate="file://{path}",
            name="File Content",
            description="Read file at given path",
            mimeType="text/plain"
        )
    ]

@app.read_resource()
async def read_resource(uri: str) -> str:
    """Read resource, expanding template parameters."""
    
    # I-parse ang URI upang kunin ang mga parameter
    if uri.startswith("db://users/"):
        user_id = uri.split("/")[-1]
        return await fetch_user(user_id)
    
    elif uri.startswith("api://weather/"):
        parts = uri.replace("api://weather/", "").split("/")
        city, date = parts[0], parts[1]
        return await fetch_weather(city, date)
    
    elif uri.startswith("file://"):
        path = uri.replace("file://", "")
        return await read_file(path)
    
    raise ValueError(f"Unknown resource URI: {uri}")
```

### Implementasyon sa TypeScript

```typescript
server.setRequestHandler(ListResourceTemplatesSchema, async () => {
  return {
    resourceTemplates: [
      {
        uriTemplate: "github://repos/{owner}/{repo}/issues/{issue_number}",
        name: "GitHub Issue",
        description: "Fetch a specific GitHub issue",
        mimeType: "application/json"
      },
      {
        uriTemplate: "db://tables/{table}/rows/{id}",
        name: "Database Row",
        description: "Fetch a row from a database table",
        mimeType: "application/json"
      }
    ]
  };
});

server.setRequestHandler(ReadResourceSchema, async (request) => {
  const uri = request.params.uri;
  
  // I-parse ang URI ng isyu sa GitHub
  const githubMatch = uri.match(/^github:\/\/repos\/([^/]+)\/([^/]+)\/issues\/(\d+)$/);
  if (githubMatch) {
    const [_, owner, repo, issueNumber] = githubMatch;
    const issue = await fetchGitHubIssue(owner, repo, parseInt(issueNumber));
    return {
      contents: [{
        uri,
        mimeType: "application/json",
        text: JSON.stringify(issue, null, 2)
      }]
    };
  }
  
  throw new Error(`Unknown resource URI: ${uri}`);
});
```

---

## 4. Server Lifecycle Events

Ang angkop na pamamahala sa initialization at shutdown ay nagsisiguro ng maayos na pangangasiwa ng mga resource.

### Pamamahala ng Lifecycle sa Python

```python
from mcp.server import Server
from contextlib import asynccontextmanager

app = Server("lifecycle-server")

# Pinagsamang estado
db_connection = None
cache = None

@asynccontextmanager
async def lifespan(server: Server):
    """Manage server lifecycle."""
    global db_connection, cache
    
    # Pagsisimula
    print("🚀 Server starting...")
    db_connection = await create_database_connection()
    cache = await create_cache_client()
    print("✅ Resources initialized")
    
    yield  # Nagtatakbo ang server dito
    
    # Pagsasara
    print("🛑 Server shutting down...")
    await db_connection.close()
    await cache.close()
    print("✅ Resources cleaned up")

app = Server("lifecycle-server", lifespan=lifespan)

@app.tool()
async def query_database(sql: str) -> str:
    """Use the shared database connection."""
    result = await db_connection.execute(sql)
    return str(result)
```

### Lifecycle sa TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

class ManagedServer {
  private server: Server;
  private dbConnection: DatabaseConnection | null = null;
  
  constructor() {
    this.server = new Server({
      name: "lifecycle-server",
      version: "1.0.0"
    });
    
    this.setupHandlers();
  }
  
  async start() {
    // Simulan ang mga pinagkukunan
    console.log("🚀 Server starting...");
    this.dbConnection = await createDatabaseConnection();
    console.log("✅ Database connected");
    
    // Simulan ang server
    await this.server.connect(transport);
  }
  
  async stop() {
    // Linisin ang mga pinagkukunan
    console.log("🛑 Server shutting down...");
    if (this.dbConnection) {
      await this.dbConnection.close();
    }
    await this.server.close();
    console.log("✅ Cleanup complete");
  }
  
  private setupHandlers() {
    this.server.setRequestHandler(CallToolSchema, async (request) => {
      // Gamitin nang ligtas ang this.dbConnection
      // ...
    });
  }
}

// Paggamit na may maayos na pagsasara
const server = new ManagedServer();

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});

await server.start();
```

---

## 5. Pagkontrol ng Logging

Sinusuportahan ng MCP ang mga antas ng pag-log sa panig ng server na maaaring kontrolin ng mga kliyente.

### Pagpapatupad ng Mga Antas ng Logging

```python
from mcp.server import Server
from mcp.types import LoggingLevel
import logging

app = Server("logging-server")

# Iugnay ang mga antas ng MCP sa mga antas ng pag-log ng Python
LEVEL_MAP = {
    LoggingLevel.DEBUG: logging.DEBUG,
    LoggingLevel.INFO: logging.INFO,
    LoggingLevel.WARNING: logging.WARNING,
    LoggingLevel.ERROR: logging.ERROR,
}

logger = logging.getLogger("mcp-server")

@app.set_logging_level()
async def set_logging_level(level: LoggingLevel) -> None:
    """Handle client request to change logging level."""
    python_level = LEVEL_MAP.get(level, logging.INFO)
    logger.setLevel(python_level)
    logger.info(f"Logging level set to {level}")

@app.tool()
async def debug_operation(data: str) -> str:
    """Tool with various logging levels."""
    logger.debug(f"Processing data: {data}")
    
    try:
        result = process(data)
        logger.info(f"Successfully processed: {result}")
        return result
    except Exception as e:
        logger.error(f"Processing failed: {e}")
        raise
```

### Pagpapadala ng Mga Mensahe ng Log sa Kliyente

```python
@app.tool()
async def complex_operation(input: str, ctx) -> str:
    """Operation that logs to client."""
    
    # Magpadala ng notification ng log sa kliyente
    await ctx.send_log(
        level="info",
        message=f"Starting complex operation with input: {input}"
    )
    
    # Gawin ang trabaho...
    result = await do_work(input)
    
    await ctx.send_log(
        level="debug",
        message=f"Operation complete, result size: {len(result)}"
    )
    
    return result
```

---

## 6. Mga Pattern sa Pagharap sa Error

Ang konsistenteng pagharap sa error ay nagpapabuti sa pagdebug at karanasan ng gumagamit.

### Mga Kodigo ng Error ng MCP

```python
from mcp.types import McpError, ErrorCode

class ToolError(McpError):
    """Base class for tool errors."""
    pass

class ValidationError(ToolError):
    """Invalid input parameters."""
    def __init__(self, message: str):
        super().__init__(ErrorCode.INVALID_PARAMS, message)

class NotFoundError(ToolError):
    """Requested resource not found."""
    def __init__(self, resource: str):
        super().__init__(ErrorCode.INVALID_REQUEST, f"Not found: {resource}")

class PermissionError(ToolError):
    """Access denied."""
    def __init__(self, action: str):
        super().__init__(ErrorCode.INVALID_REQUEST, f"Permission denied: {action}")

class InternalError(ToolError):
    """Internal server error."""
    def __init__(self, message: str):
        super().__init__(ErrorCode.INTERNAL_ERROR, message)
```

### Mga Istrukturadong Tugon sa Error

```python
@app.tool()
async def safe_operation(input: str) -> str:
    """Tool with comprehensive error handling."""
    
    # Suriin ang input
    if not input:
        raise ValidationError("Input cannot be empty")
    
    if len(input) > 10000:
        raise ValidationError(f"Input too large: {len(input)} chars (max 10000)")
    
    try:
        # Suriin ang mga pahintulot
        if not await check_permission(input):
            raise PermissionError(f"read {input}")
        
        # Isagawa ang operasyon
        result = await perform_operation(input)
        
        if result is None:
            raise NotFoundError(input)
        
        return result
        
    except ConnectionError as e:
        raise InternalError(f"Database connection failed: {e}")
    except TimeoutError as e:
        raise InternalError(f"Operation timed out: {e}")
    except Exception as e:
        # I-log ang mga hindi inaasahang error
        logger.exception(f"Unexpected error in safe_operation")
        raise InternalError(f"Unexpected error: {type(e).__name__}")
```

### Pagharap sa Error sa TypeScript

```typescript
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

function validateInput(data: unknown): asserts data is ValidInput {
  if (typeof data !== "object" || data === null) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Input must be an object"
    );
  }
  // Mas maraming beripikasyon...
}

server.setRequestHandler(CallToolSchema, async (request) => {
  try {
    validateInput(request.params.arguments);
    
    const result = await performOperation(request.params.arguments);
    
    return {
      content: [{ type: "text", text: JSON.stringify(result) }]
    };
    
  } catch (error) {
    if (error instanceof McpError) {
      throw error;  // Isa na itong MCP error
    }
    
    // I-convert ang ibang mga error
    if (error instanceof NotFoundError) {
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
    
    // Hindi kilalang error
    console.error("Unexpected error:", error);
    throw new McpError(
      ErrorCode.InternalError,
      "An unexpected error occurred"
    );
  }
});
```

---

## Mga Eksperimental na Tampok (MCP 2025-11-25)

Ang mga tampok na ito ay minarkahan bilang eksperimento sa espesipikasyon:

### Tasks (Mahahabang Operasyon)

```python
# Pinapahintulutan ng mga gawain ang pagsubaybay sa mga pangmatagalang operasyon na may estado
@app.task()
async def training_task(model_id: str, data_path: str, ctx) -> str:
    """Long-running ML training task."""
    
    # Iulat na nagsimula ang gawain
    await ctx.report_status("running", "Initializing training...")
    
    # Loop ng pagsasanay
    for epoch in range(100):
        await train_epoch(model_id, data_path, epoch)
        await ctx.report_status(
            "running",
            f"Training epoch {epoch + 1}/100",
            progress=epoch + 1,
            total=100
        )
    
    await ctx.report_status("completed", "Training finished")
    return f"Model {model_id} trained successfully"
```

### Mga Anotasyon ng Tool

```python
# Nagbibigay ang mga anotasyon ng metadata tungkol sa pag-uugali ng tool
@app.tool(
    annotations={
        "destructive": False,      # Hindi binabago ang data
        "idempotent": True,        # Ligtas subukang muli
        "timeout_seconds": 30,     # Inaasahang pinakamahabang tagal
        "requires_approval": False # Hindi kailangan ang pag-apruba ng gumagamit
    }
)
async def safe_query(query: str) -> str:
    """A read-only database query tool."""
    return await execute_read_query(query)
```

---

## Ano Ang Susunod

- [Module 8 - Mga Pinakamahusay na Kasanayan](../../08-BestPractices/README.md)
- [5.14 - Context Engineering](../mcp-contextengineering/README.md)
- [MCP Specification Changelog](https://spec.modelcontextprotocol.io/)

---

## Karagdagang mga Recursos

- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Error Codes](https://www.jsonrpc.org/specification#error_object)
- [Mga Halimbawa ng Python SDK](https://github.com/modelcontextprotocol/python-sdk/tree/main/examples)
- [Mga Halimbawa ng TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->