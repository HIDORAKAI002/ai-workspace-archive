# वातावरण सेटअप

## 🎯 यो प्रयोगशाला के कभर गर्दछ

यो व्यावहारिक प्रयोगशालाले तपाईंलाई PostgreSQL एकीकरणसहित MCP सर्भरहरू निर्माण गर्नको लागि पूर्ण विकास वातावरण सेटअप गर्ने प्रक्रियामा मार्गदर्शन गर्दछ। तपाईंले सबै आवश्यक उपकरणहरू कन्फिगर गर्नुहुनेछ, Azure स्रोतहरू परिनियोजन गर्नुहुनेछ, र कार्यान्वयन अगाडि बढाउनु अघि तपाईंको सेटअप प्रमाणित गर्नुहुनेछ।

## अवलोकन

सफल MCP सर्भर विकासको लागि उपयुक्त विकास वातावरण अनिवार्य छ। यो प्रयोगशालाले Docker, Azure सेवाहरू, विकास उपकरणहरू सेटअप गर्ने र सबै कुरा सहि ढंगले सँगै काम गरिरहेको छ भनी जाँच गर्ने चरणबद्ध निर्देशनहरू प्रदान गर्दछ।

यस प्रयोगशाला पूरा भएपछि, तपाईंलाई Zava Retail MCP सर्भर निर्माणका लागि पूर्णरूपेण कार्यशील विकास वातावरण प्राप्त हुनेछ।

## सिकाइ उद्देश्यहरू

यस प्रयोगशालाको अन्त्यसम्म, तपाईं सक्षम हुनुहुनेछ:

- **आवश्यक सबै विकास उपकरणहरू स्थापना र कन्फिगर गर्न**
- **MCP सर्भरका लागि आवश्यक Azure स्रोतहरू परिनियोजन गर्न**
- **PostgreSQL र MCP सर्भरका लागि Docker कन्टेनरहरू सेट अप गर्न**
- **परीक्षण कनेक्शनहरू मार्फत आफ्नो वातावरण सेटअप प्रमाणित गर्न**
- **सामान्य सेटअप समस्या र कन्फिगरेसन समस्याहरू समाधान गर्न**
- **विकास कार्यप्रवाह र फाइल संरचना बुझ्न**

## 📋 पूर्वशर्त जाँच

सुरु गर्नु अघि, सुनिश्चित गर्नुहोस् तपाईंलाई:

### आवश्यक ज्ञान
- आधारभूत कमाण्ड लाइन प्रयोग (Windows Command Prompt/PowerShell)
- वातावरण चरहरूको बुझाइ
- Git संस्करण नियन्त्रण परिचितता
- Docker का आधारभूत अवधारणाहरू (कन्टेनरहरू, इमेजहरू, भोल्युमहरू)

### प्रणाली आवश्यकताहरू
- **अपरेटिङ सिस्टम**: Windows 10/11, macOS, वा Linux
- **RAM**: न्यूनतम 8GB (सिफारिस 16GB)
- **स्टोरेज**: कम्तीमा 10GB खाली स्थान
- **नेटवर्क**: डाउनलोड र Azure परिनियोजनको लागि इन्टरनेट कनेक्शन

### खाताका आवश्यकताहरू
- **Azure सदस्यता**: निःशुल्क स्तर पर्याप्त
- **GitHub खाता**: रिपोजिटरी पहुँचका लागि
- **Docker Hub खाता**: (वैकल्पिक) अनुकूलित इमेज प्रकाशनको लागि

## 🛠️ उपकरण स्थापना

### 1. Docker Desktop स्थापना गर्नुहोस्

Docker हाम्रो विकास सेटअपको लागि कन्टेनराइज्ड वातावरण प्रदान गर्दछ।

#### Windows स्थापना

1. **Docker Desktop डाउनलोड गर्नुहोस्**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **स्थापना र कन्फिगर गर्नुहोस्**:
   - प्रशासकको रूपमा इन्स्टलर चलाउनुहोस्
   - अनुरोध गर्दा WSL 2 एकीकरण सक्षम गर्नुहोस्
   - स्थापना पूरा भएपछि कम्प्युटर पुनः सुरु गर्नुहोस्

3. **स्थापना प्रमाणीकरण गर्नुहोस्**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS स्थापना

1. **डाउनलोड र स्थापना गर्नुहोस्**:
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg बाट डाउनलोड गर्नुहोस्
   # वा Homebrew प्रयोग गर्नुहोस्
   brew install --cask docker
   ```

2. **Docker Desktop सुरु गर्नुहोस्**:
   - Applications बाट Docker Desktop सुरु गर्नुहोस्
   - प्रारम्भिक सेटअप विजार्ड पूरा गर्नुहोस्

3. **स्थापना प्रमाणीकरण गर्नुहोस्**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux स्थापना

1. **Docker Engine स्थापना गर्नुहोस्**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # समूह परिवर्तनहरू लागू गर्नको लागि लगआउट गरी पुनः लगइन गर्नुहोस्
   ```

2. **Docker Compose स्थापना गर्नुहोस्**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI स्थापना गर्नुहोस्

Azure CLI Azure स्रोत परिनियोजन र व्यवस्थापन सक्षम बनाउँछ।

#### Windows स्थापना

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS स्थापना

```bash
# होमब्रू प्रयोग गर्दै
brew install azure-cli

# वा इन्स्टालर प्रयोग गर्दै
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux स्थापना

```bash
# उबुन्टु/डेबियन
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# आरएचईएल/सेन्टओएस
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### प्रमाणीकरण र प्रमाणित गर्नुहोस्

```bash
# स्थापना जाँच गर्नुहोस्
az version

# Azure मा लगइन गर्नुहोस्
az login

# पूर्वनिर्धारित सदस्यता सेट गर्नुहोस् (यदि तपाईंसँग धेरै छन् भने)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git स्थापना गर्नुहोस्

Git रिपोजिटरी क्लोन र संस्करण नियन्त्रणको लागि आवश्यक छ।

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git सामान्यतया पहिले नै स्थापना गरिएको हुन्छ, तर तपाईं Homebrew मार्फत अपडेट गर्न सक्नुहुन्छ
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. VS Code स्थापना गर्नुहोस्

Visual Studio Code ले MCP समर्थनसहित इन्टिग्रेटेड विकास वातावरण प्रदान गर्दछ।

#### स्थापना

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### आवश्यक एक्सटेन्सनहरू

यी VS Code एक्सटेन्सनहरू स्थापना गर्नुहोस्:

```bash
# कमाण्ड लाइन मार्फत स्थापना गर्नुहोस्
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

वा VS Code मार्फत स्थापना गर्नुहोस्:
1. VS Code खोल्नुहोस्
2. Extensions (Ctrl+Shift+X) मा जानुहोस्
3. स्थापना गर्नुहोस्:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python स्थापना गर्नुहोस्

MCP सर्भर विकासका लागि Python 3.8+ आवश्यक छ।

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# होमब्रू प्रयोग गर्दै
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### स्थापना प्रमाणित गर्नुहोस्

```bash
python --version  # पाइथन ३.११.x देखिनुपर्छ
pip --version      # पिप संस्करण देखिनुपर्छ
```

## 🚀 परियोजना सेटअप

### 1. रिपोजिटरी क्लोन गर्नुहोस्

```bash
# मुख्य रिपोजिटरी क्लोन गर्नुहोस्
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# परियोजना निर्देशिकामा जानुहोस्
cd MCP-Server-and-PostgreSQL-Sample-Retail

# रिपोजिटरी संरचना जाँच गर्नुहोस्
ls -la
```

### 2. Python भर्चुअल वातावरण सिर्जना गर्नुहोस्

```bash
# भर्चुअल वातावरण सिर्जना गर्नुहोस्
python -m venv mcp-env

# भर्चुअल वातावरण सक्रिय गर्नुहोस्
# विन्डोज
mcp-env\Scripts\activate

# म्याकओएस/लिनक्स
source mcp-env/bin/activate

# पिप अपडेट गर्नुहोस्
python -m pip install --upgrade pip
```

### 3. Python निर्भरताहरू स्थापना गर्नुहोस्

```bash
# विकास निर्भरता स्थापना गर्नुहोस्
pip install -r requirements.lock.txt

# मुख्य प्याकेजहरू प्रमाणित गर्नुहोस्
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure स्रोत परिनियोजन

### 1. स्रोत आवश्यकताहरू बुझ्नुहोस्

हाम्रो MCP सर्भरले यी Azure स्रोतहरू आवश्यक गर्दछ:

| **स्रोत** | **उद्देश्य** | **अनुमानित लागत** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI मोडेल होस्टिंग र व्यवस्थापन | $10-50/महिना |
| **OpenAI Deployment** | टेक्स्ट एम्बेडिङ मोडेल (text-embedding-3-small) | $5-20/महिना |
| **Application Insights** | अनुगमन र टेलिमेट्री | $5-15/महिना |
| **Resource Group** | स्रोत संगठन | निःशुल्क |

### 2. Azure स्रोतहरू परिनियोजन गर्नुहोस्

#### विकल्प A: स्वचालित परिनियोजन (सिफारिस गरिएको)

```bash
# पूर्वाधार निर्देशिकामा जानुहोस्
cd infra

# विन्डोज - पावरशेल
./deploy.ps1

# म्याकओएस/लिनक्स - बाश
./deploy.sh
```

परिनियोजन स्क्रिप्टले:
1. अनूठो स्रोत समूह सिर्जना गर्नेछ
2. Microsoft Foundry स्रोतहरू परिनियोजन गर्नेछ
3. text-embedding-3-small मोडेल परिनियोजन गर्नेछ
4. Application Insights कन्फिगर गर्नेछ
5. प्रमाणिकरणका लागि सेवा प्रिन्सिपल सिर्जना गर्नेछ
6. कन्फिगरेसन सहित `.env` फाइल निर्माण गर्नेछ

#### विकल्प B: म्यानुअल परिनियोजन

यदि तपाईं म्यानुअल नियन्त्रण चाहनुहुन्छ वा स्वचालित स्क्रिप्ट असफल हुन्छ भने:

```bash
# भेरिएबलहरू सेट गर्नुहोस्
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# स्रोत समूह सिर्जना गर्नुहोस्
az group create --name $RESOURCE_GROUP --location $LOCATION

# मुख्य टेम्प्लेट लागू गर्नुहोस्
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure परिनियोजन प्रमाणित गर्नुहोस्

```bash
# स्रोत समूह जाँच गर्नुहोस्
az group show --name $RESOURCE_GROUP --output table

# तैनाथ स्रोतहरूको सूची बनाउनुहोस्
az resource list --resource-group $RESOURCE_GROUP --output table

# AI सेवा परीक्षण गर्नुहोस्
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. वातावरण चरहरू कन्फिगर गर्नुहोस्

परिनियोजन पछि, तपाईंको `.env` फाइल हुनुपर्छ। यो कुरालाई प्रमाणित गर्नुहोस् कि यसले समावेश गरेको छ:

```bash
# .env फाइल सामग्री
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# डाटाबेस कन्फिगरेसन (विकासका लागि)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker वातावरण सेटअप

### 1. Docker संरचना बुझ्नुहोस्

हाम्रो विकास वातावरणले Docker Compose प्रयोग गर्दछ:

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

### 2. विकास वातावरण सुरु गर्नुहोस्

```bash
# सुनिश्चित गर्नुहोस् कि तपाईं प्रोजेक्ट रूट निर्देशिकामा हुनुहुन्छ
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# सेवाहरू सुरु गर्नुहोस्
docker-compose up -d

# सेवा स्थिति जाँच गर्नुहोस्
docker-compose ps

# लगहरू हेर्नुहोस्
docker-compose logs -f
```

### 3. डाटाबेस सेटअप प्रमाणित गर्नुहोस्

```bash
# PostgreSQL कन्टेनरमा जडान गर्नुहोस्
docker-compose exec postgres psql -U postgres -d zava

# डेटाबेस संरचना जाँच गर्नुहोस्
\dt retail.*

# नमूना डाटा पुष्टि गर्नुहोस्
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL बाट बाहिर निस्कनुहोस्
\q
```

### 4. MCP सर्भर परीक्षण गर्नुहोस्

```bash
# MCP सर्भरको स्वास्थ्य जाँच गर्नुहोस्
curl http://localhost:8000/health

# आधारभूत MCP अन्त्यबिन्दुको परीक्षण गर्नुहोस्
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code कन्फिगरेसन

### 1. MCP एकीकरण कन्फिगर गर्नुहोस्

VS Code MCP कन्फिगरेसन सिर्जना गर्नुहोस्:

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

### 2. Python वातावरण कन्फिगर गर्नुहोस्

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

### 3. VS Code एकीकरण परीक्षण गर्नुहोस्

1. **VS Code मा परियोजना खोल्नुहोस्**:
   ```bash
   code .
   ```

2. **AI Chat खोल्नुहोस्**:
   - `Ctrl+Shift+P` (Windows/Linux) वा `Cmd+Shift+P` (macOS) थिच्नुहोस्
   - "AI Chat" टाइप गरेर "AI Chat: Open Chat" छान्नुहोस्

3. **MCP सर्भर कनेक्शन परीक्षण गर्नुहोस्**:
   - AI Chat मा `#zava` टाइप गर्नुहोस् र कन्फिगर गरिएका सर्भर मध्ये एउटा छान्नुहोस्
   - सोध्नुहोस्: "डाटाबेसमा कुन-कुन तालिकाहरू उपलब्ध छन्?"
   - तपाईंले खुद्रा डाटाबेस तालिकाहरूको सूची पाउनु पर्नेछ

## ✅ वातावरण प्रमाणिकरण

### 1. पूर्ण प्रणाली जाँच

यो प्रमाणीकरण स्क्रिप्ट चलाएर आफ्नो सेटअप प्रमाणित गर्नुहोस्:

```bash
# प्रमाणिकरण स्क्रिप्ट बनाउनुहोस्
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
    
    # Python संस्करण जाँच गर्नुहोस्
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # आवश्यक प्याकेजहरू जाँच गर्नुहोस्
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Docker जाँच गर्नुहोस्
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Azure CLI जाँच गर्नुहोस्
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # वातावरण चरहरू जाँच गर्नुहोस्
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
    
    # डाटाबेस कनेक्सन जाँच गर्नुहोस्
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # परीक्षण क्वेरी
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
    
    # MCP सर्भर जाँच गर्नुहोस्
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
    
    # Azure AI सेवा जाँच गर्नुहोस्
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # प्रमाणपत्रहरू अवैध भएमा यो असफल हुनेछ
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

# प्रमाणिकरण चलाउनुहोस्
python validate_setup.py
```

### 2. म्यानुअल प्रमाणिकरण चेकलिष्ट

**✅ आधारभूत उपकरणहरू**
- [ ] Docker संस्करण 20.10+ स्थापना र चलिरहेको छ
- [ ] Azure CLI 2.40+ स्थापना र प्रमाणित छ
- [ ] Python 3.8+ र pip स्थापना गरिएको छ
- [ ] Git 2.30+ स्थापना गरिएको छ
- [ ] आवश्यक एक्सटेन्सनसहित VS Code

**✅ Azure स्रोतहरू**
- [ ] स्रोत समूह सफलतापूर्वक सिर्जना गरिएको
- [ ] AI Foundry परियोजना परिनियोजन गरिएको
- [ ] OpenAI text-embedding-3-small मोडेल परिनियोजन गरिएको
- [ ] Application Insights कन्फिगर गरिएको
- [ ] सेवा प्रिन्सिपल उपयुक्त अनुमतिहरू सहित सिर्जना गरिएको

**✅ वातावरण कन्फिगरेसन**
- [ ] सबै आवश्यक चरहरूसहित `.env` फाइल सिर्जना गरिएको
- [ ] Azure प्रमाणपत्रहरू काम गरिरहेका छन् (`az account show` प्रयोग गरेर परीक्षण)
- [ ] PostgreSQL कन्टेनर चलिरहेको र पहुँचयोग्य छ
- [ ] डाटाबेसमा नमूना डेटा लोड गरिएको छ

**✅ VS Code एकीकरण**
- [ ] `.vscode/mcp.json` कन्फिगर गरिएको
- [ ] Python दुभाषे वातावरणमा सेट गरिएको छ
- [ ] MCP सर्भरहरू AI Chat मा देखिन्छन्
- [ ] AI Chat मार्फत परीक्षण सोधपुछ गर्न सकिन्छ

## 🛠️ सामान्य समस्याहरू समाधान गर्ने तरिकाहरू

### Docker समस्याहरू

**समस्या**: Docker कन्टेनरहरू सुरु हुँदैनन्
```bash
# डोकर सेवा स्थिति जाँच्नुहोस्
docker info

# उपलब्ध स्रोतहरू जाँच्नुहोस्
docker system df

# आवश्यक भए सफा गर्नुहोस्
docker system prune -f

# डोकर डेस्कटप पुनःसुरु गर्नुहोस् (विन्डोज/म्याकओएस)
# वा डोकर सेवा पुनःसुरु गर्नुहोस् (लिनक्स)
sudo systemctl restart docker
```

**समस्या**: PostgreSQL कनेक्शन असफल हुन्छ
```bash
# कन्टेनर लगहरू जाँच गर्नुहोस्
docker-compose logs postgres

# कन्टेनर स्वस्थ छ कि छैन जाँच गर्नुहोस्
docker-compose ps

# सिधा जडान परीक्षण गर्नुहोस्
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure परिनियोजन समस्याहरू

**समस्या**: Azure परिनियोजन फेल हुन्छ
```bash
# Azure CLI प्रमाणीकरण जाँच गर्नुहोस्
az account show

# सदस्यता अनुमति पुष्टि गर्नुहोस्
az role assignment list --assignee $(az account show --query user.name -o tsv)

# स्रोत प्रदायक दर्ता जाँच गर्नुहोस्
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**समस्या**: AI सेवा प्रमाणिकरण असफल हुन्छ
```bash
# सेवा प्रमुख परीक्षण गर्नुहोस्
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# AI सेवा परिनियोजन सुनिश्चित गर्नुहोस्
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python वातावरण समस्याहरू

**समस्या**: प्याकेज स्थापना असफल हुन्छ
```bash
# pip र setuptools अपडेट गर्नुहोस्
python -m pip install --upgrade pip setuptools wheel

# pip क्यास खाली गर्नुहोस्
pip cache purge

# समस्याहरू पत्ता लगाउन प्याकेजहरू एक-एक गरी स्थापना गर्नुहोस्
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**समस्या**: VS Code ले Python दुभाषे पत्ता लगाउन सक्दैन
```bash
# पायथन इन्टरप्रेटर पथहरू देखाउनुहोस्
which python  # म्याकओएस/लिनक्स
where python  # विन्डोज

# पहिले भर्चुअल वातावरण सक्रिय गर्नुहोस्
source mcp-env/bin/activate  # म्याकओएस/लिनक्स
mcp-env\Scripts\activate     # विन्डोज

# त्यसपछि VS कोड खोल्नुहोस्
code .
```

## 🎯 मुख्य सिकाइहरू

यस प्रयोगशाला पूरा गरेपछि, तपाईंले:

✅ **पूर्ण विकास वातावरण**: सबै उपकरणहरू स्थापना र कन्फिगर गरिसक्नुहुन्छ  
✅ **Azure स्रोतहरू परिनियोजन**: AI सेवा र सहायक पूर्वाधारहरू  
✅ **Docker वातावरण चलिरहेको**: PostgreSQL र MCP सर्भर कन्टेनरहरू  
✅ **VS Code एकीकरण**: MCP सर्भरहरू कन्फिगर र पहुँचयोग्य  
✅ **प्रमाणीकरण सेटअप**: सबै कम्पोनेन्टहरू परीक्षण र सहकार्यमा काम गरिरहेका  
✅ **समस्या समाधान ज्ञान**: सामान्य समस्याहरू र तीका समाधानहरू  

## 🚀 अर्को के छ

आफ्नो वातावरण तयार भएपछि, जारी राख्नुहोस् **[प्रयोगशाला ०४: डाटाबेस डिजाइन र स्कीमा](../04-Database/README.md)** मा:

- खुद्रा डाटाबेस स्कीमाको विस्तारमा अन्वेषण गर्नुहोस्
- बहु-भाडावी डेटा मोडलिङ बुझ्नुहोस्
- पंक्ति स्तर सुरक्षा कार्यान्वयन सिक्नुहोस्
- खुद्रा नमुना डेटा सँग काम गर्नुहोस्

## 📚 अतिरिक्त स्रोतहरू

### विकास उपकरणहरू
- [Docker प्रलेखन](https://docs.docker.com/) - पूर्ण Docker सन्दर्भ
- [Azure CLI सन्दर्भ](https://docs.microsoft.com/cli/azure/) - Azure CLI आदेशहरू
- [VS Code प्रलेखन](https://code.visualstudio.com/docs) - संपादक कन्फिगरेसन र एक्सटेन्सनहरू

### Azure सेवाहरू
- [Microsoft Foundry प्रलेखन](https://docs.microsoft.com/azure/ai-foundry/) - AI सेवा कन्फिगरेसन
- [Azure OpenAI सेवा](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI मोडेल परिनियोजन
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - अनुगमन सेटअप

### Python विकास
- [Python भर्चुअल वातावरण](https://docs.python.org/3/tutorial/venv.html) - वातावरण व्यवस्थापन
- [AsyncIO प्रलेखन](https://docs.python.org/3/library/asyncio.html) - असिंक्रोनस प्रोग्रामिङ ढाँचा
- [FastAPI प्रलेखन](https://fastapi.tiangolo.com/) - वेब फ्रेमवर्क ढाँचाहरू

---

**अर्को**: वातावरण तयार? जारी राख्नुहोस् [प्रयोगशाला ०४: डाटाबेस डिजाइन र स्कीमा](../04-Database/README.md) संग।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
यो दस्तावेज़ AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) प्रयोग गरेर अनुवाद गरिएको हो। हामी सही हुन प्रयास गर्छौं, तर कृपया जानकार हुनुस् कि स्वचालित अनुवादमा त्रुटिहरू वा अशुद्धताहरू हुन सक्छन्। मूल दस्तावेज़ यसको मूल भाषामा आधिकारिक स्रोत मानिनुपर्छ। महत्वपूर्ण जानकारीका लागि व्यावसायिक मानव अनुवाद सिफारिस गरिन्छ। यस अनुवादको प्रयोगबाट उत्पन्न कुनै पनि गलत बुझाइ वा त्रुटिको लागि हामी जिम्मेवार छैनौं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->