# Utilisation avancée du serveur

Il existe deux types différents de serveurs exposés dans le SDK MCP : votre serveur normal et le serveur bas niveau. Normalement, vous utiliseriez le serveur régulier pour y ajouter des fonctionnalités. Cependant, dans certains cas, vous souhaitez vous appuyer sur le serveur bas niveau, par exemple :

- Meilleure architecture. Il est possible de créer une architecture propre avec à la fois le serveur régulier et un serveur bas niveau, mais on peut argumenter que c’est un peu plus facile avec un serveur bas niveau.
- Disponibilité des fonctionnalités. Certaines fonctionnalités avancées ne peuvent être utilisées qu’avec un serveur bas niveau. Vous verrez cela dans les chapitres suivants lorsque nous ajouterons l’échantillonnage et l’évocation.

## Serveur régulier vs serveur bas niveau

Voici à quoi ressemble la création d’un serveur MCP avec le serveur régulier

**Python**

```python
mcp = FastMCP("Demo")

# Ajouter un outil d'addition
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

// Ajouter un outil d'addition
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

Le point est que vous ajoutez explicitement chaque outil, ressource ou invite que vous souhaitez que le serveur dispose. Rien de mal à cela.

### Approche serveur bas niveau

Cependant, lorsque vous utilisez l’approche du serveur bas niveau, vous devez y penser différemment. Au lieu d’enregistrer chaque outil, vous créez plutôt deux gestionnaires par type de fonctionnalité (outils, ressources ou invites). Ainsi, par exemple, les outils n’ont que deux fonctions comme suit :

- Lister tous les outils. Une fonction serait responsable de toutes les tentatives pour lister les outils.
- Gérer l’appel de tous les outils. Ici aussi, il n’y a qu’une seule fonction qui gère les appels à un outil.

Cela semble potentiellement moins de travail, non ? Donc au lieu d’enregistrer un outil, je dois juste m’assurer que l’outil est listé lorsque je liste tous les outils et qu’il est appelé lorsqu’il y a une requête entrante pour appeler un outil.

Regardons maintenant à quoi ressemble le code :

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
  // Retourner la liste des outils enregistrés
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

Ici, nous avons maintenant une fonction qui renvoie une liste de fonctionnalités. Chaque entrée dans la liste des outils possède maintenant des champs comme `name`, `description` et `inputSchema` pour respecter le type de retour. Cela nous permet de mettre nos outils et définitions de fonctionnalités ailleurs. Nous pouvons maintenant créer tous nos outils dans un dossier tools et il en va de même pour toutes vos fonctionnalités, donc votre projet peut soudainement être organisé comme suit :

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

C’est génial, notre architecture peut être rendue assez propre.

Qu’en est-il de l’appel des outils, est-ce la même idée alors, un gestionnaire pour appeler un outil, quel que soit l’outil ? Oui, exactement, voici le code pour cela :

**Python**

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools est un dictionnaire avec les noms des outils comme clés
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
    
    // args : request.params.arguments
    // TODO appeler l'outil,

    return {
       content: [{ type: "text", text: `Tool ${name} called with arguments: ${JSON.stringify(input)}, result: ${JSON.stringify(result)}` }]
    };
});
```

Comme vous pouvez le constater dans le code ci-dessus, nous devons extraire l’outil à appeler, avec quels arguments, puis nous devons procéder à l’appel de l’outil.

## Améliorer l’approche avec la validation

Jusqu’à présent, vous avez vu comment toutes vos inscriptions pour ajouter des outils, des ressources et des invites peuvent être remplacées par ces deux gestionnaires par type de fonctionnalité. Que devons-nous faire d’autre ? Eh bien, nous devrions ajouter une forme de validation pour nous assurer que l’outil est appelé avec les bons arguments. Chaque runtime a sa propre solution pour cela, par exemple Python utilise Pydantic et TypeScript utilise Zod. L’idée est que nous faisons ce qui suit :

- Déplacer la logique de création d’une fonctionnalité (outil, ressource ou invite) dans son dossier dédié.
- Ajouter une façon de valider une requête entrante demandant par exemple d’appeler un outil.

### Créer une fonctionnalité

Pour créer une fonctionnalité, nous devrons créer un fichier pour cette fonctionnalité et nous assurer qu’il contient les champs obligatoires requis pour cette fonctionnalité. Les champs diffèrent un peu entre les outils, ressources et invites.

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
        # Valider l'entrée en utilisant le modèle Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO : ajouter Pydantic, afin que nous puissions créer un AddInputModel et valider les arguments

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

ici vous pouvez voir comment nous faisons ce qui suit :

- Créer un schéma en utilisant Pydantic `AddInputModel` avec les champs `a` et `b` dans le fichier *schema.py*.
- Tenter de parser la requête entrante pour qu’elle soit du type `AddInputModel`, s’il y a un décalage dans les paramètres, cela va planter :

   ```python
   # add.py
    try:
        # Valider l'entrée en utilisant un modèle Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")
   ```

Vous pouvez choisir de mettre cette logique de parse dans l’appel de l’outil lui-même ou dans la fonction gestionnaire.

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

- Dans le gestionnaire qui s’occupe de tous les appels d’outil, nous essayons maintenant de parser la requête entrante selon le schéma défini de l’outil :

    ```typescript
    const Schema = tool.rawSchema;

    try {
       const input = Schema.parse(request.params.arguments);
    ```

    si cela fonctionne alors nous procédons à appeler le véritable outil :

    ```typescript
    const result = await tool.callback(input);
    ```

Comme vous pouvez le voir, cette approche crée une excellente architecture car tout a sa place, le *server.ts* est un fichier très petit qui ne fait que relier les gestionnaires de requêtes et chaque fonctionnalité est dans son dossier respectif i.e tools/, resources/ ou /prompts.

Super, essayons de construire cela ensuite.

## Exercice : Créer un serveur bas niveau

Dans cet exercice, nous allons faire ce qui suit :

1. Créer un serveur bas niveau gérant la liste des outils et l’appel des outils.
1. Implémenter une architecture sur laquelle vous pouvez construire.
1. Ajouter une validation pour garantir que vos appels outils sont correctement validés.

### -1- Créer une architecture

La première chose que nous devons aborder est une architecture qui nous aide à évoluer au fur et à mesure que nous ajoutons plus de fonctionnalités, voici à quoi cela ressemble :

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

Nous avons maintenant mis en place une architecture qui garantit que nous pouvons facilement ajouter de nouveaux outils dans un dossier tools. N’hésitez pas à suivre cela pour ajouter des sous-répertoires pour les ressources et les invites.

### -2- Créer un outil

Voyons à quoi ressemble la création d’un outil ensuite. Tout d’abord, il doit être créé dans son sous-répertoire *tool* comme ceci :

**Python**

```python
from .schema import AddInputModel

async def add_handler(args) -> float:
    try:
        # Valider l'entrée en utilisant le modèle Pydantic
        input_model = AddInputModel(**args)
    except Exception as e:
        raise ValueError(f"Invalid input: {str(e)}")

    # TODO : ajouter Pydantic, afin que nous puissions créer un AddInputModel et valider les arguments

    """Handler function for the add tool."""
    return float(input_model.a) + float(input_model.b)

tool_add = {
    "name": "add",
    "description": "Adds two numbers",
    "input_schema": AddInputModel,
    "handler": add_handler 
}
```

Ce que nous voyons ici, c’est comment nous définissons le nom, la description et le schéma d’entrée avec Pydantic et un gestionnaire qui sera appelé une fois que cet outil est invoqué. Enfin, nous exposons `tool_add` qui est un dictionnaire contenant toutes ces propriétés.

Il y a aussi *schema.py* qui est utilisé pour définir le schéma d’entrée utilisé par notre outil :

```python
from pydantic import BaseModel

class AddInputModel(BaseModel):
    a: float
    b: float
```

Nous devons aussi remplir *__init__.py* pour s’assurer que le répertoire tools est traité comme un module. De plus, nous devons exposer les modules qui sont dedans comme ceci :

```python
from .add import tool_add

tools = {
  tool_add["name"] : tool_add
}
```

Nous pouvons continuer à ajouter dans ce fichier au fur et à mesure que nous ajoutons des outils.

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

Ici, nous créons un dictionnaire composé des propriétés :

- name, c’est le nom de l’outil.
- rawSchema, c’est le schéma Zod, il sera utilisé pour valider les requêtes entrantes d’appel à cet outil.
- inputSchema, ce schéma sera utilisé par le gestionnaire.
- callback, cela sert à invoquer l’outil.

Il y a aussi `Tool` qui est utilisé pour convertir ce dictionnaire en un type que le gestionnaire serveur mcp peut accepter et cela ressemble à ceci :

```typescript
import { z } from 'zod';

export interface Tool {
    name: string;
    inputSchema: any;
    rawSchema: z.ZodTypeAny;
    callback: (args: z.infer<z.ZodTypeAny>) => Promise<{ content: { type: string; text: string }[] }>;
}
```

Et il y a *schema.ts* où nous stockons les schémas d’entrée pour chaque outil qui ressemble à ceci avec un seul schéma pour l’instant, mais à mesure que nous ajoutons des outils, nous pouvons ajouter plus d’entrées :

```typescript
import { z } from 'zod';

export const MathInputSchema = z.object({ a: z.number(), b: z.number() });
```

Super, passons maintenant à la gestion de la liste de nos outils.

### -3- Gérer la liste des outils

Ensuite, pour gérer la liste de nos outils, nous devons configurer un gestionnaire de requête pour cela. Voici ce que nous devons ajouter dans notre fichier serveur :

**Python**

```python
# code omis pour des raisons de brièveté
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

Ici, nous ajoutons le décorateur `@server.list_tools` et la fonction d’implémentation `handle_list_tools`. Dans cette dernière, nous devons produire une liste d’outils. Notez que chaque outil doit avoir un nom, une description et un inputSchema.

**TypeScript**

Pour configurer le gestionnaire de requêtes pour la liste des outils, nous devons appeler `setRequestHandler` sur le serveur avec un schéma correspondant à ce que nous essayons de faire, dans ce cas `ListToolsRequestSchema`.

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
// code omis pour plus de concision
import { tools } from './tools/index.js';

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  // Retourne la liste des outils enregistrés
  return {
    tools: tools
  };
});
```

Super, maintenant que nous avons résolu la partie listage des outils, voyons comment nous pourrions appeler des outils ensuite.

### -4- Gérer l’appel d’un outil

Pour appeler un outil, nous devons configurer un autre gestionnaire de requêtes, cette fois-ci concentré sur le traitement d’une requête spécifiant quelle fonctionnalité appeler et avec quels arguments.

**Python**

Utilisons le décorateur `@server.call_tool` et implémentons-le avec une fonction comme `handle_call_tool`. Dans cette fonction, nous devons extraire le nom de l’outil, ses arguments et nous assurer que les arguments sont valides pour l’outil en question. Nous pouvons valider les arguments dans cette fonction ou en aval dans l’outil lui-même.

```python
@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict[str, str] | None
) -> list[types.TextContent]:
    
    # tools est un dictionnaire avec les noms des outils comme clés
    if name not in tools.tools:
        raise ValueError(f"Unknown tool: {name}")
    
    tool = tools.tools[name]

    result = "default"
    try:
        # invoquer l'outil
        result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)
    except Exception as e:
        raise ValueError(f"Error calling tool {name}: {str(e)}")

    return [
        types.TextContent(type="text", text=str(result))
    ] 
```

Voici ce qui se passe :

- Le nom de notre outil est déjà présent en tant que paramètre d’entrée `name`, ce qui est vrai pour nos arguments sous la forme du dictionnaire `arguments`.

- L’outil est appelé avec `result = await tool["handler"](../../../../03-GettingStarted/10-advanced/arguments)`. La validation des arguments se fait dans la propriété `handler` qui pointe vers une fonction, si cela échoue, cela lèvera une exception.

Voilà, maintenant nous avons une compréhension complète du listing et de l’appel des outils en utilisant un serveur bas niveau.

Voir l’[exemple complet](./code/README.md) ici

## Devoir

Étendez le code qui vous a été donné avec un certain nombre d’outils, de ressources et d’invites et réfléchissez à la manière dont vous ne devez ajouter que des fichiers dans le répertoire tools et nulle part ailleurs.

*Pas de solution donnée*

## Résumé

Dans ce chapitre, nous avons vu comment l’approche du serveur bas niveau fonctionnait et comment cela peut nous aider à créer une belle architecture sur laquelle nous pouvons continuer à construire. Nous avons aussi discuté de la validation et vous avez vu comment travailler avec des bibliothèques de validation pour créer des schémas pour valider les entrées.

## Prochaine étape

- Suivant : [Authentification simple](../11-simple-auth/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction IA [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçons d’assurer l’exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source faisant foi. Pour les informations critiques, une traduction professionnelle humaine est recommandée. Nous déclinons toute responsabilité en cas de malentendus ou d’interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->