# Подешавање курса

## Увод

Ова лекција ће објаснити како покренути примере кода из овог курса.

## Придружите се другим учесницима и добијте помоћ

Пре него што почнете са клонирањем вашег репозиторијума, придружите се [AI Agents For Beginners Discord каналу](https://aka.ms/ai-agents/discord) за помоћ око подешавања, сва питања у вези курса, или да бисте се повезали са другим учесницима.

## Клонирајте или направите форк овог репозиторијума

За почетак, молимо вас да клонирате или направите форк GitHub репозиторијума. Ово ће направити вашу верзију материјала курса тако да можете покретати, тестирати и прилагођавати код!

Ово можете урадити кликом на линк за <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">форк репозиторијума</a>

Сада би требало да имате своју форковану верзију овог курса на следећем линку:

![Forked Repo](../../../translated_images/sr/forked-repo.33f27ca1901baa6a.webp)

### Површно клонирање (препоручено за радионице / Codespaces)

  >Цео репозиторијум може бити велики (~3 GB) када преузмете пуну историју и све фајлове. Ако само похађате радионицу или вам требају само неки фолдери са лекцијама, површно клонирање (или делимично клонирање) избегава већину тог преузимања смањењем историје и/или прескакањем blob-ова.

#### Брзо површно клонирање — минимална историја, сви фајлови

Замените `<your-username>` у доленаведеним командама својим URL-ом форка (или upstream URL ако више волите).

Да бисте клонирали само најновију историју комита (мали download):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Да бисте клонирали одређену грану:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Делимично (sparse) клонирање — минимални blob-ови и само изабрани фолдери

Ово користи делимично клонирање и sparse-checkout (захтева Git 2.25+ и препоручује се модернији Git са подршком за делимично клонирање):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Уђите у фолдер репозиторијума:

```bash|powershell
cd ai-agents-for-beginners
```

Затим наведите које фолдере желите (пример испод показује два фолдера):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Након клонирања и провере фајлова, ако вам требају само фајлови и желите да ослободите простор (без git историје), молимо обришите метаподатке репозиторијума (💀непоправљиво — изгубићете сву Git функционалност: нема комита, пулирања, пушовања нити приступа историји).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Коришћење GitHub Codespaces (препоручено за избегавање великих локалних преузимања)

- Направите нови Codespace за овај репозиторијум преко [GitHub UI](https://github.com/codespaces).  

- У терминалу новокреираног codespace-а покрените једну од горе наведених површних/делимичних команда за клонирање да бисте у workspace довели само потребне фолдере са лекцијама.
- Опционо: након клонирања у Codespaces, уклоните .git да ослободите простор (погледајте команде за уклањање горе).
- Напомена: Ако више волите да директно отворите репозиторијум у Codespaces (без додатног клонирања), имајте у виду да Codespaces конструише devcontainer окружење и можда ће и даље обезбедити више него што вам треба. Површно клонирање у свежем Codespace-у даје вам већу контролу над коришћењем диска.

#### Савети

- Увек замените clone URL вашим форком ако желите да уређујете/комитујете.
- Ако касније треба више историје или фајлова, можете их преузети или подесити sparse-checkout да укључује додатне фолдере.

## Покретање кода

Овај курс нуди серију Јупитер свески које можете покренути да бисте стекли практично искуство у изградњи AI агената.

Примери кода користе **Microsoft Agent Framework (MAF)** са `AzureAIProjectAgentProvider`, који се повезује на **Azure AI Agent Service V2** (Responses API) преко **Microsoft Foundry**.

Све Python свеске су означене као `*-python-agent-framework.ipynb`.

## Захтеви

- Python 3.12+
  - **НАПОМЕНА**: Ако немате инсталиран Python 3.12, осигурајте да га инсталирате. Затим направите ваш venv користећи python3.12 да бисте осигурали исправне верзије из requirements.txt фајла.
  
    >Пример

    Креирање Python venv директоријума:

    ```bash|powershell
    python -m venv venv
    ```

    Затим активирајте venv окружење за:

    ```bash
    # зш/баш
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: За примере кода који користе .NET, осигурајте да сте инсталирали [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) или новији. Затим проверите верзију инсталираног .NET SDK:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Потребно за аутентификацију. Инсталирајте са [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure претплата** — За приступ Microsoft Foundry и Azure AI Agent Service.
- **Microsoft Foundry Пројекат** — Пројекат са постављеним моделом (нпр. `gpt-4o`). Погледајте [Чекор 1](#чекор-1-направите-microsoft-foundry-пројекат) доле.

У овом репозиторијуму имамо укључен `requirements.txt` фајл који садржи све потребне Python пакете за покретање примера кода.

Можете их инсталирати покретањем следеће команде у терминалу у корену репозиторијума:

```bash|powershell
pip install -r requirements.txt
```

Препоручујемо да направите Python виртуално окружење како бисте избегли конфликте и проблеме.

## Подешавање VSCode

Пазите да користите исправну верзију Python-а у VSCode-у.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Подешавање Microsoft Foundry и Azure AI Agent Servisa

### Чекор 1: Направите Microsoft Foundry Пројекат

Потребан вам је Azure AI Foundry **hub** и **проект** са постављеним моделом за покретање свески.

1. Отидите на [ai.azure.com](https://ai.azure.com) и пријавите се са вашим Azure налогом.
2. Направите **hub** (или користите постојећи). Погледајте: [Преглед хаб ресурса](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Унутар хаба, направите **проект**.
4. Поставите модел (нпр. `gpt-4o`) кроз **Models + Endpoints** → **Deploy model**.

### Чекор 2: Преузмите URL вашег Endpoинта и име деплојмента модела

Из вашег пројекта у Microsoft Foundry порталу:

- **Project Endpoint** — Идите на страну **Overview** и копирајте URL ендпоинта.

![Project Connection String](../../../translated_images/sr/project-endpoint.8cf04c9975bbfbf1.webp)

- **Име деплојмента модела** — Идите на **Models + Endpoints**, изаберите ваш постављени модел и запишите **Deployment name** (нпр. `gpt-4o`).

### Чекор 3: Пријавите се у Azure помоћу `az login`

Све свеске користе **`AzureCliCredential`** за аутентификацију — нема API кључева за управљање. За ово је потребно да сте пријављени преко Azure CLI-а.

1. **Инсталирајте Azure CLI** ако већ нисте: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Пријавите се** покретањем:

    ```bash|powershell
    az login
    ```

    Или ако сте у удаљеном/Codespace окружењу без прегледача:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Изаберите вашу претплату** ако се од вас тражи — изаберите онај који има ваш Foundry пројекат.

4. **Проверите** да сте пријављени:

    ```bash|powershell
    az account show
    ```

> **Зашто `az login`?** Свеске аутентификују користећи `AzureCliCredential` из `azure-identity` пакета. То значи да ваша Azure CLI сесија обезбеђује креденцијале — нема API кључева или тајни у вашем `.env` фајлу. Ово је [безбедна најбоља пракса](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Чекор 4: Направите ваш `.env` фајл

Копирајте пример фајла:

```bash
# зш/баш
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Отворите `.env` и унесите следеће вредности:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| Променљива | Где се налази |
|------------|----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Foundry портал → ваш пројекат → страница **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Foundry портал → **Models + Endpoints** → име вашег постављеног модела |

То је све за већину лекција! Свеске ће се аутоматски аутентификовати преко ваше `az login` сесије.

### Чекор 5: Инсталирајте Python зависности

```bash|powershell
pip install -r requirements.txt
```

Препоручујемо да ово покренете унутар виртуелног окружења које сте раније направили.

## Додатно подешавање за лекцију 5 (Agentic RAG)

Лекција 5 користи **Azure AI Search** за генерисање подржано претрагом. Ако планирате да покренете ту лекцију, додајте ове променљиве у ваш `.env` фајл:

| Променљива | Где се налази |
|------------|----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Azure портал → ваш **Azure AI Search** ресурс → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Azure портал → ваш **Azure AI Search** ресурс → **Settings** → **Keys** → примарни администраторски кључ |

## Додатно подешавање за лекцију 6 и лекцију 8 (GitHub модели)

Неке свеске у лекцијама 6 и 8 користе **GitHub моделе** уместо Azure AI Foundry. Ако планирате да покренете те примере, додајте ове променљиве у ваш `.env` фајл:

| Променљива | Где се налази |
|------------|----------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | Користите `https://models.inference.ai.azure.com` (подразумевана вредност) |
| `GITHUB_MODEL_ID` | Назив модела за коришћење (нпр. `gpt-4o-mini`) |

## Алтернативни провајдер: MiniMax (компатибилно са OpenAI)

[MiniMax](https://platform.minimaxi.com/) пружа моделе са великим контекстом (до 204К токена) кроз API компатибилан са OpenAI. Пошто Microsoft Agent Framework-ов `OpenAIChatClient` ради са било којим OpenAI-компатибилним ендпоинтом, можете користити MiniMax као једну од алтернатива GitHub моделима или OpenAI.

Додајте ове променљиве у ваш `.env` фајл:

| Променљива | Где се налази |
|------------|----------------|
| `MINIMAX_API_KEY` | [MiniMax платформа](https://platform.minimaxi.com/) → API кључеви |
| `MINIMAX_BASE_URL` | Користите `https://api.minimax.io/v1` (подразумевана вредност) |
| `MINIMAX_MODEL_ID` | Назив модела за коришћење (нпр. `MiniMax-M2.7`) |

**Доступни модели**: `MiniMax-M2.7` (препоручено), `MiniMax-M2.7-highspeed` (бржи одговори)

Примери кода који користе `OpenAIChatClient` (нпр. лекција 14 за резервацију хотела) ће аутоматски открити и користити вашу MiniMax конфигурацију када је `MINIMAX_API_KEY` постављен.

## Додатно подешавање за лекцију 8 (Bing Grounding Workflow)

Notebook са условним током у лекцији 8 користи **Bing grounding** преко Azure AI Foundry. Ако планирате покренути тај пример, додајте ову променљиву у ваш `.env` фајл:

| Променљива | Где се налази |
|------------|----------------|
| `BING_CONNECTION_ID` | Azure AI Foundry портал → ваш пројекат → **Management** → **Connected resources** → ваша Bing конекција → копирајте конекцијски ID |

## Решавање проблема

### SSL грешке верификације сертификата на macOS

Ако сте на macOS-у и добијете грешку попут:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Ово је познат проблем са Python-ом на macOS-у где системски SSL сертификати нису аутоматски повериоци. Покушајте следећа решења:

**Опција 1: Покрените Python Install Certificates скрипту (препоручено)**

```bash
# Замените 3.XX са верзијом Питона коју сте инсталирали (нпр. 3.12 или 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Опција 2: Користите `connection_verify=False` у вашем notebook-у (само за GitHub Models notebook-ове)**

У лекцији 6 (фајл `06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), већ је укључено коментарисано заобилазно решење. Откоментирајте `connection_verify=False` при креирању клијента:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Онемогући верификацију SSL-а ако наиђеш на грешке у сертификату
)
```

> **⚠️ Упозорење:** Искључивање SSL верификације (`connection_verify=False`) смањује безбедност прескачући проверу сертификата. Користите ово само као привремено решење у развојним окружењима, никада у продукцији.

**Опција 3: Инсталирајте и користите `truststore`**

```bash
pip install truststore
```

Онда додајте следеће на почетак вашег notebook-а или скрипте пре било каквих мрежних позива:

```python
import truststore
truststore.inject_into_ssl()
```

## Заглавили сте негде?

Ако имате било каквих проблема са подешавањем, придружите се нашем <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI заједничком Discord-у</a> или <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">креирајте issue</a>.

## Следећа лекција

Сада сте спремни да покренете код за овај курс. Пријатно учење и откривање света AI агената!

[Увод у AI агенте и случајеве коришћења агената](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Одрицање од одговорности**:
Овај документ је преведен коришћењем AI услуге за превођење [Co-op Translator](https://github.com/Azure/co-op-translator). Иако настојимо да превод буде тачан, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Изворни документ на његовом језику треба сматрати ауторитетом. За критичне информације препоручује се професионални људски превод. Није нам одговорност за било каква неспоразума или погрешна тумачења која произилазе из употребе овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->