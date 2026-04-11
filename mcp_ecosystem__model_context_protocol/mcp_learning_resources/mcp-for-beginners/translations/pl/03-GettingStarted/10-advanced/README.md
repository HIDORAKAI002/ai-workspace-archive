# Zaawansowane korzystanie z serwera

W MCP SDK mamy dwa różne typy serwerów: zwykły serwer oraz serwer niskopoziomowy. Zwykle korzystasz z regularnego serwera, aby dodawać do niego funkcje. W niektórych przypadkach jednak warto polegać na serwerze niskopoziomowym, na przykład ze względu na:

- Lepszą architekturę. Możliwe jest stworzenie czystej architektury zarówno z regularnym, jak i z niskopoziomowym serwerem, ale można argumentować, że nieco łatwiej jest to osiągnąć za pomocą serwera niskopoziomowego.
- Dostępność funkcji. Niektóre zaawansowane funkcje są dostępne tylko w serwerze niskopoziomowym. Zobaczysz to w dalszych rozdziałach, gdy dodamy próbkowanie i elicytację.

## Regularny serwer vs serwer niskopoziomowy

Tak wygląda tworzenie serwera MCP za pomocą regularnego serwera

**Python**

```python
mcp = FastMCP("Demo")

# Dodaj narzędzie do dodawania
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

Chodzi o to, że jawnie dodajesz każde narzędzie, zasób lub prompt, które chcesz, aby serwer posiadał. W tym nie ma nic złego.  

### Podejście serwera niskopoziomowego

Jednakże, gdy korzystasz z podejścia serwera niskopoziomowego, musisz myśleć o nim inaczej. Zamiast rejestrować każde narzędzie, tworzysz dwie obsługi na typ funkcji (narzędzia, zasoby lub prompt). Na przykład narzędzia mają wtedy tylko dwie funkcje:

- Lista wszystkich narzędzi. Jedna funkcja jest odpowiedzialna za wszystkie próby wylistowania narzędzi.
- Obsługa wywołań wszystkich narzędzi. Tutaj również jest tylko jedna funkcja, która obsługuje wywołanie narzędzia.

Brzmi to jak potencjalnie mniejsza ilość pracy, prawda? Zamiast rejestrować narzędzie, wystarczy upewnić się, że narzędzie jest wymienione podczas listowania wszystkich narzędzi i że jest wywoływane, gdy przychodzi żądanie wywołania narzędzia.

Zobaczmy, jak teraz wygląda kod:

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

Teraz mamy funkcję, która zwraca listę funkcji. Każdy wpis na liście narzędzi ma teraz pola takie jak `name`, `description` oraz `inputSchema`, aby odpowiadać oczekiwanemu typowi zwrotnemu. Pozwala to osadzić definicje narzędzi i funkcji gdzie indziej. Możemy teraz tworzyć wszystkie nasze narzędzia w folderze tools, i to samo dotyczy wszystkich innych funkcji, dzięki czemu projekt może być zorganizowany w ten sposób:

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

Świetnie, nasza architektura może wyglądać bardzo czyściutko.

A co z wywoływaniem narzędzi, czy jest to ten sam pomysł — jeden handler do wywołania dowolnego narzędzia? Tak, dokładnie, oto kod do tego:

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

Jak widać z powyższego kodu, musimy wyodrębnić, które narzędzie należy wywołać i z jakimi argumentami, a następnie przejść do wywołania narzędzia.

## Udoskonalenie podejścia za pomocą walidacji

Do tej pory widziałeś, jak wszystkie twoje rejestracje dodawania narzędzi, zasobów i promptów mogą zostać zastąpione tymi dwoma obsługami na typ funkcji. Co jeszcze musimy zrobić? Powinniśmy dodać jakąś formę walidacji, aby upewnić się, że narzędzia są wywoływane z odpowiednimi argumentami. Każde środowisko ma swoje rozwiązanie, na przykład Python używa Pydantic, a TypeScript używa Zod. Pomysł jest taki, że robimy następujące rzeczy:

- Przenosimy logikę tworzenia funkcji (narzędzia, zasobu lub prompta) do dedykowanego folderu.
- Dodajemy sposób walidowania przychodzącego żądania, które na przykład chce wywołać narzędzie.

### Tworzenie funkcji

Aby stworzyć funkcję, musimy utworzyć dla niej plik i upewnić się, że zawiera obowiązkowe pola wymagane dla tej funkcji. Pola te nieco różnią się między narzędziami, zasobami i promptami.

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
        # Zweryfikuj dane wejściowe za pomocą modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: dodaj Pydantic, żebyśmy mogli stworzyć AddInputModel i zweryfikować argumenty

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Tutaj widać, że robimy następujące rzeczy:

- Tworzymy schemat za pomocą Pydantic `AddInputModel` z polami `a` i `b` w pliku *schema.py*.
- Próbujemy sparsować przychodzące żądanie jako typ `AddInputModel`; jeśli parametry się nie zgadzają, nastąpi awaria:

   ```python
   # add.py
    try:
        # Waliduj dane wejściowe za pomocą modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Możesz zdecydować, czy tę logikę parsowania umieścić bezpośrednio w wywołaniu narzędzia, czy w funkcji obsługi.

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

- W handlerze obsługującym wszystkie wywołania narzędzi próbujemy sparsować przychodzące żądanie do schematu zdefiniowanego przez narzędzie:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    jeśli się uda, przechodzimy do wywołania właściwego narzędzia:

    ```typescript
    const result = await tool.callback(input);
    ```

Jak widzisz, takie podejście tworzy świetną architekturę, ponieważ wszystko ma swoje miejsce, *server.ts* jest bardzo małym plikiem, który tylko podłącza handlery żądań, a każda funkcja znajduje się w swoim folderze, np. tools/, resources/ lub prompts/.

Super, spróbujmy to teraz zbudować.

## Ćwiczenie: Tworzenie serwera niskopoziomowego

W tym ćwiczeniu zrobimy następujące rzeczy:

1. Stworzymy serwer niskopoziomowy obsługujący listowanie narzędzi oraz wywoływanie narzędzi.
1. Zaimplementujemy architekturę, na której będziesz mógł/a budować.
1. Dodamy walidację, aby upewnić się, że wywołania narzędzi są poprawnie weryfikowane.

### -1- Stworzenie architektury

Pierwszą rzeczą jest opracowanie architektury, która pozwoli nam skalować się w miarę dodawania kolejnych funkcji, wygląda ona tak:

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

Teraz mamy skonfigurowaną architekturę, która zapewnia łatwe dodawanie nowych narzędzi w folderze tools. Zachęcam do dodawania również podkatalogów dla zasobów i promptów.

### -2- Tworzenie narzędzia

Zobaczmy, jak wygląda tworzenie narzędzia. Najpierw musi być ono utworzone w swoim podkatalogu *tool*, tak jak tutaj:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Waliduj dane wejściowe za pomocą modelu Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # DO ZROBIENIA: dodaj Pydantic, abyśmy mogli stworzyć AddInputModel i zwalidować argumenty

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Tutaj widzimy, jak definiujemy nazwę, opis oraz schemat wejściowy za pomocą Pydantic oraz handler, który zostanie wywołany, gdy narzędzie zostanie wywołane. Na końcu udostępniamy `tool_add`, który jest słownikiem zawierającym te właściwości.

Jest też *schema.py*, który definiuje schemat wejściowy używany przez nasze narzędzie:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Musimy również wypełnić *__init__.py*, aby katalog tools był traktowany jako moduł. Dodatkowo należy udostępnić moduły w nim w następujący sposób:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Możemy dodawać kolejne importy w tym pliku, gdy dodajemy nowe narzędzia.

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

- name — nazwa narzędzia,
- rawSchema — schemat Zod, używany do walidacji przychodzących żądań wywołania tego narzędzia,
- inputSchema — schemat, z którego korzysta handler,
- callback — funkcja wywołująca narzędzie.

Jest też `Tool`, który służy do konwersji tego słownika na typ akceptowany przez handler serwera MCP i wygląda tak:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

A jest także *schema.ts*, gdzie przechowujemy schematy wejściowe dla każdego narzędzia — tu jest tylko jeden schemat, ale z czasem, gdy dodasz kolejne narzędzia, możesz dodać więcej wpisów:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Świetnie, przejdźmy teraz do obsługi listowania naszych narzędzi.

### -3- Obsługa listowania narzędzi

Kolejnym krokiem jest skonfigurowanie handlera żądań do listowania narzędzi. Oto, co musimy dodać do naszego pliku serwera:

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

Tutaj dodajemy dekorator `@server.list_tools` oraz implementującą funkcję `handle_list_tools`. W niej generujemy listę narzędzi. Zauważ, że każde narzędzie musi posiadać pola name, description i inputSchema.   

**TypeScript**

Aby skonfigurować handlera żądań do listowania narzędzi, musimy wywołać `setRequestHandler` na serwerze z odpowiednim schematem, w tym przypadku `ListToolsRequestSchema`.

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

Świetnie, mamy już rozwiązany fragment listowania narzędzi, teraz zobaczmy, jak wywołujemy narzędzia.

### -4- Obsługa wywołania narzędzia

Aby wywołać narzędzie, konfigurujemy kolejnego handlera żądań, który będzie obsługiwał prośby określające, które narzędzie wywołać i z jakimi argumentami.

**Python**

Użyjemy dekoratora `@server.call_tool` i zaimplementujemy go funkcją `handle_call_tool`. W tej funkcji musimy wyodrębnić nazwę narzędzia, argumenty i upewnić się, że argumenty są poprawne dla danego narzędzia. Walidację argumentów możemy wykonać tutaj lub w samej funkcji narzędzia.

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

Oto co się dzieje:

- Nazwa narzędzia jest już dostępna jako parametr wejściowy `name`, argumenty jako słownik `arguments`.

- Narzędzie jest wywoływane przez `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. Walidacja argumentów odbywa się w funkcji podpiętej w `handler`, jeśli walidacja nie powiedzie się, zostanie zgłoszony wyjątek.

Teraz już mamy pełne pojęcie o listowaniu i wywoływaniu narzędzi za pomocą serwera niskopoziomowego.

Zobacz [pełny przykład](./code/README.md) tutaj

## Zadanie

Rozszerz kod, który otrzymałeś, o kilka narzędzi, zasobów i promptów, i zauważ, że potrzebujesz tylko dodawać pliki w katalogu tools i nigdzie indziej.

*Brak rozwiązania*

## Podsumowanie

W tym rozdziale poznaliśmy działanie podejścia serwera niskopoziomowego i jak może ono pomóc w stworzeniu przejrzystej architektury, na której można dalej budować. Omówiliśmy też walidację i pokazano, jak korzystać z bibliotek walidacyjnych do tworzenia schematów do sprawdzania poprawności danych wejściowych.

## Co dalej

- Następny: [Prosta autoryzacja](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Dokument ten został przetłumaczony za pomocą usługi tłumaczeń AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do jak największej dokładności, prosimy mieć na uwadze, że automatyczne tłumaczenia mogą zawierać błędy lub nieścisłości. Oryginalny dokument w oryginalnym języku powinien być uznawany za źródło autorytatywne. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonane przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z korzystania z tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->