# MCP Server με stdio Μεταφορά

> **⚠️ Σημαντική Ενημέρωση**: Από την Προδιαγραφή MCP 2025-06-18, η αυτόνομη μεταφορά SSE (Server-Sent Events) έχει **καταργηθεί** και αντικατασταθεί από τη μεταφορά "Streamable HTTP". Η τρέχουσα προδιαγραφή MCP ορίζει δύο βασικούς μηχανισμούς μεταφοράς:
> 1. **stdio** - Τυπική είσοδος/έξοδος (συνιστάται για τοπικούς διακομιστές)
> 2. **Streamable HTTP** - Για απομακρυσμένους διακομιστές που μπορεί να χρησιμοποιούν εσωτερικά SSE
>
> Αυτό το μάθημα έχει ενημερωθεί για να επικεντρωθεί στη **stdio μεταφορά**, που αποτελεί την συνιστώμενη προσέγγιση για τις περισσότερες υλοποιήσεις διακομιστών MCP.

Η μεταφορά stdio επιτρέπει σε διακομιστές MCP να επικοινωνούν με τους πελάτες μέσω των ροών τυπικής εισόδου και εξόδου. Αυτή είναι η πλέον κοινά χρησιμοποιούμενη και συνιστώμενη μέθοδος μεταφοράς στην τρέχουσα προδιαγραφή MCP, παρέχοντας έναν απλό και αποδοτικό τρόπο για την κατασκευή διακομιστών MCP που μπορούν εύκολα να ενσωματωθούν με διάφορες εφαρμογές πελατών.

## Επισκόπηση

Αυτό το μάθημα καλύπτει πώς να δημιουργήσετε και να χρησιμοποιήσετε διακομιστές MCP χρησιμοποιώντας τη μεταφορά stdio.

## Στόχοι Μάθησης

Στο τέλος αυτού του μαθήματος, θα είστε σε θέση να:

- Δημιουργήσετε έναν διακομιστή MCP χρησιμοποιώντας τη μεταφορά stdio.
- Κάνετε αποσφαλμάτωση ενός διακομιστή MCP χρησιμοποιώντας το Inspector.
- Χρησιμοποιήσετε έναν διακομιστή MCP μέσα από το Visual Studio Code.
- Κατανοήσετε τους τρέχοντες μηχανισμούς μεταφοράς MCP και γιατί συνιστάται η stdio.

## stdio Μεταφορά - Πώς Λειτουργεί

Η μεταφορά stdio είναι ένας από τους δύο υποστηριζόμενους τύπους μεταφοράς στην τρέχουσα προδιαγραφή MCP (2025-11-25). Δείτε πώς λειτουργεί:

- **Απλή Επικοινωνία**: Ο διακομιστής διαβάζει μηνύματα JSON-RPC από την τυπική είσοδο (`stdin`) και στέλνει μηνύματα στην τυπική έξοδο (`stdout`).
- **Βασισμένο σε Διαδικασία**: Ο πελάτης εκκινεί τον διακομιστή MCP ως subprocess.
- **Μορφή Μηνυμάτων**: Τα μηνύματα είναι μεμονωμένα αιτήματα JSON-RPC, ειδοποιήσεις ή αποκρίσεις, διαχωρισμένα με νέα γραμμή.
- **Καταγραφή**: Ο διακομιστής ΜΠΟΡΕΙ να γράφει UTF-8 χαρακτήρες στην τυπική έξοδο σφαλμάτων (`stderr`) για σκοπούς καταγραφής.

### Βασικές Απαιτήσεις:
- Τα μηνύματα ΠΡΕΠΕΙ να διαχωρίζονται με νέες γραμμές και ΔΕΝ ΠΡΕΠΕΙ να έχουν ενσωματωμένες νέες γραμμές
- Ο διακομιστής ΔΕΝ ΠΡΕΠΕΙ να γράφει τίποτα στο `stdout` που να μην είναι ένα έγκυρο μήνυμα MCP
- Ο πελάτης ΔΕΝ ΠΡΕΠΕΙ να γράφει τίποτα στο `stdin` του διακομιστή που να μην είναι ένα έγκυρο μήνυμα MCP

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

Στον προηγούμενο κώδικα:

- Εισάγουμε την κλάση `Server` και τη μεταφορά `StdioServerTransport` από το MCP SDK
- Δημιουργούμε μια παρουσία διακομιστή με βασικές ρυθμίσεις και δυνατότητες
- Δημιουργούμε μια παρουσία `StdioServerTransport` και συνδέουμε τον διακομιστή σε αυτήν, ενεργοποιώντας την επικοινωνία μέσω stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Δημιουργήστε ένα στιγμιότυπο διακομιστή
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

Στον προηγούμενο κώδικα:

- Δημιουργούμε μια παρουσία διακομιστή χρησιμοποιώντας το MCP SDK
- Ορίζουμε εργαλεία με διακοσμητές
- Χρησιμοποιούμε το context manager `stdio_server` για να χειριστούμε τη μεταφορά

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

Η βασική διαφορά από το SSE είναι ότι οι stdio διακομιστές:

- Δεν απαιτούν ρύθμιση web server ή HTTP endpoints
- Εκκινούνται ως subprocesses από τον πελάτη
- Επικοινωνούν μέσω ροών stdin/stdout
- Είναι απλούστεροι στην υλοποίηση και αποσφαλμάτωση

## Άσκηση: Δημιουργία stdio Διακομιστή

Για να δημιουργήσουμε τον διακομιστή μας, πρέπει να έχουμε δύο πράγματα υπόψη:

- Χρειαζόμαστε έναν web server για να εκθέσουμε endpoints για σύνδεση και μηνύματα.

## Εργαστήριο: Δημιουργία ενός απλού MCP stdio διακομιστή

Σε αυτό το εργαστήριο, θα δημιουργήσουμε έναν απλό MCP διακομιστή χρησιμοποιώντας τη συνιστώμενη stdio μεταφορά. Αυτός ο διακομιστής θα εκθέτει εργαλεία που οι πελάτες μπορούν να καλέσουν χρησιμοποιώντας το πρότυπο Model Context Protocol.

### Προαπαιτούμενα

- Python 3.8 ή νεότερη
- MCP Python SDK: `pip install mcp`
- Βασική κατανόηση ασύγχρονης προγραμματισμού

Ας ξεκινήσουμε δημιουργώντας τον πρώτο μας MCP stdio διακομιστή:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Διαμόρφωση καταγραφής
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Δημιουργήστε τον διακομιστή
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # Χρησιμοποιήστε μεταφορά stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Βασικές διαφορές από την καταργημένη μέθοδο SSE

**Stdio Μεταφορά (Τρέχον Πρότυπο):**
- Απλό μοντέλο υποδιαδικασίας - ο πελάτης εκκινεί τον διακομιστή ως subprocess
- Επικοινωνία μέσω stdin/stdout με μηνύματα JSON-RPC
- Δεν απαιτείται ρύθμιση HTTP server
- Καλύτερη απόδοση και ασφάλεια
- Ευκολότερη αποσφαλμάτωση και ανάπτυξη

**SSE Μεταφορά (Καταργημένη από MCP 2025-06-18):**
- Απαιτούσε HTTP server με SSE endpoints
- Πιο περίπλοκη ρύθμιση με υποδομή web server
- Επιπλέον ζητήματα ασφαλείας για HTTP endpoints
- Αντικαταστάθηκε από το Streamable HTTP για σενάρια web-based

### Δημιουργία διακομιστή με stdio μεταφορά

Για να δημιουργήσουμε τον stdio διακομιστή μας, πρέπει να:

1. **Εισάγουμε τις απαιτούμενες βιβλιοθήκες** - Χρειαζόμαστε τα κομμάτια του MCP server και τη μεταφορά stdio
2. **Δημιουργήσουμε μια παρουσία διακομιστή** - Ορίζουμε τον διακομιστή με τις δυνατότητές του
3. **Ορίσουμε εργαλεία** - Προσθέτουμε τη λειτουργικότητα που θέλουμε να εκθέσουμε
4. **Ρυθμίσουμε τη μεταφορά** - Διαμορφώνουμε την επικοινωνία stdio
5. **Τρέξουμε τον διακομιστή** - Ξεκινάμε τον διακομιστή και χειριζόμαστε τα μηνύματα

Ας το φτιάξουμε βήμα-βήμα:

### Βήμα 1: Δημιουργία βασικού stdio διακομιστή

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Διαμορφώστε την καταγραφή
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Δημιουργήστε τον διακομιστή
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Βήμα 2: Προσθήκη περισσότερων εργαλείων

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Βήμα 3: Εκτέλεση διακομιστή

Αποθηκεύστε τον κώδικα ως `server.py` και εκτελέστε τον από τη γραμμή εντολών:

```bash
python server.py
```

Ο διακομιστής θα ξεκινήσει και θα περιμένει είσοδο από το stdin. Επικοινωνεί χρησιμοποιώντας μηνύματα JSON-RPC μέσω της μεταφοράς stdio.

### Βήμα 4: Δοκιμή με το Inspector

Μπορείτε να δοκιμάσετε τον διακομιστή σας χρησιμοποιώντας τον MCP Inspector:

1. Εγκαταστήστε τον Inspector: `npx @modelcontextprotocol/inspector`
2. Εκκινήστε τον Inspector και δείξτε τον στον διακομιστή σας
3. Δοκιμάστε τα εργαλεία που δημιουργήσατε

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Αποσφαλμάτωση του stdio διακομιστή σας

### Χρήση του MCP Inspector

Ο MCP Inspector είναι ένα πολύτιμο εργαλείο για αποσφαλμάτωση και δοκιμή διακομιστών MCP. Ιδού πώς να τον χρησιμοποιήσετε με τον stdio διακομιστή σας:

1. **Εγκαταστήστε τον Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Τρέξτε τον Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Δοκιμάστε τον διακομιστή σας**: Ο Inspector παρέχει μια διεπαφή web όπου μπορείτε να:
   - Δείτε τις δυνατότητες του διακομιστή
   - Δοκιμάσετε εργαλεία με διαφορετικές παραμέτρους
   - Παρακολουθήσετε τα μηνύματα JSON-RPC
   - Αποσφαλματώσετε προβλήματα σύνδεσης

### Χρήση VS Code

Μπορείτε επίσης να αποσφαλματώσετε τον MCP διακομιστή σας απευθείας στο VS Code:

1. Δημιουργήστε μια διαμόρφωση εκκίνησης στο `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Ορίστε σημεία διακοπής στον κώδικα του διακομιστή σας
3. Εκτελέστε τον debugger και δοκιμάστε με τον Inspector

### Συμβουλές αποσφαλμάτωσης

- Χρησιμοποιήστε το `stderr` για καταγραφή - μην γράφετε ποτέ στο `stdout` καθώς προορίζεται για μηνύματα MCP
- Βεβαιωθείτε ότι όλα τα μηνύματα JSON-RPC είναι διαχωρισμένα με νέα γραμμή
- Δοκιμάστε πρώτα με απλά εργαλεία πριν προσθέσετε πολύπλοκη λειτουργικότητα
- Χρησιμοποιήστε τον Inspector για να επαληθεύσετε τις μορφές των μηνυμάτων

## Χρήση του stdio διακομιστή σας στο VS Code

Αφού έχετε δημιουργήσει τον MCP stdio διακομιστή σας, μπορείτε να τον ενσωματώσετε με το VS Code για να τον χρησιμοποιείτε με τον Claude ή άλλους συμβατούς πελάτες MCP.

### Διαμόρφωση

1. **Δημιουργήστε ένα αρχείο διαμόρφωσης MCP** στο `%APPDATA%\Claude\claude_desktop_config.json` (Windows) ή `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Επανεκκινήστε τον Claude**: Κλείστε και ανοίξτε ξανά τον Claude για να φορτωθεί η νέα διαμόρφωση διακομιστή.

3. **Δοκιμάστε τη σύνδεση**: Ξεκινήστε μια συνομιλία με τον Claude και δοκιμάστε να χρησιμοποιήσετε τα εργαλεία του διακομιστή σας:
   - "Μπορείς να με χαιρετήσεις με το εργαλείο χαιρετισμού;"
   - "Υπολόγισε το άθροισμα των 15 και 27"
   - "Ποιες πληροφορίες έχει ο διακομιστής;"

### Παράδειγμα stdio διακομιστή TypeScript

Εδώ είναι ένα πλήρες παράδειγμα TypeScript ως αναφορά:

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Προσθήκη εργαλείων
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### Παράδειγμα stdio διακομιστή .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Περίληψη

Σε αυτό το ενημερωμένο μάθημα, μάθατε πώς να:

- Δημιουργείτε διακομιστές MCP χρησιμοποιώντας την τρέχουσα **stdio μεταφορά** (συνιστώμενη προσέγγιση)
- Κατανοείτε γιατί η μεταφορά SSE καταργήθηκε υπέρ των stdio και Streamable HTTP
- Δημιουργείτε εργαλεία που μπορούν να καλούνται από πελάτες MCP
- Κάνετε αποσφαλμάτωση του διακομιστή σας χρησιμοποιώντας τον MCP Inspector
- Ενσωματώνετε τον stdio διακομιστή σας με το VS Code και τον Claude

Η μεταφορά stdio παρέχει έναν απλούστερο, πιο ασφαλή και πιο αποδοτικό τρόπο για τη δημιουργία διακομιστών MCP σε σύγκριση με την καταργημένη μέθοδο SSE. Είναι η συνιστώμενη μεταφορά για τις περισσότερες υλοποιήσεις διακομιστών MCP από την προδιαγραφή 2025-06-18.


### .NET

1. Ας δημιουργήσουμε πρώτα κάποια εργαλεία, γι' αυτό θα δημιουργήσουμε ένα αρχείο *Tools.cs* με το ακόλουθο περιεχόμενο:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Άσκηση: Δοκιμή του stdio διακομιστή σας

Τώρα που έχετε δημιουργήσει τον stdio διακομιστή σας, ας τον δοκιμάσουμε για να βεβαιωθούμε ότι λειτουργεί σωστά.

### Προαπαιτούμενα

1. Βεβαιωθείτε ότι έχετε εγκαταστήσει τον MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Ο κώδικας του διακομιστή σας πρέπει να είναι αποθηκευμένος (π.χ. ως `server.py`)

### Δοκιμή με τον Inspector

1. **Ξεκινήστε τον Inspector με τον διακομιστή σας**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Ανοίξτε τη διεπαφή web**: Ο Inspector θα ανοίξει ένα παράθυρο περιηγητή που εμφανίζει τις δυνατότητες του διακομιστή σας.

3. **Δοκιμάστε τα εργαλεία**: 
   - Δοκιμάστε το εργαλείο `get_greeting` με διαφορετικά ονόματα
   - Δοκιμάστε το εργαλείο `calculate_sum` με διάφορους αριθμούς
   - Καλέστε το εργαλείο `get_server_info` για να δείτε μεταδεδομένα διακομιστή

4. **Παρακολουθήστε την επικοινωνία**: Ο Inspector εμφανίζει τα μηνύματα JSON-RPC που ανταλλάσσονται μεταξύ πελάτη και διακομιστή.

### Τι πρέπει να δείτε

Όταν ο διακομιστής σας ξεκινήσει σωστά, θα πρέπει να δείτε:
- Καταγεγραμμένες δυνατότητες διακομιστή στον Inspector
- Εργαλεία διαθέσιμα για δοκιμή
- Επιτυχημένη ανταλλαγή μηνυμάτων JSON-RPC
- Απαντήσεις εργαλείων εμφανιζόμενες στη διεπαφή

### Συχνά προβλήματα και λύσεις

**Ο διακομιστής δεν ξεκινά:**
- Ελέγξτε ότι είναι εγκατεστημένες όλες οι εξαρτήσεις: `pip install mcp`
- Επαληθεύστε τη σύνταξη και την εσοχή του Python
- Αναζητήστε μηνύματα σφάλματος στην κονσόλα

**Τα εργαλεία δεν εμφανίζονται:**
- Βεβαιωθείτε ότι υπάρχουν διακοσμητές `@server.tool()`
- Ελέγξτε ότι οι συναρτήσεις εργαλείων είναι ορισμένες πριν από τη `main()`
- Επιβεβαιώστε ότι ο διακομιστής είναι σωστά διαμορφωμένος

**Προβλήματα σύνδεσης:**
- Βεβαιωθείτε ότι ο διακομιστής χρησιμοποιεί σωστά τη stdio μεταφορά
- Ελέγξτε αν άλλες διεργασίες παρεμβαίνουν
- Επιβεβαιώστε τη σύνταξη εντολών του Inspector

## Ανάθεση

Δοκιμάστε να επεκτείνετε τον διακομιστή σας με περισσότερες δυνατότητες. Δείτε [αυτή τη σελίδα](https://api.chucknorris.io/) για παράδειγμα, για να προσθέσετε ένα εργαλείο που καλεί ένα API. Εσείς αποφασίζετε πώς θα είναι ο διακομιστής. Καλή διασκέδαση :)
## Λύση

[Λύση](./solution/README.md) Εδώ είναι μια πιθανή λύση με λειτουργικό κώδικα.

## Βασικά Σημεία

Τα βασικά σημεία αυτού του κεφαλαίου είναι τα εξής:

- Η stdio μεταφορά είναι ο συνιστώμενος μηχανισμός για τοπικούς MCP διακομιστές.
- Η stdio μεταφορά επιτρέπει ομαλή επικοινωνία μεταξύ διακομιστών MCP και πελατών χρησιμοποιώντας τις τυπικές ροές εισόδου/εξόδου.
- Μπορείτε να χρησιμοποιήσετε τόσο τον Inspector όσο και το Visual Studio Code για να χρησιμοποιήσετε απευθείας τους stdio διακομιστές, καθιστώντας την αποσφαλμάτωση και την ενσωμάτωση απλή.

## Παραδείγματα

- [Java Calculator](../samples/java/calculator/README.md)
- [.Net Calculator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Calculator](../samples/javascript/README.md)
- [TypeScript Calculator](../samples/typescript/README.md)
- [Python Calculator](../../../../03-GettingStarted/samples/python) 

## Επιπλέον Πόροι

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Τι Ακολουθεί

## Επόμενα Βήματα

Τώρα που μάθατε πώς να δημιουργείτε MCP διακομιστές με τη μεταφορά stdio, μπορείτε να εξερευνήσετε πιο προχωρημένα θέματα:

- **Επόμενο**: [HTTP Streaming με MCP (Streamable HTTP)](../06-http-streaming/README.md) - Μάθετε για τον άλλο υποστηριζόμενο μηχανισμό μεταφοράς για απομακρυσμένους διακομιστές
- **Προχωρημένο**: [Βέλτιστες Πρακτικές Ασφάλειας MCP](../../02-Security/README.md) - Υλοποίηση ασφαλείας στους MCP διακομιστές σας
- **Παραγωγή**: [Στρατηγικές Ανάπτυξης](../09-deployment/README.md) - Αναπτύξτε τους διακομιστές σας για παραγωγική χρήση

## Επιπλέον Πόροι

- [Προδιαγραφή MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Επίσημη προδιαγραφή
- [Τεκμηρίωση MCP SDK](https://github.com/modelcontextprotocol/sdk) - Αναφορές SDK για όλες τις γλώσσες
- [Παραδείγματα από την Κοινότητα](../../06-CommunityContributions/README.md) - Περισσότερα παραδείγματα διακομιστών από την κοινότητα

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->