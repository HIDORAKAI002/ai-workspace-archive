# 🎯 Azure OpenAI (Responses API) सह नियोजन आणि डिझाईन पॅटर्न (.NET)

## 📋 शिकण्याची उद्दिष्टे

हा नोटबुक Microsoft Agent Framework सह .NET मध्ये Azure OpenAI (Responses API) वापरून बुद्धिमान एजंट तयार करण्यासाठी एंटरप्राइझ-ग्रेड नियोजन आणि डिझाईन पॅटर्न दाखवतो. आपण असे एजंट तयार करायला शिकाल जे जटिल समस्या विखुरू शकतात, मल्टी-स्टेप उपाय नियोजित करू शकतात आणि .NET च्या एंटरप्राइझ वैशिष्ट्यांसह प्रगत वर्कफ्लो कार्यान्वित करू शकतात.

## ⚙️ पूर्वतयारी आणि सेटअप

**विकास वातावरण:**
- .NET 9.0 SDK किंवा त्याहून उच्च
- Visual Studio 2022 किंवा C# विस्तारासह VS Code
- Azure OpenAI संसाधन आणि मॉडेल डिप्लॉयमेंट असलेले Azure सदस्यत्व
- Azure CLI — `az login` वापरून साइन इन करा

**आवश्यक अवलंबनीयता:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**पर्यावरण कॉन्फिगरेशन (.env फाइल):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## कोड चालविणे

या धड्यात .NET सिंगल फाइल अॅपची अंमलबजावणी दिली आहे. ते चालविण्यासाठी:

```bash
# फाइल एक्सिक्युटेबल करा (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# अनुप्रयोग चालवा
./07-dotnet-agent-framework.cs
```

किंवा dotnet run कमांड वापरा:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## कोड अंमलबजावणी

संपूर्ण अंमलबजावणी `07-dotnet-agent-framework.cs` मध्ये उपलब्ध आहे, ज्यामध्ये दाखवले आहे:

- DotNetEnv सह पर्यावरण कॉन्फिगरेशन लोड करणे
- Azure OpenAI क्लायंट कॉन्फिगर करणे आणि `GetChatClient().AsAIAgent()` वापरून AI एजंट तयार करणे
- JSON serialization सह संरचित डेटा मॉडेल्स (Plan आणि TravelPlan) परिभाषित करणे
- JSON स्कीमाचा वापर करून संरचित आउटपुटसह AI एजंट तयार करणे
- टाइप-सेफ प्रतिसादांसह नियोजन विनंत्या कार्यान्वित करणे

## मुख्य संकल्पना

### टाइप-सेफ मॉडेल्ससह संरचित नियोजन

एजंट नियोजन आउटपुटचा संरचना परिभाषित करण्यासाठी C# वर्गांचा वापर करतो:

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

### संरचित आउटपुटसाठी JSON स्कीमा

एजंटला TravelPlan स्कीमाशी जुळणारे प्रतिसाद परत करण्यासाठी कॉन्फिगर केले आहे:

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

### नियोजन एजंट निर्देश

एजंट एक समन्वयक म्हणून काम करतो, विशिष्ट उप-एजंटना कार्य नियुक्त करून:

- FlightBooking: फ्लाइट बुकिंग आणि फ्लाइट माहिती पुरविण्यासाठी
- HotelBooking: हॉटेल बुकिंग आणि हॉटेल माहिती पुरविण्यासाठी
- CarRental: कार भाड्याने देणे आणि कार भाड्याबाबत माहिती पुरविण्यासाठी
- ActivitiesBooking: क्रियाकलाप बुकिंग आणि माहिती पुरविण्यासाठी
- DestinationInfo: स्थळांबाबत माहिती पुरविण्यासाठी
- DefaultAgent: सामान्य विनंत्या हाताळण्यासाठी

## अपेक्षित आउटपुट

जेव्हा आपण प्रवास नियोजन विनंतीसह एजंट चालवाल, तेव्हा तो विनंतीचे विश्लेषण करेल आणि विशिष्ट एजंटना कार्य वाटपांसह संरचित योजना तयार करेल, जी TravelPlan स्कीमाच्या अनुरूप JSON स्वरूपात असेल.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->