# 🎯 Mipango & Mifumo ya Ubunifu na Azure OpenAI (Responses API) (.NET)

## 📋 Malengo ya Kujifunza

Daftari hili linaonyesha mifumo ya mipango na ubunifu ya kiwango cha shirika kwa kuunda mawakala wa akili kwa kutumia Microsoft Agent Framework katika .NET na Azure OpenAI (Responses API). Utajifunza kuunda mawakala ambao wanaweza kuvunja matatizo magumu, kupanga suluhisho za hatua nyingi, na kutekeleza michakato tata kwa kutumia sifa za shirika za .NET.

## ⚙️ Mahitaji na Usanidi

**Mazingira ya Maendeleo:**
- .NET 9.0 SDK au zaidi
- Visual Studio 2022 au VS Code yenye kiendelezi cha C#
- Usajili wa Azure una rasilimali ya Azure OpenAI na usambazaji wa modeli
- Azure CLI — ingia kwa kutumia `az login`

**Mategemeo Yanayohitajika:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Marekebisho ya Mazingira (.env file):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Kukimbia Msimbo

Somo hili linajumuisha utekelezaji wa Programu Moja ya Faili (.NET Single File App). Ili kuikimbia:

```bash
# Fanya faili iwe inayoendeshwa (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Endesha programu
./07-dotnet-agent-framework.cs
```

Au tumia amri ya dotnet run:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Utekelezaji wa Msimbo

Utekelezaji kamili upo katika `07-dotnet-agent-framework.cs`, unaoonyesha:

- Kupakia marekebisho ya mazingira kwa kutumia DotNetEnv
- Kusanidi mteja wa Azure OpenAI na kuunda wakala wa AI kwa kutumia `GetChatClient().AsAIAgent()`
- Kufafanua mifano ya data iliyopangwa (Plan na TravelPlan) kwa serialization ya JSON
- Kuunda wakala wa AI mwenye pato lililopangwa kwa kutumia schema ya JSON
- Kutekeleza maombi ya mipango pamoja na majibu salama kwa aina

## Misingi Muhimu

### Mipango Iliyo Pangiliwa kwa Modeli Salama Kwa Aina

Wakala hutumia darasa za C# kubainisha muundo wa matokeo ya mipango:

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

### Schema ya JSON kwa Matokeo Yaliyo Pangiliwa

Wakala amesanidiwa kurudisha majibu yanayolingana na schema ya TravelPlan:

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

### Maelekezo ya Wakala wa Mipango

Wakala hufanya kazi kama mratibu, akigawa majukumu kwa mawakala maalum:

- Booking ya Ndege: Kwa kuandaa tiketi za ndege na kutoa habari za ndege
- Booking ya Hoteli: Kwa kujaza hoteli na kutoa habari za hoteli
- Kusaidia Kodi ya Gari: Kwa kuangalia magari na kutoa taarifa za kukodi gari
- Booking ya Shughuli: Kwa kupanga shughuli na kutoa taarifa za shughuli
- Taarifa za Maeneo: Kwa kutoa taarifa kuhusu maeneo
- Wakala wa Default: Kwa kushughulikia maombi ya jumla

## Matokeo Yanayotarajiwa

Unapomfanya wakala kufanya ombi la kupanga safari, atachambua ombi hilo na kutengeneza mpango uliopangwa na ugawaji wa kazi kwa mawakala maalum, uliotumwa kama JSON inayofuata schema ya TravelPlan.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->