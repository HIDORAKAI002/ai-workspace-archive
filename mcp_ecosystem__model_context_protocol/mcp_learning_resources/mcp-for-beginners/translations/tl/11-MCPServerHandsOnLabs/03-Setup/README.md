# Environment Setup

## 🎯 Ano Ang Sakop Ng Lab Na Ito

Ginagabayan ka ng hands-on na lab na ito sa pag-setup ng kompletong development environment para sa pagbuo ng MCP servers na may PostgreSQL integration. Iko-configure mo lahat ng kailangang tools, ide-deploy ang mga Azure resources, at ivavalidate ang iyong setup bago magpatuloy sa implementasyon.

## Pangkalahatang-ideya

Mahalaga ang maayos na development environment para sa matagumpay na pagbuo ng MCP server. Nagbibigay ang lab na ito ng hakbang-hakbang na mga tagubilin para sa pag-setup ng Docker, Azure services, development tools, at pag-validate na gumagana nang tama ang lahat nang magkakasama.

Sa pagtatapos ng lab na ito, magkakaroon ka ng ganap na gumaganang development environment na handang gamitin sa pagbuo ng Zava Retail MCP server.

## Mga Layunin ng Pagkatuto

Sa pagtatapos ng lab na ito, magagawa mong:

- **I-install at i-configure** lahat ng kinakailangang development tools
- **Mag-deploy ng Azure resources** para sa MCP server
- **Mag-setup ng Docker containers** para sa PostgreSQL at MCP server
- **I-validate** ang iyong environment setup gamit ang mga test connections
- **Mag-troubleshoot** ng mga karaniwang problema sa setup at configuration
- **Maunawaan** ang development workflow at istruktura ng mga file

## 📋 Tseklist Para sa Mga Kinakailangan

Bago magsimula, siguraduhing mayroon ka ng:

### Kaalamang Kinakailangan
- Pangunahing gamit ng command line (Windows Command Prompt/PowerShell)
- Pag-unawa sa environment variables
- Kaalaman sa Git version control
- Pangunahing konsepto ng Docker (containers, images, volumes)

### Mga Kinakailangan sa Sistema
- **Operating System**: Windows 10/11, macOS, o Linux
- **RAM**: Minimum na 8GB (inirerekomendang 16GB)
- **Storage**: Hindi bababa sa 10GB na libreng espasyo
- **Network**: Internet connection para sa pag-download at Azure deployment

### Mga Kinakailangan sa Account
- **Azure Subscription**: Sapat na ang free tier
- **GitHub Account**: Para sa pag-access ng repository
- **Docker Hub Account**: (Opsyonal) Para sa custom image publishing

## 🛠️ Pag-install ng Mga Tools

### 1. I-install ang Docker Desktop

Nagbibigay ang Docker ng containerized na environment para sa ating development setup.

#### Windows Installation

1. **I-download ang Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **I-install at I-configure**:
   - Patakbuhin ang installer bilang Administrator
   - I-enable ang WSL 2 integration kapag humiling
   - I-restart ang iyong computer pagkatapos ng installation

3. **I-verify ang Installation**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS Installation

1. **I-download at I-install**:
   ```bash
   # I-download mula sa https://desktop.docker.com/mac/stable/Docker.dmg
   # O gamitin ang Homebrew
   brew install --cask docker
   ```

2. **Simulan ang Docker Desktop**:
   - Buksan ang Docker Desktop mula sa Applications
   - Kumpletuhin ang initial setup wizard

3. **I-verify ang Installation**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux Installation

1. **I-install ang Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Mag-log out at mag-log in muli para maging epektibo ang mga pagbabago sa grupo
   ```

2. **I-install ang Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. I-install ang Azure CLI

Pinapagana ng Azure CLI ang deployment at pamamahala ng Azure resources.

#### Windows Installation

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS Installation

```bash
# Paggamit ng Homebrew
brew install azure-cli

# O paggamit ng installer
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux Installation

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### I-verify at Mag-authenticate

```bash
# Suriin ang pag-install
az version

# Mag-login sa Azure
az login

# Itakda ang default na subscription (kung marami kang subscription)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. I-install ang Git

Kinakailangan ang Git para sa pag-clone ng repository at version control.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Karaniwang naka-install na ang Git, ngunit maaari mo itong i-update gamit ang Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. I-install ang VS Code

Nagbibigay ang Visual Studio Code ng integrated development environment na may suporta sa MCP.

#### Installation

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Kinakailangang Extensions

I-install ang mga sumusunod na VS Code extensions:

```bash
# Mag-install gamit ang command line
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

O i-install sa loob ng VS Code:
1. Buksan ang VS Code
2. Pumunta sa Extensions (Ctrl+Shift+X)
3. I-install:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. I-install ang Python

Kinakailangan ang Python 3.8+ para sa pag-develop ng MCP server.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Paggamit ng Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### I-verify ang Installation

```bash
python --version  # Dapat magpakita ng Python 3.11.x
pip --version      # Dapat magpakita ng bersyon ng pip
```

## 🚀 Pag-setup ng Projekto

### 1. I-clone ang Repository

```bash
# I-clone ang pangunahing repositoryo
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Pumunta sa direktoryo ng proyekto
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Suriin ang estruktura ng repositoryo
ls -la
```

### 2. Gumawa ng Python Virtual Environment

```bash
# Gumawa ng virtual na kapaligiran
python -m venv mcp-env

# I-activate ang virtual na kapaligiran
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# I-upgrade ang pip
python -m pip install --upgrade pip
```

### 3. I-install ang Mga Dependencies ng Python

```bash
# I-install ang mga development dependencies
pip install -r requirements.lock.txt

# Suriin ang mga pangunahing pakete
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Pag-deploy ng Azure Resources

### 1. Unawain ang Mga Kinakailangan sa Resources

Kinakailangan ng MCP server namin ang mga sumusunod na Azure resources:

| **Resource** | **Layunin** | **Tinatayang Gastos** |
|--------------|-------------|-----------------------|
| **Microsoft Foundry** | AI model hosting at pamamahala | $10-50/buwan |
| **OpenAI Deployment** | Text embedding model (text-embedding-3-small) | $5-20/buwan |
| **Application Insights** | Monitoring at telemetry | $5-15/buwan |
| **Resource Group** | Organisasyon ng mga resources | Libre |

### 2. Mag-deploy ng Azure Resources

#### Opsyon A: Automated Deployment (Inirerekomenda)

```bash
# Mag-navigate sa direktoryo ng imprastruktura
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Ipapatupad ng deployment script ang:
1. Paglikha ng natatanging resource group
2. Pag-deploy ng Microsoft Foundry resources
3. Pag-deploy ng text-embedding-3-small na modelo
4. Pag-configure ng Application Insights
5. Paglikha ng service principal para sa authentication
6. Pag-generate ng `.env` file na may configuration

#### Opsyon B: Manual Deployment

Kung mas gusto mong kontrolin manually o pumalya ang automated script:

```bash
# Itakda ang mga variable
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Gumawa ng pangkat ng mga resource
az group create --name $RESOURCE_GROUP --location $LOCATION

# I-deploy ang pangunahing template
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. I-verify ang Azure Deployment

```bash
# Suriin ang grupo ng mga resources
az group show --name $RESOURCE_GROUP --output table

# Ilista ang mga na-deploy na resources
az resource list --resource-group $RESOURCE_GROUP --output table

# Subukan ang serbisyo ng AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. I-configure ang Environment Variables

Pagkatapos ng deployment, dapat mayroon kang `.env` file. Tsek kung ito ay naglalaman ng:

```bash
# Nilalaman ng .env file
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Konfigurasyon ng database (para sa pag-unlad)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Pag-setup ng Docker Environment

### 1. Unawain ang Docker Composition

Gumagamit ang development environment namin ng Docker Compose:

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

### 2. Simulan ang Development Environment

```bash
# Siguraduhing nasa root directory ng proyekto ka
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Simulan ang mga serbisyo
docker-compose up -d

# Suriin ang status ng serbisyo
docker-compose ps

# Tingnan ang mga log
docker-compose logs -f
```

### 3. I-verify ang Setup ng Database

```bash
# Kumonekta sa PostgreSQL container
docker-compose exec postgres psql -U postgres -d zava

# Suriin ang istruktura ng database
\dt retail.*

# Beripikahin ang sample na data
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Lumabas sa PostgreSQL
\q
```

### 4. Subukan ang MCP Server

```bash
# Suriin ang kalusugan ng MCP server
curl http://localhost:8000/health

# Subukan ang pangunahing MCP endpoint
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Pag-configure ng VS Code

### 1. I-configure ang MCP Integration

Gumawa ng VS Code MCP configuration:

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

### 2. I-configure ang Python Environment

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

### 3. Subukan ang VS Code Integration

1. **Buksan ang proyekto sa VS Code**:
   ```bash
   code .
   ```

2. **Buksan ang AI Chat**:
   - Pindutin ang `Ctrl+Shift+P` (Windows/Linux) o `Cmd+Shift+P` (macOS)
   - I-type ang "AI Chat" at piliin ang "AI Chat: Open Chat"

3. **Subukan ang MCP Server Connection**:
   - Sa AI Chat, i-type ang `#zava` at piliin ang isa sa mga naka-configure na server
   - Itanong: "Anong mga table ang available sa database?"
   - Dapat kang makatanggap ng sagot na naglalaman ng mga retail database tables

## ✅ Pag-validate ng Kapaligiran

### 1. Komprehensibong Pagsusuri ng Sistema

Patakbuhin ang validation script na ito para i-verify ang iyong setup:

```bash
# Gumawa ng script para sa beripikasyon
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
    
    # Suriin ang bersyon ng Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Suriin ang mga kinakailangang pakete
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Suriin ang Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Suriin ang Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Suriin ang mga environment variable
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
    
    # Suriin ang koneksyon sa database
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Subukan ang query
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
    
    # Suriin ang MCP server
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
    
    # Suriin ang Azure AI service
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Mabibigo ito kung mali ang mga kredensyal
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

# Patakbuhin ang beripikasyon
python validate_setup.py
```

### 2. Tseklist para sa Manwal na Pag-validate

**✅ Pangunahing Mga Tools**
- [ ] Naka-install at gumagana ang Docker bersyon 20.10+
- [ ] Nakainstall at authenticated ang Azure CLI 2.40+
- [ ] Naka-install ang Python 3.8+ kasama ang pip
- [ ] Naka-install ang Git 2.30+
- [ ] Naka-install ang VS Code kasama ang kinakailangang extensions

**✅ Azure Resources**
- [ ] Matagumpay ang paglikha ng resource group
- [ ] Na-deploy ang AI Foundry project
- [ ] Na-deploy ang OpenAI text-embedding-3-small model
- [ ] Na-configure ang Application Insights
- [ ] Nalikha ang service principal na may tamang permiso

**✅ Configuration ng Kapaligiran**
- [ ] Nalikha ang `.env` file na may lahat ng kinakailangang variables
- [ ] Gumagana ang Azure credentials (subukang `az account show`)
- [ ] Tumakbo at na-access ang PostgreSQL container
- [ ] Nakapag-load ng sample data sa database

**✅ Integrasyon ng VS Code**
- [ ] Na-configure ang `.vscode/mcp.json`
- [ ] Nag-set ng Python interpreter sa virtual environment
- [ ] Lumalabas ang MCP servers sa AI Chat
- [ ] Nakakapag-execute ng test queries sa pamamagitan ng AI Chat

## 🛠️ Pag-troubleshoot ng Karaniwang Mga Isyu

### Mga Isyu sa Docker

**Problema**: Hindi nagsisimula ang mga Docker containers  
```bash
# Suriin ang status ng Docker service
docker info

# Suriin ang magagamit na mga resources
docker system df

# Linisin kung kinakailangan
docker system prune -f

# I-restart ang Docker Desktop (Windows/macOS)
# O i-restart ang Docker service (Linux)
sudo systemctl restart docker
```
  
**Problema**: Nabibigo ang koneksyon sa PostgreSQL  
```bash
# Suriin ang mga log ng lalagyan
docker-compose logs postgres

# Tiyakin na malusog ang lalagyan
docker-compose ps

# Subukan ang direktang koneksyon
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Mga Isyu sa Azure Deployment

**Problema**: Nabibigo ang Azure deployment  
```bash
# Suriin ang Azure CLI pagpapatotoo
az account show

# Patunayan ang mga permiso sa subscription
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Suriin ang pagpaparehistro ng resource provider
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Problema**: Nabibigo ang AI service authentication  
```bash
# Subukan ang service principal
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Suriin ang deployment ng AI service
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Mga Isyu sa Python Environment

**Problema**: Nabibigo ang pag-install ng package  
```bash
# I-upgrade ang pip at setuptools
python -m pip install --upgrade pip setuptools wheel

# Linisin ang cache ng pip
pip cache purge

# I-install ang mga pakete isa-isa upang matukoy ang mga problema
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Problema**: Hindi makita ng VS Code ang Python interpreter  
```bash
# Ipakita ang mga landas ng Python interpreter
which python  # macOS/Linux
where python  # Windows

# I-activate muna ang virtual environment
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Pagkatapos ay buksan ang VS Code
code .
```
  
## 🎯 Mga Pangunahing Punto

Pagkatapos makumpleto ang lab na ito, dapat ay mayroon ka:

✅ **Kompletong Development Environment**: Lahat ng tools naka-install at naka-configure  
✅ **Na-deploy na Azure Resources**: AI services at mga sumusuportang infrastructure  
✅ **Tumatakbong Docker Environment**: PostgreSQL at MCP server containers  
✅ **Integrasyon ng VS Code**: MCP servers naka-configure at naa-access  
✅ **Na-validate na Setup**: Lahat ng bahagi nasubukan at nagtutulungan  
✅ **Kaalaman sa Pag-troubleshoot**: Karaniwang problema at solusyon  

## 🚀 Ano Ang Susunod

Kapag handa na ang iyong environment, magpatuloy sa **[Lab 04: Database Design and Schema](../04-Database/README.md)** upang:

- Tuklasin nang detalyado ang retail database schema
- Unawain ang multi-tenant data modeling
- Matutunan ang implementasyon ng Row Level Security
- Magtrabaho gamit ang mga sample retail data

## 📚 Karagdagang Mga Resources

### Mga Development Tools
- [Docker Documentation](https://docs.docker.com/) - Kumpletong sanggunian ng Docker  
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/) - Mga utos ng Azure CLI  
- [VS Code Documentation](https://code.visualstudio.com/docs) - Configuration ng editor at mga extensions  

### Azure Services
- [Microsoft Foundry Documentation](https://docs.microsoft.com/azure/ai-foundry/) - Configuration ng AI service  
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - Pag-deploy ng AI model  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Setup ng monitoring  

### Python Development
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) - Pamamahala ng environment  
- [AsyncIO Documentation](https://docs.python.org/3/library/asyncio.html) - Mga pattern sa async programming  
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Mga pattern ng web framework  

---

**Susunod**: Handang na ba ang environment? Magpatuloy sa [Lab 04: Database Design and Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Pagtatanggi**:
Ang dokumentong ito ay isinalin gamit ang serbisyo ng AI translation na [Co-op Translator](https://github.com/Azure/co-op-translator). Bagama't nagsusumikap kami para sa katumpakan, pakatandaan na ang awtomatikong pagsasalin ay maaaring maglaman ng mga pagkakamali o hindi pagkakatugma. Ang orihinal na dokumento sa orihinal nitong wika ang dapat ituring na pangunahing sanggunian. Para sa mahahalagang impormasyon, inirerekomenda ang propesyonal na pagsasalin ng tao. Hindi kami mananagot sa anumang maling pagkakaintindi o maling interpretasyon na nagmula sa paggamit ng pagsasaling ito.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->