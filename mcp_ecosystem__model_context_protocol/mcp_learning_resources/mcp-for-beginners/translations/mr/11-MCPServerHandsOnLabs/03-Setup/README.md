# पर्यावरण सेटअप

## 🎯 या लॅबमध्ये काय कव्हर केले आहे

ही हाताळणीची लॅब तुम्हाला MCP सर्व्हर साठी व्यवस्थापित करण्यासाठी एक संपूर्ण विकास पर्यावरण सेट करण्यास मार्गदर्शन करते ज्यात PostgreSQL समाकलन आहे. तुम्ही आवश्यक सर्व साधने कॉन्फिगर कराल, Azure स्त्रोत तैनात कराल, आणि अंमलबजावणीसाठी सुरू करण्यापूर्वी तुमच्या सेटअपची पडताळणी कराल.

## आढावा

योग्य विकास पर्यावरण MCP सर्व्हर विकासासाठी अत्यंत महत्त्वाचे आहे. ही लॅब Docker, Azure सेवा, विकास साधने सेट करण्यासाठी आणि सर्व काही योग्य प्रकारे कार्यान्वित होईल का याची पडताळणी करण्यासाठी टप्प्यात टप्प्यात सूचना देते.

या लॅबच्या शेवटी, तुमच्याकडे Zava Retail MCP सर्व्हर तयार करण्यासाठी पूर्ण कार्यक्षम विकास पर्यावरण तयार असेल.

## शिका उद्दिष्टे

या लॅबच्या शेवटी, तुम्ही सक्षम असाल:

- **सर्व आवश्यक विकास साधने** स्थापित आणि कॉन्फिगर करणे  
- **MCP सर्व्हरसाठी आवश्यक Azure स्त्रोत** तैनात करणे  
- PostgreSQL आणि MCP सर्व्हरसाठी **Docker कंटेनर स्थापित करणे**  
- **परीक्षण कनेक्शनसह तुमच्या पर्यावरण सेटअपची पडताळणी** करणे  
- **सामान्य सेटअप समस्या आणि कॉन्फिगरेशन समस्या** सोडवणे  
- **विकास कार्यप्रवाह आणि फाईल रचनेची समज** प्राप्त करणे  

## 📋 पूर्व-आवश्यकता तपासणी

सुरू करण्यापूर्वी, खात्री करा की तुम्हाकडे आहे:

### आवश्यक ज्ञान
- बेसिक कमांड लाइन वापर (Windows Command Prompt/PowerShell)  
- पर्यावरण बदलांबाबत समज  
- Git व्हर्शन कंट्रोलची माहिती  
- बेसिक Docker संकल्पना (कंटेनर्स, इमेजेस, व्हॉल्युम्स)  

### प्रणाली आवश्यकता
- **ऑपरेटिंग सिस्टम**: Windows 10/11, macOS, किंवा Linux  
- **RAM**: किमान 8GB (16GB शिफारस)  
- **स्टोरेज**: किमान 10GB मोकळी जागा  
- **नेटवर्क**: डाउनलोड्स आणि Azure तैनातीसाठी इंटरनेट कनेक्शन  

### खाते आवश्यकता
- **Azure सबस्क्रिप्शन**: फ्री टियर पुरेशी आहे  
- **GitHub खाते**: रिपॉझिटरी प्रवेशासाठी  
- **Docker Hub खाते**: (ऐच्छिक) कस्टम इमेज प्रकाशित करण्यासाठी  

## 🛠️ साधन इंस्टॉलेशन

### 1. Docker Desktop इंस्टॉल करा

Docker आमच्या विकास सेटअपनेाठी कंटेनराइज्ड वातावरण प्रदान करतो.

#### Windows इंस्टॉलेशन

1. **Docker Desktop डाउनलोड करा**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **इंस्टॉल करा आणि कॉन्फिगर करा**:  
   - इंस्टॉलरला ऍडमिनिस्ट्रेटर म्हणून चालवा  
   - विचारल्यावर WSL 2 समाकलन सक्षम करा  
   - इंस्टॉलेशन पूर्ण झाल्यावर संगणक रीस्टार्ट करा  

3. **इंस्टॉलेशन तपासा**:  
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS इंस्टॉलेशन

1. **डाउनलोड करा आणि इंस्टॉल करा**:  
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg या ठिकाणाहून डाउनलोड करा
   # किंवा Homebrew वापरा
   brew install --cask docker
   ```

2. **Docker Desktop सुरू करा**:  
   - Applications मधून Docker Desktop लाँच करा  
   - प्रथम सेटअप विजार्ड पूर्ण करा  

3. **इंस्टॉलेशन तपासा**:  
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux इंस्टॉलेशन

1. **Docker Engine इंस्टॉल करा**:  
   ```bash
   # उबुन्टू/डेबियन
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # गटातील बदल लागू करण्यासाठी बाहेर निघा आणि पुन्हा लॉगिन करा
   ```

2. **Docker Compose इंस्टॉल करा**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI इंस्टॉल करा

Azure CLI Azure स्त्रोतांच्या तैनाती आणि व्यवस्थापनासाठी आवश्यक आहे.

#### Windows इंस्टॉलेशन

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS इंस्टॉलेशन

```bash
# होमब्रू वापरून
brew install azure-cli

# किंवा इन्स्टॉलर वापरून
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux इंस्टॉलेशन

```bash
# उबंटू/डेबियन
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/सेंटओएस
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### पडताळणी आणि प्रमाणीकरण

```bash
# स्थापना तपासा
az version

# Azure मध्ये लॉगिन करा
az login

# डीफॉल्ट सबस्क्रिप्शन सेट करा (जर तुमच्याकडे एकाहून अधिक आहेत तर)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git इंस्टॉल करा

Git रिपॉझिटरी क्लोन करण्यासाठी आणि व्हर्शन नियंत्रणासाठी आवश्यक आहे.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git सहसा पूर्वीपासून इंस्टॉल असतो, परंतु तुम्ही Homebrew द्वारे अद्ययावत करू शकता
brew install git
```

#### Linux

```bash
# उबंटू/डेबियन
sudo apt update && sudo apt install git

# आरएचईएल/सेंटओएस
sudo dnf install git
```

### 4. VS Code इंस्टॉल करा

Visual Studio Code MCP सपोर्टसह एकत्रित विकास वातावरण प्रदान करतो.

#### इंस्टॉलेशन

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### आवश्यक विस्तार

या VS Code विस्तार इंस्टॉल करा:

```bash
# कमांड लाइनद्वारे स्थापित करा
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

किंवा VS Code मधून इंस्टॉल करा:  
1. VS Code उघडा  
2. Extensions (Ctrl+Shift+X) वर जा  
3. इंस्टॉल करा:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Python इंस्टॉल करा

Python 3.8+ MCP सर्व्हर विकासासाठी आवश्यक आहे.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# होमब्रू वापरणे
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### इंस्टॉलेशन तपासा

```bash
python --version  # Python 3.11.x दाखवायला हवे
pip --version      # pip आवृत्ती दाखवायला हवी
```

## 🚀 प्रकल्प सेटअप

### 1. रिपॉझिटरी क्लोन करा

```bash
# मुख्य रेपॉजिटरी क्लोन करा
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# प्रकल्प निर्देशिकेमध्ये जा
cd MCP-Server-and-PostgreSQL-Sample-Retail

# रेपॉजिटरीची रचना तपासा
ls -la
```

### 2. Python व्हर्चुअल वातावरण तयार करा

```bash
# आभासी वातावरण तयार करा
python -m venv mcp-env

# आभासी वातावरण सक्रिय करा
# विंडोज
mcp-env\Scripts\activate

# मॅकओएस/लिनक्स
source mcp-env/bin/activate

# pip अद्यतनित करा
python -m pip install --upgrade pip
```

### 3. Python अवलंबन इंस्टॉल करा

```bash
# विकासासाठी आवश्यक अवलंबित्व स्थापित करा
pip install -r requirements.lock.txt

# मुख्य पॅकेजेसची खात्री करा
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure स्त्रोत तैनाती

### 1. स्त्रोत आवश्यकता समजून घ्या

आमच्या MCP सर्व्हरला हे Azure स्त्रोत आवश्यक आहेत:

| **स्त्रोत** | **उद्दिष्ट** | **अंदाजे किंमत** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI मॉडेल होस्टिंग आणि व्यवस्थापन | $10-50/महिना |
| **OpenAI तैनाती** | टेक्स्ट एम्बेडिंग मॉडेल (text-embedding-3-small) | $5-20/महिना |
| **Application Insights** | मॉनिटरिंग आणि टेलीमेट्री | $5-15/महिना |
| **Resource Group** | स्त्रोत आयोजन | मोफत |

### 2. Azure स्त्रोत तैनात करा

#### पर्याय A: स्वयंचलित तैनाती (शिफारस)

```bash
# इन्फ्रास्ट्रक्चर निर्देशिकेकडे नेव्हिगेट करा
cd infra

# विंडोज - पॉवरशेल
./deploy.ps1

# macOS/Linux - बाश
./deploy.sh
```

तैनाती स्क्रिप्ट हे करेल:  
1. एक अद्वितीय resource group तयार करणे  
2. Microsoft Foundry स्त्रोत तैनात करणे  
3. text-embedding-3-small मॉडेल तैनात करणे  
4. Application Insights कॉन्फिगर करणे  
5. प्रमाणीकरणासाठी सेवा प्रिन्सिपल तयार करणे  
6. कॉन्फिगरेशनसह `.env` फाइल तयार करणे  

#### पर्याय B: मॅन्युअल तैनाती

जर तुम्हाला मॅन्युअल नियंत्रण हवे असल्यास किंवा स्वयंचलित स्क्रिप्ट अयशस्वी झाली तर:

```bash
# चल सेट करा
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# संसाधन गट तयार करा
az group create --name $RESOURCE_GROUP --location $LOCATION

# मुख्य साचं तैनात करा
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure तैनातीची पडताळणी करा

```bash
# रिसोर्स ग्रुप तपासा
az group show --name $RESOURCE_GROUP --output table

# डिप्लॉय केलेले रिसोर्सेस यादी करा
az resource list --resource-group $RESOURCE_GROUP --output table

# AI सेवा चाचणी करा
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. पर्यावरण बदल कॉन्फिगर करा

तैनाती नंतर, तुमच्याकडे `.env` फाइल असावी. खात्री करा की त्यात आहे:

```bash
# .env फाइलची सामग्री
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# डेटाबेस कॉन्फिगरेशन (विकासासाठी)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker पर्यावरण सेटअप

### 1. Docker कॉम्पोजीशन समजून घ्या

आमच्या विकास पर्यावरणासाठी Docker Compose वापरले जाते:

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

### 2. विकास पर्यावरण सुरू करा

```bash
# खात्री करा की आपण प्रोजेक्ट रूट निर्देशिकेत आहात
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# सेवा सुरू करा
docker-compose up -d

# सेवा स्थिती तपासा
docker-compose ps

# लॉग पहा
docker-compose logs -f
```

### 3. डेटाबेस सेटअप तपासा

```bash
# PostgreSQL कंटेनरशी कनेक्ट करा
docker-compose exec postgres psql -U postgres -d zava

# डेटाबेस संरचना तपासा
\dt retail.*

# नमुना डेटा सत्यापित करा
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL मधून बाहेर जा
\q
```

### 4. MCP सर्व्हर टेस्ट करा

```bash
# MCP सर्व्हरची आरोग्य तपासा
curl http://localhost:8000/health

# मूलभूत MCP एंडपॉईंटची चाचणी करा
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code कॉन्फिगरेशन

### 1. MCP समाकलन कॉन्फिगर करा

VS Code साठी MCP कॉन्फिगरेशन तयार करा:

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

### 2. Python पर्यावरण कॉन्फिगर करा

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

### 3. VS Code समाकलन तपासा

1. **प्रोजेक्ट VS Code मध्ये उघडा**:  
   ```bash
   code .
   ```

2. **AI Chat उघडा**:  
   - `Ctrl+Shift+P` (Windows/Linux) किंवा `Cmd+Shift+P` (macOS) दाबा  
   - "AI Chat" टाइप करा आणि "AI Chat: Open Chat" निवडा  

3. **MCP सर्व्हर कनेक्शनची चाचणी करा**:  
   - AI Chat मध्ये, `#zava` टाइप करा आणि कॉन्फिगर केलेल्या सर्व्हरसपैकी एक निवडा  
   - विचारा: "डेटाबेसमध्ये कोणती टेबल्स उपलब्ध आहेत?"  
   - तुम्हाला रिटेल डेटाबेस टेबल्सची यादी मिळेल  

## ✅ पर्यावरण पडताळणी

### 1. सविस्तर प्रणाली तपासणी

तुमच्या सेटअपची पडताळणी करण्यासाठी हा सत्यापन स्क्रिप्ट चालवा:

```bash
# सत्यापन स्क्रिप्ट तयार करा
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
    
    # Python आवृत्ती तपासा
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # आवश्यक पॅकेजेस तपासा
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Docker तपासा
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Azure CLI तपासा
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # पर्यावरणीय चल तपासा
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
    
    # डेटाबेस कनेक्शन तपासा
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # क्वेरी तपासा
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
    
    # MCP सर्व्हर तपासा
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
    
    # Azure AI सेवा तपासा
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # क्रेडेन्शियल्स अयोग्य असल्यास हे अयशस्वी होईल
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

# सत्यापन चालवा
python validate_setup.py
```

### 2. मॅन्युअल पडताळणी चेकलिस्ट

**✅ मूलभूत साधने**  
- [ ] Docker आवृत्ती 20.10+ इंस्टॉल आणि चालू  
- [ ] Azure CLI 2.40+ इंस्टॉल आणि प्रमाणित  
- [ ] Python 3.8+ आणि pip इंस्टॉल  
- [ ] Git 2.30+ इंस्टॉल  
- [ ] आवश्यक विस्तारांसह VS Code  

**✅ Azure स्त्रोत**  
- [ ] resource group यशस्वीपणे तयार  
- [ ] AI Foundry प्रकल्प तैनात  
- [ ] OpenAI text-embedding-3-small मॉडेल तैनात  
- [ ] Application Insights कॉन्फिगर केलेले  
- [ ] योग्य परवानग्यांसह सेवा प्रिन्सिपल तयार  

**✅ पर्यावरण कॉन्फिगरेशन**  
- [ ] सर्व आवश्यक बदलांसह `.env` फाइल तयार  
- [ ] Azure क्रेडेन्शियल कार्यरत (`az account show` बरोबर चाचणी करा)  
- [ ] PostgreSQL कंटेनर चालू आणि प्रवेशयोग्य  
- [ ] डेटाबेसमध्ये नमुना डेटा लोड  

**✅ VS Code समाकलन**  
- [ ] `.vscode/mcp.json` कॉन्फिगरड  
- [ ] Python इंटरप्रिटर व्हर्चुअल वातावरणाला सेट  
- [ ] MCP सर्व्हर्स AI Chat मध्ये दिसतात  
- [ ] AI Chat द्वारे टेस्ट क्वेरीज चालवू शकता  

## 🛠️ सामान्य समस्या निवारण

### Docker समस्या

**समस्या**: Docker कंटेनर सुरू होत नाहीत  
```bash
# डॉकर सेवा स्थिती तपासा
docker info

# उपलब्ध संसाधने तपासा
docker system df

# आवश्यक असल्यास साफ करा
docker system prune -f

# डॉकर डेस्कटॉप रीस्टार्ट करा (विंडोज/मॅकओएस)
# किंवा डॉकर सेवा पुन्हा सुरू करा (लिनक्स)
sudo systemctl restart docker
```
  
**समस्या**: PostgreSQL कनेक्शन अपयशी  
```bash
# कंटेनर लॉग तपासा
docker-compose logs postgres

# कंटेनर आरोग्यदायक आहे की नाही हे तपासा
docker-compose ps

# थेट कनेक्शनची तपासणी करा
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Azure तैनाती समस्या

**समस्या**: Azure तैनाती अयशस्वी  
```bash
# Azure CLI प्रमाणीकरण तपासा
az account show

# सदस्यता परवानग्या सत्यापित करा
az role assignment list --assignee $(az account show --query user.name -o tsv)

# स्त्रोत प्रदाता नोंदणी तपासा
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**समस्या**: AI सेवा प्रमाणीकरण अयशस्वी  
```bash
# सेवा मुख्य तपासा
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# एआय सेवा तैनातीची पुष्टी करा
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Python पर्यावरण समस्या

**समस्या**: पॅकेज इंस्टॉलेशन अयशस्वी  
```bash
# pip आणि setuptools अपग्रेड करा
python -m pip install --upgrade pip setuptools wheel

# pip कॅश साफ करा
pip cache purge

# समस्या ओळखण्यासाठी पॅकेजेस एकेक करून इन्स्टॉल करा
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**समस्या**: VS Code Python इंटरप्रिटर सापडत नाही  
```bash
# Python इंटरप्रेटर मार्ग दाखवा
which python  # macOS/Linux
where python  # Windows

# प्रथम आभासी वातावरण सक्रिय करा
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# नंतर VS Code उघडा
code .
```
  
## 🎯 मुख्य मुद्दे

ही लॅब पूर्ण केल्यावर, तुमच्याकडे असे असेल:

✅ **पूर्ण विकास पर्यावरण**: सर्व साधने इंस्टॉल आणि कॉन्फिगर केलेले  
✅ **Azure स्त्रोत तैनात**: AI सेवा आणि आधारभूत रचना  
✅ **Docker पर्यावरण चालू**: PostgreSQL आणि MCP सर्व्हर कंटेनर  
✅ **VS Code समाकलन**: MCP सर्व्हर्स कॉन्फिगरड आणि प्रवेशयोग्य  
✅ **पडताळलेला सेटअप**: सर्व घटक चाचणी केली आणि एकत्र कार्यरत  
✅ **समस्या निवारण ज्ञान**: सामान्य समस्या आणि उपाय  

## 🚀 पुढे काय

तुमच्या पर्यावरणास तयार करून, पुढे जा **[Lab 04: Database Design and Schema](../04-Database/README.md)** येथे:

- रिटेल डेटाबेस स्कीमा तपशीलात पाहा  
- मल्टी-टेनंट डेटा मॉडेलिंग समजा  
- रो लेव्हल सिक्युरिटी अमलात आणण्याबाबत शिका  
- नमुना रिटेल डेटा सोबत काम करा  

## 📚 अतिरिक्त स्रोत

### विकास साधने
- [Docker Documentation](https://docs.docker.com/) - संपूर्ण Docker संदर्भ  
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/) - Azure CLI कमांड्स  
- [VS Code Documentation](https://code.visualstudio.com/docs) - एडिटर कॉन्फिगरेशन आणि विस्तार  

### Azure सेवा
- [Microsoft Foundry Documentation](https://docs.microsoft.com/azure/ai-foundry/) - AI सेवा कॉन्फिगरेशन  
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI मॉडेल तैनात  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - मॉनिटरिंग सेटअप  

### Python विकास
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) - पर्यावरण व्यवस्थापन  
- [AsyncIO Documentation](https://docs.python.org/3/library/asyncio.html) - Async प्रोग्रामिंग नमुने  
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - वेब फ्रेमवर्क नमुने  

---

**पुढे**: पर्यावरण तयार आहे? पुढे जा **[Lab 04: Database Design and Schema](../04-Database/README.md)**

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
हा दस्तऐवज AI भाषांतर सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) चा वापर करून अनुवादित केला आहे. जरी आम्ही अचूकतेसाठी प्रयत्न करतो, तरी कृपया लक्षात घ्या की स्वयंचलित भाषांतरांमध्ये त्रुटी किंवा अचूकतेची कमतरता असू शकते. मूळ दस्तऐवज त्याच्या मूळ भाषेत अधिकृत स्रोत मानला पाहिजे. महत्त्वाची माहिती असल्यास, व्यावसायिक मानवी भाषांतराची शिफारस केली जाते. या भाषांतराच्या वापरामुळे उद्भवणाऱ्या कोणत्याही गैरसमज किंवा चुकीच्या अर्थलावणीसाठी आम्ही जबाबदार नाही.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->