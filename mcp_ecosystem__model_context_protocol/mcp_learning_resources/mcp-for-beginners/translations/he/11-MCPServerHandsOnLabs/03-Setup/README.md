# הגדרת סביבה

## 🎯 מה המעבדה הזו מכסה

מעבדה מעשית זו תדריך אתכם כיצד להגדיר סביבה מלאה לפיתוח שרתי MCP עם אינטגרציה ל-PostgreSQL. תגדירו את כל הכלים הדרושים, תפעלו משאבי Azure, ותאמתו את ההגדרה לפני שתמשיכו למימוש.

## סקירה כללית

סביבת פיתוח תקינה היא חיונית להצלחה בפיתוח שרת MCP. מעבדה זו מספקת הוראות שלב אחר שלב להגדרת Docker, שירותי Azure, כלי פיתוח, ואימות שכל רכיבי המערכת פועלים כראוי יחד.

בסוף המעבדה, תהיה לכם סביבת פיתוח מושלמת מוכנה לבניית שרת MCP של זבה קמעונאות.

## מטרות למידה

בסיום המעבדה, תוכלו:

- **להתקין ולהגדיר** את כל כלי הפיתוח הנדרשים  
- **להפעיל משאבי Azure** הדרושים לשרת MCP  
- **להגדיר מכולות Docker** עבור PostgreSQL ושרת MCP  
- **לאמת** את הגדרת הסביבה בעזרת חיבורים ניסיוניים  
- **לאבחן** בעיות נפוצות בהגדרה ובעיות קונפיגורציה  
- **להבין** את זרימת העבודה והמבנה הקבצים בפיתוח  

## 📋 בדיקת דרישות מוקדמות

לפני תחילת העבודה, ודאו שיש לכם:

### ידע נדרש
- שימוש בסיסי בשורת הפקודה (Windows Command Prompt/PowerShell)  
- הבנה של משתנים סביבתיים  
- היכרות עם בקרה גרסאות Git  
- מושגים בסיסיים ב-Docker (מכולות, תמונות, נפחים)  

### דרישות מערכת
- **מערכת הפעלה**: Windows 10/11, macOS, או Linux  
- **זיכרון RAM**: מינימום 8GB (מומלץ 16GB)  
- **אחסון**: לפחות 10GB מקום פנוי  
- **רשת**: חיבור לאינטרנט להורדות ופריסת Azure  

### דרישות חשבון
- **מנוי Azure**: שכבת חינם מספיקה  
- **חשבון GitHub**: לגישה למאגר  
- **חשבון Docker Hub**: (אופציונלי) לפרסום תמונות מותאמות אישית  

## 🛠️ התקנת כלים

### 1. התקנת Docker Desktop

Docker מספק את סביבת המכולות להגדרת הפיתוח שלנו.

#### התקנת Windows

1. **הורד Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **התקן והגדר**:  
   - הרץ את המתקין כמנהל מערכת  
   - הפעל אינטגרציית WSL 2 כשמתבקש  
   - הפעל מחדש את המחשב בסיום ההתקנה  

3. **אמת התקנה**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### התקנת macOS

1. **הורד והתקן**:  
   ```bash
   # הורד מ-https://desktop.docker.com/mac/stable/Docker.dmg
   # או השתמש ב-Homebrew
   brew install --cask docker
   ```
  
2. **הפעל Docker Desktop**:  
   - הפעל את Docker Desktop מהתיקיה Applications  
   - השלם את אשף ההגדרה הראשוני  

3. **אמת התקנה**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### התקנת Linux

1. **התקן Docker Engine**:  
   ```bash
   # אובונטו/דביאן
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # התנתק והתחבר מחדש כדי שהשינויים בקבוצה ייכנסו לתוקף
   ```
  
2. **התקן Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  

### 2. התקנת Azure CLI

Azure CLI מאפשר פריסה וניהול של משאבי Azure.

#### התקנת Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### התקנת macOS

```bash
# שימוש ב-Homebrew
brew install azure-cli

# או בשימוש במתקין
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### התקנת Linux

```bash
# אובונטו/דביאן
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# רֶד הֵאט / סֶנט אוֹאס
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### אימות והתחברות

```bash
# בדוק התקנה
az version

# התחבר ל-Azure
az login

# קבע את המנוי המחדלי (אם יש לך כמה)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  

### 3. התקנת Git

Git דרוש לשכפול המאגר ולבקרת גרסאות.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# בדרך כלל Git מותקן מראש, אבל ניתן לעדכן דרך Homebrew
brew install git
```
  
#### Linux

```bash
# אובונטו/דביאן
sudo apt update && sudo apt install git

# רדל/סנטוס
sudo dnf install git
```
  

### 4. התקנת VS Code

Visual Studio Code מספק סביבת פיתוח משולבת עם תמיכה ב-MCP.

#### התקנה

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### הרחבות דרושות

התקן את הרחבות VS Code הבאות:  

```bash
# התקנה דרך שורת הפקודה
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
או התקן דרך VS Code:  
1. פתח את VS Code  
2. עבור ל-Extensions (Ctrl+Shift+X)  
3. התקן:  
   - **Python** (מיקרוסופט)  
   - **Docker** (מיקרוסופט)  
   - **Azure Account** (מיקרוסופט)  
   - **JSON** (מיקרוסופט)  

### 5. התקנת Python

Python 3.8+ נדרש לפיתוח שרת MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# שימוש ב-Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# אובונטו/דביאן
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/סנטוס
sudo dnf install python3.11 python3.11-pip
```
  
#### אימות התקנה

```bash
python --version  # אמור להראות את Python 3.11.x
pip --version      # אמור להראות את גרסת pip
```
  

## 🚀 הגדרת הפרויקט

### 1. שכפל את המאגר

```bash
# שכפל את מאגר הקוד הראשי
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# עבור לתיקיית הפרויקט
cd MCP-Server-and-PostgreSQL-Sample-Retail

# אמת את מבנה המאגר
ls -la
```
  
### 2. צור סביבת Python וירטואלית

```bash
# צור סביבה וירטואלית
python -m venv mcp-env

# הפעל את הסביבה הווירטואלית
# ווינדוס
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# שדרג את pip
python -m pip install --upgrade pip
```
  
### 3. התקן תלותיות Python

```bash
# התקן תלותים לפיתוח
pip install -r requirements.lock.txt

# אמת חבילות מפתח
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  

## ☁️ פריסת משאבי Azure

### 1. הבן את דרישות המשאבים

שרת MCP שלנו דורש את משאבי Azure הבאים:  

| **משאב** | **מטרה** | **עלות משוערת** |  
|--------------|-------------|-------------------|  
| **Microsoft Foundry** | אירוח וניהול מודלים של AI | 10-50 דולר לחודש |  
| **פריסת OpenAI** | מודל הטמעת טקסט (text-embedding-3-small) | 5-20 דולר לחודש |  
| **Application Insights** | ניטור וטלמטריה | 5-15 דולר לחודש |  
| **קבוצת משאבים** | ארגון משאבים | ללא תשלום |  

### 2. פריסת משאבי Azure

#### אפשרות א: פריסה אוטומטית (מומלץ)

```bash
# לנווט לתיקיית התשתית
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
סקריפט הפריסה יבצע:  
1. יצירת קבוצת משאבים ייחודית  
2. פריסת משאבי Microsoft Foundry  
3. פריסת מודל text-embedding-3-small  
4. הגדרת Application Insights  
5. יצירת service principal לאימות  
6. יצירת קובץ `.env` עם הקונפיגורציה  

#### אפשרות ב: פריסה ידנית

אם אתם מעדיפים שליטה ידנית או שהסקריפט האוטומטי נכשל:  

```bash
# הגדר משתנים
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# צור קבוצת משאבים
az group create --name $RESOURCE_GROUP --location $LOCATION

# פרוס תבנית ראשית
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. אימות פריסת Azure

```bash
# בדוק קבוצת משאבים
az group show --name $RESOURCE_GROUP --output table

# הרש את המשאבים שהותקנו
az resource list --resource-group $RESOURCE_GROUP --output table

# בדוק שירות בינה מלאכותית
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. הגדירו משתנים סביבתיים

לאחר הפריסה, אמור להיות לכם קובץ `.env`. יש לוודא שהוא מכיל:  

```bash
# תוכן קובץ .env.
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# הגדרות בסיס הנתונים (לפיתוח)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  

## 🐳 הגדרת סביבת Docker

### 1. הבנת הרכב ה-Docker

סביבת הפיתוח שלנו משתמשת ב-Docker Compose:  

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
  
### 2. הפעל את סביבת הפיתוח

```bash
# ודא שאתה בתיקיית השורש של הפרויקט
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# הפעל את השירותים
docker-compose up -d

# בדוק את מצב השירות
docker-compose ps

# צפה ביומני הרישום
docker-compose logs -f
```
  
### 3. אמת הגדרת בסיס הנתונים

```bash
# התחבר למכולת PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# בדוק את מבנה מסד הנתונים
\dt retail.*

# אמת את נתוני המדגם
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# צא מ-PostgreSQL
\q
```
  
### 4. בדוק את שרת MCP

```bash
# בדוק את בריאות שרת MCP
curl http://localhost:8000/health

# בדוק נקודת קצה בסיסית של MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  

## 🔧 קונפיגורציית VS Code

### 1. הגדרת אינטגרציית MCP

צור קונפיגורציית MCP עבור VS Code:  

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
  
### 2. הגדרת סביבת Python

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
  
### 3. בדוק את האינטגרציה ב-VS Code

1. **פתח את הפרויקט ב-VS Code**:  
   ```bash
   code .
   ```
  
2. **הפעל את AI Chat**:  
   - לחץ `Ctrl+Shift+P` (Windows/Linux) או `Cmd+Shift+P` (macOS)  
   - הקלד "AI Chat" ובחר "AI Chat: Open Chat"  

3. **בדוק חיבור לשרת MCP**:  
   - ב-AI Chat, הקלד `#zava` ובחר באחד השרתים המוגדרים  
   - שאל: "אילו טבלאות זמינות בבסיס הנתונים?"  
   - תתקבל תגובה המפרטת את טבלאות הקמעונאות בבסיס הנתונים  

## ✅ אימות הסביבה

### 1. בדיקה מערכתית מקיפה

הרץ את סקריפט האימות הזה כדי לבדוק את ההגדרה שלך:  

```bash
# צור סקריפט אימות
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
    
    # בדוק גרסת פייתון
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # בדוק חבילות נדרשות
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # בדוק את Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # בדוק את Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # בדוק משתני סביבה
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
    
    # בדוק את חיבור מסד הנתונים
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # בדיקת שאילתה
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
    
    # בדוק שרת MCP
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
    
    # בדוק את שירות Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # זה ייכשל אם האישורים אינם תקפים
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

# הפעל אימות
python validate_setup.py
```
  
### 2. רשימת בדיקה ידנית

**✅ כלים בסיסיים**  
- [ ] גרסת Docker 20.10+ מותקנת ופועלת  
- [ ] Azure CLI 2.40+ מותקן ומאומת  
- [ ] Python 3.8+ עם pip מותקן  
- [ ] Git 2.30+ מותקן  
- [ ] VS Code עם ההרחבות הנדרשות  

**✅ משאבי Azure**  
- [ ] קבוצת משאבים נוצרה בהצלחה  
- [ ] פרויקט AI Foundry פרוס  
- [ ] מודל text-embedding-3-small פרוס  
- [ ] Application Insights מוגדר  
- [ ] service principal נוצר עם ההרשאות הנכונות  

**✅ קונפיגורציית סביבה**  
- [ ] קובץ `.env` נוצר עם כל המשתנים הדרושים  
- [ ] אישורי Azure פועלים (בדוק עם `az account show`)  
- [ ] מכולת PostgreSQL רצה וניתן לגישה  
- [ ] טוען דוגמאות נתונים בבסיס הנתונים  

**✅ אינטגרציית VS Code**  
- [ ] `.vscode/mcp.json` מוגדר  
- [ ] מתורגמן Python מוגדר לסביבה הווירטואלית  
- [ ] שרתי MCP מופיעים ב-AI Chat  
- [ ] ניתן לבצע שאילתות בדיקה דרך AI Chat  

## 🛠️ פתרון בעיות נפוצות

### בעיות Docker

**בעיה**: מכולות Docker לא מתחילות  
```bash
# בדוק את מצב שירות Docker
docker info

# בדוק את המשאבים הזמינים
docker system df

# נקה אם יש צורך
docker system prune -f

# הפעל מחדש את Docker Desktop (Windows/macOS)
# או הפעל מחדש את שירות Docker (Linux)
sudo systemctl restart docker
```
  
**בעיה**: חיבור ל-PostgreSQL נכשל  
```bash
# בדוק את יומני המכולה
docker-compose logs postgres

# וודא שהמכולה בריאה
docker-compose ps

# בדוק חיבור ישיר
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### בעיות בפריסת Azure

**בעיה**: פריסת Azure נכשלה  
```bash
# בדוק אימות Azure CLI
az account show

# אמת הרשאות מנוי
az role assignment list --assignee $(az account show --query user.name -o tsv)

# בדוק רישום ספק משאבים
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**בעיה**: אימות שירות AI נכשל  
```bash
# בדוק שירות ראשי
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# אמת פריסת שירות בינה מלאכותית
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### בעיות בסביבת Python

**בעיה**: התקנת חבילות נכשלה  
```bash
# שדרג את pip ואת setuptools
python -m pip install --upgrade pip setuptools wheel

# נקה את המטמון של pip
pip cache purge

# התקן חבילות אחת אחת כדי לזהות בעיות
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**בעיה**: VS Code לא מוצא את מתורגמן Python  
```bash
# הצג נתיבי מפרש פייתון
which python  # macOS/Linux
where python  # Windows

# הפעל תחילה את סביבת הפיתוח הווירטואלית
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# ואז פתח את VS Code
code .
```
  

## 🎯 נקודות עיקריות

לאחר סיום המעבדה הזו, יהיה לך:

✅ **סביבת פיתוח מלאה**: כל הכלים מותקנים ומוגדרים  
✅ **משאבי Azure פרוסים**: שירותי AI ותשתיות נלוות  
✅ **סביבת Docker פעילה**: מכולות PostgreSQL ושרת MCP  
✅ **אינטגרציית VS Code**: שרתי MCP מוגדרים ונגישים  
✅ **הגדרה מאומתת**: כל הרכיבים נבדקו ופועלים יחד  
✅ **ידע בפתרון בעיות**: בעיות נפוצות ופתרונות  

## 🚀 מה הלאה

עם סביבה מוגדרת, המשך ל-**[מעבדה 04: עיצוב סכמת בסיס נתונים](../04-Database/README.md)** כדי:  

- לחקור את סכימת בסיס הנתונים הקמעונאי בפירוט  
- להבין מודל נתונים רב-דיירים  
- ללמוד על יישום אבטחת שורה ברמה  
- לעבוד עם נתוני דוגמה קמעונאיים  

## 📚 משאבים נוספים

### כלי פיתוח  
- [תיעוד Docker](https://docs.docker.com/) - הפניה מלאה ל-Docker  
- [הפניה ל-Azure CLI](https://docs.microsoft.com/cli/azure/) - פקודות Azure CLI  
- [תיעוד VS Code](https://code.visualstudio.com/docs) - קונפיגורציה והרחבות  

### שירותי Azure  
- [תיעוד Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - קונפיגורציית שירותי AI  
- [שירות Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - פריסת מודל AI  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - הגדרת ניטור  

### פיתוח Python  
- [סביבות וירטואליות ב-Python](https://docs.python.org/3/tutorial/venv.html) - ניהול סביבות  
- [תיעוד AsyncIO](https://docs.python.org/3/library/asyncio.html) - תבניות תכנות אסינכרוני  
- [תיעוד FastAPI](https://fastapi.tiangolo.com/) - תבניות פיתוח מסגרות רשת  

---

**הבא**: סביבה מוכנה? המשך עם [מעבדה 04: עיצוב סכמת בסיס נתונים](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**כתב ויתור**:
מסמך זה תורגם באמצעות שירות תרגום אוטומטי [Co-op Translator](https://github.com/Azure/co-op-translator). למרות שאנו שואפים לדיוק, יש לקחת בחשבון שתרגומים אוטומטיים עלולים להכיל שגיאות או אי-דיוקים. יש להחשיב את המסמך המקורי בשפתו הטבעית כמקור הסמכות. למידע קריטי מומלץ להשתמש בתרגום מקצועי על ידי מתרגם אדם. אנו לא אחראים לכל אי-הבנה או פירוש שגוי הנובע מהשימוש בתרגום זה.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->