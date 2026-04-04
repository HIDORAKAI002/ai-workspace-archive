[![Agentic RAG](../../../translated_images/hr/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Kliknite na gornju sliku za pregled videa ove lekcije)_

# Agentic RAG

Ova lekcija pruža sveobuhvatan pregled Agentic Retrieval-Augmented Generation (Agentic RAG), novog AI paradigme u kojoj veliki jezični modeli (LLM-ovi) autonomno planiraju svoje sljedeće korake dok izvlače informacije iz vanjskih izvora. Za razliku od statičnih obrazaca "retrieval-then-read", Agentic RAG uključuje iterativne pozive LLM-u, isprepletene pozivima alata ili funkcija i strukturiranim izlazima. Sustav procjenjuje rezultate, sužava upite, poziva dodatne alate po potrebi i nastavlja taj ciklus dok ne postigne zadovoljavajuće rješenje.

## Uvod

Ova lekcija će obuhvatiti

- **Razumijevanje Agentic RAG-a:** Saznajte o novoj paradigmi u AI-u gdje veliki jezični modeli (LLM-ovi) autonomno planiraju svoje sljedeće korake dok vuku informacije iz vanjskih izvora podataka.
- **Shvatiti iterativni maker-checker stil:** Razumite petlju iterativnih poziva LLM-u, isprepletenih pozivima alata ili funkcija i strukturiranim izlazima, dizajniranu za poboljšanje ispravnosti i rješavanje neispravnih upita.
- **Istražiti praktične primjene:** Prepoznajte scenarije u kojima Agentic RAG dolazi do izražaja, kao što su okruženja s prioritetom na ispravnost, složene interakcije s bazama podataka i produženi radni tokovi.

## Ciljevi učenja

Nakon završetka ove lekcije znat ćete/razumjeti:

- **Razumijevanje Agentic RAG-a:** Saznajte o novoj paradigmi u AI-u gdje veliki jezični modeli (LLM-ovi) autonomno planiraju svoje sljedeće korake dok vuku informacije iz vanjskih izvora podataka.
- **Iterativni maker-checker stil:** Savladajte koncept petlje iterativnih poziva LLM-u, isprepletenih pozivima alata ili funkcija i strukturiranim izlazima, dizajniranom za poboljšanje točnosti i rješavanje neispravnih upita.
- **Preuzimanje procesa rezoniranja:** Razumite sposobnost sustava da preuzme vlastiti proces rezoniranja, donoseći odluke o pristupu problemima bez oslanjanja na unaprijed definirane puteve.
- **Radni tok:** Shvatite kako agentni model neovisno odlučuje dohvatiti izvještaje o tržišnim trendovima, identificirati podatke o konkurenciji, korrelirati interne metrike prodaje, sintetizirati nalaze i procijeniti strategiju.
- **Iterativne petlje, integracija alata i memorija:** Saznajte o oslanjanju sustava na obrasce interakcije u petlji, održavanju stanja i memorije kroz korake kako bi se izbjegle ponavljajuće petlje i donosile informirane odluke.
- **Rukovanje načinima neuspjeha i samopopravkom:** Istražite robusne mehanizme samopopravka sustava, uključujući iteriranje i ponovno upitavanje, korištenje dijagnostičkih alata i povratak na ljudski nadzor.
- **Granice agencije:** Razumite ograničenja Agentic RAG-a, s naglaskom na domen-specifičnu autonomiju, ovisnost o infrastrukturi i poštovanje zaštitnih ograda.
- **Praktični slučajevi upotrebe i vrijednost:** Prepoznajte scenarije u kojima Agentic RAG dolazi do izražaja, poput okruženja s prioritetom na ispravnost, složenih interakcija s bazama podataka i produženih radnih tokova.
- **Upravljanje, transparentnost i povjerenje:** Saznajte o važnosti upravljanja i transparentnosti, uključujući objašnjivo rezoniranje, kontrolu pristranosti i ljudski nadzor.

## Što je Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) je nova AI paradigma u kojoj veliki jezični modeli (LLM-ovi) autonomno planiraju svoje sljedeće korake dok izvlače informacije iz vanjskih izvora. Za razliku od statičnih obrazaca "retrieval-then-read", Agentic RAG uključuje iterativne pozive LLM-u, isprepletene pozivima alata ili funkcija i strukturiranim izlazima. Sustav procjenjuje rezultate, sužava upite, poziva dodatne alate po potrebi i nastavlja ovaj ciklus dok ne postigne zadovoljavajuće rješenje. Ovaj iterativni "maker-checker" stil poboljšava ispravnost, rješava neispravne upite i osigurava visoku kvalitetu rezultata.

Sustav aktivno preuzima svoj proces rezoniranja, prepisujući neuspjele upite, birajući različite metode dohvaćanja i integrirajući više alata—kao što su pretraživanje vektora u Azure AI Search, SQL baze podataka ili prilagođeni API-ji—prije nego zaključi svoj odgovor. Razlikovna kvaliteta agentnog sustava je njegova sposobnost da preuzme vlastiti proces rezoniranja. Tradicionalne RAG implementacije oslanjaju se na unaprijed definirane puteve, dok agentni sustav autonomno određuje slijed koraka na temelju kvalitete pronađenih informacija.

## Definiranje Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) je nova paradigma u razvoju AI-a gdje LLM-ovi ne samo da vuku informacije iz vanjskih izvora podataka već i autonomno planiraju svoje sljedeće korake. Za razliku od statičnih obrazaca "retrieval-then-read" ili pažljivo skriptiranih nizova promptova, Agentic RAG uključuje petlju iterativnih poziva LLM-u, isprepletenih pozivima alata ili funkcija i strukturiranim izlazima. Na svakom koraku sustav procjenjuje rezultate koje je dobio, odlučuje treba li suziti upite, poziva dodatne alate po potrebi i nastavlja taj ciklus dok ne postigne zadovoljavajuće rješenje.

Ovaj iterativni "maker-checker" stil rada dizajniran je za poboljšanje ispravnosti, rješavanje neispravnih upita prema strukturiranim bazama podataka (npr. NL2SQL) i osiguravanje uravnoteženih, visokokvalitetnih rezultata. Umjesto oslanjanja isključivo na pažljivo konstruirane lance promptova, sustav aktivno preuzima svoj proces rezoniranja. Može prepisati upite koji ne uspiju, odabrati različite metode dohvaćanja i integrirati više alata—kao što su pretraživanje vektora u Azure AI Search, SQL baze podataka ili prilagođeni API-ji—prije nego finalizira svoj odgovor. To uklanja potrebu za pretjerano složenim orkestracijskim okvirima. Umjesto toga, relativno jednostavna petlja "LLM poziv → korištenje alata → LLM poziv → …" može proizvesti sofisticirane i dobro utemeljene izlaze.

![Agentic RAG Core Loop](../../../translated_images/hr/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Preuzimanje procesa rezoniranja

Razlikovna kvaliteta koja sustav čini "agentnim" je njegova sposobnost da preuzme vlastiti proces rezoniranja. Tradicionalne RAG implementacije često ovise o tome da ljudi unaprijed definiraju put za model: lanac razmišljanja koji opisuje što dohvatiti i kada.
Ali kada je sustav zaista agentan, on iznutra odlučuje kako pristupiti problemu. Ne radi se samo o izvršavanju skripte; autonomno određuje redoslijed koraka na temelju kvalitete informacija koje pronađe.
Na primjer, ako se traži da izradi strategiju lansiranja proizvoda, ne oslanja se isključivo na prompt koji opisuje cijeli istraživački i donošenje odluka radni tok. Umjesto toga, agentni model neovisno odlučuje:

1. Dohvatiti aktualne izvještaje o tržišnim trendovima koristeći Bing Web Grounding
2. Identificirati relevantne podatke o konkurentima koristeći Azure AI Search.
3.	Korrelirati povijesne interne metrike prodaje koristeći Azure SQL Database.
4.	Sintetizirati nalaze u koherentnu strategiju orkestriranu putem Azure OpenAI Service.
5.	Procijeniti strategiju za praznine ili nedosljednosti, potičući još jedno kolo dohvaćanja ako je potrebno.
Svi ovi koraci—sužavanje upita, odabir izvora, iteriranje dok nije "zadovoljan" s odgovorom—odlučuju se od strane modela, a ne unaprijed skriptirano od strane čovjeka.

## Iterativne petlje, integracija alata i memorija

![Tool Integration Architecture](../../../translated_images/hr/tool-integration.0f569710b5c17c10.webp)

Agentni sustav se oslanja na obrazac interakcije u petlji:

- **Početni poziv:** Cilj korisnika (tj. korisnički prompt) predstavlja se LLM-u.
- **Pozivanje alata:** Ako model identificira nedostajuće informacije ili nejasne upute, odabere alat ili metodu dohvaćanja—kao što je upit u vektorskoj bazi podataka (npr. Azure AI Search Hybrid search preko privatnih podataka) ili strukturirani SQL poziv—kako bi prikupio više konteksta.
- **Procjena i sužavanje:** Nakon pregleda vraćenih podataka, model odlučuje je li informacija dovoljna. Ako nije, sužava upit, isproba drugi alat ili prilagodi pristup.
- **Ponavljanje dok nije zadovoljan:** Taj ciklus se nastavlja dok model ne utvrdi da ima dovoljno jasnoće i dokaza za pružanje konačnog, dobro utemeljenog odgovora.
- **Memorija i stanje:** Budući da sustav održava stanje i memoriju kroz korake, može se prisjetiti prethodnih pokušaja i njihovih ishoda, izbjegavajući ponavljajuće petlje i donoseći informiranije odluke tijekom procesa.

S vremenom to stvara osjećaj razvijajućeg razumijevanja, omogućujući modelu da navigira složenim, višekoracima zadacima bez potrebe da čovjek stalno intervenira ili preoblikuje prompt.

## Rukovanje načinima neuspjeha i samopopravkom

Autonomija Agentic RAG-a uključuje i robusne mehanizme samopopravka. Kada sustav naiđe na slijepa crijeva—poput dohvaćanja irelevantnih dokumenata ili susretanja s neispravnim upitima—može:

- **Iterirati i ponovno upitavati:** Umjesto vraćanja niskovrijednih odgovora, model pokušava nove strategije pretraživanja, prepisuje upite baza podataka ili pregleda alternativne skupove podataka.
- **Koristiti dijagnostičke alate:** Sustav može pozvati dodatne funkcije dizajnirane da mu pomognu debugirati korake rezoniranja ili potvrditi ispravnost dohvaćenih podataka. Alati poput Azure AI Tracing bit će važni za omogućavanje robusne promatranja i nadzora.
- **Povratak na ljudski nadzor:** Za visokorizične ili ponavljajuće neuspjele scenarije, model može označiti nesigurnost i zatražiti ljudsko vodstvo. Nakon što čovjek pruži korektivnu povratnu informaciju, model može integrirati tu lekciju u daljnji rad.

Taj iterativni i dinamični pristup omogućuje modelu kontinuirano poboljšanje, osiguravajući da nije samo jednokratni sustav već sustav koji uči iz svojih pogrešaka tijekom određene sesije.

![Self Correction Mechanism](../../../translated_images/hr/self-correction.da87f3783b7f174b.webp)

## Granice agencije

Unatoč svojoj autonomiji unutar zadatka, Agentic RAG nije analogan Općoj umjetnoj inteligenciji. Njegove "agentne" sposobnosti ograničene su na alate, izvore podataka i politike koje su osigurali ljudski programeri. Ne može izumiti vlastite alate niti izaći izvan granica domena koje su postavljene. Umjesto toga, izvrsno orkestrira resurse koji su mu dostupni.
Ključne razlike u odnosu na naprednije oblike AI uključuju:

1. **Domen-specifična autonomija:** Agentic RAG sustavi usmjereni su na postizanje korisnički definiranh ciljeva unutar poznate domene, koristeći strategije poput prepisivanja upita ili odabira alata kako bi poboljšali ishode.
2. **Ovisnost o infrastrukturi:** Sposobnosti sustava ovise o alatima i podacima koje integriraju programeri. Ne može nadmašiti te granice bez ljudske intervencije.
3. **Poštovanje zaštitnih mjera:** Etičke smjernice, pravila usklađenosti i poslovne politike ostaju izuzetno važne. Sloboda agenta uvijek je ograničena sigurnosnim mjerama i mehanizmima nadzora (nadamo se).

## Praktični slučajevi upotrebe i vrijednost

Agentic RAG dolazi do izražaja u scenarijima koji zahtijevaju iterativno sužavanje i preciznost:

1. **Okruženja s prioritetom na ispravnost:** U provjerama usklađenosti, regulatornim analizama ili pravnim istraživanjima, agentni model može višestruko provjeravati činjenice, konzultirati više izvora i prepisivati upite dok ne proizvede temeljito verificiran odgovor.
2. **Složene interakcije s bazama podataka:** Kada se radi o strukturiranim podacima gdje upiti često mogu ne uspjeti ili trebati prilagodbu, sustav može autonomno suziti svoje upite koristeći Azure SQL ili Microsoft Fabric OneLake, osiguravajući da konačno dohvaćanje odgovara korisničkoj namjeri.
3. **Produženi radni tokovi:** Duže sesije mogu se razvijati kako nove informacije izlaze na vidjelo. Agentic RAG može kontinuirano integrirati nove podatke, mijenjajući strategije kako bolje razumije prostor problema.

## Upravljanje, transparentnost i povjerenje

Kako sustavi postaju autonomniji u svom rezoniranju, upravljanje i transparentnost su ključni:

- **Objašnjivo rezoniranje:** Model može pružiti trag revizije upita koje je napravio, izvora koje je konzultirao i koraka rezoniranja koje je poduzeo kako bi došao do zaključka. Alati poput Azure AI Content Safety i Azure AI Tracing / GenAIOps mogu pomoći u održavanju transparentnosti i smanjenju rizika.
- **Kontrola pristranosti i uravnoteženo dohvaćanje:** Programeri mogu prilagoditi strategije dohvaćanja kako bi osigurali da se razmotre uravnoteženi, reprezentativni izvori podataka, i redovito revidirati izlaze radi otkrivanja pristranosti ili iskrivljenih obrazaca koristeći prilagođene modele za napredne podatkovne znanstvene organizacije koje koriste Azure Machine Learning.
- **Ljudski nadzor i usklađenost:** Za osjetljive zadatke, ljudski pregled i dalje je neophodan. Agentic RAG ne zamjenjuje ljudsku prosudbu u visokorizičnim odlukama—nadopunjuje je pružajući temeljitije provjerene opcije.

Imati alate koji pružaju jasan zapis radnji je esencijalno. Bez njih, debugiranje višekorakog procesa može biti vrlo teško. Pogledajte sljedeći primjer iz Literal AI (tvrtke iza Chainlit) za Agent run:

![AgentRunExample](../../../translated_images/hr/AgentRunExample.471a94bc40cbdc0c.webp)

## Zaključak

Agentic RAG predstavlja prirodnu evoluciju u načinu na koji AI sustavi rukuju složenim, podatkovno intenzivnim zadacima. Usvajanjem obrasca interakcije u petlji, autonomnim odabirom alata i sužavanjem upita dok se ne postigne visokokvalitetan rezultat, sustav prelazi iz statičnog praćenja promptova u prilagodljivijeg, kontekstno osviještenog donositelja odluka. Iako i dalje ograničene ljudski definiranim infrastrukturama i etičkim smjernicama, ove agentne sposobnosti omogućuju bogatije, dinamičnije i konačno korisnije AI interakcije za poduzeća i krajnje korisnike.

### Imaš li još pitanja o Agentic RAG-u?

Pridružite se [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) kako biste susreli druge učenike, prisustvovali konzultacijama i dobili odgovore na svoja pitanja o AI agentima.

## Dodatni resursi
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implement Retrieval Augmented Generation (RAG) with Azure OpenAI Service: Saznajte kako koristiti vlastite podatke s Azure OpenAI Service. Ovaj Microsoft Learn modul pruža sveobuhvatan vodič za implementaciju RAG-a</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Evaluation of generative AI applications with Microsoft Foundry: Ovaj članak obuhvaća evaluaciju i usporedbu modela na javno dostupnim skupovima podataka, uključujući agentne AI aplikacije i RAG arhitekture</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">What is Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Potpuni vodič za agentno Retrieval Augmented Generation – Vijesti iz generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: pojačajte svoj RAG preformulacijom upita i samoupitom! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Dodavanje agentnih slojeva RAG-u</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Budućnost asistenata za znanje: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Kako izgraditi agentne RAG sustave</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Korištenje Microsoft Foundry Agent Service za skaliranje vaših AI agenata</a>

### Akademski radovi

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iterativno usavršavanje uz samopovratnu informaciju</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Jezični agenti s verbalnim pojačanim učenjem</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Veliki jezični modeli mogu se samopopraviti uz interaktivno kritiziranje pomoću alata</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Pregled Agentic RAG-a</a>

## Prethodna lekcija

[Obrazac dizajna za korištenje alata](../04-tool-use/README.md)

## Sljedeća lekcija

[Izgradnja pouzdanih AI agenata](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o odricanju odgovornosti:**  
Ovaj dokument preveden je korištenjem AI servisa za prevođenje Co-op Translator (https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatski prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za kritične informacije preporučuje se profesionalni ljudski prijevod. Ne snosimo odgovornost za bilo kakve nesporazume ili pogrešna tumačenja koja proizlaze iz uporabe ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->