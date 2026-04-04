# Azure AI Agent Hizmeti Geliştirme

Bu egzersizde, [Microsoft Foundry portalında](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) Azure AI Agent hizmet araçlarını kullanarak Uçuş Rezervasyonu için bir ajan oluşturacaksınız. Ajan, kullanıcılarla etkileşimde bulunabilir ve uçuşlar hakkında bilgi verebilir.

## Önkoşullar

Bu egzersizi tamamlamak için aşağıdakilere ihtiyacınız var:
1. Aktif aboneliğe sahip bir Azure hesabı. [Ücretsiz hesap oluşturun](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Bir Microsoft Foundry hubı oluşturma izniniz olmalı veya sizin için oluşturulmuş olmalı.
    - Rolünüz Katkıda Bulunan veya Sahip ise, bu eğitimdeki adımları izleyebilirsiniz.

## Microsoft Foundry hubı oluşturun

> **Not:** Microsoft Foundry, önceden Azure AI Studio olarak bilinirdi.

1. Bir Microsoft Foundry hubı oluşturmak için [Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) blog yazısından bu kılavuzu takip edin.
2. Projeniz oluşturulduğunda, gösterilen ipuçlarını kapatın ve Microsoft Foundry portalındaki proje sayfasını inceleyin. Sayfa aşağıdaki görsele benzer olmalıdır:

    ![Microsoft Foundry Project](../../../translated_images/tr/azure-ai-foundry.88d0c35298348c2f.webp)

## Model dağıtımı yapın

1. Projenizin sol panelinde, **Varlıklarım** bölümünde, **Modeller + uç noktalar** sayfasını seçin.
2. **Modeller + uç noktalar** sayfasında, **Model dağıtımları** sekmesinde, **+ Model dağıt** menüsünden **Temel modeli dağıt** seçeneğini seçin.
3. Listede `gpt-4o-mini` modelini arayın, ardından seçin ve onaylayın.

    > **Not**: TPM'yi düşürmek, kullandığınız abonelikteki kotanın aşırı kullanılmasını önlemeye yardımcı olur.

    ![Model Deployed](../../../translated_images/tr/model-deployment.3749c53fb81e18fd.webp)

## Bir ajan oluşturun

Artık bir model dağıttığınıza göre, bir ajan oluşturabilirsiniz. Ajan, kullanıcılarla etkileşimde bulunabilen konuşma tabanlı bir yapay zeka modelidir.

1. Projenizin sol panelinde, **Oluştur ve Özelleştir** bölümünde, **Ajanlar** sayfasını seçin.
2. Yeni bir ajan oluşturmak için **+ Ajan oluştur** seçeneğine tıklayın. **Ajan Kurulumu** iletişim kutusunda:
    - Ajan için `FlightAgent` gibi bir ad girin.
    - Daha önce oluşturduğunuz `gpt-4o-mini` model dağıtımının seçili olduğundan emin olun.
    - Ajanın takip etmesini istediğiniz yönergeleri **Talimatlar** bölümüne girin. İşte bir örnek:
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
> Ayrıntılı bir talimat seti için, daha fazla bilgi edinmek üzere [bu depoyu](https://github.com/ShivamGoyal03/RoamMind) inceleyebilirsiniz.
    
> Ayrıca, ajanın yeteneklerini artırmak ve kullanıcı talepleri doğrultusunda daha fazla bilgi sağlayıp otomatik görevler gerçekleştirmesini sağlamak için **Bilgi Tabanı** ve **Eylemler** ekleyebilirsiniz. Bu egzersiz için bu adımları atlayabilirsiniz.
    
![Agent Setup](../../../translated_images/tr/agent-setup.9bbb8755bf5df672.webp)

3. Yeni çoklu yapay zekâ ajanı oluşturmak için, sadece **Yeni Ajan** düğmesine tıklayın. Oluşturulan yeni ajan, Ajanlar sayfasında listelenecektir.

## Ajani test edin

Ajanı oluşturduktan sonra, Microsoft Foundry portal oyun alanında kullanıcının sorgularına nasıl yanıt verdiğini test edebilirsiniz.

1. Ajanınızın **Kurulum** panelinin en üstünde, **Oyun alanında dene** seçeneğini seçin.
2. **Oyun Alanı** panelinde, sohbet penceresine sorgular yazarak ajanla etkileşimde bulunabilirsiniz. Örneğin, ajana 28’sinde Seattle'dan New York'a uçuş araması yapmasını isteyebilirsiniz.

    > **Not**: Bu egzersizde gerçek zamanlı veri kullanılmadığı için ajan doğru yanıtlar vermeyebilir. Amaç, ajanın verilen talimatlara göre kullanıcı sorgularını anlama ve yanıt verme yeteneğini test etmektir.

    ![Agent Playground](../../../translated_images/tr/agent-playground.dc146586de715010.webp)

3. Ajanı test ettikten sonra, yeteneklerini geliştirmek için daha fazla niyet, eğitim verisi ve eylem ekleyerek özelleştirmeye devam edebilirsiniz.

## Kaynakları temizleyin

Ajanı test etmeyi bitirdiğinizde, ek maliyet oluşmaması için ajanı silebilirsiniz.
1. [Azure portalını](https://portal.azure.com) açın ve bu egzersizde kullandığınız hub kaynaklarının dağıtıldığı kaynak grubunun içeriğini görüntüleyin.
2. Araç çubuğunda **Kaynak grubunu sil** seçeneğini tıklayın.
3. Kaynak grubu adını girin ve silmek istediğinizi onaylayın.

## Kaynaklar

- [Microsoft Foundry dokümantasyonu](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Microsoft Foundry portalı](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Studio ile Başlarken](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Azure'daki AI ajanlarının temelleri](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstersek de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayın. Orijinal belge, kendi ana dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalar veya yanlış yorumlamalar nedeniyle sorumluluk kabul edilmemektedir.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->