# 🐙 Moduli 4: Maendeleo ya Vitendo ya MCP - Kifanyakazi Maalum cha Kurejelea GitHub

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Anza Haraka:** Jenga seva ya MCP tayari kwa uzalishaji inayoendesha kunakili hifadhidata za GitHub na unganisho la VS Code kwa dakika 30 tu!

## 🎯 Malengo ya Kujifunza

Mwisho wa mazoezi haya, utaweza:

- ✅ Kuunda seva maalum ya MCP kwa mitiririko halisi ya maendeleo
- ✅ Kutekeleza utendakazi wa kunakili hifadhidata za GitHub kupitia MCP
- ✅ Kuunganisha seva maalum za MCP na VS Code na Agent Builder
- ✅ Kutumia Mode ya Wakala wa GitHub Copilot na zana maalum za MCP
- ✅ Kupima na kutengeneza seva maalum za MCP katika mazingira ya uzalishaji

## 📋 Masharti ya awali

- Kukamilisha maabara 1-3 (misingi ya MCP na maendeleo ya hali ya juu)
- Usajili wa GitHub Copilot ([anasajili bure hapa](https://github.com/github-copilot/signup))
- VS Code yenye Microsoft Foundry Toolkit na upanuzi wa GitHub Copilot
- CLI ya Git imewekwa na kusanidiwa

## 🏗️ Muhtasari wa Mradi

### **Changamoto ya Maendeleo Halisi**
Kama watengenezaji, mara nyingi tunatumia GitHub kunakili hifadhidata na kuzifungua katika VS Code au VS Code Insiders. Mchakato huu wa mkono unahusisha:
1. Kufungua terminal / amri ya kompyuta
2. Kusogea kwenye saraka inayotakikana
3. Kukimbiza amri ya `git clone`
4. Kufungua VS Code ndani ya saraka iliyopakuliwa

**Suluhisho letu la MCP linafanya yote haya kwa amri moja yenye akili!**

### **Utabuni Utafanya**
Seva ya MCP Mahali pa GitHub (`git_mcp_server`) ambayo inatoa:

| Kipengele | Maelezo | Faida |
|---------|-------------|---------|
| 🔄 **Kunakili Hifadhidata kwa Akili** | Nakili hifadhidata za GitHub na uhakiki | Ukaguzi otomatiki wa makosa |
| 📁 **Usimamizi wa Mwenendo wa Saraka Mwerevu** | Angalia na unda saraka kwa usalama | Inazuia kufuta faili zilizopo |
| 🚀 **Uingizwaji wa VS Code Kwa Majukwaa Mbalimbali** | Fungua miradi ndani ya VS Code/Insiders | Mabadiliko bila mshono wa mitiririko |
| 🛡️ **Udhibiti Imara wa Makosa** | Shughulikia matatizo ya mtandao, ruhusa na njia | Imara na tayari kwa uzalishaji |

---

## 📖 Utekelezaji Hatua kwa Hatua

### Hatua 1: Unda Wakala wa GitHub katika Agent Builder

1. **Anzisha Agent Builder** kupitia upanuzi wa Microsoft Foundry Toolkit
2. **Unda wakala mpya** kwa usanidi ufuatao:
   ```
   Agent Name: GitHubAgent
   ```

3. **Anzisha seva maalum ya MCP:**
   - Nenda kwa **Vifaa** → **Ongeza Kifaa** → **MCP Server**
   - Chagua **"Unda Seva Mpya ya MCP"**
   - Chagua **kiolezo cha Python** kwa kubadilika zaidi
   - **Jina la Seva:** `git_mcp_server`

### Hatua 2: Sanidi Mode ya Wakala ya GitHub Copilot

1. **Fungua GitHub Copilot** katika VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Chagua Modeli ya Wakala** katika kiolesura cha Copilot
3. **Chagua modeli ya Claude 3.7** kwa uwezo wa kufikiri zaidi
4. **Washa uingizwaji wa MCP** kwa upatikanaji wa zana

> **💡 Ushauri wa Mtaalamu:** Claude 3.7 hutoa uelewa bora wa mitiririko ya maendeleo na mifumo ya kushughulikia makosa.

### Hatua 3: Tekeleza Utendakazi wa Msingi wa Seva ya MCP

**Tumia maelekezo haya ya kina na Mode ya Wakala wa GitHub Copilot:**

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

### Hatua 4: Jaribu Seva Yako ya MCP

#### 4a. Jaribu katika Agent Builder

1. **Anzisha usanidi wa debugging** katika Agent Builder
2. **Sanidi wakala wako na maelekezo haya ya mfumo:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Jaribu kwa hali halisi za mtumiaji:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/sw/DebugAgent.81d152370c503241.webp)

**Matokeo Yanayotarajiwa:**
- ✅ Kunakili kwa mafanikio na uthibitisho wa njia
- ✅ Kuzindua VS Code moja kwa moja
- ✅ Ujumbe wazi wa makosa kwa hali batili
- ✅ Shughulikiaji sahihi wa matukio magumu

#### 4b. Jaribu katika MCP Inspector


![MCP Inspector Testing](../../../../translated_images/sw/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Hongera!** Umefanikiwa kuunda seva ya MCP inayoweza kutumika kiutendaji iliyo tayari kwa uzalishaji inayotatua changamoto halisi za mitiririko ya maendeleo. Seva yako maalum ya kunakili GitHub inaonyesha nguvu ya MCP kwa kuendesha na kuboresha uzalishaji wa watengenezaji.

### 🏆 Mafanikio Uliyoyapata:
- ✅ **MCP Developer** - Umeunda seva maalum ya MCP
- ✅ **Mtiririko wa Otomatiki** - Umeboresha mchakato wa maendeleo  
- ✅ **Mtaalamu wa Uingizwaji** - Umeunganisha zana nyingi za maendeleo
- ✅ **Tayari kwa Uzalishaji** - Umejenga suluhisho zinazoweza kutengenezwa

---

## 🎓 Kukamilika kwa Warsha: Safari Yako na Model Context Protocol

**Mpenzi Mshiriki wa Warsha,**

Hongera kwa kukamilisha moduli nne za warsha ya Model Context Protocol! Umefikia mbali kutoka kuelewa misingi ya Microsoft Foundry Toolkit hadi kujenga seva za MCP zinazotumika kushughulikia changamoto halisi za maendeleo.

### 🚀 Muhtasari wa Njia Yako ya Kujifunza:

**[Moduli 1](../lab1/README.md)**: Umeanza kwa kuchunguza misingi ya Microsoft Foundry Toolkit, upimaji wa modeli, na kuunda wakala wako wa kwanza wa AI.

**[Moduli 2](../lab2/README.md)**: Umejifunza usanifu wa MCP, kuingiza Playwright MCP, na kujenga wakala wa otomatiki wa kivinjari.

**[Moduli 3](../lab3/README.md)**: Umeendelea na maendeleo ya seva maalum ya MCP na seva ya Weather MCP na utaalamu wa zana za ufafanuzi wa makosa.

**[Moduli 4](../lab4/README.md)**: Sasa umetumia yote kuunda zana halisi za otomatiki za mtiririko wa hifadhidata za GitHub.

### 🌟 Umemaliza Kujifunza:

- ✅ **Ekosistimu ya Microsoft Foundry Toolkit**: Modeli, wakala, na mifumo ya uingizaji
- ✅ **Msondoko wa MCP**: Ubunifu wa mteja-seva, itifaki za usafirishaji, na usalama
- ✅ **Zana za Mtengenezaji**: Kutoka Playground hadi Inspector hadi utoaji
- ✅ **Maendeleo Maalum**: Kujenga, kupima, na kutengeneza seva zako za MCP
- ✅ **Matumizi halisi**: Kutatua changamoto za mitiririko halisi kwa AI

### 🔮 Hatua Zako Inazofuata:

1. **Jenga Seva Yako ya MCP**: Tumia ujuzi huu kuendesha mitiririko yako ya kipekee
2. **Jiunge na Jamii ya MCP**: Shiriki uundaji wako na jifunze kutoka kwa wengine
3. **Chunguza Uingizaji wa Kina Zaidi**: Unganisha seva za MCP na mifumo ya makampuni
4. **Changia Chanzo Huria**: Saidia kuboresha zana na nyaraka za MCP

Kumbuka, warsha hii ni mwanzo tu. Ekosistimu ya Model Context Protocol inazidi kubadilika haraka, na sasa umejiandaa kuwa mbele ya zana za maendeleo zinazoendeshwa na AI.

**Asante kwa ushiriki na juhudi zako za kujifunza!**

Tunatumai warsha hii imechochea mawazo yatakayobadilisha jinsi unavyotengeneza na kuingiliana na zana za AI katika safari yako ya maendeleo.

**Furahia kuandika msimbo!**

---

## Nini Kinachofuata

Hongera kwa kukamilisha maabara zote katika Moduli 10!

- Rudi kwa: [Muhtasari wa Moduli 10](../README.md)
- Endelea kwa: [Moduli 11: Maabara za Mikono za MCP Server](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->