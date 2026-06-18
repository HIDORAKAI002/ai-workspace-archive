# Serveur MCP avec transport stdio

> **⚠️ Mise à jour importante** : À partir de la spécification MCP 2025-06-18, le transport SSE (Server-Sent Events) autonome a été **abandonné** et remplacé par le transport "Streamable HTTP". La spécification MCP actuelle définit deux principaux mécanismes de transport :
> 1. **stdio** - Entrée/sortie standard (recommandé pour les serveurs locaux)
> 2. **Streamable HTTP** - Pour les serveurs distants pouvant utiliser SSE en interne
>
> Cette leçon a été mise à jour pour se concentrer sur le **transport stdio**, qui est l’approche recommandée pour la plupart des implémentations de serveurs MCP.

Le transport stdio permet aux serveurs MCP de communiquer avec les clients via les flux d’entrée et de sortie standard. C’est le mécanisme de transport le plus couramment utilisé et recommandé dans la spécification MCP actuelle, offrant un moyen simple et efficace de construire des serveurs MCP pouvant être facilement intégrés avec diverses applications clientes.

## Vue d’ensemble

Cette leçon couvre comment construire et consommer des serveurs MCP utilisant le transport stdio.

## Objectifs d’apprentissage

À la fin de cette leçon, vous serez capable de :

- Construire un serveur MCP utilisant le transport stdio.
- Déboguer un serveur MCP avec l’Inspector.
- Consommer un serveur MCP avec Visual Studio Code.
- Comprendre les mécanismes de transport MCP actuels et pourquoi stdio est recommandé.

## Transport stdio - Comment ça fonctionne

Le transport stdio est l’un des deux types de transport supportés dans la spécification MCP actuelle (2025-11-25). Voici son fonctionnement :

- **Communication simple** : le serveur lit les messages JSON-RPC depuis l’entrée standard (`stdin`) et envoie les messages vers la sortie standard (`stdout`).
- **Basé sur processus** : le client lance le serveur MCP en tant que sous-processus.
- **Format des messages** : ce sont des requêtes, notifications ou réponses JSON-RPC individuelles, délimitées par des sauts de ligne.
- **Journalisation** : le serveur PEUT écrire des chaînes UTF-8 vers l’erreur standard (`stderr`) pour la journalisation.

### Exigences clés :
- Les messages DOIVENT être délimités par des sauts de ligne et NE DOIVENT PAS contenir de sauts de ligne internes
- Le serveur NE DOIT PAS écrire dans `stdout` autre chose que des messages MCP valides
- Le client NE DOIT PAS écrire dans `stdin` du serveur autre chose que des messages MCP valides

### TypeScript

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

Dans le code précédent :

- Nous importons la classe `Server` et `StdioServerTransport` depuis le SDK MCP
- Nous créons une instance de serveur avec une configuration et des capacités basiques
- Nous créons une instance de `StdioServerTransport` et connectons le serveur à celui-ci, activant la communication via stdin/stdout

### Python

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Créer une instance de serveur
server = Server("example-server")

@server.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

Dans le code précédent, nous :

- Créons une instance de serveur en utilisant le SDK MCP
- Définissons des outils à l’aide de décorateurs
- Utilisons le gestionnaire de contexte stdio_server pour gérer le transport

### .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

builder.Services.AddLogging(logging => logging.AddConsole());

var app = builder.Build();
await app.RunAsync();
```

La principale différence avec SSE est que les serveurs stdio :

- Ne nécessitent pas de configuration de serveur web ni d’endpoint HTTP
- Sont lancés comme sous-processus par le client
- Communiquent via les flux stdin/stdout
- Sont plus simples à implémenter et à déboguer

## Exercice : Créer un serveur stdio

Pour créer notre serveur, nous devons garder deux choses en tête :

- Nous devons utiliser un serveur web pour exposer des endpoints pour la connexion et les messages.

## Atelier : Créer un serveur MCP stdio simple

Dans cet atelier, nous allons créer un serveur MCP simple utilisant le transport stdio recommandé. Ce serveur exposera des outils que les clients pourront appeler via le protocole standard Model Context Protocol.

### Prérequis

- Python 3.8 ou ultérieur
- SDK MCP Python : `pip install mcp`
- Connaissance basique de la programmation asynchrone

Commençons par créer notre premier serveur MCP stdio :

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Configurer la journalisation
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Créer le serveur
server = Server("example-stdio-server")

@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool() 
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    # Utiliser le transport stdio
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## Différences clés par rapport à l’approche SSE dépréciée

**Transport Stdio (Standard actuel) :**
- Modèle simple de sous-processus – le client lance le serveur comme processus enfant
- Communication via stdin/stdout avec messages JSON-RPC
- Aucune configuration de serveur HTTP requise
- Meilleure performance et sécurité
- Débogage et développement facilités

**Transport SSE (Déprécié depuis MCP 2025-06-18) :**
- Nécessit un serveur HTTP avec endpoints SSE
- Configuration plus complexe avec infrastructure serveur web
- Considérations de sécurité supplémentaires pour les endpoints HTTP
- Remplacé maintenant par Streamable HTTP pour les scénarios web

### Création d’un serveur avec transport stdio

Pour créer notre serveur stdio, nous devons :

1. **Importer les bibliothèques nécessaires** - Nous avons besoin des composants serveur MCP et du transport stdio
2. **Créer une instance serveur** - Définir le serveur avec ses capacités
3. **Définir les outils** - Ajouter les fonctionnalités à exposer
4. **Configurer le transport** - Configurer la communication stdio
5. **Lancer le serveur** - Démarrer le serveur et gérer les messages

Construisons cela étape par étape :

### Étape 1 : Créer un serveur stdio basique

```python
import asyncio
import logging
from mcp.server import Server
from mcp.server.stdio import stdio_server

# Configurer la journalisation
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Créer le serveur
server = Server("example-stdio-server")

@server.tool()
def get_greeting(name: str) -> str:
    """Generate a personalized greeting"""
    return f"Hello, {name}! Welcome to MCP stdio server."

async def main():
    async with stdio_server(server) as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
```

### Étape 2 : Ajouter plus d’outils

```python
@server.tool()
def calculate_sum(a: int, b: int) -> int:
    """Calculate the sum of two numbers"""
    return a + b

@server.tool()
def calculate_product(a: int, b: int) -> int:
    """Calculate the product of two numbers"""
    return a * b

@server.tool()
def get_server_info() -> dict:
    """Get information about this MCP server"""
    return {
        "server_name": "example-stdio-server",
        "version": "1.0.0",
        "transport": "stdio",
        "capabilities": ["tools"]
    }
```

### Étape 3 : Lancer le serveur

Sauvegardez le code sous `server.py` et lancez-le depuis la ligne de commande :

```bash
python server.py
```

Le serveur démarrera et attendra des entrées depuis stdin. Il communique avec des messages JSON-RPC via le transport stdio.

### Étape 4 : Tester avec l’Inspector

Vous pouvez tester votre serveur en utilisant le MCP Inspector :

1. Installez l’Inspector : `npx @modelcontextprotocol/inspector`
2. Lancez l’Inspector et pointez-le vers votre serveur
3. Testez les outils que vous avez créés

### .NET

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddMcpServer();
 ```


## Déboguer votre serveur stdio

### Utilisation du MCP Inspector

Le MCP Inspector est un outil précieux pour déboguer et tester les serveurs MCP. Voici comment l’utiliser avec votre serveur stdio :

1. **Installer l’Inspector** :
   ```bash
   npx @modelcontextprotocol/inspector
   ```

2. **Lancer l’Inspector** :
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

3. **Tester votre serveur** : L’Inspector fournit une interface web où vous pouvez :
   - Voir les capacités du serveur
   - Tester les outils avec différents paramètres
   - Surveiller les messages JSON-RPC
   - Déboguer les problèmes de connexion

### Utilisation de VS Code

Vous pouvez aussi déboguer votre serveur MCP directement dans VS Code :

1. Créez une configuration de lancement dans `.vscode/launch.json` :
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug MCP Server",
         "type": "python",
         "request": "launch",
         "program": "server.py",
         "console": "integratedTerminal"
       }
     ]
   }
   ```

2. Placez des points d’arrêt dans votre code serveur
3. Lancez le débogueur et testez avec l’Inspector

### Conseils courants de débogage

- Utilisez `stderr` pour la journalisation - n’écrivez jamais dans `stdout` car il est réservé aux messages MCP
- Assurez-vous que tous les messages JSON-RPC sont délimités par des nouvelles lignes
- Testez d’abord avec des outils simples avant d’ajouter des fonctionnalités complexes
- Utilisez l’Inspector pour vérifier les formats des messages

## Consommer votre serveur stdio dans VS Code

Une fois votre serveur MCP stdio construit, vous pouvez l’intégrer à VS Code pour l’utiliser avec Claude ou d’autres clients compatibles MCP.

### Configuration

1. **Créez un fichier de configuration MCP** à `%APPDATA%\Claude\claude_desktop_config.json` (Windows) ou `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) :

   ```json
   {
     "mcpServers": {
       "example-stdio-server": {
         "command": "python",
         "args": ["path/to/your/server.py"]
       }
     }
   }
   ```

2. **Redémarrez Claude** : Fermez et rouvrez Claude pour charger la nouvelle configuration serveur.

3. **Testez la connexion** : Démarrez une conversation avec Claude et essayez d’utiliser les outils de votre serveur :
   - "Peux-tu me saluer avec l’outil de salutation ?"
   - "Calcule la somme de 15 et 27"
   - "Quelles sont les infos du serveur ?"

### Exemple de serveur stdio TypeScript

Voici un exemple complet en TypeScript à titre de référence :

```typescript
#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "example-stdio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Ajouter des outils
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_greeting",
        description: "Get a personalized greeting",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_greeting") {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${request.params.arguments?.name}! Welcome to MCP stdio server.`,
        },
      ],
    };
  } else {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch(console.error);
```

### Exemple de serveur stdio .NET

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddMcpServer()
    .WithStdioServerTransport()
    .WithTools<Tools>();

var app = builder.Build();
await app.RunAsync();

[McpServerToolType]
public class Tools
{
    [McpServerTool, Description("Get a personalized greeting")]
    public string GetGreeting(string name)
    {
        return $"Hello, {name}! Welcome to MCP stdio server.";
    }

    [McpServerTool, Description("Calculate the sum of two numbers")]
    public int CalculateSum(int a, int b)
    {
        return a + b;
    }
}
```

## Résumé

Dans cette leçon mise à jour, vous avez appris à :

- Construire des serveurs MCP en utilisant le **transport stdio** actuel (approche recommandée)
- Comprendre pourquoi le transport SSE a été déprécié au profit de stdio et Streamable HTTP
- Créer des outils pouvant être appelés par des clients MCP
- Déboguer votre serveur avec le MCP Inspector
- Intégrer votre serveur stdio avec VS Code et Claude

Le transport stdio offre une manière plus simple, plus sécurisée et plus performante de construire des serveurs MCP par rapport à l’approche SSE dépréciée. C’est le transport recommandé pour la plupart des implémentations de serveurs MCP selon la spécification du 2025-06-18.

### .NET

1. Créons d’abord quelques outils, pour cela, créons un fichier *Tools.cs* avec le contenu suivant :

  ```csharp
  using System.ComponentModel;
  using System.Text.Json;
  using ModelContextProtocol.Server;
  ```


## Exercice : Tester votre serveur stdio

Maintenant que vous avez construit votre serveur stdio, testons-le pour nous assurer qu’il fonctionne correctement.

### Prérequis

1. Assurez-vous d’avoir installé le MCP Inspector :
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. Votre code serveur devrait être sauvegardé (par exemple sous `server.py`)

### Test avec l’Inspector

1. **Démarrez l’Inspector avec votre serveur** :
   ```bash
   npx @modelcontextprotocol/inspector python server.py
   ```

2. **Ouvrez l’interface web** : L’Inspector ouvrira une fenêtre de navigateur affichant les capacités de votre serveur.

3. **Testez les outils** : 
   - Essayez l’outil `get_greeting` avec différents noms
   - Testez l’outil `calculate_sum` avec différents nombres
   - Appelez l’outil `get_server_info` pour voir les métadonnées du serveur

4. **Surveillez la communication** : L’Inspector affiche les messages JSON-RPC échangés entre client et serveur.

### Ce que vous devriez voir

Quand votre serveur démarre correctement, vous devriez voir :
- Les capacités du serveur listées dans l’Inspector
- Les outils disponibles pour les tests
- Des échanges de messages JSON-RPC réussis
- Les réponses des outils affichées dans l’interface

### Problèmes communs et solutions

**Le serveur ne démarre pas :**
- Vérifiez que toutes les dépendances sont installées : `pip install mcp`
- Contrôlez la syntaxe Python et les indentations
- Recherchez des messages d’erreur dans la console

**Outils non affichés :**
- Assurez-vous que les décorateurs `@server.tool()` sont présents
- Vérifiez que les fonctions des outils sont définies avant `main()`
- Confirmez que le serveur est correctement configuré

**Problèmes de connexion :**
- Assurez-vous que le serveur utilise bien le transport stdio
- Vérifiez qu’aucun autre processus ne perturbe la communication
- Contrôlez la syntaxe de la commande Inspector

## Devoir

Essayez d’ajouter plus de capacités à votre serveur. Consultez [cette page](https://api.chucknorris.io/) pour, par exemple, ajouter un outil qui appelle une API. Décidez vous-même de la forme que doit prendre votre serveur. Amusez-vous :)

## Solution

[Solution](./solution/README.md) Voici une solution possible avec un code fonctionnel.

## Points clés à retenir

Les points clés de ce chapitre sont les suivants :

- Le transport stdio est le mécanisme recommandé pour les serveurs MCP locaux.
- Le transport stdio permet une communication fluide entre les serveurs et clients MCP via les flux d’entrée et sortie standard.
- Vous pouvez utiliser à la fois Inspector et Visual Studio Code pour consommer directement les serveurs stdio, ce qui facilite le débogage et l’intégration.

## Exemples

- [Calculatrice Java](../samples/java/calculator/README.md)
- [Calculatrice .Net](../../../../03-GettingStarted/samples/csharp)
- [Calculatrice JavaScript](../samples/javascript/README.md)
- [Calculatrice TypeScript](../samples/typescript/README.md)
- [Calculatrice Python](../../../../03-GettingStarted/samples/python)

## Ressources supplémentaires

- [SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

## Et après ?

## Prochaines étapes

Maintenant que vous savez construire des serveurs MCP avec le transport stdio, vous pouvez explorer des sujets plus avancés :

- **Suivant** : [Streaming HTTP avec MCP (Streamable HTTP)](../06-http-streaming/README.md) - Apprenez l’autre mécanisme de transport supporté pour les serveurs distants
- **Avancé** : [Bonnes pratiques de sécurité MCP](../../02-Security/README.md) - Mettez en œuvre la sécurité dans vos serveurs MCP
- **Production** : [Stratégies de déploiement](../09-deployment/README.md) - Déployez vos serveurs en production

## Ressources supplémentaires

- [Spécification MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/) - Spécification officielle
- [Documentation SDK MCP](https://github.com/modelcontextprotocol/sdk) - Références SDK pour tous les langages
- [Exemples communautaires](../../06-CommunityContributions/README.md) - Plus d’exemples de serveurs provenant de la communauté

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->