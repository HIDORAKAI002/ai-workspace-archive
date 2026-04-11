# Προχωρημένη χρήση διακομιστή

Υπάρχουν δύο διαφορετικοί τύποι διακομιστών που παρουσιάζονται στο MCP SDK, ο κανονικός διακομιστής και ο διακομιστής χαμηλού επιπέδου. Κανονικά, θα χρησιμοποιούσατε τον κανονικό διακομιστή για να προσθέσετε λειτουργίες σε αυτόν. Ωστόσο, σε ορισμένες περιπτώσεις, θέλετε να βασιστείτε στον διακομιστή χαμηλού επιπέδου όπως:

- Καλύτερη αρχιτεκτονική. Είναι δυνατό να δημιουργηθεί μια καθαρή αρχιτεκτονική με τον κανονικό διακομιστή και τον διακομιστή χαμηλού επιπέδου, αλλά μπορεί να υποστηριχθεί ότι είναι ελαφρώς πιο εύκολο με έναν διακομιστή χαμηλού επιπέδου.
- Διαθεσιμότητα λειτουργιών. Ορισμένες προηγμένες λειτουργίες μπορούν να χρησιμοποιηθούν μόνο με διακομιστή χαμηλού επιπέδου. Θα το δείτε στα επόμενα κεφάλαια καθώς προσθέτουμε δειγματοληψία και προτροπή.

## Κανονικός διακομιστής vs διακομιστής χαμηλού επιπέδου

Δείτε πώς φαίνεται η δημιουργία ενός MCP Server με τον κανονικό διακομιστή

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

Το νόημα είναι ότι προσθέτετε ρητά κάθε εργαλείο, πόρο ή προτροπή που θέλετε να έχει ο διακομιστής. Δεν υπάρχει τίποτα κακό με αυτό.

### Προσέγγιση διακομιστή χαμηλού επιπέδου

Ωστόσο, όταν χρησιμοποιείτε την προσέγγιση διακομιστή χαμηλού επιπέδου, πρέπει να το σκεφτείτε διαφορετικά. Αντί να καταχωρείτε κάθε εργαλείο, δημιουργείτε δύο χειριστές ανά τύπο λειτουργίας (εργαλεία, πόροι ή προτροπές). Για παράδειγμα, τα εργαλεία έχουν μόνο δύο λειτουργίες όπως:

- Καταγραφή όλων των εργαλείων. Μία λειτουργία υπεύθυνη για όλες τις προσπάθειες να καταγραφούν εργαλεία.
- Διαχείριση κλήσεων όλων των εργαλείων. Εδώ επίσης, υπάρχει μόνο μία λειτουργία που χειρίζεται κλήσεις σε ένα εργαλείο.

Ακούγεται σαν λιγότερη δουλειά, έτσι; Αντί να καταχωρήσω ένα εργαλείο, απλά πρέπει να βεβαιωθώ ότι το εργαλείο καταγράφεται όταν καταγράφω όλα τα εργαλεία και ότι καλείται όταν υπάρχει εισερχόμενο αίτημα για κλήση εργαλείου.

Ας δούμε πώς δείχνει τώρα ο κώδικας:

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
  // Επιστρέψτε τη λίστα με τα εγγεγραμμένα εργαλεία
  return {
    tools: [{
        name="add",
        description="Add two numbers",
        inputSchema={
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

Εδώ έχουμε τώρα μια λειτουργία που επιστρέφει μια λίστα λειτουργιών. Κάθε καταχώρηση στη λίστα εργαλείων έχει πεδία όπως `name`, `description` και `inputSchema` για να τηρεί τον τύπο επιστροφής. Αυτό μας επιτρέπει να τοποθετήσουμε τα εργαλεία μας και τον ορισμό λειτουργιών αλλού. Μπορούμε πλέον να δημιουργούμε όλα μας τα εργαλεία σε έναν φάκελο tools και το ίδιο ισχύει για όλες τις λειτουργίες σας ώστε το έργο σας να μπορεί ξαφνικά να οργανωθεί ως εξής:

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

Αυτό είναι υπέροχο, η αρχιτεκτονική μας μπορεί να φαίνεται πολύ καθαρή.

Τι γίνεται με την κλήση εργαλείων, είναι ίδια ιδέα τότε, ένας χειριστής για την κλήση ενός εργαλείου, οποιουδήποτε εργαλείου; Ναι, ακριβώς, εδώ είναι ο κώδικας για αυτό:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools είναι ένα λεξικό με ονόματα εργαλείων ως κλειδιά
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

Όπως βλέπετε από τον παραπάνω κώδικα, πρέπει να αναλύσουμε ποιο εργαλείο θα κληθεί και με ποια επιχειρήματα και στη συνέχεια προχωράμε στην κλήση του εργαλείου.

## Βελτίωση της προσέγγισης με επαλήθευση

Μέχρι στιγμής, είδατε πώς όλες οι εγγραφές σας για την προσθήκη εργαλείων, πόρων και προτροπών μπορούν να αντικατασταθούν με αυτούς τους δύο χειριστές ανά τύπο λειτουργίας. Τι άλλο πρέπει να κάνουμε; Λοιπόν, θα πρέπει να προσθέσουμε κάποιο είδος επαλήθευσης για να διασφαλίσουμε ότι το εργαλείο καλείται με τα σωστά επιχειρήματα. Κάθε εκτέλεση χρόνου έχει τη δική της λύση για αυτό, για παράδειγμα η Python χρησιμοποιεί το Pydantic και η TypeScript χρησιμοποιεί το Zod. Η ιδέα είναι να κάνουμε τα ακόλουθα:

- Μετακινήστε τη λογική για τη δημιουργία μιας λειτουργίας (εργαλείο, πόρος ή προτροπή) στο αφιερωμένο φάκελό της.
- Προσθέστε έναν τρόπο επαλήθευσης ενός εισερχόμενου αιτήματος που ζητά, για παράδειγμα, να καλέσει ένα εργαλείο.

### Δημιουργία λειτουργίας

Για να δημιουργήσουμε μια λειτουργία, θα πρέπει να δημιουργήσουμε ένα αρχείο για αυτήν τη λειτουργία και να βεβαιωθούμε ότι έχει τα υποχρεωτικά πεδία που απαιτούνται από αυτή τη λειτουργία. Ποια πεδία διαφέρουν λίγο μεταξύ εργαλείων, πόρων και προτροπών.

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
        # Επικύρωση εισόδου χρησιμοποιώντας μοντέλο Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: πρόσθεσε Pydantic, έτσι ώστε να μπορούμε να δημιουργήσουμε ένα AddInputModel και να επικυρώσουμε τα args

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

- Δημιουργούμε ένα σχήμα χρησιμοποιώντας το Pydantic `AddInputModel` με πεδία `a` και `b` στο αρχείο *schema.py*.
- Προσπαθούμε να αναλύσουμε το εισερχόμενο αίτημα ώστε να είναι τύπου `AddInputModel`, αν υπάρχει ασυμφωνία στα παραμέτρους αυτό θα προκαλέσει σφάλμα:

   ```python
   # add.py
    try:
        # Επικυρώστε την είσοδο χρησιμοποιώντας το μοντέλο Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Μπορείτε να επιλέξετε αν θα βάλετε αυτή τη λογική ανάλυσης στην κλήση του εργαλείου ή στη λειτουργία χειριστή.

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

- Στον χειριστή που διαχειρίζεται όλες τις κλήσεις εργαλείων, τώρα προσπαθούμε να αναλύσουμε το εισερχόμενο αίτημα στο ορισμένο σχήμα του εργαλείου:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    αν αυτό λειτουργεί τότε προχωρούμε στην κλήση του πραγματικού εργαλείου:

    ```typescript
    const result = await tool.callback(input);
    ```

Όπως βλέπετε, αυτή η προσέγγιση δημιουργεί μια εξαιρετική αρχιτεκτονική καθώς όλα έχουν τη θέση τους, το *server.ts* είναι ένα πολύ μικρό αρχείο που απλώς συνδέει τους χειριστές αιτημάτων και κάθε λειτουργία βρίσκεται στον αντίστοιχο φάκελό της π.χ tools/, resources/ ή /prompts.

Τέλεια, ας προσπαθήσουμε να το δημιουργήσουμε αυτό στη συνέχεια.

## Άσκηση: Δημιουργία διακομιστή χαμηλού επιπέδου

Σε αυτή την άσκηση, θα κάνουμε τα εξής:

1. Δημιουργία διακομιστή χαμηλού επιπέδου που χειρίζεται την καταγραφή εργαλείων και την κλήση εργαλείων.
1. Υλοποίηση αρχιτεκτονικής πάνω στην οποία μπορείτε να οικοδομήσετε.
1. Προσθήκη επαλήθευσης για να εξασφαλίσουμε ότι οι κλήσεις εργαλείων σας επαληθεύονται σωστά.

### -1- Δημιουργία αρχιτεκτονικής

Το πρώτο που πρέπει να αντιμετωπίσουμε είναι μια αρχιτεκτονική που μας βοηθά να κλιμακώσουμε καθώς προσθέτουμε περισσότερες λειτουργίες, δείτε πώς φαίνεται:

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

Τώρα έχουμε ρυθμίσει μια αρχιτεκτονική που εξασφαλίζει ότι μπορούμε εύκολα να προσθέτουμε νέα εργαλεία σε έναν φάκελο tools. Μπορείτε ελεύθερα να ακολουθήσετε αυτό για να προσθέσετε υποφακέλους για πόρους και προτροπές.

### -2- Δημιουργία εργαλείου

Ας δούμε πώς φαίνεται η δημιουργία ενός εργαλείου στη συνέχεια. Πρώτα, πρέπει να δημιουργηθεί στον υποφάκελο *tool* ως εξής:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Επικυρώστε την είσοδο χρησιμοποιώντας το μοντέλο Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: προσθέστε Pydantic, ώστε να μπορούμε να δημιουργήσουμε ένα AddInputModel και να επικυρώσουμε τα args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Εδώ βλέπουμε πώς ορίζουμε το όνομα, την περιγραφή και το input schema χρησιμοποιώντας το Pydantic και έναν χειριστή που θα καλείται όταν το εργαλείο κληθεί. Τέλος, εκθέτουμε το `tool_add` που είναι ένα λεξικό που περιέχει όλες αυτές τις ιδιότητες.

Υπάρχει επίσης το *schema.py* που χρησιμοποιείται για τον ορισμό του input schema του εργαλείου μας:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Πρέπει επίσης να ενημερώσουμε το *__init__.py* για να διασφαλίσουμε ότι ο φάκελος tools αντιμετωπίζεται ως module. Επιπλέον, πρέπει να εκθέσουμε τα modules μέσα σε αυτόν ως εξής:

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
- rawSchema, αυτό είναι το Zod schema, θα χρησιμοποιηθεί για την επαλήθευση εισερχόμενων αιτημάτων για κλήση αυτού του εργαλείου.
- inputSchema, αυτό το σχήμα θα χρησιμοποιηθεί από τον χειριστή.
- callback, αυτό χρησιμοποιείται για να καλέσει το εργαλείο.

Υπάρχει επίσης το `Tool` που χρησιμοποιείται για να μετατρέψει αυτό το λεξικό σε έναν τύπο που ο MCP server handler μπορεί να αποδεχτεί και φαίνεται ως εξής:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Και υπάρχει το *schema.ts* όπου αποθηκεύουμε τα input schemas για κάθε εργαλείο που φαίνεται ως εξής με μόνο ένα σχήμα προς το παρόν αλλά καθώς προσθέτουμε εργαλεία μπορούμε να προσθέσουμε περισσότερες καταχωρίσεις:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Τέλεια, ας προχωρήσουμε τώρα στον χειρισμό της καταγραφής των εργαλείων μας.

### -3- Χειρισμός καταγραφής εργαλείων

Στη συνέχεια, για να χειριστούμε την καταγραφή των εργαλείων, πρέπει να ρυθμίσουμε έναν χειριστή αιτημάτων για αυτό. Δείτε τι πρέπει να προσθέσουμε στο αρχείο του διακομιστή μας:

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

Εδώ, προσθέτουμε το διακοσμητή `@server.list_tools` και τη λειτουργία υλοποίησης `handle_list_tools`. Σε αυτή τη λειτουργία, πρέπει να παράγουμε μια λίστα εργαλείων. Σημειώστε πώς κάθε εργαλείο πρέπει να έχει όνομα, περιγραφή και inputSchema.

**TypeScript**

Για να ρυθμίσουμε τον χειριστή αιτήσεων για την καταγραφή εργαλείων, πρέπει να καλέσουμε το `setRequestHandler` στον διακομιστή με ένα σχήμα που ταιριάζει με αυτό που προσπαθούμε να κάνουμε, σε αυτή την περίπτωση `ListToolsRequestSchema`.

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
  // Επιστρέφει τη λίστα με τα καταχωρημένα εργαλεία
  return {
    tools: tools
  };
});
```

Τέλεια, τώρα έχουμε λύσει το κομμάτι της καταγραφής εργαλείων, ας δούμε πώς θα μπορούσαμε να καλούμε εργαλεία στη συνέχεια.

### -4- Χειρισμός κλήσης εργαλείου

Για να καλέσετε ένα εργαλείο, πρέπει να ρυθμίσουμε έναν άλλο χειριστή αιτήσεων, αυτή τη φορά εστιάζοντας σε ένα αίτημα που καθορίζει ποια λειτουργία να καλέσει και με ποια επιχειρήματα.

**Python**

Ας χρησιμοποιήσουμε το διακοσμητή `@server.call_tool` και να τον υλοποιήσουμε με μια λειτουργία όπως η `handle_call_tool`. Μέσα σε αυτή τη λειτουργία, πρέπει να αναλύσουμε το όνομα του εργαλείου, το όρισμά του και να διασφαλίσουμε ότι τα επιχειρήματα είναι έγκυρα για το συγκεκριμένο εργαλείο. Μπορούμε είτε να επικυρώσουμε τα επιχειρήματα σε αυτή τη λειτουργία είτε κατόπιν στη λειτουργία του πραγματικού εργαλείου.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # τα εργαλεία είναι ένα λεξικό με ονόματα εργαλείων ως κλειδιά
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

Αυτό συμβαίνει:

- Το όνομα του εργαλείου είναι ήδη παρόν ως η παράμετρος εισόδου `name` που ισχύει και για τα επιχειρήματά μας με τη μορφή του λεξικού `arguments`.

- Το εργαλείο καλείται με `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Η επικύρωση των επιχειρημάτων γίνεται στην ιδιότητα `handler` που δείχνει σε μια λειτουργία, αν αποτύχει θα προκύψει εξαίρεση.

Έτσι, τώρα έχουμε μια πλήρη κατανόηση της καταγραφής και κλήσης εργαλείων χρησιμοποιώντας έναν διακομιστή χαμηλού επιπέδου.

Δείτε το [πλήρες παράδειγμα](./code/README.md) εδώ

## Ανάθεση

Επεκτείνετε τον κώδικα που σας δόθηκε με έναν αριθμό εργαλείων, πόρων και προτροπών και σκεφτείτε πώς παρατηρείτε ότι χρειάζεται μόνο να προσθέσετε αρχεία στον κατάλογο tools και πουθενά αλλού.

*Δεν παρέχεται λύση*

## Περίληψη

Σε αυτό το κεφάλαιο, είδαμε πώς λειτουργεί η προσέγγιση διακομιστή χαμηλού επιπέδου και πώς μπορεί να μας βοηθήσει να δημιουργήσουμε μια ωραία αρχιτεκτονική πάνω στην οποία μπορούμε να συνεχίσουμε να χτίζουμε. Συζητήσαμε επίσης την επικύρωση και σας δείξαμε πώς να δουλέψετε με βιβλιοθήκες επαλήθευσης για να δημιουργήσετε σχήματα για την επικύρωση εισόδου.

## Τι ακολουθεί

- Επόμενο: [Απλή αυθεντικοποίηση](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:  
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης AI [Co-op Translator](https://github.com/Azure/co-op-translator). Παρόλο που προσπαθούμε για ακρίβεια, παρακαλούμε να γνωρίζετε ότι οι αυτόματες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται η επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->