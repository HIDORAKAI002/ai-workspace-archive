# पर्यावरण सेटअप

## 🎯 इस लैब में क्या शामिल है

यह व्यावहारिक लैब आपको PostgreSQL एकीकरण के साथ MCP सर्वर बनाने के लिए पूर्ण विकास पर्यावरण सेटअप करने के लिए मार्गदर्शन करती है। आप सभी आवश्यक उपकरणों को कॉन्फ़िगर करेंगे, Azure संसाधनों को तैनात करेंगे, और कार्यान्वयन से पहले अपने सेटअप को सत्यापित करेंगे।

## अवलोकन

सफल MCP सर्वर विकास के लिए एक उचित विकास पर्यावरण महत्वपूर्ण है। यह लैब Docker, Azure सेवाओं, विकास उपकरणों की सेटिंग, और यह सुनिश्चित करने के लिए चरण-दर-चरण निर्देश प्रदान करती है कि सब कुछ सही तरीके से काम कर रहा है।

इस लैब के अंत तक, आपके पास Zava Retail MCP सर्वर बनाने के लिए पूरी तरह से कार्यात्मक विकास पर्यावरण होगा।

## सीखने के उद्देश्य

इस लैब के अंत तक, आप सक्षम होंगे:

- **सभी आवश्यक विकास उपकरण** स्थापित और कॉन्फ़िगर करना
- MCP सर्वर के लिए आवश्यक **Azure संसाधन तैनात करना**
- PostgreSQL और MCP सर्वर के लिए **Docker कंटेनर सेटअप करना**
- परीक्षण कनेक्शन के साथ अपने पर्यावरण सेटअप का **सत्यापन करना**
- सामान्य सेटअप मुद्दों और कॉन्फ़िगरेशन समस्याओं को **हल करना**
- विकास वर्कफ़्लो और फ़ाइल संरचना को **समझना**

## 📋 आवश्यकताओं की जाँच

शुरू करने से पहले, सुनिश्चित करें कि आपके पास है:

### आवश्यक ज्ञान
- बुनियादी कमांड लाइन उपयोग (Windows Command Prompt/PowerShell)
- पर्यावरण चर की समझ
- Git संस्करण नियंत्रण से परिचित होना
- बुनियादी Docker अवधारणाएं (कंटेनर, इमेज, वॉल्यूम)

### सिस्टम आवश्यकताएँ
- **ऑपरेटिंग सिस्टम**: Windows 10/11, macOS, या Linux
- **रैम**: न्यूनतम 8GB (16GB अनुशंसित)
- **स्टोरेज**: कम से कम 10GB खाली जगह
- **नेटवर्क**: डाउनलोड और Azure तैनाती के लिए इंटरनेट कनेक्शन

### खाता आवश्यकताएँ
- **Azure सब्सक्रिप्शन**: मुफ्त स्तर पर्याप्त है
- **GitHub खाता**: रिपॉजिटरी पहुंच के लिए
- **Docker Hub खाता**: (वैकल्पिक) कस्टम इमेज प्रकाशन के लिए

## 🛠️ उपकरण स्थापना

### 1. Docker Desktop स्थापित करें

Docker हमारे विकास सेटअप के लिए कंटेनरीकृत पर्यावरण प्रदान करता है।

#### Windows स्थापना

1. **Docker Desktop डाउनलोड करें**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **इंस्टॉल और कॉन्फ़िगर करें**:
   - इंस्टॉलर को व्यवस्थापक के रूप में चलाएं
   - जब संकेत मिले तो WSL 2 एकीकरण सक्षम करें
   - स्थापना पूरी होने पर अपने कंप्यूटर को पुनः आरंभ करें

3. **स्थापना सत्यापित करें**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS स्थापना

1. **डाउनलोड और इंस्टॉल करें**:
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg से डाउनलोड करें
   # या Homebrew का उपयोग करें
   brew install --cask docker
   ```

2. **Docker Desktop प्रारंभ करें**:
   - अनुप्रयोगों से Docker Desktop लॉन्च करें
   - प्रारंभिक सेटअप विज़ार्ड पूरा करें

3. **स्थापना सत्यापित करें**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux स्थापना

1. **Docker इंजन इंस्टॉल करें**:
   ```bash
   # उबंटू/डेबियन
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # समूह परिवर्तनों को प्रभावी करने के लिए लॉग आउट करें और फिर से लॉग इन करें
   ```

2. **Docker Compose इंस्टॉल करें**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI स्थापित करें

Azure CLI Azure संसाधन तैनाती और प्रबंधन सक्षम करता है।

#### Windows स्थापना

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS स्थापना

```bash
# होमब्रू का उपयोग करना
brew install azure-cli

# या इंस्टॉलर का उपयोग करना
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux स्थापना

```bash
# उबंटू/डेबियन
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# आरएचईएल/सेंटओएस
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### सत्यापन और प्रामाणिकता

```bash
# स्थापना की जांच करें
az version

# Azure में लॉगिन करें
az login

# डिफ़ॉल्ट सदस्यता सेट करें (अगर आपके पास एक से अधिक हैं)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git स्थापित करें

Git रिपॉजिटरी क्लोनिंग और संस्करण नियंत्रण के लिए आवश्यक है।

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git आमतौर पर पहले से इंस्टॉल होता है, लेकिन आप इसे Homebrew के माध्यम से अपडेट कर सकते हैं
brew install git
```

#### Linux

```bash
# उबुन्टू/डेबियन
sudo apt update && sudo apt install git

# आरएचईएल/सेंटओएस
sudo dnf install git
```

### 4. VS Code स्थापित करें

Visual Studio Code MCP समर्थन के साथ एकीकृत विकास वातावरण प्रदान करता है।

#### स्थापना

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### आवश्यक एक्सटेंशन्स

ये VS Code एक्सटेंशन्स स्थापित करें:

```bash
# कमांड लाइन के माध्यम से इंस्टॉल करें
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

या VS Code के माध्यम से इंस्टॉल करें:
1. VS Code खोलें
2. एक्सटेंशन्स पर जाएं (Ctrl+Shift+X)
3. निम्नलिखित इंस्टॉल करें:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python स्थापित करें

MCP सर्वर विकास के लिए Python 3.8+ आवश्यक है।

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# होमब्रू का उपयोग करना
brew install python@3.11
```

#### Linux

```bash
# उबुन्टू/डेबियन
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# आरएचईएल/सेंटओएस
sudo dnf install python3.11 python3.11-pip
```

#### स्थापना सत्यापित करें

```bash
python --version  # Python 3.11.x दिखाना चाहिए
pip --version      # pip संस्करण दिखाना चाहिए
```

## 🚀 परियोजना सेटअप

### 1. रिपॉजिटरी क्लोन करें

```bash
# मुख्य रिपॉजिटरी को क्लोन करें
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# परियोजना निर्देशिका में जाएं
cd MCP-Server-and-PostgreSQL-Sample-Retail

# रिपॉजिटरी संरचना सत्यापित करें
ls -la
```

### 2. Python वर्चुअल पर्यावरण बनाएँ

```bash
# वर्चुअल पर्यावरण बनाएँ
python -m venv mcp-env

# वर्चुअल पर्यावरण सक्रिय करें
# विंडोज़
mcp-env\Scripts\activate

# मैकओएस/लिनक्स
source mcp-env/bin/activate

# पिप को अपग्रेड करें
python -m pip install --upgrade pip
```

### 3. Python निर्भरताएँ स्थापित करें

```bash
# विकास निर्भरताएँ स्थापित करें
pip install -r requirements.lock.txt

# मुख्य पैकेजों की पुष्टि करें
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure संसाधन तैनाती

### 1. संसाधन आवश्यकताओं को समझें

हमारे MCP सर्वर को ये Azure संसाधन चाहिए:

| **संसाधन** | **उद्देश्य** | **अनुमानित लागत** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI मॉडल होस्टिंग और प्रबंधन | $10-50/माह |
| **OpenAI तैनाती** | टेक्स्ट एम्बेडिंग मॉडल (text-embedding-3-small) | $5-20/माह |
| **Application Insights** | निगरानी और टेलीमेट्री | $5-15/माह |
| **Resource Group** | संसाधन संगठन | मुफ्त |

### 2. Azure संसाधन तैनात करें

#### विकल्प A: स्वचालित तैनाती (अनुशंसित)

```bash
# इन्फ्रास्ट्रक्चर निर्देशिका पर जाएं
cd infra

# विंडोज़ - पावरशेल
./deploy.ps1

# मैकओएस/लिनक्स - बैश
./deploy.sh
```

तैनाती स्क्रिप्ट निम्नलिखित करेगी:
1. एक विशिष्ट संसाधन समूह बनाएगी
2. Microsoft Foundry संसाधनों को तैनात करेगी
3. text-embedding-3-small मॉडल तैनात करेगी
4. Application Insights कॉन्फ़िगर करेगी
5. प्रमाणीकरण के लिए सेवा प्रिंसिपल बनाएगी
6. कॉन्फ़िगरेशन के साथ `.env` फ़ाइल बनाएगी

#### विकल्प B: मैनुअल तैनाती

यदि आप मैनुअल नियंत्रण पसंद करते हैं या स्वचालित स्क्रिप्ट विफल होती है:

```bash
# चर सेट करें
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# संसाधन समूह बनाएँ
az group create --name $RESOURCE_GROUP --location $LOCATION

# मुख्य टेम्पलेट तैनात करें
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure तैनाती सत्यापित करें

```bash
# संसाधन समूह जांचें
az group show --name $RESOURCE_GROUP --output table

# तैनात संसाधनों की सूची बनाएं
az resource list --resource-group $RESOURCE_GROUP --output table

# एआई सेवा का परीक्षण करें
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. पर्यावरण चर कॉन्फ़िगर करें

तैनाती के बाद, आपके पास `.env` फ़ाइल होनी चाहिए। सत्यापित करें कि इसमें शामिल हैं:

```bash
# .env फ़ाइल की सामग्री
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# डेटाबेस कॉन्फ़िगरेशन (विकास के लिए)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker पर्यावरण सेटअप

### 1. Docker कंपोज़िशन को समझें

हमारा विकास पर्यावरण Docker Compose का उपयोग करता है:

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

### 2. विकास पर्यावरण प्रारंभ करें

```bash
# सुनिश्चित करें कि आप प्रोजेक्ट रूट डायरेक्टरी में हैं
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# सेवाएं शुरू करें
docker-compose up -d

# सेवा स्थिति जांचें
docker-compose ps

# लॉग देखें
docker-compose logs -f
```

### 3. डेटाबेस सेटअप सत्यापित करें

```bash
# PostgreSQL कंटेनर से कनेक्ट करें
docker-compose exec postgres psql -U postgres -d zava

# डेटाबेस संरचना जांचें
\dt retail.*

# नमूना डेटा सत्यापित करें
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL से बाहर निकलें
\q
```

### 4. MCP सर्वर का परीक्षण करें

```bash
# MCP सर्वर स्वास्थ्य जांचें
curl http://localhost:8000/health

# बुनियादी MCP एंडपॉइंट का परीक्षण करें
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code कॉन्फ़िगरेशन

### 1. MCP इंटीग्रेशन कॉन्फ़िगर करें

VS Code MCP कॉन्फ़िगरेशन बनाएँ:

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

### 2. Python पर्यावरण कॉन्फ़िगर करें

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

### 3. VS Code इंटीग्रेशन का परीक्षण करें

1. **परियोजना को VS Code में खोलें**:
   ```bash
   code .
   ```

2. **AI चैट खोलें**:
   - `Ctrl+Shift+P` (Windows/Linux) या `Cmd+Shift+P` (macOS) दबाएं
   - "AI Chat" टाइप करें और "AI Chat: Open Chat" चुनें

3. **MCP सर्वर कनेक्शन का परीक्षण करें**:
   - AI Chat में, `#zava` टाइप करें और किसी भी कॉन्फ़िगर किए गए सर्वर का चयन करें
   - पूछें: "डेटाबेस में कौन से टेबल उपलब्ध हैं?"
   - आपको रिटेल डेटाबेस टेबलों की सूची के साथ उत्तर मिलना चाहिए

## ✅ पर्यावरण सत्यापन

### 1. व्यापक सिस्टम सत्यापन

अपना सेटअप सत्यापित करने के लिए यह सत्यापन स्क्रिप्ट चलाएँ:

```bash
# सत्यापन स्क्रिप्ट बनाएँ
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
    
    # पायथन संस्करण जांचें
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # आवश्यक पैकेज जांचें
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # डॉकर जांचें
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Azure CLI जांचें
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # पर्यावरण चर जांचें
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
    
    # डेटाबेस कनेक्शन जांचें
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # क्वेरी परीक्षण करें
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
    
    # MCP सर्वर जांचें
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
    
    # Azure AI सेवा जांचें
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # यदि प्रमाणपत्र अवैध हैं तो यह विफल हो जाएगा
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

# सत्यापन चलाएँ
python validate_setup.py
```

### 2. मैनुअल सत्यापन चेकलिस्ट

**✅ बुनियादी उपकरण**
- [ ] Docker संस्करण 20.10+ स्थापित और चल रहा है
- [ ] Azure CLI 2.40+ स्थापित और प्रमाणीकरण किया गया
- [ ] Python 3.8+ और pip स्थापित है
- [ ] Git 2.30+ स्थापित है
- [ ] आवश्यक एक्सटेंशन्स के साथ VS Code

**✅ Azure संसाधन**
- [ ] संसाधन समूह सफलतापूर्वक बनाया गया
- [ ] AI Foundry प्रोजेक्ट तैनात किया गया
- [ ] OpenAI text-embedding-3-small मॉडल तैनात किया गया
- [ ] Application Insights कॉन्फ़िगर किया गया
- [ ] उपयुक्त अनुमतियों के साथ सेवा प्रिंसिपल बनाया गया

**✅ पर्यावरण कॉन्फ़िगरेशन**
- [ ] `.env` फ़ाइल सभी आवश्यक वैरिएबल्स के साथ बनाई गई
- [ ] Azure क्रेडेंशियल्स काम कर रहे हैं ( `az account show` से जांचें)
- [ ] PostgreSQL कंटेनर चल रहा है और पहुँच योग्य है
- [ ] डेटाबेस में नमूना डेटा लोड किया गया

**✅ VS Code इंटीग्रेशन**
- [ ] `.vscode/mcp.json` कॉन्फ़िगर किया गया
- [ ] Python इंटरप्रिटर वर्चुअल पर्यावरण पर सेट है
- [ ] AI Chat में MCP सर्वर दिखाई दे रहे हैं
- [ ] AI Chat के माध्यम से परीक्षण क्वेरियाँ निष्पादित कर सकते हैं

## 🛠️ सामान्य समस्याओं का निवारण

### Docker समस्याएँ

**समस्या**: Docker कंटेनर शुरू नहीं होते
```bash
# डॉकर सेवा की स्थिति जांचें
docker info

# उपलब्ध संसाधनों की जांच करें
docker system df

# आवश्यकता हो तो सफाई करें
docker system prune -f

# डॉकर डेस्कटॉप पुनरारंभ करें (विंडोज/मैकओएस)
# या डॉकर सेवा पुनरारंभ करें (लिनक्स)
sudo systemctl restart docker
```

**समस्या**: PostgreSQL कनेक्शन विफल होता है
```bash
# कंटेनर लॉग जांचें
docker-compose logs postgres

# कंटेनर स्वस्थ है यह सत्यापित करें
docker-compose ps

# सीधे कनेक्शन का परीक्षण करें
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure तैनाती समस्याएँ

**समस्या**: Azure तैनाती विफल होती है
```bash
# Azure CLI प्रमाणीकरण जांचें
az account show

# सदस्यता अनुमतियों की पुष्टि करें
az role assignment list --assignee $(az account show --query user.name -o tsv)

# संसाधन प्रदाता पंजीकरण जांचें
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**समस्या**: AI सेवा प्रमाणीकरण विफल होता है
```bash
# सेवा प्रमुख का परीक्षण करें
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# एआई सेवा परिनियोजन सत्यापित करें
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python पर्यावरण समस्याएँ

**समस्या**: पैकेज स्थापना विफल होती है
```bash
# pip और setuptools को अपग्रेड करें
python -m pip install --upgrade pip setuptools wheel

# pip कैश साफ़ करें
pip cache purge

# समस्याओं की पहचान के लिए पैकेज एक-एक करके इंस्टॉल करें
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**समस्या**: VS Code Python इंटरप्रिटर नहीं ढूंढ पाता
```bash
# पाइथन इंटरप्रेटर पथ दिखाएं
which python  # macOS/Linux
where python  # Windows

# पहले वर्चुअल एनवायरनमेंट सक्रिय करें
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# फिर VS कोड खोलें
code .
```

## 🎯 मुख्य निष्कर्ष

इस लैब को पूरा करने के बाद, आपके पास होना चाहिए:

✅ **पूर्ण विकास पर्यावरण**: सभी उपकरण स्थापित और कॉन्फ़िगर किए हुए  
✅ **Azure संसाधन तैनात**: AI सेवाएं और सहायक अवसंरचना  
✅ **Docker पर्यावरण चल रहा है**: PostgreSQL और MCP सर्वर कंटेनर  
✅ **VS Code इंटीग्रेशन**: MCP सर्वर कॉन्फ़िगर और सुलभ  
✅ **सत्यापित सेटअप**: सभी घटक परीक्षण और साथ में काम कर रहे हैं  
✅ **समस्या निवारण ज्ञान**: सामान्य मुद्दे और समाधान  

## 🚀 आगे क्या

अपने पर्यावरण के तैयार होने के साथ, जारी रखें **[Lab 04: Database Design and Schema](../04-Database/README.md)** के साथ:

- रिटेल डेटाबेस स्कीमा का विस्तार से अन्वेषण करें
- मल्टी-टेनेंट डेटा मॉडलिंग समझें
- रो लेवल सिक्योरिटी के कार्यान्वयन को जानें
- नमूना रिटेल डेटा के साथ कार्य करें

## 📚 अतिरिक्त संसाधन

### विकास उपकरण
- [Docker Documentation](https://docs.docker.com/) - पूर्ण Docker संदर्भ
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/) - Azure CLI कमांड
- [VS Code Documentation](https://code.visualstudio.com/docs) - संपादक कॉन्फ़िगरेशन और एक्सटेंशन्स

### Azure सेवाएँ
- [Microsoft Foundry Documentation](https://docs.microsoft.com/azure/ai-foundry/) - AI सेवा कॉन्फ़िगरेशन
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI मॉडल तैनाती
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - निगरानी सेटअप

### Python विकास
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) - पर्यावरण प्रबंधन
- [AsyncIO Documentation](https://docs.python.org/3/library/asyncio.html) - असिंक्रोनस प्रोग्रामिंग पैटर्न
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - वेब फ्रेमवर्क पैटर्न

---

**अगला**: पर्यावरण तैयार है? **[Lab 04: Database Design and Schema](../04-Database/README.md)** के साथ जारी रखें।

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**अस्वीकरण**:
इस दस्तावेज़ का अनुवाद AI अनुवाद सेवा [Co-op Translator](https://github.com/Azure/co-op-translator) का उपयोग करके किया गया है। जबकि हम सटीकता के लिए प्रयास करते हैं, कृपया ध्यान दें कि स्वचालित अनुवादों में त्रुटियाँ या अशुद्धियाँ हो सकती हैं। मूल दस्तावेज़ अपनी मूल भाषा में ही प्रामाणिक स्रोत माना जाना चाहिए। महत्वपूर्ण जानकारी के लिए, पेशेवर मानव अनुवाद की सिफारिश की जाती है। इस अनुवाद के उपयोग से उत्पन्न किसी भी गलतफहमी या गलत व्याख्या के लिए हम उत्तरदायी नहीं हैं।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->