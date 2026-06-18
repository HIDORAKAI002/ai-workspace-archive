# Aplinkos paruošimas

## 🎯 Ko apima šis laboratorinis darbas

Šis praktinis laboratorinis darbas nukreips, kaip susikurti pilnai paruoštą vystymo aplinką MCP serverių kūrimui su PostgreSQL integracija. Sužinosite, kaip sukonfigūruoti visas reikalingas priemones, diegti Azure išteklius ir patikrinti savo aplinką prieš pradedant diegimą.

## Apžvalga

Teisinga vystymo aplinka yra esminė sėkmingam MCP serverių kūrimui. Ši laboratorija pateikia išsamias instrukcijas, kaip paruošti Docker, Azure paslaugas, vystymo įrankius ir patikrinti, ar viskas veikia teisingai kartu.

Po šios laboratorijos turėsite pilnai funkcionuojančią vystymo aplinką, pasiruošusią kurti Zava Retail MCP serverį.

## Mokymosi tikslai

Šios laboratorijos pabaigoje galėsite:

- **Įdiegti ir sukonfigūruoti** visus reikalingus vystymo įrankius  
- **Įdiegti Azure išteklius**, reikalingus MCP serveriui  
- **Paruošti Docker konteinerius** PostgreSQL ir MCP serveriui  
- **Patikrinti** aplinkos paruošimą testiniais prisijungimais  
- **Spręsti** dažniausias paruošimo problemas ir konfigūracijos nesklandumus  
- **Suprasti** vystymo eigą ir failų struktūrą  

## 📋 Prieš pradžią – ko reikia

Prieš pradedant, įsitikinkite, kad turite:

### Reikalingos žinios
- Pagrindų darbas su komandine eilute (Windows Command Prompt/PowerShell)  
- Aplinkos kintamųjų supratimas  
- Git versijų valdymo pagrindai  
- Pagrindinės Docker sąvokos (konteineriai, atvaizdai, apimtys)  

### Sistemos reikalavimai
- **Operacinė sistema**: Windows 10/11, macOS arba Linux  
- **RAM**: ne mažiau kaip 8GB (rekomenduojama 16GB)  
- **Atmintis**: bent 10GB laisvos vietos  
- **Tinklas**: interneto ryšys atsisiuntimams ir Azure diegimui  

### Paskyros reikalavimai
- **Azure prenumerata**: pakanka laisvos pakopos  
- **GitHub paskyra**: prieigai prie saugyklos  
- **Docker Hub paskyra**: (neprivaloma) skirtas custom atvaizdų talpinimui  

## 🛠️ Įrankių diegimas

### 1. Įdiekite Docker Desktop

Docker suteikia konteinerizuotą aplinką mūsų vystymui.

#### Windows diegimas

1. **Atsisiųskite Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Įdiekite ir sukonfigūruokite:**  
   - Paleiskite diegimo programą kaip Administratorius  
   - Įjunkite WSL 2 integraciją, kai bus prašoma  
   - Baigus diegimą perkraukite kompiuterį  

3. **Patikrinkite diegimą:**  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### macOS diegimas

1. **Atsisiųskite ir įdiekite:**  
   ```bash
   # Atsisiųskite iš https://desktop.docker.com/mac/stable/Docker.dmg
   # Arba naudokite Homebrew
   brew install --cask docker
   ```
  
2. **Paleiskite Docker Desktop:**  
   - Atidarykite Docker Desktop iš Applications  
   - Užbaikite pradines nustatymų instrukcijas  

3. **Patikrinkite diegimą:**  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Linux diegimas

1. **Įdiekite Docker Engine:**  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Atsijunkite ir prisijunkite iš naujo, kad grupių pakeitimai įsigaliotų
   ```
  
2. **Įdiekite Docker Compose:**  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Įdiekite Azure CLI

Azure CLI leidžia diegti ir valdyti Azure išteklius.

#### Windows diegimas

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### macOS diegimas

```bash
# Naudojant Homebrew
brew install azure-cli

# Arba naudojant diegimo programą
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Linux diegimas

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Patikrinimas ir autorizacija

```bash
# Patikrinkite diegimą
az version

# Prisijunkite prie Azure
az login

# Nustatykite numatytąją prenumeratą (jei turite kelias)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Įdiekite Git

Git reikalingas saugyklos klonavimui ir versijų kontrolei.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git įprastai būna iš anksto įdiegtas, bet galite atnaujinti per Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Įdiekite VS Code

Visual Studio Code suteikia integruotą vystymo aplinką su MCP palaikymu.

#### Diegimas

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Reikalingi papildiniai

Įdiekite šiuos VS Code papildinius:

```bash
# Įdiegti per komandų eilutę
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Arba įdiekite per VS Code:  
1. Atidarykite VS Code  
2. Eikite į Extensions (Ctrl+Shift+X)  
3. Įdiekite:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Įdiekite Python

Python 3.8+ reikalingas MCP serverių vystymui.

#### Windows  

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS  

```bash
# Naudojant Homebrew
brew install python@3.11
```
  
#### Linux  

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Patikrinkite diegimą  

```bash
python --version  # Turėtų rodyti Python 3.11.x
pip --version      # Turėtų rodyti pip versiją
```
  
## 🚀 Projekto paruošimas

### 1. Nuklonuokite saugyklą

```bash
# Nukopijuokite pagrindinį saugyklą
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Pereikite į projekto katalogą
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Patikrinkite saugyklos struktūrą
ls -la
```
  
### 2. Sukurkite Python virtualią aplinką

```bash
# Sukurti virtualią aplinką
python -m venv mcp-env

# Aktyvuoti virtualią aplinką
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Atnaujinti pip
python -m pip install --upgrade pip
```
  
### 3. Įdiekite Python priklausomybes

```bash
# Įdiekite kūrimo priklausomybes
pip install -r requirements.lock.txt

# Patikrinkite pagrindines paketas
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Azure išteklių diegimas

### 1. Supraskite išteklių reikalavimus

Mūsų MCP serveriui reikalingi šie Azure ištekliai:

| **Išteklius**       | **Paskirtis**                   | **Numatoma kaina**  |
|---------------------|--------------------------------|---------------------|
| **Microsoft Foundry**| AI modelių talpinimas ir valdymas | 10–50 USD/mėn      |
| **OpenAI diegimas**  | Teksto įterpimų modelis (text-embedding-3-small) | 5–20 USD/mėn       |
| **Application Insights** | Stebėjimas ir telemetrija        | 5–15 USD/mėn        |
| **Resource Group**   | Išteklių organizavimas          | Nemokama            |

### 2. Įdiekite Azure išteklius

#### A variantas: automatizuotas diegimas (rekomenduojama)

```bash
# Eikite į infrastruktūros katalogą
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Šis diegimo skriptas atliks:  
1. Sukurs unikalią resursų grupę  
2. Įdiegs Microsoft Foundry išteklius  
3. Įdiegs text-embedding-3-small modelį  
4. Sukonfigūruos Application Insights  
5. Sukurs paslaugų principalą autentifikacijai  
6. Sugeneruos `.env` failą su konfigūracija  

#### B variantas: rankinis diegimas

Jei norite rankinės kontrolės arba automatizuotas skriptas nepavyksta:

```bash
# Nustatyti kintamuosius
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Sukurti išteklių grupę
az group create --name $RESOURCE_GROUP --location $LOCATION

# Įdiegti pagrindinį šabloną
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Patikrinkite Azure diegimą

```bash
# Patikrinkite išteklių grupę
az group show --name $RESOURCE_GROUP --output table

# Išvardinkite įdiegtus išteklius
az resource list --resource-group $RESOURCE_GROUP --output table

# Išbandykite DI paslaugą
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Konfigūruokite aplinkos kintamuosius

Po diegimo turėtumėte turėti `.env` failą. Patikrinkite, ar jame yra:

```bash
# .env failo turinys
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Duomenų bazės konfigūracija (plėtrai)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Docker aplinkos paruošimas

### 1. Supraskite Docker Compose struktūrą

Mūsų vystymo aplinka naudoja Docker Compose:

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
  
### 2. Paleiskite vystymo aplinką

```bash
# Įsitikinkite, kad esate projekto šakninėje direktorijoje
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Paleiskite paslaugas
docker-compose up -d

# Patikrinkite paslaugų būseną
docker-compose ps

# Peržiūrėkite žurnalus
docker-compose logs -f
```
  
### 3. Patikrinkite duomenų bazės paruošimą

```bash
# Prisijungti prie PostgreSQL konteinerio
docker-compose exec postgres psql -U postgres -d zava

# Patikrinti duomenų bazės struktūrą
\dt retail.*

# Patvirtinti pavyzdinius duomenis
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Išeiti iš PostgreSQL
\q
```
  
### 4. Išbandykite MCP serverį

```bash
# Patikrinti MCP serverio būklę
curl http://localhost:8000/health

# Patikrinti pagrindinį MCP tašką
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 VS Code konfigūracija

### 1. Konfigūruokite MCP integraciją

Sukurkite VS Code MCP konfigūraciją:

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
  
### 2. Konfigūruokite Python aplinką

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
  
### 3. Išbandykite VS Code integraciją

1. **Atidarykite projektą VS Code:**  
   ```bash
   code .
   ```
  
2. **Atidarykite AI pokalbį:**  
   - Paspauskite `Ctrl+Shift+P` (Windows/Linux) arba `Cmd+Shift+P` (macOS)  
   - Įveskite „AI Chat“ ir pasirinkite „AI Chat: Open Chat“  

3. **Išbandykite MCP serverio ryšį:**  
   - AI pokalbyje įveskite `#zava` ir pasirinkite vieną iš sukonfigūruotų serverių  
   - Paklauskite: „Kokios lentelės prieinamos duomenų bazėje?“  
   - Turėtumėte gauti atsakymą su mažmeninės prekybos duomenų bazės lentelių sąrašu  

## ✅ Aplinkos patikra

### 1. Išsami sistemos patikra

Paleiskite šį validacijos skriptą, kad patikrintumėte aplinką:

```bash
# Sukurti validacijos skriptą
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
    
    # Patikrinti Python versiją
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Patikrinti reikalingas paketas
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Patikrinti Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Patikrinti Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Patikrinti aplinkos kintamuosius
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
    
    # Patikrinti duomenų bazės ryšį
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Paleisti užklausos testą
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
    
    # Patikrinti MCP serverį
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
    
    # Patikrinti Azure AI paslaugą
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Nepavyks, jei kredencialai neteisingi
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

# Paleisti validaciją
python validate_setup.py
```
  
### 2. Rankinis patikrinimo sąrašas

**✅ Pagrindiniai įrankiai**  
- [ ] Įdiegta ir veikia Docker 20.10+ versija  
- [ ] Įdiegta ir autentifikuota Azure CLI 2.40+ versija  
- [ ] Įdiegta Python 3.8+ su pip  
- [ ] Įdiegta Git 2.30+ versija  
- [ ] VS Code su reikalingais papildiniais  

**✅ Azure ištekliai**  
- [ ] Resursų grupė sėkmingai sukurta  
- [ ] AI Foundry projektas įdiegtas  
- [ ] OpenAI text-embedding-3-small modelis įdiegtas  
- [ ] Application Insights sukonfigūruotas  
- [ ] Paslaugų principalas sukurtas su tinkamomis teisėmis  

**✅ Aplinkos konfigūracija**  
- [ ] Sukurtas `.env` failas su visais reikalingais kintamaisiais  
- [ ] Azure kredencialai veikia (patikrinkite `az account show`)  
- [ ] Paleistas ir pasiekiamas PostgreSQL konteineris  
- [ ] Duomenų bazėje įkelti pavyzdiniai duomenys  

**✅ VS Code integracija**  
- [ ] Sukonfigūruotas `.vscode/mcp.json` failas  
- [ ] Python interpretuojamas iš virtualios aplinkos  
- [ ] MCP serveriai matomi AI pokalbyje  
- [ ] Galima vykdyti testinius užklausimus per AI Chat  

## 🛠️ Dažnos problemos ir jų sprendimai

### Docker problemos

**Problema**: Docker konteineriai nepaleidžiami  
```bash
# Patikrinkite Docker paslaugos būseną
docker info

# Patikrinkite turimus išteklius
docker system df

# Išvalykite, jei reikia
docker system prune -f

# Perkraukite Docker Desktop (Windows/macOS)
# Arba perkraukite Docker paslaugą (Linux)
sudo systemctl restart docker
```
  
**Problema**: Nepavyksta prisijungti prie PostgreSQL  
```bash
# Patikrinkite konteinerio žurnalus
docker-compose logs postgres

# Patvirtinkite, kad konteineris yra sveikas
docker-compose ps

# Išbandykite tiesioginį ryšį
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Azure diegimo problemos

**Problema**: Nepavyksta įdiegti Azure išteklių  
```bash
# Patikrinkite Azure CLI autentifikaciją
az account show

# Patikrinkite prenumeratos teises
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Patikrinkite ištekliaus tiekėjo registraciją
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Problema**: AI paslaugos autentifikacija nepavyksta  
```bash
# Išbandyti paslaugų pagrindą
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Patikrinti DI paslaugos diegimą
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Python aplinkos problemos

**Problema**: Nepavyksta įdiegti paketus  
```bash
# Atnaujinti pip ir setuptools
python -m pip install --upgrade pip setuptools wheel

# Išvalyti pip talpyklą
pip cache purge

# Įdiegti paketus po vieną, kad būtų galima nustatyti problemas
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Problema**: VS Code neranda Python interpretuotojo  
```bash
# Rodyti Python interpretatoriaus kelius
which python  # macOS/Linux
where python  # Windows

# Pirmiausia suaktyvinkite virtualią aplinką
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Tada atidarykite VS Code
code .
```
  
## 🎯 Pagrindinės įžvalgos

Atlikus šį laboratorinį darbą turėtumėte turėti:

✅ **Pilną vystymo aplinką**: visi įrankiai įdiegti ir sukonfigūruoti  
✅ **Įdiegti Azure ištekliai**: AI paslaugos ir infrastruktūra  
✅ **Veikianti Docker aplinka**: PostgreSQL ir MCP serverio konteineriai  
✅ **VS Code integracija**: MCP serveriai sukonfigūruoti ir pasiekiami  
✅ **Patvirtinta aplinka**: visi komponentai išbandyti ir veikia kartu  
✅ **Žinias problemų sprendimui**: dažniausios problemos ir jų sprendimai  

## 🚀 Kas toliau

Turėdami paruoštą aplinką, tęskite su **[Laboratorija 04: Duomenų bazės dizainas ir schema](../04-Database/README.md)**, kur:

- Išsamiai nagrinėsite mažmeninės prekybos duomenų bazės schemą  
- Suprasite daugiaplanių duomenų modeliavimą  
- Sužinosite apie eilutės lygmens saugumą (Row Level Security)  
- Dirbsite su pavyzdiniais mažmeninės prekybos duomenimis  

## 📚 Papildomi ištekliai

### Vystymo įrankiai  
- [Docker dokumentacija](https://docs.docker.com/) - pilnas Docker vadovas  
- [Azure CLI vadovas](https://docs.microsoft.com/cli/azure/) - Azure CLI komandos  
- [VS Code dokumentacija](https://code.visualstudio.com/docs) - redaktoriaus konfigūracija ir papildiniai  

### Azure paslaugos  
- [Microsoft Foundry dokumentacija](https://docs.microsoft.com/azure/ai-foundry/) - AI paslaugų konfigūracijos  
- [Azure OpenAI paslauga](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI modelių diegimas  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - stebėjimo įrankių peržiūra  

### Python vystymas  
- [Python virtualios aplinkos](https://docs.python.org/3/tutorial/venv.html) - aplinkos valdymas  
- [AsyncIO dokumentacija](https://docs.python.org/3/library/asyncio.html) - asinchroninio programavimo modeliai  
- [FastAPI dokumentacija](https://fastapi.tiangolo.com/) - web karkaso modeliai  

---

**Toliau**: Aplinka paruošta? Tęskite su [Laboratorija 04: Duomenų bazės dizainas ir schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Atsakomybės apribojimas**:
Šis dokumentas buvo išverstas naudojant dirbtinio intelekto vertimo paslaugą [Co-op Translator](https://github.com/Azure/co-op-translator). Nors siekiame tikslumo, prašome atkreipti dėmesį, kad automatiniai vertimai gali turėti klaidų ar netikslumų. Originalus dokumentas jo gimtąja kalba laikomas autoritetingu šaltiniu. Svarbiai informacijai rekomenduojama naudoti profesionalų žmogiškąjį vertimą. Mes neatsakome už jokius nesusipratimus ar neteisingą interpretaciją, kilusią naudojantis šiuo vertimu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->