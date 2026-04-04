# കേസ് സ്റ്റഡി: ക്ലയന്റ് ആയി Microsoft Learn Docs MCP സർവറിൽ കണക്ട് ചെയ്യുന്നത്

നിങ്ങൾ ഒരിക്കലെങ്കിലും ഡോക്യുമെന്റേഷൻ സൈറ്റുകൾ, Stack Overflow, അനവധി സെർച്ച് എഞ്ചിൻ ടാബുകൾഇതരത്ത് ഇടിച്ചാടിക്കൊണ്ടിരിക്കുമോയായിരുന്നു, നിങ്ങളുടെ കോഡിൽ പ്രശ്നം പരിഹരിക്കുന്നതിനു വേണ്ടി? നിങ്ങൾക്ക് ഡോക്സ് ഒറ്റയ്ക്ക് നോക്കാൻ ഒരു സെക്കൻഡ് മോണിറ്റർ ഉണ്ടാകാമോ, അല്ലെങ്കിൽ നിങ്ങൾ സ്ഥിരം ആൾട്ട്-ടാബ് ഉപയോഗിച്ച് IDEയും ബ്രൗസറും മടങ്ങിമാറിപ്പോകുമോ? നിങ്ങളുടെ പ്രവൃത്തിപദ്ധതിയിൽ തന്നെ ഡോക്യുമെന്റേഷൻ എത്തിക്കാൻ വഴി ഉണ്ടാകില്ലേ—നിങ്ങളുടെ അപ്ലിക്കേഷനുകളിലും, IDE-യിൽ അതവാ നിങ്ങളുടെ സ്വന്തം കസ്റ്റം ടൂളുകളിലായി? ഈ കേസ് സ്റ്റഡിയിൽ, നമുക്ക് പ്രായോഗികമായി കാണാം, നിങ്ങളുടെ സ്വന്തം ക്ലയന്റ് അപ്ലിക്കേഷൻ വഴി Microsoft Learn Docs MCP സർവറുമായി നേരിട്ട് എങ്ങനെ ബന്ധപ്പെടാമെന്ന്.

## അവലോകനം

ആധുനിക ഡെവലപ്പ്മെന്റ് എന്നത് فقط കോഡ് എഴുതുന്നതല്ല—ഏറ്റവും കത്രികമായ സമയത്ത് ശരിയായ വിവരങ്ങൾ കണ്ടുപിടിക്കുന്നതും ആണ്. ഡോക്യുമെന്റേഷൻ എല്ലായിടത്തും ഉണ്ട്, എന്നാൽ അത് എല്ലായിടത്തും ആവശ്യമുള്ളിടത്തല്ല: നിങ്ങളുടെ ടൂളുകളിലും പ്രവൃത്തി പ്രക്രിയകളിലുമാണ് അതു വേണം. ഡോക്യുമെന്റേഷൻ സ്വയംശേഖരണത്തെ നിങ്ങളുടെ അപ്ലിക്കേഷനുകളിൽ സംയോജിപ്പിച്ചാൽ, നിങ്ങൾക്ക് സമയം ലാഭിക്കാനും, കേന്ദ്രീകൃതമായ കാര്യങ്ങളിൽ നിന്ന് മാറിപ്പോകേണ്ടതില്ലാതെ, ഉത്പാദകക്ഷമത വർദ്ധിപ്പിക്കാനുമാകും. ഈ വിഭാഗത്തിൽ, നമുക്ക് കാണിക്കുന്നത് എങ്ങനെ ഒരു ക്ലയന്റ് ഉപയോഗിച്ച് Microsoft Learn Docs MCP സർവറുമായി ബന്ധപ്പെടാമെന്ന്, ആപ്ലിക്കേഷൻ വഴിയൊഴിഞ്ഞു പോയാതെ യથാർത്ഥ സമയത്ത്, സ്ഥിതി മനസ്സിലാക്കുന്ന ഡോക്യുമെന്റേഷൻ എങ്ങനെ ലഭ്യമാക്കാം എന്നതാണ്.

### പ്രക്രിയ

ബന്ധം സ്ഥാപിക്കുക, അഭ്യർത്ഥന അയയ്ക്കുക, സ്ട്രീമിംഗ് പ്രതികരണങ്ങൾ ഫലപ്രദമായി കൈകാര്യം ചെയ്യുക എന്നിവ വഴി നമുക്ക് മുന്നോട്ട് പോകാം. ഈ സമീപനം നിങ്ങളുടെ പ്രവൃത്തിപദ്ധതി സുഗമമാക്കുന്നതായും, കൂടുതൽ ബുദ്ധിമുട്ടുള്ള, സഹായകരമായ ഡെവലപ്പർ ടൂളുകൾ സൃഷ്ടിക്കുന്ന വാതിൽ തുറക്കുന്ന ദേശിയയുമാണ്.

## പഠന ലക്ഷ്യങ്ങൾ

എന്തുകൊണ്ട് നാം ഇത് ചെയ്യുന്നു? കാരണം മികച്ച ഡെവലപ്പർ അനുഭവങ്ങൾ സ്രവം അകറ്റുന്പോൾ ലഭിക്കും. നിങ്ങളുടെ കോഡ് എഡിറ്റർ, ചാറ്റ്ബോട്ട്, അല്ലെങ്കിൽ വെബ് ആപ്പ് ഏറ്റവും പുതിയത് ഉള്ള Microsoft Learn ഉള്ളടക്കം ഉപയോഗിച്ച് ഡോക്യുമെന്റേഷൻ ചോദ്യങ്ങൾക്ക് ഉടൻ ഉത്തരങ്ങൾ നൽകുന്നതായി ചിന്തിക്കുക. ഈ അധ്യായം শেষിക്കുന്നവരെ, നിങ്ങൾക്ക് അറിയാൻ കഴിയുന്നത്:

- ഡോക്യുമെന്റേഷനു MCP സർവർ-ക്ലയന്റ് ആശയവിനിമയത്തിന്റെ അടിസ്ഥാനങ്ങൾ
- Microsoft Learn Docs MCP സർവറുമായി ബന്ധപ്പെടുന്ന കൺസോൾ അല്ലെങ്കിൽ വെബ് അപ്ലിക്കേഷൻ എങ്ങനെ നടപ്പിലാക്കാം
- യഥാർത്ഥ സമയത്തിലേക്ക് ഡോക്യുമെന്റേഷൻ ലഭ്യമാകാൻ സ്ട്രീമിംഗ് HTTP ക്ലയന്റുകൾ ഉപയോഗിക്കുക
- നിങ്ങളുടെ അപ്ലിക്കേഷനിൽ ഡോക്യുമെന്റേഷൻ പ്രതികരണങ്ങൾ രേഖപ്പെടുത്താനും വ്യാഖ്യാനിക്കാനും

ഈ നൈപുണ്യങ്ങൾ നിങ്ങൾക്ക് മാത്രമല്ല പ്രതികരണക്ഷമമായ, പൂർണ്ണമായും ഇൻററാക്ടീവ്, സ്ഥിതി മനസ്സിലാക്കുന്ന ടൂളുകൾ നിർമ്മിക്കാനും സഹായിക്കും.

## സന്നിവേശം 1 - MCP ഉപയോഗിച്ച് യഥാർത്ഥ സമയ ഡോക്യുമെന്റേഷൻ ലഭ്യത

ഈ സന്നിവേശത്തിൽ, നമുക്ക് Microsoft Learn Docs MCP സർവറുമായി ഒരു ക്ലയന്റ് എങ്ങനെ ബന്ധിപ്പിക്കാമെന്നു കാണിക്കും, അതിലൂടെ നിങ്ങളുടെ ആപ്പിൽ നിന്നു വിട്ടു കൂടാതെ യഥാർത്ഥ സമയം, സ്ഥിതി അറിയുന്ന ഡോക്സുകൾ ലഭ്യമാക്കുമ്പോൾ.

പ്രായോഗികമായി നോക്കാം. Microsoft Learn Docs MCP സർവറുമായി കണക്ട് ചെയ്ത്, `microsoft_docs_search` എന്ന ടൂൾ വിളിച്ച്, സ്ട്രീമിംഗ് പ്രതികരണം കൺസോളിൽ രേഖപ്പെടുത്തുന്ന ഒരു ആപ് നിങ്ങൾ എഴുതണം.

### എന്തുകൊണ്ട് ഈ സമീപനം?
കാരണമാകുന്നത് അത് കൂടുതൽ മികച്ച സംയോജിതങ്ങളൊരുക്കുന്നതിന് അടിസ്ഥാനം എന്നതാണ്—നിങ്ങൾക്ക് ഒരു ചാറ്റ്ബോട്ട്, IDE വിപുലീകരണം, അല്ലെങ്കിൽ വെബ് ഡാഷ്ബോർഡ് സജ്ജമാക്കണമെങ്കിൽ.

ഈ കേസ്സ Studyയിലെ [`solution`](./solution/README.md) ഫോൾഡറിൽ ഈ സന്നിവേശത്തിനു വേണ്ട കോഡ്, നിർദ്ദേശങ്ങൾ കാണും. കണക്ഷൻ സജ്ജീകരിക്കാൻ വിളമ്പുന്ന ഘട്ടങ്ങൾ താഴെ:

- ഔദ്യോഗിക MCP SDKയും സ്ട്രീമിംഗ് HTTP ക്ലയന്റും ഉപയോഗിക്കുക
- ഡോക്യുമെന്റേഷൻ ലഭിക്കാൻ `microsoft_docs_search` ടൂൾക്ക് ക്വറി പാരാമീറ്റർ കൊണ്ട് വിളിക്കുക
- ശരിയായ ലോഗിംഗ്, പിശകുകൾ കൈകാര്യം ചെയ്യൽ നടപ്പിലാക്കുക
- പല തിരയൽ ക്വറികളും നൽകാൻ ഉപയോക്താക്കൾക്ക് പലവട്ടം ക്വറി നൽകാൻ ഇന്ററാക്ടീവ് കൺസോൾ ഇന്റർഫേസ് സൃഷ്ടിക്കുക

ഈ സന്നിവേശം നിങ്ങൾക്ക് കാണിക്കും എങ്ങനെ:
- Docs MCP സർവറുമായി കണക്ട് ചെയ്യാം
- ക്വറി അയയ്ക്കാം
- ഫലങ്ങൾ പാഴ്‌സും, അച്ചടിക്കും

താഴെ ഈസൊല്യൂഷൻ പ്രവർത്തിക്കുന്നതിനുള്ള ഉദാഹരണമാണ്:

```
Prompt> What is Azure Key Vault?
Answer> Azure Key Vault is a cloud service for securely storing and accessing secrets. ...
```

താഴെ ഒരു കുറഞ്ഞ റീതി ഉദാഹരണ പരിഹാരമാണ്. മുഴുവൻ കോഡും വിശദാംശങ്ങളും സൊല്യൂഷൻ ഫോൾഡറിൽ ലഭ്യമാണ്.

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

- പൂര്‍ണ്ണമായ നടപ്പിലാക്കലിനും ലോഗിംഗിനും, [`scenario1.py`](../../../../09-CaseStudy/docs-mcp/solution/python/scenario1.py) കാണുക.
- ഇൻസ്റ്റാളേഷൻ, ഉപയോഗം നിർദ്ദേശങ്ങൾക്കായി, അതേ ഫോൾഡറിലുള്ള [`README.md`](./solution/python/README.md) കാണുക.
</details>


## സന്നിവേശം 2 - MCP ഉപയോഗിച്ച് ഇന്ററാക്ടീവ് സ്റ്റഡി പ്ലാൻ ജനറേറ്റർ വെബ് ആപ്പ്

ഈ സന്നിവേശത്തിൽ, നിങ്ങൾക്ക് MCP വെബ് ഡെവലപ്പ്മെന്റ് പ്രോജക്ടിൽ എങ്ങനെ സംയോജിപ്പിക്കാമെന്ന് പഠിക്കാം. ലക്ഷ്യം ഉപയോക്താക്കൾക്ക് Microsoft Learn ഡോക്യുമെന്റേഷനെ നേരിട്ട് വെബ് ഇന്റർഫേസ് വഴി തിരയിക്കാനുള്ള സൗകര്യം ഒരുക്കുക എന്നതാണ്, ഉണ്ട് നിങ്ങളുടെ ആപ്പിലും സൈറ്റിലും ഡോക്യുമെന്റേഷൻ ഉടനെ തന്നെ ലഭ്യമാക്കാൻ.

നിങ്ങൾ കാണും എങ്ങനെ:
- ഒരു വെബ് ആപ്പ് സജ്ജമാക്കണം
- Docs MCP സർവറുമായി ബന്ധപ്പെടുത്തണം
- ഉപയോക്തൃ ഇൻപുട്ട് കൈകാര്യം ചെയ്ത് ഫലങ്ങൾ പ്രദർശിപ്പിക്കണം

ഇത് ഇതിനകം പ്രവർത്തിക്കുന്നതിന് ഉദാഹരണമാണ്:

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

താഴെ ഒരു കുറഞ്ഞ റീതി ഉദാഹരണ പരിഹാരമാണ്. മുഴുവൻ കോഡും വിശദാംശങ്ങളും സൊല്യൂഷൻ ഫോൾഡറിൽ ലഭ്യമാണ്.

![Scenario 2 Overview](../../../../translated_images/ml/scenario2.0c92726d5cd81f68.webp)

<details>
<summary>Python (Chainlit)</summary>

Chainlit എന്നത് സംവാദാത്മക AI വെബ് ആപ്പ് നിർമ്മിക്കുന്ന ഫ്രെയിംവർക്ക് ആണ്. ഇത് MCP ടൂളുകൾ വിളിക്കാൻ, ഫലങ്ങൾ യഥാർത്ഥ സമയത്ത് പ്രദർശിപ്പിക്കാൻ ഇല്ലാതെ ഉപയോക്തൃ സൗഹൃദമായ ഇന്ററാക്ടീവ് ചാറ്റ്ബോട്ടുകൾ സൃഷ്ടിക്കാൻ ലളിതമാക്കുന്നു. ദ്രുത പ്രോട്ടോടൈപ്പിംഗിനും സൗഹൃദ ഇന്റർഫേസ് നിർമാണത്തിനും ഇത് അനുയോജ്യമാണ്.

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

- സകല പ്രയോഗത്തിനും, [`scenario2.py`](../../../../09-CaseStudy/docs-mcp/solution/python/scenario2.py) കാണുക.
- ഇൻസ്റ്റാൾ ചെയ്തു പ്രവർത്തിപ്പിക്കുന്നതിന്, [`README.md`](./solution/python/README.md) ഫയൽ കാണുക.
</details>


## സന്നിവേശം 3: MCP സർവർ ഉപയോഗിച്ച് VS കോഡിൽ എഡിറ്ററിൽ തന്നെ ഡോക്സ്

നിങ്ങൾ ബ്രൗസർ ടാബുകൾ മാറാതെ തന്നെ നിങ്ങളുടെ VS Code-ൽ Microsoft Learn Docs നേരിട്ട് ആക്‌സസ് ചെയ്യണമെങ്കിൽ MCP സർവർ നിങ്ങളുടെ എഡിറ്ററിൽ ഉപയോഗിക്കാം. ഇതിനുളള സൗകര്യങ്ങൾ:

- കോഡിംഗ് പരിതസ്ഥിതിയില്‍ നിന്നും വിട്ടു കൂടാതെ ഡോക്സ് തിരയാനും വായിക്കാനും കഴിയും.
- README അല്ലെങ്കിൽ കോഴ്സ് ഫയലുകളിൽ നേരിട്ടുള്ള ഡോക്യമെന്റേഷൻ റഫറൻസ്, ലിങ്കുകൾ ചേർക്കാനാകും.
- GitHub Copilotക്കും MCP-നും ചേർന്ന് കൂടുതൽ അനായാസവും AI സംയോജിതവും ഡോക്യുമെന്റേഷൻ പ്രവൃത്തിപദ്ധതി സൃഷ്ടിക്കാൻ.

**നിങ്ങൾക്ക് കാണാൻ സാധിക്കും:**
- നിങ്ങളുടെ വർക്‌സ്പേസ് റൂട്ടിൽ ഒരു സാധുവായ `.vscode/mcp.json` ഫയൽ ചേർക്കുക (താഴെയുള്ള ഉദാഹരണം കാണുക).
- MCP പാനൽ തുറക്കുക അല്ലെങ്കിൽ VS Code-യിലെ കമാൻഡ് പാനൽ ഉപയോഗിച്ച് ഡോക്സ് തിരയുകയും ചേർക്കുകയും ചെയ്യുക.
- മർക്ക്ഡൗൺ ഫയലുകളിൽ നേരിട്ടുള്ള ഡോക്സുകൾ റഫറൻസുചെയ്യുക.
- GitHub Copilot ഉപയോഗിച്ച് ഈ പ്രവൃത്തി രീതിയിലുടെ കൂടുതൽ പ്രൊഡക്ടിവിറ്റി നേടുക.

VS Code-ലേക്ക് MCP സർവറിന്റെ സജ്ജീകരണത്തിന് ഒരു ഉദാഹരണം:

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

> സ്ക്രീൻഷോട്ടുകളോടുകൂടിയ വിശദമായ വീക്ഷണവും ഘട്ടംഘട്ടമായ ഗൈഡും ലഭിക്കാൻ [`README.md`](./solution/scenario3/README.md) കാണുക.

![Scenario 3 Overview](../../../../translated_images/ml/step4-prompt-chat.12187bb001605efc.webp)

ഇത് സാങ്കേതിക കോഴ്‌സുകൾ നിർമ്മിക്കുന്നവർക്കും, ഡോക്യമെന്റേഷൻ എഴുതുന്നതിനും, ഓർത്തുപറഞ്ഞു കൊണ്ട് കോഡിംഗ് ചെയ്യുന്നവർക്കും അനുയോജ്യമാണ്.

## പ്രധാനപ്പെട്ട പഠനങ്ങൾ

ഡോക്യുമെന്റേഷൻ നിങ്ങളുടെ ടൂളുകളിലേക്ക് നേരിട്ട് സംയോജിപ്പിക്കുന്നത് അനുഗ്രഹം മാത്രമല്ല—ഉത്പാദകക്ഷമതയ്ക്ക് വലിയ മാറ്റമാണ്. Microsoft Learn Docs MCP സർവറുമായി നിങ്ങളുടെ ക്ലയന്റ് വഴി ബന്ധപ്പെടുക മൂലം:

- കോഡും ഡോകസും തമ്മിലുള്ള സ്ഥിതി മാറ്റങ്ങൾ നീക്കം ചെയ്യുക
- യഥാർത്ഥ സമയത്ത് പുതുക്കപ്പെട്ട, സ്ഥിതി മനസ്സിലാക്കുന്ന ഡോക്യുമെന്റേഷൻ ലഭ്യമാക്കുക
- കൂടുതൽ ബുദ്ധിമുട്ടുള്ള, ഇന്ററാക്ടീവ് ഡെവലപ്പർ ടൂളുകൾ നിർമ്മിക്കുക

ഈ കഴിവുകൾ നിങ്ങളുടെ പരിഹാരങ്ങൾ എളുപ്പമുള്ളതും, ഉപയോഗിച്ച് സന്തോഷം നൽകുന്നവയുമാക്കും.

## അധിക സ്രോതസുകൾ

തികച്ചും മനസ്സിലാക്കാൻ ഈ ഔദ്യോഗിക സ്രോതസുകൾ പരിശോധിക്കുക:

- [Microsoft Learn Docs MCP Server (GitHub)](https://github.com/MicrosoftDocs/mcp)
- [Get started with Azure MCP Server (mcp-python)](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started#create-the-python-app)
- [What is the Azure MCP Server?](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/)
- [Model Context Protocol (MCP) Introduction](https://modelcontextprotocol.io/introduction)
- [Add plugins from a MCP Server (Python)](https://learn.microsoft.com/en-us/semantic-kernel/concepts/plugins/adding-mcp-plugins)

## അടുത്തത് എന്ത്?

- മടങ്ങി: [Case Studies Overview](../README.md)
- തുടരണം: [Module 10: Streamlining AI Workflows with AI Toolkit](../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അസ്വാധീന വിവരം**:  
ഈ രേഖ AI തർജ്ജമ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് തർജ്ജമ ചെയ്തതാണ്. കൃത്യതയ്ക്ക് ശ്രമിച്ചും, യന്ത്രം ചെയ്ത തർജ്ജമയിൽ പിശകുകൾ അല്ലെങ്കിൽ തെറ്റിദ്ധാരണകളുണ്ടാകാമെന്ന് അറിയിക്കുക. മൂല രേഖയുടെ സ്വദേശഭാഷയിലുള്ള പതിപ്പ് മാത്രമേ പ്രാമാണിക സ്രോതസ്സായി പ considers ചിയിക്കപ്പെടേണ്ടത്. നിർണായക വിവരങ്ങൾക്ക് പ്രൊഫഷണൽ മനുഷ്യ തർജ്ജമ നിർദ്ദേശിക്കപ്പെടുന്നു. ഈ തർജ്ജമയെ ഉപയോഗിച്ചുവന്നുപോലുള്ള തെറ്റിദ്ധാരണകൾക്കും പിശകുകൾക്കും ഞങ്ങൾ ഉത്തരവാദിത്തമില്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->