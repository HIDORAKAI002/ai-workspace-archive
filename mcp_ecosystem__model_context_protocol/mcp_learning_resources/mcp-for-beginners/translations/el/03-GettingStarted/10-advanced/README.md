# Προχωρημένη χρήση διακομιστή

Υπάρχουν δύο διαφορετικοί τύποι διακομιστών που εκτίθενται στο MCP SDK, ο κανονικός σας διακομιστής και ο διακομιστής χαμηλού επιπέδου. Κανονικά, θα χρησιμοποιούσατε τον κανονικό διακομιστή για να προσθέσετε λειτουργίες. Σε ορισμένες περιπτώσεις, ωστόσο, θέλετε να βασιστείτε στον διακομιστή χαμηλού επιπέδου, όπως:

- Καλύτερη αρχιτεκτονική. Είναι δυνατό να δημιουργηθεί μια καθαρή αρχιτεκτονική και με τον κανονικό διακομιστή και με τον διακομιστή χαμηλού επιπέδου, αλλά μπορεί να υποστηριχτεί ότι είναι ελαφρώς πιο εύκολο με τον διακομιστή χαμηλού επιπέδου.
- Διαθεσιμότητα λειτουργιών. Ορισμένες προχωρημένες λειτουργίες μπορούν να χρησιμοποιηθούν μόνο με διακομιστή χαμηλού επιπέδου. Αυτό θα το δείτε σε επόμενα κεφάλαια καθώς προσθέτουμε δειγματοληψία (deprecated στην έκδοση υποψήφια για κυκλοφορία `2026-07-28`) και ερευνών.

## Κανονικός διακομιστής έναντι διακομιστή χαμηλού επιπέδου

Έτσι δημιουργείται ένας MCP Server με τον κανονικό διακομιστή

**Python**

```python
mcp = FastMCP("Demo")

# Προσθέστε ένα εργαλείο πρόσθεσης
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b
```

**TypeScript**

```typescript
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Προσθέστε ένα εργαλείο πρόσθεσης
server.registerTool("add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);
```

Το σημαντικό είναι ότι προσθέτετε ρητά κάθε εργαλείο, πόρο ή prompt που θέλετε να έχει ο διακομιστής. Δεν υπάρχει τίποτα κακό σε αυτό.  

### Προσέγγιση διακομιστή χαμηλού επιπέδου

Ωστόσο, όταν χρησιμοποιείτε την προσέγγιση διακομιστή χαμηλού επιπέδου, πρέπει να το σκεφτείτε διαφορετικά. Αντί να καταχωρείτε κάθε εργαλείο, δημιουργείτε δύο χειριστές ανά τύπο λειτουργίας (εργαλεία, πόροι ή prompts). Για παράδειγμα, τα εργαλεία έχουν μόνο δύο λειτουργίες ως εξής:

- Καταγραφή όλων των εργαλείων. Μια λειτουργία είναι υπεύθυνη για όλες τις προσπάθειες καταγραφής εργαλείων.
- Διαχείριση κλήσεων όλων των εργαλείων. Εδώ επίσης, υπάρχει μόνο μία λειτουργία που χειρίζεται τις κλήσεις σε ένα εργαλείο

Ακούγεται ότι πιθανότατα απαιτεί λιγότερη δουλειά, σωστά; Έτσι αντί να καταχωρήσουμε ένα εργαλείο, απλώς πρέπει να βεβαιωθούμε ότι το εργαλείο καταγράφεται όταν καταγράφουμε όλα τα εργαλεία και ότι καλείται όταν υπάρχει εισερχόμενο αίτημα για κλήση εργαλείου. 

Ας δούμε πώς φαίνεται τώρα ο κώδικας:

**Python**

```python
@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available tools."""
    return [
        types.Tool(
            name="add",
            description="Add two numbers",
            inputSchema={
                "type": "object",
                "properties": {
                    "a": {"type": "number", "description": "number to add"}, 
                    "b": {"type": "number", "description": "number to add"}
                },
                "required": ["query"],
            },
        )
    ]
```

**TypeScript**

```typescript
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Επιστρέφει τη λίστα των καταχωρημένων εργαλείων
  return {
    tools: [{
        name: "add",
        description: "Add two numbers",
        inputSchema: {
            "type": "object",
            "properties": {
                "a": {"type": "number", "description": "number to add"},
                "b": {"type": "number", "description": "number to add"}
            },
            "required": ["query"],
        }
    }]
  };
});
```

Εδώ έχουμε τώρα μια λειτουργία που επιστρέφει μια λίστα λειτουργιών. Κάθε είσοδος στη λίστα εργαλείων έχει τώρα πεδία όπως `name`, `description` και `inputSchema` για να ακολουθεί τον τύπο επιστροφής. Αυτό μας επιτρέπει να τοποθετούμε τα εργαλεία και τον ορισμό λειτουργίας αλλού. Τώρα μπορούμε να δημιουργήσουμε όλα τα εργαλεία μας σε έναν φάκελο tools και το ίδιο ισχύει για όλες τις λειτουργίες σας ώστε το έργο να μπορεί ξαφνικά να οργανωθεί ως εξής:

```text
app
--| tools
----| add
----| substract
--| resources
----| products
----| schemas
--| prompts
----| product-description
```

Αυτό είναι υπέροχο, η αρχιτεκτονική μας μπορεί να γίνει αρκετά καθαρή.

Τι γίνεται με την κλήση εργαλείων, είναι η ίδια ιδέα τότε, ένας χειριστής για κλήση εργαλείου, οποιουδήποτε εργαλείου; Ναι, ακριβώς, να ο κώδικας για αυτό:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # το tools είναι ένα λεξικό με ονόματα εργαλείων ως κλειδιά
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

**TypeScript**

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if(!tool) {
        return {
            error: {
                code: "tool_not_found",
                message: `Tool ${name} not found.`
            }
       };
    }
    
    // args: request.params.arguments
    // TODO καλέστε το εργαλείο,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Όπως μπορείτε να δείτε από τον παραπάνω κώδικα, χρειάζεται να αναλύσουμε ποιο εργαλείο θα καλέσουμε και με ποια επιχειρήματα, και μετά προχωράμε στην κλήση του εργαλείου.

## Βελτίωση της προσέγγισης με επικύρωση

Μέχρι τώρα, έχετε δει πώς όλες οι καταχωρήσεις σας για προσθήκη εργαλείων, πόρων και prompts μπορούν να αντικατασταθούν με αυτούς τους δύο χειριστές ανά τύπο λειτουργίας. Τι άλλο πρέπει να κάνουμε; Λοιπόν, θα πρέπει να προσθέσουμε κάποια μορφή επικύρωσης για να διασφαλίσουμε ότι το εργαλείο καλείται με τα σωστά επιχειρήματα. Κάθε runtime έχει τη δική του λύση γι' αυτό, για παράδειγμα ο Python χρησιμοποιεί το Pydantic και ο TypeScript το Zod. Η ιδέα είναι να κάνουμε τα εξής:

- Μεταφέρουμε τη λογική για τη δημιουργία μιας λειτουργίας (εργαλείο, πόρος ή prompt) στον αφιερωμένο φάκελό της.
- Προσθέτουμε έναν τρόπο επικύρωσης ενός εισερχόμενου αιτήματος που ζητά, για παράδειγμα, να καλέσει ένα εργαλείο.

### Δημιουργία λειτουργίας

Για να δημιουργήσουμε μια λειτουργία, πρέπει να δημιουργήσουμε ένα αρχείο για αυτή τη λειτουργία και να βεβαιωθούμε ότι έχει τα υποχρεωτικά πεδία που απαιτούνται από αυτή τη λειτουργία. Ποια πεδία διαφέρουν λίγο μεταξύ εργαλείων, πόρων και prompts.

**Python**

```python
# schema.py
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float

# add.py

from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Επικύρωση εισόδου χρησιμοποιώντας το μοντέλο Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: προσθήκη Pydantic, ώστε να μπορούμε να δημιουργήσουμε ένα AddInputModel και να επικυρώσουμε τα επιχειρήματα

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Εδώ μπορείτε να δείτε πώς κάνουμε τα εξής:

- Δημιουργούμε ένα schema χρησιμοποιώντας το Pydantic `AddInputModel` με πεδία `a` και `b` στο αρχείο *schema.py*.
- Προσπαθούμε να αναλύσουμε το εισερχόμενο αίτημα ώστε να είναι του τύπου `AddInputModel`, αν υπάρχει ασυμβατότητα παραμέτρων το πρόγραμμα θα καταρρεύσει:

   ```python
   # add.py
    try:
        # Επαλήθευση εισόδου χρησιμοποιώντας μοντέλο Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Μπορείτε να επιλέξετε αν θα βάλετε αυτή τη λογική ανάλυσης μέσα στην ίδια κλήση εργαλείου ή στη λειτουργία χειριστή.

**TypeScript**

```typescript
// server.ts
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if (!tool) {
       return {
        error: {
            code: "tool_not_found",
            message: `Tool ${name} not found.`
        }
       };
    }
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);

       // @ts-ignore
       const result = await tool.callback(input);

       return {
          content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
      };
    } catch (error) {
       return {
          error: {
             code: "invalid_arguments",
             message: `Invalid arguments for tool ${name}: ${error instanceof Error ? error.message : String(error)}`
          }
    };
   }

});

// schema.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// add.ts
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

- Στον χειριστή που διαχειρίζεται όλες τις κλήσεις εργαλείων, τώρα προσπαθούμε να αναλύσουμε το εισερχόμενο αίτημα στο προκαθορισμένο schema του εργαλείου:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    αν αυτό λειτουργήσει, τότε προχωράμε στην κλήση του πραγματικού εργαλείου:

    ```typescript
    const result = await tool.callback(input);
    ```

Όπως βλέπετε, αυτή η προσέγγιση δημιουργεί μια υπέροχη αρχιτεκτονική καθώς όλα έχουν τη θέση τους, το *server.ts* είναι ένα πολύ μικρό αρχείο που συνδέει μόνο τους χειριστές αιτημάτων και κάθε λειτουργία είναι στον αντίστοιχο φάκελό της, π.χ. tools/, resources/ ή /prompts.

Τέλεια, ας προσπαθήσουμε να το κατασκευάσουμε τώρα.

## Άσκηση: Δημιουργία διακομιστή χαμηλού επιπέδου

Σε αυτήν την άσκηση, θα κάνουμε τα εξής:

1. Δημιουργήστε έναν διακομιστή χαμηλού επιπέδου που διαχειρίζεται την καταγραφή εργαλείων και την κλήση εργαλείων.
1. Υλοποιήστε μια αρχιτεκτονική πάνω στην οποία μπορείτε να οικοδομήσετε.
1. Προσθέστε επικύρωση για να διασφαλίσετε ότι οι κλήσεις εργαλείων σας επικυρώνονται σωστά.

### -1- Δημιουργία αρχιτεκτονικής

Το πρώτο που πρέπει να λύσουμε είναι μια αρχιτεκτονική που θα μας βοηθήσει να κλιμακωθούμε όσο προσθέτουμε περισσότερες λειτουργίες, δείτε πώς φαίνεται:

**Python**

```text
server.py
--| tools
----| __init__.py
----| add.py
----| schema.py
client.py
```

**TypeScript**

```text
server.ts
--| tools
----| add.ts
----| schema.ts
client.ts
```

Τώρα έχουμε διαμορφώσει μια αρχιτεκτονική που εξασφαλίζει ότι μπορούμε εύκολα να προσθέτουμε νέα εργαλεία σε έναν φάκελο tools. Μη διστάσετε να ακολουθήσετε αυτό για να προσθέσετε υποφακέλους για resources και prompts.

### -2- Δημιουργία εργαλείου

Ας δούμε πώς φαίνεται η δημιουργία ενός εργαλείου στη συνέχεια. Πρώτον, πρέπει να δημιουργηθεί στον υποφάκελο *tool* ως εξής:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Επικύρωση εισόδου χρησιμοποιώντας μοντέλο Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: προσθήκη Pydantic, ώστε να μπορούμε να δημιουργήσουμε ένα AddInputModel και να επικυρώσουμε τα επιχειρήματα

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Αυτό που βλέπουμε εδώ είναι πώς ορίζουμε το όνομα, την περιγραφή και το σχήμα εισόδου χρησιμοποιώντας Pydantic και έναν χειριστή που θα κληθεί μόλις αυτό το εργαλείο κληθεί. Τέλος, εκθέτουμε το `tool_add` που είναι ένα λεξικό που περιέχει όλες αυτές τις ιδιότητες.

Υπάρχει επίσης το *schema.py* που χρησιμοποιείται για να ορίσει το σχήμα εισόδου που χρησιμοποιεί το εργαλείο μας:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Πρέπει επίσης να συμπληρώσουμε το *__init__.py* για να διασφαλίσουμε ότι ο φάκελος tools αντιμετωπίζεται ως module. Επιπλέον, πρέπει να εκθέσουμε τα modules μέσα σε αυτόν, ως εξής:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Μπορούμε να συνεχίσουμε να προσθέτουμε σε αυτό το αρχείο καθώς προσθέτουμε περισσότερα εργαλεία.

**TypeScript**

```typescript
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

Εδώ δημιουργούμε ένα λεξικό που αποτελείται από ιδιότητες:

- name, αυτό είναι το όνομα του εργαλείου.
- rawSchema, αυτό είναι το σχήμα Zod, θα χρησιμοποιηθεί για την επικύρωση εισερχόμενων αιτημάτων για κλήση αυτού του εργαλείου.
- inputSchema, αυτό το σχήμα θα χρησιμοποιηθεί από τον χειριστή.
- callback, αυτό χρησιμοποιείται για να ενεργοποιήσει το εργαλείο.

Υπάρχει επίσης το `Tool` που χρησιμοποιείται για να μετατρέψει αυτό το λεξικό σε τύπο που ο MCP server χειριστής μπορεί να δεχτεί και φαίνεται ως εξής:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Και υπάρχει το *schema.ts* όπου φυλάσσουμε τα σχήματα εισόδου για κάθε εργαλείο, που φαίνεται ως εξής με μόνο ένα σχήμα προς το παρόν, αλλά καθώς προσθέτουμε εργαλεία μπορούμε να προσθέτουμε περισσότερες καταχωρήσεις:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Τέλεια, ας προχωρήσουμε τώρα στο χειρισμό της καταγραφής των εργαλείων μας.

### -3- Χειρισμός καταγραφής εργαλείων

Στη συνέχεια, για να χειριστούμε την καταγραφή των εργαλείων μας, πρέπει να ρυθμίσουμε έναν χειριστή αιτήματος για αυτό. Δείτε τι πρέπει να προσθέσουμε στο αρχείο του διακομιστή μας:

**Python**

```python
# ο κώδικας παραλείπεται για συντομία
from tools import tools

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    tool_list = []
    print(tools)

    for tool in tools.values():
        tool_list.append(
            types.Tool(
                name=tool["name"],
                description=tool["description"],
                inputSchema=pydantic_to_json(tool["input_schema"]),
            )
        )
    return tool_list
```

Εδώ, προσθέτουμε το διακοσμητή `@server.list_tools` και τη λειτουργία υλοποίησης `handle_list_tools`. Σε αυτή τη λειτουργία, πρέπει να παράγουμε μια λίστα εργαλείων. Προσέξτε πως κάθε εργαλείο πρέπει να έχει όνομα, περιγραφή και inputSchema.   

**TypeScript**

Για να ρυθμίσουμε τον χειριστή αιτήματος για την καταγραφή εργαλείων, πρέπει να καλέσουμε τη `setRequestHandler` στον διακομιστή με ένα σχήμα που ταιριάζει με αυτό που προσπαθούμε να κάνουμε, σε αυτή την περίπτωση `ListToolsRequestSchema`. 

```typescript
// index.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// server.ts
// ο κώδικας παραλείπεται για συντομία
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Επιστρέφει τη λίστα των καταχωρημένων εργαλείων
  return {
    tools: tools
  };
});
```

Τέλεια, τώρα που λύσαμε το κομμάτι της καταγραφής εργαλείων, ας δούμε πώς θα μπορούσαμε να καλούμε εργαλεία στη συνέχεια.

### -4- Χειρισμός κλήσης εργαλείου

Για να καλέσουμε ένα εργαλείο, πρέπει να ρυθμίσουμε έναν άλλο χειριστή αιτήματος, αυτή τη φορά επικεντρωμένο σε αίτημα που καθορίζει ποια λειτουργία θα κληθεί και με ποια επιχειρήματα.

**Python**

Ας χρησιμοποιήσουμε τον διακοσμητή `@server.call_tool` και ας υλοποιήσουμε μια λειτουργία όπως `handle_call_tool`. Μέσα σε αυτή τη λειτουργία, πρέπει να αναλύσουμε το όνομα του εργαλείου, τα επιχειρήματά του και να διασφαλίσουμε ότι τα επιχειρήματα είναι έγκυρα για το εν λόγω εργαλείο. Μπορούμε είτε να επικυρώσουμε τα επιχειρήματα σε αυτή τη λειτουργία είτε πιο κάτω στην πραγματική κλήση εργαλείου.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # Το tools είναι ένα λεξικό με τα ονόματα των εργαλείων ως κλειδιά
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # εκτελέστε το εργαλείο
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Δείτε τι συμβαίνει:

- Το όνομα του εργαλείου είναι ήδη παρόν ως παράμετρος εισόδου `name`, το ίδιο συμβαίνει και για τα επιχειρήματα στη μορφή του λεξικού `arguments`.

- Το εργαλείο καλείται με `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Η επικύρωση των επιχειρημάτων γίνεται στην ιδιότητα `handler` που δείχνει σε μια λειτουργία, αν αποτύχει αυτή η επικύρωση θα σηκωθεί εξαίρεση.

Έτσι, τώρα έχουμε πλήρη κατανόηση της καταγραφής και της κλήσης εργαλείων χρησιμοποιώντας διακομιστή χαμηλού επιπέδου.

Δείτε το [πλήρες παράδειγμα](./code/README.md) εδώ

## Ανάθεση

Επεκτείνετε τον κώδικα που λάβατε με αριθμό εργαλείων, πόρων και prompts και αναλογιστείτε πώς παρατηρείτε ότι χρειάζεται να προσθέσετε αρχεία μόνο στο φάκελο tools και πουθενά αλλού. 

*Δεν παρέχεται λύση*

## Περίληψη

Σε αυτό το κεφάλαιο, είδαμε πώς λειτουργεί η προσέγγιση διακομιστή χαμηλού επιπέδου και πώς αυτό μπορεί να μας βοηθήσει να δημιουργήσουμε μια ωραία αρχιτεκτονική που μπορούμε να συνεχίσουμε να διευρύνουμε. Συζητήσαμε επίσης για την επικύρωση και σας δείξαμε πώς να εργάζεστε με βιβλιοθήκες επικύρωσης για να δημιουργήσετε schemas για την επικύρωση εισόδου.

## Τι ακολουθεί

- Επόμενο: [Απλή Αυθεντικοποίηση](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->