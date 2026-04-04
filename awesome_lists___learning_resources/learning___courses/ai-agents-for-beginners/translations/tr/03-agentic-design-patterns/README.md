[![İyi Yapay Zeka Ajanları Nasıl Tasarlanır](../../../translated_images/tr/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Dersi görüntülemek için yukarıdaki görsele tıklayın)_
# AI Ajanik Tasarım İlkeleri

## Giriş

AI Ajanik Sistemleri oluşturmayı düşünmenin birçok yolu vardır. Üretken Yapay Zeka tasarımında belirsizliğin bir hata değil bir özellik olması nedeniyle, mühendislerin nereden başlamaları gerektiğini bile kestirmesi bazen zordur. Geliştiricilerin iş ihtiyaçlarını çözmek için müşteri merkezli ajanik sistemler oluşturmasını sağlamak üzere insan odaklı UX Tasarım İlkeleri seti oluşturduk. Bu tasarım ilkeleri zorlayıcı bir mimari değil, ajan deneyimlerini tanımlayan ve geliştiren ekipler için bir başlangıç noktasıdır.

Genel olarak ajanlar şunları yapmalıdır:

- İnsan kapasitelerini genişletmek ve ölçeklendirmek (fikir üretme, problem çözme, otomasyon vb.)
- Bilgi boşluklarını doldurmak (bana bilgi alanlarında hız kazandırmak, çeviri vb.)
- Bireyler olarak başkalarıyla çalışmayı tercih ettiğimiz biçimlerde işbirliğini kolaylaştırmak ve desteklemek
- Bizi daha iyi versiyonlarımız haline getirmek (ör. yaşam koçu/görev yöneticisi, duygusal düzenleme ve farkındalık becerilerini öğrenmemize yardımcı olmak, dayanıklılık inşa etmek vb.)

## Bu Ders Neleri Kapsayacak

- Ajanik Tasarım İlkeleri nelerdir
- Bu tasarım ilkelerini uygularken takip edilecek bazı yönergeler nelerdir
- Tasarım ilkelerini kullanmaya dair bazı örnekler

## Öğrenme Hedefleri

Bu dersi tamamladıktan sonra şunları yapabileceksiniz:

1. Ajanik Tasarım İlkelerinin ne olduğunu açıklamak
2. Ajanik Tasarım İlkelerini kullanma yönergelerini açıklamak
3. Ajanik Tasarım İlkelerini kullanarak bir ajan nasıl oluşturulacağını anlamak

## Ajanik Tasarım İlkeleri

![Ajanik Tasarım İlkeleri](../../../translated_images/tr/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Ajan (Alan)

Bu, ajanın çalıştığı ortamdır. Bu ilkeler, ajanları fiziksel ve dijital dünyalarda etkileşimde bulunacak şekilde nasıl tasarladığımızı yönlendirir.

- **Bağlamak, çökmek değil** – işbirliği ve bağlantıyı mümkün kılmak için insanları diğer insanlara, olaylara ve uygulanabilir bilgilere bağlamaya yardımcı olun.
- Ajanlar olayları, bilgiyi ve insanları birbirine bağlamaya yardımcı olur.
- Ajanlar insanları birbirine daha yakın getirir. İnsanları değiştirmek veya küçümsemek için tasarlanmamıştır.
- **Kolay erişilebilir fakat zaman zaman görünmez** – ajan büyük ölçüde arka planda çalışır ve yalnızca ilgili ve uygun olduğunda bizi uyarır.
  - Ajan yetkili kullanıcılar için herhangi bir cihazda veya platformda kolayca keşfedilebilir ve erişilebilir olmalıdır.
  - Ajan çok modlu girişleri ve çıktıları destekler (ses, konuşma, metin vb.).
  - Ajan, kullanıcının ihtiyaçlarını algılamasına bağlı olarak ön plan ile arka plan; proaktif ile reaktif arasında sorunsuz geçiş yapabilir.
  - Ajan görünmez biçimde çalışıyor olabilir, ancak arka plan işlem yolu ve diğer Ajanlarla işbirliği kullanıcı tarafından şeffaf ve kontrol edilebilir olmalıdır.

### Ajan (Zaman)

Bu, ajanın zaman içinde nasıl çalıştığını ifade eder. Bu ilkeler, geçmiş, şimdi ve gelecek arasında etkileşen ajanları nasıl tasarlayacağımızı yönlendirir.

- **Geçmiş**: Hem durumu hem bağlamı içeren tarihe yönelik yansıma.
  - Ajan yalnızca olay, kişiler veya durumlar ötesinde daha zengin tarihsel verilerin analizi temelinde daha alakalı sonuçlar sağlar.
  - Ajan geçmiş olaylardan bağlantılar oluşturur ve güncel durumlarla etkileşim kurmak için belleği aktif olarak yansıtır.
- **Şimdi**: Bildirimden ziyade yönlendirme.
  - Ajan, insanlarla etkileşimde kapsamlı bir yaklaşımı somutlaştırır. Bir olay gerçekleştiğinde, Ajan sabit bir bildirim veya başka bir statik biçimin ötesine geçer. Ajan akışları sadeleştirebilir veya kullanıcının dikkatini doğru anda yönlendirmek için dinamik olarak ipuçları oluşturabilir.
  - Ajan bilgileri bağlamsal ortam, sosyal ve kültürel değişiklikler ve kullanıcı niyetine göre sunar.
  - Ajan etkileşimi kademeli olabilir, uzun vadede kullanıcıları güçlendirmek için karmaşıklığı gelişerek/evrilerek artabilir.
- **Gelecek**: Uyarlanma ve evrilme.
  - Ajan çeşitli cihazlara, platformlara ve modlara uyum sağlar.
  - Ajan kullanıcı davranışına, erişilebilirlik ihtiyaçlarına uyum sağlar ve özgürce özelleştirilebilir.
  - Ajan sürekli kullanıcı etkileşimi tarafından şekillenir ve evrilir.

### Ajan (Çekirdek)

Bunlar ajanın tasarımının çekirdeğindeki temel unsurlardır.

- **Belirsizliği kucaklayın ama güveni tesis edin**.
  - Belirli bir düzeyde Ajan belirsizliği beklenir. Belirsizlik ajan tasarımının anahtar bir unsurudur.
  - Güven ve şeffaflık Ajan tasarımının temel katmanlarıdır.
  - İnsanlar Ajanın açık/kapalı olduğu zaman üzerinde kontrole sahiptir ve Ajan durumu her zaman net bir şekilde görünür.

## Bu İlkeleri Uygulamak İçin Yönergeler

Önceki tasarım ilkelerini kullanırken şu yönergeleri uygulayın:

1. **Şeffaflık**: Kullanıcıya Yapay Zeka'nın dahil olduğunu, nasıl çalıştığını (geçmiş eylemler dahil) ve nasıl geri bildirim verilip sistemi nasıl değiştirebileceklerini bildirin.
2. **Kontrol**: Kullanıcının sistemi ve özelliklerini özelleştirmesine, tercih belirtmesine ve kişiselleştirmesine; ayrıca unutma yeteneği dahil olmak üzere sistem üzerinde kontrol sahibi olmasına olanak tanıyın.
3. **Tutarlılık**: Cihazlar ve uç noktalar arasında tutarlı, çok modlu deneyimler hedefleyin. Mümkün olduğunda tanıdık UI/UX öğelerini kullanın (ör. ses etkileşimi için mikrofon simgesi) ve müşterinin bilişsel yükünü mümkün olduğunca azaltın (ör. kısa yanıtlar, görsel yardımcılar ve ‘Daha Fazla Bilgi’ içeriği hedefleyin).

## Bu İlkeler ve Yönergeleri Kullanarak Bir Seyahat Ajanı Nasıl Tasarlanır

Seyahat Ajanı tasarladığınızı hayal edin, işte Tasarım İlkeleri ve Yönergeleri kullanmayı düşünebileceğiniz bazı yollar:

1. **Şeffaflık** – Kullanıcıya Seyahat Ajanının Yapay Zeka destekli bir Ajan olduğunu bildirin. Başlamak için bazı temel talimatlar sağlayın (ör. bir “Merhaba” mesajı, örnek istemler). Bunu ürün sayfasında açıkça belgeleyin. Kullanıcının geçmişte sorduğu istemlerin listesini gösterin. Geri bildirimin nasıl verileceğini (başparmak yukarı/aşağı, Geri Bildirim Gönder düğmesi vb.) açıkça gösterin. Ajanın kullanım veya konu kısıtlamaları varsa bunları net bir şekilde belirtin.
2. **Kontrol** – Ajan oluşturulduktan sonra kullanıcıların Sistem İstemi gibi şeylerle ajanı nasıl değiştirebileceklerinin açık olmasını sağlayın. Kullanıcının ajanın ne kadar ayrıntılı olduğunu, yazım tarzını ve ajanın konuşmaması gereken konulara dair uyarıları seçmesine olanak tanıyın. İlgili dosyaları veya verileri, istemleri ve geçmiş konuşmaları görüntüleme ve silme izni verin.
3. **Tutarlılık** – İstem Paylaş, bir dosya veya fotoğraf ekle ve birini veya bir şeyi etiketle simgelerinin standart ve tanınabilir olmasını sağlayın. Ajanla dosya yükleme/paylaşımı göstermek için ataç simgesini, grafik yüklemeyi göstermek için resim simgesini kullanın.

## Örnek Kodlar

- Python: [Ajan Çerçevesi](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Ajan Çerçevesi](./code_samples/03-dotnet-agent-framework.md)


## Ajanik Tasarım Desenleri hakkında Daha Fazla Sorunuz mu Var?

Join the [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet with other learners, attend office hours and get your AI Agents questions answered.

## Ek Kaynaklar

- <a href="https://openai.com" target="_blank">Ajanik Yapay Zeka Sistemlerini Yöneten Uygulamalar | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">HAX Araç Seti Projesi - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Sorumlu Yapay Zeka Araç Kutusu</a>

## Önceki Ders

[Ajanik Çerçeveleri Keşfetme](../02-explore-agentic-frameworks/README.md)

## Sonraki Ders

[Araç Kullanım Tasarım Deseni](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Sorumluluk Reddi:
Bu belge, AI çeviri hizmeti Co-op Translator (https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstermemize rağmen otomatik çeviriler hatalar veya yanlışlıklar içerebilir. Orijinal belge, kendi dilindeki metin yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımından kaynaklanan herhangi bir yanlış anlama veya hatalı yorumlamadan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->