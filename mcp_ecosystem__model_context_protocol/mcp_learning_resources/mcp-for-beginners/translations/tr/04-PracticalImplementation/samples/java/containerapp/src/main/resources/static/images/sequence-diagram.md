```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web Uygulaması<br/>(ContentSafetyController)
    participant SafetyService as İçerik Güvenliği Servisi
    participant AzureAPI as Azure İçerik Güvenliği API'si
    participant LangChain as LangChain4j
    participant McpClient as MCP İstemcisi
    participant McpServer as MCP Hesaplayıcı Sunucusu<br/>(Port 8080)
    participant CalcService as Hesaplama Servisi

    %% Kullanıcı Etkileşimi
    User->>WebApp: Hesaplama komutunu gir
    WebApp->>WebApp: PromptRequest oluştur

    %% İçerik Güvenliği Kontrolü
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: İçeriğin güvenli olup olmadığını kontrol et<br/>(tüm kategoriler için şiddet < 2)

    %% İşlem Akışı - Güvenli İçerik
    alt İçerik güvenli
        SafetyService->>LangChain: komutu Bot.chat()'e geçir
        LangChain->>McpClient: Komutu işle
        McpClient->>McpServer: Uygun hesaplama aracını SSE ile çağır
        McpServer->>CalcService: Hesaplama yap<br/>(toplama, çıkarma, çarpma, vb.)
        CalcService-->>McpServer: Hesaplama sonucu
        McpServer-->>McpClient: Araç çalıştırma sonucu
        McpClient-->>LangChain: Araç sonucu
        LangChain-->>SafetyService: Bot yanıtı
        SafetyService-->>WebApp: Sonuç haritasını döndür<br/>{isSafe: "true", botResponse: sonuç, safetyResult: detaylar}
        WebApp-->>User: Hesaplama sonucu ve güvenlik bilgisi göster
    else İçerik güvensiz
        SafetyService-->>WebApp: Sonuç haritasını döndür<br/>{isSafe: "false", safetyResult: detaylar}
        WebApp-->>User: Güvenlik uyarısı göster<br/>(hesaplama olmadan)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->