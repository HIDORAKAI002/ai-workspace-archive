# MCP中的分页和大结果集

当您的MCP服务器处理大型数据集时——无论是列出数千个文件、数据库记录还是搜索结果——您都需要分页来有效管理内存并提供响应快速的用户体验。本指南介绍如何在MCP中实现和使用分页。

## 为什么分页很重要

没有分页，大量响应可能导致：

- **内存耗尽**——一次加载数百万条记录
- **响应时间变慢**——用户等待所有数据加载完成
- **超时错误**——请求超出超时限制
- **AI性能下降**——大型语言模型难以处理庞大的上下文

MCP使用**基于游标的分页**来可靠、一致地遍历结果集。

---

## MCP分页的工作原理

### 游标概念

**游标**是一个不透明字符串，标记您在结果集中的位置。可以把它看作是一本厚书中的书签。

```mermaid
sequenceDiagram
    participant Client
    participant Server
    
    Client->>Server: tools/list （无游标）
    Server-->>Client: 工具 [1-10], nextCursor: "abc123"
    
    Client->>Server: tools/list （游标: "abc123"）
    Server-->>Client: 工具 [11-20], nextCursor: "def456"
    
    Client->>Server: tools/list （游标: "def456"）
    Server-->>Client: 工具 [21-25], nextCursor: null （结束）
```
### MCP方法中的分页

以下MCP方法支持分页：

| 方法 | 返回值 | 游标支持 |
|--------|---------|----------------|
| `tools/list` | 工具定义 | ✅ |
| `resources/list` | 资源定义 | ✅ |
| `prompts/list` | 提示定义 | ✅ |
| `resources/templates/list` | 资源模板 | ✅ |

---

## 服务器端实现

### Python (FastMCP)

```python
from mcp.server import Server
from mcp.types import Tool, ListToolsResult
import math

app = Server("paginated-server")

# 模拟大型数据集
ALL_TOOLS = [
    Tool(name=f"tool_{i}", description=f"Tool number {i}", inputSchema={})
    for i in range(100)
]

PAGE_SIZE = 10

@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    """List tools with pagination support."""
    
    # 解码光标以获取起始索引
    start_index = 0
    if cursor:
        try:
            start_index = int(cursor)
        except ValueError:
            start_index = 0
    
    # 获取当前页结果
    end_index = min(start_index + PAGE_SIZE, len(ALL_TOOLS))
    page_tools = ALL_TOOLS[start_index:end_index]
    
    # 计算下一个光标
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

// 模拟大型数据集
const ALL_TOOLS = Array.from({ length: 100 }, (_, i) => ({
  name: `tool_${i}`,
  description: `Tool number ${i}`,
  inputSchema: { type: "object", properties: {} }
}));

const PAGE_SIZE = 10;

server.setRequestHandler(ListToolsResultSchema, async (request) => {
  // 解码光标
  let startIndex = 0;
  if (request.params?.cursor) {
    startIndex = parseInt(request.params.cursor, 10) || 0;
  }
  
  // 获取结果页
  const endIndex = Math.min(startIndex + PAGE_SIZE, ALL_TOOLS.length);
  const pageTools = ALL_TOOLS.slice(startIndex, endIndex);
  
  // 计算下一个光标
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
        // 初始化大型数据集
        this.allTools = IntStream.range(0, 100)
            .mapToObj(i -> new Tool("tool_" + i, "Tool number " + i, Map.of()))
            .collect(Collectors.toList());
    }
    
    @McpMethod("tools/list")
    public ListToolsResult listTools(@Param("cursor") String cursor) {
        // 解码光标
        int startIndex = 0;
        if (cursor != null && !cursor.isEmpty()) {
            try {
                startIndex = Integer.parseInt(cursor);
            } catch (NumberFormatException e) {
                startIndex = 0;
            }
        }
        
        // 获取结果页面
        int endIndex = Math.min(startIndex + PAGE_SIZE, allTools.size());
        List<Tool> pageTools = allTools.subList(startIndex, endIndex);
        
        // 计算下一个光标
        String nextCursor = endIndex < allTools.size() ? String.valueOf(endIndex) : null;
        
        return new ListToolsResult(pageTools, nextCursor);
    }
}
```

---

## 客户端实现

### Python客户端

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

# 用法
async with client_session as session:
    tools = await get_all_tools(session)
    print(f"Found {len(tools)} tools")
```

### TypeScript客户端

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

// 使用方法
const tools = await getAllTools(client);
console.log(`Found ${tools.length} tools`);
```

### 惰性加载模式

对于非常大的数据集，按需加载页面：

```python
class PaginatedToolIterator:
    """Lazily iterate through paginated tools."""
    
    def __init__(self, session: ClientSession):
        self.session = session
        self.cursor = None
        self.buffer = []
        self.exhausted = False
    
    async def __anext__(self):
        # 如果缓冲区可用则返回
        if self.buffer:
            return self.buffer.pop(0)
        
        # 检查是否已经遍历所有页面
        if self.exhausted:
            raise StopAsyncIteration
        
        # 获取下一页
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

# 用法 - 对大数据集内存高效
async for tool in PaginatedToolIterator(session):
    process_tool(tool)
```

---

## 资源的分页

资源通常需要为目录或大型数据集进行分页：

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
    
    # 解码光标（文件索引）
    start_index = int(cursor) if cursor else 0
    page_size = 20
    end_index = min(start_index + page_size, len(all_files))
    
    # 为此页面创建资源列表
    resources = []
    for filename in all_files[start_index:end_index]:
        filepath = os.path.join(directory, filename)
        resources.append(Resource(
            uri=f"file://{filepath}",
            name=filename,
            mimeType="application/octet-stream"
        ))
    
    # 计算下一个光标
    next_cursor = str(end_index) if end_index < len(all_files) else None
    
    return ListResourcesResult(
        resources=resources,
        nextCursor=next_cursor
    )
```

---

## 游标设计策略

### 策略 1：基于索引（简单）

```python
# 光标只是索引
cursor = "50"  # 从第50个项目开始
```

**优点：** 简单，无状态  
**缺点：** 如果项目被添加或删除，结果可能会偏移

### 策略 2：基于ID（稳定）

```python
# Cursor 是最后看到的ID
cursor = "item_abc123"  # 从此项之后开始
```

**优点：** 即使项目变动也稳定  
**缺点：** 需要有序的ID

### 策略 3：编码状态（复杂）

```python
import base64
import json

def encode_cursor(state: dict) -> str:
    return base64.b64encode(json.dumps(state).encode()).decode()

def decode_cursor(cursor: str) -> dict:
    return json.loads(base64.b64decode(cursor).decode())

# 光标包含多个状态字段
cursor = encode_cursor({
    "offset": 50,
    "filter": "active",
    "sort": "name"
})
```

**优点：** 可以编码复杂状态  
**缺点：** 更复杂，游标字符串较大

---

## 最佳实践

### 1. 选择合适的页面大小

```python
# 考虑数据大小
PAGE_SIZE_SMALL_ITEMS = 100   # 简单的元数据
PAGE_SIZE_MEDIUM_ITEMS = 20   # 更丰富的对象
PAGE_SIZE_LARGE_ITEMS = 5     # 复杂内容
```

### 2. 优雅处理无效游标

```python
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    try:
        start_index = int(cursor) if cursor else 0
        if start_index < 0 or start_index >= len(ALL_TOOLS):
            start_index = 0  # 重置到开始
    except (ValueError, TypeError):
        start_index = 0  # 光标无效，重新开始
    # ...
```

### 3. 包含总计数（可选）

```python
return ListToolsResult(
    tools=page_tools,
    nextCursor=next_cursor,
    # 一些实现包括用于UI进度的总数
    _meta={"total": len(ALL_TOOLS)}
)
```

### 4. 测试边缘情况

```python
async def test_pagination():
    # 结果集为空
    result = await session.list_tools()
    assert result.tools == []
    assert result.nextCursor is None
    
    # 单页
    result = await session.list_tools()
    assert len(result.tools) <= PAGE_SIZE
    
    # 无效的游标
    result = await session.list_tools(cursor="invalid")
    assert result.tools  # 应该返回第一页
```

---

## 常见陷阱

### ❌ 返回所有结果后客户端分页

```python
# 坏：将所有内容加载到内存中
@app.list_tools()
async def list_tools() -> ListToolsResult:
    all_tools = load_all_tools()  # 一百万个工具！
    return ListToolsResult(tools=all_tools)
```

### ✅ 在数据源处进行分页

```python
# 好的：只加载需要的内容
@app.list_tools()
async def list_tools(cursor: str | None = None) -> ListToolsResult:
    offset = int(cursor) if cursor else 0
    tools = await db.query_tools(offset=offset, limit=PAGE_SIZE)
    return ListToolsResult(tools=tools, nextCursor=...)
```

---

## 接下来是什么

- [模块 5.14 - 上下文工程](../../05-AdvancedTopics/mcp-contextengineering/README.md)
- [模块 8 - 最佳实践](../../08-BestPractices/README.md)
- [3.8 - 测试您的MCP服务器](../../03-GettingStarted/08-testing/README.md)

---

## 额外资源

- [MCP规范 - 分页](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [基于游标的分页说明](https://slack.engineering/evolving-api-pagination-at-slack/)
- [Python SDK分页测试](https://github.com/modelcontextprotocol/python-sdk/blob/main/tests/client/test_list_methods_cursor.py)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：  
本文件使用 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 进行翻译。虽然我们尽力确保准确性，但请注意自动翻译可能包含错误或不准确之处。应以文件的原始语言版本作为权威来源。对于重要信息，建议使用专业人工翻译。因使用本翻译内容而产生的任何误解或曲解，我们概不负责。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->