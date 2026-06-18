# Introducción a la Integración de Bases de Datos MCP

## 🎯 Qué Cubre este Laboratorio

Este laboratorio introductorio ofrece una visión completa sobre la creación de servidores Model Context Protocol (MCP) con integración de bases de datos. Entenderás el caso de negocio, la arquitectura técnica y aplicaciones del mundo real a través del caso de uso de análisis de Zava Retail en https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail.

## Resumen

**Model Context Protocol (MCP)** permite que los asistentes de IA accedan e interactúen de forma segura con fuentes externas de datos en tiempo real. Combinado con la integración de bases de datos, MCP desbloquea potentes capacidades para aplicaciones de IA basadas en datos.

Esta ruta de aprendizaje te enseña a construir servidores MCP listos para producción que conectan asistentes de IA con datos de ventas minoristas mediante PostgreSQL, implementando patrones empresariales como Row Level Security, búsqueda semántica y acceso multi-inquilino a datos.

## Objetivos de Aprendizaje

Al finalizar este laboratorio, podrás:

- **Definir** el Model Context Protocol y sus beneficios clave para integración de bases de datos
- **Identificar** componentes principales de una arquitectura de servidor MCP con bases de datos
- **Comprender** el caso de uso de Zava Retail y sus requisitos de negocio
- **Reconocer** patrones empresariales para acceso seguro y escalable a bases de datos
- **Enumerar** las herramientas y tecnologías usadas a lo largo de esta ruta de aprendizaje

## 🧭 El Desafío: IA y Datos del Mundo Real

### Limitaciones Tradicionales de la IA

Los asistentes de IA modernos son increíblemente potentes, pero enfrentan limitaciones significativas cuando trabajan con datos empresariales reales:

| **Desafío** | **Descripción** | **Impacto en el Negocio** |
|-------------|-----------------|---------------------------|
| **Conocimiento Estático** | Los modelos de IA entrenados con datasets fijos no pueden acceder a datos empresariales actuales | Información desactualizada, oportunidades perdidas |
| **Silos de Datos** | Información encerrada en bases de datos, API y sistemas inalcanzables para IA | Análisis incompletos, flujos de trabajo fragmentados |
| **Restricciones de Seguridad** | El acceso directo a bases de datos genera preocupaciones de seguridad y cumplimiento | Despliegue limitado, preparación manual de datos |
| **Consultas Complejas** | Los usuarios de negocio necesitan conocimientos técnicos para obtener insights | Baja adopción, procesos ineficientes |

### La Solución MCP

Model Context Protocol aborda estos desafíos proporcionando:

- **Acceso a Datos en Tiempo Real**: Los asistentes de IA consultan bases de datos y API en vivo
- **Integración Segura**: Acceso controlado con autenticación y permisos
- **Interfaz en Lenguaje Natural**: Los usuarios de negocio hacen preguntas en lenguaje sencillo
- **Protocolo Estandarizado**: Funciona en diferentes plataformas y herramientas de IA

## 🏪 Conoce a Zava Retail: Nuestro Caso de Estudio de Aprendizaje https://github.com/microsoft/MCP-Server-and-PostgreSQL-Sample-Retail

A lo largo de esta ruta de aprendizaje, construiremos un servidor MCP para **Zava Retail**, una cadena ficticia de tiendas de bricolaje con múltiples ubicaciones. Este escenario realista demuestra la implementación MCP a nivel empresarial.

### Contexto Empresarial

**Zava Retail** opera:  
- **8 tiendas físicas** en el estado de Washington (Seattle, Bellevue, Tacoma, Spokane, Everett, Redmond, Kirkland)  
- **1 tienda en línea** para ventas e-commerce  
- **Catálogo diverso** que incluye herramientas, ferretería, suministros de jardín y materiales de construcción  
- **Gestión multinivel** con gerentes de tienda, gerentes regionales y ejecutivos

### Requisitos del Negocio

Gerentes de tienda y ejecutivos necesitan análisis impulsados por IA para:

1. **Analizar el desempeño de ventas** a través de tiendas y periodos de tiempo  
2. **Controlar niveles de inventario** e identificar necesidades de reposición  
3. **Entender el comportamiento de clientes** y patrones de compra  
4. **Descubrir insights de productos** mediante búsqueda semántica  
5. **Generar reportes** con consultas en lenguaje natural  
6. **Mantener la seguridad de los datos** con control de acceso basado en roles

### Requisitos Técnicos

El servidor MCP debe proporcionar:

- **Acceso a datos multi-inquilino** donde gerentes ven solo datos de su tienda  
- **Consultas flexibles** que soporten operaciones SQL complejas  
- **Búsqueda semántica** para descubrimiento y recomendaciones de productos  
- **Datos en tiempo real** reflejando el estado actual del negocio  
- **Autenticación segura** con seguridad a nivel fila  
- **Arquitectura escalable** que soporte múltiples usuarios concurrentes

## 🏗️ Visión General de la Arquitectura del Servidor MCP

Nuestro servidor MCP implementa una arquitectura en capas optimizada para integración de bases de datos:

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code AI Client                       │
│                  (Natural Language Queries)                │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/SSE
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │   Tool Layer    │ │  Security Layer │ │  Config Layer │ │
│  │                 │ │                 │ │               │ │
│  │ • Query Tools   │ │ • RLS Context   │ │ • Environment │ │
│  │ • Schema Tools  │ │ • User Identity │ │ • Connections │ │
│  │ • Search Tools  │ │ • Access Control│ │ • Validation  │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ asyncpg
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                PostgreSQL Database                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌───────────────┐ │
│  │  Retail Schema  │ │   RLS Policies  │ │   pgvector    │ │
│  │                 │ │                 │ │               │ │
│  │ • Stores        │ │ • Store-based   │ │ • Embeddings  │ │
│  │ • Customers     │ │   Isolation     │ │ • Similarity  │ │
│  │ • Products      │ │ • Role Control  │ │   Search      │ │
│  │ • Orders        │ │ • Audit Logs    │ │               │ │
│  └─────────────────┘ └─────────────────┘ └───────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  Azure OpenAI                              │
│               (Text Embeddings)                            │
└─────────────────────────────────────────────────────────────┘
```

### Componentes Clave

#### **1. Capa de Servidor MCP**
- **FastMCP Framework**: Implementación moderna en Python de servidor MCP  
- **Registro de Herramientas**: Definiciones declarativas de herramientas con seguridad de tipos  
- **Contexto de Solicitud**: Gestión de identidad de usuario y sesión  
- **Manejo de Errores**: Gestión robusta de errores y registro de eventos  

#### **2. Capa de Integración con Base de Datos**
- **Pool de Conexiones**: Gestión eficiente de conexiones asyncpg  
- **Proveedor de Esquema**: Descubrimiento dinámico de esquema de tablas  
- **Ejecutor de Consultas**: Ejecución segura de SQL con contexto RLS  
- **Gestión de Transacciones**: Cumplimiento ACID y manejo de rollback

#### **3. Capa de Seguridad**
- **Row Level Security**: Seguridad a nivel fila de PostgreSQL para aislamiento multi-inquilino  
- **Identidad de Usuario**: Autenticación y autorización para gerentes de tienda  
- **Control de Acceso**: Permisos granulados y auditorías  
- **Validación de Entrada**: Prevención de inyección SQL y validación de consultas  

#### **4. Capa de Mejora de IA**
- **Búsqueda Semántica**: Embeddings vectoriales para descubrimiento de productos  
- **Integración Azure OpenAI**: Generación de embeddings de texto  
- **Algoritmos de Similitud**: Búsqueda de similitud coseno con pgvector  
- **Optimización de Búsqueda**: Indexación y ajuste de rendimiento  

## 🔧 Stack Tecnológico

### Tecnologías Principales

| **Componente** | **Tecnología** | **Propósito** |
|---------------|----------------|---------------|
| **Framework MCP** | FastMCP (Python) | Implementación moderna de servidor MCP |
| **Base de Datos** | PostgreSQL 17 + pgvector | Datos relacionales con búsqueda vectorial |
| **Servicios IA** | Azure OpenAI | Embeddings de texto y modelos de lenguaje |
| **Contenerización** | Docker + Docker Compose | Entorno de desarrollo |
| **Plataforma Cloud** | Microsoft Azure | Despliegue en producción |
| **Integración IDE** | VS Code | Chat IA y flujo de desarrollo |

### Herramientas de Desarrollo

| **Herramienta** | **Propósito** |
|-----------------|---------------|
| **asyncpg** | Driver de alto rendimiento para PostgreSQL |
| **Pydantic** | Validación y serialización de datos |
| **Azure SDK** | Integración con servicios cloud |
| **pytest** | Framework de pruebas |
| **Docker** | Contenerización y despliegue |

### Stack de Producción

| **Servicio** | **Recurso Azure** | **Propósito** |
|--------------|-------------------|---------------|
| **Base de Datos** | Azure Database for PostgreSQL | Servicio de base de datos gestionada |
| **Contenedor** | Azure Container Apps | Hosting de contenedores serverless |
| **Servicios IA** | Microsoft Foundry | Modelos y endpoints OpenAI |
| **Monitoreo** | Application Insights | Observabilidad y diagnósticos |
| **Seguridad** | Azure Key Vault | Gestión de secretos y configuración |

## 🎬 Escenarios de Uso del Mundo Real

Exploramos cómo diferentes usuarios interactúan con nuestro servidor MCP:

### Escenario 1: Revisión de Desempeño del Gerente de Tienda

**Usuario**: Sarah, Gerente de la tienda Seattle  
**Objetivo**: Analizar el desempeño de ventas del último trimestre

**Consulta en Lenguaje Natural**:
> "Muéstrame los 10 productos con mayores ingresos para mi tienda en el Q4 2024"

**Qué ocurre**:
1. VS Code AI Chat envía la consulta al servidor MCP  
2. El servidor MCP identifica el contexto de la tienda de Sarah (Seattle)  
3. Políticas RLS filtran datos para la tienda de Seattle únicamente  
4. Se genera y ejecuta la consulta SQL  
5. Resultados se formatean y regresan a AI Chat  
6. IA provee análisis e insights  

### Escenario 2: Descubrimiento de Productos con Búsqueda Semántica

**Usuario**: Mike, Gerente de Inventario  
**Objetivo**: Encontrar productos similares a una solicitud de cliente

**Consulta en Lenguaje Natural**:
> "¿Qué productos vendemos que sean similares a 'conectores eléctricos impermeables para uso exterior'?"

**Qué ocurre**:
1. Consulta es procesada por la herramienta de búsqueda semántica  
2. Azure OpenAI genera el vector embedding  
3. pgvector realiza búsqueda por similitud  
4. Productos relacionados se clasifican por relevancia  
5. Resultados incluyen detalles y disponibilidad  
6. IA sugiere alternativas y oportunidades de paquetes  

### Escenario 3: Análisis Cruzado entre Tiendas

**Usuario**: Jennifer, Gerente Regional  
**Objetivo**: Comparar desempeño entre todas las tiendas

**Consulta en Lenguaje Natural**:
> "Compara las ventas por categoría para todas las tiendas en los últimos 6 meses"

**Qué ocurre**:
1. Se establece el contexto RLS para acceso de gerente regional  
2. Se genera consulta compleja multi-tiendas  
3. Datos se agregan a través de ubicaciones  
4. Resultados incluyen tendencias y comparaciones  
5. IA identifica insights y recomendaciones  

## 🔒 Profundización en Seguridad y Multi-inquilino

Nuestra implementación prioriza seguridad a nivel empresarial:

### Row Level Security (RLS)

PostgreSQL RLS garantiza aislamiento de datos:

```sql
-- Store managers see only their store's data
CREATE POLICY store_manager_policy ON retail.orders
  FOR ALL TO store_managers
  USING (store_id = get_current_user_store());

-- Regional managers see multiple stores
CREATE POLICY regional_manager_policy ON retail.orders
  FOR ALL TO regional_managers
  USING (store_id = ANY(get_user_store_list()));
```

### Gestión de Identidad de Usuario

Cada conexión MCP incluye:  
- **ID de Gerente de Tienda**: Identificador único para contexto RLS  
- **Asignación de Roles**: Permisos y niveles de acceso  
- **Gestión de Sesión**: Tokens de autenticación seguros  
- **Registro de Auditoría**: Historial completo de accesos  

### Protección de Datos

Múltiples capas de seguridad:  
- **Encriptación de Conexiones**: TLS para todas las conexiones a la base de datos  
- **Prevención de Inyección SQL**: Solo consultas parametrizadas  
- **Validación de Entradas**: Validación exhaustiva de solicitudes  
- **Manejo de Errores**: No se expone información sensible en mensajes de error  

## 🎯 Puntos Clave

Tras completar esta introducción, deberías entender:

✅ **Propuesta de Valor MCP**: Cómo MCP conecta asistentes IA con datos reales  
✅ **Contexto del Negocio**: Requisitos y desafíos de Zava Retail  
✅ **Resumen de Arquitectura**: Componentes clave e interacciones  
✅ **Stack Tecnológico**: Herramientas y frameworks usados  
✅ **Modelo de Seguridad**: Acceso multi-inquilino y protección  
✅ **Patrones de Uso**: Escenarios reales de consultas y flujos  

## 🚀 Qué Sigue

¿Listo para profundizar más? Continúa con:

**[Laboratorio 01: Conceptos Básicos de Arquitectura](../01-Architecture/README.md)**

Aprende sobre patrones de arquitectura de servidores MCP, principios de diseño de bases de datos y la implementación técnica detallada que impulsa nuestra solución analítica minorista.

## 📚 Recursos Adicionales

### Documentación MCP
- [Especificación MCP](https://modelcontextprotocol.io/docs/) - Documentación oficial del protocolo  
- [MCP para Principiantes](https://aka.ms/mcp-for-beginners) - Guía completa de aprendizaje MCP  
- [Documentación FastMCP](https://github.com/modelcontextprotocol/python-sdk) - Documentación del SDK para Python  

### Integración de Bases de Datos
- [Documentación PostgreSQL](https://www.postgresql.org/docs/) - Referencia completa de PostgreSQL  
- [Guía pgvector](https://github.com/pgvector/pgvector) - Documentación de la extensión vectorial  
- [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) - Guía RLS de PostgreSQL  

### Servicios Azure
- [Documentación Azure OpenAI](https://docs.microsoft.com/azure/cognitive-services/openai/) - Integración de servicios IA  
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/) - Servicio de base de datos gestionada  
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/) - Contenedores serverless  

---

**Descargo de responsabilidad**: Este es un ejercicio de aprendizaje con datos minoristas ficticios. Siempre sigue las políticas de gobernanza y seguridad de datos de tu organización al implementar soluciones similares en entornos de producción.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->