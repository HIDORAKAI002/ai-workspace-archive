# 🚀 Moduuli 1: Microsoft Foundry Toolkit - Perusteet

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Oppimistavoitteet

Tämän moduulin lopuksi osaat:
- ✅ Asentaa ja konfiguroida Microsoft Foundry Toolkit -laajennuksen VS Codeen
- ✅ Selailla Malliluetteloa ja ymmärtää erilaisia mallilähteitä
- ✅ Käyttää Playgroundia mallin testaukseen ja kokeiluun
- ✅ Luoda räätälöityjä tekoälyagentteja Agent Builderin avulla
- ✅ Verrata mallien suorituskykyä eri tarjoajien välillä
- ✅ Soveltaa parhaimpia käytäntöjä kehotteiden suunnittelussa

## 🧠 Johdanto Microsoft Foundry Toolkitiin

**Microsoft Foundry Toolkit -laajennus VS Codeen** on Microsoftin lippulaivalaajennus, joka muuttaa VS Coden kattavaksi tekoälykehitysympäristöksi. Se yhdistää tekoälytutkimuksen ja käytännön sovelluskehityksen, tehden generatiivisesta tekoälystä kaikkien kehittäjien ulottuvilla olevan.

### 🌟 Keskeiset ominaisuudet

| Ominaisuus | Kuvaus | Käyttötapaus |
|---------|-------------|----------|
| **🗂️ Malliluettelo** | Yli 100 mallia GitHubista, ONNX:stä, OpenAI:sta, Anthropicista, Googlelta | Mallien etsiminen ja valinta |
| **🔌 BYOM-tuki** | Integroi omat mallit (paikalliset/etä) | Räätälöity mallien käyttöönotto |
| **🎮 Interaktiivinen Playground** | Reaaliaikainen mallin testaus chat-käyttöliittymällä | Nopea prototypointi ja testaus |
| **📎 Monimodaalituki** | Tekstin, kuvien ja liitteiden käsittely | Monimutkaiset tekoälysovellukset |
| **⚡ Eräajot** | Suorita useita kehotteita samanaikaisesti | Tehokas testaus |
| **📊 Mallien arviointi** | Sisäänrakennetut mittarit (F1, relevanssi, samankaltaisuus, koherenssi) | Suorituskyvyn arviointi |

### 🎯 Miksi Microsoft Foundry Toolkit on tärkeä

- **🚀 Kehityksen kiihdytys**: Ideasta prototyyppiin minuuteissa
- **🔄 Yhtenäinen työnkulku**: Yksi käyttöliittymä useille tekoälypalveluille
- **🧪 Helppo kokeilu**: Vertaa malleja ilman monimutkaista asetusta
- **📈 Valmis tuotantoon**: Saumaton siirtymä prototyypistä käyttöönottoon

## 🛠️ Esivalmistelut ja asennus

### 📦 Asenna Microsoft Foundry Toolkit -laajennus

**Vaihe 1: Avaa Laajennukset-markkinapaikka**
1. Avaa Visual Studio Code
2. Siirry Laajennukset-näkymään (`Ctrl+Shift+X` tai `Cmd+Shift+X`)
3. Etsi "Microsoft Foundry Toolkit"

**Vaihe 2: Valitse versiosi**
- **🟢 Julkaistu versio**: Suositellaan tuotantokäyttöön
- **🔶 Esijulkaisu**: Pääsy uusimpiin ominaisuuksiin

**Vaihe 3: Asenna ja ota käyttöön**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/fi/aitkext.d28945a03eed003c.webp)

### ✅ Varmistuslista
- [ ] Microsoft Foundry Toolkit -kuvake näkyy VS Coden sivupalkissa
- [ ] Laajennus on aktivoitu ja käytössä
- [ ] Asennuksessa ei virheitä tulospaneelissa

## 🧪 Käytännön harjoitus 1: GitHub-mallien tutkiminen

**🎯 Tavoite**: Hallitse Malliluettelo ja testaa ensimmäinen tekoälymallisi

### 📊 Vaihe 1: Selaa Malliluetteloa

Malliluettelo on porttisi tekoälyekosysteemiin. Se kokoaa malleja useilta tarjoajilta, mikä helpottaa vaihtoehtojen löytämistä ja vertailua.

**🔍 Navigointiohjeet:**

Klikkaa **MODELS - Catalog** Microsoft Foundry Toolkitin sivupalkissa

![Model Catalog](../../../../translated_images/fi/aimodel.263ed2be013d8fb0.webp)

**💡 Vinkki**: Etsi malleja, joilla on juuri sinun käyttötapaukseesi sopivia ominaisuuksia (esim. koodin generointi, luova kirjoittaminen, analyysi).

**⚠️ Huom:** GitHubissa isännöidyt mallit (GitHub Models) ovat ilmaisia käyttää, mutta niihin liittyy pyyntö- ja token-rajoituksia. Jos haluat käyttää muita kuin GitHub-malleja (eli ulkoisia malleja Azure AI:n tai muiden päätepisteiden kautta), sinun on annettava tarvittava API-avain tai todennus.

### 🚀 Vaihe 2: Lisää ja konfiguroi ensimmäinen mallisi

**Mallin valintastrategia:**
- **GPT-4.1**: Parhaat monimutkaiseen päättelyyn ja analyysiin
- **Phi-4-mini**: Kevyt, nopea vastauksiin yksinkertaisiin tehtäviin

**🔧 Konfigurointiprosessi:**
1. Valitse katalogista **OpenAI GPT-4.1**
2. Klikkaa **Add to My Models** – malli rekisteröityy käyttöä varten
3. Valitse **Try in Playground** käynnistääksesi testausympäristön
4. Odota mallin käynnistymistä (ensiasennus voi kestää hetken)

![Playground Setup](../../../../translated_images/fi/playground.dd6f5141344878ca.webp)

**⚙️ Mallin parametrien ymmärtäminen:**
- **Temperature**: Ohjaa luovuutta (0 = deterministinen, 1 = luova)
- **Max Tokens**: Vastauksen enimmäispituus
- **Top-p**: Nucleus-näytteenotto vastauksen monipuolisuuteen

### 🎯 Vaihe 3: Hallitse Playground-käyttöliittymää

Playground on tekoälykokeilusi laboratorio. Näin hyödynnät sen mahdollisuudet maksimaalisesti:

**🎨 Kehotetyön parhaat käytännöt:**
1. **Ole täsmällinen**: Selkeät ja yksityiskohtaiset ohjeet tuottavat parempia tuloksia
2. **Anna kontekstia**: Sisällytä olennaista taustatietoa
3. **Käytä esimerkkejä**: Näytä mallille, mitä haluat esimerkein
4. **Iteroi**: Hio kehotteita alkuperäisten tulosten pohjalta

**🧪 Testausvaihtoehdot:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/fi/result.1dfcf211fb359cf6.webp)

### 🏆 Haaste: Mallien suorituskyvyn vertailu

**🎯 Tavoite**: Vertaa eri malleja identtisillä kehotteilla ymmärtääksesi niiden vahvuudet

**📋 Ohjeet:**
1. Lisää **Phi-4-mini** työtilaasi
2. Käytä samaa kehotetta sekä GPT-4.1:lle että Phi-4-minille

![set](../../../../translated_images/fi/set.88132df189ecde2c.webp)

3. Vertaa vastausten laatua, nopeutta ja tarkkuutta
4. Dokumentoi löydöksesi tulosten osiossa

![Model Comparison](../../../../translated_images/fi/compare.97746cd0f9074955.webp)

**💡 Tärkeät oivallukset:**
- Milloin käyttää LLM:iä vs. SLM:iä
- Kustannus- ja suorituskykyväärisuhteet
- Mallien erityisominaisuudet

## 🤖 Käytännön harjoitus 2: Räätälöityjen agenttien rakentaminen Agent Builderilla

**🎯 Tavoite**: Luo erikoistuneita tekoälyagentteja tiettyjä tehtäviä ja työnkulkuja varten

### 🏗️ Vaihe 1: Agent Builderin ymmärtäminen

Agent Builder on Microsoft Foundry Toolkitin kirkas tähti. Sen avulla voit luoda tarkoituksenmukaisia tekoälyavustajia, jotka yhdistävät suurten kielimallien voiman räätälöityihin ohjeisiin, erityisiin parametreihin ja erikoistuneeseen tietämykseen.

**🧠 Agentin arkkitehtuurikomponentit:**
- **Perusmalli**: LLM:n perusta (GPT-4, Groks, Phi jne.)
- **Järjestelmäkehotus**: Määrittää agentin persoonallisuuden ja käyttäytymisen
- **Parametrit**: Optimoidut asetukset suorituskyvyn maksimoimiseksi
- **Työkalujen integrointi**: Yhdistä ulkoisiin API:hin ja MCP-palveluihin
- **Muisti**: Keskustelukonteksti ja istunnon pysyvyys

![Agent Builder Interface](../../../../translated_images/fi/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Vaihe 2: Syväsukellus agentin konfigurointiin

**🎨 Tehokkaiden järjestelmäkehotteiden luominen:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Voit tietenkin käyttää myös Generate System Prompt -toimintoa, jossa AI auttaa sinua luomaan ja optimoimaan kehotteita*

**🔧 Parametrien optimointi:**
| Parametri | Suositeltu alue | Käyttötapaus |
|-----------|------------------|--------------|
| **Temperature** | 0.1-0.3 | Tekninen/faktuaalinen vastaus |
| **Temperature** | 0.7-0.9 | Luovat/aivoriihi-tehtävät |
| **Max Tokens** | 500-1000 | Tiiviit vastaukset |
| **Max Tokens** | 2000-4000 | Yksityiskohtaiset selitykset |

### 🐍 Vaihe 3: Käytännön harjoitus – Python-ohjelmointiagentti

**🎯 Missio**: Luo erikoistunut Python-koodausavustaja

**📋 Konfigurointivaiheet:**

1. **Mallin valinta**: Valitse **Claude 3.5 Sonnet** (erinomainen koodiin)

2. **Järjestelmäkehotteen suunnittelu**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Parametrien konfigurointi**:
   - Temperature: 0.2 (johdonmukainen, luotettava koodi)
   - Max Tokens: 2000 (yksityiskohtaiset selitykset)
   - Top-p: 0.9 (tasapainoinen luovuus)

![Python Agent Configuration](../../../../translated_images/fi/pythonagent.5e51b406401c165f.webp)

### 🧪 Vaihe 4: Testaa Python-agenttisi

**Testatilanteet:**
1. **Perustoiminto**: "Luo funktio, joka löytää alkuluvut"
2. **Monimutkainen algoritmi**: "Toteuta binaarinen hakupuu, jolla on lisäämis-, poisto- ja hakumenetelmät"
3. **Todellisen elämän ongelma**: "Rakenna web-skräppäri, joka käsittelee pyyntörajoitukset ja uudet yritykset"
4. **Vianetsintä**: "Korjaa tämä koodi [liitä viallinen koodi]"

**🏆 Onnistumiskriteerit:**
- ✅ Koodi toimii virheittä
- ✅ Sisältää asianmukaisen dokumentaation
- ✅ Noudattaa Pythonin parhaita käytäntöjä
- ✅ Antaa selkeät selitykset
- ✅ Ehdottaa parannuksia

## 🎓 Moduuli 1 Yhteenveto & Seuraavat askeleet

### 📊 Tietojen tarkistus

Testaa ymmärryksesi:
- [ ] Osaatko selittää eron mallien välillä katalogissa?
- [ ] Oletko onnistuneesti luonut ja testannut räätälöidyn agentin?
- [ ] Ymmärrätkö, miten parametreja optimoidaan eri käyttötapauksiin?
- [ ] Osaatko suunnitella tehokkaita järjestelmäkehotteita?

### 📚 Lisäresurssit

- **Microsoft Foundry Toolkit -dokumentaatio**: [Viralliset Microsoft Docsit](https://github.com/microsoft/vscode-ai-toolkit)
- **Kehotetyön opas**: [Parhaat käytännöt](https://platform.openai.com/docs/guides/prompt-engineering)
- **Microsoft Foundry Toolkitiin sisältyvät mallit**: [Kehitteillä olevat mallit](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Onnittelut!** Olet hallinnut Microsoft Foundry Toolkitin perusteet ja olet valmis rakentamaan edistyneempiä tekoälysovelluksia!

### 🔜 Jatka seuraavaan moduuliin

Valmiina edistyneempiin ominaisuuksiin? Jatka **[Moduuliin 2: MCP with Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)**, jossa opit:
- Yhdistämään agentit ulkoisiin työkaluihin Model Context Protocolin (MCP) avulla
- Rakentamaan selaimen automaatioagenteja Playwrightilla
- Integroimaan MCP-palvelimet Microsoft Foundry Toolkit -agenteihisi
- Tehostamaan agentejasi ulkoisilla tiedoilla ja ominaisuuksilla

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->