[![मल्टी-एजंट डिझाइन](../../../translated_images/mr/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(वरील प्रतिमा क्लिक करा आणि या धड्याचा व्हिडिओ पाहा)_
# एआय एजंटमधील मेटाकॉग्निशन

## परिचय

एआय एजंटमधील मेटाकॉग्निशनवर आधारित या धड्यात आपले स्वागत आहे! हा अध्याय नवशिक्यांसाठी डिझाइन करण्यात आला आहे जे जाणून घेऊ इच्छितात की एआय एजंट त्यांच्या स्वतःच्या विचार प्रक्रियेविषयी कसे विचार करू शकतात. या धड्याच्या शेवटी, तुम्हाला मुख्य संकल्पना समजतील आणि मेटाकॉग्निशन एआय एजंट डिझाइनमध्ये लागू करण्यासाठी व्यावहारिक उदाहरणांसह सज्ज व्हाल.

## शिकण्याचे उद्दिष्टे

हा धडा पूर्ण केल्यानंतर, तुम्ही हे करण्यास सक्षम असाल:

1. एजंट परिभाषांमधील विचार प्रक्रियेच्या लूप्सचे परिणाम समजणे.
2. स्व-शुध्दीकरण करणाऱ्या एजंटसाठी नियोजन आणि मूल्यांकन तंत्रांचा वापर करणे.
3. कार्ये पूर्ण करण्यासाठी कोड हाताळण्यास सक्षम तुमचे स्वतःचे एजंट तयार करणे.

## मेटाकॉग्निशनचा परिचय

मेटाकॉग्निशन म्हणजे आपल्या स्वतःच्या विचारांबद्दल विचार करण्यासंबंधी उच्च-स्तरीय संज्ञानात्मक प्रक्रिया. एआय एजंटसाठी याचे अर्थ असा की ते त्यांच्या क्रियांचा आत्मपरिक्षण करू शकतात आणि भूतकाळातील अनुभवांच्या आधारावर त्यांच्या कृती बदलू शकतात. "विचाराबद्दल विचार" हा संकल्पना एजंटिक एआय सिस्टीम विकसित करताना महत्त्वाची आहे. यात एआय सिस्टीम त्यांच्या अंतर्गत प्रक्रियांची जाणीव ठेवू शकतात आणि त्यांच्या वर्तनाचे निरीक्षण, नियमन आणि अनुकूलन करू शकतात. जसे आपण एखादी परिस्थिती वाचतो किंवा एखादी समस्या पाहतो, तसेच हे आत्म-जागरूकता एआय सिस्टीमना चांगले निर्णय घेण्यास, चुका ओळखण्यास आणि कालांतराने त्यांच्या कामगिरी सुधारण्यास मदत करू शकते - पुन्हा ट्यूरिंग चाचणीशी आणि एआय काय थेट नियंत्रित करेल की नाही या वादाशीही संबंध जोडत.

एजंटिक एआय सिस्टीमच्या संदर्भात, मेटाकॉग्निशन अनेक आव्हानांवर उत्तर देऊ शकते, जसे की:
- पारदर्शकता: एआय सिस्टीम त्यांच्या रीझनिंग आणि निर्णयांची स्पष्टीकरण देऊ शकतील याची खात्री करणे.
- विचारकौशल्य (Reasoning): माहितीचा संश्लेषण करणे आणि ठोस निर्णय घेण्याची क्षमता वाढवणे.
- अनुकूलता: नवीन वातावरण आणि बदलत्या परिस्थितींशी जुळवून घेणे.
- संवेदनशीलता (Perception): त्यांच्या पर्यावरणातून मिळालेल्या डेटा ओळखण्याची आणि समजण्याची अचूकता सुधारणे.

### मेटाकॉग्निशन म्हणजे काय?

मेटाकॉग्निशन म्हणजे "विचाराबद्दल विचार"—ही एक उच्च-स्तरीय संज्ञानात्मक प्रक्रिया आहे ज्यात स्वतःच्या संज्ञानात्मक प्रक्रियेची आत्म-जाणीव आणि आत्म-नियमन समाविष्ट असते. एआयच्या क्षेत्रात, मेटाकॉग्निशन एजंटना त्यांच्या धोरणे आणि कृतींचे मूल्यांकन व समायोजन करण्यास सक्षम करते, ज्यामुळे समस्या सोडवण्याची आणि निर्णय घेण्याची क्षमता सुधारते. मेटाकॉग्निशन समजल्यानंतर, तुम्ही असे एआय एजंट डिझाइन करू शकता जे केवळ अधिक बुद्धिमान नसतील तर अधिक अनुकूल आणि कार्यक्षमही असतील. खऱ्या मेटाकॉग्निशनमध्ये, तुम्ही एआयला स्पष्टपणे त्याच्या स्वतःच्या रीझनिंगबद्दल विचार करताना पाहाल.

Example: “मी स्वस्त फ्लाइट्सना प्राधान्य दिले कारण… कदाचित मी थेट फ्लाइट्स गमावत आहे, म्हणून मी पुन्हा तपास करेन.”.
कुठला मार्ग का निवडला यावर लक्ष ठेवणे.
- असे ध्यानात ठेवणे की चुकी केल्या कारण त्यांनी मागील वेळच्या वापरकर्त्याच्या प्राधान्यांवर जास्त अवलंबून होते, त्यामुळे ते केवळ अंतिम शिफारशी नव्हे तर त्यांच्या निर्णय-निर्माण धोरणात बदल करतात.
- नमुने निदान करणे जसे की, “जेव्हा मी वापरकर्त्याला ‘खूप गर्दी’ असे म्हणतानाचे पाहतो, तेव्हा मला केवळ काही आकर्षणे काढून टाकायची नाही तर माझ्या ‘टॉप आकर्षणे’ निवडण्याच्या पद्धतीतही चिंतन करावे लागेल जर मी नेहमी लोकप्रियतेनुसार क्रम देत असलो तर ती पद्धत दोषपूर्ण आहे.”

### एआय एजंटमध्ये मेटाकॉग्निशनचे महत्त्व

![मेटाकॉग्निशनचे महत्त्व](../../../translated_images/mr/importance-of-metacognition.b381afe9aae352f7.webp)

- आत्म-परावर्तन: एजंट त्यांच्या स्वतःच्या कामगिरीचे मूल्यांकन करू शकतात आणि सुधारणा करायची गरज असलेले भाग ओळखू शकतात.
- अनुकूलता: एजंट त्यांच्या पूर्व अनुभवांवर आणि बदलत्या वातावरणावर आधारित त्यांच्या धोरणांमध्ये बदल करू शकतात.
- चूका दुरुस्ती: एजंट स्वयंचलितपणे चुका ओळखू शकतात आणि त्या दुरुस्त करू शकतात, ज्यामुळे अधिक अचूक परिणाम मिळतात.
- संसाधन व्यवस्थापन: एजंट वेळ आणि संगणकीय शक्तीसारख्या संसाधनांचा वापर नियोजन आणि मूल्यांकनाद्वारे ऑप्टिमाइझ करू शकतात.

## एआय एजंटचे घटक

मेटाकॉग्निटिव्ह प्रक्रियेत घाण घालण्यापूर्वी, एआय एजंटचे मूलभूत घटक समजून घेणे आवश्यक आहे. एआय एजंट साधारणपणे यापैकी बनलेला असतो:

- पर्सोना (Persona): एजंटची व्यक्तिमत्व आणि वैशिष्ट्ये, ज्यामुळे ते वापरकर्त्यांसह कसे संवाद साधते हे ठरते.
- साधने (Tools): एजंट जे क्षमता आणि कार्ये पार पाडू शकतो ती.
- कौशल्ये (Skills): एजंट जवळची ज्ञान आणि कौशल्ये.

हे घटक एकत्र काम करतात आणि विशिष्ट कार्ये पार पाडणारी "तज्ञता युनिट" तयार करतात.

**उदाहरण**:
प्रवास एजंटाचा विचार करा, असा एजंट जो केवळ तुमचा सुट्टीचा हा/तो योजना बनवत नाही तर वास्तविक-वेळेतील डेटा आणि मागील ग्राहक प्रवास अनुभवांनुसार त्याचा मार्ग समायोजित करतो.

### उदाहरण: प्रवास एजंट सेवेत मेटाकॉग्निशन

कल्पना करा की तुम्ही एआयने चालवल्या जाणाऱ्या प्रवास एजंट सेवेला डिझाइन करत आहात. हा एजंट, "प्रवास एजंट", वापरकर्त्यांना त्यांच्या सुट्ट्यांच्या नियोजनात मदत करतो. मेटाकॉग्निशन समाविष्ट करण्यासाठी, प्रवास एजंटने स्वतःच्या जाणीव आणि भूतकाळातील अनुभवांच्या आधारावर त्यांच्या क्रियांचे मूल्यांकन आणि समायोजन करणे आवश्यक आहे. मेटाकॉग्निशन कसे भूमिका बजावू शकते हे खाली दिले आहे:

#### सध्याचे काम

सध्याचे काम म्हणजे वापरकर्त्याला पॅरिससाठीचा ट्रिप नियोजन करण्यात मदत करणे.

#### काम पूर्ण करण्यासाठी पावले

1. **वापरकर्ता प्राधान्ये गोळा करा**: वापरकर्त्याच्या प्रवासाच्या तारखा, बजेट, आवडी (उदा., संग्रहालये, खाद्यसंस्कृती, खरेदी), आणि कोणत्याही विशिष्ट गरजा विचाराव्यात.
2. **माहिती मिळवा**: फ्लाइट पर्याय, निवासस्थान, आकर्षणे आणि रेस्टॉरंट्स शोधा जे वापरकर्त्याच्या प्राधान्यांशी जुळतात.
3. **शिफारसी तयार करा**: फ्लाइट तपशील, हॉटेल आरक्षणे आणि सुचवलेल्या क्रियाकलापांसह वैयक्तिकृत प्रवासपत्रिका प्रदान करा.
4. **प्रतिउत्तरावर आधारित समायोजित करा**: शिफारशींबद्दल वापरकर्त्याचे प्रतिउत्तर विचारून आवश्यक बदल करा.

#### आवश्यक संसाधने

- फ्लाइट आणि हॉटेल बुकिंग डेटाबेसमध्ये प्रवेश.
- पॅरिसच्या आकर्षणे आणि रेस्टॉरंट्सवरील माहिती.
- भूतकाळातील संवादातून मिळालेला वापरकर्ता फीडबॅक डेटा.

#### अनुभव आणि आत्म-परिचिंतन

प्रवास एजंट मेटाकॉग्निशनचा वापर करून त्याच्या कामगिरीचे मूल्यांकन करतो आणि भूतकाळातील अनुभवांमधून शिकतो. उदाहरणार्थ:

1. **वापरकर्ता अभिप्रायाचे विश्लेषण**: प्रवास एजंट वापरकर्ता अभिप्रायाचा आढावा घेतो ते ठरवण्यासाठी की कोणत्या शिफारसींना चांगले प्रतिसाद मिळाले आणि कोणत्या शिफारसींना नाही. तो त्याच्या भविष्यातील सुचनेनुसार समायोजित करतो.
2. **अनुकूलता**: जर एखादा वापरकर्ता पूर्वी गर्दीच्या ठिकाणी न आवडल्याचे म्हटले असेल, तर प्रवास एजंट भविष्यात शिखर वेळेत लोकप्रिय पर्यटनस्थळे शिफारस करण्यापासून टाळेल.
3. **चूका दुरुस्ती**: जर प्रवास एजंटने भूतकाळातील आरक्षणात चूक केली असेल (उदा., पूर्ण बुक केलेले हॉटेल सुचवले), तर तो शिफारशी देण्यापूर्वी उपलब्धता अधिक काटेकोरपणे तपासण्यास शिकतो.

#### व्यावहारिक डेव्हलपर उदाहरण

प्रवास एजंटमध्ये मेटाकॉग्निशन समावेश करताना कोड साधारणपणे कसा दिसू शकतो याचे एक सोपे उदाहरण येथे आहे:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # प्राथमिकतांनुसार विमाने, हॉटेल आणि आकर्षणे शोधा
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
        # अभिप्रायांचे विश्लेषण करा आणि भविष्यातील शिफारसी समायोजित करा
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# उदाहरण वापर
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

#### मेटाकॉग्निशन का महत्त्वाचे आहे

- **आत्म-परावर्तन**: एजंट त्यांच्या कामगिरीचे विश्लेषण करू शकतात आणि सुधारणा करायच्या भागांची ओळख करतात.
- **अनुकूलता**: अभिप्राय आणि बदलत्या परिस्थितींनुसार एजंट धोरणे बदलू शकतात.
- **चूका दुरुस्ती**: एजंट स्वयंचलीतपणे चुका ओळखू शकतात आणि दुरुस्त करू शकतात.
- **संसाधन व्यवस्थापन**: एजंट वेळ आणि संगणकीय शक्तीसारख्या संसाधनांचा उपयोग ऑप्टिमाइझ करू शकतात.

मेटाकॉग्निशन समाविष्ट केल्याने, प्रवास एजंट अधिक वैयक्तिकृत आणि अचूक प्रवास शिफारसी देऊ शकतात, ज्यामुळे एकूण वापरकर्ता अनुभव सुधारतो.

---

## 2. एजंटमधील नियोजन

नियोजन हे एआय एजंट वर्तनाचे एक महत्त्वाचे घटक आहे. यात उद्दिष्ट साध्य करण्यासाठी आवश्यक पावले मांडणे, सध्याच्या स्थिती, संसाधने आणि संभाव्य अडथळे विचारात घेणे समाविष्ट आहे.

### नियोजनाचे घटक

- **सध्याचे काम**: काम स्पष्टपणे परिभाषित करा.
- **काम पूर्ण करण्याची पावले**: काम कमी-व्यवस्थापनेयोग्य पावलांमध्ये विभाजित करा.
- **आवश्यक संसाधने**: आवश्यक संसाधने ओळखा.
- **अनुभव**: नियोजनात माहिती देण्यासाठी भूतकाळातील अनुभवांचा वापर करा.

**उदाहरण**:
वापरकर्त्याला त्यांच्या प्रवासाचे प्रभावी नियोजन करण्यासाठी प्रवास एजंटने जे पावले उचलावीत ती येथे आहेत:

### ट्रॅव्हल एजंटसाठी पावले

1. **वापरकर्ता प्राधान्ये गोळा करा**
   - वापरकर्त्याच्या प्रवासाच्या तारखा, बजेट, आवडी आणि कोणत्याही विशिष्ट मागण्यांविषयी तपशील विचारणे.
   - उदाहरणे: "तुम्ही केव्हा प्रवास करण्याचा विचार करत आहात?" "तुमचे बजेट किती आहे?" "तुम्हाला सुट्टीत कोणत्या क्रियाकलापांचा आनंद होतो?"

2. **माहिती मिळवा**
   - वापरकर्त्याच्या प्राधान्यांवर आधारित संबंधित प्रवास पर्याय शोधा.
   - **फ्लाइट्स**: वापरकर्त्याच्या बजेट आणि पसंतीच्या प्रवास तारखांमध्ये उपलब्ध फ्लाइट्स शोधा.
   - **निवास**: स्थान, किंमत आणि सुविधांच्या दृष्टीने वापरकर्त्याच्या प्राधान्यांनुसार हॉटेल किंवा भाड्याचे घर शोधा.
   - **आकर्षणे आणि रेस्टॉरंट्स**: वापरकर्त्याच्या आवडीशी जुळणाऱ्या लोकप्रिय आकर्षणांचे, क्रियाकलापांचे आणि भोजनालयांचे आयडेंटिफाय करा.

3. **शिफारसी तयार करा**
   - मिळालेली माहिती एकत्र करून वैयक्तिकृत प्रवासी आराखडा तयार करा.
   - वापरकर्त्याच्या प्राधान्यांनुसार फ्लाइट ऑप्शन्स, हॉटेल आरक्षणे आणि सुचवलेल्या क्रियाकलापांसह तपशील द्या.

4. **प्रस्तावित आराखडा वापरकर्त्यास सादर करा**
   - प्रस्तावित आराखडा वापरकर्त्याच्या पुनरावलोकनासाठी शेअर करा.
   - उदाहरण: "तुमच्या पॅरिसच्या प्रवासासाठी हे एक सुचवलेले आराखडे आहे. यात फ्लाइट तपशील, हॉटेल बूकिंग आणि सुचवलेली क्रियाकलापे व रेस्टॉरंट्स यांचा समावेश आहे. तुमचे विचार सांगा!"

5. **फीडबॅक गोळा करा**
   - प्रस्तावित आराखड्याबद्दल वापरकर्त्याकडून अभिप्राय मागा.
   - उदाहरणे: "तुम्हाला फ्लाइटचे पर्याय आवडले का?" "हॉटेल तुमच्या गरजांसाठी योग्य आहे का?" "कोणतीही क्रियाकलापे जोडायची किंवा काढायची आहेत का?"

6. **फीडबॅकच्या आधारे समायोजित करा**
   - वापरकर्त्याच्या अभिप्रायानुसार आराखड्यामध्ये बदल करा.
   - फ्लाइट, निवास आणि क्रियाकलापांच्या शिफारशींमध्ये आवश्यक बदल करा जेणेकरून ते वापरकर्त्याच्या प्राधान्याशी अधिक जुळतील.

7. **अंतिम पुष्टी**
   - अद्ययावत आराखडा वापरकर्त्यास अंतिम पुष्टीसाठी सादर करा.
   - उदाहरण: "मी तुमच्या अभिप्रायाच्या आधारे बदल केले आहेत. हे अद्ययावत आराखडे आहे. सर्व काही ठीक आहे का?"

8. **आरक्षणे करा आणि पुष्टी करा**
   - जेव्हा वापरकर्ता आराखड्याला मान्यता देतो, तेव्हा फ्लाइट्स, निवास आणि कोणत्याही आगाऊ नियोजित क्रियाकलापांची बुकिंग करा.
   - वापरकर्त्यास पुष्टी तपशील पाठवा.

9. **सतत मदत पुरवणे**
   - प्रवासाच्या आधी आणि दरम्यान कोणत्याही बदलांसाठी किंवा अतिरिक्त विनंत्यांसाठी वापरकर्त्यास मदत करण्यासाठी उपलब्ध रहा.
   - उदाहरण: "तुम्हाला प्रवासादरम्यान आणखी काही मदतीची गरज पडली तर, कधीही माझ्याशी संपर्क साधा!"

### उदाहरण संवाद

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

# एखाद्या बूइंग विनंतीतील वापराचे उदाहरण
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

## 3. सुधारात्मक RAG प्रणाली

सुरूवातीला, RAG टूल आणि प्री-इम्प्टिव संदर्भ लोड यातील फरक समजून घेऊया

![RAG विरुद्ध संदर्भ लोडिंग](../../../translated_images/mr/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

RAG हे एक पुनर्प्राप्ती प्रणाली आणि जनरेटिव्ह मॉडेल एकत्र करते. जेव्हा एखादा क्वेरी केला जातो, तेव्हा पुनर्प्राप्ती प्रणाली बाह्य स्रोतांमधून संबंधित दस्तऐवज किंवा डेटा आणते, आणि ही मिळालेली माहिती जनरेटिव्ह मॉडेलच्या इनपुटमध्ये वाढवण्यासाठी वापरली जाते. यामुळे मॉडेल अधिक अचूक आणि संदर्भानुकूल उत्तरे निर्माण करू शकते.

RAG प्रणालीमध्ये, एजंट ज्ञानबेसमधून संबंधित माहिती पुनर्प्राप्त करतो आणि त्याचा वापर योग्य उत्तरे किंवा क्रिया तयार करण्यासाठी करतो.

### सुधारात्मक RAG पद्धत

सुधारात्मक RAG पध्दत RAG तंत्रांचा वापर त्रुटी दुरुस्त करण्यासाठी आणि एआय एजंट्सची अचूकता सुधारण्यासाठी करते. यामध्ये यात समाविष्ट आहे:

1. **प्रॉम्प्टिंग तंत्र**: एजंटला संबंधित माहिती शोधण्यात मार्गदर्शन करण्यासाठी विशिष्ट प्रॉम्प्ट्सचा वापर.
2. **साधन (Tool)**: एजंटला पुनर्प्राप्त केलेल्या माहितीची सुसंगतता मूल्यांकन करण्यास आणि अचूक उत्तरे निर्माण करण्यास सक्षम करणारी अल्गोरिदम आणि यंत्रणा.
3. **मूल्यांकन**: एजंटच्या कामगिरीचे सतत मूल्यमापन करून त्याची अचूकता आणि कार्यक्षमता सुधारण्यासाठी समायोजन करणे.

#### उदाहरण: शोध एजंटमधील सुधारात्मक RAG

वेबवरून माहिती घेत असलेल्या शोध एजंटाचा विचार करा ज्याचा वापरकर्ता प्रश्नांची उत्तरे देण्यासाठी केला जातो. सुधारात्मक RAG पध्दतीमध्ये समाविष्ट असू शकते:

1. **प्रॉम्प्टिंग तंत्र**: वापरकर्त्याच्या इनपुटच्या आधारावर शोध क्वेरीज तयार करणे.
2. **साधन**: नॅचरल लँग्वेज प्रोसेसिंग आणि मशीन लर्निंग अल्गोरिदमचा वापर करून शोध परिणामांचे रँकिंग आणि फिल्टर करणे.
3. **मूल्यांकन**: वापरकर्त्याच्या अभिप्रायाचा विश्लेषण करून पुनर्प्राप्त माहितीतील अचूकतेतील चुका ओळखणे आणि दुरुस्त करणे.

### प्रवास एजंटमधील सुधारात्मक RAG

सुधारात्मक RAG (Retrieval-Augmented Generation) एआयच्या माहिती पुनर्प्राप्ती आणि निर्मिती क्षमतेत सुधारणा करते तर त्यातील असलेल्या अचूकतेच्या चुका सुधारणे देखील करते. पाहूया की प्रवास एजंट सुधारात्मक RAG पध्दतीचा वापर करून अधिक अचूक आणि संबंधित प्रवास शिफारसी कशा देऊ शकतो.

यामध्ये समाविष्ट आहे:

- **प्रॉम्प्टिंग तंत्र:** एजंटला संबंधित माहिती शोधण्यात मार्गदर्शन करण्यासाठी विशिष्ट प्रॉम्प्ट्सचा वापर.
- **साधन:** एजंटला पुनर्प्राप्त केलेल्या माहितीची सुसंगतता मूल्यांकन करण्यास आणि अचूक प्रतिसाद निर्माण करण्यास सक्षम करणारी अल्गोरिदम आणि यंत्रणा.
- **मूल्यांकन:** एजंटची कामगिरी सतत मूल्यांकन करणे आणि त्याची अचूकता व कार्यक्षमता सुधारण्यासाठी समायोजन करणे.

#### ट्रॅव्हल एजंटमध्ये सुधारात्मक RAG लागू करण्यासाठी पावले

1. **प्रारंभिक वापरकर्ता संवाद**
   - ट्रॅव्हल एजंट वापरकर्त्याकडून प्रारंभिक प्राधान्ये गोळा करतो, जसे की गंतव्य, प्रवासाच्या तारखा, बजेट आणि आवडी.
   - उदाहरण:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **माहितीचे पुनर्प्राप्ती**
   - ट्रॅव्हल एजंट वापरकर्त्याच्या प्राधान्यांनुसार फ्लाइट्स, निवास, आकर्षणे आणि रेस्टॉरंट्सची माहिती पुनर्प्राप्त करतो.
   - उदाहरण:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **प्रारंभिक शिफारसी तयार करणे**
   - ट्रॅव्हल एजंट मिळालेल्या माहितीचा वापर करून वैयक्तिकृत आराखडा तयार करतो.
   - उदाहरण:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **वापरकर्ता अभिप्राय गोळा करणे**
   - ट्रॅव्हल एजंट प्रारंभिक शिफारशींबद्दल वापरकर्त्याकडून अभिप्राय मागतो.
   - उदाहरण:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **सुधारात्मक RAG प्रक्रिया**
   - **प्रॉम्प्टिंग तंत्र**: वापरकर्त्याच्या अभिप्रायाच्या आधारावर ट्रॅव्हल एजंट नवीन शोध क्वेरी तयार करतो.
     - उदाहरण:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **साधन**: ट्रॅव्हल एजंट नवीन शोध परिणामांचे रँकिंग आणि फिल्टर करण्यासाठी अल्गोरिदम वापरतो, ज्यात वापरकर्त्याच्या अभिप्रायावर आधारित सुसंगततेला प्राधान्य दिले जाते.
     - उदाहरण:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **मूल्यांकन**: ट्रॅव्हल एजंट सतत वापरकर्त्याच्या अभिप्रायाचा आणि शिफारशींच्या अचूकतेचा आढावा घेऊन आवश्यक समायोजने करतो.
     - उदाहरण:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### व्यावहारिक उदाहरण

सुधारात्मक RAG पध्दत ट्रॅव्हल एजंटमध्ये समाविष्ट करणारे एक साधे Python कोड उदाहरण येथे आहे:

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

# उदाहरण वापर
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

### प्री-इम्प्टिव संदर्भ लोड
प्री-एम्प्टिव्ह संदर्भ लोडमध्ये एखाद्या क्वेरीवर प्रक्रिया करण्यापूर्वी मॉडेलमध्ये संबंधित संदर्भ किंवा पार्श्वभूमी माहिती लोड करणे समाविष्ट आहे. याचा अर्थ मॉडेलला सुरुवातीपासूनच या माहितीचा प्रवेश असतो, ज्यामुळे त्याला प्रक्रिये दरम्यान अतिरिक्त डेटा मिळविण्याची गरज न पडता अधिक माहितीपूर्ण प्रतिसाद तयार करण्यात मदत होऊ शकते.

येथे Python मधील ट्रॅव्हल एजंट अनुप्रयोगासाठी प्री-एम्प्टिव्ह संदर्भ लोड कसा दिसू शकतो याचे साधे उदाहरण आहे:

```python
class TravelAgent:
    def __init__(self):
        # लोकप्रिय गंतव्ये आणि त्यांची माहिती पूर्व-लोड करा
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # पूर्व-लोड केलेल्या संदर्भातून गंतव्याची माहिती मिळवा
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# वापराचे उदाहरण
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### स्पष्टीकरण

1. **Initialization (`__init__` method)**: `TravelAgent` वर्ग लोकप्रिय गंतव्यांबद्दल माहिती असलेले एक डिक्शनरी पूर्व-लोड करतो, जसे की पॅरिस, टोकियो, न्यू यॉर्क आणि सिडनी. या डिक्शनरीमध्ये देश, चलन, भाषा आणि प्रत्येक गंतव्याचे मुख्य आकर्षण यांसारख्या तपशीलांचा समावेश आहे.

2. **Retrieving Information (`get_destination_info` method)**: जेव्हा वापरकर्ता एखाद्या विशिष्ट गंतव्याबद्दल विचारतो, तेव्हा `get_destination_info` पद्धत पूर्व-लोड केलेल्या संदर्भ डिक्शनरीमधून संबंधित माहिती आणते.

संदर्भ आधीच लोड केल्याने, ट्रॅव्हल एजंट अनुप्रयोग वापरकर्त्यांच्या क्वेरीजला तातडीने प्रतिसाद देऊ शकतो आणि बाह्य स्त्रोताकडून रिअल-टाइममध्ये माहिती आणण्याची आवश्यकता कमी होते. यामुळे अनुप्रयोग अधिक कार्यक्षम आणि प्रतिसादी होतो.

### उद्दिष्ट ठेऊन पुनरावृत्ती करण्यापूर्वी योजना बूटस्ट्रॅप करणे

एखाद्या उद्दिष्टासह योजना बूटस्ट्रॅप करणे म्हणजे आरंभी स्पष्ट उद्दिष्ट किंवा अपेक्षित निकाल ठेवून सुरू करणे. हे उद्दिष्ट प्रत्येक पुनरावृत्तीदरम्यान मार्गदर्शक तत्त्व म्हणून वापरले जाऊ शकते. यामुळे प्रत्येक पुनरावृत्ती इच्छित परिणामाकडे अधिक जवळ नेण्यास मदत होते, ज्यामुळे प्रक्रिया अधिक कार्यक्षम आणि केंद्रित होते.

खाली एक उदाहरण दिले आहे की आपण ट्रॅव्हल एजंटसाठी उद्दिष्ट सेट करून योजना बूटस्ट्रॅप कशी करू शकता आणि नंतर पुनरावृत्ती करू शकता:

### परिदृश्य

एक ट्रॅव्हल एजंट क्लायंटसाठी सानुकूल सुट्ट्यांचा आराखडा बनवू इच्छितो. उद्दिष्ट म्हणजे क्लायंटच्या प्राधान्ये आणि बजेटच्या आधारावर क्लायंटची समाधानता जास्तीत जास्त करणार्‍या प्रवासाच्या मार्गदर्शिकेची निर्मिती करणे.

### टप्पे

1. क्लायंटची प्राधान्ये आणि बजेट निश्चित करा.
2. या प्राधान्यांच्या आधारावर प्रारंभिक योजना बूटस्ट्रॅप करा.
3. योजना सुधारण्यासाठी पुनरावृत्ती करा, क्लायंटच्या समाधानतेसाठी ऑप्टिमाइझ करा.

#### Python Code

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

# वापराचे उदाहरण
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

#### कोड स्पष्टीकरण

1. **Initialization (`__init__` method)**: `TravelAgent` वर्ग संभाव्य गंतव्यांची यादी घेऊन आरंभ केला जातो, ज्यात प्रत्येक गंतव्याचे नाव, खर्च आणि क्रियाकलाप प्रकार यांसारखे गुणधर्म असतात.

2. **Bootstrapping the Plan (`bootstrap_plan` method)**: ही पद्धत क्लायंटच्या प्राधान्यां आणि बजेटच्या आधारावर प्रारंभिक प्रवास योजना तयार करते. ती गंतव्यांच्या यादीतील प्रत्येक गोष्ट तपासते आणि जर ती क्लायंटच्या प्राधान्यांशी जुळत असेल आणि बजेटमध्ये बसत असेल तर ती योजनामध्ये जोडते.

3. **Matching Preferences (`match_preferences` method)**: ही पद्धत तपासते की एखादे गंतव्य क्लायंटच्या प्राधान्यांशी जुळते का.

4. **Iterating the Plan (`iterate_plan` method)**: ही पद्धत प्रारंभिक योजनेत सुधारणा करते, योजनातील प्रत्येक गंतव्य बदलून क्लायंटच्या प्राधान्ये आणि बजेट मर्यादा विचारात घेऊन चांगला पर्याय शोधते.

5. **Calculating Cost (`calculate_cost` method)**: ही पद्धत चालू योजनाचा एकूण खर्च गणना करते, त्यात संभाव्य नवीन गंतव्याचा खर्चही समाविष्ट आहे.

#### वापराचे उदाहरण

- **Initial Plan**: ट्रॅव्हल एजंट नजरेच्या कार्यक्रमासाठी आणि $2000 च्या बजेटसाठी क्लायंटच्या प्राधान्यांवर आधारित एक प्रारंभिक योजना तयार करतो.
- **Refined Plan**: ट्रॅव्हल एजंट योजना पुनरावृत्ती करून क्लायंटच्या प्राधान्ये आणि बजेटसाठी ऑप्टिमाइझ करतो.

उद्दिष्ट (उदा., क्लायंटचा समाधानता जास्तीत जास्त करणे) स्पष्टपणे सेट करून आणि नंतर योजना सुधारण्यासाठी पुनरावृत्ती करून, ट्रॅव्हल एजंट क्लायंटसाठी सानुकूल आणि ऑप्टिमाइझ्ड प्रवास आराखडा तयार करू शकतो. हा दृष्टिकोण प्रारंभीपासूनच क्लायंटच्या प्राधान्ये आणि बजेटशी योजना सुसंगत ठेऊन प्रत्येक पुनरावृत्तीने ती सुधारतो.

### पुनर्रँकिंग आणि स्कोअरिंगसाठी LLM चा फायदा घेणे

Large Language Models (LLMs) चा वापर पुनर्रँकिंग आणि स्कोअरिंगसाठी करून मिळवलेले दस्तऐवज किंवा तयार केलेले प्रतिसाद यांची प्रासंगिकता आणि गुणवत्ता मूल्यांकन केली जाऊ शकते. हे कसे कार्य करते याचे वर्णन पुढे दिले आहे:

**Retrieval:** प्रारंभिक रिट्रीव्हल टप्प्यात क्वेरीच्या आधारावर उमेदवार दस्तऐवज किंवा प्रतिसादांचा संच मिळविला जातो.

**Re-ranking:** LLM या उमेदवारांचे मूल्यांकन करून त्यांच्या प्रासंगिकता आणि गुणवत्तेच्या आधारावर पुन्हा-रँकिंग करते. हा टप्पा खात्री करतो की सर्वात प्रासंगिक आणि उच्च-गुणवत्तेची माहिती सर्वप्रथम सादर केली जाते.

**Scoring:** LLM प्रत्येक उमेदवाराला त्यांच्या प्रासंगिकता आणि गुणवत्तेचे प्रतिबिंब दर्शवणारे स्कोअर्स देतो. यामुळे वापरकर्त्यासाठी सर्वोत्तम प्रतिसाद किंवा दस्तऐवज निवडणे सोपे होते.

LLMs साठी पुनर्रँकिंग आणि स्कोअरिंगचा वापर करून, सिस्टम अधिक अचूक आणि संदर्भानुकूल माहिती प्रदान करू शकते, ज्यामुळे एकूण वापरकर्ता अनुभव सुधारतो.

खाली एक उदाहरण आहे की कसे एक ट्रॅव्हल एजंट वापरकर्त्याच्या प्राधान्यांनुसार प्रवास गंतव्ये पुनर्रँक आणि स्कोअर करण्यासाठी Large Language Model (LLM) वापरू शकतो (Python मध्ये):

#### परिदृश्य - प्राधान्यांवर आधारित प्रवास

ट्रॅव्हल एजंट क्लायंटच्या प्राधान्यांनुसार सर्वोत्तम प्रवास गंतव्यांची शिफारस करू इच्छितो. वापरकर्त्याच्या प्राधान्यांनुसार गंतव्ये पुनर्रँक आणि स्कोअर करण्यासाठी LLM मदत करेल ज्यामुळे सर्वात संबंधित पर्याय सादर केले जातील.

#### टप्पे:

1. वापरकर्ता प्राधान्ये गोळा करा.
2. संभाव्य प्रवास गंतव्यांची यादी मिळवा.
3. वापरकर्ता प्राधान्यांच्या आधारावर गंतव्ये पुनर्रँक आणि स्कोअर करण्यासाठी LLM चा वापर करा.

Here’s how you can update the previous example to use Azure OpenAI Services:

#### आवश्यकता

1. आपल्याकडे Azure सदस्यता असावी.
2. एक Azure OpenAI रिसोर्स तयार करा आणि आपला API की मिळवा.

#### Example Python Code

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Azure OpenAI साठी प्रॉम्प्ट तयार करा
        prompt = self.generate_prompt(preferences)
        
        # विनंतीसाठी हेडर्स आणि पेलोड परिभाषित करा
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # पुन्हा क्रमवारी लावलेली आणि गुणांकन केलेली गंतव्ये मिळवण्यासाठी Azure OpenAI API कॉल करा
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # शिफारसी काढा आणि परत करा
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

# उदाहरण वापर
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

#### कोड स्पष्टीकरण - प्राधान्य बुककर

1. **Initialization**: `TravelAgent` वर्ग संभाव्य प्रवास गंतव्यांची यादी घेऊन आरंभ केला जातो, ज्यात प्रत्येक गंतव्याचे नाव आणि वर्णन सारखी गुणधर्म असतात.

2. **Getting Recommendations (`get_recommendations` method)**: ही पद्धत वापरकर्त्याच्या प्राधान्यांनुसार Azure OpenAI सेवेसाठी एक प्रॉम्प्ट तयार करते आणि पुनर्रँक केलेली व स्कोअर केलेली गंतव्ये मिळवण्यासाठी Azure OpenAI API ला HTTP POST विनंती करते.

3. **Generating Prompt (`generate_prompt` method)**: ही पद्धत वापरकर्त्याच्या प्राधान्ये आणि गंतव्यांची यादी समाविष्ट करून Azure OpenAI साठी एक प्रॉम्प्ट तयार करते. हा प्रॉम्प्ट मॉडेलला दिलेल्या प्राधान्यांच्या आधारावर गंतव्ये पुनर्रँक आणि स्कोअर करण्यास मार्गदर्शन करतो.

4. **API Call**: `requests` लायब्ररीचा वापर करून Azure OpenAI API एन्डपॉइंटवर HTTP POST विनंती केली जाते. प्रतिसादात पुनर्रँक केलेली आणि स्कोअर केलेली गंतव्ये असतात.

5. **Example Usage**: ट्रॅव्हल एजंट वापरकर्त्याच्या प्राधान्ये (उदा., नजारे पाहण्याची रुची आणि विविध संस्कृतींची आवड) गोळा करतो आणि Azure OpenAI सेवेद्वारे पुनर्रँक आणि स्कोअर केलेल्या शिफारसी मिळवतो.

कृपया `your_azure_openai_api_key` हे आपल्या वास्तविक Azure OpenAI API की ने बदलण्याची आणि `https://your-endpoint.com/...` हे आपल्या Azure OpenAI डिप्लॉयमेंटच्या वास्तविक एन्डपॉइंट URL ने बदलण्याची खात्री करा.

LLM चा पुनर्रँकिंग आणि स्कोअरिंगसाठी वापर करून, ट्रॅव्हल एजंट क्लायंटला अधिक वैयक्तिकृत आणि संबंधित प्रवास शिफारसी प्रदान करू शकतो, ज्यामुळे त्यांच्या एकूण अनुभवात सुधारणा होते.

### RAG: प्रॉम्प्टिंग तंत्र vs साधन

Retrieval-Augmented Generation (RAG) हे AI एजंट्सच्या विकासात एक प्रॉम्प्टिंग तंत्र आणि एक साधन असे दोन्ही असू शकते. या दोहोंमधील फरक समजून घेतल्यास आपल्या प्रकल्पांमध्ये RAG अधिक प्रभावीपणे कसा वापरायचा हे समजते.

#### RAG as a Prompting Technique

**हे काय आहे?**

- प्रॉम्प्टिंग तंत्र म्हणून, RAG मध्ये मोठ्या कॉर्पस किंवा डेटाबेसमधून संबंधित माहिती शोधण्यासाठी विशिष्ट क्वेरीज किंवा प्रॉम्प्ट तयार करणे समाविष्ट आहे. नंतर ही माहिती प्रतिसाद किंवा क्रिया तयार करण्यासाठी वापरली जाते.

**हे कसे काम करते:**

1. **प्रॉम्प्ट तयार करा**: कार्य किंवा वापरकर्त्याच्या इनपुटवर आधारित चांगले रचलेले प्रॉम्प्ट किंवा क्वेरीज तयार करा.
2. **माहिती शोधा**: प्रॉम्प्टचा वापर करून पूर्व-स्थित ज्ञानभांडार किंवा डेटासेटमधून संबंधित डेटा शोधा.
3. **प्रतिक्रिया तयार करा**: पुनर्प्राप्त केलेली माहिती जनरेटिव्ह AI मॉडेल्ससह एकत्र करून एक सुसंगत आणि व्यापक प्रतिसाद तयार करा.

**ट्रॅव्हल एजंटमधील उदाहरण**:

- User Input: "I want to visit museums in Paris."
- Prompt: "Find top museums in Paris."
- Retrieved Information: Louvre Museum, Musée d'Orsay इत्यादींबद्दल तपशील.
- Generated Response: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

#### RAG as a Tool

**हे काय आहे?**

- साधन म्हणून, RAG एक एकात्मिक प्रणाली आहे जी पुनर्प्राप्ती आणि जनरेशन प्रक्रियेचे स्वयंचलितीकरण करते, ज्यामुळे विकसकांना प्रत्येक क्वेरीसाठी मॅन्युअली प्रॉम्प्ट तयार करण्याची गरज न पडता जटिल AI कार्यक्षमता लागू करणे सोपे होते.

**हे कसे काम करते:**

1. **इंटिग्रेशन**: AI एजंटच्या आर्किटेक्चरमध्ये RAG एम्बेड करा, ज्यामुळे ते स्वयंचलितरीत्या पुनर्प्राप्ती आणि जनरेशन कार्य हाताळू शकेल.
2. **स्वयंचलन**: साधन संपूर्ण प्रक्रिया व्यवस्थापित करते, वापरकर्ता इनपुट मिळवण्यापासून ते अंतिम प्रतिसाद तयार होईपर्यंत, प्रत्येक टप्प्यासाठी स्पष्ट प्रॉम्प्ट्सची गरज न पडता.
3. **कार्यक्षमता**: पुनर्प्राप्ती आणि जनरेशन प्रक्रिया सुलभ करून एजंटची कार्यक्षमता वाढवते, ज्यामुळे जलद आणि अधिक अचूक प्रतिसाद मिळतात.

**ट्रॅव्हल एजंटमधील उदाहरण**:

- User Input: "I want to visit museums in Paris."
- RAG Tool: स्वयंचलितपणे संग्रहित माहिती पुनर्प्राप्त करते आणि प्रतिसाद तयार करते.
- Generated Response: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

### Comparison

| पहलू                 | प्रॉम्प्टिंग तंत्र                                        | साधन                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Manual vs Automatic**| प्रत्येक क्वेरीसाठी प्रॉम्प्टचे मॅन्युअल सूत्रीकरण.               | पुनर्प्राप्ती आणि जनरेशनसाठी स्वयंचलित प्रक्रिया.       |
| **Control**            | पुनर्प्राप्ती प्रक्रियेवर अधिक नियंत्रण देते.             | पुनर्प्राप्ती आणि जनरेशन सुलभ व स्वयंचलित करते.|
| **Flexibility**        | विशिष्ट गरजांनुसार कस्टमाइज़्ड प्रॉम्प्ट्सची परवानगी देते.      | मोठ्या प्रमाणावर अंमलबजावणीसाठी अधिक कार्यक्षम.       |
| **Complexity**         | प्रॉम्प्ट तयार करणे आणि ट्यून करणे आवश्यक असते.                  | AI एजंटच्या आर्किटेक्चरमध्ये समाकलित करणे सोपे आहे.       |

### व्यावहारिक उदाहरणे

**Prompting Technique Example:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Tool Example:**

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

### प्रासंगिकता मूल्यांकन

प्रासंगिकता मूल्यांकन हे AI एजंटच्या कामगिरीमध्ये अत्यंत महत्वाचे आहे. हे सुनिश्चित करते की एजंटने पुनर्प्राप्त केलेली आणि तयार केलेली माहिती वापरकर्त्यासाठी योग्य, अचूक आणि उपयुक्त आहे. चला पाहूया की AI एजंटमध्ये प्रासंगिकता कशी मोजायची, यासाठी व्यावहारिक उदाहरणे आणि तंत्रे काय आहेत.

#### प्रासंगिकता मूल्यांकनातील मुख्य संकल्पना

1. **संदर्भ जागरूकता**:
   - एजंटने वापरकर्त्याच्या क्वेरीचा संदर्भ समजून घेणे आवश्यक आहे जेणेकरून संबंधित माहिती शोधता येईल व तयार करता येईल.
   - उदाहरण: जर वापरकर्ता विचारतो "best restaurants in Paris", तर एजंटने वापरकर्त्याच्या प्राधान्ये जसे की स्वयंपाक प्रकार आणि बजेट लक्षात घ्यावे.

2. **अचूकता**:
   - एजंटद्वारे दिलेली माहिती तथ्यात्मकदृष्ट्या बरोबर आणि अद्ययावत असावी.
   - उदाहरण: बंद झालेल्या किंवा जुनी माहिती देण्याऐवजी सध्या खुले आणि चांगल्या रिव्ह्यूज असलेली रेस्टॉरंट्स शिफारस करणे.

3. **वापरकर्त्याचा हेतू**:
   - एजंटने क्वेरीमागील वापरकर्त्याचा हेतू ओळखावा जेणेकरून सर्वात प्रासंगिक माहिती दिली जाईल.
   - उदाहरण: जर वापरकर्ता "budget-friendly hotels" विचारत असेल तर एजंटने स्वस्त पर्यायांना प्राधान्य द्यावे.

4. **फीडबॅक लूप**:
   - सतत वापरकर्त्याचा प्रतिसाद गोळा करणे आणि त्याचे विश्लेषण करणे एजंटला प्रासंगिकता मूल्यांकन प्रक्रिया सुधारण्यात मदत करते.
   - उदाहरण: मागील शिफारसींवर वापरकर्त्याच्या रेटिंग्स आणि फीडबॅकचा समावेश करून भविष्यातील प्रतिसाद सुधार करणे.

#### प्रासंगिकता मूल्यांकनासाठी व्यावहारिक तंत्रे

1. **Relevance Scoring**:
   - प्रत्येक पुनर्प्राप्त आयटमला वापरकर्त्याच्या क्वेरी आणि प्राधान्यांशी किती जुळते यावर आधारभूत प्रासंगिकता स्कोअर द्या.
   - उदाहरण:

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

2. **Filtering and Ranking**:
   - अप्रासंगिक आयटम फिल्टर करा आणि उर्वरितांना त्यांच्या प्रासंगिकता स्कोअरच्या आधारावर रँक करा.
   - उदाहरण:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # वरील 10 संबंधित आयटम परत करा
     ```

3. **Natural Language Processing (NLP)**:
   - वापरकर्त्याच्या क्वेरीला समजून घेण्यासाठी NLP तंत्रांचा वापर करा आणि संबंधित माहिती परत मिळवा.
   - उदाहरण:

     ```python
     def process_query(query):
         # वापरकर्त्याच्या चौकशीतून मुख्य माहिती काढण्यासाठी NLP वापरा
         processed_query = nlp(query)
         return processed_query
     ```

4. **User Feedback Integration**:
   - दिलेल्या शिफारसींवर वापरकर्ता फीडबॅक गोळा करा आणि भविष्यातील प्रासंगिकता मूल्यांकन समायोजित करण्यासाठी त्याचा वापर करा.
   - उदाहरण:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### उदाहरण: ट्रॅव्हल एजंटमध्ये प्रासंगिकता मूल्यांकन

खाली एक व्यावहारिक उदाहरण आहे की ट्रॅव्हल एजंट कसा प्रवास शिफारसींची प्रासंगिकता मूल्यांकन करू शकतो:

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
        return ranked_items[:10]  # टॉप 10 संबंधित आयटम परत करा

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

# उदाहरण वापर
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

### हेतूने शोध

हेतूने शोध म्हणजे वापरकर्त्याच्या क्वेरीमागील अंतर्निहित उद्दिष्ट किंवा लक्ष्य समजून आणि त्याचे تفسير करून सर्वात प्रासंगिक व उपयुक्त माहिती पुनर्प्राप्त करणे व तयार करणे. हा दृष्टिकोन फक्त कीवर्ड मॅचिंगपेक्षा पुढे जातो आणि वापरकर्त्याच्या खऱ्या गरजा व संदर्भ समजून घेण्यावर लक्ष केंद्रित करतो.

#### हेतूने शोधातील मुख्य संकल्पना

1. **वापरकर्त्याचा हेतू समजून घेणे**:
   - वापरकर्त्याचा हेतू साधारणपणे तीन मुख्य प्रकारात वर्गीकृत केला जाऊ शकतो: माहितीपर, नेव्हिगेशनल, आणि व्यवहारात्मक.
     - **माहितीपर हेतू**: वापरकर्ता एखाद्या विषयाबद्दल माहिती शोधत आहे (उदा., "What are the best museums in Paris?").
     - **नेव्हिगेशनल हेतू**: वापरकर्ता एखाद्या विशिष्ट वेबसाइट किंवा पृष्ठावर जाण्याचा उद्देश आहे (उदा., "Louvre Museum official website").
     - **व्यवहारात्मक हेतू**: वापरकर्ता एखादी व्यवहार करायचा उद्देश ठेवतो, जसे फ्लाइट बुक करणे किंवा खरेदी करणे (उदा., "Book a flight to Paris").

2. **संदर्भ जागरूकता**:
   - वापरकर्त्याच्या क्वेरीचा संदर्भ विश्लेषित केल्याने त्यांचा हेतू अचूकपणे ओळखण्यात मदत होते. यात मागील संवाद, वापरकर्त्याच्या प्राधान्ये आणि सध्याच्या क्वेरीचे तपशील यांचा विचार करणे समाविष्ट आहे.

3. **Natural Language Processing (NLP)**:
   - वापरकर्त्यांनी दिलेल्या नैसर्गिक भाषेच्या क्वेरीज समजून घेण्यासाठी NLP तंत्रांचा वापर केला जातो. यात एंटिटी ओळख, सेंटिमेंट अ‍ॅनालिसिस आणि क्वेरी पार्सिंगसारखी कामे येतात.

4. **वैयक्तिकरण**:
   - वापरकर्त्याच्या इतिहास, प्राधान्ये आणि फीडबॅकच्या आधारावर शोध परिणाम वैयक्तिकृत केल्याने पुनर्प्राप्त केलेल्या माहितीची प्रासंगिकता वाढते.

#### व्यावहारिक उदाहरण: ट्रॅव्हल एजंटमधील हेतूने शोध

हेतूने शोध कसा अमलात आणता येईल हे पाहण्यासाठी ट्रॅव्हल एजंटचा उदाहरण घेऊया.

1. **वापरकर्त्याच्या प्राधान्यांची गोळा करणे**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **वापरकर्त्याच्या हेतू समजून घेणे**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **संदर्भ जागरूकता**


   ```python
   def analyze_context(query, user_history):
       # संदर्भ समजण्यासाठी वर्तमान चौकशी वापरकर्त्याच्या इतिहासासोबत एकत्र करा
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **शोधा आणि परिणाम वैयक्तिकृत करा**

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
       # माहितीच्या हेतूसाठी शोध तर्काचे उदाहरण
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # मार्गदर्शी हेतूसाठी शोध तर्काचे उदाहरण
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # व्यवहारात्मक हेतूसाठी शोध तर्काचे उदाहरण
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # वैयक्तिकरण तर्काचे उदाहरण
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # शीर्ष 10 वैयक्तिकृत निकाल परत करा
   ```

5. **उदाहरण वापर**

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

## 4. साधन म्हणून कोड तयार करणे

कोड तयार करणारे एजंट एआय मॉडेल वापरून कोड लिहितात आणि चालवितात, जटिल समस्या सोडवतात आणि कार्ये स्वयंचलित करतात.

### कोड तयार करणारे एजंट

कोड तयार करणारे एजंट जनरेटिव्ह एआय मॉडेल वापरून कोड लिहितात आणि चालवितात. हे एजंट्स विविध प्रोग्रामिंग भाषांमध्ये कोड तयार करून आणि चालवून जटिल समस्या सोडवू शकतात, कार्ये स्वयंचलित करू शकतात, आणि महत्त्वपूर्ण अंतर्दृष्टी प्रदान करू शकतात.

#### व्यावहारिक अनुप्रयोग

1. **स्वयंचलित कोड निर्मिती**: विशिष्ट कार्यांसाठी कोड स्निपेट तयार करा, जसे की डेटा विश्लेषण, वेब स्क्रेपिंग, किंवा मशीन लर्निंग.
2. **RAG म्हणून SQL**: डेटाबेसमधून डेटा शोधण्यासाठी आणि हाताळण्यासाठी SQL प्रश्नांचा वापर करा.
3. **समस्या सोडवणे**: विशिष्ट समस्या सोडवण्यासाठी कोड तयार करा आणि चालवा, जसे अल्गोरिदम ऑप्टिमाइझ करणे किंवा डेटा विश्लेषण करणे.

#### उदाहरण: डेटा विश्लेषणासाठी कोड तयार करणारा एजंट

कल्पना करा आपण एक कोड तयार करणारा एजंट डिझाइन करत आहात. हे कसे काम करू शकते:

1. **कार्य**: प्रवृत्ती आणि नमुने ओळखण्यासाठी डेटासेटचे विश्लेषण करा.
2. **पायऱ्या**:
   - डेटासेट डेटा विश्लेषण साधनात लोड करा.
   - डेटा फिल्टर आणि एकत्रित करण्यासाठी SQL प्रश्न तयार करा.
   - प्रश्न चालवा आणि परिणाम मिळवा.
   - दृश्ये आणि अंतर्दृष्टी तयार करण्यासाठी परिणाम वापरा.
3. **आवश्यक संसाधने**: डेटासेटची प्रवेश, डेटा विश्लेषण साधने, आणि SQL क्षमता.
4. **अनुभव**: भविष्यातील विश्लेषणांची अचूकता आणि सानुकूलितता सुधारण्यासाठी मागील विश्लेषण परिणामांचा वापर करा.

### उदाहरण: प्रवास एजंटसाठी कोड तयार करणारा एजंट

या उदाहरणात, आपण एक कोड तयार करणारा एजंट, "प्रवास एजंट", डिझाइन करणार आहोत जो वापरकर्त्यांना प्रवास नियोजनात मदत करण्यासाठी कोड तयार करेल आणि चालवेल. हा एजंट फ्लाइट्स, हॉटेल्स आणि आकर्षणे शोधणे, निकाल फिल्टर करणे, आणि जनरेटिव्ह एआय वापरून प्रवास आराखडा संकलित करणे यासारखी कार्ये हाताळू शकतो.

#### कोड तयार करणाऱ्या एजंटचे अवलोकन

1. **वापरकर्त्याच्या पसंती गोळा करणे**: गंतव्य, प्रवासाच्या तारखा, बजेट, आणि आवडीसारखे वापरकर्ता इनपुट गोळा करणे.
2. **डेटा मिळवण्यासाठी कोड तयार करणे**: फ्लाइट, हॉटेल, आणि आकर्षणांबद्दल डेटा मिळवण्यासाठी कोड स्निपेट तयार करणे.
3. **तयार केलेला कोड चालवणे**: वास्तविक-वेळ माहिती मिळवण्यासाठी तयार केलेला कोड चालवणे.
4. **इतिनरेरी तयार करणे**: मिळवलेल्या डेटावर आधारित वैयक्तिकृत प्रवास आराखडा संकलित करणे.
5. **अभिप्रायावरून समायोजने करणे**: वापरकर्त्याचा अभिप्राय मिळवून आवश्यक असल्यास कोड पुन्हा तयार करून निकाल सुधारणा करणे.

#### टप्प्याटप्प्याने अंमलबजावणी

1. **वापरकर्त्याच्या पसंती गोळा करणे**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **डेटा मिळवण्यासाठी कोड तयार करणे**

   ```python
   def generate_code_to_fetch_data(preferences):
       # उदाहरण: वापरकर्त्याच्या पसंतीनुसार फ्लाइट शोधण्यासाठी कोड तयार करा
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # उदाहरण: हॉटेल्स शोधण्यासाठी कोड तयार करा
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **तयार केलेला कोड चालवणे**

   ```python
   def execute_code(code):
       # exec वापरून तयार केलेला कोड अंमलात आणा
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

4. **इतिनरेरी तयार करणे**

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

5. **अभिप्रायावरून समायोजने करणे**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # वापरकर्त्याच्या अभिप्रायानुसार प्राधान्ये समायोजित करा
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # अपडेट केलेल्या प्राधान्यांसह कोड पुन्हा तयार करा आणि चालवा
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### पर्यावरणीय जागरूकता आणि तर्कशक्तीचा लाभ घेणे

टेबलच्या स्कीमावर आधारित असणे खरोखरच पर्यावरणीय जागरूकता आणि तर्कशक्तीचा वापर करून क्वेरी जनरेशन प्रक्रियेला सुधारू शकते.

हे कसे करता येईल याचे एक उदाहरणः

1. **स्कीमा समजून घेणे**: प्रणाली टेबलची स्कीमा समजेल आणि या माहितीनुसार क्वेरी जनरेशनला आधार देईल.
2. **अभिप्रायावरून समायोजन करणे**: प्रणाली वापरकर्त्याच्या अभिप्रायानुसार पसंती समायोजित करेल आणि कोणत्या फील्ड्स अद्ययावत कराव्यात याबद्दल तर्क करील.
3. **क्वेरीज निर्माण करणे आणि चालवणे**: प्रणाली समायोजित पसंतींवर आधारित फ्लाइट आणि हॉटेल डेटा मिळवण्यासाठी क्वेरीज तयार करेल आणि चालवेल.

खाली या संकल्पनांचा समावेश करणारे एक अद्ययावत Python कोड उदाहरण दिले आहे:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # वापरकर्त्याच्या अभिप्रायावर आधारित प्राधान्ये समायोजित करा
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # इतर संबंधित प्राधान्ये समायोजित करण्यासाठी स्कीमा-आधारित तर्क
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # स्कीमा आणि अभिप्रायांच्या आधारे प्राधान्ये समायोजित करण्यासाठी सानुकूल लॉजिक
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # अपडेट केलेल्या प्राधान्यांनुसार फ्लाइट डेटा आणण्यासाठी कोड तयार करा
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # अपडेट केलेल्या प्राधान्यांनुसार हॉटेल डेटा आणण्यासाठी कोड तयार करा
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # कोडच्या अंमलबजावणीचे अनुकरण करा आणि नक्कली डेटा परत करा
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # फ्लाइट्स, हॉटेल्स आणि आकर्षणांवर आधारित प्रवास कार्यक्रम तयार करा
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# उदाहरण स्कीमा
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# उदाहरण वापर
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# अपडेट केलेल्या प्राधान्यांसह कोड पुन्हा तयार करा आणि अंमलात आणा
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### स्पष्टीकरण - अभिप्रायावर आधारित बुकिंग

1. **स्कीमा जागरूकता**: `schema` dictionary ठरवते की अभिप्रायावर आधारित पसंती कशा समायोजित केल्या पाहिजेत. यात `favorites` आणि `avoid` सारखी फील्ड्स असतात, ज्यांसाठी संबंधित समायोजने दिली आहेत.
2. **पसंदी समायोजित करणे (`adjust_based_on_feedback` method)**: ही मेथड वापरकर्त्याच्या अभिप्राय आणि `schema` नुसार पसंदीत बदल करते.
3. **पर्यावरणावर आधारित समायोजन (`adjust_based_on_environment` method)**: ही मेथड स्कीमा आणि अभिप्रायावर आधारित समायोजन सानुकूल करते.
4. **क्वेरी तयार करणे आणि चालवणे**: प्रणाली समायोजित पसंतींवरून फ्लाइट आणि हॉटेल डेटा मिळवण्यासाठी क्वेरीज तयार करते आणि या क्वेरीजच्या निष्पादनाची नक्कल करते.
5. **इतिनरेरी तयार करणे**: प्रणाली नवीन फ्लाइट, हॉटेल, आणि आकर्षणे डेटा वापरून अद्ययावत प्रवास आराखडा तयार करते.

सिस्टम पर्यावरणास जागरूक आणि स्कीमा-आधारित तर्कशक्ती वापरण्यास सक्षम असल्यास, ती अधिक अचूक आणि सानुकूल क्वेरीज तयार करू शकते, ज्यामुळे चांगल्या प्रवास शिफारसी आणि वैयक्तिकृत वापरकर्ता अनुभव मिळू शकतो.

### Retrieval-Augmented Generation (RAG) तंत्र म्हणून SQL चा वापर

SQL (Structured Query Language) हा डेटाबेसशी संवाद साधण्यासाठी एक सामर्थ्यवान साधन आहे. जेव्हा तो Retrieval-Augmented Generation (RAG) पध्दतीचा भाग म्हणून वापरला जातो, तेव्हा SQL डेटाबेसमधून संबंधित डेटा परत आणण्यासाठी वापरला जाऊ शकतो जे AI एजंट्समधील प्रतिसाद किंवा क्रिया तयार करण्यास माहिती पुरवते. चला पाहूया प्रवास एजंटच्या संदर्भात RAG तंत्र म्हणून SQL कसा वापरला जाऊ शकतो.

#### मुख्य संकल्पना

1. **डेटाबेस संवाद**:
   - SQL डेटाबेसवर प्रश्न विचारण्यासाठी, संबंधित माहिती मिळवण्यासाठी, आणि डेटा हाताळण्यासाठी वापरला जातो.
   - उदाहरण: प्रवास डेटाबेसमधून फ्लाइट तपशील, हॉटेल माहिती, आणि आकर्षणे मिळवणे.

2. **RAG सोबत एकत्रीकरण**:
   - SQL प्रश्न वापरकर्त्याच्या इनपुट आणि पसंतीनुसार तयार केले जातात.
   - नंतर मिळवलेला डेटा वैयक्तिक शिफारसी किंवा क्रिया तयार करण्यासाठी वापरला जातो.

3. **डायनॅमिक क्वेरी जनरेशन**:
   - AI एजंट संदर्भ आणि वापरकर्त्याच्या गरजेनुसार डायनॅमिक SQL प्रश्न तयार करतो.
   - उदाहरण: बजेट, तारखा, आणि आवडींनुसार परिणाम फिल्टर करण्यासाठी SQL प्रश्न सानुकूल करणे.

#### अनुप्रयोग

- **स्वयंचलित कोड निर्मिती**: विशिष्ट कार्यांसाठी कोड स्निपेट तयार करणे.
- **RAG म्हणून SQL**: डेटाचा वापर करण्यासाठी SQL प्रश्नांचा वापर करणे.
- **समस्या सोडवणे**: समस्यांचे निराकरण करण्यासाठी कोड तयार करणे आणि चालवणे.

उदाहरण:
डेटा विश्लेषण करणारा एजंट:

1. **कार्य**: ट्रेंड शोधण्यासाठी डेटासेटचे विश्लेषण करा.
2. **पायऱ्या**:
   - डेटासेट लोड करा.
   - डेटा फिल्टर करण्यासाठी SQL प्रश्न तयार करा.
   - प्रश्न चालवा आणि परिणाम मिळवा.
   - दृश्ये आणि अंतर्दृष्टी तयार करा.
3. **संसाधने**: डेटासेट प्रवेश, SQL क्षमता.
4. **अनुभव**: भविष्यातील विश्लेषण सुधारण्यासाठी मागील परिणामांचा वापर करा.

#### व्यावहारिक उदाहरण: ट्रॅव्हल एजंटमध्ये SQL चा वापर

1. **वापरकर्त्याच्या पसंती गोळा करणे**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **SQL प्रश्न तयार करणे**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **SQL प्रश्न चालवणे**

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

4. **शिफारसी तयार करणे**

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

#### उदाहरण SQL क्वेरीज

1. **फ्लाइट क्वेरी**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **हॉटेल क्वेरी**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **आकर्षण क्वेरी**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

RAG तंत्राचा भाग म्हणून SQL वापरल्याने, ट्रॅव्हल एजंटसारख्या AI एजंट्सना संबंधित डेटा गतिशीलपणे प्राप्त करून अचूक आणि वैयक्तिकृत शिफारसी देणे शक्य होते.

### मेटाकोग्निशनचे उदाहरण

तर, मेटाकोग्निशनची अंमलबजावणी दाखवण्यासाठी, आपण एक साधा एजंट तयार करूया जो समस्या सोडविताना *त्याच्या निर्णय घेण्याच्या प्रक्रियेवर परावर्तित होतो*. या उदाहरणात, आपण अशी प्रणाली तयार करूयात जिथे एजंट हॉटेल निवड सुधारण्याचा प्रयत्न करतो, परंतु नंतर त्याचे स्वतःचे तर्क मूल्यांकन करून चुकीच्या किंवा उपयुक्त नसलेल्या निवडी आढळल्यास त्याची रणनीती समायोजित करतो.

आम्ही हे एक मूलभूत उदाहरण वापरून अनुकरण करू:

#### हे मेटाकोग्निशन कसे दाखवते:

1. **प्रारंभिक निर्णय**: एजंट सर्वात स्वस्त हॉटेल निवडेल, गुणवत्ता परिणाम समजत न होता.
2. **परावर्तन आणि मूल्यांकन**: प्रारंभिक निवडीनंतर, एजंट वापरकर्त्याच्या अभिप्रायाच्या आधारे तपासेल की हॉटेल ही "वाईट" निवड होती का. जर हॉटेलची गुणवत्ता खूप कमी आढळली तर तो त्याच्या तर्कावर परावर्तित करतो.
3. **रणनीती समायोजित करणे**: एजंट आपल्या परावर्तनावरून रणनीती बदलतो — जसे की "सर्वात स्वस्त" वरून "सर्वात उच्च गुणवत्ता" पर्यंत स्विच करणे — ज्यामुळे भविष्यातील निर्णय सुधारतात.

उदाहरणः

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # पूर्वी निवडलेली हॉटेल्स साठवते
        self.corrected_choices = []  # दुरुस्त केलेल्या निवडी साठवते
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # उपलब्ध धोरणे

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
        # समजा आपल्याकडे असे काही वापरकर्ता अभिप्राय आहेत जे सांगतात की मागील निवड चांगली होती की नाही
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # मागील निवड असंतोषजनक असल्यास धोरण समायोजित करा
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

# हॉटेल्सची यादी अनुकरण करा (किंमत आणि गुणवत्ता)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# एजंट तयार करा
agent = HotelRecommendationAgent()

# पाऊल 1: एजंट "सर्वात स्वस्त" धोरण वापरून हॉटेलची शिफारस करतो
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# पाऊल 2: एजंट निवडीवर विचार करतो आणि आवश्यक असल्यास धोरण समायोजित करतो
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# पाऊल 3: एजंट पुन्हा शिफारस करतो, या वेळी समायोजीत धोरण वापरून
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### एजंटच्या मेटाकोग्निशन क्षमताः

येथे मुख्य गोष्ट म्हणजे एजंटची क्षमता:
- आपल्या मागील निवडी आणि निर्णय प्रक्रिया मूल्यांकन करणे.
- त्या परावर्तनावर आधारित आपली रणनीती समायोजित करणे म्हणजेच, मेटाकोग्निशन प्रत्यक्षात आणणे.

ही मेटाकोग्निशनची एक सोपी रूपरेषा आहे जिथे प्रणाली अंतर्गत अभिप्रायाच्या आधारे आपल्या तर्क प्रक्रियेत बदल करण्यास सक्षम असते.

### निष्कर्ष

मेटाकोग्निशन ही एक शक्तिशाली साधन आहे जी AI एजंट्सच्या क्षमतांमध्ये लक्षणीय वाढ करू शकते. मेटाकोग्निटिव्ह प्रक्रियांचा समावेश करून, तुम्ही अधिक बुद्धिमान, अनुकूल आणि कार्यक्षम एजंट्स डिझाइन करू शकता. AI एजंट्समधील मेटाकोग्निशनच्या आकर्षक जगाची पुढे शोधण्यासाठी अतिरिक्त संसाधनांचा वापर करा.

### मेटाकोग्निशन डिझाइन पॅटर्नबद्दल अधिक प्रश्न आहेत का?

इतर शिकणाऱ्यांशी भेटण्यासाठी, ऑफिस तासांना उपस्थित राहण्यासाठी आणि आपल्या AI एजंट्स संदर्भातील प्रश्नांची उत्तरे मिळवण्यासाठी [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) मध्ये सामील व्हा.

## मागील धडा

[मल्टी-एजंट डिझाइन पॅटर्न](../08-multi-agent/README.md)

## पुढचा धडा

[उत्पादनातील AI एजंट](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
अस्वीकरण:
हा दस्तऐवज AI अनुवाद सेवा Co-op Translator (https://github.com/Azure/co-op-translator) वापरून अनुवादित केला गेला आहे. आम्ही अचूकतेसाठी प्रयत्न करतो, परंतु कृपया लक्षात घ्या की स्वयंचलित अनुवादांमध्ये चुका किंवा अचूकतेच्या त्रुटी असू शकतात. मूळ भाषेतील दस्तऐवजाला अधिकृत स्रोत मानले पाहिजे. महत्त्वाच्या माहितीच्या बाबतीत व्यावसायिक मानवी अनुवाद शिफारस केली जाते. या अनुवादाच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमजुती किंवा चुकीच्या अर्थलागी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->