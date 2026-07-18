[![AI एजेंट फ्रेमवर्क एक्सप्लोर करना](../../../translated_images/hi/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(इस पाठ का वीडियो देखने के लिए ऊपर की छवि पर क्लिक करें)_

# AI एजेंट फ्रेमवर्क एक्सप्लोर करें

AI एजेंट फ्रेमवर्क वे सॉफ़्टवेयर प्लेटफ़ॉर्म हैं जो AI एजेंट बनाने, डिप्लॉय करने और प्रबंधित करने को सरल बनाते हैं। ये फ्रेमवर्क डेवलपर्स को पूर्व-निर्मित घटक, अमूर्तता, और उपकरण प्रदान करते हैं जो जटिल AI सिस्टम के विकास को आरंभ करने में मदद करते हैं।

ये फ्रेमवर्क डेवलपर्स को उनके अनुप्रयोगों के अनन्य पहलुओं पर ध्यान केंद्रित करने में सहायता करते हैं, AI एजेंट विकास में आम चुनौतियों के लिए मानकीकृत दृष्टिकोण प्रदान करके। ये AI सिस्टम बनाने में स्केलेबिलिटी, पहुंच और दक्षता बढ़ाते हैं।

## परिचय 

इस पाठ में हम चर्चा करेंगे:

- AI एजेंट फ्रेमवर्क क्या हैं और ये डेवलपर्स को क्या सक्षम बनाते हैं?
- टीमें इन्हें कैसे उपयोग करके अपने एजेंट की क्षमताओं को जल्दी प्रोटोटाइप, पुनरावृत्ति, और सुधार सकती हैं?
- Microsoft द्वारा बनाए गए फ्रेमवर्क और औजारों के बीच क्या अंतर हैं (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> और <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- क्या मैं अपने मौजूदा Azure पारिस्थितिकी तंत्र उपकरणों को सीधे एकीकृत कर सकता हूँ, या मुझे स्वतंत्र समाधान चाहिए?
- Microsoft Foundry Agent Service क्या है और यह मेरी कैसे मदद कर रहा है?

## सीखने के उद्देश्य

इस पाठ के उद्देश्य हैं कि आप समझ सकें:

- AI विकास में AI एजेंट फ्रेमवर्क की भूमिका।
- बुद्धिमान एजेंट बनाने के लिए AI एजेंट फ्रेमवर्क का उपयोग कैसे करें।
- AI एजेंट फ्रेमवर्क द्वारा सक्षम प्रमुख क्षमताएं।
- Microsoft Agent Framework और Microsoft Foundry Agent Service के बीच के अंतर।

## AI एजेंट फ्रेमवर्क क्या हैं और ये डेवलपर्स को क्या करने देते हैं?

पारंपरिक AI फ्रेमवर्क आपकी ऐप्स में AI को एकीकृत करके इन्हें बेहतर बनाने में मदद करते हैं, निम्नलिखित तरीकों से:

- **व्यक्तिकरण**: AI उपयोगकर्ता व्यवहार और प्राथमिकताओं का विश्लेषण कर व्यक्तिगत अनुशंसाएं, सामग्री और अनुभव प्रदान कर सकता है।
उदाहरण: Netflix जैसे स्ट्रीमिंग सेवाएँ AI का उपयोग कर देखने के इतिहास के आधार पर फिल्मों और शो का सुझाव देती हैं, जिससे उपयोगकर्ता जुड़ाव और संतुष्टि बढ़ती है।
- **स्वचालन और दक्षता**: AI दोहराए जाने वाले कार्यों को स्वचालित कर सकता है, वर्कफ़्लो को सुव्यवस्थित कर सकता है, और परिचालन दक्षता में सुधार कर सकता है।
उदाहरण: ग्राहक सेवा ऐप्स AI-समर्थित चैटबॉट का उपयोग आम पूछताछ को संभालने के लिए करते हैं, जिससे प्रतिक्रिया समय कम होता है और मानव एजेंट अधिक जटिल मुद्दों पर ध्यान दे सकते हैं।
- **सुधारित उपयोगकर्ता अनुभव**: AI बुद्धिमान सुविधाएँ प्रदान कर उपयोगकर्ता अनुभव बेहतर बनाता है जैसे आवाज़ पहचान, प्राकृतिक भाषा प्रसंस्करण, और पूर्वानुमानित टेक्स्ट।
उदाहरण: Siri और Google Assistant जैसे वर्चुअल असिस्टेंट AI का उपयोग कर आवाज़ आदेश समझते और प्रतिक्रिया देते हैं, जिससे उपयोगकर्ताओं के लिए उपकरणों के साथ बातचीत आसान होती है।

### यह सब तो अच्छा लगता है, तो हमें AI एजेंट फ्रेमवर्क की आवश्यकता क्यों है?

AI एजेंट फ्रेमवर्क केवल AI फ्रेमवर्क से अलग हैं। इन्हें ऐसे बुद्धिमान एजेंट बनाने के लिए डिज़ाइन किया गया है जो उपयोगकर्ताओं, अन्य एजेंटों, और पर्यावरण के साथ बातचीत कर सकें और विशिष्ट लक्ष्यों को प्राप्त कर सकें। ये एजेंट स्वायत्त व्यवहार दिखा सकते हैं, निर्णय ले सकते हैं, और बदलती परिस्थितियों के अनुसार अनुकूलित हो सकते हैं। आइए देखें AI एजेंट फ्रेमवर्क द्वारा सक्षम कुछ प्रमुख क्षमताओं को:

- **एजेंट सहयोग और समन्वय**: कई AI एजेंट बनाने सक्षम जिनके बीच कार्य सहयोग, संचार और समन्वय संभव हो ताकि जटिल कार्य हल किए जा सकें।
- **कार्य स्वचालन और प्रबंधन**: बहु-चरण वर्कफ़्लो, कार्य कार्यवितरण, और एजेंटों के बीच गतिशील कार्य प्रबंधन के लिए तंत्र प्रदान करना।
- **संदर्भपूर्ण समझ और अनुकूलन**: एजेंटों को संदर्भ समझने की क्षमता देना, परिवर्तित पर्यावरण के अनुसार अनुकूलित होना, और रियल-टाइम जानकारी के आधार पर निर्णय लेना।

संक्षेप में कहें तो, एजेंट आपको अधिक करने देते हैं, स्वचालन को अगले स्तर पर ले जाते हैं, ऐसे बुद्धिमान सिस्टम बनाते हैं जो अपने पर्यावरण से सीखने और अनुकूलित होने में सक्षम हैं।

## एजेंट की क्षमताओं को जल्दी प्रोटोटाइप, पुनरावृत्त करें और सुधारें कैसे?

यह एक जल्दी बदलने वाला क्षेत्र है, लेकिन अधिकांश AI एजेंट फ्रेमवर्क में कुछ सामान्यताएं हैं जो तेज़ प्रोटोटाइप और पुनरावृत्ति में सहायता करती हैं, जिनमें मॉड्यूलर घटक, सहयोगी उपकरण, और रियल-टाइम सीखना शामिल हैं। आइए इन्हें देखें:

- **मॉड्यूलर घटकों का उपयोग करें**: AI SDK पूर्व-निर्मित घटक जैसे AI और मेमोरी कनेक्टर, प्राकृतिक भाषा या कोड प्लगइन्स द्वारा फ़ंक्शन कॉलिंग, प्रॉम्प्ट टेम्प्लेट्स आदि प्रदान करते हैं।
- **सहयोगी उपकरणों का लाभ उठाएं**: विशिष्ट भूमिकाओं और कार्यों के साथ एजेंट डिज़ाइन करें ताकि वे सहयोगी वर्कफ़्लो का परीक्षण और सुधार कर सकें।
- **रियल-टाइम में सीखें**: ऐसे फीडबैक लूप लागू करें जहां एजेंट इंटरैक्शन से सीखते हैं और अपने व्यवहार को गतिशील रूप से समायोजित करते हैं।

### मॉड्यूलर घटकों का उपयोग करें

Microsoft Agent Framework जैसे SDK पूर्व-निर्मित घटक प्रदान करते हैं जैसे AI कनेक्टर, टूल परिभाषाएँ, और एजेंट प्रबंधन।

**टीमें इन्हें कैसे उपयोग कर सकती हैं**: टीमें बिना शुरुआत से निर्माण के इन घटकों को जल्दी जोड़ कर एक कार्यात्मक प्रोटोटाइप बना सकती हैं, जो तेज़ प्रयोग और पुनरावृत्ति की अनुमति देता है।

**व्यावहारिक रूप में यह कैसे काम करता है**: आप उपयोगकर्ता इनपुट से जानकारी निकालने के लिए पूर्व-निर्मित पार्सर, डेटा संग्रहण और पुनर्प्राप्ति के लिए मेमोरी मॉड्यूल, और उपयोगकर्ताओं से बातचीत के लिए प्रॉम्प्ट जनरेटर का उपयोग कर सकते हैं, बिना इन घटकों को स्वयं बनाये।

**कोड का उदाहरण**. आइए देखें कैसे Microsoft Agent Framework का उपयोग `FoundryChatClient` के साथ किया जा सकता है ताकि मॉडल उपयोगकर्ता इनपुट पर टूल कॉलिंग के साथ प्रतिक्रिया दे सके:

``` python
# माइक्रोसॉफ्ट एजेंट फ्रेमवर्क पायथन उदाहरण

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# यात्रा बुक करने के लिए एक नमूना टूल फ़ंक्शन परिभाषित करें
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # उदाहरण आउटपुट: 1 जनवरी 2025 को न्यूयॉर्क के लिए आपकी उड़ान सफलतापूर्वक बुक हो गई है। सुरक्षित यात्रा करें! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

इस उदाहरण से आप देख सकते हैं कि कैसे पूर्व-निर्मित पार्सर का उपयोग कर उपयोगकर्ता इनपुट से प्रमुख जानकारी जैसे उड़ान बुकिंग के लिए मूल, गंतव्य, और तिथि निकाली जा सकती है। यह मॉड्यूलर तरीका आपको उच्च-स्तरीय लॉजिक पर ध्यान केंद्रित करने की अनुमति देता है।

### सहयोगी उपकरणों का लाभ उठाएं

Microsoft Agent Framework जैसे फ्रेमवर्क कई एजेंटों के निर्माण को सक्षम बनाते हैं जो साथ मिलकर काम कर सकते हैं।

**टीमें इन्हें कैसे उपयोग कर सकती हैं**: टीमें विशेष भूमिकाओं और कार्यों के साथ एजेंट डिज़ाइन कर सकती हैं, जो सहयोगी वर्कफ़्लो का परीक्षण और सुधार कर सकें, और सिस्टम की समग्र दक्षता बढ़ा सकें।

**व्यावहारिक रूप में यह कैसे काम करता है**: आप एक एजेंट टीम बना सकते हैं जहाँ प्रत्येक एजेंट का एक विशेषज्ञ कार्य हो, जैसे डेटा पुनःप्राप्ति, विश्लेषण, या निर्णय लेना। ये एजेंट संचार कर सकते हैं और जानकारी साझा कर सकते हैं ताकि साझा लक्ष्य जैसे उपयोगकर्ता क्वेरी का उत्तर देना या कार्य समाप्त करना पूरा हो सके।

**कोड का उदाहरण (Microsoft Agent Framework)**:

```python
# माइक्रोसॉफ्ट एजेंट फ्रेमवर्क का उपयोग करके एक साथ काम करने वाले कई एजेंट बनाना

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# डेटा पुनर्प्राप्ति एजेंट
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# डेटा विश्लेषण एजेंट
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# एक कार्य पर एजेंटों को क्रम में चलाना
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

पिछले कोड में आप देख सकते हैं कि कैसे एक कार्य बनाया जाता है जिसमें कई एजेंट मिलकर डेटा का विश्लेषण करते हैं। प्रत्येक एजेंट एक विशिष्ट काम करता है, और कार्य एजेंटों के समन्वय द्वारा निष्पादित होता है ताकि वांछित परिणाम प्राप्त हो सके। विशेषज्ञ भूमिकाओं वाले समर्पित एजेंटों को बनाकर आप कार्य दक्षता और प्रदर्शन सुधार सकते हैं।

### रियल-टाइम में सीखें

उन्नत फ्रेमवर्क रियल-टाइम संदर्भ की समझ और अनुकूलन की क्षमताएं प्रदान करते हैं।

**टीमें इन्हें कैसे उपयोग कर सकती हैं**: टीमें फीडबैक लूप लागू कर सकती हैं जहाँ एजेंट इंटरैक्शन से सीखते हैं और अपने व्यवहार को गतिशील रूप से समायोजित करते हैं, जिससे क्षमताओं में निरंतर सुधार और परिष्करण होता है।

**व्यावहारिक रूप में यह कैसे काम करता है**: एजेंट उपयोगकर्ता फीडबैक, पर्यावरणीय डेटा, और कार्य परिणामों का विश्लेषण कर सकते हैं ताकि उनका ज्ञान आधार अपडेट हो, निर्णय लेने के एल्गोरिदम समायोजित हों, और प्रदर्शन समय के साथ सुधरे। यह पुनरावृत्ति सीखने की प्रक्रिया एजेंटों को बदलती परिस्थितियों और उपयोगकर्ता प्राथमिकताओं के अनुसार अनुकूलित करने में सक्षम बनाती है, जिससे समग्र सिस्टम की प्रभावशीलता बढ़ती है।

## Microsoft Agent Framework और Microsoft Foundry Agent Service में क्या अंतर हैं?

इन दोनों दृष्टिकोणों की तुलना कई तरीकों से की जा सकती है, लेकिन आइए उनके डिजाइन, क्षमताओं, और लक्षित उपयोग मामलों के संदर्भ में कुछ प्रमुख अंतर देखें:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework एक सुसंगत SDK प्रदान करता है जिससे AI एजेंट बनाए जा सकते हैं `FoundryChatClient` का उपयोग करके। यह डेवलपर्स को Azure OpenAI मॉडल का उपयोग करके एजेंट बनाने की अनुमति देता है जो टूल कॉलिंग, वार्तालाप प्रबंधन, और Azure पहचान के माध्यम से एंटरप्राइज-ग्रेड सुरक्षा प्रदान करता है।

**उपयोग के मामले**: टूल उपयोग, बहु-चरण वर्कफ़्लो, और एंटरप्राइज एकीकरण परिदृश्यों के साथ उत्पादन-तैयार AI एजेंट बनाना।

Microsoft Agent Framework के कुछ महत्वपूर्ण मूलभूत अवधारणाएँ हैं:

- **एजेंट**। एक एजेंट `FoundryChatClient` के माध्यम से बनाया जाता है और नाम, निर्देश, और टूल्स के साथ कॉन्फ़िगर किया जाता है। एजेंट कर सकता है:
  - **उपयोगकर्ता संदेशों को संसाधित करना** और Azure OpenAI मॉडल का उपयोग कर प्रतिक्रियाएं उत्पन्न करना।
  - **वार्तालाप संदर्भ के आधार पर टूल कॉल करना** स्वचालित रूप से।
  - **कई इंटरैक्शन के बीच वार्तालाप की स्थिति बनाए रखना**।

  यहाँ एक कोड स्निपेट है जो दिखाता है कि एजेंट कैसे बनाया जाता है:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **टूल्स**। फ्रेमवर्क एजेंट द्वारा स्वचालित रूप से उपयोग किए जाने वाले टूल्स को Python फ़ंक्शन्स के रूप में परिभाषित करने का समर्थन करता है। टूल्स एजेंट निर्माण के समय पंजीकृत किए जाते हैं:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **बहु-एजेंट समन्वय**। आप अलग-अलग विशेषज्ञताओं वाले कई एजेंट बना सकते हैं और उनके कार्य का समन्वय कर सकते हैं:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Azure पहचान एकीकरण**। फ्रेमवर्क सुरक्षित, कीलेस प्रमाणीकरण के लिए `AzureCliCredential` (या `DefaultAzureCredential`) का उपयोग करता है, जिससे API कुंजी प्रबंधन की आवश्यकता समाप्त हो जाती है।

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service Microsoft Ignite 2024 में हाल ही में जोड़ा गया है। यह AI एजेंटों के विकास और डिप्लॉयमेंट के लिए अधिक लचीले मॉडल प्रदान करता है, जैसे कि सीधे ओपन-सोर्स LLMs जैसे Llama 3, Mistral, और Cohere को कॉल करना।

Microsoft Foundry Agent Service मजबूत एंटरप्राइज सुरक्षा तंत्र और डेटा संग्रहण विधियां प्रदान करता है, जो इसे एंटरप्राइज अनुप्रयोगों के लिए उपयुक्त बनाता है।

यह एजेंट बनाने और डिप्लॉय करने के लिए Microsoft Agent Framework के साथ आउट-ऑफ़-द-बॉक्स काम करता है।

यह सेवा वर्तमान में सार्वजनिक प्रिव्यू में है और एजेंट बनाने के लिए Python और C# दोनों का समर्थन करती है।

Microsoft Foundry Agent Service Python SDK का उपयोग करते हुए, हम उपयोगकर्ता-परिभाषित टूल के साथ एक एजेंट बना सकते हैं:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# टूल फ़ंक्शंस को परिभाषित करें
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### मूल अवधारणाएं

Microsoft Foundry Agent Service की निम्नलिखित मूल अवधारणाएं हैं:

- **एजेंट**। Microsoft Foundry Agent Service Microsoft Foundry के साथ एकीकृत होता है। Microsoft Foundry में, एक AI एजेंट एक "स्मार्ट" माइक्रोसर्विस के रूप में कार्य करता है जिसका उपयोग प्रश्नों (RAG) का उत्तर देने, क्रियाएं करने, या वर्कफ़्लोज़ को पूरी तरह से स्वचालित करने के लिए किया जा सकता है। यह जनरेटिव AI मॉडलों की शक्ति को टूल्स के साथ मिलाकर करता है जो इसे वास्तविक दुनिया के डेटा स्रोतों तक पहुँचने और इंटरैक्ट करने की अनुमति देते हैं। यहाँ एक एजेंट का उदाहरण है:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    इस उदाहरण में, एक एजेंट `gpt-4.1-mini` मॉडल, नाम `my-agent`, और निर्देश `You are helpful agent` के साथ बनाया गया है। एजेंट को कोड व्याख्या कार्यों को करने के लिए टूल्स और संसाधनों से सुसज्जित किया गया है।

- **थ्रेड और संदेश**। थ्रेड एक और महत्वपूर्ण अवधारणा है। यह एजेंट और उपयोगकर्ता के बीच बातचीत या इंटरैक्शन का प्रतिनिधित्व करता है। थ्रेड का उपयोग बातचीत की प्रगति को ट्रैक करने, संदर्भ जानकारी संग्रहीत करने, और इंटरैक्शन की स्थिति को प्रबंधित करने के लिए किया जाता है। यहाँ एक थ्रेड का उदाहरण है:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # एजेंट से धागे पर काम करने के लिए कहें
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # एजेंट की प्रतिक्रिया देखने के लिए सभी संदेश प्राप्त करें और लॉग करें
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    पिछले कोड में, एक थ्रेड बनाया गया है। उसके बाद, थ्रेड को एक संदेश भेजा गया है। `create_and_process_run` कॉल करके, एजेंट से कहा जाता है कि वह थ्रेड पर कार्य करे। अंत में, संदेश प्राप्त किए गए और एजेंट की प्रतिक्रिया को देखने के लिए लॉग किया गया। संदेश बातचीत की प्रगति को दर्शाते हैं। यह भी समझना महत्वपूर्ण है कि संदेश प्रकार भिन्न हो सकते हैं जैसे टेक्स्ट, छवि, या फ़ाइल, जो एजेंट का कार्य किसी छवि या टेक्स्ट प्रतिक्रिया की तरह दिखाता है। एक डेवलपर के रूप में, आप इस जानकारी का उपयोग आगे प्रतिक्रिया को प्रोसेस करने या उपयोगकर्ता को प्रस्तुत करने के लिए कर सकते हैं।

- **Microsoft Agent Framework के साथ एकीकृत**। Microsoft Foundry Agent Service Microsoft Agent Framework के साथ सहज रूप से काम करता है, जिसका अर्थ है कि आप `FoundryChatClient` का उपयोग करके एजेंट बना सकते हैं और उन्हें प्रोडक्शन परिदृश्यों के लिए Agent Service के माध्यम से तैनात कर सकते हैं।

**उपयोग के मामले**: Microsoft Foundry Agent Service उन एंटरप्राइज अनुप्रयोगों के लिए डिज़ाइन किया गया है जिन्हें सुरक्षित, स्केलेबल, और लचीले AI एजेंट डिप्लॉयमेंट की आवश्यकता होती है।

## इन दृष्टिकोणों में क्या अंतर है?
 
ऐसा लगता है कि इनमें अतिव्यापीता है, लेकिन उनके डिज़ाइन, क्षमताओं, और लक्षित उपयोग मामलों के संदर्भ में कुछ प्रमुख अंतर हैं:
 
- **Microsoft Agent Framework (MAF)**: AI एजेंट बनाने के लिए उत्पादन-तैयार SDK है। यह टूल कॉलिंग, बातचीत प्रबंधन, और Azure पहचान एकीकरण के साथ एजेंट बनाने के लिए एक सुसंगत API प्रदान करता है।
- **Microsoft Foundry Agent Service**: Microsoft Foundry में एजेंटों के लिए एक प्लेटफ़ॉर्म और डिप्लॉयमेंट सेवा है। यह Azure OpenAI, Azure AI Search, Bing Search और कोड निष्पादन जैसी सेवाओं के लिए बिल्ट-इन कनेक्टिविटी प्रदान करता है।
 
अभी भी सुनिश्चित नहीं कि किसे चुनें?

### उपयोग के मामले
 
आइए देखें कि क्या हम कुछ सामान्य उपयोग मामलों से आपकी मदद कर सकते हैं:
 
> प्रश्न: मैं उत्पादन AI एजेंट एप्लिकेशन बना रहा हूँ और जल्दी शुरू करना चाहता हूँ
>

> उत्तर: Microsoft Agent Framework एक बढ़िया विकल्प है। यह `FoundryChatClient` के माध्यम से एक सरल, Python-संबंधित API प्रदान करता है जो आपको कुछ पंक्तियों में टूल्स और निर्देशों के साथ एजेंट परिभाषित करने देता है।

> प्रश्न: मुझे Azure इंटीग्रेशन जैसे Search और कोड निष्पादन के साथ एंटरप्राइज-ग्रेड डिप्लॉयमेंट चाहिए
>
> उत्तर: Microsoft Foundry Agent Service सबसे उपयुक्त है। यह एक प्लेटफ़ॉर्म सेवा है जो कई मॉडल, Azure AI Search, Bing Search और Azure Functions के लिए बिल्ट-इन क्षमताएं प्रदान करता है। यह Foundry Portal में आपके एजेंट बनाने और बड़े पैमाने पर तैनात करने को आसान बनाता है।
 
> प्रश्न: मैं अभी भी उलझन में हूँ, मुझे बस एक विकल्प बताएं
>
> उत्तर: पहले Microsoft Agent Framework से अपने एजेंट बनाएं, फिर जरूरत पड़ने पर Microsoft Foundry Agent Service का उपयोग उत्पादन में तैनाती और स्केलिंग के लिए करें। यह तरीका आपको एजेंट लॉजिक पर तेज़ी से पुनरावृत्ति की अनुमति देता है साथ ही एंटरप्राइज डिप्लॉयमेंट का स्पष्ट मार्ग भी देता है।
 
चलिए सारांश के रूप में मुख्य अंतर एक तालिका में देखते हैं:

| फ्रेमवर्क | फोकस | मुख्य अवधारणाएँ | उपयोग के मामले |
| --- | --- | --- | --- |
| Microsoft Agent Framework | टूल कॉलिंग के साथ सुसंगत एजेंट SDK | एजेंट, टूल, Azure पहचान | AI एजेंट बनाना, टूल उपयोग, बहु-चरण वर्कफ़्लो |
| Microsoft Foundry Agent Service | लचीले मॉडल, एंटरप्राइज सुरक्षा, कोड जनरेशन, टूल कॉलिंग | मॉड्यूलैरिटी, सहयोग, प्रोसेस ऑर्केस्ट्रेशन | सुरक्षित, स्केलेबल, और लचीला AI एजेंट डिप्लॉयमेंट |

## क्या मैं अपने मौजूदा Azure पारिस्थितिकी तंत्र उपकरणों को सीधे एकीकृत कर सकता हूँ, या मुझे स्वतंत्र समाधान चाहिए?


उत्तर हाँ है, आप अपने मौजूदा Azure इकोसिस्टम टूल्स को सीधे Microsoft Foundry Agent Service के साथ एकीकृत कर सकते हैं, खासकर क्योंकि इसे अन्य Azure सेवाओं के साथ सहजता से काम करने के लिए बनाया गया है। उदाहरण के लिए, आप Bing, Azure AI Search, और Azure Functions को एकीकृत कर सकते हैं। Microsoft Foundry के साथ भी गहन एकीकरण है।

Microsoft Agent Framework भी `FoundryChatClient` और Azure पहचान के माध्यम से Azure सेवाओं के साथ एकीकृत होता है, जिससे आप अपने एजेंट टूल्स से सीधे Azure सेवाओं को कॉल कर सकते हैं।

## नमूना कोड

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## AI एजेंट फ्रेमवर्क के बारे में और सवाल हैं?

अन्य शिक्षार्थियों से मिलने, ऑफिस आवर्स में भाग लेने और अपने AI एजेंट्स के सवालों के जवाब पाने के लिए [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) में शामिल हों।

## संदर्भ

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## पिछला पाठ

[AI एजेंट्स और एजेंट उपयोग मामलों का परिचय](../01-intro-to-ai-agents/README.md)

## अगला पाठ

[Agentic डिज़ाइन पैटर्न समझना](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->