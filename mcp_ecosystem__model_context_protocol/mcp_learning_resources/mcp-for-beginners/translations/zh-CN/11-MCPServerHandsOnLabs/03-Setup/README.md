# 环境设置

## 🎯 本实验涵盖内容

本动手实验指导您完成构建集成 PostgreSQL 的 MCP 服务器的完整开发环境设置。您将配置所有必需工具，部署 Azure 资源，并在继续实施前验证设置。

## 概述

合适的开发环境对于成功开发 MCP 服务器至关重要。本实验提供分步骤说明，用于设置 Docker、Azure 服务、开发工具，并验证它们能否协同正常工作。

完成本实验后，您将拥有用于构建 Zava Retail MCP 服务器的完整功能开发环境。

## 学习目标

完成本实验后，您将能够：

- <strong>安装和配置</strong> 所有必需开发工具
- **部署 Azure 资源**，满足 MCP 服务器需求
- **设置 Docker 容器**，包括 PostgreSQL 和 MCP 服务器
- <strong>验证</strong> 环境设置，通过测试连接
- <strong>排查</strong> 常见设置问题及配置错误
- <strong>理解</strong> 开发流程和文件结构

## 📋 先决条件检查

开始之前，请确保您具备：

### 必备知识
- 基本命令行使用（Windows 命令提示符/PowerShell）
- 环境变量理解
- 熟悉 Git 版本控制
- 基本 Docker 概念（容器、镜像、卷）

### 系统要求
- <strong>操作系统</strong>：Windows 10/11、macOS 或 Linux
- <strong>内存</strong>：至少 8GB（推荐 16GB）
- <strong>存储空间</strong>：至少 10GB 可用空间
- <strong>网络</strong>：需要联网以便下载和 Azure 部署

### 账户要求
- **Azure 订阅**：免费层足够
- **GitHub 账户**：用于访问代码仓库
- **Docker Hub 账户**：（可选）用于发布自定义镜像

## 🛠️ 工具安装

### 1. 安装 Docker Desktop

Docker 提供容器化环境支持我们的开发环境。

#### Windows 安装

1. **下载 Docker Desktop**：
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. <strong>安装和配置</strong>：
   - 以管理员身份运行安装程序
   - 提示时启用 WSL 2 集成
   - 安装完成后重启电脑

3. <strong>验证安装</strong>：
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS 安装

1. <strong>下载并安装</strong>：
   ```bash
   # 从 https://desktop.docker.com/mac/stable/Docker.dmg 下载
   # 或者使用 Homebrew
   brew install --cask docker
   ```

2. **启动 Docker Desktop**：
   - 从“应用程序”启动 Docker Desktop
   - 完成初始设置向导

3. <strong>验证安装</strong>：
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux 安装

1. **安装 Docker 引擎**：
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # 注销然后重新登录以使组更改生效
   ```

2. **安装 Docker Compose**：
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. 安装 Azure CLI

Azure CLI 用于 Azure 资源的部署和管理。

#### Windows 安装

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS 安装

```bash
# 使用 Homebrew
brew install azure-cli

# 或者使用安装程序
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux 安装

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### 验证并认证

```bash
# 检查安装
az version

# 登录到 Azure
az login

# 设置默认订阅（如果有多个）
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. 安装 Git

Git 是克隆代码仓库和版本控制必备工具。

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git 通常预装，但你可以通过 Homebrew 更新
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. 安装 VS Code

Visual Studio Code 提供带 MCP 支持的集成开发环境。

#### 安装

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### 必装扩展

安装以下 VS Code 扩展：

```bash
# 通过命令行安装
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

或者通过 VS Code 安装：
1. 打开 VS Code
2. 进入扩展（Ctrl+Shift+X）
3. 安装：
   - **Python**（Microsoft）
   - **Docker**（Microsoft）
   - **Azure Account**（Microsoft）
   - **JSON**（Microsoft）

### 5. 安装 Python

MCP 服务器开发需 Python 3.8 及以上版本。

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

#### 验证安装

```bash
python --version  # 应显示 Python 3.11.x
pip --version      # 应显示 pip 版本
```

## 🚀 项目设置

### 1. 克隆代码仓库

```bash
# 克隆主仓库
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# 进入项目目录
cd MCP-Server-and-PostgreSQL-Sample-Retail

# 验证仓库结构
ls -la
```

### 2. 创建 Python 虚拟环境

```bash
# 创建虚拟环境
python -m venv mcp-env

# 激活虚拟环境
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# 升级 pip
python -m pip install --upgrade pip
```

### 3. 安装 Python 依赖

```bash
# 安装开发依赖
pip install -r requirements.lock.txt

# 验证关键包
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure 资源部署

### 1. 了解资源需求

我们的 MCP 服务器需要以下 Azure 资源：

| <strong>资源</strong> | <strong>用途</strong> | <strong>预估费用</strong> |
|----------|----------|--------------|
| **Microsoft Foundry** | AI 模型托管与管理 | $10-50/月 |
| **OpenAI 部署** | 文本嵌入模型（text-embedding-3-small） | $5-20/月 |
| **Application Insights** | 监控与遥测 | $5-15/月 |
| <strong>资源组</strong> | 资源组织 | 免费 |

### 2. 部署 Azure 资源

#### 方案 A：自动部署（推荐）

```bash
# 导航到基础设施目录
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

部署脚本将执行：
1. 创建唯一资源组
2. 部署 Microsoft Foundry 资源
3. 部署 text-embedding-3-small 模型
4. 配置 Application Insights
5. 创建服务主体进行身份验证
6. 生成带配置信息的 `.env` 文件

#### 方案 B：手动部署

若您希望手动控制或自动脚本失败：

```bash
# 设置变量
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# 创建资源组
az group create --name $RESOURCE_GROUP --location $LOCATION

# 部署主模板
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. 验证 Azure 部署

```bash
# 检查资源组
az group show --name $RESOURCE_GROUP --output table

# 列出已部署的资源
az resource list --resource-group $RESOURCE_GROUP --output table

# 测试 AI 服务
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. 配置环境变量

部署后，会生成 `.env` 文件。请确认其包含：

```bash
# .env 文件内容
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# 数据库配置（用于开发）
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker 环境配置

### 1. 了解 Docker 组合

我们的开发环境使用 Docker Compose：

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

### 2. 启动开发环境

```bash
# 确保你在项目根目录
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# 启动服务
docker-compose up -d

# 检查服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 3. 验证数据库设置

```bash
# 连接到 PostgreSQL 容器
docker-compose exec postgres psql -U postgres -d zava

# 检查数据库结构
\dt retail.*

# 验证示例数据
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# 退出 PostgreSQL
\q
```

### 4. 测试 MCP 服务器

```bash
# 检查MCP服务器健康状况
curl http://localhost:8000/health

# 测试基本的MCP端点
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code 配置

### 1. 配置 MCP 集成

创建 VS Code MCP 配置：

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

### 2. 配置 Python 环境

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

### 3. 测试 VS Code 集成

1. **在 VS Code 中打开项目**：
   ```bash
   code .
   ```

2. **打开 AI Chat**：
   - 按 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（macOS）
   - 输入“AI Chat”并选择“AI Chat: Open Chat”

3. **测试 MCP 服务器连接**：
   - 在 AI Chat 中输入 `#zava` 并选择已配置的服务器之一
   - 询问：“数据库中有哪些表？”
   - 您应收到列出零售数据库中的表的回复

## ✅ 环境验证

### 1. 全面系统检查

运行此验证脚本确认设置正确：

```bash
# 创建验证脚本
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
    
    # 检查Python版本
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # 检查所需的包
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # 检查Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # 检查Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # 检查环境变量
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
    
    # 检查数据库连接
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # 测试查询
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
    
    # 检查MCP服务器
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
    
    # 检查Azure AI服务
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # 如果凭据无效，将会失败
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

# 运行验证
python validate_setup.py
```

### 2. 手动验证清单

**✅ 基础工具**
- [ ] 已安装并运行 Docker 版本 20.10+
- [ ] 安装并认证 Azure CLI 2.40+
- [ ] 安装 Python 3.8+ 及 pip
- [ ] 安装 Git 2.30+
- [ ] VS Code 及必需扩展

**✅ Azure 资源**
- [ ] 资源组创建成功
- [ ] AI Foundry 项目已部署
- [ ] OpenAI text-embedding-3-small 模型已部署
- [ ] Application Insights 已配置
- [ ] 创建了具有适当权限的服务主体

**✅ 环境配置**
- [ ] `.env` 文件含所有必需变量
- [ ] Azure 凭据有效（使用 `az account show` 测试）
- [ ] PostgreSQL 容器运行且可访问
- [ ] 数据库中加载了示例数据

**✅ VS Code 集成**
- [ ] 配置了 `.vscode/mcp.json`
- [ ] Python 解释器指向虚拟环境
- [ ] AI Chat 中显示 MCP 服务器
- [ ] 能通过 AI Chat 执行测试查询

## 🛠️ 常见问题排查

### Docker 问题

<strong>问题</strong>：Docker 容器无法启动
```bash
# 检查 Docker 服务状态
docker info

# 检查可用资源
docker system df

# 如有需要，进行清理
docker system prune -f

# 重启 Docker 桌面版（Windows/macOS）
# 或重启 Docker 服务（Linux）
sudo systemctl restart docker
```

<strong>问题</strong>：PostgreSQL 连接失败
```bash
# 检查容器日志
docker-compose logs postgres

# 验证容器是否健康
docker-compose ps

# 测试直接连接
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure 部署问题

<strong>问题</strong>：Azure 部署失败
```bash
# 检查 Azure CLI 认证
az account show

# 验证订阅权限
az role assignment list --assignee $(az account show --query user.name -o tsv)

# 检查资源提供程序注册
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

<strong>问题</strong>：AI 服务认证失败
```bash
# 测试服务主体
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# 验证AI服务部署
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python 环境问题

<strong>问题</strong>：包安装失败
```bash
# 升级 pip 和 setuptools
python -m pip install --upgrade pip setuptools wheel

# 清除 pip 缓存
pip cache purge

# 逐个安装包以识别问题
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

<strong>问题</strong>：VS Code 找不到 Python 解释器
```bash
# 显示 Python 解释器路径
which python  # macOS/Linux
where python  # Windows

# 先激活虚拟环境
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# 然后打开 VS Code
code .
```

## 🎯 关键收获

完成本实验后，您将拥有：

✅ <strong>完整开发环境</strong>：所有工具安装配置完毕  
✅ **Azure 资源部署**：AI 服务及支持基础设施就绪  
✅ **Docker 环境运行**：PostgreSQL 与 MCP 服务器容器启动  
✅ **VS Code 集成**：MCP 服务器配置可用  
✅ <strong>验证设置</strong>：所有组件测试通过，协同工作  
✅ <strong>排查知识</strong>：常见问题及解决方案掌握  

## 🚀 后续步骤

环境准备完毕后，继续进行 **[实验 04：数据库设计和架构](../04-Database/README.md)**，了解：

- 详细的零售数据库架构
- 多租户数据建模理解
- 行级安全（Row Level Security）实现
- 使用示例零售数据

## 📚 其他资源

### 开发工具
- [Docker 文档](https://docs.docker.com/) - 全面 Docker 参考
- [Azure CLI 参考](https://docs.microsoft.com/cli/azure/) - Azure CLI 命令
- [VS Code 文档](https://code.visualstudio.com/docs) - 编辑器配置与扩展

### Azure 服务
- [Microsoft Foundry 文档](https://docs.microsoft.com/azure/ai-foundry/) - AI 服务配置
- [Azure OpenAI 服务](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI 模型部署
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - 监控设置

### Python 开发
- [Python 虚拟环境](https://docs.python.org/3/tutorial/venv.html) - 环境管理
- [AsyncIO 文档](https://docs.python.org/3/library/asyncio.html) - 异步编程模式
- [FastAPI 文档](https://fastapi.tiangolo.com/) - Web 框架模式

---

<strong>下一步</strong>：环境准备好了？请继续 [实验 04：数据库设计和架构](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**免责声明**：
本文件由 AI 翻译服务 [Co-op Translator](https://github.com/Azure/co-op-translator) 翻译完成。尽管我们力求准确，但请注意，自动翻译可能包含错误或不准确之处。原始语言版文件应视为权威来源。对于重要信息，建议使用专业人工翻译。我们对因使用本翻译而产生的任何误解或误释不承担责任。
<!-- CO-OP TRANSLATOR DISCLAIMER END -->