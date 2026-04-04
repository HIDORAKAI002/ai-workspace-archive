# Débogage avec MCP Inspector

Le **MCP Inspector** est un outil de débogage essentiel qui vous permet de tester et de dépanner vos serveurs MCP de manière interactive sans avoir besoin d'une application hôte IA complète. Considérez-le comme le "Postman pour MCP" - il offre une interface visuelle pour envoyer des requêtes, voir les réponses et comprendre comment votre serveur se comporte.

## Pourquoi utiliser MCP Inspector ?

Lors de la création de serveurs MCP, vous rencontrerez souvent ces défis :

- **« Mon serveur fonctionne-t-il vraiment ? »** - Inspector affiche le statut de la connexion
- **« Mes outils sont-ils correctement enregistrés ? »** - Inspector liste tous les outils disponibles
- **« Quel est le format de réponse ? »** - Inspector affiche les réponses JSON complètes
- **« Pourquoi cet outil ne fonctionne-t-il pas ? »** - Inspector affiche des messages d'erreur détaillés

## Pré-requis

- Node.js 18+ installé
- npm (fourni avec Node.js)
- Un serveur MCP à tester (voir [Module 3.1 - Premier serveur](../01-first-server/README.md))

## Installation

### Option 1 : Lancer avec npx (Recommandé pour un test rapide)

```bash
npx @modelcontextprotocol/inspector
```

### Option 2 : Installer globalement

```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector
```

### Option 3 : Ajouter à votre projet

```bash
cd your-mcp-server-project
npm install --save-dev @modelcontextprotocol/inspector
```

Ajouter dans `package.json` :
```json
{
  "scripts": {
    "inspector": "mcp-inspector"
  }
}
```

---

## Connexion à votre serveur

### Serveurs stdio (Processus local)

Pour les serveurs qui communiquent via entrée/sortie standard :

```bash
# Serveur Python
npx @modelcontextprotocol/inspector python -m your_server_module

# Serveur Node.js
npx @modelcontextprotocol/inspector node ./build/index.js

# Avec des variables d'environnement
OPENAI_API_KEY=xxx npx @modelcontextprotocol/inspector python server.py
```

### Serveurs SSE/HTTP (Réseau)

Pour les serveurs fonctionnant en tant que services HTTP :

1. Démarrez d'abord votre serveur :
   ```bash
   python server.py  # Serveur en cours d'exécution sur http://localhost:8080
   ```

2. Lancez Inspector et connectez-vous :
   ```bash
   npx @modelcontextprotocol/inspector --sse http://localhost:8080/sse
   ```

---

## Vue d'ensemble de l'interface Inspector

Lorsque Inspector démarre, vous verrez une interface web (généralement à `http://localhost:5173`) :

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Inspector                              [Connected ✅]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   🔧 Tools  │  │ 📄 Resources│  │ 💬 Prompts  │         │
│  │    (3)      │  │    (2)      │  │    (1)      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📋 Message Log                                       │ │
│  │  ─────────────────────────────────────────────────── │ │
│  │  → initialize                                         │ │
│  │  ← initialized (server info)                          │ │
│  │  → tools/list                                         │ │
│  │  ← tools (3 tools)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Test des outils

### Lister les outils disponibles

1. Cliquez sur l'onglet **Tools**
2. Inspector appelle automatiquement `tools/list`
3. Vous verrez tous les outils enregistrés avec :
   - Nom de l'outil
   - Description
   - Schéma d'entrée (paramètres)

### Appeler un outil

1. Sélectionnez un outil dans la liste
2. Remplissez les paramètres requis dans le formulaire
3. Cliquez sur **Run Tool**
4. Consultez la réponse dans le panneau des résultats

**Exemple : Tester un outil calculatrice**

```
Tool: add
Parameters:
  a: 25
  b: 17

Response:
{
  "content": [
    {
      "type": "text",
      "text": "42"
    }
  ]
}
```

### Déboguer les erreurs d'outil

Lorsqu'un outil échoue, Inspector affiche :

```
Error Response:
{
  "error": {
    "code": -32602,
    "message": "Invalid params: 'b' is required"
  }
}
```

Codes d'erreur courants :
| Code | Signification |
|------|--------------|
| -32700 | Erreur de parsing (JSON invalide) |
| -32600 | Requête invalide |
| -32601 | Méthode non trouvée |
| -32602 | Paramètres invalides |
| -32603 | Erreur interne |

---

## Test des ressources

### Lister les ressources

1. Cliquez sur l'onglet **Resources**
2. Inspector appelle `resources/list`
3. Vous verrez :
   - URI des ressources
   - Noms et descriptions
   - Types MIME

### Lire une ressource

1. Sélectionnez une ressource
2. Cliquez sur **Read Resource**
3. Visualisez le contenu retourné

**Exemple de sortie :**

```
Resource: file:///config/settings.json
Content-Type: application/json

{
  "config": {
    "debug": true,
    "maxConnections": 10
  }
}
```

---

## Test des prompts

### Lister les prompts

1. Cliquez sur l'onglet **Prompts**
2. Inspector appelle `prompts/list`
3. Visualisez les modèles de prompt disponibles

### Obtenir un prompt

1. Sélectionnez un prompt
2. Remplissez les arguments requis
3. Cliquez sur **Get Prompt**
4. Voyez les messages de prompt rendus

---

## Analyse du journal des messages

Le journal des messages affiche tous les messages du protocole MCP :

```
14:32:01 → {"jsonrpc":"2.0","id":1,"method":"initialize",...}
14:32:01 ← {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25",...}}
14:32:02 → {"jsonrpc":"2.0","id":2,"method":"tools/list"}
14:32:02 ← {"jsonrpc":"2.0","id":2,"result":{"tools":[...]}}
14:32:05 → {"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"add",...}}
14:32:05 ← {"jsonrpc":"2.0","id":3,"result":{"content":[...]}}
```

### Points à surveiller

- **Paires requête/réponse** : Chaque `→` doit avoir un `←` correspondant
- **Messages d'erreur** : Cherchez `"error"` dans les réponses
- **Timing** : De grandes pauses peuvent indiquer des problèmes de performance
- **Version du protocole** : Assurez-vous que serveur et client sont d'accord sur la version

---

## Intégration VS Code

Vous pouvez lancer Inspector directement depuis VS Code :

### Utilisation de launch.json

Ajoutez à `.vscode/launch.json` :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with MCP Inspector",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "@modelcontextprotocol/inspector",
        "python",
        "${workspaceFolder}/server.py"
      ],
      "console": "integratedTerminal"
    },
    {
      "name": "Debug SSE Server with Inspector",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "preLaunchTask": "Start MCP Inspector"
    }
  ]
}
```

### Utilisation des Tasks

Ajoutez à `.vscode/tasks.json` :

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npx @modelcontextprotocol/inspector node ${workspaceFolder}/build/index.js",
      "isBackground": true,
      "problemMatcher": {
        "pattern": {
          "regexp": "^$"
        },
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Inspector",
          "endsPattern": "listening"
        }
      }
    }
  ]
}
```

---

## Scénarios courants de débogage

### Scénario 1 : Le serveur ne se connecte pas

**Symptômes :** Inspector affiche « Disconnected » ou reste bloqué sur « Connecting... »

**Liste de vérification :**
1. ✅ La commande du serveur est-elle correcte ?
2. ✅ Toutes les dépendances sont-elles installées ?
3. ✅ Le chemin du serveur est-il absolu ou relatif au répertoire courant ?
4. ✅ Les variables d'environnement requises sont-elles définies ?

**Étapes de débogage :**
```bash
# Tester le serveur manuellement d'abord
python -c "import your_server_module; print('OK')"

# Vérifier les erreurs d'importation
python -m your_server_module 2>&1 | head -20

# Vérifier que le SDK MCP est installé
pip show mcp
```

### Scénario 2 : Outils non affichés

**Symptômes :** L'onglet Tools affiche une liste vide

**Causes possibles :**
1. Outils non enregistrés lors de l'initialisation du serveur
2. Serveur planté après le démarrage
3. Le gestionnaire `tools/list` renvoie un tableau vide

**Étapes de débogage :**
1. Vérifiez le journal des messages pour la réponse `tools/list`
2. Ajoutez des logs dans votre code d'enregistrement d'outils
3. Vérifiez la présence des décorateurs `@mcp.tool()` (Python)

### Scénario 3 : L'outil retourne une erreur

**Symptômes :** L'appel à l'outil retourne une réponse d'erreur

**Approche de débogage :**
1. Lisez attentivement le message d'erreur
2. Vérifiez que les types de paramètres correspondent au schéma
3. Ajoutez des blocs try/catch avec des messages d'erreur détaillés
4. Consultez les logs du serveur pour les traces de pile

**Exemple d'amélioration de la gestion des erreurs :**

```python
@mcp.tool()
async def my_tool(param1: str, param2: int) -> str:
    try:
        # Logique de l'outil ici
        result = process(param1, param2)
        return str(result)
    except ValueError as e:
        raise McpError(f"Invalid parameter: {e}")
    except Exception as e:
        raise McpError(f"Tool failed: {type(e).__name__}: {e}")
```

### Scénario 4 : Contenu de la ressource vide

**Symptômes :** La ressource retourne mais le contenu est vide ou nul

**Liste de vérification :**
1. ✅ Le chemin du fichier ou l'URI est correct
2. ✅ Le serveur a la permission de lire la ressource
3. ✅ Le contenu de la ressource est correctement renvoyé

---

## Fonctionnalités avancées d'Inspector

### En-têtes personnalisés (SSE)

```bash
npx @modelcontextprotocol/inspector \
  --sse http://localhost:8080/sse \
  --header "Authorization: Bearer your-token"
```

### Journalisation détaillée

```bash
DEBUG=mcp* npx @modelcontextprotocol/inspector python server.py
```

### Enregistrement des sessions

Inspector peut exporter les journaux des messages pour une analyse ultérieure :
1. Cliquez sur **Export Log** dans le panneau des messages
2. Sauvegardez le fichier JSON
3. Partagez avec les membres de l'équipe pour le débogage

---

## Bonnes pratiques

1. **Testez tôt et souvent** - Utilisez Inspector pendant le développement, pas seulement quand ça casse
2. **Commencez simple** - Testez la connectivité basique avant d'appeler des outils complexes
3. **Vérifiez le schéma** - Beaucoup d'erreurs viennent d'incompatibilités de types de paramètres
4. **Lisez les messages d'erreur** - Les erreurs MCP sont généralement explicites
5. **Gardez Inspector ouvert** - Il aide à détecter les problèmes en cours de développement

---

## Et après ?

Vous avez terminé le Module 3 : Premiers pas ! Continuez votre apprentissage :

- [Module 4 : Mise en œuvre pratique](../../04-PracticalImplementation/README.md)

---

## Ressources supplémentaires

- [Dépôt GitHub MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Spécification MCP - Messages du protocole](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Spécification JSON-RPC 2.0](https://www.jsonrpc.org/specification)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçons d’assurer l’exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source faisant foi. Pour les informations critiques, une traduction professionnelle réalisée par un humain est recommandée. Nous déclinons toute responsabilité en cas de malentendus ou d’interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->