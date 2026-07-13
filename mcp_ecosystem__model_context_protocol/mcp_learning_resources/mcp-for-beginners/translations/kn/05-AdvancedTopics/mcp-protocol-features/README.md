# MCP ಪ್ರೋಟೋಕಾಲ್ ವೈಶಿಷ್ಟ್ಯಗಳ ಗಂಭೀರ ವಿಮರ್ಶೆ

ಈ ಮಾರ್ಗದರ್ಶಿಕೆ ಮೂಲ ಉಪಕರಣ ಮತ್ತು ಸಂಪನ್ಮೂಲ ನಿರ್ವಹಣೆಯನ್ನು ಮೀರುತ್ತಿರುವ ಉನ್ನತ MCP ಪ್ರೋಟೋಕಾಲ್ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸುತ್ತದೆ. ಈ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಮೂಲಕ ನೀವು ಹೆಚ್ಚು ಬಲಿಷ್ಠ, ಬಳಕೆದಾರ ಸ್ನೇಹಿ ಮತ್ತು ಉತ್ಪಾದನೆ-ತಯಾರ MCP ಸರ್ವರ್‌ಗಳನ್ನು ನಿರ್ಮಿಸಬಹುದು.

> **ಮುಂದಿನ ದೃಷ್ಟಿ:** `2026-07-28` ಬಿಡುಗಡೆ ಅಭ್ಯರ್ಥಿ ಲಾಗಿಂಗ್ ಪ್ರಿಮಿಟಿವ್ ಅನ್ನು ನಿಷೇಧಿಸುತ್ತದೆ (stdio ಗಾಗಿ `stderr` ಮತ್ತು ರಚನೆ ಮಾಡಿದ ಅವಲೋಕನಕ್ಕೆ OpenTelemetry ಯನ್ನು ಪ್ರಾಥಮ್ಯ ನೀಡುತ್ತದೆ), ಕೆಳಗಿನ Server Lifecycle Events ನಲ್ಲಿ ಸೂಚಿಸಲಾದ `initialize`/ಸೆಷನ್ ಮಾದರಿಯನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ, ಮತ್ತು ಪ್ರಯೋಗಾತ್ಮಕ Tasks ವೈಶಿಷ್ಟ್ಯವನ್ನು ಹೊಸ `tasks/get`/`tasks/update`/`tasks/cancel` ಲೈಫ್‌ಸೈಕಲ್ ಹೊಂದಿರುವ ನಿಗದಿತ Tasks ವಿಸ್ತಾರದಲ್ಲಿ ವರ್ಗಾಯಿಸುತ್ತದೆ. ನೋಡಿ [MCP ನಲ್ಲಿ ಏನು ಬದಲಾಗುತ್ತಿದೆ: 2026-07-28 ಬಿಡುಗಡೆ ಅಭ್ಯರ್ಥಿ](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## ಒಳಗೊಂಡಿರುವ ವೈಶಿಷ್ಟ್ಯಗಳು

1. **ಪ್ರಗತಿ ಅಣಕಗಳು** - ದೀರ್ಘಗಾಮಿ ಕಾರ್ಯಗಳಿಗೆ ಪ್ರಗತಿಯ ವರದಿ
2. **ವಿನಂತಿ ರದ್ದು ಮಾಡುವುದು** - ಗ್ರಾಹಕರು ಪ್ರಗತಿಯಲ್ಲಿ ಇರುವ ವಿನಂತಿಗಳನ್ನು ರದ್ದುಮಾಡಿಕೊಳ್ಳಲು ಅವಕಾಶ
3. **ಸಂಪನ್ಮೂಲ ಟೆಂಪ್ಲೇಟುಗಳು** - ಪರಿಮಾಣಗಳೊಂದಿಗೆ ಗತಿಶೀಲ URI ಗಳು
4. **ಸರ್ವರ್ ಲೈಫ್‌ಸೈಕಲ್ ಘಟನೆಗಳು** - ಸೂಕ್ತ ಆರಂಭ ಮತ್ತು ಶಟ್ಡೌನ್
5. **ಲಾಗಿಂಗ್ ನಿಯಂತ್ರಣ** - ಸರ್ವರ್-ಪಕ್ಷ ಲಾಗಿಂಗ್ ಸಂರಚನೆ
6. **ದೋಷ ನಿರ್ವಹಣಾ ನಕ್ಷೆಗಳು** - ಸಹಜ ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಗಳು

---

## 1. ಪ್ರಗತಿ ಅಣಕಗಳು

ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುವ ಕಾರ್ಯಗಳಿಗಾಗಿ (ಡೇಟಾ ಪ್ರಕ್ರಿಯೆ, ಫೈಲ್ ಡೌನ್‌ಲೋಡ್‌ಗಳು, API ಕರೆಗಳು), ಪ್ರಗತಿ ಅಣಕಗಳು ಬಳಕೆದಾರರನ್ನು ಮಾಹಿತಿ ನೀಡುತ್ತವೆ.

### ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/call (ದೀರ್ಘ ಪ್ರಕ್ರಿಯೆ)
    Server-->>Client: ಸೂಚನೆ: ಪ್ರಗತಿ 10%
    Server-->>Client: ಸೂಚನೆ: ಪ್ರಗತಿ 50%
    Server-->>Client: ಸೂಚನೆ: ಪ್ರಗತಿ 90%
    Server->>Client: ಫಲಿತಾಂಶ (ಪೂರ್ಣವಾಗಿದೆ)
```

### ಪೈಥಾನ್ ಜಾರಿಗೊಳಿಸಲಾಗುತ್ತಿದೆ

```python
from mcp.server import Server, NotificationOptions
from mcp.types import ProgressNotification
import asyncio

app = Server("progress-server")

@app.tool()
async def process_large_file(file_path: str, ctx) -> str:
    """Process a large file with progress updates."""
    
    # ಪ್ರಗತಿ ಲెక్కಿಸಲು ಕಡತ ಗಾತ್ರವನ್ನು ಪಡೆಯಿರಿ
    file_size = os.path.getsize(file_path)
    processed = 0
    
    with open(file_path, 'rb') as f:
        while chunk := f.read(8192):
            # ಭಾಗವನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಿ
            await process_chunk(chunk)
            processed += len(chunk)
            
            # ಪ್ರಗತಿ ಸೂಚನೆಯನ್ನು ಕಳುಹಿಸಿ
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
        
        # ಪ್ರತಿ ಐಟಮ್ ನಂತರ ಪ್ರಗತಿಯನ್ನು ವರದಿ ಮಾಡಿ
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

### ಟೈಪ್ಸ್ಕ್ರಿಪ್ಟ್ ಜಾರಿಗೊಳಿಸಲಾಗುತ್ತಿದೆ

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
      
      // ಪ್ರಗತಿ ಸೂಚನೆಯನ್ನು ಕಳುಹಿಸಿ
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

### ಕ್ಲೈಂಟ್ ನಿರ್ವಹಣೆ (ಪೈಥಾನ್)

```python
async def handle_progress(notification):
    """Handle progress notifications from server."""
    params = notification.params
    print(f"Progress: {params.progress}/{params.total} - {params.message}")

# ಹ್ಯಾಂಡ್ಲರ್ ಅನ್ನು ನೋಂದಾಯಿಸಿ
session.on_notification("notifications/progress", handle_progress)

# ಉಪಕರಣವನ್ನು ಕರೆಮಾಡಿ (ಪ್ರಗತಿ تازهಗೀಕರು ಹ್ಯಾಂಡ್ಲರ್ ಮೂಲಕ ಬರುತ್ತವೆ)
result = await session.call_tool("process_large_file", {"file_path": "/data/large.csv"})
```

---

## 2. ವಿನಂತಿ ರದ್ದು ಮಾಡುವುದು

ಇನ್ನುಬಳಸದೆ ಇರುವ ಅಥವಾ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತಿರುವ ವಿನಂತಿಗಳನ್ನು ಗ್ರಾಹಕರು ರದ್ದುಮಾಡಿಕೊಳ್ಳಲು ಅವಕಾಶ ನೀಡಿ.

### ಪೈಥಾನ್ ಜಾರಿಗೊಳಿಸಲಾಗುತ್ತಿದೆ

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
        for page in range(100):  # ಅನೇಕ ಪುಟಗಳನ್ನು ಹುಡುಕಿ
            # ರದ್ದುಪಡಿಸುವಿಕೆ ವಿನಂತಿಯಾಗಿದೆ ಎಂದು ಪರಿಶೀಲಿಸಿ
            if ctx.is_cancelled:
                raise CancelledError("Search cancelled by user")
            
            # ಪುಟ ಹುಡುಕುವಿಕೆ ಆವರಣಿಸು
            page_results = await search_page(query, page)
            results.extend(page_results)
            
            # ಸಣ್ಣ ವಿಳಂಬವು ರದ್ದುಪಡಿಸುವಿಕೆ ಪರಿಶೀಲನೆಗೆ ಅವಕಾಶ ನೀಡುತ್ತದೆ
            await asyncio.sleep(0.1)
            
    except CancelledError:
        # ಭಾಗಿಕ ಫಲಿತಾಂಶಗಳನ್ನು ಹಿಂತಿರುಗಿಸಿ
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

### ರದ್ದುಪಡಿಸುವ ಪ್ರಾಸಂಗಿಕತೆಯನ್ನು ಜಾರಿಗೊಳಿಸುವುದು

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
            pass  # ಸಾಮಾನ್ಯ ಸಮಯ ಮುಗಿದಿದೆ, ಮುಂದುವರಿಸಿ
```

### ಕ್ಲೈಂಟ್-ಪಕ್ಷ ರದ್ದು

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
        # ವಿನಂತಿ ರದ್ದುಗೊಳಿಸುವಿಕೆ
        await session.send_notification({
            "method": "notifications/cancelled",
            "params": {"requestId": task.request_id, "reason": "Timeout"}
        })
        return "Search timed out"
```

---

## 3. ಸಂಪನ್ಮೂಲ ಟೆಂಪ್ಲೇಟುಗಳು

ಸಂಪನ್ಮೂಲ ಟೆಂಪ್ಲೇಟುಗಳು ಪರಿಮಾಣಗಳೊಂದಿಗೆ ಗತಿಶೀಲ URI ನಿರ್ಮಾಣಕ್ಕೆ ಅವಕಾಶ ನೀಡುತ್ತವೆ, API ಗಳಿಗಾಗಿ ಮತ್ತು ಡೇಟಾಬೇಸ್ ಗಳಿಗಾಗಿ ಉಪಯುಕ್ತ.

### ಟೆಂಪ್ಲೇಟುಗಳನ್ನು ನಿರ್ಧರಿಸುವುದು

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
    
    # URI ಅನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಪರಿಮಾಣಗಳನ್ನು ಹೊರತೆಗೆಯಲು
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

### ಟೈಪ್ಸ್ಕ್ರಿಪ್ಟ್ ಜಾರಿಗೊಳಿಸಲಾಗುತ್ತಿದೆ

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
  
  // GitHub ಸಮಸ್ಯೆಯ URI ಅನ್ನು ಪಾರ್ಸ್ ಮಾಡಿ
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

## 4. ಸರ್ವರ್ ಲೈಫ್‌ಸೈಕಲ್ ಘಟನೆಗಳು

ಸೂಕ್ತ ಆರಂಭ ಮತ್ತು ಶಟ್ಡೌನ್ ನಿರ್ವಹಣೆ ಸ್ವಚ್ಛ ಸಂಪನ್ಮೂಲ ನಿರ್ವಹಣೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.

### ಪೈಥಾನ್ ಲೈಫ್‌ಸೈಕಲ್ ನಿರ್ವಹಣೆ

```python
from mcp.server import Server
from contextlib import asynccontextmanager

app = Server("lifecycle-server")

# ಹಂಚಿಕೆ ಹೊಂದಿದ ಸ್ಥಿತಿ
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
    
    yield  # ಸರ್ವರ್ ಇಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ
    
    # ನಿಲ್ಲಿಸುವುದು
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

### ಟೈಪ್ಸ್ಕ್ರಿಪ್ಟ್ ಲೈಫ್‌ಸೈಕಲ್

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
    // ಸಂಪನ್ಮೂಲಗಳನ್ನು ಆರಂಭಿಸಿ
    console.log("🚀 Server starting...");
    this.dbConnection = await createDatabaseConnection();
    console.log("✅ Database connected");
    
    // ಸರ್ವರ್ ಪ್ರಾರಂಭಿಸಿ
    await this.server.connect(transport);
  }
  
  async stop() {
    // ಸಂಪನ್ಮೂಲಗಳನ್ನು ಶುದ್ಧೀಕರಿಸಿ
    console.log("🛑 Server shutting down...");
    if (this.dbConnection) {
      await this.dbConnection.close();
    }
    await this.server.close();
    console.log("✅ Cleanup complete");
  }
  
  private setupHandlers() {
    this.server.setRequestHandler(CallToolSchema, async (request) => {
      // ಈ.dbConnection ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಬಳಸಿ
      // ...
    });
  }
}

// ಸೌಮ್ಯ ಶಟ್ಡೌನ್ೊಂದಿಗೆ ಬಳಕೆ
const server = new ManagedServer();

process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});

await server.start();
```

---

## 5. ಲಾಗಿಂಗ್ ನಿಯಂತ್ರಣ

MCP ಗೃಹಪಕ್ಷ ಲಾಗಿಂಗ್ ಮಟ್ಟಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ, ಅವನ್ನು ಗ್ರಾಹಕರು ನಿಯಂತ್ರಿಸಬಹುದು.

### ಲಾಗಿಂಗ್ ಮಟ್ಟಗಳನ್ನು ಜಾರಿಗೊಳಿಸುವುದು

```python
from mcp.server import Server
from mcp.types import LoggingLevel
import logging

app = Server("logging-server")

# MCP ಮಟ್ಟಗಳನ್ನು Python لاگಿಂಗ್ ಮಟ್ಟಗಳಿಗೆ ನಕ್ಷೆಮಾಡಿ
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

### ಗ್ರಾಹಕರಿಗೆ ಲಾಗ್ ಸಂದೇಶಗಳನ್ನು ಕಳುಹಿಸುವುದು

```python
@app.tool()
async def complex_operation(input: str, ctx) -> str:
    """Operation that logs to client."""
    
    # ಕ್ಲೈಂಟ್‌ಗೆ ಲಾಗ್ ನೋಟಿಫಿಕೇಶನ್ ಕಳುಹಿಸಿ
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

## 6. ದೋಷ ನಿರ್ವಹಣಾ ನಕ್ಷೆಗಳು

ಸಹಜ ದೋಷ ನಿರ್ವಹಣೆಯು ಡಿಬಗ್ಗಿಂಗ್ ಮತ್ತು ಬಳಕೆದಾರ ಅನುಭವವನ್ನು ಸುಧಾರಿಸುತ್ತದೆ.

### MCP ದೋಷ ಕೋಡ್ಗಳು

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

### ರಚನೆ ಮಾಡಿದ ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಗಳು

```python
@app.tool()
async def safe_operation(input: str) -> str:
    """Tool with comprehensive error handling."""
    
    # ಇನ್‌ಪುಟ್ ಅನ್ನು ಮಾನ್ಯೀಕರಿಸಿ
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
        # ಅನपेक्षित ದೋಷಗಳನ್ನು ಲಾಗ್ ಮಾಡಿ
        logger.exception(f"Unexpected error in safe_operation")
        raise InternalError(f"Unexpected error: {type(e).__name__}")
```

### ಟೈಪ್ಸ್ಕ್ರಿಪ್ಟ್ ನಲ್ಲಿ ದೋಷ ನಿರ್ವಹಣೆ

```typescript
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

function validateInput(data: unknown): asserts data is ValidInput {
  if (typeof data !== "object" || data === null) {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Input must be an object"
    );
  }
  // ಹೆಚ್ಚು ಮಾನ್ಯತೆ...
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
    
    // ಅಜ್ಞಾನ ದೋಷ
    console.error("Unexpected error:", error);
    throw new McpError(
      ErrorCode.InternalError,
      "An unexpected error occurred"
    );
  }
});
```

---

## ಪ್ರಯೋಗಾತ್ಮಕ ವೈಶಿಷ್ಟ್ಯಗಳು (MCP 2025-11-25)

ಈ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ನಿರ್ದಿಷ್ಟಿಸುವ ಸಂದರ್ಭದಲ್ಲಿ ಪ್ರಯೋಗಾತ್ಮಕವೆಂದು ಗುರುತಿಸಲಾಗಿದೆ:

### ಕಾರ್ಯಗಳು (ದೀರ್ಘಗಾಮಿ ಕಾರ್ಯಗಳು)

```python
# ಕಾರ್ಯಗಳು ಸ್ಥಿತಿಯೊಂದಿಗೆ ದೀರ್ಘಾವಧಿಯ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಅನುಮತಿಸುತ್ತವೆ
@app.task()
async def training_task(model_id: str, data_path: str, ctx) -> str:
    """Long-running ML training task."""
    
    # ಕಾರ್ಯ ಪ್ರಾರಂಭವಾಯಿತು ಎಂದು ವರದಿ ಮಾಡಿ
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

### ಉಪಕರಣ ಗುರುತುಗಳು

```python
# ಉಪಕರಣದ ನಡವಳಿಕೆ ಬಗ್ಗೆ ಮೆಟಾಡೇಟಾವನ್ನು ಕೊಡುತ್ತದೆ
@app.tool(
    annotations={
        "destructive": False,      # ಡೇಟಾವನ್ನು ಬದಲಾಯಿಸುವುದಿಲ್ಲ
        "idempotent": True,        # ಸುರಕ್ಷಿತವಾಗಿ ಪುನಃ ಪ್ರಯತ್ನಿಸಬಹುದು
        "timeout_seconds": 30,     # ನಿರೀಕ್ಷಿತ ಗರಿಷ್ಠ ಅವಧಿ
        "requires_approval": False # ಬಳಕೆದಾರ ಅನುಮತಿಯನ್ನು ಅಗತ್ಯವಿಲ್ಲ
    }
)
async def safe_query(query: str) -> str:
    """A read-only database query tool."""
    return await execute_read_query(query)
```

---

## ಮುಂದೇನು

- [ಅಧ್ಯಾಯ 8 - ಉತ್ತಮ ಆಚಾರಗಳು](../../08-BestPractices/README.md)
- [5.14 - ಸಾಂದರ್ಭಿಕ ಎಂಜಿನಿಯರಿಂಗ್](../mcp-contextengineering/README.md)
- [MCP ವಿಶೇಷಣ ಬದಲಾವಣೆಚರిత్రೆ](https://spec.modelcontextprotocol.io/)

---

## ಹೆಚ್ಚುವರಿ ಸಂಪನ್ಮೂಲಗಳು

- [MCP ವಿಶೇಷಣ 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [JSON-RPC 2.0 ದೋಷ ಕೋಡ್ಗಳು](https://www.jsonrpc.org/specification#error_object)
- [ಪೈಥಾನ್ SDK ಉದಾಹರಣೆಗಳು](https://github.com/modelcontextprotocol/python-sdk/tree/main/examples)
- [ಟೈಪ್ಸ್ಕ್ರಿಪ್ಟ್ SDK ಉದಾಹರಣೆಗಳು](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ಅಸ್ವೀಕಾರ**:
ಈ ದಸ್ತಾವೇಜು AI ಅನುವಾದ ಸೇವೆ [Co-op Translator](https://github.com/Azure/co-op-translator) ಬಳಸಿ ಅನುವಾದಿಸಲಾಗಿದೆ. ನಾವು ನಿಖರತೆಯನ್ನು ಸಾಧಿಸಲು ಪ್ರಯತ್ನಿಸುತ್ತಿದ್ದರೂ, ದಯವಿಟ್ಟು ಗಮನಿಸಿ, ಸ್ವಯಂಚಾಲಿತ ಅನುವಾದಗಳಲ್ಲಿ ದೋಷಗಳು ಅಥವಾ ಅಸಡ್ಡೆಗಳು ಇರಬಹುದು. ಮೂಲ ಭಾಷೆಯಲ್ಲಿರುವ ಮೂಲ ದಸ್ತಾವೇಜು ಪ್ರಾಮಾಣಿಕ ಮೂಲವೆಂದು ಪರಿಗಣಿಸಬೇಕು. ಪ್ರಮುಖ ಮಾಹಿತಿಗಾಗಿ, ವೃತ್ತಿಪರ ಮಾನವ ಅನುವಾದವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಅನುವಾದವನ್ನು ಬಳಸುವ ಮೂಲಕ ಉಂಟಾಗುವ ಯಾವುದೇ ತಪ್ಪು ಅರ್ಥಗಳ ಅಥವಾ ತಪ್ಪು ವ್ಯಾಖ್ಯಾನಗಳ ಬಗ್ಗೆ ನಾವು ಹೊಣೆಗಾರರಲ್ಲ.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->