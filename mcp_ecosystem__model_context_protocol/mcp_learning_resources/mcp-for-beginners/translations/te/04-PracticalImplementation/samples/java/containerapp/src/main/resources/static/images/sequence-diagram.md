```mermaid
sequenceDiagram
    actor User
    participant WebApp as వెబ్ యాప్<br/>(కంటెంట్ సేఫ్టీ కంట్రోలర్)
    participant SafetyService as కంటెంట్ సేఫ్టీ సర్వీస్
    participant AzureAPI as ఆజ్యూర్ కంటెంట్ సేఫ్టీ API
    participant LangChain as లాంగ్‌చైన్4జెయ్
    participant McpClient as MCP క్లయింట్
    participant McpServer as MCP కాల్కులేటర్ సర్వర్<br/>(పోర్ట్ 8080)
    participant CalcService as కాల్కులేటర్ సర్వీస్

    %% వినియోగదారు పరస్పర చర్య
    User->>WebApp: గణన ప్రాంప్ట్ నమోదు చేయండి
    WebApp->>WebApp: ప్రాంప్ట్ రిక్వెస్ట్ సృష్టించండి

    %% కంటెంట్ సేఫ్టీ తనిఖీ
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: కంటెంట్ సురక్షితం కాదా అని తనిఖీ చెయ్యండి<br/>(అన్ని వర్గాల సీరియాస్నెస్ < 2)

    %% ప్రాసెసింగ్ ఫ్లో - సురక్షిత కంటెంట్
    alt కంటెంట్ సురక్షితం
        SafetyService->>LangChain: ప్రాంప్ట్ ను Bot.chat() కి పంపండి
        LangChain->>McpClient: ప్రాంప్ట్ ప్రాసెస్ చేయండి
        McpClient->>McpServer: సరైన కాల్కులేటర్ టూల్ ని SSE ద్వారా కాల్ చేయండి
        McpServer->>CalcService: గణనను అమలు చేయండి<br/>(చేర్చడం, తీసివేయడం, గుణించడం, మొదలైనవి)
        CalcService-->>McpServer: గణన ఫలితం
        McpServer-->>McpClient: టూల్ అమలింత ఫలితం
        McpClient-->>LangChain: టూల్ ఫలితం
        LangChain-->>SafetyService: బాట్ స్పందన
        SafetyService-->>WebApp: ఫలితపు మ్యాప్ ని తిరిగి పంపండి<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: గణన ఫలితం మరియు సేఫ్టీ సమాచారం ప్రదర్శించండి
    else కంటెంట్ సురక్షితం కాదు
        SafetyService-->>WebApp: ఫలితపు మ్యాప్ ని తిరిగి పంపండి<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: సేఫ్టీ హెచ్చరికని ప్రదర్శించండి<br/>(గణన లేకుండా)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**అస్వీకరణ**:
ఈ పత్రం AI అనువాద సేవ [Co-op Translator](https://github.com/Azure/co-op-translator) ఉపయోగించి అనువదించబడింది. మేము ఖచ్చితత్వానికి ప్రయత్నిస్తున్నప్పటికీ, ఆటోమేటెడ్ అనువాదాలు తప్పులు లేదా అసమగ్రతలను కలిగి ఉండవచ్చు. దాని స్వదేశ భాషలో ఉన్న అసలు పత్రాన్ని అధికారం కలిగిన మూలంగా పరిగణించాలి. కీలకమైన సమాచారం కోసం, ప్రొఫెషనల్ మానవ అనువాదాన్ని సిఫారసు చేస్తాము. ఈ అనువాదం ఉపయోగం వల్ల కలిగే ఏవైనా అపార్థాలు లేదా తప్పుదారులు కోసం మేము బాధ్యత వహించము.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->