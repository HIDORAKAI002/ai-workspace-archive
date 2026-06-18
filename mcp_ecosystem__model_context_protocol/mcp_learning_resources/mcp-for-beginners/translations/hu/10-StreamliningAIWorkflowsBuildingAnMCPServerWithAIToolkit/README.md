# AI Munkafolyamatok Egyszerűsítése: MCP Szerver Építése a Microsoft Foundry Toolkit-kel

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/hu/logo.ec93918ec338dadd.webp)

## 🎯 Áttekintés

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/hu/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Kattintson a fenti képre, hogy megnézze az óra videóját)_

Üdvözöljük a **Model Context Protocol (MCP) Workshopon**! Ez az átfogó gyakorlati műhely két élvonalbeli technológiát ötvöz, hogy forradalmasítsa az AI alkalmazásfejlesztést:

- **🔗 Model Context Protocol (MCP)**: Egy nyílt szabvány a zökkenőmentes AI-eszköz integrációhoz
- **🛠️ Microsoft Foundry Toolkit kiterjesztés VS Code-hoz**: A Microsoft hatékony AI fejlesztői kiterjesztése

### 🎓 Amit megtanul

A workshop végére elsajátítja az intelligens alkalmazások építésének művészetét, amelyek összekapcsolják az AI modelleket a valós eszközökkel és szolgáltatásokkal. Az automatikus teszteléstől a személyre szabott API integrációkig praktikus képességeket szerez a bonyolult üzleti kihívások megoldására.

## 🏗️ Technológiai háttér

### 🔌 Model Context Protocol (MCP)

Az MCP a **"USB-C az AI számára"** – egy univerzális szabvány, amely összekapcsolja az AI modelleket külső eszközökkel és adatforrásokkal.

**✨ Főbb jellemzők:**

- 🔄 **Szabványosított integráció**: Univerzális interfész AI-eszköz kapcsolatokhoz
- 🏛️ **Rugalmas architektúra**: Helyi és távoli szerverek stdio/SSE szállításon keresztül
- 🧰 **Gazdag ökoszisztéma**: Eszközök, felhívások és erőforrások egy protokollban
- 🔒 **Vállalati szintű**: Beépített biztonság és megbízhatóság

**🎯 Miért fontos az MCP:**
Ahogy az USB-C eltüntette a kábelrengeteget, úgy az MCP is megszünteti az AI integrációk bonyolultságát. Egy protokoll, végtelen lehetőségek.

### 🤖 Microsoft Foundry Toolkit kiterjesztés VS Code-hoz

A Microsoft zászlóshajó AI fejlesztői kiterjesztése, amely a VS Code-ot AI erőművé alakítja.

**🚀 Fő képességek:**

- 📦 **Model Katalógus**: Hozzáférés modellekhez Azure AI, GitHub, Hugging Face, Ollama oldaláról
- ⚡ **Helyi következtetés**: ONNX-optimalizált CPU/GPU/NPU futtatás
- 🏗️ **Ügynöképítő**: Vizuális AI ügynök fejlesztés MCP integrációval
- 🎭 **Multi-modális**: Szöveges, látvány- és strukturált output támogatás

**💡 Fejlesztési előnyök:**

- Zero-konfigurációs modell telepítés
- Vizuális felhívás tervező
- Valós idejű tesztelő játszótér
- Zökkenőmentes MCP szerver integráció

## 📚 Tanulási út

### [🚀 1. modul: Microsoft Foundry Toolkit alapjai](./lab1/README.md)

**Időtartam**: 15 perc

- 🛠️ Telepítse és konfigurálja a Microsoft Foundry Toolkitet VS Code-hoz
- 🗂️ Fedezze fel a Model Katalógust (100+ modell GitHub, ONNX, OpenAI, Anthropic, Google oldalról)
- 🎮 Sajátítsa el az Interaktív Játszóteret valós idejű modellteszteléshez
- 🤖 Építse meg első AI ügynökét az Agent Builder-rel
- 📊 Értékelje a modell teljesítményt beépített mérőszámokkal (F1, relevancia, hasonlóság, koherencia)
- ⚡ Tanulja meg a kötegelt feldolgozást és a multi-modális támogatást

**🎯 Tanulási eredmény**: Funkcionális AI ügynök létrehozása a Microsoft Foundry Toolkit képességeinek átfogó ismeretével

### [🌐 2. modul: MCP a Microsoft Foundry Toolkit-kel](./lab2/README.md)

**Időtartam**: 20 perc

- 🧠 Sajátítsa el a Model Context Protocol (MCP) architektúráját és fogalmait
- 🌐 Fedezze fel a Microsoft MCP szerver ökoszisztémáját
- 🤖 Építsen böngésző automatizációs ügynököt a Playwright MCP szerverrel
- 🔧 Integrálja az MCP szervereket a Microsoft Foundry Toolkit Agent Builder-rel
- 📊 Konfigurálja és tesztelje az MCP eszközöket az ügynökeiben
- 🚀 Exportálja és telepítse az MCP-vel támogatott ügynököket éles használatra

**🎯 Tanulási eredmény**: AI ügynök telepítése külső eszközökkel felturbózva MCP-n keresztül

### [🔧 3. modul: Haladó MCP fejlesztés Microsoft Foundry Toolkit-kel](./lab3/README.md)

**Időtartam**: 20 perc

- 💻 Egyedi MCP szerverek létrehozása a Microsoft Foundry Toolkit használatával
- 🐍 Legújabb MCP Python SDK (v1.9.3) telepítése és használata
- 🔍 MCP Inspector beállítása és használata hibakereséshez
- 🛠️ Időjárás MCP Szerver építése professzionális hibakeresési munkafolyamatokkal
- 🧪 MCP szerverek hibakeresése az Agent Builder és az Inspector környezetekben

**🎯 Tanulási eredmény**: Egyedi MCP szerverek fejlesztése és hibakeresése modern eszközökkel

### [🐙 4. modul: Gyakorlati MCP fejlesztés – Egyedi GitHub Clone szerver](./lab4/README.md)

**Időtartam**: 30 perc

- 🏗️ Valós GitHub Clone MCP Szerver építése fejlesztési munkafolyamatokhoz
- 🔄 Okos tároló klónozás megvalósítása validációval és hibakezeléssel
- 📁 Intelligens könyvtárkezelés és VS Code integráció létrehozása
- 🤖 GitHub Copilot Ügynök mód használata egyedi MCP eszközökkel
- 🛡️ Éles használatra készen megbízhatóság és többplatformos kompatibilitás alkalmazása

**🎯 Tanulási eredmény**: Éles használatra kész MCP szerver telepítése, amely hatékonyabbá teszi a valós fejlesztési munkafolyamatokat

## 💡 Valós Alkalmazások és Hatás

### 🏢 Vállalati Felhasználási Esetek

#### 🔄 DevOps Automatizáció

Fejlessze fejlesztési munkafolyamatait intelligens automatizációval:

- **Okos Tárolókezelés**: AI-alapú kódáttekintés és egyesítési döntések
- **Intelligens CI/CD**: Automatizált pipeline optimalizáció kódváltozások alapján
- **Hibák kezelése**: Automatikus hibafelosztás és hozzárendelés

#### 🧪 Minőségbiztosítás Forradalma

Emelje magasabb szintre a tesztelést AI által vezérelt automatizációval:

- **Intelligens Tesztgenerálás**: Átfogó tesztcsomagok automatikus létrehozása
- **Vizuális Regressziós Tesztelés**: AI-alapú UI változás detektálás
- **Teljesítmény Monitorozás**: Proaktív hibafelismerés és megoldás

#### 📊 Adatfeldolgozó Pipeline Intelligencia

Építsen okosabb adatfeldolgozó munkafolyamatokat:

- **Adaptív ETL folyamatok**: Önoptimalizáló adat-transzformációk
- **Anomália detektálás**: Valós idejű adatminőség ellenőrzés
- **Intelligens útválasztás**: Okos adatfolyam-kezelés

#### 🎧 Ügyfélélmény Fejlesztése

Teremtsen kivételes ügyfélinterakciókat:

- **Kontextus-érzékeny támogatás**: AI ügynökök ügyféltörténet hozzáféréssel
- **Proaktív probléma-megoldás**: Prediktív ügyfélszolgálat
- **Többcsatornás integráció**: Egységes AI élmény platformokon átívelően

## 🛠️ Előfeltételek & Beállítás

### 💻 Rendszerkövetelmények

| Összetevő | Követelmény | Megjegyzés |
|-----------|-------------|------------|
| **Operációs Rendszer** | Windows 10+, macOS 10.15+, Linux | Bármely modern rendszer |
| **Visual Studio Code** | Legfrissebb stabil verzió | Szükséges a Microsoft Foundry Toolkithez |
| **Node.js** | v18.0+ és npm | MCP szerver fejlesztéshez |
| **Python** | 3.10+ | Opcionális Python MCP szerverekhez |
| **Memória** | Minimum 8GB RAM | 16GB ajánlott helyi modellekhez |

### 🔧 Fejlesztői környezet

#### Ajánlott VS Code kiterjesztések

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - Opcionális, de hasznos

#### Opcionális eszközök

- **uv**: Modern Python csomagkezelő
- **MCP Inspector**: Visual debug eszköz MCP szerverekhez
- **Playwright**: Web automatizációs példákhoz

## 🎖️ Tanulási eredmények & Minősítési út

### 🏆 Készségfejlesztési ellenőrzőlista

A workshop elvégzése után mesterfokon fogja kezelni:

#### 🎯 Alapvető kompetenciák

- [ ] **MCP Protokoll ismerete**: Mély architektúra- és implementációs minták ismerete
- [ ] **Microsoft Foundry Toolkit jártasság**: Szakértői szintű használat gyors fejlesztéshez
- [ ] **Egyedi szerver fejlesztés**: Éles MCP szerverek építése, telepítése és karbantartása
- [ ] **Eszköz integráció kiválóság**: AI zökkenőmentes kapcsolása meglévő fejlesztési munkafolyamatokkal
- [ ] **Problémamegoldó alkalmazás**: Tanult készségek alkalmazása valós üzleti kihívásokra

#### 🔧 Műszaki képességek

- [ ] Microsoft Foundry Toolkit beállítása és konfigurálása VS Code-ban
- [ ] Egyedi MCP szerverek tervezése és megvalósítása
- [ ] GitHub modellek integrálása MCP architektúrával
- [ ] Automatizált tesztelési munkafolyamatok építése Playwright-tal
- [ ] AI ügynökök telepítése éles használatra
- [ ] MCP szerver teljesítményének hibakeresése és optimalizálása

#### 🚀 Haladó képességek

- [ ] Vállalati méretű AI integrációk architektúrájának tervezése
- [ ] Biztonsági legjobb gyakorlatok megvalósítása AI alkalmazásokhoz
- [ ] Skálázható MCP szerver architektúrák tervezése
- [ ] Egyedi eszköz láncok létrehozása speciális területekre
- [ ] Mások mentorálása AI-natív fejlesztésben

## 📖 További források

- [MCP Specifikáció (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHub tár](https://github.com/microsoft/vscode-ai-toolkit)
- [MCP Szerverek Mintagyűjteménye](https://github.com/modelcontextprotocol/servers)
- [Legjobb Gyakorlatok Útmutató](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Biztonsági legjobb gyakorlatok

---

**🚀 Készen áll az AI fejlesztési munkafolyamat forradalmasítására?**

Építsük együtt az intelligens alkalmazások jövőjét az MCP és a Microsoft Foundry Toolkit segítségével!

## Mi következik

Folytassa: [11. modul: MCP Szerver Gyakorlati Laborok](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->