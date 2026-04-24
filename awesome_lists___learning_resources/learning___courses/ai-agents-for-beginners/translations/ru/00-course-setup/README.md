# Настройка курса

## Введение

В этом уроке будет рассказано, как запускать примеры кода из этого курса.

## Присоединяйтесь к другим учащимся и получайте помощь

Прежде чем начинать клонировать репозиторий, присоединяйтесь к [Discord-каналу AI Agents For Beginners](https://aka.ms/ai-agents/discord), чтобы получить помощь с настройкой, задать вопросы по курсу или пообщаться с другими учащимися.

## Клонируйте или форкните этот репозиторий

Для начала, пожалуйста, клонируйте или форкните этот репозиторий на GitHub. Это создаст вашу собственную версию материалов курса, чтобы вы могли запускать, тестировать и изменять код!

Это можно сделать, нажав на ссылку <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">fork the repo</a>.

Теперь у вас должна быть своя форкнутая версия этого курса по следующей ссылке:

![Forked Repo](../../../translated_images/ru/forked-repo.33f27ca1901baa6a.webp)

### Shallow Clone (рекомендуется для мастер-классов / Codespaces)

  > Полный репозиторий может быть большим (~3 ГБ) при загрузке всей истории и всех файлов. Если вы участвуете только в мастер-классе или вам нужны только несколько папок уроков, shallow clone (или sparse clone) позволяет избежать большей части загрузки, сокращая историю и/или пропуская blob-данные.

#### Быстрый shallow clone — минимальная история, все файлы

Замените `<your-username>` в командах ниже на URL вашей форк-ссылки (или на URL исходного репозитория, если предпочитаете).

Для клонирования только последней истории коммитов (минимальный размер загрузки):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Для клонирования конкретной ветки:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Частичный (sparse) клон — минимальное количество blob и только выбранные папки

Здесь используется частичное клонирование и sparse-checkout (требуется Git 2.25+ и рекомендуется современный Git с поддержкой partial clone):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Перейдите в папку репозитория:

```bash|powershell
cd ai-agents-for-beginners
```

Затем укажите папки, которые нужны (в примере показаны две папки):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

После клонирования и проверки файлов, если вам нужны только файлы и вы хотите освободить место (без истории git), удалите метаданные репозитория (💀необратимо — вы потеряете все возможности Git: коммиты, обновления, отправки и доступ к истории).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Использование GitHub Codespaces (рекомендуется для избежания громоздких локальных загрузок)

- Создайте новый Codespace для этого репозитория через [GitHub UI](https://github.com/codespaces).

- В терминале нового Codespace выполните одну из команд shallow/sparse clone, чтобы подтянуть только нужные папки уроков в рабочее пространство Codespace.
- Опционально: после клонирования внутри Codespaces удалите .git для освобождения дополнительного места (см. команды удаления выше).
- Примечание: если вы предпочитаете открыть репозиторий напрямую в Codespaces (без дополнительного клонирования), учитывайте, что Codespaces настроит среду devcontainer и может загрузить больше, чем нужно. Клонирование облегчённой копии внутри нового Codespace даст больше контроля над использованием диска.

#### Советы

- Всегда заменяйте URL для клонирования на свою форку, если хотите редактировать или коммитить.
- Если позже потребуется больше истории или файлов, можно подтянуть их или скорректировать sparse-checkout для включения дополнительных папок.

## Запуск кода

В этом курсе представлен ряд Jupyter Notebooks, которые вы можете запускать для получения практического опыта создания AI Агентов.

Примеры кода используют **Microsoft Agent Framework (MAF)** с `AzureAIProjectAgentProvider`, который подключается к **Azure AI Agent Service V2** (API ответов) через **Microsoft Foundry**.

Все Python-ноутбуки имеют в названии `*-python-agent-framework.ipynb`.

## Требования

- Python 3.12+
  - **ПРИМЕЧАНИЕ**: Если у вас не установлен Python 3.12, установите его. Затем создайте виртуальное окружение с помощью python3.12, чтобы гарантировать установку нужных версий из requirements.txt.
  
    >Пример

    Создание директории виртуального окружения Python:

    ```bash|powershell
    python -m venv venv
    ```

    Затем активируйте venv для:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Для примеров кода на .NET убедитесь, что установлен [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) или более новая версия. Проверьте установленную версию SDK командой:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — необходим для аутентификации. Установите с [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Подписка Azure** — для доступа к Microsoft Foundry и Azure AI Agent Service.
- **Проект Microsoft Foundry** — проект с развернутой моделью (например, `gpt-4o`). См. [Шаг 1](#шаг-1-создайте-проект-microsoft-foundry) ниже.

В корне репозитория есть файл `requirements.txt` со всеми необходимыми пакетами Python для запуска примеров.

Установить их можно командой в терминале из корня репозитория:

```bash|powershell
pip install -r requirements.txt
```

Рекомендуется создавать виртуальное окружение Python во избежание конфликтов и проблем.

## Настройка VSCode

Убедитесь, что в VSCode используется правильная версия Python.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Настройка Microsoft Foundry и Azure AI Agent Service

### Шаг 1: Создайте проект Microsoft Foundry

Для запуска ноутбуков требуется Azure AI Foundry **hub** и **project** с развернутой моделью.

1. Перейдите на [ai.azure.com](https://ai.azure.com) и войдите в свою учётную запись Azure.
2. Создайте **hub** (или используйте существующий). См.: [Обзор ресурсов хаба](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Внутри хаба создайте **проект**.
4. Разверните модель (например, `gpt-4o`) через **Models + Endpoints** → **Deploy model**.

### Шаг 2: Получите Endpoint проекта и имя развертывания модели

В портале Microsoft Foundry для вашего проекта:

- **Project Endpoint** — перейдите на страницу **Overview** и скопируйте URL конечной точки.

![Project Connection String](../../../translated_images/ru/project-endpoint.8cf04c9975bbfbf1.webp)

- **Model Deployment Name** — перейдите в **Models + Endpoints**, выберите развернутую модель и запомните имя развертывания (**Deployment name**), например `gpt-4o`.

### Шаг 3: Войдите в Azure с помощью `az login`

Все ноутбуки используют **`AzureCliCredential`** для аутентификации — не нужно управлять API ключами. Для этого нужно быть вошедшим в Azure CLI.

1. **Установите Azure CLI**, если еще не сделали этого: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Войдите**, выполнив:

    ```bash|powershell
    az login
    ```

    Если вы находитесь в удалённой среде или Codespace без браузера:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Выберите подписку** при необходимости — выберите ту, в которой ваш проект Foundry.

4. **Проверьте**, что вы вошли:

    ```bash|powershell
    az account show
    ```

> **Зачем `az login`?** Ноутбуки аутентифицируются с помощью `AzureCliCredential` из пакета `azure-identity`. Это значит, что ваша сессия Azure CLI предоставляет креденшелы — никаких API ключей или секретов в `.env` файле. Это [лучшие практики безопасности](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Шаг 4: Создайте файл `.env`

Скопируйте пример файла:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Откройте `.env` и заполните эти два значения:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4o
```

| Переменная | Где найти |
|------------|-----------|
| `AZURE_AI_PROJECT_ENDPOINT` | Портал Foundry → ваш проект → страница **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | Портал Foundry → **Models + Endpoints** → имя развернутой модели |

Вот и всё для большинства уроков! Ноутбуки автоматически аутентифицируются через сессию `az login`.

### Шаг 5: Установите зависимости Python

```bash|powershell
pip install -r requirements.txt
```

Рекомендуется запускать внутри ранее созданного виртуального окружения.

## Дополнительная настройка для урока 5 (Agentic RAG)

Урок 5 использует **Azure AI Search** для генерации с поддержкой поиска. Если собираетесь запускать этот урок, добавьте в файл `.env` следующие переменные:

| Переменная | Где найти |
|------------|-----------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | Портал Azure → ваш ресурс **Azure AI Search** → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | Портал Azure → ваш ресурс **Azure AI Search** → **Settings** → **Keys** → основный админский ключ |

## Дополнительная настройка для уроков 6 и 8 (GitHub Models)

Некоторые ноутбуки в уроках 6 и 8 используют не Azure AI Foundry, а **GitHub Models**. Чтобы запускать эти примеры, добавьте в файл `.env`:

| Переменная | Где найти |
|------------|-----------|
| `GITHUB_TOKEN` | GitHub → **Settings** → **Developer settings** → **Personal access tokens** |
| `GITHUB_ENDPOINT` | Используйте `https://models.inference.ai.azure.com` (значение по умолчанию) |
| `GITHUB_MODEL_ID` | Имя модели, например `gpt-4o-mini` |

## Альтернативный провайдер: MiniMax (совместимый с OpenAI)

[MiniMax](https://platform.minimaxi.com/) предоставляет модели с большой контекстной длиной (до 204K токенов) через API, совместимый с OpenAI. Поскольку Microsoft Agent Framework использует `OpenAIChatClient`, который работает с любым OpenAI-совместимым endpoint, вы можете использовать MiniMax вместо GitHub Models или OpenAI.

Добавьте в `.env` следующие переменные:

| Переменная | Где найти |
|------------|-----------|
| `MINIMAX_API_KEY` | [MiniMax Platform](https://platform.minimaxi.com/) → API Keys |
| `MINIMAX_BASE_URL` | Используйте `https://api.minimax.io/v1` (значение по умолчанию) |
| `MINIMAX_MODEL_ID` | Имя модели, например `MiniMax-M2.7` |

**Доступные модели**: `MiniMax-M2.7` (рекомендуется), `MiniMax-M2.7-highspeed` (быстрее ответы)

Примеры с `OpenAIChatClient` (например, workflow бронирования отеля из урока 14) автоматически обнаруживают и используют вашу конфигурацию MiniMax при наличии `MINIMAX_API_KEY`.

## Дополнительная настройка для урока 8 (Bing Grounding Workflow)

В ноутбуке с условным workflow из урока 8 используется **Bing grounding** через Azure AI Foundry. Если планируете запускать этот пример, добавьте в `.env`:

| Переменная | Где найти |
|------------|-----------|
| `BING_CONNECTION_ID` | Портал Azure AI Foundry → ваш проект → **Management** → **Connected resources** → ваше соединение Bing → скопируйте ID соединения |

## Устранение неполадок

### Ошибки проверки SSL сертификата на macOS

Если вы на macOS и видите ошибку типа:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Это известная проблема Python на macOS, где системные SSL сертификаты не доверяются автоматически. Попробуйте следующие решения по порядку:

**Вариант 1: Запустите скрипт установки сертификатов Python (рекомендуется)**

```bash
# Замените 3.XX на установленную версию Python (например, 3.12 или 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Вариант 2: Используйте `connection_verify=False` в ноутбуке (только для ноутбуков GitHub Models)**

В ноутбуке Урока 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`) уже есть закомментированное решение. Раскомментируйте `connection_verify=False` при создании клиента:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Отключите проверку SSL, если вы сталкиваетесь с ошибками сертификата
)
```

> **⚠️ Внимание:** Отключение проверки SSL (`connection_verify=False`) снижает безопасность, пропуская проверку сертификатов. Используйте только как временное решение в средах разработки, никогда — в продакшне.

**Вариант 3: Установите и используйте `truststore`**

```bash
pip install truststore
```

Затем добавьте следующее в начало вашего ноутбука или скрипта перед любыми сетевыми вызовами:

```python
import truststore
truststore.inject_into_ssl()
```

## Возникли трудности?

Если у вас возникли проблемы с настройкой, присоединяйтесь к нашему <a href="https://discord.gg/kzRShWzttr" target="_blank">сообществу Azure AI в Discord</a> или <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">создайте issue на GitHub</a>.

## Следующий урок

Теперь вы готовы запускать код этого курса. Удачи в изучении мира AI Агентов!

[Введение в AI Агентов и случаи их использования](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:  
Этот документ был переведен с помощью сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматические переводы могут содержать ошибки или неточности. Оригинальный документ на его родном языке считается авторитетным источником. Для получения критически важной информации рекомендуется использовать профессиональный человеческий перевод. Мы не несем ответственности за любые недоразумения или неверные толкования, возникшие в результате использования данного перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->