# Weather MCP Server

Ceci est un serveur MCP exemple en Python implémentant des outils météo avec des réponses simulées. Il peut être utilisé comme un modèle pour votre propre serveur MCP. Il inclut les fonctionnalités suivantes :

- **Outil Météo** : Un outil qui fournit des informations météorologiques simulées basées sur le lieu donné.
- **Outil Git Clone** : Un outil qui clone un dépôt git dans un dossier spécifié.
- **Outil Ouverture VS Code** : Un outil qui ouvre un dossier dans VS Code ou VS Code Insiders.
- **Connexion à Agent Builder** : Une fonctionnalité qui vous permet de connecter le serveur MCP à Agent Builder pour les tests et le débogage.
- **Débogage dans [MCP Inspector](https://github.com/modelcontextprotocol/inspector)** : Une fonctionnalité qui permet de déboguer le serveur MCP à l'aide de MCP Inspector.

## Commencer avec le modèle Weather MCP Server

> **Prérequis**
>
> Pour exécuter le serveur MCP sur votre machine de développement locale, vous aurez besoin de :
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Requis pour l’outil git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) ou [VS Code Insiders](https://code.visualstudio.com/insiders/) (Requis pour l’outil open_in_vscode)
> - (*Optionnel - si vous préférez uv*) [uv](https://github.com/astral-sh/uv)
> - [Extension Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Préparer l’environnement

Il y a deux approches pour configurer l’environnement pour ce projet. Vous pouvez choisir celle que vous préférez.

> Note : Rechargez VSCode ou le terminal pour vous assurer que le python de l’environnement virtuel est utilisé après la création de cet environnement.

| Approche     | Étapes                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Avec `uv`    | 1. Créez un environnement virtuel : `uv venv` <br>2. Lancez la commande VSCode "***Python : Sélectionner l’interpréteur***" et sélectionnez le python de l’environnement virtuel créé <br>3. Installez les dépendances (incluant les dépendances de dev) : `uv pip install -r pyproject.toml --extra dev` |
| Avec `pip`   | 1. Créez un environnement virtuel : `python -m venv .venv` <br>2. Lancez la commande VSCode "***Python : Sélectionner l’interpréteur***" et sélectionnez le python de l’environnement virtuel créé <br>3. Installez les dépendances (incluant les dépendances de dev) : `pip install -e .[dev]` |

Après avoir configuré l’environnement, vous pouvez exécuter le serveur sur votre machine de développement locale via Agent Builder en tant que client MCP pour démarrer :
1. Ouvrez le panneau de débogage de VS Code. Sélectionnez `Debug in Agent Builder` ou appuyez sur `F5` pour commencer à déboguer le serveur MCP.
2. Utilisez AI Toolkit Agent Builder pour tester le serveur avec [ce prompt](../../../../../../../../../../../open_prompt_builder). Le serveur sera automatiquement connecté à Agent Builder.
3. Cliquez sur `Run` pour tester le serveur avec le prompt.

**Félicitations** ! Vous avez réussi à exécuter le Weather MCP Server sur votre machine de développement locale via Agent Builder en tant que client MCP.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Contenu du template

| Dossier / Fichier | Contenu                                     |
| ----------------- | -------------------------------------------- |
| `.vscode`         | Fichiers VSCode pour le débogage             |
| `.aitk`           | Configurations pour AI Toolkit                |
| `src`             | Le code source pour le serveur météo mcp     |

## Comment déboguer le Weather MCP Server

> Notes :
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) est un outil visuel pour développeurs pour tester et déboguer les serveurs MCP.
> - Tous les modes de débogage supportent les points d’arrêt, vous pouvez donc ajouter des points d’arrêt dans le code d’implémentation des outils.

## Outils Disponibles

### Outil Météo
L’outil `get_weather` fournit des informations météorologiques simulées pour un lieu spécifié.

| Paramètre  | Type   | Description                                |
| ---------- | ------ | ------------------------------------------ |
| `location` | string | Lieu pour lequel obtenir la météo (ex. : nom de ville, état, ou coordonnées) |

### Outil Git Clone
L’outil `git_clone_repo` clone un dépôt git dans un dossier spécifié.

| Paramètre      | Type   | Description                              |
| -------------- | ------ | ---------------------------------------- |
| `repo_url`     | string | URL du dépôt git à cloner               |
| `target_folder`| string | Chemin du dossier où cloner le dépôt   |

L’outil retourne un objet JSON avec :
- `success` : booléen indiquant si l’opération a réussi
- `target_folder` ou `error` : le chemin du dépôt cloné ou un message d’erreur

### Outil Ouverture VS Code
L’outil `open_in_vscode` ouvre un dossier dans l’application VS Code ou VS Code Insiders.

| Paramètre      | Type      | Description                              |
| -------------- | --------- | ---------------------------------------- |
| `folder_path`  | string    | Chemin du dossier à ouvrir              |
| `use_insiders` | booléen (optionnel) | Indique s’il faut utiliser VS Code Insiders au lieu de VS Code standard |

L’outil retourne un objet JSON avec :
- `success` : booléen indiquant si l’opération a réussi
- `message` ou `error` : un message de confirmation ou un message d’erreur

| Mode de Débogage | Description                                                   | Étapes pour déboguer                                                                                                |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Agent Builder    | Déboguez le serveur MCP dans Agent Builder via AI Toolkit.     | 1. Ouvrez le panneau de débogage VS Code. Sélectionnez `Debug in Agent Builder` et appuyez sur `F5` pour commencer à déboguer le serveur MCP.<br>2. Utilisez AI Toolkit Agent Builder pour tester le serveur avec [ce prompt](../../../../../../../../../../../open_prompt_builder). Le serveur sera automatiquement connecté à Agent Builder.<br>3. Cliquez sur `Run` pour tester le serveur avec le prompt. |
| MCP Inspector   | Déboguez le serveur MCP en utilisant MCP Inspector.            | 1. Installez [Node.js](https://nodejs.org/)<br>2. Configurez Inspector : `cd inspector` && `npm install`<br>3. Ouvrez le panneau de débogage VS Code. Sélectionnez `Debug SSE in Inspector (Edge)` ou `Debug SSE in Inspector (Chrome)`. Appuyez sur F5 pour commencer le débogage.<br>4. Lorsque MCP Inspector se lance dans le navigateur, cliquez sur le bouton `Connect` pour connecter ce serveur MCP.<br>5. Ensuite, vous pouvez `List Tools`, sélectionner un outil, saisir des paramètres, et `Run Tool` pour déboguer votre code serveur.<br> |

## Ports par défaut et personnalisations

| Mode de Débogage | Ports                             | Définitions                                  | Personnalisations                                                   | Note |
| ---------------- | -------------------------------- | --------------------------------------------- | ------------------------------------------------------------------ | ----- |
| Agent Builder    | 3001                             | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)              | Modifiez [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) pour changer les ports mentionnés. | N/A  |
| MCP Inspector   | 3001 (Serveur) ; 5173 et 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json)              | Modifiez [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) pour changer les ports mentionnés.  | N/A  |

## Retour d’expérience

Si vous avez des retours ou des suggestions pour ce modèle, merci d’ouvrir une issue sur le [dépôt GitHub AI Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avis de non-responsabilité** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforcions d'assurer l'exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des imprécisions. Le document original dans sa langue d'origine doit être considéré comme la source faisant foi. Pour toute information cruciale, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous déclinons toute responsabilité en cas de malentendus ou de mauvaises interprétations résultant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->