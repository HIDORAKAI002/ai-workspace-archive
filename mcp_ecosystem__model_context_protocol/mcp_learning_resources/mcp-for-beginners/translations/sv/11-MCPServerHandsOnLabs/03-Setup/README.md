# Miljöinställning

## 🎯 Vad denna labb täcker

Denna praktiska labb vägleder dig genom att sätta upp en komplett utvecklingsmiljö för att bygga MCP-servrar med PostgreSQL-integration. Du kommer att konfigurera alla nödvändiga verktyg, distribuera Azure-resurser och validera din installation innan du går vidare med implementeringen.

## Översikt

En korrekt utvecklingsmiljö är avgörande för framgångsrik MCP-serverutveckling. Denna labb ger steg-för-steg-instruktioner för att installera Docker, Azure-tjänster, utvecklingsverktyg, och att validera att allt fungerar korrekt tillsammans.

I slutet av denna labb kommer du att ha en fullt fungerande utvecklingsmiljö redo för att bygga Zava Retail MCP-servern.

## Lärandemål

Efter denna labb kommer du att kunna:

- **Installera och konfigurera** alla nödvändiga utvecklingsverktyg
- **Distribuera Azure-resurser** som behövs för MCP-servern
- **Sätta upp Docker-containrar** för PostgreSQL och MCP-servern
- **Validera** din miljö med testanslutningar
- **Felsöka** vanliga installationsproblem och konfigurationsproblem
- **Förstå** utvecklingsflödet och filstrukturen

## 📋 Kontroll av förutsättningar

Innan du börjar, säkerställ att du har:

### Nödvändiga kunskaper
- Grundläggande användning av kommandoraden (Windows Command Prompt/PowerShell)
- Förståelse för miljövariabler
- Bekantskap med Git versionshantering
- Grundläggande Docker-koncept (containrar, images, volymer)

### Systemkrav
- **Operativsystem**: Windows 10/11, macOS eller Linux
- **RAM**: Minst 8GB (16GB rekommenderas)
- **Lagring**: Minst 10GB ledigt utrymme
- **Nätverk**: Internetanslutning för nedladdningar och Azure-distribution

### Kontokrav
- **Azure-prenumeration**: Gratisnivå räcker
- **GitHub-konto**: För åtkomst till repository
- **Docker Hub-konto**: (Valfritt) För publicering av egna images

## 🛠️ Verktyg installation

### 1. Installera Docker Desktop

Docker tillhandahåller den containeriserade miljön för vår utvecklingssetup.

#### Windows Installation

1. **Ladda ner Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Installera och konfigurera**:
   - Kör installationsprogrammet som administratör
   - Aktivera WSL 2-integrering när du blir ombedd
   - Starta om datorn efter installationen

3. **Verifiera installation**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS Installation

1. **Ladda ner och installera**:
   ```bash
   # Ladda ner från https://desktop.docker.com/mac/stable/Docker.dmg
   # Eller använd Homebrew
   brew install --cask docker
   ```

2. **Starta Docker Desktop**:
   - Öppna Docker Desktop från Applikationer
   - Slutför installationsguiden

3. **Verifiera installation**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux Installation

1. **Installera Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Logga ut och logga in igen för att gruppändringar ska träda i kraft
   ```

2. **Installera Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Installera Azure CLI

Azure CLI möjliggör distribution och hantering av Azure-resurser.

#### Windows Installation

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS Installation

```bash
# Använda Homebrew
brew install azure-cli

# Eller använda installatör
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux Installation

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Verifiera och autentisera

```bash
# Kontrollera installation
az version

# Logga in på Azure
az login

# Ange standardprenumeration (om du har flera)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Installera Git

Git krävs för att klona repository och versionshantering.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git är vanligtvis förinstallerat, men du kan uppdatera via Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Installera VS Code

Visual Studio Code är den integrerade utvecklingsmiljön med stöd för MCP.

#### Installation

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Nödvändiga tillägg

Installera dessa tillägg i VS Code:

```bash
# Installera via kommandoraden
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Eller installera via VS Code:
1. Öppna VS Code
2. Gå till Extensions (Ctrl+Shift+X)
3. Installera:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Installera Python

Python 3.8+ krävs för MCP-serverutveckling.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Använder Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Verifiera installation

```bash
python --version  # Bör visa Python 3.11.x
pip --version      # Bör visa pip-version
```

## 🚀 Projektsetup

### 1. Klona repository

```bash
# Klona huvudförvaret
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navigera till projektkatalogen
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Verifiera förvarsstruktur
ls -la
```

### 2. Skapa Python virtuellt miljö

```bash
# Skapa virtuellt miljö
python -m venv mcp-env

# Aktivera virtuellt miljö
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Uppgradera pip
python -m pip install --upgrade pip
```

### 3. Installera Python-beroenden

```bash
# Installera utvecklingsberoenden
pip install -r requirements.lock.txt

# Verifiera nyckelpaket
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure resursdistribution

### 1. Förstå resurskraven

Vår MCP-server kräver dessa Azure-resurser:

| **Resurs** | **Syfte** | **Uppskattad kostnad** |
|------------|-----------|-----------------------|
| **Microsoft Foundry** | AI-modellvärd och hantering | $10-50/månad |
| **OpenAI-distribution** | Textembeddingmodell (text-embedding-3-small) | $5-20/månad |
| **Application Insights** | Övervakning och telemetri | $5-15/månad |
| **Resursgrupp** | Organisation av resurser | Gratis |

### 2. Distribuera Azure-resurser

#### Alternativ A: Automatiserad distribution (Rekommenderas)

```bash
# Navigera till infrastrukturkatalogen
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Distributionsskriptet kommer att:
1. Skapa en unik resursgrupp
2. Distribuera Microsoft Foundry-resurser
3. Distribuera modellen text-embedding-3-small
4. Konfigurera Application Insights
5. Skapa en service principal för autentisering
6. Generera `.env`-fil med konfiguration

#### Alternativ B: Manuell distribution

Om du föredrar manuell kontroll eller om det automatiserade skriptet misslyckas:

```bash
# Sätt variabler
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Skapa resursgrupp
az group create --name $RESOURCE_GROUP --location $LOCATION

# Distribuera huvudmall
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Verifiera Azure-distribution

```bash
# Kontrollera resursgrupp
az group show --name $RESOURCE_GROUP --output table

# Lista distribuerade resurser
az resource list --resource-group $RESOURCE_GROUP --output table

# Testa AI-tjänst
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Konfigurera miljövariabler

Efter distribution ska du ha en `.env`-fil. Kontrollera att den innehåller:

```bash
# .env-fil innehåll
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Databaskonfiguration (för utveckling)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker-miljöuppsättning

### 1. Förstå Docker Composition

Vår utvecklingsmiljö använder Docker Compose:

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

### 2. Starta utvecklingsmiljön

```bash
# Se till att du är i projektets rotmapp
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Starta tjänsterna
docker-compose up -d

# Kontrollera tjänstens status
docker-compose ps

# Visa loggar
docker-compose logs -f
```

### 3. Verifiera databasinställning

```bash
# Anslut till PostgreSQL-behållare
docker-compose exec postgres psql -U postgres -d zava

# Kontrollera databassstruktur
\dt retail.*

# Verifiera exempeldata
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Avsluta PostgreSQL
\q
```

### 4. Testa MCP-server

```bash
# Kontrollera MCP-serverns hälsa
curl http://localhost:8000/health

# Testa grundläggande MCP-endpoint
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code konfiguration

### 1. Konfigurera MCP-integration

Skapa VS Code MCP-konfiguration:

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

### 2. Konfigurera Python-miljö

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

### 3. Testa VS Code-integration

1. **Öppna projektet i VS Code**:
   ```bash
   code .
   ```

2. **Öppna AI Chat**:
   - Tryck `Ctrl+Shift+P` (Windows/Linux) eller `Cmd+Shift+P` (macOS)
   - Skriv "AI Chat" och välj "AI Chat: Open Chat"

3. **Testa MCP-serveranslutning**:
   - I AI Chat, skriv `#zava` och välj en av de konfigurerade servrarna
   - Fråga: "Vilka tabeller finns i databasen?"
   - Du ska få ett svar med en lista över butikens databastabeller

## ✅ Miljövalidering

### 1. Omfattande systemkontroll

Kör detta valideringsskript för att verifiera din installation:

```bash
# Skapa valideringsskript
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
    
    # Kontrollera Python-version
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Kontrollera nödvändiga paket
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Kontrollera Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Kontrollera Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Kontrollera miljövariabler
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
    
    # Kontrollera databasanslutning
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testfråga
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
    
    # Kontrollera MCP-server
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
    
    # Kontrollera Azure AI-tjänst
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Detta kommer att misslyckas om autentiseringsuppgifterna är ogiltiga
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

# Kör validering
python validate_setup.py
```

### 2. Manuellt valideringschecklista

**✅ Grundläggande verktyg**
- [ ] Docker version 20.10+ installerad och igång
- [ ] Azure CLI 2.40+ installerad och autentiserad
- [ ] Python 3.8+ med pip installerad
- [ ] Git 2.30+ installerad
- [ ] VS Code med nödvändiga tillägg

**✅ Azure-resurser**
- [ ] Resursgrupp skapad framgångsrikt
- [ ] AI Foundry-projekt distribuerat
- [ ] OpenAI text-embedding-3-small model distribuerad
- [ ] Application Insights konfigurerad
- [ ] Service principal skapad med rätt behörigheter

**✅ Miljökonfiguration**
- [ ] `.env`-fil skapad med alla nödvändiga variabler
- [ ] Azure-referenser fungerar (testa med `az account show`)
- [ ] PostgreSQL-container körs och är tillgänglig
- [ ] Exempeldata inläst i databasen

**✅ VS Code-integration**
- [ ] `.vscode/mcp.json` konfigurerad
- [ ] Python interpreter inställd på virtuellt miljö
- [ ] MCP-servrar syns i AI Chat
- [ ] Kan köra testfrågor via AI Chat

## 🛠️ Felsökning av vanliga problem

### Docker-problem

**Problem**: Docker-containrar startar inte
```bash
# Kontrollera Docker-tjänstens status
docker info

# Kontrollera tillgängliga resurser
docker system df

# Rensa upp vid behov
docker system prune -f

# Starta om Docker Desktop (Windows/macOS)
# Eller starta om Docker-tjänsten (Linux)
sudo systemctl restart docker
```

**Problem**: PostgreSQL-anslutning misslyckas
```bash
# Kontrollera containerloggar
docker-compose logs postgres

# Verifiera att containern är frisk
docker-compose ps

# Testa direktanslutning
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure-distributionsproblem

**Problem**: Azure-distribution misslyckas
```bash
# Kontrollera Azure CLI-autentisering
az account show

# Verifiera prenumerationsbehörigheter
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Kontrollera registrering av resursleverantör
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Problem**: AI-tjänstautentisering misslyckas
```bash
# Testa serviceprincipal
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Verifiera AI-tjänstdistribution
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python-miljöproblem

**Problem**: Paketinstallation misslyckas
```bash
# Uppgradera pip och setuptools
python -m pip install --upgrade pip setuptools wheel

# Rensa pip-cache
pip cache purge

# Installera paket ett i taget för att identifiera problem
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Problem**: VS Code kan inte hitta Python interpreter
```bash
# Visa Python-tolkens sökvägar
which python  # macOS/Linux
where python  # Windows

# Aktivera virtuellt miljö först
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Öppna sedan VS Code
code .
```

## 🎯 Viktiga punkter

Efter att ha slutfört denna labb bör du ha:

✅ **Komplett utvecklingsmiljö**: Alla verktyg installerade och konfigurerade  
✅ **Azure-resurser distribuerade**: AI-tjänster och stödjande infrastruktur  
✅ **Docker-miljö igång**: PostgreSQL och MCP-servercontainrar  
✅ **VS Code-integration**: MCP-servrar konfigurerade och åtkomliga  
✅ **Verifierad installation**: Alla komponenter testade och fungerar tillsammans  
✅ **Felsökningskunskap**: Vanliga problem och lösningar  

## 🚀 Vad är nästa steg

Med din miljö klar, fortsätt till **[Labb 04: Databasedesign och schema](../04-Database/README.md)** för att:

- Utforska detaljrikedom i retaildatabasens schema
- Förstå multi-tenant datamodellering
- Lära dig om implementering av Row Level Security
- Arbeta med exempeldata från retail

## 📚 Ytterligare resurser

### Utvecklingsverktyg
- [Docker Documentation](https://docs.docker.com/) - Komplett Docker-referens
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/) - Azure CLI-kommandon
- [VS Code Documentation](https://code.visualstudio.com/docs) - Editor-konfiguration och tillägg

### Azure-tjänster
- [Microsoft Foundry Documentation](https://docs.microsoft.com/azure/ai-foundry/) - AI-tjänstekonfiguration
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI-modell distribution
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Övervakningsinställningar

### Python-utveckling
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) - Miljöhantering
- [AsyncIO Documentation](https://docs.python.org/3/library/asyncio.html) - Async programmeringsmönster
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Webb ramverksmönster

---

**Nästa**: Miljön klar? Fortsätt med [Labb 04: Databasedesign och schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfriskrivning**:
Detta dokument har översatts med hjälp av AI-översättningstjänsten [Co-op Translator](https://github.com/Azure/co-op-translator). Även om vi strävar efter noggrannhet, var vänlig notera att automatiska översättningar kan innehålla fel eller brister. Det ursprungliga dokumentet på dess modersmål bör betraktas som den auktoritativa källan. För kritisk information rekommenderas professionell mänsklig översättning. Vi ansvarar inte för några missförstånd eller feltolkningar som uppstår till följd av användningen av denna översättning.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->