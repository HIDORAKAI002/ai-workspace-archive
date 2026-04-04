# Configuración de Clientes Host MCP Populares

Esta guía cubre cómo configurar y usar servidores MCP con aplicaciones host de IA populares. Cada host tiene su propio enfoque de configuración, pero una vez configurados, todos se comunican con los servidores MCP usando el protocolo estandarizado.

## ¿Qué es un Host MCP?

Un **Host MCP** es una aplicación de IA que puede conectarse a servidores MCP para ampliar sus capacidades. Piénsalo como la "interfaz" con la que interactúan los usuarios, mientras que los servidores MCP proporcionan las herramientas y datos del "backend".

```mermaid
flowchart LR
    User[👤 Usuario] --> Host[🖥️ Host MCP]
    Host --> S1[MCP Servidor A]
    Host --> S2[MCP Servidor B]
    Host --> S3[MCP Servidor C]
    
    subgraph "Hosts Populares"
        H1[Claude Escritorio]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Requisitos Previos

- Un servidor MCP al que conectarse (ver [Módulo 3.1 - Primer Servidor](../01-first-server/README.md))
- La aplicación host instalada en tu sistema
- Familiaridad básica con archivos de configuración JSON

---

## 1. Claude Desktop

**Claude Desktop** es la aplicación de escritorio oficial de Anthropic que soporta MCP de forma nativa.

### Instalación

1. Descarga Claude Desktop desde [claude.ai/download](https://claude.ai/download)
2. Instala y accede con tu cuenta de Anthropic

### Configuración

Claude Desktop usa un archivo de configuración JSON para definir servidores MCP.

**Ubicación del archivo de configuración:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Ejemplo de configuración:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Opciones de Configuración

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `command` | El ejecutable a ejecutar | `"python"`, `"node"`, `"npx"` |
| `args` | Argumentos de línea de comando | `["-m", "my_server"]` |
| `env` | Variables de entorno | `{"API_KEY": "xxx"}` |
| `cwd` | Directorio de trabajo | `"/path/to/server"` |

### Probando Tu Configuración

1. Guarda el archivo de configuración
2. Reinicia completamente Claude Desktop (ciérralo y ábrelo de nuevo)
3. Abre una conversación nueva
4. Busca el icono 🔌 que indica servidores conectados
5. Prueba pedirle a Claude que use una de tus herramientas

### Solución de Problemas en Claude Desktop

**Servidor no aparece:**
- Verifica la sintaxis del archivo de configuración con un validador JSON
- Asegúrate de que la ruta del comando sea correcta
- Revisa los registros de Claude Desktop: Ayuda → Mostrar Registros

**Servidor se cae al iniciar:**
- Prueba tu servidor manualmente primero en terminal
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de que todas las dependencias estén instaladas

---

## 2. VS Code con GitHub Copilot

VS Code soporta MCP mediante las extensiones GitHub Copilot Chat.

### Requisitos Previos

1. Tener VS Code versión 1.99 o superior instalada
2. Tener instalada la extensión GitHub Copilot
3. Tener instalada la extensión GitHub Copilot Chat

### Configuración

VS Code usa `.vscode/mcp.json` en tu espacio de trabajo o configuración de usuario.

**Configuración de espacio de trabajo** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**Configuración de usuario** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### Usando MCP en VS Code

1. Abre el panel Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Escribe `@` para ver las herramientas MCP disponibles
3. Usa lenguaje natural para invocar herramientas: "Calcular 25 * 48 usando la calculadora"

### Solución de Problemas en VS Code

**Servidores MCP no cargan:**
- Revisa el panel de Salida → "MCP" para logs de error
- Recarga la ventana: Ctrl+Shift+P → "Developer: Reload Window"
- Verifica que el servidor funcione de forma independiente primero

---

## 3. Cursor

**Cursor** es un editor de código orientado a IA con soporte MCP incorporado.

### Instalación

1. Descarga Cursor desde [cursor.sh](https://cursor.sh)
2. Instala y accede

### Configuración

Cursor usa un formato similar de configuración a Claude Desktop.

**Ubicación del archivo de configuración:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Ejemplo de configuración:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Usando MCP en Cursor

1. Abre el chat de IA de Cursor (Ctrl+L / Cmd+L)
2. Las herramientas MCP aparecen automáticamente en las sugerencias
3. Pide a la IA que realice tareas usando servidores conectados

---

## 4. Cline (Basado en Terminal)

**Cline** es un cliente MCP basado en terminal, ideal para flujos de trabajo por línea de comandos.

### Instalación

```bash
npm install -g @anthropic/cline
```

### Configuración

Cline usa variables de entorno y argumentos de línea de comando.

**Usando variables de entorno:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Usando argumentos de línea de comando:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Archivo de configuración** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Usando Cline

```bash
# Iniciar una sesión interactiva
cline

# Consulta única con MCP
cline "Calculate the square root of 144 using the calculator"

# Listar las herramientas disponibles
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** es otro editor de código potenciado por IA con soporte MCP.

### Instalación

1. Descarga Windsurf desde [codeium.com/windsurf](https://codeium.com/windsurf)
2. Instala y crea una cuenta

### Configuración

La configuración de Windsurf se administra a través de la interfaz de ajustes:

1. Abre Configuración (Ctrl+, / Cmd+,)
2. Busca "MCP"
3. Haz clic en "Editar en settings.json"

**Ejemplo de configuración:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## Comparación de Tipos de Transporte

Diferentes hosts soportan diferentes mecanismos de transporte:

| Host | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (entrada/salida estándar): Mejor para servidores locales iniciados por el host  
**SSE/HTTP**: Mejor para servidores remotos o servidores compartidos entre varios clientes

---

## Solución Común de Problemas

### El servidor no inicia

1. **Prueba el servidor manualmente primero:**
   ```bash
   # Para Python
   python -m your_server_module
   
   # Para Node.js
   node /path/to/server/index.js
   ```

2. **Revisa la ruta del comando:**
   - Usa rutas absolutas cuando sea posible
   - Asegúrate de que el ejecutable esté en tu PATH

3. **Verifica las dependencias:**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### El servidor se conecta pero las herramientas no funcionan

1. **Revisa los logs del servidor** - La mayoría de los hosts tienen opciones de registro  
2. **Verifica el registro de herramientas** - Usa MCP Inspector para probar  
3. **Revisa permisos** - Algunas herramientas necesitan acceso a archivos/red

### Variables de entorno no pasadas

- Algunos hosts sanitizan las variables de entorno  
- Usa el campo de configuración `env` explícitamente  
- Evita datos sensibles en archivos de configuración (usa gestión de secretos)

---

## Mejores Prácticas de Seguridad

1. **Nunca cometas claves API** en archivos de configuración  
2. **Usa variables de entorno** para datos sensibles  
3. **Limita permisos del servidor** solo a lo necesario  
4. **Revisa el código del servidor** antes de darle acceso a tu sistema  
5. **Usa listas blancas** para acceso a sistema de archivos y red

---

## Qué Sigue

- [3.13 - Depuración con MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Crea tu primer servidor MCP](../01-first-server/README.md)
- [Módulo 5 - Temas Avanzados](../../05-AdvancedTopics/README.md)

---

## Recursos Adicionales

- [Documentación MCP de Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [Extensión MCP para VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [Especificación MCP - Transportes](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Registro Oficial de Servidores MCP](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:  
Este documento ha sido traducido utilizando el servicio de traducción por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por lograr precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda la traducción profesional realizada por un humano. No nos hacemos responsables por malentendidos o interpretaciones erróneas derivadas del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->