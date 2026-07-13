# Journal des modifications : Programme MCP pour débutants

Ce document sert d’enregistrement de tous les changements significatifs apportés au programme Model Context Protocol (MCP) pour débutants. Les modifications sont documentées en ordre chronologique inverse (les changements les plus récents en premier).

## 2 juillet 2026

### Nouvelle leçon : Candidat à la version finale de la spécification MCP du 28-07-2026

Ajout de la couverture du prochain candidat à la version finale de la spécification MCP `2026-07-28` (annoncé le 21 mai 2026 ; sortie finale prévue le 28 juillet 2026), résumé depuis [l’annonce officielle sur le blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/). La base du programme reste la **spécification MCP 2025-11-25** jusqu’à la sortie de la nouvelle version, il s’agit donc d’une orientation prospective plutôt que d’une réécriture des leçons existantes.

- **Nouveau** : [01-CoreConcepts/mcp-2026-07-28-release-candidate.md](./01-CoreConcepts/mcp-2026-07-28-release-candidate.md) — une leçon complète couvrant le cœur du protocole sans état (suppression de la poignée de main `initialize` et de `Mcp-Session-Id`), les nouveaux en-têtes de routage `Mcp-Method`/`Mcp-Name`, les métadonnées de mise en cache `ttlMs`/`cacheScope`, W3C Trace Context dans `_meta`, le cadre formel des Extensions (Applications MCP et la nouvelle extension Tasks), six SEP de renforcement de l’autorisation, la dépréciation des Roots/Sampling/Logging, et la migration vers JSON Schema 2020-12 complet pour les schémas d’outils.
- **Mise à jour** avec des appels prospectifs renvoyant à la nouvelle leçon :
  - [01-CoreConcepts/README.md](./01-CoreConcepts/README.md) : note sur la version du protocole, sections Sampling/Roots/Logging/Tasks, et « Quoi de neuf »
  - [02-Security/README.md](./02-Security/README.md) : appel au renforcement de l’autorisation
  - [03-GettingStarted/06-http-streaming/README.md](./03-GettingStarted/06-http-streaming/README.md) : appel sur le transport sans état
  - [03-GettingStarted/14-sampling/README.md](./03-GettingStarted/14-sampling/README.md) : appel à la dépréciation du Sampling
  - [05-AdvancedTopics/mcp-protocol-features/README.md](./05-AdvancedTopics/mcp-protocol-features/README.md) : appel à la dépréciation du Logging et à l’extension Tasks
  - [05-AdvancedTopics/mcp-transport/README.md](./05-AdvancedTopics/mcp-transport/README.md) : appel au routage sans état/session
  - [README.md](./README.md) : note « Perspectives » dans la section spécification et nouvelle entrée `1.1` dans le tableau des modules du programme
  - [study_guide.md](./study_guide.md) : puce prospectif sous la vue d’ensemble Concepts de base et note d’addendum datée
  - [03-GettingStarted/11-simple-auth/README.md](./03-GettingStarted/11-simple-auth/README.md) : appel sur la map de transport `mcp-session-id` avant le modèle de requête sans état
  - [05-AdvancedTopics/README.md](./05-AdvancedTopics/README.md) : appel de vue d’ensemble du module sur les dépréciations Root Contexts/Sampling et l’extension Tasks
  - [05-AdvancedTopics/mcp-security/README.md](./05-AdvancedTopics/mcp-security/README.md) : appel au renforcement de l’autorisation

## 24 juin 2026

### Nouvelle leçon : Utiliser MCP dans l’application Copilot

- [Section Outils](./12-tooling/README.md) Ajout d’une section outils.
- [MCP dans l’application Copilot](./12-tooling/01-copilot-app/README.md)

## 16 juin 2026

### Alignement sur la spécification MCP & validation des exemples

Validation du programme par rapport à la spécification actuelle **MCP 2025-11-25** et aux SDK officiels les plus récents, puis correction des références obsolètes restantes à la spécification et confirmation que les exemples de base se compilent et s’exécutent toujours.

#### Corrections des versions de la spécification (2025-06-18 / 2025-03-26 → 2025-11-25)

Mise à jour du contenu en anglais lorsqu’il mentionnait encore une version antérieure comme norme *actuelle/dernière*, et redirection des liens vers les chemins canoniques de la spécification `modelcontextprotocol.io` :
- **05-AdvancedTopics/mcp-security/README.md** : Mise à jour de la bannière « Norme actuelle », introduction, titre des principes fondamentaux de sécurité, titre des exigences obligatoires, section Microsoft Entra ID, liens Références & Ressources et avis de sécurité final (8 références) à 2025-11-25
- **05-AdvancedTopics/mcp-transport/README.md** : Mise à jour du lien de ressources supplémentaires sur la spécification et de la bannière « Norme actuelle » à 2025-11-25
- **05-AdvancedTopics/mcp-realtimesearch/README.md** : Remplacement du lien obsolète `2025-03-26` sur sécurité et confiance par la page actuelle de bonnes pratiques de sécurité 2025-11-25
- **03-GettingStarted/14-sampling/README.md** : Mise à jour du lien officiel pour la documentation sur le Sampling à 2025-11-25
- **03-GettingStarted/05-stdio-server/README.md** : Mise à jour de la référence au temps présent « spécification MCP actuelle » et du lien de ressources supplémentaires sur la spécification à 2025-11-25 (notes historiques sur la dépréciation SSE laissées intactes pour exactitude)

#### Validation des exemples avec les SDK actuels

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)** : `npm install` a résolu `@modelcontextprotocol/sdk@1.29.0` ; `tsc --noEmit` a passé sans erreurs de type — les API `McpServer`/`StdioServerTransport` existantes restent valides
- **Python (03-GettingStarted/01-first-server/solution/python)** : Validé dans un `.venv` isolé avec `mcp[cli]` (1.27.2) ; `py_compile` passé et `FastMCP.list_tools()` a correctement retourné les outils `add` et `subtract`
- Confirmation que toutes les plages de version d’exemple `@modelcontextprotocol/sdk` (`>=1.26.0` / `^1.26.0` / `^1.27.0`) se résolvent proprement sur la version courante `1.29.0` sans changements d’API cassants

#### Alignement des dépendances (combler les écarts de version)

Mise à jour des versions obsolètes du SDK pour que chaque exemple suive la version actuelle MCP, conformément à la convention de tout le dépôt :
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json** : Passage de `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` et mise à jour de la description du package obsolète `"updated for MCP 2025-06-18"` en `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** et **lab4/code/github_mcp_server/pyproject.toml** : Passage du pin exact `mcp==1.23.0` → `mcp>=1.26.0`; régénération des deux fichiers `uv.lock` (`uv lock`) afin que les fichiers verrouillés se résolvent sur la version actuelle `mcp 1.27.2` et restent synchronisés avec les manifestes

#### Analyse des lacunes du programme — Couverture des dernières fonctionnalités de la spécification

Vérification que le programme couvre déjà toutes les primitives introduites/étendues dans MCP 2025-11-25, aucun vide de contenu n’est donc présent :
- **Sampling** : Leçons 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Élicitation (incl. mode URL)** : Documentée dans 01-CoreConcepts et 05-AdvancedTopics/mcp-protocol-features
- **Roots** : Documenté dans 00-Introduction, 01-CoreConcepts et 05-AdvancedTopics/mcp-root-contexts
- **Tasks (expérimental, opérations longues)** : Documenté dans 01-CoreConcepts et 05-AdvancedTopics/mcp-protocol-features
- **Annotations d’outils** (`readOnlyHint` / `destructiveHint`) : Documentées dans 01-CoreConcepts et 05-AdvancedTopics/mcp-protocol-features

### Renforcement de la sécurité & correction des vulnérabilités des dépendances

Passage complet sur la sécurité à travers tous les manifests de dépendances et le code source des exemples, puis correction de tous les avis npm signalés et d’un problème au niveau du code. Après correction, `npm audit` signale **0 vulnérabilités** dans chaque répertoire audité.

#### Vulnérabilités npm des dépendances (transitives) — Corrigées

Audit de tous les 15 fichiers `package-lock.json` committés. Les vulnérabilités étaient limitées aux dépendances transitives introduites par l’outil de dev MCP Inspector, le client OpenAI, et le SDK MCP ; toutes sont maintenant corrigées sans casser les exemples :
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** et **lab3/code/weather_mcp/inspector** : Passage de `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`), ce qui a éliminé les avis liés à `ajv`, `brace-expansion`, `diff`, `path-to-regexp` et `ws`. Ajout d’une entrée npm `overrides` forçant la version corrigée `shell-quote@1.8.4` pour éliminer l’avis critique restant porté par `concurrently` ; régénération des deux fichiers de verrouillage (0 vulnérabilités désormais)
- **03-GettingStarted/samples/typescript** : `npm audit fix` a mis à jour la dépendance transitive `qs` (modérée) vers une version corrigée
- **03-GettingStarted/samples/javascript** : `npm audit fix` a mis à jour la dépendance transitive `hono` (modérée) vers une version corrigée
- **03-GettingStarted/03-llm-client/solution/typescript** : `npm audit fix` a mis à jour la dépendance transitive `form-data` (importante) vers une version corrigée
- **03-GettingStarted/11-simple-auth/solution/typescript** : Génération du fichier manquant `package-lock.json` pour que le projet soit reproductible et auditable (0 vulnérabilités)

#### Correction de sécurité au niveau du code (OWASP A03 : Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py** : Suppression de `shell=True` dans l’outil `open_in_vscode`. La précédente commande `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permettait aux métacaractères shell dans un chemin dossier d’être interprétés par `cmd.exe` (vecteur d’injection de commande). Elle lance désormais directement l’exécutable résolu `Code.exe` avec le dossier comme argument — sans shell — ce qui est fonctionnellement équivalent et sécurisé

#### Audit des dépendances Python

- Audit de chaque jeu de requirements Python avec `pip-audit`. `05-AdvancedTopics` et `03-GettingStarted/samples/python` n’ont signalé **aucune vulnérabilité connue** (leurs plages `mcp` / `httpx` / `pydantic` / `python-dotenv` se résolvent en versions corrigées actuelles)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt** : `pip-audit` a signalé la dépendance transitive **`werkzeug` 3.1.1** avec trois avis `safe_join` liés à des noms de périphériques Windows causant un DoS — `CVE-2025-66221`, `CVE-2026-21860`, et `CVE-2026-27199` (tous corrigés en 3.1.6). Ajout d’un pin explicite de sécurité `werkzeug>=3.1.6` pour que la version corrigée soit résolue ; vérification que la contrainte se résout proprement avec la pile `chainlit` / `mcp` / `semantic-kernel`

### Changement de nom commercial

Mise à jour de tout le contenu du programme pour refléter le changement de dénomination des produits Microsoft :

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md** : Mise à jour du lien de la communauté Discord
- **AGENTS.md** : Mise à jour de la référence au serveur Discord
- **README.md** : Mise à jour des références à l’écosystème technologique
- **study_guide.md** : Mise à jour des références aux études de cas
- **05-AdvancedTopics/README.md** : Mise à jour du titre et de la description du Module 5.13
- **05-AdvancedTopics/mcp-integration/README.md** : Mise à jour de l’en-tête de section et de la description
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md** : Mise à jour complète du titre du module et du contenu
- **05-AdvancedTopics/mcp-security-entra/README.md** : Mise à jour du lien de renvoi croisé
- **07-LessonsfromEarlyAdoption/README.md** : Mise à jour des références aux études de cas
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md** : Mise à jour de l’en-tête de la section 9, des badges et des capacités
- **08-BestPractices/README.md** : Mise à jour du lien de la communauté Discord
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md** : Mise à jour de la référence au canal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md** : Mise à jour de la référence au déploiement modèle
- **11-MCPServerHandsOnLabs/00-Introduction/README.md** : Mise à jour du tableau des services IA
- **11-MCPServerHandsOnLabs/03-Setup/README.md** : Mise à jour des références aux ressources

#### AI Toolkit / AITK → Extension Microsoft Foundry Toolkit pour VS Code

- **README.md** : Références principales du programme mises à jour  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md** : Titre du module, aperçu et tous les en-têtes de module mis à jour  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md** : Titre, objectifs d’apprentissage, instructions d’installation et ressources mis à jour  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md** : Titre, objectifs d’apprentissage, tableau des hôtes MCP et références croisées mis à jour  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md** : Titre, badges, prérequis et ressources mis à jour  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md** : Références Agent Builder et lien de retour mis à jour  
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md** : Prérequis et références d’extension mis à jour  

---

## 11 avril 2026  

### Nouvelle leçon, corrections de documentation et mises à jour des dépendances  

#### Nouveau contenu du programme ajouté  

**Module 05 - Sujets avancés**  
- **Leçon 5.17 : Raisonnement multi-agent adversarial avec MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`) : Nouveau guide complet couvrant le modèle de débat adversarial pour les systèmes multi-agents  
  - Diagramme d’architecture Mermaid : deux agents → serveur MCP partagé → transcription du débat → juge → verdict  
  - Serveur d’outils MCP partagé (`web_search` + `run_python`) implémenté en Python et TypeScript  
  - Prompts système opposés (POUR / CONTRE / Juge) avec exigences explicites d’utilisation d’outil  
  - Orchestrateur de débats en Python, TypeScript et C# gérant les tours et le routage des arguments  
  - Câblage MCP `ClientSession` pour l’orchestrateur vers les appels réels d’outils  
  - Tableau de cas d’usage (détection d’hallucinations, modélisation des menaces, révision de conception d’API, vérification factuelle, sélection technique)  
  - Considérations de sécurité : exécution en sandbox, validation des appels d’outils, limitation de débit, journalisation d’audit  
  - Exercice structuré avec trois scénarios pratiques (revue de code, décision d’architecture, modération de contenu)  

#### Corrections de documentation  

**Module 03 - Premiers pas**  
- **05-stdio-server/README.md** : Correction d’un exemple incomplet de serveur stdio TypeScript — ajout de l’instanciation du transport manquant (`new StdioServerTransport()`) et de l’appel `server.connect(transport)` afin de correspondre aux exemples Python et .NET dans la même section  
- **14-sampling/README.md** : Correction d’une faute de frappe — correction `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`  

#### Mises à jour du programme  

**README.md principal**  
- Ajout de l’entrée 5.17 (Raisonnement multi-agent adversarial avec MCP) dans le tableau du programme avec un lien direct vers la nouvelle leçon  

**05-AdvancedTopics/README.md**  
- Ajout de la ligne Leçon 5.17 au tableau des leçons  

**study_guide.md**  
- Ajout du sujet Raisonnement multi-agent adversarial à la carte mentale et à la description en prose des Sujets avancés  

#### Corrections de code et de sécurité  

**Module 05 - Agents adversariaux (`mcp-adversarial-agents`)**  
- **Correction de sécurité — injection de commande** : Remplacement de l’interpolation de shell `execSync` par `execFile` + `promisify` dans l’outil TypeScript `run_python`, éliminant la surface d’injection de commande (le code contrôlé par LLM est désormais passé comme élément littéral argv sans intervention du shell)  
- **Boucle d’outils MCP câblée** : Mise à jour de l’orchestrateur de débats Python pour utiliser le client `AsyncAnthropic` (remplaçant le `Anthropic` synchrone bloquant), passer un `ClientSession` vivant directement à chaque tour d’agent, récupérer les définitions d’outils via `session.list_tools()` à chaque tour, et dispatcher les blocs `tool_use` via `session.call_tool()` dans une boucle jusqu’à ce que le modèle émette une réponse texte finale  

#### Mises à jour des dépendances  

- Mise à jour de `hono` en 4.12.12 dans plusieurs packages (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)  
- Mise à jour de `@hono/node-server` de 1.19.11 à 1.19.13 dans les packages TypeScript  
- Mise à jour de `cryptography` de 46.0.5 à 46.0.7 dans les packages Python (laboratoires 3 et 4 de 10-StreamliningAIWorkflows)  
- Mise à jour de `lodash` de 4.17.23 à 4.18.1 dans l’inspecteur 10-StreamliningAIWorkflows  

#### Traductions  

- Synchronisation des traductions pour plus de 48 langues avec les derniers changements sources (mise à jour i18n)  

---

## 5 février 2026  

### Améliorations générales de validation et de navigation dans le dépôt  

#### Nouveau contenu du programme ajouté  

**Module 03 - Premiers pas**  
- **12-mcp-hosts/README.md** : Nouveau guide complet pour la configuration des hôtes MCP  
  - Exemples de configuration Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - Modèles JSON de configuration pour tous les hôtes majeurs  
  - Tableau comparatif des types de transport (stdio, SSE/HTTP, WebSocket)  
  - Dépannage des problèmes de connexion courants  
  - Bonnes pratiques de sécurité pour la configuration des hôtes  

- **13-mcp-inspector/README.md** : Nouveau guide de débogage pour MCP Inspector  
  - Méthodes d’installation (npx, npm global, depuis la source)  
  - Connexion aux serveurs via stdio et HTTP/SSE  
  - Outils de test, ressources et workflows de prompts  
  - Intégration VS Code avec MCP Inspector  
  - Scénarios courants de débogage avec solutions  

**Module 04 - Implémentation pratique**  
- **pagination/README.md** : Nouveau guide d’implémentation de la pagination  
  - Modèles de pagination par curseur en Python, TypeScript, Java  
  - Gestion de la pagination côté client  
  - Stratégies de conception de curseur (opaque vs structuré)  
  - Recommandations d’optimisation des performances  

**Module 05 - Sujets avancés**  
- **mcp-protocol-features/README.md** : Plongée approfondie dans les fonctionnalités du protocole  
  - Mise en œuvre des notifications de progression  
  - Modèles d’annulation de requête  
  - Modèles de ressources avec schémas URI  
  - Gestion du cycle de vie serveur  
  - Contrôle des niveaux de journalisation  
  - Modèles de gestion d’erreurs avec codes JSON-RPC  

#### Corrections de navigation (plus de 24 fichiers mis à jour)  

**README principaux des modules**  
 Maintenant liens vers la première leçon ET le module suivant  

**Sous-fichiers 02-Security**  
- Les 5 documents supplémentaires sur la sécurité ont désormais tous une navigation « Quoi de neuf » :  

**Fichiers 09-CaseStudy**  
- Tous les fichiers d’études de cas ont désormais une navigation séquentielle :  

**Laboratoires 10-StreamliningAI**  
Ajout de la section Quoi de neuf à l’aperçu du Module 10 et au Module 11  

#### Corrections de code et de contenu  

**Mises à jour du SDK et des dépendances**  
Correction de la version vide d’openai à `^4.95.0`  
Mise à jour du SDK de `^1.8.0` à `>=1.26.0`  
Mise à jour des pins de version mcp à `>=1.26.0`  

**Corrections de code**  
Correction du modèle invalide `gpt-4o-mini` en `gpt-4.1-mini`  

**Corrections de contenu**  
Correction du lien cassé `READMEmd` → `README.md`, correction de l’en-tête du curriculum `Module 1-3` → `Module 0-3`, correction du chemin sensible à la casse  
Suppression du contenu dupliqué corrompu de l’étude de cas 5  

**Améliorations de l’orientation pour les débutants**  
Ajout d’une introduction correcte, des objectifs d’apprentissage et des prérequis pour les débutants  

#### Mises à jour du programme  

**README principal**  
- Ajout des entrées 3.12 (Hôtes MCP), 3.13 (Inspecteur MCP), 4.1 (Pagination), 5.16 (Fonctionnalités du protocole) dans le tableau du programme  

**README des modules**  
Ajout des leçons 12 et 13 à la liste des leçons  
Ajout de la section Guides pratiques avec lien vers la pagination  
Ajout des leçons 5.15 (Transport personnalisé) et 5.16 (Fonctionnalités du protocole)  

**study_guide.md**  
- Mise à jour de la carte mentale avec tous les nouveaux sujets : configuration des hôtes MCP, Inspecteur MCP, stratégies de pagination, plongée approfondie des fonctionnalités du protocole  

## 28 janvier 2026  

### Revue de conformité de la spécification MCP 2025-11-25  

#### Amélioration des concepts fondamentaux (01-CoreConcepts/)  
- **Nouveau primitif client - Roots** : Ajout d’une documentation complète sur le primitif client Roots, permettant aux serveurs de comprendre les limites du système de fichiers et les autorisations d’accès  
- **Annotations d’outils** : Ajout de documentation sur les annotations comportementales des outils (`readOnlyHint`, `destructiveHint`) pour de meilleures décisions d’exécution des outils  
- **Appel des outils dans Sampling** : Mise à jour de la documentation Sampling pour inclure les paramètres `tools` et `toolChoice` pour l’invocation pilotée par le modèle d’outils lors des requêtes d’échantillonnage  
- **Mode d’évocation URL** : Ajout de documentation sur l’évocation basée sur URL pour les interactions web externes initiées par le serveur  
- **Tâches (expérimental)** : Ajout d’une nouvelle section documentant la fonctionnalité expérimentale Tâches pour les wrappers d’exécution durables et la récupération différée des résultats  
- **Support des icônes** : Mention que les outils, ressources, modèles de ressources et prompts peuvent désormais inclure des icônes en tant que métadonnées supplémentaires  

#### Mises à jour de la documentation  
- **README.md** : Ajout de la référence à la version MCP Specification 2025-11-25 et explication de la gestion des versions basée sur la date  
- **study_guide.md** : Mise à jour de la carte du programme pour inclure Tâches et Annotations d’outils dans la section Concepts fondamentaux ; mise à jour de l’horodatage du document  

#### Vérification de conformité à la spécification  
- **Version du protocole** : Vérification que toute la documentation fait référence à la spécification MCP 2025-11-25 actuelle  
- **Alignement de l’architecture** : Confirmation de l’exactitude de la documentation de l’architecture à deux couches (couche données + couche transport)  
- **Documentation des primitifs** : Validation des primitifs serveur (Ressources, Prompts, Outils) et des primitifs client (Sampling, Évocation, Journalisation, Roots)  
- **Mécanismes de transport** : Vérification de l’exactitude de la documentation des transports STDIO et HTTP Streamable  
- **Conseils de sécurité** : Confirmation de l’alignement avec la documentation actuelle des bonnes pratiques de sécurité MCP  

#### Fonctionnalités clés MCP 2025-11-25 documentées  
- **Découverte OpenID Connect** : Découverte du serveur d’authentification via OIDC  
- **Documents de métadonnées OAuth Client ID** : Mécanisme recommandé d’enregistrement client  
- **JSON Schema 2020-12** : Dialecte par défaut pour les définitions de schéma MCP  
- **Système de niveaux SDK** : Formalisation des exigences de support et maintenance des fonctionnalités SDK  
- **Structure de gouvernance** : Formalisation des groupes de travail et groupes d’intérêt dans la gouvernance MCP  

### Mise à jour majeure de la documentation de sécurité (02-Security/)  

#### Intégration du workshop MCP Security Summit (Sherpa)  
- **Nouvelle ressource de formation pratique** : Ajout d’une intégration complète avec le [workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) dans toute la documentation de sécurité  
- **Couverture de la route d’expédition** : Documentation de la progression complète du camp de base au sommet  
- **Alignement OWASP** : Toute la guidance de sécurité correspond désormais aux risques du MCP Azure Security Guide OWASP  

#### Intégration du Top 10 MCP OWASP  
- **Nouvelle section** : Ajout du tableau des risques de sécurité Top 10 MCP OWASP avec les mesures d’atténuation Azure dans le README principal Sécurité  
- **Documentation basée sur les risques** : Mise à jour de mcp-security-controls-2025.md avec les références de risques MCP OWASP pour chaque domaine de sécurité  
- **Architecture de référence** : Lien vers l’architecture de référence et les modèles d’implémentation MCP Azure Security Guide OWASP  

#### Fichiers de sécurité mis à jour  
- **README.md** : Ajout d’un aperçu du workshop Sherpa, tableau de route d’expédition, synthèse des risques Top 10 MCP OWASP, et section formation pratique  
- **mcp-security-controls-2025.md** : Mise à jour de l’en-tête à février 2026, ajout des références de risques OWASP (MCP01-MCP08), correction d’une incohérence de version de spécification  
- **mcp-security-best-practices-2025.md** : Ajout de la section ressources Sherpa et OWASP, mise à jour de l’horodatage  
- **mcp-best-practices.md** : Ajout d’une section formation pratique avec liens Sherpa et OWASP  
- **azure-content-safety-implementation.md** : Ajout de la référence OWASP MCP06, alignement Camp 3 Sherpa, et section ressources supplémentaires  

#### Nouveaux liens de ressources ajoutés  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Pages de risques OWASP MCP individuelles (MCP01-MCP10)  

### Alignement de la spécification MCP 2025-11-25 dans l’ensemble du programme  

#### Module 03 - Premiers pas  
- **Documentation SDK** : Ajout du SDK Go à la liste officielle des SDK ; mise à jour de toutes les références SDK pour alignement avec la spécification MCP 2025-11-25  
- **Clarification transport** : Mise à jour des descriptions des transports STDIO et HTTP Streaming avec références explicites à la spécification  

#### Module 04 - Implémentation pratique  
- **Mises à jour SDK** : Ajout du SDK Go ; mise à jour de la liste SDK avec référence de version de la spécification  
- **Spécification d’autorisation** : Mise à jour du lien de la spécification MCP Authorization à la version actuelle 2025-11-25  

#### Module 05 - Sujets avancés  
- **Nouvelles fonctionnalités** : Ajout d’une note concernant les nouvelles fonctionnalités MCP Specification 2025-11-25 (Tâches, Annotations d’outil, Évocation mode URL, Roots)  
- **Ressources de sécurité** : Ajout des liens pour OWASP MCP Top 10 et workshop Sherpa aux références supplémentaires  

#### Module 06 - Contributions communautaires  
- **Liste SDK** : Ajout des SDK Swift et Rust ; mise à jour du lien de la spécification à 2025-11-25  
- **Référence de spécification** : Mise à jour du lien vers l’URL directe de la spécification MCP  

#### Module 07 - Leçons des premières utilisations  

- **Mises à jour des ressources** : Ajout du lien vers la spécification MCP 2025-11-25 et du OWASP MCP Top 10 aux ressources complémentaires

#### Module 08 - Bonnes Pratiques
- **Version de la spécification** : Mise à jour de la référence de la spécification MCP à 2025-11-25
- **Ressources de sécurité** : Ajout du OWASP MCP Top 10 et de l'atelier Sherpa aux références supplémentaires

#### Module 10 - Rationalisation des flux de travail IA
- **Mise à jour du badge** : Changement du badge de version MCP de la version SDK (1.9.3) à la version de la spécification (2025-11-25)
- **Liens de ressources** : Mise à jour du lien vers la spécification MCP ; ajout du OWASP MCP Top 10

#### Module 11 - Ateliers pratiques MCP Server
- **Référence de la spécification** : Mise à jour du lien vers la spécification MCP à la version 2025-11-25
- **Ressources de sécurité** : Ajout du OWASP MCP Top 10 aux ressources officielles

## 18 décembre 2025

### Mise à jour de la documentation de sécurité - Spécification MCP 2025-11-25

#### Bonnes pratiques de sécurité MCP (02-Security/mcp-best-practices.md) - Mise à jour de la version de la spécification
- **Mise à jour de la version du protocole** : Mise à jour pour référencer la dernière spécification MCP 2025-11-25 (publiée le 25 novembre 2025)
  - Mise à jour de toutes les références de la version de la spécification de 2025-06-18 à 2025-11-25
  - Mise à jour des dates des documents d’août 18, 2025 à décembre 18, 2025
  - Vérification que toutes les URL de la spécification pointent vers la documentation actuelle
- **Validation du contenu** : Validation globale des meilleures pratiques de sécurité selon les normes les plus récentes
  - **Solutions de sécurité Microsoft** : Vérification de la terminologie et des liens actuels pour Prompt Shields (anciennement « détection de risque jailbreak »), Azure Content Safety, Microsoft Entra ID et Azure Key Vault
  - **Sécurité OAuth 2.1** : Confirmation de l'alignement avec les meilleures pratiques de sécurité OAuth les plus récentes
  - **Normes OWASP** : Validation que les références OWASP Top 10 pour les LLM restent à jour
  - **Services Azure** : Vérification de tous les liens et bonnes pratiques de la documentation Microsoft Azure
- **Alignement avec les normes** : Confirmation que toutes les normes de sécurité référencées sont actuelles
  - Cadre de gestion des risques IA du NIST
  - ISO 27001:2022
  - Meilleures pratiques de sécurité OAuth 2.1
  - Cadres de sécurité et conformité Azure
- **Ressources d’implémentation** : Validation de tous les liens de guides de mise en œuvre et ressources
  - Modèles d’authentification Azure API Management
  - Guides d’intégration Microsoft Entra ID
  - Gestion des secrets Azure Key Vault
  - Pipelines DevSecOps et solutions de surveillance

### Assurance qualité de la documentation
- **Conformité à la spécification** : Garantie que toutes les exigences obligatoires de sécurité MCP (DOIT/NE DOIT PAS) correspondent à la spécification la plus récente
- **Actualisation des ressources** : Vérification de tous les liens externes vers la documentation Microsoft, les normes de sécurité et les guides d’implémentation
- **Couverture des bonnes pratiques** : Confirmation de la couverture complète sur l’authentification, l’autorisation, les menaces spécifiques à l’IA, la sécurité de la chaîne d’approvisionnement et les modèles d’entreprise

## 6 octobre 2025

### Expansion de la section Premiers Pas – Utilisation avancée du serveur & Authentification simple

#### Utilisation avancée du serveur (03-GettingStarted/10-advanced)
- **Nouveau chapitre ajouté** : Introduction d’un guide complet sur l’utilisation avancée des serveurs MCP, couvrant les architectures serveur classiques et bas-niveau.
  - **Serveur classique vs bas-niveau** : Comparaison détaillée et exemples de code en Python et TypeScript pour les deux approches.
  - **Conception basée sur les gestionnaires** : Explication de la gestion des outils/ressources/prompts via des gestionnaires pour des serveurs évolutifs et flexibles.
  - **Modèles pratiques** : Scénarios réels où les modèles de serveurs bas-niveau sont avantageux pour les fonctionnalités avancées et l’architecture.

#### Authentification simple (03-GettingStarted/11-simple-auth)
- **Nouveau chapitre ajouté** : Guide étape par étape pour implémenter une authentification simple dans les serveurs MCP.
  - **Concepts d’authentification** : Explication claire de l’authentification vs autorisation, et gestion des identifiants.
  - **Implémentation d’authentification basique** : Modèles d’authentification middleware en Python (Starlette) et TypeScript (Express), avec exemples de code.
  - **Progression vers la sécurité avancée** : Conseils pour démarrer avec authentification simple et évoluer vers OAuth 2.1 et RBAC, avec références aux modules de sécurité avancée.

Ces ajouts fournissent des conseils pratiques et concrets pour construire des implémentations de serveurs MCP plus robustes, sécurisées et flexibles, faisant le lien entre concepts fondamentaux et modèles de production avancés.

## 29 septembre 2025

### Ateliers d’intégration base de données MCP Server - Parcours d’apprentissage complet

#### 11-MCPServerHandsOnLabs - Nouveau curriculum complet sur l’intégration base de données
- **Parcours d’apprentissage complet de 13 ateliers** : Ajout d’un curriculum pratique complet pour développer des serveurs MCP prêts pour la production avec intégration à une base PostgreSQL
  - **Implémentation réelle** : Cas d’utilisation analytique Zava Retail démontrant des modèles d’entreprise
  - **Progression d’apprentissage structurée** :
    - **Ateliers 00-03 : Fondations** - Introduction, architecture centrale, sécurité & multi-locataire, configuration de l’environnement
    - **Ateliers 04-06 : Construction du serveur MCP** - Conception base données & schéma, implémentation serveur MCP, développement d’outils
    - **Ateliers 07-09 : Fonctionnalités avancées** - Intégration recherche sémantique, test & débogage, intégration VS Code
    - **Ateliers 10-12 : Production & bonnes pratiques** - Stratégies de déploiement, suivi & observabilité, meilleures pratiques & optimisation
  - **Technologies d’entreprise** : Framework FastMCP, PostgreSQL avec pgvector, embeddings Azure OpenAI, Azure Container Apps, Application Insights
  - **Fonctionnalités avancées** : Sécurité au niveau des lignes (RLS), recherche sémantique, accès aux données multi-locataires, embeddings vectoriels, surveillance en temps réel

#### Standardisation de la terminologie - Conversion de module à atelier
- **Mise à jour documentaire complète** : Mise à jour systématique de tous les fichiers README dans 11-MCPServerHandsOnLabs pour utiliser la terminologie « atelier » à la place de « module »
  - **Titres de section** : Remplacement de « Ce que ce module couvre » par « Ce que cet atelier couvre » dans les 13 ateliers
  - **Description du contenu** : Modification de « Ce module fournit... » en « Cet atelier fournit... » dans toute la documentation
  - **Objectifs d’apprentissage** : Mise à jour de « À la fin de ce module... » à « À la fin de cet atelier... »
  - **Liens de navigation** : Conversion de toutes les références « Module XX : » en « Atelier XX : » dans les références croisées et la navigation
  - **Suivi des complétions** : Mise à jour de « Après avoir complété ce module... » à « Après avoir complété cet atelier... »
  - **Références techniques conservées** : Maintien des références aux modules Python dans les fichiers de configuration (ex. `"module": "mcp_server.main"`)

#### Amélioration du guide d’étude (study_guide.md)
- **Carte visuelle du curriculum** : Ajout de la nouvelle section « 11. Ateliers d’intégration base de données » avec visualisation complète de la structure des ateliers
- **Structure du dépôt** : Passage de dix à onze sections principales avec description détaillée de 11-MCPServerHandsOnLabs
- **Orientation du parcours d’apprentissage** : Instructions de navigation améliorées couvrant les sections 00-11
- **Couverture technologique** : Ajout des détails sur FastMCP, PostgreSQL et intégration des services Azure
- **Résultats d’apprentissage** : Mise en avant du développement de serveurs prêts pour la production, des modèles d’intégration base données et de la sécurité en entreprise

#### Amélioration de la structure du README principal
- **Terminologie basée sur les ateliers** : Mise à jour du README.md principal dans 11-MCPServerHandsOnLabs pour utiliser systématiquement la structure « atelier »
- **Organisation du parcours d’apprentissage** : Progression claire des concepts fondamentaux à la mise en œuvre avancée puis au déploiement en production
- **Orientation pratique** : Accent sur l’apprentissage pratique avec des modèles et technologies d’entreprise

### Améliorations de la qualité et de la cohérence de la documentation
- **Accent sur l’apprentissage pratique** : Renforcement de l’approche pratique basée sur les ateliers dans toute la documentation
- **Focalisation sur les modèles d’entreprise** : Mise en lumière des implémentations prêtes pour la production et des considérations de sécurité en entreprise
- **Intégration technologique** : Couverture complète des services Azure modernes et des modèles d’intégration IA
- **Progression de l’apprentissage** : Parcours clair et structuré du concept de base jusqu’au déploiement en production

## 26 septembre 2025

### Amélioration des études de cas - Intégration du registre MCP GitHub

#### Études de cas (09-CaseStudy/) - Focus sur le développement de l’écosystème
- **README.md** : Expansion majeure avec étude de cas complète sur le registre MCP GitHub
  - **Étude de cas registre MCP GitHub** : Nouvelle étude approfondie examinant le lancement du registre MCP de GitHub en septembre 2025
    - **Analyse du problème** : Examen détaillé des défis liés à la découverte et au déploiement fragmentés des serveurs MCP
    - **Architecture de la solution** : Approche centralisée de registre par GitHub avec installation VS Code en un clic
    - **Impact commercial** : Amélioration mesurable de l’intégration et de la productivité des développeurs
    - **Valeur stratégique** : Accent sur le déploiement modulaire d’agents et l’interopérabilité inter-outils
    - **Développement de l’écosystème** : Positionnement comme plateforme fondamentale pour l’intégration agentique
  - **Structure améliorée des études de cas** : Mise à jour des sept études de cas avec un formatage cohérent et des descriptions détaillées
    - Agents de voyage Azure IA : Accent sur l’orchestration multi-agent
    - Intégration Azure DevOps : Focus sur l’automatisation des flux de travail
    - Récupération de documentation en temps réel : Implémentation client console Python
    - Générateur de plans d’étude interactif : Application web conversationnelle Chainlit
    - Documentation intégrée à l’éditeur : Intégration VS Code et GitHub Copilot
    - Azure API Management : Modèles d’intégration API entreprise
    - Registre MCP GitHub : Développement de l’écosystème et plateforme communautaire
  - **Conclusion complète** : Réécriture de la section conclusion mettant en lumière les sept études de cas couvrant plusieurs dimensions de mise en œuvre MCP
    - Intégration entreprise, orchestration multi-agent, productivité des développeurs
    - Développement de l’écosystème, catégorisation des applications éducatives
    - Insights améliorés sur les modèles architecturaux, les stratégies d’implémentation et les meilleures pratiques
    - Accent sur MCP comme protocole mature, prêt pour la production

#### Mises à jour du guide d’étude (study_guide.md)
- **Carte visuelle du curriculum** : Mise à jour du mindmap pour inclure le registre MCP GitHub dans la section Études de cas
- **Description des études de cas** : Améliorée de descriptions génériques à une décomposition détaillée de sept études de cas complètes
- **Structure du dépôt** : Mise à jour de la section 10 pour refléter la couverture complète des études de cas avec détails spécifiques d’implémentation
- **Intégration du changelog** : Ajout de l’entrée du 26 septembre 2025 documentant l’ajout du registre MCP GitHub et les améliorations des études de cas
- **Mise à jour des dates** : Actualisation du pied de page horodaté pour refléter la dernière révision (26 septembre 2025)

### Améliorations de la qualité de la documentation
- **Renforcement de la cohérence** : Uniformisation du formatage et de la structure des études de cas sur tous les sept exemples
- **Couverture complète** : Les études de cas couvrent désormais scénarios d’entreprise, productivité des développeurs et développement d’écosystème
- **Positionnement stratégique** : Accent renforcé sur MCP comme plateforme fondamentale pour le déploiement de systèmes agentiques
- **Intégration des ressources** : Mise à jour des ressources complémentaires pour inclure le lien vers le registre MCP GitHub

## 15 septembre 2025

### Expansion des sujets avancés - Transports personnalisés & ingénierie du contexte

#### Transports personnalisés MCP (05-AdvancedTopics/mcp-transport/) - Nouveau guide d’implémentation avancé
- **README.md** : Guide complet d’implémentation pour les mécanismes de transport MCP personnalisés
  - **Transport Azure Event Grid** : Implémentation complète de transport événementiel serverless
    - Exemples en C#, TypeScript, et Python avec intégration Azure Functions
    - Modèles d’architecture événementielle pour solutions MCP évolutives
    - Récepteurs webhook et gestion de messages push
  - **Transport Azure Event Hubs** : Implémentation de transport streaming à haut débit
    - Capacités de streaming en temps réel pour scénarios à faible latence
    - Stratégies de partitionnement et gestion des checkpoints
    - Regroupement des messages et optimisation des performances
  - **Modèles d’intégration entreprise** : Exemples architecturaux prêts pour la production
    - Traitement MCP distribué sur plusieurs Azure Functions
    - Architectures de transport hybrides combinant plusieurs types de transport
    - Durabilité des messages, fiabilité, et stratégies de gestion des erreurs
  - **Sécurité & surveillance** : Intégration Azure Key Vault et modèles d’observabilité
    - Authentification à identité gérée et principe du moindre privilège
    - Télémetrie Application Insights et surveillance des performances
    - Disjoncteurs et modèles de tolérance aux pannes
  - **Frameworks de test** : Stratégies complètes de tests pour transports personnalisés
    - Tests unitaires avec doubles de test et frameworks de simulation
    - Tests d’intégration avec Azure Test Containers
    - Considérations pour tests de performance et charge

#### Ingénierie du contexte (05-AdvancedTopics/mcp-contextengineering/) - Discipline émergente en IA
- **README.md** : Exploration complète de l’ingénierie du contexte comme domaine émergent
  - **Principes fondamentaux** : Partage complet du contexte, conscience décisionnelle d’action, gestion de la fenêtre de contexte
  - **Alignement avec le protocole MCP** : Comment la conception MCP répond aux défis de l’ingénierie du contexte
    - Limitations de la fenêtre de contexte et stratégies de chargement progressif
    - Détermination de la pertinence et récupération dynamique du contexte
    - Gestion multi-modale du contexte et considérations de sécurité
  - **Approches d’implémentation** : Architectures mono-thread vs multi-agent
    - Découpage et priorisation du contexte
    - Chargement progressif du contexte et stratégies de compression
    - Approches en couches du contexte et optimisation de la récupération
  - **Cadre de mesure** : Métriques émergentes pour l’évaluation de l’efficacité du contexte
    - Efficacité d’entrée, performance, qualité, et considérations UX
    - Approches expérimentales pour l’optimisation du contexte
    - Analyse des échecs et méthodologies d’amélioration

#### Mises à jour de la navigation du curriculum (README.md)
- **Structure de module améliorée** : Mise à jour du tableau du curriculum pour inclure les nouveaux sujets avancés
  - Ajout des entrées Ingénierie du contexte (5.14) et Transport personnalisé (5.15)
  - Formatage cohérent et liens de navigation pour tous les modules
  - Mise à jour des descriptions pour refléter le contenu actuel

### Améliorations de la structure des répertoires
- **Standardisation des noms** : Renommage de « mcp transport » en « mcp-transport » pour homogénéité avec les autres dossiers de sujets avancés
- **Organisation du contenu** : Tous les dossiers 05-AdvancedTopics suivent désormais la même convention de nommage (mcp-[topic])

### Améliorations de la qualité documentaire
- **Alignement à la spécification MCP** : Tous les nouveaux contenus référencent la spécification MCP actuelle 2025-06-18
- **Exemples multi-langages** : Exemples de code complets en C#, TypeScript et Python

- **Focus Entreprise** : Modèles prêts pour la production et intégration cloud Azure tout au long
- **Documentation Visuelle** : Diagrammes Mermaid pour l’architecture et la visualisation des flux

## 18 août 2025

### Mise à jour complète de la documentation - Normes MCP 2025-06-18

#### Bonnes pratiques de sécurité MCP (02-Security/) - Modernisation complète
- **MCP-SECURITY-BEST-PRACTICES-2025.md** : Réécriture complète alignée avec la spécification MCP 2025-06-18
  - **Exigences obligatoires** : Ajout explicite des obligations DEVRAIENT/NE DEVRAIENT PAS de la spécification officielle avec indicateurs visuels clairs
  - **12 pratiques de sécurité fondamentales** : Restructuration d’une liste de 15 éléments en domaines de sécurité complets
    - Sécurité des tokens & authentification avec intégration de fournisseur d’identité externe
    - Gestion de session & sécurité de transport avec exigences cryptographiques
    - Protection spécifique aux menaces IA avec intégration Microsoft Prompt Shields
    - Contrôle d’accès & permissions avec principe du moindre privilège
    - Sécurité du contenu & surveillance avec intégration Azure Content Safety
    - Sécurité de la chaîne d’approvisionnement avec vérification complète des composants
    - Sécurité OAuth & prévention des attaques de type deputy confondu avec implémentation PKCE
    - Réponse aux incidents & récupération avec capacités automatisées
    - Conformité & gouvernance avec alignement réglementaire
    - Contrôles de sécurité avancés avec architecture zero trust
    - Intégration de l’écosystème de sécurité Microsoft avec solutions complètes
    - Évolution continue de la sécurité avec pratiques adaptatives
  - **Solutions de sécurité Microsoft** : Guidance d’intégration améliorée pour Prompt Shields, Azure Content Safety, Entra ID, et GitHub Advanced Security
  - **Ressources d’implémentation** : Liens de ressource catégorisés par documentation officielle MCP, solutions de sécurité Microsoft, normes de sécurité, et guides d’implémentation

#### Contrôles de sécurité avancés (02-Security/) - Implémentation entreprise
- **MCP-SECURITY-CONTROLS-2025.md** : Refonte complète avec cadre de sécurité de niveau entreprise
  - **9 domaines de sécurité complets** : Expansion des contrôles basiques vers un cadre détaillé d’entreprise
    - Authentification & autorisation avancées avec intégration Microsoft Entra ID
    - Sécurité des tokens & contrôles anti-passthrough avec validation complète
    - Contrôles de sécurité des sessions avec prévention du détournement
    - Contrôles de sécurité spécifiques à l’IA avec prévention des injections de prompts et empoisonnements d’outils
    - Prévention des attaques de type deputy confondu avec sécurisation du proxy OAuth
    - Sécurité d’exécution des outils avec sandboxing et isolation
    - Contrôles de sécurité de la chaîne d’approvisionnement avec vérification des dépendances
    - Contrôles de surveillance & détection avec intégration SIEM
    - Réponse aux incidents & récupération avec capacités automatisées
  - **Exemples d’implémentation** : Ajout de blocs de configuration YAML détaillés et exemples de code
  - **Intégration des solutions Microsoft** : Couverture complète des services de sécurité Azure, GitHub Advanced Security, et gestion d’identité entreprise

#### Sécurité des sujets avancés (05-AdvancedTopics/mcp-security/) - Implémentation prête pour la production
- **README.md** : Réécriture complète pour implémentation de sécurité entreprise
  - **Alignement sur spécification actuelle** : Mise à jour à la spécification MCP 2025-06-18 avec exigences de sécurité obligatoires
  - **Authentification renforcée** : Intégration Microsoft Entra ID avec exemples complets .NET et Java Spring Security
  - **Intégration sécurité IA** : Implémentation Microsoft Prompt Shields et Azure Content Safety avec exemples Python détaillés
  - **Atténuation avancée des menaces** : Exemples d’implémentation complets pour
    - Prévention des attaques de type deputy confondu avec PKCE et validation du consentement utilisateur
    - Prévention du passthrough de token avec validation de l’audience et gestion sécurisée des tokens
    - Prévention du détournement de session avec liaison cryptographique et analyse comportementale
  - **Intégration sécurité entreprise** : Surveillance Azure Application Insights, pipelines de détection de menaces, et sécurité de la chaîne d’approvisionnement
  - **Liste de contrôle d’implémentation** : Contrôles de sécurité obligatoires vs. recommandés clairement différenciés avec avantages de l’écosystème de sécurité Microsoft

### Qualité et alignement des normes de la documentation
- **Références de spécification** : Mise à jour de toutes les références à la spécification MCP actuelle 2025-06-18
- **Écosystème sécurité Microsoft** : Guidance d’intégration améliorée dans toute la documentation de sécurité
- **Implémentation pratique** : Ajout d’exemples de code détaillés en .NET, Java, et Python avec modèles d’entreprise
- **Organisation des ressources** : Catégorisation complète de la documentation officielle, normes de sécurité, et guides d’implémentation
- **Indicateurs visuels** : Marquage clair des exigences obligatoires vs. pratiques recommandées


#### Concepts fondamentaux (01-CoreConcepts/) - Modernisation complète
- **Mise à jour de la version du protocole** : Mise à jour pour référencer la spécification MCP actuelle 2025-06-18 avec versionnement basé sur la date (format AAAA-MM-JJ)
- **Raffinement de l’architecture** : Descriptions améliorées des hôtes, clients et serveurs pour refléter les modèles d’architecture MCP actuels
  - Hôtes désormais clairement définis comme applications IA coordonnant plusieurs connexions clients MCP
  - Clients décrits comme connecteurs de protocole maintenant des relations un-à-un avec serveurs
  - Serveurs améliorés avec scénarios de déploiement local vs distant
- **Restructuration des primitives** : Révision complète des primitives serveur et client
  - Primitives serveur : Ressources (sources de données), Prompts (modèles), Outils (fonctions exécutables) avec explications détaillées et exemples
  - Primitives client : Échantillonnage (complétions LLM), Élaboration (entrée utilisateur), Journalisation (débogage/surveillance)
  - Mise à jour avec les modèles de méthode actuels de découverte (`*/list`), récupération (`*/get`), et exécution (`*/call`)
- **Architecture du protocole** : Introduction d’un modèle d’architecture à deux couches
  - Couche données : Fondement JSON-RPC 2.0 avec gestion du cycle de vie et primitives
  - Couche transport : Mécanismes de transport STDIO (local) et HTTP Streamable avec SSE (distant)
- **Cadre de sécurité** : Principes de sécurité complets incluant consentement utilisateur explicite, protection de la vie privée des données, sécurité d’exécution des outils, et sécurité de la couche transport
- **Modèles de communication** : Messages de protocole mis à jour pour montrer les flux d’initialisation, découverte, exécution, et notification
- **Exemples de code** : Rafraîchissement des exemples multilingues (.NET, Java, Python, JavaScript) pour refléter les modèles actuels du SDK MCP

#### Sécurité (02-Security/) - Révision complète de la sécurité  
- **Alignement aux normes** : Alignement total avec les exigences de sécurité de la spécification MCP 2025-06-18
- **Évolution de l’authentification** : Documentation de l’évolution des serveurs OAuth personnalisés vers délégation de fournisseur d’identité externe (Microsoft Entra ID)
- **Analyse des menaces spécifiques à l’IA** : Couverture améliorée des vecteurs d’attaque IA modernes
  - Scénarios détaillés d’attaques par injection de prompt avec exemples réels
  - Mécanismes d’empoisonnement d’outils et modèles d’attaque "rug pull"
  - Empoisonnement de la fenêtre de contexte et attaques de confusion des modèles
- **Solutions de sécurité IA Microsoft** : Couverture complète de l’écosystème de sécurité Microsoft
  - AI Prompt Shields avec détection avancée, mise en lumière et techniques de délimitation
  - Modèles d’intégration Azure Content Safety
  - GitHub Advanced Security pour la protection de la chaîne d’approvisionnement
- **Atténuation avancée des menaces** : Contrôles de sécurité détaillés pour
  - Détournement de session avec scénarios d’attaque spécifiques au MCP et exigences cryptographiques sur les identifiants de session
  - Problèmes de deputy confondu dans les scénarios proxy MCP avec exigences explicites de consentement
  - Vulnérabilités de passthrough de token avec contrôles de validation obligatoires
- **Sécurité de la chaîne d’approvisionnement** : Extension de la couverture de la chaîne d’approvisionnement IA incluant modèles fondamentaux, services d’indexation, fournisseurs de contexte, et API tierces
- **Sécurité fondamentale** : Intégration améliorée avec modèles de sécurité entreprise incluant architecture zero trust et écosystème de sécurité Microsoft
- **Organisation des ressources** : Liens de ressources complets catégorisés par type (Docs Officielles, Normes, Recherche, Solutions Microsoft, Guides d’Implémentation)

### Améliorations de la qualité de la documentation
- **Objectifs d’apprentissage structurés** : Objectifs renforcés avec résultats spécifiques et actionnables
- **Références croisées** : Ajout de liens entre sujets de sécurité et concepts fondamentaux connexes
- **Informations à jour** : Actualisation de toutes les références de dates et liens de spécification aux normes en vigueur
- **Guides d’implémentation** : Ajout de directives spécifiques et actionnables tout au long des deux sections

## 16 juillet 2025

### Améliorations du README et de la navigation
- Refonte complète de la navigation du curriculum dans README.md
- Remplacement des balises `<details>` par un format de table plus accessible
- Création d’options de mise en page alternatives dans le nouveau dossier "alternative_layouts"
- Ajout d’exemples de navigation par cartes, onglets, et accordéons
- Mise à jour de la section structure du dépôt pour inclure tous les fichiers récents
- Amélioration de la section "Comment utiliser ce curriculum" avec recommandations claires
- Mise à jour des liens de spécification MCP pour pointer vers les URLs correctes
- Ajout de la section Ingénierie du contexte (5.14) à la structure du curriculum

### Mises à jour du guide d’étude
- Révision complète du guide d’étude pour alignement sur la structure actuelle du dépôt
- Ajout de nouvelles sections pour les clients MCP et outils, ainsi que serveurs MCP populaires
- Mise à jour de la carte visuelle du curriculum pour refléter tous les sujets
- Amélioration des descriptions des sujets avancés pour couvrir toutes les zones spécialisées
- Mise à jour de la section études de cas pour refléter des exemples réels
- Ajout de ce journal des modifications complet

### Contributions de la communauté (06-CommunityContributions/)
- Ajout d’informations détaillées sur les serveurs MCP pour la génération d’images
- Ajout d’une section complète sur l’utilisation de Claude dans VSCode
- Ajout des instructions d’installation et d’utilisation du client terminal Cline
- Mise à jour de la section client MCP pour inclure toutes les options populaires
- Amélioration des exemples de contribution avec des échantillons de code plus précis

### Sujets avancés (05-AdvancedTopics/)
- Organisation de tous les dossiers de sujets spécialisés avec une nomenclature cohérente
- Ajout de matériaux et d’exemples d’ingénierie du contexte
- Ajout de la documentation d’intégration de l’agent Foundry
- Amélioration de la documentation d’intégration sécurité Entra ID

## 11 juin 2025

### Création initiale
- Publication de la première version du curriculum MCP pour débutants
- Création de la structure de base pour les 10 sections principales
- Mise en œuvre de la carte visuelle du curriculum pour la navigation
- Ajout de projets d’exemple initiaux dans plusieurs langages de programmation

### Premiers pas (03-GettingStarted/)
- Création des premiers exemples d’implémentation serveur
- Ajout de guides de développement client
- Inclusion des instructions d’intégration client LLM
- Ajout de la documentation d’intégration VS Code
- Mise en œuvre des exemples serveur d’événements Server-Sent Events (SSE)

### Concepts fondamentaux (01-CoreConcepts/)
- Ajout d’explication détaillée de l’architecture client-serveur
- Création de la documentation sur les composants clés du protocole
- Documentation des modèles de messagerie dans MCP

## 23 mai 2025

### Structure du dépôt
- Initialisation du dépôt avec structure de dossiers basique
- Création des fichiers README pour chaque section majeure
- Mise en place de l’infrastructure de traduction
- Ajout des ressources d’images et diagrammes

### Documentation
- Création du README.md initial avec vue d’ensemble du curriculum
- Ajout de CODE_OF_CONDUCT.md et SECURITY.md
- Mise en place de SUPPORT.md avec guide d’aide
- Création de la structure préliminaire du guide d’étude

## 15 avril 2025

### Planification et cadre
- Planification initiale pour le curriculum MCP pour débutants
- Définition des objectifs d’apprentissage et public cible
- Esquisse de la structure en 10 sections du curriculum
- Développement d’un cadre conceptuel pour les exemples et études de cas
- Création des prototypes d’exemples initiaux pour les concepts clés

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->