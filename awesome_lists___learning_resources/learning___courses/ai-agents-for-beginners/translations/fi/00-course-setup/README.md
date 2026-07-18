# Kurssin asennus

## Johdanto

Tässä oppitunnissa käsitellään, miten tämän kurssin koodiesimerkit suoritetaan.

## Liity muiden oppijoiden seuraan ja haki apua

Ennen kuin aloitat repositoriosi kloonaamisen, liity [AI Agents For Beginners Discord -kanavalle](https://aka.ms/ai-agents/discord) saadaksesi apua asennukseen, vastauksia kurssin kysymyksiin tai yhteyden muihin oppijoihin.

## Kloonaa tai haarauta tämä repo

Aloita kloonaamalla tai haarauttamalla GitHub-repositorio. Tämä luo oman version kurssimateriaalista, jotta voit ajaa, testata ja muokata koodia!

Tämä onnistuu klikkaamalla linkkiä <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">haarauta repositorio</a>

Sinulla pitäisi nyt olla oma haarautettu versiosi tästä kurssista seuraavan linkin takana:

![Forked Repo](../../../translated_images/fi/forked-repo.33f27ca1901baa6a.webp)

### Matala kloonaus (suositellaan työpajoihin / Codespaceseihin)

  > Koko repositorio voi olla iso (~3 GB), kun lataat koko historian ja kaikki tiedostot. Jos osallistut vain työpajaan tai tarvitset vain muutaman oppituntikansion, matala kloonaus (tai harva kloonaus) välttää suurimman osan latauksesta rajaamalla historian ja/tai ohittamalla blobit.

#### Nopea matala kloonaus — minimaalinen historia, kaikki tiedostot

Korvaa `<your-username>` alla komennoissa haarautesi URL-osoitteella (tai upstream-osoitteella, jos haluat).

Kloonaa vain uusin commit-historia (pieni lataus):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Kloonaa tietty haara:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Osittainen (harva) kloonaus — minimaalinen blobit + vain valitut kansiot

Tämä käyttää osittaista kloonausta ja sparse-checkout -toimintoa (vaatii Git 2.25+ ja suositellaan modernia Gitiä osittaistuen kanssa):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Siirry repositoriokansioon:

```bash|powershell
cd ai-agents-for-beginners
```

Määritä, mitkä kansiot haluat (esimerkissä kaksi kansiota):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Kloonauksen ja tiedostojen tarkistamisen jälkeen, jos tarvitset vain tiedostoja ja haluat vapauttaa tilaa (ei git-historiaa), poista repositorion metadata (💀 peruuttamaton — menetät kaiken Git-toiminnallisuuden: ei committeja, pullauksia, pushausta tai historiatietoja).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### GitHub Codespacesin käyttö (suositellaan paikallisten suurten latausten välttämiseksi)

- Luo uusi Codespace tälle repositoriolle [GitHub UI:n](https://github.com/codespaces) kautta.  

- Suorita äsken mainituista matala/harva kloonaus -käskyistä yksi uuden Codespace-terminaalissa tuodaksesi tarvitsemasi oppituntikansiot Codespace-työtilaan.
- Valinnainen: kloonauksen jälkeen poista Codespacessa .git vapauttaaksesi tilaa (katso poistokäskyt yllä).
- Huomaa: Jos haluat avata repo suoraan Codespacessa (ilman ylimääräistä kloonausta), tiedä että Codespaces rakentaa devcontainer-ympäristön ja saattaa silti varata enemmän kuin tarvitset. Matala kopio kloonattuna uuteen Codespaceen antaa enemmän hallintaa levytilan käytössä.

#### Vinkkejä

- Käytä aina haarasi kloonaus-URL:ää, jos haluat muokata tai tehdä committeja.
- Jos tarvitset myöhemmin lisää historiaa tai tiedostoja, voit hakea niitä tai säätää sparse-checkoutia mukaanottoa varten.

## Koodin suorittaminen

Tämä kurssi tarjoaa sarjan Jupyter-muistikirjoja, joita voit ajaa saadaksesi käytännön kokemusta AI-agenttien rakentamisesta.

Koodiesimerkit käyttävät **Microsoft Agent Frameworkia (MAF)** `FoundryChatClient` kanssa, joka yhdistää **Microsoft Foundry Agent Service V2** -palveluun (Responses API) **Microsoft Foundryn** kautta.

Kaikki Python-muistikirjat on nimetty `*-python-agent-framework.ipynb`.

## Vaatimukset

- Python 3.12+
  - **HUOM:** Jos sinulla ei ole Python 3.12:ta asennettuna, varmista, että asennat sen. Luo sen jälkeen virtuaaliympäristösi käyttäen python3.12 varmistaaksesi, että vaatimustiedostosta asennetaan oikeat versiot.
  
    >Esimerkki

    Luo Python virtuaaliympäristö-kansio:

    ```bash|powershell
    python -m venv venv
    ```

    Aktivoi sitten virtuaaliympäristö:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: .NET-koodiesimerkkejä varten varmista [.NET 10 SDK:n](https://dotnet.microsoft.com/download/dotnet/10.0) tai uudemman asennus. Tarkista asennettu .NET SDK-versio:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Vaaditaan todennukseen. Asenna osoitteesta [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure-tilaus** — Microsoft Foundry- ja Microsoft Foundry Agent Service -käyttöoikeutta varten.
- **Microsoft Foundry Projekti** — Projekti, jossa on käyttöönotettu malli (esim. `gpt-4.1-mini`). Katso [vaihe 1](#vaihe-1-luo-microsoft-foundry-projekti) alla.

Tämä repositorion juureen on lisätty `requirements.txt`-tiedosto, joka sisältää kaikki Python-paketit, joita tarvitaan koodiesimerkkien suorittamiseen.

Voit asentaa ne suorittamalla seuraavan komennon terminaalissasi repositorion juuressa:

```bash|powershell
pip install -r requirements.txt
```

Suosittelemme Python-virtuaaliympäristön käyttöä ristiriitojen ja ongelmien välttämiseksi.

## VSCode-asetukset

Varmista, että käytät oikeaa Python-versiota VSCodessa.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundryn ja Microsoft Foundry Agent Servicen asennus

### Vaihe 1: Luo Microsoft Foundry -projekti

Sinulla tulee olla Microsoft Foundry **hub** ja **projekti**, johon on otettu käyttöön malli muistikirjojen suorittamiseksi.

1. Mene osoitteeseen [ai.azure.com](https://ai.azure.com) ja kirjaudu sisään Azure-tililläsi.
2. Luo **hub** (tai käytä olemassa olevaa). Katso: [Hub resources overview](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Hubin sisällä luo **projekti**.
4. Ota käyttöön malli (esim. `gpt-4.1-mini`) kohdassa **Models + Endpoints** → **Deploy model**.

### Vaihe 2: Hae projektisi päätepiste ja mallin käyttöönoton nimi

Microsoft Foundryn portaalista projektistasi:

- **Projektin päätepiste** — Mene **Overview**-sivulle ja kopioi päätepisteen URL.

![Project Connection String](../../../translated_images/fi/project-endpoint.8cf04c9975bbfbf1.webp)

- **Mallin käyttöönoton nimi** — Mene kohtaan **Models + Endpoints**, valitse käyttöönotettu mallisi ja huomioi **Deployment name** (esim. `gpt-4.1-mini`).

### Vaihe 3: Kirjaudu Azureen `az login` -komennolla

Kaikki muistikirjat käyttävät todennuksessa **`AzureCliCredential`** — ei API-avaimia hallittavaksi. Tämä vaatii sisäänkirjautumisen Azure CLI:llä.

1. **Asenna Azure CLI** jos et vielä ole tehnyt sitä: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Kirjaudu sisään** suorittamalla:

    ```bash|powershell
    az login
    ```

    Tai, jos olet etäympäristössä / Codespacessa ilman selainta:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Valitse tilauksesi**, jos järjestelmä pyytää — valitse se, joka sisältää Foundry-projektisi.

4. **Varmista** että olet kirjautunut sisään:

    ```bash|powershell
    az account show
    ```

> **Miksi `az login`?** Muistikirjat todentavat itsensä käyttäen `AzureCliCredential`-pakettia `azure-identity`-kirjastosta. Tämä tarkoittaa, että Azure CLI -istuntosi tarjoaa tunnistetiedot — ei API-avaimia tai salaisuuksia `.env`-tiedostossasi. Tämä on [turvallisuuskäytäntöjen mukaista](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Vaihe 4: Luo `.env`-tiedostosi

Kopioi esimerkkitiedosto:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Avaa `.env` ja täytä nämä kaksi arvoa:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Muuttuja | Mistä löytää |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry-portaali → projektisi → **Overview**-sivu |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry-portaali → **Models + Endpoints** → käyttöönotetun mallin nimi |

Siinä se useimmille oppitunneille! Muistikirjat todennetaan automaattisesti `az login` -istunnon kautta.

### Vaihe 5: Asenna Python-riippuvuudet

```bash|powershell
pip install -r requirements.txt
```

Suosittelemme suorittamaan tämän aiemmin luodussa virtuaaliympäristössä.

## Lisäasetukset Oppitunnille 5 (Agentic RAG)

Oppitunnissa 5 käytetään **Azure AI Searchia** haettua luotua sisältöä varten. Jos aiot suorittaa tämän oppitunnin, lisää nämä muuttujat `.env`-tiedostoosi:

| Muuttuja | Mistä löytää |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure-portaali → Azure AI Search -resurssisi → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure-portaali → Azure AI Search -resurssisi → **Settings** → **Keys** → ensisijainen hallintavain |

## Lisäasetukset Oppitunneille, jotka kutsuvat Azure OpenAI -palvelua suoraan (Oppitunnit 6 ja 8)

Joissakin oppitunneissa 6 ja 8 kutsutaan **Azure OpenAI** -palvelua suoraan (käyttäen **Responses APIa**) ilman Microsoft Foundry -projektia. Nämä esimerkit käyttivät aiemmin GitHub-malleja, jotka ovat vanhentumassa (poistuu käytöstä heinäkuussa 2026) eikä tue Responses APIa. Jos aiot suorittaa näitä esimerkkejä, lisää seuraavat muuttujat `.env`-tiedostoon:

| Muuttuja | Mistä löytää |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure-portaali → Azure OpenAI -resurssi → **Keys and Endpoint** → Endpoint (esim. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Käyttöönotetun mallin nimi (esim. `gpt-4.1-mini`), joka tukee Responses APIa |
| `AZURE_OPENAI_API_KEY` | Valinnainen — jos käytät avaimiin perustuvaa autentikointia `az login` / Entra ID:n sijasta |

> Responses API käyttää vakaata `/openai/v1/` päätepistettä, joten `api-version` ei ole tarpeen. Kirjaudu sisään `az login` käyttäen avaimettomia Entra ID -todennusta.

## Vaihtoehtoinen tarjoaja: MiniMax (OpenAI-yhteensopiva)

[MiniMax](https://platform.minimaxi.com/) tarjoaa suurten kontekstien malleja (enintään 204 000 tokenia) OpenAI-yhteensopivan API:n kautta. Koska Microsoft Agent Frameworkin `OpenAIChatClient` toimii minkä tahansa OpenAI-yhteensopivan päätepisteen kanssa, voit käyttää MiniMaxia helppona vaihtoehtona Azure OpenAI:lle tai OpenAI:lle.

Lisää nämä muuttujat `.env`-tiedostoon:

| Muuttuja | Mistä löytää |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API-avaimet |
| `MINIMAX_BASE_URL` | Käytä `https://api.minimax.io/v1` (oletusarvo) |
| `MINIMAX_MODEL_ID` | Käytettävän mallin nimi (esim. `MiniMax-M3`) |

**Esimerkkejä malleista**: `MiniMax-M3` (suositus), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (nopeammat vastaukset). Mallien nimet ja saatavuus voivat muuttua ajan myötä, ja mallin käyttöoikeus voi riippua tilistäsi tai alueestasi — tarkista [MiniMax Platform](https://platform.minimaxi.com/) nykyinen lista. Jos `MiniMax-M3` ei ole käytettävissä tililläsi, aseta `MINIMAX_MODEL_ID` malliin, johon sinulla on pääsy (esim. `MiniMax-M2.7`).

Koodiesimerkit, jotka käyttävät `OpenAIChatClient`-luokkaa (esim. Oppitunti 14 hotellivarauksen työnkulku), tunnistavat ja käyttävät automaattisesti MiniMax-kokoonpanoasi, kun `MINIMAX_API_KEY` on asetettu.

## Vaihtoehtoinen tarjoaja: Foundry Local (mallien suoritus paikallisesti laitteella)

[Foundry Local](https://foundrylocal.ai) on kevyt ajonaikainen ympäristö, joka lataa, hallinnoi ja tarjoaa kielimalleja **kokonaan omalla koneellasi** OpenAI-yhteensopivan API:n kautta — ei pilveä, ei Azure-tilausta eikä API-avaimia. Erinomainen vaihtoehto offline-kehitykseen, kokeiluihin ilman pilvikuluihin liittyviä kustannuksia tai datan pitämiseen laitteella.

Koska Microsoft Agent Frameworkin `OpenAIChatClient` toimii minkä tahansa OpenAI-yhteensopivan päätepisteen kanssa, Foundry Local on paikallinen suora vaihtoehto Azure OpenAI:lle.

**1. Asenna Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Lataa ja suorita malli** (käynnistää myös paikallisen palvelun):

```bash
foundry model list          # katso saatavilla olevat mallit
foundry model run phi-4-mini
```

**3. Asenna Python-kirjasto** päätepisteen löytämiseen:

```bash
pip install foundry-local-sdk
```

**4. Aseta Microsoft Agent Framework käyttämään paikallista malliasi:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Lataa (tarvittaessa) ja palvelee mallin paikallisesti, sitten löytää päätepisteen/portin.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # esim. http://localhost:<port>/v1
    api_key=manager.api_key,        # aina "ei vaadita" Foundry Localille
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Huom:** Foundry Local tarjoaa OpenAI-yhteensopivan **Chat Completions** -päätepisteen. Käytä sitä paikalliseen kehitykseen ja offline-tilanteisiin. Täysimittaista **Responses API** -toiminnallisuutta varten (tilaustetut keskustelut, syvä työkalujen orkestrointi ja agenttityyppinen kehitys) suuntaa **Azure OpenAI** tai **Microsoft Foundry** -projektiin kuten oppitunneissa on kuvattu. Katso [Foundry Local -dokumentaatio](https://foundrylocal.ai) ajantasaisesta malliluettelosta ja alustatuesta.


## Lisäasetukset Oppitunnille 8 (Bing Grounding -työnkulku)

Ehtolauseiden työnkulun muistikirja oppitunnilla 8 käyttää **Bing grounding** -toimintoa Microsoft Foundryn kautta. Jos aiot suorittaa tämän esimerkin, lisää tämä muuttuja `.env`-tiedostoosi:

| Muuttuja | Missä se löytyy |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry -portaali → projektisi → **Hallinta** → **Yhdistetyt resurssit** → Bing-yhteytesi → kopioi yhteyden tunnus |

## Vianetsintä

### SSL-sertifikaatin varmennusvirheet macOS:ssä

Jos käytät macOS:ää ja kohtaat virheen, kuten:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Tämä on tunnettu ongelma Pythonin kanssa macOS:ssä, jossa järjestelmän SSL-sertifikaatteja ei automaattisesti luoteta. Kokeile seuraavia ratkaisuja tässä järjestyksessä:

**Vaihtoehto 1: Suorita Pythonin Install Certificates -skripti (suositeltu)**

```bash
# Korvaa 3.XX asennetulla Python-versiollasi (esim. 3.12 tai 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Vaihtoehto 2: Käytä `connection_verify=False` muistikirjassasi (vain GitHub Models -muistikirjoille)**

Oppitunnin 6 muistikirjassa (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) on jo kommentoitu ratkaisu. Poista kommenttimerkintä `connection_verify=False` -riviltä, kun luot clientin:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Poista SSL-tarkistus käytöstä, jos kohtaat varmenteiden virheitä
)
```

> **⚠️ Varoitus:** SSL-varmennuksen poistaminen käytöstä (`connection_verify=False`) heikentää turvallisuutta ohittamalla sertifikaatin tarkistuksen. Käytä tätä vain väliaikaisena ratkaisuna kehitysympäristöissä, älä koskaan tuotannossa.

**Vaihtoehto 3: Asenna ja käytä `truststore`-kirjastoa**

```bash
pip install truststore
```

Lisää sitten seuraava koodi muistikirjasi tai skriptisi alkuun ennen verkkoyhteyksiä:

```python
import truststore
truststore.inject_into_ssl()
```

## Jumiuduitko johonkin?

Jos sinulla on ongelmia tämän asennuksen kanssa, liity <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord -kanavalle</a> tai <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">luo uusi issue</a>.

## Seuraava oppitunti

Nyt olet valmis suorittamaan tämän kurssin koodin. Onnellista oppimista tekoälyagenttien maailmassa! 

[Johdatus tekoälyagentteihin ja agenttien käyttötapauksiin](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->