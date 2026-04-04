# MCP v praksi: primeri iz resničnega sveta

[![MCP v praksi: primeri iz resničnega sveta](../../../translated_images/sl/10.3262cc80b4de5071.webp)](https://youtu.be/IxshWb2Az5w)

_(Kliknite na zgornjo sliko za ogled videa tega lekcija)_

Model Context Protocol (MCP) spreminja način, kako aplikacije AI komunicirajo s podatki, orodji in storitvami. Ta razdelek predstavlja primere iz resničnega sveta, ki prikazujejo praktične uporabe MCP v različnih podjetniških scenarijih.

## Pregled

Ta razdelek prikazuje konkretne primere implementacij MCP, ki poudarjajo, kako organizacije izkoriščajo ta protokol za reševanje zapletenih poslovnih izzivov. Z analizo teh primerov pridobite vpoglede v vsestranskost, razširljivost in praktične koristi MCP v resničnih primerih.

## Ključni cilji učenja

Z raziskovanjem teh primerov boste:

- Razumeli, kako je mogoče MCP uporabiti za reševanje specifičnih poslovnih težav
- Spoznali različne integracijske vzorce in arhitekturne pristope
- Prepoznali najboljše prakse za implementacijo MCP v podjetniških okoljih
- Pridobili vpoglede v izzive in rešitve, s katerimi so se srečali pri resničnih implementacijah
- Prepoznali priložnosti za uporabo podobnih vzorcev v svojih projektih

## Predstavljeni primeri

### 1. [Azure AI potovalni agenti – referenčna implementacija](./travelagentsample.md)

Ta primer analizira Microsoftovo celovito referenčno rešitev, ki prikazuje, kako z MCP, Azure OpenAI in Azure AI Search zgraditi večagentno, z AI podprto aplikacijo za načrtovanje potovanj. Projekt prikazuje:

- Orkestracijo več agentov preko MCP
- Podjetniško integracijo podatkov z Azure AI Search
- Varnostno in razširljivo arhitekturo z uporabo Azure storitev
- Razširljiva orodja z znova uporabnimi MCP komponentami
- Pogovorno uporabniško izkušnjo, ki jo poganja Azure OpenAI

Arhitekturni in implementacijski detajli nudijo dragocene vpoglede v gradnjo zapletenih večagentnih sistemov z MCP kot koordinacijskim slojem.

### 2. [Posodabljanje elementov Azure DevOps iz podatkov YouTube](./UpdateADOItemsFromYT.md)

Ta primer prikazuje praktično uporabo MCP za avtomatizacijo procesov delovnega toka. Prikazuje, kako lahko MCP orodja uporabimo za:

- Izvlečenje podatkov s spletnih platform (YouTube)
- Posodabljanje delovnih elementov v sistemih Azure DevOps
- Ustvarjanje ponovljivih avtomatiziranih delovnih tokov
- Integracijo podatkov med različnimi sistemi

Primer prikazuje, kako lahko tudi relativno preproste implementacije MCP zagotovijo pomembne izboljšave učinkovitosti z avtomatizacijo rutinskih opravil ter izboljšajo skladnost podatkov med sistemi.

### 3. [Pridobivanje dokumentacije v realnem času z MCP](./docs-mcp/README.md)

Ta primer vas vodi skozi povezavo konzolnega Python klienta na MCP strežnik za pridobivanje in beleženje kontekstno zavedne Microsoftove dokumentacije v realnem času. Naučili se boste, kako:

- Povezati se na MCP strežnik z uporabo Python klienta in uradnega MCP SDK
- Uporabljati pretočne HTTP kliente za učinkovito pridobivanje podatkov v realnem času
- Klicati orodja za dokumentacijo na strežniku in odzive beležiti neposredno v konzolo
- Integrirati posodobljeno Microsoftovo dokumentacijo v svojo delovno rutino brez zapuščanja terminala

Poglavje vključuje praktično nalogo, minimalen delovni primer kode in povezave do dodatnih virov za poglobljeno učenje. Oglejte si celoten potek in kodo v navedenem poglavju, da razumete, kako MCP lahko spremeni dostop do dokumentacije in produktivnost razvijalcev v konzolnih okoljih.

### 4. [Interaktivna spletna aplikacija za generiranje študijskih načrtov z MCP](./docs-mcp/README.md)

Ta primer prikazuje, kako ustvariti interaktivno spletno aplikacijo s Chainlit in Model Context Protocol (MCP) za generiranje personaliziranih študijskih načrtov za katerokoli temo. Uporabniki lahko določijo predmet (npr. "certifikat AI-900") in trajanje študija (npr. 8 tednov), aplikacija pa ponudi tedensko razporeditev priporočenih vsebin. Chainlit omogoča pogovorni klepetalni vmesnik, kar naredi izkušnjo zanimivo in prilagodljivo.

- Pogovorna spletna aplikacija, podprta s Chainlit
- Uporabniški pozivi za temo in trajanje
- Tedenski predlog vsebine z uporabo MCP
- Prilagodljivi odzivi v realnem času v klepetalnem vmesniku

Projekt prikazuje, kako lahko združimo pogovorno AI in MCP za ustvarjanje dinamičnih, uporabniku prilagojenih izobraževalnih orodij v sodobnem spletnem okolju.

### 5. [Dokumentacija v urejevalniku z MCP strežnikom v VS Code](./docs-mcp/README.md)

Ta primer prikazuje, kako lahko Microsoft Learn Docs prinesete neposredno v svoje okolje VS Code z MCP strežnikom — ni vam treba več preklapljati med zavihki brskalnika! Videli boste, kako:

- Takoj iskati in brati dokumentacijo znotraj VS Code s pomočjo MCP panela ali ukazne palete
- Navedbo dokumentacije vstaviti neposredno v README ali datoteke s tečajnimi zapiski
- Uporabljati GitHub Copilot in MCP skupaj za nemoteno, z AI podprto delo z dokumentacijo in kodo
- Validirati ter izboljševati dokumentacijo z realnočasnim vprašanjem in natančnostjo, ki jo zagotavlja Microsoft
- Integrirati MCP z GitHub delovnimi tokovi za neprekinjeno validacijo dokumentacije

Implementacija vključuje:

- Primer konfiguracije `.vscode/mcp.json` za enostavno nastavitev
- Vodiče z zaslonskimi posnetki znotraj urejevalnika
- Nasvete za kombinacijo Copilota in MCP za največjo produktivnost

Ta scenarij je idealen za avtorje tečajev, pisce dokumentacije in razvijalce, ki želijo ostati osredotočeni v urejevalniku med delom z dokumentacijo, Copilotom in orodji za validacijo — vse podprto z MCP.

### 6. [Ustvarjanje MCP strežnika z APIM](./apimsample.md)

Ta primer nudi korak-po-koraku navodila, kako ustvariti MCP strežnik z uporabo Azure API Management (APIM). Vključuje:

- Nastavitev MCP strežnika v Azure API Management
- Izpostavitev API operacij kot MCP orodij
- Konfiguracijo pravil za omejevanje hitrosti in varnost
- Testiranje MCP strežnika s pomočjo Visual Studio Code in GitHub Copilot

Primer prikazuje, kako izkoristiti zmogljivosti Azure za ustvarjanje robustnega MCP strežnika, ki ga je mogoče uporabiti v različnih aplikacijah ter izboljšati integracijo AI sistemov s podjetniškimi API-ji.

### 7. [GitHub MCP Registry — pospeševanje agentne integracije](https://github.com/mcp)

Ta primer preučuje, kako GitHub MCP Registry, ki je bil predstavljen septembra 2025, rešuje ključen izziv v AI ekosistemu: razdrobljeno iskanje in uvajanje Model Context Protocol (MCP) strežnikov.

#### Pregled
**MCP Registry** rešuje naraščajočo težavo razpršenih MCP strežnikov po različnih repozitorijih in registrov, kar je prej upočasnjevalo in oteževalo integracijo. Ti strežniki omogočajo AI agentom interakcijo z zunanjimi sistemi, kot so API-ji, baze podatkov in viri dokumentacije.

#### Opis problema
Razvijalci, ki gradijo agentne delovne tokove, so se soočali z več izzivi:
- **Slaba prepoznavnost** MCP strežnikov na različnih platformah
- **Podvojena vprašanja o nastavitvah** razpršena po forumih in dokumentaciji
- **Varnostna tveganja** iz nepreverjenih in nezanesljivih virov
- **Pomanjkanje standardizacije** glede kakovosti in združljivosti strežnikov

#### Arhitektura rešitve
GitHub MCP Registry centralizira zanesljive MCP strežnike z več ključnimi funkcijami:
- **Namestitev z enim klikom** preko VS Code za enostavno nastavitev
- **Razvrščanje signalov preko šuma** glede na zvezdice, aktivnost in potrditev skupnosti
- **Neposredna integracija** z GitHub Copilotom in drugimi MCP združljivimi orodji
- **Odprt model prispevkov**, ki omogoča sodelovanje skupnosti in podjetij

#### Poslovni vpliv
Register je prinesel merljive izboljšave:
- **Hitrejše uvajanje** za razvijalce, ki uporabljajo orodja, kot je Microsoft Learn MCP Server, ki pretaka uradno dokumentacijo neposredno agentom
- **Povečana produktivnost** z uporabo specializiranih strežnikov, kot je `github-mcp-server`, ki omogoča naravno jezikovno avtomatizacijo GitHuba (ustvarjanje PR-jev, ponovni zagon CI, pregled kode)
- **Močnejše zaupanje v ekosistem** preko skrbno urejenih seznamov in preglednih standardov konfiguracije

#### Strateška vrednost
Za praktične uporabnike, specializirane za upravljanje življenjskega cikla agentov in reproducibilne delovne tokove, MCP Registry nudi:
- **Modularno nameščanje agentov** z uveljavljenimi komponentami
- **Ocene podprte z registrom** za dosledno testiranje in validacijo
- **Medorodna interoperabilnost** za nemoten prehod med različnimi AI platformami

Ta primer dokazuje, da MCP Registry ni zgolj imenik — je temeljna platforma za skalabilno, resnično integracijo modelov in uvajanje agentnih sistemov.

## Zaključek

Ti sedem obsežnih primerov prikazuje neverjetno vsestranskost in praktične uporabe Model Context Protocol v različnih realnih scenarijih. Od zapletenih večagentnih sistemov za načrtovanje potovanj in podjetniškega upravljanja API-jev do poenostavljenih delovnih tokov dokumentacije in revolucionarnega GitHub MCP Registry, ti primeri prikazujejo, kako MCP zagotavlja standardiziran, razširljiv način povezovanja AI sistemov z orodji, podatki in storitvami za zagotavljanje izjemne vrednosti.

Primeri zajemajo več dimenzij implementacije MCP:
- **Podjetniška integracija**: Azure API Management in avtomatizacija Azure DevOps
- **Orkestracija več agentov**: načrtovanje potovanj s koordiniranimi AI agenti
- **Produktivnost razvijalcev**: integracija v VS Code in dostop do dokumentacije v realnem času
- **Razvoj ekosistema**: GitHub MCP Registry kot temeljna platforma
- **Izobraževalne aplikacije**: generatorji študijskih načrtov in pogovorni vmesniki

Z analizo teh implementacij pridobite ključne vpoglede v:
- **Arhitekturne vzorce** za različne obsege in primere uporabe
- **Strategije implementacije**, ki uravnotežijo funkcionalnost in vzdržnost
- **Varnost in razširljivost** za produkcijske uvedbe
- **Najboljše prakse** za razvoj MCP strežnikov in integracijo klientov
- **Razmišljanje v kontekstu ekosistema** za gradnjo povezanih AI rešitev

Primeri skupaj dokazujejo, da MCP ni zgolj teoretični okvir, ampak zrel, produkcijsko pripravljen protokol, ki omogoča praktične rešitve za zapletene poslovne izzive. Ne glede na to, ali gradite preprosta avtomatizacijska orodja ali sofisticirane večagentne sisteme, vzorci in pristopi, prikazani tukaj, nudijo trdno podlago za vaše lastne MCP projekte.

## Dodatni viri

- [Azure AI Travel Agents GitHub repozitorij](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure DevOps MCP orodje](https://github.com/microsoft/azure-devops-mcp)
- [Playwright MCP orodje](https://github.com/microsoft/playwright-mcp)
- [Microsoft Docs MCP strežnik](https://github.com/MicrosoftDocs/mcp)
- [GitHub MCP Registry — pospeševanje agentne integracije](https://github.com/mcp)
- [MCP primeri skupnosti](https://github.com/microsoft/mcp)

## Kaj sledi

- Prejšnje: [Modul 8: Najboljše prakse](../08-BestPractices/README.md)
- Naslednje: [Modul 10: Poenostavitev AI delovnih tokov: gradnja MCP strežnika z AI orodji](../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Opozorilo**:  
Ta dokument je bil preveden z uporabo storitve za prevajanje AI [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, upoštevajte, da lahko avtomatizirani prevodi vsebujejo napake ali netočnosti. Izvirni dokument v izvirnem jeziku velja za zanesljiv vir. Za pomembne informacije priporočamo strokovni človeški prevod. Za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda, ne prevzemamo odgovornosti.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->