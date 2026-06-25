# Registro de cambios: Currículo MCP para Principiantes

Este documento sirve como un registro de todos los cambios significativos realizados en el currículo Model Context Protocol (MCP) para Principiantes. Los cambios se documentan en orden cronológico inverso (los cambios más recientes primero).

## 24 de junio de 2026

### Nueva Lección: Usando MCP en la aplicación Copilot

- [Sección de herramientas](./12-tooling/README.md) Se añadió la sección de herramientas.
- [MCP en la aplicación Copilot](./12-tooling/01-copilot-app/README.md)

## 16 de junio de 2026

### Alineación con la especificación MCP y validación de ejemplos

Se validó el currículo contra la **Especificación MCP 2025-11-25** actual y los SDKs oficiales más recientes, luego se corrigieron las referencias obsoletas a la especificación y se confirmó que los ejemplos centrales aún se compilan y ejecutan.

#### Correcciones de versión de especificación (2025-06-18 / 2025-03-26 → 2025-11-25)

Se actualizó el contenido en inglés donde todavía afirmaba que una versión anterior de la especificación era el estándar *actual/más reciente*, y se redirigieron los enlaces a las rutas canónicas de la especificación en `modelcontextprotocol.io`:
- **05-AdvancedTopics/mcp-security/README.md**: Se actualizó el banner "Estándar Actual", la introducción, el encabezado de principios de seguridad básicos, el encabezado de requisitos obligatorios, la sección Microsoft Entra ID, los enlaces de Referencias y Recursos, y el aviso final de seguridad (8 referencias) a 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md**: Se actualizó el enlace a Recursos Adicionales de la especificación y el banner "Estándar Actual" a 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md**: Se reemplazó el enlace obsoleto de seguridad y confianza `2025-03-26` con la página actual de mejores prácticas de seguridad 2025-11-25
- **03-GettingStarted/14-sampling/README.md**: Se actualizó el enlace oficial de documentación de muestreo a 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md**: Se actualizó la referencia en presente “especificación MCP actual” y el enlace a Recursos Adicionales de la especificación a 2025-11-25 (notas históricas de desuso de SSE permanecen para precisión)

#### Validación de ejemplos con SDKs actuales

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)**: `npm install` resolvió `@modelcontextprotocol/sdk@1.29.0`; `tsc --noEmit` pasó sin errores de tipo — las API existentes `McpServer` / `StdioServerTransport` siguen siendo válidas
- **Python (03-GettingStarted/01-first-server/solution/python)**: Validado en un `.venv` aislado con `mcp[cli]` (1.27.2); `py_compile` pasó y `FastMCP.list_tools()` devolvió correctamente las herramientas `add` y `subtract`
- Confirmado que todos los rangos de versión del ejemplo `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) se resuelven limpísimamente a la actual `1.29.0` sin cambios incompatibles en la API

#### Alineación de pines de dependencias (cerrando brechas de versiones)

Se incrementaron pines desactualizados del SDK para que cada ejemplo siga el lanzamiento actual MCP, alineándose con la convención en todo el repositorio:
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json**: Se incrementó `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` y se actualizó la descripción del paquete obsoleta `"updated for MCP 2025-06-18"` a `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** y **lab4/code/github_mcp_server/pyproject.toml**: Se incrementó el pin exacto `mcp==1.23.0` → `mcp>=1.26.0`; se regeneraron ambos archivos `uv.lock` (`uv lock`) para que los lockfiles resuelvan a la actual `mcp 1.27.2` y se mantengan sincronizados con los manifiestos

#### Análisis de brechas en el currículo — Cobertura de características nuevas de la última especificación

Se verificó que el currículo ya cubre todos los primitivas introducidos o ampliados en MCP 2025-11-25, por lo que no quedan vacíos de contenido:
- **Muestreo**: Lección 03-GettingStarted/14-sampling y 05-AdvancedTopics/mcp-sampling
- **Elaboración (incluido modo URL)**: Documentado en 01-CoreConcepts y 05-AdvancedTopics/mcp-protocol-features
- **Raíces**: Documentado en 00-Introduction, 01-CoreConcepts y 05-AdvancedTopics/mcp-root-contexts
- **Tareas (experimental, operaciones prolongadas)**: Documentado en 01-CoreConcepts y 05-AdvancedTopics/mcp-protocol-features
- **Anotaciones de herramientas** (`readOnlyHint` / `destructiveHint`): Documentado en 01-CoreConcepts y 05-AdvancedTopics/mcp-protocol-features

### Endurecimiento de la seguridad y remediación de vulnerabilidades en dependencias

Se realizó un análisis completo de seguridad en cada manifiesto de dependencia y el código fuente de los ejemplos, luego se corrigieron todas las advertencias reportadas por npm y un hallazgo a nivel de código. Después de la remediación, `npm audit` reporta **0 vulnerabilidades** en cada directorio auditado.

#### Vulnerabilidades en dependencias npm (transitivas) — Corregidas

Se auditaron los 15 archivos `package-lock.json` comprometidos. Las vulnerabilidades se limitaron a dependencias transitivas incorporadas por la herramienta MCP Inspector, el cliente OpenAI y el SDK MCP; todas ya resueltas sin romper los ejemplos:
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** y **lab3/code/weather_mcp/inspector**: Se incrementó `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), lo que limpió los avisos de `ajv`, `brace-expansion`, `diff`, `path-to-regexp` y `ws` incluidos. Se añadió una entrada npm `overrides` que fuerza la versión parcheada `shell-quote@1.8.4` para eliminar el aviso crítico restante de `concurrently`; se regeneraron ambos lockfiles (ahora 0 vulnerabilidades)
- **03-GettingStarted/samples/typescript**: `npm audit fix` actualizó la dependencia transitiva `qs` (moderada) a una versión parcheada
- **03-GettingStarted/samples/javascript**: `npm audit fix` actualizó la dependencia transitiva `hono` (moderada) a una versión parcheada
- **03-GettingStarted/03-llm-client/solution/typescript**: `npm audit fix` actualizó la dependencia transitiva `form-data` (alta) a una versión parcheada
- **03-GettingStarted/11-simple-auth/solution/typescript**: Se generó el `package-lock.json` faltante para que el proyecto sea reproducible y auditable (0 vulnerabilidades)

#### Corrección de seguridad a nivel de código (OWASP A03: Inyección)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py**: Se eliminó `shell=True` de la herramienta `open_in_vscode`. El `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` anterior permitía que metacaracteres de shell en una ruta de carpeta fueran interpretados por `cmd.exe` (vector de inyección de comandos). Ahora se lanza directamente el `Code.exe` resuelto con la carpeta como argumento — sin shell — funcionalmente equivalente y seguro

#### Auditoría de dependencias Python

- Se auditaron todos los conjuntos de requisitos Python con `pip-audit`. `05-AdvancedTopics` y `03-GettingStarted/samples/python` reportaron **ninguna vulnerabilidad conocida** (sus rangos `mcp` / `httpx` / `pydantic` / `python-dotenv` se resuelven a versiones parcheadas actuales)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt**: `pip-audit` marcó la dependencia transitiva **`werkzeug` 3.1.1** con tres avisos de DoS de nombre de dispositivo en Windows `safe_join` — `CVE-2025-66221`, `CVE-2026-21860`, y `CVE-2026-27199` (todos corregidos en 3.1.6). Se añadió un pin de seguridad explícito `werkzeug>=3.1.6` para que se resuelva la versión parcheada; se verificó que la restricción se resuelve correctamente con el stack `chainlit` / `mcp` / `semantic-kernel`

### Cambio de marca del nombre del producto

Se actualizó todo el contenido del currículo para reflejar el cambio de marca de productos de Microsoft:

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md**: Se actualizó el enlace de la comunidad Discord
- **AGENTS.md**: Se actualizó la referencia al servidor Discord
- **README.md**: Se actualizaron referencias al ecosistema tecnológico
- **study_guide.md**: Se actualizaron referencias en estudios de caso
- **05-AdvancedTopics/README.md**: Se actualizó el título y descripción del Módulo 5.13
- **05-AdvancedTopics/mcp-integration/README.md**: Se actualizó el encabezado y descripción de la sección
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md**: Se actualizó el título completo del módulo y contenido
- **05-AdvancedTopics/mcp-security-entra/README.md**: Se actualizó el enlace de referencia cruzada
- **07-LessonsfromEarlyAdoption/README.md**: Se actualizaron referencias en estudios de caso
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md**: Se actualizaron el encabezado de la Sección 9, las etiquetas y las capacidades
- **08-BestPractices/README.md**: Se actualizó el enlace de la comunidad Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md**: Se actualizó la referencia al canal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md**: Se actualizó la referencia al despliegue del modelo
- **11-MCPServerHandsOnLabs/00-Introduction/README.md**: Se actualizó la tabla de servicios AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md**: Se actualizaron referencias a recursos

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension para VS Code
- **README.md**: Se actualizó las referencias principales del currículo
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md**: Se actualizó el título del módulo, resumen y todos los encabezados
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md**: Se actualizaron título, objetivos de aprendizaje, instrucciones de configuración y recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md**: Se actualizaron título, objetivos de aprendizaje, tabla de hosts MCP y referencias cruzadas
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md**: Se actualizaron título, etiquetas, prerrequisitos y recursos
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md**: Se actualizaron referencias al Agent Builder y enlace de feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md**: Se actualizaron prerrequisitos y referencias a extensiones

---

## 11 de abril de 2026

### Nueva lección, correcciones de documentación y actualizaciones de dependencias

#### Nuevo contenido del currículo añadido

**Módulo 05 - Temas Avanzados**
- **Lección 5.17: Razonamiento Multi-Agente Adversarial con MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`): Guía completa que cubre el patrón de debate adversarial para sistemas multi-agente
  - Diagrama arquitectónico Mermaid: dos agentes → servidor MCP compartido → transcripción del debate → juez → veredicto
  - Servidor de herramientas MCP compartido (`web_search` + `run_python`) implementado en Python y TypeScript
  - Prompts de sistema opuestos (A FAVOR / EN CONTRA / Juez) con requisitos explícitos de uso de herramientas
  - Orquestador de debate en Python, TypeScript y C# que gestiona rondas y enruta argumentos
  - Cableado MCP `ClientSession` para el orquestador hacia llamadas reales de herramientas
  - Tabla de casos de uso (detección de alucinaciones, modelado de amenazas, revisión de diseño de API, verificación factual, selección tecnológica)
  - Consideraciones de seguridad: ejecución sandbox, validación de llamadas a herramientas, limitación de tasa, registro de auditoría
  - Ejercicio estructurado con tres escenarios prácticos (revisión de código, decisión arquitectónica, moderación de contenido)

#### Correcciones en la documentación

**Módulo 03 - Comenzando**
- **05-stdio-server/README.md**: Corregido ejemplo incompleto de servidor stdio TypeScript — se agregó la instanciación faltante del transporte (`new StdioServerTransport()`) y la llamada `server.connect(transport)` para coincidir con los ejemplos Python y .NET en la misma sección
- **14-sampling/README.md**: Corregido error tipográfico — corregido `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Actualizaciones del currículo

**README.md principal**
- Se añadió la entrada 5.17 (Razonamiento Multi-Agente Adversarial con MCP) a la tabla de currículo con un enlace directo a la nueva lección

**05-AdvancedTopics/README.md**
- Se añadió fila de la lección 5.17 a la tabla de lecciones

**study_guide.md**
- Se añadió el tema Razonamiento Multi-Agente Adversarial al mapa mental y la descripción en prosa de Temas Avanzados

#### Correcciones de código y seguridad

**Módulo 05 - Agentes Adversariales (`mcp-adversarial-agents`)**
- **Corrección de seguridad — inyección de comandos**: Se reemplazó la interpolación del shell `execSync` por `execFile` + `promisify` en la herramienta TypeScript `run_python`, eliminando la superficie de inyección de comandos (el código controlado por LLM ahora se pasa como un elemento argv literal sin participación del shell).
- **Cableado del bucle de la herramienta MCP**: Se actualizó el orquestador de debate Python para usar el cliente `AsyncAnthropic` (reemplazando `Anthropic` sincrónico bloqueante), pasar una `ClientSession` en vivo directamente a cada turno del agente, obtener definiciones de herramientas mediante `session.list_tools()` en cada turno y despachar bloques `tool_use` mediante `session.call_tool()` en un bucle hasta que el modelo emite una respuesta de texto final.

#### Actualizaciones de Dependencias

- Se actualizó `hono` a la versión 4.12.12 en múltiples paquetes (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows).
- Se actualizó `@hono/node-server` de la versión 1.19.11 a 1.19.13 en los paquetes de TypeScript.
- Se actualizó `cryptography` de la versión 46.0.5 a 46.0.7 en los paquetes Python (laboratorios 3 y 4 de 10-StreamliningAIWorkflows).
- Se actualizó `lodash` de la versión 4.17.23 a 4.18.1 en el inspector de 10-StreamliningAIWorkflows.

#### Traducciones

- Se sincronizaron traducciones para más de 48 idiomas con los últimos cambios de fuente (actualización i18n).

---

## 5 de febrero de 2026

### Mejoras en Validación y Navegación a lo Largo de Todo el Repositorio

#### Nuevo Contenido Curricular Añadido

**Módulo 03 - Primeros Pasos**
- **12-mcp-hosts/README.md**: Nueva guía completa para configurar hosts MCP
  - Ejemplos de configuración para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Plantillas de configuración JSON para todos los hosts principales
  - Tabla comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Solución de problemas comunes de conexión
  - Mejores prácticas de seguridad para la configuración del host

- **13-mcp-inspector/README.md**: Nueva guía de depuración para MCP Inspector
  - Métodos de instalación (npx, npm global, desde la fuente)
  - Conexión a servidores mediante stdio y HTTP/SSE
  - Herramientas de prueba, recursos y flujos de trabajo de prompts
  - Integración con VS Code y MCP Inspector
  - Escenarios comunes de depuración con soluciones

**Módulo 04 - Implementación Práctica**
- **pagination/README.md**: Nueva guía de implementación de paginación
  - Patrones de paginación basada en cursor en Python, TypeScript, Java
  - Manejo de paginación del lado del cliente
  - Estrategias de diseño de cursor (opaco vs estructurado)
  - Recomendaciones para optimización de rendimiento

**Módulo 05 - Temas Avanzados**
- **mcp-protocol-features/README.md**: Nuevo análisis profundo de características del protocolo
  - Implementación de notificaciones de progreso
  - Patrones de cancelación de solicitudes
  - Plantillas de recursos con patrones URI
  - Gestión del ciclo de vida del servidor
  - Control del nivel de registro
  - Patrones de manejo de errores con códigos JSON-RPC

#### Correcciones de Navegación (24+ archivos actualizados)

**README de Módulos Principales**  
 Ahora enlazan tanto con la primera lección COMO con el siguiente módulo.

**Archivos complementarios de 02-Security**  
- Los 5 documentos complementarios de seguridad ahora tienen navegación de "Qué sigue":

**Archivos de 09-CaseStudy**  
- Todos los archivos de estudio de caso ahora tienen navegación secuencial:

**Laboratorios 10-StreamliningAI**  
Se agregó la sección Qué sigue a la visión general del Módulo 10 y al Módulo 11.

#### Correcciones de Código y Contenido

**Actualizaciones de SDK y Dependencias**  
Se corrigió la versión vacía de openai a `^4.95.0`.  
Se actualizó SDK de `^1.8.0` a `>=1.26.0`.  
Se actualizaron las versiones máximas de mcp a `>=1.26.0`.

**Correcciones de Código**  
Se corrigió modelo inválido `gpt-4o-mini` a `gpt-4.1-mini`.

**Correcciones de Contenido**  
Se corrigió enlace roto `READMEmd` → `README.md`, se corrigió encabezado del plan de estudios `Module 1-3` → `Module 0-3`, se corrigió ruta con sensibilidad a mayúsculas.  
Se eliminaron contenidos duplicados corruptos del Estudio de Caso 5.

**Mejoras en la Guía para Principiantes**  
Se agregó introducción adecuada, objetivos de aprendizaje y prerrequisitos para principiantes.

#### Actualizaciones Curriculares

**README.md Principal**  
- Se agregaron entradas 3.12 (Hosts MCP), 3.13 (Inspector MCP), 4.1 (Paginación), 5.16 (Características del Protocolo) a la tabla del currículo.

**README de Módulos**  
Se agregaron lecciones 12 y 13 a la lista de lecciones.  
Se añadió sección de Guías Prácticas con enlace a paginación.  
Se agregaron las lecciones 5.15 (Transporte Personalizado) y 5.16 (Características del Protocolo).

**study_guide.md**  
- Se actualizó el mapa mental con todos los nuevos temas: Configuración de Hosts MCP, Inspector MCP, Estrategias de Paginación, Análisis Profundo de Características del Protocolo.

## 28 de enero de 2026

### Revisión de Cumplimiento de la Especificación MCP 2025-11-25

#### Mejora de Conceptos Fundamentales (01-CoreConcepts/)  
- **Nuevo Primitivo Cliente – Roots**: Se añadió documentación completa sobre el primitivo cliente Roots, permitiendo que los servidores entiendan límites de sistema de archivos y permisos de acceso.  
- **Anotaciones de Herramientas**: Se añadió documentación sobre anotaciones comportamentales de herramientas (`readOnlyHint`, `destructiveHint`) para mejores decisiones en la ejecución de herramientas.  
- **Invocación de Herramientas en Muestreo**: Se actualizó la documentación de Muestreo para incluir parámetros `tools` y `toolChoice` para invocación guiada por modelo durante solicitudes de muestreo.  
- **Modos de Elicitación URL**: Se añadió documentación sobre el elicitation basado en URL para interacciones web externas iniciadas por servidor.  
- **Tareas (Experimental)**: Se añadió nueva sección documentando la función experimental Tareas para envoltorios de ejecución duradera y recuperación diferida de resultados.  
- **Soporte de Iconos**: Se señaló que herramientas, recursos, plantillas de recursos y prompts ahora pueden incluir iconos como metadatos adicionales.

#### Actualizaciones de Documentación  
- **README.md**: Se añadió referencia a la versión de Especificación MCP 2025-11-25 y explicación del versionado basado en fecha.  
- **study_guide.md**: Se actualizó mapa curricular para incluir Tareas y Anotaciones de Herramientas dentro de Conceptos Fundamentales; se actualizó sello de tiempo del documento.

#### Verificación de Cumplimiento de Especificaciones  
- **Versión de Protocolo**: Se verificó que toda la documentación referencia la Especificación MCP 2025-11-25 actual.  
- **Alineación Arquitectónica**: Confirmada la precisión de la documentación para la arquitectura de dos capas (Capa de Datos + Capa de Transporte).  
- **Documentación de Primitivos**: Validados los primitivas del servidor (Recursos, Prompts, Herramientas) y primitivas del cliente (Muestreo, Elicitación, Registro, Roots).  
- **Mecanismos de Transporte**: Verificada la precisión en la documentación de transporte STDIO y HTTP Streamable.  
- **Guía de Seguridad**: Confirmada la alineación con las Mejores Prácticas de Seguridad MCP actuales.

#### Características Clave MCP 2025-11-25 Documentadas  
- **Descubrimiento OpenID Connect**: Descubrimiento del servidor de autenticación vía OIDC.  
- **Documentos de Metadatos de OAuth Client ID**: Mecanismo recomendado para registro de clientes.  
- **JSON Schema 2020-12**: Dialecto por defecto para definiciones de esquema MCP.  
- **Sistema de Estratificación SDK**: Requisitos formalizados para soporte y mantenimiento de funcionalidades SDK.  
- **Estructura de Gobernanza**: Formalizados los Grupos de Trabajo y Grupos de Interés en la gobernanza MCP.

### Importante Actualización de Documentación de Seguridad (02-Security/)

#### Integración del Taller MCP Security Summit (Sherpa)  
- **Nuevo Recurso de Entrenamiento Práctico**: Integración completa con el [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) en toda la documentación de seguridad.  
- **Cobertura de Ruta de Expedición**: Documentada la progresión completa de campamento a campamento desde el Campamento Base hasta la Cima.  
- **Alineación OWASP**: Toda la guía de seguridad ahora se mapea a los riesgos de la Guía de Seguridad Azure MCP OWASP.

#### Integración OWASP MCP Top 10  
- **Nueva Sección**: Añadida tabla de Riesgos de Seguridad OWASP MCP Top 10 con mitigaciones Azure en el README principal de Seguridad.  
- **Documentación Basada en Riesgos**: Actualizado mcp-security-controls-2025.md con referencias a riesgos OWASP MCP para cada dominio de seguridad.  
- **Arquitectura de Referencia**: Vinculado a la arquitectura de referencia y patrones de implementación de la Guía de Seguridad Azure MCP OWASP.

#### Archivos de Seguridad Actualizados  
- **README.md**: Agregados resumen del taller Sherpa, tabla de rutas de expedición, resumen de riesgos OWASP MCP Top 10 y sección de entrenamiento práctico.  
- **mcp-security-controls-2025.md**: Actualizado encabezado a febrero 2026, añadidas referencias a riesgos OWASP (MCP01-MCP08), corregida inconsistencia en versión de especificación.  
- **mcp-security-best-practices-2025.md**: Añadida sección de recursos Sherpa y OWASP, actualización de sello de tiempo.  
- **mcp-best-practices.md**: Añadida sección de formación práctica con enlaces a Sherpa y OWASP.  
- **azure-content-safety-implementation.md**: Añadida referencia OWASP MCP06, alineación con Campamento 3 de Sherpa y sección de recursos adicionales.

#### Nuevos Enlaces a Recursos Añadidos  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Páginas individuales de riesgos OWASP MCP (MCP01-MCP10)

### Alineación del Currículo con la Especificación MCP 2025-11-25

#### Módulo 03 - Primeros Pasos  
- **Documentación SDK**: Se añadió el SDK de Go a la lista oficial de SDK; se actualizaron todas las referencias SDK para alinearse con la Especificación MCP 2025-11-25.  
- **Clarificación de Transporte**: Se actualizaron las descripciones de transporte STDIO y HTTP Streaming con referencias explícitas a la especificación.

#### Módulo 04 - Implementación Práctica  
- **Actualizaciones SDK**: Añadido SDK de Go; actualizado listado de SDK con referencia a versión de especificación.  
- **Especificación de Autorización**: Actualizado enlace a la especificación MCP de autorización a la versión actual 2025-11-25.

#### Módulo 05 - Temas Avanzados  
- **Nuevas Características**: Añadida nota sobre nuevas características de la Especificación MCP 2025-11-25 (Tareas, Anotaciones de Herramientas, Elicitación Modo URL, Roots).  
- **Recursos de Seguridad**: Añadidos enlaces OWASP MCP Top 10 y al taller Sherpa en referencias adicionales.

#### Módulo 06 - Contribuciones de la Comunidad  
- **Lista SDK**: Se añadieron SDKs Swift y Rust; actualizado enlace de especificación a 2025-11-25.  
- **Referencia de Especificación**: Actualizado enlace MCP a URL directa de la especificación.

#### Módulo 07 - Lecciones del Uso Temprano  
- **Actualizaciones de Recursos**: Se añadió enlace MCP Specification 2025-11-25 y OWASP MCP Top 10 en recursos adicionales.

#### Módulo 08 - Mejores Prácticas  
- **Versión de Especificación**: Actualizado referencia a MCP Specification 2025-11-25.  
- **Recursos de Seguridad**: Añadidos OWASP MCP Top 10 y taller Sherpa a referencias adicionales.

#### Módulo 10 - Optimización de Flujos de Trabajo de IA  
- **Actualización de Insignia**: Se cambió la insignia de versión MCP de versión SDK (1.9.3) a versión de especificación (2025-11-25).  
- **Enlaces a Recursos**: Actualizado enlace MCP Specification; añadido OWASP MCP Top 10.

#### Módulo 11 - Laboratorios Prácticos MCP Server  
- **Referencia a Especificación**: Actualizado enlace MCP Specification a la versión 2025-11-25.  
- **Recursos de Seguridad**: Añadido OWASP MCP Top 10 a recursos oficiales.

## 18 de diciembre de 2025

### Actualización de Documentación de Seguridad – Especificación MCP 2025-11-25

#### Mejores Prácticas de Seguridad MCP (02-Security/mcp-best-practices.md) – Actualización de Versión de Especificación  
- **Actualización de Versión de Protocolo**: Actualizado para referenciar la última Especificación MCP 2025-11-25 (publicada el 25 de noviembre de 2025)  
  - Actualizadas todas las referencias de versión de especificación desde 2025-06-18 a 2025-11-25  
  - Actualizadas las fechas de documento de agosto 18, 2025 a diciembre 18, 2025  
  - Verificados todos los URLs de especificación para apuntar a la documentación actual  
- **Validación de Contenido**: Validación exhaustiva de las mejores prácticas de seguridad contra los estándares más recientes  
  - **Soluciones de Seguridad Microsoft**: Verificado el uso de terminología y enlaces actuales para Prompt Shields (anteriormente “detección de riesgo Jailbreak”), Azure Content Safety, Microsoft Entra ID y Azure Key Vault  
  - **Seguridad OAuth 2.1**: Confirmada alineación con las mejores prácticas de seguridad OAuth más recientes  
  - **Estándares OWASP**: Validadas las referencias vigentes a OWASP Top 10 para LLMs  
  - **Servicios Azure**: Verificados todos los enlaces y mejores prácticas en documentación Microsoft Azure  
- **Alineamiento con Estándares**: Confirmados todos los estándares de seguridad referenciados  
  - Marco de Gestión de Riesgos de IA NIST  
  - ISO 27001:2022  
  - Mejores Prácticas de Seguridad OAuth 2.1  
  - Marcos de seguridad y cumplimiento de Azure  
- **Recursos de Implementación**: Validados todos los enlaces de guías e implementación  
  - Patrones de autenticación Azure API Management  
  - Guías de integración Microsoft Entra ID  
  - Gestión de secretos en Azure Key Vault  
  - Pipelines DevSecOps y soluciones de monitoreo

### Aseguramiento de Calidad en Documentación  
- **Cumplimiento de Especificación**: Garantizado que todos los requisitos obligatorios de seguridad MCP (DEBE/NO DEBE) estén alineados con la especificación más reciente  
- **Actualización de Recursos**: Verificados todos los enlaces externos a documentación Microsoft, estándares de seguridad y guías de implementación  
- **Cobertura de Mejores Prácticas**: Confirmada cobertura completa de autenticación, autorización, amenazas específicas de IA, seguridad de cadena de suministro y patrones empresariales

## 6 de octubre de 2025

### Expansión de la Sección Primeros Pasos – Uso Avanzado del Servidor y Autenticación Simple

#### Uso Avanzado del Servidor (03-GettingStarted/10-advanced)  
- **Nuevo Capítulo Añadido**: Introducido una guía comprensiva para uso avanzado de servidores MCP, cubriendo arquitecturas de servidor regulares y de bajo nivel.
  - **Servidor Regular vs. de Bajo Nivel**: Comparación detallada y ejemplos de código en Python y TypeScript para ambos enfoques.
  - **Diseño Basado en Handlers**: Explicación de la gestión de herramientas/recursos/prompt basada en handlers para implementaciones de servidor escalables y flexibles.
  - **Patrones Prácticos**: Escenarios del mundo real donde los patrones de servidor de bajo nivel son beneficiosos para funciones avanzadas y arquitectura.

#### Autenticación Simple (03-GettingStarted/11-simple-auth)
- **Nuevo Capítulo Añadido**: Guía paso a paso para implementar autenticación simple en servidores MCP.
  - **Conceptos de Autenticación**: Explicación clara de autenticación vs. autorización y manejo de credenciales.
  - **Implementación Básica de Autenticación**: Patrones de autenticación basados en middleware en Python (Starlette) y TypeScript (Express), con ejemplos de código.
  - **Progresión hacia Seguridad Avanzada**: Guía para comenzar con autenticación simple y avanzar hacia OAuth 2.1 y RBAC, con referencias a módulos de seguridad avanzada.

Estas adiciones ofrecen orientación práctica y directa para construir implementaciones de servidores MCP más robustas, seguras y flexibles, uniendo conceptos fundamentales con patrones avanzados de producción.

## 29 de septiembre de 2025

### Laboratorios de Integración de Base de Datos en el Servidor MCP - Ruta Completa de Aprendizaje Práctico

#### 11-MCPServerHandsOnLabs - Nuevo Currículo Completo de Integración de Base de Datos
- **Ruta de Aprendizaje Completa de 13 Laboratorios**: Añadido currículo práctico completo para construir servidores MCP listos para producción con integración de base de datos PostgreSQL
  - **Implementación del Mundo Real**: Caso de uso de análisis Zava Retail demostrando patrones de nivel empresarial
  - **Progresión Estructurada de Aprendizaje**:
    - **Laboratorios 00-03: Fundamentos** - Introducción, Arquitectura Central, Seguridad y Multi-inquilino, Configuración del Entorno
    - **Laboratorios 04-06: Construcción del Servidor MCP** - Diseño y Esquema de Base de Datos, Implementación del Servidor MCP, Desarrollo de Herramientas  
    - **Laboratorios 07-09: Funciones Avanzadas** - Integración de Búsqueda Semántica, Pruebas y Depuración, Integración con VS Code
    - **Laboratorios 10-12: Producción y Buenas Prácticas** - Estrategias de Despliegue, Monitoreo y Observabilidad, Buenas Prácticas y Optimización
  - **Tecnologías Empresariales**: Framework FastMCP, PostgreSQL con pgvector, embeddings de Azure OpenAI, Azure Container Apps, Application Insights
  - **Funciones Avanzadas**: Seguridad a nivel de fila (RLS), búsqueda semántica, acceso multi-inquilino a datos, embeddings vectoriales, monitoreo en tiempo real

#### Estandarización de Terminología - Conversión de Módulo a Laboratorio
- **Actualización Completa de Documentación**: Actualizados sistemáticamente todos los archivos README en 11-MCPServerHandsOnLabs para usar la terminología "Laboratorio" en lugar de "Módulo"
  - **Encabezados de Sección**: Cambiado "Lo que Cubre Este Módulo" a "Lo que Cubre Este Laboratorio" en los 13 laboratorios
  - **Descripción del Contenido**: Modificado "Este módulo provee..." a "Este laboratorio provee..." en toda la documentación
  - **Objetivos de Aprendizaje**: Actualizado "Al final de este módulo..." a "Al final de este laboratorio..."
  - **Enlaces de Navegación**: Convertidas todas las referencias de "Módulo XX:" a "Laboratorio XX:" en referencias cruzadas y navegación
  - **Seguimiento de Finalización**: Actualizado "Después de completar este módulo..." a "Después de completar este laboratorio..."
  - **Preservación de Referencias Técnicas**: Mantuvieron referencias a módulos Python en archivos de configuración (por ejemplo, `"module": "mcp_server.main"`)

#### Mejora de la Guía de Estudio (study_guide.md)
- **Mapa Visual del Currículo**: Añadida nueva sección "11. Laboratorios de Integración de Base de Datos" con visualización completa de la estructura de laboratorios
- **Estructura del Repositorio**: Actualizado de diez a once secciones principales con descripción detallada de 11-MCPServerHandsOnLabs
- **Guía de la Ruta de Aprendizaje**: Mejoradas instrucciones de navegación para cubrir secciones 00-11
- **Cobertura Tecnológica**: Añadidos detalles de integración con FastMCP, PostgreSQL y servicios Azure
- **Resultados de Aprendizaje**: Enfatizado desarrollo de servidores listos para producción, patrones de integración de bases de datos y seguridad empresarial

#### Mejora de la Estructura del README Principal
- **Terminología Basada en Laboratorios**: Actualizado README.md principal en 11-MCPServerHandsOnLabs para usar consistentemente la estructura "Laboratorio"
- **Organización de la Ruta de Aprendizaje**: Progresión clara desde conceptos fundamentales hasta implementación avanzada y despliegue en producción
- **Enfoque en el Mundo Real**: Énfasis en aprendizaje práctico con patrones y tecnologías de nivel empresarial

### Mejoras en Calidad y Consistencia de la Documentación
- **Enfoque Práctico de Aprendizaje**: Reforzado enfoque práctico basado en laboratorios en toda la documentación
- **Enfoque en Patrones Empresariales**: Destacado en implementaciones listas para producción y consideraciones de seguridad empresarial
- **Integración Tecnológica**: Cobertura integral de servicios modernos de Azure y patrones de integración AI
- **Progresión de Aprendizaje**: Ruta clara y estructurada desde conceptos básicos hasta despliegue en producción

## 26 de septiembre de 2025

### Mejoras en Estudios de Caso - Integración del Registro MCP de GitHub

#### Estudios de Caso (09-CaseStudy/) - Enfoque en Desarrollo del Ecosistema
- **README.md**: Expansión significativa con estudio de caso integral del Registro MCP de GitHub
  - **Estudio de Caso del Registro MCP de GitHub**: Nuevo estudio de caso completo examinando el lanzamiento del Registro MCP de GitHub en septiembre de 2025
    - **Análisis del Problema**: Examen detallado de desafíos en descubrimiento y despliegue fragmentados de servidores MCP
    - **Arquitectura de la Solución**: Enfoque centralizado del registro con instalación con un clic en VS Code
    - **Impacto Empresarial**: Mejoras medibles en la incorporación y productividad de desarrolladores
    - **Valor Estratégico**: Enfoque en despliegue modular de agentes e interoperabilidad entre herramientas
    - **Desarrollo del Ecosistema**: Posicionamiento como plataforma fundamental para integración agentica
  - **Estructura Mejorada del Estudio de Caso**: Actualizados los siete estudios de caso con formato uniforme y descripciones completas
    - Agentes de Viaje AI de Azure: Énfasis en orquestación multi-agente
    - Integración de Azure DevOps: Enfoque en automatización de flujos de trabajo
    - Recuperación de Documentación en Tiempo Real: Implementación de cliente de consola Python
    - Generador de Planes de Estudio Interactivo: Aplicación web conversacional Chainlit
    - Documentación en el Editor: Integración VS Code y GitHub Copilot
    - Gestión de API de Azure: Patrones de integración de API empresariales
    - Registro MCP de GitHub: Desarrollo del ecosistema y plataforma comunitaria
  - **Conclusión Comprensiva**: Sección de conclusión reescrita destacando siete estudios de caso que abarcan múltiples dimensiones de implementación MCP
    - Integración Empresarial, Orquestación Multi-Agente, Productividad del Desarrollador
    - Desarrollo de Ecosistemas, Aplicaciones Educativas categorizadas
    - Perspectivas mejoradas en patrones arquitectónicos, estrategias de implementación y mejores prácticas
    - Énfasis en MCP como protocolo maduro y listo para producción

#### Actualizaciones de la Guía de Estudio (study_guide.md)
- **Mapa Visual del Currículo**: Mapa mental actualizado para incluir Registro MCP de GitHub en la sección de Estudios de Caso
- **Descripción de Estudios de Caso**: Mejorada de descripciones genéricas a desglose detallado de siete estudios de caso completos
- **Estructura del Repositorio**: Actualizada la sección 10 para reflejar cobertura completa de estudios de caso con detalles específicos de implementación
- **Integración en Changelog**: Añadida entrada del 26 de septiembre 2025 documentando la adición del Registro MCP de GitHub y mejoras en estudios de caso
- **Actualización de Fecha**: Actualizado el pie de página para reflejar la última revisión (26 de septiembre de 2025)

### Mejoras en Calidad de la Documentación
- **Mejora de Consistencia**: Estandarizado formato y estructura de estudios de caso en todos los siete ejemplos
- **Cobertura Completa**: Estudios de caso abarcan escenarios empresariales, productividad de desarrolladores y desarrollo de ecosistemas
- **Posicionamiento Estratégico**: Mayor enfoque en MCP como plataforma fundamental para despliegue de sistemas agenticos
- **Integración de Recursos**: Actualizados recursos adicionales para incluir enlace al Registro MCP de GitHub

## 15 de septiembre de 2025

### Expansión de Temas Avanzados - Transportes Personalizados e Ingeniería de Contexto

#### Transportes Personalizados MCP (05-AdvancedTopics/mcp-transport/) - Nueva Guía de Implementación Avanzada
- **README.md**: Guía completa de implementación para mecanismos de transporte personalizados MCP
  - **Transporte Azure Event Grid**: Implementación completa de transporte sin servidor basado en eventos
    - Ejemplos en C#, TypeScript y Python con integración Azure Functions
    - Patrones de arquitectura basada en eventos para soluciones MCP escalables
    - Receptores webhook y manejo de mensajes push
  - **Transporte Azure Event Hubs**: Implementación de transporte de streaming de alto rendimiento
    - Capacidades de streaming en tiempo real para escenarios de baja latencia
    - Estrategias de particionamiento y gestión de checkpoints
    - Agrupamiento de mensajes y optimización de rendimiento
  - **Patrones de Integración Empresarial**: Ejemplos arquitectónicos listos para producción
    - Procesamiento MCP distribuido entre múltiples Azure Functions
    - Arquitecturas híbridas combinando varios tipos de transporte
    - Estrategias de durabilidad, fiabilidad y manejo de errores de mensajes
  - **Seguridad y Monitoreo**: Integración con Azure Key Vault y patrones de observabilidad
    - Autenticación con identidad administrada y acceso con mínimo privilegio
    - Telemetría con Application Insights y monitoreo de rendimiento
    - Patrones de circuit breakers y tolerancia a fallas
  - **Frameworks de Pruebas**: Estrategias completas de prueba para transportes personalizados
    - Pruebas unitarias con dobles de prueba y frameworks de mocking
    - Pruebas de integración con Azure Test Containers
    - Consideraciones de pruebas de rendimiento y carga

#### Ingeniería de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente de IA
- **README.md**: Exploración completa de la ingeniería de contexto como campo emergente
  - **Principios Básicos**: Compartición completa de contexto, conciencia en la toma de decisiones de acción, gestión de ventana de contexto
  - **Alineación con Protocolo MCP**: Cómo el diseño MCP aborda los desafíos de ingeniería de contexto
    - Limitaciones de ventana de contexto y estrategias de carga progresiva
    - Determinación de relevancia y recuperación dinámica de contexto
    - Manejo multimodal de contexto y consideraciones de seguridad
  - **Enfoques de Implementación**: Arquitecturas monohilo vs. multi-agente
    - Técnicas de fragmentación y priorización del contexto
    - Carga progresiva y estrategias de compresión de contexto
    - Enfoques en capas de contexto y optimización de recuperación
  - **Marco de Medición**: Métricas emergentes para evaluación de efectividad del contexto
    - Eficiencia de entrada, rendimiento, calidad y experiencia del usuario
    - Enfoques experimentales para optimización de contexto
    - Análisis de fallos y metodologías de mejora

#### Actualizaciones de Navegación del Currículo (README.md)
- **Estructura Mejorada de Módulos**: Actualizada la tabla del currículo para incluir nuevos temas avanzados
  - Añadidas entradas para Ingeniería de Contexto (5.14) y Transporte Personalizado (5.15)
  - Formato consistente y enlaces de navegación en todos los módulos
  - Descripciones actualizadas para reflejar el alcance actual del contenido

### Mejoras en la Estructura de Directorios
- **Estandarización de Nombres**: Renombrado "mcp transport" a "mcp-transport" para mantener consistencia con otras carpetas de temas avanzados
- **Organización del Contenido**: Todos los folders 05-AdvancedTopics siguen ahora patrón de nombres consistente (mcp-[tema])

### Mejoras en la Calidad de la Documentación
- **Alineación con Especificación MCP**: Todo el contenido nuevo hace referencia a la Especificación MCP 2025-06-18
- **Ejemplos Multilenguaje**: Ejemplos completos en C#, TypeScript y Python
- **Enfoque Empresarial**: Patrones listos para producción e integración con nube Azure a lo largo de todo el contenido
- **Documentación Visual**: Diagramas Mermaid para visualización de arquitectura y flujos

## 18 de agosto de 2025

### Actualización Completa de Documentación - Estándares MCP 2025-06-18

#### Mejores Prácticas de Seguridad MCP (02-Security/) - Modernización Completa
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescritura completa alineada con Especificación MCP 2025-06-18
  - **Requisitos Obligatorios**: Añadidos requisitos explícitos MUST/MUST NOT de la especificación oficial con indicadores visuales claros
  - **12 Prácticas Fundamentales de Seguridad**: Reestructuración de lista de 15 ítems a dominios completos de seguridad
    - Seguridad de Tokens y Autenticación con integración de proveedores de identidad externos
    - Gestión de Sesiones y Seguridad en Transporte con requisitos criptográficos
    - Protección Contra Amenazas Específicas de IA con integración Microsoft Prompt Shields
    - Control de Acceso y Permisos con principio de menor privilegio
    - Seguridad y Monitoreo de Contenido con integración Azure Content Safety
    - Seguridad en la Cadena de Suministro con verificación integral de componentes
    - Seguridad OAuth y Prevención de Ataques de Diputado Confundido con implementación PKCE
    - Respuesta a Incidentes y Recuperación con capacidades automatizadas
    - Cumplimiento y Gobernanza con alineación regulatoria
    - Controles Avanzados de Seguridad con arquitectura de confianza cero
    - Integración con Ecosistema de Seguridad Microsoft con soluciones integrales
    - Evolución Continua de Seguridad con prácticas adaptativas
  - **Soluciones de Seguridad Microsoft**: Guía mejorada para integración de Prompt Shields, Azure Content Safety, Entra ID y GitHub Advanced Security
  - **Recursos de Implementación**: Enlaces de recursos categorizados por Documentación Oficial MCP, Soluciones de Seguridad Microsoft, Estándares de Seguridad y Guías de Implementación

#### Controles de Seguridad Avanzados (02-Security/) - Implementación Empresarial
- **MCP-SECURITY-CONTROLS-2025.md**: Revisión completa con marco de seguridad empresarial detallado
  - **9 Dominios Complejos de Seguridad**: Expansión de controles básicos a marco detallado empresarial
    - Autenticación y Autorización Avanzadas con integración Microsoft Entra ID
    - Seguridad de Tokens y Controles Anti-Passthrough con validación completa
    - Controles de Seguridad de Sesión con prevención de secuestros
    - Controles de Seguridad Específicos de IA con prevención de inyección y envenenamiento de herramientas
    - Prevención de Ataques de Diputado Confundido con seguridad de proxy OAuth
    - Seguridad en Ejecución de Herramientas con sandboxing y aislamiento
    - Controles de Seguridad en Cadena de Suministro con verificación de dependencias
    - Controles de Monitoreo y Detección con integración SIEM
    - Respuesta a Incidentes y Recuperación con capacidades automatizadas
  - **Ejemplos de Implementación**: Añadidos bloques de configuración YAML detallados y ejemplos de código
  - **Integración con Soluciones Microsoft**: Cobertura completa de servicios de seguridad Azure, GitHub Advanced Security y gestión empresarial de identidades

#### Temas Avanzados de Seguridad (05-AdvancedTopics/mcp-security/) - Implementación Lista para Producción
- **README.md**: Reescritura completa para implementación de seguridad empresarial
  - **Alineación con Especificación Actual**: Actualizado a Especificación MCP 2025-06-18 con requisitos obligatorios de seguridad
  - **Autenticación Mejorada**: Integración Microsoft Entra ID con ejemplos completos en .NET y Java Spring Security
  - **Integración de Seguridad de IA**: Implementación de Microsoft Prompt Shields y Azure Content Safety con ejemplos detallados en Python
  - **Mitigación Avanzada de Amenazas**: Ejemplos completos de implementación para
    - Prevención de Ataques de Diputado Confundido con PKCE y validación de consentimiento de usuario
    - Prevención de Passthrough de Tokens con validación de audiencia y gestión segura de tokens
    - Prevención de secuestro de sesión con enlace criptográfico y análisis de comportamiento
  - **Integración de Seguridad Empresarial**: Monitoreo con Azure Application Insights, canalizaciones de detección de amenazas y seguridad en la cadena de suministro
  - **Lista de Verificación de Implementación**: Controles de seguridad obligatorios vs. recomendados claros con beneficios del ecosistema de seguridad de Microsoft

### Calidad de la Documentación y Alineación con Normas
- **Referencias a Especificaciones**: Actualizadas todas las referencias a la especificación MCP actual 2025-06-18
- **Ecosistema de Seguridad de Microsoft**: Guía de integración mejorada en toda la documentación de seguridad
- **Implementación Práctica**: Añadidos ejemplos detallados de código en .NET, Java y Python con patrones empresariales
- **Organización de Recursos**: Clasificación completa de documentación oficial, normas de seguridad y guías de implementación
- **Indicadores Visuales**: Marcado claro de requisitos obligatorios vs. prácticas recomendadas


#### Conceptos Básicos (01-CoreConcepts/) - Modernización Completa
- **Actualización de Versión del Protocolo**: Actualizado para referenciar la especificación MCP actual 2025-06-18 con versionado basado en fecha (formato AAAA-MM-DD)
- **Refinamiento de Arquitectura**: Descripciones mejoradas de Hosts, Clientes y Servidores para reflejar patrones actuales de arquitectura MCP
  - Los Hosts ahora están claramente definidos como aplicaciones de IA que coordinan múltiples conexiones de clientes MCP
  - Los Clientes descritos como conectores de protocolo que mantienen relaciones uno a uno con servidores
  - Servidores mejorados con escenarios de despliegue local vs. remoto
- **Reestructuración de Primitivas**: Reorganización completa de primitivas de servidor y cliente
  - Primitivas de Servidor: Recursos (fuentes de datos), Prompts (plantillas), Herramientas (funciones ejecutables) con explicaciones detalladas y ejemplos
  - Primitivas de Cliente: Muestreo (completaciones LLM), Solicitud (entrada del usuario), Registro (depuración/monitoreo)
  - Actualizado con patrones actuales de métodos de descubrimiento (`*/list`), recuperación (`*/get`) y ejecución (`*/call`)
- **Arquitectura del Protocolo**: Introducido modelo arquitectónico de dos capas
  - Capa de Datos: Base JSON-RPC 2.0 con gestión del ciclo de vida y primitivas
  - Capa de Transporte: STDIO (local) y HTTP transmisible con SSE (mecanismos de transporte remoto)
- **Marco de Seguridad**: Principios de seguridad integrales que incluyen consentimiento explícito del usuario, protección de privacidad de datos, seguridad en la ejecución de herramientas y seguridad en la capa de transporte
- **Patrones de Comunicación**: Mensajes de protocolo actualizados para mostrar flujos de inicialización, descubrimiento, ejecución y notificación
- **Ejemplos de Código**: Ejemplos multilenguaje actualizados (.NET, Java, Python, JavaScript) para reflejar patrones actuales del SDK MCP

#### Seguridad (02-Security/) - Revisión Completa de Seguridad  
- **Alineación con Normas**: Total alineación con los requisitos de seguridad de la especificación MCP 2025-06-18
- **Evolución de Autenticación**: Documentada evolución desde servidores OAuth personalizados a delegación con proveedor de identidad externo (Microsoft Entra ID)
- **Análisis de Amenazas Específicas de IA**: Cobertura mejorada de vectores de ataque modernos en IA
  - Escenarios detallados de ataques por inyección de prompts con ejemplos del mundo real
  - Mecanismos de envenenamiento de herramientas y patrones de ataques "rug pull"
  - Envenenamiento de ventana contextual y ataques de confusión de modelos
- **Soluciones de Seguridad IA de Microsoft**: Cobertura integral del ecosistema de seguridad de Microsoft
  - Protectores de Prompts de IA con técnicas avanzadas de detección, enfoque y delimitadores
  - Patrones de integración de Azure Content Safety
  - Seguridad Avanzada de GitHub para protección de la cadena de suministro
- **Mitigación Avanzada de Amenazas**: Controles de seguridad detallados para
  - Secuestro de sesión con escenarios específicos de ataque MCP y requisitos criptográficos de ID de sesión
  - Problemas de “confused deputy” en escenarios de proxy MCP con requisitos de consentimiento explícito
  - Vulnerabilidades de paso de tokens con controles obligatorios de validación
- **Seguridad de la Cadena de Suministro**: Cobertura ampliada de la cadena de suministro de IA incluyendo modelos base, servicios de embeddings, proveedores de contexto y APIs de terceros
- **Seguridad de Fundamentos**: Integración mejorada con patrones de seguridad empresarial incluyendo arquitectura de confianza cero y ecosistema de seguridad de Microsoft
- **Organización de Recursos**: Clasificación de enlaces de recursos completa por tipo (Docs Oficiales, Normas, Investigación, Soluciones Microsoft, Guías de Implementación)

### Mejoras en la Calidad de la Documentación
- **Objetivos de Aprendizaje Estructurados**: Mejorados con resultados específicos y accionables
- **Referencias Cruzadas**: Añadidos enlaces entre temas relacionados de seguridad y conceptos básicos
- **Información Actualizada**: Actualizadas todas las referencias de fecha y enlaces a especificaciones con normas actuales
- **Guía de Implementación**: Añadidas pautas específicas y accionables de implementación en ambas secciones

## 16 de julio de 2025

### Mejoras en README y Navegación
- Rediseñada completamente la navegación del currículo en README.md
- Reemplazadas las etiquetas `<details>` por formato basado en tablas más accesible
- Creada opciones de diseño alternativas en nueva carpeta "alternative_layouts"
- Añadidos ejemplos de navegación con tarjetas, estilo de pestañas y acordeón
- Actualizada sección de estructura del repositorio para incluir todos los archivos recientes
- Mejorada la sección "Cómo usar este currículo" con recomendaciones claras
- Actualizados enlaces a especificación MCP para apuntar a URLs correctas
- Añadida sección de Ingeniería del Contexto (5.14) a la estructura del currículo

### Actualizaciones de la Guía de Estudio
- Revisada completamente la guía de estudio para alinear con estructura actual del repositorio
- Añadidas secciones nuevas para Clientes MCP y Herramientas, y Servidores MCP populares
- Actualizado el Mapa Visual del Currículo para reflejar con precisión todos los temas
- Mejoradas descripciones de Temas Avanzados para cubrir todas las áreas especializadas
- Actualizada la sección de Estudios de Caso para reflejar ejemplos reales
- Añadido este detallado registro de cambios

### Contribuciones de la Comunidad (06-CommunityContributions/)
- Añadida información detallada sobre servidores MCP para generación de imágenes
- Añadida sección completa sobre uso de Claude en VSCode
- Añadidas instrucciones para configuración y uso del cliente terminal Cline
- Actualizada sección de clientes MCP para incluir todas las opciones populares
- Mejorados ejemplos de contribución con muestras de código más precisas

### Temas Avanzados (05-AdvancedTopics/)
- Organizadas todas las carpetas de temas especializados con nombres consistentes
- Añadidos materiales y ejemplos de ingeniería del contexto
- Añadida documentación de integración del agente Foundry
- Mejorada documentación de integración de seguridad Entra ID

## 11 de junio de 2025

### Creación Inicial
- Lanzada primera versión del currículo MCP para Principiantes
- Creada estructura básica para las 10 secciones principales
- Implementado Mapa Visual del Currículo para navegación
- Añadidos proyectos de muestra iniciales en varios lenguajes de programación

### Primeros Pasos (03-GettingStarted/)
- Creado primeros ejemplos de implementación de servidor
- Añadida guía para desarrollo de clientes
- Instrucciones de integración de clientes LLM incluidas
- Añadida documentación de integración con VS Code
- Implementados ejemplos de servidor con Server-Sent Events (SSE)

### Conceptos Básicos (01-CoreConcepts/)
- Añadida explicación detallada de arquitectura cliente-servidor
- Creada documentación sobre componentes clave del protocolo
- Documentados patrones de mensajería en MCP

## 23 de mayo de 2025

### Estructura del Repositorio
- Inicializado repositorio con estructura básica de carpetas
- Creados archivos README para cada sección mayor
- Configurada infraestructura de traducción
- Añadidos recursos gráficos y diagramas

### Documentación
- Creado README.md inicial con resumen del currículo
- Añadidos CODE_OF_CONDUCT.md y SECURITY.md
- Configurado SUPPORT.md con guía para obtener ayuda
- Creada estructura preliminar de guía de estudio

## 15 de abril de 2025

### Planificación y Marco de Trabajo
- Planificación inicial del currículo MCP para Principiantes
- Definidos objetivos de aprendizaje y audiencia objetivo
- Esbozada estructura de 10 secciones del currículo
- Desarrollado marco conceptual para ejemplos y estudios de caso
- Creado prototipo inicial de ejemplos para conceptos clave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->