# Inženiring konteksta za AI agente

[![Inženiring konteksta](../../../translated_images/sl/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Kliknite zgornjo sliko za ogled videoposnetka te lekcije)_

Razumevanje kompleksnosti aplikacije, za katero gradite AI agenta, je pomembno za izdelavo zanesljivega agenta. Potrebujemo ustvariti AI agente, ki učinkovito upravljajo informacije, da lahko naslovijo kompleksne potrebe, ki presegajo oblikovanje pozivov.

V tej lekciji si bomo ogledali, kaj je inženiring konteksta in njegovo vlogo pri gradnji AI agentov.

## Uvod

This lesson will cover:

• **Kaj je inženiring konteksta** in zakaj se razlikuje od oblikovanja pozivov.

• **Strategije za učinkoviti inženiring konteksta**, vključno s tem, kako pisati, izbirati, stiskati in izolirati informacije.

• **Pogoste napake v kontekstu**, ki lahko podrejo vašega AI agenta, in kako jih odpraviti.

## Cilji učenja

Po končani lekciji boste razumeli, kako:

• **Opredeliti inženiring konteksta** in ga razlikovati od oblikovanja pozivov.

• **Prepoznati ključne komponente konteksta** v aplikacijah velikih jezikovnih modelov (LLM).

• **Uporabiti strategije za pisanje, izbiro, kompresijo in izolacijo konteksta**, da izboljšate delovanje agenta.

• **Prepoznati pogoste napake v kontekstu** kot so zastrupitev, distrakcija, zmeda in neskladje, ter uvesti tehnike za ublažitev.

## Kaj je inženiring konteksta?

Za AI agente je kontekst to, kar usmerja načrtovanje agenta pri izvajanju določenih dejanj. Inženiring konteksta je praksa zagotavljanja, da ima AI agent pravilne informacije za dokončanje naslednjega koraka naloge. Okno konteksta je omejeno v velikosti, zato moramo kot graditelji agentov zgraditi sisteme in procese za upravljanje dodajanja, odstranjevanja in stiskanja informacij v oknu konteksta.

### Oblikovanje pozivov proti inženiringu konteksta

Oblikovanje pozivov se osredotoča na en nabor statičnih navodil, s katerimi učinkovito vodimo AI agente po naboru pravil.  Inženiring konteksta pa je način upravljanja dinamičnega nabora informacij, vključno z začetnim pozivom, da se zagotovi, da ima AI agent skozi čas, kar potrebuje. Glavna ideja inženiringa konteksta je narediti ta proces ponovljiv in zanesljiv.

### Vrste konteksta

[![Vrste konteksta](../../../translated_images/sl/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Pomembno je zapomniti si, da kontekst ni le ena sama stvar. Informacije  ki jih AI agent potrebuje lahko prihajajo iz različnih virov in na nas je, da zagotovimo agentu dostop do teh virov:

The types of context an AI agent might need to manage include:

• **Navodila:** To so nekakšna "pravila" – pozivi, sistemska sporočila, few-shot primeri (ki AI pokažejo, kako nekaj narediti) in opisi orodij, ki jih lahko uporablja. Tu se fokus oblikovanja pozivov združi z inženiringom konteksta.

• **Znanje:** To zajema dejstva, informacije pridobljene iz baz podatkov ali dolgoročne spomine, ki jih je agent zbral. Sem spada tudi integracija sistema Retrieval Augmented Generation (RAG), če agent potrebuje dostop do različnih skladišč znanja in baz podatkov.

• **Orodja:** To so opisi zunanjih funkcij, API-jev in MCP Servers, ki jih agent lahko kliče, skupaj s povratnimi informacijami (rezultati), ki jih dobi z njihovo uporabo.

• **Zgodovina pogovora:** Trenuten dialog z uporabnikom. Sčasoma ti pogovori postanejo daljši in bolj zapleteni, kar pomeni, da zavzemajo prostor v oknu konteksta.

• **Uporabniške preference:** Informacije, pridobljene o uporabnikovih všečkih ali nevšečnostih skozi čas. Te se lahko shranijo in uporabijo pri sprejemanju pomembnih odločitev za pomoč uporabniku.

## Strategije za učinkovit inženiring konteksta

### Strategije načrtovanja

[![Context Engineering Best Practices](../../../translated_images/sl/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Dober inženiring konteksta se začne z dobrim načrtovanjem. Tukaj je pristop, ki vam bo pomagal začeti razmišljati o tem, kako uporabiti koncept inženiringa konteksta:

1. **Opredelite jasne rezultate** - Rezultati nalog, ki jih bodo AI agenti opravljali, naj bodo jasno opredeljeni. Odgovorite na vprašanje - "Kako bo svet izgledal, ko bo AI agent dokončal svojo nalogo?" Z drugimi besedami, kakšna sprememba, informacija ali odgovor naj bi imel uporabnik po interakciji z AI agentom.
2. **Narišite kontekst** - Ko ste opredelili rezultate AI agenta, morate odgovoriti na vprašanje "Katere informacije AI agent potrebuje, da dokonča to nalogo?". Tako lahko začnete mapirati kontekst, kje so te informacije lahko locirane.
3. **Ustvarite kontekstne cevovode** - Zdaj ko veste, kje so informacije, morate odgovoriti na vprašanje "Kako bo agent dobil te informacije?". To je mogoče narediti na različne načine, vključno z RAG, uporabo MCP strežnikov in drugimi orodji.

### Praktične strategije

Načrtovanje je pomembno, vendar ko se informacije začnejo pretakati v agentovo okno konteksta, potrebujemo praktične strategije za upravljanje:

#### Upravljanje konteksta

While some information will be added to the context window automatically, context engineering is about taking a more active role of this information which can be done by a few strategies:

 1. **Delovni zvezek agenta**
 This allows for an AI Agent to takes notes of relevant information about the current tasks and user interactions during a single session. This should exist outside of the context window in a file or runtime object that the agent can later retrieve during this session if needed.

 2. **Spomini**
 Scratchpads are good for managing information outside of the context window of a single session. Memories enable agents to store and retrieve relevant information across multiple sessions. This could include summaries, user preferences and feedback for improvements in the future.

 3. **Stiskanje konteksta**
  Once the context window grows and is nearing its limit, techniques such as summarization and trimming can be used. This includes either keeping only the most relevant information or removing older messages.
  
 4. **Sistemi z več agenti**
  Developing multi-agent system is a form of context engineering because each agent has its own context window. How that context is shared and passed to different agents is another thing to plan out when building these systems.
  
 5. **Sandbox okolja**
  If an agent needs to run some code or process large amounts of information in a document, this can take a large amount of tokens to process the results. Instead of having this all stored in the context window, the agent can use a sandbox environment that is able to run this code and only read the results and other relevant information.
  
 6. **Objekti stanja pri izvajanju**
   This is done by creating containers of information to manage situations when the Agent needs to have access to certain information. For a complex task, this would enable an Agent to store the results of each subtask step by step, allowing the context to remain connected only to that specific subtask.
  
### Primer inženiringa konteksta

Let's say we want an AI agent to **"Rezerviraj mi potovanje v Pariz."**

• A simple  agent using only prompt engineering might just respond: **"V redu, kdaj bi radi šli v Pariz?**". It only processed your direct question at the time that the user asked.

• An agent using  the context engineering strategies covered would do much more. Before even responding, its system might:

  ◦ **Preveri vaš koledar** for available dates (retrieving real-time data).

  ◦ **Upošteva pretekle potovalne preference** (from long-term memory) like your preferred airline, budget, or whether you prefer direct flights.

  ◦ **Ugotovi razpoložljiva orodja** for flight and hotel booking.

- Then, an example response could be:  "Hey [Your Name]! I see you're free the first week of October. Shall I look for direct flights to Pariz on [Preferred Airline] within your usual budget of [Budget]?". This richer, context-aware response demonstrates the power of context engineering.

## Pogoste napake konteksta

### Zastrupitev konteksta

**Kaj je:** Ko halucinacija (napačna informacija, ki jo ustvari LLM) ali napaka vstopi v kontekst in se nanjo večkrat sklicuje, zaradi česar agent zasleduje nemogoče cilje ali razvije nesmiselne strategije.

**Kaj storiti:** Uvedite **validacijo konteksta** in **karanteno**. Pred dodajanjem informacij v dolgoročni spomin potrdite informacije. Če je zazdeta potencialna zastrupitev, začnite s svežimi nitmi konteksta, da preprečite širjenje napačnih informacij.

**Primer rezervacije potovanja:** Vaš agent halucinira **direktni let z majhnega lokalnega letališča v oddaljeno mednarodno mesto**, ki v resnici ne ponuja mednarodnih letov. Ta neobstoječa podrobnost leta se shrani v kontekst. Kasneje, ko prosite agenta, naj rezervira, vztraja pri iskanju kart za to nemogočo linijo in povzroča ponavljajoče se napake.

**Rešitev:** Uvedite korak, ki **validira obstoj letov in poti z realnočasovnim API-jem** _before_ adding the flight detail to the agent's working context. Če validacija ne uspe, se napačna informacija "karanteni" in se ne uporablja naprej.

### Context Distraction

**Kaj je:** Ko kontekst postane tako velik, da se model preveč osredotoči na zbrano zgodovino namesto na to, kar se je naučil med treniranjem, kar vodi v ponavljajoča ali neuporabna dejanja. Modeli lahko začnejo delati napake še preden je okno konteksta polno.

**Kaj storiti:** Use **povzemanje konteksta**. Periodično stisnite zbrano informacijo v krajše povzetke, pri čemer ohranite pomembne podrobnosti in odstranite redundantno zgodovino. To pomaga "ponastaviti" osredotočenost.

**Travel Booking Example:** You've been discussing various dream travel destinations for a long time, including a detailed recounting of your backpacking trip from two years ago. When you finally ask to **"najdi mi poceni let za** **naslednji mesec****,"** the agent gets bogged down in the old, irrelevant details and keeps asking about your backpacking gear or past itineraries, neglecting your current request.

**Rešitev:** Po določenem številu menjav ali ko kontekst preraste, bi moral agent **povzetek najbolj nedavnih in relevantnih delov pogovora** – osredotočiti se na vaše trenutne datume potovanja in destinacijo – ter uporabiti ta stisnjen povzetek za naslednji LLM klic, zavreči manj relevantni zgodovinski klepet.

### Context Confusion

**Kaj je:** Ko nepotreben kontekst, pogosto v obliki prevelikega števila razpoložljivih orodij, povzroči, da model ustvari slabe odgovore ali kliče nepovezana orodja. Manjši modeli so še posebej dovzetni za to.

**Kaj storiti:** Uvedite **upravljanje nabora orodij** z uporabo tehnik RAG. Shranite opise orodij v vektorsko bazo podatkov in izberite _samo_ najbolj relevantna orodja za vsako specifično nalogo. Raziskave kažejo, da je smiselno omejiti izbor orodij na manj kot 30.

**Primer rezervacije potovanja:** Vaš agent ima dostop do desetin orodij: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations`, itd. Ko vprašate, **"Kakšen je najboljši način premikanja po Parizu?"**, se agent zaradi velikega števila orodij zmede in poskuša poklicati `book_flight` _znotraj_ Pariza ali `rent_car`, čeprav raje javni prevoz, ker se opisi orodij lahko prekrivajo ali pa preprosto ne zmore razločiti najboljšega.

**Rešitev:** Uporabite **RAG nad opisi orodij**. Ko vprašate o premikanju po Parizu, sistem dinamično poišče _samo_ najbolj relevantna orodja kot so `rent_car` ali `public_transport_info` na podlagi vašega poizvedka in predstavi osredotočeno "nabiranje" orodij LLM-ju.

### Context Clash

**Kaj je:** Ko v kontekstu obstajajo protislovne informacije, kar vodi do nedoslednega sklepanja ali slabih končnih odgovorov. To se pogosto zgodi, ko informacije prispejo v obdobjih, in zgodnje napačne predpostavke ostanejo v kontekstu.

**Kaj storiti:** Uporabite **obrezovanje konteksta** in **offloading**. Obrezovanje pomeni odstranjevanje zastarelih ali protislovnih informacij, ko prispejo nove podrobnosti. Offloading daje modelu ločen delovni prostor ("scratchpad") za obdelavo informacij brez zapolnjevanja glavnega konteksta.

**Primer rezervacije potovanja:** Sprva agentu poveste, **"Želim leteti v ekonomski razred."** Kasneje v pogovoru spremenite mnenje in rečete, **"Pravzaprav za to potovanje pojdimo v poslovni razred."** Če oboji navodili ostaneta v kontekstu, se agent lahko zmoti pri iskanju ali pa ne ve, katero preferenco dati prednost.

**Rešitev:** Uvedite **obrezovanje konteksta**. Ko novo navodilo nasprotuje staremu, se starejše navodilo odstrani ali eksplicitno nadomesti v kontekstu. Alternativno lahko agent uporabi **scratchpad**, da uskladi protislovne preference, preden odloči, kar zagotavlja, da le končno, dosledno navodilo vodi njegove ukrepe.

## Imate več vprašanj o inženiringu konteksta?

Join the [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet with other learners, attend office hours and get your AI Agents questions answered.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Izjava o omejitvi odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko avtomatski prevodi vsebujejo napake ali netočnosti. Izvirni dokument v izvirnem jeziku velja za avtoritativni vir. Pri ključnih informacijah priporočamo strokovni (človeški) prevod. Ne odgovarjamo za morebitne nesporazume ali napačne razlage, ki bi izhajale iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->