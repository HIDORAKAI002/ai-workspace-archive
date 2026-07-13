```mermaid
sequenceDiagram
    actor User
    participant WebApp as വെബ് ആപ്പ്<br/>(കಂಟന്റ്‌സെഫ്റ്റികൺട്രോളർ)
    participant SafetyService as ആകർഷക സുരക്ഷാ സേവനം
    participant AzureAPI as അസ്യൂർ കন্টന്റ് സെഫ്റ്റി API
    participant LangChain as ലാംഗ്‌ചൈൻ4ജെ
    participant McpClient as MCP ക്ലയന്റ്
    participant McpServer as MCP കാൽക്കുലേറ്റർ സർവർ<br/>(പോർട്ട് 8080)
    participant CalcService as കാൽക്കുലേറ്റർ സേവനം

    %% ഉപയോക്തൃ ഇടപെടൽ
    User->>WebApp: കാൽക്കുലേഷൻ പ്രാമ്പ്റ്റ് നൽകുക
    WebApp->>WebApp: PromptRequest സൃഷ്ടിക്കുക

    %% കന്റന്റ് സുരക്ഷാ പരിശോധന
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: ഉള്ളടക്കം സുരക്ഷിതമാണോ പരിശോധിക്കുക<br/>(എല്ലാ വിഭാഗങ്ങൾക്കും പീഡനമേൽക്കൽ < 2)

    %% പ്രൊസസ്സിംഗ് ഫ്ലോ - സുരക്ഷിത ഉള്ളടക്കം
    alt ഉള്ളടക്കം സുരക്ഷിതമാണ്
        SafetyService->>LangChain: പ്രാമ്പ്റ്റ് Bot.chat()ക്ക് കൈമാറുക
        LangChain->>McpClient: പ്രാമ്പ്റ്റ് പ്രോസസ്സ് ചെയ്യുക
        McpClient->>McpServer: SSE വഴി അനുയോജ്യമായ കാൽക്കുലേറ്റർ ടൂൾ വിളിക്കൂ
        McpServer->>CalcService: കാൽക്കുലേഷൻ നിർവ്വഹിക്കുക<br/>(ചേർക്കുക, കുറക്കുക, ഗുണിക്കുക, മുതലായവ)
        CalcService-->>McpServer: കാൽക്കുലേഷൻ ഫലം
        McpServer-->>McpClient: ടൂൾ നിർവ്വഹണ ഫലം
        McpClient-->>LangChain: ടൂൾ ഫലം
        LangChain-->>SafetyService: ബോട്ട് പ്രതികരണം
        SafetyService-->>WebApp: ഫലം മാപ്പ് തിരിച്ചയയ്ക്കുക<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: കാൽക്കുലേഷൻ ഫലവും സുരക്ഷാ വിവരവും പ്രദർശിപ്പിക്കുക
    else ഉള്ളടക്കം സുരക്ഷിതമല്ല
        SafetyService-->>WebApp: ഫലം മാപ്പ് തിരിച്ചയയ്ക്കുക<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: സുരക്ഷാ മുന്നറിയിപ്പ് പ്രദർശിപ്പിക്കുക<br/>(കാൽക്കുലേഷൻ ഇല്ലാതെ)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->