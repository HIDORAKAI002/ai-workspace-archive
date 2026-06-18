# 🚀 Modül 1: Microsoft Foundry Toolkit Temelleri

[![Süre](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Zorluk](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Önkoşullar](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Öğrenme Hedefleri

Bu modülün sonunda şunları yapabileceksiniz:
- ✅ Microsoft Foundry Toolkit Uzantısını VS Code için yüklemek ve yapılandırmak
- ✅ Model Kataloğu'nda gezmek ve farklı model kaynaklarını anlamak
- ✅ Model testi ve denemeleri için Playground'u kullanmak
- ✅ Agent Builder ile özel AI ajanları oluşturmak
- ✅ Farklı sağlayıcılar arasında model performansını karşılaştırmak
- ✅ Prompt mühendisliği için en iyi uygulamaları uygulamak

## 🧠 Microsoft Foundry Toolkit'e Giriş

**Microsoft Foundry Toolkit Uzantısı for VS Code**, Microsoft’un bayrak uzantısıdır ve VS Code'u kapsamlı bir AI geliştirme ortamına dönüştürür. AI araştırması ile pratik uygulama geliştirme arasındaki köprüyü kurar ve üretken AI’yı her beceri seviyesinden geliştiriciye erişilebilir hale getirir.

### 🌟 Önemli Özellikler

| Özellik | Açıklama | Kullanım Alanı |
|---------|-------------|----------|
| **🗂️ Model Kataloğu** | GitHub, ONNX, OpenAI, Anthropic, Google’dan 100+ modele erişim | Model keşfi ve seçimi |
| **🔌 BYOM Desteği** | Kendi modellerinizi (yerel/uzaktan) entegre edin | Özel model dağıtımı |
| **🎮 Etkileşimli Playground** | Sohbet arayüzü ile gerçek zamanlı model testi | Hızlı prototipleme ve test |
| **📎 Çok Modlu Destek** | Metin, resim ve eklentileri işleyin | Karmaşık AI uygulamaları |
| **⚡ Toplu İşleme** | Birden fazla promptu eş zamanlı çalıştırın | Verimli test iş akışları |
| **📊 Model Değerlendirme** | Yerleşik metrikler (F1, alaka, benzerlik, tutarlılık) | Performans değerlendirmesi |

### 🎯 Microsoft Foundry Toolkit Neden Önemli?

- **🚀 Hızlandırılmış Geliştirme**: Fikirden prototipe dakikalar içinde
- **🔄 Birleşik İş Akışı**: Birden fazla AI sağlayıcısı için tek arayüz
- **🧪 Kolay Deney**: Karmaşık kurulum olmadan modelleri karşılaştırın
- **📈 Üretime Hazır**: Prototipten dağıtıma sorunsuz geçiş

## 🛠️ Önkoşullar ve Kurulum

### 📦 Microsoft Foundry Toolkit Uzantısını Yükleyin

**Adım 1: Uzantılar Marketine Erişim**
1. Visual Studio Code’u açın
2. Uzantılar görünümüne gidin (`Ctrl+Shift+X` veya `Cmd+Shift+X`)
3. "Microsoft Foundry Toolkit" araması yapın

**Adım 2: Sürümünüzü Seçin**
- **🟢 Yayın (Release)**: Üretim kullanımı için önerilir
- **🔶 Ön Sürüm (Pre-release)**: Öncü özelliklere erken erişim

**Adım 3: Yükleyin ve Etkinleştirin**

![Microsoft Foundry Toolkit Uzantısı](../../../../translated_images/tr/aitkext.d28945a03eed003c.webp)

### ✅ Doğrulama Kontrol Listesi
- [ ] Microsoft Foundry Toolkit simgesi VS Code yan çubuğunda görünüyor
- [ ] Uzantı etkin ve aktif durumda
- [ ] Çıktı panelinde yükleme hatası yok

## 🧪 Uygulamalı Egzersiz 1: GitHub Modellerini Keşfetmek

**🎯 Hedef**: Model Kataloğu’nu ustaca kullanmak ve ilk AI modelinizi test etmek

### 📊 Adım 1: Model Kataloğu’nda Gezinme

Model Kataloğu AI ekosisteminize açılan kapıdır. Birden fazla sağlayıcıdan modelleri bir araya getirir, keşfetmeyi ve karşılaştırmayı kolaylaştırır.

**🔍 Gezinme Rehberi:**

Microsoft Foundry Toolkit yan çubuğunda **MODELS - Catalog** tıklayın

![Model Kataloğu](../../../../translated_images/tr/aimodel.263ed2be013d8fb0.webp)

**💡 İpucu**: Kullanım durumunuza uygun belirli yeteneklere sahip modellere bakın (ör. kod üretimi, yaratıcı yazım, analiz).

**⚠️ Not**: GitHub’da barındırılan modeller (yani GitHub Modelleri) ücretsizdir ancak isteklerde ve tokenlarda oran sınırlamalarına tabidir. Azure AI veya diğer uç noktalar üzerinden barındırılan GitHub dışı modellere erişmek isterseniz ilgili API anahtarını veya kimlik doğrulamasını sağlamanız gerekir.

### 🚀 Adım 2: İlk Modelinizi Ekleyin ve Yapılandırın

**Model Seçim Stratejisi:**
- **GPT-4.1**: Karmaşık muhakeme ve analizler için en iyisi
- **Phi-4-mini**: Basit görevler için hafif, hızlı yanıtlar

**🔧 Yapılandırma Süreci:**
1. Katalogdan **OpenAI GPT-4.1** seçin
2. **Add to My Models** (Modellerime Ekle) tıklayın - model kullanım için kaydedilir
3. **Try in Playground** (Playground'da Deneyin) seçeneği ile test ortamını başlatın
4. Modelin başlatılmasını bekleyin (ilk kurulum biraz zaman alabilir)

![Playground Kurulumu](../../../../translated_images/tr/playground.dd6f5141344878ca.webp)

**⚙️ Model Parametrelerini Anlama:**
- **Temperature**: Yaratıcılığı kontrol eder (0 = belirleyici, 1 = yaratıcı)
- **Max Tokens**: Maksimum yanıt uzunluğu
- **Top-p**: Yanıt çeşitliliği için nükleus örnekleme

### 🎯 Adım 3: Playground Arayüzünü Öğrenin

Playground AI deney laboratuvarınızdır. Potansiyelini en üst düzeye çıkarmak için:

**🎨 Prompt Mühendisliği En İyi Uygulamaları:**
1. **Belirgin Olun**: Net, detaylı talimatlar daha iyi sonuç verir
2. **Bağlam Sağlayın**: İlgili arka plan bilgisini ekleyin
3. **Örnek Kullanın**: Modelin ne istediğinizi örneklerle gösterin
4. **Yineleyin**: İlk sonuçlara göre promptları geliştirin

**🧪 Test Senaryoları:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Test Sonuçları](../../../../translated_images/tr/result.1dfcf211fb359cf6.webp)

### 🏆 Zorluk Egzersizi: Model Performans Karşılaştırması

**🎯 Amaç**: Aynı promptlarla farklı modelleri karşılaştırarak güçlerini anlayın

**📋 Talimatlar:**
1. Çalışma alanınıza **Phi-4-mini** ekleyin
2. GPT-4.1 ve Phi-4-mini için aynı promptu kullanın

![set](../../../../translated_images/tr/set.88132df189ecde2c.webp)

3. Yanıt kalitesi, hız ve doğruluğu karşılaştırın
4. Bulgularınızı sonuç bölümüne kaydedin

![Model Karşılaştırması](../../../../translated_images/tr/compare.97746cd0f9074955.webp)

**💡 Keşfedilecek Önemli Noktalar:**
- LLM ile SLM’nin ne zaman kullanılacağı
- Maliyet ve performans dengeleri
- Farklı modellerin uzmanlaşmış yetenekleri

## 🤖 Uygulamalı Egzersiz 2: Agent Builder ile Özel Ajanlar Oluşturma

**🎯 Hedef**: Belirli görevler ve iş akışları için özel AI ajanları yaratmak

### 🏗️ Adım 1: Agent Builder'ı Anlama

Agent Builder Microsoft Foundry Toolkit'in gerçek gücüdür. Büyük dil modellerini özel talimatlar, parametreler ve uzman bilgi ile birleştirerek amaç odaklı AI asistanları oluşturmanızı sağlar.

**🧠 Ajan Mimarisi Bileşenleri:**
- **Çekirdek Model**: Temel LLM (GPT-4, Groks, Phi vb.)
- **Sistem Promptu**: Ajan kişiliği ve davranışı tanımlar
- **Parametreler**: Optimum performans için ince ayar ayarları
- **Araç Entegrasyonları**: Harici API’ler ve MCP servislerine bağlanma
- **Hafıza**: Konuşma bağlamı ve oturum devamlılığı

![Agent Builder Arayüzü](../../../../translated_images/tr/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Adım 2: Ajan Yapılandırması Derinlemesine

**🎨 Etkili Sistem Promptları Oluşturma:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Tabii ki, Prompt oluşturmayı optimize etmek ve geliştirmek için AI kullanmak adına Sistem Promptu Oluştur seçeneğini de kullanabilirsiniz*

**🔧 Parametre Optimizasyonu:**
| Parametre | Önerilen Aralık | Kullanım Alanı |
|-----------|-----------------|----------|
| **Temperature** | 0.1-0.3 | Teknik/faktüel yanıtlar |
| **Temperature** | 0.7-0.9 | Yaratıcı/fikir üretme görevleri |
| **Max Tokens** | 500-1000 | Özlü yanıtlar |
| **Max Tokens** | 2000-4000 | Detaylı açıklamalar |

### 🐍 Adım 3: Pratik Egzersiz - Python Programlama Ajanı

**🎯 Görev**: Özel bir Python kodlama asistanı oluşturun

**📋 Yapılandırma Adımları:**

1. **Model Seçimi**: **Claude 3.5 Sonnet**'i seçin (kodu için mükemmel)

2. **Sistem Promptu Tasarımı**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Parametre Yapılandırması**:
   - Temperature: 0.2 (tutarlı, güvenilir kod için)
   - Max Tokens: 2000 (detaylı açıklamalar)
   - Top-p: 0.9 (dengeli yaratıcılık)

![Python Ajan Yapılandırması](../../../../translated_images/tr/pythonagent.5e51b406401c165f.webp)

### 🧪 Adım 4: Python Ajanınızı Test Etme

**Test Senaryoları:**
1. **Temel Fonksiyon**: "Asal sayıları bulan bir fonksiyon oluştur"
2. **Karmaşık Algoritma**: "Ekleme, silme ve arama metodları ile ikili arama ağacı uygula"
3. **Gerçek Dünya Problemi**: "Oran sınırlaması ve tekrarları yöneten bir web kazıyıcı oluştur"
4. **Hata Ayıklama**: "Bu kodu düzelt [hatalı kodu yapıştır]"

**🏆 Başarı Kriterleri:**
- ✅ Kod hatasız çalışıyor
- ✅ Uygun dokümantasyon içeriyor
- ✅ Python en iyi uygulamalarını takip ediyor
- ✅ Açık açıklamalar sağlıyor
- ✅ İyileştirme önerilerinde bulunuyor

## 🎓 Modül 1 Sonu ve Sonraki Adımlar

### 📊 Bilgi Kontrolü

Anlayışınızı test edin:
- [ ] Kataloğundaki modeller arasındaki farkı açıklayabilir misiniz?
- [ ] Özel bir ajan oluşturup test etmeyi başarabildiniz mi?
- [ ] Farklı kullanım durumları için parametreleri nasıl optimize edeceğinizi anlıyor musunuz?
- [ ] Etkili sistem promptları tasarlayabilir misiniz?

### 📚 Ek Kaynaklar

- **Microsoft Foundry Toolkit Dokümantasyonu**: [Resmi Microsoft Belgeleri](https://github.com/microsoft/vscode-ai-toolkit)
- **Prompt Mühendisliği Rehberi**: [En İyi Uygulamalar](https://platform.openai.com/docs/guides/prompt-engineering)
- **Microsoft Foundry Toolkit Modelleri**: [Geliştirilen Modeller](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Tebrikler!** Microsoft Foundry Toolkit temellerini öğrendiniz ve daha gelişmiş AI uygulamaları geliştirmeye hazırsınız!

### 🔜 Sonraki Modüle Geçin

Daha gelişmiş özellikler için hazırsanız, devam edin: **[Modül 2: Microsoft Foundry Toolkit ile MCP Temelleri](../lab2/README.md)** ve şunları öğrenin:
- Ajanlarınızı Model Context Protocol (MCP) kullanarak harici araçlara bağlama
- Playwright ile tarayıcı otomasyon ajanları oluşturma
- MCP sunucularını Microsoft Foundry Toolkit ajanlarınızla entegre etme
- Ajanlarınızı harici veri ve yeteneklerle güçlendirme

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->