# Registro de cambios: Currículo MCP para principiantes

Este documento sirve como un registro de todos los cambios significativos realizados en el currículo de Model Context Protocol (MCP) para principiantes. Los cambios están documentados en orden cronológico inverso (los cambios más recientes primero).

## 16 de junio de 2026

### Alineación de la especificación MCP y validación de ejemplos

Se validó el currículo contra la actual **Especificación MCP 2025-11-25** y los SDK oficiales más recientes, luego se corrigieron las referencias obsoletas restantes de la especificación y se confirmó que los ejemplos principales aún se compilan y ejecutan.

#### Correcciones de versión de especificación (2025-06-18 / 2025-03-26 → 2025-11-25)

Se actualizó el contenido en inglés donde aún se afirmaba que una revisión antigua de la especificación era la norma *actual/más reciente*, y se redirigieron los enlaces a las rutas canónicas de la especificación `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Se actualizó el banner de "Norma actual", la introducción, el título de los principios centrales de seguridad, el título de requisitos obligatorios, la sección Microsoft Entra ID, los enlaces de Referencias y Recursos, y el aviso final de seguridad (8 referencias) a 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Se actualizó el enlace de Recursos Adicionales de la especificación y el banner "Norma actual" a 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Se reemplazó el enlace obsoleto `2025-03-26` de seguridad y confianza por la página actual de mejores prácticas de seguridad 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Se actualizó el enlace oficial de documentos de muestreo a 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Se actualizó la referencia presente en tiempo presente de la "especificación MCP actual" y el enlace de Recursos Adicionales de la especificación a 2025-11-25 (las notas históricas sobre la descontinuación de SSE se dejaron intactas para mantener la precisión)

#### Validación de ejemplos contra SDKs actuales

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolvió `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` pasó sin errores de tipo — las APIs existentes de `McpServer`/`StdioServerTransport` siguen siendo válidas
- **Python (03-GettingStarted/01-first-server/solution/python)**: Se validó en un `.venv` aislado con `mcp[cli]` (1.27.2); `py_compile` pasó y `FastMCP.list_tools()` devolvió correctamente las herramientas `add` y `subtract`
- Se confirmó que todos los rangos de versión del ejemplo `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) se resuelven limpiamente a la versión actual `1.29.0` sin cambios de API incompatibles

#### Alineación de fijación de dependencias (cerrando brechas de versión)

Se actualizaron las fijaciones desactualizadas del SDK para que cada ejemplo siga la versión actual del lanzamiento MCP, respetando la convención de todo el repositorio:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Se actualizó `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` y se actualizó la descripción del paquete obsoleta `"updated for MCP 2025-06-18"` a `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** y **lab4/code/github_mcp_server/pyproject.toml**: Se actualizó la fijación exacta `mcp==1.23.0` → `mcp>=1.26.0`; se regeneraron ambos archivos `uv.lock` (`uv lock`) para que los archivos de bloqueo se resuelvan a la versión actual `mcp 1.27.2` y permanezcan sincronizados con los manifiestos

#### Análisis de brechas curriculares — Cobertura de nuevas funciones de la especificación

Se verificó que el currículo ya cubre todos los primitivos introducidos/ampliados en MCP 2025-11-25, por lo que no quedan brechas de contenido:
- **Muestreo**: Lección 03-GettingStarted/14-sampling más 05-AdvancedTopics/mcp-sampling
- **Elicitación (incl. modo URL)**: Documentado en 01-CoreConcepts y 05-AdvancedTopics/mcp-protocol-features
- **Raíces**: Documentado en 00-Introduction, 01-CoreConcepts y 05-AdvancedTopics/mcp-root-contexts
- **Tareas (experimental, operaciones de larga duración)**: Documentado en 01-CoreConcepts y 05-AdvancedTopics/mcp-protocol-features
- **Anotaciones de herramientas** (`readOnlyHint` / `destructiveHint`): Documentado en 01-CoreConcepts y 05-AdvancedTopics/mcp-protocol-features

### Reforzamiento de seguridad y remediación de vulnerabilidades en dependencias

Se realizó una auditoría completa de seguridad en todos los manifiestos de dependencias y el código fuente de los ejemplos, luego se corrigieron todos los avisos npm reportados y un hallazgo a nivel de código. Tras la remediación, `npm audit` informa **0 vulnerabilidades** en cada directorio auditado.

#### Vulnerabilidades de dependencias npm (transitivas) — Corregidas

Se auditaron todos los 15 archivos `package-lock.json` comprometidos. Las vulnerabilidades se limitaron a dependencias transitivas incluidas por la herramienta MCP Inspector de desarrollo, el cliente OpenAI y el SDK MCP; todas están ahora resueltas sin romper los ejemplos:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** y **lab3/code/weather_mcp/inspector**: Se actualizó `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), lo que limpió los avisos de paquetes incluidos `ajv`, `brace-expansion`, `diff`, `path-to-regexp` y `ws`. Se añadió una entrada `overrides` de npm que fuerza la versión parcheada `shell-quote@1.8.4` para eliminar el aviso crítico restante que llevaba `concurrently`; se regeneraron ambos archivos de bloqueo (ahora 0 vulnerabilidades)
- **03-GettingStarted/samples/typescript**: `npm audit fix` actualizó la dependencia transitoria `qs` (moderada) a una versión parcheada
- **03-GettingStarted/samples/javascript**: `npm audit fix` actualizó la dependencia transitoria `hono` (moderada) a una versión parcheada
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` actualizó la dependencia transitoria `form-data` (alta) a una versión parcheada
- **03-GettingStarted/11-simple-auth/solution/typescript**: Se generó el `package-lock.json` faltante para que el proyecto sea reproducible y auditable (0 vulnerabilidades)

#### Corrección de seguridad a nivel de código (OWASP A03: Inyección)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Se eliminó `shell=True` de la herramienta `open_in_vscode`. La llamada anterior `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitía que metacaracteres del shell en la ruta de la carpeta fueran interpretados por `cmd.exe` (vector de inyección de comandos). Ahora lanza directamente el `Code.exe` resuelto con la carpeta como argumento — sin shell — lo cual es funcionalmente equivalente y seguro.

#### Auditoría de dependencias en Python

- Se auditaron todos los conjuntos de requisitos de Python con `pip-audit`. `05-AdvancedTopics` y `03-GettingStarted/samples/python` reportaron **ninguna vulnerabilidad conocida** (sus rangos de `mcp` / `httpx` / `pydantic` / `python-dotenv` se resuelven a versiones parcheadas actuales)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` señaló la dependencia transitiva **`werkzeug` 3.1.1** con tres avisos de denegación de servicio `safe_join` sobre nombres de dispositivos en Windows — `CVE-2025-66221`, `CVE-2026-21860` y `CVE-2026-27199` (todos corregidos en 3.1.6). Se agregó una fijación de seguridad explícita `werkzeug>=3.1.6` para que se resuelva la versión parcheada; se verificó que esta restricción se resuelva correctamente con las pilas `chainlit` / `mcp` / `semantic-kernel`

### Cambio de marca del nombre del producto

Se actualizó todo el contenido del currículo para reflejar el cambio de marca de producto de Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Se actualizó el enlace a la comunidad de Discord
- **AGENTS.md**: Se actualizó la referencia al servidor de Discord
- **README.md**: Se actualizaron las referencias al ecosistema tecnológico
- **study_guide.md**: Se actualizaron las referencias a estudios de caso
- **05-AdvancedTopics/README.md**: Se actualizó el título y descripción del Módulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Se actualizó el encabezado de sección y la descripción
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Actualización completa del título y contenido del módulo
- **05-AdvancedTopics/mcp-security-entra/README.md**: Se actualizó el enlace de referencia cruzada
- **07-LessonsfromEarlyAdoption/README.md**: Se actualizaron las referencias a estudios de caso
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Se actualizó el encabezado de la Sección 9, las insignias y las capacidades
- **08-BestPractices/README.md**: Se actualizó el enlace a la comunidad de Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Se actualizó la referencia al canal de Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Se actualizó la referencia al despliegue del modelo
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Se actualizó la tabla de Servicios de IA
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Se actualizaron las referencias a recursos

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension para VS Code
- **README.md**: Se actualizaron las referencias principales del currículo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Se actualizaron el título del módulo, descripción general y todos los encabezados de módulo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Se actualizaron el título, objetivos de aprendizaje, instrucciones de configuración y recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Se actualizaron el título, objetivos de aprendizaje, tabla de hosts MCP y referencias cruzadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Se actualizaron el título, insignias, prerequisitos y recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Se actualizaron las referencias a Agent Builder y enlace de retroalimentación
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Se actualizaron prerequisitos y referencias a la extensión

---

## 11 de abril de 2026

### Nueva lección, correcciones de documentación y actualizaciones de dependencias

#### Nuevo contenido del currículo añadido

**Módulo 05 - Temas avanzados**
- **Lección 5.17: Razonamiento multi-agente adversarial con MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nueva guía completa que cubre el patrón de debate adversarial para sistemas multi-agente
  - Diagrama de arquitectura Mermaid: dos agentes → servidor MCP compartido → transcripción de debate → juez → veredicto
  - Servidor de herramientas MCP compartido (`web_search` + `run_python`) implementado en Python y TypeScript
  - Prompts de sistema opuestos (A FAVOR / EN CONTRA / Juez) con requisitos explícitos de uso de herramientas
  - Orquestador de debate en Python, TypeScript y C# que administra rondas y enruta argumentos
  - Cableado MCP `ClientSession` para el orquestador hacia llamadas reales a herramientas
  - Tabla de casos de uso (detección de alucinaciones, modelado de amenazas, revisión de diseño de API, verificación factual, selección tecnológica)
  - Consideraciones de seguridad: ejecución en sandbox, validación de llamadas a herramientas, limitación de tasa, registro de auditoría
  - Ejercicio estructurado con tres escenarios prácticos (revisión de código, decisión arquitectónica, moderación de contenido)

#### Correcciones de documentación

**Módulo 03 - Introducción**
- **05-stdio-server/README.md**: Se corrigió el ejemplo incompleto del servidor stdio en TypeScript — se añadió la instanciación faltante del transporte (`new StdioServerTransport()`) y la llamada `server.connect(transport)` para que coincida con los ejemplos de Python y .NET en la misma sección
- **14-sampling/README.md**: Se corrigió un error tipográfico — se corrigió `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Actualizaciones del currículo

**README.md principal**
- Se añadió la entrada 5.17 (Razonamiento multi-agente adversarial con MCP) a la tabla del currículo con un enlace directo a la nueva lección

**05-AdvancedTopics/README.md**
- Se añadió la fila de la Lección 5.17 a la tabla de lecciones

**study_guide.md**
- Se añadió el tema de Razonamiento multi-agente adversarial al mapa mental y la descripción en prosa de Temas avanzados

#### Correcciones de código y seguridad

**Módulo 05 - Agentes adversariales (`mcp-adversarial-agents`)**
- **Corrección de seguridad — inyección de comandos**: Se reemplazó la interpolación de shell con `execSync` por `execFile` + `promisify` en la herramienta `run_python` en TypeScript, eliminando la superficie de inyección de comandos (el código controlado por LLM ahora se pasa literalmente como un elemento argv sin participación del shell)
- **Cableado del ciclo de herramientas MCP**: Se actualizó el orquestador de debates en Python para usar el cliente `AsyncAnthropic` (reemplazando el `Anthropic` síncrono bloqueante), pasar una `ClientSession` activa directamente a cada turno del agente, obtener definiciones de herramientas mediante `session.list_tools()` en cada turno, y despachar bloques `tool_use` mediante `session.call_tool()` en un bucle hasta que el modelo emita una respuesta final en texto.

#### Actualizaciones de dependencias

- Se elevó `hono` a la versión 4.12.12 en varios paquetes (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Se elevó `@hono/node-server` de 1.19.11 a 1.19.13 en paquetes TypeScript
- Se elevó `cryptography` de 46.0.5 a 46.0.7 en paquetes Python (laboratorios 3 y 4 de 10-StreamliningAIWorkflows)
- Se elevó `lodash` de 4.17.23 a 4.18.1 en inspector 10-StreamliningAIWorkflows

#### Traducciones

- Se sincronizaron traducciones para más de 48 idiomas con los últimos cambios en el origen (actualización i18n)

---

## 5 de febrero de 2026

### Mejoras de validación y navegación en todo el repositorio

#### Nuevo contenido curricular agregado

**Módulo 03 - Getting Started**  
- **12-mcp-hosts/README.md**: Nueva guía completa para configurar hosts MCP  
  - Ejemplos de configuración para Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - Plantillas JSON de configuración para todos los hosts principales  
  - Tabla comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)  
  - Solución de problemas comunes de conexión  
  - Mejores prácticas de seguridad para configuración de hosts

- **13-mcp-inspector/README.md**: Nueva guía de depuración para MCP Inspector  
  - Métodos de instalación (npx, npm global, desde código fuente)  
  - Conexión a servidores vía stdio y HTTP/SSE  
  - Herramientas de prueba, recursos y flujos de trabajo de prompts  
  - Integración con VS Code y MCP Inspector  
  - Escenarios comunes de depuración con soluciones

**Módulo 04 - Practical Implementation**  
- **pagination/README.md**: Nueva guía de implementación de paginación  
  - Patrones de paginación basada en cursor en Python, TypeScript, Java  
  - Manejo de paginación en cliente  
  - Estrategias de diseño de cursor (opaco vs estructurado)  
  - Recomendaciones de optimización de rendimiento

**Módulo 05 - Advanced Topics**  
- **mcp-protocol-features/README.md**: Nueva inmersión en características del protocolo  
  - Implementación de notificaciones de progreso  
  - Patrones de cancelación de solicitudes  
  - Plantillas de recursos con patrones URI  
  - Gestión del ciclo de vida del servidor  
  - Control del nivel de logs  
  - Patrones de manejo de errores con códigos JSON-RPC

#### Correcciones de navegación (más de 24 archivos actualizados)

**README de módulos principales**  
 Ahora enlazan a la primera lección Y al siguiente módulo

**Sub-archivos de 02-Security**  
- Los cinco documentos suplementarios de seguridad ahora tienen navegación "Qué sigue":

**Archivos 09-CaseStudy**  
- Todos los archivos de estudio de caso ahora tienen navegación secuencial:

**Laboratorios 10-StreamliningAI**  
Se añadió sección Qué sigue al resumen del Módulo 10 y al Módulo 11

#### Correciones de código y contenido

**Actualizaciones de SDK y dependencias**  
Se corrigió la versión vacía de openai a `^4.95.0`  
Actualización del SDK de `^1.8.0` a `>=1.26.0`  
Actualización de pines de versión de mcp a `>=1.26.0`

**Correcciones de código**  
Se corrigió modelo inválido `gpt-4o-mini` a `gpt-4.1-mini`

**Correcciones de contenido**  
Corrección de enlace roto `READMEmd` → `README.md`, corrección de encabezado en currículum `Module 1-3` → `Module 0-3`, corrección de ruta sensible a mayúsculas  
Eliminación de contenido duplicado corrupto del Estudio de Caso 5

**Mejoras en guía para principiantes**  
Se agregó introducción adecuada, objetivos de aprendizaje y prerrequisitos para principiantes

#### Actualizaciones del currículo

**README principal**  
- Se agregaron entradas 3.12 (Hosts MCP), 3.13 (Inspector MCP), 4.1 (Paginación), 5.16 (Características del protocolo) a la tabla curricular

**README de módulos**  
Se añadieron las lecciones 12 y 13 a la lista de lecciones  
Se añadió sección de Guías prácticas con enlace a paginación  
Se agregaron las lecciones 5.15 (Transporte personalizado) y 5.16 (Características del protocolo)

**study_guide.md**  
- Se actualizó el mapa mental con todos los temas nuevos: Configuración de hosts MCP, Inspector MCP, Estrategias de paginación, Inmersión en características del protocolo

## 28 de enero de 2026

### Revisión de cumplimiento de Especificación MCP 2025-11-25

#### Mejora de conceptos centrales (01-CoreConcepts/)  
- **Nuevo primitivo cliente - Roots**: Se añadió documentación completa sobre el primitivo Roots, que permite a los servidores comprender los límites del sistema de archivos y permisos de acceso  
- **Anotaciones de herramientas**: Se añadió documentación sobre anotaciones de comportamiento de herramientas (`readOnlyHint`, `destructiveHint`) para mejores decisiones de ejecución de herramientas  
- **Invocación de herramientas en muestreo**: Se actualizó la documentación de Sampling para incluir parámetros `tools` y `toolChoice` para invocación de herramientas guiadas por modelo durante solicitudes de muestreo  
- **Elusión modo URL**: Se añadió documentación sobre elusión basada en URL para interacciones web externas iniciadas por servidor  
- **Tareas (Experimental)**: Se añadió nueva sección que documenta la característica experimental Tasks para envoltorios de ejecución duraderos y recuperación diferida de resultados  
- **Soporte de iconos**: Se señaló que herramientas, recursos, plantillas de recursos y prompts ahora pueden incluir íconos como metadatos adicionales

#### Actualizaciones de documentación  
- **README.md**: Se añadió referencia a la versión MCP Especificación 2025-11-25 y explicación del versionado basado en fechas  
- **study_guide.md**: Se actualizó el mapa curricular para incluir Tareas y Anotaciones de herramientas en conceptos centrales; se actualizó el timestamp del documento

#### Verificación de cumplimiento de especificación  
- **Versión del protocolo**: Se verificó que toda la documentación haga referencia a MCP Especificación 2025-11-25 actual  
- **Alineación arquitectónica**: Confirmada la documentación correcta de arquitectura en dos capas (Capa de Datos + Capa de Transporte)  
- **Documentación de primitivos**: Validación de primitivos del servidor (Recursos, Prompts, Herramientas) y primitivos del cliente (Sampling, Elicitation, Logging, Roots)  
- **Mecanismos de transporte**: Verificación de la documentación de transporte STDIO y HTTP streamable  
- **Guía de seguridad**: Confirmación de alineación con las prácticas recomendadas de seguridad MCP actuales

#### Características clave documentadas MCP 2025-11-25  
- **Descubrimiento OpenID Connect**: Descubrimiento de servidor de autenticación mediante OIDC  
- **Documentos de metadatos de ID de cliente OAuth**: Mecanismo recomendado de registro de cliente  
- **JSON Schema 2020-12**: Dialecto predeterminado para definiciones de esquema MCP  
- **Sistema de niveles SDK**: Requisitos formalizados para soporte y mantenimiento de características SDK  
- **Estructura de gobernanza**: Formalización de Grupos de Trabajo y Grupos de Interés en gobernanza MCP

### Actualización mayor de documentación de seguridad (02-Security/)

#### Integración MCP Security Summit Workshop (Sherpa)  
- **Nuevo recurso práctico**: Integración completa con [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) en toda la documentación de seguridad  
- **Cobertura de ruta de expedición**: Documentación completa del progreso campamento a campamento desde Base Camp hasta Summit  
- **Alineación OWASP**: Toda guía de seguridad mapea a riesgos de MCP Azure Security Guide de OWASP

#### Integración OWASP MCP Top 10  
- **Nueva sección**: Tabla de riesgos de seguridad OWASP MCP Top 10 con mitigaciones Azure añadida al README principal de seguridad  
- **Documentación basada en riesgos**: Actualización de mcp-security-controls-2025.md con referencias a riesgos OWASP MCP para cada dominio de seguridad  
- **Arquitectura de referencia**: Enlaces a arquitectura de referencia OWASP MCP Azure Security Guide y patrones de implementación

#### Archivos de seguridad actualizados  
- **README.md**: Añadido resumen del taller Sherpa, tabla de ruta de expedición, resumen de riesgos OWASP MCP Top 10 y sección de entrenamiento práctico  
- **mcp-security-controls-2025.md**: Actualización de encabezado a febrero 2026, añadido referencias a riesgos OWASP (MCP01-MCP08), corregida inconsistencia en versión de especificación  
- **mcp-security-best-practices-2025.md**: Añadida sección de recursos Sherpa y OWASP, timestamp actualizado  
- **mcp-best-practices.md**: Añadida sección de entrenamiento práctico con enlaces a Sherpa y OWASP  
- **azure-content-safety-implementation.md**: Añadida referencia OWASP MCP06, alineación con Sherpa Camp 3 y sección de recursos adicionales

#### Nuevos enlaces de recursos agregados  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Páginas individuales de riesgos OWASP MCP (MCP01-MCP10)

### Alineación con Especificación MCP 2025-11-25 en todo el currículo

#### Módulo 03 - Getting Started  
- **Documentación del SDK**: Añadido SDK Go a la lista oficial de SDK; actualizadas todas referencias a SDK conforme a MCP Especificación 2025-11-25  
- **Clarificación de transporte**: Actualizadas descripciones de transporte STDIO y HTTP streaming con referencias explícitas a la especificación

#### Módulo 04 - Practical Implementation  
- **Actualizaciones SDK**: Añadido SDK Go; lista SDK actualizada con referencia a versión de especificación  
- **Especificación de autorización**: Actualizado enlace a especificación de autorización MCP a versión 2025-11-25 actual

#### Módulo 05 - Advanced Topics  
- **Nuevas características**: Añadida nota sobre nuevas características MCP Especificación 2025-11-25 (Tareas, Anotaciones de herramientas, Elusión modo URL, Roots)  
- **Recursos de seguridad**: Añadidos enlaces OWASP MCP Top 10 y taller Sherpa a referencias adicionales

#### Módulo 06 - Contribuciones de la comunidad  
- **Lista SDK**: Añadidos SDK Swift y Rust; actualizado enlace a especificación a 2025-11-25  
- **Referencia a especificación**: Actualizado enlace a URL directa de la especificación MCP

#### Módulo 07 - Lecciones de adopción temprana  
- **Actualizaciones de recursos**: Añadido enlace MCP Especificación 2025-11-25 y OWASP MCP Top 10 a recursos adicionales

#### Módulo 08 - Mejores prácticas  
- **Versión de la especificación**: Actualizada referencia a MCP Especificación 2025-11-25  
- **Recursos de seguridad**: Añadidos OWASP MCP Top 10 y taller Sherpa a referencias adicionales

#### Módulo 10 - Streamlining AI Workflows  
- **Actualización de insignia**: Cambiada insignia de versión MCP desde versión SDK (1.9.3) a versión de la especificación (2025-11-25)  
- **Enlaces de recursos**: Actualizado enlace a MCP Especificación; añadido OWASP MCP Top 10

#### Módulo 11 - Laboratorios prácticos de servidor MCP  
- **Referencia a especificación**: Actualizado enlace a MCP Especificación versión 2025-11-25  
- **Recursos de seguridad**: Añadido OWASP MCP Top 10 a recursos oficiales

## 18 de diciembre de 2025

### Actualización de documentación de seguridad - MCP Especificación 2025-11-25

#### Mejores prácticas de seguridad MCP (02-Security/mcp-best-practices.md) - Actualización de versión de especificación  
- **Actualización de versión del protocolo**: Actualizado para referenciar la última MCP Especificación 2025-11-25 (publicada 25 de noviembre de 2025)  
  - Actualización de todas las referencias de versión de especificación desde 2025-06-18 a 2025-11-25  
  - Actualización de referencias de fecha del documento de 18 de agosto de 2025 a 18 de diciembre de 2025  
  - Verificación de que todas las URL de especificación apunten a la documentación actual  
- **Validación de contenido**: Validación integral de mejores prácticas de seguridad contra estándares más recientes  
  - **Soluciones de seguridad Microsoft**: Verificación de terminología actual y enlaces para Prompt Shields (antes "detección de riesgo jailbreak"), Azure Content Safety, Microsoft Entra ID y Azure Key Vault  
  - **Seguridad OAuth 2.1**: Confirmación de alineación con últimas mejores prácticas de seguridad OAuth  
  - **Estándares OWASP**: Validación de referencias OWASP Top 10 para LLMs siguen siendo actuales  
  - **Servicios Azure**: Verificación de enlaces y mejores prácticas para toda la documentación Microsoft Azure  
- **Alineación con estándares**: Confirmación de que todos los estándares de seguridad referenciados están actuales  
  - NIST AI Risk Management Framework  
  - ISO 27001:2022  
  - Mejores prácticas de seguridad OAuth 2.1  
  - Marcos de seguridad y cumplimiento de Azure  
- **Recursos de implementación**: Validación de todos los enlaces a guías y recursos de implementación  
  - Patrones de autenticación Azure API Management  
  - Guías de integración Microsoft Entra ID  
  - Gestión de secretos Azure Key Vault  
  - Soluciones de DevSecOps, pipelines y monitoreo

### Aseguramiento de calidad de documentación  
- **Cumplimiento de especificación**: Aseguramiento de que todos los requisitos obligatorios de seguridad MCP (MUST/MUST NOT) estén alineados con la última especificación  
- **Actualización de recursos**: Verificación de todos los enlaces externos a documentación Microsoft, estándares de seguridad y guías de implementación  
- **Cobertura de mejores prácticas**: Confirmación de cobertura integral de autenticación, autorización, amenazas específicas de IA, seguridad de cadena de suministros y patrones empresariales

## 6 de octubre de 2025

### Expansión de Getting Started – Uso avanzado del servidor y autenticación simple

#### Uso avanzado del servidor (03-GettingStarted/10-advanced)  
- **Nuevo capítulo agregado**: Guía completa para uso avanzado del servidor MCP, cubriendo arquitecturas regulares y de bajo nivel.  
  - **Servidor regular vs bajo nivel**: Comparación detallada y ejemplos de código en Python y TypeScript para ambos enfoques.  
  - **Diseño basado en handlers**: Explicación de gestión de herramientas/recursos/prompts basada en handlers para implementaciones de servidor escalables y flexibles.  
  - **Patrones prácticos**: Escenarios reales donde los patrones de servidor de bajo nivel son beneficiosos para funciones y arquitecturas avanzadas.
#### Autenticación Simple (03-GettingStarted/11-simple-auth)
- **Nuevo Capítulo Añadido**: Guía paso a paso para implementar autenticación simple en servidores MCP.
  - **Conceptos de Autenticación**: Explicación clara de autenticación vs. autorización y manejo de credenciales.
  - **Implementación Básica de Autenticación**: Patrones de autenticación basados en middleware en Python (Starlette) y TypeScript (Express), con ejemplos de código.
  - **Progresión hacia Seguridad Avanzada**: Orientación para comenzar con autenticación simple y avanzar hacia OAuth 2.1 y RBAC, con referencias a módulos de seguridad avanzada.

Estas adiciones proporcionan una guía práctica y directa para desarrollar implementaciones de servidores MCP más robustas, seguras y flexibles, conectando conceptos fundamentales con patrones avanzados para producción.

## 29 de septiembre de 2025

### Laboratorios de Integración de Bases de Datos en Servidores MCP - Ruta Completa de Aprendizaje Práctico

#### 11-MCPServerHandsOnLabs - Nuevo Currículo Completo de Integración de Bases de Datos
- **Ruta de Aprendizaje Completa de 13 Laboratorios**: Añadido currículo práctico y exhaustivo para construir servidores MCP listos para producción con integración de base de datos PostgreSQL
  - **Implementación Realista**: Caso de uso de análisis de Zava Retail demostrando patrones de nivel empresarial
  - **Progresión Estructurada de Aprendizaje**:
    - **Laboratorios 00-03: Fundamentos** - Introducción, Arquitectura Central, Seguridad y Multi-Tenancy, Configuración del Entorno
    - **Laboratorios 04-06: Construcción del Servidor MCP** - Diseño y Esquema de Base de Datos, Implementación del Servidor MCP, Desarrollo de Herramientas  
    - **Laboratorios 07-09: Funciones Avanzadas** - Integración de Búsqueda Semántica, Pruebas y Depuración, Integración con VS Code
    - **Laboratorios 10-12: Producción y Mejores Prácticas** - Estrategias de Despliegue, Monitoreo y Observabilidad, Mejores Prácticas y Optimización
  - **Tecnologías Empresariales**: Framework FastMCP, PostgreSQL con pgvector, embeddings Azure OpenAI, Azure Container Apps, Application Insights
  - **Funciones Avanzadas**: Seguridad a nivel de fila (RLS), búsqueda semántica, acceso a datos multi-inquilino, embeddings vectoriales, monitoreo en tiempo real

#### Estandarización de Terminología - Conversión de Módulos a Laboratorios
- **Actualización Integral de Documentación**: Actualizados sistemáticamente todos los archivos README en 11-MCPServerHandsOnLabs para usar la terminología "Laboratorio" en lugar de "Módulo"
  - **Encabezados de Sección**: Actualizado "Lo que cubre este módulo" a "Lo que cubre este laboratorio" en los 13 laboratorios
  - **Descripción de Contenidos**: Cambiado "Este módulo provee..." a "Este laboratorio provee..." en toda la documentación
  - **Objetivos de Aprendizaje**: Actualizado "Al final de este módulo..." a "Al final de este laboratorio..."
  - **Enlaces de Navegación**: Convertidas todas las referencias "Módulo XX:" a "Laboratorio XX:" en referencias cruzadas y navegación
  - **Seguimiento de Finalización**: Actualizado "Después de completar este módulo..." a "Después de completar este laboratorio..."
  - **Referencias Técnicas Conservadas**: Conservadas las referencias a módulos de Python en archivos de configuración (por ejemplo, `"module": "mcp_server.main"`)

#### Mejoras en la Guía de Estudio (study_guide.md)
- **Mapa Visual del Currículo**: Añadida nueva sección "11. Laboratorios de Integración de Bases de Datos" con visualización completa de la estructura de laboratorios
- **Estructura del Repositorio**: Actualizado de diez a once secciones principales con descripción detallada de 11-MCPServerHandsOnLabs
- **Orientación en la Ruta de Aprendizaje**: Mejoradas instrucciones de navegación para cubrir secciones 00-11
- **Cobertura Tecnológica**: Añadidos detalles de integración con FastMCP, PostgreSQL y servicios Azure
- **Resultados de Aprendizaje**: Enfatizado desarrollo de servidores listos para producción, patrones de integración de bases de datos y seguridad empresarial

#### Mejora en la Estructura del README Principal
- **Terminología Basada en Laboratorios**: Actualizado README.md principal en 11-MCPServerHandsOnLabs para usar consistentemente la estructura "Laboratorio"
- **Organización de la Ruta de Aprendizaje**: Progresión clara desde conceptos fundamentales hasta implementación avanzada y despliegue en producción
- **Enfoque en Casos Reales**: Énfasis en aprendizaje práctico con patrones y tecnologías de nivel empresarial

### Mejoras en Calidad y Consistencia de la Documentación
- **Énfasis en Aprendizaje Práctico**: Reforzado enfoque basado en laboratorios a lo largo de la documentación
- **Enfoque en Patrones Empresariales**: Destacadas implementaciones listas para producción y consideraciones de seguridad empresarial
- **Integración Tecnológica**: Cobertura completa de servicios modernos de Azure e integración con IA
- **Progresión del Aprendizaje**: Ruta clara y estructurada desde conceptos básicos hasta despliegue en producción

## 26 de septiembre de 2025

### Mejoras en Casos de Estudio - Integración de GitHub MCP Registry

#### Casos de Estudio (09-CaseStudy/) - Enfoque en Desarrollo del Ecosistema
- **README.md**: Gran expansión con estudio de caso integral del GitHub MCP Registry
  - **Estudio de Caso GitHub MCP Registry**: Nuevo estudio exhaustivo que examina el lanzamiento del registro MCP de GitHub en septiembre de 2025
    - **Análisis del Problema**: Examen detallado de los desafíos en el descubrimiento y despliegue fragmentado de servidores MCP
    - **Arquitectura de la Solución**: Enfoque de registro centralizado de GitHub con instalación con un clic en VS Code
    - **Impacto Empresarial**: Mejoras medibles en incorporación de desarrolladores y productividad
    - **Valor Estratégico**: Enfoque en despliegue modular de agentes e interoperabilidad entre herramientas
    - **Desarrollo del Ecosistema**: Posicionamiento como plataforma fundacional para integración agentica
  - **Estructura Mejorada de Casos de Estudio**: Actualizados los siete casos de estudio con formato consistente y descripciones completas
    - Azure AI Travel Agents: Énfasis en orquestación multiagente
    - Integración Azure DevOps: Enfoque en automatización de flujos de trabajo
    - Recuperación en Tiempo Real de Documentación: Implementación de cliente consola en Python
    - Generador Interactivo de Plan de Estudio: Aplicación web conversacional Chainlit
    - Documentación Dentro del Editor: Integración con VS Code y GitHub Copilot
    - Administración de API de Azure: Patrones de integración empresarial de APIs
    - GitHub MCP Registry: Desarrollo del ecosistema y plataforma comunitaria
  - **Conclusión Integral**: Sección de conclusión reescrita destacando los siete casos de estudio que cubren múltiples dimensiones de implementación MCP
    - Integración Empresarial, Orquestación Multiagente, Productividad del Desarrollador
    - Desarrollo del Ecosistema, Aplicaciones Educativas categorizadas
    - Perspectivas mejoradas sobre patrones arquitectónicos, estrategias de implementación y mejores prácticas
    - Énfasis en MCP como protocolo maduro y listo para producción

#### Actualizaciones en la Guía de Estudio (study_guide.md)
- **Mapa Visual del Currículo**: Actualizado diagrama mental para incluir GitHub MCP Registry en la sección de Casos de Estudio
- **Descripción de Casos de Estudio**: Mejorada de descripciones genéricas a desglose detallado de siete casos de estudio completos
- **Estructura del Repositorio**: Actualizado sección 10 para reflejar cobertura integral de casos de estudio con detalles específicos de implementación
- **Integración de Registro de Cambios**: Añadida entrada del 26 de septiembre de 2025 documentando adición de GitHub MCP Registry y mejoras en casos de estudio
- **Actualización de Fechas**: Actualizado pie de página con última revisión (26 de septiembre de 2025)

### Mejoras en Calidad de la Documentación
- **Mejora en la Consistencia**: Estandarizado formato y estructura de casos de estudio en los siete ejemplos
- **Cobertura Completa**: Casos de estudio ahora abarcan escenarios empresariales, productividad del desarrollador y desarrollo del ecosistema
- **Posicionamiento Estratégico**: Énfasis mejorado en MCP como plataforma fundacional para despliegue de sistemas agenticos
- **Integración de Recursos**: Actualizados recursos adicionales para incluir enlace al GitHub MCP Registry

## 15 de septiembre de 2025

### Expansión de Temas Avanzados - Transportes Personalizados e Ingeniería de Contexto

#### Transportes Personalizados MCP (05-AdvancedTopics/mcp-transport/) - Nueva Guía Avanzada de Implementación
- **README.md**: Guía completa de implementación para mecanismos de transporte MCP personalizados
  - **Transporte Azure Event Grid**: Implementación integral de transporte sin servidor basado en eventos
    - Ejemplos en C#, TypeScript y Python con integración Azure Functions
    - Patrones de arquitectura orientada a eventos para soluciones MCP escalables
    - Receptores webhook y manejo de mensajes push
  - **Transporte Azure Event Hubs**: Implementación de transporte de streaming de alto rendimiento
    - Capacidades de streaming en tiempo real para escenarios de baja latencia
    - Estrategias de particionamiento y gestión de puntos de control
    - Agrupación de mensajes y optimización de rendimiento
  - **Patrones de Integración Empresarial**: Ejemplos arquitectónicos listos para producción
    - Procesamiento MCP distribuido a través de múltiples Azure Functions
    - Arquitecturas híbridas combinando varios tipos de transporte
    - Durabilidad, confiabilidad y estrategias de manejo de errores en mensajes
  - **Seguridad y Monitoreo**: Integración con Azure Key Vault y patrones de observabilidad
    - Autenticación con identidad gestionada y acceso mínimo necesario
    - Telemetría y monitoreo de rendimiento con Application Insights
    - Patrones de circuit breakers y tolerancia a fallos
  - **Frameworks de Pruebas**: Estrategias completas para pruebas de transportes personalizados
    - Pruebas unitarias con dobles y frameworks de mocking
    - Pruebas de integración con Azure Test Containers
    - Consideraciones para pruebas de rendimiento y carga

#### Ingeniería de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente de IA
- **README.md**: Exploración integral de la ingeniería de contexto como campo emergente
  - **Principios Básicos**: Compartición completa de contexto, conciencia en decisiones de acción y gestión de ventana de contexto
  - **Alineamiento con el Protocolo MCP**: Cómo el diseño MCP aborda desafíos de la ingeniería de contexto
    - Limitaciones de la ventana de contexto y estrategias de carga progresiva
    - Determinación de relevancia y recuperación dinámica de contexto
    - Manejo multimodal de contexto y consideraciones de seguridad
  - **Enfoques de Implementación**: Arquitecturas mono-hilo vs. multi-agentes
    - Segmentación y priorización de contexto
    - Carga progresiva y estrategias de compresión de contexto
    - Enfoques por capas de contexto y optimización de recuperación
  - **Marco de Medición**: Métricas emergentes para evaluación de efectividad de contexto
    - Eficiencia de entrada, rendimiento, calidad y experiencia de usuario
    - Enfoques experimentales para optimización de contexto
    - Análisis de fallos y metodologías de mejora

#### Actualizaciones en Navegación del Currículo (README.md)
- **Estructura Mejorada de Módulos**: Tabla del currículo actualizada para incluir nuevos temas avanzados
  - Añadidos Context Engineering (5.14) y Custom Transport (5.15)
  - Formato y enlaces de navegación consistentes para todos los módulos
  - Descripciones actualizadas para reflejar alcance del contenido actual

### Mejoras en Estructura de Directorios
- **Estandarización de Nombres**: Renombrado "mcp transport" a "mcp-transport" para consistencia con otras carpetas de temas avanzados
- **Organización de Contenidos**: Todas las carpetas 05-AdvancedTopics ahora siguen patrón de nombre consistente (mcp-[tema])

### Mejoras en Calidad de Documentación
- **Alineación con Especificación MCP**: Todo el contenido nuevo referencia la actual Especificación MCP 2025-06-18
- **Ejemplos Multilenguaje**: Ejemplos completos en C#, TypeScript y Python
- **Enfoque Empresarial**: Patrones listos para producción e integración con Azure Cloud en todo el contenido
- **Documentación Visual**: Diagramas Mermaid para visualización de arquitectura y flujos

## 18 de agosto de 2025

### Actualización Integral de Documentación - Estándares MCP 2025-06-18

#### Mejores Prácticas de Seguridad MCP (02-Security/) - Modernización Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescritura total alineada con Especificación MCP 2025-06-18
  - **Requerimientos Obligatorios**: Añadidos requisitos explícitos MUST/MUST NOT de la especificación oficial con indicadores visuales claros
  - **12 Prácticas Clave de Seguridad**: Reestructuradas de lista de 15 puntos a dominios comprensivos de seguridad
    - Seguridad de Tokens y Autenticación con integración de proveedor de identidad externo
    - Gestión de Sesiones y Seguridad de Transporte con requisitos criptográficos
    - Protección Específica para IA con integración Microsoft Prompt Shields
    - Control de Acceso y Permisos con principio de menor privilegio
    - Seguridad y Monitoreo de Contenido con integración Azure Content Safety
    - Seguridad de Cadena de Suministro con verificación integral de componentes
    - Seguridad OAuth y Prevención Confused Deputy con implementación PKCE
    - Respuesta y Recuperación ante Incidentes con capacidades automatizadas
    - Cumplimiento y Gobernanza con alineación regulatoria
    - Controles Avanzados de Seguridad con arquitectura de confianza cero
    - Integración con Ecosistema de Seguridad Microsoft con soluciones comprensivas
    - Evolución Continua de Seguridad con prácticas adaptativas
  - **Soluciones de Seguridad Microsoft**: Guía mejorada para integración de Prompt Shields, Azure Content Safety, Entra ID y GitHub Advanced Security
  - **Recursos de Implementación**: Enlaces categorizados por documentación oficial MCP, soluciones Microsoft, estándares de seguridad y guías de implementación

#### Controles Avanzados de Seguridad (02-Security/) - Implementación Empresarial
- **MCP-SECURITY-CONTROLS-2025.md**: revisión completa con marco de seguridad empresarial avanzado
  - **9 Dominios de Seguridad Comprensivos**: Expandido de controles básicos a marco empresarial detallado
    - Autenticación y Autorización Avanzada con integración Microsoft Entra ID
    - Seguridad de Tokens y Controles Anti-Passthrough con validación exhaustiva
    - Controles de Seguridad de Sesión con prevención de secuestro
    - Controles de Seguridad Específicos para IA con prevención de inyección de prompts y envenenamiento de herramientas
    - Prevención de Ataques Confused Deputy con seguridad en proxy OAuth
    - Seguridad en Ejecución de Herramientas con sandboxing y aislamiento
    - Controles de Seguridad en Cadena de Suministro con verificación de dependencias
    - Controles de Monitoreo y Detección con integración SIEM
    - Respuesta y Recuperación ante Incidentes con capacidades automatizadas
  - **Ejemplos de Implementación**: Añadidos bloques detallados en YAML y ejemplos de código
  - **Integración de Soluciones Microsoft**: Cobertura completa de servicios de seguridad Azure, GitHub Advanced Security y gestión de identidad empresarial

#### Seguridad en Temas Avanzados (05-AdvancedTopics/mcp-security/) - Implementación Lista para Producción
- **README.md**: Reescritura completa para implementación de seguridad empresarial
  - **Alineación con Especificación Actual**: Actualizado a Especificación MCP 2025-06-18 con requisitos de seguridad obligatorios
  - **Autenticación Mejorada**: Integración Microsoft Entra ID con ejemplos completos en .NET y Java Spring Security
  - **Integración de Seguridad IA**: Implementación de Microsoft Prompt Shields y Azure Content Safety con ejemplos detallados en Python
  - **Mitigación Avanzada de Amenazas**: Ejemplos completos para
    - Prevención de Ataques Confused Deputy con PKCE y validación de consentimiento de usuario
    - Prevención de Passthrough de Tokens con validación de audiencia y gestión segura de tokens
    - Prevención de Secuestro de Sesión con binding criptográfico y análisis comportamental
  - **Integración de Seguridad Empresarial**: Monitoreo Azure Application Insights, pipeline de detección de amenazas y seguridad de cadena de suministro
  - **Lista de Verificación de Implementación**: Controles claros obligatorios vs. recomendados con beneficios del ecosistema de seguridad Microsoft

### Calidad de Documentación y Alineación con Estándares
- **Referencias de la Especificación**: Actualizadas todas las referencias a la Especificación MCP vigente 2025-06-18  
- **Ecosistema de Seguridad de Microsoft**: Mejorada la guía de integración a lo largo de toda la documentación de seguridad  
- **Implementación Práctica**: Añadidos ejemplos de código detallados en .NET, Java y Python con patrones empresariales  
- **Organización de Recursos**: Categorización completa de documentación oficial, estándares de seguridad y guías de implementación  
- **Indicadores Visuales**: Marcado claro de requisitos obligatorios vs. prácticas recomendadas  


#### Conceptos Básicos (01-CoreConcepts/) - Modernización Completa  
- **Actualización de Versión de Protocolo**: Actualizado para referenciar la Especificación MCP vigente 2025-06-18 con versionado basado en fecha (formato AAAA-MM-DD)  
- **Refinamiento de Arquitectura**: Descripciones mejoradas de Hosts, Clientes y Servidores para reflejar patrones actuales de arquitectura MCP  
  - Hosts ahora claramente definidos como aplicaciones de IA que coordinan múltiples conexiones de clientes MCP  
  - Clientes descritos como conectores de protocolo que mantienen relaciones uno a uno con servidores  
  - Servidores mejorados con escenarios de despliegue local vs. remoto  
- **Reestructuración de Primitivas**: Renovación completa de primitivas de servidor y cliente  
  - Primitivas de Servidor: Recursos (fuentes de datos), Prompts (plantillas), Herramientas (funciones ejecutables) con explicaciones y ejemplos detallados  
  - Primitivas de Cliente: Muestreo (completaciones LLM), Elicitación (entrada del usuario), Registro (depuración/monitoreo)  
  - Actualizado con los patrones actuales de métodos de descubrimiento (`*/list`), recuperación (`*/get`) y ejecución (`*/call`)  
- **Arquitectura de Protocolo**: Introducido modelo de arquitectura de dos capas  
  - Capa de Datos: Fundamento JSON-RPC 2.0 con gestión del ciclo de vida y primitivas  
  - Capa de Transporte: Mecanismos de transporte STDIO (local) y HTTP Transmisible con SSE (remoto)  
- **Marco de Seguridad**: Principios de seguridad completos incluyendo consentimiento explícito del usuario, protección de privacidad de datos, seguridad en la ejecución de herramientas y seguridad en la capa de transporte  
- **Patrones de Comunicación**: Actualización de mensajes de protocolo para mostrar flujos de inicialización, descubrimiento, ejecución y notificación  
- **Ejemplos de Código**: Ejemplos multilenguaje actualizados (.NET, Java, Python, JavaScript) para reflejar patrones actuales del SDK MCP  

#### Seguridad (02-Security/) - Revisión de Seguridad Integral  
- **Alineación con Estándares**: Alineación total con los requisitos de seguridad de la Especificación MCP 2025-06-18  
- **Evolución en Autenticación**: Documentada la evolución desde servidores OAuth personalizados hasta delegación en proveedores de identidad externos (Microsoft Entra ID)  
- **Análisis de Amenazas Específicas de IA**: Cobertura mejorada de vectores de ataque modernos de IA  
  - Escenarios detallados de ataques de inyección de prompts con ejemplos reales  
  - Mecanismos de envenenamiento de herramientas y patrones de ataques de "rug pull"  
  - Envenenamiento de ventana de contexto y ataques de confusión de modelo  
- **Soluciones de Seguridad para IA de Microsoft**: Cobertura integral del ecosistema de seguridad de Microsoft  
  - AI Prompt Shields con técnicas avanzadas de detección, resaltado y delimitadores  
  - Patrones de integración con Azure Content Safety  
  - GitHub Advanced Security para protección de la cadena de suministro  
- **Mitigación Avanzada de Amenazas**: Controles de seguridad detallados para  
  - Secuestro de sesión con escenarios de ataque específicos MCP y requisitos criptográficos de ID de sesión  
  - Problemas de delegado confundido en escenarios proxy MCP con requisitos de consentimiento explícito  
  - Vulnerabilidades de pase de token con controles obligatorios de validación  
- **Seguridad en la Cadena de Suministro**: Cobertura ampliada de la cadena de suministro de IA incluyendo modelos fundacionales, servicios de embeddings, proveedores de contexto y APIs de terceros  
- **Seguridad en la Fundación**: Integración mejorada con patrones de seguridad empresarial incluyendo arquitectura de confianza cero y ecosistema de seguridad Microsoft  
- **Organización de Recursos**: Enlaces categorizados por tipo (Documentación Oficial, Estándares, Investigación, Soluciones Microsoft, Guías de Implementación)  

### Mejoras en la Calidad de la Documentación  
- **Objetivos de Aprendizaje Estructurados**: Objetivos de aprendizaje mejorados con resultados específicos y accionables  
- **Referencias Cruzadas**: Añadidos enlaces entre temas relacionados de seguridad y conceptos básicos  
- **Información Actualizada**: Actualizadas todas las referencias de fechas y enlaces a especificaciones vigentes  
- **Guía de Implementación**: Añadidas directrices específicas y accionables a través de ambas secciones  

## 16 de julio de 2025

### Mejoras en README y Navegación  
- Re-diseño completo de la navegación curricular en README.md  
- Reemplazadas etiquetas `<details>` por formato basado en tablas más accesible  
- Creación de opciones de diseño alternativas en nueva carpeta "alternative_layouts"  
- Añadidos ejemplos de navegación basados en tarjetas, estilo pestañas y estilo acordeón  
- Actualizada la sección de estructura del repositorio para incluir todos los archivos más recientes  
- Mejorada la sección "Cómo usar este currículo" con recomendaciones claras  
- Actualizados los enlaces a especificaciones MCP para apuntar a URLs correctas  
- Añadida la sección de Ingeniería de Contexto (5.14) a la estructura curricular  

### Actualizaciones de la Guía de Estudio  
- Guía de estudio completamente revisada para alinearse con la estructura actual del repositorio  
- Nuevas secciones para MCP Clientes y Herramientas, y Servidores MCP Populares  
- Actualizado el Mapa Visual del Currículo para reflejar con precisión todos los temas  
- Mejoradas las descripciones de Temas Avanzados para cubrir todas las áreas especializadas  
- Actualizada la sección de Estudios de Caso para reflejar ejemplos reales  
- Añadido este registro de cambios completo  

### Contribuciones de la Comunidad (06-CommunityContributions/)  
- Añadida información detallada sobre servidores MCP para generación de imágenes  
- Sección completa sobre uso de Claude en VSCode  
- Instrucciones para configuración y uso del cliente terminal Cline  
- Actualizada sección de clientes MCP para incluir todas las opciones populares  
- Mejorados los ejemplos de contribución con muestras de código más precisas  

### Temas Avanzados (05-AdvancedTopics/)  
- Organización de todas las carpetas de temas especializados con nomenclatura consistente  
- Añadidos materiales y ejemplos de ingeniería de contexto  
- Añadida documentación de integración con agente Foundry  
- Mejorada documentación de integración de seguridad Entra ID  

## 11 de junio de 2025

### Creación Inicial  
- Lanzada primera versión del currículo MCP para Principiantes  
- Estructura básica creada para las 10 secciones principales  
- Implementado Mapa Visual del Currículo para navegación  
- Añadidos proyectos de muestra iniciales en diversos lenguajes de programación  

### Primeros Pasos (03-GettingStarted/)  
- Creación de primeros ejemplos de implementación de servidor  
- Añadida guía para desarrollo de clientes  
- Instrucciones de integración de cliente LLM incluidas  
- Documentación de integración con VS Code añadida  
- Implementados ejemplos de servidores con Server-Sent Events (SSE)  

### Conceptos Básicos (01-CoreConcepts/)  
- Añadida explicación detallada de arquitectura cliente-servidor  
- Creada documentación sobre componentes clave del protocolo  
- Documentados patrones de mensajería en MCP  

## 23 de mayo de 2025

### Estructura del Repositorio  
- Inicializado el repositorio con estructura básica de carpetas  
- Creados archivos README para cada sección mayor  
- Establecida infraestructura para traducción  
- Añadidos activos visuales y diagramas  

### Documentación  
- Creado README.md inicial con visión general del currículo  
- Añadidos archivos CODE_OF_CONDUCT.md y SECURITY.md  
- Establecido SUPPORT.md con guía para obtener ayuda  
- Creada estructura preliminar de guía de estudio  

## 15 de abril de 2025

### Planificación y Marco de Trabajo  
- Planificación inicial del currículo MCP para Principiantes  
- Definidos objetivos de aprendizaje y público objetivo  
- Esbozada estructura de 10 secciones del currículo  
- Desarrollado marco conceptual para ejemplos y estudios de caso  
- Creado prototipo inicial de ejemplos para conceptos clave  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->