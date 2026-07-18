# 🎯 Planowanie i wzorce projektowe z Azure OpenAI (API Responses) (.NET)

## 📋 Cele nauki

Ten notes pokazuje korporacyjne wzorce planowania i projektowania do tworzenia inteligentnych agentów za pomocą Microsoft Agent Framework w .NET z Azure OpenAI (API Responses). Nauczysz się tworzyć agentów, którzy potrafią rozkładać skomplikowane problemy, planować wieloetapowe rozwiązania oraz wykonywać zaawansowane przepływy pracy z wykorzystaniem funkcji korporacyjnych .NET.

## ⚙️ Wymagania wstępne i konfiguracja

**Środowisko programistyczne:**
- .NET 9.0 SDK lub wyższy
- Visual Studio 2022 lub VS Code z rozszerzeniem C#
- Subskrypcja Azure z zasobem Azure OpenAI i wdrożonym modelem
- Azure CLI — zaloguj się za pomocą `az login`

**Wymagane zależności:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Konfiguracja środowiska (plik .env):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Uruchamianie kodu

Lekcja zawiera implementację aplikacji .NET Single File. Aby ją uruchomić:

```bash
# Uczyń plik wykonalnym (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Uruchom aplikację
./07-dotnet-agent-framework.cs
```

Lub użyj polecenia dotnet run:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Implementacja kodu

Kompletna implementacja jest dostępna w `07-dotnet-agent-framework.cs`, która demonstruje:

- Ładowanie konfiguracji środowiska za pomocą DotNetEnv
- Konfigurowanie klienta Azure OpenAI i tworzenie agenta AI używając `GetChatClient().AsAIAgent()`
- Definiowanie strukturalnych modeli danych (Plan i TravelPlan) z serializacją JSON
- Tworzenie agenta AI ze strukturą wyjścia zgodną ze schematem JSON
- Wykonywanie zapytań planistycznych z typowanymi odpowiedziami

## Kluczowe pojęcia

### Strukturalne planowanie z modelami typowanymi

Agent używa klas C# do definiowania struktury wyników planowania:

```csharp
public class Plan
{
    [JsonPropertyName("assigned_agent")]
    public string? Assigned_agent { get; set; }

    [JsonPropertyName("task_details")]
    public string? Task_details { get; set; }
}

public class TravelPlan
{
    [JsonPropertyName("main_task")]
    public string? Main_task { get; set; }

    [JsonPropertyName("subtasks")]
    public IList<Plan> Subtasks { get; set; }
}
```

### Schemat JSON dla strukturalnych wyników

Agent jest skonfigurowany do zwracania odpowiedzi zgodnych ze schematem TravelPlan:

```csharp
ChatClientAgentOptions agentOptions = new()
{
    Name = AGENT_NAME,
    Description = AGENT_INSTRUCTIONS,
    ChatOptions = new()
    {
        ResponseFormat = ChatResponseFormatJson.ForJsonSchema(
            schema: AIJsonUtilities.CreateJsonSchema(typeof(TravelPlan)),
            schemaName: "TravelPlan",
            schemaDescription: "Travel Plan with main_task and subtasks")
    }
};
```

### Instrukcje dla agenta planującego

Agent działa jako koordynator, delegując zadania wyspecjalizowanym podagentom:

- FlightBooking: do rezerwacji lotów i udzielania informacji o lotach
- HotelBooking: do rezerwacji hoteli i udzielania informacji o hotelach
- CarRental: do rezerwacji samochodów i udzielania informacji o wypożyczalniach samochodów
- ActivitiesBooking: do rezerwacji atrakcji i udzielania informacji o atrakcjach
- DestinationInfo: do udzielania informacji o destynacjach
- DefaultAgent: do obsługi ogólnych zapytań

## Oczekiwany wynik

Po uruchomieniu agenta z zapytaniem o planowanie podróży, przeanalizuje ono żądanie i wygeneruje strukturalny plan z właściwymi przypisaniami zadań do wyspecjalizowanych agentów, sformatowany jako JSON zgodny ze schematem TravelPlan.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->