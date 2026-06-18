# Serwer MCP z transportem stdio

> **⚠️ Ważna aktualizacja**: Od specyfikacji MCP 2025-06-18 samodzielny transport SSE (Server-Sent Events) został **wycofany** i zastąpiony transportem "Streamable HTTP". Obecna specyfikacja MCP definiuje dwa podstawowe mechanizmy transportowe:
> 1. **stdio** - standardowe wejście/wyjście (zalecane dla serwerów lokalnych)
> 2. **Streamable HTTP** - dla serwerów zdalnych, które mogą używać SSE wewnętrznie
>
> Ta lekcja została zaktualizowana, aby skupić się na **transporcie stdio**, który jest zalecanym podejściem dla większości implementacji serwerów MCP.

Transport stdio pozwala serwerom MCP na komunikację z klientami za pomocą standardowych strumieni wejścia i wyjścia. Jest to najczęściej używany i zalecany mechanizm transportowy w aktualnej specyfikacji MCP, oferujący prosty i efektywny sposób budowania serwerów MCP, które można łatwo integrować z różnymi aplikacjami klienckimi.

## Przegląd

Ta lekcja omawia, jak budować i korzystać z serwerów MCP przy użyciu transportu stdio.

## Cele nauki

Po zakończeniu tej lekcji będziesz potrafił:

- Zbudować serwer MCP korzystając z transportu stdio.
- Debugować serwer MCP za pomocą Inspektora.
- Konsumować serwer MCP używając Visual Studio Code.
- Zrozumieć aktualne mechanizmy transportu MCP i dlaczego stdio jest zalecane.


## Transport stdio - Jak to działa

Transport stdio jest jednym z dwóch obsługiwanych typów transportu w aktualnej specyfikacji MCP (2025-11-25). Oto jak działa:

- **Prosta komunikacja**: Serwer odczytuje komunikaty JSON-RPC ze standardowego wejścia (`stdin`) i wysyła komunikaty do standardowego wyjścia (`stdout`).
- **Model oparty na procesach**: Klient uruchamia serwer MCP jako podproces.
- **Format wiadomości**: Komunikaty to pojedyncze żądania, powiadomienia lub odpowiedzi JSON-RPC, oddzielone znakami nowej linii.
- **Logowanie**: Serwer MOŻE pisać ciągi UTF-8 do standardowego błędu (`stderr`) w celach logowania.

### Kluczowe wymagania:
- Komunikaty MUSZĄ być oddzielone znakami nowej linii i NIE MOGĄ zawierać wbudowanych znaków nowej linii
- Serwer NIE MOŻE pisać do `stdout` niczego, co nie jest poprawnym komunikatem MCP
- Klient NIE MOŻE pisać do `stdin` serwera niczego, co nie jest poprawnym komunikatem MCP

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

W powyższym kodzie:

- Importujemy klasę `Server` i `StdioServerTransport` z MCP SDK
- Tworzymy instancję serwera z podstawową konfiguracją i możliwościami
- Tworzymy instancję `StdioServerTransport` i łączymy z nią serwer, umożliwiając komunikację przez stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Utwórz instancję serwera
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

W powyższym kodzie:

- Tworzymy instancję serwera używając MCP SDK
- Definiujemy narzędzia za pomocą dekoratorów
- Używamy menadżera kontekstu stdio_server do obsługi transportu

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

Kluczowa różnica względem SSE polega na tym, że serwery stdio:

- Nie wymagają konfiguracji serwera WWW ani punktów końcowych HTTP
- Są uruchamiane jako podprocesy przez klienta
- Komunikują się przez strumienie stdin/stdout
- Są prostsze do implementacji i debugowania

## Ćwiczenie: Tworzenie serwera stdio

Aby stworzyć nasz serwer, musimy mieć na uwadze dwie rzeczy:

- Musimy użyć serwera WWW do udostępniania punktów końcowych do połączeń i komunikatów.
## Laboratorium: Tworzenie prostego serwera MCP stdio

W tym laboratorium stworzymy prosty serwer MCP używając zalecanego transportu stdio. Ten serwer udostępni narzędzia, które klienci mogą wywoływać zgodnie ze standardowym Modelem Protokółu Kontekstowego.

### Wymagania wstępne

- Python 3.8 lub nowszy
- MCP Python SDK: `pip install mcp`
- Podstawowa znajomość programowania asynchronicznego

Zacznijmy od stworzenia naszego pierwszego serwera MCP stdio:

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Skonfiguruj logowanie
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Utwórz serwer
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
    # Użyj transportu stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Kluczowe różnice w stosunku do wycofanego podejścia SSE

**Transport Stdio (obecny standard):**
- Prosty model podprocesu - klient uruchamia serwer jako proces potomny
- Komunikacja przez stdin/stdout używając komunikatów JSON-RPC
- Brak wymogu konfiguracji serwera HTTP
- Lepsza wydajność i bezpieczeństwo
- Łatwiejsze debugowanie i rozwój

**Transport SSE (wycofany od MCP 2025-06-18):**
- Wymagany serwer HTTP z punktami końcowymi SSE
- Bardziej skomplikowana konfiguracja z infrastrukturą serwera WWW
- Dodatkowe wymagania dotyczące bezpieczeństwa punktów końcowych HTTP
- Zastąpiony przez Streamable HTTP dla scenariuszy webowych

### Tworzenie serwera z transportem stdio

Aby stworzyć nasz serwer stdio, musimy:

1. **Zaimportować wymagane biblioteki** - potrzebujemy komponentów serwera MCP oraz transportu stdio
2. **Stworzyć instancję serwera** - zdefiniować serwer ze swoimi możliwościami
3. **Zdefiniować narzędzia** - dodać funkcjonalności, które chcemy udostępnić
4. **Skonfigurować transport** - ustawić komunikację stdio
5. **Uruchomić serwer** - rozpocząć działanie serwera i obsługę komunikatów

Budujmy to krok po kroku:

### Krok 1: Utworzenie podstawowego serwera stdio

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Skonfiguruj logowanie
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Utwórz serwer
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

### Krok 2: Dodanie narzędzi

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

### Krok 3: Uruchamianie serwera

Zapisz kod jako `server.py` i uruchom go z linii komend:

```bash
python server.py
```

Serwer wystartuje i będzie oczekiwał na wejście ze standardowego wejścia (stdin). Komunikuje się używając komunikatów JSON-RPC przez transport stdio.

### Krok 4: Testowanie za pomocą Inspektora

Możesz przetestować swój serwer używając MCP Inspector:

1. Zainstaluj Inspektora: `npx @modelcontextprotocol/inspector`
2. Uruchom Inspektora i wskaż go na swój serwer
3. Testuj utworzone narzędzia

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```
## Debugowanie serwera stdio

### Korzystanie z MCP Inspector

MCP Inspector to przydatne narzędzie do debugowania i testowania serwerów MCP. Oto jak używać go z serwerem stdio:

1. **Zainstaluj Inspektora**:
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Uruchom Inspektora**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Testuj swój serwer**: Inspektor oferuje interfejs webowy, w którym możesz:
   - Przeglądać możliwości serwera
   - Testować narzędzia z różnymi parametrami
   - Monitorować komunikaty JSON-RPC
   - Debugować problemy z połączeniem

### Korzystanie z VS Code

Możesz też debugować swój serwer MCP bezpośrednio w VS Code:

1. Utwórz konfigurację uruchomienia w `.vscode/launch.json`:
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

2. Ustaw punkty przerwania w kodzie serwera
3. Uruchom debuger i testuj za pomocą Inspektora

### Typowe wskazówki do debugowania

- Używaj `stderr` do logowania - nigdy nie pisz do `stdout`, ponieważ jest zarezerwowane dla komunikatów MCP
- Upewnij się, że wszystkie komunikaty JSON-RPC są oddzielone znakami nowej linii
- Najpierw testuj proste narzędzia przed dodaniem złożonych funkcji
- Używaj Inspektora, aby zweryfikować format komunikatów

## Konsumowanie serwera stdio w VS Code

Po zbudowaniu serwera MCP stdio możesz zintegrować go z VS Code, aby używać go z Claude lub innymi klientami zgodnymi z MCP.

### Konfiguracja

1. **Utwórz plik konfiguracyjny MCP** w `%APPDATA%\Claude\claude_desktop_config.json` (Windows) lub `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

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

2. **Uruchom ponownie Claude**: Zamknij i otwórz ponownie Claude, aby załadować nową konfigurację serwera.

3. **Przetestuj połączenie**: Rozpocznij rozmowę z Claude i spróbuj użyć narzędzi swojego serwera:
   - "Czy możesz przywitać mnie za pomocą narzędzia powitalnego?"
   - "Oblicz sumę 15 i 27"
   - "Jakie są informacje o serwerze?"

### Przykład serwera stdio w TypeScript

Oto pełny przykład w TypeScript do odniesienia:

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

// Dodaj narzędzia
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

### Przykład serwera stdio w .NET

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

## Podsumowanie

W tej zaktualizowanej lekcji nauczyłeś się:

- Budować serwery MCP używając obecnego **transportu stdio** (zalecane podejście)
- Zrozumieć, dlaczego transport SSE został wycofany na rzecz stdio i Streamable HTTP
- Tworzyć narzędzia, które mogą być wywoływane przez klientów MCP
- Debugować swój serwer za pomocą MCP Inspector
- Integrować swój serwer stdio z VS Code i Claude

Transport stdio zapewnia prostszy, bezpieczniejszy i wydajniejszy sposób budowania serwerów MCP w porównaniu do wycofanego podejścia SSE. Jest to zalecany transport dla większości implementacji serwerów MCP zgodnie ze specyfikacją z dnia 2025-06-18.


### .NET

1. Najpierw stwórzmy kilka narzędzi, do tego utworzymy plik *Tools.cs* z następującą zawartością:

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```

## Ćwiczenie: Testowanie serwera stdio

Teraz, gdy stworzyłeś serwer stdio, przetestujmy go, aby upewnić się, że działa poprawnie.

### Wymagania wstępne

1. Upewnij się, że masz zainstalowany MCP Inspector:
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Kod serwera powinien być zapisany (np. jako `server.py`)

### Testowanie z Inspektorem

1. **Uruchom Inspektora z Twoim serwerem**:
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Otwórz interfejs webowy**: Inspektor otworzy okno przeglądarki pokazujące możliwości Twojego serwera.

3. **Testuj narzędzia**:
   - Wypróbuj narzędzie `get_greeting` z różnymi imionami
   - Testuj narzędzie `calculate_sum` z różnymi liczbami
   - Wywołaj narzędzie `get_server_info`, aby zobaczyć metadane serwera

4. **Monitoruj komunikację**: Inspektor pokazuje komunikaty JSON-RPC wymieniane między klientem a serwerem.

### Co powinieneś zobaczyć

Gdy serwer wystartuje poprawnie, powinieneś zobaczyć:
- Wypisane możliwości serwera w Inspektorze
- Dostępne narzędzia do testowania
- Udane wymiany komunikatów JSON-RPC
- Odpowiedzi narzędzi wyświetlane w interfejsie

### Typowe problemy i rozwiązania

**Serwer nie startuje:**
- Sprawdź, czy wszystkie zależności są zainstalowane: `pip install mcp`
- Zweryfikuj składnię i wcięcia w Pythonie
- Sprawdź komunikaty błędów w konsoli

**Narzędzia się nie pojawiają:**
- Upewnij się, że dekoratory `@server.tool()` są obecne
- Sprawdź, czy funkcje narzędzi są zdefiniowane przed `main()`
- Upewnij się, że serwer jest poprawnie skonfigurowany

**Problemy z połączeniem:**
- Upewnij się, że serwer korzysta poprawnie z transportu stdio
- Sprawdź, czy nie ma innych procesów zakłócających
- Zweryfikuj składnię polecenia Inspektora

## Zadanie

Spróbuj rozbudować swój serwer o więcej funkcjonalności. Zobacz [tę stronę](https://api.chucknorris.io/), aby na przykład dodać narzędzie wywołujące API. Decyzja o tym, jak ma wyglądać serwer, należy do Ciebie. Miłej zabawy :)
## Rozwiązanie

[Rozwiązanie](./solution/README.md) Oto możliwe rozwiązanie z działającym kodem.

## Kluczowe wnioski

Kluczowe wnioski z tego rozdziału to:

- Transport stdio jest zalecanym mechanizmem dla lokalnych serwerów MCP.
- Transport stdio umożliwia płynną komunikację pomiędzy serwerami MCP i klientami, używając standardowych strumieni wejścia i wyjścia.
- Możesz bezpośrednio korzystać z Inspektora oraz Visual Studio Code, aby konsumować serwery stdio, co ułatwia debugowanie i integrację.

## Przykłady

- [Java Kalkulator](../samples/java/calculator/README.md)
- [.Net Kalkulator](../../../../03-GettingStarted/samples/csharp)
- [JavaScript Kalkulator](../samples/javascript/README.md)
- [TypeScript Kalkulator](../samples/typescript/README.md)
- [Python Kalkulator](../../../../03-GettingStarted/samples/python) 

## Dodatkowe zasoby

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Co dalej

## Kolejne kroki

Teraz, gdy nauczyłeś się budować serwery MCP z transportem stdio, możesz zgłębiać bardziej zaawansowane tematy:

- **Następne**: [HTTP Streaming z MCP (Streamable HTTP)](../06-http-streaming/README.md) - Poznaj inny obsługiwany mechanizm transportu dla serwerów zdalnych
- **Zaawansowane**: [Najlepsze praktyki w zakresie bezpieczeństwa MCP](../../02-Security/README.md) - Wdrażaj zabezpieczenia w swoich serwerach MCP
- **Produkcja**: [Strategie wdrażania](../09-deployment/README.md) - Wdróż swoje serwery do użytku produkcyjnego

## Dodatkowe zasoby

- [Specyfikacja MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Oficjalna specyfikacja
- [Dokumentacja MCP SDK](https://github.com/modelcontextprotocol/sdk) - Referencje SDK dla wszystkich języków
- [Przykłady społeczności](../../06-CommunityContributions/README.md) - Więcej przykładów serwerów od społeczności

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->