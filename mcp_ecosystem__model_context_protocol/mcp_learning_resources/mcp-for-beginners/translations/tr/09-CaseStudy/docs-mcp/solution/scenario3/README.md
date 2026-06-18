# Senaryo 3: VS Code'da MCP Sunucusu ile Editör İçi Belgeler

## Genel Bakış

Bu senaryoda, Microsoft Learn Belgelerini MCP sunucusunu kullanarak Visual Studio Code ortamınıza nasıl doğrudan getireceğinizi öğreneceksiniz. Belgeleri aramak için sürekli olarak tarayıcı sekmeleri arasında geçiş yapmak yerine, resmi belgelere düzenleyici içinde erişebilir, arama yapabilir ve referans verebilirsiniz. Bu yaklaşım iş akışınızı hızlandırır, odaklanmanızı sağlar ve GitHub Copilot gibi araçlarla sorunsuz entegrasyon imkanı sunar.

- Kodlama ortamınızı terk etmeden VS Code içinde belgeleri arayın ve okuyun.
- Belgeleri referans gösterin ve bağlantıları doğrudan README veya kurs dosyalarınıza ekleyin.
- Birleşik, yapay zekâ destekli bir belge akışı için GitHub Copilot ve MCP'yi birlikte kullanın.

## Öğrenme Hedefleri

Bu bölümün sonunda, VS Code içinde MCP sunucusunu kurup kullanarak belge ve geliştirme iş akışınızı nasıl geliştireceğinizi anlayacaksınız. Şunları yapabileceksiniz:

- Belge araması için MCP sunucusunu kullanacak şekilde çalışma alanınızı yapılandırmak.
- VS Code içinden doğrudan belge aramak ve eklemek.
- Daha üretken, yapay zekâ destekli bir iş akışı için GitHub Copilot ve MCP'nin gücünü birleştirmek.

Bu beceriler, odaklanmanızı sürdürmenize, belge kalitesini artırmanıza ve bir geliştirici veya teknik yazar olarak verimliliğinizi artırmanıza yardımcı olacaktır.

## Çözüm

Editör içinde belgeye erişim sağlamak için MCP sunucusunu VS Code ve GitHub Copilot ile entegre eden bir dizi adımı izleyeceksiniz. Bu çözüm, kurs yazarları, belge yazarları ve belgeler ile Copilot üzerinde çalışırken odaklarını düzenleyicide tutmak isteyen geliştiriciler için idealdir.

- Bir kurs veya proje belgesi yazarken README dosyasına hızlıca referans bağlantıları ekleyin.
- Copilot'u kod üretmek için, MCP'yi ise ilgili belgeleri anında bulmak ve atıfta bulunmak için kullanın.
- Düzenleyicide odaklanmaya devam edin ve verimliliği artırın.

### Adım Adım Rehber

Başlamak için şu adımları izleyin. Her adım için işlemi görsel olarak göstermek amacıyla assets klasöründen bir ekran görüntüsü ekleyebilirsiniz.

1. **MCP yapılandırmasını ekleyin:**
   Proje kökünüzde `.vscode/mcp.json` dosyası oluşturun ve aşağıdaki yapılandırmayı ekleyin:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Bu yapılandırma, VS Code'a [`Microsoft Learn Docs MCP sunucusuna`](https://github.com/MicrosoftDocs/mcp) nasıl bağlanacağını söyler.
   
   ![Adım 1: mcp.json dosyasını .vscode klasörüne ekleyin](../../../../../../translated_images/tr/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **GitHub Copilot Chat panelini açın:**
   Eğer GitHub Copilot eklentisinin yüklü değilse, VS Code'da Uzantılar görünümüne gidip yükleyin. Eklentiyi doğrudan [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) üzerinden indirebilirsiniz. Ardından, kenar çubuğundan Copilot Chat panelini açın.

   ![Adım 2: Copilot Chat panelini açın](../../../../../../translated_images/tr/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Agent modunu etkinleştirin ve araçları doğrulayın:**
   Copilot Chat panelinde agent modunu etkinleştirin.

   ![Adım 3: Agent modunu etkinleştirin ve araçları doğrulayın](../../../../../../translated_images/tr/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Agent modunu etkinleştirdikten sonra MCP sunucusunun mevcut araçlar arasında listelendiğini doğrulayın. Bu, Copilot agent'ın belge sunucusuna erişip ilgili bilgileri getirebilmesini sağlar.
   
   ![Adım 3: MCP sunucu aracını doğrulayın](../../../../../../translated_images/tr/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Yeni bir sohbet başlatın ve agent'a komut verin:**
   Copilot Chat panelinde yeni bir sohbet açın. Şimdi belge sorgularınızla agent'ı yönlendirebilirsiniz. Agent, MCP sunucusunu kullanarak ilgili Microsoft Learn belgelerini doğrudan editör içinde getirecektir.

   - *"X konusu için bir çalışma planı yazmaya çalışıyorum. 8 hafta boyunca çalışacağım, her hafta için önerilecek içeriği belirt."*

   ![Adım 4: Agent'a sohbet penceresinde komut verin](../../../../../../translated_images/tr/step4-prompt-chat.12187bb001605efc.webp)

5. **Canlı Sorgu:**

   > Microsoft Foundry Discord’daki [#get-help](https://discord.gg/D6cRhjHWSC) bölümünden canlı bir sorgu alalım ([orijinal mesajı görüntüle](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Azure AI Foundry üzerinde geliştirilen AI agentlarıyla çoklu-agent çözümü dağıtımı hakkında cevap arıyorum. Copilot Studio kanalları gibi doğrudan bir dağıtım yöntemi olmadığını görüyorum. Peki, kurumsal kullanıcıların etkileşimde bulunup işi tamamlaması için bu dağıtımı gerçekleştirmek adına farklı yöntemler nelerdir?
Birçok makale/blog, MS Teams ile Azure AI Foundry Agentları arasında köprü görevi görebilecek Azure Bot hizmeti kullanabileceğimizi söylüyor. Peki, Azure function aracılığıyla Azure AI Foundry’deki Orchestrator Agent’a bağlanan bir Azure botu kurarsam bu çalışır mı? Yoksa Bot Framework'te orkestrasyon yapmak için çoklu agent çözümündeki her AI agent için ayrı Azure function mı oluşturmalıyım? Başka önerileriniz varsa memnuniyetle karşılarım.
"*

   ![Adım 5: Canlı sorgular](../../../../../../translated_images/tr/step5-live-queries.49db3e4a50bea273.webp)

   Agent ilgili belge bağlantıları ve özetlerle yanıt verecek, bunları markdown dosyalarınıza doğrudan ekleyebilir veya kodunuzda referans olarak kullanabilirsiniz.
   
### Örnek Sorgular

Deneyebileceğiniz bazı örnek sorgular burada. Bu sorgular, MCP sunucusu ve Copilot'un VS Code'u terk etmeden anında, bağlama duyarlı belgeler ve referanslar sağlamada nasıl birlikte çalıştığını gösterecektir:

- "Azure Functions tetikleyicilerini nasıl kullanacağımı göster."
- "Azure Key Vault için resmi belgelerden bir bağlantı ekle."
- "Azure kaynaklarının güvenliğini sağlamada en iyi uygulamalar nelerdir?"
- "Azure AI servisleri için hızlı başlangıç örneği bul."

Bu sorgular, MCP sunucusu ve Copilot'un VS Code dışına çıkmadan anında bağlama duyarlı belgeler ve referanslar sağlamada nasıl birlikte çalıştığını gösterecektir.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->