# 환경 설정

## 🎯 이 실습의 내용

이 실습은 PostgreSQL 통합과 함께 MCP 서버를 구축하기 위한 완전한 개발 환경 설정을 안내합니다. 필요한 모든 도구를 구성하고, Azure 리소스를 배포하며, 구현에 앞서 설정을 검증합니다.

## 개요

적절한 개발 환경은 성공적인 MCP 서버 개발에 필수적입니다. 이 실습은 Docker, Azure 서비스, 개발 도구를 단계별로 설정하고 모두 올바르게 작동하는지 검증하는 방법을 제공합니다.

실습이 끝나면 Zava Retail MCP 서버를 구축할 준비가 된 완전한 개발 환경을 갖추게 됩니다.

## 학습 목표

이 실습이 끝나면 다음을 수행할 수 있습니다:

- **필요한 모든 개발 도구를 설치 및 구성**
- **MCP 서버에 필요한 Azure 리소스 배포**
- **PostgreSQL 및 MCP 서버용 Docker 컨테이너 설정**
- **테스트 연결로 환경 설정 검증**
- **일반적인 설정 문제 및 구성 오류 해결**
- **개발 워크플로우와 파일 구조 이해**

## 📋 사전 준비 사항 확인

시작하기 전에 다음을 확인하세요:

### 필수 지식
- 기본 명령줄 사용법 (Windows 명령 프롬프트/PowerShell)
- 환경 변수 이해
- Git 버전 관리 익숙함
- 기본 Docker 개념 (컨테이너, 이미지, 볼륨)

### 시스템 요구사항
- <strong>운영체제</strong>: Windows 10/11, macOS 또는 Linux
- <strong>메모리</strong>: 최소 8GB (권장 16GB)
- **저장 공간**: 최소 10GB 여유 공간
- <strong>네트워크</strong>: 다운로드 및 Azure 배포용 인터넷 연결

### 계정 요구사항
- **Azure 구독**: 무료 티어 가능
- **GitHub 계정**: 저장소 접근용
- **Docker Hub 계정**: (선택) 맞춤 이미지 게시용

## 🛠️ 도구 설치

### 1. Docker Desktop 설치

Docker는 개발 환경에 필요한 컨테이너화된 환경을 제공합니다.

#### Windows 설치

1. **Docker Desktop 다운로드**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **설치 및 구성**:
   - 관리자 권한으로 설치 실행
   - WSL 2 통합 활성화 요청 시 허용
   - 설치 완료 후 컴퓨터 재시작

3. **설치 확인**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS 설치

1. **다운로드 및 설치**:
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg 에서 다운로드하세요
   # 또는 Homebrew를 사용하세요
   brew install --cask docker
   ```

2. **Docker Desktop 시작**:
   - 응용 프로그램에서 Docker Desktop 실행
   - 초기 설정 마법사 완료

3. **설치 확인**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux 설치

1. **Docker 엔진 설치**:
   ```bash
   # 우분투/데비안
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # 그룹 변경 사항을 적용하려면 로그아웃했다가 다시 로그인하세요
   ```

2. **Docker Compose 설치**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI 설치

Azure CLI는 Azure 리소스 배포 및 관리를 지원합니다.

#### Windows 설치

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS 설치

```bash
# Homebrew 사용하기
brew install azure-cli

# 또는 설치 프로그램 사용하기
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux 설치

```bash
# 우분투/데비안
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/센트OS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### 확인 및 인증

```bash
# 설치 확인
az version

# Azure에 로그인
az login

# 기본 구독 설정 (여러 개가 있는 경우)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git 설치

Git은 저장소 복제 및 버전 관리를 위해 필요합니다.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git는 일반적으로 사전 설치되어 있지만 Homebrew를 통해 업데이트할 수 있습니다
brew install git
```

#### Linux

```bash
# 우분투/데비안
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. VS Code 설치

Visual Studio Code는 MCP 지원을 포함한 통합 개발 환경을 제공합니다.

#### 설치

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### 필수 확장 기능

다음 VS Code 확장을 설치하세요:

```bash
# 명령줄을 통해 설치하기
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

또는 VS Code에서 설치:
1. VS Code 열기
2. 확장( Ctrl+Shift+X )으로 이동
3. 설치:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python 설치

Python 3.8 이상이 MCP 서버 개발에 필요합니다.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Homebrew 사용하기
brew install python@3.11
```

#### Linux

```bash
# 우분투/데비안
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/센트OS
sudo dnf install python3.11 python3.11-pip
```

#### 설치 확인

```bash
python --version  # Python 3.11.x를 보여야 합니다
pip --version      # pip 버전을 보여야 합니다
```

## 🚀 프로젝트 설정

### 1. 저장소 클론

```bash
# 메인 저장소 복제
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# 프로젝트 디렉토리로 이동
cd MCP-Server-and-PostgreSQL-Sample-Retail

# 저장소 구조 확인
ls -la
```

### 2. Python 가상 환경 생성

```bash
# 가상 환경 생성
python -m venv mcp-env

# 가상 환경 활성화
# 윈도우
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# pip 업그레이드
python -m pip install --upgrade pip
```

### 3. Python 종속성 설치

```bash
# 개발 의존성 설치
pip install -r requirements.lock.txt

# 주요 패키지 확인
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure 리소스 배포

### 1. 리소스 요구 사항 이해

MCP 서버에 필요한 Azure 리소스:

| <strong>리소스</strong> | <strong>용도</strong> | **예상 비용** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | AI 모델 호스팅 및 관리 | 월 $10-50 |
| **OpenAI 배포** | 텍스트 임베딩 모델 (text-embedding-3-small) | 월 $5-20 |
| **Application Insights** | 모니터링 및 텔레메트리 | 월 $5-15 |
| **리소스 그룹** | 리소스 조직 | 무료 |

### 2. Azure 리소스 배포

#### 옵션 A: 자동 배포 (권장)

```bash
# 인프라 디렉토리로 이동
cd infra

# 윈도우 - 파워셸
./deploy.ps1

# 맥OS/리눅스 - 배쉬
./deploy.sh
```

배포 스크립트는:
1. 고유 리소스 그룹 생성
2. Microsoft Foundry 리소스 배포
3. text-embedding-3-small 모델 배포
4. Application Insights 구성
5. 서비스 프린시펄 인증 생성
6. 구성 포함 `.env` 파일 생성

#### 옵션 B: 수동 배포

수동 제어를 원하거나 자동 스크립트 실패 시:

```bash
# 변수 설정
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# 리소스 그룹 생성
az group create --name $RESOURCE_GROUP --location $LOCATION

# 메인 템플릿 배포
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure 배포 확인

```bash
# 리소스 그룹 확인
az group show --name $RESOURCE_GROUP --output table

# 배포된 리소스 나열
az resource list --resource-group $RESOURCE_GROUP --output table

# AI 서비스 테스트
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. 환경 변수 구성

배포 후 `.env` 파일이 있어야 합니다. 다음을 포함하는지 확인하세요:

```bash
# .env 파일 내용
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# 데이터베이스 구성 (개발용)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker 환경 설정

### 1. Docker 구성 이해

개발 환경에서 Docker Compose를 사용합니다:

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

### 2. 개발 환경 시작

```bash
# 프로젝트 루트 디렉토리에 있는지 확인하세요
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# 서비스를 시작하세요
docker-compose up -d

# 서비스 상태를 확인하세요
docker-compose ps

# 로그를 확인하세요
docker-compose logs -f
```

### 3. 데이터베이스 설정 확인

```bash
# PostgreSQL 컨테이너에 연결
docker-compose exec postgres psql -U postgres -d zava

# 데이터베이스 구조 확인
\dt retail.*

# 샘플 데이터 검증
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL 종료
\q
```

### 4. MCP 서버 테스트

```bash
# MCP 서버 상태 확인
curl http://localhost:8000/health

# 기본 MCP 엔드포인트 테스트
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code 구성

### 1. MCP 통합 구성

VS Code용 MCP 구성 생성:

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

### 2. Python 환경 구성

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

### 3. VS Code 통합 테스트

1. **프로젝트를 VS Code에서 열기**:
   ```bash
   code .
   ```

2. **AI 채팅 열기**:
   - `Ctrl+Shift+P` (Windows/Linux) 또는 `Cmd+Shift+P` (macOS) 누르기
   - "AI Chat" 입력 후 "AI Chat: Open Chat" 선택

3. **MCP 서버 연결 테스트**:
   - AI Chat에서 `#zava` 입력 후 구성된 서버 하나 선택
   - 질문: "데이터베이스에 어떤 테이블이 있나요?"
   - 소매 데이터베이스 테이블 목록 응답을 받아야 합니다

## ✅ 환경 검증

### 1. 종합 시스템 검사

다음 검증 스크립트로 설정을 확인하세요:

```bash
# 검증 스크립트 생성
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
    
    # 파이썬 버전 확인
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # 필수 패키지 확인
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # 도커 확인
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Azure CLI 확인
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # 환경 변수 확인
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
    
    # 데이터베이스 연결 확인
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # 쿼리 테스트
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
    
    # MCP 서버 확인
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
    
    # Azure AI 서비스 확인
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # 자격 증명이 유효하지 않으면 실패합니다
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

# 검증 실행
python validate_setup.py
```

### 2. 수동 검증 체크리스트

**✅ 기본 도구**
- [ ] Docker 20.10 이상 설치 및 실행 중
- [ ] Azure CLI 2.40 이상 설치 및 인증 완료
- [ ] Python 3.8 이상 및 pip 설치 완료
- [ ] Git 2.30 이상 설치 완료
- [ ] 필수 확장 설치된 VS Code

**✅ Azure 리소스**
- [ ] 리소스 그룹 성공적으로 생성됨
- [ ] AI Foundry 프로젝트 배포됨
- [ ] OpenAI text-embedding-3-small 모델 배포됨
- [ ] Application Insights 구성 완료
- [ ] 적절 권한의 서비스 프린시펄 생성됨

**✅ 환경 구성**
- [ ] 필요한 변수 모두 포함한 `.env` 파일 생성됨
- [ ] Azure 인증 정보 정상 작동 (`az account show` 테스트)
- [ ] PostgreSQL 컨테이너 실행 및 접근 가능
- [ ] 샘플 데이터 데이터베이스에 로드됨

**✅ VS Code 통합**
- [ ] `.vscode/mcp.json` 구성됨
- [ ] 가상환경으로 Python 인터프리터 설정됨
- [ ] AI Chat에서 MCP 서버 나타남
- [ ] AI Chat을 통한 테스트 쿼리 실행 가능

## 🛠️ 일반적인 문제 해결

### Docker 문제

<strong>문제</strong>: Docker 컨테이너가 시작되지 않음  
```bash
# Docker 서비스 상태 확인
docker info

# 사용 가능한 리소스 확인
docker system df

# 필요 시 정리
docker system prune -f

# Docker Desktop 재시작 (Windows/macOS)
# 또는 Docker 서비스 재시작 (Linux)
sudo systemctl restart docker
```

<strong>문제</strong>: PostgreSQL 연결 실패  
```bash
# 컨테이너 로그 확인
docker-compose logs postgres

# 컨테이너가 정상인지 확인
docker-compose ps

# 직접 연결 테스트
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure 배포 문제

<strong>문제</strong>: Azure 배포 실패  
```bash
# Azure CLI 인증 확인
az account show

# 구독 권한 확인
az role assignment list --assignee $(az account show --query user.name -o tsv)

# 리소스 공급자 등록 확인
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

<strong>문제</strong>: AI 서비스 인증 실패  
```bash
# 서비스 주체 테스트
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# AI 서비스 배포 확인
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python 환경 문제

<strong>문제</strong>: 패키지 설치 실패  
```bash
# pip와 setuptools를 업그레이드합니다
python -m pip install --upgrade pip setuptools wheel

# pip 캐시를 정리합니다
pip cache purge

# 문제를 찾기 위해 패키지를 하나씩 설치합니다
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

<strong>문제</strong>: VS Code가 Python 인터프리터를 찾지 못함  
```bash
# Python 인터프리터 경로 표시
which python  # macOS/Linux
where python  # Windows

# 먼저 가상 환경 활성화
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# 그런 다음 VS Code를 엽니다
code .
```

## 🎯 주요 내용 정리

이 실습을 완료하면 다음을 갖추게 됩니다:

✅ **완전한 개발 환경**: 모든 도구가 설치 및 구성됨  
✅ **Azure 리소스 배포 완료**: AI 서비스 및 지원 인프라  
✅ **Docker 환경 실행 중**: PostgreSQL 및 MCP 서버 컨테이너  
✅ **VS Code 통합**: MCP 서버 구성 및 접근 가능  
✅ **설정 검증 완료**: 모든 구성 요소가 함께 작동 확인됨  
✅ **문제 해결 지식**: 일반 문제와 해결 방법 숙지  

## 🚀 다음 단계

환경이 준비되었으면, **[실습 04: 데이터베이스 설계 및 스키마](../04-Database/README.md)** 으로 진행하여:

- 소매 데이터베이스 스키마 자세히 탐색
- 멀티 테넌트 데이터 모델링 이해
- 행 수준 보안 구현 학습
- 샘플 소매 데이터 실습

## 📚 추가 자료

### 개발 도구
- [Docker 설명서](https://docs.docker.com/) - Docker 종합 참조
- [Azure CLI 참조](https://docs.microsoft.com/cli/azure/) - Azure CLI 명령어
- [VS Code 문서](https://code.visualstudio.com/docs) - 편집기 설정 및 확장

### Azure 서비스
- [Microsoft Foundry 문서](https://docs.microsoft.com/azure/ai-foundry/) - AI 서비스 구성
- [Azure OpenAI 서비스](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI 모델 배포
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - 모니터링 설정

### Python 개발
- [Python 가상환경](https://docs.python.org/3/tutorial/venv.html) - 환경 관리
- [AsyncIO 문서](https://docs.python.org/3/library/asyncio.html) - 비동기 프로그래밍 패턴
- [FastAPI 문서](https://fastapi.tiangolo.com/) - 웹 프레임워크 패턴

---

<strong>다음</strong>: 환경이 준비되었으면, [실습 04: 데이터베이스 설계 및 스키마](../04-Database/README.md) 진행하세요.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**면책 조항**:
이 문서는 AI 번역 서비스 [Co-op Translator](https://github.com/Azure/co-op-translator)를 사용하여 번역되었습니다. 정확성을 기하기 위해 노력하고 있으나, 자동 번역은 오류나 부정확한 부분이 있을 수 있음을 유의하시기 바랍니다. 원본 문서의 원어본이 권위 있는 자료로 간주되어야 합니다. 중요한 정보의 경우, 전문가의 인간 번역을 권장합니다. 이 번역 사용으로 인해 발생하는 오해나 잘못된 해석에 대해 당사는 책임을 지지 않습니다.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->