# 🎯 ਏਜ਼ਯੂਰ ਓਪਨਏਆਈ (Responses API) ਨਾਲ ਯੋਜਨਾ ਬਣਾੳਣ ਅਤੇ ਡਿਜ਼ਾਈਨ ਪੈਟਰਨ (.NET)

## 📋 ਸਿੱਖਣ ਦੇ ਉਦਦੇਸ਼

ਇਹ ਨੋਟਬੁੱਕ .NET ਵਿੱਚ ਏਜ਼ਯੂਰ ਓਪਨਏਆਈ (Responses API) ਨਾਲ ਮਾਈਕ੍ਰੋਸਾਫਟ ਏਜੰਟ ਫ੍ਰੇਮਵਰਕ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇੰਟੈਲੀਜੈਂਟ ਏਜੰਟ ਬਣਾਉਣ ਲਈ ਏंटरਪ੍ਰਾਈਜ਼-ਗਰੇਡ ਯੋਜਨਾ ਅਤੇ ਡਿਜ਼ਾਈਨ ਪੈਟਰਨ ਦਿਖਾਉਂਦਾ ਹੈ। ਤੁਸੀਂ ਅਜਿਹੇ ਏਜੰਟ ਬਣਾਉਣ ਸਿੱਖੋਗੇ ਜੋ ਕੁਠਿੱਲ ਸਮੱਸਿਆਵਾਂ ਨੂੰ ਟੁਕੜਿਆਂ ਵਿੱਚ ਵੰਡ ਸਕਦੇ ਹਨ, ਕਈ ਕਦਮੀ ਹੱਲ ਯੋਜਨਾ ਬਣਾ ਸਕਦੇ ਹਨ ਅਤੇ .NET ਦੇ ਏंटरਪ੍ਰਾਈਜ਼ ਫੀਚਰਾਂ ਨਾਲ ਜਟਿਲ ਵਰਕਫਲੋਜ਼ ਚਲਾ ਸਕਦੇ ਹਨ।

## ⚙️ ਜ਼ਰੂਰੀ ਸ਼ਰਤਾਂ ਅਤੇ ਸੈਟਅਪ

**ਡਿਵੈਲਪਮੈਂਟ ਇNvਾਇਰਨਮੈਂਟ:**
- .NET 9.0 SDK ਜਾਂ ਇਸ ਤੋਂ ਉੱਚਾ
- Visual Studio 2022 ਜਾਂ C# ਐਕਸਟੈਂਸ਼ਨ ਨਾਲ VS ਕੋਡ
- ਏਜ਼ਯੂਰ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਜਿਸ ਵਿੱਚ ਏਜ਼ਯੂਰ ਓਪਨਏਆਈ ਸਰੋਤ ਅਤੇ ਮਾਡਲ ਡਿਪਲੌਇਮੈਂਟ ਹੋਵੇ
- ਏਜ਼ਯੂਰ CLI — `az login` ਨਾਲ ਸਾਇਨ ਇਨ ਕਰੋ

**ਜ਼ਰੂਰੀ Dependencies:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**ਇNvਾਇਰਨਮੈਂਟ ਕਾਨਫਿਗਰੇਸ਼ਨ (.env ਫ਼ਾਈਲ):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## ਕੋਡ ਚਲਾਉਣਾ

ਇਸ ਪਾਠ ਵਿੱਚ .NET ਸਿੰਗਲ ਫ਼ਾਈਲ ਐਪ ਦਾ ਕਾਰਜਕਾਰੀ ਕੋਡ ਸ਼ਾਮਿਲ ਹੈ। ਇਸ ਨੂੰ ਚਲਾਉਣ ਲਈ:

```bash
# ਫਾਈਲ ਨੂੰ ਚਾਲੂਯੋਗ ਬਣਾਓ (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# ਐਪਲੀਕੇਸ਼ਨ ਚਲਾਓ
./07-dotnet-agent-framework.cs
```

ਜਾ ਡੌਟਨੈੱਟ ਰਨ ਕਮਾਂਡ ਦੀ ਵਰਤੋਂ ਕਰੋ:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## ਕੋਡ ਕਾਰਜਕਾਰੀਕਰਨ

ਪੂਰਾ ਕਾਰਜ `07-dotnet-agent-framework.cs` ਵਿੱਚ ਉਪਲਬਧ ਹੈ, ਜੋ ਇਹ ਦਰਸਾਉਂਦਾ ਹੈ:

- DotNetEnv ਨਾਲ ਇNvਾਇਰਨਮੈਂਟ ਕਾਨਫਿਗਰੇਸ਼ਨ ਲੋਡ ਕਰਨਾ
- ਏਜ਼ਯੂਰ ਓਪਨਏਆਈ ਕਲਾਇੰਟ ਕਾਨਫਿਗਰ ਕਰਕੇ ਅਤੇ `GetChatClient().AsAIAgent()` ਦੁਆਰਾ ਏਆਈ ਏਜੰਟ ਬਣਾਉਣਾ
- JSON ਸੀਰੀਅਲਾਈਜ਼ੇਸ਼ਨ ਵਾਲੇ ਸੰਰਚਿਤ ਡੇਟਾ ਮਾਡਲ (Plan ਅਤੇ TravelPlan) ਤਿਆਰ ਕਰਨਾ
- JSON ਸਕੀਮਾ ਨਾਲ ਸੰਰਚਿਤ ਆਉਟਪੁੱਟ ਵਾਲਾ ਏਆਈ ਏਜੰਟ ਬਣਾਉਣਾ
- ਟਾਈਪ-ਸੇਫ਼ ਜਵਾਬਾਂ ਵਾਲੀਆਂ ਯੋਜਨਾ ਬਨਾਉਣ ਬੇਨਤੀਆਂ ਨੂੰ ਅਮਲ ਵਿੱਚ ਲਿਆਉਣਾ

## ਮੁੱਖ ਧਾਰਣਾ

### ਟਾਈਪ-ਸੇਫ ਮਾਡਲਾਂ ਨਾਲ ਸੰਰਚਿਤ ਯੋਜਨਾ ਬਣਾਉਣਾ

ਏਜੰਟ ਯੋਜਨਾ ਬਣਾਉਣ ਵਾਲੇ ਆਉਟਪੁੱਟ ਦੀ ਬਣਾਵਟ ਨੂੰ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ C# ਕਲਾਸਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ:

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

### ਸੰਰਚਿਤ ਆਉਟਪੁੱਟ ਲਈ JSON ਸਕੀਮਾ

ਏਜੰਟ ਨਾਲ TravelPlan ਸਕੀਮਾ ਅਨੁਕੂਲ ਜਵਾਬ ਦਿੱਤੇ ਜਾਣ ਲਈ ਕਾਨਫਿਗਰ ਕਰਦਾ ਹੈ:

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

### ਯੋਜਨਾ ਬਣਾਉਣ ਵਾਲੇ ਏਜੰਟ ਲਈ ਹਦਾਇਤਾਂ

ਏਜੰਟ ਕੋਆਰਡੀਨੇਟਰ ਵਜੋਂ ਕੰਮ ਕਰਦਾ ਹੈ, ਵਿਸ਼ੇਸ਼ਕੱਲਤਿ ਸਬ-ਏਜੰਟਾਂ ਨੂੰ ਕਾਰਜ ਸੌਂਪਦਾ ਹੈ:

- FlightBooking: ਉਡਾਣਾਂ ਦੀ ਬੁਕਿੰਗ ਅਤੇ ਉਡਾਣ ਜਾਣਕਾਰੀ ਦੇਣ ਲਈ
- HotelBooking: ਹੋਟਲ ਬੁਕਿੰਗ ਅਤੇ ਜਾਣਕਾਰੀ ਦੇਣ ਲਈ
- CarRental: ਕਾਰਾਂ ਦੀ ਬੁਕਿੰਗ ਅਤੇ ਰੈਂਟਲ ਜਾਣਕਾਰੀ ਦੇਣ ਲਈ
- ActivitiesBooking: ਸਰਗਰਮੀਆਂ ਦੀ ਬੁਕਿੰਗ ਅਤੇ ਜਾਣਕਾਰੀ ਦੇਣ ਲਈ
- DestinationInfo: ਮੰਜ਼ਿਲਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ ਦੇਣ ਲਈ
- DefaultAgent: ਆਮ ਬੇਨਤੀਆਂ ਨੂੰ ਸੰਭਾਲਣ ਲਈ

## ਉਮੀਦ ਕੀਤੀ ਨਤੀਜਾ

ਜਦੋਂ ਤੁਸੀਂ ਯਾਤਰਾ ਯੋਜਨਾ ਬਨਾਉਣ ਵਾਲੀ ਬੇਨਤੀ ਨਾਲ ਏਜੰਟ ਚਲਾਉਂਦੇ ਹੋ, ਤਾਂ ਇਹ ਬੇਨਤੀ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਕੇ ਸੰਰਚਿਤ ਯੋਜਨਾ ਬਣਾਉਂਦਾ ਹੈ ਜਿਸ ਵਿੱਚ ਵਿਸ਼ੇਸ਼ ਏਜੰਟਾਂ ਨੂੰ موزੂ ਕਾਰਜ ਸਮਰਪਿਤ ਹੁੰਦੇ ਹਨ, ਜਿਹੜਾ TravelPlan ਸਕੀਮਾ ਅਨੁਕੂਲ JSON ਵਜੋਂ ਫਾਰਮੈਟ ਕੀਤਾ ਹੁੰਦਾ ਹੈ।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->