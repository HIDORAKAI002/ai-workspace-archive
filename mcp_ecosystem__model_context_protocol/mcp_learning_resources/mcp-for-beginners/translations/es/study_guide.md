# Protocolo de Contexto de Modelo (MCP) para Principiantes - Guía de Estudio

Esta guía de estudio proporciona una visión general de la estructura y contenido del repositorio para el plan de estudios "Protocolo de Contexto de Modelo (MCP) para Principiantes". Utilice esta guía para navegar el repositorio de manera eficiente y aprovechar al máximo los recursos disponibles.

## Resumen del Repositorio

El Protocolo de Contexto de Modelo (MCP) es un marco estandarizado para las interacciones entre modelos de IA y aplicaciones clientes. Creado inicialmente por Anthropic, el MCP ahora es mantenido por la comunidad MCP más amplia a través de la organización oficial de GitHub. Este repositorio ofrece un plan de estudios completo con ejemplos prácticos de código en C#, Java, JavaScript, Python y TypeScript, diseñado para desarrolladores de IA, arquitectos de sistemas e ingenieros de software.

## Mapa Visual del Currículo

```mermaid
mindmap
  root((MCP para Principiantes))
    00. Introducción
      ::icon(fa fa-book)
      (Resumen del Protocolo)
      (Beneficios de la Estandarización)
      (Casos de Uso en el Mundo Real)
      (Fundamentos de Integración de IA)
    01. Conceptos Clave
      ::icon(fa fa-puzzle-piece)
      (Arquitectura Cliente-Servidor)
      (Componentes del Protocolo)
      (Patrones de Mensajería)
      (Mecanismos de Transporte)
      (Tareas - Experimental)
      (Anotaciones de Herramientas)
    02. Seguridad
      ::icon(fa fa-shield)
      (Amenazas Específicas de IA)
      (Mejores Prácticas 2025)
      (Seguridad de Contenido en Azure)
      (Autenticación y Autorización)
      (Escudos de Prompt de Microsoft)
      (OWASP MCP Top 10)
      (Taller de Seguridad Sherpa)
    03. Primeros Pasos
      ::icon(fa fa-rocket)
      (Primera Implementación de Servidor)
      (Desarrollo de Cliente)
      (Integración Cliente LLM)
      (Extensiones de VS Code)
      (Configuración de Servidor SSE)
      (Streaming HTTP)
      (Integración de Herramientas de IA)
      (Frameworks de Pruebas)
      (Uso Avanzado del Servidor)
      (Autenticación Simple)
      (Estrategias de Despliegue)
      (Configuración de Hosts MCP)
      (Inspector MCP)
    04. Implementación Práctica
      ::icon(fa fa-code)
      (SDKs Multilenguaje)
      (Pruebas y Depuración)
      (Plantillas de Prompts)
      (Proyectos de Ejemplo)
      (Patrones de Producción)
      (Estrategias de Paginación)
    05. Temas Avanzados
      ::icon(fa fa-graduation-cap)
      (Ingeniería de Contexto)
      (Integración con Foundry Agent)
      (Flujos de Trabajo IA Multimodal)
      (Autenticación OAuth2)
      (Búsqueda en Tiempo Real)
      (Protocolos de Streaming)
      (Contextos Raíz)
      (Estrategias de Enrutamiento)
      (Técnicas de Muestreo)
      (Soluciones de Escalado)
      (Endurecimiento de Seguridad)
      (Integración Entra ID)
      (Búsqueda Web MCP)
      (Profundización en Funcionalidades del Protocolo)
      
    06. Comunidad
      ::icon(fa fa-users)
      (Contribuciones de Código)
      (Documentación)
      (Ecosistema de Clientes MCP)
      (Registro de Servidores MCP)
      (Herramientas para Generación de Imágenes)
      (Colaboración en GitHub)
    07. Adopción Temprana
      ::icon(fa fa-lightbulb)
      (Despliegues en Producción)
      (Servidores MCP de Microsoft)
      (Servicio MCP en Azure)
      (Estudios de Caso Empresariales)
      (Hoja de Ruta Futura)
    08. Mejores Prácticas
      ::icon(fa fa-check)
      (Optimización de Rendimiento)
      (Tolerancia a Fallos)
      (Resiliencia del Sistema)
      (Monitoreo y Observabilidad)
    09. Estudios de Caso
      ::icon(fa fa-file-text)
      (Gestión de API en Azure)
      (Agente de Viajes IA)
      (Integración Azure DevOps)
      (Documentación MCP)
      (Registro MCP en GitHub)
      (Integración VS Code)
      (Implementaciones en el Mundo Real)
    10. Talleres Prácticos
      ::icon(fa fa-laptop)
      (Fundamentos de Servidor MCP)
      (Desarrollo Avanzado)
      (Integración de Herramientas de IA)
      (Despliegue en Producción)
      (Estructura de 4 Laboratorios)
    11. Laboratorios de Integración de Bases de Datos
      ::icon(fa fa-database)
      (Integración PostgreSQL)
      (Caso de Uso en Análisis Retail)
      (Seguridad a Nivel de Fila)
      (Búsqueda Semántica)
      (Despliegue en Producción)
      (Estructura de 13 Laboratorios)
      (Aprendizaje Práctico)
```
## Estructura del Repositorio

El repositorio está organizado en once secciones principales, cada una enfocada en diferentes aspectos del MCP:

1. **Introducción (00-Introduction/)**
   - Visión general del Protocolo de Contexto de Modelo
   - Por qué la estandarización es importante en pipelines de IA
   - Casos prácticos y beneficios

2. **Conceptos Clave (01-CoreConcepts/)**
   - Arquitectura cliente-servidor
   - Componentes clave del protocolo
   - Patrones de mensajería en MCP

3. **Seguridad (02-Security/)**
   - Amenazas de seguridad en sistemas basados en MCP
   - Mejores prácticas para asegurar implementaciones
   - Estrategias de autenticación y autorización
   - **Documentación completa de seguridad**:
     - Mejores Prácticas de Seguridad MCP 2025
     - Guía de Implementación de Azure Content Safety
     - Controles y Técnicas de Seguridad MCP
     - Referencia Rápida de Mejores Prácticas MCP
   - **Temas Clave de Seguridad**:
     - Inyección de prompts y ataques de envenenamiento de herramientas
     - Secuestro de sesión y problemas de delegado confundido
     - Vulnerabilidades de paso de tokens
     - Permisos excesivos y control de acceso
     - Seguridad en la cadena de suministro para componentes de IA
     - Integración de Microsoft Prompt Shields

4. **Primeros Pasos (03-GettingStarted/)**
   - Configuración y preparación del entorno
   - Creación básica de servidores y clientes MCP
   - Integración con aplicaciones existentes
   - Incluye secciones para:
     - Primera implementación de servidor
     - Desarrollo de clientes
     - Integración de cliente LLM
     - Integración con VS Code
     - Servidor con Server-Sent Events (SSE)
     - Uso avanzado del servidor
     - Streaming HTTP
     - Integración con AI Toolkit
     - Estrategias de pruebas
     - Directrices de despliegue

5. **Implementación Práctica (04-PracticalImplementation/)**
   - Uso de SDKs en diferentes lenguajes de programación
   - Técnicas de depuración, pruebas y validación
   - Creación de plantillas y flujos de trabajo reutilizables para prompts
   - Proyectos de ejemplo con casos de implementación

6. **Temas Avanzados (05-AdvancedTopics/)**
   - Técnicas de ingeniería de contexto
   - Integración de agente Foundry
   - Flujos de trabajo de IA multimodal 
   - Demostraciones de autenticación OAuth2
   - Capacidades de búsqueda en tiempo real
   - Streaming en tiempo real
   - Implementación de contextos raíz
   - Estrategias de enrutamiento
   - Técnicas de muestreo
   - Enfoques para escalar
   - Consideraciones de seguridad
   - Integración de seguridad Entra ID
   - Integración de búsqueda web

7. **Contribuciones de la Comunidad (06-CommunityContributions/)**
   - Cómo contribuir con código y documentación
   - Colaborar vía GitHub
   - Mejoras y retroalimentación impulsadas por la comunidad
   - Uso de varios clientes MCP (Claude Desktop, Cline, VSCode)
   - Trabajo con servidores MCP populares incluyendo generación de imágenes

8. **Lecciones de la Adopción Temprana (07-LessonsfromEarlyAdoption/)**
   - Implementaciones reales y casos de éxito
   - Construcción y despliegue de soluciones basadas en MCP
   - Tendencias y hoja de ruta futura
   - **Guía de Servidores MCP de Microsoft**: Guía completa de 10 servidores MCP de Microsoft listos para producción que incluye:
     - Microsoft Learn Docs MCP Server
     - Azure MCP Server (más de 15 conectores especializados)
     - GitHub MCP Server
     - Azure DevOps MCP Server
     - MarkItDown MCP Server
     - SQL Server MCP Server
     - Playwright MCP Server
     - Dev Box MCP Server
     - Azure AI Foundry MCP Server
     - Microsoft 365 Agents Toolkit MCP Server

9. **Mejores Prácticas (08-BestPractices/)**
   - Optimización y ajuste de rendimiento
   - Diseño de sistemas MCP tolerantes a fallos
   - Estrategias de pruebas y resiliencia

10. **Estudios de Caso (09-CaseStudy/)**
    - **Siete estudios de caso completos** que demuestran la versatilidad de MCP en diversos escenarios:
    - **Azure AI Travel Agents**: Orquestación multi-agente con Azure OpenAI y AI Search
    - **Integración con Azure DevOps**: Automatización de flujos de trabajo con actualizaciones de datos de YouTube
    - **Recuperación de Documentación en Tiempo Real**: Cliente consola Python con streaming HTTP
    - **Generador de Plan de Estudios Interactivo**: Aplicación web Chainlit con IA conversacional
    - **Documentación en el Editor**: Integración con VS Code y flujos de trabajo GitHub Copilot
    - **Gestión API de Azure**: Integración empresarial de APIs con creación de servidores MCP
    - **Registro MCP de GitHub**: Desarrollo de ecosistema y plataforma de integración agentica
    - Ejemplos de implementación que abarcan integración empresarial, productividad del desarrollador y desarrollo de ecosistemas

11. **Taller Práctico (10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/)**
    - Taller práctico integral que combina MCP con AI Toolkit
    - Construcción de aplicaciones inteligentes que conectan modelos de IA con herramientas reales
    - Módulos prácticos que cubren fundamentos, desarrollo de servidor personalizado y estrategias de despliegue en producción
    - **Estructura del Laboratorio**:
      - Laboratorio 1: Fundamentos del Servidor MCP
      - Laboratorio 2: Desarrollo Avanzado de Servidor MCP
      - Laboratorio 3: Integración de AI Toolkit
      - Laboratorio 4: Despliegue y Escalado en Producción
    - Enfoque de aprendizaje basado en laboratorios con instrucciones paso a paso

12. **Laboratorios de Integración de Bases de Datos para MCP Server (11-MCPServerHandsOnLabs/)**
    - **Completo camino de aprendizaje con 13 laboratorios** para construir servidores MCP listos para producción con integración PostgreSQL
    - **Implementación real de análisis minorista** usando el caso de uso Zava Retail
    - **Patrones de nivel empresarial** que incluyen Row Level Security (RLS), búsqueda semántica y acceso multiinquilino a datos
    - **Estructura Completa de Laboratorio**:
      - **Laboratorios 00-03: Fundamentos** - Introducción, Arquitectura, Seguridad, Configuración de Entorno
      - **Laboratorios 04-06: Construcción del Servidor MCP** - Diseño de Base de Datos, Implementación de Servidor MCP, Desarrollo de Herramientas
      - **Laboratorios 07-09: Características Avanzadas** - Búsqueda Semántica, Pruebas y Depuración, Integración con VS Code
      - **Laboratorios 10-12: Producción y Mejores Prácticas** - Despliegue, Monitoreo, Optimización
    - **Tecnologías Cubiertas**: framework FastMCP, PostgreSQL, Azure OpenAI, Azure Container Apps, Application Insights
    - **Resultados de Aprendizaje**: servidores MCP listos para producción, patrones de integración de bases de datos, análisis impulsado por IA, seguridad empresarial

## Recursos Adicionales

El repositorio incluye recursos de apoyo:

- **Carpeta de imágenes**: Contiene diagramas e ilustraciones usadas en todo el currículo
- **Traducciones**: Soporte multilingüe con traducciones automatizadas de la documentación
- **Recursos Oficiales MCP**:
  - [Documentación MCP](https://modelcontextprotocol.io/)
  - [Especificación MCP](https://spec.modelcontextprotocol.io/)
  - [Repositorio MCP en GitHub](https://github.com/modelcontextprotocol)

## Cómo Usar Este Repositorio

1. **Aprendizaje Secuencial**: Siga los capítulos en orden (00 a 11) para una experiencia de aprendizaje estructurada.
2. **Enfoque por Lenguaje**: Si le interesa un lenguaje de programación en particular, explore los directorios de ejemplos para implementaciones en su lenguaje preferido.
3. **Implementación Práctica**: Comience con la sección "Primeros Pasos" para configurar su entorno y crear su primer servidor y cliente MCP.
4. **Exploración Avanzada**: Una vez familiarizado con lo básico, profundice en los temas avanzados para ampliar sus conocimientos.
5. **Participación Comunitaria**: Únase a la comunidad MCP a través de discusiones en GitHub y canales de Discord para conectarse con expertos y otros desarrolladores.

## Clientes y Herramientas MCP

El currículo cubre varios clientes y herramientas MCP:

1. **Clientes Oficiales**:
   - Visual Studio Code 
   - MCP en Visual Studio Code
   - Claude Desktop
   - Claude en VSCode 
   - Claude API

2. **Clientes de la Comunidad**:
   - Cline (basado en terminal)
   - Cursor (editor de código)
   - ChatMCP
   - Windsurf

3. **Herramientas de Gestión MCP**:
   - MCP CLI
   - MCP Manager
   - MCP Linker
   - MCP Router

## Servidores MCP Populares

El repositorio presenta varios servidores MCP, incluyendo:

1. **Servidores MCP Oficiales de Microsoft**:
   - Microsoft Learn Docs MCP Server
   - Azure MCP Server (más de 15 conectores especializados)
   - GitHub MCP Server
   - Azure DevOps MCP Server
   - MarkItDown MCP Server
   - SQL Server MCP Server
   - Playwright MCP Server
   - Dev Box MCP Server
   - Azure AI Foundry MCP Server
   - Microsoft 365 Agents Toolkit MCP Server

2. **Servidores de Referencia Oficiales**:
   - Filesystem
   - Fetch
   - Memory
   - Sequential Thinking

3. **Generación de Imágenes**:
   - Azure OpenAI DALL-E 3
   - Stable Diffusion WebUI
   - Replicate

4. **Herramientas de Desarrollo**:
   - Git MCP
   - Terminal Control
   - Code Assistant

5. **Servidores Especializados**:
   - Salesforce
   - Microsoft Teams
   - Jira & Confluence

## Contribuciones

Este repositorio da la bienvenida a contribuciones de la comunidad. Consulte la sección Contribuciones de la Comunidad para obtener orientación sobre cómo contribuir de manera efectiva al ecosistema MCP.

----

*Esta guía de estudio fue actualizada por última vez el 5 de febrero de 2026, reflejando la última Especificación MCP 2025-11-25 y ofrece una visión general del repositorio a esa fecha. El contenido del repositorio puede actualizarse después de esta fecha.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por lograr precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por humanos. No nos hacemos responsables de malentendidos o interpretaciones erróneas derivadas del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->