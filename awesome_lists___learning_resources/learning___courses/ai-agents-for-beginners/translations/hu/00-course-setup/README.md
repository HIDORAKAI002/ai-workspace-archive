# Tanfolyam Beállítása

## Bevezetés

Ez a lecke ismerteti, hogyan futtassuk a kurzus kódpéldáit.

## Csatlakozz más tanulókhoz és kérj segítséget

Mielőtt elkezdenéd klónozni a repodat, csatlakozz az [AI Agents For Beginners Discord csatornához](https://aka.ms/ai-agents/discord), hogy segítséget kapj a beállításhoz, válaszokat a kurzussal kapcsolatos kérdéseidre, vagy kapcsolatba léphess más tanulókkal.

## Klónozd vagy forkold ezt a repót

Kezdetnek, klónozd vagy forkold a GitHub tárhelyet. Ezáltal saját verziód lesz a kurzus anyagából, hogy futtathasd, tesztelhesd és módosíthasd a kódot!

Ezt megteheted a <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">repo fork-olására kattintva</a>

Most már a saját fork-olt verzióddal kell rendelkezned a következő linken:

![Forkolt Repo](../../../translated_images/hu/forked-repo.33f27ca1901baa6a.webp)

### Felületes klón (ajánlott workshop/codespaces esetén)

  >A teljes repository nagy lehet (~3 GB), ha a teljes történettel és összes fájllal töltöd le. Ha csak a workshopon veszel részt, vagy csak néhány lecke mappára van szükséged, egy felületes klón (vagy ritkított klón) elkerüli a letöltés nagy részét a történet lemetszésével és/vagy blobok kihagyásával.

#### Gyors felületes klón — minimális történelem, minden fájl

Cseréld le a `<your-username>` részt az alábbi parancsokban a fork-od URL-jére (vagy az upstream URL-re, ha azt preferálod).

Csak az utolsó commit történelmének klónozásához (kis letöltés):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Egy adott ág klónozásához:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Részleges (ritkított) klón — minimális blobok + csak kiválasztott mappák

Ez részleges klónt és sparse-checkout-ot használ (Git 2.25+ szükséges és ajánlott modern Git részleges klón támogatással):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Navigálj a repo mappába:

```bash|powershell
cd ai-agents-for-beginners
```

Majd add meg, mely mappákat szeretnéd (az alábbi példa két mappát mutat):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

A klónozás és a fájlok ellenőrzése után, ha csak fájlokra van szükséged és helyet szeretnél felszabadítani (nincs git történet), töröld a repository metaadatait (💀visszavonhatatlan — elveszíted az összes Git funkciót: sem commitot, sem pullt, sem push-t vagy történet hozzáférést).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### GitHub Codespaces használata (ajánlott a helyi nagy letöltések elkerülésére)

- Hozz létre egy új Codespace-t ehhez a repóhoz a [GitHub UI](https://github.com/codespaces) felületén.  

- Az új Codespace termináljában futtasd az egyik felületes/ritkított klón parancsot fent, hogy csak a szükséges lecke mappák kerüljenek be a Codespace munkaterületébe.
- Opcionális: a klónozás után Codespaces-ben távolítsd el a .git könyvtárat, hogy plusz helyet szabadíts fel (lásd fent a törlési parancsokat).
- Megjegyzés: Ha inkább megnyitnád a repót közvetlenül Codespaces-ben (klónozás nélkül), légy tudatában, hogy Codespaces létrehozza a devcontainer környezetet, és lehet, hogy még több mindent szolgáltat, mint amire szükséged van. Egy felületes klón egy új Codespace-en belül több kontrollt ad a lemezhasználat felett.

#### Tippek

- Mindig cseréld le a klón URL-jét a forkodra, ha szerkeszteni/következtetni akarsz.
- Ha később több történetre vagy fájlra lenne szükséged, lehúzhatod azokat vagy beállíthatod a sparse-checkout-ot, hogy több mappát tartalmazzon.

## A Kód Futtatása

Ez a kurzus egy sor Jupyter Notebook-ot kínál, amelyeket futtathatsz, hogy kézzel fogható tapasztalatokat szerezz AI Ügynökök építésében.

A kódpéldák a **Microsoft Agent Framework (MAF)**-et használják a `FoundryChatClient`-tel, amely kapcsolódik a **Microsoft Foundry Agent Service V2**-höz (a Responses API-hoz) a **Microsoft Foundry**-on keresztül.

Minden Python notebook neve `*-python-agent-framework.ipynb`.

## Követelmények

- Python 3.12+
  - **MEGJEGYZÉS**: Ha nincs telepítve Python3.12, győződj meg róla, hogy telepíted. Ezután hozd létre a virtuális környezeted python3.12-vel, hogy a requirements.txt-ből a megfelelő verziók kerüljenek telepítésre.
  
    >Példa

    Python virtuális környezet könyvtár létrehozása:

    ```bash|powershell
    python -m venv venv
    ```

    Ezután aktiváld a virtuális környezetet:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: A .NET-et használó példa kódokhoz győződj meg a [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) vagy újabb telepítéséről. Ezután ellenőrizd a telepített .NET SDK verziót:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Hitelesítéshez szükséges. Telepítsd a [aka.ms/installazurecli](https://aka.ms/installazurecli) oldalról.
- **Azure Előfizetés** — A Microsoft Foundry és Microsoft Foundry Agent Service hozzáféréshez.
- **Microsoft Foundry Projekt** — Egy projekt telepített modellel (pl. `gpt-4.1-mini`). Lásd az [1. lépést](#1-lépés-hozz-létre-egy-microsoft-foundry-projektet) lent.

Tartalmazunk egy `requirements.txt` fájlt a repository gyökerében, amely minden szükséges Python csomagot tartalmaz a kódpéldák futtatásához.

Telepítheted őket az alábbi parancs futtatásával a terminalban a repository gyökerénél:

```bash|powershell
pip install -r requirements.txt
```

Ajánlott Python virtuális környezet létrehozása a konfliktusok és problémák elkerülése érdekében.

## VSCode Beállítása

Győződj meg róla, hogy a megfelelő Python verziót használod VSCode-ban.

![kép](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry és Microsoft Foundry Agent Service Beállítása

### 1. lépés: Hozz létre egy Microsoft Foundry Projektet

Egy Microsoft Foundry **hub**-ra és **projektre** van szükséged egy telepített modellel, hogy futtasd a notebookokat.

1. Látogass el az [ai.azure.com](https://ai.azure.com) oldalra és jelentkezz be Azure fiókoddal.
2. Hozz létre egy **hubot** (vagy használj egy meglévőt). Lásd: [Hub erőforrások áttekintése](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. A hubon belül hozz létre egy **projektet**.
4. Telepíts egy modellt (pl. `gpt-4.1-mini`) a **Models + Endpoints** → **Deploy model** menüpontból.

### 2. lépés: Szerezd meg a projekt végpontját és a modell telepítés nevét

A Microsoft Foundry portálon a projektedből:

- **Projekt Végpont** — Lépj az **Áttekintés** oldalra és másold ki a végpont URL-jét.

![Projekt Kapcsolati Karakterlánc](../../../translated_images/hu/project-endpoint.8cf04c9975bbfbf1.webp)

- **Modell telepítésének neve** — Lépj a **Models + Endpoints** menübe, válaszd ki a telepített modelledet, és jegyezd fel a **Telepítés nevét** (pl. `gpt-4.1-mini`).

### 3. lépés: Jelentkezz be az Azure-ba az `az login` paranccsal

Minden notebook a **`AzureCliCredential`**-t használja hitelesítésre — nincs szükség API kulcsok kezelgetésére. Ehhez be kell jelentkezned az Azure CLI-n keresztül.

1. **Telepítsd az Azure CLI-t** ha még nincs fent: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Jelentkezz be** a következő paranccsal:

    ```bash|powershell
    az login
    ```

    Vagy ha egy távoli/Codespace környezetben vagy, ahol nincs böngésző:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Válaszd ki az előfizetésed**, ha kéri — válaszd azt, amelyik tartalmazza a Foundry projektedet.

4. **Ellenőrizd**, hogy be vagy jelentkezve:

    ```bash|powershell
    az account show
    ```

> **Miért az `az login`?** A notebookok az `AzureCliCredential`-t használják hitelesítéshez az `azure-identity` csomagon keresztül. Ez azt jelenti, hogy az Azure CLI munkameneted adja az hitelesítő adatokat — nincs szükség API kulcsokra vagy titkokra a `.env` fájlban. Ez egy [biztonsági bevált gyakorlat](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### 4. lépés: Készítsd el a `.env` fájlod

Másold az mintafájlt:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Nyisd meg a `.env` fájlt és töltsd ki az alábbi két értéket:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Változó | Hol találod |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry portál → a projekted → **Áttekintés** oldal |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry portál → **Models + Endpoints** → a telepített modelled neve |

Ennyi a legtöbb leckéhez! A notebookok automatikusan hitelesítenek majd az `az login` munkameneteden keresztül.

### 5. lépés: Telepítsd a Python függőségeket

```bash|powershell
pip install -r requirements.txt
```

Ajánlott ezt a korábban létrehozott virtuális környezetben futtatni.

## Kiegészítő Beállítás az 5. leckéhez (Agentic RAG)

Az 5. lecke az **Azure AI Search**-t használja a lekérdezés-alapú generáláshoz. Ha futtatni szeretnéd ezt a leckét, add hozzá ezeket a változókat a `.env` fájlodhoz:

| Változó | Hol találod |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure portál → a **Azure AI Search** erőforrásod → **Áttekintés** → URL |
| `AZURE_SEARCH_API_KEY` | Azure portál → a **Azure AI Search** erőforrásod → **Beállítások** → **Kulcsok** → elsődleges admin kulcs |

## Kiegészítő beállítás azokhoz a leckékhez, amelyek közvetlenül az Azure OpenAI-t hívják (6. és 8. lecke)

Egyes notebookok a 6. és 8. leckéből közvetlenül az **Azure OpenAI**-t hívják (a **Responses API**-t használva) a Microsoft Foundry projekten keresztüli kapcsolódás helyett. Ezek a példák korábban GitHub Modelleket használtak, amelyek elavultak (2026 júliusában megszűnnek) és nem támogatják a Responses API-t. Ha futtatni szeretnéd ezeket, add hozzá ezeket a változókat a `.env` fájlodhoz:

| Változó | Hol találod |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | Azure portál → az **Azure OpenAI** erőforrásod → **Kulcsok és Végpont** → Végpont (pl. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | A telepített modelled neve (pl. `gpt-4.1-mini`), amely támogatja a Responses API-t |
| `AZURE_OPENAI_API_KEY` | Opcionális — csak, ha kulcsos hitelesítést használsz az `az login` / Entra ID helyett |

> A Responses API a stabil `/openai/v1/` végpontot használja, ezért nem szükséges `api-version`. Jelentkezz be az `az login` parancssal a kulcs nélküli Entra ID hitelesítéshez.

## Alternatív szolgáltató: MiniMax (OpenAI-kompatibilis)

A [MiniMax](https://platform.minimaxi.com/) nagy kontextusú modelleket (akár 204K token) kínál OpenAI-kompatibilis API-n keresztül. Mivel a Microsoft Agent Framework `OpenAIChatClient` bármely OpenAI-kompatibilis végponttal működik, MiniMax használható alternatívaként Azure OpenAI vagy OpenAI helyett.

Add ezeket a változókat a `.env` fájlodhoz:

| Változó | Hol találod |
|----------|-----------------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API kulcsok |
| `MINIMAX_BASE_URL` | `https://api.minimax.io/v1` használata (alapértelmezett érték) |
| `MINIMAX_MODEL_ID` | A használandó modell neve (pl. `MiniMax-M3`) |

**Példa modellek**: `MiniMax-M3` (ajánlott), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (gyorsabb válaszok). A modellek neve és elérhetősége változhat, és egy adott modellhez való hozzáférés függhet a fiókodatól vagy régiótól — ellenőrizd a [MiniMax Platformot](https://platform.minimaxi.com/) a jelenlegi listáért. Ha a `MiniMax-M3` nem elérhető számodra, állítsd be a `MINIMAX_MODEL_ID`-t olyan modellre, amihez hozzáférsz (pl. `MiniMax-M2.7`).

Azok a kódpéldák, amelyek az `OpenAIChatClient`-et használják (pl. a 14. lecke hotel foglalás munkafolyamata), automatikusan felismerik és használják a MiniMax beállításaidat, ha a `MINIMAX_API_KEY` be van állítva.

## Alternatív szolgáltató: Foundry Local (Modellek futtatása helyben)

A [Foundry Local](https://foundrylocal.ai) egy könnyű futtatókörnyezet, amely letölti, kezeli és szolgáltatja a nyelvi modelleket **teljes egészében a saját gépeden** egy OpenAI-kompatibilis API-n keresztül — nincs felhő, nincs Azure előfizetés, és nincs szükség API kulcsokra. Kitűnő választás offline fejlesztéshez, költség nélküli kipróbáláshoz, vagy ha az adatokat a helyi gépen szeretnéd tartani.

Mivel a Microsoft Agent Framework `OpenAIChatClient` bármely OpenAI-kompatibilis végponttal működik, a Foundry Local a helyi alternatíva az Azure OpenAI helyett.

**1. Telepítsd a Foundry Local-t**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Tölts le és futtass egy modellt** (ez elindítja a helyi szolgáltatást is):

```bash
foundry model list          # lásd az elérhető modelleket
foundry model run phi-4-mini
```

**3. Telepítsd a Python SDK-t**, amely felfedezi a helyi végpontot:

```bash
pip install foundry-local-sdk
```

**4. Állítsd be a Microsoft Agent Framework-öt, hogy a helyi modellt használja:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Letölti (ha szükséges) és helyben kiszolgálja a modellt, majd felderíti a végpontot/portot.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # pl. http://localhost:<port>/v1
    api_key=manager.api_key,        # mindig "nem szükséges" a Foundry Local esetében
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Megjegyzés:** A Foundry Local egy OpenAI-kompatibilis **Chat Completions** végpontot biztosít. Használd helyi fejlesztéshez és offline forgatókönyvekhez. A teljes **Responses API** funkciókészlethez (állapotkövető beszélgetések, komplex eszközösszetétel és ügynök-stílusú fejlesztés) használd az **Azure OpenAI**-t vagy egy **Microsoft Foundry** projektet, ahogy a leckékben bemutatjuk. Lásd a [Foundry Local dokumentációját](https://foundrylocal.ai) a jelenlegi modellkatalógusért és platformtámogatásért.


## További beállítás a 8. leckéhez (Bing alapozó munkafolyamat)

A 8. lecke feltételes munkafolyamatos notebookja Microsoft Foundry-n keresztül **Bing alapozást** használ. Ha futtatni szeretnéd ezt a példát, add hozzá ezt a változót a `.env` fájlodhoz:

| Változó | Hol található |
|----------|-----------------|
| `BING_CONNECTION_ID` | Microsoft Foundry portál → a projekted → **Kezelés** → **Kapcsolt erőforrások** → a Bing kapcsolatod → másold ki a kapcsolat azonosítóját |

## Hibakeresés

### SSL tanúsítvány ellenőrzési hibák macOS-en

Ha macOS-t használsz, és ilyen hibával találkozol:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Ez egy ismert probléma a macOS Python esetén, ahol a rendszer SSL tanúsítványait nem bízzák meg automatikusan. Próbáld ki a következő megoldásokat sorrendben:

**1. lehetőség: Futtasd Python Install Certificates szkriptjét (ajánlott)**

```bash
# Cseréld ki a 3.XX-et a telepített Python verziódra (pl. 3.12 vagy 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**2. lehetőség: Használd a `connection_verify=False` paramétert a notebookodban (csak GitHub Models notebookokhoz)**

A 6. lecke notebookjában (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) már szerepel egy kikommentezett megoldás. Vedd ki a kommentet a `connection_verify=False` paraméter elől, amikor létrehozod az ügyfelet:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Tiltsa le az SSL ellenőrzést, ha tanúsítványhibákat tapasztal
)
```

> **⚠️ Figyelem:** Az SSL ellenőrzés letiltása (`connection_verify=False`) csökkenti a biztonságot azzal, hogy kihagyja a tanúsítvány érvényesítését. Csak ideiglenes megoldásként használd fejlesztési környezetben, soha ne éles környezetben.

**3. lehetőség: Telepítsd és használd a `truststore`-t**

```bash
pip install truststore
```

Ezután add hozzá a következőt a notebook vagy szkript elejére, mielőtt hálózati hívásokat végzel:

```python
import truststore
truststore.inject_into_ssl()
```

## Elakadtál valahol?

Ha bármilyen probléma adódik ennek a beállításnak a futtatásakor, lépj be a <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> szerverünkre vagy <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">jelents hibát</a>.

## Következő lecke

Most már készen állsz a kurzus kódjának futtatására. Jó tanulást az AI Ügynökök világáról! 

[Bevezetés az AI ügynökökbe és az ügynök hasznosítási esetekbe](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Jogi nyilatkozat**:
Ez a dokumentum az AI fordítási szolgáltatás, a [Co-op Translator](https://github.com/Azure/co-op-translator) segítségével készült. Bár az pontosságra törekszünk, kérjük, vegye figyelembe, hogy az automatikus fordítások hibákat vagy pontatlanságokat tartalmazhatnak. Az eredeti dokumentum az anyanyelvén tekintendő hiteles forrásnak. Fontos információk esetén professzionális emberi fordítást javasolunk. Nem vállalunk felelősséget semmilyen félreértésért vagy téves értelmezésért, amely ebből a fordításból ered.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->