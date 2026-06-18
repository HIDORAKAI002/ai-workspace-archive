# Configuración del Entorno

## 🎯 Qué Cubre Este Laboratorio

Este laboratorio práctico te guía a través de la configuración de un entorno de desarrollo completo para construir servidores MCP con integración de PostgreSQL. Configurarás todas las herramientas necesarias, desplegarás recursos de Azure y validarás tu configuración antes de proceder con la implementación.

## Resumen

Un entorno de desarrollo adecuado es crucial para el éxito del desarrollo del servidor MCP. Este laboratorio proporciona instrucciones paso a paso para configurar Docker, servicios de Azure, herramientas de desarrollo y validar que todo funcione correctamente en conjunto.

Al final de este laboratorio, tendrás un entorno de desarrollo completamente funcional listo para construir el servidor Zava Retail MCP.

## Objetivos de Aprendizaje

Al finalizar este laboratorio, podrás:

- **Instalar y configurar** todas las herramientas de desarrollo requeridas
- **Desplegar recursos de Azure** necesarios para el servidor MCP
- **Configurar contenedores Docker** para PostgreSQL y el servidor MCP
- **Validar** la configuración de tu entorno con conexiones de prueba
- **Solucionar problemas** comunes de configuración y despliegue
- **Comprender** el flujo de trabajo de desarrollo y la estructura de archivos

## 📋 Verificación de Requisitos Previos

Antes de comenzar, asegúrate de contar con:

### Conocimientos Requeridos
- Uso básico de línea de comandos (Windows Command Prompt/PowerShell)
- Comprensión de variables de entorno
- Familiaridad con control de versiones Git
- Conceptos básicos de Docker (contenedores, imágenes, volúmenes)

### Requisitos del Sistema
- **Sistema Operativo**: Windows 10/11, macOS o Linux
- **RAM**: Mínimo 8GB (recomendado 16GB)
- **Almacenamiento**: Al menos 10GB de espacio libre
- **Red**: Conexión a Internet para descargas y despliegue en Azure

### Requisitos de Cuenta
- **Suscripción de Azure**: La capa gratuita es suficiente
- **Cuenta de GitHub**: Para acceso al repositorio
- **Cuenta de Docker Hub**: (Opcional) Para publicar imágenes personalizadas

## 🛠️ Instalación de Herramientas

### 1. Instalar Docker Desktop

Docker provee el entorno containerizado para nuestra configuración de desarrollo.

#### Instalación en Windows

1. **Descargar Docker Desktop**:
   ```cmd
   # Visit https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe
   # Or use Windows Package Manager
   winget install Docker.DockerDesktop
   ```

2. **Instalar y Configurar**:
   - Ejecuta el instalador como Administrador
   - Habilita la integración WSL 2 cuando se te solicite
   - Reinicia tu computadora al finalizar la instalación

3. **Verificar la Instalación**:
   ```cmd
   docker --version
   docker-compose --version
   ```

#### Instalación en macOS

1. **Descargar e Instalar**:
   ```bash
   # Descargar desde https://desktop.docker.com/mac/stable/Docker.dmg
   # O usar Homebrew
   brew install --cask docker
   ```

2. **Iniciar Docker Desktop**:
   - Inicia Docker Desktop desde Aplicaciones
   - Completa el asistente de configuración inicial

3. **Verificar la Instalación**:
   ```bash
   docker --version
   docker-compose --version
   ```

#### Instalación en Linux

1. **Instalar Docker Engine**:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   
   # Cierra sesión y vuelve a iniciarla para que los cambios de grupo tengan efecto
   ```

2. **Instalar Docker Compose**:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### 2. Instalar Azure CLI

Azure CLI permite el despliegue y la gestión de recursos en Azure.

#### Instalación en Windows

```cmd
# Using Windows Package Manager
winget install Microsoft.AzureCLI

# Or download MSI from: https://aka.ms/installazurecliwindows
```

#### Instalación en macOS

```bash
# Usando Homebrew
brew install azure-cli

# O usando el instalador
curl -L https://aka.ms/InstallAzureCli | bash
```

#### Instalación en Linux

```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# RHEL/CentOS
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo dnf install azure-cli
```

#### Verificar y Autenticar

```bash
# Comprobar instalación
az version

# Iniciar sesión en Azure
az login

# Establecer suscripción predeterminada (si tienes varias)
az account list --output table
az account set --subscription "Your-Subscription-Name"
```

### 3. Instalar Git

Git es necesario para clonar el repositorio y control de versiones.

#### Windows

```cmd
# Using Windows Package Manager
winget install Git.Git

# Or download from: https://git-scm.com/download/win
```

#### macOS

```bash
# Git generalmente viene preinstalado, pero puedes actualizarlo mediante Homebrew
brew install git
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git

# RHEL/CentOS
sudo dnf install git
```

### 4. Instalar VS Code

Visual Studio Code provee el entorno de desarrollo integrado con soporte MCP.

#### Instalación

```cmd
# Windows
winget install Microsoft.VisualStudioCode

# macOS
brew install --cask visual-studio-code

# Linux (Ubuntu/Debian)
sudo snap install code --classic
```

#### Extensiones Requeridas

Instala estas extensiones de VS Code:

```bash
# Instalar vía línea de comandos
code --install-extension ms-python.python
code --install-extension ms-vscode.vscode-json
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.azure-account
```

O instálalas desde VS Code:
1. Abre VS Code
2. Ve a Extensiones (Ctrl+Shift+X)
3. Instala:
   - **Python** (Microsoft)
   - **Docker** (Microsoft)
   - **Azure Account** (Microsoft)
   - **JSON** (Microsoft)

### 5. Instalar Python

Python 3.8+ es requerido para el desarrollo de servidores MCP.

#### Windows

```cmd
# Using Windows Package Manager
winget install Python.Python.3.11

# Or download from: https://www.python.org/downloads/
```

#### macOS

```bash
# Usando Homebrew
brew install python@3.11
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install python3.11 python3.11-pip python3.11-venv

# RHEL/CentOS
sudo dnf install python3.11 python3.11-pip
```

#### Verificar Instalación

```bash
python --version  # Debería mostrar Python 3.11.x
pip --version      # Debería mostrar la versión de pip
```

## 🚀 Configuración del Proyecto

### 1. Clonar el Repositorio

```bash
# Clona el repositorio principal
git clone https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.git

# Navega al directorio del proyecto
cd MCP-Server-and-PostgreSQL-Sample-Retail

# Verifica la estructura del repositorio
ls -la
```

### 2. Crear Entorno Virtual de Python

```bash
# Crear entorno virtual
python -m venv mcp-env

# Activar entorno virtual
# Windows
mcp-env\Scripts\activate

# macOS/Linux
source mcp-env/bin/activate

# Actualizar pip
python -m pip install --upgrade pip
```

### 3. Instalar Dependencias de Python

```bash
# Instalar dependencias de desarrollo
pip install -r requirements.lock.txt

# Verificar paquetes clave
pip list | grep fastmcp
pip list | grep asyncpg
pip list | grep azure
```

## ☁️ Despliegue de Recursos en Azure

### 1. Entender los Requisitos de Recursos

Nuestro servidor MCP requiere estos recursos de Azure:

| **Recurso** | **Propósito** | **Costo Estimado** |
|-------------|---------------|--------------------|
| **Microsoft Foundry** | Hospedaje y gestión de modelos AI | $10-50/mes |
| **Despliegue OpenAI** | Modelo de incrustación de texto (text-embedding-3-small) | $5-20/mes |
| **Application Insights** | Monitorización y telemetría | $5-15/mes |
| **Grupo de Recursos** | Organización de recursos | Gratis |

### 2. Desplegar Recursos de Azure

#### Opción A: Despliegue Automatizado (Recomendado)

```bash
# Navegar al directorio de infraestructura
cd infra

# Windows - PowerShell
./deploy.ps1

# macOS/Linux - Bash
./deploy.sh
```

El script de despliegue hará:
1. Crear un grupo de recursos único
2. Desplegar recursos de Microsoft Foundry
3. Desplegar el modelo text-embedding-3-small
4. Configurar Application Insights
5. Crear un principal de servicio para autenticación
6. Generar el archivo `.env` con la configuración

#### Opción B: Despliegue Manual

Si prefieres control manual o el script automático falla:

```bash
# Establecer variables
RESOURCE_GROUP="rg-zava-mcp-$(date +%s)"
LOCATION="westus2"
AI_PROJECT_NAME="zava-ai-project"

# Crear grupo de recursos
az group create --name $RESOURCE_GROUP --location $LOCATION

# Implementar plantilla principal
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file main.bicep \
  --parameters location=$LOCATION \
  --parameters resourcePrefix="zava-mcp"
```

### 3. Verificar el Despliegue en Azure

```bash
# Verificar grupo de recursos
az group show --name $RESOURCE_GROUP --output table

# Listar recursos desplegados
az resource list --resource-group $RESOURCE_GROUP --output table

# Probar servicio de IA
az cognitiveservices account show \
  --name "your-ai-service-name" \
  --resource-group $RESOURCE_GROUP
```

### 4. Configurar Variables de Entorno

Luego del despliegue, deberías tener un archivo `.env`. Verifica que contenga:

```bash
# Contenido del archivo .env
PROJECT_ENDPOINT=https://your-project.cognitiveservices.azure.com/
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
EMBEDDING_MODEL_DEPLOYMENT_NAME=text-embedding-3-small
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
AZURE_TENANT_ID=your-tenant-id
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=your-key;...

# Configuración de la base de datos (para desarrollo)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=zava
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-secure-password
```

## 🐳 Configuración del Entorno Docker

### 1. Entender la Composición Docker

Nuestro entorno de desarrollo usa Docker Compose:

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

### 2. Iniciar el Entorno de Desarrollo

```bash
# Asegúrate de estar en el directorio raíz del proyecto
cd /path/to/MCP-Server-and-PostgreSQL-Sample-Retail

# Iniciar los servicios
docker-compose up -d

# Comprobar el estado del servicio
docker-compose ps

# Ver los registros
docker-compose logs -f
```

### 3. Verificar la Configuración de la Base de Datos

```bash
# Conectar al contenedor de PostgreSQL
docker-compose exec postgres psql -U postgres -d zava

# Revisar la estructura de la base de datos
\dt retail.*

# Verificar datos de ejemplo
SELECT COUNT(*) FROM retail.stores;
SELECT COUNT(*) FROM retail.products;
SELECT COUNT(*) FROM retail.orders;

# Salir de PostgreSQL
\q
```

### 4. Probar el Servidor MCP

```bash
# Verificar la salud del servidor MCP
curl http://localhost:8000/health

# Probar el punto final básico de MCP
curl -X POST http://localhost:8000/mcp \
  -H "Content-Type: application/json" \
  -H "x-rls-user-id: 00000000-0000-0000-0000-000000000000" \
  -d '{"method": "tools/list", "params": {}}'
```

## 🔧 Configuración de VS Code

### 1. Configurar Integración MCP

Crea la configuración MCP en VS Code:

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

### 2. Configurar Entorno Python

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

### 3. Probar Integración en VS Code

1. **Abre el proyecto en VS Code**:
   ```bash
   code .
   ```

2. **Abre AI Chat**:
   - Presiona `Ctrl+Shift+P` (Windows/Linux) o `Cmd+Shift+P` (macOS)
   - Escribe "AI Chat" y selecciona "AI Chat: Open Chat"

3. **Prueba conexión al servidor MCP**:
   - En AI Chat, escribe `#zava` y selecciona uno de los servidores configurados
   - Pregunta: "¿Qué tablas están disponibles en la base de datos?"
   - Deberías recibir una respuesta listando las tablas de la base de datos retail

## ✅ Validación del Entorno

### 1. Comprobación Completa del Sistema

Ejecuta este script de validación para verificar tu configuración:

```bash
# Crear script de validación
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
    
    # Verificar versión de Python
    python_version = sys.version_info
    results['python'] = {
        'status': 'pass' if python_version >= (3, 8) else 'fail',
        'version': f"{python_version.major}.{python_version.minor}.{python_version.micro}",
        'required': '3.8+'
    }
    
    # Verificar paquetes necesarios
    required_packages = ['fastmcp', 'asyncpg', 'azure-ai-projects']
    for package in required_packages:
        try:
            __import__(package)
            results[f'package_{package}'] = {'status': 'pass'}
        except ImportError:
            results[f'package_{package}'] = {'status': 'fail', 'error': 'Not installed'}
    
    # Verificar Docker
    try:
        result = subprocess.run(['docker', '--version'], capture_output=True, text=True)
        results['docker'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.strip() if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['docker'] = {'status': 'fail', 'error': 'Docker not found'}
    
    # Verificar Azure CLI
    try:
        result = subprocess.run(['az', '--version'], capture_output=True, text=True)
        results['azure_cli'] = {
            'status': 'pass' if result.returncode == 0 else 'fail',
            'version': result.stdout.split('\n')[0] if result.returncode == 0 else 'Not available'
        }
    except FileNotFoundError:
        results['azure_cli'] = {'status': 'fail', 'error': 'Azure CLI not found'}
    
    # Verificar variables de entorno
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
    
    # Verificar conexión a la base de datos
    try:
        conn = await asyncpg.connect(
            host=os.getenv('POSTGRES_HOST', 'localhost'),
            port=int(os.getenv('POSTGRES_PORT', 5432)),
            database=os.getenv('POSTGRES_DB', 'zava'),
            user=os.getenv('POSTGRES_USER', 'postgres'),
            password=os.getenv('POSTGRES_PASSWORD', 'secure_password')
        )
        
        # Probar consulta
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
    
    # Verificar servidor MCP
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
    
    # Verificar servicio Azure AI
    try:
        credential = DefaultAzureCredential()
        project_client = AIProjectClient(
            endpoint=os.getenv('PROJECT_ENDPOINT'),
            credential=credential
        )
        
        # Esto fallará si las credenciales son inválidas
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

# Ejecutar validación
python validate_setup.py
```

### 2. Lista de Validación Manual

**✅ Herramientas Básicas**
- [ ] Docker versión 20.10+ instalado y funcionando
- [ ] Azure CLI 2.40+ instalado y autenticado
- [ ] Python 3.8+ con pip instalado
- [ ] Git 2.30+ instalado
- [ ] VS Code con extensiones requeridas

**✅ Recursos Azure**
- [ ] Grupo de recursos creado exitosamente
- [ ] Proyecto AI Foundry desplegado
- [ ] Modelo OpenAI text-embedding-3-small desplegado
- [ ] Application Insights configurado
- [ ] Principal de servicio creado con permisos adecuados

**✅ Configuración del Entorno**
- [ ] Archivo `.env` creado con todas las variables requeridas
- [ ] Credenciales de Azure funcionando (prueba con `az account show`)
- [ ] Contenedor PostgreSQL corriendo y accesible
- [ ] Datos de ejemplo cargados en la base de datos

**✅ Integración VS Code**
- [ ] `.vscode/mcp.json` configurado
- [ ] Intérprete Python configurado al entorno virtual
- [ ] Servidores MCP aparecen en AI Chat
- [ ] Puede ejecutar consultas de prueba a través de AI Chat

## 🛠️ Solución de Problemas Comunes

### Problemas con Docker

**Problema**: Los contenedores Docker no se inician  
```bash
# Comprobar el estado del servicio Docker
docker info

# Comprobar recursos disponibles
docker system df

# Limpiar si es necesario
docker system prune -f

# Reiniciar Docker Desktop (Windows/macOS)
# O reiniciar el servicio Docker (Linux)
sudo systemctl restart docker
```

**Problema**: La conexión a PostgreSQL falla  
```bash
# Verificar los registros del contenedor
docker-compose logs postgres

# Verificar que el contenedor esté saludable
docker-compose ps

# Probar la conexión directa
docker-compose exec postgres psql -U postgres -d zava -c "SELECT 1;"
```

### Problemas en Despliegue Azure

**Problema**: El despliegue en Azure falla  
```bash
# Verificar la autenticación de Azure CLI
az account show

# Verificar permisos de suscripción
az role assignment list --assignee $(az account show --query user.name -o tsv)

# Comprobar el registro del proveedor de recursos
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.Insights
```

**Problema**: Fallo en autenticación del servicio AI  
```bash
# Probar el principal del servicio
az login --service-principal \
  --username $AZURE_CLIENT_ID \
  --password $AZURE_CLIENT_SECRET \
  --tenant $AZURE_TENANT_ID

# Verificar el despliegue del servicio de IA
az cognitiveservices account list --query "[].{Name:name,Kind:kind,Location:location}"
```

### Problemas en Entorno Python

**Problema**: La instalación de paquetes falla  
```bash
# Actualizar pip y setuptools
python -m pip install --upgrade pip setuptools wheel

# Limpiar la caché de pip
pip cache purge

# Instalar paquetes uno por uno para identificar problemas
pip install fastmcp
pip install asyncpg
pip install azure-ai-projects
```

**Problema**: VS Code no encuentra el intérprete Python  
```bash
# Mostrar rutas del intérprete de Python
which python  # macOS/Linux
where python  # Windows

# Primero activa el entorno virtual
source mcp-env/bin/activate  # macOS/Linux
mcp-env\Scripts\activate     # Windows

# Luego abre VS Code
code .
```

## 🎯 Puntos Clave

Después de completar este laboratorio, deberías contar con:

✅ **Entorno de Desarrollo Completo**: Todas las herramientas instaladas y configuradas  
✅ **Recursos Azure Desplegados**: Servicios AI e infraestructura de soporte  
✅ **Entorno Docker Funcionando**: Contenedores de PostgreSQL y servidor MCP  
✅ **Integración en VS Code**: Servidores MCP configurados y accesibles  
✅ **Configuración Validada**: Todos los componentes probados y trabajando en conjunto  
✅ **Conocimiento para Solucionar Problemas**: Problemas comunes y sus soluciones  

## 🚀 Qué Sigue

Con tu entorno listo, continúa con **[Laboratorio 04: Diseño y Esquema de Base de Datos](../04-Database/README.md)** para:

- Explorar el esquema de la base de datos retail en detalle
- Entender el modelado de datos multi-tenant
- Aprender sobre la implementación de Seguridad a Nivel de Fila
- Trabajar con datos de ejemplo retail

## 📚 Recursos Adicionales

### Herramientas de Desarrollo
- [Documentación Docker](https://docs.docker.com/) - Referencia completa de Docker
- [Referencia Azure CLI](https://docs.microsoft.com/cli/azure/) - Comandos Azure CLI
- [Documentación VS Code](https://code.visualstudio.com/docs) - Configuración del editor y extensiones

### Servicios Azure
- [Documentación Microsoft Foundry](https://docs.microsoft.com/azure/ai-foundry/) - Configuración del servicio AI
- [Servicio Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Despliegue de modelos AI
- [Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview) - Configuración de monitorización

### Desarrollo Python
- [Entornos Virtuales Python](https://docs.python.org/3/tutorial/venv.html) - Gestión de entornos
- [Documentación AsyncIO](https://docs.python.org/3/library/asyncio.html) - Patrones de programación asíncrona
- [Documentación FastAPI](https://fastapi.tiangolo.com/) - Patrones de desarrollo web

---

**Siguiente**: ¿Entorno listo? Continúa con [Laboratorio 04: Diseño y Esquema de Base de Datos](../04-Database/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->