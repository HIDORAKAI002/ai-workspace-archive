# Seguridad Avanzada de MCP con Azure Content Safety

> **Riesgo MCP de OWASP Abordado**: [MCP06 - Inyección de Prompt mediante Cargas Útiles Contextuales](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety proporciona varias herramientas potentes que pueden mejorar la seguridad de tus implementaciones MCP. Para una experiencia práctica de implementación, consulta [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Campamento 3: Seguridad de E/S.

## Escudos de Prompt

Los AI Prompt Shields de Microsoft proporcionan una protección robusta contra ataques de inyección de prompt directos e indirectos mediante:

1. **Detección Avanzada**: Usa aprendizaje automático para identificar instrucciones maliciosas incrustadas en el contenido.
2. **Iluminación (Spotlighting)**: Transforma el texto de entrada para ayudar a los sistemas de IA a distinguir entre instrucciones válidas y entradas externas.
3. **Delimitadores y Marcado de Datos**: Marca los límites entre datos confiables y no confiables.
4. **Integración con Content Safety**: Trabaja con Azure AI Content Safety para detectar intentos de jailbreak y contenido dañino.
5. **Actualizaciones Continuas**: Microsoft actualiza regularmente los mecanismos de protección contra amenazas emergentes.

## Implementación de Azure Content Safety con MCP

Este enfoque proporciona protección en múltiples capas:
- Escanear las entradas antes de procesarlas
- Validar las salidas antes de devolverlas
- Usar listas de bloqueo para patrones conocidos dañinos
- Aprovechar los modelos de content safety actualizados continuamente de Azure

## Recursos de Azure Content Safety

Para aprender más sobre cómo implementar Azure Content Safety con tus servidores MCP, consulta estos recursos oficiales:

1. [Documentación de Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentación oficial de Azure Content Safety.
2. [Documentación de Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Aprende cómo prevenir ataques de inyección de prompt.
3. [Referencia API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Referencia detallada de la API para implementar Content Safety.
4. [Inicio rápido: Azure Content Safety con C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Guía rápida de implementación usando C#.
5. [Bibliotecas cliente de Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Bibliotecas cliente para varios lenguajes de programación.
6. [Detección de intentos de jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Guía específica para detectar y prevenir intentos de jailbreak.
7. [Mejores prácticas para Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Mejores prácticas para implementar content safety eficazmente.

Para una implementación más profunda, consulta nuestra [guía de implementación de Azure Content Safety](./azure-content-safety-implementation.md).

## Qué Sigue

- Leer: [Implementación de Azure Content Safety](./azure-content-safety-implementation.md)
- Volver a: [Resumen del Módulo de Seguridad](./README.md)
- Continuar a: [Módulo 3: Primeros Pasos](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por lograr precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por humanos. No nos hacemos responsables de ningún malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->