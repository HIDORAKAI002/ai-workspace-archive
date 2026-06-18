# إعداد البيئة

## 🎯 ما يغطيه هذا المختبر

يرشدك هذا المختبر العملي خلال إعداد بيئة تطوير كاملة لبناء خوادم MCP مع تكامل PostgreSQL. ستقوم بتكوين جميع الأدوات اللازمة، ونشر موارد Azure، والتحقق من إعدادك قبل المتابعة بالتنفيذ.

## نظرة عامة

بيئة التطوير المناسبة ضرورية لنجاح تطوير خادم MCP. يوفر هذا المختبر تعليمات خطوة بخطوة لإعداد Docker، وخدمات Azure، وأدوات التطوير، والتحقق من أن كل شيء يعمل بشكل صحيح معًا.

بنهاية هذا المختبر، سيكون لديك بيئة تطوير وظيفية كاملة جاهزة لبناء خادم Zava Retail MCP.

## أهداف التعلم

بنهاية هذا المختبر، ستتمكن من:

- **تثبيت وتكوين** جميع أدوات التطوير المطلوبة
- **نشر موارد Azure** اللازمة لخادم MCP
- **إعداد حاويات Docker** لـ PostgreSQL وخادم MCP
- **التحقق** من إعداد بيئتك باتصالات اختبارية
- **استكشاف الأخطاء الشائعة** ومشاكل التكوين وإصلاحها
- **فهم** سير عمل التطوير وهيكل الملفات

## 📋 التحقق من المتطلبات المسبقة

قبل البدء، تأكد من أن لديك:

### المعرفة المطلوبة
- استخدام أساسي لواجهة الأوامر (موجه الأوامر في ويندوز / PowerShell)
- فهم لمتغيرات البيئة
- الإلمام بنظام التحكم في الإصدارات Git
- مفاهيم Docker الأساسية (الحاويات، الصور، التخزين)

### متطلبات النظام
- **نظام التشغيل**: ويندوز 10/11، ماك أو إس، أو لينكس
- **ذاكرة الوصول العشوائي**: 8 جيجابايت على الأقل (16 جيجابايت موصى به)
- **التخزين**: مساحة خالية لا تقل عن 10 جيجابايت
- **الشبكة**: اتصال إنترنت للتنزيلات ونشر Azure

### متطلبات الحساب
- **اشتراك Azure**: الطبقة المجانية كافية
- **حساب GitHub**: للوصول إلى المستودعات
- **حساب Docker Hub**: (اختياري) لنشر الصور المخصصة

## 🛠️ تثبيت الأدوات

### 1. تثبيت Docker Desktop

يوفر Docker البيئة المحكومة للحاويات لإعداد التطوير لدينا.

#### تثبيت على ويندوز

1. **تحميل Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **التثبيت والتكوين**:
   - تشغيل المثبت كمسؤول
   - تمكين تكامل WSL 2 عند الطلب
   - أعد تشغيل الكمبيوتر عند اكتمال التثبيت

3. **تحقق من التثبيت**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### تثبيت على ماك أو إس

1. **التحميل والتثبيت**:
   ```bash
   # حمل من https://desktop.docker.com/mac/stable/Docker.dmg
   # أو استخدم Homebrew
   brew install --cask docker
   ```

2. **تشغيل Docker Desktop**:
   - افتح Docker Desktop من التطبيقات
   - أكمل معالج الإعداد الأولي

3. **تحقق من التثبيت**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### تثبيت على لينكس

1. **تثبيت Docker Engine**:
   ```bash
   # أوبونتو/ديبيان
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # قم بتسجيل الخروج ثم الدخول مرة أخرى لتفعيل تغييرات المجموعة
   ```

2. **تثبيت Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. تثبيت Azure CLI

تمكّن Azure CLI من نشر وإدارة موارد Azure.

#### تثبيت على ويندوز

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### تثبيت على ماك أو إس

```bash
# استخدام Homebrew
brew install azure-cli

# أو باستخدام المثبت
curl -L https://aka.ms/InstallAzureCli | bash
```

#### تثبيت على لينكس

```bash
# أوبونتو/ديبيان
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# آر إتش إي إل/سينت أو إس
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### التحقق والمصادقة

```bash
# التحقق من التثبيت
az version

# تسجيل الدخول إلى أزور
az login

# تعيين الاشتراك الافتراضي (إذا كان لديك عدة اشتراكات)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. تثبيت Git

Git مطلوب لاستنساخ المستودع والتحكم في الإصدارات.

#### ويندوز

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### ماك أو إس

```bash
# عادةً ما يكون Git مثبتًا مسبقًا، لكن يمكنك التحديث عبر Homebrew
brew install git
```

#### لينكس

```bash
# أوبونتو/ديبيان
sudo apt update && sudo apt install git

# ريد هات إنتربرايز لينكس/سنت أو إس
sudo dnf install git
```

### 4. تثبيت VS Code

يوفر Visual Studio Code بيئة تطوير متكاملة مع دعم MCP.

#### التثبيت

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### الإضافات المطلوبة

قم بتثبيت هذه الإضافات لـ VS Code:

```bash
# التثبيت عبر سطر الأوامر
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

أو التثبيت من خلال VS Code:
1. افتح VS Code
2. انتقل إلى الإضافات (Ctrl+Shift+X)
3. ثبّت:
   - **Python** (مايكروسوفت)
   - **Docker** (مايكروسوفت)
   - **Azure Account** (مايكروسوفت)
   - **JSON** (مايكروسوفت)

### 5. تثبيت Python

Python 3.8+ مطلوب لتطوير خادم MCP.

#### ويندوز

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### ماك أو إس

```bash
# استخدام Homebrew
brew install python@3.11
```

#### لينكس

```bash
# أوبونتو/ديبيان
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# ريد هات إنتربرايز لينكس/سنت أوس
sudo dnf install python3.11 python3.11-pip
```

#### التحقق من التثبيت

```bash
python --version  # يجب أن يعرض Python 3.11.x
pip --version      # يجب أن يعرض إصدار pip
```

## 🚀 إعداد المشروع

### 1. استنساخ المستودع

```bash
# استنساخ المستودع الرئيسي
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# الانتقال إلى دليل المشروع
cd MCP-Server-and-PostgreSQL-Sample-Retail

# التحقق من هيكل المستودع
ls -la
```

### 2. إنشاء بيئة افتراضية لبايثون

```bash
# إنشاء بيئة افتراضية
python -m venv mcp-env

# تفعيل البيئة الافتراضية
# ويندوز
mcp-env\Scripts\activate

# ماك أو إس/لينكس
source mcp-env/bin/activate

# تحديث البيب
python -m pip install --upgrade pip
```

### 3. تثبيت تبعيات بايثون

```bash
# تثبيت تبعيات التطوير
pip install -r requirements.lock.txt

# التحقق من الحزم الرئيسية
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ نشر موارد Azure

### 1. فهم متطلبات الموارد

يتطلب خادم MCP لدينا هذه الموارد من Azure:

| **المورد** | **الغرض** | **التكلفة المقدرة** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | استضافة وإدارة نماذج الذكاء الاصطناعي | 10-50 دولار شهريا |
| **OpenAI Deployment** | نموذج تضمين النصوص (text-embedding-3-small) | 5-20 دولار شهريا |
| **Application Insights** | المراقبة والقياسات | 5-15 دولار شهريا |
| **Resource Group** | تنظيم الموارد | مجاني |

### 2. نشر موارد Azure

#### الخيار أ: النشر التلقائي (موصى به)

```bash
# انتقل إلى مجلد البنية التحتية
cd infra

# ويندوز - باورشل
./deploy.ps1

# ماك أو إس / لينكس - باش
./deploy.sh
```

سينفذ سكربت النشر التالي:
1. إنشاء مجموعة موارد فريدة
2. نشر موارد Microsoft Foundry
3. نشر نموذج text-embedding-3-small
4. تكوين Application Insights
5. إنشاء حساب خدمة للمصادقة
6. إنشاء ملف `.env` للتكوين

#### الخيار ب: النشر اليدوي

إذا فضلت السيطرة اليدوية أو فشل السكربت التلقائي:

```bash
# تعيين المتغيرات
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# إنشاء مجموعة الموارد
az group create --name $RESOURCE_GROUP --location $LOCATION

# نشر النموذج الرئيسي
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. التحقق من نشر Azure

```bash
# التحقق من مجموعة الموارد
az group show --name $RESOURCE_GROUP --output table

# سرد الموارد المنشورة
az resource list --resource-group $RESOURCE_GROUP --output table

# اختبار خدمة الذكاء الاصطناعي
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. تكوين متغيرات البيئة

بعد النشر، يجب أن يكون لديك ملف `.env`. تحقق من احتوائه على:

```bash
# محتويات ملف .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# إعدادات قاعدة البيانات (للتطوير)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 إعداد بيئة Docker

### 1. فهم تكوين Docker Compose

تستخدم بيئة التطوير لدينا Docker Compose:

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

### 2. بدء بيئة التطوير

```bash
# تأكد من أنك في دليل جذر المشروع
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# بدء الخدمات
docker-compose up -d

# تحقق من حالة الخدمة
docker-compose ps

# عرض السجلات
docker-compose logs -f
```

### 3. التحقق من إعداد قاعدة البيانات

```bash
# الاتصال بحاوية PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# فحص هيكل قاعدة البيانات
\dt retail.*

# التحقق من بيانات العينة
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# الخروج من PostgreSQL
\q
```

### 4. اختبار خادم MCP

```bash
# التحقق من صحة خادم MCP
curl http://localhost:8000/health

# اختبار نقطة نهاية MCP الأساسية
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 تكوين VS Code

### 1. تكوين تكامل MCP

إنشاء تكوين MCP لـ VS Code:

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

### 2. تكوين بيئة بايثون

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

### 3. اختبار تكامل VS Code

1. **افتح المشروع في VS Code**:
   ```bash
   code .
   ```

2. **افتح دردشة AI**:
   - اضغط `Ctrl+Shift+P` (ويندوز/لينكس) أو `Cmd+Shift+P` (ماك أو إس)
   - اكتب "AI Chat" واختر "AI Chat: Open Chat"

3. **اختبر اتصال خادم MCP**:
   - في دردشة AI، اكتب `#zava` واختر أحد الخوادم المُعدة
   - اسأل: "ما هي الجداول المتوفرة في قاعدة البيانات؟"
   - يجب أن تتلقى ردًا يعرض جداول قاعدة بيانات التجزئة

## ✅ التحقق من البيئة

### 1. فحص النظام الشامل

شغل سكربت التحقق هذا للتحقق من إعدادك:

```bash
# إنشاء برنامج التحقق
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
    
    # التحقق من إصدار بايثون
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # التحقق من الحزم المطلوبة
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # التحقق من Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # التحقق من Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # التحقق من متغيرات البيئة
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
    
    # التحقق من اتصال قاعدة البيانات
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # اختبار الاستعلام
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
    
    # التحقق من خادم MCP
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
    
    # التحقق من خدمة Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # هذا سيفشل إذا كانت بيانات الاعتماد غير صحيحة
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

# تشغيل التحقق
python validate_setup.py
```

### 2. قائمة التحقق اليدوية

**✅ الأدوات الأساسية**
- [ ] تثبيت Docker إصدار 20.10+ ويعمل
- [ ] تثبيت Azure CLI 2.40+ ومصادقة ناجحة
- [ ] Python 3.8+ مع pip مثبت
- [ ] Git 2.30+ مثبت
- [ ] VS Code مع الإضافات المطلوبة

**✅ موارد Azure**
- [ ] إنشاء مجموعة موارد بنجاح
- [ ] نشر مشروع AI Foundry
- [ ] نشر نموذج text-embedding-3-small OpenAI
- [ ] تكوين Application Insights
- [ ] إنشاء حساب خدمة بالصلاحيات المناسبة

**✅ تكوين البيئة**
- [ ] ملف `.env` يحتوي على كل المتغيرات المطلوبة
- [ ] بيانات اعتماد Azure تعمل (اختبر بـ `az account show`)
- [ ] حاوية PostgreSQL تعمل ومتاحة
- [ ] تحميل بيانات نموذجية في قاعدة البيانات

**✅ تكامل VS Code**
- [ ] تكوين `.vscode/mcp.json`
- [ ] تعيين مفسر بايثون إلى البيئة الافتراضية
- [ ] ظهور خوادم MCP في دردشة AI
- [ ] إمكانية تنفيذ استعلامات اختبارية من خلال دردشة AI

## 🛠️ استكشاف الأخطاء الشائعة وإصلاحها

### مشكلات Docker

**المشكلة**: لا تبدأ حاويات Docker
```bash
# تحقق من حالة خدمة Docker
docker info

# تحقق من الموارد المتاحة
docker system df

# قم بالتنظيف إذا لزم الأمر
docker system prune -f

# أعد تشغيل Docker Desktop (ويندوز/ماك)
# أو أعد تشغيل خدمة Docker (لينكس)
sudo systemctl restart docker
```

**المشكلة**: فشل اتصال PostgreSQL
```bash
# تحقق من سجلات الحاوية
docker-compose logs postgres

# تحقق من أن الحاوية سليمة
docker-compose ps

# اختبار الاتصال المباشر
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### مشكلات نشر Azure

**المشكلة**: فشل نشر Azure
```bash
# التحقق من مصادقة Azure CLI
az account show

# التحقق من أذونات الاشتراك
az role assignment list --assignee $(az account show --query user.name -o tsv)

# التحقق من تسجيل مزود الموارد
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**المشكلة**: فشل مصادقة خدمة AI
```bash
# اختبار موفر الخدمة
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# التحقق من نشر خدمة الذكاء الاصطناعي
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### مشكلات بيئة Python

**المشكلة**: فشل تثبيت الحزمة
```bash
# ترقية pip و setuptools
python -m pip install --upgrade pip setuptools wheel

# مسح ذاكرة التخزين المؤقت لـ pip
pip cache purge

# تثبيت الحزم واحدة تلو الأخرى لتحديد المشاكل
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**المشكلة**: VS Code لا يجد مفسر Python
```bash
# عرض مسارات مترجم بايثون
which python  # ماك أو إس/لينكس
where python  # ويندوز

# قم بتنشيط البيئة الافتراضية أولاً
source mcp-env/bin/activate  # ماك أو إس/لينكس
mcp-env\Scripts\activate     # ويندوز

# ثم افتح VS Code
code .
```

## 🎯 النقاط الرئيسية

بعد إتمام هذا المختبر، يجب أن تكون لديك:

✅ **بيئة تطوير كاملة**: كل الأدوات مثبتة ومُعدة  
✅ **موارد Azure منشورة**: خدمات الذكاء الاصطناعي والبنية التحتية الداعمة  
✅ **بيئة Docker تعمل**: حاويات PostgreSQL وخادم MCP  
✅ **تكامل VS Code**: تنفيذ تكوينات MCP والوصول إليها  
✅ **إعداد مُتحقق**: جميع المكونات مختبرة وتعمل معًا  
✅ **معرفة استكشاف الأخطاء**: المشكلات الشائعة والحلول  

## 🚀 ما التالي

مع جاهزية بيئتك، تابع إلى **[المختبر 04: تصميم قاعدة البيانات والمخطط](../04-Database/README.md)** لـ:

- استكشاف مخطط قاعدة بيانات التجزئة بتفصيل
- فهم نمذجة البيانات متعددة المستأجرين
- التعرف على تنفيذ أمان مستوى الصف
- العمل مع بيانات تجزئة نموذجية

## 📚 مصادر إضافية

### أدوات التطوير
- [توثيق Docker](https://docs.docker.com/) - مرجع شامل لدعم Docker
- [مرجع Azure CLI](https://docs.microsoft.com/cli/azure/) - أوامر Azure CLI
- [توثيق VS Code](https://code.visualstudio.com/docs) - إعداد المحرر والإضافات

### خدمات Azure
- [توثيق Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - تكوين خدمة الذكاء الاصطناعي
- [خدمة Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - نشر نماذج الذكاء الاصطناعي
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - إعداد المراقبة

### تطوير Python
- [بيئات Python الافتراضية](https://docs.python.org/3/tutorial/venv.html) - إدارة البيئة
- [توثيق AsyncIO](https://docs.python.org/3/library/asyncio.html) - أنماط البرمجة غير المتزامنة
- [توثيق FastAPI](https://fastapi.tiangolo.com/) - أنماط أطر الويب

---

**التالي**: هل البيئة جاهزة؟ تابع مع [المختبر 04: تصميم قاعدة البيانات والمخطط](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**تنويه**:
تمت ترجمة هذا المستند باستخدام خدمة الترجمة بالذكاء الاصطناعي [Co-op Translator](https://github.com/Azure/co-op-translator). بينما نسعى للدقة، يرجى العلم أن الترجمات الآلية قد تحتوي على أخطاء أو عدم دقة. يجب اعتبار المستند الأصلي بلغته الأصلية المصدر الرسمي والمعتمد. للمعلومات الهامة، يُنصح بالاستعانة بترجمة بشرية محترفة. نحن غير مسؤولين عن أي سوء فهم أو تفسير ناتج عن استخدام هذه الترجمة.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->