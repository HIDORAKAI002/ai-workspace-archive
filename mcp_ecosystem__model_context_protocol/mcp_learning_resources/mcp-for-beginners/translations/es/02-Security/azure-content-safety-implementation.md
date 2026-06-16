# Implementación de Azure Content Safety con MCP

> **Riesgo MCP de OWASP Abordado**: [MCP06 - Subversión del Flujo de Intención](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Para fortalecer la seguridad de MCP contra la inyección de indicaciones, el envenenamiento de herramientas y otras vulnerabilidades específicas de IA, se recomienda encarecidamente integrar Azure Content Safety. Esta guía de implementación está alineada con el [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) Campamento 3: Seguridad de E/S.

## Integración con el Servidor MCP

Para integrar Azure Content Safety con su servidor MCP, agregue el filtro de seguridad de contenido como middleware en su canal de procesamiento de solicitudes:

1. Inicialice el filtro durante el arranque del servidor
2. Valide todas las solicitudes de herramientas entrantes antes de procesarlas
3. Verifique todas las respuestas salientes antes de devolverlas a los clientes
4. Registre y alerte sobre violaciones de seguridad
5. Implemente un manejo de errores adecuado para las comprobaciones fallidas de seguridad de contenido

Esto proporciona una defensa robusta contra:
- Ataques de inyección de indicaciones
- Intentos de envenenamiento de herramientas
- Exfiltración de datos mediante entradas maliciosas
- Generación de contenido dañino

## Mejores Prácticas para la Integración de Azure Content Safety

1. **Listas de bloqueo personalizadas**: Cree listas de bloqueo personalizadas específicamente para patrones de inyección MCP
2. **Ajuste de gravedad**: Ajuste los umbrales de gravedad según su caso de uso específico y tolerancia al riesgo
3. **Cobertura integral**: Aplique verificaciones de seguridad de contenido a todas las entradas y salidas
4. **Optimización del rendimiento**: Considere implementar caché para comprobaciones de seguridad de contenido repetidas
5. **Mecanismos de respaldo**: Defina comportamientos de respaldo claros cuando los servicios de seguridad de contenido no estén disponibles
6. **Retroalimentación al usuario**: Proporcione retroalimentación clara a los usuarios cuando se bloquee contenido por preocupaciones de seguridad
7. **Mejora continua**: Actualice regularmente las listas de bloqueo y patrones basándose en amenazas emergentes

## Recursos Adicionales

### Guía de Seguridad MCP de OWASP
- [Guía de Seguridad MCP Azure de OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Las 10 principales amenazas MCP de OWASP con implementación en Azure
- [MCP06 - Inyección de Indicación](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Patrones detallados de mitigación de inyección de indicaciones
- [Taller MCP Security Summit](https://azure-samples.github.io/sherpa/) - Campamento 3 práctico: Seguridad de E/S cubre la seguridad de contenido

### Documentación de Azure
- [Resumen de Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Documentación de Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Inicio Rápido de Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Qué Sigue

- Regresar a: [Descripción del Módulo de Seguridad](./README.md)
- Continuar a: [Módulo 3: Primeros Pasos](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->