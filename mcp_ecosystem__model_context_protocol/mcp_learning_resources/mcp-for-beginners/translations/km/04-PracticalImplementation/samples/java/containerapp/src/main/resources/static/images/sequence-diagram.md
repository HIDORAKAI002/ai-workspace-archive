```mermaid
sequenceDiagram
    actor User
    participant WebApp as កម្មវិធីគេហទំព័រ<br/>(ContentSafetyController)
    participant SafetyService as សេវាកម្មសុវត្ថិភាពខ្លឹមសារ
    participant AzureAPI as អេភីអាយសុវត្ថិភាពខ្លឹមសារ Azure
    participant LangChain as LangChain4j
    participant McpClient as អតិថិជន MCP
    participant McpServer as ម៉ាស៊ីនបម្រើគណនាការ MCP<br/>(ព័រទ័រ ៨០៨០)
    participant CalcService as សេវាកម្មគណនា

    %% ការប្រតិបត្តិការរបស់អ្នកប្រើ
    User->>WebApp: បញ្ចូលសំណើគណនាដោយបញ្ជា
    WebApp->>WebApp: បង្កើត PromptRequest

    %% ការត្រួតពិនិត្យសុវត្ថិភាពខ្លឹមសារ
    WebApp->>SafetyService: ដំណើរការសំណើ(prompt)
    SafetyService->>AzureAPI: វិភាគអត្ថបទ(prompt)
    AzureAPI-->>SafetyService: លទ្ធផលវិភាគអត្ថបទ
    SafetyService->>SafetyService: ពិនិត្យមើលថាខ្លឹមសារសុវត្ថិ<br/>(ភាពធ្ងន់ធ្ងរតិចជាង ២ សម្រាប់ប្រភេទទាំងអស់)

    %% ដំណើរការជាប្រព័ន្ធ - ខ្លឹមសារសុវត្ថិ
    alt ខ្លឹមសារត្រូវបានប្រកាសសុវត្ថិ
        SafetyService->>LangChain: បញ្ជូនសំណើទៅ Bot.chat()
        LangChain->>McpClient: ដំណើរការសំណើ
        McpClient->>McpServer: ហៅឧបករណ៍គណនាដែលសមរម្យតាមរយៈ SSE
        McpServer->>CalcService: អនុវត្តគណនា<br/>(បន្ថែម លុប កង ជាដើម)
        CalcService-->>McpServer: លទ្ធផលគណនា
        McpServer-->>McpClient: លទ្ធផលអនុវត្តឧបករណ៍
        McpClient-->>LangChain: លទ្ធផលឧបករណ៍
        LangChain-->>SafetyService: សេចក្តីឆ្លើយតបរបស់ Bot
        SafetyService-->>WebApp: ត្រឡប់ផែនទីលទ្ធផល<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: បង្ហាញលទ្ធផលគណនានិងព័ត៌មានសុវត្ថិភាព
    else ខ្លឹមសារមិនសុវត្ថិ
        SafetyService-->>WebApp: ត្រឡប់ផែនទីលទ្ធផល<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: បង្ហាញការព្រមានសុវត្ថិភាព<br/>(ដោយគ្មានការគណនា)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ការបដិសេធ**:
ឯកសារនេះត្រូវបានបម្លែងភាសា ដោយប្រើសេវាបម្លែងភាសា AI [Co-op Translator](https://github.com/Azure/co-op-translator)។ ទោះយើងខ្ញុំមានក្តីប្រាថ្នាឱ្យបានច្បាស់លាស់ តែសូមយល់ដឹងថាការបម្លែងដោយស្វ័យប្រវត្តិក៏អាចមានកំហុសឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមជាភាសាទីតាំងគួរត្រូវបានគេប្រើជាប្រភពច្បាស់លាស់។ សម្រាប់ព័ត៌មានសំខាន់ៗ សូមណែនាំឱ្យប្រើប្រាស់ការប្រែដោយមនុស្សជំនាញ។ យើងខ្ញុំមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសបន្ទាប់ពីការប្រើប្រាស់ការបម្លែងនេះនោះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->