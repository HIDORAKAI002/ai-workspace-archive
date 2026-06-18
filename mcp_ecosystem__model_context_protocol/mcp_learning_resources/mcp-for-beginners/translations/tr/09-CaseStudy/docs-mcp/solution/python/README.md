# Chainlit & Microsoft Learn Docs MCP ile Çalışma Planı Oluşturucu

## Ön Koşullar

- Python 3.8 veya daha üstü
- pip (Python paket yöneticisi)
- Microsoft Learn Docs MCP sunucusuna bağlantı için internet erişimi

## Kurulum

1. Bu depoyu klonlayın ya da proje dosyalarını indirin.
2. Gerekli bağımlılıkları yükleyin:

   ```bash
   pip install -r requirements.txt
   ```

## Kullanım

### Senaryo 1: Docs MCP için Basit Sorgu
Docs MCP sunucusuna bağlanan, bir sorgu gönderen ve sonucu yazdıran komut satırı istemcisi.

1. Betiği çalıştırın:
   ```bash
   python scenario1.py
   ```
2. İstekte beliren komut satırına belgeleme sorunuzu girin.

### Senaryo 2: Çalışma Planı Oluşturucu (Chainlit Web Uygulaması)
Kullanıcıların herhangi bir teknik konu için kişiselleştirilmiş, hafta hafta çalışma planı oluşturmasına olanak tanıyan web tabanlı arayüz (Chainlit kullanılarak).

1. Chainlit uygulamasını başlatın:
   ```bash
   chainlit run scenario2.py
   ```
2. Terminalde sağlanan yerel URL’yi (örneğin http://localhost:8000) tarayıcınızda açın.
3. Sohbet penceresine çalışma konunuzu ve çalışmak istediğiniz hafta sayısını girin (örneğin, "AI-900 sertifikası, 8 hafta").
4. Uygulama, ilgili Microsoft Learn dokümantasyonuna bağlantılarla birlikte hafta hafta çalışma planı ile yanıt verecektir.

**Gerekli Ortam Değişkenleri:**

Senaryo 2’yi (Azure OpenAI ile Chainlit web uygulaması) kullanmak için, `python` dizininde bir `.env` dosyasına aşağıdaki ortam değişkenlerini tanımlamalısınız:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Uygulamayı çalıştırmadan önce bu değerleri Azure OpenAI kaynak bilgilerinizle doldurun.

> [!TIP]
> Kendi modellerinizi kolayca [Microsoft Foundry](https://ai.azure.com/) ile dağıtabilirsiniz.

### Senaryo 3: VS Code’da MCP Sunucusu ile Düzenleyici İçi Dokümantasyon

Tarayıcı sekmeleri arasında geçiş yapmadan dokümantasyonda arama yapmak yerine, Microsoft Learn Docs’u doğrudan MCP sunucusunu kullanarak VS Code’a getirebilirsiniz. Bu size şunları sağlar:
- Kodlama ortamınızı terk etmeden VS Code içinde dokümanları arama ve okuma.
- Dokümantasyonu referans gösterme ve bağlantıları doğrudan README veya kurs dosyalarınıza ekleme.
- GitHub Copilot ve MCP’yi bir arada kullanarak kesintisiz, yapay zekâ destekli dokümantasyon iş akışı.

**Örnek Kullanım Senaryoları:**
- Bir kurs veya proje dokümantasyonu yazarken README’ye hızlıca referans bağlantıları eklemek.
- Copilot ile kod üretirken MCP ile ilgili dokümanları hemen bulup referans vermek.
- Düzenleyicinizde odaklanmak ve verimliliği artırmak.

> [!IMPORTANT]
> Çalışma alanınızda geçerli bir [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) yapılandırması olduğundan emin olun (konum `.vscode/mcp.json`).

## Neden Senaryo 2 İçin Chainlit?

Chainlit, sohbet tabanlı web uygulamaları oluşturmak için modern ve açık kaynaklı bir çerçevedir. Microsoft Learn Docs MCP sunucusu gibi arka uç hizmetlere bağlanan sohbet tabanlı kullanıcı arayüzlerini kolayca oluşturmanızı sağlar. Bu proje, kişiselleştirilmiş çalışma planlarını gerçek zamanlı olarak oluşturmak için basit, etkileşimli bir yol sunmak üzere Chainlit kullanır. Chainlit’i kullanarak üretkenliği ve öğrenmeyi artıran sohbet tabanlı araçlar hızlıca geliştirilip dağıtılabilir.

## Bu Uygulama Ne Yapar?

Bu uygulama, kullanıcıların sadece bir konu ve süre girerek kişiselleştirilmiş bir çalışma planı oluşturmasına olanak tanır. Uygulama girdinizi analiz eder, Microsoft Learn Docs MCP sunucusundan ilgili içeriği sorgular ve sonuçları yapılandırılmış, hafta hafta bir plan halinde düzenler. Her haftanın önerileri sohbette gösterilir, böylece ilerlemenizi takip etmek kolaylaşır. Entegrasyon, her zaman en güncel ve ilgili öğrenme kaynaklarını almanızı sağlar.

## Örnek Sorgular

Uygulamanın nasıl yanıt verdiğini görmek için sohbet penceresine aşağıdaki sorguları deneyin:

- `AI-900 sertifikası, 8 hafta`
- `Azure Functions öğren, 4 hafta`
- `Azure DevOps, 6 hafta`
- `Azure’da veri mühendisliği, 10 hafta`
- `Microsoft güvenlik temelleri, 5 hafta`
- `Power Platform, 7 hafta`
- `Azure AI servisleri, 12 hafta`
- `Bulut mimarisi, 9 hafta`

Bu örnekler uygulamanın farklı öğrenme amaçları ve süreleri için esnekliğini göstermektedir.

## Kaynaklar

- [Chainlit Dokümantasyonu](https://docs.chainlit.io/)
- [MCP Dokümantasyonu](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->