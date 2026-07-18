[![AI एजंट फ्रेमवर्क एक्सप्लोर करत आहे](../../../translated_images/mr/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(ही धडा पाहण्यासाठी वरील प्रतिमावर क्लिक करा)_

# AI एजंट फ्रेमवर्क एक्सप्लोर करा

AI एजंट फ्रेमवर्क हे सॉफ्टवेअर प्लॅटफॉर्म आहेत जे AI एजंट्सची निर्मिती, तैनाती आणि व्यवस्थापन सुलभ करण्यासाठी डिझाइन केलेले आहेत. हे फ्रेमवर्क विकसकांना तयार केलेले घटक, अमूर्तता आणि साधने पुरवतात ज्यामुळे जटिल AI सिस्टम्सचा विकास सुलभ होतो.

हे फ्रेमवर्क विकसकांना त्यांच्या अनुप्रयोगांच्या अद्वितीय बाबींवर लक्ष केंद्रित करता येते कारण ते AI एजंट विकासातील सामान्य अडचणींवर मानकीकृत दृष्टिकोन पुरवतात. ते AI प्रणाली बांधण्यात स्केलेबिलिटी, प्रवेशयोग्यता आणि कार्यक्षमता वाढवतात.

## परिचय

हा धडा खालील गोष्टींचा आढावा घेईल:

- AI एजंट फ्रेमवर्क काय आहेत आणि ते विकसकांना काय साध्य करायला परवानगी देतात?
- संघ या फ्रेमवर्कचा वापर कसा करून त्यांच्या एजंटच्या क्षमतांचे जलद प्रोटोटायपिंग, पुनरावृत्ती आणि सुधारणा करू शकतात?
- Microsoft (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> आणि <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>) यांनी बनवलेले फ्रेमवर्क आणि साधनांमधील फरक काय आहेत?
- माझ्या विद्यमान Azure इकोसिस्टम टूल्स थेट एकत्रित करू शकतो का, किंवा स्वतंत्र सोल्यूशन्सची गरज आहे का?
- Microsoft Foundry Agent Service काय आहे आणि हे मला कसे मदत करत आहे?

## शिकण्याचे उद्दिष्टे

या धड्याचे उद्दिष्टे आहेत:

- AI विकासात AI एजंट फ्रेमवर्कची भूमिका काय आहे हे समजून घेणे.
- बुद्धिमान एजंट्स तयार करण्यासाठी AI एजंट फ्रेमवर्कचा कसा लाभ घेता येईल.
- AI एजंट फ्रेमवर्कद्वारे सक्षम केलेल्या महत्वाच्या क्षमतांचा परिचय.
- Microsoft Agent Framework आणि Microsoft Foundry Agent Service मधील फरक काय आहेत.

## AI एजंट फ्रेमवर्क म्हणजे काय आणि ते विकसकांना काय करण्यास सक्षम करतात?

पारंपारिक AI फ्रेमवर्क आपल्याला AI आपल्या अनुप्रयोगांमध्ये समाकलित करण्यात मदत करतात आणि या अनुप्रयोगांना खालील प्रकारे सुधारित करतात:

- **वैयक्तिकीकरण**: AI वापरकर्त्याच्या वागणुकी व पसंतीचा विश्लेषण करून वैयक्तिकृत शिफारसी, सामग्री, आणि अनुभव पुरवू शकतो.
उदाहरण: Netflix सारख्या स्ट्रीमिंग सेवे AI वापरकर्त्याच्या पाहण्याच्या इतिहासावर आधारित चित्रपट आणि शो सुझवते, ज्यामुळे वापरकर्ता आकर्षण आणि समाधान वाढते.
- **स्वयंचलीतता आणि कार्यक्षमता**: AI पुनरावृत्ती कामे ऑटोमेट करू शकतो, कार्यप्रवाह सुलभ करू शकतो आणि ऑपरेशनल कार्यक्षमता सुधारू शकतो.
उदाहरण: ग्राहक सेवा अनुप्रयोग AI-चालित चॅटबॉट्स वापरून सामान्य प्रश्न हाताळतात, प्रतिसाद वेळ कमी करतात आणि मानवी एजंट्सना जास्त जटिल मुद्द्यांसाठी मोकळे करतात.
- **वापरकर्ता अनुभव सुधारणा**: AI आवाज ओळखणे, नैसर्गिक भाषा प्रक्रिया, आणि पूर्वानुमानित मजकूर यांसारख्या बुद्धिमान वैशिष्ट्यांनी वापरकर्ता अनुभव सुधारतो.
उदाहरण: Siri आणि Google Assistant सारखे व्हर्च्युअल सहाय्यक AI वापरून आवाज कमांड समजून प्रतिसाद देतात, ज्यामुळे वापरकर्त्यांना त्यांच्या उपकरणांशी संवाद साधणे सुलभ होते.

### हे सगळं छान आहे, मग AI एजंट फ्रेमवर्कची गरज का आहे?

AI एजंट फ्रेमवर्क म्हणजे फक्त AI फ्रेमवर्क्सपेक्षा अधिक काहीतरी. हे बुद्धिमान एजंट्सच्या निर्मितीस सक्षम बनवतात जे वापरकर्ते, इतर एजंट्स आणि वातावरणाशी संवाद साधू शकतात व विशिष्ट उद्दिष्टे साध्य करू शकतात. हे एजंट्स स्वयंचलित वर्तन दाखवू शकतात, निर्णय घेऊ शकतात, आणि बदलत्या परिस्थितींना अनुकूल होऊ शकतात. AI एजंट फ्रेमवर्कद्वारे सक्षम केलेल्या काही मुख्य क्षमतांकडे पाहूयाः

- **एजंट सहकार्य आणि समन्वय**: अनेक AI एजंट्स तयार करणे जे एकत्र काम करू शकतात, संवाद साधू शकतात, आणि जटिल कामे सोडवण्यासाठी समन्वयित होऊ शकतात.
- **कामांचे स्वयंचलीतकरण आणि व्यवस्थापन**: बहु-टप्प्यांच्या कार्यप्रवाहांचे ऑटोमेशन, कामांचे प्रतिनिधित्व, आणि एजंट्समधील गतिशील व्यवस्थापनासाठी यंत्रणा पुरवणे.
- **प्रसंगजन्य समज आणि अनुकूलन**: एजंट्सना प्रसंग समजून घेण्याची, बदलत्या वातावरणाला अनुरूप होण्याची, आणि वास्तविक वेळेच्या माहितीवर आधारित निर्णय घेण्याची क्षमता देणे.

तर संक्षेपाने, एजंट्स आपल्याला अधिक करण्याची मुभा देतात, ऑटोमेशन पुढच्या स्तरावर नेण्याची परवानगी देतात, अधिक बुद्धिमान प्रणाली तयार करतात जी त्यांच्या वातावरणापासून शिकू आणि जुळवून घेऊ शकतात.

## एजंटच्या क्षमतांचे जलद प्रोटोटायपिंग, पुनरावृत्ती, आणि सुधारणा कशी करावी?

हा एक जलद बदलता क्षेत्र आहे, परंतु बहुसंख्य AI एजंट फ्रेमवर्क्समधील काही सामान्य बाबी आहेत ज्या आपल्याला जलद प्रोटोटायपिंग आणि पुनरावृत्ती करण्यात मदत करतात, जसे की मॉड्यूलर घटक, सहकार्याच्या साधनांचा वापर, आणि वास्तविक-वेळेची शिकवण. चला याकडे पाहूयाः

- **मॉड्यूलर घटक वापरा**: AI SDKs पूर्वनिर्मित घटक जसे की AI आणि मेमरी कनेक्टर्स, नैसर्गिक भाषा किंवा कोड प्लगइन्सचा वापर करून फंक्शन कॉलिंग, प्रॉम्प्ट टेम्पलेट्स, आणि बरेच काही ऑफर करतात.
- **सहकार्य साधने वापरा**: विशिष्ट भूमिका आणि कामांसाठी एजंट्स डिझाइन करा, ज्यामुळे ते सहकार्य कार्यप्रवाहांची तपासणी आणि सुधारणे करू शकतील.
- **वास्तविक वेळेत शिका**: अशा फीडबॅक लूप लागू करा जिथे एजंट्स संवादांमधून शिकतात आणि त्यांचा वर्तन गतिशीलरित्या समायोजित करतात.

### मॉड्यूलर घटक वापरा

Microsoft Agent Framework सारख्या SDKs पूर्वनिर्मित घटक जसे की AI कनेक्टर्स, टूल डिफिनेशन्स, आणि एजंट व्यवस्थापन ऑफर करतात.

**संघ कसे वापरू शकतात**: संघ हे घटक लवकरच एकत्र करून कार्यक्षम प्रोटोटाइप तयार करू शकतात, जे सुरुवात पासून बनवण्याची गरज नाही, ज्यामुळे जलद प्रयोग आणि पुनरावृत्ती शक्य होते.

**व्यावहारिक उपयोग कसा आहे**: आपण वापरकर्त्याच्या इनपुटमधून माहिती काढण्यासाठी पूर्वनिर्मित पार्सर, डेटा साठवण्यासाठी आणि पुनर्प्राप्तीसाठी स्मृती मॉड्यूल, आणि वापरकर्त्यांशी संवाद साधण्यासाठी प्रॉम्प्ट जनरेटर वापरू शकता, ते सगळं सुरुवात पासून बनवण्याची गरज नाही.

**उदाहरण कोड**. चला पाहूयात Microsoft Agent Framework मध्ये `FoundryChatClient` वापरून कसा वापरकर्ता इनपुटवर टूल कॉलिंगसह प्रतिसाद देऊ शकतो:

``` python
# मायक्रोसॉफ्ट एजंट फ्रेमवर्क पायथन उदाहरण

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# प्रवास आरक्षित करण्यासाठी नमुना साधन फंक्शन परिभाषित करा
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
    # उदाहरण आउटपुट: 1 जानेवारी 2025 रोजी न्यूयॉर्कसाठी तुमचा फ्लाइट यशस्वीरित्या आरक्षित झाला आहे. सुरक्षित प्रवास! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

या उदाहरणातून आपण पाहू शकता की वापरकर्ता इनपुटमधून की माहिती जसे की उडण्याची सुरुवात, गंतव्य आणि तारीख काढण्यासाठी पूर्वनिर्मित पार्सर कसा वापरता येतो. हा मॉड्यूलर दृष्टिकोन आपल्याला उच्च-स्तरीय लॉजिकवर लक्ष केंद्रित करने शक्य बनवतो.

### सहकार्य साधने वापरा

Microsoft Agent Framework सारखे फ्रेमवर्क अनेक एजंट तयार करण्यास मदत करतात जे एकत्र काम करू शकतात.

**संघ कसे वापरू शकतात**: संघ विशिष्ट भूमिका आणि कामांसाठी एजंट डिझाइन करू शकतात, ज्यामुळे ते सहकार्य कार्यप्रवाह तपासू आणि सुधारू शकतात, तसेच प्रणालीची एकूण कार्यक्षमता वाढू शकते.

**व्यावहारिक उपयोग कसा आहे**: आपण एजंट्सची एक टीम तयार करू शकता जिथे प्रत्येक एजंटला डेटा पुनर्प्राप्ती, विश्लेषण किंवा निर्णय घेण्याचे खास कार्य असते. हे एजंट संवाद साधून सामायिक माहिती शेअर करून वापरकर्त्याच्या प्रश्नाचे उत्तर देणे किंवा काम पूर्ण करणे शक्य करतात.

**उदाहरण कोड (Microsoft Agent Framework)**:

```python
# मायक्रोसॉफ्ट एजंट फ्रेमवर्क वापरून एकत्र काम करणारे अनेक एजंट तयार करणे

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# डेटा पुनर्प्राप्ति एजंट
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# डेटा विश्लेषण एजंट
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# कार्यावर एजंट एकाएकी चालवा
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

आपण मागील कोडमध्ये पाहू शकता की कसे आपण अनेक एजंट्सचा समन्वय करून डेटा विश्लेषण करण्यासाठी काम तयार करू शकता. प्रत्येक एजंट विशिष्ट कार्य पार पाडतो आणि हा कार्य एजंट्सच्या समन्वयातून कार्यान्वित होतो. विशेषज्ञ भूमिकांसह समर्पित एजंट तयार केल्यामुळे कामाची कार्यक्षमता आणि कामगिरी सुधारू शकते.

### वास्तविक वेळेत शिका

प्रगत फ्रेमवर्क वास्तविक-वेळेच्या प्रसंग समज आणि अनुकूलनासाठी क्षमता देतात.

**संघ कसे वापरू शकतात**: संघ एजंट्ससाठी फीडबॅक लूप लागू करू शकतात जिथे एजंट संवादांमधून शिकतात आणि वर्तन गतिशीलरित्या समायोजित करतात, ज्यामुळे क्षमता सातत्याने सुधारतात आणि सुधारतात.

**व्यावहारिक उपयोग कसा आहे**: एजंट्स वापरकर्त्याचा अभिप्राय, पर्यावरणीय डेटा आणि कामाचे निकाल विश्लेषित करून त्यांच्या ज्ञानाधाराचा अद्ययावत करतात, निर्णय घेण्याच्या अल्गोरिदमची समायोजना करतात, आणि वेळोवेळी कामगिरी सुधारतात. ही पुनरावृत्ती शिकण्याची प्रक्रिया एजंट्सना बदलत्या परिस्थितींना आणि वापरकर्ता पसंतींना अनुरूप होण्यास सक्षम करते, ज्यामुळे संपूर्ण प्रणालीची परिणामकारकता वाढते.

## Microsoft Agent Framework आणि Microsoft Foundry Agent Service मधील फरक काय आहेत?

या दृष्टिकोनांची अनेक तुलना करता येतात, पण त्यांच्या डिझाइन, क्षमता आणि लक्षित वापर प्रकरणांच्या बाबतीत काही मुख्य फरक पाहूयाः

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework `FoundryChatClient` वापरून AI एजंट्स तयार करण्यासाठी एक सुलभ SDK पुरवतो. हे विकसकांना एजंट तयार करण्यास सक्षम करते जे Azure OpenAI मॉडेल्सचा वापर करून अंगभूत टूल कॉलिंग, संभाषण व्यवस्थापन, आणि Azure ओळख सुरक्षा यांसह वापर वापरतात.

**वापर प्रकरणे**: टूल वापर, बहु-टप्प्यांचे कार्यप्रवाह, आणि एंटरप्राइझ समाकलनासाठी उत्पादन-तयार AI एजंट तयार करणे.

Microsoft Agent Framework चे काही महत्वाचे मूलभूत संकल्पना:

- **एजंट्स**. एजंट `FoundryChatClient` द्वारे तयार केला जातो व नाव, सूचना आणि टूल्ससह कॉन्फिगर केला जातो. एजंट खालील करता येतो:
  - **वापरकर्ता संदेश प्रक्रिया करा** आणि Azure OpenAI मॉडेल्सचा वापर करून प्रतिसाद तयार करा.
  - **संभाषण संदर्भानुसार टूल्स आपोआप कॉल करा**.
  - **एकाधिक संवादांमध्ये संभाषण स्थिती राखा**.

  एजंट कसा तयार करायचा याचा कोड स्निपेट खाली दिला आहे:

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

- **टूल्स**. फ्रेमवर्क Python फंक्शन्स म्हणून टूल्स परिभाषित करण्यास समर्थन करतो जे एजंट आपोआप कॉल करू शकतो. एजंट तयार करताना टूल्स नोंदणी करतात:

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

- **बहु-एजंट समन्वय**. तुम्ही वेगवेगळ्या तज्ञता असलेले अनेक एजंट तयार करू शकता आणि त्यांच्या कामाचे समन्वयन करू शकता:

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

- **Azure ओळख समाकलन**. फ्रेमवर्क `AzureCliCredential` (किंवा `DefaultAzureCredential`) वापरून सुरक्षित, की-विना प्रमाणीकरण प्रदान करतो, ज्यामुळे API की व्यवस्थापनाची गरज नाही.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service हा एक अलीकडील अतिरिक्त आहे, जे Microsoft Ignite 2024 मध्ये परिचित झाला. हे AI एजंट्सच्या विकास आणि तैनातीसाठी अधिक लवचीक मॉडेल्स वापरण्यास परवानगी देते, जसे की Llama 3, Mistral, आणि Cohere सारखे ओपन-सोर्स LLMs थेट कॉल करणे.

Microsoft Foundry Agent Service अधिक मजबूत एंटरप्राइझ सुरक्षा आणि डेटा साठवणीच्या पद्धती पुरवतो, ज्यामुळे तो एंटरप्राइझ अनुप्रयोगांसाठी योग्य आहे.

तो Microsoft Agent Framework सोबत डोक्युमेंटमधे समाकलितपणे कार्य करतो जेणेकरून एजंट तयार करण्यासाठी आणि तैनात करण्यासाठी सोपे होते.

ही सेवा सध्या सार्वजनिक प्रिव्ह्यूमध्ये आहे आणि एजंट तयार करण्यासाठी Python व C# ला समर्थन देते.

Microsoft Foundry Agent Service Python SDK वापरून, आपण वापरकर्त्याने परिभाषित केलेले टूलसह एजंट तयार करू शकतो:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# साधन कार्ये定義 करा
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

### मूलभूत संकल्पना

Microsoft Foundry Agent Service मध्ये खालील मूलभूत संकल्पना आहेत:

- **एजंट**. Microsoft Foundry Agent Service Microsoft Foundry सोबत एकत्रित काम करतो. Microsoft Foundry मध्ये, AI एजंट एक "स्मार्ट" मायक्रोसर्व्हिस म्हणून कार्य करतो ज्याचा वापर प्रश्नांची उत्तरे देण्यासाठी (RAG), क्रिया करण्यासाठी, किंवा संपूर्णपणे कार्यप्रवाह स्वयंचलित करण्यासाठी केला जातो. हे जनरेटिव्ह AI मॉडेल्सची शक्ती आणि टूल्स मिळवून खऱ्या डेटाशी प्रवेश आणि संवाद साधू शकतो. एका एजंटचे उदाहरण येथे दिले आहे:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    या उदाहरणात, `gpt-4.1-mini` मॉडेलसह, नाव `my-agent`, आणि सूचना `You are helpful agent` सह एजंट तयार केला आहे. एजंट कोड व्याख्या कार्ये पार पाडण्यासाठी टूल्स आणि साधनांसह सुसज्ज आहे.

- **थ्रेड आणि संदेश**. थ्रेड ही आणखी एक महत्त्वाची संकल्पना आहे. ते एजंट आणि वापरकर्त्यामध्ये संभाषण किंवा संवादाचे प्रतिनिधित्व करतो. थ्रेड वापरून संभाषणाचा प्रगतीचा मागोवा घेता येतो, प्रसंग माहिती साठवली जाऊ शकते, आणि संवादाची स्थिती व्यवस्थापित करता येते. एका थ्रेडचे उदाहरण खाली दिले आहे:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # एजंटला थ्रेडवर काम करण्यास सांगा
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # एजंटच्या प्रतिसादासाठी सर्व मेसेजेस आणा आणि लॉग करा
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    मागील कोडमध्ये, थ्रेड तयार केला आहे. त्यानंतर थ्रेडला एक संदेश पाठवला आहे. `create_and_process_run` कॉल करून एजंट थ्रेडवर काम करण्यास सांगितला आहे. शेवटी संदेश गोळा करून एजंटच्या प्रतिसादाचे निरीक्षण केले आहे. संदेशांमध्ये वापरकर्ता आणि एजंटमधील संभाषणाचा प्रगती सूचित केला जातो. तसेच, संदेश वेगवेगळ्या प्रकारांचे असू शकतात जसे की मजकूर, प्रतिमा, किंवा फाइल, म्हणजे एजंटचा काम आखलेल्या स्वरूपाचा प्रतिसाद, जसे की प्रतिमा किंवा मजकूर. एका विकसक म्हणून आपण नंतर या माहितीचा वापर प्रतिसाद अधिक प्रक्रिया करण्यासाठी किंवा वापरकर्त्याला सादर करण्यासाठी करू शकता.

- **Microsoft Agent Framework शी समाकलित**. Microsoft Foundry Agent Service Microsoft Agent Framework सोबत सुरळीत कार्य करतो, म्हणजे आपण `FoundryChatClient` वापरून एजंट तयार करू शकता आणि उत्पादनासाठी एजंट सेवा वापरून तैनात करू शकता.

**वापर प्रकरणे**: Microsoft Foundry Agent Service सुरक्षित, स्केलेबल, लवचीक AI एजंट तैनातीसाठी डिझाइन केलेले एक एंटरप्राइझ अनुप्रयोगांसाठी योग्य प्लॅटफॉर्म आहे.

## या दोघांमध्ये फरक काय आहे?
 
काहीसे सारखे वाटते, पण त्यांच्या डिझाइन, क्षमता, आणि लक्षित वापराच्या बाबतीत काही प्रमुख फरक आहेत:
 
- **Microsoft Agent Framework (MAF)**: AI एजंट तयार करण्यासाठी उत्पादन-तयार SDK आहे. हे टूल कॉलिंग, संभाषण व्यवस्थापन, आणि Azure ओळख समाकलनासह एजंट तयार करण्यासाठी सुलभ API पुरवतो.
- **Microsoft Foundry Agent Service**: Microsoft Foundry मधील एजंट्ससाठी प्लॅटफॉर्म आणि तैनात सेवा आहे. हे Azure OpenAI, Azure AI सर्च, Bing सर्च, आणि कोड अंमलबजावणी यांसारख्या सेवा समाकलित करते.
 
अजूनही निवड पाहिजे का?

### वापर प्रकरणे
 
काही सामान्य वापर प्रकरणे पाहूया, ज्यामुळे आपल्याला मदत होईल:
 
> प्रश्नः मी उत्पादन AI एजंट अनुप्रयोग तयार करीत आहे आणि लवकर सुरू करू इच्छितो.
>

>उत्तरः Microsoft Agent Framework चांगला पर्याय आहे. `FoundryChatClient` द्वारे Python आधारित सहज API देतो ज्यामुळे आपण काही ओळींतच टूल्स आणि सूचना असलेले एजंट परिभाषित करू शकता.

>प्रश्नः माझ्या अनुप्रयोगाला Azure समाकलनांसह एंटरप्राइझ-ग्रेड तैनाती पाहिजे.
>
>उत्तरः Microsoft Foundry Agent Service उत्तम आहे. हे प्लॅटफॉर्म सेवा असून, विविध मॉडेल्स, Azure AI Search, Bing Search, आणि Azure Functionsसह अंगभूत कनेक्टिव्हिटी देते. आपण Foundry पोर्टलमध्ये एजंट तयार करून स्केलवर तैनात करू शकता.
 
> प्रश्नः मला अजूनही संभ्रमित वाटते, मला फक्त एक पर्याय द्या.
>
> उत्तरः एजंट तयार करण्यासाठी Microsoft Agent Framework वापरा, आणि जेव्हा उत्पादनात तैनात करायचे असेल तेव्हा Microsoft Foundry Agent Service वापरा. ह्या दृष्टिकोनामुळे आपण जलद पुनरावृत्ती करू शकता आणि स्पष्ट मार्गाने एंटरप्राइझ तैनाती करू शकता.
 
मुख्य फरकांचा सारांश खालील तक्त्यात पहा:

| फ्रेमवर्क | लक्ष केंद्रित | मूलभूत संकल्पना | वापर प्रकरणे |
| --- | --- | --- | --- |
| Microsoft Agent Framework | टूल कॉलिंगसहित सुलभ एजंट SDK | एजंट, टूल्स, Azure ओळख | AI एजंट तयार करणे, टूल वापर, बहु-टप्प्याचे कार्यप्रवाह |
| Microsoft Foundry Agent Service | लवचिक मॉडेल्स, एंटरप्राइझ सुरक्षा, कोड जनरेशन, टूल कॉलिंग | मॉड्युलॅरिटी, सहकार्य, प्रक्रिया समन्वय | सुरक्षित, स्केलेबल, आणि लवचीक AI एजंट तैनात करणे |

## माझ्या विद्यमान Azure इकोसिस्टम टूल्स थेट एकत्रित करू शकतो का, किंवा स्वतंत्र सोल्यूशन्सची गरज आहे का?


उत्तर होय आहे, आपण आपली विद्यमान Azure इकोसिस्टम साधने Microsoft Foundry Agent Service सोबत थेट एकत्रित करू शकता, विशेषतः कारण ती अन्य Azure सेवा सोबत सातत्यपूर्ण काम करण्यासाठी तयार केली गेली आहे. आपण उदाहरणार्थ Bing, Azure AI Search, आणि Azure Functions यांना एकत्रित करू शकता. Microsoft Foundry सह देखील खोल एकत्रिकरण आहे.

Microsoft Agent Framework देखील `FoundryChatClient` आणि Azure ओळख वापरून Azure सेवांसह एकत्रित होते, ज्यामुळे आपण आपली एजंट साधने वापरून Azure सेवांना थेट कॉल करू शकता.

## नमुना कोडे

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## AI Agent Frameworks विषयी अजून प्रश्न आहेत का?

[Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) मध्ये सामील व्हा जेथे आपण इतर शिकणाऱ्यांशी भेटू शकता, कार्यालयीन वेळांमध्ये सहभागी होऊ शकता आणि आपल्या AI Agents संदर्भातील प्रश्नांची उत्तरे मिळवू शकता.

## संदर्भ

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## मागील धडा

[Introduction to AI Agents and Agent Use Cases](../01-intro-to-ai-agents/README.md)

## पुढील धडा

[Understanding Agentic Design Patterns](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->