# Microsoft Agent Framework'ü Keşfetmek

![Agent Framework](../../../translated_images/tr/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Giriş

Bu derste şunlar ele alınacaktır:

- Microsoft Agent Framework'ü Anlamak: Temel Özellikler ve Değer  
- Microsoft Agent Framework'ün Temel Kavramlarını Keşfetmek
- İleri Düzey MAF Kalıpları: İş Akışları, Ara Katman ve Bellek

## Öğrenme Hedefleri

Bu dersi tamamladıktan sonra şunları öğreneceksiniz:

- Microsoft Agent Framework kullanarak Üretime Hazır Yapay Zeka Ajanları oluşturmak
- Microsoft Agent Framework'ün temel özelliklerini ajan kullanım senaryolarınıza uygulamak
- İş akışları, ara katman ve gözlemlenebilirlik gibi ileri düzey kalıpları kullanmak

## Kod Örnekleri 

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok) için kod örneklerine bu depoda `xx-python-agent-framework` ve `xx-dotnet-agent-framework` dosyaları altında ulaşabilirsiniz.

## Microsoft Agent Framework'ü Anlamak

![Framework Intro](../../../translated_images/tr/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framewrok), yapay zeka ajanları oluşturmak için Microsoft'un birleşik çerçevesidir. Hem üretim hem araştırma ortamlarında gözlemlenen geniş yelpazedeki ajan senaryolarını ele almak için esneklik sunar:

- Adım adım iş akışlarının gerektiği durumlarda **Ardışık Ajan orkestrasyonu**.
- Ajanların aynı anda görevleri tamamlaması gereken durumlarda **Eşzamanlı orkestrasyon**.
- Ajanların bir görev üzerinde birlikte işbirliği yapabildiği durumlarda **Grup sohbeti orkestrasyonu**.
- Alt görevler tamamlandıkça ajanların birbirine görev devrettiği durumlarda **Devir teslim orkestrasyonu**.
- Bir yönetici ajanın görev listesi oluşturup değiştirdiği ve alt ajanların koordinasyonunu sağladığı durumlarda **Manyetik orkestrasyon**.

Üretimde Yapay Zeka Ajanları sunmak için MAF ayrıca şunları içerir:

- Yapay Zeka Ajanının her eylemi dahil olmak üzere araç çağrısı, orkestrasyon adımları, akıl yürütme akışları ve Microsoft Foundry panelleri aracılığıyla performans izleme sağlayan OpenTelemetry kullanımıyla **Gözlemlenebilirlik**.
- Rol tabanlı erişim, özel veri işleme ve yerleşik içerik güvenliği gibi güvenlik kontrollerini içeren Microsoft Foundry'de ajanların yerel olarak barındırılmasıyla **Güvenlik**.
- Ajan iş parçacıklarının ve iş akışlarının duraklatılıp devam ettirilebilmesi, hata sonrası kurtarılması sayesinde **Dayanıklılık**, bu da uzun süreli süreçlere olanak tanır.
- Görevlerin insan onayı gerektirdiği iş akışlarını destekleyen **Kontrol**, insan-döngüsü iş akışları.

Microsoft Agent Framework ayrıca birlikte çalışabilirliğe odaklanır:

- **Bulut bağımsızlığı** - Ajanlar konteynerlerde, kurum içi ve çeşitli bulutlarda çalışabilir.
- **Sağlayıcı bağımsızlığı** - Ajanlar tercih ettiğiniz SDK ile oluşturulabilir, Azure OpenAI ve OpenAI dahil.
- **Açık Standartların Entegrasyonu** - Ajanlar, diğer ajanları ve araçları keşfetmek ve kullanmak için Agent-to-Agent (A2A) ve Model Context Protocol (MCP) gibi protokolleri kullanabilir.
- **Eklentiler ve Bağlayıcılar** - Microsoft Fabric, SharePoint, Pinecone ve Qdrant gibi veri ve bellek hizmetlerine bağlantılar kurulabilir.

Şimdi bu özelliklerin Microsoft Agent Framework'ün bazı temel kavramlarına nasıl uygulandığına bakalım.

## Microsoft Agent Framework'ün Temel Kavramları

### Ajanlar

![Agent Framework](../../../translated_images/tr/agent-components.410a06daf87b4fef.webp)

**Ajan Oluşturma**

Ajan oluşturma, çıkarım servisini (LLM Sağlayıcısı), Yapay Zeka Ajanının takip edeceği bir dizi talimatı ve atanmış bir `isim` tanımlayarak yapılır:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Yukarıda `Azure OpenAI` kullanılıyor ancak ajanlar `Microsoft Foundry Agent Service` dahil çeşitli hizmetler kullanılarak oluşturulabilir:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

OpenAI `Responses`, `ChatCompletion` API'leri

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

veya büyük bağlam pencereleri (204K token'a kadar) destekleyen OpenAI uyumlu API sunan [MiniMax](https://platform.minimaxi.com/):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M2.7").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

veya A2A protokolü ile uzak ajanlar:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Ajan Çalıştırma**

Ajanlar, akışsız veya akışlı yanıtlar için `.run` veya `.run_stream` yöntemleri kullanılarak çalıştırılır.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Her ajan çalıştırmasının, ajan tarafından kullanılan `max_tokens`, ajan tarafından çağrılabilen `tools` ve hatta ajan için kullanılan `model` gibi parametreleri özelleştirme seçenekleri olabilir.

Bu, kullanıcı görevini tamamlarken belirli modellerin veya araçların gerektiği durumlarda faydalıdır.

**Araçlar**

Araçlar, ajan tanımlanırken:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Bir ChatAgent doğrudan oluşturulurken

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

ve ayrıca ajan çalıştırılırken:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Bu çalıştırma için sağlanan araç )
```

tanımlanabilir.

**Ajan İş Parçacıkları**

Ajan İş Parçacıkları çok turlu konuşmaları yönetmek için kullanılır. İş parçacıkları şunlarla oluşturulabilir:

- Zaman içinde kaydedilmesine imkan veren `get_new_thread()` kullanılarak
- Bir ajan çalıştırıldığında otomatik olarak iş parçacığı yaratarak, ve iş parçacığının sadece o anki çalışma süresince devam etmesi

İş parçacığı oluşturmak için kod şöyle görünür:

```python
# Yeni bir iş parçacığı oluşturun.
thread = agent.get_new_thread() # İş parçacığı ile ajanı çalıştırın.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

İş parçacığı daha sonra sonraki kullanımlar için saklanacak şekilde serileştirilebilir:

```python
# Yeni bir iş parçacığı oluşturun.
thread = agent.get_new_thread() 

# İş parçacığı ile ajanı çalıştırın.

response = await agent.run("Hello, how are you?", thread=thread) 

# Depolama için iş parçacığını serileştirin.

serialized_thread = await thread.serialize() 

# Depolamadan yüklendikten sonra iş parçacığı durumunu seriden çıkarın.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Ajan Ara Katmanı**

Ajanlar, kullanıcının görevlerini tamamlamak için araçlar ve LLM'lerle etkileşir. Bazı durumlarda bu etkileşimlerin arasında işlem yapmak veya izlemek isteriz. Ajan ara katmanı bunu şu şekilde sağlar:

*Fonksiyon Ara Katmanı*

Bu ara katman, ajan ile çağrılacak fonksiyon/araç arasındaki işlemi yönetir. Örneğin, fonksiyon çağrısı üzerinde günlük kaydı yapmak istediğinizde kullanılır.

Aşağıdaki kodda `next` sonraki ara katmanın mı yoksa gerçek fonksiyonun mu çağrılacağını belirler.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Ön işleme: Fonksiyon çalıştırılmadan önce kayıt
    print(f"[Function] Calling {context.function.name}")

    # Sonraki ara yazılıma veya fonksiyon çalıştırmaya devam et
    await next(context)

    # Son işlem: Fonksiyon çalıştırıldıktan sonra kayıt
    print(f"[Function] {context.function.name} completed")
```

*Chat Ara Katmanı*

Bu ara katman, ajan ile LLM arasındaki istekler arasında işlem yapmak veya kayıt tutmak için kullanılır.

Bu, AI servisine gönderilen `messages` gibi önemli bilgileri içerir.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Ön işleme: AI çağrısından önce kayıt
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Bir sonraki ara yazılıma veya AI servisine devam et
    await next(context)

    # Son işlem: AI yanıtından sonra kayıt
    print("[Chat] AI response received")

```

**Ajan Belleği**

`Agentic Memory` dersinde ele alındığı gibi, bellek ajan için farklı bağlamlarda çalışmayı mümkün kılan önemli bir unsurdur. MAF çeşitli bellek türleri sunar:

*Bellek İçi Depolama*

Uygulama çalışırken iş parçacıklarında saklanan bellektir.

```python
# Yeni bir iş parçacığı oluşturun.
thread = agent.get_new_thread() # İş parçacığı ile ajanı çalıştır.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Kalıcı Mesajlar*

Farklı oturumlar arasında konuşma geçmişini saklamak için kullanılan bellek türüdür. `chat_message_store_factory` kullanılarak tanımlanır:

```python
from agent_framework import ChatMessageStore

# Özel bir mesaj deposu oluşturun
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Dinamik Bellek*

Ajanlar çalıştırılmadan önce bağlama eklenen bellektir. Bu bellekler mem0 gibi harici servislerde saklanabilir:

```python
from agent_framework.mem0 import Mem0Provider

# Gelişmiş bellek yetenekleri için Mem0 kullanımı
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

**Ajan Gözlemlenebilirliği**

Gözlemlenebilirlik, güvenilir ve sürdürülebilir ajanik sistemler kurmak için önemlidir. MAF, daha iyi gözlemlenebilirlik için izleme ve metrik sağlayan OpenTelemetry ile entegre olur.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # bir şey yap
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### İş Akışları

MAF, bir görevi tamamlamak için önceden tanımlanmış adımlardan oluşan iş akışları sunar ve bu adımlarda AI ajanlarını bileşen olarak içerir.

İş akışları, daha iyi kontrol akışı sağlayan farklı bileşenlerden oluşur. İş akışları ayrıca **çoklu ajan orkestrasyonu** ve iş akışı durumlarını kaydetmek için **kontrol noktaları** sağlar.

Bir iş akışının temel bileşenleri şunlardır:

**Yürütücüler**

Yürütücüler giriş mesajlarını alır, atanan görevlerini gerçekleştirir ve ardından bir çıktı mesajı üretir. Bu, iş akışını daha büyük görev tamamlanmasına doğru ilerletir. Yürütücüler AI ajanı veya özel mantık olabilir.

**Kenarlar**

Kenarlar, iş akışı içindeki mesaj akışını tanımlamak için kullanılır. Bunlar şunlar olabilir:

*Doğrudan Kenarlar* - Yürütücüler arasında basit birebir bağlantılar:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Koşullu Kenarlar* - Belirli bir koşul sağlandığında etkinleşir. Örneğin, otel odaları doluysa bir yürütücü diğer seçenekleri önerebilir.

*Anahtar-değer Kenarları* - Mesajları tanımlı koşullara göre farklı yürütücülere yönlendirir. Örneğin, seyahat müşterisinin öncelikli erişimi varsa görevleri başka bir iş akışı üzerinden yönetilir.

*Yayılma Kenarları* - Tek bir mesajı birden fazla hedefe gönderir.

*Toplama Kenarları* - Farklı yürütücülerden gelen çoklu mesajları toplar ve tek bir hedefe gönderir.

**Olaylar**

İş akışlarına daha iyi gözlemlenebilirlik sağlamak için MAF, yürütme sırasında kullanabileceğiniz yerleşik olaylar sunar:

- `WorkflowStartedEvent`  - İş akışı yürütmesi başlar
- `WorkflowOutputEvent` - İş akışı çıktı üretir
- `WorkflowErrorEvent` - İş akışı bir hata ile karşılaşır
- `ExecutorInvokeEvent`  - Yürütücü işlemeye başlar
- `ExecutorCompleteEvent`  -  Yürütücü işlemi tamamlar
- `RequestInfoEvent` - Bir istek yapılır

## İleri Düzey MAF Kalıpları

Yukarıdaki bölümler Microsoft Agent Framework'ün temel kavramlarını kapsar. Daha karmaşık ajanlar oluştururken dikkate alınması gereken bazı ileri düzey kalıplar:

- **Ara Katman Bileşimi**: Fonksiyon ve sohbet ara katmanları kullanarak çoklu ara katman işleyicileri (günlükleme, kimlik doğrulama, hız sınırlama) zincirleyerek ajan davranışı üzerinde ince ayar kontrolü.
- **İş Akışı Kontrol Noktaları**: İş akışı olayları ve serileştirme kullanarak uzun süren ajan süreçlerini kaydetme ve devam ettirme.
- **Dinamik Araç Seçimi**: Araç tanımları üzerinde RAG'i MAF'nin araç kaydı ile birleştirerek sorguya özgü sadece ilgili araçları sunma.
- **Çoklu Ajan Devir Teslimi**: İş akışı kenarlarını ve koşullu yönlendirmeyi kullanarak uzmanlaşmış ajanlar arasında devir teslimi orkestre etme.

## Kod Örnekleri 

Microsoft Agent Framework için kod örneklerine bu depoda `xx-python-agent-framework` ve `xx-dotnet-agent-framework` dosyaları altında ulaşabilirsiniz.

## Microsoft Agent Framework Hakkında Daha Fazla Sorunuz mu Var?

Diğer öğrenenlerle tanışmak, ofis saatlerine katılmak ve Yapay Zeka Ajanları sorularınızı yanıtlamak için [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)'a katılın.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstersek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayın. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu doğabilecek yanlış anlamalar veya yanlış yorumlamalar için sorumluluk kabul edilmemektedir.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->