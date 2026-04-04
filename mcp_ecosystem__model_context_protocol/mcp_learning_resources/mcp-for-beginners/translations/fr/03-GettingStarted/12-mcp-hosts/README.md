# Configuration des Clients Hôtes MCP Populaires

Ce guide explique comment configurer et utiliser des serveurs MCP avec des applications hôtes d'IA populaires. Chaque hôte a sa propre méthode de configuration, mais une fois configurés, ils communiquent tous avec les serveurs MCP en utilisant le protocole standardisé.

## Qu'est-ce qu'un Hôte MCP ?

Un **Hôte MCP** est une application d'IA qui peut se connecter à des serveurs MCP pour étendre ses capacités. Pensez-y comme au "front end" avec lequel les utilisateurs interagissent, tandis que les serveurs MCP fournissent les outils et données du "back end".

```mermaid
flowchart LR
    User[👤 Utilisateur] --> Host[🖥️ Hôte MCP]
    Host --> S1[Serveur MCP A]
    Host --> S2[Serveur MCP B]
    Host --> S3[Serveur MCP C]
    
    subgraph "Hôtes Populaires"
        H1[Claude Bureau]
        H2[VS Code]
        H3[Curseur]
        H4[Cline]
        H5[Planche à voile]
    end
```
## Prérequis

- Un serveur MCP auquel se connecter (voir [Module 3.1 - Premier Serveur](../01-first-server/README.md))
- L'application hôte installée sur votre système
- Une familiarité basique avec les fichiers de configuration JSON

---

## 1. Claude Desktop

**Claude Desktop** est l'application officielle de bureau d'Anthropic qui prend en charge nativement MCP.

### Installation

1. Téléchargez Claude Desktop depuis [claude.ai/download](https://claude.ai/download)
2. Installez et connectez-vous avec votre compte Anthropic

### Configuration

Claude Desktop utilise un fichier de configuration JSON pour définir les serveurs MCP.

**Emplacement du fichier de configuration :**
- **macOS** : `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows** : `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux** : `~/.config/Claude/claude_desktop_config.json`

**Exemple de configuration :**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Options de Configuration

| Champ | Description | Exemple |
|-------|-------------|---------|
| `command` | L'exécutable à lancer | `"python"`, `"node"`, `"npx"` |
| `args` | Arguments de la ligne de commande | `["-m", "my_server"]` |
| `env` | Variables d'environnement | `{"API_KEY": "xxx"}` |
| `cwd` | Répertoire de travail | `"/path/to/server"` |

### Tester Votre Configuration

1. Enregistrez le fichier de configuration
2. Redémarrez complètement Claude Desktop (quitter puis rouvrir)
3. Ouvrez une nouvelle conversation
4. Cherchez l'icône 🔌 indiquant les serveurs connectés
5. Essayez de demander à Claude d'utiliser un de vos outils

### Résolution des Problèmes Claude Desktop

**Serveur n'apparaît pas :**
- Vérifiez la syntaxe du fichier de configuration avec un validateur JSON
- Assurez-vous que le chemin de la commande est correct
- Consultez les logs de Claude Desktop : Aide → Afficher les Logs

**Serveur plante au démarrage :**
- Testez votre serveur manuellement dans le terminal en premier
- Vérifiez que les variables d'environnement sont correctement définies
- Assurez-vous que toutes les dépendances sont installées

---

## 2. VS Code avec GitHub Copilot

VS Code prend en charge MCP via les extensions GitHub Copilot Chat.

### Prérequis

1. VS Code 1.99+ installé
2. Extension GitHub Copilot installée
3. Extension GitHub Copilot Chat installée

### Configuration

VS Code utilise `.vscode/mcp.json` dans votre espace de travail ou les paramètres utilisateur.

**Configuration de l'espace de travail** (`.vscode/mcp.json`) :

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**Paramètres utilisateur** (`settings.json`) :

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### Utiliser MCP dans VS Code

1. Ouvrez le panneau Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Tapez `@` pour voir les outils MCP disponibles
3. Utilisez le langage naturel pour invoquer des outils : "Calcule 25 * 48 avec la calculatrice"

### Résolution des Problèmes VS Code

**Les serveurs MCP ne se chargent pas :**
- Vérifiez le panneau Sortie → "MCP" pour les logs d'erreur
- Rechargez la fenêtre : Ctrl+Shift+P → "Développeur : Recharger la fenêtre"
- Vérifiez que le serveur fonctionne seul d'abord

---

## 3. Cursor

**Cursor** est un éditeur de code orienté IA avec prise en charge intégrée de MCP.

### Installation

1. Téléchargez Cursor depuis [cursor.sh](https://cursor.sh)
2. Installez et connectez-vous

### Configuration

Cursor utilise un format de configuration similaire à Claude Desktop.

**Emplacement du fichier de configuration :**
- **macOS** : `~/.cursor/mcp.json`
- **Windows** : `%USERPROFILE%\.cursor\mcp.json`
- **Linux** : `~/.cursor/mcp.json`

**Exemple de configuration :**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Utiliser MCP dans Cursor

1. Ouvrez le chat IA de Cursor (Ctrl+L / Cmd+L)
2. Les outils MCP apparaissent automatiquement dans les suggestions
3. Demandez à l'IA d'exécuter des tâches avec les serveurs connectés

---

## 4. Cline (Basé sur Terminal)

**Cline** est un client MCP basé sur le terminal, idéal pour les flux de travail en ligne de commande.

### Installation

```bash
npm install -g @anthropic/cline
```

### Configuration

Cline utilise des variables d'environnement et des arguments en ligne de commande.

**Utilisation des variables d'environnement :**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Utilisation des arguments en ligne de commande :**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Fichier de configuration** (`~/.clinerc`) :

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Utiliser Cline

```bash
# Démarrer une session interactive
cline

# Requête unique avec MCP
cline "Calculate the square root of 144 using the calculator"

# Lister les outils disponibles
cline --list-tools
```

---

## 5. Windsurf

**Windsurf** est un autre éditeur de code propulsé par l'IA avec prise en charge MCP.

### Installation

1. Téléchargez Windsurf depuis [codeium.com/windsurf](https://codeium.com/windsurf)
2. Installez et créez un compte

### Configuration

La configuration de Windsurf est gérée via l'interface des paramètres :

1. Ouvrez les Paramètres (Ctrl+, / Cmd+,)
2. Cherchez "MCP"
3. Cliquez sur "Modifier dans settings.json"

**Exemple de configuration :**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## Comparaison des Types de Transport

Différents hôtes supportent différents mécanismes de transport :

| Hôte | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (entrée/sortie standard) : Idéal pour les serveurs locaux lancés par l'hôte  
**SSE/HTTP** : Idéal pour les serveurs distants ou partagés entre plusieurs clients

---

## Résolution Commune des Problèmes

### Le serveur ne démarre pas

1. **Testez d'abord le serveur manuellement :**
   ```bash
   # Pour Python
   python -m your_server_module
   
   # Pour Node.js
   node /path/to/server/index.js
   ```

2. **Vérifiez le chemin de la commande :**
   - Utilisez des chemins absolus quand c'est possible
   - Assurez-vous que l'exécutable est dans votre PATH

3. **Vérifiez les dépendances :**
   ```bash
   # Python
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Le serveur se connecte mais les outils ne fonctionnent pas

1. **Vérifiez les logs du serveur** - La plupart des hôtes ont des options de journalisation  
2. **Vérifiez l'enregistrement des outils** - Utilisez MCP Inspector pour tester  
3. **Vérifiez les autorisations** - Certains outils nécessitent un accès fichier/réseau  

### Variables d'environnement non transmises

- Certains hôtes filtrent les variables d'environnement  
- Utilisez explicitement le champ `env` dans la configuration  
- Évitez les données sensibles dans les fichiers de configuration (utilisez la gestion des secrets)  

---

## Bonnes Pratiques de Sécurité

1. **Ne jamais committer les clés API** dans les fichiers de configuration  
2. **Utiliser les variables d'environnement** pour les données sensibles  
3. **Limiter les permissions du serveur** à ce qui est strictement nécessaire  
4. **Examiner le code serveur** avant de donner l'accès à votre système  
5. **Utiliser des listes d'accès** pour le système de fichiers et l'accès réseau  

---

## Et Après ?

- [3.13 - Débogage avec MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Créez votre premier serveur MCP](../01-first-server/README.md)
- [Module 5 - Sujets Avancés](../../05-AdvancedTopics/README.md)

---

## Ressources Supplémentaires

- [Documentation MCP Claude Desktop](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [Extension MCP VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [Spécification MCP - Transports](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Registre Officiel des Serveurs MCP](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avis de non-responsabilité** :  
Ce document a été traduit à l’aide du service de traduction IA [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforctions d’assurer l’exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source faisant autorité. Pour les informations critiques, une traduction réalisée par un professionnel est recommandée. Nous déclinons toute responsabilité en cas de malentendus ou d’interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->