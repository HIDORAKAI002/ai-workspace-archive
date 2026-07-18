[![AI Ajan Çerçevelerini Keşfetmek](../../../translated_images/tr/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Dersi izlemek için yukarıdaki resme tıklayın)_

# AI Ajan Çerçevelerini Keşfedin

AI ajan çerçeveleri, AI ajanlarının oluşturulmasını, dağıtımını ve yönetimini basitleştirmek için tasarlanmış yazılım platformlarıdır. Bu çerçeveler, geliştiricilere karmaşık AI sistemlerinin geliştirilmesini kolaylaştıran önceden hazırlanmış bileşenler, soyutlamalar ve araçlar sunar.

Bu çerçeveler, geliştiricilerin AI ajan geliştirmedeki ortak zorluklara standart yaklaşımlar sunarak uygulamalarının benzersiz yönlerine odaklanmasını sağlar. AI sistemleri oluştururken ölçeklenebilirlik, erişilebilirlik ve verimliliği artırırlar.

## Giriş 

Bu ders şunları kapsayacak:

- AI Ajan Çerçeveleri nedir ve geliştiricilerin neleri başarmasını sağlar?
- Takımlar bu çerçeveleri ajanlarının yeteneklerini hızlıca prototiplemek, yinelemek ve geliştirmek için nasıl kullanabilir?
- Microsoft tarafından oluşturulan çerçeve ve araçlar arasında ne farklar var (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> ve <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Mevcut Azure ekosistemi araçlarımı doğrudan entegre edebilir miyim yoksa bağımsız çözümler mi gerekir?
- Microsoft Foundry Agent Service nedir ve bana nasıl yardımcı oluyor?

## Öğrenme hedefleri

Bu dersin hedefleri şunlardır:

- AI geliştirmede AI Ajan Çerçevelerinin rolünü anlamak.
- Akıllı ajanlar oluşturmak için AI Ajan Çerçevelerinden nasıl yararlanılacağını öğrenmek.
- AI Ajan Çerçevelerinin sağladığı temel yetenekler.
- Microsoft Agent Framework ve Microsoft Foundry Agent Service arasındaki farklar.

## AI Ajan Çerçeveleri nedir ve geliştiricilere neler yaptırır?

Geleneksel AI Çerçeveleri, AI'yı uygulamalarınıza entegre edip aşağıdaki şekilde bu uygulamaları iyileştirmenize yardımcı olabilir:

- **Kişiselleştirme**: AI, kullanıcı davranışı ve tercihlerini analiz ederek kişiselleştirilmiş öneriler, içerik ve deneyimler sağlar.
Örnek: Netflix gibi streaming servisleri, izleme geçmişine göre film ve dizi önerisi yaparak kullanıcı etkileşimini ve memnuniyetini artırır.
- **Otomasyon ve Verimlilik**: AI tekrar eden işleri otomatikleştirir, iş akışlarını kolaylaştırır ve operasyonel verimliliği artırır.
Örnek: Müşteri hizmetleri uygulamaları AI destekli chatbotlarla yaygın soruları yanıtlayarak yanıt sürelerini kısaltır ve insan ajanların daha karmaşık konulara odaklanmasını sağlar.
- **Gelişmiş Kullanıcı Deneyimi**: AI, ses tanıma, doğal dil işleme ve tahmine dayalı metin gibi akıllı özelliklerle genel kullanıcı deneyimini iyileştirir.
Örnek: Siri ve Google Asistan gibi sanal asistanlar, kullanıcıların cihazlarıyla sesli komutlarla daha kolay etkileşim kurmasını sağlar.

### Her şey harika görünüyor, peki AI Ajan Çerçevesine neden ihtiyacımız var?

AI Ajan çerçeveleri, sadece AI çerçeveleri olmaktan öte bir şeydir. Kullanıcılar, diğer ajanlar ve çevre ile etkileşim kurabilen, belirli hedeflere ulaşabilen akıllı ajanların oluşturulmasını sağlar. Bu ajanlar özerk davranış sergileyebilir, karar verebilir ve değişen koşullara uyum sağlayabilir. AI Ajan Çerçeveleriyle sağlanan ana yeteneklere bakalım:

- **Ajan İşbirliği ve Koordinasyonu**: Birbirleriyle çalışabilen, iletişim kuran ve karmaşık görevleri çözmek için koordinasyon yapan birden çok AI ajanı oluşturmayı sağlar.
- **Görev Otomasyonu ve Yönetimi**: Çok adımlı iş akışlarını otomatikleştiren, görevleri devreden çıkaran ve ajanlar arasında dinamik görev yönetimi mekanizmaları sağlar.
- **Bağlamsal Anlayış ve Uyarlanabilirlik**: Ajanlara bağlamı anlama, ortam değişikliklerine uyum sağlama ve gerçek zamanlı bilgilere dayanarak karar verme yeteneği kazandırır.

Özetle, ajanlar size daha fazlasını yapma, otomasyonu ileri seviyeye taşıma ve çevrelerinden öğrenip uyum sağlayabilen daha akıllı sistemler yaratma olanağı verir.

## Ajanın yeteneklerini hızlıca prototiplemek, yinelemek ve geliştirmek nasıl olur?

Bu alan hızlı gelişiyor, ancak modüler bileşenler, işbirlikçi araçlar ve gerçek zamanlı öğrenme gibi neredeyse tüm AI Ajan Çerçevelerinde ortak bazı özellikler vardır. Bunlara bakalım:

- **Modüler Bileşenler Kullanın**: AI SDK'ları önceden hazırlanmış AI ve Bellek bağlayıcıları, doğal dil veya kod eklentileriyle işlev çağırma, hızlı şablonları ve daha fazlasını sunar.
- **İşbirlikçi Araçlardan Yararlanın**: Belirli roller ve görevler için ajanlar tasarlayın, böylece işbirlikçi iş akışlarını test edip geliştirebilirsiniz.
- **Gerçek Zamanlı Öğrenin**: Ajanların etkileşimlerden öğrenip davranışlarını dinamik olarak ayarladığı geri bildirim döngüleri uygulayın.

### Modüler Bileşenler Kullanın

Microsoft Agent Framework gibi SDK'lar, AI bağlayıcıları, araç tanımları ve ajan yönetimi gibi önceden hazırlanmış bileşenler sunar.

**Takımlar nasıl kullanabilir**: Takımlar, bu bileşenleri hızlıca birleştirerek sıfırdan başlamadan işlevsel bir prototip oluşturabilir, hızlı deneyler ve yinelemeler yapabilir.

**Pratikte nasıl çalışır**: Kullanıcı girdisinden bilgi çıkarmak için önceden yapılmış bir çözümleyici, verileri depolayıp almak için bir bellek modülü ve kullanıcılarla etkileşim için bir hızlı şablonu kullanabilirsiniz; bunların hepsini sıfırdan inşa etmeye gerek kalmadan.

**Örnek kod**. Kullanıcı girdisine araç çağırma ile yanıt vermek için Microsoft Agent Framework ve `FoundryChatClient` nasıl kullanılır görelim:

``` python
# Microsoft Agent Framework Python Örneği

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Seyahat rezervasyonu yapmak için örnek bir araç fonksiyonu tanımlayın
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # Örnek çıktı: 1 Ocak 2025'te New York'a uçuşunuz başarıyla rezerve edildi. İyi yolculuklar! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Bu örnekten göreceğiniz, kullanıcı girdisinden uçuş rezervasyon isteğinin kökeni, varış noktası ve tarih gibi anahtar bilgileri çıkarmak için önceden yapılmış bir çözümleyiciyi nasıl kullanabileceğinizdir. Bu modüler yaklaşım yüksek seviyeli mantığa odaklanmanızı sağlar.

### İşbirlikçi Araçlardan Yararlanın

Microsoft Agent Framework gibi çerçeveler birden çok ajanın bir arada çalışmasını kolaylaştırır.

**Takımlar nasıl kullanabilir**: Takımlar, özel roller ve görevler için ajanlar tasarlayabilir, böylece işbirlikçi iş akışlarını test edip geliştirebilir ve sistem verimliliğini artırabilir.

**Pratikte nasıl çalışır**: Veri alma, analiz veya karar verme gibi uzmanlaşmış işlevlere sahip ajanlardan oluşan bir ekip oluşturabilirsiniz. Bu ajanlar iletişim kurup bilgi paylaşarak kullanıcı sorusunu yanıtlamak veya görevi tamamlamak gibi ortak bir amaca ulaşır.

**Örnek kod (Microsoft Agent Framework)**:

```python
# Microsoft Agent Framework kullanarak birlikte çalışan birden çok ajan oluşturma

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Veri Alma Ajanı
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Veri Analiz Ajanı
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Bir görevi sırasıyla ajanlarla yürütme
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Önceki kodda, birden çok ajanın birlikte çalıştığı veri analizine yönelik bir görev nasıl oluşturulur görüyorsunuz. Her ajan belirli bir işlevi yerine getirir ve görev, ajanların koordinasyonu ile hedeflenen sonuca ulaşır. Uzman rollerle özel ajanlar yaratarak görev verimliliği ve performansını artırabilirsiniz.

### Gerçek Zamanlı Öğrenin

Gelişmiş çerçeveler gerçek zamanlı bağlam anlama ve uyarlama yetenekleri sunar.

**Takımlar nasıl kullanabilir**: Takımlar, ajanların etkileşimlerden öğrenip davranışlarını dinamik olarak ayarladığı geri bildirim döngüleri uygulayarak yeteneklerin sürekli gelişmesini sağlar.

**Pratikte nasıl çalışır**: Ajanlar, kullanıcı geri bildirimlerini, çevresel verileri ve görev sonuçlarını analiz ederek bilgi tabanlarını günceller, karar verme algoritmalarını ayarlar ve zamanla performansı iyileştirir. Bu yinelemeli öğrenme süreci, ajanların değişen koşullara ve kullanıcı tercihlerine uyum sağlamasını sağlar, böylece genel sistem etkinliği artar.

## Microsoft Agent Framework ile Microsoft Foundry Agent Service arasındaki farklar nelerdir?

Bu yaklaşımları birçok şekilde karşılaştırabiliriz, ancak tasarım, yetenekler ve hedef kullanım durumları açısından birkaç temel farkı inceleyelim:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework, `FoundryChatClient` kullanarak AI ajanları oluşturmak için kolaylaştırılmış bir SDK sağlar. Geliştiricilerin, araç çağırma, sohbet yönetimi ve Azure kimlik doğrulamasıyla kurumsal düzeyde güvenlik sunan Azure OpenAI modellerinden yararlanabilen ajanlar oluşturmasını sağlar.

**Kullanım Durumları**: Araç kullanımı, çok adımlı iş akışları ve kurumsal entegrasyon senaryoları ile üretim hazır AI ajanları oluşturmak.

Microsoft Agent Framework'ün bazı önemli temel kavramları şunlardır:

- **Ajanlar**. Bir ajan `FoundryChatClient` ile oluşturulur ve bir ad, talimatlar ve araçlarla yapılandırılır. Ajan:
  - **Kullanıcı mesajlarını işler** ve Azure OpenAI modellerini kullanarak yanıtlar üretir.
  - **Araçları otomatik olarak çağırır** sohbet bağlamına göre.
  - **Sohbet durumunu** çoklu etkileşimler boyunca sürdürür.

  Bir ajan oluşturmayı gösteren kod örneği:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **Araçlar**. Çerçeve, ajanların otomatik olarak çağırabileceği Python fonksiyonları olarak araçlar tanımlamayı destekler. Araçlar, ajan oluşturulurken kaydedilir:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **Çoklu Ajan Koordinasyonu**. Farklı uzmanlıklara sahip birden fazla ajan oluşturup çalışmalarını koordine edebilirsiniz:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Azure Kimlik Entegrasyonu**. Çerçeve, `AzureCliCredential` (veya `DefaultAzureCredential`) kullanarak güvenli, anahtarsız kimlik doğrulaması sağlar; böylece API anahtarlarını yönetmeye gerek kalmaz.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service, Microsoft Ignite 2024'te tanıtılan daha yeni bir ektir. Llama 3, Mistral ve Cohere gibi açık kaynak LLM'leri doğrudan çağırmayı destekleyen daha esnek modellerle AI ajanlarının geliştirilip dağıtılmasına olanak tanır.

Microsoft Foundry Agent Service, daha güçlü kurumsal güvenlik mekanizmaları ve veri depolama yöntemleri sağlar, bu nedenle kurumsal uygulamalar için uygundur.

Microsoft Agent Framework ile kutudan çıkar çıkmaz entegrasyon desteği vardır ve ajan oluşturma ve dağıtımı kolaydır.

Bu hizmet şu anda Genel Önizlemededir ve ajan geliştirmek için Python ve C# destekler.

Microsoft Foundry Agent Service Python SDK'sını kullanarak kullanıcı tanımlı bir araç ile ajan oluşturabiliriz:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Araç fonksiyonlarını tanımla
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### Temel kavramlar

Microsoft Foundry Agent Service'in temel kavramları şunlardır:

- **Ajan**. Microsoft Foundry Agent Service, Microsoft Foundry ile entegredir. Burada bir AI Ajanı, soruları yanıtlamak (RAG), eylemler gerçekleştirmek veya iş akışlarını tamamen otomatikleştirmek için "akıllı" bir mikroservis olarak görev yapar. Bu, üretken AI modellerinin gücünü, gerçek dünya veri kaynaklarına erişim ve etkileşim sağlayan araçlarla birleştirerek başarılır. İşte bir ajan örneği:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    Bu örnekte, `gpt-4.1-mini` modeline sahip, adı `my-agent` ve talimatı `You are helpful agent` olan bir ajan oluşturulmuştur. Ajan, kod yorumlama görevlerini gerçekleştirmek için araçlar ve kaynaklarla donatılmıştır.

- **İletişim ve mesajlar**. İletişim (thread) bir diğer önemli kavramdır. Bir ajan ile kullanıcı arasındaki sohbeti veya etkileşimi temsil eder. İletişimler, sohbet ilerlemesini takip etmek, bağlam bilgisini depolamak ve etkileşim durumunu yönetmek için kullanılır. İşte bir iletişim örneği:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Temsilciden iş parçacığı üzerinde çalışma yapmasını isteyin
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Temsilcinin yanıtını görmek için tüm mesajları alın ve kaydedin
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    Önceki kodda bir iletişim oluşturulur ve ardından iletişime mesaj gönderilir. `create_and_process_run` çağrılarak ajan iletişim üzerinde çalışması için görevlendirilir. Son olarak mesajlar alınıp kaydedilir; bu, kullanıcı ile ajan arasındaki sohbetin ilerlemesini gösterir. Mesajların metin, resim veya dosya gibi farklı türlerde olabileceğini anlamak önemlidir; örneğin ajan bir resim veya metin yanıtı üretmiş olabilir. Geliştirici olarak bu bilgiyi yanıtı işlemek veya kullanıcıya sunmak için kullanabilirsiniz.

- **Microsoft Agent Framework ile entegrasyon**. Microsoft Foundry Agent Service, Microsoft Agent Framework ile sorunsuz çalışır. Bu, `FoundryChatClient` kullanarak ajanlar oluşturup bunları üretim senaryoları için Agent Service üzerinden dağıtabileceğiniz anlamına gelir.

**Kullanım Durumları**: Microsoft Foundry Agent Service, güvenli, ölçeklenebilir ve esnek AI ajan dağıtımı gerektiren kurumsal uygulamalar için tasarlanmıştır.

## Bu yaklaşımlar arasındaki fark nedir?
 
Benzerlikler olmasına rağmen, tasarım, yetenekler ve hedef kullanım açısından birkaç temel fark vardır:
 
- **Microsoft Agent Framework (MAF)**: AI ajanları geliştirmek için üretime hazır bir SDK'dır. Araç çağırma, sohbet yönetimi ve Azure kimlik entegrasyonu için kolaylaştırılmış bir API sunar.
- **Microsoft Foundry Agent Service**: Microsoft Foundry içindeki ajanlar için bir platform ve dağıtım hizmetidir. Azure OpenAI, Azure AI Search, Bing Search ve kod yürütme gibi hizmetlerle yerleşik bağlantı sunar.
 
Hangi seçeneği kullanacağınızdan emin değil misiniz?

### Kullanım Durumları
 
Bazı yaygın kullanım durumlarını inceleyerek size yardımcı olup olamayacağımıza bakalım:
 
> S: Üretim AI ajan uygulamaları geliştiriyorum ve hızlı başlamam gerekiyor
>

>C: Microsoft Agent Framework iyi bir seçenektir. `FoundryChatClient` ile araçlar ve talimatları birkaç satır koda tanımlamanıza imkan veren basit, Python tarzı bir API sağlar.

>S: Arama ve kod yürütme gibi Azure entegrasyonları ile kurumsal dağıtıma ihtiyacım var
>
> C: Microsoft Foundry Agent Service en uygun olanıdır. Birden çok model, Azure AI Search, Bing Search ve Azure Functions için yerleşik yetenekler sunan bir platform hizmetidir. Ajanlarınızı Foundry Portal'da kolayca oluşturup ölçekli dağıtabilirsiniz.
 
> S: Hâlâ kararsızım, sadece bir seçenek verin
>
> C: Ajanlarınızı oluşturmak için Microsoft Agent Framework ile başlayın, sonra üretim için dağıtım ve ölçeklendirme gerektiğinde Microsoft Foundry Agent Service kullanın. Bu yaklaşım, ajan mantığınız üzerinde hızlı yineleme yaparken kurumsal dağıtım için net bir yol sağlar.
 
Önemli farkları bir tabloda özetleyelim:

| Çerçeve | Odak | Temel Kavramlar | Kullanım Durumları |
| --- | --- | --- | --- |
| Microsoft Agent Framework | Araç çağırma ile sadeleştirilmiş ajan SDK'sı | Ajanlar, Araçlar, Azure Kimlik | AI ajanları oluşturma, araç kullanımı, çok adımlı iş akışları |
| Microsoft Foundry Agent Service | Esnek modeller, kurumsal güvenlik, Kod üretimi, Araç çağırma | Modülerlik, İşbirliği, Süreç Orkestrasyonu | Güvenli, ölçeklenebilir ve esnek AI ajan dağıtımı |

## Mevcut Azure ekosistemi araçlarımı doğrudan entegre edebilir miyim yoksa bağımsız çözümler mi gerekir?


Cevap evet, mevcut Azure ekosistemi araçlarınızı özellikle Microsoft Foundry Agent Service ile doğrudan entegre edebilirsiniz, çünkü bu servis diğer Azure hizmetleriyle sorunsuz çalışacak şekilde tasarlanmıştır. Örneğin Bing, Azure AI Search ve Azure Functions’ı entegre edebilirsiniz. Ayrıca Microsoft Foundry ile derin bir entegrasyon vardır.

Microsoft Agent Framework ayrıca `FoundryChatClient` ve Azure kimliği aracılığıyla Azure hizmetleriyle bütünleşir, böylece ajan araçlarınızdan doğrudan Azure hizmetlerini çağırabilirsiniz.

## Örnek Kodlar

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Yapay Zeka Ajan Çerçeveleri Hakkında Daha Fazla Sorunuz mu Var?

Diğer öğrenenlerle tanışmak, ofis saatlerine katılmak ve Yapay Zeka Ajanları sorularınıza yanıt almak için [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)’a katılın.

## Kaynaklar

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Önceki Ders

[Yapay Zeka Ajanlarına Giriş ve Ajan Kullanım Durumları](../01-intro-to-ai-agents/README.md)

## Sonraki Ders

[Ajansal Tasarım Kalıplarını Anlamak](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->