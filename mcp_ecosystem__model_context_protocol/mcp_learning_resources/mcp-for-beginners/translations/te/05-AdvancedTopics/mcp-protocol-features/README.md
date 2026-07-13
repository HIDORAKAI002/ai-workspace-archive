# MCP ప్రోటోకాల్ ఫీచర్స్ లో లోతైన అవగాహన

ఈ గైడ్ ప్రాథమిక టూల్ మరియు వనరు హ్యాండ్లింగ్ దాటి ఉన్న ఆధునిక MCP ప్రోటోకాల్ ఫీచర్స్ ను పరిశీలిస్తుంది. ఈ ఫీచర్స్ ను అర్థం చేసుకోవడం ద్వారా మీరు మరింత దృఢమైన, వినియోగదారులకు స్నేహపూర్వకమైన మరియు ప్రొడక్షన్-రెడి MCP సర్వర్లను నిర్మించవచ్చు.

> **ముందు చూపులు:** `2026-07-28` విడుదల అభ్యర్థి Logging ప్రిమిటివ్‌ను (stdio కోసం `stderr` మరియు సంక్షిప్త పరిశీలన కోసం OpenTelemetryను ప్రాధాన్యం ఇచ్చుతూ) డిప్రికేట్ చేస్తుంది, క్రింద ప్రస్తావించిన సర్వర్ లైఫ్‌సైకిల్ ఈవెంట్లలో ఉన్న `initialize`/సెషన్ మోడల్‌ను తొలగిస్తుంది, మరియు ప్రయోగాత్మక Tasks ఫీచర్‌ను కొత్త `tasks/get`/`tasks/update`/`tasks/cancel` లైఫ్‌సైకిల్‌తో ప్రత్యేక Tasks విస్తరణలోకి మార్చుతుంది. [MCP లో మార్పులు: 2026-07-28 విడుదల అభ్యర్థి](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) చూడండి.

## కవర్ చేసిన ఫీచర్స్

1. **ప్రగతి నోటిఫికేషన్లు** - దీర్ఘకాలిక ఆపరేషన్ల కోసం ప్రగతిని నివేదించడం
2. **అభ్యర్థన రద్దు** - క్లయింట్లు ఇన్ఫ్లైట్ అభ్యర్థనలను రద్దు చేయడానికి అనుమతిస్తుంది
3. **వనరు టెంప్లేట్లు** - పారామీటర్లతో డైనమిక్ వనరు URIలు
4. **సర్వర్ లైఫ్‌సైకిల్ ఈవెంట్లు** - సరైన ఆరంభము మరియు ముగింపు
5. **లాగింగ్ నియంత్రణ** - సర్వర్-వైపు లాగింగ్ కాన్ఫిగరేషన్
6. **లోపాలు నిర్వహణ నమూనాలు** - సజావుగా లోప ప్రతిస్పందనలు

---

## 1. ప్రగతి నోటిఫికేషన్లు

సమయం తీసుకునే ఆపరేషన్ల కోసం (డేటా ప్రాసెసింగ్, ఫైల్ డౌన్లోడ్స్, API కాల్స్), ప్రగతి నోటిఫికేషన్లు వినియోగదారులను సమాచారంలో ఉంచుతాయి.

### ఇది ఎలా పనిచేస్తుంది

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/call (దీర్ఘకాళం ఆపరేషన్)
    Server-->>Client: notification: ప్రగతి 10%
    Server-->>Client: notification: ప్రగతి 50%
    Server-->>Client: notification: ప్రగతి 90%
    Server->>Client: ఫలితం (పూర్తయింది)
```

### పైనథాన్ అమలు

```python
from mcp.server import Server, NotificationOptions
from mcp.types import ProgressNotification
import asyncio

app = Server("progress-server")

@app.tool()
async def process_large_file(file_path: str, ctx) -> str:
    """Process a large file with progress updates."""
    
    # అభివృద్ధి లెక్కింపు కోసం ఫైల్ పరిమాణం పొందండి
    file_size = os.path.getsize(file_path)
    processed = 0
    
    with open(file_path, 'rb') as f:
        while chunk := f.read(8192):
            # చంక్‌ను ప్రాసెస్ చేయండి
            await process_chunk(chunk)
            processed += len(chunk)
            
            # అభివృద్ధి అభ్యర్థన పంపండి
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
        
        # ప్రతి అంశం తర్వాత అభివృద్ధిని నివేదించండి
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

### టైప్‌స్క్రిప్ట్ అమలు

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
      
      // ప్రగతి సమాచారం పంపండి
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

### క్లయింట్ హ్యాండ్లింగ్ (పైనథాన్)

```python
async def handle_progress(notification):
    """Handle progress notifications from server."""
    params = notification.params
    print(f"Progress: {params.progress}/{params.total} - {params.message}")

# హాండ్లర్ నమోదు చేయండి
session.on_notification("notifications/progress", handle_progress)

# టూల్‌ని కాల్ చేయండి (ప్రోగ్రెస్ అప్‌డేట్లు హాండ్లర్ ద్వారా వస్తాయి)
result = await session.call_tool("process_large_file", {"file_path": "/data/large.csv"})
```

---

## 2. అభ్యర్థన రద్దు

ఇప్పుడేం అవసరం లేకుండా లేదా ఎక్కువ సమయం తీసుకుంటున్న అభ్యర్థనలను క్లయింట్లు రద్దు చెయ్యగలుగుతారు.

### పైనథాన్ అమలు

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
        for page in range(100):  # అనేక పేజీలలో శోధించండి
            # రద్దు కోరబడిందో లేదో తనిఖీ చేయండి
            if ctx.is_cancelled:
                raise CancelledError("Search cancelled by user")
            
            # పేజీ శోధనను అనుకరించండి
            page_results = await search_page(query, page)
            results.extend(page_results)
            
            # చిన్న ఆలస్యం రద్దు తనిఖీలకు అనుమతిస్తుంది
            await asyncio.sleep(0.1)
            
    except CancelledError:
        # భాగస్వామ్య ఫలితాలను 반환 చేయండి
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

### రద్దు కాంటెక్స్ట్ అమలు

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
            pass  # సాధారణ టైమ్అవుట్, కొనసాగించండి
```

### క్లయింట్-సైడ్ రద్దు

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
        # రద్దు verzoek
        await session.send_notification({
            "method": "notifications/cancelled",
            "params": {"requestId": task.request_id, "reason": "Timeout"}
        })
        return "Search timed out"
```

---

## 3. వనరు టెంప్లేట్లు

వనరు టెంప్లేట్లు పారామీటర్లతో డైనమిక్ URI నిర్మాణాన్ని అనుమతిస్తాయి, ఇది APIs మరియు డేటాబేస్లకు ఉపయోగకరం.

### టెంప్లేట్లు నిర్వచించడం

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
    
    # URI ని పార్స్ చేసి పారామీటర్లను ఎక్స్‌ట్రాక్ట్ చేయండి
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

### టైప్‌స్క్రిప్ట్ అమలు

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
  
  // GitHub ఇష్యూ URI ను విశ్లేషించండి
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

## 4. సర్వర్ లైఫ్‌సైకిల్ ఈవెంట్లు

సరైన ఆరంభము మరియు ముగింపు నిర్వహణ శుభ్రమైన వనరు నిర్వహణను నిర్ధారిస్తుంది.

### పైనథాన్ లైఫ్‌సైకిల్ నిర్వహణ

```python
from mcp.server import Server
from contextlib import asynccontextmanager

app = Server("lifecycle-server")

# పంచుకున్న స్థితి
db_connection = None
cache = None

@asynccontextmanager
async def lifespan(server: Server):
    """Manage server lifecycle."""
    global db_connection, cache
    
    # ప్రారంభం
    print("🚀 Server starting...")
    db_connection = await create_database_connection()
    cache = await create_cache_client()
    print("✅ Resources initialized")
    
    yield  # సర్వర్ ఇక్కడ నడుస్తుంది
    
    # మూసివేత
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

### టైప్‌స్క్రిప్ట్ లైఫ్‌సైకిల్

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
    // వనరులను ప్రారంభించండి
    console.log("🚀 Server starting...");
    this.dbConnection = await createDatabaseConnection();
    console.log("✅ Database connected");
    
    // సర్వర్ ప్రారంభించండి
    await this.server.connect(transport);
  }
  
  async stop() {
    // వనరులను శుభ్రపరచండి
    console.log("🛑 Server shutting down...");
    if (this.dbConnection) {
      await this.dbConnection.close();
    }
    await this.server.close();
    console.log("✅ Cleanup complete");
  }
  
  private setupHandlers() {
    this.server.setRequestHandler(CallToolSchema, async (request) => {
      // ఈ.dbConnection ను సురక్షితంగా ఉపయోగించండి
      // ...
    });
  }
}

// సున్నితమైన శట్‌డౌన్‌తో ఉపయోగం
const server = new ManagedServer();

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});

await server.start();
```

---

## 5. లాగింగ్ నియంత్రణ

MCP సర్వర్ వైపు లాగింగ్ స్థాయిలను మద్దతు ఇస్తుంది, వీటిని క్లయింట్లు నియంత్రించవచ్చు.

### లాగింగ్ స్థాయిలను అమలు చేయడం

```python
from mcp.server import Server
from mcp.types import LoggingLevel
import logging

app = Server("logging-server")

# MCP స్థాయులను Python లాగింగ్ స్థాయులకు మ్యాప్ చేయండి
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

### క్లయింట్ కు లాగ్ సందేశాలు పంపడం

```python
@app.tool()
async def complex_operation(input: str, ctx) -> str:
    """Operation that logs to client."""
    
    # క్లయింట్‌కు లాగ్ నోటిఫికేషన్ పంపండి
    await ctx.send_log(
        level="info",
        message=f"Starting complex operation with input: {input}"
    )
    
    # పని చేయండి...
    result = await do_work(input)
    
    await ctx.send_log(
        level="debug",
        message=f"Operation complete, result size: {len(result)}"
    )
    
    return result
```

---

## 6. లోపాలు నిర్వహణ నమూనాలు

సజావుగా లోపాలు నిర్వహించడం డీబగ్గింగ్ మరియు వినియోగదారుల అనుభవాన్ని మెరుగుపరుస్తుంది.

### MCP లోప కోడ్స్

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

### నిర్మిత లోప ప్రతిస్పందనలు

```python
@app.tool()
async def safe_operation(input: str) -> str:
    """Tool with comprehensive error handling."""
    
    # ఇన్‌పుట్‌ను ధృవపరచండి
    if not input:
        raise ValidationError("Input cannot be empty")
    
    if len(input) > 10000:
        raise ValidationError(f"Input too large: {len(input)} chars (max 10000)")
    
    try:
        # అనుమతులను తనిఖీ చేయండి
        if not await check_permission(input):
            raise PermissionError(f"read {input}")
        
        # ఆపరేషన్‌ను నిర్వహించండి
        result = await perform_operation(input)
        
        if result is None:
            raise NotFoundError(input)
        
        return result
        
    except ConnectionError as e:
        raise InternalError(f"Database connection failed: {e}")
    except TimeoutError as e:
        raise InternalError(f"Operation timed out: {e}")
    except Exception as e:
        # అనుకోని లోపాలను లాగ్ చేయండి
        logger.exception(f"Unexpected error in safe_operation")
        raise InternalError(f"Unexpected error: {type(e).__name__}")
```

### టైప్‌స్క్రిప్ట్ లో లోప నిర్వహణ

```typescript
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

function validateInput(data: unknown): asserts data is ValidInput {
  if (typeof data !== "object" || data === null) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Input must be an object"
    );
  }
  // మరింత సత్యాపనం...
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
      throw error;  // ఇప్పటికే MCP లో లోపం
    }
    
    // ఇతర లోపాలను మార్పిడి చేయండి
    if (error instanceof NotFoundError) {
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
    
    // తెలియని లోపం
    console.error("Unexpected error:", error);
    throw new McpError(
      ErrorCode.InternalError,
      "An unexpected error occurred"
    );
  }
});
```

---

## ప్రయోగాత్మక ఫీచర్స్ (MCP 2025-11-25)

ఈ ఫీచర్స్ స్పెసిఫికేషన్ లో ప్రయోగాత్మకంగా గుర్తించబడ్డాయి:

### టాస్క్స్ (దీర్ఘకాలిక ఆపరేషన్లు)

```python
# పనులు స్థితితో ఉన్న దీర్ఘకాలిక కార్యకలాపాలను ట్రాక్ చేయడానికి అనుమతిస్తాయి
@app.task()
async def training_task(model_id: str, data_path: str, ctx) -> str:
    """Long-running ML training task."""
    
    # పని ప్రారంభమయ్యిందని నివేదిక ఇవ్వండి
    await ctx.report_status("running", "Initializing training...")
    
    # శిక్షణ లూప్
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

### టూల్ అనోటేషన్లు

```python
# annotations సాధనపు ప్రవర్తన గురించి మెటాడేటా అందిస్తాయి
@app.tool(
    annotations={
        "destructive": False,      # డేటాను మార్చదు
        "idempotent": True,        # పునఃప్రయత్నం చేయడం సురక్షితం
        "timeout_seconds": 30,     # అంచనా గరిష్ట వ్యవధి
        "requires_approval": False # యూజర్ ఆమోదం అవసరం లేదు
    }
)
async def safe_query(query: str) -> str:
    """A read-only database query tool."""
    return await execute_read_query(query)
```

---

## తర్వాత ఏం

- [మాడ్యూల్ 8 - ఉత్తమ ఆచరణలు](../../08-BestPractices/README.md)
- [5.14 - కాన్టెక్స్ట్ ఇంజీనీరింగ్](../mcp-contextengineering/README.md)
- [MCP స్పెసిఫికేషన్ చేంజ్‌లాగ్](https://spec.modelcontextprotocol.io/)

---

## అదనపు వనరులు

- [MCP స్పెసిఫికేషన్ 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 లోప కోడ్స్](https://www.jsonrpc.org/specification#error_object)
- [పైనథాన్ SDK ఉదాహరణలు](https://github.com/modelcontextprotocol/python-sdk/tree/main/examples)
- [టైప్‌స్క్రిప్ట్ SDK ఉదాహరణలు](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->