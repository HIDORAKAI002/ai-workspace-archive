# Uso avanzado del servidor

Hay dos tipos diferentes de servidores expuestos en el SDK de MCP, tu servidor normal y el servidor de bajo nivel. Normalmente, usarías el servidor regular para agregarle funciones. Sin embargo, en algunos casos, quieres confiar en el servidor de bajo nivel como por ejemplo:

- Mejor arquitectura. Es posible crear una arquitectura limpia con ambos, el servidor regular y un servidor de bajo nivel, pero se puede argumentar que es un poco más fácil con un servidor de bajo nivel.
- Disponibilidad de funciones. Algunas funciones avanzadas solo se pueden usar con un servidor de bajo nivel. Verás esto en capítulos posteriores cuando agreguemos muestreo y elicitación.

## Servidor regular vs servidor de bajo nivel

Así es como se ve la creación de un Servidor MCP con el servidor regular

**Python**

```python
mcp = FastMCP("Demo")

# Agregar una herramienta de suma
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b
```

**TypeScript**

```typescript
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Agregar una herramienta de suma
server.registerTool("add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);
```

La idea es que agregas explícitamente cada herramienta, recurso o aviso que quieres que tenga el servidor. No hay nada de malo en eso.

### Enfoque del servidor de bajo nivel

Sin embargo, cuando usas el enfoque del servidor de bajo nivel tienes que pensarlo de forma diferente. En lugar de registrar cada herramienta, creas dos manejadores por tipo de función (herramientas, recursos o avisos). Así que por ejemplo, las herramientas solo tienen dos funciones como estas:

- Listar todas las herramientas. Una función sería responsable de todos los intentos de listar herramientas.
- manejar las llamadas a todas las herramientas. Aquí también, solo hay una función que maneja las llamadas a una herramienta.

Eso suena como potencialmente menos trabajo, ¿verdad? Entonces, en lugar de registrar una herramienta, solo necesito asegurarme que la herramienta esté listada cuando liste todas las herramientas y que sea llamada cuando hay una solicitud entrante para llamar a una herramienta.

Veamos cómo se ve el código ahora:

**Python**

```python
@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """List available tools."""
    return [
        types.Tool(
            name="add",
            description="Add two numbers",
            inputSchema={
                "type": "object",
                "properties": {
                    "a": {"type": "number", "description": "number to add"}, 
                    "b": {"type": "number", "description": "number to add"}
                },
                "required": ["query"],
            },
        )
    ]
```

**TypeScript**

```typescript
server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Devuelve la lista de herramientas registradas
  return {
    tools: [{
        name="add",
        description="Add two numbers",
        inputSchema={
            "type": "object",
            "properties": {
                "a": {"type": "number", "description": "number to add"}, 
                "b": {"type": "number", "description": "number to add"}
            },
            "required": ["query"],
        }
    }]
  };
});
```

Aquí ahora tenemos una función que devuelve una lista de funciones. Cada entrada en la lista de herramientas ahora tiene campos como `name`, `description` y `inputSchema` para ajustarse al tipo de retorno. Esto nos permite poner nuestras herramientas y la definición de funciones en otro lugar. Ahora podemos crear todas nuestras herramientas en una carpeta tools y lo mismo aplica para todas tus funciones, así tu proyecto puede organizarse de la siguiente manera:

```text
app
--| tools
----| add
----| substract
--| resources
----| products
----| schemas
--| prompts
----| product-description
```

Eso es genial, nuestra arquitectura puede verse bastante limpia.

¿Y para llamar herramientas, es la misma idea entonces, un manejador para llamar una herramienta, cualquiera que sea? Sí, exactamente, aquí está el código para eso:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools es un diccionario con nombres de herramientas como claves
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

**TypeScript**

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if(!tool) {
        return {
            error: {
                code: "tool_not_found",
                message: `Tool ${name} not found.`
            }
       };
    }
    
    // args: request.params.arguments
    // TODO llamar a la herramienta,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Como puedes ver en el código de arriba, necesitamos extraer la herramienta a llamar, y con qué argumentos, y luego proceder a llamar la herramienta.

## Mejorando el enfoque con validación

Hasta ahora, has visto cómo todos tus registros para añadir herramientas, recursos y avisos pueden ser sustituidos por estos dos manejadores por tipo de función. ¿Qué más necesitamos hacer? Bueno, deberíamos añadir algún tipo de validación para asegurar que la herramienta sea llamada con los argumentos correctos. Cada entorno tiene su propia solución para esto, por ejemplo Python usa Pydantic y TypeScript usa Zod. La idea es que hagamos lo siguiente:

- Mover la lógica para crear una función (herramienta, recurso o aviso) a su carpeta dedicada.
- Añadir una forma de validar una solicitud entrante que por ejemplo pida llamar a una herramienta.

### Crear una función

Para crear una función, necesitaremos crear un archivo para esa función y asegurar que tiene los campos obligatorios requeridos de esa función. Ciertos campos difieren un poco entre herramientas, recursos y avisos.

**Python**

```python
# schema.py
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float

# add.py

from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validar la entrada usando el modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: agregar Pydantic, para que podamos crear un AddInputModel y validar los argumentos

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Aquí puedes ver cómo hacemos lo siguiente:

- Crear un esquema usando Pydantic `AddInputModel` con campos `a` y `b` en el archivo *schema.py*.
- Intentar analizar la solicitud entrante para que sea del tipo `AddInputModel`, si hay un desajuste en los parámetros esto fallará:

   ```python
   # add.py
    try:
        # Validar la entrada usando el modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Puedes elegir si poner esta lógica de análisis en la llamada a la herramienta misma o en la función del manejador.

**TypeScript**

```typescript
// server.ts
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { params: { name } } = request;
    let tool = tools.find(t => t.name === name);
    if (!tool) {
       return {
        error: {
            code: "tool_not_found",
            message: `Tool ${name} not found.`
        }
       };
    }
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);

       // @ts-ignore
       const result = await tool.callback(input);

       return {
          content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
      };
    } catch (error) {
       return {
          error: {
             code: "invalid_arguments",
             message: `Invalid arguments for tool ${name}: ${error instanceof Error ? error.message : String(error)}`
          }
    };
   }

});

// schema.ts
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });

// add.ts
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

- En el manejador que se ocupa de todas las llamadas a herramientas, ahora intentamos analizar la solicitud entrante en el esquema definido para la herramienta:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    si eso funciona, entonces procedemos a llamar la herramienta real:

    ```typescript
    const result = await tool.callback(input);
    ```

Como puedes ver, este enfoque crea una gran arquitectura ya que todo tiene su lugar, el *server.ts* es un archivo muy pequeño que solo conecta los manejadores de solicitud y cada función está en su carpeta respectiva i.e tools/, resources/ o /prompts.

Genial, intentemos construir esto a continuación.

## Ejercicio: Crear un servidor de bajo nivel

En este ejercicio, haremos lo siguiente:

1. Crear un servidor de bajo nivel que maneje la lista y llamada de herramientas.
1. Implementar una arquitectura sobre la cual puedas construir.
1. Añadir validación para asegurar que tus llamadas a herramientas estén correctamente validadas.

### -1- Crear una arquitectura

Lo primero que necesitamos abordar es una arquitectura que nos ayude a escalar al añadir más funciones, así es como se ve:

**Python**

```text
server.py
--| tools
----| __init__.py
----| add.py
----| schema.py
client.py
```

**TypeScript**

```text
server.ts
--| tools
----| add.ts
----| schema.ts
client.ts
```

Ahora hemos configurado una arquitectura que asegura que podemos añadir fácilmente nuevas herramientas en una carpeta tools. Siéntete libre de seguir esto para añadir subdirectorios para resources y prompts.

### -2- Crear una herramienta

Veamos cómo se crea una herramienta a continuación. Primero, debe ser creada en su subdirectorio *tool* así:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validar entrada usando el modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: añadir Pydantic, para que podamos crear un AddInputModel y validar los argumentos

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Lo que vemos aquí es cómo definimos el nombre, descripción y esquema de entrada usando Pydantic y un manejador que será invocado cuando se llame a esta herramienta. Por último, exponemos `tool_add` que es un diccionario que contiene todas estas propiedades.

También está *schema.py* que se usa para definir el esquema de entrada usado por nuestra herramienta:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

También necesitamos llenar *__init__.py* para asegurar que el directorio tools sea tratado como un módulo. Además, necesitamos exponer los módulos dentro de él así:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Podemos seguir agregando a este archivo a medida que añadimos más herramientas.

**TypeScript**

```typescript
import { Tool } from "./tool.js";
import { MathInputSchema } from "./schema.js";
import { zodToJsonSchema } from "zod-to-json-schema";

export default {
    name: "add",
    rawSchema: MathInputSchema,
    inputSchema: zodToJsonSchema(MathInputSchema),
    callback: async ({ a, b }) => {
        return {
            content: [{ type: "text", text: String(a + b) }]
        };
    }
} as Tool;
```

Aquí creamos un diccionario que consiste en propiedades:

- name, este es el nombre de la herramienta.
- rawSchema, este es el esquema Zod, se usará para validar las solicitudes entrantes para llamar esta herramienta.
- inputSchema, este esquema será usado por el manejador.
- callback, este se usa para invocar la herramienta.

También existe `Tool` que se usa para convertir este diccionario en un tipo que el manejador del servidor mcp pueda aceptar y se ve así:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Y está *schema.ts* donde almacenamos los esquemas de entrada para cada herramienta, que se ve así con solo un esquema por ahora, pero a medida que añadamos herramientas podemos agregar más entradas:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Genial, sigamos con el manejo del listado de nuestras herramientas.

### -3- Manejar lista de herramientas

Después, para manejar la lista de nuestras herramientas, necesitamos configurar un manejador de solicitudes para eso. Esto es lo que debemos agregar a nuestro archivo de servidor:

**Python**

```python
# código omitido por brevedad
from tools import tools

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    tool_list = []
    print(tools)

    for tool in tools.values():
        tool_list.append(
            types.Tool(
                name=tool["name"],
                description=tool["description"],
                inputSchema=pydantic_to_json(tool["input_schema"]),
            )
        )
    return tool_list
```

Aquí, añadimos el decorador `@server.list_tools` y la función implementadora `handle_list_tools`. En esta última, necesitamos producir una lista de herramientas. Observa cómo cada herramienta debe tener un nombre, descripción y inputSchema.

**TypeScript**

Para configurar el manejador de solicitudes para listar herramientas, necesitamos llamar a `setRequestHandler` en el servidor con un esquema que encaje con lo que queremos hacer, en este caso `ListToolsRequestSchema`.

```typescript
// index.ts
import addTool from "./add.js";
import subtractTool from "./subtract.js";
import {server} from "../server.js";
import { Tool } from "./tool.js";

export let tools: Array<Tool> = [];
tools.push(addTool);
tools.push(subtractTool);

// server.ts
// código omitido por brevedad
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Devuelve la lista de herramientas registradas
  return {
    tools: tools
  };
});
```

Genial, ahora hemos resuelto la parte de listar herramientas, veamos cómo podríamos llamar herramientas a continuación.

### -4- Manejar llamada a una herramienta

Para llamar a una herramienta, necesitamos configurar otro manejador de solicitudes, esta vez enfocado en lidiar con una solicitud que especifique qué función llamar y con qué argumentos.

**Python**

Usemos el decorador `@server.call_tool` e implementémoslo con una función como `handle_call_tool`. Dentro de esa función, necesitamos extraer el nombre de la herramienta, sus argumentos y asegurar que los argumentos sean válidos para la herramienta en cuestión. Podemos validar los argumentos en esta función o después en la herramienta real.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools es un diccionario con los nombres de las herramientas como claves
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # invocar la herramienta
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Esto es lo que sucede:

- Nuestro nombre de herramienta ya está presente como parámetro de entrada `name` lo que es cierto para nuestros argumentos en forma del diccionario `arguments`.

- Se llama a la herramienta con `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. La validación de los argumentos ocurre en la propiedad `handler` que apunta a una función, si eso falla lanzará una excepción.

Ahí lo tienes, ahora tenemos un entendimiento completo de cómo listar y llamar herramientas usando un servidor de bajo nivel.

Consulta el [ejemplo completo](./code/README.md) aquí

## Tarea

Extiende el código que se te ha dado con un número de herramientas, recursos y avisos y reflexiona sobre cómo notas que solo necesitas agregar archivos en el directorio tools y en ningún otro lugar.

*No se ofrece solución*

## Resumen

En este capítulo, vimos cómo funciona el enfoque de servidor de bajo nivel y cómo eso puede ayudarnos a crear una buena arquitectura sobre la cual podemos seguir construyendo. También hablamos sobre validación y se te mostró cómo trabajar con librerías de validación para crear esquemas para la validación de entradas.

## Qué sigue

- Siguiente: [Autenticación Simple](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automáticas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de ningún malentendido o interpretación errónea derivada del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->