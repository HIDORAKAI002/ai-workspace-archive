# 🚀 Modulul 1: Fundamentele Microsoft Foundry Toolkit

[![Durată](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Dificultate](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Precondiții](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Obiective de învățare

La finalul acestui modul, vei fi capabil să:
- ✅ Instalezi și configurezi extensia Microsoft Foundry Toolkit pentru VS Code
- ✅ Navighezi în Catalogul de modele și înțelegi diferite surse de modele
- ✅ Folosești Playground pentru testarea și experimentarea modelelor
- ✅ Creezi agenți AI personalizați folosind Agent Builder
- ✅ Compari performanța modelelor între diferiți furnizori
- ✅ Aplici cele mai bune practici pentru ingineria prompturilor

## 🧠 Introducere în Microsoft Foundry Toolkit

**Extensia Microsoft Foundry Toolkit pentru VS Code** este extensia principală Microsoft care transformă VS Code într-un mediu complet de dezvoltare AI. Ea face legătura între cercetarea AI și dezvoltarea practică a aplicațiilor, făcând AI generativ accesibil dezvoltatorilor de toate nivelurile.

### 🌟 Capacități-cheie

| Funcționalitate | Descriere | Caz de utilizare |
|-----------------|-----------|------------------|
| **🗂️ Catalog de modele** | Acces la peste 100 de modele de pe GitHub, ONNX, OpenAI, Anthropic, Google | Descoperire și selecție de modele |
| **🔌 Suport BYOM** | Integrează-ți propriile modele (local/remote) | Implementare de modele personalizate |
| **🎮 Playground Interactiv** | Testarea modelelor în timp real cu interfață de chat | Prototipare și testare rapidă |
| **📎 Suport multimodal** | Manipulează text, imagini și atașamente | Aplicații AI complexe |
| **⚡ Procesare batch** | Rulează mai multe prompturi simultan | Fluxuri de testare eficiente |
| **📊 Evaluarea modelelor** | Metrice integrate (F1, relevanță, similitudine, coerență) | Evaluare a performanței |

### 🎯 De ce este important Microsoft Foundry Toolkit

- **🚀 Dezvoltare accelerată**: De la idee la prototip în câteva minute
- **🔄 Flux unificat**: O singură interfață pentru mai mulți furnizori AI
- **🧪 Experimentare ușoară**: Compară modele fără configurări complexe
- **📈 Pregătit pentru producție**: Tranziție lină de la prototip la implementare

## 🛠️ Precondiții & Configurare

### 📦 Instalarea extensiei Microsoft Foundry Toolkit

**Pasul 1: Accesează piața de extensii**
1. Deschide Visual Studio Code
2. Navighează la vizualizarea Extensii (`Ctrl+Shift+X` sau `Cmd+Shift+X`)
3. Caută „Microsoft Foundry Toolkit”

**Pasul 2: Alege versiunea ta**
- **🟢 Versiune stabilă**: Recomandată pentru utilizare în producție
- **🔶 Versiune pre-release**: Acces anticipat la funcții de ultimă oră

**Pasul 3: Instalează și activează**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/ro/aitkext.d28945a03eed003c.webp)

### ✅ Listă de verificare pentru instalare
- [ ] Iconița Microsoft Foundry Toolkit apare în bara laterală din VS Code
- [ ] Extensia este activată și funcțională
- [ ] Nu există erori la instalare în panoul de output

## 🧪 Exercițiul practic 1: Explorarea modelelor GitHub

**🎯 Obiectiv**: Stăpânește Catalogul de modele și testează primul tău model AI

### 📊 Pasul 1: Navighează în Catalogul de modele

Catalogul de modele este poarta ta către ecosistemul AI. El agregă modele de la mai mulți furnizori, facilitând descoperirea și compararea opțiunilor.

**🔍 Ghid de navigare:**

Click pe **MODELS - Catalog** în bara laterală Microsoft Foundry Toolkit

![Catalog de modele](../../../../translated_images/ro/aimodel.263ed2be013d8fb0.webp)

**💡 Sfat practic**: Caută modele cu capabilități specifice potrivite pentru cazul tău de utilizare (ex: generare de cod, scris creativ, analiză).

**⚠️ Notă**: Modelele găzduite pe GitHub (adică Modele GitHub) sunt gratuite, dar sunt supuse unor limite de rată pentru cereri și tokenuri. Pentru a accesa modele non-GitHub (modele externe găzduite prin Azure AI sau alte endpointuri), trebuie să furnizezi cheia API sau autentificarea corespunzătoare.

### 🚀 Pasul 2: Adaugă și configurează primul model

**Strategie de selecție a modelului:**
- **GPT-4.1**: Cel mai bun pentru raționament complex și analiză
- **Phi-4-mini**: Ușor, răspunsuri rapide pentru sarcini simple

**🔧 Proces de configurare:**
1. Selectează **OpenAI GPT-4.1** din catalog
2. Click pe **Add to My Models** - înregistrează modelul pentru utilizare
3. Alege **Try in Playground** pentru a lansa mediul de testare
4. Așteaptă inițializarea modelului (configurarea inițială poate dura puțin)

![Configurare Playground](../../../../translated_images/ro/playground.dd6f5141344878ca.webp)

**⚙️ Înțelegerea parametrilor modelului:**
- **Temperature**: Controlează creativitatea (0 = determinist, 1 = creativ)
- **Max Tokens**: Lungimea maximă a răspunsului
- **Top-p**: Sampling tip nucleu pentru diversitatea răspunsului

### 🎯 Pasul 3: Stăpânește interfața Playground

Playground este laboratorul tău de experimentare AI. Iată cum să-i maximizezi potențialul:

**🎨 Cele mai bune practici pentru ingineria prompturilor:**
1. **Fii specific**: Instrucțiuni clare și detaliate oferă rezultate mai bune
2. **Oferă context**: Include informații relevante de fundal
3. **Folosește exemple**: Arată modelului ce dorești cu exemple
4. **Iterează**: Ajustează prompturile în funcție de rezultatele inițiale

**🧪 Scenarii de testare:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Rezultate test](../../../../translated_images/ro/result.1dfcf211fb359cf6.webp)

### 🏆 Exercițiu provocare: Compararea performanței modelelor

**🎯 Scop**: Compară diferite modele folosind aceleași prompturi pentru a înțelege punctele lor forte

**📋 Instrucțiuni:**
1. Adaugă **Phi-4-mini** în spațiul de lucru
2. Folosește același prompt pentru GPT-4.1 și Phi-4-mini

![set](../../../../translated_images/ro/set.88132df189ecde2c.webp)

3. Compară calitatea răspunsului, viteza și acuratețea
4. Documentează concluziile în secțiunea rezultate

![Compararea modelelor](../../../../translated_images/ro/compare.97746cd0f9074955.webp)

**💡 Descoperiri-cheie:**
- Când să folosești LLM vs SLM
- Raportul cost vs performanță
- Capabilități specializate ale diferitelor modele

## 🤖 Exercițiul practic 2: Construirea de agenți personalizați cu Agent Builder

**🎯 Obiectiv**: Creează agenți AI specializați adaptați pentru sarcini și fluxuri de lucru specifice

### 🏗️ Pasul 1: Înțelegerea Agent Builder

Agent Builder este locul în care Microsoft Foundry Toolkit strălucește cu adevărat. Îți permite să creezi asistenți AI specifici, care combină puterea modelelor mari de limbaj cu instrucțiuni personalizate, parametri specifici și cunoștințe specializate.

**🧠 Componente arhitecturale ale agentului:**
- **Modelul de bază**: Modelul LLM fundamental (GPT-4, Groks, Phi etc.)
- **Promptul sistem**: Definirea personalității și comportamentului agentului
- **Parametrii**: Setări fine pentru performanță optimă
- **Integrarea uneltelor**: Conectarea la API externe și servicii MCP
- **Memoria**: Contextul conversației și persistența sesiunii

![Interfața Agent Builder](../../../../translated_images/ro/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Pasul 2: Detaliu configurare agent

**🎨 Crearea de prompturi sistem eficiente:**
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

*Desigur, poți folosi și Generate System Prompt pentru a folosi AI în generarea și optimizarea prompturilor*

**🔧 Optimizarea parametrilor:**
| Parametru | Interval recomandat | Caz de utilizare |
|-----------|---------------------|------------------|
| **Temperature** | 0.1-0.3 | Răspunsuri tehnice/factice |
| **Temperature** | 0.7-0.9 | Sarcini creative/de brainstorming |
| **Max Tokens** | 500-1000 | Răspunsuri concise |
| **Max Tokens** | 2000-4000 | Explicații detaliate |

### 🐍 Pasul 3: Exercițiu practic - Agent de programare Python

**🎯 Misiune**: Creează un asistent specializat pentru cod Python

**📋 Pașii de configurare:**

1. **Selectarea modelului**: Alege **Claude 3.5 Sonnet** (excelent pentru cod)

2. **Designul promptului sistem**:
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

3. **Configurarea parametrilor**:
   - Temperature: 0.2 (pentru cod constant și fiabil)
   - Max Tokens: 2000 (explicații detaliate)
   - Top-p: 0.9 (creativitate echilibrată)

![Configurare agent Python](../../../../translated_images/ro/pythonagent.5e51b406401c165f.webp)

### 🧪 Pasul 4: Testarea agentului Python

**Scenarii de test:**
1. **Funcție de bază**: „Creează o funcție pentru găsirea numerelor prime”
2. **Algoritm complex**: „Implementează un arbore binar de căutare cu metode de inserare, ștergere și căutare”
3. **Problema din lumea reală**: „Construiește un web scraper care gestionează limitarea ratelor și retry-uri”
4. **Debugging**: „Remediază acest cod [lipește cod buggy]”

**🏆 Criterii de succes:**
- ✅ Codul rulează fără erori
- ✅ Include documentație corespunzătoare
- ✅ Respectă bunele practici Python
- ✅ Oferă explicații clare
- ✅ Sugerează îmbunătățiri

## 🎓 Recapitulare Modul 1 & Pași următori

### 📊 Verificare cunoștințe

Testează-ți înțelegerea:
- [ ] Poți explica diferențele dintre modelele din catalog?
- [ ] Ai creat și testat cu succes un agent personalizat?
- [ ] Înțelegi cum să optimizezi parametri pentru diverse cazuri?
- [ ] Poți proiecta prompturi de sistem eficiente?

### 📚 Resurse suplimentare

- **Documentația Microsoft Foundry Toolkit**: [Documentația oficială Microsoft](https://github.com/microsoft/vscode-ai-toolkit)
- **Ghid de inginerie a prompturilor**: [Cele mai bune practici](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modele în Microsoft Foundry Toolkit**: [Modele în dezvoltare](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Felicitări!** Ai stăpânit fundamentele Microsoft Foundry Toolkit și ești gata să construiești aplicații AI mai avansate!

### 🔜 Continuă cu următorul modul

Pregătit pentru capabilități mai avansate? Continuă cu **[Modulul 2: MCP cu Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** unde vei învăța cum să:
- Conectezi agenții tăi la unelte externe folosind Model Context Protocol (MCP)
- Construiești agenți de automatizare cu Playwright
- Integrezi servere MCP cu agenții Microsoft Foundry Toolkit
- Îmbunătățești agenții cu date și capabilități externe

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->