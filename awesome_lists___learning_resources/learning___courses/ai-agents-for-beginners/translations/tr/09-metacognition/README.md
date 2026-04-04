[![Multi-Agent Design](../../../translated_images/tr/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Bu dersin videosunu izlemek için yukarıdaki resme tıklayın)_
# Yapay Zeka Ajanlarında Metabiliş

## Giriş

Yapay zeka ajanlarında metabiliş dersine hoş geldiniz! Bu bölüm, yapay zeka ajanlarının kendi düşünme süreçleri hakkında nasıl düşünebildiğini merak eden yeni başlayanlar için tasarlanmıştır. Bu dersin sonunda, temel kavramları anlayacak ve metabilişi yapay zeka ajan tasarımında uygulamanız için pratik örneklerle donanmış olacaksınız.

## Öğrenme Hedefleri

Bu dersi tamamladıktan sonra, şunları yapabileceksiniz:

1. Ajan tanımlarındaki muhakeme döngülerinin etkilerini anlamak.
2. Kendini düzeltebilen ajanlara yardımcı olmak için planlama ve değerlendirme tekniklerini kullanmak.
3. Görevleri gerçekleştirmek için kodu manipüle edebilen kendi ajanlarınızı oluşturmak.

## Metabilişe Giriş

Metabiliş, kişinin kendi düşüncesi hakkında düşünmeyi içeren daha yüksek düzeyde bilişsel süreçleri ifade eder. Yapay zeka ajanları için bu, kendi farkındalıkları ve geçmiş deneyimlerine dayanarak eylemlerini değerlendirebilmek ve ayarlayabilmek anlamına gelir. Metabiliş, yani "düşünme üzerine düşünme", ajanik yapay zeka sistemlerinin geliştirilmesinde önemli bir kavramdır. Bu, yapay zeka sistemlerinin kendi iç süreçlerinin farkında olması ve davranışlarını izleyip, düzenleyip, uyarlayabilmesi anlamına gelir. Tıpkı bizim ortamı değerlendirirken veya bir probleme bakarken yaptığımız gibi. Bu öz-farkındalık, yapay zeka sistemlerinin daha iyi kararlar almasına, hataları tanımlamasına ve zaman içinde performanslarını geliştirmesine yardımcı olabilir — yine Turing testi ve yapay zekanın kontrolü ele alması tartışmasına bağlanıyor.

Ajanik yapay zeka sistemleri bağlamında, metabiliş şu zorlukların üstesinden gelmeye yardımcı olabilir:
- Şeffaflık: Yapay zeka sistemlerinin muhakemesini ve kararlarını açıklayabilmesini sağlamak.
- Muhakeme: Yapay zeka sistemlerinin bilgiyi sentezleme ve sağlam kararlar alma yeteneğini artırmak.
- Uyarlanabilirlik: Yapay zeka sistemlerinin yeni ortamlar ve değişen koşullara uyum sağlamasına izin vermek.
- Algılama: Yapay zeka sistemlerinin ortamından aldığı verileri tanıma ve yorumlama doğruluğunu iyileştirmek.

### Metabiliş Nedir?

Metabiliş, yani "düşünme üzerine düşünme", kişinin bilişsel süreçlerine dair öz-farkındalık ve öz-düzenlemeyi içeren daha yüksek düzeyde bir bilişsel süreçtir. Yapay zeka alanında, metabiliş ajanların stratejilerini ve eylemlerini değerlendirmesine ve uyarlamasına olanak tanır; bu da problem çözme ve karar verme yeteneklerinin geliştirilmesini sağlar. Metabilişi anlayarak, sadece daha zeki değil, aynı zamanda daha uyarlanabilir ve verimli olan yapay zeka ajanları tasarlayabilirsiniz. Gerçek bir metabilişte, yapay zekanın kendi muhakemesi üzerine açıkça muhakeme yaptığını görürsünüz.

Örnek: "Daha ucuz uçuşları önceliklendirdim çünkü... doğrudan uçuşları kaçırıyor olabilirim, o yüzden tekrar kontrol edeyim."
Belirli bir rotayı neden veya nasıl seçtiğinin takibini yapmak.
- Geçen seferki kullanıcı tercihlerine fazla güvenmeyi hatalı bulup, sadece son öneriyi değil karar verme stratejisini değiştirmek.
- "Kullanıcı 'çok kalabalık' dediğinde, sadece bazı atraksiyonları kaldırmakla kalmayıp, 'en iyi atraksiyonlar' seçme yöntemimin eğer hep popülerliği baz alıyorsa hatalı olduğunu da düşünmek" gibi kalıpları tanımlamak.

### Yapay Zeka Ajanlarında Metabilişin Önemi

Metabiliş, yapay zeka ajan tasarımında şu nedenlerle kritik bir rol oynar:

![Importance of Metacognition](../../../translated_images/tr/importance-of-metacognition.b381afe9aae352f7.webp)

- Öz-Yansıma: Ajanlar kendi performanslarını değerlendirebilir ve geliştirilecek alanları belirleyebilir.
- Uyarlanabilirlik: Ajanlar stratejilerini geçmiş deneyimler ve değişen ortamlar temelinde değiştirebilir.
- Hata Düzeltme: Ajanlar hataları özerk olarak tespit edip düzeltebilir, böylece daha doğru sonuçlar elde eder.
- Kaynak Yönetimi: Ajanlar eylemlerini planlayarak ve değerlendirerek zaman ve hesaplama gücü gibi kaynakları optimize edebilir.

## Bir Yapay Zeka Ajanının Bileşenleri

Metabiliş süreçlerine dalmadan önce, bir yapay zeka ajanının temel bileşenlerini anlamak önemlidir. Bir yapay zeka ajanı genellikle şunlardan oluşur:

- Persona: Ajanın kullanıcılarla nasıl etkileşimde bulunduğunu tanımlayan kişilik ve karakteristik özellikler.
- Araçlar: Ajanın gerçekleştirebileceği yetenekler ve fonksiyonlar.
- Beceriler: Ajanın sahip olduğu bilgi ve uzmanlık.

Bu bileşenler birlikte belirli görevleri gerçekleştirebilen bir "uzmanlık birimi" oluşturmak için çalışır.

**Örnek**:
Sizin tatilinizi planlamakla kalmayıp, gerçek zamanlı veriler ve geçmiş müşteri deneyimlerine dayanarak yolunu ayarlayan bir seyahat acentesini düşünün.

### Örnek: Bir Seyahat Acentesi Hizmetinde Metabiliş

Yapay zeka gücüyle çalışan bir seyahat acentesi hizmeti tasarladığınızı hayal edin. Bu ajan, "Seyahat Acentesi," kullanıcılara tatillerini planlama konusunda yardımcı olur. Metabilişi dahil etmek için Seyahat Acentesi, kendi farkındalığına ve geçmiş deneyimlerine dayanarak eylemlerini değerlendirmeli ve ayarlamalıdır. İşte metabilişin oynayabileceği rol:

#### Mevcut Görev

Şu anki görev, bir kullanıcının Paris seyahati planlamasına yardımcı olmaktır.

#### Görevi Tamamlamak İçin Adımlar

1. **Kullanıcı Tercihlerini Toplama**: Kullanıcının seyahat tarihleri, bütçesi, ilgi alanları (örneğin, müzeler, mutfak, alışveriş) ve özel gereksinimleri hakkında sorular sorun.
2. **Bilgi Toplama**: Kullanıcının tercihleriyle eşleşen uçuş seçenekleri, konaklamalar, gezilecek yerler ve restoranlar arayın.
3. **Öneriler Oluşturma**: Uçuş detayları, otel rezervasyonları ve önerilen aktivitelerle kişiselleştirilmiş bir program sunun.
4. **Geri Bildirime Göre Ayarlama**: Kullanıcıdan öneriler hakkında geri bildirim isteyin ve gerekli düzenlemeleri yapın.

#### Gerekli Kaynaklar

- Uçuş ve otel rezervasyon veritabanlarına erişim.
- Paris'teki gezilecek yerler ve restoranlar hakkında bilgi.
- Önceki etkileşimlerden kullanıcı geri bildirim verileri.

#### Deneyim ve Öz-Yansıma

Seyahat Acentesi, performansını değerlendirmek ve geçmiş deneyimlerden öğrenmek için metabilişi kullanır. Örneğin:

1. **Kullanıcı Geri Bildirimini Analiz Etme**: Seyahat Acentesi, hangi önerilerin iyi karşılandığını, hangilerinin olmadığını belirlemek için kullanıcı geri bildirimlerini inceler. Gelecekteki önerilerini buna göre ayarlar.
2. **Uyarlanabilirlik**: Eğer bir kullanıcı daha önce kalabalık yerleri sevmediğini belirtmişse, Seyahat Acentesi gelecekte popüler turistik yerleri yoğun saatlerde önermekten kaçınır.
3. **Hata Düzeltme**: Seyahat Acentesi geçmişte tam dolu bir oteli önermişse, önerilerde bulunmadan önce uygunluğu daha titiz kontrol etmeyi öğrenir.

#### Pratik Geliştirici Örneği

Seyahat Acentesi kodunda metabilişin dahil edilmesine dair basitleştirilmiş bir örnek aşağıdadır:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Tercihlere göre uçuşlar, oteller ve gezilecek yerler ara
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        # Geri bildirimi analiz et ve gelecekteki önerileri ayarla
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Örnek kullanım
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

#### Neden Metabiliş Önemlidir

- **Öz-Yansıma**: Ajanlar performanslarını analiz edip geliştirme alanlarını belirleyebilir.
- **Uyarlanabilirlik**: Geri bildirimlere ve değişen koşullara göre stratejilerini değiştirebilirler.
- **Hata Düzeltme**: Hataları özerk olarak tespit edip düzeltebilirler.
- **Kaynak Yönetimi**: Zaman ve hesaplama gücü gibi kaynakların kullanımını optimize edebilirler.

Metabilişi dahil ederek Seyahat Acentesi, daha kişiselleştirilmiş ve doğru seyahat önerileri sunabilir, böylece genel kullanıcı deneyimini artırır.

---

## 2. Ajanlarda Planlama

Planlama, yapay zeka ajan davranışının kritik bir bileşenidir. Mevcut durumu, kaynakları ve olası engelleri göz önünde bulundurarak bir hedefe ulaşmak için gerekli adımları belirlemeyi içerir.

### Planlamanın Unsurları

- **Mevcut Görev**: Görevi açıkça tanımlayın.
- **Görevi Tamamlamak İçin Adımlar**: Görevi yönetilebilir adımlara ayırın.
- **Gerekli Kaynaklar**: Gerekli kaynakları belirleyin.
- **Deneyim**: Planlamada geçmiş deneyimleri kullanın.

**Örnek**:
Seyahat Acentesinin bir kullanıcının seyahatini etkili şekilde planlamasına yardımcı olmak için izlemesi gereken adımlar şunlardır:

### Seyahat Acentesinin Adımları

1. **Kullanıcı Tercihlerini Topla**
   - Kullanıcıdan seyahat tarihleri, bütçe, ilgi alanları ve özel gereksinimler hakkında bilgi isteyin.
   - Örnekler: "Ne zaman seyahat etmeyi planlıyorsunuz?" "Bütçe aralığınız nedir?" "Tatilde hangi aktiviteleri seviyorsunuz?"

2. **Bilgi Topla**
   - Kullanıcı tercihleri doğrultusunda uygun seyahat seçeneklerini araştırın.
   - **Uçuşlar**: Kullanıcının bütçesi ve tercih ettiği seyahat tarihleri içinde mevcut uçuşları bulun.
   - **Konaklama**: Konum, fiyat ve olanaklar bakımından kullanıcının tercihine uyan oteller veya kiralık mülkler bulun.
   - **Gezilecek Yerler ve Restoranlar**: Kullanıcının ilgi alanlarına uygun popüler gezilecek yerler, aktiviteler ve yemek seçenekleri belirleyin.

3. **Öneriler Oluştur**
   - Toplanan bilgileri kişiselleştirilmiş bir program haline getirin.
   - Uçuş seçenekleri, otel rezervasyonları ve önerilen aktiviteler gibi detayları, kullanıcının tercihine uygun şekilde sunun.

4. **Programı Kullanıcıya Sun**
   - Önerilen programı kullanıcıya incelemesi için gösterin.
   - Örnek: "Paris seyahatiniz için önerilen program burada. Uçuş detayları, otel rezervasyonları ve önerilen aktiviteler ve restoran listesi var. Görüşlerinizi paylaşır mısınız?"

5. **Geri Bildirim Topla**
   - Kullanıcıdan önerilen program ile ilgili geri bildirim isteyin.
   - Örnekler: "Uçuş seçeneklerini beğendiniz mi?" "Otel ihtiyaçlarınıza uygun mu?" "Eklemek veya çıkarmak istediğiniz aktiviteler var mı?"

6. **Geri Bildirime Göre Ayarla**
   - Kullanıcı geri bildirimine göre programda değişiklikler yapın.
   - Kullanıcının tercihleriyle daha uyumlu olacak şekilde uçuş, konaklama ve aktivite önerilerini değiştirin.

7. **Son Onay**
   - Güncellenen programı kullanıcıya son onay için sunun.
   - Örnek: "Geri bildiriminiz doğrultusunda değişiklikler yaptım. İşte güncellenmiş program. Her şey istediğiniz gibi mi?"

8. **Rezervasyonları Yap ve Onayla**
   - Kullanıcı programı onayladıktan sonra uçuş, konaklama ve önceden planlanan aktiviteleri rezerve edin.
   - Onay bilgilerini kullanıcıya iletin.

9. **Destek Vermeye Devam Et**
   - Seyahat öncesi ve sırasında herhangi bir değişiklik veya ek talep için kullanıcıya destek olmaya devam edin.
   - Örnek: "Seyahatiniz sırasında herhangi bir konuda yardıma ihtiyacınız olursa, bana istediğiniz zaman ulaşabilirsiniz!"

### Örnek Etkileşim

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Bir iptal talebi içindeki örnek kullanım
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

## 3. Düzeltici RAG Sistemi

Öncelikle RAG Aracı ile Önleyici Bağlam Yükleme arasındaki farkı anlayarak başlayalım.

![RAG vs Context Loading](../../../translated_images/tr/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG — Bilgi Çağırarak Üretme)

RAG, bir arama sistemi ile üretici modeli birleştirir. Sorgu yapıldığında, arama sistemi dış bir kaynaktan ilgili belgeleri veya verileri getirir ve bu bilgi üretici modelin girdisini artırmak için kullanılır. Bu, modelin daha doğru ve bağlama uygun yanıtlar üretmesine yardımcı olur.

Bir RAG sisteminde, ajan bilgi tabanından ilgili bilgileri çağırır ve uygun yanıtlar veya eylemler üretmek için kullanır.

### Düzeltici RAG Yaklaşımı

Düzeltici RAG yaklaşımı, hataları düzeltmek ve yapay zeka ajanlarının doğruluğunu artırmak için RAG tekniklerini kullanmaya odaklanır. Bu şu adımları içerir:

1. **İstem Tekniği**: Ajanı ilgili bilgiyi çağırmaya yönlendirecek özel istemler kullanmak.
2. **Araç**: Getirilen bilginin alaka düzeyini değerlendiren ve doğru yanıtlar üreten algoritmalar ve mekanizmalar uygulamak.
3. **Değerlendirme**: Ajanın performansını sürekli izlemek ve doğruluk ve verimliliği artırmak için ayarlamalar yapmak.

#### Örnek: Bir Arama Ajanında Düzeltici RAG

Web’den bilgi çekerek kullanıcı sorgularını yanıtlayan bir arama ajanını düşünün. Düzeltici RAG yaklaşımı şöyle olabilir:

1. **İstem Tekniği**: Kullanıcının girdisine göre arama sorguları oluşturmak.
2. **Araç**: Arama sonuçlarını sıralamak ve filtrelemek için doğal dil işleme ve makine öğrenimi algoritmaları kullanmak.
3. **Değerlendirme**: Kullanıcı geri bildirimi analiz ederek getirilen bilgilerdeki hataları tanımlamak ve düzeltmek.

### Seyahat Acentesinde Düzeltici RAG

Düzeltici RAG (Retrieval-Augmented Generation), bir yapay zekanın bilgiyi çağırma ve üretme yeteneğini geliştirirken hataları da düzeltir. Seyahat Acentesinin, daha doğru ve alakalı seyahat önerileri sunmak için Düzeltici RAG yaklaşımını nasıl kullanabileceğini görelim.

Bu şunları içerir:

- **İstem Tekniği:** Ajanı ilgili bilgiyi çağırmaya yönlendiren özel istemler kullanma.
- **Araç:** Getirilen bilginin alakasını değerlendiren ve doğru yanıtlar üreten algoritmalar ve mekanizmalar uygulama.
- **Değerlendirme:** Ajanın performansını sürekli izleyip doğruluk ve verimliliği artırmak için ayarlamalar yapma.

#### Seyahat Acentesinde Düzeltici RAG Uygulama Adımları

1. **İlk Kullanıcı Etkileşimi**
   - Seyahat Acentesi, destinasyon, seyahat tarihleri, bütçe ve ilgi alanları gibi ilk tercihleri kullanıcıdan toplar.
   - Örnek:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Bilgi Getirme**
   - Seyahat Acentesi, kullanıcı tercihleri temelinde uçuşlar, konaklamalar, gezilecek yerler ve restoranlar hakkında bilgi getirir.
   - Örnek:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **İlk Önerileri Oluşturma**
   - Getirilen bilgileri kullanarak kişiye özel bir program oluşturur.
   - Örnek:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Kullanıcı Geri Bildirimini Toplama**
   - Seyahat Acentesi, ilk öneriler hakkında kullanıcıdan geri bildirim ister.
   - Örnek:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Düzeltici RAG Süreci**
   - **İstem Tekniği**: Seyahat Acentesi, kullanıcı geri bildirimine dayanarak yeni arama sorguları formüle eder.
     - Örnek:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Araç**: Seyahat Acentesi, yeni arama sonuçlarını sıralamak ve filtrelemek için algoritmalar kullanır, kullanıcı geri bildirimine göre alaka düzeyini vurgular.
     - Örnek:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Değerlendirme**: Seyahat Acentesi, önerilerinin alaka düzeyini ve doğruluğunu kullanıcı geri bildirimlerini analiz ederek sürekli değerlendirir ve gerekli ayarlamaları yapar.
     - Örnek:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Pratik Örnek

Düzeltici RAG yaklaşımını Seyahat Acentesinde kapsayan basitleştirilmiş bir Python kod örneği:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)
        new_itinerary = self.generate_recommendations()
        return new_itinerary

# Örnek kullanım
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
new_itinerary = travel_agent.adjust_based_on_feedback(feedback)
print("Updated Itinerary:", new_itinerary)
```

### Önleyici Bağlam Yükleme
Önleyici Bağlam Yükleme, bir sorguyu işlemeye başlamadan önce ilgili bağlam veya arka plan bilgisinin modele yüklenmesini içerir. Bu, modelin bu bilgiye baştan erişimi olduğu anlamına gelir ve süreç sırasında ek veri getirmeye gerek kalmadan daha bilgili yanıtlar oluşturmasına yardımcı olabilir.

Bir seyahat acentesi uygulaması için Python'da önleyici bağlam yüklemenin basitleştirilmiş bir örneği şöyle olabilir:

```python
class TravelAgent:
    def __init__(self):
        # Popüler destinasyonları ve bilgilerini önceden yükle
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Önceden yüklenmiş bağlamdan destinasyon bilgilerini alma
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Örnek kullanım
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Açıklama

1. **Başlatma (`__init__` yöntemi)**: `TravelAgent` sınıfı, Paris, Tokyo, New York ve Sidney gibi popüler destinasyonlar hakkında bilgileri içeren bir sözlüğü önceden yükler. Bu sözlük her destinasyon için ülke, para birimi, dil ve başlıca turistik yerler gibi detayları içerir.

2. **Bilgi Alma (`get_destination_info` yöntemi)**: Kullanıcı belirli bir destinasyon hakkında sorgu yaptığında, `get_destination_info` yöntemi önceden yüklenen bağlam sözlüğünden ilgili bilgileri alır.

Bağlamı önceden yükleyerek, seyahat acentesi uygulaması kullanıcı sorgularına bu bilgiyi gerçek zamanlı dış kaynaktan getirmeye gerek kalmadan hızlıca yanıt verebilir. Bu da uygulamanın daha verimli ve hızlı yanıt vermesini sağlar.

### Tekrarlamadan Önce Bir Hedefle Planı Başlatma

Bir hedefle plan başlatmak, açık bir amaç veya hedef sonuç belirleyerek sürece başlamayı ifade eder. Bu hedef önceden tanımlandığında, model bunu yinelemeli süreç boyunca rehber ilke olarak kullanabilir. Bu da her yinelemenin istenen sonuca daha da yaklaşmasını sağlar ve süreci daha verimli ve odaklı yapar.

Bir seyahat acentesi için Python'da hedefle bir seyahat planını başlatıp ardından yineleme ile geliştirme örneği şöyle:

### Senaryo

Bir seyahat acentesi, bir müşteri için kişiselleştirilmiş bir tatil planlamak istiyor. Amaç, müşterinin tercihleri ve bütçesine göre memnuniyetini en üst düzeye çıkaran bir seyahat programı oluşturmaktır.

### Adımlar

1. Müşterinin tercihlerini ve bütçesini belirle.
2. Bu tercihlere dayanarak ilk planı başlat.
3. Planı yineleyerek müşterinin memnuniyetini optimize et.

#### Python Kodu

```python
class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def bootstrap_plan(self, preferences, budget):
        plan = []
        total_cost = 0

        for destination in self.destinations:
            if total_cost + destination['cost'] <= budget and self.match_preferences(destination, preferences):
                plan.append(destination)
                total_cost += destination['cost']

        return plan

    def match_preferences(self, destination, preferences):
        for key, value in preferences.items():
            if destination.get(key) != value:
                return False
        return True

    def iterate_plan(self, plan, preferences, budget):
        for i in range(len(plan)):
            for destination in self.destinations:
                if destination not in plan and self.match_preferences(destination, preferences) and self.calculate_cost(plan, destination) <= budget:
                    plan[i] = destination
                    break
        return plan

    def calculate_cost(self, plan, new_destination):
        return sum(destination['cost'] for destination in plan) + new_destination['cost']

# Örnek kullanım
destinations = [
    {"name": "Paris", "cost": 1000, "activity": "sightseeing"},
    {"name": "Tokyo", "cost": 1200, "activity": "shopping"},
    {"name": "New York", "cost": 900, "activity": "sightseeing"},
    {"name": "Sydney", "cost": 1100, "activity": "beach"},
]

preferences = {"activity": "sightseeing"}
budget = 2000

travel_agent = TravelAgent(destinations)
initial_plan = travel_agent.bootstrap_plan(preferences, budget)
print("Initial Plan:", initial_plan)

refined_plan = travel_agent.iterate_plan(initial_plan, preferences, budget)
print("Refined Plan:", refined_plan)
```

#### Kod Açıklaması

1. **Başlatma (`__init__` yöntemi)**: `TravelAgent` sınıfı, isim, maliyet ve aktivite türü gibi özelliklere sahip potansiyel destinasyonların bir listesi ile başlatılır.

2. **Planı Başlatma (`bootstrap_plan` yöntemi)**: Bu yöntem, müşterinin tercihleri ve bütçesine dayanarak ilk seyahat planını oluşturur. Destinasyon listesinde dönerek, tercihlerle uyuşan ve bütçeye uygun olanları plana ekler.

3. **Tercih Eşleştirme (`match_preferences` yöntemi)**: Bir destinasyonun müşterinin tercihleriyle uyuşup uyuşmadığını kontrol eder.

4. **Planı Yineleme (`iterate_plan` yöntemi)**: Mevcut planı, müşterinin tercihleri ve bütçe kısıtlamalarını dikkate alarak daha iyi eşleşen destinasyonlarla değiştirmeye çalışarak iyileştirir.

5. **Maliyet Hesaplama (`calculate_cost` yöntemi)**: Mevcut plana potansiyel yeni bir destinasyon dahil edilerek toplam maliyeti hesaplar.

#### Örnek Kullanım

- **İlk Plan**: Seyahat acentesi, müşteri tercihlerine (örneğin, gezilecek yerler ve $2000 bütçe) dayanarak bir ilk plan oluşturur.
- **İyileştirilmiş Plan**: Seyahat acentesi, müşteri tercihleri ve bütçesine göre planı yineleyerek optimize eder.

Planı açık bir hedefle (örn. müşteri memnuniyetini maksimize etmek) başlatıp yineleyerek geliştirmek, seyahat acentesinin müşteriye özel ve optimize edilmiş bir seyahat programı oluşturmasını sağlar. Bu yaklaşım, seyahat planının baştan müşterinin tercihlerine ve bütçesine uyumlu olmasını ve her yineleme ile iyileşmesini garanti eder.

### Yeniden Sıralama ve Puanlama için LLM'den Yararlanma

Büyük Dil Modelleri (LLM'ler), getirilen belgelerin veya oluşturulan yanıtların uygunluğu ve kalitesini değerlendirerek yeniden sıralama ve puanlama için kullanılabilir. İşleyiş şekli şöyledir:

**Getirme:** İlk getirme aşaması, sorguya göre olası aday belgeler veya yanıtlar setini elde eder.

**Yeniden Sıralama:** LLM, bu adayları değerlendirir ve uygunlukları ile kalitelerine bağlı olarak yeniden sıralar. Bu aşama, en alakalı ve yüksek kaliteli bilgilerin önce sunulmasını sağlar.

**Puanlama:** LLM her adaya, uygunluğunu ve kalitesini yansıtan puanlar verir. Bu, kullanıcı için en iyi yanıtın veya belgenin seçilmesine yardımcı olur.

LLM'yi yeniden sıralama ve puanlama için kullanarak, sistem daha doğru ve bağlama uygun bilgi sunabilir, böylece genel kullanıcı deneyimi iyileşir.

Bir seyahat acentesinin, kullanıcının tercihleri doğrultusunda seyahat destinasyonlarını yeniden sıralamak ve puanlamak için Büyük Dil Modeli (LLM) kullandığı Python örneği şöyle:

#### Senaryo - Tercihlere Dayalı Seyahat

Bir seyahat acentesi, bir müşteriye tercihleri doğrultusunda en iyi seyahat destinasyonlarını önerilmek istiyor. LLM, destinasyonları yeniden sıralayıp puanlayarak en uygun seçeneklerin sunulmasını sağlar.

#### Adımlar:

1. Kullanıcı tercihlerini topla.
2. Potansiyel seyahat destinasyonları listesini getir.
3. Kullanıcı tercihlerine göre destinasyonları yeniden sıralamak ve puanlamak için LLM kullan.

Önceki örneği Azure OpenAI Hizmetleri kullanacak şekilde güncelleme:

#### Gereksinimler

1. Bir Azure aboneliğiniz olmalı.
2. Azure OpenAI kaynağı oluşturup API anahtarınızı almalı.

#### Örnek Python Kodu

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Azure OpenAI için bir istem oluşturun
        prompt = self.generate_prompt(preferences)
        
        # İstek için başlıkları ve yükü tanımlayın
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Azure OpenAI API'sini çağırarak yeniden sıralanmış ve puanlanmış destinasyonları alın
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Önerileri çıkarın ve döndürün
        recommendations = response_data['choices'][0]['text'].strip().split('\n')
        return recommendations

    def generate_prompt(self, preferences):
        prompt = "Here are the travel destinations ranked and scored based on the following user preferences:\n"
        for key, value in preferences.items():
            prompt += f"{key}: {value}\n"
        prompt += "\nDestinations:\n"
        for destination in self.destinations:
            prompt += f"- {destination['name']}: {destination['description']}\n"
        return prompt

# Örnek kullanım
destinations = [
    {"name": "Paris", "description": "City of lights, known for its art, fashion, and culture."},
    {"name": "Tokyo", "description": "Vibrant city, famous for its modernity and traditional temples."},
    {"name": "New York", "description": "The city that never sleeps, with iconic landmarks and diverse culture."},
    {"name": "Sydney", "description": "Beautiful harbour city, known for its opera house and stunning beaches."},
]

preferences = {"activity": "sightseeing", "culture": "diverse"}
api_key = 'your_azure_openai_api_key'
endpoint = 'https://your-endpoint.com/openai/deployments/your-deployment-name/completions?api-version=2022-12-01'

travel_agent = TravelAgent(destinations)
recommendations = travel_agent.get_recommendations(preferences, api_key, endpoint)
print("Recommended Destinations:")
for rec in recommendations:
    print(rec)
```

#### Kod Açıklaması - Tercih Kitapçısı

1. **Başlatma**: `TravelAgent` sınıfı, isim ve açıklama gibi özelliklere sahip potansiyel seyahat destinasyonlarından oluşan bir liste ile başlatılır.

2. **Öneri Alma (`get_recommendations` yöntemi)**: Bu yöntem, kullanıcının tercihleri temelinde Azure OpenAI servisi için bir prompt oluşturur ve yeniden sıralanmış ve puanlanmış destinasyonları almak için Azure OpenAI API'sine HTTP POST isteği yapar.

3. **Prompt Oluşturma (`generate_prompt` yöntemi)**: Kullanıcının tercihleri ve destinasyon listesi içeren bir prompt yapar. Prompt, modeli verilen tercihlere göre destinasyonları yeniden sıralamaya ve puanlamaya yönlendirir.

4. **API Çağrısı**: `requests` kütüphanesi kullanılarak Azure OpenAI API uç noktasına HTTP POST isteği yapılır. Gelen yanıt, yeniden sıralanmış ve puanlanmış destinasyonları içerir.

5. **Örnek Kullanım**: Seyahat acentesi, kullanıcı tercihlerini toplar (örneğin, gezilecek yerler ve çeşitli kültürlere ilgi) ve Azure OpenAI servisini kullanarak yeniden sıralanmış ve puanlanmış seyahat önerileri alır.

`your_azure_openai_api_key` kısmını gerçek Azure OpenAI API anahtarınızla, `https://your-endpoint.com/...` kısmını Azure OpenAI dağıtımınızın gerçek uç nokta URL'si ile değiştirmeyi unutmayın.

LLM'yi yeniden sıralama ve puanlama için kullanmak, seyahat acentesinin müşterilere daha kişiselleştirilmiş ve uygun seyahat önerileri sunmasına imkan vererek genel deneyimi artırır.

### RAG: Promptlama Tekniği ve Araç

Retrieval-Augmented Generation (RAG), hem bir promptlama tekniği hem de AI ajanlarının geliştirilmesinde bir araç olabilir. İkisi arasındaki farkı anlamak, RAG'i projelerinizde daha etkili kullanmanıza yardımcı olur.

#### Promptlama Tekniği Olarak RAG

**Nedir?**

- Bir promptlama tekniği olarak, RAG, büyük bir metin koleksiyonundan veya veritabanından ilgili bilgiyi getirmeyi yönlendirmek için özel sorgular veya promptlar oluşturmayı içerir. Bu bilgi daha sonra yanıt ya da işlem üretmek için kullanılır.

**Nasıl çalışır:**

1. **Prompt Oluşturma**: Göreve ya da kullanıcı girdisine göre iyi yapılandırılmış sorgular veya promptlar hazırlanır.
2. **Bilgi Getirme**: Promptlar kullanılarak önceden var olan bilgi tabanından ilgili veriler aranır.
3. **Yanıt Üretme**: Getirilen bilgiler, üretken AI modelleri ile birleştirilip kapsamlı ve tutarlı bir yanıt oluşturulur.

**Seyahat Acentesi Örneği**:

- Kullanıcı Girdisi: "Paris'teki müzeleri ziyaret etmek istiyorum."
- Prompt: "Paris'teki en iyi müzeleri bul."
- Getirilen Bilgi: Louvre Müzesi, Musée d'Orsay vb. hakkında detaylar.
- Üretilen Yanıt: "Paris'teki başlıca müzeler şunlardır: Louvre Müzesi, Musée d'Orsay ve Centre Pompidou."

#### Araç Olarak RAG

**Nedir?**

- Bir araç olarak, RAG, getirip üretme işlemlerini otomatikleştiren entegre bir sistemdir. Geliştiricilerin her sorgu için manuel promptlar oluşturmadan karmaşık AI işlevlerini uygulamasını kolaylaştırır.

**Nasıl çalışır:**

1. **Entegrasyon**: RAG, AI ajanının mimarisine gömülür ve getirip üretme görevlerini otomatik olarak yönetir.
2. **Otomasyon**: Araç, kullanıcı girdisini almaktan nihai yanıtı üretmeye kadar tüm süreci açık promptlar olmadan otomatik yapar.
3. **Verimlilik**: Getirme ve üretme sürecini hızlandırarak daha hızlı ve doğru yanıt üretimini sağlar.

**Seyahat Acentesi Örneği**:

- Kullanıcı Girdisi: "Paris'teki müzeleri ziyaret etmek istiyorum."
- RAG Aracı: Müze bilgilerini otomatik getirip yanıt oluşturur.
- Üretilen Yanıt: "Paris'teki başlıca müzeler şunlardır: Louvre Müzesi, Musée d'Orsay ve Centre Pompidou."

### Karşılaştırma

| Özellik                | Promptlama Tekniği                                        | Araç                                                    |
|------------------------|----------------------------------------------------------|---------------------------------------------------------|
| **Manuel vs Otomatik** | Her sorgu için manuel prompt oluşturma.                  | Getirme ve üretme işlemi otomatik.                       |
| **Kontrol**            | Getirme süreci üzerinde daha fazla kontrol sağlar.      | Getirme ve üretme sürecini otomatikleştirir.            |
| **Esneklik**           | Özel ihtiyaçlara göre uyarlanabilir promptlar sunar.     | Büyük ölçekli uygulamalar için daha verimli.             |
| **Karmaşıklık**        | Prompt hazırlama ve ayar gerektirir.                      | AI ajanı mimarisine kolayca entegre edilir.              |

### Pratik Örnekler

**Promptlama Tekniği Örneği:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Araç Örneği:**

```python
class Travel_Agent:
    def __init__(self):
        self.rag_tool = RAGTool()

    def get_museums_in_paris(self):
        user_input = "I want to visit museums in Paris."
        response = self.rag_tool.retrieve_and_generate(user_input)
        return response

travel_agent = Travel_Agent()
museums = travel_agent.get_museums_in_paris()
print("Top Museums in Paris:", museums)
```

### Alakalı Olmanın Değerlendirilmesi

Alakalı olmanın değerlendirilmesi, AI ajanlarının performansında kritik bir unsurdur. Bu, ajanın getirdiği ve oluşturduğu bilgilerin kullanıcı için uygun, doğru ve faydalı olmasını sağlar. AI ajanlarında alakalı olmanın nasıl değerlendirileceğini, pratik örnekler ve tekniklerle inceleyelim.

#### Alakalı Olmanın Değerlendirilmesinde Anahtar Kavramlar

1. **Bağlam Farkındalığı**:
   - Ajan, kullanıcının sorgusunun bağlamını anlamalı ve ona uygun bilgi getirmeli ve üretmelidir.
   - Örnek: Kullanıcı "Paris'teki en iyi restoranlar" dediğinde, aşçılık türü ve bütçe gibi kullanıcı tercihlerini dikkate almalı.

2. **Doğruluk**:
   - Sağlanan bilgi gerçeklere uygun ve güncel olmalıdır.
   - Örnek: Güncel açık restoranları ve iyi yorumları önerirken, kapanmış ya da eski seçeneklerden kaçınmak.

3. **Kullanıcı Niyeti**:
   - Ajan, kullanıcının sorgusundaki niyeti çıkarabilmelidir.
   - Örnek: "Bütçe dostu oteller" diyen kullanıcı için uygun fiyatlı alternatifleri önceliklendirmek.

4. **Geri Bildirim Döngüsü**:
   - Sürekli kullanıcı geri bildirimi toplayıp analiz ederek değerlendirme sürecini iyileştirmek.
   - Örnek: Önceki önerilere verilen kullanıcı puanlarını ve yorumlarını yeni yanıtların geliştirilmesinde kullanmak.

#### Alakalı Olmanın Değerlendirilmesi için Pratik Teknikler

1. **Uygunluk Puanlaması**:
   - Her getirilen öğeye, kullanıcının sorgusu ve tercihleri ile ne kadar iyi eşleştiğine göre bir uygunluk puanı verilir.
   - Örnek:

     ```python
     def relevance_score(item, query):
         score = 0
         if item['category'] in query['interests']:
             score += 1
         if item['price'] <= query['budget']:
             score += 1
         if item['location'] == query['destination']:
             score += 1
         return score
     ```

2. **Filtreleme ve Sıralama**:
   - İlgisiz öğeler filtrelenir ve kalanlar uygunluk puanlarına göre sıralanır.
   - Örnek:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # En alakalı ilk 10 öğeyi döndür
     ```

3. **Doğal Dil İşleme (NLP)**:
   - Kullanıcının sorgusunu anlamak ve alakalı bilgiyi getirmek için NLP teknikleri kullanılır.
   - Örnek:

     ```python
     def process_query(query):
         # Kullanıcının sorgusundan ana bilgileri çıkarmak için NLP kullanın
         processed_query = nlp(query)
         return processed_query
     ```

4. **Kullanıcı Geri Bildirim Entegrasyonu**:
   - Sunulan önerilerle ilgili kullanıcı geri bildirimleri toplanıp, gelecekteki uygunluk değerlendirmelerini ayarlamak için kullanılır.
   - Örnek:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Örnek: Seyahat Acentesinde Alakalı Olmanın Değerlendirilmesi

Seyahat Acentesi'nin seyahat önerilerinin uygunluğunu nasıl değerlendirebileceğine dair pratik örnek:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        ranked_hotels = self.filter_and_rank(hotels, self.user_preferences)
        itinerary = create_itinerary(flights, ranked_hotels, attractions)
        return itinerary

    def filter_and_rank(self, items, query):
        ranked_items = sorted(items, key=lambda item: self.relevance_score(item, query), reverse=True)
        return ranked_items[:10]  # İlk 10 ilgili öğeyi döndür

    def relevance_score(self, item, query):
        score = 0
        if item['category'] in query['interests']:
            score += 1
        if item['price'] <= query['budget']:
            score += 1
        if item['location'] == query['destination']:
            score += 1
        return score

    def adjust_based_on_feedback(self, feedback, items):
        for item in items:
            if item['name'] in feedback['liked']:
                item['relevance'] += 1
            if item['name'] in feedback['disliked']:
                item['relevance'] -= 1
        return items

# Örnek kullanım
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_items = travel_agent.adjust_based_on_feedback(feedback, itinerary['hotels'])
print("Updated Itinerary with Feedback:", updated_items)
```

### Niyetle Arama

Niyetle arama, kullanıcının sorgusunun altında yatan amaç veya hedefi anlamak ve yorumlayarak en alakalı ve faydalı bilgiyi getirmek ve üretmeyi ifade eder. Bu yaklaşım, anahtar kelime eşleşmesinin ötesine geçip kullanıcının gerçek ihtiyaç ve bağlamını kavrar.

#### Niyetle Aramada Anahtar Kavramlar

1. **Kullanıcı Niyetini Anlama**:
   - Kullanıcı niyeti üç ana kategoriye ayrılabilir: bilgi edinme, gezinme ve işlem yapma.
     - **Bilgi Edinme Niyeti**: Kullanıcı bir konu hakkında bilgi arar (örn. "Paris'teki en iyi müzeler nelerdir?").
     - **Gezinme Niyeti**: Kullanıcı belirli bir web sitesi veya sayfaya gitmek ister (örn. "Louvre Müzesi resmi web sitesi").
     - **İşlem Niyeti**: Kullanıcı işlem yapmayı hedefler, örneğin uçak bileti rezervasyonu veya satın alma (örn. "Parise uçak bileti rezervasyonu").

2. **Bağlam Farkındalığı**:
   - Kullanıcının sorgusunun bağlamını analiz etmek, niyetini doğru belirlemede yardımcı olur. Önceki etkileşimler, kullanıcı tercihleri ve mevcut sorgunun ayrıntıları dikkate alınır.

3. **Doğal Dil İşleme (NLP)**:
   - Kullanıcıların doğal dilde verdiği sorguları anlamak ve yorumlamak için NLP teknikleri kullanılır. Bu, varlık tanıma, duygu analizi ve sorgu ayrıştırma gibi görevleri içerir.

4. **Kişiselleştirme**:
   - Kullanıcının geçmişi, tercihleri ve geri bildirimlerine göre arama sonuçlarının kişiselleştirilmesi, getirilen bilgi ilgiliğini artırır.

#### Pratik Örnek: Seyahat Acentesinde Niyetle Arama

Seyahat Acentesini örnek alarak niyetle aramanın nasıl uygulanacağını görelim.

1. **Kullanıcı Tercihlerini Toplama**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Kullanıcı Niyetini Anlama**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Bağlam Farkındalığı**
   ```python
   def analyze_context(query, user_history):
       # Bağlamı anlamak için mevcut sorguyu kullanıcı geçmişiyle birleştiriniz
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Sonuçları Ara ve Kişiselleştir**

   ```python
   def search_with_intent(query, preferences, user_history):
       intent = identify_intent(query)
       context = analyze_context(query, user_history)
       if intent == "informational":
           search_results = search_information(query, preferences)
       elif intent == "navigational":
           search_results = search_navigation(query)
       elif intent == "transactional":
           search_results = search_transaction(query, preferences)
       personalized_results = personalize_results(search_results, user_history)
       return personalized_results

   def search_information(query, preferences):
       # Bilgilendirici niyet için örnek arama mantığı
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Yönlendirici niyet için örnek arama mantığı
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # İşlemsel niyet için örnek arama mantığı
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Örnek kişiselleştirme mantığı
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # İlk 10 kişiselleştirilmiş sonucu döndürür
   ```

5. **Örnek Kullanım**

   ```python
   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   user_history = ["Louvre Museum website", "Book flight to Paris"]
   query = "best museums in Paris"
   results = search_with_intent(query, preferences, user_history)
   print("Search Results:", results)
   ```

---

## 4. Araç Olarak Kod Üretimi

Kod üreten ajanlar, karmaşık problemleri çözmek ve görevleri otomatikleştirmek için kod yazmak ve çalıştırmak üzere yapay zeka modellerini kullanır.

### Kod Üreten Ajanlar

Kod üreten ajanlar, kod yazmak ve çalıştırmak için üretken yapay zeka modellerini kullanır. Bu ajanlar, çeşitli programlama dillerinde kod üreterek ve çalıştırarak karmaşık problemleri çözebilir, görevleri otomatikleştirebilir ve değerli içgörüler sağlayabilir.

#### Pratik Uygulamalar

1. **Otomatik Kod Üretimi**: Veri analizi, web kazıma veya makine öğrenimi gibi belirli görevler için kod parçacıkları üretmek.
2. **SQL’i RAG Olarak Kullanma**: Veritabanlarından veri almak ve manipüle etmek için SQL sorguları kullanmak.
3. **Problem Çözme**: Algoritmaları optimize etmek veya verileri analiz etmek gibi belirli problemleri çözmek için kod oluşturmak ve çalıştırmak.

#### Örnek: Veri Analizi için Kod Üreten Ajan

Bir kod üreten ajan tasarladığınızı hayal edin. İşte nasıl çalışabileceği:

1. **Görev**: Bir veri setini analiz ederek eğilimleri ve desenleri tespit etmek.
2. **Adımlar**:
   - Veri setini bir veri analizi aracına yükle.
   - Veriyi filtrelemek ve toplamak için SQL sorguları üret.
   - Sorguları çalıştır ve sonuçları al.
   - Sonuçları kullanarak görselleştirmeler ve içgörüler oluştur.
3. **Gerekli Kaynaklar**: Veri setine erişim, veri analizi araçları ve SQL yetenekleri.
4. **Deneyim**: Geçmiş analiz sonuçlarını kullanarak gelecekteki analizlerin doğruluğunu ve alaka düzeyini artır.

### Örnek: Seyahat Acentesi için Kod Üreten Ajan

Bu örnekte, kullanıcılara seyahat planlamalarında yardımcı olmak için kod üreten ve çalıştıran bir ajan olan Seyahat Acentesi’ni tasarlayacağız. Bu ajan, seyahat seçeneklerini getirme, sonuçları filtreleme ve üretken yapay zeka kullanarak bir güzergah derleme gibi görevleri ele alabilir.

#### Kod Üreten Ajanın Genel Görünümü

1. **Kullanıcı Tercihlerini Toplama**: Gidecekleri yer, seyahat tarihleri, bütçe ve ilgi alanları gibi kullanıcı girdilerini toplar.
2. **Veri Getirmek İçin Kod Üretme**: Uçuşlar, oteller ve gezilecek yerler hakkında veri almak için kod parçacıkları oluşturur.
3. **Üretilen Kodu Çalıştırma**: Gerçek zamanlı bilgileri almak için oluşturulan kodu çalıştırır.
4. **Güzergah Üretme**: Alınan verileri kişiselleştirilmiş bir seyahat planına derler.
5. **Geribildirme Üzerinden Ayarlama**: Kullanıcı geribildirimlerini alır ve gerekirse sonuçları iyileştirmek için kodu yeniden üretir.

#### Adım Adım Uygulama

1. **Kullanıcı Tercihlerini Toplama**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Veri Getirmek İçin Kod Üretme**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Örnek: Kullanıcı tercihlerine göre uçuş aramak için kod oluştur
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Örnek: Otel aramak için kod oluştur
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Üretilen Kodu Çalıştırma**

   ```python
   def execute_code(code):
       # Oluşturulan kodu exec ile çalıştırın
       exec(code)
       result = locals()
       return result

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   
   flight_code = generate_code_to_fetch_data(preferences)
   hotel_code = generate_code_to_fetch_hotels(preferences)
   
   flights = execute_code(flight_code)
   hotels = execute_code(hotel_code)

   print("Flight Options:", flights)
   print("Hotel Options:", hotels)
   ```

4. **Güzergah Üretme**

   ```python
   def generate_itinerary(flights, hotels, attractions):
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   attractions = search_attractions(preferences)
   itinerary = generate_itinerary(flights, hotels, attractions)
   print("Suggested Itinerary:", itinerary)
   ```

5. **Geribildirme Üzerinden Ayarlama**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Kullanıcı geri bildirimlerine göre tercihleri ayarla
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Güncellenmiş tercihlerle kodu yeniden oluştur ve çalıştır
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Çevresel farkındalık ve muhakeme kullanımı

Tablonun şemasına dayalı olarak sorgu üretim süreci çevresel farkındalık ve muhakeme kullanılarak geliştirilebilir.

İşte bunun nasıl yapılabileceğine dair bir örnek:

1. **Şemayı Anlamak**: Sistem, tablonun şemasını anlayacak ve bu bilgiyi sorgu üretimini temellendirmek için kullanacak.
2. **Geribildirme Üzerinden Ayarlama**: Sistem, kullanıcı tercihlerini geribildirme ışığında ayarlayacak ve güncellenmesi gereken şema alanları hakkında muhakeme yürütecek.
3. **Sorgu Üretimi ve Çalıştırma**: Sistem, yeni tercihlere dayalı olarak güncellenmiş uçuş ve otel verilerini almak için sorgular oluşturacak ve çalıştıracak.

İşte bu kavramları içeren güncellenmiş bir Python kod örneği:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Kullanıcı geri bildirimlerine göre tercihleri ayarla
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Diğer ilgili tercihleri ayarlamak için şemaya dayalı akıl yürütme
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Şema ve geri bildirimlere göre tercihleri ayarlamak için özel mantık
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Güncellenen tercihlere göre uçuş verilerini almak için kod oluştur
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Güncellenen tercihlere göre otel verilerini almak için kod oluştur
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Kodun yürütülmesini simüle et ve sahte veri döndür
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Uçuşlar, oteller ve turistik yerler bazında gezi planı oluştur
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Örnek şema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Örnek kullanım
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Güncellenen tercihlerle kodu yeniden oluştur ve çalıştır
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Açıklama - Geribildirmeye Dayalı Rezervasyon

1. **Şema Farkındalığı**: `schema` sözlüğü, tercihlerin geribildirme temelinde nasıl ayarlanması gerektiğini tanımlar. İçinde `favorites` ve `avoid` gibi alanlar ve karşılık gelen ayarlamalar vardır.
2. **Tercihleri Ayarlama (`adjust_based_on_feedback` metodu)**: Bu metod, kullanıcı geribildirmesine ve şemaya göre tercihleri ayarlar.
3. **Çevre Bazlı Ayarlamalar (`adjust_based_on_environment` metodu)**: Bu metod, şema ve geribildirmeye dayalı olarak ayarlamaları özelleştirir.
4. **Sorgu Üretimi ve Çalıştırma**: Sistem, ayarlanmış tercihlere dayanarak güncellenmiş uçuş ve otel verilerini almak için kod üretir ve bu sorguların çalıştırılmasını simüle eder.
5. **Güzergah Üretme**: Sistem, yeni uçuş, otel ve gezi verilerine dayalı güncellenmiş bir güzergah oluşturur.

Sistemi çevresel farkındalıklı hale getirip şemaya göre muhakeme yaptırarak daha doğru ve ilgili sorgular üretebilir, böylece daha iyi seyahat önerileri ve daha kişiselleştirilmiş kullanıcı deneyimi sunabilir.

### SQL’in Retrieval-Augmented Generation (RAG) Tekniği Olarak Kullanımı

SQL (Yapılandırılmış Sorgu Dili), veritabanlarıyla etkileşimde kullanılan güçlü bir araçtır. Retrieval-Augmented Generation (RAG) yaklaşımının parçası olarak kullanıldığında, SQL veritabanlarından ilgili verileri alarak yapay zeka ajanlarının yanıtları veya işlemleri oluşturmasına olanak tanır. Seyahat Acentesi bağlamında SQL’in RAG tekniği olarak nasıl kullanılacağına bakalım.

#### Temel Kavramlar

1. **Veritabanı Etkileşimi**:
   - SQL, veritabanlarını sorgulamak, ilgili bilgileri almak ve veriyi manipüle etmek için kullanılır.
   - Örnek: Seyahat veritabanından uçuş detayları, otel bilgileri ve gezilecek yerleri getirmek.

2. **RAG ile Entegrasyon**:
   - SQL sorguları kullanıcı girdisi ve tercihlerine göre oluşturulur.
   - Alınan veriler kişiselleştirilmiş öneriler veya işlemler oluşturmak için kullanılır.

3. **Dinamik Sorgu Üretimi**:
   - Yapay zeka ajanı, bağlama ve kullanıcı ihtiyacına göre dinamik SQL sorguları oluşturur.
   - Örnek: Bütçe, tarihler ve ilgi alanlarına göre sonuçları filtrelemek için SQL sorgularını özelleştirme.

#### Uygulamalar

- **Otomatik Kod Üretimi**: Belirli görevler için kod parçacıkları üretmek.
- **SQL’i RAG Olarak Kullanma**: Veri manipülasyonu için SQL sorguları oluşturmak.
- **Problem Çözme**: Problemleri çözmek için kod oluşturup çalıştırmak.

**Örnek**:
Bir veri analizi ajanı:

1. **Görev**: Eğilimleri bulmak için bir veri setini analiz etmek.
2. **Adımlar**:
   - Veri setini yükle.
   - Veriyi filtrelemek için SQL sorguları oluştur.
   - Sorguları çalıştır ve sonuçları al.
   - Görselleştirmeler ve içgörüler oluştur.
3. **Kaynaklar**: Veri setine erişim, SQL yetenekleri.
4. **Deneyim**: Geçmiş sonuçları kullanarak gelecekteki analizleri iyileştir.

#### Pratik Örnek: Seyahat Acentesinde SQL Kullanımı

1. **Kullanıcı Tercihlerini Toplama**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **SQL Sorguları Üretme**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **SQL Sorgularını Çalıştırma**

   ```python
   import sqlite3

   def execute_sql_query(query, database="travel.db"):
       connection = sqlite3.connect(database)
       cursor = connection.cursor()
       cursor.execute(query)
       results = cursor.fetchall()
       connection.close()
       return results
   ```

4. **Öneriler Üretme**

   ```python
   def generate_recommendations(preferences):
       flight_query = generate_sql_query("flights", preferences)
       hotel_query = generate_sql_query("hotels", preferences)
       attraction_query = generate_sql_query("attractions", preferences)
       
       flights = execute_sql_query(flight_query)
       hotels = execute_sql_query(hotel_query)
       attractions = execute_sql_query(attraction_query)
       
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   itinerary = generate_recommendations(preferences)
   print("Suggested Itinerary:", itinerary)
   ```

#### Örnek SQL Sorguları

1. **Uçuş Sorgusu**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Otel Sorgusu**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Gezilecek Yerler Sorgusu**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Retrieval-Augmented Generation (RAG) tekniğinin bir parçası olarak SQL kullanarak, Seyahat Acentesi gibi yapay zeka ajanları dinamik şekilde ilgili verileri alabilir ve kullanarak doğru ve kişiselleştirilmiş öneriler sunabilir.

### Metabiliş Örneği

Metabiliş uygulamasını göstermek için, bir problemin çözümü sırasında *karar verme süreci üzerine düşünen* basit bir ajan yaratalım. Bu örnekte, bir otel seçimini optimize etmeye çalışan, ancak hatalar veya alt optimal seçimler yaptığında kendi muhakemesini değerlendiren ve stratejisini ayarlayan bir sistem oluşturacağız.

Bu durumu fiyat ve kaliteyi birleştirerek otel seçen basit bir örnekle simüle edeceğiz, ancak ajan kararlarını "düşünüp" buna göre ayarlama yapacak.

#### Bu nasıl metabilişi gösteriyor:

1. **İlk Karar**: Ajan, kalite etkisini anlamadan en ucuz oteli seçer.
2. **Yansıtma ve Değerlendirme**: İlk seçimden sonra, kullanıcı geribildirimi kullanarak otelin "kötü" bir seçim olup olmadığını kontrol eder. Otelin kalitesi çok düşükse, muhakemesinde yeniden düşünür.
3. **Stratejiyi Ayarlama**: Ajan, yansımasına göre stratejisini ayarlar ve seçim kriterini "en ucuz"dan "en yüksek kalite"ye değiştirir; böylece sonraki kararlarında daha iyi kararlar verir.

İşte bir örnek:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Önceden seçilen otelleri depolar
        self.corrected_choices = []  # Düzeltildiği tercihleri depolar
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Mevcut stratejiler

    def recommend_hotel(self, hotels, strategy):
        """
        Recommend a hotel based on the chosen strategy.
        The strategy can either be 'cheapest' or 'highest_quality'.
        """
        if strategy == 'cheapest':
            recommended = min(hotels, key=lambda x: x['price'])
        elif strategy == 'highest_quality':
            recommended = max(hotels, key=lambda x: x['quality'])
        else:
            recommended = None
        self.previous_choices.append((strategy, recommended))
        return recommended

    def reflect_on_choice(self):
        """
        Reflect on the last choice made and decide if the agent should adjust its strategy.
        The agent considers if the previous choice led to a poor outcome.
        """
        if not self.previous_choices:
            return "No choices made yet."

        last_choice_strategy, last_choice = self.previous_choices[-1]
        # Son seçimin iyi olup olmadığını bize söyleyen kullanıcı geri bildirimimiz olduğunu varsayalım
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Önceki seçim tatmin edici değilse stratejiyi ayarla
            new_strategy = 'highest_quality' if last_choice_strategy == 'cheapest' else 'cheapest'
            self.corrected_choices.append((new_strategy, last_choice))
            return f"Reflecting on choice. Adjusting strategy to {new_strategy}."
        else:
            return "The choice was good. No need to adjust."

    def get_user_feedback(self, hotel):
        """
        Simulate user feedback based on hotel attributes.
        For simplicity, assume if the hotel is too cheap, the feedback is "bad".
        If the hotel has quality less than 7, feedback is "bad".
        """
        if hotel['price'] < 100 or hotel['quality'] < 7:
            return "bad"
        return "good"

# Bir otel listesi simüle et (fiyat ve kalite)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Bir ajan oluştur
agent = HotelRecommendationAgent()

# Adım 1: Ajan "en ucuz" stratejisini kullanarak bir otel önerir
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Adım 2: Ajan seçimi değerlendirir ve gerekirse stratejiyi ayarlar
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Adım 3: Ajan tekrar önerir, bu sefer ayarlanmış stratejiyi kullanarak
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Ajanların Metabilgi Yetkinlikleri

Buradaki kritik nokta, ajanın:
- Önceki seçimlerini ve karar verme sürecini değerlendirebilme,
- Bu değerlendirmeye dayanarak stratejisini ayarlama yani aktif metabiliş sergilemesi.

Bu, sistemin iç geribildirime dayanarak muhakeme sürecini ayarlayabildiği basit bir metabiliş formudur.

### Sonuç

Metabiliş, yapay zeka ajanlarının yeteneklerini önemli ölçüde artırabilen güçlü bir araçtır. Metabiliş süreçlerini dahil ederek, daha zeki, uyarlanabilir ve verimli ajanlar tasarlayabilirsiniz. Ek kaynakları kullanarak yapay zeka ajanlarında metabiliş dünyasını daha derin keşfedebilirsiniz.

### Metabiliş Tasarım Deseni Hakkında Daha Fazla Sorunuz mu Var?

Başka öğrenenlerle tanışmak, çalışma saatlerine katılmak ve Yapay Zeka Ajanları ile ilgili sorularınızı sormak için [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord)’a katılın.

## Önceki Ders

[Çoklu Ajan Tasarım Deseni](../08-multi-agent/README.md)

## Sonraki Ders

[Üretimde Yapay Zeka Ajanları](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba göstermemize rağmen, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, kendi ana dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi tavsiye edilir. Bu çevirinin kullanımı sonucunda oluşabilecek yanlış anlamalar veya yorumlamalar nedeniyle sorumluluk kabul edilmemektedir.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->