# Kurso nustatymas

## Įvadas

Ši pamoka apims, kaip paleisti šio kurso kodo pavyzdžius.

## Prisijunkite prie kitų besimokančiųjų ir gaukite pagalbą

Prieš pradėdami klonuoti savo repozitoriją, prisijunkite prie [AI Agents For Beginners Discord kanalo](https://aka.ms/ai-agents/discord), kad gautumėte pagalbą dėl nustatymo, užduotumėte klausimus apie kursą arba susisiektumėte su kitais besimokančiaisiais.

## Klonuokite arba šaknytės kopiją susikurkite šį repozitoriją

Norėdami pradėti, prašome klonuoti arba šaknytės kopiją susikurti GitHub repozitoriją. Tai sukurs jūsų asmeninę kurso medžiagos kopiją, kad galėtumėte paleisti, testuoti ir keisti kodą!

Tai galima padaryti paspaudus nuorodą į <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">repo šaknytės kopijos sukūrimą</a>.

Dabar turėtumėte savo šaknytės kopiją šios nuorodos pagrindu:

![Šaknytės kopija](../../../translated_images/lt/forked-repo.33f27ca1901baa6a.webp)

### Paviršutinis klonavimas (rekomenduojama dirbtuvei / Codespaces)

  > Pilnas repozitorijos klonavimas gali būti didelis (~3 GB), kai atsisiunčiate visą istoriją ir visus failus. Jei dalyvaujate tik dirbtuvėse arba jums reikalingos tik kelios pamokų bylos, paviršutinis klonavimas (arba reti failų klonavimas) leidžia išvengti daugumos atsisiuntimo, sukirsdamas istoriją ir/ar praleisdamas juodus failus.

#### Greitas paviršutinis klonavimas — minimali istorija, visi failai

Pakeiskite `<your-username>` žemiau komandose savo šaknytės URL (arba pirminio URL, jei pageidaujate).

Norėdami klonuoti tik naujausią įsipareigojimo istoriją (nedidelis atsisiuntimas):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Norėdami klonuoti konkrečią šaką:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Dalinis (retas) klonavimas — minimalūs duomenų blokai + tik pasirinktos aplankos

Tai naudoja dalinį klonavimą ir retą patikrinimą (reikia Git 2.25+ ir rekomenduojama naujausia Git versija su dalinio klonavimo palaikymu):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Eikite į repozitorijos aplanką:

```bash|powershell
cd ai-agents-for-beginners
```

Tada nurodykite, kuriuos aplankus norite gauti (žemiau pavyzdyje rodomi du aplankai):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Po klonavimo ir failų patikrinimo, jei jums reikalingi tik failai ir norite atlaisvinti vietos (be git istorijos), prašome ištrinti repozitorijos metaduomenis (💀negrįžtama – prarasite visą Git funkcionalumą: nebus įsipareigojimų, atnaujinimų, nusiuntimų ar prieigos prie istorijos).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Naudojant GitHub Codespaces (rekomenduojama išvengti didelių vietinių atsisiuntimų)

- Sukurkite naują Codespace šiam repozitorijai per [GitHub UI](https://github.com/codespaces).  

- Naujojo Codespace terminale paleiskite vieną iš aukščiau pateiktų paviršutinių/retų klonavimo komandų, kad į Codespace darbo aplinką atsisiųstumėte tik reikiamus pamokų aplankus.
- Papildomai: po klonavimo Codespaces pašalinkite .git, kad atlaisvintumėte papildomos vietos (žr. aukščiau pateiktas pašalinimo komandas).
- Pastaba: Jei norite atidaryti repo tiesiogiai Codespaces (be papildomo klonavimo), žinokite, kad Codespaces sukurs devcontainer aplinką ir gali vis tiek paruošti daugiau nei reikia. Paviršutinis klonavimas naujame Codespace suteikia daugiau kontrolės disko naudojimui.

#### Patarimai

- Visada pakeiskite klonavimo URL į savo šaknytės URL, jei ketinate redaguoti/arba įsipareigoti.
- Jei vėliau reikės daugiau istorijos ar failų, galite juos parsisiųsti arba koreguoti retą patikrą, kad įtrauktumėte papildomus aplankus.

## Kodo paleidimas

Šis kursas siūlo seriją Jupyter užrašų knygelių, kurias galite paleisti, kad įgytumėte praktinės patirties kuriant AI agentus.

Kodo pavyzdžiai naudoja **Microsoft Agent Framework (MAF)** su `AzureAIProjectAgentProvider`, kuris jungiasi prie **Azure AI Agent Service V2** (Atsakymų API) per **Microsoft Foundry**.

Visi Python užrašų knygelės pažymėtos kaip `*-python-agent-framework.ipynb`.

## Reikalavimai

- Python 3.12+
  - **PASTABA**: Jei neturite įdiegto Python3.12, įsitikinkite, kad jį įdiegėte. Tada sukurkite savo venv naudodami python3.12, kad užtikrintumėte, jog reikiamos versijos yra įdiegtos pagal requirements.txt failą.
  
    >Pavyzdys

    Sukurkite Python venv katalogą:

    ```bash|powershell
    python -m venv venv
    ```

    Tada suaktyvinkite venv aplinką:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Kodo pavyzdžiams naudojant .NET, įsitikinkite, kad įdiegėte [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) arba naujesnę versiją. Tada patikrinkite įdiegtą .NET SDK versiją:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Reikalinga autentifikacijai. Įdiekite iš [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure prenumerata** — Norint pasiekti Microsoft Foundry ir Azure AI Agent Service.
- **Microsoft Foundry projektas** — Projektas su įdiegta modeliu (pvz., `gpt-4o`). Žr. [1 žingsnį](#1-žingsnis-sukurkite-microsoft-foundry-projektą) žemiau.

Šiame repozitorijos šaknyje yra `requirements.txt` failas, kuriame yra visi reikalingi Python paketai kodo pavyzdžiams paleisti.

Juos galite įdiegti paleisdami šią komandą terminale, būdami repozitorijos šaknyje:

```bash|powershell
pip install -r requirements.txt
```

Rekomenduojame sukurti Python virtualią aplinką, kad išvengtumėte konfliktų ir problemų.

## VSCode nustatymas

Įsitikinkite, kad VSCode naudojate tinkamą Python versiją.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Microsoft Foundry ir Azure AI Agent Service nustatymas

### 1 žingsnis: Sukurkite Microsoft Foundry projektą

Norėdami paleisti užrašų knygeles, jums reikalingas Azure AI Foundry **hub** ir **projektas** su įdiegtu modeliu.

1. Eikite į [ai.azure.com](https://ai.azure.com) ir prisijunkite su savo Azure paskyra.
2. Sukurkite **hub** (arba naudokite esamą). Žr.: [Hub resursų apžvalga](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Hube sukurkite **projektą**.
4. Iš **Modeliai + Galiniai taškai** → **Diegti modelį** įdiekite modelį (pvz., `gpt-4o`).

### 2 žingsnis: Gaukite savo projekto galinio taško URL ir modelio diegimo pavadinimą

Iš savo projekto Microsoft Foundry portale:

- **Projekto galinis taškas** — Eikite į **Apžvalgos** puslapį ir nukopijuokite galinio taško URL.

![Projekto prisijungimo eilutė](../../../translated_images/lt/project-endpoint.8cf04c9975bbfbf1.webp)

- **Modelio diegimo pavadinimas** — Eikite į **Modeliai + Galiniai taškai**, pasirinkite savo įdiegtą modelį ir užsirašykite **Diegimo pavadinimą** (pvz., `gpt-4o`).

### 3 žingsnis: Prisijunkite prie Azure su `az login`

Visos užrašų knygelės autentiškumo tapatybę naudoja per **`AzureCliCredential`** — nereikia valdyti API raktų. Tam reikia, kad būtumėte prisijungę per Azure CLI.

1. Jei dar neturite Azure CLI, įdiekite jį: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. Prisijunkite paleisdami:

    ```bash|powershell
    az login
    ```

    Arba jei esate nuotoliniu arba Codespace aplinkoje be naršyklės:

    ```bash|powershell
    az login --use-device-code
    ```

3. Jei bus prašoma, pasirinkite prenumeratą — tą, kurioje yra jūsų Foundry projektas.

4. Patikrinkite, ar esate prisijungę:

    ```bash|powershell
    az account show
    ```

> **Kodėl `az login`?** Užrašų knygelės naudoja `AzureCliCredential` iš `azure-identity` paketo autentifikacijai — tai reiškia, kad jūsų Azure CLI sesija suteikia autentifikacijos informaciją — be API raktų ar slaptų duomenų `.env` faile. Tai yra [geriausia saugumo praktika](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### 4 žingsnis: Sukurkite `.env` failą

Kopijuokite pavyzdinį failą:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Atverkite `.env` ir užpildykite šias dvi reikšmes:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| Kintamasis | Kur jį rasti |
|------------|--------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry portalas → jūsų projektas → **Apžvalgos** puslapis |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry portalas → **Modeliai + Galiniai taškai** → įdiegto modelio pavadinimas |

Tai beveik viskas daugumai pamokų! Užrašų knygelės automatiškai autentiškuosis per jūsų `az login` sesiją.

### 5 žingsnis: Įdiekite Python priklausomybes

```bash|powershell
pip install -r requirements.txt
```

Rekomenduojame tai daryti virtualioje aplinkoje, kurią aprašėte anksčiau.

## Papildomas nustatymas 5 pamokai (Agentic RAG)

Pamoka 5 naudoja **Azure AI Search** paieškai su papildyta generacija. Jei planuojate ją atlikti, pridėkite šiuos kintamuosius į savo `.env` failą:

| Kintamasis | Kur jį rasti |
|------------|--------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure portalas → jūsų **Azure AI Search** išteklius → **Apžvalga** → URL |
| `AZURE_SEARCH_API_KEY` | Azure portalas → jūsų **Azure AI Search** išteklius → **Nustatymai** → **Raktai** → pagrindinis administratoriaus raktas |

## Papildomas nustatymas 6 ir 8 pamokoms (GitHub modeliai)

Kai kurios 6 ir 8 pamokų užrašų knygelės naudoja **GitHub Models** vietoje Azure AI Foundry. Jei planuojate juos paleisti, pridėkite šiuos kintamuosius į savo `.env` failą:

| Kintamasis | Kur jį rasti |
|------------|--------------|
| `GITHUB_TOKEN` | GitHub → **Nustatymai** → **Kūrėjų nustatymai** → **Asmeniniai prieigos raktai** |
| `GITHUB_ENDPOINT` | Naudokite `https://models.inference.ai.azure.com` (numatytoji reikšmė) |
| `GITHUB_MODEL_ID` | Modelio pavadinimas naudoti (pvz., `gpt-4o-mini`) |

## Alternatyvus tiekėjas: MiniMax (suderinamas su OpenAI)

[MiniMax](https://platform.minimaxi.com/) teikia didelio konteksto modelius (iki 204K žetonų) per OpenAI suderinamą API. Kadangi Microsoft Agent Framework `OpenAIChatClient` veikia su bet kokiu OpenAI suderinamu galu, galite naudoti MiniMax kaip alternatyvą GitHub Models ar OpenAI.

Pridėkite šiuos kintamuosius į savo `.env` failą:

| Kintamasis | Kur jį rasti |
|------------|--------------|
| `MINIMAX_API_KEY` | [MiniMax platforma](https://platform.minimaxi.com/) → API raktai |
| `MINIMAX_BASE_URL` | Naudokite `https://api.minimax.io/v1` (numatytoji reikšmė) |
| `MINIMAX_MODEL_ID` | Modelio pavadinimas naudoti (pvz., `MiniMax-M2.7`) |

**Galimi modeliai**: `MiniMax-M2.7` (rekomenduojama), `MiniMax-M2.7-highspeed` (greitesni atsakymai)

Kodo pavyzdžiai, naudojantys `OpenAIChatClient` (pvz., 14 pamokos viešbučio užsakymo veiklos srautas), automatiškai aptiks ir naudos jūsų MiniMax konfiguraciją, kai nustatytas `MINIMAX_API_KEY`.

## Papildomas nustatymas 8 pamokai (Bing pagrindimo veiklos srautas)

Sąlyginio veiklos srauto užrašų knygelė 8 pamokoje naudoja **Bing pagrindimą** per Azure AI Foundry. Jei planuojate naudoti šį pavyzdį, pridėkite šį kintamąjį į `.env`:

| Kintamasis | Kur jį rasti |
|------------|--------------|
| `BING_CONNECTION_ID` | Azure AI Foundry portalas → jūsų projektas → **Valdymas** → **Prijungti ištekliai** → jūsų Bing prisijungimas → nukopijuokite prisijungimo ID |

## Problemų sprendimas

### SSL sertifikato patvirtinimo klaidos macOS

Jei naudojate macOS ir gaunate klaidą panašią į:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Tai žinoma problema Python macOS, kai sistemos SSL sertifikatai nėra automatiškai patikimi. Išbandykite šiuos sprendimus tokia tvarka:

**1 parinktis: Paleiskite Python Sertifikatų įdiegimo skriptą (rekomenduojama)**

```bash
# Pakeiskite 3.XX su jūsų įdiegta Python versija (pvz., 3.12 arba 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**2 parinktis: Užrašų knygelėje naudokite `connection_verify=False` (tik GitHub Models užrašų knygelėms)**

6 pamokos užrašų knygelėje (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) jau yra įkomentuotas sprendimas. Atkomentuokite `connection_verify=False` kuriant klientą:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Išjunkite SSL patvirtinimą, jei susiduriate su sertifikato klaidomis
)
```

> **⚠️ Įspėjimas:** SSL patvirtinimo išjungimas (`connection_verify=False`) sumažina saugumą praleidžiant sertifikato patikrinimą. Naudokite tai tik kaip laikinos problemos sprendimą kūrimo aplinkose, jokiu būdu ne gamybinėms.

**3 parinktis: Įdiekite ir naudokite `truststore`**

```bash
pip install truststore
```

Tada pridėkite šį kodą užrašų knygelės ar skripto pradžioje prieš bet kokius tinklo kvietimus:

```python
import truststore
truststore.inject_into_ssl()
```

## Užstrigote?

Jei kyla bet kokių sunkumų su šiuo nustatymu, prisijunkite prie mūsų <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI bendruomenės Discord</a> arba <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">sukurkite problemos pranešimą</a>.

## Kita pamoka

Dabar esate pasiruošę paleisti šio kurso kodą. Sėkmės gilinat žinias apie AI agentų pasaulį!

[Įvadas į AI agentus ir agentų panaudojimo atvejus](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:  
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, atkreipkite dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas gimtąja kalba turėtų būti laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojamas profesionalus žmogaus vertimas. Mes neatsakome už jokius nesusipratimus ar klaidingas interpretacijas, kylančias dėl šio vertimo naudojimo.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->