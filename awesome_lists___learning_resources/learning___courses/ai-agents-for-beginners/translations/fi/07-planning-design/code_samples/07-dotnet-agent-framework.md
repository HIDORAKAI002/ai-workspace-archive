# 🎯 Suunnittelu ja Design-mallit Azure OpenAI:n kanssa (Responses API) (.NET)

## 📋 Oppimistavoitteet

Tämä muistikirja demonstroi yritystason suunnittelu- ja design-malleja älykkäiden agenttien rakentamiseen Microsoft Agent Frameworkin avulla .NET:ssä ja Azure OpenAI:lla (Responses API). Opit luomaan agentteja, jotka voivat purkaa monimutkaisia ongelmia, suunnitella monivaiheisia ratkaisuja ja suorittaa kehittyneitä työnkulkuja .NET:n yritysominaisuuksilla.

## ⚙️ Esivaatimukset ja asennus

**Kehitysympäristö:**
- .NET 9.0 SDK tai uudempi
- Visual Studio 2022 tai VS Code C#-laajennuksella
- Azure-tilaus, jossa on Azure OpenAI -resurssi ja mallin käyttöönotto
- Azure CLI — kirjaudu sisään komennolla `az login`

**Vaaditut riippuvuudet:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Ympäristökonfiguraatio (.env-tiedosto):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Koodin suoritus

Tämä oppitunti sisältää .NET Single File App -toteutuksen. Aja se näin:

```bash
# Tee tiedostosta suoritettava (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Käynnistä sovellus
./07-dotnet-agent-framework.cs
```

Tai käytä komentoa dotnet run:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Koodin toteutus

Täysi toteutus löytyy tiedostosta `07-dotnet-agent-framework.cs`, joka demonstroi:

- Ympäristökonfiguraation lataamisen DotNetEnv-kirjastolla
- Azure OpenAI -asiakkaan konfiguroinnin ja AI-agentin luomisen käyttämällä `GetChatClient().AsAIAgent()`
- Rakenteellisten tietomallien (Plan ja TravelPlan) määrittelyn JSON-serialisoinnilla
- Rakenteellisen ulostulon AI-agentin luomisen JSON-skenen avulla
- Suunnittelupyyntöjen suorittamisen tyyppiä turvaavin vastauksin

## Keskeiset käsitteet

### Rakenteellinen suunnittelu tyyppiä turvaavilla malleilla

Agentti käyttää C#-luokkia määrittämään suunnittelun ulostulojen rakenteen:

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

### JSON-skenaari rakenteellisille ulostuloille

Agentti on konfiguroitu palauttamaan vastauksia, jotka vastaavat TravelPlan-skenaariota:

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

### Suunnitteluagentin ohjeet

Agentti toimii koordinaattorina, jakaen tehtäviä erikoistuneille ala-agenteille:

- FlightBooking: Lentojen varaamiseen ja lentotietojen tarjoamiseen
- HotelBooking: Hotellien varaamiseen ja hotellitietojen tarjoamiseen
- CarRental: Autovuokrauksen varaamiseen ja autonvuokraustietojen tarjoamiseen
- ActivitiesBooking: Aktiviteettien varaamiseen ja aktiviteettitietojen tarjoamiseen
- DestinationInfo: Kohdetietojen tarjoamiseen
- DefaultAgent: Yleisten pyyntöjen hoitamiseen

## Odotettu tulos

Kun ajat agenttia matkan suunnittelupyyntöä varten, se analysoi pyynnön ja luo rakenteellisen suunnitelman sopivilla tehtävien kohdistuksilla erikoistuneille agenteille, JSON-muotoon TravelPlan-skenaarion mukaisesti.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->