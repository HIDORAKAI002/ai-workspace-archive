# 🚀 Modul 1: Osnove Microsoft Foundry Toolkit

[![Trajanje](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Težina](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Preduvjeti](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Ciljevi učenja

Do kraja ovog modula, moći ćete:
- ✅ Instalirati i konfigurirati Microsoft Foundry Toolkit ekstenziju za VS Code
- ✅ Kretati se kroz Katalog modela i razumjeti različite izvore modela
- ✅ Koristiti Igralište za testiranje i eksperimentiranje s modelima
- ✅ Kreirati prilagođene AI agente koristeći Agent Builder
- ✅ Usporediti performanse modela među različitim pružateljima
- ✅ Primijeniti najbolje prakse za inženjering prompta

## 🧠 Uvod u Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit ekstenzija za VS Code** je vodeća Microsoftova ekstenzija koja pretvara VS Code u sveobuhvatno razvojno okruženje za AI. Pruža most između AI istraživanja i praktičnog razvoja aplikacija, čineći generativni AI dostupnim programerima svih razina vještina.

### 🌟 Ključne mogućnosti

| Značajka | Opis | Primjena |
|---------|-------------|----------|
| **🗂️ Katalog modela** | Pristup 100+ modela s GitHub, ONNX, OpenAI, Anthropic, Google | Otkriće i odabir modela |
| **🔌 Podrška za BYOM** | Integracija vlastitih modela (lokalnih/udaljenih) | Prilagođeni deployment modela |
| **🎮 Interaktivno igralište** | Testiranje modela u stvarnom vremenu s chat sučeljem | Brzi prototip i testiranje |
| **📎 Podrška za više modaliteta** | Obrada teksta, slika i privitaka | Složene AI aplikacije |
| **⚡ Obrada u serijama** | Pokretanje više promptova istovremeno | Efikasni radni procesi testiranja |
| **📊 Evaluacija modela** | Ugrađene metrike (F1, relevantnost, sličnost, koherentnost) | Procjena performansi |

### 🎯 Zašto je Microsoft Foundry Toolkit važan

- **🚀 Ubrzan razvoj**: Od ideje do prototipa u minutama
- **🔄 Jedinstveni tijek rada**: Jedno sučelje za više AI pružatelja
- **🧪 Jednostavno eksperimentiranje**: Usporedba modela bez kompliciranih postavki
- **📈 Pripremljeno za produkciju**: Besprijekoran prijelaz s prototipa na implementaciju

## 🛠️ Preduvjeti i postavljanje

### 📦 Instalirajte Microsoft Foundry Toolkit ekstenziju

**Korak 1: Otvorite Marketplace za ekstenzije**
1. Otvorite Visual Studio Code
2. Idite na prikaz ekstenzija (`Ctrl+Shift+X` ili `Cmd+Shift+X`)
3. Potražite "Microsoft Foundry Toolkit"

**Korak 2: Odaberite svoju verziju**
- **🟢 Release**: Preporučeno za produkcijsku upotrebu
- **🔶 Pre-release**: Rani pristup najnovijim značajkama

**Korak 3: Instalirajte i aktivirajte**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/hr/aitkext.d28945a03eed003c.webp)

### ✅ Provjera instalacije
- [ ] Ikona Microsoft Foundry Toolkit pojavljuje se u bočnoj traci VS Code-a
- [ ] Ekstenzija je omogućena i aktivirana
- [ ] Nema grešaka pri instalaciji u izlaznom panelu

## 🧪 Praktična vježba 1: Istraživanje GitHub modela

**🎯 Cilj**: Ovladati Katalogom modela i testirati svoj prvi AI model

### 📊 Korak 1: Krećite se kroz Katalog modela

Katalog modela je vaš ulaz u AI ekosustav. Agregira modele od različitih pružatelja, olakšavajući pronalazak i usporedbu opcija.

**🔍 Vodič za kretanje:**

Kliknite na **MODELS - Catalog** u bočnoj traci Microsoft Foundry Toolkit-a

![Model Catalog](../../../../translated_images/hr/aimodel.263ed2be013d8fb0.webp)

**💡 Savjet**: Potražite modele sa specifičnim mogućnostima koje odgovaraju vašim potrebama (npr. generiranje koda, kreativno pisanje, analiza).

**⚠️ Napomena**: Modeli hostani na GitHub-u (GitHub modeli) su besplatni za korištenje, ali su podložni ograničenjima na broj zahtjeva i tokena. Ako želite pristupiti modelima izvan GitHub-a (npr. modele hostane putem Azure AI ili drugih krajnjih točaka), trebate osigurati odgovarajući API ključ ili autentifikaciju.

### 🚀 Korak 2: Dodajte i konfigurirajte svoj prvi model

**Strategija odabira modela:**
- **GPT-4.1**: Najbolji za složeno razmišljanje i analizu
- **Phi-4-mini**: Lagan, brz za jednostavne zadatke

**🔧 Proces konfiguracije:**
1. Izaberite **OpenAI GPT-4.1** iz kataloga
2. Kliknite **Add to My Models** - ovime registrirate model za korištenje
3. Odaberite **Try in Playground** za pokretanje testnog okruženja
4. Pričekajte inicijalizaciju modela (postavljanje pri prvom korištenju može potrajati)

![Playground Setup](../../../../translated_images/hr/playground.dd6f5141344878ca.webp)

**⚙️ Razumijevanje parametara modela:**
- **Temperature**: Kontrolira kreativnost (0 = deterministički, 1 = kreativan)
- **Max Tokens**: Maksimalna duljina odgovora
- **Top-p**: Nucleus uzorkovanje za raznolikost odgovora

### 🎯 Korak 3: Ovladavanje sučeljem Playgrounda

Playground je vaš laboratorij za AI eksperimentiranje. Evo kako maksimalno iskoristiti njegove mogućnosti:

**🎨 Najbolje prakse za inženjering prompta:**
1. **Budite precizni**: Jasne, detaljne upute daju bolje rezultate
2. **Pružite kontekst**: Uključite relevantne informacije u pozadini
3. **Koristite primjere**: Pokažite modelu što želite s primjerima
4. **Iterirajte**: Usavršavajte promptove na temelju početnih rezultata

**🧪 Scenariji testiranja:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/hr/result.1dfcf211fb359cf6.webp)

### 🏆 Izazovna vježba: Usporedba performansi modela

**🎯 Cilj**: Usporedite različite modele koristeći identične promptove kako biste razumjeli njihove prednosti

**📋 Upute:**
1. Dodajte **Phi-4-mini** u svoj radni prostor
2. Koristite isti prompt za GPT-4.1 i Phi-4-mini

![set](../../../../translated_images/hr/set.88132df189ecde2c.webp)

3. Usporedite kvalitetu odgovora, brzinu i točnost
4. Zabilježite svoja zapažanja u odjeljku rezultata

![Model Comparison](../../../../translated_images/hr/compare.97746cd0f9074955.webp)

**💡 Ključni uvidi koje trebate otkriti:**
- Kada koristiti LLM naspram SLM modela
- Odnose troškova i performansi
- Specijalizirane mogućnosti različitih modela

## 🤖 Praktična vježba 2: Izrada prilagođenih agenata uz Agent Builder

**🎯 Cilj**: Kreirati specijalizirane AI agente prilagođene određenim zadacima i radnim tokovima

### 🏗️ Korak 1: Upoznavanje s Agent Builderom

Agent Builder je mjesto gdje Microsoft Foundry Toolkit zaista dolazi do izražaja. Omogućuje vam kreiranje namjenskih AI asistenta koji kombiniraju snagu velikih jezičnih modela s prilagođenim uputama, specifičnim parametrima i specijaliziranim znanjem.

**🧠 Komponente arhitekture agenta:**
- **Core Model**: Temeljni LLM (GPT-4, Groks, Phi itd.)
- **System Prompt**: Definira osobnost i ponašanje agenta
- **Parametri**: Fino podešeni za optimalne performanse
- **Integracija alata**: Povezivanje s vanjskim API-jima i MCP servisima
- **Memorija**: Kontekst razgovora i trajnost sesije

![Agent Builder Interface](../../../../translated_images/hr/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Korak 2: Detaljna konfiguracija agenta

**🎨 Kreiranje učinkovitih sistemskih promptova:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Naravno, također možete koristiti opciju Generate System Prompt da AI pomoću generira i optimizira promptove*

**🔧 Optimizacija parametara:**
| Parametar | Preporučeni raspon | Primjena |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Tehnički/faktualni odgovori |
| **Temperature** | 0.7-0.9 | Kreativni/zadatci brainstorminga |
| **Max Tokens** | 500-1000 | Sažeti odgovori |
| **Max Tokens** | 2000-4000 | Detaljna objašnjenja |

### 🐍 Korak 3: Praktična vježba - Python programerski agent

**🎯 Misija**: Kreirati specijaliziranog asistenta za Python kodiranje

**📋 Koraci konfiguracije:**

1. **Odabir modela**: Izaberite **Claude 3.5 Sonnet** (izvrsno za kod)

2. **Dizajn sistemskog prompta**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Konfiguracija parametara**:
   - Temperature: 0.2 (za konzistentan, pouzdan kod)
   - Max Tokens: 2000 (detaljna objašnjenja)
   - Top-p: 0.9 (uravnotežena kreativnost)

![Python Agent Configuration](../../../../translated_images/hr/pythonagent.5e51b406401c165f.webp)

### 🧪 Korak 4: Testiranje vašeg Python agenta

**Scenariji testiranja:**
1. **Osnovna funkcija**: "Napravi funkciju za pronalazak prostih brojeva"
2. **Složen algoritam**: "Implementiraj binarno stablo pretraživanja s metodama za umetanje, brisanje i pretraživanje"
3. **Problem iz stvarnog svijeta**: "Napravi web scraper koji upravlja ograničenjem zahtjeva i ponovnim pokušajima"
4. **Debugging**: "Ispravi ovaj kod [zalijepi neispravan kod]"

**🏆 Kriteriji uspjeha:**
- ✅ Kod se izvršava bez pogrešaka
- ✅ Sadrži odgovarajuću dokumentaciju
- ✅ Slijedi najbolje prakse za Python
- ✅ Pruža jasna objašnjenja
- ✅ Predlaže poboljšanja

## 🎓 Završetak Modula 1 & Sljedeći koraci

### 📊 Provjera znanja

Testirajte svoje razumijevanje:
- [ ] Možete li objasniti razliku između modela u katalogu?
- [ ] Jeste li uspješno kreirali i testirali prilagođenog agenta?
- [ ] Razumijete li kako optimizirati parametre za različite primjene?
- [ ] Možete li dizajnirati učinkovite sistemske promptove?

### 📚 Dodatni resursi

- **Microsoft Foundry Toolkit dokumentacija**: [Službena Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Vodič za inženjering prompta**: [Najbolje prakse](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modeli u Microsoft Foundry Toolkit-u**: [Modeli u razvoju](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Čestitamo!** Ovladali ste osnovama Microsoft Foundry Toolkit-a i spremni ste graditi naprednije AI aplikacije!

### 🔜 Nastavite na sljedeći modul

Spremni za naprednije funkcionalnosti? Nastavite na **[Modul 2: MCP s osnovama Microsoft Foundry Toolkit-a](../lab2/README.md)** gdje ćete naučiti kako:
- Povezati svoje agente s vanjskim alatima koristeći Model Context Protocol (MCP)
- Izgraditi agente za automatizaciju preglednika pomoću Playwrighta
- Integrirati MCP servere s vašim Microsoft Foundry Toolkit agentima
- Ojačati svoje agente vanjskim podacima i mogućnostima

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->