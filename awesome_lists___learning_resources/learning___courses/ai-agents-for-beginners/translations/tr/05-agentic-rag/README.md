[![Agentic RAG](../../../translated_images/tr/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Bu dersin videosunu izlemek için yukarıdaki görsele tıklayın)_

# Agentic RAG

Bu ders, büyük dil modellerinin (LLM'ler) dış kaynaklardan bilgi çekerken kendi sonraki adımlarını özerk bir şekilde planladığı yeni bir AI paradigm olan Agentic Retrieval-Augmented Generation (Agentic RAG) hakkında kapsamlı bir genel bakış sunar. Statik alma-önce-okuma kalıplarının aksine, Agentic RAG, araç veya fonksiyon çağrıları ve yapılandırılmış çıktılar arasında yinelemeli LLM çağrılarını içerir. Sistem sonuçları değerlendirir, sorguları iyileştirir, gerekirse ek araçlar çağırır ve tatmin edici bir çözüm elde edilene kadar bu döngüyü sürdürür.

## Giriş

Bu derste şunlar ele alınacaktır

- **Agentic RAG'i Anlamak:** Büyük dil modellerinin (LLM'ler) dış veri kaynaklarından bilgi çekerken kendi sonraki adımlarını özerk şekilde planladığı yeni AI paradigmasını öğrenin.
- **Yinelemeli Üretici-Kontrolör Tarzını Kavramak:** Doğruluğu artırmak ve yanlış biçimlendirilmiş sorguları ele almak için araç veya fonksiyon çağrıları ve yapılandırılmış çıktılarla kesintili yinelemeli LLM çağrılarının döngüsünü anlayın.
- **Pratik Uygulamaları Keşfetmek:** Doğruluk öncelikli ortamlar, karmaşık veritabanı etkileşimleri ve genişletilmiş iş akışları gibi Agentic RAG’in öne çıktığı senaryoları tanımlayın.

## Öğrenme Hedefleri

Bu dersi tamamladıktan sonra şunları bilecek/anlayacaksınız:

- **Agentic RAG’i Anlamak:** Büyük dil modellerinin (LLM'ler) dış veri kaynaklarından bilgi çekerken kendi sonraki adımlarını özerk şekilde planladığı yeni AI paradigmasını öğrenin.
- **Yinelemeli Üretici-Kontrolör Tarzı:** Doğruluğu artırmak ve yanlış biçimlendirilmiş sorguları işlemek için araç veya fonksiyon çağrıları ve yapılandırılmış çıktılarla kesintili yinelemeli LLM çağrıları döngüsü kavrayın.
- **Muhakeme Sürecine Sahip Olmak:** Sistemin, önceden tanımlı yollar yerine problemleri nasıl ele alacağına dair kararlar verme yeteneğini kavrayın.
- **İş Akışı:** Bir agent modelinin bağımsız olarak piyasa trend raporlarını getirmeye, rakip verilerini tanımlamaya, iç satış metriklerini ilişkilendirmeye, bulguları sentezlemeye ve stratejiyi değerlendirmeye nasıl karar verdiğini anlayın.
- **Yinelemeli Döngüler, Araç Entegrasyonu ve Bellek:** Sistemin döngüsel etkileşim modeline bağımlılığını, adımlar arasında durumu ve belleği koruyarak tekrarlayan döngülerden kaçınmasını ve bilgili kararlar almasını öğrenin.
- **Başarısızlık Modlarının Yönetimi ve Kendini Düzeltme:** Sistemin, yineleme ve yeniden sorgulama, tanısal araçların kullanımı ve insan gözetimine başvurma gibi sağlam kendini düzeltme mekanizmalarını keşfedin.
- **Ajansın Sınırları:** Agentic RAG’in alan-spesifik özerklik, altyapı bağımlılığı ve güvenlik sınırlarına saygı konularındaki kısıtlamalarını anlayın.
- **Pratik Kullanım Durumları ve Değeri:** Doğruluk öncelikli ortamlar, karmaşık veritabanı etkileşimleri ve uzun iş akışları gibi Agentic RAG’in öne çıktığı senaryoları belirleyin.
- **Yönetim, Şeffaflık ve Güven:** Açıklanabilir muhakeme, önyargı kontrolü ve insan gözetimi de dahil olmak üzere yönetim ve şeffaflığın önemini öğrenin.

## Agentic RAG Nedir?

Agentic Retrieval-Augmented Generation (Agentic RAG), büyük dil modellerinin (LLM'ler) dış kaynaklardan bilgi çekerken kendi sonraki adımlarını özerk şekilde planladığı yeni bir AI paradigmasıdır. Statik alma-önce-okuma kalıplarının aksine, Agentic RAG, araç veya fonksiyon çağrıları ve yapılandırılmış çıktılar arasında yinelemeli LLM çağrılarını içerir. Sistem sonuçları değerlendirir, sorguları iyileştirir, gerekirse ek araçlar çağırır ve tatmin edici bir çözüm elde edilene kadar bu döngüyü sürdürür. Bu yinelemeli “üretici-kontrolör” tarzı doğruluğu artırır, biçimsiz sorgularla başa çıkar ve yüksek kaliteli sonuçları garanti eder.

Sistem muhakeme sürecine aktif olarak sahip çıkar, başarısız olan sorguları yeniden yazar, farklı alma yöntemleri seçer ve Azure AI Search'teki vektör araması, SQL veritabanları veya özel API’ler gibi birden çok aracı entegre ederek cevabını tamamlar. Bir agentik sistemin ayırt edici özelliği, muhakeme sürecine sahip çıkabilme becerisidir. Geleneksel RAG uygulamaları önceden tanımlanmış yollar kullanırken, bir agentik sistem bulduğu bilginin kalitesine göre kendi adım sırasını özerk şekilde belirler.

## Agentic Retrieval-Augmented Generation (Agentic RAG) Tanımı

Agentic Retrieval-Augmented Generation (Agentic RAG), LLM'lerin dış veri kaynaklarından bilgi çekmekle kalmayıp aynı zamanda sonraki adımlarını özerk şekilde planladığı AI geliştirmede yeni bir paradigmadır. Statik alma-önce-okuma kalıplarından veya dikkatli şekilde yazılmış istem dizilerinden farklı olarak, Agentic RAG, araç veya fonksiyon çağrıları ve yapılandırılmış çıktılar arasında yinelemeli LLM çağrıları döngüsünü içerir. Sistem her adımda elde ettiği sonuçları değerlendirir, sorguları iyileştirip iyileştirmemeye karar verir, gerekirse ek araçları devreye sokar ve tatmin edici bir çözüme ulaşana kadar bu döngüyü devam ettirir.

Bu yinelemeli “üretici-kontrolör” çalışma biçimi doğruluğu artırmak, yapısal veritabanlarına yönelik bozuk sorguları (ör. NL2SQL) işlemek ve dengeli, yüksek kaliteli sonuçlar sağlamak amacıyla tasarlanmıştır. Sadece dikkatle mühendislik yapılmış istem zincirlerine bağlı kalmak yerine, sistem kendi muhakeme sürecine aktif olarak sahip çıkar. Başarısız olan sorguları yeniden yazabilir, farklı alma yöntemleri seçebilir ve Azure AI Search’teki vektör araması, SQL veritabanları veya özel API’ler gibi birden fazla aracı entegre edebilir, cevabını netleştirmeden önce. Bu, aşırı karmaşık orkestrasyon çerçevelerine olan ihtiyacı ortadan kaldırır. Bunun yerine, nispeten basit bir “LLM çağrısı → araç kullanımı → LLM çağrısı → …” döngüsü gelişmiş ve sağlam çıktılar üretebilir.

![Agentic RAG Core Loop](../../../translated_images/tr/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Muhakeme Sürecine Sahip Olmak

Bir sistemi “agentik” yapan ayırt edici özellik, muhakeme sürecine sahip çıkabilmesidir. Geleneksel RAG uygulamaları genellikle model için hangi bilgilerin ne zaman alınacağını belirleyen insan tarafından önceden tanımlanmış bir yolu (düşünce zinciri) kullanır.  
Ancak gerçek anlamda agentik bir sistem, problemi nasıl ele alacağına içsel olarak karar verir. Sadece bir senaryoyu yürütmekle kalmaz; bulduğu bilginin kalitesine dayanarak kendi adım sırasını özerk şekilde belirler.  
Örneğin, bir ürün lansman stratejisi hazırlaması istendiğinde, tüm araştırma ve karar verme iş akışını baştan sona yazan bir isteme bağlı kalmaz. Bunun yerine agentik model bağımsız olarak karar verir:

1. Bing Web Grounding kullanarak güncel piyasa trend raporlarını alır  
2. Azure AI Search ile ilgili rekabetçi verileri tanımlar  
3. Azure SQL Database kullanarak geçmiş iç satış metriklerini ilişkilendirir  
4. Bulunan bilgileri Azure OpenAI Hizmeti aracılığıyla yönettiği uyumlu bir strateji haline getirir  
5. Stratejideki boşlukları veya tutarsızlıkları değerlendirir, gerekirse başka bir alma turu başlatır  
Bu adımların tamamı — sorguları iyileştirmek, kaynakları seçmek, cevapla “mutlu” olana kadar yinelemek — model tarafından kararlaştırılır, insan tarafından önceden yazılmaz.

## Yinelemeli Döngüler, Araç Entegrasyonu ve Bellek

![Tool Integration Architecture](../../../translated_images/tr/tool-integration.0f569710b5c17c10.webp)

Bir agentik sistem döngüsel bir etkileşim modeline dayanır:

- **İlk Çağrı:** Kullanıcının hedefi (kullanıcı istemi) LLM’ye sunulur.
- **Araç Çağrısı:** Model eksik bilgi veya belirsiz talimatlar tespit ederse, özel veri üzerinde Azure AI Search Hybrid araması veya yapılandırılmış SQL çağrısı gibi bir araç veya alma yöntemi seçer.
- **Değerlendirme ve İyileştirme:** Gelen verileri gözden geçirdikten sonra model, bilginin yeterli olup olmadığına karar verir. Değilse sorguyu iyileştirir, farklı bir araç dener veya yaklaşımını değiştirir.
- **Tatmin Olana Kadar Tekrar:** Model, netlik ve kanıt sağlam olduğuna karar verinceye kadar döngü devam eder.
- **Bellek ve Durum:** Sistem adımlar arasında durumu ve belleği koruduğu için önceki denemeleri ve sonuçları hatırlayabilir, bu da tekrarlayan döngülerden kaçınmasını ve ilerledikçe daha bilinçli kararlar almasını sağlar.

Zaman içinde bu, gelişen bir anlayış duygusu oluşturur ve modeli karmaşık, çok adımlı görevlerde insan müdahalesi veya istemin yeniden şekillendirilmesi olmadan hareket etmeye olanak tanır.

## Başarısızlık Modlarının Yönetimi ve Kendini Düzeltme

Agentic RAG’in özerkliği aynı zamanda güçlü kendini düzeltme mekanizmalarını içerir. Sistem çıkmazlara girdiğinde — ilgisiz belgeler getirme veya biçimsiz sorgularla karşılaşma gibi — şunları yapabilir:

- **Yineleme ve Yeniden Sorgulama:** Düşük değerli yanıtlar vermek yerine yeni arama stratejileri dener, veritabanı sorgularını yeniden yazar veya alternatif veri setlerine bakar.
- **Tanısal Araçların Kullanımı:** Sistem, muhakeme adımlarını hata ayıklamaya veya alınan verilerin doğruluğunu doğrulamaya yönelik ek fonksiyonları çağırabilir. Azure AI Tracing gibi araçlar sağlam gözlemlenebilirlik ve izleme sağlamak için önemli olacaktır.
- **İnsana Başvurma:** Yüksek riskli veya tekrar eden başarısız senaryolarda model belirsizliği işaretleyebilir ve insan rehberliği talep edebilir. İnsan düzeltici geri bildirim sağladığında model bu dersleri gelecekte kullanabilir.

Bu yinelemeli ve dinamik yaklaşım, modelin sürekli iyileşmesini sağlar ve yalnızca tek seferlik değil, oturum boyunca hatalarından öğrenen bir sistem olmasını garantiler.

![Self Correction Mechanism](../../../translated_images/tr/self-correction.da87f3783b7f174b.webp)

## Ajansın Sınırları

Bir görev içindeki özerkliğine rağmen, Agentic RAG Yapay Genel Zekaya eşdeğer değildir. “Agentik” yetenekleri insan geliştiriciler tarafından sağlanan araçlar, veri kaynakları ve politikalara bağlıdır. Kendi araçlarını icat edemez veya belirlenen alan sınırlarının dışına çıkamaz. Bunun yerine mevcut kaynakları dinamik şekilde düzenleme konusunda başarılıdır.  
Daha gelişmiş AI formlarından temel farkları:

1. **Alan-Spesifik Özerklik:** Agentic RAG sistemleri, bilinen bir alan içindeki kullanıcı tanımlı hedeflere odaklanır, sonuçları iyileştirmek için sorgu yeniden yazma veya araç seçimi gibi stratejiler uygular.
2. **Altyapıya Bağımlılık:** Sistemin kabiliyetleri geliştiriciler tarafından entegre edilen araçlara ve verilere bağlıdır. İnsan müdahalesi olmadan bu sınırları aşamaz.
3. **Güvenlik Sınırlarına Saygı:** Etik kurallar, uyumluluk kuralları ve iş politikaları çok önemlidir. Ajanın özgürlüğü her zaman güvenlik önlemleri ve gözetim mekanizmaları tarafından sınırlandırılır (umarız ki).

## Pratik Kullanım Durumları ve Değeri

Agentic RAG, yinelemeli iyileştirme ve hassasiyet gerektiren senaryolarda öne çıkar:

1. **Doğruluk Öncelikli Ortamlar:** Uyum kontrollerinde, düzenleyici analizlerde veya hukuk araştırmalarında, agentik model gerçekleri tekrar tekrar doğrulayabilir, çoklu kaynakları danışabilir ve sorguları yeniden yazarak kapsamlıca onaylanmış yanıtlar sunar.
2. **Karmaşık Veritabanı Etkileşimleri:** Sorguların sık sık başarısız olduğu veya ayarlama gerektirdiği yapılandırılmış veri durumlarında sistem, Azure SQL veya Microsoft Fabric OneLake kullanarak sorgularını özerk şekilde iyileştirip son almayı kullanıcının amacına uygun hale getirir.
3. **Uzun İş Akışları:** Uzun oturumlar yeni bilgiler ortaya çıktıkça gelişebilir. Agentic RAG sürekli olarak yeni veriler entegre eder ve problem alanını daha iyi öğrendikçe strateji değiştirir.

## Yönetim, Şeffaflık ve Güven

Bu sistemler muhakemede daha bağımsız hale geldikçe yönetim ve şeffaflık kritik hale gelir:

- **Açıklanabilir Muhakeme:** Model yaptığı sorguların, danıştığı kaynakların ve vardığı muhakeme adımlarının denetim izini sağlayabilir. Azure AI Content Safety ve Azure AI Tracing / GenAIOps gibi araçlar şeffaflığı korumaya ve riskleri azaltmaya yardımcı olur.
- **Önyargı Kontrolü ve Dengeli Alma:** Geliştiriciler, dengeli ve temsilci veri kaynaklarının göz önünde bulundurulmasını sağlamak için alma stratejilerini ayarlayabilir ve çıktıların önyargı veya çarpık desenler içerip içermediğini düzenli olarak denetleyebilir. Azure Machine Learning kullanan gelişmiş veri bilimi organizasyonları için özel modellerle denetleme yapılabilir.
- **İnsan Gözetimi ve Uyumluluk:** Hassas görevlerde insan incelemesi hayati önemdedir. Agentic RAG yüksek riskli kararları insan yargısının yerini almak yerine iyice incelenmiş seçenekleri sunarak destekler.

Aksiyonların net kaydını sağlayan araçlar olmazsa çok adımlı bir süreci hata ayıklamak çok zor olabilir. Literal AI’den (Chainlit şirketi) bir agent çalıştırma örneği aşağıda görülmektedir:

![AgentRunExample](../../../translated_images/tr/AgentRunExample.471a94bc40cbdc0c.webp)

## Sonuç

Agentic RAG, AI sistemlerinin karmaşık, veri yoğun görevleri nasıl ele aldığına doğal bir evrim sunar. Döngüsel bir etkileşim modeli benimseyip, araçları özerk şekilde seçip, yüksek kaliteli bir sonuca ulaşana kadar sorguları iyileştirerek, sistem statik istem izleme aşamasını aşar ve daha uyarlanabilir, bağlam farkında karar verici olur. İnsan tarafından tanımlanmış altyapılar ve etik kurallarla sınırlandırılmış olsa da, bu agentik yetenekler işletmeler ve son kullanıcılar için daha zengin, dinamik ve nihayetinde daha faydalı AI etkileşimleri sağlar.

### Agentic RAG hakkında Daha Fazla Sorunuz mu Var?

Diğer öğrenenlerle buluşmak, ofis saatlerine katılmak ve AI Agent sorularınızı sormak için [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) topluluğuna katılın.

## Ek Kaynaklar
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Azure OpenAI Hizmeti ile Retrieval Augmented Generation (RAG) Uygulaması: Azure OpenAI Hizmeti ile kendi verilerinizi nasıl kullanacağınızı öğrenin. Bu Microsoft Learn modülü, RAG uygulaması hakkında kapsamlı bir rehber sunar</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Microsoft Foundry ile üretici yapay zeka uygulamalarının değerlendirilmesi: Bu makale, Agentic AI uygulamaları ve RAG mimarileri dahil olmak üzere, açık erişimli veri kümeleri üzerinde modellerin değerlendirilmesini ve karşılaştırılmasını kapsar</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Agentic RAG Nedir | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Ajan Tabanlı Retrieval Augmented Generation İçin Eksiksiz Rehber – Generation RAG Haberleri</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: Sorgu Yeniden Formülasyonu ve Öz-Sorgu ile RAG’inizi turbo hızlandırın! Hugging Face Açık Kaynak AI Yemek Kitabı</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">RAG’e Agentic Katmanlar Eklemek</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Bilgi Asistanlarının Geleceği: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Agentic RAG Sistemleri Nasıl Kurulur</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Yapay zeka ajanlarınızı ölçeklendirmek için Microsoft Foundry Agent Hizmetini kullanma</a>

### Akademik Makaleler

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Öz-Geri Bildirim ile Yinelemeli İyileştirme</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Sözlü Pekiştirmeli Öğrenmeye Sahip Dil Ajanları</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Büyük Dil Modelleri Araç-İnteraktif Eleştiri ile Kendi Kendini Düzeltebilir</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Agentic RAG Üzerine Bir Araştırma</a>

## Önceki Ders

[Tool Use Design Pattern](../04-tool-use/README.md)

## Sonraki Ders

[Güvenilir AI Ajanları Oluşturmak](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, kendi ana dilindeki haliyle yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu oluşabilecek yanlış anlamalar veya yorum hatalarından sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->