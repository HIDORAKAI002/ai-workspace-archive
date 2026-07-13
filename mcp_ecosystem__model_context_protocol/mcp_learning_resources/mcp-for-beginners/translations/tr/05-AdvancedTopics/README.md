# MCP'de İleri Konular

[![Gelişmiş MCP: Güvenli, Ölçeklenebilir ve Çok Modlu AI Ajanları](../../../translated_images/tr/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Bu dersin videosunu izlemek için yukarıdaki resme tıklayın)_

Bu bölüm, Çok Modlu Entegrasyon, ölçeklenebilirlik, güvenlik en iyi uygulamaları ve kurumsal entegrasyon gibi Model Context Protocol (MCP) uygulamasında ileri konuları kapsamaktadır. Bu konular, modern AI sistemlerinin taleplerini karşılayabilen sağlam ve üretime hazır MCP uygulamaları oluşturmak için kritik öneme sahiptir.

## Genel Bakış

Bu ders, Model Context Protocol uygulamasında ileri kavramları, çok modlu entegrasyon, ölçeklenebilirlik, güvenlik en iyi uygulamaları ve kurumsal entegrasyona odaklanarak keşfeder. Bu konular, karmaşık gereksinimleri kurumsal ortamda karşılayabilen üretim standardında MCP uygulamaları oluşturmak için gereklidir.

> **İleriye Bakış:** aşağıdaki birkaç konu, `2026-07-28` MCP spesifikasyon sürüm adayı tarafından etkilenmektedir — Root Contextler (5.4) ve Sampling (5.6), sürüm adayının artık kullanılmayan olarak işaretlediği temel yapı taşlarına dayanır ve Protokol Özelliklerinde (5.16) atıfta bulunulan deneysel Görevler özelliği ayrı bir Görevler uzantısına taşınır. Ayrıntılar için [MCP'de Neler Değişiyor: 2026-07-28 Sürüm Adayı](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) sayfasına bakın.

## Öğrenme Hedefleri

Bu dersin sonunda şunları yapabileceksiniz:

- MCP çerçeveleri içinde çok modlu yetenekler uygulamak
- Yüksek talep senaryoları için ölçeklenebilir MCP mimarileri tasarlamak
- MCP’nin güvenlik ilkeleri doğrultusunda güvenlik en iyi uygulamalarını uygulamak
- MCP'yi kurumsal AI sistemleri ve çerçeveleri ile entegre etmek
- Üretim ortamlarında performans ve güvenilirliği optimize etmek

## Dersler ve Örnek Projeler

| Link | Başlık | Açıklama |
|------|-------|-------------|
| [5.1 Azure ile Entegrasyon](./mcp-integration/README.md) | Azure ile Entegrasyon | MCP sunucunuzu Azure üzerinde nasıl entegre edeceğinizi öğrenin |
| [5.2 Çok modlu örnek](./mcp-multi-modality/README.md) | MCP Çok Modlu Örnekler | Ses, görüntü ve çok modlu yanıtlar için örnekler |
| [5.3 MCP OAuth2 örneği](../../../05-AdvancedTopics/mcp-oauth2-demo) | MCP OAuth2 Demo | MCP ile OAuth2'yi hem Yetkilendirme hem Kaynak Sunucusu olarak gösteren minimal Spring Boot uygulaması. Güvenli token verme, korumalı uç noktalar, Azure Container Apps dağıtımı ve API Yönetimi entegrasyonunu gösterir. |
| [5.4 Root Contextler](./mcp-root-contexts/README.md) | Root contextler | Root context hakkında daha fazla bilgi edinin ve nasıl uygulanacağını öğrenin |
| [5.5 Yönlendirme](./mcp-routing/README.md) | Yönlendirme | Farklı yönlendirme türlerini öğrenin |
| [5.6 Örnekleme](./mcp-sampling/README.md) | Örnekleme | Örnekleme ile nasıl çalışılacağını öğrenin |
| [5.7 Ölçeklendirme](./mcp-scaling/README.md) | Ölçeklendirme | Ölçeklendirme hakkında bilgi edinin |
| [5.8 Güvenlik](./mcp-security/README.md) | Güvenlik | MCP Sunucunuzu güvenceye alın |
| [5.9 Web Arama örneği](./web-search-mcp/README.md) | Web Arama MCP | SerpAPI ile gerçek zamanlı web, haber, ürün araması ve SSS için Python MCP sunucu ve istemcisi. Çoklu araç orkestrasyonu, harici API entegrasyonu ve sağlam hata yönetimi gösterir. |
| [5.10 Gerçek Zamanlı Akış](./mcp-realtimestreaming/README.md) | Akış | Günümüzün veri odaklı dünyasında, işletmelerin ve uygulamaların zamanında karar vermek için anlık bilgiye erişim ihtiyacını karşılamak için gerçek zamanlı veri akışı esastır.|
| [5.11 Gerçek Zamanlı Web Arama](./mcp-realtimesearch/README.md) | Web Arama | MCP'nin gerçek zamanlı web aramasını, AI modelleri, arama motorları ve uygulamalar arasında standart bir bağlam yönetimi yaklaşımı ile nasıl dönüştürdüğünü öğrenin.| 
| [5.12 Model Context Protocol Sunucuları için Entra ID Kimlik Doğrulaması](./mcp-security-entra/README.md) | Entra ID Kimlik Doğrulama | Microsoft Entra ID, yalnızca yetkili kullanıcılar ve uygulamaların MCP sunucunuzla etkileşime girmesini sağlamak için güçlü bulut tabanlı kimlik ve erişim yönetimi çözümü sunar.|
| [5.13 Microsoft Foundry Ajan Entegrasyonu](./mcp-foundry-agent-integration/README.md) | Microsoft Foundry Entegrasyonu | MCP sunucularını Microsoft Foundry ajanları ile entegre ederek güçlü araç orkestrasyonu ve standartlaştırılmış harici veri kaynağı bağlantılarıyla kurumsal AI yetenekleri kazanın.|
| [5.14 Bağlam Mühendisliği](./mcp-contextengineering/README.md) | Bağlam Mühendisliği | MCP sunucuları için bağlam mühendisliği tekniklerinin gelecekteki fırsatları; bağlam optimizasyonu, dinamik bağlam yönetimi ve MCP çerçeveleri içinde etkili prompt mühendislik stratejileri.|
| [5.15 MCP Özel Taşıma](./mcp-transport/README.md) | Özel Taşıma | Özelleştirilmiş MCP iletişim senaryoları için özel taşıma mekanizmalarının nasıl uygulanacağını öğrenin.|
| [5.16 Protokol Özellikleri Derinlemesine İnceleme](./mcp-protocol-features/README.md) | Protokol Özellikleri | İlerleme bildirimleri, istek iptali, kaynak şablonları ve hata yönetimi kalıpları dahil ileri protokol özelliklerini öğrenin.|
| [5.17 Mücadeleci Çok Ajanlı Muhakeme](./mcp-adversarial-agents/README.md) | Mücadeleci Ajanlar | Bir MCP araç setini paylaşan ve karşıt pozisyonlara sahip iki ajan kullanarak halüsinasyonları yakalayın, uç durumları ortaya çıkarın ve yapılandırılmış tartışma yoluyla daha iyi kalibre edilmiş çıktılar üretin.|

> **MCP Spesifikasyonu 2025-11-25'te Yenilikler:** Spesifikasyon artık deneysel olarak **Görevler** (ilerleme takibi ile uzun süreli işlemler), **Araç Açıklamaları** (güvenlik için araç davranışına ait meta veriler), **URL Modu Çağrısı** (istemcilerden spesifik URL içerik isteği) ve geliştirilmiş **Kökler** (çalışma alanı bağlam yönetimi için) desteği içermektedir. Tam detaylar için [MCP Spesifikasyon değişiklik günlüğüne](https://spec.modelcontextprotocol.io/) bakınız.

## Ek Referanslar

İleri MCP konuları ile ilgili en güncel bilgileri aşağıda bulabilirsiniz:
- [MCP Dokümantasyonu](https://modelcontextprotocol.io/)
- [MCP Spesifikasyonu (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [GitHub Deposu](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Güvenlik riskleri ve önlemler
- [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) - Uygulamalı güvenlik eğitimi

## Temel Çıkarımlar

- Çok modlu MCP uygulamaları metin işlemenin ötesinde AI yeteneklerini genişletir
- Kurumsal dağıtımlar için ölçeklenebilirlik esastır ve yatay ve dikey ölçeklendirmeyle ele alınabilir
- Kapsamlı güvenlik önlemleri verileri korur ve uygun erişim kontrolünü sağlar
- Azure OpenAI ve Microsoft AI Foundry gibi platformlarla kurumsal entegrasyon MCP yeteneklerini artırır
- İleri MCP uygulamaları optimize edilmiş mimariler ve dikkatli kaynak yönetimi ile avantaj sağlar

## Egzersiz

Belirli bir kullanım senaryosu için kurumsal düzeyde MCP uygulaması tasarlayın:

1. Kullanım senaryonuz için çok modlu gereksinimleri belirleyin
2. Hassas verileri korumak için gereken güvenlik kontrollerini tasvir edin
3. Değişken yükü karşılayabilecek ölçeklenebilir bir mimari tasarlayın
4. Kurumsal AI sistemleri ile entegrasyon noktalarını planlayın
5. Olası performans darboğazlarını ve çözüm stratejilerini belgeleyin

## Ek Kaynaklar

- [Azure OpenAI Dokümantasyonu](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Microsoft AI Foundry Dokümantasyonu](https://learn.microsoft.com/en-us/ai-services/)

---

## Sonraki ne var

Bu modüldeki dersleri şu dersle başlayarak keşfedin: [5.1 MCP Entegrasyonu](./mcp-integration/README.md)

Bu modülü tamamladıktan sonra devam edin: [Modül 6: Topluluk Katkıları](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->