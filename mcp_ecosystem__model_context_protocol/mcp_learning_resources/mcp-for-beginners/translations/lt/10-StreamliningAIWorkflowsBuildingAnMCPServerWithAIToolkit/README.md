# Dirbtinio intelekto darbo eigos supaprastinimas: MCP serverio kūrimas su Microsoft Foundry Toolkit

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/lt/logo.ec93918ec338dadd.webp)

## 🎯 Apžvalga

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/lt/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Spustelėkite aukščiau esantį paveikslėlį, norėdami peržiūrėti šios pamokos vaizdo įrašą)_

Sveiki atvykę į **Model Context Protocol (MCP) dirbtuves**! Šios išsamios praktinės dirbtuvės sujungia dvi pažangiausias technologijas, kurios pertvarko DI programų kūrimą:

- **🔗 Model Context Protocol (MCP)**: atviras standartas sklandžiam DI įrankių integravimui
- **🛠️ Microsoft Foundry Toolkit išplėtimas VS Code**: Microsoft galingas DI kūrimo įrankis

### 🎓 Ko Išmoksite

Šių dirbtuvių pabaigoje mokėsite kurti intelektualias programas, jungiančias DI modelius su realiais įrankiais ir paslaugomis. Nuo automatizuoto testavimo iki pasirinktinių API integracijų – įgysite praktinių įgūdžių spręsti sudėtingas verslo problemas.

## 🏗️ Technologijų Rinkinys

### 🔌 Model Context Protocol (MCP)

MCP yra **„USB-C DI“** – universalus standartas, kuris sujungia DI modelius su išoriniais įrankiais ir duomenų šaltiniais.

**✨ Pagrindinės savybės:**

- 🔄 **Standartizuota integracija**: Universalus sąsajos standartas DI įrankių jungčiai
- 🏛️ **Lanksti architektūra**: Vietiniai ir nuotoliniai serveriai per stdio/SSE transportą
- 🧰 **Turtinga ekosistema**: Įrankiai, užklausos ir ištekliai viename protokole
- 🔒 **Įmonėms tinkama**: Integruota sauga ir patikimumas

**🎯 Kodėl MCP svarbus:**
Kaip USB-C panaikino laidų chaosą, taip MCP panaikina DI integracijų sudėtingumą. Vienas protokolas, begalinės galimybės.

### 🤖 Microsoft Foundry Toolkit išplėtimas VS Code

Microsoft pagrindinis DI kūrimo išplėtimas, kuris paverčia VS Code į DI galingą aplinką.

**🚀 Pagrindinės galimybės:**

- 📦 **Modelių katalogas**: Prieiga prie modelių iš Azure AI, GitHub, Hugging Face, Ollama
- ⚡ **Vietinė inferencija**: ONNX optimizuotas CPU/GPU/NPU vykdymas
- 🏗️ **Agentų kūrėjas**: Vizualus DI agentų kūrimas su MCP integracija
- 🎭 **Daugiakanalis palaikymas**: Tekstas, vizija ir struktūrizuotas išėjimas

**💡 Kūrimo privalumai:**

- Nulinė konfigūracija diegiant modelius
- Vizualinė užklausų kūrimo sistema
- Realiojo laiko testavimo aikštelė
- Sklandi MCP serverio integracija

## 📚 Mokymosi Kelionė

### [🚀 1 modulis: Microsoft Foundry Toolkit pagrindai](./lab1/README.md)

**Trukmė**: 15 minučių

- 🛠️ Įdiegti ir sukonfigūruoti Microsoft Foundry Toolkit VS Code
- 🗂️ Išnagrinėti Modelių katalogą (100+ modelių iš GitHub, ONNX, OpenAI, Anthropic, Google)
- 🎮 Įvaldyti Interaktyvią testavimo vietą realiu laiku
- 🤖 Sukurti pirmą DI agentą su Agentų kūrėju
- 📊 Įvertinti modelio veikimą naudojant įmontuotus metrikus (F1, aktualumą, panašumą, nuoseklumą)
- ⚡ Išmokti partijų apdorojimą ir daugiakanalio palaikymo galimybes

**🎯 Mokymosi rezultatas**: Sukurti funkcinį DI agentą ir išsamiai suprasti Microsoft Foundry Toolkit galimybes

### [🌐 2 modulis: MCP su Microsoft Foundry Toolkit pagrindai](./lab2/README.md)

**Trukmė**: 20 minučių

- 🧠 Įvaldyti Model Context Protocol (MCP) architektūrą ir koncepcijas
- 🌐 Pažinti Microsoft MCP serverių ekosistemą
- 🤖 Sukurti naršyklės automatizavimo agentą naudojant Playwright MCP serverį
- 🔧 Integruoti MCP serverius su Microsoft Foundry Toolkit Agentų kūrėju
- 📊 Sukonfigūruoti ir išbandyti MCP įrankius agentuose
- 🚀 Eksportuoti ir diegti MCP palaikomus agentus gamybai

**🎯 Mokymosi rezultatas**: Diegti DI agentą, kuris efektyviai naudoja išorinius įrankius per MCP

### [🔧 3 modulis: Pažangus MCP kūrimas su Microsoft Foundry Toolkit](./lab3/README.md)

**Trukmė**: 20 minučių

- 💻 Kurti individualius MCP serverius naudojant Microsoft Foundry Toolkit
- 🐍 Konfigūruoti ir naudoti naujausią MCP Python SDK (v1.9.3)
- 🔍 Nustatyti ir naudoti MCP Inspector derinimui
- 🛠️ Kurti Orų MCP serverį su profesionaliomis derinimo darbo eigos funkcijomis
- 🧪 Derinti MCP serverius tiek Agentų kūrėjo, tiek Inspector aplinkose

**🎯 Mokymosi rezultatas**: Vystyti ir derinti individualius MCP serverius su moderniais įrankiais

### [🐙 4 modulis: Praktinis MCP kūrimas – Individualus GitHub klonuotojas serveris](./lab4/README.md)

**Trukmė**: 30 minučių

- 🏗️ Kurti realų GitHub klonavimo MCP serverį, skirtą vystymo darbo srautams
- 🔄 Įgyvendinti išmanų repozitorijų klonavimą su validacija ir klaidų valdymu
- 📁 Kurti intelektualų katalogų valdymą ir VS Code integraciją
- 🤖 Naudoti GitHub Copilot Agento režimą su individualiais MCP įrankiais
- 🛡️ Taikyti gamybai tinkamą patikimumą ir daugiaplatfromiškumą

**🎯 Mokymosi rezultatas**: Įdiegti gamybai paruoštą MCP serverį, kuris supaprastina tikrus vystymo procesus

## 💡 Realaus pasaulio taikymai ir įtaka

### 🏢 Įmonių naudojimo scenarijai

#### 🔄 DevOps automatizavimas

Transformuokite savo vystymo darbo eigą protinga automatika:

- **Išmanus repozitorijų valdymas**: DI pagrįsti kodo peržiūros ir sujungimo sprendimai
- **Išmanus CI/CD**: Automatizuotas vamzdynų optimizavimas pagal kodo pokyčius
- **Klaidų klasifikavimas**: Automatinis klaidų klasifikavimas ir priskyrimas

#### 🧪 Kokybės užtikrinimo revoliucija

Pakelkite testavimą į kitą lygį su DI valdomais sprendimais:

- **Išmanus testų generavimas**: Automatinis išsamų testų rinkinio kūrimas
- **Vizualinis regresijos testavimas**: DI pagrįstas UI pokyčių aptikimas
- **Veiklos stebėsena**: Proaktyvus problemų identifikavimas ir sprendimas

#### 📊 Duomenų srauto intelektas

Kurkite išmanesnius duomenų apdorojimo darbo srautus:

- **Adaptuojami ETL procesai**: Savarankiškai optimizuojamos duomenų transformacijos
- **Anomalijų aptikimas**: Realiojo laiko duomenų kokybės stebėsena
- **Išmanus maršrutavimas**: Protingas duomenų srauto valdymas

#### 🎧 Klientų patirties gerinimas

Kurkite išskirtines klientų sąveikas:

- **Konteksto suvokianti pagalba**: DI agentai su prieiga prie kliento istorijos
- **Proaktyvus problemų sprendimas**: Prognozuojanti klientų aptarnavimo sistema
- **Daugialypė integracija**: Vieninga DI patirtis įvairiose platformose

## 🛠️ Reikalavimai ir paruošimas

### 💻 Sistemos reikalavimai

| Komponentas | Reikalavimas | Pastabos |
|-------------|--------------|----------|
| **Operacinė sistema** | Windows 10+, macOS 10.15+, Linux | Bet kuri moderni OS |
| **Visual Studio Code** | Naujausia stabili versija | Reikalinga Microsoft Foundry Toolkit |
| **Node.js** | v18.0+ ir npm | MCP serverio kūrimui |
| **Python** | 3.10+ | Pasirinktinai Python MCP serveriams |
| **Atmintis** | Mažiausiai 8GB RAM | Rekomenduojama 16GB vietiniams modeliams |

### 🔧 Vystymo aplinka

#### Rekomenduojami VS Code išplėtimai

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python derintuvas** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) – pasirenkamas, bet naudingas

#### Pasirinktiniai įrankiai

- **uv**: Modernus Python paketų valdymas
- **MCP Inspector**: Vizualinis MCP serverių derintojas
- **Playwright**: Interneto automatizavimo pavyzdžiams

## 🎖️ Įgūdžių įsisavinimas ir sertifikavimo kelias

### 🏆 Įgūdžių meistriškumo sąrašas

Užbaigus šias dirbtuves, įgysite meistriškumą šiose srityse:

#### 🎯 Pagrindiniai gebėjimai

- [ ] **MCP protokolo išmanymas**: Gili architektūros ir įgyvendinimo modelių supratimas
- [ ] **Microsoft Foundry Toolkit profesionalumas**: Ekspertinis Microsoft Foundry Toolkit naudojimas sparčiam kūrimui
- [ ] **Individualių serverių kūrimas**: MCP serverių kūrimas, diegimas ir palaikymas gamybai
- [ ] **Įrankių integravimo kompetencija**: Sklandi DI susiejimas su esamais vystymo procesais
- [ ] **Probleminių uždavinių sprendimas**: Įgytų įgūdžių taikymas realiose verslo užduotyse

#### 🔧 Techniniai įgūdžiai

- [ ] Microsoft Foundry Toolkit diegimas ir konfigūravimas VS Code
- [ ] Individualių MCP serverių projektavimas ir įgyvendinimas
- [ ] GitHub modelių integravimas su MCP architektūra
- [ ] Automatizuoto testavimo darbo srautų kūrimas su Playwright
- [ ] DI agentų diegimas gamybiniam naudojimui
- [ ] MCP serverių derinimas ir našumo optimizavimas

#### 🚀 Pažangios galimybės

- [ ] Įmonių masto DI integracijų architektūra
- [ ] Saugaus DI programų kūrimo geriausia praktika
- [ ] Skalabilių MCP serverių architektūrų kūrimas
- [ ] Specializuotų įrankių grandinių kūrimas specifinėms sritims
- [ ] Kitų mokymas DI gimtosios plėtros srityje

## 📖 Papildomi šaltiniai

- [MCP specifikacija (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHub saugykla](https://github.com/microsoft/vscode-ai-toolkit)
- [Pavyzdiniai MCP serveriai](https://github.com/modelcontextprotocol/servers)
- [Geriausių praktikų vadovas](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Saugumo geriausios praktikos

---

**🚀 Pasiruošę revoliucionizuoti savo DI kūrimo darbo eigą?**

Kurkime kartu intelektualių programų ateitį su MCP ir Microsoft Foundry Toolkit!

## Kas toliau

Tęsti į: [11 modulis: MCP serverio praktinės dirbtuvės](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->