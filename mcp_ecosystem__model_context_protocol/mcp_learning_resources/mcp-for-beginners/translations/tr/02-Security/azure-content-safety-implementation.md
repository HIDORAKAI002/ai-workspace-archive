# MCP ile Azure İçerik Güvenliğinin Uygulanması

> **Adreslenen OWASP MCP Riski**: [MCP06 - Niyet Akışı Sabotajı](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

MCP güvenliğini istem yönlendirmesi enjeksiyonuna, araç zehirlenmesine ve diğer yapay zekaya özgü zayıflıklara karşı güçlendirmek için Azure İçerik Güvenliği entegrasyonu şiddetle tavsiye edilir. Bu uygulanma rehberi, [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) Kamp 3: Giriş/Çıkış Güvenliği ile hizalanmıştır.

## MCP Sunucusu ile Entegrasyon

Azure İçerik Güvenliğini MCP sunucunuza entegre etmek için içerik güvenliği filtresini istek işleme hattınıza ara yazılım olarak ekleyin:

1. Sunucu başlatılırken filtreden başlatma
2. Tüm gelen araç isteklerini işlemden önce doğrulama
3. Tüm giden yanıtları istemcilere dönmeden önce kontrol etme
4. Güvenlik ihlallerini kaydetme ve uyarma
5. İçerik güvenliği kontrolleri başarısız olduğunda uygun hata yönetimi uygulama

Bu, sağlam bir savunma sağlar:
- İstem yönlendirmesi enjeksiyon saldırılarına
- Araç zehirlenme girişimlerine
- Zararlı girdilerle veri sızdırmaya karşı
- Zararlı içerik üretilmesine karşı

## Azure İçerik Güvenliği Entegrasyonu İçin En İyi Uygulamalar

1. **Özel Engelleme Listeleri**: MCP enjeksiyon kalıpları için özel engelleme listeleri oluşturun
2. **Şiddet Ayarı**: Belirli kullanım durumunuza ve risk toleransınıza göre şiddet eşiklerini ayarlayın
3. **Kapsamlı Kapsama**: Tüm girdi ve çıktılara içerik güvenliği kontrolleri uygulayın
4. **Performans Optimizasyonu**: Tekrarlanan içerik güvenliği kontrolleri için önbellekleme uygulamayı düşünün
5. **Yedek Mekanizmalar**: İçerik güvenliği hizmetleri kullanılamadığında net yedek davranışlar tanımlayın
6. **Kullanıcı Geri Bildirimi**: İçerik güvenlik nedeniyle engellendiğinde kullanıcılara net geri bildirim sağlayın
7. **Sürekli İyileştirme**: Ortaya çıkan tehditlere göre engelleme listelerini ve kalıpları düzenli olarak güncelleyin

## Ek Kaynaklar

### OWASP MCP Güvenlik Rehberi
- [OWASP MCP Azure Güvenlik Rehberi](https://microsoft.github.io/mcp-azure-security-guide/) - Azure uygulamalı kapsamlı OWASP MCP İlk 10 listesi
- [MCP06 - İstem Enjeksiyonu](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Ayrıntılı istem enjeksiyonu azaltma kalıpları
- [MCP Güvenlik Zirvesi Atölyesi](https://azure-samples.github.io/sherpa/) - Pratik Kamp 3: Giriş/Çıkış Güvenliği, içerik güvenliğini kapsar

### Azure Dokümantasyonu
- [Azure İçerik Güvenliği Genel Bakış](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [İstem Kalkanları Dokümantasyonu](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure AI İçerik Güvenliği Başlangıç Kılavuzu](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Sonraki Adımlar

- Geri dön: [Güvenlik Modülü Genel Bakış](./README.md)
- Devam et: [Modül 3: Başlarken](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->