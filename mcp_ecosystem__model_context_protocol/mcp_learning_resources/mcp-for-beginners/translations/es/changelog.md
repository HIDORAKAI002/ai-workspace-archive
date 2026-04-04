# Registro de Cambios: Currículo MCP para Principiantes

Este documento sirve como un registro de todos los cambios significativos realizados en el currículo del Protocolo de Contexto de Modelo (MCP) para principiantes. Los cambios se documentan en orden cronológico inverso (los cambios más recientes primero).

## 5 de febrero de 2026

### Mejoras en la Validación y Navegación a Nivel de Repositorio

#### Nuevo Contenido del Currículo Añadido

**Módulo 03 - Comenzando**
- **12-mcp-hosts/README.md**: Nueva guía completa para la configuración de hosts MCP
  - Ejemplos de configuración para Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Plantillas de configuración JSON para todos los hosts principales
  - Tabla comparativa de tipos de transporte (stdio, SSE/HTTP, WebSocket)
  - Solución de problemas comunes de conexión
  - Mejores prácticas de seguridad para configuración de hosts

- **13-mcp-inspector/README.md**: Nueva guía de depuración para MCP Inspector
  - Métodos de instalación (npx, npm global, desde el código fuente)
  - Conexión a servidores vía stdio y HTTP/SSE
  - Herramientas de prueba, recursos y flujos de trabajo de prompts
  - Integración con VS Code para MCP Inspector
  - Escenarios comunes de depuración con soluciones

**Módulo 04 - Implementación Práctica**
- **pagination/README.md**: Nueva guía de implementación de paginación
  - Patrones de paginación basada en cursor en Python, TypeScript, Java
  - Manejo de paginación del lado del cliente
  - Estrategias de diseño de cursor (opaco vs. estructurado)
  - Recomendaciones para optimización del rendimiento

**Módulo 05 - Temas Avanzados**
- **mcp-protocol-features/README.md**: Nuevas características del protocolo en profundidad
  - Implementación de notificaciones de progreso
  - Patrones de cancelación de solicitudes
  - Plantillas de recursos con patrones URI
  - Gestión del ciclo de vida del servidor
  - Control de niveles de registro (logging)
  - Patrones de manejo de errores con códigos JSON-RPC

#### Correcciones de Navegación (más de 24 archivos actualizados)

**READMEs principales de módulos**
 Ahora enlazan tanto con la primera lección COMO con el siguiente módulo

**Archivos secundarios de 02-Security**
- Los 5 documentos suplementarios de seguridad ahora incluyen navegación "Qué sigue":

**Archivos de 09-CaseStudy**
- Todos los archivos de estudio de caso ahora tienen navegación secuencial:

**Laboratorios 10-StreamliningAI**
Se agregó sección Qué sigue al resumen del Módulo 10 y al Módulo 11

#### Correcciones de Código y Contenido

**Actualizaciones de SDK y dependencias**
Corregida versión vacía de openai a `^4.95.0`
Actualizado SDK de `^1.8.0` a `>=1.26.0`
Actualizados pines de versión de mcp a `>=1.26.0`

**Correcciones de Código**
Corregido modelo inválido `gpt-4o-mini` a `gpt-4.1-mini`

**Correcciones de Contenido**
Corregido enlace roto `READMEmd` → `README.md`, corregido encabezado del currículo `Module 1-3` → `Module 0-3`, corregida ruta sensible a mayúsculas
Eliminado contenido duplicado y corrupto del Estudio de Caso 5

**Mejoras en la Guía para Principiantes**
Añadida introducción adecuada, objetivos de aprendizaje y prerequisitos para principiantes

#### Actualizaciones del Currículo

**README.md principal**
- Añadidas entradas 3.12 (Hosts MCP), 3.13 (Inspector MCP), 4.1 (Paginación), 5.16 (Características del Protocolo) a la tabla del currículo

**READMEs de módulos**
Añadidas lecciones 12 y 13 a la lista de lecciones
Añadida sección Guías Prácticas con enlace a paginación
Añadidas lecciones 5.15 (Transporte personalizado) y 5.16 (Características del Protocolo)

**study_guide.md**
- Actualizado mapa mental con todos los nuevos temas: Configuración de Hosts MCP, Inspector MCP, Estrategias de Paginación, Profundización en Características del Protocolo

## 28 de enero de 2026

### Revisión de Conformidad con la Especificación MCP 2025-11-25

#### Mejora de Conceptos Básicos (01-CoreConcepts/)
- **Nuevo Primitivo Cliente - Roots**: Añadida documentación completa sobre el primitivo cliente Roots, que permite a los servidores entender los límites del sistema de archivos y los permisos de acceso
- **Anotaciones de Herramientas**: Añadida documentación sobre anotaciones de comportamiento de herramientas (`readOnlyHint`, `destructiveHint`) para mejores decisiones en la ejecución de herramientas
- **Llamado de Herramientas en Sampling**: Actualizada documentación de Sampling para incluir parámetros `tools` y `toolChoice` para invocación de herramientas dirigida por modelo durante solicitudes de muestreo
- **Modo URL para Elicitación**: Añadida documentación sobre elicitation basada en URL para interacciones web externas iniciadas por el servidor
- **Tareas (Experimental)**: Nueva sección que documenta la característica experimental Tasks para wrappers de ejecución duradera y recuperación diferida de resultados
- **Soporte de Iconos**: Se señala que herramientas, recursos, plantillas de recursos y prompts ahora pueden incluir iconos como metadatos adicionales

#### Actualizaciones de Documentación
- **README.md**: Añadida referencia a la versión MCP Specification 2025-11-25 y explicación de versionado basado en fecha
- **study_guide.md**: Actualizado mapa curricular para incluir Tasks y anotaciones de herramientas en la sección de Conceptos Básicos; actualizado timestamp del documento

#### Verificación de Conformidad de Especificación
- **Versión de Protocolo**: Verificado que toda la documentación referencia la actual MCP Specification 2025-11-25
- **Alineación Arquitectónica**: Confirmada la exactitud de la documentación de la arquitectura de dos capas (Capa de Datos + Capa de Transporte)
- **Documentación de Primitivos**: Validados primitivos de servidor (Recursos, Prompts, Herramientas) y primitivos cliente (Sampling, Elicitation, Logging, Roots)
- **Mecanismos de Transporte**: Verificada exactitud de documentación para transporte STDIO y HTTP Streamable
- **Guías de Seguridad**: Confirmada alineación con la documentación actual de Mejores Prácticas de Seguridad de MCP

#### Características Clave MCP 2025-11-25 Documentadas
- **Descubrimiento OpenID Connect**: Descubrimiento de servidores de autenticación vía OIDC
- **Documentos de Metadatos de Client ID OAuth**: Mecanismo recomendado de registro de clientes
- **JSON Schema 2020-12**: Dialecto predeterminado para definiciones de schema MCP
- **Sistema de Nivelación SDK**: Requisitos formalizados para soporte y mantenimiento de características SDK
- **Estructura de Gobernanza**: Formalizados Grupos de Trabajo y Grupos de Interés en la gobernanza MCP

### Actualización Mayor de Documentación de Seguridad (02-Security/)

#### Integración del Taller MCP Security Summit (Sherpa)
- **Nuevo Recurso de Capacitación Práctica**: Añadida integración completa con el [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) a toda la documentación de seguridad
- **Cobertura de Ruta de Expedición**: Documentada la progresión completa desde Base Camp hasta Summit
- **Alineación OWASP**: Toda la guía de seguridad ahora mapea a los riesgos OWASP MCP Azure Security Guide

#### Integración OWASP MCP Top 10
- **Nueva Sección**: Añadida tabla de Riesgos de Seguridad OWASP MCP Top 10 con mitigaciones Azure al README principal de Seguridad
- **Documentación basada en Riesgos**: Actualizado mcp-security-controls-2025.md con referencias a riesgos OWASP MCP para cada dominio de seguridad
- **Arquitectura de Referencia**: Enlazados patrones de arquitectura de referencia e implementación de OWASP MCP Azure Security Guide

#### Archivos de Seguridad Actualizados
- **README.md**: Añadido resumen del Taller Sherpa, tabla de ruta de expedición, resumen de riesgos OWASP MCP Top 10 y sección de capacitación práctica
- **mcp-security-controls-2025.md**: Actualizado encabezado a febrero 2026, añadidas referencias a riesgos OWASP (MCP01-MCP08), corregida inconsistencia en versión de especificación
- **mcp-security-best-practices-2025.md**: Añadida sección de recursos Sherpa y OWASP, actualizado timestamp
- **mcp-best-practices.md**: Añadida sección de capacitación práctica con enlaces a Sherpa y OWASP
- **azure-content-safety-implementation.md**: Añadida referencia OWASP MCP06, alineación con Sherpa Camp 3 y sección de recursos adicionales

#### Nuevos Enlaces a Recursos Añadidos
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)
- Páginas individuales de riesgos OWASP MCP (MCP01-MCP10)

### Alineación del Currículo con MCP Specification 2025-11-25

#### Módulo 03 - Comenzando
- **Documentación SDK**: Añadido Go SDK a la lista oficial de SDK; actualizadas todas las referencias a SDK para alinear con MCP Specification 2025-11-25
- **Clarificación de Transporte**: Actualizadas descripciones de transporte STDIO y HTTP Streaming con referencias explícitas a la especificación

#### Módulo 04 - Implementación Práctica
- **Actualizaciones SDK**: Añadido Go SDK; lista SDK actualizada con referencia a versión de especificación
- **Especificación de Autorización**: Actualizado enlace de especificación MCP Authorization a la versión actual 2025-11-25

#### Módulo 05 - Temas Avanzados
- **Nuevas Características**: Añadida nota sobre nuevas características de MCP Specification 2025-11-25 (Tasks, anotaciones de herramienta, elicitation modo URL, Roots)
- **Recursos de Seguridad**: Añadidos enlaces OWASP MCP Top 10 y Taller Sherpa a referencias adicionales

#### Módulo 06 - Contribuciones de la Comunidad
- **Lista SDK**: Añadidos SDKs Swift y Rust; actualizado enlace de especificación a 2025-11-25
- **Referencia de Especificación**: Actualizado enlace de MCP Specification a URL directa de especificación

#### Módulo 07 - Lecciones de la Adopción Temprana
- **Actualizaciones de Recursos**: Añadidos enlace a MCP Specification 2025-11-25 y OWASP MCP Top 10 a recursos adicionales

#### Módulo 08 - Mejores Prácticas
- **Versión de Especificación**: Actualizada referencia MCP Specification a 2025-11-25
- **Recursos de Seguridad**: Añadidos OWASP MCP Top 10 y Taller Sherpa a referencias adicionales

#### Módulo 10 - Optimización de Flujos AI
- **Actualización de Badge**: Cambiado badge de versión MCP de versión SDK (1.9.3) a versión especificación (2025-11-25)
- **Enlaces de Recursos**: Actualizado enlace MCP Specification; añadido OWASP MCP Top 10

#### Módulo 11 - Laboratorios Prácticos MCP Server
- **Referencia de Especificación**: Actualizado enlace MCP Specification a versión 2025-11-25
- **Recursos de Seguridad**: Añadido OWASP MCP Top 10 a recursos oficiales

## 18 de diciembre de 2025

### Actualización de Documentación de Seguridad - MCP Specification 2025-11-25

#### Mejores Prácticas de Seguridad MCP (02-Security/mcp-best-practices.md) - Actualización de Versión de Especificación
- **Actualización de Versión de Protocolo**: Actualizado para referenciar la última MCP Specification 2025-11-25 (publicada el 25 de noviembre de 2025)
  - Actualizadas todas las referencias de versión de especificación de 2025-06-18 a 2025-11-25
  - Actualizadas referencias de fecha del documento de 18 de agosto de 2025 a 18 de diciembre de 2025
  - Verificado que todas las URLs de especificación apunten a la documentación actual
- **Validación de Contenido**: Validación exhaustiva de las mejores prácticas de seguridad contra los estándares más recientes
  - **Soluciones de Seguridad Microsoft**: Verificada terminología actual y enlaces para Prompt Shields (anteriormente "detección de riesgo jailbreak"), Azure Content Safety, Microsoft Entra ID y Azure Key Vault
  - **Seguridad OAuth 2.1**: Confirmada alineación con las mejores prácticas de seguridad OAuth más recientes
  - **Estándares OWASP**: Validados referencia a OWASP Top 10 para LLMs se mantiene actual
  - **Servicios Azure**: Verificados todos enlaces y mejores prácticas de documentación Microsoft Azure
- **Alineación con Estándares**: Todos los estándares de seguridad referenciados confirmados vigentes
  - Marco de Gestión de Riesgos de IA NIST
  - ISO 27001:2022
  - Mejores prácticas de seguridad OAuth 2.1
  - Marcos de seguridad y cumplimiento Azure
- **Recursos de Implementación**: Validados todos enlaces a guías de implementación y recursos
  - Patrones de autenticación de Azure API Management
  - Guías de integración Microsoft Entra ID
  - Gestión de secretos Azure Key Vault
  - Soluciones de pipelines DevSecOps y monitoreo

### Aseguramiento de Calidad de la Documentación
- **Conformidad de Especificación**: Asegurado que todos los requerimientos obligatorios de seguridad MCP (DEBEN/NO DEBEN) estén alineados con la última especificación
- **Actualización de Recursos**: Verificado que todos los enlaces externos a documentación Microsoft, estándares de seguridad y guías de implementación estén vigentes
- **Cobertura de Mejores Prácticas**: Confirmada cobertura completa de autenticación, autorización, amenazas específicas de IA, seguridad de cadena de suministro y patrones empresariales

## 6 de octubre de 2025

### Expansión de la Sección Comenzando – Uso Avanzado del Servidor & Autenticación Simple

#### Uso Avanzado del Servidor (03-GettingStarted/10-advanced)
- **Nuevo Capítulo Añadido**: Introducción de guía completa para uso avanzado de servidores MCP, cubriendo arquitecturas tanto de servidor regular como de bajo nivel.
  - **Servidor Regular vs. Bajo Nivel**: Comparación detallada y ejemplos de código en Python y TypeScript para ambos enfoques.
  - **Diseño Basado en Handlers**: Explicación de gestión basada en handlers para herramientas/recursos/prompts para implementaciones de servidor escalables y flexibles.
  - **Patrones Prácticos**: Escenarios del mundo real donde patrones de servidor de bajo nivel son beneficiosos para características y arquitecturas avanzadas.

#### Autenticación Simple (03-GettingStarted/11-simple-auth)
- **Nuevo Capítulo Añadido**: Guía paso a paso para implementar autenticación simple en servidores MCP.
  - **Conceptos de Auth**: Explicación clara de autenticación vs. autorización y manejo de credenciales.
  - **Implementación de Auth Básica**: Patrones de autenticación basados en middleware en Python (Starlette) y TypeScript (Express), con ejemplos de código.
  - **Progresión hacia Seguridad Avanzada**: Orientación para comenzar con autenticación simple y avanzar a OAuth 2.1 y RBAC, con referencias a módulos de seguridad avanzados.

Estas adiciones proveen orientación práctica y aplicada para construir implementaciones de servidores MCP más robustas, seguras y flexibles, conectando conceptos fundamentales con patrones avanzados de producción.

## 29 de septiembre de 2025

### Laboratorios de Integración de Bases de Datos del Servidor MCP - Ruta Completa de Aprendizaje Práctico

#### 11-MCPServerHandsOnLabs - Nuevo Currículo Completo de Integración de Base de Datos
- **Completa Ruta de Aprendizaje de 13 Laboratorios**: Añadido currículo práctico integral para la construcción de servidores MCP listos para producción con integración de base de datos PostgreSQL  
  - **Implementación en el Mundo Real**: Caso de uso de análisis Zava Retail demostrando patrones de nivel empresarial  
  - **Progresión de Aprendizaje Estructurada**:  
    - **Laboratorios 00-03: Fundamentos** - Introducción, Arquitectura Central, Seguridad y Multi-tenencia, Configuración del Entorno  
    - **Laboratorios 04-06: Construcción del Servidor MCP** - Diseño y Esquema de Base de Datos, Implementación del Servidor MCP, Desarrollo de Herramientas  
    - **Laboratorios 07-09: Funcionalidades Avanzadas** - Integración de Búsqueda Semántica, Pruebas y Depuración, Integración con VS Code  
    - **Laboratorios 10-12: Producción y Mejores Prácticas** - Estrategias de Despliegue, Monitoreo y Observabilidad, Mejores Prácticas y Optimización  
  - **Tecnologías Empresariales**: Marco FastMCP, PostgreSQL con pgvector, incrustaciones Azure OpenAI, Azure Container Apps, Application Insights  
  - **Características Avanzadas**: Seguridad a Nivel de Fila (RLS), búsqueda semántica, acceso a datos multi-inquilino, incrustaciones vectoriales, monitoreo en tiempo real  

#### Estandarización de Terminología - Conversión de Módulo a Laboratorio  
- **Actualización Integral de Documentación**: Actualizados sistemáticamente todos los archivos README en 11-MCPServerHandsOnLabs para usar la terminología "Laboratorio" en lugar de "Módulo"  
  - **Encabezados de Sección**: Actualizado "Qué Cubre Este Módulo" a "Qué Cubre Este Laboratorio" en los 13 laboratorios  
  - **Descripción del Contenido**: Cambiado "Este módulo proporciona..." a "Este laboratorio proporciona..." en toda la documentación  
  - **Objetivos de Aprendizaje**: Actualizado "Al final de este módulo..." a "Al final de este laboratorio..."  
  - **Enlaces de Navegación**: Convertidas todas las referencias "Módulo XX:" a "Laboratorio XX:" en referencias cruzadas y navegación  
  - **Seguimiento de Finalización**: Actualizado "Después de completar este módulo..." a "Después de completar este laboratorio..."  
  - **Preservación de Referencias Técnicas**: Mantenidas referencias a módulos Python en archivos de configuración (por ejemplo, `"module": "mcp_server.main"`)  

#### Mejoras en Guía de Estudio (study_guide.md)  
- **Mapa Visual del Currículo**: Añadida nueva sección "11. Laboratorios de Integración de Base de Datos" con visualización completa de la estructura de laboratorios  
- **Estructura del Repositorio**: Actualizada de diez a once secciones principales con descripción detallada de 11-MCPServerHandsOnLabs  
- **Guía de Ruta de Aprendizaje**: Mejoradas instrucciones de navegación para cubrir secciones 00-11  
- **Cobertura Tecnológica**: Añadidos detalles de FastMCP, PostgreSQL, e integración de servicios Azure  
- **Resultados de Aprendizaje**: Enfatizado desarrollo de servidores listos para producción, patrones de integración de bases de datos y seguridad empresarial  

#### Mejora de la Estructura del README Principal  
- **Terminología Basada en Laboratorios**: Actualizado README.md principal en 11-MCPServerHandsOnLabs para usar consistentemente la estructura de "Laboratorio"  
- **Organización de la Ruta de Aprendizaje**: Progresión clara desde conceptos fundamentales hasta implementación avanzada y despliegue en producción  
- **Enfoque en el Mundo Real**: Énfasis en aprendizaje práctico con patrones tecnológicos de nivel empresarial  

### Mejoras en Calidad y Consistencia de la Documentación  
- **Énfasis en Aprendizaje Práctico**: Reforzado enfoque basado en laboratorios a lo largo de la documentación  
- **Foco en Patrones Empresariales**: Destacada implementación lista para producción y consideraciones de seguridad empresarial  
- **Integración Tecnológica**: Cobertura integral de servicios modernos de Azure y patrones de integración de IA  
- **Progresión de Aprendizaje**: Ruta clara y estructurada desde conceptos básicos hasta despliegue en producción  

## 26 de septiembre de 2025  

### Mejora de Estudios de Caso - Integración del Registro MCP de GitHub  

#### Estudios de Caso (09-CaseStudy/) - Enfoque en Desarrollo del Ecosistema  
- **README.md**: Ampliación significativa con estudio de caso integral del Registro MCP de GitHub  
  - **Estudio de Caso Registro MCP GitHub**: Nuevo estudio exhaustivo que examina el lanzamiento del Registro MCP de GitHub en septiembre de 2025  
    - **Análisis del Problema**: Examen detallado de los desafíos fragmentados en descubrimiento y despliegue de servidores MCP  
    - **Arquitectura de la Solución**: Enfoque de registro centralizado de GitHub con instalación en un clic vía VS Code  
    - **Impacto Empresarial**: Mejoras medibles en la incorporación y productividad de desarrolladores  
    - **Valor Estratégico**: Enfoque en despliegue modular de agentes e interoperabilidad entre herramientas  
    - **Desarrollo del Ecosistema**: Posicionamiento como plataforma fundamental para integración agentica  
  - **Estructura Mejorada de Estudios de Caso**: Actualizados los siete estudios de caso con formato consistente y descripciones detalladas  
    - Agentes de Viaje Azure AI: Énfasis en orquestación multi-agente  
    - Integración Azure DevOps: Enfoque en automatización de flujos de trabajo  
    - Recuperación de Documentación en Tiempo Real: Implementación de cliente consola en Python  
    - Generador Interactivo de Planes de Estudio: Aplicación web conversacional Chainlit  
    - Documentación en el Editor: Integración con VS Code y GitHub Copilot  
    - Administración de API Azure: Patrones de integración de API empresariales  
    - Registro MCP GitHub: Desarrollo del ecosistema y plataforma comunitaria  
  - **Conclusión Exhaustiva**: Sección reescrita destacando siete estudios de caso que abarcan múltiples dimensiones de implementación MCP  
    - Integración Empresarial, Orquestación Multi-Agente, Productividad del Desarrollador  
    - Desarrollo del Ecosistema, Aplicaciones Educativas  
    - Perspectivas mejoradas sobre patrones arquitectónicos, estrategias de implementación y mejores prácticas  
    - Énfasis en MCP como protocolo maduro y listo para producción  

#### Actualizaciones de Guía de Estudio (study_guide.md)  
- **Mapa Visual del Currículo**: Actualizado el mapa mental para incluir Registro MCP GitHub en la sección de Estudios de Caso  
- **Descripción de Estudios de Caso**: Mejoradas de descripciones genéricas a desglose detallado de siete estudios de caso completos  
- **Estructura del Repositorio**: Actualizada la sección 10 para reflejar cobertura integral de estudios de caso con detalles específicos de implementación  
- **Integración del Registro de Cambios**: Añadida entrada del 26 de septiembre de 2025 documentando la adición del Registro MCP de GitHub y mejoras en estudios de caso  
- **Actualización de Fechas**: Actualizado sello de tiempo en pie de página para reflejar la última revisión (26 de septiembre de 2025)  

### Mejoras en Calidad de Documentación  
- **Mejora de Consistencia**: Formato y estructura estandarizados en todos los estudios de caso  
- **Cobertura Integral**: Estudios de caso que ahora abarcan escenarios empresariales, productividad de desarrolladores y desarrollo de ecosistemas  
- **Posicionamiento Estratégico**: Mayor enfoque en MCP como plataforma fundamental para despliegue de sistemas agenticos  
- **Integración de Recursos**: Actualizados recursos adicionales para incluir enlace al Registro MCP de GitHub  

## 15 de septiembre de 2025  

### Expansión de Temas Avanzados - Transportes Personalizados e Ingeniería de Contexto  

#### Transportes Personalizados MCP (05-AdvancedTopics/mcp-transport/) - Nueva Guía de Implementación Avanzada  
- **README.md**: Guía completa de implementación para mecanismos de transporte MCP personalizados  
  - **Transporte Azure Event Grid**: Implementación integral de transporte sin servidor basado en eventos  
    - Ejemplos en C#, TypeScript y Python con integración de Azure Functions  
    - Patrones de arquitectura basada en eventos para soluciones MCP escalables  
    - Receptores webhook y manejo de mensajes push  
  - **Transporte Azure Event Hubs**: Implementación de transporte de streaming de alto rendimiento  
    - Capacidades de streaming en tiempo real para escenarios de baja latencia  
    - Estrategias de particionamiento y gestión de puntos de control  
    - Agrupamiento de mensajes y optimización de rendimiento  
  - **Patrones de Integración Empresarial**: Ejemplos arquitectónicos listos para producción  
    - Procesamiento MCP distribuido a través de múltiples Azure Functions  
    - Arquitecturas de transporte híbrido que combinan múltiples tipos de transporte  
    - Durabilidad, confiabilidad y manejo de errores de mensajes  
  - **Seguridad y Monitoreo**: Integración con Azure Key Vault y patrones de observabilidad  
    - Autenticación con identidad gestionada y acceso con privilegios mínimos  
    - Telemetría de Application Insights y monitoreo de rendimiento  
    - Cortafuegos y patrones de tolerancia a fallos  
  - **Frameworks de Pruebas**: Estrategias completas de pruebas para transportes personalizados  
    - Pruebas unitarias con dobles y frameworks de simulación  
    - Pruebas de integración con Azure Test Containers  
    - Consideraciones para pruebas de rendimiento y carga  

#### Ingeniería de Contexto (05-AdvancedTopics/mcp-contextengineering/) - Disciplina Emergente de IA  
- **README.md**: Exploración completa de la ingeniería de contexto como campo emergente  
  - **Principios Básicos**: Compartición completa de contexto, conciencia de decisiones de acción y gestión de ventana de contexto  
  - **Alineación con Protocolo MCP**: Cómo el diseño MCP aborda los desafíos de la ingeniería de contexto  
    - Limitaciones de ventana de contexto y estrategias de carga progresiva  
    - Determinación de relevancia y recuperación dinámica de contexto  
    - Manejo multimodal de contexto y consideraciones de seguridad  
  - **Enfoques de Implementación**: Arquitecturas de un solo hilo vs. multi-agente  
    - Fragmentación y priorización del contexto  
    - Carga progresiva y estrategias de compresión de contexto  
    - Enfoques estratificados y optimización de recuperación  
  - **Marco de Medición**: Métricas emergentes para evaluación de efectividad de contexto  
    - Eficiencia de entrada, rendimiento, calidad y consideraciones de experiencia de usuario  
    - Enfoques experimentales para optimización de contexto  
    - Análisis de fallos y metodologías de mejora  

#### Actualizaciones en Navegación del Currículo (README.md)  
- **Estructura Mejorada del Módulo**: Actualizada tabla del currículo para incluir nuevos temas avanzados  
  - Añadidos Ingeniería de Contexto (5.14) y Transporte Personalizado (5.15)  
  - Formato consistente y enlaces de navegación en todos los módulos  
  - Descripciones actualizadas para reflejar alcance actual del contenido  

### Mejoras en Estructura del Directorio  
- **Estandarización de Nombres**: Renombrado "mcp transport" a "mcp-transport" para coherencia con otras carpetas de temas avanzados  
- **Organización de Contenido**: Todas las carpetas 05-AdvancedTopics ahora siguen patrón de nombres consistente (mcp-[tema])  

### Mejoras en Calidad de Documentación  
- **Alineación con Especificación MCP**: Todo nuevo contenido referencia la Especificación MCP 2025-06-18 vigente  
- **Ejemplos Multilenguaje**: Ejemplos de código completos en C#, TypeScript y Python  
- **Enfoque Empresarial**: Patrones listos para producción e integración en la nube Azure a lo largo de todo el contenido  
- **Documentación Visual**: Diagramas Mermaid para visualización de arquitectura y flujos  

## 18 de agosto de 2025  

### Actualización Integral de Documentación - Estándares MCP 2025-06-18  

#### Mejores Prácticas de Seguridad MCP (02-Security/) - Modernización Completa  
- **MCP-SECURITY-BEST-PRACTICES-2025.md**: Reescritura completa alineada con Especificación MCP 2025-06-18  
  - **Requerimientos Obligatorios**: Añadidos requisitos MUST / MUST NOT explícitos de la especificación oficial con indicadores visuales claros  
  - **12 Prácticas Clave de Seguridad**: Reestructurado de lista de 15 puntos a dominios complejos de seguridad  
    - Seguridad de Tokens y Autenticación con integración de proveedor de identidad externo  
    - Gestión de Sesiones y Seguridad de Transporte con requisitos criptográficos  
    - Protección de Amenazas Específicas de IA con integración Microsoft Prompt Shields  
    - Control de Acceso y Permisos con principio de mínimo privilegio  
    - Seguridad de Contenido y Monitoreo con integración Azure Content Safety  
    - Seguridad de la Cadena de Suministro con verificación integral de componentes  
    - Seguridad OAuth y Prevención de Confused Deputy con implementación PKCE  
    - Respuesta a Incidentes y Recuperación con capacidades automatizadas  
    - Cumplimiento y Gobernanza con alineamiento regulatorio  
    - Controles Avanzados de Seguridad con arquitectura de confianza cero  
    - Integración del Ecosistema de Seguridad Microsoft con soluciones integrales  
    - Evolución Continua de la Seguridad con prácticas adaptativas  
  - **Soluciones de Seguridad Microsoft**: Guía mejorada para integración de Prompt Shields, Azure Content Safety, Entra ID y GitHub Advanced Security  
  - **Recursos de Implementación**: Enlaces categorizados completos entre Documentación Oficial MCP, soluciones Microsoft, estándares de seguridad y guías de implementación  

#### Controles Avanzados de Seguridad (02-Security/) - Implementación Empresarial  
- **MCP-SECURITY-CONTROLS-2025.md**: Revisión completa con marco de seguridad empresarial  
  - **9 Dominios Complejos de Seguridad**: Ampliados desde controles básicos a marco detallado empresarial  
    - Autenticación y Autorización Avanzadas con integración Microsoft Entra ID  
    - Seguridad de Tokens y Controles Anti-Passthrough con validación exhaustiva  
    - Controles de Seguridad de Sesión con prevención de secuestro  
    - Controles Específicos de IA con prevención de inyección de prompts y envenenamiento de herramientas  
    - Prevención de Ataques Confused Deputy con seguridad proxy OAuth  
    - Seguridad en Ejecución de Herramientas con sandboxing y aislamiento  
    - Controles de Seguridad de Cadena de Suministro con verificación de dependencias  
    - Controles de Monitoreo y Detección con integración SIEM  
    - Respuesta a Incidentes y Recuperación con capacidades automatizadas  
  - **Ejemplos de Implementación**: Añadidos bloques YAML detallados y ejemplos de código  
  - **Integración de Soluciones Microsoft**: Cobertura exhaustiva de servicios de seguridad Azure, GitHub Advanced Security y gestión de identidad empresarial  

#### Temas Avanzados de Seguridad (05-AdvancedTopics/mcp-security/) - Implementación Lista para Producción  
- **README.md**: Reescritura completa para implementación de seguridad empresarial  
  - **Alineación Actual con Especificación**: Actualizado a MCP Specification 2025-06-18 con requisitos obligatorios de seguridad  
  - **Autenticación Mejorada**: Integración Microsoft Entra ID con ejemplos completos en .NET y Java Spring Security  
  - **Integración de Seguridad IA**: Implementación de Microsoft Prompt Shields y Azure Content Safety con ejemplos detallados en Python  
  - **Mitigación Avanzada de Amenazas**: Ejemplos completos para  
    - Prevención de Ataques Confused Deputy con PKCE y validación de consentimiento de usuario  
    - Prevención de Passthrough de Tokens con validación de audiencia y gestión segura de tokens  
    - Prevención de Secuestro de Sesión con enlace criptográfico y análisis comportamental  
  - **Integración Empresarial de Seguridad**: Monitoreo con Azure Application Insights, pipelines de detección de amenazas y seguridad de la cadena de suministro  
  - **Lista de Verificación de Implementación**: Controles claros obligatorios versus recomendados con beneficios del ecosistema de seguridad Microsoft  

### Calidad y Alineación con Estándares en Documentación  
- **Referencias a Especificación**: Actualizadas todas las referencias a MCP Specification 2025-06-18 vigente  
- **Ecosistema de Seguridad Microsoft**: Guía de integración mejorada en toda la documentación de seguridad  
- **Implementación Práctica**: Añadidos ejemplos detallados de código en .NET, Java y Python con patrones empresariales  
- **Organización de Recursos**: Categorización completa de documentación oficial, estándares de seguridad y guías de implementación  
- **Indicadores Visuales**: Marcado claro de requisitos obligatorios versus prácticas recomendadas  

#### Conceptos Básicos (01-CoreConcepts/) - Modernización Completa  
- **Actualización de Versión de Protocolo**: Actualizado para referenciar la actual MCP Specification 2025-06-18 con formato de versión basado en fecha (AAAA-MM-DD)  
- **Refinamiento de Arquitectura**: Descripciones mejoradas de Hosts, Clientes y Servidores para reflejar patrones actuales de arquitectura MCP
  - Los hosts ahora están claramente definidos como aplicaciones de IA que coordinan múltiples conexiones de clientes MCP
  - Los clientes se describen como conectores de protocolo que mantienen relaciones uno a uno con el servidor
  - Los servidores se mejoraron con escenarios de despliegue local y remoto
- **Reestructuración Primitiva**: Revisión completa de los primitivos de servidor y cliente
  - Primitivos del Servidor: Recursos (fuentes de datos), Prompts (plantillas), Herramientas (funciones ejecutables) con explicaciones detalladas y ejemplos
  - Primitivos del Cliente: Muestreo (completados LLM), Solicitación (entrada de usuario), Registro (depuración/monitoreo)
  - Actualizado con patrones actuales de métodos de descubrimiento (`*/list`), recuperación (`*/get`) y ejecución (`*/call`)
- **Arquitectura del Protocolo**: Introducción de modelo de arquitectura de dos capas
  - Capa de Datos: Base JSON-RPC 2.0 con gestión de ciclo de vida y primitivos
  - Capa de Transporte: Mecanismos de transporte STDIO (local) y HTTP Streamable con SSE (remoto)
- **Marco de Seguridad**: Principios de seguridad comprensivos incluyendo consentimiento explícito del usuario, protección de privacidad de datos, seguridad en ejecución de herramientas y seguridad en la capa de transporte
- **Patrones de Comunicación**: actualización de mensajes del protocolo para mostrar flujos de inicialización, descubrimiento, ejecución y notificación
- **Ejemplos de Código**: Actualización de ejemplos multilenguaje (.NET, Java, Python, JavaScript) para reflejar patrones actuales del SDK MCP

#### Seguridad (02-Security/) - Revisión Completa de Seguridad  
- **Alineación con Estándares**: Total alineación con requisitos de seguridad de la Especificación MCP 2025-06-18
- **Evolución de Autenticación**: Documentación de evolución desde servidores OAuth personalizados hasta delegación de proveedores externos de identidad (Microsoft Entra ID)
- **Análisis de Amenazas Específicas de IA**: Cobertura ampliada de vectores modernos de ataques en IA
  - Escenarios detallados de ataques de inyección de prompt con ejemplos del mundo real
  - Mecanismos de envenenamiento de herramientas y patrones de ataques "rug pull"
  - Envenenamiento del contexto de ventana y ataques de confusión del modelo
- **Soluciones de Seguridad de IA de Microsoft**: Cobertura completa del ecosistema de seguridad Microsoft
  - AI Prompt Shields con técnicas avanzadas de detección, enfoque y delimitadores
  - Patrones de integración con Azure Content Safety
  - Seguridad avanzada de GitHub para protección de la cadena de suministro
- **Mitigación Avanzada de Amenazas**: Controles de seguridad detallados para
  - Secuestro de sesión con escenarios de ataque específicos de MCP y requisitos criptográficos para ID de sesión
  - Problemas de representante confundido en escenarios de proxy MCP con requisitos de consentimiento explícito
  - Vulnerabilidades en paso de token con controles obligatorios de validación
- **Seguridad de la Cadena de Suministro**: Cobertura ampliada de cadena de suministro de IA incluyendo modelos base, servicios de embeddings, proveedores de contexto y APIs de terceros
- **Seguridad de Fundamentos**: Integración mejorada con patrones de seguridad empresarial incluyendo arquitectura de confianza cero y ecosistema de seguridad Microsoft
- **Organización de Recursos**: Enlaces de recursos categorizados por tipo (Documentación Oficial, Normas, Investigación, Soluciones Microsoft, Guías de Implementación)

### Mejoras en la Calidad de la Documentación
- **Objetivos de Aprendizaje Estructurados**: Objetivos de aprendizaje mejorados con resultados específicos y accionables
- **Referencias Cruzadas**: Inclusión de enlaces entre temas relacionados de seguridad y conceptos centrales
- **Información Actualizada**: Actualización de todas las fechas y enlaces de especificaciones a estándares actuales
- **Guías de Implementación**: Inclusión de pautas específicas y accionables a lo largo de ambas secciones

## 16 de julio de 2025

### Mejoras en README y Navegación
- Rediseño completo de la navegación curricular en README.md
- Reemplazo de etiquetas `<details>` con formato basado en tablas más accesible
- Creación de opciones de diseño alternativas en nueva carpeta "alternative_layouts"
- Inclusión de ejemplos de navegación tipo tarjeta, con pestañas y acordeón
- Actualización de la sección de estructura del repositorio para incluir todos los archivos recientes
- Mejora de la sección "Cómo usar este currículo" con recomendaciones claras
- Actualización de enlaces de especificación MCP para apuntar a URLs correctas
- Agregado sección de Ingeniería de Contexto (5.14) a la estructura curricular

### Actualizaciones de la Guía de Estudio
- Revisión completa de la guía de estudio para alinearse con la estructura actual del repositorio
- Inserción de nuevas secciones para MCP Clientes y Herramientas, y Servidores MCP Populares
- Actualización del Mapa Visual del Currículo para reflejar con precisión todos los temas
- Mejora de descripciones de Temas Avanzados para cubrir todas las áreas especializadas
- Actualización de la sección de Estudios de Caso para reflejar ejemplos reales
- Añadido este registro detallado de cambios

### Contribuciones de la Comunidad (06-CommunityContributions/)
- Información detallada añadida sobre servidores MCP para generación de imágenes
- Sección completa sobre uso de Claude en VSCode
- Instrucciones para configuración y uso del cliente terminal Cline
- Actualización de sección de clientes MCP para incluir todas las opciones populares
- Mejora de ejemplos de contribución con muestras de código más precisas

### Temas Avanzados (05-AdvancedTopics/)
- Organización uniforme de todas las carpetas de temas especializados
- Inclusión de materiales y ejemplos de ingeniería de contexto
- Documentación de integración con agente Foundry
- Mejora de documentación de integración de seguridad Entra ID

## 11 de junio de 2025

### Creación Inicial
- Publicación de la primera versión del currículo MCP para principiantes
- Creación de estructura básica para las 10 secciones principales
- Implementación de Mapa Visual del Currículo para navegación
- Inclusión de proyectos de ejemplo iniciales en varios lenguajes de programación

### Empezando (03-GettingStarted/)
- Creación de primeros ejemplos de implementación de servidor
- Guía para desarrollo de clientes
- Inclusión de instrucciones de integración de cliente LLM
- Documentación de integración con VS Code
- Implementación de ejemplos de servidor con Server-Sent Events (SSE)

### Conceptos Básicos (01-CoreConcepts/)
- Explicación detallada de arquitectura cliente-servidor
- Documentación de componentes clave del protocolo
- Documentación de patrones de mensajería en MCP

## 23 de mayo de 2025

### Estructura del Repositorio
- Inicialización del repositorio con estructura básica de carpetas
- Creación de archivos README para cada sección principal
- Configuración de infraestructura de traducción
- Añadido de recursos gráficos y diagramas

### Documentación
- Creación inicial de README.md con visión general del currículo
- Incorporación de CODE_OF_CONDUCT.md y SECURITY.md
- Configuración de SUPPORT.md con guía para obtener ayuda
- Creación de estructura preliminar de la guía de estudio

## 15 de abril de 2025

### Planificación y Marco
- Planificación inicial para el currículo MCP para principiantes
- Definición de objetivos de aprendizaje y audiencia objetivo
- Delimitación de estructura de 10 secciones del currículo
- Desarrollo de marco conceptual para ejemplos y estudios de caso
- Creación de ejemplos prototipo iniciales para conceptos clave

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por humanos. No nos hacemos responsables de malentendidos o interpretaciones erróneas que puedan surgir del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->