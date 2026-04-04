# Implementación de Azure Content Safety con MCP

> **Riesgo OWASP MCP Abordado**: [MCP06 - Inyección de prompts mediante cargas contextuales](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Para fortalecer la seguridad de MCP contra la inyección de prompts, el envenenamiento de herramientas y otras vulnerabilidades específicas de IA, se recomienda ampliamente integrar Azure Content Safety. Esta guía de implementación está alineada con el [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Campamento 3: Seguridad de E/S.

## Integración con el servidor MCP

Para integrar Azure Content Safety con tu servidor MCP, agrega el filtro de seguridad de contenido como middleware en tu pipeline de procesamiento de solicitudes:

1. Inicializa el filtro durante el inicio del servidor
2. Valida todas las solicitudes de herramientas entrantes antes de procesarlas
3. Verifica todas las respuestas salientes antes de devolverlas a los clientes
4. Registra y alerta sobre violaciones de seguridad
5. Implementa el manejo adecuado de errores para comprobaciones fallidas de seguridad de contenido

Esto proporciona una defensa robusta contra:
- Ataques de inyección de prompts
- Intentos de envenenamiento de herramientas
- Exfiltración de datos mediante entradas maliciosas
- Generación de contenido dañino

## Mejores prácticas para la integración de Azure Content Safety

1. **Listas de bloqueo personalizadas**: Crea listas de bloqueo personalizadas específicamente para patrones de inyección MCP
2. **Ajuste de severidad**: Ajusta los umbrales de severidad según tu caso de uso específico y tolerancia al riesgo
3. **Cobertura integral**: Aplica verificaciones de seguridad de contenido a todas las entradas y salidas
4. **Optimización de rendimiento**: Considera implementar caché para verificaciones repetidas de seguridad de contenido
5. **Mecanismos de respaldo**: Define comportamientos claros de respaldo cuando los servicios de seguridad de contenido no estén disponibles
6. **Retroalimentación al usuario**: Proporciona retroalimentación clara a los usuarios cuando el contenido se bloquee por preocupaciones de seguridad
7. **Mejora continua**: Actualiza regularmente las listas de bloqueo y patrones basados en amenazas emergentes

## Recursos adicionales

### Guía de seguridad OWASP MCP
- [Guía de seguridad OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Resumen integral del Top 10 OWASP MCP con implementación en Azure
- [MCP06 - Inyección de prompts](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Patrones detallados para mitigación de inyección de prompts
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Campamento 3 práctico: Seguridad de E/S cubre seguridad de contenido

### Documentación de Azure
- [Resumen de Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Documentación de Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Introducción rápida a Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Qué sigue

- Regresar a: [Resumen del módulo de seguridad](./README.md)
- Continuar a: [Módulo 3: Primeros pasos](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso legal**:
Este documento ha sido traducido utilizando el servicio de traducción AI [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o imprecisiones. El documento original en su idioma original debe considerarse la fuente autorizada. Para información crítica, se recomienda la traducción profesional humana. No nos hacemos responsables de ningún malentendido o interpretación errónea derivada del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->