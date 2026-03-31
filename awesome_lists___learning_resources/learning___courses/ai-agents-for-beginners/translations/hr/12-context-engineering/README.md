# Inženjering konteksta za AI agente

[![Context Engineering](../../../translated_images/hr/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Kliknite na gornju sliku za pregled video lekcije)_

Razumijevanje složenosti aplikacije za koju gradite AI agenta važno je za izradu pouzdanog agenta. Moramo graditi AI agente koji učinkovito upravljaju informacijama kako bi zadovoljili složene potrebe koje nadilaze inženjering promptova.

U ovoj lekciji ćemo pogledati što je inženjering konteksta i njegovu ulogu u izgradnji AI agenata.

## Uvod

Ova lekcija će obuhvatiti:

• **Što je inženjering konteksta** i zašto se razlikuje od inženjeringa promptova.

• **Strategije za učinkovit inženjering konteksta**, uključujući kako pisati, birati, komprimirati i izolirati informacije.

• **Uobičajene pogreške u kontekstu** koje mogu srušiti vašeg AI agenta i kako ih ispraviti.

## Ciljevi učenja

Nakon što završite ovu lekciju, znat ćete razumjeti kako:

• **Definirati inženjering konteksta** i razlikovati ga od inženjeringa promptova.

• **Identificirati ključne komponente konteksta** u aplikacijama velikih jezičnih modela (LLM).

• **Primijeniti strategije za pisanje, odabir, komprimiranje i izolaciju konteksta** za poboljšanje performansi agenta.

• **Prepoznati uobičajene pogreške konteksta** kao što su trovanje, ometanje, zabuna i sukob, te primijeniti tehnike ublažavanja.

## Što je inženjering konteksta?

Za AI agente, kontekst je ono što pokreće planiranje AI agenta da poduzme određene akcije. Inženjering konteksta je praksa osiguravanja da AI agent ima prave informacije za dovršetak sljedećeg koraka zadatka. Prozor konteksta je ograničenog kapaciteta, pa kao kreatori agenata trebamo izgraditi sustave i procese za upravljanje dodavanjem, uklanjanjem i sažimanjem informacija u prozoru konteksta.

### Inženjering promptova vs inženjering konteksta

Inženjering promptova usredotočen je na jedan skup statičkih uputa koje učinkovito vode AI agente s nizom pravila. Inženjering konteksta odnosi se na upravljanje dinamičkim skupom informacija, uključujući početni prompt, kako bi se osiguralo da AI agent ima što mu treba tijekom vremena. Glavna ideja oko inženjeringa konteksta je učiniti taj proces ponovljivim i pouzdanim.

### Tipovi konteksta

[![Types of Context](../../../translated_images/hr/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Važno je zapamtiti da kontekst nije samo jedna stvar. Informacije koje AI agent treba mogu doći iz raznih različitih izvora i na nama je da osiguramo da agent ima pristup tim izvorima:

Tipovi konteksta koje AI agent može trebati upravljati uključuju:

• **Upute:** To su kao "pravila" agenta – promptovi, sistemske poruke, primjeri few-shot (pokazivanje AI-ju kako nešto napraviti), i opisi alata koje može koristiti. Ovo je mjesto gdje se fokus inženjeringa promptova spaja s inženjeringom konteksta.

• **Znanje:** Obuhvaća činjenice, informacije dohvaćene iz baza podataka ili dugoročna memorija koju je agent prikupio. To uključuje integraciju sustava Retrieval Augmented Generation (RAG) ako agent treba pristup različitim skladištima znanja i bazama podataka.

• **Alati:** To su definicije vanjskih funkcija, API-ja i MCP servera koje agent može pozvati, zajedno s povratnom informacijom (rezultatima) koje dobiva korištenjem tih alata.

• **Povijest razgovora:** Trenutni dijalog s korisnikom. Kako vrijeme prolazi, ti razgovori postaju duži i složeniji što zauzima prostor u prozoru konteksta.

• **Korisničke preferencije:** Informacije naučene o korisničkim željama ili odbojnostima tijekom vremena. One se mogu pohraniti i pozvati pri donošenju ključnih odluka kako bi se pomoglo korisniku.

## Strategije za učinkovit inženjering konteksta

### Strategije planiranja

[![Context Engineering Best Practices](../../../translated_images/hr/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Dobar inženjering konteksta počinje dobrim planiranjem. Evo pristupa koji će vam pomoći da počnete razmišljati o primjeni koncepta inženjeringa konteksta:

1. **Definirajte jasne rezultate** – rezultati zadataka koje će AI agenti izvršavati trebaju biti jasno definirani. Odgovorite na pitanje - „Kako će svijet izgledati kada AI agent završi svoj zadatak?“ Drugim riječima, koja promjena, informacija ili odgovor treba korisniku biti dostupna nakon interakcije s AI agentom.

2. **Mapirajte kontekst** – nakon što definirate rezultate AI agenta, trebate odgovoriti na pitanje „Koje informacije AI agent treba da bi ispunio ovaj zadatak?“. Tako možete početi mapirati kontekst i gdje se te informacije mogu nalaziti.

3. **Izradite kontekstne pipelines** – sada kada znate gdje su informacije, trebate odgovoriti na pitanje „Kako agent dobiva te informacije?“. To se može obaviti na različite načine, uključujući RAG, korištenje MCP servera i drugih alata.

### Praktične strategije

Planiranje je važno, ali kada informacije počnu pristizati u kontekst prozora našeg agenta, trebamo imati praktične strategije za njihovo upravljanje:

#### Upravljanje kontekstom

Iako se neke informacije automatski dodaju u kontekst prozora, inženjering konteksta odnosi se na aktivniju ulogu u upravljanju tim informacijama, što se može učiniti nekoliko strategija:

1. **Agentova bilježnica (Agent Scratchpad)**  
Ovo omogućuje AI agentu da bilježi važne informacije o trenutačnim zadacima i interakcijama s korisnikom tijekom jedne sesije. Ovo bi trebalo postojati izvan kontekstnog prozora u datoteci ili objektu tijekom izvođenja koji agent može kasnije dohvatiti tijekom te sesije ako je to potrebno.

2. **Memorije**  
Bilježnice su dobre za upravljanje informacijama izvan kontekst prozora jedne sesije. Memorije omogućuju agentima pohranu i dohvaćanje relevantnih informacija kroz više sesija. To može uključivati sažetke, korisničke preferencije i povratne informacije za buduća poboljšanja.

3. **Komprimiranje konteksta**  
Kada kontekst prozor raste i približava se svom kapacitetu, mogu se koristiti tehnike poput sažimanja i obrezivanja. To uključuje zadržavanje samo najvažnijih informacija ili uklanjanje starijih poruka.

4. **Sustavi s više agenata**  
Razvijanje sustava s više agenata je oblik inženjeringa konteksta jer svaki agent ima svoj vlastiti kontekst prozor. Kako se taj kontekst dijeli i prosljeđuje različitim agentima je još jedna stvar koju treba isplanirati prilikom izrade takvih sustava.

5. **Sandbox okruženja**  
Ako agentu treba pokrenuti neki kod ili obraditi velike količine informacija u dokumentu, to može zahtijevati veliki broj tokena za obradu rezultata. Umjesto da se sve to pohranjuje u kontekst prozoru, agent može koristiti sandbox okruženje koje može izvršavati taj kod i samo čitati rezultate te druge relevantne informacije.

6. **Objekti stanja tijekom izvođenja (Runtime State Objects)**  
To se ostvaruje stvaranjem spremnika informacija za upravljanje situacijama kad agent treba imati pristup određenim podacima. Za složen zadatak, to omogućava agentu da pohranjuje rezultate svakog podzadatka korak po korak, dopuštajući kontekstu da ostane povezan samo s tim specifičnim podzadatkom.

### Primjer inženjeringa konteksta

Recimo da želimo da AI agent **„Rezervira putovanje za Pariz.“**

• Jednostavan agent koji koristi samo inženjering promptova mogao bi samo odgovoriti: **„U redu, kada biste željeli ići u Pariz?“** On samo obrađuje vaše izravno pitanje u trenutku kad ste ga postavili.

• Agent koji koristi strategije inženjeringa konteksta napravit će mnogo više. Prije nego što odgovori, njegov sustav može:

  ◦ **Provjeriti vaš kalendar** za slobodne datume (dohvaćajući podatke u stvarnom vremenu).

 ◦ **Prisjetiti se prošlih putnih preferencija** (iz dugoročne memorije) poput vaše omiljene zrakoplovne kompanije, budžeta ili preferencije izravnih letova.

 ◦ **Identificirati dostupne alate** za rezervaciju leta i hotela.

- Zatim bi primjer odgovora mogao biti: „Bok [Vaše ime]! Vidim da ste slobodni prvi tjedan u listopadu. Želite li da tražim izravne letove za Pariz na [omiljena zrakoplovna tvrtka] unutar vašeg uobičajenog budžeta od [budžet]?“. Ovaj bogatiji, kontekstu prilagođeni odgovor pokazuje snagu inženjeringa konteksta.

## Uobičajene pogreške konteksta

### Trovanje konteksta

**Što je to:** Kada halucinacija (lažna informacija generirana od strane LLM-a) ili greška uđe u kontekst i ponavljano se referencira, uzrokujući da agent prati nemoguće ciljeve ili razvija besmislene strategije.

**Što učiniti:** Provodite **validaciju konteksta** i **karantenu**. Provjerite informacije prije nego što ih dodate u dugoročnu memoriju. Ako se otkrije potencijalno trovanje, započnite nove kontekstualne niti kako biste spriječili širenje loših informacija.

**Primjer rezervacije putovanja:** Vaš agent halucinira **izravan let s malog lokalnog aerodroma do udaljenog međunarodnog grada** koji zapravo ne nudi međunarodne letove. Taj nepostojeći podatak o letu se pohranjuje u kontekst. Kasnije, kada zatražite rezervaciju, agent stalno pokušava pronaći karte za tu nemoguću rutu, što dovodi do ponovljenih pogrešaka.

**Rješenje:** Provjerite postojanje leta i rute s API-jem u stvarnom vremenu _prije nego što_ detalj leta dodate u radni kontekst agenta. Ako validacija ne uspije, pogrešna informacija se "stavlja u karantenu" i ne koristi se dalje.

### Ometanje konteksta

**Što je to:** Kada kontekst postane toliko velik da model previše obraća pažnju na akumuliranu povijest umjesto da koristi ono što je naučio tijekom treniranja, što dovodi do ponavljajućih ili nekorisnih akcija. Modeli mogu početi grešiti čak i prije nego što kontekst prozor postane pun.

**Što učiniti:** Koristite **sažimanje konteksta**. Povremeno komprimirajte akumulirane informacije u kraće sažetke, zadržavajući važne detalje i uklanjajući redundantnu povijest. To pomaže da se fokus "resetira".

**Primjer rezervacije putovanja:** Dugo ste razgovarali o raznim željenim destinacijama za putovanja, uključujući detaljan opis vašeg backpackerskog putovanja od prije dvije godine. Kad konačno zatražite **„nađi mi jeftin let za sljedeći mjesec“**, agent se zapetlja u stare, irelevantne detalje i stalno pita o vašoj opremi za backpacking ili prošlim itinerarima, zanemarujući vaš trenutni zahtjev.

**Rješenje:** Nakon određenog broja zamjena ili kad kontekst postane prevelik, agent treba **sažeti najnovije i najvažnije dijelove razgovora** – fokusirajući se na vaše trenutačne datume putovanja i destinaciju – i koristiti taj skraćeni sažetak za sljedeći poziv LLM-u, odbacujući manje relevantnu povijesnu komunikaciju.

### Zabuna u kontekstu

**Što je to:** Kada nepotreban kontekst, često u obliku previše dostupnih alata, uzrokuje da model generira loše odgovore ili poziva irelevantne alate. Manji modeli su posebno skloni tome.

**Što učiniti:** Provedite **upravljanje alatima koristeći RAG tehnike**. Pohranite opise alata u vektor bazi podataka i odaberite _samo_ najrelevantnije alate za svaki specifični zadatak. Istraživanja pokazuju da je preporučeno ograničenje na manje od 30 alata.

**Primjer rezervacije putovanja:** Vaš agent ima pristup desecima alata: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations` itd. Pitate: **„Koji je najbolji način za kretanje po Parizu?“** Zbog velikog broja alata, agent se zbuni i pokuša pozvati `book_flight` _unutar_ Pariza ili `rent_car` iako preferirate javni prijevoz, jer se opisi alata mogu preklapati ili jednostavno ne zna koji je najbolji.

**Rješenje:** Koristite **RAG za pretraživanje opisa alata**. Kad pitate o kretanju po Parizu, sustav dinamički dohvaća _samo_ najrelevantnije alate kao što su `rent_car` ili `public_transport_info` na temelju vašeg upita, nudeći fokusirani "izbor" alata LLM-u.

### Sukob u kontekstu

**Što je to:** Kada u kontekstu postoje proturječne informacije, što dovodi do nedosljednog zaključivanja ili loših konačnih odgovora. To se često događa kada informacije dolaze fazno, a rani, netočni pretpostavke ostaju u kontekstu.

**Što učiniti:** Koristite **obrezivanje konteksta** i **prebacivanje van konteksta**. Obrezivanje znači uklanjanje zastarjelih ili sukobljenih informacija te dolaska novih detalja. Prebacivanje daje modelu zaseban "radni prostor" (scratchpad) za obradu informacija bez zatrpavanja glavnog konteksta.

**Primjer rezervacije putovanja:** U početku agentu kažete: **„Želim letjeti u ekonomskoj klasi.“** Kasnije u razgovoru promijenite mišljenje i kažete: **„Zapravo, za ovo putovanje želim poslovnu klasu.“** Ako obje upute ostanu u kontekstu, agent može dobiti proturječne rezultate pretraživanja ili se zbuniti koju preferenciju treba dati prednost.

**Rješenje:** Provedite **obrezivanje konteksta**. Kad nova uputa proturječi staroj, starija se uklanja ili eksplicitno nadjača u kontekstu. Alternativno, agent može koristiti **bilježnicu (scratchpad)** za usklađivanje sukobljenih preferencija prije donošenja odluke, osiguravajući da samo konačna, dosljedna uputa vodi njegove akcije.

## Imate još pitanja o inženjeringu konteksta?

Pridružite se [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) da se povežete s drugim učenicima, sudjelujete na radnim satima i dobijete odgovore na pitanja o AI agentima.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument je preveden pomoću AI usluge za prevođenje [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatizirani prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za ključne informacije preporučuje se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešna tumačenja koja proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->