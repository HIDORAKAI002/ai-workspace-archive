# 🔧 Module 3 : Développement MCP Avancé avec Microsoft Foundry Toolkit

![Durée](https://img.shields.io/badge/Duration-20_minutes-blue?style=flat-square)
![Microsoft Foundry Toolkit](https://img.shields.io/badge/Microsoft_Foundry_Toolkit-Required-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.3-purple?style=flat-square)
![Inspector](https://img.shields.io/badge/MCP_Inspector-0.14.0-blue?style=flat-square)

## 🎯 Objectifs d'apprentissage

À la fin de ce labo, vous serez capable de :

- ✅ Créer des serveurs MCP personnalisés avec Microsoft Foundry Toolkit
- ✅ Configurer et utiliser le dernier SDK Python MCP (v1.9.3)
- ✅ Mettre en place et utiliser MCP Inspector pour le débogage
- ✅ Déboguer des serveurs MCP dans les environnements Agent Builder et Inspector
- ✅ Comprendre les workflows avancés de développement serveur MCP

## 📋 Prérequis

- Avoir complété le Labo 2 (Fondamentaux MCP)
- VS Code avec l’extension Microsoft Foundry Toolkit installée
- Environnement Python 3.10+
- Node.js et npm pour la configuration de l’Inspector

## 🏗️ Ce que vous allez construire

Dans ce labo, vous créerez un **Serveur MCP Météo** qui démontre :
- L’implémentation d’un serveur MCP personnalisé
- L’intégration avec Microsoft Foundry Toolkit Agent Builder
- Des workflows de débogage professionnels
- L’utilisation moderne du SDK MCP

---

## 🔧 Vue d’ensemble des composants principaux

### 🐍 SDK Python MCP
Le SDK Python du protocole Model Context fournit la base pour construire des serveurs MCP personnalisés. Vous utiliserez la version 1.9.3 avec des capacités de débogage améliorées.

### 🔍 MCP Inspector
Un outil puissant de débogage qui fournit :
- Surveillance en temps réel du serveur
- Visualisation de l’exécution des outils
- Inspection des requêtes/réponses réseau
- Environnement de test interactif

---

## 📖 Mise en œuvre étape par étape

### Étape 1 : Créer un WeatherAgent dans Agent Builder

1. **Lancez Agent Builder** dans VS Code via l’extension Microsoft Foundry Toolkit
2. **Créez un nouvel agent** avec la configuration suivante :
   - Nom de l’agent : `WeatherAgent`

![Création d’agent](../../../../translated_images/fr/Agent.c9c33f6a412b4cde.webp)

### Étape 2 : Initialiser le projet MCP Server

1. **Allez dans Outils** → **Ajouter un outil** dans Agent Builder
2. **Sélectionnez "MCP Server"** parmi les options disponibles
3. **Choisissez "Créer un nouveau MCP Server"**
4. **Sélectionnez le template `python-weather`**
5. **Nommez votre serveur :** `weather_mcp`

![Sélection du template Python](../../../../translated_images/fr/Pythontemplate.9d0a2913c6491500.webp)

### Étape 3 : Ouvrir et examiner le projet

1. **Ouvrez le projet généré** dans VS Code
2. **Passez en revue la structure du projet :**
   ```
   weather_mcp/
   ├── src/
   │   ├── __init__.py
   │   └── server.py
   ├── inspector/
   │   ├── package.json
   │   └── package-lock.json
   ├── .vscode/
   │   ├── launch.json
   │   └── tasks.json
   ├── pyproject.toml
   └── README.md
   ```

### Étape 4 : Mettre à jour vers le dernier SDK MCP

> **🔍 Pourquoi mettre à jour ?** Nous souhaitons utiliser le dernier SDK MCP (v1.9.3) et le service Inspector (0.14.0) pour des fonctionnalités améliorées et un meilleur débogage.

#### 4a. Mettre à jour les dépendances Python

**Modifiez `pyproject.toml` :** mettez à jour [./code/weather_mcp/pyproject.toml](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/pyproject.toml)


#### 4b. Mettre à jour la configuration de l’Inspector

**Modifiez `inspector/package.json` :** mettez à jour [./code/weather_mcp/inspector/package.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package.json)

#### 4c. Mettre à jour les dépendances de l’Inspector

**Modifiez `inspector/package-lock.json` :** mettez à jour [./code/weather_mcp/inspector/package-lock.json](../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/inspector/package-lock.json)

> **📝 Remarque :** Ce fichier contient des définitions de dépendances étendues. Ci-dessous, la structure essentielle - le contenu complet garantit une résolution correcte des dépendances.


> **⚡ Package Lock complet :** Le package-lock.json complet contient environ 3000 lignes de définitions de dépendances. Ce qui précède montre la structure clé - utilisez le fichier fourni pour une résolution complète.

### Étape 5 : Configurer le débogage dans VS Code

*Note : Veuillez copier le fichier dans le chemin spécifié pour remplacer le fichier local correspondant*

#### 5a. Mettre à jour la configuration de lancement

**Modifiez `.vscode/launch.json` :**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Local MCP",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen",
      "postDebugTask": "Terminate All Tasks"
    },
    {
      "name": "Launch Inspector (Edge)",
      "type": "msedge",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Launch Inspector (Chrome)",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:6274?timeout=60000&serverUrl=http://localhost:3001/sse#tools",
      "cascadeTerminateToConfigurations": [
        "Attach to Local MCP"
      ],
      "presentation": {
        "hidden": true
      },
      "internalConsoleOptions": "neverOpen"
    }
  ],
  "compounds": [
    {
      "name": "Debug in Agent Builder",
      "configurations": [
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Open Agent Builder",
    },
    {
      "name": "Debug in Inspector (Edge)",
      "configurations": [
        "Launch Inspector (Edge)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    },
    {
      "name": "Debug in Inspector (Chrome)",
      "configurations": [
        "Launch Inspector (Chrome)",
        "Attach to Local MCP"
      ],
      "preLaunchTask": "Start MCP Inspector",
      "stopAll": true
    }
  ]
}
```

**Modifiez `.vscode/tasks.json` :**

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start MCP Server",
      "type": "shell",
      "command": "python -m debugpy --listen 127.0.0.1:5678 src/__init__.py sse",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}",
        "env": {
          "PORT": "3001"
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": ".*",
          "endsPattern": "Application startup complete|running"
        }
      }
    },
    {
      "label": "Start MCP Inspector",
      "type": "shell",
      "command": "npm run dev:inspector",
      "isBackground": true,
      "options": {
        "cwd": "${workspaceFolder}/inspector",
        "env": {
          "CLIENT_PORT": "6274",
          "SERVER_PORT": "6277",
        }
      },
      "problemMatcher": {
        "pattern": [
          {
            "regexp": "^.*$",
            "file": 0,
            "location": 1,
            "message": 2
          }
        ],
        "background": {
          "activeOnStart": true,
          "beginsPattern": "Starting MCP inspector",
          "endsPattern": "Proxy server listening on port"
        }
      },
      "dependsOn": [
        "Start MCP Server"
      ]
    },
    {
      "label": "Open Agent Builder",
      "type": "shell",
      "command": "echo ${input:openAgentBuilder}",
      "presentation": {
        "reveal": "never"
      },
      "dependsOn": [
        "Start MCP Server"
      ],
    },
    {
      "label": "Terminate All Tasks",
      "command": "echo ${input:terminate}",
      "type": "shell",
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "openAgentBuilder",
      "type": "command",
      "command": "ai-mlstudio.agentBuilder",
      "args": {
        "initialMCPs": [ "local-server-weather_mcp" ],
        "triggeredFrom": "vsc-tasks"
      }
    },
    {
      "id": "terminate",
      "type": "command",
      "command": "workbench.action.tasks.terminate",
      "args": "terminateAll"
    }
  ]
}
```


---

## 🚀 Exécution et test de votre serveur MCP

### Étape 6 : Installer les dépendances

Après avoir fait les modifications de configuration, exécutez les commandes suivantes :

**Installer les dépendances Python :**
```bash
uv sync
```

**Installer les dépendances de l’Inspector :**
```bash
cd inspector
npm install
```

### Étape 7 : Déboguer avec Agent Builder

1. **Appuyez sur F5** ou utilisez la configuration **"Debug in Agent Builder"**
2. **Sélectionnez la configuration composée** dans le panneau de débogage
3. **Attendez que le serveur démarre** et que Agent Builder s’ouvre
4. **Testez votre serveur MCP météo** avec des requêtes en langage naturel

Saisissez une invite comme ceci

SYSTEM_PROMPT

```
You are my weather assistant
```

USER_PROMPT

```
How's the weather like in Seattle
```

![Résultat du débogage dans Agent Builder](../../../../translated_images/fr/Result.6ac570f7d2b1d538.webp)

### Étape 8 : Déboguer avec MCP Inspector

1. **Utilisez la configuration "Debug in Inspector"** (Edge ou Chrome)
2. **Ouvrez l’interface Inspector** à `http://localhost:6274`
3. **Explorez l’environnement de test interactif :**
   - Visualisez les outils disponibles
   - Testez l’exécution des outils
   - Surveillez les requêtes réseau
   - Déboguez les réponses du serveur

![Interface MCP Inspector](../../../../translated_images/fr/Inspector.5672415cd02fe873.webp)

---

## 🎯 Résultats clés de l’apprentissage

En complétant ce labo, vous avez :

- [x] **Créé un serveur MCP personnalisé** en utilisant les templates Microsoft Foundry Toolkit
- [x] **Mis à niveau vers le dernier SDK MCP** (v1.9.3) pour des fonctionnalités améliorées
- [x] **Configuré des workflows de débogage professionnels** pour Agent Builder et Inspector
- [x] **Mis en place MCP Inspector** pour des tests interactifs de serveur
- [x] **Maîtrisé les configurations de débogage VS Code** pour le développement MCP

## 🔧 Fonctionnalités avancées explorées

| Fonctionnalité                  | Description                     | Cas d’utilisation                |
|--------------------------------|--------------------------------|---------------------------------|
| **SDK Python MCP v1.9.3**      | Dernière implémentation du protocole | Développement serveur moderne   |
| **MCP Inspector 0.14.0**       | Outil de débogage interactif   | Tests serveur en temps réel      |
| **Débogage VS Code**            | Environnement de développement intégré | Workflow professionnel de débogage |
| **Intégration Agent Builder**  | Connexion directe Microsoft Foundry Toolkit | Tests agents de bout en bout     |

## 📚 Ressources supplémentaires

- [Documentation MCP Python SDK](https://modelcontextprotocol.io/docs/sdk/python)
- [Guide de l’extension Microsoft Foundry Toolkit](https://code.visualstudio.com/docs/ai/ai-toolkit)
- [Documentation du débogage VS Code](https://code.visualstudio.com/docs/editor/debugging)
- [Spécification Model Context Protocol](https://modelcontextprotocol.io/docs/concepts/architecture)

---

**🎉 Félicitations !** Vous avez terminé avec succès le Labo 3 et pouvez désormais créer, déboguer et déployer des serveurs MCP personnalisés en utilisant des workflows professionnels de développement.

### 🔜 Poursuivez vers le module suivant

Prêt à appliquer vos compétences MCP dans un workflow de développement réel ? Continuez vers **[Module 4 : Développement MCP Pratique - Serveur Clone GitHub Personnalisé](../lab4/README.md)** où vous allez :
- Construire un serveur MCP prêt pour la production qui automatise les opérations de dépôt GitHub
- Implémenter la fonctionnalité de clonage de dépôt GitHub via MCP
- Intégrer des serveurs MCP personnalisés avec VS Code et GitHub Copilot Agent Mode
- Tester et déployer des serveurs MCP personnalisés en environnement de production
- Apprendre l’automatisation pratique des workflows pour développeurs

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->