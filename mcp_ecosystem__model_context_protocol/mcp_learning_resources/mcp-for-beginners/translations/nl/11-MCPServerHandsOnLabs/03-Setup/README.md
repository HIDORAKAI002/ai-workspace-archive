# Omgevingsinstelling

## 🎯 Wat Deze Lab Behandelt

Deze praktijkgerichte lab begeleidt je bij het instellen van een volledige ontwikkelomgeving voor het bouwen van MCP-servers met PostgreSQL-integratie. Je configureert alle benodigde tools, zet Azure-resources in en valideert je setup voordat je verdergaat met de implementatie.

## Overzicht

Een juiste ontwikkelomgeving is cruciaal voor succesvolle MCP-serverontwikkeling. Deze lab biedt stapsgewijze instructies voor het installeren van Docker, Azure-services, ontwikkeltools en het valideren dat alles correct samenwerkt.

Aan het einde van deze lab heb je een volledig functionele ontwikkelomgeving klaar voor het bouwen van de Zava Retail MCP-server.

## Leerdoelen

Aan het einde van deze lab kun je:

- **Alle benodigde ontwikkeltools installeren en configureren**
- **Azure-resources inzetten** die nodig zijn voor de MCP-server
- **Docker-containers instellen** voor PostgreSQL en de MCP-server
- **Je omgeving valideren** met testverbindingen
- **Veelvoorkomende configuratie- en setupproblemen oplossen**
- **De ontwikkelworkflow en bestandsstructuur begrijpen**

## 📋 Voorvereistencontrole

Zorg ervoor dat je vóór de start beschikt over:

### Vereiste Kennis
- Basiskennis van commandoregel (Windows Command Prompt/PowerShell)
- Begrip van omgevingsvariabelen
- Bekendheid met Git versiebeheer
- Basisconcepten van Docker (containers, images, volumes)

### Systeemeisen
- **Besturingssysteem**: Windows 10/11, macOS of Linux
- **RAM**: Minimaal 8GB (16GB aanbevolen)
- **Opslag**: Minstens 10GB vrije ruimte
- **Netwerk**: Internetverbinding voor downloads en Azure-implementatie

### Accountvereisten
- **Azure-abonnement**: Gratis laag is voldoende
- **GitHub-account**: Voor toegang tot de repository
- **Docker Hub-account**: (Optioneel) Voor het publiceren van aangepaste images

## 🛠️ Tool Installatie

### 1. Docker Desktop Installeren

Docker biedt de containeromgeving voor onze ontwikkelsetup.

#### Windows Installatie

1. **Download Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Installeren en Configureren**:
   - Start de installer als Administrator
   - Schakel WSL 2-integratie in wanneer daarom wordt gevraagd
   - Herstart je computer wanneer de installatie is voltooid

3. **Installatie Verifiëren**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS Installatie

1. **Download en Installeer**:
   ```bash
   # Download van https://desktop.docker.com/mac/stable/Docker.dmg
   # Of gebruik Homebrew
   brew install --cask docker
   ```

2. **Docker Desktop Starten**:
   - Start Docker Desktop vanuit de map Applications
   - Voltooi de eerste setup wizard

3. **Installatie Verifiëren**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux Installatie

1. **Docker Engine Installeren**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Log uit en weer in om groepswijzigingen van kracht te laten worden
   ```

2. **Docker Compose Installeren**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI Installeren

De Azure CLI maakt het mogelijk Azure-resources in te zetten en te beheren.

#### Windows Installatie

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS Installatie

```bash
# Homebrew gebruiken
brew install azure-cli

# Of de installer gebruiken
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux Installatie

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Verifiëren en Authenticeren

```bash
# Controleer installatie
az version

# Log in op Azure
az login

# Stel standaardabonnement in (als u er meerdere heeft)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git Installeren

Git is nodig voor het klonen van de repository en versiebeheer.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git is meestal vooraf geïnstalleerd, maar je kunt het bijwerken via Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. VS Code Installeren

Visual Studio Code biedt de geïntegreerde ontwikkelomgeving met MCP-ondersteuning.

#### Installatie

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Vereiste Extensies

Installeer deze VS Code-extensies:

```bash
# Installeren via de opdrachtregel
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Of installeer via VS Code:
1. Open VS Code
2. Ga naar Extensies (Ctrl+Shift+X)
3. Installeer:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python Installeren

Python 3.8+ is vereist voor MCP-server ontwikkeling.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Homebrew gebruiken
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Installatie Verifiëren

```bash
python --version  # Moet Python 3.11.x tonen
pip --version      # Moet pip-versie tonen
```

## 🚀 Project Setup

### 1. Repository Klonen

```bash
# Kloneer de hoofdrepository
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navigeer naar de projectmap
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Verifieer de structuur van de repository
ls -la
```

### 2. Python Virtuele Omgeving Maken

```bash
# Maak virtuele omgeving aan
python -m venv mcp-env

# Activeer virtuele omgeving
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Upgrade pip
python -m pip install --upgrade pip
```

### 3. Python Dependencies Installeren

```bash
# Installeer ontwikkelingsafhankelijkheden
pip install -r requirements.lock.txt

# Controleer belangrijke pakketten
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure Resource-Implementatie

### 1. Begrijp Resourcebehoeften

Onze MCP-server heeft de volgende Azure-resources nodig:

| **Resource** | **Doel** | **Geschatte Kosten** |
|--------------|----------|----------------------|
| **Microsoft Foundry** | AI modelhosting en -beheer | $10-50/maand |
| **OpenAI Implementatie** | Tekst embedden model (text-embedding-3-small) | $5-20/maand |
| **Application Insights** | Monitoring en telemetrie | $5-15/maand |
| **Resourcegroep** | Resource organisatie | Gratis |

### 2. Azure Resources Implementeren

#### Optie A: Geautomatiseerde Implementatie (Aanbevolen)

```bash
# Navigeer naar de infrastructuurmap
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Het implementatiescript zal:
1. Een unieke resourcegroep aanmaken
2. Microsoft Foundry-resources uitrollen
3. Het text-embedding-3-small model uitrollen
4. Application Insights configureren
5. Een serviceprincipal maken voor authenticatie
6. `.env` bestand genereren met configuratie

#### Optie B: Handmatige Implementatie

Als je liever handmatig controleert of als het geautomatiseerde script faalt:

```bash
# Stel variabelen in
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Maak resourcegroep aan
az group create --name $RESOURCE_GROUP --location $LOCATION

# Implementeer hoofdtemplate
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure-implementatie Verifiëren

```bash
# Controleer resourcegroep
az group show --name $RESOURCE_GROUP --output table

# Lijst van gedeployde resources
az resource list --resource-group $RESOURCE_GROUP --output table

# Test AI-service
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Omgevingsvariabelen Configureren

Na implementatie zou je een `.env` bestand moeten hebben. Controleer of het bevat:

```bash
# Inhoud van het .env-bestand
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Databaseconfiguratie (voor ontwikkeling)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker Omgeving Setup

### 1. Begrijp Docker Composition

Onze ontwikkelomgeving gebruikt Docker Compose:

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

### 2. Start de Ontwikkelomgeving

```bash
# Zorg ervoor dat je in de hoofdmap van het project bent
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Start de services
docker-compose up -d

# Controleer de status van de service
docker-compose ps

# Bekijk logs
docker-compose logs -f
```

### 3. Verifieer Database Setup

```bash
# Verbinden met PostgreSQL-container
docker-compose exec postgres psql -U postgres -d zava

# Controleer database structuur
\dt retail.*

# Controleer voorbeeldgegevens
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Verlaat PostgreSQL
\q
```

### 4. Test MCP Server

```bash
# Controleer de gezondheid van de MCP-server
curl http://localhost:8000/health

# Test de basis MCP-eindpunt
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code Configuratie

### 1. MCP Integratie Configureren

Maak VS Code MCP configuratie:

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

### 2. Python Omgeving Configureren

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

### 3. Test VS Code Integratie

1. **Open het project in VS Code**:
   ```bash
   code .
   ```

2. **Open AI Chat**:
   - Druk op `Ctrl+Shift+P` (Windows/Linux) of `Cmd+Shift+P` (macOS)
   - Typ "AI Chat" en selecteer "AI Chat: Open Chat"

3. **Test MCP Serververbinding**:
   - Typ in AI Chat `#zava` en selecteer een van de geconfigureerde servers
   - Vraag: "Welke tabellen zijn beschikbaar in de database?"
   - Je ontvangt een antwoord met een lijst van de retail database tabellen

## ✅ Omgeving Validatie

### 1. Uitgebreide System Check

Voer dit validatiescript uit om je setup te controleren:

```bash
# Maak validatiescript
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
    
    # Controleer Python-versie
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Controleer vereiste pakketten
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Controleer Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Controleer Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Controleer omgevingsvariabelen
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
    
    # Controleer databaseverbinding
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Test query
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
    
    # Controleer MCP-server
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
    
    # Controleer Azure AI-service
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Dit mislukt als de referenties ongeldig zijn
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

# Voer validatie uit
python validate_setup.py
```

### 2. Handmatige Validatie Checklist

**✅ Basis Tools**
- [ ] Docker versie 20.10+ geïnstalleerd en actief
- [ ] Azure CLI 2.40+ geïnstalleerd en ingelogd
- [ ] Python 3.8+ met pip geïnstalleerd
- [ ] Git 2.30+ geïnstalleerd
- [ ] VS Code met benodigde extensies

**✅ Azure Resources**
- [ ] Resourcegroep succesvol aangemaakt
- [ ] AI Foundry project uitgerold
- [ ] OpenAI text-embedding-3-small model uitgerold
- [ ] Application Insights geconfigureerd
- [ ] Serviceprincipal aangemaakt met juiste permissies

**✅ Omgevingsconfiguratie**
- [ ] `.env` bestand aangemaakt met alle variabelen
- [ ] Azure credentials werken (test met `az account show`)
- [ ] PostgreSQL container draait en is toegankelijk
- [ ] Voorbeelddata geladen in database

**✅ VS Code Integratie**
- [ ] `.vscode/mcp.json` geconfigureerd
- [ ] Python interpreter ingesteld op virtuele omgeving
- [ ] MCP-servers verschijnen in AI Chat
- [ ] Test queries kunnen uitgevoerd worden via AI Chat

## 🛠️ Veelvoorkomende Problemen en Oplossingen

### Docker Problemen

**Probleem**: Docker containers starten niet
```bash
# Controleer de status van de Docker-service
docker info

# Controleer beschikbare bronnen
docker system df

# Opruimen indien nodig
docker system prune -f

# Herstart Docker Desktop (Windows/macOS)
# Of herstart de Docker-service (Linux)
sudo systemctl restart docker
```

**Probleem**: PostgreSQL verbinding mislukt
```bash
# Controleer containerlogboeken
docker-compose logs postgres

# Controleer of container gezond is
docker-compose ps

# Test directe verbinding
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure Implementatie Problemen

**Probleem**: Azure implementatie faalt
```bash
# Controleer Azure CLI-authenticatie
az account show

# Verifieer abonnementstoestemmingen
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Controleer registratie van resourceprovider
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Probleem**: AI service authenticatie faalt
```bash
# Test service-principal
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Verifieer AI-service-implementatie
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python Omgevingsproblemen

**Probleem**: Package-installatie mislukt
```bash
# Upgrade pip en setuptools
python -m pip install --upgrade pip setuptools wheel

# Wis pip-cache
pip cache purge

# Installeer pakketten één voor één om problemen te identificeren
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Probleem**: VS Code kan Python interpreter niet vinden
```bash
# Toon Python-interpreterpaden
which python  # macOS/Linux
where python  # Windows

# Activeer eerst de virtuele omgeving
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Open vervolgens VS Code
code .
```

## 🎯 Belangrijkste Leerpunten

Na het voltooien van deze lab heb je:

✅ **Complete Ontwikkelomgeving**: Alle tools geïnstalleerd en geconfigureerd  
✅ **Azure Resources Uitgerold**: AI-services en ondersteunende infrastructuur  
✅ **Docker Omgeving Draait**: PostgreSQL- en MCP-server containers  
✅ **VS Code Integratie**: MCP-servers geconfigureerd en toegankelijk  
✅ **Setup Gevalideerd**: Alle onderdelen getest en werkend samen  
✅ **Probleemoplossingskennis**: Veelvoorkomende issues en oplossingen  

## 🚀 Wat Nu?

Met je omgeving klaar, ga verder met **[Lab 04: Databaseontwerp en Schema](../04-Database/README.md)** om:

- De retail database schema in detail te verkennen
- Multi-tenant datamodellering te begrijpen
- Werken met Row Level Security implementatie
- Voorbeeld retaildata te gebruiken

## 📚 Aanvullende Bronnen

### Ontwikkeltools
- [Docker Documentatie](https://docs.docker.com/) - Complete Docker referentie
- [Azure CLI Referentie](https://docs.microsoft.com/cli/azure/) - Azure CLI commando's
- [VS Code Documentatie](https://code.visualstudio.com/docs) - Editorconfiguratie en extensies

### Azure Services
- [Microsoft Foundry Documentatie](https://docs.microsoft.com/azure/ai-foundry/) - AI service configuratie
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI model implementatie
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Monitoring setup

### Python Ontwikkeling
- [Python Virtuele Omgevingen](https://docs.python.org/3/tutorial/venv.html) - Omgevingsbeheer
- [AsyncIO Documentatie](https://docs.python.org/3/library/asyncio.html) - Async programmeerpatronen
- [FastAPI Documentatie](https://fastapi.tiangolo.com/) - Webframework patronen

---

**Volgende**: Omgeving klaar? Ga door met [Lab 04: Databaseontwerp en Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dit document is vertaald met behulp van de AI vertaaldienst [Co-op Translator](https://github.com/Azure/co-op-translator). Hoewel we streven naar nauwkeurigheid, dient u er rekening mee te houden dat geautomatiseerde vertalingen fouten of onnauwkeurigheden kunnen bevatten. Het originele document in de oorspronkelijke taal moet worden beschouwd als de gezaghebbende bron. Voor kritieke informatie wordt professionele menselijke vertaling aanbevolen. Wij zijn niet aansprakelijk voor eventuele misverstanden of verkeerde interpretaties die voortvloeien uit het gebruik van deze vertaling.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->