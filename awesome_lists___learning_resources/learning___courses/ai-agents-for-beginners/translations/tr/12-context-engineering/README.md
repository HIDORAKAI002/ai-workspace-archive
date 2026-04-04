# Yapay Zeka Ajanları için Bağlam Mühendisliği

[![Bağlam Mühendisliği](../../../translated_images/tr/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Dersi izlemek için yukarıdaki görsele tıklayın)_

Yapay zeka ajanı oluşturduğunuz uygulamanın karmaşıklığını anlamak, güvenilir bir ajan yapmanın önemli bir parçasıdır. İstem mühendisliğinin ötesinde, karmaşık ihtiyaçları ele almak için bilgiyi etkili bir şekilde yöneten Yapay Zeka Ajanları inşa etmemiz gerekiyor.

Bu derste, bağlam mühendisliğinin ne olduğunu ve yapay zeka ajanları oluşturmadaki rolünü inceleyeceğiz.

## Giriş

Bu ders şunları kapsayacak:

• **Bağlam Mühendisliği nedir** ve neden istem mühendisliğinden farklıdır.

• **Etkili Bağlam Mühendisliği stratejileri**, bilgiyi yazma, seçme, sıkıştırma ve izole etme yöntemleri dahil.

• **Yaygın Bağlam Hataları** ve bunların ajanınızı nasıl raydan çıkarabileceği ile bunları düzeltme yolları.

## Öğrenme Hedefleri

Bu dersi tamamladıktan sonra şu konuları öğrenecek/öğreneceksiniz:

• **Bağlam mühendisliğini tanımlamayı** ve onu istem mühendisliğinden ayırmayı.

• **Büyük Dil Modeli (LLM) uygulamalarında bağlamın** temel bileşenlerini belirlemeyi.

• **Ajan performansını iyileştirmek için bağlamı yazma, seçme, sıkıştırma ve izole etme** stratejilerini uygulamayı.

• **Zehirlenme, dikkat dağınıklığı, karışıklık ve çakışma** gibi yaygın bağlam hatalarını tanımayı ve bunları hafifletme tekniklerini uygulamayı.

## Bağlam Mühendisliği Nedir?

Yapay Zeka Ajanları için bağlam, bir yapay zeka ajanının belirli eylemleri planlamasını sağlayan şeydir. Bağlam Mühendisliği, yapay zeka ajanın bir görevin bir sonraki adımını tamamlamak için doğru bilgilere sahip olmasını sağlamaya yönelik uygulamadır. Bağlam penceresi boyut olarak sınırlıdır, bu yüzden ajan geliştiricileri olarak bağlam penceresine bilgiyi ekleme, çıkarma ve yoğunlaştırma süreçlerini yönetecek sistemler ve süreçler inşa etmeliyiz.

### İstem Mühendisliği ve Bağlam Mühendisliği

İstem mühendisliği, yapay zeka ajanlarını bir dizi kuralla etkili şekilde yönlendirmek için tek bir statik talimat setine odaklanır. Bağlam mühendisliği ise, başlangıç istemi de dahil olmak üzere, ajanların zaman içinde ihtiyaç duydukları dinamik bilgi setini nasıl yöneteceğinizle ilgilidir. Bağlam mühendisliğinin ana fikri bu süreci tekrarlanabilir ve güvenilir hale getirmektir.

### Bağlam Türleri

[![Bağlam Türleri](../../../translated_images/tr/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Bağlamın tek bir şey olmadığını hatırlamak önemlidir. Yapay Zeka Ajanının ihtiyaç duyduğu bilgiler çeşitli farklı kaynaklardan gelebilir ve ajanın bu kaynaklara erişimini sağlamak bize düşer:

Bir yapay zeka ajanının yönetmesi gerekebilecek bağlam türleri şunlardır:

• **Talimatlar:** Bunlar, ajanın "kuralları" gibidir – istemler, sistem mesajları, few-shot örnekleri (modele bir şeyi nasıl yapacağını gösteren örnekler) ve kullanabileceği araçların açıklamaları. İstem mühendisliğinin odağı ile bağlam mühendisliğinin birleştiği yer burasıdır.

• **Bilgi:** Veriler, veritabanlarından alınan bilgiler veya ajanın biriktirdiği uzun süreli hafızalar bu kapsama girer. Bir ajanın farklı bilgi depolarına ve veritabanlarına erişmesi gerekiyorsa, Retrieval Augmented Generation (RAG) sisteminin entegrasyonunu içerebilir.

• **Araçlar:** Bunlar, ajanın çağırabileceği dış fonksiyonların, API'lerin ve MCP Sunucularının tanımları ile bunları kullanırken aldığı geri bildirimleri (sonuçları) içerir.

• **Konuşma Geçmişi:** Kullanıcı ile devam eden diyalog. Zaman geçtikçe bu konuşmalar uzar ve daha karmaşık hale gelir, bu da bağlam penceresinde yer kaplamaya başlar.

• **Kullanıcı Tercihleri:** Bir kullanıcının zaman içinde öğrenilen beğenileri veya beğenmemeleri. Bunlar saklanabilir ve kullanıcının kararlarında yardımcı olmak için gerektiğinde çağrılabilir.

## Etkili Bağlam Mühendisliği için Stratejiler

### Planlama Stratejileri

[![Bağlam Mühendisliği En İyi Uygulamaları](../../../translated_images/tr/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

İyi bağlam mühendisliği iyi planlamayla başlar. İşte bağlam mühendisliği kavramını nasıl uygulamaya başlayacağınıza yardımcı olacak bir yaklaşım:

1. **Net Sonuçları Tanımlayın** - Yapay zeka ajanlarına verilecek görevlerin sonuçları net bir şekilde tanımlanmalıdır. "Ajan görevi bitirdiğinde dünya nasıl görünecek?" sorusunu cevaplayın. Başka bir deyişle, kullanıcı yapay zeka ajanıyla etkileşime girdikten sonra hangi değişiklik, bilgi veya yanıtı almış olmalıdır.

2. **Bağlamı Haritalayın** - Yapay zeka ajanın sonuçlarını tanımladıktan sonra, "Bu görevi tamamlamak için Yapay Zeka Ajanının hangi bilgilere ihtiyacı var?" sorusunu cevaplamalısınız. Bu sayede o bilgilerin nerede bulunabileceğinin bağlamını haritalamaya başlayabilirsiniz.

3. **Bağlam Boru Hatları Oluşturun** - Bilginin nerede olduğunu bildiğinize göre, "Ajan bu bilgiyi nasıl alacak?" sorusunu cevaplamanız gerekir. Bu, RAG, MCP sunucularının kullanımı ve diğer araçlar dahil çeşitli yollarla yapılabilir.

### Pratik Stratejiler

Planlama önemlidir fakat bilgi ajanımızın bağlam penceresine akmaya başladıktan sonra, bunu yönetmek için pratik stratejilere ihtiyacımız vardır:

#### Bağlamı Yönetme

Bazı bilgiler bağlam penceresine otomatik olarak eklenirken, bağlam mühendisliği bu bilgiyi daha aktif şekilde ele almaktır ve bu birkaç stratejiyle yapılabilir:

 1. **Ajan Not Defteri**
 Bu, bir Yapay Zeka Ajanının tek bir oturum sırasında mevcut görevler ve kullanıcı etkileşimleri hakkında ilgili notlar almasını sağlar. Bu, bağlam penceresinin dışında bir dosyada veya çalışma zamanı nesnesinde bulunmalı ve ajan gerektiğinde bu oturum sırasında daha sonra alabilmelidir.

 2. **Hafızalar**
 Not defterleri, tek oturumluk bağlam penceresinin dışında bilgi yönetmek için iyidir. Hafızalar ajanların birden fazla oturum boyunca ilgili bilgileri saklayıp geri çağırmasını sağlar. Bu özetleri, kullanıcı tercihlerini ve gelecekteki iyileştirmeler için geri bildirimleri içerebilir.

 3. **Bağlamı Sıkıştırma**
  Bağlam penceresi büyüdüğünde ve sınırına yaklaştığında, özetleme ve budama gibi teknikler kullanılabilir. Bu, yalnızca en ilgili bilgiyi tutmayı veya daha eski mesajları kaldırmayı içerir.
  
 4. **Çok Ajanlı Sistemler**
  Çok ajanlı sistem geliştirmek, her ajanın kendi bağlam penceresine sahip olması nedeniyle bir bağlam mühendisliği formudur. Bu bağlamın nasıl paylaşıldığı ve farklı ajana geçirildiği, bu sistemleri kurarken planlanması gereken bir diğer konudur.
  
 5. **Sandbox Ortamları**
  Bir ajan bazı kodları çalıştırması veya bir belgede büyük miktarda bilgiyi işlemesi gerekiyorsa, bu sonuçları işlemek için çok fazla token harcayabilir. Bunun hepsini bağlam penceresinde depolamak yerine, ajan bu kodu çalıştırabilen ve yalnızca sonuçları ve diğer ilgili bilgileri okuyabilen bir sandbox ortamı kullanabilir.
  
 6. **Çalışma Zamanı Durum Nesneleri**
   Bu, ajanın belirli bilgilere erişmesi gerektiğinde durumları yönetmek için bilgi konteynerleri oluşturularak yapılır. Karmaşık bir görev için, bu bir ajanın her bir alt görevin sonuçlarını adım adım saklamasını sağlayarak bağlamın yalnızca o belirli alt göreve bağlı kalmasına imkan tanır.
  
### Bağlam Mühendisliğine Örnek

Diyelim ki bir yapay zeka ajanından **"Bana Paris'e bir gezi ayırt."** yapmasını istiyoruz.

• Basit bir  istem mühendisliği kullanan ajan sadece şu şekilde yanıt verebilir: **"Tamam, Paris'e ne zaman gitmek istersiniz?**". Kullanıcının sorduğu doğrudan soruyu yalnızca o anda işlemiş olur.

• Bu derste ele alınan bağlam mühendisliği stratejilerini kullanan bir ajan çok daha fazlasını yapacaktır. Hatta yanıt vermeden önce sistem şu adımları atabilir:

  ◦ **Takviminizi kontrol edin** mevcut tarihler için (gerçek zamanlı veri çekme).

  ◦ **Geçmiş seyahat tercihlerinizi hatırlayın** (uzun dönem hafızadan) — örneğin tercih ettiğiniz havayolu, bütçe veya aktarmasız uçuş tercih edip etmediğiniz gibi.

  ◦ **Uçuş ve otel rezervasyonu için kullanılabilir araçları tanımlayın.**

- Ardından bir örnek yanıt şöyle olabilir:  "Hey [Adınız]! Ekim ayının ilk haftasında müsait olduğunuzu görüyorum. [Tercih Edilen Havayolu] ile genelde kullandığınız [Bütçe] bütçeniz dahilinde Paris için aktarmasız uçuşlara bakmamı ister misiniz?". Bu daha zengin, bağlam farkında yanıt bağlam mühendisliğinin gücünü gösterir.

## Yaygın Bağlam Hataları

### Bağlam Zehirlenmesi

**Nedir:** Bir halüsinasyon (LLM tarafından üretilen yanlış bilgi) veya bir hata bağlama girip tekrar tekrar referans alındığında, ajan imkansız hedefleri takip etmeye veya saçma stratejiler geliştirmeye başlar.

**Ne yapılmalı:** **Bağlam doğrulaması** ve **karantina** uygulayın. Bilgi uzun süreli hafızaya eklenmeden önce doğrulanmalıdır. Potansiyel zehirlenme tespit edilirse, kötü bilginin yayılmasını önlemek için yeni, temiz bağlam iplikleri başlatın.

**Seyahat Rezervasyonu Örneği:** Ajanınız, gerçekte uluslararası uçuş sunmayan küçük bir yerel havalimanından uzak bir uluslararası şehre doğrudan uçuş olduğuna dair halüsinasyon üretir. Bu var olmayan uçuş detayı bağlama kaydedilir. Daha sonra rezervasyon yapmanızı istediğinizde, ajan bu imkansız rotaya bilet bulmaya çalışmaya devam eder ve tekrar eden hatalara yol açar.

**Çözüm:** Uçuş detayını ajanın çalışma bağlamına eklemeden _önce_ **gerçek zamanlı bir API ile uçuş varlığını ve rotalarını doğrulayan** bir adım uygulayın. Doğrulama başarısız olursa, hatalı bilgi "karantinaya" alınır ve daha fazla kullanılmaz.

### Bağlam Dikkat Dağınıklığı

**Nedir:** Bağlam o kadar büyük hale gelir ki model birikmiş geçmişe aşırı odaklanır ve eğitimi sırasında öğrendiklerini kullanmak yerine tekrarlayan veya faydasız eylemler yapar. Modeller, bağlam penceresi dolmadan önce bile hata yapmaya başlayabilir.

**Ne yapılmalı:** **Bağlam özetleme** kullanın. Biriken bilgileri periyodik olarak daha kısa özetlere sıkıştırın, önemli ayrıntıları tutup gereksiz geçmişi kaldırın. Bu, odaklanmayı "sıfırlamaya" yardımcı olur.

**Seyahat Rezervasyonu Örneği:** Uzun süre boyunca çeşitli hayalinizdeki seyahat destinasyonlarını tartıştınız, iki yıl önceki sırt çantalı gezinizin detaylı bir anlatımı dahil. Nihayetinde **"gelecek ay için ucuz bir uçuş bul"** dediğinizde, ajan eski ve alakasız detaylara takılıp sırt çantası ekipmanınız veya geçmiş güzergahlarınız hakkında sürekli soru sorar ve mevcut talebinizi ihmal eder.

**Çözüm:** Belirli sayıda turdan sonra veya bağlam çok büyüdüğünde, ajan en son ve en ilgili konuşma parçalarını **özetlemeli** — mevcut seyahat tarihleriniz ve hedefinize odaklanarak — ve bir sonraki LLM çağrısı için bu yoğunlaştırılmış özeti kullanıp daha az ilgili geçmiş sohbeti elden çıkarmalıdır.

### Bağlam Karışıklığı

**Nedir:** Çok sayıda kullanılabilir aracın olması gibi gereksiz bağlamın modele kötü yanıtlar üretmesine veya alakasız araçları çağırmasına neden olması. Daha küçük modeller özellikle buna eğilimlidir.

**Ne yapılmalı:** RAG teknikleri kullanarak **araç yükünü yönetimi** uygulayın. Araç açıklamalarını bir vektör veritabanında saklayın ve her spesifik görev için yalnızca en ilgili araçları seçin. Araştırmalar, araç seçimlerini 30'un altında sınırlamanın yararlı olduğunu gösteriyor.

**Seyahat Rezervasyonu Örneği:** Ajanınızın erişebildiği onlarca araç var: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations` vb. "Paris'te dolaşmanın en iyi yolu nedir?" diye sorduğunuzda, çok fazla araç olması nedeniyle ajan kafası karışır ve Paris içinde `book_flight` çağırmaya çalışır ya da toplu taşımayı tercih etmenize rağmen `rent_car` çağırır; çünkü araç açıklamaları örtüşebilir veya hangi aracın en iyi olduğunu ayırt edemeyebilir.

**Çözüm:** Araç açıklamaları üzerinde **RAG** kullanın. Paris'te dolaşma hakkında soru sorduğunuzda, sistem sorgunuza göre yalnızca `rent_car` veya `public_transport_info` gibi en ilgili araçları dinamik olarak getirir ve LLM'e odaklanmış bir "yükleme" sunar.

### Bağlam Çakışması

**Nedir:** Bağlam içinde çelişkili bilgiler bulunduğunda tutarsız akıl yürütme veya kötü nihai yanıtlar ortaya çıkar. Bu genellikle bilgilerin aşama aşama geldiği ve erken, yanlış varsayımların bağlamda kaldığı durumlarda olur.

**Ne yapılmalı:** **Bağlam budama** ve **dış yükleme (offloading)** kullanın. Budama, yeni ayrıntılar geldiğinde güncel olmayan veya çelişen bilgilerin kaldırılması anlamına gelir. Dış yükleme, ana bağlamı karıştırmadan bilgileri işlemek için modele ayrı bir "not defteri" çalışma alanı sağlar.

**Seyahat Rezervasyonu Örneği:** Başlangıçta ajanınza **"Ekonomi sınıfı uçmak istiyorum."** derseniz. Konuşmanın ilerleyen bölümünde fikrinizi değiştirip **"Aslında, bu gezi için business sınıfına geçelim."** derseniz, her iki talimat da bağlamda kalırsa ajan çelişkili arama sonuçları alabilir veya hangi tercihe öncelik vereceğini karıştırabilir.

**Çözüm:** **Bağlam budama** uygulayın. Yeni bir talimat eski bir talimatla çelişiyorsa, eski talimat kaldırılır veya bağlamda açıkça geçersiz kılınır. Alternatif olarak, ajan çelişen tercihleri karara bağlamak için bir **not defteri** kullanabilir ve yalnızca nihai, tutarlı talimatın eylemlerini yönlendirmesini sağlar.

## Bağlam Mühendisliği Hakkında Daha Fazla Sorunuz mu Var?

Diğer öğrenenlerle tanışmak, ofis saatlerine katılmak ve Yapay Zeka Ajanlarınızla ilgili sorularınıza yanıt almak için [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)'a katılın.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Feragatname:
Bu belge, yapay zeka çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba gösterilse de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayın. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımından kaynaklanan herhangi bir yanlış anlama veya yanlış yorumdan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->