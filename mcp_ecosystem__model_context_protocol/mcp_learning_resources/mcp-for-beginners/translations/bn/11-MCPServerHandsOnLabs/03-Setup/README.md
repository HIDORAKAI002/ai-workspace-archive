# পরিবেশ সেটআপ

## 🎯 এই ল্যাবটি কী কভার করে

এই হ্যান্ডস-অন ল্যাবটি আপনাকে MCP সার্ভারগুলি PostgreSQL ইন্টিগ্রেশনের সাথে তৈরি করার জন্য একটি পূর্ণাঙ্গ ডেভেলপমেন্ট পরিবেশ সেটআপ করার জন্য গাইড করে। আপনি সকল প্রয়োজনীয় সরঞ্জাম কনফিগার করবেন, Azure রিসোর্স ডিপ্লয় করবেন, এবং বাস্তবায়নের আগে আপনার সেটআপ যাচাই করবেন।

## ওভারভিউ

সফল MCP সার্ভার ডেভেলপমেন্টের জন্য একটি সঠিক ডেভেলপমেন্ট পরিবেশ অপরিহার্য। এই ল্যাবটি Docker, Azure সার্ভিসেস, ডেভেলপমেন্ট টুলস সেটআপ করার জন্য ধাপে ধাপে নির্দেশনা দেয় এবং যাচাই করে যে সবকিছু সঠিকভাবে কাজ করছে।

এই ল্যাবের শেষে, আপনার কাছে Zava Retail MCP সার্ভার তৈরির জন্য একটি সম্পূর্ণ কার্যকর ডেভেলপমেন্ট পরিবেশ থাকবে।

## শেখার উদ্দেশ্য

এই ল্যাবের শেষে, আপনি সক্ষম হবেন:

- **সমস্ত প্রয়োজনীয় ডেভেলপমেন্ট টুলস** ইনস্টল ও কনফিগার করতে
- MCP সার্ভারের জন্য **Azure রিসোর্স ডিপ্লয়** করতে
- PostgreSQL এবং MCP সার্ভারের জন্য **Docker কনটেইনার সেটআপ** করতে
- টেস্ট সংযোগের মাধ্যমে **আপনার পরিবেশ যাচাই** করতে
- সাধারণ সেটআপ সমস্যা এবং কনফিগারেশন সমস্যা **সমাধান** করতে
- ডেভেলপমেন্ট ওয়ার্কফ্লো এবং ফাইল স্ট্রাকচার **বোঝার**

## 📋 প্রয়োজনীয় শর্তাদি যাচাই

শুরু করার আগে নিশ্চিত করুন আপনার কাছে:

### প্রয়োজনীয় জ্ঞান
- বেসিক কমান্ড লাইন ব্যবহার (Windows Command Prompt/PowerShell)
- পরিবেশ ভেরিয়েবলগুলোর ধারণা
- Git ভার্সন কন্ট্রোলের সাথে পরিচিতি
- বেসিক Docker ধারণা (কনটেইনার, ইমেজ, ভলিউম)

### সিস্টেমের প্রয়োজনীয়তা
- **অপারেটিং সিস্টেম**: Windows 10/11, macOS, বা Linux
- **RAM**: ন্যূনতম ৮GB (১৬GB সুপারিশকৃত)
- **স্টোরেজ**: অন্তত ১০GB ফাকা জায়গা
- **নেটওয়ার্ক**: ডাউনলোড ও Azure ডিপ্লয়মেন্টের জন্য ইন্টারনেট সংযোগ

### অ্যাকাউন্ট প্রয়োজনীয়তা
- **Azure সাবস্ক্রিপশন**: ফ্রি টিয়ার যথেষ্ট
- **GitHub অ্যাকাউন্ট**: রিপোজিটরি অ্যাক্সেসের জন্য
- **Docker Hub অ্যাকাউন্ট**: (ঐচ্ছিক) কাস্টম ইমেজ পাবলিশিংয়ের জন্য

## 🛠️ টুল ইনস্টলেশন

### ১। Docker Desktop ইনস্টল করুন

Docker আমাদের ডেভেলপমেন্ট সেটআপের জন্য কনটেইনারাইজড পরিবেশ প্রদান করে।

#### Windows ইনস্টলেশন

1. **Docker Desktop ডাউনলোড করুন**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **ইনস্টল এবং কনফিগার করুন**:
   - অ্যাডমিনিস্ট্রেটর হিসেবে ইনস্টলার চালান
   - প্রম্পট পেলে WSL 2 ইন্টিগ্রেশন সক্রিয় করুন
   - ইনস্টলেশন শেষ হলে কম্পিউটার রিস্টার্ট দিন

3. **ইনস্টলেশন যাচাই করুন**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS ইনস্টলেশন

1. **ডাউনলোড ও ইনস্টল করুন**:
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg থেকে ডাউনলোড করুন
   # অথবা Homebrew ব্যবহার করুন
   brew install --cask docker
   ```

2. **Docker Desktop চালু করুন**:
   - Applications থেকে Docker Desktop লঞ্চ করুন
   - প্রাথমিক সেটআপ উইজার্ড সম্পন্ন করুন

3. **ইনস্টলেশন যাচাই করুন**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux ইনস্টলেশন

1. **Docker Engine ইনস্টল করুন**:
   ```bash
   # উবুন্টু/ডেবিয়ান
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # গ্রুপ পরিবর্তন কার্যকর হওয়ার জন্য লগ আউট করে পুনরায় লগ ইন করুন
   ```

2. **Docker Compose ইনস্টল করুন**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### ২। Azure CLI ইনস্টল করুন

Azure CLI დაგიწევთ Azure রিসোর্স ডিপ্লয়মেন্ট এবং ম্যানেজমেন্ট করার জন্য।

#### Windows ইনস্টলেশন

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS ইনস্টলেশন

```bash
# হোমব্রু ব্যবহার করা হচ্ছে
brew install azure-cli

# অথবা ইনস্টলার ব্যবহার করা হচ্ছে
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux ইনস্টলেশন

```bash
# উবুন্টু/ডেবিয়ান
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# আরএইচইএল/সেন্টওএস
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### যাচাই ও অথেন্টিকেট

```bash
# ইনস্টলেশন পরীক্ষা করুন
az version

# Azure এ লগইন করুন
az login

# ডিফল্ট সাবস্ক্রিপশন সেট করুন (যদি আপনার একাধিক থাকে)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### ৩। Git ইনস্টল করুন

Git রিপোজিটরি ক্লোন এবং ভার্সন কন্ট্রোলের জন্য প্রয়োজন।

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# সাধারণত গিট পূর্ব-ইনস্টল করা থাকে, তবে আপনি হোমব্রু ব্যবহার করে আপডেট করতে পারেন
brew install git
```

#### Linux

```bash
# উবুন্টু/ডেবিয়ান
sudo apt update && sudo apt install git

# আরএইচইএল/সেন্টওএস
sudo dnf install git
```

### ৪। VS Code ইনস্টল করুন

Visual Studio Code MCP সাপোর্ট সহ একটি ইন্টিগ্রেটেড ডেভেলপমেন্ট এনভায়রনমেন্ট প্রদান করে।

#### ইনস্টলেশন

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### প্রয়োজনীয় এক্সটেনশনস

এই VS Code এক্সটেনশনস ইনস্টল করুন:

```bash
# কমান্ড লাইন থেকে ইনস্টল করুন
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

অথবা VS Code থেকে ইনস্টল করুন:
1. VS Code খুলুন
2. এক্সটেনশনস (Ctrl+Shift+X) এ যান
3. ইনস্টল করুন:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### ৫। Python ইনস্টল করুন

MCP সার্ভার ডেভেলপমেন্টের জন্য Python 3.8+ প্রয়োজন।

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# হোমব্রিউ ব্যবহার করা হচ্ছে
brew install python@3.11
```

#### Linux

```bash
# উবুন্টু/ডেবিয়ান
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# আরইএইচইএল/সেন্টওএস
sudo dnf install python3.11 python3.11-pip
```

#### ইনস্টলেশন যাচাই করুন

```bash
python --version  # Python 3.11.x দেখানো উচিত
pip --version      # pip সংস্করণ দেখানো উচিত
```

## 🚀 প্রকল্প সেটআপ

### ১। রিপোজিটরি ক্লোন করুন

```bash
# প্রধান রেপোজিটরি ক্লোন করুন
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# প্রকল্প ডিরেক্টরিতে যান
cd MCP-Server-and-PostgreSQL-Sample-Retail

# রেপোজিটরি কাঠামো যাচাই করুন
ls -la
```

### ২। Python ভার্চুয়াল এনভায়রনমেন্ট তৈরি করুন

```bash
# ভার্চুয়াল পরিবেশ তৈরি করুন
python -m venv mcp-env

# ভার্চুয়াল পরিবেশ সক্রিয় করুন
# উইন্ডোজ
mcp-env\Scripts\activate

# ম্যাকওএস/লিনাক্স
source mcp-env/bin/activate

# pip আপগ্রেড করুন
python -m pip install --upgrade pip
```

### ৩। Python নির্ভরতা ইনস্টল করুন

```bash
# ডেভেলপমেন্ট নির্ভরশীলতাগুলো ইনস্টল করুন
pip install -r requirements.lock.txt

# মূল প্যাকেজগুলো যাচাই করুন
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure রিসোর্স ডিপ্লয়মেন্ট

### ১। রিসোর্সের প্রয়োজনীয়তা বুঝুন

আমাদের MCP সার্ভারের জন্য এই Azure রিসোর্সগুলো প্রয়োজন:

| **রিসোর্স** | **উদ্দেশ্য** | **আনুমানিক খরচ** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI মডেল হোস্টিং এবং ব্যবস্থাপনা | $10-50/মাস |
| **OpenAI Deployment** | টেক্সট এম্বেডিং মডেল (text-embedding-3-small) | $5-20/মাস |
| **Application Insights** | মনিটরিং ও টেলিমেট্রি | $5-15/মাস |
| **Resource Group** | রিসোর্স সংগঠন | ফ্রি |

### ২। Azure রিসোর্স ডিপ্লয় করুন

#### অপশন A: অটোমেটেড ডিপ্লয়মেন্ট (সফলভাবে সুপারিশকৃত)

```bash
# অবকাঠামো ডিরেক্টরিতে নেভিগেট করুন
cd infra

# উইন্ডোজ - পাওয়ারশেল
./deploy.ps1

# ম্যাকওএস/লিনাক্স - ব্যাশ
./deploy.sh
```

ডিপ্লয়মেন্ট স্ক্রিপ্ট করবে:
1. একটি ইউনিক রিসোর্স গ্রুপ তৈরি
2. Microsoft Foundry রিসোর্স ডিপ্লয়
3. text-embedding-3-small মডেল ডিপ্লয়
4. Application Insights কনফিগার
5. অথেনটিকেশনের জন্য সার্ভিস প্রিন্সিপাল তৈরি
6. `.env` ফাইল কনফিগারেশন সহ জেনারেট

#### অপশন B: ম্যানুয়াল ডিপ্লয়মেন্ট

যদি আপনি ম্যানুয়াল কন্ট্রোল চান বা অটোমেটেড স্ক্রিপ্ট ব্যর্থ হয়:

```bash
# ভেরিয়েবল সেট করুন
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# রিসোর্স গ্রুপ তৈরি করুন
az group create --name $RESOURCE_GROUP --location $LOCATION

# মূল টেমপ্লেট ডিপ্লয় করুন
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### ৩। Azure ডিপ্লয়মেন্ট যাচাই করুন

```bash
# রিসোর্স গ্রুপ পরীক্ষা করুন
az group show --name $RESOURCE_GROUP --output table

# স্থাপন করা রিসোর্সসমূহ তালিকা করুন
az resource list --resource-group $RESOURCE_GROUP --output table

# AI সেবা পরীক্ষা করুন
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### ৪। পরিবেশ ভেরিয়েবল কনফিগার করুন

ডিপ্লয়মেন্ট শেষে, আপনার কাছে `.env` ফাইল থাকা উচিত। যাচাই করুন এতে রয়েছে:

```bash
# .env ফাইলের বিষয়বস্তু
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# ডাটাবেস কনফিগারেশন (উন্নয়নের জন্য)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker পরিবেশ সেটআপ

### ১। Docker Composition বুঝুন

আমাদের ডেভেলপমেন্ট এনভায়রনমেন্ট Docker Compose ব্যবহার করে:

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

### ২। ডেভেলপমেন্ট এনভায়রনমেন্ট শুরু করুন

```bash
# নিশ্চিত করুন আপনি প্রকল্পের মূল ডিরেক্টরিতে আছেন
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# পরিষেবাগুলি শুরু করুন
docker-compose up -d

# পরিষেবা অবস্থা চেক করুন
docker-compose ps

# লগগুলি দেখুন
docker-compose logs -f
```

### ৩। ডাটাবেস সেটআপ যাচাই করুন

```bash
# PostgreSQL কন্টেইনারের সাথে সংযুক্ত হন
docker-compose exec postgres psql -U postgres -d zava

# ডাটাবেস কাঠামো পরীক্ষা করুন
\dt retail.*

# উদাহরণ ডেটা যাচাই করুন
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL থেকে বেরিয়ে আসুন
\q
```

### ৪। MCP সার্ভার টেস্ট করুন

```bash
# MCP সার্ভারের স্বাস্থ্য পরীক্ষা করুন
curl http://localhost:8000/health

# মৌলিক MCP এন্ডপয়েন্ট পরীক্ষা করুন
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code কনফিগারেশন

### ১। MCP ইন্টিগ্রেশন কনফিগার করুন

VS Code MCP কনফিগারেশন তৈরি করুন:

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

### ২। Python এনভায়রনমেন্ট কনফিগার করুন

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

### ৩। VS Code ইন্টিগ্রেশন টেস্ট করুন

1. **প্রকল্পটি VS Code-এ খুলুন**:
   ```bash
   code .
   ```

2. **AI Chat খুলুন**:
   - `Ctrl+Shift+P` (Windows/Linux) অথবা `Cmd+Shift+P` (macOS) প্রেস করুন
   - "AI Chat" টাইপ করুন এবং "AI Chat: Open Chat" নির্বাচন করুন

3. **MCP সার্ভার সংযোগ পরীক্ষা করুন**:
   - AI Chat-এ টাইপ করুন `#zava` এবং কনফিগার করা সার্ভার থেকে একটি নির্বাচন করুন
   - প্রশ্ন করুন: "ডাটাবেসে কোন কোন টেবিল পাওয়া যায়?"
   - আপনি একটি উত্তর পাবেন যেটা রিটেইল ডাটাবেস টেবিলগুলো তালিকাভুক্ত করবে

## ✅ পরিবেশ যাচাই

### ১। ব্যাপক সিস্টেম পরীক্ষা

আপনার সেটআপ যাচাই করার জন্য এই ভ্যালিডেশন স্ক্রিপ্ট চালান:

```bash
# ভ্যালিডেশন স্ক্রিপ্ট তৈরি করুন
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
    
    # পাইথন সংস্করণ পরীক্ষা করুন
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # প্রয়োজনীয় প্যাকেজগুলি পরীক্ষা করুন
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # ডকার পরীক্ষা করুন
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # আজুর CLI পরীক্ষা করুন
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # পরিবেশ ভেরিয়েবলগুলি পরীক্ষা করুন
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
    
    # ডাটাবেস সংযোগ পরীক্ষা করুন
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # প্রশ্ন পরীক্ষা করুন
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
    
    # MCP সার্ভার পরীক্ষা করুন
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
    
    # আজুর AI সেবা পরীক্ষা করুন
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # যদি শংসাপত্রগুলি অবৈধ হয় তবে এটি ব্যর্থ হবে
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

# ভ্যালিডেশন চালান
python validate_setup.py
```

### ২। ম্যানুয়াল যাচাই চেকলিস্ট

**✅ বেসিক টুলস**
- [ ] Docker ভের্সন ২০.১০+ ইনস্টল ও চালু আছে
- [ ] Azure CLI ২.৪০+ ইনস্টল এবং অথেন্টিকেটেড
- [ ] Python ৩.৮+ এবং pip ইনস্টল
- [ ] Git ২.৩০+ ইনস্টল
- [ ] VS Code প্রয়োজনীয় এক্সটেনশনসহ

**✅ Azure রিসোর্স**
- [ ] রিসোর্স গ্রুপ সফলভাবে তৈরি
- [ ] AI Foundry প্রজেক্ট ডিপ্লয়
- [ ] OpenAI text-embedding-3-small মডেল ডিপ্লয়
- [ ] Application Insights কনফিগার
- [ ] সার্ভিস প্রিন্সিপাল সঠিক পারমিশনসহ তৈরি

**✅ পরিবেশ কনফিগারেশন**
- [ ] `.env` ফাইল সমস্ত প্রয়োজনীয় ভেরিয়েবলসহ তৈরি
- [ ] Azure ক্রেডেনশিয়াল কাজ করছে (পরীক্ষা করতে `az account show`)
- [ ] PostgreSQL কনটেইনার চালু এবং অ্যাক্সেসযোগ্য
- [ ] ডাটাবেসে স্যাম্পল ডেটা লোড করা

**✅ VS Code ইন্টিগ্রেশন**
- [ ] `.vscode/mcp.json` কনফিগারড
- [ ] Python ইন্টারপ্রেটার ভার্চুয়াল এনভায়রনমেন্টে সেট
- [ ] AI Chat-এ MCP সার্ভারগুলো দৃশ্যমান
- [ ] AI Chat থেকে টেস্ট কুয়েরি চালানো যায়

## 🛠️ সাধারণ সমস্যা সমাধান

### Docker সমস্যা

**সমস্যা**: Docker কনটেইনার শুরু হচ্ছে না  
```bash
# ডকার সার্ভিসের অবস্থা যাচাই করুন
docker info

# উপলব্ধ সম্পদ যাচাই করুন
docker system df

# প্রয়োজনে পরিষ্কার করুন
docker system prune -f

# ডকার ডেস্কটপ পুনরায় চালু করুন (উইন্ডোজ/ম্যাকওএস)
# অথবা ডকার সার্ভিস পুনরায় চালু করুন (লিনাক্স)
sudo systemctl restart docker
```

**সমস্যা**: PostgreSQL সংযোগ ব্যর্থ  
```bash
# কন্টেইনার লগ চেক করুন
docker-compose logs postgres

# কন্টেইনার সুস্থ আছে কিনা যাচাই করুন
docker-compose ps

# সরাসরি সংযোগ পরীক্ষা করুন
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure ডিপ্লয়মেন্ট সমস্যা

**সমস্যা**: Azure ডিপ্লয়মেন্ট ব্যর্থ হয়  
```bash
# Azure CLI প্রমাণীকরণ পরীক্ষা করুন
az account show

# সাবস্ক্রিপশন অনুমতি যাচাই করুন
az role assignment list --assignee $(az account show --query user.name -o tsv)

# রিসোর্স প্রোভাইডার নিবন্ধন পরীক্ষা করুন
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**সমস্যা**: AI সার্ভিস অথেন্টিকেশন ব্যর্থ হয়  
```bash
# সার্ভিস প্রিন্সিপাল পরীক্ষা করুন
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# AI সার্ভিস ডিপ্লয়মেন্ট যাচাই করুন
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python পরিবেশ সমস্যা

**সমস্যা**: প্যাকেজ ইনস্টলেশন ব্যর্থ হয়  
```bash
# pip এবং setuptools আপগ্রেড করুন
python -m pip install --upgrade pip setuptools wheel

# pip ক্যাশ পরিষ্কার করুন
pip cache purge

# সমস্যাগুলি সনাক্ত করতে একে একে প্যাকেজগুলি ইনস্টল করুন
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**সমস্যা**: VS Code Python ইন্টারপ্রেটার খুঁজে পাচ্ছে না  
```bash
# পাইথন ইন্টারপ্রেটার পথগুলি দেখান
which python  # ম্যাকওএস/লিনাক্স
where python  # উইন্ডোজ

# প্রথমে ভার্চুয়াল এনভায়রনমেন্ট সক্রিয় করুন
source mcp-env/bin/activate  # ম্যাকওএস/লিনাক্স
mcp-env\Scripts\activate     # উইন্ডোজ

# তারপর ভিএস কোড খুলুন
code .
```

## 🎯 প্রধান লক্ষ্য

এই ল্যাব সম্পন্ন করার পরে, আপনার কাছে থাকবে:

✅ **সম্পূর্ণ ডেভেলপমেন্ট পরিবেশ**: সমস্ত টুল ইনস্টল ও কনফিগার  
✅ **Azure রিসোর্স ডিপ্লয়ড**: AI সার্ভিস ও সমর্থন অবকাঠামো  
✅ **Docker পরিবেশ চালু**: PostgreSQL এবং MCP সার্ভার কনটেইনার  
✅ **VS Code ইন্টিগ্রেশন**: MCP সার্ভার কনফিগারড ও অ্যাক্সেসযোগ্য  
✅ **যাচাই প্রক্রিয়া সম্পন্ন**: সমস্ত উপাদান পরীক্ষা ও সঠিকভাবে কাজ করছে  
✅ **সমস্যা সমাধানের জ্ঞান**: সাধারণ সমস্যা ও সমাধান  

## 🚀 পরবর্তী ধাপ

আপনার পরিবেশ প্রস্তুত, এখন চালিয়ে যান **[Lab 04: Database Design and Schema](../04-Database/README.md)** এ:

- রিটেইল ডাটাবেস স্কিমার বিস্তারিত অনুসন্ধান
- মাল্টি-টেন্যান্ট ডেটা মডেলিং বোঝা
- রো লেভেল সিকিউরিটির প্রয়োগ শেখা
- স্যাম্পল রিটেইল ডেটার সাথে কাজ করা

## 📚 অতিরিক্ত সম্পদ

### ডেভেলপমেন্ট টুলস
- [Docker ডকুমেন্টেশন](https://docs.docker.com/) - সম্পূর্ণ Docker রেফারেন্স
- [Azure CLI রেফারেন্স](https://docs.microsoft.com/cli/azure/) - Azure CLI কমান্ডস
- [VS Code ডকুমেন্টেশন](https://code.visualstudio.com/docs) - এডিটর কনফিগারেশন ও এক্সটেনশনস

### Azure সার্ভিসেস
- [Microsoft Foundry ডকুমেন্টেশন](https://docs.microsoft.com/azure/ai-foundry/) - AI সার্ভিস কনফিগারেশন
- [Azure OpenAI সার্ভিস](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI মডেল ডিপ্লয়মেন্ট
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - মনিটরিং সেটআপ

### Python ডেভেলপমেন্ট
- [Python ভার্চুয়াল এনভায়রনমেন্টস](https://docs.python.org/3/tutorial/venv.html) - পরিবেশ ম্যানেজমেন্ট
- [AsyncIO ডকুমেন্টেশন](https://docs.python.org/3/library/asyncio.html) - অ্যাসিঙ্ক্রোনাস প্রোগ্রামিং প্যাটার্নস
- [FastAPI ডকুমেন্টেশন](https://fastapi.tiangolo.com/) - ওয়েব ফ্রেমওয়ার্ক প্যাটার্নস

---

**পরবর্তী**: পরিবেশ প্রস্তুত? চালিয়ে যান [Lab 04: Database Design and Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**অস্বীকৃতি**:
এই নথিটি AI অনুবাদ পরিষেবা [Co-op Translator](https://github.com/Azure/co-op-translator) ব্যবহার করে অনূদিত হয়েছে। যদিও আমরা শুদ্ধতার জন্য চেষ্টা করি, অনুগ্রহ করে মনে রাখবেন যে স্বয়ংক্রিয় অনুবাদে ত্রুটি বা অসঙ্গতি থাকতে পারে। মূল নথিটি তার স্বভাষায় কর্তৃত্বপূর্ণ উৎস হিসেবে বিবেচিত হওয়া উচিত। গুরুত্বপূর্ণ তথ্যের জন্য পেশাদার মানব অনুবাদ সুপারিশ করা হয়। এই অনুবাদের ব্যবহারে প্রয়োজনীয় ভুল বোঝাবুঝি বা ভুল ব্যাখ্যার জন্য আমরা দায়বদ্ধ নই।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->