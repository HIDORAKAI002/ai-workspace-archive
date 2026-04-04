# MCP Güvenlik En İyi Uygulamaları 2025

Bu kapsamlı rehber, Model Context Protocol (MCP) sistemlerinin uygulanması için en son **MCP Spesifikasyonu 2025-11-25** ve mevcut sektör standartlarına dayalı önemli güvenlik en iyi uygulamalarını özetlemektedir. Bu uygulamalar, hem geleneksel güvenlik endişelerini hem de MCP dağıtımlarına özgü yapay zeka (YZ) tehditlerini ele almaktadır.

## Kritik Güvenlik Gereksinimleri

### Zorunlu Güvenlik Kontrolleri (MUST Gereksinimleri)

1. **Token Doğrulama**: MCP sunucuları, açıkça sadece MCP sunucusu için verilmemiş herhangi bir tokenı KABUL ETMEMELİDİR  
2. **Yetkilendirme Doğrulaması**: Yetkilendirmeyi uygulayan MCP sunucuları TÜM gelen istekleri doğrulamalı ve kimlik doğrulama için oturumları KULLANMAMALIDIR  
3. **Kullanıcı Onayı**: Statik istemci kimlikleri kullanan MCP proxy sunucuları, her dinamik kayıtlı istemci için açık kullanıcı onayı ALMALIDIR  
4. **Güvenli Oturum Kimlikleri**: MCP sunucuları, güvenli rastgele sayı üreteçleri ile oluşturulmuş kriptografik olarak güvenli, belirlenemez oturum kimlikleri KULLANMALIDIR

## Temel Güvenlik Uygulamaları

### 1. Girdi Doğrulama ve Temizleme
- **Kapsamlı Girdi Doğrulama**: Tüm girdileri enjeksiyon saldırılarını, confused deputy problemlerini ve prompt enjeksiyonu açıklarını önlemek için doğrulayın ve temizleyin  
- **Parametre Şeması Uygulaması**: Tüm araç parametreleri ve API girdileri için katı JSON şema doğrulaması uygulayın  
- **İçerik Filtreleme**: Prompt’lar ve cevaplarda kötü amaçlı içeriği filtrelemek için Microsoft Prompt Shields ve Azure Content Safety kullanın  
- **Çıktı Temizleme**: Model çıktılarını kullanıcılar veya alt sistemlere sunmadan önce doğrulayın ve temizleyin

### 2. Kimlik Doğrulama ve Yetkilendirme Mükemmelliği  
- **Dış Kimlik Sağlayıcılar**: Özel kimlik doğrulama yerine köklü kimlik sağlayıcılarına (Microsoft Entra ID, OAuth 2.1 sağlayıcıları) kimlik doğrulamayı devredin  
- **Hassas İzinler**: En az ayrıcalık ilkesi doğrultusunda araçlara özgü ayrıntılı izinler uygulayın  
- **Token Yaşam Döngüsü Yönetimi**: Kısa ömürlü erişim tokenları kullanarak güvenli döndürme ve uygun hedef doğrulaması yapın  
- **Çok Faktörlü Kimlik Doğrulama**: Tüm yönetici erişimleri ve hassas işlemler için MFA gerektirin

### 3. Güvenli İletişim Protokolleri
- **Taşıma Katmanı Güvenliği**: Tüm MCP iletişimlerinde HTTPS/TLS 1.3 ve uygun sertifika doğrulaması kullanın  
- **Uçtan Uca Şifreleme**: Çok hassas veriler için iletim ve istirahat halindeki şifreleme katmanları ekleyin  
- **Sertifika Yönetimi**: Otomatik yenileme süreçleri ile uygun sertifika yaşam döngüsü yönetimi yapın  
- **Protokol Sürümü Uygulaması**: Güncel MCP protokol sürümü (2025-11-25) ile uygun sürüm müzakeresi uygulayın

### 4. Gelişmiş Oran Sınırlandırma ve Kaynak Koruması
- **Çok Katmanlı Oran Sınırlandırma**: Kullanıcı, oturum, araç ve kaynak seviyelerinde kullanım kıtlığı önleyin  
- **Uyarlanabilir Oran Sınırlandırma**: Kullanım desenleri ve tehdit göstergelerine uyum sağlayan makine öğrenimi tabanlı sınırlandırma kullanın  
- **Kaynak Kota Yönetimi**: Hesaplama kaynakları, bellek kullanımı ve yürütme süreleri için uygun sınırlar belirleyin  
- **DDoS Koruması**: Kapsamlı DDoS koruma ve trafik analiz sistemleri kurun

### 5. Kapsamlı Günlükleme ve İzleme
- **Yapılandırılmış Denetim Günlüğü**: Tüm MCP işlemleri, araç yürütmeleri ve güvenlik olayları için ayrıntılı, aranabilir günlükler tutun  
- **Gerçek Zamanlı Güvenlik İzleme**: MCP iş yükleri için yapay zeka destekli anormallik tespitli SIEM sistemleri kurun  
- **Gizliliğe Uyumlu Günlükleme**: Güvenlik olaylarını veri gizliliği gereksinimleri ve düzenlemelerine saygı göstererek kaydedin  
- **Olay Müdahale Entegrasyonu**: Günlükleme sistemlerini otomatik olay müdahale iş akışlarına bağlayın

### 6. Gelişmiş Güvenli Depolama Uygulamaları
- **Donanım Güvenlik Modülleri**: Kritik kriptografik işlemler için HSM destekli anahtar depolama kullanın (Azure Key Vault, AWS CloudHSM)  
- **Şifreleme Anahtarı Yönetimi**: Anahtar döndürme, ayrıştırma ve erişim kontrollerini doğru uygulayın  
- **Gizli Bilgi Yönetimi**: Tüm API anahtarları, tokenlar ve kimlik bilgilerini özel gizli yönetim sistemlerinde saklayın  
- **Veri Sınıflandırması**: Verileri duyarlılık seviyelerine göre sınıflandırıp uygun koruma önlemleri uygulayın

### 7. Gelişmiş Token Yönetimi
- **Token Doğrudan Geçişinin Önlenmesi**: Güvenlik kontrollerini aşan token doğrudan geçiş desenlerini açıkça yasaklayın  
- **Hedef Doğrulaması**: Token hedef iddialarının amaçlanan MCP sunucu kimliğiyle eşleştiğini her zaman doğrulayın  
- **İddia Tabanlı Yetkilendirme**: Token iddiaları ve kullanıcı özelliklerine dayalı ayrıntılı yetkilendirme uygulayın  
- **Token Bağlama**: Tokenları uygun şekilde belirli oturumlara, kullanıcılara veya cihazlara bağlayın

### 8. Güvenli Oturum Yönetimi
- **Kriptografik Oturum Kimlikleri**: Oturum kimliklerini kriptografik olarak güvenli rastgele sayı üreteçleri ile oluşturun (öngörülebilir diziler değil)  
- **Kullanıcıya Özgü Bağlama**: Oturum kimliklerini `<user_id>:<session_id>` gibi güvenli formatlarla kullanıcıya özgü bilgiye bağlayın  
- **Oturum Yaşam Döngüsü Kontrolleri**: Doğru oturum süresi sonu, döndürme ve geçersiz kılma mekanizmalarını uygulayın  
- **Oturum Güvenlik Başlıkları**: Oturum koruması için uygun HTTP güvenlik başlıkları kullanın

### 9. YZ’ye Özgü Güvenlik Kontrolleri
- **Prompt Enjeksiyonu Savunması**: Microsoft Prompt Shields’ı spotlighting, sınırlayıcılar ve veri işaretleme teknikleri ile kullanın  
- **Araç Zehirlenmesinin Önlenmesi**: Araç meta verisini doğrulayın, dinamik değişiklikleri izleyin ve araç bütünlüğünü kontrol edin  
- **Model Çıktısı Doğrulaması**: Model çıktılarını potansiyel veri sızıntısı, zararlı içerik veya güvenlik politikası ihlallerine karşı tarayın  
- **Bağlam Penceresi Koruması**: Bağlam penceresi zehirlenmesi ve manipülasyon saldırılarını önlemek için kontroller uygulayın

### 10. Araç Yürütme Güvenliği
- **Yürütme Kum Havuzu**: Araç yürütmelerini konteynerize, izole ortamlarda ve kaynak sınırları ile çalıştırın  
- **Ayrıcalık Ayrımı**: Araçları minimum ayrıcalıkla ve ayrı hizmet hesaplarıyla yürütün  
- **Ağ İzolasyonu**: Araç yürütme ortamları için ağ segmentasyonu uygulayın  
- **Yürütme İzleme**: Anormal davranış, kaynak kullanımı ve güvenlik ihlalleri için araç yürütmesini izleyin

### 11. Sürekli Güvenlik Doğrulaması
- **Otomatik Güvenlik Testleri**: Güvenlik testlerini GitHub Advanced Security gibi araçlarla CI/CD boru hatlarına entegre edin  
- **Zafiyet Yönetimi**: Yapay zeka modelleri ve dış servisler dahil tüm bağımlılıkları düzenli tarayın  
- **Sızma Testleri**: MCP uygulamalarına özel düzenli güvenlik değerlendirmeleri yapın  
- **Güvenlik Kod İncelemeleri**: Tüm MCP ile ilgili kod değişiklikleri için zorunlu güvenlik incelemeleri uygulayın

### 12. YZ Tedarik Zinciri Güvenliği
- **Bileşen Doğrulaması**: Tüm YZ bileşenlerinin (modeller, embeddings, API’ler) kaynağını, bütünlüğünü ve güvenliğini doğrulayın  
- **Bağımlılık Yönetimi**: Tüm yazılım ve YZ bağımlılıklarının güncel envanterlerini ve zafiyet takibini yapın  
- **Güvenilir Depolar**: Tüm YZ modelleri, kütüphaneler ve araçlar için doğrulanmış, güvenilir kaynaklar kullanın  
- **Tedarik Zinciri İzleme**: YZ servis sağlayıcıları ve model depolarının güvenlik ihlallerini sürekli izleyin

## Gelişmiş Güvenlik Desenleri

### MCP için Sıfır Güven Mimarisi
- **Asla Güvenme, Her Zaman Doğrula**: Tüm MCP katılımcıları için sürekli doğrulama uygulayın  
- **Mikro-segmentasyon**: MCP bileşenlerini ayrıntılı ağ ve kimlik kontrolleriyle izole edin  
- **Koşullu Erişim**: Konteks ve davranışa uyum sağlayan risk tabanlı erişim kontrolleri uygulayın  
- **Sürekli Risk Değerlendirmesi**: Mevcut tehdit göstergelerine göre güvenlik duruşunu dinamik değerlendirin

### Gizliliği Korumalı YZ Uygulaması
- **Veri Azaltımı**: Her MCP işlemi için sadece gerekli minimum veriyi açığa çıkarın  
- **Diferansiyel Gizlilik**: Hassas veri işleme için gizliliği koruyan teknikler uygulayın  
- **Homomorfik Şifreleme**: Şifreli veriler üzerinde güvenli hesaplama için gelişmiş şifreleme teknikleri kullanın  
- **Federated Learning**: Veri yerelliği ve gizliliği koruyan dağıtık öğrenme yaklaşımları uygulayın

### YZ Sistemleri için Olay Müdahalesi
- **YZ’ye Özgü Olay Prosedürleri**: AI ve MCP’ye özgü tehditlere yönelik olay müdahale prosedürleri geliştirin  
- **Otomatik Müdahale**: Yaygın YZ güvenlik olayları için otomatik sınırlama ve düzeltme uygulayın  
- **Adli Yetkinlikler**: YZ sistem ihlalleri ve veri sızıntıları için adli hazırlık düzeyini koruyun  
- **Kurtarma Prosedürleri**: YZ model zehirlenmesi, prompt enjeksiyonu saldırıları ve servis ihlallerinden kurtarma prosedürleri kurun

## Uygulama Kaynakları ve Standartlar

### 🏔️ Pratik Güvenlik Eğitimi
- **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - Azure’da MCP sunucularını güvence altına almak için kapsamlı pratik atölye  
- **[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)** - Referans mimari ve OWASP MCP Top 10 uygulama rehberi

### Resmi MCP Dokümantasyonu
- [MCP Specification 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Güncel MCP protokol spesifikasyonu  
- [MCP Security Best Practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Resmi güvenlik rehberi  
- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Kimlik doğrulama ve yetkilendirme desenleri  
- [MCP Transport Security](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Taşıma katmanı güvenlik gereksinimleri

### Microsoft Güvenlik Çözümleri
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Gelişmiş prompt enjeksiyonu koruması  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Kapsamlı YZ içerik filtreleme  
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Kurumsal kimlik ve erişim yönetimi  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Güvenli gizli bilgi ve kimlik bilgisi yönetimi  
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Tedarik zinciri ve kod güvenlik taraması

### Güvenlik Standartları ve Çerçeveler
- [OAuth 2.1 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Güncel OAuth güvenlik rehberi  
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Web uygulama güvenlik riskleri  
- [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - YZ’ye özgü güvenlik riskleri  
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) - Kapsamlı YZ risk yönetimi  
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Bilgi güvenliği yönetim sistemleri

### Uygulama Rehberleri ve Eğiticiler
- [Azure API Management as MCP Auth Gateway](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Kurumsal kimlik doğrulama desenleri  
- [Microsoft Entra ID with MCP Servers](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Kimlik sağlayıcı entegrasyonu  
- [Secure Token Storage Implementation](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Token yönetimi en iyi uygulamaları  
- [End-to-End Encryption for AI](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Gelişmiş şifreleme desenleri

### Gelişmiş Güvenlik Kaynakları
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Güvenli geliştirme uygulamaları  
- [AI Red Team Guidance](https://learn.microsoft.com/security/ai-red-team/) - YZ’ye özgü güvenlik testi  
- [Threat Modeling for AI Systems](https://learn.microsoft.com/security/adoption/approach/threats-ai) - YZ tehdit modelleme metodolojisi  
- [Privacy Engineering for AI](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Gizliliği koruyan YZ teknikleri

### Uyumluluk ve Yönetişim
- [GDPR Compliance for AI](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - YZ sistemlerinde gizlilik uyumu  
- [AI Governance Framework](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Sorumlu YZ uygulaması  
- [SOC 2 for AI Services](https://learn.microsoft.com/compliance/regulatory/offering-soc) - YZ hizmet sağlayıcılar için güvenlik kontrolleri  
- [HIPAA Compliance for AI](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Sağlık alanında YZ uyumluluk gereksinimleri

### DevSecOps ve Otomasyon
- [DevSecOps Pipeline for AI](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Güvenli YZ geliştirme boru hatları  
- [Automated Security Testing](https://learn.microsoft.com/security/engineering/devsecops) - Sürekli güvenlik doğrulaması  
- [Infrastructure as Code Security](https://learn.microsoft.com/security/engineering/infrastructure-security) - Güvenli altyapı dağıtımı  
- [Container Security for AI](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - YZ iş yükü konteyner güvenliği

### İzleme ve Olay Müdahalesi  
- [Azure Monitor for AI Workloads](https://learn.microsoft.com/azure/azure-monitor/overview) - Kapsamlı izleme çözümleri  
- [AI Security Incident Response](https://learn.microsoft.com/security/compass/incident-response-playbooks) - YZ’ye özgü olay prosedürleri  
- [SIEM for AI Systems](https://learn.microsoft.com/azure/sentinel/overview) - Güvenlik bilgi ve olay yönetimi  
- [Threat Intelligence for AI](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - YZ tehdit istihbarat kaynakları

## 🔄 Sürekli İyileştirme

### Gelişen Standartlarla Güncel Kalın
- **MCP Spesifikasyon Güncellemeleri**: Resmi MCP spesifikasyon değişikliklerini ve güvenlik uyarılarını takip edin  
- **Tehdit İstihbaratı**: YZ güvenlik tehdidi beslemelerine ve zafiyet veritabanlarına abone olun  
- **Topluluk Katılımı**: MCP güvenlik topluluğu tartışmalarına ve çalışma gruplarına katılmak  
- **Düzenli Değerlendirme**: Üç ayda bir güvenlik durumu değerlendirmeleri yapmak ve uygulamaları buna göre güncellemek  

### MCP Güvenliğine Katkıda Bulunmak  
- **Güvenlik Araştırması**: MCP güvenlik araştırması ve güvenlik açığı ifşa programlarına katkıda bulunmak  
- **En İyi Uygulamaların Paylaşımı**: Güvenlik uygulamalarını ve elde edilen dersleri toplulukla paylaşmak  
- **Standart Geliştirme**: MCP spesifikasyonu geliştirme ve güvenlik standardı oluşturma süreçlerine katılmak  
- **Araç Geliştirme**: MCP ekosistemi için güvenlik araçları ve kütüphaneleri geliştirmek ve paylaşmak  

---

*Bu belge, MCP Spesifikasyonu 2025-11-25'e dayalı olarak 18 Aralık 2025 tarihi itibarıyla MCP güvenlik en iyi uygulamalarını yansıtmaktadır. Güvenlik uygulamaları, protokol ve tehdit ortamı geliştikçe düzenli olarak gözden geçirilmeli ve güncellenmelidir.*  

## Sonraki Adımlar  

- Oku: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- Geri Dön: [Security Module Overview](./README.md)  
- Devam Et: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, yapay zeka çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluğa özen göstersek de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, kendi ana dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilmektedir. Bu çevirinin kullanımı sonucu oluşabilecek yanlış anlamalar veya yorum hatalarından sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->