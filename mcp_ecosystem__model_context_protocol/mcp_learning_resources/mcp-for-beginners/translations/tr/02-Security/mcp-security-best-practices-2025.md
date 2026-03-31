# MCP Güvenlik En İyi Uygulamaları - Şubat 2026 Güncellemesi

> **Önemli**: Bu belge en son [MCP Spesifikasyonu 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) güvenlik gereksinimlerini ve resmi [MCP Güvenlik En İyi Uygulamaları](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) yansıtıyor. En güncel rehberlik için her zaman mevcut spesifikasyona başvurun.

## 🏔️ Uygulamalı Güvenlik Eğitimi

Pratik uygulama deneyimi için **[MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/)** - Azure'da MCP sunucularının güvenliğini sağlamak için kapsamlı rehberli bir keşif öneriyoruz. Atölye, tüm OWASP MCP Top 10 risklerini "açık → suistimal → düzelt → doğrula" metodolojisiyle kapsar.

Bu belgede yer alan tüm uygulamalar, Azure'a özgü uygulama rehberliği için **[OWASP MCP Azure Güvenlik Rehberi](https://microsoft.github.io/mcp-azure-security-guide/)** ile uyumludur.

## MCP Uygulamaları İçin Temel Güvenlik Uygulamaları

Model Context Protocol, geleneksel yazılım güvenliğinin ötesine geçen benzersiz güvenlik zorlukları sunar. Bu uygulamalar, temel güvenlik gereksinimleri ve MCP’ye özgü tehditler (prompt enjeksiyonu, araç zehirlenmesi, oturum kaçırma, karışık yetki sorunları ve token geçtiği açıklıkları) ele alır.

### **ZORUNLU Güvenlik Gereksinimleri**

**MCP Spesifikasyonundan Kritik Gereksinimler:**

### **ZORUNLU Güvenlik Gereksinimleri**

**MCP Spesifikasyonundan Kritik Gereksinimler:**

> **KABUL EDİLEMEZ**: MCP sunucuları, açıkça MCP sunucusu için verilmemiş herhangi bir tokenı **KABUL EDEMEZ**
> 
> **GEREKLİ**: Yetkilendirme uygulayan MCP sunucuları TÜM gelen istekleri doğrulamalıdır
>  
> **KABUL EDİLEMEZ**: MCP sunucuları kimlik doğrulaması için oturum kullanamaz
>
> **GEREKLİ**: Statik istemci kimlikleri kullanan MCP proxy sunucuları, her dinamik olarak kayıtlı istemci için kullanıcı onayı almalıdır

---

## 1. **Token Güvenliği ve Kimlik Doğrulama**

**Kimlik Doğrulama ve Yetkilendirme Kontrolleri:**
   - **Titiz Yetkilendirme İncelemesi**: MCP sunucu yetkilendirme mantığını kapsamlı denetimlerle gözden geçirerek yalnızca hedeflenen kullanıcılar ve istemcilerin kaynaklara erişebilmesini sağlamak
   - **Harici Kimlik Sağlayıcı Entegrasyonu**: Özel kimlik doğrulama yerine Microsoft Entra ID gibi kabul görmüş kimlik sağlayıcıları kullanmak
   - **Token Hedef Kitle Doğrulaması**: Tokenların açıkça MCP sunucunuz için verildiğini her zaman doğrulayın - asla yukarı akış tokenlarını kabul etmeyin
   - **Uygun Token Yaşam Döngüsü**: Güvenli token rotasyonu, son kullanma politikaları uygulayın ve token tekrar saldırılarını önleyin

**Korumalı Token Depolama:**
   - Tüm gizli bilgiler için Azure Key Vault veya benzeri güvenli kimlik bilgisi depolama kullanın
   - Tokenları hem beklemede hem de aktarımda şifreleyin
   - Düzenli kimlik bilgisi rotasyonu ve yetkisiz erişim izleme uygulayın

## 2. **Oturum Yönetimi ve Aktarım Güvenliği**

**Güvenli Oturum Uygulamaları:**
   - **Kriptografik Güvenli Oturum Kimlikleri**: Güvenli, belirlenemez oturum kimlikleri için güvenli rastgele sayı üreteçleri kullanın
   - **Kullanıcıya Özel Bağlama**: Oturum kimliklerini `<user_id>:<session_id>` gibi formatlarla kullanıcı kimliklerine bağlayarak kullanıcılar arası oturum suistimalini önleyin
   - **Oturum Yaşam Döngüsü Yönetimi**: Doğru sonlandırma, rotasyon ve geçersiz kılma uygulayarak zafiyet pencerelerini sınırlayın
   - **HTTPS/TLS Zorunluluğu**: Oturum kimliği ele geçirilmesini önlemek için tüm iletişimde zorunlu HTTPS kullanın

**Aktarım Katmanı Güvenliği:**
   - İmkan varsa TLS 1.3 uygulatın ve uygun sertifika yönetimi sağlayın
   - Kritik bağlantılar için sertifika pinleme uygulayın
   - Düzenli sertifika rotasyonu ve geçerlilik kontrolü yapın

## 3. **Yapay Zekâya Özgü Tehdit Koruması** 🤖

**Prompt Enjeksiyonu Savunması:**
   - **Microsoft Prompt Shields**: Kötü niyetli talimatların gelişmiş algılanması ve filtrelenmesi için AI Prompt Shield’ları uygulayın
   - **Girdi Temizleme**: Tüm girdileri doğrulayın ve temizleyin; enjeksiyon saldırılarını ve karışık yetki problemlerini önleyin
   - **İçerik Sınırlandırmaları**: Güvenilir talimatlar ile dış içerik arasındaki ayrımı sağlamak için ayırıcı ve veri işaretleme sistemleri kullanın

**Araç Zehirlenmesi Önleme:**
   - **Araç Metaveri Doğrulaması**: Araç tanımları için bütünlük kontrolleri uygulayın ve beklenmedik değişiklikler için izleme yapın
   - **Dinamik Araç İzleme**: Çalışma zamanı davranışını gözlemleyin ve beklenmeyen yürütme modelleri için uyarı sistemleri kurun
   - **Onay İş Akışları**: Araç değişiklikleri ve yetenek değişimleri için açık kullanıcı onayı gerektirin

## 4. **Erişim Kontrolü ve İzinler**

**Asgari Yetki İlkesi:**
   - MCP sunucularına sadece gereken minimum izinleri verin
   - Ayrıntılı izinlerle rol tabanlı erişim kontrolü (RBAC) uygulayın
   - Düzenli izin incelemeleri ve ayrıcalık yükseltmeleri için sürekli izleme yapın

**Çalışma Zamanı İzin Kontrolleri:**
   - Kaynak tüketimi saldırılarını önlemek için kaynak sınırları koyun
   - Araç çalıştırma ortamları için konteyner izolasyonu kullanın  
   - Yönetim işlevleri için ihtiyaç bazlı erişim uygulayın

## 5. **İçerik Güvenliği ve İzleme**

**İçerik Güvenliği Uygulamaları:**
   - **Azure Content Safety Entegrasyonu**: Zararlı içerik, jailbreak girişimleri ve politika ihlallerini tespit etmek için Azure Content Safety kullanın
   - **Davranışsal Analiz**: MCP sunucu ve araç yürütme anormalliklerini belirlemek için çalışma zamanı davranış izleme uygulayın
   - **Kapsamlı Kayıt Tutma**: Tüm kimlik doğrulama girişimleri, araç çağrıları ve güvenlik olaylarını güvenli ve değişmez depolamayla kayıt altına alın

**Sürekli İzleme:**
   - Şüpheli desenler ve yetkisiz erişim denemeleri için gerçek zamanlı uyarı sistemi  
   - Merkezi güvenlik olay yönetimi için SIEM sistemleriyle entegrasyon
   - MCP uygulamalarının düzenli güvenlik denetimleri ve penetrasyon testleri

## 6. **Tedarik Zinciri Güvenliği**

**Bileşen Doğrulaması:**
   - **Bağımlılık Taraması**: Tüm yazılım bağımlılıkları ve AI bileşenleri için otomatik zafiyet taraması kullanın
   - **Köken Doğrulaması**: Modellerin, veri kaynaklarının ve dış servislerin kökenini, lisansını ve bütünlüğünü doğrulayın
   - **İmzalı Paketler**: Kriptografik olarak imzalanmış paketler kullanın ve dağıtımdan önce imzaları doğrulayın

**Güvenli Geliştirme Hattı:**
   - **GitHub Gelişmiş Güvenlik**: Gizli anahtar tarama, bağımlılık analizi ve CodeQL statik analiz uygulayın
   - **CI/CD Güvenliği**: Otomatik dağıtım hatlarında güvenlik doğrulamasını entegre edin
   - **Ürün Bütünlüğü**: Dağıtılan ürün ve yapılandırmalar için kriptografik doğrulama uygulayın

## 7. **OAuth Güvenliği ve Karışık Yetki Önleme**

**OAuth 2.1 Uygulaması:**
   - **PKCE Uygulaması**: Tüm yetkilendirme istekleri için Kod Değişim Kanıtı (PKCE) kullanın
   - **Açık Onay**: Karışık yetki saldırılarını önlemek için her dinamik kayıtlı istemci için kullanıcı onayı alın
   - **Yönlendirme URI Doğrulaması**: Yönlendirme URI’leri ve istemci kimliklerini katı şekilde doğrulayın

**Proxy Güvenliği:**
   - Statik istemci kimliği suistimali yoluyla yetkilendirme atlamasını önleyin
   - Üçüncü taraf API erişimi için uygun onay iş akışları uygulayın
   - Yetkilendirme kodu hırsızlığı ve yetkisiz API erişimi için izleme yapın

## 8. **Olay Müdahalesi ve Kurtarma**

**Hızlı Müdahale Yetenekleri:**
   - **Otomatik Müdahale**: Kimlik bilgisi rotasyonu ve tehdit sınırlama için otomatik sistemler uygulayın
   - **Geri Alma Prosedürleri**: Hızlıca bilinen iyi yapılandırmalara ve bileşenlere geri dönme yeteneği
   - **Adli Yetenekler**: Olay araştırması için ayrıntılı denetim izleri ve kayıtlar tutun

**İletişim ve Koordinasyon:**
   - Güvenlik olayları için net yükseltme prosedürleri
   - Kurumsal olay müdahale ekipleriyle entegrasyon
   - Düzenli güvenlik olayı simülasyonları ve masaüstü tatbikatları

## 9. **Uyumluluk ve Yönetim**

**Düzenleyici Uyumluluk:**
   - MCP uygulamalarının sektör özel gereksinimlere (GDPR, HIPAA, SOC 2) uygun olmasını sağlayın
   - AI veri işleme için veri sınıflandırması ve gizlilik kontrolleri uygulayın
   - Uyumluluk denetimleri için kapsamlı dokümantasyon tutun

**Değişiklik Yönetimi:**
   - Tüm MCP sistem değişiklikleri için resmi güvenlik inceleme süreçleri
   - Sürüm kontrolü ve yapılandırma değişiklikleri için onay iş akışları
   - Düzenli uyumluluk değerlendirmeleri ve boşluk analizleri

## 10. **Gelişmiş Güvenlik Kontrolleri**

**Sıfır Güven Mimarisı:**
   - **Asla Güvenme, Her Zaman Doğrula**: Kullanıcılar, cihazlar ve bağlantılar için sürekli doğrulama
   - **Mikro segmentasyon**: Bireysel MCP bileşenlerini izole eden ayrıntılı ağ kontrolleri
   - **Koşullu Erişim**: Mevcut bağlam ve davranışa uyum sağlayan risk tabanlı erişim kontrolleri

**Çalışma Zamanı Uygulama Koruması:**
   - **Çalışma Zamanı Uygulama Kendi Kendini Koruma (RASP)**: Gerçek zamanlı tehdit tespiti için RASP teknikleri kullanın
   - **Uygulama Performans İzleme**: Saldırı göstergesi olabilecek performans anormalliklerini izleyin
   - **Dinamik Güvenlik Politikaları**: Güncel tehdit ortamına göre uyum sağlayan güvenlik politikaları uygulayın

## 11. **Microsoft Güvenlik Ekosistemi Entegrasyonu**

**Kapsamlı Microsoft Güvenliği:**
   - **Microsoft Defender for Cloud**: MCP iş yükleri için bulut güvenlik duruşu yönetimi
   - **Azure Sentinel**: Gelişmiş tehdit tespiti için bulut tabanlı SIEM ve SOAR yetenekleri
   - **Microsoft Purview**: AI iş akışları ve veri kaynakları için veri yönetimi ve uyumluluk

**Kimlik ve Erişim Yönetimi:**
   - **Microsoft Entra ID**: Koşullu erişim politikaları ile kurumsal kimlik yönetimi
   - **Yetkili Kimlik Yönetimi (PIM)**: Yönetim işlevleri için ihtiyaç bazlı erişim ve onay iş akışları
   - **Kimlik Koruma**: Risk bazlı koşullu erişim ve otomatik tehdit yanıtı

## 12. **Sürekli Güvenlik Evrimi**

**Güncel Kalmak:**
   - **Spesifikasyon Takibi**: MCP spesifikasyon güncellemeleri ve güvenlik rehberi değişikliklerini düzenli inceleme
   - **Tehdit İstihbaratı**: AI'ya özgü tehdit beslemeleri ve güvenlik ihlali göstergeleri entegrasyonu
   - **Güvenlik Topluluğu Katılımı**: MCP güvenlik topluluğunda aktif katılım ve zafiyet açıklama programları

**Uyarlanabilir Güvenlik:**
   - **Makine Öğrenmesi Güvenliği**: Yeni saldırı desenlerini belirlemek için ML tabanlı anomali tespiti kullanımı
   - **Öngörücü Güvenlik Analitiği**: Proaktif tehdit tanımlaması için öngörücü modeller uygulama
   - **Güvenlik Otomasyonu**: Tehdit istihbaratı ve spesifikasyon değişikliklerine göre otomatik güvenlik politika güncellemeleri

---

## **Kritik Güvenlik Kaynakları**

### **Resmi MCP Dokümantasyonu**
- [MCP Spesifikasyonu (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Güvenlik En İyi Uygulamaları](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Yetkilendirme Spesifikasyonu](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Güvenlik Kaynakları**
- [OWASP MCP Azure Güvenlik Rehberi](https://microsoft.github.io/mcp-azure-security-guide/) - Azure uygulaması ile kapsamlı OWASP MCP Top 10
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Resmi OWASP MCP güvenlik riskleri
- [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure üzerinde MCP için uygulamalı güvenlik eğitimi

### **Microsoft Güvenlik Çözümleri**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Güvenliği](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Gelişmiş Güvenlik](https://github.com/security/advanced-security)

### **Güvenlik Standartları**
- [OAuth 2.0 Güvenlik En İyi Uygulamaları (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Büyük Dil Modelleri için OWASP Top 10](https://genai.owasp.org/)
- [NIST AI Risk Yönetim Çerçevesi](https://www.nist.gov/itl/ai-risk-management-framework)

### **Uygulama Rehberleri**
- [Azure API Yönetimi MCP Kimlik Doğrulama Ağ Geçidi](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID ile MCP Sunucuları](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Güvenlik Uyarısı**: MCP güvenlik uygulamaları hızla evrilmektedir. Uygulamadan önce her zaman mevcut [MCP spesifikasyonunu](https://spec.modelcontextprotocol.io/) ve [resmi güvenlik dokümantasyonunu](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) doğrulayın.

## Sonraki Adımlar

- Oku: [MCP Güvenlik Kontrolleri 2025](./mcp-security-controls-2025.md)
- Geri Dön: [Güvenlik Modülü Genel Bakış](./README.md)
- Devam Et: [Modül 3: Başlarken](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba gösterilse de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalar veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->