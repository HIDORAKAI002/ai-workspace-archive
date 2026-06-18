# சூழல் அமைப்பு

## 🎯 இந்த ஆய்வகம் என்னவை உள்ளடக்கியது

இந்த கருவிப்பயிற்சி MCP சேவையகங்களை PostgreSQL ஒருங்கிணைப்புடன் உருவாக்கம் செய்வதற்கான முழுமையான மேம்பாட்டு சூழலை உருவாக்க வழிகாட்டுகிறது. தேவையான அனைத்து கருவிகளையும் கட்டமைக்கவும், Azure வளங்களை பராமரிக்கவும், உங்கள் அமைப்பை செயல்படுத்துவதற்கு முன் சரிபார்க்கவும் செய்யப்படும்.

## கண்ணோட்டம்

ஒரு சரியான மேம்பாட்டு சூழல் MCP சேவையக மேம்பாட்டிற்கு முடிவு செய்கிறது. இந்த ஆய்வகம் Docker, Azure சேவைகள் மற்றும் மேம்பாட்டு கருவிகள் அமைத்தல், மற்றும் அனைத்தும் சரியாக ஒருங்கிணைக்கப்பட்டுள்ளதா என்பது உறுதிப்படுத்துவதற்கான படிநிலை வழிகாட்டுதல்களை வழங்குகிறது.

இந்த ஆய்வகத்தின் முடிவில், நீங்கள் Zava Retail MCP சேவையகத்தை உருவாக்கும் பொழுது முழுமையான செயல்பாடுள்ள சூழலை பெற்றிருப்பீர்கள்.

## கற்றல் குறிக்கோள்கள்

இந்த ஆய்வகத்தின் முடிவில், நீங்கள்:

- **தேவையான அனைத்து மேம்பாட்டு கருவிகளையும் நிறுவி கட்டமைக்க**ும்
- **MCP சேவையகத்திற்கு தேவையான Azure வளங்களை பராமரி**ல்
- **PostgreSQL மற்றும் MCP சேவையகத்திற்கு Docker கொண்டெயினர்கள் அமைக்க**ும்
- **உங்கள் சூழல் அமைப்பை சோதனை இணைப்புகளுடன் சரிபார்க்க**ும்
- **அடிக்கடி நேரிடும் அமைப்பு பிரச்சனைகள் மற்றும் கட்டமைப்பு சிக்கல்களை தீர்க்க**ும்
- **மேம்பாட்டு வேலைப்பாடுகள் மற்றும் கோப்பு அமைப்பை புரிந்து கொள்**க்கும்

## 📋 முன்னோட்டங்கள் சோதனை

தொடங்குவதற்கு முன், இது உள்ளதா என்று உறுதி செய்யவும்:

### தேவையான அறிவு
- அடிப்படை கமாண்ட் லைன் பயன்பாடு (Windows முகவரி/PowerShell)
- சூழல் மாறிலிகள் பற்றிய புரிதல்
- Git பதிப்பு கட்டுப்பாட்டில் பரிச்சயம்
- அடிப்படை Docker கருத்துக்கள் (கொண்டெயினர்கள், படங்கள், தொகுதிகள்)

### அமைப்பு தேவைகள்
- **சிஸ்டம் இயங்கும்**: Windows 10/11, macOS, அல்லது Linux
- **RAM**: குறைந்தபட்சம் 8GB (16GB பரிந்துரைக்கப்படுகிறது)
- **சேமிப்பு**: குறைந்தது 10GB காப்பிட இடம்
- **இணையம்**: பதிவிறக்கம் மற்றும் Azure பராமரிப்பிற்கு இணைப்பு

### கணக்கு தேவைகள்
- **Azure சந்தா**: இலவச கட்டம் போதும்
- **GitHub கணக்கு**: நிரல்கோப்பு அணுகல்
- **Docker Hub கணக்கு**: (கட்டாயமற்றது) தனிப்பயன் படங்களை வெளியிட

## 🛠️ கருவி நிறுவல்

### 1. Docker Desktop நிறுவுதல்

Docker நம் மேம்பாட்டு சூழலுக்கான கொண்டெய்னரை வழங்குகிறது.

#### Windows நிறுவல்

1. **Docker Desktop பதிவிறக்கம் செய்க**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **நிறுவி மற்றும் கட்டமைக்கவும்**:
   - நிறுவியை நிர்வாகியாய் இயக்கவும்
   - கேட்டால் WSL 2 ஒருங்கிணைப்பை இயக்கு
   - நிறுவல் முடிந்தவுடன் கணினியை மறுதொடக்கம் செய்க

3. **நிறுவல் சரிபார்க்கவும்**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS நிறுவல்

1. **பதிவிறக்கம் செய்து நிறுவுக**:
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg இருந்து பதிவிறக்கு
   # அல்லது Homebrew ஐ பயன்படுத்தவும்
   brew install --cask docker
   ```

2. **Docker Desktop துவக்கவும்**:
   - பயன்பாடுகளிலிருந்து Docker Desktop தொடங்கு
   - துவக்க அமைப்புக் கலைஞரை முடிக்கவும்

3. **நிறுவல் சரிபார்க்கவும்**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux நிறுவல்

1. **Docker இயந்திரம் நிறுவுக**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # குழு மாற்றங்கள் செயல்பட வெளியேறி மீண்டும் உள்நுழையவும்
   ```

2. **Docker Compose நிறுவுக**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI நிறுவல்

Azure CLI Azure வள பராமரிப்பு மற்றும் பரவலாக்கம் செய்ய உதவுகிறது.

#### Windows நிறுவல்

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS நிறுவல்

```bash
# ஹோம்ப்ரூவை பயன்படுத்துதல்
brew install azure-cli

# அல்லது நிறுவலரை பயன்படுத்துதல்
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux நிறுவல்

```bash
# உபுண்டு/டெபியன்
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/சென்ட்ஓஎஸ்
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### சரிபார்த்து அங்கீகாரம் பெறுக

```bash
# நிறுவலைச் சரிபார்க்கவும்
az version

# Azure-ல் உள்நுழைக
az login

# இயல்புநிலை சந்தாவை அமைக்கவும் (நீங்கள் பல இருந்தால்)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git நிறுவல்

Git நிரல்கோப்புகளை முகாமை செய்வதற்கும் பதிப்பு கட்டுப்பாட்டிற்கும் தேவை.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git பொதுவாக முன்பே நிறுவப்பட்டிருக்கும், ஆனால் நீங்கள் Homebrew மூலம் புதுப்பிக்கலாம்
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. VS Code நிறுவல்

Visual Studio Code MCP ஆதரவுடன் ஒருங்கிணைந்த மேம்பாட்டு சூழலை வழங்குகிறது.

#### நிறுவல்

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### தேவையான நீட்சிகள்

இந்த VS Code நீட்சிகளை நிறுவவும்:

```bash
# கட்டளை வரி வழியாக நிறுவவும்
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

அல்லது VS Code மூலம் நிறுவவும்:
1. VS Code திறந்து
2. நீட்சிகளுக்குச் செல்லவும் (Ctrl+Shift+X)
3. நிறுவவும்:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python நிறுவல்

MCP சேவையக மேம்பாட்டிற்கு Python 3.8+ தேவை.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# ஹோம் ப்ரூவை பயன்படுத்துதல்
brew install python@3.11
```

#### Linux

```bash
# உபுண்டு/டெபியன்
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# ஆர்ஹெஎல்எல்/சென்டோஎஸ்
sudo dnf install python3.11 python3.11-pip
```

#### நிறுவல் சரிபார்க்கவும்

```bash
python --version  # Python 3.11.x காண்பிக்க வேண்டும்
pip --version      # pip பதிப்பு காண்பிக்க வேண்டும்
```

## 🚀 திட்ட அமைப்பு

### 1. நிரல்கோப்பு களியுங்கள்

```bash
# முக்கிய சேமிப்பகத்தை நகலெடு
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# திட்டக் கோப்புறைக்கு சென்றிடு
cd MCP-Server-and-PostgreSQL-Sample-Retail

# சேமிப்பக அமைப்பை சரிபார்
ls -la
```

### 2. Python மெய்நிகர் சூழலை உருவாக்குக

```bash
# கல்பனையான சூழலை உருவாக்கவும்
python -m venv mcp-env

# கல்பனையான சூழலை செயல்படுத்தவும்
# விண்டோஸ்
mcp-env\Scripts\activate

# மெக்OS/லினக்ஸ்
source mcp-env/bin/activate

# பிப் அப்டேட் செய்க
python -m pip install --upgrade pip
```

### 3. Python சார்புகள் நிறுவுக

```bash
# மேம்பாட்டு சார்புகளைக் நிறுவுக
pip install -r requirements.lock.txt

# முக்கிய பாக்கேஜ்களை உறுதிசெய்க
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure வள பரவலாக்கம்

### 1. வள தேவைகளைப் புரிந்து கொள்

நம் MCP சேவையகத்திற்கு தேவையான Azure வளங்கள்:

| **வளம்** | **பயன்** | **மிகரி செலவு** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI மாதிரி ஹோஸ்டிங் மற்றும் நிர்வாகம் | $10-50/மாதம் |
| **OpenAI Deployment** | உரை கோரிக்கை மாதிரி (text-embedding-3-small) | $5-20/மாதம் |
| **Application Insights** | கண்காணிப்பு மற்றும் தொலைபேசி தகவல் | $5-15/மாதம் |
| **Resource Group** | வள ஒழுங்குமுறை | இலவசம் |

### 2. Azure வளங்களை பரவலாக்குக

#### விருப்பம் A: தானியங்கி பரவலாக்கம் (பரிந்துரைக்கப்பட்டது)

```bash
# கட்டமைப்பு அடைவை நோக்கிச் செல்லவும்
cd infra

# விண்டோஸ் - பவர்ஷெல்
./deploy.ps1

# மேக்ஒஎஸ்/லினக்ஸ் - பாஷ்
./deploy.sh
```

பரவலாக்க ஸ்கிரிப்ட் செய்வது:
1. தனித்துவமான வளக் குழுவை உருவாக்கவும்  
2. Microsoft Foundry வளங்களை பரவலாக்கவும்  
3. text-embedding-3-small மாதிரியை பரவலாக்கவும்  
4. Application Insights-ஐ கட்டமைக்கவும்  
5. அங்கீகாரத்திற்காக சேவை பிரதிநிதியை உருவாக்கவும்  
6. `.env` கோப்பை கட்டமைப்புடன் உருவாக்கவும்  

#### விருப்பம் B: கைமுறை பரவலாக்கம்

தானியங்கி ஸ்கிரிப்ட் தோல்வியுற்றால் அல்லது கைமுறையை விரும்பினால்:

```bash
# மாறிலிகளை அமைக்கவும்
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# வள குழுவை உருவாக்கவும்
az group create --name $RESOURCE_GROUP --location $LOCATION

# பிரதான படிவத்தை பிரசாரம் செய்யவும்
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure பரவலாக்கத்தை சரிபார்க்கவும்

```bash
# வளக் குழுவை சரிபார்க்கவும்
az group show --name $RESOURCE_GROUP --output table

# பிணைக்கப்பட்ட வளங்களை பட்டியலிடவும்
az resource list --resource-group $RESOURCE_GROUP --output table

# AI சேவையை சோதிக்கவும்
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. சூழல் மாறிலிகளை கட்டமைக்கவும்

பரவலாக்கம் முடிந்ததும், `.env` கோப்பை பெற்றிருப்பீர்கள். அதில் உள்ளதை சரிபார்க்கவும்:

```bash
# .env கோப்பு உள்ளடக்கம்
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# தரவுத்தள கட்டமைப்பு (முன்னேற்றத்துக்காக)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker சூழல் அமைப்பு

### 1. Docker அமைப்பை புரிந்து கொள்

நம் மேம்பாட்டு சூழல் Docker Compose இயங்குகிறது:

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

### 2. மேம்பாட்டு சூழலை துவக்குக

```bash
# நீங்கள் திட்ட மூல அடைவரிசையில் உள்ளீர்கள் என்பதை உறுதி செய்யுங்கள்
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# சேவைகளை துவங்குங்கள்
docker-compose up -d

# சேவை நிலையை சரிபார்க்கவும்
docker-compose ps

# பதிவுகளை பார்வையிடவும்
docker-compose logs -f
```

### 3. தரவுத்தள அமைப்பை சரிபார்க்கவும்

```bash
# PostgreSQL Контейнерுடன் இணைக்கவும்
docker-compose exec postgres psql -U postgres -d zava

# தரவுத்தள அமைப்பை சரிபார்க்கவும்
\dt retail.*

# மாதிரி தரவை உறுதிப்படுத்தவும்
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL ஐ விட்டு வெளியேறு
\q
```

### 4. MCP சேவையகத்தை சோதனையிடுக

```bash
# MCP சேவையகத்தின் ஆரோக்கியத்தை சரிபார்க்கவும்
curl http://localhost:8000/health

# அடிப்படை MCP இடைமுகத்தை சோதிக்கவும்
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code கட்டமைப்பு

### 1. MCP ஒருங்கிணைப்பை கட்டமைக்கவும்

VS Code MCP கட்டமைப்பை உருவாக்கவும்:

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

### 2. Python சூழலை கட்டமைக்கவும்

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

### 3. VS Code ஒருங்கிணைப்பை சோதிக்கவும்

1. **திட்டத்தை VS Code-ல் திறக்கவும்**:
   ```bash
   code .
   ```

2. **AI உரையாடலைத் திறக்கவும்**:
   - `Ctrl+Shift+P` (Windows/Linux) அல்லது `Cmd+Shift+P` (macOS) அழுத்தவும்
   - "AI Chat" என தட்டச்சு செய்து "AI Chat: Open Chat" தேர்ந்தெடுக்கவும்

3. **MCP சேவையக இணைப்பை சோதிக்கவும்**:
   - AI உரையாடலில் `#zava` எனத் தட்டச்சு செய்து உள்ளமைக்கப்பட்ட சேவையகங்களில் ஒன்றை தேர்ந்தெடுக்கவும்
   - கேளுங்கள்: "தரவுத்தளத்தில் எத்தனை அட்டவணைகள் உள்ளன?"
   - உங்களுக்கு சில்லறை தரவுத்தள அட்டவணைகளின் பட்டியலை பெறுவீர்கள்

## ✅ சூழல் சரிபார்ப்பு

### 1. முழுமையான சிஸ்டம் சோதனை

உங்கள் அமைப்பை சரிபார்க்க இந்த சரிபார்ப்புச் ஸ்கிரிப்டை இயக்கவும்:

```bash
# அதிர்வெண் ஸ்கிரிப்ட் உருவாக்குக
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
    
    # பைதான் பதிப்பைச் சரிபார்க்கவும்
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # தேவைப்படும் பேக்கேஜ்களைச் சரிபார்க்கவும்
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # டாக்கரைச் சரிபார்க்கவும்
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # அசூர் CLI ஐச் சரிபார்க்கவும்
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # சுற்றுச்சூழல் மாறிலிகளைச் சரிபார்க்கவும்
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
    
    # தரவுத்தள இணைப்பைச் சரிபார்க்கவும்
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # கேள்வி சோதனை
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
    
    # MCP சர்வரைச் சரிபார்க்கவும்
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
    
    # அசூர் AI சேவையைச் சரிபார்க்கவும்
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # அங்கீகாரங்கள் தவறானவையாக இருந்தால் இது தோல்வியடையும்
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

# அதிர்வெண் இயக்குக
python validate_setup.py
```

### 2. கைமுறை சரிபார்ப்பு பட்டியல்

**✅ அடிப்படை கருவிகள்**
- [ ] Docker பதிப்பு 20.10+ நிறுவப்பட்டு ஓடுகிறது
- [ ] Azure CLI 2.40+ நிறுவப்பட்டு அங்கீகாரம் பெற்றது
- [ ] Python 3.8+ மற்றும் pip நிறுவப்பட்டது
- [ ] Git 2.30+ நிறுவப்பட்டது
- [ ] தேவையான நீட்சிகளுடன் VS Code

**✅ Azure வளங்கள்**
- [ ] வளக் குழு வெற்றிகரமாக உருவாக்கப்பட்டது
- [ ] AI Foundry திட்டம் பரவலாக்கப்பட்டது
- [ ] OpenAI text-embedding-3-small மாதிரி பரவலாக்கப்பட்டது
- [ ] Application Insights கட்டமைக்கப்பட்டது
- [ ] சரியான அனுமதிகளுடன் சேவை பிரதிநிதி உருவாக்கப்பட்டது

**✅ சூழல் கட்டமைப்பு**
- [ ] `.env` கோப்பு அனைத்து தேவையான மாறிலிகளுடன் உருவாக்கப்பட்டது
- [ ] Azure அடையாளம் வேலை செய்கிறது (`az account show` மூலம் சோதிக்கவும்)
- [ ] PostgreSQL கொண்டெயினர் ஓடுகிறது மற்றும் அணுகக்கூடியது
- [ ] தரவுத்தளத்தில் மாதிரி தரவு ஏற்றப்பட்டது

**✅ VS Code ஒருங்கிணைப்பு**
- [ ] `.vscode/mcp.json` கட்டமைக்கப்பட்டது
- [ ] Python மாற்றி மொழிபெயர்ப்பாளர் மெய்நிகர் சூழலுக்கு அமைக்கப்பட்டது
- [ ] MCP சேவையகங்கள் AI உரையாடலில் தோற்றுவிக்கும்
- [ ] AI உரையாடல் மூலம் சோதனைக் கேள்விகள் இயங்குகின்றன

## 🛠️ அடிக்கடி நேரிடும் சிக்கல்களுக்கு தீர்வு

### Docker பிரச்சனைகள்

**சிக்கல்**: Docker கொண்டெயினர்கள் துவங்கவில்லை
```bash
# Docker சேவையின் நிலையை சரிபார்க்கவும்
docker info

# கிடைக்கும் வளங்களை சரிபார்க்கவும்
docker system df

# தேவையாயின் சுத்தம் செய்யவும்
docker system prune -f

# Docker டெஸ்க்டாப் (Windows/macOS) மீண்டும் துவக்கவும்
# அல்லது Docker சேவையை (Linux) மீண்டும் துவக்கவும்
sudo systemctl restart docker
```

**சிக்கல்**: PostgreSQL இணைப்பு தோல்வி
```bash
# கட்டகம் பதிவு பதிவு செய்திகளைச் சரிபார்க்கவும்
docker-compose logs postgres

# கட்டகம் ஆரோக்கியமாக உள்ளதா என்பதை உறுதிப்படுத்தவும்
docker-compose ps

# நேரடி இணைப்பை சோதிக்கவும்
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure பரவலாக்க பிரச்சனைகள்

**சிக்கல்**: Azure பரவலாக்க தோல்வி
```bash
# Azure CLI அங்கீகாரத்தை சரிபார்க்கவும்
az account show

# சந்தா அனுமதிகளை சரிபார்க்கவும்
az role assignment list --assignee $(az account show --query user.name -o tsv)

# வள வழங்குநர் பதிவு நிலையை சரிபார்க்கவும்
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**சிக்கல்**: AI சேவை அங்கீகாரம் தோல்வி
```bash
# சேவை பிரதிநிதியை சோதிக்கவும்
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# AI சேவை 배포를 சரிபார்க்கவும்
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python சூழல் பிரச்சனைகள்

**சிக்கல்**: தொகுப்பு நிறுவல் தோல்வி
```bash
# pip மற்றும் setuptools ஐ மேம்படுத்தவும்
python -m pip install --upgrade pip setuptools wheel

# pip கேச் ஐ சுத்தமாக்கவும்
pip cache purge

# பிரச்சனைகளை அடையாளம் காண ஒவ்வொன்றாக தொகுப்புகளை நிறுவவும்
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**சிக்கல்**: VS Code நேர்த்துவாய்ப்பாளர் Python கண்டுபிடிக்கவில்லை
```bash
# பயதான் Interpreter பாதைகளை காட்டு
which python  # மாக்OS/லினக்ஸ்
where python  # விண்டோஸ்

# முதலில் மெய்நிகர் சுற்றுச்சூழலை செயல்படுத்து
source mcp-env/bin/activate  # மாக்OS/லினக்ஸ்
mcp-env\Scripts\activate     # விண்டோஸ்

# பிறகு VS கோட் திறங்கு
code .
```

## 🎯 முக்கியமான புள்ளிகள்

இந்த ஆய்வகத்தை முடித்த பின், நீங்கள் பெற்றிருப்பீர்கள்:

✅ **முழுமையான மேம்பாட்டு சூழல்**: அனைத்து கருவிகளும் நிறுவப்பட்டு கட்டமைக்கப்பட்டவை  
✅ **Azure வளங்கள் பரவலாக்கப்பட்டவை**: AI சேவைகள் மற்றும் ஆதரவுத் தளம்  
✅ **Docker சூழல் இயங்குகிறது**: PostgreSQL மற்றும் MCP சேவையக கொண்டெயிலர்கள்  
✅ **VS Code ஒருங்கிணைப்பு**: MCP சேவையகங்கள் கட்டமைக்கப்பட்டு அணுகக்கூடியவை  
✅ **சரிபார்க்கப்பட்ட அமைப்பு**: அனைத்து கூறுகளும் சோதிக்கப்பட்டு சரியாக இணைக்கப்பட்டவை  
✅ **சிக்கல்-தீர்வு அறிவு**: அடிக்கடி நேரிடும் பிரச்சனைகள் மற்றும் தீர்வுகள்  

## 🚀 அடுத்தடுத்தது என்ன

உங்கள் சூழல் தயார் நிலையில், தொடரவும் **[Lab 04: Database Design and Schema](../04-Database/README.md)**:

- சில்லறை தரவுத்தள அமைப்பை விரிவாக ஆராய்க
- பன்முக வாடிக்கையாளர் தரவுக்கோப்பு மாதிரியை புரிந்து கொள்
- வரிசை நிலை பாதுகாப்பு நடைமுறை பற்றிய கற்றல்
- மாதிரி சில்லறை தரவுகளுடன் வேலை செய்ய

## 📚 கூடுதல் வளங்கள்

### மேம்பாட்டு கருவிகள்
- [Docker ஆவணம்](https://docs.docker.com/) - முழுமையான Docker குறிப்பு
- [Azure CLI குறிப்பு](https://docs.microsoft.com/cli/azure/) - Azure CLI கமாண்டுகள்
- [VS Code ஆவணம்](https://code.visualstudio.com/docs) - தொகுப்பி கட்டமைப்பு மற்றும் நீட்சிகள்

### Azure சேவைகள்
- [Microsoft Foundry ஆவணம்](https://docs.microsoft.com/azure/ai-foundry/) - AI சேவை கட்டமைப்பு
- [Azure OpenAI சேவை](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI மாதிரி பரவலாக்கம்
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - கண்காணிப்பு அமைப்பு

### Python மேம்பாடு
- [Python மெய்நிகர் சூழல்கள்](https://docs.python.org/3/tutorial/venv.html) - சூழல் நிர்வாகம்
- [AsyncIO ஆவணம்](https://docs.python.org/3/library/asyncio.html) - அசிங்க் நிரலாக்க மாதிரிகள்
- [FastAPI ஆவணம்](https://fastapi.tiangolo.com/) - வலை கட்டமைப்பு மாதிரிகள்

---

**அடுத்தது**: சூழல் தயார்? தொடரவும் [Lab 04: Database Design and Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**மறுப்பு**:
இந்த ஆவணம் AI மொழிபெயர்ப்பு சேவை [Co-op Translator](https://github.com/Azure/co-op-translator) பயன்படுத்தி மொழிபெயர்க்கப்பட்டுள்ளது. நாங்கள் துல்லியத்திற்காக முயற்சி செய்துள்ளோம், ஆனால் தானாக செய்யப்படும் மொழிபெயர்ப்புகளில் பிழைகள் அல்லது தவறுகள் இருக்கலாம் என்பதை கவனத்தில் கொள்ளவும். அசல் ஆவணம் அதன் தாய்மொழியில் அதிகாரப்பூர்வ ஆதாரமாக கருதப்பட வேண்டும். முக்கியமான தகவல்களுக்கு, தொழில்நுட்பமான மனித மொழிபெயர்ப்பு பரிந்துரைக்கப்படுகிறது. இந்த மொழிபெயர்ப்பைப் பயன்படுத்துவதால் ஏற்படும் எந்த தவறான புரிதல்கள் அல்லது தவறான விளக்கத்திற்கும் நாங்கள் பொறுப்பில்வில்லை.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->