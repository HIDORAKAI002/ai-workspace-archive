# Persediaan Persekitaran

## 🎯 Apa Yang Diliputi Oleh Makmal Ini

Makmal praktikal ini membimbing anda melalui proses menyedia dan memasang persekitaran pembangunan lengkap untuk membina pelayan MCP dengan integrasi PostgreSQL. Anda akan mengkonfigurasi semua alat yang diperlukan, menerapkan sumber Azure, dan mengesahkan persediaan anda sebelum meneruskan dengan pelaksanaan.

## Gambaran Keseluruhan

Persekitaran pembangunan yang betul adalah penting untuk pembangunan pelayan MCP yang berjaya. Makmal ini menyediakan arahan langkah demi langkah untuk memasang Docker, perkhidmatan Azure, alat pembangunan, dan mengesahkan bahawa semuanya berfungsi dengan betul bersama-sama.

Pada akhir makmal ini, anda akan mempunyai persekitaran pembangunan yang berfungsi sepenuhnya sedia untuk membina pelayan Zava Retail MCP.

## Objektif Pembelajaran

Pada akhir makmal ini, anda akan dapat:

- **Pasang dan konfigurasi** semua alat pembangunan yang diperlukan
- **Terapkan sumber Azure** yang diperlukan untuk pelayan MCP
- **Pasang bekas Docker** untuk PostgreSQL dan pelayan MCP
- **Sahkan** persediaan persekitaran anda dengan sambungan ujian
- **Atasi masalah** isu persediaan umum dan masalah konfigurasi
- **Fahami** aliran kerja pembangunan dan struktur fail

## 📋 Pemeriksaan Prasyarat

Sebelum memulakan, pastikan anda mempunyai:

### Pengetahuan Diperlukan
- Penggunaan asas baris arahan (Windows Command Prompt/PowerShell)
- Kefahaman mengenai pemboleh ubah persekitaran
- Kebiasaan dengan kawalan versi Git
- Konsep asas Docker (bekas, imej, volum)

### Keperluan Sistem
- **Sistem Operasi**: Windows 10/11, macOS, atau Linux
- **RAM**: Minimum 8GB (16GB disyorkan)
- **Storan**: Sekurang-kurangnya 10GB ruang kosong
- **Rangkaian**: Sambungan internet untuk muat turun dan penerapan Azure

### Keperluan Akaun
- **Langganan Azure**: Tahap percuma mencukupi
- **Akaun GitHub**: Untuk capaian repositori
- **Akaun Docker Hub**: (Pilihan) Untuk penerbitan imej tersuai

## 🛠️ Pemasangan Alat

### 1. Pasang Docker Desktop

Docker menyediakan persekitaran berbekas untuk persediaan pembangunan kita.

#### Pemasangan Windows

1. **Muat Turun Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Pasang dan Konfigurasi**:
   - Jalankan pemasang sebagai Pentadbir
   - Aktifkan integrasi WSL 2 apabila diminta
   - Mulakan semula komputer anda apabila pemasangan selesai

3. **Sahkan Pemasangan**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Pemasangan macOS

1. **Muat Turun dan Pasang**:
   ```bash
   # Muat turun dari https://desktop.docker.com/mac/stable/Docker.dmg
   # Atau gunakan Homebrew
   brew install --cask docker
   ```

2. **Mulakan Docker Desktop**:
   - Lancarkan Docker Desktop dari Applications
   - Lengkapkan wizard persediaan awal

3. **Sahkan Pemasangan**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Pemasangan Linux

1. **Pasang Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Log keluar dan masuk semula supaya perubahan kumpulan berkuat kuasa
   ```

2. **Pasang Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Pasang Azure CLI

Azure CLI membolehkan penerapan dan pengurusan sumber Azure.

#### Pemasangan Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Pemasangan macOS

```bash
# Menggunakan Homebrew
brew install azure-cli

# Atau menggunakan pemasang
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Pemasangan Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Sahkan dan Autentikasi

```bash
# Semak pemasangan
az version

# Log masuk ke Azure
az login

# Tetapkan langganan default (jika anda mempunyai lebih daripada satu)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Pasang Git

Git diperlukan untuk mengklon repositori dan kawalan versi.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git biasanya dipasang terlebih dahulu, tetapi anda boleh mengemas kini melalui Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Pasang VS Code

Visual Studio Code menyediakan persekitaran pembangunan terintegrasi dengan sokongan MCP.

#### Pemasangan

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Sambungan Diperlukan

Pasang sambungan VS Code berikut:

```bash
# Pasang melalui baris arahan
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Atau pasang melalui VS Code:
1. Buka VS Code
2. Pergi ke Extensions (Ctrl+Shift+X)
3. Pasang:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Pasang Python

Python 3.8+ diperlukan untuk pembangunan pelayan MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Menggunakan Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Sahkan Pemasangan

```bash
python --version  # Patut menunjukkan Python 3.11.x
pip --version      # Patut menunjukkan versi pip
```

## 🚀 Persediaan Projek

### 1. Klon Repositori

```bash
# Klon repositori utama
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navigasi ke direktori projek
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Sahkan struktur repositori
ls -la
```

### 2. Cipta Persekitaran Maya Python

```bash
# Cipta persekitaran maya
python -m venv mcp-env

# Aktifkan persekitaran maya
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Naik taraf pip
python -m pip install --upgrade pip
```

### 3. Pasang Kebergantungan Python

```bash
# Pasang kebergantungan pembangunan
pip install -r requirements.lock.txt

# Sahkan pakej utama
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Penerapan Sumber Azure

### 1. Fahami Keperluan Sumber

Pelayan MCP kami memerlukan sumber Azure berikut:

| **Sumber** | **Tujuan** | **Anggaran Kos** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Penghosan dan pengurusan model AI | $10-50/bulan |
| **OpenAI Deployment** | Model penjanaan teks (text-embedding-3-small) | $5-20/bulan |
| **Application Insights** | Pemantauan dan telemetri | $5-15/bulan |
| **Resource Group** | Pengorganisasian sumber | Percuma |

### 2. Terapkan Sumber Azure

#### Pilihan A: Penerapan Automatik (Disyorkan)

```bash
# Navigasi ke direktori infrastruktur
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Skrip penerapan akan:
1. Cipta kumpulan sumber unik
2. Terapkan sumber Microsoft Foundry
3. Terapkan model text-embedding-3-small
4. Konfigurasi Application Insights
5. Cipta prinsipal perkhidmatan untuk autentikasi
6. Hasilkan fail `.env` dengan konfigurasi

#### Pilihan B: Penerapan Manual

Jika anda lebih suka kawalan manual atau skrip automatik gagal:

```bash
# Tetapkan pemboleh ubah
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Buat kumpulan sumber
az group create --name $RESOURCE_GROUP --location $LOCATION

# Sebarkan templat utama
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Sahkan Penerapan Azure

```bash
# Semak kumpulan sumber
az group show --name $RESOURCE_GROUP --output table

# Senaraikan sumber yang telah dikerahkan
az resource list --resource-group $RESOURCE_GROUP --output table

# Uji perkhidmatan AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Konfigurasi Pemboleh Ubah Persekitaran

Selepas penerapan, anda sepatutnya mempunyai fail `.env`. Sahkan ia mengandungi:

```bash
# kandungan fail .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Konfigurasi pangkalan data (untuk pembangunan)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Persediaan Persekitaran Docker

### 1. Fahami Penyusunan Docker

Persekitaran pembangunan kami menggunakan Docker Compose:

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

### 2. Mulakan Persekitaran Pembangunan

```bash
# Pastikan anda berada di direktori akar projek
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Mulakan perkhidmatan
docker-compose up -d

# Semak status perkhidmatan
docker-compose ps

# Lihat log
docker-compose logs -f
```

### 3. Sahkan Persediaan Pangkalan Data

```bash
# Sambung ke bekas PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Semak struktur pangkalan data
\dt retail.*

# Sahkan data sampel
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Keluar PostgreSQL
\q
```

### 4. Uji Pelayan MCP

```bash
# Periksa kesihatan pelayan MCP
curl http://localhost:8000/health

# Uji titik akhir MCP asas
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Konfigurasi VS Code

### 1. Konfigurasikan Integrasi MCP

Cipta konfigurasi MCP untuk VS Code:

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

### 2. Konfigurasikan Persekitaran Python

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

### 3. Uji Integrasi VS Code

1. **Buka projek di VS Code**:
   ```bash
   code .
   ```

2. **Buka AI Chat**:
   - Tekan `Ctrl+Shift+P` (Windows/Linux) atau `Cmd+Shift+P` (macOS)
   - Taip "AI Chat" dan pilih "AI Chat: Open Chat"

3. **Uji Sambungan Pelayan MCP**:
   - Dalam AI Chat, taip `#zava` dan pilih salah satu pelayan yang dikonfigurasi
   - Tanya: "Apa jadual yang tersedia dalam pangkalan data?"
   - Anda patut menerima respons yang menyenaraikan jadual pangkalan data runcit

## ✅ Pengesahan Persekitaran

### 1. Pemeriksaan Sistem Komprehensif

Jalankan skrip pengesahan ini untuk mengesahkan persediaan anda:

```bash
# Buat skrip pengesahan
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
    
    # Semak versi Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Semak pakej yang diperlukan
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Semak Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Semak Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Semak pembolehubah persekitaran
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
    
    # Semak sambungan pangkalan data
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Ujian pertanyaan
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
    
    # Semak pelayan MCP
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
    
    # Semak perkhidmatan Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Ini akan gagal jika kelayakan tidak sah
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

# Jalankan pengesahan
python validate_setup.py
```

### 2. Senarai Semak Pengesahan Manual

**✅ Alat Asas**
- [ ] Versi Docker 20.10+ dipasang dan berjalan
- [ ] Azure CLI 2.40+ dipasang dan disahkan
- [ ] Python 3.8+ dengan pip dipasang
- [ ] Git 2.30+ dipasang
- [ ] VS Code dengan sambungan diperlukan

**✅ Sumber Azure**
- [ ] Kumpulan sumber berjaya dicipta
- [ ] Projek AI Foundry diterapkan
- [ ] Model OpenAI text-embedding-3-small diterapkan
- [ ] Application Insights dikonfigurasi
- [ ] Prinsipal perkhidmatan dibuat dengan kebenaran betul

**✅ Konfigurasi Persekitaran**
- [ ] Fail `.env` dicipta dengan semua pemboleh ubah diperlukan
- [ ] Kredensial Azure berfungsi (uji dengan `az account show`)
- [ ] Bekas PostgreSQL sedang berjalan dan boleh diakses
- [ ] Data sampel dimuatkan dalam pangkalan data

**✅ Integrasi VS Code**
- [ ] `.vscode/mcp.json` dikonfigurasi
- [ ] Penafsir Python ditetapkan ke persekitaran maya
- [ ] Pelayan MCP muncul dalam AI Chat
- [ ] Boleh melaksanakan pertanyaan ujian melalui AI Chat

## 🛠️ Penyelesaian Masalah Isu Biasa

### Isu Docker

**Masalah**: Bekas Docker tidak bermula
```bash
# Periksa status perkhidmatan Docker
docker info

# Periksa sumber yang tersedia
docker system df

# Bersihkan jika perlu
docker system prune -f

# Mulakan semula Docker Desktop (Windows/macOS)
# Atau mulakan semula perkhidmatan Docker (Linux)
sudo systemctl restart docker
```

**Masalah**: Sambungan PostgreSQL gagal
```bash
# Semak log bekas
docker-compose logs postgres

# Sahkan bekas dalam keadaan sihat
docker-compose ps

# Uji sambungan terus
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Isu Penerapan Azure

**Masalah**: Penerapan Azure gagal
```bash
# Semak pengesahan Azure CLI
az account show

# Sahkan kebenaran langganan
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Semak pendaftaran pembekal sumber
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Masalah**: Autentikasi perkhidmatan AI gagal
```bash
# Uji prinsipal perkhidmatan
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Sahkan penyebaran perkhidmatan AI
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Isu Persekitaran Python

**Masalah**: Pemasangan pakej gagal
```bash
# Tingkatkan pip dan setuptools
python -m pip install --upgrade pip setuptools wheel

# Bersihkan cache pip
pip cache purge

# Pasang pakej satu persatu untuk mengenal pasti masalah
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Masalah**: VS Code tidak dapat mencari penafsir Python
```bash
# Tunjukkan laluan penginterpretasi Python
which python  # macOS/Linux
where python  # Windows

# Aktifkan persekitaran maya terlebih dahulu
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Kemudian buka VS Code
code .
```

## 🎯 Fokus Utama

Selepas menyelesaikan makmal ini, anda sepatutnya mempunyai:

✅ **Persekitaran Pembangunan Lengkap**: Semua alat dipasang dan dikonfigurasi  
✅ **Sumber Azure Diterapkan**: Perkhidmatan AI dan infrastruktur sokongan  
✅ **Persekitaran Docker Berjalan**: Bekas PostgreSQL dan pelayan MCP  
✅ **Integrasi VS Code**: Pelayan MCP dikonfigurasi dan boleh diakses  
✅ **Persediaan Disahkan**: Semua komponen diuji dan berfungsi bersama  
✅ **Pengetahuan Penyelesaian Masalah**: Isu dan penyelesaian biasa  

## 🚀 Apa Seterusnya

Dengan persekitaran anda sedia, teruskan ke **[Makmal 04: Reka Bentuk Pangkalan Data dan Skema](../04-Database/README.md)** untuk:

- Menjelajah skema pangkalan data runcit dengan terperinci
- Memahami pemodelan data berbilang penyewa
- Belajar mengenai pelaksanaan Keselamatan Tahap Baris
- Bekerja dengan data runcit sampel

## 📚 Sumber Tambahan

### Alat Pembangunan
- [Dokumentasi Docker](https://docs.docker.com/) - Rujukan lengkap Docker
- [Rujukan Azure CLI](https://docs.microsoft.com/cli/azure/) - Arahan Azure CLI
- [Dokumentasi VS Code](https://code.visualstudio.com/docs) - Konfigurasi editor dan sambungan

### Perkhidmatan Azure
- [Dokumentasi Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Konfigurasi perkhidmatan AI
- [Perkhidmatan Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Penerapan model AI
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Persediaan pemantauan

### Pembangunan Python
- [Persekitaran Maya Python](https://docs.python.org/3/tutorial/venv.html) - Pengurusan persekitaran
- [Dokumentasi AsyncIO](https://docs.python.org/3/library/asyncio.html) - Corak pengaturcaraan Async
- [Dokumentasi FastAPI](https://fastapi.tiangolo.com/) - Corak rangka kerja web

---

**Seterusnya**: Persekitaran sudah sedia? Teruskan dengan [Makmal 04: Reka Bentuk Pangkalan Data dan Skema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidaktepatan. Dokumen asal dalam bahasa asalnya harus dianggap sebagai sumber yang sahih. Untuk maklumat penting, terjemahan oleh manusia profesional adalah disyorkan. Kami tidak bertanggungjawab terhadap sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->