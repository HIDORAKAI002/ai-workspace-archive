# Seguridad MCP: Protección Integral para Sistemas de IA

[![Mejores Prácticas de Seguridad MCP](../../../translated_images/es/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Haz clic en la imagen de arriba para ver el video de esta lección)_

La seguridad es fundamental en el diseño de sistemas de IA, por eso la priorizamos como nuestra segunda sección. Esto está alineado con el principio **Seguro por Diseño** de Microsoft, del [Secure Future Initiative](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

El Protocolo de Contexto del Modelo (MCP) aporta nuevas capacidades potentes a aplicaciones impulsadas por IA, al mismo tiempo que introduce desafíos únicos de seguridad que van más allá de los riesgos tradicionales de software. Los sistemas MCP enfrentan tanto preocupaciones de seguridad establecidas (codificación segura, mínimo privilegio, seguridad en la cadena de suministro) como nuevas amenazas específicas de IA, incluyendo la inyección de prompts, envenenamiento de herramientas, secuestro de sesiones, ataques de delegado confundido, vulnerabilidades de paso de tokens y modificación dinámica de capacidades.

Esta lección explora los riesgos de seguridad más críticos en implementaciones MCP—cubriendo autenticación, autorización, permisos excesivos, inyección indirecta de prompts, seguridad de sesiones, problemas de delegado confundido, gestión de tokens y vulnerabilidades en la cadena de suministro. Aprenderás controles prácticos y mejores prácticas para mitigar estos riesgos mientras aprovechas soluciones Microsoft como Prompt Shields, Azure Content Safety y GitHub Advanced Security para fortalecer tu despliegue MCP.

## Objetivos de Aprendizaje

Al final de esta lección, podrás:

- **Identificar Amenazas Específicas de MCP**: Reconocer riesgos de seguridad únicos en sistemas MCP, incluyendo inyección de prompts, envenenamiento de herramientas, permisos excesivos, secuestro de sesiones, problemas de delegado confundido, vulnerabilidades de paso de tokens y riesgos en la cadena de suministro
- **Aplicar Controles de Seguridad**: Implementar mitigaciones efectivas que incluyen autenticación robusta, acceso con mínimo privilegio, gestión segura de tokens, controles de seguridad de sesiones y verificación de cadena de suministro
- **Aprovechar Soluciones de Seguridad de Microsoft**: Entender y desplegar Microsoft Prompt Shields, Azure Content Safety y GitHub Advanced Security para la protección de cargas de trabajo MCP
- **Validar la Seguridad de Herramientas**: Reconocer la importancia de la validación de metadatos de herramientas, monitoreo para cambios dinámicos y defensa contra ataques indirectos de inyección de prompts
- **Integrar Mejores Prácticas**: Combinar fundamentos establecidos de seguridad (codificación segura, endurecimiento de servidores, modelo de zero trust) con controles específicos MCP para una protección integral

# Arquitectura y Controles de Seguridad MCP

Las implementaciones modernas de MCP requieren enfoques de seguridad en capas que aborden tanto la seguridad tradicional del software como las amenazas específicas de IA. La especificación MCP, que evoluciona rápidamente, continúa madurando sus controles de seguridad, permitiendo una mejor integración con arquitecturas de seguridad empresariales y mejores prácticas establecidas.

La investigación del [Informe de Defensa Digital de Microsoft](https://aka.ms/mddr) demuestra que **el 98% de las brechas reportadas se prevendrían con una higiene de seguridad robusta**. La estrategia de protección más efectiva combina prácticas de seguridad fundamentales con controles específicos MCP—las medidas base probadas siguen siendo las más impactantes para reducir el riesgo general de seguridad.

## Panorama Actual de Seguridad

> **Nota:** Esta información refleja los estándares de seguridad MCP a partir del **5 de febrero de 2026**, alineada con la **Especificación MCP 2025-11-25**. El protocolo MCP continúa su rápida evolución, y futuras implementaciones pueden introducir nuevos patrones de autenticación y controles mejorados. Consulta siempre la actual [Especificación MCP](https://spec.modelcontextprotocol.io/), el [repositorio MCP en GitHub](https://github.com/modelcontextprotocol) y la [documentación de mejores prácticas de seguridad](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) para la guía más reciente.

## 🏔️ Taller MCP Security Summit (Sherpa)

Para **entrenamiento práctico en seguridad**, recomendamos ampliamente el **MCP Security Summit Workshop** (Sherpa): una expedición guiada integral para asegurar servidores MCP en Microsoft Azure.

### Resumen del Taller

El [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) ofrece capacitación práctica y accionable en seguridad a través de una metodología probada "vulnerable → explotar → corregir → validar". En él:

- **Aprenderás Rompiendo Sistemas**: Experimenta vulnerabilidades explotando servidores intencionalmente inseguros  
- **Usarás Seguridad Nativa de Azure**: Aprovecha Azure Entra ID, Key Vault, API Management y AI Content Safety  
- **Seguirás Defensa en Profundidad**: Avanza por campamentos construyendo capas de seguridad integrales  
- **Aplicarás Estándares OWASP**: Cada técnica se mapea con la [Guía de Seguridad MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)  
- **Obtendrás Código de Producción**: Saldrás con implementaciones funcionales y testeadas

### Ruta de la Expedición

| Campamento | Enfoque | Riesgos OWASP Cubiertos |
|------------|---------|-------------------------|
| **Campamento Base** | Fundamentos MCP y vulnerabilidades de autenticación | MCP01, MCP07 |
| **Campamento 1: Identidad** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Campamento 2: Gateway** | API Management, Endpoints Privados, gobernanza | MCP02, MCP07, MCP09 |
| **Campamento 3: Seguridad de I/O** | Inyección de prompts, protección de PII, seguridad de contenido | MCP03, MCP05, MCP06 |
| **Campamento 4: Monitorización** | Log Analytics, paneles, detección de amenazas | MCP08 |
| **La Cumbre** | Prueba de integración Red Team / Blue Team | Todos |

**Comienza Aquí**: [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Los 10 Riesgos Top de Seguridad MCP según OWASP

La [Guía de Seguridad MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) detalla los diez riesgos de seguridad más críticos para implementaciones MCP:

| Riesgo | Descripción | Mitigación en Azure |
|--------|-------------|---------------------|
| **MCP01** | Mala gestión de tokens y exposición de secretos | Azure Key Vault, Managed Identity |
| **MCP02** | Escalación de privilegios vía incremento de scopes | RBAC, Acceso condicional |
| **MCP03** | Envenenamiento de herramientas | Validación de herramientas, verificación de integridad |
| **MCP04** | Ataques a la cadena de suministro | GitHub Advanced Security, escaneo de dependencias |
| **MCP05** | Inyección y ejecución de comandos | Validación de entrada, sandboxing |
| **MCP06** | Inyección de prompts vía cargas contextuales | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Autenticación y autorización insuficientes | Azure Entra ID, OAuth 2.1 con PKCE |
| **MCP08** | Falta de auditoría y telemetría | Azure Monitor, Application Insights |
| **MCP09** | Servidores MCP "ombra" | Gobernanza en API Center, aislamiento de red |
| **MCP10** | Inyección de contexto y sobre-exposición | Clasificación de datos, exposición mínima |

### Evolución de Autenticación MCP

La especificación MCP ha evolucionado significativamente en su enfoque de autenticación y autorización:

- **Enfoque Original**: Especificaciones tempranas requerían que desarrolladores implementaran servidores de autenticación personalizados, con servidores MCP actuando como Servidores de Autorización OAuth 2.0 que gestionaban la autenticación de usuarios directamente  
- **Estándar Actual (2025-11-25)**: La especificación actualizada permite que servidores MCP deleguen la autenticación a proveedores externos de identidad (como Microsoft Entra ID), mejorando la postura de seguridad y reduciendo la complejidad de implementación  
- **Seguridad en la Capa de Transporte**: Soporte mejorado para mecanismos de transporte seguro con patrones apropiados de autenticación tanto para conexiones locales (STDIO) como remotas (HTTP Streamable)

## Seguridad en Autenticación y Autorización

### Desafíos Actuales de Seguridad

Las implementaciones modernas de MCP enfrentan varios desafíos en autenticación y autorización:

### Riesgos y Vectores de Amenaza

- **Lógica de Autorización Mal Configurada**: Implementación defectuosa en servidores MCP puede exponer datos sensibles y aplicar controles de acceso incorrectamente  
- **Compromiso de Tokens OAuth**: Robo de tokens en servidores MCP locales permite a atacantes suplantar servidores y acceder a servicios descendentes  
- **Vulnerabilidades de Paso de Tokens**: Manejo inapropiado de tokens crea bypasses de controles de seguridad y brechas en la rendición de cuentas  
- **Permisos Excesivos**: Servidores MCP con privilegios excesivos violan el principio de mínimo privilegio y amplían la superficie de ataque

#### Paso de Tokens: Un Anti-Patrón Crítico

El **paso de tokens está explícitamente prohibido** en la especificación actual de autorización MCP debido a severas implicaciones de seguridad:

##### Circunvención de Controles de Seguridad
- Servidores MCP y APIs descendentes implementan controles críticos (limitación de tasa, validación de solicitudes, monitoreo de tráfico) que dependen de la validación correcta de tokens  
- Uso directo de tokens cliente a API omite estas protecciones esenciales, minando la arquitectura de seguridad

##### Desafíos en Rendición de Cuentas y Auditoría  
- Servidores MCP no pueden distinguir entre clientes usando tokens emitidos aguas arriba, rompiendo rastros de auditoría  
- Los registros del servidor de recursos muestran orígenes de solicitudes engañosos en lugar de los intermediarios MCP reales  
- La investigación de incidentes y auditoría de cumplimiento se complican significativamente

##### Riesgos de Exfiltración de Datos
- Reclamaciones de tokens no validadas permiten a actores maliciosos con tokens robados usar servidores MCP como proxies para exfiltración de datos  
- Violaciones en límites de confianza permiten patrones de acceso no autorizados que evaden controles de seguridad previstos

##### Vectores de Ataque Multi-Servicio
- Tokens comprometidos aceptados por múltiples servicios permiten movimientos laterales a través de sistemas conectados  
- Suposiciones de confianza entre servicios pueden violarse si no se puede verificar el origen de tokens

### Controles y Mitigaciones de Seguridad

**Requisitos Críticos de Seguridad:**

> **OBLIGATORIO**: Los servidores MCP **NO DEBEN** aceptar ningún token que no haya sido emitido explícitamente para el servidor MCP

#### Controles de Autenticación y Autorización

- **Revisión Exhaustiva de Autorización**: Realizar auditorías completas de la lógica de autorización para asegurar que sólo los usuarios y clientes previstos puedan acceder a recursos sensibles  
  - **Guía de Implementación**: [Azure API Management como puerta de autenticación para servidores MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)  
  - **Integración de Identidad**: [Uso de Microsoft Entra ID para autenticación de servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestión Segura de Tokens**: Implementar las [mejores prácticas de validación y ciclo de vida de tokens de Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)  
  - Validar que los claims de audiencia del token coincidan con la identidad del servidor MCP  
  - Implementar rotación y políticas de expiración adecuadas  
  - Prevenir ataques de repetición y uso no autorizado de tokens

- **Almacenamiento Protegido de Tokens**: Asegurar almacenamiento de tokens cifrados en reposo y en tránsito  
  - **Mejores Prácticas**: [Guía de almacenamiento y cifrado seguro de tokens](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Implementación de Control de Acceso

- **Principio de Mínimo Privilegio**: Otorgar a servidores MCP sólo los permisos mínimos necesarios para la funcionalidad prevista  
  - Revisiones regulares de permisos para evitar acumulación excesiva  
  - **Documentación Microsoft**: [Acceso seguro con mínimo privilegio](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Control de Acceso Basado en Roles (RBAC)**: Implementar asignaciones granulares de roles  
  - Limitar el alcance de roles a recursos y acciones específicas  
  - Evitar permisos amplios o innecesarios que amplían la superficie de ataque

- **Monitoreo Continuo de Permisos**: Implementar auditorías y monitoreo de acceso en curso  
  - Vigilar patrones de uso de permisos para detectar anomalías  
  - Remediar rápidamente privilegios excesivos o no usados

## Amenazas de Seguridad Específicas de IA

### Ataques de Inyección de Prompts y Manipulación de Herramientas

Las implementaciones modernas de MCP enfrentan vectores de ataque sofisticados específicos de IA que las medidas tradicionales de seguridad no pueden cubrir completamente:

#### **Inyección Indirecta de Prompts (Inyección de Prompts entre Dominios)**

La **Inyección Indirecta de Prompts** representa una de las vulnerabilidades críticas en sistemas de IA habilitados para MCP. Los atacantes incrustan instrucciones maliciosas dentro de contenido externo—documentos, páginas web, correos electrónicos o fuentes de datos—que los sistemas de IA luego procesan como comandos legítimos.

**Escenarios de Ataque:**  
- **Inyección basada en documentos**: Instrucciones maliciosas ocultas en documentos procesados que disparan acciones no deseadas de la IA  
- **Explotación de contenido web**: Páginas web comprometidas que contienen prompts incrustados que manipulan el comportamiento de la IA al ser raspadas  
- **Ataques por correo electrónico**: Prompts maliciosos en emails que hacen que asistentes IA filtren información o ejecuten acciones no autorizadas  
- **Contaminación de fuentes de datos**: Bases de datos o APIs comprometidas que sirven contenido contaminado a sistemas de IA

**Impacto Real**: Estos ataques pueden resultar en exfiltración de datos, brechas de privacidad, generación de contenido dañino y manipulación de interacciones de usuario. Para un análisis detallado, consulta [Inyección de Prompts en MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Diagrama de Ataque por Inyección de Prompts](../../../translated_images/es/prompt-injection.ed9fbfde297ca877.webp)

#### **Ataques de Envenenamiento de Herramientas**

El **Envenenamiento de Herramientas** ataca los metadatos que definen las herramientas MCP, explotando cómo los LLM interpretan descripciones y parámetros de herramientas para tomar decisiones de ejecución.

**Mecanismos de Ataque:**  
- **Manipulación de metadatos**: Atacantes inyectan instrucciones maliciosas en descripciones de herramientas, definiciones de parámetros o ejemplos de uso  
- **Instrucciones invisibles**: Prompts ocultos en metadatos de herramientas que son procesados por modelos de IA pero invisibles a usuarios humanos  
- **Modificación dinámica de herramientas ("Rug Pulls")**: Herramientas aprobadas por usuarios que son modificadas después para realizar acciones maliciosas sin conocimiento del usuario  
- **Inyección de parámetros**: Contenido malicioso incrustado en esquemas de parámetros de herramientas que influye en el comportamiento del modelo

**Riesgos en Servidores Alojados**: Servidores MCP remotos presentan riesgos elevados porque las definiciones de herramientas pueden actualizarse tras aprobación inicial del usuario, creando escenarios donde herramientas previamente seguras se vuelven maliciosas. Para análisis exhaustivo, consulta [Ataques de Envenenamiento de Herramientas (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Diagrama de Ataque por Inyección de Herramientas](../../../translated_images/es/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vectores Adicionales de Ataques de IA**

- **Inyección de Prompts entre Dominios (XPIA)**: Ataques sofisticados que aprovechan contenido de múltiples dominios para eludir controles de seguridad
- **Modificación Dinámica de Capacidades**: Cambios en tiempo real en las capacidades de las herramientas que escapan a las evaluaciones de seguridad iniciales  
- **Envenenamiento de la Ventana de Contexto**: Ataques que manipulan ventanas de contexto grandes para ocultar instrucciones maliciosas  
- **Ataques de Confusión del Modelo**: Explotación de limitaciones del modelo para crear comportamientos impredecibles o inseguros  


### Impacto de Riesgos de Seguridad en IA

**Consecuencias de Alto Impacto:**  
- **Exfiltración de Datos**: Acceso no autorizado y robo de datos confidenciales empresariales o personales  
- **Violaciones de Privacidad**: Exposición de información personal identificable (PII) y datos comerciales confidenciales  
- **Manipulación del Sistema**: Modificaciones no intencionadas en sistemas y flujos de trabajo críticos  
- **Robo de Credenciales**: Compromiso de tokens de autenticación y credenciales de servicio  
- **Movimiento Lateral**: Uso de sistemas de IA comprometidos como pivotes para ataques más amplios en la red  

### Soluciones de Seguridad de IA de Microsoft

#### **AI Prompt Shields: Protección Avanzada Contra Ataques de Inyección**

Microsoft **AI Prompt Shields** proporciona defensa integral contra ataques de inyección en prompts, tanto directos como indirectos, mediante múltiples capas de seguridad:

##### **Mecanismos de Protección Central:**

1. **Detección y Filtrado Avanzados**  
   - Algoritmos de aprendizaje automático y técnicas de PLN que detectan instrucciones maliciosas en contenido externo  
   - Análisis en tiempo real de documentos, páginas web, correos electrónicos y fuentes de datos para amenazas embebidas  
   - Comprensión contextual de patrones legítimos versus maliciosos en prompts

2. **Técnicas de Spotlighting**  
   - Distingue entre instrucciones de sistema confiables e inputs externos potencialmente comprometidos  
   - Métodos de transformación de texto que mejoran la relevancia del modelo mientras aíslan contenido malicioso  
   - Ayuda a los sistemas de IA a mantener una jerarquía de instrucciones adecuada e ignorar comandos inyectados

3. **Sistemas de Delimitadores y Marcas de Datos**  
   - Definición explícita de límites entre mensajes de sistema confiables y texto de entrada externa  
   - Marcadores especiales que resaltan los límites entre fuentes de datos confiables y no confiables  
   - Separación clara que previene confusión de instrucciones y ejecución no autorizada de comandos

4. **Inteligencia Continua de Amenazas**  
   - Microsoft monitorea continuamente patrones de ataque emergentes y actualiza las defensas  
   - Búsqueda proactiva de amenazas para nuevas técnicas de inyección y vectores de ataque  
   - Actualizaciones regulares del modelo de seguridad para mantener efectividad contra amenazas en evolución

5. **Integración con Azure Content Safety**  
   - Parte de la suite integral Azure AI Content Safety  
   - Detección adicional para intentos de jailbreak, contenido dañino y violaciones de políticas de seguridad  
   - Controles de seguridad unificados en todos los componentes de la aplicación de IA

**Recursos de Implementación**: [Documentación de Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/es/prompt-shield.ff5b95be76e9c78c.webp)


## Amenazas Avanzadas de Seguridad MCP

### Vulnerabilidades de Secuestro de Sesiones

El **secuestro de sesión** representa un vector de ataque crítico en implementaciones stateful de MCP, donde partes no autorizadas obtienen y abusan de identificadores de sesión legítimos para hacerse pasar por clientes y realizar acciones no autorizadas.

#### **Escenarios de Ataque y Riesgos**

- **Inyección de Prompt con Secuestro de Sesión**: Atacantes con IDs de sesión robados inyectan eventos maliciosos en servidores que comparten estado de sesión, potencialmente desencadenando acciones dañinas o accediendo a datos sensibles  
- **Suplantación Directa**: IDs de sesión robados permiten llamadas directas al servidor MCP que evaden autenticación, tratando al atacante como usuario legítimo  
- **Streams Reanudables Comprometidos**: Atacantes pueden terminar solicitudes prematuramente, causando que clientes legítimos reanuden con contenido potencialmente malicioso  

#### **Controles de Seguridad para la Gestión de Sesiones**

**Requisitos Críticos:**  
- **Verificación de Autorización**: Los servidores MCP que implementen autorización **DEBEN** verificar TODAS las solicitudes entrantes y **NO DEBEN** depender de sesiones para autenticación  
- **Generación Segura de Sesiones**: Uso de IDs de sesión no determinísticos y criptográficamente seguros, generados con generadores de números aleatorios seguros  
- **Vinculación Específica de Usuario**: Vincular IDs de sesión a información específica del usuario usando formatos como `<user_id>:<session_id>` para prevenir abuso entre usuarios  
- **Gestión del Ciclo de Vida de Sesiones**: Implementar expiración, rotación e invalidación adecuadas para limitar ventanas de vulnerabilidad  
- **Seguridad en el Transporte**: HTTPS obligatorio para toda comunicación para prevenir intercepción de IDs de sesión  

### Problema del Representante Confundido (Confused Deputy)

El **problema del representante confundido** ocurre cuando servidores MCP actúan como proxies de autenticación entre clientes y servicios de terceros, creando oportunidades para eludir autorizaciones mediante la explotación de IDs de cliente estáticos.

#### **Mecánicas de Ataque y Riesgos**

- **Evasión de Consentimiento Basada en Cookies**: La autenticación previa del usuario crea cookies de consentimiento que los atacantes explotan mediante solicitudes de autorización maliciosas con URIs de redireccionamiento manipuladas  
- **Robo de Código de Autorización**: Las cookies de consentimiento existentes pueden hacer que servidores de autorización omitan pantallas de consentimiento y redirijan códigos a endpoints controlados por el atacante  
- **Acceso No Autorizado a API**: Códigos de autorización robados permiten intercambio de tokens y suplantación de usuario sin aprobación explícita  

#### **Estrategias de Mitigación**

**Controles Obligatorios:**  
- **Requerimiento de Consentimiento Explícito**: Los servidores proxy MCP que usen IDs de cliente estáticos **DEBEN** obtener consentimiento del usuario para cada cliente registrado dinámicamente  
- **Implementación de Seguridad OAuth 2.1**: Seguir las mejores prácticas actuales de seguridad OAuth incluyendo PKCE para todas las solicitudes de autorización  
- **Validación Estricta de Cliente**: Implementar validación rigurosa de URIs de redireccionamiento e identificadores de cliente para prevenir explotación  

### Vulnerabilidades de Reenvío de Tokens

El **reenvío de tokens** representa un anti-patrón explícito donde servidores MCP aceptan tokens de cliente sin la validación adecuada y los reenvían a APIs descendentes, violando las especificaciones de autorización MCP.

#### **Implicaciones de Seguridad**

- **Circunvención de Control**: Uso directo de tokens de cliente a API evade controles críticos como limitación de tasa, validación y monitoreo  
- **Corrupción del Rastro de Auditoría**: Tokens emitidos upstream hacen imposible la identificación del cliente, rompiendo capacidades de investigación de incidentes  
- **Exfiltración de Datos Basada en Proxy**: Tokens no validados permiten que actores maliciosos usen servidores como proxies para acceso no autorizado a datos  
- **Violaciones de Límite de Confianza**: Las suposiciones de confianza de servicios downstream pueden ser violadas cuando no se puede verificar el origen del token  
- **Expansión de Ataques Multi-servicio**: Tokens comprometidos aceptados en múltiples servicios permiten movimiento lateral  

#### **Controles de Seguridad Requeridos**

**Requisitos Innegociables:**  
- **Validación de Tokens**: Servidores MCP **NO DEBEN** aceptar tokens no emitidos explícitamente para el servidor MCP  
- **Verificación de Audiencia**: Siempre validar que las declaraciones de audiencia del token coincidan con la identidad del servidor MCP  
- **Ciclo de Vida Adecuado de Tokens**: Implementar tokens de acceso de corta duración con prácticas seguras de rotación  


## Seguridad de la Cadena de Suministro para Sistemas de IA

La seguridad de la cadena de suministro ha evolucionado más allá de dependencias tradicionales de software para abarcar todo el ecosistema de IA. Las implementaciones modernas de MCP deben verificar y monitorear rigurosamente todos los componentes relacionados con IA, ya que cada uno introduce vulnerabilidades potenciales que podrían comprometer la integridad del sistema.

### Componentes Ampliados de la Cadena de Suministro de IA

**Dependencias Tradicionales de Software:**  
- Bibliotecas y frameworks de código abierto  
- Imágenes de contenedores y sistemas base  
- Herramientas de desarrollo y pipelines de construcción  
- Componentes y servicios de infraestructura  

**Elementos Específicos de la Cadena de Suministro de IA:**  
- **Modelos Fundamentales**: Modelos preentrenados de varios proveedores que requieren verificación de procedencia  
- **Servicios de Embedding**: Servicios externos de vectorización y búsqueda semántica  
- **Proveedores de Contexto**: Fuentes de datos, bases de conocimiento y repositorios de documentos  
- **APIs de Terceros**: Servicios externos de IA, pipelines de ML y endpoints de procesamiento de datos  
- **Artefactos de Modelos**: Pesos, configuraciones y variantes de modelos ajustados  
- **Fuentes de Datos para Entrenamiento**: Conjuntos de datos usados para entrenamiento y ajuste fino  

### Estrategia Integral de Seguridad de la Cadena de Suministro

#### **Verificación y Confianza de Componentes**  
- **Validación de Procedencia**: Verificar origen, licenciamiento e integridad de todos los componentes de IA antes de la integración  
- **Evaluación de Seguridad**: Realizar escaneos de vulnerabilidades y revisiones de seguridad para modelos, fuentes de datos y servicios de IA  
- **Análisis de Reputación**: Evaluar historial de seguridad y prácticas de proveedores de servicios de IA  
- **Verificación de Cumplimiento**: Asegurar que todos los componentes cumplan con requisitos organizacionales, de seguridad y regulatorios  

#### **Pipelines de Despliegue Seguros**  
- **Seguridad Automatizada CI/CD**: Integrar escaneo de seguridad a lo largo de pipelines de despliegue automatizados  
- **Integridad de Artefactos**: Implementar verificación criptográfica para todos los artefactos desplegados (código, modelos, configuraciones)  
- **Despliegue por Etapas**: Usar estrategias de despliegue progresivas con validación de seguridad en cada etapa  
- **Repositorios de Artefactos Confiables**: Desplegar solo desde registries y repositorios verificados y seguros  

#### **Monitoreo Continuo y Respuesta**  
- **Escaneo de Dependencias**: Monitoreo constante de vulnerabilidades para todas las dependencias de software y componentes de IA  
- **Monitoreo de Modelos**: Evaluación continua del comportamiento del modelo, deriva de rendimiento y anomalías de seguridad  
- **Seguimiento de Salud del Servicio**: Monitoreo de servicios externos de IA para disponibilidad, incidentes de seguridad y cambios de políticas  
- **Integración de Inteligencia de Amenazas**: Incorporar feeds de amenazas específicos para riesgos de seguridad en IA y ML  

#### **Control de Acceso y Mínimo Privilegio**  
- **Permisos a Nivel de Componente**: Restringir acceso a modelos, datos y servicios basado en necesidad de negocio  
- **Gestión de Cuentas de Servicio**: Implementar cuentas de servicio dedicadas con permisos mínimos necesarios  
- **Segmentación de Red**: Aislar componentes de IA y limitar acceso de red entre servicios  
- **Controles de API Gateway**: Usar gateways de API centralizadas para controlar y monitorear acceso a servicios externos de IA  

#### **Respuesta a Incidentes y Recuperación**  
- **Procedimientos de Respuesta Rápida**: Procesos establecidos para parchear o reemplazar componentes de IA comprometidos  
- **Rotación de Credenciales**: Sistemas automáticos para rotar secretos, claves API y credenciales de servicio  
- **Capacidades de Reversión**: Habilidad para revertir rápidamente a versiones conocidas buenas de componentes de IA  
- **Recuperación de Brechas en Cadena de Suministro**: Procedimientos específicos para responder a compromisos de servicios de IA upstream  

### Herramientas e Integración de Seguridad de Microsoft

**GitHub Advanced Security** proporciona protección integral de la cadena de suministro incluyendo:  
- **Escaneo de Secretos**: Detección automática de credenciales, claves API y tokens en repositorios  
- **Escaneo de Dependencias**: Evaluación de vulnerabilidades para dependencias y bibliotecas open-source  
- **Análisis CodeQL**: Análisis estático de código para vulnerabilidades de seguridad y problemas de codificación  
- **Perspectivas de la Cadena de Suministro**: Visibilidad sobre salud y estado de seguridad de dependencias  

**Integración con Azure DevOps y Azure Repos:**  
- Integración fluida de escaneo de seguridad en plataformas de desarrollo Microsoft  
- Revisiones de seguridad automatizadas en Azure Pipelines para cargas de trabajo de IA  
- Aplicación de políticas para despliegue seguro de componentes de IA  

**Prácticas Internas de Microsoft:**  
Microsoft implementa prácticas de seguridad extensas en cadena de suministro para todos sus productos. Más información en [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Mejores Prácticas de Seguridad Fundamentales

Las implementaciones MCP heredan y construyen sobre la postura de seguridad existente de su organización. Fortalecer las prácticas de seguridad fundamentales mejora significativamente la seguridad global de sistemas de IA y despliegues MCP.

### Fundamentos Clave de Seguridad

#### **Prácticas Seguras de Desarrollo**  
- **Cumplimiento OWASP**: Protección contra vulnerabilidades web [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Protectores Específicos para IA**: Implementar controles para [OWASP Top 10 para LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Gestión Segura de Secretos**: Uso de vaults dedicados para tokens, claves API y datos de configuración sensibles  
- **Encriptación de Extremo a Extremo**: Comunicaciones seguras en todos los componentes y flujos de datos de la aplicación  
- **Validación de Entradas**: Validación rigurosa de todos los inputs de usuario, parámetros API y fuentes de datos  

#### **Endurecimiento de Infraestructura**  
- **Autenticación Multifactor (MFA)**: MFA obligatoria para todas las cuentas administrativas y de servicio  
- **Gestión de Parches**: Aplicación automatizada y oportuna de parches para sistemas operativos, frameworks y dependencias  
- **Integración de Proveedores de Identidad**: Gestión centralizada de identidad mediante proveedores empresariales (Microsoft Entra ID, Active Directory)  
- **Segmentación de Red**: Aislamiento lógico de componentes MCP para limitar potencial de movimiento lateral  
- **Principio de Mínimo Privilegio**: Permisos mínimos requeridos para todos los componentes y cuentas del sistema  

#### **Monitoreo y Detección de Seguridad**  
- **Registro Detallado (Logging)**: Registro detallado de actividades de aplicaciones IA, incluyendo interacciones cliente-servidor MCP  
- **Integración SIEM**: Gestión centralizada de eventos e información de seguridad para detección de anomalías  
- **Analítica de Comportamiento**: Monitoreo potenciado por IA para detectar patrones inusuales en comportamiento de sistema y usuarios  
- **Inteligencia de Amenazas**: Integración de feeds externos de amenazas e indicadores de compromiso (IOCs)  
- **Respuesta a Incidentes**: Procedimientos bien definidos para detección, respuesta y recuperación ante incidentes de seguridad  

#### **Arquitectura de Confianza Cero (Zero Trust)**  
- **Nunca Confiar, Siempre Verificar**: Verificación continua de usuarios, dispositivos y conexiones de red  
- **Microsegmentación**: Controles granulares de red que aíslan cargas de trabajo y servicios individuales  
- **Seguridad Centrada en Identidad**: Políticas de seguridad basadas en identidades verificadas, no en ubicación de red  
- **Evaluación Continua de Riesgos**: Evaluación dinámica de postura de seguridad basada en contexto y comportamiento actuales  
- **Acceso Condicional**: Controles de acceso que se adaptan según factores de riesgo, ubicación y confianza del dispositivo  

### Patrones de Integración Empresarial

#### **Integración en el Ecosistema de Seguridad Microsoft**  
- **Microsoft Defender for Cloud**: Gestión integral de postura de seguridad en la nube  
- **Azure Sentinel**: SIEM y SOAR nativos en la nube para protección de cargas de trabajo IA  
- **Microsoft Entra ID**: Gestión empresarial de identidad y acceso con políticas de acceso condicional  
- **Azure Key Vault**: Gestión centralizada de secretos con soporte de módulos de seguridad hardware (HSM)  
- **Microsoft Purview**: Gobernanza de datos y cumplimiento para fuentes de datos IA y flujos de trabajo  

#### **Cumplimiento y Gobernanza**  
- **Alineación Regulatoria**: Asegurar que implementaciones MCP cumplen con requisitos específicos de cumplimiento (GDPR, HIPAA, SOC 2)  
- **Clasificación de Datos**: Categorías y manejo correcto de datos sensibles procesados por sistemas IA  
- **Rastros de Auditoría**: Registro integral para cumplimiento regulatorio e investigación forense  
- **Controles de Privacidad**: Implementación de principios de privacidad por diseño en la arquitectura de sistemas IA  
- **Gestión de Cambios**: Procesos formales para revisiones de seguridad en modificaciones de sistemas IA  

Estas prácticas fundamentales crean una base robusta de seguridad que mejora la efectividad de los controles de seguridad específicos MCP y provee protección integral para aplicaciones impulsadas por IA.
## Puntos Clave de Seguridad

- **Enfoque de Seguridad en Capas**: Combine prácticas básicas de seguridad (codificación segura, privilegios mínimos, verificación de la cadena de suministro, monitoreo continuo) con controles específicos para IA para una protección integral

- **Paisaje de Amenazas Específicas de IA**: Los sistemas MCP enfrentan riesgos únicos que incluyen inyección de prompt, envenenamiento de herramientas, secuestro de sesión, problemas de agente confundido, vulnerabilidades de paso de tokens y permisos excesivos que requieren mitigaciones especializadas

- **Excelencia en Autenticación y Autorización**: Implemente una autenticación robusta usando proveedores de identidad externos (Microsoft Entra ID), haga cumplir la validación adecuada de tokens y nunca acepte tokens que no estén explícitamente emitidos para su servidor MCP

- **Prevención de Ataques de IA**: Despliegue Microsoft Prompt Shields y Azure Content Safety para defenderse contra ataques indirectos de inyección de prompt y envenenamiento de herramientas, mientras valida metadatos de herramientas y monitorea cambios dinámicos

- **Seguridad de Sesiones y Transporte**: Utilice IDs de sesión criptográficamente seguros y no deterministas vinculados a identidades de usuario, implemente una gestión adecuada del ciclo de vida de la sesión y nunca use sesiones para autenticación

- **Mejores Prácticas de Seguridad OAuth**: Prevenga ataques de agente confundido mediante consentimiento explícito del usuario para clientes registrados dinámicamente, implementación correcta de OAuth 2.1 con PKCE y validación estricta del URI de redirección

- **Principios de Seguridad de Tokens**: Evite patrones anti-paso de tokens, valide las claims de audiencia del token, implemente tokens de corta duración con rotación segura y mantenga límites de confianza claros

- **Seguridad Integral de la Cadena de Suministro**: Trate todos los componentes del ecosistema IA (modelos, embeddings, proveedores de contexto, APIs externas) con el mismo rigor de seguridad que las dependencias de software tradicionales

- **Evolución Continua**: Manténgase actualizado con las especificaciones MCP que evolucionan rápidamente, contribuya a los estándares de la comunidad de seguridad y mantenga posturas de seguridad adaptativas conforme el protocolo madura

- **Integración de Seguridad Microsoft**: Aproveche el ecosistema integral de seguridad de Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) para una mayor protección en el despliegue MCP

## Recursos Completo

### **Documentación Oficial de Seguridad MCP**
- [Especificación MCP (Actual: 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Mejores Prácticas de Seguridad MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Especificación de Autorización MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Repositorio MCP GitHub](https://github.com/modelcontextprotocol)

### **Recursos de Seguridad OWASP MCP**
- [Guía de Seguridad Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP completo con guía de implementación en Azure
- [Top 10 MCP OWASP](https://owasp.org/www-project-mcp-top-10/) - Riesgos oficiales de seguridad MCP de OWASP
- [Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Entrenamiento práctico de seguridad para MCP en Azure

### **Estándares y Mejores Prácticas de Seguridad**
- [Mejores Prácticas de Seguridad OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Top 10 OWASP de Seguridad en Aplicaciones Web](https://owasp.org/www-project-top-ten/)
- [Top 10 OWASP para Modelos de Lenguaje Grande](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Informe Microsoft de Defensa Digital](https://aka.ms/mddr)

### **Investigación y Análisis de Seguridad en IA**
- [Inyección de Prompt en MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Ataques de Envenenamiento de Herramientas (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Informe de Investigación de Seguridad MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Soluciones de Seguridad Microsoft**
- [Documentación Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Servicio Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Seguridad Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Mejores Prácticas en Gestión de Tokens Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guías e Implementaciones**
- [Azure API Management como Gateway de Autenticación MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Autenticación Microsoft Entra ID con Servidores MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Almacenamiento y Encriptación Segura de Tokens (Video)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps y Seguridad de la Cadena de Suministro**
- [Seguridad Azure DevOps](https://azure.microsoft.com/products/devops)
- [Seguridad Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Trayectoria de Seguridad en la Cadena de Suministro Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentación Adicional de Seguridad**

Para orientación de seguridad detallada, consulte estos documentos especializados en esta sección:

- **[Mejores Prácticas de Seguridad MCP 2025](./mcp-security-best-practices-2025.md)** - Mejores prácticas completas para implementaciones MCP
- **[Implementación Azure Content Safety](./azure-content-safety-implementation.md)** - Ejemplos prácticos para integración de Azure Content Safety  
- **[Controles de Seguridad MCP 2025](./mcp-security-controls-2025.md)** - Controles y técnicas de seguridad más recientes para despliegues MCP
- **[Referencia Rápida de Mejores Prácticas MCP](./mcp-best-practices.md)** - Guía rápida de prácticas esenciales de seguridad MCP

### **Entrenamiento Práctico en Seguridad**

- **[Taller MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Taller práctico completo para asegurar servidores MCP en Azure con campamentos progresivos desde Base Camp hasta Summit
- **[Guía de Seguridad Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Arquitectura de referencia y guía de implementación para todos los riesgos del Top 10 OWASP MCP

---

## Qué Sigue

Siguiente: [Capítulo 3: Primeros Pasos](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso legal**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda la traducción profesional realizada por un humano. No nos hacemos responsables de malentendidos o interpretaciones erróneas derivadas del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->