# MCP Güvenliği: Yapay Zeka Sistemleri için Kapsamlı Koruma

[![MCP Güvenliği En İyi Uygulamalar](../../../translated_images/tr/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Bu dersin videosunu izlemek için yukarıdaki görsele tıklayın)_

Güvenlik, yapay zeka sistemi tasarımının temelidir; bu yüzden bunu ikinci bölümümüz olarak önceliklendiriyoruz. Bu, Microsoft’un [Güvenli Gelecek Girişimi](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/) kapsamında yer alan **Tasarımda Güvenlik** ilkesine uyum sağlamaktadır.

Model Context Protocol (MCP), yapay zeka destekli uygulamalara güçlü yeni yetenekler getirirken geleneksel yazılım risklerini aşan benzersiz güvenlik zorlukları da ortaya koymaktadır. MCP sistemleri, yerleşik güvenlik endişeleri (güvenli kodlama, en az ayrıcalık ilkesi, tedarik zinciri güvenliği) ve yapay zekaya özgü yeni tehditler (prompt enjeksiyonu, araç zehirlenmesi, oturum kaçırma, kafası karışmış vekil saldırıları, jeton geçişi açıkları ve dinamik yetenek değiştirme) ile karşı karşıyadır.

Bu ders, MCP uygulamalarındaki en kritik güvenlik risklerini inceler—kimlik doğrulama, yetkilendirme, aşırı izinler, dolaylı prompt enjeksiyonu, oturum güvenliği, kafası karışmış vekil sorunları, jeton yönetimi ve tedarik zinciri açıkları gibi konuları kapsar. Microsoft çözümleri olan Prompt Shields, Azure İçerik Güvenliği ve GitHub İleri Düzey Güvenlik gibi araçları kullanarak MCP dağıtımınızı güçlendirmek için bu risklere karşı uygulanabilir kontrolleri ve en iyi uygulamaları öğrenirsiniz.

## Öğrenim Hedefleri

Bu dersin sonunda şunları yapabileceksiniz:

- **MCP’ye Özgü Tehditleri Tanımlamak**: MCP sistemlerindeki benzersiz güvenlik risklerini tanımak; prompt enjeksiyonu, araç zehirlenmesi, aşırı izinler, oturum kaçırma, kafası karışmış vekil sorunları, jeton geçişi açıkları ve tedarik zinciri riskleri dahil
- **Güvenlik Kontrollerini Uygulamak**: Güçlü kimlik doğrulama, en az ayrıcalık erişimi, güvenli jeton yönetimi, oturum güvenliği kontrolleri ve tedarik zinciri doğrulaması gibi etkili azaltımları hayata geçirmek
- **Microsoft Güvenlik Çözümlerini Kullanmak**: MCP iş yükü koruması için Microsoft Prompt Shields, Azure İçerik Güvenliği ve GitHub İleri Düzey Güvenlik’i anlamak ve dağıtmak
- **Araç Güvenliğini Doğrulamak**: Araç metadata doğrulamasının önemini kavramak, dinamik değişiklikleri izlemek ve dolaylı prompt enjeksiyonu saldırılarına karşı savunma yapmak
- **En İyi Uygulamaları Entegre Etmek**: Yerleşik güvenlik temelleri (güvenli kodlama, sunucu sertleştirme, sıfır güven) ile MCP’ye özgü kontrolleri birleştirerek kapsamlı koruma sağlamak

# MCP Güvenlik Mimarisi ve Kontrolleri

Modern MCP uygulamaları, hem geleneksel yazılım güvenliği hem de yapay zekaya özgü tehditleri ele alan katmanlı güvenlik yaklaşımları gerektirir. Hızla gelişen MCP spesifikasyonu, güvenlik kontrollerini olgunlaştırmaya devam ederek kurumsal güvenlik mimarileriyle ve yerleşik en iyi uygulamalarla daha iyi entegrasyon sağlamaktadır.

[Microsoft Dijital Savunma Raporu](https://aka.ms/mddr) araştırmaları, **rapor edilen ihlallerin %98’inin güçlü güvenlik hijyeni ile önlenebileceğini** göstermektedir. En etkili koruma stratejisi, temel güvenlik uygulamalarını MCP’ye özgü kontrollerle birleştirmektir—kanıtlanmış temel güvenlik önlemleri, genel güvenlik riskini azaltmada en etkili yöntemdir.

## Mevcut Güvenlik Durumu

> **Not:** Bu bilgi **5 Şubat 2026** tarihindeki MCP güvenlik standartlarını yansıtmaktadır ve **MCP Spesifikasyon 2025-11-25** ile uyumludur. MCP protokolü hızla evrilmektedir ve gelecekteki uygulamalar yeni kimlik doğrulama kalıpları ve geliştirilmiş kontroller getirebilir. En güncel rehberlik için her zaman mevcut [MCP Spesifikasyonuna](https://spec.modelcontextprotocol.io/), [MCP GitHub deposuna](https://github.com/modelcontextprotocol) ve [güvenlik en iyi uygulamaları dokümantasyonuna](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) başvurun.

## 🏔️ MCP Güvenlik Zirvesi Atölyesi (Sherpa)

**Pratik güvenlik eğitimi** için, Microsoft Azure’da MCP sunucularının güvenceye alınması için kapsamlı ve rehberli bir yolculuk olan **MCP Güvenlik Zirvesi Atölyesi (Sherpa)**’yı şiddetle öneriyoruz.

### Atölye Genel Bakışı

[MCP Güvenlik Zirvesi Atölyesi](https://azure-samples.github.io/sherpa/), "güvenlik açığı → istismar → düzeltme → doğrulama" metodolojisiyle uygulanabilir, pratik güvenlik eğitimi sunar. Şunları yapacaksınız:

- **Hedefe Kırarak Öğrenmek**: Niyetli olarak güvensiz sunucuları istismar ederek güvenlik açıklarını deneyimleyin
- **Azure Yerel Güvenliğini Kullanmak**: Azure Entra ID, Key Vault, API Yönetimi ve AI İçerik Güvenliği'nden yararlanın
- **Derin Savunmayı Takip Etmek**: Kapsamlı güvenlik katmanları oluşturulan kamp alanlarından ilerleyin
- **OWASP Standartlarını Uygulamak**: Her teknik, [OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/) ile eşleşir
- **Üretim Koduna Sahip Olmak**: Çalışan ve test edilmiş uygulamalarla ayrılın

### Yolculuk Rotası

| Kamp | Odak Noktası | Kapsanan OWASP Riskleri |
|------|--------------|-------------------------|
| **Ana Kamp** | MCP temelleri & kimlik doğrulama açıkları | MCP01, MCP07 |
| **Kamp 1: Kimlik** | OAuth 2.1, Azure Yönetilen Kimlik, Key Vault | MCP01, MCP02, MCP07 |
| **Kamp 2: Ağ Geçidi** | API Yönetimi, Özel Uç Noktalar, yönetişim | MCP02, MCP06, MCP07, MCP09 |
| **Kamp 3: Giriş/Çıkış Güvenliği** | Prompt enjeksiyonu, PII koruma, içerik güvenliği | MCP03, MCP05, MCP06, MCP10 |
| **Kamp 4: İzleme** | Log Analytics, panolar, tehdit tespiti | MCP04, MCP08 |
| **Zirve** | Kırmızı Takım / Mavi Takım entegrasyon testi | Hepsi |

**Başlamak için**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## OWASP MCP İlk 10 Güvenlik Riski

[OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/), MCP uygulamaları için en kritik on güvenlik riskini detaylandırır:

| Risk | Açıklama | Azure ile Azaltma |
|------|----------|-------------------|
| **MCP01** | Jeton Yönetimi Hataları ve Gizli Bilgi Açığa Çıkması | Azure Key Vault, Yönetilen Kimlik |
| **MCP02** | Kapsam Kıvrımı ile Ayrıcalık Yükseltme | RBAC, Koşullu Erişim |
| **MCP03** | Araç Zehirlenmesi | Araç doğrulama, bütünlük denetimi |
| **MCP04** | Yazılım Tedarik Zinciri Saldırıları ve Bağımlılık Manipülasyonu | GitHub İleri Düzey Güvenlik, bağımlılık taraması |
| **MCP05** | Komut Enjeksiyonu ve Yürütme | Girdi doğrulama, sandbox uygulaması |
| **MCP06** | Niyet Akışının Altüst Edilmesi | Azure AI İçerik Güvenliği, Prompt Shields |
| **MCP07** | Yetersiz Kimlik Doğrulama ve Yetkilendirme | Azure Entra ID, PKCE ile OAuth 2.1 |
| **MCP08** | Denetim ve Telemetri Eksikliği | Azure Monitor, Uygulama İçgörüleri |
| **MCP09** | Gölge MCP Sunucuları | API Merkezi yönetişimi, ağ izolasyonu |
| **MCP10** | Bağlam Enjeksiyonu ve Aşırı Paylaşım | Veri sınıflandırması, asgari maruziyet |

### MCP Kimlik Doğrulamasının Evrimi

MCP spesifikasyonu kimlik doğrulama ve yetkilendirme yaklaşımında önemli değişiklikler geçirdi:

- **Orijinal Yaklaşım**: İlk spesifikasyonlar, geliştiricilerin özel kimlik doğrulama sunucularını uygulamasını gerektiriyordu; MCP sunucuları ise OAuth 2.0 Yetkilendirme Sunucusu olarak kullanıcı kimlik doğrulamasını doğrudan yönetiyordu
- **Mevcut Standart (2025-11-25)**: Güncellenmiş spesifikasyon, MCP sunucuların Microsoft Entra ID gibi dış kimlik sağlayıcılarına kimlik doğrulamasını devretmesine izin vererek güvenlik duruşunu iyileştiriyor ve uygulama karmaşıklığını azaltıyor
- **Taşıma Katmanı Güvenliği**: Yerel (STDIO) ve uzak (Streamable HTTP) bağlantılar için uygun kimlik doğrulama kalıplarıyla geliştirilmiş güvenli taşıma mekanizmaları desteği

## Kimlik Doğrulama ve Yetkilendirme Güvenliği

### Mevcut Güvenlik Zorlukları

Modern MCP uygulamaları, birçok kimlik doğrulama ve yetkilendirme sorunu ile karşılaşır:

### Riskler ve Tehdit Vektörleri

- **Yanlış Yapılandırılmış Yetkilendirme Mantığı**: MCP sunucularındaki hatalı yetkilendirme uygulamaları, hassas verileri açığa çıkarabilir ve erişim kontrollerini yanlış uygulayabilir
- **OAuth Jeton Sızıntısı**: Yerel MCP sunucu jetonu çalınması, saldırganların sunucu kimliğine bürünerek aşağı akış hizmetlerine erişmesini sağlar
- **Jeton Geçişi Açıkları**: Yanlış jeton işleme güvenlik kontrollerinin atlanmasına ve hesap verebilirlik boşluklarına yol açar
- **Aşırı İzinler**: Gereğinden fazla ayrıcalık verilmiş MCP sunucular, en az ayrıcalık ilkesi ihlal edilir ve saldırı yüzeyleri genişler

#### Jeton Geçişi: Kritik Bir Antipattern

Mevcut MCP yetkilendirme spesifikasyonunda ağır güvenlik risklerinden dolayı **jeton geçişi kesinlikle yasaktır**:

##### Güvenlik Kontrollerinin Atlanması
- MCP sunucuları ve aşağı akış API’ları, oran sınırlaması, istek doğrulama, trafik izlemesi gibi kritik güvenlik kontrollerini uygular
- İstemci den API’ye doğrudan jeton kullanımı bu temel korumaları atlayarak güvenlik mimarisini zayıflatır

##### Hesap Verebilirlik ve Denetim Problemleri
- MCP sunucuları, üst akış tarafından verilen jetonları kullanan istemciler arasında ayrım yapamaz; denetim yolları kırılır
- Aşağı akış kaynak sunucu günlükleri gerçek MCP sunucu arabulucusu yerine yanıltıcı istek kökenlerini gösterir
- Olay inceleme ve uyum denetimi oldukça zorlaşır

##### Veri Sızıntısı Riskleri
- Doğrulanmamış jeton iddiaları, çalınan jetonlarla kötü niyetli aktörlerin MCP sunucularını veri sızıntısı aracı olarak kullanmasına olanak sağlar
- Güven sınırı ihlalleri, yetkisiz erişim desenlerinin atlanmasına neden olur

##### Çoklu Servis Saldırı Vektörleri
- Kabul edilen kötüye kullanılmış jetonlar, birden fazla servise erişim sağlıyarak yan hareket (lateral movement) imkanı verir
- Jeton kökenleri doğrulanamadığında servisler arası güven varsayımları ihlal edilebilir

### Güvenlik Kontrolleri ve Azaltımlar

**Kritik Güvenlik Gereklilikleri:**

> **ZORUNLU**: MCP sunucuları, açıkça MCP sunucusu için verilmemiş herhangi bir jetonu **kabul ETMEMELİDİR**.

#### Kimlik Doğrulama ve Yetkilendirme Kontrolleri

- **Titiz Yetkilendirme İncelemesi**: MCP sunucu yetkilendirme mantığı kapsamlı şekilde denetlenmeli; yalnızca amaçlanan kullanıcı ve istemciler hassas kaynaklara erişmeli
  - **Uygulama Rehberi**: [Azure API Yönetimini MCP Sunucuları için Kimlik Doğrulama Ağ Geçidi olarak kullanma](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Kimlik Entegrasyonu**: [Microsoft Entra ID kullanarak MCP Sunucusu Kimlik Doğrulaması](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Güvenli Jeton Yönetimi**: [Microsoft'un jeton doğrulama ve yaşam döngüsü en iyi uygulamalarını](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens) uygulama
  - Jeton hedef kitlesi (audience) iddialarının MCP sunucu kimliğiyle eşleştiğini doğrulama
  - Doğru jeton yenileme ve süre bitimi politikaları uygulama
  - Jeton tekrar oynatma saldırılarını ve yetkisiz kullanımı önleme

- **Korunan Jeton Depolama**: Jetonları hem korunarak hem de aktarımda şifreleyerek güvenli saklama
  - **En İyi Uygulamalar**: [Güvenli Jeton Depolama ve Şifreleme Kılavuzları](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Erişim Kontrolü Uygulaması

- **En Az Ayrıcalık İlkesi**: MCP sunucularına yalnızca gerekli minimum izinler verilmelidir
  - Ayrıcalık kıvrılmasını önlemek için düzenli izin incelemeleri ve güncellemeleri
  - **Microsoft Dokümantasyonu**: [Güvenli En Az Ayrıcalıklı Erişim](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Rol Tabanlı Erişim Kontrolü (RBAC)**: Detaylı rol atamalarıyla uygulama
  - Rolleri belirli kaynaklar ve işlemlerle sıkı şekilde sınırlandırma
  - Geniş veya gereksiz izinlerden kaçınma; saldırı yüzeylerini küçültme

- **Sürekli İzin İzleme**: Sürekli erişim denetimi ve izleme uygulama
  - İzin kullanım modellerini anomaliler için izleme
  - Aşırı veya kullanılmayan ayrıcalıkları hızlıca düzeltme

## Yapay Zekaya Özgü Güvenlik Tehditleri

### Prompt Enjeksiyonu ve Araç Manipülasyon Saldırıları

Modern MCP uygulamaları, geleneksel güvenlik önlemlerinin tam karşılayamadığı gelişmiş yapay zeka odaklı saldırılarla karşılaşmaktadır:

#### **Dolaylı Prompt Enjeksiyonu (Çapraz-Domain Prompt Enjeksiyonu)**

**Dolaylı Prompt Enjeksiyonu**, MCP destekli yapay zeka sistemlerinde en kritik güvenlik açıklarından biridir. Saldırganlar, yapay zekanın daha sonra meşru komutlar olarak işleyeceği dış kaynaklı içeriğe—belgeler, web sayfaları, e-postalar veya veri kaynakları içine zararlı talimatlar gömer.

**Saldırı Senaryoları:**
- **Belge Tabanlı Enjeksiyon**: İşlenen belgelerde gizlenmiş kötü niyetli talimatlar, istenmeyen AI hareketlerini tetikler
- **Web İçeriği İstismarı**: Kazınan (scraped) web sayfalarında gömülü promptlar AI davranışını manipüle eder
- **E-posta Tabanlı Saldırılar**: E-postalardaki zararlı promptlar, AI asistanlarının bilgi sızdırmasına veya yetkisiz işlemler yapmasına yol açar
- **Veri Kaynağı Kontaminasyonu**: Saptırılmış veritabanları veya API’ler AI sistemlerine kirli içerik sağlar

**Gerçek Dünya Etkisi**: Bu saldırılar veri sızdırma, gizlilik ihlalleri, zararlı içerik üretimi ve kullanıcı etkileşimlerinin manipülasyonuna neden olabilir. Detaylı analiz için bkz. [MCP’de Prompt Enjeksiyonu (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Enjeksiyonu Saldırı Diyagramı](../../../translated_images/tr/prompt-injection.ed9fbfde297ca877.webp)

#### **Araç Zehirlenmesi Saldırıları**

**Araç Zehirlenmesi**, MCP araçlarını tanımlayan metadata hedef alınır; LLM’lerin araç açıklamalarını ve parametreleri nasıl yorumlayarak yürütme kararları verdiğinden faydalanılır.

**Saldırı Mekanizmaları:**
- **Metadata Manipülasyonu**: Saldırganlar, araç açıklamalarına, parametre tanımlarına veya kullanım örneklerine zararlı talimatlar enjekte eder
- **Görünmez Talimatlar**: İnsan kullanıcı tarafından görülmeyen, ancak AI modelleri tarafından işlenen gizli promptlar
- **Dinamik Araç Değiştirme ("Rug Pull")**: Kullanıcı onayı alındıktan sonra araçlar kötü niyetli işlemler yapmak üzere değiştirilir, kullanıcı farkında olmaz
- **Parametre Enjeksiyonu**: Araç parametre şemalarına gömülü kötü amaçlı içerik model davranışını etkiler

**Barındırılan Sunucu Riskleri**: Uzaktan MCP sunucuları, araç tanımları ilk kullanıcı onayından sonra güncellenebileceği için artan riskler barındırır. Önceden güvenli araçlar kötü niyetli hale dönüşebilir. Kapsamlı analiz için bkz. [Araç Zehirlenmesi Saldırıları (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Araç Enjeksiyonu Saldırı Diyagramı](../../../translated_images/tr/tool-injection.3b0b4a6b24de6bef.webp)

#### **Ek Yapay Zeka Saldırı Vektörleri**

- **Çapraz-Domain Prompt Enjeksiyonu (XPIA)**: Birden çok alan kaynaklı içerikleri kullanarak güvenlik kontrollerini aşan gelişmiş saldırılar
- **Dinamik Yetenek Değişikliği**: Araç yeteneklerinde, ilk güvenlik değerlendirmelerinden kaçan gerçek zamanlı değişiklikler  
- **Kapsam Penceresi Zehirlenmesi**: Kötü niyetli talimatları gizlemek için büyük kapsam pencerelerini manipüle eden saldırılar  
- **Model Karışıklığı Saldırıları**: Model kısıtlamalarını kullanarak öngörülemez veya güvensiz davranışlar oluşturmak  

### AI Güvenlik Riski Etkisi

**Yüksek Etkili Sonuçlar:**  
- **Veri Sızdırma**: Yetkisiz erişim ve hassas kurumsal veya kişisel verilerin çalınması  
- **Gizlilik İhlalleri**: Kişisel olarak tanımlanabilir bilgiler (PII) ve gizli ticari verilerin ifşası  
- **Sistem Manipülasyonu**: Kritik sistemler ve iş akışlarında istenmeyen değişiklikler  
- **Kimlik Bilgisi Hırsızlığı**: Kimlik doğrulama jetonları ve hizmet kimlik bilgilerinin ele geçirilmesi  
- **Yanal Hareket**: Ele geçirilmiş AI sistemlerinin daha geniş ağ saldırıları için sıçrama noktası olarak kullanılması  

### Microsoft AI Güvenlik Çözümleri

#### **AI İstek Kalkanları: Enjeksiyon Saldırılarına Karşı Gelişmiş Koruma**

Microsoft **AI İstek Kalkanları**, çeşitli güvenlik katmanları vasıtasıyla doğrudan ve dolaylı istek enjeksiyon saldırılarına kapsamlı koruma sağlar:

##### **Temel Koruma Mekanizmaları:**

1. **Gelişmiş Tespit ve Filtreleme**  
   - Makine öğrenimi algoritmaları ve NLP teknikleri, dış içerikteki kötü niyetli talimatları tespit eder  
   - Gömülü tehditler için belgeler, web sayfaları, e-postalar ve veri kaynaklarının gerçek zamanlı analizi  
   - Meşru ve kötü niyetli istek kalıplarının bağlamsal olarak anlaşılması  

2. **Spotlight Teknikleri**  
   - Güvenilir sistem talimatları ile potansiyel olarak tehlikeye uğramış dış girdiler arasındaki farkı ayırt eder  
   - Model uygunluğunu artıran ancak kötü niyetli içeriği izole eden metin dönüşüm yöntemleri  
   - AI sistemlerinin uygun talimat hiyerarşisini korumasına ve enjeksiyonlu komutları görmezden gelmesine yardımcı olur  

3. **Ayraç ve Veri İşaretleme Sistemleri**  
   - Güvenilen sistem mesajları ile dış girdi metni arasında açık sınır tanımı sağlar  
   - Güvenilir ve güvenilmez veri kaynakları arasındaki sınırları vurgulayan özel işaretler  
   - Talimat karışıklığını ve yetkisiz komut yürütmesini önleyen net ayrım  

4. **Sürekli Tehdit İstihbaratı**  
   - Microsoft, ortaya çıkan saldırı kalıplarını sürekli izler ve savunmaları günceller  
   - Yeni enjeksiyon teknikleri ve saldırı vektörleri için proaktif tehdit avcılığı  
   - Evrilen tehditlere karşı etkinliği sürdürmek için düzenli güvenlik model güncellemeleri  

5. **Azure İçerik Güvenliği Entegrasyonu**  
   - Kapsamlı Azure AI İçerik Güvenliği paketinin parçası  
   - Jailbreak girişimleri, zararlı içerik ve güvenlik politikası ihlalleri için ek tespit  
   - AI uygulama bileşenleri arasında birleşik güvenlik kontrolleri  

**Uygulama Kaynakları**: [Microsoft İstek Kalkanları Belgeleri](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft İstek Kalkanları Koruması](../../../translated_images/tr/prompt-shield.ff5b95be76e9c78c.webp)


## Gelişmiş MCP Güvenlik Tehditleri

### Oturum Ele Geçirme Güvenlik Açıkları

**Oturum ele geçirme**, durum bilgisi olan MCP uygulamalarında kritik bir saldırı vektörünü temsil eder; burada yetkisiz taraflar meşru oturum kimlik bilgilerini ele geçirir ve kötüye kullanarak istemci kimliğine bürünür ve yetkisiz işlemler gerçekleştirir.

#### **Saldırı Senaryoları ve Riskler**

- **Oturum Ele Geçirme İstek Enjeksiyonu**: Çalıntı oturum kimlik bilgilerine sahip saldırganlar, oturum durumu paylaşan sunuculara kötü niyetli olaylar enjekte ederek zararlı eylemler tetikleyebilir veya hassas verilere erişebilir  
- **Doğrudan Taklit**: Çalıntı oturum kimlik bilgileri, kimlik doğrulamayı atlayarak attackerların meşru kullanıcı gibi MCP sunucularına doğrudan çağrılar yapmasını sağlar  
- **İhlal Edilmiş Devam Edilebilir Akışlar**: Saldırganlar istekleri erken sonlandırabilir, bu da meşru istemcilerin potansiyel kötü niyetli içerikle devam etmesine neden olabilir  

#### **Oturum Yönetimi için Güvenlik Kontrolleri**

**Kritik Gereksinimler:**  
- **Yetkilendirme Doğrulaması**: Yetkilendirme uygulayan MCP sunucuları, TÜM gelen istekleri doğrulamalı ve kimlik doğrulama için oturumlara güvenmemelidir  
- **Güvenli Oturum Oluşturma**: Güvenli, deterministik olmayan oturum kimlikleri kriptografik rastgele sayı üreteçleriyle oluşturulmalıdır  
- **Kullanıcıya Özel Bağlama**: Oturum kimlikleri, `<user_id>:<session_id>` gibi formatlarla kullanıcıya özgü bilgilere bağlanarak kullanıcılar arası oturum suistimalini önlemelidir  
- **Oturum Yaşam Döngüsü Yönetimi**: Güvenlik açıklarını sınırlamak için uygun süre sonunda sona erdirme, değiştirme ve geçersiz kılma uygulanmalıdır  
- **Taşıma Güvenliği**: Oturum kimliği yakalanmasını önlemek için tüm iletişimde HTTPS zorunludur  

### Karışıklık Vekili Problemi

**Karışıklık vekili problemi**, MCP sunucularının istemciler ile üçüncü taraf hizmetler arasında kimlik doğrulama vekili olarak hareket ettiği durumlarda ortaya çıkar; burada statik istemci kimliği sömürüsü yoluyla yetkilendirme atlatma fırsatları oluşur.

#### **Saldırı Mekanikleri ve Riskler**

- **Çerez Tabanlı Onay Atlatma**: Önceki kullanıcı kimlik doğrulaması onay çerezleri oluşturur; saldırganlar, kötü amaçlı yetkilendirme istekleriyle ve kötü niyetli yönlendirme URI’leri ile bunu sömürür  
- **Yetkilendirme Kodu Hırsızlığı**: Mevcut onay çerezleri yetkilendirme sunucusunun onay ekranlarını atlamasına ve kodları saldırgan kontrolündeki uç noktalara yönlendirmesine neden olabilir  
- **Yetkisiz API Erişimi**: Çalınan yetkilendirme kodları, açık onay olmadan token değişimini ve kullanıcı taklidini sağlar  

#### **Azaltma Stratejileri**

**Zorunlu Kontroller:**  
- **Açık Onay Gereksinimleri**: Statik istemci kimlikleri kullanan MCP vekil sunucuları, dinamik olarak kayıt edilen her istemci için kullanıcı onayı almalıdır  
- **OAuth 2.1 Güvenlik Uygulaması**: Tüm yetkilendirme isteklerinde PKCE (Kod Değişimi için Kanıt Anahtarı) dahil olmak üzere güncel OAuth güvenlik uygulamalarına uyulmalıdır  
- **Sıkı İstemci Doğrulama**: Kötüye kullanımı önlemek için yönlendirme URI’leri ve istemci kimlikleri titizlikle doğrulanmalıdır  

### Token Geçişi Güvenlik Açıkları  

**Token geçişi**, MCP sunucularının istemci tokenlarını doğru doğrulama olmadan kabul edip downstream API’lere ilettiği açık bir karşı-desendir; bu MCP yetkilendirme spesifikasyonlarını ihlal eder.

#### **Güvenlik Sonuçları**

- **Kontrol Atlatma**: İstemci’den API’ye doğrudan token kullanımı kritik hız sınırı, doğrulama ve izleme kontrollerini atlar  
- **Denetim İzinin Bozulması**: Yukarı akışta verilen tokenlar, istemci tanımlamasını imkansız kılarak olay soruşturmasını engeller  
- **Vekil Tabanlı Veri Sızdırma**: Doğrulanmamış tokenlar, saldırganların sunucuları yetkisiz veri erişimi için vekil olarak kullanmasını sağlar  
- **Güven Sınırı İhlalleri**: Token kaynağı doğrulanamadığında downstream servislerin güven varsayımları ihlal edilir  
- **Çoklu Hizmet Saldırı Yayılımı**: Birden fazla serviste kabul edilen çalıntı tokenlar yanal hareketi mümkün kılar  

#### **Gerekli Güvenlik Kontrolleri**

**Tartışılmaz Gereksinimler:**  
- **Token Doğrulama**: MCP sunucuları, açıkça MCP sunucusu için verilmemiş tokenları kabul ETMEMELİDİR  
- **Hedef Kitle Doğrulaması**: Token hedef kitlesi (aud) iddiasının MCP sunucusunun kimliği ile eşleştiği kesinlikle doğrulanmalıdır  
- **Uygun Token Yaşam Döngüsü**: Kısa ömürlü erişim tokenları güvenli döndürme politikalarıyla uygulanmalıdır  


## AI Sistemleri için Tedarik Zinciri Güvenliği

Tedarik zinciri güvenliği, geleneksel yazılım bağımlılıklarının ötesine geçerek tüm AI ekosistemini kapsamaktadır. Modern MCP uygulamaları, sistem bütünlüğünü tehdit edebilecek tüm AI bileşenlerini titizlikle doğrulamalı ve izlemelidir.

### Genişletilmiş AI Tedarik Zinciri Bileşenleri

**Geleneksel Yazılım Bağımlılıkları:**  
- Açık kaynak kütüphaneler ve çerçeveler  
- Konteyner imajları ve temel sistemler  
- Geliştirme araçları ve yapı boru hatları  
- Altyapı bileşenleri ve servisleri  

**AI’ye Özgü Tedarik Zinciri Öğeleri:**  
- **Foundation Modelleri**: Farklı sağlayıcılardan önceden eğitilmiş modeller, kaynağın doğrulanması gerekir  
- **Embedding Servisleri**: Harici vektörleştirme ve anlamsal arama hizmetleri  
- **Kapsam Sağlayıcıları**: Veri kaynakları, bilgi tabanları ve belge depoları  
- **Üçüncü Taraf API’ler**: Harici AI servisleri, ML boru hatları ve veri işleme uç noktaları  
- **Model Artifaktları**: Ağırlıklar, yapılandırmalar ve ince ayarlı model varyantları  
- **Eğitim Veri Kaynakları**: Model eğitimi ve ince ayarı için kullanılan veri setleri  

### Kapsamlı Tedarik Zinciri Güvenlik Stratejisi

#### **Bileşen Doğrulama ve Güven**  
- **Kaynak Doğrulaması**: Tüm AI bileşenlerinin kökeni, lisansı ve bütünlüğü doğrulanmalı  
- **Güvenlik Değerlendirmesi**: Modeller, veri kaynakları ve AI servisleri için zafiyet taramaları ve güvenlik incelemeleri yapılmalı  
- **Reputasyon Analizi**: AI hizmet sağlayıcılarının güvenlik geçmişi ve uygulamaları değerlendirilmelidir  
- **Uyumluluk Doğrulaması**: Tüm bileşenlerin kurumsal güvenlik ve düzenleyici gereksinimlere uygunluğu sağlanmalı  

#### **Güvenli Dağıtım Boru Hatları**  
- **Otomatik CI/CD Güvenliği**: Otomatik dağıtım boru hatları boyunca güvenlik taraması entegrasyonu  
- **Artifakt Bütünlüğü**: Dağıtılan tüm artifaktlar için kriptografik doğrulama (kod, modeller, yapılandırmalar)  
- **Aşamalı Dağıtım**: Her aşamada güvenlik doğrulaması yapılan kademeli dağıtım stratejileri  
- **Güvenilir Artifakt Depoları**: Sadece doğrulanmış, güvenli artifakt kayıtlarından ve depolarından dağıtım  

#### **Sürekli İzleme ve Yanıt**  
- **Bağımlılık Taraması**: Tüm yazılım ve AI bileşen bağımlılıkları için sürekli zafiyet takibi  
- **Model İzleme**: Model davranışı, performans kayması ve güvenlik anormalliklerinin sürekli değerlendirilmesi  
- **Servis Sağlığı Takibi**: Harici AI servislerinin kullanılabilirliği, güvenlik olayları ve politika değişiklikleri izlenir  
- **Tehdit İstihbaratı Entegrasyonu**: AI ve ML güvenlik risklerine özgü tehdit beslemeleri entegre edilir  

#### **Erişim Kontrolü ve En Az Ayrıcalık**  
- **Bileşen Seviyesi İzinler**: Modeller, veriler ve hizmetlere iş gereksinimine dayalı erişim kısıtlaması  
- **Servis Hesabı Yönetimi**: Minimal izinlere sahip özel servis hesapları uygulanması  
- **Ağ Segmentasyonu**: AI bileşenleri izole edilir ve servisler arası ağ erişimi sınırlandırılır  
- **API Ağ Geçidi Kontrolleri**: Harici AI servislerine erişim kontrollü ve izlenebilir merkezi API ağ geçitleri kullanımı  

#### **Olay Müdahalesi ve Kurtarma**  
- **Hızlı Müdahale Prosedürleri**: İhlal edilen AI bileşenlerinin yamalanması veya değiştirilmesi için belirlenmiş süreçler  
- **Kimlik Bilgisi Devir Döngüsü**: Sırlar, API anahtarları ve servis kimlik bilgilerinin otomatik döndürülmesi  
- **Geri Alma Yeteneği**: AI bileşenlerinin önceki sağlam sürümlerine hızla dönüş yeteneği  
- **Tedarik Zinciri İhlali Kurtarma**: Yukarı akıştaki hizmet ihlallerine özel müdahale prosedürleri  

### Microsoft Güvenlik Araçları ve Entegrasyon

**GitHub Advanced Security**, kapsamlı tedarik zinciri koruması sağlar; bunlar arasında:  
- **Gizli Anahtar Taraması**: Depolarda kimlik bilgileri, API anahtarları ve tokenların otomatik tespiti  
- **Bağımlılık Taraması**: Açık kaynak bağımlılıkları ve kütüphaneler için zafiyet değerlendirmesi  
- **CodeQL Analizi**: Güvenlik açıkları ve kodlama hatalarına yönelik statik kod analizi  
- **Tedarik Zinciri İçgörüleri**: Bağımlılık sağlığı ve güvenlik durumu görünürlüğü  

**Azure DevOps & Azure Repos Entegrasyonu:**  
- Microsoft geliştirme platformlarında kesintisiz güvenlik taraması entegrasyonu  
- AI iş yüklerinde Azure Pipelines üzerinde otomatik güvenlik kontrolleri  
- Güvenli AI bileşen dağıtımı için politika zorlamaları  

**Microsoft İç Uygulamaları:**  
Microsoft, tüm ürünlerde kapsamlı tedarik zinciri güvenlik uygulamaları yürütmektedir. Denenmiş yaklaşımlar hakkında bilgi edinin: [Microsoft'ta Yazılım Tedarik Zincirini Güvenceye Alma Yolculuğu](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Temel Güvenlik En İyi Uygulamaları

MCP uygulamaları, kuruluşunuzun mevcut güvenlik duruşunu devralır ve üzerine inşa eder. Temel güvenlik uygulamalarının güçlendirilmesi, AI sistemleri ve MCP dağıtımları için genel güvenliği önemli ölçüde artırır.

### Temel Güvenlik Temelleri

#### **Güvenli Geliştirme Uygulamaları**  
- **OWASP Uyumluluğu**: [OWASP Top 10](https://owasp.org/www-project-top-ten/) web uygulama zafiyetlerine karşı koruma  
- **AI’ye Özgü Koruma**: [LLMler için OWASP Top 10](https://genai.owasp.org/download/43299/?tmstv=1731900559) kontrolleri uygulanması  
- **Güvenli Gizli Yönetimi**: Tokenlar, API anahtarları ve hassas konfigürasyon verileri için özel kasalar kullanımı  
- **Uçtan Uca Şifreleme**: Tüm uygulama bileşenleri ve veri akışlarında güvenli iletişim sağlama  
- **Girdi Doğrulama**: Tüm kullanıcı girdileri, API parametreleri ve veri kaynaklarının titiz validasyonu  

#### **Altyapı Güçlendirmesi**  
- **Çok Faktörlü Kimlik Doğrulama**: Tüm yönetici ve servis hesapları için zorunlu MFA  
- **Yama Yönetimi**: İşletim sistemleri, çerçeveler ve bağımlılıklar için otomatik, zamanında yama uygulaması  
- **Kimlik Sağlayıcı Entegrasyonu**: Kurumsal kimlik sağlayıcıları (Microsoft Entra ID, Active Directory) ile merkezi kimlik yönetimi  
- **Ağ Segmentasyonu**: MCP bileşenlerinin yanal hareket olasılığını sınırlamak için mantıksal izolasyon  
- **En Az Ayrıcalık Prensibi**: Tüm sistem bileşenleri ve hesaplar için gereken minimum yetkiler  

#### **Güvenlik İzleme ve Tespit**  
- **Kapsamlı Kayıt Tutma**: MCP istemci-sunucu etkileşimleri de dahil olmak üzere AI uygulama aktivitelerinin detaylı kaydı  
- **SIEM Entegrasyonu**: Anomali tespiti için merkezi güvenlik bilgi ve olay yönetimi  
- **Davranış Analitiği**: Sistem ve kullanıcı davranışlarındaki olağan dışı kalıpları tespit etmek için AI destekli izleme  
- **Tehdit İstihbaratı**: Harici tehdit beslemeleri ve ihlal göstergeleri (IOC) entegrasyonu  
- **Olay Müdahalesi**: Güvenlik olayı tespiti, yanıt ve kurtarma için iyi tanımlanmış prosedürler  

#### **Sıfır Güven Mimarisi**  
- **Asla Güvenme, Her Zaman Doğrula**: Kullanıcılar, cihazlar ve ağ bağlantılarının sürekli doğrulanması  
- **Mikro Segmentasyon**: Bireysel iş yüklerini ve servisleri izole eden ayrıntılı ağ kontrolleri  
- **Kimlik Merkezli Güvenlik**: Ağ konumu yerine doğrulanmış kimliklere dayalı güvenlik politikaları  
- **Sürekli Risk Değerlendirmesi**: Mevcut bağlam ve davranışa göre dinamik güvenlik duruşu değerlendirmesi  
- **Koşullu Erişim**: Risk faktörleri, konum ve cihaz güvenine göre uyarlanabilir erişim kontrolleri  

### Kurumsal Entegrasyon Kalıpları

#### **Microsoft Güvenlik Ekosistemi Entegrasyonu**  
- **Microsoft Defender for Cloud**: Kapsamlı bulut güvenlik duruşu yönetimi  
- **Azure Sentinel**: AI iş yükleri için bulut tabanlı SIEM ve SOAR yetenekleri  
- **Microsoft Entra ID**: Koşullu erişim politikaları ile kurumsal kimlik ve erişim yönetimi  
- **Azure Key Vault**: Donanım güvenlik modülü (HSM) destekli merkezi gizli yönetimi  
- **Microsoft Purview**: AI veri kaynakları ve iş akışları için veri yönetişimi ve uyumluluk  

#### **Uyumluluk ve Yönetişim**  
- **Düzenleyici Uyumluluk**: MCP uygulamalarının sektör özelinde uyumluluk gereksinimlerini karşılaması (GDPR, HIPAA, SOC 2)  
- **Veri Sınıflandırması**: AI sistemleri tarafından işlenen hassas verilerin uygun kategorize edilmesi ve yönetimi  
- **Denetim Kayıtları**: Düzenleyici uyumluluk ve adli soruşturma için kapsamlı kayıt tutma  
- **Gizlilik Kontrolleri**: AI sistem mimarisinde gizlilik-önden tasarım ilkelerinin uygulanması  
- **Değişim Yönetimi**: AI sistem değişikliklerinin güvenlik incelemeleri için resmi süreçler  

Bu temel uygulamalar, MCP’ye özgü güvenlik kontrollerinin etkinliğini artıran ve AI destekli uygulamalar için kapsamlı koruma sağlayan sağlam bir güvenlik altyapısı oluşturur.

## Temel Güvenlik Çıkarımları
- **Katmanlı Güvenlik Yaklaşımı**: Temel güvenlik uygulamalarını (güvenli kodlama, en az ayrıcalık, tedarik zinciri doğrulaması, sürekli izleme) AI'ya özgü kontrollerle birleştirerek kapsamlı koruma sağlamak

- **AI'ya Özgü Tehdit Ortamı**: MCP sistemleri, istem enjekte etme, araç zehirlenmesi, oturum kaçırma, karışık vekil sorunları, token geçişi açıkları ve aşırı izinler gibi özel risklerle karşı karşıyadır ve bunlar özel önlemler gerektirir

- **Kimlik Doğrulama ve Yetkilendirme Mükemmelliği**: Dış kimlik sağlayıcıları (Microsoft Entra ID) kullanarak sağlam kimlik doğrulaması uygulamak, doğru token doğrulamasını zorunlu kılmak ve MCP sunucunuz için açıkça verilmemiş tokenları asla kabul etmemek

- **AI Saldırılarının Önlenmesi**: Dolaylı istem enjekte etme ve araç zehirlenmesi saldırılarına karşı Microsoft Prompt Shields ve Azure Content Safety'yi dağıtmak; araç meta verilerini doğrulamak ve dinamik değişiklikleri izlemek

- **Oturum ve İletim Güvenliği**: Kullanıcı kimliklerine bağlı kriptografik olarak güvenli, belirlenemez oturum kimlikleri kullanmak, doğru oturum yaşam döngüsü yönetimini uygulamak ve kimlik doğrulama için asla oturumlar kullanmamak

- **OAuth Güvenlik En İyi Uygulamaları**: Dinamik kayıtlı istemciler için açık kullanıcı onayı ile karışık vekil saldırılarını önlemek, PKCE ile doğru OAuth 2.1 uygulaması yapmak ve yönlendirme URI doğrulamasını titizlikle sağlamak

- **Token Güvenlik İlkeleri**: Token geçişi antipatternlerinden kaçınmak, token hedef kitle iddialarını doğrulamak, güvenli döndürme ile kısa ömürlü tokenlar uygulamak ve net güven sınırları korumak

- **Kapsamlı Tedarik Zinciri Güvenliği**: AI ekosistemi bileşenlerini (modeller, gömülü veriler, bağlam sağlayıcılar, dış API'ler) geleneksel yazılım bağımlılıklarıyla aynı güvenlik titizliği ile ele almak

- **Sürekli Evrim**: Hızla gelişen MCP spesifikasyonları ile güncel kalmak, güvenlik topluluğu standartlarına katkıda bulunmak ve protokol olgunlaştıkça uyarlanabilir güvenlik duruşları sürdürmek

- **Microsoft Güvenlik Entegrasyonu**: Gelişmiş MCP dağıtım koruması için Microsoft'un kapsamlı güvenlik ekosisteminden (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) yararlanmak

## Kapsamlı Kaynaklar

### **Resmi MCP Güvenlik Dokümantasyonu**
- [MCP Spesifikasyonu (Güncel: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [MCP Güvenlik En İyi Uygulamaları](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [MCP Yetkilendirme Spesifikasyonu](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [MCP GitHub Deposu](https://github.com/modelcontextprotocol)

### **OWASP MCP Güvenlik Kaynakları**
- [OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/) - Azure uygulama rehberi ile kapsamlı OWASP MCP En İyi 10
- [OWASP MCP En İyi 10](https://owasp.org/www-project-mcp-top-10/) - Resmi OWASP MCP güvenlik riskleri
- [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) - Azure'da MCP için uygulamalı güvenlik eğitimi

### **Güvenlik Standartları ve En İyi Uygulamalar**
- [OAuth 2.0 Güvenlik En İyi Uygulamaları (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP En İyi 10 Web Uygulaması Güvenliği](https://owasp.org/www-project-top-ten/)
- [Büyük Dil Modelleri için OWASP En İyi 10](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Microsoft Dijital Savunma Raporu](https://aka.ms/mddr)

### **AI Güvenlik Araştırma ve Analizleri**
- [MCP'de İstem Enjekte Etme (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Araç Zehirlenmesi Saldırıları (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [MCP Güvenlik Araştırma Brifingi (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Microsoft Güvenlik Çözümleri**
- [Microsoft Prompt Shields Dokümantasyonu](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety Servisi](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft Entra ID Güvenliği](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Azure Token Yönetimi En İyi Uygulamaları](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Gelişmiş Güvenlik](https://github.com/security/advanced-security)

### **Uygulama Kılavuzları ve Eğitimler**
- [Azure API Yönetimi ile MCP Kimlik Doğrulama Geçidi](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID ile MCP Sunucuları Kimlik Doğrulaması](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Güvenli Token Depolama ve Şifreleme (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps ve Tedarik Zinciri Güvenliği**
- [Azure DevOps Güvenliği](https://azure.microsoft.com/products/devops)
- [Azure Repos Güvenliği](https://azure.microsoft.com/products/devops/repos/)
- [Microsoft Tedarik Zinciri Güvenlik Yolculuğu](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Ek Güvenlik Dokümantasyonu**

Kapsamlı güvenlik rehberi için, bu bölümdeki özel belgelere başvurun:

- **[MCP Güvenlik En İyi Uygulamaları 2025](./mcp-security-best-practices-2025.md)** - MCP uygulamaları için tam güvenlik en iyi uygulamaları
- **[Azure Content Safety Uygulaması](./azure-content-safety-implementation.md)** - Azure Content Safety entegrasyonu için pratik uygulama örnekleri  
- **[MCP Güvenlik Kontrolleri 2025](./mcp-security-controls-2025.md)** - MCP dağıtımları için en yeni güvenlik kontrolleri ve teknikleri
- **[MCP En İyi Uygulamalar Hızlı Referans](./mcp-best-practices.md)** - Temel MCP güvenlik uygulamaları için hızlı referans rehberi
- **[BlueHat 2026: AI’nın Geleceğini Güvence Altına Almak: Derin Savunma Kalıpları ile MCP Güvenliği](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Microsoft Güvenlik Müdahale Merkezi (MSRC) tarafından sunulan derin savunma kalıpları

### **Uygulamalı Güvenlik Eğitimi**

- **[MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/)** - Base Camp'ten Zirve'ye ilerleyen kamplarla Azure'da MCP sunucularının güvenliğini sağlayan kapsamlı uygulamalı atölye çalışması
- **[OWASP MCP Azure Güvenlik Kılavuzu](https://microsoft.github.io/mcp-azure-security-guide/)** - Tüm OWASP MCP En İyi 10 risk için referans mimari ve uygulama rehberi

---

## Sonraki Adım

Sonraki: [Bölüm 3: Başlarken](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->