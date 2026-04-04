# Weather MCP Server

Este es un servidor MCP de ejemplo en Python que implementa herramientas de clima con respuestas simuladas. Se puede usar como base para tu propio servidor MCP. Incluye las siguientes características:

- **Herramienta de Clima**: Una herramienta que proporciona información climática simulada basada en la ubicación dada.
- **Herramienta de Clonación Git**: Una herramienta que clona un repositorio git en una carpeta especificada.
- **Herramienta para Abrir en VS Code**: Una herramienta que abre una carpeta en VS Code o VS Code Insiders.
- **Conexión con Agent Builder**: Una función que permite conectar el servidor MCP con Agent Builder para pruebas y depuración.
- **Depurar en [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Una función que permite depurar el servidor MCP usando MCP Inspector.

## Comenzar con la plantilla Weather MCP Server

> **Prerrequisitos**
>
> Para ejecutar el servidor MCP en tu máquina local de desarrollo, necesitarás:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Requerido para la herramienta git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) o [VS Code Insiders](https://code.visualstudio.com/insiders/) (Requerido para la herramienta open_in_vscode)
> - (*Opcional - si prefieres uv*) [uv](https://github.com/astral-sh/uv)
> - [Extensión de depurador de Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Preparar el entorno

Hay dos enfoques para configurar el entorno para este proyecto. Puedes elegir cualquiera según tu preferencia.

> Nota: Recarga VSCode o la terminal para asegurar que se utilice el Python del entorno virtual después de crear el entorno virtual.

| Enfoque | Pasos |
| -------- | ----- |
| Usando `uv` | 1. Crea el entorno virtual: `uv venv` <br>2. Ejecuta el comando de VSCode "***Python: Select Interpreter***" y selecciona el python del entorno virtual creado <br>3. Instala las dependencias (incluye dependencias de desarrollo): `uv pip install -r pyproject.toml --extra dev` |
| Usando `pip` | 1. Crea el entorno virtual: `python -m venv .venv` <br>2. Ejecuta el comando de VSCode "***Python: Select Interpreter***" y selecciona el python del entorno virtual creado<br>3. Instala las dependencias (incluye dependencias de desarrollo): `pip install -e .[dev]` |

Después de configurar el entorno, puedes ejecutar el servidor en tu máquina local de desarrollo a través de Agent Builder como el cliente MCP para comenzar:
1. Abre el panel de depuración de VS Code. Selecciona `Debug in Agent Builder` o presiona `F5` para empezar a depurar el servidor MCP.
2. Usa AI Toolkit Agent Builder para probar el servidor con [este prompt](../../../../../../../../../../../open_prompt_builder). El servidor se conectará automáticamente a Agent Builder.
3. Haz clic en `Run` para probar el servidor con el prompt.

**¡Felicidades**! Has ejecutado con éxito el Weather MCP Server en tu máquina local de desarrollo mediante Agent Builder como cliente MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Qué incluye la plantilla

| Carpeta / Archivo| Contenidos                                  |
| ------------ | -------------------------------------------- |
| `.vscode`    | Archivos de VSCode para depuración          |
| `.aitk`      | Configuraciones para AI Toolkit              |
| `src`        | El código fuente para el servidor weather mcp |

## Cómo depurar el Weather MCP Server

> Notas:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) es una herramienta visual para desarrolladores para probar y depurar servidores MCP.
> - Todos los modos de depuración soportan puntos de interrupción, por lo que puedes añadir puntos de interrupción al código de implementación de la herramienta.

## Herramientas disponibles

### Herramienta de Clima
La herramienta `get_weather` proporciona información climática simulada para una ubicación especificada.

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
| `location` | string | Ubicación para obtener el clima (p. ej., nombre de ciudad, estado o coordenadas) |

### Herramienta de Clonación Git
La herramienta `git_clone_repo` clona un repositorio git en una carpeta especificada.

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
| `repo_url` | string | URL del repositorio git a clonar |
| `target_folder` | string | Ruta a la carpeta donde se debe clonar el repositorio |

La herramienta devuelve un objeto JSON con:
- `success`: Booleano que indica si la operación fue exitosa
- `target_folder` o `error`: La ruta del repositorio clonado o un mensaje de error

### Herramienta para Abrir en VS Code
La herramienta `open_in_vscode` abre una carpeta en la aplicación VS Code o VS Code Insiders.

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
| `folder_path` | string | Ruta a la carpeta para abrir |
| `use_insiders` | boolean (opcional) | Indica si se debe usar VS Code Insiders en lugar del VS Code normal |

La herramienta devuelve un objeto JSON con:
- `success`: Booleano que indica si la operación fue exitosa
- `message` o `error`: Un mensaje de confirmación o un mensaje de error

| Modo de depuración | Descripción | Pasos para depurar |
| ---------- | ----------- | --------------- |
| Agent Builder | Depura el servidor MCP en Agent Builder vía AI Toolkit. | 1. Abre el panel de depuración de VS Code. Selecciona `Debug in Agent Builder` y presiona `F5` para empezar a depurar el servidor MCP.<br>2. Usa AI Toolkit Agent Builder para probar el servidor con [este prompt](../../../../../../../../../../../open_prompt_builder). El servidor se conectará automáticamente a Agent Builder.<br>3. Haz clic en `Run` para probar el servidor con el prompt. |
| MCP Inspector | Depura el servidor MCP usando el MCP Inspector. | 1. Instala [Node.js](https://nodejs.org/)<br> 2. Configura Inspector: `cd inspector` y luego `npm install` <br> 3. Abre el panel de depuración de VS Code. Selecciona `Debug SSE in Inspector (Edge)` o `Debug SSE in Inspector (Chrome)`. Presiona F5 para iniciar la depuración.<br> 4. Cuando MCP Inspector se abra en el navegador, haz clic en el botón `Connect` para conectar este servidor MCP.<br> 5. Luego puedes `List Tools`, seleccionar una herramienta, ingresar parámetros, y `Run Tool` para depurar el código del servidor.<br> |

## Puertos predeterminados y personalizaciones

| Modo de depuración | Puertos | Definiciones | Personalizaciones | Nota |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Edita [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) para cambiar los puertos anteriores. | N/A |
| MCP Inspector | 3001 (Servidor); 5173 y 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Edita [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) para cambiar los puertos anteriores.| N/A |

## Retroalimentación

Si tienes algún comentario o sugerencia para esta plantilla, por favor abre un issue en el [repositorio de AI Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por humanos. No nos hacemos responsables por malentendidos o interpretaciones erróneas derivadas del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->