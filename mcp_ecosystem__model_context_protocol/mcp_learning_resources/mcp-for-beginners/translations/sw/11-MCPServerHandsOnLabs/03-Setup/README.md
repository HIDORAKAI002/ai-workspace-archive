# Usanidi wa Mazingira

## 🎯 Kile Kinasemwa kwenye Maabara Hii

Maabara hii ya vitendo inakuongoza hatua kwa hatua katika kuanzisha mazingira kamili ya maendeleo kwa ajili ya kujenga seva za MCP zilizo na muunganisho wa PostgreSQL. Utapanga zana zote muhimu, deploy rasilimali za Azure, na kuthibitisha usanidi wako kabla ya kuendelea na utekelezaji.

## Muhtasari

Mazungumzo sahihi ya maendeleo ni muhimu kwa mafanikio ya maendeleo ya seva za MCP. Maabara hii inatoa maelekezo ya hatua kwa hatua kwa ajili ya kusanidi Docker, huduma za Azure, zana za maendeleo, na kuthibitisha kwamba kila kitu kinafanya kazi pamoja kwa usahihi.

Mwisho wa maabara hii, utakuwa na mazingira kamili ya maendeleo tayari kwa ajili ya kujenga seva ya Zava Retail MCP.

## Malengo ya Kujifunza

Mwisho wa maabara hii, utaweza:

- **Kufunga na kusanidi** zana zote muhimu za maendeleo  
- **Kutoa rasilimali za Azure** zinazohitajika kwa seva ya MCP  
- **Kusanidi kontena za Docker** kwa PostgreSQL na seva ya MCP  
- **Kuthibitisha** usanidi wa mazingira yako kwa kuunganishwa kwa majaribio  
- **Kutatua matatizo** ya kawaida ya usanidi na matatizo ya mipangilio  
- **Kuelewa** mtiririko wa kazi za maendeleo na muundo wa faili  

## 📋 Ukaguzi wa Mahitaji Kabla ya Kuanzisha

Kabla ya kuanza, hakikisha una:

### Maarifa Yanayohitajika
- Matumizi ya mstari wa amri wa msingi (Windows Command Prompt/PowerShell)  
- Uelewa wa vigezo vya mazingira  
- Uzoefu wa udhibiti wa toleo kwa Git  
- Fahamu dhana za msingi za Docker (kontena, picha, volumes)  

### Mahitaji ya Mfumo
- **Mfumo wa Uendeshaji**: Windows 10/11, macOS, au Linux  
- **RAM**: Angalau 8GB (16GB inapendekezwa)  
- **Hifadhi**: Angalau nafasi ya bure 10GB  
- **Mtandao**: Muunganisho wa Internet kwa ajili ya upakuaji na deployment ya Azure  

### Mahitaji ya Akaunti
- **Usajili wa Azure**: Ngazi ya bure inatosha  
- **Akaunti ya GitHub**: Kwa ufikiaji wa hazina  
- **Akaunti ya Docker Hub**: (Hiari) Kwa kuchapisha picha za desturi  

## 🛠️ Ufungaji wa Zana

### 1. Sakinisha Docker Desktop

Docker hutoa mazingira yaliyotengenezwa kwa kontena kwa usanidi wetu wa maendeleo.

#### Ufungaji kwa Windows

1. **Pakua Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **Sakinisha na Sanidi**:  
   - Endesha msanidi programu kama Msimamizi  
   - Anzisha ushirikiano wa WSL 2 unapoombwa  
   - Washa upya kompyuta yako baada ya kufanikisha ufungaji  

3. **Thibitisha Ufungaji**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### Ufungaji kwa macOS

1. **Pakua na Sakinisha**:  
   ```bash
   # Pakua kutoka https://desktop.docker.com/mac/stable/Docker.dmg
   # Au tumia Homebrew
   brew install --cask docker
   ```
  
2. **Anzisha Docker Desktop**:  
   - Fungua Docker Desktop kutoka Programu  
   - Kamilisha usaidizi wa usanidi wa awali  

3. **Thibitisha Ufungaji**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Ufungaji kwa Linux

1. **Sakinisha Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Toka na ingia tena ili mabadiliko ya kikundi yafanyakazi
   ```
  
2. **Sakinisha Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Sakinisha Azure CLI

Azure CLI inaruhusu deployment na usimamizi wa rasilimali za Azure.

#### Ufungaji kwa Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### Ufungaji kwa macOS

```bash
# Kutumia Homebrew
brew install azure-cli

# Au kutumia msanidi programu
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Ufungaji kwa Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### Thibitisha na Ingia

```bash
# Kagua usakinishaji
az version

# Ingia kwenye Azure
az login

# Weka usajili wa kawaida (kama una zaidi ya mmoja)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Sakinisha Git

Git inahitajika kwa ajili ya kunakili hazina na udhibiti wa toleo.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git kawaida husanidiwa awali, lakini unaweza kufanya upya kupitia Homebrew
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. Sakinisha VS Code

Visual Studio Code hutoa mazingira ya maendeleo yaliyojumuishwa na msaada wa MCP.

#### Ufungaji

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### Usanidi wa Vikiongezi Vinavyohitajika

Sakinisha vikiongezi hivi vya VS Code:  

```bash
# Sakinisha kupitia mstari wa amri
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
Au sakinisha kupitia VS Code:  
1. Fungua VS Code  
2. Nenda kwenye Vikiongezi (Ctrl+Shift+X)  
3. Sakinisha:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Sakinisha Python

Python 3.8+ inahitajika kwa maendeleo ya seva ya MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Kutumia Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### Thibitisha Ufungaji

```bash
python --version  # Inapaswa kuonyesha Python 3.11.x
pip --version      # Inapaswa kuonyesha toleo la pip
```
  
## 🚀 Usanidi wa Mradi

### 1. Nakili Hazina

```bash
# Nakili hifadhi kuu
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Elekea kwenye saraka ya mradi
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Thibitisha muundo wa hifadhi
ls -la
```
  
### 2. Unda Mazingira Pepe ya Python

```bash
# Unda mazingira pepe
python -m venv mcp-env

# Washa mazingira pepe
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Sasisha pip
python -m pip install --upgrade pip
```
  
### 3. Sakinisha Mipangilio ya Python

```bash
# Sakinisha utegemezi wa maendeleo
pip install -r requirements.lock.txt

# Thibitisha vifurushi muhimu
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Deployment ya Rasilimali za Azure

### 1. Elewa Mahitaji ya Rasilimali

Seva yetu ya MCP inahitaji rasilimali hizi za Azure:  

| **Rasilimali** | **Madhumuni** | **Gharama Inakadiriwa** |  
|--------------|-------------|-------------------|  
| **Microsoft Foundry** | Kuendesha na kusimamia modeli za AI | $10-50/kila mwezi |  
| **OpenAI Deployment** | Modeli ya kuingiza maandishi (text-embedding-3-small) | $5-20/kila mwezi |  
| **Application Insights** | Ufuatiliaji na telemetry | $5-15/kila mwezi |  
| **Resource Group** | Kuandaa rasilimali | Bure |  

### 2. Tumia Rasilimali za Azure

#### Chaguo A: Deployment ya Moja kwa Moja (Inapendekezwa)

```bash
# Elekea kwa saraka ya miundombinu
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
Script ya deployment itafanya:  
1. Kuunda kizuizi cha rasilimali chenye kipekee  
2. Kutoa rasilimali za Microsoft Foundry  
3. Kutoa modeli ya text-embedding-3-small  
4. Kuanzisha Application Insights  
5. Kuunda mtoa huduma kuu kwa uthibitishaji  
6. Kutengeneza faili `.env` yenye mipangilio  

#### Chaguo B: Deployment ya Mikono

Ikiwa unapendelea udhibiti wa mikono au script ya moja kwa moja imeshindwa:  

```bash
# Weka vigezo
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Unda kikundi cha rasilimali
az group create --name $RESOURCE_GROUP --location $LOCATION

# Sambaza templeti kuu
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Thibitisha Deployment ya Azure

```bash
# Angalia kundi la rasilimali
az group show --name $RESOURCE_GROUP --output table

# Orodhesha rasilimali zilizowekwa
az resource list --resource-group $RESOURCE_GROUP --output table

# Jaribu huduma ya AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. Sanidi Vigezo vya Mazingira

Baada ya deployment, utakuwa na faili `.env`. Thibitisha inajumuisha:  

```bash
# Yaliyomo kwenye faili la .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Usanidi wa hifadhidata (kwa ajili ya maendeleo)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Usanidi wa Mazingira ya Docker

### 1. Elewa Muundo wa Docker

Mazungumzo yetu ya maendeleo hutumia Docker Compose:  

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
  
### 2. Anzisha Mazingira ya Maendeleo

```bash
# Hakikisha uko katika saraka kuu ya mradi
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Anzisha huduma
docker-compose up -d

# Angalia hali ya huduma
docker-compose ps

# Tazama kumbukumbu za shughuli
docker-compose logs -f
```
  
### 3. Thibitisha Usanidi wa Hifadhidata

```bash
# Unganisha kwenye kontena la PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Angalia muundo wa hifadhidata
\dt retail.*

# Thibitisha data ya mfano
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Toka PostgreSQL
\q
```
  
### 4. Jaribu Seva ya MCP

```bash
# Angalia afya ya seva ya MCP
curl http://localhost:8000/health

# Jaribu sehemu ya msingi ya MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 Mipangilio ya VS Code

### 1. Sanidi Muungano wa MCP

Tengeneza usanidi wa VS Code MCP:  

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
  
### 2. Sanidi Mazingira ya Python

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
  
### 3. Jaribu Muunganisho wa VS Code

1. **Fungua mradi katika VS Code**:  
   ```bash
   code .
   ```
  
2. **Fungua AI Chat**:  
   - Bonyeza `Ctrl+Shift+P` (Windows/Linux) au `Cmd+Shift+P` (macOS)  
   - Andika "AI Chat" na chagua "AI Chat: Open Chat"  

3. **Jaribu Muunganisho wa Seva ya MCP**:  
   - Katika AI Chat, andika `#zava` na chagua moja ya seva zilizosanidiwa  
   - Uliza: "Meza zipi zinapatikana katika hifadhidata?"  
   - Unapaswa kupokea jibu lenye orodha ya meza za hifadhidata ya rejareja  

## ✅ Uthibitisho wa Mazingira

### 1. Ukaguzi Kamili wa Mfumo

Endesha script hii ya uthibitisho kuthibitisha usanidi wako:  

```bash
# Unda script ya uthibitisho
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
    
    # Angalia toleo la Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Angalia vifurushi vinavyohitajika
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Angalia Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Angalia Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Angalia vigezo vya mazingira
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
    
    # Angalia muunganisho wa hifadhidata
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Jaribu uchunguzi
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
    
    # Angalia seva ya MCP
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
    
    # Angalia huduma ya Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Hii itashindwa ikiwa vyeti si sahihi
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

# Endesha uthibitisho
python validate_setup.py
```
  
### 2. Orodha ya Uthibitisho wa Mikono

**✅ Zana za Msingi**  
- [ ] Toleo la Docker 20.10+ limewekwa na linaendesha  
- [ ] Azure CLI 2.40+ limewekwa na umeingia  
- [ ] Python 3.8+ na pip vimewekwa  
- [ ] Git 2.30+ limewekwa  
- [ ] VS Code na vikiongezi vinavyohitajika vimewekwa  

**✅ Rasilimali za Azure**  
- [ ] Kundi la rasilimali limetengenezwa kwa mafanikio  
- [ ] Mradi wa AI Foundry umetangazwa  
- [ ] Modeli ya OpenAI text-embedding-3-small imetangazwa  
- [ ] Application Insights imesanidiwa  
- [ ] Mtoa huduma kuu amezalishwa na ruhusa sahihi  

**✅ Usanidi wa Mazingira**  
- [ ] Faili `.env` limetengenezwa na vigezo vyote vinavyohitajika  
- [ ] Sifa za Azure zinafanya kazi (jaribu kwa `az account show`)  
- [ ] Kontena la PostgreSQL linaendesha na lina ufikiaji  
- [ ] Data ya sampuli imewekwa kwenye hifadhidata  

**✅ Muungano wa VS Code**  
- [ ] `.vscode/mcp.json` imesanidiwa  
- [ ] Tafsiri ya Python imesanidiwa kwa mazingira pepe  
- [ ] Seva za MCP zinaonekana katika AI Chat  
- [ ] Unaweza kutekeleza maswali ya majaribio kupitia AI Chat  

## 🛠️ Kutatua Matatizo ya Kawaida

### Matatizo ya Docker

**Tatizo**: Kontena za Docker hazianzi  
```bash
# Angalia hali ya huduma ya Docker
docker info

# Angalia rasilimali zinazopatikana
docker system df

# Safisha ikiwa inahitajika
docker system prune -f

# Anzisha upya Docker Desktop (Windows/macOS)
# Au anzisha upya huduma ya Docker (Linux)
sudo systemctl restart docker
```
  
**Tatizo**: Muunganisho wa PostgreSQL haufaniki  
```bash
# Angalia kumbukumbu za kontena
docker-compose logs postgres

# Thibitisha kontena iko katika hali nzuri
docker-compose ps

# Jaribu muunganisho wa moja kwa moja
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Matatizo ya Deployment ya Azure

**Tatizo**: Deployment ya Azure haifanyi kazi  
```bash
# Angalia uthibitishaji wa CLI ya Azure
az account show

# Thibitisha ruhusa za usajili
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Angalia usajili wa mtoa huduma wa rasilimali
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Tatizo**: Uthibitishaji wa huduma ya AI haufaniki  
```bash
# Jaribu mhusika wa huduma
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Thibitisha uanzishaji wa huduma ya AI
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Matatizo ya Mazingira ya Python

**Tatizo**: Kufunga kifurushi kashindikana  
```bash
# Boresha pip na setuptools
python -m pip install --upgrade pip setuptools wheel

# Futa cache ya pip
pip cache purge

# Sakinisha vifurushi moja moja ili kubaini matatizo
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Tatizo**: VS Code haipati tafsiri ya Python  
```bash
# Onyesha njia za interpreter ya Python
which python  # macOS/Linux
where python  # Windows

# Washa mazingira ya kweli kwanza
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Kisha fungua VS Code
code .
```
  
## 🎯 Vidokezo Muhimu

Baada ya kukamilisha maabara hii, unapaswa kuwa na:

✅ **Mazingira Kamili ya Maendeleo**: Zana zote zimewekwa na kusanidiwa  
✅ **Rasilimali za Azure Zimetangazwa**: Huduma za AI na miundombinu ya ziada  
✅ **Mazingira ya Docker Yanaendesha**: Kontena za PostgreSQL na seva ya MCP  
✅ **Muungano wa VS Code**: Seva za MCP zimepangiwa na zinapatikana  
✅ **Usanidi Umehifadhiwa**: Vipengele vyote vimejaribiwa na kufanya kazi pamoja  
✅ **Maarifa ya Kutatua Matatizo**: Masuala na suluhisho za kawaida  

## 🚀 Nini Kifuatao

Mazingira yako yakiwa tayari, endelea na **[Maabara 04: Ubunifu na Mchoro wa Hifadhidata](../04-Database/README.md)** ili:

- Kuchunguza mchoro wa hifadhidata ya rejareja kwa undani  
- Kuelewa uundaji wa data kwa wamiliki wengi  
- Kujifunza kuhusu utekelezaji wa Usalama wa Kiwango cha Safu  
- Kufanya kazi na data ya sampuli ya rejareja  

## 📚 Rasilimali Zaidi

### Zana za Maendeleo
- [Nyaraka za Docker](https://docs.docker.com/) - Marejeleo kamili ya Docker  
- [Marejeleo ya Azure CLI](https://docs.microsoft.com/cli/azure/) - Amri za Azure CLI  
- [Nyaraka za VS Code](https://code.visualstudio.com/docs) - Usanidi wa mhariri na vikiongezi  

### Huduma za Azure
- [Nyaraka za Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Usanidi wa huduma za AI  
- [Huduma ya Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Deployment ya modeli za AI  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Usanidi wa ufuatiliaji  

### Maendeleo ya Python
- [Mazingira Pepe ya Python](https://docs.python.org/3/tutorial/venv.html) - Usimamizi wa mazingira  
- [Nyaraka za AsyncIO](https://docs.python.org/3/library/asyncio.html) - Mifumo ya programu zisizo za kuzingatia ulinde  
- [Nyaraka za FastAPI](https://fastapi.tiangolo.com/) - Mifumo ya fremu za wavuti  

---

**Ifuatayo**: Mazingira yakiwa tayari? Endelea na [Maabara 04: Ubunifu na Mchoro wa Hifadhidata](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Kionyozo**:
Hati hii imetafsiriwa kwa kutumia huduma ya tafsiri ya AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ingawa tunajitahidi kupata usahihi, tafadhali fahamu kwamba tafsiri za kiotomatiki zinaweza kuwa na makosa au upungufu wa usahihi. Hati ya asili katika lugha yake halisi inapaswa kuchukuliwa kama chanzo cha mamlaka. Kwa taarifa muhimu, tafsiri ya kitaalamu inayofanywa na binadamu inapendekezwa. Hatutojibu kwa kuelewa vibaya au tafsiri potofu zinazotokea kutokana na matumizi ya tafsiri hii.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->