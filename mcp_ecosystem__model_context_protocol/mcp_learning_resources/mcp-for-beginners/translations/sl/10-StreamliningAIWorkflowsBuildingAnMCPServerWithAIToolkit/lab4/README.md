# 🐙 Modul 4: Praktični razvoj MCP - lastni strežnik za kloniranje GitHub

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Hiter začetek:** Zgradite proizvodni MCP strežnik, ki avtomatizira kloniranje GitHub repozitorijev in integracijo z VS Code v samo 30 minutah!

## 🎯 Cilji učenja

Do konca te delavnice boste znali:

- ✅ Ustvariti lasten MCP strežnik za razvojne delovne tokove v realnem svetu
- ✅ Implementirati funkcijo kloniranja GitHub repozitorijev preko MCP
- ✅ Integrirati lastne MCP strežnike z VS Code in Agent Builderjem
- ✅ Uporabljati GitHub Copilot Agent Mode z lastnimi MCP orodji
- ✅ Testirati in uvajati lastne MCP strežnike v produkcijskih okoljih

## 📋 Predpogoji

- Zaključek laboratorijev 1-3 (osnove MCP in napredni razvoj)
- Naročnina na GitHub Copilot ([na voljo brezplačna registracija](https://github.com/github-copilot/signup))
- VS Code z Microsoft Foundry Toolkit in razširitvami GitHub Copilot
- Nameščen in konfiguriran Git CLI

## 🏗️ Pregled projekta

### **Razvojni izziv iz resničnega sveta**
Kot razvijalci pogosto uporabljamo GitHub za kloniranje repozitorijev in njihovo odpiranje v VS Code ali VS Code Insiders. Ta ročni postopek vključuje:
1. Odpiranje terminala/ukazne vrstice
2. Premik v želeni imenik
3. Izvajanje ukaza `git clone`
4. Odpiranje VS Code v kloniranem imeniku

**Naša MCP rešitev to poenostavi v eno pametno ukazno vrstico!**

### **Kaj boste zgradili**
**GitHub Clone MCP strežnik** (`git_mcp_server`), ki ponuja:

| Funkcija | Opis | Prednost |
|---------|-------------|---------|
| 🔄 **Pametno kloniranje repozitorijev** | Klonira GitHub repozitorije z validacijo | Avtomatsko preverjanje napak |
| 📁 **Pametno upravljanje imenikov** | Pregleda in varno ustvari imenike | Preprečuje prepisovanje |
| 🚀 **Medplatformna integracija z VS Code** | Odpre projekte v VS Code/Insiders | Gladek prehod delovnih tokov |
| 🛡️ **Robustno upravljanje napak** | Obvladuje omrežne, dovolilne in poti težave | Zanesljivost primerna za produkcijo |

---

## 📖 Korak za korakom implementacija

### Korak 1: Ustvarite GitHub agenta v Agent Builderju

1. **Zaženite Agent Builder** preko razširitve Microsoft Foundry Toolkit
2. **Ustvarite novega agenta** z naslednjo konfiguracijo:
   ```
   Agent Name: GitHubAgent
   ```

3. **Inicializirajte lasten MCP strežnik:**
   - Pojdite na **Orodja** → **Dodaj orodje** → **MCP strežnik**
   - Izberite **"Ustvari nov MCP strežnik"**
   - Izberite **Python predlogo** za največjo prilagodljivost
   - **Ime strežnika:** `git_mcp_server`

### Korak 2: Konfigurirajte GitHub Copilot Agent Mode

1. **Odprite GitHub Copilot** v VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Izberite model agenta** v vmesniku Copilot
3. **Izberite model Claude 3.7** za izboljšane zmožnosti razmišljanja
4. **Omogočite MCP integracijo** za dostop do orodij

> **💡 Nasvet strokovnjaka:** Claude 3.7 omogoča boljše razumevanje razvojnih tokov in vzorcev upravljanja napak.

### Korak 3: Implementirajte osnovno funkcionalnost MCP strežnika

**Uporabite naslednje podrobno navodilo z GitHub Copilot Agent Mode:**

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

### Korak 4: Testirajte vaš MCP strežnik

#### 4a. Testiranje v Agent Builderju

1. **Zaženite debug konfiguracijo** za Agent Builder
2. **Konfigurirajte vašega agenta s tem sistemskim navodilom:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testirajte z realističnimi uporabniškimi scenariji:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/sl/DebugAgent.81d152370c503241.webp)

**Pričakovani rezultati:**
- ✅ Uspešno kloniranje z potrdilom poti
- ✅ Samodejni zagon VS Code
- ✅ Jasna sporočila o napakah za neveljavne scenarije
- ✅ Pravilno upravljanje robnih primerov

#### 4b. Testiranje v MCP Inspector


![MCP Inspector Testing](../../../../translated_images/sl/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Čestitamo!** Uspešno ste ustvarili praktični, proizvodni MCP strežnik, ki rešuje prave izzive razvojnih delovnih tokov. Vaš lastni strežnik za kloniranje GitHub ponazarja moč MCP za avtomatizacijo in povečanje produktivnosti razvijalcev.

### 🏆 Dosežki:
- ✅ **Razvijalec MCP** - Ustvaril lasten MCP strežnik
- ✅ **Avtomatizator delovnih tokov** - Poenostavil razvojne procese  
- ✅ **Strokovnjak za integracijo** - Povezal več razvojnih orodij
- ✅ **Pripravljen za produkcijo** - Zgradil rešitve za uvedbo

---

## 🎓 Zaključek delavnice: Vaša pot z Model Context Protocol

**Spoštovani udeleženec delavnice,**

Čestitamo za zaključek vseh štirih modulov delavnice Model Context Protocol! Prepotovali ste dolgo pot od razumevanja osnov Microsoft Foundry Toolkit do izdelave proizvodnih MCP strežnikov, ki rešujejo prave razvojne izzive.

### 🚀 Povzetek vaše poti učenja:

**[Modul 1](../lab1/README.md)**: Začeli ste z raziskovanjem osnov Microsoft Foundry Toolkit, testiranjem modelov in ustvarjanjem prvega AI agenta.

**[Modul 2](../lab2/README.md)**: Naučili ste se arhitekture MCP, integrirali Playwright MCP in ustvarili svojega prvega agenta za avtomatizacijo brskalnika.

**[Modul 3](../lab3/README.md)**: Napredovali ste v razvoju lastnih MCP strežnikov z Weather MCP strežnikom in obvladali orodja za odpravljanje napak.

**[Modul 4](../lab4/README.md)**: Zdaj ste uporabili vse znanje za izdelavo praktičnega orodja za avtomatizacijo delovnega toka z GitHub repozitoriji.

### 🌟 Kaj ste osvojili:

- ✅ **Ecosistem Microsoft Foundry Toolkit**: modeli, agenti in vzorci integracij
- ✅ **Arhitektura MCP**: zasnova klient-strežnik, protokoli prenosa in varnost
- ✅ **Razvojna orodja**: od Playground do Inspectorja do produkcijske uvedbe
- ✅ **Prilagojeni razvoj**: izgradnja, testiranje in uvajanje lastnih MCP strežnikov
- ✅ **Praktične uporabe**: reševanje resničnih izzivov delovnih tokov z AI

### 🔮 Vaši naslednji koraki:

1. **Zgradite lastni MCP strežnik**: uporabite te veščine za avtomatizacijo svojih edinstvenih delovnih tokov
2. **Pridružite se MCP skupnosti**: delite svoje stvaritve in se učite od drugih
3. **Raziskujte napredno integracijo**: povežite MCP strežnike z enterprise sistemi
4. **Prispevajte k odprtokodnim projektom**: pomagajte izboljšati MCP orodja in dokumentacijo

Ne pozabite, ta delavnica je šele začetek. Ekosistem Model Context Protocol hitro napreduje in zdaj ste opremljeni, da ste na čelu AI-podprtih razvojnih orodij.

**Hvala za vašo udeležbo in zavezanost učenju!**

Upamo, da je ta delavnica vzpodbudila ideje, ki bodo preoblikovale način, kako gradite in uporabljate AI orodja na vaši razvojni poti.

**Srečno kodiranje!**

---

## Kaj sledi

Čestitke ob zaključku vseh laboratorijev v Modulu 10!

- Nazaj na: [Pregled Modula 10](../README.md)
- Nadaljujte na: [Modul 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->