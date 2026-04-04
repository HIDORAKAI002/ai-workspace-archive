# 🚀 MCP Sunucusu ile PostgreSQL - Tam Öğrenme Rehberi

## 🧠 MCP Veritabanı Entegrasyonu Öğrenme Yolunun Genel Görünümü

Bu kapsamlı öğrenme rehberi, perakende analitiği uygulaması ile veritabanlarıyla entegre edilen üretime hazır **Model Context Protocol (MCP) sunucuları** nasıl oluşturulacağını öğretir. **Satır Seviyesi Güvenlik (RLS)**, **anlamsal arama**, **Azure AI entegrasyonu** ve **çok kiracılı veri erişimi** gibi kurumsal düzeyde desenleri öğreneceksiniz.

Arka uç geliştiricisi, yapay zeka mühendisi veya veri mimarı olun, bu rehber gerçek dünya örnekleri ve uygulamalı alıştırmalarla yapılandırılmış öğrenme sağlar; aşağıdaki MCP sunucusu https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail üzerinden adım adım ilerlersiniz.

## 🔗 Resmi MCP Kaynakları

- 📘 [MCP Dokümantasyonu](https://modelcontextprotocol.io/) – Detaylı öğreticiler ve kullanıcı kılavuzları  
- 📜 [MCP Spesifikasyonu (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/) – Protokol mimarisi ve teknik referanslar  
- 🧑‍💻 [MCP GitHub Deposu](https://github.com/modelcontextprotocol) – Açık kaynak SDK'lar, araçlar ve kod örnekleri  
- 🌐 [MCP Topluluğu](https://github.com/orgs/modelcontextprotocol/discussions) – Tartışmalara katılın ve topluluğa katkıda bulunun  
- 🔒 [OWASP MCP İlk 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) – Güvenlik en iyi uygulamaları ve risk azaltma  

## 🧭 MCP Veritabanı Entegrasyonu Öğrenme Yolu

### 📚 https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail İçin Tam Öğrenme Yapısı

| Laboratuvar | Konu | Açıklama | Bağlantı |
|--------|-------|-------------|------|
| **Lab 1-3: Temeller** | | | |
| 00 | [MCP Veritabanı Entegrasyonuna Giriş](./00-Introduction/README.md) | Veritabanı entegrasyonu ve perakende analitiği kullanım durumu ile MCP genel bakış | [Buradan Başlayın](./00-Introduction/README.md) |
| 01 | [Temel Mimari Kavramlar](./01-Architecture/README.md) | MCP sunucu mimarisi, veritabanı katmanları ve güvenlik desenlerini anlamak | [Öğren](./01-Architecture/README.md) |
| 02 | [Güvenlik ve Çok Kiracılık](./02-Security/README.md) | Satır Seviyesi Güvenlik, kimlik doğrulama ve çok kiracılı veri erişimi | [Öğren](./02-Security/README.md) |
| 03 | [Ortam Kurulumu](./03-Setup/README.md) | Geliştirme ortamının kurulumu, Docker, Azure kaynakları | [Kurulum](./03-Setup/README.md) |
| **Lab 4-6: MCP Sunucusunu Oluşturma** | | | |
| 04 | [Veritabanı Tasarımı ve Şeması](./04-Database/README.md) | PostgreSQL kurulumu, perakende şema tasarımı ve örnek veriler | [Oluştur](./04-Database/README.md) |
| 05 | [MCP Sunucu Uygulaması](./05-MCP-Server/README.md) | Veritabanı entegrasyonlu FastMCP sunucusu oluşturma | [Oluştur](./05-MCP-Server/README.md) |
| 06 | [Araç Geliştirme](./06-Tools/README.md) | Veritabanı sorgu araçları ve şema incelemesi oluşturma | [Oluştur](./06-Tools/README.md) |
| **Lab 7-9: İleri Özellikler** | | | |
| 07 | [Anlamsal Arama Entegrasyonu](./07-Semantic-Search/README.md) | Azure OpenAI ve pgvector ile vektör gömme uygulaması | [İleri](./07-Semantic-Search/README.md) |
| 08 | [Test ve Hata Ayıklama](./08-Testing/README.md) | Test stratejileri, hata ayıklama araçları ve doğrulama yöntemleri | [Test Et](./08-Testing/README.md) |
| 09 | [VS Code Entegrasyonu](./09-VS-Code/README.md) | VS Code MCP entegrasyonu ve AI Sohbet kullanımı yapılandırması | [Entegre Et](./09-VS-Code/README.md) |
| **Lab 10-12: Prodüksiyon ve En İyi Uygulamalar** | | | |
| 10 | [Dağıtım Stratejileri](./10-Deployment/README.md) | Docker dağıtımı, Azure Container Apps ve ölçeklendirme dikkate alınması | [Dağıt](./10-Deployment/README.md) |
| 11 | [İzleme ve Gözlemlenebilirlik](./11-Monitoring/README.md) | Application Insights, günlük kaydı, performans izleme | [İzle](./11-Monitoring/README.md) |
| 12 | [En İyi Uygulamalar ve Optimizasyon](./12-Best-Practices/README.md) | Performans optimizasyonu, güvenlik sertleştirme ve üretim ipuçları | [Optimize Et](./12-Best-Practices/README.md) |

### 💻 Neler Oluşturacaksınız

Bu öğrenme yolunun sonunda tam özellikli bir **Zava Perakende Analitiği MCP Sunucusu** inşa etmiş olacaksınız:

- **Müşteri siparişleri, ürünler ve envanter içeren çok tablolu perakende veritabanı**  
- Mağaza bazlı veri izolasyonu için **Satır Seviyesi Güvenlik**  
- Azure OpenAI gömmeleri kullanan **anlamsal ürün araması**  
- Doğal dil sorguları için **VS Code AI Sohbet entegrasyonu**  
- Docker ve Azure ile **üretime hazır dağıtım**  
- Application Insights ile **kapsamlı izleme**  

## 🎯 Öğrenme Önkoşulları

Bu öğrenme yolundan en iyi şekilde faydalanmak için:

- **Programlama Deneyimi**: Tercihen Python veya benzeri dillerde aşinalık  
- **Veritabanı Bilgisi**: SQL ve ilişkisel veritabanlarına temel anlayış  
- **API Kavramları**: REST API'leri ve HTTP kavramlarına hakimiyet  
- **Geliştirme Araçları**: Komut satırı, Git ve kod editörleri deneyimi  
- **Bulut Temelleri**: (Opsiyonel) Azure veya benzeri bulut platformlarında temel bilgi  
- **Docker Aşinalığı**: (Opsiyonel) Konteynerleştirme kavramları bilgisi  

### Gerekli Araçlar

- **Docker Desktop** - PostgreSQL ve MCP sunucusunu çalıştırmak için  
- **Azure CLI** - Bulut kaynaklarının dağıtımı için  
- **VS Code** - Geliştirme ve MCP entegrasyonu için  
- **Git** - Versiyon kontrol için  
- **Python 3.8+** - MCP sunucu geliştirme için  

## 📚 Çalışma Rehberi & Kaynaklar

Bu öğrenme yolu sizi etkin bir şekilde yönlendirmek için kapsamlı kaynaklar içerir:

### Çalışma Rehberi

Her laboratuvar şunları içerir:  
- **Açık öğrenme hedefleri** - Neler başaracaksınız  
- **Adım adım talimatlar** - Detaylı uygulama rehberleri  
- **Kod örnekleri** - Çalışan örnekler ve açıklamalar  
- **Alıştırmalar** - Uygulamalı pratik imkanı  
- **Sorun giderme rehberleri** - Yaygın problemler ve çözümleri  
- **Ek kaynaklar** - İleri okuma ve keşif  

### Önkoşullar Kontrolü

Her laboratuvara başlamadan önce:  
- **Gerekli bilgiler** - Önceden bilmeniz gerekenler  
- **Ortam doğrulama** - Ortamınızın doğrulanması  
- **Zaman tahminleri** - Tamamlama süresi tahminleri  
- **Öğrenme çıktıları** - Bitirdiğinizde neler bileceksiniz  

### Önerilen Öğrenme Yolları

Deneyim seviyenize göre yolunuzu seçin:

#### 🟢 **Başlangıç Seviyesi Yolu** (MCP’ye yeni başlayanlar)  
1. Öncelikle [MCP for Beginners](https://aka.ms/mcp-for-beginners) 0-10'u tamamlayın  
2. Temellerinizi pekiştirmek için 00-03 laboratuvarlarını bitirin  
3. Uygulama için 04-06 laboratuvarlarını takip edin  
4. Pratik kullanım için 07-09 laboratuvarlarını deneyin  

#### 🟡 **Orta Seviye Yolu** (Biraz MCP deneyimi olanlar)  
1. Veritabanı özel kavramlar için 00-01 laboratuvarlarını gözden geçirin  
2. Uygulama için 02-06 laboratuvarlarına odaklanın  
3. İleri özellikler için 07-12 laboratuvarlarında derinleşin  

#### 🔴 **İleri Seviye Yolu** (MCP'de deneyimli olanlar)  
1. Bağlam için 00-03 laboratuvarlarını hızlıca inceleyin  
2. Veritabanı entegrasyonu için 04-09 laboratuvarlarına odaklanın  
3. Prodüksiyon dağıtımı için 10-12 laboratuvarlarına yoğunlaşın  

## 🛠️ Bu Öğrenme Yolunu Etkili Kullanma

### Sıralı Öğrenme (Önerilen)

Kapsamlı anlayış için laboratuvarları sırayla yapın:

1. **Genel bakışı okuyun** - Neler öğreneceğinizi anlayın  
2. **Önkoşulları kontrol edin** - Gerekli bilgiye sahip olun  
3. **Adım adım rehberleri takip edin** - Öğrendikçe uygulayın  
4. **Alıştırmaları tamamlayın** - Anlayışınızı pekiştirin  
5. **Önemli noktaları gözden geçirin** - Öğrenme çıktılarını sağlamlaştırın  

### Hedefe Yönelik Öğrenme

Belirli becerilere ihtiyaç duyuyorsanız:

- **Veritabanı Entegrasyonu**: 04-06 laboratuvarlarına odaklanın  
- **Güvenlik Uygulaması**: 02, 08, 12 laboratuvarlarına yoğunlaşın  
- **Yapay Zeka / Anlamsal Arama**: 07 laboratuvarında derinleşin  
- **Prodüksiyon Dağıtımı**: 10-12 laboratuvarlarını çalışın  

### Uygulamalı Pratik

Her laboratuvarda:  
- **Çalışan kod örnekleri** - Kopyalayın, değiştirin ve deneyin  
- **Gerçek dünya senaryoları** - Pratik perakende analitiği kullanım durumları  
- **Sürekli artan zorluk** - Basitten ileri seviyeye inşa  
- **Doğrulama adımları** - Uygulamanızın çalıştığını kontrol edin  

## 🌟 Topluluk ve Destek

### Yardım Alın

- **Azure AI Discord**: [Uzman desteği için katılın](https://discord.com/invite/ByRwuEEgH4)  
- **GitHub Deposu ve Uygulama Örneği**: [Dağıtım Örneği ve Kaynaklar](https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail/)  
- **MCP Topluluğu**: [Geniş MCP tartışmalarına katılın](https://github.com/orgs/modelcontextprotocol/discussions)  

## 🚀 Başlamaya Hazır mısınız?

Yolculuğunuza **[Lab 00: MCP Veritabanı Entegrasyonuna Giriş](./00-Introduction/README.md)** ile başlayın

---

*Bu kapsamlı ve uygulamalı öğrenme deneyimiyle veritabanı entegrasyonlu üretime hazır MCP sunucularını ustalıkla oluşturun.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstersek de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek herhangi bir yanlış anlama veya yanlış yorumlama nedeniyle sorumluluk kabul edilmemektedir.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->