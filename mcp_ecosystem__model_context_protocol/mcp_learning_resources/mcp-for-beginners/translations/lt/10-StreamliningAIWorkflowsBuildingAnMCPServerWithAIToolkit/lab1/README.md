# 🚀 1 modulis: Microsoft Foundry Toolkit pagrindai

[![Trukmė](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Sunkumas](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Išankstiniai reikalavimai](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Mokymosi tikslai

Šio modulio pabaigoje galėsite:
- ✅ Įdiegti ir sukonfigūruoti Microsoft Foundry Toolkit plėtinį VS Code
- ✅ Naršyti Modelių katalogą ir suprasti skirtingus modelių šaltinius
- ✅ Naudoti Playground modelių testavimui ir eksperimentavimui
- ✅ Kurti individualius AI agentus naudojant Agent Builder
- ✅ Palyginti modelių veikimą tarp skirtingų tiekėjų
- ✅ Taikyti geriausias praktikas promptų kūrimui

## 🧠 Įvadas į Microsoft Foundry Toolkit

**Microsoft Foundry Toolkit plėtinys VS Code** yra pagrindinis Microsoft plėtinys, paverčiantis VS Code išsamią AI kūrimo aplinka. Jis sujungia AI tyrimus ir praktinę programų kūrimą, padarydamas generatyviąją AI prieinamą viso lygio kūrėjams.

### 🌟 Pagrindinės galimybės

| Funkcija | Aprašymas | Panaudojimas |
|---------|-------------|----------|
| **🗂️ Modelių katalogas** | Prieiga prie 100+ modelių iš GitHub, ONNX, OpenAI, Anthropic, Google | Modelių atranka ir paieška |
| **🔌 BYOM palaikymas** | Integruokite savo modelius (vietinius/nuotolinius) | Individuali modelių diegimas |
| **🎮 Interaktyvus Playground** | Realiojo laiko modelių testavimas su pokalbių sąsaja | Greita prototipų kūrimas ir testavimas |
| **📎 Daugiarūšis palaikymas** | Dirbti su tekstu, vaizdais ir priedais | Sudėtingos AI programos |
| **⚡ Partijų apdorojimas** | Vykdyti kelis promptus vienu metu | Efektyvus testavimo procesas |
| **📊 Modelių vertinimas** | Integruoti metrikai (F1, aktualumas, panašumas, nuoseklumas) | Veikimo įvertinimas |

### 🎯 Kodėl svarbus Microsoft Foundry Toolkit

- **🚀 Greitesnis vystymas**: nuo idėjos iki prototipo per kelias minutes
- **🔄 Vieningas darbo procesas**: viena sąsaja keliems AI tiekėjams
- **🧪 Lengvi eksperimentai**: lyginkite modelius be sudėtingo nustatymo
- **📈 Paruošta gamybai**: sklandus perėjimas nuo prototipo iki diegimo

## 🛠️ Išankstiniai reikalavimai ir diegimas

### 📦 Įdiekite Microsoft Foundry Toolkit plėtinį

**1 veiksmas: Pasiekite plėtinių parduotuvę**
1. Atidarykite Visual Studio Code
2. Eikite į Plėtinių vaizdą (`Ctrl+Shift+X` arba `Cmd+Shift+X`)
3. Ieškokite „Microsoft Foundry Toolkit“

**2 veiksmas: Pasirinkite versiją**
- **🟢 Leidimas**: Rekomenduojama gamybai
- **🔶 Ankstyvoji versija**: Ankstyva prieiga prie naujausių funkcijų

**3 veiksmas: Įdiekite ir aktyvuokite**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/lt/aitkext.d28945a03eed003c.webp)

### ✅ Patikros atmintinė
- [ ] Microsoft Foundry Toolkit piktograma matoma VS Code šoniniame meniu
- [ ] Plėtinys įjungtas ir aktyvuotas
- [ ] Nėra diegimo klaidų išvesties lange

## 🧪 Praktinė užduotis 1: GitHub modelių tyrinėjimas

**🎯 Tikslas**: Išmokti naudotis Modelių katalogu ir išbandyti pirmąjį AI modelį

### 📊 1 žingsnis: Naršykite Modelių katalogą

Modelių katalogas yra jūsų vartai į AI ekosistemą. Jame sujungiami modeliai iš kelių tiekėjų, todėl lengva surasti ir palyginti pasirinkimus.

**🔍 Navigacijos gidas:**

Spustelėkite **MODELS - Catalog** Microsoft Foundry Toolkit šoniniame meniu

![Model Catalog](../../../../translated_images/lt/aimodel.263ed2be013d8fb0.webp)

**💡 Patarimas**: Ieškokite modelių su specifinėmis galimybėmis, atitinkančiomis jūsų poreikius (pvz., kodo generavimas, kūrybinis rašymas, analizė).

**⚠️ Pastaba**: GitHub talpinami modeliai yra nemokami, bet turi apribojimus pagal užklausų ir tokenų kiekį. Jei norite naudoti ne GitHub modelius (pvz., tuos, kurie veikia per Azure AI ar kitus galus), reikės atitinkamo API rakto arba autentifikacijos.

### 🚀 2 žingsnis: Pridėkite ir sukonfigūruokite pirmąjį modelį

**Modelių pasirinkimo strategija:**
- **GPT-4.1**: Geriausias sudėtingam samprotaujimui ir analizei
- **Phi-4-mini**: Lengvas, greitas atsakymams paprastoms užduotims

**🔧 Konfigūracijos eiga:**
1. Pasirinkite **OpenAI GPT-4.1** kataloge
2. Spustelėkite **Add to My Models** - pridės modelį jūsų naudojimui
3. Pasirinkite **Try in Playground** paleisti testavimo aplinką
4. Palaukite, kol modelis bus inicijuotas (pirmą kartą gali užtrukti)

![Playground Setup](../../../../translated_images/lt/playground.dd6f5141344878ca.webp)

**⚙️ Modelio parametrų supratimas:**
- **Temperature**: Valdo kūrybiškumą (0 = deterministinis, 1 = kūrybingas)
- **Max Tokens**: Maksimalus atsakymo ilgis
- **Top-p**: Branduolio imties nustatymas atsakymo įvairovei

### 🎯 3 žingsnis: Įvaldykite Playground sąsają

Playground yra jūsų AI eksperimentų laboratorija. Kaip maksimaliai išnaudoti jo galimybes:

**🎨 Geriausios praktikos promptų kūrime:**
1. **Būkite konkretūs**: aiškios ir detalios instrukcijos duoda geresnių rezultatų
2. **Teikite kontekstą**: įtraukite svarbią foninę informaciją
3. **Naudokite pavyzdžius**: parodykite modeliui, ko norite pavyzdžiais
4. **Tobulinkite**: tobulinkite promptus pagal pradines išvadas

**🧪 Testavimo scenarijai:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/lt/result.1dfcf211fb359cf6.webp)

### 🏆 Iššūkio užduotis: Modelių veikimo palyginimas

**🎯 Tikslas**: Lyginti skirtingų modelių veikimą naudojant identiškus promptus, kad suprastumėte jų privalumus

**📋 Instrukcijos:**
1. Pridėkite **Phi-4-mini** prie darbo aplinkos
2. Naudokite tą patį promptą GPT-4.1 ir Phi-4-mini

![set](../../../../translated_images/lt/set.88132df189ecde2c.webp)

3. Palyginkite atsakymų kokybę, greitį ir tikslumą
4. Užfiksuokite savo išvadas rezultatuose

![Model Comparison](../../../../translated_images/lt/compare.97746cd0f9074955.webp)

**💡 Ką svarbu suprasti:**
- Kada naudoti LLM prieš SLM
- Kaštų ir našumo kompromisai
- Specifinės skirtingų modelių galimybės

## 🤖 Praktinė užduotis 2: Kurkite individualius agentus su Agent Builder

**🎯 Tikslas**: Sukurti specializuotus AI agentus konkrečioms užduotims ir darbo eigos automatizavimui

### 🏗️ 1 žingsnis: Agent Builder supratimas

Agent Builder – tai vieta, kur Microsoft Foundry Toolkit tikrai išsiskiria. Jis leidžia kurti tikslui skirtas AI pagalbines programas, kurios derina didelių kalbos modelių galią su individualiomis instrukcijomis, specifiniais parametrais ir specializuotomis žiniomis.

**🧠 Agento architektūros komponentai:**
- **Pagrindinis modelis**: pagrindinis LLM (GPT-4, Groks, Phi ir kt.)
- **Sistemos promptas**: apibrėžia agento asmenybę ir elgseną
- **Parametrai**: smulkiai sureguliuotos nustatymai optimaliam veikimui
- **Įrankių integracija**: jungtys su išoriniais API ir MCP paslaugomis
- **Atmintis**: pokalbių kontekstas ir sesijos tęstinumas

![Agent Builder Interface](../../../../translated_images/lt/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ 2 žingsnis: Agentų konfigūracijos giluminis analizavimas

**🎨 Efektyvių sisteminių promptų kūrimas:**
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

*Žinoma, galite naudoti ir Generate System Prompt, kad AI padėtų generuoti ir optimizuoti promptus*

**🔧 Parametrų optimizavimas:**
| Parametras | Rekomenduojamas diapazonas | Naudojimo atvejis |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Techniniai/faktiniai atsakymai |
| **Temperature** | 0.7-0.9 | Kūrybiškos / idėjų generavimo užduotys |
| **Max Tokens** | 500-1000 | Trumpi atsakymai |
| **Max Tokens** | 2000-4000 | Išsamios paaiškinimai |

### 🐍 3 žingsnis: Praktinė užduotis – Python programavimo agentas

**🎯 Misija**: Sukurti specializuotą Python programavimo pagalbininką

**📋 Konfigūracijos žingsniai:**

1. **Modelio pasirinkimas**: Pasirinkite **Claude 3.5 Sonnet** (puikus kodui)

2. **Sistemos prompt dizainas**:
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

3. **Parametrų nustatymai**:
   - Temperature: 0.2 (nuosekliam, patikimam kodui)
   - Max Tokens: 2000 (išsamūs paaiškinimai)
   - Top-p: 0.9 (subalansuotas kūrybiškumas)

![Python Agent Configuration](../../../../translated_images/lt/pythonagent.5e51b406401c165f.webp)

### 🧪 4 žingsnis: Testuokite savo Python agentą

**Testavimo scenarijai:**
1. **Pagrindinė funkcija**: „Sukurk funkciją, kuri randa pirminius skaičius“
2. **Sudėtingas algoritmas**: „Įgyvendink dvejetainės paieškos medį su įdėjimu, šalinimu ir paieškos metodais“
3. **Reali problema**: „Sukurk tinklapio kaupiklį, kuris valdo užklausų apribojimus ir bandymus iš naujo“
4. **Klaidų taisymas**: „Pataisyk šį kodą [įklijuokite klaidingą kodą]“

**🏆 Sėkmės kriterijai:**
- ✅ Kodas veikia be klaidų
- ✅ Yra tinkama dokumentacija
- ✅ Laikosi Python geriausių praktikų
- ✅ Pateikia aiškius paaiškinimus
- ✅ Siūlo patobulinimus

## 🎓 1 modulio apibendrinimas ir tolesni žingsniai

### 📊 Žinių tikrinimas

Patikrinkite savo supratimą:
- [ ] Ar galite paaiškinti skirtumus tarp katalogo modelių?
- [ ] Ar sėkmingai sukūrėte ir išbandėte individualų agentą?
- [ ] Ar suprantate, kaip optimizuoti parametrus skirtingiems atvejams?
- [ ] Ar galite sukurti efektyvius sisteminius promptus?

### 📚 Papildomi ištekliai

- **Microsoft Foundry Toolkit dokumentacija**: [Oficiali Microsoft dokumentacija](https://github.com/microsoft/vscode-ai-toolkit)
- **Promptų kūrimo vadovas**: [Geriausios praktikos](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modeliai Microsoft Foundry Toolkit**: [Modeliai kūrime](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Sveikiname!** Jūs įvaldėte Microsoft Foundry Toolkit pagrindus ir esate pasirengę kurti pažangesnes AI programas!

### 🔜 Toliau į kitą modulį

Norite daugiau pažangių galimybių? Eikite į **[2 modulį: MCP su Microsoft Foundry Toolkit pagrindai](../lab2/README.md)**, kurio metu išmoksite:
- Jungti savo agentus su išoriniais įrankiais naudojant Model Context Protocol (MCP)
- Kurti naršyklės automatizavimo agentus su Playwright
- Integruoti MCP serverius su Microsoft Foundry Toolkit agentais
- Papildyti savo agentus išoriniais duomenimis ir funkcijomis

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->