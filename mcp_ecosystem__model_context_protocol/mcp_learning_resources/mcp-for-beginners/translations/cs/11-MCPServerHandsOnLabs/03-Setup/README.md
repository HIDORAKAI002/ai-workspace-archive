# Nastavení prostředí

## 🎯 Co tento lab pokrývá

Tento praktický lab vás provede nastavením kompletního vývojového prostředí pro tvorbu MCP serverů s integrací PostgreSQL. Nakonfigurujete všechny potřebné nástroje, nasadíte Azure zdroje a ověříte nastavení před zahájením implementace.

## Přehled

Správné vývojové prostředí je klíčové pro úspěšný vývoj MCP serveru. Tento lab nabízí krok za krokem instrukce pro nastavení Dockeru, Azure služeb, vývojářských nástrojů a ověření, že vše společně správně funguje.

Na konci tohoto labu budete mít plně funkční vývojové prostředí připravené pro tvorbu MCP serveru Zava Retail.

## Cíle učení

Na konci tohoto labu budete schopni:

- **Nainstalovat a konfigurovat** všechny požadované vývojové nástroje  
- **Nasadit Azure zdroje**, které MCP server potřebuje  
- **Nastavit Docker kontejnery** pro PostgreSQL a MCP server  
- **Ověřit** nastavení prostředí pomocí testovacích připojení  
- **Řešit** běžné problémy s nastavením a konfigurací  
- **Chápat** vývojový pracovní postup a strukturu souborů  

## 📋 Kontrola předpokladů

Před začátkem si ověřte, že máte:

### Požadované znalosti
- Základy práce s příkazovou řádkou (Windows Command Prompt/PowerShell)  
- Pochopení proměnných prostředí  
- Znalost Git verzovacího systému  
- Základní znalosti Dockeru (kontejnery, image, volume)  

### Systémové požadavky
- **Operační systém**: Windows 10/11, macOS nebo Linux  
- **RAM**: Minimálně 8GB (doporučeno 16GB)  
- **Úložiště**: Nejlépe alespoň 10GB volného místa  
- **Síť**: Připojení k internetu pro stahování a nasazení v Azure  

### Požadavky na účet
- **Předplatné Azure**: Stačí bezplatná úroveň  
- **GitHub účet**: Pro přístup k repozitáři  
- **Docker Hub účet**: (volitelné) Pro publikaci vlastních image  

## 🛠️ Instalace nástrojů

### 1. Instalace Docker Desktop

Docker poskytuje kontejnerizované prostředí pro náš vývoj.

#### Instalace na Windows

1. **Stáhněte Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Nainstalujte a nakonfigurujte**:  
   - Spusťte instalátor jako správce  
   - Povolit integraci s WSL 2, když budete vyzváni  
   - Po dokončení instalace restartujte počítač  

3. **Ověřte instalaci**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### Instalace na macOS

1. **Stáhněte a nainstalujte**:  
   ```bash
   # Stáhnout z https://desktop.docker.com/mac/stable/Docker.dmg
   # Nebo použijte Homebrew
   brew install --cask docker
   ```
  
2. **Spusťte Docker Desktop**:  
   - Otevřete Docker Desktop z Aplikací  
   - Projděte průvodce nastavením  

3. **Ověřte instalaci**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Instalace na Linuxu

1. **Nainstalujte Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Odhlaste se a znovu přihlaste, aby změny skupiny nabyly účinku
   ```
  
2. **Nainstalujte Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Instalace Azure CLI

Azure CLI umožňuje nasazování a správu Azure zdrojů.

#### Instalace na Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### Instalace na macOS

```bash
# Použití Homebrew
brew install azure-cli

# Nebo použití instalátoru
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Instalace na Linuxu

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Ověření a autentizace

```bash
# Zkontrolujte instalaci
az version

# Přihlaste se do Azure
az login

# Nastavte výchozí odběr (pokud jich máte více)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Instalace Git

Git je nutný pro klonování repozitáře a správu verzí.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git je obvykle předinstalován, ale můžete ho aktualizovat přes Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Instalace VS Code

Visual Studio Code poskytuje integrované vývojové prostředí se podporou MCP.

#### Instalace

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Požadovaná rozšíření

Nainstalujte tato rozšíření do VS Code:

```bash
# Nainstalujte přes příkazový řádek
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Nebo instalujte ve VS Code:  
1. Otevřete VS Code  
2. Přejděte na Rozšíření (Ctrl+Shift+X)  
3. Nainstalujte:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Instalace Pythonu

Python 3.8+ je vyžadován pro vývoj MCP serveru.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Používání Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Ověření instalace

```bash
python --version  # Mělo by zobrazit Python 3.11.x
pip --version      # Měla by se zobrazit verze pipu
```
  
## 🚀 Nastavení projektu

### 1. Naklonujte repozitář

```bash
# Klonujte hlavní repozitář
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Přejděte do adresáře projektu
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Ověřte strukturu repozitáře
ls -la
```
  
### 2. Vytvořte Python virtuální prostředí

```bash
# Vytvořit virtuální prostředí
python -m venv mcp-env

# Aktivovat virtuální prostředí
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Aktualizovat pip
python -m pip install --upgrade pip
```
  
### 3. Nainstalujte Python závislosti

```bash
# Nainstalujte závislosti pro vývoj
pip install -r requirements.lock.txt

# Ověřte klíčové balíčky
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Nasazení Azure zdrojů

### 1. Pochopení požadavků na zdroje

Náš MCP server vyžaduje tyto Azure zdroje:

| **Zdroje** | **Účel** | **Odhadované náklady** |
|------------|----------|-----------------------|
| **Microsoft Foundry** | Hosting a správa AI modelů | 10–50 $/měsíc |
| **OpenAI Deployment** | Textový embedding model (text-embedding-3-small) | 5–20 $/měsíc |
| **Application Insights** | Monitorování a telemetrie | 5–15 $/měsíc |
| **Resource Group** | Organizace zdrojů | Zdarma |

### 2. Nasazení Azure zdrojů

#### Možnost A: Automatizované nasazení (doporučeno)

```bash
# Přejděte do adresáře infrastruktury
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Skript nasazení provede:  
1. Vytvoření unikátní skupiny zdrojů  
2. Nasazení Microsoft Foundry zdrojů  
3. Nasazení modelu text-embedding-3-small  
4. Konfiguraci Application Insights  
5. Vytvoření servisního principála pro autentizaci  
6. Generování `.env` souboru s konfigurací  

#### Možnost B: Manuální nasazení

Pokud preferujete ruční kontrolu nebo automatický skript selže:

```bash
# Nastavit proměnné
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Vytvořit skupinu prostředků
az group create --name $RESOURCE_GROUP --location $LOCATION

# Nasadit hlavní šablonu
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Ověření nasazení Azure

```bash
# Zkontrolujte skupinu prostředků
az group show --name $RESOURCE_GROUP --output table

# Vypište nasazené prostředky
az resource list --resource-group $RESOURCE_GROUP --output table

# Otestujte AI službu
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Konfigurace proměnných prostředí

Po nasazení byste měli mít `.env` soubor. Ověřte, že obsahuje:

```bash
# Obsah souboru .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Konfigurace databáze (pro vývoj)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Nastavení Docker prostředí

### 1. Pochopení Docker Compose

Naše vývojové prostředí používá Docker Compose:

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
  
### 2. Spuštění vývojového prostředí

```bash
# Ujistěte se, že jste v kořenovém adresáři projektu
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Spusťte služby
docker-compose up -d

# Zkontrolujte stav služby
docker-compose ps

# Zobrazte záznamy
docker-compose logs -f
```
  
### 3. Ověření nastavení databáze

```bash
# Připojit se k PostgreSQL kontejneru
docker-compose exec postgres psql -U postgres -d zava

# Zkontrolovat strukturu databáze
\dt retail.*

# Ověřit vzorová data
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Ukončit PostgreSQL
\q
```
  
### 4. Test MCP serveru

```bash
# Zkontrolujte stav serveru MCP
curl http://localhost:8000/health

# Otestujte základní MCP endpoint
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 Konfigurace VS Code

### 1. Nastavení MCP integrace

Vytvořte VS Code konfiguraci MCP:

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
  
### 2. Nastavení Python prostředí

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
  
### 3. Test integrace VS Code

1. **Otevřete projekt ve VS Code**:  
   ```bash
   code .
   ```
  
2. **Otevřete AI Chat**:  
   - Stiskněte `Ctrl+Shift+P` (Windows/Linux) nebo `Cmd+Shift+P` (macOS)  
   - Napište "AI Chat" a vyberte "AI Chat: Open Chat"  

3. **Otestujte připojení MCP serveru**:  
   - V AI Chatu napište `#zava` a vyberte jeden z nakonfigurovaných serverů  
   - Zeptejte se: "Jaké tabulky jsou k dispozici v databázi?"  
   - Měli byste obdržet odpověď s výpisem tabulek maloobchodní databáze  

## ✅ Ověření prostředí

### 1. Komplexní systémová kontrola

Spusťte tento validační skript pro ověření nastavení:

```bash
# Vytvořit validační skript
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
    
    # Zkontrolovat verzi Pythonu
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Zkontrolovat požadované balíčky
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Zkontrolovat Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Zkontrolovat Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Zkontrolovat proměnné prostředí
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
    
    # Zkontrolovat připojení k databázi
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Testovací dotaz
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
    
    # Zkontrolovat MCP server
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
    
    # Zkontrolovat službu Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Toto selže, pokud jsou přihlašovací údaje neplatné
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

# Spustit validaci
python validate_setup.py
```
  
### 2. Manuální kontrolní seznam

**✅ Základní nástroje**  
- [ ] Docker verze 20.10+ nainstalován a spuštěn  
- [ ] Azure CLI 2.40+ nainstalován a autentizován  
- [ ] Python 3.8+ s pip nainstalován  
- [ ] Git 2.30+ nainstalován  
- [ ] VS Code s požadovanými rozšířeními  

**✅ Azure zdroje**  
- [ ] Úspěšně vytvořena skupina zdrojů  
- [ ] Nasazený AI Foundry projekt  
- [ ] Nasazený OpenAI text-embedding-3-small model  
- [ ] Nakonfigurovaný Application Insights  
- [ ] Vytvořen servisní principál s potřebnými oprávněními  

**✅ Konfigurace prostředí**  
- [ ] Vytvořen `.env` soubor se všemi potřebnými proměnnými  
- [ ] Fungující Azure přihlašovací údaje (test přes `az account show`)  
- [ ] PostgreSQL kontejner spuštěn a přístupný  
- [ ] V databázi načtena vzorová data  

**✅ Integrace VS Code**  
- [ ] Konfigurace `.vscode/mcp.json` nastavena  
- [ ] Python interpreter nastaven na virtuální prostředí  
- [ ] MCP servery viditelné v AI Chatu  
- [ ] Schopnost spouštět testovací dotazy přes AI Chat  

## 🛠️ Řešení běžných problémů

### Problémy s Dockerem

**Problém**: Docker kontejnery se nespustí  
```bash
# Zkontrolujte stav služby Docker
docker info

# Zkontrolujte dostupné zdroje
docker system df

# Vyčistěte, pokud je to potřeba
docker system prune -f

# Restartujte Docker Desktop (Windows/macOS)
# Nebo restartujte službu Docker (Linux)
sudo systemctl restart docker
```
  
**Problém**: Selhání připojení k PostgreSQL  
```bash
# Zkontrolujte protokoly kontejneru
docker-compose logs postgres

# Ověřte, zda je kontejner zdravý
docker-compose ps

# Otestujte přímé připojení
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Problémy s nasazením Azure

**Problém**: Nasazení Azure selže  
```bash
# Zkontrolujte autentizaci Azure CLI
az account show

# Ověřte oprávnění předplatného
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Zkontrolujte registraci poskytovatele zdrojů
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Problém**: Selhání autentizace AI služby  
```bash
# Testovat hlavní službu
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Ověřit nasazení AI služby
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Problémy s Python prostředím

**Problém**: Instalace balíčků selže  
```bash
# Aktualizujte pip a setuptools
python -m pip install --upgrade pip setuptools wheel

# Vyčistěte cache pipu
pip cache purge

# Instalujte balíčky jeden po druhém, abyste identifikovali problémy
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Problém**: VS Code nenajde Python interpreter  
```bash
# Zobrazit cesty interpretru Pythonu
which python  # macOS/Linux
where python  # Windows

# Nejprve aktivujte virtuální prostředí
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Pak otevřete VS Code
code .
```
  
## 🎯 Hlavní poznatky

Po dokončení tohoto labu byste měli mít:

✅ **Kompletní vývojové prostředí**: Všechny nástroje nainstalovány a nastaveny  
✅ **Nasazeny Azure zdroje**: AI služby a podpůrná infrastruktura  
✅ **Běžící Docker prostředí**: PostgreSQL a MCP server kontejnery  
✅ **Integrace VS Code**: MCP servery konfigurány a přístupné  
✅ **Ověřenou konfiguraci**: Všechny součásti otestovány a správně fungují  
✅ **Znalosti řešení problémů**: Běžné problémy a jejich řešení  

## 🚀 Co dál

Po připravení prostředí pokračujte v **[Lab 04: Návrh databáze a schéma](../04-Database/README.md)**, kde se dozvíte:

- Detailní pohled na schéma maloobchodní databáze  
- Pochopení vícenájemnického modelování dat  
- Implementaci Řízení přístupu na úrovni řádků (Row Level Security)  
- Práci se vzorovými maloobchodními daty  

## 📚 Další zdroje

### Vývojářské nástroje
- [Docker dokumentace](https://docs.docker.com/) - Kompletní reference k Dockeru  
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/) - Příkazy Azure CLI  
- [VS Code dokumentace](https://code.visualstudio.com/docs) - Nastavení editoru a rozšíření  

### Azure služby
- [Microsoft Foundry dokumentace](https://docs.microsoft.com/azure/ai-foundry/) - Konfigurace AI služby  
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - Nasazení AI modelů  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Nastavení monitoringu  

### Vývoj v Pythonu
- [Python virtuální prostředí](https://docs.python.org/3/tutorial/venv.html) - Správa prostředí  
- [AsyncIO dokumentace](https://docs.python.org/3/library/asyncio.html) - Vzory asynchronního programování  
- [FastAPI dokumentace](https://fastapi.tiangolo.com/) - Webové framework vzory  

---

**Další krok**: Prostředí připravené? Pokračujte na [Lab 04: Návrh databáze a schéma](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Prohlášení o omezení odpovědnosti**:
Tento dokument byl přeložen pomocí AI překladatelské služby [Co-op Translator](https://github.com/Azure/co-op-translator). Přestože usilujeme o co největší přesnost, mějte prosím na paměti, že automatizované překlady mohou obsahovat chyby nebo nepřesnosti. Originální dokument v jeho mateřském jazyce by měl být považován za autoritativní zdroj. Pro kritické informace se doporučuje profesionální lidský překlad. Nejsme odpovědní za jakékoli nedorozumění nebo nesprávné interpretace vzniklé použitím tohoto překladu.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->