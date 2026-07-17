# Uso avançado do servidor

Existem dois tipos diferentes de servidores expostos no MCP SDK, o seu servidor normal e o servidor de baixo nível. Normalmente, você usaria o servidor regular para adicionar funcionalidades. Contudo, em alguns casos, deseja-se recorrer ao servidor de baixo nível, tais como:

- Melhor arquitetura. É possível criar uma arquitetura limpa com ambos os servidores, regular e de baixo nível, mas pode-se argumentar que é um pouco mais fácil com um servidor de baixo nível.
- Disponibilidade de funcionalidades. Algumas funcionalidades avançadas só podem ser usadas com um servidor de baixo nível. Verá isso nos capítulos seguintes ao adicionarmos sampling (descontinuado na release candidate de `2026-07-28`) e elicitação.

## Servidor regular vs servidor de baixo nível

Eis como a criação de um Servidor MCP se parece com o servidor regular

**Python**

```python
mcp = FastMCP("Demo")

# Adicionar uma ferramenta de adição
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

// Adicionar uma ferramenta de adição
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

O ponto aqui é que você adiciona explicitamente cada ferramenta, recurso ou prompt que deseja que o servidor tenha. Não há problema algum nisso.  

### Abordagem do servidor de baixo nível

Contudo, quando utiliza a abordagem do servidor de baixo nível precisa de pensar diferente. Em vez de registar cada ferramenta, cria dois manipuladores por tipo de funcionalidade (ferramentas, recursos ou prompts). Por exemplo, as ferramentas só têm duas funções assim:

- Listar todas as ferramentas. Uma função é responsável por todas as tentativas de listar ferramentas.
- Manipular os chamados a todas as ferramentas. Também aqui, só há uma função a tratar os pedidos para chamar uma ferramenta.

Isso parece potencialmente menos trabalho, certo? Em vez de registar uma ferramenta, só preciso garantir que ela é listada quando listar todas as ferramentas e que é chamada quando um pedido para chamar a ferramenta chega.

Vejamos como o código fica agora:

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
  // Retorna a lista de ferramentas registadas
  return {
    tools: [{
        name: "add",
        description: "Add two numbers",
        inputSchema: {
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

Aqui temos uma função que retorna uma lista de funcionalidades. Cada entrada da lista de ferramentas agora tem campos como `name`, `description` e `inputSchema` para abarcar o tipo de retorno. Isto permite colocar as definições das ferramentas e das funcionalidades noutro lugar. Podemos agora criar todas as ferramentas numa pasta tools e o mesmo se aplica a todas as suas funcionalidades, pelo que o seu projeto pode ser organizado assim:

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

Isso é ótimo, a nossa arquitetura pode ficar bastante limpa.

E quanto a chamar ferramentas, é a mesma ideia então, um manipulador para chamar uma ferramenta, seja qual for? Sim, exatamente, aqui está o código para isso:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools é um dicionário com nomes de ferramentas como chaves
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
    
    // argumentos: request.params.arguments
    // TODO chamar a ferramenta,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Como pode ver no código acima, precisamos analisar qual ferramenta chamar, com que argumentos, e depois avançar para chamar a ferramenta.

## Melhorar a abordagem com validação

Até agora, viu como todos os seus registos para adicionar ferramentas, recursos e prompts podem ser substituídos por estes dois manipuladores por tipo de funcionalidade. O que mais precisamos fazer? Bem, devemos adicionar alguma forma de validação para garantir que a ferramenta é chamada com os argumentos corretos. Cada runtime tem a sua solução para isto, por exemplo o Python usa Pydantic e o TypeScript usa Zod. A ideia é fazermos o seguinte:

- Mover a lógica para criar uma funcionalidade (ferramenta, recurso ou prompt) para a sua pasta dedicada.
- Adicionar uma forma de validar um pedido pendente para, por exemplo, chamar uma ferramenta.

### Criar uma funcionalidade

Para criar uma funcionalidade, precisaremos de criar um ficheiro para ela e garantir que tem os campos obrigatórios solicitados por essa funcionalidade. Os campos diferem um pouco entre ferramentas, recursos e prompts.

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
        # Validar entrada usando modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adicionar Pydantic, para podermos criar um AddInputModel e validar os argumentos

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

aqui pode ver como fazemos o seguinte:

- Criar um esquema usando Pydantic `AddInputModel` com campos `a` e `b` no ficheiro *schema.py*.
- Tentar analisar o pedido pendente para ser do tipo `AddInputModel`, se houver algum erro nos parâmetros isto irá falhar:

   ```python
   # add.py
    try:
        # Validar entrada usando modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Pode optar por colocar esta lógica de parsing na chamada da ferramenta em si ou na função manipuladora.

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

- No manipulador que trata todas as chamadas de ferramenta, agora tentamos analisar o pedido pendente para o esquema definido da ferramenta:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    se isso funcionar, então avançamos para chamar a ferramenta:

    ```typescript
    const result = await tool.callback(input);
    ```

Como pode ver, esta abordagem cria uma arquitetura excelente pois tudo tem o seu lugar, o *server.ts* é um ficheiro muito pequeno que só liga os manipuladores de pedido, e cada funcionalidade está na sua respetiva pasta, ou seja tools/, resources/ ou /prompts.

Ótimo, vamos tentar construir isto a seguir. 

## Exercício: Criar um servidor de baixo nível

Neste exercício, faremos o seguinte:

1. Criar um servidor de baixo nível que trate a listagem e chamada de ferramentas.
1. Implementar uma arquitetura sobre a qual possa construir.
1. Adicionar validação para garantir que as chamadas às suas ferramentas sejam corretamente validadas.

### -1- Criar uma arquitetura

A primeira coisa que precisamos abordar é uma arquitetura que nos ajude a escalar conforme acrescentamos mais funcionalidades, veja como fica:

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

Agora configuramos uma arquitetura que assegura que podemos acrescentar facilmente novas ferramentas numa pasta tools. Sinta-se à vontade para seguir isto para adicionar subdiretórios para recursos e prompts.

### -2- Criar uma ferramenta

Vamos ver a seguir como criar uma ferramenta. Primeiro, ela precisa de ser criada no seu subdiretório *tool* assim:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validar a entrada usando o modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adicionar Pydantic, para podermos criar um AddInputModel e validar os argumentos

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

O que vemos aqui é como definimos o nome, descrição e esquema de entrada usando Pydantic e um manipulador que será invocado quando esta ferramenta for chamada. Por fim, expomos `tool_add`, que é um dicionário contendo todas estas propriedades.

Há também *schema.py* usado para definir o esquema de entrada usado pela nossa ferramenta:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Também precisamos preencher *__init__.py* para garantir que a pasta tools é tratada como módulo. Adicionalmente, precisamos expor os módulos dentro dela assim:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Podemos continuar a adicionar a este ficheiro à medida que adicionamos mais ferramentas.

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

Aqui criamos um dicionário constituído por propriedades:

- name, que é o nome da ferramenta.
- rawSchema, que é o esquema Zod, que será usado para validar pedidos pendentes que tentem chamar esta ferramenta.
- inputSchema, que este esquema será usado pelo manipulador.
- callback, que se usa para invocar a ferramenta.

Também há `Tool` que é usado para converter este dicionário num tipo que o manipulador do servidor mcp pode aceitar e fica assim:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

E há *schema.ts* onde armazenamos os esquemas de entrada de cada ferramenta, que fica assim com apenas um esquema por ora mas conforme vamos adicionando ferramentas podemos adicionar mais entradas:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Ótimo, vamos avançar para tratar a listagem das nossas ferramentas a seguir.

### -3- Tratar a listagem de ferramentas

A seguir, para tratar a listagem das ferramentas, precisamos configurar um manipulador de pedidos para isso. Eis o que precisamos adicionar no nosso ficheiro do servidor:

**Python**

```python
# código omitido por brevidade
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

Aqui, adicionamos o decorador `@server.list_tools` e a função implementadora `handle_list_tools`. Nesta última, precisamos produzir uma lista de ferramentas. Note como cada ferramenta precisa ter um nome, descrição e inputSchema.   

**TypeScript**

Para configurar o manipulador de pedidos para listar ferramentas, precisamos chamar `setRequestHandler` no servidor com um esquema adequado ao que estamos a tentar fazer, neste caso `ListToolsRequestSchema`. 

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
// código omitido para brevidade
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Retorna a lista de ferramentas registadas
  return {
    tools: tools
  };
});
```

Ótimo, agora resolvemos a parte da listagem de ferramentas, vejamos a seguir como podemos estar a chamar as ferramentas.

### -4- Tratar a chamada de uma ferramenta

Para chamar uma ferramenta, precisamos configurar outro manipulador de pedido, desta vez focado em lidar com um pedido a especificar qual funcionalidade chamar e com que argumentos.

**Python**

Vamos usar o decorador `@server.call_tool` e implementar com uma função como `handle_call_tool`. Dentro dessa função, precisamos extrair o nome da ferramenta, o seu argumento e garantir que os argumentos são válidos para a ferramenta em questão. Podemos validar os argumentos nesta função ou a jusante na ferramenta propriamente dita.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools é um dicionário com nomes de ferramentas como chaves
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # invocar a ferramenta
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ]
```

Eis o que acontece:

- O nosso nome da ferramenta já está presente como parâmetro de entrada `name`, o que é verdade para os nossos argumentos em forma do dicionário `arguments`.

- A ferramenta é chamada com `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. A validação dos argumentos acontece na propriedade `handler` que aponta para uma função, se isso falhar será lançada uma exceção. 

Está feito, agora compreendemos totalmente listar e chamar ferramentas usando um servidor de baixo nível.

Veja o [exemplo completo](./code/README.md) aqui

## Tarefa

Amplie o código que lhe foi dado com várias ferramentas, recursos e prompts e reflita sobre como apenas precisa de adicionar ficheiros na pasta tools e em mais lado nenhum. 

*Nenhuma solução fornecida*

## Resumo

Neste capítulo, vimos como funciona a abordagem do servidor de baixo nível e como pode ajudar-nos a criar uma arquitetura boa que podemos continuar a expandir. Também discutimos a validação e foi mostrado como trabalhar com bibliotecas de validação para criar esquemas para validação de entrada.

## O que vem a seguir

- A seguir: [Autenticação simples](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->