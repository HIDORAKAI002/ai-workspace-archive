# Vaka İncelemesi: Azure AI Seyahat Acenteleri – Referans Uygulama

## Genel Bakış

[Azure AI Seyahat Acenteleri](https://github.com/Azure-Samples/azure-ai-travel-agents), Microsoft tarafından geliştirilen, Model Context Protocol (MCP), Azure OpenAI ve Azure AI Search kullanarak çoklu ajanlı, yapay zeka destekli seyahat planlama uygulaması oluşturmayı gösteren kapsamlı bir referans çözümdür. Bu proje, birden çok yapay zeka ajanını koordine etme, kurumsal verileri entegre etme ve gerçek dünya senaryoları için güvenli, genişletilebilir bir platform sağlama konusundaki en iyi uygulamaları sergiler.

## Temel Özellikler
- **Çoklu Ajan Orkestrasyonu:** MCP kullanarak karmaşık seyahat planlama görevlerini yerine getirmek için işbirliği yapan uçuş, otel ve güzergah ajanları gibi uzmanlaşmış ajanları koordine eder.
- **Kurumsal Veri Entegrasyonu:** Seyahat önerileri için güncel ve ilgili bilgileri sağlamak amacıyla Azure AI Search ve diğer kurumsal veri kaynaklarına bağlanır.
- **Güvenli, Ölçeklenebilir Mimari:** Kimlik doğrulama, yetkilendirme ve ölçeklenebilir dağıtımları için Azure hizmetlerinden yararlanır ve kurumsal güvenlik en iyi uygulamalarını takip eder.
- **Genişletilebilir Araçlar:** Yeni alanlara veya iş gereksinimlerine hızlı uyum sağlamak için yeniden kullanılabilir MCP araçları ve istem şablonları uygular.
- **Kullanıcı Deneyimi:** Kullanıcıların Azure OpenAI ve MCP tarafından desteklenen seyahat ajanlarıyla etkileşimde bulunabileceği konuşmalara dayalı bir arayüz sunar.

## Mimari
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Mimari Diyagram Açıklaması

Azure AI Seyahat Acenteleri çözümü, çoklu yapay zeka ajanları ve kurumsal veri kaynaklarının modüler, ölçeklenebilir ve güvenli entegrasyonu için tasarlanmıştır. Ana bileşenler ve veri akışı şu şekildedir:

- **Kullanıcı Arayüzü:** Kullanıcılar, bir web sohbeti veya Teams botu gibi konuşmaya dayalı bir UI aracılığıyla sistemle etkileşimde bulunur; kullanıcı sorguları gönderir ve seyahat önerileri alır.
- **MCP Sunucusu:** Kullanıcı girdisini alan, bağlamı yöneten ve Model Context Protocol aracılığıyla uzman ajanların (örneğin FlightAgent, HotelAgent, ItineraryAgent) eylemlerini koordine eden merkezi orkestratör görevi görür.
- **Yapay Zeka Ajanları:** Her ajan belirli bir alandan sorumludur (uçuşlar, oteller, güzergahlar) ve MCP aracı olarak uygulanmıştır. Ajanlar, istekleri işlemek ve yanıtlar üretmek için istem şablonları ve mantık kullanır.
- **Azure OpenAI Hizmeti:** İleri düzey doğal dil anlama ve üretimi sağlar, ajanların kullanıcı niyetini yorumlamasına ve konuşmaya dayalı yanıtlar üretmesine olanak tanır.
- **Azure AI Search & Kurumsal Veri:** Ajanlar, uçuşlar, oteller ve seyahat seçenekleri hakkında güncel bilgiler almak için Azure AI Search ve diğer kurumsal veri kaynaklarında sorgu yapar.
- **Kimlik Doğrulama & Güvenlik:** Microsoft Entra ID ile güvenli kimlik doğrulama entegre eder ve en az ayrıcalık erişim kontrollerini tüm kaynaklara uygular.
- **Dağıtım:** Ölçeklenebilirlik, izleme ve operasyonel verimliliği sağlamak için Azure Container Apps üzerinde dağıtıma uygun şekilde tasarlanmıştır.

Bu mimari, çoklu yapay zeka ajanlarının sorunsuz orkestrasyonunu, kurumsal veri ile güvenli entegrasyonu ve alan özelinde yapay zeka çözümleri oluşturmak için sağlam, genişletilebilir bir platform sağlar.

## Mimari Diyagramın Adım Adım Açıklaması
Büyük bir seyahat planladığınızı ve her detayda size yardımcı olan bir uzman ekibiniz olduğunu hayal edin. Azure AI Seyahat Acenteleri sistemi, her birinin özel bir işi olan farklı parçaların (ekip üyeleri gibi) kullandığı benzer bir şekilde çalışır. İşte nasıl bir araya geldiği:

### Kullanıcı Arayüzü (UI):
Bunu seyahat acentenizin ön ofisi olarak düşünün. Burada siz (kullanıcı) “Paris’e uçuş bul” gibi sorular sorar veya isteklerde bulunursunuz. Bu, bir web sohbet penceresi ya da bir mesajlaşma uygulaması olabilir.

### MCP Sunucusu (Koordinatör):
MCP Sunucusu, isteklerinizi ön ofiste dinleyen ve hangi uzmanın her parçayı ele alması gerektiğine karar veren müdür gibidir. Konuşmanızı takip eder ve her şeyin sorunsuz işlemesini sağlar.

### Yapay Zeka Ajanları (Uzman Asistanlar):
Her ajan belirli bir alanda uzmandır—birisi uçuşlar hakkında, bir diğeri oteller hakkında ve bir başkası da güzergah planlaması konusunda bilgi sahibidir. Seyahat istediğinizde MCP Sunucusu isteğinizi doğru ajan(lar)a iletir. Bu ajanlar en iyi seçenekleri bulmak için bilgi ve araçlarını kullanır.

### Azure OpenAI Hizmeti (Dil Uzmanı):
Sorduğunuz şeyi, nasıl ifade ederseniz edin tam olarak anlayan bir dil uzmanı gibi çalışır. Ajanların isteklerinizi anlamasına ve doğal, sohbet bazlı yanıtlar vermesine yardımcı olur.

### Azure AI Search & Kurumsal Veri (Bilgi Kütüphanesi):
En son seyahat bilgileriyle dolu büyük ve güncel bir kütüphane hayal edin—uçuş tarifeleri, otel müsaitlikleri ve daha fazlası. Ajanlar size en doğru yanıtları almak için bu kütüphanede arama yapar.

### Kimlik Doğrulama & Güvenlik (Güvenlik Görevlisi):
Tıpkı güvenlik görevlisinin belirli alanlara kimin girebileceğini kontrol etmesi gibi, bu bileşen yalnızca yetkili kişilerin ve ajanların hassas bilgilere erişmesini sağlar. Verilerinizi güvenli ve gizli tutar.

### Azure Container Apps Üzerinde Dağıtım (Bina):
Bu asistanlar ve araçlar, güvenli, ölçeklenebilir bir bina (bulut) içerisinde birlikte çalışır. Bu, sistemin aynı anda çok sayıda kullanıcıyı desteklemesini ve ihtiyaç duyduğunuzda her zaman erişilebilir olmasını sağlar.

## Nasıl birlikte çalışırlar:

Ön ofiste (UI) bir soru sorarak başlarsınız.
Müdür (MCP Sunucusu) hangi uzmanın (ajan) size yardımcı olacağını belirler.
Uzman, isteğinizi anlamak için dil uzmanını (OpenAI) ve en iyi yanıtı bulmak için kütüphaneyi (AI Search) kullanır.
Güvenlik görevlisi (Kimlik Doğrulama) her şeyin güvende olmasını sağlar.
Tüm bunlar güvenilir, ölçeklenebilir bir binada (Azure Container Apps) gerçekleşir, böylece deneyiminiz sorunsuz ve güvenlidir.
Bu ekip çalışması, sistemin uzman seyahat acentalarından oluşan bir takım gibi birlikte hızlı ve güvenli bir şekilde seyahatinizi planlamasını sağlar!

## Teknik Uygulama
- **MCP Sunucusu:** Çekirdek orkestrasyon mantığını barındırır, ajan araçlarını sunar ve çok adımlı seyahat planlama iş akışları için bağlamı yönetir.
- **Ajanlar:** Her ajan (ör. FlightAgent, HotelAgent) kendi istem şablonları ve mantığı ile bir MCP aracı olarak uygulanır.
- **Azure Entegrasyonu:** Doğal dil anlama için Azure OpenAI ve veri erişimi için Azure AI Search kullanır.
- **Güvenlik:** Kimlik doğrulama için Microsoft Entra ID ile entegre olur ve tüm kaynaklara en az ayrıcalık erişim kontrolü uygular.
- **Dağıtım:** Ölçeklenebilirlik ve operasyonel verimlilik için Azure Container Apps’e dağıtımı destekler.

## Sonuçlar ve Etki
- MCP’nin gerçek dünya, üretim kalitesinde bir senaryoda birden fazla yapay zeka ajanını orkestre etmek için nasıl kullanılabileceğini gösterir.
- Ajan koordinasyonu, veri entegrasyonu ve güvenli dağıtım için yeniden kullanılabilir desenler sağlayarak çözüm geliştirmeyi hızlandırır.
- MCP ve Azure hizmetlerini kullanarak alan özelinde yapay zeka destekli uygulamalar geliştirmek için bir şablon görevi görür.

## Kaynaklar
- [Azure AI Seyahat Acenteleri GitHub Deposu](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Hizmeti](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Sonraki Adımlar

- Geri Dön: [Vaka İncelemeleri Genel Bakış](./README.md)
- İleri: [YouTube’dan ADO Öğeleri Güncelleme](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, kendi ana dilindeki haliyle yetkili kaynak olarak kabul edilmelidir. Önemli bilgiler için profesyonel insan tercümesi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek herhangi bir yanlış anlama veya hatadan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->