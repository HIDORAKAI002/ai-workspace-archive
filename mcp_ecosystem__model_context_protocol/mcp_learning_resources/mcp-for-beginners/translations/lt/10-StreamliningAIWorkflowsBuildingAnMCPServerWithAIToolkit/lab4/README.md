# 🐙 Modulis 4: Praktinis MCP kūrimas – Pasirinktinis GitHub klono serveris

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Greitas paleidimas:** Sukurkite produkcijai tinkamą MCP serverį, kuris automatizuoja GitHub saugyklų klonavimą ir VS Code integraciją per vos 30 minučių!

## 🎯 Mokymosi tikslai

Baigę šį laboratorinį darbą galėsite:

- ✅ Kurti pasirinktinius MCP serverius realiems kūrimo procesams
- ✅ Įgyvendinti GitHub saugyklų klonavimą per MCP
- ✅ Integruoti pasirinktinius MCP serverius su VS Code ir Agent Builder įrankiais
- ✅ Naudoti GitHub Copilot Agent režimą su pasirinktinais MCP įrankiais
- ✅ Testuoti ir diegti pasirinktinius MCP serverius gamybos aplinkose

## 📋 Reikalavimai

- Baigti laboratorinius darbus 1–3 (MCP pagrindai ir pažangus kūrimas)
- GitHub Copilot prenumerata ([nemokamas registracijos variantas](https://github.com/github-copilot/signup))
- VS Code su Microsoft Foundry Toolkit ir GitHub Copilot plėtiniais
- Įdiegta ir sukonfigūruota Git komandinės eilutės priemonė

## 🏗️ Projekto apžvalga

### **Realaus pasaulio kūrimo iššūkis**
Kaip kūrėjai, mes dažnai naudojame GitHub klonuoti saugyklas ir atidaryti jas VS Code arba VS Code Insiders. Šis rankinis procesas apima:
1. Terminalo / komandų eilutės atidarymą
2. Navigavimą į norimą katalogą
3. `git clone` komandos vykdymą
4. VS Code paleidimą klonuotame kataloge

**Mūsų MCP sprendimas tai supaprastina į vieną išmanią komandą!**

### **Ką sukursite**
**GitHub Clone MCP serverį** (`git_mcp_server`), kuris suteikia:

| Funkcija | Aprašymas | Privalumas |
|---------|-------------|---------|
| 🔄 **Išmanus saugyklų klonavimas** | Klonuoti GitHub saugyklas su patikrinimu | Automatinis klaidų tikrinimas |
| 📁 **Išmanus katalogų valdymas** | Patikrinti ir saugiai sukurti katalogus | Neleidžia perrašyti duomenų |
| 🚀 **Daugiasystemė VS Code integracija** | Atidaryti projektus VS Code/Insiders | Sklandus darbo perėjimas |
| 🛡️ **Tvirtas klaidų valdymas** | Tvarkyti tinklo, leidimų ir kelių problemas | Produkcijai tinkama patikimumas |

---

## 📖 Žingsnis po žingsnio įgyvendinimas

### 1 žingsnis: Sukurkite GitHub agentą Agent Builder

1. **Paleiskite Agent Builder** per Microsoft Foundry Toolkit plėtinį
2. **Sukurkite naują agentą** su šia konfigūracija:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inicijuokite pasirinktinius MCP serverį:**
   - Eikite į **Tools** → **Add Tool** → **MCP Server**
   - Pasirinkite **"Create A new MCP Server"**
   - Pasirinkite **Python šabloną** dėl didžiausio lankstumo
   - **Serverio pavadinimas:** `git_mcp_server`

### 2 žingsnis: Konfigūruokite GitHub Copilot Agent režimą

1. **Atidarykite GitHub Copilot** VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Pasirinkite Agent modelį** Copilot sąsajoje
3. **Pasirinkite Claude 3.7 modelį** dėl pagerintų samprotavimo galimybių
4. **Įjungti MCP integraciją** įrankių prieigai

> **💡 Naudingas patarimas:** Claude 3.7 suteikia geresnį supratimą apie kūrimo procesus ir klaidų tvarkymo modelius.

### 3 žingsnis: Įgyvendinkite pagrindinius MCP serverio funkcionalumus

**Naudokite šią išsamų promptą su GitHub Copilot Agent režimu:**

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

### 4 žingsnis: Išbandykite savo MCP serverį

#### 4a. Testavimas Agent Builder

1. **Paleiskite debug konfigūraciją** Agent Builder
2. **Sukonfigūruokite agentą su šiuo sistemos promptu:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testuokite realistiškuose naudotojo scenarijuose:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/lt/DebugAgent.81d152370c503241.webp)

**Tikėtini rezultatai:**
- ✅ Sėkmingas klonavimas su kelio patvirtinimu
- ✅ Automatinis VS Code paleidimas
- ✅ Aiškios klaidų žinutės netinkamoms situacijoms
- ✅ Tinkamas kraštutinių atvejų tvarkymas

#### 4b. Testavimas MCP Inspector


![MCP Inspector Testing](../../../../translated_images/lt/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Sveikiname!** Jūs sėkmingai sukūrėte praktišką, gamybai tinkamą MCP serverį, kuris sprendžia tikrus kūrimo darbo eigos iššūkius. Jūsų pasirinktinis GitHub klono serveris demonstruoja MCP galimybes automatizuoti ir pagerinti kūrėjo produktyvumą.

### 🏆 Pasiekimai:
- ✅ **MCP kūrėjas** – Sukūrė pasirinktinius MCP serverius
- ✅ **Darbo eigos automatizatorius** – Supaprastino kūrimo procesus  
- ✅ **Integracijos ekspertas** – Sujungė kelis kūrimo įrankius
- ✅ **Gamybai pasiruošęs** – Sukūrė diegiamus sprendimus

---

## 🎓 Dirbtuvės užbaigimas: Jūsų kelionė su Model Context Protocol

**Gerbiamas dirbtuvių dalyvi,**

Sveikiname jus baigus visas keturias Model Context Protocol dirbtuvių modulius! Jūs nuejote ilgą kelią nuo Microsoft Foundry Toolkit pagrindų supratimo iki gamybai tinkamų MCP serverių kūrimo, sprendžiančių realius kūrimo iššūkius.

### 🚀 Jūsų mokymosi kelias trumpai:

**[Modulis 1](../lab1/README.md)**: Pradėjote tyrinėdami Microsoft Foundry Toolkit pagrindus, modelių testavimą ir pirmojo AI agento kūrimą.

**[Modulis 2](../lab2/README.md)**: Išmokote MCP architektūrą, integravote Playwright MCP ir sukūrėte pirmąjį naršyklės automatizavimo agentą.

**[Modulis 3](../lab3/README.md)**: Patobulinote pasirinktinių MCP serverių kūrimą su Weather MCP serveriu ir įvaldėte derinimo įrankius.

**[Modulis 4](../lab4/README.md)**: Dabar pritaikėte viską, kad sukurtumėte praktišką GitHub saugyklos darbo eigos automatizavimo įrankį.

### 🌟 Įvaldėte:

- ✅ **Microsoft Foundry Toolkit ekosistemą**: Modeliai, agentai ir integracijos modeliai
- ✅ **MCP architektūrą**: Klientų-serverių dizainas, transporto protokolai ir saugumas
- ✅ **Kūrimo įrankius**: Nuo Playground iki Inspector iki gamybos diegimo
- ✅ **Pasirinktinius sprendimus**: Kūrimą, testavimą ir diegimą savo MCP serveriams
- ✅ **Praktinį taikymą**: Spręsti realius darbo eigos iššūkius su AI

### 🔮 Tolimesni žingsniai:

1. **Sukurkite savo MCP serverį**: Pritaikykite šias žinias automatizuoti savo unikalius procesus
2. **Prisijunkite prie MCP bendruomenės**: Dalinkitės kūriniais ir mokykitės iš kitų
3. **Tyrinėkite pažangią integraciją**: Jungkite MCP serverius su įmonių sistemomis
4. **Prisidėkite prie atviro kodo**: Pagerinkite MCP įrankius ir dokumentaciją

Atminkite, kad šios dirbtuvės yra tik pradžia. Model Context Protocol ekosistema sparčiai vystosi, ir dabar jūs esate pasiruošę būti AI varomų kūrimo įrankių priešakyje.

**Dėkojame už dalyvavimą ir mokymosi atsidavimą!**

Tikimės, kad šios dirbtuvės įkvėpė idėjų, kurios pakeis jūsų požiūrį į AI įrankių kūrimą ir naudojimą jūsų kūrimo kelionėje.

**Sėkmės programuojant!**

---

## Kas toliau

Sveikiname pabaigus visus modulio 10 laboratorinius darbus!

- Grįžti į: [Modulio 10 apžvalgą](../README.md)
- Tęsti į: [Modulio 11: MCP serverio praktiniai laboratoriniai darbai](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->