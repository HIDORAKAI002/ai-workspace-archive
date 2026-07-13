# Registro de cambios: Currículo MCP para Principiantes

Este documento sirve como registro de todos los cambios significativos realizados al currículo del Protocolo de Contexto de Modelo (MCP) para principiantes. Los cambios están documentados en orden cronológico inverso (los cambios más recientes primero).

## 2 de julio de 2026

### Nueva lección: Candidato a lanzamiento de la especificación MCP 2026-07-28

Se añadió cobertura del próximo candidato a lanzamiento de la especificación MCP `2026-07-28` (anunciado el 21 de mayo de 2026; lanzamiento final programado para el 28 de julio de 2026), resumido del [post oficial de anuncio en el blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). La base del currículo sigue siendo la **Especificación MCP 2025-11-25** hasta que se publique la nueva versión, por lo que esto se presenta como una guía prospectiva en lugar de una reescritura de las lecciones existentes.

- **Nuevo**: [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — una lección completa que cubre el núcleo del protocolo sin estado (eliminación del apretón de manos `initialize` y `Mcp-Session-Id`), los nuevos encabezados de enrutamiento `Mcp-Method`/`Mcp-Name`, metadatos de caché `ttlMs`/`cacheScope`, W3C Trace Context en `_meta`, el marco formal de Extensiones (Apps MCP y la nueva extensión de Tareas), seis SEPs para endurecimiento de autorización, la depreciación de Roots/Sampling/Logging, y la transición a JSON Schema 2020-12 completo para esquemas de herramientas.
- **Actualizado** con referencias prospectivas vinculadas a la nueva lección:
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md): nota sobre versión del protocolo, secciones de Sampling/Roots/Logging/Tareas, y "Qué sigue"
  - [02-Security/README.md](./02-Security/README.md): aviso de endurecimiento de autorización
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md): aviso sobre transporte sin estado
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md): aviso sobre depreciación de Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md): aviso de depreciación de Logging y extensión de Tareas
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md): aviso sobre transporte sin estado/enrutamiento de sesión
  - [README.md](./README.md): nota "Mirando hacia adelante" en la sección de especificación y una nueva entrada `1.1` en la tabla de módulos del currículo
  - [study_guide.md](./study_guide.md): viñeta prospectiva en el resumen de Conceptos Básicos y nota adicional con fecha
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md): aviso sobre el mapa de transporte `mcp-session-id` anticipándose al modelo de solicitud sin estado
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md): aviso de resumen del módulo sobre depreciaciones de Root Contexts/Sampling y la extensión de Tareas
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md): aviso de endurecimiento de autorización

## 24 de junio de 2026

### Nueva lección: Usando MCP en la aplicación Copilot

- [Sección de herramientas](./12-tooling/README.md) Añadida sección de herramientas.
- [MCP en la app Copilot](./12-tooling/01-copilot-app/README.md)

## 16 de junio de 2026

### Alineación con la Especificación MCP y Validación de Ejemplos

Se validó el currículo contra la actual **Especificación MCP 2025-11-25** y los últimos SDKs oficiales, luego se corrigieron las referencias obsoletas restantes a la especificación y se confirmó que los ejemplos principales aún se compilan y ejecutan.

#### Correcciones de versión de especificación (2025-06-18 / 2025-03-26 → 2025-11-25)

Se actualizó el contenido en inglés donde aún se indicaba que una revisión antigua de la especificación era el estándar *actual/más reciente*, y se redirigieron los enlaces a las rutas canónicas de la especificación en `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Actualizado el banner "Estándar Actual", introducción, encabezado de principios básicos de seguridad, encabezado de requisitos obligatorios, sección Microsoft Entra ID, enlaces de Referencias y Recursos, y aviso final de seguridad (8 referencias) a 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Actualizado el enlace de Recursos Adicionales a la especificación y el banner "Estándar Actual" a 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Reemplazado el enlace obsoleto `2025-03-26` de seguridad y confianza por la página actual de mejores prácticas de seguridad 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Actualizado el enlace oficial de documentación de muestreo a 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Actualizada la referencia en presente "especificación MCP actual" y el enlace de Recursos Adicionales a 2025-11-25 (notas históricas sobre la depreciación SSE se dejaron intactas para precisión)

#### Validación de ejemplos contra SDKs actuales

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolvió `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` pasó sin errores de tipos — las APIs existentes `McpServer`/`StdioServerTransport` siguen válidas
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validado en un `.venv` aislado con `mcp[cli]` (1.27.2); `py_compile` pasó y `FastMCP.list_tools()` devolvió correctamente las herramientas `add` y `subtract`
- Confirmado que todos los rangos de versión de `@modelcontextprotocol/sdk` en los ejemplos (`>=1.26.0` / `^1.26.0` / `^1.27.0`) se resuelven sin problemas a la actual `1.29.0` sin cambios importantes en la API

#### Alineación de versiones de dependencias (cerrando brechas)

Se actualizaron pines de SDK desactualizados para que cada ejemplo siga la versión actual de MCP, coincidiento con la convención del repositorio:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Actualizado `@modelcontextprotocol/sdk` de `^1.8.0` a `>=1.26.0` y actualizada la descripción caduca del paquete `"updated for MCP 2025-06-18"` a `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** y **lab4/code/github_mcp_server/pyproject.toml**: Actualizado el pin exacto `mcp==1.23.0` a `mcp>=1.26.0`; regenerados ambos archivos `uv.lock` (`uv lock`) para que los lockfiles se resuelvan en la actual `mcp 1.27.2` y se mantengan sincronizados con los manifiestos

#### Análisis de brechas en el currículo — Cobertura de características de la última especificación

Verificado que el currículo ya cubre todos los elementos introducidos/ampliados en MCP 2025-11-25, por lo que no quedan brechas de contenido:
- **Sampling**: Lección 03-GettingStarted/14-sampling más 05-AdvancedTopics/mcp-sampling
- **Elicitation (incl. modo URL)**: Documentado en 01-CoreConcepts y 05-AdvancedTopics/mcp-protocol-features
- **Roots**: Documentado en 00-Introduction, 01-CoreConcepts y 05-AdvancedTopics/mcp-root-contexts
- **Tareas (experimental, operaciones de larga duración)**: Documentado en 01-CoreConcepts y 05-AdvancedTopics/mcp-protocol-features
- **Anotaciones de herramientas** (`readOnlyHint` / `destructiveHint`): Documentadas en 01-CoreConcepts y 05-AdvancedTopics/mcp-protocol-features

### Endurecimiento de seguridad y remediación de vulnerabilidades de dependencias

Se realizó un pase completo de seguridad en cada manifiesto de dependencias y en el código fuente de los ejemplos, luego se remediaron todos los avisos de npm y un hallazgo a nivel de código. Después de la remediación, `npm audit` reporta **0 vulnerabilidades** en cada directorio auditado.

#### Vulnerabilidades de dependencias npm (transitivas) — Corregidas

Se auditaron todos los 15 archivos `package-lock.json` comprometidos. Las vulnerabilidades se limitaron a dependencias transitivas traídas por la herramienta de desarrollo MCP Inspector, el cliente OpenAI, y el SDK MCP; todas ahora resueltas sin romper los ejemplos:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** y **lab3/code/weather_mcp/inspector**: Actualizado `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), lo que aclaró los avisos empaquetados de `ajv`, `brace-expansion`, `diff`, `path-to-regexp` y `ws`. Añadida una entrada `overrides` en npm forzando la versión parcheada `shell-quote@1.8.4` para eliminar el aviso crítico restante llevado por `concurrently`; regenerados ambos lockfiles (ahora 0 vulnerabilidades)
- **03-GettingStarted/samples/typescript**: `npm audit fix` actualizó la dependencia transitoria `qs` (moderada) a una versión parcheada
- **03-GettingStarted/samples/javascript**: `npm audit fix` actualizó la dependencia transitoria `hono` (moderada) a una versión parcheada
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` actualizó la dependencia transitoria `form-data` (alta) a una versión parcheada
- **03-GettingStarted/11-simple-auth/solution/typescript**: Generado el `package-lock.json` faltante para que el proyecto sea reproducible y auditable (0 vulnerabilidades)

#### Corrección de seguridad a nivel de código (OWASP A03: Inyección)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Eliminado `shell=True` de la herramienta `open_in_vscode`. La previa llamada `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permitía que meta-caracteres de shell en la ruta de la carpeta fueran interpretados por `cmd.exe` (vector de inyección de comandos). Ahora lanza directamente el ejecutable `Code.exe` resuelto con la carpeta como argumento — sin shell — lo que es funcionalmente equivalente y seguro

#### Auditoría de dependencias Python

- Auditados todos los conjuntos de requisitos Python con `pip-audit`. `05-AdvancedTopics` y `03-GettingStarted/samples/python` no reportaron **vulnerabilidades conocidas** (sus rangos para `mcp` / `httpx` / `pydantic` / `python-dotenv` resuelven a versiones parcheadas actuales)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` marcó la dependencia transitiva **`werkzeug` 3.1.1** con tres avisos DoS por nombres de dispositivo Windows en `safe_join` — `CVE-2025-66221`, `CVE-2026-21860` y `CVE-2026-27199` (todos corregidos en 3.1.6). Añadido un pin de seguridad explícito `werkzeug>=3.1.6` para resolver la versión parcheada; verificado que esta restricción se resuelve correctamente con el stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding del nombre del producto

Se actualizó todo el contenido del currículo para reflejar el rebranding del producto de Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Actualizado enlace a la comunidad de Discord
- **AGENTS.md**: Actualizada referencia al servidor de Discord
- **README.md**: Actualizadas referencias al ecosistema tecnológico
- **study_guide.md**: Actualizadas referencias de estudio de caso
- **05-AdvancedTopics/README.md**: Actualizado título y descripción del Módulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Actualizado encabezado de sección y descripción
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Actualización completa del título y contenido del módulo
- **05-AdvancedTopics/mcp-security-entra/README.md**: Actualizado enlace de referencia cruzada
- **07-LessonsfromEarlyAdoption/README.md**: Actualizadas referencias del estudio de caso
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Actualizado encabezado de la Sección 9, insignias y capacidades
- **08-BestPractices/README.md**: Actualizado enlace a la comunidad de Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Actualizada referencia al canal de Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Actualizada referencia a despliegue de modelos
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Actualizada tabla de Servicios de IA
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Actualizadas referencias de recursos

#### AI Toolkit / AITK → Extensión Microsoft Foundry Toolkit para VS Code

- **README.md**: Referencias principales del plan de estudios actualizadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Título del módulo, descripción general y todos los encabezados del módulo actualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Título, objetivos de aprendizaje, instrucciones de configuración y recursos actualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Título, objetivos de aprendizaje, tabla de hosts MCP y referencias cruzadas actualizadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Título, insignias, prerequisitos y recursos actualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Referencias de Agent Builder y enlace de retroalimentación actualizados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Prerrequisitos y referencias a extensiones actualizados

---

## 11 de abril de 2026

### Nueva lección, correcciones en la documentación y actualizaciones de dependencias

#### Contenido nuevo añadido al plan de estudios

**Módulo 05 - Temas Avanzados**
- **Lección 5.17: Razonamiento multiagente adversarial con MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Nueva guía completa que cubre el patrón de debate adversarial para sistemas multiagente
  - Diagrama de arquitectura Mermaid: dos agentes → servidor MCP compartido → transcripción del debate → juez → veredicto
  - Servidor de herramientas MCP compartido (`web_search` + `run_python`) implementado en Python y TypeScript
  - Prompts del sistema contrapuestos (A FAVOR / EN CONTRA / Juez) con requisitos explícitos de uso de herramientas
  - Orquestador de debate en Python, TypeScript y C# que gestiona rondas y enrutamiento de argumentos
  - Cableado MCP `ClientSession` para que el orquestador ejecute llamadas reales a herramientas
  - Tabla de casos de uso (detección de alucinaciones, modelado de amenazas, revisión de diseño de API, verificación factual, selección tecnológica)
  - Consideraciones de seguridad: ejecución en sandbox, validación de llamadas a herramientas, limitación de tasa, registro de auditoría
  - Ejercicio estructurado con tres escenarios prácticos (revisión de código, decisión arquitectónica, moderación de contenido)

#### Correcciones en la documentación

**Módulo 03 - Primeros pasos**
- **05-stdio-server/README.md**: Corrección de ejemplo incompleto de servidor stdio en TypeScript — se añadió la instanciación de transporte faltante (`new StdioServerTransport()`) y llamada `server.connect(transport)` para coincidir con ejemplos de Python y .NET en la misma sección
- **14-sampling/README.md**: Corrección tipográfica — corregido `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Actualizaciones del plan de estudios

**README.md principal**
- Se añadió la entrada 5.17 (Razonamiento multiagente adversarial con MCP) a la tabla del plan de estudios con enlace directo a la nueva lección

**05-AdvancedTopics/README.md**
- Se añadió la fila de la lección 5.17 a la tabla de lecciones

**study_guide.md**
- Se añadió el tema de razonamiento multiagente adversarial al mapa mental y a la descripción en prosa de Temas Avanzados

#### Correcciones de código y seguridad

**Módulo 05 - Agentes adversariales (`mcp-adversarial-agents`)**
- **Corrección de seguridad — inyección de comandos**: Se reemplazó la interpolación en shell de `execSync` por `execFile` + `promisify` en la herramienta `run_python` de TypeScript, eliminando la superficie de inyección de comandos (el código controlado por LLM ahora se pasa como un elemento argv literal sin participación del shell)
- **Cableado del bucle de herramientas MCP**: Se actualizó el orquestador de debate en Python para usar cliente `AsyncAnthropic` (reemplazando `Anthropic` síncrono bloqueante), pasar una `ClientSession` activa directamente a cada turno del agente, obtener definiciones de herramientas vía `session.list_tools()` cada turno, y despachar bloques `tool_use` vía `session.call_tool()` en un bucle hasta que el modelo emite una respuesta textual final

#### Actualizaciones de dependencias

- Se actualizó `hono` a 4.12.12 en varios paquetes (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Se actualizó `@hono/node-server` de 1.19.11 a 1.19.13 en paquetes TypeScript
- Se actualizó `cryptography` de 46.0.5 a 46.0.7 en paquetes Python (laboratorios 3 y 4 de 10-StreamliningAIWorkflows)
- Se actualizó `lodash` de 4.17.23 a 4.18.1 en inspector de 10-StreamliningAIWorkflows

#### Traducciones

- Traducciones sincronizadas para 48+ idiomas con los últimos cambios en el código fuente (actualización i18n)

---

## 5 de febrero de 2026

### Mejoras en validación y navegación en todo el repositorio

#### Contenido nuevo añadido al plan de estudios

**Módulo 03 - Primeros pasos**
- **12-mcp-hosts/README.md**: Nueva guía integral para configurar hosts MCP
  - Ejemplos de configuración para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Plantillas JSON de configuración para todos los hosts principales
  - Tabla comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Solución de problemas comunes de conexión
  - Mejores prácticas de seguridad para configuración de hosts

- **13-mcp-inspector/README.md**: Nueva guía de depuración para MCP Inspector
  - Métodos de instalación (npx, npm global, desde la fuente)
  - Conexión a servidores vía stdio y HTTP/SSE
  - Pruebas de herramientas, recursos y flujos de prompts
  - Integración con VS Code para MCP Inspector
  - Escenarios comunes de depuración con soluciones

**Módulo 04 - Implementación práctica**
- **pagination/README.md**: Nueva guía de implementación de paginación
  - Patrones de paginación basados en cursor en Python, TypeScript, Java
  - Manejo de paginación del lado del cliente
  - Estrategias de diseño de cursor (opaco vs estructurado)
  - Recomendaciones para optimización de rendimiento

**Módulo 05 - Temas Avanzados**
- **mcp-protocol-features/README.md**: Nueva profundización en características del protocolo
  - Implementación de notificaciones de progreso
  - Patrones de cancelación de solicitudes
  - Plantillas de recursos con patrones URI
  - Gestión del ciclo de vida del servidor
  - Control de nivel de registro
  - Patrones de manejo de errores con códigos JSON-RPC

#### Correcciones de navegación (24+ archivos actualizados)

**READMEs de módulos principales**
 Ahora enlaza tanto a la primera lección como al siguiente módulo

**Sub-archivos 02-Security**
- Los 5 documentos complementarios de seguridad ahora tienen navegación de "Qué sigue":

**Archivos 09-CaseStudy**
- Todos los archivos de estudios de caso tienen ahora navegación secuencial:

**Laboratorios 10-StreamliningAI**
Se añadió sección Qué sigue al resumen del Módulo 10 y al Módulo 11

#### Correcciones de código y contenido

**Actualizaciones de SDK y dependencias**
Se corrigió versión vacía de openai a `^4.95.0`
Se actualizó SDK de `^1.8.0` a `>=1.26.0`
Se actualizaron versiones fijadas de mcp a `>=1.26.0`

**Correcciones de código**
Se corrigió modelo inválido `gpt-4o-mini` a `gpt-4.1-mini`

**Correcciones de contenido**
Se corrigió enlace roto `READMEmd` → `README.md`, encabezado del plan de estudios `Module 1-3` → `Module 0-3`, se corrigió ruta sensible a mayúsculas
Se eliminó contenido duplicado corrupto del Estudio de Caso 5

**Mejoras en la guía para principiantes**
Se añadió introducción adecuada, objetivos de aprendizaje y prerequisitos para principiantes

#### Actualizaciones del plan de estudios

**README.md principal**
- Se añadieron entradas 3.12 (Hosts MCP), 3.13 (Inspector MCP), 4.1 (Paginación), 5.16 (Características del protocolo) a la tabla del plan de estudios

**READMEs de módulos**
Se añadieron lecciones 12 y 13 a la lista de lecciones
Se añadió sección de guías prácticas con enlace a paginación
Se añadieron lecciones 5.15 (Transporte personalizado) y 5.16 (Características del protocolo)

**study_guide.md**
- Se actualizó el mapa mental con todos los temas nuevos: Configuración de Hosts MCP, Inspector MCP, Estrategias de Paginación, Profundización en Características del Protocolo

## 28 de enero de 2026

### Revisión de cumplimiento de la especificación MCP 2025-11-25

#### Mejoras en conceptos básicos (01-CoreConcepts/)
- **Primitiva cliente nueva - Roots**: Se añadió documentación completa sobre la primitiva roots del cliente, permitiendo a los servidores entender límites y permisos del sistema de archivos
- **Anotaciones de herramientas**: Se añadió documentación sobre anotaciones de comportamiento de herramientas (`readOnlyHint`, `destructiveHint`) para mejores decisiones en la ejecución de herramientas
- **Llamadas a herramientas en Sampling**: Se actualizó la documentación de Sampling para incluir parámetros `tools` y `toolChoice` para invocación guiada por modelo de herramientas durante solicitudes de muestreo
- **Elicitación de modo URL**: Se añadió documentación sobre elicitation basada en URL para interacciones web externas iniciadas por el servidor
- **Tareas (Experimental)**: Se añadió nueva sección documentando la función experimental de Tareas para wrappers de ejecución duradera y recuperación diferida de resultados
- **Soporte de íconos**: Se indicó que herramientas, recursos, plantillas de recursos y prompts ahora pueden incluir íconos como metadatos adicionales

#### Actualizaciones de documentación
- **README.md**: Se añadió referencia a la versión de la especificación MCP 2025-11-25 y explicación de versiones basadas en fechas
- **study_guide.md**: Se actualizó el mapa curricular para incluir Tareas y Anotaciones de Herramientas en la sección Conceptos Básicos; se actualizó la marca de tiempo del documento

#### Verificación de cumplimiento de la especificación
- **Versión del protocolo**: Se verificó que toda la documentación referencia la especificación MCP 2025-11-25 actual
- **Alineación arquitectónica**: Se confirmó exactitud de la documentación de arquitectura de dos capas (Capa de datos + Capa de transporte)
- **Documentación de primitivas**: Se validaron primitivas del servidor (Recursos, Prompts, Herramientas) y primitivas del cliente (Sampling, Elicitation, Logging, Roots)
- **Mecanismos de transporte**: Se verificó exactitud de la documentación de transporte STDIO y HTTP Streamable
- **Guías de seguridad**: Se confirmó alineación con la documentación actual de mejores prácticas de seguridad MCP

#### Características clave de MCP 2025-11-25 documentadas
- **Descubrimiento OpenID Connect**: Descubrimiento de servidor de autenticación a través de OIDC
- **Metadatos OAuth Client ID**: Mecanismo recomendado para registro de clientes
- **JSON Schema 2020-12**: Dialecto por defecto para definiciones de esquemas MCP
- **Sistema de clasificación del SDK**: Requisitos formalizados para soporte y mantenimiento de características del SDK
- **Estructura de gobernanza**: Formalización de Grupos de Trabajo y Grupos de Interés en la gobernanza MCP

### Actualización mayor de la documentación de seguridad (02-Security/)

#### Integración con MCP Security Summit Workshop (Sherpa)
- **Nuevo recurso de formación práctica**: Se añadió integración completa con el [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) en toda la documentación de seguridad
- **Cobertura de ruta de expedición**: Documentación completa de la progresión campamento a campamento desde Base Camp hasta Cumbre
- **Alineación con OWASP**: Toda la guía de seguridad ahora mapea los riesgos OWASP del MCP Azure Security Guide

#### Integración con OWASP MCP Top 10
- **Nueva sección**: Se añadió tabla de riesgos de seguridad OWASP MCP Top 10 con mitigaciones Azure al README principal de Seguridad
- **Documentación basada en riesgos**: Se actualizó mcp-security-controls-2025.md con referencias a riesgos OWASP MCP para cada dominio de seguridad
- **Arquitectura de referencia**: Se enlazó a la arquitectura de referencia OWASP MCP Azure Security Guide y patrones de implementación

#### Archivos de seguridad actualizados
- **README.md**: Se añadió resumen del taller Sherpa, tabla de ruta de expedición, resumen de riesgos OWASP MCP Top 10 y sección de formación práctica
- **mcp-security-controls-2025.md**: Se actualizó encabezado a febrero de 2026, se añadieron referencias a riesgos OWASP (MCP01-MCP08), se corrigió inconsistencia en versión de especificación
- **mcp-security-best-practices-2025.md**: Se añadió sección de recursos Sherpa y OWASP, actualización de marca temporal
- **mcp-best-practices.md**: Se añadió sección de formación práctica con enlaces a Sherpa y OWASP
- **azure-content-safety-implementation.md**: Se añadió referencia OWASP MCP06, alineación con Sherpa Camp 3 y sección de recursos adicionales

#### Nuevos enlaces a recursos añadidos
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuales de riesgos OWASP MCP (MCP01-MCP10)

### Alineación con la especificación MCP 2025-11-25 en todo el plan de estudios

#### Módulo 03 - Primeros pasos
- **Documentación SDK**: Se añadió Go SDK a la lista oficial de SDK; se actualizaron todas las referencias SDK para alinearlas con la especificación MCP 2025-11-25
- **Clarificación de transporte**: Se actualizaron descripciones de transporte STDIO y HTTP Streaming con referencias explícitas a especificación

#### Módulo 04 - Implementación práctica
- **Actualizaciones SDK**: Se añadió Go SDK; se actualizó la lista de SDK con referencia a la versión de la especificación
- **Especificación de autorización**: Se actualizó enlace a la especificación MCP Authorization a la versión actual 2025-11-25

#### Módulo 05 - Temas avanzados
- **Nuevas características**: Se añadió nota sobre nuevas características de la especificación MCP 2025-11-25 (Tareas, Anotaciones de Herramientas, Elicitación de modo URL, Roots)
- **Recursos de seguridad**: Se añadieron enlaces a OWASP MCP Top 10 y taller Sherpa a referencias adicionales

#### Módulo 06 - Contribuciones de la comunidad
- **Lista SDK**: Se añadieron SDKs Swift y Rust; se actualizó enlace a especificación a 2025-11-25
- **Referencia a especificación**: Se actualizó enlace de especificación MCP a URL directa de especificación

#### Módulo 07 - Lecciones de adopción temprana

- **Actualizaciones de Recursos**: Se agregó enlace a la Especificación MCP 2025-11-25 y OWASP MCP Top 10 a recursos adicionales

#### Módulo 08 - Mejores Prácticas
- **Versión de la Especificación**: Se actualizó la referencia a la Especificación MCP a la versión 2025-11-25
- **Recursos de Seguridad**: Se agregaron OWASP MCP Top 10 y taller Sherpa a referencias adicionales

#### Módulo 10 - Optimización de Flujos de Trabajo de IA
- **Actualización del Badge**: Cambio del badge de versión MCP de la versión del SDK (1.9.3) a la versión de la especificación (2025-11-25)
- **Enlaces de Recursos**: Se actualizó el enlace a la Especificación MCP; se añadió OWASP MCP Top 10

#### Módulo 11 - Laboratorios Prácticos del Servidor MCP
- **Referencia de la Especificación**: Se actualizó el enlace a la Especificación MCP a la versión 2025-11-25
- **Recursos de Seguridad**: Se agregó OWASP MCP Top 10 a los recursos oficiales

## 18 de diciembre de 2025

### Actualización de Documentación de Seguridad - Especificación MCP 2025-11-25

#### Mejores Prácticas de Seguridad MCP (02-Security/mcp-best-practices.md) - Actualización de Versión de Especificación
- **Actualización de Versión de Protocolo**: Se actualizó para hacer referencia a la última Especificación MCP 2025-11-25 (lanzada el 25 de noviembre de 2025)
  - Se actualizaron todas las referencias de la versión de especificación de 2025-06-18 a 2025-11-25
  - Se actualizaron las fechas de documentos de 18 de agosto de 2025 a 18 de diciembre de 2025
  - Se verificó que todas las URLs de especificación apunten a la documentación actual
- **Validación de Contenido**: Validación exhaustiva de las mejores prácticas de seguridad conforme a los estándares más recientes
  - **Soluciones de Seguridad de Microsoft**: Se verificó la terminología actual y enlaces para Prompt Shields (antes "detección de riesgo de jailbreak"), Azure Content Safety, Microsoft Entra ID y Azure Key Vault
  - **Seguridad OAuth 2.1**: Confirmado alineamiento con las mejores prácticas de seguridad OAuth más recientes
  - **Estándares OWASP**: Validada la vigencia de las referencias a OWASP Top 10 para LLMs
  - **Servicios de Azure**: Verificados todos los enlaces y mejores prácticas de documentación de Microsoft Azure
- **Alineación con Estándares**: Confirmados todos los estándares de seguridad referenciados como actuales
  - Marco de Gestión de Riesgos de IA de NIST
  - ISO 27001:2022
  - Mejores Prácticas de Seguridad OAuth 2.1
  - Marcos de seguridad y cumplimiento de Azure
- **Recursos de Implementación**: Verificados todos los enlaces y recursos para guías de implementación
  - Patrones de autenticación de Azure API Management
  - Guías de integración de Microsoft Entra ID
  - Administración de secretos en Azure Key Vault
  - Pipelines DevSecOps y soluciones de monitoreo

### Aseguramiento de la Calidad de la Documentación
- **Cumplimiento de Especificaciones**: Se aseguró que todos los requisitos de seguridad MCP obligatorios (MUST/MUST NOT) estén alineados con la última especificación
- **Actualización de Recursos**: Se verificaron todos los enlaces externos a documentación Microsoft, estándares de seguridad y guías de implementación
- **Cobertura de Mejores Prácticas**: Confirmada cobertura integral de autenticación, autorización, amenazas específicas de IA, seguridad de cadena de suministro y patrones empresariales

## 6 de octubre de 2025

### Expansión de la Sección de Introducción – Uso Avanzado de Servidores y Autenticación Simple

#### Uso Avanzado del Servidor (03-GettingStarted/10-advanced)
- **Nuevo Capítulo Añadido**: Guía completa sobre uso avanzado del servidor MCP, cubriendo arquitecturas de servidor regulares y de bajo nivel.
  - **Servidor Regular vs. de Bajo Nivel**: Comparación detallada y ejemplos de código en Python y TypeScript para ambos enfoques.
  - **Diseño Basado en Handlers**: Explicación de gestión basada en handlers para herramientas/recursos/prompt para implementaciones escalables y flexibles.
  - **Patrones Prácticos**: Escenarios reales donde patrones de servidor de bajo nivel son útiles para funciones y arquitecturas avanzadas.

#### Autenticación Simple (03-GettingStarted/11-simple-auth)
- **Nuevo Capítulo Añadido**: Guía paso a paso para implementar autenticación simple en servidores MCP.
  - **Conceptos de Autenticación**: Explicación clara de autenticación vs. autorización y manejo de credenciales.
  - **Implementación Básica de Auth**: Patrones de autenticación basados en middleware en Python (Starlette) y TypeScript (Express), con ejemplos de código.
  - **Progresión hacia Seguridad Avanzada**: Guía para comenzar con autenticación simple y avanzar a OAuth 2.1 y RBAC, con referencias a módulos de seguridad avanzada.

Estas adiciones brindan orientación práctica y aplicada para construir implementaciones de servidores MCP más robustas, seguras y flexibles, conectando conceptos fundamentales con patrones avanzados de producción.

## 29 de septiembre de 2025

### Laboratorios de Integración de Base de Datos de Servidor MCP - Ruta Completa de Aprendizaje Práctico

#### 11-MCPServerHandsOnLabs - Nuevo Currículo Completo de Integración de Base de Datos
- **Ruta de Aprendizaje Completa de 13 Laboratorios**: Se agregó currículo práctico completo para construir servidores MCP listos para producción con integración de base de datos PostgreSQL
  - **Implementación Real**: Caso de uso analítico de Zava Retail demostrando patrones de nivel empresarial
  - **Progresión de Aprendizaje Estructurada**:
    - **Laboratorios 00-03: Fundamentos** - Introducción, Arquitectura Central, Seguridad y Multi-Tenancy, Configuración del Entorno
    - **Laboratorios 04-06: Construcción del Servidor MCP** - Diseño y Esquema de Base de Datos, Implementación del Servidor MCP, Desarrollo de Herramientas
    - **Laboratorios 07-09: Funciones Avanzadas** - Integración de Búsqueda Semántica, Pruebas y Depuración, Integración en VS Code
    - **Laboratorios 10-12: Producción y Mejores Prácticas** - Estrategias de Despliegue, Monitoreo y Observabilidad, Mejores Prácticas y Optimización
  - **Tecnologías Empresariales**: Framework FastMCP, PostgreSQL con pgvector, embeddings de Azure OpenAI, Azure Container Apps, Application Insights
  - **Funciones Avanzadas**: Seguridad a Nivel de Fila (RLS), búsqueda semántica, acceso multi-inquilino a datos, embeddings vectoriales, monitoreo en tiempo real

#### Estandarización de Terminología - Conversión de Módulo a Laboratorio
- **Actualización Integral de Documentación**: Se actualizó sistemáticamente todos los archivos README en 11-MCPServerHandsOnLabs para usar la terminología "Laboratorio" en lugar de "Módulo"
  - **Encabezados de Sección**: Se actualizó "What This Module Covers" a "What This Lab Covers" en los 13 laboratorios
  - **Descripción del Contenido**: Cambiado "This module provides..." a "This lab provides..." en toda la documentación
  - **Objetivos de Aprendizaje**: Actualizado "By the end of this module..." a "By the end of this lab..."
  - **Enlaces de Navegación**: Convertidas todas las referencias "Module XX:" a "Lab XX:" en referencias cruzadas y navegación
  - **Seguimiento de Finalización**: Actualizado "After completing this module..." a "After completing this lab..."
  - **Referencias Técnicas Conservadas**: Mantenidas referencias a módulos Python en archivos de configuración (ej. `"module": "mcp_server.main"`)

#### Mejora de la Guía de Estudio (study_guide.md)
- **Mapa Visual del Currículo**: Se añadió nueva sección "11. Laboratorios de Integración de Base de Datos" con visualización completa de la estructura de laboratorios
- **Estructura del Repositorio**: Actualizada de diez a once secciones principales con descripción detallada de 11-MCPServerHandsOnLabs
- **Orientación en la Ruta de Aprendizaje**: Mejora en instrucciones de navegación para cubrir secciones 00-11
- **Cobertura Tecnológica**: Añadidos detalles de integración FastMCP, PostgreSQL y servicios Azure
- **Resultados de Aprendizaje**: Enfasis en desarrollo de servidor listo para producción, patrones de integración de base de datos y seguridad empresarial

#### Mejora de la Estructura del README Principal
- **Terminología Basada en Laboratorios**: Se actualizó README.md principal en 11-MCPServerHandsOnLabs para usar consistentemente estructura de "Laboratorio"
- **Organización de la Ruta de Aprendizaje**: Progresión clara desde conceptos fundamentales, implementación avanzada hasta despliegue en producción
- **Enfoque en Casos Reales**: Énfasis en aprendizaje práctico con patrones y tecnologías empresariales

### Mejoras de Calidad y Consistencia en la Documentación
- **Enfoque en Aprendizaje Práctico**: Refuerzo del enfoque basado en laboratorios practicos en toda la documentación
- **Enfoque en Patrones Empresariales**: Destacado implementaciones listas para producción y consideraciones de seguridad empresarial
- **Integración Tecnológica**: Cobertura integral de servicios modernos de Azure y patrones de integración de IA
- **Progresión de Aprendizaje**: Ruta clara y estructurada desde conceptos básicos hasta despliegue en producción

## 26 de septiembre de 2025

### Mejora de Estudios de Caso - Integración del Registro MCP de GitHub

#### Estudios de Caso (09-CaseStudy/) - Enfoque en Desarrollo del Ecosistema
- **README.md**: Gran expansión con estudio de caso completo del Registro MCP de GitHub
  - **Estudio de Caso del Registro MCP de GitHub**: Nuevo estudio detallado sobre el lanzamiento del Registro MCP en GitHub en septiembre de 2025
    - **Análisis del Problema**: Examen detallado de la fragmentación en descubrimiento e implementación de servidores MCP
    - **Arquitectura de Solución**: Enfoque centralizado de registro de GitHub con instalación con un clic en VS Code
    - **Impacto Comercial**: Mejoras cuantificables en incorporación y productividad de desarrolladores
    - **Valor Estratégico**: Enfoque en despliegue modular de agentes e interoperabilidad entre herramientas
    - **Desarrollo del Ecosistema**: Posición como plataforma fundamental para integración agentica
  - **Estructura Mejorada del Estudio**: Actualizados los siete estudios de caso con formato consistente y descripciones completas
    - Agentes de Viaje AI Azure: Enfoque en orquestación multi-agente
    - Integración Azure DevOps: Enfoque en automatización de flujos de trabajo
    - Recuperación de Documentación en Tiempo Real: Cliente de consola Python implementado
    - Generador de Plan de Estudio Interactivo: Aplicación web conversacional Chainlit
    - Documentación en el Editor: Integración en VS Code y GitHub Copilot
    - Azure API Management: Patrones de integración de API empresariales
    - Registro MCP de GitHub: Desarrollo del ecosistema y plataforma comunitaria
  - **Conclusión Completa**: Sección de conclusión reescrita destacando siete estudios de caso que abarcan múltiples dimensiones de implementación MCP
    - Integración Empresarial, Orquestación Multi-Agente, Productividad del Desarrollador
    - Desarrollo del Ecosistema, Categorías de Aplicaciones Educativas
    - Perspectivas mejoradas sobre patrones de arquitectura, estrategias de implementación y mejores prácticas
    - Énfasis en MCP como protocolo maduro y listo para producción

#### Actualizaciones de la Guía de Estudio (study_guide.md)
- **Mapa Visual del Currículo**: Se actualizó el mapa mental para incluir el Registro MCP de GitHub en la sección de Estudios de Caso
- **Descripción de Estudios de Caso**: Mejorada de descripciones genéricas a desglose detallado de siete estudios completos
- **Estructura del Repositorio**: Actualizada la sección 10 para reflejar cobertura completa de estudios de caso con detalles específicos de implementación
- **Integración de Changelog**: Añadida entrada del 26 de septiembre de 2025 documentando adición del Registro MCP de GitHub y mejoras en estudios de caso
- **Actualización de Fechas**: Actualizado el timestamp del pie de página para reflejar la última revisión (26 de septiembre de 2025)

### Mejoras en la Calidad de la Documentación
- **Mejora de Consistencia**: Formato y estructura de estudios de caso estandarizados en los siete ejemplos
- **Cobertura Integral**: Los estudios de caso ahora abarcan escenarios empresariales, productividad de desarrolladores y desarrollo de ecosistemas
- **Posicionamiento Estratégico**: Mayor enfoque en MCP como plataforma fundamental para despliegue de sistemas agenticos
- **Integración de Recursos**: Se actualizaron recursos adicionales para incluir enlace al Registro MCP de GitHub

## 15 de septiembre de 2025

### Expansión de Temas Avanzados - Transportes Personalizados y Ingeniería de Contexto

#### Transportes Personalizados MCP (05-AdvancedTopics/mcp-transport/) - Nueva Guía Avanzada de Implementación
- **README.md**: Guía completa de implementación para mecanismos personalizados de transporte MCP
  - **Transporte Azure Event Grid**: Implementación comprensiva de transporte impulsado por eventos serverless
    - Ejemplos en C#, TypeScript y Python con integración de Azure Functions
    - Patrones de arquitectura basada en eventos para soluciones MCP escalables
    - Receptores webhook y manejo de mensajes push
  - **Transporte Azure Event Hubs**: Implementación de transporte streaming de alto rendimiento
    - Capacidades de streaming en tiempo real para escenarios de baja latencia
    - Estrategias de particionado y gestión de checkpoints
    - Agrupación de mensajes y optimización de rendimiento
  - **Patrones de Integración Empresarial**: Ejemplos arquitectónicos listos para producción
    - Procesamiento MCP distribuido mediante múltiples Azure Functions
    - Arquitecturas híbridas de transporte combinando múltiples tipos de transporte
    - Durabilidad, confiabilidad y manejo de errores en mensajes
  - **Seguridad y Monitoreo**: Integración con Azure Key Vault y patrones de observabilidad
    - Autenticación con identidad gestionada y acceso de menor privilegio
    - Telemetría de Application Insights y monitoreo de rendimiento
    - Disyuntores y patrones de tolerancia a fallos
  - **Frameworks de Pruebas**: Estrategias integrales para pruebas de transportes personalizados
    - Pruebas unitarias con dobles de prueba y frameworks de mocks
    - Pruebas de integración con Azure Test Containers
    - Consideraciones de pruebas de rendimiento y carga

#### Ingeniería de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente de IA
- **README.md**: Exploración comprensiva de ingeniería de contexto como un campo emergente
  - **Principios Básicos**: Compartición completa de contexto, conciencia de decisiones de acción y gestión de ventana de contexto
  - **Alineamiento con Protocolo MCP**: Cómo el diseño MCP aborda los retos de ingeniería de contexto
    - Limitaciones de ventana de contexto y estrategias de carga progresiva
    - Determinación de relevancia y recuperación dinámica de contexto
    - Manejo multimodal de contexto y consideraciones de seguridad
  - **Enfoques de Implementación**: Arquitecturas de un solo hilo vs. multi-agente
    - Fragmentación y técnicas de priorización de contexto
    - Estrategias de carga progresiva y compresión de contexto
    - Enfoques en capas y optimización de recuperación de contexto
  - **Marco de Medición**: Métricas emergentes para evaluación de efectividad del contexto
    - Eficiencia de entrada, rendimiento, calidad y consideraciones de experiencia de usuario
    - Enfoques experimentales para optimización del contexto
    - Análisis de fallos y metodologías de mejora

#### Actualizaciones de Navegación del Currículo (README.md)
- **Estructura Mejorada de Módulos**: Se actualizó la tabla de currículo para incluir nuevos temas avanzados
  - Añadidos Ingeniería de Contexto (5.14) y Transporte Personalizado (5.15)
  - Formato consistente y enlaces de navegación en todos los módulos
  - Descripciones actualizadas para reflejar alcance actual del contenido

### Mejoras en la Estructura de Directorios
- **Estandarización de Nombres**: Renombrado "mcp transport" a "mcp-transport" para consistencia con otras carpetas de temas avanzados
- **Organización de Contenido**: Todas las carpetas 05-AdvancedTopics ahora siguen patrón de nombre consistente (mcp-[topic])

### Mejoras en la Calidad de la Documentación
- **Alineamiento con Especificación MCP**: Todo el contenido nuevo referencia la Especificación MCP actual 2025-06-18
- **Ejemplos Multilenguaje**: Ejemplos de código completos en C#, TypeScript y Python

- **Enfoque Empresarial**: Patrones listos para producción e integración con la nube Azure en todo
- **Documentación Visual**: Diagramas Mermaid para visualización de arquitectura y flujos

## 18 de agosto de 2025

### Actualización Integral de la Documentación - Normas MCP 2025-06-18

#### Buenas Prácticas de Seguridad MCP (02-Security/) - Modernización Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescritura completa alineada con la Especificación MCP 2025-06-18
  - **Requisitos Obligatorios**: Añadidos requisitos MUST/MUST NOT explícitos de la especificación oficial con indicadores visuales claros
  - **12 Prácticas Clave de Seguridad**: Reestructuradas de una lista de 15 ítems a dominios de seguridad completos
    - Seguridad de Tokens y Autenticación con integración de proveedor de identidad externo
    - Gestión de Sesiones y Seguridad en Transporte con requisitos criptográficos
    - Protección de Amenazas Específicas de IA con integración de Microsoft Prompt Shields
    - Control de Acceso y Permisos con principio de privilegio mínimo
    - Seguridad y Monitoreo de Contenidos con integración de Azure Content Safety
    - Seguridad en la Cadena de Suministro con verificación integral de componentes
    - Seguridad OAuth y Prevención de Confused Deputy con implementación PKCE
    - Respuesta a Incidentes y Recuperación con capacidades automatizadas
    - Cumplimiento y Gobernanza con alineación regulatoria
    - Controles Avanzados de Seguridad con arquitectura de confianza cero
    - Integración con el Ecosistema de Seguridad de Microsoft con soluciones completas
    - Evolución Continua de la Seguridad con prácticas adaptativas
  - **Soluciones de Seguridad de Microsoft**: Guía de integración mejorada para Prompt Shields, Azure Content Safety, Entra ID y GitHub Advanced Security
  - **Recursos de Implementación**: Enlaces de recursos completos categorizados por Documentación Oficial MCP, Soluciones de Seguridad Microsoft, Normas de Seguridad y Guías de Implementación

#### Controles Avanzados de Seguridad (02-Security/) - Implementación Empresarial
- **MCP-SECURITY-CONTROLS-2025.md**: Renovación completa con marco de seguridad a nivel empresarial
  - **9 Dominios Complejos de Seguridad**: Ampliados desde controles básicos a un marco empresarial detallado
    - Autenticación y Autorización Avanzadas con integración Microsoft Entra ID
    - Seguridad de Tokens y Controles Anti-Passthrough con validación exhaustiva
    - Controles de Seguridad de Sesiones con prevención de secuestro
    - Controles de Seguridad Específicos de IA con prevención de inyección de prompts y envenenamiento de herramientas
    - Prevención de Ataques Confused Deputy con seguridad en proxy OAuth
    - Seguridad en Ejecución de Herramientas con sandboxing y aislamiento
    - Controles de Seguridad en la Cadena de Suministro con verificación de dependencias
    - Controles de Monitoreo y Detección con integración SIEM
    - Respuesta a Incidentes y Recuperación con capacidades automatizadas
  - **Ejemplos de Implementación**: Añadidos bloques detallados de configuración YAML y ejemplos de código
  - **Integración con Soluciones Microsoft**: Cobertura completa de servicios de seguridad Azure, GitHub Advanced Security y gestión empresarial de identidades

#### Temas Avanzados de Seguridad (05-AdvancedTopics/mcp-security/) - Implementación Lista para Producción
- **README.md**: Reescritura completa para implementación de seguridad empresarial
  - **Alineación con Especificación Actual**: Actualizado a Especificación MCP 2025-06-18 con requisitos mandatorios de seguridad
  - **Autenticación Mejorada**: Integración Microsoft Entra ID con ejemplos completos en .NET y Java Spring Security
  - **Integración de Seguridad para IA**: Implementación Microsoft Prompt Shields y Azure Content Safety con ejemplos detallados en Python
  - **Mitigación Avanzada de Amenazas**: Ejemplos completos de implementación para
    - Prevención de Ataques Confused Deputy con PKCE y validación de consentimiento del usuario
    - Prevención de Passthrough de Tokens con validación de audiencia y manejo seguro de tokens
    - Prevención de Secuestro de Sesiones con enlace criptográfico y análisis comportamental
  - **Integración Empresarial de Seguridad**: Monitoreo con Azure Application Insights, pipelines de detección de amenazas y seguridad en cadena de suministro
  - **Lista de Verificación de Implementación**: Controles de seguridad claros obligatorios versus recomendados con beneficios del ecosistema de seguridad Microsoft

### Calidad de la Documentación y Alineación con Normas
- **Referencias a Especificaciones**: Actualizadas todas las referencias a la Especificación MCP 2025-06-18 vigente
- **Ecosistema de Seguridad Microsoft**: Guía de integración mejorada a lo largo de toda la documentación de seguridad
- **Implementación Práctica**: Añadidos ejemplos detallados de código en .NET, Java y Python con patrones empresariales
- **Organización de Recursos**: Categorización integral de documentación oficial, normas de seguridad y guías de implementación
- **Indicadores Visuales**: Marcación clara de requisitos obligatorios versus prácticas recomendadas


#### Conceptos Básicos (01-CoreConcepts/) - Modernización Completa
- **Actualización de Versión de Protocolo**: Actualizado para referenciar especificación MCP vigente 2025-06-18 con versionado basado en fecha (formato YYYY-MM-DD)
- **Refinamiento de Arquitectura**: Descripciones mejoradas de Hosts, Clientes y Servidores para reflejar patrones arquitectónicos MCP actuales
  - Hosts ahora claramente definidos como aplicaciones de IA coordinando múltiples conexiones de clientes MCP
  - Clientes descritos como conectores de protocolo manteniendo relaciones uno a uno con servidores
  - Servidores mejorados con escenarios de despliegue local versus remoto
- **Reestructuración de Primitivas**: Renovación completa de primitivas de servidor y cliente
  - Primitivas de Servidor: Recursos (fuentes de datos), Prompts (plantillas), Herramientas (funciones ejecutables) con explicaciones y ejemplos detallados
  - Primitivas de Cliente: Muestreo (completaciones LLM), Elicitación (entrada de usuario), Registro (debugging/monitoreo)
  - Actualizado con patrones actuales de métodos de descubrimiento (`*/list`), obtención (`*/get`) y ejecución (`*/call`)
- **Arquitectura del Protocolo**: Introducido modelo de arquitectura en dos capas
  - Capa de Datos: Fundamento JSON-RPC 2.0 con gestión del ciclo de vida y primitivas
  - Capa de Transporte: STDIO (local) y HTTP streamable con SSE (transporte remoto)
- **Marco de Seguridad**: Principios de seguridad completos incluyendo consentimiento explícito de usuario, protección de privacidad de datos, seguridad en ejecución de herramientas y seguridad en capa de transporte
- **Patrones de Comunicación**: Mensajes de protocolo actualizados para mostrar inicialización, descubrimiento, ejecución y flujos de notificación
- **Ejemplos de Código**: Ejemplos multilenguaje actualizados (.NET, Java, Python, JavaScript) para reflejar patrones actuales del SDK MCP

#### Seguridad (02-Security/) - Renovación Integral de Seguridad  
- **Alineación con Normas**: Alineación completa con requisitos de seguridad de la Especificación MCP 2025-06-18
- **Evolución de Autenticación**: Documentado el paso de servidores OAuth personalizados a delegación con proveedor de identidad externo (Microsoft Entra ID)
- **Análisis de Amenazas Específicas de IA**: Cobertura mejorada de vectores modernos de ataque IA
  - Escenarios detallados de ataques de inyección de prompts con ejemplos reales
  - Mecanismos de envenenamiento de herramientas y patrones de ataque "rug pull"
  - Envenenamiento de ventana de contexto y ataques de confusión de modelo
- **Soluciones de Seguridad AI de Microsoft**: Cobertura completa del ecosistema de seguridad Microsoft
  - AI Prompt Shields con técnicas avanzadas de detección, spotlighting y delimitadores
  - Patrones de integración Azure Content Safety
  - GitHub Advanced Security para protección de cadena de suministro
- **Mitigación Avanzada de Amenazas**: Controles de seguridad detallados para
  - Secuestro de sesiones con escenarios de ataque específicos MCP y requisitos criptográficos de ID de sesión
  - Problemas Confused Deputy en escenarios proxy MCP con requisitos explícitos de consentimiento
  - Vulnerabilidades de passthrough de token con controles obligatorios de validación
- **Seguridad en la Cadena de Suministro**: Ampliación de cobertura AI en cadena de suministro incluyendo modelos base, servicios de embeddings, proveedores de contexto y APIs de terceros
- **Seguridad Fundamental**: Integración mejorada con patrones empresariales de seguridad incluyendo arquitectura de confianza cero y ecosistema de seguridad Microsoft
- **Organización de Recursos**: Categorización amplia de enlaces de recursos por tipo (Docs Oficiales, Normas, Investigación, Soluciones Microsoft, Guías de Implementación)

### Mejoras en Calidad de Documentación
- **Objetivos de Aprendizaje Estructurados**: Objetivos de aprendizaje mejorados con resultados específicos y accionables 
- **Referencias Cruzadas**: Añadidos enlaces entre temas relacionados de seguridad y conceptos básicos
- **Información Actualizada**: Actualizadas todas las referencias de fechas y enlaces de especificación a normas vigentes
- **Guía de Implementación**: Añadidas guías específicas y accionables para implementación a lo largo de ambas secciones

## 16 de julio de 2025

### Mejoras en README y Navegación
- Navegación del currículo rediseñada completamente en README.md
- Etiquetas `<details>` reemplazadas por formato de tabla más accesible
- Opciones de diseño alternativas creadas en nueva carpeta "alternative_layouts"
- Añadidos ejemplos de navegación basada en tarjetas, pestañas y acordeón
- Sección de estructura del repositorio actualizada para incluir todos los archivos más recientes
- Sección "Cómo Usar Este Currículo" mejorada con recomendaciones claras
- Enlaces de especificación MCP actualizados para apuntar a URLs correctas
- Añadida sección de Ingeniería de Contexto (5.14) a la estructura del currículo

### Actualizaciones de Guía de Estudio
- Guía de estudio revisada completamente para alinearse con estructura actual del repositorio
- Añadidas nuevas secciones para Clientes y Herramientas MCP, y Servidores MCP Populares
- Mapa Visual del Currículo actualizado para reflejar todos los temas con precisión
- Descripciones mejoradas de Temas Avanzados para cubrir todas las áreas especializadas
- Sección de Estudios de Caso actualizada para reflejar ejemplos reales
- Añadido este registro de cambios completo

### Contribuciones de la Comunidad (06-CommunityContributions/)
- Añadida información detallada sobre servidores MCP para generación de imágenes
- Añadida sección completa sobre el uso de Claude en VSCode
- Añadidas instrucciones para configuración y uso del cliente terminal Cline
- Sección de clientes MCP actualizada para incluir todas las opciones de clientes populares
- Ejemplos de contribución mejorados con muestras de código más precisas

### Temas Avanzados (05-AdvancedTopics/)
- Todas las carpetas de temas especializados organizadas con nomenclatura consistente
- Añadidos materiales y ejemplos de ingeniería de contexto
- Añadida documentación de integración de agente Foundry
- Documentación mejorada de integración de seguridad Entra ID

## 11 de junio de 2025

### Creación Inicial
- Primera versión del currículo MCP para Principiantes publicada
- Estructura básica creada para las 10 secciones principales
- Implementado Mapa Visual del Currículo para navegación
- Añadidos proyectos de ejemplo iniciales en múltiples lenguajes de programación

### Primeros Pasos (03-GettingStarted/)
- Primeros ejemplos de implementación de servidores creados
- Añadidas guías para desarrollo de clientes
- Incluidas instrucciones para integración de clientes LLM
- Añadida documentación de integración con VS Code
- Implementados ejemplos de servidor con Server-Sent Events (SSE)

### Conceptos Básicos (01-CoreConcepts/)
- Añadida explicación detallada de arquitectura cliente-servidor
- Documentada la documentación sobre componentes clave del protocolo
- Documentados patrones de mensajería en MCP

## 23 de mayo de 2025

### Estructura del Repositorio
- Inicializado el repositorio con estructura básica de carpetas
- Creación de archivos README para cada sección principal
- Configurada la infraestructura para traducción
- Añadidos recursos gráficos y diagramas

### Documentación
- Creado README.md inicial con visión general del currículo
- Añadidos archivos CODE_OF_CONDUCT.md y SECURITY.md
- Configurado SUPPORT.md con guía para obtener ayuda
- Estructura preliminar de guía de estudio creada

## 15 de abril de 2025

### Planificación y Marco
- Planificación inicial para el currículo MCP para Principiantes
- Definición de objetivos de aprendizaje y público objetivo
- Esquema de estructura de 10 secciones del currículo
- Desarrollo de marco conceptual para ejemplos y estudios de caso
- Creación de prototipos iniciales para conceptos clave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->