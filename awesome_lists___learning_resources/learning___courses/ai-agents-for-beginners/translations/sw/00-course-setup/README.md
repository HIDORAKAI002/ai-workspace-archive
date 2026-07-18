# Mpangilio wa Kozi

## Utangulizi

Somo hili litaelezea jinsi ya kuendesha mifano ya nambari ya kozi hii.

## Jiunge na Wanafunzi Wengine na Pata Msaada

Kabla hujaanza kunakili repo yako, jiunge na [AI Agents For Beginners Discord channel](https://aka.ms/ai-agents/discord) kupata msaada wowote wa usanidi, maswali yoyote kuhusu kozi, au kuungana na wanafunzi wengine.

## Nakili au Fork Repo hii

Kuanzia, tafadhali nakili au fork GitHub Repository. Hii itakuwezesha kuwa na toleo lako la vifaa vya kozi ili uweze kuendesha, kujaribu, na kuboresha nambari!

Hii inaweza kufanywa kwa kubofya kiungo cha <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">kufork repo</a>

Sasa unapaswa kuwa na toleo lako lililoforkiwa la kozi hii kwenye kiungo kinachofuata:

![Forked Repo](../../../translated_images/sw/forked-repo.33f27ca1901baa6a.webp)

### Nakili Yenye Kina Kidogo (inayopendekezwa kwa warsha / Codespaces)

  >Repo kamili inaweza kuwa kubwa (~3 GB) unapopakua historia kamili na faili zote. Kama unahudhuria warsha tu au unahitaji folda chache za somo tu, nakili yenye kina kidogo (au nakili sparse) huondoa pakubwa ya kupakua kwa kufupisha historia na/au kuacha blobs.

#### Nakili ya kina kidogo haraka — historia minimal, faili zote

Badilisha `<your-username>` katika amri zilizo chini na URL ya fork yako (au URL ya upstream kama unapendelea).

Ili kunakili historia ya utekelezaji wa hivi karibuni pekee (pakua ndogo):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Ili kunakili tawi maalum:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Nakili Sehemu (sparse) — blobs minimal + folda zilizochaguliwa pekee

Hii inatumia nakili sehemu na sparse-checkout (inahitaji Git 2.25+ na inashauriwa kutumia Git ya kisasa yenye msaada wa nakili sehemu):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Ingia katika folda ya repo:

```bash|powershell
cd ai-agents-for-beginners
```

Kisha bainisha ni folda zipi unazotaka (mfano hapa chini unaonesha folda mbili):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Baada ya kunakili na kuthibitisha faili, kama unahitaji faili pekee na unataka kuondoa nafasi (bila historia ya git), tafadhali futa metadata ya repo (💀hairejeshwi — utapoteza uwezo wote wa Git: hakuna comitt, pull, push, au ufikiaji wa historia).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Kutumia GitHub Codespaces (inapendekezwa kuepuka upakuaji mkubwa wa eneo lako)

- Tengeneza Codespace mpya kwa repo hii kupitia [GitHub UI](https://github.com/codespaces).  

- Katika terminal ya codespace mpya, endesha moja ya amri za nakili yenye kina kidogo/sparse hapo juu ili kuleta folda za somo unazohitaji tu kwenye eneo la Codespace.
- Hiari: baada ya kunakili ndani ya Codespaces, ondoa .git ili kurudisha nafasi zaidi (ona amri za kuondoa hapo juu).
- Kumbuka: Kama unapendelea kufungua repo moja kwa moja ndani ya Codespaces (bila nakili za ziada), fahamu Codespaces itaunda mazingira ya devcontainer na bado inaweza kupeleka zaidi ya unavyohitaji. Kunakili nakili yenye kina kidogo ndani ya Codespace safi kunakupa udhibiti zaidi juu ya matumizi ya diski.

#### Vidokezo

- Daima badilisha URL ya nakili na fork yako ikiwa unataka kuhariri/kufanya commit.
- Ikiwa baadaye unahitaji historia zaidi au faili, unaweza kuvipata au kubadilisha sparse-checkout kujumuisha folda za ziada.

## Kuendesha Nambari

Kozi hii inatoa mfululizo wa Jupyter Notebooks ambao unaweza kuendesha kupata uzoefu wa vitendo kujenga AI Agents.

Mfano wa nambari hutumia **Microsoft Agent Framework (MAF)** na `FoundryChatClient`, inayounganisha na **Microsoft Foundry Agent Service V2** (API ya Majibu) kupitia **Microsoft Foundry**.

Notebooks zote za Python zimewekwa lebo `*-python-agent-framework.ipynb`.

## Mahitaji

- Python 3.12+
  - **KUMBUKA**: Ikiwa huna Python3.12 imewekwa, hakikisha unaiweka. Kisha tengeneza venv yako kutumia python3.12 ili kuhakikisha toleo sahihi linawekwa kutoka kwenye faili requirements.txt.
  
    >Mfano

    Tengeneza directory ya Python venv:

    ```bash|powershell
    python -m venv venv
    ```

    Kisha washawishi mazingira ya venv kwa:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Kwa mifano ya nambari inayotumia .NET, hakikisha umeweka [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) au baadaye. Kisha, angalia toleo la SDK la .NET ulilopewa:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Inahitajika kwa uthibitishaji. Iweke kutoka [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure Subscription** — Kwa kufikia Microsoft Foundry na Microsoft Foundry Agent Service.
- **Mradi wa Microsoft Foundry** — Mradi wenye mfano uliowekwa (mfano, `gpt-4.1-mini`). Angalia [Hatua 1](#hatua-1-tengeneza-mradi-wa-microsoft-foundry) hapa chini.

Tumetumia faili `requirements.txt` kwenye mizizi ya repo hii yenye vifurushi vyote vinavyohitajika vya Python kuendesha mifano ya nambari.

Unaweza kuviweka kwa kuendesha amri ifuatayo kwenye terminal yako kwenye mizizi ya repo:

```bash|powershell
pip install -r requirements.txt
```

Tunapendekeza kutengeneza mazingira ya mtandaoni ya Python ili kuepuka migongano na matatizo.

## Saidia Up VSCode

Hakikisha unatumia toleo sahihi la Python kwenye VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Sakinisha Microsoft Foundry na Microsoft Foundry Agent Service

### Hatua 1: Tengeneza Mradi wa Microsoft Foundry

Unahitaji **hub** ya Microsoft Foundry na **mradi** wenye mfano uliowekwa kuendesha notebooks.

1. Nenda [ai.azure.com](https://ai.azure.com) na ingia na akaunti yako ya Azure.
2. Tengeneza **hub** (au tumia iliyo tayari). Angalia: [Muhtasari wa rasilimali za Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Ndani ya hub, tengeneza **mradi**.
4. Wekeza mfano (mfano, `gpt-4.1-mini`) kutoka **Models + Endpoints** → **Deploy model**.

### Hatua 2: Pata EndPoint ya Mradi Wako na Jina la Akaunzi ya Mfano

Kutoka kwenye mradi wako katika lango la Microsoft Foundry:

- **Project Endpoint** — Nenda kwenye ukurasa wa **Overview** na nakili URL ya endpoint.

![Project Connection String](../../../translated_images/sw/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — Nenda **Models + Endpoints**, chagua mfano uliowekwa, na kumbuka **Deployment name** (mfano, `gpt-4.1-mini`).

### Hatua 3: Ingia Azure kwa kutumia `az login`

Notebooks zote hutumia **`AzureCliCredential`** kwa uthibitishaji — hakuna funguo za API za kusimamia. Hii inahitaji uingiaji kupitia Azure CLI.

1. **Sakinisha Azure CLI** ikiwa bado hujafanya: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Ingia** kwa kuendesha:

    ```bash|powershell
    az login
    ```

    Au ikiwa uko katika mazingira ya mbali/Codespace bila kivinjari:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Chagua usajili wako** ikiwa utaombwa — chagua lile lenye mradi wako wa Foundry.

4. **Thibitisha** umeingia:

    ```bash|powershell
    az account show
    ```

> **Kwa nini `az login`?** Notebooks hutumia uthibitishaji kwa `AzureCliCredential` kutoka kifurushi cha `azure-identity`. Hii ina maana kwamba kikao chako cha Azure CLI kinatoa sifa — hakuna funguo za API au siri kwenye faili yako `.env`. Hii ni [mazoea bora ya usalama](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Hatua 4: Tengeneza Faili yako `.env`

Nakili faili la mfano:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Fungua `.env` na jaza haya maadili mawili:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Kigezo | Wapi kupatikana |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Lango la Foundry → mradi wako → ukurasa wa **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Lango la Foundry → **Models + Endpoints** → jina la mfano uliowekwa |

Hiyo ni yote kwa masomo mengi! Notebooks zitafanya uthibitishaji moja kwa moja kupitia kikao chako cha `az login`.

### Hatua 5: Sakinisha Mipango ya Python

```bash|powershell
pip install -r requirements.txt
```

Tunapendekeza kuendesha hii ndani ya mazingira ya mtandaoni uliyoanzisha awali.

## Mpangilio Zaidi kwa Somo la 5 (Agentic RAG)

Somo la 5 linatumia **Azure AI Search** kwa ajili ya kizazi kilichosaidiwa na upatikanaji. Ikiwa unapanga kuendesha somo hilo, ongeza vipengele hivi kwenye faili yako `.env`:

| Kigezo | Wapi kupatikana |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Lango la Azure → rasilimali yako ya **Azure AI Search** → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Lango la Azure → rasilimali yako ya **Azure AI Search** → **Settings** → **Keys** → ufunguo mkuu wa admin |

## Mpangilio Zaidi kwa Masomo Yanayopiga Azure OpenAI Moja kwa Moja (Masomo 6 na 8)

Baadhi ya notebooks katika masomo 6 na 8 hupiga **Azure OpenAI** moja kwa moja (kutumia API ya Majibu) badala ya kupitia mradi wa Microsoft Foundry. Mifano hii zamani ilitumia GitHub Models, ambayo imepitwa na wakati (itaachwa ufanyike Julai 2026) na haisaidii API ya Majibu. Ikiwa unapanga kuendesha mifano hii, ongeza vipengele hivi kwenye faili yako `.env`:

| Kigezo | Wapi kupatikana |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Lango la Azure → rasilimali yako ya **Azure OpenAI** → **Keys and Endpoint** → Endpoint (mfano `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Jina la mfano uliowekwa (mfano `gpt-4.1-mini`) unaounga mkono API ya Majibu |
| `AZURE_OPENAI_API_KEY` | Hiari — ikiwa unatumia uthibitishaji kwa funguo badala ya `az login` / Entra ID |

> API ya Majibu hutumia endpoint thabiti ya `/openai/v1/`, kwa hivyo hakuna `api-version` inayohitajika. Ingia kwa `az login` kutumia uthibitishaji wa Entra ID bila funguo.

## Mtoaji Mbadala: MiniMax (Inayolingana na OpenAI)

[MiniMax](https://platform.minimaxi.com/) hutoa mifano yenye muktadha mkubwa (hadi tokeni 204K) kupitia API inayolingana na OpenAI. Kwa kuwa Microsoft Agent Framework's `OpenAIChatClient` hufanya kazi na endpoint yoyote inayolingana na OpenAI, unaweza kutumia MiniMax kama mbadala wa moja kwa moja wa Azure OpenAI au OpenAI.

Ongeza vipengele hivi kwenye faili yako `.env`:

| Kigezo | Wapi kupatikana |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → Funguo za API |
| `MINIMAX_BASE_URL` | Tumia `https://api.minimax.io/v1` (thamani ya msingi) |
| `MINIMAX_MODEL_ID` | Jina la mfano wa kutumia (mfano, `MiniMax-M3`) |

**Mifano ya mfano**: `MiniMax-M3` (inayopendekezwa), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (majibu ya haraka). Majina ya mifano na upatikanaji yanaweza kubadilika kwa muda, na kupata mfano fulani kunaweza kutegemea akaunti yako au eneo — angalia [MiniMax Platform](https://platform.minimaxi.com/) kwa orodha ya sasa. Ikiwa `MiniMax-M3` haipatikani kwa akaunti yako, weka `MINIMAX_MODEL_ID` kwa mfano unaopatikana kwake (mfano `MiniMax-M2.7`).

Mifano ya nambari inayotumia `OpenAIChatClient` (mfano, mtiririko wa uhifadhi hoteli wa Somo la 14) itatambua na kutumia usanidi wako wa MiniMax kiotomatiki wakati `MINIMAX_API_KEY` imesanidiwa.

## Mtoaji Mbadala: Foundry Local (Endesha Mifano Kwenye Kifaa)

[Foundry Local](https://foundrylocal.ai) ni mazingira mepesi yanayopakua, kusimamia, na kuhudumia mifano ya lugha **kote kwenye mashine yako mwenyewe** kupitia API inayolingana na OpenAI — hakuna wingu, hakuna usajili wa Azure, na hakuna funguo za API. Ni chaguo zuri kwa maendeleo ya nje ya mtandao, kujaribu bila gharama za wingu, au kuhifadhi data kwenye kifaa.

Kwa kuwa Microsoft Agent Framework's `OpenAIChatClient` hufanya kazi na endpoint yoyote inayolingana na OpenAI, Foundry Local ni mbadala wa ndani wa moja kwa moja wa Azure OpenAI.

**1. Sakinisha Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Pakua na endesha mfano** (hii pia inaanzisha huduma ya ndani):

```bash
foundry model list          # ona mifano iliyopo
foundry model run phi-4-mini
```

**3. Sakinisha SDK ya Python** inayotumiwa kugundua endpoint ya ndani:

```bash
pip install foundry-local-sdk
```

**4. Elekeza Microsoft Agent Framework kwenye mfano wako wa ndani:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Inapakua (ikiwa inahitajika) na kuhudumia modeli kwa ndani, kisha hugundua kiunganishi/lango.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # mfano http://localhost:<port>/v1
    api_key=manager.api_key,        # daima "haitahitajika" kwa Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Kumbuka:** Foundry Local huonyesha endpoint ya OpenAI inayolingana na **Chat Completions**. Itumie kwa maendeleo ya ndani na mazingira yasiyo ya mtandao. Kwa seti kamili ya vipengele vya **Responses API** (mazungumzo yenye hali, uendeshaji wa kina wa zana, na maendeleo ya mtindo wa mawakala), lengo ni **Azure OpenAI** au mradi wa **Microsoft Foundry** kama ilivyoonyeshwa katika masomo. Angalia [nyaraka za Foundry Local](https://foundrylocal.ai) kwa katalogi ya mifano ya sasa na msaada wa jukwaa.


## Usanidi Zaidi kwa Somo la 8 (Kazi ya Utaratibu wa Bing Grounding)

Daftari la kazi la masharti katika somo la 8 linatumia **Bing grounding** kupitia Microsoft Foundry. Ikiwa unapania kuendesha mfano huo, ongeza kigezo hiki kwenye faili yako ya `.env`:

| Kigezo | Mahali pa kukipata |
|----------|-----------------|
| `BING_CONNECTION_ID` | Portal ya Microsoft Foundry → mradi wako → **Management** → **Connected resources** → muunganisho wako wa Bing → nakili kitambulisho cha muunganisho |

## Utatuzi wa Matatizo

### Makosa ya Uhakiki wa Cheti cha SSL kwenye macOS

Ikiwa uko kwenye macOS na unakutana na kosa kama:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Hii ni tatizo linalojulikana na Python kwenye macOS ambapo vyeti vya SSL vya mfumo havitiwiaminika kiotomatiki. Jaribu suluhisho zifuatazo kwa mpangilio:

**Chaguo 1: Endesha script ya Python ya Kuweka Vyeti (inayopendekezwa)**

```bash
# Badilisha 3.XX na toleo lako la Python ulioweka (mfano, 3.12 au 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Chaguo 2: Tumia `connection_verify=False` katika daftari lako (kwa daftari za GitHub Models pekee)**

Kwenye daftari la Somo la 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), suluhisho lililowekwa kama maelezo kando tayari lipo. Ondoa maelezo ya `connection_verify=False` wakati wa kuunda mteja:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Zima uhakiki wa SSL ikiwa unakumbana na makosa ya vyeti
)
```

> **⚠️ Onyo:** Kuzima uhakiki wa SSL (`connection_verify=False`) kunapunguza usalama kwa kuepuka uthibitishaji wa cheti. Tumia hii kama suluhisho la muda tu katika mazingira ya maendeleo, usiwe tumia katika uzalishaji.

**Chaguo 3: Sakinisha na tumia `truststore`**

```bash
pip install truststore
```

Kisha ongeza yafuatayo juu ya daftari lako au script kabla ya kufanya simu yoyote za mtandao:

```python
import truststore
truststore.inject_into_ssl()
```

## Umeshikwa Wapi?

Kama una matatizo yoyote kuendesha usanidi huu, jisajili kwenye <a href="https://discord.gg/kzRShWzttr" target="_blank">Discord ya Jumuiya ya Azure AI</a> au <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">tengeneza tatizo</a>.

## Somo Lifuatao

Sasa uko tayari kuendesha msimbo wa kozi hii. Furahia kujifunza zaidi kuhusu dunia ya Maajenti wa AI! 

[Utangulizi wa Maajenti wa AI na Matumizi ya Maajenti](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->