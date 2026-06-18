# 🐙 Moodul 4: Praktiline MCP arendus - Kohandatud GitHub klooni server

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Kiire algus:** Ehitage tootmisvalmis MCP server, mis automatiseerib GitHub hoidlates kloonimise ja VS Code integratsiooni kõigest 30 minutiga!

## 🎯 Õpieesmärgid

Selle töötoa lõpuks suudate:

- ✅ Luua kohandatud MCP serveri päriselu arendusvoogude jaoks
- ✅ Rakendada GitHub hoidla kloonimise funktsionaalsust MCP kaudu
- ✅ Integreerida kohandatud MCP servereid VS Code ja Agent Builderiga
- ✅ Kasutada GitHub Copilot Agent Mode’i koos kohandatud MCP tööriistadega
- ✅ Testida ja juurutada kohandatud MCP servereid tootmiskeskkonnas

## 📋 Eeltingimused

- Laborite 1–3 lõpetamine (MCP alused ja edasijõudnud arendus)
- GitHub Copiloti tellimus ([tasuta registreerimine saadaval](https://github.com/github-copilot/signup))
- VS Code koos Microsoft Foundry Toolkiti ja GitHub Copiloti laiendustega
- Git CLI installitud ja konfigureeritud

## 🏗️ Projekti ülevaade

### **Päriselu arendusväljakutse**
Arendajatena kasutame sageli GitHubi, et kloonida hoidlaid ja avada neid VS Codes või VS Code Insiders’is. See käsitsi protsess hõlmab:
1. Terminali/käsurea avamist
2. Soovitud kausta navigeerimist
3. `git clone` käsu käivitamist
4. VS Code’i avamist kloonitud kaustas

**Meie MCP lahendus muudab selle üheks nutikaks käsuks!**

### **Mida sa ehitad**
**GitHub Clone MCP Serveri** (`git_mcp_server`), mis pakub:

| Funktsioon | Kirjeldus | Kasu |
|---------|-------------|---------|
| 🔄 **Nutikas hoidla kloonimine** | GitHub hoidlate kloonimine koos valideerimisega | Automaatne vigade kontroll |
| 📁 **Nutikas kaustahaldus** | Kaustade turvaline kontroll ja loomine | Vältib olemasoleva asendamist |
| 🚀 **Platvormideülene VS Code integratsioon** | Avab projektid VS Codes/Insiders’is | Sujuv töövoo üleminek |
| 🛡️ **Tugev vigade käsitlemine** | Võrguprobleemide, õiguste ja teedega seotud vigade käsitlemine | Tootmiskõlblik usaldusväärsus |

---

## 📖 Samm-sammuline rakendamine

### Samm 1: Loo GitHub Agent Agent Builderis

1. **Käivita Agent Builder** Microsoft Foundry Toolkiti laienduse kaudu
2. **Loo uus agent** järgmise konfiguratsiooniga:
   ```
   Agent Name: GitHubAgent
   ```

3. **Initsialiseeri kohandatud MCP server:**
   - Liigu **Tööriistad** → **Lisa tööriist** → **MCP server**
   - Vali **"Loo uus MCP server"**
   - Vali **Python mall** maksimaalse paindlikkuse jaoks
   - **Serveri nimi:** `git_mcp_server`

### Samm 2: Konfigureeri GitHub Copilot Agent Mode

1. **Ava GitHub Copilot** VS Codes (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Vali Agent mudel** Copiloti liideses
3. **Vali Claude 3.7 mudel** paremate järeldusvõimete jaoks
4. **Luba MCP integratsioon** tööriistade juurdepääsuks

> **💡 Pro näpunäide:** Claude 3.7 annab suurepärase arusaamise arendusvoogudest ja vigade haldamise mustritest.

### Samm 3: Rakenda põhifunktsionaalsus MCP serveris

**Kasuta allpool toodud üksikasjalikku prompti GitHub Copilot Agent Mode’iga:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Samm 4: Testi oma MCP serverit

#### 4a. Testi Agent Builderis

1. **Käivita Agent Builderi silumisrežiim**
2. **Konfigureeri oma agent selle süsteemipromptiga:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testi reaalse kasutaja stsenaariumitega:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/et/DebugAgent.81d152370c503241.webp)

**Oodatud tulemused:**
- ✅ Kloonimine õnnestub ja tee kinnitatakse
- ✅ VS Code avaneb automaatselt
- ✅ Selged veateated vigaste stsenaariumide korral
- ✅ Äärmusjuhtude korrektne käsitlemine

#### 4b. Testi MCP Inspectoris


![MCP Inspector Testing](../../../../translated_images/et/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Palju õnne!** Olete edukalt loonud praktilise, tootmiskõlbuliku MCP serveri, mis lahendab reaalseid arendusvoo väljakutseid. Teie kohandatud GitHub klooni server demonstreerib MCP jõudu arendajate tootlikkuse automatiseerimisel ja täiustamisel.

### 🏆 Saavutused:
- ✅ **MCP arendaja** - Loonud kohandatud MCP serveri
- ✅ **Töövoo automatiseerija** - Sujuvdanud arendusprotsesse  
- ✅ **Integratsiooni ekspert** - Ühendatud mitu arendustööriista
- ✅ **Tootmiskõlbulik** - Loonud juurutatavad lahendused

---

## 🎓 Töötoa lõpetamine: Teekond Model Context Protocoliga

**Kallis töötoa osaleja,**

Palju õnne kõigi nelja Model Context Protocoli mooduli läbimise puhul! Olete jõudnud kaugele baas Microsoft Foundry Toolkiti mõistmisest kuni tootmisvalmis MCP serverite ehitamiseni, mis lahendavad tõelisi arendusväljakutseid.

### 🚀 Teie õpitee kokkuvõte:

**[Moodul 1](../lab1/README.md)**: Alustasite Microsoft Foundry Toolkiti aluste uurimise, mudelite testimise ja esimese AI agendi loomisega.

**[Moodul 2](../lab2/README.md)**: Õppisite MCP arhitektuuri, integreerisite Playwright MCP ning ehitasite oma esimese brauseri automatiseerimise agendi.

**[Moodul 3](../lab3/README.md)**: Jõudsite edasijõudnuna kohandatud MCP serveri arenduseni Weather MCP serveriga ja valdasite silumisvahendeid.

**[Moodul 4](../lab4/README.md)**: Rakendasite kõike praktikas, luues praktilise GitHubi hoidla töövoo automatiseerimisvahendi.

### 🌟 Mida olete valdanud:

- ✅ **Microsoft Foundry Toolkit ökosüsteem**: Mudelid, agendid ja integratsioonimustrid
- ✅ **MCP arhitektuur**: Kliendi-serveri disain, transportprotokollid ja turvalisus
- ✅ **Arendustööriistad**: Alates Playground’ist kuni Inspector’ini ja tootmisse juurutamiseni
- ✅ **Kohandatud arendus**: Oma MCP serverite ehitamine, testimine ja juurutamine
- ✅ **Praktilised rakendused**: Reaalsete töövoogude väljakutsete lahendamine AI abil

### 🔮 Teie järgmised sammud:

1. **Ehitage oma MCP server**: Kasutage neid oskusi oma ainulaadsete töövoogude automatiseerimiseks
2. **Liituge MCP kogukonnaga**: Jagage oma loomingut ja õppige teistelt
3. **Uurige edasijõudnud integratsiooni**: Ühendage MCP serverid ettevõtte süsteemidega
4. **Panustage avatud lähtekoodiga**: Aidake paranada MCP tööriistu ja dokumentatsiooni

Pidage meeles, et see töötuba on alles algus. Model Context Protocoli ökosüsteem areneb kiiresti ja nüüd olete valmis olema AI-võimeliste arendustööriistade esirinnas.

**Täname osalemise ja pühendumise eest õppimisele!**

Loodame, et see töötuba lõi ideid, mis muudavad teie AI tööriistade loomist ja kasutamist arendusprotsessis.

**Head kodeerimist!**

---

## Mis edasi

Palju õnne kõikide laborite läbimise puhul moodulis 10!

- Tagasi: [Moodul 10 ülevaade](../README.md)
- Jätka: [Moodul 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->