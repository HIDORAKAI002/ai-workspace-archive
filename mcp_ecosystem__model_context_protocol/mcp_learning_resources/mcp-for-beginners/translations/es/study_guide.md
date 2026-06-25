# Protocolo de Contexto de Modelo (MCP) para Principiantes - Guía de Estudio

Esta guía de estudio proporciona una visión general de la estructura y el contenido del repositorio para el currículo "Protocolo de Contexto de Modelo (MCP) para Principiantes". Utiliza esta guía para navegar el repositorio de manera eficiente y sacar el máximo provecho de los recursos disponibles.

## Visión General del Repositorio

El Protocolo de Contexto de Modelo (MCP) es un marco estandarizado para las interacciones entre modelos de IA y aplicaciones cliente. Inicialmente creado por Anthropic, MCP ahora es mantenido por la comunidad más amplia de MCP a través de la organización oficial de GitHub. Este repositorio ofrece un currículo completo con ejemplos de código prácticos en C#, Java, JavaScript, Python y TypeScript, diseñado para desarrolladores de IA, arquitectos de sistemas e ingenieros de software.

## Mapa Visual del Currículo

```mermaid
mindmap
  root((MCP para Principiantes))
    00. Introducción
      ::icon(fa fa-book)
      (Resumen del Protocolo)
      (Beneficios de la Estandarización)
      (Casos de Uso en el Mundo Real)
      (Fundamentos de la Integración de IA)
    01. Conceptos Básicos
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
      (Seguridad de Contenido Azure)
      (Autenticación y Autorización)
      (Escudos de Indicaciones de Microsoft)
      (Top 10 OWASP MCP)
      (Taller de Seguridad Sherpa)
    03. Primeros Pasos
      ::icon(fa fa-rocket)
      (Primera Implementación de Servidor)
      (Desarrollo de Cliente)
      (Integración Cliente LLM)
      (Extensiones de VS Code)
      (Configuración de Servidor SSE)
      (Streaming HTTP)
      (Integración de Kit de Herramientas de IA)
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
      (Plantillas de Indicaciones)
      (Proyectos de Ejemplo)
      (Patrones de Producción)
      (Estrategias de Paginación)
    05. Temas Avanzados
      ::icon(fa fa-graduation-cap)
      (Ingeniería de Contexto)
      (Integración de Agente Foundry)
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
      (Profundización en Características del Protocolo)
      (Razonamiento Multi-Agente Adversarial)
      
    06. Comunidad
      ::icon(fa fa-users)
      (Contribuciones de Código)
      (Documentación)
      (Ecosistema Cliente MCP)
      (Registro de Servidores MCP)
      (Herramientas de Generación de Imágenes)
      (Colaboración en GitHub)
    07. Adopción Temprana
      ::icon(fa fa-lightbulb)
      (Despliegues en Producción)
      (Servidores MCP de Microsoft)
      (Servicio MCP de Azure)
      (Estudios de Caso Empresariales)
      (Hoja de Ruta Futura)
    08. Mejores Prácticas
      ::icon(fa fa-check)
      (Optimización de Rendimiento)
      (Tolerancia a Fallos)
      (Resiliencia del Sistema)
      (Monitorización y Observabilidad)
    09. Estudios de Caso
      ::icon(fa fa-file-text)
      (Gestión de API de Azure)
      (Agente de Viajes IA)
      (Integración Azure DevOps)
      (Documentación MCP)
      (Registro MCP en GitHub)
      (Integración VS Code)
      (Implementaciones en el Mundo Real)
    10. Taller Práctico
      ::icon(fa fa-laptop)
      (Fundamentos del Servidor MCP)
      (Desarrollo Avanzado)
      (Integración de Kit de Herramientas de IA)
      (Despliegue en Producción)
      (Estructura de 4 Laboratorios)
    11. Laboratorios de Integración de Bases de Datos
      ::icon(fa fa-database)
      (Integración PostgreSQL)
      (Caso de Uso de Análisis Retail)
      (Seguridad a Nivel de Filas)
      (Búsqueda Semántica)
      (Despliegue en Producción)
      (Estructura de 13 Laboratorios)
      (Aprendizaje Práctico)
    12. Herramientas
      ::icon(fa fa-wrench)
      (MCP en la app Copilot)
```

## Estructura del Repositorio

El repositorio está organizado en doce secciones principales, cada una enfocada en diferentes aspectos del MCP:

1. **Introducción (00-Introduction/)**
   - Visión general del Protocolo de Contexto de Modelo
   - Por qué la estandarización es importante en las canalizaciones de IA
   - Casos prácticos y beneficios

2. **Conceptos Básicos (01-CoreConcepts/)**
   - Arquitectura cliente-servidor
   - Componentes clave del protocolo
   - Patrones de mensajería en MCP

3. **Seguridad (02-Security/)**
   - Amenazas de seguridad en sistemas basados en MCP
   - Mejores prácticas para asegurar las implementaciones
   - Estrategias de autenticación y autorización
   - **Documentación completa de seguridad**:
     - Mejores prácticas de seguridad MCP 2025
     - Guía de implementación de Azure Content Safety
     - Controles y técnicas de seguridad MCP
     - Referencia rápida de mejores prácticas MCP
   - **Temas clave de seguridad**:
     - Inyección de prompts y ataques de envenenamiento de herramientas
     - Secuestro de sesión y problemas de delegado confundido
     - Vulnerabilidades de paso de tokens
     - Permisos excesivos y control de acceso
     - Seguridad en la cadena de suministro para componentes de IA
     - Integración de Microsoft Prompt Shields

4. **Primeros Pasos (03-GettingStarted/)**
   - Configuración y preparación del entorno
   - Creación de servidores y clientes MCP básicos
   - Integración con aplicaciones existentes
   - Incluye secciones para:
     - Primera implementación de servidor
     - Desarrollo de cliente
     - Integración de cliente LLM
     - Integración con VS Code
     - Servidor de Server-Sent Events (SSE)
     - Uso avanzado del servidor
     - Streaming HTTP
     - Integración del AI Toolkit
     - Estrategias de pruebas
     - Guías de despliegue

5. **Implementación Práctica (04-PracticalImplementation/)**
   - Uso de SDKs en diferentes lenguajes de programación
   - Técnicas de depuración, pruebas y validación
   - Creación de plantillas reutilizables de prompts y flujos de trabajo
   - Proyectos de ejemplo con ejemplos de implementación

6. **Temas Avanzados (05-AdvancedTopics/)**
   - Técnicas de ingeniería de contexto
   - Integración de agentes Foundry
   - Flujos de trabajo multimodales de IA
   - Demostraciones de autenticación OAuth2
   - Capacidades de búsqueda en tiempo real
   - Streaming en tiempo real
   - Implementación de contextos raíz
   - Estrategias de enrutamiento
   - Técnicas de muestreo
   - Enfoques para escalabilidad
   - Consideraciones de seguridad
   - Integración de seguridad Entra ID
   - Integración de búsqueda web
   - Razonamiento multi-agente adversarial (patrones de debate)

7. **Contribuciones de la Comunidad (06-CommunityContributions/)**
   - Cómo contribuir con código y documentación
   - Colaboración vía GitHub
   - Mejoras impulsadas por la comunidad y retroalimentación
   - Uso de diversos clientes MCP (Claude Desktop, Cline, VSCode)
   - Trabajo con servidores MCP populares incluyendo generación de imágenes

8. **Lecciones de la Adopción Temprana (07-LessonsfromEarlyAdoption/)**
   - Implementaciones reales y casos de éxito
   - Construcción y despliegue de soluciones basadas en MCP
   - Tendencias y hoja de ruta futura
   - **Guía de servidores MCP de Microsoft**: Guía completa de 10 servidores MCP de Microsoft listos para producción incluyendo:
     - Microsoft Learn Docs MCP Server
     - Azure MCP Server (15+ conectores especializados)
     - GitHub MCP Server
     - Azure DevOps MCP Server
     - MarkItDown MCP Server
     - SQL Server MCP Server
     - Playwright MCP Server
     - Dev Box MCP Server
     - Microsoft Foundry MCP Server
     - Microsoft 365 Agents Toolkit MCP Server

9. **Mejores Prácticas (08-BestPractices/)**
   - Optimización y ajuste de rendimiento
   - Diseño de sistemas MCP tolerantes a fallos
   - Estrategias de pruebas y resistencia

10. **Estudios de Caso (09-CaseStudy/)**
    - **Siete estudios de caso completos** que demuestran la versatilidad de MCP en diversos escenarios:
    - **Agentes de viaje AI de Azure**: Orquestación multiagente con Azure OpenAI y AI Search
    - **Integración con Azure DevOps**: Automatización de procesos con actualizaciones de datos de YouTube
    - **Recuperación en tiempo real de documentación**: Cliente de consola Python con streaming HTTP
    - **Generador interactivo de planes de estudio**: Aplicación web Chainlit con IA conversacional
    - **Documentación en el editor**: Integración en VS Code con flujos de trabajo GitHub Copilot
    - **Azure API Management**: Integración empresarial de API con creación de servidor MCP
    - **Registro MCP de GitHub**: Desarrollo de ecosistema y plataforma de integración agentic
    - Ejemplos de implementación abarcando integración empresarial, productividad del desarrollador y desarrollo de ecosistemas

11. **Taller Práctico (10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/)**
    - Taller práctico completo combinando MCP con AI Toolkit
    - Construcción de aplicaciones inteligentes que conectan modelos de IA con herramientas del mundo real
    - Módulos prácticos que cubren fundamentos, desarrollo de servidor personalizado y estrategias de despliegue en producción
    - **Estructura del laboratorio**:
      - Laboratorio 1: Fundamentos del Servidor MCP
      - Laboratorio 2: Desarrollo Avanzado de Servidor MCP
      - Laboratorio 3: Integración con AI Toolkit
      - Laboratorio 4: Despliegue en producción y escalabilidad
    - Enfoque de aprendizaje basado en laboratorio con instrucciones paso a paso

12. **Laboratorios de Integración de Base de Datos MCP Server (11-MCPServerHandsOnLabs/)**
    - **Ruta de aprendizaje completa de 13 laboratorios** para construir servidores MCP listos para producción con integración PostgreSQL
    - **Implementación real de analítica minorista** usando el caso de uso Zava Retail
    - **Patrones empresariales avanzados** incluyendo Seguridad a Nivel de Fila (RLS), búsqueda semántica y acceso multiinquilino a datos
    - **Estructura completa del laboratorio**:
      - **Laboratorios 00-03: Fundamentos** - Introducción, Arquitectura, Seguridad, Configuración del entorno
      - **Laboratorios 04-06: Construcción del Servidor MCP** - Diseño de base de datos, Implementación del servidor MCP, Desarrollo de herramientas
      - **Laboratorios 07-09: Funcionalidades Avanzadas** - Búsqueda semántica, Pruebas y depuración, Integración con VS Code
      - **Laboratorios 10-12: Producción y Mejores Prácticas** - Despliegue, Monitoreo, Optimización
    - **Tecnologías Cubiertas**: Framework FastMCP, PostgreSQL, Azure OpenAI, Azure Container Apps, Application Insights
    - **Resultados del Aprendizaje**: Servidores MCP listos para producción, patrones de integración de base de datos, analítica impulsada por IA, seguridad empresarial

13. **Herramientas (12-tooling/)**
    - Aprende cómo usar MCP en la aplicación Copilot y otras herramientas

## Recursos Adicionales

El repositorio incluye recursos de apoyo:

- **Carpeta de imágenes**: Contiene diagramas e ilustraciones usadas a lo largo del currículo
- **Traducciones**: Soporte multilingüe con traducciones automáticas de la documentación
- **Recursos oficiales MCP**:
  - [Documentación MCP](https://modelcontextprotocol.io/)
  - [Especificación MCP](https://spec.modelcontextprotocol.io/)
  - [Repositorio GitHub MCP](https://github.com/modelcontextprotocol)

## Cómo Usar Este Repositorio

1. **Aprendizaje Secuencial**: Sigue los capítulos en orden (de 00 a 11) para una experiencia de aprendizaje estructurada.
2. **Enfoque por Lenguaje**: Si te interesa un lenguaje de programación específico, explora los directorios de muestras para implementaciones en tu idioma preferido.
3. **Implementación Práctica**: Comienza con la sección "Primeros Pasos" para configurar tu entorno y crear tu primer servidor y cliente MCP.
4. **Exploración Avanzada**: Una vez familiarizado con lo básico, profundiza en los temas avanzados para ampliar tu conocimiento.
5. **Participación Comunitaria**: Únete a la comunidad MCP a través de discusiones en GitHub y canales de Discord para conectar con expertos y otros desarrolladores.

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
   - Azure MCP Server (15+ conectores especializados)
   - GitHub MCP Server
   - Azure DevOps MCP Server
   - MarkItDown MCP Server
   - SQL Server MCP Server
   - Playwright MCP Server
   - Dev Box MCP Server
   - Microsoft Foundry MCP Server
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

Este repositorio da la bienvenida a contribuciones de la comunidad. Consulta la sección de Contribuciones de la Comunidad para orientación sobre cómo contribuir eficazmente al ecosistema MCP.

----

*Esta guía de estudio fue actualizada por última vez el 5 de febrero de 2026, reflejando la última Especificación MCP 2025-11-25 y proporciona una visión general del repositorio a esa fecha. El contenido del repositorio puede actualizarse después de esta fecha.*

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->