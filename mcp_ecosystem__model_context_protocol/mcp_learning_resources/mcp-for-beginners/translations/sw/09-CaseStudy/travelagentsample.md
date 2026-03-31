# Uchambuzi wa Kesi: Wakala wa Safari wa Azure AI – Utekelezaji wa Marejeleo

## Muhtasari

[Wakala wa Safari wa Azure AI](https://github.com/Azure-Samples/azure-ai-travel-agents) ni suluhisho kamili la marejeleo lililoandaliwa na Microsoft ambalo linaonyesha jinsi ya kujenga programu ya kupanga safari yenye mawakala wengi, yenye nguvu za AI kwa kutumia Itifaki ya Muktadha wa Mfano (MCP), Azure OpenAI, na Azure AI Search. Mradi huu unaonyesha mbinu bora za kuratibu mawakala wengi wa AI, kuunganisha data za mashirika, na kutoa jukwaa salama, linaloweza kupanuliwa kwa matukio halisi ya dunia.

## Mambo Muhimu
- **Uratibu wa Mawakala Wengi:** Inatumia MCP kuratibu mawakala maalum (mfano, mawakala wa ndege, hoteli, na ratiba) ambao hushirikiana kutekeleza kazi tata za kupanga safari.
- **Uunganishaji wa Data za Mashirika:** Inaunganisha na Azure AI Search na vyanzo vingine vya data za mashirika kutoa taarifa za kisasa na muhimu kwa mapendekezo ya safari.
- **Mjenzi Salama, Unaoweza Kupanuliwa:** Inatumia huduma za Azure kwa usahihi wa uthibitishaji, ruhusa, na ueneaji unaoweza kupanuliwa, ikifuata mbinu bora za usalama wa mashirika.
- **Zana Zinazoweza Kutumika Tena:** Inatekeleza zana za MCP zinazoweza kutumika tena na templeti za maelekezo, kuwezesha mabadiliko ya haraka kwenye maeneo mapya au mahitaji ya biashara.
- **Uzoefu wa Mtumiaji:** Inatoa kiolesura cha mazungumzo kwa watumiaji kuwasiliana na mawakala wa safari, inayotumiwa na Azure OpenAI na MCP.

## Mimarisho
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Maelezo ya Mchoro wa Mimarisho

Suluhisho la Wakala wa Safari wa Azure AI limetengenezwa kwa ajili ya unyumbulifu, ueneaji, na usalama wa kuingiliana kwa mawakala wengi wa AI na vyanzo vya data za mashirika. Sehemu kuu na mtiririko wa data ni kama ifuatavyo:

- **Kiolesura cha Mtumiaji:** Watumiaji huwasiliana na mfumo kupitia UI ya mazungumzo (kama vile gumzo la wavuti au bot wa Teams), ambayo hutuma maswali ya mtumiaji na kupokea mapendekezo ya safari.
- **Seva ya MCP:** Hutoa uratibu wa kati, kupokea maoni ya mtumiaji, kusimamia muktadha, na kuratibu vitendo vya mawakala maalum (mfano, FlightAgent, HotelAgent, ItineraryAgent) kupitia Itifaki ya Muktadha wa Mfano.
- **Mawakala wa AI:** Kila wakala anahusika na eneo maalum (ndege, hoteli, ratiba) na ametekelezwa kama zana ya MCP. Waalala hutumia templeti za maelekezo na mantiki kusindika maombi na kutengeneza majibu.
- **Huduma ya Azure OpenAI:** Hutolewa uelewa wa lugha ya asili ya hali ya juu na uundaji, kuwezesha mawakala kufasiri nia ya mtumiaji na kutoa majibu ya mazungumzo.
- **Azure AI Search & Data za Mashirika:** Mawakala huomba habari kutoka Azure AI Search na vyanzo vingine vya data za mashirika kupata habari za kisasa kuhusu ndege, hoteli, na chaguzi za safari.
- **Uthibitishaji & Usalama:** Inajumuisha Microsoft Entra ID kwa uthibitishaji salama na kutumia udhibiti wa upatikanaji wa mamlaka ya chini kwa rasilimali zote.
- **Ueneaji:** Imetengenezwa kwa ajili ya ueneaji kwenye Azure Container Apps, kuhakikisha ueneaji, ufuatiliaji, na ufanisi wa uendeshaji.

Mimarisho hii inaruhusu uratibu usio na mshono wa mawakala wengi wa AI, usalama wa kuingiliana na data za mashirika, na jukwaa thabiti, linaloweza kupanuliwa kwa kujenga suluhisho za AI maalum za kikoa.

## Maelezo Hatua kwa Hatua ya Mchoro wa Mimarisho
Fikiria kupanga safari kubwa na kuwa na timu ya wasaidizi wenye utaalamu wakikusaidia kwa kila undani. Mfumo wa Wakala wa Safari wa Azure AI unafanya kazi kwa njia ileile, kwa kutumia sehemu tofauti (kama wanachama wa timu) kila mmoja akiwa na jukumu maalum. Hapa ni jinsi inavyofanya kazi pamoja:

### Kiolesura cha Mtumiaji (UI):
Fikiria hii ni dawati la mawakala wako wa safari. Huko unauliza maswali au kutoa maombi, kama “Nipatie ndege kuelekea Paris.” Hii inaweza kuwa dirisha la gumzo kwenye tovuti au programu ya ujumbe.

### Seva ya MCP (Mratibu):
Seva ya MCP ni kama meneja anayesikiliza ombi lako dawati na kuamua mtaalamu gani ashughulikie kila sehemu. Inafuatilia mazungumzo yako na kuhakikisha kila kitu kinaenda kwa utulivu.

### Mawakala wa AI (Wasaidizi Wataalamu):
Kila wakala ni mtaalamu wa eneo fulani—mmoja anajua kuhusu ndege, mwingine kuhusu hoteli, na mwingine kupanga ratiba yako. Unapoomba safari, Seva ya MCP hutuma ombi lako kwa wakala(s) sahihi. Waalala hutumia maarifa na zana zao kupata chaguzi bora kwako.

### Huduma ya Azure OpenAI (Mtaalamu wa Lugha):
Hii ni kama kuwa na mtaalamu wa lugha anayeweza kuelewa hasa unachouliza, bila kujali namna unavyoandika. Husaidia mawakala kuelewa maombi yako na kutoa majibu ya mazungumzo ya asili.

### Azure AI Search & Data za Mashirika (Maktaba ya Taarifa):
Fikiria maktaba kubwa, ya kisasa yenye taarifa zote za safari—ratiba za ndege, upatikanaji wa hoteli, na zaidi. Mawakala hutafuta maktaba hii kupata majibu sahihi zaidi kwako.

### Uthibitishaji & Usalama (Mlinzi wa Usalama):
Kama mlinzi wa usalama anayeangalia ni nani anayeweza kuingia sehemu fulani, sehemu hii inahakikisha kwamba watu na mawakala waliothibitishwa tu wanaweza kupata taarifa nyeti. Hifadhi data yako kuwa salama na faragha.

### Ueneaji kwenye Azure Container Apps (Jengo):
Wasaidizi wote hawa na zana hufanya kazi pamoja ndani ya jengo salama, linaloweza kupanuka (wingu). Hii inamaanisha mfumo unaweza kushughulikia watumiaji wengi kwa wakati mmoja na upatikane kila wakati unapo hitaji.

## Jinsi inavyofanya kazi pamoja:

Unaanza kwa kuuliza swali dawati la mbele (UI).
Meneja (Seva ya MCP) anagundua mtaalamu (wakala) anayekusaidia.
Mtaalamu hutumia mtaalamu wa lugha (OpenAI) kuelewa ombi lako na maktaba (AI Search) kupata jibu bora.
Mlinzi wa usalama (Uthibitishaji) anahakikisha kila kitu kiko salama.
Hili lote linalofanyika ndani ya jengo la kuaminika, linaloweza kupanuliwa (Azure Container Apps), ili uzoefu wako uwe laini na salama.
Kazi hii ya pamoja inaruhusu mfumo kusaidia kupanga safari yako kwa haraka na salama, kama timu ya mawakala wa kitaalamu wa safari wakifanya kazi pamoja katika ofisi ya kisasa!

## Utekelezaji wa Kiufundi
- **Seva ya MCP:** Inahudumia mantiki ya msingi ya uratibu, kutoa zana za wakala, na kusimamia muktadha kwa mchakato wa kupanga safari yenye hatua nyingi.
- **Mawakala:** Kila wakala (mfano, FlightAgent, HotelAgent) ametekelezwa kama zana ya MCP yenye templeti zake za maelekezo na mantiki.
- **Uunganishaji wa Azure:** Inatumia Azure OpenAI kwa uelewa wa lugha asili na Azure AI Search kwa upataji wa taarifa.
- **Usalama:** Inajumuisha Microsoft Entra ID kwa uthibitishaji na kutumia udhibiti wa upatikanaji wa mamlaka ya chini kwa rasilimali zote.
- **Ueneaji:** Inasaidia ueneaji kwenye Azure Container Apps kwa ueneaji na ufanisi wa uendeshaji.

## Matokeo na Athari
- Inaonyesha jinsi MCP inavyoweza kutumika kuratibu mawakala wengi wa AI katika hali halisi ya kiwango cha uzalishaji.
- Inaongeza kasi ya maendeleo ya suluhisho kwa kutoa mifumo inayoweza kutumika tena ya uratibu wa wakala, uunganishaji wa data, na ueneaji salama.
- Inatumika kama mfano wa kujenga programu maalum za AI za kikoa kwa kutumia MCP na huduma za Azure.

## Marejeleo
- [Hifadhi ya GitHub ya Wakala wa Safari wa Azure AI](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Huduma ya Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Itifaki ya Muktadha wa Mfano (MCP)](https://modelcontextprotocol.io/)

## Ifuatayo

- Rudi kwa: [Muhtasari wa Uchambuzi wa Kesi](./README.md)
- Ifuatayo: [Kusasisha Vitu vya ADO kutoka YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tangazo la Kuondoa Dhima**:
Nyaraka hii imefasirishwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kuwa sahihi, tafadhali fahamu kuwa tafsiri za kiotomatiki zinaweza kuwa na makosa au kasoro. Nyaraka ya asili katika lugha yake ya mama inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu ya watu inashauriwa. Hatubebei dhamana kwa kuelewa vibaya au tafsiri potofu zinazotokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->