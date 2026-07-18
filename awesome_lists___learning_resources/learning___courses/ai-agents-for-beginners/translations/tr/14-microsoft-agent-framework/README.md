# Microsoft Agent Framework'ü Keşfetmek

![Agent Framework](../../../translated_images/tr/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Giriş

Bu ders şunları kapsayacak:

- Microsoft Agent Framework'ü Anlamak: Temel Özellikler ve Değer  
- Microsoft Agent Framework'ün Temel Kavramlarını Keşfetmek
- Gelişmiş MAF Desenleri: İş Akışları, Ara Katman ve Bellek

## Öğrenme Hedefleri

Bu dersi tamamladıktan sonra şunları bileceksiniz:

- Microsoft Agent Framework kullanarak Üretime Hazır AI Ajanları oluşturmak
- Microsoft Agent Framework'ün ana özelliklerini Agentik Kullanım Durumlarınıza uygulamak
- İş akışları, ara katman ve gözlemlenebilirlik dahil gelişmiş desenleri kullanmak

## Kod Örnekleri 

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) için kod örnekleri bu depoda `xx-python-agent-framework` ve `xx-dotnet-agent-framework` dosyalarında bulunabilir.

## Microsoft Agent Framework'ü Anlamak

![Framework Intro](../../../translated_images/tr/framework-intro.077af16617cf130c.webp)

[Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework), Microsoft'un AI ajanları oluşturmak için birleşik çerçevesidir. Üretim ve araştırma ortamlarında görülen çeşitli agentik kullanım vakalarına esneklik sunar:

- Adım adım iş akışlarının gerektiği durumlarda **Ardışık Ajan orkestrasyonu**.
- Ajanların aynı anda görevleri tamamlaması gereken durumlarda **Eşzamanlı orkestrasyon**.
- Ajanların birlikte bir görev üzerinde iş birliği yapabileceği durumlarda **Grup sohbeti orkestrasyonu**.
- Alt görevler tamamlandıkça ajanların görevi birbirlerine devrettiği durumlarda **Devir Orkestrasyonu**.
- Bir yönetici ajanın görev listesi oluşturup değiştirdiği ve alt ajanların koordinasyonunu sağladığı durumlarda **Manyetik Orkestrasyon**.

Üretimde AI Ajanları sunmak için, MAF ayrıca şu özellikleri içermektedir:

- Microsoft Foundry panoları üzerinden araç çağrısı, orkestrasyon adımları, çıkarım akışları ve performans izlemesi dahil olmak üzere OpenTelemetry kullanarak **Gözlemlenebilirlik**.
- Rol tabanlı erişim, özel veri yönetimi ve yerleşik içerik güvenliği gibi güvenlik kontrollerini içeren Microsoft Foundry üzerinde ajanların yerel olarak barındırılmasıyla **Güvenlik**.
- Uzun süre çalışan süreçleri mümkün kılan, ajan iş parçacıkları ve iş akışlarının duraklatılabildiği, devam ettirilebildiği ve hatalardan kurtulabildiği **Süreklilik**.
- Görevlerin insan onayı gerektirdiği olarak işaretlendiği insan döngüsünde iş akışlarının desteklendiği **Kontrol**.

Microsoft Agent Framework ayrıca şu şekilde birlikte çalışabilirliğe odaklanmıştır:

- **Bulut bağımsızlığı** - Ajanlar konteynerlerde, yerel ortamda ve birden fazla farklı bulutta çalışabilir.
- **Sağlayıcı bağımsızlığı** - Ajanlar tercihinize göre Azure OpenAI ve OpenAI dahil tercih ettiğiniz SDK ile oluşturulabilir.
- **Açık Standartların Entegrasyonu** - Ajanlar, diğer ajanları ve araçları keşfetmek ve kullanmak için Agent-to-Agent (A2A) ve Model Context Protocol (MCP) gibi protokolleri kullanabilir.
- **Eklentiler ve Bağlayıcılar** - Bağlantılar Microsoft Fabric, SharePoint, Pinecone ve Qdrant gibi veri ve bellek hizmetlerine yapılabilir.

Bu özelliklerin Microsoft Agent Framework'ün temel kavramlarında nasıl uygulandığına bakalım.

## Microsoft Agent Framework'ün Temel Kavramları

### Ajanlar

![Agent Framework](../../../translated_images/tr/agent-components.410a06daf87b4fef.webp)

**Ajan Oluşturma**

Ajan oluşturma, çıkarım servisi (LLM Sağlayıcısı), AI Ajanın izleyeceği talimatlar kümesi ve atanan bir `isim` tanımlanarak yapılır:


```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Yukarıda `Azure OpenAI` kullanılmıştır ancak ajanlar `Microsoft Foundry Agent Service` dahil çeşitli servislerle oluşturulabilir:

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

veya büyük bağlam pencereleri (204K token'a kadar) ile OpenAI uyumlu API sağlayan [MiniMax](https://platform.minimaxi.com/):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

veya A2A protokolünü kullanan uzak ajanlar:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Ajanları Çalıştırmak**

Ajanlar, akışsız veya akış yanıtlar için `.run` ya da `.run_stream` yöntemleriyle çalıştırılır.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Her ajan çalıştırma ayrıca ajanın kullandığı `max_tokens`, ajan tarafından çağrılabilen `tools` ve hatta kullanılan `model` gibi parametreleri özelleştirme seçeneklerine sahiptir.

Bu, kullanıcının görevini tamamlamak için özel modeller veya araçlar gerektiğinde faydalıdır.

**Araçlar**

Araçlar, ajan tanımlanırken:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Bir ChatAgent doğrudan oluşturulurken

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

ve ajanın çalıştırılması sırasında da tanımlanabilir:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Sadece bu çalışma için sağlanan araç )
```

**Ajan İş Parçacıkları**

Ajan İş Parçacıkları, çok tur görüşmelerin yönetilmesi için kullanılır. İş parçacıkları şu yollardan biriyle oluşturulabilir:

- Zaman içinde kaydedilmesine olanak sağlayan `get_new_thread()` kullanımı
- Bir iş parçacığı otomatik olarak oluşturularak ajanın çalıştırılması sırasında sadece o koşu süresince kalması.

İş parçacığı oluşturmak için kod şu şekildedir:

```python
# Yeni bir iş parçacığı oluşturun.
thread = agent.get_new_thread() # İş parçacığı ile ajanın çalıştırılmasını sağlayın.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

İş parçacığını daha sonra kullanmak üzere saklamak için serileştirebilirsiniz:

```python
# Yeni bir iş parçacığı oluşturun.
thread = agent.get_new_thread() 

# İş parçacığı ile ajanı çalıştırın.

response = await agent.run("Hello, how are you?", thread=thread) 

# İş parçacığını depolama için serileştirin.

serialized_thread = await thread.serialize() 

# Depolamadan yükledikten sonra iş parçacığı durumunu serileştirme işlemini tersine çevirin.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Ajan Ara Katmanı**

Ajanlar, kullanıcı görevlerini tamamlamak için araçlar ve LLM'lerle etkileşir. Bazı senaryolarda, bu etkileşimler arasında yürütme veya takip yapmak isteriz. Ajan ara katmanı bunu sağlar:

*Fonksiyon Ara Katmanı*

Bu ara katman, ajan ile çağrılacak fonksiyon/araç arasında bir işlem yürütülmesine izin verir. Örneğin, fonksiyon çağrısında bazı kayıtların yapılmasını istediğinizde kullanılır.

Aşağıdaki kodda `next`, sonraki ara katmanın mı yoksa gerçek fonksiyonun mu çağrılacağını belirler.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Ön işleme: Fonksiyon çalıştırılmadan önce loglama
    print(f"[Function] Calling {context.function.name}")

    # Sonraki ara katmana veya fonksiyon çalıştırmaya devam et
    await next(context)

    # Son işlem: Fonksiyon çalıştırıldıktan sonra loglama
    print(f"[Function] {context.function.name} completed")
```

*Sohbet Ara Katmanı*

Bu ara katman, ajan ile LLM arasındaki istekler arasında bir işlem yürütülmesini veya kaydedilmesini sağlar.

Bu, AI servisine gönderilen `messages` gibi önemli bilgileri içerir.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Ön işleme: AI çağrısından önce günlük kaydı
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Bir sonraki ara yazılıma veya AI servisine devam et
    await next(context)

    # Son işlem: AI yanıtından sonra günlük kaydı
    print("[Chat] AI response received")

```

**Ajan Belleği**

`Agentic Memory` dersinde ele alındığı gibi, bellek ajanın farklı bağlamlarda çalışmasını mümkün kılan önemli bir unsurdur. MAF çeşitli bellek türleri sunar:

*Bellek İçi Depolama*

Bu, uygulama çalışma zamanı boyunca iş parçacıklarında saklanan bellektir.

```python
# Yeni bir iş parçacığı oluşturun.
thread = agent.get_new_thread() # İş parçacığıyla ajanı çalıştırın.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Kalıcı Mesajlar*

Bu bellek, farklı oturumlar arasındaki sohbet geçmişini saklamak için kullanılır. `chat_message_store_factory` kullanılarak tanımlanır:

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

Bu bellek, ajanlar çalıştırılmadan önce bağlama eklenir. Bu bellekler mem0 gibi harici servislerde saklanabilir:

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


Gözlemlenebilirlik, güvenilir ve sürdürülebilir ajan sistemleri oluşturmak için önemlidir. MAF, daha iyi gözlemlenebilirlik için izleme ve ölçüm sağlamak amacıyla OpenTelemetry ile entegre olur.

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

MAF, bir görevi tamamlamak için önceden tanımlanmış adımlar olan iş akışları sunar ve bu adımlarda AI ajanlarını bileşen olarak içerir.

İş akışları, daha iyi kontrol akışı sağlayan farklı bileşenlerden oluşur. İş akışları ayrıca **çoklu ajan orkestrasyonu** ve iş akışı durumlarını kaydetmek için **kontrol noktası oluşturma** sağlar.

Bir iş akışının temel bileşenleri şunlardır:

**Yürütücüler**

Yürütücüler, giriş mesajları alır, kendilerine atanan görevleri gerçekleştirir ve sonra çıktı mesajı üretir. Bu, iş akışını daha büyük görevin tamamlanmasına doğru ilerletir. Yürütücüler AI ajanı veya özel mantık olabilir.

**Kenarlar**

Kenarlar, iş akışında mesaj akışını tanımlamak için kullanılır. Bunlar şunlar olabilir:

*Doğrudan Kenarlar* - Yürütücüler arasında basit bire bir bağlantılar:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Koşullu Kenarlar* - Belirli bir koşul karşılandıktan sonra etkinleştirilir. Örneğin, otel odaları mevcut değilse, bir yürütücü diğer seçenekleri önerebilir.

*Switch-case Kenarları* - Mesajları tanımlanmış koşullara göre farklı yürütücülere yönlendirir. Örneğin, seyahat müşterisi öncelikli erişime sahipse ve görevleri başka bir iş akışıyla ele alınır.

*Çoğaltma (Fan-out) Kenarları* - Bir mesajı birden çok hedefe gönderir.

*Toplama (Fan-in) Kenarları* - Farklı yürütücülerden gelen birden çok mesajı toplar ve bir hedefe gönderir.

**Olaylar**

İş akışlarında daha iyi gözlemlenebilirlik sağlamak için, MAF yürütme için yerleşik olaylar sunar:

- `WorkflowStartedEvent`  - İş akışı yürütmesi başlar
- `WorkflowOutputEvent` - İş akışı çıktı üretir
- `WorkflowErrorEvent` - İş akışı hata ile karşılaşır
- `ExecutorInvokeEvent`  - Yürütücü işlemeye başlar
- `ExecutorCompleteEvent`  -  Yürütücü işlemeyi tamamlar
- `RequestInfoEvent` - Bir istek gönderilir

## Gelişmiş MAF Desenleri

Yukarıdaki bölümler Microsoft Ajan Çerçevesi'nin temel kavramlarını kapsar. Daha karmaşık ajanlar oluştururken, dikkate almanız gereken bazı gelişmiş desenler şunlardır:

- **Ara Katman Bileşimi**: Birden çok ara katman işleyicisini (kayıt, yetkilendirme, hız sınırlaması) fonksiyon ve sohbet ara katmanları kullanarak zincirleyerek ajan davranışı üzerinde detaylı kontrol sağlar.
- **İş Akışı Kontrol Noktası Oluşturma**: İş akışı olaylarını ve serileştirmeyi kullanarak uzun süreli ajan süreçlerini kaydedip devam ettirin.
- **Dinamik Araç Seçimi**: Sorgu başına yalnızca ilgili araçları sunmak için MAF'nın araç kaydı ile araç açıklamaları üzerinde RAG'i birleştirin.
- **Çoklu Ajan Teslimi**: Özelleşmiş ajanlar arasında teslimatlar orkestrasyonu için iş akışı kenarları ve koşullu yönlendirme kullanın.

## Microsoft Foundry Üzerinde LangChain / LangGraph Ajanlarını Barındırma

Microsoft Agent Framework **çerçeve uyumludur** — MAF ile yazılmış ajanlarla sınırlı değilsiniz. Zaten **LangChain** veya **LangGraph** ile oluşturulmuş bir ajanınız varsa, onu **Microsoft Foundry barındırılan ajanı** olarak çalıştırabilirsiniz; böylece Foundry çalışma zamanı, oturumlar, ölçeklendirme, kimlik ve protokol uç noktalarını yönetirken, ajan mantığınız LangGraph'ta kalır.

Bu, aynı protokolleri kullanan Foundry barındırılan ajanlar üzerinde derlenmiş bir LangGraph grafiği sunan `langchain_azure_ai.agents.hosting` paketi ile yapılır.

**1. Hosting eklentisini yükleyin:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

`hosting` eklentisi Foundry protokol kütüphanelerini kurar: `azure-ai-agentserver-responses` (OpenAI uyumlu `/responses` uç noktası) ve `azure-ai-agentserver-invocations` (genel `/invocations` uç noktası).

**2. Bir hosting protokolü seçin:**

| Protokol | Host sınıfı | Uç Nokta | Kullanım alanı |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | OpenAI uyumlu sohbet, akış, yanıt geçmişi ve konuşma dizilimi isterseniz — konuşma ajanları için önerilen varsayılan. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Özel JSON yapısı, webhook tarzı uç nokta veya konuşma dışı işlem gerekiyorsa. |

Çünkü **Yanıtlar API'si Foundry'de ajan tarzı geliştirme için ana API'dir**, çoğu ajan için `ResponsesHostServer` ile başlayın.

**3. Ortam değişkenlerini yapılandırın** (`az login` yapın ki `DefaultAzureCredential` kimlik doğrulaması yapabilsin):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Ajan sonrasında Foundry'de barındırılan ajan olarak çalıştırıldığında platform `FOUNDRY_PROJECT_ENDPOINT`'i otomatik olarak enjekte eder.

**4. Yanıtlar protokolü üzerinden bir LangGraph ajanı sunun:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # Buradaki ChatOpenAI, Foundry projesinin OpenAI uyumlu (Yanıtlar) uç noktasını hedefler.
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

Yerelde `python main.py` ile çalıştırın, ardından `http://localhost:8088/responses` adresine Yanıt isteği gönderin.

**Ana davranışlar:**

- **Konuşmalar**: İstemciler, `previous_response_id` veya bir `conversation` ID'si ile konuşmayı devam ettirir. Grafiğiniz LangGraph kontrol noktası ile derlendiyse, Foundry konuşma durumunu kontrol noktasına bağlar (prodüksiyonda dayanıklı kontrol noktası kullanın; yerel test için `MemorySaver` uygundur).
- **İnsan döngüde**: Grafiğiniz LangGraph `interrupt()` kullanıyorsa, `ResponsesHostServer` bekleyen kesintiyi Yanıt `function_call` / `mcp_approval_request` öğesi olarak iletir ve istemciler eşleşen `function_call_output` / `mcp_approval_response` ile devam eder.
- **Foundry'e dağıtım**: Azure Developer CLI kullanın — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (yerel, Docker gerektirir), sonra `azd provision` ve `azd deploy`. Barındırılan ajan dağıtımı **Foundry Proje Yöneticisi** rolü gerektirir.

Bu örneğin çalıştırılabilir versiyonu [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) dosyasında bulunabilir. Tam rehber (Invocations protokolü, özel istek şemaları ve sorun giderme) için [Foundry barındırılan ajanlar olarak LangGraph ajanlarını barındırma](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents) sayfasına bakın.

## Kod Örnekleri

Microsoft Agent Framework için kod örnekleri bu depo içinde `xx-python-agent-framework` ve `xx-dotnet-agent-framework` dosyalarında bulunabilir.

## Microsoft Agent Framework hakkında daha fazla sorunuz mu var?

Diğer öğrenenlerle tanışmak, çalışma saatlerine katılmak ve AI Ajanları sorularınızı yanıtlamak için [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D)'a katılın.
## Önceki Ders

[AI Ajanları için Bellek](../13-agent-memory/README.md)

## Sonraki Ders

[Bilgisayar Kullanım Ajanları (CUA) Oluşturma](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->