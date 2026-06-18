# 🐙 Modul 4: Praktični razvoj MCP-a - Prilagođeni GitHub klon poslužitelj

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Brzi početak:** Izgradite MCP poslužitelj spreman za produkciju koji automatizira kloniranje GitHub repozitorija i integraciju sa VS Code-om u samo 30 minuta!

## 🎯 Ciljevi učenja

Na kraju ove radionice moći ćete:

- ✅ Kreirati prilagođeni MCP poslužitelj za stvarne razvojne tijekove rada
- ✅ Implementirati funkcionalnost kloniranja GitHub repozitorija putem MCP-a
- ✅ Integrirati prilagođene MCP poslužitelje sa VS Code-om i Agent Builderom
- ✅ Koristiti GitHub Copilot Agent Mode s prilagođenim MCP alatima
- ✅ Testirati i implementirati prilagođene MCP poslužitelje u produkcijsko okruženje

## 📋 Preduvjeti

- Završetak laboratorija 1-3 (osnovni i napredni razvoj MCP-a)
- Pretplata na GitHub Copilot ([dostupan besplatan prijavni obrazac](https://github.com/github-copilot/signup))
- VS Code s Microsoft Foundry Toolkit i GitHub Copilot dodacima
- Instaliran i konfiguriran Git CLI

## 🏗️ Pregled projekta

### **Izazov stvarnog svijeta u razvoju**
Kao developeri često koristimo GitHub za kloniranje repozitorija i njihovo otvaranje u VS Code ili VS Code Insiders. Ovaj ručni proces uključuje:
1. Otvaranje terminala/command prompta
2. Navigaciju do željenog direktorija
3. Pokretanje naredbe `git clone`
4. Otvaranje VS Code-a u kloniranom direktoriju

**Naše MCP rješenje pojednostavljuje to u jednu inteligentnu naredbu!**

### **Što ćete izgraditi**
**GitHub Clone MCP poslužitelj** (`git_mcp_server`) koji pruža:

| Značajka | Opis | Korist |
|---------|-------------|---------|
| 🔄 **Pametno kloniranje repozitorija** | Klonira GitHub repozitorije s validacijom | Automatizirano provjeravanje pogrešaka |
| 📁 **Pametno upravljanje direktorijima** | Provjerava i sigurno kreira direktorije | Sprečava prebrisavanje |
| 🚀 **Višestruka platformska integracija VS Code-a** | Otvara projekte u VS Code/Insiders | Besprijekoran prijelaz u tijek rada |
| 🛡️ **Otpornost na pogreške** | Rukovanje mrežnim, dozvolnim i problemima putanje | Pouzdanost spremna za produkciju |

---

## 📖 Korak-po-korak implementacija

### Korak 1: Kreiranje GitHub agenta u Agent Builderu

1. **Pokrenite Agent Builder** putem Microsoft Foundry Toolkit ekstenzije
2. **Kreirajte novog agenta** s konfiguracijom:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inicijalizirajte prilagođeni MCP poslužitelj:**
   - Idite na **Tools** → **Add Tool** → **MCP Server**
   - Odaberite **"Create A new MCP Server"**
   - Odaberite **Python predložak** za maksimalnu fleksibilnost
   - **Ime poslužitelja:** `git_mcp_server`

### Korak 2: Konfigurirajte GitHub Copilot Agent Mode

1. **Otvorite GitHub Copilot** u VS Code-u (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Odaberite Agent Model** u Copilot sučelju
3. **Odaberite model Claude 3.7** za poboljšane sposobnosti rezoniranja
4. **Omogući MCP integraciju** za pristup alatima

> **💡 Korisni savjet:** Claude 3.7 pruža superiorno razumijevanje razvojnih tijekova rada i obrazaca rukovanja pogreškama.

### Korak 3: Implementirajte osnovnu funkcionalnost MCP poslužitelja

**Koristite sljedeći detaljni prompt s GitHub Copilot Agent Mode:**

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

### Korak 4: Testirajte svoj MCP poslužitelj

#### 4a. Testiranje u Agent Builderu

1. **Pokrenite debug konfiguraciju** za Agent Builder
2. **Konfigurirajte svog agenta s ovim sistemskim promptom:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testirajte s realnim korisničkim scenarijima:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/hr/DebugAgent.81d152370c503241.webp)

**Očekivani rezultati:**
- ✅ Uspješno kloniranje s potvrdom putanje
- ✅ Automatsko pokretanje VS Code-a
- ✅ Jasne poruke o pogreškama za nevažeće scenarije
- ✅ Ispravno rukovanje rubnim slučajevima

#### 4b. Testiranje u MCP Inspectoru


![MCP Inspector Testing](../../../../translated_images/hr/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Čestitamo!** Uspješno ste kreirali praktičan MCP poslužitelj spreman za produkciju koji rješava stvarne razvojne izazove. Vaš prilagođeni GitHub klon poslužitelj demonstrira moć MCP-a za automatizaciju i poboljšanje produktivnosti developera.

### 🏆 Postignuće otključano:
- ✅ **MCP Developer** - Kreiran prilagođeni MCP poslužitelj
- ✅ **Workflow Automator** - Pojednostavljeni razvojni procesi  
- ✅ **Integration Expert** - Povezani brojni alati za razvoj
- ✅ **Production Ready** - Izgrađena rješenja spremna za implementaciju

---

## 🎓 Završetak radionice: Vaše putovanje s Model Context Protocolom

**Poštovani sudioniku radionice,**

Čestitamo na završetku svih četiri modula radionice Model Context Protocol! Prošli ste dug put od razumijevanja osnovnih koncepata Microsoft Foundry Toolkit-a do izgradnje produkcijski spremnih MCP poslužitelja koji rješavaju izazove stvarnog razvoja.

### 🚀 Pregled vašeg puta učenja:

**[Modul 1](../lab1/README.md)**: Počeli ste istraživanjem osnova Microsoft Foundry Toolkita, testiranjem modela i kreiranjem svog prvog AI agenta.

**[Modul 2](../lab2/README.md)**: Naučili ste MCP arhitekturu, integrirali Playwright MCP i izgradili svog prvog agenta za automatizaciju preglednika.

**[Modul 3](../lab3/README.md)**: Napredovali ste do razvoja prilagođenih MCP poslužitelja s Weather MCP poslužiteljem i savladali alate za ispravljanje pogrešaka.

**[Modul 4](../lab4/README.md)**: Sada ste primijenili sve naučeno za kreiranje praktičnog alata za automatizaciju tijeka rada GitHub repozitorija.

### 🌟 Što ste usavršili:

- ✅ **Ekosustav Microsoft Foundry Toolkita**: modeli, agenti i obrasci integracije
- ✅ **MCP arhitekturu**: dizajn klijent-poslužitelj, transportne protokole i sigurnost
- ✅ **Razvojne alate**: od Playgrounda preko Inspectora do produkcijske implementacije
- ✅ **Prilagođeni razvoj**: izgradnju, testiranje i implementaciju vlastitih MCP poslužitelja
- ✅ **Praktične primjene**: rješavanje stvarnih radnih tijekova s AI-jem

### 🔮 Vaši sljedeći koraci:

1. **Izgradite vlastiti MCP poslužitelj**: Primijenite ove vještine za automatizaciju vaših jedinstvenih tijekova rada
2. **Pridružite se MCP zajednici**: Dijelite svoja rješenja i učite od drugih
3. **Istražite napredne integracije**: Povežite MCP poslužitelje s enterprise sustavima
4. **Doprinesite open source-u**: Pomozite poboljšati MCP alate i dokumentaciju

Zapamtite, ova radionica je samo početak. Ekosustav Model Context Protoco- la brzo se razvija, a sada ste opremljeni za predvodništvo u alatima za razvoj vođenim umjetnom inteligencijom.

**Hvala vam na sudjelovanju i predanosti učenju!**

Nadamo se da će vam ova radionica potaknuti ideje koje će promijeniti način na koji gradite i koristite AI alate u vašem razvoju.

**Sretno kodiranje!**

---

## Što slijedi

Čestitamo na završetku svih laboratorija u Modulu 10!

- Natrag na: [Pregled Modula 10](../README.md)
- Nastavite s: [Modul 11: MCP Server praktični laboratoriji](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->