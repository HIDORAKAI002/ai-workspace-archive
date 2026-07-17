# Zaawansowane użycie serwera

W SDK MCP są dwa różne typy serwerów, zwykły serwer i serwer niskiego poziomu. Zwykle używasz zwykłego serwera, aby dodać do niego funkcje. W niektórych przypadkach jednak chcesz polegać na serwerze niskiego poziomu, na przykład:

- Lepsza architektura. Możliwe jest stworzenie czystej architektury zarówno ze zwykłym serwerem, jak i serwerem niskiego poziomu, ale można argumentować, że jest to nieco łatwiejsze z serwerem niskiego poziomu.
- Dostępność funkcji. Niektóre zaawansowane funkcje można używać tylko z serwerem niskiego poziomu. Zobaczysz to w kolejnych rozdziałach, gdy dodajemy sampling (przestarzały w kandydacie na wersję `2026-07-28`) i elicytację.

## Zwykły serwer kontra serwer niskiego poziomu

Tak wygląda tworzenie serwera MCP za pomocą zwykłego serwera

**Python**

```python
mcp = FastMCP("Demo")

# Dodaj narzędzie dodawania
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

// Dodaj narzędzie do dodawania
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

Chodzi o to, że explicite dodajesz każde narzędzie, zasób lub prompt, które chcesz, aby serwer miał. Nie ma w tym nic złego.  

### Podejście serwera niskiego poziomu

Jednak gdy używasz podejścia niskopoziomowego, musisz o tym myśleć inaczej. Zamiast rejestrować każde narzędzie, tworzysz dwie funkcje obsługi na typ funkcji (narzędzia, zasoby lub prompt). Na przykład narzędzia mają tylko dwie funkcje:

- Wypisywanie wszystkich narzędzi. Jedna funkcja jest odpowiedzialna za wszystkie próby wypisania narzędzi.
- obsługę wywołania wszystkich narzędzi. Tutaj też jest tylko jedna funkcja obsługująca wywołania narzędzia.

Brzmi to jak potencjalnie mniejsza praca, prawda? Więc zamiast rejestrować narzędzie, po prostu muszę upewnić się, że narzędzie jest wypisane, gdy wypisuję wszystkie narzędzia i że jest wywoływane, gdy przychodzi żądanie wywołania narzędzia. 

Spójrzmy, jak teraz wygląda kod:

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
  // Zwróć listę zarejestrowanych narzędzi
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

Mamy teraz funkcję zwracającą listę funkcji. Każdy wpis na liście narzędzi ma teraz pola takie jak `name`, `description` i `inputSchema`, zgodne z typem zwracanym. Pozwala nam to umieścić definicje naszych narzędzi i funkcji gdzie indziej. Możemy teraz tworzyć wszystkie nasze narzędzia w folderze tools i to samo dotyczy wszystkich funkcji, dzięki czemu projekt może być zorganizowany tak:

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

To świetnie, nasza architektura może być bardzo czysta.

A co z wywoływaniem narzędzi, czy to ta sama idea, jedna funkcja obsługi wywołania narzędzia, dowolnego narzędzia? Tak, dokładnie, oto kod:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools to słownik z nazwami narzędzi jako kluczami
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
    // TODO wywołać narzędzie,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Jak widać powyżej, musimy wyodrębnić narzędzie do wywołania oraz argumenty, a następnie przejść do wywołania narzędzia.

## Ulepszanie podejścia za pomocą walidacji

Jak dotąd widziałeś, że wszystkie rejestracje dodające narzędzia, zasoby i prompt można zastąpić tymi dwoma funkcjami obsługi na typ funkcji. Co jeszcze musimy zrobić? Powinniśmy dodać jakąś formę walidacji, aby upewnić się, że narzędzie jest wywoływane z prawidłowymi argumentami. Każde środowisko wykonawcze ma swoje własne rozwiązanie, na przykład Python używa Pydantic, a TypeScript używa Zod. Ideą jest, aby zrobić następujące:

- Przenieść logikę tworzenia funkcji (narzędzia, zasobu lub prompt) do dedykowanego folderu.
- Dodać sposób walidacji przychodzącego żądania, na przykład wywołania narzędzia.

### Tworzenie funkcji

Aby stworzyć funkcję, musimy utworzyć plik dla tej funkcji i zapewnić, że zawiera wymagane pola. Które pola różnią się między narzędziami, zasobami i promptami.

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
        # Waliduj dane wejściowe za pomocą modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # DO ZROBIENIA: dodaj Pydantic, abyśmy mogli stworzyć AddInputModel i zweryfikować argumenty

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

tutaj widać, jak zrobiliśmy następujące:

- Tworzymy schemat za pomocą Pydantic `AddInputModel` z polami `a` i `b` w pliku *schema.py*.
- Próbujemy sparsować przychodzące żądanie jako typ `AddInputModel`, jeśli parametry nie pasują, to spowoduje awarię:

   ```python
   # add.py
    try:
        # Waliduj dane wejściowe za pomocą modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Możesz zdecydować, czy tę logikę parsowania umieścić w samym wywołaniu narzędzia, czy w funkcji obsługi.

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

- W funkcji obsługi wywołań wszystkich narzędzi, teraz próbujemy sparsować przychodzące żądanie do zdefiniowanego schematu narzędzia:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    jeśli to się uda, to przechodzimy do wywołania właściwego narzędzia:

    ```typescript
    const result = await tool.callback(input);
    ```

Jak widać, to podejście tworzy świetną architekturę, ponieważ wszystko ma swoje miejsce, *server.ts* to bardzo mały plik łączący funkcje obsługi żądań, a każda funkcja jest w swoim folderze: tools/, resources/ lub prompts/.

Świetnie, spróbujmy to teraz zbudować. 

## Ćwiczenie: Tworzenie serwera niskiego poziomu

W tym ćwiczeniu zrobimy następujące:

1. Utworzymy serwer niskiego poziomu obsługujący listowanie narzędzi i wywoływanie narzędzi.
1. Wdrożymy architekturę, na której można budować.
1. Dodamy walidację, aby upewnić się, że wywołania narzędzi są odpowiednio walidowane.

### -1- Utworzenie architektury

Pierwsza rzecz, którą musimy zaadresować, to architektura pomagająca w skalowaniu, gdy dodajemy więcej funkcji, oto jak to wygląda:

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

Teraz mamy ustawioną architekturę, która pozwala łatwo dodawać nowe narzędzia w folderze tools. Możesz także dodać podfoldery dla resources i prompts.

### -2- Tworzenie narzędzia

Zobaczmy, jak wygląda tworzenie narzędzia. Najpierw musi być utworzone w podkatalogu *tool*, tak jak tutaj:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Waliduj dane wejściowe za pomocą modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: dodaj Pydantic, abyśmy mogli utworzyć AddInputModel i zwalidować argumenty

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Widać tutaj jak definiujemy nazwę, opis, schemat wejściowy używając Pydantic oraz funkcję obsługi, która zostanie wywołana, gdy narzędzie będzie wywołane. Na koniec udostępniamy `tool_add`, słownik trzymający te właściwości.

Jest też *schema.py*, który definiuje schemat wejściowy używany przez nasze narzędzie:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Musimy także uzupełnić *__init__.py*, aby katalog tools był traktowany jako moduł. Dodatkowo musimy udostępnić moduły w nim tak:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Możemy dalej dodawać do tego pliku w miarę dodawania kolejnych narzędzi.

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

Tutaj tworzymy słownik z właściwościami:

- name, to jest nazwa narzędzia.
- rawSchema, to schemat Zod używany do walidacji przychodzących żądań wywołania tego narzędzia.
- inputSchema, ten schemat jest używany przez funkcję obsługi.
- callback, to jest funkcja wywołująca narzędzie.

Jest także `Tool`, który konwertuje ten słownik na typ, który handler serwera mcp może zaakceptować, wygląda to tak:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

I jest *schema.ts*, gdzie przechowujemy schematy wejściowe dla każdego narzędzia, obecnie tylko jeden schemat, ale z czasem można dodać kolejne:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Świetnie, przejdźmy do obsługi listowania naszych narzędzi.

### -3- Obsługa listowania narzędzi

Następnie, aby obsłużyć listowanie narzędzi, musimy ustawić funkcję obsługi żądania dla tego celu. Oto co trzeba dodać do pliku serwera:

**Python**

```python
# kod pominięty dla zwięzłości
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

Tutaj dodajemy dekorator `@server.list_tools` oraz implementujemy funkcję `handle_list_tools`. W niej musimy wygenerować listę narzędzi. Zwróć uwagę, że każde narzędzie musi mieć nazwę, opis i inputSchema.  

**TypeScript**

Aby ustawić handler żądań listowania narzędzi, musimy wywołać `setRequestHandler` na serwerze z odpowiednim schematem, w tym przypadku `ListToolsRequestSchema`. 

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
// kod pominięty dla zwięzłości
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Zwróć listę zarejestrowanych narzędzi
  return {
    tools: tools
  };
});
```

Świetnie, mamy obsłużone listowanie narzędzi, zobaczmy teraz, jak można wywoływać narzędzia.

### -4- Obsługa wywoływania narzędzia

Aby wywołać narzędzie, musimy ustawić kolejną funkcję obsługi żądań, tym razem skupioną na żądaniu określającym, którą funkcję wywołać i z jakimi argumentami.

**Python**

Użyjemy dekoratora `@server.call_tool` i zaimplementujemy go funkcją `handle_call_tool`. W tej funkcji musimy wyodrębnić nazwę narzędzia, jego argumenty oraz upewnić się, że argumenty są prawidłowe dla danego narzędzia. Możemy weryfikować argumenty tutaj lub później w faktycznym narzędziu.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools to słownik z nazwami narzędzi jako kluczami
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # wywołaj narzędzie
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Oto, co się dzieje:

- Nazwa narzędzia jest już obecna jako parametr wejściowy `name`, podobnie argumenty w słowniku `arguments`.

- Narzędzie wywołujemy tak: `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Walidacja argumentów dzieje się w funkcji `handler`, jeśli się nie uda, zostanie wyrzucony wyjątek.

Mamy więc pełne zrozumienie listowania i wywoływania narzędzi za pomocą serwera niskiego poziomu.

Zobacz pełny przykład [tutaj](./code/README.md)

## Zadanie

Rozszerz dostarczony kod o kilka narzędzi, zasobów i prompt i zastanów się, jak zauważysz, że musisz dodawać pliki tylko w katalogu tools i nigdzie indziej. 

*Brak rozwiązania*

## Podsumowanie

W tym rozdziale zobaczyliśmy, jak działa podejście serwera niskiego poziomu i jak może to pomóc w tworzeniu ładnej architektury, na której możemy dalej budować. Omówiliśmy też walidację i pokazano, jak pracować z bibliotekami walidacyjnymi w celu tworzenia schematów do walidacji wejścia.

## Co dalej

- Dalej: [Prosta autoryzacja](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->