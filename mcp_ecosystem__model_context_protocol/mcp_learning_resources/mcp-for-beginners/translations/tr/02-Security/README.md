# MCP Güvenliği: Yapay Zeka Sistemleri için Kapsamlı Koruma

[![MCP Security Best Practices](../../../translated_images/tr/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Bu dersin videosunu izlemek için yukarıdaki görsele tıklayın)_

Güvenlik, yapay zeka sistemi tasarımında temel bir unsurdur; bu nedenle bunu ikinci bölümümüz olarak önceliklendiriyoruz. Bu, Microsoft'un [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) kapsamında yer alan **Güvenli Tasarım** (Secure by Design) ilkesine uygundur.

Model Context Protocol (MCP), yapay zeka destekli uygulamalara güçlü yeni yetenekler getirirken, geleneksel yazılım risklerinin ötesine geçen benzersiz güvenlik zorluklarını da beraberinde getirir. MCP sistemleri, köklü güvenlik endişeleri (güvenli kodlama, en az ayrıcalık, tedarik zinciri güvenliği) yanında prompt enjeksiyonu, araç zehirleme, oturum kaçırma, kafa karışıklığı saldırıları, token geçiş açıklıkları ve dinamik yetenek değişiklikleri gibi yapay zekaya özgü yeni tehditlerle karşı karşıyadır.

Bu ders, MCP uygulamalarındaki en kritik güvenlik risklerini inceleyecek—kimlik doğrulama, yetkilendirme, aşırı izinler, dolaylı prompt enjeksiyonu, oturum güvenliği, kafa karışıklığı sorunları, token yönetimi ve tedarik zinciri açıkları gibi konuları kapsıyor. Bu riskleri azaltmak için uygulanabilir kontrolleri ve en iyi uygulamaları öğrenecek, Microsoft çözümleri olan Prompt Shields, Azure Content Safety ve GitHub Advanced Security ile MCP kurulumunuzu güçlendireceksiniz.

## Öğrenme Hedefleri

Bu dersin sonunda şunları yapabileceksiniz:

- **MCP'ye Özgü Tehditleri Tanımlama**: Prompt enjeksiyonu, araç zehirleme, aşırı izinler, oturum kaçırma, kafa karışıklığı sorunları, token geçiş açıklıkları ve tedarik zinciri riskleri dahil olmak üzere MCP sistemlerindeki benzersiz güvenlik risklerini tanıyın  
- **Güvenlik Kontrollerini Uygulama**: Sağlam kimlik doğrulama, en az ayrıcalıklı erişim, güvenli token yönetimi, oturum güvenliği kontrolleri ve tedarik zinciri doğrulaması gibi etkili iyileştirmeleri hayata geçirin  
- **Microsoft Güvenlik Çözümlerini Kullanma**: MCP iş yükü koruması için Microsoft Prompt Shields, Azure Content Safety ve GitHub Advanced Security'yi anlayın ve uygulayın  
- **Araç Güvenliğini Doğrulama**: Araç meta verilerinin doğrulanmasının, dinamik değişikliklerin izlenmesinin ve dolaylı prompt enjeksiyonu saldırılarına karşı savunmanın önemini kavrayın  
- **En İyi Uygulamaları Entegre Etme**: Yerleşik güvenlik temellerini (güvenli kodlama, sunucu sertleştirme, sıfır güven) MCP'ye özgü kontrollerle birleşik olarak kapsamlı koruma sağlayın  

# MCP Güvenlik Mimarisi ve Kontrolleri

Modern MCP uygulamalarında hem geleneksel yazılım güvenliği hem de yapay zekaya özgü tehditlere yönelik katmanlı güvenlik yaklaşımları gereklidir. Hızla gelişen MCP spesifikasyonu, güvenlik kontrollerini olgunlaştırmaya devam ederek kurumsal güvenlik mimarileri ve yerleşik en iyi uygulamalarla entegrasyonu kolaylaştırmaktadır.

[Microsoft Dijital Savunma Raporu](https://aka.ms/mddr) araştırması, **rapor edilen ihlallerin %98'inin sağlam bir güvenlik hijyeni ile önlenebileceğini** göstermektedir. En etkili koruma stratejisi, temel güvenlik uygulamalarını MCP'ye özgü kontrollerle harmanlamaktır—kanıtlanmış temel güvenlik önlemleri, genel güvenlik riskini azaltmada en etkili yöntemdir.

## Mevcut Güvenlik Durumu

> **Not:** Bu bilgiler, **5 Şubat 2026** tarihindeki MCP güvenlik standartlarını yansıtmaktadır ve **MCP Spesifikasyonu 2025-11-25** ile uyumludur. MCP protokolü hızla evrilmeye devam etmekte olup, gelecekteki uygulamalarda yeni kimlik doğrulama desenleri ve geliştirilmiş kontroller sunulabilir. En güncel rehberlik için her zaman mevcut [MCP Spesifikasyonunu](https://spec.modelcontextprotocol.io/), [MCP GitHub deposunu](https://github.com/modelcontextprotocol) ve [güvenlik en iyi uygulamaları dokümantasyonunu](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) kontrol edin.

> **Geleceğe Bakış:** `2026-07-28` sürüm adayı yetkilendirmeyi daha da güçlendiriyor — istemciler yetkilendirme yanıtlarındaki `iss` parametresini doğrulamalı (RFC 9207), Dinamik İstemci Kaydı sırasında OpenID Connect `application_type` beyan etmeli ve kayıtlı kimlik bilgilerini yetkilendirme sunucusuna bağlamalı. Yetkilendirme SEP'lerinin tam listesi için bkz. [MCP’de Neler Değişiyor: 2026-07-28 Sürüm Adayı](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

## 🏔️ MCP Güvenlik Zirvesi Atölyesi (Sherpa)

Elde uygulamalı güvenlik eğitimi için, Microsoft Azure’da MCP sunucularının güvenliğini sağlamak üzere kapsamlı rehberli bir keşif olan **MCP Güvenlik Zirvesi Atölyesi**ni (Sherpa) şiddetle tavsiye ederiz.

### Atölye Genel Bakışı

[MCP Güvenlik Zirvesi Atölyesi](https://azure-samples.github.io/sherpa/) "güvenlik açığı → sömürü → düzeltme → doğrulama" metodolojisini izleyerek pratik, uygulanabilir güvenlik eğitimi sunar. Şunları yapacaksınız:

- **Kırarak Öğrenme**: Kasıtlı olarak güvensiz sunucuları istismar ederek zafiyetleri deneyimleyin  
- **Azure Yerel Güvenliği Kullanma**: Azure Entra ID, Key Vault, API Management ve AI Content Safety’den yararlanın  
- **Derin Savunma Yaklaşımı**: Güvenlik katmanları oluşturduğunuz kamplardan geçiş yapın  
- **OWASP Standartlarını Uygulama**: Her teknik, [OWASP MCP Azure Güvenlik Rehberi](https://microsoft.github.io/mcp-azure-security-guide/) ile örtüşür  
- **Üretim Kodu Elde Etme**: Çalışan ve test edilmiş uygulamalarla ayrılırsınız  

### Keşif Rotası

| Kamp | Odak | Kapsanan OWASP Riskleri |
|------|-------|-------------------------|
| **Ana Kamp** | MCP temelleri & kimlik doğrulama zafiyetleri | MCP01, MCP07 |
| **Kamp 1: Kimlik** | OAuth 2.1, Azure Yönetilen Kimlik, Key Vault | MCP01, MCP02, MCP07 |
| **Kamp 2: Ağ Geçidi** | API Yönetimi, Özel Uç Noktalar, yönetim | MCP02, MCP06, MCP07, MCP09 |
| **Kamp 3: Giriş/Çıkış Güvenliği** | Prompt enjeksiyonu, Kişisel Verilerin Korunması, içerik güvenliği | MCP03, MCP05, MCP06, MCP10 |
| **Kamp 4: İzleme** | Log Analytics, panolar, tehdit tespiti | MCP04, MCP08 |
| **Zirve** | Kırmızı Takım / Mavi Takım entegrasyon testi | Hepsi |

**Başlamak için**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP İlk 10 Güvenlik Riski

[OWASP MCP Azure Güvenlik Rehberi](https://microsoft.github.io/mcp-azure-security-guide/), MCP uygulamaları için en kritik on güvenlik riskini detaylandırır:

| Risk | Açıklama | Azure ile İyileştirme |
|------|----------|-----------------------|
| **MCP01** | Token Yanlış Yönetimi & Gizlilik Sızıntısı | Azure Key Vault, Yönetilen Kimlik |
| **MCP02** | Yetki Aşımı (Scope Creep) | RBAC, Koşullu Erişim |
| **MCP03** | Araç Zehirleme | Araç doğrulama, bütünlük kontrolü |
| **MCP04** | Yazılım Tedarik Zinciri Saldırıları & Bağımlılık Değiştirme | GitHub Advanced Security, bağımlılık taraması |
| **MCP05** | Komut Enjeksiyonu & Yürütme | Girdi doğrulama, sandboxing |
| **MCP06** | Niyet Akışı Manipülasyonu | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Yetersiz Kimlik Doğrulama & Yetkilendirme | Azure Entra ID, PKCE ile OAuth 2.1 |
| **MCP08** | Denetim ve Telemetri Eksikliği | Azure Monitor, Application Insights |
| **MCP09** | Gölge MCP Sunucuları | API Merkezi yönetimi, ağ izolasyonu |
| **MCP10** | Kontekst Enjeksiyonu & Aşırı Paylaşım | Veri sınıflandırması, minimal maruziyet |

### MCP Kimlik Doğrulama Evrimi

MCP spesifikasyonu kimlik doğrulama ve yetkilendirme yaklaşımında önemli gelişmeler göstermiştir:

- **Orijinal Yaklaşım**: İlk spesifikasyonlarda geliştiriciler özel kimlik doğrulama sunucuları implementasyonu yapmak zorundaydı; MCP sunucuları OAuth 2.0 Yetkilendirme Sunucusu olarak kullanıcı kimlik doğrulamasını doğrudan yönetiyordu  
- **Mevcut Standart (2025-11-25)**: Güncellenen spesifikasyon MCP sunucularının kimlik doğrulamayı Microsoft Entra ID gibi dış kimlik sağlayıcılarına devretmesine olanak tanıyıp, güvenlik duruşunu iyileştirdi ve uygulama karmaşıklığını azalttı  
- **Taşıma Katmanı Güvenliği**: Yerel (STDIO) ve uzak (Streamable HTTP) bağlantılar için uygun kimlik doğrulama desenleriyle gelişmiş güvenli taşıma desteği  

## Kimlik Doğrulama ve Yetkilendirme Güvenliği

### Mevcut Güvenlik Zorlukları

Modern MCP uygulamaları, kimlik doğrulama ve yetkilendirme alanında çeşitli zorluklarla karşı karşıyadır:

### Riskler ve Tehdit Vektörleri

- **Yanlış Yapılandırılmış Yetkilendirme Mantığı**: MCP sunucularındaki hatalı yetkilendirme uygulaması hassas verilerin açığa çıkmasına ve erişim kontrollerinin yanlış uygulanmasına yol açabilir  
- **OAuth Token İhlali**: Yerel MCP sunucu tokenlarının çalınması, saldırganların sunucu kimliği taklidi yapmasına ve alt sistemlere erişmesine olanak verir  
- **Token Geçiş Açıkları**: Uygunsuz token kullanımı güvenlik kontrollerinin atlanmasına ve hesap verebilirlik boşluklarına sebep olur  
- **Aşırı İzinler**: Gereğinden fazla yetkiye sahip MCP sunucuları en az ayrıcalık prensibini ihlal eder ve saldırı yüzeyini genişletir  

#### Token Geçişi: Kritik Bir Antipattern

Mevcut MCP yetkilendirme spesifikasyonunda **token geçişi açıkça yasaktır**, çünkü ciddi güvenlik etkileri vardır:

##### Güvenlik Kontrolü Atlatma  
- MCP sunucuları ve bağlı API'ler, oran sınırlama, istek doğrulama ve trafik izleme gibi kritik güvenlik kontrollerini düzgün token doğrulamasıyla uygular  
- İstemci ile API arasında doğrudan token kullanımı bu temel korumaları atlar ve güvenlik mimarisini zayıflatır  

##### Hesap Verebilirlik ve Denetim Zorlukları  
- MCP sunucuları, üst akış tarafından verilen tokenları kullanan istemcileri ayırt edemez; denetim izleri bozulur  
- Alt sistem günlükleri yanlışlıkla MCP sunucusunun aracı olduğunu gizleyerek kayıtlarda yanıltıcı talepler gösterir  
- Olay inceleme ve uyumluluk denetimleri zorlaşır  

##### Veri Sızdırma Riskleri  
- Doğrulanmamış token iddiaları ile kötü niyetli aktörler çalınan tokenları kullanarak MCP sunucularını veri sızdırma aracı olarak kötüye kullanabilir  
- Güven sınırı ihlalleri, yetkisiz erişim desenlerinin güvenlik kontrollerini atlamasına neden olur  

##### Çoklu Hizmet Saldırıları  
- Birden fazla hizmet tarafından kabul edilen ele geçirilmiş tokenlar, bağlı sistemler arasında yatay hareketliliği kolaylaştırır  
- Hizmetler arası güven varsayımları token kökeni doğrulanamadığında tehlikeye girer  

### Güvenlik Kontrolleri ve İyileştirmeler

**Temel Güvenlik Gereksinimleri:**

> **ZORUNLU**: MCP sunucuları **açıkça MCP sunucusu için verilmemiş tokenları kabul ETMEMELİDİR**

#### Kimlik Doğrulama & Yetkilendirme Kontrolleri

- **Titiz Yetkilendirme İncelemesi**: MCP sunucularının yetkilendirme mantığı ayrıntılı denetlenmeli, yalnızca izin verilen kullanıcı ve istemcilerin hassas kaynaklara erişimi sağlanmalı  
  - **Uygulama Rehberi**: [MCP Sunucuları için Azure API Yönetimi’nin Kimlik Doğrulama Ağ Geçidi olarak kullanımı](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Kimlik Entegrasyonu**: [MCP Sunucu Kimlik Doğrulaması için Microsoft Entra ID kullanımı](https://den.dev/blog/mcp-server-auth-entra-id-session/)  

- **Güvenli Token Yönetimi**: [Microsoft token doğrulama ve yaşam döngüsü en iyi uygulamalarını](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) uygulayın  
  - Token hedef iddialarının MCP sunucu kimliği ile uyumunu doğrulayın  
  - Uygun token yenileme ve süresi dolma politikalarını hayata geçirin  
  - Token tekrarı saldırılarını ve yetkisiz kullanımı engelleyin  

- **Korunan Token Depolama**: Tokenları hem dinlenirken hem iletimde şifreleyerek güvenli biçimde saklayın  
  - **En İyi Uygulamalar**: [Güvenli Token Depolama ve Şifreleme Kılavuzu](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)  

#### Erişim Kontrolü Uygulaması

- **En Az Ayrıcalık İlkesi**: MCP sunucularına sadece gerekli minimum izinler verilmeli  
  - Yetki genişlemesini önlemek için düzenli izin incelemeleri ve güncellemeleri yapın  
  - **Microsoft Dokümantasyonu**: [Güvenli En Az Ayrıcalıklı Erişim](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)  

- **Rol Tabanlı Erişim Kontrolü (RBAC)**: İnce taneli rol atamaları yapın  
  - Rolleri belirli kaynak ve eylemlerle sıkı bir şekilde sınırlayın  
  - Saldırı yüzeyini genişleten gereksiz veya genel izinlerden kaçının  

- **Sürekli İzin İzleme**: Erişim denetimleri ve izlemeyi devam ettirin  
  - İzin kullanım desenlerini anomaliler için izleyin  
  - Aşırı veya kullanılmayan izinleri hızlıca iyileştirin  

## Yapay Zekaya Özgü Güvenlik Tehditleri

### Prompt Enjeksiyonu & Araç Manipülasyonu Saldırıları

Modern MCP uygulamaları, geleneksel güvenlik önlemlerinin tam karşılayamadığı sofistike yapay zekaya özgü saldırı vektörleriyle karşı karşıyadır:

#### **Dolaylı Prompt Enjeksiyonu (Alanlar Arası Prompt Enjeksiyonu)**

**Dolaylı Prompt Enjeksiyonu**, MCP destekli yapay zeka sistemlerinde en kritik zafiyetlerden biridir. Saldırganlar, kötü niyetli talimatları dış kaynaklı içeriklere—dokümanlar, web sayfaları, e-postalar veya veri kaynakları—gömer; yapay zeka sistemleri ise bu içeriği meşru komutlar olarak işler.

**Saldırı Senaryoları:**
- **Doküman Bazlı Enjeksiyon**: İşlenen belgelerde gizlenmiş kötü niyetli talimatlar AI’nin istenmeyen eylemlerine yol açar  
- **Web İçeriği Sömürüsü**: AI davranışını değiştiren gömülü promptlar içeren tehlikeye düşmüş web sayfaları  
- **E-posta Bazlı Saldırılar**: AI asistanlarının bilgi sızdırmasına veya yetkisiz eylemler yapmasına neden olan kötü niyetli prompt içeren e-postalar  
- **Veri Kaynağı Kontaminasyonu**: MCP sistemlerine kirli içerik sunan tehlikeye düşmüş veritabanları veya API’ler  

**Gerçek Dünya Etkisi**: Bu saldırılar veri sızdırma, gizlilik ihlalleri, zararlı içerik oluşturulması ve kullanıcı etkileşimlerinin manipülasyonu gibi sonuçlar doğurabilir. Ayrıntılı analiz için bkz. [MCP’de Prompt Injection (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/tr/prompt-injection.ed9fbfde297ca877.webp)

#### **Araç Zehirleme Saldırıları**

**Araç Zehirleme**, MCP araçlarını tanımlayan meta verileri hedef alır ve LLM’lerin araç açıklamaları ile parametrelerini yorumlayarak yürütme kararları vermesini kötüye kullanır.

**Saldırı Mekanizmaları:**
- **Meta Veri Manipülasyonu**: Saldırganlar araç açıklamalarına, parametre tanımlarına veya kullanım örneklerine kötü niyetli talimatlar enjekte eder  
- **Görünmez Talimatlar**: İnsan kullanıcılar tarafından görülmeyen ama AI modelleri tarafından işlenen gizli promptlar  
- **Dinamik Araç Değişikliği ("Rug Pulls")**: Kullanıcı onayıyla onaylanmış araçlar, kullanıcı farkında olmadan kötü niyetli işlemleri yapmak üzere sonradan değiştirilir  
- **Parametre Enjeksiyonu**: Araç parametre şemalarına gömülü kötü içerik model davranışını etkiler  

**Barındırılan Sunucu Riskleri**: Uzaktan MCP sunucuları, araç tanımlarının ilk kullanıcı onayından sonra güncellenebilir olması nedeniyle artan riskler sunar; bu durum daha önce güvenli olan araçların kötü niyetli hale gelmesine neden olabilir. Kapsamlı analiz için bkz. [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/tr/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ek Yapay Zeka Saldırı Vektörleri**

- **Çapraz Alan İstek Enjeksiyonu (XPIA)**: Güvenlik kontrollerini aşmak için birden çok alandaki içeriği kullanan karmaşık saldırılar  
- **Dinamik Yetenek Değişikliği**: İlk güvenlik değerlendirmelerinden kaçan araç yeteneklerinde gerçek zamanlı değişiklikler  
- **Bağlam Penceresi Zehirlenmesi**: Kötü niyetli talimatları gizlemek için geniş bağlam pencerelerini manipüle eden saldırılar  
- **Model Karışıklık Saldırıları**: Model kısıtlamalarını kötüye kullanarak öngörülemez veya güvensiz davranışlar oluşturma  

### Yapay Zeka Güvenlik Risk Etkisi

**Yüksek Etkili Sonuçlar:**  
- **Veri Çıkarımı**: Hassas kurumsal veya kişisel verilere yetkisiz erişim ve hırsızlık  
- **Gizlilik İhlalleri**: Kişisel olarak tanımlanabilir bilgilerin (PII) ve gizli iş verilerinin açığa çıkması  
- **Sistem Manipülasyonu**: Kritik sistemlerde ve iş akışlarında istenmeyen değişiklikler  
- **Kimlik Bilgisi Hırsızlığı**: Kimlik doğrulama belirteçleri ve hizmet kimlik bilgilerinin ele geçirilmesi  
- **Yanal Hareketlilik**: Ele geçirilmiş yapay zeka sistemlerinin daha geniş ağ saldırıları için pivot olarak kullanılması  

### Microsoft Yapay Zeka Güvenlik Çözümleri

#### **Yapay Zeka İstek Kalkanları: Enjeksiyon Saldırılarına Karşı Gelişmiş Koruma**

Microsoft **Yapay Zeka İstek Kalkanları**, çok katmanlı güvenlik önlemleriyle hem doğrudan hem dolaylı istek enjeksiyon saldırılarına kapsamlı savunma sağlar:

##### **Temel Koruma Mekanizmaları:**

1. **Gelişmiş Tespit ve Filtreleme**  
   - Makine öğrenimi algoritmaları ve NLP teknikleri, dış içerikteki kötü amaçlı talimatları tespit eder  
   - Belgeler, web sayfaları, e-postalar ve veri kaynaklarında gömülü tehditlerin gerçek zamanlı analizi  
   - Meşru ve kötü amaçlı istek kalıplarının bağlamsal anlaşılması  

2. **Vurgulama Teknikleri**  
   - Güvenilen sistem talimatları ile potansiyel olarak ele geçirilmiş dış girdileri ayırt eder  
   - Metin dönüşümü yöntemleri, modeli ilgili tutarken kötü niyetli içeriği izole eder  
   - Yapay zeka sistemlerinin talimat hiyerarşisini korumasına ve enjeksiyonlu komutları görmezden gelmesine yardımcı olur  

3. **Sınırlayıcı ve Veri İşaretleme Sistemleri**  
   - Güvenilen sistem mesajları ile dış girdi metni arasında belirgin sınır tanımlaması  
   - Güvenilen ve güvenilmeyen veri kaynakları arasındaki sınırları özel işaretçilerle vurgular  
   - Talimat karışıklığını ve yetkisiz komut yürütmeyi önler  

4. **Sürekli Tehdit İstihbaratı**  
   - Microsoft, ortaya çıkan saldırı kalıplarını sürekli izler ve savunmaları günceller  
   - Yeni enjeksiyon teknikleri ve saldırı vektörleri üzerinde proaktif tehdit avcılığı  
   - Gelişen tehditlere karşı etkinliği korumak için düzenli güvenlik modeli güncellemeleri  

5. **Azure İçerik Güvenliği Entegrasyonu**  
   - Kapsamlı Azure Yapay Zeka İçerik Güvenliği paketinin parçası  
   - Jailbreak denemeleri, zararlı içerik ve güvenlik politikası ihlalleri için ek tespitler  
   - Yapay zeka uygulama bileşenleri genelinde birleşik güvenlik kontrolleri  

**Uygulama Kaynakları**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/tr/prompt-shield.ff5b95be76e9c78c.webp)


## İleri Düzey MCP Güvenlik Tehditleri

### Oturum Kaçırma Zafiyetleri

**Oturum kaçırma**, durum bilgisi olan MCP uygulamalarında kritik bir saldırı vektörünü temsil eder; yetkisiz taraflar, geçerli oturum kimlik bilgilerini ele geçirip kötüye kullanarak istemcileri taklit eder ve yetkisiz işlemler gerçekleştirir.

#### **Saldırı Senaryoları ve Riskler**

- **Oturum Kaçırma İstek Enjeksiyonu**: Çalınan oturum kimlik bilgisine sahip saldırganlar, oturum durumunu paylaşan sunuculara kötü niyetli olaylar enjekte ederek zararlı işlemleri tetikleyebilir veya hassas verilere erişebilir  
- **Doğrudan Taklit**: Çalınan oturum kimlikleri, kimlik doğrulamayı atlayarak saldırganların meşru kullanıcı gibi MCP sunucusunu doğrudan çağırmasını sağlar  
- **Ele Geçirilmiş Devam Ettirilebilir Akışlar**: Saldırganlar istekleri erken sonlandırabilir, meşru istemcilerin potansiyel olarak kötü niyetli içerikle devam etmesine neden olabilir  

#### **Oturum Yönetimi İçin Güvenlik Kontrolleri**

**Kritik Gereksinimler:**  
- **Yetkilendirme Doğrulaması**: Yetkilendirme uygulayan MCP sunucuları TÜM gelen istekleri doğrulamalı ve kimlik doğrulama için oturumlara güvenmemelidir  
- **Güvenli Oturum Oluşturma**: Kriptografik olarak güvenli, rastgele sayı üreteçleri kullanılarak belirlenmeyen oturum kimlikleri oluşturulmalı  
- **Kullanıcıya Özel Bağlama**: Oturum kimlikleri, çapraz kullanıcı oturum kötüye kullanımını önlemek için `<user_id>:<session_id>` gibi kullanıcıya özgü bilgilerle bağlanmalı  
- **Oturum Yaşam Döngüsü Yönetimi**: Güvenlik açıklarını sınırlamak için uygun sona erdirme, döndürme ve geçersiz kılma uygulanmalı  
- **İletim Güvenliği**: Oturum kimliği yakalamalarını önlemek için tüm iletişimlerde HTTPS zorunludur  

### Karışık Vekil Problemi

**Karışık vekil problemi**, MCP sunucuları istemciler ile üçüncü taraf hizmetler arasında kimlik doğrulama vekili olarak hareket ettiğinde meydana gelir; statik istemci ID kullanımının kötüye kullanılması yoluyla yetkilendirme atlama fırsatları oluşturur.

#### **Saldırı Mekaniği ve Riskler**

- **Çerez Tabanlı Onay Atlatma**: Önceki kullanıcı kimlik doğrulaması, saldırganların kötü amaçlı yetkilendirme isteklerinde kötü amaçlı yönlendirme URI’leri ile istismar ettiği onay çerezleri oluşturur  
- **Yetkilendirme Kodu Hırsızlığı**: Mevcut onay çerezleri, yetkilendirme sunucularının onay ekranını atlayarak kodların saldırgan kontrollü uç noktalara yönlendirilmesine neden olabilir  
- **Yetkisiz API Erişimi**: Çalınan yetkilendirme kodları, açık onay olmaksızın belirteç değişimi ve kullanıcı taklit işlemlerine olanak tanır  

#### **Azaltma Stratejileri**

**Zorunlu Kontroller:**  
- **Açık Onay Gereksinimleri**: Statik istemci ID kullanan MCP vekil sunucuları, her dinamik olarak kaydedilen istemci için kullanıcı onayı almalıdır  
- **OAuth 2.1 Güvenliği Uygulaması**: Tüm yetkilendirme isteklerinde PKCE (Proof Key for Code Exchange) dahil mevcut OAuth güvenlik en iyi uygulamaları takip edilmeli  
- **Katı İstemci Doğrulaması**: Yönlendirme URI’leri ve istemci kimliklerinin kötüye kullanımını önlemek için sıkı doğrulama uygulanmalı  

### Belirteç Geçişi Zafiyetleri

**Belirteç geçişi**, MCP sunucularının istemci belirteçlerini uygun doğrulama yapmadan kabul edip aşağı yöndeki API’lere iletmesiyle ortaya çıkan açık bir anti-pattern’i temsil eder; bu MCP yetkilendirme spesifikasyonlarını ihlal eder.

#### **Güvenlik Etkileri**

- **Kontrol Atlama**: İstemciden API’ye doğrudan belirteç kullanımı kritik oran sınırlama, doğrulama ve izleme kontrollerini atlar  
- **Denetim İzinin Bozulması**: Yukarı akıştan verilen belirteçler, istemci tanımlamasını imkansız kılarak olay soruşturma yeteneklerini bozar  
- **Aracı Bazlı Veri Sızdırma**: Doğrulanmamış belirteçler, kötü niyetli aktörlerin sunucuları yetkisiz veri erişimi için vekil olarak kullanmasına olanak tanır  
- **Güven Sınırı İhlalleri**: Belirteç kökenleri doğrulanamadığında aşağı yöndeki hizmetlerin güven varsayımları ihlal olabilir  
- **Çok Hizmetli Saldırı Yayılımı**: Wimbledon belirteçleri birden çok hizmette kabul edilerek yanal hareketi mümkün kılar  

#### **Gerekli Güvenlik Kontrolleri**

**Tartışmasız Gereksinimler:**  
- **Belirteç Doğrulama**: MCP sunucuları, açıkça MCP sunucusuna verilmemiş belirteçleri kabul etmemelidir  
- **Hedef Kitle Doğrulaması**: Her zaman belirteç hedef kitle iddialarının MCP sunucusu kimliğiyle uyuştuğunu doğrulamalıdır  
- **Uygun Belirteç Yaşam Döngüsü**: Kısa ömürlü erişim belirteçleri ve güvenli döndürme uygulamaları yürürlükte olmalıdır  


## Yapay Zeka Sistemleri için Tedarik Zinciri Güvenliği

Tedarik zinciri güvenliği, geleneksel yazılım bağımlılıklarının ötesine geçerek tüm yapay zeka ekosistemini kapsar. Modern MCP uygulamaları, sistem bütünlüğünü tehlikeye atabilecek potansiyel zafiyetleri önlemek için tüm yapay zeka ile ilgili bileşenleri titizlikle doğrulamalı ve izlemelidir.

### Genişletilmiş Yapay Zeka Tedarik Zinciri Bileşenleri

**Geleneksel Yazılım Bağımlılıkları:**  
- Açık kaynak kitaplıklar ve çerçeveler  
- Konteyner imajları ve temel sistemler  
- Geliştirme araçları ve derleme boru hatları  
- Altyapı bileşenleri ve hizmetler  

**Yapay Zeka’ya Özgü Tedarik Zinciri Öğeleri:**  
- **Temel Modeller**: Köken doğrulaması gereken çeşitli sağlayıcılardan ön eğitimli modeller  
- **Yerleştirme Hizmetleri**: Harici vektörleştirme ve semantik arama servisleri  
- **Bağlam Sağlayıcıları**: Veri kaynakları, bilgi tabanları ve belge depoları  
- **Üçüncü Taraf API’ler**: Harici yapay zeka servisleri, ML boru hatları ve veri işleme uç noktaları  
- **Model Artefaktları**: Ağırlıklar, yapılandırmalar ve ince ayarlı model varyantları  
- **Eğitim Veri Kaynakları**: Model eğitimi ve ince ayar için kullanılan veri kümeleri  

### Kapsamlı Tedarik Zinciri Güvenlik Stratejisi

#### **Bileşen Doğrulama ve Güven**  
- **Köken Doğrulaması**: Tüm yapay zeka bileşenlerinin kaynak, lisanslama ve bütünlüğü entegrasyondan önce doğrulanır  
- **Güvenlik Değerlendirmesi**: Modeller, veri kaynakları ve yapay zeka servisleri için zafiyet taramaları ve güvenlik incelemeleri gerçekleştirilir  
- **Reputasyon Analizi**: Yapay zeka hizmet sağlayıcılarının güvenlik sicili ve uygulamaları değerlendirilir  
- **Uyumluluk Doğrulaması**: Tüm bileşenlerin kurumsal güvenlik ve düzenleyici gereksinimleri karşıladığı garanti edilir  

#### **Güvenli Dağıtım Boru Hatları**  
- **Otomatik CI/CD Güvenliği**: Otomatik dağıtım boru hatları boyunca güvenlik taraması entegre edilir  
- **Artefakt Bütünlüğü**: Dağıtılan tüm artefaktların (kod, modeller, yapılandırmalar) kriptografik doğrulaması yapılır  
- **Aşamalı Dağıtım**: Her aşamada güvenlik doğrulamasıyla kademeli dağıtım stratejileri kullanılır  
- **Güvenilir Artefakt Depoları**: Sadece doğrulanmış, güvenli artefakt kayıtlarından dağıtım yapılır  

#### **Sürekli İzleme ve Müdahale**  
- **Bağımlılık Taraması**: Tüm yazılım ve yapay zeka bileşen bağımlılıkları için sürekli zafiyet izleme  
- **Model İzleme**: Model davranışı, performans kayması ve güvenlik anomalilerinin kesintisiz değerlendirilmesi  
- **Hizmet Sağlığı Takibi**: Harici yapay zeka servislerinin kullanılabilirliği, güvenlik olayları ve politika değişikliklerinin izlenmesi  
- **Tehdit İstihbaratı Entegrasyonu**: Yapay zeka ve ML güvenlik risklerine özgü tehdit beslemelerinin dahil edilmesi  

#### **Erişim Kontrolü ve En Az Ayrıcalık**  
- **Bileşen Düzeyinde İzinler**: Modeller, veriler ve hizmetlere iş gereksinimine dayalı erişim kısıtlamaları  
- **Hizmet Hesabı Yönetimi**: Minimum gerekli ayrıcalıklara sahip özel hizmet hesapları uygulanır  
- **Ağ Segmentasyonu**: Yapay zeka bileşenleri izole edilir ve hizmetler arası ağ erişimi sınırlandırılır  
- **API Ağ Geçidi Kontrolleri**: Harici yapay zeka hizmetlerine erişim merkezi API ağ geçitleri ile kontrol edilir ve izlenir  

#### **Olay Müdahalesi ve Kurtarma**  
- **Hızlı Müdahale Prosedürleri**: Ele geçirilen yapay zeka bileşenlerinin yamalanması veya değiştirilmesi için belirlenmiş süreçler  
- **Kimlik Bilgisi Değişimi**: Sırlar, API anahtarları ve hizmet kimlik bilgileri için otomatik döndürme sistemleri  
- **Geri Alma Yeteneği**: Yapay zeka bileşenlerinin önceden bilinen güvenli sürümlerine hızlı geri dönüş yeteneği  
- **Tedarik Zinciri İhlali Kurtarma**: Yukarı akış yapay zeka hizmeti ihlallerine özel müdahale prosedürleri  

### Microsoft Güvenlik Araçları ve Entegrasyonu

**GitHub Advanced Security**, şunları içeren kapsamlı tedarik zinciri koruması sağlar:  
- **Gizli Bilgi Taraması**: Depolarda kimlik bilgileri, API anahtarları ve belirteçlerin otomatik tespiti  
- **Bağımlılık Taraması**: Açık kaynak bağımlılıkları ve kütüphaneler için zafiyet değerlendirmesi  
- **CodeQL Analizi**: Güvenlik açıkları ve kodlama hataları için statik kod analizi  
- **Tedarik Zinciri İçgörüleri**: Bağımlılık sağlığı ve güvenlik durumu görünürlüğü  

**Azure DevOps & Azure Repos Entegrasyonu:**  
- Microsoft geliştirme platformları genelinde kesintisiz güvenlik taraması entegrasyonu  
- AI iş yükleri için Azure Pipelines’da otomatik güvenlik kontrolleri  
- Güvenli yapay zeka bileşen dağıtımı için politika uygulaması  

**Microsoft İç Uygulamaları:**  
Microsoft, tüm ürünlerinde kapsamlı tedarik zinciri güvenlik uygulamaları yürütmektedir. Kanıtlanmış yaklaşımlar hakkında bilgi için bkz. [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Temel Güvenlik En İyi Uygulamaları

MCP uygulamaları, kuruluşunuzun mevcut güvenlik duruşunu devralır ve üzerine inşa eder. Temel güvenlik uygulamalarının güçlendirilmesi, yapay zeka sistemleri ve MCP dağıtımlarının genel güvenliğini önemli ölçüde artırır.

### Temel Güvenlik Prensipleri

#### **Güvenli Geliştirme Uygulamaları**  
- **OWASP Uyumu**: [OWASP Top 10](https://owasp.org/www-project-top-ten/) web uygulaması zafiyetlerine karşı korunma  
- **Yapay Zeka’ya Özgü Koruma**: [OWASP Top 10 for LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) için kontrollerin uygulanması  
- **Güvenli Gizli Yönetimi**: Belirteçler, API anahtarları ve hassas yapılandırma verileri için özel kasalar kullanımı  
- **Uçtan Uca Şifreleme**: Tüm uygulama bileşenleri ve veri akışlarında güvenli iletişim  
- **Girdi Doğrulama**: Tüm kullanıcı girdileri, API parametreleri ve veri kaynaklarının titiz doğrulanması  

#### **Altyapı Sertleştirme**  
- **Çok Faktörlü Kimlik Doğrulama**: Tüm yönetim ve hizmet hesapları için zorunlu MFA  
- **Yama Yönetimi**: İşletim sistemleri, çerçeveler ve bağımlılıklar için otomatik ve zamanında yamalama  
- **Kimlik Sağlayıcı Entegrasyonu**: Microsoft Entra ID, Active Directory gibi kurumsal kimlik sağlayıcılarıyla merkezi kimlik yönetimi  
- **Ağ Segmentasyonu**: Yanal hareket potansiyelini sınırlamak için MCP bileşenlerinin mantıksal izolasyonu  
- **Asgari Ayrıcalık İlkesi**: Tüm sistem bileşenleri ve hesaplar için minimum gerekli izinler  

#### **Güvenlik İzleme ve Tespit**  
- **Kapsamlı Kayıt Tutma**: MCP istemci-sunucu etkileşimleri dahil yapay zeka uygulama aktivitelerinin detaylı kaydı  
- **SIEM Entegrasyonu**: Anomali tespiti için merkezi güvenlik bilgi ve olay yönetimi  
- **Davranışsal Analitik**: Sistem ve kullanıcı davranışlarında olağan dışı desenleri tespit etmek için yapay zeka destekli izleme  
- **Tehdit İstihbaratı**: Harici tehdit beslemeleri ve ihlal göstergelerinin (IOCs) entegrasyonu  
- **Olay Müdahalesi**: Güvenlik olaylarının tespiti, yanıtı ve kurtarılması için belirlenmiş prosedürler  

#### **Sıfır Güven Mimarisi**  
- **Asla Güvenme, Her Zaman Doğrula**: Kullanıcılar, cihazlar ve ağ bağlantılarının sürekli doğrulanması  
- **Mikro-Segmentasyon**: Bireysel iş yükleri ve hizmetleri izole eden ayrıntılı ağ kontrolleri  
- **Kimlik Merkezli Güvenlik**: Ağ konumu yerine doğrulanmış kimliklere dayalı güvenlik politikaları  
- **Sürekli Risk Değerlendirmesi**: Mevcut bağlama ve davranışa göre dinamik güvenlik durumu değerlendirmesi  
- **Koşullu Erişim**: Risk faktörlerine, konuma ve cihaz güvenilirliğine göre uyarlanan erişim kontrolleri  

### Kurumsal Entegrasyon Desenleri

#### **Microsoft Güvenlik Ekosistemi Entegrasyonu**  
- **Microsoft Defender for Cloud**: Kapsamlı bulut güvenlik durumu yönetimi  
- **Azure Sentinel**: Yapay zeka iş yükü koruması için bulut tabanlı SIEM ve SOAR yetenekleri  
- **Microsoft Entra ID**: Koşullu erişim politikalarıyla kurumsal kimlik ve erişim yönetimi  
- **Azure Key Vault**: Donanım güvenlik modülü (HSM) destekli merkezi gizli yönetimi  
- **Microsoft Purview**: Yapay zeka veri kaynakları ve iş akışları için veri yönetişimi ve uyumluluk  

#### **Uyumluluk ve Yönetişim**  
- **Regülasyon Uyumu**: MCP uygulamalarının sektöre özgü uyumluluk gereksinimlerini (GDPR, HIPAA, SOC 2) karşıladığından emin olunması  
- **Veri Sınıflandırması**: AI sistemleri tarafından işlenen hassas verilerin uygun şekilde kategorize edilmesi ve yönetilmesi  
- **Denetim Kayıtları**: Düzenleyici uyumluluk ve adli araştırma için kapsamlı kayıt tutulması  
- **Gizlilik Kontrolleri**: AI sistem mimarisinde gizlilik odaklı tasarım ilkelerinin uygulanması  
- **Değişiklik Yönetimi**: AI sistemi değişikliklerinin güvenlik incelemeleri için resmi süreçler  

Bu temel uygulamalar, MCP'ye özgü güvenlik kontrollerinin etkinliğini artıran ve AI destekli uygulamalara kapsamlı koruma sağlayan sağlam bir güvenlik temelini oluşturur.

## Önemli Güvenlik Dersleri

- **Katmanlı Güvenlik Yaklaşımı**: Temel güvenlik uygulamalarını (güvenli kodlama, en az ayrıcalık, tedarik zinciri doğrulaması, sürekli izleme) AI'ya özgü kontrollerle birleştirerek kapsamlı koruma sağlama  

- **AI'ya Özgü Tehdit Manzarası**: MCP sistemleri, prompt enjeksiyonu, araç zehirlenmesi, oturum kaçırma, kafa karışıklığı problemleri, token geçiş açıkları ve aşırı izinler gibi özel risklerle karşılaşır ve bunlar için özel önlemler gerektirir  

- **Kimlik Doğrulama ve Yetkilendirme Mükemmelliği**: Microsoft Entra ID gibi harici kimlik sağlayıcıları kullanarak sağlam kimlik doğrulama uygulayın, uygun token doğrulamasını zorunlu kılın ve MCP sunucunuz için açıkça verilmemiş tokenleri kabul etmeyin  

- **AI Saldırı Önleme**: Microsoft Prompt Shields ve Azure Content Safety kullanarak dolaylı prompt enjeksiyonu ve araç zehirlenmesi saldırılarına karşı savunun, araç meta verilerini doğrulayın ve dinamik değişiklikleri izleyin  

- **Oturum ve Taşıma Güvenliği**: Kullanıcı kimliklerine bağlı, kriptografik olarak güvenli, belirli olmayan oturum kimlikleri kullanın, oturum yaşam döngüsü yönetimini doğru uygulayın ve oturumları kimlik doğrulamaya asla kullanmayın  

- **OAuth Güvenlik En İyi Uygulamaları**: Dinamik olarak kayıtlı istemciler için kullanıcı onayını açık şekilde talep ederek kafa karışıklığı saldırılarını önleyin, PKCE ile doğru OAuth 2.1 uygulaması yapın ve yönlendirme URI doğrulamasını sıkı şekilde yapın  

- **Token Güvenlik İlkeleri**: Token geçiş anti-paternlerinden kaçının, token hedef kitle iddialarını doğrulayın, kısa ömürlü tokenlar uygulayın ve güvenli döndürmeyi sağlayın, açık güven sınırlarını koruyun  

- **Kapsamlı Tedarik Zinciri Güvenliği**: AI ekosistemi bileşenlerinin tamamını (modeller, embeddingler, bağlam sağlayıcıları, dış API'ler) geleneksel yazılım bağımlılıkları kadar yüksek güvenlik önlemleriyle ele alın  

- **Sürekli Evrim**: Hızla gelişen MCP spesifikasyonlarını yakından takip edin, güvenlik topluluk standartlarına katkıda bulunun ve protokol olgunlaştıkça adaptif güvenlik duruşlarını sürdürün  

- **Microsoft Güvenlik Entegrasyonu**: MCP dağıtım korumasını artırmak için Microsoft'un kapsamlı güvenlik ekosisteminden (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) yararlanın  

## Kapsamlı Kaynaklar

### **Resmi MCP Güvenlik Belgeleri**
- [MCP Spesifikasyonu (Güncel: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Güvenlik En İyi Uygulamaları](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Yetkilendirme Spesifikasyonu](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Deposu](https://github.com/modelcontextprotocol)

### **OWASP MCP Güvenlik Kaynakları**
- [OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/) - Kapsamlı OWASP MCP İlk 10 ve Azure uygulama rehberi  
- [OWASP MCP İlk 10](https://owasp.org/www-project-mcp-top-10/) - Resmi OWASP MCP güvenlik riskleri  
- [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure üzerinde MCP için pratik güvenlik eğitimi  

### **Güvenlik Standartları & En İyi Uygulamalar**
- [OAuth 2.0 Güvenlik En İyi Uygulamaları (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP İlk 10 Web Uygulaması Güvenliği](https://owasp.org/www-project-top-ten/)
- [Büyük Dil Modelleri için OWASP İlk 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Dijital Savunma Raporu](https://aka.ms/mddr)

### **AI Güvenlik Araştırma & Analizleri**
- [MCP’de Prompt Enjeksiyonu (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Araç Zehirlenmesi Saldırıları (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Güvenlik Araştırma Raporu (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Güvenlik Çözümleri**
- [Microsoft Prompt Shields Belgeleri](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Hizmeti](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Güvenliği](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Yönetimi En İyi Uygulamaları](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Gelişmiş Güvenlik](https://github.com/security/advanced-security)

### **Uygulama Kılavuzları & Eğitimler**
- [Azure API Management ile MCP Kimlik Doğrulama Geçidi](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID ile MCP Sunucu Kimlik Doğrulaması](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Güvenli Token Depolama ve Şifreleme (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & Tedarik Zinciri Güvenliği**
- [Azure DevOps Güvenliği](https://azure.microsoft.com/products/devops)
- [Azure Repos Güvenliği](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Tedarik Zinciri Güvenliği Yolculuğu](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Ek Güvenlik Belgeleri**

Kapsamlı güvenlik rehberliği için, bu bölümdeki özel belgelere başvurabilirsiniz:

- **[MCP Güvenlik En İyi Uygulamaları 2025](./mcp-security-best-practices-2025.md)** - MCP uygulamaları için eksiksiz güvenlik en iyi uygulamaları  
- **[Azure Content Safety Uygulaması](./azure-content-safety-implementation.md)** - Azure Content Safety entegrasyonunda pratik uygulama örnekleri  
- **[MCP Güvenlik Kontrolleri 2025](./mcp-security-controls-2025.md)** - MCP dağıtımları için en son güvenlik kontrolleri ve teknikleri  
- **[MCP En İyi Uygulamalar Hızlı Referans](./mcp-best-practices.md)** - Temel MCP güvenlik uygulamaları için hızlı başvuru rehberi  
- **[BlueHat 2026: Yapay zekanın geleceğini güvence altına alma: Derin savunma desenleriyle MCP güvenliği](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Microsoft Güvenlik Müdahale Merkezi (MSRC) tarafından derin savunma desenleri  

### **Pratik Güvenlik Eğitimi**

- **[MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/)** - Azure üzerinde MCP sunucularının güvenliği için temel kamp’tan zirveye kadar kapsamlı uygulamalı atölye  
- **[OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/)** - Tüm OWASP MCP İlk 10 risk için referans mimarisi ve uygulama rehberi  

---

## Sonraki

Sonraki: [Bölüm 3: Başlarken](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->