# MCP പ്രോട്ടോക്കോൾ ഫീച്ചറുകളുടെ ആഴത്തിലുള്ള అధ్యയനം

മൂല്യവായ്ക്കുന്ന ഉപകരണവും വിഭവങ്ങൾ കൈകാര്യം ചെയുന്നതിനെ താണ്ടിയുള്ള ഉയർന്ന തലത്തിലുള്ള MCP പ്രോട്ടോക്കോൾ ഫീച്ചറുകളെ കുറിച്ച് ഈ ഗൈഡ് പരിശോധിക്കുന്നു. ഈ ഫീച്ചറുകൾ മനസ്സിലാക്കുന്നത് കൂടുതൽ സുരക്ഷിതവും ഉപയോക്തൃ സൗഹൃദവുമായ, ഉത്പാദനസജ്ജമായ MCP സെർവറുകൾ നിർമ്മിക്കാൻ സഹായിക്കും.

## ഉൾപ്പെടുത്തിയ ഫീച്ചറുകൾ

1. **പ്രോഗ്രസ് അറിയിപ്പുകൾ** - ദീർഘനേരം പ്രവർത്തനങ്ങളിലെ പുരോഗതി റിപ്പോർട്ട് ചെയ്യുക  
2. **റിക്വസ്റ്റ് റദ്ദാക്കൽ** - ക്ലയന്റുകൾക്ക് ഓഫ്-ഫ്ലൈറ്റ് റിക്വസ്റ്റുകൾ റദ്ദാക്കാൻ അവസരം നൽകുക  
3. **റിസോഴ്‌സ് ടെംപ്ലേറ്റുകൾ** - പാരാമീറ്ററുകളുള്ള ഡൈനാമിക് റിസോഴ്‌സ് URIകൾ  
4. **സെർവർ ലൈഫ്‌സൈകിൾ ഇവന്റുകൾ** - യോജ്യമായ പ്രവർത്തനം ആരംഭിക്കൽ, അവസാനിക്കൽ  
5. **ലോഗിംഗ് നിയന്ത്രണം** - സെർവർ-പാർശ്വ ലോഗിംഗ് കോൺഫിഗറേഷൻ  
6. **പിശക് കൈകാര്യം ചെയ്യലിന്റെ മാതൃകകൾ** - സുതാര്യമായ പിശക് പ്രതികരണങ്ങൾ  

---

## 1. പ്രോഗ്രസ് അറിയിപ്പുകൾ

സമയം എടുക്കുന്ന പ്രവർത്തനങ്ങൾക്കായി (ഡാറ്റ പ്രോസസ്സിംഗ്, ഫയൽ ഡൗൺലോഡ്, API കോൾസ്), പ്രോഗ്രസ് അറിയിപ്പുകൾ ഉപയോക്താക്കളെ വിവരം നൽകുന്നു.

### എങ്ങനെ പ്രവർത്തിക്കുന്നു

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/call (ലേമ്പ് പ്രവർത്തനം)
    Server-->>Client: notification: പുരോഗതി 10%
    Server-->>Client: notification: പുരോഗതി 50%
    Server-->>Client: notification: പുരോഗതി 90%
    Server->>Client: ഫലം (പൂര്ണ്ണമായ)
```  
### പൈത്തൺ നടപ്പാക്കൽ

```python
from mcp.server import Server, NotificationOptions
from mcp.types import ProgressNotification
import asyncio

app = Server("progress-server")

@app.tool()
async def process_large_file(file_path: str, ctx) -> str:
    """Process a large file with progress updates."""
    
    # പുരോഗതി കണക്കാക്കുന്നതിനായി ഫയൽ വലുപ്പം നേടുക
    file_size = os.path.getsize(file_path)
    processed = 0
    
    with open(file_path, 'rb') as f:
        while chunk := f.read(8192):
            # ഘടകം പ്രോസസ്സ് ചെയ്യുക
            await process_chunk(chunk)
            processed += len(chunk)
            
            # പുരോഗതി അറിയിപ്പ് അയക്കുക
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
        
        # ഓരോ ഐറ്റത്തിനും ശേഷം പുരോഗതി റിപ്പോർട്ട് ചെയ്യുക
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
  
### ടൈപ്പ്സ്ക്രിപ്റ്റ് നടപ്പാക്കൽ

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
      
      // പുരോഗതി അറിയിപ്പ് അയയ്ക്കുക
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
  
### ക്ലയന്റ് കൈകാര്യം ചെയ്യൽ (പൈത്തൺ)

```python
async def handle_progress(notification):
    """Handle progress notifications from server."""
    params = notification.params
    print(f"Progress: {params.progress}/{params.total} - {params.message}")

# ഹാൻഡ്ലർ രജിസ്റ്റർ ചെയ്യുക
session.on_notification("notifications/progress", handle_progress)

# ടൂൾ വിളിക്കുക (പ്രോഗ്രസ് അപ്ഡേറ്റുകൾ ഹാൻഡ്ലറിലൂടെ ലഭിക്കും)
result = await session.call_tool("process_large_file", {"file_path": "/data/large.csv"})
```
  
---

## 2. റിക്വസ്റ്റ് റദ്ദാക്കൽ

നിലവിലില്ലാത്ത അല്ലെങ്കിൽ അധികസമയം എടുക്കുന്ന റിക്വസ്റ്റുകൾ ക്ലയന്റുകൾക്ക് റദ്ദാക്കാവും.

### പൈത്തൺ നടപ്പാക്കൽ

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
        for page in range(100):  # പല പേജുകളിലൂടെ തിരയുക
            # റദ്ദാക്കൽ അഭ്യർത്ഥന നടന്നിട്ടുണ്ടോ പരിശോധിക്കുക
            if ctx.is_cancelled:
                raise CancelledError("Search cancelled by user")
            
            # പേജ് തിരയൽ സിമുലേറ്റ് ചെയ്യുക
            page_results = await search_page(query, page)
            results.extend(page_results)
            
            # ചെറിയ വൈകിപ്പ് റദ്ദാക്കൽ പരിശോധനകൾക്ക് അനുവദിക്കുന്നു
            await asyncio.sleep(0.1)
            
    except CancelledError:
        # ഭാഗിക ഫലങ്ങൾ തിരികെ നൽകുക
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
  
### റദ്ദാക്കൽ കോൺടെക്സ്റ്റ് നടപ്പാക്കൽ

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
            pass  # സാധാരണ സമയപരിധി, തുടരുക
```
  
### ക്ലയന്റ്-പാർശ്വ റദ്ദാക്കൽ

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
        # അഭ്യർത്ഥന റദ്ദാക്കൽ
        await session.send_notification({
            "method": "notifications/cancelled",
            "params": {"requestId": task.request_id, "reason": "Timeout"}
        })
        return "Search timed out"
```
  
---

## 3. റിസോഴ്‌സ് ടെംപ്ലേറ്റുകൾ

റിസോഴ്‌സ് ടെംപ്ലേറ്റുകൾ പാരാമീറ്ററുകളോടെ ഡൈനാമിക് URI നിർമ്മാണം അനുവദിക്കുന്നു, APIകൾക്കും ഡേറ്റാബേസുകൾക്കും ഉപയോഗപ്രദമാണ്.

### ടെംപ്ലേറ്റുകൾ നിർവചിക്കൽ

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
    
    # പോരാമീറ്ററുകൾ എടുത്ത് اخര്‍ന്നെടുക്കാന്‍ URI വിശകലനം ചെയ്യുക
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
  
### ടൈപ്പ്സ്ക്രിപ്റ്റ് നടപ്പാക്കൽ

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
  
  // GitHub പ്രശ്ന URI പൊരുത്തമുള്ളവാക്കി മാറ്റുക
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

## 4. സെർവർ ലൈഫ്‌സൈകിൾ ഇവന്റുകൾ

രൂപാധാരണമായ തുടക്കം, അവസാനകാല നിയന്ത്രണം ഉറപ്പാക്കുക, ശുചിത്വമായ വിഭവങ്ങൾ മാനേജ്മെന്റ് സാധ്യമാക്കുന്നു.

### പൈത്തൺ ലൈഫ്‌സൈകിൾ മാനേജ്മെന്റ്

```python
from mcp.server import Server
from contextlib import asynccontextmanager

app = Server("lifecycle-server")

# പങ്കുവെച്ച സ്ഥിതി
db_connection = None
cache = None

@asynccontextmanager
async def lifespan(server: Server):
    """Manage server lifecycle."""
    global db_connection, cache
    
    # തുടക്കം
    print("🚀 Server starting...")
    db_connection = await create_database_connection()
    cache = await create_cache_client()
    print("✅ Resources initialized")
    
    yield  # സർവർ ഇവിടെ പ്രവർത്തിക്കുന്നു
    
    # ശട്ട്‌ഡൗൺ
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
  
### ടൈപ്പ്സ്ക്രിപ്റ്റ് ലൈഫ്‌സൈകിൾ

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
    // സ്രോതസ്സുകള്‍ ആരംഭിക്കുക
    console.log("🚀 Server starting...");
    this.dbConnection = await createDatabaseConnection();
    console.log("✅ Database connected");
    
    // സെര്‍വര്‍ ആരംഭിക്കുക
    await this.server.connect(transport);
  }
  
  async stop() {
    // സ്രോതസ്സുകള്‍ ശുചീകരിക്കുക
    console.log("🛑 Server shutting down...");
    if (this.dbConnection) {
      await this.dbConnection.close();
    }
    await this.server.close();
    console.log("✅ Cleanup complete");
  }
  
  private setupHandlers() {
    this.server.setRequestHandler(CallToolSchema, async (request) => {
      // ഈ.this.dbConnection സുരക്ഷിതമായി ഉപയോഗിക്കുക
      // ...
    });
  }
}

// സാന്ദ്രമായ ഷട്ട് ഡൗണുമായി ഉപയോഗിക്കുക
const server = new ManagedServer();

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});

await server.start();
```
  
---

## 5. ലോഗിംഗ് നിയന്ത്രണം

MCP സെർവർ-പാർശ്വ ലോഗിംഗ് ലെവലുകൾ ക്ലയന്റുകൾ നിയന്ത്രിക്കാൻ സഹായിക്കുന്നു.

### ലോഗിംഗ് ലെവലുകൾ നടപ്പാക്കൽ

```python
from mcp.server import Server
from mcp.types import LoggingLevel
import logging

app = Server("logging-server")

# MCP നിലകളെ Python ലോഗിംഗ് നിലകളിലേക്ക് മാപ്പ് ചെയ്യുക
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
  
### ക്ലയന്റിലേക്ക് ലോഗ് സന്ദേശങ്ങൾ അയയ്ക്കൽ

```python
@app.tool()
async def complex_operation(input: str, ctx) -> str:
    """Operation that logs to client."""
    
    # ക്ലയന്റിന് ലോഗ് അറിയിപ്പ് അയയ്ക്കുക
    await ctx.send_log(
        level="info",
        message=f"Starting complex operation with input: {input}"
    )
    
    # ജോലി ചെയ്യുക...
    result = await do_work(input)
    
    await ctx.send_log(
        level="debug",
        message=f"Operation complete, result size: {len(result)}"
    )
    
    return result
```
  
---

## 6. പിശക് കൈകാര്യം ചെയ്യലിന്റെ മാതൃകകൾ

സുസ്ഥിരമായ പിശക് കൈകാര്യം ചെയ്യൽ മെച്ചപ്പെട്ട ഡീബഗ്ഗിംഗിന്റെയും ഉപയോക്തൃ അനുഭവത്തിന്റെയും ഉറപ്പാണ്.

### MCP പിശക് കോഡുകൾ

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
  
### ഘടിത പിശക് പ്രതികരണങ്ങൾ

```python
@app.tool()
async def safe_operation(input: str) -> str:
    """Tool with comprehensive error handling."""
    
    # ഇൻപുട്ട് ശരിയാണോ എന്ന് പരിശോധിക്കുക
    if not input:
        raise ValidationError("Input cannot be empty")
    
    if len(input) > 10000:
        raise ValidationError(f"Input too large: {len(input)} chars (max 10000)")
    
    try:
        # അനുമതികൾ പരിശോധിക്കുക
        if not await check_permission(input):
            raise PermissionError(f"read {input}")
        
        # പ്രവർത്തനം നടത്തുക
        result = await perform_operation(input)
        
        if result is None:
            raise NotFoundError(input)
        
        return result
        
    except ConnectionError as e:
        raise InternalError(f"Database connection failed: {e}")
    except TimeoutError as e:
        raise InternalError(f"Operation timed out: {e}")
    except Exception as e:
        # 예상ിക്കാതെ സംഭവിച്ച പിശകുകൾ ലോഗ് ചെയ്യുക
        logger.exception(f"Unexpected error in safe_operation")
        raise InternalError(f"Unexpected error: {type(e).__name__}")
```
  
### ടൈപ്പ്സ്ക്രിപ്റ്റിലെ പിശക് കൈകാര്യം ചെയ്യൽ

```typescript
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

function validateInput(data: unknown): asserts data is ValidInput {
  if (typeof data !== "object" || data === null) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Input must be an object"
    );
  }
  // കൂടുതൽ പരിശോധന...
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
      throw error;  // ഇതിനകം MCP പിശക്
    }
    
    // മറ്റ് പിശകുകൾ മാറ്റി എഴുതുക
    if (error instanceof NotFoundError) {
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
    
    // അറിയപ്പെടാത്ത പിശക്
    console.error("Unexpected error:", error);
    throw new McpError(
      ErrorCode.InternalError,
      "An unexpected error occurred"
    );
  }
});
```
  
---

## പരീക്ഷണപരമായ ഫീച്ചറുകൾ (MCP 2025-11-25)

സ്പെസിഫിക്കേഷനിൽ പരീക്ഷണ ഘടകമായായി അടയാളപ്പെടുത്തിയ ഫീച്ചറുകൾ:

### ടാസ്കുകൾ (ദീർഘനേരം പ്രവർത്തനങ്ങൾ)

```python
# സ്റ്റേറ്റ് ഉപയോഗിച്ച് ദൈർഘ്യമുള്ള ഓപ്പറേഷനുകൾ ട്രാക്ക് ചെയ്യാൻ ടാസ്കുകൾ അനുവദിക്കുന്നു
@app.task()
async def training_task(model_id: str, data_path: str, ctx) -> str:
    """Long-running ML training task."""
    
    # ടാസ്‌ക് തുടങ്ങിയതായി റിപ്പോർട്ട് ചെയ്യുക
    await ctx.report_status("running", "Initializing training...")
    
    # പരിശീലന ലൂപ്പ്
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
  
### ടൂൾ അനോട്ടേഷനുകൾ

```python
# ഉപകരണത്തിന്റെ പെരുമാറ്റത്തെക്കുറിച്ചുള്ള മെറ്റാഡാറ്റ നൽകുന്നു
@app.tool(
    annotations={
        "destructive": False,      # ഡാറ്റ മാറ്റ് ചെയ്യുന്നത് അല്ല
        "idempotent": True,        # പുനരാലോചനയ്ക്ക് സുരക്ഷിതം
        "timeout_seconds": 30,     # പ്രതീക്ഷിച്ച ഏറ്റവും ഉയർന്ന ദൈർഘ്യം
        "requires_approval": False # ഉപയോക്തൃ അംഗീകാരം ആവശ്യമില്ല
    }
)
async def safe_query(query: str) -> str:
    """A read-only database query tool."""
    return await execute_read_query(query)
```
  
---

## പിന്നീട് എന്തെല്ലാം

- [Module 8 - Best Practices](../../08-BestPractices/README.md)  
- [5.14 - Context Engineering](../mcp-contextengineering/README.md)  
- [MCP Specification Changelog](https://spec.modelcontextprotocol.io/)  

---

## അധിക വിഭവങ്ങൾ

- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [JSON-RPC 2.0 Error Codes](https://www.jsonrpc.org/specification#error_object)  
- [Python SDK Examples](https://github.com/modelcontextprotocol/python-sdk/tree/main/examples)  
- [TypeScript SDK Examples](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അസാധുചിന്തനം**:  
ഈ പ്രമാണം AI വിവർത്തന സേവനമായ [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് വിവർത്തനം ചെയ്തതാണ്. നിഗമനക്ഷമതയ്ക്ക് നാം ശ്രമിക്കുന്നുവെങ്കിലും, സ്വയമാറ്റ വിവർത്തനങ്ങളിൽ തെറ്റുകൾ അല്ലെങ്കിൽ അച്ചടക്കഭേദങ്ങൾ ഉണ്ടാകാമെന്ന കാര്യം ശ്രദ്ധിക്കുക. അതിന്റെ മാതൃഭാഷയായ મૂળ പ്രമാണം സത്യസന്ധമായ ഉറവിടമാണ് എന്ന് പരിഗണിക്കേണ്ടതാണ്. നിർണായക വിവരംക്കായി, പ്രൊഫഷണൽ മാനവ വിവർത്തനം നിവേദനമാണ്. ഈ വിവർത്തനത്തിന്റെ ഉപയോഗത്തിൽ നിന്നുണ്ടാകുന്ന ഏതെങ്കിലും തർക്കങ്ങൾക്കും തെറ്റുപറയലുകൾക്കും നാം ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->