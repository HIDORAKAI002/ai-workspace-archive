```mermaid
sequenceDiagram
    actor User
    participant WebApp as Apl Web<br/>(ContentSafetyController)
    participant SafetyService as Perkhidmatan Keselamatan Kandungan
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as Klien MCP
    participant McpServer as Pelayan Kalkulator MCP<br/>(Port 8080)
    participant CalcService as Perkhidmatan Kalkulator

    %% Interaksi Pengguna
    User->>WebApp: Masukkan arahan pengiraan
    WebApp->>WebApp: Cipta PromptRequest

    %% Pemeriksaan Keselamatan Kandungan
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Semak jika kandungan selamat<br/>(keparahan < 2 untuk semua kategori)

    %% Aliran Pemprosesan - Kandungan Selamat
    alt Kandungan selamat
        SafetyService->>LangChain: Hantar arahan ke Bot.chat()
        LangChain->>McpClient: Proses arahan
        McpClient->>McpServer: Panggil alat kalkulator sesuai melalui SSE
        McpServer->>CalcService: Laksanakan pengiraan<br/>(tambah, tolak, darab, dll.)
        CalcService-->>McpServer: Keputusan pengiraan
        McpServer-->>McpClient: Keputusan pelaksanaan alat
        McpClient-->>LangChain: Keputusan alat
        LangChain-->>SafetyService: Respons Bot
        SafetyService-->>WebApp: Pulangkan peta keputusan<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Paparkan hasil pengiraan dan maklumat keselamatan
    else Kandungan tidak selamat
        SafetyService-->>WebApp: Pulangkan peta keputusan<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Paparkan amaran keselamatan<br/>(tanpa pengiraan)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->