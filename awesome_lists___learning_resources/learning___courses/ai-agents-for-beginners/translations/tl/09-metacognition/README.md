[![Multi-Agent Design](../../../translated_images/tl/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(I-click ang larawan sa itaas upang panoorin ang video ng araling ito)_
# Metakognisyon sa mga AI Agent

## Panimula

Maligayang pagdating sa aralin tungkol sa metakognisyon sa mga AI agent! Ang kabanatang ito ay idinisenyo para sa mga nagsisimula na mausisa kung paano naiisip ng mga AI agent ang tungkol sa kanilang sariling proseso ng pag-iisip. Sa pagtatapos ng araling ito, mauunawaan mo ang mga pangunahing konsepto at magkakaroon ng mga praktikal na halimbawa upang magamit ang metakognisyon sa disenyo ng AI agent.

## Mga Layunin sa Pagkatuto

Pagkatapos makumpleto ang araling ito, magagawa mong:

1. Maunawaan ang mga implikasyon ng mga reasoning loop sa mga depinisyon ng agent.
2. Gamitin ang mga teknik sa pagpaplano at pagsusuri upang makatulong sa mga self-correcting na agent.
3. Lumikha ng sarili mong mga agent na may kakayahang manipulahin ang code upang maisakatuparan ang mga gawain.

## Panimula sa Metakognisyon

Ang metakognisyon ay tumutukoy sa mga mas mataas na antas ng kognitibong proseso na kinasasangkutan ang pag-iisip tungkol sa sariling pag-iisip. Para sa mga AI agent, nangangahulugan ito ng kakayahang suriin at ayusin ang kanilang mga aksyon batay sa kamalayan sa sarili at mga nakaraang karanasan. Ang metakognisyon, o "pag-iisip tungkol sa pag-iisip," ay isang mahalagang konsepto sa pagbuo ng mga agentic AI system. Kasama rito ang pagkakaroon ng AI system ng kamalayan sa kanilang sariling mga panloob na proseso at kakayahang subaybayan, kontrolin, at ayusin ang kanilang kilos nang naaayon. Kagaya ng ginagawa natin kapag inuukol natin ang atensyon sa kapaligiran o tumitingin sa isang problema. Ang kamalayang ito sa sarili ay maaaring makatulong sa mga AI system na gumawa ng mas mabuting mga desisyon, tuklasin ang mga pagkakamali, at pagbutihin ang kanilang pagganap sa paglipas ng panahon—na muli ay nakalapat sa Turing test at ang debate kung pupperwisyo ba ang AI.

Sa konteksto ng mga agentic AI system, makakatulong ang metakognisyon upang matugunan ang ilang mga hamon, tulad ng:
- Transparency: Pagtitiyak na kayang ipaliwanag ng mga AI system ang kanilang mga pag-iisip at desisyon.
- Reasoning: Pagpapahusay ng kakayahan ng mga AI system na pagsamahin ang impormasyon at gumawa ng tamang mga desisyon.
- Adaptation: Pagbibigay-daan sa mga AI system na umangkop sa mga bagong kapaligiran at nagbabagong kalagayan.
- Perception: Pagbutihin ang kawastuhan ng mga AI system sa pagkilala at interpretasyon ng data mula sa kanilang paligid.

### Ano ang Metakognisyon?

Ang metakognisyon, o "pag-iisip tungkol sa pag-iisip," ay isang mas mataas na antas ng kognitibong proseso na kinasasangkutan ang kamalayan sa sarili at regulasyon ng sariling mga kognitibong proseso. Sa larangan ng AI, pinapalakas ng metakognisyon ang mga agent upang suriin at ayusin ang kanilang mga estratehiya at aksyon, na nagreresulta sa mas mahusay na kakayahan sa paglutas ng problema at paggawa ng desisyon. Sa pag-unawa sa metakognisyon, makakalikha ka ng mga AI agent na hindi lamang mas matalino kundi mas nababago at episyente. Sa tunay na metakognisyon, makikita mo ang AI na hayagang nagre-rason tungkol sa sarili nitong rason.

Halimbawa: "Pinili ko ang mas murang flights dahil… maaaring may namimiss akong direct flights, kaya't susuriin ko muli."
Pagsubaybay kung paano o bakit pinili ang isang tinukoy na ruta.
- Napapansin na nagkamali ito dahil masyado itong umasa sa mga preferensya ng user mula sa huling pagkakataon, kaya binabago nito ang estratehiya sa paggawa ng desisyon, hindi lang ang huling rekomendasyon.
- Nagdi-diagnose ng mga pattern tulad ng, "Kapag naririnig ko ang user na nagsabing 'masyadong masikip,' hindi lang ako aalisin ng ilang atraksyon kundi pag-iisipan ko rin na mali ang aking pamamaraang pagpili ng 'pinakatanyag na atraksyon' kung palagi kong inuuna ayon sa kasikatan."

### Kahalagahan ng Metakognisyon sa mga AI Agent

Mahalagang bahagi ang metakognisyon sa disenyo ng mga AI agent dahil sa mga sumusunod na dahilan:

![Importance of Metacognition](../../../translated_images/tl/importance-of-metacognition.b381afe9aae352f7.webp)

- Pagmuni-muni sa Sarili: Kayang suriin ng mga agent ang kanilang sariling pagganap at tukuyin ang mga bahagi na kailangang pagbutihin.
- Adaptability: Kayang baguhin ng mga agent ang kanilang mga estratehiya batay sa mga nakaraang karanasan at nagbabagong kapaligiran.
- Pagwawasto ng Error: Kayang matuklasan at itama ng mga agent ang mga pagkakamali nang mag-isa, na nagreresulta sa mas tumpak na kinalabasan.
- Pamamahala ng mga Mapagkukunan: Kayang i-optimize ng mga agent ang paggamit ng mga mapagkukunan, tulad ng oras at computational power, sa pamamagitan ng pagpaplano at pagsusuri ng kanilang mga aksyon.

## Mga Komponent ng AI Agent

Bago sumabak sa mga metakognitibong proseso, mahalagang maunawaan ang mga pangunahing sangkap ng AI agent. Karaniwan, ang AI agent ay binubuo ng:

- Persona: Ang personalidad at mga katangian ng agent, na naglalarawan kung paano ito makipag-ugnayan sa mga user.
- Tools: Ang mga kakayahan at function na maaaring gawin ng agent.
- Skills: Ang kaalaman at kasanayan na taglay ng agent.

Ang mga sangkap na ito ay nagtutulungan upang makabuo ng isang "expertise unit" na kayang magsagawa ng partikular na gawain.

**Halimbawa**:
Isipin ang isang travel agent, serbisyong agent na hindi lamang nagplaplano ng iyong bakasyon kundi ina-adjust din ang landas nito base sa real-time na datos at mga nakaraang karanasan ng customer.

### Halimbawa: Metakognisyon sa Serbisyo ng Travel Agent

Isipin na nagdidisenyo ka ng isang travel agent service na pinatatakbo ng AI. Ang agent na ito, "Travel Agent," ay tumutulong sa mga user sa pagpaplano ng kanilang mga bakasyon. Upang isama ang metakognisyon, kailangan ng Travel Agent na suriin at ayusin ang kanilang mga aksyon batay sa kamalayan sa sarili at mga nakaraang karanasan. Ganito maaaring gampanan ng metakognisyon ang papel nito:

#### Kasalukuyang Gawain

Ang kasalukuyang gawain ay tulungan ang isang user na magplano ng biyahe papuntang Paris.

#### Mga Hakbang sa Pagtatapos ng Gawain

1. **Kunin ang mga Preferensya ng User**: Tanungin ang user tungkol sa kanilang mga petsa ng pagbiyahe, budget, interes (hal., museo, pagkain, pamimili), at anumang partikular na pangangailangan.
2. **Kunin ang Impormasyon**: Maghanap ng mga opsyon sa flight, akomodasyon, atraksyon, at mga restawran na tugma sa mga preferensya ng user.
3. **Gumawa ng mga Rekomendasyon**: Magbigay ng personalisadong itinerary na may detalye ng flight, booking sa hotel, at mga mungkahing aktibidad.
4. **Ayusin Base sa Feedback**: Tanungin ang user para sa feedback sa mga rekomendasyon at gawin ang kinakailangang mga pagbabago.

#### Mga Kinakailangang Mapagkukunan

- Access sa flight at hotel booking databases.
- Impormasyon tungkol sa mga atraksyon at restawran sa Paris.
- Datos ng feedback mula sa mga nakaraang pakikipag-ugnayan sa user.

#### Karanasan at Pagmuni-muni sa Sarili

Ginagamit ng Travel Agent ang metakognisyon upang suriin ang kanyang pagganap at matuto sa mga nakaraang karanasan. Halimbawa:

1. **Pagsusuri sa Feedback ng User**: Sinusuri ng Travel Agent ang feedback ng user upang malaman kung aling mga rekomendasyon ang nagustuhan at alin ang hindi. Ina-adjust nito ang mga susunod na mungkahi.
2. **Adaptability**: Kung dati nang nabanggit ng user ang hindi pagkagusto sa mataong lugar, hindi na ire-rekomenda ng Travel Agent ang mga sikat na turistang lugar sa mga oras ng kasagsagan.
3. **Pagwawasto ng Error**: Kung nagkamali ang Travel Agent sa nakaraang booking, tulad ng pag-suggest ng hotel na puno na, natutunan nitong mas maingat na suriin ang availability bago magbigay ng rekomendasyon.

#### Praktikal na Halimbawa para sa Developer

Narito ang isang pinaikling halimbawa ng code para sa Travel Agent na may kasamang metakognisyon:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Maghanap ng mga flight, hotel, at atraksyon batay sa mga kagustuhan
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
        # Suriin ang puna at ayusin ang mga rekomendasyon sa hinaharap
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Halimbawa ng paggamit
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

#### Bakit Mahalaga ang Metakognisyon

- **Pagmuni-muni sa Sarili**: Kayang suriin ng mga agent ang kanilang pagganap at tuklasin ang mga bahagi na kailangang pagbutihin.
- **Adaptability**: Kayang baguhin ng mga agent ang estratehiya batay sa feedback at mga nagbabagong kalagayan.
- **Pagwawasto ng Error**: Kayang awtomatikong matuklasan at itama ng mga agent ang mga pagkakamali.
- **Pamamahala ng Mapagkukunan**: Kayang i-optimize ng mga agent ang paggamit ng mapagkukunan, gaya ng oras at computational power.

Sa pamamagitan ng pagsasama ng metakognisyon, makakapagbigay ang Travel Agent ng mas personalisado at tumpak na mga rekomendasyon sa paglalakbay, na nagpapabuti sa kabuuang karanasan ng user.

---

## 2. Pagpaplano sa mga Agent

Ang pagpaplano ay isang mahalagang bahagi ng pag-uugali ng AI agent. Kasama rito ang paglalahad ng mga hakbang na kailangan upang makamit ang isang layunin, isinasaalang-alang ang kasalukuyang kalagayan, mga mapagkukunan, at posibleng mga hadlang.

### Mga Elemento ng Pagpaplano

- **Kasalukuyang Gawain**: Tukuyin nang malinaw ang gawain.
- **Mga Hakbang sa Pagtatapos ng Gawain**: Hatiin ang gawain sa mga madaling pamahalaang bahagi.
- **Mga Kinakailangang Mapagkukunan**: Tukuyin ang mga kailangang mapagkukunan.
- **Karanasan**: Gamitin ang mga nakaraang karanasan upang gabayan ang pagpaplano.

**Halimbawa**:
Narito ang mga hakbang na kailangang gawin ng Travel Agent upang matagumpay na matulungan ang user sa pagpaplano ng kanilang biyahe:

### Mga Hakbang para sa Travel Agent

1. **Kunin ang Mga Preferensya ng User**
   - Tanungin ang user tungkol sa mga detalye ng kanilang petsa ng pagbiyahe, budget, interes, at anumang partikular na pangangailangan.
   - Mga halimbawa: "Kailan ka balak maglakbay?" "Ano ang iyong budget?" "Anong mga aktibidad ang gusto mo sa bakasyon?"

2. **Kunin ang Impormasyon**
   - Maghanap ng mga kaugnay na opsyon sa paglalakbay batay sa mga preferensya ng user.
   - **Mga Flight**: Maghanap ng mga available na flight na pasok sa budget at mga gustong petsa ng biyahe.
   - **Akomodasyon**: Maghanap ng mga hotel o paupahang property na tugma sa mga preferensya ng user sa lokasyon, presyo, at mga gamit.
   - **Mga Atraksyon at Restawran**: Tukuyin ang mga popular na atraksyon, aktibidad, at lugar-kainan na ayon sa interes ng user.

3. **Gumawa ng mga Rekomendasyon**
   - Tipunin ang nakuhang impormasyon sa isang personalisadong itinerary.
   - Ibigay ang detalye gaya ng mga flight, booking sa hotel, at mga inirerekomendang aktibidad na naaayon sa preferensya ng user.

4. **Ipakita ang Itinerary sa User**
   - Ibahagi ang iminungkahing itinerary sa user para sa kanilang pagsusuri.
   - Halimbawa: "Narito ang isang iminungkahing itinerary para sa iyong biyahe sa Paris. Kasama rito ang detalye ng flight, booking sa hotel, at listahan ng mga inirerekomendang aktibidad at restawran. Sabihin mo lang kung ano ang palagay mo!"

5. **Kunin ang Feedback**
   - Tanungin ang user para sa kanilang komento sa iminungkahing itinerary.
   - Mga halimbawa: "Gusto mo ba ang mga flight options?" "Ayos ba ang hotel sa iyong pangangailangan?" "Mayroon bang gustong idagdag o alisin na aktibidad?"

6. **Ayusin Batay sa Feedback**
   - Baguhin ang itinerary batay sa feedback ng user.
   - Gawin ang mga kinakailangang pagbabago sa rekomendasyon ng flight, akomodasyon, at aktibidad upang mas humusay sa gusto ng user.

7. **Pangwakas na Kumpirmasyon**
   - Ipakita sa user ang binagong itinerary para sa kanilang pangwakas na kumpirmasyon.
   - Halimbawa: "Ginawa ko na ang mga pagbabago batay sa iyong feedback. Narito ang binagong itinerary. Ayos ba sa iyo?"

8. **Mag-book at I-kumpirma ang mga Reserbasyon**
   - Kapag inaprobahan na ng user ang itinerary, ituloy ang pag-book ng mga flight, akomodasyon, at mga aktibidad na nauna nang pinlano.
   - Ipadala ang mga detalye ng kumpirmasyon sa user.

9. **Magbigay ng Patuloy na Suporta**
   - Manatiling handang tumulong sa user sa anumang pagbabago o karagdagang kahilingan bago at habang nasa biyahe sila.
   - Halimbawa: "Kung kailangan mo pa ng tulong habang nasa biyahe, huwag mag-atubiling kontakin ako anumang oras!"

### Halimbawa ng Interaksyon

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

# Halimbawa ng paggamit sa loob ng isang kahilingan sa booing
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

## 3. Corrective RAG System

Una, magsimula tayo sa pag-unawa ng pagkakaiba ng RAG Tool at Pre-emptive Context Load

![RAG vs Context Loading](../../../translated_images/tl/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

Pinagsasama ng RAG ang isang retrieval system at isang generative model. Kapag may query, kinukuha ng retrieval system ang mga kaugnay na dokumento o datos mula sa panlabas na pinagmulan, at ang nakuhang impormasyon ay ginagamit upang palakasin ang input sa generative model. Nakakatulong ito sa modelong makabuo ng mas tumpak at kontekstwal na mga sagot.

Sa isang RAG system, kinukuha ng agent ang mga kaugnay na impormasyon mula sa knowledge base at ginagamit ito upang makabuo ng angkop na mga sagot o aksyon.

### Approach ng Corrective RAG

Nakatuon ang approach ng Corrective RAG sa paggamit ng mga teknik ng RAG upang itama ang mga error at pagbutihin ang katumpakan ng mga AI agent. Kabilang dito ang:

1. **Prompting Technique**: Paggamit ng mga partikular na prompt upang gabayan ang agent sa pagkuha ng kaugnay na impormasyon.
2. **Tool**: Pagpapatupad ng mga algorithm at mekanismo na nagpapahintulot sa agent na suriin ang kaugnayan ng nakuhang impormasyon at makahingi ng tamang mga sagot.
3. **Evaluation**: Patuloy na pagtataya sa pagganap ng agent at paggawa ng mga pagsasaayos upang mapabuti ang katumpakan at kahusayan nito.

#### Halimbawa: Corrective RAG sa isang Search Agent

Isipin ang isang search agent na kumukuha ng impormasyon mula sa web upang sagutin ang mga query ng user. Ang approach ng Corrective RAG ay maaaring magsama ng:

1. **Prompting Technique**: Pagbuo ng mga search query batay sa input ng user.
2. **Tool**: Paggamit ng natural language processing at machine learning algorithms upang i-rank at i-filter ang mga resulta ng paghahanap.
3. **Evaluation**: Pagsusuri ng feedback ng user upang matukoy at itama ang mga maling impormasyon sa mga nakuhang datos.

### Corrective RAG sa Travel Agent

Pinapalakas ng Corrective RAG (Retrieval-Augmented Generation) ang kakayahan ng AI na kumuha at gumawa ng impormasyon habang itinatama ang anumang mga kamalian. Tingnan natin kung paano magagamit ng Travel Agent ang approach na ito upang makapagbigay ng mas tumpak at kaugnay na mga rekomendasyon sa paglalakbay.

Kasama rito ang:

- **Prompting Technique:** Paggamit ng mga partikular na prompt upang gabayan ang agent sa pagkuha ng mga kaugnay na impormasyon.
- **Tool:** Pagpapatupad ng mga algorithm at mekanismo na nagpapahintulot sa agent na suriin ang kahalagahan ng nakuhang impormasyon at makagawa ng tamang mga sagot.
- **Evaluation:** Patuloy na pagtataya sa pagganap ng agent at paggawa ng mga pagsasaayos upang mapabuti ang katumpakan at kahusayan nito.

#### Mga Hakbang sa Pagpapatupad ng Corrective RAG sa Travel Agent

1. **Paunang Interaksyon sa User**
   - Kinukuha ng Travel Agent ang paunang mga preferensya mula sa user, gaya ng destinasyon, mga petsa ng pagbiyahe, budget, at interes.
   - Halimbawa:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Pagkuha ng Impormasyon**
   - Kinukuha ng Travel Agent ang impormasyon tungkol sa mga flight, akomodasyon, atraksyon, at mga restawran batay sa preferensya ng user.
   - Halimbawa:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Paggawa ng Paunang Rekomendasyon**
   - Ginagamit ng Travel Agent ang nakuhang impormasyon upang makabuo ng personalisadong itinerary.
   - Halimbawa:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Pagkuha ng Feedback ng User**
   - Tinanong ng Travel Agent ang user para sa kanilang opinyon sa paunang mga rekomendasyon.
   - Halimbawa:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Proseso ng Corrective RAG**
   - **Prompting Technique**: Gumagawa ang Travel Agent ng bagong mga search query batay sa feedback ng user.
     - Halimbawa:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Tool**: Ginagamit ng Travel Agent ang mga algorithm upang i-rank at i-filter ang mga bagong resulta ng paghahanap, binibigyang-diin ang kaugnayan base sa feedback ng user.
     - Halimbawa:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Evaluation**: Patuloy na sinusuri ng Travel Agent ang kaugnayan at katumpakan ng mga rekomendasyon nito sa pamamagitan ng pag-aanalisa sa feedback ng user at paggawa ng kinakailangang mga pagbabago.
     - Halimbawa:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Praktikal na Halimbawa

Narito ang isang pinaikling halimbawa ng Python code na nagsasama ng Corrective RAG approach sa Travel Agent:

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

# Halimbawa ng paggamit
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

### Pre-emptive Context Load
Ang Pre-emptive Context Load ay nagsasangkot ng pag-load ng kaugnay na konteksto o background na impormasyon sa model bago pa man iproseso ang isang query. Nangangahulugan ito na may access ang model sa impormasyong ito mula sa simula, na makakatulong upang makabuo ito ng mas may kaalamang mga tugon nang hindi na kailangang kumuha pa ng karagdagang data habang nagpapatuloy ang proseso.

Narito ang isang pinasimpleng halimbawa kung paano maaaring magmukhang isang pre-emptive context load para sa isang travel agent application sa Python:

```python
class TravelAgent:
    def __init__(self):
        # I-pre-load ang mga sikat na destinasyon at ang kanilang impormasyon
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Kumuha ng impormasyon ng destinasyon mula sa na-pre-load na konteksto
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Halimbawa ng paggamit
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Paliwanag

1. **Initialization (`__init__` method)**: Ang klase na `TravelAgent` ay nag-pre-load ng isang diksyunaryo na naglalaman ng impormasyon tungkol sa mga sikat na destinasyon gaya ng Paris, Tokyo, New York, at Sydney. Kasama sa diksyunaryong ito ang mga detalye tulad ng bansa, pera, wika, at mga pangunahing atraksyon para sa bawat destinasyon.

2. **Pagkuha ng Impormasyon (`get_destination_info` method)**: Kapag nagtatanong ang user tungkol sa isang partikular na destinasyon, kinukuha ng `get_destination_info` method ang kaugnay na impormasyon mula sa na-pre-load na kontekstong diksyunaryo.

Sa pamamagitan ng pag-pre-load ng konteksto, ang travel agent application ay mabilis na makakasagot sa mga tanong ng user nang hindi na kailangang kumuha ng impormasyon mula sa panlabas na pinagmulan sa real-time. Ginagawa nitong mas epektibo at mabilis ang aplikasyon.

### Pag-bootstrap ng Plano na May Layunin Bago Mag-Iterate

Ang pag-bootstrap ng plano na may layunin ay nagsisimula sa isang malinaw na objective o target na resulta na isinasaisip. Sa pamamagitan ng pagtukoy ng layunin na ito nang maaga, magagamit ito ng model bilang patnubay sa buong iterative na proseso. Nakakatulong ito upang matiyak na bawat pag-ulit ay lumalapit sa pag-abot ng nais na resulta, kaya mas epektibo at naka-focus ang proseso.

Narito ang isang halimbawa kung paano mo maibootstrap ang isang travel plan na may layunin bago mag-iterate para sa isang travel agent sa Python:

### Scenario

Nais ng isang travel agent na magplano ng isang customized na bakasyon para sa isang kliyente. Ang layunin ay gumawa ng travel itinerary na pinakamataas ang kasiyahan ng kliyente base sa kanilang mga kagustuhan at budget.

### Mga Hakbang

1. Tukuyin ang mga kagustuhan at budget ng kliyente.
2. I-bootstrap ang panimulang plano base sa mga kagustuhang ito.
3. Mag-iterate upang pinuhin ang plano, inoooptimize para sa kasiyahan ng kliyente.

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

# Halimbawa ng paggamit
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

#### Paliwanag ng Code

1. **Initialization (`__init__` method)**: Inilulunsad ang klase na `TravelAgent` na may listahan ng mga potensyal na destinasyon, bawat isa ay may mga katangian tulad ng pangalan, gastos, at uri ng aktibidad.

2. **Pag-bootstrap ng Plano (`bootstrap_plan` method)**: Lumilikha ito ng panimulang travel plan batay sa mga kagustuhan ng kliyente at budget. Iniiikot nito ang listahan ng mga destinasyon at idinadagdag sa plano kung tugma ito sa mga kagustuhan ng kliyente at kasya sa budget.

3. **Pagtutugma ng Mga Kagustuhan (`match_preferences` method)**: Sinusuri ng method na ito kung tugma ang destinasyon sa mga kagustuhan ng kliyente.

4. **Pag-iterate ng Plano (`iterate_plan` method)**: Pinipino ng method na ito ang panimulang plano sa pamamagitan ng pagsubok na palitan ang bawat destinasyon sa plano ng mas angkop na tugma, isinasaalang-alang ang kagustuhan ng kliyente at mga limitasyon sa budget.

5. **Pagkalkula ng Gastos (`calculate_cost` method)**: Kinakalkula ng method na ito ang kabuuang gastos ng kasalukuyang plano, kasama na ang posibleng bagong destinasyon.

#### Halimbawa ng Paggamit

- **Unang Plano**: Gumawa ang travel agent ng panimulang plano base sa mga kagustuhan ng kliyente para sa sightseeing at budget na $2000.
- **Pinong Plano**: Inulit-ulit ng travel agent ang plano, ini-optimize para sa mga kagustuhan at budget ng kliyente.

Sa pamamagitan ng pag-bootstrap ng plano na may malinaw na layunin (hal., pag-maximize ng kasiyahan ng kliyente) at pag-iterate upang pinuhin ang plano, makakagawa ang travel agent ng customized at mahusay na travel itinerary para sa kliyente. Tinitiyak ng paraang ito na ang travel plan ay naka-align sa mga kagustuhan at budget ng kliyente mula sa simula at pinapabuti sa bawat pag-ulit.

### Paggamit ng LLM para sa Re-ranking at Scoring

Maaaring gamitin ang Large Language Models (LLMs) para sa re-ranking at scoring sa pamamagitan ng pagsusuri sa kaugnayan at kalidad ng mga nai-retrieve na dokumento o nabuo na mga tugon. Ganito ito gumagana:

**Retrieval:** Kinukuha ng unang hakbang sa retrieval ang isang hanay ng mga kandidato na dokumento o tugon base sa query.

**Re-ranking:** Sinusuri ng LLM ang mga kandidato at muli nitong inaayos ayon sa kaugnayan at kalidad. Sinasigurado ng hakbang na ito na ang pinaka-kaugnay at mataas na kalidad na impormasyon ang mauna.

**Scoring:** Nagbibigay ang LLM ng mga score sa bawat kandidato, na sumasalamin sa kanilang kaugnayan at kalidad. Nakakatulong ito sa pagpili ng pinakamahusay na tugon o dokumento para sa user.

Sa pamamagitan ng paggamit ng LLM para sa re-ranking at scoring, maaaring makapagbigay ang sistema ng mas tumpak at kontekstwal na kaugnay na impormasyon, na nagpapabuti sa kabuuang karanasan ng user.

Narito ang isang halimbawa kung paano maaaring gamitin ng isang travel agent ang Large Language Model (LLM) para sa re-ranking at scoring ng mga travel destination base sa mga kagustuhan ng user sa Python:

#### Scenario - Paglalakbay Batay sa Mga Kagustuhan

Nais ng travel agent na irekomenda ang pinakamahusay na travel destinations sa isang kliyente base sa kanilang mga kagustuhan. Tutulungan ng LLM na muli ayusin at bigyan ng score ang mga destinasyon upang matiyak na ang pinaka-kaugnay na mga opsyon ang ipapakita.

#### Mga Hakbang:

1. Kolektahin ang mga kagustuhan ng user.
2. Kunin ang listahan ng mga potensyal na travel destinations.
3. Gamitin ang LLM para i-re-rank at bigyan ng score ang mga destinasyon base sa mga kagustuhan ng user.

Narito kung paano mo maaaring i-update ang naunang halimbawa para gamitin ang Azure OpenAI Services:

#### Mga Kinakailangan

1. Kailangan mong magkaroon ng Azure subscription.
2. Gumawa ng Azure OpenAI resource at makuha ang iyong API key.

#### Halimbawa ng Python Code

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Bumuo ng prompt para sa Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Tukuyin ang mga headers at payload para sa kahilingan
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Tawagan ang Azure OpenAI API upang makuha ang muling inayos at naiskoring mga destinasyon
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Kunin at ibalik ang mga rekomendasyon
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

# Halimbawa ng paggamit
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

#### Paliwanag ng Code - Preference Booker

1. **Initialization**: Ang `TravelAgent` class ay inilunsad na may listahan ng mga potensyal na travel destinations, bawat isa ay may mga attribute tulad ng pangalan at deskripsyon.

2. **Pagkuha ng mga Rekomendasyon (`get_recommendations` method)**: Bumubuo ang method na ito ng prompt para sa Azure OpenAI service batay sa mga kagustuhan ng user at gumagawa ng HTTP POST request sa Azure OpenAI API upang makuha ang mga re-rank at scored na destinasyon.

3. **Pagbuo ng Prompt (`generate_prompt` method)**: Ino-construct ng method na ito ang prompt para sa Azure OpenAI, kasama ang mga kagustuhan ng user at ang listahan ng mga destinasyon. Ginagabay ng prompt ang modelo na i-re-rank at bigyan ng score ang mga destinasyon base sa mga ibinigay na kagustuhan.

4. **API Call**: Ginagamit ang `requests` library upang gumawa ng HTTP POST request sa Azure OpenAI API endpoint. Ang tugon ay naglalaman ng mga re-rank at scored na destinasyon.

5. **Halimbawa ng Paggamit**: Kinokolekta ng travel agent ang mga kagustuhan ng user (hal., interes sa sightseeing at magkakaibang kultura) at ginagamit ang Azure OpenAI service para makakuha ng re-rank at scored na mga rekomendasyon ng travel destinations.

Siguraduhing palitan ang `your_azure_openai_api_key` ng aktwal mong Azure OpenAI API key at ang `https://your-endpoint.com/...` ng aktwal na endpoint URL ng iyong Azure OpenAI deployment.

Sa pamamagitan ng paggamit ng LLM para sa re-ranking at scoring, makakapagbigay ang travel agent ng mas personalized at kaugnay na travel recommendations sa mga kliyente, na nagpapahusay sa kanilang pangkalahatang karanasan.

### RAG: Prompting Technique vs Tool

Ang Retrieval-Augmented Generation (RAG) ay maaaring maging isang prompting technique at isang tool sa pagbuo ng AI agents. Ang pag-unawa sa pagkakaiba ng dalawa ay makakatulong sa iyo na mas epektibong magamit ang RAG sa iyong mga proyekto.

#### RAG bilang Prompting Technique

**Ano ito?**

- Bilang prompting technique, ang RAG ay nagsasangkot ng pagbuo ng tiyak na mga query o prompt upang gabayan ang retrieval ng kaugnay na impormasyon mula sa malaking corpus o database. Ginagamit ang impormasyong ito upang gumawa ng mga tugon o aksyon.

**Paano ito gumagana:**

1. **Pagbuo ng Prompts**: Gumawa ng maayos na mga prompt o query batay sa gawain o input ng user.
2. **Pagkuhang Impormasyon**: Gamitin ang mga prompt upang maghanap ng kaugnay na data mula sa umiiral na knowledge base o dataset.
3. **Pag-generate ng Tugon**: Pagsamahin ang nakuha na impormasyon sa mga generative AI models upang makabuo ng kumpleto at magkaugnay na tugon.

**Halimbawa sa Travel Agent**:

- Input ng User: "Gusto kong bumisita sa mga museo sa Paris."
- Prompt: "Hanapin ang mga nangungunang museo sa Paris."
- Nakuha na Impormasyon: Mga detalye tungkol sa Louvre Museum, Musée d'Orsay, atbp.
- Generated Response: "Narito ang ilang nangungunang museo sa Paris: Louvre Museum, Musée d'Orsay, at Centre Pompidou."

#### RAG bilang Tool

**Ano ito?**

- Bilang tool, ang RAG ay isang integrated system na nag-a-automate ng retrieval at generation na proseso, na nagpapadali para sa mga developer na ipatupad ang kumplikadong AI functionalities nang hindi mano-mano na gumagawa ng mga prompt para sa bawat query.

**Paano ito gumagana:**

1. **Integration**: Isama ang RAG sa architecture ng AI agent, na nagpapahintulot dito na awtomatikong hawakan ang retrieval at generation na mga gawain.
2. **Automation**: Pinangangasiwaan ng tool ang buong proseso, mula pagtanggap ng input ng user hanggang sa pagbuo ng panghuling tugon, nang hindi nangangailangan ng tumpak na prompts sa bawat hakbang.
3. **Efficiente**: Pinapaganda ang performance ng agent sa pamamagitan ng pagpapa-streamline ng retrieval at generation process, na nagpapabilis at nagpapatumpak ng mga tugon.

**Halimbawa sa Travel Agent**:

- Input ng User: "Gusto kong bumisita sa mga museo sa Paris."
- RAG Tool: Awtomatikong kinukuha ang impormasyon tungkol sa mga museo at bumubuo ng tugon.
- Generated Response: "Narito ang ilang nangungunang museo sa Paris: Louvre Museum, Musée d'Orsay, at Centre Pompidou."

### Paghahambing

| Aspeto                 | Prompting Technique                                        | Tool                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Mano-mano vs Awtomatik**| Mano-mano na pagbuo ng mga prompt para sa bawat query.       | Awtomatikong proseso para sa retrieval at generation.  |
| **Kontrol**            | Nagbibigay ng higit na kontrol sa retrieval process.       | Pinapasimple at ina-automate ang retrieval at generation.|
| **Flexibility**        | Pinapayagan ang customized na mga prompt base sa espesipikong pangangailangan. | Mas epektibo para sa malawakang implementasyon.  |
| **Kompleksidad**       | Nangangailangan ng paggawa at pagtweaking ng mga prompt.   | Mas madaling isama sa architecture ng AI agent.        |

### Praktikal na Mga Halimbawa

**Halimbawa ng Prompting Technique:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Halimbawa ng Tool:**

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

### Pagsusuri ng Kaugnayan

Ang pagsusuri ng kaugnayan ay isang mahalagang aspeto ng performance ng AI agent. Tinitiyak nito na ang impormasyong nakuha at nabuo ng agent ay angkop, tama, at kapaki-pakinabang sa user. Tingnan natin kung paano suriin ang kaugnayan sa AI agents kabilang ang mga praktikal na halimbawa at teknik.

#### Mga Pangunahing Konsepto sa Pagsusuri ng Kaugnayan

1. **Pagka-mulat sa Konteksto**:
   - Dapat maintindihan ng agent ang konteksto ng query ng user upang makakuha at makabuo ng kaugnay na impormasyon.
   - Halimbawa: Kung nagtatanong ang user tungkol sa "pinakamagagandang restaurant sa Paris," dapat isaalang-alang ng agent ang mga kagustuhan ng user, tulad ng uri ng pagkain at budget.

2. **Katumpakan**:
   - Dapat ang impormasyong ibinibigay ng agent ay tama at napapanahon.
   - Halimbawa: Magrekomenda lamang ng mga restaurant na bukas kasalukuyan at may magagandang review, hindi yung mga sarado o luma na.

3. **Intensyon ng User**:
   - Dapat mahulaan ng agent ang intensyon ng user sa likod ng query upang makapagbigay ng pinaka-kaugnay na impormasyon.
   - Halimbawa: Kapag nagtanong ang user tungkol sa "mga budget-friendly na hotel," dapat unahin ng agent ang mga abot-kayang opsyon.

4. **Feedback Loop**:
   - Ang tuloy-tuloy na pangangalap at pagsusuri ng feedback ng user ay tumutulong sa agent na pahusayin ang proseso ng pagsusuri ng kaugnayan.
   - Halimbawa: Isama ang mga rating at feedback ng user tungkol sa mga naunang rekomendasyon para mapabuti ang mga susunod na tugon.

#### Mga Praktikal na Teknik para sa Pagsusuri ng Kaugnayan

1. **Pagbibigay ng Relevance Score**:
   - Bigyan ng score ang bawat nakuha item base sa kung gaano ito kahusay tumugma sa query at kagustuhan ng user.
   - Halimbawa:

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

2. **Pag-filter at Pag-rank**:
   - I-filter ang mga hindi kaugnay na item at i-rank ang natitirang mga item batay sa relevance score.
   - Halimbawa:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Ibalik ang nangungunang 10 kaugnay na mga item
     ```

3. **Natural Language Processing (NLP)**:
   - Gamitin ang NLP techniques upang maunawaan ang query ng user at kunin ang kaugnay na impormasyon.
   - Halimbawa:

     ```python
     def process_query(query):
         # Gamitin ang NLP para kunin ang mahahalagang impormasyon mula sa tanong ng gumagamit
         processed_query = nlp(query)
         return processed_query
     ```

4. **Pagsasama ng Feedback ng User**:
   - Kolektahin ang feedback ng user sa mga rekomendasyong ibinigay at gamitin ito para ayusin ang mga susunod na pagsusuri ng kaugnayan.
   - Halimbawa:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Halimbawa: Pagsusuri ng Kaugnayan sa Travel Agent

Narito ang isang praktikal na halimbawa kung paano maaaring suriin ng Travel Agent ang kaugnayan ng mga travel recommendations:

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
        return ranked_items[:10]  # Ibalik ang nangungunang 10 kaugnay na item

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

# Halimbawa ng paggamit
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

### Paghahanap na May Intensyon

Ang paghahanap na may intensyon ay nagsasangkot ng pag-unawa at pag-interpret ng tunay na layunin o target sa likod ng query ng user upang makuha at makabuo ng pinaka-kaugnay at kapaki-pakinabang na impormasyon. Ang pamamaraang ito ay hindi lang basta pagtugma ng mga keywords kundi mas nakatuon sa pagkuha ng totoong pangangailangan at konteksto ng user.

#### Mga Pangunahing Konsepto sa Paghahanap na May Intensyon

1. **Pag-unawa sa Intensyon ng User**:
   - Maaaring mahati sa tatlong pangunahing uri ang intensyon ng user: informational, navigational, at transactional.
     - **Informational Intent**: Nais ng user ng impormasyon tungkol sa isang paksa (hal., "Ano ang mga pinakamahusay na museo sa Paris?").
     - **Navigational Intent**: Nais ng user na pumunta sa isang partikular na website o pahina (hal., "Opisyal na website ng Louvre Museum").
     - **Transactional Intent**: Nais ng user na magsagawa ng transaksyon, tulad ng pag-book ng flight o pagbili (hal., "Mag-book ng flight papuntang Paris").

2. **Pagkakabatid sa Konteksto**:
   - Ang pagsusuri sa konteksto ng query ng user ay nakakatulong upang tumpak na mahulaan ang kanilang intensyon. Kasama dito ang pagtingin sa mga naunang interaksyon, mga kagustuhan ng user, at mga espesipikong detalye ng kasalukuyang query.

3. **Natural Language Processing (NLP)**:
   - Ginagamit ang mga teknik sa NLP upang maunawaan at ma-interpret ang natural na lengguwahe ng mga query ng user. Kasama rito ang mga gawain tulad ng entity recognition, sentiment analysis, at query parsing.

4. **Personalization**:
   - Ang pag-personalize ng mga resulta ng paghahanap base sa kasaysayan ng user, mga kagustuhan, at feedback ay nagpapabuti ng kaugnayan ng impormasyong nakuha.

#### Praktikal na Halimbawa: Paghahanap na May Intensyon sa Travel Agent

Tingnan natin ang Travel Agent bilang halimbawa kung paano mai-implement ang paghahanap na may intensyon.

1. **Pagkolekta ng Mga Kagustuhan ng User**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Pag-unawa sa Intensyon ng User**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Pagka-mulat sa Konteksto**
   ```python
   def analyze_context(query, user_history):
       # Pagsamahin ang kasalukuyang query sa kasaysayan ng gumagamit upang maunawaan ang konteksto
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Maghanap at I-personalize ang mga Resulta**

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
       # Halimbawa ng lohika ng paghahanap para sa layuning pang-impormasyon
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Halimbawa ng lohika ng paghahanap para sa layuning pasulatan
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Halimbawa ng lohika ng paghahanap para sa layuning transaksyunal
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Halimbawa ng lohika para sa personalisasyon
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Ibalik ang nangungunang 10 na personalisadong resulta
   ```

5. **Halimbawa ng Paggamit**

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

## 4. Paggawa ng Code bilang Isang Kasangkapan

Gumagamit ang mga ahente ng paggawa ng code ng mga AI model upang magsulat at magpatupad ng code, lutasin ang mga komplikadong problema at i-automate ang mga gawain.

### Mga Ahente ng Paggawa ng Code

Gumagamit ang mga ahente ng paggawa ng code ng mga generative AI model upang magsulat at magpatupad ng code. Maaaring lutasin ng mga ahenteng ito ang mga komplikadong problema, i-automate ang mga gawain, at magbigay ng mahahalagang pananaw sa pamamagitan ng paggawa at pagpapatakbo ng code sa iba't ibang programming lengguwahe.

#### Mga Praktikal na Aplikasyon

1. **Automated na Paggawa ng Code**: Gumawa ng mga code snippet para sa mga partikular na gawain, tulad ng pagsusuri ng data, web scraping, o machine learning.
2. **SQL bilang RAG**: Gumamit ng mga SQL query upang kunin at manipulahin ang data mula sa mga database.
3. **Pagsosolba ng Problema**: Lumikha at magpatupad ng code upang lutasin ang mga partikular na problema, tulad ng pag-optimize ng mga algorithm o pagsusuri ng data.

#### Halimbawa: Ahente ng Paggawa ng Code para sa Pagsusuri ng Data

Isipin mong nagdidisenyo ka ng ahente sa paggawa ng code. Ganito ang maaaring proseso nito:

1. **Gawain**: Suriin ang isang dataset upang matukoy ang mga trend at pattern.
2. **Mga Hakbang**:
   - I-load ang dataset sa isang tool para sa pagsusuri ng data.
   - Gumawa ng mga SQL query upang i-filter at i-aggregate ang data.
   - Patakbuhin ang mga query at kunin ang mga resulta.
   - Gamitin ang mga resulta upang gumawa ng mga visualization at mga pananaw.
3. **Kinakailangang Mga Resources**: Access sa dataset, mga tool sa pagsusuri ng data, at kakayahan sa SQL.
4. **Karanasan**: Gamitin ang mga nakaraang resulta ng pagsusuri upang mapabuti ang katumpakan at kaugnayan ng mga susunod na pagsusuri.

### Halimbawa: Ahente ng Paggawa ng Code para sa Travel Agent

Sa halimbawang ito, magdidisenyo tayo ng ahente ng paggawa ng code, Travel Agent, upang tulungan ang mga user sa pagpaplano ng kanilang paglalakbay sa pamamagitan ng paggawa at pagpapatupad ng code. Kaya nitong hawakan ang mga gawain tulad ng pagkuha ng mga opsyon sa biyahe, pagsasala ng mga resulta, at paggawa ng itinerary gamit ang generative AI.

#### Pangunahing Pangkalahatang Ideya ng Ahente ng Paggawa ng Code

1. **Pagkuha ng Mga Kagustuhan ng User**: Kinokolekta ang input ng user tulad ng destinasyon, mga petsa ng paglalakbay, badyet, at interes.
2. **Paggawa ng Code upang Kunin ang Data**: Gumagawa ng mga code snippet para kunin ang data tungkol sa mga flight, hotel, at atraksyon.
3. **Pagpapatupad ng Ginawang Code**: Pinapatakbo ang mga ginawang code upang makuha ang real-time na impormasyon.
4. **Paggawa ng Itinerary**: Pinagsasama-sama ang nakuhang data sa isang personalisadong plano sa paglalakbay.
5. **Pag-aayos Base sa Feedback**: Tumatanggap ng feedback mula sa user at muling ginagawa ang code kung kinakailangan upang mas mapino ang mga resulta.

#### Hakbang-hakbang na Implementasyon

1. **Pagkuha ng Mga Kagustuhan ng User**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Paggawa ng Code upang Kunin ang Data**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Halimbawa: Bumuo ng code upang maghanap ng mga flight batay sa mga kagustuhan ng gumagamit
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Halimbawa: Bumuo ng code upang maghanap ng mga hotel
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Pagpapatupad ng Ginawang Code**

   ```python
   def execute_code(code):
       # Isakatuparan ang nabuo na code gamit ang exec
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

4. **Paggawa ng Itinerary**

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

5. **Pag-aayos Base sa Feedback**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Ayusin ang mga kagustuhan base sa puna ng gumagamit
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Muling likhain at patakbuhin ang code na may na-update na mga kagustuhan
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Paggamit ng kamalayan sa kapaligiran at pangangatwiran

Maaaring mapabuti ang proseso ng paggawa ng query gamit ang kaalaman sa schema ng table sa pamamagitan ng paggamit ng pagkakabatid sa kapaligiran at pangangatwiran.

Narito ang isang halimbawa kung paano ito gagawin:

1. **Pag-unawa sa Schema**: Mauunawaan ng sistema ang schema ng table at gagamitin ang impormasyong ito bilang batayan sa paggawa ng query.
2. **Pag-aayos Base sa Feedback**: Inaayos ng sistema ang mga kagustuhan ng user base sa feedback at pinangangatuwiran kung alin sa mga field sa schema ang kailangang baguhin.
3. **Paggawa at Pagpapatupad ng mga Query**: Gumagawa at nagpapatupad ang sistema ng mga query upang kunin ang mga updated na datos ng flight at hotel base sa bagong mga kagustuhan.

Narito ang isang updated na halimbawa ng Python code na naglalaman ng mga konseptong ito:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Ayusin ang mga kagustuhan base sa feedback ng user
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Pangangatwiran base sa schema upang ayusin ang iba pang kaugnay na mga kagustuhan
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Pasadyang lohika upang ayusin ang mga kagustuhan base sa schema at feedback
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Bumuo ng code upang kuhanin ang datos ng flight base sa na-update na mga kagustuhan
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Bumuo ng code upang kuhanin ang datos ng hotel base sa na-update na mga kagustuhan
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # I-simulate ang pagtakbo ng code at ibalik ang pekeng datos
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Bumuo ng itinerary base sa mga flight, hotel, at atraksyon
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Halimbawang schema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Halimbawang paggamit
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Muling bumuo at patakbuhin ang code gamit ang na-update na mga kagustuhan
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Paliwanag - Pag-book Base sa Feedback

1. **Kamalayan sa Schema**: Ang diksyunaryo na `schema` ay naglalarawan kung paano ia-adjust ang mga kagustuhan base sa feedback. Kasama dito ang mga field tulad ng `favorites` at `avoid`, na may mga kaukulang adjustment.
2. **Pag-aayos ng Mga Kagustuhan (`adjust_based_on_feedback` method)**: Ina-adjust ng method na ito ang mga kagustuhan base sa feedback ng user at sa schema.
3. **Mga Pag-aayos Base sa Kapaligiran (`adjust_based_on_environment` method)**: Ini-customize ng method na ito ang mga pag-aayos base sa schema at feedback.
4. **Paggawa at Pagpapatupad ng mga Query**: Gumagawa ang sistema ng code upang kunin ang mga updated na flight at hotel data base sa na-adjust na mga kagustuhan at sinisimulate ang pagpapatupad ng mga query na ito.
5. **Paggawa ng Itinerary**: Gumagawa ang sistema ng updated na itinerary base sa bagong datos ng flight, hotel, at atraksyon.

Sa pamamagitan ng pagiging environment-aware at pangangatwiran base sa schema, makagagawa ang sistema ng mga mas tumpak at may kaugnayang query na nagreresulta sa mas magagandang rekomendasyon sa paglalakbay at mas personalisadong karanasan ng user.

### Paggamit ng SQL bilang Retrieval-Augmented Generation (RAG) Technique

Ang SQL (Structured Query Language) ay isang makapangyarihang kasangkapan para makipag-ugnayan sa mga database. Kapag ginamit bilang bahagi ng Retrieval-Augmented Generation (RAG) na paraan, kayang kunin ng SQL ang mga may kaugnayang data mula sa mga database para magbigay ng impormasyon at gumawa ng mga sagot o aksyon sa AI agents. Tingnan natin kung paano maaaring gamitin ang SQL bilang RAG technique sa konteksto ng Travel Agent.

#### Pangunahing Konsepto

1. **Pakikipag-ugnayan sa Database**:
   - Ginagamit ang SQL upang i-query ang mga database, kunin ang may-kaugnayang impormasyon, at manipulahin ang data.
   - Halimbawa: Pagkuha ng mga detalye ng flight, impormasyon ng hotel, at mga atraksyon mula sa travel database.

2. **Integrasyon sa RAG**:
   - Gumagawa ng mga SQL query base sa input at kagustuhan ng user.
   - Ginagamit ang nakuhang data upang lumikha ng mga personalisadong rekomendasyon o aksyon.

3. **Dynamic na Paggawa ng Query**:
   - Gumagawa ang AI agent ng dynamic na mga SQL query base sa konteksto at pangangailangan ng user.
   - Halimbawa: Pag-customize ng SQL query upang salain ang resulta base sa badyet, petsa, at interes.

#### Mga Aplikasyon

- **Automated na Paggawa ng Code**: Gumawa ng mga code snippet para sa mga partikular na gawain.
- **SQL bilang RAG**: Gumamit ng mga SQL query para manipulahin ang data.
- **Pagsosolba ng Problema**: Lumikha at magpatupad ng code upang lutasin ang mga problema.

**Halimbawa**:
Isang data analysis agent:

1. **Gawain**: Suriin ang isang dataset upang makahanap ng mga trend.
2. **Mga Hakbang**:
   - I-load ang dataset.
   - Gumawa ng mga SQL query upang salain ang data.
   - Patakbuhin ang mga query at kunin ang resulta.
   - Gumawa ng mga visualization at mga pananaw.
3. **Resources**: Access sa dataset, kakayahan sa SQL.
4. **Karanasan**: Gamitin ang mga nakaraang resulta upang mapabuti ang mga susunod na pagsusuri.

#### Praktikal na Halimbawa: Paggamit ng SQL sa Travel Agent

1. **Pagkuha ng Mga Kagustuhan ng User**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Paggawa ng SQL Queries**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Pagpapatupad ng SQL Queries**

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

4. **Paggawa ng mga Rekomendasyon**

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

#### Mga Halimbawa ng SQL Queries

1. **Flight Query**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Hotel Query**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Attraction Query**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Sa pamamagitan ng paggamit ng SQL bilang bahagi ng Retrieval-Augmented Generation (RAG) na pamamaraan, maaaring dynamically kunin at gamitin ng mga AI agent tulad ng Travel Agent ang mga may kaugnayang datos upang magbigay ng tumpak at personalisadong mga rekomendasyon.

### Halimbawa ng Metacognition

Upang maipakita ang implementasyon ng metacognition, gumawa tayo ng isang simpleng ahente na *nag-iisip tungkol sa proseso ng paggawa ng desisyon* habang nilulutas ang isang problema. Sa halimbawang ito, bubuuin natin ang isang sistema kung saan sinusubukan ng ahente na i-optimize ang pagpili ng hotel, ngunit pagkatapos ay sinusuri ang sariling pangangatwiran at inaayos ang estratehiya kapag nagkamali o pumili ng hindi pinakamahusay.

Ipapakita natin ito gamit ang isang simpleng halimbawa kung saan pumipili ang ahente ng mga hotel base sa kombinasyon ng presyo at kalidad, ngunit "magmu-muni" ito sa mga desisyon at inaayos batay doon.

#### Paano ito nagpapakita ng metacognition:

1. **Unang Desisyon**: Pipili ang ahente ng pinakamurang hotel, nang hindi iniintindi ang epekto sa kalidad.
2. **Pagmuni-muni at Pagsusuri**: Matapos ang unang pagpili, susuriin ng ahente kung ang napiling hotel ay "masama" gamit ang feedback ng user. Kapag napag-alaman na ang kalidad ng hotel ay masyadong mababa, magmumuni ito sa sariling pangangatwiran.
3. **Pag-aayos ng Estratehiya**: Inaayos ng ahente ang estratehiya base sa pagmumuni-muni nito at lilipat mula sa "pinakamura" patungo sa "pinakamataas na kalidad", kaya pinapabuti ang proseso ng paggawa ng desisyon sa mga susunod na ulit.

Narito ang isang halimbawa:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Nagtatago ng mga hotel na pinili noon
        self.corrected_choices = []  # Nagtatago ng mga naitama na pagpili
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Mga magagamit na estratehiya

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
        # Ipagpalagay natin na mayroon tayong feedback mula sa user na nagsasabi kung maganda o hindi ang huling pagpili
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Iayos ang estratehiya kung ang nakaraang pagpili ay hindi kasiya-siya
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

# Gumawa ng listahan ng mga hotel (presyo at kalidad)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Gumawa ng agent
agent = HotelRecommendationAgent()

# Hakbang 1: Inirerekomenda ng agent ang isang hotel gamit ang estratehiyang "pinakamura"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Hakbang 2: Pinagninilayan ng agent ang pagpili at inaayos ang estratehiya kung kinakailangan
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Hakbang 3: Muling nirerekomenda ng agent, sa pagkakataong ito gamit ang inayos na estratehiya
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Mga Kakayahan ng Ahente sa Metacognition

Ang susi dito ay ang kakayahan ng ahente na:
- Suriin ang mga naunang pagpili at proseso ng paggawa ng desisyon.
- I-adjust ang estratehiya base sa pagsusuring iyon i.e., metacognition sa aksyon.

Isang simpleng anyo ito ng metacognition kung saan kaya ng sistema na i-adjust ang proseso ng pangangatwiran base sa internal na feedback.

### Konklusyon

Ang metacognition ay isang makapangyarihang kasangkapan na maaaring lubos na magpahusay sa kakayahan ng mga AI agent. Sa pamamagitan ng pagsasama ng mga metacognitive na proseso, makakalikha ka ng mga ahenteng mas matalino, nababagay, at mas epektibo. Gamitin ang mga dagdag na resources upang higit pang tuklasin ang kamangha-manghang daigdig ng metacognition sa mga AI agent.

### May Karagdagang mga Tanong tungkol sa Metacognition Design Pattern?

Sumali sa [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) upang makipagkita sa ibang mga nag-aaral, dumalo sa office hours, at makuha ang mga sagot sa iyong mga tanong tungkol sa AI Agents.

## Nakaraang Aralin

[Multi-Agent Design Pattern](../08-multi-agent/README.md)

## Susunod na Aralin

[AI Agents in Production](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Paunawa**:  
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't aming pagsisikapan ang pagiging tumpak, pakatandaan na ang mga awtomatikong salin ay maaaring maglaman ng mga pagkakamali o di-tumpak na impormasyon. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mga mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang hindi pagkakaunawaan o maling interpretasyon na maaaring magmula sa paggamit ng salin na ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->