# Azure Content Safety ഉപയോഗിച്ച് ആഡ്വാൻസ്ഡ് MCP സിക്യൂരിറ്റി

> **OWASP MCP റിസ്ക് അഡ്രസ്സുചെയ്‌തത്**: [MCP06 - Intent Flow Subversion](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety നിങ്ങളുടെ MCP നടപ്പാക്കലുകളുടെ സുരക്ഷ വർധിപ്പിക്കാൻ കഴിയുന്ന നിരവധി ശക്തമായ ഉപകരണങ്ങൾ നൽകുന്നു. പ്രായോഗിക നടപ്പാക്കൽ അനുഭവത്തിനായി, [MCP സെക്യൂരിറ്റി സമ്മിറ്റ് വർക്ക്‌ഷോപ്പ് (ഷെർപ)](https://azure-samples.github.io/sherpa/) ക്യാമ്പ് 3: I/O Security കാണുക.

## പ്രോംപ്റ്റ് ഷീൽഡുകൾ

Microsoft-ന്റെ AI പ്രോംപ്റ്റ് ഷീൽഡുകൾ നേരിട്ട് കൂടാതെ പരോക്ഷമായി പ്രോംപ്റ്റ് ഇഞ്ചക്ഷൻ ആക്രമണങ്ങളിൽ നിന്ന് ശക്തമായ സംരക്ഷണം നൽകുന്നു:

1. **ആധുനിക കണ്ടെത്തൽ**: ഉള്ളടക്കത്തിൽ ഉൾപ്പെടുത്തിയ ദുസ്സഹമായ നിർദ്ദേശങ്ങൾ തിരിച്ചറിവിനായി മെഷീൻ ലേണിംഗ് ഉപയോഗിക്കുന്നു.
2. **സ്പോട്ട്‌ലൈറ്റിങ്**: AI സിസ്റ്റങ്ങൾക്കും കൃത്യമായ നിർദ്ദേശങ്ങളും പുറത്തുള്ള ഇൻപുട്ടുകളും തമ്മിലാക്കുന്നതിനായി ഇൻപുട്ട് ടെക്സ്റ്റ് പരിവർത്തനം ചെയ്യുന്നു.
3. **ഡെലിമിറ്ററുകളും ഡാറ്റമാർക്കിംഗും**: വിശ്വാസയോഗ്യമല്ലാത്ത ഡാറ്റയ്ക്ക് വേണ്ടി അതിജീവന സീമകൾ അടയാളപ്പെടുത്തുന്നു.
4. **Content Safety ഇന്റഗ്രേഷൻ**: jailbreak ശ്രമങ്ങളും ഹാനികരമായ ഉള്ളടക്കവും കണ്ടെത്താൻ Azure AI Content Safety-ഉം പ്രവർത്തിക്കുന്നു.
5. **തുടര്‍ന്നുള്ള അപ്ഡേറ്റുകൾ**: ഉയരുന്ന ഭീഷണികളിൽ നിന്നും സംരക്ഷണം ഉറപ്പാക്കാൻ Microsoft സംരക്ഷണ സംവിധാനം പതിവായി നവീകരിക്കുന്നു.

## MCP-യുമായി Azure Content Safety നടപ്പാക്കൽ

ഈ സമീപനം മൾട്ടി-ലയർ ആയ സംരക്ഷണം നൽകുന്നു:
- പ്രോസസ്സിംഗ് നടത്തുന്നതിനു മുൻപ് ഇൻപുട്ടുകൾ സ്‌കാൻ ചെയ്യൽ
- മടങ്ങിവരുന്നതിനു മുൻപ് ഔട്ട്പുട്ടുകൾ സാധുത പരിശോധിക്കൽ
- അറിയപ്പെട്ട ദുഷ്കൃത്യരേഖകൾക്കായി ബ്ലോക്ക്ലിസ്റ്റുകൾ ഉപയോഗിക്കൽ
- Azure ഉള്ളടക്ക സേഫ്റ്റി മോഡലുകളുടെ തുടർച്ചയായ അപ്ഡേറ്റുകൾ പ്രയോജനപ്പെടുത്തൽ

## Azure Content Safety വിഭവങ്ങൾ

നിങ്ങളുടെ MCP സർവറുകളുമായി Azure Content Safety നടപ്പാക്കുന്നതിനെ കുറിച്ച് കൂടുതൽ അറിയാൻ, ഇവരിൽ നിന്നും ഔദ്യോഗിക വിഭവങ്ങൾ പരിശോധിക്കുക:

1. [Azure AI Content Safety ഡോക്യുമെന്റേഷൻ](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety-ന്റെ ഔദ്യോഗിക ഡോക്യുമെന്റേഷൻ.
2. [Prompt Shield ഡോക്യുമെന്റേഷൻ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - പ്രോംപ്റ്റ് ഇഞ്ചക്ഷൻ ആക്രമണങ്ങൾ തടയുന്നതെങ്ങനെ എന്ന് മനസിലാക്കുക.
3. [Content Safety API റഫറൻസ്](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety നടപ്പാക്കുന്നതിന് വിശദമായ API റഫറൻസ്.
4. [ക്വിക്ക്‌സ്റ്റാർട്ട്: C# ഉപയോഗിച്ച് Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# ഉപയോഗിച്ച് വേഗത്തിൽ നടപ്പാക്കൽ മാർഗ്ഗനിർദ്ദേശം.
5. [Content Safety ക്ലയന്റ് ലൈബ്രറികൾ](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - വിവിധ പ്രോഗ്രാമിംഗ് ഭാഷകൾക്കുള്ള ക്ലയന്റ് ലൈബ്രറികൾ.
6. [ജെയ്ൽബ്രേക്ക് ശ്രമങ്ങൾ തിരിച്ചറിയൽ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - ജെയ്ൽബ്രേക്ക് ശ്രമങ്ങൾ തിരിച്ചറിയാനുമായി പ്രത്യേക മാർഗ്ഗനിർദ്ദേശം.
7. [Content Safety-നുള്ള മികച്ച പ്രയോഗങ്ങൾ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - ഉള്ളടക്ക സുരക്ഷ ഫലപ്രദമായി നടപ്പാക്കുന്നതിനുള്ള മികച്ച പ്രയോഗ മാർഗങ്ങൾ.

കൂടുതൽ ആഴത്തിലുള്ള നടപ്പാക്കലിന്, നമ്മുടെ [Azure Content Safety Implementation ഗൈഡ്](./azure-content-safety-implementation.md) കാണുക.

## അടുത്തത് എന്താണ്

- വായിക്കുക: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- മടങ്ങുക: [Security Module Overview](./README.md)
- തുടരണം: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->