# Pengaturan Lingkungan

## 🎯 Apa yang Dicakup Lab Ini

Lab praktik ini memandu Anda dalam mengatur lingkungan pengembangan lengkap untuk membangun server MCP dengan integrasi PostgreSQL. Anda akan mengonfigurasi semua alat yang diperlukan, menyebarkan sumber daya Azure, dan memvalidasi pengaturan sebelum melanjutkan dengan implementasi.

## Ikhtisar

Lingkungan pengembangan yang tepat sangat penting untuk keberhasilan pengembangan server MCP. Lab ini menyediakan instruksi langkah demi langkah untuk mengatur Docker, layanan Azure, alat pengembangan, dan memvalidasi bahwa semuanya bekerja dengan baik bersama.

Pada akhir lab ini, Anda akan memiliki lingkungan pengembangan yang berfungsi penuh siap untuk membangun server Zava Retail MCP.

## Tujuan Pembelajaran

Pada akhir lab ini, Anda akan dapat:

- **Menginstal dan mengonfigurasi** semua alat pengembangan yang diperlukan
- **Menyebarkan sumber daya Azure** yang dibutuhkan untuk server MCP
- **Mengatur container Docker** untuk PostgreSQL dan server MCP
- **Memvalidasi** pengaturan lingkungan Anda dengan koneksi uji
- **Memecahkan masalah** masalah umum pengaturan dan konfigurasi
- **Memahami** alur kerja pengembangan dan struktur file

## 📋 Pemeriksaan Prasyarat

Sebelum memulai, pastikan Anda mempunyai:

### Pengetahuan yang Dibutuhkan
- Penggunaan dasar baris perintah (Windows Command Prompt/PowerShell)
- Pemahaman variabel lingkungan
- Familiar dengan kontrol versi Git
- Konsep dasar Docker (container, image, volume)

### Persyaratan Sistem
- **Sistem Operasi**: Windows 10/11, macOS, atau Linux
- **RAM**: Minimal 8GB (disarankan 16GB)
- **Penyimpanan**: Minimal 10GB ruang kosong
- **Jaringan**: Koneksi internet untuk unduhan dan penyebaran Azure

### Persyaratan Akun
- **Langganan Azure**: Tingkat gratis sudah cukup
- **Akun GitHub**: Untuk akses repositori
- **Akun Docker Hub**: (Opsional) Untuk publikasi image kustom

## 🛠️ Instalasi Alat

### 1. Instal Docker Desktop

Docker menyediakan lingkungan container untuk pengaturan pengembangan kita.

#### Instalasi Windows

1. **Unduh Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Instal dan Konfigurasi**:
   - Jalankan installer sebagai Administrator
   - Aktifkan integrasi WSL 2 saat diminta
   - Restart komputer setelah instalasi selesai

3. **Verifikasi Instalasi**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Instalasi macOS

1. **Unduh dan Instal**:
   ```bash
   # Unduh dari https://desktop.docker.com/mac/stable/Docker.dmg
   # Atau gunakan Homebrew
   brew install --cask docker
   ```

2. **Mulai Docker Desktop**:
   - Buka Docker Desktop dari Applications
   - Selesaikan wizard pengaturan awal

3. **Verifikasi Instalasi**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Instalasi Linux

1. **Instal Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Keluar dan masuk kembali agar perubahan grup berlaku
   ```

2. **Instal Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Instal Azure CLI

Azure CLI memungkinkan penyebaran dan manajemen sumber daya Azure.

#### Instalasi Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Instalasi macOS

```bash
# Menggunakan Homebrew
brew install azure-cli

# Atau menggunakan penginstal
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Instalasi Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Verifikasi dan Autentikasi

```bash
# Periksa instalasi
az version

# Masuk ke Azure
az login

# Atur langganan default (jika Anda memiliki beberapa)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Instal Git

Git dibutuhkan untuk mengkloning repositori dan kontrol versi.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git biasanya sudah terpasang, tetapi Anda dapat memperbarui melalui Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Instal VS Code

Visual Studio Code menyediakan lingkungan pengembangan terpadu dengan dukungan MCP.

#### Instalasi

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Ekstensi yang Dibutuhkan

Instal ekstensi VS Code berikut:

```bash
# Pasang melalui baris perintah
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Atau instal melalui VS Code:
1. Buka VS Code
2. Pergi ke Extensions (Ctrl+Shift+X)
3. Instal:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Instal Python

Python 3.8+ diperlukan untuk pengembangan server MCP.

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

#### Verifikasi Instalasi

```bash
python --version  # Harus menampilkan Python 3.11.x
pip --version      # Harus menampilkan versi pip
```

## 🚀 Pengaturan Proyek

### 1. Kloning Repositori

```bash
# Kloning repositori utama
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navigasikan ke direktori proyek
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Verifikasi struktur repositori
ls -la
```

### 2. Buat Lingkungan Virtual Python

```bash
# Buat lingkungan virtual
python -m venv mcp-env

# Aktifkan lingkungan virtual
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Perbarui pip
python -m pip install --upgrade pip
```

### 3. Instal Dependensi Python

```bash
# Pasang dependensi pengembangan
pip install -r requirements.lock.txt

# Verifikasi paket utama
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Penyebaran Sumber Daya Azure

### 1. Pahami Persyaratan Sumber Daya

Server MCP kita memerlukan sumber daya Azure berikut:

| **Sumber Daya** | **Tujuan** | **Perkiraan Biaya** |
|--------------|-------------|-------------------|
| **Microsoft Foundry** | Hosting dan manajemen model AI | $10-50/bulan |
| **OpenAI Deployment** | Model embedding teks (text-embedding-3-small) | $5-20/bulan |
| **Application Insights** | Pemantauan dan telemetri | $5-15/bulan |
| **Resource Group** | Organisasi sumber daya | Gratis |

### 2. Deploy Sumber Daya Azure

#### Opsi A: Penyebaran Otomatis (Disarankan)

```bash
# Navigasi ke direktori infrastruktur
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Script penyebaran akan:
1. Membuat resource group unik
2. Menyebarkan sumber daya Microsoft Foundry
3. Menyebarkan model text-embedding-3-small
4. Mengonfigurasi Application Insights
5. Membuat service principal untuk autentikasi
6. Menghasilkan file `.env` dengan konfigurasi

#### Opsi B: Penyebaran Manual

Jika Anda ingin kontrol manual atau script otomatis gagal:

```bash
# Atur variabel
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Buat grup sumber daya
az group create --name $RESOURCE_GROUP --location $LOCATION

# Terapkan templat utama
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Verifikasi Penyebaran Azure

```bash
# Periksa grup sumber daya
az group show --name $RESOURCE_GROUP --output table

# Daftar sumber daya yang diterapkan
az resource list --resource-group $RESOURCE_GROUP --output table

# Uji layanan AI
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Konfigurasi Variabel Lingkungan

Setelah penyebaran, Anda harus memiliki file `.env`. Pastikan berisi:

```bash
# isi file .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Konfigurasi database (untuk pengembangan)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Pengaturan Lingkungan Docker

### 1. Pahami Komposisi Docker

Lingkungan pengembangan kita menggunakan Docker Compose:

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

### 2. Mulai Lingkungan Pengembangan

```bash
# Pastikan Anda berada di direktori root proyek
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Mulai layanan
docker-compose up -d

# Periksa status layanan
docker-compose ps

# Lihat log
docker-compose logs -f
```

### 3. Verifikasi Pengaturan Database

```bash
# Terhubung ke kontainer PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Periksa struktur basis data
\dt retail.*

# Verifikasi data contoh
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Keluar dari PostgreSQL
\q
```

### 4. Uji Server MCP

```bash
# Periksa kesehatan server MCP
curl http://localhost:8000/health

# Uji endpoint dasar MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Konfigurasi VS Code

### 1. Konfigurasi Integrasi MCP

Buat konfigurasi MCP di VS Code:

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

### 2. Konfigurasi Lingkungan Python

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

1. **Buka proyek di VS Code**:
   ```bash
   code .
   ```

2. **Buka AI Chat**:
   - Tekan `Ctrl+Shift+P` (Windows/Linux) atau `Cmd+Shift+P` (macOS)
   - Ketik "AI Chat" dan pilih "AI Chat: Open Chat"

3. **Uji Koneksi Server MCP**:
   - Di AI Chat, ketik `#zava` dan pilih salah satu server yang dikonfigurasi
   - Tanyakan: "Apa saja tabel yang tersedia di database?"
   - Anda harus menerima respon yang mencantumkan tabel database ritel

## ✅ Validasi Lingkungan

### 1. Pemeriksaan Sistem Menyeluruh

Jalankan skrip validasi ini untuk memeriksa pengaturan Anda:

```bash
# Buat skrip validasi
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
    
    # Periksa versi Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Periksa paket yang dibutuhkan
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Periksa Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Periksa Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Periksa variabel lingkungan
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
    
    # Periksa koneksi database
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Uji query
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
    
    # Periksa server MCP
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
    
    # Periksa layanan Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Ini akan gagal jika kredensial tidak valid
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

# Jalankan validasi
python validate_setup.py
```

### 2. Daftar Periksa Validasi Manual

**✅ Alat Dasar**
- [ ] Versi Docker 20.10+ terpasang dan berjalan
- [ ] Azure CLI 2.40+ terinstal dan sudah autentikasi
- [ ] Python 3.8+ dengan pip terinstal
- [ ] Git 2.30+ terpasang
- [ ] VS Code dengan ekstensi yang diperlukan

**✅ Sumber Daya Azure**
- [ ] Resource group berhasil dibuat
- [ ] Proyek AI Foundry disebarkan
- [ ] Model text-embedding-3-small OpenAI disebarkan
- [ ] Application Insights dikonfigurasi
- [ ] Service principal dibuat dengan izin tepat

**✅ Konfigurasi Lingkungan**
- [ ] File `.env` dibuat dengan semua variabel yang dibutuhkan
- [ ] Kredensial Azure berfungsi (uji dengan `az account show`)
- [ ] Container PostgreSQL berjalan dan dapat diakses
- [ ] Data contoh dimuat di database

**✅ Integrasi VS Code**
- [ ] `.vscode/mcp.json` dikonfigurasi
- [ ] Interpreter Python diatur ke lingkungan virtual
- [ ] Server MCP muncul di AI Chat
- [ ] Dapat menjalankan query tes lewat AI Chat

## 🛠️ Pemecahan Masalah Umum

### Masalah Docker

**Masalah**: Container Docker tidak mau mulai  
```bash
# Periksa status layanan Docker
docker info

# Periksa sumber daya yang tersedia
docker system df

# Bersihkan jika diperlukan
docker system prune -f

# Mulai ulang Docker Desktop (Windows/macOS)
# Atau mulai ulang layanan Docker (Linux)
sudo systemctl restart docker
```
  
**Masalah**: Koneksi PostgreSQL gagal  
```bash
# Periksa log kontainer
docker-compose logs postgres

# Verifikasi kontainer sehat
docker-compose ps

# Uji koneksi langsung
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```
  
### Masalah Penyebaran Azure

**Masalah**: Penyebaran Azure gagal  
```bash
# Periksa otentikasi Azure CLI
az account show

# Verifikasi izin langganan
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Periksa pendaftaran penyedia sumber daya
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```
  
**Masalah**: Autentikasi layanan AI gagal  
```bash
# Uji prinsipal layanan
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Verifikasi penyebaran layanan AI
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```
  
### Masalah Lingkungan Python

**Masalah**: Instalasi paket gagal  
```bash
# Tingkatkan pip dan setuptools
python -m pip install --upgrade pip setuptools wheel

# Bersihkan cache pip
pip cache purge

# Instal paket satu per satu untuk mengidentifikasi masalah
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```
  
**Masalah**: VS Code tidak menemukan interpreter Python  
```bash
# Tampilkan jalur interpreter Python
which python  # macOS/Linux
where python  # Windows

# Aktifkan lingkungan virtual terlebih dahulu
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Kemudian buka VS Code
code .
```
  
## 🎯 Hal Penting yang Dipelajari

Setelah menyelesaikan lab ini, Anda akan mendapatkan:

✅ **Lingkungan Pengembangan Lengkap**: Semua alat terpasang dan dikonfigurasi  
✅ **Sumber Daya Azure Disebarkan**: Layanan AI dan infrastruktur pendukung  
✅ **Lingkungan Docker Berjalan**: Container PostgreSQL dan server MCP  
✅ **Integrasi VS Code**: Server MCP dikonfigurasi dan dapat diakses  
✅ **Pengaturan Terverifikasi**: Semua komponen diuji dan bekerja bersama  
✅ **Pengetahuan Pemecahan Masalah**: Masalah umum dan solusinya  

## 🚀 Apa Selanjutnya

Dengan lingkungan Anda siap, lanjutkan ke **[Lab 04: Perancangan Database dan Skema](../04-Database/README.md)** untuk:

- Mengeksplorasi skema database ritel secara detail
- Memahami pemodelan data multi-tenant
- Mempelajari implementasi Keamanan Tingkat Baris (Row Level Security)
- Bekerja dengan data contoh ritel

## 📚 Sumber Daya Tambahan

### Alat Pengembangan
- [Dokumentasi Docker](https://docs.docker.com/) - Referensi lengkap Docker
- [Referensi Azure CLI](https://docs.microsoft.com/cli/azure/) - Perintah Azure CLI
- [Dokumentasi VS Code](https://code.visualstudio.com/docs) - Konfigurasi editor dan ekstensi

### Layanan Azure
- [Dokumentasi Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Konfigurasi layanan AI
- [Layanan Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Penyebaran model AI
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Pengaturan pemantauan

### Pengembangan Python
- [Lingkungan Virtual Python](https://docs.python.org/3/tutorial/venv.html) - Manajemen lingkungan
- [Dokumentasi AsyncIO](https://docs.python.org/3/library/asyncio.html) - Pola pemrograman Async
- [Dokumentasi FastAPI](https://fastapi.tiangolo.com/) - Pola framework web

---

**Selanjutnya**: Lingkungan siap? Lanjutkan dengan [Lab 04: Perancangan Database dan Skema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidakakuratan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah. Untuk informasi penting, disarankan menggunakan terjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau penafsiran yang keliru yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->