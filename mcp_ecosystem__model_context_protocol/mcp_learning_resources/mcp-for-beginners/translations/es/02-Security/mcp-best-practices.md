# Mejores Prácticas de Seguridad MCP 2025

Esta guía integral describe las mejores prácticas de seguridad esenciales para implementar sistemas Model Context Protocol (MCP) basados en la última **Especificación MCP 2025-11-25** y los estándares actuales de la industria. Estas prácticas abordan tanto preocupaciones tradicionales de seguridad como amenazas específicas de IA únicas para implementaciones MCP.

## Requisitos Críticos de Seguridad

### Controles de Seguridad Obligatorios (Requisitos MUST)

1. **Validación de Tokens**: Los servidores MCP **NO DEBEN** aceptar ningún token que no haya sido emitido explícitamente para el propio servidor MCP.
2. **Verificación de Autorización**: Los servidores MCP que implementen autorización **DEBEN** verificar TODAS las solicitudes entrantes y **NO DEBEN** usar sesiones para autenticación.  
3. **Consentimiento del Usuario**: Los servidores proxy MCP que usen IDs de cliente estáticos **DEBEN** obtener el consentimiento explícito del usuario para cada cliente registrado dinámicamente.
4. **IDs de Sesión Seguros**: Los servidores MCP **DEBEN** usar IDs de sesión criptográficamente seguros y no deterministas, generados con generadores de números aleatorios seguros.

## Prácticas Centrales de Seguridad

### 1. Validación y Sanitización de Entradas
- **Validación Integral de Entradas**: Validar y sanitizar todas las entradas para prevenir ataques de inyección, problemas de confusión de representante y vulnerabilidades de inyección en prompts.
- **Aplicación de Esquemas de Parámetros**: Implementar validación estricta de esquemas JSON para todos los parámetros de herramientas y entradas API.
- **Filtrado de Contenido**: Usar Microsoft Prompt Shields y Azure Content Safety para filtrar contenido malicioso en prompts y respuestas.
- **Sanitización de Salidas**: Validar y sanitizar todas las salidas del modelo antes de presentarlas a usuarios o sistemas posteriores.

### 2. Excelencia en Autenticación y Autorización  
- **Proveedores Externos de Identidad**: Delegar la autenticación a proveedores de identidad establecidos (Microsoft Entra ID, proveedores OAuth 2.1) en lugar de implementar autenticación personalizada.
- **Permisos Granulares**: Implementar permisos detallados específicos para herramientas siguiendo el principio de mínimo privilegio.
- **Gestión del Ciclo de Vida de Tokens**: Usar tokens de acceso de corta duración con rotación segura y validación adecuada de audiencia.
- **Autenticación Multifactor**: Requerir MFA para todo acceso administrativo y operaciones sensibles.

### 3. Protocolos de Comunicación Seguros
- **Seguridad en la Capa de Transporte**: Usar HTTPS/TLS 1.3 para todas las comunicaciones MCP con validación adecuada de certificados.
- **Encriptación de Extremo a Extremo**: Implementar capas adicionales de encriptación para datos altamente sensibles en tránsito y en reposo.
- **Gestión de Certificados**: Mantener una gestión apropiada del ciclo de vida de certificados con procesos automatizados de renovación.
- **Aplicación de la Versión del Protocolo**: Usar la versión actual del protocolo MCP (2025-11-25) con negociación adecuada de versiones.

### 4. Limitación Avanzada de Tasa y Protección de Recursos
- **Limitación de tasa multinivel**: Implementar limitación de tasa a nivel de usuario, sesión, herramienta y recurso para prevenir abusos.
- **Limitación adaptativa de tasa**: Usar limitación de tasa basada en aprendizaje automático que se adapte a patrones de uso e indicadores de amenazas.
- **Gestión de Cuotas de Recursos**: Establecer límites apropiados para recursos computacionales, uso de memoria y tiempo de ejecución.
- **Protección DDoS**: Desplegar sistemas comprensivos de protección DDoS y análisis de tráfico.

### 5. Registro y Monitoreo Integral
- **Registro estructurado de auditoría**: Implementar registros detallados y buscables para todas las operaciones MCP, ejecuciones de herramientas y eventos de seguridad.
- **Monitoreo de seguridad en tiempo real**: Desplegar sistemas SIEM con detección de anomalías potenciada por IA para cargas MCP.
- **Registro conforme a privacidad**: Registrar eventos de seguridad respetando requisitos y regulaciones de privacidad de datos.
- **Integración de respuesta a incidentes**: Conectar sistemas de registro a flujos de trabajo automatizados de respuesta a incidentes.

### 6. Prácticas Mejoradas de Almacenamiento Seguro
- **Módulos de Seguridad Hardware**: Usar almacenamiento de claves respaldado por HSM (Azure Key Vault, AWS CloudHSM) para operaciones criptográficas críticas.
- **Gestión de claves de encriptación**: Implementar rotación, segregación y controles de acceso adecuados para claves de encriptación.
- **Gestión de secretos**: Almacenar todas las claves API, tokens y credenciales en sistemas dedicados de gestión de secretos.
- **Clasificación de datos**: Clasificar los datos según niveles de sensibilidad y aplicar medidas de protección apropiadas.

### 7. Gestión Avanzada de Tokens
- **Prevención de transferencia de tokens**: Prohibir explícitamente patrones de transferencia de tokens que evadan controles de seguridad.
- **Validación de audiencia**: Verificar siempre que los claims de audiencia del token coincidan con la identidad del servidor MCP previsto.
- **Autorización basada en claims**: Implementar autorización detallada basada en claims del token y atributos de usuario.
- **Vinculación de tokens**: Vincular tokens a sesiones, usuarios o dispositivos específicos cuando sea apropiado.

### 8. Gestión Segura de Sesiones
- **IDs de sesión criptográficos**: Generar IDs de sesión usando generadores de números aleatorios criptográficamente seguros (no secuencias predecibles).
- **Vinculación específica al usuario**: Vincular IDs de sesión a información específica del usuario usando formatos seguros como `<user_id>:<session_id>`.
- **Controles del ciclo de vida de sesión**: Implementar mecanismos correctos de expiración, rotación e invalidez de sesiones.
- **Cabeceras de seguridad para sesiones**: Usar cabeceras HTTP de seguridad apropiadas para la protección de sesiones.

### 9. Controles de Seguridad Específicos para IA
- **Defensa contra inyección de prompts**: Desplegar Microsoft Prompt Shields con técnicas de spotlighting, delimitadores y marcado de datos.
- **Prevención de envenenamiento de herramientas**: Validar metadatos de herramientas, monitorear cambios dinámicos y verificar la integridad de herramientas.
- **Validación de la salida del modelo**: Escanear las salidas del modelo para detectar posibles fugas de datos, contenido dañino o violaciones de políticas de seguridad.
- **Protección de ventana de contexto**: Implementar controles para prevenir envenenamiento y ataques de manipulación de la ventana de contexto.

### 10. Seguridad en la Ejecución de Herramientas
- **Sandboxes de ejecución**: Ejecutar las herramientas en entornos aislados y containerizados con límites de recursos.
- **Separación de privilegios**: Ejecutar herramientas con privilegios mínimos necesarios y cuentas de servicio separadas.
- **Aislamiento de red**: Implementar segmentación de red para entornos de ejecución de herramientas.
- **Monitoreo de ejecución**: Monitorear la ejecución de herramientas para detectar comportamientos anómalos, uso de recursos y violaciones de seguridad.

### 11. Validación Continua de Seguridad
- **Pruebas automáticas de seguridad**: Integrar pruebas de seguridad en pipelines CI/CD con herramientas como GitHub Advanced Security.
- **Gestión de vulnerabilidades**: Escanear regularmente todas las dependencias, incluidos modelos IA y servicios externos.
- **Pruebas de penetración**: Realizar evaluaciones regulares de seguridad específicamente dirigidas a implementaciones MCP.
- **Revisiones de código de seguridad**: Implementar revisiones de seguridad obligatorias para todos los cambios de código relacionados con MCP.

### 12. Seguridad de la Cadena de Suministro para IA
- **Verificación de componentes**: Verificar la procedencia, integridad y seguridad de todos los componentes de IA (modelos, embeddings, APIs).
- **Gestión de dependencias**: Mantener inventarios actualizados de todo el software y dependencias IA con seguimiento de vulnerabilidades.
- **Repositorios confiables**: Usar fuentes verificadas y confiables para todos los modelos IA, bibliotecas y herramientas.
- **Monitoreo de la cadena de suministro**: Monitorear continuamente posibles compromisos en proveedores de servicios IA y repositorios de modelos.

## Patrones Avanzados de Seguridad

### Arquitectura Zero Trust para MCP
- **Nunca confiar, siempre verificar**: Implementar verificación continua para todos los participantes MCP.
- **Microsegmentación**: Aislar componentes MCP con controles granulares de red e identidad.
- **Acceso condicional**: Implementar controles de acceso basados en riesgos que se adapten al contexto y comportamiento.
- **Evaluación continua de riesgos**: Evaluar dinámicamente la postura de seguridad con base en indicadores de amenazas actuales.

### Implementación de IA que Preserva la Privacidad
- **Minimización de datos**: Exponer solo los datos mínimos necesarios para cada operación MCP.
- **Privacidad diferencial**: Implementar técnicas de preservación de privacidad para datos sensibles.
- **Encriptación homomórfica**: Usar técnicas avanzadas de cifrado para computación segura sobre datos cifrados.
- **Aprendizaje federado**: Implementar enfoques de aprendizaje distribuidos que preserven la localización y privacidad de los datos.

### Respuesta a Incidentes para Sistemas de IA
- **Procedimientos específicos para IA**: Desarrollar procedimientos de respuesta a incidentes adaptados a amenazas específicas de IA y MCP.
- **Respuesta automatizada**: Implementar contención y remediación automatizadas para incidentes comunes de seguridad IA.  
- **Capacidades forenses**: Mantener preparación forense para compromisos de sistemas IA y fugas de datos.
- **Procedimientos de recuperación**: Establecer procedimientos para recuperarse de envenenamiento de modelos IA, ataques de inyección en prompts y compromisos de servicios.

## Recursos de Implementación y Estándares

### 🏔️ Capacitación Práctica en Seguridad
- **[Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Taller práctico integral para asegurar servidores MCP en Azure.
- **[Guía de Seguridad MCP Azure de OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Arquitectura de referencia y guía para implementar OWASP MCP Top 10.

### Documentación Oficial MCP
- [Especificación MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Especificación actual del protocolo MCP.
- [Mejores Prácticas de Seguridad MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Guía oficial de seguridad.
- [Especificación de Autorización MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Patrones de autenticación y autorización.
- [Seguridad de Transporte MCP](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Requisitos de seguridad en la capa de transporte.

### Soluciones de Seguridad Microsoft
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Protección avanzada contra inyección en prompts.
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Filtrado comprensivo de contenido IA.
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Gestión empresarial de identidad y acceso.
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Gestión segura de secretos y credenciales.
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Escaneo de seguridad de cadena de suministro y código.

### Estándares y Marcos de Seguridad
- [Mejores Prácticas de Seguridad OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Guía actual de seguridad OAuth.
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Riesgos de seguridad en aplicaciones web.
- [OWASP Top 10 para LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Riesgos de seguridad específicos de IA.
- [Marco de Gestión de Riesgos de IA de NIST](https://www.nist.gov/itl/ai-risk-management-framework) - Gestión integral de riesgos IA.
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Sistemas de gestión de seguridad de la información.

### Guías de Implementación y Tutoriales
- [Azure API Management como puerta de autenticación MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Patrones empresariales de autenticación.
- [Microsoft Entra ID con servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Integración con proveedores de identidad.
- [Implementación segura de almacenamiento de tokens](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Mejores prácticas en gestión de tokens.
- [Encriptación de extremo a extremo para IA](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Patrones avanzados de cifrado.

### Recursos Avanzados de Seguridad
- [Microsoft Security Development Lifecycle](https://www.microsoft.com/sdl) - Prácticas de desarrollo seguro.
- [Guía de Red Team para IA](https://learn.microsoft.com/security/ai-red-team/) - Pruebas específicas de seguridad para IA.
- [Modelado de amenazas para sistemas IA](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Metodología de modelado de amenazas IA.
- [Ingeniería de privacidad para IA](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Técnicas para IA que preservan la privacidad.

### Cumplimiento y Gobernanza
- [Cumplimiento GDPR para IA](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Cumplimiento de privacidad en sistemas IA.
- [Marco de Gobernanza IA](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Implementación responsable de IA.
- [SOC 2 para servicios IA](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Controles de seguridad para proveedores de servicios IA.
- [Cumplimiento HIPAA para IA](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Requisitos de cumplimiento para IA en salud.

### DevSecOps y Automatización
- [Pipeline DevSecOps para IA](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Pipelines seguros para desarrollo IA.
- [Pruebas automáticas de seguridad](https://learn.microsoft.com/security/engineering/devsecops) - Validación continua de seguridad.
- [Seguridad de infraestructura como código](https://learn.microsoft.com/security/engineering/infrastructure-security) - Despliegue seguro de infraestructura.
- [Seguridad de contenedores para IA](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Seguridad para contenerización de cargas IA.

### Monitoreo y Respuesta a Incidentes  
- [Azure Monitor para cargas IA](https://learn.microsoft.com/azure/azure-monitor/overview) - Soluciones comprensivas de monitoreo.
- [Respuesta a incidentes de seguridad IA](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Procedimientos específicos para IA.
- [SIEM para sistemas IA](https://learn.microsoft.com/azure/sentinel/overview) - Gestión de información y eventos de seguridad.
- [Inteligencia de amenazas para IA](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Fuentes de inteligencia en amenazas IA.

## 🔄 Mejora Continua

### Manténgase Actualizado con Estándares en Evolución
- **Actualizaciones de Especificación MCP**: Monitorear cambios oficiales en la especificación MCP y avisos de seguridad.
- **Inteligencia de amenazas**: Suscribirse a feeds de amenazas de seguridad IA y bases de datos de vulnerabilidades.  
- **Participación Comunitaria**: Participar en discusiones y grupos de trabajo de la comunidad de seguridad MCP  
- **Evaluación Regular**: Realizar evaluaciones trimestrales de la postura de seguridad y actualizar las prácticas en consecuencia  

### Contribuir a la Seguridad MCP
- **Investigación de Seguridad**: Contribuir a la investigación de seguridad MCP y programas de divulgación de vulnerabilidades  
- **Compartir Mejores Prácticas**: Compartir implementaciones de seguridad y lecciones aprendidas con la comunidad  
- **Desarrollo de Estándares**: Participar en el desarrollo de especificaciones MCP y creación de estándares de seguridad  
- **Desarrollo de Herramientas**: Desarrollar y compartir herramientas y bibliotecas de seguridad para el ecosistema MCP  

---

*Este documento refleja las mejores prácticas de seguridad MCP al 18 de diciembre de 2025, basadas en la Especificación MCP 2025-11-25. Las prácticas de seguridad deben revisarse y actualizarse regularmente a medida que el protocolo y el panorama de amenazas evolucionan.*  

## Qué Sigue

- Leer: [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- Regresar a: [Security Module Overview](./README.md)  
- Continuar a: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento ha sido traducido utilizando el servicio de traducción por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda la traducción profesional humana. No nos hacemos responsables de cualquier malentendido o interpretación errónea que resulte del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->