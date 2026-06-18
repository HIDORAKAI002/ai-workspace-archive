# Налаштування середовища

## 🎯 Що охоплює ця лабораторна робота

Ця практична лабораторна робота проведе вас через налаштування повного середовища розробки для створення MCP серверів з інтеграцією PostgreSQL. Ви налаштуєте всі необхідні інструменти, розгорнете ресурси Azure і перевірите налаштування перед продовженням реалізації.

## Огляд

Коректне середовище розробки є ключовим для успішної розробки MCP сервера. У цій лабораторній роботі наведені покрокові інструкції щодо налаштування Docker, сервісів Azure, інструментів розробника та підтвердження коректної роботи всіх компонентів.

Наприкінці цієї лабораторної роботи у вас буде повністю функціональне середовище розробки, готове для створення Zava Retail MCP сервера.

## Навчальні цілі

Наприкінці цієї лабораторної роботи ви зможете:

- **Встановити та налаштувати** всі необхідні інструменти розробки  
- **Розгорнути ресурси Azure**, необхідні для MCP сервера  
- **Налаштувати Docker контейнері** для PostgreSQL та MCP сервера  
- **Перевірити** налаштування середовища за допомогою тестових підключень  
- **Вирішувати** поширені проблеми з налаштуванням і конфігураціями  
- **Розуміти** робочий процес розробки та структуру файлів  

## 📋 Перевірка передумов

Перед початком переконайтесь, що у вас є:

### Необхідні знання
- Базове використання командного рядка (Windows Command Prompt/PowerShell)  
- Розуміння змінних середовища  
- Знайомство з системою контролю версій Git  
- Основні концепції Docker (контейнери, образи, томи)  

### Вимоги до системи
- **Операційна система**: Windows 10/11, macOS, або Linux  
- **ОЗП**: Мінімум 8 ГБ (рекомендовано 16 ГБ)  
- **Місце на диску**: щонайменше 10 ГБ вільного простору  
- **Мережа**: Підключення до Інтернету для завантажень і розгортання Azure  

### Вимоги до облікових записів
- **Підписка Azure**: Достатньо безплатного рівня  
- **Обліковий запис GitHub**: Для доступу до репозиторію  
- **Обліковий запис Docker Hub**: (Опційно) Для публікації власних образів  

## 🛠️ Встановлення інструментів

### 1. Встановлення Docker Desktop

Docker забезпечує контейнеризоване середовище для нашої розробки.

#### Встановлення на Windows

1. **Завантажте Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Встановлення та налаштування**:  
   - Запустіть інсталятор від імені Адміністратора  
   - Активуйте інтеграцію WSL 2, коли буде запит  
   - Перезавантажте комп’ютер після завершення встановлення  

3. **Перевірка встановлення**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### Встановлення на macOS

1. **Завантажте та встановіть**:  
   ```bash
   # Завантажте з https://desktop.docker.com/mac/stable/Docker.dmg
   # Або використовуйте Homebrew
   brew install --cask docker
   ```
  
2. **Запуск Docker Desktop**:  
   - Запустіть Docker Desktop з Програм  
   - Завершіть початковий майстер налаштувань  

3. **Перевірка встановлення**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Встановлення на Linux

1. **Встановіть Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Вийдіть із системи та увійдіть знову, щоб зміни груп набрали чинності
   ```
  
2. **Встановіть Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Встановлення Azure CLI

Azure CLI дозволяє розгортати та керувати ресурсами Azure.

#### Встановлення на Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### Встановлення на macOS

```bash
# Використання Homebrew
brew install azure-cli

# Або використання інсталятора
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Встановлення на Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Перевірка та автентифікація

```bash
# Перевірте встановлення
az version

# Увійдіть в Azure
az login

# Встановіть підписку за замовчуванням (якщо їх у вас кілька)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Встановлення Git

Git потрібен для клонування репозиторію та контролю версій.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git зазвичай встановлено за замовчуванням, але ви можете оновити його через Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Встановлення VS Code

Visual Studio Code надає інтегроване середовище розробки з підтримкою MCP.

#### Встановлення

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Необхідні розширення

Встановіть ці розширення VS Code:  

```bash
# Встановіть через командний рядок
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Або встановіть через VS Code:  
1. Відкрийте VS Code  
2. Перейдіть у Розширення (Ctrl+Shift+X)  
3. Встановіть:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Встановлення Python

Python 3.8+ потрібний для розробки MCP сервера.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Використання Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Перевірка встановлення

```bash
python --version  # Має показувати Python 3.11.x
pip --version      # Має показувати версію pip
```
  
## 🚀 Налаштування проєкту

### 1. Клонування репозиторію

```bash
# Клонувати головний репозиторій
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Перейти до каталогу проекту
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Перевірити структуру репозиторію
ls -la
```
  
### 2. Створення віртуального середовища Python

```bash
# Створити віртуальне середовище
python -m venv mcp-env

# Активувати віртуальне середовище
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Оновити pip
python -m pip install --upgrade pip
```
  
### 3. Встановлення Python-залежностей

```bash
# Встановіть залежності для розробки
pip install -r requirements.lock.txt

# Перевірте ключові пакети
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Розгортання ресурсів Azure

### 1. Ознайомлення з вимогами до ресурсів

Наш MCP сервер потребує такі ресурси Azure:

| **Ресурс** | **Призначення** | **Орієнтовна вартість** |
|------------|-----------------|-------------------------|
| **Microsoft Foundry** | Хостинг та управління AI моделями | $10-50/місяць |
| **OpenAI Deployment** | Модель для векторизації тексту (text-embedding-3-small) | $5-20/місяць |
| **Application Insights** | Моніторинг і телеметрія | $5-15/місяць |
| **Resource Group** | Організація ресурсів | Безкоштовно |

### 2. Розгортання ресурсів Azure

#### Варіант A: Автоматизоване розгортання (Рекомендовано)

```bash
# Перейдіть до директорії infrastructure
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Скрипт розгортання зробить:  
1. Створення унікальної групи ресурсів  
2. Розгортання ресурсів Microsoft Foundry  
3. Розгортання моделі text-embedding-3-small  
4. Налаштування Application Insights  
5. Створення сервісного принципала для автентифікації  
6. Генерацію файлу `.env` з конфігурацією  

#### Варіант B: Ручне розгортання

Якщо ви віддаєте перевагу ручному контролю або автоматичний скрипт не спрацював:  

```bash
# Встановити змінні
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Створити групу ресурсів
az group create --name $RESOURCE_GROUP --location $LOCATION

# Розгорнути основний шаблон
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Перевірка розгортання Azure

```bash
# Перевірити групу ресурсів
az group show --name $RESOURCE_GROUP --output table

# Перелік розгорнутих ресурсів
az resource list --resource-group $RESOURCE_GROUP --output table

# Тестування AI сервісу
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Налаштування змінних середовища

Після розгортання у вас має бути файл `.env`. Перевірте, що він містить:

```bash
# Зміст файлу .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Конфігурація бази даних (для розробки)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Налаштування Docker середовища

### 1. Розуміння Docker Composition

Наше середовище розробки використовує Docker Compose:  

```yaml
# docker-compose.yml overview
version: '3.8'
services:
  postgres:
    image: pgvector/pgvector:pg17
    environment:
      POSTGRES_DB: zava
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-secure_password}
    ports:
      - "5432:5432"
    volumes:
      - ./data:/backup_data:ro
      - ./docker-init:/docker-entrypoint-initdb.d:ro
    
  mcp_server:
    build: .
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "8000:8000"
    env_file:
      - .env
```
  
### 2. Запуск середовища розробки

```bash
# Переконайтеся, що ви у кореневій папці проекту
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Запустіть сервіси
docker-compose up -d

# Перевірте стан сервісу
docker-compose ps

# Перегляньте журнали
docker-compose logs -f
```
  
### 3. Перевірка налаштування бази даних

```bash
# Підключитися до контейнера PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Перевірити структуру бази даних
\dt retail.*

# Перевірити тестові дані
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Вийти з PostgreSQL
\q
```
  
### 4. Тестування MCP сервера

```bash
# Перевірте стан сервера MCP
curl http://localhost:8000/health

# Перевірте базову точку доступу MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 Налаштування VS Code

### 1. Налаштування інтеграції MCP

Створіть конфігурацію MCP для VS Code:  

```json
// .vscode/mcp.json
{
    "servers": {
        "zava-sales-analysis-headoffice": {
            "url": "http://127.0.0.1:8000/mcp",
            "type": "http",
            "headers": {"x-rls-user-id": "00000000-0000-0000-0000-000000000000"}
        },
        "zava-sales-analysis-seattle": {
            "url": "http://127.0.0.1:8000/mcp",
            "type": "http",
            "headers": {"x-rls-user-id": "f47ac10b-58cc-4372-a567-0e02b2c3d479"}
        },
        "zava-sales-analysis-redmond": {
            "url": "http://127.0.0.1:8000/mcp",
            "type": "http",
            "headers": {"x-rls-user-id": "e7f8a9b0-c1d2-3e4f-5678-90abcdef1234"}
        }
    },
    "inputs": []
}
```
  
### 2. Налаштування Python середовища

```json
// .vscode/settings.json
{
    "python.defaultInterpreterPath": "./mcp-env/bin/python",
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black",
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests"],
    "files.exclude": {
        "**/__pycache__": true,
        "**/.pytest_cache": true,
        "**/mcp-env": true
    }
}
```
  
### 3. Тестування інтеграції VS Code

1. **Відкрийте проєкт у VS Code**:  
   ```bash
   code .
   ```
  
2. **Відкрийте AI Chat**:  
   - Натисніть `Ctrl+Shift+P` (Windows/Linux) або `Cmd+Shift+P` (macOS)  
   - Введіть "AI Chat" і виберіть "AI Chat: Open Chat"  

3. **Перевірте підключення MCP сервера**:  
   - В AI Chat введіть `#zava` і виберіть один із налаштованих серверів  
   - Запитайте: "Які таблиці доступні у базі даних?"  
   - Ви повинні отримати відповідь зі списком таблиць роздрібної бази даних  

## ✅ Перевірка середовища

### 1. Комплексна перевірка системи

Запустіть цей скрипт перевірки, щоб переконатися у коректності налаштувань:  

```bash
# Створити скрипт перевірки
cat > validate_setup.py << 'EOF'
#!/usr/bin/env python3
"""
Environment validation script for MCP Server setup.
"""
import asyncio
import os
import sys
import subprocess
import requests
import asyncpg
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

async def validate_environment():
    """Comprehensive environment validation."""
    results = {}
    
    # Перевірити версію Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Перевірити необхідні пакети
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Перевірити Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Перевірити Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Перевірити змінні середовища
    required_env_vars = [
        'PROJECT_ENDPOINT',
        'AZURE_OPENAI_ENDPOINT',
        'EMBEDDING_MODEL_DEPLOYMENT_NAME',
        'AZURE_CLIENT_ID',
        'AZURE_CLIENT_SECRET',
        'AZURE_TENANT_ID'
    ]
    
    for var in required_env_vars:
        value = os.getenv(var)
        results[f'env_{var}'] = {
            'status': 'pass' if value else 'fail',
            'value': '***' if value and 'SECRET' in var else value
        }
    
    # Перевірити з'єднання з базою даних
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Тестовий запит
        result = await conn.fetchval('SELECT COUNT(*) FROM retail.stores')
        await conn.close()
        
        results['database'] = {
            'status': 'pass',
            'store_count': result
        }
    except Exception as e:
        results['database'] = {
            'status': 'fail',
            'error': str(e)
        }
    
    # Перевірити сервер MCP
    try:
        response = requests.get('http://localhost:8000/health', timeout=5)
        results['mcp_server'] = {
            'status': 'pass' if response.status_code == 200 else 'fail',
            'response': response.json() if response.status_code == 200 else response.text
        }
    except Exception as e:
        results['mcp_server'] = {
            'status': 'fail',
            'error': str(e)
        }
    
    # Перевірити сервіс Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Це не вдасться, якщо облікові дані недійсні
        results['azure_ai'] = {'status': 'pass'}
        
    except Exception as e:
        results['azure_ai'] = {
            'status': 'fail',
            'error': str(e)
        }
    
    return results

def print_results(results):
    """Print formatted validation results."""
    print("🔍 Environment Validation Results\n")
    print("=" * 50)
    
    passed = 0
    failed = 0
    
    for component, result in results.items():
        status = result.get('status', 'unknown')
        if status == 'pass':
            print(f"✅ {component}: PASS")
            passed += 1
        else:
            print(f"❌ {component}: FAIL")
            if 'error' in result:
                print(f"   Error: {result['error']}")
            failed += 1
    
    print("\n" + "=" * 50)
    print(f"Summary: {passed} passed, {failed} failed")
    
    if failed > 0:
        print("\n❗ Please fix the failed components before proceeding.")
        return False
    else:
        print("\n🎉 All validations passed! Your environment is ready.")
        return True

if __name__ == "__main__":
    asyncio.run(main())

async def main():
    results = await validate_environment()
    success = print_results(results)
    sys.exit(0 if success else 1)

EOF

# Запустити перевірку
python validate_setup.py
```
  
### 2. Контрольний список ручної перевірки

**✅ Базові інструменти**  
- [ ] Встановлено і працює Docker версії 20.10+  
- [ ] Встановлено Azure CLI 2.40+ і виконано автентифікацію  
- [ ] Встановлено Python 3.8+ з pip  
- [ ] Встановлено Git 2.30+  
- [ ] VS Code з необхідними розширеннями  

**✅ Ресурси Azure**  
- [ ] Група ресурсів створена успішно  
- [ ] Проєкт AI Foundry розгорнуто  
- [ ] Модель OpenAI text-embedding-3-small розгорнута  
- [ ] Налаштовано Application Insights  
- [ ] Створено сервісний принципал з належними правами  

**✅ Конфігурація середовища**  
- [ ] Створено файл `.env` з усіма необхідними змінними  
- [ ] Робочі облікові дані Azure (перевірено через `az account show`)  
- [ ] Контейнер PostgreSQL запущено і доступний  
- [ ] Завантажено тестові дані в базу  

**✅ Інтеграція VS Code**  
- [ ] Налаштовано `.vscode/mcp.json`  
- [ ] Вибрано інтерпретатор Python для віртуального середовища  
- [ ] MCP сервери відображаються в AI Chat  
- [ ] Можна виконувати тестові запити через AI Chat  

## 🛠️ Усунення поширених проблем

### Проблеми з Docker

**Проблема**: Контейнери Docker не запускаються  
```bash
# Перевірте статус служби Docker
docker info

# Перевірте доступні ресурси
docker system df

# Очистіть за потреби
docker system prune -f

# Перезапустіть Docker Desktop (Windows/macOS)
# Або перезапустіть службу Docker (Linux)
sudo systemctl restart docker
```
  
**Проблема**: Не вдається підключитися до PostgreSQL  
```bash
# Перевірте журнали контейнера
docker-compose logs postgres

# Перевірте, чи контейнер працює справно
docker-compose ps

# Перевірте пряме з'єднання
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Проблеми з розгортанням Azure

**Проблема**: Розгортання в Azure не вдається  
```bash
# Перевірте автентифікацію Azure CLI
az account show

# Перевірте дозволи підписки
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Перевірте реєстрацію провайдера ресурсів
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Проблема**: Не вдається автентифікуватися в AI сервісі  
```bash
# Тестувати обліковий запис служби
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Перевірити розгортання сервісу штучного інтелекту
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Проблеми з Python середовищем

**Проблема**: Помилка встановлення пакетів  
```bash
# Оновити pip та setuptools
python -m pip install --upgrade pip setuptools wheel

# Очистити кеш pip
pip cache purge

# Встановлювати пакети по одному, щоб виявити проблеми
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Проблема**: VS Code не знаходить інтерпретатор Python  
```bash
# Показати шляхи інтерпретатора Python
which python  # macOS/Linux
where python  # Windows

# Спочатку активуйте віртуальне середовище
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Потім відкрийте VS Code
code .
```
  
## 🎯 Основні висновки

Після завершення цієї лабораторної роботи у вас має бути:  

✅ **Повне середовище розробки**: усі інструменти встановлено і налаштовано  
✅ **Ресурси Azure розгорнуто**: AI сервіси і допоміжна інфраструктура  
✅ **Запущене Docker середовище**: контейнери PostgreSQL і MCP сервера  
✅ **Інтеграція VS Code**: налаштовані MCP сервери доступні  
✅ **Підтверджене налаштування**: всі компоненти протестовані і працюють разом  
✅ **Знання усунення проблем**: типові проблеми та способи їх вирішення  

## 🚀 Що далі

Коли ваше середовище готове, переходьте до **[Лабораторної роботи 04: Проєктування бази даних і схема](../04-Database/README.md)**, щоб:

- Детально вивчити схему роздрібної бази даних  
- Зрозуміти моделювання даних для мультиарендного середовища  
- Ознайомитись із впровадженням безпеки рівня рядків  
- Працювати з прикладними роздрібними даними  

## 📚 Додаткові ресурси

### Інструменти розробки
- [Документація Docker](https://docs.docker.com/) - Повний довідник Docker  
- [Довідник Azure CLI](https://docs.microsoft.com/cli/azure/) - Команди Azure CLI  
- [Документація VS Code](https://code.visualstudio.com/docs) - Налаштування редактора і розширень  

### Сервіси Azure
- [Документація Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Налаштування AI сервісів  
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - Розгортання AI моделей  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Налаштування моніторингу  

### Розробка на Python
- [Віртуальні середовища Python](https://docs.python.org/3/tutorial/venv.html) - Керування середовищами  
- [Документація AsyncIO](https://docs.python.org/3/library/asyncio.html) - Патерни асинхронного програмування  
- [Документація FastAPI](https://fastapi.tiangolo.com/) - Патерни веб-фреймворку  

---

**Далі**: Середовище готове? Продовжуйте з [Лабораторна робота 04: Проєктування бази даних і схема](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->