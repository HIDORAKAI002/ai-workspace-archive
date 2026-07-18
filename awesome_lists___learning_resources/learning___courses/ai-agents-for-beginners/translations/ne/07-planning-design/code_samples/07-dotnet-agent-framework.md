# 🎯 Azure OpenAI (Responses API) सँग योजना र डिजाइन ढाँचा (.NET)  

## 📋 सिकाइका उद्देश्यहरू  

यो नोटबुकले Azure OpenAI (Responses API) सँग .NET मा Microsoft Agent Framework प्रयोग गरेर बुद्धिमान एजेन्टहरू निर्माण गर्नका लागि उद्यम-ग्रेड योजना र डिजाइन ढाँचाहरू देखाउँछ। तपाईंले एजेन्टहरू कसरी जटिल समस्याहरूलाई तोडफोड गर्ने, बहु-चरण समाधानहरूको योजना बनाउने, र .NET का उद्यम सुविधाहरू प्रयोग गरेर जटिल कार्यप्रवाह सञ्चालन गर्ने सिक्नुहुनेछ।  

## ⚙️ पूर्वआवश्यकताहरू र सेटअप  

**विकास वातावरण:**  
- .NET 9.0 SDK वा माथि  
- Visual Studio 2022 वा C# एक्सटेन्सन सहित VS Code  
- Azure OpenAI स्रोत र मोडेल डिप्लोयमेन्ट सहित Azure सदस्यता  
- Azure CLI — `az login` प्रयोग गरी साइन इन गर्नुहोस्  

**आवश्यक निर्भरता:**  
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```
  
**पर्यावरण कन्फिगरेसन (.env फाइल):**  
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```
  
## कोड चलाउने तरिका  

यो पाठमा .NET सिंगल फाइल एप इम्प्लिमेन्टेसन समावेश गरिएको छ। चलाउनका लागि:  

```bash
# फाइललाई चलाउन मिल्ने बनाउनुहोस् (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# एप्लिकेसन चलाउनुहोस्
./07-dotnet-agent-framework.cs
```
  
वा dotnet run कमाण्ड प्रयोग गर्नुहोस्:  

```bash
dotnet run 07-dotnet-agent-framework.cs
```
  
## कोड इम्प्लिमेन्टेसन  

पूर्ण इम्प्लिमेन्टेसन `07-dotnet-agent-framework.cs` मा उपलब्ध छ, जसले देखाउँछ:  

- DotNetEnv प्रयोग गरी वातावरण कन्फिगरेसन लोड गर्नु  
- Azure OpenAI क्लाइन्ट सेटअप गर्नु र `GetChatClient().AsAIAgent()` प्रयोग गरी AI एजेन्ट बनाउनु  
- JSON सिरियलाइजेसन सहित संरचित डाटा मोडेलहरू (Plan र TravelPlan) परिभाषित गर्नु  
- JSON स्कीमा प्रयोग गरी संरचित आउटपुट सहित AI एजेन्ट सिर्जना गर्नु  
- टाइप-सेफ प्रतिक्रियाहरू सहित योजना अनुरोधहरू कार्यान्वयन गर्नु  

## प्रमुख अवधारणाहरू  

### टाइप-सेफ मोडेलहरूसँग संरचित योजना  

एजेन्टले योजना आउटपुटको संरचना परिभाषित गर्न C# क्लासहरू प्रयोग गर्दछ:  

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
  
### संरचित आउटपुटका लागि JSON स्कीमा  

एजेन्टले TravelPlan स्कीमासँग मेल खाने प्रतिक्रियाहरू फर्काउन कन्फिगर गरिएको छ:  

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
  
### योजना एजेन्ट निर्देशनहरू  

एजेन्टले समन्वयकर्ताको रूपमा काम गर्दछ, विशेष प्रकारका उप-एजेन्टहरूलाई कार्यहरू सुम्पिन्छ:  

- FlightBooking: उडान बुकिङ र उडान जानकारीका लागि  
- HotelBooking: होटेल बुकिङ र होटेल जानकारीका लागि  
- CarRental: कार बुकिङ र कार भाडा जानकारीका लागि  
- ActivitiesBooking: गतिविधि बुकिङ र गतिविधि जानकारीका लागि  
- DestinationInfo: गन्तव्यहरूको जानकारी प्रदान गर्न  
- DefaultAgent: सामान्य अनुरोधहरू सम्हाल्न  

## अपेक्षित परिणाम  

जब तपाईं एजेन्टलाई यात्रा योजना अनुरोधसहित चलाउनुहुन्छ, यसले अनुरोध विश्लेषण गरी विशेषज्ञ एजेन्टहरूलाई उपयुक्त कार्यहरू सुम्पेर JSON ढाँचामा TravelPlan स्कीमासँग मेल खाने संरचित योजना उत्पादन गर्नेछ।  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->