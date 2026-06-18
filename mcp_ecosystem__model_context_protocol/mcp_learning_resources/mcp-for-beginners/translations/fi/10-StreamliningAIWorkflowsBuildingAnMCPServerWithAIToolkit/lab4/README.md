# 🐙 Moduuli 4: Käytännön MCP-kehitys - Räätälöity GitHub-clone-palvelin

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Pikakäynnistys:** Rakenna tuotantovalmiiksi MCP-palvelin, joka automatisoi GitHub-repositorion kloonaamisen ja VS Code -integraation vain 30 minuutissa!

## 🎯 Oppimistavoitteet

Tämän laboratorion lopuksi osaat:

- ✅ Luoda räätälöidyn MCP-palvelimen aidolle kehitystyönkululle
- ✅ Toteuttaa GitHub-repositorion kloonausominaisuuden MCP:n kautta
- ✅ Integroida räätälöidyt MCP-palvelimet VS Codeen ja Agent Builderiin
- ✅ Käyttää GitHub Copilot Agent Modea räätälöityjen MCP-työkalujen kanssa
- ✅ Testata ja ottaa käyttöön räätälöityjä MCP-palvelimia tuotantoympäristöissä

## 📋 Esivaatimukset

- Laboratorioiden 1–3 suorittaminen (MCP-perusteet ja edistynyt kehitys)
- GitHub Copilot -tilaus ([ilmainen rekisteröityminen saatavilla](https://github.com/github-copilot/signup))
- VS Code Microsoft Foundry Toolkit- ja GitHub Copilot -laajennuksilla
- Gitin asennus ja konfigurointi

## 🏗️ Projektin yleiskuvaus

### **Todellisen elämän kehityshaaste**
Kehittäjinä käytämme usein GitHubia repositorioiden kloonaamiseen ja niiden avaamiseen VS Codessa tai VS Code Insidersissa. Tämä manuaalinen prosessi sisältää:
1. Päätteeseen/komentokehotteeseen siirtymisen
2. Halutun hakemiston valitsemisen
3. `git clone` -komennon suorittamisen
4. VS Coden avaamisen kloonatussa hakemistossa

**Ratkaisumme MCP:llä yhdistää tämän yhdeksi älykkääksi komennoksi!**

### **Mitä rakennat**
**GitHub Clone MCP Serverin** (`git_mcp_server`), joka tarjoaa:

| Ominaisuus | Kuvaus | Hyöty |
|------------|---------|-------|
| 🔄 **Älykäs repositoriokloonaus** | Kloonaa GitHub-repositoriot validoinnilla | Automaattinen virheiden tarkistus |
| 📁 **Älykäs hakemistonhallinta** | Tarkistaa ja luo hakemistot turvallisesti | Estää ylikirjoittamisen |
| 🚀 **Monialustainen VS Code -integraatio** | Avaa projektit VS Code / Insiders -sovelluksissa | Saumaton kehitystyönkulun siirtymä |
| 🛡️ **Vankka virheenkäsittely** | Käsittelee verkko-, käyttöoikeus- ja polkuongelmat | Tuotantovalmius ja luotettavuus |

---

## 📖 Vaiheittainen toteutus

### Vaihe 1: Luo GitHub-agentti Agent Builderissa

1. **Käynnistä Agent Builder** Microsoft Foundry Toolkit -laajennuksen kautta
2. **Luo uusi agentti** seuraavilla asetuksilla:
   ```
   Agent Name: GitHubAgent
   ```

3. **Alusta räätälöity MCP-palvelin:**
   - Siirry kohtaan **Tools** → **Add Tool** → **MCP Server**
   - Valitse **"Create A new MCP Server"**
   - Valitse **Python-malli** joustavimman toteutuksen vuoksi
   - **Palvelimen nimi:** `git_mcp_server`

### Vaihe 2: Määritä GitHub Copilot Agent Mode

1. **Avaa GitHub Copilot** VS Codessa (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Valitse Agent Model** Copilotin käyttöliittymässä
3. **Valitse Claude 3.7 -malli** paremman päättelykyvyn vuoksi
4. **Ota MCP-integraatio käyttöön** työkalujen käyttöä varten

> **💡 Vinkki:** Claude 3.7 tarjoaa paremman ymmärryksen kehitystyönkuluista ja virheiden käsittelymalleista.

### Vaihe 3: Toteuta MCP-palvelimen ydintoiminnot

**Käytä seuraavaa yksityiskohtaista kehotetta GitHub Copilot Agent Moden kanssa:**

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

### Vaihe 4: Testaa MCP-palvelimesi

#### 4a. Testaus Agent Builderissa

1. **Käynnistä virheenetsintäasetukset** Agent Builderissa
2. **Määritä agenttisi järjestelmäkehotteella:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testaa realistisilla käyttäjäskenaarioilla:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/fi/DebugAgent.81d152370c503241.webp)

**Odotetut tulokset:**
- ✅ Kloonaus onnistuu ja polku vahvistetaan
- ✅ VS Code käynnistyy automaattisesti
- ✅ Selkeät virheilmoitukset virheellisissä tilanteissa
- ✅ Reunakäsittelyt toimivat oikein

#### 4b. Testaus MCP Inspectorissa


![MCP Inspector Testing](../../../../translated_images/fi/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Onnittelut!** Olet onnistuneesti luonut käytännöllisen, tuotantovalmiin MCP-palvelimen, joka ratkaisee aidon kehitystyönkulun haasteita. Räätälöity GitHub-clone-palvelimesi osoittaa MCP:n voiman kehittäjien tuottavuuden automatisoinnissa ja parantamisessa.

### 🏆 Saavutuksesi:
- ✅ **MCP-kehittäjä** - Luonut räätälöidyn MCP-palvelimen
- ✅ **Työnkulun automaattinen sujuvoittaja** - Tehostanut kehitysprosesseja  
- ✅ **Integraatioasiantuntija** - Yhdistänyt useita kehitystyökaluja
- ✅ **Tuotantovalmius** - Rakentanut käyttöön otettavia ratkaisuja

---

## 🎓 Workshopin suoritus: Matkasi Model Context Protocolin parissa

**Arvoisa workshop-osallistuja,**

Onnittelut, että olet suorittanut kaikki neljä moduulia Model Context Protocol -workshopissa! Olet kulkenut pitkän matkan Microsoft Foundry Toolkitin perusteiden ymmärtämisestä tuotantovalmiiden MCP-palvelinten rakentamiseen, jotka ratkaisevat aitoja kehityshaasteita.

### 🚀 Oppimispolkusi yhteenveto:

**[Moduuli 1](../lab1/README.md)**: Aloitit tutustumalla Microsoft Foundry Toolkitin perusteisiin, mallien testaamiseen ja ensimmäisen AI-agentin luomiseen.

**[Moduuli 2](../lab2/README.md)**: Opin MCP-arkkitehtuurin, integroimaan Playwright MCP:n ja rakensit ensimmäisen selainautomaatiota hyödyntävän agentin.

**[Moduuli 3](../lab3/README.md)**: Edistyit räätälöityjen MCP-palvelinten kehityksessä Weather MCP -palvelimen avulla ja hallitsit virheenetsintätyökalut.

**[Moduuli 4](../lab4/README.md)**: Olet nyt soveltanut kaikkea käytännön GitHub-repositorioprosessin automatisointityökalun luomiseen.

### 🌟 Hallitsemasi asiat:

- ✅ **Microsoft Foundry Toolkit -ekosysteemi**: Malleja, agentteja ja integraatiomalleja
- ✅ **MCP-arkkitehtuuri**: Asiakas-palvelin -suunnittelu, siirtoprotokollat ja turvallisuus
- ✅ **Kehitystyökalut**: Playgroundista Inspectorin kautta tuotantoon käyttöönottoon
- ✅ **Räätälöity kehitys**: Oma MCP-palvelin rakentaminen, testaus ja käyttöönotto
- ✅ **Käytännön sovellukset**: Aidon työnkulun haasteiden ratkaiseminen tekoälyn avulla

### 🔮 Seuraavat askeleesi:

1. **Rakenna oma MCP-palvelin:** Käytä näitä taitoja automatisoidaksesi omat ainutlaatuiset työnkulut
2. **Liity MCP-yhteisöön:** Jaa luomuksiasi ja opi muilta
3. **Tutki edistynyttä integraatiota:** Yhdistä MCP-palvelimet yritysjärjestelmiin
4. **Osallistu avoimen lähdekoodin kehitykseen:** Auta parantamaan MCP-työkaluja ja dokumentaatiota

Muista, että tämä workshop on vasta alku. Model Context Protocol -ekosysteemi kehittyy nopeasti, ja sinulla on nyt valmiudet olla tämän tekoälypohjaisten kehitystyökalujen eturintamassa.

**Kiitos osallistumisestasi ja oppimispanoksestasi!**

Toivomme tämän workshopin sytyttäneen ideoita, jotka muuttavat tapaasi rakentaa ja käyttää tekoälytyökaluja kehitysmatkallasi.

**Hyvää koodausta!**

---

## Mitä seuraavaksi

Onnittelut, että olet suorittanut kaikki moduulin 10 laboratorion tehtävät!

- Takaisin: [Moduuli 10 Yleiskuvaus](../README.md)
- Jatka: [Moduuli 11: MCP Server Hands-On Labs](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->