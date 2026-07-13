# Temas Avanzados en MCP

[![MCP Avanzado: Agentes de IA Seguros, Escalables y Multimodales](../../../translated_images/es/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Haz clic en la imagen de arriba para ver el video de esta lección)_

Este capítulo cubre una serie de temas avanzados en la implementación del Protocolo de Contexto de Modelo (MCP), incluyendo integración multimodal, escalabilidad, mejores prácticas de seguridad y la integración empresarial. Estos temas son cruciales para construir aplicaciones MCP robustas y listas para producción que puedan satisfacer las demandas de los sistemas modernos de IA.

## Visión General

Esta lección explora conceptos avanzados en la implementación del Protocolo de Contexto de Modelo, centrándose en la integración multimodal, escalabilidad, mejores prácticas de seguridad y la integración en entornos empresariales. Estos temas son esenciales para construir aplicaciones MCP de grado producción que puedan manejar requisitos complejos en entornos empresariales.

> **Mirando hacia adelante:** varios temas a continuación se ven afectados por la versión candidata de la especificación MCP `2026-07-28`: Los Contextos Raíz (5.4) y el Muestreo (5.6) se basan en primitivas que la versión candidata marca como obsoletas, y la función experimental de Tareas referenciada en Características del Protocolo (5.16) se traslada a una extensión dedicada de Tareas. Consulta [Qué Cambia en MCP: La Versión Candidata 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para más detalles.

## Objetivos de Aprendizaje

Al finalizar esta lección, serás capaz de:

- Implementar capacidades multimodales dentro de los frameworks MCP
- Diseñar arquitecturas MCP escalables para escenarios de alta demanda
- Aplicar mejores prácticas de seguridad alineadas con los principios de seguridad de MCP
- Integrar MCP con sistemas y frameworks de IA empresariales
- Optimizar el rendimiento y la confiabilidad en entornos de producción

## Lecciones y Proyectos de ejemplo

| Enlace | Título | Descripción |
|------|-------|-------------|
| [5.1 Integración con Azure](./mcp-integration/README.md) | Integración con Azure | Aprende cómo integrar tu Servidor MCP en Azure |
| [5.2 Ejemplo multimodal](./mcp-multi-modality/README.md) | Ejemplos multimodales MCP | Ejemplos para respuesta de audio, imagen y multimodal |
| [5.3 Ejemplo MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demostración MCP OAuth2 | Aplicación minimalista Spring Boot que muestra OAuth2 con MCP, tanto como Servidor de Autorización como Servidor de Recursos. Demuestra emisión segura de tokens, endpoints protegidos, despliegue en Azure Container Apps e integración con API Management. |
| [5.4 Contextos Raíz](./mcp-root-contexts/README.md) | Contextos raíz | Aprende más sobre el contexto raíz y cómo implementarlos |
| [5.5 Enrutamiento](./mcp-routing/README.md) | Enrutamiento | Aprende diferentes tipos de enrutamiento |
| [5.6 Muestreo](./mcp-sampling/README.md) | Muestreo | Aprende cómo trabajar con muestreo |
| [5.7 Escalado](./mcp-scaling/README.md) | Escalado | Aprende sobre escalado |
| [5.8 Seguridad](./mcp-security/README.md) | Seguridad | Asegura tu Servidor MCP |
| [5.9 Ejemplo de Búsqueda Web](./web-search-mcp/README.md) | Búsqueda Web MCP | Servidor y cliente MCP en Python integrando SerpAPI para búsqueda web, noticias, productos y preguntas en tiempo real. Demuestra orquestación multimodal, integración con APIs externas y manejo robusto de errores. |
| [5.10 Transmisión en Tiempo Real](./mcp-realtimestreaming/README.md) | Streaming | La transmisión de datos en tiempo real se ha vuelto esencial en el mundo actual impulsado por datos, donde las empresas y aplicaciones requieren acceso inmediato a la información para tomar decisiones oportunas.|
| [5.11 Búsqueda Web en Tiempo Real](./mcp-realtimesearch/README.md) | Búsqueda Web | Cómo MCP transforma la búsqueda web en tiempo real proporcionando un enfoque estandarizado para la gestión del contexto entre modelos IA, motores de búsqueda y aplicaciones.| 
| [5.12 Autenticación Entra ID para Servidores MCP](./mcp-security-entra/README.md) | Autenticación Entra ID | Microsoft Entra ID ofrece una solución robusta en la nube para la gestión de identidad y acceso, ayudando a asegurar que solo usuarios y aplicaciones autorizados puedan interactuar con tu servidor MCP.|
| [5.13 Integración de Agentes Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Integración Microsoft Foundry | Aprende a integrar servidores del Protocolo de Contexto de Modelo con agentes de Microsoft Foundry, habilitando una poderosa orquestación de herramientas y capacidades de IA empresarial con conexiones estandarizadas a fuentes externas de datos.|
| [5.14 Ingeniería de Contexto](./mcp-contextengineering/README.md) | Ingeniería de Contexto | La oportunidad futura de las técnicas de ingeniería de contexto para servidores MCP, incluyendo optimización del contexto, gestión dinámica del contexto y estrategias para una ingeniería de prompts efectiva dentro de frameworks MCP.|
| [5.15 Transporte Personalizado MCP](./mcp-transport/README.md) | Transporte Personalizado | Aprende a implementar mecanismos de transporte personalizados para escenarios especializados de comunicación MCP.|
| [5.16 Profundización en Características del Protocolo](./mcp-protocol-features/README.md) | Características del Protocolo | Domina características avanzadas del protocolo incluyendo notificaciones de progreso, cancelación de solicitudes, plantillas de recursos y patrones de manejo de errores.|
| [5.17 Razonamiento Multi-Agente Adversarial](./mcp-adversarial-agents/README.md) | Agentes Adversariales | Usa dos agentes con posiciones opuestas, compartiendo un conjunto único de herramientas MCP, para detectar alucinaciones, sacar a la luz casos extremos y producir resultados mejor calibrados a través de un debate estructurado.|

> **Nuevo en la Especificación MCP 2025-11-25**: La especificación ahora incluye soporte experimental para **Tareas** (operaciones de larga duración con seguimiento de progreso), **Anotaciones de Herramientas** (metadatos sobre el comportamiento de herramientas para seguridad), **Elicitación de Modo URL** (solicitud de contenido URL específico desde clientes) y **Raíces** mejoradas (para gestión del contexto de espacios de trabajo). Consulta el [registro de cambios de la especificación MCP](https://spec.modelcontextprotocol.io/) para detalles completos.

## Referencias Adicionales

Para la información más actualizada sobre temas avanzados de MCP, consulta:
- [Documentación MCP](https://modelcontextprotocol.io/)
- [Especificación MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositorio GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riesgos de seguridad y mitigaciones
- [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Entrenamiento práctico en seguridad

## Puntos Clave

- Las implementaciones multimodales de MCP extienden las capacidades de IA más allá del procesamiento de texto
- La escalabilidad es esencial para despliegues empresariales y puede abordarse mediante escalado horizontal y vertical
- Medidas integrales de seguridad protegen los datos y aseguran un control de acceso adecuado
- La integración empresarial con plataformas como Azure OpenAI y Microsoft AI Foundry mejora las capacidades MCP
- Las implementaciones avanzadas de MCP se benefician de arquitecturas optimizadas y una gestión cuidadosa de recursos

## Ejercicio

Diseña una implementación MCP de grado empresarial para un caso de uso específico:

1. Identifica los requisitos multimodales para tu caso de uso
2. Describe los controles de seguridad necesarios para proteger datos sensibles
3. Diseña una arquitectura escalable que pueda manejar cargas variables
4. Planifica puntos de integración con sistemas IA empresariales
5. Documenta posibles cuellos de botella en rendimiento y estrategias de mitigación

## Recursos Adicionales

- [Documentación Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentación Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Qué sigue

Explora las lecciones en este módulo comenzando con: [5.1 Integración MCP](./mcp-integration/README.md)

Una vez que completes este módulo, continúa con: [Módulo 6: Contribuciones de la Comunidad](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->