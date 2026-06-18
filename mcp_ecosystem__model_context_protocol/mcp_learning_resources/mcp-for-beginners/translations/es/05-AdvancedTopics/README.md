# Temas Avanzados en MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/es/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Haz clic en la imagen de arriba para ver el video de esta lección)_

Este capítulo cubre una serie de temas avanzados en la implementación del Protocolo de Contexto de Modelo (MCP), incluyendo integración multimodal, escalabilidad, mejores prácticas de seguridad e integración empresarial. Estos temas son cruciales para construir aplicaciones MCP robustas y listas para producción que puedan satisfacer las demandas de los sistemas de IA modernos.

## Vista General

Esta lección explora conceptos avanzados en la implementación del Protocolo de Contexto de Modelo, enfocándose en la integración multimodal, escalabilidad, mejores prácticas de seguridad e integración empresarial. Estos temas son esenciales para construir aplicaciones MCP de nivel productivo que puedan manejar requerimientos complejos en entornos empresariales.

## Objetivos de Aprendizaje

Al final de esta lección, podrás:

- Implementar capacidades multimodales dentro de marcos MCP
- Diseñar arquitecturas MCP escalables para escenarios de alta demanda
- Aplicar mejores prácticas de seguridad alineadas con los principios de seguridad de MCP
- Integrar MCP con sistemas y marcos de IA empresariales
- Optimizar el rendimiento y la fiabilidad en entornos de producción

## Lecciones y Proyectos de ejemplo

| Link | Título | Descripción |
|------|-------|-------------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integración con Azure | Aprende cómo integrar tu Servidor MCP en Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Ejemplos multimodales MCP | Ejemplos para respuesta de audio, imagen y multimodal |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Aplicación mínima Spring Boot que muestra OAuth2 con MCP, tanto como Servidor de Autorización como de Recursos. Demuestra emisión segura de tokens, endpoints protegidos, despliegue en Azure Container Apps e integración con API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Contextos raíz | Aprende más sobre contexto raíz y cómo implementarlos |
| [5.5 Routing](./mcp-routing/README.md) | Enrutamiento | Aprende diferentes tipos de enrutamiento |
| [5.6 Sampling](./mcp-sampling/README.md) | Muestreo | Aprende a trabajar con muestreo |
| [5.7 Scaling](./mcp-scaling/README.md) | Escalado | Aprende sobre escalado |
| [5.8 Security](./mcp-security/README.md) | Seguridad | Asegura tu Servidor MCP |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Búsqueda Web MCP | Servidor y cliente MCP en Python integrando SerpAPI para búsqueda web, noticias, productos y Q&A en tiempo real. Demuestra orquestación multi-herramienta, integración con API externas y manejo robusto de errores. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | La transmisión de datos en tiempo real se ha vuelto esencial en el mundo actual impulsado por datos, donde negocios y aplicaciones requieren acceso inmediato a la información para tomar decisiones oportunas. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Búsqueda Web | La búsqueda web en tiempo real: cómo MCP transforma la búsqueda web en tiempo real proporcionando un enfoque estandarizado para la gestión del contexto entre modelos de IA, motores de búsqueda y aplicaciones. |
| [5.12 Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Autenticación Entra ID | Microsoft Entra ID proporciona una solución robusta en la nube para gestión de identidad y acceso, ayudando a asegurar que solo usuarios y aplicaciones autorizados puedan interactuar con tu servidor MCP. |
| [5.13 Microsoft Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integración con Microsoft Foundry | Aprende a integrar servidores del Protocolo de Contexto de Modelo con agentes Microsoft Foundry, habilitando orquestación poderosa de herramientas y capacidades AI empresariales con conexiones estandarizadas a fuentes de datos externas. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Ingeniería de Contexto | La oportunidad futura de técnicas de ingeniería de contexto para servidores MCP, incluyendo optimización de contexto, gestión dinámica del contexto y estrategias para ingeniería de prompts efectiva dentro de marcos MCP. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Transporte Personalizado | Aprende a implementar mecanismos de transporte personalizados para escenarios de comunicación MCP especializados. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Características del Protocolo | Domina características avanzadas del protocolo incluyendo notificaciones de progreso, cancelación de solicitudes, plantillas de recursos y patrones de manejo de errores. |
| [5.17 Adversarial Multi-Agent Reasoning](./mcp-adversarial-agents/README.md) | Agentes Adversariales | Usa dos agentes con posiciones opuestas, compartiendo un único conjunto de herramientas MCP para detectar alucinaciones, revelar casos límite y producir salidas mejor calibradas mediante debate estructurado. |

> **Nuevo en la Especificación MCP 2025-11-25**: La especificación ahora incluye soporte experimental para **Tareas** (operaciones de larga duración con seguimiento de progreso), **Anotaciones de Herramientas** (metadatos sobre comportamiento de herramientas para seguridad), **Elicitación de modo URL** (solicitud de contenido específico de URL desde clientes) y **Raíces** mejoradas (para gestión del contexto en espacios de trabajo). Consulta el [registro de cambios de la especificación MCP](https://spec.modelcontextprotocol.io/) para más detalles.

## Referencias Adicionales

Para la información más actualizada sobre temas avanzados de MCP, consulta:
- [Documentación MCP](https://modelcontextprotocol.io/)
- [Especificación MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositorio GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riesgos de seguridad y mitigaciones
- [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Capacitación práctica en seguridad

## Puntos Clave

- Las implementaciones MCP multimodales extienden las capacidades de IA más allá del procesamiento de texto
- La escalabilidad es esencial para despliegues empresariales y puede abordarse mediante escalado horizontal y vertical
- Medidas de seguridad comprensivas protegen los datos y aseguran un control adecuado de accesos
- La integración empresarial con plataformas como Azure OpenAI y Microsoft AI Foundry potencia las capacidades MCP
- Implementaciones avanzadas de MCP se benefician de arquitecturas optimizadas y gestión cuidadosa de recursos

## Ejercicio

Diseña una implementación MCP de grado empresarial para un caso de uso específico:

1. Identifica los requerimientos multimodales para tu caso de uso
2. Esboza los controles de seguridad necesarios para proteger datos sensibles
3. Diseña una arquitectura escalable que pueda manejar cargas variables
4. Planifica puntos de integración con sistemas AI empresariales
5. Documenta posibles cuellos de botella de rendimiento y estrategias de mitigación

## Recursos Adicionales

- [Documentación Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentación Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## Qué sigue

Explora las lecciones en este módulo comenzando con: [5.1 MCP Integration](./mcp-integration/README.md)

Una vez completes este módulo, continúa con: [Módulo 6: Contribuciones de la Comunidad](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->