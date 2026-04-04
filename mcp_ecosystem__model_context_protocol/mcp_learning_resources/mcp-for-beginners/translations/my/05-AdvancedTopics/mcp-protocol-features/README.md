# MCP Protocol Features Deep Dive

ဤလမ်းညွှန်သည် MCP protocol ၏ အခြေခံကိရိယာနှင့်အသုံးပြုမှုထက် ကျော်၍ ရှုပ်ထွေးသော Features များကို ရှင်းလင်းဖော်ပြထားသည်။ ဤ Features များကိုနားလည်ခြင်းဖြင့် သင့်အား ပိုမိုခိုင်မာပြီး အသုံးပြုရလွယ်ကူသော၊ ထုတ်လုပ်နိုင်သော MCP server များကို တည်ဆောက်နိုင်မှာဖြစ်သည်။

## Features Covered

1. **Progress Notifications** - ရေရှည်ပြေးနေသော လုပ်ဆောင်ချက်များအတွက် လုပ်ဆောင်မှု တိုးတက်မှုကို အသိပေးခြင်း
2. **Request Cancellation** - ဖောက်သည်များအား လက်ရှိ ပြေးဆဲ တောင်းဆိုမှုများကို မလိုအပ်တော့လျှင် ပယ်ဖျက်ခွင့်ပြုခြင်း
3. **Resource Templates** - ပရမူတားများဖြင့် အမြဲပြောင်းလဲနိုင်သော resource URIs
4. **Server Lifecycle Events** - သေချာစွာ စတင်ဖွင့်လှစ်ခြင်းနှင့် ပိတ်သိမ်းခြင်း
5. **Logging Control** - server ဘက်မှ logging ကို စီမံခန့်ခွဲရန် ကွပ်ကဲခြင်း
6. **Error Handling Patterns** - အမှားဖြစ်ပေါ်စာရင်းများအား တိကျမှုရှိစွာကိုင်တွယ်ခြင်း

---

## 1. Progress Notifications

အချိန်ယူသော လုပ်ငန်းစဉ်များ (ဒေတာဖြင့်ဆက်ဆောင်ခြင်း၊ ဖိုင်ဒေါင်းလုဒ်၊ API ခေါ်ဆိုမှုများ) ဆိုသည်မှာ progress notifications ပေးပို့ခြင်းဖြင့် အသုံးပြုသူများကို အချက်အလက်ပေးစောင့်ကြည့်ပေးနိုင်သည်။

### How It Works

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/call (ရှည်လျားသော လုပ်ဆောင်မှု)
    Server-->>Client: အသိပေးချက်: တိုးတက်မှု ၁၀%
    Server-->>Client: အသိပေးချက်: တိုးတက်မှု ၅၀%
    Server-->>Client: အသိပေးချက်: တိုးတက်မှု ၉၀%
    Server->>Client: ရလဒ် (ပြီးစီးသွားပြီ)
```
### Python Implementation

```python
from mcp.server import Server, NotificationOptions
from mcp.types import ProgressNotification
import asyncio

app = Server("progress-server")

@app.tool()
async def process_large_file(file_path: str, ctx) -> str:
    """Process a large file with progress updates."""
    
    # တိုးတက်မှုတွက်ချက်မှုအတွက် ဖိုင်အရွယ်အစားကို ရယူပါ
    file_size = os.path.getsize(file_path)
    processed = 0
    
    with open(file_path, 'rb') as f:
        while chunk := f.read(8192):
            # အပိုင်းကို တိုက်ရိုက်လုပ်ဆောင်ပါ
            await process_chunk(chunk)
            processed += len(chunk)
            
            # တိုးတက်မှု အသိပေးချက် ပို့ပါ
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
        
        # ပစ္စည်းတိုင်းပြီးသည့်နောက် တိုးတက်မှုကို รายงานတင်ပြပါ
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

### TypeScript Implementation

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
      
      // တိုးတက်မှု အကြောင်းကြားချက် ပို့ပါ
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

### Client Handling (Python)

```python
async def handle_progress(notification):
    """Handle progress notifications from server."""
    params = notification.params
    print(f"Progress: {params.progress}/{params.total} - {params.message}")

# ဖော်ပြချက်ကို မှတ်ပုံတင်ပါ
session.on_notification("notifications/progress", handle_progress)

# ကိရိယာကို ခေါ်ယူပါ (တိုးတက်မှု အဆင့်အသစ်များကို ဖော်ပြချက်မှတဆင့် လက်ခံရရှိမည်)
result = await session.call_tool("process_large_file", {"file_path": "/data/large.csv"})
```

---

## 2. Request Cancellation

ဖောက်သည်များအား လုပ်ဆောင်မှုလိုအပ်ခြင်းမရှိတော့သော တောင်းဆိုမှုများကို ပယ်ဖျက်ခွင့်ပြုပါ။

### Python Implementation

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
        for page in range(100):  # စာမျက်နှာများစွာအတွင်း ရှာဖွေပါ
            # ပယ်ဖျက်ရန် တောင်းဆိုချက် ရှိမရှိ စစ်ဆေးပါ
            if ctx.is_cancelled:
                raise CancelledError("Search cancelled by user")
            
            # စာမျက်နှာရှာဖွေရေး စမ်းသပ်စွမ်းဆောင်မှု
            page_results = await search_page(query, page)
            results.extend(page_results)
            
            # သေးငယ်သော ဖြည်းညောင်းချိန်သည် ပယ်ဖျက်ရန် စစ်ဆေးမှုများကို ခွင့်ပြုသည်
            await asyncio.sleep(0.1)
            
    except CancelledError:
        # အပိုင်းအစ ရလဒ်များ ပြန်ပေးပါ
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

### Implementing Cancellation Context

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
            pass  # ပုံမှန် အချိန်ကုန်နယ်၊ ဆက်လက်လုပ်ဆောင်ပါ။
```

### Client-Side Cancellation

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
        # မေတ္တာရပ်ဆိုင်းရန် တောင်းဆိုချက်
        await session.send_notification({
            "method": "notifications/cancelled",
            "params": {"requestId": task.request_id, "reason": "Timeout"}
        })
        return "Search timed out"
```

---

## 3. Resource Templates

Resource templates များသည် ပရမူတားများဖြင့် စိတ်ကြိုက် URI များဖန်တီးရန် အသုံးဝင်သည်။ ဥပမာ APIs နှင့် ဒေတာဘေ့(စ်)များနှင့် သုံးနိုင်သည်။

### Defining Templates

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
    
    # URI ကို ဖတ်ရှု၍ ပါရာမီတာများကို ထုတ်ယူပါ
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

### TypeScript Implementation

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
  
  // GitHub အပွင့် URI ကို ဖတ်ရှုပြီး ခွဲခြမ်းစိတ်ဖြာပါ
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

သေချာစွာ စတင်ဖွင့်လှစ်ခြင်းနှင့် ပိတ်သိမ်းခြင်းဖြင့် ရင်းမြစ်များကို သန့်ရှင်းစွာ စီမံခန့်ခွဲနိုင်သည်။

### Python Lifecycle Management

```python
from mcp.server import Server
from contextlib import asynccontextmanager

app = Server("lifecycle-server")

# မျှဝေသော အခြေအနေ
db_connection = None
cache = None

@asynccontextmanager
async def lifespan(server: Server):
    """Manage server lifecycle."""
    global db_connection, cache
    
    # စတင်ခြင်း
    print("🚀 Server starting...")
    db_connection = await create_database_connection()
    cache = await create_cache_client()
    print("✅ Resources initialized")
    
    yield  # ဆာဗာ ဒီမှာ လည်ပတ်သည်
    
    # ပိတ်သိမ်းခြင်း
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

### TypeScript Lifecycle

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
    // အရင်းအမြစ်များ စတင်တည်ဆောက်သည်
    console.log("🚀 Server starting...");
    this.dbConnection = await createDatabaseConnection();
    console.log("✅ Database connected");
    
    // ဆာဗာကို စတင်ချိတ်ဆက်သည်
    await this.server.connect(transport);
  }
  
  async stop() {
    // အရင်းအမြစ်များ သန့်စင်သည်
    console.log("🛑 Server shutting down...");
    if (this.dbConnection) {
      await this.dbConnection.close();
    }
    await this.server.close();
    console.log("✅ Cleanup complete");
  }
  
  private setupHandlers() {
    this.server.setRequestHandler(CallToolSchema, async (request) => {
      // this.dbConnection ကို ဘေးကင်းစွာ အသုံးပြုပါ
      // ...
    });
  }
}

// ဂရေ့စ်ဖုန် ချိတ်ဆက်ပြီး အသုံးပြုခြင်း
const server = new ManagedServer();

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});

await server.start();
```

---

## 5. Logging Control

MCP သည် ဖောက်သည်များအား server ဘက် logging အဆင့်များကို ထိန်းချုပ်ခွင့်ပေးသည်။

### Implementing Logging Levels

```python
from mcp.server import Server
from mcp.types import LoggingLevel
import logging

app = Server("logging-server")

# MCP အဆင့်များကို Python မှတ်တမ်းတင်မှုအဆင့်များသို့ မြေပုံဆွဲပါ
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

### Sending Log Messages to Client

```python
@app.tool()
async def complex_operation(input: str, ctx) -> str:
    """Operation that logs to client."""
    
    # ဖောက်သည်ထံမှတ်တမ်းအသိပေးမှုပေးပို့ရန်
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

## 6. Error Handling Patterns

တိကျစွာ error handling ပြုလုပ်ခြင်းသည် ပြဿနာရှာဖွေရေးနှင့် အသုံးပြုသူအတွေ့အကြုံကို တိုးတက်စေသည်။

### MCP Error Codes

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

### Structured Error Responses

```python
@app.tool()
async def safe_operation(input: str) -> str:
    """Tool with comprehensive error handling."""
    
    # အချက်အလက်များကို စစ်ဆေးပါ
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

### Error Handling in TypeScript

```typescript
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

function validateInput(data: unknown): asserts data is ValidInput {
  if (typeof data !== "object" || data === null) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Input must be an object"
    );
  }
  // တစ်ခြား စစ်ဆေးမှုများပိုမိုလုပ်ဆောင်ရန်...
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
      throw error;  // အကြီးစား MCP အမှား ဖြစ်ပြီးစီးပြီ
    }
    
    // အခြား အမှားများကို ပြောင်းလဲရန်
    if (error instanceof NotFoundError) {
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
    
    // မသိသော အမှား
    console.error("Unexpected error:", error);
    throw new McpError(
      ErrorCode.InternalError,
      "An unexpected error occurred"
    );
  }
});
```

---

## Experimental Features (MCP 2025-11-25)

ဤ Features များသည် စမ်းသပ်ဆန်းစစ်မှုအနေဖြင့် သတ်မှတ်ထားပါသည်။

### Tasks (Long-Running Operations)

```python
# တာဝန်များသည် အခြေအနေဖြင့် အချိန်ကြာသော လုပ်ဆောင်ချက်များကို လိုက်နာစစ်ဆေးရန် ခွင့်ပြုသည်
@app.task()
async def training_task(model_id: str, data_path: str, ctx) -> str:
    """Long-running ML training task."""
    
    # တာဝန် စတင်ခဲ့သည်ဟု ရုပ်သံသတင်းပေးသည်
    await ctx.report_status("running", "Initializing training...")
    
    # လေ့ကျင့်ရေး သွတ်ခြင်း
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

### Tool Annotations

```python
# အညွှန်းများသည် ကိရိယာ၏အပြုအမူအကြောင်း မီတာဒေတာပေးသည်
@app.tool(
    annotations={
        "destructive": False,      # ဒေတာကို ပြောင်းလဲခြင်းမရှိ
        "idempotent": True,        # ထပ်မံကြိုးစားရန် လုံခြုံသည်
        "timeout_seconds": 30,     # မျှော်မှန်းထားသော အများဆုံး အချိန်ကြာမြင့်ချိန်
        "requires_approval": False # အသုံးပြုသူ ခွင့်ပြုချက် မလိုအပ်ပါ
    }
)
async def safe_query(query: str) -> str:
    """A read-only database query tool."""
    return await execute_read_query(query)
```

---

## What's Next

- [Module 8 - Best Practices](../../08-BestPractices/README.md)
- [5.14 - Context Engineering](../mcp-contextengineering/README.md)
- [MCP Specification Changelog](https://spec.modelcontextprotocol.io/)

---

## Additional Resources

- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 Error Codes](https://www.jsonrpc.org/specification#error_object)
- [Python SDK Examples](https://github.com/modelcontextprotocol/python-sdk/tree/main/examples)
- [TypeScript SDK Examples](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ကန့်သတ်ချက်**  
ဤစာတမ်းကို AI ဘာသာပြန်ဆော့ဖ်ဝဲဖြစ်သော [Co-op Translator](https://github.com/Azure/co-op-translator) မှ အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းသော်လည်း၊ စက်ပြုထားသော ဘာသာပြန်ချက်တွင် အမှားများ သို့မဟုတ် တိကျမှုမရှိမှုများ ရှိနိုင်ကြောင်း သတိပြုရန် မေတ္တာရပ်ခံလိုက်ပါသည်။ မူရင်းစာတမ်းကို မြန်မာဘာသာဖြင့်သာ တရားဝင်အရင်းအမြစ် အနေဖြင့် ယူဆရန် လိုအပ်ပါသည်။ အရေးပါတဲ့ အချက်အလက်များအတွက် မည်သည့်အခါမျှ စာရင်းပိုင်းကျွမ်းကျင်သော လူသားဘာသာပြန်မှုကိုတင်ပြရန် အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းကြောင့် ဖြစ်ပေါ်လာသော နားလည်မှားဖွယ်​ အပြစ်မဲများအတွက် ကျွန်ုပ်တို့သည် တာဝန်မယူပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->