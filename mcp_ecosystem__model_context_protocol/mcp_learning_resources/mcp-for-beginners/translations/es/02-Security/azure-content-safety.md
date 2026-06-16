# Seguridad avanzada de MCP con Azure Content Safety

> **Riesgo MCP de OWASP abordado**: [MCP06 - Subversión del flujo de intención](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety ofrece varias herramientas poderosas que pueden mejorar la seguridad de sus implementaciones MCP. Para experiencia práctica de implementación, consulte [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Campamento 3: Seguridad de E/S.

## Escudos de solicitud (Prompt Shields)

Los AI Prompt Shields de Microsoft proporcionan una protección robusta contra ataques de inyección de solicitudes tanto directos como indirectos mediante:

1. **Detección avanzada**: Utiliza aprendizaje automático para identificar instrucciones maliciosas incrustadas en contenido.
2. **Enfoque resaltado (Spotlighting)**: Transforma el texto de entrada para ayudar a los sistemas de IA a distinguir entre instrucciones válidas y entradas externas.
3. **Delimitadores y marcado de datos**: Marca límites entre datos confiables y no confiables.
4. **Integración con Content Safety**: Trabaja con Azure AI Content Safety para detectar intentos de jailbreak y contenido dañino.
5. **Actualizaciones continuas**: Microsoft actualiza regularmente los mecanismos de protección contra amenazas emergentes.

## Implementación de Azure Content Safety con MCP

Este enfoque proporciona una protección en múltiples capas:
- Escanear las entradas antes de procesarlas
- Validar las salidas antes de devolverlas
- Usar listas negras para patrones dañinos conocidos
- Aprovechar los modelos de content safety continuamente actualizados de Azure

## Recursos de Azure Content Safety

Para aprender más sobre cómo implementar Azure Content Safety con sus servidores MCP, consulte estos recursos oficiales:

1. [Documentación de Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentación oficial de Azure Content Safety.
2. [Documentación de Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Aprenda cómo prevenir ataques de inyección de solicitudes.
3. [Referencia de API de Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Referencia detallada de la API para implementar Content Safety.
4. [Inicio rápido: Azure Content Safety con C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Guía rápida de implementación usando C#.
5. [Bibliotecas cliente de Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Bibliotecas cliente para varios lenguajes de programación.
6. [Detección de intentos de jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Guía específica para detectar y prevenir intentos de jailbreak.
7. [Mejores prácticas para Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Mejores prácticas para implementar content safety eficazmente.

Para una implementación más detallada, vea nuestra [Guía de implementación de Azure Content Safety](./azure-content-safety-implementation.md).

## Qué sigue

- Leer: [Implementación de Azure Content Safety](./azure-content-safety-implementation.md)
- Regresar a: [Descripción general del módulo de seguridad](./README.md)
- Continuar a: [Módulo 3: Primeros pasos](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->