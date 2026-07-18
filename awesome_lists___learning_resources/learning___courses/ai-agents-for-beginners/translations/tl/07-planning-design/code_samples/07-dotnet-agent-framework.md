# 🎯 Pagpaplano at Mga Disenyong Pattern gamit ang Azure OpenAI (Responses API) (.NET)

## 📋 Mga Layunin sa Pagkatuto

Ipinapakita ng notebook na ito ang enterprise-grade na pagpaplano at mga disenyong pattern para sa pagbuo ng mga intelihenteng ahente gamit ang Microsoft Agent Framework sa .NET kasama ang Azure OpenAI (Responses API). Matututuhan mong gumawa ng mga ahenteng maaaring magdekomponer ng mga komplikadong problema, magplano ng mga solusyong may maraming hakbang, at magpatupad ng mga sopistikadong workflow gamit ang mga enterprise na tampok ng .NET.

## ⚙️ Mga Kinakailangan at Pagsasaayos

**Kapaligiran para sa Pagpapaunlad:**
- .NET 9.0 SDK o mas mataas
- Visual Studio 2022 o VS Code na may C# extension
- Isang Azure subscription na may Azure OpenAI resource at deployment ng modelo
- Ang Azure CLI — mag-sign in gamit ang `az login`

**Kinakailangang Dependencies:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Kokonfigurasyon ng Kapaligiran (.env file):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Pagpapatakbo ng Code

Kasama sa araling ito ang isang .NET Single File App implementation. Upang patakbuhin ito:

```bash
# Gawing executable ang file (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Patakbuhin ang aplikasyon
./07-dotnet-agent-framework.cs
```

O gamitin ang utos na dotnet run:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Implementasyon ng Code

Makikita ang buong implementasyon sa `07-dotnet-agent-framework.cs`, na nagpapakita ng:

- Pag-load ng environment configuration gamit ang DotNetEnv
- Pagko-configure ng Azure OpenAI client at paggawa ng AI agent gamit ang `GetChatClient().AsAIAgent()`
- Pagde-define ng mga structured data model (Plan at TravelPlan) gamit ang JSON serialization
- Paglikha ng AI agent na may structured output gamit ang JSON schema
- Pagpapatupad ng mga planning request na may type-safe na mga tugon

## Mga Pangunahing Konsepto

### Structured Planning gamit ang Type-Safe na Model

Ginagamit ng ahente ang mga klase sa C# para tukuyin ang istruktura ng mga output ng plano:

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

### JSON Schema para sa Structured Outputs

Nakakonpigura ang ahente para magbalik ng mga tugon na tumutugma sa TravelPlan schema:

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

### Mga Tagubilin sa Planning Agent

Gumaganap ang ahente bilang coordinator, na nagtatalaga ng mga gawain sa mga espesyalistang sub-agent:

- FlightBooking: Para sa pag-book ng mga flight at pagbibigay ng impormasyon tungkol sa flight
- HotelBooking: Para sa pag-book ng mga hotel at pagbibigay ng impormasyon tungkol sa hotel
- CarRental: Para sa pag-book ng mga sasakyan at pagbibigay ng impormasyon tungkol sa car rental
- ActivitiesBooking: Para sa pag-book ng mga aktibidad at pagbibigay ng impormasyon tungkol sa mga aktibidad
- DestinationInfo: Para sa pagbibigay ng impormasyon tungkol sa mga destinasyon
- DefaultAgent: Para sa paghawak ng mga pangkalahatang kahilingan

## Inaasahang Output

Kapag pinatakbo mo ang ahente gamit ang kahilingan sa pagpaplano ng paglalakbay, susuriin nito ang kahilingan at gagawa ng isang istrukturadong plano na may angkop na pagtatalaga ng mga gawain sa mga espesyalistang ahente, na nakaayos bilang JSON na sumusunod sa schema ng TravelPlan.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->