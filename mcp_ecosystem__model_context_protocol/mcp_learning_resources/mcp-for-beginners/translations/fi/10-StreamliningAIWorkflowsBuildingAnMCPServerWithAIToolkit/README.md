# Sujuvoita tekoälytyönkulkuja: MCP-palvelimen rakentaminen Microsoft Foundry Toolkitin avulla

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/fi/logo.ec93918ec338dadd.webp)

## 🎯 Yleiskatsaus

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/fi/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Napsauta yllä olevaa kuvaa nähdäksesi tämän oppitunnin videon)_

Tervetuloa **Model Context Protocol (MCP) -työpajaan**! Tämä kattava käytännön työpaja yhdistää kaksi huippuluokan teknologiaa mullistaakseen tekoälysovelluskehityksen:

- **🔗 Model Context Protocol (MCP)**: Avoin standardi saumattomaan tekoälytyökalujen integrointiin
- **🛠️ Microsoft Foundry Toolkit -laajennus VS Codeen**: Microsoftin tehokas tekoälykehityksen laajennus

### 🎓 Mitä opit

Tämän työpajan lopussa hallitset älykkäiden sovellusten rakentamisen, jotka yhdistävät tekoälymallit todellisiin työkaluihin ja palveluihin. Automaattisesta testauksesta räätälöityihin API-integraatioihin saat käytännön taitoja monimutkaisten liiketoimintahaasteiden ratkaisemiseen.

## 🏗️ Teknologiapino

### 🔌 Model Context Protocol (MCP)

MCP on **"USB-C tekoälylle"** – universaali standardi, joka yhdistää tekoälymallit ulkoisiin työkaluihin ja tietolähteisiin.

**✨ Keskeiset ominaisuudet:**

- 🔄 **Standardoitu integraatio**: Yleinen rajapinta tekoäly- ja työkaluyhteyksiin
- 🏛️ **Joustava arkkitehtuuri**: Paikalliset ja etäpalvelimet stdio/SSE-siirrolla
- 🧰 **Rikas ekosysteemi**: Työkaluja, kehotteita ja resursseja yhdessä protokollassa
- 🔒 **Yrityskäyttöön valmis**: Sisäänrakennettu turvallisuus ja luotettavuus

**🎯 Miksi MCP on tärkeä:**
Kuten USB-C poisti kaapelihässäkän, MCP poistaa tekoälyintegraatioiden monimutkaisuuden. Yksi protokolla, loputtomat mahdollisuudet.

### 🤖 Microsoft Foundry Toolkit -laajennus VS Codeen

Microsoftin lippulaivana toimiva tekoälykehityksen laajennus, joka muuttaa VS Coden tekoälyvoimaksi.

**🚀 Keskeiset ominaisuudet:**

- 📦 **Malli-katalogi**: Pääsy malleihin Azure AI:sta, GitHubista, Hugging Facesta, Ollamasta
- ⚡ **Paikallinen päättely**: ONNX-optimoitu CPU/GPU/NPU-suoritus
- 🏗️ **Agent Builder**: Visuaalinen tekoälyagenttien kehitys MCP-integraatiolla
- 🎭 **Monimodaalinen**: Teksti-, näkö- ja rakenteisen tulosteen tuki

**💡 Kehityksen edut:**

- Nollakonfiguraatio mallien käyttöönotolle
- Visuaalinen kehotteiden suunnittelu
- Reaaliaikainen testausympäristö
- Saumaton MCP-palvelimen integrointi

## 📚 Oppimismatka

### [🚀 Moduuli 1: Microsoft Foundry Toolkitin perusteet](./lab1/README.md)

**Kesto**: 15 minuuttia

- 🛠️ Asenna ja konfiguroi Microsoft Foundry Toolkit VS Codeen
- 🗂️ Tutustu Mallikatalogiin (yli 100 mallia GitHubista, ONNX:stä, OpenAI:sta, Anthropicista, Googlelta)
- 🎮 Hallitse Interaktiivinen leikkikenttä reaaliaikaiseen mallien testaukseen
- 🤖 Rakenna ensimmäinen tekoälyagenttisi Agent Builder -työkalulla
- 📊 Arvioi mallin suorituskykyä sisäänrakennetuilla mittareilla (F1, merkityksellisyys, samankaltaisuus, johdonmukaisuus)
- ⚡ Opi eräajon ja monimodaalituen ominaisuudet

**🎯 Oppimistavoite**: Luo toimiva tekoälyagentti ja saavuta kattava ymmärrys Microsoft Foundry Toolkitin ominaisuuksista

### [🌐 Moduuli 2: MCP ja Microsoft Foundry Toolkitin perusteet](./lab2/README.md)

**Kesto**: 20 minuuttia

- 🧠 Hallitse Model Context Protocolin (MCP) arkkitehtuuri ja käsitteet
- 🌐 Tutustu Microsoftin MCP-palvelinekosysteemiin
- 🤖 Rakenna selainautomaattinen agentti Playwright MCP -palvelimella
- 🔧 Integroi MCP-palvelimet Microsoft Foundry Toolkitin Agent Builderiin
- 📊 Konfiguroi ja testaa MCP-työkaluja agenteissasi
- 🚀 Vie ja ota MCP-vuorovaikutteiset agentit tuotantoon

**🎯 Oppimistavoite**: Ota käyttöön tekoälyagentti, joka on vahvistettu ulkoisilla työkaluilla MCP:n avulla

### [🔧 Moduuli 3: Edistynyt MCP-kehitys Microsoft Foundry Toolkitilla](./lab3/README.md)

**Kesto**: 20 minuuttia

- 💻 Luo räätälöityjä MCP-palvelimia Microsoft Foundry Toolkitilla
- 🐍 Käytä uusinta MCP Python SDK:ta (v1.9.3)
- 🔍 Ota MCP Inspector käyttöön virheiden etsintään
- 🛠️ Rakenna Sää MCP -palvelin ammattimaisilla debuggaustyökaluilla
- 🧪 Debuggaa MCP-palvelimia sekä Agent Builder- että Inspector-ympäristöissä

**🎯 Oppimistavoite**: Kehitä ja debuggaa räätälöityjä MCP-palvelimia moderneilla työkaluilla

### [🐙 Moduuli 4: Käytännön MCP-kehitys – Nimettömän GitHub Clone -palvelimen rakentaminen](./lab4/README.md)

**Kesto**: 30 minuuttia

- 🏗️ Rakenna oikean maailman GitHub Clone MCP -palvelin kehitysprosessien sujuvoittamiseksi
- 🔄 Toteuta älykäs arkistojen kloonaus validoinnilla ja virheenkäsittelyllä
- 📁 Luo älykäs hakemistonhallinta ja VS Code -integraatio
- 🤖 Käytä GitHub Copilot Agent Modea räätälöityjen MCP-työkalujen kanssa
- 🛡️ Käytä tuotantovalmiita luotettavuus- ja monialustayhteensopivuuksia

**🎯 Oppimistavoite**: Käyttöönotto tuotantovalmiista MCP-palvelimesta, joka tehostaa todellisia kehitysprosesseja

## 💡 Käytännön sovellukset ja vaikutus

### 🏢 Yrityskäyttötapaukset

#### 🔄 DevOps-automaatio

Muunna kehitysprosessi älykkäällä automaatiolla:

- **Älykäs arkistohallinta**: Tekoälypohjainen koodin tarkastus ja yhdistämispäätökset
- **Älykäs CI/CD**: Automaattinen putkien optimointi koodimuutosten perusteella
- **Ongelmatriage**: Automaattinen virheiden luokittelu ja tehtävien jakaminen

#### 🧪 Laadunvarmistuksen vallankumous

Nosta testauksen tasoa tekoälyllä:

- **Älykäs testien generointi**: Luo kattavia testisarjoja automaattisesti
- **Visuaalinen regressiotestaus**: Tekoälypohjainen käyttöliittymän muutosten tunnistus
- **Suorituskyvyn seuranta**: Ennakoiva ongelmien tunnistus ja ratkaisu

#### 📊 Tietoputken älykkyys

Rakenna älykkäämpiä tietojenkäsittelytyönkulkuja:

- **Mukautuvat ETL-prosessit**: Itsensä optimoivat tiedonsiirrot
- **Poikkeaman havaitseminen**: Reaaliaikainen datan laadun valvonta
- **Älykäs reititys**: Älykäs tiedon kulun hallinta

#### 🎧 Asiakaskokemuksen parantaminen

Luo poikkeuksellisia asiakasvuorovaikutuksia:

- **Kontekstin tunteva tuki**: Tekoälyagentit, joilla on pääsy asiakashistoriaan
- **Ennakoiva ongelmanratkaisu**: Ennustava asiakaspalvelu
- **Monikanavainen integraatio**: Yhtenäinen tekoälykokemus eri alustoilla

## 🛠️ Ennen aloittamista ja asennus

### 💻 Järjestelmävaatimukset

| Osa | Vaatimus | Huomautukset |
|-----------|-------------|-------|
| **Käyttöjärjestelmä** | Windows 10+, macOS 10.15+, Linux | Mikä tahansa nykyaikainen käyttöjärjestelmä |
| **Visual Studio Code** | Uusin vakaa versio | Tarvitaan Microsoft Foundry Toolkitille |
| **Node.js** | v18.0+ ja npm | MCP-palvelimen kehitykseen |
| **Python** | 3.10+ | Valinnainen Python MCP -palvelimille |
| **Muisti** | Vähintään 8GB RAM | 16GB suositeltu paikallisille malleille |

### 🔧 Kehitysympäristö

#### Suositellut VS Code -laajennukset

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - Valinnainen mutta hyödyllinen

#### Valinnaiset työkalut

- **uv**: Moderni Python-pakettien hallinta
- **MCP Inspector**: Visuaalinen virheiden etsintä MCP-palvelimille
- **Playwright**: Verkkoselaimen automaatioesimerkkeihin

## 🎖️ Oppimistulokset ja sertifiointipolku

### 🏆 Taitojen hallinnan tarkistuslista

Tämän työpajan jälkeen hallitset:

#### 🎯 Ydinosaaminen

- [ ] **MCP-protokollan hallinta**: Syvä arkkitehtuurin ja toteutusmallien ymmärrys
- [ ] **Microsoft Foundry Toolkit -osaaminen**: Asiantuntijatasoinen käyttö nopeaan kehitykseen
- [ ] **Räätälöity palvelinkehitys**: Rakentaminen, käyttöönotto ja ylläpito tuotantokäyttöön
- [ ] **Työkalujen integroinnin huippuosaaminen**: Tekoälyn saumaton yhdistäminen olemassa oleviin kehitysprosesseihin
- [ ] **Ongelmanratkaisu käytännössä**: Opittujen taitojen soveltaminen liiketoiminnan haasteisiin

#### 🔧 Tekninen osaaminen

- [ ] Microsoft Foundry Toolkitin asennus ja konfigurointi VS Codessa
- [ ] Räätälöityjen MCP-palvelimien suunnittelu ja toteutus
- [ ] GitHub-mallien integrointi MCP-arkkitehtuuriin
- [ ] Automaattisten testausprosessien rakentaminen Playwrightilla
- [ ] Tekoälyagenttien käyttöönotto tuotannossa
- [ ] MCP-palvelimen suorituskyvyn virheenkorjaus ja optimointi

#### 🚀 Edistyneet taidot

- [ ] Suunnittele yritystason tekoälyintegraatioita
- [ ] Toteuta turvallisuuden parhaat käytännöt tekoälysovelluksiin
- [ ] Suunnittele skaalautuvia MCP-palvelinarkkitehtuureja
- [ ] Luo räätälöityjä työkaluketjuja tietyille toimialoille
- [ ] Mentoroi muita tekoälykehityksessä

## 📖 Lisäresurssit

- [MCP-spesifikaatio (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Microsoft Foundry Toolkit GitHub-repositorio](https://github.com/microsoft/vscode-ai-toolkit)
- [EsimerkkimCP-palvelimet](https://github.com/modelcontextprotocol/servers)
- [Parhaiden käytäntöjen opas](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Turvallisuuden parhaat käytännöt

---

**🚀 Valmiina mullistamaan tekoälykehityksen työnkulun?**

Rakennetaan yhdessä älykkäiden sovellusten tulevaisuus MCP:n ja Microsoft Foundry Toolkitin avulla!

## Mitä seuraavaksi

Jatka: [Moduuli 11: MCP-palvelimen käytännön työpajat](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->