# ပတ်ဝန်းကျင် တပ်ဆင်ခြင်း

## 🎯 ဒီသင်ခန်းစာမှာ ဖေါ်ပြထားတာများ

ဒီ လက်တွေ့ လေ့ကျင့်ရေး သင်ခန်းစာကတော့ MCP ဆာဗာတွေကို PostgreSQL ပေါင်းစပ်ပြီး ဆောက်လုပ်ဖို့ အတွက် တည်ဆောက်ထားတဲ့ စနစ်ပြည့်စုံတဲ့ ဖွံ့ဖြိုးရေး ပတ်ဝန်းကျင် တပ်ဆင်ပေးမှာ ဖြစ်ပါတယ်။ လိုအပ်သော ကိရိယာတွေကို စနစ်တကျ ပြင်ဆင်ပြီး Azure သုံးစွဲမှုများ တပ်ဆင်ပေး၊ သင့်တပ်ဆင်မှုကို စစ်ဆေးဖော်ပြ ပေးမှာ ဖြစ်ပါတယ်။

## မျဉ်းကြောင်း

MCP ဆာဗာ ဖွံ့ဖြိုးတိုးတက်ရန် အောင်မြင်မှုအတွက် သင့်တော်သော ဖွံ့ဖြိုးရေး ပတ်ဝန်းကျင် တပ်ဆင်မှု ခိုင်မာမှု အလွန်အရေးကြီးပါသည်။ ဒီသင်ခန်းစာမှာ Docker၊ Azure ဝန်ဆောင်မှုများ၊ ဖွံ့ဖြိုးရေး ကိရိယာများကို တပ်ဆင်နည်းများနှင့် တစ်ခုတည်းတည်း အောင်မြင်စွာ လုပ်ဆောင်နိုင်ရန် ขั้นตอนလိုက် သင်ကြားပေးမှာ ဖြစ်ပါတယ်။

ဒီ သင်ခန်းစာ အဆုံးမကျဆုံးတော့ သင့်မှာ Zava Retail MCP ဆာဗာကို ဖွံ့ဖြိုးနိုင်ဖို့ ဖွဲ့စည်းထားသော ကိရိယာ ပြည့်စုံတည်ဆောက်မှု ရရှိမှာ ဖြစ်ပါတယ်။

## သင်ယူရမည့် ရည်ရွယ်ချက်များ

ဒီသင်ခန်းစာ အဆုံးမကျဆုံး မည်သူယူနိုင်မှာ:

- **လိုအပ်သော ဖွံ့ဖြိုးရေး ကိရိယာများကို တပ်ဆင်ခြင်းနှင့် ဖွဲ့စည်းနိုင်ခြင်း**
- **MCP ဆာဗာအတွက် လိုအပ်သော Azure အရင်းအမြစ်များ ကို တပ်ဆင်နိုင်ခြင်း**
- **PostgreSQL နှင့် MCP ဆာဗာအတွက် Docker ကုန်ထုတ်ယူ နည်းချက်များ လေ့ကျင့်နိုင်ခြင်း**
- **သင့်ပတ်ဝန်းကျင်၏ တပ်ဆင်မှုကို စမ်းသပ်အတည်ပြုနိုင်ခြင်း**
- **ဆက်ဆံမှုပြဿနာများနှင့် ဖွဲ့စည်းမှု ပြဿနာများ ကို ဖြေရှင်းနိုင်ခြင်း**
- **ဖွံ့ဖြိုးရေးလုပ်ငန်းစဉ်နှင့် ဖိုင်ဖွဲ့စည်းမှု ကို နားလည်သဘောပေါက်နိုင်ခြင်း**

## 📋 လိုအပ်ချက် စစ်ဆေးခြင်း

စတင်ခွင့်မပြုမီ အောက်ပါအချက်များ ရှိမရှိ အတည်ပြုပါ။

### လိုအပ်သော အသိပညာ

- အခြေခံ command line အသုံးပြုနည်း (Windows Command Prompt/PowerShell)
- ပတ်ဝန်းကျင် မားကင် အသိပညာ
- Git ဗားရှင်းထိန်းချုပ်မှုနည်းလမ်းများ နားလည်မှု
- Docker အခြေခံအယူအဆများ (container, image, volume များ)

### စနစ်လိုအပ်ချက်များ

- **အ operating system**: Windows 10/11, macOS, သို့မဟုတ် Linux
- **RAM**: အနည်းဆုံး 8GB (16GB အကြံပြု)
- **သိုလှောင်ရာ**: အနည်းဆုံး 10GB အားလပ်နေရာ
- **ကွန်ယက်**: ဒေါင်းလုပ်အတွက် အင်တာနက်ချိတ်ဆက်မှုနှင့် Azure တပ်ဆင်မှု

### အကောင့်လိုအပ်ချက်များ

- **Azure စာရင်းသွင်းမှု**: အခမဲ့ အဆင့်ဖြစ်ပါကလည်း လုံလောက်သည်
- **GitHub အကောင့်**: ကိုယ်စားလှယ် ဒေတာသိုလှောင်မှုအတွက်
- **Docker Hub အကောင့်**: (လိုအပ်ပါက) အသုံးပြုသူစိတ်ကြိုက် ပုံစံများ ဖန်တီးရန်

## 🛠️ ကိရိယာ တပ်ဆင်ခြင်း

### 1. Docker Desktop တပ်ဆင်ပါ

Docker က ကျွန်ုပ်တို့ဖွံ့ဖြိုးရေး ပတ်ဝန်းကျင်အတွက် container ပတ်ဝန်းကျင် ပေးဆောင်သည်။

#### Windows တပ်ဆင်ခြင်း

1. **Docker Desktop ကို ဒေါင်းလုပ်လုပ်ပါ**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **တပ်ဆင်ပြီး ဖွဲ့စည်းပါ**:  
   - Administrator အဖြစ် installer ကို လည်ပတ်ပါ  
   - WSL 2 ပေါင်းစပ်မှုကို ဖွင့်ပါ  
   - တပ်ဆင်မှုပြီးသွားသောအခါ ကွန်ပျူတာကို ပြန်လည် စတင်ပါ  

3. **တပ်ဆင်မှုကို စစ်ဆေးပါ**:  
   ```cmd
   docker --version
   docker-compose --version
   ```
 
#### macOS တပ်ဆင်ခြင်း

1. **ဒေါင်းလုပ်ယူပြီး တပ်ဆင်ပါ**:  
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg မှ ဒေါင်းလုပ်လုပ်ပါ
   # ဒါမှမဟုတ် Homebrew ကို အသုံးပြုပါ
   brew install --cask docker
   ```
  
2. **Docker Desktop ကို စတင်ပါ**:  
   - Applications မှ Docker Desktop ကို ဖွင့်ပါ  
   - စတင် တပ်ဆင်မှု wizard ကို ပြီးဆုံးပါ  

3. **တပ်ဆင်မှု စစ်ဆေးပါ**:  
   ```bash
   docker --version
   docker-compose --version
   ```
  
#### Linux တပ်ဆင်ခြင်း

1. **Docker Engine တပ်ဆင်ပါ**:  
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # အုပ်စု ပြောင်းလဲမှုများ အကျိုးသက်ရောက်ဖို့ အတွက် အကောင့်မှ ထွက်ပြီး ထပ်မံ ဝင်ရောက်ပါ။
   ```
  
2. **Docker Compose တပ်ဆင်ပါ**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
  
### 2. Azure CLI တပ်ဆင်ပါ

Azure CLI က Azure အရင်းအမြစ် စီမံခန့်ခွဲမှုနှင့် တပ်ဆင်မှုကို ခံနိုင်သည်။

#### Windows တပ်ဆင်ခြင်း

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```
  
#### macOS တပ်ဆင်ခြင်း

```bash
# Homebrew ကို အသုံးပြုခြင်း
brew install azure-cli

# ဒါမှမဟုတ် installer ကို အသုံးပြုခြင်း
curl -L https://aka.ms/InstallAzureCli | bash
```
  
#### Linux တပ်ဆင်ခြင်း

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```
  
#### စစ်ဆေးနှင့် အတည်ပြုခြင်း

```bash
# ထည့်သွင်းမှုကို စစ်ဆေးပါ
az version

# Azure တွင် လော့ဂ်အင်လုပ်ပါ
az login

# ပုံမှန် အသုံးပြုမည့် စာရင်းသွင်းချက်ကို သတ်မှတ်ပါ (သင်မှာ အများကြီးရှိပါက)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```
  
### 3. Git တပ်ဆင်ပါ

Git သည် ရှယ်ထုပ်ထားရာအရင်းအမြစ် ကို ကူးယူခြင်းနှင့် ဗားရှင်းထိန်းချုပ်ရာ အတွက် လိုအပ်သည်။

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```
  
#### macOS

```bash
# Git သည် ပုံမှန်အားဖြင့် မူရင်းတပ်ဆင်ထားပြီး ဖြစ်သည်၊ သို့သော် Homebrew မှတဆင့် အပ်ဒိတ်လုပ်နိုင်ပါသည်။
brew install git
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```
  
### 4. VS Code တပ်ဆင်ပါ

Visual Studio Code သည် MCP ကို အထောက်အပံ့ ပေးသည့် ပေါင်းစည်း ဖွံ့ဖြိုးရေး ပတ်ဝန်းကျင်ဖြစ်သည်။

#### တပ်ဆင်ခြင်း

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```
  
#### လိုအပ်သော အပိုဆောင်းများ

ဒီ VS Code အပိုဆောင်းတွေကို တပ်ဆင်ပါ:

```bash
# command line မှတဆင့် တပ်ဆင်ပါ
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
သို့မဟုတ် VS Code မှတဆင့် တပ်ဆင်နိုင်ပါသည်  
1. VS Code ကို ဖွင့်ပါ  
2. Extensions (Ctrl+Shift+X) သို့ သွားပါ  
3. အောက်ပါအပိုဆောင်းများကို တပ်ဆင်ပါ:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Python တပ်ဆင်ပါ

Python 3.8+ သည် MCP ဆာဗာ ဖွံ့ဖြိုးရေးအတွက် လိုအပ်ပါသည်။

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```
  
#### macOS

```bash
# Homebrew ကို အသုံးပြုခြင်း
brew install python@3.11
```
  
#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```
  
#### တပ်ဆင်မှု စစ်ဆေးပါ

```bash
python --version  # Python 3.11.x ကိုပြသသင့်သည်
pip --version      # pip ဗားရှင်းကိုပြသသင့်သည်
```
  
## 🚀 ပရောဂျက် တပ်ဆင်ခြင်း

### 1. Repository ကို ကလုံးစ်လုပ်ပါ

```bash
# မူလ repository ကို မိတ္ဆက္ရယူပါ
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# ပရောဂျက် ဖိုင်လ်လမ်းညွှန်သို့ သွားပါ
cd MCP-Server-and-PostgreSQL-Sample-Retail

# repository ဖွဲ့စည်းပုံကို အတည်ပြုပါ
ls -la
```
  
### 2. Python Virtual Environment ဖန်တီးပါ

```bash
# အထက်တွင် တူညီသော အခြေအနေ ဖန်တီးပါ
python -m venv mcp-env

# အထက်တွင် တူညီသော အခြေအနေ ကို ဖွင့်ပါ
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# pip ကို အဆင့်မြှင့်တင်ပါ
python -m pip install --upgrade pip
```
  
### 3. Python မှ လိုအပ်သော လုပ်ဆောင်ချက်များ တပ်ဆင်ပါ

```bash
# ဖွံ့ဖြိုးတိုးတက်ရေး မှီခိုရန်လိုအပ်သောအရာများ တပ်ဆင်ပါ
pip install -r requirements.lock.txt

# အဓိက package များကို စစ်ဆေးပါ
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```
  
## ☁️ Azure အရင်းအမြစ်တပ်ဆင်ခြင်း

### 1. အရင်းအမြစ် လိုအပ်ချက်များကို နားလည်ပါ

ကျွန်တော်တို့ MCP ဆာဗာ အတွက် လိုအပ်သော Azure အရင်းအမြစ်များမှာ:

| **အရင်းအမြစ်** | **ရည်ရွယ်ချက်** | **ခန့်မှန်ကျသင့်ငွေ** |
|--------------|------------|-----------------|
| **Microsoft Foundry** | AI မော်ဒယ် တင်သွင်းခြင်းနှင့် စီမံခန့်ခွဲခြင်း | $10-50/လ | 
| **OpenAI Deployment** | စာသား ပုံဖော်ခြင်း မော်ဒယ် (text-embedding-3-small) | $5-20/လ |
| **Application Insights** | စောင့်ကြည့်မှုနှင့် နည်းပညာသုံးသပ်ချက်များ | $5-15/လ |
| **Resource Group** | အရင်းအမြစ်အုပ်စု သတ်မှတ်ခြင်း | အခမဲ့ |

### 2. Azure အရင်းအမြစ် များ ကို တပ်ဆင်ပါ

#### ရွေးချယ်မှု A: အလိုအလျောက် တပ်ဆင်ခြင်း (အကြံပြု)

```bash
# အကြောင်းအရာဖိုင်လမ်းကြောင်းသို့ သွားပါ
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```
  
ဒီ deployment script က:  
1. ထူးခြားတဲ့ resource group တစ်ခု ဖန်တီးပါလိမ့်မယ်  
2. Microsoft Foundry အရင်းအမြစ်တွေ တပ်ဆင်ပါလိမ့်မယ်  
3. text-embedding-3-small မော်ဒယ်ကို တပ်ဆင်ပါလိမ့်မယ်  
4. Application Insights ကို ပြင်ဆင်ပါလိမ့်မယ်  
5. authentication အတွက် service principal ဖန်တီးပါလိမ့်မယ်  
6. အသုံးပြုရန် `.env` ဖိုင် ဖန်တီးပါလိမ့်မယ်  

#### ရွေးချယ်မှု B: ကိုယ့်အလိုက် မန်ယွယ်နယ်အိုင် လုပ်ခြင်း

သင် ကိုယ့်အားဖြင့် ထိန်းချုပ်လိုပါက သို့မဟုတ် အလိုအလျောက် script မအောင်မြင်ပါက:

```bash
# အပြောင်းအလဲများ သတ်မှတ်ပါ
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# အရင်းအမြစ်အုပ်စု ဖန်တီးပါ
az group create --name $RESOURCE_GROUP --location $LOCATION

# မူလ ဆွဲဆောင်မှု စာသားတင်ပါ
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```
  
### 3. Azure စတင်တပ်ဆင်မှုကို စစ်ဆေးပါ

```bash
# အရင်းအမြစ်အုပ်စုကို စစ်ဆေးပါ
az group show --name $RESOURCE_GROUP --output table

# တပ်ဆင်ပြီးသော အရင်းအမြစ်များကို စာရင်းပြုစုပါ
az resource list --resource-group $RESOURCE_GROUP --output table

# AI ဝန်ဆောင်မှုကို စမ်းသပ်ပါ
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```
  
### 4. ပတ်ဝန်းကျင် မားကာများ ဖွဲ့စည်းပါ

တပ်ဆင်ပြီးနောက် `.env` ဖိုင် ရှိနေကြောင်းနှင့် အောက်ပါ အချက်များ ပါဝင်ကြောင်း ကြည့်ရှုပါ:

```bash
# .env ဖိုင်အကြောင်းအရာများ
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# ဒေတာဗေ့စ် ဖန်တီးခြင်း (ဖွံ့ဖြိုးရေးအတွက်)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```
  
## 🐳 Docker ပတ်ဝန်းကျင် တပ်ဆင်ခြင်း

### 1. Docker ရဲ့ ဖွဲ့စည်းမှု ကို နားလည်ပါ

ကျွန်ုပ်တို့ ဖွံ့ဖြိုးရေး ပတ်ဝန်းကျင်က Docker Compose ကို အသုံးပြုသည်။

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
  
### 2. ဖွံ့ဖြိုးရေး ပတ်ဝန်းကျင် စတင်ပါ

```bash
# မိမိသည် ပရောဂျက် မူလဖိုင်စဉ်တွင်ရှိကြောင်း သေချာစေပါ
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# ဝန်ဆောင်မှုများ စတင်ပါ
docker-compose up -d

# ဝန်ဆောင်မှု အခြေအနေ စစ်ဆေးပါ
docker-compose ps

# မှတ်တမ်းများ ကြည့်ရှုပါ
docker-compose logs -f
```
  
### 3. ဒေတာ ဘေ့စ် တပ်ဆင်မှုကို စစ်ဆေးပါ

```bash
# PostgreSQL ကွန်တိန်နာနှင့် ချိတ်ဆက်ပါ
docker-compose exec postgres psql -U postgres -d zava

# ဒေတာဘေ့စ် ဖွဲ့စည်းပုံကို စစ်ဆေးပါ
\dt retail.*

# နမူနာဒေတာကို အတည်ပြုပါ
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL မှ ထွက်ပါ
\q
```
  
### 4. MCP ဆာဗာ စမ်းသပ်ပါ

```bash
# MCP ဆာဗာကျန်းမာရေးကိုစစ်ဆေးပါ
curl http://localhost:8000/health

# အခြေခံ MCP အဆုံးအချက်ကိုစမ်းသပ်ပါ
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```
  
## 🔧 VS Code ဖွဲ့စည်းခြင်း

### 1. MCP ပေါင်းစည်းမှု ဖွဲ့စည်းပါ

VS Code MCP ဖွဲ့စည်းမှု ဖိုင် တစ်ခု ဖန်တီးပါ:

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
  
### 2. Python ပတ်ဝန်းကျင် ဖွဲ့စည်းပါ

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
  
### 3. VS Code ပေါင်းစပ်မှု စမ်းသပ်ပါ

1. **ပရောဂျက်ကို VS Code မှာ ဖွင့်ပါ**:  
   ```bash
   code .
   ```
  
2. **AI chat ကို ဖွင့်ပါ**:  
   - Windows/Linux တွင် `Ctrl+Shift+P` နှိပ်ပါ၊ macOS တွင် `Cmd+Shift+P` နှိပ်ပါ  
   - "AI Chat" ဟု ရိုက်ထည့်၍ "AI Chat: Open Chat" ကို ရွေးချယ်ပါ  

3. **MCP ဆာဗာ ဆက်သွယ်မှု စမ်းသပ်ပါ**:  
   - AI Chat တွင် `#zava` ဟု ရိုက်ထည့်ပြီး စနစ်တစ်ခုကို ရွေးချယ်ပါ  
   - မေးမြန်းရန် - "ဒေတာသိုလှောင်မှုမှာ ဘယ်လို အခွင့်အလမ်းများ ရှိပါသလဲ?"  
   - ပြန်လည်ရရှိမယ့် အဖြေမှာ retail ဒေတာဘေ့စ် ထဲမှ ဇယားစာရင်းဖြစ်ပါလိမ့်မယ်  

## ✅ ပတ်ဝန်းကျင် စစ်ဆေးမှု

### 1. စနစ် လုံးဝ စစ်ဆေးမှု

သင့်တပ်ဆင်မှုကို စစ်ဆေးရန် ဒီ validation script ကို အသုံးပြုပါ:

```bash
# အတည်ပြုမှု script ဖန်တီးပါ
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
    
    # Python ဗားရှင်းစစ်ဆေးပါ
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # လိုအပ်သော package များစစ်ဆေးပါ
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Docker စစ်ဆေးပါ
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Azure CLI စစ်ဆေးပါ
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # ပတ်ဝန်းကျင်အပြောင်းအလဲများစစ်ဆေးပါ
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
    
    # ဒေတာဘေ့စ်ချိတ်ဆက်မှုစစ်ဆေးပါ
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # စမ်းသပ်မေးခွန်း
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
    
    # MCP server စစ်ဆေးပါ
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
    
    # Azure AI ဝန်ဆောင်မှုစစ်ဆေးပါ
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # ယင်းသည် အသက်အကြောင်းအရာ မှားယွင်းပါက မအောင်မြင်ပါ
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

# အတည်ပြုမှုကို အလုပ်လုပ်ပါ
python validate_setup.py
```
  
### 2. ကိုယ်တိုင် စစ်ဆေးမှု စစ်တမ်းစာရင်း

**✅ အခြေခံ ကိရိယာများ**  
- [ ] Docker v20.10+ တပ်ဆင်ပြီး လည်ပတ်နေသည်  
- [ ] Azure CLI v2.40+ တပ်ဆင်ပြီး အတည်ပြုပြီး  
- [ ] Python 3.8+ နှင့် pip ရှိသည်  
- [ ] Git v2.30+ တပ်ဆင်ပြီး  
- [ ] VS Code မှ လိုအပ်သော ပေါင်းစည်းပစ္စည်းများ

**✅ Azure အရင်းအမြစ်များ**  
- [ ] Resource group ကို အောင်မြင်စွာ ဖန်တီးထားသည်  
- [ ] AI Foundry ပရောဂျက် တပ်ဆင်သွားသည်  
- [ ] OpenAI text-embedding-3-small မော်ဒယ် တပ်ဆင်ပြီး  
- [ ] Application Insights ပြင်ဆင်ထားသည်  
- [ ] service principal ကို ခွင့်ပြုချက်ဖြင့် ဖန်တီးထားသည်  

**✅ ပတ်ဝန်းကျင် ဖွဲ့စည်းမှု**  
- [ ] `.env` ဖိုင် လိုအပ်သော variable များနှင့် ဖန်တီးပြီး  
- [ ] Azure အတည်ပြုချက်များ လုပ်ဆောင်နိုင်သည် (`az account show` ဖြင့် စမ်းသပ်ပါ)  
- [ ] PostgreSQL container တွေ များ လည်ပတ်ပြီး ဝင်ရောက်အသုံးပြုနိုင်သည်  
- [ ] စမ်းသပ်ရမည့် ဒေတာများ ဒေတာဘေ့စ် ထဲသို့ လုပ်သွင်းထားသည်  

**✅ VS Code ပေါင်းစည်းမှု**  
- [ ] `.vscode/mcp.json` ဖန်တီးပြီး စနစ်တကျ ဖွဲ့စည်းထားသည်  
- [ ] Python interpreter ကို virtual environment သို့ ချိန်ညှိထားသည်  
- [ ] MCP ဆာဗာများ AI Chat မှာ မြင်နိုင်သည်  
- [ ] AI Chat မှ ခုနစ် စမ်းသပ်မေးခွန်းများ ပြုလုပ်နိုင်သည်  

## 🛠️ အထူးပြု ပြဿနာများ ဖြေရှင်းနည်း

### Docker ပြဿနာများ

**ပြဿနာ**: Docker container မစတင်ပါ  
```bash
# Docker ဝန်ဆောင်မှု အခြေအနေကို စစ်ဆေးပါ
docker info

# ရရှိနိုင်သော အရင်းအမြစ်များကို စစ်ဆေးပါ
docker system df

# လိုအပ်ပါက သန့်ရှင်းပါ
docker system prune -f

# Docker Desktop ကို ပြန်စတင်ပါ (Windows/macOS)
# ဒါမှမဟုတ် Docker ဝန်ဆောင်မှုကို ပြန်စတင်ပါ (Linux)
sudo systemctl restart docker
```
  
**ပြဿနာ**: PostgreSQL ဆက်သွယ်မှု မအောင်မြင်ပါ  
```bash
# ကွန်တိန်နာမှတ်တမ်းများ စစ်ဆေးပါ
docker-compose logs postgres

# ကွန်တိန်နာ ကျန်းမာကြောင်း အတည်ပြုပြီး
docker-compose ps

# တိုက်ရိုက်ချိတ်ဆက်မှုကို စမ်းသပ်ပါ
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Azure တပ်ဆင်မှု ပြဿနာများ

**ပြဿနာ**: Azure တပ်ဆင်မှု မအောင်မြင်ပါ  
```bash
# Azure CLI အတည်ပြုမှုကို စစ်ဆေးပါ
az account show

# စာရင်းပေးသွင်းခွင့်များကို အတည်ပြုပါ
az role assignment list --assignee $(az account show --query user.name -o tsv)

# အရင်းအမြစ်ပို့ချသူ မှတ်ပုံတင်မှုအား စစ်ဆေးပါ
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**ပြဿနာ**: AI ဝန်ဆောင်မှု အတည်ပြုမှု မအောင်မြင်ပါ  
```bash
# စမ်းသပ်မှု service principal
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# AI service ဖြန့်ချိမှုကို အတည်ပြုပါ
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Python ပတ်ဝန်းကျင် ပြဿနာများ

**ပြဿနာ**: package တပ်ဆင်မှု မအောင်မြင်ပါ  
```bash
# pip နှင့် setuptools ကို အဆင့်မြှင့်တင်ပါ
python -m pip install --upgrade pip setuptools wheel

# pip cache ကို ဖယ်ရှားပါ
pip cache purge

# ပြဿနာများကို ရှာဖွေသိရှိနိုင်ရန် package များကို တစ်ခုချင်းစီ တပ်ဆင်ပါ
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**ပြဿနာ**: VS Code က Python interpreter ကို မတွေ့ပါ  
```bash
# Python အသုံးပြုသူ အဖွင့်လမ်းကြောင်းများ ပြပါ
which python  # macOS/Linux
where python  # Windows

# အရင်ဆုံး virtual environment ကို ဖွင့်ပါ
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# ထို့နောက် VS Code ကို ဖွင့်ပါ
code .
```
  
## 🎯 အဓိက သင်ခန်းစာများ

ဒီသင်ခန်းစာ ပြီးဆုံးပြီးနောက် အောက်ပါ အချက်များ ရရှိပါလိမ့်မယ်-

✅ **ပြည့်စုံသော ဖွံ့ဖြိုးရေး ပတ်ဝန်းကျင်**: ကိရိယာများ လုံးဝ တပ်ဆင်ပြီး ဖွဲ့စည်းထားသည်  
✅ **Azure အရင်းအမြစ်များ တပ်ဆင်ပြီး**: AI ဝန်ဆောင်မှုများ နှင့် အထောက်အပံ့ ဖွဲ့စည်းမှုများ  
✅ **Docker ပတ်ဝန်းကျင် စတင်အသုံးပြုနေသည်**: PostgreSQL နှင့် MCP ဆာဗာ container များ  
✅ **VS Code ပေါင်းစည်းမှု**: MCP ဆာဗာများ ဖွဲ့စည်းပြီး ဝင်ရောက် အသုံးပြုရန်  
✅ **တပ်ဆင်မှု စစ်ဆေးပြီးမှတ်သားထားမှု**: အားလုံး စမ်းသပ်မှု ပြီးစီးနေခြင်း  
✅ **ပြဿနာဖြေရှင်း နည်းဗျူဟာ**: ကျယ်ပြန့်သော ပြဿနာအမျိုးမျိုးနှင့် ဖြေရှင်းနည်းများ  

## 🚀 နောက်တစ်ဆင့်

သင့် ပတ်ဝန်းကျင် ပြုလုပ်ပြီး ဖြစ်သောကြောင့် **[Lab 04: Database Design and Schema](../04-Database/README.md)** ကို ဆက်လက် သွားပါ။

- retail ဒေတာဘေ့စ် ဖွဲ့စည်းမှုများ ကို အသေးစိတ် လေ့လာခြင်း  
- ပလက်ဖောင်းများစွာ ဆက်စပ် ဒေတာ မော်ဒယ် တည်ဆောက်ခြင်း  
- Row Level Security ရေးဆွဲခြင်း ကို နားလည်ခြင်း  
- retail ဒေတာနမူနာများနှင့် လုပ်ဆောင်ခြင်း  

## 📚 ထပ်ဆင့် အရင်းအမြစ်များ

### ဖွံ့ဖြိုးရေး ကိရိယာများ

- [Docker အကူအညီစာမျက်နှာ](https://docs.docker.com/) - Docker လမ်းညွှန်လုံးဝ  
- [Azure CLI အညွှန်း](https://docs.microsoft.com/cli/azure/) - Azure CLI သုံးစွဲနည်း  
- [VS Code လမ်းညွှန်စာမျက်နှာ](https://code.visualstudio.com/docs) - အယ်ဒီတာ ဖြည့်စွက်မှုများနှင့် ဖွဲ့စည်းမှု

### Azure ဝန်ဆောင်မှုများ

- [Microsoft Foundry လမ်းညွှန်စာမျက်နှာ](https://docs.microsoft.com/azure/ai-foundry/) - AI ဝန်ဆောင်မှု ဖွဲ့စည်းမှု  
- [Azure OpenAI ဝန်ဆောင်မှု](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI မော်ဒယ်တပ်ဆင်မှု  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - မော်နီတာတင်နည်း

### Python ဖွံ့ဖြိုးရေး

- [Python Virtual Environment](https://docs.python.org/3/tutorial/venv.html) - ပတ်ဝန်းကျင်စီမံခန့်ခွဲမှု  
- [AsyncIO စာမျက်နှာ](https://docs.python.org/3/library/asyncio.html) - async ပရိုဂရမ်းမင်း အကြံပြုချက်များ  
- [FastAPI လမ်းညွှန်စာမျက်နှာ](https://fastapi.tiangolo.com/) - ဝက်ဘ် ဖွံ့ဖြိုးရေး မော်ဒယ်များ  

---

**နောက်တစ်ဆင့်**: ပတ်ဝန်းကျင် ပြင်ဆင်ပြီးပါပြီ။ ဆက်လက် လုပ်ဆောင်ရန် [Lab 04: Database Design and Schema](../04-Database/README.md) ကို ဝင်ရောက်ပါ။

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ပြောကြားချက်**
ဤစာတမ်းကို AI ဘာသာပြန်ဝန်ဆောင်မှု [Co-op Translator](https://github.com/Azure/co-op-translator) အသုံးပြု၍ ဘာသာပြန်ထားပါသည်။ ကျွန်ုပ်တို့သည် တိကျမှန်ကန်မှုအတွက် ကြိုးပမ်းနေသော်လည်း၊ စက်ကိရိယာဘာသာပြန်ခြင်းများတွင် အမှားများ သို့မဟုတ် မှားယွင်းချက်များ ပါဝင်နိုင်ကြောင်း သတိပြုပါရန် လိုအပ်ပါသည်။ မူလစာတမ်းကို မူရင်းဘာသာဖြင့်သာ ယုံကြည်စိတ်ချရသော အချက်အလက်အဖြစ် သတ်မှတ်သင့်သည်။ အရေးကြီးသည့် သတင်းအချက်အလက်များအတွက် ပရော်ဖက်ရှင်နယ် လူသားဘာသာပြန်သူဝန်ဆောင်မှုကို အကြံပြုပါသည်။ ဤဘာသာပြန်ချက်ကို အသုံးပြုခြင်းမှ ဖြစ်ပေါ်လာသော နားလည်မှုကွာခြားမှုများ သို့မဟုတ် မမှန်ကန်သော အသုံးပြုမှုများအတွက် ကျွန်ုပ်တို့ တာဝန်မခံပါ။
<!-- CO-OP TRANSLATOR DISCLAIMER END -->