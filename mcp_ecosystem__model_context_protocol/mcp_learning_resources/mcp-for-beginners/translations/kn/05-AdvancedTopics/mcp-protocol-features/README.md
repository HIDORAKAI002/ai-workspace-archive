# MCP ಪ್ರೋಟೋಕಾಲ್ ವೈಶಿಷ್ಟ್ಯಗಳ ಆಳವಾಗಿ ಪರಿಶೀಲನೆ

ಈ ಮಾರ್ಗದರ್ಶಕವು ಮೂಲೋಪಯೋಗಿ ಉಪಕರಣ ಮತ್ತು ಸಂಪನ್ಮೂಲ ಸಂಸ್ಕರಣೆಯನ್ನು ಮೀರಿದ ಆಧುನಿಕ MCP ಪ್ರೋಟೋಕಾಲ್ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸುತ್ತದೆ. ಈ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಮೂಲಕ ನೀವು ಹೆಚ್ಚು ಸದೃಢ, ಬಳಕೆದಾರ ಸ್ನೇಹಿ ಮತ್ತು ಉತ್ಪಾದನಾ ಸಿದ್ಧ MCP ಸರ್ವರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸಬಹುದು.

## ಒಳಗೊಂಡ ವೈಶಿಷ್ಟ್ಯಗಳು

1. **ಪ್ರಗತಿ ಸೂಚನೆಗಳು** - ದೀರ್ಘಕಾಲೀನ ಕಾರ್ಯಗಳ ಪ್ರಗತಿಯನ್ನು ವರದಿ ಮಾಡುವುದು
2. **ವಿನಂತಿ ರದ್ದುಪಡಿಸುವಿಕೆ** - ಗ್ರಾಹಕರು ಪ್ರಸ್ತುತ ಇರುವ ವಿನಂತಿಗಳನ್ನು ರದ್ದುಪಡಿಸಲು ಅನುಮತಿಸುವುದು
3. **ಸಂಪನ್ಮೂಲ ಟೆಂಪ್ಲೇಟುಗಳು** - ಪ್ಯಾರಾಮೀಟರ್‌ಗಳೊಂದಿಗೆ ಡೈನಾಮಿಕ್ ಸಂಪನ್ಮೂಲ URIಗಳು
4. **ಸರ್ವರ್ ಜೀವನಚಕ್ರ ಘಟನೆಗಳು** - ಸರಿಯಾದ ಆರಂಭ ಮತ್ತು ಶಟ್‌ಡೌನ್
5. **ಲಾಗಿಂಗ್ ನಿಯಂತ್ರಣ** - ಸರ್ವರ್‌ಗಡ್ಡೆ ಲಾಗ್‌ಗಳನ್ನು ಸಂರಚಿಸುವಿಕೆ
6. **ದೋಷ ನಿರ್ವಹಣಾ ಮಾದರಿಗಳು** - ಸತತ ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಗಳು

---

## 1. ಪ್ರಗತಿ ಸೂಚನೆಗಳು

ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುವ ಕಾರ್ಯಗಳಿಗಾಗಿ (ಡೇಟಾ ಪ್ರಕ್ರಿಯೆ, ಫೈಲ್ ಡೌನ್‌ಲೋಡ್, API ಕರೆಗಳು), ಪ್ರಗತಿ ಸೂಚನೆಗಳು ಬಳಕೆದಾರರನ್ನು ಮಾಹಿತಿ ನೀಡುತ್ತವೆ.

### ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/call (ದೀರ್ಘ ಕಾರ್ಯಾಚರಣೆ)
    Server-->>Client: ಸೂಚನೆ: ಪ್ರಗತಿ 10%
    Server-->>Client: ಸೂಚನೆ: ಪ್ರಗತಿ 50%
    Server-->>Client: ಸೂಚನೆ: ಪ್ರಗತಿ 90%
    Server->>Client: ಫಲಿತಾಂಶ (ಸಂಪೂರ್ಣ)
```
### ಪೈಥಾನ್ ಅನುಷ್ಠಾನ

```python
from mcp.server import Server, NotificationOptions
from mcp.types import ProgressNotification
import asyncio

app = Server("progress-server")

@app.tool()
async def process_large_file(file_path: str, ctx) -> str:
    """Process a large file with progress updates."""
    
    # ಪ್ರಗತಿ ಲೆಕ್ಕಾಚಾರಕ್ಕಾಗಿ ಫೈಲ್ ಗಾತ್ರವನ್ನು ಪಡೆಯಿರಿ
    file_size = os.path.getsize(file_path)
    processed = 0
    
    with open(file_path, 'rb') as f:
        while chunk := f.read(8192):
            # ತುಂಡನ್ನು ಪ್ರಕ್ರಿಯೋಜಿಸಿ
            await process_chunk(chunk)
            processed += len(chunk)
            
            # ಪ್ರಗತಿ ತಿಳಿಸುವಿಕೆ ಕಳುಹಿಸಿ
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
        
        # ஒவ்வொரு ಐಟಮ್ ನಂತರವೂ ಪ್ರಗತಿಯನ್ನು ವರದಿ ಮಾಡಿ
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

### ಟೈಪ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಅನುಷ್ಠಾನ

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
      
      // ಪ್ರಗತಿ ಸೂಚನೆ ಕಳುಹಿಸಿ
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

### ಗ್ರಾಹಕ ಸಂಸ್ಕರಣೆ (ಪೈಥಾನ್)

```python
async def handle_progress(notification):
    """Handle progress notifications from server."""
    params = notification.params
    print(f"Progress: {params.progress}/{params.total} - {params.message}")

# ಹ್ಯಾಂಡ್ಲರ್ ಅನ್ನು ನೋಂದಾಯಿಸಿ
session.on_notification("notifications/progress", handle_progress)

# ಸಾಧನವನ್ನು ಕರೆಮಾಡಿ (ಪ್ರಗತಿಯ ನವೀಕರಣಗಳು ಹ್ಯಾಂಡ್ಲರ್ ಮೂಲಕ ಬರುವವು)
result = await session.call_tool("process_large_file", {"file_path": "/data/large.csv"})
```

---

## 2. ವಿನಂತಿ ರದ್ದುಪಡಿಸುವಿಕೆ

ಈಗ ಆಗಾಗ ಅಗತ್ಯವಿಲ್ಲದ ಅಥವಾ ತುಂಬಾ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿರುವ ವಿನಂತಿಗಳನ್ನು ಗ್ರಾಹಕರು ರದ್ದುಪಡಿಸಲು ಅನುಮತಿಸಿ.

### ಪೈಥಾನ್ ಅನುಷ್ಠಾನ

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
        for page in range(100):  # ಹಲವು ಪುಟಗಳಲ್ಲಿ ಹುಡುಕಿ
            # ರದ್ದು ಮಾಡಲಾಗಿದೆಯೆಂದು ಪರಿಶೀಲಿಸಿ
            if ctx.is_cancelled:
                raise CancelledError("Search cancelled by user")
            
            # ಪುಟ ಹುಡುಕುವ ನಕಲಿ ಅನುಕರಣೆ
            page_results = await search_page(query, page)
            results.extend(page_results)
            
            # ಸಣ್ಣ ವಿಳಂಬ ರದ್ದುಪಡಿಸುವಿಕೆ ಪರಿಶೀಲಿಸಲು ಅನುಮತಿಸುತ್ತದೆ
            await asyncio.sleep(0.1)
            
    except CancelledError:
        # ಭಾಗಶಃ ಫಲಿತಾಂಶಗಳನ್ನು ನೀಡು
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

### ರದ್ದುಪಡಿಸುವ ಪ_contextು ಅನುಷ್ಠಾನ

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
            pass  # ಸಾಮಾನ್ಯ ಸಮಯ ಮಿತಿಯು, ಮುಂದುವರೆಯಿರಿ
```

### ಗ್ರಾಹಕ-ಪಾರ್ಶ್ವ ರದ್ದುಪಡಿಸುವಿಕೆ

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
        # ವಿನಂತಿ ರದ್ದುಪಡಿಸಿ
        await session.send_notification({
            "method": "notifications/cancelled",
            "params": {"requestId": task.request_id, "reason": "Timeout"}
        })
        return "Search timed out"
```

---

## 3. ಸಂಪನ್ಮೂಲ ಟೆಂಪ್ಲೇಟುಗಳು

ಸಂಪನ್ಮೂಲ ಟೆಂಪ್ಲೇಟುಗಳು ಪ್ಯಾರಾಮೀಟರ್‌ಗಳೊಂದಿಗೆ ಡೈನಾಮಿಕ್ URI ನಿರ್ಮಾಣಕ್ಕೆ ಅನುಕೂಲವಾಗುತ್ತವೆ, APIಗಳು ಮತ್ತು ಡೇಟಾಬೇಸ್‌ಗಳಿಗೆ ಉಪಯುಕ್ತ.

### ಟೆಂಪ್ಲೇಟು ನಿರ್ಧಾರ

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
    
    # ಪ್ಯಾರامیಟರ್‌ಗಳನ್ನು ತೆಗೆಯಲು URI ಅನ್ನು ವಿಶ್ಲೇಷಿಸಿ
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

### ಟೈಪ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಅನುಷ್ಠಾನ

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
  
  // GitHub ಸಮಸ್ಯೆ URI ವಿಲಕ್ಷಣಗೊಳಿಸಿ
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

## 4. ಸರ್ವರ್ ಜೀವನಚಕ್ರ ಘಟನೆಗಳು

ಸರಿಯಾದ ಆರಂಭ ಮತ್ತು ಶಟ್‌ಡೌನ್ ನಿರ್ವಹಣೆುವಿಕೆ ಶುದ್ಧ ಸಂಪನ್ಮೂಲ ನಿರ್ವಹಣೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.

### ಪೈಥಾನ್ ಜೀವನಚಕ್ರ ನಿರ್ವಹಣೆ

```python
from mcp.server import Server
from contextlib import asynccontextmanager

app = Server("lifecycle-server")

# ಹಂಚಿಕೊಂಡ ರಾಜ್ಯ
db_connection = None
cache = None

@asynccontextmanager
async def lifespan(server: Server):
    """Manage server lifecycle."""
    global db_connection, cache
    
    # ಪ್ರಾರಂಭ
    print("🚀 Server starting...")
    db_connection = await create_database_connection()
    cache = await create_cache_client()
    print("✅ Resources initialized")
    
    yield  # ಸರ್ವರ್ ಇಲ್ಲಿ ನಡೆಯುತ್ತದೆ
    
    # ನಿಶ್ಚೇದ
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

### ಟೈಪ್‌ಸ್ಕ್ರಿಪ್ಟ್ ಜೀವನಚಕ್ರ

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
    // ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪ್ರಾರಂಭಿಸಿ
    console.log("🚀 Server starting...");
    this.dbConnection = await createDatabaseConnection();
    console.log("✅ Database connected");
    
    // ಸರ್ವರ್ ಪ್ರಾರಂಭಿಸಿ
    await this.server.connect(transport);
  }
  
  async stop() {
    // ಸಂಪನ್ಮೂಲಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ
    console.log("🛑 Server shutting down...");
    if (this.dbConnection) {
      await this.dbConnection.close();
    }
    await this.server.close();
    console.log("✅ Cleanup complete");
  }
  
  private setupHandlers() {
    this.server.setRequestHandler(CallToolSchema, async (request) => {
      // ಈ.dbConnection ಅನ್ನು ಸುರക്ഷಿತವಾಗಿ ಬಳಸಿ
      // ...
    });
  }
}

// ಮೃದುವಾಗಿರುವ ಸಮಾಪ್ತಿಯೊಂದಿಗೆ ಬಳಕೆ
const server = new ManagedServer();

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});

await server.start();
```

---

## 5. ಲಾಗಿಂಗ್ ನಿಯಂತ್ರಣ

MCP ಸರ್ವರ್-ಪಾರ್ಶ್ವ ಲಾಗಿಂಗ್ ತಳಿಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ, ಜಾವಿಸುವವರಿಗೆ ನಿಯಂತ್ರಣವನ್ನು ನೀಡುತ್ತದೆ.

### ಲಾಗಿಂಗ್ ಲೆವೆಲ್‌ಗಳ ಅನುಷ್ಠಾನ

```python
from mcp.server import Server
from mcp.types import LoggingLevel
import logging

app = Server("logging-server")

# MCP ಮಟ್ಟಗಳನ್ನು Python ಲಾಗಿಂಗ್ ಮಟ್ಟಗಳಿಗೆ ನಕ್ಷೆ ಮಾಡಿರಿ
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

### ಗ್ರಾಹಕರಿಗೆ ಲಾಗ್ ಸಂದೇಶಗಳನ್ನು ಕಳುಹಿಸುವಿಕೆ

```python
@app.tool()
async def complex_operation(input: str, ctx) -> str:
    """Operation that logs to client."""
    
    # ಲಾಗ್ уведомನೆ ಗ್ರಾಹಕ에게 ಕಳುಹಿಸಿ
    await ctx.send_log(
        level="info",
        message=f"Starting complex operation with input: {input}"
    )
    
    # ಕೆಲಸ ಮಾಡಿ...
    result = await do_work(input)
    
    await ctx.send_log(
        level="debug",
        message=f"Operation complete, result size: {len(result)}"
    )
    
    return result
```

---

## 6. ದೋಷ ನಿರ್ವಹಣಾ ಮಾದರಿಗಳು

ಸತತ ದೋಷ ನಿರ್ವಹಣೆ ದೋಷಗಳಿಂದ ಪತ್ತೆಹಚ್ಚುವಿಕೆ ಮತ್ತು ಬಳಕೆದಾರ ಅನುಭವವನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.

### MCP ದೋಷ ಕೋಡ್‌ಗಳು

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

### ರಚಿತ ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಗಳು

```python
@app.tool()
async def safe_operation(input: str) -> str:
    """Tool with comprehensive error handling."""
    
    # ಇನ್‌ಪುಟ್ ಅವರನ್ನು ಪರಿಶೀಲಿಸಿ
    if not input:
        raise ValidationError("Input cannot be empty")
    
    if len(input) > 10000:
        raise ValidationError(f"Input too large: {len(input)} chars (max 10000)")
    
    try:
        # ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ
        if not await check_permission(input):
            raise PermissionError(f"read {input}")
        
        # ಕಾರ್ಯಾಚರಣೆ ಮಾಡಿ
        result = await perform_operation(input)
        
        if result is None:
            raise NotFoundError(input)
        
        return result
        
    except ConnectionError as e:
        raise InternalError(f"Database connection failed: {e}")
    except TimeoutError as e:
        raise InternalError(f"Operation timed out: {e}")
    except Exception as e:
        # ಅಪ್ರತೀಕ್ಷಿತ ದೋಷಗಳನ್ನು ಲಾಗ್ ಮಾಡಿ
        logger.exception(f"Unexpected error in safe_operation")
        raise InternalError(f"Unexpected error: {type(e).__name__}")
```

### ಟೈಪ್‌ಸ್ಕ್ರಿಪ್ಟ್‌ನಲ್ಲಿ ದೋಷ ನಿರ್ವಹಣೆ

```typescript
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

function validateInput(data: unknown): asserts data is ValidInput {
  if (typeof data !== "object" || data === null) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Input must be an object"
    );
  }
  // ಇನ್ನಷ್ಟು ಮಾನ್ಯತೆ...
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
      throw error;  // ಈಗಾಗಲೇ MCP ದೋಷ
    }
    
    // ಇತರೆ ದೋಷಗಳನ್ನು ಪರಿವರ್ತಿಸಿ
    if (error instanceof NotFoundError) {
      throw new McpError(ErrorCode.InvalidRequest, error.message);
    }
    
    // ಅನಾನ್ಯ ದೋಷ
    console.error("Unexpected error:", error);
    throw new McpError(
      ErrorCode.InternalError,
      "An unexpected error occurred"
    );
  }
});
```

---

## ಪ್ರಾಯೋಗಿಕ ವೈಶಿಷ್ಟ್ಯಗಳು (MCP 2025-11-25)

ಈ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ವಿವರಣೆಯಲ್ಲಿ ಪ್ರಾಯೋಗಿಕವೆಂದು ಗುರುತಿಸಲಾಗಿದೆ:

### ಕಾರ್ಯಗಳು (ದೀರ್ಘಕಾಲೀನ ಕಾರ್ಯಗಳು)

```python
# ಕಾರ್ಯಗಳು ಸ್ಥಿತಿಯೊಂದಿಗೆ ದೀರ್ಘಕಾಲ ನಡೆಯುವ ಕಾರ್ಯಗಳನ್ನು ಹಿಮ್ಮೇಳಿಸುವಂತೆ ಮಾಡುತ್ತವೆ
@app.task()
async def training_task(model_id: str, data_path: str, ctx) -> str:
    """Long-running ML training task."""
    
    # ಕಾರ್ಯ ಆರಂಭವಾಯ್ತು ಎಂದು ವರದಿ ಮಾಡಿ
    await ctx.report_status("running", "Initializing training...")
    
    # ತರಬೇತಿ ಲೂಪ್
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

### ಉಪಕರಣ ಟಿಪ್ಪಣಿಗಳು

```python
# ಟೂಲಿನ ವರ್ತನೆಗುರಿಹಿತ ಮಾಹಿತಿಯನ್ನು ನೀಡುತ್ತದೆ
@app.tool(
    annotations={
        "destructive": False,      # ಡೇಟಾವನ್ನು ಬದಲಾಯಿಸುವುದಿಲ್ಲ
        "idempotent": True,        # ಮರುಪ್ರಯತ್ನಿಸುವುದು ಸುರಕ್ಷಿತ
        "timeout_seconds": 30,     # ನಿರೀಕ್ಷಿತ ಗರಿಷ್ಠ ಅವಧಿ
        "requires_approval": False # ಬಳಕೆದಾರ ಅನುಮೋದನೆ ಅಗತ್ಯವಿಲ್ಲ
    }
)
async def safe_query(query: str) -> str:
    """A read-only database query tool."""
    return await execute_read_query(query)
```

---

## ಮುಂದಿನದು ಏನು

- [ಮಾಡ್ಯೂಲ್ 8 - ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು](../../08-BestPractices/README.md)
- [5.14 - ಸಾಂದರ್ಭಿಕ ಇಂಜಿನೀಯರಿಂಗ್](../mcp-contextengineering/README.md)
- [MCP ನಿರ್ದಿಷ್ಟತೆ ಚೇಂಜ್‌ಲಾಗ್](https://spec.modelcontextprotocol.io/)

---

## ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳು

- [MCP ನಿರ್ದಿಷ್ಟತೆ 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 ದೋಷ ಕೋಡ್‌ಗಳು](https://www.jsonrpc.org/specification#error_object)
- [ಪೈಥಾನ್ SDK ಉದಾಹರಣೆಗಳು](https://github.com/modelcontextprotocol/python-sdk/tree/main/examples)
- [ಟೈಪ್‌ಸ್ಕ್ರಿಪ್ಟ್ SDK ಉದಾಹರಣೆಗಳು](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ತ್ಯಜ್ಯಾನುಬಂಧ**:  
ಈ ದಾಖಲೆವನ್ನು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯಿಗಾಗಿ ಪ್ರಯತ್ನಿಸುವದರೂ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ತಪ್ಪುಗಳು ಅಥವಾ ತಪ್ಪು ಅರ್ಥಗಳು ಇರಬಹುದು ಎಂದು ದಯವಿಟ್ಟು ಗಮನಿಸಿ. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲದಾಖಲೆ ಅನ್ನು ಅಧಿಕೃತ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮನುಷ್ಯ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ. ಈ ಅನುವಾದದ ಬಳಕೆಯಿಂದ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಗ್ರಹಿಕೆಗಳು ಅಥವಾ ಅರ್ಥ ಬದಲಾವಣೆಗಳಿಗೆ ನಾವು ಹೊಣೆಗಾರರಾಗಿರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->