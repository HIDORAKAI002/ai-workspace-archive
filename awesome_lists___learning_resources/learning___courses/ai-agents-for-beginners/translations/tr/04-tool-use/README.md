[![İyi AI Ajanları Nasıl Tasarlanır](../../../translated_images/tr/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Bu dersin videosunu izlemek için yukarıdaki görsele tıklayın)_

# Araç Kullanımı Tasarım Deseni

Araçlar ilginçtir çünkü AI ajanlarının daha geniş bir yetenek yelpazesine sahip olmasını sağlar. Ajanın gerçekleştirebileceği sınırlı bir işlem kümesi yerine, bir araç eklenerek ajan artık çok çeşitli işlemleri gerçekleştirebilir. Bu bölümde, AI ajanlarının belirli araçları kullanarak hedeflerine nasıl ulaşabileceğini açıklayan Araç Kullanımı Tasarım Deseni'ne bakacağız.

## Giriş

Bu derste aşağıdaki soruları yanıtlamaya çalışacağız:

- Araç kullanım tasarım deseni nedir?
- Hangi kullanım durumlarına uygulanabilir?
- Tasarım desenini uygulamak için gerekli öğeler/temel bileşenler nelerdir?
- Güvenilir AI ajanları oluşturmak için Araç Kullanımı Tasarım Deseni'ni kullanırken özel dikkat edilmesi gerekenler nelerdir?

## Öğrenme Hedefleri

Bu dersi tamamladıktan sonra şunları yapabileceksiniz:

- Araç Kullanımı Tasarım Deseni'nin tanımını ve amacını yapmak.
- Araç Kullanımı Tasarım Deseni'nin uygulanabilir olduğu kullanım durumlarını belirlemek.
- Tasarım desenini uygulamak için gerekli temel öğeleri anlamak.
- Bu tasarım desenini kullanan AI ajanlarının güvenilirliğini sağlamak için dikkate alınması gereken hususları fark etmek.

## Araç Kullanımı Tasarım Deseni Nedir?

**Araç Kullanımı Tasarım Deseni**, LLM'lere belirli hedeflere ulaşmak için harici araçlarla etkileşim kurma yeteneği kazandırmaya odaklanır. Araçlar, ajan tarafından eylem gerçekleştirmek üzere çalıştırılabilen kodlardır. Bir araç basit bir fonksiyon (örneğin hesap makinesi) veya borsa fiyatı sorgulama ya da hava durumu tahmini gibi üçüncü taraf servislere yapılan API çağrısı olabilir. AI ajanları bağlamında, araçlar **model tarafından oluşturulan fonksiyon çağrılarına** yanıt olarak çalıştırılmak üzere tasarlanmıştır.

## Hangi kullanım durumlarına uygulanabilir?

AI Ajanları, karmaşık görevleri tamamlamak, bilgi almak veya karar vermek için araçlardan yararlanabilir. Araç kullanım tasarım deseni genellikle veritabanları, web hizmetleri veya kod yorumlayıcılar gibi dış sistemlerle dinamik etkileşim gerektiren senaryolarda kullanılır. Bu yetenek aşağıdaki gibi çeşitli kullanım durumları için faydalıdır:

- **Dinamik Bilgi Alımı:** Ajanlar, güncel verileri almak için harici API'ları ya da veritabanlarını sorgulayabilir (örneğin, veri analizi için bir SQLite veritabanı sorgulamak, borsa fiyatlarını veya hava durumunu çekmek).
- **Kod Çalıştırma ve Yorumlama:** Ajanlar matematiksel problemleri çözmek, raporlar oluşturmak veya simülasyonlar yapmak için kod veya script çalıştırabilir.
- **İş Akışı Otomasyonu:** Görev zamanlayıcıları, e-posta servisleri veya veri boru hatları gibi araçları entegre ederek tekrar eden veya çok adımlı iş akışlarını otomatikleştirmek.
- **Müşteri Desteği:** Ajanlar kullanıcı sorgularını çözmek için CRM sistemleri, bilet platformları veya bilgi tabanları ile etkileşime geçebilir.
- **İçerik Üretimi ve Düzenleme:** Ajanlar, içerik oluşturma görevlerine yardımcı olmak için dilbilgisi denetleyicileri, metin özetleyiciler veya içerik güvenliği değerlendiricileri gibi araçları kullanabilir.

## Araç kullanım tasarım desenini uygulamak için gerekli öğeler/temel bileşenler nelerdir?

Bu yapı taşları AI ajanının çok çeşitli görevleri gerçekleştirmesine olanak tanır. Araç Kullanımı Tasarım Deseni'ni uygulamak için gereken temel öğelere bakalım:

- **Fonksiyon/Araç Şemaları**: Fonksiyon adı, amacı, gerekli parametreler ve beklenen çıktıların detaylı tanımları dahil olmak üzere mevcut araçların ayrıntılı tanımları. Bu şemalar, LLM'nin hangi araçların mevcut olduğunu ve geçerli isteklerin nasıl oluşturulacağını anlamasını sağlar.

- **Fonksiyon Çalıştırma Mantığı**: Araçların kullanıcı niyeti ve konuşma bağlamına dayanarak nasıl ve ne zaman çağrılacağını belirler. Bu, planlayıcı modüller, yönlendirme mekanizmaları veya araç kullanımını dinamik olarak belirleyen koşullu akışları içerebilir.

- **Mesaj İşleme Sistemi**: Kullanıcı girişleri, LLM yanıtları, araç çağrıları ve araç çıktıları arasındaki konuşma akışını yöneten bileşenler.

- **Araç Entegrasyon Çerçevesi**: Ajanı, basit fonksiyonlar veya karmaşık dış hizmetler olsun, çeşitli araçlara bağlayan altyapı.

- **Hata Yönetimi ve Doğrulama**: Araç çalıştırma hatalarını yönetmek, parametreleri doğrulamak ve beklenmeyen yanıtlarla başa çıkmak için mekanizmalar.

- **Durum Yönetimi**: Çok turlu etkileşimlerde tutarlılığı sağlamak için konuşma bağlamını, önceki araç etkileşimlerini ve kalıcı verileri izler.

Şimdi, Fonksiyon/Araç Çağrısına daha ayrıntılı bakalım.
 
### Fonksiyon/Araç Çağrısı

Fonksiyon çağrısı, Büyük Dil Modellerini (LLM'ler) araçlarla etkileşim kurmaya olanak tanımanın ana yoludur. 'Fonksiyon' ve 'Araç' terimleri sık sık birbirinin yerine kullanılır çünkü 'fonksiyonlar' (yeniden kullanılabilir kod blokları), ajanların görevleri yerine getirmek için kullandığı 'araçlardır'. Bir fonksiyonun kodunun çağrılabilmesi için, LLM'nin kullanıcı isteğini fonksiyonun açıklamasıyla karşılaştırması gerekir. Bunun için, mevcut tüm fonksiyonların açıklamalarını içeren bir şema LLM'ye gönderilir. LLM, görev için en uygun fonksiyonu seçer ve adını ile argümanlarını döner. Seçilen fonksiyon çağrılır, yanıtı LLM'ye gönderilir ve LLM bu bilgiyi kullanarak kullanıcı isteğine yanıt verir.

Geliştiricilerin ajanlar için fonksiyon çağrısını uygulayabilmesi için şunlara ihtiyaçları vardır:

1. Fonksiyon çağrısını destekleyen bir LLM modeli
2. Fonksiyon açıklamalarını içeren bir şema
3. Tanımlanan her fonksiyon için kod

Şimdi, bir şehirdeki güncel saati alma örneğiyle açıklayalım:

1. **Fonksiyon çağrısını destekleyen bir LLM başlatın:**

    Tüm modeller fonksiyon çağrısını desteklemediği için, kullandığınız LLM'nin desteklediğinden emin olmak önemlidir.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a>, fonksiyon çağrısını destekler. Azure OpenAI **Yanıtlar API'si** (kararlı `/openai/v1/` uç noktası — `api_version` gerekmiyor) ile OpenAI istemcisini başlatarak başlayabiliriz.

    ```python
    # Azure OpenAI için OpenAI istemcisini başlat (Yanıtlar API'si, v1 uç noktası)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Bir Fonksiyon Şeması Oluşturun**:

    Fonksiyon adı, fonksiyonun ne yaptığının açıklaması ve fonksiyon parametrelerinin isimleri ve açıklamalarını içeren bir JSON şeması tanımlayacağız.
    Daha sonra bu şemayı ve kullanıcının San Francisco'daki zamanı bulma talebini önceden oluşturulan istemciye göndereceğiz. Önemli olan, dönen şeyin **bir araç çağrısı** olmasıdır, sorunun nihai cevabı değil. Daha önce belirtildiği gibi, LLM görevlendirdiği fonksiyonun adını ve ona geçilecek argümanları döner.

    ```python
    # Modelin okuyabilmesi için fonksiyon açıklaması (Yanıtlar API düz araç formatı)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # Başlangıç kullanıcı mesajı
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # İlk API çağrısı: Modelden fonksiyonu kullanmasını isteyin
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # Yanıtlar API'si, response.output içindeki function_call öğeleri olarak araç çağrıları döner.
    # Bunları sohbete ekleyin, böylece model bir sonraki turda tam bağlama sahip olur.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Görevi yerine getirmek için gereken fonksiyon kodu:**

    Artık LLM hangi fonksiyonun çalıştırılması gerektiğini seçtiğine göre, görevi yerine getiren kod uygulanmalı ve yürütülmelidir.
    Python'da güncel saati alma kodunu yazabiliriz. Ayrıca, nihai sonucu almak için response_message'dan fonksiyon adını ve argümanları çıkarmak için kod yazmamız gerekecek.

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # Fonksiyon çağrılarını işleyin
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Aracı sonucunu function_call_output öğesi olarak döndürün
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # İkinci API çağrısı: Modelden nihai yanıtı alın
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

Fonksiyon Çağrısı, çoğu veya tüm ajan araç kullanımı tasarımının kalbinde yer alır, ancak sıfırdan uygulamak bazen zor olabilir.
[Ders 2](../../../02-explore-agentic-frameworks)’de öğrendiğimiz gibi, ajan çerçeveleri araç kullanımını uygulamak için önceden oluşturulmuş yapı taşları sağlar.
 
## Agentik Çerçevelerle Araç Kullanım Örnekleri

İşte farklı agentik çerçeveler kullanarak Araç Kullanımı Tasarım Deseni'ni nasıl uygulayabileceğinize dair bazı örnekler:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a>, AI ajanları oluşturmak için açık kaynaklı bir AI çerçevesidir. `@tool` dekoratörü ile araçları Python fonksiyonları olarak tanımlamanıza olanak tanıyarak fonksiyon çağrısı sürecini basitleştirir. Çerçeve, model ile kodunuz arasındaki iletişimi yönetir. Ayrıca `FoundryChatClient` aracılığıyla Dosya Arama ve Kod Yorumlayıcı gibi önceden oluşturulmuş araçlara erişim sağlar.

Aşağıdaki diyagram Microsoft Agent Framework ile fonksiyon çağrısı sürecini gösterir:

![fonksiyon çağrısı](../../../translated_images/tr/functioncalling-diagram.a84006fc287f6014.webp)

Microsoft Agent Framework'te araçlar dekoratörlü fonksiyonlar olarak tanımlanır. Daha önce gördüğümüz `get_current_time` fonksiyonunu `@tool` dekoratörü kullanarak bir araca dönüştürebiliriz. Çerçeve, fonksiyon ve parametrelerini otomatik olarak serileştirerek LLM'ye gönderilecek şemayı oluşturur.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# İstemciyi oluştur
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Bir aracı oluştur ve aracı ile çalıştır
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>, geliştiricilerin altyapı kaynaklarını yönetmeden, yüksek kaliteli ve genişletilebilir AI ajanları güvenli şekilde oluşturup dağıtmasını sağlayan daha yeni bir agentik çerçevedir. Özellikle kurumsal uygulamalar için uygun olan, tamamen yönetilen ve kurumsal düzeyde güvenlik sunan bir hizmettir.

LLM API'si ile doğrudan geliştirme karşılaştırıldığında Microsoft Foundry Agent Service bazı avantajlar sağlar:

- Otomatik araç çağırma – bir araç çağrısını ayrıştırmaya, aracı çağırmaya ve yanıtı işlemeye gerek yok; tümü sunucu tarafında gerçekleştirilir
- Güvenli şekilde yönetilen veriler – kendi konuşma durumunuzu yönetmek yerine, ihtiyacınız olan tüm bilgileri depolamak için thread'lere güvenebilirsiniz
- Kutudan çıktığı gibi araçlar – Bing, Azure AI Search ve Azure Functions gibi veri kaynaklarınızla etkileşim için araçlar sağlar.

Microsoft Foundry Agent Service'te mevcut araçlar iki kategoriye ayrılır:

1. Bilgi Araçları:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Bing Araması ile Dayanıklılık</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Dosya Arama</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Araması</a>

2. Eylem Araçları:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Fonksiyon Çağrısı</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Kod Yorumlayıcı</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">OpenAPI tanımlı araçlar</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Agent Service, bu araçları `toolset` olarak beraber kullanmamıza olanak tanır. Ayrıca belirli bir konuşmanın mesaj geçmişini takip eden `threads` mekanizmasını kullanır.

Kendinizi Contoso adlı bir şirketin satış temsilcisi olarak hayal edin. Satış verileriniz hakkında soruları yanıtlayabilen bir konuşma ajanı geliştirmek istiyorsunuz.

Aşağıdaki görsel Microsoft Foundry Agent Service ile satış verilerinizi nasıl analiz edebileceğinizi gösterir:

![Agentic Service In Action](../../../translated_images/tr/agent-service-in-action.34fb465c9a84659e.webp)

Servisle bu araçlardan herhangi birini kullanmak için bir istemci oluşturup bir araç ya da araç seti tanımlayabiliriz. Bunu pratikte uygulamak için aşağıdaki Python kodunu kullanabiliriz. LLM, araç setine bakarak kullanıcının isteğine bağlı olarak kullanıcı tarafından oluşturulan `fetch_sales_data_using_sqlite_query` fonksiyonunu veya önceden oluşturulmuş Kod Yorumlayıcıyı kullanmaya karar verir.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # fetch_sales_data_functions.py dosyasında bulunan fetch_sales_data_using_sqlite_query fonksiyonu.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Araç setini başlat
toolset = ToolSet()

# fetch_sales_data_using_sqlite_query fonksiyonu ile fonksiyon çağırma aracını başlat ve araç setine ekle
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Kod Yorumlayıcı aracını başlat ve araç setine ekle.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Güvenilir AI ajanları oluşturmak için Araç Kullanımı Tasarım Deseni kullanırken özel dikkat edilmesi gerekenler nelerdir?

LLM'ler tarafından dinamik olarak oluşturulan SQL ile ilgili yaygın bir endişe güvenliktir, özellikle SQL enjeksiyonu veya veritabanının silinmesi ya da değiştirilmesi gibi kötü niyetli eylem riski. Bu endişeler geçerli olmakla birlikte, veritabanı erişim izinleri düzgün yapılandırıldığında etkili bir şekilde azaltılabilir. Çoğu veritabanı için bu, veritabanının salt okunur olarak yapılandırılması anlamına gelir. PostgreSQL veya Azure SQL gibi veritabanı hizmetleri için uygulamanın salt okunur (SELECT) rolü atanmalıdır.

Uygulamanın güvenli bir ortamda çalıştırılması korumayı daha da artırır. Kurumsal senaryolarda, veriler genellikle operasyonel sistemlerden çıkarılarak kullanıcı dostu şeması olan salt okunur bir veritabanı veya veri ambarına dönüştürülür. Bu yaklaşım verilerin güvenli, performans ve erişilebilirlik için optimize edilmiş olmasını ve uygulamanın kısıtlı, salt okunur erişime sahip olmasını sağlar.

## Örnek Kodlar

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Araç Kullanımı Tasarım Desenleri ile İlgili Daha Fazla Sorunuz mu Var?

Sorularınızı sormak, diğer öğrenenlerle tanışmak ve ofis saatlerine katılmak için [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)'a katılın.

## Ek Kaynaklar

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Azure AI Agents Service Atölyesi</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Contoso Creative Writer Çok Ajanlı Atölye</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework Genel Bakış</a>


## Bu Ajanı Duman Testiyle Kontrol Etme (İsteğe Bağlı)

[Ders 16](../16-deploying-scalable-agents/README.md) ile ajanları dağıtmayı öğrendikten sonra, bu dersin `TravelToolAgent`'ını hala araçlarını çağırıp cevap verip vermediğini [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json) ile duman testi yapabilirsiniz. Çalıştırma hakkında bilgi için [`tests/README.md`](../tests/README.md) dosyasına bakın.

## Önceki Ders

[Ajanik Tasarım Kalıplarını Anlama](../03-agentic-design-patterns/README.md)

## Sonraki Ders

[Ajanik RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->