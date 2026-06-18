# Настройка окружения

## 🎯 Что охватывает эта лабораторная работа

Эта практическая лабораторная работа проведет вас через настройку полного окружения для разработки серверов MCP с интеграцией PostgreSQL. Вы настроите все необходимые инструменты, развернете ресурсы Azure и проверите свою установку перед продолжением реализации.

## Обзор

Правильно настроенное окружение разработки имеет решающее значение для успешной разработки серверов MCP. Эта лабораторная работа предоставляет пошаговые инструкции по настройке Docker, сервисов Azure, инструментов разработки и проверке того, что все работает корректно вместе.

К концу этой лабораторной работы у вас будет полностью функционирующее окружение разработки, готовое для создания сервера Zava Retail MCP.

## Цели обучения

К концу этой лабораторной работы вы сможете:

- **Установить и настроить** все необходимые инструменты разработки  
- **Развернуть ресурсы Azure**, необходимые для сервера MCP  
- **Настроить Docker-контейнеры** для PostgreSQL и сервера MCP  
- **Проверить** настройку окружения тестовыми подключениями  
- **Устранять неполадки** с типичными проблемами установки и конфигурации  
- **Понимать** рабочий процесс разработки и структуру файлов  

## 📋 Проверка требований

Перед началом убедитесь, что у вас есть:

### Необходимые знания
- Базовое использование командной строки (Windows Command Prompt/PowerShell)  
- Понимание переменных окружения  
- Знакомство с системой контроля версий Git  
- Базовые концепции Docker (контейнеры, образы, тома)  

### Требования к системе
- **Операционная система**: Windows 10/11, macOS или Linux  
- **ОЗУ**: минимум 8 ГБ (рекомендуется 16 ГБ)  
- **Хранилище**: не менее 10 ГБ свободного места  
- **Сеть**: подключение к Интернету для загрузок и развертывания Azure  

### Требования к учетным записям
- **Подписка Azure**: достаточно бесплатного тарифа  
- **Аккаунт GitHub**: для доступа к репозиторию  
- **Аккаунт Docker Hub**: (опционально) для публикации собственных образов  

## 🛠️ Установка инструментов

### 1. Установка Docker Desktop

Docker обеспечивает контейнеризованное окружение для нашей разработки.

#### Установка в Windows

1. **Скачайте Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Установите и настройте**:  
   - Запустите установщик от имени администратора  
   - Включите интеграцию WSL 2 при запросе  
   - Перезагрузите компьютер после завершения установки  

3. **Проверьте установку**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### Установка в macOS

1. **Скачайте и установите**:  
   ```bash
   # Скачать с https://desktop.docker.com/mac/stable/Docker.dmg
   # Или используйте Homebrew
   brew install --cask docker
   ```
  
2. **Запустите Docker Desktop**:  
   - Запустите Docker Desktop из папки Applications  
   - Пройдите через мастер первоначальной настройки  

3. **Проверьте установку**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Установка в Linux

1. **Установите Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Выйдите из системы и войдите снова, чтобы изменения групп вступили в силу
   ```
  
2. **Установите Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Установка Azure CLI

Azure CLI позволяет развертывать и управлять ресурсами Azure.

#### Установка в Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### Установка в macOS

```bash
# Использование Homebrew
brew install azure-cli

# Или использование установщика
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Установка в Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Проверка и аутентификация

```bash
# Проверить установку
az version

# Войти в Azure
az login

# Установить подписку по умолчанию (если у вас несколько)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Установка Git

Git требуется для клонирования репозитория и контроля версий.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git обычно предустановлен, но вы можете обновить его через Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Установка VS Code

Visual Studio Code предоставляет интегрированную среду разработки с поддержкой MCP.

#### Установка

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Необходимые расширения

Установите эти расширения VS Code:

```bash
# Установите через командную строку
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Или установите через VS Code:  
1. Откройте VS Code  
2. Перейдите в Расширения (Ctrl+Shift+X)  
3. Установите:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Установка Python

Для разработки сервера MCP требуется Python 3.8+.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Использование Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Проверка установки

```bash
python --version  # Должен показать Python 3.11.x
pip --version      # Должен показать версию pip
```
  
## 🚀 Настройка проекта

### 1. Клонирование репозитория

```bash
# Клонировать основной репозиторий
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Перейти в каталог проекта
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Проверить структуру репозитория
ls -la
```
  
### 2. Создание виртуального окружения Python

```bash
# Создать виртуальное окружение
python -m venv mcp-env

# Активировать виртуальное окружение
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Обновить pip
python -m pip install --upgrade pip
```
  
### 3. Установка зависимостей Python

```bash
# Установите зависимости для разработки
pip install -r requirements.lock.txt

# Проверьте ключевые пакеты
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Развертывание ресурсов Azure

### 1. Понимание требований к ресурсам

Нашему серверу MCP нужны следующие ресурсы Azure:

| **Ресурс**         | **Назначение**                   | **Оценочная стоимость** |
|--------------------|---------------------------------|------------------------|
| **Microsoft Foundry** | Хостинг и управление AI-моделями  | $10-50/месяц           |
| **OpenAI Deployment** | Модель текстового встраивания (text-embedding-3-small) | $5-20/месяц            |
| **Application Insights** | Мониторинг и телеметрия          | $5-15/месяц            |
| **Resource Group**  | Организация ресурсов             | Бесплатно              |

### 2. Развертывание ресурсов Azure

#### Вариант A: Автоматизированное развертывание (рекомендуется)

```bash
# Перейдите в каталог инфраструктуры
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Скрипт развертывания выполнит:  
1. Создание уникальной группы ресурсов  
2. Развертывание ресурсов Microsoft Foundry  
3. Развертывание модели text-embedding-3-small  
4. Настройку Application Insights  
5. Создание сервисного принципала для аутентификации  
6. Генерацию файла `.env` с конфигурацией  

#### Вариант B: Ручное развертывание

Если вы предпочитаете ручное управление или скрипт не сработал:

```bash
# Установить переменные
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Создать группу ресурсов
az group create --name $RESOURCE_GROUP --location $LOCATION

# Развернуть основной шаблон
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Проверка развертывания Azure

```bash
# Проверьте группу ресурсов
az group show --name $RESOURCE_GROUP --output table

# Список развернутых ресурсов
az resource list --resource-group $RESOURCE_GROUP --output table

# Тестировать службу ИИ
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Настройка переменных окружения

После развертывания у вас должен быть файл `.env`. Проверьте, что он содержит:

```bash
# Содержимое файла .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Конфигурация базы данных (для разработки)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Настройка Docker-окружения

### 1. Понимание Docker Compose

Наше окружение разработки использует Docker Compose:

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
  
### 2. Запуск окружения разработки

```bash
# Убедитесь, что вы находитесь в корневом каталоге проекта
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Запустите сервисы
docker-compose up -d

# Проверьте статус сервиса
docker-compose ps

# Просмотреть логи
docker-compose logs -f
```
  
### 3. Проверка настройки базы данных

```bash
# Подключиться к контейнеру PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Проверить структуру базы данных
\dt retail.*

# Проверить пример данных
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Выйти из PostgreSQL
\q
```
  
### 4. Тестирование сервера MCP

```bash
# Проверить состояние сервера MCP
curl http://localhost:8000/health

# Протестировать базовую конечную точку MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 Конфигурация VS Code

### 1. Настройка интеграции MCP

Создайте конфигурацию MCP для VS Code:

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
  
### 2. Настройка Python-окружения

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
  
### 3. Тест интеграции VS Code

1. **Откройте проект в VS Code**:  
   ```bash
   code .
   ```
  
2. **Откройте AI Chat**:  
   - Нажмите `Ctrl+Shift+P` (Windows/Linux) или `Cmd+Shift+P` (macOS)  
   - Введите "AI Chat" и выберите "AI Chat: Open Chat"  

3. **Проверьте подключение к серверу MCP**:  
   - В AI Chat наберите `#zava` и выберите один из настроенных серверов  
   - Задайте вопрос: "Какие таблицы доступны в базе данных?"  
   - Вы должны получить ответ со списком таблиц розничной базы данных  

## ✅ Проверка окружения

### 1. Комплексная проверка системы

Запустите этот скрипт проверки, чтобы убедиться в корректной настройке:

```bash
# Создать скрипт проверки
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
    
    # Проверить версию Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Проверить необходимые пакеты
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Проверить Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Проверить Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Проверить переменные окружения
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
    
    # Проверить подключение к базе данных
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Тестовый запрос
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
    
    # Проверить сервер MCP
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
    
    # Проверить сервис Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Это завершится ошибкой, если учетные данные недействительны
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

# Выполнить проверку
python validate_setup.py
```
  
### 2. Контрольный список ручной проверки

**✅ Основные инструменты**  
- [ ] Docker версии 20.10+ установлен и работает  
- [ ] Azure CLI версии 2.40+ установлен и выполнена аутентификация  
- [ ] Установлен Python 3.8+ с pip  
- [ ] Git версии 2.30+ установлен  
- [ ] VS Code с необходимыми расширениями  

**✅ Ресурсы Azure**  
- [ ] Создана группа ресурсов  
- [ ] Развернут проект AI Foundry  
- [ ] Развернута модель OpenAI text-embedding-3-small  
- [ ] Настроен Application Insights  
- [ ] Создан сервисный принципал с необходимыми правами  

**✅ Конфигурация окружения**  
- [ ] Создан файл `.env` со всеми переменными  
- [ ] Данные учетных записей Azure работают (проверка через `az account show`)  
- [ ] Контейнер PostgreSQL запущен и доступен  
- [ ] В базу данных загружены примерные данные  

**✅ Интеграция VS Code**  
- [ ] Настроен `.vscode/mcp.json`  
- [ ] Интерпретатор Python установлен для виртуального окружения  
- [ ] MCP серверы доступны в AI Chat  
- [ ] Выполнение тестовых запросов через AI Chat работает  

## 🛠️ Устранение распространенных проблем

### Проблемы с Docker

**Проблема**: Контейнеры Docker не запускаются  
```bash
# Проверить статус службы Docker
docker info

# Проверить доступные ресурсы
docker system df

# Очистить при необходимости
docker system prune -f

# Перезапустить Docker Desktop (Windows/macOS)
# Или перезапустить службу Docker (Linux)
sudo systemctl restart docker
```
  
**Проблема**: Не удается подключиться к PostgreSQL  
```bash
# Проверить логи контейнера
docker-compose logs postgres

# Проверить, что контейнер работает нормально
docker-compose ps

# Протестировать прямое подключение
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Проблемы с развертыванием Azure

**Проблема**: Не удается развернуть Azure  
```bash
# Проверьте аутентификацию Azure CLI
az account show

# Проверьте разрешения подписки
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Проверьте регистрацию поставщика ресурсов
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Проблема**: Не удается пройти аутентификацию в AI сервисе  
```bash
# Тестировать главного пользователя службы
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Проверить развертывание службы искусственного интеллекта
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Проблемы с Python окружением

**Проблема**: Ошибка установки пакетов  
```bash
# Обновить pip и setuptools
python -m pip install --upgrade pip setuptools wheel

# Очистить кэш pip
pip cache purge

# Устанавливать пакеты по одному для выявления проблем
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Проблема**: VS Code не может найти интерпретатор Python  
```bash
# Показать пути интерпретатора Python
which python  # macOS/Linux
where python  # Windows

# Сначала активируйте виртуальное окружение
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Затем откройте VS Code
code .
```
  
## 🎯 Основные выводы

После прохождения этой лабораторной работы вы получите:

✅ **Полное окружение разработки**: все инструменты установлены и настроены  
✅ **Развернутые ресурсы Azure**: AI-сервисы и поддерживающая инфраструктура  
✅ **Работающее Docker-окружение**: контейнеры PostgreSQL и сервера MCP  
✅ **Интеграцию VS Code**: MCP серверы настроены и доступны  
✅ **Проверку настройки**: все компоненты протестированы и работают совместно  
✅ **Навыки устранения проблем**: знание типичных проблем и решений  

## 🚀 Что дальше

С готовым окружением продолжайте с **[Лабораторной работой 04: Проектирование Базы Данных и Схема](../04-Database/README.md)**, чтобы:

- Изучить схему розничной базы данных подробно  
- Понять моделирование данных для нескольких арендаторов  
- Изучить реализацию Row Level Security  
- Работать с примерными данными розничных продаж  

## 📚 Дополнительные ресурсы

### Инструменты разработки
- [Документация Docker](https://docs.docker.com/) — полный справочник по Docker  
- [Справочник Azure CLI](https://docs.microsoft.com/cli/azure/) — команды Azure CLI  
- [Документация VS Code](https://code.visualstudio.com/docs) — настройка редактора и расширения  

### Сервисы Azure
- [Документация Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) — настройка AI-сервисов  
- [Сервис Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) — развертывание AI-моделей  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) — настройка мониторинга  

### Разработка на Python
- [Виртуальные окружения Python](https://docs.python.org/3/tutorial/venv.html) — управление окружениями  
- [Документация AsyncIO](https://docs.python.org/3/library/asyncio.html) — шаблоны асинхронного программирования  
- [Документация FastAPI](https://fastapi.tiangolo.com/) — шаблоны веб-фреймворка  

---

**Далее**: Окружение готово? Продолжайте с [Лабораторной работой 04: Проектирование Базы Данных и Схема](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->