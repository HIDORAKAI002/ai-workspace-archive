# การตั้งค่าสภาพแวดล้อม

## 🎯 สิ่งที่ห้องปฏิบัติการนี้ครอบคลุม

ห้องปฏิบัติการเชิงปฏิบัติการนี้จะแนะนำคุณในการตั้งค่าสภาพแวดล้อมการพัฒนาอย่างครบถ้วนสำหรับการสร้างเซิร์ฟเวอร์ MCP พร้อมการรวม PostgreSQL คุณจะกำหนดค่าทุกเครื่องมือที่จำเป็น ติดตั้งทรัพยากร Azure และตรวจสอบการตั้งค่าของคุณก่อนดำเนินการขั้นตอนการใช้งาน

## ภาพรวม

สภาพแวดล้อมการพัฒนาที่เหมาะสมมีความสำคัญสำหรับความสำเร็จในการพัฒนาเซิร์ฟเวอร์ MCP ห้องปฏิบัติการนี้ให้คำแนะนำทีละขั้นตอนสำหรับการตั้งค่า Docker, บริการ Azure, เครื่องมือพัฒนา และการตรวจสอบว่าสิ่งต่างๆ ทำงานร่วมกันได้อย่างถูกต้อง

เมื่อสิ้นสุดห้องปฏิบัติการนี้ คุณจะมีสภาพแวดล้อมการพัฒนาที่ทำงานอย่างสมบูรณ์พร้อมสำหรับการสร้างเซิร์ฟเวอร์ Zava Retail MCP

## วัตถุประสงค์การเรียนรู้

เมื่อสิ้นสุดห้องปฏิบัติการนี้ คุณจะสามารถ:

- **ติดตั้งและกำหนดค่า** เครื่องมือพัฒนาที่จำเป็นทั้งหมด  
- **ติดตั้งทรัพยากร Azure** ที่ต้องการสำหรับเซิร์ฟเวอร์ MCP  
- **ตั้งค่าคอนเทนเนอร์ Docker** สำหรับ PostgreSQL และเซิร์ฟเวอร์ MCP  
- **ตรวจสอบ** การตั้งค่าสภาพแวดล้อมของคุณด้วยการเชื่อมต่อทดสอบ  
- **แก้ไขปัญหา** ปัญหาการตั้งค่าที่พบบ่อยและปัญหาการกำหนดค่า  
- **เข้าใจ** กระบวนการทำงานและโครงสร้างไฟล์

## 📋 การตรวจสอบความพร้อมก่อนเริ่ม

ก่อนเริ่มต้น โปรดตรวจสอบว่าคุณมี:

### ความรู้ที่จำเป็น
- การใช้งานบรรทัดคำสั่งพื้นฐาน (Windows Command Prompt/PowerShell)  
- ความเข้าใจเกี่ยวกับตัวแปรสภาพแวดล้อม  
- ความคุ้นเคยกับการควบคุมเวอร์ชันผ่าน Git  
- แนวคิดพื้นฐานเกี่ยวกับ Docker (คอนเทนเนอร์, อิมเมจ, โวลุ่ม)

### ข้อกำหนดของระบบ
- **ระบบปฏิบัติการ**: Windows 10/11, macOS หรือ Linux  
- **แรม**: อย่างน้อย 8GB (แนะนำ 16GB)  
- **พื้นที่เก็บข้อมูล**: อย่างน้อย 10GB ว่าง  
- **เครือข่าย**: การเชื่อมต่ออินเทอร์เน็ตสำหรับดาวน์โหลดและติดตั้ง Azure

### ข้อกำหนดบัญชี
- **บัญชี Azure**: ฟรี Tier ก็เพียงพอ  
- **บัญชี GitHub**: สำหรับเข้าถึงที่เก็บโค้ด  
- **บัญชี Docker Hub**: (ไม่บังคับ) สำหรับการเผยแพร่อิมเมจของคุณเอง

## 🛠️ การติดตั้งเครื่องมือ

### 1. ติดตั้ง Docker Desktop

Docker ให้สภาพแวดล้อมแบบคอนเทนเนอร์สำหรับการตั้งค่าสำหรับการพัฒนา

#### การติดตั้งบน Windows

1. **ดาวน์โหลด Docker Desktop**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```
  
2. **ติดตั้งและกำหนดค่า**:  
   - รันตัวติดตั้งในฐานะผู้ดูแลระบบ  
   - เปิดใช้งานการรวม WSL 2 เมื่อระบบแจ้ง  
   - รีสตาร์ทคอมพิวเตอร์เมื่อการติดตั้งเสร็จสมบูรณ์  

3. **ตรวจสอบการติดตั้ง**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
  
#### การติดตั้งบน macOS

1. **ดาวน์โหลดและติดตั้ง**:  
   ```bash
   # ดาวน์โหลดจาก https://desktop.docker.com/mac/stable/Docker.dmg
   # หรือใช้ Homebrew
   brew install --cask docker
   ```
  
2. **เริ่มต้น Docker Desktop**:  
   - เปิด Docker Desktop จาก Applications  
   - ทำตามวอร์ซาร์ดการตั้งค่าเริ่มต้นให้ครบถ้วน  

3. **ตรวจสอบการติดตั้ง**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### การติดตั้งบน Linux

1. **ติดตั้ง Docker Engine**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # ออกจากระบบแล้วเข้าสู่ระบบใหม่เพื่อให้การเปลี่ยนแปลงกลุ่มมีผล
   ```
  
2. **ติดตั้ง Docker Compose**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. ติดตั้ง Azure CLI

Azure CLI ช่วยให้คุณติดตั้งและจัดการทรัพยากร Azure ได้

#### การติดตั้งบน Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### การติดตั้งบน macOS

```bash
# การใช้ Homebrew
brew install azure-cli

# หรือใช้ตัวติดตั้ง
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### การติดตั้งบน Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### ตรวจสอบและลงชื่อเข้าใช้

```bash
# ตรวจสอบการติดตั้ง
az version

# เข้าสู่ระบบ Azure
az login

# ตั้งค่าการสมัครใช้งานเริ่มต้น (ถ้าคุณมีหลายรายการ)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. ติดตั้ง Git

Git จำเป็นสำหรับการโคลนที่เก็บและการควบคุมเวอร์ชัน

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git มักจะถูกติดตั้งไว้ล่วงหน้าแล้ว แต่คุณสามารถอัปเดตผ่าน Homebrew ได้
brew install git
```
  
#### Linux

```bash
# อูบุนตู/เดเบียน
sudo apt update && sudo apt install git

# อาร์เฮล/เซ็นต์โอเอส
sudo dnf install git
```
  
### 4. ติดตั้ง VS Code

Visual Studio Code ให้สภาพแวดล้อมการพัฒนาที่บูรณาการพร้อมกับการสนับสนุน MCP

#### การติดตั้ง

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### ส่วนขยายที่จำเป็น

ติดตั้งส่วนขยาย VS Code เหล่านี้:

```bash
# ติดตั้งผ่านบรรทัดคำสั่ง
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
หรือจะติดตั้งผ่าน VS Code:  
1. เปิด VS Code  
2. ไปที่ Extensions (Ctrl+Shift+X)  
3. ติดตั้ง:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. ติดตั้ง Python

Python 3.8+ จำเป็นสำหรับการพัฒนาเซิร์ฟเวอร์ MCP

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# การใช้ Homebrew
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### ตรวจสอบการติดตั้ง

```bash
python --version  # ควรแสดง Python 3.11.x
pip --version      # ควรแสดงเวอร์ชันของ pip
```
  
## 🚀 การตั้งค่าโปรเจกต์

### 1. โคลนที่เก็บโค้ด

```bash
# โคลนที่เก็บหลัก
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# ไปยังไดเรกทอรีโครงการ
cd MCP-Server-and-PostgreSQL-Sample-Retail

# ตรวจสอบโครงสร้างของที่เก็บข้อมูล
ls -la
```
  
### 2. สร้าง Python Virtual Environment

```bash
# สร้างสภาพแวดล้อมเสมือน
python -m venv mcp-env

# เปิดใช้งานสภาพแวดล้อมเสมือน
# วินโดวส์
mcp-env\Scripts\activate

# แมคโอเอส/ลินุกซ์
source mcp-env/bin/activate

# อัปเกรด pip
python -m pip install --upgrade pip
```
  
### 3. ติดตั้ง dependencies ของ Python

```bash
# ติดตั้ง dependencies สำหรับการพัฒนา
pip install -r requirements.lock.txt

# ตรวจสอบแพ็กเกจสำคัญ
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ การติดตั้งทรัพยากร Azure

### 1. เข้าใจข้อกำหนดทรัพยากร

เซิร์ฟเวอร์ MCP ของเราต้องการทรัพยากร Azure ดังนี้:

| **ทรัพยากร** | **วัตถุประสงค์** | **ประมาณค่าใช้จ่าย** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | โฮสต์และจัดการโมเดล AI | $10-50/เดือน |
| **OpenAI Deployment** | โมเดลแปลงข้อความ (text-embedding-3-small) | $5-20/เดือน |
| **Application Insights** | การตรวจสอบและเทเลเมทรี | $5-15/เดือน |
| **Resource Group** | การจัดการทรัพยากร | ฟรี |

### 2. ติดตั้งทรัพยากร Azure

#### ทางเลือก A: การติดตั้งอัตโนมัติ (แนะนำ)

```bash
# ไปที่ไดเรกทอรี infrastructure
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
สคริปต์การติดตั้งจะ:  
1. สร้าง resource group ที่ไม่ซ้ำกัน  
2. ติดตั้งทรัพยากร Microsoft Foundry  
3. ติดตั้งโมเดล text-embedding-3-small  
4. กำหนดค่า Application Insights  
5. สร้าง service principal สำหรับการรับรองตัวตน  
6. สร้างไฟล์ `.env` พร้อมการตั้งค่า  

#### ทางเลือก B: การติดตั้งด้วยตนเอง

ถ้าคุณต้องการควบคุมด้วยตัวเองหรือสคริปต์อัตโนมัติไม่สำเร็จ:

```bash
# ตั้งค่าตัวแปร
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# สร้างกลุ่มทรัพยากร
az group create --name $RESOURCE_GROUP --location $LOCATION

# ติดตั้งแม่แบบหลัก
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. ตรวจสอบการติดตั้ง Azure

```bash
# ตรวจสอบกลุ่มทรัพยากร
az group show --name $RESOURCE_GROUP --output table

# แสดงรายการทรัพยากรที่ถูกติดตั้ง
az resource list --resource-group $RESOURCE_GROUP --output table

# ทดสอบบริการ AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. กำหนดค่าสิ่งแวดล้อม

หลังการติดตั้ง คุณควรมีไฟล์ `.env` ตรวจสอบให้แน่ใจว่าไฟล์ประกอบด้วย:

```bash
# เนื้อหาไฟล์ .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# การตั้งค่าฐานข้อมูล (สำหรับการพัฒนา)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 การตั้งค่า Docker

### 1. เข้าใจ Docker Composition

สภาพแวดล้อมการพัฒนาของเราใช้ Docker Compose:

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
  
### 2. เริ่มต้นสภาพแวดล้อมการพัฒนา

```bash
# ตรวจสอบให้แน่ใจว่าคุณอยู่ในไดเรกทอรีรูทของโปรเจค
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# เริ่มบริการ
docker-compose up -d

# ตรวจสอบสถานะของบริการ
docker-compose ps

# ดูบันทึกเหตุการณ์
docker-compose logs -f
```
  
### 3. ตรวจสอบการตั้งค่าฐานข้อมูล

```bash
# เชื่อมต่อกับคอนเทนเนอร์ PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# ตรวจสอบโครงสร้างฐานข้อมูล
\dt retail.*

# ยืนยันข้อมูลตัวอย่าง
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# ออกจาก PostgreSQL
\q
```
  
### 4. ทดสอบเซิร์ฟเวอร์ MCP

```bash
# ตรวจสอบสุขภาพเซิร์ฟเวอร์ MCP
curl http://localhost:8000/health

# ทดสอบจุดสิ้นสุด MCP พื้นฐาน
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 การกำหนดค่า VS Code

### 1. กำหนดค่า MCP Integration

สร้างการกำหนดค่า MCP ใน VS Code:

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
  
### 2. กำหนดค่า Python Environment

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
  
### 3. ทดสอบการรวม VS Code

1. **เปิดโปรเจกต์ใน VS Code**:  
   ```bash
   code .
   ```
  
2. **เปิด AI Chat**:  
   - กด `Ctrl+Shift+P` (Windows/Linux) หรือ `Cmd+Shift+P` (macOS)  
   - พิมพ์ "AI Chat" แล้วเลือก "AI Chat: Open Chat"  

3. **ทดสอบการเชื่อมต่อเซิร์ฟเวอร์ MCP**:  
   - ใน AI Chat ให้พิมพ์ `#zava` และเลือกเซิร์ฟเวอร์ที่ตั้งค่าไว้  
   - ถามว่า: "มีตารางอะไรบ้างในฐานข้อมูล?"  
   - คุณควรได้รับคำตอบแสดงตารางในฐานข้อมูลค้าปลีก  

## ✅ การตรวจสอบสภาพแวดล้อม

### 1. การตรวจสอบระบบโดยละเอียด

รันสคริปต์ตรวจสอบนี้เพื่อตรวจสอบการตั้งค่าของคุณ:

```bash
# สร้างสคริปต์ตรวจสอบความถูกต้อง
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
    
    # ตรวจสอบเวอร์ชัน Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # ตรวจสอบแพ็กเกจที่จำเป็น
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # ตรวจสอบ Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # ตรวจสอบ Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # ตรวจสอบตัวแปรสภาพแวดล้อม
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
    
    # ตรวจสอบการเชื่อมต่อฐานข้อมูล
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # ทดสอบคำสั่งค้นหา
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
    
    # ตรวจสอบเซิร์ฟเวอร์ MCP
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
    
    # ตรวจสอบบริการ Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # จะล้มเหลวหากข้อมูลรับรองไม่ถูกต้อง
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

# รันการตรวจสอบความถูกต้อง
python validate_setup.py
```
  
### 2. รายการตรวจสอบด้วยตนเอง

**✅ เครื่องมือพื้นฐาน**  
- [ ] ติดตั้งและรัน Docker เวอร์ชัน 20.10+  
- [ ] ติดตั้งและลงชื่อเข้าใช้ Azure CLI 2.40+  
- [ ] ติดตั้ง Python 3.8+ พร้อม pip  
- [ ] ติดตั้ง Git 2.30+  
- [ ] ติดตั้ง VS Code พร้อมส่วนขยายที่จำเป็น  

**✅ ทรัพยากร Azure**  
- [ ] สร้าง resource group สำเร็จ  
- [ ] ติดตั้งโครงการ AI Foundry  
- [ ] ติดตั้งโมเดล openAI text-embedding-3-small  
- [ ] กำหนดค่า Application Insights  
- [ ] สร้าง service principal พร้อมสิทธิ์เหมาะสม  

**✅ การกำหนดค่าสภาพแวดล้อม**  
- [ ] สร้างไฟล์ `.env` พร้อมตัวแปรที่จำเป็นทั้งหมด  
- [ ] การรับรองความถูกต้องของข้อมูล Azure ทำงาน (ทดสอบด้วย `az account show`)  
- [ ] คอนเทนเนอร์ PostgreSQL รันและเข้าถึงได้  
- [ ] โหลดข้อมูลตัวอย่างในฐานข้อมูล  

**✅ การรวม VS Code**  
- [ ] กำหนดค่า `.vscode/mcp.json`  
- [ ] ตั้งค่า Python interpreter เป็น virtual environment  
- [ ] MCP servers ปรากฏใน AI Chat  
- [ ] สามารถรันคำสั่งทดสอบผ่าน AI Chat  

## 🛠️ การแก้ไขปัญหาที่พบบ่อย

### ปัญหา Docker

**ปัญหา**: คอนเทนเนอร์ Docker ไม่เริ่มทำงาน  
```bash
# ตรวจสอบสถานะของบริการ Docker
docker info

# ตรวจสอบทรัพยากรที่มีอยู่
docker system df

# ทำความสะอาดถ้าจำเป็น
docker system prune -f

# รีสตาร์ท Docker Desktop (Windows/macOS)
# หรือรีสตาร์ทบริการ Docker (Linux)
sudo systemctl restart docker
```
  
**ปัญหา**: การเชื่อมต่อ PostgreSQL ล้มเหลว  
```bash
# ตรวจสอบบันทึกคอนเทนเนอร์
docker-compose logs postgres

# ยืนยันว่าคอนเทนเนอร์มีสุขภาพดี
docker-compose ps

# ทดสอบการเชื่อมต่อโดยตรง
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### ปัญหาการติดตั้ง Azure

**ปัญหา**: การติดตั้ง Azure ล้มเหลว  
```bash
# ตรวจสอบการพิสูจน์ตัวตนของ Azure CLI
az account show

# ตรวจสอบสิทธิ์การสมัครสมาชิก
az role assignment list --assignee $(az account show --query user.name -o tsv)

# ตรวจสอบการลงทะเบียนผู้ให้บริการทรัพยากร
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**ปัญหา**: การรับรองตัวตนบริการ AI ล้มเหลว  
```bash
# ทดสอบผู้ใช้หลักบริการ
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# ตรวจสอบการปรับใช้บริการ AI
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### ปัญหาสภาพแวดล้อม Python

**ปัญหา**: การติดตั้งแพ็กเกจล้มเหลว  
```bash
# อัปเกรด pip และ setuptools
python -m pip install --upgrade pip setuptools wheel

# ล้างแคชของ pip
pip cache purge

# ติดตั้งแพ็กเกจทีละตัวเพื่อตรวจสอบปัญหา
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**ปัญหา**: VS Code หา Python interpreter ไม่เจอ  
```bash
# แสดงเส้นทางตัวแปลภาษา Python
which python  # macOS/Linux
where python  # Windows

# เปิดใช้งานสภาพแวดล้อมเสมือนก่อน
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# จากนั้นเปิด VS Code
code .
```
  
## 🎯 ข้อสรุปสำคัญ

หลังจากทำห้องปฏิบัติการนี้เสร็จสิ้น คุณจะมี:

✅ **สภาพแวดล้อมการพัฒนาแบบครบถ้วน**: เครื่องมือทั้งหมดติดตั้งและกำหนดค่า  
✅ **ทรัพยากร Azure ติดตั้งแล้ว**: บริการ AI และโครงสร้างพื้นฐานสนับสนุน  
✅ **สภาพแวดล้อม Docker ทำงาน**: คอนเทนเนอร์ PostgreSQL และเซิร์ฟเวอร์ MCP  
✅ **การรวม VS Code**: เซิร์ฟเวอร์ MCP กำหนดค่าและเข้าถึงได้  
✅ **การตั้งค่าสภาพแวดล้อมผ่านการทดสอบ**: ส่วนประกอบทั้งหมดทำงานร่วมกันได้  
✅ **ความรู้การแก้ไขปัญหา**: ปัญหาที่พบบ่อยและวิธีแก้ไข  

## 🚀 ขั้นตอนถัดไป

เมื่อสภาพแวดล้อมของคุณพร้อมแล้ว ให้ดำเนินการต่อใน **[Lab 04: Database Design and Schema](../04-Database/README.md)** เพื่อ:

- สำรวจก_SCHEMA ฐานข้อมูลค้าปลีกอย่างละเอียด  
- เข้าใจโมเดลข้อมูลแบบมัลติเทนแนนต์  
- เรียนรู้การใช้งาน Row Level Security  
- ทำงานกับข้อมูลตัวอย่างค้าปลีก  

## 📚 แหล่งข้อมูลเพิ่มเติม

### เครื่องมือพัฒนา
- [เอกสาร Docker](https://docs.docker.com/) - อ้างอิงครบถ้วนสำหรับ Docker  
- [เอกสาร Azure CLI](https://docs.microsoft.com/cli/azure/) - คำสั่ง Azure CLI  
- [เอกสาร VS Code](https://code.visualstudio.com/docs) - การกำหนดค่าและส่วนขยายของตัวแก้ไข  

### บริการ Azure
- [เอกสาร Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - การกำหนดค่าบริการ AI  
- [บริการ Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - การติดตั้งโมเดล AI  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - การตั้งค่าการตรวจสอบ  

### การพัฒนา Python
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) - การจัดการสภาพแวดล้อม  
- [เอกสาร AsyncIO](https://docs.python.org/3/library/asyncio.html) - รูปแบบการเขียนโปรแกรมแบบอะซิงโครนัส  
- [เอกสาร FastAPI](https://fastapi.tiangolo.com/) - รูปแบบเฟรมเวิร์กเว็บ  

---

**ถัดไป**: สภาพแวดล้อมพร้อมแล้วหรือยัง? ดำเนินการต่อที่ [Lab 04: Database Design and Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ปฏิเสธความรับผิดชอบ**:
เอกสารนี้ได้รับการแปลโดยใช้บริการแปลภาษา AI [Co-op Translator](https://github.com/Azure/co-op-translator) ขณะที่เราพยายามให้ความถูกต้อง โปรดทราบว่าการแปลโดยอัตโนมัติอาจมีข้อผิดพลาดหรือความไม่ถูกต้อง เอกสารต้นฉบับในภาษาต้นทางควรถูกพิจารณาเป็นแหล่งข้อมูลที่เชื่อถือได้ สำหรับข้อมูลที่สำคัญ แนะนำให้ใช้การแปลโดยมนุษย์มืออาชีพ เราไม่รับผิดชอบต่อความเข้าใจผิดหรือการตีความที่ผิดพลาดที่เกิดขึ้นจากการใช้การแปลนี้
<!-- CO-OP TRANSLATOR DISCLAIMER END -->