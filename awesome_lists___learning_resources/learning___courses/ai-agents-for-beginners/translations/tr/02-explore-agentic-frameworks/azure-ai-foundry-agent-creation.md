# Microsoft Foundry Ajan Servisi Geliştirme

Bu egzersizde, Uçuş Rezervasyonu için bir ajan oluşturmak üzere [Microsoft Foundry portalında](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) Microsoft Foundry Agent Service araçlarını kullanacaksınız. Ajan, kullanıcılarla etkileşimde bulunabilecek ve uçuşlar hakkında bilgi sağlayabilecektir.

## Önkoşullar

Bu egzersizi tamamlamak için şunlara ihtiyacınız var:
1. Aktif aboneliğe sahip bir Azure hesabı. [Ücretsiz bir hesap oluşturun](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Bir Microsoft Foundry hub'ı oluşturma izniniz olması veya sizin için oluşturulmuş olması gerekir.
    - Rolünüz Katkıda Bulunan veya Sahip ise, bu öğreticideki adımları takip edebilirsiniz.

## Bir Microsoft Foundry hub'ı oluşturma

> **Not:** Microsoft Foundry daha önce Azure AI Studio olarak bilinirdi.

1. Bir Microsoft Foundry hub'ı oluşturmak için [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) blog yazısındaki kılavuzları izleyin.
2. Projeniz oluşturulduğunda, görüntülenen ipuçlarını kapatın ve Microsoft Foundry portalındaki proje sayfasını inceleyin; aşağıdaki resme benzer olmalıdır:

    ![Microsoft Foundry Project](../../../translated_images/tr/azure-ai-foundry.88d0c35298348c2f.webp)

## Bir model dağıtma

1. Proje için sol taraftaki panelde, **Varlıklarım** bölümünde **Modeller + uç noktalar** sayfasını seçin.
2. **Modeller + uç noktalar** sayfasında, **Model dağıtımları** sekmesinde, **+ Model dağıt** menüsünden **Temel modeli dağıt** seçeneğini seçin.
3. Listede `gpt-4.1-mini` modelini arayın, ardından seçin ve onaylayın.

    > **Not**: TPM'i düşürmek, kullandığınız abonelikte mevcut olan kota aşımını önlemeye yardımcı olur.

    ![Model Deployed](../../../translated_images/tr/model-deployment.3749c53fb81e18fd.webp)

## Bir ajan oluşturma

Artık bir model dağıttığınıza göre, bir ajan oluşturabilirsiniz. Ajan, kullanıcılarla etkileşimde bulunmak için kullanılabilen bir konuşma AI modelidir.

1. Proje için sol taraftaki panelde, **Oluştur & Özelleştir** bölümünde **Ajanlar** sayfasını seçin.
2. Yeni bir ajan oluşturmak için **+ Ajan oluştur** seçeneğine tıklayın. **Ajan Kurulumu** iletişim kutusunda:
    - Ajan için `FlightAgent` gibi bir ad girin.
    - Daha önce oluşturduğunuz `gpt-4.1-mini` model dağıtımının seçili olduğundan emin olun.
    - Ajanın izlemesini istediğiniz istem doğrultusunda **Talimatları** ayarlayın. İşte bir örnek:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> Ayrıntılı bir istem için daha fazla bilgiye [bu depodan](https://github.com/ShivamGoyal03/RoamMind) ulaşabilirsiniz.
    
> Ayrıca, kullanıcının taleplerine göre daha fazla bilgi sağlamak ve otomatik görevleri yerine getirmek için **Bilgi Tabanı** ve **Eylemler** ekleyerek ajanın yeteneklerini geliştirebilirsiniz. Bu egzersiz için bu adımları geçebilirsiniz.
    
![Agent Setup](../../../translated_images/tr/agent-setup.9bbb8755bf5df672.webp)

3. Yeni çoklu-AI ajanı oluşturmak için sadece **Yeni Ajan** seçeneğine tıklayın. Yeni oluşturulan ajan Ajanlar sayfasında görünecektir.


## Ajani test etme

Ajanı oluşturduktan sonra, Microsoft Foundry portalındaki oyun alanında kullanıcılardan gelen sorgulara nasıl yanıt verdiğini test edebilirsiniz.

1. Ajanınızın **Kurulum** panelinin üst kısmında **Oyun alanında dene** seçeneğini seçin.
2. **Oyun alanı** panelinde, sohbet penceresine sorgular yazarak ajanla etkileşimde bulunabilirsiniz. Örneğin, ajanı 28'inde Seattle'dan New York'a uçuş araması yapması için sorabilirsiniz.

    > **Not**: Bu egzersizde gerçek zamanlı veri kullanılmadığı için ajanın verdiği yanıtlar tam olarak doğru olmayabilir. Amaç, ajanın sağlanan talimatlara göre kullanıcı sorgularını anlama ve yanıt verme yeteneğini test etmektir.

    ![Agent Playground](../../../translated_images/tr/agent-playground.dc146586de715010.webp)

3. Ajani test ettikten sonra, daha fazla niyet, eğitim verisi ve eylem ekleyerek yeteneklerini artırmak için özelleştirebilirsiniz.

## Kaynakları temizleme

Ajanı test etmeyi bitirdiğinizde, ek maliyetlerden kaçınmak için silebilirsiniz.
1. [Azure portalını](https://portal.azure.com) açın ve bu egzersizde kullanacağınız hub kaynaklarının dağıtıldığı kaynak grubunun içeriğini görüntüleyin.
2. Araç çubuğunda **Kaynak grubunu sil** seçeneğini tıklayın.
3. Kaynak grubu adını girin ve silmek istediğinizi onaylayın.

## Kaynaklar

- [Microsoft Foundry belgeleri](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portalı](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry ile Başlarken](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure'da AI ajanlarının temel prensipleri](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->