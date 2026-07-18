# 🎯 Planning & Ontwerppatronen met Azure OpenAI (Responses API) (.NET)

## 📋 Leerdoelen

Deze notebook demonstreert enterprise-grade planning- en ontwerppatronen voor het bouwen van intelligente agenten met behulp van het Microsoft Agent Framework in .NET met Azure OpenAI (Responses API). Je leert agenten maken die complexe problemen kunnen ontleden, meerstapsoplossingen kunnen plannen en geavanceerde workflows kunnen uitvoeren met de enterprise-functies van .NET.

## ⚙️ Vereisten & Installatie

**Ontwikkelomgeving:**
- .NET 9.0 SDK of hoger
- Visual Studio 2022 of VS Code met C# extensie
- Een Azure-abonnement met een Azure OpenAI-resource en een modelimplementatie
- De Azure CLI — inloggen met `az login`

**Benodigde afhankelijkheden:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Omgevingsconfiguratie (.env bestand):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Code uitvoeren

Deze les bevat een .NET Single File App-implementatie. Om deze uit te voeren:

```bash
# Maak het bestand uitvoerbaar (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Voer de applicatie uit
./07-dotnet-agent-framework.cs
```

Of gebruik de dotnet run opdracht:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Code-implementatie

De volledige implementatie is beschikbaar in `07-dotnet-agent-framework.cs`, die demonstreert:

- Laden van omgevingsconfiguratie met DotNetEnv
- Configureren van de Azure OpenAI-client en het creëren van een AI-agent met `GetChatClient().AsAIAgent()`
- Definiëren van gestructureerde datamodellen (Plan en TravelPlan) met JSON-serialisatie
- Creëren van een AI-agent met gestructureerde output via JSON-schema
- Uitvoeren van planningsverzoeken met type-veilige responses

## Kernconcepten

### Gestructureerde Planning met Type-Veilige Modellen

De agent gebruikt C#-klassen om de structuur van planningsuitvoer te definiëren:

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

### JSON-schema voor Gestructureerde Outputs

De agent is geconfigureerd om responses terug te geven die overeenkomen met het TravelPlan-schema:

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

### Instructies voor de Planning Agent

De agent fungeert als coördinator en delegeert taken aan gespecialiseerde sub-agenten:

- FlightBooking: Voor het boeken van vluchten en het verstrekken van vluchtinformatie
- HotelBooking: Voor het boeken van hotels en het verstrekken van hotelinformatie
- CarRental: Voor het huren van auto's en het verstrekken van autoverhuurinformatie
- ActivitiesBooking: Voor het boeken van activiteiten en het verstrekken van informatie over activiteiten
- DestinationInfo: Voor het verstrekken van informatie over bestemmingen
- DefaultAgent: Voor het afhandelen van algemene verzoeken

## Verwachte Output

Wanneer je de agent uitvoert met een reislingsverzoek, zal hij het verzoek analyseren en een gestructureerd plan genereren met passende taaktoewijzingen aan gespecialiseerde agenten, geformatteerd als JSON conform het TravelPlan-schema.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->