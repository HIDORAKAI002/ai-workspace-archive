# MCP Güvenlik Kontrolleri - Şubat 2026 Güncellemesi

> **Mevcut Standart**: Bu belge, [MCP Spesifikasyonu 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) güvenlik gereksinimlerini ve resmi [MCP Güvenlik En İyi Uygulamaları](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) yansıtıyor.

Model Context Protocol (MCP), hem geleneksel yazılım güvenliği hem de AI'ya özgü tehditleri ele alan geliştirilmiş güvenlik kontrolleriyle önemli ölçüde olgunlaşmıştır. Bu belge, OWASP MCP Top 10 çerçevesiyle uyumlu güvenli MCP uygulamaları için kapsamlı güvenlik kontrolleri sağlar.

## 🏔️ Pratik Güvenlik Eğitimi

Pratik, uygulamalı güvenlik uygulama deneyimi için, **[MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)** - "zayıf → istismar → düzelt → doğrula" metodolojisi kullanılarak Azure'da MCP sunucularını güvence altına almaya yönelik kapsamlı bir rehberli keşif turunu öneririz.

Bu belgede yer alan tüm güvenlik kontrolleri, **[OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/)** ile uyumludur; bu kılavuz, OWASP MCP Top 10 riskleri için referans mimariler ve Azure özgü uygulama rehberliği sağlar.

## **ZORUNLU Güvenlik Gereksinimleri**

### **MCP Spesifikasyonundan Kritik Yasaklar:**

> **YASAK**: MCP sunucuları açıkça MCP sunucusu için verilmemiş herhangi bir belirteci kabul ETMEMELİDİR  
>
> **YASAK**: MCP sunucuları kimlik doğrulama için oturum kullanmamalıdır  
>
> **GEREKLİ**: Yetkilendirme uygulayan MCP sunucuları TÜM gelen istekleri doğrulamalıdır  
>
> **ZORUNLU**: Statik istemci kimlikleri kullanan MCP proxy sunucuları her dinamik olarak kayıtlı istemci için kullanıcı onayı almalıdır

---

## 1. **Kimlik Doğrulama ve Yetkilendirme Kontrolleri**

### **Dış Kimlik Sağlayıcı Entegrasyonu**

**Mevcut MCP Standardı (2025-11-25)**, MCP sunucularının kimlik doğrulamayı dış kimlik sağlayıcılarına devretmesine izin verir; bu önemli bir güvenlik iyileştirmesidir:

**Ele Alınan OWASP MCP Riski**: [MCP07 - Yetersiz Kimlik Doğrulama ve Yetkilendirme](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Güvenlik Faydaları:**
1. **Özel Kimlik Doğrulama Risklerini Ortadan Kaldırır**: Özel kimlik doğrulama uygulamalarını önleyerek güvenlik açığı yüzeyini azaltır
2. **Kurumsal Düzeyde Güvenlik**: Microsoft Entra ID gibi gelişmiş güvenlik özelliklerine sahip köklü kimlik sağlayıcılarından yararlanır
3. **Merkezi Kimlik Yönetimi**: Kullanıcı yaşam döngüsü yönetimi, erişim kontrolü ve uyumluluk denetimini kolaylaştırır
4. **Çok Faktörlü Kimlik Doğrulama**: Kurumsal kimlik sağlayıcılarından MFA yeteneklerini devralır
5. **Koşullu Erişim Politikaları**: Risk tabanlı erişim kontrolleri ve uyarlanabilir kimlik doğrulamadan faydalanır

**Uygulama Gereksinimleri:**
- **Belirteç Hedef Kitle Doğrulaması**: Tüm belirteçlerin açıkça MCP sunucusu için verildiğini doğrulayın
- **Verici Doğrulaması**: Belirteç vericisinin beklenen kimlik sağlayıcısı ile eşleştiğini doğrulayın
- **İmza Doğrulaması**: Belirteç bütünlüğünün kriptografik doğrulaması
- **Süre Sonu Uygulaması**: Belirteç yaşam süresi sınırlarının sıkı şekilde uygulanması
- **Kapsam Doğrulaması**: Belirteçlerin istenen işlemler için uygun izinleri içerdiğinden emin olun

### **Yetkilendirme Mantığı Güvenliği**

**Kritik Kontroller:**
- **Kapsamlı Yetkilendirme Denetimleri**: Tüm yetkilendirme karar noktalarının düzenli güvenlik incelemeleri
- **Arızaya Karşı Güvenli Varsayılanlar**: Yetkilendirme mantığı net karar veremezse erişimi reddet
- **İzin Sınırları**: Farklı ayrıcalık seviyeleri ve kaynak erişimi arasında net ayrım
- **Denetim Kaydı**: Güvenlik izleme için tüm yetkilendirme kararlarının eksiksiz kaydı
- **Düzenli Erişim İncelemeleri**: Kullanıcı izinlerinin ve ayrıcalık atamalarının periyodik doğrulaması

## 2. **Belirteç Güvenliği ve Geçiş İzni Engelleme Kontrolleri**

**Ele Alınan OWASP MCP Riski**: [MCP01 - Belirteç Yönetimi Hataları ve Gizli Bilgi Açığa Çıkması](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Belirteç Geçişinin Önlenmesi**

Belirteç geçişi MCP Yetkilendirme Spesifikasyonunda kritik güvenlik riskleri nedeniyle açıkça yasaktır:

**Ele Alınan Güvenlik Riskleri:**
- **Kontrol Atlatma**: Oran sınırlaması, istek doğrulama ve trafik izlemesi gibi temel güvenlik kontrollerini geçersiz kılar
- **Hesap Verebilirlik Bozukluğu**: İstemci tanımlamayı imkansız hale getirerek denetim izlerini ve olay incelemelerini bozar
- **Proxy Tabanlı Veri Çıkarma**: Kötü niyetli aktörlerin sunucuları izinsiz veri erişimi için proxy olarak kullanmasına izin verir
- **Güven Sınırı İhlalleri**: Aşağıdaki hizmetlerin belirteç kaynaklarına ilişkin güven varsayımlarını bozar
- **Yanal Hareket**: Ele geçirilmiş belirteçlerin birden çok hizmette genişletilmiş saldırı yapmasına olanak tanır

**Uygulama Kontrolleri:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **Güvenli Belirteç Yönetim Desenleri**

**En İyi Uygulamalar:**
- **Kısa Ömürlü Belirteçler**: Belirteç döndürme ile maruz kalma süresini minimize edin
- **Tam Zamanında Verme**: Belirteçleri yalnızca belirli işlemler için gerektiğinde verin
- **Güvenli Depolama**: Donanım güvenlik modülleri (HSM) veya güvenli anahtar kasaları kullanın
- **Belirteç Bağlama**: Belirteçleri mümkün olduğunda belirli istemcilere, oturumlara veya işlemlere bağlayın
- **İzleme ve Alarm**: Belirteç kötüye kullanımı veya izinsiz erişim kalıplarının gerçek zamanlı tespiti

## 3. **Oturum Güvenliği Kontrolleri**

### **Oturum Ele Geçirme Önleme**

**Ele Alınan Saldırı Vektörleri:**
- **Oturum Ele Geçirme İstemi Enjeksiyonu**: Paylaşılan oturum durumuna kötü niyetli olayların enjekte edilmesi
- **Oturum Taklidi**: Çalınan oturum kimliklerinin yetkisiz kullanımı ile kimlik doğrulamanın atlanması
- **Devam Ettirilebilir Akış Saldırıları**: Kötü niyetli içerik enjeksiyonu için sunucu tarafından gönderilen olay devamlarının kullanılması

**Zorunlu Oturum Kontrolleri:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**İletim Güvenliği:**
- **HTTPS Zorlaması**: Tüm oturum iletişimleri TLS 1.3 üzerinden
- **Güvenli Çerez Özellikleri**: HttpOnly, Secure, SameSite=Strict
- **Sertifika Sabitleme**: MITM saldırılarını önlemek için kritik bağlantılarda

### **Durumlu ve Durumsuz Düşünceler**

**Durumlu Uygulamalar için:**
- Paylaşılan oturum durumu enjeksiyon saldırılarına karşı ek koruma gerektirir
- Kuyruk tabanlı oturum yönetimi bütünlük doğrulaması gerektirir
- Birden çok sunucu örneği güvenli oturum durumu eşitlemesi gerektirir

**Durumsuz Uygulamalar için:**
- JWT veya benzeri belirteç tabanlı oturum yönetimi
- Oturum durumu bütünlüğünün kriptografik doğrulaması
- Azalmış saldırı yüzeyi ancak sağlam belirteç doğrulaması gerektirir

## 4. **AI'ya Özgü Güvenlik Kontrolleri**

**Ele Alınan OWASP MCP Riskleri**:  
- [MCP06 - İstek Akışı Ters Çevirme](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Araç Zehirleme](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Komut Enjeksiyonu ve Yürütme](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **İstek Enjeksiyon Savunması**

**Microsoft Prompt Shields Entegrasyonu:**  
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```
  
**Uygulama Kontrolleri:**  
- **Girdi Temizleme**: Tüm kullanıcı girdilerinin kapsamlı doğrulama ve filtrelemesi  
- **İçerik Sınırlarının Tanımlanması**: Sistem talimatları ile kullanıcı içeriği arasında net ayrım  
- **Talimat Hiyerarşisi**: Çelişen talimatlar için uygun öncelik kuralları  
- **Çıktı İzleme**: Potansiyel olarak zararlı veya manipüle edilmiş çıktıların tespiti  

### **Araç Zehirleme Önleme**

**Araç Güvenlik Çerçevesi:**  
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```
  
**Dinamik Araç Yönetimi:**  
- **Onay İş Akışları**: Araç değişiklikleri için açık kullanıcı onayı  
- **Geri Alma Yeteneği**: Önceki araç sürümlerine geri dönme imkanı  
- **Değişiklik Denetimi**: Araç tanımı değişikliklerinin tam geçmişi  
- **Risk Değerlendirmesi**: Araç güvenlik duruşunun otomatik değerlendirmesi  

## 5. **Karışık Temsilci (Confused Deputy) Saldırı Önlemesi**

### **OAuth Proxy Güvenliği**

**Saldırı Önleme Kontrolleri:**  
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```
  
**Uygulama Gereksinimleri:**  
- **Kullanıcı Onayı Doğrulaması**: Dinamik istemci kaydı için onay ekranlarını asla atlamayın  
- **Yönlendirme URI Doğrulaması**: Yönlendirme hedeflerinin sıkı beyaz liste tabanlı doğrulaması  
- **Yetkilendirme Kodu Koruması**: Tek kullanımlık sıkı süreli kodlar  
- **İstemci Kimliği Doğrulaması**: İstemci kimlik bilgileri ve meta verilerinin güçlü doğrulaması  

## 6. **Araç Yürütme Güvenliği**

### **Sandbox ve İzolasyon**

**Konteyner Tabanlı İzolasyon:**  
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```
  
**İşlem İzolasyonu:**  
- **Ayrı İşlem Bağlamları**: Her araç yürütmesi izole işlem alanında  
- **İşlemler Arası İletişim**: Doğrulamalı güvenli IPC mekanizmaları  
- **İşlem İzleme**: Çalışma zamanı davranış analizleri ve anomali tespiti  
- **Kaynak Kısıtlamaları**: CPU, bellek ve G/Ç işlemleri için sert sınırlar  

### **Asgari Ayrıcalık Uygulaması**

**İzin Yönetimi:**  
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```
  
## 7. **Tedarik Zinciri Güvenlik Kontrolleri**

**Ele Alınan OWASP MCP Riski**: [MCP04 - Yazılım Tedarik Zinciri Saldırıları ve Bağımlılık Tahrifatı](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Bağımlılık Doğrulaması**

**Kapsamlı Bileşen Güvenliği:**  
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```
  
### **Sürekli İzleme**

**Tedarik Zinciri Tehdit Tespiti:**  
- **Bağımlılık Sağlığı İzleme**: Tüm bağımlılıkların güvenlik sorunları için sürekli değerlendirilmesi  
- **Tehdit İstihbaratı Entegrasyonu**: Ortaya çıkan tedarik zinciri tehditlerine gerçek zamanlı güncellemeler  
- **Davranışsal Analiz**: Dış bileşenlerde olağandışı davranış tespiti  
- **Otomatik Müdahale**: Ele geçirilmiş bileşenlerin derhal kontrol altına alınması  

## 8. **İzleme ve Tespit Kontrolleri**

**Ele Alınan OWASP MCP Riski**: [MCP08 - Denetim ve Telemetri Eksikliği](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Güvenlik Bilgi ve Olay Yönetimi (SIEM)**

**Kapsamlı Kayıt Stratejisi:**  
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```
  
### **Gerçek Zamanlı Tehdit Tespiti**

**Davranışsal Analitik:**  
- **Kullanıcı Davranış Analitiği (UBA)**: Olağandışı kullanıcı erişim kalıplarının tespiti  
- **Varlık Davranış Analitiği (EBA)**: MCP sunucusu ve araç davranışlarının izlenmesi  
- **Makine Öğrenimi Anomali Tespiti**: Güvenlik tehditlerinin AI destekli tanımlanması  
- **Tehdit İstihbaratı Korelasyonu**: Gözlemlenen faaliyetlerin bilinen saldırı kalıplarıyla eşleştirilmesi  

## 9. **Olay Müdahalesi ve Kurtarma**

### **Otomatik Müdahale Yetkinlikleri**

**Anında Yanıt Eylemleri:**  
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```
  
### **Adli Bilişim Yetkinlikleri**

**Soruşturma Desteği:**  
- **Denetim İzinin Korunması**: Kriptografik bütünlükle değiştirilemez kayıtlar  
- **Delil Toplama**: İlgili güvenlik eserlerinin otomatik toplanması  
- **Zaman Çizelgesi Yeniden Yapılandırması**: Güvenlik olaylarına yol açan ayrıntılı olay dizisi  
- **Etkilenme Değerlendirmesi**: İhlal kapsamı ve veri açığa çıkışının değerlendirilmesi

## **Ana Güvenlik Mimari İlkeleri**

### **Derinlikli Savunma**
- **Çok Katmanlı Güvenlik**: Güvenlik mimarisinde tek hata noktası yok  
- **Yedekli Kontroller**: Kritik fonksiyonlar için örtüşen güvenlik önlemleri  
- **Arızaya Karşı Güvenli Mekanizmalar**: Sistemler hata veya saldırıya maruz kaldığında güvenli varsayılanlar  

### **Sıfır Güven Uygulaması**
- **Asla Güvenme, Her Zaman Doğrula**: Tüm varlıklar ve istekler için sürekli doğrulama  
- **Asgari Ayrıcalık İlkesi**: Tüm bileşenler için en az erişim hakları  
- **Mikro Bölümlendirme**: İnce taneli ağ ve erişim kontrolleri  

### **Sürekli Güvenlik Evrimi**
- **Tehdit Manzarasına Uyum**: Ortaya çıkan tehditleri ele almak için düzenli güncellemeler  
- **Güvenlik Kontrol Etkinliği**: Kontrollerin sürekli değerlendirilmesi ve geliştirilmesi  
- **Spesifikasyon Uyum**: Gelişen MCP güvenlik standartlarıyla uyumlu  

---

## **Uygulama Kaynakları**

### **Resmi MCP Dokümantasyonu**
- [MCP Spesifikasyonu (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Güvenlik En İyi Uygulamaları](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Yetkilendirme Spesifikasyonu](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Güvenlik Kaynakları**
- [OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 ve Azure uygulaması
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Resmi OWASP MCP güvenlik riskleri
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure üzerinde MCP için uygulamalı güvenlik eğitimi

### **Microsoft Güvenlik Çözümleri**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Gelişmiş Güvenlik](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Güvenlik Standartları**
- [OAuth 2.0 Güvenlik En İyi Uygulamaları (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Büyük Dil Modelleri için OWASP Top 10](https://genai.owasp.org/)
- [NIST Siber Güvenlik Çerçevesi](https://www.nist.gov/cyberframework)

---

> **Önemli**: Bu güvenlik kontrolleri mevcut MCP spesifikasyonunu (2025-11-25) yansıtmaktadır. Standartlar hızla değişmeye devam ettiğinden, her zaman en güncel [resmi dokümantasyon](https://spec.modelcontextprotocol.io/) ile doğrulayın.

## Sonraki Adımlar

- Geri dön: [Güvenlik Modülü Genel Bakış](./README.md)  
- Devam et: [Modül 3: Başlarken](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->