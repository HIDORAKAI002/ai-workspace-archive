[![Kako dizajnirati dobre AI agente](../../../translated_images/hr/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Kliknite gornju sliku za pregled videa ovog lekcija)_
# Principi dizajna AI agenata

## Uvod

Postoji mnogo načina razmišljanja o izgradnji AI agentnih sustava. Budući da je nejasnoća značajka, a ne greška u dizajnu generativne AI, ponekad je inženjerima teško shvatiti odakle početi. Stvorili smo skup korisnički usmjerenih principa dizajna UX-a kako bismo developerima omogućili izgradnju korisnički usmjerenih agentnih sustava za rješavanje njihovih poslovnih potreba. Ovi principi dizajna nisu propisna arhitektura nego polazna točka za timove koji definiraju i razvijaju agentna iskustva.

Općenito, agenti bi trebali:

- Proširivati i skalirati ljudske sposobnosti (bujanje ideja, rješavanje problema, automatizacija itd.)
- Popunjavati praznine u znanju (dovesti me do brzog upoznavanja s područjima znanja, prevođenje itd.)
- Omogućavati i podržavati suradnju na načine na koje mi kao pojedinci preferiramo surađivati s drugima
- Činiti nas boljim verzijama sebe samih (npr. životni trener/zadatkovni majstor, pomažući nam učiti emocionalnu regulaciju i vještine pažljivosti, graditi otpornost itd.)

## Ova lekcija će obuhvatiti

- Što su principi agentnog dizajna
- Koje su smjernice za implementaciju ovih principa dizajna
- Primjeri primjene principa dizajna

## Ciljevi učenja

Nakon završetka ove lekcije, moći ćete:

1. Objasniti što su principi agentnog dizajna
2. Objasniti smjernice za korištenje principa agentnog dizajna
3. Razumjeti kako izgraditi agenta koristeći principe agentnog dizajna

## Principi agentnog dizajna

![Principi agentnog dizajna](../../../translated_images/hr/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Prostor)

To je okruženje u kojem agent djeluje. Ovi principi informiraju kako dizajniramo agente za angažman u fizičkim i digitalnim svjetovima.

- **Povezivanje, ne kolapsiranje** – pomažu povezati ljude s drugim ljudima, događajima i djelotvornim znanjem kako bi omogućili suradnju i povezivanje.
- Agenti pomažu povezati događaje, znanja i ljude.
- Agenti zbližavaju ljude. Nisu dizajnirani da zamijene ili umanje ljude.
- **Lako dostupni, a povremeno nevidljivi** – agent većinom djeluje u pozadini i potiče nas samo kada je relevantno i prikladno.
  - Agent je lako otkriven i dostupan autoriziranim korisnicima na bilo kojem uređaju ili platformi.
  - Agent podržava multimodalne ulaze i izlaze (zvuk, glas, tekst itd.).
  - Agent može neprimjetno prelaziti između prvog plana i pozadine; između proaktivnog i reaktivnog, ovisno o svojoj percepciji potreba korisnika.
  - Agent može djelovati u nevidljivom obliku, no njegov proces u pozadini i suradnja s drugim agentima su transparentni i korisnik ih može kontrolirati.

### Agent (Vrijeme)

To je način na koji agent djeluje tijekom vremena. Ovi principi informiraju kako dizajniramo agente koji djeluju u prošlosti, sadašnjosti i budućnosti.

- **Prošlost**: Razmišljanje o povijesti koja uključuje i stanje i kontekst.
  - Agent pruža relevantnije rezultate na temelju analize bogatijih povijesnih podataka, ne samo događaja, ljudi ili stanja.
  - Agent stvara veze iz prošlih događaja i aktivno razmišlja o sjećanju kako bi se angažirao u trenutačnim situacijama.
- **Sadašnjost**: Podsticaj više nego obavještavanje.
  - Agent utjelovljuje sveobuhvatan pristup interakciji s ljudima. Kad se događaj dogodi, Agent ne ostaje samo pri statičnoj obavijesti ili drugoj formi formalnosti. Agent može pojednostavniti tijekove ili dinamički generirati znakove za usmjeravanje pažnje korisnika u pravi trenutak.
  - Agent isporučuje informacije bazirane na kontekstualnom okruženju, društvenim i kulturnim promjenama i prilagođava se namjerama korisnika.
  - Interakcija s agentom može biti postupna, razvijajuća se/rastuća u složenosti kako bi dugoročno osnažila korisnike.
- **Budućnost**: Prilagodba i evolucija.
  - Agent se prilagođava različitim uređajima, platformama i modalitetima.
  - Agent se prilagođava ponašanju korisnika, potrebama pristupačnosti i slobodno je prilagodljiv.
  - Agent je oblikovan i razvija se kroz kontinuiranu interakciju s korisnikom.

### Agent (Jezgra)

To su ključni elementi u jezgru dizajna agenta.

- **Prihvatite neizvjesnost, ali uspostavite povjerenje**.
  - Očekuje se određena razina neizvjesnosti kod Agenta. Neizvjesnost je ključni element dizajna agenta.
  - Povjerenje i transparentnost su temeljni slojevi dizajna agenta.
  - Ljudi imaju kontrolu nad uključenjem/isključenjem Agenta, a status agenta je uvijek jasno vidljiv.

## Smjernice za implementaciju ovih principa

Kad koristite navedene principe dizajna, koristite sljedeće smjernice:

1. **Transparentnost**: Obavijestite korisnika da je AI uključen, kako funkcionira (uključujući prošle radnje) te kako dati povratne informacije i modificirati sustav.
2. **Kontrola**: Omogućite korisniku prilagodbu, specificiranje preferencija i personalizaciju te kontrolu nad sustavom i njegovim atributima (uključujući mogućnost zaborava).
3. **Konzistentnost**: Težite dosljednim, multimodalnim iskustvima preko uređaja i krajnjih točaka. Koristite poznate UI/UX elemente gdje je moguće (npr. ikona mikrofona za glasovnu interakciju) i maksimalno smanjite kognitivno opterećenje korisnika (npr. težite sažetim odgovorima, vizualnim pomagalima i sadržaju „Saznajte više“).

## Kako dizajnirati putničkog agenta koristeći ove principe i smjernice

Zamislite da dizajnirate Putničkog agenta, evo kako biste mogli razmišljati o korištenju Principa dizajna i Smjernica:

1. **Transparentnost** – Obavijestite korisnika da je Putnički agent AI omogućen agent. Pružite osnovne upute za početak (npr. poruka „Pozdrav“, primjeri naredbi). Javno dokumentirajte to na stranici proizvoda. Prikažite popis pitanja koje je korisnik postavljao ranije. Jasno naznačite kako dati povratne informacije (palčevi gore/dolje, gumb Pošalji povratnu informaciju itd.). Jasno navedite ima li agent ograničenja u korištenju ili temama.
2. **Kontrola** – Neka bude jasno kako korisnik može modificirati agenta nakon kreiranja, npr. pomoću sistemskih naredbi. Omogućite korisniku izbor koliko detaljan agent treba biti, stil pisanja i eventualne teme o kojima agent ne bi trebao razgovarati. Dopustite korisniku pregled i brisanje povezanih datoteka, podataka, naredbi i prošlih razgovora.
3. **Konzistentnost** – Pobrinite se da su ikone za Dijeli naredbu, dodaj datoteku ili fotografiju i označi nekoga ili nešto standardne i prepoznatljive. Koristite ikonu spajalice za označavanje prijenosa/dijeljenja datoteka s agentom, a ikonu slike za prijenos grafike.

## Primjeri koda

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Imate li dodatnih pitanja o AI agentnim dizajnerskim obrascima?

Pridružite se [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) kako biste se upoznali s drugim učenicima, sudjelovali na konzultacijama i dobili odgovore na pitanja o AI agentima.

## Dodatni resursi

- <a href="https://openai.com" target="_blank">Prakse upravljanja Agentnim AI sustavima | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Projekt HAX Toolkit - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Responsible AI Toolbox</a>

## Prethodna lekcija

[Pregled agentnih okvira](../02-explore-agentic-frameworks/README.md)

## Sljedeća lekcija

[Obrazac dizajna korištenja alata](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Odricanje od odgovornosti**:
Ovaj dokument je preveden korištenjem AI usluge za prijevod [Co-op Translator](https://github.com/Azure/co-op-translator). Iako nastojimo postići točnost, imajte na umu da automatizirani prijevodi mogu sadržavati pogreške ili netočnosti. Izvorni dokument na njegovu izvornom jeziku treba smatrati službenim izvorom. Za važne informacije preporučuje se profesionalni ljudski prijevod. Ne prihvaćamo odgovornost za bilo kakve nesporazume ili pogrešna tumačenja koja proizađu iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->