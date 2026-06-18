# 🚀 1. modul: Microsoft Foundry Toolkit alapok

[![Időtartam](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Nehézség](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Előfeltételek](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Tanulási célok

A modul végére képes leszel:
- ✅ Telepíteni és konfigurálni a Microsoft Foundry Toolkit VS Code bővítményt
- ✅ Navigálni a Modell Katalógusban és megérteni a különféle modellforrásokat
- ✅ Használni a Playground-t a modellek tesztelésére és kísérletezésre
- ✅ Egyedi AI ügynököket létrehozni az Agent Builder segítségével
- ✅ Összehasonlítani a modellek teljesítményét különböző szolgáltatóknál
- ✅ Alkalmazni a helyes prompt tervezési gyakorlatokat

## 🧠 Bevezetés a Microsoft Foundry Toolkit-be

A **Microsoft Foundry Toolkit kiterjesztés a VS Code-hoz** a Microsoft zászlóshajója, amely a VS Code-ot átfogó AI fejlesztői környezetté alakítja. Áthidalja az AI kutatás és a gyakorlati alkalmazás fejlesztése közti szakadékot, így a generatív AI elérhetővé válik minden fejlesztő számára tudásszinttől függetlenül.

### 🌟 Fő képességek

| Funkció | Leírás | Használati eset |
|---------|-------------|----------|
| **🗂️ Modell Katalógus** | Több mint 100 modell elérése GitHub-ról, ONNX-ről, OpenAI-ról, Anthropic-ról, Google-ről | Modellek felfedezése és kiválasztása |
| **🔌 BYOM támogatás** | Saját modellek integrálása (helyi/távoli) | Egyedi modell telepítés |
| **🎮 Interaktív Playground** | Valós idejű modell tesztelés csevegő felülettel | Gyors prototípus készítés és tesztelés |
| **📎 Többmodalitás támogatás** | Szöveg, képek és csatolmányok kezelése | Összetett AI alkalmazások |
| **⚡ Tömeges feldolgozás** | Több prompt egyidejű futtatása | Hatékony tesztelési munkafolyamatok |
| **📊 Modell értékelés** | Beépített metrikák (F1, relevancia, hasonlóság, koherencia) | Teljesítmény értékelése |

### 🎯 Miért fontos a Microsoft Foundry Toolkit

- **🚀 Gyorsított fejlesztés**: Ötlettől a prototípusig percek alatt
- **🔄 Egységes munkafolyamat**: Egy felület több AI szolgáltatóhoz
- **🧪 Egyszerű kísérletezés**: Modellek összehasonlítása bonyolult beállítás nélkül
- **📈 Éles használatra kész**: Zökkenőmentes átmenet prototípusról éles üzemre

## 🛠️ Előfeltételek és beállítás

### 📦 A Microsoft Foundry Toolkit bővítmény telepítése

**1. lépés: Bővítmények piactérének megnyitása**
1. Nyisd meg a Visual Studio Code-ot
2. Navigálj a Bővítmények nézetre (`Ctrl+Shift+X` vagy `Cmd+Shift+X`)
3. Keresd meg a "Microsoft Foundry Toolkit" bővítményt

**2. lépés: Válaszd ki a verziót**
- **🟢 Kiadás**: Ajánlott éles használatra
- **🔶 Előzetes verzió**: Korai hozzáférés a legújabb funkciókhoz

**3. lépés: Telepítés és aktiválás**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/hu/aitkext.d28945a03eed003c.webp)

### ✅ Ellenőrző lista
- [ ] A Microsoft Foundry Toolkit ikon megjelenik a VS Code oldalsávban
- [ ] A bővítmény engedélyezett és aktivált
- [ ] Nincsenek telepítési hibák a kimeneti panelen

## 🧪 Gyakorlati feladat 1: GitHub modellek felfedezése

**🎯 Cél:** Sajátítsd el a Modell Katalógus használatát és teszteld első AI modelledet

### 📊 1. lépés: Navigálj a Modell Katalógusban

A Modell Katalógus a kapud az AI ökoszisztémához. Több szolgáltató modelljeit gyűjti össze, megkönnyítve azok felfedezését és összehasonlítását.

**🔍 Navigációs útmutató:**

Kattints a **MODELS - Catalog** elemre a Microsoft Foundry Toolkit oldalsávban

![Model Catalog](../../../../translated_images/hu/aimodel.263ed2be013d8fb0.webp)

**💡 Tipp:** Keress olyan modelleket, amelyek specifikus képességekkel rendelkeznek, amelyek illenek az esetedhez (például kódgenerálás, kreatív írás, elemzés).

**⚠️ Megjegyzés**: A GitHub-on tárolt modellek (GitHub Modellek) ingyenesen használhatók, de kérés- és tokenkorlátozások vonatkoznak rájuk. Ha nem-GitHub modellekhez szeretnél hozzáférni (például Azure AI vagy egyéb végpontok által hosztolt külső modellek), akkor megfelelő API kulcsot vagy hitelesítést kell biztosítanod.

### 🚀 2. lépés: Add hozzá és konfiguráld első modelledet

**Modell kiválasztási stratégia:**
- **GPT-4.1**: Komplex érveléshez és elemzéshez a legjobb
- **Phi-4-mini**: Könnyű, gyors válaszokat ad egyszerűbb feladatokhoz

**🔧 Konfiguráció lépései:**
1. Válaszd ki a katalógusból az **OpenAI GPT-4.1** modellt
2. Kattints az **Add to My Models** gombra - ez regisztrálja a modellt használatra
3. Válaszd a **Try in Playground** opciót a tesztelési környezet indításához
4. Várj a modell inicializálására (az első indítás egy kis időt vehet igénybe)

![Playground Setup](../../../../translated_images/hu/playground.dd6f5141344878ca.webp)

**⚙️ Modell paraméterek megértése:**
- **Temperature**: Kreativitás szabályozása (0 = determinisztikus, 1 = kreatív)
- **Max Tokens**: Válasz maximális hossza
- **Top-p**: Nucleus mintavételezés a válasz diverzitásához

### 🎯 3. lépés: Ismerd meg a Playground felületét

A Playground az AI kísérletező laborod. Így használhatod ki maximálisan:

**🎨 Prompt tervezési legjobb gyakorlatok:**
1. **Legyél konkrét**: A világos, részletes utasítások jobb eredményt adnak
2. **Adj kontextust**: Tartalmazz releváns háttérinformációkat
3. **Használj példákat**: Mutasd meg a modellnek, mit vársz el példákon keresztül
4. **Iterálj**: Finomítsd a promptokat az első eredmények alapján

**🧪 Tesztelési szcenáriók:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/hu/result.1dfcf211fb359cf6.webp)

### 🏆 Kihívás: Modell teljesítmény összehasonlítás

**🎯 Cél:** Azonos promptokkal hasonlítsd össze különböző modellek erősségeit

**📋 Utasítások:**
1. Add hozzá a munkaasztalodhoz a **Phi-4-mini** modellt
2. Használj azonos promptot mind GPT-4.1, mind Phi-4-mini esetében

![set](../../../../translated_images/hu/set.88132df189ecde2c.webp)

3. Hasonlítsd össze a válaszok minőségét, sebességét és pontosságát
4. Dokumentáld az eredményeket a jelentés szekcióban

![Model Comparison](../../../../translated_images/hu/compare.97746cd0f9074955.webp)

**💡 Fő felismerések:**
- Mikor érdemes LLM-et használni, mikor SLM-et
- Költség és teljesítmény kompromisszumok
- Különleges képességek az egyes modelleknél

## 🤖 Gyakorlati feladat 2: Egyedi ügynökök építése az Agent Builder-rel

**🎯 Cél:** Speciális AI ügynökök létrehozása konkrét feladatokra és munkafolyamatokra

### 🏗️ 1. lépés: Ismerd meg az Agent Buildert

Az Agent Builder az a hely, ahol a Microsoft Foundry Toolkit igazán kiteljesedik. Segítségével célzott AI asszisztenseket hozhatsz létre, amelyek ötvözik a nagyméretű nyelvi modellek erejét egyedi utasításokkal, specifikus paraméterekkel és speciális tudással.

**🧠 Ügynök architektúra komponensek:**
- **Alapmodell**: Az alap LLM (GPT-4, Groks, Phi, stb.)
- **Rendszer prompt**: Meghatározza az ügynök személyiségét és viselkedését
- **Paraméterek**: Finomhangolt beállítások a legjobb teljesítményért
- **Eszköz integráció**: Külső API-k és MCP szolgáltatások csatlakoztatása
- **Memória**: Beszélgetési kontextus és munkamenet állandósága

![Agent Builder Interface](../../../../translated_images/hu/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ 2. lépés: Ügynök konfiguráció mélyrehatóan

**🎨 Hatékony rendszer promptok létrehozása:**
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

*Természetesen használhatod a Generate System Prompt funkciót is, hogy az AI segítsen a promptok generálásában és optimalizálásában*

**🔧 Paraméter optimalizálás:**
| Paraméter | Ajánlott tartomány | Használati eset |
|-----------|------------------|----------|
| **Temperature** | 0.1-0.3 | Műszaki/faktuális válaszok |
| **Temperature** | 0.7-0.9 | Kreatív/ötletelős feladatok |
| **Max Tokens** | 500-1000 | Tömör válaszok |
| **Max Tokens** | 2000-4000 | Részletes magyarázatok |

### 🐍 3. lépés: Gyakorlati feladat - Python programozó ügynök

**🎯 Küldetés:** Készíts egy speciális Python kódoló asszisztenst

**📋 Konfigurációs lépések:**

1. **Modell kiválasztása:** Válaszd a **Claude 3.5 Sonnet** modellt (kiváló kódhoz)

2. **Rendszer prompt tervezése:**
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

3. **Paraméterek beállítása:**
   - Temperature: 0.2 (következetes, megbízható kódhoz)
   - Max Tokens: 2000 (részletes magyarázatok)
   - Top-p: 0.9 (kiegyensúlyozott kreativitás)

![Python Agent Configuration](../../../../translated_images/hu/pythonagent.5e51b406401c165f.webp)

### 🧪 4. lépés: Teszteld Python ügynöködet

**Teszt szcenáriók:**
1. **Alap függvény**: "Készíts függvényt prímszámok keresésére"
2. **Összetett algoritmus**: "Valósíts meg egy bináris keresőfát beszúrás, törlés és keresés metódusokkal"
3. **Való világ probléma**: "Készíts web scraping scriptet, amely kezeli a kérési limitet és a próbálkozásokat"
4. **Hibakeresés**: "Javítsd ki ezt a kódot [illeszd be a hibás kódot]"

**🏆 Sikerkritériumok:**
- ✅ Hibamentes futás
- ✅ Megfelelő dokumentáció
- ✅ Python helyes gyakorlatok követése
- ✅ Egyértelmű magyarázatok
- ✅ Javítási javaslatok

## 🎓 1. modul összefoglaló & következő lépések

### 📊 Tudásellenőrzés

Teszteld a tudásodat:
- [ ] El tudod magyarázni a katalógusbeli modellek közötti különbséget?
- [ ] Sikeresen létrehoztál és teszteltél egy egyedi ügynököt?
- [ ] Érted, hogyan kell paramétereket optimalizálni különböző esetekhez?
- [ ] Tudsz hatékony rendszer promptokat tervezni?

### 📚 További források

- **Microsoft Foundry Toolkit dokumentáció**: [Hivatalos Microsoft Docs](https://github.com/microsoft/vscode-ai-toolkit)
- **Prompt tervezési útmutató**: [Legjobb gyakorlatok](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modellek a Microsoft Foundry Toolkit-ben**: [Fejlesztés alatt álló modellek](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Gratulálunk!** Elsajátítottad a Microsoft Foundry Toolkit alapjait, készen állsz összetettebb AI alkalmazások építésére!

### 🔜 Tovább a következő modulra

Készen állsz a haladóbb képességekre? Folytasd a **[2. modul: MCP a Microsoft Foundry Toolkit alapjaihoz](../lab2/README.md)** modulnál, ahol megtanulod:
- Hogyan csatlakoztasd ügynökeidet külső eszközökhöz Model Context Protocol (MCP) segítségével
- Böngésző automatizálási ügynökök létrehozását Playwright használatával
- MCP szerverek integrálását Microsoft Foundry Toolkit ügynökeiddel
- Ügynökeid felpörgetését külső adatokkal és képességekkel

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->