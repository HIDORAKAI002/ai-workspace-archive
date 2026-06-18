# Подешавање окружења

## 🎯 О чему је овај лабораторијски задатак

Овај практични лабораторијски задатак вас води кроз подешавање комплетног развојног окружења за изградњу MCP сервера са интеграцијом PostgreSQL-а. Конфигурисаћете све потребне алате, поставити Azure ресурсе и проверити своје подешавање пре наставка са имплементацијом.

## Преглед

Правилно развојно окружење је кључно за успешан развој MCP сервера. Овај лабораторијски задатак пружа корак по корак упутства за подешавање Docker-а, Azure сервиса, развојних алата и валидацију да све исправно ради заједно.

На крају овог лабораторијског задатка имаћете потпуно функционално развојно окружење спремно за изградњу Zava Retail MCP сервера.

## Циљеви учења

На крају овог лабораторијског задатка моћи ћете да:

- **Инсталирате и конфигуришете** све потребне развојне алате  
- **Размештате Azure ресурсе** потребне за MCP сервер  
- **Поставите Docker контејнере** за PostgreSQL и MCP сервер  
- **Проверите** своје окружење тест везама  
- **Решавате проблеме** уобичајених проблема са подешавањем и конфигурацијом  
- **Разумете** развојни ток рада и структуру фајлова  

## 📋 Провера предуслова

Пре почетка, осигурајте да имате:

### Потребна знања
- Основно коришћење командне линије (Windows Command Prompt/PowerShell)  
- Разумевање променљивих окружења  
- Познавање Git система за контролу верзија  
- Основни појмови Docker-а (контејнери, имиџи, волумени)  

### Системски захтеви
- **Оперативни систем**: Windows 10/11, macOS или Linux  
- **RAM**: минимум 8GB (препоручено 16GB)  
- **Складиштење**: најмање 10GB слободног простора  
- **Мрежа**: интернет веза за преузимања и Azure деплојмент  

### Захтеви за налоге
- **Azure претплата**: бесплатни ниво је довољан  
- **GitHub налог**: за приступ репозиторијуму  
- **Docker Hub налог**: (опционо) за објављивање прилагођених имиџа  

## 🛠️ Инсталација алата

### 1. Инсталирајте Docker Desktop

Docker обезбеђује контејнеризовано окружење за наше развојно подешавање.

#### Инсталација на Windows

1. **Пребаците Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Инсталирајте и конфигуришите**:  
   - Покрените инсталер као Администратор  
   - Омогућите интеграцију са WSL 2 када се затражи  
   - Поново покрените рачунар када инсталација буде готова  

3. **Проверите инсталацију**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### Инсталација на macOS

1. **Преузмите и инсталирајте**:  
   ```bash
   # Преузмите са https://desktop.docker.com/mac/stable/Docker.dmg
   # Или користите Homebrew
   brew install --cask docker
   ```
  
2. **Покрените Docker Desktop**:  
   - Покрените Docker Desktop из Applicatonс  
   - Завршите почетни чаробњак за подешавање  

3. **Проверите инсталацију**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Инсталација на Linux

1. **Инсталирајте Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Odjavite se i ponovo prijavite da bi promene u grupi stupile na snagu
   ```
  
2. **Инсталирајте Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Инсталирајте Azure CLI

Azure CLI омогућава развој и управљање Azure ресурсима.

#### Инсталација на Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### Инсталација на macOS

```bash
# Коришћење Homebrew-а
brew install azure-cli

# Или коришћење инсталлера
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Инсталација на Linux

```bash
# Убунту/Дебијан
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# РХЕЛ/ЦентОС
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Верификација и аутентификација

```bash
# Провери инсталацију
az version

# Пријави се на Azure
az login

# Постави подразумевану претплату (ако имаш више)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Инсталирајте Git

Git је потребан за клонирање репозиторијума и контролу верзија.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Гит је обично претходно инсталиран, али можете ажурирати преко Хомебреу-а
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Инсталирајте VS Code

Visual Studio Code пружа интегрисано развојно окружење са MCP подршком.

#### Инсталација

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Потребни додаци

Инсталирајте ове VS Code додатке:

```bash
# Инсталирајте преко командне линије
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Или инсталирајте преко VS Code:  
1. Отворите VS Code  
2. Идите на Extensions (Ctrl+Shift+X)  
3. Инсталирајте:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Инсталирајте Python

Python 3.8+ је потребан за развој MCP сервера.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Користећи Хоумбру
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Провера инсталације

```bash
python --version  # Треба да прикаже Python 3.11.x
pip --version      # Треба да прикаже верзију pip-а
```
  
## 🚀 Подешавање пројекта

### 1. Клонирајте репозиторијум

```bash
# Клонирајте главни репозиторијум
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Идите до директоријума пројекта
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Проверите структуру репозиторијума
ls -la
```
  
### 2. Креирајте виртуелно Python окружење

```bash
# Креирај виртуелно окружење
python -m venv mcp-env

# Активирај виртуелно окружење
# Виндоус
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Ажурирај pip
python -m pip install --upgrade pip
```
  
### 3. Инсталирајте Python зависности

```bash
# Инсталирајте развојне зависности
pip install -r requirements.lock.txt

# Провера кључних пакета
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Размештање Azure ресурса

### 1. Разумевање захтева за ресурсе

Наш MCP сервер захтева следеће Azure ресурсе:

| **Ресурс** | **Намена** | **Процењени трошак** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Хостинг и управљање AI моделом | $10-50/месечно |
| **OpenAI Deployment** | Модель за уграђивање текста (text-embedding-3-small) | $5-20/месечно |
| **Application Insights** | Надзор и телеметрија | $5-15/месечно |
| **Resource Group** | Организација ресурса | Бесплатно |

### 2. Разместите Azure ресурсе

#### Опција A: Аутоматизовано размештање (Препоручено)

```bash
# Идите до директорију инфраструктуре
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Скрипта за размештање ће:  
1. Креирати јединствену групу ресурса  
2. Разместити Microsoft Foundry ресурсе  
3. Разместити модел text-embedding-3-small  
4. Конфигурисати Application Insights  
5. Креирати сервисни преносник за аутентификацију  
6. Генерисати `.env` фајл са конфигурацијом  

#### Опција B: Ручно размештање

Ако више волите ручно управљање или аутоматизована скрипта не ради:

```bash
# Постави варијабле
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Креирај ресурсну групу
az group create --name $RESOURCE_GROUP --location $LOCATION

# Деплој главни шаблон
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Потврдите Azure размештање

```bash
# Проверите ресурсну групу
az group show --name $RESOURCE_GROUP --output table

# Листа распоређених ресурса
az resource list --resource-group $RESOURCE_GROUP --output table

# Тестирајте АИ услугу
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Конфигуришите променљиве окружења

Након размештања, требали бисте имати `.env` фајл. Проверите да садржи:

```bash
# садржај .env фајла
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Конфигурација базе података (за развој)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Docker окружење за развој

### 1. Разумевање Docker Compose

Наше развојно окружење користи Docker Compose:

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
  
### 2. Покрените развојно окружење

```bash
# Уверите се да сте у коренском директоријуму пројекта
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Покрените сервисе
docker-compose up -d

# Проверите статус сервиса
docker-compose ps

# Погледајте логове
docker-compose logs -f
```
  
### 3. Проверите подешавање базе података

```bash
# Повежите се на PostgreSQL контејнер
docker-compose exec postgres psql -U postgres -d zava

# Проверите структуру базе података
\dt retail.*

# Верификујте пример података
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Изађите из PostgreSQL
\q
```
  
### 4. Тестирајте MCP сервер

```bash
# Проверите здравље MCP сервера
curl http://localhost:8000/health

# Тестирајте основни MCP крајње тачку
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 VS Code конфигурација

### 1. Конфигуришите MCP интеграцију

Креирајте VS Code MCP конфигурацију:

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
  
### 2. Конфигуришите Python окружење

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
  
### 3. Тестирајте интеграцију у VS Code

1. **Отворите пројекат у VS Code:**  
   ```bash
   code .
   ```
  
2. **Отворите AI Chat**:  
   - Притисните `Ctrl+Shift+P` (Windows/Linux) или `Cmd+Shift+P` (macOS)  
   - Откуцајте "AI Chat" и изаберите "AI Chat: Open Chat"  

3. **Тестирајте везу са MCP сервером**:  
   - У AI Chat унесите `#zava` и изаберите један од конфигурисаних сервера  
   - Питајте: "Које табеле су доступне у бази података?"  
   - Требало би да добијете одговор са листом табела у малопродајној бази података  

## ✅ Верификација окружења

### 1. Свеобухватна провера система

Покрените овај скрипт за проверу подешавања:

```bash
# Креирај скрипту за валидацију
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
    
    # Провери верзију Питона
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Провери потребне пакете
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Провери Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Провери Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Провери променљиве окружења
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
    
    # Провери везу са базом података
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Тест упит
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
    
    # Провери MCP сервер
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
    
    # Провери Azure AI услугу
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Ово ће пропасти ако су акредитиви неважећи
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

# Покрени валидацију
python validate_setup.py
```
  
### 2. Ручни контролни списак

**✅ Основни алати**  
- [ ] Docker верзија 20.10+ инсталирана и покренута  
- [ ] Azure CLI 2.40+ инсталиран и аутентификован  
- [ ] Python 3.8+ са pip-ом инсталиран  
- [ ] Git 2.30+ инсталиран  
- [ ] VS Code са потребним додацима  

**✅ Azure ресурси**  
- [ ] Група ресурса успешно креирана  
- [ ] AI Foundry пројекат размештен  
- [ ] OpenAI текст-embedding-3-small модел размештен  
- [ ] Application Insights конфигурисан  
- [ ] Сервисни преносник креиран са одговарајућим дозволама  

**✅ Конфигурација окружења**  
- [ ] `.env` датотека креирана са свим потребним променљивима  
- [ ] Azure креденцијали функционишу (тест са `az account show`)  
- [ ] PostgreSQL контејнер покренут и доступан  
- [ ] Унета примерна база података  

**✅ VS Code интеграција**  
- [ ] `.vscode/mcp.json` конфигурисан  
- [ ] Python тумач подешен на виртуелно окружење  
- [ ] MCP сервери се виде у AI Chat-у  
- [ ] Могућност извођења тест упита преко AI Chat-а  

## 🛠️ Решавање уобичајених проблема

### Проблеми са Docker-ом

**Проблем**: Docker контејнери се не покрећу  
```bash
# Проверите статус Docker сервиса
docker info

# Проверите расположиве ресурсе
docker system df

# Очистите ако је потребно
docker system prune -f

# Поново покрените Docker Desktop (Windows/macOS)
# Или поново покрените Docker сервис (Linux)
sudo systemctl restart docker
```
  
**Проблем**: Веза са PostgreSQL-ом не успева  
```bash
# Проверите записе контејнера
docker-compose logs postgres

# Проверите да ли је контејнер здрав
docker-compose ps

# Тестирајте директну везу
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Проблеми са Azure размештањем

**Проблем**: Не успева Azure размештање  
```bash
# Проверите аутентификацију Azure CLI
az account show

# Потврдите дозволе претплате
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Проверите регистрацију провајдера ресурса
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Проблем**: Аутентификација AI сервиса не успева  
```bash
# Тестирајте сервисни налог
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Потврдите распоређивање AI сервиса
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Проблеми са Python окружењем

**Проблем**: Инсталација пакета неуспешна  
```bash
# Ажурирај pip и setuptools
python -m pip install --upgrade pip setuptools wheel

# Очисти кеш pip-а
pip cache purge

# Инсталирај пакете један по један да би идентификовао проблеме
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Проблем**: VS Code не може да пронађе Python тумач  
```bash
# Прикажи путеве до Питон тумача
which python  # macOS/Linux
where python  # Windows

# Прво активирај виртуелно окружење
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Затим отвори VS Code
code .
```
  
## 🎯 Кључне поруке

Након завршетка овог лабораторијског задатка требало би да имате:

✅ **Потпуно развојно окружење**: Сви алати инсталирани и конфигурисани  
✅ **Размештени Azure ресурси**: AI сервиси и пратећа инфраструктура  
✅ **Docker окружење у раду**: PostgreSQL и MCP сервер контејнери  
✅ **VS Code интеграција**: MCP сервери конфигурисани и доступни  
✅ **Валидација подешавања**: Сви компоненти тестиранi и функционални  
✅ **Знање за решавање проблема**: Уобичајени проблеми и решења  

## 🚀 Шта следи

Са спремним окружењем наставите са **[Lab 04: Database Design and Schema](../04-Database/README.md)** да:

- Истражите детаљно шему малопродајне базе података  
- Разумете моделирање мулти-тенант података  
- Научите о имплементацији Row Level Security  
- Радите са примером малопродајних података  

## 📚 Додатни ресурси

### Развојни алати
- [Docker Documentation](https://docs.docker.com/) - Комплетна Docker референца  
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/) - Azure CLI команде  
- [VS Code Documentation](https://code.visualstudio.com/docs) - Конфигурација уредника и додаци  

### Azure сервиси
- [Microsoft Foundry Documentation](https://docs.microsoft.com/azure/ai-foundry/) - Конфигурација AI сервиса  
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - Размештање AI модела  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Подешавање мониторинга  

### Python развој
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) - Управљање окружењем  
- [AsyncIO Documentation](https://docs.python.org/3/library/asyncio.html) - Обрасци асинхроног програмирања  
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Обрасци веб фрејмворка  

---

**Следеће**: Окружење спремно? Наставите са [Lab 04: Database Design and Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->