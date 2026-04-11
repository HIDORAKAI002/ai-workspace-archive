# Uso avançado do servidor

Existem dois tipos diferentes de servidores expostos no MCP SDK, o seu servidor normal e o servidor de baixo nível. Normalmente, usaria o servidor regular para adicionar funcionalidades. Em alguns casos, porém, prefere-se confiar no servidor de baixo nível, tais como:

- Arquitetura melhor. É possível criar uma arquitetura limpa com ambos os servidores, regular e de baixo nível, mas pode-se argumentar que é ligeiramente mais fácil com um servidor de baixo nível.
- Disponibilidade de funcionalidades. Algumas funcionalidades avançadas só podem ser usadas com um servidor de baixo nível. Isto verá em capítulos posteriores, ao adicionarmos amostragem e elicitação.

## Servidor regular vs servidor de baixo nível

É assim que se parece a criação de um Servidor MCP com o servidor regular

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

O que importa é que adiciona explicitamente cada ferramenta, recurso ou prompt que quer que o servidor tenha. Não há nada de errado com isso.  

### Abordagem do servidor de baixo nível

No entanto, quando utiliza a abordagem do servidor de baixo nível, precisa pensar de forma diferente. Em vez de registar cada ferramenta, cria dois handlers por tipo de funcionalidade (ferramentas, recursos ou prompts). Por exemplo, as ferramentas passam a ter apenas duas funções como segue:

- Listar todas as ferramentas. Uma função será responsável por todas as tentativas de listar ferramentas.
- Gerir chamadas a todas as ferramentas. Aqui também, há apenas uma função que trata das chamadas a uma ferramenta.

Parece possível menos trabalho certo? Em vez de registar uma ferramenta, só preciso garantir que a ferramenta está listada quando listar todas as ferramentas e que é chamada quando chega um pedido para chamar uma ferramenta. 

Vamos ver como o código fica agora:

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

Aqui temos uma função que retorna uma lista de funcionalidades. Cada entrada na lista de ferramentas agora tem campos como `name`, `description` e `inputSchema` para obedecer ao tipo de retorno. Isto permite que coloquemos as nossas ferramentas e definição de funcionalidades noutro lugar. Podemos agora criar todas as nossas ferramentas numa pasta tools e o mesmo para todas as suas funcionalidades, para que o seu projeto fique organizado assim:

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

Isso é ótimo, a nossa arquitetura pode parecer bastante limpa.

E quanto a chamar ferramentas, será a mesma ideia então, um handler para chamar uma ferramenta, seja qual for? Sim, exatamente, aqui está o código para isso:

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools é um dicionário com os nomes das ferramentas como chaves
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
    // TODO chamar a ferramenta,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Como pode ver pelo código acima, precisamos analisar qual a ferramenta a chamar e com que argumentos, e então proceder à chamada da ferramenta.

## Melhorar a abordagem com validação

Até agora, viu como todas as suas registos para adicionar ferramentas, recursos e prompts podem ser substituídos por estes dois handlers por tipo de funcionalidade. O que mais precisamos fazer? Bem, devemos adicionar algum tipo de validação para garantir que a ferramenta é chamada com os argumentos corretos. Cada runtime tem a sua própria solução para isto, por exemplo Python usa Pydantic e TypeScript usa Zod. A ideia é fazer o seguinte:

- Mover a lógica para criar uma funcionalidade (ferramenta, recurso ou prompt) para a sua pasta dedicada.
- Adicionar uma forma de validar um pedido que chegue pedindo, por exemplo, chamar uma ferramenta.

### Criar uma funcionalidade

Para criar uma funcionalidade, precisamos de criar um ficheiro para essa funcionalidade e garantir que tem os campos obrigatórios requeridos para essa funcionalidade. Os campos variam um pouco entre ferramentas, recursos e prompts.

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

    # TODO: adicionar Pydantic, para podermos criar um AddInputModel e validar args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Aqui pode ver como fazemos o seguinte:

- Criamos um esquema usando Pydantic `AddInputModel` com campos `a` e `b` no ficheiro *schema.py*.
- Tentamos analisar o pedido recebido para ser do tipo `AddInputModel`, se houver incompatibilidade nos parâmetros isto irá falhar:

   ```python
   # add.py
    try:
        # Validar a entrada usando o modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Pode escolher colocar esta lógica de parsing na própria chamada da ferramenta ou no handler.

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

- No handler que lida com todas as chamadas a ferramentas, tentamos agora analisar o pedido recebido no esquema definido para a ferramenta:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    se isso funcionar, então prosseguimos para chamar a ferramenta real:

    ```typescript
    const result = await tool.callback(input);
    ```

Como viu, esta abordagem cria uma excelente arquitetura pois tudo tem o seu lugar, o *server.ts* é um ficheiro muito pequeno que apenas liga os handlers de pedidos e cada funcionalidade está na sua respetiva pasta, ou seja tools/, resources/ ou /prompts.

Ótimo, vamos tentar construir isto a seguir.

## Exercício: Criar um servidor de baixo nível

Neste exercício, iremos fazer o seguinte:

1. Criar um servidor de baixo nível que trate da listagem de ferramentas e da chamada de ferramentas.
1. Implementar uma arquitetura na qual possa construir.
1. Adicionar validação para garantir que as chamadas às suas ferramentas são validadas corretamente.

### -1- Criar uma arquitetura

A primeira coisa que precisamos abordar é uma arquitetura que nos ajude a escalar à medida que adicionamos mais funcionalidades, aqui está como se parece:

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

Agora configurámos uma arquitetura que garante que podemos facilmente adicionar novas ferramentas numa pasta tools. Sinta-se à vontade para seguir isto e adicionar subdiretórios para resources e prompts.

### -2- Criar uma ferramenta

Vamos ver como é criar uma ferramenta a seguir. Primeiro, precisa ser criada na sua subpasta *tool* assim:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validar entrada usando o modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adicionar Pydantic, para podermos criar um AddInputModel e validar args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Aqui vemos como definimos nome, descrição, e esquema de entrada usando Pydantic e um handler que será invocado assim que esta ferramenta for chamada. Por fim, expomos `tool_add` que é um dicionário contendo todas essas propriedades.

Existe também *schema.py* que é usado para definir o esquema de entrada usado pela nossa ferramenta:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Também precisamos preencher *__init__.py* para garantir que o diretório tools é tratado como um módulo. Além disso, precisamos expor os módulos dentro dele assim:

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

Aqui criamos um dicionário com as propriedades:

- name, este é o nome da ferramenta.
- rawSchema, este é o esquema Zod, será usado para validar pedidos que chegam para chamar esta ferramenta.
- inputSchema, este esquema será usado pelo handler.
- callback, isto é usado para invocar a ferramenta.

Existe também `Tool` que é usado para converter este dicionário num tipo que o handler do servidor mcp pode aceitar e que se parece com isto:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

E existe *schema.ts* onde guardamos os esquemas de entrada para cada ferramenta, que tem esta aparência com apenas um esquema por agora, mas à medida que adicionamos ferramentas podemos adicionar mais entradas:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Ótimo, vamos seguir para tratar da listagem das nossas ferramentas em seguida.

### -3- Tratar da listagem de ferramentas

A seguir, para tratar da listagem das nossas ferramentas, precisamos de configurar um handler para esse pedido. Eis o que precisamos adicionar ao nosso ficheiro server:

**Python**

```python
# código omitido para brevidade
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

Aqui adicionamos o decorador `@server.list_tools` e a função de implementação `handle_list_tools`. Nessa função, precisamos gerar uma lista de ferramentas. Note que cada ferramenta deve ter um nome, descrição e inputSchema.   

**TypeScript**

Para configurar o handler para o pedido de listar ferramentas, precisamos chamar `setRequestHandler` no servidor com um esquema adequado ao que queremos fazer, neste caso `ListToolsRequestSchema`. 

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

Ótimo, agora resolvemos a parte da listagem de ferramentas, vamos ver como poderíamos chamar ferramentas a seguir.

### -4- Tratar da chamada a uma ferramenta

Para chamar uma ferramenta, precisamos configurar outro handler para pedidos, desta vez focado em tratar um pedido que especifica qual funcionalidade chamar e com que argumentos.

**Python**

Vamos usar o decorador `@server.call_tool` e implementá-lo com uma função como `handle_call_tool`. Dentro dessa função, precisamos extrair o nome da ferramenta, o seu argumento e garantir que os argumentos são válidos para a ferramenta em questão. Podemos validar os argumentos nesta função ou a jusante, na própria ferramenta.

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

Aqui acontece o seguinte:

- O nome da ferramenta já está presente como parâmetro de entrada `name` e os argumentos estão no dicionário `arguments`.

- A ferramenta é chamada com `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. A validação dos argumentos acontece na propriedade `handler` que aponta para uma função, se falhar, isso lança uma exceção. 

Pronto, agora temos uma compreensão completa de listar e chamar ferramentas usando um servidor de baixo nível.

Veja o [exemplo completo](./code/README.md) aqui

## Tarefa

Estenda o código que lhe foi dado com várias ferramentas, recursos e prompts e reflita sobre como só precisa de adicionar ficheiros no diretório tools e em lado nenhum mais. 

*Nenhuma solução fornecida*

## Resumo

Neste capítulo, vimos como a abordagem do servidor de baixo nível funciona e como isso nos pode ajudar a criar uma arquitetura agradável que podemos continuar a construir. Também discutimos validação e foi mostrado como trabalhar com bibliotecas de validação para criar esquemas para validação de entrada.

## O que vem a seguir

- Seguinte: [Autenticação simples](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original, na sua língua nativa, deve ser considerado a fonte autorizada. Para informações críticas, é recomendada a tradução profissional realizada por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações erradas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->