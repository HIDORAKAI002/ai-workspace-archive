# Environment Setup

## 🎯 What This Lab Covers

ਇਹ ਹੱਥੋਂ-ਹੱਥ ਲੈਬ ਤੁਹਾਨੂੰ MCP ਸਰਵਰਾਂ ਦੇ ਨਿਰਮਾਣ ਲਈ ਪੋਸਟਗਰੇSQL ਇंटीਗ੍ਰੇਸ਼ਨ ਵਾਲਾ ਪੂਰਾ ਵਿਕਾਸ ਪਰਿਵੇਸ਼ ਸੈੱਟਅੱਪ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ। ਤੁਸੀਂ ਸਾਰੇ ਲੋੜੀਂਦੇ ਟੂਲ ਕਨਫਿਗਰ ਕਰੋਗੇ, Azure ਸਰੋਤ ਤਾਇਨਾਤ ਕਰੋਂਗੇ ਤੇ ਲਾਗੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੇ ਸੈੱਟਅੱਪ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋਗੇ।

## Overview

ਸਹੀ ਵਿਕਾਸ ਪਰਿਵੇਸ਼ MCP ਸਰਵਰ ਵਿਕਾਸ ਵਿੱਚ ਸਫਲਤਾ ਲਈ ਜਰੂਰੀ ਹੈ। ਇਹ ਲੈਬ ਡੋਕਰ, Azure ਸਰਵਿਸਿਜ਼, ਵਿਕਾਸ ਟੂਲਸ ਦੇ ਸੈੱਟਅੱਪ ਅਤੇ ਸਭ ਕੁਝ ਠੀਕ ਤਰ੍ਹਾਂ ਕੰਮ ਕਰਦਾ ਹੈ ਜਾਂ ਨਹੀਂ, ਇਸ ਦੀ ਪੁਸ਼ਟੀ ਲਈ ਕਦਮ ਦਰ ਕਦਮ ਹਦਾਇਤਾਂ ਦਿੰਦੀ ਹੈ।

ਇਸ ਲੈਬ ਦੇ ਅੰਤ ਵਿੱਚ, ਤੁਹਾਡੇ ਕੋਲ Zava Retail MCP ਸਰਵਰ ਬਣਾਉਣ ਲਈ ਪੂਰੀ ਤਰ੍ਹਾਂ ਕਾਰਗਰ ਵਿਕਾਸ ਪਰਿਵੇਸ਼ ਹੋਵੇਗਾ।

## Learning Objectives

ਇਸ ਲੈਬ ਦੇ ਅੰਤ ਵਿੱਚ, ਤੁਸੀਂ ਸਮਰੱਥ ਹੋਵੋਗੇ:

- **ਸਾਰੇ ਲੋੜੀਂਦੇ ਵਿਕਾਸ ਟੂਲਸ ਇੰਸਟਾਲ ਤੇ ਕਨਫਿਗਰ ਕਰਨਾ**  
- **MCP ਸਰਵਰ ਲਈ ਲੋੜੀਂਦੇ Azure ਸਰੋਤ ਤਾਇਨਾਤ ਕਰਨਾ**  
- **ਪੋਸਟਗਰੇSQL ਅਤੇ MCP ਸਰਵਰ ਲਈ ਡੋਕਰ ਕੰਟੇਨਰ ਸੈੱਟਅੱਪ ਕਰਨਾ**  
- **ਟੈਸਟ ਕੁਨੈਕਸ਼ਨਾਂ ਨਾਲ ਆਪਣੇ ਪਰਿਵੇਸ਼ ਸੈੱਟਅੱਪ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨਾ**  
- **ਆਮ ਸੈੱਟਅੱਪ ਸਮੱਸਿਆਵਾਂ ਅਤੇ ਕਨਫਿਗਰੇਸ਼ਨ ਸਮੱਸਿਆਵਾਂ ਦਾ ਹੱਲ ਕਰਨਾ**  
- **ਵਿਕਾਸ ਵਰਕਫਲੋ ਅਤੇ ਫਾਇਲ ਸਰਚਨਾ ਨੂੰ ਸਮਝਣਾ**  

## 📋 Prerequisites Check

ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਹਾਡੇ ਕੋਲ ਹੈ:

### Required Knowledge
- ਮੂਲ ਕਮਾਂਡ ਲਾਈਨ ਵਰਤੋਂ (Windows Command Prompt/PowerShell)  
- ਪਰਿਵੇਸ਼ ਵੈਰੀਏਬਲ ਦੀ ਸਮਝ  
- Git ਵਰਜਨ ਕੰਟਰੋਲ ਨਾਲ ਜਾਣੂਗੀ  
- ਮੂਲ ਡੋਕਰ ਧਾਰਣਾ (ਕੰਟੇਨਰ, ਇਮੇਜ਼, ਵਾਲਿਊਮ)  

### System Requirements
- **ਆਪਰੇਟਿੰਗ ਸਿਸਟਮ**: Windows 10/11, macOS, ਜਾਂ Linux  
- **RAM**: ਘੱਟੋ-ਘੱਟ 8GB (16GB ਦੀ ਸਿਫਾਰਸ਼)  
- **ਸਟੋਰੇਜ**: ਘੱਟੋ-ਘੱਟ 10GB ਖਾਲੀ ਜਗ੍ਹਾ  
- **ਨੈੱਟਵਰਕ**: ਡਾਊਨਲੋਡ ਅਤੇ Azure ਤਾਇਨਾਤੀ ਲਈ ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ  

### Account Requirements
- **Azure Subscription**: ਮੁਫ਼ਤ ਟੀਅਰ ਕਾਫ਼ੀ ਹੈ  
- **GitHub Account**: ਰਿਪੋਜ਼ਿਟਰੀ ਐਕਸੈਸ ਲਈ  
- **Docker Hub Account**: (ਵਿਕਲਪਿਕ) ਕਸਟਮ ਇਮੇਜ਼ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਨ ਲਈ  

## 🛠️ Tool Installation

### 1. Install Docker Desktop

ਡੋਕਰ ਸਾਡੇ ਵਿਕਾਸ ਪਰਿਵੇਸ਼ ਲਈ ਕੰਟੇਨਰ ਆਧਾਰਿਤ ਵਾਤਾਵਰਨ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

#### Windows Installation

1. **ਡੋਕਰ ਡੈਸਕਟਾਪ ਡਾਊਨਲੋਡ ਕਰੋ**:  
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **ਸਥਾਪਿਤ ਅਤੇ ਕਨਫਿਗਰ ਕਰੋ**:  
   - ਇੰਸਟਾਲਰ ਨੂੰ ਐਡਮਿਨਿਸਟਰੇਟਰ ਵਜੋਂ ਚਲਾਓ  
   - ਜਦੋਂ ਪੁੱਛਿਆ ਜਾਵੇ ਤਾਂ WSL 2 ਇੰਟਿਗ੍ਰੇਸ਼ਨ ਨੂੰ ਯੋਗ ਕਰੋ  
   - ਇੰਸਟਾਲੇਸ਼ਨ ਪੂਰੀ ਹੋਣ ਤੇ ਕੰਪਿਊਟਰ ਨੂੰ ਰੀਸਟਾਰਟ ਕਰੋ  

3. **ਸਥਾਪਨਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ**:  
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS Installation

1. **ਡਾਊਨਲੋਡ ਅਤੇ ਇੰਸਟਾਲ ਕਰੋ**:  
   ```bash
   # ਡਾਉਨਲੋਡ ਕਰੋ https://desktop.docker.com/mac/stable/Docker.dmg ਤੋਂ
   # ਜਾਂ Homebrew ਵਰਤੋਂ
   brew install --cask docker
   ```

2. **ਡੋਕਰ ਡੈਸਕਟਾਪ ਸ਼ੁਰੂ ਕਰੋ**:  
   - Applications ਵਿੱਚੋਂ ਡੋਕਰ ਡੈਸਕਟਾਪ ਖੋਲ੍ਹੋ  
   - ਸ਼ੁਰੂਆਤੀ ਸੈਟਅੱਪ ਵਿਜ਼ਾਰਡ ਪੂਰਾ ਕਰੋ  

3. **ਸਥਾਪਨਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ**:  
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux Installation

1. **ਡੋਕਰ ਇੰਜਨ ਇੰਸਟਾਲ ਕਰੋ**:  
   ```bash
   # ਉਬੰਟੂ/ਡੈਬਿਆਨ
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # ਗਰੁੱਪ ਬਦਲਾਵਾਂ ਦੇ ਪ੍ਰਭਾਵ ਲਈ ਲਾਗ ਆਊਟ ਕਰਕੇ ਮੁੜ ਲਾਗ ਇਨ ਕਰੋ
   ```

2. **ਡੋਕਰ ਕੋਮਪੋਜ਼ ਇੰਸਟਾਲ ਕਰੋ**:  
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Install Azure CLI

Azure CLI Azure ਸਰੋਤ ਤਾਇਨਾਤ ਅਤੇ ਪ੍ਰਬੰਧਨ ਲਈ ਯੋਗ ਬਣਾਉਂਦਾ ਹੈ।

#### Windows Installation

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS Installation

```bash
# ਹੋਮਬ੍ਰੂ ਦਾ ਇਸਤੇਮਾਲ ਕਰਨਾ
brew install azure-cli

# ਜਾਂ ਇੰਸਟਾਲਰ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹੋਏ
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux Installation

```bash
# ਉਬੰਟੂ/ਡੇਬਿਅਨ
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# ਆਰਐਚਈਐਲ/ਸੈਂਟਓਐਸ
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Verify and Authenticate

```bash
# ਇੰਸਟਾਲੇਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ
az version

# ਐਜ਼ੂਅਰ ਵਿੱਚ ਲੌਗਇਨ ਕਰੋ
az login

# ਡਿਫਾਲਟ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਸੈੱਟ ਕਰੋ (ਜੇ ਤੁਹਾਡੇ ਕੋਲ ਕਈ ਹਨ)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Install Git

Git ਰਿਪੋਜ਼ਿਟਰੀ ਕਲੋਨ ਕਰਨ ਅਤੇ ਵਰਜਨ ਕੰਟਰੋਲ ਲਈ ਲਾਜ਼ਮੀ ਹੈ।

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# ਗਿਟ ਆਮ ਤੌਰ 'ਤੇ ਪਹਿਲਾਂ ਹੀ ਇੰਸਟਾਲ ਹੁੰਦਾ ਹੈ, ਪਰ ਤੁਸੀਂ Homebrew ਰਾਹੀਂ ਅੱਪਡੇਟ ਕਰ ਸਕਦੇ ਹੋ।
brew install git
```

#### Linux

```bash
# ਉਬੁੰਟੂ/ਡੀਬੀਅਨ
sudo apt update && sudo apt install git

# ਆਰਐਚਈਐਲ/ਸੈਂਟਓਐਸ
sudo dnf install git
```

### 4. Install VS Code

Visual Studio Code MCP ਸਹਿਯੋਗ ਨਾਲ ਇੰਟੀਗ੍ਰੇਟਡ ਵਿਕਾਸ ਵਾਤਾਵਰਨ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।

#### Installation

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Required Extensions

ਇਹ VS Code ਐਕਸਟੇਂਸ਼ਨ ਇੰਸਟਾਲ ਕਰੋ:

```bash
# ਕਮਾਂਡ ਲਾਈਨ ਰਾਹੀਂ ਇੰਸਟਾਲ ਕਰੋ
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```
  
ਜਾਂ VS Code ਰਾਹੀਂ ਇੰਸਟਾਲ ਕਰੋ:  
1. VS Code ਖੋਲ੍ਹੋ  
2. Extensions (Ctrl+Shift+X) ਤੇ ਜਾਓ  
3. ਇੰਸਟਾਲ ਕਰੋ:  
   - **Python** (Microsoft)  
   - **Docker** (Microsoft)  
   - **Azure Account** (Microsoft)  
   - **JSON** (Microsoft)  

### 5. Install Python

Python 3.8+ MCP ਸਰਵਰ ਵਿਕਾਸ ਲਈ ਜਰੂਰੀ ਹੈ।

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# ਹੋਮਬ੍ਰੂ ਦੀ ਵਰਤੋਂ ਕਰਨਾ
brew install python@3.11
```

#### Linux

```bash
# ਉਬੁੰਟੂ/ਡੈਬੀਅਨ
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# ਆਰਐਚਈਐਲ/ਸੈਂਟਓਐਸ
sudo dnf install python3.11 python3.11-pip
```

#### Verify Installation

```bash
python --version  # ਪਾਈਥਨ 3.11.x ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ
pip --version      # pip ਵਰਜਨ ਦਿਖਾਉਣਾ ਚਾਹੀਦਾ ਹੈ
```

## 🚀 Project Setup

### 1. Clone the Repository

```bash
# ਮੁੱਖ ਰਿਪੋਜ਼ਟਰੀ ਨੂੰ ਕਲੋਨ ਕਰੋ
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# ਪ੍ਰੋਜੈਕਟ ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਜਾਓ
cd MCP-Server-and-PostgreSQL-Sample-Retail

# ਰਿਪੋਜ਼ਟਰੀ ਦੀ ਢਾਂਚਾ ਦੀ ਜਾਂਚ ਕਰੋ
ls -la
```

### 2. Create Python Virtual Environment

```bash
# ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਬਣਾਓ
python -m venv mcp-env

# ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਚਾਲੂ ਕਰੋ
# ਵਿਂਡੋਜ਼
mcp-env\Scripts\activate

# ਮੈਕਓਐਸ/ਲਿਨਕਸ
source mcp-env/bin/activate

# ਪਿਪ ਅੱਪਗ੍ਰੇਡ ਕਰੋ
python -m pip install --upgrade pip
```

### 3. Install Python Dependencies

```bash
# ਵਿਕਾਸਲਈ ਨਿਵੇਸ਼ ਪੁਸ਼ਟੀ ਕਰੋ
pip install -r requirements.lock.txt

# ਮੁੱਖ ਪੈਕੇਜਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure Resource Deployment

### 1. Understand Resource Requirements

ਸਾਡੇ MCP ਸਰਵਰ ਨੂੰ ਇਹਨਾਂ Azure ਸਰੋਤਾਂ ਦੀ ਲੋੜ ਹੈ:

| **Resource** | **Purpose** | **Estimated Cost** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI ਮਾਡਲ ਹੋਸਟਿੰਗ ਅਤੇ ਪ੍ਰਬੰਧਨ | $10-50/ਮਹੀਨਾ |
| **OpenAI Deployment** | ਟੈਕਸਟ ਇੰਬੈੱਡਿੰਗ ਮਾਡਲ (text-embedding-3-small) | $5-20/ਮਹੀਨਾ |
| **Application Insights** | ਮਾਨੀਟਰਿੰਗ ਅਤੇ ਟੈਲੀਮੇਟਰੀ | $5-15/ਮਹੀਨਾ |
| **Resource Group** | ਸਰੋਤਾਂ ਦਾ ਸੰਗਠਨ | ਮੁਫ਼ਤ |  

### 2. Deploy Azure Resources

#### Option A: Automated Deployment (Recommended)

```bash
# ਇੰਫਰਾਸਟਰੱਕਚਰ ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਜਾਓ
cd infra

# ਵਿਂਡੋਜ਼ - ਪਾਵਰਸ਼ੈੱਲ
./deploy.ps1

# ਮੈਕਓਐਸ/ਲਿਨਕਸ - ਬੈਸ਼
./deploy.sh
```
  
ਡਿਪਲੋਇਮੈਂਟ ਸਕ੍ਰਿਪਟ ਇਹ ਕਰੇਗਾ:  
1. ਇੱਕ ਵੱਖਰੀ ਰਿਸੋਰਸ ਗਰੁੱਪ ਬਣਾਓ  
2. Microsoft Foundry ਸਰੋਤ ਤਾਇਨਾਤ ਕਰੋ  
3. text-embedding-3-small ਮਾਡਲ ਤਾਇਨਾਤ ਕਰੋ  
4. Application Insights ਕਨਫਿਗਰ ਕਰੋ  
5. ਅਥੈਂਟੀਕੇਸ਼ਨ ਲਈ ਸੇਵਾ ਪ੍ਰਿੰਸਿਪਲ ਬਣਾਓ  
6. ਕਨਫਿਗਰੇਸ਼ਨ ਨਾਲ `.env` ਫਾਈਲ ਤਿਆਰ ਕਰੋ  

#### Option B: Manual Deployment

ਜੇ ਤੁਸੀਂ ਮੈਨੂਅਲ ਕੰਟਰੋਲ ਚਾਹੁੰਦੇ ਹੋ ਜਾਂ ਆਟੋਮੈਟਿਕ ਸਕ੍ਰਿਪਟ ਫੇਲ ਹੋ ਜਾਂਦਾ ਹੈ:

```bash
# ਵਿਰੀਏਬਲ ਸੈਟ ਕਰੋ
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# ਸਰੋਤ ਸਮੂਹ ਬਣਾਓ
az group create --name $RESOURCE_GROUP --location $LOCATION

# ਮੁੱਖ ਟੈਂਪਲੇਟ ਤੈਨਾਤ ਕਰੋ
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Verify Azure Deployment

```bash
# ਸਰੋਤ ਗਰੁੱਪ ਜਾਂਚੋ
az group show --name $RESOURCE_GROUP --output table

# ਤੈਅ ਕੀਤੇ ਗਏ ਸਰੋਤ ਸੂਚੀਬੱਧ ਕਰੋ
az resource list --resource-group $RESOURCE_GROUP --output table

# AI ਸੇਵਾ ਦੀ ਜਾਂਚ ਕਰੋ
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Configure Environment Variables

ਡਿਪਲੋਇਮੈਂਟ ਤੋਂ ਬਾਅਦ, ਤੁਹਾਡੇ ਕੋਲ `.env` ਫਾਈਲ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ। ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਇਹ ਸ਼ਾਮਲ ਕਰਦੀ ਹੈ:

```bash
# .env ਫਾਇਲ ਦੇ ਸਮੱਗਰੀ
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# ਡੇਟਾਬੇਸ ਸੰਰਚਨਾ (ਵਿਕਾਸ ਲਈ)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker Environment Setup

### 1. Understand Docker Composition

ਸਾਡਾ ਵਿਕਾਸ ਪਰਿਵੇਸ਼ ਡੋਕਰ ਕੋਮਪੋਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ:

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

### 2. Start the Development Environment

```bash
# ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਸੀਂ ਪ੍ਰਾਜੈਕਟ ਦੇ ਰੂਟ ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ ਹੋ
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# ਸੇਵਾਵਾਂ ਸ਼ੁਰੂ ਕਰੋ
docker-compose up -d

# ਸੇਵਾ ਦੀ ਸਥਿਤੀ ਜਾਂਚੋ
docker-compose ps

# ਲਾਗ ਵੇਖੋ
docker-compose logs -f
```

### 3. Verify Database Setup

```bash
# PostgreSQL ਕੰਟੇਨਰ ਨਾਲ ਜੁੜੋ
docker-compose exec postgres psql -U postgres -d zava

# ਡੇਟਾਬੇਸ ਦੀ ਸੰਰਚਨਾ ਜਾਂਚੋ
\dt retail.*

# ਉਦਾਹਰਨ ਦੇ ਡੇਟਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL ਤੋਂ ਬਾਹਰ ਨਿਕਲੋ
\q
```

### 4. Test MCP Server

```bash
# MCP ਸਰਵਰ ਦੀ ਸਿਹਤ ਦੀ ਜਾਂਚ ਕਰੋ
curl http://localhost:8000/health

# ਬੁਨਿਆਦੀ MCP ਐਂਡਪੌਇੰਟ ਦੀ ਜਾਂਚ ਕਰੋ
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code Configuration

### 1. Configure MCP Integration

VS Code ਲਈ MCP ਕਨਫਿਗਰੇਸ਼ਨ ਬਣਾਓ:

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

### 2. Configure Python Environment

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

### 3. Test VS Code Integration

1. **ਪਰੋਜੈਕਟ VS Code ਵਿੱਚ ਖੋਲ੍ਹੋ**:  
   ```bash
   code .
   ```
  
2. **AI ਚੈਟ ਖੋਲ੍ਹੋ**:  
   - `Ctrl+Shift+P` (Windows/Linux) ਜਾਂ `Cmd+Shift+P` (macOS) ਦਬਾਓ  
   - "AI Chat" ਲਿਖੋ ਅਤੇ "AI Chat: Open Chat" ਚੁਣੋ  

3. **MCP ਸਰਵਰ ਕੁਨੈਕਸ਼ਨ ਟੈਸਟ ਕਰੋ**:  
   - AI ਚੈਟ ਵਿੱਚ `#zava` ਲਿਖੋ ਅਤੇ ਸਰਵਰ ਵਿਚੋਂ ਇੱਕ ਚੁਣੋ  
   - ਪੁੱਛੋ: "ਡਾਟਾਬੇਸ ਵਿੱਚ ਕਿਹੜੀਆਂ ਟੇਬਲਾਂ ਹਨ?"  
   - ਤੁਹਾਨੂੰ ਰਿਟੇਲ ਡਾਟਾਬੇਸ ਟੇਬਲਾਂ ਦੀ ਸੂਚੀ ਮਿਲੇਗੀ  

## ✅ Environment Validation

### 1. Comprehensive System Check

ਆਪਣਾ ਸੈੱਟਅੱਪ ਜाँचਣ ਲਈ ਇਹ ਵੈਧਤਾ ਸਕ੍ਰਿਪਟ ਚਲਾਓ:

```bash
# ਵੈਧਤਾ ਸਕ੍ਰਿਪਟ ਬਣਾਓ
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
    
    # ਪਾਈਥਨ ਵਰਜ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # ਲੋੜੀਂਦੇ ਪੈਕੇਜਾਂ ਦੀ ਜਾਂਚ ਕਰੋ
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # ਡੋਕਰ ਦੀ ਜਾਂਚ ਕਰੋ
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # ਅਜ਼ੂਰ CLI ਦੀ ਜਾਂਚ ਕਰੋ
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # ਵਾਤਾਵਰਣ ਵੈਰੀਏਬਲ ਦੀ ਜਾਂਚ ਕਰੋ
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
    
    # ਡੇਟਾਬੇਸ ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # ਟੈਸਟ ਕਵੈਰੀ
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
    
    # MCP ਸਰਵਰ ਦੀ ਜਾਂਚ ਕਰੋ
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
    
    # ਅਜ਼ੂਰ AI ਸਰਵਿਸ ਦੀ ਜਾਂਚ ਕਰੋ
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # ਜੇਕਰ ਪ੍ਰਮਾਣਪੱਤਰ ਅਵੈਧ ਹਨ ਤਾਂ ਇਹ ਅਸਫਲ ਹੋਵੇਗਾ
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

# ਵੈਧਤਾ ਚਲਾਓ
python validate_setup.py
```

### 2. Manual Validation Checklist

**✅ ਮੂਲ ਟੂਲਸ**  
- [ ] ਡੋਕਰ ਵਰਜ਼ਨ 20.10+ ਇੰਸਟਾਲਡ ਅਤੇ ਚੱਲ ਰਿਹਾ ਹੈ  
- [ ] Azure CLI 2.40+ ਇੰਸਟਾਲਡ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਹੈ  
- [ ] Python 3.8+ ਅਤੇ pip ਇੰਸਟਾਲਡ  
- [ ] Git 2.30+ ਇੰਸਟਾਲਡ  
- [ ] VS Code ਲੋੜੀਂਦੇ ਐਕਸਟੇਂਸ਼ਨਸ ਨਾਲ  

**✅ Azure ਸਰੋਤ**  
- [ ] ਰਿਸੋਰਸ ਗਰੁੱਪ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਇਆ ਗਿਆ ਹੈ  
- [ ] AI Foundry ਪਰੋਜੈਕਟ ਤਾਇਨਾਤ ਹੋਇਆ ਹੈ  
- [ ] OpenAI text-embedding-3-small ਮਾਡਲ ਤਾਇਨਾਤ ਹੋਇਆ ਹੈ  
- [ ] Application Insights ਕਨਫਿਗਰਡ ਹੈ  
- [ ] ਸੇਵਾ ਪ੍ਰਿੰਸਿਪਲ ਸੂਚਿਤ ਅਧਿਕਾਰਾਂ ਨਾਲ ਬਣਾਇਆ ਗਿਆ ਹੈ  

**✅ ਪਰਿਵੇਸ਼ ਕਨਫਿਗਰੇਸ਼ਨ**  
- [ ] `.env` ਫਾਈਲ ਸਾਰੇ ਲੋੜੀਂਦੇ ਵੈਰੀਏਬਲਾਂ ਨਾਲ ਬਣੀ ਹੈ  
- [ ] Azure ਕਰੈਡੈਂਸ਼ਿਅਲਜ਼ ਕੰਮ ਕਰ ਰਹੇ ਹਨ (`az account show` ਨਾਲ ਟੈਸਟ ਕਰੋ)  
- [ ] ਪੋਸਟਗਰੇSQL ਕੰਟੇਨਰ ਚੱਲ ਰਿਹਾ ਹੈ ਅਤੇ ਪ੍ਰਾਪਤਯੋਗ ਹੈ  
- [ ] ਡਾਟਾਬੇਸ ਵਿੱਚ ਨਮੂਨਾ ਡਾਟਾ ਲੋਡ ਕੀਤਾ ਗਿਆ ਹੈ  

**✅ VS Code ਇੰਟੀਗਰੇਸ਼ਨ**  
- [ ] `.vscode/mcp.json` ਕਨਫਿਗਰਡ ਹੈ  
- [ ] Python ਇੰਟਰਪ੍ਰੀਟਰ ਵਰਚੁਅਲ ਪਰਿਵੇਸ਼ ਲਈ ਸੈੱਟ ਹੈ  
- [ ] MCP ਸਰਵਰ AI ਚੈਟ ਵਿੱਚ ਦਿਖਦੇ ਹਨ  
- [ ] AI ਚੈਟ ਰਾਹੀਂ ਟੈਸਟ ਕੁਐਰੀਜ਼ ਏਗਜ਼ੈਕਿਊਟ ਕੀਤੀਆਂ ਜਾ ਸਕਦੀਆਂ ਹਨ  

## 🛠️ Troubleshooting Common Issues

### Docker Issues

**ਮੁੱਦਾ**: ਡੋਕਰ ਕੰਟੇਨਰ ਚਾਲੂ ਨਹੀਂ ਹੁੰਦੇ  
```bash
# ਡੋਕਰ ਸੇਵਾ ਦੀ ਸਥਿਤੀ ਚੈੱਕ ਕਰੋ
docker info

# ਉਪਲਬਧ ਸਰੋਤਾਂ ਦੀ ਜਾਂਚ ਕਰੋ
docker system df

# ਜਰੂਰੀ ਹੋਵੇ ਤਾਂ ਸਾਫ਼-ਸੁਥਰਾ ਕਰੋ
docker system prune -f

# ਡੋਕਰ ਡੈਸਕਟਾਪ ਰੀਸਟਾਰਟ ਕਰੋ (ਵਿੰਡੋਜ਼/ਮੈਕਓਐਸ)
# ਜਾਂ ਡੋਕਰ ਸੇਵਾ ਨੂੰ ਰੀਸਟਾਰਟ ਕਰੋ (ਲਿਨਕਸ)
sudo systemctl restart docker
```

**ਮੁੱਦਾ**: ਪੋਸਟਗਰੇSQL ਕੁਨੈਕਸ਼ਨ ਫੇਲ ਹੁੰਦੀ ਹੈ  
```bash
# ਕੰਟੇਨਰ ਲਾਗ ਜਾਂਚੋ
docker-compose logs postgres

# ਕੰਟੇਨਰ ਸਿਹਤਮੰਦ ਹੈ ਜਾਂ ਨਹੀਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ
docker-compose ps

# ਸਿੱਧੀ ਕੁਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure Deployment Issues

**ਮੁੱਦਾ**: Azure ਡਿਪਲੋਇਮੈਂਟ ਫੇਲ ਹੁੰਦਾ ਹੈ  
```bash
# ਐਜ਼ੂਰ CLI ਪ੍ਰਮਾਣਿਕਤਾ ਦੀ ਜਾਂਚ ਕਰੋ
az account show

# ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਦੀਆਂ ਅਧਿਕਾਰਤਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ
az role assignment list --assignee $(az account show --query user.name -o tsv)

# ਸਰੋਤ ਪ੍ਰਦਾਤਾ ਦੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**ਮੁੱਦਾ**: AI ਸੇਵਾ ਪ੍ਰਮਾਣੀਕਰਨ ਫੇਲ ਹੁੰਦੀ ਹੈ  
```bash
# ਸੇਵਾ ਮੁੱਖੀ ਨੂੰ ਟੈਸਟ ਕਰੋ
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# AI ਸੇਵਾ ਤਿਆਰ ਕਰਨ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python Environment Issues

**ਮੁੱਦਾ**: ਪੈਕੇਜ ਇੰਸਟਾਲੇਸ਼ਨ ਫੇਲ ਹੁੰਦੀ ਹੈ  
```bash
# pip ਅਤੇ setuptools ਨੂੰ ਅੱਪਗਰੇਡ ਕਰੋ
python -m pip install --upgrade pip setuptools wheel

# pip ਕੈਸ਼ ਨੂੰ ਸਾਫ਼ ਕਰੋ
pip cache purge

# ਸਮੱਸਿਆਵਾਂ ਦੀ ਪਛਾਣ ਲਈ ਪੈਕੇਜ ਇੱਕ-ਇੱਕ ਕਰਕੇ ਇੰਸਟਾਲ ਕਰੋ
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**ਮੁੱਦਾ**: VS Code Python ਇੰਟਰਪ੍ਰੀਟਰ ਨਹੀਂ ਲੱਭਦਾ  
```bash
# ਪਾਇਥਨ ਦਭਾਸ਼ਾ ਅਨੁਵਾਦਕ ਦੇ ਰਾਸਤੇ ਦਿਖਾਓ
which python  # ਮੈਕਓਐਸ/ਲਿਨਕਸ
where python  # ਵਿੰਡੋਜ਼

# ਪਹਿਲਾਂ ਵਰਚੁਅਲ ਵਾਤਾਵਰਣ ਅਕਟਿਵ ਕਰੋ
source mcp-env/bin/activate  # ਮੈਕਓਐਸ/ਲਿਨਕਸ
mcp-env\Scripts\activate     # ਵਿੰਡੋਜ਼

# ਫਿਰ VS ਕੋਡ ਖੋਲ੍ਹੋ
code .
```

## 🎯 Key Takeaways

ਇਸ ਲੈਬ ਨੂੰ ਪੂਰਾ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਤੁਹਾਡੇ ਕੋਲ ਹੋਵੇਗਾ:

✅ **ਪੂਰਾ ਵਿਕਾਸ ਪਰਿਵੇਸ਼**: ਸਾਰੇ ਟੂਲ ਇੰਸਟਾਲ ਅਤੇ ਕਨਫਿਗਰਡ  
✅ **Azure ਸਰੋਤ ਤਾਇਨਾਤ**: AI ਸੇਵਾਵਾਂ ਅਤੇ ਸਹਾਇਕ ਬੁਨਿਆਦੀ ਢਾਂਚਾ  
✅ **ਡੋਕਰ ਪਰਿਵੇਸ਼ ਚੱਲ ਰਿਹਾ ਹੈ**: ਪੋਸਟਗਰੇSQL ਅਤੇ MCP ਸਰਵਰ ਕੰਟੇਨਰ  
✅ **VS Code ਇੰਟੀਗਰੇਸ਼ਨ**: MCP ਸਰਵਰ ਕਨਫਿਗਰਡ ਅਤੇ ਪ੍ਰਾਪਤਯੋਗ  
✅ **ਵੈਧਤਾ ਕੀਤਾ ਸੈੱਟਅੱਪ**: ਸਾਰੇ ਭਾਗ ਟੈਸਟ ਕੀਤੇ ਅਤੇ ਮਿਲ ਕੇ ਕੰਮ ਕਰ ਰਹੇ  
✅ **ਟ੍ਰਬਲਸ਼ੂਟਿੰਗ ਗਿਆਨ**: ਆਮ ਸਮੱਸਿਆਵਾਂ ਅਤੇ ਹੱਲ  

## 🚀 What's Next

ਤੁਹਾਡੇ ਪਰਿਵੇਸ਼ ਦੇ ਤਿਆਰ ਹੋਣ ਨਾਲ, جاري ਰੱਖੋ **[Lab 04: Database Design and Schema](../04-Database/README.md)** ਨਾਲ:

- ਰਿਟੇਲ ਡਾਟਾਬੇਸ ਸਕੀਮਾ ਦੀ ਵਿਸਥਾਰ ਨਾਲ ਪੜਚੋਲ ਕਰੋ  
- ਬਹੁ-ਪ੍ਰਯੋਗਤਾ ਡਾਟਾ ਮਾਡਲਿੰਗ ਬਾਰੇ ਸਮਝੋ  
- ਰੋ ਲੈਵਲ ਸੈਕੁਰਿਟੀ ਅਮਲ ਪ੍ਰਭਾਰਿਤ ਕਰੋ  
- ਨਮੂਨਾ ਰਿਟੇਲ ਡਾਟਾ ਨਾਲ ਕੰਮ ਕਰੋ  

## 📚 Additional Resources

### Development Tools
- [Docker Documentation](https://docs.docker.com/) - ਪੂਰਾ ਡੋਕਰ ਹਵਾਲਾ  
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/) - Azure CLI ਕਮਾਂਡਸ  
- [VS Code Documentation](https://code.visualstudio.com/docs) - ਐਡੀਟਰ ਕਨਫਿਗਰੇਸ਼ਨ ਅਤੇ ਐਕਸਟੇਂਸ਼ਨ  

### Azure Services
- [Microsoft Foundry Documentation](https://docs.microsoft.com/azure/ai-foundry/) - AI ਸੇਵਾ ਕਨਫਿਗਰੇਸ਼ਨ  
- [Azure OpenAI Service](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI ਮਾਡਲ ਡਿਪਲੋਇਮੈਂਟ  
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - ਮਾਨੀਟਰਿੰਗ ਸੈਟਅੱਪ  

### Python Development
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html) - ਪਰਿਵੇਸ਼ ਪ੍ਰਬੰਧਨ  
- [AsyncIO Documentation](https://docs.python.org/3/library/asyncio.html) - ਐਸਿੰਕ ਪ੍ਰੋਗ੍ਰਾਮਿੰਗ ਪੈਟਰਨ  
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - ਵੈੱਬ ਫਰੇਮਵਰਕ ਪੈਟਰਨ  

---

**Next**: Environment ready? Continue with [Lab 04: Database Design and Schema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**ਅਸਵੀਕਾਰੋਪਣ**:
ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਅਨੁਵਾਦ ਏਆਈ ਅਨੁਵਾਦ ਸੇਵਾ [Co-op Translator](https://github.com/Azure/co-op-translator) ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਕੀਤਾ ਗਿਆ ਹੈ। ਜਦੋਂ ਕਿ ਅਸੀਂ ਸਹੀਤਾਵਾਂ ਲਈ ਯਤਨਸ਼ੀਲ ਹਾਂ, ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਰੱਖੋ ਕਿ ਸਵੈਚਾਲਿਤ ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਜਾਂ ਅਸਮੱਤਿਆਵਾਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। ਮੂਲ ਦਸਤਾਵੇਜ਼ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਵਿੱਚ ਅਧਿਕਾਰਕ ਸਰੋਤ ਮੰਨਿਆ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ। ਜਰੂਰੀ ਜਾਣਕਾਰੀ ਲਈ, ਪੇਸ਼ੇਵਰ ਮਨੁੱਖੀ ਅਨੁਵਾਦ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਅਸੀਂ ਇਸ ਅਨੁਵਾਦ ਦੇ ਉਪਯੋਗ ਤੋਂ ਪੈਦਾ ਹੋਣ ਵਾਲੀਆਂ ਕਿਸੇ ਵੀ ਗਲਤਫਹਿਮੀਆਂ ਜਾਂ ਗਲਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਜਵਾਬਦੇਹ ਨਹੀਂ ਹਾਂ।
<!-- CO-OP TRANSLATOR DISCLAIMER END -->