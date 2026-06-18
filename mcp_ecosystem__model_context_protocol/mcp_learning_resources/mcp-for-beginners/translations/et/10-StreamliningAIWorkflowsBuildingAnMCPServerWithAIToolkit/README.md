# Tehisintellekti töövoogude lihtsustamine: MCP-serveri loomine Microsoft Foundry tööriistakomplektiga

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/et/logo.ec93918ec338dadd.webp)

## 🎯 Ülevaade

[![Ehita AI-agente VS Code'is: 4 praktilist laborit MCP ja Microsoft Foundry tööriistakomplektiga](../../../translated_images/et/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Klõpsake ülaloleval pildil, et vaadata selle õppetunni videot)_

Tere tulemast **Model Context Protocol (MCP) töötoale**! See põhjalik praktiline töötoa ühendab kaks tipptasemel tehnoloogiat, et revolutsioneerida tehisintellekti rakenduste arendust:

- **🔗 Model Context Protocol (MCP)**: Avatud standard sujuvaks AI-tööriistade integratsiooniks
- **🛠️ Microsoft Foundry Toolkit laiendus VS Code'ile**: Microsofti võimas AI arenduslaiendus

### 🎓 Mida sa õpid

Selle töötoa lõpuks valdad oskuse ehitada intelligentseid rakendusi, mis ühendavad AI mudelid reaalse maailma tööriistade ja teenustega. Alates automaatsest testimisest kuni kohandatud API integratsioonideni – saad praktilised oskused keeruliste äriprobleemide lahendamiseks.

## 🏗️ Tehnoloogia virn

### 🔌 Model Context Protocol (MCP)

MCP on **„USB-C tehisintellektile”** – universaalne standard, mis ühendab AI mudelid väliste tööriistade ja andmeallikatega.

**✨ Põhifunktsioonid:**

- 🔄 **Standardiseeritud integratsioon**: Universaalne liides AI-tööriistade ühendamiseks
- 🏛️ **Paindlik arhitektuur**: Kohalikud ja kaugserverid stdio/SSE transpordiga
- 🧰 **Rikas ökosüsteem**: Tööriistad, promptid ja ressursid ühes protokollis
- 🔒 **Ettevõttevalmis**: Sisseehitatud turvalisus ja usaldusväärsus

**🎯 Miks MCP on oluline:**
Nagu USB-C likvideeris kaablisegaduse, nii lihtsustab MCP AI integratsioonide keerukust. Üks protokoll, lõputud võimalused.

### 🤖 Microsoft Foundry Toolkit laiendus VS Code'ile

Microsofti lipulaeva AI arenduslaiendus, mis muudab VS Code'i AI võimsusjaamaks.

**🚀 Peamised võimed:**

- 📦 **Mudeliluettelo**: Ligipääs mudelitele Azure AI, GitHub, Hugging Face, Ollama'st
- ⚡ **Kohalik inference**: ONNX-optimeeritud CPU/GPU/NPU täitmine
- 🏗️ **Agendi ehitaja**: Visuaalne AI-agendi loomine MCP integratsiooniga
- 🎭 **Mitme modaalne**: Teksti, nägemise ja struktureeritud väljundi tugi

**💡 Arenduse eelised:**

- Null-konfiguratsiooniga mudelide juurutus
- Visuaalne promptide inseneritöö
- Reaalaja testimismänguväljak
- Sujuv MCP serveri integratsioon

## 📚 Õppimisteekond

### [🚀 Moodul 1: Microsoft Foundry Toolkiti põhialused](./lab1/README.md)

**Kestus**: 15 minutit

- 🛠️ Paigaldamine ja konfigureerimine Microsoft Foundry Toolkitiga VS Code'is
- 🗂️ Mudeliluettelo uurimine (üle 100 mudeli GitHub, ONNX, OpenAI, Anthropic, Google'st)
- 🎮 Visuaalse mänguväljakuga modelleerimise praktika reaalajas
- 🤖 Esimese AI-agendi loomine Agent Builder'iga
- 📊 Mudeli jõudluse hindamine sisseehitatud mõõdikutega (F1, asjakohasus, sarnasus, kooskõla)
- ⚡ Õpi partiitöötlust ja mitme modaalsuse tuge

**🎯 Õpitulemus**: Loo funktsionaalne AI-agent koos põhjaliku arusaamisega Microsoft Foundry Toolkiti võimetest

### [🌐 Moodul 2: MCP koos Microsoft Foundry Toolkitiga](./lab2/README.md)

**Kestus**: 20 minutit

- 🧠 Õpi Model Context Protocol (MCP) arhitektuuri ja kontseptsioone
- 🌐 Uuri Microsofti MCP serverite ökosüsteemi
- 🤖 Ehita brauseri automatiseerimise agent Playwright MCP serveriga
- 🔧 Integreeri MCP serverid Microsoft Foundry Toolkit Agent Builderiga
- 📊 Seadista ja testi MCP tööriistu agentides
- 🚀 Eksporti ja juuruta MCP-toega agente tootmiskeskkonnaks

**🎯 Õpitulemus**: Juuruta AI-agent, mida võimendavad välised tööriistad MCP kaudu

### [🔧 Moodul 3: Täiustatud MCP arendus Microsoft Foundry Toolkitiga](./lab3/README.md)

**Kestus**: 20 minutit

- 💻 Loo kohandatud MCP servereid Microsoft Foundry Toolkitiga
- 🐍 Seadista ja kasuta uusimat MCP Python SDK-d (v1.9.3)
- 🔍 Kasuta MCP Inspectorit silumiseks
- 🛠️ Ehita ilmaprognoosi MCP server professionaalse silumisvooga
- 🧪 Sildi MCP servereid nii Agent Builderis kui ka Inspectoris

**🎯 Õpitulemus**: Arenda ja silu kohandatud MCP servereid moodsate tööriistadega

### [🐙 Moodul 4: Praktiseerimine MCP arenduses – Kohandatud GitHubi klooni server](./lab4/README.md)

**Kestus**: 30 minutit

- 🏗️ Ehita päriseluline GitHub Clone MCP server arendusvoogude jaoks
- 🔄 Rakenda nutikat repositooriumi kloonimist valideerimise ja vigade käitlemisega
- 📁 Loo intelligentne kataloogihaldus ja VS Code integratsioon
- 🤖 Kasuta GitHub Copilot agenti kohandatud MCP tööriistadega
- 🛡️ Rakenda tootmiskõlblikku usaldusväärsust ja platvormideülest ühilduvust

**🎯 Õpitulemus**: Juuruta tootmiskõlblik MCP server, mis lihtsustab tegelikke arendusvooge

## 💡 Pärismaailma rakendused ja mõju

### 🏢 Ettevõtte kasutusjuhtumid

#### 🔄 DevOps automatiseerimine

Muuda oma arendusvoogu intelligentse automatiseerimisega:

- **Nutikas repositooriumihaldus**: AI-põhine koodikontroll ja ühendamisotsused
- **Intelligentne CI/CD**: Automaatne torujuhtme optimeerimine koodimuudatuste põhjal
- **Probleemide triage**: Veateadete automaatne klassifitseerimine ja määramine

#### 🧪 Kvaliteedi tagamise revolutsioon

Tõsta testimist AI-põhise automatiseerimise abil:

- **Intelligentne testide genereerimine**: Automaatne põhjalike testikomplektide loomine
- **Visuaalne regressioonitestimine**: AI-põhine kasutajaliidese muutuste detekteerimine
- **Jõudluse jälgimine**: Proaktiivne probleemide avastamine ja lahendamine

#### 📊 Andmevoogude intelligentsus

Ehita targemaid andmetöötlusvooge:

- **Adaptiivsed ETL protsessid**: Iseteenindavad andmetransformatsioonid
- **Anomaaliate tuvastus**: Reaalajas andmekvaliteedi jälgimine
- **Intelligentne marsruutimine**: Nutikas andmevoogude haldus

#### 🎧 Kliendikogemuse parandamine

Loo erakordsed kliendisuhted:

- **Kontekstitundlik tugi**: AI-agendid kliendi ajaloo ligipääsuga
- **Proaktiivne probleemide lahendus**: Ennustav klienditeenindus
- **Mitme kanali integratsioon**: Ühtne AI kogemus platvormide vahel

## 🛠️ Nõuded ja seadistamine

### 💻 Süsteeminõuded

| Komponent | Nõue | Märkused |
|-----------|-------------|-------|
| **Operatsioonisüsteem** | Windows 10+, macOS 10.15+, Linux | Igas modernses OS |
| **Visual Studio Code** | Viimane stabiilne versioon | Nõutud Microsoft Foundry Toolkit jaoks |
| **Node.js** | v18.0+ ja npm | MCP serveri arenduseks |
| **Python** | 3.10+ | Valikuline Python MCP serveritele |
| **Mälu** | Vähemalt 8GB RAM | 16GB soovitatav kohalike mudelite jaoks |

### 🔧 Arenduskeskkond

#### Soovitatud VS Code laiendused

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - Valikuline, kuid kasulik

#### Valikulised tööriistad

- **uv**: Moodne Python pakihaldur
- **MCP Inspector**: MCP serverite visuaalne silumisvahend
- **Playwright**: Veebiautomaadi näidiste jaoks

## 🎖️ Õpitulemused ja sertifitseerimistee

### 🏆 Oskuste valdamise kontrollnimekiri

Selle töötoa läbimisel saavutad:

#### 🎯 Põhioskused

- [ ] **MCP protokolli valdamine**: Sügav arusaam arhitektuurist ja rakendusmustritest
- [ ] **Microsoft Foundry Toolkiti pädevus**: Ekspertiis Microsoft Foundry Toolkit'i kiireks kasutamiseks
- [ ] **Kohandatud serveri arendus**: Tootmiskõlblike MCP serverite loomine, juurutamine ja hooldus
- [ ] **Tööriistade integratsiooni meisterlikkus**: AI sujuv ühendamine olemasolevatesse arendusvoogudesse
- [ ] **Probleemilahenduse rakendamine**: Õpitu rakendamine reaalsetes äriliste väljakutsetes

#### 🔧 Tehnilised oskused

- [ ] Microsoft Foundry Toolkiti seadistamine ja konfigureerimine VS Code'is
- [ ] Kohandatud MCP serverite kavandamine ja rakendamine
- [ ] GitHubi mudelite integreerimine MCP arhitektuuriga
- [ ] Automaatse testimise töövoogude loomine Playwrightiga
- [ ] AI-agentide juurutamine tootmiskeskkonnas
- [ ] MCP serveri jõudluse silumine ja optimeerimine

#### 🚀 Täiustatud võimed

- [ ] Ettevõtteulatuslike AI integratsioonide arhitektuuride kavandamine
- [ ] Turvapraktikate rakendamine AI rakendustele
- [ ] Skaalautuvate MCP serveri arhitektuuride kujundamine
- [ ] Kohandatud tööriistade komplektide loomine spetsiifilistele valdkondadele
- [ ] Teiste juhendamine AI-natiivses arenduses

## 📖 Lisaressursid

- [MCP Spetsifikatsioon (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHubi hoidla](https://github.com/microsoft/vscode-ai-toolkit)
- [Näidis MCP serverite kogu](https://github.com/modelcontextprotocol/servers)
- [Parimate tavade juhend](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turbetavad praktikad

---

**🚀 Oled valmis revolutsioneerima oma AI arendusvoogu?**

Loome koos targemate rakenduste tuleviku MCP ja Microsoft Foundry Toolkitiga!

## Mis järgmine on

Jätka: [Moodul 11: MCP serveri praktilised laborid](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->