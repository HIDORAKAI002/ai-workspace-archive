# 🐙 Modül 4: Pratik MCP Geliştirme - Özel GitHub Klon Sunucusu

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Hızlı Başlangıç:** Sadece 30 dakikada GitHub deposu klonlamayı ve VS Code entegrasyonunu otomatikleştiren üretime hazır bir MCP sunucusu oluşturun!

## 🎯 Öğrenme Hedefleri

Bu laboratuvarın sonunda şunları yapabileceksiniz:

- ✅ Gerçek dünya geliştirme iş akışları için özel bir MCP sunucusu oluşturmak
- ✅ MCP üzerinden GitHub depo klonlama işlevselliği uygulamak
- ✅ Özel MCP sunucularını VS Code ve Agent Builder ile entegre etmek
- ✅ Özel MCP araçlarıyla GitHub Copilot Agent Modu kullanmak
- ✅ Üretim ortamlarında özel MCP sunucularını test edip dağıtmak

## 📋 Önkoşullar

- Laboratuvar 1-3'ün tamamlanması (MCP temelleri ve ileri geliştirme)
- GitHub Copilot aboneliği ([ücretsiz kayıt mevcut](https://github.com/github-copilot/signup))
- Microsoft Foundry Toolkit ve GitHub Copilot uzantılarına sahip VS Code
- Yüklü ve yapılandırılmış Git CLI

## 🏗️ Proje Genel Bakış

### **Gerçek Dünya Geliştirme Meydan Okuması**
Geliştiriciler olarak, sıklıkla GitHub kullanarak depoları klonlar ve bunları VS Code veya VS Code Insiders'da açarız. Bu manuel işlem şunları içerir:
1. Terminal/komut istemcisini açmak
2. İstenilen dizine gitmek
3. `git clone` komutunu çalıştırmak
4. Klonlanan dizinde VS Code'u açmak

**Bizim MCP çözümümüz bunu tek bir akıllı komuta dönüştürüyor!**

### **Neyi İnşa Edeceksiniz**
Bir **GitHub Klon MCP Sunucusu** (`git_mcp_server`) oluşturacaksınız ve şu özellikleri sağlayacak:

| Özellik | Açıklama | Fayda |
|---------|----------|-------|
| 🔄 **Akıllı Depo Klonlama** | GitHub depolarını doğrulama ile klonlar | Otomatik hata kontrolü |
| 📁 **Akıllı Dizin Yönetimi** | Dizinleri güvenli şekilde kontrol eder ve oluşturur | Üzerine yazmayı engeller |
| 🚀 **Çapraz Platform VS Code Entegrasyonu** | Projeleri VS Code/Insiders’da açar | Kesintisiz iş akışı geçişi |
| 🛡️ **Güçlü Hata Yönetimi** | Ağ, izin ve yol sorunlarını ele alır | Üretime hazır güvenilirlik |

---

## 📖 Adım Adım Uygulama

### Adım 1: Agent Builder’da GitHub Ajanı Oluşturma

1. Microsoft Foundry Toolkit uzantısı üzerinden **Agent Builder'ı başlatın**
2. Şu yapılandırmayla **yeni bir ajan oluşturun:**
   ```
   Agent Name: GitHubAgent
   ```

3. **Özel MCP sunucusunu başlatın:**
   - **Tools** → **Add Tool** → **MCP Server** menüsüne gidin
   - **"Create A new MCP Server"** seçeneğini seçin
   - Esneklik için **Python şablonunu** seçin
   - **Sunucu Adı:** `git_mcp_server`

### Adım 2: GitHub Copilot Agent Modunu Yapılandırma

1. VS Code’da **GitHub Copilot’u açın** (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. Copilot arayüzünde **Agent Model seçin**
3. Geliştirilmiş mantık için **Claude 3.7 modelini seçin**
4. Araç erişimi için **MCP entegrasyonunu etkinleştirin**

> **💡 Profesyonel İpucu:** Claude 3.7, geliştirme iş akışları ve hata yönetimi kalıplarını üstün derecede anlar.

### Adım 3: MCP Sunucusunun Temel İşlevselliğini Uygulayın

**GitHub Copilot Agent Modu ile aşağıdaki detaylı istemi kullanın:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Adım 4: MCP Sunucunuzu Test Edin

#### 4a. Agent Builder’da Test

1. Agent Builder için **debug yapılandırmasını başlatın**
2. Ajanınızı aşağıdaki sistem istemiyle yapılandırın:

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. Gerçekçi kullanıcı senaryolarıyla test edin:

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/tr/DebugAgent.81d152370c503241.webp)

**Beklenen Sonuçlar:**
- ✅ Yolu doğrulayarak başarılı klonlama
- ✅ Otomatik VS Code başlatma
- ✅ Geçersiz durumlar için net hata mesajları
- ✅ Kenar durumların doğru yönetimi

#### 4b. MCP Inspector’da Test


![MCP Inspector Testing](../../../../translated_images/tr/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Tebrikler!** Gerçek geliştirme iş akışı zorluklarını çözen pratik ve üretime hazır bir MCP sunucusu oluşturmayı başardınız. Özel GitHub klon sunucunuz, geliştirici verimliliğini otomatikleştirip artırmada MCP gücünü gösteriyor.

### 🏆 Kazanılan Başarılar:
- ✅ **MCP Geliştiricisi** - Özel MCP sunucusu oluşturdu
- ✅ **İş Akışı Otomatörü** - Geliştirme süreçlerini kolaylaştırdı  
- ✅ **Entegrasyon Uzmanı** - Birden fazla geliştirme aracını bağladı
- ✅ **Üretime Hazır** - Dağıtılabilir çözümler geliştirdi

---

## 🎓 Atölye Tamamlandı: Model Context Protocol Yolculuğunuz

**Değerli Atölye Katılımcısı,**

Model Context Protocol atölyesinin dört modülünü tamamladığınız için tebrikler! Microsoft Foundry Toolkit temel kavramlarını öğrenmekten, gerçek dünya geliştirme zorluklarını çözen üretime hazır MCP sunucuları inşa etmeye kadar uzun bir yol katettiniz.

### 🚀 Öğrenme Yolculuğunuzun Özeti:

**[Modül 1](../lab1/README.md)**: Microsoft Foundry Toolkit temellerini, model testlerini ve ilk AI ajanınızı keşfederek başladınız.

**[Modül 2](../lab2/README.md)**: MCP mimarisini öğrendiniz, Playwright MCP’yi entegre ettiniz ve ilk tarayıcı otomasyon ajanınızı oluşturdunuz.

**[Modül 3](../lab3/README.md)**: Hava durumu MCP sunucusuyla özel MCP sunucu geliştirmede ilerlediniz, hata ayıklama araçlarını uzmanlaştınız.

**[Modül 4](../lab4/README.md)**: Şimdi tüm bu bilgileri pratik bir GitHub depo iş akışı otomasyon aracı yaratmak için uyguladınız.

### 🌟 Ustalaştıklarınız:

- ✅ **Microsoft Foundry Toolkit Ekosistemi**: Modeller, ajanlar ve entegrasyon kalıpları
- ✅ **MCP Mimarisi**: İstemci-sunucu tasarımı, taşıma protokolleri ve güvenlik
- ✅ **Geliştirici Araçları**: Playground’dan Inspector’a ve üretim dağıtımına
- ✅ **Özel Geliştirme**: Kendi MCP sunucularınızı oluşturmak, test etmek ve dağıtmak
- ✅ **Pratik Uygulamalar**: AI ile gerçek dünya iş akışlarını çözmek

### 🔮 Bir Sonraki Adımlarınız:

1. **Kendi MCP Sunucunuzu Kurun**: Bu becerileri kullanarak benzersiz iş akışlarınızı otomatikleştirin
2. **MCP Topluluğuna Katılın**: Yaratımlarınızı paylaşın ve diğerlerinden öğrenin
3. **İleri Entegrasyonu Keşfedin**: MCP sunucularını kurumsal sistemlere bağlayın
4. **Açık Kaynağa Katkıda Bulunun**: MCP araçları ve dokümantasyonunu geliştirin

Unutmayın, bu atölye sadece bir başlangıç. Model Context Protocol ekosistemi hızla gelişiyor ve siz artık yapay zeka destekli geliştirme araçlarında ön saflardasınız.

**Katılımınız ve öğrenmeye adanmışlığınız için teşekkür ederiz!**

Umarız bu atölye, geliştirme seyahatinizde yapay zeka araçlarıyla etkileşim şeklinizi dönüştürecek fikirler uyandırmıştır.

**İyi kodlamalar!**

---

## Sırada Ne Var

Modül 10'daki tüm laboratuvarları tamamladığınız için tebrikler!

- Geri dön: [Modül 10 Genel Bakış](../README.md)
- Devam et: [Modül 11: MCP Server Uygulamalı Laboratuvarlar](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->