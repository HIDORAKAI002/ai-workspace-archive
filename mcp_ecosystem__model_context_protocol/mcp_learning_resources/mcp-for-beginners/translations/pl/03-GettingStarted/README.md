## Pierwsze kroki  

[![Rozpocznij swój pierwszy serwer MCP](../../../translated_images/pl/04.0ea920069efd979a.webp)](https://youtu.be/sNDZO9N4m9Y)

_(Kliknij powyższy obraz, aby obejrzeć wideo z tej lekcji)_

Ta sekcja składa się z kilku lekcji:

- **1 Twój pierwszy serwer**, w tej pierwszej lekcji nauczysz się, jak utworzyć swój pierwszy serwer i zbadać go za pomocą narzędzia inspektora, cennego sposobu testowania i debugowania serwera, [do lekcji](01-first-server/README.md)

- **2 Klient**, w tej lekcji nauczysz się pisać klienta, który może połączyć się z twoim serwerem, [do lekcji](02-client/README.md)

- **3 Klient z LLM**, jeszcze lepszym sposobem pisania klienta jest dodanie do niego LLM, aby mógł "negocjować" z twoim serwerem, co zrobić, [do lekcji](03-llm-client/README.md)

- **4 Konsumpcja trybu agenta GitHub Copilot dla serwera w Visual Studio Code**. Tutaj patrzymy na uruchamianie naszego serwera MCP z poziomu Visual Studio Code, [do lekcji](04-vscode/README.md)

- **5 Serwer transportu stdio** stdio transport jest zalecanym standardem komunikacji lokalnej serwera MCP z klientem, oferując bezpieczną komunikację z podprocesami i wbudowaną izolację procesów [do lekcji](05-stdio-server/README.md)

- **6 HTTP Streaming z MCP (Streamable HTTP)**. Dowiedz się o nowoczesnym przesyłaniu strumieniowym HTTP (zalecanym podejściu do serwerów MCP zdalnych wg [Specyfikacji MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/#streamable-http)), powiadomieniach o postępie oraz jak implementować skalowalne serwery i klientów MCP w czasie rzeczywistym, używając Streamable HTTP. [do lekcji](06-http-streaming/README.md)

- **7 Wykorzystanie zestawu narzędzi AI dla VSCode** do konsumowania i testowania klientów i serwerów MCP [do lekcji](07-aitk/README.md)

- **8 Testowanie**. Skupimy się tutaj szczególnie na różnych sposobach testowania naszego serwera i klienta, [do lekcji](08-testing/README.md)

- **9 Wdrażanie**. Ten rozdział omawia różne sposoby wdrażania twoich rozwiązań MCP, [do lekcji](09-deployment/README.md)

- **10 Zaawansowane użycie serwera**. Ten rozdział obejmuje zaawansowane techniki korzystania z serwera, [do lekcji](./10-advanced/README.md)

- **11 Uwierzytelnianie**. Ten rozdział pokazuje, jak dodać proste uwierzytelnianie, od Basic Auth po użycie JWT i RBAC. Zaleca się zacząć tutaj, a następnie przejść do Tematów Zaawansowanych w Rozdziale 5 i wykonać dodatkowe zabezpieczenia zgodnie z zaleceniami w Rozdziale 2, [do lekcji](./11-simple-auth/README.md)

- **12 Hosty MCP**. Konfiguruj i korzystaj z popularnych klientów hostów MCP, w tym Claude Desktop, Cursor, Cline i Windsurf. Naucz się typów transportu i rozwiązywania problemów, [do lekcji](./12-mcp-hosts/README.md)

- **13 Inspektor MCP**. Debuguj i testuj swoje serwery MCP interaktywnie za pomocą narzędzia MCP Inspector. Naucz się rozwiązywania problemów, zasobów i komunikatów protokołu, [do lekcji](./13-mcp-inspector/README.md)

- **14 Sampling**. Twórz serwery MCP, które współpracują z klientami MCP w zadaniach związanych z LLM (przestarzałe w wydaniu kandydata `2026-07-28`; nadal aktualne dla `2025-11-25`). [do lekcji](./14-sampling/README.md)

- **15 Aplikacje MCP**. Buduj serwery MCP, które również odpowiadają instrukcjami UI, [do lekcji](./15-mcp-apps/README.md)

Protokół Model Context (MCP) to otwarty protokół standaryzujący sposób, w jaki aplikacje dostarczają kontekst do LLM. Można myśleć o MCP jak o porcie USB-C dla aplikacji AI — zapewnia standardowy sposób łączenia modeli AI z różnymi źródłami danych i narzędziami.

## Cele nauki

Po zakończeniu tej lekcji będziesz potrafił:

- Skonfigurować środowiska programistyczne dla MCP w C#, Java, Python, TypeScript i JavaScript
- Budować i wdrażać podstawowe serwery MCP z niestandardowymi funkcjami (zasoby, podpowiedzi i narzędzia)
- Tworzyć aplikacje hostujące, które łączą się z serwerami MCP
- Testować i debugować implementacje MCP
- Rozumieć powszechne wyzwania związane z konfiguracją oraz ich rozwiązania
- Łączyć swoje implementacje MCP z popularnymi usługami LLM

## Konfiguracja środowiska MCP

Zanim zaczniesz pracę z MCP, ważne jest przygotowanie środowiska deweloperskiego i zrozumienie podstawowego przepływu pracy. Ta sekcja przeprowadzi Cię przez początkowe kroki konfiguracji, aby zapewnić płynny start z MCP.

### Wymagania wstępne

Przed rozpoczęciem programowania MCP upewnij się, że masz:

- **Środowisko programistyczne**: dla wybranego języka (C#, Java, Python, TypeScript lub JavaScript)
- **IDE/Edytor**: Visual Studio, Visual Studio Code, IntelliJ, Eclipse, PyCharm lub dowolny nowoczesny edytor kodu
- **Menedżery pakietów**: NuGet, Maven/Gradle, pip lub npm/yarn
- **Klucze API**: dla dowolnych usług AI, które planujesz używać w swoich aplikacjach hostujących


### Oficjalne SDK

W nadchodzących rozdziałach zobaczysz rozwiązania budowane przy użyciu Python, TypeScript, Java i .NET. Oto wszystkie oficjalnie wspierane SDK.

MCP udostępnia oficjalne SDK dla wielu języków (zgodnie z [Specyfikacją MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/)):
- [C# SDK](https://github.com/modelcontextprotocol/csharp-sdk) - Utrzymywane we współpracy z Microsoft
- [Java SDK](https://github.com/modelcontextprotocol/java-sdk) - Utrzymywane we współpracy ze Spring AI
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - Oficjalna implementacja TypeScript
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk) - Oficjalna implementacja Python (FastMCP)
- [Kotlin SDK](https://github.com/modelcontextprotocol/kotlin-sdk) - Oficjalna implementacja Kotlin
- [Swift SDK](https://github.com/modelcontextprotocol/swift-sdk) - Utrzymywane we współpracy z Loopwork AI
- [Rust SDK](https://github.com/modelcontextprotocol/rust-sdk) - Oficjalna implementacja Rust
- [Go SDK](https://github.com/modelcontextprotocol/go-sdk) - Oficjalna implementacja Go

## Kluczowe wnioski

- Konfiguracja środowiska programistycznego MCP jest prosta dzięki SDK specyficznym dla języków
- Budowa serwerów MCP polega na tworzeniu i rejestrowaniu narzędzi z wyraźnymi schematami
- Klienci MCP łączą się z serwerami i modelami, aby wykorzystać rozszerzone możliwości
- Testowanie i debugowanie są niezbędne dla niezawodnych implementacji MCP
- Opcje wdrożenia obejmują od lokalnego rozwoju po rozwiązania chmurowe

## Ćwiczenia praktyczne

Mamy zestaw przykładów, które uzupełniają ćwiczenia, które zobaczysz we wszystkich rozdziałach tej sekcji. Dodatkowo każdy rozdział ma też własne ćwiczenia i zadania

- [Kalkulator Java](./samples/java/calculator/README.md)
- [Kalkulator .Net](../../../03-GettingStarted/samples/csharp)
- [Kalkulator JavaScript](./samples/javascript/README.md)
- [Kalkulator TypeScript](./samples/typescript/README.md)
- [Kalkulator Python](../../../03-GettingStarted/samples/python)

## Dodatkowe zasoby

- [Budowanie Agentów używając Protokołu Model Context na Azure](https://learn.microsoft.com/azure/developer/ai/intro-agents-mcp)
- [Zdalny MCP z Azure Container Apps (Node.js/TypeScript/JavaScript)](https://learn.microsoft.com/samples/azure-samples/mcp-container-ts/mcp-container-ts/)
- [.NET OpenAI MCP Agent](https://learn.microsoft.com/samples/azure-samples/openai-mcp-agent-dotnet/openai-mcp-agent-dotnet/)

## Co dalej

Zacznij od pierwszej lekcji: [Tworzenie twojego pierwszego serwera MCP](01-first-server/README.md)

Po ukończeniu tego modułu kontynuuj: [Moduł 4: Praktyczna Implementacja](../04-PracticalImplementation/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->