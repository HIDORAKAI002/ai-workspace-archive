> [KALDIRILDI: 2026-07-28 SÜRÜM ADAYI](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Model Context Protocol'de Örnekleme

> **Kaldırılma bildirimi:** `2026-07-28` MCP spesifikasyon sürüm adayı, Örneklemeyi doğrudan LLM sağlayıcı API'leri ile entegrasyon lehine kaldırılmış olarak işaretlemektedir. Örnekleme, `2025-11-25` sürümünde ve herhangi bir resmi kaldırılmadan sonraki en az bir yıl boyunca çalışmaya devam edecektir, bu nedenle bu dersteki her şey geçerli kalır; ancak yeni sunucu tasarımları yedek deseni değerlendirmelidir. bkz. [MCP'deki Değişiklikler: 2026-07-28 Sürüm Adayı](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Örnekleme, sunucuların istemci aracılığıyla LLM tamamlamalarını talep etmesini sağlayan güçlü bir MCP özelliğidir ve güvenlik ile gizliliği korurken sofistike ajan davranışlarını mümkün kılar. Doğru örnekleme yapılandırması, yanıt kalitesi ve performansını önemli ölçüde artırabilir. MCP, modellerin rastgelelik, yaratıcılık ve tutarlılığı etkileyen belirli parametrelerle nasıl metin oluşturduğunu kontrol etmek için standart bir yol sağlar.

## Giriş

Bu derste, MCP isteklerinde örnekleme parametrelerinin nasıl yapılandırılacağını keşfedeceğiz ve örneklemenin temel protokol mekaniklerini anlayacağız.

## Öğrenme Hedefleri

Bu dersin sonunda şunları yapabileceksiniz:

- MCP’de bulunan temel örnekleme parametrelerini anlayın.
- Farklı kullanım durumları için örnekleme parametrelerini yapılandırın.
- Tekrarlanabilir sonuçlar için deterministik örnekleme uygulayın.
- Bağlama ve kullanıcı tercihlerine göre örnekleme parametrelerini dinamik olarak ayarlayın.
- Çeşitli senaryolarda model performansını artırmak için örnekleme stratejileri uygulayın.
- MCP’nin istemci-sunucu akışında örneklemenin nasıl çalıştığını anlayın.

## MCP’de Örnekleme Nasıl Çalışır

MCP'deki örnekleme akışı şu adımları izler:

1. Sunucu istemciye `sampling/createMessage` isteği gönderir
2. İstemci isteği inceler ve değiştirebilir
3. İstemci bir LLM'den örnekleme yapar
4. İstemci tamamlamayı gözden geçirir
5. İstemci sonucu sunucuya döner

Bu insan döngüsünde tasarım, kullanıcıların LLM'nin ne gördüğü ve ne oluşturduğunu kontrol etmelerini sağlar.

## Örnekleme Parametreleri Genel Bakış

MCP, istemci isteklerinde yapılandırılabilen aşağıdaki örnekleme parametrelerini tanımlar:

| Parametre | Açıklama | Tipik Aralık |
|-----------|-------------|---------------|
| `temperature` | Token seçiminde rastgeleliği kontrol eder | 0.0 - 1.0 |
| `maxTokens` | Oluşturulacak maksimum token sayısı | Tam sayı değeri |
| `stopSequences` | Karşılaşıldığında üretimi durduran özel diziler | Dize dizisi |
| `metadata` | Sağlayıcıya özel ek parametreler | JSON nesnesi |

Birçok LLM sağlayıcısı, `metadata` alanı aracılığıyla aşağıdakileri içerebilecek ek parametreleri destekler:

| Yaygın Uzantı Parametresi | Açıklama | Tipik Aralık |
|-----------|-------------|---------------|
| `top_p` | Nükleus örneklemesi - tokenleri en yüksek kümülatif olasılığa sınırlar | 0.0 - 1.0 |
| `top_k` | Token seçimini en iyi K seçenekle sınırlar | 1 - 100 |
| `presence_penalty` | Tokenleri metinde şimdiye kadar bulunma durumuna göre cezalandırır | -2.0 - 2.0 |
| `frequency_penalty` | Tokenleri metinde şimdiye kadar görülme sıklığına göre cezalandırır | -2.0 - 2.0 |
| `seed` | Tekrarlanabilir sonuçlar için özel rastgele tohum | Tam sayı değeri |

## Örnek İstek Formatı

İşte MCP’de istemciden örnekleme isteği yapmaya bir örnek:

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## Yanıt Formatı

İstemci bir tamamlanma sonucu döner:

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## Döngüde İnsan Kontrolleri

MCP örneklemesi insan denetimi gözetilerek tasarlanmıştır:

- **İstemler için**:
  - İstemciler, kullanıcılara önerilen istemi göstermelidir
  - Kullanıcılar istemleri değiştirebilmeli veya reddedebilmelidir
  - Sistem istemleri filtrelenebilir veya değiştirilebilir
  - Bağlam dahil edilmesi istemci tarafından kontrol edilir

- **Tamamlamalar için**:
  - İstemciler, kullanıcılara tamamlamayı göstermelidir
  - Kullanıcılar tamamlamaları değiştirebilmeli veya reddedebilmelidir
  - İstemciler tamamlamaları filtreleyebilir veya değiştirebilir
  - Hangi modelin kullanılacağını kullanıcılar kontrol eder

Bu ilkeler ışığında, LLM sağlayıcıları arasında yaygın olarak desteklenen parametrelere odaklanarak farklı programlama dillerinde örnekleme nasıl uygulanır inceleyelim.

## Güvenlik Hususları

MCP’de örnekleme uygularken şu güvenlik en iyi uygulamalarını göz önünde bulundurun:

- İstemciye göndermeden önce tüm mesaj içeriğini doğrulayın
- İstemlerden ve tamamlamalardan hassas bilgileri temizleyin
- Kötüye kullanımı önlemek için hız sınırları uygulayın
- Olağandışı örnekleme kullanımını izleyin
- Veri iletimini güvenli protokollerle şifreleyin
- İlgili düzenlemelere uygun olarak kullanıcı veri gizliliğini yönetin
- Uygunluk ve güvenlik için örnekleme isteklerini denetleyin
- Maliyet maruziyetini uygun sınırlarla kontrol edin
- Örnekleme istekleri için zaman aşımı uygulayın
- Model hatalarını uygun yedekleme yöntemleri ile zarifçe yönetin

Örnekleme parametreleri, deterministik ve yaratıcı çıktıların istenen dengesi için dil modeli davranışını ince ayar yapmaya olanak tanır.

Bu parametrelerin farklı programlama dillerinde nasıl yapılandırıldığına bakalım.

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

Yukarıdaki kodda:

- Belirli bir sunucu URL'si ile MCP istemcisi oluşturuldu.
- `temperature`, `top_p` ve `top_k` gibi örnekleme parametreleri ile istek yapılandırıldı.
- İstek gönderildi ve oluşturulan metin yazdırıldı.
- Şunlar kullanıldı:
    - Modelin oluşturma sırasında kullanabileceği araçları belirtmek için `allowedTools`. Bu örnekte, yaratıcı uygulama fikirleri oluşturmak için `ideaGenerator` ve `marketAnalyzer` araçları izin verildi.
    - Çıktıdaki tekrar ve çeşitliliği kontrol etmek için `frequencyPenalty` ve `presencePenalty`.
    - Çıktının rastgeleliğini kontrol etmek için `temperature`. Daha yüksek değerler daha yaratıcı yanıtlar getirir.
    - Üretilen metnin kalitesini artırmak için token seçimlerini en yüksek kümülatif olasılık kütlesiyle sınırlayan `top_p`.
    - Daha tutarlı yanıtlar üretmeye yardımcı olan, modeli en olası K token ile sınırlandıran `top_k`.
    - Üretilen metindeki tekrarları azaltmak ve çeşitliliği artırmak için `frequencyPenalty` ve `presencePenalty`.

# [JavaScript](#tab/javascript)

```javascript
// JavaScript Örneği: Sıcaklık ve Top-P örnekleme yapılandırması
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // MCP istemcisini başlat
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Farklı örnekleme parametreleri ile isteği yapılandır
  const creativeSampling = {
    temperature: 0.9,    // Daha yüksek sıcaklık = daha fazla rastgelelik/yaratıcılık
    topP: 0.92,          // İlk %92 olasılık kütlesine sahip tokenları dikkate al
    frequencyPenalty: 0.6, // Token dizilerinin tekrarını azalt
    presencePenalty: 0.4   // Şimdiye kadar metinde geçen tokenları cezalandır
  };
  
  const factualSampling = {
    temperature: 0.2,    // Daha düşük sıcaklık = daha belirleyici/gerçekçi
    topP: 0.85,          // Biraz daha odaklanmış token seçimi
    frequencyPenalty: 0.2, // Minimal tekrar cezası
    presencePenalty: 0.1   // Minimal varlık cezası
  };
  
  try {
    // Farklı örnekleme yapılandırmaları ile iki istek gönder
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

Yukarıdaki kodda:

- Sunucu URL'si ve API anahtarı ile MCP istemcisi başlatıldı.
- Yaratıcı görevler ve gerçek bilgiler için iki farklı örnekleme parametre grubu yapılandırıldı.
- Bu yapılandırmalarla istekler gönderildi ve modelin her görev için belirli araçları kullanmasına izin verildi.
- Farklı örnekleme parametrelerinin etkisini göstermek için oluşturulan yanıtlar yazdırıldı.
- Yaratıcı görevler için `ideaGenerator` ve `environmentalImpactTool`, gerçek bilgiler için `factChecker` ve `dataAnalysisTool` araçlarının kullanılmasına izin vermek için `allowedTools` kullanıldı.
- Çıktının rastgeleliğini kontrol etmek için `temperature` kullanıldı, daha yüksek değerler daha yaratıcı yanıtlar sağlar.
- Üretilen metnin kalitesini artırmak için token seçimlerini en yüksek kümülatif olasılık kütlesi ile sınırlamak için `top_p` kullanıldı.
- Tekrarı azaltmak ve çeşitliliği teşvik etmek için `frequencyPenalty` ve `presencePenalty` kullanıldı.
- Daha tutarlı yanıtlar üretmeye yardımcı olmak için modeli en olası K token ile sınırlamak üzere `top_k` kullanıldı.

---

## Deterministik Örnekleme

Tutarlı çıktı gerektiren uygulamalarda, deterministik örnekleme tekrarlanabilir sonuçlar sağlar. Bunu, sabit bir rastgele tohum kullanarak ve sıcaklığı sıfıra ayarlayarak yapar.

Aşağıdaki örnek uygulama, farklı programlama dillerinde deterministik örneklemeyi göstermek içindir.

# [Java](#tab/java)

```java
// Java Örneği: Sabit tohumla deterministik yanıtlar
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Deterministik sonuçlar için sabit tohum kullanma
        
        // Sabit tohum ile ilk istek
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Maksimum deterministiklik için sıfır sıcaklık
            .build();
            
        // Aynı tohumla ikinci istek
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Her iki isteği de çalıştır
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Aynı tohum ve sıcaklık=0 nedeniyle yanıtlar aynı olmalıdır
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Yukarıdaki kodda:

- Belirtilen sunucu URL'si ile MCP istemcisi oluşturuldu.
- Aynı istemle, sabit tohum ve sıfır sıcaklık ile iki istek yapılandırıldı.
- Her iki istek gönderildi ve oluşturulan metin yazdırıldı.
- Yanıtların, örnekleme yapılandırmasının deterministik olması nedeniyle (aynı tohum ve sıcaklık) aynı olduğu gösterildi.
- Aynı girdide her seferinde aynı çıktıyı üretmesi için `setSeed` ile sabit bir rastgele tohum belirlendi.
- Maksimum deterministiklik için `temperature` sıfıra ayarlandı; model her zaman en olası sonraki tokeni rastgelelik olmadan seçecektir.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// JavaScript Örneği: Tohum kontrolü ile belirleyici yanıtlar
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Sabit tohum ile ilk istek
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Maksimum belirleyicilik için sıfır sıcaklık
    });
    
    // Aynı tohum ve sıcaklık ile ikinci istek
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Farklı tohum ama aynı sıcaklık ile üçüncü istek
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

Yukarıdaki kodda:

- Sunucu URL'si ile MCP istemcisi başlatıldı.
- Aynı istemle, sabit tohum ve sıfır sıcaklık ile iki istek yapılandırıldı.
- Her iki istek gönderildi ve oluşturulan metin yazdırıldı.
- Yanıtların, örnekleme yapılandırmasının deterministik olması nedeniyle (aynı tohum ve sıcaklık) aynı olduğu gösterildi.
- Aynı girdide her seferinde aynı çıktıyı üretmek için `seed` ile sabit rastgele tohum belirlendi.
- Maksimum deterministiklik için `temperature` sıfıra ayarlandı; model her zaman en olası sonraki tokeni rastgelelik olmadan seçecektir.
- Üçüncü istek için farklı bir tohum kullanıldı; bu, aynı istem ve sıcaklıkla tohum değiştirme durumunda farklı çıktılar elde edildiğini göstermek içindir.

---

## Dinamik Örnekleme Yapılandırması

Akıllı örnekleme, bağlama ve her isteğin gereksinimlerine göre parametreleri ayarlar. Bu, görev türü, kullanıcı tercihleri veya geçmiş performansa bağlı olarak `temperature`, `top_p` ve cezalar gibi parametrelerin dinamik olarak ayarlanması anlamına gelir.

Dinamik örneklemeyi farklı programlama dillerinde nasıl uygulayacağımıza bakalım.

# [Python](#tab/python)

```python
# Python Örneği: İstek bağlamına dayalı dinamik örnekleme
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Farklı görev türleri için örnekleme ön ayarlarını tanımlayın
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Temel ön ayarı seçin
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Sağlanmışsa kullanıcı tercihlerine göre ayarlayın
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Yaratıcılık tercihlerine göre sıcaklığı ölçeklendirin (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # İstenen yanıt çeşitliliğine göre top_p değerini ayarlayın
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Özel örnekleme parametreleriyle istek oluşturun ve gönderin
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Şeffaflık için örnekleme meta verileri ile yanıtı döndürün
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Yukarıdaki kodda:

- Uyarlanabilir örneklemeyi yöneten `DynamicSamplingService` sınıfı oluşturuldu.
- Farklı görev türleri (yaratıcı, gerçek, kod, analitik) için örnekleme ön ayarları tanımlandı.
- Görev türüne bağlı olarak temel örnekleme ön ayarı seçildi.
- Kullanıcı tercihleri (yaratıcılık seviyesi ve çeşitlilik gibi) bazında örnekleme parametreleri ayarlandı.
- Dinamik yapılandırılmış örnekleme parametreleri ile istek gönderildi.
- Şeffaflık için modelin oluşturduğu metin, uygulanan örnekleme parametreleri ve görev türü ile birlikte döndürüldü.
- Üretilen metnin rastgeleliğini kontrol etmek için `temperature` kullanıldı, yüksek değerler daha yaratıcı yanıtlar getirir.
- Token seçimlerini en yüksek kümülatif olasılık kütlesine katkıda bulunanlarla sınırlandırmak için `top_p` kullanıldı, bu da oluşturulan metnin kalitesini artırdı.
- Tekrarı azaltmak ve çeşitliliği teşvik etmek için `frequency_penalty` kullanıldı.
- Kullanıcı tanımlı yaratıcılık ve çeşitlilik seviyelerine bağlı örnekleme parametrelerinin özelleştirilmesine izin vermek için `user_preferences` kullanıldı.
- İstek için uygun örnekleme stratejisini belirlemek adına `task_type` kullanıldı, bu sayede görev türüne göre daha özelleştirilmiş yanıtlar sağlandı.
- Belirtilen gereksinimlere göre model metin oluşturması için yapılandırılmış parametrelerle istem gönderildi (`send_request`).
- Modelin yanıtını almak için `generated_text` kullanıldı, ardından analiz veya gösterim için örnekleme parametreleri ve görev türü ile birlikte döndürüldü.
- Geçersiz örnekleme yapılandırmalarını önlemek için kullanıcı tercihleri geçerli aralıkta sınırlandı (`min` ve `max` fonksiyonları).

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// JavaScript Örneği: Kullanıcı bağlamına dayalı dinamik örnekleme yapılandırması
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Temel örnekleme profillerini tanımla
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Geçmiş performansı takip et
    this.performanceHistory = [];
  }
  
  // İstekte görev türünü algıla
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Basit sezgisel algılama - ML sınıflandırmasıyla geliştirilebilir
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // Açık bir tür algılanmazsa varsayılan olarak sohbet modu seç
    return 'conversational';
  }
  
  // Bağlam ve kullanıcı tercihlerine göre örnekleme parametrelerini hesapla
  getSamplingParameters(prompt, context = {}) {
    // Görev türünü algıla
    const taskType = this.detectTaskType(prompt, context);
    
    // Temel profili al
    let params = {...this.samplingProfiles[taskType]};
    
    // Kullanıcı tercihlerine göre ayarla
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // 1-10 aralığından uygun sıcaklık aralığına ölçeklendir
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Daha yüksek kesinlik, daha düşük topP (daha odaklı seçim) anlamına gelir
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Daha yüksek tutarlılık, daha düşük cezalar demektir
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Performans geçmişinden öğrenilen ayarları uygula
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Basit uyarlamalı mantık - daha karmaşık algoritmalarla geliştirilebilir
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Sadece yakın geçmişi dikkate al
    
    if (relevantHistory.length > 0) {
      // Ortalama performans puanlarını hesapla
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Performans eşik altındaysa parametreleri ayarla
      if (avgScore < 0.7) {
        // Daha güvenli değerlere hafif ayar
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Gelecek ayarlamalar için performansı kaydet
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Yanıt kalitesinin 0-1 arası derecelendirmesi
    });
    
    // Geçmiş boyutunu sınırla
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Optimize edilmiş örnekleme parametrelerini al
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Optimize edilmiş parametrelerle isteği gönder
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Kullanıcı geri bildirim sağlarsa, gelecekteki optimizasyon için kaydet
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// Örnek kullanım
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Özel kullanıcı tercihlerine sahip yaratıcı görev
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Yüksek yaratıcılık (1-10)
          consistency: 3  // Düşük tutarlılık (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Kod üretme görevi
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Düşük yaratıcılık
          precision: 8,   // Yüksek kesinlik
          consistency: 9  // Yüksek tutarlılık
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

Yukarıdaki kodda:

- Görev türü ve kullanıcı tercihlerine göre dinamik örnekleme yöneten `AdaptiveSamplingManager` sınıfı oluşturuldu.
- Farklı görev türleri (yaratıcı, gerçek, kod, sohbet) için örnekleme profilleri tanımlandı.
- Basit kestirimler kullanarak istemden görev türü algılayan yöntem uygulandı.
- Algılanan görev türü ve kullanıcı tercihleri temel alınarak örnekleme parametreleri hesaplandı.
- Örnekleme parametrelerini optimize etmek için geçmiş performansa dayalı öğrenilen ayarlamalar uygulandı.
- Geçmiş etkileşimlerden öğrenmek üzere performans kayıtları tutuldu.
- Dinamik olarak yapılandırılmış örnekleme parametreleri ile istekler gönderildi, oluşturulan metin ve ilgili parametreler ile algılanan görev türü geri döndürüldü.
- Şunlar kullanıldı:
    - `userPreferences`, kullanıcı tanımlı yaratıcılık, hassasiyet ve tutarlılık seviyelerine bağlı örnekleme parametrelerinin özelleştirilmesine izin verir.
    - `detectTaskType`, istemden görev türünü belirlemek için kullanılır, böylece farklı istek türlerine uygun örnekleme stratejileri uygulanabilir.
    - `recordPerformance`, oluşturulan yanıtların performansını kaydederek sistemin zamanla adapte olmasını sağlar.
    - `applyLearnedAdjustments`, geçmiş performansa göre örnekleme parametrelerini değiştirir ve modelin yüksek kaliteli yanıtlar üretme yeteneğini artırır.
    - `generateResponse`, farklı istemler ve bağlamlarla çağrılabilir uyarlanabilir örneklemeyle yanıt üretim sürecini kapsar.
    - `allowedTools`, modelin oluşturma sırasında kullanabileceği araçları belirtir ve daha bağlam duyarlı yanıtlar sağlar.
    - `feedbackScore`, kullanıcıların oluşturulan yanıtın kalitesi hakkında geri bildirim vermesine olanak tanır; bu, model performansının zamanla iyileştirilmesinde kullanılır.
    - `performanceHistory`, geçmiş etkileşimlerin kaydını tutar ve sistemin önceki başarı ve başarısızlıklardan öğrenmesini sağlar.
    - `getSamplingParameters`, isteğin bağlamına göre örnekleme parametrelerini dinamik olarak ayarlar, böylece daha esnek ve duyarlı model davranışı sağlar.
    - `detectTaskType`, isteme göre görevi sınıflandırır ve farklı istek türleri için uygun örnekleme stratejilerinin uygulanmasına olanak tanır.
    - `samplingProfiles`, farklı görev türleri için temel örnekleme yapılandırmaları tanımlar ve isteğin doğasına göre hızlı ayarlamalara izin verir.

---

## Sonraki Adımlar

- [5.7 Ölçeklendirme](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->