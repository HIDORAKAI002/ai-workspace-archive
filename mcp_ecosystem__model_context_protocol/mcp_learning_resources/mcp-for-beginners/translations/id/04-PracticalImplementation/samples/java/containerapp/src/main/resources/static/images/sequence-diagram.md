```mermaid
sequenceDiagram
    actor User
    participant WebApp as Aplikasi Web<br/>(ContentSafetyController)
    participant SafetyService as Layanan Keamanan Konten
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as Klien MCP
    participant McpServer as Server Kalkulator MCP<br/>(Port 8080)
    participant CalcService as Layanan Kalkulator

    %% Interaksi Pengguna
    User->>WebApp: Masukkan perintah perhitungan
    WebApp->>WebApp: Buat PromptRequest

    %% Pemeriksaan Keamanan Konten
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Periksa apakah konten aman<br/>(keparahan < 2 untuk semua kategori)

    %% Alur Proses - Konten Aman
    alt Konten aman
        SafetyService->>LangChain: Kirim perintah ke Bot.chat()
        LangChain->>McpClient: Proses perintah
        McpClient->>McpServer: Panggil alat kalkulator yang sesuai via SSE
        McpServer->>CalcService: Jalankan perhitungan<br/>(tambah, kurang, kali, dll.)
        CalcService-->>McpServer: Hasil perhitungan
        McpServer-->>McpClient: Hasil eksekusi alat
        McpClient-->>LangChain: Hasil alat
        LangChain-->>SafetyService: Respons bot
        SafetyService-->>WebApp: Kembalikan peta hasil<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Tampilkan hasil perhitungan dan info keamanan
    else Konten tidak aman
        SafetyService-->>WebApp: Kembalikan peta hasil<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Tampilkan peringatan keamanan<br/>(tanpa perhitungan)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->