# Konfiguracja popularnych klientów hostujących MCP

Ten przewodnik opisuje, jak skonfigurować i używać serwery MCP z popularnymi aplikacjami hostującymi AI. Każdy host ma swoje własne podejście do konfiguracji, ale po skonfigurowaniu wszystkie komunikują się z serwerami MCP za pomocą ustandaryzowanego protokołu.

## Co to jest host MCP?

**Host MCP** to aplikacja AI, która może łączyć się z serwerami MCP, aby rozszerzyć swoje możliwości. Można to traktować jako "interfejs użytkownika", z którym użytkownicy wchodzą w interakcję, podczas gdy serwery MCP dostarczają "zaplecze" z narzędziami i danymi.

```mermaid
flowchart LR
    User[👤 Użytkownik] --> Host[🖥️ Gospodarz MCP]
    Host --> S1[Serwer MCP A]
    Host --> S2[Serwer MCP B]
    Host --> S3[Serwer MCP C]
    
    subgraph "Popularni gospodarze"
        H1[Claude Desktop]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Wymagania wstępne

- Serwer MCP, z którym się połączysz (zobacz [Moduł 3.1 - Pierwszy serwer](../01-first-server/README.md))
- Aplikacja hosta zainstalowana na twoim systemie
- Podstawowa znajomość plików konfiguracyjnych JSON

---

## 1. Claude Desktop

**Claude Desktop** to oficjalna aplikacja desktopowa Anthropic, która natywnie wspiera MCP.

### Instalacja

1. Pobierz Claude Desktop z [claude.ai/download](https://claude.ai/download)  
2. Zainstaluj i zaloguj się na swoje konto Anthropic

### Konfiguracja

Claude Desktop korzysta z pliku konfiguracyjnego JSON do definiowania serwerów MCP.

**Lokalizacja pliku konfiguracyjnego:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Przykład konfiguracji:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Opcje konfiguracji

| Pole | Opis | Przykład |
|-------|-------------|---------|
| `command` | Wykonywalny program do uruchomienia | `"python"`, `"node"`, `"npx"` |
| `args` | Argumenty wiersza poleceń | `["-m", "my_server"]` |
| `env` | Zmienne środowiskowe | `{"API_KEY": "xxx"}` |
| `cwd` | Katalog roboczy | `"/path/to/server"` |

### Testowanie konfiguracji

1. Zapisz plik konfiguracyjny  
2. Całkowicie zrestartuj Claude Desktop (zamknij i otwórz ponownie)  
3. Otwórz nową rozmowę  
4. Szukaj ikony 🔌 wskazującej podłączone serwery  
5. Spróbuj poprosić Claude’a o użycie jednego z twoich narzędzi

### Rozwiązywanie problemów z Claude Desktop

**Serwer się nie pojawia:**  
- Sprawdź składnię pliku konfiguracyjnego za pomocą walidatora JSON  
- Upewnij się, że ścieżka do komendy jest poprawna  
- Sprawdź logi Claude Desktop: Pomoc → Pokaż logi

**Serwer zawiesza się przy uruchomieniu:**  
- Przetestuj serwer ręcznie w terminalu najpierw  
- Sprawdź, czy zmienne środowiskowe są poprawnie ustawione  
- Upewnij się, że wszystkie zależności są zainstalowane

---

## 2. VS Code z GitHub Copilot

VS Code wspiera MCP poprzez rozszerzenia GitHub Copilot Chat.

### Wymagania wstępne

1. Zainstalowany VS Code w wersji 1.99 lub nowszej  
2. Zainstalowane rozszerzenie GitHub Copilot  
3. Zainstalowane rozszerzenie GitHub Copilot Chat

### Konfiguracja

VS Code używa pliku `.vscode/mcp.json` w przestrzeni roboczej lub ustawieniach użytkownika.

**Konfiguracja przestrzeni roboczej** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**Ustawienia użytkownika** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### Używanie MCP w VS Code

1. Otwórz panel Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)  
2. Wpisz `@`, aby zobaczyć dostępne narzędzia MCP  
3. Użyj naturalnego języka, aby wywołać narzędzia: "Calculate 25 * 48 using the calculator"

### Rozwiązywanie problemów z VS Code

**Serwery MCP się nie ładują:**  
- Sprawdź panel Wyjścia → "MCP" pod kątem logów błędów  
- Przeładuj okno: Ctrl+Shift+P → "Developer: Reload Window"  
- Zweryfikuj, czy serwer działa samodzielnie najpierw

---

## 3. Cursor

**Cursor** to edytor kodu zorientowany na AI z wbudowanym wsparciem MCP.

### Instalacja

1. Pobierz Cursor z [cursor.sh](https://cursor.sh)  
2. Zainstaluj i zaloguj się

### Konfiguracja

Cursor używa podobnego formatu konfiguracji jak Claude Desktop.

**Lokalizacja pliku konfiguracyjnego:**
- **macOS**: `~/.cursor/mcp.json`  
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`  
- **Linux**: `~/.cursor/mcp.json`

**Przykład konfiguracji:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Używanie MCP w Cursor

1. Otwórz czat AI w Cursor (Ctrl+L / Cmd+L)  
2. Narzędzia MCP pojawią się automatycznie w sugestiach  
3. Poproś AI o wykonanie zadań z podłączonymi serwerami

---

## 4. Cline (w terminalu)

**Cline** to klient MCP działający w terminalu, idealny do pracy z wierszem poleceń.

### Instalacja

```bash
npm install -g @anthropic/cline
```

### Konfiguracja

Cline używa zmiennych środowiskowych i argumentów wiersza poleceń.

**Użycie zmiennych środowiskowych:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Użycie argumentów wiersza poleceń:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Plik konfiguracyjny** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Używanie Cline

```bash
# Rozpocznij sesję interaktywną
cline

# Pojedyncze zapytanie z MCP
cline "Calculate the square root of 144 using the calculator"

# Wymień dostępne narzędzia
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** to kolejny edytor kodu wspierany przez AI z obsługą MCP.

### Instalacja

1. Pobierz Windsurf z [codeium.com/windsurf](https://codeium.com/windsurf)  
2. Zainstaluj i utwórz konto

### Konfiguracja

Konfiguracja Windsurf jest zarządzana przez UI ustawień:

1. Otwórz Ustawienia (Ctrl+, / Cmd+,)  
2. Wyszukaj "MCP"  
3. Kliknij "Edytuj w settings.json"

**Przykład konfiguracji:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## Porównanie typów transportu

Różne hosty obsługują różne mechanizmy transportowe:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (standardowe wejście/wyjście): najlepsze dla lokalnych serwerów uruchamianych przez hosta  
**SSE/HTTP**: najlepsze dla serwerów zdalnych lub współdzielonych między wieloma klientami

---

## Typowe problemy i ich rozwiązania

### Serwer nie uruchamia się

1. **Najpierw przetestuj serwer ręcznie:**  
   ```bash
   # Dla Pythona
   python -m your_server_module
   
   # Dla Node.js
   node /path/to/server/index.js
   ```
  
2. **Sprawdź ścieżkę do komendy:**  
   - Używaj ścieżek bezwzględnych, jeśli to możliwe  
   - Upewnij się, że wykonywalny plik jest w twojej ścieżce PATH

3. **Zweryfikuj zależności:**  
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```
  
### Serwer łączy się, ale narzędzia nie działają

1. **Sprawdź logi serwera** - Większość hostów ma opcje logowania  
2. **Zweryfikuj rejestrację narzędzi** - Użyj MCP Inspector do testów  
3. **Sprawdź uprawnienia** - Niektóre narzędzia wymagają dostępu do plików/sieci

### Zmienne środowiskowe nie są przekazywane

- Niektóre hosty czyszczą zmienne środowiskowe  
- Używaj jawnie pola `env` w konfiguracji  
- Unikaj przechowywania poufnych danych w plikach konfiguracyjnych (używaj zarządzania sekretami)

---

## Najlepsze praktyki bezpieczeństwa

1. **Nigdy nie umieszczaj kluczy API** w plikach konfiguracyjnych  
2. **Używaj zmiennych środowiskowych** dla wrażliwych danych  
3. **Ogranicz uprawnienia serwera** tylko do niezbędnych  
4. **Przeglądaj kod serwera** przed przyznaniem dostępu do swojego systemu  
5. **Używaj list dozwolonych** dla dostępu do systemu plików i sieci

---

## Co dalej

- [3.13 - Debugowanie za pomocą MCP Inspector](../13-mcp-inspector/README.md)  
- [3.1 - Utwórz swój pierwszy serwer MCP](../01-first-server/README.md)  
- [Moduł 5 - Tematy zaawansowane](../../05-AdvancedTopics/README.md)

---

## Dodatkowe zasoby

- [Dokumentacja MCP Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)  
- [Rozszerzenie MCP dla VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)  
- [Specyfikacja MCP - Transporty](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)  
- [Oficjalny rejestr serwerów MCP](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:  
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczeń AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mimo że dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub nieścisłości. Oryginalny dokument w języku źródłowym powinien być uważany za źródło wiarygodne. W przypadku ważnych informacji zaleca się skorzystanie z profesjonalnego tłumaczenia przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->