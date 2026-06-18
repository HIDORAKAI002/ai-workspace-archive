# Ortam Kurulumu

## 🎯 Bu Laboratuvarda Neler Öğrenilecek

Bu uygulamalı laboratuvar, PostgreSQL entegrasyonlu MCP sunucuları oluşturmak için tam bir geliştirme ortamı kurmanızı sağlar. Gerekli tüm araçları yapılandıracak, Azure kaynaklarını dağıtacak ve uygulamaya geçmeden önce kurulumunuzu doğrulayacaksınız.

## Genel Bakış

Başarılı MCP sunucu geliştirme için uygun bir geliştirme ortamı çok önemlidir. Bu laboratuvar, Docker, Azure servisleri, geliştirme araçları kurulumunu ve her şeyin doğru şekilde çalıştığını doğrulama adımlarını sağlar.

Laboratuvar sonunda, Zava Retail MCP sunucusunu geliştirmek için tam işlevsel bir geliştirme ortamına sahip olacaksınız.

## Öğrenme Hedefleri

Laboratuvar bitiminde şunları yapabileceksiniz:

- **Gerekli tüm geliştirme araçlarını** kurmak ve yapılandırmak
- **MCP sunucusu için Azure kaynaklarını** dağıtmak
- **PostgreSQL ve MCP sunucusu için Docker konteynerlerini** kurmak
- Ortam kurulumunu test bağlantılarıyla **doğrulamak**
- Yaygın kurulum sorunlarını ve yapılandırma problemlerini **giderme**
- Geliştirme iş akışını ve dosya yapısını **anlamak**

## 📋 Ön Koşullar Kontrolü

Başlamadan önce aşağıdakilere sahip olduğunuzdan emin olun:

### Gerekli Bilgiler
- Temel komut satırı kullanımı (Windows Komut İstemi/PowerShell)
- Ortam değişkenleri anlayışı
- Git versiyon kontrolü bilgisi
- Temel Docker kavramları (konteynerler, imajlar, hacimler)

### Sistem Gereksinimleri
- **İşletim Sistemi**: Windows 10/11, macOS veya Linux
- **RAM**: En az 8GB (16GB önerilir)
- **Depolama**: En az 10GB boş alan
- **Ağ**: İndirmeler ve Azure dağıtımı için internet bağlantısı

### Hesap Gereksinimleri
- **Azure Aboneliği**: Ücretsiz katman yeterli
- **GitHub Hesabı**: Depoya erişim için
- **Docker Hub Hesabı**: (Opsiyonel) Özel imaj yayını için

## 🛠️ Araç Kurulumu

### 1. Docker Desktop Kurulumu

Docker, geliştirme ortamımız için konteyner tabanlı ortam sağlar.

#### Windows Kurulumu

1. **Docker Desktop İndir**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Kur ve Yapılandır**:
   - Kurulumu Yönetici olarak çalıştır
   - İstendiğinde WSL 2 entegrasyonunu etkinleştir
   - Kurulum tamamlanınca bilgisayarı yeniden başlat

3. **Kurulumu Doğrula**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### macOS Kurulumu

1. **İndir ve Kur**:
   ```bash
   # https://desktop.docker.com/mac/stable/Docker.dmg adresinden indir
   # Ya da Homebrew kullan
   brew install --cask docker
   ```

2. **Docker Desktop Başlat**:
   - Uygulamalardan Docker Desktop’ı aç
   - İlk kurulum sihirbazını tamamla

3. **Kurulumu Doğrula**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Linux Kurulumu

1. **Docker Engine Kur**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Grup değişikliklerinin geçerli olması için çıkış yapıp tekrar giriş yapın
   ```

2. **Docker Compose Kur**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Azure CLI Kurulumu

Azure CLI, Azure kaynaklarının dağıtımını ve yönetimini sağlar.

#### Windows Kurulumu

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### macOS Kurulumu

```bash
# Homebrew Kullanarak
brew install azure-cli

# Ya da kurulum programını kullanarak
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Linux Kurulumu

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Doğrulama ve Oturum Açma

```bash
# Kurulumu kontrol et
az version

# Azure'a giriş yap
az login

# Varsayılan aboneliği ayarla (birden fazla varsa)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Git Kurulumu

Depoyu klonlamak ve versiyon kontrolü için Git gereklidir.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git genellikle önceden yüklenmiştir, ancak Homebrew ile güncelleyebilirsiniz
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. VS Code Kurulumu

Visual Studio Code, MCP desteğiyle entegre geliştirme ortamı sağlar.

#### Kurulum

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Gerekli Uzantılar

Aşağıdaki VS Code uzantılarını kurun:

```bash
# Komut satırı üzerinden yükleyin
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

Ya da VS Code üzerinden:
1. VS Code’u açın
2. Uzantılar (Ctrl+Shift+X) bölümüne gidin
3. Şunları yükleyin:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Python Kurulumu

MCP sunucu geliştirme için Python 3.8+ gereklidir.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Homebrew Kullanımı
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Kurulumu Doğrula

```bash
python --version  # Python 3.11.x göstermeli
pip --version      # pip sürümünü göstermeli
```

## 🚀 Proje Kurulumu

### 1. Depoyu Klonla

```bash
# Ana depoyu klonlayın
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Proje dizinine gidin
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Depo yapısını doğrulayın
ls -la
```

### 2. Python Sanal Ortam Oluştur

```bash
# Sanal ortam oluştur
python -m venv mcp-env

# Sanal ortamı etkinleştir
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# pip'i güncelleştir
python -m pip install --upgrade pip
```

### 3. Python Bağımlılıklarını Yükle

```bash
# Geliştirme bağımlılıklarını yükleyin
pip install -r requirements.lock.txt

# Ana paketleri doğrulayın
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Azure Kaynak Dağıtımı

### 1. Kaynak Gereksinimlerini Anlama

MCP sunucumuz için gerekli Azure kaynakları:

| **Kaynak** | **Amaç** | **Tahmini Maliyet** |
|------------|----------|---------------------|
| **Microsoft Foundry** | AI model barındırma ve yönetim | $10-50/ay |
| **OpenAI Dağıtımı** | Metin gömme modeli (text-embedding-3-small) | $5-20/ay |
| **Application Insights** | İzleme ve telemetri | $5-15/ay |
| **Kaynak Grubu** | Kaynak organizasyonu | Ücretsiz |

### 2. Azure Kaynaklarını Dağıt

#### A Seçeneği: Otomatik Dağıtım (Önerilir)

```bash
# Altyapı dizinine gidin
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

Dağıtım scripti:
1. Benzersiz bir kaynak grubu oluşturur
2. Microsoft Foundry kaynaklarını dağıtır
3. text-embedding-3-small modelini dağıtır
4. Application Insights yapılandırır
5. Kimlik doğrulama için servis ilkesi oluşturur
6. Yapılandırmayla `.env` dosyasını oluşturur

#### B Seçeneği: Manuel Dağıtım

Manuel kontrol tercih ederseniz veya otomatik script başarısız olursa:

```bash
# Değişkenleri ayarla
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Kaynak grubunu oluştur
az group create --name $RESOURCE_GROUP --location $LOCATION

# Ana şablonu dağıt
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Azure Dağıtımını Doğrula

```bash
# Kaynak grubunu kontrol et
az group show --name $RESOURCE_GROUP --output table

# Dağıtılan kaynakları listele
az resource list --resource-group $RESOURCE_GROUP --output table

# AI servisini test et
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Ortam Değişkenlerini Yapılandır

Dağıtımdan sonra `.env` dosyanız olmalı. İçerdiğinden emin olun:

```bash
# .env dosyası içeriği
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Veritabanı yapılandırması (geliştirme için)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Docker Ortam Kurulumu

### 1. Docker Kompozisyonunu Anla

Geliştirme ortamımız Docker Compose kullanır:

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

### 2. Geliştirme Ortamını Başlat

```bash
# Proje kök dizininde olduğunuzdan emin olun
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Servisleri başlat
docker-compose up -d

# Servis durumunu kontrol et
docker-compose ps

# Günlükleri görüntüle
docker-compose logs -f
```

### 3. Veritabanı Kurulumunu Doğrula

```bash
# PostgreSQL konteynerine bağlan
docker-compose exec postgres psql -U postgres -d zava

# Veritabanı yapısını kontrol et
\dt retail.*

# Örnek verileri doğrula
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# PostgreSQL'den çık
\q
```

### 4. MCP Sunucusunu Test Et

```bash
# MCP sunucu sağlığını kontrol et
curl http://localhost:8000/health

# Temel MCP uç noktasını test et
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 VS Code Yapılandırması

### 1. MCP Entegrasyonunu Yapılandır

VS Code MCP yapılandırmasını oluştur:

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

### 2. Python Ortamını Ayarla

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

### 3. VS Code Entegrasyonunu Test Et

1. **Projeyi VS Code’da aç**:
   ```bash
   code .
   ```

2. **AI Chat’i aç**:
   - `Ctrl+Shift+P` (Windows/Linux) veya `Cmd+Shift+P` (macOS) tuşlarına basın
   - "AI Chat" yazın ve "AI Chat: Open Chat" seçeneğini seçin

3. **MCP Sunucu Bağlantısını Test Et**:
   - AI Chat’te `#zava` yazın ve yapılandırılmış sunuculardan birini seçin
   - Sorun: "Veritabanında hangi tablolar mevcut?"
   - Perakende veritabanı tablolarını listeleyen yanıt almanız gerekir

## ✅ Ortam Doğrulama

### 1. Kapsamlı Sistem Kontrolü

Kurulumunuzu doğrulamak için bu doğrulama scriptini çalıştırın:

```bash
# Doğrulama betiği oluştur
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
    
    # Python sürümünü kontrol et
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Gerekli paketleri kontrol et
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Docker'ı kontrol et
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Azure CLI'yı kontrol et
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Ortam değişkenlerini kontrol et
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
    
    # Veritabanı bağlantısını kontrol et
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Sorguyu test et
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
    
    # MCP sunucusunu kontrol et
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
    
    # Azure AI servisini kontrol et
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Kimlik bilgileri geçersizse bu başarısız olur
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

# Doğrulamayı çalıştır
python validate_setup.py
```

### 2. Manuel Doğrulama Kontrol Listesi

**✅ Temel Araçlar**
- [ ] Docker sürüm 20.10+ kurulu ve çalışır durumda
- [ ] Azure CLI 2.40+ kurulu ve oturum açılmış
- [ ] Python 3.8+ ve pip kurulu
- [ ] Git 2.30+ kurulu
- [ ] VS Code gerekli uzantılarla kurulu

**✅ Azure Kaynakları**
- [ ] Kaynak grubu başarıyla oluşturuldu
- [ ] AI Foundry projesi dağıtıldı
- [ ] OpenAI text-embedding-3-small modeli dağıtıldı
- [ ] Application Insights yapılandırıldı
- [ ] Servis ilkesi uygun izinlerle oluşturuldu

**✅ Ortam Yapılandırması**
- [ ] `.env` dosyası tüm gerekli değişkenlerle oluşturuldu
- [ ] Azure kimlik bilgileri çalışıyor (az account show ile test edin)
- [ ] PostgreSQL konteyneri çalışıyor ve erişilebilir
- [ ] Örnek veri veritabanına yüklendi

**✅ VS Code Entegrasyonu**
- [ ] `.vscode/mcp.json` yapılandırıldı
- [ ] Python yorumlayıcısı sanal ortama ayarlandı
- [ ] MCP sunucuları AI Chat’te görünüyor
- [ ] AI Chat üzerinden test sorguları çalıştırılabiliyor

## 🛠️ Yaygın Sorun Giderme

### Docker Sorunları

**Problem**: Docker konteynerleri başlamıyor
```bash
# Docker servis durumunu kontrol et
docker info

# Kullanılabilir kaynakları kontrol et
docker system df

# Gerekirse temizle
docker system prune -f

# Docker Desktop'u yeniden başlat (Windows/macOS)
# Veya Docker servisini yeniden başlat (Linux)
sudo systemctl restart docker
```

**Problem**: PostgreSQL bağlantısı başarısız
```bash
# Konteyner günlüklerini kontrol et
docker-compose logs postgres

# Konteynerin sağlıklı olduğunu doğrula
docker-compose ps

# Doğrudan bağlantıyı test et
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Azure Dağıtım Sorunları

**Problem**: Azure dağıtımı başarısız oluyor
```bash
# Azure CLI kimlik doğrulamasını kontrol et
az account show

# Abonelik izinlerini doğrula
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Kaynak sağlayıcı kaydını kontrol et
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Problem**: AI servis kimlik doğrulaması başarısız
```bash
# Hizmet ilkesini test et
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Yapay Zeka hizmet dağıtımını doğrula
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Python Ortamı Sorunları

**Problem**: Paket kurulumu başarısız
```bash
# pip ve setuptools'i yükselt
python -m pip install --upgrade pip setuptools wheel

# pip önbelleğini temizle
pip cache purge

# Sorunları belirlemek için paketleri tek tek yükle
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Problem**: VS Code Python yorumlayıcısını bulamıyor
```bash
# Python yorumlayıcı yollarını göster
which python  # macOS/Linux
where python  # Windows

# Önce sanal ortamı etkinleştir
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Sonra VS Code'u aç
code .
```

## 🎯 Önemli Noktalar

Bu laboratuvarı tamamladıktan sonra:

✅ **Tam Geliştirme Ortamı**: Tüm araçlar kuruldu ve yapılandırıldı  
✅ **Azure Kaynakları Dağıtıldı**: AI servisleri ve altyapı hazır  
✅ **Docker Ortamı Çalışıyor**: PostgreSQL ve MCP sunucu konteynerleri  
✅ **VS Code Entegrasyonu**: MCP sunucuları yapılandırıldı ve erişilebilir  
✅ **Doğrulanmış Kurulum**: Tüm bileşenler test edildi ve birlikte çalışıyor  
✅ **Sorun Giderme Bilgisi**: Yaygın problemler ve çözümler  

## 🚀 Sonraki Adımlar

Ortamınız hazır, devam edin ve **[Laboratuvar 04: Veritabanı Tasarımı ve Şema](../04-Database/README.md)** bölümüne gidin:

- Perakende veritabanı şemasını ayrıntılı inceleyin
- Çok kiracılı veri modellemeyi anlayın
- Satır Seviyesi Güvenlik uygulamasını öğrenin
- Örnek perakende verisi ile çalışın

## 📚 Ek Kaynaklar

### Geliştirme Araçları
- [Docker Dokümantasyonu](https://docs.docker.com/) - Docker referansı
- [Azure CLI Referansı](https://docs.microsoft.com/cli/azure/) - Azure CLI komutları
- [VS Code Dokümantasyonu](https://code.visualstudio.com/docs) - Editör yapılandırma ve uzantılar

### Azure Servisleri
- [Microsoft Foundry Dokümantasyonu](https://docs.microsoft.com/azure/ai-foundry/) - AI servis yapılandırması
- [Azure OpenAI Servisi](https://docs.microsoft.com/azure/cognitive-services/openai/) - AI model dağıtımı
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - İzleme kurulumu

### Python Geliştirme
- [Python Sanal Ortamlar](https://docs.python.org/3/tutorial/venv.html) - Ortam yönetimi
- [AsyncIO Dokümantasyonu](https://docs.python.org/3/library/asyncio.html) - Asenkron programlama desenleri
- [FastAPI Dokümantasyonu](https://fastapi.tiangolo.com/) - Web framework desenleri

---

**Sonraki**: Ortam hazır mı? Devam edin: [Laboratuvar 04: Veritabanı Tasarımı ve Şema](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->