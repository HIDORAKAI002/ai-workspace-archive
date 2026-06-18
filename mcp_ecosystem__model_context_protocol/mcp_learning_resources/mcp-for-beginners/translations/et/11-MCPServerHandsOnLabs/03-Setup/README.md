# Keskkonna seadistamine

## 🎯 Mida see labor hõlmab

See praktiline labor juhendab sind läbi täieliku arenduskeskkonna seadistamise MCP serverite loomise jaoks PostgreSQL integratsiooniga. Sa seadistad kõik vajalikud tööriistad, juurutad Azure ressursid ja valideerid oma seadistuse enne teostamisega jätkamist.

## Ülevaade

Õige arenduskeskkond on MCP serveri edukaks arendamiseks ülioluline. See labor annab samm-sammult juhised Docker'i, Azure teenuste, arendustööriistade seadistamiseks ja kinnitab, et kõik töötab koos korrektselt.

Selle labori lõpuks on sul täielikult töökorras arenduskeskkond valmis Zava Retail MCP serveri ehitamiseks.

## Õpieesmärgid

Selle labori lõpuks suudad sa:

- **Paigaldada ja seadistada** kõik vajalikud arendustööriistad
- **Juurutada Azure ressursid**, mida MCP server vajab
- **Seadistada Docker konteinerid** PostgreSQL ja MCP serveri jaoks
- **Valideerida** oma keskkonna seadistust testühendustega
- **Tõrkeotsingut teha** levinumate seadistamis- ja konfiguratsiooniprobleemide puhul
- **Mõista** arendustöövoogu ja failistruktuuri

## 📋 Eeldused

Enne alustamist veendu, et sul on olemas:

### Vajalikud teadmised
- Baasteadmised käsurea kasutamisest (Windows Command Prompt/PowerShell)
- Keskkonnamuutujate mõistmine
- Git versioonihalduse tundmine
- Algtõed Dockerist (konteinerid, pildid, mahud)

### Süsteeminõuded
- **Operatsioonisüsteem**: Windows 10/11, macOS või Linux
- **RAM**: Vähemalt 8GB (soovitatav 16GB)
- **Salvestusruum**: Vähemalt 10GB vaba ruumi
- **Võrk**: Internetiühendus allalaadimiste ja Azure juurutuse jaoks

### Konto nõuded
- **Azure tellimus**: Tasuta tasand on piisav
- **GitHub konto**: Koodihoidla ligipääsuks
- **Docker Hub konto**: (Valikuline) Kohandatud piltide avaldamiseks

## 🛠️ Tööriistade paigaldus

### 1. Paigalda Docker Desktop

Docker tagab konteineripõhise keskkonna meie arendusprotsessis.

#### Windowsi paigaldus

1. **Laadi alla Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Paigalda ja seadista**:
   - Käivita installiprogramm administraatorina
   - Luba WSL 2 integratsioon, kui süsteem küsib
   - Taaskäivita arvuti pärast installi lõpetamist

3. **Kontrolli paigaldust**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS paigaldus

1. **Laadi alla ja paigalda**:
   ```bash
   # Laadi alla aadressilt https://desktop.docker.com/mac/stable/Docker.dmg
   # Või kasuta Homebrewi
   brew install --cask docker
   ```

2. **Käivita Docker Desktop**:
   - Ava Docker Desktop rakendustest
   - Lõpeta esimene seadistusviisard

3. **Kontrolli paigaldust**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linuxi paigaldus

1. **Paigalda Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Grupimuudatuste jõustumiseks logi välja ja uuesti sisse
   ```

2. **Paigalda Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Paigalda Azure CLI

Azure CLI võimaldab Azure ressursside juurutamist ja haldust.

#### Windowsi paigaldus

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS paigaldus

```bash
# Homebrew kasutamine
brew install azure-cli

# Või installeerija kasutamine
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linuxi paigaldus

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Kontrolli ja autentimine

```bash
# Kontrolli paigaldust
az version

# Logi sisse Azure'i
az login

# Sea vaikimisi tellimus (kui sul on mitu)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Paigalda Git

Git on vajalik hoidla kloonimiseks ja versioonihalduseks.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git on tavaliselt eelinstallitud, kuid saate seda uuendada Homebrew kaudu
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Paigalda VS Code

Visual Studio Code annab meie arenduskeskkonna ja MCP toe.

#### Paigaldus

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Vajalikud laiendused

Paigalda need VS Code laiendused:

```bash
# Paigalda käsurea kaudu
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Või paigalda läbi VS Code:
1. Ava VS Code
2. Mine laienduste sektsiooni (Ctrl+Shift+X)
3. Paigalda:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Paigalda Python

Python 3.8+ on MCP serveri arendamiseks vajalik.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Homebrewi kasutamine
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Kontrolli paigaldust

```bash
python --version  # Peaks näitama Python 3.11.x
pip --version      # Peaks näitama pip versiooni
```

## 🚀 Projekti seadistamine

### 1. Klooni hoidlasse

```bash
# Kopeeri peamine hoidla
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Liigu projekti kataloogi
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Kontrolli hoidla struktuuri
ls -la
```

### 2. Loo Python virtuaalne keskkond

```bash
# Loo virtuaalne keskkond
python -m venv mcp-env

# Aktiveeri virtuaalne keskkond
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Uuenda pip
python -m pip install --upgrade pip
```

### 3. Paigalda Python sõltuvused

```bash
# Paigalda arendus-sõltuvused
pip install -r requirements.lock.txt

# Kontrolli põhikomplekte
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure ressursside juurutus

### 1. Mõista ressursi nõudeid

Meie MCP server vajab järgmisi Azure ressursse:

| **Ressurss** | **Eesmärk** | **Eeldatav hind** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI mudelite majutamine ja haldus | 10–50 $/kuus |
| **OpenAI juurutus** | Teksti sisse-võtva mudeli (text-embedding-3-small) juurutus | 5–20 $/kuus |
| **Application Insights** | Järelevalve ja telemeetria | 5–15 $/kuus |
| **Resource Group** | Ressursside organiseerimine | Tasuta |

### 2. Juuruta Azure ressursid

#### Variant A: Automatiseeritud juurutus (soovitatav)

```bash
# Liigu infrastruktuuri kataloogi
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Juurutus skript teeb järgnevat:
1. Loob unikaalse ressursigrupi
2. Juurutab Microsoft Foundry ressursid
3. Juurutab text-embedding-3-small mudeli
4. Seadistab Application Insights
5. Loob teenusepeapunkti autentimiseks
6. Genereerib `.env` faili konfiguratsiooniga

#### Variant B: Käsitsi juurutus

Kui soovid käsitsi kontrolli või automatiseeritud skript ebaõnnestub:

```bash
# Määra muutujad
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Loo ressursigrupp
az group create --name $RESOURCE_GROUP --location $LOCATION

# Paigalda peamine mall
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Kontrolli Azure juurutust

```bash
# Kontrolli ressursigruppi
az group show --name $RESOURCE_GROUP --output table

# Loendi paigaldatud ressursid
az resource list --resource-group $RESOURCE_GROUP --output table

# Testi AI teenust
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Konfigureeri keskkonnamuutujad

Pärast juurutust peaks sul olema `.env` fail. Kontrolli, et see sisaldab:

```bash
# .env faili sisu
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Andmebaasi konfiguratsioon (arenduseks)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker keskkonna seadistamine

### 1. Mõista Docker Compose'i struktuuri

Meie arenduskeskkond kasutab Docker Compose'i:

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

### 2. Käivita arenduskeskkond

```bash
# Veendu, et oled projekti juurkataloogis
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Käivita teenused
docker-compose up -d

# Kontrolli teenuse staatust
docker-compose ps

# Vaata logisid
docker-compose logs -f
```

### 3. Kontrolli andmebaasi seadistust

```bash
# Ühendu PostgreSQL konteineriga
docker-compose exec postgres psql -U postgres -d zava

# Kontrolli andmebaasi struktuuri
\dt retail.*

# Kinnita näidisandmed
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Välju PostgreSQL-st
\q
```

### 4. Testi MCP serverit

```bash
# Kontrolli MCP serveri tervist
curl http://localhost:8000/health

# Testi põhikomplekti MCP lõpp-punkti
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code konfiguratsioon

### 1. Seadista MCP integratsioon

Loo VS Code MCP konfiguratsioon:

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

### 2. Seadista Python keskkond

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

### 3. Testi VS Code integratsiooni

1. **Ava projekt VS Code's**:
   ```bash
   code .
   ```

2. **Ava AI Chat**:
   - Vajuta `Ctrl+Shift+P` (Windows/Linux) või `Cmd+Shift+P` (macOS)
   - Kirjuta "AI Chat" ja vali "AI Chat: Open Chat"

3. **Testi MCP serveriga ühendust**:
   - AI Chatis kirjuta `#zava` ja vali üks konfigureeritud serveritest
   - Küsi: „Millised tabelid andmebaasis saadaval on?“
   - Sa peaksid saama vastuse ja nimekirja jaekaubanduse andmebaasi tabelitest

## ✅ Keskkonna valideerimine

### 1. Ulatuslik süsteemikontroll

Käivita see valideerimisskript, et kontrollida oma seadistust:

```bash
# Loo valideerimisskript
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
    
    # Kontrolli Python'i versiooni
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Kontrolli nõutud pakette
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Kontrolli Dockerit
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Kontrolli Azure CLI-d
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Kontrolli keskkonnamuutujaid
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
    
    # Kontrolli andmebaasi ühendust
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testi päringut
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
    
    # Kontrolli MCP serverit
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
    
    # Kontrolli Azure AI teenust
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # See ebaõnnestub, kui mandaadid on vigased
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

# Käivita valideerimine
python validate_setup.py
```

### 2. Käsitsi valideerimise kontrollnimekiri

**✅ Põhitööriistad**
- [ ] Docker versioon 20.10+ paigaldatud ja töötamas
- [ ] Azure CLI 2.40+ paigaldatud ja autentitud
- [ ] Python 3.8+ koos pip'iga paigaldatud
- [ ] Git 2.30+ paigaldatud
- [ ] VS Code koos vajalike laiendustega

**✅ Azure ressursid**
- [ ] Ressursigrupp edukalt loodud
- [ ] AI Foundry projekt juurutatud
- [ ] OpenAI text-embedding-3-small mudel juurutatud
- [ ] Application Insights seadistatud
- [ ] Teenusepeapunkt õigete õigustega loodud

**✅ Keskkonna konfiguratsioon**
- [ ] `.env` fail loodud koos kõigi nõutud muutujatega
- [ ] Azure autentimisandmed töökorras (testi `az account show`-ga)
- [ ] PostgreSQL konteiner käivitatud ja ligipääsetav
- [ ] Andmebaasi on laetud näidandmed

**✅ VS Code integratsioon**
- [ ] `.vscode/mcp.json` konfigureeritud
- [ ] Python tõlgendaja seatud virtuaalkeskkonda
- [ ] MCP serverid olemas AI Chatis
- [ ] Testpäringute sooritamine AI Chati kaudu toimib

## 🛠️ Levinumate probleemide lahendamine

### Dockeriga seotud probleemid

**Probleem**: Docker konteinerid ei käivitu
```bash
# Kontrolli Docker teenuse olekut
docker info

# Kontrolli saadaolevaid ressursse
docker system df

# Puhasta vajadusel
docker system prune -f

# Taaskäivita Docker Desktop (Windows/macOS)
# Või taaskäivita Docker teenus (Linux)
sudo systemctl restart docker
```

**Probleem**: PostgreSQL ühendus ebaõnnestub
```bash
# Kontrolli konteineri logisid
docker-compose logs postgres

# Kontrolli konteineri tervislikkust
docker-compose ps

# Testi otsest ühendust
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure juurutusprobleemid

**Probleem**: Azure juurutus ebaõnnestub
```bash
# Kontrolli Azure CLI autentimist
az account show

# Kontrolli tellimuse õigusi
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Kontrolli ressursi pakkuja registreerimist
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Probleem**: AI teenuse autentimine ebaõnnestub
```bash
# Testi teenuse põhimõtet
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Kontrolli tehisintellekti teenuse juurutamist
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python keskkonna probleemid

**Probleem**: Paketi paigaldus ebaõnnestub
```bash
# Uuenda pipi ja setuptoolsi
python -m pip install --upgrade pip setuptools wheel

# Tühjenda pipi vahemälu
pip cache purge

# Paigalda paketid ükshaaval, et tuvastada probleeme
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Probleem**: VS Code ei leia Python tõlgendajat
```bash
# Näita Python interpreteri teid
which python  # macOS/Linux
where python  # Windows

# Aktiveeri esmalt virtuaalne keskkond
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Seejärel ava VS Code
code .
```

## 🎯 Peamised järeldused

Pärast selle labori lõpetamist peaks sul olema:

✅ **Täielik arenduskeskkond**: kõik tööriistad paigaldatud ja seadistatud  
✅ **Azure ressursid juurutatud**: AI teenused ja toetav infrastruktuur  
✅ **Docker keskkond töötab**: PostgreSQL ja MCP serveri konteinerid  
✅ **VS Code integratsioon**: MCP serverid konfigureeritud ja ligipääsetavad  
✅ **Valideeritud seadistus**: kõik komponendid testitud ja üheskoos toimivad  
✅ **Tõrkeotsingu teadmised**: levinumad probleemid ja lahendused  

## 🚀 Mis järgmiseks

Kui su keskkond on valmis, jätka **[Labor 04: Andmebaasi kujundus ja skeem](../04-Database/README.md)**, et:

- Uurida jaekaubanduse andmebaasi skeemi põhjalikult
- Mõista mitme rendi andmete modelleerimist
- Õppida reali tasandi turvalisuse rakendamist
- Töötada näidandmetega jaekaubanduses

## 📚 Lisamaterjalid

### Arendustööriistad
- [Docker dokumentatsioon](https://docs.docker.com/) - Täielik Docker'i viide
- [Azure CLI viide](https://docs.microsoft.com/cli/azure/) - Azure CLI käsud
- [VS Code dokumentatsioon](https://code.visualstudio.com/docs) - Redaktori konfiguratsioon ja laiendused

### Azure teenused
- [Microsoft Foundry dokumentatsioon](https://docs.microsoft.com/azure/ai-foundry/) - AI teenuse konfiguratsioon
- [Azure OpenAI teenus](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI mudelite juurutus
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Järelevalve seadistamine

### Python arendus
- [Python virtuaalkeskkonnad](https://docs.python.org/3/tutorial/venv.html) - Keskkonna haldus
- [AsyncIO dokumentatsioon](https://docs.python.org/3/library/asyncio.html) - Asünkroonse programmeerimise mustrid
- [FastAPI dokumentatsioon](https://fastapi.tiangolo.com/) - Veebiraamistiku mustrid

---

**Järgmiseks**: Keskkond valmis? Jätka [Labor 04: Andmebaasi kujundus ja skeem](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Lahtiütlus**:
See dokument on tõlgitud kasutades AI tõlketeenust [Co-op Translator](https://github.com/Azure/co-op-translator). Kuigi me püüdleme täpsuse poole, palun pange tähele, et automatiseeritud tõlgetes võib esineda vigu või ebatäpsusi. Originaaldokument selle emakeeles tuleks pidada autoriteetseks allikaks. Olulise teabe puhul soovitatakse kasutada professionaalset inimtõlget. Me ei vastuta selle tõlkega seotud eksimustest või valesti mõistmistest.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->