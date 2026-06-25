# Changelog : Programme MCP pour débutants

Ce document sert de registre pour tous les changements importants apportés au programme Model Context Protocol (MCP) pour débutants. Les changements sont documentés par ordre chronologique inverse (les plus récents en premier).

## 24 juin 2026

### Nouvelle leçon : Utilisation du MCP dans l’application Copilot

- [Section Outils](./12-tooling/README.md) Ajout de la section outils.
- [MCP dans l’application Copilot](./12-tooling/01-copilot-app/README.md)

## 16 juin 2026

### Alignement sur la spécification MCP & validation des exemples

Validation du programme par rapport à la **Spécification MCP 2025-11-25** actuelle et aux SDK officiels les plus récents, correction des références obsolètes restantes, et confirmation que les exemples principaux continuent à se construire et s’exécuter.

#### Corrections des versions de spécification (2025-06-18 / 2025-03-26 → 2025-11-25)

Mise à jour des contenus en anglais là où une ancienne révision de la spécification était encore indiquée comme la *norme actuelle/dernière*, et redirection des liens vers les chemins de spécification canoniques `modelcontextprotocol.io` :
- **05-AdvancedTopics/mcp-security/README.md** : Mise à jour de la bannière "Norme actuelle", de l’introduction, du titre des principes clés de sécurité, de la section exigences obligatoires, de la section Microsoft Entra ID, des liens Références & Ressources, ainsi que de la notice de sécurité finale (8 références) à 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md** : Mise à jour du lien vers les ressources supplémentaires et de la bannière "Norme actuelle" à 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md** : Remplacement du lien obsolète `2025-03-26` security-and-trust par la page des bonnes pratiques de sécurité 2025-11-25
- **03-GettingStarted/14-sampling/README.md** : Mise à jour du lien vers la documentation officielle échantillonnage à 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md** : Mise à jour de la référence au présent de "spécification MCP actuelle" et du lien vers les ressources supplémentaires à 2025-11-25 (les notes historiques sur la dépréciation SSE sont laissées intactes pour exactitude)

#### Validation des exemples avec les SDK actuels

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)** : `npm install` a résolu `@modelcontextprotocol/sdk@1.29.0` ; `tsc --noEmit` a réussi sans erreurs de type — les API existantes `McpServer` / `StdioServerTransport` restent valides
- **Python (03-GettingStarted/01-first-server/solution/python)** : Validé dans un `.venv` isolé avec `mcp[cli]` (1.27.2) ; `py_compile` a réussi et `FastMCP.list_tools()` a correctement renvoyé les outils `add` et `subtract`
- Confirmation que toutes les plages de versions `@modelcontextprotocol/sdk` dans les exemples (`>=1.26.0` / `^1.26.0` / `^1.27.0`) résolvent proprement à la version actuelle `1.29.0` sans rupture d’API

#### Alignement du verrouillage des dépendances (fermeture des écarts de version)

Mise à jour des verrous SDK obsolètes afin que chaque exemple suive la version MCP actuelle, conformément à la convention du dépôt :
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json** : Passage de `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` et mise à jour de la description du paquet « mis à jour pour MCP 2025-06-18 » en « aligné avec la spécification MCP 2025-11-25 »
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** et **lab4/code/github_mcp_server/pyproject.toml** : passage du pin précis `mcp==1.23.0` → `mcp>=1.26.0` ; régénération des deux fichiers `uv.lock` (`uv lock`) afin que les lockfiles résolvent à la version actuelle `mcp 1.27.2` et restent synchronisés avec les manifests

#### Analyse des écarts du programme — Couverture des fonctionnalités de la spécification la plus récente

Vérification que le programme couvre déjà toutes les primitives introduites/étendues dans MCP 2025-11-25, aucun manque de contenu identifié :
- **Sampling** : Leçon 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (y compris mode URL)** : Documenté dans 01-CoreConcepts et 05-AdvancedTopics/mcp-protocol-features
- **Roots** : Documenté dans 00-Introduction, 01-CoreConcepts et 05-AdvancedTopics/mcp-root-contexts
- **Tâches (expérimental, opérations longues)** : Documenté dans 01-CoreConcepts et 05-AdvancedTopics/mcp-protocol-features
- **Annotations d’outil** (`readOnlyHint` / `destructiveHint`) : Documenté dans 01-CoreConcepts et 05-AdvancedTopics/mcp-protocol-features

### Renforcement de la sécurité & remédiation des vulnérabilités de dépendances

Passage complet de sécurité sur tous les manifests de dépendances et le code source des exemples, puis résolution de tous les avis npm signalés et une correction au niveau du code. Après correction, `npm audit` signale **0 vulnérabilités** dans chaque répertoire audité.

#### Vulnérabilités des dépendances npm (transitives) — Corrigées

Audit de tous les 15 fichiers `package-lock.json` soumis. Les vulnérabilités étaient limitées aux dépendances transitives entraînées par l’outil MCP Inspector, le client OpenAI, et le SDK MCP ; toutes résolues sans casser les exemples :
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** et **lab3/code/weather_mcp/inspector** : Passage de `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), ce qui a levé les avis sur `ajv`, `brace-expansion`, `diff`, `path-to-regexp` et `ws` inclus. Ajout d’une entrée npm `overrides` forçant le patch `shell-quote@1.8.4` pour éliminer l’avis critique restant porté par `concurrently` ; régénération des deux lockfiles (plus aucune vulnérabilité)
- **03-GettingStarted/samples/typescript** : `npm audit fix` a mis à jour la dépendance transitive `qs` (modérée) vers une version patchée
- **03-GettingStarted/samples/javascript** : `npm audit fix` a mis à jour la dépendance transitive `hono` (modérée) vers une version patchée
- **03-GettingStarted/03-llm-client/solution/typescript** : `npm audit fix` a mis à jour la dépendance transitive `form-data` (importante) vers une version patchée
- **03-GettingStarted/11-simple-auth/solution/typescript** : Génération du fichier manquant `package-lock.json` pour rendre le projet reproductible et vérifiable (0 vulnérabilités)

#### Correction de sécurité au niveau du code (OWASP A03 : Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py** : Suppression de `shell=True` dans l’outil `open_in_vscode`. La commande précédente `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permettait à des métacaractères shell dans un chemin de dossier d’être interprétés par `cmd.exe` (vecteur d’injection de commande). Elle lance maintenant directement l’exécutable `Code.exe` résolu avec le dossier en argument — sans shell —, ce qui est fonctionnellement équivalent et sûr.

#### Audit des dépendances Python

- Audit de tous les ensembles de requirements Python avec `pip-audit`. `05-AdvancedTopics` et `03-GettingStarted/samples/python` n’ont signalé **aucune vulnérabilité connue** (leurs plages `mcp` / `httpx` / `pydantic` / `python-dotenv` résolvent vers des versions patchées actuelles)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt** : `pip-audit` a signalé la dépendance transitive **`werkzeug` 3.1.1** avec trois avis sur `safe_join` liés à un DoS sur noms de périphériques Windows — `CVE-2025-66221`, `CVE-2026-21860`, et `CVE-2026-27199` (tous corrigés en 3.1.6). Ajout d’un verrou de sécurité explicite `werkzeug>=3.1.6` pour résoudre la version patchée ; vérification que la contrainte se résout proprement dans la stack `chainlit` / `mcp` / `semantic-kernel`

### Rebranding des noms de produits

Mise à jour de tout le contenu du programme pour refléter le rebranding produit de Microsoft :

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md** : Mise à jour du lien de la communauté Discord
- **AGENTS.md** : Mise à jour de la référence au serveur Discord
- **README.md** : Mise à jour des références à l’écosystème technologique
- **study_guide.md** : Mise à jour des références aux études de cas
- **05-AdvancedTopics/README.md** : Mise à jour du titre et de la description du Module 5.13
- **05-AdvancedTopics/mcp-integration/README.md** : Mise à jour de l’en-tête et de la description de section
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md** : Mise à jour complète du titre et du contenu du module
- **05-AdvancedTopics/mcp-security-entra/README.md** : Mise à jour du lien de référence croisée
- **07-LessonsfromEarlyAdoption/README.md** : Mise à jour des références aux études de cas
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md** : Mise à jour de l’en-tête de la section 9, des badges et des capacités
- **08-BestPractices/README.md** : Mise à jour du lien de la communauté Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md** : Mise à jour de la référence au canal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md** : Mise à jour de la référence au déploiement de modèle
- **11-MCPServerHandsOnLabs/00-Introduction/README.md** : Mise à jour du tableau des services AI
- **11-MCPServerHandsOnLabs/03-Setup/README.md** : Mise à jour des références ressources

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension pour VS Code
- **README.md** : Mise à jour des références principales du programme
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md** : Mise à jour du titre du module, de l’aperçu et de tous les en-têtes de module
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md** : Mise à jour du titre, objectifs d’apprentissage, instructions d’installation, et ressources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md** : Mise à jour du titre, objectifs, tableau des hôtes MCP, et références croisées
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md** : Mise à jour du titre, badges, prérequis, et ressources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md** : Mise à jour des références Agent Builder et du lien de feedback
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md** : Mise à jour des prérequis et références à l’extension

---

## 11 avril 2026

### Nouvelle leçon, corrections de documentation et mises à jour des dépendances

#### Nouveau contenu ajouté au programme

**Module 05 - Sujets avancés**
- **Leçon 5.17 : Raisonnement multi-agent adversarial avec MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`) : Nouveau guide complet couvrant le modèle de débat adversarial pour les systèmes multi-agents
  - Diagramme d’architecture Mermaid : deux agents → serveur MCP partagé → transcription du débat → juge → verdict
  - Serveur d’outils MCP partagé (`web_search` + `run_python`) implémenté en Python et TypeScript
  - Systèmes de prompts opposés (POUR / CONTRE / Juge) avec exigences explicites d’utilisation d’outils
  - Orchestrateur de débat en Python, TypeScript et C# gérant les rounds et le routage des arguments
  - Câblage MCP `ClientSession` pour l’orchestrateur vers les appels réels d’outils
  - Tableau des cas d’usage (détection d’hallucination, modélisation de menace, révision de conception API, vérification factuelle, sélection technologique)
  - Considérations de sécurité : exécution en bac à sable, validation des appels d’outils, limitation de débit, journalisation d’audit
  - Exercice structuré avec trois scénarios pratiques (revue de code, décision d’architecture, modération de contenu)

#### Corrections de documentation

**Module 03 - Mise en route**
- **05-stdio-server/README.md** : Correction de l’exemple incomplet de serveur stdio TypeScript — ajout de l’instanciation transport manquante (`new StdioServerTransport()`) et de l’appel `server.connect(transport)` pour correspondre aux exemples Python et .NET dans la même section
- **14-sampling/README.md** : Correction de faute de frappe — correction de `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Mises à jour du programme

**README.md principal**
- Ajout de l’entrée 5.17 (Raisonnement multi-agent adversarial avec MCP) dans le tableau du programme avec un lien direct vers la nouvelle leçon

**05-AdvancedTopics/README.md**
- Ajout de la ligne Leçon 5.17 dans le tableau des leçons

**study_guide.md**
- Ajout du sujet Raisonnement multi-agent adversarial dans la carte mentale et la description prose des sujets avancés

#### Corrections de code et sécurité

**Module 05 - Agents adversariaux (`mcp-adversarial-agents`)**
- **Correction de sécurité — injection de commande** : Remplacement de l’interpolation shell `execSync` par `execFile` + `promisify` dans l’outil TypeScript `run_python`, éliminant la surface d’injection de commande (le code contrôlé par LLM est désormais passé comme un élément argv littéral sans interaction shell)
- **Câblage de la boucle de l’outil MCP** : Mise à jour de l’orchestrateur Python du débat pour utiliser le client `AsyncAnthropic` (remplaçant le client synchrone bloquant `Anthropic`), passer une `ClientSession` active directement à chaque tour d’agent, récupérer les définitions d’outils via `session.list_tools()` à chaque tour, et dispatcher les blocs `tool_use` via `session.call_tool()` en boucle jusqu’à ce que le modèle émette une réponse texte finale

#### Mises à jour des dépendances

- Mise à jour de `hono` vers 4.12.12 sur plusieurs packages (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Mise à jour de `@hono/node-server` de 1.19.11 à 1.19.13 dans les packages TypeScript
- Mise à jour de `cryptography` de 46.0.5 à 46.0.7 dans les packages Python (labs 3 et 4 de 10-StreamliningAIWorkflows)
- Mise à jour de `lodash` de 4.17.23 à 4.18.1 dans l’inspecteur 10-StreamliningAIWorkflows

#### Traductions

- Synchronisation des traductions pour plus de 48 langues avec les derniers changements de sources (mise à jour i18n)

---

## 5 février 2026

### Améliorations de la validation et de la navigation à l’échelle du dépôt

#### Nouveau contenu du cursus ajouté

**Module 03 - Premiers pas**  
- **12-mcp-hosts/README.md** : Nouveau guide complet pour la configuration des hôtes MCP  
  - Exemples de configuration pour Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - Modèles de configuration JSON pour tous les principaux hôtes  
  - Tableau comparatif des types de transport (stdio, SSE/HTTP, WebSocket)  
  - Résolution des problèmes courants de connexion  
  - Meilleures pratiques de sécurité pour la configuration des hôtes  

- **13-mcp-inspector/README.md** : Nouveau guide de débogage pour MCP Inspector  
  - Méthodes d’installation (npx, npm global, depuis la source)  
  - Connexion aux serveurs via stdio et HTTP/SSE  
  - Outils de test, ressources et flux de travail de prompts  
  - Intégration VS Code avec MCP Inspector  
  - Scénarios courants de débogage avec solutions  

**Module 04 - Mise en œuvre pratique**  
- **pagination/README.md** : Nouveau guide d’implémentation de la pagination  
  - Modèles de pagination basée sur curseur en Python, TypeScript, Java  
  - Gestion de la pagination côté client  
  - Stratégies de conception des curseurs (opaque vs structuré)  
  - Recommandations d’optimisation des performances  

**Module 05 - Sujets avancés**  
- **mcp-protocol-features/README.md** : Nouveau dossier approfondi sur les fonctionnalités du protocole  
  - Implémentation des notifications de progression  
  - Modèles d’annulation de requêtes  
  - Modèles de ressources avec motifs URI  
  - Gestion du cycle de vie serveur  
  - Contrôle du niveau de journalisation  
  - Modèles de gestion des erreurs avec codes JSON-RPC  

#### Corrections de navigation (plus de 24 fichiers mis à jour)

**README des modules principaux**  
 Lie désormais vers la première leçon ET le module suivant

**Sous-fichiers 02-Security**  
 Tous les 5 documents complémentaires sur la sécurité disposent désormais d’une navigation « Que faire ensuite »

**Fichiers étude de cas 09**  
 Tous les fichiers d’étude de cas disposent désormais d’une navigation séquentielle

**Labs 10-StreamliningAI**  
 Ajout d’une section « Que faire ensuite » à la vue d’ensemble du module 10 et au module 11

#### Corrections de code et de contenu

**Mises à jour SDK et dépendances**  
 Correction de la version openai vide en `^4.95.0`  
 Mise à jour du SDK de `^1.8.0` à `>=1.26.0`  
 Mise à jour des versions mcp bloquées en `>=1.26.0`  

**Corrections de code**  
 Correction du modèle invalide `gpt-4o-mini` en `gpt-4.1-mini`  

**Corrections de contenu**  
 Correction du lien cassé `READMEmd` → `README.md`, correction de l’en-tête du cursus `Module 1-3` → `Module 0-3`, correction du chemin sensible à la casse  
 Suppression du contenu corrompu et dupliqué de l’étude de cas 5  

**Améliorations pour débutants**  
 Ajout d’une introduction appropriée, des objectifs d’apprentissage, et des prérequis pour les débutants

#### Mises à jour du cursus

**README principal**  
- Ajout des entrées 3.12 (Hôtes MCP), 3.13 (Inspecteur MCP), 4.1 (Pagination), 5.16 (Fonctionnalités du protocole) dans le tableau du cursus

**README des modules**  
 Ajout des leçons 12 et 13 à la liste des leçons  
 Ajout de la section Guides pratiques avec un lien vers la pagination  
 Ajout des leçons 5.15 (Transport personnalisé) et 5.16 (Fonctionnalités du protocole)

**study_guide.md**  
- Mise à jour de la carte mentale avec tous les nouveaux sujets : Configuration des hôtes MCP, Inspecteur MCP, Stratégies de pagination, Approfondissement des fonctionnalités du protocole

## 28 janvier 2026

### Revue de conformité à la spécification MCP 2025-11-25

#### Amélioration des concepts fondamentaux (01-CoreConcepts/)  
- **Nouvelle primitive client - Roots** : Ajout d’une documentation complète sur la primitive client Roots, permettant aux serveurs de comprendre les limites du système de fichiers et les permissions d’accès  
- **Annotations d’outils** : Ajout de documentation sur les annotations comportementales d’outil (`readOnlyHint`, `destructiveHint`) pour une meilleure prise de décision d’exécution d’outils  
- **Appel d’outil dans l’échantillonnage** : Mise à jour de la documentation Sampling pour inclure les paramètres `tools` et `toolChoice` pour l’invocation d’outils pilotée par modèle lors des requêtes d’échantillonnage  
- **Élicitation en mode URL** : Ajout d’une documentation sur l’élicitation basée sur URL pour les interactions web externes initiées par serveur  
- **Tâches (Expérimental)** : Ajout d’une nouvelle section documentant la fonctionnalité expérimentale Tâches pour les wrappers d’exécution durables et la récupération différée des résultats  
- **Support des icônes** : Mention que les outils, ressources, modèles de ressources et prompts peuvent désormais inclure des icônes en métadonnées supplémentaires  

#### Mises à jour de la documentation  
- **README.md** : Ajout de la référence à la version MCP Specification 2025-11-25 et explication de la version basée sur la date  
- **study_guide.md** : Mise à jour de la carte du cursus pour inclure Tâches et Annotations d’outil dans la section Concepts fondamentaux ; mise à jour de la date du document  

#### Vérification de conformité à la spécification  
- **Version du protocole** : Vérification que toute la documentation référence la spécification MCP 2025-11-25 actuelle  
- **Alignement de l’architecture** : Confirmation de l’exactitude documentaire de l’architecture à deux couches (Couche données + Couche transport)  
- **Documentation des primitives** : Validation des primitives serveur (Ressources, Prompts, Outils) et primitives client (Sampling, Élicitation, Journalisation, Roots)  
- **Mécanismes de transport** : Vérification de l’exactitude de la documentation sur le transport STDIO et HTTP streamable  
- **Conseils de sécurité** : Confirmation de l’alignement avec la dernière documentation des bonnes pratiques de sécurité MCP  

#### Fonctionnalités clés MCP 2025-11-25 documentées  
- **Découverte OpenID Connect** : Découverte du serveur d’authentification via OIDC  
- **Documents de métadonnées OAuth Client ID** : Mécanisme recommandé d’enregistrement client  
- **JSON Schema 2020-12** : Dialecte par défaut pour les définitions de schéma MCP  
- **Système de niveau SDK** : Exigences formalisées pour le support et la maintenance des fonctionnalités SDK  
- **Structure de gouvernance** : Formalisation des groupes de travail et groupes d’intérêt dans la gouvernance MCP  

### Mise à jour majeure de la documentation de sécurité (02-Security/)

#### Intégration de l’atelier Sherpa MCP Security Summit  
- **Nouvelle ressource de formation pratique** : Intégration complète avec [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) dans toute la documentation sécurité  
- **Couverture de l’itinéraire d’expédition** : Documentation complète de la progression camp à camp du Camp de Base au Sommet  
- **Alignement OWASP** : Toute la documentation de sécurité correspond désormais aux risques OWASP MCP Azure Security Guide  

#### Intégration OWASP MCP Top 10  
- **Nouvelle section** : Ajout du tableau des risques de sécurité OWASP MCP Top 10 avec mitigations Azure dans le README principal Sécurité  
- **Documentation basée sur les risques** : Mise à jour de mcp-security-controls-2025.md avec références aux risques OWASP MCP pour chaque domaine de sécurité  
- **Architecture de référence** : Lien vers l’architecture de référence et les modèles d’implémentation OWASP MCP Azure Security Guide  

#### Fichiers de sécurité mis à jour  
- **README.md** : Ajout de la présentation de l’atelier Sherpa, tableau de progression d’expédition, résumé des risques OWASP MCP Top 10 et section formation pratique  
- **mcp-security-controls-2025.md** : En-tête mis à jour à février 2026, ajouts des références aux risques OWASP (MCP01-MCP08), correction d’incohérences de version  
- **mcp-security-best-practices-2025.md** : Ajout de la section ressources Sherpa et OWASP, mise à jour de la date  
- **mcp-best-practices.md** : Ajout de la section formation pratique avec liens Sherpa et OWASP  
- **azure-content-safety-implementation.md** : Ajout de la référence OWASP MCP06, alignement avec Sherpa Camp 3, et section ressources supplémentaires  

#### Nouveaux liens de ressources ajoutés  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Pages individuelles des risques OWASP MCP (MCP01-MCP10)  

### Alignement de l’ensemble du cursus avec la spécification MCP 2025-11-25

#### Module 03 - Premiers pas  
- **Documentation SDK** : Ajout du SDK Go à la liste officielle des SDK ; mise à jour de toutes les références SDK pour correspondre à la spécification MCP 2025-11-25  
- **Clarification du transport** : Mise à jour des descriptions des transports STDIO et HTTP Streaming avec références explicites à la spécification  

#### Module 04 - Mise en œuvre pratique  
- **Mises à jour SDK** : Ajout du SDK Go ; mise à jour de la liste SDK avec référence à la version de la spécification  
- **Spécification d’autorisation** : Mise à jour du lien vers la spécification MCP Authorization version actuelle 2025-11-25  

#### Module 05 - Sujets avancés  
- **Nouvelles fonctionnalités** : Ajout d’une note concernant les nouvelles fonctionnalités MCP Specification 2025-11-25 (Tâches, Annotations d’outil, Élicitation mode URL, Roots)  
- **Ressources sécurité** : Ajout des liens OWASP MCP Top 10 et atelier Sherpa dans les références supplémentaires  

#### Module 06 - Contributions communautaires  
- **Liste SDK** : Ajout des SDK Swift et Rust ; mise à jour du lien vers la spécification 2025-11-25  
- **Référence spécification** : Mise à jour du lien direct vers la spécification MCP  

#### Module 07 - Enseignements de la première adoption  
- **Mise à jour ressources** : Ajout du lien vers MCP Specification 2025-11-25 et OWASP MCP Top 10 dans les ressources supplémentaires  

#### Module 08 - Bonnes pratiques  
- **Version spec** : Mise à jour de la référence MCP Specification à 2025-11-25  
- **Ressources sécurité** : Ajout des liens OWASP MCP Top 10 et atelier Sherpa dans les références supplémentaires  

#### Module 10 - Optimisation des flux de travail IA  
- **Mise à jour badge** : Changement du badge version MCP de la version SDK (1.9.3) à la version spécification (2025-11-25)  
- **Liens ressources** : Mise à jour du lien vers MCP Specification ; ajout de OWASP MCP Top 10  

#### Module 11 - Labs pratiques serveur MCP  
- **Référence spec** : Mise à jour du lien vers MCP Specification version 2025-11-25  
- **Ressources sécurité** : Ajout de OWASP MCP Top 10 dans les ressources officielles  

## 18 décembre 2025

### Mise à jour de la documentation de sécurité - Spécification MCP 2025-11-25

#### Bonnes pratiques de sécurité MCP (02-Security/mcp-best-practices.md) - Mise à jour de version de spécification  
- **Mise à jour de la version du protocole** : Référencement de la dernière spécification MCP 2025-11-25 (publiée le 25 novembre 2025)  
  - Mise à jour de toutes les références de version de spécification de 2025-06-18 à 2025-11-25  
  - Mise à jour des dates du document de 18 août 2025 à 18 décembre 2025  
  - Vérification que toutes les URLs de spécifications pointent vers la documentation actuelle  
- **Validation de contenu** : Validation complète des bonnes pratiques de sécurité conformément aux standards les plus récents  
  - **Solutions Microsoft Security** : Vérification de la terminologie et des liens actuels pour Prompt Shields (anciennement « détection des risques de jailbreak »), Azure Content Safety, Microsoft Entra ID et Azure Key Vault  
  - **Sécurité OAuth 2.1** : Confirmation de l’alignement avec les meilleures pratiques OAuth récentes  
  - **Standards OWASP** : Validation de la pertinence des références OWASP Top 10 pour LLMs  
  - **Services Azure** : Vérification de tous les liens et bonnes pratiques Microsoft Azure  
- **Alignement aux standards** : Confirmation que tous les standards de sécurité référencés sont à jour  
  - Cadre de gestion des risques AI NIST  
  - ISO 27001:2022  
  - Bonnes pratiques de sécurité OAuth 2.1  
  - Cadres de sécurité et conformité Azure  
- **Ressources d’implémentation** : Validation de tous les liens et guides d’implémentation  
  - Patterns d’authentification Azure API Management  
  - Guides d’intégration Microsoft Entra ID  
  - Gestion des secrets Azure Key Vault  
  - Pipelines DevSecOps et solutions de monitoring  

### Assurance qualité de la documentation  
- **Conformité à la spécification** : Vérification que toutes les exigences de sécurité MCP obligatoires (MUST/MUST NOT) sont conformes à la dernière spécification  
- **Actualité des ressources** : Vérification de tous les liens externes vers la documentation Microsoft, standards de sécurité et guides d’implémentation  
- **Couverture des bonnes pratiques** : Confirmation d’une couverture complète de l’authentification, autorisation, menaces spécifiques à l’IA, sécurité de la chaîne d’approvisionnement et modèles d’entreprise  

## 6 octobre 2025

### Expansion de la section Premiers pas – Utilisation avancée du serveur & authentification simple

#### Utilisation avancée du serveur (03-GettingStarted/10-advanced)  
- **Nouveau chapitre ajouté** : Introduction d’un guide complet sur l’utilisation avancée du serveur MCP, couvrant à la fois l’architecture serveur classique et basse couche.
  - **Serveur régulier vs serveur bas niveau** : Comparaison détaillée et exemples de code en Python et TypeScript pour les deux approches.
  - **Conception basée sur les gestionnaires** : Explication de la gestion des outils/ressources/invites basée sur des gestionnaires pour des implémentations serveur évolutives et flexibles.
  - **Patrons pratiques** : Scénarios réels où les patrons de serveurs bas niveau sont bénéfiques pour des fonctionnalités avancées et l’architecture.

#### Authentification simple (03-GettingStarted/11-simple-auth)
- **Nouveau chapitre ajouté** : Guide étape par étape pour implémenter une authentification simple dans les serveurs MCP.
  - **Concepts d’authentification** : Explication claire de l’authentification vs autorisation, et gestion des identifiants.
  - **Implémentation Basic Auth** : Schémas d’authentification basés sur les middlewares en Python (Starlette) et TypeScript (Express), avec exemples de code.
  - **Progression vers la sécurité avancée** : Conseils pour commencer avec une authentification simple et évoluer vers OAuth 2.1 et RBAC, avec références aux modules de sécurité avancée.

Ces ajouts fournissent des conseils pratiques et concrets pour créer des implémentations de serveurs MCP plus robustes, sécurisées et flexibles, reliant les concepts fondamentaux aux patrons avancés de mise en production.

## 29 septembre 2025

### Laboratoires d’intégration base de données serveur MCP - Parcours complet pratique

#### 11-MCPServerHandsOnLabs - Nouveau cursus complet d’intégration de base de données
- **Parcours de 13 laboratoires complets** : Ajout d’un cursus pratique complet pour construire des serveurs MCP prêts pour la production avec intégration de base PostgreSQL
  - **Implémentation réelle** : Cas d’utilisation analytique de Zava Retail démontrant les patrons de niveau entreprise
  - **Progression d’apprentissage structurée** :
    - **Labs 00-03 : Fondations** - Introduction, architecture centrale, sécurité et multi-location, configuration de l’environnement
    - **Labs 04-06 : Construction du serveur MCP** - Conception base de données & schéma, implémentation serveur MCP, développement d’outils  
    - **Labs 07-09 : Fonctionnalités avancées** - Intégration recherche sémantique, test & débogage, intégration VS Code
    - **Labs 10-12 : Production & bonnes pratiques** - Stratégies déploiement, surveillance & observabilité, bonnes pratiques & optimisation
  - **Technologies d’entreprise** : Framework FastMCP, PostgreSQL avec pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Fonctionnalités avancées** : Sécurité au niveau ligne (RLS), recherche sémantique, accès multi-tenant, embeddings vectoriels, monitoring temps réel

#### Standardisation terminologique - Conversion module en laboratoire
- **Mise à jour documentaire complète** : Mise à jour systématique de tous les README dans 11-MCPServerHandsOnLabs pour utiliser la terminologie « laboratoire » au lieu de « module »
  - **En-têtes de section** : Modification de « Ce que couvre ce module » en « Ce que couvre ce laboratoire » dans les 13 labos
  - **Descriptions du contenu** : Remplacement de « Ce module fournit... » par « Ce laboratoire fournit... » dans toute la documentation
  - **Objectifs d’apprentissage** : Passage de « À la fin de ce module... » à « À la fin de ce laboratoire... »
  - **Liens de navigation** : Conversion de toutes les références « Module XX : » en « Laboratoire XX : » dans les références croisées et la navigation
  - **Suivi d’achèvement** : Mise à jour de « Après avoir terminé ce module... » en « Après avoir terminé ce laboratoire... »
  - **Références techniques préservées** : Maintien des références au module Python dans les fichiers de configuration (ex. `"module": "mcp_server.main"`)

#### Amélioration du guide d’étude (study_guide.md)
- **Carte visuelle du cursus** : Ajout d’une nouvelle section « 11. Laboratoires d’intégration base de données » avec visualisation complète de la structure des laboratoires
- **Structure du dépôt** : Mise à jour de dix à onze sections principales avec description détaillée de 11-MCPServerHandsOnLabs
- **Guidage parcours d’apprentissage** : Instructions de navigation améliorées pour couvrir les sections 00-11
- **Couverture technologique** : Ajout des détails sur FastMCP, PostgreSQL, intégration des services Azure
- **Objectifs d’apprentissage** : Mise en avant du développement de serveurs prêts pour la production, des patrons d’intégration base de données et sécurité d’entreprise

#### Amélioration de la structure du README principal
- **Terminologie basée sur les laboratoires** : Mise à jour du README.md principal dans 11-MCPServerHandsOnLabs pour utiliser systématiquement la structure « laboratoire »
- **Organisation du parcours d’apprentissage** : Progression claire des concepts fondamentaux à l’implémentation avancée puis déploiement en production
- **Focus monde réel** : Accent sur l’apprentissage pratique, avec patrons et technologies de niveau entreprise

### Améliorations qualité et cohérence de la documentation
- **Accent sur l’apprentissage pratique** : Renforcement de l’approche laboratoire tout au long de la documentation
- **Focalisation sur patrons d’entreprise** : Mise en valeur des implémentations prêtes pour la production et des considérations de sécurité d’entreprise
- **Intégration technologique** : Couverture complète des services Azure modernes et patrons d’intégration IA
- **Progression pédagogique** : Parcours clair et structuré des concepts de base au déploiement en production

## 26 septembre 2025

### Amélioration des études de cas - Intégration GitHub MCP Registry

#### Études de cas (09-CaseStudy/) - Focus développement écosystème
- **README.md** : Expansion majeure avec étude de cas complète sur GitHub MCP Registry
  - **Étude de cas GitHub MCP Registry** : Nouvelle étude détaillée portant sur le lancement du registre MCP GitHub en septembre 2025
    - **Analyse des problèmes** : Examen détaillé des défis de découverte et déploiement fragmenté de serveurs MCP
    - **Architecture de la solution** : Approche registre centralisé GitHub avec installation VS Code en un clic
    - **Impact business** : Améliorations mesurables de l’intégration et la productivité des développeurs
    - **Valeur stratégique** : Focus sur le déploiement agent modulaire et interopérabilité entre outils
    - **Développement d’écosystème** : Positionnement comme plateforme fondamentale pour intégration agentique
  - **Structure améliorée des études de cas** : Mise à jour uniforme de toutes les sept études avec format cohérent et descriptions complètes
    - Agents de voyage Azure AI : Accent orchestration multi-agent
    - Intégration Azure DevOps : Automatisation des workflows
    - Récupération documentation temps réel : Client console Python
    - Générateur plan d’étude interactif : Application web conversationnelle Chainlit
    - Documentation in-éditeur : Intégration VS Code et GitHub Copilot
    - Gestion API Azure : Patrons d’intégration API entreprise
    - GitHub MCP Registry : Développement écosystème et plateforme communautaire
  - **Conclusion complète** : Réécriture de la conclusion soulignant les sept études couvrant plusieurs dimensions d’implémentation MCP
    - Intégration entreprise, orchestration multi-agent, productivité développeur
    - Développement écosystème, catégorie applications éducatives
    - Aperçus enrichis sur patrons d’architecture, stratégies d’implémentation et meilleures pratiques
    - Mise en avant de MCP comme protocole mature et prêt pour la production

#### Mise à jour guide d’étude (study_guide.md)
- **Carte visuelle du cursus** : Mise à jour du mindmap pour inclure GitHub MCP Registry dans la section Études de cas
- **Description des études de cas** : Amélioration des descriptions génériques vers des détails sur les sept études complètes
- **Structure du dépôt** : Mise à jour de la section 10 pour refléter la couverture complète des études de cas avec détails d’implémentation spécifiques
- **Intégration changelog** : Ajout de l’entrée du 26 septembre 2025 documentant l’ajout de GitHub MCP Registry et les améliorations des études de cas
- **Mise à jour des dates** : Actualisation de la date de bas de page au 26 septembre 2025

### Amélioration qualité documentation
- **Uniformisation** : Standardisation du format et de la structure des études de cas sur les sept exemples
- **Couverture complète** : Études couvrant entreprise, productivité développeur, développement écosystème
- **Positionnement stratégique** : Accent renforcé sur MCP comme plateforme fondamentale pour déploiement d’agents
- **Intégration des ressources** : Mise à jour des ressources additionnelles avec lien vers GitHub MCP Registry

## 15 septembre 2025

### Extension sujets avancés - Transports personnalisés & ingénierie contextuelle

#### Transports MCP personnalisés (05-AdvancedTopics/mcp-transport/) - Nouveau guide avancé d’implémentation
- **README.md** : Guide complet d’implémentation pour mécanismes de transport MCP personnalisés
  - **Transport Azure Event Grid** : Implémentation complète serveurless orientée événement
    - Exemples C#, TypeScript, Python avec intégration Azure Functions
    - Patrons d’architecture événementielle pour solutions MCP évolutives
    - Récepteurs webhook et gestion push des messages
  - **Transport Azure Event Hubs** : Implémentation transport streaming haute-débit
    - Capacités streaming temps réel pour scénarios basse latence
    - Stratégies de partitionnement et gestion des checkpoints
    - Regroupement de messages et optimisation des performances
  - **Patrons d’intégration entreprise** : Exemples architecturaux prêts pour la production
    - Traitement MCP distribué sur plusieurs Azure Functions
    - Architectures hybrides combinant plusieurs types de transport
    - Durabilité, fiabilité et gestion des erreurs de messages
  - **Sécurité & surveillance** : Intégration Azure Key Vault et patrons d’observabilité
    - Authentification identité managée et accès au moindre privilège
    - Télémétrie Application Insights et monitoring performances
    - Coupe-circuits et modèles de tolérance aux pannes
  - **Frameworks de test** : Stratégies de tests complètes pour transports personnalisés
    - Tests unitaires avec doubles de test et frameworks de moquage
    - Tests d’intégration avec Azure Test Containers
    - Considérations de tests de charge et performances

#### Ingénierie contextuelle (05-AdvancedTopics/mcp-contextengineering/) - Discipline IA émergente
- **README.md** : Exploration complète de l’ingénierie contextuelle comme domaine émergent
  - **Principes fondamentaux** : Partage complet du contexte, prise de décision action, gestion fenêtre contexte
  - **Alignement protocole MCP** : Comment la conception MCP répond aux défis de l’ingénierie contextuelle
    - Limitations fenêtre contexte et stratégies de chargement progressif
    - Détermination de pertinence et récupération dynamique du contexte
    - Gestion multimodale du contexte et considérations de sécurité
  - **Approches d’implémentation** : Architectures mono-thread vs multi-agent
    - Découpage et priorisation des fragments de contexte
    - Chargement progressif et stratégies de compression du contexte
    - Approches stratifiées du contexte et optimisation de récupération
  - **Cadre de mesure** : Métriques émergentes pour évaluation de l’efficacité contextuelle
    - Efficacité entrée, performances, qualité, expérience utilisateur
    - Approches expérimentales d’optimisation du contexte
    - Analyse des échecs et méthodes d’amélioration

#### Mises à jour navigation cursus (README.md)
- **Structure module améliorée** : Mise à jour du tableau du cursus pour inclure sujets avancés nouveaux
  - Ajout Ingénierie contextuelle (5.14) et transport personnalisé (5.15)
  - Formatage cohérent et liens de navigation uniformes sur tous les modules
  - Descriptions actualisées reflétant le contenu actuel

### Améliorations de la structure des dossiers
- **Standardisation des noms** : Renommage « mcp transport » en « mcp-transport » pour cohérence avec autres dossiers sujets avancés
- **Organisation du contenu** : Tous les dossiers 05-AdvancedTopics suivent désormais le modèle mcp-[topic]

### Améliorations qualité documentation
- **Alignement spécification MCP** : Tout nouveau contenu réfère à la spécification MCP 2025-06-18
- **Exemples multilingues** : Exemples de code complets en C#, TypeScript, Python
- **Focus entreprise** : Patrons prêts pour production et intégration cloud Azure partout
- **Documentation visuelle** : Diagrammes Mermaid pour architecture et visualisation des flux

## 18 août 2025

### Mise à jour complète documentation - Normes MCP 2025-06-18

#### Bonnes pratiques sécurité MCP (02-Security/) - Modernisation totale
- **MCP-SECURITY-BEST-PRACTICES-2025.md** : Réécriture complète alignée sur spécification MCP 2025-06-18
  - **Exigences obligatoires** : Ajout de MUST/MUST NOT explicites issus de la spécification officielle avec indicateurs visuels clairs
  - **12 pratiques de sécurité clés** : Restructuration depuis liste 15 points vers domaines complets de sécurité
    - Sécurité tokens & authentification avec intégration fournisseur identité externe
    - Gestion session & sécurité transport avec exigences cryptographiques
    - Protection menaces IA spécifiques avec intégration Microsoft Prompt Shields
    - Contrôle d’accès & permissions avec principe du moindre privilège
    - Sécurité contenu & surveillance avec intégration Azure Content Safety
    - Sécurité chaîne d’approvisionnement avec vérification complète des composants
    - Sécurité OAuth & prévention attaque délégué confus avec implémentation PKCE
    - Réponse incidents & récupération avec capacités automatisées
    - Conformité & gouvernance avec alignement réglementaire
    - Contrôles sécurité avancés avec architecture zero trust
    - Intégration écosystème Microsoft Security avec solutions complètes
    - Évolution continue sécurité avec pratiques adaptatives
  - **Solutions sécurité Microsoft** : Renforcement intégration Prompt Shields, Azure Content Safety, Entra ID, GitHub Advanced Security
  - **Ressources d’implémentation** : Liens catégorisés complets par documentation officielle MCP, solutions sécurité Microsoft, standards sécurité, guides d’implémentation

#### Contrôles sécurité avancés (02-Security/) - Implémentation entreprise
- **MCP-SECURITY-CONTROLS-2025.md** : Refondation totale avec cadre sécurité entreprise complet
  - **9 domaines complets de sécurité** : Extension depuis contrôles basiques vers cadre détaillé entreprise
    - Authentification & autorisation avancées avec intégration Microsoft Entra ID
    - Sécurité tokens & contrôles anti-passthrough avec validation complète
    - Contrôles sécurité session avec prévention détournement
    - Contrôles sécurité IA spécifiques avec prévention injection d’invite et empoisonnement d’outils
    - Prévention attaque délégué confus avec sécurité proxy OAuth
    - Sécurité exécution d’outils avec sandboxing et isolation
    - Contrôles sécurité chaîne d’approvisionnement avec vérification dépendances
    - Contrôles de surveillance & détection avec intégration SIEM
    - Réponse incidents & récupération avec capacités automatisées
  - **Exemples d’implémentation** : Ajout de blocs YAML détaillés et exemples de code
  - **Intégration solutions Microsoft** : Couverture approfondie services sécurité Azure, GitHub Advanced Security, gestion identité entreprise

#### Sécurité sujets avancés (05-AdvancedTopics/mcp-security/) - Implémentation prête production
- **README.md** : Réécriture complète pour implémentation sécurité entreprise
  - **Alignement spécification actuelle** : Mise à jour selon spécification MCP 2025-06-18 avec exigences sécurité obligatoires
  - **Authentification renforcée** : Intégration Microsoft Entra ID avec exemples .NET et Java Spring Security complets
  - **Intégration sécurité IA** : Implémentation Microsoft Prompt Shields et Azure Content Safety avec exemples Python détaillés
  - **Atténuation menaces avancée** : Exemples complets pour
    - Prévention attaque délégué confus avec PKCE et validation consentement utilisateur
    - Prévention passthrough token avec validation audience et gestion sécurisée token
    - Prévention du détournement de session avec liaison cryptographique et analyse comportementale  
  - **Intégration de la sécurité d'entreprise** : Surveillance Azure Application Insights, pipelines de détection des menaces, et sécurité de la chaîne d'approvisionnement  
  - **Liste de contrôle de mise en œuvre** : Contrôles de sécurité obligatoires vs recommandés clairement définis avec avantages de l'écosystème de sécurité Microsoft  

### Qualité de la documentation et alignement sur les normes  
- **Références des spécifications** : Mise à jour de toutes les références à la Spécification MCP actuelle 2025-06-18  
- **Écosystème de sécurité Microsoft** : Renforcement des directives d'intégration dans toute la documentation de sécurité  
- **Mise en œuvre pratique** : Ajout d'exemples de code détaillés en .NET, Java et Python avec des modèles d'entreprise  
- **Organisation des ressources** : Catégorisation complète de la documentation officielle, des normes de sécurité et des guides de mise en œuvre  
- **Indicateurs visuels** : Marquage clair des exigences obligatoires vs les pratiques recommandées  

#### Concepts de base (01-CoreConcepts/) - Modernisation complète  
- **Mise à jour de la version du protocole** : Mise à jour pour faire référence à la Spécification MCP actuelle 2025-06-18 avec versionnement basé sur la date (format AAAA-MM-JJ)  
- **Affinement de l'architecture** : Descriptions améliorées des Hôtes, Clients et Serveurs pour refléter les modèles d'architecture MCP actuels  
  - Les hôtes sont maintenant clairement définis comme des applications IA coordonnant plusieurs connexions client MCP  
  - Les clients sont décrits comme des connecteurs de protocole maintenant des relations serveur un-à-un  
  - Les serveurs sont améliorés avec des scénarios de déploiement local vs distant  
- **Restructuration des primitifs** : Révision complète des primitifs serveur et client  
  - Primitifs serveur : Ressources (sources de données), Invites (modèles), Outils (fonctions exécutables) avec explications détaillées et exemples  
  - Primitifs client : Échantillonnage (complétions LLM), Sollicitation (entrée utilisateur), Journalisation (débogage/surveillance)  
  - Mise à jour avec les modèles actuels des méthodes de découverte (`*/list`), récupération (`*/get`) et exécution (`*/call`)  
- **Architecture du protocole** : Introduction d'un modèle d'architecture à deux couches  
  - Couche de données : Fondation JSON-RPC 2.0 avec gestion du cycle de vie et primitives  
  - Couche de transport : Mécanismes de transport STDIO (local) et HTTP diffusible avec SSE (distant)  
- **Cadre de sécurité** : Principes de sécurité complets incluant consentement utilisateur explicite, protection de la vie privée des données, sécurité d'exécution des outils, et sécurité de la couche de transport  
- **Modèles de communication** : Messages du protocole mis à jour pour montrer les flux d'initialisation, découverte, exécution et notification  
- **Exemples de code** : Exemples multilingues (.NET, Java, Python, JavaScript) actualisés pour refléter les modèles SDK MCP actuels  

#### Sécurité (02-Security/) - Révision complète de la sécurité  
- **Alignement sur les normes** : Pleine conformité avec les exigences de sécurité de la Spécification MCP 2025-06-18  
- **Évolution de l'authentification** : Documentation de l'évolution, des serveurs OAuth personnalisés à la délégation fournisseur d'identité externe (Microsoft Entra ID)  
- **Analyse des menaces spécifiques à l'IA** : Couverture améliorée des vecteurs d'attaque modernes en IA  
  - Scénarios détaillés d'attaques par injection d'invite avec exemples concrets  
  - Mécanismes d'empoisonnement d'outils et schémas d'attaque "rug pull"  
  - Empoisonnement de la fenêtre de contexte et attaques de confusion de modèle  
- **Solutions de sécurité IA Microsoft** : Couverture complète de l'écosystème de sécurité Microsoft  
  - Boucliers d'invites IA avec détection avancée, mise en lumière et techniques de délimitation  
  - Modèles d'intégration Azure Content Safety  
  - GitHub Advanced Security pour la protection de la chaîne d'approvisionnement  
- **Atténuation avancée des menaces** : Contrôles de sécurité détaillés pour  
  - Détournement de session avec scénarios d'attaque spécifiques à MCP et exigences de session ID cryptographique  
  - Problèmes de délégué confus dans les scénarios proxy MCP avec exigences de consentement explicite  
  - Vulnérabilités de passage de jeton avec contrôles de validation obligatoires  
- **Sécurité de la chaîne d'approvisionnement** : Couverture étendue de la chaîne d'approvisionnement IA incluant modèles fondamentaux, services d’embedings, fournisseurs de contexte et API tierces  
- **Sécurité fondamentale** : Intégration renforcée avec les modèles de sécurité d'entreprise, y compris l'architecture zero trust et l'écosystème de sécurité Microsoft  
- **Organisation des ressources** : Liens de ressources catégorisés par type (Docs officielles, Normes, Recherche, Solutions Microsoft, Guides de mise en œuvre)  

### Améliorations de la qualité de la documentation  
- **Objectifs d'apprentissage structurés** : Objectifs d'apprentissage améliorés avec résultats spécifiques et exploitables  
- **Références croisées** : Ajout de liens entre les sujets liés à la sécurité et aux concepts de base  
- **Informations actuelles** : Mise à jour de toutes les références de dates et liens de spécifications vers les normes actuelles  
- **Guides de mise en œuvre** : Ajout de directives spécifiques et exploitables tout au long des deux sections  

## 16 juillet 2025  

### Améliorations du README et de la navigation  
- Navigation du curriculum complètement repensée dans README.md  
- Remplacement des balises `<details>` par un format basé sur un tableau plus accessible  
- Création d’options de mise en page alternatives dans le nouveau dossier "alternative_layouts"  
- Ajout d’exemples de navigation sous forme de cartes, onglets, et accordéons  
- Mise à jour de la section structure du dépôt pour inclure tous les fichiers récents  
- Renforcement de la section "Comment utiliser ce curriculum" avec des recommandations claires  
- Mise à jour des liens de spécification MCP vers les URL corrects  
- Ajout de la section Ingénierie du contexte (5.14) à la structure du curriculum  

### Mises à jour du guide d'étude  
- Révision complète du guide d'étude pour l’aligner avec la structure actuelle du dépôt  
- Ajout de nouvelles sections pour MCP Clients et Outils, et Serveurs MCP populaires  
- Mise à jour de la carte visuelle du curriculum pour refléter précisément tous les sujets  
- Amélioration des descriptions des sujets avancés pour couvrir toutes les spécialisations  
- Mise à jour de la section Études de cas pour refléter des exemples réels  
- Ajout de ce journal complet des modifications  

### Contributions de la communauté (06-CommunityContributions/)  
- Informations détaillées ajoutées sur les serveurs MCP pour la génération d’images  
- Section complète ajoutée sur l’utilisation de Claude dans VSCode  
- Instructions d’installation et d’utilisation du client terminal Cline ajoutées  
- Section client MCP mise à jour pour inclure toutes les options populaires  
- Exemples de contribution améliorés avec des échantillons de code plus précis  

### Sujets avancés (05-AdvancedTopics/)  
- Organisation de tous les dossiers de sujets spécialisés avec une dénomination cohérente  
- Ajout de matériels et d’exemples sur l’ingénierie du contexte  
- Ajout de la documentation d’intégration de l’agent Foundry  
- Renforcement de la documentation d’intégration de sécurité Entra ID  

## 11 juin 2025  

### Création initiale  
- Publication de la première version du curriculum MCP pour débutants  
- Création de la structure de base pour les 10 sections principales  
- Mise en place de la carte visuelle du curriculum pour la navigation  
- Ajout de projets d’exemple initiaux dans plusieurs langages de programmation  

### Premiers pas (03-GettingStarted/)  
- Premiers exemples d’implémentation serveur créés  
- Ajout des conseils de développement client  
- Inclusion des instructions d’intégration client LLM  
- Ajout de la documentation d’intégration VS Code  
- Mise en œuvre d’exemples de serveur Server-Sent Events (SSE)  

### Concepts de base (01-CoreConcepts/)  
- Ajout d’une explication détaillée de l’architecture client-serveur  
- Création de la documentation sur les composants clés du protocole  
- Documentation des modèles de messages dans MCP  

## 23 mai 2025  

### Structure du dépôt  
- Initialisation du dépôt avec la structure de dossiers de base  
- Création de fichiers README pour chaque section majeure  
- Mise en place de l’infrastructure de traduction  
- Ajout des ressources d’images et diagrammes  

### Documentation  
- Création du README.md initial avec aperçu du curriculum  
- Ajout de CODE_OF_CONDUCT.md et SECURITY.md  
- Mise en place de SUPPORT.md avec des conseils pour obtenir de l’aide  
- Création de la structure préliminaire du guide d’étude  

## 15 avril 2025  

### Planification et cadre  
- Planification initiale du curriculum MCP pour débutants  
- Définition des objectifs d’apprentissage et du public cible  
- Esquisse de la structure en 10 sections du curriculum  
- Développement du cadre conceptuel pour les exemples et études de cas  
- Création des premiers prototypes d’exemples pour les concepts clés  

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->