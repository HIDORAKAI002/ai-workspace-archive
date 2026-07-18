# AGENTS.md

## Projektin yleiskatsaus

Tämä arkisto sisältää "AI Agents for Beginners" -kokonaisvaltaisen koulutuskokonaisuuden, joka opettaa kaiken tarvitsemasi AI-agenttien rakentamisesta. Kurssi koostuu 18 oppitunnista (numeroitu 00-18), jotka käsittelevät perusteita, suunnittelumalleja, kehyksiä, tuotantokäyttöönottoa, paikallisia/laitteistokohtaisia agentteja ja AI-agenttien turvallisuutta.

**Keskeiset teknologiat:**
- Python 3.12+
- Jupyter-muistikirjat interaktiiviseen oppimiseen
- AI-kehykset: Microsoft Agent Framework (MAF)
- Azure AI -palvelut: Microsoft Foundry, Microsoft Foundry Agent Service V2

**Arkkitehtuuri:**
- Oppituntikohtainen rakenne (00-15+ kansiot)
- Jokainen oppitunti sisältää: README-dokumentaation, koodiesimerkkejä (Jupyter-muistikirjat) ja kuvia
- Monikielituki automaattisen käännösjärjestelmän kautta
- Yksi Python-muistikirja per oppitunti käyttäen Microsoft Agent Frameworkia

## Asennuskomennot

### Esivaatimukset
- Python 3.12 tai uudempi
- Azure-tilaus (Microsoft Foundryä varten)
- Azure CLI asennettuna ja autentikoituna (`az login`)

### Alustava asennus

1. **Kloonaa tai forkkaa arkisto:**
   ```bash
   gh repo fork microsoft/ai-agents-for-beginners --clone
   # TAI
   git clone https://github.com/microsoft/ai-agents-for-beginners.git
   cd ai-agents-for-beginners
   ```

2. **Luo ja aktivoi Python-virtuaaliympäristö:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Windowsissa: venv\Scripts\activate
   ```

3. **Asenna riippuvuudet:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Määrittele ympäristömuuttujat:**
   ```bash
   cp .env.example .env
   # Muokkaa .env-tiedostoa API-avaimillasi ja päätepisteilläsi
   ```

### Vaaditut ympäristömuuttujat

Microsoft Foundrylle (vaadittu):
- `AZURE_AI_PROJECT_ENDPOINT` - Microsoft Foundry -projektipäätepiste
- `AZURE_AI_MODEL_DEPLOYMENT_NAME` - Mallin käyttöönoton nimi (esim. gpt-4.1-mini)

Azure AI Searchille (Oppitunti 05 - RAG):
- `AZURE_SEARCH_SERVICE_ENDPOINT` - Azure AI Search -päätepiste
- `AZURE_SEARCH_API_KEY` - Azure AI Search API-avain

Todennus: Suorita `az login` ennen muistikirjojen ajamista (käyttää `AzureCliCredential`).

## Kehitysprosessi

### Jupyter-muistikirjojen ajaminen

Jokainen oppitunti sisältää useita Jupyter-muistikirjoja eri kehyksille:

1. **Käynnistä Jupyter:**
   ```bash
   jupyter notebook
   ```

2. **Siirry oppitunnin kansioon** (esim. `01-intro-to-ai-agents/code_samples/`)

3. **Avaa ja suorita muistikirjat:**
   - `*-python-agent-framework.ipynb` - Käyttää Microsoft Agent Frameworkia (Python)
   - `*-dotnet-agent-framework.ipynb` - Käyttää Microsoft Agent Frameworkia (.NET)

### Työskentely Microsoft Agent Frameworkin kanssa

**Microsoft Agent Framework + Microsoft Foundry:**
- Tarvitsee Azure-tilauksen
- Käyttää `FoundryChatClient` Agent Service V2:lle (agentit näkyvissä Foundry-portaalissa)
- Tuotantovalmis sisäänrakennetulla havainnoitavuudella
- Tiedostomalli: `*-python-agent-framework.ipynb`

## Testausohjeet

Tämä on koulutusarkisto, joka sisältää esimerkkikoodia tuotantokoodin sijaan eikä siinä ole automaattisia testejä. Tarkista asennus ja muutokset seuraavasti:

### Manuaalinen testaus

1. **Testaa Python-ympäristö:**
   ```bash
   python --version  # Pitäisi olla 3.12 tai uudempi
   pip list | grep -E "(agent-framework|azure-ai|azure-identity)"
   ```

2. **Testaa muistikirjan suoritus:**
   ```bash
   # Muunna muistikirja skriptiksi ja suorita (testaa tuonnit)
   jupyter nbconvert --to script <lesson-folder>/code_samples/<notebook>.ipynb --stdout | python
   ```

3. **Varmista ympäristömuuttujat:**
   ```bash
   python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('✓ AZURE_AI_PROJECT_ENDPOINT' if os.getenv('AZURE_AI_PROJECT_ENDPOINT') else '✗ AZURE_AI_PROJECT_ENDPOINT missing')"
   ```

### Yksittäisten muistikirjojen suoritus

Avaa muistikirjat Jupyterissa ja suorita solut peräkkäin. Jokainen muistikirja on itsenäinen ja sisältää:
- Tuontilausumat
- Konfiguraation latauksen
- Esimerkkitoiminnallisuudet agentille
- Odotetut tulostukset markdown-soluissa

### Nopeustestit käyttöön otetuille agenteille

Oppitunneilla, joissa agentti on otettu käyttöön Microsoft Foundryn isännöimänä agenttina (01, 04, 05, 16), arkisto sisältää smoke-test-luettelot `tests/`-kansiossa, joita ajaa `.github/workflows/smoke-test.yml`-työnkulku [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) -toiminnon avulla. Nämä ovat kevyitä käyttöönottotestauksia (onko agentti saavutettavissa ja seuraako se peruskehotusodotuksia?), täydentäen arviointiputkea Oppitunneilla 10 ja 16. Katso [tests/README.md](./tests/README.md) luettelosta oppitunnin ja agentin välisen kartoituksen. Oppitunti 17 ajetaan paikallisesti Foundry Localilla eikä sillä ole isännöityä päätepistettä, joten se validoidaan suorittamalla sen muistikirja suoraan.

## Koodityyli

### Python-käytännöt

- **Python-versio**: 3.12+
- **Koodityyli**: Noudata Pythonin PEP 8 -standardeja
- **Muistikirjat**: Käytä selkeitä markdown-soluja konseptien selittämiseen
- **Tuonnit**: Ryhmittele standardikirjaston, kolmannen osapuolen ja paikalliset tuonnit

### Jupyter-muistikirjojen käytännöt

- Sisällytä kuvailevia markdown-soluja ennen koodisoluja
- Lisää muistikirjoihin tulos-esimerkkejä viitteeksi
- Käytä selkeitä muuttujanimiä, jotka vastaavat oppitunnin käsitteitä
- Pidä muistikirjan suoritusjärjestys lineaarisena (solu 1 → 2 → 3...)

### Tiedostojen järjestely

```
<lesson-number>-<lesson-name>/
├── README.md                     # Lesson documentation
├── code_samples/
│   ├── <number>-python-agent-framework.ipynb
│   └── <number>-dotnet-agent-framework.ipynb  (optional)
└── images/
    └── *.png
```

## Rakennus ja käyttöönotto

### Dokumentaation rakentaminen

Tämä arkisto käyttää Markdownia dokumentaatiossa:
- README.md -tiedostot jokaisessa oppituntikansiossa
- Pää-README.md arkiston juurella
- Automaattinen käännösjärjestelmä GitHub Actionsin kautta

### CI/CD-putki

Sijaitsee kansiossa `.github/workflows/`:

1. **co-op-translator.yml** - Automaattinen käännös yli 50 kielelle
2. **welcome-issue.yml** - Tervetulotoivotus uusille issueiden tekijöille
3. **welcome-pr.yml** - Tervetulotoivotus uusille pull request -tekijöille

### Käyttöönotto

Tämä on opetuskäyttöön tarkoitettu arkisto – ei erillistä käyttöönottoprosessia. Käyttäjät:
1. Forkkaa tai kloonaa arkisto
2. Suorita muistikirjat paikallisesti tai GitHub Codespacessa
3. Opiskele muokkaamalla ja kokeilemalla esimerkkejä

## Pull Request -ohjeet

### Ennen lähettämistä

1. **Testaa muutoksesi:**
   - Suorita vaikuttavat muistikirjat kokonaan
   - Varmista, että solut suorittuvat ilman virheitä
   - Tarkista, että tulokset ovat asianmukaisia

2. **Dokumentaatiopäivitykset:**
   - Päivitä README.md, jos lisäät uusia käsitteitä
   - Lisää kommentteja monimutkaiseen koodiin muistikirjoissa
   - Varmista, että markdown-solut selittävät tarkoituksen

3. **Tiedostomuutokset:**
   - Vältä `.env`-tiedostojen commitointia (käytä `.env.example`)
   - Älä committoi `venv/` tai `__pycache__/` -kansioita
   - Säilytä muistikirjojen tulokset silloin kun ne havainnollistavat konsepteja
   - Poista väliaikaiset tiedostot ja varmuuskopiotiedostot (`*-backup.ipynb`)

### PR-otsikon muotoilu

Käytä kuvaavia otsikoita:
- `[Lesson-XX] Lisää uusi esimerkki aiheesta <concept>`
- `[Fix] Korjaa kirjoitusvirhe oppitunti-XX READMEssä`
- `[Update] Paranna koodiesimerkkiä oppitunti-XX`
- `[Docs] Päivitä asennusohjeet`

### Pakolliset tarkistukset

- Muistikirjojen tulee suorittua ilman virheitä
- README-tiedostojen tulee olla selkeitä ja tarkkoja
- Noudata olemassa olevia koodimalleja arkistossa
- Säilytä johdonmukaisuus muiden oppituntien kanssa

## Lisähuomiot

### Yleisiä sudenkuoppia

1. **Python-version ristiriita:**
   - Käytä Pythonia versio 3.12 tai uudempi
   - Jotkut paketit eivät toimi vanhemmilla versioilla
   - Käytä `python3 -m venv` määrittelemään Python-versio selkeästi

2. **Ympäristömuuttujat:**
   - Luo aina `.env` tiedostosta `.env.example`
   - Älä committoi `.env`-tiedostoa (se on `.gitignore`-listalla)
   - Kirjaudu sisään `az login` -komennolla avaimettomaan Entra ID -todennukseen

3. **Pakettiriidat:**
   - Käytä puhdasta virtuaaliympäristöä
   - Asenna paketit `requirements.txt`-tiedoston kautta eikä yksitellen
   - Joillekin muistikirjoille saatetaan tarvita lisäpaketteja, jotka mainitaan niiden markdown-soluissa

4. **Azure-palvelut:**
   - Azure AI -palvelut vaativat aktiivisen tilauksen
   - Jotkut ominaisuudet ovat aluekohtaisia
   - Varmista, että Azure OpenAI -mallin käyttöönotto tukee Responses APIa

### Oppimispolku

Suositeltu etenemisjärjestys oppitunneissa:
1. **00-course-setup** - Aloita täältä ympäristön asennuksella
2. **01-intro-to-ai-agents** - Ymmärrä AI-agenttien perusteet
3. **02-explore-agentic-frameworks** - Opiskele erilaisia kehyksiä
4. **03-agentic-design-patterns** - Keskeiset suunnittelumallit
5. Jatka numeroiduissa oppitunneissa peräkkäin

### Kehyksen valinta

Valitse kehys tavoitteidesi mukaan:
- **Kaikki oppitunnit**: Microsoft Agent Framework (MAF) käyttäen `FoundryChatClient`-luokkaa
- **Agentit rekisteröityvät palvelinpuolella** Microsoft Foundry Agent Service V2:ssa ja näkyvät Foundry-portaalissa

### Apua saaminen

- Liity [Microsoft Foundry Community Discordiin](https://aka.ms/ai-agents/discord)
- Tutki oppituntien README-tiedostoja ohjeita varten
- Katso pääasiallinen [README.md](./README.md) kurssin yleiskatsaukseksi
- Katso [Course Setup](./00-course-setup/README.md) yksityiskohtaiset asennusohjeet

### Osallistuminen

Tämä on avoin koulutusprojekti. Osallistumista toivotaan:
- Paranna koodiesimerkkejä
- Korjaa kirjoitusvirheitä tai virheitä
- Lisää selventäviä kommentteja
- Ehdota uusia oppituntiaiheita
- Käännä lisäkielille

Katso [GitHub Issues](https://github.com/microsoft/ai-agents-for-beginners/issues) ajankohtaiset tarpeet.

## Projektikohtainen konteksti

### Monikielituki

Tämä arkisto käyttää automaattista käännösjärjestelmää:
- Yli 50 tuettua kieltä
- Käännökset sijaitsevat `/translations/<lang-code>/` kansioissa
- GitHub Actions -työnkulku hoitaa käännöspäivitykset
- Lähdetiedostot ovat englanniksi arkiston juuressa

### Oppituntien rakenne

Jokainen oppitunti noudattaa johdonmukaista kaavaa:
1. Videon pikkukuva linkillä
2. Kirjoitettu oppitunnin sisältö (README.md)
3. Koodiesimerkit useissa kehyksissä
4. Oppimistavoitteet ja esivaatimukset
5. Lisäoppimateriaalit linkitettyinä

### Koodiesimerkkien nimeäminen

Muoto: `<lesson-number>-python-agent-framework.ipynb`
- `01-python-agent-framework.ipynb` - Oppitunti 1, MAF Python
- `14-sequential.ipynb` - Oppitunti 14, MAF edistyneet mallit
- `16-python-agent-framework.ipynb` - Oppitunti 16, tuotantokäyttöinen asiakastuen agentti
- `17-local-agent-foundry-local.ipynb` - Oppitunti 17, paikallinen agentti Foundry Local + Qwen

### Erikoiskansiot

- `translated_images/` - Käännetyt kuvat eri kielelle
- `images/` - Alkuperäiset kuvat englanninkieliseen sisältöön
- `.devcontainer/` - VS Code -kehityssäiliön konfiguraatio
- `.github/` - GitHub Actions -työnkulut ja mallit

### Riippuvuudet

Keskeiset paketit `requirements.txt`-tiedostosta:
- `agent-framework` - Microsoft Agent Framework
- `a2a-sdk` - Agent-to-Agent protokollatuki
- `azure-ai-inference`, `azure-ai-projects` - Azure AI -palvelut
- `azure-identity` - Azure-todennus (AzureCliCredential)
- `azure-search-documents` - Azure AI Search -integrointi
- `mcp[cli]` - Model Context Protocol -tuki

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->