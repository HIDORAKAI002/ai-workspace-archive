# Miljøoppsett

## 🎯 Hva dette laboratoriet dekker

Dette praktiske laboratoriet guider deg gjennom å sette opp et komplett utviklingsmiljø for å bygge MCP-servere med PostgreSQL-integrasjon. Du vil konfigurere alle nødvendige verktøy, distribuere Azure-ressurser og validere oppsettet ditt før du går videre med implementering.

## Oversikt

Et riktig utviklingsmiljø er avgjørende for suksessfull MCP-serverutvikling. Dette laboratoriet gir trinnvise instruksjoner for å sette opp Docker, Azure-tjenester, utviklingsverktøy og validere at alt fungerer riktig sammen.

Ved slutten av dette laboratoriet vil du ha et fullt fungerende utviklingsmiljø klart til å bygge Zava Retail MCP-serveren.

## Læringsmål

Ved slutten av dette laboratoriet vil du kunne:

- **Installere og konfigurere** alle nødvendige utviklingsverktøy  
- **Distribuere Azure-ressurser** som trengs for MCP-serveren  
- **Sette opp Docker-containere** for PostgreSQL og MCP-serveren  
- **Validere** miljøoppsettet ditt med testtilkoblinger  
- **Feilsøke** vanlige oppsettproblemer og konfigurasjonsproblemer  
- **Forstå** utviklingsarbeidsflyten og filstrukturen  

## 📋 Forutsetninger

Før du starter, sørg for at du har:

### Nødvendig kunnskap
- Grunnleggende bruk av kommandolinje (Windows Command Prompt/PowerShell)  
- Forståelse av miljøvariabler  
- Kjennskap til Git versjonskontroll  
- Grunnleggende Docker-konsepter (containere, bilder, volum)  

### Systemkrav
- **Operativsystem**: Windows 10/11, macOS eller Linux  
- **RAM**: Minimum 8GB (16GB anbefalt)  
- **Lagring**: Minst 10GB ledig plass  
- **Nettverk**: Internettforbindelse for nedlastinger og Azure-distribusjon  

### Kontokrav
- **Azure-abonnement**: Gratisnivå er tilstrekkelig  
- **GitHub-konto**: For tilgang til depot  
- **Docker Hub-konto**: (Valgfritt) For publisering av egne bilder  

## 🛠️ Verktøyinstallasjon

### 1. Installer Docker Desktop

Docker gir den containeriserte miljøet for vårt utviklingsoppsett.

#### Windows-installasjon

1. **Last ned Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Installer og konfigurer**:  
   - Kjør installasjonsprogrammet som administrator  
   - Aktiver WSL 2-integrasjon når du blir spurt  
   - Start datamaskinen på nytt når installasjonen er ferdig  

3. **Verifiser installasjonen**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### macOS-installasjon

1. **Last ned og installer**:  
   ```bash
   # Last ned fra https://desktop.docker.com/mac/stable/Docker.dmg
   # Eller bruk Homebrew
   brew install --cask docker
   ```
  
2. **Start Docker Desktop**:  
   - Åpne Docker Desktop fra Programmer  
   - Fullfør veiviseren for første oppstart  

3. **Verifiser installasjonen**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Linux-installasjon

1. **Installer Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Logg ut og inn igjen for at gruppeendringer skal tre i kraft
   ```
  
2. **Installer Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Installer Azure CLI

Azure CLI muliggjør distribusjon og administrasjon av Azure-ressurser.

#### Windows-installasjon

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### macOS-installasjon

```bash
# Bruke Homebrew
brew install azure-cli

# Eller bruke installasjonsprogrammet
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Linux-installasjon

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Verifiser og autentiser

```bash
# Sjekk installasjonen
az version

# Logg inn på Azure
az login

# Sett standardabonnement (hvis du har flere)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Installer Git

Git er nødvendig for å klone depotet og versjonskontroll.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git er vanligvis forhåndsinstallert, men du kan oppdatere via Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Installer VS Code

Visual Studio Code gir det integrerte utviklingsmiljøet med MCP-støtte.

#### Installasjon

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Nødvendige utvidelser

Installer disse VS Code-utvidelsene:

```bash
# Installer via kommandolinje
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Eller installer via VS Code:  
1. Åpne VS Code  
2. Gå til Utvidelser (Ctrl+Shift+X)  
3. Installer:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Installer Python

Python 3.8+ kreves for MCP-serverutvikling.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Bruke Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Verifiser installasjonen

```bash
python --version  # Skal vise Python 3.11.x
pip --version      # Skal vise pip-versjon
```
  
## 🚀 Prosjektoppsett

### 1. Klon depotet

```bash
# Klon hovedrepoet
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Gå til prosjektmappen
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Bekreft repositorie-strukturen
ls -la
```
  
### 2. Opprett Python virtuelt miljø

```bash
# Opprett virtuelt miljø
python -m venv mcp-env

# Aktiver virtuelt miljø
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Oppgrader pip
python -m pip install --upgrade pip
```
  
### 3. Installer Python-avhengigheter

```bash
# Installer utviklingsavhengigheter
pip install -r requirements.lock.txt

# Verifiser nøkkelpakker
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Azure-ressursdistribusjon

### 1. Forstå ressurskravene

Vår MCP-server trenger disse Azure-ressursene:

| **Ressurs** | **Formål** | **Estimert kostnad** |
|-------------|------------|---------------------|
| **Microsoft Foundry** | Hosting og styring av AI-modeller | $10-50/måned |
| **OpenAI Deployment** | Tekst-embedding modell (text-embedding-3-small) | $5-20/måned |
| **Application Insights** | Overvåking og telemetri | $5-15/måned |
| **Resource Group** | Organisering av ressurser | Gratis |

### 2. Distribuer Azure-ressurser

#### Alternativ A: Automatisk distribusjon (anbefalt)

```bash
# Naviger til infrastrukturkatalogen
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Distribusjonsskriptet vil:  
1. Opprette en unik ressursgruppe  
2. Deplisere Microsoft Foundry-ressurser  
3. Deplisere text-embedding-3-small modellen  
4. Konfigurere Application Insights  
5. Opprette en tjenesteprinsipp for autentisering  
6. Generere `.env`-fil med konfigurasjon  

#### Alternativ B: Manuell distribusjon

Hvis du foretrekker manuell kontroll eller det automatiske skriptet feiler:

```bash
# Sett variabler
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Opprett ressursgruppe
az group create --name $RESOURCE_GROUP --location $LOCATION

# Distribuer hovedmal
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Verifiser Azure-distribusjon

```bash
# Sjekk ressursgruppe
az group show --name $RESOURCE_GROUP --output table

# List distribuerte ressurser
az resource list --resource-group $RESOURCE_GROUP --output table

# Test AI-tjeneste
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Konfigurer miljøvariabler

Etter distribusjon skal du ha en `.env`-fil. Verifiser at den inneholder:

```bash
# Innhold i .env-filen
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Databasekonfigurasjon (for utvikling)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Docker miljøoppsett

### 1. Forstå Docker Compose

Utviklingsmiljøet vårt bruker Docker Compose:

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
  
### 2. Start utviklingsmiljøet

```bash
# Sørg for at du er i prosjektets rotmappe
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Start tjenestene
docker-compose up -d

# Sjekk tjenestens status
docker-compose ps

# Se på logger
docker-compose logs -f
```
  
### 3. Verifiser databaseoppsett

```bash
# Koble til PostgreSQL-beholder
docker-compose exec postgres psql -U postgres -d zava

# Sjekk databasestruktur
\dt retail.*

# Verifiser eksempeldata
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Avslutt PostgreSQL
\q
```
  
### 4. Test MCP-server

```bash
# Sjekk MCP-serverens helse
curl http://localhost:8000/health

# Test grunnleggende MCP-endepunkt
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 VS Code-konfigurasjon

### 1. Konfigurer MCP-integrasjon

Lag VS Code MCP-konfigurasjon:

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
  
### 2. Konfigurer Python-miljø

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
  
### 3. Test VS Code-integrasjon

1. **Åpne prosjektet i VS Code**:  
   ```bash
   code .
   ```
  
2. **Åpne AI Chat**:  
   - Trykk `Ctrl+Shift+P` (Windows/Linux) eller `Cmd+Shift+P` (macOS)  
   - Skriv "AI Chat" og velg "AI Chat: Open Chat"  

3. **Test MCP-servertilkobling**:  
   - I AI Chat, skriv `#zava` og velg en av de konfigurerte serverne  
   - Spør: "Hvilke tabeller er tilgjengelige i databasen?"  
   - Du skal motta et svar med en liste over butikkdatabasens tabeller  

## ✅ Validering av miljø

### 1. Omfattende systemkontroll

Kjør dette valideringsskriptet for å verifisere oppsettet:

```bash
# Lag valideringsskript
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
    
    # Sjekk Python-versjon
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Sjekk nødvendige pakker
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Sjekk Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Sjekk Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Sjekk miljøvariabler
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
    
    # Sjekk databaseforbindelse
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Test spørring
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
    
    # Sjekk MCP-server
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
    
    # Sjekk Azure AI-tjeneste
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Dette vil feile hvis legitimasjon er ugyldig
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

# Kjør validering
python validate_setup.py
```
  
### 2. Manuell valideringsliste

**✅ Grunnleggende verktøy**  
- [ ] Docker versjon 20.10+ installert og kjører  
- [ ] Azure CLI 2.40+ installert og autentisert  
- [ ] Python 3.8+ med pip installert  
- [ ] Git 2.30+ installert  
- [ ] VS Code med nødvendige utvidelser  

**✅ Azure-ressurser**  
- [ ] Ressursgruppe opprettet vellykket  
- [ ] AI Foundry-prosjekt distribuert  
- [ ] OpenAI text-embedding-3-small modell distribuert  
- [ ] Application Insights konfigurert  
- [ ] Tjenesteprinsipp opprettet med riktige tillatelser  

**✅ Miljøkonfigurasjon**  
- [ ] `.env`-fil opprettet med alle nødvendige variabler  
- [ ] Azure-legitimasjon fungerer (test med `az account show`)  
- [ ] PostgreSQL-container kjører og er tilgjengelig  
- [ ] Eksempeldata lastet inn i databasen  

**✅ VS Code-integrasjon**  
- [ ] `.vscode/mcp.json` konfigurert  
- [ ] Python-interpreter satt til virtuelt miljø  
- [ ] MCP-servere vises i AI Chat  
- [ ] Kan kjøre testspørringer gjennom AI Chat  

## 🛠️ Feilsøking av vanlige problemer

### Docker-problemer

**Problem**: Docker-containere starter ikke  
```bash
# Sjekk status for Docker-tjenesten
docker info

# Sjekk tilgjengelige ressurser
docker system df

# Rydd opp om nødvendig
docker system prune -f

# Start Docker Desktop på nytt (Windows/macOS)
# Eller start Docker-tjenesten på nytt (Linux)
sudo systemctl restart docker
```
  
**Problem**: PostgreSQL-tilkobling feiler  
```bash
# Sjekk containerlogger
docker-compose logs postgres

# Verifiser at containeren er sunn
docker-compose ps

# Test direkte tilkobling
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Azure distribusjonsproblemer

**Problem**: Azure-distribusjon feiler  
```bash
# Sjekk Azure CLI-autentisering
az account show

# Bekreft abonnementstillatelser
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Sjekk registrering av ressurstilbyder
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Problem**: AI-tjeneste autentisering feiler  
```bash
# Test tjenesteprinsipp
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Verifiser distribusjon av AI-tjeneste
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Python miljøproblemer

**Problem**: Pakkedistribusjon feiler  
```bash
# Oppgrader pip og setuptools
python -m pip install --upgrade pip setuptools wheel

# Tøm pip-bufferen
pip cache purge

# Installer pakker én etter én for å identifisere problemer
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Problem**: VS Code finner ikke Python-interpreter  
```bash
# Vis Python-tolkerstier
which python  # macOS/Linux
where python  # Windows

# Aktiver virtuelt miljø først
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Åpne deretter VS Code
code .
```
  
## 🎯 Viktige punkter

Etter å ha fullført dette laboratoriet, bør du ha:

✅ **Komplett utviklingsmiljø**: Alle verktøy installert og konfigurert  
✅ **Azure-ressurser distribuert**: AI-tjenester og støttende infrastruktur  
✅ **Docker-miljø kjørende**: PostgreSQL og MCP-servercontainere  
✅ **VS Code-integrasjon**: MCP-servere konfigurert og tilgjengelige  
✅ **Validerte oppsett**: Alle komponenter testet og fungerer sammen  
✅ **Feilsøkingskunnskap**: Vanlige problemer og løsninger  

## 🚀 Hva nå?

Med miljøet klart, fortsett til **[Lab 04: Database Design and Schema](../04-Database/README.md)** for å:

- Utforske butikkdatabaseskjemaet i detalj  
- Forstå flertenant datamodellering  
- Lære om implementering av Row Level Security  
- Jobbe med eksempeldata for detaljhandel  

## 📚 Tilleggsressurser

### Utviklingsverktøy  
- [Docker Documentation](https://docs.docker.com/) - Fullstendig Docker-referanse  
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/) - Azure CLI-kommandoer  
- [VS Code Documentation](https://code.visualstudio.com/docs) - Editor-konfigurasjon og utvidelser  

### Azure-tjenester  
- [Microsoft Foundry Documentation](https://docs.microsoft.com/azure/ai-foundry/) - AI-tjenestekonfigurasjon  
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - Distribusjon av AI-modeller  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Overvåkingsoppsett  

### Python utvikling  
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) - Miljøhåndtering  
- [AsyncIO Documentation](https://docs.python.org/3/library/asyncio.html) - Async programmeringsmønstre  
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Web-rammeverkmønstre  

---

**Neste**: Miljø klart? Fortsett med [Lab 04: Database Design and Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Ansvarsfraskrivelse**:
Dette dokumentet er oversatt ved hjelp av AI-oversettelsestjenesten [Co-op Translator](https://github.com/Azure/co-op-translator). Selv om vi streber etter nøyaktighet, vær oppmerksom på at automatiske oversettelser kan inneholde feil eller unøyaktigheter. Det opprinnelige dokumentet på originalspråket skal betraktes som den autoritative kilden. For kritisk informasjon anbefales profesjonell menneskelig oversettelse. Vi er ikke ansvarlige for eventuelle misforståelser eller feiltolkninger som oppstår ved bruk av denne oversettelsen.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->