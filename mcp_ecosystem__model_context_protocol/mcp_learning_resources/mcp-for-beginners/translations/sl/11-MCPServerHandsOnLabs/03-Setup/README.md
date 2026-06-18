# Nastavitev okolja

## 🎯 Kaj ta laboratorij zajema

Ta praktični laboratorij vas vodi skozi nastavitev popolnega razvojnega okolja za izdelavo MCP strežnikov z integracijo PostgreSQL. Konfigurirali boste vsa potrebna orodja, namestili Azure vire in preverili svojo nastavitev, preden nadaljujete z implementacijo.

## Pregled

Pravilno razvojno okolje je ključno za uspešen razvoj MCP strežnika. Ta laboratorij ponuja korak za korakom navodila za nastavitev Dockerja, Azure storitev, razvojnih orodij in preverjanje, da vse deluje pravilno skupaj.

Do konca tega laboratorija boste imeli popolnoma funkcionalno razvojno okolje, pripravljeno za izdelavo Zava Retail MCP strežnika.

## Cilji učenja

Do konca tega laboratorija boste lahko:

- **Namestili in konfigurirali** vsa potrebna razvojna orodja  
- **Namestili Azure vire** potrebne za MCP strežnik  
- **Nastavili Docker konteinerje** za PostgreSQL in MCP strežnik  
- **Preverili** svojo nastavitev okolja z testnimi povezavami  
- **Odpravili težave** s pogostimi nastavitvenimi in konfiguracijskimi problemi  
- **Razumeli** razvojni potek in strukturo datotek  

## 📋 Preverjanje predpogojev

Pred začetkom preverite, da imate:

### Potrebno znanje
- Osnovno uporabo ukazne vrstice (Windows Command Prompt/PowerShell)  
- Razumevanje okoljskih spremenljivk  
- Seznanjenost z Git sistemom za upravljanje verzij  
- Osnovne pojme Dockerja (kontejnerji, slike, volumni)  

### Sistemskih zahtev
- **Operacijski sistem**: Windows 10/11, macOS ali Linux  
- **RAM**: Najmanj 8GB (priporočeno 16GB)  
- **Prostor na disku**: Vsaj 10GB prostega prostora  
- **Omrežje**: Internetna povezava za prenos in namestitev Azure virov  

### Zahteve za račun
- **Azure naročnina**: Brezplačni nivo je zadosten  
- **GitHub račun**: Za dostop do repozitorija  
- **Docker Hub račun**: (neobvezno) Za objavo lastnih slik  

## 🛠️ Namestitev orodij

### 1. Namestite Docker Desktop

Docker omogoča kontejnerizirano okolje za našo razvojno setup.

#### Namestitev na Windows

1. **Prenesite Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Namestite in konfigurirajte**:  
   - Zaženite namestitveni program kot Administrator  
   - Omogočite integracijo WSL 2 ko se prikaže poziv  
   - Ponovno zaženite računalnik po zaključku namestitve  

3. **Preverite namestitev**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### Namestitev na macOS

1. **Prenesite in namestite**:  
   ```bash
   # Prenesite z https://desktop.docker.com/mac/stable/Docker.dmg
   # Ali uporabite Homebrew
   brew install --cask docker
   ```
  
2. **Zaženite Docker Desktop**:  
   - Zaženite Docker Desktop iz Aplikacij  
   - Dokončajte začetni čarovnik setupa  

3. **Preverite namestitev**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Namestitev na Linux

1. **Namestite Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Odjavite se in ponovno prijavite, da spremembe skupine začnejo veljati
   ```
  
2. **Namestite Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Namestite Azure CLI

Azure CLI omogoča namestitev in upravljanje Azure virov.

#### Namestitev na Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### Namestitev na macOS

```bash
# Uporaba Homebrew
brew install azure-cli

# Ali uporaba namestitvenega programa
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Namestitev na Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Preverjanje in prijava

```bash
# Preveri namestitev
az version

# Prijava v Azure
az login

# Nastavi privzeto naročnino (če jih imaš več)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Namestite Git

Git je potreben za kloniranje repozitorija in upravljanje verzij.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git je običajno že nameščen, vendar ga lahko posodobite preko Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Namestite VS Code

Visual Studio Code nudi integrirano razvojno okolje z MCP podporo.

#### Namestitev

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Potrebna razširitev

Namestite naslednje VS Code razširitve:

```bash
# Namestitev preko ukazne vrstice
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Ali namestite prek VS Code:  
1. Odprite VS Code  
2. Pojdite na Extensions (Ctrl+Shift+X)  
3. Namestite:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Namestite Python

Python 3.8+ je potreben za razvoj MCP strežnika.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Uporaba Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Preverite namestitev

```bash
python --version  # Mora prikazati Python 3.11.x
pip --version      # Mora prikazati različico pip
```
  
## 🚀 Nastavitev projekta

### 1. Klonirajte repozitorij

```bash
# Klonirajte glavno skladišče
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Pomaknite se v imenik projekta
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Preverite strukturo skladišča
ls -la
```
  
### 2. Ustvarite Python virtualno okolje

```bash
# Ustvari virtualno okolje
python -m venv mcp-env

# Aktiviraj virtualno okolje
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Nadgradi pip
python -m pip install --upgrade pip
```
  
### 3. Namestite Python odvisnosti

```bash
# Namesti razvojne odvisnosti
pip install -r requirements.lock.txt

# Preveri ključne pakete
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Namestitev Azure virov

### 1. Razumevanje potreb po virih

Naš MCP strežnik potrebuje naslednje Azure vire:

| **Vir** | **Namen** | **Ocenjeni stroški** |  
|--------------|-------------|-------------------|  
| **Microsoft Foundry** | Gostovanje in upravljanje AI modelov | 10-50 $/mesec |  
| **OpenAI Namestitev** | Model za vdelavo besedila (text-embedding-3-small) | 5-20 $/mesec |  
| **Application Insights** | Nadzor in telemetrija | 5-15 $/mesec |  
| **Resource Group** | Organizacija virov | Brezplačno |  

### 2. Namestite Azure vire

#### Možnost A: Avtomatizirana namestitev (priporočeno)

```bash
# Pojdi v imenik infrastrukture
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Namestitveni skript bo:  
1. Ustvaril unikatno skupino virov  
2. Namestil Microsoft Foundry vire  
3. Namestil model text-embedding-3-small  
4. Konfiguriral Application Insights  
5. Ustvaril servisnega glavnega uporabnika za avtentikacijo  
6. Generiral `.env` datoteko s konfiguracijo  

#### Možnost B: Ročna namestitev

Če želite ročno kontrolo ali avtomatizirani skript ne uspe:

```bash
# Nastavi spremenljivke
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Ustvari skupino virov
az group create --name $RESOURCE_GROUP --location $LOCATION

# Namesti glavno predlogo
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Preverite namestitev Azure virov

```bash
# Preveri skupino virov
az group show --name $RESOURCE_GROUP --output table

# Naštej nameščene vire
az resource list --resource-group $RESOURCE_GROUP --output table

# Preizkusi AI storitev
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Konfigurirajte okoljske spremenljivke

Po namestitvi preverite, da imate `.env` datoteko, ki vsebuje:

```bash
# Vsebina datoteke .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Konfiguracija baze podatkov (za razvoj)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Nastavitev Docker okolja

### 1. Razumevanje Docker Compose

Naše razvojno okolje uporablja Docker Compose:

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
  
### 2. Zaženite razvojno okolje

```bash
# Prepričajte se, da ste v korenski mapi projekta
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Zaženite storitve
docker-compose up -d

# Preverite status storitev
docker-compose ps

# Prikaz dnevnikov
docker-compose logs -f
```
  
### 3. Preverite nastavitve baze podatkov

```bash
# Poveži se na PostgreSQL vsebnik
docker-compose exec postgres psql -U postgres -d zava

# Preveri strukturo baze podatkov
\dt retail.*

# Preveri vzorčne podatke
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Izhod iz PostgreSQL
\q
```
  
### 4. Preizkusite MCP strežnik

```bash
# Preveri zdravje MCP strežnika
curl http://localhost:8000/health

# Preizkusi osnovno MCP točko dostopa
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 Konfiguracija VS Code

### 1. Konfigurirajte MCP integracijo

Ustvarite MCP konfiguracijo v VS Code:

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
  
### 2. Konfigurirajte Python okolje

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
  
### 3. Preizkusite integracijo VS Code

1. **Odprite projekt v VS Code**:  
   ```bash
   code .
   ```
  
2. **Odprite AI Chat**:  
   - Pritisnite `Ctrl+Shift+P` (Windows/Linux) ali `Cmd+Shift+P` (macOS)  
   - Vtipkajte "AI Chat" in izberite "AI Chat: Open Chat"  

3. **Preizkusite povezavo z MCP strežnikom**:  
   - V AI Chatu vtipkajte `#zava` in izberite enega izmed konfiguriranih strežnikov  
   - Vprašajte: "Katere tabele so na voljo v podatkovni bazi?"  
   - Prejeli bi morali odgovor s seznamom tabel v maloprodajni bazi  

## ✅ Preverjanje okolja

### 1. Celovit sistemski pregled

Zaženite ta validacijski skript za preverjanje vaše nastavitve:

```bash
# Ustvari skripto za preverjanje
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
    
    # Preveri različico Pythona
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Preveri zahtevane pakete
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Preveri Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Preveri Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Preveri spremenljivke okolja
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
    
    # Preveri povezavo do baze podatkov
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testiraj poizvedbo
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
    
    # Preveri MCP strežnik
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
    
    # Preveri Azure AI storitev
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # To bo spodletelo, če so poverilnice neveljavne
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

# Zaženi preverjanje
python validate_setup.py
```
  
### 2. Ročni kontrolni seznam

**✅ Osnovna orodja**  
- [ ] Docker različica 20.10+ nameščena in zagnana  
- [ ] Azure CLI 2.40+ nameščen in prijavljen  
- [ ] Python 3.8+ s pip nameščen  
- [ ] Git 2.30+ nameščen  
- [ ] VS Code s potrebnimi razširitvami  

**✅ Azure viri**  
- [ ] Skupina virov uspešno ustvarjena  
- [ ] Projekt AI Foundry nameščen  
- [ ] Model OpenAI text-embedding-3-small nameščen  
- [ ] Application Insights konfiguriran  
- [ ] Servisni glavni uporabnik ustvarjen z ustreznimi dovoljenji  

**✅ Konfiguracija okolja**  
- [ ] `.env` datoteka ustvarjena z vsemi potrebnimi spremenljivkami  
- [ ] Azure poverilnice delujejo (preverite z `az account show`)  
- [ ] PostgreSQL kontejner teče in je dostopen  
- [ ] V bazo naloženi testni podatki  

**✅ Integracija z VS Code**  
- [ ] `.vscode/mcp.json` konfiguriran  
- [ ] Python interpreter nastavljen na virtualno okolje  
- [ ] MCP strežniki se prikažejo v AI Chat  
- [ ] Možnost izvajanja testnih poizvedb skozi AI Chat  

## 🛠️ Odpravljanje pogostih težav

### Težave z Dockerjem

**Težava**: Docker kontejnerji se ne zaženejo  
```bash
# Preveri stanje storitve Docker
docker info

# Preveri razpoložljive vire
docker system df

# Očisti, če je potrebno
docker system prune -f

# Ponovno zaženi Docker Desktop (Windows/macOS)
# Ali ponovno zaženi storitev Docker (Linux)
sudo systemctl restart docker
```
  
**Težava**: Povezava s PostgreSQL ne uspe  
```bash
# Preveri dnevniške datoteke vsebnika
docker-compose logs postgres

# Preveri, ali je vsebnik zdrav
docker-compose ps

# Preizkusi neposredno povezavo
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Težave pri namestitvi Azure

**Težava**: Namestitev Azure ne uspe  
```bash
# Preveri overjanje Azure CLI
az account show

# Preveri dovoljenja naročnine
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Preveri registracijo ponudnika virov
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Težava**: Avtentikacija AI storitve ne uspe  
```bash
# Preizkus službenega predstavnika
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Preverite namestitev AI storitve
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Težave s Python okoljem

**Težava**: Namestitev paketov ne uspe  
```bash
# Nadgradite pip in setuptools
python -m pip install --upgrade pip setuptools wheel

# Počistite predpomnilnik pip
pip cache purge

# Namestite pakete enega za drugim, da identificirate težave
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Težava**: VS Code ne najde Python interpreterja  
```bash
# Prikaži poti do Python interpreterja
which python  # macOS/Linux
where python  # Windows

# Najprej aktiviraj virtualno okolje
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Nato odpri VS Code
code .
```
  
## 🎯 Ključne ugotovitve

Po zaključku tega laboratorija bi morali imeti:

✅ **Popolno razvojno okolje**: Vsa orodja nameščena in konfigurirana  
✅ **Namestitev Azure virov**: AI storitve in podpornainfrastruktura  
✅ **Docker okolje v delovanju**: PostgreSQL in MCP strežniški konteinerji  
✅ **Integracija z VS Code**: MCP strežniki konfigurirani in dostopni  
✅ **Preverjena nastavitev**: Vsi sestavni deli testirani in delujoči skupaj  
✅ **Znanje za odpravljanje težav**: Pogoste težave in rešitve  

## 🚀 Kaj sledi

Z okoljem pripravljenim nadaljujte v **[Lab 04: Database Design and Schema](../04-Database/README.md)**, da:

- Podrobno raziščete shemo prodajne baze podatkov  
- Razumete modeliranje več najemnikov  
- Spoznate implementacijo varnosti na ravni vrstic (Row Level Security)  
- Delate s primeri maloprodajnih podatkov  

## 📚 Dodatni viri

### Razvojna orodja
- [Docker Dokumentacija](https://docs.docker.com/) - Popolna referenca Dockerja  
- [Azure CLI Referenca](https://docs.microsoft.com/cli/azure/) - Ukazi Azure CLI  
- [VS Code Dokumentacija](https://code.visualstudio.com/docs) - Konfiguracija urejevalnika in razširitve  

### Azure storitve
- [Microsoft Foundry Dokumentacija](https://docs.microsoft.com/azure/ai-foundry/) - Konfiguracija AI storitev  
- [Azure OpenAI Storitev](https://docs.microsoft.com/azure/cognitive-services/openai/) - Namestitev AI modelov  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Nastavitev nadzora  

### Python razvoj
- [Python Virtualna okolja](https://docs.python.org/3/tutorial/venv.html) - Upravljanje okolij  
- [AsyncIO Dokumentacija](https://docs.python.org/3/library/asyncio.html) - Vzorci asinhronega programiranja  
- [FastAPI Dokumentacija](https://fastapi.tiangolo.com/) - Vzorci spletnih okvirov  

---

**Naprej**: Okolje pripravljeno? Nadaljujte z [Lab 04: Database Design and Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Omejitev odgovornosti**:
Ta dokument je bil preveden z uporabo AI prevajalske storitve [Co-op Translator](https://github.com/Azure/co-op-translator). Čeprav si prizadevamo za natančnost, vas prosimo, da upoštevate, da avtomatizirani prevodi lahko vsebujejo napake ali netočnosti. Izvirni dokument v njegovem izvirnem jeziku je treba obravnavati kot avtoritativni vir. Za kritične informacije je priporočljiv strokovni človeški prevod. Ne odgovarjamo za morebitna nesporazume ali napačne interpretacije, ki izhajajo iz uporabe tega prevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->