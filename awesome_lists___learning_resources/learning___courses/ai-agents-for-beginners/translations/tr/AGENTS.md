# AGENTS.md

## Proje Genel Bakış

Bu depo, AI Ajanları Oluşturmak için gereken her şeyi öğreten kapsamlı bir eğitim kursu olan "Yeni Başlayanlar için AI Ajanları" içerir. Kurs, temel bilgiler, tasarım kalıpları, çerçeveler, üretim dağıtımı, yerel/cihaz üzeri ajanlar ve AI ajanlarının güvenliğini kapsayan 18 dersten (00-18 numaralı) oluşur.

**Önemli Teknolojiler:**
- Python 3.12+
- Etkileşimli öğrenim için Jupyter Notebooks
- AI Çerçeveleri: Microsoft Agent Framework (MAF)
- Azure AI Hizmetleri: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Mimari:**
- Ders tabanlı yapı (00-15+ dizinler)
- Her ders, README dökümantasyonu, kod örnekleri (Jupyter defterleri) ve resimler içerir
- Otomatik çeviri sistemi ile çoklu dil desteği
- Microsoft Agent Framework kullanan her ders için bir Python defteri

## Kurulum Komutları

### Ön Gereksinimler
- Python 3.12 veya üzeri
- Azure aboneliği (Microsoft Foundry için)
- Azure CLI kurulumu ve kimlik doğrulama (`az login`)

### İlk Kurulum

1. **Depoyu klonlayın veya çatallayın:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # VEYA
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Python sanal ortamını oluşturup etkinleştirin:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Windows'ta: venv\Scripts\activate
   ```

3. **Bağımlılıkları yükleyin:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Ortam değişkenlerini ayarlayın:**
   ```bash
   cp .env.example .env
   # API anahtarlarınız ve uç noktalarınızla .env dosyasını düzenleyin
   ```

### Gerekli Ortam Değişkenleri

**Microsoft Foundry için** (Zorunlu):
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry proje uç noktası
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - Model dağıtım adı (ör. gpt-4.1-mini)

**Azure AI Search için** (Ders 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI Search uç noktası
- `AZURE_SEARCH_API_KEY` - Azure AI Search API anahtarı

Kimlik doğrulama: Defterleri çalıştırmadan önce `az login` komutunu kullanın (`AzureCliCredential` kullanılır).

## Geliştirme İş Akışı

### Jupyter Notebooks Çalıştırma

Her ders, farklı çerçeveler için birden fazla Jupyter defteri içerir:

1. **Jupyter'i başlatın:**
   ```bash
   jupyter notebook
   ```

2. **Bir ders dizinine gidin** (örneğin, `01-intro-to-ai-agents/code_samples/`)

3. **Defterleri açın ve çalıştırın:**
   - `*-python-agent-framework.ipynb` - Microsoft Agent Framework kullanarak (Python)
   - `*-dotnet-agent-framework.ipynb` - Microsoft Agent Framework kullanarak (.NET)

### Microsoft Agent Framework ile Çalışma

**Microsoft Agent Framework + Microsoft Foundry:**
- Azure aboneliği gerektirir
- Agent Service V2 için `FoundryChatClient` kullanır (ajanlar Foundry portalında görünür)
- Yerleşik gözlemlenebilirlikle üretim için hazır
- Dosya deseni: `*-python-agent-framework.ipynb`

## Test Talimatları

Bu depo eğitim amaçlıdır ve otomatik testler içeren üretim kodundan ziyade örnek kod içerir. Kurulumunuzu ve değişikliklerinizi doğrulamak için:

### Manuel Test

1. **Python ortamını test edin:**
   ```bash
   python --version  # 3.12 ve üstü olmalı
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Defter çalıştırmayı test edin:**
   ```bash
   # Defteri betiğe dönüştür ve çalıştır (testler içe aktarmaları kontrol eder)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Ortam değişkenlerini doğrulayın:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Bireysel Defterleri Çalıştırma

Jupyter'de defterleri açın ve hücreleri sırasıyla çalıştırın. Her defter kendi içinde tamdır ve şunları içerir:
- İçe aktarma ifadeleri
- Konfigürasyon yükleme
- Örnek ajan uygulamaları
- Markdown hücrelerinde beklenen çıktılar

### Dağıtılan Ajanların Duman Testi

Microsoft Foundry barındırılan ajan olarak dağıtılan dersler (01, 04, 05, 16) için depo, `.github/workflows/smoke-test.yml` iş akışı tarafından [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) eylemi ile çalıştırılan `tests/` altında duman testi katalogları sağlar. Bunlar, ajanın erişilebilir olup temel istem beklentilerini karşılayıp karşılamadığını kontrol eden hafif bir dağıtım sonrası kapıdır ve Ders 10 ve 16'daki değerlendirme hattını tamamlar. Katalogdan derse ve ajana eşlemeyi görmek için [tests/README.md](./tests/README.md) dosyasına bakın. Ders 17, Foundry Local ile yerel olarak çalışır ve barındırılan bir uç noktası yoktur, bu nedenle doğrudan defteri çalıştırarak doğrulanır.

## Kod Stili

### Python Konvansiyonları

- **Python Sürümü**: 3.12+
- **Kod Stili**: Standart Python PEP 8 konvansiyonlarına uyun
- **Defterler**: Kavramları açıklamak için net markdown hücreleri kullanın
- **İçe Aktarmalar**: Standart kütüphane, üçüncü taraf ve yerel içe aktarmalar olarak gruplayın

### Jupyter Notebook Konvansiyonları

- Kod hücrelerinden önce açıklayıcı markdown hücreleri ekleyin
- Referans için defterlerde çıktı örnekleri ekleyin
- Ders kavramlarıyla uyumlu net değişken isimleri kullanın
- Defter çalışma sırasını doğrusal tutun (hücre 1 → 2 → 3...)

### Dosya Organizasyonu

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Derleme ve Dağıtım

### Dokümantasyon Derleme

Bu depo dokümantasyon için Markdown kullanır:
- Her ders klasöründe README.md dosyaları
- Depo kökünde ana README.md
- GitHub Actions aracılığıyla otomatik çeviri sistemi

### CI/CD Hattı

`.github/workflows/` içinde yer alır:

1. **co-op-translator.yml** - 50+ dile otomatik çeviri
2. **welcome-issue.yml** - Yeni sorun oluşturucularını karşılama
3. **welcome-pr.yml** - Yeni çekme isteği katkıcılarını karşılama

### Dağıtım

Bu eğitim amaçlı bir depo olup dağıtım süreci yoktur. Kullanıcılar:
1. Depoyu çatallayabilir veya klonlayabilir
2. Defterleri yerelde veya GitHub Codespaces içinde çalıştırabilir
3. Örnekleri değiştirerek ve deneyerek öğrenir

## Çekme İsteği Rehberi

### Göndermeden Önce

1. **Değişikliklerinizi test edin:**
   - Etkilenen defterleri tamamen çalıştırın
   - Tüm hücrelerin hatasız çalıştığını doğrulayın
   - Çıktıların uygunluğunu kontrol edin

2. **Dökümantasyon güncellemeleri:**
   - Yeni kavram ekliyorsanız README.md güncelleyin
   - Karmaşık kod için defterlere açıklama ekleyin
   - Markdown hücreleri amaç açıklaması içermeli

3. **Dosya değişiklikleri:**
   - `.env` dosyası göndermekten kaçının (`.env.example` kullanın)
   - `venv/` veya `__pycache__/` dizinlerini göndermeyin
   - Kavramları gösteren defter çıktıları korunmalı
   - Geçici dosya ve yedek defterleri (`*-backup.ipynb`) kaldırın

### PR Başlık Formatı

Açıklayıcı başlıklar kullanın:
- `[Lesson-XX] <kavram> için yeni örnek ekle`
- `[Fix] lesson-XX README dosyasındaki yazım hatasını düzelt`
- `[Update] lesson-XX kod örneğini geliştir`
- `[Docs] kurulum talimatlarını güncelle`

### Gerekli Kontroller

- Defterler hatasız çalışmalı
- README dosyaları açık ve doğru olmalı
- Depodaki mevcut kod kalıpları takip edilmeli
- Diğer derslerle tutarlılık korunmalı

## Ek Notlar

### Yaygın Tuzaklar

1. **Python sürümü uyumsuzluğu:**
   - Python 3.12+ kullandığınızdan emin olun
   - Bazı paketler eski sürümlerle çalışmayabilir
   - Python sürümünü açıkça belirtmek için `python3 -m venv` kullanın

2. **Ortam değişkenleri:**
   - `.env.example` dosyasından her zaman `.env` oluşturun
   - `.env` dosyasını göndermeyin (`.gitignore`dadır)
   - Anahtarsız Entra ID kimlik doğrulaması için `az login` yapın

3. **Paket çatışmaları:**
   - Temiz bir sanal ortam kullanın
   - Bireysel paketler yerine `requirements.txt` üzerinden yükleyin
   - Bazı defterler, markdown hücrelerinde belirtilen ek paketler gerektirebilir

4. **Azure hizmetleri:**
   - Azure AI hizmetleri aktif abonelik gerektirir
   - Bazı özellikler bölgeye özel olabilir
   - Azure OpenAI model dağıtımınızın Yanıtlar API'sini desteklediğinden emin olun

### Öğrenme Yolu

Önerilen ders ilerleyişi:
1. **00-course-setup** - Ortam kurulumu için buradan başlayın
2. **01-intro-to-ai-agents** - AI ajanlarının temellerini öğrenin
3. **02-explore-agentic-frameworks** - Farklı çerçeveleri keşfedin
4. **03-agentic-design-patterns** - Temel tasarım kalıpları
5. Numara sırasıyla diğer derslere devam edin

### Çerçeve Seçimi

Hedeflerinize göre çerçeve seçin:
- **Tüm dersler**: `FoundryChatClient` ile Microsoft Agent Framework (MAF)
- **Ajanlar sunucu tarafında kayıt olur** ve Foundry portalında görünür (Microsoft Foundry Agent Service V2)

### Yardım Alma

- [Microsoft Foundry Topluluk Discordu](https://aka.ms/ai-agents/discord)'na katılın
- Belirli rehberlik için ders README dosyalarını inceleyin
- Kurs genel bakışı için ana [README.md](./README.md) dosyasına bakın
- Detaylı kurulum talimatları için [Course Setup](./00-course-setup/README.md)'a başvurun

### Katkıda Bulunma

Bu açık eğitim projesidir. Katkılarınızı bekliyoruz:
- Kod örneklerini geliştirin
- Yazım hatalarını veya hataları düzeltin
- Açıklayıcı yorumlar ekleyin
- Yeni ders konuları önerin
- Başka dillere çevirin

Mevcut ihtiyaçlar için [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) sayfasına bakabilirsiniz.

## Projeye Özel Bağlam

### Çoklu Dil Desteği

Bu depo otomatik çeviri sistemi kullanır:
- 50+ dil desteklenir
- Çeviriler `/translations/<lang-code>/` dizinlerinde yer alır
- GitHub Actions iş akışı çeviri güncellemelerini yönetir
- Kaynak dosyaları İngilizce olarak depo kökünde bulunur

### Ders Yapısı

Her ders tutarlı bir deseni takip eder:
1. Bağlantılı video küçük resmi
2. Yazılı ders içeriği (README.md)
3. Birden fazla çerçevede kod örnekleri
4. Öğrenme hedefleri ve ön gereksinimler
5. Ek öğrenme kaynaklarına bağlantılar

### Kod Örneği İsimlendirmesi

Format: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Ders 1, MAF Python
- `14-sequential.ipynb` - Ders 14, MAF ileri düzey kalıplar
- `16-python-agent-framework.ipynb` - Ders 16, üretim müşteri destek ajanı
- `17-local-agent-foundry-local.ipynb` - Ders 17, Foundry Local + Qwen ile yerel ajan

### Özel Dizinler

- `translated_images/` - Çevirilere ait yerelleştirilmiş resimler
- `images/` - İngilizce içerik için orijinal resimler
- `.devcontainer/` - VS Code geliştirme konteyner yapılandırması
- `.github/` - GitHub Actions iş akışları ve şablonları

### Bağımlılıklar

`requirements.txt` içindeki önemli paketler:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-to-Agent protokol desteği
- `azure-ai-inference`, `azure-ai-projects` - Azure AI hizmetleri
- `azure-identity` - Azure kimlik doğrulama (AzureCliCredential)
- `azure-search-documents` - Azure AI Search entegrasyonu
- `mcp[cli]` - Model Context Protocol desteği

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->