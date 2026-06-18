# 🚀 Modul 1: Osnove Microsoft Foundry Toolkit

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Cilji učenja

Do konca tega modula boste lahko:
- ✅ Namestili in konfigurirali Microsoft Foundry Toolkit Extension za VS Code
- ✅ Krmarili po katalogu modelov in razumeli različne vire modelov
- ✅ Uporabljali Playground za testiranje in eksperimentiranje z modeli
- ✅ Ustvarjali prilagojene AI agente z Agent Builder
- ✅ Primerjali uspešnost modelov različnih ponudnikov
- ✅ Uporabljali najboljše prakse za oblikovanje pozivov (prompt engineering)

## 🧠 Uvod v Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit Extension za VS Code** je vodilni Microsoftov razširitev, ki spremeni VS Code v celovito razvojno okolje za AI. Premošča vrzel med raziskavami na področju AI in praktičnim razvojem aplikacij ter omogoča dostop do generativne AI razvijalcem vseh ravni znanja.

### 🌟 Ključne zmogljivosti

| Funkcija | Opis | Primer uporabe |
|---------|-------------|----------|
| **🗂️ Katalog modelov** | Dostop do več kot 100 modelov z GitHub-a, ONNX, OpenAI, Anthropic, Google | Odkritje in izbira modelov |
| **🔌 Podpora BYOM** | Integracija lastnih modelov (lokalno/oddaljeno) | Namestitev lastnega modela |
| **🎮 Interaktivni Playground** | Testiranje modelov v realnem času s klepetalnim vmesnikom | Hitro prototipiranje in testiranje |
| **📎 Večmodalna podpora** | Obrava besedila, slik in prilog | Kompleksne AI aplikacije |
| **⚡ Paketno procesiranje** | Hkratno izvajanje več pozivov | Učinkoviti testni poteki |
| **📊 Evalvacija modelov** | Vgrajeni metrični kazalniki (F1, relevantnost, podobnost, koherenca) | Ocena uspešnosti |

### 🎯 Zakaj je Microsoft Foundry Toolkit pomemben

- **🚀 Pospešen razvoj**: Od ideje do prototipa v nekaj minutah
- **🔄 Enoten delovni tok**: En vmesnik za več ponudnikov AI
- **🧪 Enostavno eksperimentiranje**: Primerjajte modele brez zapletenih nastavitev
- **📈 Priprava za produkcijo**: Brezhiben prehod od prototipa do implementacije

## 🛠️ Predpogoji in namestitev

### 📦 Namestitev Microsoft Foundry Toolkit Extension

**Korak 1: Dostop do tržnice razširitev**
1. Odprite Visual Studio Code
2. Odprite pogled razširitev (`Ctrl+Shift+X` ali `Cmd+Shift+X`)
3. Poiščite "Microsoft Foundry Toolkit"

**Korak 2: Izberite svojo različico**
- **🟢 Izdaja**: Priporočena za produkcijsko uporabo
- **🔶 Predizdaja**: Zgodnji dostop do najnovejših funkcionalnosti

**Korak 3: Namestite in aktivirajte**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/sl/aitkext.d28945a03eed003c.webp)

### ✅ Kontrolni seznam preverjanja
- [ ] Ikona Microsoft Foundry Toolkit se pojavi v stranski vrstici VS Code
- [ ] Razširitev je omogočena in aktivirana
- [ ] V izhodnem oknu ni napak pri namestitvi

## 🧪 Praktična vaja 1: Raziskovanje modelov na GitHubu

**🎯 Cilj**: Obvladati katalog modelov in preizkusiti svoj prvi AI model

### 📊 Korak 1: Krmarjenje po katalogu modelov

Katalog modelov je vaš vhod v AI ekosistem. Združuje modele različnih ponudnikov, kar omogoča enostavno odkrivanje in primerjanje možnosti.

**🔍 Navodila za krmarjenje:**

Kliknite na **MODELS - Catalog** v stranski vrstici Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/sl/aimodel.263ed2be013d8fb0.webp)

**💡 Nasvet**: Poiščite modele z določenimi zmožnostmi, ki ustrezajo vašemu primeru uporabe (npr. generiranje kode, kreativno pisanje, analiza).

**⚠️ Opomba**: Modeli, gostovani na GitHubu (t.j. GitHub modeli), so brezplačni za uporabo, vendar so omejeni glede števila zahtev in žetonov. Če želite dostopati do modelov, ki niso na GitHubu (zunanje modele, gostovane prek Azure AI ali drugih končnih točk), boste morali zagotoviti ustrezen API ključ ali avtentikacijo.

### 🚀 Korak 2: Dodajanje in konfiguracija prvega modela

**Strategija izbire modela:**
- **GPT-4.1**: Najboljši za kompleksno razmišljanje in analizo
- **Phi-4-mini**: Lahek, hiter odziv za preproste naloge

**🔧 Postopek konfiguracije:**
1. Izberite **OpenAI GPT-4.1** iz kataloga
2. Kliknite **Add to My Models** - s tem registrirate model za uporabo
3. Izberite **Try in Playground** za zagon testnega okolja
4. Počakajte na inicializacijo modela (prvič lahko traja nekaj trenutkov)

![Playground Setup](../../../../translated_images/sl/playground.dd6f5141344878ca.webp)

**⚙️ Razumevanje parametrov modela:**
- **Temperature**: Nadzoruje kreativnost (0 = determinističen, 1 = kreativen)
- **Max Tokens**: Največja dolžina odgovora
- **Top-p**: Nucleus sampling za raznolikost odgovorov

### 🎯 Korak 3: Obvladajte vmesnik Playground

Playground je vaš laboratorij za eksperimentiranje z AI. Tako lahko kar najbolje izkoristite njegove zmogljivosti:

**🎨 Najboljše prakse za oblikovanje pozivov:**
1. **Bodite specifični**: Jasna, podrobna navodila dajo boljše rezultate
2. **Obvestite kontekst**: Vključite ustrezne ozadinske informacije
3. **Uporabite primere**: Modelu pokažite, kaj želite, z zgledi
4. **Iterirajte**: Izboljšujte pozive glede na začetne rezultate

**🧪 Testni scenariji:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/sl/result.1dfcf211fb359cf6.webp)

### 🏆 Izziv: Primerjava uspešnosti modelov

**🎯 Cilj**: Primerjati različne modele z uporabo enakih pozivov in razumeti njihove prednosti

**📋 Navodila:**
1. Dodajte **Phi-4-mini** v vaše delovno okolje
2. Uporabite enak poziv za GPT-4.1 in Phi-4-mini

![set](../../../../translated_images/sl/set.88132df189ecde2c.webp)

3. Primerjajte kakovost odzivov, hitrost in natančnost
4. Zabeležite svoje ugotovitve v razdelku z rezultati

![Model Comparison](../../../../translated_images/sl/compare.97746cd0f9074955.webp)

**💡 Ključna spoznanja, ki jih želite odkriti:**
- Kdaj uporabiti LLM proti SLM
- Izravnava stroškov in uspešnosti
- Specializirane zmogljivosti različnih modelov

## 🤖 Praktična vaja 2: Gradnja prilagojenih agentov z Agent Builder

**🎯 Cilj**: Ustvariti specializirane AI agente, prilagojene za določene naloge in delovne tokove

### 🏗️ Korak 1: Razumevanje Agent Builder

Agent Builder je tisti del Microsoft Foundry Toolkit, kjer resnično pride do izraza. Omogoča ustvarjanje AI pomočnikov po meri, ki združujejo moč velikih jezikovnih modelov z določenimi navodili, specifičnimi parametri in specializiranim znanjem.

**🧠 Komponente arhitekture agenta:**
- **Osnovni model**: Temeljni LLM (GPT-4, Groks, Phi itd.)
- **Sistemski poziv**: Določa osebnost in vedenje agenta
- **Parametri**: Nastavitve za optimalno delovanje
- **Integracija orodij**: Povezava z zunanjimi API-ji in MCP storitvami
- **Memorija**: Kontekst pogovora in trajnost seje

![Agent Builder Interface](../../../../translated_images/sl/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Korak 2: Podroben pogled na konfiguracijo agenta

**🎨 Ustvarjanje učinkovitih sistemskih pozivov:**
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

*Seveda lahko uporabite tudi Generate System Prompt, da vam AI pomaga ustvariti in optimizirati pozive*

**🔧 Optimizacija parametrov:**
| Parameter | Priporočeno območje | Primer uporabe |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Tehnični/faktični odgovori |
| **Temperature** | 0.7-0.9 | Kreativne/brainstorming naloge |
| **Max Tokens** | 500-1000 | Jedrnati odgovori |
| **Max Tokens** | 2000-4000 | Podrobna pojasnila |

### 🐍 Korak 3: Praktična vaja – agent za Python programiranje

**🎯 Naloga**: Ustvariti specializiranega pomočnika za kodiranje v Pythonu

**📋 Koraki konfiguracije:**

1. **Izbira modela**: Izberite **Claude 3.5 Sonnet** (odličen za kodo)

2. **Oblikovanje sistemskega poziva**:
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

3. **Konfiguracija parametrov**:
   - Temperature: 0.2 (za zanesljivo in dosledno kodo)
   - Max Tokens: 2000 (podrobna pojasnila)
   - Top-p: 0.9 (uravnotežena kreativnost)

![Python Agent Configuration](../../../../translated_images/sl/pythonagent.5e51b406401c165f.webp)

### 🧪 Korak 4: Testiranje vašega Python agenta

**Testni scenariji:**
1. **Osnovna funkcija**: "Ustvari funkcijo za iskanje praštevil"
2. **Kompleksni algoritem**: "Implementiraj binarno iskalno drevo z metodami za vstavljanje, brisanje in iskanje"
3. **Resnični problem**: "Zgradi spletnega pajka, ki upošteva omejitve števila zahtev in poskuse ponovitve"
4. **Odpravljanje napak**: "Popravi to kodo [prilepi težavno kodo]"

**🏆 Merila uspeha:**
- ✅ Koda teče brez napak
- ✅ Vključena je ustrezna dokumentacija
- ✅ Sledi najboljšim praksam v Pythonu
- ✅ Ponuja jasna pojasnila
- ✅ Predlaga izboljšave

## 🎓 Zaključek modula 1 in nadaljnji koraki

### 📊 Preverjanje znanja

Preizkusite svoje znanje:
- [ ] Ali znate pojasniti razliko med modeli v katalogu?
- [ ] Ste uspešno ustvarili in preizkusili lastnega agenta?
- [ ] Ali razumete, kako optimizirati parametre za različne primere uporabe?
- [ ] Ali znate oblikovati učinkovite sistemske pozive?

### 📚 Dodatni viri

- **Dokumentacija Microsoft Foundry Toolkit**: [Uradna Microsoftova dokumentacija](https://github.com/microsoft/vscode-ai-toolkit)
- **Vodnik za oblikovanje pozivov**: [Najboljše prakse](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modeli v Microsoft Foundry Toolkit**: [Modeli v razvoju](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Čestitamo!** Obvladali ste osnove Microsoft Foundry Toolkit in ste pripravljeni graditi bolj napredne AI aplikacije!

### 🔜 Nadaljujte z naslednjim modulom

Pripravljeni na bolj napredne zmogljivosti? Nadaljujte z **[Modulom 2: MCP z osnovami Microsoft Foundry Toolkit](../lab2/README.md)**, kjer se boste naučili:
- Povezati svoje agente z zunanjimi orodji z uporabo Model Context Protocol (MCP)
- Graditi agente za avtomatizacijo brskalnika z Playwright
- Integrirati MCP strežnike s svojimi Microsoft Foundry Toolkit agenti
- Okrepiti svoje agente z zunanjimi podatki in zmogljivostmi

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->