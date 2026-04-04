# MCP Conceptos Básicos: Dominando el Protocolo de Contexto del Modelo para la Integración de IA

[![MCP Conceptos Básicos](../../../translated_images/es/02.8203e26c6fb5a797.webp)](https://youtu.be/earDzWGtE84)

_(Haz clic en la imagen de arriba para ver el video de esta lección)_

El [Protocolo de Contexto del Modelo (MCP)](https://github.com/modelcontextprotocol) es un marco potente y estandarizado que optimiza la comunicación entre Modelos de Lenguaje Grandes (LLMs) y herramientas externas, aplicaciones y fuentes de datos.  
Esta guía te llevará a través de los conceptos básicos de MCP. Aprenderás sobre su arquitectura cliente-servidor, componentes esenciales, mecánicas de comunicación y mejores prácticas de implementación.

- **Consentimiento Explícito del Usuario**: Todo acceso a datos y operaciones requieren aprobación explícita del usuario antes de su ejecución. Los usuarios deben entender claramente qué datos serán accedidos y qué acciones se realizarán, con control granular sobre permisos y autorizaciones.

- **Protección de la Privacidad de los Datos**: Los datos del usuario solo se exponen con consentimiento explícito y deben protegerse con controles robustos de acceso durante todo el ciclo de vida de la interacción. Las implementaciones deben prevenir transmisión de datos no autorizada y mantener límites estrictos de privacidad.

- **Seguridad en la Ejecución de Herramientas**: Cada invocación de herramienta requiere consentimiento explícito del usuario con comprensión clara de la funcionalidad de la herramienta, parámetros e impacto potencial. Barreras de seguridad robustas deben prevenir ejecuciones accidentales, inseguras o maliciosas.

- **Seguridad en la Capa de Transporte**: Todos los canales de comunicación deben usar mecanismos adecuados de cifrado y autenticación. Las conexiones remotas deben implementar protocolos seguros de transporte y gestión adecuada de credenciales.

#### Lineamientos de Implementación:

- **Gestión de Permisos**: Implementar sistemas de permisos granulares que permitan a los usuarios controlar qué servidores, herramientas y recursos son accesibles  
- **Autenticación y Autorización**: Usar métodos seguros de autenticación (OAuth, claves API) con gestión adecuada de tokens y expiración  
- **Validación de Entradas**: Validar todos los parámetros y datos de entrada según esquemas definidos para prevenir ataques de inyección  
- **Registro de Auditoría**: Mantener registros completos de todas las operaciones para monitoreo de seguridad y cumplimiento  

## Visión General

Esta lección explora la arquitectura fundamental y los componentes que conforman el ecosistema del Protocolo de Contexto del Modelo (MCP). Aprenderás sobre la arquitectura cliente-servidor, componentes clave y mecanismos de comunicación que impulsan las interacciones MCP.

## Objetivos Clave de Aprendizaje

Al final de esta lección, podrás:

- Entender la arquitectura cliente-servidor de MCP.  
- Identificar roles y responsabilidades de Hosts, Clientes y Servidores.  
- Analizar las características centrales que hacen de MCP una capa de integración flexible.  
- Aprender cómo fluye la información dentro del ecosistema MCP.  
- Obtener conocimientos prácticos a través de ejemplos de código en .NET, Java, Python y JavaScript.

## Arquitectura MCP: Un Análisis Más Profundo

El ecosistema MCP se construye sobre un modelo cliente-servidor. Esta estructura modular permite a las aplicaciones de IA interactuar eficientemente con herramientas, bases de datos, API y recursos contextuales. Desglosemos esta arquitectura en sus componentes centrales.

En su núcleo, MCP sigue una arquitectura cliente-servidor donde una aplicación host puede conectarse a múltiples servidores:

```mermaid
flowchart LR
    subgraph "Tu Ordenador"
        Host["Anfitrión con MCP (Visual Studio, VS Code, IDEs, Herramientas)"]
        S1["Servidor MCP A"]
        S2["Servidor MCP B"]
        S3["Servidor MCP C"]
        Host <-->|"Protocolo MCP"| S1
        Host <-->|"Protocolo MCP"| S2
        Host <-->|"Protocolo MCP"| S3
        S1 <--> D1[("Fuente de Datos Local A")]
        S2 <--> D2[("Fuente de Datos Local B")]
    end
    subgraph "Internet"
        S3 <-->|"APIs Web"| D3[("Servicios Remotos")]
    end
```
- **Hosts MCP**: Programas como VSCode, Claude Desktop, IDEs o herramientas de IA que quieren acceder a datos mediante MCP  
- **Clientes MCP**: Clientes del protocolo que mantienen conexiones 1:1 con servidores  
- **Servidores MCP**: Programas ligeros que exponen capacidades específicas a través del Protocolo de Contexto del Modelo estandarizado  
- **Fuentes de Datos Locales**: Archivos, bases de datos y servicios de tu computadora que los servidores MCP pueden acceder de forma segura  
- **Servicios Remotos**: Sistemas externos accesibles por internet que los servidores MCP pueden conectar mediante APIs.

El Protocolo MCP es un estándar en evolución que usa versionado basado en fechas (formato AAAA-MM-DD). La versión actual del protocolo es **2025-11-25**. Puedes ver las actualizaciones más recientes en la [especificación del protocolo](https://modelcontextprotocol.io/specification/2025-11-25/)

### 1. Hosts

En el Protocolo de Contexto del Modelo (MCP), los **Hosts** son aplicaciones de IA que actúan como la interfaz principal por donde los usuarios interactúan con el protocolo. Los Hosts coordinan y gestionan conexiones a múltiples servidores MCP creando clientes MCP dedicados para cada conexión de servidor. Ejemplos de Hosts incluyen:

- **Aplicaciones de IA**: Claude Desktop, Visual Studio Code, Claude Code  
- **Entornos de Desarrollo**: IDEs y editores de código con integración MCP  
- **Aplicaciones Personalizadas**: Agentes y herramientas de IA creados a medida

Los **Hosts** son aplicaciones que coordinan las interacciones con modelos de IA. Ellos:

- **Orquestan Modelos de IA**: Ejecutan o interactúan con LLMs para generar respuestas y coordinar flujos de trabajo IA  
- **Gestionan Conexiones de Clientes**: Crean y mantienen un cliente MCP por cada conexión a servidor MCP  
- **Controlan la Interfaz de Usuario**: Manejan el flujo de conversaciones, interacciones y presentación de respuestas  
- **Imponen Seguridad**: Controlan permisos, restricciones de seguridad y autenticación  
- **Gestionan Consentimiento de Usuario**: Administran la aprobación del usuario para compartir datos y ejecutar herramientas

### 2. Clientes

Los **Clientes** son componentes esenciales que mantienen conexiones dedicadas uno a uno entre Hosts y servidores MCP. Cada cliente MCP es instanciado por el Host para conectarse a un servidor MCP específico, asegurando canales de comunicación organizados y seguros. Varios clientes permiten a los Hosts conectarse a múltiples servidores simultáneamente.

Los **Clientes** son componentes conectores dentro de la aplicación host. Ellos:

- **Comunicación del Protocolo**: Envian solicitudes JSON-RPC 2.0 a servidores con prompts e instrucciones  
- **Negociación de Capacidades**: Negocian características soportadas y versiones del protocolo con servidores durante la inicialización  
- **Ejecución de Herramientas**: Gestionan solicitudes de ejecución de herramientas de modelos y procesan respuestas  
- **Actualizaciones en Tiempo Real**: Manejan notificaciones y actualizaciones en tiempo real desde servidores  
- **Procesamiento de Respuestas**: Procesan y formatean respuestas del servidor para mostrar a los usuarios

### 3. Servidores

Los **Servidores** son programas que proveen contexto, herramientas y capacidades a clientes MCP. Pueden ejecutarse localmente (en la misma máquina que el Host) o remotamente (en plataformas externas) y son responsables de manejar solicitudes de clientes y proveer respuestas estructuradas. Los servidores exponen funcionalidades específicas a través del Protocolo de Contexto del Modelo estandarizado.

Los **Servidores** son servicios que proveen contexto y capacidades. Ellos:

- **Registro de Funcionalidades**: Registran y exponen primitivas disponibles (recursos, prompts, herramientas) a clientes  
- **Procesamiento de Solicitudes**: Reciben y ejecutan llamadas a herramientas, solicitudes de recursos y prompts desde clientes  
- **Provisión de Contexto**: Proveen información contextual y datos para mejorar respuestas del modelo  
- **Gestión de Estado**: Mantienen estado de sesión y manejan interacciones con estado cuando es necesario  
- **Notificaciones en Tiempo Real**: Envian notificaciones sobre cambios y actualizaciones de funcionalidades a clientes conectados

Cualquier persona puede desarrollar servidores para extender capacidades de modelo con funcionalidades especializadas, y soportan escenarios tanto locales como remotos.

### 4. Primitivas del Servidor

Los servidores en el Protocolo de Contexto del Modelo (MCP) proveen tres **primitivas** centrales que definen los bloques fundamentales para interacciones ricas entre clientes, hosts y modelos de lenguaje. Estas primitivas especifican los tipos de información contextual y acciones disponibles mediante el protocolo.

Los servidores MCP pueden exponer cualquier combinación de las siguientes tres primitivas centrales:

#### Recursos  

Los **Recursos** son fuentes de datos que proveen información contextual a aplicaciones de IA. Representan contenido estático o dinámico que puede mejorar la comprensión y toma de decisiones del modelo:

- **Datos Contextuales**: Información estructurada y contexto para consumo del modelo de IA  
- **Bases de Conocimiento**: Repositorios de documentos, artículos, manuales y trabajos de investigación  
- **Fuentes de Datos Locales**: Archivos, bases de datos e información local del sistema  
- **Datos Externos**: Respuestas API, servicios web y datos de sistemas remotos  
- **Contenido Dinámico**: Datos en tiempo real que se actualizan según condiciones externas

Los recursos se identifican por URIs y soportan descubrimiento mediante los métodos `resources/list` y recuperación via `resources/read`:

```text
file://documents/project-spec.md
database://production/users/schema
api://weather/current
```

#### Prompts

Los **Prompts** son plantillas reutilizables que ayudan a estructurar interacciones con modelos de lenguaje. Proveen patrones de interacción estandarizados y flujos de trabajo con plantillas:

- **Interacciones Basadas en Plantillas**: Mensajes pre-estructurados e iniciadores de conversación  
- **Plantillas de Flujo de Trabajo**: Secuencias estandarizadas para tareas e interacciones comunes  
- **Ejemplos Few-shot**: Plantillas basadas en ejemplos para instrucción del modelo  
- **Prompts del Sistema**: Prompts fundamentales que definen el comportamiento y contexto del modelo  
- **Plantillas Dinámicas**: Prompts parametrizados que se adaptan a contextos específicos

Los prompts soportan sustitución de variables y pueden descubrirse através de `prompts/list` y recuperarse con `prompts/get`:

```markdown
Generate a {{task_type}} for {{product}} targeting {{audience}} with the following requirements: {{requirements}}
```

#### Herramientas

Las **Herramientas** son funciones ejecutables que los modelos de IA pueden invocar para realizar acciones específicas. Representan los “verbos” del ecosistema MCP, permitiendo a los modelos interactuar con sistemas externos:

- **Funciones Ejecutables**: Operaciones discretas que modelos pueden invocar con parámetros específicos  
- **Integración con Sistemas Externos**: Llamadas API, consultas a bases de datos, operaciones con archivos, cálculos  
- **Identidad Única**: Cada herramienta tiene un nombre, descripción y esquema de parámetros distintivos  
- **E/S Estructurada**: Herramientas aceptan parámetros validados y retornan respuestas estructuradas y tipadas  
- **Capacidades de Acción**: Permiten a modelos realizar acciones reales y obtener datos en vivo

Las herramientas se definen con JSON Schema para validación de parámetros y se descubren mediante `tools/list` y se ejecutan vía `tools/call`. Las herramientas también pueden incluir **íconos** como metadatos adicionales para mejor presentación UI.

**Anotaciones de Herramientas**: Las herramientas soportan anotaciones de comportamiento (por ejemplo, `readOnlyHint`, `destructiveHint`) que describen si una herramienta es de solo lectura o destructiva, ayudando a los clientes a tomar decisiones informadas sobre su ejecución.

Ejemplo de definición de herramienta:

```typescript
server.tool(
  "search_products", 
  {
    query: z.string().describe("Search query for products"),
    category: z.string().optional().describe("Product category filter"),
    max_results: z.number().default(10).describe("Maximum results to return")
  }, 
  async (params) => {
    // Ejecutar búsqueda y devolver resultados estructurados
    return await productService.search(params);
  }
);
```

## Primitivas del Cliente

En el Protocolo de Contexto del Modelo (MCP), los **clientes** pueden exponer primitivas que permiten a los servidores solicitar capacidades adicionales a la aplicación host. Estas primitivas del lado cliente permiten implementaciones de servidor más ricas e interactivas que pueden acceder a capacidades del modelo IA y a interacciones de usuario.

### Sampling

El **Sampling** permite a los servidores solicitar completados de modelos de lenguaje desde la aplicación de IA del cliente. Esta primitiva permite a los servidores acceder a capacidades de LLM sin incorporar sus propias dependencias de modelo:

- **Acceso Independiente del Modelo**: Los servidores pueden solicitar completados sin incluir SDKs de LLM o gestionar acceso al modelo  
- **IA Iniciada por Servidor**: Permite a servidores generar contenido autónomamente usando el modelo IA del cliente  
- **Interacciones Recursivas LLM**: Soporta escenarios complejos donde servidores necesitan asistencia IA para procesamiento  
- **Generación Dinámica de Contenido**: Permite a los servidores crear respuestas contextuales usando el modelo del host  
- **Soporte para Llamadas a Herramientas**: Los servidores pueden incluir parámetros `tools` y `toolChoice` para habilitar que el modelo del cliente invoque herramientas durante el sampling

El sampling se inicia mediante el método `sampling/complete`, donde los servidores envían solicitudes de completado a los clientes.

### Roots

Las **Roots** proveen una manera estandarizada para que los clientes expongan límites del sistema de archivos a los servidores, ayudando a estos a entender qué directorios y archivos pueden acceder:

- **Límites del Sistema de Archivos**: Definen los límites donde los servidores pueden operar dentro del sistema de archivos  
- **Control de Acceso**: Ayudan a servidores a comprender qué directorios y archivos tienen permiso para acceder  
- **Actualizaciones Dinámicas**: Los clientes pueden notificar a servidores cuando la lista de roots cambia  
- **Identificación basada en URI**: Roots usan URIs `file://` para identificar directorios y archivos accesibles

Las roots se descubren mediante el método `roots/list`, con clientes enviando `notifications/roots/list_changed` cuando las roots cambian.

### Elicitation  

La **Elicitation** permite a los servidores solicitar información adicional o confirmación de los usuarios a través de la interfaz cliente:

- **Solicitudes de Entrada de Usuario**: Los servidores pueden pedir datos adicionales cuando sea necesario para ejecutar herramientas  
- **Diálogos de Confirmación**: Solicitan aprobación del usuario para operaciones sensibles o de impacto  
- **Flujos de Trabajo Interactivos**: Permiten a servidores crear interacciones paso a paso con usuarios  
- **Recolección Dinámica de Parámetros**: Recogen parámetros faltantes u opcionales durante ejecución de herramientas

Las solicitudes de elicitation se hacen usando el método `elicitation/request` para recopilar entradas de usuario a través de la interfaz cliente.

**Modo URL para Elicitation**: Los servidores también pueden solicitar interacciones con el usuario basadas en URL, permitiendo dirigir usuarios a páginas web externas para autenticación, confirmación o entrada de datos.

### Logging

El **Logging** permite a los servidores enviar mensajes de registro estructurados a los clientes para depuración, monitoreo y visibilidad operativa:

- **Soporte para Depuración**: Permite a servidores proveer registros detallados de ejecución para solución de problemas  
- **Monitoreo Operacional**: Envía actualizaciones de estado y métricas de rendimiento a clientes  
- **Reporte de Errores**: Provee contexto de errores y información diagnóstica detallada  
- **Trazas de Auditoría**: Crea registros completos de operaciones y decisiones del servidor

Los mensajes de logging se envían a clientes para proveer transparencia en operaciones del servidor y facilitar la depuración.

## Flujo de Información en MCP

El Protocolo de Contexto del Modelo (MCP) define un flujo estructurado de información entre hosts, clientes, servidores y modelos. Entender este flujo ayuda a clarificar cómo se procesan las solicitudes del usuario y cómo las herramientas y datos externos se integran en las respuestas del modelo.
- **El host inicia la conexión**  
  La aplicación host (como un IDE o una interfaz de chat) establece una conexión con un servidor MCP, típicamente a través de STDIO, WebSocket u otro transporte soportado.

- **Negociación de capacidades**  
  El cliente (incrustado en el host) y el servidor intercambian información sobre las características, herramientas, recursos y versiones de protocolo que soportan. Esto asegura que ambas partes entiendan qué capacidades están disponibles para la sesión.

- **Solicitud del usuario**  
  El usuario interactúa con el host (por ejemplo, introduce una indicación o comando). El host recopila esta entrada y la pasa al cliente para su procesamiento.

- **Uso de recursos o herramientas**  
  - El cliente puede solicitar contexto o recursos adicionales al servidor (como archivos, entradas de base de datos o artículos de una base de conocimiento) para enriquecer la comprensión del modelo.  
  - Si el modelo determina que se necesita una herramienta (por ejemplo, para obtener datos, realizar un cálculo o llamar a una API), el cliente envía una solicitud de invocación de herramienta al servidor, especificando el nombre de la herramienta y los parámetros.

- **Ejecución en el servidor**  
  El servidor recibe la solicitud de recurso o herramienta, ejecuta las operaciones necesarias (como ejecutar una función, consultar una base de datos o recuperar un archivo) y devuelve los resultados al cliente en un formato estructurado.

- **Generación de la respuesta**  
  El cliente integra las respuestas del servidor (datos de recursos, salidas de herramientas, etc.) en la interacción continua con el modelo. El modelo utiliza esta información para generar una respuesta completa y contextualmente relevante.

- **Presentación del resultado**  
  El host recibe la salida final del cliente y la presenta al usuario, a menudo incluyendo tanto el texto generado por el modelo como los resultados de las ejecuciones de herramientas o consultas a recursos.

Este flujo permite que MCP soporte aplicaciones de IA avanzadas, interactivas y conscientes del contexto al conectar sin problemas modelos con herramientas externas y fuentes de datos.

## Arquitectura y capas del protocolo

MCP consiste en dos capas arquitectónicas distintas que trabajan juntas para proporcionar un marco completo de comunicación:

### Capa de datos

La **Capa de Datos** implementa el protocolo principal MCP usando **JSON-RPC 2.0** como base. Esta capa define la estructura del mensaje, la semántica y los patrones de interacción:

#### Componentes principales:

- **Protocolo JSON-RPC 2.0**: Toda la comunicación usa el formato estándar JSON-RPC 2.0 para llamadas a métodos, respuestas y notificaciones  
- **Gestión del ciclo de vida**: Maneja la inicialización de la conexión, la negociación de capacidades y la terminación de la sesión entre clientes y servidores  
- **Primitivas del servidor**: Permite a los servidores proveer funcionalidad básica a través de herramientas, recursos e indicaciones  
- **Primitivas del cliente**: Permite a los servidores solicitar muestras de LLMs, obtener entradas de usuario y enviar mensajes de registro  
- **Notificaciones en tiempo real**: Soporta notificaciones asíncronas para actualizaciones dinámicas sin sondeo

#### Características clave:

- **Negociación de versión del protocolo**: Usa versionado basado en fechas (AAAA-MM-DD) para garantizar compatibilidad  
- **Descubrimiento de capacidades**: Clientes y servidores intercambian información sobre las características soportadas durante la inicialización  
- **Sesiones con estado**: Mantiene el estado de la conexión a través de múltiples interacciones para continuidad del contexto

### Capa de transporte

La **Capa de Transporte** gestiona los canales de comunicación, el enmarcado de mensajes y la autenticación entre los participantes MCP:

#### Mecanismos de transporte soportados:

1. **Transporte STDIO**:
   - Usa flujos estándar de entrada/salida para comunicación directa entre procesos  
   - Óptimo para procesos locales en la misma máquina sin sobrecarga de red  
   - Uso común para implementaciones locales de servidores MCP

2. **Transporte HTTP transmitible**:
   - Usa HTTP POST para mensajes de cliente a servidor  
   - Opcionalmente Server-Sent Events (SSE) para transmisión de servidor a cliente  
   - Permite comunicación con servidores remotos a través de redes  
   - Soporta autenticación HTTP estándar (tokens bearer, claves API, encabezados personalizados)  
   - MCP recomienda OAuth para autenticación segura basada en tokens

#### Abstracción del transporte:

La capa de transporte abstrae los detalles de comunicación de la capa de datos, permitiendo usar el mismo formato de mensaje JSON-RPC 2.0 en todos los mecanismos de transporte. Esta abstracción permite a las aplicaciones cambiar sin problemas entre servidores locales y remotos.

### Consideraciones de seguridad

Las implementaciones MCP deben adherirse a varios principios críticos de seguridad para garantizar interacciones seguras, confiables y protegidas en todas las operaciones del protocolo:

- **Consentimiento y control del usuario**: Los usuarios deben proporcionar consentimiento explícito antes de que se acceda a cualquier dato o se realicen operaciones. Deben tener control claro sobre qué datos se comparten y qué acciones se autorizan, apoyado por interfaces intuitivas para revisar y aprobar actividades.

- **Privacidad de datos**: Los datos del usuario solo deben exponerse con consentimiento explícito y deben protegerse con controles de acceso apropiados. Las implementaciones MCP deben proteger contra transmisiones no autorizadas y garantizar que la privacidad se mantenga durante todas las interacciones.

- **Seguridad de herramientas**: Antes de invocar cualquier herramienta se requiere consentimiento explícito del usuario. Los usuarios deben comprender claramente la funcionalidad de cada herramienta y establecer límites de seguridad robustos para prevenir ejecuciones no deseadas o inseguras.

Siguiendo estos principios de seguridad, MCP garantiza que la confianza, privacidad y seguridad del usuario se mantengan en todas las interacciones del protocolo a la vez que permite integraciones potentes de IA.

## Ejemplos de código: Componentes clave

A continuación se presentan ejemplos de código en varios lenguajes populares que ilustran cómo implementar componentes clave del servidor MCP y herramientas.

### Ejemplo .NET: Creación de un servidor MCP simple con herramientas

Aquí un ejemplo práctico en .NET que demuestra cómo implementar un servidor MCP simple con herramientas personalizadas. Este ejemplo muestra cómo definir y registrar herramientas, manejar solicitudes y conectar el servidor usando el Model Context Protocol.

```csharp
using System;
using System.Threading.Tasks;
using ModelContextProtocol.Server;
using ModelContextProtocol.Server.Transport;
using ModelContextProtocol.Server.Tools;

public class WeatherServer
{
    public static async Task Main(string[] args)
    {
        // Create an MCP server
        var server = new McpServer(
            name: "Weather MCP Server",
            version: "1.0.0"
        );
        
        // Register our custom weather tool
        server.AddTool<string, WeatherData>("weatherTool", 
            description: "Gets current weather for a location",
            execute: async (location) => {
                // Call weather API (simplified)
                var weatherData = await GetWeatherDataAsync(location);
                return weatherData;
            });
        
        // Connect the server using stdio transport
        var transport = new StdioServerTransport();
        await server.ConnectAsync(transport);
        
        Console.WriteLine("Weather MCP Server started");
        
        // Keep the server running until process is terminated
        await Task.Delay(-1);
    }
    
    private static async Task<WeatherData> GetWeatherDataAsync(string location)
    {
        // This would normally call a weather API
        // Simplified for demonstration
        await Task.Delay(100); // Simulate API call
        return new WeatherData { 
            Temperature = 72.5,
            Conditions = "Sunny",
            Location = location
        };
    }
}

public class WeatherData
{
    public double Temperature { get; set; }
    public string Conditions { get; set; }
    public string Location { get; set; }
}
```

### Ejemplo Java: Componentes de servidor MCP

Este ejemplo demuestra el mismo servidor MCP y registro de herramientas que el ejemplo de .NET anterior, pero implementado en Java.

```java
import io.modelcontextprotocol.server.McpServer;
import io.modelcontextprotocol.server.McpToolDefinition;
import io.modelcontextprotocol.server.transport.StdioServerTransport;
import io.modelcontextprotocol.server.tool.ToolExecutionContext;
import io.modelcontextprotocol.server.tool.ToolResponse;

public class WeatherMcpServer {
    public static void main(String[] args) throws Exception {
        // Crear un servidor MCP
        McpServer server = McpServer.builder()
            .name("Weather MCP Server")
            .version("1.0.0")
            .build();
            
        // Registrar una herramienta de clima
        server.registerTool(McpToolDefinition.builder("weatherTool")
            .description("Gets current weather for a location")
            .parameter("location", String.class)
            .execute((ToolExecutionContext ctx) -> {
                String location = ctx.getParameter("location", String.class);
                
                // Obtener datos del clima (simplificado)
                WeatherData data = getWeatherData(location);
                
                // Devolver respuesta formateada
                return ToolResponse.content(
                    String.format("Temperature: %.1f°F, Conditions: %s, Location: %s", 
                    data.getTemperature(), 
                    data.getConditions(), 
                    data.getLocation())
                );
            })
            .build());
        
        // Conectar el servidor usando transporte stdio
        try (StdioServerTransport transport = new StdioServerTransport()) {
            server.connect(transport);
            System.out.println("Weather MCP Server started");
            // Mantener el servidor en ejecución hasta que el proceso termine
            Thread.currentThread().join();
        }
    }
    
    private static WeatherData getWeatherData(String location) {
        // La implementación llamaría a una API del clima
        // Simplificado para fines de ejemplo
        return new WeatherData(72.5, "Sunny", location);
    }
}

class WeatherData {
    private double temperature;
    private String conditions;
    private String location;
    
    public WeatherData(double temperature, String conditions, String location) {
        this.temperature = temperature;
        this.conditions = conditions;
        this.location = location;
    }
    
    public double getTemperature() {
        return temperature;
    }
    
    public String getConditions() {
        return conditions;
    }
    
    public String getLocation() {
        return location;
    }
}
```

### Ejemplo Python: Construyendo un servidor MCP

Este ejemplo usa fastmcp, así que asegúrate de instalarlo primero:

```python
pip install fastmcp
```
Ejemplo de código:

```python
#!/usr/bin/env python3
import asyncio
from fastmcp import FastMCP
from fastmcp.transports.stdio import serve_stdio

# Crear un servidor FastMCP
mcp = FastMCP(
    name="Weather MCP Server",
    version="1.0.0"
)

@mcp.tool()
def get_weather(location: str) -> dict:
    """Gets current weather for a location."""
    return {
        "temperature": 72.5,
        "conditions": "Sunny",
        "location": location
    }

# Enfoque alternativo utilizando una clase
class WeatherTools:
    @mcp.tool()
    def forecast(self, location: str, days: int = 1) -> dict:
        """Gets weather forecast for a location for the specified number of days."""
        return {
            "location": location,
            "forecast": [
                {"day": i+1, "temperature": 70 + i, "conditions": "Partly Cloudy"}
                for i in range(days)
            ]
        }

# Registrar herramientas de la clase
weather_tools = WeatherTools()

# Iniciar el servidor
if __name__ == "__main__":
    asyncio.run(serve_stdio(mcp))
```

### Ejemplo JavaScript: Creación de un servidor MCP

Este ejemplo muestra la creación de un servidor MCP en JavaScript y cómo registrar dos herramientas relacionadas con el clima.

```javascript
// Usando el SDK oficial del Protocolo de Contexto del Modelo
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod"; // Para la validación de parámetros

// Crear un servidor MCP
const server = new McpServer({
  name: "Weather MCP Server",
  version: "1.0.0"
});

// Definir una herramienta de clima
server.tool(
  "weatherTool",
  {
    location: z.string().describe("The location to get weather for")
  },
  async ({ location }) => {
    // Esto normalmente llamaría a una API de clima
    // Simplificado para demostración
    const weatherData = await getWeatherData(location);
    
    return {
      content: [
        { 
          type: "text", 
          text: `Temperature: ${weatherData.temperature}°F, Conditions: ${weatherData.conditions}, Location: ${weatherData.location}` 
        }
      ]
    };
  }
);

// Definir una herramienta de pronóstico
server.tool(
  "forecastTool",
  {
    location: z.string(),
    days: z.number().default(3).describe("Number of days for forecast")
  },
  async ({ location, days }) => {
    // Esto normalmente llamaría a una API de clima
    // Simplificado para demostración
    const forecast = await getForecastData(location, days);
    
    return {
      content: [
        { 
          type: "text", 
          text: `${days}-day forecast for ${location}: ${JSON.stringify(forecast)}` 
        }
      ]
    };
  }
);

// Funciones auxiliares
async function getWeatherData(location) {
  // Simular llamada a la API
  return {
    temperature: 72.5,
    conditions: "Sunny",
    location: location
  };
}

async function getForecastData(location, days) {
  // Simular llamada a la API
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    temperature: 70 + Math.floor(Math.random() * 10),
    conditions: i % 2 === 0 ? "Sunny" : "Partly Cloudy"
  }));
}

// Conectar el servidor utilizando transporte stdio
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);

console.log("Weather MCP Server started");
```

Este ejemplo en JavaScript demuestra cómo crear un servidor MCP usando el SDK del Model Context Protocol. Muestra cómo registrar dos herramientas llamadas `weatherTool` y `forecastTool` y ponerlas disponibles para clientes MCP a través de `StdioServerTransport`.

## Seguridad y autorización

MCP incluye varios conceptos y mecanismos incorporados para gestionar la seguridad y la autorización a lo largo del protocolo:

1. **Control de permisos de herramientas**:  
  Los clientes pueden especificar qué herramientas un modelo puede usar durante una sesión. Esto asegura que solo las herramientas explícitamente autorizadas sean accesibles, reduciendo el riesgo de operaciones no deseadas o inseguras. Los permisos pueden configurarse dinámicamente según las preferencias del usuario, políticas organizativas o el contexto de la interacción.

2. **Autenticación**:  
  Los servidores pueden requerir autenticación antes de conceder acceso a herramientas, recursos u operaciones sensibles. Esto puede involucrar claves API, tokens OAuth u otros esquemas de autenticación. La autentificación adecuada asegura que solo clientes y usuarios confiables puedan invocar capacidades del servidor.

3. **Validación**:  
  Se aplica validación de parámetros para todas las invocaciones de herramientas. Cada herramienta define los tipos, formatos y restricciones esperados para sus parámetros, y el servidor valida las solicitudes entrantes en consecuencia. Esto previene que entradas malformadas o maliciosas lleguen a las implementaciones de herramientas y ayuda a mantener la integridad de las operaciones.

4. **Limitación de tasa**:  
  Para prevenir abusos y asegurar un uso justo de los recursos del servidor, los servidores MCP pueden implementar limitación de tasa para las llamadas a herramientas y acceso a recursos. Los límites pueden aplicarse por usuario, sesión o globalmente, y ayudan a proteger contra ataques de denegación de servicio o consumo excesivo de recursos.

Combinando estos mecanismos, MCP proporciona una base segura para integrar modelos de lenguaje con herramientas externas y fuentes de datos, mientras que ofrece a usuarios y desarrolladores control granular sobre acceso y uso.

## Mensajes del protocolo y flujo de comunicación

La comunicación MCP usa mensajes estructurados **JSON-RPC 2.0** para facilitar interacciones claras y confiables entre hosts, clientes y servidores. El protocolo define patrones de mensaje específicos para diferentes tipos de operaciones:

### Tipos principales de mensaje:

#### **Mensajes de inicialización**
- Solicitud `initialize`: establece la conexión y negocia la versión del protocolo y capacidades  
- Respuesta `initialize`: confirma las características soportadas e información del servidor  
- `notifications/initialized`: indica que la inicialización está completa y la sesión está lista

#### **Mensajes de descubrimiento**
- Solicitud `tools/list`: descubre las herramientas disponibles en el servidor  
- Solicitud `resources/list`: lista los recursos disponibles (fuentes de datos)  
- Solicitud `prompts/list`: recupera las plantillas de indicaciones disponibles

#### **Mensajes de ejecución**  
- Solicitud `tools/call`: ejecuta una herramienta específica con parámetros proporcionados  
- Solicitud `resources/read`: recupera contenido de un recurso específico  
- Solicitud `prompts/get`: obtiene una plantilla de indicación con parámetros opcionales

#### **Mensajes del lado del cliente**
- Solicitud `sampling/complete`: el servidor solicita finalización de LLM al cliente  
- Solicitud `elicitation/request`: el servidor solicita entrada del usuario a través del cliente  
- Mensajes de registro: el servidor envía mensajes de registro estructurados al cliente

#### **Mensajes de notificación**
- `notifications/tools/list_changed`: notifica al cliente cambios en las herramientas  
- `notifications/resources/list_changed`: notifica al cliente cambios en los recursos  
- `notifications/prompts/list_changed`: notifica al cliente cambios en las indicaciones

### Estructura de mensajes:

Todos los mensajes MCP siguen el formato JSON-RPC 2.0 con:  
- **Mensajes de solicitud**: incluyen `id`, `method` y `params` opcional  
- **Mensajes de respuesta**: incluyen `id` y `result` o `error`  
- **Mensajes de notificación**: incluyen `method` y `params` opcional (sin `id` ni se espera respuesta)

Esta comunicación estructurada asegura interacciones confiables, rastreables y extensibles que soportan escenarios avanzados como actualizaciones en tiempo real, encadenado de herramientas y manejo robusto de errores.

### Tareas (experimental)

Las **tareas** son una característica experimental que provee envoltorios de ejecución duradera permitiendo recuperación diferida de resultados y seguimiento del estado para solicitudes MCP:

- Operaciones de larga duración: seguimiento de cálculos costosos, automatización de flujos de trabajo y procesamiento por lotes  
- Resultados diferidos: sondeo del estado de la tarea y recuperación de resultados cuando las operaciones se completan  
- Seguimiento de estado: monitoreo del progreso de la tarea mediante estados definidos en el ciclo de vida  
- Operaciones multi-paso: soporte para flujos de trabajo complejos que abarcan múltiples interacciones

Las tareas envuelven solicitudes MCP estándar para habilitar patrones de ejecución asíncrona para operaciones que no pueden completarse inmediatamente.

## Puntos clave

- **Arquitectura**: MCP usa una arquitectura cliente-servidor donde los hosts gestionan múltiples conexiones de clientes a servidores  
- **Participantes**: El ecosistema incluye hosts (aplicaciones de IA), clientes (conectores del protocolo) y servidores (proveedores de capacidades)  
- **Mecanismos de transporte**: La comunicación soporta STDIO (local) y HTTP transmitible con SSE opcional (remoto)  
- **Primitivas principales**: Los servidores exponen herramientas (funciones ejecutables), recursos (fuentes de datos) e indicaciones (plantillas)  
- **Primitivas del cliente**: Los servidores pueden solicitar muestreos (finalizaciones de LLM con soporte para llamadas a herramientas), solicitud de entrada (incluyendo modo URL), límites de sistema de archivos y registro desde clientes  
- **Características experimentales**: Las tareas ofrecen envoltorios duraderos para operaciones de larga duración  
- **Base del protocolo**: Construido sobre JSON-RPC 2.0 con versionado basado en fecha (actual: 2025-11-25)  
- **Capacidades en tiempo real**: Soporta notificaciones para actualizaciones dinámicas y sincronización en tiempo real  
- **Seguridad ante todo**: Consentimiento explícito de usuario, protección de privacidad de datos y transporte seguro son requisitos centrales

## Ejercicio

Diseña una herramienta MCP simple que sería útil en tu dominio. Define:  
1. Cómo se llamaría la herramienta  
2. Qué parámetros aceptaría  
3. Qué salida devolvería  
4. Cómo un modelo podría usar esta herramienta para resolver problemas de usuarios


---

## Qué sigue

Siguiente: [Capítulo 2: Seguridad](../02-Security/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional realizada por humanos. No nos hacemos responsables por malentendidos o interpretaciones erróneas derivadas del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->