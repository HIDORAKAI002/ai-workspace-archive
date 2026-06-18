# Postavljanje Okoline

## 🎯 Što Ovaj Laboratorij Obuhvaća

Ovaj praktični laboratorij vodi vas kroz postavljanje kompletne razvojne okoline za izradu MCP servera s integracijom PostgreSQL-a. Konfigurirat ćete sve potrebne alate, postaviti Azure resurse i provjeriti postavke prije nastavka s implementacijom.

## Pregled

Pravilna razvojna okolina je ključna za uspješan razvoj MCP servera. Ovaj laboratorij pruža upute korak po korak za postavljanje Dockera, Azure servisa, razvojnih alata i provjeru ispravnosti suradnje svih komponenti.

Na kraju ovog laboratorija imat ćete potpuno funkcionalnu razvojnu okolinu spremnu za izradu Zava Retail MCP servera.

## Ciljevi Učenja

Na kraju ovog laboratorija moći ćete:

- **Instalirati i konfigurirati** sve potrebne razvojne alate
- **Objaviti Azure resurse** potrebne za MCP server
- **Postaviti Docker kontejnere** za PostgreSQL i MCP server
- **Provjeriti** postavke okoline s testnim vezama
- **Otkloniti poteškoće** uobičajenih problema s konfiguracijom i postavljanjem
- **Razumjeti** razvojni tijek i strukturu datoteka

## 📋 Provjera Preduvjeta

Prije početka, osigurajte da imate:

### Potrebno Znanje
- Osnovno korištenje naredbenog retka (Windows Command Prompt/PowerShell)
- Razumijevanje varijabli okoline
- Poznavanje Git verzionog sustava
- Osnovne koncepte Dockera (kontejneri, slike, volumeni)

### Zahtjevi Sustava
- **Operativni sustav**: Windows 10/11, macOS ili Linux
- **RAM**: Minimalno 8GB (preporučeno 16GB)
- **Pohrana**: Najmanje 10GB slobodnog prostora
- **Mreža**: Internet veza za preuzimanja i Azure objavu

### Zahtjevi Računa
- **Azure Pretplata**: Besplatni sloj je dovoljan
- **GitHub Račun**: Za pristup spremištu
- **Docker Hub Račun**: (Opcionalno) Za objavljivanje prilagođenih slika

## 🛠️ Instalacija Alata

### 1. Instalirajte Docker Desktop

Docker pruža kontejnerizirano okruženje za naš razvojni setup.

#### Instalacija na Windows

1. **Preuzmite Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Instalirajte i konfigurirajte**:
   - Pokrenite instalacijski program kao Administrator
   - Omogućite integraciju sa WSL 2 kada vas se to zatraži
   - Ponovno pokrenite računalo nakon završetka instalacije

3. **Provjerite instalaciju**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Instalacija na macOS

1. **Preuzmite i instalirajte**:
   ```bash
   # Preuzmite s https://desktop.docker.com/mac/stable/Docker.dmg
   # Ili koristite Homebrew
   brew install --cask docker
   ```

2. **Pokrenite Docker Desktop**:
   - Pokrenite Docker Desktop iz mape Applications
   - Dovršite početni čarobnjak za postavljanje

3. **Provjerite instalaciju**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Instalacija na Linux

1. **Instalirajte Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Odjavite se i ponovo prijavite da bi promjene u grupi stupile na snagu
   ```

2. **Instalirajte Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Instalirajte Azure CLI

Azure CLI omogućuje objavu i upravljanje Azure resursima.

#### Instalacija na Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Instalacija na macOS

```bash
# Korištenje Homebrew-a
brew install azure-cli

# Ili korištenje instalatera
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Instalacija na Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Provjera i autentikacija

```bash
# Provjeri instalaciju
az version

# Prijavi se u Azure
az login

# Postavi zadanu pretplatu (ako imaš više)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Instalirajte Git

Git je potreban za kloniranje spremišta i upravljanje verzijama.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git je obično unaprijed instaliran, ali ga možete ažurirati putem Homebrew-a
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Instalirajte VS Code

Visual Studio Code pruža integrirano razvojno okruženje s podrškom za MCP.

#### Instalacija

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Potrebni Dodaci

Instalirajte ove VS Code dodatke:

```bash
# Instalirajte putem naredbenog retka
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Ili instalirajte kroz VS Code:
1. Otvorite VS Code
2. Idite na Ekstenzije (Ctrl+Shift+X)
3. Instalirajte:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Instalirajte Python

Python 3.8+ je potreban za razvoj MCP servera.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Korištenje Homebrewa
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Provjera Instalacije

```bash
python --version  # Trebao bi prikazati Python 3.11.x
pip --version      # Trebao bi prikazati verziju pip-a
```

## 🚀 Postavljanje Projekta

### 1. Klonirajte Spremište

```bash
# Klonirajte glavni repozitorij
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Idite u direktorij projekta
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Provjerite strukturu repozitorija
ls -la
```

### 2. Kreirajte Python Virtualno Okruženje

```bash
# Kreirajte virtualno okruženje
python -m venv mcp-env

# Aktivirajte virtualno okruženje
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Nadogradite pip
python -m pip install --upgrade pip
```

### 3. Instalirajte Python Ovisnosti

```bash
# Instalirajte razvojne ovisnosti
pip install -r requirements.lock.txt

# Provjerite ključne pakete
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Objavljivanje Azure Resursa

### 1. Razumijevanje Potreba za Resursima

Naš MCP server zahtijeva sljedeće Azure resurse:

| **Resurs** | **Svrha** | **Procijenjeni Trošak** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Hostiranje i upravljanje AI modelima | 10-50 USD/mjesečno |
| **OpenAI Deployment** | Model za tekstualno ugradnju (text-embedding-3-small) | 5-20 USD/mjesečno |
| **Application Insights** | Praćenje i telemetrija | 5-15 USD/mjesečno |
| **Resource Group** | Organizacija resursa | Besplatno |

### 2. Objavite Azure Resurse

#### Opcija A: Automatizirana objava (Preporučeno)

```bash
# Navigirajte do direktorija infrastrukture
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Skripta za objavu će:
1. Kreirati jedinstvenu grupu resursa
2. Objaviti Microsoft Foundry resurse
3. Objaviti model text-embedding-3-small
4. Konfigurirati Application Insights
5. Kreirati servisnog principala za autentikaciju
6. Generirati `.env` datoteku s konfiguracijom

#### Opcija B: Ručna objava

Ako želite ručnu kontrolu ili automatizirana skripta ne uspije:

```bash
# Postavi varijable
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Kreiraj grupu resursa
az group create --name $RESOURCE_GROUP --location $LOCATION

# Implementiraj glavni predložak
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Provjerite Azure Objekt

```bash
# Provjerite grupu resursa
az group show --name $RESOURCE_GROUP --output table

# Popis implementiranih resursa
az resource list --resource-group $RESOURCE_GROUP --output table

# Testirajte AI uslugu
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Konfigurirajte Varijable Okoline

Nakon objave trebali biste imati `.env` datoteku. Provjerite sadrži li:

```bash
# sadržaj .env datoteke
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Konfiguracija baze podataka (za razvoj)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Postavljanje Docker Okoline

### 1. Razumijevanje Docker Kompozicije

Naša razvojna okolina koristi Docker Compose:

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

### 2. Pokrenite Razvojnu Okolinu

```bash
# Osigurajte da ste u glavnom direktoriju projekta
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Pokrenite servise
docker-compose up -d

# Provjerite status servisa
docker-compose ps

# Pregledajte zapise
docker-compose logs -f
```

### 3. Provjerite Postavljanje Baze Podataka

```bash
# Poveži se na PostgreSQL kontejner
docker-compose exec postgres psql -U postgres -d zava

# Provjeri strukturu baze podataka
\dt retail.*

# Potvrdi uzorak podataka
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Izlaz iz PostgreSQL-a
\q
```

### 4. Testirajte MCP Server

```bash
# Provjerite zdravlje MCP servera
curl http://localhost:8000/health

# Testirajte osnovnu MCP krajnju točku
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Konfiguracija VS Code-a

### 1. Konfigurirajte MCP Integraciju

Kreirajte MCP konfiguraciju za VS Code:

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

### 2. Konfigurirajte Python Okruženje

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

### 3. Testirajte Integraciju u VS Code

1. **Otvorite projekt u VS Code**:
   ```bash
   code .
   ```

2. **Otvorite AI Chat**:
   - Pritisnite `Ctrl+Shift+P` (Windows/Linux) ili `Cmd+Shift+P` (macOS)
   - Upisujte "AI Chat" i izaberite "AI Chat: Open Chat"

3. **Testirajte vezu s MCP serverom**:
   - U AI Chat upišite `#zava` i odaberite jedan od konfiguriranih servera
   - Pitajte: "Koji su tablice dostupne u bazi podataka?"
   - Trebali biste dobiti odgovor s popisom tablica maloprodajne baze podataka

## ✅ Provjera Okoline

### 1. Svestrana Provjera Sustava

Pokrenite ovaj skript za validaciju kako biste provjerili postavke:

```bash
# Kreiraj skriptu za validaciju
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
    
    # Provjeri verziju Pythona
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Provjeri potrebne pakete
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Provjeri Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Provjeri Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Provjeri varijable okoline
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
    
    # Provjeri vezu s bazom podataka
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testiraj upit
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
    
    # Provjeri MCP poslužitelj
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
    
    # Provjeri Azure AI uslugu
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Ovo će zakašljati ako su vjerodajnice nevaljane
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

# Pokreni validaciju
python validate_setup.py
```

### 2. Ručni Provjerni Popis

**✅ Osnovni Alati**
- [ ] Docker verzija 20.10+ instalirana i pokrenuta
- [ ] Azure CLI 2.40+ instaliran i autentificiran
- [ ] Python 3.8+ s pip-om instaliran
- [ ] Git 2.30+ instaliran
- [ ] VS Code s potrebnim dodacima

**✅ Azure Resursi**
- [ ] Grupe resursa uspješno kreirane
- [ ] AI Foundry projekt objavljen
- [ ] OpenAI text-embedding-3-small model objavljen
- [ ] Konfigurirani Application Insights
- [ ] Servisni principal kreiran s odgovarajućim dopuštenjima

**✅ Konfiguracija Okoline**
- [ ] `.env` datoteka kreirana sa svim potrebnim varijablama
- [ ] Azure vjerodajnice rade (test s `az account show`)
- [ ] PostgreSQL kontejner pokrenut i dostupan
- [ ] Učitani primjeri podataka u bazu

**✅ Integracija u VS Code**
- [ ] `.vscode/mcp.json` konfiguriran
- [ ] Python interpreter postavljen na virtualno okruženje
- [ ] MCP serveri se pojavljuju u AI Chatu
- [ ] Moguće izvršavati testne upite putem AI Chata

## 🛠️ Rješavanje Uobičajenih Problema

### Problemi s Dockerom

**Problem**: Docker kontejneri ne žele se pokrenuti
```bash
# Provjeri status Docker servisa
docker info

# Provjeri dostupne resurse
docker system df

# Očisti ako je potrebno
docker system prune -f

# Ponovno pokreni Docker Desktop (Windows/macOS)
# Ili ponovno pokreni Docker servis (Linux)
sudo systemctl restart docker
```

**Problem**: Veza s PostgreSQL-om ne uspijeva
```bash
# Provjerite zapise spremnika
docker-compose logs postgres

# Provjerite je li spremnik zdrav
docker-compose ps

# Testirajte izravnu vezu
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Problemi s Azure Objavom

**Problem**: Objavljivanje na Azure ne uspijeva
```bash
# Provjerite Azure CLI autentifikaciju
az account show

# Provjerite dozvole pretplate
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Provjerite registraciju pružatelja resursa
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Problem**: Autentikacija AI servisa ne uspijeva
```bash
# Testiraj servisni glavni račun
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Provjeri implementaciju AI servisa
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Problemi u Python Okruženju

**Problem**: Instalacija paketa ne uspijeva
```bash
# Nadogradite pip i setuptools
python -m pip install --upgrade pip setuptools wheel

# Očistite pip predmemoriju
pip cache purge

# Instalirajte pakete jedan po jedan kako biste identificirali probleme
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Problem**: VS Code ne može pronaći Python interpreter
```bash
# Prikaži putanje Python interpretera
which python  # macOS/Linux
where python  # Windows

# Prvo aktivirajte virtualno okruženje
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Zatim otvorite VS Code
code .
```

## 🎯 Ključna Zapažanja

Nakon dovršetka ovog laboratorija trebali biste imati:

✅ **Potpuna Razvojna Okolina**: Svi alati instalirani i konfigurirani  
✅ **Azure Resursi Objavljeni**: AI servisi i podrška infrastruktura  
✅ **Docker Okolina Pokrenuta**: PostgreSQL i MCP server kontejneri  
✅ **Integracija s VS Code-om**: MCP serveri konfigurirani i dostupni  
✅ **Provjerena Postavka**: Sve komponente testirane i funkcionalne zajedno  
✅ **Znanje o Otklanjanju Problema**: Uobičajeni problemi i rješenja  

## 🚀 Što Dalje

S pripremljenom okolinom, nastavite s **[Laboratorij 04: Dizajn baze podataka i shema](../04-Database/README.md)** da:

- Detaljno istražite shemu maloprodajne baze
- Razumijete modeliranje podataka za više zakupnika
- Naučite o implementaciji sigurnosti na razini retka
- Radite s primjerima maloprodajnih podataka

## 📚 Dodatni Resursi

### Razvojni Alati
- [Docker Dokumentacija](https://docs.docker.com/) - Potpuni Docker referentni materijal
- [Azure CLI Referenca](https://docs.microsoft.com/cli/azure/) - Azure CLI naredbe
- [VS Code Dokumentacija](https://code.visualstudio.com/docs) - Konfiguracija uređivača i dodaci

### Azure Servisi
- [Microsoft Foundry Dokumentacija](https://docs.microsoft.com/azure/ai-foundry/) - Konfiguracija AI servisa
- [Azure OpenAI Servis](https://docs.microsoft.com/azure/cognitive-services/openai/) - Objavljivanje AI modela
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Postavljanje nadzora

### Python Razvoj
- [Python Virtualna Okruženja](https://docs.python.org/3/tutorial/venv.html) - Upravljanje okolinama
- [AsyncIO Dokumentacija](https://docs.python.org/3/library/asyncio.html) - Uzorci asinkronog programiranja
- [FastAPI Dokumentacija](https://fastapi.tiangolo.com/) - Obrasci web frameworka

---

**Dalje**: Okolina spremna? Nastavite s [Laboratorij 04: Dizajn baze podataka i shema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Napomena**:
Ovaj dokument je preveden korištenjem AI prevoditeljskog servisa [Co-op Translator](https://github.com/Azure/co-op-translator). Iako težimo točnosti, imajte na umu da automatski prijevodi mogu sadržavati greške ili netočnosti. Izvorni dokument na izvornom jeziku treba smatrati autoritativnim izvorom. Za važne informacije preporuča se profesionalni ljudski prijevod. Nismo odgovorni za bilo kakva nesporazumevanja ili pogrešne interpretacije koje proizlaze iz korištenja ovog prijevoda.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->