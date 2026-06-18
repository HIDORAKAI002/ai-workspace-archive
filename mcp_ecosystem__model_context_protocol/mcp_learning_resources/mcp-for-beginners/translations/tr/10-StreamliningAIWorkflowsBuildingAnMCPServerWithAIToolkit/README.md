# AI İş Akışlarını Kolaylaştırma: Microsoft Foundry Toolkit ile MCP Sunucusu Kurma

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/tr/logo.ec93918ec338dadd.webp)

## 🎯 Genel Bakış

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/tr/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Bu dersin videosunu izlemek için yukarıdaki görsele tıklayın)_

**Model Context Protocol (MCP) Atölyesine** hoş geldiniz! Bu kapsamlı uygulamalı atölye, yapay zeka uygulama geliştirmede devrim yaratacak iki öncü teknolojiyi bir araya getiriyor:

- **🔗 Model Context Protocol (MCP)**: Sorunsuz AI-aracı entegrasyonu için açık standart
- **🛠️ Microsoft Foundry Toolkit VS Code Eklentisi**: Microsoft’un güçlü AI geliştirme eklentisi

### 🎓 Neler Öğreneceksiniz

Bu atölyenin sonunda, AI modellerini gerçek dünya araçları ve hizmetleriyle birleştiren zeki uygulamalar geliştirmede ustalaşacaksınız. Otomasyonlu testlerden özel API entegrasyonlarına kadar karmaşık iş zorluklarını çözmek için pratik beceriler kazanacaksınız.

## 🏗️ Teknoloji Yığını

### 🔌 Model Context Protocol (MCP)

MCP, **“AI için USB-C”** — AI modellerini dış araçlar ve veri kaynaklarına bağlayan evrensel standarttır.

**✨ Öne Çıkan Özellikler:**

- 🔄 **Standardize Entegrasyon**: AI-aracı bağlantıları için evrensel arayüz
- 🏛️ **Esnek Mimari**: stdio/SSE taşımacılığı ile yerel ve uzak sunucular
- 🧰 **Zengin Ekosistem**: Tek protokolde araçlar, istemler ve kaynaklar
- 🔒 **Kurumsal Hazır**: Yerleşik güvenlik ve güvenilirlik

**🎯 MCP’nin Önemi:**
USB-C kablo kaosunu ortadan kaldırdığı gibi, MCP AI entegrasyonlarının karmaşıklığını elimine eder. Tek protokol, sonsuz olanak.

### 🤖 Microsoft Foundry Toolkit VS Code Eklentisi

Microsoft’un lider AI geliştirme eklentisi, VS Code’u güçlü bir AI merkezine dönüştürür.

**🚀 Temel Yetkinlikler:**

- 📦 **Model Kataloğu**: Azure AI, GitHub, Hugging Face, Ollama modellerine erişim
- ⚡ **Yerel Çıkarım**: ONNX optimize edilmiş CPU/GPU/NPU yürütme
- 🏗️ **Agent Builder**: MCP entegrasyonuyla görsel AI ajan geliştirme
- 🎭 **Çok Modlu**: Metin, görsel ve yapılandırılmış çıktı desteği

**💡 Geliştirme Avantajları:**

- Sıfır yapılandırma model dağıtımı
- Görsel istem mühendisliği
- Gerçek zamanlı test alanı
- Sorunsuz MCP sunucu entegrasyonu

## 📚 Öğrenme Yolculuğu

### [🚀 Modül 1: Microsoft Foundry Toolkit Temelleri](./lab1/README.md)

**Süre**: 15 dakika

- 🛠️ Microsoft Foundry Toolkit’in VS Code’a kurulumu ve yapılandırması
- 🗂️ Model Kataloğuna göz atma (GitHub, ONNX, OpenAI, Anthropic, Google’dan 100+ model)
- 🎮 Gerçek zamanlı model testi için Etkileşimli Oyun Alanı’nı kullanma
- 🤖 Agent Builder ile ilk AI ajanınızı oluşturma
- 📊 Yerleşik metriklerle (F1, alaka, benzerlik, tutarlılık) model performansını değerlendirme
- ⚡ Yığın işleme ve çok modlu destek yeteneklerini öğrenme

**🎯 Öğrenme Çıktısı**: Microsoft Foundry Toolkit yeteneklerini kapsamlı biçimde anlayarak işlevsel bir AI ajan oluşturma

### [🌐 Modül 2: Microsoft Foundry Toolkit ile MCP Temelleri](./lab2/README.md)

**Süre**: 20 dakika

- 🧠 Model Context Protocol (MCP) mimarisi ve kavramlarını öğrenme
- 🌐 Microsoft’un MCP sunucu ekosistemini keşfetme
- 🤖 Playwright MCP sunucusunu kullanarak tarayıcı otomasyon ajanı oluşturma
- 🔧 MCP sunucularını Microsoft Foundry Toolkit Agent Builder ile entegre etme
- 📊 MCP araçlarını ajanlarınızda yapılandırma ve test etme
- 🚀 Üretim kullanımı için MCP destekli ajanlar ihraç ve dağıtma

**🎯 Öğrenme Çıktısı**: Harici araçlarla süper güçlendirilmiş bir AI ajanı dağıtma

### [🔧 Modül 3: Microsoft Foundry Toolkit ile Gelişmiş MCP Geliştirme](./lab3/README.md)

**Süre**: 20 dakika

- 💻 Microsoft Foundry Toolkit kullanarak özel MCP sunucuları oluşturma
- 🐍 En son MCP Python SDK’sını (v1.9.3) yapılandırma ve kullanma
- 🔍 MCP Sunucu hata ayıklama aracı Inspector’ı kurma ve kullanma
- 🛠️ Profesyonel hata ayıklama iş akışlarıyla Hava Durumu MCP Sunucusu oluşturma
- 🧪 Agent Builder ve Inspector ortamlarında MCP sunucularını hata ayıklama

**🎯 Öğrenme Çıktısı**: Modern araçlarla özel MCP sunucuları geliştirme ve hata ayıklama

### [🐙 Modül 4: Pratik MCP Geliştirme - Özel GitHub Clone Sunucusu](./lab4/README.md)

**Süre**: 30 dakika

- 🏗️ Gerçek dünya geliştirme iş akışları için GitHub Clone MCP Sunucusu oluşturma
- 🔄 Doğrulama ve hata yönetimi ile akıllı depo klonlama uygulama
- 📁 Akıllı dizin yönetimi ve VS Code entegrasyonu oluşturma
- 🤖 GitHub Copilot Agent Modu ve özel MCP araçları kullanma
- 🛡️ Üretim hazır güvenilirlik ve çoklu platform uyumluluğu sağlama

**🎯 Öğrenme Çıktısı**: Gerçek geliştirme iş akışlarını kolaylaştıran üretim hazır MCP sunucusu kurma

## 💡 Gerçek Dünya Uygulamaları ve Etkisi

### 🏢 Kurumsal Kullanım Senaryoları

#### 🔄 DevOps Otomasyonu

Geliştirme iş akışınızı zeki otomasyonla dönüştürün:

- **Akıllı Depo Yönetimi**: AI destekli kod inceleme ve birleştirme kararları
- **Akıllı CI/CD**: Kod değişikliklerine dayalı otomatik pipeline optimizasyonu
- **Sorun Sınıflandırma**: Otomatik hata sınıflandırması ve ataması

#### 🧪 Kalite Güvencesinde Devrim

AI destekli otomasyonla testleri geliştirin:

- **Akıllı Test Üretimi**: Kapsamlı test kümeleri otomatik oluşturma
- **Görsel Regresyon Testi**: AI destekli kullanıcı arayüzü değişikliği tespiti
- **Performans İzleme**: Proaktif sorun tespiti ve çözümü

#### 📊 Veri Boru Hattı Zekası

Daha akıllı veri işleme iş akışları oluşturun:

- **Uyarlanabilir ETL Süreçleri**: Kendi kendini optimize eden veri dönüşümleri
- **Anomali Tespiti**: Gerçek zamanlı veri kalite izleme
- **Akıllı Yönlendirme**: Zeki veri akışı yönetimi

#### 🎧 Müşteri Deneyimi İyileştirme

Olağanüstü müşteri etkileşimleri yaratın:

- **Bağlamı Anlayan Destek**: Müşteri geçmişine erişimi olan AI ajanları
- **Proaktif Sorun Çözümü**: Öngörücü müşteri hizmetleri
- **Çok Kanallı Entegrasyon**: Platformlar arası birleşik AI deneyimi

## 🛠️ Gereksinimler ve Kurulum

### 💻 Sistem Gereksinimleri

| Bileşen | Gereksinim | Notlar |
|-----------|-------------|-------|
| **İşletim Sistemi** | Windows 10+, macOS 10.15+, Linux | Herhangi modern işletim sistemi |
| **Visual Studio Code** | En son kararlı sürüm | Microsoft Foundry Toolkit için gerekli |
| **Node.js** | v18.0+ ve npm | MCP sunucu geliştirme için |
| **Python** | 3.10+ | Python MCP sunucuları için isteğe bağlı |
| **Bellek** | En az 8GB RAM | Yerel modeller için 16GB önerilir |

### 🔧 Geliştirme Ortamı

#### Önerilen VS Code Eklentileri

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - İsteğe bağlı ama faydalı

#### İsteğe Bağlı Araçlar

- **uv**: Modern Python paket yöneticisi
- **MCP Inspector**: MCP sunucuları için görsel hata ayıklama aracı
- **Playwright**: Web otomasyonu örnekleri için

## 🎖️ Öğrenme Çıktıları ve Sertifika Yolu

### 🏆 Beceri Ustalık Kontrol Listesi

Bu atölyeyi tamamlayarak şu alanlarda ustalaşacaksınız:

#### 🎯 Temel Yetkinlikler

- [ ] **MCP Protokolü Ustalığı**: Mimari ve uygulama desenlerinde derin anlayış
- [ ] **Microsoft Foundry Toolkit Yetkinliği**: Microsoft Foundry Toolkit ile hızlı geliştirme uzmanlığı
- [ ] **Özel Sunucu Geliştirme**: Üretim MCP sunucuları oluşturma, dağıtma ve sürdürme
- [ ] **Araç Entegrasyonunda Mükemmellik**: AI’yı mevcut geliştirme iş akışlarıyla sorunsuz bağlama
- [ ] **Problem Çözme Uygulaması**: Edinilen becerileri gerçek iş zorluklarına uygulama

#### 🔧 Teknik Beceriler

- [ ] VS Code’da Microsoft Foundry Toolkit kurulum ve yapılandırması
- [ ] Özel MCP sunucuları tasarlama ve uygulama
- [ ] GitHub Modellerini MCP mimarisiyle entegre etme
- [ ] Playwright ile otomatik test iş akışları kurma
- [ ] Üretim kullanımı için AI ajanları dağıtma
- [ ] MCP sunucu performansını hata ayıklama ve optimize etme

#### 🚀 İleri Yetenekler

- [ ] Kurumsal ölçekli AI entegrasyonları mimarisi oluşturma
- [ ] AI uygulamaları için güvenlik en iyi uygulamalarını uygulama
- [ ] Ölçeklenebilir MCP sunucu mimarileri tasarlama
- [ ] Belirli alanlar için özel araç zincirleri oluşturma
- [ ] AI-yerel geliştirmede başkalarına rehberlik etme

## 📖 Ek Kaynaklar

- [MCP Spesifikasyonu (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHub Deposu](https://github.com/microsoft/vscode-ai-toolkit)
- [Örnek MCP Sunucu Koleksiyonu](https://github.com/modelcontextprotocol/servers)
- [En İyi Uygulamalar Kılavuzu](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Güvenlik en iyi uygulamaları

---

**🚀 AI geliştirme iş akışınızı devrim yaratmaya hazır mısınız?**

MCP ve Microsoft Foundry Toolkit ile akıllı uygulamaların geleceğini birlikte inşa edelim!

## Sonraki Adım

Devam et: [Modül 11: MCP Sunucu Uygulamalı Laboratuvarlar](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->