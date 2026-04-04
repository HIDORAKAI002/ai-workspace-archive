# Azure İçerik Güvenliği ile Gelişmiş MCP Güvenliği

> **OWASP MCP Adreslenen Riski**: [MCP06 - Bağlamsal Yükler Yoluyla İsteme Enjeksiyonu](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure İçerik Güvenliği, MCP uygulamalarınızın güvenliğini artırabilecek birkaç güçlü araç sağlar. Pratik uygulama deneyimi için, [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Kamp 3: Giriş/Çıkış Güvenliği'ne bakın.

## İsteme Kalkanları

Microsoft’un AI İsteme Kalkanları, doğrudan ve dolaylı istem enjeksiyonu saldırılarına karşı güçlü koruma sağlar:

1. **Gelişmiş Tespit**: İçeriğe gömülü kötü niyetli talimatları belirlemek için makine öğrenimini kullanır.
2. **Vurgulama**: AI sistemlerinin geçerli talimatlar ile dış girdileri ayırt etmesine yardımcı olacak şekilde giriş metnini dönüştürür.
3. **Sınırlayıcılar ve Veri İşaretleme**: Güvenilir ve güvenilmeyen veriler arasındaki sınırları işaretler.
4. **İçerik Güvenliği Entegrasyonu**: Jailbreak girişimleri ve zararlı içerik tespitinde Azure AI İçerik Güvenliği ile çalışır.
5. **Sürekli Güncellemeler**: Microsoft, ortaya çıkan tehditlere karşı koruma mekanizmalarını düzenli olarak günceller.

## Azure İçerik Güvenliğini MCP ile Uygulama

Bu yaklaşım çok katmanlı koruma sağlar:
- İşleme öncesi girdilerin taranması
- Geri döndürmeden önce çıktının doğrulanması
- Bilinen zararlı desenler için engelleme listeleri kullanılması
- Azure’un sürekli güncellenen içerik güvenliği modellerinden yararlanılması

## Azure İçerik Güvenliği Kaynakları

Azure İçerik Güvenliğini MCP sunucularınızda uygulama hakkında daha fazla bilgi için bu resmi kaynaklara başvurun:

1. [Azure AI İçerik Güvenliği Belgeleri](https://learn.microsoft.com/azure/ai-services/content-safety/) - Azure İçerik Güvenliği için resmi belgeler.
2. [İsteme Kalkanı Belgeleri](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - İsteme enjeksiyonu saldırılarını önleme yöntemleri.
3. [İçerik Güvenliği API Referansı](https://learn.microsoft.com/rest/api/contentsafety/) - İçerik Güvenliği uygulaması için detaylı API referansı.
4. [Hızlı Başlangıç: C# ile Azure İçerik Güvenliği](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - C# kullanarak hızlı uygulama kılavuzu.
5. [İçerik Güvenliği İstemci Kitaplıkları](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Çeşitli programlama dilleri için istemci kitaplıkları.
6. [Jailbreak Girişimlerini Tespit Etme](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Jailbreak girişimlerini tespit ve önleme ile ilgili özel rehber.
7. [İçerik Güvenliği İçin En İyi Uygulamalar](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - İçerik güvenliğini etkili şekilde uygulamak için en iyi uygulamalar.

Daha derinlemesine uygulama için, [Azure İçerik Güvenliği Uygulama rehberimize](./azure-content-safety-implementation.md) bakın.

## Sonraki Adımlar

- Oku: [Azure İçerik Güvenliği Uygulaması](./azure-content-safety-implementation.md)
- Dön: [Güvenlik Modülü Genel Bakış](./README.md)
- Devam et: [Modül 3: Başlarken](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, Yapay Zeka çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba gösterilse de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayın. Orijinal belge, kendi ana dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çeviri kullanımı sonucunda ortaya çıkabilecek herhangi bir yanlış anlama veya yanlış yorumdan sorumlu tutulamayız.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->