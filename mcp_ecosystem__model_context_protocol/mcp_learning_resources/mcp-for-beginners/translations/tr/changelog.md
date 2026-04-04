# Değişiklik Günlüğü: Yeni Başlayanlar için MCP Müfredatı

Bu belge, Model Bağlam Protokolü (MCP) için Yeni Başlayanlar müfredatında yapılan tüm önemli değişikliklerin kaydını tutar. Değişiklikler ters kronolojik sırayla (en yeni değişiklikler önce) belgelenmiştir.

## 5 Şubat 2026

### Depo Genelinde Doğrulama ve Navigasyon İyileştirmeleri

#### Yeni Müfredat İçeriği Eklendi

**Modül 03 - Başlarken**
- **12-mcp-hosts/README.md**: MCP hostlarının kurulumu için yeni kapsamlı rehber
  - Claude Desktop, VS Code, Cursor, Cline, Windsurf yapılandırma örnekleri
  - Tüm başlıca hostlar için JSON yapılandırma şablonları
  - Taşıma türleri karşılaştırma tablosu (stdio, SSE/HTTP, WebSocket)
  - Yaygın bağlantı sorunlarının giderilmesi
  - Host yapılandırması için güvenlik en iyi uygulamaları

- **13-mcp-inspector/README.md**: MCP Inspector için yeni hata ayıklama rehberi
  - Kurulum yöntemleri (npx, npm global, kaynak koddan)
  - stdio ve HTTP/SSE üzerinden sunuculara bağlanma
  - Test araçları, kaynaklar ve istem akışları
  - MCP Inspector ile VS Code entegrasyonu
  - Yaygın hata ayıklama senaryoları ve çözümleri

**Modül 04 - Pratik Uygulama**
- **pagination/README.md**: Yeni sayfalama uygulama rehberi
  - Python, TypeScript, Java'da imleç tabanlı sayfalama desenleri
  - İstemci tarafında sayfalama yönetimi
  - İmleç tasarım stratejileri (opak vs yapılandırılmış)
  - Performans optimizasyonu önerileri

**Modül 05 - Gelişmiş Konular**
- **mcp-protocol-features/README.md**: Yeni protokol özellikleri derinlemesine inceleme
  - İlerleme bildirimleri uygulaması
  - İstek iptali desenleri
  - URI desenli kaynak şablonları
  - Sunucu yaşam döngüsü yönetimi
  - Günlük seviyesi kontrolü
  - JSON-RPC kodları ile hata yönetimi desenleri

#### Navigasyon Düzeltmeleri (24+ dosya güncellendi)

**Ana Modül README'leri**  
Artık hem ilk derse hem de sonraki modüle bağlantı veriyor

**02-Security Alt dosyaları**  
Tüm 5 ek güvenlik dokümanı artık "Sonraki Adım" navigasyonuna sahip:

**09-CaseStudy Dosyaları**  
Tüm vaka çalışması dosyaları sıralı navigasyona sahip:

**10-StreamliningAI Laboratuvarları**  
Modül 10 genel bakış ve Modül 11 için Sonraki Adım bölümü eklendi

#### Kod ve İçerik Düzeltmeleri

**SDK ve Bağımlılık Güncellemeleri**  
Boş openai sürümü `^4.95.0` olarak düzeltildi  
SDK `^1.8.0`'den `>=1.26.0`'a güncellendi  
mcp sürüm sabitleri `>=1.26.0` olarak güncellendi

**Kod Düzeltmeleri**  
Geçersiz model `gpt-4o-mini` `gpt-4.1-mini` olarak düzeltildi

**İçerik Düzeltmeleri**  
Kırık link `READMEmd` → `README.md` olarak düzeltildi, müfredat başlığı `Modül 1-3` → `Modül 0-3` olarak düzeltildi, büyük/küçük harf duyarlı yol düzeltildi  
Bozuk ve yinelenen Vaka Çalışması 5 içeriği kaldırıldı

**Yeni Başlayanlar için Rehberlik İyileştirmeleri**  
Yeni başlayanlar için uygun giriş, öğrenme hedefleri ve önkoşullar eklendi

#### Müfredat Güncellemeleri

**Ana README.md**  
Müfredat tablosuna 3.12 (MCP Hosts), 3.13 (MCP Inspector), 4.1 (Pagination), 5.16 (Protokol Özellikleri) girdileri eklendi

**Modül README'leri**  
Ders listesine 12 ve 13 numaralı dersler eklendi  
Sayfalama bağlantısıyla Pratik Kılavuzlar bölümü eklendi  
5.15 (Özel Taşıma) ve 5.16 (Protokol Özellikleri) dersleri eklendi

**study_guide.md**  
Tüm yeni konularla birlikte zihin haritası güncellendi: MCP Hosts Kurulumu, MCP Inspector, Sayfalama Stratejileri, Protokol Özellikleri Derinlemesine

## 28 Ocak 2026

### MCP Spesifikasyonu 2025-11-25 Uyum İncelemesi

#### Temel Kavramların Geliştirilmesi (01-CoreConcepts/)  
- **Yeni İstemci Temeli - Roots**: Dosya sistemi sınırlarını ve erişim izinlerini anlamaları için sunuculara Roots istemci temeli hakkında kapsamlı dokümantasyon eklendi  
- **Araç Notasyonları**: Araç davranış notasyonları (`readOnlyHint`, `destructiveHint`) ile ilgili dokümantasyon eklendi, araç yürütme kararlarını iyileştirmek için  
- **Örnekleme İçin Araç Çağrısı**: Örnekleme dokümantasyonu, örnekleme isteklerinde model tabanlı araç çağrısı için `tools` ve `toolChoice` parametreleri ile güncellendi  
- **URL Modu Dışa Yönlendirme**: Sunucu kaynaklı harici web etkileşimleri için URL tabanlı tetikleme dokümantasyonu eklendi  
- **Görevler (Deneysel)**: Dayanıklı yürütme sarmalayıcıları ve ertelenmiş sonuç alma için yeni deneysel Görevler özelliği dokümantasyonu eklendi  
- **Simge Desteği**: Araçlar, kaynaklar, kaynak şablonları ve istemler artık ek meta veri olarak simgeler içerebilir

#### Dokümantasyon Güncellemeleri  
- **README.md**: MCP Spesifikasyonu 2025-11-25 sürüm referansı ve tarih bazlı sürüm açıklaması eklendi  
- **study_guide.md**: Müfredat haritası, Görevler ve Araç Notasyonları Temel Kavramlar bölümüne eklendi; belge zaman damgası güncellendi  

#### Spesifikasyon Uyum Doğrulaması  
- **Protokol Sürümü**: Tüm dokümantasyonun güncel MCP Spesifikasyonu 2025-11-25 sürümünü referans verdiği doğrulandı  
- **Mimari Hizalama**: İki katmanlı mimari (Veri Katmanı + Taşıma Katmanı) dokümantasyon doğruluğu onaylandı  
- **Temeller Dokümantasyonu**: Sunucu temelleri (Kaynaklar, İstemler, Araçlar) ve istemci temelleri (Örnekleme, Tetikleme, Günlükleme, Roots) doğrulandı  
- **Taşıma Mekanizmaları**: STDIO ve Akışlanabilir HTTP taşıma dokümantasyonu doğruluğu kontrol edildi  
- **Güvenlik Rehberi**: Güncel MCP Güvenlik En İyi Uygulamaları dokümantasyonu ile uyum sağlandı  

#### MCP 2025-11-25 Temel Özellikleri Belgelendi  
- **OpenID Connect Keşfi**: OIDC aracılığıyla kimlik doğrulama sunucusu keşfi  
- **OAuth İstemci ID Meta Veri Belgeleri**: Önerilen istemci kayıt mekanizması  
- **JSON Şeması 2020-12**: MCP şema tanımları için varsayılan lehçe  
- **SDK Katmanlama Sistemi**: SDK özellik desteği ve bakımı için resmi gereksinimler  
- **Yönetim Yapısı**: MCP yönetiminde Çalışma Grupları ve İlgi Grupları resmileştirildi

### Güvenlik Dokümantasyonu Ana Güncellemesi (02-Security/)

#### MCP Güvenlik Zirvesi Atölyesi (Sherpa) Entegrasyonu  
- **Yeni Uygulamalı Eğitim Kaynağı**: Tüm güvenlik dokümantasyonunda [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/) kapsamlı entegrasyonu eklendi  
- **Sefer Rotası Kapsamı**: Base Camp’den Zirve’ye kamp-kamp geçiş süreci tüm detaylarıyla belgelendi  
- **OWASP Hizalaması**: Tüm güvenlik rehberliği artık OWASP MCP Azure Güvenlik Rehberi risklerine göre haritalandı  

#### OWASP MCP Top 10 Entegrasyonu  
- **Yeni Bölüm**: Ana Güvenlik README'sine OWASP MCP Top 10 Güvenlik Riskleri tablosu ve Azure hafifletme yöntemleri eklendi  
- **Risk Bazlı Dokümantasyon**: mcp-security-controls-2025.md, OWASP MCP risk referansları ile (MCP01-MCP08) güncellendi  
- **Referans Mimari**: OWASP MCP Azure Güvenlik Rehberi referans mimarisi ve uygulama desenlerine bağlantılar eklendi  

#### Güncellenen Güvenlik Dosyaları  
- **README.md**: Sherpa Atölyesi genel bakışı, sefer rotası tablosu, OWASP MCP Top 10 risk özeti ve uygulamalı eğitim bölümü eklendi  
- **mcp-security-controls-2025.md**: Üst bilgi Şubat 2026’ya güncellendi, OWASP risk referansları eklendi (MCP01-MCP08), spesifikasyon sürüm tutarsızlığı düzeltildi  
- **mcp-security-best-practices-2025.md**: Sherpa ve OWASP kaynakları bölümü eklendi; zaman damgası güncellendi  
- **mcp-best-practices.md**: Sherpa ve OWASP bağlantıları ile uygulamalı eğitim bölümü eklendi  
- **azure-content-safety-implementation.md**: OWASP MCP06 referansı, Sherpa Kamp 3 hizalaması ve ek kaynaklar bölümü eklendi  

#### Yeni Kaynak Bağlantıları Eklendi  
- [MCP Güvenlik Zirvesi Atölyesi (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Güvenlik Rehberi](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Bireysel OWASP MCP risk sayfaları (MCP01-MCP10)  

### Müfredat Genelinde MCP Spesifikasyonu 2025-11-25 Hizalaması

#### Modül 03 - Başlarken  
- **SDK Dokümantasyonu**: Go SDK resmi SDK listesine eklendi; tüm SDK referansları MCP Spesifikasyonu 2025-11-25 ile uyumlu hale getirildi  
- **Taşıma Açıklaması**: STDIO ve HTTP Akış taşıma açıklamaları açık spesifikasyon referansları ile güncellendi  

#### Modül 04 - Pratik Uygulama  
- **SDK Güncellemeleri**: Go SDK eklendi; SDK listesi, spesifikasyon sürüm referansı ile güncellendi  
- **Yetkilendirme Spesifikasyonu**: MCP Yetkilendirme spesifikasyon bağlantısı güncel 2025-11-25 sürümüne güncellendi  

#### Modül 05 - Gelişmiş Konular  
- **Yeni Özellikler**: MCP Spesifikasyonu 2025-11-25 dört yeni özelliği (Görevler, Araç Notasyonları, URL Modu Tetiklemesi, Roots) hakkında not eklendi  
- **Güvenlik Kaynakları**: OWASP MCP Top 10 ve Sherpa atölyesi bağlantıları ek kaynaklara eklendi  

#### Modül 06 - Topluluk Katkıları  
- **SDK Listesi**: Swift ve Rust SDK’ları eklendi; spesifikasyon bağlantısı 2025-11-25 sürümüne güncellendi  
- **Spesifikasyon Referansı**: MCP Spesifikasyon linki doğrudan spesifikasyon URL'si olarak güncellendi  

#### Modül 07 - Erken Benimsemeden Dersler  
- **Kaynak Güncellemeleri**: MCP Spesifikasyonu 2025-11-25 ve OWASP MCP Top 10 ek kaynaklara eklendi  

#### Modül 08 - En İyi Uygulamalar  
- **Spesifikasyon Sürümü**: MCP Spesifikasyonu referansı 2025-11-25 olarak güncellendi  
- **Güvenlik Kaynakları**: OWASP MCP Top 10 ve Sherpa atölyesi ek kaynaklara eklendi  

#### Modül 10 - AI İş Akışlarını Kolaylaştırma  
- **Rozet Güncellemesi**: MCP sürüm rozeti SDK sürümünden (1.9.3) spesifikasyon sürümüne (2025-11-25) değiştirildi  
- **Kaynak Bağlantıları**: MCP Spesifikasyonu bağlantısı güncellendi; OWASP MCP Top 10 eklendi  

#### Modül 11 - MCP Sunucu Uygulamalı Laboratuvarları  
- **Spesifikasyon Referansı**: MCP Spesifikasyonu bağlantısı 2025-11-25 sürümüne güncellendi  
- **Güvenlik Kaynakları**: Resmi kaynaklara OWASP MCP Top 10 eklendi  

## 18 Aralık 2025

### Güvenlik Dokümantasyonu Güncellemesi - MCP Spesifikasyonu 2025-11-25

#### MCP Güvenlik En İyi Uygulamaları (02-Security/mcp-best-practices.md) - Spesifikasyon Sürümü Güncellemesi  
- **Protokol Sürümü Güncellemesi**: En yeni MCP Spesifikasyonu 2025-11-25 (25 Kasım 2025’te yayımlandı) referans alındı  
  - Tüm spesifikasyon sürüm referansları 2025-06-18’den 2025-11-25’e güncellendi  
  - Belge tarih referansları 18 Ağustos 2025’den 18 Aralık 2025’e güncellendi  
  - Tüm spesifikasyon URL’lerinin güncel dokümantasyona işaret ettiği doğrulandı  
- **İçerik Doğrulaması**: Güncel standartlara göre güvenlik en iyi uygulamaları kapsamlı şekilde doğrulandı  
  - **Microsoft Güvenlik Çözümleri**: Prompt Shields (önceki adıyla "Jailbreak risk tespiti"), Azure İçerik Güvenliği, Microsoft Entra ID ve Azure Key Vault için güncel terimler ve bağlantılar doğrulandı  
  - **OAuth 2.1 Güvenliği**: En son OAuth güvenlik uygulamalarına uyum doğrulandı  
  - **OWASP Standartları**: LLM’ler için OWASP Top 10 referanslarının güncel olduğu onaylandı  
  - **Azure Hizmetleri**: Tüm Microsoft Azure dokümantasyon bağlantıları ve en iyi uygulamalar doğrulandı  
- **Standartlarla Uyum**: Referans verilen tüm güvenlik standartları güncel  
  - NIST AI Risk Yönetim Çerçevesi  
  - ISO 27001:2022  
  - OAuth 2.1 Güvenlik En İyi Uygulamaları  
  - Azure güvenlik ve uyumluluk çerçeveleri  
- **Uygulama Kaynakları**: Tüm uygulama kılavuzları bağlantıları ve kaynaklar doğrulandı  
  - Azure API Yönetimi kimlik doğrulama desenleri  
  - Microsoft Entra ID entegrasyon kılavuzları  
  - Azure Key Vault gizli yönetimi  
  - DevSecOps boru hattı ve izleme çözümleri  

### Dokümantasyon Kalite Güvencesi  
- **Spesifikasyon Uyumu**: Tüm zorunlu MCP güvenlik gereksinimlerinin (MUST/MUST NOT) en son spesifikasyonla uyumu sağlandı  
- **Kaynak Güncelliği**: Microsoft dokümantasyonu, güvenlik standartları ve uygulama kılavuzları için tüm dış bağlantılar doğrulandı  
- **En İyi Uygulamalar Kapsamı**: Kimlik doğrulama, yetkilendirme, yapay zeka özel tehditler, tedarik zinciri güvenliği ve kurumsal desenler kapsamı doğrulandı  

## 6 Ekim 2025

### Başlarken Bölümü Genişletildi – Gelişmiş Sunucu Kullanımı & Basit Kimlik Doğrulama

#### Gelişmiş Sunucu Kullanımı (03-GettingStarted/10-advanced)  
- **Yeni Bölüm Eklendi**: Hem düzenli hem düşük seviyeli sunucu mimarilerini kapsayan kapsamlı gelişmiş MCP sunucu kullanımı rehberi tanıtıldı.  
  - **Düzenli ve Düşük Seviyeli Sunucu**: Her iki yaklaşım için Python ve TypeScript kod örnekleri ile detaylı karşılaştırma  
  - **Handler Tabanlı Tasarım**: Ölçeklenebilir, esnek sunucu uygulamaları için handler tabanlı araç/kaynak/istem yönetimi açıklaması  
  - **Pratik Desenler**: Gelişmiş özellikler ve mimari için düşük seviyeli sunucu desenlerinin gerçek dünyada kullanımı  

#### Basit Kimlik Doğrulama (03-GettingStarted/11-simple-auth)  
- **Yeni Bölüm Eklendi**: MCP sunucularında basit kimlik doğrulama uygulaması için adım adım rehber  
  - **Kimlik Doğrulama Kavramları**: Kimlik doğrulama ve yetkilendirme açıklaması, kimlik bilgisi yönetimi  
  - **Temel Kimlik Doğrulama Uygulaması**: Python (Starlette) ve TypeScript (Express) için ara yazılım tabanlı kimlik doğrulama desenleri, kod örnekleri ile  
  - **Gelişmiş Güvenliğe Geçiş**: Basit kimlik doğrulama ile başlayıp OAuth 2.1 ve RBAC’a geçiş rehberi, gelişmiş güvenlik modüllerine referanslar  

Bu eklemeler, gelişmiş üretim desenleri ile temel kavramlar arasında köprü kurarak daha sağlam, güvenli ve esnek MCP sunucu uygulamaları oluşturmak için pratik ve uygulamalı rehberlik sağlar.

## 29 Eylül 2025

### MCP Sunucu Veritabanı Entegrasyon Laboratuvarları - Kapsamlı Uygulamalı Öğrenme Yolu

#### 11-MCPServerHandsOnLabs - Yeni Tam Veritabanı Entegrasyon Müfredatı
- **Tam 13-Lab Öğrenme Yolu**: PostgreSQL veritabanı entegrasyonlu üretime hazır MCP sunucuları oluşturmak için kapsamlı uygulamalı müfredat eklendi
  - **Gerçek Dünya Uygulaması**: Kurumsal düzeyde kalıpları gösteren Zava Retail analitik kullanım senaryosu
  - **Yapılandırılmış Öğrenme İlerlemesi**:
    - **Lab 00-03: Temeller** - Giriş, Temel Mimari, Güvenlik & Çoklu Kiracı, Ortam Kurulumu
    - **Lab 04-06: MCP Sunucusunun İnşası** - Veritabanı Tasarımı & Şeması, MCP Sunucu Uygulaması, Araç Geliştirme  
    - **Lab 07-09: İleri Özellikler** - Anlamsal Arama Entegrasyonu, Test & Hata Ayıklama, VS Code Entegrasyonu
    - **Lab 10-12: Üretim & En İyi Uygulamalar** - Dağıtım Stratejileri, İzleme & Gözlemlenebilirlik, En İyi Uygulamalar & Optimizasyon
  - **Kurumsal Teknolojiler**: FastMCP çerçevesi, pgvector destekli PostgreSQL, Azure OpenAI gömme, Azure Container Apps, Application Insights
  - **İleri Özellikler**: Satır Düzeyi Güvenlik (RLS), anlamsal arama, çoklu kiracı veri erişimi, vektör gömme, gerçek zamanlı izleme

#### Terminoloji Standardizasyonu - Modülden Laba Dönüşüm
- **Kapsamlı Dokümantasyon Güncellemesi**: 11-MCPServerHandsOnLabs içerisindeki tüm README dosyalarında “Modül” yerine “Lab” terimi sistematik olarak güncellendi
  - **Bölüm Başlıkları**: Tüm 13 laboratuvarda "This Module Covers" başlığı "This Lab Covers" olarak değiştirildi
  - **İçerik Açıklaması**: Dokümantasyon boyunca "This module provides..." ifadesi "This lab provides..." olarak değiştirildi
  - **Öğrenme Hedefleri**: "By the end of this module..." ifadeleri "By the end of this lab..." olarak güncellendi
  - **Navigasyon Bağlantıları**: Tüm "Module XX:" referansları çapraz referanslar ve navigasyonda "Lab XX:" olarak dönüştürüldü
  - **Tamamlama Takibi**: "After completing this module..." ifadeleri "After completing this lab..." yaptı
  - **Teknik Referanslar Korundu**: Yapılandırma dosyalarındaki Python modül referansları (ör. `"module": "mcp_server.main"`) değişmeden bırakıldı

#### Çalışma Kılavuzu Geliştirmesi (study_guide.md)
- **Görsel Müfredat Haritası**: Yeni "11. Database Integration Labs" bölümü ile kapsamlı laboratuvar yapısı görselleştirmesi eklendi
- **Depo Yapısı**: On bölümden on bir bölüme çıkarılarak detaylı 11-MCPServerHandsOnLabs açıklaması güncellendi
- **Öğrenme Yolu Rehberi**: 00-11 bölümlerini kapsayacak şekilde navigasyon talimatları geliştirildi
- **Teknoloji Kapsamı**: FastMCP, PostgreSQL, Azure servis entegrasyon detayları eklendi
- **Öğrenme Kazanımları**: Üretime hazır sunucu geliştirme, veritabanı entegrasyon kalıpları ve kurumsal güvenlik vurgulandı

#### Ana README Yapısı Geliştirmesi
- **Lab Tabanlı Terminoloji**: 11-MCPServerHandsOnLabs ana README.md dosyasında "Lab" yapısı tutarlı şekilde kullanıldı
- **Öğrenme Yolu Organizasyonu**: Temel kavramlardan ileri uygulamaya ve üretim dağıtımına kadar net ilerleme sağlandı
- **Gerçek Dünya Odaklılık**: Kurumsal kalıplar ve teknolojilerle pratik, uygulamalı öğrenme ön planda

### Dokümantasyon Kalitesi & Tutarlılık İyileştirmeleri
- **Uygulamalı Öğrenme Vurgusu**: Dokümantasyon boyunca uygulamalı, lab tabanlı yaklaşım güçlendirildi
- **Kurumsal Kalıp Odaklılık**: Üretime hazır uygulamalar ve kurumsal güvenlik yaklaşımları öne çıkarıldı
- **Teknoloji Entegrasyonu**: Modern Azure servisleri ve yapay zeka entegrasyon kalıplarının kapsamlı işlenmesi
- **Öğrenme İlerlemesi**: Temel kavramlardan üretime net, yapılandırılmış bir yol

## 26 Eylül 2025

### Vaka Çalışmaları Geliştirmesi - GitHub MCP Registry Entegrasyonu

#### Vaka Çalışmaları (09-CaseStudy/) - Ekosistem Geliştirme Odaklı
- **README.md**: Kapsamlı GitHub MCP Registry vaka çalışması ile büyük genişletme
  - **GitHub MCP Registry Vaka Çalışması**: Eylül 2025'te GitHub’ın MCP Registry lansmanını detaylı inceleyen kapsamlı vaka çalışması
    - **Problem Analizi**: Parçalanmış MCP sunucu keşfi ve dağıtım zorluklarının ayrıntılı incelenmesi
    - **Çözüm Mimarisi**: GitHub’ın merkezi kayıt yaklaşımı ve tek tıkla VS Code kurulum deneyimi
    - **İş Etkisi**: Geliştirici onboarding ve verimlilikte ölçülebilir iyileşmeler
    - **Stratejik Değer**: Modüler ajan dağıtımı ve araçlar arası birlikte çalışabilirlik odaklılık
    - **Ekosistem Geliştirme**: Ajan tabanlı entegrasyonlar için temel platform pozisyonlanması
  - **Geliştirilmiş Vaka Çalışması Yapısı**: Yedi vaka çalışmasının tamamı tutarlı formatta ve kapsamlı açıklamalarla güncellendi
    - Azure AI Seyahat Ajanları: Çoklu ajan orkestrasyon vurgusu
    - Azure DevOps Entegrasyonu: İş akışı otomasyonu odağı
    - Gerçek Zamanlı Dokümantasyon Getirme: Python konsol istemcisi uygulaması
    - İnteraktif Çalışma Planı Üretici: Chainlit konuşma web uygulaması
    - Editör İçi Dokümantasyon: VS Code ve GitHub Copilot entegrasyonu
    - Azure API Yönetimi: Kurumsal API entegrasyon kalıpları
    - GitHub MCP Registry: Ekosistem geliştirme ve topluluk platformu
  - **Kapsamlı Sonuç**: Çok boyutlu MCP uygulama alanlarını kapsayan yedi vaka çalışmasına vurgu yapan yeniden yazılmış sonuç bölümü
    - Kurumsal Entegrasyon, Çoklu Ajan Orkestrasyonu, Geliştirici Verimliliği
    - Ekosistem Geliştirme, Eğitimsel Uygulamalar kategorileri
    - Mimari kalıplar, uygulama stratejileri ve en iyi uygulamalara detaylı bakış
    - MCP’nin olgun, üretime hazır protokol olarak önemi

#### Çalışma Kılavuzu Güncellemeleri (study_guide.md)
- **Görsel Müfredat Haritası**: Vaka Çalışmaları bölümüne GitHub MCP Registry eklendi
- **Vaka Çalışmaları Açıklaması**: Genel açıklamalardan yedi kapsamlı vaka çalışmasının ayrıntılı dökümüne yükseltildi
- **Depo Yapısı**: 10. bölüm kapsamlı vaka çalışması detaylarıyla güncellendi
- **Değişiklik Günlüğü Entegrasyonu**: 26 Eylül 2025 girdisi eklendi; GitHub MCP Registry katkısı ve vaka çalışması geliştirmeleri dokümante edildi
- **Tarih Güncellemeleri**: Alt bilgi zaman damgası 26 Eylül 2025 olarak yenilendi

### Dokümantasyon Kalite İyileştirmeleri
- **Tutarlılık Geliştirmesi**: Tüm yedi örnekte vaka çalışması biçimlendirmesi ve yapısı standartlaştırıldı
- **Kapsamlı Kapsama**: Vaka çalışmaları artık kurumsal, geliştirici verimliliği ve ekosistem gelişimi senaryolarını kapsıyor
- **Stratejik Konumlandırma**: MCP’nin ajan bazlı sistem konuşlandırması için temel platform olarak vurgusu güçlendirildi
- **Kaynak Entegrasyonu**: İlave kaynaklarda GitHub MCP Registry bağlantısı eklendi

## 15 Eylül 2025

### İleri Konular Genişlemesi - Özel Taşıyıcılar & Bağlam Mühendisliği

#### MCP Özel Taşıyıcılar (05-AdvancedTopics/mcp-transport/) - Yeni İleri Uygulama Rehberi
- **README.md**: Özel MCP taşıyıcı mekanizmaları için kapsamlı uygulama rehberi
  - **Azure Event Grid Taşıyıcısı**: Kapsamlı sunucusuz olay tabanlı taşıyıcı uygulaması
    - Azure Functions entegrasyonlu C#, TypeScript ve Python örnekleri
    - Ölçeklenebilir MCP çözümleri için olay-temelli mimari kalıpları
    - Webhook alıcıları ve push tabanlı mesaj işleme
  - **Azure Event Hubs Taşıyıcısı**: Yüksek verimli akış taşıyıcı uygulaması
    - Düşük gecikmeli senaryolar için gerçek zamanlı akış yetenekleri
    - Bölümlendirme stratejileri ve checkpoint yönetimi
    - Mesaj toplama ve performans optimizasyonu
  - **Kurumsal Entegrasyon Kalıpları**: Üretime hazır mimari örnekler
    - Çoklu Azure Functions arasında dağıtık MCP işleme
    - Karma taşıyıcı mimarileri ve birden fazla taşıyıcı türünün birleşimi
    - Mesaj dayanıklılığı, güvenilirlik ve hata işleme stratejileri
  - **Güvenlik & İzleme**: Azure Key Vault entegrasyonu ve gözlemlenebilirlik kalıpları
    - Yönetilen kimlik kimlik doğrulaması ve en az ayrıcalık erişimi
    - Application Insights telemetri ve performans izleme
    - Devre kesiciler ve hata toleransı kalıpları
  - **Test Çerçeveleri**: Özel taşıyıcılar için kapsamlı test stratejileri
    - Test double ve mocking ile birim testi
    - Azure Test Containers ile entegrasyon testi
    - Performans ve yük testi değerlendirmeleri

#### Bağlam Mühendisliği (05-AdvancedTopics/mcp-contextengineering/) - Yükselen Yapay Zeka Disiplini
- **README.md**: Bağlam mühendisliğinin yükselen alanı olarak kapsamlı keşfi
  - **Temel İlkeler**: Tam bağlam paylaşımı, hareket kararı farkındalığı ve bağlam penceresi yönetimi
  - **MCP Protokol Uyumu**: MCP tasarımının bağlam mühendisliği zorluklarına yanıtı
    - Bağlam pencere sınırları ve kademeli yükleme stratejileri
    - Alakalı bağlam belirleme ve dinamik bağlam getirme
    - Çok modlu bağlam işleme ve güvenlik hususları
  - **Uygulama Yaklaşımları**: Tek iş parçacıklı ve çoklu ajan mimarileri
    - Bağlam parçalama ve önceliklendirme teknikleri
    - Kademeli bağlam yükleme ve sıkıştırma stratejileri
    - Katmanlı bağlam yaklaşımları ve getirme optimizasyonu
  - **Ölçüm Çerçevesi**: Bağlam etkinliği değerlendirmesi için gelişmekte olan metrikler
    - Girdi verimliliği, performans, kalite ve kullanıcı deneyimi değerlendirmeleri
    - Bağlam optimizasyonu için deneysel yaklaşımlar
    - Hata analizi ve iyileştirme metodolojileri

#### Müfredat Navigasyon Güncellemeleri (README.md)
- **Geliştirilmiş Modül Yapısı**: Müfredat tablosu yeni ileri konuları kapsayacak şekilde güncellendi
  - Bağlam Mühendisliği (5.14) ve Özel Taşıyıcı (5.15) girişleri eklendi
  - Tüm modüllerde tutarlı biçimlendirme ve navigasyon bağlantıları
  - Güncel içerik kapsamı yansıtıldı

### Dizin Yapısı İyileştirmeleri
- **İsimlendirme Standardizasyonu**: "mcp transport" klasörü diğer ileri konu klasörleriyle uyum için "mcp-transport" olarak yeniden adlandırıldı
- **İçerik Organizasyonu**: Tüm 05-AdvancedTopics klasörleri mcp-[konu] isimlendirme kalıbına uydu

### Dokümantasyon Kalite İyileştirmeleri
- **MCP Spesifikasyon Uyumu**: Tüm yeni içerikler MCP Spesifikasyonu 2025-06-18 referans alınarak hazırlandı
- **Çok Dilli Örnekler**: C#, TypeScript ve Python’da kapsamlı kod örnekleri
- **Kurumsal Odak**: Üretime hazır kalıplar ve Azure bulut entegrasyonları
- **Görsel Dokümantasyon**: Mimari ve akış görselleştirmeleri için Mermaid diyagramları

## 18 Ağustos 2025

### Dokümantasyon Kapsamlı Güncellemesi - MCP 2025-06-18 Standartları

#### MCP Güvenlik En İyi Uygulamaları (02-Security/) - Tam Modernizasyon
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: MCP Spesifikasyonu 2025-06-18’e tam uyumlu yeniden yazım
  - **Zorunlu Gereksinimler**: Resmî spesifikasyondan açıkça belirtilen MUST/MUST NOT gereklilikleri ve görsel gösterimler eklendi
  - **12 Temel Güvenlik Uygulaması**: 15 maddelik listeden kapsamlı güvenlik alanlarına yeniden yapılandırıldı
    - Harici kimlik sağlayıcı entegrasyonlu Token Güvenliği & Kimlik Doğrulama
    - Kriptografik gerekliliklerle Oturum Yönetimi & Taşıma Güvenliği
    - Microsoft Prompt Shields entegrasyonlu AI Özel Tehdit Koruması
    - En az ayrıcalık prensibi ile Erişim Kontrolü & İzinler
    - Azure Content Safety entegrasyonlu İçerik Güvenliği & İzleme
    - Kapsamlı bileşen doğrulaması ile Tedarik Zinciri Güvenliği
    - PKCE uygulamalı OAuth Güvenliği & Confused Deputy Önleme
    - Otomatikleştirilmiş Olay Müdahalesi & Kurtarma
    - Düzenleyici uyumla Uyumluluk & Yönetişim
    - Sıfır güven mimarisiyle Gelişmiş Güvenlik Kontrolleri
    - Kapsamlı Microsoft Güvenlik Ekosistemi entegrasyonu
    - Sürekli Güvenlik Evrimi ile uyarlanabilir uygulamalar
  - **Microsoft Güvenlik Çözümleri**: Prompt Shields, Azure Content Safety, Entra ID ve GitHub Advanced Security’nin geliştirilmiş entegrasyon rehberleri
  - **Uygulama Kaynakları**: Resmî MCP Dokümantasyonu, Microsoft Güvenlik Çözümleri, Güvenlik Standartları ve Uygulama Kılavuzları kategorilerine ayrılmış kapsamlı bağlantılar

#### İleri Güvenlik Kontrolleri (02-Security/) - Kurumsal Uygulama
- **MCP-SECURITY-CONTROLS-2025.md**: Kurumsal seviyede güvenlik çerçevesi ile kapsamlı revize
  - **9 Kapsamlı Güvenlik Alanı**: Temel kontrol listesinden ayrıntılı kurumsal çerçeveye genişletildi
    - Microsoft Entra ID entegrasyonlu Gelişmiş Kimlik Doğrulama & Yetkilendirme
    - Kapsamlı doğrulama ile Token Güvenliği & Anti-Passthrough Kontrolleri
    - Kaçırma önlemeli Oturum Güvenlik Kontrolleri
    - Prompt enjeksiyonu ve araç zehirlenmesi önlemeli AI Özel Güvenlik Kontrolleri
    - OAuth proxy güvenliği ile Confused Deputy Saldırısı Önleme
    - Sandbox ve izolasyonlu Araç Çalıştırma Güvenliği
    - Bağımlılık doğrulamalı Tedarik Zinciri Güvenlik Kontrolleri
    - SIEM entegrasyonlu İzleme & Tespit Kontrolleri
    - Otomatikleştirilmiş Olay Müdahalesi & Kurtarma
  - **Uygulama Örnekleri**: Detaylı YAML konfigürasyon blokları ve kod örnekleri eklendi
  - **Microsoft Çözümleri Entegrasyonu**: Azure güvenlik servisleri, GitHub Advanced Security ve kurumsal kimlik yönetimi kapsamlı işlenmiş

#### İleri Konular Güvenliği (05-AdvancedTopics/mcp-security/) - Üretime Hazır Uygulama
- **README.md**: Kurumsal güvenlik uygulaması için tam yeniden yazım
  - **Güncel Spesifikasyon Uyumu**: MCP Spesifikasyonu 2025-06-18 ve zorunlu güvenlik gereksinimleri ile güncel
  - **Geliştirilmiş Kimlik Doğrulama**: Microsoft Entra ID entegrasyonu ve kapsamlı .NET ile Java Spring Security örnekleri
  - **AI Güvenliği Entegrasyonu**: Microsoft Prompt Shields ve Azure Content Safety detaylı Python örnekleriyle uygulandı
  - **Gelişmiş Tehdit Azaltma**: 
    - PKCE ve kullanıcı onayı doğrulaması ile Confused Deputy Önleme
    - Hedef kitle doğrulama ve güvenli token yönetimi ile Token Passthrough Önleme
    - Kriptografik bağlama ve davranış analizi ile Oturum Kaçırma Önleme
  - **Kurumsal Güvenlik Entegrasyonu**: Azure Application Insights izleme, tehdit algılama boru hatları ve tedarik zinciri güvenliği
  - **Uygulama Kontrol Listesi**: Zorunlu ve önerilen güvenlik kontrolleri açıkça ayrılmış; Microsoft güvenlik ekosistemi faydaları vurgulanmış

### Dokümantasyon Kalitesi & Standart Uyumu
- **Spesifikasyon Referansları**: Tüm referanslar MCP Spesifikasyonu 2025-06-18 olarak güncellendi
- **Microsoft Güvenlik Ekosistemi**: Tüm güvenlik dökümanlarında entegrasyon rehberi güçlendirildi
- **Pratik Uygulama**: .NET, Java ve Python’da kurumsal desenlerle detaylı kod örnekleri eklendi
- **Kaynak Organizasyonu**: Resmî dokümantasyon, güvenlik standartları ve uygulama rehberleri kategorilerine ayrıldı
- **Görsel Göstergeler**: Zorunlu gereksinimler ve önerilen uygulamalar net işaretlendi

#### Temel Kavramlar (01-CoreConcepts/) - Tam Modernizasyon
- **Protokol Sürüm Güncellemesi**: Güncel MCP Spesifikasyonu 2025-06-18 tarih kodlu versiyon referanslandı
- **Mimari İyileştirme**: Host, İstemci ve Sunucu tanımları güncel MCP mimari kalıplarını yansıtacak şekilde geliştirildi
  - Hostlar artık birden çok MCP istemci bağlantısını koordine eden Yapay Zeka uygulamaları olarak net bir şekilde tanımlandı
  - İstemciler, bire bir sunucu ilişkilerini sürdüren protokol bağlantılayıcıları olarak tanımlandı
  - Sunucular yerel ve uzak dağıtım senaryolarıyla geliştirildi
- **Temel Yeniden Yapılandırma**: Sunucu ve istemci temel öğelerinin tamamen elden geçirilmesi
  - Sunucu Temelleri: Kaynaklar (veri kaynakları), İstemler (şablonlar), Araçlar (çalıştırılabilir fonksiyonlar) ayrıntılı açıklamalar ve örneklerle
  - İstemci Temelleri: Örnekleme (LLM tamamlamaları), Bilgi Toplama (kullanıcı girişi), Günlükleme (hata ayıklama/izleme)
  - Güncel keşif (`*/list`), getirme (`*/get`) ve yürütme (`*/call`) yöntem kalıpları ile güncellendi
- **Protokol Mimarisi**: İki katmanlı mimari modeli tanıtıldı
  - Veri Katmanı: JSON-RPC 2.0 temeli ile yaşam döngüsü yönetimi ve temel öğeler
  - Taşıma Katmanı: STDIO (yerel) ve SSE destekli Streamable HTTP (uzak) taşıma mekanizmaları
- **Güvenlik Çerçevesi**: Açık kullanıcı onayı, veri gizliliği koruması, araç yürütme güvenliği ve taşıma katmanı güvenliği dahil olmak üzere kapsamlı güvenlik ilkeleri
- **İletişim Kalıpları**: Protokol mesajları başlatma, keşif, yürütme ve bildirim akışlarını gösterecek şekilde güncellendi
- **Kod Örnekleri**: Çoklu dil örnekleri (.NET, Java, Python, JavaScript) güncel MCP SDK kalıplarını yansıtacak şekilde yenilendi

#### Güvenlik (02-Security/) - Kapsamlı Güvenlik Güncellemesi  
- **Standartlara Uyum**: MCP Spesifikasyonu 2025-06-18 güvenlik gereksinimleriyle tam uyum
- **Kimlik Doğrulama Evrimi**: Özel OAuth sunucularından dış kimlik sağlayıcı vekaletine (Microsoft Entra ID) evrim dokümantasyonu
- **Yapay Zeka Özel Tehdit Analizi**: Modern yapay zeka saldırı vektörleri kapsamının genişletilmesi
  - Gerçek dünya örnekleriyle ayrıntılı istem enjeksiyonu saldırı senaryoları
  - Araç zehirlenme mekanizmaları ve "halı çekme" saldırı kalıpları
  - Bağlam penceresi zehirlenmesi ve model kafa karıştırma saldırıları
- **Microsoft AI Güvenlik Çözümleri**: Microsoft güvenlik ekosisteminin kapsamlı ele alınması
  - Gelişmiş algılama, vurgulama ve ayırıcı tekniklere sahip AI İstem Kalkanları
  - Azure İçerik Güvenliği entegrasyon kalıpları
  - Tedarik zinciri koruması için GitHub Gelişmiş Güvenlik
- **Gelişmiş Tehdit Hafifletme**: Ayrıntılı güvenlik kontrolleri
  - MCP’ye özgü saldırı senaryoları ve kriptografik oturum kimliği gereksinimleri ile oturum kaçırma
  - MCP proxy senaryolarında kafası karışmış vekil sorunları ve açık onay gereksinimleri
  - Zorunlu doğrulama kontrolleri ile token geçişi açıkları
- **Tedarik Zinciri Güvenliği**: Altyapı modelleri, gömme servisleri, bağlam sağlayıcılar ve üçüncü taraf API’leri dahil olmak üzere AI tedarik zinciri kapsamının genişletilmesi
- **Altyapı Güvenliği**: Sıfır güven mimarisi ve Microsoft güvenlik ekosistemi dahil olmak üzere kurumsal güvenlik kalıplarıyla gelişmiş entegrasyon
- **Kaynak Organizasyonu**: Türlerine göre (Resmi Belgeler, Standartlar, Araştırmalar, Microsoft Çözümleri, Uygulama Kılavuzları) kapsamlı kaynak bağlantılarının kategorize edilmesi

### Dokümantasyon Kalite İyileştirmeleri
- **Yapılandırılmış Öğrenme Hedefleri**: Belirgin, uygulanabilir sonuçlarla geliştirilmiş öğrenme hedefleri
- **Çapraz Referanslar**: İlgili güvenlik ve temel kavram konuları arasında bağlantılar eklendi
- **Güncel Bilgiler**: Tüm tarih referansları ve spesifikasyon bağlantıları güncel standartlara göre yenilendi
- **Uygulama Rehberliği**: Her iki bölümde de belirgin, uygulanabilir uygulama yönergeleri eklendi

## 16 Temmuz 2025

### README ve Navigasyon İyileştirmeleri
- README.md dosyasındaki müfredat navigasyonu tamamen yeniden tasarlandı
- `<details>` etiketleri daha erişilebilir tablo tabanlı formatla değiştirildi
- Yeni "alternative_layouts" klasöründe alternatif düzen seçenekleri oluşturuldu
- Kart tabanlı, sekmeli stil ve akordeon stil navigasyon örnekleri eklendi
- Depo yapılandırma bölümü en son dosyalarla güncellendi
- "Bu Müfredatı Nasıl Kullanmalı" bölümü açık önerilerle geliştirildi
- MCP spesifikasyon bağlantıları doğru URL’lere yönlendirilecek şekilde güncellendi
- Müfredat yapısına Bağlam Mühendisliği bölümü (5.14) eklendi

### Çalışma Rehberi Güncellemeleri
- Çalışma rehberi mevcut depo yapısına uyacak şekilde tamamen yeniden düzenlendi
- MCP İstemcileri ve Araçları ile Popüler MCP Sunucuları için yeni bölümler eklendi
- Görsel Müfredat Haritası tüm konuları doğru şekilde yansıtacak şekilde güncellendi
- Gelişmiş Konular açıklamaları tüm uzmanlık alanlarını kapsayacak şekilde genişletildi
- Vaka Çalışmaları bölümü gerçek örnekleri yansıtacak şekilde güncellendi
- Bu kapsamlı değişiklik günlüğü eklendi

### Topluluk Katkıları (06-CommunityContributions/)
- Görüntü üretimi için MCP sunucularına dair ayrıntılı bilgiler eklendi
- VSCode içinde Claude kullanımına kapsamlı bölüm eklendi
- Cline terminal istemci kurulumu ve kullanım talimatları eklendi
- Tüm popüler istemci seçeneklerini içerecek şekilde MCP istemci bölümü güncellendi
- Katkı örnekleri daha isabetli kod örnekleriyle geliştirildi

### Gelişmiş Konular (05-AdvancedTopics/)
- Tüm uzmanlık alanları tutarlı isimlendirme ile düzenlendi
- Bağlam mühendisliği materyalleri ve örnekleri eklendi
- Foundry ajan entegrasyon dokümantasyonu eklendi
- Entra ID güvenlik entegrasyon dokümantasyonu geliştirildi

## 11 Haziran 2025

### İlk Oluşturma
- MCP for Beginners müfredatının ilk sürümü yayınlandı
- 10 ana bölümün temel yapısı oluşturuldu
- Navigasyon için Görsel Müfredat Haritası uygulandı
- Birden fazla programlama dilinde ilk örnek projeler eklendi

### Başlarken (03-GettingStarted/)
- İlk sunucu uygulama örnekleri oluşturuldu
- İstemci geliştirme rehberliği eklendi
- LLM istemci entegrasyon talimatları dahil edildi
- VS Code entegrasyon dokümantasyonu eklendi
- Server-Sent Events (SSE) sunucu örnekleri uygulandı

### Temel Kavramlar (01-CoreConcepts/)
- İstemci-sunucu mimarisinin ayrıntılı açıklaması eklendi
- Ana protokol bileşenlerine dair dokümantasyon oluşturuldu
- MCP’de mesajlaşma kalıpları dokümante edildi

## 23 Mayıs 2025

### Depo Yapısı
- Temel klasör yapısıyla depo başlatıldı
- Her ana bölüm için README dosyaları oluşturuldu
- Çeviri altyapısı kuruldu
- Görsel ve diyagramlar eklendi

### Dokümantasyon
- Müfredat genel bakışıyla ilk README.md oluşturuldu
- CODE_OF_CONDUCT.md ve SECURITY.md dosyaları eklendi
- Yardım alma rehberi SUPPORT.md dosyası oluşturuldu
- Ön hazırlık çalışma rehberi yapısı oluşturuldu

## 15 Nisan 2025

### Planlama ve Çerçeve
- MCP for Beginners müfredatı için ilk planlama
- Öğrenme hedefleri ve hedef kitle tanımlandı
- Müfredatın 10 bölümlük yapısı tasarlandı
- Örnekler ve vaka çalışmaları için kavramsal çerçeve geliştirildi
- Anahtar kavramlar için ilk prototip örnekler oluşturuldu

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstermemize rağmen, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde otoritatif kaynak olarak kabul edilmelidir. Önemli bilgiler için profesyonel insan çevirisi önerilmektedir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek herhangi bir yanlış anlama veya hatalı yorumlamadan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->