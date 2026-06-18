# Thiết Lập Môi Trường

## 🎯 Lab này Bao Gồm Những Gì

Lab thực hành này hướng dẫn bạn cách thiết lập một môi trường phát triển đầy đủ để xây dựng các máy chủ MCP với tích hợp PostgreSQL. Bạn sẽ cấu hình tất cả các công cụ cần thiết, triển khai tài nguyên Azure và kiểm tra thiết lập trước khi tiến hành thực hiện.

## Tổng Quan

Một môi trường phát triển đúng cách là rất quan trọng để phát triển máy chủ MCP thành công. Lab này cung cấp hướng dẫn từng bước để thiết lập Docker, các dịch vụ Azure, công cụ phát triển, đồng thời xác thực rằng mọi thứ hoạt động chính xác cùng nhau.

Kết thúc lab này, bạn sẽ có một môi trường phát triển hoàn chỉnh để xây dựng máy chủ Zava Retail MCP.

## Mục Tiêu Học Tập

Kết thúc lab, bạn sẽ có thể:

- **Cài đặt và cấu hình** tất cả các công cụ phát triển cần thiết
- **Triển khai tài nguyên Azure** cần cho máy chủ MCP
- **Thiết lập container Docker** cho PostgreSQL và máy chủ MCP
- **Xác thực** thiết lập môi trường với các kết nối thử nghiệm
- **Khắc phục sự cố** các vấn đề phổ biến về thiết lập và cấu hình
- **Hiểu** quy trình phát triển và cấu trúc tập tin

## 📋 Kiểm Tra Yêu Cầu Tiền Đề

Trước khi bắt đầu, hãy đảm bảo bạn đã có:

### Kiến Thức Cần Thiết
- Sử dụng dòng lệnh cơ bản (Windows Command Prompt/PowerShell)
- Hiểu biết về biến môi trường
- Quen thuộc với quản lý phiên bản Git
- Khái niệm Docker cơ bản (container, image, volume)

### Yêu Cầu Hệ Thống
- **Hệ Điều Hành**: Windows 10/11, macOS hoặc Linux
- **RAM**: Tối thiểu 8GB (khuyến nghị 16GB)
- **Dung Lượng Lưu Trữ**: Ít nhất 10GB trống
- **Mạng**: Kết nối internet để tải xuống và triển khai Azure

### Yêu Cầu Tài Khoản
- **Đăng ký Azure**: Phiên bản miễn phí là đủ
- **Tài khoản GitHub**: Để truy cập kho mã nguồn
- **Tài khoản Docker Hub**: (Tùy chọn) Để xuất bản image tùy chỉnh

## 🛠️ Cài Đặt Công Cụ

### 1. Cài Docker Desktop

Docker cung cấp môi trường container hóa cho thiết lập phát triển của chúng ta.

#### Cài trên Windows

1. **Tải Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Cài đặt và Cấu hình**:
   - Chạy trình cài đặt với quyền Administrator
   - Kích hoạt tích hợp WSL 2 khi được yêu cầu
   - Khởi động lại máy tính sau khi cài đặt xong

3. **Xác minh cài đặt**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Cài trên macOS

1. **Tải và cài đặt**:
   ```bash
   # Tải xuống từ https://desktop.docker.com/mac/stable/Docker.dmg
   # Hoặc sử dụng Homebrew
   brew install --cask docker
   ```

2. **Khởi động Docker Desktop**:
   - Mở Docker Desktop từ Applications
   - Hoàn tất trình trợ giúp thiết lập ban đầu

3. **Xác minh cài đặt**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Cài trên Linux

1. **Cài Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Đăng xuất và đăng nhập lại để các thay đổi nhóm có hiệu lực
   ```

2. **Cài Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Cài Azure CLI

Azure CLI giúp triển khai và quản lý tài nguyên Azure.

#### Cài trên Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Cài trên macOS

```bash
# Sử dụng Homebrew
brew install azure-cli

# Hoặc sử dụng trình cài đặt
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Cài trên Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Xác minh và Đăng nhập

```bash
# Kiểm tra cài đặt
az version

# Đăng nhập vào Azure
az login

# Đặt đăng ký mặc định (nếu bạn có nhiều đăng ký)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Cài Git

Git cần thiết để sao chép kho mã nguồn và quản lý phiên bản.

#### Trên Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### Trên macOS

```bash
# Git thường được cài sẵn, nhưng bạn có thể cập nhật qua Homebrew
brew install git
```

#### Trên Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Cài VS Code

Visual Studio Code cung cấp môi trường phát triển tích hợp với hỗ trợ MCP.

#### Cài đặt

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Các tiện ích mở rộng cần thiết

Cài đặt các tiện ích mở rộng VS Code sau:

```bash
# Cài đặt qua dòng lệnh
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Hoặc cài qua VS Code:
1. Mở VS Code
2. Vào Extensions (Ctrl+Shift+X)
3. Cài đặt:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Cài Python

Python 3.8+ là yêu cầu phát triển máy chủ MCP.

#### Trên Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### Trên macOS

```bash
# Sử dụng Homebrew
brew install python@3.11
```

#### Trên Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Xác minh cài đặt

```bash
python --version  # Nên hiển thị Python 3.11.x
pip --version      # Nên hiển thị phiên bản pip
```

## 🚀 Thiết Lập Dự Án

### 1. Sao chép kho mã nguồn

```bash
# Sao chép kho chính
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Điều hướng đến thư mục dự án
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Xác minh cấu trúc kho lưu trữ
ls -la
```

### 2. Tạo môi trường ảo Python

```bash
# Tạo môi trường ảo
python -m venv mcp-env

# Kích hoạt môi trường ảo
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Nâng cấp pip
python -m pip install --upgrade pip
```

### 3. Cài đặt các phụ thuộc Python

```bash
# Cài đặt các phụ thuộc phát triển
pip install -r requirements.lock.txt

# Xác minh các gói chính
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Triển Khai Tài Nguyên Azure

### 1. Hiểu các yêu cầu tài nguyên

Máy chủ MCP của chúng ta yêu cầu các tài nguyên Azure sau:

| **Tài nguyên** | **Mục đích** | **Chi phí ước tính** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Lưu trữ và quản lý mô hình AI | $10-50/tháng |
| **OpenAI Deployment** | Mô hình nhúng văn bản (text-embedding-3-small) | $5-20/tháng |
| **Application Insights** | Giám sát và thu thập dữ liệu | $5-15/tháng |
| **Resource Group** | Tổ chức tài nguyên | Miễn phí |

### 2. Triển khai tài nguyên Azure

#### Lựa chọn A: Triển khai tự động (Khuyến nghị)

```bash
# Điều hướng đến thư mục hạ tầng
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Script triển khai sẽ:
1. Tạo nhóm tài nguyên duy nhất
2. Triển khai tài nguyên Microsoft Foundry
3. Triển khai mô hình text-embedding-3-small
4. Cấu hình Application Insights
5. Tạo service principal để xác thực
6. Tạo file `.env` với cấu hình

#### Lựa chọn B: Triển khai thủ công

Nếu bạn muốn kiểm soát thủ công hoặc script tự động thất bại:

```bash
# Thiết lập biến
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Tạo nhóm tài nguyên
az group create --name $RESOURCE_GROUP --location $LOCATION

# Triển khai mẫu chính
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Xác minh triển khai Azure

```bash
# Kiểm tra nhóm tài nguyên
az group show --name $RESOURCE_GROUP --output table

# Liệt kê các tài nguyên đã triển khai
az resource list --resource-group $RESOURCE_GROUP --output table

# Kiểm tra dịch vụ AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Cấu hình biến môi trường

Sau khi triển khai, bạn sẽ có file `.env`. Kiểm tra nội dung bao gồm:

```bash
# Nội dung tệp .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Cấu hình cơ sở dữ liệu (cho phát triển)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Thiết Lập Môi Trường Docker

### 1. Hiểu Docker Composition

Môi trường phát triển sử dụng Docker Compose:

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

### 2. Khởi động môi trường phát triển

```bash
# Đảm bảo bạn đang ở thư mục gốc của dự án
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Khởi động các dịch vụ
docker-compose up -d

# Kiểm tra trạng thái dịch vụ
docker-compose ps

# Xem nhật ký
docker-compose logs -f
```

### 3. Kiểm tra thiết lập database

```bash
# Kết nối tới container PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Kiểm tra cấu trúc cơ sở dữ liệu
\dt retail.*

# Xác minh dữ liệu mẫu
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Thoát PostgreSQL
\q
```

### 4. Thử máy chủ MCP

```bash
# Kiểm tra sức khỏe máy chủ MCP
curl http://localhost:8000/health

# Kiểm tra điểm cuối MCP cơ bản
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Cấu Hình VS Code

### 1. Cấu hình tích hợp MCP

Tạo cấu hình MCP cho VS Code:

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

### 2. Cấu hình môi trường Python

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

### 3. Thử tích hợp VS Code

1. **Mở dự án trong VS Code**:
   ```bash
   code .
   ```

2. **Mở AI Chat**:
   - Nhấn `Ctrl+Shift+P` (Windows/Linux) hoặc `Cmd+Shift+P` (macOS)
   - Gõ "AI Chat" và chọn "AI Chat: Open Chat"

3. **Thử kết nối máy chủ MCP**:
   - Trong AI Chat, gõ `#zava` và chọn một trong các máy chủ cấu hình
   - Hỏi: "Có những bảng nào trong cơ sở dữ liệu?"
   - Bạn sẽ nhận được danh sách các bảng dữ liệu bán lẻ trong database

## ✅ Xác Thực Môi Trường

### 1. Kiểm tra hệ thống tổng quát

Chạy script kiểm tra sau để xác minh thiết lập:

```bash
# Tạo tập lệnh kiểm tra
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
    
    # Kiểm tra phiên bản Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Kiểm tra các gói cần thiết
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Kiểm tra Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Kiểm tra Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Kiểm tra biến môi trường
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
    
    # Kiểm tra kết nối cơ sở dữ liệu
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Thử truy vấn
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
    
    # Kiểm tra máy chủ MCP
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
    
    # Kiểm tra dịch vụ AI Azure
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Điều này sẽ thất bại nếu thông tin xác thực không hợp lệ
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

# Chạy kiểm tra
python validate_setup.py
```

### 2. Danh sách kiểm tra xác thực thủ công

**✅ Công cụ cơ bản**
- [ ] Docker phiên bản 20.10+ được cài và đang chạy
- [ ] Azure CLI 2.40+ được cài và đăng nhập
- [ ] Python 3.8+ có pip được cài
- [ ] Git 2.30+ được cài
- [ ] VS Code với các tiện ích mở rộng cần thiết

**✅ Tài nguyên Azure**
- [ ] Nhóm tài nguyên được tạo thành công
- [ ] Dự án AI Foundry được triển khai
- [ ] Mô hình OpenAI text-embedding-3-small được triển khai
- [ ] Application Insights được cấu hình
- [ ] Service principal được tạo với quyền hợp lệ

**✅ Cấu hình môi trường**
- [ ] File `.env` được tạo với các biến cần thiết
- [ ] Thông tin đăng nhập Azure hoạt động (thử với `az account show`)
- [ ] Container PostgreSQL đang chạy và có thể truy cập
- [ ] Dữ liệu mẫu đã được tải vào database

**✅ Tích hợp VS Code**
- [ ] File `.vscode/mcp.json` được cấu hình
- [ ] Bộ thông dịch Python đặt là môi trường ảo
- [ ] Máy chủ MCP hiển thị trong AI Chat
- [ ] Có thể thực thi truy vấn thử nghiệm qua AI Chat

## 🛠️ Khắc Phục Sự Cố Phổ Biến

### Vấn đề Docker

**Vấn đề**: Docker container không khởi động được  
```bash
# Kiểm tra trạng thái dịch vụ Docker
docker info

# Kiểm tra tài nguyên có sẵn
docker system df

# Dọn dẹp nếu cần
docker system prune -f

# Khởi động lại Docker Desktop (Windows/macOS)
# Hoặc khởi động lại dịch vụ Docker (Linux)
sudo systemctl restart docker
```

**Vấn đề**: Kết nối PostgreSQL thất bại  
```bash
# Kiểm tra nhật ký container
docker-compose logs postgres

# Xác minh container khỏe mạnh
docker-compose ps

# Kiểm tra kết nối trực tiếp
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Vấn đề Triển khai Azure

**Vấn đề**: Triển khai Azure thất bại  
```bash
# Kiểm tra xác thực Azure CLI
az account show

# Xác minh quyền đăng ký
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Kiểm tra việc đăng ký nhà cung cấp tài nguyên
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Vấn đề**: Xác thực dịch vụ AI thất bại  
```bash
# Kiểm tra dịch vụ chính
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Xác minh triển khai dịch vụ AI
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Vấn đề môi trường Python

**Vấn đề**: Cài đặt gói thất bại  
```bash
# Nâng cấp pip và setuptools
python -m pip install --upgrade pip setuptools wheel

# Xóa bộ nhớ đệm pip
pip cache purge

# Cài đặt các gói từng cái một để xác định vấn đề
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Vấn đề**: VS Code không tìm thấy bộ thông dịch Python  
```bash
# Hiển thị đường dẫn trình thông dịch Python
which python  # macOS/Linux
where python  # Windows

# Kích hoạt môi trường ảo trước
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Sau đó mở VS Code
code .
```

## 🎯 Những Điểm Cần Ghi Nhớ Chính

Kết thúc lab này, bạn sẽ có:

✅ **Môi trường phát triển đầy đủ**: Cài đặt và cấu hình tất cả công cụ  
✅ **Tài nguyên Azure được triển khai**: Dịch vụ AI và hạ tầng hỗ trợ  
✅ **Môi trường Docker hoạt động**: Container PostgreSQL và máy chủ MCP  
✅ **Tích hợp VS Code**: Máy chủ MCP được cấu hình và truy cập được  
✅ **Thiết lập được xác thực**: Tất cả thành phần được kiểm tra và hoạt động  
✅ **Kiến thức khắc phục sự cố**: Hiểu rõ các vấn đề phổ biến và cách giải quyết  

## 🚀 Tiếp Theo Là Gì

Khi môi trường đã sẵn sàng, hãy tiếp tục với **[Lab 04: Thiết Kế Cơ Sở Dữ Liệu và Lược Đồ](../04-Database/README.md)** để:

- Khám phá chi tiết lược đồ cơ sở dữ liệu bán lẻ
- Hiểu mô hình hóa dữ liệu đa người thuê
- Tìm hiểu về triển khai Row Level Security
- Làm việc với dữ liệu mẫu bán lẻ

## 📚 Tài Nguyên Bổ Sung

### Công Cụ Phát Triển
- [Tài liệu Docker](https://docs.docker.com/) - Tham khảo Docker đầy đủ
- [Tham khảo Azure CLI](https://docs.microsoft.com/cli/azure/) - Các lệnh Azure CLI
- [Tài liệu VS Code](https://code.visualstudio.com/docs) - Cấu hình và tiện ích mở rộng cho trình soạn thảo

### Dịch vụ Azure
- [Tài liệu Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Cấu hình dịch vụ AI
- [Dịch vụ Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Triển khai mô hình AI
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Cài đặt giám sát

### Phát Triển Python
- [Môi trường ảo Python](https://docs.python.org/3/tutorial/venv.html) - Quản lý môi trường
- [Tài liệu AsyncIO](https://docs.python.org/3/library/asyncio.html) - Mẫu lập trình bất đồng bộ
- [Tài liệu FastAPI](https://fastapi.tiangolo.com/) - Mẫu framework web

---

**Tiếp theo**: Môi trường đã sẵn sàng? Tiếp tục với [Lab 04: Thiết Kế Cơ Sở Dữ Liệu và Lược Đồ](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Tuyên bố miễn trừ trách nhiệm**:
Tài liệu này đã được dịch bằng dịch vụ dịch thuật AI [Co-op Translator](https://github.com/Azure/co-op-translator). Mặc dù chúng tôi cố gắng đảm bảo độ chính xác, xin lưu ý rằng bản dịch tự động có thể chứa lỗi hoặc sai sót. Tài liệu gốc bằng ngôn ngữ gốc nên được coi là nguồn tin chính thức. Đối với thông tin quan trọng, nên sử dụng dịch vụ dịch thuật chuyên nghiệp bởi con người. Chúng tôi không chịu trách nhiệm về bất kỳ hiểu lầm hoặc giải thích sai nào phát sinh từ việc sử dụng bản dịch này.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->