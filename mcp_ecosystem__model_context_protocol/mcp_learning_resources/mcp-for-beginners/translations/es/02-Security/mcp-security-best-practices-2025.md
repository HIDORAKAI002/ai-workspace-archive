# MCP Mejores Prácticas de Seguridad - Actualización Febrero 2026

> **Importante**: Este documento refleja los últimos requisitos de seguridad de la [Especificación MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) y las [Mejores Prácticas de Seguridad MCP oficiales](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Considere siempre la especificación actual para las directrices más actualizadas.

## 🏔️ Entrenamiento Práctico de Seguridad

Para experiencia práctica en implementación, recomendamos el **[Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - una expedición guiada completa para asegurar servidores MCP en Azure. El taller cubre todos los riesgos OWASP MCP Top 10 mediante una metodología de "vulnerable → explotar → corregir → validar".

Todas las prácticas en este documento están alineadas con la **[Guía de Seguridad MCP Azure de OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** para orientación específica de implementación en Azure.

## Prácticas Esenciales de Seguridad para Implementaciones MCP

El Protocolo de Contexto de Modelo introduce desafíos únicos de seguridad que van más allá de la seguridad tradicional de software. Estas prácticas abordan tanto los requisitos fundamentales de seguridad como las amenazas específicas de MCP incluyendo inyección de prompts, envenenamiento de herramientas, secuestro de sesiones, el problema de delegado confundido, y vulnerabilidades de paso de tokens.

### **Requisitos de Seguridad OBLIGATORIOS** 

**Requisitos críticos de la Especificación MCP:**

### **Requisitos de Seguridad OBLIGATORIOS** 

**Requisitos críticos de la Especificación MCP:**

> **NO DEBE**: Los servidores MCP **NO DEBEN** aceptar tokens que no hayan sido emitidos explícitamente para el servidor MCP
> 
> **DEBE**: Los servidores MCP que implementan autorización **DEBEN** verificar TODAS las solicitudes entrantes
>  
> **NO DEBE**: Los servidores MCP **NO DEBEN** usar sesiones para autenticación
>
> **DEBE**: Los servidores proxy MCP que usan IDs de cliente estáticos **DEBEN** obtener el consentimiento del usuario para cada cliente registrado dinámicamente

---

## 1. **Seguridad de Tokens y Autenticación**

**Controles de Autenticación y Autorización:**
   - **Revisión Rigurosa de Autorización**: Realizar auditorías completas de la lógica de autorización del servidor MCP para asegurar que solo los usuarios y clientes intencionados puedan acceder a los recursos
   - **Integración con Proveedores de Identidad Externos**: Usar proveedores de identidad establecidos como Microsoft Entra ID en lugar de implementar autenticación personalizada
   - **Validación de Audiencia de Tokens**: Siempre validar que los tokens fueron emitidos explícitamente para tu servidor MCP - nunca aceptar tokens provenientes de un nivel superior
   - **Ciclo de Vida Correcto de Tokens**: Implementar rotación segura de tokens, políticas de expiración, y prevenir ataques de repetición de tokens

**Almacenamiento Protegido de Tokens:**
   - Usar Azure Key Vault o almacenes de credenciales seguros similares para todos los secretos
   - Implementar cifrado para tokens tanto en reposo como en tránsito
   - Rotación regular de credenciales y monitoreo para acceso no autorizado

## 2. **Gestión de Sesiones y Seguridad en el Transporte**

**Prácticas Seguras de Sesiones:**
   - **IDs de Sesión Criptográficamente Seguras**: Usar IDs de sesión seguras no determinísticas generadas con generadores de números aleatorios seguros
   - **Vinculación Específica al Usuario**: Vincular IDs de sesión a identidades de usuario usando formatos como `<user_id>:<session_id>` para prevenir abusos cruzados de sesiones
   - **Gestión del Ciclo de Vida de Sesiones**: Implementar expiración, rotación e invalidación correcta para limitar ventanas de vulnerabilidad
   - **Aplicación de HTTPS/TLS**: HTTPS obligatorio para toda comunicación para prevenir intercepción de IDs de sesión

**Seguridad de la Capa de Transporte:**
   - Configurar TLS 1.3 donde sea posible con gestión adecuada de certificados
   - Implementar fijación de certificados para conexiones críticas
   - Rotación regular de certificados y verificación de validez

## 3. **Protección Contra Amenazas Específicas de IA** 🤖

**Defensa contra Inyección de Prompts:**
   - **Escudos de Prompts de Microsoft**: Desplegar Escudos de Prompts de IA para detección y filtrado avanzado de instrucciones maliciosas
   - **Saneamiento de Entradas**: Validar y saneo de todas las entradas para prevenir ataques de inyección y problemas de delegado confundido
   - **Límites de Contenido**: Usar delimitadores y sistemas de marcación de datos para distinguir entre instrucciones confiables y contenido externo

**Prevención de Envenenamiento de Herramientas:**
   - **Validación de Metadatos de Herramientas**: Implementar controles de integridad para definiciones de herramientas y monitorear cambios inesperados
   - **Monitoreo Dinámico de Herramientas**: Monitorizar el comportamiento en tiempo de ejecución y configurar alertas para patrones de ejecución inesperados
   - **Flujos de Trabajo de Aprobación**: Requerir aprobación explícita del usuario para modificaciones y cambios en capacidades de herramientas

## 4. **Control de Acceso y Permisos**

**Principio de Menor Privilegio:**
   - Otorgar a los servidores MCP solo los permisos mínimos requeridos para la funcionalidad prevista
   - Implementar control de acceso basado en roles (RBAC) con permisos detallados
   - Revisiones regulares de permisos y monitoreo continuo para escalamiento de privilegios

**Controles de Permisos en Tiempo de Ejecución:**
   - Aplicar límites de recursos para prevenir ataques de agotamiento de recursos
   - Usar aislamiento de contenedores para entornos de ejecución de herramientas  
   - Implementar acceso justo a tiempo para funciones administrativas

## 5. **Seguridad y Monitoreo de Contenido**

**Implementación de Seguridad de Contenido:**
   - **Integración Azure Content Safety**: Usar Azure Content Safety para detectar contenido dañino, intentos de jailbreak y violaciones de políticas
   - **Análisis Conductual**: Implementar monitoreo conductual en tiempo de ejecución para detectar anomalías en la ejecución de servidores MCP y herramientas
   - **Registro Integral**: Registrar todos los intentos de autenticación, invocaciones de herramientas y eventos de seguridad con almacenamiento seguro y a prueba de manipulaciones

**Monitoreo Continuo:**
   - Alertas en tiempo real para patrones sospechosos e intentos de acceso no autorizados  
   - Integración con sistemas SIEM para gestión centralizada de eventos de seguridad
   - Auditorías regulares de seguridad y pruebas de penetración para implementaciones MCP

## 6. **Seguridad de la Cadena de Suministro**

**Verificación de Componentes:**
   - **Escaneo de Dependencias**: Usar escaneo automático de vulnerabilidades para todas las dependencias de software y componentes de IA
   - **Validación de Procedencia**: Verificar origen, licencias e integridad de modelos, fuentes de datos y servicios externos
   - **Paquetes Firmados**: Usar paquetes firmados criptográficamente y verificar firmas antes del despliegue

**Pipeline de Desarrollo Seguro:**
   - **GitHub Advanced Security**: Implementar escaneo de secretos, análisis de dependencias y análisis estático CodeQL
   - **Seguridad CI/CD**: Integrar validación de seguridad en pipelines automáticos de despliegue
   - **Integridad de Artefactos**: Implementar verificación criptográfica para artefactos y configuraciones desplegadas

## 7. **Seguridad OAuth y Prevención de Delegado Confundido**

**Implementación OAuth 2.1:**
   - **Implementación PKCE**: Usar Proof Key for Code Exchange (PKCE) para todas las solicitudes de autorización
   - **Consentimiento Explícito**: Obtener consentimiento del usuario para cada cliente registrado dinámicamente para prevenir ataques de delegado confundido
   - **Validación de URI de Redirección**: Implementar validación estricta de URIs de redirección e identificadores de cliente

**Seguridad Proxy:**
   - Prevenir eludir la autorización mediante explotación de ID de cliente estático
   - Implementar flujos de consentimiento apropiados para acceso a APIs de terceros
   - Monitorear el robo de códigos de autorización y acceso no autorizado a APIs

## 8. **Respuesta y Recuperación ante Incidentes**

**Capacidades de Respuesta Rápida:**
   - **Respuesta Automatizada**: Implementar sistemas automáticos para rotación de credenciales y contención de amenazas
   - **Procedimientos de Reversión**: Capacidad para revertir rápidamente a configuraciones y componentes conocidos buenos
   - **Capacidades Forenses**: Rutas de auditoría detalladas y registro para investigación de incidentes

**Comunicación y Coordinación:**
   - Procedimientos claros de escalamiento para incidentes de seguridad
   - Integración con equipos organizacionales de respuesta a incidentes
   - Simulacros regulares de incidentes de seguridad y ejercicios de mesa

## 9. **Cumplimiento y Gobernanza**

**Cumplimiento Regulatorio:**
   - Asegurar que las implementaciones MCP cumplan con requisitos específicos de la industria (GDPR, HIPAA, SOC 2)
   - Implementar clasificación de datos y controles de privacidad para procesamiento de datos de IA
   - Mantener documentación completa para auditorías de cumplimiento

**Gestión de Cambios:**
   - Procesos formales de revisión de seguridad para todas las modificaciones del sistema MCP
   - Control de versiones y flujos de aprobación para cambios de configuración
   - Evaluaciones regulares de cumplimiento y análisis de brechas

## 10. **Controles Avanzados de Seguridad**

**Arquitectura Zero Trust:**
   - **Nunca Confiar, Siempre Verificar**: Verificación continua de usuarios, dispositivos y conexiones
   - **Microsegmentación**: Controles granulares de red que aíslan componentes individuales de MCP
   - **Acceso Condicional**: Controles de acceso basados en riesgos que se adaptan al contexto y comportamiento actual

**Protección en Tiempo de Ejecución de Aplicaciones:**
   - **Protección de Aplicaciones en Tiempo de Ejecución (RASP)**: Desplegar técnicas RASP para detección de amenazas en tiempo real
   - **Monitoreo del Rendimiento Aplicativo**: Monitorizar anomalías de rendimiento que puedan indicar ataques
   - **Políticas Dinámicas de Seguridad**: Implementar políticas de seguridad que se adapten según el panorama actual de amenazas

## 11. **Integración con el Ecosistema de Seguridad de Microsoft**

**Seguridad Integral de Microsoft:**
   - **Microsoft Defender for Cloud**: Gestión de postura de seguridad en la nube para cargas de trabajo MCP
   - **Azure Sentinel**: Capacidades nativas de SIEM y SOAR en la nube para detección avanzada de amenazas
   - **Microsoft Purview**: Gobernanza de datos y cumplimiento para flujos de trabajo y fuentes de datos de IA

**Gestión de Identidad y Acceso:**
   - **Microsoft Entra ID**: Gestión de identidad empresarial con políticas de acceso condicional
   - **Privileged Identity Management (PIM)**: Acceso justo a tiempo y flujos de aprobación para funciones administrativas
   - **Protección de Identidad**: Acceso condicional basado en riesgos y respuesta automatizada a amenazas

## 12. **Evolución Continua de la Seguridad**

**Mantenerse Actualizado:**
   - **Monitoreo de Especificaciones**: Revisión regular de actualizaciones de la especificación MCP y cambios en guías de seguridad
   - **Inteligencia de Amenazas**: Integración de fuentes de amenazas específicas de IA e indicadores de compromiso
   - **Participación en la Comunidad de Seguridad**: Participación activa en la comunidad de seguridad MCP y programas de divulgación de vulnerabilidades

**Seguridad Adaptativa:**
   - **Seguridad basada en Machine Learning**: Uso de detección de anomalías mediante ML para identificar patrones de ataque novedosos
   - **Análisis Predictivo de Seguridad**: Implementar modelos predictivos para identificación proactiva de amenazas
   - **Automatización de la Seguridad**: Actualizaciones automáticas de políticas de seguridad basadas en inteligencia de amenazas y cambios de especificación

---

## **Recursos Críticos de Seguridad**

### **Documentación Oficial MCP**
- [Especificación MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Mejores Prácticas de Seguridad MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificación de Autorización MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Recursos de Seguridad OWASP MCP**
- [Guía de Seguridad MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 completo con implementación en Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riesgos oficiales de seguridad MCP de OWASP
- [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Entrenamiento práctico de seguridad para MCP en Azure

### **Soluciones de Seguridad Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Seguridad Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Estándares de Seguridad**
- [Mejores Prácticas de Seguridad OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 para Modelos de Lenguaje Grande](https://genai.owasp.org/)
- [Marco de Gestión de Riesgos de IA NIST](https://www.nist.gov/itl/ai-risk-management-framework)

### **Guías de Implementación**
- [Gateway de Autenticación MCP con Azure API Management](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID con Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Aviso de Seguridad**: Las prácticas de seguridad MCP evolucionan rápidamente. Siempre verifique contra la [especificación MCP actual](https://spec.modelcontextprotocol.io/) y la [documentación oficial de seguridad](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) antes de implementar.

## Qué Sigue

- Leer: [Controles de Seguridad MCP 2025](./mcp-security-controls-2025.md)
- Volver a: [Resumen del Módulo de Seguridad](./README.md)
- Continuar a: [Módulo 3: Primeros Pasos](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:  
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la exactitud, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por humanos. No nos hacemos responsables por malentendidos o interpretaciones erróneas derivadas del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->