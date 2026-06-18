# Ympäristön asennus

## 🎯 Mitä tämä harjoitus kattaa

Tässä käytännön harjoituksessa käydään läpi täydellisen kehitysympäristön asentaminen MCP-palvelinten rakentamista varten PostgreSQL-integraatiolla. Määrität kaikki tarvittavat työkalut, otat käyttöön Azure-resursseja ja varmistat asennuksesi ennen jatkamista toteutukseen.

## Yleiskatsaus

Asianmukainen kehitysympäristö on ratkaisevan tärkeä onnistuneelle MCP-palvelimen kehitykselle. Tässä harjoituksessa annetaan vaiheittaiset ohjeet Dockerin, Azure-palveluiden, kehitystyökalujen asentamiseen ja toimivuuden varmistamiseen.

Harjoituksen lopussa sinulla on täysin toimiva kehitysympäristö Zava Retail MCP -palvelimen rakentamista varten.

## Oppimistavoitteet

Harjoituksen lopussa osaat:

- **Asentaa ja konfiguroida** kaikki vaaditut kehitystyökalut  
- **Ottaa käyttöön Azure-resursseja** MCP-palvelinta varten  
- **Perustaa Docker-kontit** PostgreSQL:lle ja MCP-palvelimelle  
- **Varmistaa** ympäristön asetukset testiyhteyksillä  
- **Ratkaista** yleisiä asennus- ja konfiguraatio-ongelmia  
- **Ymmärtää** kehitysprosessin ja tiedostorakenteen  

## 📋 Esivalmistelutarkastus

Ennen aloittamista varmista, että sinulla on:

### Tarvittavat tiedot
- Peruskäyttö komentorivillä (Windows Command Prompt/PowerShell)  
- Ympäristömuuttujien ymmärrys  
- Git-versionhallinnan tuntemus  
- Perustiedot Dockerista (kontit, kuvat, volyymit)  

### Järjestelmävaatimukset
- **Käyttöjärjestelmä**: Windows 10/11, macOS tai Linux  
- **Muisti**: Vähintään 8 GB (suositus 16 GB)  
- **Tallennustila**: Vähintään 10 GB vapaata tilaa  
- **Verkko**: Internet-yhteys latauksia ja Azure-julkaisuja varten  

### Tilivaatimukset
- **Azure-tilaus**: Ilmainen taso riittää  
- **GitHub-tili**: Repositorion käyttöä varten  
- **Docker Hub -tili**: (valinnainen) Mukautettujen kuvien julkaisua varten  

## 🛠️ Työkalujen asennus

### 1. Asenna Docker Desktop

Docker tarjoaa konttien ympäristön kehitykseen.

#### Windows-asennus

1. **Lataa Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Asenna ja konfiguroi**:
   - Suorita asennusohjelma järjestelmänvalvojana  
   - Salli WSL 2 -integrointi pyydettäessä  
   - Käynnistä tietokone uudelleen asennuksen valmistuttua  

3. **Varmista asennus**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS-asennus

1. **Lataa ja asenna**:
   ```bash
   # Lataa osoitteesta https://desktop.docker.com/mac/stable/Docker.dmg
   # Tai käytä Homebrew'ta
   brew install --cask docker
   ```

2. **Käynnistä Docker Desktop**:
   - Avaa Docker Desktop Sovelluksista  
   - Suorita alkuasetusten ohjattu toiminto  

3. **Varmista asennus**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux-asennus

1. **Asenna Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Kirjaudu ulos ja takaisin sisään, jotta ryhmämuutokset tulevat voimaan
   ```

2. **Asenna Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Asenna Azure CLI

Azure CLI mahdollistaa Azure-resurssien hallinnan ja käyttöönoton.

#### Windows-asennus

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS-asennus

```bash
# Käyttämällä Homebrew'ta
brew install azure-cli

# Tai käyttämällä asennusohjelmaa
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux-asennus

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Varmista ja kirjaudu sisään

```bash
# Tarkista asennus
az version

# Kirjaudu Azureen
az login

# Aseta oletustilaus (jos sinulla on useita)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Asenna Git

Git tarvitaan repositorion kloonaamiseen ja versionhallintaan.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git on yleensä esiasennettu, mutta voit päivittää sen Homebrewin kautta
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Asenna VS Code

Visual Studio Code tarjoaa integroidun kehitysympäristön MCP-tuen kanssa.

#### Asennus

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Vaaditut laajennukset

Asenna nämä VS Code -laajennukset:

```bash
# Asenna komentorivin kautta
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Tai asenna VS Code -sisäisesti:  
1. Avaa VS Code  
2. Mene Laajennuksiin (Ctrl+Shift+X)  
3. Asenna:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Asenna Python

Python 3.8+ vaaditaan MCP-palvelinten kehitykseen.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Homebrewiä käyttäen
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Varmista asennus

```bash
python --version  # Pitäisi näyttää Python 3.11.x
pip --version      # Pitäisi näyttää pip-version
```

## 🚀 Projektin asennus

### 1. Kloonaa repositorio

```bash
# Kloonaa päävarasto
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Siirry projektihakemistoon
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Varmista varastorakenne
ls -la
```

### 2. Luo Python-virtuaaliympäristö

```bash
# Luo virtuaaliympäristö
python -m venv mcp-env

# Aktivoi virtuaaliympäristö
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Päivitä pip
python -m pip install --upgrade pip
```

### 3. Asenna Python-riippuvuudet

```bash
# Asenna kehitykseen liittyvät riippuvuudet
pip install -r requirements.lock.txt

# Varmista tärkeät paketit
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azuren resurssien käyttöönotto

### 1. Ymmärrä resurssivaatimukset

MCP-palvelin tarvitsee seuraavat Azure-resurssit:

| **Resurssi** | **Tarkoitus** | **Arvioitu hinta** |
|--------------|---------------|--------------------|
| **Microsoft Foundry** | AI-mallien ylläpito ja hallinta | 10-50 $/kk |
| **OpenAI-julkaisu** | Tekstien upotusmalli (text-embedding-3-small) | 5-20 $/kk |
| **Application Insights** | Seuranta ja telemetria | 5-15 $/kk |
| **Resurssiryhmä** | Resurssien organisointi | Ilmainen |

### 2. Ota Azure-resurssit käyttöön

#### Vaihtoehto A: Automaattinen käyttöönotto (suositeltu)

```bash
# Siirry infrastruktuurihakemistoon
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Julkaisu skripti tekee seuraavaa:  
1. Luo uniikin resurssiryhmän  
2. Julkaisee Microsoft Foundry -resurssit  
3. Julkaisee text-embedding-3-small -mallin  
4. Konfiguroi Application Insightsin  
5. Luopu palveluperustajan (service principal) todennusta varten  
6. Luo `.env`-tiedoston konfiguraatiolla  

#### Vaihtoehto B: Manuaalinen käyttöönotto

Jos haluat hallita manuaalisesti tai automaattinen skripti epäonnistuu:

```bash
# Aseta muuttujat
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Luo resurssiryhmä
az group create --name $RESOURCE_GROUP --location $LOCATION

# Ota päätason malli käyttöön
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Varmista Azuren käyttöönotto

```bash
# Tarkista resurssiryhmä
az group show --name $RESOURCE_GROUP --output table

# Listaa käyttöönotetut resurssit
az resource list --resource-group $RESOURCE_GROUP --output table

# Testaa tekoälypalvelu
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Määritä ympäristömuuttujat

Projektin julkaisun jälkeen sinulla pitäisi olla `.env`-tiedosto. Varmista, että siinä on:

```bash
# .env-tiedoston sisältö
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Tietokannan asetukset (kehitystä varten)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker-ympäristön asennus

### 1. Ymmärrä Docker Compose

Kehitysympäristö toimii Docker Composella:

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

### 2. Käynnistä kehitysympäristö

```bash
# Varmista, että olet projektin juurihakemistossa
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Käynnistä palvelut
docker-compose up -d

# Tarkista palvelun tila
docker-compose ps

# Katso lokit
docker-compose logs -f
```

### 3. Varmista tietokannan asennus

```bash
# Yhdistä PostgreSQL-konttiin
docker-compose exec postgres psql -U postgres -d zava

# Tarkista tietokannan rakenne
\dt retail.*

# Vahvista esimerkkitiedot
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Poistu PostgreSQL:stä
\q
```

### 4. Testaa MCP-palvelin

```bash
# Tarkista MCP-palvelimen tila
curl http://localhost:8000/health

# Testaa perus MCP-päätepiste
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code -konfiguraatio

### 1. Määritä MCP-integraatio

Luo VS Code MCP -konfiguraatio:

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

### 2. Määritä Python-ympäristö

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

### 3. Testaa VS Code -integraatio

1. **Avaa projekti VS Codessa**:
   ```bash
   code .
   ```

2. **Avaa AI Chat**:
   - Paina `Ctrl+Shift+P` (Windows/Linux) tai `Cmd+Shift+P` (macOS)  
   - Kirjoita "AI Chat" ja valitse "AI Chat: Open Chat"  

3. **Testaa MCP-palvelimen yhteys**:  
   - AI Chatissa kirjoita `#zava` ja valitse yksi konfiguroiduista palvelimista  
   - Kysy: "Mitkä taulut ovat tietokannassa saatavilla?"  
   - Saat vastauksen, joka listaa vähittäiskaupan tietokannan taulut  

## ✅ Ympäristön validointi

### 1. Kokonaisvaltainen järjestelmän tarkistus

Suorita tämä validointiskripti varmistaaksesi asennuksesi:

```bash
# Luo validointiskripti
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
    
    # Tarkista Pythonin versio
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Tarkista vaaditut paketit
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Tarkista Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Tarkista Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Tarkista ympäristömuuttujat
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
    
    # Tarkista tietokantayhteys
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testikysely
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
    
    # Tarkista MCP-palvelin
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
    
    # Tarkista Azure AI -palvelu
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Tämä epäonnistuu, jos tunnistetiedot ovat virheelliset
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

# Suorita validointi
python validate_setup.py
```

### 2. Manuaalinen tarkistuslista

**✅ Perustyökalut**  
- [ ] Docker versio 20.10+ asennettuna ja käynnissä  
- [ ] Azure CLI 2.40+ asennettuna ja kirjautuneena sisään  
- [ ] Python 3.8+ pipillä asennettuna  
- [ ] Git 2.30+ asennettuna  
- [ ] VS Code ja vaaditut laajennukset  

**✅ Azure-resurssit**  
- [ ] Resurssiryhmä luotu onnistuneesti  
- [ ] AI Foundry -projekti julkaistu  
- [ ] OpenAI text-embedding-3-small -malli julkaistu  
- [ ] Application Insights konfiguroitu  
- [ ] Palveluperustaja luotu oikeilla käyttöoikeuksilla  

**✅ Ympäristökonfiguraatio**  
- [ ] `.env`-tiedosto luotu kaikilla vaadituilla muuttujilla  
- [ ] Azure-tunnukset toimivat (testaa `az account show`)  
- [ ] PostgreSQL-kontti käynnissä ja saavutettavissa  
- [ ] Esimerkkidata ladattu tietokantaan  

**✅ VS Code -integraatio**  
- [ ] `.vscode/mcp.json` konfiguroitu  
- [ ] Python-tulkki asetettu virtuaaliympäristöön  
- [ ] MCP-palvelimet näkyvät AI Chatissa  
- [ ] Voit suorittaa testikyselyitä AI Chatin kautta  

## 🛠️ Yleisiä ongelmia ja ratkaisuja

### Docker-ongelmat

**Ongelma**: Docker-kontit eivät käynnisty  
```bash
# Tarkista Docker-palvelun tila
docker info

# Tarkista käytettävissä olevat resurssit
docker system df

# Siivoa tarvittaessa
docker system prune -f

# Käynnistä Docker Desktop uudelleen (Windows/macOS)
# Tai käynnistä Docker-palvelu uudelleen (Linux)
sudo systemctl restart docker
```

**Ongelma**: PostgreSQL-yhteys epäonnistuu  
```bash
# Tarkista säiliön lokit
docker-compose logs postgres

# Varmista, että säiliö on toimintakunnossa
docker-compose ps

# Testaa suora yhteys
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure-julkaisun ongelmat

**Ongelma**: Azuren julkaisu epäonnistuu  
```bash
# Tarkista Azure CLI -todentaminen
az account show

# Vahvista tilauksen oikeudet
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Tarkista resurssipalveluntarjoajan rekisteröinti
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Ongelma**: AI-palvelun todennus epäonnistuu  
```bash
# Testaa palveluperiaate
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Vahvista tekoälypalvelun käyttöönotto
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python-ympäristön ongelmat

**Ongelma**: Paketin asennus epäonnistuu  
```bash
# Päivitä pip ja setuptools
python -m pip install --upgrade pip setuptools wheel

# Tyhjennä pip-välimuisti
pip cache purge

# Asenna paketit yksitellen ongelmien tunnistamiseksi
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Ongelma**: VS Code ei löydä Python-tulkinta  
```bash
# Näytä Python-tulkinta polut
which python  # macOS/Linux
where python  # Windows

# Aktivoi virtuaaliympäristö ensin
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Avaa sitten VS Code
code .
```

## 🎯 Tärkeimmät huomioitavat asiat

Harjoituksen suorittamisen jälkeen sinulla pitäisi olla:

✅ **Täydellinen kehitysympäristö**: Kaikki työkalut asennettu ja konfiguroitu  
✅ **Azure-resurssit julkaistu**: AI-palvelut ja tukiinfrastruktuuri  
✅ **Docker-ympäristö käynnissä**: PostgreSQL ja MCP-palvelinkontit  
✅ **VS Code -integraatio**: MCP-palvelimet konfiguroitu ja käytettävissä  
✅ **Validointitulokset**: Kaikki osat testattu ja toimivat yhdessä  
✅ **Vianmääritystieto**: Yleiset ongelmat ja ratkaisut  

## 🚀 Mitä seuraavaksi

Kun ympäristö on valmis, jatka tehtävään **[Lab 04: Tietokannan suunnittelu ja skeema](../04-Database/README.md)**, jossa:

- Tutustut vähittäiskaupan tietokantarkenteeseen yksityiskohtaisesti  
- Ymmärrät monivuokraajaympäristön tietomallin  
- Opit rivitason turvallisuuden toteutuksen  
- Harjoittelet käytännön vähittäiskaupan datan kanssa  

## 📚 Lisäresursseja

### Kehitystyökalut
- [Docker-dokumentaatio](https://docs.docker.com/) – Täydellinen Docker-opas  
- [Azure CLI -viite](https://docs.microsoft.com/cli/azure/) – Azure CLI -komennot  
- [VS Code -dokumentaatio](https://code.visualstudio.com/docs) – Editorin konfigurointi ja laajennukset  

### Azure-palvelut
- [Microsoft Foundryn dokumentaatio](https://docs.microsoft.com/azure/ai-foundry/) – AI-palvelun konfigurointi  
- [Azure OpenAI -palvelu](https://docs.microsoft.com/azure/cognitive-services/openai/) – AI-mallin julkaisu  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) – Seurannan asetukset  

### Python-kehitys
- [Pythonin virtuaaliympäristöt](https://docs.python.org/3/tutorial/venv.html) – Ympäristön hallinta  
- [AsyncIO-dokumentaatio](https://docs.python.org/3/library/asyncio.html) – Asynkronisen ohjelmoinnin mallit  
- [FastAPI-dokumentaatio](https://fastapi.tiangolo.com/) – Web-kehysmallit  

---

**Seuraava**: Ympäristö valmiina? Jatka tehtävään [Lab 04: Tietokannan suunnittelu ja skeema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vastuuvapauslauseke**:
Tämä asiakirja on käännetty käyttämällä tekoälypohjaista käännöspalvelua [Co-op Translator](https://github.com/Azure/co-op-translator). Vaikka pyrimme tarkkuuteen, otathan huomioon, että automaattiset käännökset saattavat sisältää virheitä tai epätarkkuuksia. Alkuperäinen asiakirja sen alkuperäiskielellä on virallinen lähde. Tärkeissä asioissa suositellaan ammattimaista ihmiskäännöstä. Emme ole vastuussa tämän käännöksen käytöstä aiheutuvista väärinymmärryksistä tai tulkinnoista.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->