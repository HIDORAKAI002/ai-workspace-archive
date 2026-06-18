# MCP Veritabanı Entegrasyonuna Giriş

## 🎯 Bu Laboratuvarın Kapsamı

Bu giriş laboratuvarı, Model Context Protocol (MCP) sunucularını veritabanı entegrasyonu ile oluşturma sürecine kapsamlı bir genel bakış sağlar. İş vakasını, teknik mimariyi ve gerçek dünya uygulamalarını https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail adresindeki Zava Retail analiz kullanım vakası üzerinden anlayacaksınız.

## Genel Bakış

**Model Context Protocol (MCP)**, yapay zeka asistanlarının dış veri kaynaklarına gerçek zamanlı, güvenli erişim sağlamasına ve etkileşimde bulunmasına olanak tanır. Veritabanı entegrasyonu ile birleştiğinde, MCP veri odaklı yapay zeka uygulamaları için güçlü yeteneklerin kilidini açar.

Bu öğrenme yolu size PostgreSQL aracılığıyla perakende satış verilerine bağlanan ve Satır Düzeyinde Güvenlik, anlamsal arama ve çoklu kiracı veri erişimi gibi kurumsal desenleri uygulayan üretim hazır MCP sunucuları oluşturmayı öğretir.

## Öğrenme Hedefleri

Bu laboratuvarın sonunda şunları yapabileceksiniz:

- **Tanımlamak** Model Context Protocol'ü ve veritabanı entegrasyonu için temel faydalarını
- **Belirlemek** veritabanı içeren bir MCP sunucu mimarisinin temel bileşenlerini
- **Anlamak** Zava Retail kullanım vakasını ve iş gereksinimlerini
- **Tanımak** güvenli, ölçeklenebilir veritabanı erişimi için kurumsal desenleri
- **Listelemek** bu öğrenme yolu boyunca kullanılan araçlar ve teknolojiler

## 🧭 Zorluk: Yapay Zeka Gerçek Dünya Verisiyle Buluşuyor

### Geleneksel Yapay Zeka Sınırlamaları

Modern yapay zeka asistanları son derece güçlüdür ancak gerçek dünya iş verileriyle çalışırken önemli sınırlamalarla karşılaşır:

| **Zorluk** | **Açıklama** | **İş Etkisi** |
|------------|--------------|---------------|
| **Statik Bilgi** | Sabit veri kümeleriyle eğitilen yapay zeka modelleri güncel iş verilerine erişemez | Güncel olmayan içgörüler, kaçırılan fırsatlar |
| **Veri Siloları** | Veritabanlarında, API’lerde ve sistemlerde kilitli bilgiler yapay zekanın erişemediği yerlerde kalır | Eksik analiz, parçalanmış iş akışları |
| **Güvenlik Kısıtlamaları** | Doğrudan veritabanı erişimi güvenlik ve uyumluluk endişesi yaratır | Sınırlı dağıtım, manuel veri hazırlığı |
| **Karmaşık Sorgular** | İş kullanıcılarının veri içgörüsü çıkarmak için teknik bilgiye ihtiyacı vardır | Azalan benimseme, verimsiz süreçler |

### MCP Çözümü

Model Context Protocol bu zorlukları şu imkanlarla giderir:

- **Gerçek Zamanlı Veri Erişimi**: Yapay zeka asistanları canlı veritabanları ve API'lere sorgu yapar
- **Güvenli Entegrasyon**: Kimlik doğrulama ve izinlerle kontrollü erişim
- **Doğal Dil Arayüzü**: İş kullanıcıları sorularını basit İngilizce ile sorar
- **Standartlaştırılmış Protokol**: Farklı yapay zeka platformları ve araçları arasında çalışır

## 🏪 Zava Retail ile Tanışın: Öğrenme Vaka Analizimiz https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

Bu öğrenme yolu boyunca, çoklu mağaza konumlarına sahip kurgusal bir DIY perakende zinciri olan **Zava Retail** için bir MCP sunucusu oluşturacağız. Bu gerçekçi senaryo kurumsal sınıf MCP uygulamasını gösterir.

### İş Bağlamı

**Zava Retail** işletiyor:
- Washington eyaletinde **8 fiziksel mağaza** (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)
- E-ticaret satışları için **1 çevrimiçi mağaza**
- Araçlar, donanım, bahçe malzemeleri ve inşaat malzemeleri dahil **çeşitli ürün kataloğu**
- Mağaza müdürleri, bölgesel müdürler ve yöneticilerden oluşan **çok katmanlı yönetim**

### İş Gereksinimleri

Mağaza müdürleri ve yöneticiler, yapay zeka destekli analizlerle şunları yapabilmelidir:

1. Mağazalar ve zaman dilimleri arasında **satış performansını analiz etmek**
2. **Envanter seviyelerini takip etmek** ve yeniden stok ihtiyaçlarını belirlemek
3. **Müşteri davranışlarını ve satın alma modellerini anlamak**
4. **Anlamsal arama yoluyla ürün içgörülerini keşfetmek**
5. **Doğal dil sorguları ile raporlar oluşturmak**
6. **Rol tabanlı erişim kontrolü ile veri güvenliğini sağlamak**

### Teknik Gereksinimler

MCP sunucusu sağlamalıdır:

- **Çoklu kiracı veri erişimi**; mağaza müdürleri sadece kendi mağazalarının verilerini görür
- **Esnek sorgulama**; karmaşık SQL işlemlerini destekler
- **Anlamsal arama**; ürün keşfi ve önerileri için
- **Gerçek zamanlı veriler**; güncel iş durumunu yansıtır
- **Güvenli kimlik doğrulama**; satır düzeyinde güvenlik ile
- **Ölçeklenebilir mimari**; birden fazla eşzamanlı kullanıcı destekler

## 🏗️ MCP Sunucu Mimarisi Genel Bakış

MCP sunucumuz, veritabanı entegrasyonu için optimize edilmiş katmanlı bir mimari uygular:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Temel Bileşenler

#### **1. MCP Sunucu Katmanı**
- **FastMCP Framework**: Modern Python MCP sunucu uygulaması
- **Araç Kaydı**: Tip güvenliği ile bildirisel araç tanımlamaları
- **İstek Bağlamı**: Kullanıcı kimliği ve oturum yönetimi
- **Hata Yönetimi**: Sağlam hata yönetimi ve kayıt tutma

#### **2. Veritabanı Entegrasyon Katmanı**
- **Bağlantı Havuzu**: Verimli asyncpg bağlantı yönetimi
- **Şema Sağlayıcı**: Dinamik tablo şeması keşfi
- **Sorgu Yürütücü**: RLS bağlamıyla güvenli SQL yürütme
- **İşlem Yönetimi**: ACID uyumluluğu ve geri alma işlemi

#### **3. Güvenlik Katmanı**
- **Satır Düzeyinde Güvenlik**: PostgreSQL RLS ile çoklu kiracı veri izolasyonu
- **Kullanıcı Kimliği**: Mağaza müdürü kimlik doğrulama ve yetkilendirme
- **Erişim Kontrolü**: İnce taneli izinler ve denetim yolları
- **Girdi Doğrulama**: SQL enjeksiyon önleme ve sorgu doğrulama

#### **4. Yapay Zeka Geliştirme Katmanı**
- **Anlamsal Arama**: Ürün keşfi için vektör gömme teknolojileri
- **Azure OpenAI Entegrasyonu**: Metin gömme oluşturma
- **Benzerlik Algoritmaları**: pgvector kosinüs benzerlik araması
- **Arama Optimizasyonu**: İndeksleme ve performans ayarı

## 🔧 Teknoloji Yığını

### Temel Teknolojiler

| **Bileşen** | **Teknoloji** | **Amaç** |
|-------------|---------------|----------|
| **MCP Framework** | FastMCP (Python) | Modern MCP sunucu uygulaması |
| **Veritabanı** | PostgreSQL 17 + pgvector | Vektör arama destekli ilişkisel veri |
| **Yapay Zeka Servisleri** | Azure OpenAI | Metin gömmeleri ve dil modelleri |
| **Konteynerleştirme** | Docker + Docker Compose | Geliştirme ortamı |
| **Bulut Platformu** | Microsoft Azure | Üretim dağıtımı |
| **IDE Entegrasyonu** | VS Code | Yapay zeka sohbeti ve geliştirme iş akışı |

### Geliştirme Araçları

| **Araç** | **Amaç** |
|----------|----------|
| **asyncpg** | Yüksek performanslı PostgreSQL sürücüsü |
| **Pydantic** | Veri doğrulama ve serileştirme |
| **Azure SDK** | Bulut hizmet entegrasyonu |
| **pytest** | Test çerçevesi |
| **Docker** | Konteynerleştirme ve dağıtım |

### Üretim Yığını

| **Servis** | **Azure Kaynağı** | **Amaç** |
|------------|-------------------|----------|
| **Veritabanı** | Azure Database for PostgreSQL | Yönetilen veritabanı hizmeti |
| **Konteyner** | Azure Container Apps | Sunucusuz konteyner barındırma |
| **Yapay Zeka Servisleri** | Microsoft Foundry | OpenAI modelleri ve uç noktaları |
| **İzleme** | Application Insights | İzlenebilirlik ve teşhis |
| **Güvenlik** | Azure Key Vault | Gizli veriler ve yapılandırma yönetimi |

## 🎬 Gerçek Dünya Kullanım Senaryoları

Farklı kullanıcıların MCP sunucumuzla nasıl etkileşime girdiğini keşfedelim:

### Senaryo 1: Mağaza Müdürü Performans İncelemesi

**Kullanıcı**: Sarah, Seattle Mağaza Müdürü  
**Hedef**: Geçen çeyreğin satış performansını analiz etmek

**Doğal Dil Sorgusu**:
> "2024 4. çeyrek için mağazamda gelir bazında en iyi 10 ürünü göster"

**Ne Olur**:
1. VS Code AI Chat sorguyu MCP sunucusuna gönderir
2. MCP sunucusu Sarah’nın mağaza bağlamını (Seattle) tanır
3. RLS politikaları veriyi sadece Seattle mağazasına filtreler
4. SQL sorgusu oluşturulur ve yürütülür
5. Sonuçlar biçimlendirilir ve AI Sohbet’e gönderilir
6. Yapay zeka analiz ve içgörüler sağlar

### Senaryo 2: Anlamsal Arama ile Ürün Keşfi

**Kullanıcı**: Mike, Envanter Müdürü  
**Hedef**: Müşteri isteğine benzer ürünleri bulmak

**Doğal Dil Sorgusu**:
> "Dış mekan kullanımı için su geçirmez elektrik konektörlerine benzeyen hangi ürünleri satıyoruz?"

**Ne Olur**:
1. Sorgu anlamsal arama aracı tarafından işlenir
2. Azure OpenAI gömme vektörü oluşturur
3. pgvector benzerlik araması gerçekleştirir
4. İlgili ürünler alaka derecesine göre sıralanır
5. Sonuçlar ürün detayları ve stok durumunu içerir
6. Yapay zeka alternatifler ve paket teklifleri önerir

### Senaryo 3: Mağazalar Arası Analiz

**Kullanıcı**: Jennifer, Bölgesel Müdür  
**Hedef**: Tüm mağazalar arasında performans karşılaştırması yapmak

**Doğal Dil Sorgusu**:
> "Son 6 ay için tüm mağazalarda kategori bazında satış karşılaştırması yap"

**Ne Olur**:
1. Bölgesel müdür erişimi için RLS bağlamı ayarlanır
2. Karmaşık çok mağazalı sorgu oluşturulur
3. Mağaza lokasyonları bazında veri toplanır
4. Sonuçlar trendler ve karşılaştırmalar içerir
5. Yapay zeka içgörüler ve öneriler sunar

## 🔒 Güvenlik ve Çoklu Kiracıya Derinlemesine Bakış

Uygulamamız kurumsal düzeyde güvenliği önceliklendirir:

### Satır Düzeyinde Güvenlik (RLS)

PostgreSQL RLS veri izolasyonunu garanti eder:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Kullanıcı Kimlik Yönetimi

Her MCP bağlantısı şunları içerir:
- **Mağaza Müdürü Kimliği**: RLS bağlamı için benzersiz tanımlayıcı
- **Rol Ataması**: İzinler ve erişim seviyeleri
- **Oturum Yönetimi**: Güvenli kimlik doğrulama tokenları
- **Denetim Kaydı**: Tam erişim geçmişi

### Veri Koruma

Birden fazla güvenlik katmanı:
- **Bağlantı Şifrelemesi**: Tüm veritabanı bağlantılarında TLS
- **SQL Enjeksiyon Önlemi**: Yalnızca parametreli sorgular
- **Girdi Doğrulama**: Kapsamlı istek doğrulama
- **Hata Yönetimi**: Hatalarda hassas veri yok

## 🎯 Temel Çıkarımlar

Bu giriş laboratuvarını tamamladıktan sonra şunları anlamalısınız:

✅ **MCP Değer Önerisi**: MCP'nin yapay zeka asistanları ile gerçek dünya verisini nasıl köprülediği  
✅ **İş Bağlamı**: Zava Retail'in gereksinimleri ve zorlukları  
✅ **Mimari Genel Bakış**: Temel bileşenler ve etkileşimleri  
✅ **Teknoloji Yığını**: Kullanılan araçlar ve çerçeveler  
✅ **Güvenlik Modeli**: Çoklu kiracı veri erişimi ve koruması  
✅ **Kullanım Desenleri**: Gerçek dünya sorgu senaryoları ve iş akışları  

## 🚀 Sırada Ne Var

Daha derine inmeye hazır mısınız? Devam edin:

**[Lab 01: Temel Mimari Kavramlar](../01-Architecture/README.md)**

MCP sunucu mimarisi desenlerini, veritabanı tasarım prensiplerini ve perakende analiz çözümümüzü güçlendiren ayrıntılı teknik uygulamayı öğrenin.

## 📚 Ek Kaynaklar

### MCP Dokümantasyonu
- [MCP Spesifikasyonu](https://modelcontextprotocol.io/docs/) - Resmi protokol dokümantasyonu  
- [Başlangıç için MCP](https://aka.ms/mcp-for-beginners) - Kapsamlı MCP öğrenme rehberi  
- [FastMCP Dokümantasyonu](https://github.com/modelcontextprotocol/python-sdk) - Python SDK dokümanları  

### Veritabanı Entegrasyonu
- [PostgreSQL Dokümantasyonu](https://www.postgresql.org/docs/) - Eksiksiz PostgreSQL referansı  
- [pgvector Kılavuzu](https://github.com/pgvector/pgvector) - Vektör eklentisi dokümantasyonu  
- [Satır Düzeyinde Güvenlik](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - PostgreSQL RLS rehberi  

### Azure Servisleri
- [Azure OpenAI Dokümantasyonu](https://docs.microsoft.com/azure/cognitive-services/openai/) - Yapay zeka servis entegrasyonu  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Yönetilen veritabanı hizmeti  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Sunucusuz konteynerler  

---

**Feragatname**: Bu, kurgusal perakende verileri kullanılarak yapılan bir öğrenme alıştırmasıdır. Benzer çözümleri üretim ortamlarında uygularken her zaman kuruluşunuzun veri yönetişimi ve güvenlik politikalarına uyunuz.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->