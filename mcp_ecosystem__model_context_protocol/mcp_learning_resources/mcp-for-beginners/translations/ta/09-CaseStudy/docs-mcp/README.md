# வழக்கு ஆய்வு: Microsoft Learn Docs MCP சர்வருடன் கிளையண்டில் இருந்து இணைப்பு

நீங்கள் ஒருமுறை கூட உங்கள் கோடிலான பிரச்சனையை தீர்க்கும் போது, ​​ஆவணத்துடன் தொடர்புடைய தளங்கள், Stack Overflow மற்றும் தள்ளாது தேடல் இயந்திர டேப்கள் இடையே பல பீறுகள் செய்து கொண்டிருக்கிறீர்களா? நீங்கள் ஆவணங்களுக்கு மட்டும் ஒரு இரண்டாம் கணினி மானிட்டர் வைத்திருக்கிறீர்கள், அல்லது உங்கள் IDE மற்றும் உலாவியில் இடையே இடம் மாறிக்கொண்டே இருக்கிறீர்கள். ஆவணத்தை நேரடியாக உங்கள் வேலைபோக்ஸ்—உங்கள் செயலிகள், உங்கள் IDE அல்லது உங்கள் சொந்த தனிப்பயன் கருவிகளில் ஒருங்கிணைப்பது நல்லதல்லவா? இந்த வழக்கு ஆய்வு, Microsoft Learn Docs MCP சர்வருக்கு உங்கள் சொந்த கிளையண்ட் செயலியில் இருந்து நேரடியாக இணைவது எப்படி என பார்க்கலாம்.

## கண்ணோட்டம்

நவீன வளர்ச்சியில் என்ன தன்னை எழுதுவதிலிருந்து மட்டும் இல்லை—தகவல் சரியான நேரத்தில் சரியான இடத்தில் கண்டுபிடிப்பதே முக்கியம். ஆவணம் எங்கும் உள்ளது, ஆனால் பெரும்பாலும் அது தேவையான இடத்தில் இல்லை: உங்கள் கருவிகள் மற்றும் வேலையாட்களில். ஆவணத்தை நேரடியாக உங்கள் செயலிகளுக்கு ஒருங்கிணைத்து, நீங்கள் நேரம் சேமித்து, சூழல் மாற்றத்தை குறைத்து, உற்பத்தித்தன்மையை அதிகரிக்க முடியும். இந்த பகுதியில், Microsoft Learn Docs MCP சர்வருக்கு ஒரு கிளையண்ட் எப்படி இணைவதென்பதை பார்க்கப்போகிறோம், உங்கள் செயலியை விட்டு வெளியேறாமல் நேரடி, சூழல்-அறிந்த ஆவணத்திட்டங்களை அணுக முடியும்.

இணைப்பை ஏற்படுத்துவது, கோரிக்கை அனுப்புவது மற்றும் ஸ்ட்ரீமிங் பதில்களை திறமையாக கையாள்வதன் செயல்முறையை புரியவைத்து செல்லப்போகிறோம். இந்த முறையை பயன்படுத்த, உங்கள் வேலைபோக்கை எளிதாக்குவதோடு மட்டுமல்ல, மேலும் நுண்ணறிவு வாய்ந்த மற்றும் உதவிகரமான டெவலப்பர் கருவிகளை உருவாக்குவதற்கு வாயிலாகும்.

## கற்றல் குறிக்கோள்கள்

நாம் இதைப் புரியச் செய்வதன் நோக்கம் என்ன? சிறந்த டெவலப்பர் அனுபவம் தடைகளை நீக்கும். உங்கள் கோட் எடிட்டர், கேள்விகளுக்கு உடனடி பதிலளிக்கும் chatbot அல்லது வலை செயலி, Microsoft Learn இன் சமீபத்திய உள்ளடக்கத்தைப் பயன்படுத்தி உதவுகிறது என்ற உலகத்தை கற்பனை செய்க. இதன் முடிவில், நீங்கள் எப்படி:

- ஆவணத்திற்கு MCP சர்வர்-கிளையண்ட் தொடர்பின் அடிப்படைகளை புரிந்துகொள்ள
- Microsoft Learn Docs MCP சர்வருக்கு இணைக்க ஒரு கான்சோல் அல்லது வலை செயலியை உருவாக்க
- நேரடி ஆவணக் கிடைப்பிற்கு ஸ்ட்ரீமிங் HTTP கிளையண்ட்களைப் பயன்படுத்த
- உங்கள் செயலியில் ஆவண பதில்களை பதிவுசெய்து, அவற்றை விளக்க

இந்த திறன்கள் உங்களுக்கு நடக்கக்கூடிய, உண்மையில் தொடர்புள்ள மற்றும் சூழல்-அறிந்த கருவிகளை உருவாக்க உதவும்.

## காட்சிப் படம் 1 - MCP உடன் நேரடி ஆவணக் கிடைப்பிக்கை

இந்த காட்சியில், Microsoft Learn Docs MCP சர்வருடன் கிளையண்ட் எப்படி இணைப்பது என்பதை காண்போம், உங்கள் செயலியை விட்டு வெளியேறாமல் நேரடி மற்றும் சூழல்-அறிந்த ஆவணத்திட்டங்களை அணுக.

இதனை நடைமே కொள்ளுங்கள். Microsoft Learn Docs MCP சர்வருடன் இணைக்கும், `microsoft_docs_search` கருவியை அழைக்கும் மற்றும் ஸ்ட்ரீமிங் பதிலை கான்சோலில் பதிவு செய்யும் செயலியை எழுத உங்கள் பணி.

### இந்த முறையின் காரணம் என்ன?
இது மேம்பட்ட ஒருங்கிணைப்புகளை உருவாக்க அடித்தளமாகும்—உங்களால் chatbot, IDE நீட்சிப்பொதி அல்லது ஒரு வலை டாஷ்போர்டை இயக்க விரும்பினாலும்.

இந்த காட்சிக்கான குறியீடு மற்றும் வழிமுறைகள் இந்த வழக்கு ஆய்வின் [`solution`](./solution/README.md) கோப்பகத்தில் கிடைக்கும். படிகளால் நீங்கள் எப்படி இணைக்க வேண்டும் என்பதில் உதவி வழங்கப்படும்:
- அதிகாரப்பூர்வ MCP SDK மற்றும் ஸ்ட்ரீமிங் HTTP கிளையண்டை பயன்படுத்தி இணைப்பு செய்வது
- ஆவணங்களை பெற `microsoft_docs_search` கருவியை கேள்விக் கட்டளை கொண்டு அழைப்பது
- சரியான பதிவு மற்றும் பிழை கையாளுதல் அமல்படுத்துவது
- பயனர்களுக்கு பல தேடல் கேள்விகள் உள்ளிட அனுமதிக்கும் தொடர்பு கான்சோல் இடைமுகத்தை உருவாக்குவது

இந்த காட்சி செய்யும்வை:
- Docs MCP சர்வருடன் இணைப்பு செய்வது
- கேள்வி அனுப்புவது
- முடிவுகளை பிரித்து அச்சிடுவது

இதோ, செயலியை இயக்கும் போதும் எப்படி இருக்கும் என்பதை:

```
Prompt> What is Azure Key Vault?
Answer> Azure Key Vault is a cloud service for securely storing and accessing secrets. ...
```

கீழே குறைந்த அளவிலான மாதிரி தீர்வு உள்ளது. முழுக்குறியீடும் விரிவுகளும் solution கோப்பகத்தில் உள்ளது.

<details>
<summary>Python</summary>

```python
import asyncio
from mcp.client.streamable_http import streamablehttp_client
from mcp import ClientSession

async def main():
    async with streamablehttp_client("https://learn.microsoft.com/api/mcp") as (read_stream, write_stream, _):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()
            result = await session.call_tool("microsoft_docs_search", {"query": "Azure Functions best practices"})
            print(result.content)

if __name__ == "__main__":
    asyncio.run(main())
```

- முழுமையான செயலாக்கமும் பதிவும் [`scenario1.py`](../../../../09-CaseStudy/docs-mcp/solution/python/scenario1.py) கோப்பில் உள்ளது.
- நிறுவும் மற்றும் பயன்பாட்டு வழிமுறைகளுக்கு, அதே கோப்பகத்தில் உள்ள [`README.md`](./solution/python/README.md) பார்வையிடவும்.
</details>


## காட்சிப் படம் 2 - MCP உடன் தொடர்புடைய ஆய்வுத் திட்ட உருவாக்கும் வலை செயலி

இந்த காட்சியில், Docs MCP ஐ ஒரு வலை அபிவிருத்தி திட்டத்தில் ஒருங்கிணைக்க கற்றுக்கொள்வீர்கள். இலக்கு, பயனர்கள் நேரடியாக Microsoft Learn ஆவணங்களில் தேட முடியும், ஆவணங்கள் உடனடியாக உங்கள் செயலியில் அல்லது இணையதளத்தில் கிடைக்கும் வகையில்.

பயனர்கள் எப்படி:
- ஒரு வலை செயலியை அமைக்க
- Docs MCP சர்வருடன் இணைக்க
- பயனர் உள்ளீட்டை கையாள்ந்து முடிவுகளை காட்சியிட

இதோ, செயலியை இயக்கும் போதும் எப்படி இருக்கும் என்பதை:

```
User> I want to learn about AI102 - so suggest the roadmap to get it started from learn for 6 weeks

Assistant> Here’s a detailed 6-week roadmap to start your preparation for the AI-102: Designing and Implementing a Microsoft Azure AI Solution certification, using official Microsoft resources and focusing on exam skills areas:

---
## Week 1: Introduction & Fundamentals
- **Understand the Exam**: Review the [AI-102 exam skills outline](https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-102/).
- **Set up Azure**: Sign up for a free Azure account if you don't have one.
- **Learning Path**: [Introduction to Azure AI services](https://learn.microsoft.com/en-us/training/modules/intro-to-azure-ai/)
- **Focus**: Get familiar with Azure portal, AI capabilities, and necessary tools.

....more weeks of the roadmap...

Let me know if you want module-specific recommendations or need more customized weekly tasks!
```

கீழே குறைந்த அளவிலான மாதிரி தீர்வு உள்ளது. முழுக்குறியீடும் விரிவுகளும் solution கோப்பகத்தில் உள்ளது.

![காட்சிப் படம் 2 கண்ணோட்டம்](../../../../translated_images/ta/scenario2.0c92726d5cd81f68.webp)

<details>
<summary>Python (Chainlit)</summary>

Chainlit என்பது உரையாடல் செயற்கை நுண்ணறிவு வலை செயலிகளை உருவாக்கும் கட்டமைப்பு. MCP கருவிகளை அழைக்கவும் முடிவுகளை நேரடியாக காட்டவும் இது எளிதாக்குகிறது. வேகமான மாதிரி உருவாக்கம் மற்றும் பயனரவான இடைமுகங்களுக்கு இது சிறந்தது.

```python
import chainlit as cl
import requests

MCP_URL = "https://learn.microsoft.com/api/mcp"

@cl.on_message
def handle_message(message):
    query = {"question": message}
    response = requests.post(MCP_URL, json=query)
    if response.ok:
        result = response.json()
        cl.Message(content=result.get("answer", "No answer found.")).send()
    else:
        cl.Message(content="Error: " + response.text).send()
```

- முழுமையான செயலாக்கத்திற்காக, [`scenario2.py`](../../../../09-CaseStudy/docs-mcp/solution/python/scenario2.py) பார்க்கவும்.
- அமைக்கும் மற்றும் இயக்கும் வழிமுறைகளுக்கு, [`README.md`](./solution/python/README.md) பார்வையிடவும்.
</details>


## காட்சிப் படம் 3: VS Code இல் MCP சர்வருடன் உள்ளே-எடிட்டர் ஆவணங்கள்

நீங்கள் VS Code இல் நேரடியாக Microsoft Learn Docs பெற விரும்பினால் (உலாவி டேப்களிடையே மாறாமல்), உங்கள் எடிட்டரில் MCP சர்வரைப் பயன்படுத்தலாம். இதனால் நீங்கள்:
- உங்கள் வரிசைப்படுத்தல் சூழலை விட்டு வெளியேறாமல் VS Code இல் ஆவணங்களை தேடி படிக்க முடியும்.
- ஆவணங்களை மேற்கோள் காட்டி README அல்லது பாட குறிகள் கோப்புகளில் இணைப்புகளை சேர்க்கலாம்.
- GitHub Copilot மற்றும் MCP ஐ இணைத்து சீரான, AI இயக்கப்படும் ஆவண வேலைப்பாட்டைப் பயன்படுத்தலாம்.

**நீங்கள் பார்க்கப்போகிறீர்கள்:**
- உங்கள் பணியிடத்தின் மூல்பகுதியில் செல்லுபடியான `.vscode/mcp.json` கோப்பை சேர்க்க (கீழே எடுத்துக்காட்டு).
- VS Code இல் MCP குழுவைத் திறக்க அல்லது கட்டளை குழியில் இருந்து ஆவண தேடல் மற்றும் சேர்க்கை செய்ய.
- நீங்கள் வேலை செய்யும் போது உங்கள் மார்க்டவுன் கோப்புகளில் நேரடியாக ஆவணத்தை மேற்கோள் காட்டு.
- GitHub Copilot உடன் இந்த workflow-வை இணைத்து இன்னும் அதிக உற்பத்தித்தன்மை பெற.

இங்கே VS Code இல் MCP சர்வரை அமைக்கும் எடுத்துக்காட்டு:

```json
{
  "servers": {
    "LearnDocsMCP": {
      "url": "https://learn.microsoft.com/api/mcp"
    }
  }
}
```

</details>

> படங்கள் மற்றும் படிப்படி வழிமுறைகள் உடன் விரிவான நடைமுறை விளக்கத்திற்கு, [`README.md`](./solution/scenario3/README.md) பார்க்கவும்.

![காட்சிப் படம் 3 கண்ணோட்டம்](../../../../translated_images/ta/step4-prompt-chat.12187bb001605efc.webp)

இந்த முறை தொழில்நுட்ப பாடங்கள் உருவாக்கும், ஆவணம் எழுதும், அல்லது அடிக்கடி மேற்கோள் தேவையுள்ள கோடை உருவாக்கும் யாராக இருந்தாலும் ஏற்றது.

## முக்கியக் குறிப்புகள்

ஆவணத்தை நேரடியாக உங்கள் கருவிகளில் ஒருங்கிணைப்பது பிரயோஜனமாக மட்டுமல்ல, உற்பத்தித்தன்மைக்கு ஒரு பெரிய மாற்றாகும். உங்கள் கிளையண்டிலிருந்து Microsoft Learn Docs MCP சர்வருடன் இணைத்து, நீங்கள்:

- உங்கள் குறியீடு மற்றும் ஆவணத்துக்கிடையேயான சூழல் மாறுதலை நீக்க
- நேரடியாக சமீபத்திய மற்றும் சூழல் தெரியும் ஆவணங்களை பெற்றுக்கொள்ள
- நுண்ணறிவு வாய்ந்த, மேலும் தொடர்புள்ள டெவலப்பர் கருவிகளை உருவாக்க

இந்த திறன்கள் மூலம் நீங்கள் செயல்திறனுள்ளதோடு, பயன்படுத்துவதற்கு மகிழ்ச்சியான தீர்வுகளை உருவாக்க முடியும்.

## கூடுதல் வளங்கள்

உங்கள் புரிதலை ஆழப்படுத்த, இந்த அதிகாரப்பூர்வ வளங்களை ஆராயவும்:

- [Microsoft Learn Docs MCP Server (GitHub)](https://github.com/MicrosoftDocs/mcp)
- [Azure MCP Server ஆரம்பிப்பது (mcp-python)](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started#create-the-python-app)
- [Azure MCP Server என்றால் என்ன?](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/)
- [மாதிரி சூழல் பிரோட்டோக்கால் (MCP) அறிமுகம்](https://modelcontextprotocol.io/introduction)
- [MCP சர்வரில் இருந்து பிளக்இன்களைச் சேர்க்க (Python)](https://learn.microsoft.com/en-us/semantic-kernel/concepts/plugins/adding-mcp-plugins)

## அடுத்தது என்ன

- திரும்ப: [வழக்கு ஆய்வுகள் கண்ணோட்டம்](../README.md)
- தொடர: [அலகு 10: AI பணிசெலுத்தல்களை எளிதாக்க AI கருவியூட்டக் கொண்டு MCP சர்வர் கட்டமைத்தல்](../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:  
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவையான [Co-op Translator](https://github.com/Azure/co-op-translator) மூலம் மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்தைக் குறிக்கோளாக வைத்துள்ளாலும், தானியங்கி மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கக்கூடும் என்பதை தயவுசெய்து நன்கு அறியவும். இந்த ஆவணத்தின் இயல்புநிலையான மொழியிலுள்ள அசல் ஆவணம் அதிகாரப்பூர்வமான மூலமாக கருதப்பட வேண்டும். முக்கிய தகவல்களுக்கு, தொழில்முறை மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பின் பயன்படுத்தலால் ஏற்பட்ட எந்த தவறுபாடுகளுக்கும் அல்லது தவறாகப் புரிந்துகொள்ளல்களுக்கும் நாங்கள் பொறுப்பேற்கமாட்டோம்.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->