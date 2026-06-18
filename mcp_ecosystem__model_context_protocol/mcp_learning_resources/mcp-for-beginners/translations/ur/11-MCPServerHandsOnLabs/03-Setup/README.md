# ماحولیاتی سیٹ اپ

## 🎯 یہ لیب کیا کور کرتی ہے

یہ عملی لیب آپ کو MCP سرورز کی تعمیر کے لیے پوسٹگریس کیو ایل انٹیگریشن کے ساتھ مکمل ترقیاتی ماحول قائم کرنے کے عمل سے گزارتا ہے۔ آپ تمام ضروری ٹولز کی ترتیب کریں گے، ایزور ریسورسز تعینات کریں گے، اور عمل درآمد شروع کرنے سے پہلے اپنے سیٹ اپ کی تصدیق کریں گے۔

## جائزہ

ایک مناسب ترقیاتی ماحول MCP سرور کی کامیاب ترقی کے لیے بہت اہم ہے۔ یہ لیب آپ کو ڈاکر، ایزور سروسز، ترقیاتی ٹولز کی ترتیب اور یہ تصدیق کرنے کے لیے مرحلہ وار ہدایات فراہم کرتی ہے کہ سب کچھ درست طریقے سے کام کر رہا ہے۔

اس لیب کے اختتام پر، آپ کے پاس زوا ریٹیل MCP سرور بنانے کے لیے مکمل طور پر فعال ترقیاتی ماحول ہوگا۔

## سیکھنے کے مقاصد

اس لیب کے اختتام تک، آپ کر سکیں گے:

- **تمام مطلوبہ ترقیاتی ٹولز انسٹال اور ترتیب دیں**
- **MCP سرور کے لیے ایزور ریسورسز تعینات کریں**
- **پوسٹگریس کیو ایل اور MCP سرور کے لیے ڈاکر کنٹینرز سیٹ اپ کریں**
- **اپنے ماحولیاتی سیٹ اپ کی جانچ ٹیسٹ کنکشنز کے ذریعے کریں**
- **عام سیٹ اپ مسائل اور کنفیگریشن کے مسائل کو حل کریں**
- **ترقیاتی ورک فلو اور فائل اسٹرکچر کو سمجھیں**

## 📋 ضروریات کی جانچ

شروع کرنے سے پہلے، اس بات کو یقینی بنائیں کہ آپ کے پاس ہے:

### مطلوبہ علم
- بنیادی کمانڈ لائن کا استعمال (ونڈوز کمانڈ پرامپٹ/پاور شیل)
- ماحولیاتی متغیرات کی سمجھ
- Git ورژن کنٹرول سے واقفیت
- ڈاکر کے بنیادی تصورات (کنٹینرز، تصاویر، والیومز)

### سسٹم کی ضروریات
- **آپریٹنگ سسٹم**: ونڈوز 10/11، میک او ایس، یا لینکس
- **رام**: کم از کم 8GB (16GB تجویز کیا گیا)
- **اسٹوریج**: کم از کم 10GB فری اسپیس
- **نیٹ ورک**: ڈاؤن لوڈز اور ایزور تعیناتی کے لیے انٹرنیٹ کنکشن

### اکاؤنٹ کی ضروریات
- **ایزور سبسکرپشن**: مفت ٹیر کافی ہے
- **GitHub اکاؤنٹ**: ریپوزیٹری تک رسائی کے لیے
- **Docker Hub اکاؤنٹ**: (اختیاری) کسٹم تصویر اشاعت کے لیے

## 🛠️ ٹول انسٹالیشن

### 1. ڈاکر ڈیسک ٹاپ انسٹال کریں

ڈاکر ہمارے ترقیاتی سیٹ اپ کے لیے کنٹینرائزڈ ماحول فراہم کرتا ہے۔

#### ونڈوز انسٹالیشن

1. **ڈاکر ڈیسک ٹاپ ڈاؤن لوڈ کریں**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **انسٹال اور ترتیب دیں**:
   - انسٹالر کو ایڈمنسٹریٹر کے طور پر چلائیں
   - جب پوچھا جائے تو WSL 2 انٹیگریشن کو فعال کریں
   - انسٹالیشن مکمل ہونے پر کمپیوٹر کو ری اسٹارٹ کریں

3. **انسٹالیشن کی تصدیق کریں**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### میک او ایس انسٹالیشن

1. **ڈاؤن لوڈ اور انسٹال کریں**:
   ```bash
   # ڈاؤن لوڈ کریں https://desktop.docker.com/mac/stable/Docker.dmg سے
   # یا Homebrew استعمال کریں
   brew install --cask docker
   ```

2. **ڈاکر ڈیسک ٹاپ شروع کریں**:
   - ایپلیکیشنز سے ڈاکر ڈیسک ٹاپ لانچ کریں
   - ابتدائی سیٹ اپ وزرڈ مکمل کریں

3. **انسٹالیشن کی تصدیق کریں**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### لینکس انسٹالیشن

1. **ڈاکر انجن انسٹال کریں**:
   ```bash
   # اوبنٹو/ڈیبیان
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # گروپ میں تبدیلیاں مؤثر ہونے کے لیے لاگ آؤٹ کریں اور دوبارہ لاگ ان کریں
   ```

2. **ڈاکر کمپوز انسٹال کریں**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. ایزور CLI انسٹال کریں

ایزور CLI ایزور ریسورس تعیناتی اور مینجمنٹ کی سہولت دیتا ہے۔

#### ونڈوز انسٹالیشن

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### میک او ایس انسٹالیشن

```bash
# ہوم بریو کا استعمال
brew install azure-cli

# یا انسٹالر کا استعمال
curl -L https://aka.ms/InstallAzureCli | bash
```

#### لینکس انسٹالیشن

```bash
# اوبنٹو/ڈیبیان
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# آر ایچ ای ایل/سینٹ او ایس
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### تصدیق اور تصدیق کریں

```bash
# تنصیب کی جانچ کریں
az version

# Azure میں لاگ ان کریں
az login

# ڈیفالٹ سبسکرپشن سیٹ کریں (اگر آپ کے پاس متعدد ہیں)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git انسٹال کریں

Git ریپوزیٹری کلون کرنے اور ورژن کنٹرول کے لیے ضروری ہے۔

#### ونڈوز

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### میک او ایس

```bash
# گٹ عام طور پر پہلے سے نصب ہوتا ہے، لیکن آپ ہوم برو کے ذریعے اسے اپ ڈیٹ کر سکتے ہیں
brew install git
```

#### لینکس

```bash
# اوبنٹو/ڈیبیان
sudo apt update && sudo apt install git

# آر ایچ ای ایل/سینٹ او ایس
sudo dnf install git
```

### 4. VS Code انسٹال کریں

ویژوئل اسٹوڈیو کوڈ MCP سپورٹ کے ساتھ مربوط ترقیاتی ماحول فراہم کرتا ہے۔

#### انسٹالیشن

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### مطلوبہ ایکسٹینشنز

یہ VS Code ایکسٹینشنز انسٹال کریں:

```bash
# کمانڈ لائن کے ذریعے انسٹال کریں
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

یا VS Code کے ذریعے انسٹال کریں:
1. VS Code کھولیں
2. ایکسٹینشنز پر جائیں (Ctrl+Shift+X)
3. انسٹال کریں:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. پائتھن انسٹال کریں

MCP سرور ترقی کے لیے پائتھن 3.8+ ضروری ہے۔

#### ونڈوز

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### میک او ایس

```bash
# ہوم برو کا استعمال کرتے ہوئے
brew install python@3.11
```

#### لینکس

```bash
# اوبنٹو/ڈیبیئن
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# آر ایچ ای ایل/سینٹ او ایس
sudo dnf install python3.11 python3.11-pip
```

#### انسٹالیشن کی تصدیق

```bash
python --version  # پائتھن 3.11.x دکھانا چاہئے
pip --version      # پپ ورژن دکھانا چاہئے
```

## 🚀 پروجیکٹ سیٹ اپ

### 1. ریپوزیٹری کلون کریں

```bash
# مرکزی ذخیرہ کلون کریں
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# پروجیکٹ ڈائریکٹری میں جائیں
cd MCP-Server-and-PostgreSQL-Sample-Retail

# ذخیرہ کی ساخت کی تصدیق کریں
ls -la
```

### 2. پائتھن ورچوئل انوائرنمنٹ بنائیں

```bash
# ورچوئل ماحول بنائیں
python -m venv mcp-env

# ورچوئل ماحول کو فعال کریں
# ونڈوز
mcp-env\Scripts\activate

# میک او ایس / لینکس
source mcp-env/bin/activate

# pip کو اپ گریڈ کریں
python -m pip install --upgrade pip
```

### 3. پائتھن انحصارات انسٹال کریں

```bash
# ترقیاتی انحصار انسٹال کریں
pip install -r requirements.lock.txt

# اہم پیکیجز کی تصدیق کریں
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ ایزور ریسورس تعیناتی

### 1. ریسورس کی ضروریات سمجھیں

ہمارے MCP سرور کو درج ذیل ایزور ریسورسز کی ضرورت ہے:

| **ریسورس** | **مقصد** | **تخمینی قیمت** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI ماڈل کی میزبانی اور انتظام | $10-50/مہینہ |
| **OpenAI Deployment** | ٹیکسٹ ایمبیڈنگ ماڈل (text-embedding-3-small) | $5-20/مہینہ |
| **Application Insights** | مانیٹرنگ اور ٹیلیمیٹری | $5-15/مہینہ |
| **Resource Group** | ریسورس کی تنظیم | مفت |

### 2. ایزور ریسورس تعینات کریں

#### آپشن A: خودکار تعیناتی (تجویز کردہ)

```bash
# انفراسٹرکچر ڈائریکٹری پر جائیں
cd infra

# ونڈوز - پاور شیل
./deploy.ps1

# میک او ایس/لینکس - بش
./deploy.sh
```

تعیناتی اسکرپٹ کرے گا:
1. یکتا ریسورس گروپ بنائیں گے
2. Microsoft Foundry ریسورسز تعینات کریں گے
3. text-embedding-3-small ماڈل تعینات کریں گے
4. Application Insights کو ترتیب دیں گے
5. توثیق کے لیے سروس پرنسپل بنائیں گے
6. کنفیگریشن کے ساتھ `.env` فائل تیار کریں گے

#### آپشن B: دستی تعیناتی

اگر آپ دستی کنٹرول کو ترجیح دیتے ہیں یا خودکار اسکرپٹ ناکام ہو جائے:

```bash
# متغیرات سیٹ کریں
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# ریسورس گروپ بنائیں
az group create --name $RESOURCE_GROUP --location $LOCATION

# مرکزی ٹیمپلیٹ تعینات کریں
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. ایزور تعیناتی کی تصدیق کریں

```bash
# وسائل کے گروپ کی جانچ کریں
az group show --name $RESOURCE_GROUP --output table

# تعینات شدہ وسائل کی فہرست بنائیں
az resource list --resource-group $RESOURCE_GROUP --output table

# AI سروس کا ٹیسٹ کریں
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. ماحولیاتی متغیر ترتیب دیں

تعیناتی کے بعد، آپ کے پاس `.env` فائل ہونی چاہیے۔ اس بات کی تصدیق کریں کہ اس میں درج ہے:

```bash
# فائل .env کے مواد
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# ڈیٹا بیس کی ترتیبات (توسیع کے لئے)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 ڈاکر ماحول سیٹ اپ

### 1. ڈاکر کمپوزیشن سمجھیں

ہمارا ترقیاتی ماحول ڈاکر کمپوز استعمال کرتا ہے:

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

### 2. ترقیاتی ماحول شروع کریں

```bash
# یقینی بنائیں کہ آپ پراجیکٹ کی جڑ ڈائریکٹری میں ہیں
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# خدمات شروع کریں
docker-compose up -d

# خدمت کی حالت چیک کریں
docker-compose ps

# لاگز دیکھیں
docker-compose logs -f
```

### 3. ڈیٹا بیس سیٹ اپ کی تصدیق کریں

```bash
# پوسٹگری ایس کیو ایل کنٹینر سے رابطہ کریں
docker-compose exec postgres psql -U postgres -d zava

# ڈیٹا بیس کا ڈھانچہ چیک کریں
\dt retail.*

# نمونہ ڈیٹا کی تصدیق کریں
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# پوسٹگری ایس کیو ایل سے باہر نکلیں
\q
```

### 4. MCP سرور کا ٹیسٹ کریں

```bash
# ایم سی پی سرور کی صحت کی جانچ کریں
curl http://localhost:8000/health

# بنیادی ایم سی پی اینڈپوائنٹ کا ٹیسٹ کریں
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code کنفیگریشن

### 1. MCP انٹیگریشن ترتیب دیں

VS Code کے لیے MCP کنفیگریشن بنائیں:

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

### 2. پائتھن ماحول ترتیب دیں

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

### 3. VS Code انٹیگریشن کا ٹیسٹ کریں

1. **پروجیکٹ VS Code میں کھولیں**:
   ```bash
   code .
   ```

2. **AI چیٹ کھولیں**:
   - `Ctrl+Shift+P` (ونڈوز/لینکس) یا `Cmd+Shift+P` (میک او ایس) دبائیں
   - "AI Chat" ٹائپ کریں اور "AI Chat: Open Chat" منتخب کریں

3. **MCP سرور کنکشن کا ٹیسٹ کریں**:
   - AI چیٹ میں `#zava` ٹائپ کریں اور کنفیگر شدہ سرورز میں سے ایک منتخب کریں
   - پوچھیں: "ڈیٹا بیس میں کون سی ٹیبلز دستیاب ہیں؟"
   - آپ کو ریٹیل ڈیٹا بیس ٹیبلز کی لسٹ کے ساتھ جواب ملنا چاہیے

## ✅ ماحولیاتی تصدیق

### 1. مکمل سسٹم چیک

اپنے سیٹ اپ کی تصدیق کے لیے یہ ویلیڈیشن اسکرپٹ چلائیں:

```bash
# تصدیقی اسکرپٹ بنائیں
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
    
    # پائتھون ورژن چیک کریں
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # ضروری پیکجز چیک کریں
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # ڈاکر چیک کریں
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # ایزور CLI چیک کریں
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # ماحول کے متغیرات چیک کریں
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
    
    # ڈیٹا بیس کنکشن چیک کریں
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # کوئری ٹیسٹ کریں
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
    
    # MCP سرور چیک کریں
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
    
    # ایزور AI سروس چیک کریں
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # اگر اسناد غلط ہوں تو یہ ناکام ہو جائے گا
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

# تصدیق چلائیں
python validate_setup.py
```

### 2. دستی تصدیقی چیک لسٹ

**✅ بنیادی ٹولز**
- [ ] ڈاکر ورژن 20.10+ انسٹال اور چل رہا ہو
- [ ] ایزور CLI 2.40+ انسٹال اور تصدیق شدہ ہو
- [ ] پائتھن 3.8+ اور pip انسٹال ہوں
- [ ] Git 2.30+ انسٹال ہو
- [ ] VS Code مطلوبہ ایکسٹینشنز کے ساتھ

**✅ ایزور ریسورسز**
- [ ] ریسورس گروپ کامیابی سے بنایا گیا ہو
- [ ] AI Foundry پروجیکٹ تعینات ہو
- [ ] OpenAI text-embedding-3-small ماڈل تعینات ہو
- [ ] Application Insights ترتیب دی گئی ہو
- [ ] سروس پرنسپل مناسب اجازتوں کے ساتھ بنایا گیا ہو

**✅ ماحولیاتی ترتیب**
- [ ] `.env` فائل تمام مطلوبہ متغیرات کے ساتھ بنائی گئی ہو
- [ ] ایزور کریڈینشلز کام کر رہے ہوں (ٹیست `az account show` کے ساتھ)
- [ ] پوسٹگریس کیو ایل کنٹینر چل رہا اور قابل رسائی ہو
- [ ] ڈیٹا بیس میں سیمپل ڈیٹا لوڈ ہو

**✅ VS Code انٹیگریشن**
- [ ] `.vscode/mcp.json` ترتیب دی گئی ہو
- [ ] پائتھن انٹرفریٹر ورچوئل ماحول پر سیٹ ہو
- [ ] MCP سرورز AI چیٹ میں ظاہر ہوں
- [ ] AI چیٹ کے ذریعے ٹیسٹ سوالات انجام دے سکیں

## 🛠️ عام مسائل اور ان کا حل

### ڈاکر کے مسائل

**مسئلہ**: ڈاکر کنٹینرز شروع نہیں ہوتے
```bash
# ڈاکر سروس کی حالت چیک کریں
docker info

# دستیاب وسائط چیک کریں
docker system df

# ضرورت ہو تو صفائی کریں
docker system prune -f

# ڈاکر ڈیسک ٹاپ کو دوبارہ شروع کریں (ونڈوز/میك او ایس)
# یا ڈاکر سروس کو دوبارہ شروع کریں (لینکس)
sudo systemctl restart docker
```

**مسئلہ**: پوسٹگریس کیو ایل کنکشن ناکام ہو جاتا ہے
```bash
# کنٹینر کے لاگز چیک کریں
docker-compose logs postgres

# کنٹینر کی صحت کی تصدیق کریں
docker-compose ps

# براہ راست کنکشن کی جانچ کریں
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### ایزور تعیناتی کے مسائل

**مسئلہ**: ایزور تعیناتی ناکام ہو جاتی ہے
```bash
# Azure CLI کی تصدیق چیک کریں
az account show

# رکنیت کی اجازتوں کی تصدیق کریں
az role assignment list --assignee $(az account show --query user.name -o tsv)

# وسائل فراہم کنندہ کی رجسٹریشن چیک کریں
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**مسئلہ**: AI سروس کی تصدیق ناکام ہوتی ہے
```bash
# سروس پرنسپل آزمائیں
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# اے آئی سروس کی تنصیب کی تصدیق کریں
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### پائتھن ماحول کے مسائل

**مسئلہ**: پیکیج انسٹالیشن ناکام ہوتی ہے
```bash
# pip اور setuptools کو اپ گریڈ کریں
python -m pip install --upgrade pip setuptools wheel

# pip کیشے صاف کریں
pip cache purge

# مسائل کی نشاندہی کے لیے پیکجز کو ایک ایک کرکے انسٹال کریں
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**مسئلہ**: VS Code پائتھن انٹرفریٹر نہیں ڈھونڈ پاتا
```bash
# پائتھون انٹرپریٹر کے راستے دکھائیں
which python  # میک او ایس/لینکس
where python  # ونڈوز

# پہلے ورچوئل ماحول کو فعال کریں
source mcp-env/bin/activate  # میک او ایس/لینکس
mcp-env\Scripts\activate     # ونڈوز

# پھر وی ایس کوڈ کھولیں
code .
```

## 🎯 اہم نکات

اس لیب کو مکمل کرنے کے بعد، آپ کے پاس ہوگا:

✅ **مکمل ترقیاتی ماحول**: تمام ٹولز انسٹال اور ترتیب دیے گئے  
✅ **ایزور ریسورسز تعینات**: AI خدمات اور معاون انفراسٹرکچر  
✅ **ڈاکر ماحول چل رہا**: پوسٹگریس کیو ایل اور MCP سرور کنٹینرز  
✅ **VS Code انٹیگریشن**: MCP سرورز ترتیب دیے گئے اور قابل رسائی  
✅ **تصدیق شدہ سیٹ اپ**: تمام اجزاء کے ساتھ کامیابی سے ٹیسٹ شدہ  
✅ **مسائل حل کرنے کا علم**: عام مسائل اور ان کے حل  

## 🚀 آگے کیا ہے

اپنے ماحول کے تیار ہونے کے بعد، **[لیب 04: ڈیٹا بیس ڈیزائن اور اسکیمہ](../04-Database/README.md)** کے ساتھ جاری رکھیں تاکہ:

- ریٹیل ڈیٹا بیس اسکیمہ تفصیل سے دریافت کریں
- ملٹی ٹیننٹ ڈیٹا ماڈلنگ کو سمجھیں
- رو لیول سیکیورٹی لاگو کرنے کے بارے میں جانیں
- سیمپل ریٹیل ڈیٹا کے ساتھ کام کریں

## 📚 اضافی وسائل

### ترقیاتی ٹولز
- [Docker Documentation](https://docs.docker.com/) - مکمل ڈاکر حوالہ
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/) - ایزور CLI کمانڈز
- [VS Code Documentation](https://code.visualstudio.com/docs) - ایڈیٹر ترتیب اور ایکسٹینشنز

### ایزور سروسز
- [Microsoft Foundry Documentation](https://docs.microsoft.com/azure/ai-foundry/) - AI سروس کنفیگریشن
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI ماڈل تعیناتی
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - مانیٹرنگ سیٹ اپ

### پائتھن ترقی
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) - ماحولیات کا انتظام
- [AsyncIO Documentation](https://docs.python.org/3/library/asyncio.html) - Async پروگرامنگ پیٹرنز
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - ویب فریم ورک پیٹرنز

---

**آگے**: ماحول تیار ہے؟ جاری رکھیں [لیب 04: ڈیٹا بیس ڈیزائن اور اسکیمہ](../04-Database/README.md) کے ساتھ۔

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ڈس کلیمر**:
یہ دستاویز AI ترجمہ سروس [Co-op Translator](https://github.com/Azure/co-op-translator) کے ذریعے ترجمہ کی گئی ہے۔ جبکہ ہم درستگی کے لیے کوشاں ہیں، براہ کرم اس بات سے آگاہ رہیں کہ خودکار ترجمے میں غلطیاں یا عدم درستیاں ہو سکتی ہیں۔ اصل دستاویز اپنے مادری زبان میں مستند ماخذ سمجھی جائے گی۔ حساس معلومات کے لیے پیشہ ور انسانی ترجمہ کی سفارش کی جاتی ہے۔ اس ترجمے کے استعمال سے پیدا ہونے والی کسی بھی غلط فہمی یا غلط تشریح کی ذمہ داری ہم قبول نہیں کرتے۔
<!-- CO-OP TRANSLATOR DISCLAIMER END -->