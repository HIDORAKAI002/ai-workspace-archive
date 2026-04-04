# MCP Güvenliği: AI Sistemleri için Kapsamlı Koruma

[![MCP Security Best Practices](../../../translated_images/tr/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Bu dersin videosunu izlemek için yukarıdaki görsele tıklayın)_

Güvenlik, AI sistemi tasarımının temelidir, bu yüzden ikinci bölümümüz olarak öncelik veriyoruz. Bu, Microsoft'un [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) kapsamındaki **Tasarımda Güvenlik** ilkesiyle uyumludur.

Model Context Protocol (MCP), yapay zekâ destekli uygulamalara güçlü yeni yetenekler getirirken, geleneksel yazılım risklerinin ötesine geçen benzersiz güvenlik zorluklarını da beraberinde getirir. MCP sistemleri, yerleşik güvenlik endişelerinin (güvenli kodlama, asgari ayrıcalık, tedarik zinciri güvenliği) yanı sıra prompt enjeksiyonu, araç zehirlenmesi, oturum kaçırma, confused deputy saldırıları, token geçiş açıklıkları ve dinamik yetenek değişikliği gibi yapay zekâya özgü yeni tehditlerle karşı karşıyadır.

Bu ders, MCP uygulamalarındaki en kritik güvenlik risklerini keşfeder—kimlik doğrulama, yetkilendirme, aşırı izinler, dolaylı prompt enjeksiyonu, oturum güvenliği, confused deputy sorunları, token yönetimi ve tedarik zinciri açıklıkları dahil olmak üzere. Bu riskleri azaltmak için uygulanabilir kontroller ve en iyi uygulamaları öğrenirken, Prompt Shields, Azure Content Safety ve GitHub Advanced Security gibi Microsoft çözümlerinden yararlanarak MCP dağıtımınızı güçlendireceksiniz.

## Öğrenme Hedefleri

Bu dersin sonunda şunları yapabileceksiniz:

- **MCP’ye Özgü Tehditleri Tanımlamak**: Prompt enjeksiyonu, araç zehirlenmesi, aşırı izinler, oturum kaçırma, confused deputy sorunları, token geçiş açıklıkları ve tedarik zinciri riskleri gibi MCP sistemlerindeki benzersiz güvenlik risklerini tanıyın
- **Güvenlik Kontrollerini Uygulamak**: Sağlam kimlik doğrulama, asgari ayrıcalık erişimi, güvenli token yönetimi, oturum güvenliği kontrolleri ve tedarik zinciri doğrulaması gibi etkili azaltımları hayata geçirin
- **Microsoft Güvenlik Çözümlerinden Yararlanmak**: MCP iş yükü koruması için Microsoft Prompt Shields, Azure Content Safety ve GitHub Advanced Security’i anlayın ve devreye alın
- **Araç Güvenliğini Doğrulamak**: Araç metadata doğrulamasının önemini, dinamik değişikliklerin izlenmesini ve dolaylı prompt enjeksiyonu saldırılarına karşı savunmayı kavrayın
- **En İyi Uygulamaları Entegre Etmek**: Yerleşik güvenlik temellerini (güvenli kodlama, sunucu sertleştirme, sıfır güven) MCP’ye özgü kontrollerle birleştirerek kapsamlı koruma sağlayın

# MCP Güvenlik Mimarisı ve Kontrolleri

Modern MCP uygulamaları, hem geleneksel yazılım güvenliğini hem de yapay zekâya özgü tehditleri ele alan katmanlı güvenlik yaklaşımları gerektirir. Hızla gelişen MCP spesifikasyonu, güvenlik kontrollerini olgunlaştırarak kurumsal güvenlik mimarileri ve yerleşik en iyi uygulamalarla daha iyi entegrasyon sağlar.

[Microsoft Digital Defense Raporu](https://aka.ms/mddr) araştırması, **rapor edilen ihlallerin %98’inin sağlam güvenlik hijyeni ile önlenebileceğini** göstermektedir. En etkili koruma stratejisi, temel güvenlik uygulamalarını MCP’ye özgü kontrollerle birleştirmektir—kanıtlanmış temel güvenlik tedbirleri genel riskleri azaltmada en yüksek etkiye sahiptir.

## Mevcut Güvenlik Manzarası

> **Not:** Bu bilgiler **5 Şubat 2026** tarihli MCP güvenlik standartlarını, **MCP Specification 2025-11-25** ile uyumlu olarak yansıtmaktadır. MCP protokolü hızla gelişmeye devam etmekte olup, gelecekteki uygulamalar yeni kimlik doğrulama desenleri ve gelişmiş kontroller içerebilir. Her zaman mevcut [MCP Specification](https://spec.modelcontextprotocol.io/), [MCP GitHub deposu](https://github.com/modelcontextprotocol) ve [güvenlik en iyi uygulamaları dokümantasyonu](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) için en güncel rehberliğe başvurunuz.

## 🏔️ MCP Güvenlik Zirvesi Atölyesi (Sherpa)

**Uygulamalı güvenlik eğitimi** için, MCP sunucularını Microsoft Azure’da güvence altına alma konusunda kapsamlı rehberli bir keşif olan **MCP Güvenlik Zirvesi Atölyesi**ni (Sherpa) şiddetle tavsiye ediyoruz.

### Atölye Genel Bakış

[MCP Güvenlik Zirvesi Atölyesi](https://azure-samples.github.io/sherpa/) kanıtlanmış "güvenlik açığı → istismar → düzeltme → doğrulama" metodolojisiyle pratik ve uygulanabilir güvenlik eğitimi sunar. Şunları yapacaksınız:

- **Hata Bulma Yoluyla Öğrenin**: Bilinçli olarak güvensiz sunuculara saldırarak zafiyetleri deneyimleyin
- **Azure Yerel Güvenliğini Kullanın**: Azure Entra ID, Key Vault, API Yönetimi ve AI Content Safety çözümlerinden faydalanın
- **Derinlemesine Savunmayı Takip Edin**: Kapsamlı güvenlik katmanları oluşturan kamp çalışmalarından geçin
- **OWASP Standartlarını Kullanın**: Tüm teknikler [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)'e uygundur
- **Çalışan Kod Alın**: Çalışan, test edilmiş uygulamalarla ayrılın

### İrtifa Rotası

| Kamp | Odak Noktası | Kapsanan OWASP Riskleri |
|------|--------------|-------------------------|
| **Base Camp** | MCP temelleri & kimlik doğrulama zafiyetleri | MCP01, MCP07 |
| **Kamp 1: Kimlik** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Kamp 2: Geçit** | API Yönetimi, Özel Uç Noktalar, yönetişim | MCP02, MCP07, MCP09 |
| **Kamp 3: Giriş/Çıkış Güvenliği** | Prompt enjeksiyonu, Kişisel Verilerin Korunması, içerik güvenliği | MCP03, MCP05, MCP06 |
| **Kamp 4: İzleme** | Log Analytics, panolar, tehdit algılama | MCP08 |
| **Zirve** | Red Team / Blue Team entegrasyon testi | Tümü |

**Başlayın**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP İlk 10 Güvenlik Riski

[OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) MCP uygulamalarında en kritik on güvenlik riskini ayrıntılarıyla anlatır:

| Risk | Açıklama | Azure ile Azaltma |
|------|----------|-------------------|
| **MCP01** | Token Yanlış Yönetimi & Gizli Bilgi Sızıntısı | Azure Key Vault, Managed Identity |
| **MCP02** | Scope Sızması Yoluyla Ayrıcalık Yükseltme | RBAC, Koşullu Erişim |
| **MCP03** | Araç Zehirlenmesi | Araç doğrulama, bütünlük denetimi |
| **MCP04** | Tedarik Zinciri Saldırıları | GitHub Advanced Security, bağımlılık taraması |
| **MCP05** | Komut Enjeksiyonu & Yürütme | Girdi doğrulama, sandbox kullanımı |
| **MCP06** | Bağlamsal Yükler Yoluyla Prompt Enjeksiyonu | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Yetersiz Kimlik Doğrulama & Yetkilendirme | Azure Entra ID, PKCE ile OAuth 2.1 |
| **MCP08** | Denetim & Telemetri Eksikliği | Azure Monitor, Application Insights |
| **MCP09** | Gölgeli MCP Sunucuları | API Merkezi yönetişimi, ağ yalıtımı |
| **MCP10** | Bağlam Enjeksiyonu & Aşırı Paylaşım | Veri sınıflandırması, asgari maruz kalma |

### MCP Kimlik Doğrulama Gelişimi

MCP spesifikasyonu kimlik doğrulama ve yetkilendirme yaklaşımında önemli gelişmeler göstermiştir:

- **Orijinal Yaklaşım**: Erken spesifikasyonlarda, geliştiricilerin özel kimlik doğrulama sunucuları uygulaması gerekiyordu; MCP sunucuları ise kullanıcı kimlik doğrulamasını doğrudan yöneten OAuth 2.0 Yetkilendirme Sunucuları olarak görev yapıyordu
- **Mevcut Standart (2025-11-25)**: Güncellenen spesifikasyon, MCP sunucularının kimlik doğrulamayı Microsoft Entra ID gibi harici kimlik sağlayıcılarına devretmesine izin vererek güvenlik duruşunu iyileştirir ve uygulama karmaşıklığını azaltır
- **Taşıma Katmanı Güvenliği**: Hem yerel (STDIO) hem de uzak (Streamable HTTP) bağlantılar için uygun kimlik doğrulama desenleriyle güvenli taşıma mekanizmalarına gelişmiş destek

## Kimlik Doğrulama & Yetkilendirme Güvenliği

### Mevcut Güvenlik Zorlukları

Modern MCP uygulamaları birkaç kimlik doğrulama ve yetkilendirme zorluğuyla karşılaşmaktadır:

### Riskler & Tehdit Vektörleri

- **Yanlış Yapılandırılmış Yetkilendirme Mantığı**: MCP sunucularındaki hatalı yetkilendirme uygulamaları hassas verilerin açığa çıkmasına ve erişim kontrollerinin yanlış uygulanmasına neden olabilir
- **OAuth Token Sömürüsü**: Yerel MCP sunucu token hırsızlığı, saldırganların sunucu kimliğine bürünmesine ve aşağı hizmetlere erişmesine olanak tanır
- **Token Geçiş Açıkları**: Yanlış token işleme güvenlik kontrollerinin atlanmasına ve hesap verebilirlik boşluklarına yol açar
- **Aşırı İzinler**: Fazla ayrıcalıklı MCP sunucuları asgari ayrıcalık ilkelerini ihlal eder ve saldırı yüzeyini genişletir

#### Token Geçişi: Kritik Bir Anti-Desen

Mevcut MCP yetkilendirme spesifikasyonunda **token geçişi açıkça yasaktır** çünkü ciddi güvenlik sonuçları doğurur:

##### Güvenlik Kontrolü Atlatma  
- MCP sunucuları ve aşağı API’ler, doğru token doğrulamaya dayalı kritik güvenlik kontrolleri uygular (oran sınırlama, istek doğrulama, trafik izleme)  
- İstemciden doğrudan API token kullanımı, bu zorunlu korumaları atlar ve güvenlik mimarisini zedeler

##### Hesap Verebilirlik & Denetim Sorunları  
- MCP sunucuları, yukarı akış tarafından verilen token kullanan istemciler arasında ayrım yapamaz, denetim kayıtlarını bozar  
- Aşağı kaynak sunucu günlükleri, gerçek MCP sunucu aracılığına değil, yanıltıcı istek kaynaklarına işaret eder  
- Olay inceleme ve uyum denetimi önemli ölçüde zorlaşır

##### Veri Kaçırma Riskleri  
- Doğrulanmayan token talepleri, kötü niyetli aktörlerin çalıntı tokenlerle MCP sunucularını veri kaçırma aracı olarak kullanmasına izin verir  
- Güven sınırı ihlalleri yetkisiz erişim kalıplarına yol açar

##### Çok Hizmetli Saldırı Vektörleri  
- Birden fazla servis tarafından kabul edilen ele geçirilmiş tokenlerle bağlı sistemler arasında yatay hareketlilik sağlanır  
- Token kökeni doğrulanamadığında servisler arasındaki güven varsayımları ihlal edilir

### Güvenlik Kontrolleri & Azaltımlar

**Kritik Güvenlik Gereksinimleri:**

> **ZORUNLU:** MCP sunucuları **MCP sunucusu için açıkça verilmemiş tokenları asla kabul ETMEMELİDİR**

#### Kimlik Doğrulama & Yetkilendirme Kontrolleri

- **Titiz Yetkilendirme İncelemesi**: MCP sunucu yetkilendirme mantığının kapsamlı denetimini yaparak sadece hedeflenen kullanıcıların ve istemcilerin hassas kaynaklara erişmesini sağlayın  
  - **Uygulama Kılavuzu**: [Azure API Management ile MCP Sunucuları için Kimlik Doğrulama Geçidi](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Kimlik Entegrasyonu**: [MCP Sunucu Kimlik Doğrulamasında Microsoft Entra ID Kullanımı](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Güvenli Token Yönetimi**: [Microsoft’un token doğrulama ve yaşam döngüsü en iyi uygulamalarını](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) uygulayın  
  - Token audience claims’in MCP sunucu kimliğiyle eşleştiğini doğrulayın  
  - Uygun token döndürme ve sona erme politikaları tanımlayın  
  - Token tekrar saldırılarını ve yetkisiz kullanımı engelleyin

- **Korumalı Token Depolama**: Hem RAM’de hem aktarımda şifreleme ile token depolamasını güvence altına alın  
  - **En İyi Uygulamalar**: [Güvenli Token Depolama ve Şifreleme Kılavuzları](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Erişim Kontrolü Uygulaması

- **Asgari Ayrıcalık İlkesi**: MCP sunucularına yalnızca gerekli olan minimum izinleri verin  
  - Ayrıcalık creep’ini önlemek için düzenli izin incelemeleri ve güncellemeleri yapın  
  - **Microsoft Belgelendirmesi**: [Güvenli Asgari Ayrıcalıklı Erişim](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rol Tabanlı Erişim Kontrolü (RBAC)**: İnce taneli rol atamaları uygulayın  
  - Rolleri belirli kaynaklar ve işlemlerle sıkı kapsamda tanımlayın  
  - Saldırı yüzeyini genişleten geniş veya gereksiz izinlerden kaçının

- **Sürekli İzin İzleme**: Sürekli erişim denetimi ve izleme uygulayın  
  - İzin kullanım desenlerini anormallikler için inceleyin  
  - Aşırı veya kullanılmayan ayrıcalıkları hızla giderin

## Yapay Zekâya Özgü Güvenlik Tehditleri

### Prompt Enjeksiyonu & Araç Manipülasyonu Saldırıları

Modern MCP uygulamaları, geleneksel güvenlik önlemlerinin tamamen ele alamadığı sofistike yapay zekâya özgü saldırı vektörleriyle karşı karşıyadır:

#### **Dolaylı Prompt Enjeksiyonu (Alanlar Arası Prompt Enjeksiyonu)**

**Dolaylı Prompt Enjeksiyonu**, MCP destekli AI sistemlerindeki en kritik açıklıklardan biridir. Saldırganlar, yapay zekâ sistemlerinin meşru komut olarak işlediği dış içeriklere—belgeler, web sayfaları, e-postalar veya veri kaynaklarına—zararlı talimatlar gizler.

**Saldırı Senaryoları:**  
- **Belge Tabanlı Enjeksiyon:** İşlenen belgelerde gizlenen kötü niyetli talimatlar yapay zekânın istenmeyen eylemlerini tetikler  
- **Web İçeriği Sömürüsü:** Scrape edilen, gömülü promptlar içeren tehlikeli web sayfaları AI davranışını manipüle eder  
- **E-posta Kaynaklı Saldırılar:** AI yardımcılarının bilgi sızdırmasına veya yetkisiz işlem yapmasına yol açan e-postalardaki kötü amaçlı promptlar  
- **Veri Kaynağı Kontaminasyonu:** Kompromize veritabanları veya API’ler AI sistemlerine kirli içerik sunar

**Gerçek Dünya Etkisi:** Bu saldırılar, veri sızıntısı, gizlilik ihlalleri, zararlı içerik üretimi ve kullanıcı etkileşimlerinin manipülasyonu ile sonuçlanabilir. Ayrıntılı analiz için bkz. [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/tr/prompt-injection.ed9fbfde297ca877.webp)

#### **Araç Zehirlenme Saldırıları**

**Araç Zehirlenmesi**, MCP araçlarını tanımlayan metadata üzerinde hedef alır; LLM’lerin araç açıklamalarını ve parametrelerini yürütme kararlarında yorumlama yöntemini suistimal eder.

**Saldırı Mekanizmaları:**  
- **Metadata Manipülasyonu:** Saldırganlar, araç tanımlamalarına, parametre tanımlarına veya kullanım örneklerine kötü amaçlı talimatlar enjekte eder  
- **Görünmez Talimatlar:** İnsan kullanıcılar tarafından görülmeyen fakat AI modellerince işlenen gizli promptlar  
- **Dinamik Araç Değişikliği ("Rug Pulls")**: Kullanıcı onayıyla kabul edilen araçlar, sonradan kötü niyetli eylemler için değiştirilir  
- **Parametre Enjeksiyonu:** Model davranışını etkileyen kötü amaçlı içerik araç parametre şemalarına yerleştirilir

**Barındırılan Sunucu Riskleri:** Uzaktan MCP sunucuları, araç tanımlarının kullanıcı onayından sonra güncellenebilmesi nedeniyle, güvenli kabul edilen araçların kötü amaçlı hale gelmesi senaryoları oluşturur. Detaylı analiz için bkz. [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/tr/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ek Yapay Zekâ Saldırı Vektörleri**

- **Alanlar Arası Prompt Enjeksiyonu (XPIA)**: Birden fazla alandan gelen içerik kullanılarak güvenlik kontrollerini aşan karmaşık saldırılar
- **Dinamik Yetenek Değişikliği**: Başlangıçtaki güvenlik değerlendirmelerini aşan, araç yeteneklerindeki gerçek zamanlı değişiklikler  
- **Bağlam Penceresi Zehirlenmesi**: Kötü niyetli talimatları gizlemek için büyük bağlam pencerelerini manipüle eden saldırılar  
- **Model Karışıklığı Saldırıları**: Model sınırlamalarını kötüye kullanarak öngörülemeyen veya güvensiz davranışlar oluşturmak  


### Yapay Zeka Güvenlik Risk Etkisi

**Yüksek Etkili Sonuçlar:**  
- **Veri Çıkarımı**: Yetkisiz erişim ve hassas kurumsal ya da kişisel verilerin çalınması  
- **Gizlilik İhlalleri**: Kişisel olarak tanımlanabilir bilgilerin (PII) ve gizli iş verilerinin açığa çıkması  
- **Sistem Manipülasyonu**: Kritik sistemlerde ve iş akışlarında istenmeyen değişiklikler  
- **Kimlik Bilgisi Hırsızlığı**: Kimlik doğrulama jetonlarının ve hizmet kimlik bilgilerinin ele geçirilmesi  
- **Yanal Hareket**: Ele geçirilmiş yapay zeka sistemlerinin daha geniş ağ saldırıları için sıçrama noktası olarak kullanılması  

### Microsoft Yapay Zeka Güvenlik Çözümleri

#### **Yapay Zeka İstem Kalkanları: Enjeksiyon Saldırılarına Karşı Gelişmiş Koruma**

Microsoft **AI Prompt Shields**, çoklu güvenlik katmanları aracılığıyla hem doğrudan hem de dolaylı istem enjeksiyon saldırılarına karşı kapsamlı savunma sağlar:

##### **Temel Koruma Mekanizmaları:**

1. **Gelişmiş Algılama ve Filtreleme**  
   - Makine öğrenimi algoritmaları ve NLP teknikleri dış içerikteki kötü niyetli talimatları tespit eder  
   - Belgeler, web sayfaları, e-postalar ve veri kaynaklarının gömülü tehditler için gerçek zamanlı analizi  
   - Meşru ile kötü niyetli istem kalıplarını bağlamsal olarak anlama  

2. **Öne Çıkarma Teknikleri**  
   - Güvenilir sistem talimatları ile potansiyel olarak tehlikeye girmiş dış girdiler arasında ayrım yapar  
   - Modelin alaka düzeyini artırırken kötü niyetli içeriği izole eden metin dönüştürme yöntemleri  
   - Yapay zeka sistemlerinin doğru talimat hiyerarşisini sürdürmesine ve enjekte edilmiş komutları görmezden gelmesine yardımcı olur  

3. **Ayırıcı ve Veri İşaretleme Sistemleri**  
   - Güvenilir sistem mesajları ile dış giriş metni arasındaki sınırların açık tanımı  
   - Güvenilir ve güvensiz veri kaynakları arasındaki sınırları vurgulayan özel işaretleyiciler  
   - Talimat karışıklığını ve yetkisiz komut yürütmeyi önler  

4. **Sürekli Tehdit İstihbaratı**  
   - Microsoft, gelişen saldırı kalıplarını sürekli izler ve savunmaları günceller  
   - Yeni enjeksiyon teknikleri ve saldırı vektörleri için proaktif tehdit avcılığı  
   - Evrilen tehditlere karşı etkinliği sürdürmek için düzenli güvenlik modeli güncellemeleri  

5. **Azure İçerik Güvenliği Entegrasyonu**  
   - Kapsamlı Azure AI İçerik Güvenliği paketi parçası  
   - Jailbreak denemeleri, zararlı içerik ve güvenlik politikası ihlalleri için ek algılama  
   - Yapay zeka uygulama bileşenleri arasında birleşik güvenlik kontrolleri  

**Uygulama Kaynakları**: [Microsoft Prompt Shields Belgeleri](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/tr/prompt-shield.ff5b95be76e9c78c.webp)


## Gelişmiş MCP Güvenlik Tehditleri

### Oturum Kaçırma Zafiyetleri

**Oturum kaçırma**, durum tabanlı MCP uygulamalarında kritik bir saldırı vektörünü temsil eder; burada yetkisiz taraflar meşru oturum kimlik bilgilerini ele geçirip kötüye kullanarak istemci taklidi yapar ve yetkisiz işlemler gerçekleştirir.

#### **Saldırı Senaryoları ve Riskler**

- **Oturum Kaçırma İstem Enjeksiyonu**: Çalınmış oturum kimlik bilgilerine sahip saldırganlar, oturum durumunu paylaşan sunuculara kötü amaçlı olaylar enjekte ederek zararlı eylemleri tetikleyebilir veya hassas verilere erişebilir  
- **Doğrudan Taklit**: Çalınan oturum kimlik bilgileri, kimlik doğrulamayı atlayarak saldırganların meşru kullanıcı gibi MCP sunucularını doğrudan çağırmasına olanak tanır  
- **Ele Geçirilmiş Devam Ettirilebilir Akışlar**: Saldırganlar istekleri erken sonlandırarak meşru istemcilerin potansiyel olarak kötü niyetli içerikle devam etmesine neden olabilir  

#### **Oturum Yönetimi için Güvenlik Kontrolleri**

**Kritik Gereksinimler:**  
- **Yetkilendirme Doğrulaması**: Yetkilendirme uygulayan MCP sunucuları TÜM gelen istekleri doğrulamalı ve kimlik doğrulama için oturumlara güvenmemelidir  
- **Güvenli Oturum Oluşturma**: Kriptografik olarak güvenli, belirlenemez oturum kimlikleri güvenli rastgele sayı üreteçleriyle oluşturulmalıdır  
- **Kullanıcıya Özel Bağlama**: Oturum kimlikleri, `<kullanıcı_id>:<oturum_id>` gibi formatlarda kullanıcıya özel bilgilerle bağlanmalı, kullanıcılar arası oturum suistimalini önlemelidir  
- **Oturum Yaşam Döngüsü Yönetimi**: Doğru sona erdirme, döndürme ve geçersiz kılma uygulamalarını içermelidir  
- **Taşıma Güvenliği**: Oturum kimliği yakalamalarını önlemek için tüm iletişim HTTPS ile zorunludur  

### Karışık Vekil Problemi

**Karışık vekil problemi**, MCP sunucularının istemciler ile üçüncü taraf hizmetler arasında kimlik doğrulama vekili olarak hareket etmesi sırasında oluşur ve statik istemci kimliklerinin kötüye kullanımıyla yetkilendirme atlamaları ortaya çıkabilir.

#### **Saldırı Mekanikleri ve Riskler**

- **Çerez Tabanlı Onay Atlaması**: Önceki kullanıcı kimlik doğrulaması, saldırganların özel yetkilendirme isteklerinde hazırlanmış yönlendirme URI’leri ile kötüye kullandığı onay çerezleri oluşturur  
- **Yetkilendirme Kodu Hırsızlığı**: Mevcut onay çerezleri yetkilendirme sunucularının onay ekranlarını atlayarak kodları saldırgan kontrolündeki uç noktalara yönlendirmesine neden olabilir  
- **Yetkisiz API Erişimi**: Çalınan yetkilendirme kodları açık onay olmadan token değişimi ve kullanıcı taklidine imkan sağlar  

#### **Azaltma Stratejileri**

**Zorunlu Kontroller:**  
- **Açık Onay Gereksinimi**: Statik istemci kimlikleri kullanan MCP vekil sunucuları, dinamik olarak kayıtlı her istemci için kullanıcı onayı almalıdır  
- **OAuth 2.1 Güvenlik Uygulaması**: Tüm yetkilendirme isteklerinde PKCE (Proof Key for Code Exchange) dahil güncel OAuth güvenlik uygulamaları izlenmelidir  
- **Sıkı İstemci Doğrulaması**: Yönlendirme URI’leri ve istemci kimlikleri kötüye kullanımını önlemek için kapsamlı doğrulama uygulanmalıdır  

### Token Aktarım Zafiyetleri

**Token aktarımı**, MCP sunucularının istemci tokenlarını uygun doğrulama yapmadan kabul edip alt API'lere ilettiği ve MCP yetkilendirme spesifikasyonlarını ihlal ettiği açık anti-patenttir.

#### **Güvenlik Etkileri**

- **Kontrol Aşımı**: Doğrudan istemci-API token kullanımı kritik hız limitleme, doğrulama ve izleme kontrollerini atlar  
- **Denetim İzleme Bozulması**: Yukarı akışta verilen tokenlar istemci tanımlamasını imkansız hale getirerek olay inceleme kabiliyetini bozar  
- **Proxy Tabanlı Veri Çıkarması**: Doğrulanmamış tokenlar saldırganların sunucuları yetkisiz veri erişimi için proxy olarak kullanmasına olanak tanır  
- **Güven Sınırı İhlalleri**: Token kaynaklarının doğrulanamaması alt hizmetlerin güven varsayımlarını ihlal edebilir  
- **Çok Hizmetli Saldırı Yayılımı**: Birden çok hizmette kabul edilen ele geçirilmiş tokenlar yanal hareketi kolaylaştırır  

#### **Gereken Güvenlik Kontrolleri**

**Tartışmasız Gereksinimler:**  
- **Token Doğrulaması**: MCP sunucuları yalnızca açıkça kendisine verilen tokenları kabul etmelidir, aksi tokenlar reddedilmelidir  
- **Hedef Kitle (Audience) Doğrulaması**: Token hedef kitle talepleri MCP sunucusunun kimliği ile eşleşmelidir  
- **Uygun Token Yaşam Döngüsü**: Kısa ömürlü erişim tokenları ve güvenli döndürme uygulamaları benimsenmelidir  


## Yapay Zeka Sistemleri için Tedarik Zinciri Güvenliği

Tedarik zinciri güvenliği geleneksel yazılım bağımlılıklarının ötesine geçerek tüm yapay zeka ekosistemini kapsar. Modern MCP uygulamaları, sistem bütünlüğünü tehlikeye atabilecek potansiyel zafiyetler içeren tüm yapay zeka bileşenlerini titizlikle doğrulamalı ve izlemelidir.

### Genişletilmiş Yapay Zeka Tedarik Zinciri Bileşenleri

**Geleneksel Yazılım Bağımlılıkları:**  
- Açık kaynak kütüphaneler ve çerçeveler  
- Konteyner görüntüleri ve temel sistemler  
- Geliştirme araçları ve derleme hatları  
- Altyapı bileşenleri ve hizmetler  

**Yapay Zeka Özel Tedarik Zinciri Öğeleri:**  
- **Temel Modeller**: Çeşitli sağlayıcılardan önceden eğitilmiş modeller, köken doğrulaması gerektirir  
- **Gömme Hizmetleri**: Dışsal vektörleştirme ve anlamsal arama hizmetleri  
- **Bağlam Sağlayıcıları**: Veri kaynakları, bilgi tabanları ve belge depoları  
- **Üçüncü Parti API’ler**: Dış yapay zeka servisleri, ML hatları ve veri işleme uç noktaları  
- **Model Sanatları**: Ağırlıklar, konfigürasyonlar ve ince ayar yapılmış model varyantları  
- **Eğitim Veri Kaynakları**: Model eğitimi ve ince ayar için kullanılan veri setleri  

### Kapsamlı Tedarik Zinciri Güvenlik Stratejisi

#### **Bileşen Doğrulama ve Güven**  
- **Köken Doğrulama**: Tüm yapay zeka bileşenlerinin kaynağı, lisansı ve bütünlüğü entegrasyondan önce doğrulanmalı  
- **Güvenlik Değerlendirmesi**: Modeller, veri kaynakları ve yapay zeka hizmetleri için zafiyet taramaları ve güvenlik incelemeleri yapılmalı  
- **İtibar Analizi**: Yapay zeka hizmet sağlayıcılarının güvenlik geçmişi ve uygulamaları değerlendirilmelidir  
- **Uyumluluk Doğrulaması**: Tüm bileşenler kurumsal güvenlik ve düzenleyici gereksinimleri karşılamalıdır  

#### **Güvenli Dağıtım Hatları**  
- **Otomatik CI/CD Güvenliği**: Otomatik dağıtım hatları boyunca güvenlik taramaları entegre edilmelidir  
- **Sanat Eseri Bütünlüğü**: Dağıtılan tüm yapıların (kod, modeller, yapılandırmalar) kriptografik doğrulaması yapılmalıdır  
- **Aşamalı Dağıtım**: Her aşamada güvenlik doğrulamasıyla ilerleyen dağıtım stratejileri kullanılmalıdır  
- **Güvenilir Sanat Eseri Depoları**: Yalnızca doğrulanmış ve güvenli depo ve kayıtlı yerlerden dağıtım yapılmalıdır  

#### **Sürekli İzleme ve Yanıt**  
- **Bağımlılık Taraması**: Tüm yazılım ve yapay zeka bileşeni bağımlılıkları için sürekli zafiyet izleme  
- **Model İzleme**: Model davranışı, performans kayması ve güvenlik anomalilerinin sürekli değerlendirilmesi  
- **Hizmet Sağlığı Takibi**: Dış yapay zeka hizmetlerinin kullanılabilirlik, güvenlik olayları ve politika değişikliklerinin izlenmesi  
- **Tehdit İstihbaratı Entegrasyonu**: Yapay zeka ve ML güvenlik risklerine özgü tehdit beslemelerinin dahil edilmesi  

#### **Erişim Kontrolü ve Asgari Ayrıcalık**  
- **Bileşen Seviyesi İzinler**: Modeller, veriler ve hizmetlere iş gerekçesine dayalı sınırlı erişim  
- **Hizmet Hesabı Yönetimi**: Minimum gerekli izinlere sahip özel hizmet hesaplarının uygulanması  
- **Ağ Segmentasyonu**: Yapay zeka bileşenlerinin izole edilmesi ve hizmetler arası ağ erişim sınırlandırması  
- **API Geçidi Kontrolleri**: Dış yapay zeka hizmetlerine erişimi kontrol ve izleme için merkezi API geçitlerinin kullanımı  

#### **Olay Müdahalesi ve Kurtarma**  
- **Hızlı Müdahale Prosedürleri**: Ele geçirilen yapay zeka bileşenlerinin yamalanması veya değiştirilmesi için tanımlı süreçler  
- **Kimlik Bilgisi Döndürme**: Sırlar, API anahtarları ve hizmet kimlik bilgilerinin otomatik döndürülmesi  
- **Geri Alma Kabiliyetleri**: Yapay zeka bileşenlerinin önceki bilinen iyi sürümlerine hızlı dönüş yeteneği  
- **Tedarik Zinciri İhlali Kurtarma**: Yukarı akış yapay zeka hizmeti ihlallerine özel müdahale prosedürleri  

### Microsoft Güvenlik Araçları ve Entegrasyon

**GitHub Advanced Security**, şu kapsamlı tedarik zinciri korumasını sunar:  
- **Gizli Bilgi Taraması**: Depolarda kimlik bilgileri, API anahtarları ve tokenların otomatik tespiti  
- **Bağımlılık Taraması**: Açık kaynak bağımlılıkları ve kütüphaneler için zafiyet değerlendirmesi  
- **CodeQL Analizi**: Güvenlik açıkları ve kodlama sorunları için statik kod analizi  
- **Tedarik Zinciri İçgörüleri**: Bağımlılık sağlık durumu ve güvenlik görünürlüğü  

**Azure DevOps & Azure Repos Entegrasyonu:**  
- Microsoft geliştirme platformlarında sorunsuz güvenlik taraması entegrasyonu  
- Yapay zeka iş yükleri için Azure Pipelines’da otomatik güvenlik kontrolleri  
- Güvenli yapay zeka bileşen dağıtımı için politika uygulaması  

**Microsoft İç Uygulamaları:**  
Microsoft, tüm ürünlerinde kapsamlı tedarik zinciri güvenlik uygulamaları uygular. Kanıtlanmış yaklaşımları öğrenmek için [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/) sayfasını inceleyin.  


## Temel Güvenlik En İyi Uygulamaları

MCP uygulamaları, kuruluşunuzun mevcut güvenlik duruşunu devralır ve üzerine inşa eder. Temel güvenlik uygulamalarını güçlendirmek, yapay zeka sistemleri ve MCP dağıtımlarının genel güvenliğini önemli ölçüde artırır.

### Temel Güvenlik Temelleri

#### **Güvenli Geliştirme Uygulamaları**  
- **OWASP Uyumu**: [OWASP Top 10](https://owasp.org/www-project-top-ten/) web uygulama zafiyetlerine karşı koruma  
- **Yapay Zeka Özel Koruma**: [LLM’ler için OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559) kontrollerinin uygulanması  
- **Güvenli Gizli Bilgi Yönetimi**: Tokenlar, API anahtarları ve hassas konfigürasyon verileri için özel kasalar kullanımı  
- **Uçtan Uca Şifreleme**: Tüm uygulama bileşenleri ve veri akışları genelinde güvenli iletişim  
- **Girdi Doğrulama**: Tüm kullanıcı girdileri, API parametreleri ve veri kaynaklarının titiz doğrulaması  

#### **Altyapı Sertleştirme**  
- **Çok Faktörlü Kimlik Doğrulama**: Tüm idari ve hizmet hesapları için zorunlu MFA  
- **Yama Yönetimi**: İşletim sistemleri, çerçeveler ve bağımlılıklar için otomatik ve zamanında yamalama  
- **Kimlik Sağlayıcı Entegrasyonu**: Kurumsal kimlik sağlayıcıları (Microsoft Entra ID, Active Directory) ile merkezi kimlik yönetimi  
- **Ağ Segmentasyonu**: Lateral hareket potansiyelini sınırlamak için MCP bileşenlerinin mantıksal izolasyonu  
- **Asgari Ayrıcalık Prensibi**: Tüm sistem bileşenleri ve hesaplar için sadece gerekli minimum izinler  

#### **Güvenlik İzleme ve Algılama**  
- **Kapsamlı Kayıt Tutma**: MCP istemci-sunucu etkileşimleri dahil yapay zeka uygulama aktivitelerinin detaylı kaydı  
- **SIEM Entegrasyonu**: Anomali tespiti için merkezi güvenlik bilgi ve olay yönetimi  
- **Davranışsal Analitik**: Sistem ve kullanıcı davranışlarında olağandışı kalıpları tespit etmek için yapay zeka destekli izleme  
- **Tehdit İstihbaratı**: Dış tehdit beslemeleri ve ihlal göstergelerinin (IOC) entegrasyonu  
- **Olay Müdahalesi**: Güvenlik olaylarının tespiti, müdahalesi ve kurtarılması için iyi tanımlanmış prosedürler  

#### **Sıfır Güven Mimarisi**  
- **Hiçbir Zaman Güvenme, Her Zaman Doğrula**: Kullanıcılar, cihazlar ve ağ bağlantılarının sürekli doğrulanması  
- **Mikro Segmentasyon**: Bireysel iş yükleri ve hizmetleri izole eden ayrıntılı ağ kontrolleri  
- **Kimlik Merkezli Güvenlik**: Ağ konumu yerine doğrulanmış kimliklere dayalı güvenlik politikaları  
- **Sürekli Risk Değerlendirmesi**: Mevcut bağlama ve davranışa göre dinamik güvenlik durumu değerlendirmesi  
- **Koşullu Erişim**: Risk faktörleri, konum ve cihaz güvenine göre uyarlanabilen erişim kontrolleri  

### Kurumsal Entegrasyon Desenleri

#### **Microsoft Güvenlik Ekosistemi Entegrasyonu**  
- **Microsoft Defender for Cloud**: Kapsamlı bulut güvenlik duruşu yönetimi  
- **Azure Sentinel**: Yapay zeka iş yükü koruması için bulut yerel SIEM ve SOAR yetenekleri  
- **Microsoft Entra ID**: Koşullu erişim politikaları ile kurumsal kimlik ve erişim yönetimi  
- **Azure Key Vault**: Donanım güvenlik modülü (HSM) destekli merkezi gizli bilgi yönetimi  
- **Microsoft Purview**: Yapay zeka veri kaynakları ve iş akışları için veri yönetişimi ve uyumluluk  

#### **Uyumluluk ve Yönetişim**  
- **Düzenleyici Uyum**: MCP uygulamalarının sektör spesifik uyumluluk gereksinimlerini karşılaması (GDPR, HIPAA, SOC 2)  
- **Veri Sınıflandırması**: Yapay zeka sistemleri tarafından işlenen hassas verilerin uygun sınıflandırması ve yönetimi  
- **Denetim İzleri**: Düzenleyici uyumluluk ve adli inceleme için kapsamlı kayıtlar  
- **Gizlilik Kontrolleri**: Yapay zeka sistem mimarisinde gizlilik-tasarıma dayanma prensiplerinin uygulanması  
- **Değişiklik Yönetimi**: Yapay zeka sistem değişikliklerinin güvenlik incelemeleri için resmi süreçler  

Bu temel uygulamalar, MCP özgü güvenlik kontrollerinin etkinliğini artıran ve yapay zeka destekli uygulamalar için kapsamlı koruma sağlayan sağlam bir güvenlik zemini oluşturur.
## Önemli Güvenlik Çıkarımları

- **Katmanlı Güvenlik Yaklaşımı**: Kapsamlı koruma için temel güvenlik uygulamalarını (güvenli kodlama, en az ayrıcalık, tedarik zinciri doğrulaması, sürekli izleme) AI'ya özel kontrollerle birleştirin

- **AI'ya Özel Tehdit Ortamı**: MCP sistemleri, prompt enjeksiyonu, araç zehirlenmesi, oturum kaçırma, karışık vekil sorunları, token geçişi zafiyetleri ve aşırı izinler gibi özelleşmiş risklerle karşı karşıyadır ve bu riskler özel önlemler gerektirir

- **Kimlik Doğrulama ve Yetkilendirme Mükemmelliği**: Harici kimlik sağlayıcıları (Microsoft Entra ID) kullanarak sağlam kimlik doğrulama uygulayın, uygun token doğrulamasını zorunlu kılın ve MCP sunucunuz için açıkça verilmemiş tokenları asla kabul etmeyin

- **AI Saldırı Önleme**: Dolaylı prompt enjeksiyonu ve araç zehirlenmesi saldırılarına karşı koruma için Microsoft Prompt Shields ve Azure Content Safety’yi devreye alın, araç meta verilerini doğrulayın ve dinamik değişiklikler için izleme yapın

- **Oturum ve Taşıma Güvenliği**: Kullanıcı kimliklerine bağlı, kriptografik olarak güvenli, belirsiz oturum kimlikleri kullanın, uygun oturum yaşam döngüsü yönetimini uygulayın ve kimlik doğrulama için oturumları asla kullanmayın

- **OAuth Güvenlik En İyi Uygulamaları**: Dinamik olarak kayıtlı istemciler için açık kullanıcı onayı ile karışık vekil saldırılarını önleyin, PKCE ile düzgün OAuth 2.1 uygulaması yapın ve yönlendirme URI doğrulamasını sıkılaştırın

- **Token Güvenliği İlkeleri**: Token geçişi anti-pattern'lerinden kaçının, token hedef beyanlarını doğrulayın, kısa ömürlü tokenlar ve güvenli döndürme uygulayın, net güven sınırlarını koruyun

- **Kapsamlı Tedarik Zinciri Güvenliği**: Tüm AI ekosistemi bileşenlerini (modeller, gömüler, bağlam sağlayıcıları, harici API'ler) geleneksel yazılım bağımlılıklarıyla aynı güvenlik titizliğiyle ele alın

- **Sürekli Evrim**: Hızla gelişen MCP spesifikasyonlarını güncel tutun, güvenlik topluluğu standartlarına katkıda bulunun ve protokol olgunlaştıkça uyarlanabilir güvenlik duruşları sürdükten

- **Microsoft Güvenlik Entegrasyonu**: MCP dağıtım korumasını artırmak için Microsoft’un kapsamlı güvenlik ekosisteminden (Prompt Shields, Azure Content Safety, GitHub Gelişmiş Güvenlik, Entra ID) yararlanın

## Kapsamlı Kaynaklar

### **Resmi MCP Güvenlik Belgeleri**
- [MCP Spesifikasyonu (Güncel: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Güvenlik En İyi Uygulamaları](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Yetkilendirme Spesifikasyonu](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Deposu](https://github.com/modelcontextprotocol)

### **OWASP MCP Güvenlik Kaynakları**
- [OWASP MCP Azure Güvenlik Rehberi](https://microsoft.github.io/mcp-azure-security-guide/) - Azure uygulama rehberi dahil OWASP MCP Top 10 kapsamlı anlatımı
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Resmi OWASP MCP güvenlik riskleri
- [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure’da MCP için uygulamalı güvenlik eğitimi

### **Güvenlik Standartları ve En İyi Uygulamalar**
- [OAuth 2.0 Güvenlik En İyi Uygulamaları (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Web Uygulama Güvenliği](https://owasp.org/www-project-top-ten/)
- [Büyük Dil Modelleri için OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Dijital Savunma Raporu](https://aka.ms/mddr)

### **AI Güvenlik Araştırma ve Analizleri**
- [MCP’de Prompt Enjeksiyonu (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Araç Zehirlenme Saldırıları (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Güvenlik Araştırma Özetleri (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Güvenlik Çözümleri**
- [Microsoft Prompt Shields Belgeleri](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Servisi](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Güvenliği](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Yönetimi En İyi Uygulamaları](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Gelişmiş Güvenlik](https://github.com/security/advanced-security)

### **Uygulama Rehberleri ve Eğitimler**
- [Azure API Yönetimi MCP Kimlik Doğrulama Geçidi Olarak](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID ile MCP Sunucuları Kimlik Doğrulama](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Güvenli Token Depolama ve Şifreleme (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps ve Tedarik Zinciri Güvenliği**
- [Azure DevOps Güvenliği](https://azure.microsoft.com/products/devops)
- [Azure Repos Güvenliği](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Tedarik Zinciri Güvenliği Yolculuğu](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Ek Güvenlik Belgeleri**

Detaylı güvenlik rehberliğine bu bölümdeki uzmanlaşmış belgelerden ulaşabilirsiniz:

- **[MCP Güvenlik En İyi Uygulamaları 2025](./mcp-security-best-practices-2025.md)** - MCP uygulamaları için kapsamlı güvenlik en iyi uygulamaları
- **[Azure Content Safety Uygulaması](./azure-content-safety-implementation.md)** - Azure Content Safety entegrasyonu için pratik uygulama örnekleri  
- **[MCP Güvenlik Kontrolleri 2025](./mcp-security-controls-2025.md)** - MCP dağıtımları için en son güvenlik kontrolleri ve teknikleri
- **[MCP En İyi Uygulamalar Hızlı Referans](./mcp-best-practices.md)** - Temel MCP güvenlik uygulamaları için hızlı başvuru rehberi

### **Uygulamalı Güvenlik Eğitimi**

- **[MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/)** - Base Camp'ten Summit'e kadar ilerleyici kamplar ile Azure MCP sunucularını güvence altına almak için kapsamlı uygulamalı atölye
- **[OWASP MCP Azure Güvenlik Rehberi](https://microsoft.github.io/mcp-azure-security-guide/)** - Tüm OWASP MCP Top 10 riskleri için referans mimari ve uygulama rehberi

---

## Sonraki Bölüm

Sonraki: [Bölüm 3: Başlarken](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba gösterilmekle birlikte, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Önemli bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanılması nedeniyle ortaya çıkan herhangi bir yanlış anlama veya yanlış yorumdan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->