# تنظیم محیط

## 🎯 این آزمایشگاه چه مواردی را پوشش می‌دهد

این آزمایشگاه عملی شما را گام‌به‌گام در راه‌اندازی یک محیط توسعه کامل برای ساخت سرورهای MCP با ادغام PostgreSQL هدایت می‌کند. شما همه ابزارهای لازم را پیکربندی کرده، منابع Azure را مستقر خواهید کرد و قبل از ادامه پیاده‌سازی، تنظیمات خود را اعتبارسنجی می‌کنید.

## مرور کلی

یک محیط توسعه مناسب برای موفقیت در توسعه سرور MCP حیاتی است. این آزمایشگاه راهنمایی گام‌به‌گام برای راه‌اندازی Docker، خدمات Azure، ابزارهای توسعه و اعتبارسنجی کارکرد صحیح همه آنها با هم را فراهم می‌کند.

تا پایان این آزمایشگاه، شما یک محیط توسعه کاملاً کاربردی آماده ساخت سرور Zava Retail MCP خواهید داشت.

## اهداف یادگیری

تا پایان این آزمایشگاه قادر خواهید بود:

- **نصب و پیکربندی** همه ابزارهای توسعه مورد نیاز  
- **استقرار منابع Azure** مورد نیاز برای سرور MCP  
- **راه‌اندازی کانتینرهای Docker** برای PostgreSQL و سرور MCP  
- **اعتبارسنجی** تنظیم محیط با اتصالات آزمایشی  
- **عیب‌یابی** مشکلات رایج راه‌اندازی و پیکربندی  
- **درک** شیوه کار توسعه و ساختار فایل‌ها  

## 📋 بررسی پیش‌نیازها

قبل از شروع، اطمینان حاصل کنید که دارید:

### دانش مورد نیاز

- کار با خط فرمان پایه (Windows Command Prompt / PowerShell)  
- درک متغیرهای محیطی  
- آشنایی با کنترل نسخه Git  
- مفاهیم پایه Docker (کانتینرها، تصاویر، حجم‌ها)  

### نیازمندی‌های سیستم

- **سیستم عامل**: ویندوز 10/11، مک‌او‌اس، یا لینوکس  
- **رم**: حداقل 8 گیگابایت (توصیه‌شده 16 گیگابایت)  
- **فضای ذخیره‌سازی**: حداقل 10 گیگابایت فضای آزاد  
- **شبکه**: اتصال اینترنت برای دانلود و استقرار Azure  

### نیازمندی‌های حساب

- **اشتراک Azure**: سطح رایگان کافی است  
- **حساب GitHub**: برای دسترسی به مخزن  
- **حساب Docker Hub**: (اختیاری) برای انتشار تصویر سفارشی  

## 🛠️ نصب ابزارها

### 1. نصب Docker Desktop

Docker محیط کانتینریزه برای تنظیمات توسعه ما را فراهم می‌کند.

#### نصب ویندوز

1. **دانلود Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **نصب و پیکربندی**:  
   - نصب‌کننده را به عنوان مدیر اجرا کنید  
   - هنگام درخواست، ادغام WSL 2 را فعال کنید  
   - پس از پایان نصب، سیستم را ری‌استارت کنید  

3. **اعتبارسنجی نصب**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### نصب macOS

1. **دانلود و نصب**:  
   ```bash
   # دانلود از https://desktop.docker.com/mac/stable/Docker.dmg
   # یا از Homebrew استفاده کنید
   brew install --cask docker
   ```
  
2. **اجرای Docker Desktop**:  
   - Docker Desktop را از Applications اجرا کنید  
   - ویزارد راه‌اندازی اولیه را کامل کنید  

3. **اعتبارسنجی نصب**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### نصب لینوکس

1. **نصب Docker Engine**:  
   ```bash
   # اوبونتو/دبیان
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # برای اعمال تغییرات گروه، از حساب خارج شده و دوباره وارد شوید
   ```
  
2. **نصب Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. نصب Azure CLI

Azure CLI امکان استقرار و مدیریت منابع Azure را فراهم می‌کند.

#### نصب ویندوز

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### نصب macOS

```bash
# استفاده از Homebrew
brew install azure-cli

# یا استفاده از نصب‌کننده
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### نصب لینوکس

```bash
# اوبونتو/دبیان
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# ردهت/سنت‌اواس
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### اعتبارسنجی و احراز هویت

```bash
# بررسی نصب
az version

# ورود به آزور
az login

# تنظیم اشتراک پیش‌فرض (اگر چندین اشتراک دارید)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. نصب Git

Git برای کلون کردن مخزن و کنترل نسخه لازم است.

#### ویندوز

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# گیت معمولاً از پیش نصب شده است، اما می‌توانید از طریق هوم‌برو آن را به‌روزرسانی کنید
brew install git
```
  
#### لینوکس

```bash
# اوبونتو/دبیان
sudo apt update && sudo apt install git

# آر‌اچ‌ای‌ال/سنت‌اُ‌اس
sudo dnf install git
```
  
### 4. نصب VS Code

Visual Studio Code محیط توسعه مجتمع با پشتیبانی MCP را فراهم می‌کند.

#### نصب

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### افزونه‌های مورد نیاز

این افزونه‌های VS Code را نصب کنید:

```bash
# نصب از طریق خط فرمان
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
یا از طریق VS Code نصب کنید:  
1. VS Code را باز کنید  
2. به Extensions (Ctrl+Shift+X) بروید  
3. نصب کنید:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. نصب Python

Python نسخه 3.8 و بالاتر برای توسعه سرور MCP لازم است.

#### ویندوز

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# استفاده از هوم‌برو
brew install python@3.11
```
  
#### لینوکس

```bash
# اوبونتو/دبیان
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# ردهت/سنت‌اواس
sudo dnf install python3.11 python3.11-pip
```
  
#### اعتبارسنجی نصب

```bash
python --version  # باید نسخه Python 3.11.x را نشان دهد
pip --version      # باید نسخه pip را نشان دهد
```
  
## 🚀 راه‌اندازی پروژه

### 1. کلون کردن مخزن

```bash
# مخزن اصلی را کلون کنید
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# به دایرکتوری پروژه بروید
cd MCP-Server-and-PostgreSQL-Sample-Retail

# ساختار مخزن را بررسی کنید
ls -la
```
  
### 2. ایجاد محیط مجازی Python

```bash
# ایجاد محیط مجازی
python -m venv mcp-env

# فعال‌سازی محیط مجازی
# ویندوز
mcp-env\Scripts\activate

# مک‌او‌اس/لینوکس
source mcp-env/bin/activate

# به‌روزرسانی pip
python -m pip install --upgrade pip
```
  
### 3. نصب وابستگی‌های Python

```bash
# نصب وابستگی‌های توسعه
pip install -r requirements.lock.txt

# تأیید بسته‌های کلیدی
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ استقرار منابع Azure

### 1. درک نیازهای منابع

سرور MCP ما به این منابع Azure نیاز دارد:

| **منبع** | **هدف** | **هزینه تخمینی** |  
|--------------|-------------|-------------------|  
| **Microsoft Foundry** | میزبانی و مدیریت مدل هوش مصنوعی | ۱۰ تا ۵۰ دلار در ماه |  
| **استقرار OpenAI** | مدل جاسازی متن (text-embedding-3-small) | ۵ تا ۲۰ دلار در ماه |  
| **Application Insights** | نظارت و تلمتری | ۵ تا ۱۵ دلار در ماه |  
| **گروه منابع** | سازماندهی منابع | رایگان |  

### 2. استقرار منابع Azure

#### گزینه A: استقرار خودکار (توصیه شده)

```bash
# به دایرکتوری زیرساخت بروید
cd infra

# ویندوز - پاورشل
./deploy.ps1

# مک‌اواس/لینوکس - بش
./deploy.sh
```
  
اسکریپت استقرار این کارها را انجام می‌دهد:  
1. ایجاد یک گروه منابع یکتا  
2. استقرار منابع Microsoft Foundry  
3. استقرار مدل text-embedding-3-small  
4. پیکربندی Application Insights  
5. ایجاد یک سرویس پرینسپال برای احراز هویت  
6. تولید فایل `.env` با پیکربندی  

#### گزینه B: استقرار دستی

اگر ترجیح می‌دهید کنترل دستی داشته باشید یا اسکریپت خودکار خطا داد:

```bash
# تنظیم متغیرها
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# ایجاد گروه منابع
az group create --name $RESOURCE_GROUP --location $LOCATION

# استقرار قالب اصلی
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. اعتبارسنجی استقرار Azure

```bash
# بررسی گروه منابع
az group show --name $RESOURCE_GROUP --output table

# فهرست منابع مستقر شده
az resource list --resource-group $RESOURCE_GROUP --output table

# آزمایش سرویس هوش مصنوعی
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. پیکربندی متغیرهای محیطی

پس از استقرار باید یک فایل `.env` داشته باشید. اطمینان حاصل کنید که شامل موارد زیر است:

```bash
# محتویات فایل .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# پیکربندی پایگاه داده (برای توسعه)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 تنظیم محیط Docker

### 1. درک ترکیب Docker

محیط توسعه ما از Docker Compose استفاده می‌کند:

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
  
### 2. راه‌اندازی محیط توسعه

```bash
# اطمینان حاصل کنید که در دایرکتوری ریشه پروژه هستید
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# سرویس‌ها را شروع کنید
docker-compose up -d

# وضعیت سرویس را بررسی کنید
docker-compose ps

# گزارش‌ها را مشاهده کنید
docker-compose logs -f
```
  
### 3. اعتبارسنجی تنظیم پایگاه داده

```bash
# اتصال به کانتینر PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# بررسی ساختار پایگاه داده
\dt retail.*

# تایید داده‌های نمونه
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# خروج از PostgreSQL
\q
```
  
### 4. آزمایش سرور MCP

```bash
# بررسی سلامت سرور MCP
curl http://localhost:8000/health

# آزمایش نقطه پایانی پایه MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 پیکربندی VS Code

### 1. پیکربندی ادغام MCP

پیکربندی MCP برای VS Code را ایجاد کنید:

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
  
### 2. پیکربندی محیط Python

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
  
### 3. آزمایش ادغام VS Code

1. **پروژه را در VS Code باز کنید**:  
   ```bash
   code .
   ```
  
2. **باز کردن AI Chat**:  
   - کلیدهای `Ctrl+Shift+P` (ویندوز/لینوکس) یا `Cmd+Shift+P` (مک‌او‌اس) را فشار دهید  
   - عبارت "AI Chat" را تایپ کنید و "AI Chat: Open Chat" را انتخاب کنید  

3. **آزمایش اتصال سرور MCP**:  
   - در AI Chat، `#zava` را تایپ کنید و یکی از سرورهای تنظیم شده را انتخاب کنید  
   - بپرسید: "چه جداولی در پایگاه داده موجود است؟"  
   - باید پاسخ شامل لیستی از جداول پایگاه داده خرده‌فروشی دریافت کنید  

## ✅ اعتبارسنجی محیط

### 1. بررسی جامع سیستم

این اسکریپت اعتبارسنجی را اجرا کنید تا تنظیم شما بررسی شود:

```bash
# ایجاد اسکریپت اعتبارسنجی
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
    
    # بررسی نسخه پایتون
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # بررسی بسته‌های مورد نیاز
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # بررسی داکر
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # بررسی رابط خط فرمان Azure
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # بررسی متغیرهای محیطی
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
    
    # بررسی اتصال به پایگاه داده
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # تست پرس‌وجو
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
    
    # بررسی سرور MCP
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
    
    # بررسی سرویس هوش مصنوعی Azure
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # در صورت نامعتبر بودن اعتبارنامه‌ها، این مرحله شکست خواهد خورد
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

# اجرای اعتبارسنجی
python validate_setup.py
```
  
### 2. چک‌لیست اعتبارسنجی دستی

**✅ ابزارهای پایه**  
- [ ] نسخه Docker 20.10+ نصب و در حال اجرا  
- [ ] Azure CLI نسخه 2.40+ نصب و احراز هویت شده  
- [ ] Python 3.8+ با pip نصب شده  
- [ ] Git نسخه 2.30+ نصب شده  
- [ ] VS Code با افزونه‌های مورد نیاز  

**✅ منابع Azure**  
- [ ] گروه منابع با موفقیت ایجاد شده  
- [ ] پروژه AI Foundry مستقر شده  
- [ ] مدل text-embedding-3-small مستقر شده  
- [ ] Application Insights پیکربندی شده  
- [ ] سرویس پرینسپال با مجوزهای مناسب ایجاد شده  

**✅ پیکربندی محیط**  
- [ ] فایل `.env` با همه متغیرهای لازم ایجاد شده  
- [ ] اعتبارنامه‌های Azure کار می‌کنند (با `az account show` تست کنید)  
- [ ] کانتینر PostgreSQL در حال اجرا و قابل دسترسی است  
- [ ] داده نمونه در پایگاه داده بارگذاری شده  

**✅ ادغام VS Code**  
- [ ] فایل `.vscode/mcp.json` پیکربندی شده  
- [ ] مفسر Python به محیط مجازی تنظیم شده  
- [ ] سرورهای MCP در AI Chat ظاهر می‌شوند  
- [ ] می‌توانید پرس و جوهای آزمایشی را از طریق AI Chat اجرا کنید  

## 🛠️ عیب‌یابی مشکلات رایج

### مشکلات Docker

**مشکل**: کانتینرهای Docker راه‌اندازی نمی‌شوند  
```bash
# وضعیت سرویس داکر را بررسی کنید
docker info

# منابع موجود را بررسی کنید
docker system df

# در صورت نیاز پاک‌سازی کنید
docker system prune -f

# داکر دسکتاپ را مجدداً راه‌اندازی کنید (ویندوز/مک‌اواس)
# یا سرویس داکر را مجدداً راه‌اندازی کنید (لینوکس)
sudo systemctl restart docker
```
  
**مشکل**: اتصال PostgreSQL موفق نیست  
```bash
# بررسی لاگ‌های کانتینر
docker-compose logs postgres

# اطمینان از سلامت کانتینر
docker-compose ps

# تست اتصال مستقیم
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### مشکلات استقرار Azure

**مشکل**: استقرار Azure ناموفق است  
```bash
# بررسی احراز هویت CLI Azure
az account show

# تأیید مجوزهای اشتراک
az role assignment list --assignee $(az account show --query user.name -o tsv)

# بررسی ثبت تامین‌کننده منابع
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**مشکل**: احراز هویت سرویس هوش مصنوعی شکست می‌خورد  
```bash
# آزمایش نماینده سرویس
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# تأیید استقرار سرویس هوش مصنوعی
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### مشکلات محیط Python

**مشکل**: نصب بسته‌ها شکست می‌خورد  
```bash
# ارتقا pip و setuptools
python -m pip install --upgrade pip setuptools wheel

# پاک کردن حافظه پنهان pip
pip cache purge

# نصب بسته‌ها یکی یکی برای شناسایی مشکلات
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**مشکل**: VS Code نمی‌تواند مفسر Python را پیدا کند  
```bash
# نمایش مسیرهای مفسر پایتون
which python  # مک‌اواس/لینوکس
where python  # ویندوز

# ابتدا محیط مجازی را فعال کنید
source mcp-env/bin/activate  # مک‌اواس/لینوکس
mcp-env\Scripts\activate     # ویندوز

# سپس VS Code را باز کنید
code .
```
  
## 🎯 نکات کلیدی

پس از اتمام این آزمایشگاه، باید داشته باشید:

✅ **محیط توسعه کامل**: همه ابزارها نصب و پیکربندی شده‌اند  
✅ **منابع Azure مستقر شده**: خدمات هوش مصنوعی و زیرساخت‌های پشتیبان  
✅ **محیط Docker در حال اجرا**: کانتینرهای PostgreSQL و سرور MCP  
✅ **ادغام VS Code**: سرورهای MCP پیکربندی شده و قابل دسترسی  
✅ **تنظیمات معتبر**: همه اجزا آزمایش و به‌درستی با هم کار می‌کنند  
✅ **دانش عیب‌یابی**: مشکلات رایج و راه‌حل‌های آنها  

## 🚀 قدم بعدی

با آماده شدن محیط خود، ادامه دهید به **[آزمایشگاه ۰۴: طراحی پایگاه داده و اسکیما](../04-Database/README.md)** برای:

- بررسی دقیق اسکیما پایگاه داده خرده‌فروشی  
- درک مدل‌سازی داده چندمستأجر  
- یادگیری پیاده‌سازی امنیت سطح ردیف  
- کار با داده نمونه خرده‌فروشی  

## 📚 منابع اضافی

### ابزارهای توسعه

- [مستندات Docker](https://docs.docker.com/) - مرجع کامل Docker  
- [مرجع Azure CLI](https://docs.microsoft.com/cli/azure/) - فرمان‌های Azure CLI  
- [مستندات VS Code](https://code.visualstudio.com/docs) - پیکربندی و افزونه‌ها  

### خدمات Azure

- [مستندات Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - پیکربندی خدمات هوش مصنوعی  
- [خدمات Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - استقرار مدل هوش مصنوعی  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - راه‌اندازی نظارت  

### توسعه Python

- [محیط‌های مجازی Python](https://docs.python.org/3/tutorial/venv.html) - مدیریت محیط  
- [مستندات AsyncIO](https://docs.python.org/3/library/asyncio.html) - الگوهای برنامه‌نویسی غیرهمزمان  
- [مستندات FastAPI](https://fastapi.tiangolo.com/) - الگوهای فریم‌ورک وب  

---

**بعدی**: محیط آماده است؟ ادامه دهید با [آزمایشگاه ۰۴: طراحی پایگاه داده و اسکیما](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**سلب مسئولیت**:
این سند با استفاده از سرویس ترجمه هوش مصنوعی [Co-op Translator](https://github.com/Azure/co-op-translator) ترجمه شده است. در حالی که ما در تلاش برای دقت هستیم، لطفاً توجه داشته باشید که ترجمه‌های خودکار ممکن است شامل خطاها یا نادرستی‌هایی باشند. سند اصلی به زبان مادری خود باید به عنوان منبع معتبر در نظر گرفته شود. برای اطلاعات حیاتی، ترجمه حرفه‌ای انسانی توصیه می‌شود. ما در قبال هرگونه سوء تفاهم یا برداشت نادرست ناشی از استفاده از این ترجمه مسئولیتی نداریم.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->