# 🎯 Planlægning & Designmønstre med Azure OpenAI (Responses API) (.NET)

## 📋 Læringsmål

Denne notesbog demonstrerer virksomhedsklare planlægnings- og designmønstre til opbygning af intelligente agenter ved brug af Microsoft Agent Framework i .NET med Azure OpenAI (Responses API). Du vil lære at skabe agenter, der kan nedbryde komplekse problemer, planlægge flerstegs løsninger og udføre avancerede arbejdsgange med .NET's virksomhedsfeatures.

## ⚙️ Forudsætninger & Opsætning

**Udviklingsmiljø:**
- .NET 9.0 SDK eller nyere
- Visual Studio 2022 eller VS Code med C# udvidelse
- Et Azure-abonnement med en Azure OpenAI-ressource og en modeludrulning
- Azure CLI — log ind med `az login`

**Nødvendige afhængigheder:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Miljøkonfiguration (.env-fil):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Kørsel af koden

Denne lektion indeholder en .NET Single File App-implementering. For at køre den:

```bash
# Gør filen eksekverbar (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Kør applikationen
./07-dotnet-agent-framework.cs
```

Eller brug dotnet run-kommandoen:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Kodeimplementering

Den komplette implementering findes i `07-dotnet-agent-framework.cs`, som demonstrerer:

- Indlæsning af miljøkonfiguration med DotNetEnv
- Konfiguration af Azure OpenAI-klienten og skabelse af en AI-agent med `GetChatClient().AsAIAgent()`
- Definition af strukturerede datamodeller (Plan og TravelPlan) med JSON-serialisering
- Oprettelse af en AI-agent med struktureret output ved hjælp af JSON-skema
- Udførelse af planlægningsanmodninger med typesikre svar

## Centrale begreber

### Struktureret planlægning med typesikre modeller

Agenten bruger C# klasser til at definere strukturen for planlægningsoutput:

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

### JSON-skema til strukturerede output

Agenten er konfigureret til at returnere svar, der matcher TravelPlan-skemaet:

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

### Planlægningsagentens instruktioner

Agenten fungerer som koordinator og delegerer opgaver til specialiserede under-agenter:

- FlightBooking: Til booking af flyrejser og levering af flyoplysninger
- HotelBooking: Til booking af hoteller og levering af hoteloplysninger
- CarRental: Til booking af biler og levering af billejeoplysninger
- ActivitiesBooking: Til booking af aktiviteter og levering af aktivitetsoplysninger
- DestinationInfo: Til levering af oplysninger om destinationer
- DefaultAgent: Til håndtering af generelle forespørgsler

## Forventet output

Når du kører agenten med en rejseplanlægningsforespørgsel, vil den analysere anmodningen og generere en struktureret plan med passende opgavefordeling til specialiserede agenter, formateret som JSON i overensstemmelse med TravelPlan-skemaet.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokument er blevet oversat ved hjælp af AI-oversættelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selvom vi bestræber os på nøjagtighed, skal du være opmærksom på, at automatiserede oversættelser kan indeholde fejl eller unøjagtigheder. Det originale dokument på dets oprindelige sprog bør betragtes som den autoritative kilde. For kritisk information anbefales professionel menneskelig oversættelse. Vi påtager os intet ansvar for misforståelser eller fejltolkninger, der opstår som følge af brugen af denne oversættelse.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->