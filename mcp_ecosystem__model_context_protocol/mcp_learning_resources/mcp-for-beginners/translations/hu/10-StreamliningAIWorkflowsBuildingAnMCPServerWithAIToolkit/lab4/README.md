# 🐙 4. modul: Gyakorlati MCP fejlesztés – Egyedi GitHub klón szerver

![Időtartam](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Nehézség](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Gyors kezdés:** Építs egy termelésre kész MCP szervert, amely automatizálja a GitHub tárolók klónozását és a VS Code integrációt mindössze 30 perc alatt!

## 🎯 Tanulási célok

A labor végére képes leszel:

- ✅ Egyedi MCP szervert készíteni valós fejlesztési munkafolyamatokhoz
- ✅ Megvalósítani a GitHub tárolók klónozási funkcióját MCP-n keresztül
- ✅ Egyedi MCP szervereket integrálni a VS Code-dal és az Agent Builderrel
- ✅ Használni a GitHub Copilot Agent Mode-ot egyedi MCP eszközökkel
- ✅ Tesztelni és éles környezetben telepíteni az egyedi MCP szervereket

## 📋 Előfeltételek

- Az 1-3. labork feladatok elvégzése (MCP alapok és haladó fejlesztés)
- GitHub Copilot előfizetés ([ingyenes regisztráció elérhető](https://github.com/github-copilot/signup))
- VS Code a Microsoft Foundry Toolkit és GitHub Copilot kiterjesztésekkel
- Telepített és konfigurált Git CLI

## 🏗️ Projekt áttekintés

### **Valós fejlesztési kihívás**
Fejlesztőként gyakran használjuk a GitHub-ot tárolók klónozására, majd megnyitjuk őket a VS Code-ban vagy a VS Code Insiders-ben. Ez a manuális folyamat magában foglalja:
1. Terminál/parancssor megnyitása
2. A kívánt mappa megkeresése
3. A `git clone` parancs futtatása
4. A VS Code megnyitása a klónozott mappában

**MCP megoldásunk ezt egyetlen intelligens parancsra egyszerűsíti!**

### **Mit fogsz építeni**
Egy **GitHub Clone MCP Szerver** (`git_mcp_server`), amely a következőket nyújtja:

| Funkció | Leírás | Előny |
|---------|-------------|---------|
| 🔄 **Okos tárolóklónozás** | GitHub tárolók klónozása validálással | Automatikus hibaellenőrzés |
| 📁 **Intelligens könyvtárkezelés** | Biztonságos mappaellenőrzés és létrehozás | Megelőzi a felülírást |
| 🚀 **Platformok közötti VS Code integráció** | Projektek megnyitása VS Code/Insiders-ben | Zökkenőmentes munkafolyamat |
| 🛡️ **Robosztus hibakezelés** | Hálózati, jogosultsági és útvonal problémák kezelése | Termelésre kész megbízhatóság |

---

## 📖 Lépésről lépésre megvalósítás

### 1. lépés: GitHub Agent létrehozása az Agent Builder-ben

1. **Indítsd el az Agent Builder-t** a Microsoft Foundry Toolkit kiterjesztésből
2. **Hozz létre egy új agenset** az alábbi konfigurációval:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inicializáld az egyedi MCP szervert:**
   - Navigálj a **Tools** → **Add Tool** → **MCP Server** pontra
   - Válaszd a **"Create A new MCP Server"** opciót
   - Válaszd a **Python sablont** a maximális rugalmasságért
   - **Szerver neve:** `git_mcp_server`

### 2. lépés: GitHub Copilot Agent Mode konfigurálása

1. **Nyisd meg a GitHub Copilot-ot** VS Code-ban (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Válaszd ki az Agent Mode-ot** a Copilot felületen
3. **Válaszd a Claude 3.7 modellt** a továbbfejlesztett érvelési képességekért
4. **Kapcsold be az MCP integrációt** az eszközhasználathoz

> **💡 Pro Tipp:** A Claude 3.7 kiválóan érti a fejlesztési munkafolyamatokat és a hibakezelési mintákat.

### 3. lépés: Az MCP szerver alapfunkcióinak megvalósítása

**Használd az alábbi részletes promptot a GitHub Copilot Agent Mode-ban:**

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

### 4. lépés: Az MCP szerver tesztelése

#### 4a. Teszt az Agent Builder-ben

1. **Indítsd el a hibakereső konfigurációt** az Agent Builder-ben
2. **Állítsd be az ügynököt az alábbi rendszerprompttal:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Teszteld valósághű felhasználói forgatókönyvekkel:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder tesztelés](../../../../translated_images/hu/DebugAgent.81d152370c503241.webp)

**Várt eredmények:**
- ✅ Sikeres klónozás, útvonal visszaigazolással
- ✅ Automatikus VS Code indítás
- ✅ Egyértelmű hibaüzenetek érvénytelen esetekben
- ✅ Élő esetek megfelelő kezelése

#### 4b. Teszt az MCP Inspector-ban


![MCP Inspector tesztelés](../../../../translated_images/hu/DebugInspector.eb5c95f94c69a8ba.webp)

---

**🎉 Gratulálunk!** Sikeresen létrehoztál egy praktikus, termelésre kész MCP szervert, amely valós fejlesztési munkafolyamatokat old meg. Egyedi GitHub klón szervered bemutatja az MCP erejét a fejlesztői produktivitás automatizálásában és fokozásában.

### 🏆 Elért eredményeid:
- ✅ **MCP fejlesztő** – Egyedi MCP szerver készítése
- ✅ **Munkafolyamat automatizáló** – Fejlesztési folyamatok egyszerűsítése  
- ✅ **Integrációs szakértő** – Több fejlesztői eszköz összekapcsolása
- ✅ **Termelésre készen** – Telepíthető megoldások létrehozása

---

## 🎓 Workshop befejezése: Utad a Model Context Protocol rendszerben

**Kedves Workshop Résztvevő!**

Gratulálunk, hogy végigcsináltad a Model Context Protocol workshop négy modulját! Hosszú utat tettél meg az alap Microsoft Foundry Toolkit fogalmak megértésétől a termelésre kész MCP szerverek építéséig, amelyek valós fejlesztési kihívásokat oldanak meg.

### 🚀 A tanulási út összefoglalója:

**[1. modul](../lab1/README.md):** Megismerkedtél a Microsoft Foundry Toolkit alapjaival, modellek tesztelésével és az első AI Agent létrehozásával.

**[2. modul](../lab2/README.md):** Megtanultad az MCP architektúrát, integráltad a Playwright MCP-t, és felépítettél egy első böngésző automatizációs agenset.

**[3. modul](../lab3/README.md):** Fejlesztetted az egyedi MCP szerver készségeidet az Időjárás MCP szerverrel és elsajátítottad a hibakeresési eszközök használatát.

**[4. modul](../lab4/README.md):** Most mindent alkalmazva létrehoztál egy gyakorlati GitHub tároló munkafolyamat automatizáló eszközt.

### 🌟 Amit elsajátítottál:

- ✅ **Microsoft Foundry Toolkit Ökoszisztéma**: Modellek, ágens-ek, integrációs minták
- ✅ **MCP Architektúra**: Ügyfél-szerver tervezés, szállítási protokollok, biztonság
- ✅ **Fejlesztői Eszközök**: Playground-tól Inspectorig a termelésbe telepítésig
- ✅ **Egyedi fejlesztés**: Saját MCP szerverek építése, tesztelése, telepítése
- ✅ **Gyakorlati alkalmazások**: Valós munkafolyamatok megoldása AI segítségével

### 🔮 Következő lépések:

1. **Építsd meg saját MCP szerveredet:** Alkalmazd ezeket a képességeket egyedi munkafolyamataid automatizálására
2. **Csatlakozz az MCP közösséghez:** Oszd meg alkotásaidat és tanulj másoktól
3. **Fedezd fel a haladó integrációkat:** Kapcsold össze az MCP szervereket vállalati rendszerekkel
4. **Járulj hozzá a nyílt forráshoz:** Segíts az MCP eszközök és dokumentáció fejlesztésében

Ne feledd, ez a workshop csak a kezdet. A Model Context Protocol ökoszisztéma gyorsan fejlődik, és most már készen állsz, hogy az AI-alapú fejlesztői eszközök élvonalában haladj.

**Köszönjük, hogy részt vettél, és hogy elkötelezett vagy a tanulás iránt!**

Reméljük, ez a workshop inspirációt adott, amely átalakítja, hogyan építesz és használsz AI eszközöket a fejlesztési utadon.

**Kellemes kódolást!**

---

## Mi következik

Gratulálunk, hogy befejezted az összes labort a 10. modulban!

- Vissza ide: [10. modul áttekintése](../README.md)
- Folytatás: [11. modul: MCP szerver gyakorlati laborok](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->