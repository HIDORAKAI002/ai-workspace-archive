# 環境設置

## 🎯 本實驗涵蓋內容

本實驗室將引導您完成建置整合 PostgreSQL 的 MCP 伺服器開發環境的完整設定。您將配置所有必要的工具、部署 Azure 資源，並驗證設定是否正確，然後再進行實作。

## 概述

適當的開發環境對於成功開發 MCP 伺服器至關重要。本實驗室提供逐步指引，協助您設定 Docker、Azure 服務、開發工具，並驗證所有元件是否協同運作。

完成本實驗後，您將擁有一個完整可用的開發環境，準備建置 Zava Retail MCP 伺服器。

## 學習目標

完成本實驗後，您將能：

- <strong>安裝及配置</strong> 所有必要的開發工具
- **部署 Azure 資源**，以支援 MCP 伺服器
- **設定 Docker 容器**，包含 PostgreSQL 與 MCP 伺服器
- <strong>驗證</strong> 環境設定的連線測試
- <strong>排解</strong> 常見設定問題及配置錯誤
- <strong>理解</strong> 開發工作流程與檔案結構

## 📋 先決條件檢查

開始前，請確認您已具備：

### 必備知識
- 基本指令列操作（Windows 命令提示字元/PowerShell）
- 環境變數基礎認知
- 熟悉 Git 版本控制
- 基本 Docker 概念（容器、映像檔、卷）

### 系統需求
- <strong>作業系統</strong>：Windows 10/11、macOS 或 Linux
- <strong>記憶體</strong>：至少 8GB（建議 16GB）
- <strong>儲存空間</strong>：至少 10GB 可用空間
- <strong>網路</strong>：具備網際網路連線以下載及部署 Azure 資源

### 帳號需求
- **Azure 訂閱**：免費方案足夠
- **GitHub 帳號**：存取原始碼庫
- **Docker Hub 帳號**：（選用）發布自訂映像檔

## 🛠️ 工具安裝

### 1. 安裝 Docker Desktop

Docker 提供容器化開發環境。

#### Windows 安裝

1. **下載 Docker Desktop**：
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. <strong>安裝與設定</strong>：
   - 以系統管理員權限執行安裝程式
   - 被提示時開啟 WSL 2 整合功能
   - 安裝完成後重新啟動電腦

3. <strong>驗證安裝成功</strong>：
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS 安裝

1. <strong>下載並安裝</strong>：
   ```bash
   # 從 https://desktop.docker.com/mac/stable/Docker.dmg 下載
   # 或者使用 Homebrew
   brew install --cask docker
   ```

2. **啟動 Docker Desktop**：
   - 從「應用程式」啟動 Docker Desktop
   - 完成初始設定精靈

3. <strong>驗證安裝成功</strong>：
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux 安裝

1. **安裝 Docker 引擎**：
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # 登出然後重新登入以使群組更改生效
   ```

2. **安裝 Docker Compose**：
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. 安裝 Azure CLI

Azure CLI 用於部署及管理 Azure 資源。

#### Windows 安裝

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS 安裝

```bash
# 使用 Homebrew
brew install azure-cli

# 或使用安裝程式
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux 安裝

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### 驗證與登入

```bash
# 檢查安裝
az version

# 登入 Azure
az login

# 設定預設訂閱（如果你有多個）
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. 安裝 Git

Git 是原始碼庫克隆與版本控制所需。

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git 通常已預先安裝，但您可以透過 Homebrew 更新
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. 安裝 VS Code

Visual Studio Code 提供具備 MCP 支援的整合開發環境。

#### 安裝

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### 必要擴充套件

安裝以下 VS Code 擴充套件：

```bash
# 通過命令行安裝
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

或透過 VS Code 安裝：
1. 開啟 VS Code
2. 前往擴充功能 (Ctrl+Shift+X)
3. 安裝：
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. 安裝 Python

MCP 伺服器開發需 Python 3.8+。

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# 使用 Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### 驗證安裝

```bash
python --version  # 應顯示 Python 3.11.x
pip --version      # 應顯示 pip 版本
```

## 🚀 專案設定

### 1. 克隆原始碼庫

```bash
# 複製主要資源庫
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# 移動到專案目錄
cd MCP-Server-and-PostgreSQL-Sample-Retail

# 驗證資源庫結構
ls -la
```

### 2. 建立 Python 虛擬環境

```bash
# 建立虛擬環境
python -m venv mcp-env

# 啟動虛擬環境
# Windows 作業系統
mcp-env\Scripts\activate

# macOS/Linux 作業系統
source mcp-env/bin/activate

# 升級 pip 工具
python -m pip install --upgrade pip
```

### 3. 安裝 Python 相依套件

```bash
# 安裝開發依賴項
pip install -r requirements.lock.txt

# 驗證主要套件
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure 資源部署

### 1. 瞭解資源需求

MCP 伺服器需要以下 Azure 資源：

| <strong>資源</strong> | <strong>用途</strong> | <strong>預估費用</strong> |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI 模型託管及管理 | $10-50/月 |
| **OpenAI 部署** | 文字嵌入模型 (text-embedding-3-small) | $5-20/月 |
| **Application Insights** | 監控與遙測 | $5-15/月 |
| <strong>資源群組</strong> | 資源組織 | 免費 |

### 2. 部署 Azure 資源

#### 選項 A：自動化部署（推薦）

```bash
# 導航到基礎設施目錄
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

部署腳本包含：
1. 建立唯一資源群組
2. 部署 Microsoft Foundry 資源
3. 部署 text-embedding-3-small 模型
4. 配置 Application Insights
5. 建立服務主體以用於驗證
6. 生成含設定的 `.env` 檔案

#### 選項 B：手動部署

若您偏好手動操作或自動腳本失敗：

```bash
# 設定變數
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# 建立資源群組
az group create --name $RESOURCE_GROUP --location $LOCATION

# 部署主範本
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. 驗證 Azure 部署結果

```bash
# 檢查資源組
az group show --name $RESOURCE_GROUP --output table

# 列出已部署資源
az resource list --resource-group $RESOURCE_GROUP --output table

# 測試AI服務
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. 設定環境變數

部署完成後，您應有一份 `.env` 檔案。請確認該檔案包含：

```bash
# .env 文件內容
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# 數據庫配置（用於開發）
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker 環境設定

### 1. 瞭解 Docker 組態

開發環境採用 Docker Compose：

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

### 2. 啟動開發環境

```bash
# 確保你位於專案根目錄
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# 啟動服務
docker-compose up -d

# 檢查服務狀態
docker-compose ps

# 查看日誌
docker-compose logs -f
```

### 3. 驗證資料庫設定

```bash
# 連接到 PostgreSQL 容器
docker-compose exec postgres psql -U postgres -d zava

# 檢查資料庫結構
\dt retail.*

# 驗證範本資料
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# 離開 PostgreSQL
\q
```

### 4. 測試 MCP 伺服器

```bash
# 檢查 MCP 伺服器狀態
curl http://localhost:8000/health

# 測試基本 MCP 端點
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code 配置

### 1. 設定 MCP 整合

建立 VS Code MCP 設定：

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

### 2. 配置 Python 環境

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

### 3. 測試 VS Code 整合

1. **在 VS Code 開啟專案：**
   ```bash
   code .
   ```

2. **開啟 AI Chat：**
   - 按 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（macOS）
   - 輸入「AI Chat」並選擇「AI Chat: Open Chat」

3. **測試 MCP 伺服器連線：**
   - 在 AI Chat 中輸入 `#zava` 並選擇已配置的伺服器
   - 詢問：「資料庫中有哪些表格？」
   - 您應會收到列出零售資料庫表格的回答

## ✅ 環境驗證

### 1. 全面系統檢查

執行此驗證腳本來確認設定：

```bash
# 建立驗證腳本
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
    
    # 檢查 Python 版本
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # 檢查所需套件
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # 檢查 Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # 檢查 Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # 檢查環境變數
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
    
    # 檢查資料庫連線
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # 測試查詢
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
    
    # 檢查 MCP 伺服器
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
    
    # 檢查 Azure AI 服務
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # 如果憑證無效將會失敗
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

# 執行驗證
python validate_setup.py
```

### 2. 手動驗證清單

**✅ 基本工具**
- [ ] 已安裝及啟動 Docker 版本 20.10 以上
- [ ] 已安裝並登入 Azure CLI 2.40 以上
- [ ] 已安裝 Python 3.8 以上及 pip
- [ ] 已安裝 Git 2.30 以上
- [ ] VS Code 並安裝必要擴充套件

**✅ Azure 資源**
- [ ] 成功建立資源群組
- [ ] 成功部署 AI Foundry 專案
- [ ] 成功部署 OpenAI text-embedding-3-small 模型
- [ ] Application Insights 配置完成
- [ ] 服務主體建立並具備權限

**✅ 環境配置**
- [ ] 建立 .env 檔並配置完整變數
- [ ] Azure 認證運作正常（用 `az account show` 測試）
- [ ] PostgreSQL 容器運行中且可存取
- [ ] 資料庫載入樣本資料

**✅ VS Code 整合**
- [ ] 配置 .vscode/mcp.json
- [ ] Python 解譯器設為虛擬環境
- [ ] MCP 伺服器於 AI Chat 列出
- [ ] 能透過 AI Chat 執行測試查詢

## 🛠️ 常見問題排解

### Docker 問題

<strong>問題</strong>：Docker 容器無法啟動  
```bash
# 檢查 Docker 服務狀態
docker info

# 檢查可用資源
docker system df

# 如有需要，清理
docker system prune -f

# 重新啟動 Docker Desktop（Windows/macOS）
# 或重新啟動 Docker 服務（Linux）
sudo systemctl restart docker
```
  
<strong>問題</strong>：PostgreSQL 連線失敗  
```bash
# 檢查容器日誌
docker-compose logs postgres

# 驗證容器是否健康
docker-compose ps

# 測試直接連線
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Azure 部署問題

<strong>問題</strong>：Azure 部署失敗  
```bash
# 檢查 Azure CLI 認證
az account show

# 驗證訂閱權限
az role assignment list --assignee $(az account show --query user.name -o tsv)

# 檢查資源提供者註冊
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
<strong>問題</strong>：AI 服務驗證失敗  
```bash
# 測試服務主體
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# 驗證人工智能服務部署
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Python 環境問題

<strong>問題</strong>：套件安裝失敗  
```bash
# 升級 pip 同 setuptools
python -m pip install --upgrade pip setuptools wheel

# 清除 pip 快取
pip cache purge

# 一個一個安裝套件以識別問題
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
<strong>問題</strong>：VS Code 找不到 Python 解譯器  
```bash
# 顯示 Python 解譯器路徑
which python  # macOS/Linux
where python  # Windows

# 先啟動虛擬環境
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# 然後開啟 VS Code
code .
```
  
## 🎯 主要重點回顧

完成本實驗後，您應已：

✅ <strong>完整開發環境</strong>：所有工具均已安裝及配置完成  
✅ **Azure 資源已部署**：AI 服務及支援架構就緒  
✅ **Docker 環境運行中**：PostgreSQL 與 MCP 伺服器容器皆啟動  
✅ **VS Code 整合完成**：MCP 伺服器配置並可存取  
✅ <strong>環境驗證無誤</strong>：各組件測試並順利協同  
✅ <strong>排錯知識</strong>：掌握常見問題與解法  

## 🚀 後續步驟

環境準備就緒後，繼續進行 **[實驗 04：資料庫設計與架構](../04-Database/README.md)**，內容包含：

- 深入探索零售資料庫結構
- 理解多租戶資料建模
- 學習列水平安全性實作
- 實作零售範例資料

## 📚 額外資源

### 開發工具
- [Docker 文件](https://docs.docker.com/) - 完整 Docker 參考資料
- [Azure CLI 參考](https://docs.microsoft.com/cli/azure/) - Azure CLI 指令說明
- [VS Code 文件](https://code.visualstudio.com/docs) - 編輯器設定與擴充套件

### Azure 服務
- [Microsoft Foundry 文件](https://docs.microsoft.com/azure/ai-foundry/) - AI 服務配置說明
- [Azure OpenAI 服務](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI 模型部署
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - 監控設定說明

### Python 開發
- [Python 虛擬環境](https://docs.python.org/3/tutorial/venv.html) - 環境管理教學
- [AsyncIO 文件](https://docs.python.org/3/library/asyncio.html) - 非同步程式設計範例
- [FastAPI 文件](https://fastapi.tiangolo.com/) - Web 框架教學

---

<strong>下一步</strong>：環境已準備好？請繼續 [實驗 04：資料庫設計與架構](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免責聲明**：
本文件使用 AI 翻譯服務 [Co-op Translator](https://github.com/Azure/co-op-translator) 進行翻譯。雖然我們力求準確，但請注意，自動翻譯可能包含錯誤或不準確之處。原始文件的母語版本應被視為權威來源。對於重要資訊，建議尋求專業人工翻譯。我們不對因使用本翻譯而引起的任何誤解或曲解承擔責任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->