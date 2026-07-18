# 🎯 Azure OpenAI (Responses API) (.NET) के साथ योजना और डिजाइन पैटर्न

## 📋 सीखने के लक्ष्य

यह नोटबुक .NET में Microsoft Agent Framework का उपयोग करके Azure OpenAI (Responses API) के साथ बुद्धिमान एजेंट बनाने के लिए एंटरप्राइज़-ग्रेड योजना और डिजाइन पैटर्न दिखाता है। आप ऐसे एजेंट बनाना सीखेंगे जो जटिल समस्याओं को विभाजित कर सकें, बहु-चरण समाधान योजना बना सकें, और .NET के एंटरप्राइज़ फीचर्स के साथ परिष्कृत वर्कफ़्लो को निष्पादित कर सकें।

## ⚙️ आवश्यकताएँ और सेटअप

**डेवलपमेंट पर्यावरण:**
- .NET 9.0 SDK या इससे ऊपर
- Visual Studio 2022 या C# एक्सटेंशन के साथ VS Code
- Azure OpenAI संसाधन और मॉडल डिप्लॉयमेंट के साथ Azure सब्सक्रिप्शन
- Azure CLI — `az login` से साइन इन करें

**आवश्यक डिपेंडेंसियाँ:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**पर्यावरण विन्यास (.env फ़ाइल):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## कोड चलाना

इस पाठ में .NET सिंगल फ़ाइल ऐप का कार्यान्वयन शामिल है। इसे चलाने के लिए:

```bash
# फ़ाइल को निष्पादन योग्य बनाएं (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# एप्लिकेशन चलाएं
./07-dotnet-agent-framework.cs
```

या dotnet run कमांड का उपयोग करें:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## कोड कार्यान्वयन

संपूर्ण कार्यान्वयन `07-dotnet-agent-framework.cs` में उपलब्ध है, जो दिखाता है:

- DotNetEnv के साथ पर्यावरण विन्यास लोड करना
- Azure OpenAI क्लाइंट को कॉन्फ़िगर करना और `GetChatClient().AsAIAgent()` का उपयोग करके AI एजेंट बनाना
- JSON सीरियलाइजेशन के साथ संरचित डेटा मॉडल (Plan और TravelPlan) परिभाषित करना
- JSON स्कीमा का उपयोग करके संरचित आउटपुट के साथ AI एजेंट बनाना
- प्रकार-सुरक्षित प्रतिक्रियाओं के साथ योजना अनुरोध निष्पादित करना

## मुख्य अवधारणाएँ

### प्रकार-सुरक्षित मॉडलों के साथ संरचित योजना

एजेंट योजना आउटपुट की संरचना को परिभाषित करने के लिए C# क्लासेस का उपयोग करता है:

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

### संरचित आउटपुट के लिए JSON स्कीमा

एजेंट TravelPlan स्कीमा से मेल खाने वाले प्रतिक्रियाएँ लौटाने के लिए कॉन्फ़िगर किया गया है:

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

### योजना एजेंट निर्देश

एजेंट एक समन्वयक की तरह कार्य करता है, विशेष उप-एजेंटों को कार्य सौंपता है:

- FlightBooking: उड़ानें बुक करने और उड़ान जानकारी प्रदान करने के लिए
- HotelBooking: होटल बुकिंग और होटल जानकारी प्रदान करने के लिए
- CarRental: कार बुकिंग और कार किराया जानकारी प्रदान करने के लिए
- ActivitiesBooking: गतिविधियाँ बुक करने और गतिविधि जानकारी प्रदान करने के लिए
- DestinationInfo: गंतव्यों के बारे में जानकारी प्रदान करने के लिए
- DefaultAgent: सामान्य अनुरोधों को संभालने के लिए

## अपेक्षित आउटपुट

जब आप यात्रा योजना अनुरोध के साथ एजेंट चलाएंगे, तो यह अनुरोध का विश्लेषण करेगा और एक संरचित योजना बनाएगा जिसमें उपयुक्त कार्य असाइनमेंट विशेष एजेंटों को JSON स्वरूप में देगा जो TravelPlan स्कीमा के अनुरूप होगा।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->