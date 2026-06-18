# Servidor MCP de Clima

Este es un ejemplo de servidor MCP en Python que implementa herramientas de clima con respuestas simuladas. Puede usarse como base para tu propio servidor MCP. Incluye las siguientes características:

- **Herramienta de Clima**: Una herramienta que proporciona información meteorológica simulada basada en la ubicación dada.
- **Conexión con Agent Builder**: Una función que permite conectar el servidor MCP con el Agent Builder para pruebas y depuración.
- **Depurar en [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Una función que permite depurar el servidor MCP usando el MCP Inspector.

## Comenzar con la plantilla del servidor MCP de clima

> **Requisitos previos**
>
> Para ejecutar el servidor MCP en tu máquina de desarrollo local, necesitarás:
>
> - [Python](https://www.python.org/)
> - (*Opcional - si prefieres uv*) [uv](https://github.com/astral-sh/uv)
> - [Extensión de depurador de Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Preparar el entorno

Existen dos enfoques para configurar el entorno para este proyecto. Puedes elegir cualquiera según tu preferencia.

> Nota: Recarga VSCode o la terminal para asegurar que se use el Python del entorno virtual después de crear dicho entorno.

| Enfoque | Pasos |
| -------- | ----- |
| Usando `uv` | 1. Crear entorno virtual: `uv venv` <br>2. Ejecutar el comando de VSCode "***Python: Select Interpreter***" y seleccionar el python del entorno virtual creado <br>3. Instalar dependencias (incluyendo dependencias de desarrollo): `uv pip install -r pyproject.toml --extra dev` |
| Usando `pip` | 1. Crear entorno virtual: `python -m venv .venv` <br>2. Ejecutar el comando de VSCode "***Python: Select Interpreter***" y seleccionar el python del entorno virtual creado<br>3. Instalar dependencias (incluyendo dependencias de desarrollo): `pip install -e .[dev]` |

Después de configurar el entorno, puedes ejecutar el servidor en tu máquina local de desarrollo vía Agent Builder como cliente MCP para comenzar:
1. Abre el panel de depuración en VS Code. Selecciona `Debug in Agent Builder` o presiona `F5` para iniciar la depuración del servidor MCP.
2. Usa Microsoft Foundry Toolkit Agent Builder para probar el servidor con [este prompt](../../../../../../../../../../../open_prompt_builder). El servidor se conectará automáticamente al Agent Builder.
3. Haz clic en `Run` para probar el servidor con el prompt.

**¡Felicidades**! Has ejecutado exitosamente el servidor MCP de Clima en tu máquina local de desarrollo vía Agent Builder como cliente MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Qué incluye la plantilla

| Carpeta / Archivo | Contenido                                    |
| ------------ | -------------------------------------------- |
| `.vscode`    | Archivos de VSCode para depuración           |
| `.aitk`      | Configuraciones para Microsoft Foundry Toolkit |
| `src`        | Código fuente para el servidor MCP de clima  |

## Cómo depurar el servidor MCP de Clima

> Notas:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) es una herramienta visual para desarrolladores para probar y depurar servidores MCP.
> - Todos los modos de depuración soportan puntos de interrupción, así que puedes añadirlos en el código de implementación de la herramienta.

| Modo de depuración | Descripción | Pasos para depurar |
| ---------- | ----------- | --------------- |
| Agent Builder | Depurar el servidor MCP en el Agent Builder vía Microsoft Foundry Toolkit. | 1. Abre el panel de depuración de VS Code. Selecciona `Debug in Agent Builder` y presiona `F5` para iniciar la depuración del servidor MCP.<br>2. Usa Microsoft Foundry Toolkit Agent Builder para probar el servidor con [este prompt](../../../../../../../../../../../open_prompt_builder). El servidor se conectará automáticamente al Agent Builder.<br>3. Haz clic en `Run` para probar el servidor con el prompt. |
| MCP Inspector | Depurar el servidor MCP usando el MCP Inspector. | 1. Instala [Node.js](https://nodejs.org/)<br> 2. Configura Inspector: `cd inspector` && `npm install` <br> 3. Abre el panel de depuración de VS Code. Selecciona `Debug SSE in Inspector (Edge)` o `Debug SSE in Inspector (Chrome)`. Presiona F5 para empezar la depuración.<br> 4. Cuando MCP Inspector se abra en el navegador, haz clic en el botón `Connect` para conectar este servidor MCP.<br> 5. Entonces puedes `List Tools`, seleccionar una herramienta, ingresar parámetros y `Run Tool` para depurar el código del servidor.<br> |

## Puertos por defecto y personalizaciones

| Modo de depuración | Puertos | Definiciones | Personalizaciones | Nota |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edita [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) para cambiar los puertos arriba mencionados. | N/A |
| MCP Inspector | 3001 (Servidor); 5173 y 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edita [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) para cambiar los puertos arriba mencionados.| N/A |

## Retroalimentación

Si tienes comentarios o sugerencias para esta plantilla, por favor abre un issue en el [repositorio GitHub de Microsoft Foundry Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->