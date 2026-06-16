# Gelişmiş MCP Güvenliği ile Azure Content Safety

> **OWASP MCP Risk Adresleri**: [MCP06 - Niyet Akışı Sabotajı](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety, MCP uygulamalarınızın güvenliğini artırabilecek çeşitli güçlü araçlar sunar. Uygulamalı deneyim için bkz. [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Kamp 3: G/Ç Güvenliği.

## İsteme Kalkanları

Microsoft'un AI İsteme Kalkanları, hem doğrudan hem de dolaylı istem enjeksiyonu saldırılarına karşı güçlü koruma sağlar:

1. **Gelişmiş Tespit**: İçerikte yer alan kötü niyetli talimatları tanımlamak için makine öğrenimini kullanır.
2. **Spotlighting**: Girdi metnini dönüştürerek yapay zeka sistemlerinin geçerli talimatlar ile dış girdiler arasındaki ayrımı yapmasına yardımcı olur.
3. **Sınırlayıcılar ve Veri İşaretleme**: Güvenilir ve güvenilmeyen veriler arasındaki sınırları işaretler.
4. **Content Safety Entegrasyonu**: Jailbreak girişimleri ve zararlı içeriği tespit etmek için Azure AI Content Safety ile birlikte çalışır.
5. **Sürekli Güncellemeler**: Microsoft, ortaya çıkan tehditlere karşı koruma mekanizmalarını düzenli olarak günceller.

## MCP ile Azure Content Safety Uygulaması

Bu yaklaşım çok katmanlı koruma sağlar:
- İşlem öncesinde girdilerin taranması
- Çıktıların geri dönmeden önce doğrulanması
- Bilinen zararlı desenler için engelleme listeleri kullanımı
- Azure'un sürekli güncellenen içerik güvenliği modellerinden yararlanılması

## Azure Content Safety Kaynakları

MCP sunucularınızda Azure Content Safety uygulaması hakkında daha fazla bilgi edinmek için bu resmi kaynaklara başvurabilirsiniz:

1. [Azure AI Content Safety Belgeleri](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure Content Safety için resmi dokümantasyon.
2. [İsteme Kalkanı Belgeleri](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - İsteme enjeksiyonu saldırılarını önleme rehberi.
3. [Content Safety API Referansı](https://learn.microsoft.com/rest/api/contentsafety/) - Content Safety uygulaması için detaylı API referansı.
4. [Hızlı Başlangıç: Azure Content Safety C# ile](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# kullanarak hızlı uygulama kılavuzu.
5. [Content Safety İstemci Kütüphaneleri](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Çeşitli programlama dillerine yönelik istemci kütüphaneleri.
6. [Jailbreak Girişimlerini Tespit Etme](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Jailbreak girişimlerini tespit ve önlemeye yönelik özel rehber.
7. [Content Safety için En İyi Uygulamalar](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - İçerik güvenliğini etkili şekilde uygulama en iyi uygulamaları.

Daha derinlemesine uygulama için bkz. [Azure Content Safety Uygulama rehberi](./azure-content-safety-implementation.md).

## Sonraki Adımlar

- Oku: [Azure Content Safety Uygulaması](./azure-content-safety-implementation.md)
- Geri Dön: [Güvenlik Modülü Genel Bakışı](./README.md)
- Devam Et: [Modül 3: Başlarken](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->