# പരിസ്ഥിതി ക്രമീകരണം

## 🎯 ഈ ലാബ് ഉൾക്കാഴ്ച

ഈHands-on ലാബ് MCP സെർവറുകൾ PostgreSQL ഇന്റഗ്രേഷനോടുകൂടി നിർമ്മിക്കാൻ പൂർണ്ണ ഡിവലപ്പ്മെന്റ് പരിസ്ഥിതി ക്രമീകരിക്കുന്നതിനുള്ള മാർഗ്ഗനിർദേശങ്ങൾ നൽകിയിരിക്കുന്നു. നിങ്ങൾക്ക് ആവശ്യമായ എല്ലാ ഉപാധികളും ക്രമീകരിക്കുകയും, Azure റിസോഴ്സുകൾ വിന്യസിക്കുകയും, നിങ്ങളുടെ ക്രമീകരണം ശരിയായതായി ഉറപ്പു വരുത്തിയ ശേഷം നടപ്പിലാക്കലിലേക്ക് മുന്നേറുകയും ചെയ്യാം.

## അവലോകനം

ഒരു ശരിയായ ഡിവലപ്പ്മെന്റ് പരിസ്ഥിതി വിജയകരമായ MCP സെർവർ വികസനത്തിന് നിർണായകമാണ്. ഈ ലാബ് Docker, Azure സേവനങ്ങൾ, ഡിവലപ്പ്മെന്റ് ഉപകരണങ്ങൾ ക്രമീകരിക്കുന്നതിനും എല്ലാം ശരിയായി പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പു വരുത്തുന്നതിനും വേണ്ടി ഘട്ടം ഘട്ടമായ നിർദ്ദേശങ്ങൾ നൽകുന്നു.

ഈ ലാബ് പൂർത്തിയാക്കുമ്പോൾ, നിങ്ങൾക്ക് Zava Retail MCP സെർവർ നിർമ്മിക്കാൻ തയാറായ പൂർണ്ണ ഫംഗ്ഷണൽ ഡിവലപ്പ്മെന്റ് പരിസ്ഥിതി ഉണ്ടാകും.

## പഠന ലക്ഷ്യങ്ങൾ

ഈ ലാബിന്റെ അവസാനം, നിങ്ങൾക്ക് ചെയ്യാൻ കഴിയും:

- **ആവശ്യമായ എല്ലാ ഡിവലപ്പ്മെന്റ് ഉപകരണങ്ങളും ഇൻസ്റ്റാൾ ചെയ്ത് ക്രമീകരിക്കുക**
- **MCP സെർവറിനും വേണ്ട Azure റിസോഴ്സുകളും വിന്യാസം നടത്തുക**
- **PostgreSQLക്കും MCP സെർവറിനും വേണ്ട Docker കണ്ടെയ്‌നറുകൾ ക്രമീകരിക്കുക**
- **പരിസ്ഥിതി ക്രമീകരണം പരിശോധനാ കണക്ഷനുകൾ വഴി ശരിയാണെന്ന് ഉറപ്പു വരുത്തുക**
- **സാധാരണ ക്രമീകരണ പ്രശ്നങ്ങൾ തിരിച്ചറിയുകയും പരിഹരിക്കുകയും ചെയ്യുക**
- **ഡിവലപ്പ്മെന്റ് പ്രവൃത്തി പ്രവാഹവും ഫയൽ ഘടനയും മനസിലാക്കുക**

## 📋 മുൻകൂർ വിവരം പരിശോധന

തുടക്കം മുതൽ, നിങ്ങൾക്കുണ്ടായിരിക്കുക:

### ആവശ്യമായ അറിവുകൾ
- അടിസ്ഥാന കമാൻഡ് ലൈൻ ഉപയോഗം (Windows Command Prompt/PowerShell)
- പരിസ്ഥിതി വേരിയബിളുകളുടെ മനസ്സിലാക്കൽ
- Git വേർഷൻ നിയന്ത്രണ പരിചയം
- Docker അടിസ്ഥാന ആശയങ്ങൾ (കൊണ്ടെയ്‌നറുകൾ, ഇമേജുകൾ, വോൾയൂമുകൾ)

### സിസ്റ്റം ആവശ്യകതകൾ
- **ഓപറേറ്റിങ് സിസ്റ്റം**: Windows 10/11, macOS, അല്ലെങ്കിൽ Linux
- **RAM**: കുറഞ്ഞത് 8GB (16GB ശുപാർശ)
- **സ്റ്റോറേജ്**: കുറഞ്ഞത് 10GB ഫ്രീ സ്‌പേസ്
- **നെറ്റ്‌വർക്ക്**: ഡൗൺലോഡിനും Azure വിന്യാസത്തിനും ഇന്റർനെറ്റ് കണക്ഷൻ

### അക്കൗണ്ട് ആവശ്യകതകൾ
- **Azure സബ്സ്ക്രിപ്ഷൻ**: ഫ്രീ ടയർ മതിയാകും
- **GitHub അക്കൗണ്ട്**: റിപോസിറ്ററി ആക്‌സസ് ലഭ്യമാക്കാനായി
- **Docker Hub അക്കൗണ്ട്**: (ഐച്ഛികം) കസ്റ്റം ഇമേജ് പബ്ലിഷിന്

## 🛠️ ഉപകരണ ഇൻസ്റ്റലേഷൻ

### 1. Docker Desktop ഇൻസ്റ്റാൾ ചെയ്യുക

Docker, നമ്മുടെ ഡിവലപ്പ്മെന്റ് സെറ്റപ്പിനുള്ള കണ്ടെയ്‌നർ പാരിസ്ഥിതികം നൽകുന്നു.

#### Windows ഇൻസ്റ്റലേഷൻ

1. **Docker Desktop ഡൗൺലോഡ് ചെയ്യുക**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **ഇൻസ്റ്റാൾ ചെയ്ത് ക്രമീകരിക്കുക**:
   - അഡ്മിനിസ്ട്രേറ്ററായി ഇൻസ്റ്റാളർ റൺ ചെയ്യുക
   - നിർദ്ദേശിച്ചപ്പോഴർ WSL 2 ഇന്റഗ്രേഷൻ പ്രവർത്തനക്ഷമമാക്കുക
   - ഇൻസ്റ്റലേഷൻ പൂർത്തിയായ ശേഷം കമ്പ്യൂട്ടർ റീസ്റ്റാർട്ട് ചെയ്യുക

3. **ഇൻസ്റ്റലേഷൻ ശരിയെന്ന് പരിശോധിക്കുക**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS ഇൻസ്റ്റലേഷൻ

1. **ഡൗൺലോഡ് ചെയ്ത് ഇൻസ്റ്റാൾ ചെയ്യുക**:
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg എന്നുള്ള സൈറ്റിൽനിന്ന് ഡൗൺലോഡ് ചെയ്യുക
   # അല്ലെങ്കിൽ ഹോംബ്രൂ ഉപയോഗിക്കുക
   brew install --cask docker
   ```

2. **Docker Desktop ആരംഭിക്കുക**:
   - ആപ്പ്‌സിൽ നിന്ന് Docker Desktop സ്റ്റാർട്ട് ചെയ്യുക
   - ഇൻഷ്യൽ സജ്ജീകരണ വിപ്ലവം പൂർത്തിയാക്കുക

3. **ഇൻസ്റ്റലേഷൻ ശരിയെന്ന് പരിശോധിക്കുക**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux ഇൻസ്റ്റലേഷൻ

1. **Docker എഞ്ചിൻ ഇൻസ്റ്റാൾ ചെയ്യുക**:
   ```bash
   # ഉബുണ്ടു/ഡെബിയന്‍
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # ഗ്രൂപ്പ് മാറ്റങ്ങള്‍ പ്രാബല്യത്തില്‍ വരുന്നതിന് ലോഗ് ഔട്ട് ചെയ്ത് വീണ്ടും ലോഗിൻ ചെയ്യുക
   ```

2. **Docker Compose ഇൻസ്റ്റാൾ ചെയ്യുക**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI ഇൻസ്റ്റാൾ ചെയ്യുക

Azure CLI Azure റിസോഴ്സ് വിന്യാസവും മാനേജുമെന്റും എളുപ്പം നടത്താൻ സഹായിക്കുന്നു.

#### Windows ഇൻസ്റ്റലേഷൻ

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS ഇൻസ്റ്റലേഷൻ

```bash
# Homebrew ഉപയോഗിക്കുന്നു
brew install azure-cli

# അല്ലെങ്കിൽ ഇൻസ്റ്റാളർ ഉപയോഗിക്കുന്നു
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux ഇൻസ്റ്റലേഷൻ

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### പരിശോധിച്ച് ഓതന്റിക്കേറ്റ് ചെയ്യുക

```bash
# ഇൻസ്റ്റാളേഷൻ പരിശോധിക്കുക
az version

# ആസൂരിൽ ലോഗിൻ ചെയ്യുക
az login

# ഡിഫോൾട്ട് സബ്സ്ക്രിപ്ഷൻ സെറ്റുചെയ്യുക (നിങ്ങൾക്ക് നിരവധി സബ്സ്ക്രിപ്ഷനുകൾ ഉണ്ടെങ്കിൽ)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git ഇൻസ്റ്റാൾ ചെയ്യുക

Git റിപോസിറ്ററി ക്ലോൺ ചെയ്യാനും വേർഷൻ നിയന്ത്രണത്തിന് വേണ്ടിയാണ്.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git സാധാരണയായി മുൻകൂട്ടി ഇൻസ്റ്റാൾ ചെയ്തിട്ടുള്ളതാണ്, എന്നാൽ നിങ്ങൾ Homebrew വഴി അപ്ഡേറ്റ് ചെയ്യാൻ കഴിയും
brew install git
```

#### Linux

```bash
# ഉബുണ്ടു/ഡെബിയൻ
sudo apt update && sudo apt install git

# ആർഎച്ച്ഇഎൽ/സെൻ്റ്ഒഎസ്
sudo dnf install git
```

### 4. VS Code ഇൻസ്റ്റാൾ ചെയ്യുക

Visual Studio Code MCP പിന്തുണയുള്ള സംയോജിത ഡിവലപ്പ്മെന്റ് പരിസ്ഥിതി ആണ്.

#### ഇൻസ്റ്റലേഷൻ

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### ആവശ്യമായ എക്സ്റ്റെൻഷനുകൾ

ഈ VS Code എക്സ്റ്റെൻഷനുകൾ ഇൻസ്റ്റാൾ ചെയ്യുക:

```bash
# കമാൻഡ് ലൈൻ വഴി ഇൻസ്റ്റാൾ ചെയ്യുക
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

അല്ലെങ്കിൽ VS Code വഴി ഇൻസ്റ്റാൾ ചെയ്യാം:
1. VS Code തുറക്കുക
2. എക്സ്റ്റെൻഷനുകൾക്ക് പോകുക (Ctrl+Shift+X)
3. ഇൻസ്റ്റാൾ ചെയ്യുക:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python ഇൻസ്റ്റാൾ ചെയ്യുക

MCP സെർവർ ഡിവലപ്പ്മെന്റിന് Python 3.8+ ആവശ്യമാണ്.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# ഹോംബ്രൂ ഉപയോഗിച്ച്
brew install python@3.11
```

#### Linux

```bash
# ഉബുണ്ടു/ഡെബിയൻ
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# ആർഎച്ച്ഇഎൽ/സെൻ്റ്ഒഎസ്
sudo dnf install python3.11 python3.11-pip
```

#### ഇൻസ്റ്റലേഷൻ പരിശോധിക്കുക

```bash
python --version  # Python 3.11.x കാണിക്കണം
pip --version      # pip വേർഷൻ കാണിക്കണം
```

## 🚀 പ്രോജക്ട് ക്രമീകരണം

### 1. റിപോസിറ്ററി ക്ലോൺ ചെയ്യുക

```bash
# പ്രധാന റിപോസിറ്ററി ക്ലോൺ ചെയ്യുക
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# പ്രോജക്റ്റ് ഡയറക്ടറിയിലേക്ക് നിവിഗേറ്റ് ചെയ്യുക
cd MCP-Server-and-PostgreSQL-Sample-Retail

# റിപോസിറ്ററി ഘടന സ്ഥിരീകരിക്കുക
ls -la
```

### 2. Python വെർച്വൽ പരിസ്ഥിതി സൃഷ്ടിക്കുക

```bash
# വെർച്വൽ എൻവയിറൺമെന്റ് സൃഷ്ടിക്കുക
python -m venv mcp-env

# വെർച്വൽ എൻവയിറൺമെന്റ് സജീവമാക്കുക
# വിൻഡോസ്
mcp-env\Scripts\activate

# മാക്OS/ലിനക്സ്
source mcp-env/bin/activate

# പിപ്പ് അപ്‌ഗ്രേഡ് ചെയ്യുക
python -m pip install --upgrade pip
```

### 3. Python ആവശ്യങ്ങൾ ഇൻസ്റ്റാൾ ചെയ്യുക

```bash
# വികസന ആശ്രിതങ്ങൾ ഇൻസ്റ്റാൾ ചെയ്യുക
pip install -r requirements.lock.txt

# പ്രധാന പാക്കേജുകൾ സ്ഥിരീകരിക്കുക
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure റിസോഴ്‌സ് വിന്യാസം

### 1. റിസോഴ്സ് ആവശ്യകതകൾ മനസിലാക്കുക

നമ്മുടെ MCP സെർവറിന് ഈ Azure റിസോഴ്സുകൾ ആവശ്യമുണ്ട്:

| **റിസോഴ്‌സ്** | **ഉദ്ദേശ്യം** | **അനുമാന വിവരം ചിലവ്** |
|--------------|-------------|-------------------------|
| **Microsoft Foundry** | AI മോഡൽ ഹോസ്റ്റിംഗും മാനേജുമെന്റും | $10-50/മാസം |
| **OpenAI വിന്യാസം** | ടെക്സ്റ്റ് എംബെഡ്ഡിംഗ് മോഡൽ (text-embedding-3-small) | $5-20/മാസം |
| **Application Insights** | നിരീക്ഷണവും ടെലിമെട്രിയും | $5-15/മാസം |
| **Resource Group** | റിസോർക്കൾ സംഘടന | സൗജന്യം |

### 2. Azure റിസോഴ്സുകൾ വിന്യസിക്കുക

#### ഓപ്ഷൻ A: ഓട്ടോമേറ്റഡ് വിന്യാസം (ശുപാർശചെയ്യുന്നു)

```bash
# സൗകര്യഘടന ഡയറക്ടറിയിലേക്ക് നാവിഗേറ്റ് ചെയ്യുക
cd infra

# വിൻഡോസ് - പവർഷെൽ
./deploy.ps1

# മാക്‌ഓ.എസ്/ലിനക്സ - ബാഷ്
./deploy.sh
```

വിന്യാസ സ്ക്രിപ്റ്റ് ചെയ്യുന്നത്:
1. ഏകദേശം പുതിയ റിസോഴ്‌സ് ഗ്രൂപ്പ് സൃഷ്ടിക്കുക
2. Microsoft Foundry റിസോഴ്സുകൾ വിന്യസിക്കുക
3. text-embedding-3-small മോഡൽ വിന്യസിക്കുക
4. Application Insights ക്രമീകരിക്കുക
5. ഓതന്റിക്കേഷനിനായി സർവീസ് പ്രിൻസിപ്പാൾ സൃഷ്ടിക്കുക
6. `.env` ഫയൽ കോൺഫിഗറേഷൻ സഹിതം ഉൽപ്പാദിപ്പിക്കുക

#### ഓപ്ഷൻ B: മാനുവൽ വിന്യാസം

നിങ്ങൾക്ക് മാനുവലായ നിയന്ത്രണം ആവശ്യമെങ്കിൽ അല്ലെങ്കിൽ ഓട്ടോമേറ്റഡ് സ്ക്രിപ്റ്റ് പരാജയപ്പെടുകയാണെങ്കിൽ:

```bash
# വേരിയബിൾസുകൾ സജ്ജമാക്കുക
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# റിസോഴ്സ് ഗ്രൂപ്പ് സൃഷ്ടിക്കുക
az group create --name $RESOURCE_GROUP --location $LOCATION

# മുഖ്യ ടെമ്പ്ലേറ്റ് വിന്യസിക്കുക
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure വിന്യാസം ശരിയെന്ന് പരിശോധിക്കുക

```bash
# റിസോഴ്‍സ് ഗ്രൂപ്പ് പരിശോധിക്കുക
az group show --name $RESOURCE_GROUP --output table

# വിന്യസിച്ചിട്ടുള്ള റിസോഴ്‌സുകൾ പട്ടികപ്പെടുത്തുക
az resource list --resource-group $RESOURCE_GROUP --output table

# AI സേവനം പരിശോധന നടത്തുക
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. പരിസ്ഥിതി വേരിയബിളുകൾ ക്രമീകരിക്കുക

വിന്യാസത്തിനു ശേഷം, നിങ്ങൾക്ക് `.env` ഫയൽ ഉണ്ടായിരിക്കണം. അതിൽ ഉണ്ടായിരിക്കേണ്ടത് പരിശോധിക്കുക:

```bash
# .env ഫയൽ ഉള്ളടക്കം
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# ഡാറ്റാബേസ് ക്രമീകരണം (ഡെവലപ്പ്മെന്റ്용)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker പരിസ്ഥിതി ക്രമീകരണം

### 1. Docker കംപോസിഷൻ മനസിലാക്കുക

നമ്മുടെ ഡിവലപ്പ്മെന്റ് പരിസ്ഥിതി Docker Compose ഉപയോഗിക്കുന്നു:

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

### 2. ഡിവലപ്പ്മെന്റ് പരിസ്ഥിതി ആരംഭിക്കുക

```bash
# നിർമാണ പ്രോജക്ട് റൂട്ട് ഡയറക്ടറിയിലാണ് നിങ്ങൾ ഉള്ളത് എന്ന് ഉറപ്പാക്കുക
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# സേവനങ്ങൾ ആരംഭിക്കുക
docker-compose up -d

# സേവനത്തിന്റെ നില പരിശോധിക്കുക
docker-compose ps

# ലോഗുകൾ കാണുക
docker-compose logs -f
```

### 3. ഡേറ്റബേസ് ക്രമീകരണം പരിശോധിക്കുക

```bash
# PostgreSQL കണ്ടെയ്‌നറുമായി കണക്ട് ചെയ്യുക
docker-compose exec postgres psql -U postgres -d zava

# ഡേറ്റാബേസ് ഘടന പരിശോധിക്കുക
\dt retail.*

# സാമ്പിൾ ഡാറ്റ സ്ഥിരീകരിക്കുക
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL നിൽ നിന്നും പുറത്തേക്കു പോകുക
\q
```

### 4. MCP സെർവർ പരിശോധന നടത്തുക

```bash
# MCP സെർവർ ആരോഗ്യ പരിശോധന
curl http://localhost:8000/health

# അടിസ്ഥാന MCP എൻഡ്‌പോയിന്റ് പരിശോധന
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code ക്രമീകരണം

### 1. MCP ഇന്റഗ്രേഷൻ ക്രമീകരിക്കുക

VS Code MCP കോൺഫിഗറേഷൻ സൃഷ്ടിക്കുക:

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

### 2. Python പരിസ്ഥിതി ക്രമീകരിക്കുക

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

### 3. VS Code ഇന്റഗ്രേഷൻ പരിശോധന

1. **പ്രോജക്റ്റ് VS Code-ലിൽ തുറക്കുക**:
   ```bash
   code .
   ```

2. **AI ചാറ്റ് തുറക്കുക**:
   - `Ctrl+Shift+P` (Windows/Linux) അല്ലെങ്കിൽ `Cmd+Shift+P` (macOS) അമർത്തുക
   - "AI Chat" ടൈപ്പ് ചെയ്ത് "AI Chat: Open Chat" തിരഞ്ഞെടുക്കുക

3. **MCP സെർവർ കണക്ഷൻ പരിശോധിക്കുക**:
   - AI Chat-ൽ `#zava` ടൈപ്പ് ചെയ്ത് കോൺഫിഗർ ചെയ്ത ഒരു സെർവർ തിരഞ്ഞെടുക്കുക
   - ചോദിക്കുക: "ഡേറ്റാബേസിൽ ലഭ്യമാകുന്ന പട്ടികകൾ ഏതൊക്കെയാണ്?"
   - നിങ്ങൾക്ക് റീടെയിൽ ഡാറ്റാബേസിലെ പട്ടികകൾ പട്ടികയായി കിട്ടണം

## ✅ പരിസ്ഥിതി സർ‌വീസ് പരിശോധന

### 1. സമഗ്ര സിസ്റ്റം പരിശോധന

നിങ്ങളുടെ ക്രമീകരണം ശരിയെന്ന് പരിശോധിക്കാൻ ഈ പരിശോധനാ സ്ക്രിപ്റ്റ് റൺ ചെയ്യുക:

```bash
# ചട്ടക്കുറിപ്പ് സ്ക്രിപ്റ്റ് സൃഷ്ടിക്കുക
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
    
    # പൈത്തൺ പതിപ്പ് പരിശോധിക്കുക
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # ആവശ്യമായ പാക്കേജുകൾ പരിശോധിക്കുക
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # ഡോക്കർ പരിശോധിക്കുക
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # അസ്യൂർ CLI പരിശോധിക്കുക
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # പാരിസ്ഥിതിക മാറ്റുകൾ പരിശോധിക്കുക
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
    
    # ഡേറ്റാബേസ് കണക്ഷൻ പരിശോധിക്കുക
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # ക്വറി പരിശോധന
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
    
    # MCP സർവർ പരിശോധിക്കുക
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
    
    # അസ്യൂർ AI സേവനം പരിശോധിക്കുക
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # രേഖപത്രങ്ങൾ അസാധുവാണെങ്കിൽ ഇത് പരാജയപ്പെടും
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

# സാധുത പരിശോധന നടത്തുക
python validate_setup.py
```

### 2. മാനുവൽ പരിശോധന ചെക്ക്ലിസ്റ്റ്

**✅ അടിസ്ഥാന ഉപകരണങ്ങൾ**
- [ ] Docker പതിപ്പ് 20.10+ ഇൻസ്റ്റാൾ ചെയ്‌തിയും പ്രവർത്തിയുകയും വേണം
- [ ] Azure CLI 2.40+ ഇൻസ്റ്റാൾ ചെയ്‌തും ഓതന്റിക്കേറ്റ് ചെയ്‌തും വേണം
- [ ] Python 3.8+ പിപുമായി ഇൻസ്റ്റാൾ ചെയ്‌തിരിക്കണം
- [ ] Git 2.30+ ഇൻസ്റ്റാൾ ചെയ്‌തിരിക്കണം
- [ ] VS Code ആവശ്യമായ എക്സ്റ്റെൻഷനുകളുമായി

**✅ Azure റിസോഴ്സുകൾ**
- [ ] റസോഴ്‌സ് ഗ്രൂപ്പ് വിജയകരമായി സൃഷ്ടിച്ചത്
- [ ] AI Foundry പ്രോജക്റ്റ് വിന്യസിച്ചത്
- [ ] OpenAI text-embedding-3-small മോഡൽ വിന്യസിച്ചത്
- [ ] Application Insights ക്രമീകരിച്ചത്
- [ ] സർവീസ് പ്രിൻസിപ്പാൾ മതിയായ അനുമതികളോടെ സൃഷ്ടിച്ചത്

**✅ പരിസ്ഥിതി ക്രമീകരണം**
- [ ] `.env` ഫയൽ ആവശ്യമായ എല്ലാ വേരിയബിളുകളോടും ഉണ്ടാക്കി
- [ ] Azure ക്രെഡൻഷ്യൽ വർക്കിംഗ് ( `az account show` ഉപയോഗിച്ച് പരിശോദിക്കുക )
- [ ] PostgreSQL കണ്ടെയ്‌നർ പ്രവർത്തിച്ചും ആക്‌സസിബിളായും
- [ ] ഡാറ്റാബേസിൽ സാമ്പിൾ ഡാറ്റ ലോഡ് ചെയ്‌തു

**✅ VS Code ഇന്റഗ്രേഷൻ**
- [ ] `.vscode/mcp.json` കോൺഫിഗർ ചെയ്‌തിട്ടുണ്ട്
- [ ] Python ഇന്റർപ്രേറ്റർ വെർച്ച്വൽ എൻവയോൺമെന്റ് ആയി ക്രമീകരിച്ചിട്ടുളളത്
- [ ] MCP സെർവർ AI Chat-ൽ കാണുന്നു
- [ ] AI Chat വഴിയാണ് ടെസ്റ്റ് ക്വെറിയുകൾ എക്സിക്യൂട്ട് ചെയ്യാൻ കഴിയും

## 🛠️ സാധാരണ പ്രശ്നങ്ങൾ പരിഹരിക്കൽ

### Docker പ്രശ്നങ്ങൾ

**പ്രശ്നം**: Docker കണ്ടെയ്‌നറുകൾ സ്റ്റാർട്ട് ആകുന്നില്ല
```bash
# Docker സേവനത്തിന്റെ നില പരിശോധിക്കുക
docker info

# ലഭ്യമായ വിഭവങ്ങൾ പരിശോധിക്കുക
docker system df

# ആവശ്യമെങ്കിൽ ശുചീകരിക്കുക
docker system prune -f

# Docker Desktop (Windows/macOS) പുനരാരംഭിക്കുക
# അല്ലെങ്കിൽ Docker സേവനം (Linux) പുനരാരംഭിക്കുക
sudo systemctl restart docker
```

**പ്രശ്നം**: PostgreSQL കണക്ഷൻ പരാജയപ്പെടുന്നു
```bash
# കണ്ടെയ്‌നർ ലോഗുകൾ പരിശോധിക്കുക
docker-compose logs postgres

# കണ്ടെയ്‌നർ സുഖകരമാണെന്ന് സ്ഥിരീകരിക്കുക
docker-compose ps

# നേരിട്ട് ബന്ധം പരിശോധിക്കുക
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure വിന്യാസ പ്രശ്നങ്ങൾ

**പ്രശ്നം**: Azure വിന്യാസം പരാജയപ്പെടുന്നു
```bash
# Azure CLI ഓതന്റിക്കേഷൻ പരിശോധിക്കുക
az account show

# സബ്‌സ്‌ക്രിപ്ഷൻ അവകാശങ്ങൾ സ്ഥിരീകരിക്കുക
az role assignment list --assignee $(az account show --query user.name -o tsv)

# റിസോഴ്‌സ് പ്രൊവൈഡർ രജിസ്ട്രേഷൻ പരിശോധിക്കുക
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**പ്രശ്നം**: AI സർവീസ് ഓതന്റിക്കേഷൻ പരാജയപ്പെടുന്നു
```bash
# സർവീസ് പ്രിൻസിപ്പാൾ പരീക്ഷിക്കുക
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# എഐ സർവീസ് വിനിയോഗം സ്ഥിരീകരിക്കുക
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python പരിസ്ഥിതി പ്രശ്നങ്ങൾ

**പ്രശ്നം**: പാക്കേജ് ഇൻസ്റ്റലേഷൻ പരാജയപ്പെടുന്നു
```bash
# പിപ്പ്‌ ആൻഡ് സെറ്റപ്പുകൾ അപ്‌ഗ്രേഡ് ചെയ്യുക
python -m pip install --upgrade pip setuptools wheel

# പിപ്പ് കാഷെ ക്ലിയർ ചെയ്യുക
pip cache purge

# പ്രശ്നങ്ങൾ കണ്ടെത്താൻ പാക്കേജുകൾ ഒറ്റയ്ക്ക് ഇൻസ്റ്റാൾ ചെയ്യുക
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**പ്രശ്നം**: VS Code Python ഇന്റർപ്രേറ്റർ കണ്ടെത്താൻ കഴിയുന്നില്ല
```bash
# പൈത്തൺ Interpreter പാതകൾ കാണിക്കുക
which python  # മാക്‌ഒഎസ്/ലിനക്‌സ്
where python  # വിൻഡോസ്സ്

# ആദ്യമേ വിർച്വൽ എൻവർണ്മെന്റ് സജീവമാക്കുക
source mcp-env/bin/activate  # മാക്‌ഒഎസ്/ലിനക്‌സ്
mcp-env\Scripts\activate     # വിൻഡോസ്സ്

# പിന്നീട് VS കോഡ് തുറക്കുക
code .
```

## 🎯 പ്രധാന പഠനങ്ങൾ

ഈ ലാബ് പൂർത്തിയാക്കിയ ശേഷം, നിങ്ങൾക്കുണ്ടാകും:

✅ **സമ്പൂർണ്ണ ഡിവലപ്പ്മെന്റ് പരിസ്ഥിതി**: എല്ലാ ഉപകരണങ്ങളും ഇൻസ്റ്റാൾ ചെയ്ത് ക്രമീകരിച്ചിരിക്കുന്നു  
✅ **Azure റിസോഴ്സുകൾ വിന്യസിച്ചത്**: AI സേവനങ്ങൾക്കും സഹായക സംവിധാനങ്ങൾക്കും  
✅ **Docker പരിസ്ഥിതി പ്രവർത്തിക്കുന്നു**: PostgreSQL & MCP സെർവർ കണ്ടെയ്‌നറുകൾ  
✅ **VS Code ഇന്റഗ്രേഷൻ**: MCP സെർവർ കോൺഫിഗർ ചെയ്ത് ആക്‌സസിബിൾ  
✅ **ക്രമീകരണം ശരിയെന്ന് സ്ഥിരീകരിച്ചത്**: എല്ലാ ഘടകങ്ങളും പരീക്ഷിച്ച് ഒത്തിരിച്ചു പ്രവർത്തിക്കുന്നു  
✅ **പ്രശ്ന പരിഹാര അറിവ്**: സാധാരണ പ്രശ്നങ്ങളും പരിഹാര മാർഗങ്ങളും  

## 🚀 അടുത്ത് എന്ത് ചെയ്യണം

നിങ്ങളുടെ പരിസ്ഥിതി ഒരുക്കിയതോടെ, **[ലാബ് 04: ഡേറ്റാബേസ് ഡിസൈൻ ആൻഡ് സ്കീമ](../04-Database/README.md)** തുടർക്കൂ:

- റീടെയിൽ ഡേറ്റാബേസ് സ്കീമ വിശദമായി പകർത്തി പഠിക്കൂ
- മൾട്ടി-ടെനന്റ് ഡാറ്റാ മോഡലിംഗ് മനസ്സിലാക്കുക
- റോ ലെവൽ സെക്യൂരിറ്റി നടപ്പാക്കൽ അറിയുക
- സാമ്പിൾ റീടെയിൽ ഡാറ്റ ഉപയോഗിച്ച് പ്രവർത്തിക്കുക

## 📚 അധിക സ്രോതസ്സുകൾ

### ഡിവലപ്പ്മെന്റ് ഉപകരണങ്ങൾ
- [Docker ഡോക്യുമെന്റേഷൻ](https://docs.docker.com/) - പൂർണ്ണ Docker റഫറൻസ്
- [Azure CLI റഫറൻസ്](https://docs.microsoft.com/cli/azure/) - Azure CLI കമാൻഡുകൾ
- [VS Code ഡോക്യുമെന്റേഷൻ](https://code.visualstudio.com/docs) - എഡിറ്റർ കോൺഫിഗറേഷൻ, എക്സ്റ്റെൻഷനുകൾ

### Azure സേവനങ്ങൾ
- [Microsoft Foundry ഡോക്യുമെന്റേഷൻ](https://docs.microsoft.com/azure/ai-foundry/) - AI സേവന ക്രമീകരണം
- [Azure OpenAI സർവീസ്](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI മോഡൽ വിന്യാസം
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - നിരീക്ഷണ ക്രമീകരണം

### Python ഡിവലപ്പ്മെന്റ്
- [Python വെർച്ച്വൽ എൻവയോൺമെന്റുകൾ](https://docs.python.org/3/tutorial/venv.html) - പരിസ്ഥിതി മാനേജ്മെന്റ്
- [AsyncIO ഡോക്യുമെന്റേഷൻ](https://docs.python.org/3/library/asyncio.html) - അസിങ്ക്രൺ പ്രോഗ്രാമിങ് മാതൃകകൾ
- [FastAPI ഡോക്യുമെന്റേഷൻ](https://fastapi.tiangolo.com/) - വെബ് ഫ്രെയിമ്വർക്കിന്‍റെ മാതൃകകൾ

---

**അടുത്തത്**: പരിസ്ഥിതി തയ്യാറായി? [ലാബ് 04: ഡേറ്റാബേസ് ഡിസൈൻ ആൻഡ് സ്കീമ](../04-Database/README.md) தொடரുക

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**അറിയിപ്പ്**:
ഈ രേഖ AI പരിഭാഷാ സേവനം [Co-op Translator](https://github.com/Azure/co-op-translator) ഉപയോഗിച്ച് പരിഭാഷപ്പെടുത്തിയതാണ്. ഞങ്ങൾ കൃത്യതയ്ക്കായി ശ്രമിക്കുന്നുവെങ്കിലും, ഓട്ടോമേറ്റഡ് പരിഭാഷകളിൽ പിഴവുകൾ അല്ലെങ്കിൽ തെറ്റായ വിവരങ്ങൾ ഉണ്ടാകാൻ സാധ്യതയുണ്ട്. അതിന്റെ സ്വാഭാവിക ഭാഷയിലുള്ള അസൽ രേഖയാണ് പ്രാമാണികമായ ഉറവിടമായി പരിഗണിക്കേണ്ടത്. നിർണായകമായ വിവരങ്ങൾക്ക്, പ്രൊഫഷണൽ മനുഷ്യ പരിഭാഷ ശുപാർശ ചെയ്യുന്നു. ഈ പരിഭാഷ ഉപയോഗിച്ച് ഉണ്ടാകുന്ന തെറ്റിദ്ധാരണകൾ അല്ലെങ്കിൽ തെറ്റായ വ്യാഖ്യാനങ്ങൾക്കായി ഞങ്ങൾ ഉത്തരവാദികളല്ല.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->