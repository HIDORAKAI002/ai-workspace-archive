# MCP ပရိုတိုကော လက္ခဏာများ နက်နဲစွာ ရှုမြင်ခြင်း

ဤလမ်းညွှန်မှာ MCP ပရိုတိုကောအခြေခံ ကိရိယာနှင့် အရင်းအမြစ်ကျွမ်းကျင်မှုကို ကျော်လွန်သည့် အဆင့်မြင့် MCP ပရိုတိုကိုး လက္ခဏာများကို ရှင်းလင်းပြောကြားပါသည်။ ဤလက္ခဏာများကို နားလည်ခြင်းဖြင့် သင်သည် ပိုမိုတည်ငြိမ်ပြီး အသုံးပြုရလွယ်ကူသော၊ ထုတ်လုပ်မှုအဆင့်သင့် MCP ဆာဗာများကို တည်ဆောက်နိုင်ပါသည်။

> **ရှေ့ဆက်ကြည့်ခြင်း** - `2026-07-28` ထုတ်ပြန်မည့် candidate သည် Logging primitive ကို ရုပ်သိမ်းကာ (`stderr` ကို stdio အတွက်နှင့် OpenTelemetry ကို ဖွဲ့စည်းထားသော နေကြတယ်ပါတယ် မှတ်တမ်းများအတွက်အားထားခြင်းဖြင့်), နောက်မှ Server Lifecycle Events တွင် ဖော်ပြသည့် `initialize`/session မော်ဒယ်ကို ဖယ်ရှား၍၊ နည်းပညာစမ်းသပ် ခြားနားသော Tasks လက္ခဏာကို dedicated Tasks extension ထဲသို့ သယ်ယူပြီး `tasks/get`/`tasks/update`/`tasks/cancel` lifecycle အသစ်ဖြင့် လည်ပတ်စေသည်။  [What's Changing in MCP: The 2026-07-28 Release Candidate](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) ကို ကြည့်ရှုပါ။

## စုံလင်သော လက္ခဏာများ

1. **တိုးတက်မှု အသိပေးချက်များ** - အချိန်ကြာသော လုပ်ဆောင်မှုများကို တိုးတက်မှု လိုက်နာပြီး သတိပေးခြင်း
2. **တောင်းဆိုမှုဖျက်သိမ်းခြင်း** - ဖောက်သည်များ၏ လက်ရှိတောင်းဆိုမှု များကို ဖျက်သိမ်းခွင့်ပြုခြင်း
3. **အရင်းအမြစ် အစမ်းအရိပ်များ** - ပါရာမီတာများဖြင့် ရုပ်သိမ်း URI များ စိတ်ကြိုက်ဖန်တီးခြင်း
4. **ဆာဗာ အသက်မွေးဝမ်းကြောင်းဖြစ်ရပ်များ** - သင့်တော်သော စလစ်နှင့် ပိတ်ဆို့မှု
5. **မှတ်တမ်း ထိန်းချုပ်မှု** - ဆာဗာဖက်မှ မှတ်တမ်းရေးခြင်း စီမံခန့်ခွဲမှု
6. **အမှား ကိုင်တွယ် နည်းပုံစံများ** - တိကျသော အမှား တုံ့ပြန်မှုများ

---

## 1. တိုးတက်မှု အသိပေးချက်များ

အချိန်ယူသော လုပ်ငန်းများ (ဒေတာကုန်ကြမ်းမှု, ဖိုင်ဒေါင်းလုတ်များ, API ခေါ်ဆိုမှုများ) အတွက် တိုးတက်မှု အသိပေးချက်များက အသုံးပြုသူများအား သတင်းပို့သည်။

### မည်သို့ လည်ပတ်သနည်း

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/call (ရှည်လျားသော လည်ပတ်မှု)
    Server-->>Client: အကြောင်းကြားချက်: တိုးတက်မှု 10%
    Server-->>Client: အကြောင်းကြားချက်: တိုးတက်မှု 50%
    Server-->>Client: အကြောင်းကြားချက်: တိုးတက်မှု 90%
    Server->>Client: ရလဒ် (ပြီးစီးပြီ)
```

### Python မှ အကောင်အထည်ဖော်ခြင်း

```python
from mcp.server import Server, NotificationOptions
from mcp.types import ProgressNotification
import asyncio

app = Server("progress-server")

@app.tool()
async def process_large_file(file_path: str, ctx) -> str:
    """Process a large file with progress updates."""
    
    # တိုးတက်မှုတွက်ချက်ရန် ဖိုင်အရွယ်အစားရယူခြင်း
    file_size = os.path.getsize(file_path)
    processed = 0
    
    with open(file_path, 'rb') as f:
        while chunk := f.read(8192):
            # ခြက်တစ်ခုကို ဆက်လက်လုပ်ဆောင်ခြင်း
            await process_chunk(chunk)
            processed += len(chunk)
            
            # တိုးတက်မှုဖြေကြောင်းပို့ခြင်း
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
        
        # အရာတိုင်းနောက်မှ တိုးတက်မှုကို အစီရင်ခံခြင်း
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

### TypeScript မှ အကောင်အထည်ဖော်ခြင်း

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
      
      // တိုးတက်မှုအသိပေးချက် ပို့ရန်
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

### ဖောက်သည်ကိုင်တွယ်မှု (Python)

```python
async def handle_progress(notification):
    """Handle progress notifications from server."""
    params = notification.params
    print(f"Progress: {params.progress}/{params.total} - {params.message}")

# ကိုင်တွယ်သူ ကိုမှတ်ပုံတင်ပါ
session.on_notification("notifications/progress", handle_progress)

# ကိရိယာကိုခေါ်ပါ (တိုးတက်မှု အပ်ဒိတ်များကို ကိုင်တွယ်သူမှတဆင့် လက်ခံရရှိမည်)
result = await session.call_tool("process_large_file", {"file_path": "/data/large.csv"})
```

---

## 2. တောင်းဆိုမှု ဖျက်သိမ်းခြင်း

ဖောက်သည်များကို လိုအပ်မှုမရှိသည့် သို့မဟုတ် အချိန်မလုံလောက်သော တောင်းဆိုမှုများကို ဖျက်သိမ်းခွင့် ပေးပါ။

### Python မှ အကောင်အထည်ဖော်ခြင်း

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
        for page in range(100):  # စာမျက်နှာများစွာတွင်ရှာဖွေပါ
            # ဖျက်သိမ်းခြင်းတောင်းဆိုမှုရှိမရှိစစ်ဆေးပါ
            if ctx.is_cancelled:
                raise CancelledError("Search cancelled by user")
            
            # စာမျက်နှာရှာဖွေမှုကို အတုယူပါ
            page_results = await search_page(query, page)
            results.extend(page_results)
            
            # သေးငယ်သောနောက်ကျမှုသည် ဖျက်သိမ်းမှုစစ်ဆေးမှုများအတွက်ခွင့်ပြုသည်
            await asyncio.sleep(0.1)
            
    except CancelledError:
        # အပိုင်းအစရလဒ်များကိုပြန်အပ်ပါ
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

### ဖျက်သိမ်းမှု ကွန်တက်စ် တည်ဆောက်ခြင်း

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
            pass  # ပုံမှန်အချိန်ပြတ်၊ ဆက်လက်လုပ်ဆောင်ပါ။
```

### ဖောက်သည်ဖက်မှ ဖျက်သိမ်းခြင်း

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
        # မေတ္တာရပ်ဆိုင်းခြင်းကို တောင်းဆိုပါ။
        await session.send_notification({
            "method": "notifications/cancelled",
            "params": {"requestId": task.request_id, "reason": "Timeout"}
        })
        return "Search timed out"
```

---

## 3. အရင်းအမြစ် အစမ်းအရိပ်များ

အရင်းအမြစ် အစမ်းအရိပ်များက ပါရာမီတာဖြင့် ဗဟိုပြု URI များ ဖန်တီးရန် အထောက်အကူပြုသည်၊ API များနှင့် ဒေတာဘေ့စ်များအတွက် သင့်တော်သည်။

### အစမ်းအရိပ် သတ်မှတ်ခြင်း

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
    
    # URI ကို ပလာဇ်လုပြီး ပါရာမီတာတွေ အလွှာခွဲထုတ်ပါ
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

### TypeScript မှ အကောင်အထည်ဖော်ခြင်း

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
  
  // GitHub အကြောင်းအရာ URI ကို ခွဲထုတ်ပါ။
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

## 4. ဆာဗာ အသက်မွေးဝမ်းကြောင်းဖြစ်ရပ်များ

သင့်တော်သော စလစ် နှင့် ပိတ်ဆို့ခြင်းကို လုပ်ဆောင်ခြင်းအားဖြင့် သန့်ရှင်းသော အရင်းအမြစ် စီမံခန့်ခွဲမှု ဖြစ်စေသည်။

### Python အသက်မွေးဝမ်းကြောင်း စီမံခန့်ခွဲမှု

```python
from mcp.server import Server
from contextlib import asynccontextmanager

app = Server("lifecycle-server")

# မွေ့လျော်သော အခြေအနေ
db_connection = None
cache = None

@asynccontextmanager
async def lifespan(server: Server):
    """Manage server lifecycle."""
    global db_connection, cache
    
    # စတင်မှု
    print("🚀 Server starting...")
    db_connection = await create_database_connection()
    cache = await create_cache_client()
    print("✅ Resources initialized")
    
    yield  # ဆာဗာ ဒီမှာ ပြေးနေသည်
    
    # ပိတ်လိမ့်မည်
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

### TypeScript အသက်မွေးဝမ်းကြောင်း

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
    // အရင်းအမြစ်များကို စတင်လုပ်ဆောင်သည်
    console.log("🚀 Server starting...");
    this.dbConnection = await createDatabaseConnection();
    console.log("✅ Database connected");
    
    // ဆာဗာကို စတင်ပါ
    await this.server.connect(transport);
  }
  
  async stop() {
    // အရင်းအမြစ်များကို သန့်ရှင်းပါ
    console.log("🛑 Server shutting down...");
    if (this.dbConnection) {
      await this.dbConnection.close();
    }
    await this.server.close();
    console.log("✅ Cleanup complete");
  }
  
  private setupHandlers() {
    this.server.setRequestHandler(CallToolSchema, async (request) => {
      // ဒီ this.dbConnection ကို လုံခြုံစွာ အသုံးပြုပါ
      // ...
    });
  }
}

// မြန်ဆန်ပြီး သာယာသော ပိတ်ဆို့မှုနှင့် အသုံးပြုမှု
const server = new ManagedServer();

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});

await server.start();
```

---

## 5. မှတ်တမ်း ထိန်းချုပ်မှု

MCP သည် ဖောက်သည်များအတွက် ထိန်းချုပ်နိုင်သော ဆာဗာဖက်မှ မှတ်တမ်းရေးလည်းကောင်း အဆင့်များကို ထောက်ပံ့သည်။

### မှတ်တမ်းရေး အဆင့်များ လုပ်ဆောင်ခြင်း

```python
from mcp.server import Server
from mcp.types import LoggingLevel
import logging

app = Server("logging-server")

# MCP အဆင့်များကို Python မှတ်တမ်းရေးအဆင့်များနှင့် တွဲဖက်ပါ။
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

### ဖောက်သည်ဆီ သတင်းမက်ဆေ့ခ်ျ ပို့ခြင်း

```python
@app.tool()
async def complex_operation(input: str, ctx) -> str:
    """Operation that logs to client."""
    
    # မက်ဆေ့ခ််အသိပေးချက်ကို ဖောက်သည်ထံ ပို့ပါ
    await ctx.send_log(
        level="info",
        message=f"Starting complex operation with input: {input}"
    )
    
    # အလုပ်လုပ်ဆောင်ပါ...
    result = await do_work(input)
    
    await ctx.send_log(
        level="debug",
        message=f"Operation complete, result size: {len(result)}"
    )
    
    return result
```

---

## 6. အမှား ကိုင်တွယ် နည်းပုံစံများ

တိကျစွာ အမှားကိုင်တွယ်မှုသည် ဒစ်ဘတ်ချ်ခြင်းနှင့် အသုံးပြုသူ အတွေ့အကြုံကို တိုးတက်စေသည်။

### MCP အမှား ကုဒ်များ

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

### ဖွဲ့စည်းထားသော အမှား တုံ့ပြန်ချက်များ

```python
@app.tool()
async def safe_operation(input: str) -> str:
    """Tool with comprehensive error handling."""
    
    # အချက်အလက်များကို အတည်ပြုပါ
    if not input:
        raise ValidationError("Input cannot be empty")
    
    if len(input) > 10000:
        raise ValidationError(f"Input too large: {len(input)} chars (max 10000)")
    
    try:
        # ခွင့်ပြုချက်များကို စစ်ဆေးပါ
        if not await check_permission(input):
            raise PermissionError(f"read {input}")
        
        # လုပ်ဆောင်ချက်ကို ပြုလုပ်ပါ
        result = await perform_operation(input)
        
        if result is None:
            raise NotFoundError(input)
        
        return result
        
    except ConnectionError as e:
        raise InternalError(f"Database connection failed: {e}")
    except TimeoutError as e:
        raise InternalError(f"Operation timed out: {e}")
    except Exception as e:
        # မမျှော်လင့်ထားသော အမှားများကို မှတ်တမ်းတင်ပါ
        logger.exception(f"Unexpected error in safe_operation")
        raise InternalError(f"Unexpected error: {type(e).__name__}")
```

### TypeScript တွင် အမှားကိုင်တွယ်ခြင်း

```typescript
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

function validateInput(data: unknown): asserts data is ValidInput {
  if (typeof data !== "object" || data === null) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Input must be an object"
    );
  }
  // ပိုမိုစစ်ဆေးမှု...
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
      throw error;  // MCP အမှားဖြစ်ပြီးသား
    }
    
    // အခြားအမှားများကို ပြောင်းလဲမည်
    if (error instanceof NotFoundError) {
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
    
    // မသိရသောအမှား
    console.error("Unexpected error:", error);
    throw new McpError(
      ErrorCode.InternalError,
      "An unexpected error occurred"
    );
  }
});
```

---

## စမ်းသပ် စိတ်အားထက်သန်သော လက္ခဏာများ (MCP 2025-11-25)

ဤလက္ခဏာများကို သတ်မှတ်ချက်တွင် စမ်းသပ် စိတ်အားထက်သန်သည့် လက္ခဏာများအဖြစ် သတ်မှတ်ထားသည်။

### Tasks (အချိန်ကြာသော လုပ်ဆောင်ချက်များ)

```python
# အလုပ်များသည် အခြေအနေဖြင့် ရေရှည်ဆောင်ရွက်နေသော လုပ်ငန်းစဉ်များကို လိုက်လံကြည့်ရှုရန် အထောက်အကူပြုသည်
@app.task()
async def training_task(model_id: str, data_path: str, ctx) -> str:
    """Long-running ML training task."""
    
    # အလုပ်စတင်ခြင်းကို အစီရင်ခံသည်
    await ctx.report_status("running", "Initializing training...")
    
    # လေ့ကျင့်ရေးလည်ပတ်မှုကိန်း
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

### ကိရိယာ မှတ်ချက်အညွှန်းများ

```python
# အကြောင်းပြချက်များသည် ကိရိယာအပြုအမူအကြောင်း မီတာဒေတာကို ပံ့ပိုးပေးသည်
@app.tool(
    annotations={
        "destructive": False,      # ဒေတာကို မပြောင်းလဲပါ
        "idempotent": True,        # ပြန်လည်ကြိုးစားရန် လုံခြုံသည်
        "timeout_seconds": 30,     # မျှော်လင့်ထားသော အကြိုးအမြတ်အချိန်အများဆုံး
        "requires_approval": False # အသုံးပြုသူ၏ အတည်ပြုချက် မလိုအပ်ပါ
    }
)
async def safe_query(query: str) -> str:
    """A read-only database query tool."""
    return await execute_read_query(query)
```

---

## နောက်တစ်ဆက်တွဲ

- [Module 8 - အကောင်းဆုံး လေ့လာမှုများ](../../08-BestPractices/README.md)
- [5.14 - ဘောလုံး အင်ဂျင်နီယာ](../mcp-contextengineering/README.md)
- [MCP သတ်မှတ်ချက် ပြောင်းလဲမှု မှတ်တမ်း](https://spec.modelcontextprotocol.io/)

---

## အပိုဆက်စပ် အရင်းအမြစ်များ

- [MCP သတ်မှတ်ချက် 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 အမှား ကုဒ်များ](https://www.jsonrpc.org/specification#error_object)
- [Python SDK နမူနာများ](https://github.com/modelcontextprotocol/python-sdk/tree/main/examples)
- [TypeScript SDK နမူနာများ](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->