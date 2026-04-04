# Azure Content Safetyയോടൊപ്പം പ്രോഗ്രാമിംഗ് MCP സുരക്ഷയിലെ പുരോഗതികൾ

> **OWASP MCP-Risk Solutions**: [MCP06 - സാന്ദർഭിക പേയ്ലോഡ് വഴി പ്രാംപ്റ്റ് ഇഞ്ചക്ഷൻ](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety നിങ്ങളുടെ MCP നടപ്പാക്കലുകളുടെ സുരക്ഷ മെച്ചപ്പെടുത്തുന്നതിന് നിരവധി ശക്തമായ ഉപകരണങ്ങൾ നൽകുന്നു. പ്രായോഗിക പ്രവർത്തനംക്കായി, [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ക്യാമ്പ് 3: I/O Security കാണുക.

## പ്രാംപ്റ്റ് ശീൽഡുകൾ

Microsoftനു വേണ്ടി AI Prompt Shields നേരിട്ടും പരോക്ഷമായും പ്രാംപ്റ്റ് ഇഞ്ചക്ഷൻ ആക്രമണങ്ങളിൽ നിന്നുള്ള ദൃഢമായ സംരക്ഷണം നൽകുന്നു:

1. **അഗ്ന്യാന്വേഷണം**: ഉള്ളടക്കത്തിലുള്ള ദുർബല നിർദ്ദേശങ്ങളെ തിരിച്ചറിയാൻ മെഷീൻ ലേണിംഗിനെ ഉപയോഗിക്കുന്നു.
2. **മുന്നറിയിപ്പ് കാണിക്കൽ**: AI സംവിധാനങ്ങൾക്ക് സാധുവായ നിർദ്ദേശങ്ങളും ബാഹ്യ ഇന്പുട്ടുകളും വേർതിരിയാൻ ഇൻപുട്ട് വാചകം പരിവർത്തനം ചെയ്യുന്നു.
3. **പരിധികൾക്കും ഡാറ്റാമാർക്കിംഗും**: വിശ്വാസ്യതയുള്ള ഡാറ്റയും വിശ്വാസ്യത കിട്ടില്ലാത്ത ഡാറ്റയും തമ്മിൽ കാക്കുന്ന അടയാളങ്ങൾ.
4. **Content Safety ഏകീകരണം**: Azure AI Content Safety ഉപയോഗിച്ച് ജെയിൽബ്രേക്കിങ് ശ്രമങ്ങളും ഹാനികരമായ ഉള്ളടക്കവും കണ്ടെത്തുന്നു.
5. **ധാരാളമായ പുതുക്കലുകൾ**: പുതിയ ഭീഷണികളിൽ നിന്നും സംരക്ഷിക്കാൻ മൈക്രോസോഫ്റ്റ് കർശനമായി സംരക്ഷണ സംവിധാനം പുതുക്കുന്നു.

## MCP-യിലെ Azure Content Safety നടപ്പിലാക്കൽ

ഈ രീതി বহু നിലകളിലുള്ള സംരക്ഷണം നൽകുന്നു:
- പ്രോസസിംഗ് മുൻപ് ഇൻപുട്ടുകൾ സ്കാൻ ചെയ്യൽ
- ഔട്ട്പുട്ടുകൾ വАПിസ് നൽകുന്നതിനുമുൻപ് സ്ഥിരീകരിക്കൽ 
- അറിയപ്പെട്ട ഹാനികരമായ മാതൃകകളെ തടയാൻ ബ്ലോക്ക്ലിസ്റ്റുകൾ ഉപയോഗിക്കൽ
- Azure-യുടെ സ്ഥിരമായി പുതുക്കുന്ന Content Safety മോഡലുകൾ പ്രയോജനപ്പെടുത്തൽ

## Azure Content Safety വിഭവങ്ങൾ

MCP സെർവറുകളുമായി Azure Content Safety നടപ്പിലാക്കാൻ, ഈ ഔദ്യോഗിക വിഭവങ്ങൾ പരിശോധിക്കുക:

1. [Azure AI Content Safety ഡോക്ക്യൂമെന്റേഷന്‍](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safetyയ്ക്കുള്ള ഔദ്യോഗിക ഡോക്യുമെന്റേഷൻ.
2. [Prompt Shield ഡോക്ക്യൂമെന്റേഷൻ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - പ്രാംപ്റ്റ് ഇഞ്ചക്ഷൻ ആക്രമണങ്ങൾ തടയുന്നതു എങ്ങനെ എന്ന് പഠിക്കുക.
3. [Content Safety API റഫറൻസ്](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety നടപ്പാക്കാനുള്ള വിശദമായ API റഫറൻസ്.
4. [ക്വിക്‌സ്റ്റാർട്ട്: C# ഉപയോഗിച്ച് Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# ഉപയോഗിച്ച് быത്തവിതാന സ്റ്റാർട്ട് ചെയ്യാനുള്ള ഗൈഡ്.
5. [Content Safety ക്ലയന്റ് ലൈബ്രറികൾ](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - വ്യത്യസ്ത പ്രോഗ്രാമിംഗ് ഭാഷകൾക്കായുള്ള ക്ലയന്റ് ലൈബ്രറികൾ.
6. [ജെയിൽബ്രേക്ക് ശ്രമങ്ങൾ കണ്ടെത്തൽ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - ജെയിൽബ്രേക്ക് ശ്രമങ്ങൾ കണ്ടെത്താനും തടയാനുമായി പ്രത്യേക മാർഗ്ഗനിർദ്ദേശങ്ങൾ.
7. [Content Safety-യ്ക്കുള്ള മികച്ച സമീപനങ്ങൾ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - സമർത്ഥമായ content safety നടപ്പിലാക്കാനുള്ള മികച്ച മാർഗ്ഗങ്ങൾ.

കൂടുതൽ വിപുലമായ നടപ്പിലാക്കാനുള്ള മാർഗ്ഗനിർദ്ദേശങ്ങൾക്ക്, ഞങ്ങളുടെ [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md) കാണുക.

## ശേഷിപ്പുകൾ

- വായിക്കുക: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- മടങ്ങുക: [Security Module Overview](./README.md)
- തുടരണം: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**വിമോചന കുറിപ്പ്**:  
ഈ ഡോക്യുമെന്റ് AI വിവർത്തന സേവനമായ [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് വിവർത്തനം ചെയ്തതാണ്. നമുക്ക് എത്രത്തോളം ശരിയായ വിവർത്തനം നൽകാമെന്നു ശ്രമിക്കുന്നതായിരുന്നാലും, സ്വയംകഴിവുള്ള വിവർത്തനങ്ങളിൽ പിഴവുകൾ അല്ലെങ്കിൽ അസംബന്ധതകൾ ഉണ്ടാകാനിടയുണ്ട്. ഇതിന്റെ മാതൃഭാഷാപ്രതികൾ ഔദ്യോഗിക ഉറവിടമായിരിക്കണം. പ്രധാനപ്പെട്ട വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യനുപയോഗിച്ച വിവർത്തനം അഭിലഷിക്കപ്പെടുന്നു. ഈ വിവർത്തനം ഉപയോഗിച്ചതിന്റെ ഫലം വച്ച് ഉണ്ടായേക്കാവുന്ന തെറ്റിദ്ധാരണകൾക്കും തെറ്റാണായ വ്യാഖ്യാനങ്ങൾക്കും ഞങ്ങൾ ഉത്തരവാദികളായിരിക്കില്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->