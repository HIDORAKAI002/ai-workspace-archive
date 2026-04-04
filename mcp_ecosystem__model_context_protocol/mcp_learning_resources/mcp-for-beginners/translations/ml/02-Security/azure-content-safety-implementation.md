# MCP-യുമായി Azure Content Safety നടപ്പാക്കൽ

> **OWASP MCP റിസ്‌ക് പരിഹരിച്ചത്**: [MCP06 - Prompt Injection via Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

പറങ്ക് ഇൻജക്ഷൻ, ടൂൾ വിഷാംശങ്ങൾ, മറ്റ് AI-വിവേകിതമായ ഫോണ്ടൽപ്പാട് എന്നിവക്ക് മുൻ‌നിർത്തി MCP സുരക്ഷ ശക്തിപ്പെടുത്താൻ Azure Content Safety ഒത്തുചേർക്കുന്നത് വളരെ ശുപാർശ ചെയ്‌തിരിക്കുന്നു. ഈ നടപ്പാക്കൽ മാർഗ്ഗനിർദേശം [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) ക്യാമ്പ് 3: I/O Security-ന് അനുയോജ്യമാണ്.

## MCP സേർവറുമായി ഇന്റഗ്രേഷൻ

നിങ്ങളുടെ MCP സേർവറിൽ Azure Content Safety ഇന്റഗ്രേറ്റ് ചെയ്യാൻ, നിങ്ങളുടെ അഭ്യർഥന പ്രോസസിങ് പൈപ്പ്ലൈനിൽ മിഡിൽവെയർ ആയി content safety ഫിൽട്ടർ ചേർക്കുക:

1. സർവർ ആരംഭിക്കുമ്പോൾ ഫിൽട്ടർ ഇൻഷിയലൈസ് ചെയ്യുക  
2. പ്രോസസ്സ് ചെയ്യുന്നതിന് മുൻപ് എല്ലാ വരുന്ന ടൂൾ അഭ്യർഥനകളും പരിശോധിക്കുക  
3. ക്ലയന്റുകൾക്ക് നൽകുന്നതിന് മുൻപ് എല്ലാ പുറന്തള്ളൽ പ്രതികരണങ്ങളും പരിശോധിക്കുക  
4. സുരക്ഷാ ലംഘനങ്ങൾ ലോഗ് ചെയ്ത് അലേർട്ട് ചെയ്യുക  
5. പരാജയം സംഭവിച്ചാൽ അനുയോജ്യമായ പിശക് കൈകാര്യം നടപ്പാക്കുക  

ഇത് ശക്തമായ പ്രതിരോധം നൽകുന്നു:  
- prompting injection വാളുകൾക്കെതിരെ  
- ടൂൾ വിഷാംശ ശ്രമങ്ങൾക്കെതിരെ  
- ദുർവിനിയോഗ ഇൻപുട്ടുകൾ വഴി ഡാറ്റാ അധിക്രമണത്തിനെതിരെ  
- ഹാനികരമായ ഉള്ളടക്കം സൃഷ്ടിക്കലിന്  

## Azure Content Safety ഇന്റഗ്രേഷനു വേണ്ട മികച്ച രീതികൾ

1. **കസ്റ്റം ബ്ലോക്കി ലിസ്റ്റുകൾ**: MCP injection മാതൃകകൾക്കായി പ്രത്യേകമായ കസ്റ്റം ബ്ലോക്കി ലിസ്റ്റുകൾ സൃഷ്‌ടിക്കുക  
2. **ഗൗരവപരിശോധന ക്രമീകരണം**: നിങ്ങളുടെ നിർദ്ദിഷ്ട ഉപയോഗവും റിസ്ക് സഹനശേഷിയും അടിസ്ഥാനമാക്കി ഗൗരവപരിശോധന പരിധികൾ ക്രമീകരിക്കുക  
3. **സമ്പൂർണ്ണ പരിരക്ഷ**: എല്ലാ ഇൻപുട്ടുകൾക്കും ഔട്ട്പുട്ടുകൾക്കും content safety ചെറുക്കൾ നടപ്പാക്കുക  
4. **പ്രവർത്തനക്ഷമത മെച്ചപ്പെടുത്തൽ**: content safety ചെറുക്കുകൾ പുനരാവർത്തിക്കുമ്പോൾ caching പരിഗണിക്കുക  
5. **ബാക്ക്ഫാൾ മെക്കാനിസങ്ങൾ**: content safety സേവനങ്ങൾ ലഭ്യമല്ലാത്തപ്പോൾ വ്യക്തമായ fallback പെരുമാറ്റങ്ങൾ നിർവ്വചിക്കുക  
6. **ഉപയോക്തൃ പ്രതികരണം**: സുരക്ഷാ പ്രശ്നങ്ങൾ കാരണം ഉള്ളടക്കം ബ്ലോക്ക് ചെയ്‌തപ്പോൾ ഉപയോക്താക്കൾക്ക് സുതാര്യമായ പ്രതികരണം നൽകുക  
7. **നിരന്തര മെച്ചപ്പെടുത്തൽ**: പുതിയ ഭീഷണികൾ പ്രകാരം ബ്ലോക്കി ലിസ്റ്റുകളും മാതൃകകളും സ്ഥിരമായി അപ്ഡേറ്റ് ചെയ്യുക  

## അധിക റിസോഴ്സുകൾ

### OWASP MCP സുരക്ഷ മാർഗ്ഗനിർദേശം  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - സമഗ്രമായ OWASP MCP Top 10 Azure ഉപയോഗിച്ചുള്ള നടപ്പാക്കലോടുകൂടി  
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - വിശദമായ prompting injection ചെറുക്കൽ മാതൃകകൾ  
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - കൈകാര്യം പ്രവർത്തന ക്യാംപ് 3: I/O Security content safety ഉൾക്കണ്ടുള്ളത്  

### Azure ഡോക്യുമെന്റേഷൻ  
- [Azure Content Safety അവതരണം](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Prompt Shields ഡോക്യുമെന്റേഷൻ](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure AI Content Safety ക്വിക്ക്‌സ്റ്റാർട്ട്](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## അടുത്തത്

- തിരികെ പോകുക: [Security Module Overview](./README.md)  
- തുടരണം: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അപേക്ഷ**:  
ഈ ഡോക്യുമെന്റ് AI വിവർത്തന സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് വിവർത്തനം ചെയ്തതാണ്. ഞങ്ങൾ യഥാർത്ഥത ഉറപ്പിക്കാൻ ശ്രമിച്ചെങ്കിലും, സ്വയമാറ്റം ചെയ്ത വിവർത്തനങ്ങളിൽ പിഴവുകൾ അല്ലെങ്കിൽ അച്ചടക്കം തെറ്റുകൾ ഉണ്ടാകാമെന്ന് ശ്രദ്ധിക്കുക. നിങ്ങളുടെ പ്രാഥമിക ഭാഷയിലെ അച്ചടക്കപ്പെട്ട ഡോക്യുമെന്റ് അവകാശപ്പെട്ട മാർഗദർശകമാകണം. നിർണ്ണായകമായ വിവരങ്ങൾക്കായി പ്രൊഫഷണൽ മനുഷ്യ വിവർത്തനം ശുപാർശ ചെയ്യുന്നു. ഈ വിവർത്തനം ഉപയോഗിച്ചതിൽനിന്നുള്ള യാതൊരു തെറ്റുദ്ഘാടനം അല്ലെങ്കിൽ തെറ്റിദ്ധാരണയ്ക്കും ഞങ്ങൾ ഉത്തരവാദിത്വം വഹിച്ചു തുടരുന്നില്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->