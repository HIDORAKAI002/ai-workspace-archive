# Налаштування курсу

## Вступ

У цьому уроці розглянемо, як запускати приклади коду цього курсу.

## Приєднуйтесь до інших учнів та отримуйте допомогу

Перед тим, як почати клонувати свій репозиторій, приєднуйтесь до [Discord-каналу AI Agents For Beginners](https://aka.ms/ai-agents/discord), щоб отримати допомогу з налаштування, поставити будь-які питання щодо курсу або поспілкуватися з іншими учнями.

## Клонуйте або форкніть цей репозиторій

Щоб почати, будь ласка, склонуйте або зробіть форк GitHub репозиторію. Це створить вашу власну версію матеріалів курсу, щоб ви могли запускати, тестувати та змінювати код!

Це можна зробити, натиснувши посилання <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">форкнути репозиторій</a>

Тепер у вас повинна бути власна форкнута версія цього курсу за посиланням:

![Forked Repo](../../../translated_images/uk/forked-repo.33f27ca1901baa6a.webp)

### Поверхневе клонування (рекомендується для воркшопів / Codespaces)

> Повний репозиторій може бути великим (~3 ГБ), якщо завантажувати всю історію і всі файли. Якщо ви тільки відвідуєте воркшоп або потрібні лише кілька папок уроків, поверхневе клонування (або часткове) дозволяє уникнути більшої частини скачування, обрізаючи історію і/або пропускаючи об’єкти.

#### Швидке поверхневе клонування — мінімальна історія, усі файли

Замініть `<your-username>` у наведених командах на URL вашого форку (або на upstream URL, якщо бажаєте).

Щоб клонувати лише останню історію комітів (малий обсяг завантаження):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Щоб клонувати певну гілку:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Часткове (рідке) клонування — мінімум об’єктів і виключно вибрані папки

Використовується часткове клонування та sparse-checkout (потрібен Git 2.25+ і рекомендовано сучасний Git з підтримкою часткового клонування):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Перейдіть у папку з репозиторієм:

```bash|powershell
cd ai-agents-for-beginners
```

Потім вкажіть, які папки вам потрібні (в прикладі нижче показано дві папки):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Після клонування та перевірки файлів, якщо вам потрібні лише файли і хочете звільнити місце (без історії git), будь ласка, видаліть метадані репозиторію (💀 необоротно — ви втратите всі можливості Git: коміти, pull, push чи доступ до історії).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Використання GitHub Codespaces (рекомендується щоб уникнути великих локальних завантажень)

- Створіть новий Codespace для цього репозиторію через [GitHub UI](https://github.com/codespaces).  

- У терміналі щойно створеного codespace виконайте одну з команд для поверхневого/часткового клонування, щоб завантажити лише потрібні папки уроків у робоче середовище Codespace.
- Опціонально: після клонування всередині Codespaces можете видалити .git для звільнення місця (див. вище команди для видалення).
- Примітка: Якщо ви хочете відкрити репозиторій безпосередньо в Codespaces (без додаткового клонування), майте на увазі, що Codespaces створюватиме середовище devcontainer і може надавати більше ресурсів, ніж потрібно. Клонування поверхневого копії в новому Codespace дає вам більший контроль над використанням диску.

#### Підказки

- Завжди замінюйте URL для клонування на URL свого форку, якщо ви плануєте редагувати/робити коміти.
- Якщо пізніше знадобиться більше історії або файлів, ви можете їх отримати або додати папки через sparse-checkout.

## Запуск коду

Цей курс пропонує серію Jupyter Notebook, які ви можете запускати для отримання практичного досвіду створення AI агентів.

Приклади коду використовують **Microsoft Agent Framework (MAF)** з `AzureAIProjectAgentProvider`, що підключається до **Azure AI Agent Service V2** (API відповідей) через **Microsoft Foundry**.

Всі блокноти Python мають назву `*-python-agent-framework.ipynb`.

## Вимоги

- Python 3.12+
  - **ПРИМІТКА**: Якщо у вас не встановлено Python3.12, переконайтеся, що встановили його. Потім створіть віртуальне середовище (venv) за допомогою python3.12, щоб переконатися, що встановлюються правильні версії з requirements.txt.
  
    > Приклад

    Створення директорії Python venv:

    ```bash|powershell
    python -m venv venv
    ```

    Потім активуйте середовище venv для:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```
  
- .NET 10+: Для прикладів коду із .NET встановіть [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) або новіший. Потім перевірте версію встановленого .NET SDK:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — потрібно для автентифікації. Встановіть з [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Підписка Azure** — для доступу до Microsoft Foundry та Azure AI Agent Service.
- **Проект Microsoft Foundry** — проект із розгорнутою моделлю (наприклад, `gpt-4o`). Див. [Крок 1](#крок-1-створення-проекту-microsoft-foundry) нижче.

У корені цього репозиторію є файл `requirements.txt` з усіма потрібними Python пакетами для запуску прикладів коду.

Ви можете встановити їх, запустивши наступну команду у терміналі в корені репозиторію:

```bash|powershell
pip install -r requirements.txt
```

Рекомендуємо створити віртуальне середовище Python, щоб уникнути конфліктів і проблем.

## Налаштування VSCode

Переконайтеся, що у VSCode використовується правильна версія Python.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Налаштування Microsoft Foundry та Azure AI Agent Service

### Крок 1: Створення проекту Microsoft Foundry

Для запуску блокнотів вам потрібні Azure AI Foundry **hub** та **project** із розгорнутою моделлю.

1. Перейдіть на [ai.azure.com](https://ai.azure.com) та увійдіть у свій обліковий запис Azure.
2. Створіть **hub** (або використайте існуючий). Докладніше див.: [Огляд ресурсів Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Усередині hub створіть **проект**.
4. Розгорніть модель (наприклад, `gpt-4o`) у розділі **Models + Endpoints** → **Deploy model**.

### Крок 2: Отримайте кінцеву точку проекту (Endpoint) та назву розгортання моделі

У порталі Microsoft Foundry вашого проекту:

- **Project Endpoint** — перейдіть на сторінку **Overview** та скопіюйте URL кінцевої точки.

![Project Connection String](../../../translated_images/uk/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — перейдіть у розділ **Models + Endpoints**, виберіть розгорнуту модель та запам’ятайте **Deployment name** (наприклад, `gpt-4o`).

### Крок 3: Увійдіть в Azure за допомогою `az login`

Усі блокноти використовують **`AzureCliCredential`** для аутентифікації — ключі API не потрібні. Для цього потрібно увійти через Azure CLI.

1. **Встановіть Azure CLI**, якщо ще не встановлено: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Увійдіть**, виконавши:

    ```bash|powershell
    az login
    ```

    Або якщо ви у віддаленому/кодовому середовищі без браузера:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Виберіть підписку**, якщо з’явиться запит — оберіть ту, що містить ваш проект Foundry.

4. **Перевірте**, що ви увійшли:

    ```bash|powershell
    az account show
    ```

> **Чому `az login`?** Блокноти виконують автентифікацію через `AzureCliCredential` з пакета `azure-identity`. Це означає, що ваша сесія Azure CLI забезпечує облікові дані — безключів API або секретів у файлі `.env`. Це є [кращою практикою щодо безпеки](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Крок 4: Створіть файл `.env`

Скопіюйте приклад файлу:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Відкрийте `.env` і заповніть ці два поля:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| Змінна | Де знайти |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | Портал Foundry → ваш проект → сторінка **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Портал Foundry → **Models + Endpoints** → назва розгортання вашої моделі |

Ось і все для більшості уроків! Блокноти автоматично аутентифікуються через вашу сесію `az login`.

### Крок 5: Встановіть залежності Python

```bash|powershell
pip install -r requirements.txt
```

Рекомендуємо запускати це у віртуальному середовищі, яке ви створили раніше.

## Додаткове налаштування для уроку 5 (Agentic RAG)

Урок 5 використовує **Azure AI Search** для генерації, доповненої пошуком. Якщо плануєте запускати цей урок, додайте ці змінні у ваш `.env` файл:

| Змінна | Де знайти |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Портал Azure → ваш ресурс **Azure AI Search** → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Портал Azure → ваш ресурс **Azure AI Search** → **Settings** → **Keys** → основний ключ адміністратора |

## Додаткове налаштування для уроків 6 і 8 (Моделі GitHub)

Деякі блокноти з уроків 6 і 8 використовують **GitHub Models** замість Azure AI Foundry. Якщо ви плануєте запускати ці приклади, додайте ці змінні у ваш `.env` файл:

| Змінна | Де знайти |
|----------|-----------------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | Використовуйте `https://models.inference.ai.azure.com` (значення за замовчуванням) |
| `GITHUB_MODEL_ID` | Назва моделі для використання (наприклад, `gpt-4o-mini`) |

## Альтернативний провайдер: MiniMax (сумісний з OpenAI)

[MiniMax](https://platform.minimaxi.com/) надає моделі з великим контекстом (до 204К токенів) через API, сумісний з OpenAI. Оскільки `OpenAIChatClient` Microsoft Agent Framework працює з будь-яким OpenAI-сумісним кінцевим пунктом, ви можете використовувати MiniMax як альтернативу GitHub Models або OpenAI.

Додайте ці змінні у ваш `.env` файл:

| Змінна | Де знайти |
|----------|-----------------|
| `MINIMAX_API_KEY` | [Платформа MiniMax](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | Використовуйте `https://api.minimax.io/v1` (значення за замовчуванням) |
| `MINIMAX_MODEL_ID` | Назва моделі для використання (наприклад, `MiniMax-M2.7`) |

**Доступні моделі**: `MiniMax-M2.7` (рекомендовано), `MiniMax-M2.7-highspeed` (швидші відповіді)

Приклади коду, які використовують `OpenAIChatClient` (наприклад, сценарій бронювання готелю у уроці 14), автоматично виявлять і використовують вашу конфігурацію MiniMax, коли встановлено `MINIMAX_API_KEY`.

## Додаткове налаштування для уроку 8 (Потік з прив'язкою Bing)

Урок 8 містить блокнот із умовним робочим процесом, який використовує **Bing grounding** через Azure AI Foundry. Якщо ви плануєте запускати цей приклад, додайте цю змінну у ваш `.env` файл:

| Змінна | Де знайти |
|----------|-----------------|
| `BING_CONNECTION_ID` | Портал Azure AI Foundry → ваш проект → **Management** → **Connected resources** → ваше з’єднання Bing → скопіюйте ID з’єднання |

## Вирішення проблем

### Помилки перевірки SSL-сертифікату на macOS

Якщо ви на macOS і отримали помилку на кшталт:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Це відома проблема в Python на macOS, коли системні SSL сертифікати не довіряються автоматично. Спробуйте виконати наступні дії в такому порядку:

**Варіант 1: Запустіть скрипт встановлення сертифікатів Python (рекомендовано)**

```bash
# Замініть 3.XX на вашу встановлену версію Python (наприклад, 3.12 або 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Варіант 2: Використайте `connection_verify=False` у вашому блокноті (тільки для блокнотів GitHub Models)**

У блокноті уроку 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) вже є закоментоване рішення. Розкоментуйте `connection_verify=False` при створенні клієнта:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Вимкніть перевірку SSL, якщо ви зіткнулися з помилками сертифіката
)
```

> **⚠️ Попередження:** Вимкнення перевірки SSL (`connection_verify=False`) знижує безпеку, пропускаючи валідацію сертифікатів. Використовуйте це лише як тимчасове рішення у середовищі розробки, ніколи в продакшені.

**Варіант 3: Встановіть і використайте `truststore`**

```bash
pip install truststore
```

Потім додайте наступне на початок блокнота або скрипту перед будь-якими мережевими викликами:

```python
import truststore
truststore.inject_into_ssl()
```

## Проблеми на якомусь етапі?

Якщо у вас виникли труднощі з цим налаштуванням, приєднуйтеся до нашого <a href="https://discord.gg/kzRShWzttr" target="_blank">спільноти Azure AI Community Discord</a> або <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">створіть issue</a>.

## Наступний урок

Тепер ви готові запускати код цього курсу. Бажаємо успіхів у вивченні світу AI агентів!

[Вступ до AI агентів та варіанти їх використання](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:  
Цей документ було перекладено за допомогою сервісу автоматичного перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоч ми й прагнемо до точності, зверніть увагу, що автоматизовані переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критичної інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильне тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->