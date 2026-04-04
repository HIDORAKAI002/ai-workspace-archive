# Controles de Seguridad MCP - Actualización Febrero 2026

> **Estándar Actual**: Este documento refleja los requisitos de seguridad de la [Especificación MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) y las [Mejores Prácticas de Seguridad MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) oficiales.

El Protocolo de Contexto de Modelo (MCP) ha madurado significativamente con controles de seguridad mejorados que abordan tanto la seguridad tradicional del software como las amenazas específicas de IA. Este documento proporciona controles de seguridad integrales para implementaciones seguras de MCP alineadas con el marco OWASP MCP Top 10.

## 🏔️ Entrenamiento Práctico en Seguridad

Para una experiencia práctica y aplicada en la implementación de seguridad, recomendamos el **[Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)**, una expedición guiada integral para asegurar servidores MCP en Azure usando una metodología de "vulnerable → explotar → arreglar → validar".

Todos los controles de seguridad en este documento se alinean con la **[Guía de Seguridad MCP Azure de OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**, que proporciona arquitecturas de referencia y orientación específica para implementación en Azure de los riesgos OWASP MCP Top 10.

## **Requisitos de Seguridad OBLIGATORIOS**

### **Prohibiciones Críticas de la Especificación MCP:**

> **PROHIBIDO**: Los servidores MCP **NO DEBEN** aceptar ningún token que no haya sido emitido explícitamente para el servidor MCP  
>
> **PROHIBIDO**: Los servidores MCP **NO DEBEN** usar sesiones para autenticación  
>
> **REQUERIDO**: Los servidores MCP que implementen autorización **DEBEN** verificar TODAS las solicitudes entrantes  
>
> **MANDATORIO**: Los servidores proxy MCP que usan IDs de cliente estáticos **DEBEN** obtener el consentimiento del usuario para cada cliente registrado dinámicamente

---

## 1. **Controles de Autenticación y Autorización**

### **Integración con Proveedores de Identidad Externos**

El **Estándar Actual MCP (2025-11-25)** permite que los servidores MCP deleguen la autenticación a proveedores de identidad externos, representando una mejora de seguridad significativa:

**Riesgo OWASP MCP Abordado**: [MCP07 - Autenticación y Autorización Insuficiente](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Beneficios de Seguridad:**
1. **Elimina Riesgos de Autenticación Personalizada**: Reduce la superficie de vulnerabilidad al evitar implementaciones personalizadas de autenticación  
2. **Seguridad de Nivel Empresarial**: Aprovecha proveedores de identidad reconocidos como Microsoft Entra ID con características avanzadas  
3. **Gestión Centralizada de Identidad**: Simplifica la gestión del ciclo de vida del usuario, control de acceso y auditorías de cumplimiento  
4. **Autenticación Multifactor (MFA)**: Hereda capacidades MFA de proveedores de identidad empresariales  
5. **Políticas de Acceso Condicional**: Se beneficia de controles adaptativos basados en riesgos y autenticación adaptativa

**Requisitos de Implementación:**
- **Validación de Audiencia del Token**: Verificar que todos los tokens están emitidos explícitamente para el servidor MCP  
- **Verificación del Emisor**: Validar que el emisor del token coincide con el proveedor de identidad esperado  
- **Verificación de Firma**: Validación criptográfica de la integridad del token  
- **Aplicación de Expiración**: Cumplimiento estricto de los límites de vida útil del token  
- **Validación de Alcance**: Asegurar que los tokens contienen los permisos adecuados para las operaciones solicitadas

### **Seguridad de la Lógica de Autorización**

**Controles Críticos:**
- **Auditorías Completas de Autorización**: Revisiones regulares de seguridad en todos los puntos de decisión de autorización  
- **Valores por Defecto a Prueba de Fallos**: Denegar acceso cuando la lógica de autorización no pueda tomar una decisión definitiva  
- **Límites de Permiso**: Separación clara entre niveles de privilegio y acceso a recursos  
- **Registro de Auditoría**: Registro completo de todas las decisiones de autorización para monitoreo de seguridad  
- **Revisiones Regulares de Acceso**: Validaciones periódicas de permisos de usuarios y asignaciones de privilegios

## 2. **Seguridad de Tokens y Controles Anti-Passthrough**

**Riesgo OWASP MCP Abordado**: [MCP01 - Mal manejo de tokens y exposición de secretos](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prevención de Passthrough de Tokens**

El **passthrough de tokens está explícitamente prohibido** en la Especificación de Autorización MCP debido a riesgos críticos de seguridad:

**Riesgos de Seguridad Abordados:**
- **Circunvención de Controles**: Evita controles esenciales como limitación de tasa, validación de solicitudes y monitoreo de tráfico  
- **Ruptura de Responsabilidad**: Imposibilita la identificación del cliente, corrompiendo auditorías e investigaciones de incidentes  
- **Exfiltración basada en Proxy**: Permite a actores maliciosos usar servidores como proxy para acceso no autorizado a datos  
- **Violaciones del Límite de Confianza**: Rompe las suposiciones de confianza que los servicios descendentes tienen sobre el origen de los tokens  
- **Movimiento Lateral**: Tokens comprometidos en múltiples servicios permiten una expansión ampliada del ataque

**Controles de Implementación:**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **Patrones Seguros de Gestión de Tokens**

**Mejores Prácticas:**
- **Tokens de Vida Corta**: Minimiza el tiempo de exposición con rotación frecuente de tokens  
- **Emisión Justo a Tiempo**: Emitir tokens únicamente cuando se requieren para operaciones específicas  
- **Almacenamiento Seguro**: Uso de módulos de seguridad hardware (HSM) o bóvedas de claves seguras  
- **Vinculación de Tokens**: Vincular tokens a clientes, sesiones u operaciones específicas cuando sea posible  
- **Monitoreo y Alertas**: Detección en tiempo real de uso indebido de tokens o patrones de acceso no autorizados

## 3. **Controles de Seguridad de Sesión**

### **Prevención de Secuestro de Sesión**

**Vectores de Ataque Abordados:**
- **Inyección de Prompt para Secuestro de Sesión**: Eventos maliciosos inyectados en el estado de sesión compartido  
- **Suplantación de Sesión**: Uso no autorizado de IDs de sesión robados para evadir autenticación  
- **Ataques de Reanudación de Streaming**: Explotación de reanudación de eventos enviados por servidor para inyección maliciosa

**Controles Obligatorios de Sesión:**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**Seguridad de Transporte:**
- **Aplicación de HTTPS**: Toda comunicación de sesión sobre TLS 1.3  
- **Atributos Seguros en Cookies**: HttpOnly, Secure, SameSite=Strict  
- **Pinning de Certificados**: Para conexiones críticas y evitar ataques MITM

### **Consideraciones Stateful vs Stateless**

**Para Implementaciones Stateful:**
- Estado de sesión compartido requiere protección adicional contra ataques de inyección  
- La gestión de sesiones basada en colas necesita verificación de integridad  
- Múltiples instancias del servidor requieren sincronización segura del estado de sesión

**Para Implementaciones Stateless:**
- Gestión de sesión basada en JWT u otros tokens similares  
- Verificación criptográfica de la integridad del estado de sesión  
- Reducción de la superficie de ataque pero requiere validación robusta de tokens

## 4. **Controles de Seguridad Específicos para IA**

**Riesgos OWASP MCP Abordados**:
- [MCP06 - Inyección de Prompt vía Payloads Contextuales](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Envenenamiento de Herramientas](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Inyección y Ejecución de Comandos](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Defensa contra Inyección de Prompt**

**Integración con Microsoft Prompt Shields:**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**Controles de Implementación:**
- **Saneamiento de Entrada**: Validación y filtrado exhaustivo de todas las entradas de usuario  
- **Definición de Límite de Contenido**: Separación clara entre instrucciones del sistema y contenido del usuario  
- **Jerarquía de Instrucciones**: Reglas de precedencia adecuadas para instrucciones en conflicto  
- **Monitoreo de Salida**: Detección de salidas potencialmente dañinas o manipuladas

### **Prevención de Envenenamiento de Herramientas**

**Marco de Seguridad para Herramientas:**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**Gestión Dinámica de Herramientas:**
- **Flujos de Aprobación**: Consentimiento explícito del usuario para modificaciones de herramientas  
- **Capacidades de Reversión**: Habilidad de revertir a versiones anteriores de herramientas  
- **Auditoría de Cambios**: Historial completo de modificaciones en definiciones de herramientas  
- **Evaluación de Riesgos**: Evaluación automatizada de la postura de seguridad de herramientas

## 5. **Prevención de Ataques Confused Deputy**

### **Seguridad del Proxy OAuth**

**Controles de Prevención de Ataques:**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**Requisitos de Implementación:**
- **Verificación de Consentimiento de Usuario**: Nunca omitir pantallas de consentimiento para registro dinámico de clientes  
- **Validación de URI de Redirección**: Validación estricta basada en lista blanca de destinos de redirección  
- **Protección del Código de Autorización**: Códigos de vida corta con uso único obligatorio  
- **Verificación de Identidad del Cliente**: Validación robusta de credenciales y metadatos del cliente

## 6. **Seguridad en la Ejecución de Herramientas**

### **Aislamiento y Sandboxing**

**Aislamiento Basado en Contenedores:**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**Aislamiento de Procesos:**
- **Contextos de Proceso Separados**: Cada ejecución de herramienta en espacio de proceso aislado  
- **Comunicación Inter-Procesos**: Mecanismos IPC seguros con validación  
- **Monitoreo de Procesos**: Análisis de comportamiento en tiempo de ejecución y detección de anomalías  
- **Aplicación de Recursos**: Límites estrictos en CPU, memoria y operaciones de I/O

### **Implementación de Mínimos Privilegios**

**Gestión de Permisos:**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. **Controles de Seguridad en la Cadena de Suministro**

**Riesgo OWASP MCP Abordado**: [MCP04 - Ataques a la Cadena de Suministro](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Verificación de Dependencias**

**Seguridad Integral de Componentes:**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **Monitoreo Continuo**

**Detección de Amenazas en Cadena de Suministro:**
- **Monitoreo de Salud de Dependencias**: Evaluación continua de todas las dependencias para problemas de seguridad  
- **Integración de Inteligencia de Amenazas**: Actualizaciones en tiempo real sobre amenazas emergentes en la cadena de suministro  
- **Análisis del Comportamiento**: Detección de comportamientos inusuales en componentes externos  
- **Respuesta Automatizada**: Contención inmediata de componentes comprometidos

## 8. **Controles de Monitoreo y Detección**

**Riesgo OWASP MCP Abordado**: [MCP08 - Falta de Auditoría y Telemetría](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Gestión de Información y Eventos de Seguridad (SIEM)**

**Estrategia Integral de Registro:**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **Detección de Amenazas en Tiempo Real**

**Análisis Conductual:**
- **Análisis de Comportamiento de Usuarios (UBA)**: Detección de patrones de acceso inusuales  
- **Análisis de Comportamiento de Entidades (EBA)**: Monitoreo del comportamiento de servidor MCP y herramientas  
- **Detección de Anomalías con Aprendizaje Automático**: Identificación con IA de amenazas de seguridad  
- **Correlación con Inteligencia de Amenazas**: Comparación de actividades observadas con patrones de ataques conocidos

## 9. **Respuesta a Incidentes y Recuperación**

### **Capacidades de Respuesta Automatizadas**

**Acciones de Respuesta Inmediata:**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **Capacidades Forenses**

**Apoyo a la Investigación:**
- **Preservación de la Cadena de Auditoría**: Registro inmutable con integridad criptográfica  
- **Colección de Evidencia**: Recolección automatizada de artefactos de seguridad relevantes  
- **Reconstrucción de Línea de Tiempo**: Secuencia detallada de eventos que condujeron a incidentes de seguridad  
- **Evaluación de Impacto**: Análisis del alcance de compromiso y exposición de datos

## **Principios Clave de Arquitectura de Seguridad**

### **Defensa en Profundidad**
- **Múltiples Capas de Seguridad**: Ningún punto único de fallo en la arquitectura de seguridad  
- **Controles Redundantes**: Medidas de seguridad superpuestas para funciones críticas  
- **Mecanismos a Prueba de Fallos**: Valores seguros por defecto cuando los sistemas enfrentan errores o ataques

### **Implementación de Zero Trust**
- **Nunca Confiar, Siempre Verificar**: Validación continua de todas las entidades y solicitudes  
- **Principio de Mínimos Privilegios**: Derechos de acceso mínimos para todos los componentes  
- **Microsegmentación**: Controles granulares de red y acceso

### **Evolución Continua de Seguridad**
- **Adaptación al Panorama de Amenazas**: Actualizaciones regulares para abordar amenazas emergentes  
- **Efectividad de Controles de Seguridad**: Evaluación y mejora continua de controles  
- **Cumplimiento de la Especificación**: Alineación con estándares de seguridad MCP en evolución

---

## **Recursos para Implementación**

### **Documentación Oficial MCP**
- [Especificación MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Mejores Prácticas de Seguridad MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificación de Autorización MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Recursos de Seguridad OWASP MCP**
- [Guía de Seguridad MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 con implementación en Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riesgos oficiales de seguridad MCP OWASP  
- [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Entrenamiento práctico en seguridad para MCP en Azure

### **Soluciones de Seguridad Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Estándares de Seguridad**
- [Mejores Prácticas de Seguridad OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 para Modelos de Lenguaje Extenso](https://genai.owasp.org/)
- [Marco de Ciberseguridad NIST](https://www.nist.gov/cyberframework)

---

> **Importante**: Estos controles de seguridad reflejan la especificación MCP actual (2025-11-25). Siempre verifique contra la [documentación oficial](https://spec.modelcontextprotocol.io/) más reciente, ya que los estándares evolucionan rápidamente.

## Qué Sigue

- Regresar a: [Resumen del Módulo de Seguridad](./README.md)
- Continuar a: [Módulo 3: Comenzando](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:  
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por humanos. No nos hacemos responsables de ningún malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->