# Vaka İncelemesi: REST API'yi API Yönetiminde MCP sunucusu olarak ortaya çıkarma

Azure API Management, API Uç Noktalarınızın üzerinde bir Geçit sağlayan bir hizmettir. Azure API Management’ın çalışma şekli, API'lerinizin önünde bir vekil gibi hareket etmesi ve gelen isteklerle ne yapılacağına karar vermesidir.

Bunu kullanarak, şunlar gibi birçok özelliği eklersiniz:

- **Güvenlik**, API anahtarlarından JWT'ye ve yönetilen kimliğe kadar her şeyi kullanabilirsiniz.
- **Oran sınırlama (rate limiting)**, belirli bir zaman birimi başına kaç çağrının geçmesine izin verileceğine karar verebilme harika bir özelliktir. Bu, tüm kullanıcıların mükemmel bir deneyim yaşamasını sağlarken servisinizin isteklerle aşırı yüklenmemesine de yardımcı olur.
- **Ölçeklendirme ve Yük dengeleme**. Yükü dengelemek için birden çok uç nokta yapılandırabilir ve "yük dengeleme" yöntemini de seçebilirsiniz.
- **Anlamsal önbellekleme gibi AI özellikleri**, token limiti ve token izleme ve daha fazlası. Bunlar, yanıt hızını artıran ve token harcamanızı takip etmenize yardımcı olan harika özelliklerdir. [Buradan daha fazla bilgi edinin](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Neden MCP + Azure API Yönetimi?

Model Context Protocol, ajan tabanlı AI uygulamaları için ve araçlar ile verileri tutarlı bir şekilde ortaya çıkarmak için hızla standart haline geliyor. Azure API Management, API’leri "yönetmeniz" gerektiğinde doğal bir tercihtir. MCP Sunucuları genellikle istekleri bir araca çözümlemek için diğer API’lerle entegre olur. Bu nedenle Azure API Management ile MCP’yi birleştirmek çok mantıklıdır.

## Genel Bakış

Bu spesifik kullanım senaryosunda API uç noktalarını bir MCP Sunucusu olarak ortaya çıkarmayı öğreneceğiz. Böylece, bu uç noktaları kolayca bir ajan tabanlı uygulamanın parçası haline getirebilir ve aynı zamanda Azure API Management’ın özelliklerinden faydalanabiliriz.

## Temel Özellikler

- Erişime açmak istediğiniz uç nokta yöntemlerini seçersiniz.
- Ek özellikler, API'niz için politika bölümünde yapılandırdıklarınıza bağlıdır. Ancak burada oran sınırlama eklemenin nasıl yapılacağını göstereceğiz.

## Ön Adım: Bir API İçe Aktarma

Azure API Management’ta halihazırda bir API'nız varsa harika, bu adımı atlayabilirsiniz. Yoksa, şu bağlantıya bakın, [Azure API Management'a API içe aktarma](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## API'yi MCP Sunucusu olarak ortaya çıkarma

API uç noktalarını ortaya çıkarmak için şu adımları izleyelim:

1. Azure Portal'a gidin ve şu adrese erişin: <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
API Yönetimi örneğinize gidin.

1. Sol menüde, APIs > MCP Servers > + Create new MCP Server seçeneğini seçin.

1. API’de, MCP sunucusu olarak ortaya çıkarılacak bir REST API seçin.

1. Araç olarak ortaya çıkarılacak bir veya birden çok API İşlem (Operation) seçin. Tüm işlemleri veya sadece belirli işlemleri seçebilirsiniz.

    ![Açığa çıkarılacak yöntemleri seçin](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. **Create** seçeneğine tıklayın.

1. Menüden **APIs** ve **MCP Servers** seçeneklerine gidin, aşağıdakini görmelisiniz:

    ![Ana ekranda MCP Sunucusunu görün](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    MCP sunucusu oluşturuldu ve API işlemleri araç olarak ortaya çıkarıldı. MCP sunucusu MCP Servers bölümünde listelenir. URL sütunu, test etmek veya bir istemci uygulaması içinde çağırmak için kullanabileceğiniz MCP sunucusunun uç noktasını gösterir.

## İsteğe bağlı: Politikaları yapılandırma

Azure API Management, uç noktalarınız için farklı kurallar belirlediğiniz temel olarak politikalar (policies) kavramına sahiptir, örneğin oran sınırlama veya anlamsal önbellekleme gibi. Bu politikalar XML formatında yazılır.

İşte MCP Sunucunuzda oran sınırlama politikası kurmanın yolu:

1. Portalda, APIs altında **MCP Servers** seçin.

1. Oluşturduğunuz MCP sunucusunu seçin.

1. Sol menüde MCP altında **Policies** seçin.

1. Politika düzenleyicide MCP sunucusunun araçlarına uygulamak istediğiniz politikaları ekleyin veya düzenleyin. Politikalar XML formatında tanımlanır. Örneğin, MCP sunucusunun araçlarına yapılan çağrıları sınırlandırmak için bir politika ekleyebilirsiniz (bu örnekte, istemci IP adresi başına 30 saniyede 5 çağrı). Aşağıdaki XML oran sınırlaması sağlar:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    İşte politika düzenleyicisinin bir resmi:

    ![Politika düzenleyicisi](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Deneyin

MCP Sunucumuzun beklendiği gibi çalıştığını doğrulayalım.

Bunun için Visual Studio Code ve GitHub Copilot'un Agent modu kullanılacaktır. MCP sunucusunu *mcp.json* dosyasına ekleyeceğiz. Böylece Visual Studio Code, ajan özellikli bir istemci olarak davranacak ve son kullanıcılar bir istem yazıp bu sunucu ile etkileşimde bulunabilecek.

MCP sunucusunu Visual Studio Code’a nasıl ekleyeceğimize bakalım:

1. Komut Paletinden MCP: **Add Server komutunu kullanın**.

1. İstendiğinde sunucu türünü seçin: **HTTP (HTTP veya Server Sent Events)**.

1. API Management içindeki MCP sunucusunun URL'sini girin. Örnek: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (SSE uç noktası için) veya **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (MCP uç noktası için), taşıma aracı farkının `/sse` veya `/mcp` olduğunu unutmayın.

1. İstediğiniz bir sunucu kimliği girin. Bu önemli bir değer değildir ama bu sunucu örneğinin ne olduğunu hatırlamanıza yardımcı olur.

1. Yapılandırmayı çalışma alanı ayarlarına mı yoksa kullanıcı ayarlarına mı kaydedeceğinizi seçin.

  - **Çalışma alanı ayarları** - Sunucu yapılandırması, sadece geçerli çalışma alanında kullanılabilen bir .vscode/mcp.json dosyasına kaydedilir.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    ya da taşıma olarak streaming HTTP seçerseniz, biraz farklı olur:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Kullanıcı ayarları** - Sunucu yapılandırması, küresel *settings.json* dosyanıza eklenir ve tüm çalışma alanlarında kullanılabilir. Yapılandırma aşağıdakine benzer:

    ![Kullanıcı ayarı](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Ayrıca yapılandırmaya, Azure API Management’a doğru düzgün kimlik doğrulaması için bir başlık eklemeniz gerekir. **Ocp-Apim-Subscription-Key** adlı bir başlık kullanılır.

    - Ayarlara nasıl ekleyebileceğiniz:

    ![Kimlik doğrulama için başlık ekleme](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), bu, sizden Azure API Management örneğiniz için Azure Portal'da bulabileceğiniz API anahtarı değerini girmeniz istenen bir istem görüntülenmesini sağlar.

   - Bunu *mcp.json* dosyasına eklemek için şöyle ekleyebilirsiniz:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Agent modunu kullanma

Şimdi ya ayarlarda ya da *.vscode/mcp.json* içerisinde yapılandırmayı tamamladık. Şimdi deneyelim.

Araçların listelendiği aşağıdaki gibi bir Araçlar simgesi olmalıdır:

![Sunucudan araçlar](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Araçlar simgesine tıklayın, aşağıdaki gibi bir araç listesi görmelisiniz:

    ![Araçlar](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Sohbete bir istem girerek aracı çağırın. Örneğin, bir sipariş hakkında bilgi almak için bir araç seçtiyseniz, ajandan sipariş hakkında sorabilirsiniz. İşte örnek bir istem:

    ```text
    get information from order 2
    ```

    Size bir araçtırma uyarısı ile bir araç simgesi gösterilecek. Aracı çalıştırmaya devam etmeyi seçin, aşağıdaki gibi bir çıktı görmelisiniz:

    ![İstem sonucundan çıktı](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **Yukarıda gördüğünüz, kurduğunuz araçlara bağlıdır, ancak amaç yukarıdaki gibi metinsel bir yanıt almaktır**


## Referanslar

Daha fazla nasıl öğrenebileceğiniz:

- [Azure API Management ve MCP üzerine Eğitim](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Python örneği: Azure API Management kullanarak güvenli uzak MCP sunucuları (deneysel)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP istemci yetkilendirme laboratuvarı](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Azure API Management uzantısını kullanarak VS Code'da API içe aktarımı ve yönetimi](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Azure API Center'da uzak MCP sunucularını kaydetme ve keşfetme](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Azure API Management ile birçok AI yeteneğini gösteren harika bir depo
- [AI Gateway atölyeleri](https://azure-samples.github.io/AI-Gateway/) Azure Portal kullanılarak yapılan atölyeleri içerir, AI özelliklerini değerlendirmek için harika bir başlangıçtır.

## Sonraki Ne Var

- Geri: [Vaka İncelemeleri Genel Bakış](./README.md)
- Sonraki: [Azure AI Seyahat Acenteleri](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba gösterilse de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde otoriter kaynak olarak kabul edilmelidir. Önemli bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucunda oluşabilecek yanlış anlamalar veya yanlış yorumlamalar nedeniyle sorumluluk kabul edilmemektedir.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->