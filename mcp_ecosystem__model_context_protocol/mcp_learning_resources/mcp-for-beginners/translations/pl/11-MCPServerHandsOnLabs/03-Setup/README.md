# Konfiguracja Środowiska

## 🎯 Czego dotyczy to laboratorium

To praktyczne laboratorium prowadzi Cię przez konfigurację kompletnego środowiska deweloperskiego do budowy serwerów MCP z integracją PostgreSQL. Skonfigurujesz wszystkie niezbędne narzędzia, wdrożysz zasoby Azure i zweryfikujesz swoje ustawienia przed przystąpieniem do implementacji.

## Przegląd

Prawidłowe środowisko deweloperskie jest kluczowe dla udanego tworzenia serwerów MCP. To laboratorium zapewnia krok po kroku instrukcje konfiguracji Dockera, usług Azure, narzędzi deweloperskich oraz walidacji prawidłowego współdziałania.

Na koniec tego laboratorium będziesz mieć w pełni funkcjonalne środowisko deweloperskie gotowe do budowy serwera Zava Retail MCP.

## Cele nauki

Na koniec tego laboratorium będziesz potrafić:

- **Zainstalować i skonfigurować** wszystkie wymagane narzędzia deweloperskie
- **Wdrożyć zasoby Azure** potrzebne dla serwera MCP
- **Skonfigurować kontenery Docker** dla PostgreSQL i serwera MCP
- **Zweryfikować** konfigurację środowiska testując połączenia
- **Rozwiązywać problemy** z typowymi błędami konfiguracji i ustawień
- **Zrozumieć** przepływ pracy deweloperskiej i strukturę plików

## 📋 Sprawdzenie wymagań wstępnych

Przed rozpoczęciem upewnij się, że posiadasz:

### Wymagana wiedza
- Podstawowa obsługa wiersza poleceń (Windows Command Prompt/PowerShell)
- Znajomość zmiennych środowiskowych
- Znajomość systemu kontroli wersji Git
- Podstawowe pojęcia Dockera (kontenery, obrazy, wolumeny)

### Wymagania systemowe
- **System operacyjny**: Windows 10/11, macOS lub Linux
- **RAM**: Minimum 8GB (zalecane 16GB)
- **Pamięć**: Przynajmniej 10GB wolnego miejsca
- **Sieć**: Połączenie internetowe do pobierania i wdrożenia Azure

### Wymagania konta
- **Subskrypcja Azure**: Darmowa warstwa wystarcza
- **Konto GitHub**: Do dostępu do repozytorium
- **Konto Docker Hub**: (Opcjonalnie) Do publikowania własnych obrazów

## 🛠️ Instalacja narzędzi

### 1. Instalacja Docker Desktop

Docker zapewnia środowisko kontenerowe dla naszego setupu deweloperskiego.

#### Instalacja na Windows

1. **Pobierz Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Zainstaluj i skonfiguruj**:
   - Uruchom instalator jako Administrator
   - Włącz integrację WSL 2, kiedy pojawi się monit
   - Uruchom komputer ponownie po zakończeniu instalacji

3. **Zweryfikuj instalację**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Instalacja na macOS

1. **Pobierz i zainstaluj**:
   ```bash
   # Pobierz z https://desktop.docker.com/mac/stable/Docker.dmg
   # Lub użyj Homebrew
   brew install --cask docker
   ```

2. **Uruchom Docker Desktop**:
   - Otwórz Docker Desktop z folderu Aplikacje
   - Ukończ kreatora początkowej konfiguracji

3. **Zweryfikuj instalację**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Instalacja na Linux

1. **Zainstaluj Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Wyloguj się i zaloguj ponownie, aby zmiany w grupach zostały zastosowane
   ```

2. **Zainstaluj Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Instalacja Azure CLI

Azure CLI umożliwia wdrażanie i zarządzanie zasobami Azure.

#### Instalacja na Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Instalacja na macOS

```bash
# Korzystanie z Homebrew
brew install azure-cli

# Lub korzystanie z instalatora
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Instalacja na Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Weryfikacja i uwierzytelnienie

```bash
# Sprawdź instalację
az version

# Zaloguj się do Azure
az login

# Ustaw domyślną subskrypcję (jeśli masz więcej niż jedną)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Instalacja Git

Git jest wymagany do klonowania repozytorium i kontroli wersji.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git jest zwykle preinstalowany, ale możesz go zaktualizować za pomocą Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Instalacja VS Code

Visual Studio Code zapewnia zintegrowane środowisko programistyczne z obsługą MCP.

#### Instalacja

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Wymagane rozszerzenia

Zainstaluj następujące rozszerzenia VS Code:

```bash
# Zainstaluj przez wiersz poleceń
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Lub zainstaluj poprzez VS Code:
1. Otwórz VS Code
2. Przejdź do Rozszerzenia (Ctrl+Shift+X)
3. Zainstaluj:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Instalacja Pythona

Python 3.8+ jest wymagany do rozwoju serwera MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Używanie Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Weryfikacja instalacji

```bash
python --version  # Powinno pokazywać Python 3.11.x
pip --version      # Powinno pokazywać wersję pip
```

## 🚀 Konfiguracja projektu

### 1. Sklonuj repozytorium

```bash
# Sklonuj główne repozytorium
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Przejdź do katalogu projektu
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Sprawdź strukturę repozytorium
ls -la
```

### 2. Utwórz wirtualne środowisko Pythona

```bash
# Utwórz środowisko wirtualne
python -m venv mcp-env

# Aktywuj środowisko wirtualne
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Zaktualizuj pip
python -m pip install --upgrade pip
```

### 3. Zainstaluj zależności Pythona

```bash
# Zainstaluj zależności rozwojowe
pip install -r requirements.lock.txt

# Zweryfikuj kluczowe pakiety
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Wdrożenie zasobów Azure

### 1. Zrozum wymagania zasobów

Nasz serwer MCP wymaga następujących zasobów Azure:

| **Zasób** | **Cel** | **Szacowany koszt** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Hosting i zarządzanie modelami AI | 10-50 USD/miesiąc |
| **OpenAI Deployment** | Model osadzania tekstu (text-embedding-3-small) | 5-20 USD/miesiąc |
| **Application Insights** | Monitorowanie i telemetria | 5-15 USD/miesiąc |
| **Resource Group** | Organizacja zasobów | Bezpłatnie |

### 2. Wdróż zasoby Azure

#### Opcja A: Automatyczne wdrożenie (zalecane)

```bash
# Przejdź do katalogu infrastruktury
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Skrypt wdrożenia:
1. Utworzy unikalną grupę zasobów
2. Wdroży zasoby Microsoft Foundry
3. Wdroży model text-embedding-3-small
4. Skonfiguruje Application Insights
5. Utworzy usługę principal dla uwierzytelnienia
6. Wygeneruje plik `.env` z konfiguracją

#### Opcja B: Wdrożenie ręczne

Jeśli wolisz ręczną kontrolę lub skrypt automatyczny zawiedzie:

```bash
# Ustaw zmienne
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Utwórz grupę zasobów
az group create --name $RESOURCE_GROUP --location $LOCATION

# Wdróż główny szablon
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Zweryfikuj wdrożenie Azure

```bash
# Sprawdź grupę zasobów
az group show --name $RESOURCE_GROUP --output table

# Wymień wdrożone zasoby
az resource list --resource-group $RESOURCE_GROUP --output table

# Przetestuj usługę AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Skonfiguruj zmienne środowiskowe

Po wdrożeniu powinieneś mieć plik `.env`. Sprawdź, czy zawiera:

```bash
# Zawartość pliku .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Konfiguracja bazy danych (do rozwoju)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Konfiguracja środowiska Docker

### 1. Zrozum składnię Docker Compose

Nasze środowisko deweloperskie używa Docker Compose:

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

### 2. Uruchom środowisko deweloperskie

```bash
# Upewnij się, że jesteś w katalogu głównym projektu
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Uruchom usługi
docker-compose up -d

# Sprawdź status usługi
docker-compose ps

# Zobacz dzienniki
docker-compose logs -f
```

### 3. Zweryfikuj konfigurację bazy danych

```bash
# Połącz się z kontenerem PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Sprawdź strukturę bazy danych
\dt retail.*

# Zweryfikuj przykładowe dane
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Wyjdź z PostgreSQL
\q
```

### 4. Przetestuj serwer MCP

```bash
# Sprawdź stan serwera MCP
curl http://localhost:8000/health

# Przetestuj podstawowy punkt końcowy MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Konfiguracja VS Code

### 1. Skonfiguruj integrację MCP

Utwórz konfigurację MCP w VS Code:

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

### 2. Skonfiguruj środowisko Pythona

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

### 3. Przetestuj integrację VS Code

1. **Otwórz projekt w VS Code**:
   ```bash
   code .
   ```

2. **Otwórz AI Chat**:
   - Naciśnij `Ctrl+Shift+P` (Windows/Linux) lub `Cmd+Shift+P` (macOS)
   - Wpisz "AI Chat" i wybierz "AI Chat: Open Chat"

3. **Przetestuj połączenie z serwerem MCP**:
   - W AI Chat wpisz `#zava` i wybierz jeden z skonfigurowanych serwerów
   - Zapytaj: "Jakie tabele są dostępne w bazie danych?"
   - Powinieneś otrzymać odpowiedź z listą tabel sklepu detalicznego w bazie danych

## ✅ Walidacja środowiska

### 1. Kompleksowe sprawdzenie systemu

Uruchom ten skrypt walidacyjny, aby zweryfikować konfigurację:

```bash
# Utwórz skrypt walidacji
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
    
    # Sprawdź wersję Pythona
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Sprawdź wymagane pakiety
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Sprawdź Dockera
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Sprawdź Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Sprawdź zmienne środowiskowe
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
    
    # Sprawdź połączenie z bazą danych
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testowe zapytanie
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
    
    # Sprawdź serwer MCP
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
    
    # Sprawdź usługę Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # To nie powiodło się, jeśli dane uwierzytelniające są nieprawidłowe
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

# Uruchom walidację
python validate_setup.py
```

### 2. Ręczna lista kontrolna walidacji

**✅ Podstawowe narzędzia**
- [ ] Docker w wersji 20.10+ zainstalowany i uruchomiony
- [ ] Azure CLI 2.40+ zainstalowany i uwierzytelniony
- [ ] Python 3.8+ z pip zainstalowany
- [ ] Git 2.30+ zainstalowany
- [ ] VS Code z wymaganymi rozszerzeniami

**✅ Zasoby Azure**
- [ ] Grupa zasobów utworzona pomyślnie
- [ ] Projekt AI Foundry wdrożony
- [ ] Model OpenAI text-embedding-3-small wdrożony
- [ ] Application Insights skonfigurowany
- [ ] Utworzony service principal z odpowiednimi uprawnieniami

**✅ Konfiguracja środowiska**
- [ ] Plik `.env` utworzony z wszystkimi wymaganymi zmiennymi
- [ ] Dane uwierzytelniające Azure działają (test `az account show`)
- [ ] Kontener PostgreSQL uruchomiony i dostępny
- [ ] Załadowane przykładowe dane do bazy

**✅ Integracja VS Code**
- [ ] Plik `.vscode/mcp.json` skonfigurowany
- [ ] Interpreter Pythona ustawiony na środowisko wirtualne
- [ ] Serwery MCP widoczne w AI Chat
- [ ] Możliwość wykonywania zapytań testowych przez AI Chat

## 🛠️ Rozwiązywanie typowych problemów

### Problemy z Dockerem

**Problem**: Kontenery Docker nie uruchamiają się  
```bash
# Sprawdź status usługi Docker
docker info

# Sprawdź dostępne zasoby
docker system df

# Wyczyść w razie potrzeby
docker system prune -f

# Uruchom ponownie Docker Desktop (Windows/macOS)
# Lub uruchom ponownie usługę Docker (Linux)
sudo systemctl restart docker
```

**Problem**: Połączenie PostgreSQL nie działa  
```bash
# Sprawdź logi kontenera
docker-compose logs postgres

# Zweryfikuj, czy kontener jest zdrowy
docker-compose ps

# Przetestuj bezpośrednie połączenie
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Problemy z wdrożeniem Azure

**Problem**: Wdrożenie Azure się nie powiodło  
```bash
# Sprawdź uwierzytelnianie Azure CLI
az account show

# Zweryfikuj uprawnienia subskrypcji
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Sprawdź rejestrację dostawcy zasobów
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Problem**: Uwierzytelnienie usługi AI nie działa  
```bash
# Testuj głównego usługodawcę
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Zweryfikuj wdrożenie usługi AI
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Problemy ze środowiskiem Pythona

**Problem**: Instalacja pakietów nie powiodła się  
```bash
# Uaktualnij pip i setuptools
python -m pip install --upgrade pip setuptools wheel

# Wyczyść pamięć podręczną pip
pip cache purge

# Instaluj pakiety pojedynczo, aby zidentyfikować problemy
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Problem**: VS Code nie może znaleźć interpretera Pythona  
```bash
# Pokaż ścieżki interpretera Pythona
which python  # macOS/Linux
where python  # Windows

# Najpierw aktywuj środowisko wirtualne
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Następnie otwórz VS Code
code .
```

## 🎯 Kluczowe wnioski

Po ukończeniu tego laboratorium powinieneś mieć:

✅ **Kompletne środowisko deweloperskie**: Wszystkie narzędzia zainstalowane i skonfigurowane  
✅ **Wdrożone zasoby Azure**: Usługi AI i infrastruktura wspierająca  
✅ **Działające środowisko Docker**: Kontenery PostgreSQL i serwera MCP  
✅ **Integracja z VS Code**: Serwery MCP skonfigurowane i dostępne  
✅ **Zweryfikowaną konfigurację**: Wszystkie komponenty przetestowane i współdziałające  
✅ **Wiedzę troubleshootingową**: Typowe problemy i rozwiązania  

## 🚀 Co dalej

Gdy środowisko jest gotowe, przejdź do **[Laboratorium 04: Projekt bazy danych i schemat](../04-Database/README.md)**, aby:

- Poznać szczegółowo schemat bazy detalicznej
- Zrozumieć modelowanie danych dla wielu najemców
- Nauczyć się wdrażania Row Level Security
- Pracować na przykładowych danych detalicznych

## 📚 Dodatkowe zasoby

### Narzędzia deweloperskie
- [Dokumentacja Dockera](https://docs.docker.com/) - Pełna referencja Dockera
- [Dokumentacja Azure CLI](https://docs.microsoft.com/cli/azure/) - Polecenia Azure CLI
- [Dokumentacja VS Code](https://code.visualstudio.com/docs) - Konfiguracja i rozszerzenia edytora

### Usługi Azure
- [Dokumentacja Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Konfiguracja usług AI
- [Usługa Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Wdrożenie modelu AI
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Konfiguracja monitoringu

### Rozwój Pythona
- [Wirtualne środowiska Pythona](https://docs.python.org/3/tutorial/venv.html) - Zarządzanie środowiskiem
- [Dokumentacja AsyncIO](https://docs.python.org/3/library/asyncio.html) - Wzorce programowania asynchronicznego
- [Dokumentacja FastAPI](https://fastapi.tiangolo.com/) - Wzorce frameworka webowego

---

**Następne**: Środowisko gotowe? Kontynuuj z [Laboratorium 04: Projekt bazy danych i schemat](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Zastrzeżenie**:
Niniejszy dokument został przetłumaczony za pomocą usługi tłumaczenia AI [Co-op Translator](https://github.com/Azure/co-op-translator). Choć dążymy do dokładności, prosimy pamiętać, że automatyczne tłumaczenia mogą zawierać błędy lub niedokładności. Oryginalny dokument w jego języku źródłowym należy uznawać za autorytatywne źródło. W przypadku informacji krytycznych zalecane jest skorzystanie z profesjonalnego tłumaczenia wykonanego przez człowieka. Nie ponosimy odpowiedzialności za jakiekolwiek nieporozumienia lub błędne interpretacje wynikające z użycia tego tłumaczenia.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->