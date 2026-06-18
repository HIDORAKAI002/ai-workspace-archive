# Настройка на средата

## 🎯 Какво обхваща тази лаборатория

Тази практическа лаборатория ви води през настройването на пълна развойна среда за изграждане на MCP сървъри с интеграция на PostgreSQL. Ще конфигурирате всички необходими инструменти, ще разположите Azure ресурси и ще валидирате настройката си преди да продължите с имплементацията.

## Преглед

Правилната развойна среда е ключова за успешна разработка на MCP сървър. Тази лаборатория предоставя стъпка по стъпка инструкции за инсталиране на Docker, Azure услуги, развойни инструменти и валидиране, че всичко работи правилно заедно.

В края на лабораторията ще разполагате с напълно функционална развойна среда, готова за изграждане на Zava Retail MCP сървър.

## Учебни цели

В края на тази лаборатория ще можете да:

- **Инсталирате и конфигурирате** всички необходими развойни инструменти
- **Разположите Azure ресурси** необходими за MCP сървъра
- **Настроите Docker контейнери** за PostgreSQL и MCP сървъра
- **Валидирате** настройката на средата посредством тестови връзки
- **Отстранявате проблеми** с често срещани конфигурационни грешки
- **Разбирате** разработчическия работен процес и структурата на файловете

## 📋 Проверка на предварителните изисквания

Преди да започнете, уверете се, че имате:

### Необходими знания
- Основна работа с команден ред (Windows Command Prompt/PowerShell)
- Разбиране на променливи на средата
- Познания по Git за контрол на версиите
- Основни концепции за Docker (контейнери, образи, томове)

### Системни изисквания
- **Операционна система**: Windows 10/11, macOS или Linux
- **RAM**: Минимум 8GB (препоръчително 16GB)
- **Съхранение**: Най-малко 10GB свободно пространство
- **Мрежа**: Интернет връзка за изтегляния и Azure деплоймънт

### Изисквания за акаунти
- **Azure абонамент**: достатъчен е безплатният слой
- **GitHub акаунт**: за достъп до репозитория
- **Docker Hub акаунт**: (по избор) за публикуване на персонализирани образи

## 🛠️ Инсталиране на инструменти

### 1. Инсталиране на Docker Desktop

Docker предоставя контейнеризираната среда за нашата развойна настройка.

#### Инсталация за Windows

1. **Изтеглете Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Инсталирайте и конфигурирайте**:
   - Стартирайте инсталатора като Администратор
   - Активирайте интеграцията с WSL 2 при поискване
   - Рестартирайте компютъра след приключване на инсталацията

3. **Проверете инсталацията**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Инсталация за macOS

1. **Изтеглете и инсталирайте**:
   ```bash
   # Изтеглете от https://desktop.docker.com/mac/stable/Docker.dmg
   # Или използвайте Homebrew
   brew install --cask docker
   ```

2. **Стартирайте Docker Desktop**:
   - Стартирайте Docker Desktop от Applications
   - Завършете началната помощна програма

3. **Проверете инсталацията**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Инсталация за Linux

1. **Инсталирайте Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Излезте и влезте отново, за да влязат в сила промените в групите
   ```

2. **Инсталирайте Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Инсталиране на Azure CLI

Azure CLI позволява разгръщане и управление на Azure ресурси.

#### Инсталация за Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Инсталация за macOS

```bash
# Използване на Homebrew
brew install azure-cli

# Или използване на инсталатор
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Инсталация за Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Проверка и автентикация

```bash
# Проверете инсталацията
az version

# Влезте в Azure
az login

# Задайте подразбираща се абонамент (ако имате няколко)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Инсталиране на Git

Git е необходим за клониране на репозитория и контрол на версиите.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git обикновено е предварително инсталиран, но можете да го актуализирате чрез Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Инсталиране на VS Code

Visual Studio Code предоставя интегрираната развойна среда с поддръжка за MCP.

#### Инсталация

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Задължителни разширения

Инсталирайте тези разширения за VS Code:

```bash
# Инсталиране чрез команден ред
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Или ги инсталирайте през VS Code:
1. Отворете VS Code
2. Отидете на Extensions (Ctrl+Shift+X)
3. Инсталирайте:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Инсталиране на Python

Python 3.8+ е необходим за разработка на MCP сървър.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Използване на Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Проверка на инсталацията

```bash
python --version  # Трябва да показва Python 3.11.x
pip --version      # Трябва да показва версията на pip
```

## 🚀 Настройка на проекта

### 1. Клониране на репозитория

```bash
# Клонирайте основното хранилище
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Навигирайте до директорията на проекта
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Проверете структурата на хранилището
ls -la
```

### 2. Създаване на виртуална Python среда

```bash
# Създаване на виртуална среда
python -m venv mcp-env

# Активиране на виртуална среда
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Обновяване на pip
python -m pip install --upgrade pip
```

### 3. Инсталиране на Python зависимости

```bash
# Инсталирайте зависимости за разработка
pip install -r requirements.lock.txt

# Проверете ключовите пакети
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Разгръщане на Azure ресурси

### 1. Разбиране на изискванията за ресурси

Нашият MCP сървър изисква следните Azure ресурси:

| **Ресурс** | **Цел** | **Прогнозна цена** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Хостинг и управление на AI модели | 10-50 долара/месец |
| **OpenAI Deployment** | Модел за вграждане на текст (text-embedding-3-small) | 5-20 долара/месец |
| **Application Insights** | Мониторинг и телеметрия | 5-15 долара/месец |
| **Resource Group** | Организация на ресурси | Безплатно |

### 2. Разгръщане на Azure ресурси

#### Опция А: Автоматизирано разгръщане (препоръчително)

```bash
# Отидете в директорията с инфраструктура
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Скриптът за разгръщане ще:
1. Създаде уникална ресурсна група
2. Разположи Microsoft Foundry ресурси
3. Разположи модела text-embedding-3-small
4. Конфигурира Application Insights
5. Създаде служебен принципал за автентикация
6. Генерира `.env` файл с конфигурация

#### Опция Б: Ръчно разгръщане

Ако предпочитате ръчно управление или автоматизираният скрипт не работи:

```bash
# Задаване на променливи
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Създаване на ресурсна група
az group create --name $RESOURCE_GROUP --location $LOCATION

# Разгръщане на основния шаблон
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Проверка на Azure разгръщането

```bash
# Проверете ресурсната група
az group show --name $RESOURCE_GROUP --output table

# Изброяване на разположените ресурси
az resource list --resource-group $RESOURCE_GROUP --output table

# Тествайте AI услугата
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Конфигуриране на променливите на средата

След разгръщането, би трябвало да имате `.env` файл. Уверете се, че съдържа:

```bash
# Съдържание на .env файла
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Конфигурация на базата данни (за разработка)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Настройка на Docker среда

### 1. Разбиране на Docker композицията

Нашата развойна среда използва Docker Compose:

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

### 2. Стартиране на развойната среда

```bash
# Уверете се, че сте в основната директория на проекта
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Стартирайте услугите
docker-compose up -d

# Проверете статуса на услугата
docker-compose ps

# Прегледайте регистрационните файлове
docker-compose logs -f
```

### 3. Проверка на настройката на базата данни

```bash
# Свържете се с контейнера на PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Проверете структурата на базата данни
\dt retail.*

# Проверете пробните данни
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Излезте от PostgreSQL
\q
```

### 4. Тест на MCP сървъра

```bash
# Проверете здравето на MCP сървъра
curl http://localhost:8000/health

# Тествайте основната крайна точка на MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Конфигурация на VS Code

### 1. Конфигуриране на MCP интеграцията

Създайте VS Code конфигурация за MCP:

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

### 2. Конфигуриране на Python средата

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

### 3. Тест на VS Code интеграцията

1. **Отворете проекта във VS Code**:
   ```bash
   code .
   ```

2. **Отворете AI Chat**:
   - Натиснете `Ctrl+Shift+P` (Windows/Linux) или `Cmd+Shift+P` (macOS)
   - Въведете "AI Chat" и изберете "AI Chat: Open Chat"

3. **Тествайте връзка с MCP сървъра**:
   - В AI Chat напишете `#zava` и изберете един от конфигурираните сървъри
   - Попитайте: "Какви таблици има в базата данни?"
   - Трябва да получите отговор с изброяване на таблиците в търговската база данни

## ✅ Валидация на средата

### 1. Комплексна системна проверка

Стартирайте този скрипт за валидиране на настройката:

```bash
# Създаване на скрипт за валидация
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
    
    # Проверка на версията на Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Проверка на нужните пакети
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Проверка на Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Проверка на Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Проверка на променливите на средата
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
    
    # Проверка на връзката с базата данни
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Тестово запитване
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
    
    # Проверка на MCP сървъра
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
    
    # Проверка на Azure AI услугата
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Това ще се провали, ако идентификационните данни са невалидни
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

# Изпълнение на валидацията
python validate_setup.py
```

### 2. Ръчен проверочен списък

**✅ Основни инструменти**
- [ ] Инсталиран и работещ Docker версия 20.10+
- [ ] Инсталиран и автентикиран Azure CLI 2.40+
- [ ] Инсталиран Python 3.8+ с pip
- [ ] Инсталиран Git 2.30+
- [ ] VS Code със задължителните разширения

**✅ Azure ресурси**
- [ ] Успешно създадена ресурсна група
- [ ] Разгърнат AI Foundry проект
- [ ] Разгънат OpenAI модел text-embedding-3-small
- [ ] Конфигуриран Application Insights
- [ ] Създаден служебен принципал с правилни разрешения

**✅ Конфигурация на средата**
- [ ] Създаден `.env` файл с всички необходими променливи
- [ ] Работещи Azure креденшъли (проверете с `az account show`)
- [ ] Работещ и достъпен PostgreSQL контейнер
- [ ] Заредени примерни данни в базата

**✅ VS Code интеграция**
- [ ] Конфигуриран `.vscode/mcp.json`
- [ ] Настроен Python интерпретатор към виртуалната среда
- [ ] MCP сървъри се показват в AI Chat
- [ ] Възможност за изпълнение на тестови заявки през AI Chat

## 🛠️ Отстраняване на чести проблеми

### Проблеми с Docker

**Проблем**: Docker контейнерите не стартират  
```bash
# Проверете състоянието на Docker услугата
docker info

# Проверете наличните ресурси
docker system df

# Почистете, ако е необходимо
docker system prune -f

# Рестартирайте Docker Desktop (Windows/macOS)
# Или рестартирайте Docker услугата (Linux)
sudo systemctl restart docker
```

**Проблем**: Връзката с PostgreSQL неуспешна  
```bash
# Проверете дневниците на контейнера
docker-compose logs postgres

# Проверете дали контейнерът е здрав
docker-compose ps

# Тествайте директна връзка
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Проблеми с Azure разгръщане

**Проблем**: Azure разгръщането неуспешно  
```bash
# Проверете удостоверяване на Azure CLI
az account show

# Проверете разрешенията на абонамента
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Проверете регистрацията на доставчика на ресурси
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Проблем**: Автентикация към AI услугата неуспешна  
```bash
# Тествайте главния на услугата
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Потвърдете внедряването на AI услуга
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Проблеми с Python средата

**Проблем**: Неуспешна инсталация на пакети  
```bash
# Актуализирайте pip и setuptools
python -m pip install --upgrade pip setuptools wheel

# Изчистете кеша на pip
pip cache purge

# Инсталирайте пакетите един по един, за да идентифицирате проблеми
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Проблем**: VS Code не намира Python интерпретатор  
```bash
# Показване на пътищата до интерпретатора на Python
which python  # macOS/Linux
where python  # Windows

# Активирайте първо виртуалната среда
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# След това отворете VS Code
code .
```

## 🎯 Основни изводи

След завършване на тази лаборатория трябва да имате:

✅ **Пълна развойна среда**: Всички инструменти инсталирани и конфигурирани  
✅ **Разгърнати Azure ресурси**: AI услуги и инфраструктура  
✅ **Работеща Docker среда**: Контейнери за PostgreSQL и MCP сървър  
✅ **Интеграция с VS Code**: Конфигурирани и достъпни MCP сървъри  
✅ **Валидирана настройка**: Всички компоненти тествани и работещи заедно  
✅ **Знания за отстраняване на проблеми**: Чести проблеми и решения  

## 🚀 Какво следва

С готова среда продължете към **[Лаб 04: Дизайн и схема на базата данни](../04-Database/README.md)** за да:

- Прегледате подробно схемата на търговската база данни
- Разберете моделиране за мулти-тенант среди
- Научите за прилагане на Row Level Security
- Работите с примерни търговски данни

## 📚 Допълнителни ресурси

### Развойни инструменти
- [Документация на Docker](https://docs.docker.com/) - Пълна справка за Docker
- [Справка за Azure CLI](https://docs.microsoft.com/cli/azure/) - Команди на Azure CLI
- [Документация за VS Code](https://code.visualstudio.com/docs) - Конфигурация и разширения на редактора

### Azure услуги
- [Документация на Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Конфигурация на AI услугата
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - Разгръщане на AI модел
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Настройка на мониторинг

### Python разработка
- [Python виртуални среди](https://docs.python.org/3/tutorial/venv.html) - Управление на среди
- [Документация AsyncIO](https://docs.python.org/3/library/asyncio.html) - Патерни за асинхронно програмиране
- [FastAPI документация](https://fastapi.tiangolo.com/) - Уеб фреймуърк патерни

---

**Следващо**: Средата е готова? Продължете с [Лаб 04: Дизайн и схема на базата данни](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от отговорност**:
Този документ е преведен с помощта на AI преводачески услуга [Co-op Translator](https://github.com/Azure/co-op-translator). Въпреки че се стремим към точност, моля имайте предвид, че автоматизираните преводи могат да съдържат грешки или неточности. Оригиналният документ на неговия роден език трябва да се счита за авторитетен източник. За критична информация се препоръчва професионален човешки превод. Ние не носим отговорност за каквито и да е недоразумения или неправилни тълкувания, произтичащи от използването на този превод.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->