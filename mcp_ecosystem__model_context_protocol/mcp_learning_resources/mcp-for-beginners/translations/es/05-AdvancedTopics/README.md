# Temas Avanzados en MCP

[![MCP Avanzado: Agentes de IA Seguros, Escalables y Multimodales](../../../translated_images/es/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Haz clic en la imagen de arriba para ver el video de esta lección)_

Este capítulo cubre una serie de temas avanzados en la implementación del Protocolo de Contexto de Modelo (MCP), incluyendo integración multimodal, escalabilidad, mejores prácticas de seguridad e integración empresarial. Estos temas son cruciales para construir aplicaciones MCP robustas y listas para producción que puedan satisfacer las demandas de los sistemas de IA modernos.

## Resumen

Esta lección explora conceptos avanzados en la implementación del Protocolo de Contexto de Modelo, enfocándose en la integración multimodal, escalabilidad, mejores prácticas de seguridad e integración empresarial. Estos temas son esenciales para construir aplicaciones MCP de nivel producción que puedan manejar requisitos complejos en entornos empresariales.

> **Mirando hacia adelante:** varios temas abajo están afectados por la versión candidata de la especificación MCP del `2026-07-28` — Los Contextos Raíz (5.4) y el Muestreo (5.6) se basan en primitivas que la versión candidata marca como obsoletas, y la función experimental de Tareas mencionada en Características del Protocolo (5.16) se traslada a una extensión dedicada de Tareas. Consulta [Qué Cambia en MCP: La Versión Candidata 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para más detalles.

## Objetivos de Aprendizaje

Al final de esta lección, serás capaz de:

- Implementar capacidades multimodales dentro de los marcos MCP
- Diseñar arquitecturas MCP escalables para escenarios de alta demanda
- Aplicar mejores prácticas de seguridad alineadas con los principios de seguridad de MCP
- Integrar MCP con sistemas y marcos de IA empresariales
- Optimizar el rendimiento y la fiabilidad en entornos de producción

## Lecciones y Proyectos de muestra

| Enlace | Título | Descripción |
|------|-------|-------------|
| [5.1 Integración con Azure](./mcp-integration/README.md) | Integrarse con Azure | Aprende cómo integrar tu Servidor MCP en Azure |
| [5.2 Ejemplo multimodal](./mcp-multi-modality/README.md) | Ejemplos MCP multimodales  | Ejemplos para respuestas de audio, imagen y multimodales |
| [5.3 Ejemplo MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demostración MCP OAuth2 | Aplicación mínima de Spring Boot que muestra OAuth2 con MCP, tanto como Servidor de Autorización como de Recursos. Demuestra emisión segura de tokens, puntos finales protegidos, despliegue en Azure Container Apps e integración con API Management. |
| [5.4 Contextos Raíz](./mcp-root-contexts/README.md) | Contextos raíz  | Aprende más sobre el contexto raíz y cómo implementarlos (obsoleto en la versión candidata `2026-07-28`; aún válido para `2025-11-25`) |
| [5.5 Enrutamiento](./mcp-routing/README.md) | Enrutamiento | Aprende diferentes tipos de enrutamiento |
| [5.6 Muestreo](./mcp-sampling/README.md) | Muestreo | Aprende a trabajar con muestreo (obsoleto en la versión candidata `2026-07-28`; aún válido para `2025-11-25`) |
| [5.7 Escalado](./mcp-scaling/README.md) | Escalado  | Aprende sobre escalado |
| [5.8 Seguridad](./mcp-security/README.md) | Seguridad  | Asegura tu Servidor MCP |
| [5.9 Ejemplo de Búsqueda Web](./web-search-mcp/README.md) | MCP de Búsqueda Web | Servidor y cliente MCP en Python integrando SerpAPI para búsqueda web, noticias, productos y preguntas y respuestas en tiempo real. Demuestra orquestación de múltiples herramientas, integración con API externas y manejo robusto de errores. |
| [5.10 Transmisión en Tiempo Real](./mcp-realtimestreaming/README.md) | Transmisión  | La transmisión de datos en tiempo real se ha vuelto esencial en el mundo actual impulsado por datos, donde los negocios y aplicaciones requieren acceso inmediato a la información para tomar decisiones oportunas.|
| [5.11 Búsqueda Web en Tiempo Real](./mcp-realtimesearch/README.md) | Búsqueda Web | Cómo MCP transforma la búsqueda web en tiempo real proporcionando un enfoque estandarizado para la gestión de contexto entre modelos de IA, motores de búsqueda y aplicaciones.| 
| [5.12 Autenticación Entra ID para Servidores MCP](./mcp-security-entra/README.md) | Autenticación Entra ID | Microsoft Entra ID proporciona una solución robusta de gestión de identidad y acceso basada en la nube, ayudando a garantizar que solo usuarios y aplicaciones autorizados puedan interactuar con tu servidor MCP.|
| [5.13 Integración Microsoft Foundry Agent](./mcp-foundry-agent-integration/README.md) | Integración Microsoft Foundry | Aprende cómo integrar servidores del Protocolo de Contexto de Modelo con agentes Microsoft Foundry, habilitando una poderosa orquestación de herramientas y capacidades de IA empresarial con conexiones estandarizadas a fuentes externas de datos.|
| [5.14 Ingeniería del Contexto](./mcp-contextengineering/README.md) | Ingeniería del Contexto | La oportunidad futura de técnicas de ingeniería del contexto para servidores MCP, incluyendo optimización de contexto, gestión dinámica de contexto, y estrategias para ingeniería efectiva de prompts dentro de marcos MCP.|
| [5.15 Transporte Personalizado MCP](./mcp-transport/README.md) | Transporte Personalizado | Aprende a implementar mecanismos de transporte personalizados para escenarios especializados de comunicación MCP.|
| [5.16 Profundización en Características del Protocolo](./mcp-protocol-features/README.md) | Características del Protocolo | Domina características avanzadas del protocolo incluyendo notificaciones de progreso, cancelación de solicitudes, plantillas de recursos y patrones de manejo de errores.|
| [5.17 Razonamiento Multiagente Adversarial](./mcp-adversarial-agents/README.md) | Agentes Adversariales | Utiliza dos agentes con posiciones opuestas, compartiendo un solo conjunto de herramientas MCP, para detectar alucinaciones, sacar a la luz casos límite y producir resultados mejor calibrados a través de debates estructurados.|

> **Nuevo en la Especificación MCP 2025-11-25**: La especificación ahora incluye soporte experimental para **Tareas** (operaciones de larga duración con seguimiento de progreso), **Anotaciones de Herramientas** (metadatos sobre comportamiento de herramientas para seguridad), **Elicitación en Modo URL** (solicitud de contenido URL específico de clientes), y **Raíces** mejoradas (para gestión de contexto de áreas de trabajo). Consulta el [registro de cambios de la especificación MCP](https://spec.modelcontextprotocol.io/) para detalles completos.

## Referencias adicionales

Para la información más actualizada sobre temas avanzados de MCP, refiérete a:
- [Documentación MCP](https://modelcontextprotocol.io/)
- [Especificación MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositorio GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riesgos de seguridad y mitigaciones
- [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Entrenamiento práctico de seguridad

## Puntos clave

- Implementaciones MCP multimodales extienden las capacidades de IA más allá del procesamiento de texto
- La escalabilidad es esencial para despliegues empresariales y puede abordarse mediante escalado horizontal y vertical
- Medidas de seguridad integrales protegen los datos y aseguran el control adecuado de acceso
- La integración empresarial con plataformas como Azure OpenAI y Microsoft AI Foundry mejora las capacidades MCP
- Las implementaciones avanzadas de MCP se benefician de arquitecturas optimizadas y una gestión cuidadosa de recursos

## Ejercicio

Diseña una implementación MCP de nivel empresarial para un caso de uso específico:

1. Identifica los requisitos multimodales para tu caso de uso
2. Esboza los controles de seguridad necesarios para proteger datos sensibles
3. Diseña una arquitectura escalable que pueda manejar cargas variables
4. Planea puntos de integración con sistemas de IA empresariales
5. Documenta posibles cuellos de botella de rendimiento y estrategias de mitigación

## Recursos adicionales

- [Documentación Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentación Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Qué sigue

Explora las lecciones de este módulo comenzando con: [5.1 Integración MCP](./mcp-integration/README.md)

Una vez que completes este módulo, continúa con: [Módulo 6: Contribuciones de la Comunidad](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->