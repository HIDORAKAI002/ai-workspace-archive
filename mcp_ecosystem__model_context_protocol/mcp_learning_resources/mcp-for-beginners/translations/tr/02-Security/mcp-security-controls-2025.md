# MCP Güvenlik Kontrolleri - Şubat 2026 Güncellemesi

> **Mevcut Standart**: Bu belge, [MCP Spesifikasyonu 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) güvenlik gereksinimlerini ve resmi [MCP Güvenlik En İyi Uygulamaları](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) yansıtılmaktadır.

Model Context Protocol (MCP), geleneksel yazılım güvenliği ve yapay zekaya özgü tehditlere yönelik gelişmiş güvenlik kontrolleriyle önemli ölçüde olgunlaştı. Bu belge, OWASP MCP Top 10 çerçevesine uyumlu güvenli MCP uygulamaları için kapsamlı güvenlik kontrolleri sunar.

## 🏔️ Pratik Güvenlik Eğitimi

Pratik, uygulamalı güvenlik uygulama deneyimi için **[MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/)** öneriyoruz - "zayıf → sömürü → düzelt → doğrula" metodolojisini kullanarak Azure'da MCP sunucularının güvence altına alınmasına yönelik kapsamlı rehberli bir keşif.

Bu belgedeki tüm güvenlik kontrolleri, OWASP MCP Top 10 risklerine yönelik referans mimariler ve Azure'a özgü uygulama rehberliği sağlayan **[OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/)** ile uyumludur.

## **ZORUNLU Güvenlik Gereksinimleri**

### **MCP Spesifikasyonundan Kritik Yasaklar:**

> **YASAKLANMIŞTIR**: MCP sunucuları, açıkça MCP sunucusu için verilmemiş herhangi bir tokenı kabul **ETMEMELİDİR**  
>
> **YASAK**: MCP sunucuları kimlik doğrulama için oturumları **KULLANMAMALIDIR**  
>
> **GEREKLİ**: Yetkilendirme uygulayan MCP sunucuları TÜM gelen istekleri doğrulamalıdır  
>
> **ZORUNLU**: Statik istemci kimlikleri kullanan MCP vekil sunucuları, her dinamik olarak kayıtlı istemci için kullanıcı onayı almalıdır

---

## 1. **Kimlik Doğrulama ve Yetkilendirme Kontrolleri**

### **Harici Kimlik Sağlayıcı Entegrasyonu**

**Mevcut MCP Standardı (2025-11-25)**, MCP sunucularının kimlik doğrulamayı harici kimlik sağlayıcılarına devretmesine izin vererek önemli bir güvenlik gelişmesi sağlamaktadır:

**Adreslenen OWASP MCP Riski**: [MCP07 - Yetersiz Kimlik Doğrulama ve Yetkilendirme](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Güvenlik Faydaları:**
1. **Özel Kimlik Doğrulama Risklerini Ortadan Kaldırır**: Özel kimlik doğrulama uygulamalarından kaynaklanan savunmasızlık alanını azaltır  
2. **Kurumsal Düzeyde Güvenlik**: Microsoft Entra ID gibi gelişmiş güvenlik özelliklerine sahip köklü kimlik sağlayıcılarını kullanır  
3. **Merkezi Kimlik Yönetimi**: Kullanıcı yaşam döngüsü yönetimi, erişim kontrolü ve uyumluluk denetimini basitleştirir  
4. **Çok Faktörlü Kimlik Doğrulama**: Kurumsal kimlik sağlayıcılarından MFA yetenekleri kazanır  
5. **Koşullu Erişim Politikaları**: Risk tabanlı erişim kontrollerinden ve uyarlanabilir kimlik doğrulamadan yararlanır

**Uygulama Gereksinimleri:**
- **Token Hedef Kitle Doğrulaması**: Tüm tokenların açıkça MCP sunucusu için verilmiş olduğunun doğrulanması  
- **Yayımlayan Doğrulaması**: Token yayımlayanın beklenen kimlik sağlayıcı ile eşleşmesi  
- **İmza Doğrulaması**: Token bütünlüğünün kriptografik doğrulaması  
- **Süre Sonu Uygulaması**: Token ömür sınırlarının sıkı şekilde uygulanması  
- **Kapsam Doğrulaması**: Tokenların talep edilen işlemler için uygun izinleri içerdiğinin temini

### **Yetkilendirme Mantığı Güvenliği**

**Kritik Kontroller:**
- **Kapsamlı Yetkilendirme Denetimleri**: Tüm yetkilendirme karar noktalarının düzenli güvenlik incelemeleri  
- **Güvenli Varsayılanlar**: Yetkilendirme mantığı kesin karar veremediğinde erişimi reddet  
- **İzin Sınırları**: Farklı ayrıcalık seviyeleri ve kaynak erişimi arasında net ayrım  
- **Denetim Kayıtları**: Tüm yetkilendirme kararlarının güvenlik izleme için tam kaydı  
- **Düzenli Erişim İncelemeleri**: Kullanıcı izinleri ve ayrıcalık atamalarının periyodik doğrulaması

## 2. **Token Güvenliği ve Passthrough Karşıtı Kontroller**

**Adreslenen OWASP MCP Riski**: [MCP01 - Token Yanlış Yönetimi ve Gizli Bilgi Açığa Çıkması](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Token Passthrough Engelleme**

MCP Yetkilendirme Spesifikasyonunda kritik güvenlik riskleri nedeniyle **token passthrough kesinlikle yasaktır**:

**Adreslenen Güvenlik Riskleri:**
- **Kontrol Bypassı**: Oran sınırlaması, istek doğrulama ve trafik izleme gibi temel güvenlik kontrollerini atlatır  
- **Hesap Verebilirlik Bozulması**: İstemci tanımlaması imkansız hale gelir, denetim kayıtlarının ve olay araştırmasının bozulmasına yol açar  
- **Vekil Sunucu Üzerinden Sızdırma**: Kötü niyetli aktörlerin sunucuları yetkisiz veri erişimi için vekil olarak kullanmasına imkan tanır  
- **Güven Sınırı İhlalleri**: Alt hizmetlerin token kaynağına ilişkin güven varsayımlarını bozar  
- **Yanal Hareketlilik**: Birden fazla hizmetteki ele geçirilmiş tokenlar daha geniş saldırı yayılımına olanak tanır

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

### **Güvenli Token Yönetim Modelleri**

**En İyi Uygulamalar:**
- **Kısa Ömürlü Tokenlar**: Sık token yenilenmesiyle maruz kalma süresini minimize et  
- **Anlık İhtiyaç Doğrultusunda Token Verme**: Tokenları sadece belirli işlemler için gerektiğinde oluştur  
- **Güvenli Depolama**: Donanım güvenlik modülleri (HSM) veya güvenli anahtar kasaları kullan  
- **Token Bağlama**: Mümkün olan yerlerde tokenları belirli istemcilere, oturumlara veya işlemlere bağla  
- **İzleme ve Uyarı**: Token kötüye kullanımı veya yetkisiz erişim modellerinin gerçek zamanlı tespiti

## 3. **Oturum Güvenliği Kontrolleri**

### **Oturum Kaçırma Önleme**

**Adreslenen Saldırı Yöntemleri:**
- **Oturum Kaçırma İstemci Uyarısı Enjeksiyonu**: Paylaşılan oturum durumuna kötü amaçlı olayların enjekte edilmesi  
- **Oturum Taklidi**: Çalınan oturum kimliklerinin kimlik doğrulamayı atlama amaçlı yetkisiz kullanımı  
- **Devam Ettirilebilir Akış Saldırıları**: Sunucu tarafından gönderilen olayların kötü amaçlı içerik enjekte edilerek yeniden başlatılması

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
- **HTTPS Zorunluluğu**: Tüm oturum iletişimi TLS 1.3 üzerinden  
- **Güvenli Çerez Özellikleri**: HttpOnly, Secure, SameSite=Strict  
- **Sertifika Pinleme**: Ortadaki adam saldırılarını önlemek için kritik bağlantılarda

### **Durumlu ve Durumsuz Yaklaşımlar**

**Durumlu Uygulamalar İçin:**
- Paylaşılan oturum durumu enjeksiyon saldırılarına karşı ek koruma gerektirir  
- Kuyruk temelli oturum yönetiminde bütünlük doğrulaması gerekir  
- Birden çok sunucu örneği güvenli oturum durumu senkronizasyonu ister

**Durumsuz Uygulamalar İçin:**
- JWT veya benzeri token tabanlı oturum yönetimi  
- Oturum durumunun kriptografik bütünlük doğrulaması  
- Saldırı yüzeyi az ama sağlam token doğrulaması gerektirir

## 4. **Yapay Zeka-Özel Güvenlik Kontrolleri**

**Adreslenen OWASP MCP Riskleri**:  
- [MCP06 - Bağlamsal Yük ile İstemci Enjeksiyonu](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Araç Zehirlenmesi](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Komut Enjeksiyonu ve Çalıştırma](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **İstemci Enjeksiyon Koruması**

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
- **Girdi Temizleme**: Tüm kullanıcı girdilerinin kapsamlı doğrulaması ve filtrelenmesi  
- **İçerik Sınırı Tanımı**: Sistem talimatları ile kullanıcı içerikleri arasında net ayrım  
- **Talimat Hiyerarşisi**: Çelişen talimatlar için uygun öncelik kuralları  
- **Çıktı İzleme**: Potansiyel zararlı veya manipüle edilmiş çıktıların tespiti

### **Araç Zehirlenmesi Önleme**

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
- **Onay Akışları**: Araç değişiklikleri için açık kullanıcı onayı  
- **Geri Alma Yeteneği**: Önceki araç sürümlerine geri dönme imkanı  
- **Değişiklik Denetimi**: Araç tanım değişikliklerinin tam geçmişi  
- **Risk Değerlendirmesi**: Araç güvenlik duruşunun otomatik değerlendirilmesi

## 5. **Confused Deputy Saldırısı Önleme**

### **OAuth Vekil Sunucu Güvenliği**

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
- **Kullanıcı Onayı Doğrulaması**: Dinamik istemci kaydı için asla onay ekranları atlanmamalı  
- **Yönlendirme URI Doğrulaması**: Yönlendirme hedeflerinin sıkı beyaz liste doğrulaması  
- **Yetkilendirme Kodu Koruması**: Tek kullanımlık ve kısa ömürlü kodlar  
- **İstemci Kimlik Doğrulaması**: İstemci kimlik bilgileri ve meta verilerinin sağlam doğrulanması

## 6. **Araç Çalıştırma Güvenliği**

### **Sandboxing ve İzolasyon**

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
- **Ayrı İşlem Bağlamları**: Her araç çalıştırma izole edilmiş işlem alanında  
- **İşlemler Arası İletişim (IPC)**: Doğrulama ile güvenli IPC mekanizmaları  
- **İşlem İzleme**: Çalışma zamanı davranış analizi ve anomali tespiti  
- **Kaynak Kısıtlamaları**: CPU, bellek ve G/Ç işlemlerinde katı sınırlar

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

**Adreslenen OWASP MCP Riski**: [MCP04 - Tedarik Zinciri Saldırıları](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

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
- **Bağımlılık Sağlığı İzleme**: Tüm bağımlılıkların sürekli güvenlik değerlendirmesi  
- **Tehdit İstihbaratı Entegrasyonu**: Ortaya çıkan tedarik zinciri tehditlerine gerçek zamanlı güncellemeler  
- **Davranış Analizi**: Dış bileşenlerdeki olağan dışı davranışların tespiti  
- **Otomatik Müdahale**: Ele geçirilmiş bileşenlerin hemen izole edilmesi

## 8. **İzleme ve Tespit Kontrolleri**

**Adreslenen OWASP MCP Riski**: [MCP08 - Denetim ve Telemetri Eksikliği](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Güvenlik Bilgi ve Olay Yönetimi (SIEM)**

**Kapsamlı Günlükleme Stratejisi:**  
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
- **Kullanıcı Davranış Analitiği (UBA)**: Olağan dışı kullanıcı erişim kalıplarının tespiti  
- **Varlık Davranış Analitiği (EBA)**: MCP sunucu ve araç davranışlarının izlenmesi  
- **Makine Öğrenmeli Anomali Tespiti**: Yapay zeka destekli güvenlik tehdidi belirleme  
- **Tehdit İstihbaratı Korelasyonu**: Gözlemlenen faaliyetlerin bilinen saldırı kalıplarıyla eşleştirilmesi

## 9. **Olay Müdahalesi ve Kurtarma**

### **Otomatik Müdahale Yetkinlikleri**

**Hızlı Yanıt Eylemleri:**  
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
- **Denetim Kaydı Koruması**: Kriptografik bütünlükle değiştirilemez günlükler  
- **Delil Toplama**: İlgili güvenlik verilerinin otomatik toplanması  
- **Zaman Çizelgesi Yeniden İnşası**: Güvenlik olaylarına yol açan detaylı olay sıralaması  
- **Etkilenme Değerlendirmesi**: İhlal kapsamı ve veri sızıntısı analizi

## **Temel Güvenlik Mimari İlkeleri**

### **Derinlemesine Savunma**
- **Birden Çok Güvenlik Katmanı**: Güvenlik mimarisinde tek bir başarısızlık noktası yok  
- **Yedekli Kontroller**: Kritik fonksiyonlar için örtüşen güvenlik önlemleri  
- **Güvenli Varsayılanlar**: Sistem hataları veya saldırılar karşısında güvenli ön tanımlı durumlar

### **Sıfır Güven İlkesi**
- **Asla Güvenme, Sürekli Doğrula**: Tüm varlıkların ve isteklerin sürekli doğrulanması  
- **Asgari Ayrıcalık Prensibi**: Tüm bileşenlere azami kısıtlı erişim  
- **Mikro Segmentasyon**: İnce taneli ağ ve erişim kontrolleri

### **Sürekli Güvenlik Evrimi**
- **Tehdit Ortamına Uyum**: Gelişmekte olan tehditlere düzenli güncellemeler  
- **Güvenlik Kontrol Etkinliği**: Kontrollerin sürekli değerlendirilmesi ve iyileştirilmesi  
- **Spesifikasyon Uyumu**: Değişen MCP güvenlik standartlarına uygunluk

---

## **Uygulama Kaynakları**

### **Resmi MCP Dokümantasyonu**
- [MCP Spesifikasyonu (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Güvenlik En İyi Uygulamaları](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Yetkilendirme Spesifikasyonu](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **OWASP MCP Güvenlik Kaynakları**
- [OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/) - Azure uygulaması ile kapsamlı OWASP MCP Top 10  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Resmi OWASP MCP güvenlik riskleri  
- [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure için MCP pratik güvenlik eğitimi

### **Microsoft Güvenlik Çözümleri**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub İleri Düzey Güvenlik](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Güvenlik Standartları**
- [OAuth 2.0 Güvenlik En İyi Uygulamaları (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Büyük Dil Modelleri için OWASP Top 10](https://genai.owasp.org/)
- [NIST Siber Güvenlik Çerçevesi](https://www.nist.gov/cyberframework)

---

> **Önemli**: Bu güvenlik kontrolleri mevcut MCP spesifikasyonunu (2025-11-25) yansıtır. Standartlar hızla evrildiği için her zaman en güncel [resmi dokümantasyon](https://spec.modelcontextprotocol.io/) ile karşılaştırın.

## Sonraki Adım

- Dön: [Güvenlik Modülü Genel Bakış](./README.md)
- Devam et: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluğa özen göstersek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayın. Orijinal belge, kendi ana dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi tavsiye edilir. Bu çevirinin kullanımı sonucunda oluşabilecek herhangi bir yanlış anlama veya yanlış yorumdan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->