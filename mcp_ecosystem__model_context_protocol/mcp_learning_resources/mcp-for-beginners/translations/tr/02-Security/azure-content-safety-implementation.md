# Azure İçerik Güvenliği MCP ile Uygulama

> **Çözülen OWASP MCP Riski**: [MCP06 - Kontekstüel Yükler ile Komut Enjeksiyonu](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Komut enjeksiyonu, araç zehirlenmesi ve diğer AI özgü güvenlik açıklarına karşı MCP güvenliğini güçlendirmek için Azure İçerik Güvenliği entegrasyonu şiddetle tavsiye edilir. Bu uygulama kılavuzu [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) Kamp 3: Giriş/Çıkış Güvenliği ile uyumludur.

## MCP Sunucusu ile Entegrasyon

Azure İçerik Güvenliği'ni MCP sunucunuza entegre etmek için içerik güvenliği filtresini istek işleme hattınıza ara yazılım olarak ekleyin:

1. Sunucu başlatılırken filtreyi başlatın  
2. İşleme almadan önce gelen tüm araç isteklerini doğrulayın  
3. İstemcilere döndürmeden önce tüm dışa yanıtları kontrol edin  
4. Güvenlik ihlallerini kaydedin ve uyarı oluşturun  
5. İçerik güvenliği kontrolleri başarısız olduğunda uygun hata işleme uygulayın  

Bu, aşağıya karşı sağlam bir savunma sağlar:  
- Komut enjeksiyonu saldırıları  
- Araç zehirleme girişimleri  
- Kötü amaçlı girdilerle veri sızdırma  
- Zararlı içerik üretimi  

## Azure İçerik Güvenliği Entegrasyonu İçin En İyi Uygulamalar

1. **Özel Engelleme Listeleri**: MCP enjeksiyon kalıpları için özel engelleme listeleri oluşturun  
2. **Şiddet Ayarı**: Belirli kullanım senaryonuza ve risk toleransınıza göre şiddet eşiklerini ayarlayın  
3. **Kapsamlı Kapsama**: Tüm giriş ve çıkışlara içerik güvenliği kontrolleri uygulayın  
4. **Performans Optimizasyonu**: Tekrarlayan içerik güvenliği kontrolleri için önbellekleme uygulamayı düşünün  
5. **Yedekleme Mekanizmaları**: İçerik güvenliği hizmetleri kullanılamadığında net yedekleme davranışları tanımlayın  
6. **Kullanıcı Geri Bildirimi**: İçerik güvenlik nedeniyle engellendiğinde kullanıcılara net geri bildirim sağlayın  
7. **Sürekli İyileştirme**: Ortaya çıkan tehditlere göre engelleme listeleri ve kalıpları düzenli olarak güncelleyin  

## Ek Kaynaklar

### OWASP MCP Güvenlik Rehberi  
- [OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/) - Azure uygulaması ile kapsamlı OWASP MCP İlk 10  
- [MCP06 - Komut Enjeksiyonu](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Detaylı komut enjeksiyonu önleme kalıpları  
- [MCP Güvenlik Zirvesi Atölyesi](https://azure-samples.github.io/sherpa/) - Kamp 3: Giriş/Çıkış Güvenliği içerik güvenliği kapsamaktadır  

### Azure Dokümantasyonu  
- [Azure İçerik Güvenliği Genel Bakış](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Prompt Shields Dokümantasyonu](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure AI İçerik Güvenliği Hızlı Başlangıç](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Sonraki Adım

- Dön: [Güvenlik Modülü Genel Bakış](./README.md)  
- Devam Et: [Modül 3: Başlarken](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstermemize rağmen, otomatik çevirilerde hata veya yanlışlıklar bulunabileceğini lütfen unutmayınız. Orijinal belge, yerel dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucunda ortaya çıkabilecek herhangi bir yanlış anlama veya yanlış yorumlamadan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->