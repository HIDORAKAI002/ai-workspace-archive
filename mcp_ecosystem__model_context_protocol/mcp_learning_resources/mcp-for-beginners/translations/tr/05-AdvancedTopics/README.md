# MCP'de İleri Konular

[![Gelişmiş MCP: Güvenli, Ölçeklenebilir ve Çok Modlu AI Ajanları](../../../translated_images/tr/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Bu dersin videosunu izlemek için yukarıdaki resme tıklayın)_

Bu bölümde Model Context Protocol (MCP) uygulamasında çok modlu entegrasyon, ölçeklenebilirlik, güvenlik en iyi uygulamaları ve kurumsal entegrasyon dahil olmak üzere bir dizi ileri konu ele alınmaktadır. Bu konular, modern AI sistemlerinin gereksinimlerini karşılayabilecek sağlam ve üretim hazır MCP uygulamaları oluşturmak için kritik öneme sahiptir.

## Genel Bakış

Bu ders, Model Context Protocol uygulamasında çok modlu entegrasyon, ölçeklenebilirlik, güvenlik en iyi uygulamaları ve kurumsal entegrasyona odaklanarak ileri kavramları keşfeder. Bu konular, kurumsal ortamların karmaşık gereksinimlerini karşılayabilen üretim düzeyinde MCP uygulamaları oluşturmak için temel önemdedir.

> **İleriye bakış:** aşağıdaki birkaç konu, `2026-07-28` MCP spesifikasyon sürüm adayından etkilenmektedir — Kök Bağlamlar (5.4) ve Örnekleme (5.6), sürüm adayının kullanımdan kaldırdığını belirttiği primitiflere dayanır ve Protokol Özelliklerinde (5.16) belirtilen deneysel Görevler özelliği, özel bir Görevler uzantısına taşınmaktadır. Detaylar için [MCP'de Neler Değişiyor: 2026-07-28 Sürüm Adayı](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) bölümüne bakınız.

## Öğrenme Hedefleri

Bu dersi tamamladıktan sonra şunları yapabileceksiniz:

- MCP çerçeveleri içinde çok modlu yetenekleri uygulamak
- Yüksek talep senaryoları için ölçeklenebilir MCP mimarileri tasarlamak
- MCP'nin güvenlik ilkeleriyle uyumlu en iyi güvenlik uygulamalarını uygulamak
- MCP'yi kurumsal AI sistemleri ve çerçeveleri ile entegre etmek
- Üretim ortamlarında performans ve güvenilirliği optimize etmek

## Dersler ve Örnek Projeler

| Bağlantı | Başlık | Açıklama |
|------|-------|-------------|
| [5.1 Azure ile Entegrasyon](./mcp-integration/README.md) | Azure ile Entegre Ol | MCP Sunucunuzu Azure'da nasıl entegre edeceğinizi öğrenin |
| [5.2 Çok modlu örnek](./mcp-multi-modality/README.md) | MCP Çok modlu örnekler | Ses, resim ve çok modlu yanıt örnekleri |
| [5.3 MCP OAuth2 örneği](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | MCP ile OAuth2'yi hem Yetkilendirme hem de Kaynak Sunucusu olarak gösteren minimal Spring Boot uygulaması. Güvenli token verme, korumalı uç noktalar, Azure Container Apps dağıtımı ve API Yönetimi entegrasyonunu gösterir. |
| [5.4 Kök Bağlamlar](./mcp-root-contexts/README.md) | Kök bağlamlar | Kök bağlam hakkında daha fazla bilgi edinin ve nasıl uygulanacağını öğrenin (`2026-07-28` sürüm adayında kullanımdan kaldırıldı; ancak `2025-11-25` için geçerlidir) |
| [5.5 Yönlendirme](./mcp-routing/README.md) | Yönlendirme | Farklı yönlendirme türlerini öğrenin |
| [5.6 Örnekleme](./mcp-sampling/README.md) | Örnekleme | Örneklemeyle nasıl çalışılacağını öğrenin (`2026-07-28` sürüm adayında kullanımdan kaldırıldı; yine de `2025-11-25` için geçerlidir) |
| [5.7 Ölçeklendirme](./mcp-scaling/README.md) | Ölçeklendirme | Ölçeklendirme hakkında bilgi edinin |
| [5.8 Güvenlik](./mcp-security/README.md) | Güvenlik | MCP Sunucunuzu güvence altına alın |
| [5.9 Web Arama örneği](./web-search-mcp/README.md) | Web Arama MCP | SerpAPI ile gerçek zamanlı web, haber, ürün araması ve Soru&Cevap için Python MCP sunucu ve istemci. Çoklu araç düzenlemesini, harici API entegrasyonunu ve sağlam hata yönetimini gösterir. |
| [5.10 Gerçek Zamanlı Yayın](./mcp-realtimestreaming/README.md) | Yayın | Veriye dayalı günümüz dünyasında, işletmeler ve uygulamalar zamanında kararlar almak için anında bilgi erişimi gerektirdiğinden, gerçek zamanlı veri yayınlama vazgeçilmez hale gelmiştir.|
| [5.11 Gerçek Zamanlı Web Arama](./mcp-realtimesearch/README.md) | Web Arama | MCP'nin AI modelleri, arama motorları ve uygulamalar arasında bağlam yönetimi için standart bir yaklaşım sunarak gerçek zamanlı web aramasını nasıl dönüştürdüğünü öğrenin.|
| [5.12 Model Context Protocol Sunucuları için Entra ID Kimlik Doğrulama](./mcp-security-entra/README.md) | Entra ID Kimlik Doğrulama | Microsoft Entra ID, yalnızca yetkili kullanıcılar ve uygulamaların MCP sunucunuzla etkileşimde bulunmasını sağlamak için sağlam bulut tabanlı kimlik ve erişim yönetimi çözümü sunar.|
| [5.13 Microsoft Foundry Ajan Entegrasyonu](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Entegrasyonu | Model Context Protocol sunucularını Microsoft Foundry ajanları ile nasıl entegre edeceğinizi öğrenin; bu, standartlaştırılmış harici veri kaynağı bağlantıları ile güçlü araç düzenleme ve kurumsal AI yetenekleri sağlar.|
| [5.14 Bağlam Mühendisliği](./mcp-contextengineering/README.md) | Bağlam Mühendisliği | MCP sunucuları için bağlam optimizasyonu, dinamik bağlam yönetimi ve MCP çerçevelerinde etkili prompt mühendisliği stratejilerini içeren bağlam mühendisliği tekniklerinin gelecekteki fırsatları.|
| [5.15 MCP Özel Taşıma](./mcp-transport/README.md) | Özel Taşıma | Özelleşmiş MCP iletişim senaryoları için özel taşıma mekanizmalarının nasıl uygulanacağını öğrenin.|
| [5.16 Protokol Özellikleri Derinlemesine](./mcp-protocol-features/README.md) | Protokol Özellikleri | İlerleme bildirimleri, istek iptali, kaynak şablonları ve hata işleme kalıpları gibi gelişmiş protokol özelliklerinde ustalaşın.|
| [5.17 Düşmanca Çoklu Ajan Akıl Yürütme](./mcp-adversarial-agents/README.md) | Düşmanca Ajanlar | Tek bir MCP araç setini paylaşan karşıt pozisyonlardaki iki ajan kullanarak halüsinasyonları yakalayın, uç durumları ortaya çıkarın ve yapılandırılmış tartışma yoluyla daha iyi kalibre edilmiş çıktılar üretin.|

> **MCP Spesifikasyonu 2025-11-25'te Yeni:** Spesifikasyon artık **Görevler** (ilerleme takibi ile uzun süreli işlemler), **Araç Açıklamaları** (güvenlik için araç davranışı hakkında meta veriler), **URL Modu Elde Etme** (istemcilerden belirli URL içeriği istenmesi) ve geliştirilmiş **Kökler** (çalışma alanı bağlamı yönetimi için) için deneysel destek içermektedir. Tam detaylar için [MCP Spesifikasyon değişiklik günlüğüne](https://spec.modelcontextprotocol.io/) bakınız.

## Ek Kaynaklar

İleri MCP konuları hakkında en güncel bilgi için:
- [MCP Dokümantasyonu](https://modelcontextprotocol.io/)
- [MCP Spesifikasyonu (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Deposu](https://github.com/modelcontextprotocol)
- [OWASP MCP İlk 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Güvenlik riskleri ve önlemleri
- [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) - Uygulamalı güvenlik eğitimi

## Önemli Noktalar

- Çok modlu MCP uygulamaları, AI yeteneklerini metin işlemeyi aşarak genişletir
- Ölçeklenebilirlik, kurumsal dağıtımlar için esastır ve yatay ve dikey ölçeklendirme yoluyla ele alınabilir
- Kapsamlı güvenlik önlemleri verileri korur ve doğru erişim kontrolünü sağlar
- Azure OpenAI ve Microsoft AI Foundry gibi platformlarla kurumsal entegrasyon MCP yeteneklerini artırır
- İleri MCP uygulamaları optimize edilmiş mimariler ve dikkatli kaynak yönetiminden faydalanır

## Alıştırma

Belirli bir kullanım durumu için kurumsal düzeyde bir MCP uygulaması tasarlayın:

1. Kullanım durumunuz için çok modlu gereksinimleri belirleyin
2. Hassas verileri korumak için gereken güvenlik kontrollerini belirleyin
3. Değişken yükleri karşılayabilecek ölçeklenebilir bir mimari tasarlayın
4. Kurumsal AI sistemleri ile entegrasyon noktalarını planlayın
5. Olası performans darboğazlarını ve azaltma stratejilerini belgeleyin

## Ek Kaynaklar

- [Azure OpenAI Dokümantasyonu](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Dokümantasyonu](https://learn.microsoft.com/en-us/ai-services/)

---

## Sonraki Adım

Bu modüldeki derslere şuradan başlayın: [5.1 MCP Entegrasyonu](./mcp-integration/README.md)

Bu modülü tamamladıktan sonra devam edin: [Modül 6: Topluluk Katkıları](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->