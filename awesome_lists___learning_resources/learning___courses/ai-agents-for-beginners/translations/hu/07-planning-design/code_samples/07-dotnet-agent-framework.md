# 🎯 Tervezés és tervezési minták Azure OpenAI-val (Responses API) (.NET)

## 📋 Tanulási célok

Ez a jegyzetfüzet vállalati szintű tervezési és mintázati megoldásokat mutat be intelligens ügynökök létrehozásához a Microsoft Agent Framework és Azure OpenAI (Responses API) .NET környezetben történő használatával. Megtanulod, hogyan hozz létre olyan ügynököket, amelyek képesek összetett problémákat lebontani, többlépéses megoldásokat tervezni és bonyolult munkafolyamatokat végrehajtani .NET vállalati funkcionalitásokkal.

## ⚙️ Előfeltételek és beállítás

**Fejlesztői környezet:**
- .NET 9.0 SDK vagy újabb
- Visual Studio 2022 vagy VS Code C# kiterjesztéssel
- Egy Azure előfizetés Azure OpenAI erőforrással és modell telepítéssel
- Az Azure CLI — jelentkezz be `az login` paranccsal

**Szükséges függőségek:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Környezeti konfiguráció (.env fájl):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## A kód futtatása

Ez a lecke tartalmaz egy .NET Single File App megvalósítást. A futtatáshoz:

```bash
# Tegye futtathatóvá a fájlt (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Futtassa az alkalmazást
./07-dotnet-agent-framework.cs
```

Vagy használd a dotnet run parancsot:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Kód megvalósítása

A teljes megvalósítás megtalálható a `07-dotnet-agent-framework.cs` fájlban, amely bemutatja:

- A környezeti konfiguráció betöltését DotNetEnv segítségével
- Az Azure OpenAI kliens konfigurálását és egy AI ügynök létrehozását a `GetChatClient().AsAIAgent()` használatával
- Strukturált adatmodellek definiálását (Plan és TravelPlan) JSON szerializációval
- Egy AI ügynök létrehozását strukturált kimenettel JSON sémával
- Tervezési lekérdezések végrehajtását típusbiztos válaszokkal

## Főbb fogalmak

### Strukturált tervezés típusbiztos modellekkel

Az ügynök C# osztályokat használ a tervezési kimenetek szerkezetének meghatározására:

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

### JSON séma a strukturált kimenetekhez

Az ügynök úgy van konfigurálva, hogy olyan válaszokat adjon vissza, amelyek megfelelnek a TravelPlan sémának:

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

### Tervezési ügynök utasításai

Az ügynök koordinátorként működik, és feladatokat delegál szakosodott alügynököknek:

- FlightBooking: repülőjegyek foglalásáért és repülőjárat-információk szolgáltatásáért felelős
- HotelBooking: szállodafoglalásokért és szállodainformációkért felelős
- CarRental: autóbérlésért és autókölcsönzési információkért felelős
- ActivitiesBooking: programok foglalásáért és programinformációkért felelős
- DestinationInfo: úti célokkal kapcsolatos információk szolgáltatásáért felelős
- DefaultAgent: általános lekérdezések kezeléséért felelős

## Várt kimenet

Amikor a tervezési kéréssel futtatod az ügynököt, elemezni fogja a kérést, majd létrehoz egy strukturált tervet a megfelelő feladatkiosztással a szakosodott ügynökök számára, JSON formátumban a TravelPlan séma szerint.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->