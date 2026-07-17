# Uso avançado do servidor

Existem dois tipos diferentes de servidores expostos no SDK MCP, o seu servidor normal e o servidor de baixo nível. Normalmente, você usaria o servidor regular para adicionar recursos a ele. Porém, em alguns casos, você deseja confiar no servidor de baixo nível, como:

- Melhor arquitetura. É possível criar uma arquitetura limpa com o servidor regular e um servidor de baixo nível, mas pode-se argumentar que é um pouco mais fácil com um servidor de baixo nível.
- Disponibilidade de recursos. Alguns recursos avançados só podem ser usados com um servidor de baixo nível. Você verá isso em capítulos posteriores ao adicionarmos amostragem (descontinuada na versão candidata `2026-07-28`) e elicitação.

## Servidor regular vs servidor de baixo nível

Eis como a criação de um Servidor MCP fica com o servidor regular

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

A questão é que você adiciona explicitamente cada ferramenta, recurso ou prompt que deseja que o servidor possua. Não há nada de errado nisso.  

### Abordagem usando servidor de baixo nível

Porém, quando você usa a abordagem do servidor de baixo nível, precisa pensar de forma diferente. Em vez de registrar cada ferramenta, você cria dois manipuladores por tipo de recurso (ferramentas, recursos ou prompts). Por exemplo, as ferramentas terão apenas duas funções assim:

- Listar todas as ferramentas. Uma função seria responsável por todas as tentativas de listar as ferramentas.
- Manipular chamadas para todas as ferramentas. Aqui também, há apenas uma função lidando com chamadas para uma ferramenta.

Isso soa como potencialmente menos trabalho, certo? Então, em vez de registrar uma ferramenta, só preciso garantir que a ferramenta esteja listada quando listar todas as ferramentas e que ela seja chamada quando houver uma solicitação para chamar uma ferramenta. 

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
  // Retorna a lista de ferramentas registradas
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

Aqui agora temos uma função que retorna uma lista de recursos. Cada entrada na lista de ferramentas agora possui campos como `name`, `description` e `inputSchema` para se adequar ao tipo de retorno. Isso nos permite colocar nossas ferramentas e definição de recursos em outro lugar. Agora podemos criar todas as nossas ferramentas em uma pasta tools e o mesmo vale para todos os seus recursos, então seu projeto pode ser organizado assim de repente:

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

Isso é ótimo, nossa arquitetura pode ser feita para parecer bem limpa.

E sobre chamar ferramentas, é a mesma ideia, um manipulador para chamar qualquer ferramenta? Sim, exatamente, aqui está o código para isso:

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
    
    // args: request.params.arguments
    // TODO chamar a ferramenta,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Como você pode ver pelo código acima, precisamos identificar qual ferramenta chamar, e com quais argumentos, e então prosseguir para chamar a ferramenta.

## Melhorando a abordagem com validação

Até agora, você viu como todas suas inscrições para adicionar ferramentas, recursos e prompts podem ser substituídas por esses dois manipuladores por tipo de recurso. O que mais precisamos fazer? Bem, devemos adicionar uma forma de validação para garantir que a ferramenta seja chamada com os argumentos corretos. Cada ambiente de execução tem sua própria solução para isso, por exemplo Python usa Pydantic e TypeScript usa Zod. A ideia é que façamos o seguinte:

- Mover a lógica para criar um recurso (ferramenta, recurso ou prompt) para sua pasta dedicada.
- Adicionar uma maneira de validar uma solicitação recebida para, por exemplo, chamar uma ferramenta.

### Criar um recurso

Para criar um recurso, precisaremos criar um arquivo para esse recurso e garantir que ele tenha os campos obrigatórios exigidos desse recurso. Quais campos diferem um pouco entre ferramentas, recursos e prompts.

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

    # TODO: adicionar Pydantic, para que possamos criar um AddInputModel e validar args

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

aqui você pode ver como fazemos o seguinte:

- Criar um esquema usando Pydantic `AddInputModel` com os campos `a` e `b` no arquivo *schema.py*.
- Tentar analisar a solicitação recebida para ser do tipo `AddInputModel`, se houver incompatibilidade nos parâmetros isso irá travar:

   ```python
   # add.py
    try:
        # Validar entrada usando modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Você pode escolher se coloca essa lógica de análise na própria chamada da ferramenta ou na função do manipulador.

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

- No manipulador que lida com todas as chamadas de ferramenta, agora tentamos analisar a solicitação recebida no esquema definido da ferramenta:

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    se isso funcionar, prosseguimos para chamar a ferramenta de fato:

    ```typescript
    const result = await tool.callback(input);
    ```

Como você pode ver, essa abordagem cria uma ótima arquitetura, pois tudo tem seu lugar, o *server.ts* é um arquivo muito pequeno que apenas conecta os manipuladores de solicitação e cada recurso está em sua respectiva pasta, ou seja tools/, resources/ ou /prompts.

Ótimo, vamos tentar construir isso a seguir. 

## Exercício: Criando um servidor de baixo nível

Neste exercício, faremos o seguinte:

1. Criar um servidor de baixo nível que lide com listagem de ferramentas e chamadas de ferramentas.
1. Implementar uma arquitetura em que você possa construir em cima.
1. Adicionar validação para garantir que suas chamadas às ferramentas sejam devidamente validadas.

### -1- Criar uma arquitetura

A primeira coisa que precisamos abordar é uma arquitetura que nos ajude a escalar conforme adicionamos mais recursos, veja como é:

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

Agora configuramos uma arquitetura que garante que podemos adicionar facilmente novas ferramentas na pasta tools. Sinta-se à vontade para seguir isso e adicionar subdiretórios para resources e prompts.

### -2- Criando uma ferramenta

Vamos ver como criar uma ferramenta a seguir. Primeiro, ela precisa ser criada em sua subpasta *tool* assim:

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Validar entrada usando modelo Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO: adicionar Pydantic, para que possamos criar um AddInputModel e validar os argumentos

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

O que vemos aqui é como definimos nome, descrição e esquema de entrada usando Pydantic e um manipulador que será invocado assim que essa ferramenta for chamada. Por fim, expomos `tool_add`, que é um dicionário contendo todas essas propriedades.

Também há *schema.py* que é usado para definir o esquema de entrada usado pela nossa ferramenta:

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Também precisamos preencher *__init__.py* para garantir que o diretório tools seja tratado como um módulo. Além disso, precisamos expor os módulos dentro dele assim:

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Podemos continuar adicionando a esse arquivo à medida que adicionamos mais ferramentas.

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

Aqui criamos um dicionário composto por propriedades:

- name, este é o nome da ferramenta.
- rawSchema, este é o esquema Zod, usado para validar solicitações recebidas para chamar esta ferramenta.
- inputSchema, este esquema será usado pelo manipulador.
- callback, usado para invocar a ferramenta.

Também há `Tool`, que é usado para converter esse dicionário em um tipo que o manipulador do servidor mcp aceita, assim:

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

E há *schema.ts* onde armazenamos os esquemas de entrada para cada ferramenta que se parecem com isso, com apenas um esquema por enquanto, mas à medida que adicionamos ferramentas, podemos adicionar mais entradas:

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Ótimo, vamos prosseguir para lidar com a listagem das nossas ferramentas a seguir.

### -3- Lidar com a listagem de ferramentas

A seguir, para lidar com a listagem das nossas ferramentas, precisamos configurar um manipulador de solicitações para isso. Veja o que precisamos adicionar ao nosso arquivo de servidor:

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

Aqui, adicionamos o decorador `@server.list_tools` e a função de implementação `handle_list_tools`. Nesta última, precisamos produzir uma lista de ferramentas. Note como cada ferramenta precisa ter um nome, descrição e inputSchema.   

**TypeScript**

Para configurar o manipulador de solicitação para listar ferramentas, precisamos chamar `setRequestHandler` no servidor com um esquema adequado ao que estamos tentando fazer, neste caso `ListToolsRequestSchema`. 

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
  // Retorna a lista de ferramentas registradas
  return {
    tools: tools
  };
});
```

Ótimo, agora que resolvemos a parte de listar ferramentas, vamos ver como podemos chamar ferramentas a seguir.

### -4- Lidar com chamadas para uma ferramenta

Para chamar uma ferramenta, precisamos configurar outro manipulador de solicitações, desta vez focado em lidar com uma solicitação especificando qual recurso chamar e com quais argumentos.

**Python**

Vamos usar o decorador `@server.call_tool` e implementá-lo com uma função como `handle_call_tool`. Dentro dessa função, precisamos extrair o nome da ferramenta, seu argumento e garantir que os argumentos sejam válidos para a ferramenta em questão. Podemos validar os argumentos nesta função ou depois, na própria ferramenta.

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

Aqui está o que acontece:

- O nome da nossa ferramenta já está presente como o parâmetro de entrada `name`, o que também é válido para nossos argumentos na forma do dicionário `arguments`.

- A ferramenta é chamada com `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. A validação dos argumentos acontece na propriedade `handler`, que aponta para uma função; se isso falhar, uma exceção será lançada.

Pronto, agora temos um entendimento completo de listar e chamar ferramentas usando um servidor de baixo nível.

Veja o [exemplo completo](./code/README.md) aqui

## Tarefa

Expanda o código que você recebeu com várias ferramentas, recursos e prompts e reflita sobre como você percebe que só precisa adicionar arquivos na diretoria tools e em nenhum outro lugar.

*Nenhuma solução fornecida*

## Resumo

Neste capítulo, vimos como funciona a abordagem do servidor de baixo nível e como isso pode nos ajudar a criar uma arquitetura bacana que podemos continuar aprimorando. Também discutimos validação e foi mostrado como trabalhar com bibliotecas de validação para criar esquemas de validação de entrada.

## O que vem a seguir

- Próximo: [Autenticação Simples](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->