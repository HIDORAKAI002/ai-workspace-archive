# Nastavenie Prostredia

## 🎯 Čo tento laboratórium obsahuje

Tento praktický laboratórium vás prevedie nastavením kompletného vývojového prostredia na tvorbu MCP serverov s integráciou PostgreSQL. Nakonfigurujete všetky potrebné nástroje, nasadíte Azure zdroje a overíte svoje nastavenie pred pokračovaním v implementácii.

## Prehľad

Správne vývojové prostredie je kľúčové pre úspešný vývoj MCP servera. Toto laboratórium poskytuje krok za krokom pokyny na nastavenie Dockera, Azure služieb, vývojových nástrojov a overenie, že všetko spolu správne funguje.

Na konci tohto laboratória budete mať plne funkčné vývojové prostredie pripravené na tvorbu Zava Retail MCP servera.

## Ciele učenia

Na konci tohto laboratória budete schopní:

- **Nainštalovať a nakonfigurovať** všetky požadované vývojové nástroje
- **Nasadiť Azure zdroje** potrebné pre MCP server
- **Nastaviť Docker kontajnery** pre PostgreSQL a MCP server
- **Overiť** svoje prostredie pomocou testovacích pripojení
- **Riešiť problémy** bežných problémov s nastavením a konfiguráciou
- **Pochopiť** vývojový pracovný tok a štruktúru súborov

## 📋 Kontrola predpokladov

Pred začatím sa uistite, že máte:

### Požadované znalosti
- Základy používania príkazového riadku (Windows Command Prompt/PowerShell)
- Pochopenie premenných prostredia
- Znalosť Git verzionovania
- Základy Dockera (kontajnery, image, volume)

### Systémové požiadavky
- **Operačný systém**: Windows 10/11, macOS alebo Linux
- **RAM**: Minimálne 8GB (16GB odporúčané)
- **Úložisko**: Minimálne 10GB voľného priestoru
- **Sieť**: Internetové pripojenie na sťahovanie a nasadzovanie Azure

### Požiadavky na účet
- **Azure predplatné**: Stačí bezplatná vrstva
- **GitHub účet**: Pre prístup k repozitáru
- **Docker Hub účet**: (voliteľné) Pre publikovanie vlastných image

## 🛠️ Inštalácia nástrojov

### 1. Inštalácia Docker Desktop

Docker poskytuje kontajnerizované prostredie pre naše vývojové nastavenie.

#### Inštalácia na Windows

1. **Stiahnite Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Nainštalujte a nakonfigurujte**:
   - Spustite inštalátor ako administrátor
   - Povoliť integráciu WSL 2, keď budete vyzvaní
   - Po dokončení inštalácie reštartujte počítač

3. **Overte inštaláciu**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Inštalácia na macOS

1. **Stiahnite a nainštalujte**:
   ```bash
   # Stiahnite z https://desktop.docker.com/mac/stable/Docker.dmg
   # Alebo použite Homebrew
   brew install --cask docker
   ```

2. **Spustite Docker Desktop**:
   - Spustite Docker Desktop z aplikácií
   - Dokončite sprievodcu počiatočným nastavením

3. **Overte inštaláciu**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Inštalácia na Linuxe

1. **Nainštalujte Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Odhláste sa a znovu prihláste, aby sa zmeny skupiny prejavili
   ```

2. **Nainštalujte Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Inštalácia Azure CLI

Azure CLI umožňuje nasadenie a správu Azure zdrojov.

#### Inštalácia na Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Inštalácia na macOS

```bash
# Použitie Homebrew
brew install azure-cli

# Alebo použitie inštalátora
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Inštalácia na Linuxe

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Overenie a autentifikácia

```bash
# Skontrolovať inštaláciu
az version

# Prihlásiť sa do Azure
az login

# Nastaviť predplatné ako predvolené (ak máte viacero)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Inštalácia Git

Git je potrebný na klonovanie repozitára a verzionovanie.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git je zvyčajne predinštalovaný, ale môžete ho aktualizovať cez Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Inštalácia VS Code

Visual Studio Code poskytuje integrované vývojové prostredie s podporou MCP.

#### Inštalácia

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Požadované rozšírenia

Nainštalujte tieto rozšírenia do VS Code:

```bash
# Inštalácia cez príkazový riadok
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Alebo nainštalujte cez VS Code:
1. Otvorte VS Code
2. Prejdite na Rozšírenia (Ctrl+Shift+X)
3. Nainštalujte:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Inštalácia Pythonu

Python 3.8+ je potrebný pre vývoj MCP servera.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Používanie Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Overenie inštalácie

```bash
python --version  # Malo by zobraziť Python 3.11.x
pip --version      # Malo by zobraziť verziu pipu
```

## 🚀 Nastavenie projektu

### 1. Klonovanie repozitára

```bash
# Klonujte hlavné úložisko
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Prejdite do adresára projektu
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Overte štruktúru úložiska
ls -la
```

### 2. Vytvorenie virtuálneho Python prostredia

```bash
# Vytvorte virtuálne prostredie
python -m venv mcp-env

# Aktivujte virtuálne prostredie
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Aktualizujte pip
python -m pip install --upgrade pip
```

### 3. Inštalácia Python závislostí

```bash
# Nainštalujte vývojové závislosti
pip install -r requirements.lock.txt

# Overiť kľúčové balíky
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Nasadenie Azure zdrojov

### 1. Pochopenie požiadaviek na zdroje

Náš MCP server vyžaduje tieto Azure zdroje:

| **Zdroj** | **Účel** | **Odhadované náklady** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Hosting a správa AI modelov | 10-50 USD/mesiac |
| **OpenAI nasadenie** | Model textovej embedovacej vrstvy (text-embedding-3-small) | 5-20 USD/mesiac |
| **Application Insights** | Monitorovanie a telemetria | 5-15 USD/mesiac |
| **Resource Group** | Organizácia zdrojov | Zdarma |

### 2. Nasadenie Azure zdrojov

#### Možnosť A: Automatizované nasadenie (odporúčané)

```bash
# Prejdite do adresára infraštruktúry
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Skript na nasadenie:
1. Vytvorí unikátnu skupinu zdrojov
2. Nasadí Microsoft Foundry zdroje
3. Nasadí model text-embedding-3-small
4. Konfiguruje Application Insights
5. Vytvorí služobný princíp pre autentifikáciu
6. Vygeneruje súbor `.env` s konfiguráciou

#### Možnosť B: Manuálne nasadenie

Ak preferujete manuálnu kontrolu alebo skript zlyhá:

```bash
# Nastaviť premenné
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Vytvoriť skupinu prostriedkov
az group create --name $RESOURCE_GROUP --location $LOCATION

# Nasadiť hlavný šablón
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Overenie nasadenia Azure

```bash
# Skontrolujte skupinu zdrojov
az group show --name $RESOURCE_GROUP --output table

# Zoznam nasadených zdrojov
az resource list --resource-group $RESOURCE_GROUP --output table

# Testujte AI službu
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Konfigurácia premenných prostredia

Po nasadení by ste mali mať súbor `.env`. Overte, že obsahuje:

```bash
# Obsah súboru .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Konfigurácia databázy (pre vývoj)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Nastavenie Docker prostredia

### 1. Pochopenie Docker Compose

Naše vývojové prostredie používa Docker Compose:

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

### 2. Spustenie vývojového prostredia

```bash
# Uistite sa, že ste v koreňovom adresári projektu
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Spustite služby
docker-compose up -d

# Skontrolujte stav služby
docker-compose ps

# Prezrite si denníky
docker-compose logs -f
```

### 3. Overenie nastavenia databázy

```bash
# Pripojiť sa ku kontajneru PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Skontrolovať štruktúru databázy
\dt retail.*

# Overiť ukážkové dáta
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Ukončiť PostgreSQL
\q
```

### 4. Testovanie MCP servera

```bash
# Skontrolujte stav servera MCP
curl http://localhost:8000/health

# Otestujte základný MCP endpoint
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Konfigurácia VS Code

### 1. Konfigurácia MCP integrácie

Vytvorte VS Code MCP konfiguráciu:

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

### 2. Konfigurácia Python prostredia

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

### 3. Testovanie VS Code integrácie

1. **Otvorte projekt vo VS Code**:
   ```bash
   code .
   ```

2. **Otvorte AI Chat**:
   - Stlačte `Ctrl+Shift+P` (Windows/Linux) alebo `Cmd+Shift+P` (macOS)
   - Napíšte „AI Chat“ a vyberte „AI Chat: Open Chat“

3. **Otestujte pripojenie MCP servera**:
   - V AI Chat zadajte `#zava` a vyberte jeden z nakonfigurovaných serverov
   - Spýtajte sa: "Aké tabuľky sú dostupné v databáze?"
   - Mali by ste dostať odpoveď so zoznamom tabuliek v retail databáze

## ✅ Overenie prostredia

### 1. Komplexná kontrola systému

Spustite tento validačný skript na overenie vášho nastavenia:

```bash
# Vytvorte validačný skript
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
    
    # Skontrolujte verziu Pythonu
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Skontrolujte požadované balíčky
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Skontrolujte Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Skontrolujte Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Skontrolujte premenné prostredia
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
    
    # Skontrolujte pripojenie k databáze
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testovacia dotaz
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
    
    # Skontrolujte MCP server
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
    
    # Skontrolujte Azure AI službu
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Toto zlyhá, ak sú poverenia neplatné
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

# Spustite validáciu
python validate_setup.py
```

### 2. Manuálny kontrolný zoznam

**✅ Základné nástroje**
- [ ] Docker verzia 20.10+ nainštalovaná a spustená
- [ ] Azure CLI 2.40+ nainštalovaná a autentifikovaná
- [ ] Python 3.8+ s pip nainštalovaný
- [ ] Git 2.30+ nainštalovaný
- [ ] VS Code s potrebnými rozšíreniami

**✅ Azure zdroje**
- [ ] Skupina zdrojov úspešne vytvorená
- [ ] Projekt AI Foundry nasadený
- [ ] OpenAI text-embedding-3-small model nasadený
- [ ] Application Insights nakonfigurovaný
- [ ] Služobný princíp vytvorený s potrebnými povoleniami

**✅ Konfigurácia prostredia**
- [ ] `.env` súbor vytvorený so všetkými požadovanými premennými
- [ ] Azure prihlasovacie údaje fungujú (testujte príkazom `az account show`)
- [ ] PostgreSQL kontajner beží a je prístupný
- [ ] V databáze sú načítané ukážkové dáta

**✅ VS Code integrácia**
- [ ] `.vscode/mcp.json` nakonfigurovaný
- [ ] Python interpret nastavený na virtuálne prostredie
- [ ] MCP servery sa zobrazujú v AI Chat
- [ ] Dokážete vykonať testovacie dotazy cez AI Chat

## 🛠️ Riešenie bežných problémov

### Problémy s Dockerom

**Problém**: Docker kontajnery sa nespustia
```bash
# Skontrolujte stav služby Docker
docker info

# Skontrolujte dostupné zdroje
docker system df

# Vyčistite podľa potreby
docker system prune -f

# Reštartujte Docker Desktop (Windows/macOS)
# Alebo reštartujte službu Docker (Linux)
sudo systemctl restart docker
```

**Problém**: Pripojenie k PostgreSQL zlyhá
```bash
# Skontrolujte záznamy kontajnera
docker-compose logs postgres

# Overte, či je kontajner zdravý
docker-compose ps

# Otestujte priamu spojenie
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Problémy s nasadením Azure

**Problém**: Nasadenie do Azure zlyhá
```bash
# Skontrolujte overenie Azure CLI
az account show

# Overte povolenia v predplatnom
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Skontrolujte registráciu poskytovateľa zdrojov
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Problém**: Autentifikácia AI služby zlyháva
```bash
# Testovať hlavný služobný účet
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Overiť nasadenie AI služby
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Problémy s Python prostredím

**Problém**: Inštalácia balíkov zlyhá
```bash
# Aktualizujte pip a setuptools
python -m pip install --upgrade pip setuptools wheel

# Vyčistite cache pip
pip cache purge

# Inštalujte balíčky jeden po druhom, aby ste identifikovali problémy
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Problém**: VS Code nenájde Python interpret
```bash
# Zobraziť cesty k Python interpretru
which python  # macOS/Linux
where python  # Windows

# Najprv aktivujte virtuálne prostredie
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Potom otvorte VS Code
code .
```

## 🎯 Kľúčové poznatky

Po dokončení tohto laboratória by ste mali mať:

✅ **Kompletné vývojové prostredie**: Všetky nástroje nainštalované a nakonfigurované  
✅ **Azure zdroje nasadené**: AI služby a podporujúca infraštruktúra  
✅ **Docker prostredie beží**: PostgreSQL a MCP server kontajnery  
✅ **VS Code integrácia**: MCP servery nakonfigurované a prístupné  
✅ **Overené nastavenie**: Všetky komponenty testované a fungujúce spolu  
✅ ** znalosti o riešení problémov**: Bežné problémy a ich riešenia  

## 🚀 Čo ďalej

S pripraveným prostredím pokračujte v **[Laboratóriu 04: Návrh a schéma databázy](../04-Database/README.md)**, kde:

- Preskúmate retail schému databázy podrobne
- Pochopíte modelovanie dát pre viacerých nájomcov
- Naučíte sa implementáciu ochrany na úrovni riadkov (Row Level Security)
- Budete pracovať s ukážkovými retail dátami

## 📚 Ďalšie zdroje

### Vývojové nástroje
- [Docker dokumentácia](https://docs.docker.com/) - Kompletná referencia Dockera
- [Azure CLI referencia](https://docs.microsoft.com/cli/azure/) - Príkazy Azure CLI
- [VS Code dokumentácia](https://code.visualstudio.com/docs) - Nastavenie editora a rozšírení

### Azure služby
- [Microsoft Foundry dokumentácia](https://docs.microsoft.com/azure/ai-foundry/) - Konfigurácia AI služieb
- [Azure OpenAI služba](https://docs.microsoft.com/azure/cognitive-services/openai/) - Nasadenie AI modelov
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Nastavenie monitorovania

### Python vývoj
- [Python virtuálne prostredia](https://docs.python.org/3/tutorial/venv.html) - Správa prostredí
- [AsyncIO dokumentácia](https://docs.python.org/3/library/asyncio.html) - Asynchrónne programovacie vzory
- [FastAPI dokumentácia](https://fastapi.tiangolo.com/) - Vzorové webové frameworky

---

**Ďalej**: Prostredie pripravené? Pokračujte s [Lab 04: Návrh a schéma databázy](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Vyhlásenie o zodpovednosti**:
Tento dokument bol preložený pomocou AI prekladateľskej služby [Co-op Translator](https://github.com/Azure/co-op-translator). Hoci sa snažíme o presnosť, vezmite prosím na vedomie, že automatické preklady môžu obsahovať chyby alebo nepresnosti. Pôvodný dokument v jeho natívnom jazyku by mal byť považovaný za autoritatívny zdroj. Pre kritické informácie sa odporúča profesionálny ľudský preklad. Nie sme zodpovední za žiadne nedorozumenia alebo nesprávne interpretácie vyplývajúce z použitia tohto prekladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->