# Seguridad MCP: Protección Integral para Sistemas de IA

[![Prácticas recomendadas de seguridad MCP](../../../translated_images/es/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Haz clic en la imagen de arriba para ver el video de esta lección)_

La seguridad es fundamental para el diseño de sistemas de IA, por lo que la priorizamos como nuestra segunda sección. Esto se alinea con el principio **Seguro por Diseño** de Microsoft del [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

El Protocolo de Contexto de Modelo (MCP) aporta nuevas capacidades potentes a las aplicaciones impulsadas por IA, a la vez que introduce desafíos únicos de seguridad que van más allá de los riesgos tradicionales del software. Los sistemas MCP enfrentan tanto preocupaciones de seguridad establecidas (codificación segura, menor privilegio, seguridad de la cadena de suministro) como nuevas amenazas específicas de IA, incluyendo inyección de prompts, envenenamiento de herramientas, secuestro de sesiones, ataques de delegado confundido, vulnerabilidades de paso de tokens y modificación dinámica de capacidades.

Esta lección explora los riesgos de seguridad más críticos en implementaciones MCP—cubriendo autenticación, autorización, permisos excesivos, inyección de prompts indirecta, seguridad de sesiones, problemas de delegado confundido, gestión de tokens y vulnerabilidades en la cadena de suministro. Aprenderás controles y mejores prácticas concretas para mitigar estos riesgos, aprovechando soluciones de Microsoft como Prompt Shields, Azure Content Safety y GitHub Advanced Security para fortalecer tu implementación MCP.

## Objetivos de Aprendizaje

Al final de esta lección, serás capaz de:

- **Identificar Amenazas Específicas de MCP**: Reconocer los riesgos únicos de seguridad en sistemas MCP incluyendo inyección de prompts, envenenamiento de herramientas, permisos excesivos, secuestro de sesiones, problemas de delegado confundido, vulnerabilidades de paso de tokens y riesgos en la cadena de suministro
- **Aplicar Controles de Seguridad**: Implementar mitigaciones efectivas incluyendo autenticación robusta, acceso con menor privilegio, gestión segura de tokens, controles de seguridad en sesiones y verificación de la cadena de suministro
- **Aprovechar Soluciones de Seguridad Microsoft**: Entender y desplegar Microsoft Prompt Shields, Azure Content Safety y GitHub Advanced Security para la protección de cargas MCP
- **Validar Seguridad de Herramientas**: Reconocer la importancia de la validación de metadatos de herramientas, monitoreo de cambios dinámicos y defensa contra ataques indirectos de inyección de prompts
- **Integrar Mejores Prácticas**: Combinar fundamentos establecidos de seguridad (codificación segura, fortalecimiento del servidor, zero trust) con controles específicos MCP para una protección integral

# Arquitectura y Controles de Seguridad MCP

Las implementaciones modernas de MCP requieren enfoques de seguridad en capas que aborden tanto la seguridad tradicional del software como las amenazas específicas de IA. La especificación MCP, que evoluciona rápidamente, continúa madurando sus controles de seguridad, permitiendo una mejor integración con arquitecturas empresariales de seguridad y prácticas recomendadas establecidas.

La investigación del [Informe de Defensa Digital de Microsoft](https://aka.ms/mddr) demuestra que **el 98% de las brechas reportadas se habrían prevenido con una buena higiene de seguridad**. La estrategia de protección más efectiva combina prácticas de seguridad fundamentales con controles específicos MCP—las medidas básicas de seguridad probadas siguen siendo las más impactantes para reducir el riesgo general de seguridad.

## Panorama Actual de Seguridad

> **Nota:** Esta información refleja los estándares de seguridad MCP a fecha de **5 de febrero de 2026**, alineados con la **Especificación MCP 2025-11-25**. El protocolo MCP continúa evolucionando rápidamente, y futuras implementaciones podrían introducir nuevos patrones de autenticación y controles mejorados. Siempre consulta la actual [Especificación MCP](https://spec.modelcontextprotocol.io/), [repositorio MCP en GitHub](https://github.com/modelcontextprotocol) y la [documentación de mejores prácticas de seguridad](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) para obtener la guía más actualizada.

> **Mirando hacia adelante:** la candidata a lanzamiento `2026-07-28` fortalece aún más la autorización — los clientes deben validar el parámetro `iss` en las respuestas de autorización (RFC 9207), declarar un `application_type` OpenID Connect durante el Registro Dinámico de Clientes, y vincular credenciales registradas al servidor de autorización emisor. Consulta [Qué Cambia en MCP: Candidata a Lanzamiento 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para la lista completa de SEPs de autorización.

## 🏔️ Taller Cumbre de Seguridad MCP (Sherpa)

Para **capacitación práctica en seguridad**, recomendamos altamente el **Taller Cumbre de Seguridad MCP** (Sherpa) - una expedición guiada integral para asegurar servidores MCP en Microsoft Azure.

### Resumen del Taller

El [Taller Cumbre de Seguridad MCP](https://azure-samples.github.io/sherpa/) ofrece capacitación práctica y accionable de seguridad mediante una metodología probada de "vulnerabilidad → explotación → corrección → validación". Tú:

- **Aprender Rompiendo Cosas**: Experimentar vulnerabilidades de primera mano explotando servidores intencionalmente inseguros
- **Usar Seguridad Nativa de Azure**: Aprovechar Azure Entra ID, Key Vault, API Management y Azure AI Content Safety
- **Seguir Defensa en Profundidad**: Avanzar por campamentos construyendo capas completas de seguridad
- **Aplicar Estándares OWASP**: Cada técnica está mapeada a la [Guía MCP Azure Security OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obtener Código de Producción**: Salir con implementaciones funcionales y probadas

### Ruta de la Expedición

| Campamento | Enfoque | Riesgos OWASP Cubiertos |
|------|-------|---------------------|
| **Campamento Base** | Fundamentos MCP y vulnerabilidades de autenticación | MCP01, MCP07 |
| **Campamento 1: Identidad** | OAuth 2.1, Identidad Administrada de Azure, Key Vault | MCP01, MCP02, MCP07 |
| **Campamento 2: Gateway** | API Management, Endpoints Privados, gobernanza | MCP02, MCP06, MCP07, MCP09 |
| **Campamento 3: Seguridad I/O** | Inyección de prompts, protección de PII, seguridad de contenido | MCP03, MCP05, MCP06, MCP10 |
| **Campamento 4: Monitoreo** | Log Analytics, paneles, detección de amenazas | MCP04, MCP08 |
| **La Cumbre** | Prueba de integración Red Team / Blue Team | Todos |

**Comienza ya**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 Riesgos de Seguridad MCP según OWASP

La [Guía de Seguridad MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) detalla los diez riesgos de seguridad más críticos para implementaciones MCP:

| Riesgo | Descripción | Mitigación en Azure |
|------|-------------|------------------|
| **MCP01** | Mala gestión de tokens y exposición de secretos | Azure Key Vault, Identidad Administrada |
| **MCP02** | Escalación de privilegios por aumento de alcance | RBAC, Acceso Condicional |
| **MCP03** | Envenenamiento de herramientas | Validación de herramientas, verificación de integridad |
| **MCP04** | Ataques a la cadena de suministro de software y manipulación de dependencias | GitHub Advanced Security, escaneo de dependencias |
| **MCP05** | Inyección y ejecución de comandos | Validación de entradas, sandboxing |
| **MCP06** | Subversión del flujo de intenciones | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autenticación y autorización insuficientes | Azure Entra ID, OAuth 2.1 con PKCE |
| **MCP08** | Falta de auditoría y telemetría | Azure Monitor, Application Insights |
| **MCP09** | Servidores MCP sombra | Gobernanza en API Center, aislamiento de red |
| **MCP10** | Inyección de contexto y sobreexposición | Clasificación de datos, exposición mínima |

### Evolución de la Autenticación MCP

La especificación MCP ha evolucionado significativamente en su enfoque de autenticación y autorización:

- **Enfoque Original**: Especificaciones tempranas requerían que desarrolladores implementaran servidores de autenticación personalizados, con servidores MCP actuando como Servidores de Autorización OAuth 2.0 gestionando la autenticación de usuarios directamente
- **Estándar Actual (2025-11-25)**: La especificación actualizada permite que servidores MCP deleguen la autenticación a proveedores de identidad externos (como Microsoft Entra ID), mejorando la postura de seguridad y reduciendo la complejidad de implementación
- **Seguridad en la Capa de Transporte**: Soporte mejorado para mecanismos de transporte seguro con patrones de autenticación adecuados para conexiones locales (STDIO) y remotas (HTTP transmisible)

## Seguridad en Autenticación y Autorización

### Desafíos Actuales de Seguridad

Las implementaciones modernas MCP enfrentan varios desafíos en autenticación y autorización:

### Riesgos y Vectores de Amenaza

- **Lógica de autorización mal configurada**: Implementación defectuosa de autorización en servidores MCP puede exponer datos sensibles y aplicar controles de acceso incorrectamente
- **Compromiso de tokens OAuth**: Robo de tokens de servidores MCP locales permite a atacantes suplantar servidores y acceder a servicios descendentes
- **Vulnerabilidades de paso de tokens**: Manejo inapropiado de tokens crea bypasses de controles de seguridad y brechas de responsabilidad
- **Permisos excesivos**: Servidores MCP con privilegios elevados violan el principio de menor privilegio y expanden las superficies de ataque

#### Paso de tokens: Un anti-patrón crítico

**El paso de tokens está explícitamente prohibido** en la especificación actual de autorización MCP debido a sus graves implicaciones de seguridad:

##### Circunvención de controles de seguridad
- Los servidores MCP y APIs descendentes implementan controles críticos de seguridad (limitación de tasa, validación de solicitudes, monitoreo de tráfico) que dependen de una correcta validación de tokens
- El uso directo de tokens cliente-API vulnera estas protecciones esenciales, debilitando la arquitectura de seguridad

##### Retos de Responsabilidad y Auditoría  
- Los servidores MCP no pueden distinguir entre clientes que usan tokens emitidos aguas arriba, rompiendo la trazabilidad de auditorías
- Los registros del servidor de recursos descendente muestran orígenes de solicitud engañosos en vez de los intermediarios MCP reales
- La investigación de incidentes y auditoría de cumplimiento se dificultan significativamente

##### Riesgos de exfiltración de datos
- Reclamos de tokens no validados permiten a actores maliciosos con tokens robados usar servidores MCP como proxies para la exfiltración de datos
- Las violaciones del límite de confianza permiten patrones de acceso no autorizados que omiten controles de seguridad previstos

##### Vectores de ataque multi-servicio
- Tokens comprometidos aceptados por múltiples servicios permiten movimientos laterales a través de sistemas conectados
- Las suposiciones de confianza entre servicios pueden romperse cuando no se pueden verificar los orígenes de tokens

### Controles y Mitigaciones de Seguridad

**Requisitos críticos de seguridad:**

> **OBLIGATORIO**: Los servidores MCP **NO DEBEN** aceptar tokens que no hayan sido emitidos explícitamente para el servidor MCP

#### Controles de Autenticación y Autorización

- **Revisión rigurosa de autorización**: Realizar auditorías completas de la lógica de autorización del servidor MCP para asegurar que solo los usuarios y clientes intencionados puedan acceder a recursos sensibles
  - **Guía de Implementación**: [Azure API Management como puerta de enlace de autenticación para servidores MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Integración de identidad**: [Uso de Microsoft Entra ID para autenticación de servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestión segura de tokens**: Implementar las [mejores prácticas de validación y ciclo de vida de tokens de Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Validar que los claims de audiencia del token concuerden con la identidad del servidor MCP
  - Implementar políticas adecuadas de rotación y expiración de tokens
  - Prevenir ataques de reuso de tokens y uso no autorizado

- **Almacenamiento protegido de tokens**: Almacenar tokens de forma segura con cifrado en reposo y en tránsito
  - **Mejores prácticas**: [Directrices para almacenamiento seguro y cifrado de tokens](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementación de control de acceso

- **Principio de menor privilegio**: Otorgar a los servidores MCP solo los permisos mínimos necesarios para la funcionalidad prevista
  - Revisiones y actualizaciones regulares de permisos para prevenir escalación de privilegios
  - **Documentación Microsoft**: [Acceso seguro con menor privilegio](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Control de acceso basado en roles (RBAC)**: Implementar asignaciones de roles con granularidad fina
  - Limitar roles estrictamente a recursos y acciones específicas
  - Evitar permisos amplios o innecesarios que amplían superficies de ataque

- **Monitoreo continuo de permisos**: Implementar auditoría y monitoreo continuo de accesos
  - Monitorear patrones de uso de permisos para detectar anomalías
  - Remediar rápidamente privilegios excesivos o no utilizados

## Amenazas de Seguridad Específicas para IA

### Ataques de Inyección de Prompt y Manipulación de Herramientas

Las implementaciones modernas MCP enfrentan vectores de ataque específicos sofisticados de IA que las medidas tradicionales de seguridad no pueden abordar completamente:

#### **Inyección de Prompt Indirecta (Inyección de Prompt entre Dominios)**

La **Inyección de Prompt Indirecta** representa una de las vulnerabilidades más críticas en sistemas IA habilitados con MCP. Los atacantes incrustan instrucciones maliciosas dentro de contenido externo—documentos, páginas web, correos electrónicos o fuentes de datos—que los sistemas IA procesan posteriormente como comandos legítimos.

**Escenarios de ataque:**
- **Inyección basada en documentos**: Instrucciones maliciosas ocultas en documentos procesados que provocan acciones no intencionadas de la IA
- **Explotación de contenido web**: Páginas web comprometidas que contienen prompts incrustados que manipulan el comportamiento de la IA al ser raspados
- **Ataques basados en correos electrónicos**: Prompts maliciosos en emails que hacen que asistentes IA filtren información o realicen acciones no autorizadas
- **Contaminación de fuentes de datos**: Bases de datos o APIs comprometidas que entregan contenido contaminado a sistemas IA

**Impacto en el mundo real**: Estos ataques pueden resultar en exfiltración de datos, violaciones de privacidad, generación de contenido dañino y manipulación de interacciones con usuarios. Para un análisis detallado, consulta [Inyección de Prompt en MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagrama de ataque de inyección de prompt](../../../translated_images/es/prompt-injection.ed9fbfde297ca877.webp)

#### **Ataques de Envenenamiento de Herramientas**

El **Envenenamiento de Herramientas** apunta a los metadatos que definen las herramientas MCP, explotando cómo los LLM interpretan las descripciones y parámetros de las herramientas para tomar decisiones de ejecución.

**Mecanismos de ataque:**
- **Manipulación de metadatos**: Los atacantes inyectan instrucciones maliciosas en descripciones de herramientas, definiciones de parámetros o ejemplos de uso
- **Instrucciones invisibles**: Prompts ocultos en los metadatos de herramientas que son procesados por modelos IA, pero invisibles para usuarios humanos
- **Modificación dinámica de herramientas ("Rug Pulls")**: Herramientas aprobadas por usuarios son modificadas posteriormente para ejecutar acciones maliciosas sin conocimiento del usuario
- **Inyección de parámetros**: Contenido malicioso incrustado en esquemas de parámetros de herramientas que influye en el comportamiento del modelo


**Riesgos del Servidor Hospedado**: Los servidores MCP remotos presentan riesgos elevados ya que las definiciones de las herramientas pueden actualizarse después de la aprobación inicial del usuario, creando escenarios donde herramientas previamente seguras se vuelven maliciosas. Para un análisis completo, vea [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/es/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vectores adicionales de ataque de IA**

- **Inyección de Prompt entre Dominios Cruzados (XPIA)**: Ataques sofisticados que aprovechan contenido de múltiples dominios para evadir controles de seguridad
- **Modificación Dinámica de Capacidades**: Cambios en tiempo real a las capacidades de herramientas que escapan a evaluaciones de seguridad iniciales
- **Envenenamiento de la Ventana de Contexto**: Ataques que manipulan grandes ventanas de contexto para ocultar instrucciones maliciosas
- **Ataques de Confusión del Modelo**: Explotar limitaciones del modelo para crear comportamientos impredecibles o inseguros


### Impacto del Riesgo de Seguridad de IA

**Consecuencias de Alto Impacto:**
- **Exfiltración de Datos**: Acceso no autorizado y robo de datos sensibles empresariales o personales
- **Violaciones de Privacidad**: Exposición de información personal identificable (PII) y datos confidenciales de negocios  
- **Manipulación del Sistema**: Modificaciones no intencionadas a sistemas y flujos de trabajo críticos
- **Robo de Credenciales**: Compromiso de tokens de autenticación y credenciales de servicio
- **Movimiento Lateral**: Uso de sistemas de IA comprometidos como pivotes para ataques más amplios en la red

### Soluciones de Seguridad de IA de Microsoft

#### **AI Prompt Shields: Protección Avanzada contra Ataques de Inyección**

Microsoft **AI Prompt Shields** ofrecen una defensa integral contra ataques de inyección de prompt tanto directos como indirectos mediante múltiples capas de seguridad:

##### **Mecanismos de Protección Básicos:**

1. **Detección y Filtrado Avanzado**
   - Algoritmos de aprendizaje automático y técnicas de PLN detectan instrucciones maliciosas en contenido externo
   - Análisis en tiempo real de documentos, páginas web, correos electrónicos y fuentes de datos para amenazas incrustadas
   - Comprensión contextual de patrones legítimos vs. maliciosos de prompts

2. **Técnicas de Spotlighting**  
   - Distingue entre instrucciones del sistema confiables y entradas externas potencialmente comprometidas
   - Métodos de transformación de texto que mejoran la relevancia del modelo mientras aíslan contenido malicioso
   - Ayuda a los sistemas de IA a mantener la jerarquía adecuada de instrucciones e ignorar comandos inyectados

3. **Sistemas de Delimitadores y Marcado de Datos**
   - Definición explícita de límites entre mensajes del sistema confiables y texto de entrada externa
   - Marcadores especiales resaltan límites entre fuentes de datos confiables y no confiables
   - Separación clara evita confusión de instrucciones y ejecución no autorizada de comandos

4. **Inteligencia Continua de Amenazas**
   - Microsoft monitorea continuamente patrones emergentes de ataques y actualiza defensas
   - Caza proactiva de amenazas para nuevas técnicas de inyección y vectores de ataque
   - Actualizaciones regulares del modelo de seguridad para mantener efectividad frente a amenazas evolutivas

5. **Integración con Azure Content Safety**
   - Parte de la suite integral Azure AI Content Safety
   - Detección adicional para intentos de jailbreak, contenido dañino y violaciones de políticas de seguridad
   - Controles de seguridad unificados a través de todos los componentes de aplicaciones de IA

**Recursos de Implementación**: [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/es/prompt-shield.ff5b95be76e9c78c.webp)


## Amenazas Avanzadas de Seguridad MCP

### Vulnerabilidades de Secuestro de Sesión

El **secuestro de sesión** representa un vector de ataque crítico en implementaciones MCP con estado, donde actores no autorizados obtienen y abusan identificadores legítimos de sesión para suplantar clientes y realizar acciones no autorizadas.

#### **Escenarios de Ataque y Riesgos**

- **Inyección de Prompt por Secuestro de Sesión**: Atacantes con ID de sesión robados inyectan eventos maliciosos en servidores que comparten estado de sesión, potencialmente activando acciones dañinas o accediendo a datos sensibles
- **Suplantación Directa**: IDs de sesión robados permiten llamadas directas a servidores MCP que omiten autenticación, tratando a atacantes como usuarios legítimos
- **Streams Reanudables Comprometidos**: Atacantes pueden terminar solicitudes prematuramente, causando que clientes legítimos reanuden con contenido potencialmente malicioso

#### **Controles de Seguridad para Gestión de Sesiones**

**Requisitos Críticos:**
- **Verificación de Autorización**: Los servidores MCP que implementan autorización **DEBEN** verificar TODAS las solicitudes entrantes y **NO DEBEN** confiar en sesiones para autenticación
- **Generación Segura de Sesiones**: Usar IDs de sesión criptográficamente seguros, no determinísticos, generados con generadores de números aleatorios seguros
- **Vinculación Específica de Usuario**: Vincular IDs de sesión con información específica del usuario usando formatos como `<user_id>:<session_id>` para prevenir abuso de sesión entre usuarios
- **Gestión del Ciclo de Vida de Sesiones**: Implementar expiración, rotación, e invalidación adecuadas para limitar ventanas de vulnerabilidad
- **Seguridad de Transporte**: HTTPS obligatorio para toda comunicación para prevenir intercepción de IDs de sesión

### Problema del Apoderado Confundido

El **problema del apoderado confundido** ocurre cuando servidores MCP actúan como proxies de autenticación entre clientes y servicios terceros, creando oportunidades para eludir autorizaciones mediante la explotación de IDs de cliente estáticos.

#### **Mecánicas y Riesgos del Ataque**

- **Evasión de Consentimiento Basada en Cookies**: Autenticación previa de usuario crea cookies de consentimiento que atacantes explotan mediante solicitudes maliciosas de autorización con URIs de redirección manipuladas
- **Robo de Código de Autorización**: Cookies de consentimiento existentes pueden hacer que servidores de autorización omitan pantallas de consentimiento, redirigiendo códigos a endpoints controlados por atacantes  
- **Acceso No Autorizado a API**: Códigos de autorización robados permiten intercambio de tokens y suplantación de usuario sin aprobación explícita

#### **Estrategias de Mitigación**

**Controles obligatorios:**
- **Requisitos de Consentimiento Explícito**: Los servidores proxy MCP que usan IDs de cliente estáticos **DEBEN** obtener consentimiento del usuario para cada cliente registrado dinámicamente
- **Implementación de Seguridad OAuth 2.1**: Seguir las mejores prácticas actuales de seguridad OAuth incluyendo PKCE (Proof Key for Code Exchange) para todas las solicitudes de autorización
- **Validación Estricta de Cliente**: Implementar validación rigurosa de URIs de redirección e identificadores de cliente para prevenir explotación

### Vulnerabilidades de Paso de Token  

El **paso de token** representa un anti-patrón explícito donde servidores MCP aceptan tokens de cliente sin validación adecuada y los reenvían a APIs descendentes, violando especificaciones de autorización MCP.

#### **Implicaciones de Seguridad**

- **Evasión de Control**: Uso directo del token cliente hacia la API evade importantes controles de limitación de tasa, validación y monitoreo
- **Corrupción de Registro de Auditoría**: Tokens emitidos de forma ascendente impiden identificación del cliente, rompiendo capacidades de investigación de incidentes
- **Exfiltración de Datos Basada en Proxy**: Tokens no validados permiten a actores maliciosos usar servidores como proxy para acceso no autorizado a datos
- **Violaciones de Límites de Confianza**: Las suposiciones de confianza de servicios descendentes pueden quedar violadas cuando no se puede verificar el origen de tokens
- **Expansión de Ataques Multi-servicio**: Tokens comprometidos aceptados en múltiples servicios habilitan movimiento lateral

#### **Controles de Seguridad Requeridos**

**Requisitos Innegociables:**
- **Validación de Tokens**: Los servidores MCP **NO DEBEN** aceptar tokens no emitidos explícitamente para el servidor MCP
- **Verificación de Audiencia**: Siempre validar que los claims de audiencia del token coincidan con la identidad del servidor MCP
- **Ciclo de Vida Apropiado de Tokens**: Implementar tokens de acceso de corta duración con prácticas seguras de rotación


## Seguridad de la Cadena de Suministro para Sistemas de IA

La seguridad de la cadena de suministro ha evolucionado más allá de las dependencias tradicionales de software para abarcar todo el ecosistema de IA. Las implementaciones modernas de MCP deben verificar y monitorear rigurosamente todos los componentes relacionados con IA, ya que cada uno introduce vulnerabilidades potenciales que podrían comprometer la integridad del sistema.

### Componentes Ampliados de la Cadena de Suministro de IA

**Dependencias Tradicionales de Software:**
- Bibliotecas y frameworks de código abierto
- Imágenes de contenedores y sistemas base  
- Herramientas de desarrollo y pipelines de construcción
- Componentes y servicios de infraestructura

**Elementos Específicos de la Cadena de Suministro de IA:**
- **Modelos Fundamentales**: Modelos preentrenados de diversos proveedores que requieren verificación de procedencia
- **Servicios de Embedding**: Servicios externos de vectorización y búsqueda semántica
- **Proveedores de Contexto**: Fuentes de datos, bases de conocimiento y repositorios de documentos  
- **APIs de Terceros**: Servicios externos de IA, pipelines de ML y endpoints de procesamiento de datos
- **Artefactos del Modelo**: Pesos, configuraciones y variantes de modelos afinados
- **Fuentes de Datos de Entrenamiento**: Conjuntos de datos usados para el entrenamiento y afinamiento del modelo

### Estrategia Integral de Seguridad de la Cadena de Suministro

#### **Verificación y Confianza de Componentes**
- **Validación de Procedencia**: Verificar el origen, licenciamiento e integridad de todos los componentes de IA antes de la integración
- **Evaluación de Seguridad**: Realizar escaneos de vulnerabilidades y revisiones de seguridad para modelos, fuentes de datos y servicios de IA
- **Análisis de Reputación**: Evaluar el historial de seguridad y las prácticas de los proveedores de servicios de IA
- **Verificación de Cumplimiento**: Asegurar que todos los componentes cumplan requisitos organizativos de seguridad y regulatorios

#### **Pipelines Seguros de Despliegue**  
- **Seguridad Automatizada CI/CD**: Integrar escaneo de seguridad a lo largo de pipelines automatizados de despliegue
- **Integridad de Artefactos**: Implementar verificación criptográfica para todos los artefactos desplegados (código, modelos, configuraciones)
- **Despliegue por Etapas**: Usar estrategias progresivas de despliegue con validación de seguridad en cada etapa
- **Repositorios de Artefactos Confiables**: Desplegar solo desde registros y repositorios verificados y seguros

#### **Monitoreo Continuo y Respuesta**
- **Escaneo de Dependencias**: Monitoreo continuo de vulnerabilidades en todas las dependencias de software y componentes de IA
- **Monitoreo de Modelos**: Evaluación continua del comportamiento del modelo, deriva de rendimiento y anomalías de seguridad
- **Seguimiento de Salud del Servicio**: Monitoreo de servicios externos de IA para disponibilidad, incidentes de seguridad y cambios de políticas
- **Integración de Inteligencia de Amenazas**: Incorporar fuentes de amenazas específicas de riesgos de seguridad en IA y ML

#### **Control de Accesos y Mínimos Privilegios**
- **Permisos a Nivel de Componente**: Restringir acceso a modelos, datos y servicios basado en la necesidad del negocio
- **Gestión de Cuentas de Servicio**: Implementar cuentas de servicio dedicadas con permisos mínimos necesarios
- **Segmentación de Red**: Aislar componentes de IA y limitar acceso de red entre servicios
- **Controles en API Gateway**: Usar gateways de API centralizados para controlar y monitorear acceso a servicios externos de IA

#### **Respuesta y Recuperación ante Incidentes**
- **Procedimientos de Respuesta Rápida**: Procesos establecidos para parchear o reemplazar componentes de IA comprometidos
- **Rotación de Credenciales**: Sistemas automáticos para rotar secretos, claves API y credenciales de servicio
- **Capacidades de Reversa**: Capacidad para revertir rápidamente a versiones previas conocidas y buenas de componentes de IA
- **Recuperación ante Brechas en la Cadena de Suministro**: Procedimientos específicos para responder a compromisos en servicios de IA ascendentes

### Herramientas e Integración de Seguridad de Microsoft

**GitHub Advanced Security** ofrece protección integral de la cadena de suministro que incluye:
- **Escaneo de Secretos**: Detección automática de credenciales, claves API y tokens en repositorios
- **Escaneo de Dependencias**: Evaluación de vulnerabilidades para dependencias y bibliotecas de código abierto
- **Análisis CodeQL**: Análisis estático de código para vulnerabilidades de seguridad y problemas de codificación
- **Insights de la Cadena de Suministro**: Visibilidad del estado de salud y seguridad de dependencias

**Integración Azure DevOps y Azure Repos:**
- Integración fluida de escaneo de seguridad a través de plataformas de desarrollo Microsoft
- Controles automáticos de seguridad en Azure Pipelines para cargas de trabajo de IA
- Aplicación de políticas para despliegue seguro de componentes de IA

**Prácticas Internas de Microsoft:**
Microsoft implementa prácticas extensas de seguridad en la cadena de suministro en todos sus productos. Conozca enfoques probados en [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Mejores Prácticas de Seguridad Fundamentales

Las implementaciones MCP heredan y se construyen sobre la postura de seguridad existente de su organización. Fortalecer prácticas de seguridad fundamentales mejora significativamente la seguridad general de sistemas de IA y despliegues MCP.

### Fundamentos Clave de Seguridad

#### **Prácticas de Desarrollo Seguro**
- **Cumplimiento OWASP**: Proteger contra vulnerabilidades de aplicaciones web [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Protecciones Específicas de IA**: Implementar controles para [OWASP Top 10 para LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Gestión Segura de Secretos**: Usar bóvedas dedicadas para tokens, claves API y datos sensibles de configuración
- **Encriptación de Extremo a Extremo**: Implementar comunicaciones seguras en todos los componentes de la aplicación y flujos de datos
- **Validación de Entradas**: Validación rigurosa de todas las entradas de usuario, parámetros API y fuentes de datos

#### **Endurecimiento de Infraestructura**
- **Autenticación Multifactor**: MFA obligatoria para todas las cuentas administrativas y de servicio
- **Gestión de Parcheo**: Aplicación automática y oportuna de parches para sistemas operativos, frameworks y dependencias  
- **Integración con Proveedor de Identidad**: Gestión centralizada de identidades mediante proveedores empresariales (Microsoft Entra ID, Active Directory)
- **Segmentación de Red**: Aislamiento lógico de componentes MCP para limitar potencial de movimientos laterales
- **Principio de Mínimos Privilegios**: Permisos mínimos requeridos para todos los componentes y cuentas del sistema

#### **Monitoreo y Detección de Seguridad**
- **Registro Exhaustivo**: Detallado registro de actividades de la aplicación IA, incluyendo interacciones cliente-servidor MCP
- **Integración SIEM**: Gestión centralizada de información y eventos de seguridad para detección de anomalías
- **Análisis Conductual**: Monitoreo potenciado por IA para detectar patrones inusuales en comportamiento del sistema y usuarios
- **Inteligencia de Amenazas**: Integración de fuentes externas de amenazas e indicadores de compromiso (IOCs)
- **Respuesta ante Incidentes**: Procedimientos bien definidos para detección, respuesta y recuperación de incidentes de seguridad

#### **Arquitectura de Confianza Cero**
- **Nunca Confiar, Siempre Verificar**: Verificación continua de usuarios, dispositivos y conexiones de red
- **Microsegmentación**: Controles granulares de red que aíslan cargas de trabajo y servicios individuales
- **Seguridad Centrada en Identidad**: Políticas de seguridad basadas en identidades verificadas más que en ubicación de red
- **Evaluación Continua de Riesgos**: Evaluación dinámica de postura de seguridad basada en contexto y comportamiento actuales
- **Acceso Condicional**: Controles de acceso que se adaptan según factores de riesgo, ubicación y confianza del dispositivo

### Patrones de Integración Empresarial

#### **Integración al Ecosistema de Seguridad Microsoft**
- **Microsoft Defender for Cloud**: Gestión integral de postura de seguridad en la nube
- **Azure Sentinel**: Capacidades nativas en la nube de SIEM y SOAR para protección de cargas de trabajo IA
- **Microsoft Entra ID**: Gestión empresarial de identidades y accesos con políticas de acceso condicional
- **Azure Key Vault**: Gestión centralizada de secretos con soporte de módulo de seguridad de hardware (HSM)
- **Microsoft Purview**: Gobernanza de datos y cumplimiento para fuentes de datos y flujos de trabajo de IA

#### **Cumplimiento y Gobernanza**
- **Alineación Regulatoria**: Asegurar que implementaciones MCP cumplan con requisitos regulatorios específicos de la industria (GDPR, HIPAA, SOC 2)

- **Clasificación de Datos**: Categorización y manejo adecuado de datos sensibles procesados por sistemas de IA
- **Registros de Auditoría**: Registro exhaustivo para cumplimiento normativo e investigación forense
- **Controles de Privacidad**: Implementación de principios de privacidad desde el diseño en la arquitectura de sistemas de IA
- **Gestión de Cambios**: Procesos formales para revisiones de seguridad de modificaciones en sistemas de IA

Estas prácticas fundamentales crean una base sólida de seguridad que mejora la efectividad de los controles específicos de seguridad MCP y brinda protección integral para aplicaciones impulsadas por IA.

## Conclusiones Clave de Seguridad

- **Enfoque de Seguridad en Capas**: Combine prácticas fundamentales de seguridad (codificación segura, menor privilegio, verificación de cadena de suministro, monitoreo continuo) con controles específicos de IA para una protección integral

- **Panorama de Amenazas Específico de IA**: Los sistemas MCP enfrentan riesgos únicos como inyección de prompt, envenenamiento de herramientas, secuestro de sesiones, problemas de representante confundido, vulnerabilidades de pase de tokens y permisos excesivos que requieren mitigaciones especializadas

- **Excelencia en Autenticación y Autorización**: Implementar autenticación robusta usando proveedores de identidad externos (Microsoft Entra ID), aplicar validación adecuada de tokens y nunca aceptar tokens no emitidos explícitamente para su servidor MCP

- **Prevención de Ataques en IA**: Desplegar Microsoft Prompt Shields y Azure Content Safety para defender contra inyección indirecta de prompts y ataques de envenenamiento de herramientas, mientras se valida la metadata de las herramientas y se monitorean cambios dinámicos

- **Seguridad de Sesión y Transporte**: Usar IDs de sesión criptográficamente seguros y no determinísticos ligados a identidades de usuario, implementar adecuada gestión del ciclo de vida de sesiones y nunca usar sesiones para autenticación

- **Mejores Prácticas de Seguridad OAuth**: Prevenir ataques de representante confundido mediante consentimiento explícito del usuario para clientes registrados dinámicamente, implementación correcta de OAuth 2.1 con PKCE y estricta validación de URI de redirección  

- **Principios de Seguridad de Tokens**: Evitar patrones anti-token pase, validar reclamaciones de audiencia del token, implementar tokens de corta vida con rotación segura y mantener límites claros de confianza

- **Seguridad Integral de la Cadena de Suministro**: Tratar todos los componentes del ecosistema de IA (modelos, embeddings, proveedores de contexto, APIs externas) con el mismo rigor de seguridad que dependencias de software tradicionales

- **Evolución Continua**: Mantenerse actualizado con las especificaciones MCP que evolucionan rápidamente, contribuir a estándares de comunidad de seguridad y mantener posturas de seguridad adaptativas a medida que el protocolo madura

- **Integración con Seguridad de Microsoft**: Aprovechar el ecosistema completo de seguridad de Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) para mejorar la protección en el despliegue MCP

## Recursos Completos

### **Documentación Oficial de Seguridad MCP**
- [Especificación MCP (Actual: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Mejores Prácticas de Seguridad MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificación de Autorización MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositorio MCP en GitHub](https://github.com/modelcontextprotocol)

### **Recursos de Seguridad OWASP MCP**
- [Guía de Seguridad OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Lista completa OWASP MCP Top 10 con guía de implementación en Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Riesgos oficiales de seguridad MCP OWASP
- [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Entrenamiento práctico en seguridad para MCP en Azure

### **Estándares y Mejores Prácticas de Seguridad**
- [Mejores Prácticas de Seguridad OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 Seguridad de Aplicaciones Web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 para Modelos de Lenguaje Grande](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Informe de Defensa Digital de Microsoft](https://aka.ms/mddr)

### **Investigación y Análisis de Seguridad en IA**
- [Inyección de Prompt en MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Ataques de Envenenamiento de Herramientas (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Informe de Investigación de Seguridad MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluciones de Seguridad Microsoft**
- [Documentación Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Servicio Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Seguridad Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Mejores Prácticas en Gestión de Tokens en Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guías de Implementación y Tutoriales**
- [Azure API Management como Gateway de Autenticación MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autenticación Microsoft Entra ID con Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Almacenamiento Seguro de Tokens y Encriptación (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps y Seguridad de la Cadena de Suministro**
- [Seguridad Azure DevOps](https://azure.microsoft.com/products/devops)
- [Seguridad Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Trayectoria de Seguridad en la Cadena de Suministro de Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentación de Seguridad Adicional**

Para guías completas de seguridad, consulte estos documentos especializados en esta sección:

- **[Mejores Prácticas de Seguridad MCP 2025](./mcp-security-best-practices-2025.md)** - Prácticas completas de seguridad para implementaciones MCP
- **[Implementación Azure Content Safety](./azure-content-safety-implementation.md)** - Ejemplos prácticos para integración con Azure Content Safety  
- **[Controles de Seguridad MCP 2025](./mcp-security-controls-2025.md)** - Controles y técnicas de seguridad más recientes para despliegues MCP
- **[Referencia Rápida de Mejores Prácticas MCP](./mcp-best-practices.md)** - Guía rápida de prácticas esenciales de seguridad MCP
- **[BlueHat 2026: Asegurando el futuro de la IA: Asegurando MCP con patrones de defensa en profundidad](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Patrones de defensa en profundidad del Centro de Respuesta de Seguridad de Microsoft (MSRC)

### **Entrenamiento Práctico en Seguridad**

- **[Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Taller práctico completo para asegurar servidores MCP en Azure con campamentos progresivos desde Base Camp hasta Summit
- **[Guía de Seguridad OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Arquitectura de referencia y guía de implementación para todos los riesgos OWASP MCP Top 10

---

## Qué Sigue

Siguiente: [Capítulo 3: Primeros Pasos](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->