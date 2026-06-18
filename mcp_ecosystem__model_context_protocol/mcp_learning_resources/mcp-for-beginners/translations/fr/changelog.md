# Journal des modifications : Curriculum MCP pour débutants

Ce document sert de registre pour toutes les modifications importantes apportées au curriculum Model Context Protocol (MCP) pour débutants. Les modifications sont documentées dans l'ordre chronologique inverse (nouvelles modifications en premier).

## 16 juin 2026

### Alignement de la spécification MCP et validation des exemples

Validation du curriculum par rapport à la **spécification MCP du 25-11-2025** en vigueur et aux SDK officiels les plus récents, puis correction des références obsolètes restantes à la spécification et confirmation que les exemples centraux compilent et s'exécutent toujours.

#### Corrections de version de spécification (18-06-2025 / 26-03-2025 → 25-11-2025)

Mise à jour du contenu anglais où il prétendait encore qu'une révision antérieure de la spécification était la norme *actuelle/la plus récente*, et redirection des liens vers les chemins canoniques de la spécification sur `modelcontextprotocol.io` :
- **05-AdvancedTopics/mcp-security/README.md** : Mise à jour de la bannière « Norme actuelle », introduction, titre des principes fondamentaux de sécurité, titre des exigences obligatoires, section Microsoft Entra ID, liens Références & Ressources, et avis final de sécurité (8 références) vers 25-11-2025
- **05-AdvancedTopics/mcp-transport/README.md** : Mise à jour du lien vers la ressource supplémentaire de la spécification et de la bannière « Norme actuelle » à 25-11-2025
- **05-AdvancedTopics/mcp-realtimesearch/README.md** : Remplacement du lien obsolète `2025-03-26` vers la page de bonnes pratiques de sécurité et de confiance par l’actuel 25-11-2025
- **03-GettingStarted/14-sampling/README.md** : Mise à jour du lien officiel des documents sur l’échantillonnage vers 25-11-2025
- **03-GettingStarted/05-stdio-server/README.md** : Mise à jour de la référence en temps présent à la « spécification MCP actuelle » ainsi que du lien vers la ressource supplémentaire de la spécification à 25-11-2025 (notes historiques sur la dépréciation SSE laissées pour exactitude)

#### Validation des exemples par rapport aux SDK actuels

- **TypeScript (03-GettingStarted/01-first-server/solution/typescript)** : `npm install` a résolu `@modelcontextprotocol/sdk@1.29.0` ; `tsc --noEmit` a réussi sans erreurs de typage — les API existantes `McpServer`/`StdioServerTransport` restent valides
- **Python (03-GettingStarted/01-first-server/solution/python)** : Validé dans un environnement `.venv` isolé avec `mcp[cli]` (1.27.2) ; `py_compile` a réussi et `FastMCP.list_tools()` a correctement retourné les outils `add` et `subtract`
- Confirmation que toutes les plages de versions `@modelcontextprotocol/sdk` des exemples (`>=1.26.0` / `^1.26.0` / `^1.27.0`) se résolvent proprement vers la version actuelle `1.29.0` sans ruptures dans les API

#### Alignement des dépendances (fermeture des écarts de version)

Mise à jour des versions obsolètes du SDK pour que chaque exemple suive la version de sortie MCP actuelle, conformément à la convention du dépôt :
- **03-GettingStarted/05-stdio-server/solution/typescript/package.json** : Passage de `@modelcontextprotocol/sdk` de `^1.8.0` → `>=1.26.0` et mise à jour de la description du paquet obsolète `"updated for MCP 2025-06-18"` en `"aligned with MCP Specification 2025-11-25"`
- **10-StreamliningAIWorkflows.../lab3/code/weather_mcp/pyproject.toml** et **lab4/code/github_mcp_server/pyproject.toml** : Passage de la version exacte `mcp==1.23.0` → `mcp>=1.26.0` ; régénération des deux fichiers `uv.lock` (`uv lock`) pour que les fichiers lock se résolvent vers la version `mcp 1.27.2` actuelle et restent synchronisés avec les manifests

#### Analyse des lacunes du curriculum — Couverture des fonctionnalités de la dernière spécification

Vérification que le curriculum couvre déjà tous les primitifs introduits/étendus dans MCP 2025-11-25, donc aucun contenu manquant :
- **Échantillonnage** : Leçon 03-GettingStarted/14-sampling plus 05-AdvancedTopics/mcp-sampling
- **Elicitation (y compris mode URL)** : Documenté dans 01-CoreConcepts et 05-AdvancedTopics/mcp-protocol-features
- **Racines** : Documenté dans 00-Introduction, 01-CoreConcepts et 05-AdvancedTopics/mcp-root-contexts
- **Tâches (expérimentales, opérations longues)** : Documenté dans 01-CoreConcepts et 05-AdvancedTopics/mcp-protocol-features
- **Annotations d’outils** (`readOnlyHint` / `destructiveHint`) : Documenté dans 01-CoreConcepts et 05-AdvancedTopics/mcp-protocol-features

### Renforcement de la sécurité et correction des vulnérabilités des dépendances

Exécution d’un contrôle complet de sécurité sur chaque manifeste de dépendances et sur le code source des exemples, puis correction de tous les avis npm signalés ainsi qu’une anomalie au niveau du code. Après correction, `npm audit` indique **0 vulnérabilités** dans tous les répertoires audités.

#### Vulnérabilités des dépendances npm (transitives) — Corrigées

Audit de tous les 15 fichiers `package-lock.json` engagés. Les vulnérabilités étaient limitées aux dépendances transitives amenées par les outils de développement MCP Inspector, le client OpenAI, et le SDK MCP ; toutes sont désormais résolues sans casser les exemples :
- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/inspector** et **lab3/code/weather_mcp/inspector** : Mise à jour de `@modelcontextprotocol/inspector` (`0.16.6` / `0.14.1` → `0.22.0`) qui a levé les avis liés à `ajv`, `brace-expansion`, `diff`, `path-to-regexp` et `ws` embarqués. Ajout d’une entrée npm `overrides` forçant la version corrigée `shell-quote@1.8.4` afin d’éliminer l’avis critique restant porté par `concurrently` ; régénération des deux fichiers lock (désormais 0 vulnérabilités)
- **03-GettingStarted/samples/typescript** : `npm audit fix` a mis à jour la dépendance transitive `qs` (modérée) vers une version corrigée
- **03-GettingStarted/samples/javascript** : `npm audit fix` a mis à jour la dépendance transitive `hono` (modérée) vers une version corrigée
- **03-GettingStarted/03-llm-client/solution/typescript** : `npm audit fix` a mis à jour la dépendance transitive `form-data` (élevée) vers une version corrigée
- **03-GettingStarted/11-simple-auth/solution/typescript** : Génération du fichier `package-lock.json` manquant pour rendre le projet reproductible et auditable (0 vulnérabilités)

#### Correction au niveau du code (OWASP A03 : Injection)

- **10-StreamliningAIWorkflows.../lab4/code/github_mcp_server/src/server.py** : Suppression de `shell=True` dans l’outil `open_in_vscode`. L’ancienne commande `subprocess.run(["start", "", vscode_path, folder_path], shell=True)` permettait que les métacaractères shell dans un chemin de dossier soient interprétés par `cmd.exe` (vecteur d’injection de commande). Le lancement se fait désormais directement avec l’exécutable résolu `Code.exe` et le dossier en argument — sans shell — ce qui est fonctionnellement équivalent et sûr

#### Audit des dépendances Python

- Audit de tous les ensembles de requirements Python avec `pip-audit`. `05-AdvancedTopics` et `03-GettingStarted/samples/python` ne signalent **aucune vulnérabilité connue** (leurs plages pour `mcp` / `httpx` / `pydantic` / `python-dotenv` se résolvent sur des versions corrigées actuelles)
- **09-CaseStudy/docs-mcp/solution/python/requirements.txt** : `pip-audit` a signalé la dépendance transitive **`werkzeug` 3.1.1** avec trois avis de DoS liés à `safe_join` pour noms de périphériques Windows — `CVE-2025-66221`, `CVE-2026-21860`, et `CVE-2026-27199` (tous corrigés en 3.1.6). Ajout d’un verrou explicite de sécurité `werkzeug>=3.1.6` pour résoudre la version corrigée ; vérification que la contrainte se résout proprement avec la pile `chainlit` / `mcp` / `semantic-kernel`

### Rebranding du nom du produit

Mise à jour de tout le contenu du curriculum pour refléter le rebranding produit de Microsoft :

#### Azure AI Foundry → Microsoft Foundry
- **SUPPORT.md** : Mise à jour du lien Discord de la communauté
- **AGENTS.md** : Mise à jour de la référence au serveur Discord
- **README.md** : Mise à jour des références à l’écosystème technologique
- **study_guide.md** : Mise à jour des références dans les études de cas
- **05-AdvancedTopics/README.md** : Mise à jour du titre et description du Module 5.13
- **05-AdvancedTopics/mcp-integration/README.md** : Mise à jour de l’en-tête de section et description
- **05-AdvancedTopics/mcp-foundry-agent-integration/README.md** : Mise à jour complète du titre et contenu du module
- **05-AdvancedTopics/mcp-security-entra/README.md** : Mise à jour du lien de référence croisée
- **07-LessonsfromEarlyAdoption/README.md** : Mise à jour des références dans les études de cas
- **07-LessonsfromEarlyAdoption/microsoft-mcp-servers.md** : Mise à jour du titre de la section 9, badges et capacités
- **08-BestPractices/README.md** : Mise à jour du lien Discord de la communauté
- **09-CaseStudy/docs-mcp/solution/scenario3/README.md** : Mise à jour de la référence au canal Discord
- **09-CaseStudy/docs-mcp/solution/python/README.md** : Mise à jour de la référence au déploiement de modèle
- **11-MCPServerHandsOnLabs/00-Introduction/README.md** : Mise à jour du tableau des services IA
- **11-MCPServerHandsOnLabs/03-Setup/README.md** : Mise à jour des références aux ressources

#### AI Toolkit / AITK → Microsoft Foundry Toolkit Extension for VS Code
- **README.md** : Mise à jour des références principales du curriculum
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/README.md** : Mise à jour du titre du module, de la vue d’ensemble, et de tous les en-têtes de module
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab1/README.md** : Mise à jour du titre, objectifs d’apprentissage, instructions d’installation, et ressources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab2/README.md** : Mise à jour du titre, objectifs d’apprentissage, tableau des hôtes MCP, et références croisées
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/README.md** : Mise à jour du titre, badges, prérequis, et ressources
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/README.md** : Mise à jour des références à Agent Builder et lien de retour d’expérience
- **10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/README.md** : Mise à jour des prérequis et des références à l’extension

---

## 11 avril 2026

### Nouvelle leçon, corrections de documentation et mises à jour des dépendances

#### Nouveau contenu de curriculum ajouté

**Module 05 - Sujets avancés**
- **Leçon 5.17 : Raisonnement multi-agent antagoniste avec MCP** (`05-AdvancedTopics/mcp-adversarial-agents/README.md`) : Nouveau guide complet couvrant le modèle de débat antagoniste pour systèmes multi-agents
  - Diagramme d’architecture Mermaid : deux agents → serveur MCP partagé → transcription du débat → juge → verdict
  - Serveur d’outils MCP partagé (`web_search` + `run_python`) implémenté en Python et TypeScript
  - Prompts système opposés (POUR / CONTRE / Juge) avec exigences explicites d’usage d’outils
  - Orchestrateur de débat en Python, TypeScript et C# gérant les tours et le routage des arguments
  - Câblage MCP `ClientSession` pour l’orchestrateur vers des appels réels d’outils
  - Tableau des cas d’utilisation (détection d’hallucination, modélisation de menaces, revue de conception d’API, vérification factuelle, sélection technologique)
  - Considérations de sécurité : exécution sandboxée, validation des appels d’outils, limitation du débit, journal d’audit
  - Exercice structuré avec trois scénarios pratiques (revue de code, décision d’architecture, modération de contenu)

#### Corrections de documentation

**Module 03 - Prise en main**
- **05-stdio-server/README.md** : Correction de l’exemple incomplet de serveur stdio TypeScript — ajout de l’instanciation manquante du transport (`new StdioServerTransport()`) et de l’appel `server.connect(transport)` pour correspondre aux exemples Python et .NET dans la même section
- **14-sampling/README.md** : Correction d’une faute de frappe — correction de `"Sampling is an davanced features"` → `"Sampling is an advanced feature"`

#### Mises à jour du curriculum

**README.md principal**
- Ajout de l’entrée 5.17 (Raisonnement multi-agent antagoniste avec MCP) dans le tableau du curriculum avec lien direct vers la nouvelle leçon

**05-AdvancedTopics/README.md**
- Ajout de la ligne Leçon 5.17 au tableau des leçons

**study_guide.md**
- Ajout du sujet Raisonnement multi-agent antagoniste dans la carte mentale et la description en prose des Sujets avancés

#### Corrections de code et de sécurité

**Module 05 - Agents antagonistes (`mcp-adversarial-agents`)**
- **Correction de sécurité — injection de commande** : Remplacement de l’interpolation shell `execSync` par `execFile` + `promisify` dans l’outil `run_python` TypeScript, éliminant la surface d’injection de commande (le code contrôlé par LLM est maintenant passé comme un élément argv littéral sans implication du shell)
- **Câblage de la boucle d'outil MCP** : Mise à jour de l'orchestrateur de débat Python pour utiliser le client `AsyncAnthropic` (remplaçant le `Anthropic` synchrone bloquant), passer une `ClientSession` en direct à chaque tour d'agent, récupérer les définitions d'outils via `session.list_tools()` à chaque tour, et dispatcher les blocs `tool_use` via `session.call_tool()` dans une boucle jusqu'à ce que le modèle émette une réponse textuelle finale

#### Mises à jour des dépendances

- Passage de `hono` à la version 4.12.12 dans plusieurs packages (03-GettingStarted, 04-PracticalImplementation, 10-StreamliningAIWorkflows)
- Passage de `@hono/node-server` de la version 1.19.11 à 1.19.13 dans les packages TypeScript
- Passage de `cryptography` de la version 46.0.5 à 46.0.7 dans les packages Python (10-StreamliningAIWorkflows laboratoires 3 et 4)
- Passage de `lodash` de la version 4.17.23 à 4.18.1 dans l’inspecteur 10-StreamliningAIWorkflows

#### Traductions

- Synchronisation des traductions pour plus de 48 langues avec les derniers changements source (mise à jour i18n)

---

## 5 février 2026

### Améliorations de la validation et de la navigation dans l'ensemble du dépôt

#### Nouveau contenu de programme ajouté

**Module 03 - Premiers pas**
- **12-mcp-hosts/README.md** : Nouveau guide complet pour la configuration des hôtes MCP
  - Exemples de configuration Claude Desktop, VS Code, Cursor, Cline, Windsurf
  - Modèles de configuration JSON pour tous les principaux hôtes
  - Tableau comparatif des types de transport (stdio, SSE/HTTP, WebSocket)
  - Résolution des problèmes courants de connexion
  - Bonnes pratiques de sécurité pour la configuration des hôtes

- **13-mcp-inspector/README.md** : Nouveau guide de débogage pour MCP Inspector
  - Méthodes d'installation (npx, npm global, depuis la source)
  - Connexion aux serveurs via stdio et HTTP/SSE
  - Outils de test, ressources et workflows de prompts
  - Intégration VS Code avec MCP Inspector
  - Scénarios de débogage courants avec solutions

**Module 04 - Mise en œuvre pratique**
- **pagination/README.md** : Nouveau guide d’implémentation de la pagination
  - Modèles de pagination basés sur curseur en Python, TypeScript, Java
  - Gestion de la pagination côté client
  - Stratégies de conception de curseur (opaque vs structuré)
  - Recommandations pour l’optimisation des performances

**Module 05 - Sujets avancés**
- **mcp-protocol-features/README.md** : Nouvelle exploration des fonctionnalités du protocole
  - Implémentation des notifications de progression
  - Modèles d’annulation des requêtes
  - Modèles de ressources avec patrons URI
  - Gestion du cycle de vie du serveur
  - Contrôle des niveaux de journalisation
  - Modèles de gestion des erreurs avec codes JSON-RPC

#### Correctifs de navigation (plus de 24 fichiers mis à jour)

**README principaux des modules**  
 Désormais liens vers la première leçon ET le module suivant

**Sous-fichiers 02-Security**  
- Les 5 documents de sécurité complémentaires disposent maintenant d'une navigation « Quoi ensuite » :

**Fichiers 09-CaseStudy**  
- Tous les fichiers des études de cas disposent maintenant d'une navigation séquentielle :

**Laboratoires 10-StreamliningAI**  
Ajout d'une section Quoi ensuite à la vue d’ensemble du Module 10 et au Module 11

#### Correctifs de code et de contenu

**SDK et mises à jour de dépendances**  
Correction de la version openai vide en `^4.95.0`  
Mise à jour du SDK de `^1.8.0` à `>=1.26.0`  
Mise à jour des versions contraintes de mcp en `>=1.26.0`

**Corrections de code**  
Correction du modèle invalide `gpt-4o-mini` en `gpt-4.1-mini`

**Corrections de contenu**  
Correction de lien cassé `READMEmd` → `README.md`, correction de l’en-tête du programme `Module 1-3` → `Module 0-3`, correction de chemin sensible à la casse  
Suppression du contenu dupliqué corrompu de l’étude de cas 5

**Améliorations pour débutants**  
Ajout d’une introduction appropriée, des objectifs d’apprentissage et des prérequis pour les débutants

#### Mises à jour du programme

**README principal**  
- Ajout des entrées 3.12 (Hôtes MCP), 3.13 (Inspecteur MCP), 4.1 (Pagination), 5.16 (Fonctionnalités de protocole) dans le tableau du programme

**README des modules**  
Ajout des leçons 12 et 13 à la liste des leçons  
Ajout d'une section Guides pratiques avec lien vers la pagination  
Ajout des leçons 5.15 (Transport personnalisé) et 5.16 (Fonctionnalités de protocole)

**study_guide.md**  
- Mise à jour de la carte mentale avec tous les nouveaux sujets : Configuration des hôtes MCP, Inspecteur MCP, stratégies de pagination, exploration des fonctionnalités du protocole

## 28 janvier 2026

### Revue de conformité à la spécification MCP 2025-11-25

#### Amélioration des concepts fondamentaux (01-CoreConcepts/)  
- **Nouvelle primitive client - Roots** : Ajout de documentation complète sur la primitive client Roots, permettant aux serveurs de comprendre les limites du système de fichiers et les droits d’accès  
- **Annotations d’outils** : Ajout de documentation sur les annotations comportementales d’outils (`readOnlyHint`, `destructiveHint`) pour de meilleures décisions d’exécution d’outils  
- **Appel d’outils en échantillonnage** : Mise à jour de la documentation d’échantillonnage pour inclure les paramètres `tools` et `toolChoice` pour l’invocation d’outils pilotée par le modèle lors des requêtes d’échantillonnage  
- **Mode d’élicitation par URL** : Ajout de documentation sur l’élicitation basée sur URL pour les interactions web externes initiées par le serveur  
- **Tâches (expérimental)** : Ajout d’une nouvelle section documentant la fonctionnalité expérimentale des Tâches pour l’exécution durable et la récupération différée des résultats  
- **Support des icônes** : Mention que les outils, ressources, modèles de ressources et prompts peuvent désormais inclure des icônes en tant que métadonnées supplémentaires

#### Mises à jour documentaires  
- **README.md** : Ajout de la référence à la version de la spécification MCP 2025-11-25 et explication du versionnage basé sur la date  
- **study_guide.md** : Mise à jour de la carte du programme pour inclure les Tâches et les Annotations d’outils dans la section Concepts fondamentaux ; mise à jour de l’horodatage du document

#### Vérification de conformité à la spécification  
- **Version du protocole** : Vérification que toute la documentation référence la spécification MCP 2025-11-25 actuelle  
- **Alignement architectural** : Confirmation de l’exactitude documentaire de l’architecture à deux couches (couche données + couche transport)  
- **Documentation des primitives** : Validation des primitives serveur (Ressources, Prompts, Outils) et des primitives client (Échantillonnage, Élicitation, Journalisation, Roots)  
- **Mécanismes de transport** : Vérification de l’exactitude documentaire relatif au transport STDIO et HTTP Streamable  
- **Guidance de sécurité** : Confirmation de l’alignement avec la documentation actuelle des meilleures pratiques de sécurité MCP

#### Fonctionnalités clés de MCP 2025-11-25 documentées  
- **Découverte OpenID Connect** : Découverte du serveur d’authentification via OIDC  
- **Documents de métadonnées OAuth Client ID** : Mécanisme recommandé d’enregistrement client  
- **JSON Schema 2020-12** : Dialecte par défaut pour les définitions de schéma MCP  
- **Système de niveaux SDK** : Formalisation des exigences de prise en charge et maintenance des fonctionnalités SDK  
- **Structure de gouvernance** : Formalisation des groupes de travail et groupes d’intérêt dans la gouvernance MCP

### Mise à jour majeure de la documentation sécurité (02-Security/)

#### Intégration de l’atelier MCP Security Summit (Sherpa)  
- **Nouvelle ressource de formation pratique** : Ajout d'une intégration complète avec le [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) dans toute la documentation sécurité  
- **Couverture de la route de l’expédition** : Documentation complète de la progression camp à camp du Camp de base au Sommet  
- **Alignement OWASP** : Toute la guidance sécurité correspond désormais aux risques du MCP Azure Security Guide OWASP

#### Intégration OWASP MCP Top 10  
- **Nouvelle section** : Ajout du tableau des 10 risques de sécurité MCP OWASP avec atténuations Azure dans le README principal sécurité  
- **Documentation basée sur les risques** : Mise à jour de mcp-security-controls-2025.md avec les références de risques OWASP MCP pour chaque domaine de sécurité  
- **Architecture de référence** : Lien vers l’architecture de référence et les modèles d’implémentation du MCP Azure Security Guide OWASP

#### Fichiers sécurité mis à jour  
- **README.md** : Ajout de la présentation de l’atelier Sherpa, tableau de route d’expédition, résumé des risques OWASP MCP Top 10, et section formation pratique  
- **mcp-security-controls-2025.md** : En-tête mis à jour à février 2026, ajout des références de risques OWASP (MCP01-MCP08), correction d’incohérence de version de spécification  
- **mcp-security-best-practices-2025.md** : Ajout de la section ressources Sherpa et OWASP, mise à jour de l’horodatage  
- **mcp-best-practices.md** : Ajout d’une section formation pratique avec liens Sherpa et OWASP  
- **azure-content-safety-implementation.md** : Ajout de la référence OWASP MCP06, alignement Sherpa Camp 3, et section ressources supplémentaires

#### Nouveaux liens de ressources ajoutés  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Pages individuelles des risques OWASP MCP (MCP01-MCP10)

### Alignement de la spécification MCP 2025-11-25 sur l’ensemble du programme

#### Module 03 - Premiers pas  
- **Documentation SDK** : Ajout du SDK Go à la liste officielle des SDK ; mise à jour de toutes les références SDK pour alignement avec la spécification MCP 2025-11-25  
- **Clarification des transports** : Mise à jour des descriptions des transports STDIO et HTTP Streaming avec références explicites à la spécification

#### Module 04 - Mise en œuvre pratique  
- **Mises à jour SDK** : Ajout du SDK Go ; mise à jour de la liste des SDK avec référence version spécification  
- **Spécification d’autorisation** : Mise à jour du lien vers la spécification MCP d’autorisation à la version actuelle 2025-11-25

#### Module 05 - Sujets avancés  
- **Nouvelles fonctionnalités** : Ajout d’une note concernant les nouvelles fonctionnalités de la spécification MCP 2025-11-25 (Tâches, Annotations d’outils, Élicitation mode URL, Roots)  
- **Ressources de sécurité** : Ajout des liens OWASP MCP Top 10 et atelier Sherpa aux références supplémentaires

#### Module 06 - Contributions communautaires  
- **Liste SDK** : Ajout des SDK Swift et Rust ; mise à jour du lien de spécification vers 2025-11-25  
- **Référence spécification** : Mise à jour du lien spécification MCP vers URL de spécification directe

#### Module 07 - Leçons des premières implémentations  
- **Mises à jour ressources** : Ajout du lien spécification MCP 2025-11-25 et OWASP MCP Top 10 aux ressources additionnelles

#### Module 08 - Bonnes pratiques  
- **Version spécification** : Mise à jour de la référence spécification MCP vers 2025-11-25  
- **Ressources sécurité** : Ajout des liens OWASP MCP Top 10 et atelier Sherpa aux références supplémentaires

#### Module 10 - Rationalisation des workflows IA  
- **Mise à jour badge** : Changement du badge version MCP de la version SDK (1.9.3) à la version spécification (2025-11-25)  
- **Liens vers ressources** : Mise à jour du lien spécification MCP ; ajout OWASP MCP Top 10

#### Module 11 - Laboratoires pratiques MCP Server  
- **Référence spécification** : Mise à jour du lien spécification MCP vers version 2025-11-25  
- **Ressources de sécurité** : Ajout d’OWASP MCP Top 10 aux ressources officielles

## 18 décembre 2025

### Mise à jour de la documentation sécurité - spécification MCP 2025-11-25

#### Meilleures pratiques sécurité MCP (02-Security/mcp-best-practices.md) - Mise à jour version spécification  
- **Mise à jour version protocole** : Passage à la spécification MCP la plus récente 2025-11-25 (publiée le 25 novembre 2025)  
  - Mise à jour de toutes les références de version de spécification de 2025-06-18 à 2025-11-25  
  - Mise à jour des références de date du document d’août 18, 2025 à décembre 18, 2025  
  - Vérification que toutes les URLs de spécification pointent vers la documentation actuelle  
- **Validation du contenu** : Validation complète des meilleures pratiques sécurité au regard des normes les plus récentes  
  - **Solutions Microsoft Security** : Vérification de la terminologie et des liens actuels pour Prompt Shields (précédemment « détection de risque jailbreak »), Azure Content Safety, Microsoft Entra ID et Azure Key Vault  
  - **Sécurité OAuth 2.1** : Confirmation de l’alignement avec les meilleures pratiques de sécurité OAuth récentes  
  - **Normes OWASP** : Validation que les références OWASP Top 10 pour LLMs restent à jour  
  - **Services Azure** : Vérification de tous les liens de documentation Microsoft Azure et bonnes pratiques  
- **Alignement aux normes** : Confirmation que toutes les normes sécurité référencées sont à jour  
  - Frame de gestion des risques IA NIST  
  - ISO 27001:2022  
  - Meilleures pratiques sécurité OAuth 2.1  
  - Cadres de sécurité et conformité Azure  
- **Ressources d’implémentation** : Validation de tous les liens et ressources de guides d’implémentation  
  - Patterns d’authentification Azure API Management  
  - Guides d’intégration Microsoft Entra ID  
  - Gestion des secrets Azure Key Vault  
  - Pipelines DevSecOps et solutions de monitoring

### Assurance qualité de la documentation  
- **Conformité à la spécification** : Garantie que toutes les exigences de sécurité MCP obligatoires (DOIT/NE DOIT PAS) sont alignées avec la spécification la plus récente  
- **Actualité des ressources** : Vérification de tous les liens externes vers la documentation Microsoft, normes sécurité et guides d’implémentation  
- **Couverture des meilleures pratiques** : Confirmation d’une couverture complète pour authentification, autorisation, menaces spécifiques IA, sécurité de la chaîne d’approvisionnement et modèles d’entreprise

## 6 octobre 2025

### Extension de la section Premiers pas – Usage serveur avancé & authentification simple

#### Usage serveur avancé (03-GettingStarted/10-advanced)  
- **Nouveau chapitre ajouté** : Introduction à un guide complet de l’usage avancé du serveur MCP, couvrant les architectures serveur régulières et bas-niveau.  
  - **Serveur régulier vs bas niveau** : Comparaison détaillée et exemples de code en Python et TypeScript pour les deux approches.  
  - **Conception basée sur les handlers** : Explication de la gestion des outils/ressources/prompts basée sur les handlers pour des implémentations serveur évolutives et flexibles.  
  - **Modèles pratiques** : Scénarios réels où les modèles serveur bas niveau sont bénéfiques pour des fonctionnalités avancées et l’architecture.
#### Authentification Simple (03-GettingStarted/11-simple-auth)
- **Nouveau Chapitre Ajouté** : Guide étape par étape pour implémenter une authentification simple dans les serveurs MCP.
  - **Concepts d'Auth** : Explication claire de l'authentification vs. l'autorisation, et de la gestion des identifiants.
  - **Implémentation Basique de l'Auth** : Modèles d'authentification basés sur middleware en Python (Starlette) et TypeScript (Express), avec exemples de code.
  - **Progression vers la Sécurité Avancée** : Conseils pour démarrer avec une auth simple et évoluer vers OAuth 2.1 et RBAC, avec références aux modules de sécurité avancée.

Ces ajouts fournissent des conseils pratiques et concrets pour construire des implémentations de serveurs MCP plus robustes, sécurisées et flexibles, reliant les concepts fondamentaux aux modèles avancés de production.

## 29 septembre 2025

### Laboratoires d'Intégration de Base de Données pour Serveur MCP - Parcours d'Apprentissage Pratique Exhaustif

#### 11-MCPServerHandsOnLabs - Nouveau Curriculum Complet d'Intégration de Base de Données
- **Parcours d'Apprentissage Complet de 13 Laboratoires** : Ajout d'un curriculum pratique complet pour construire des serveurs MCP prêts pour la production avec intégration de base de données PostgreSQL
  - **Implémentation Réelle** : Cas d'utilisation analytique de Zava Retail démontrant des modèles à l'échelle entreprise
  - **Progression Structurée de l'Apprentissage** :
    - **Labs 00-03 : Fondations** - Introduction, Architecture de base, Sécurité & Multi-Tenancy, Configuration de l'Environnement
    - **Labs 04-06 : Construction du Serveur MCP** - Conception de base de données & Schéma, Implémentation du Serveur MCP, Développement d'Outils  
    - **Labs 07-09 : Fonctionnalités Avancées** - Intégration de Recherche Sémantique, Tests & Débogage, Intégration VS Code
    - **Labs 10-12 : Production & Meilleures Pratiques** - Stratégies de déploiement, Monitoring & Observabilité, Bonnes pratiques & Optimisation
  - **Technologies d'Entreprise** : Framework FastMCP, PostgreSQL avec pgvector, Azure OpenAI embeddings, Azure Container Apps, Application Insights
  - **Fonctionnalités Avancées** : Sécurité au niveau des lignes (RLS), recherche sémantique, accès multi-tenant aux données, vector embeddings, surveillance en temps réel

#### Standardisation de la Terminologie - Conversion Module en Laboratoire
- **Mise à Jour Complète de la Documentation** : Mise à jour systématique de tous les fichiers README dans 11-MCPServerHandsOnLabs pour utiliser la terminologie "Lab" au lieu de "Module"
  - **En-têtes de Section** : Mise à jour de "Ce module couvre" en "Ce laboratoire couvre" dans tous les laboratoires
  - **Description du Contenu** : Changement de "Ce module fournit..." en "Ce laboratoire fournit..." dans toute la documentation
  - **Objectifs d'Apprentissage** : Mise à jour de "À la fin de ce module..." en "À la fin de ce laboratoire..."
  - **Liens de Navigation** : Conversion de toutes les références "Module XX :" en "Lab XX :" dans les renvois et la navigation
  - **Suivi de la Complétion** : Mise à jour de "Après avoir terminé ce module..." en "Après avoir terminé ce laboratoire..."
  - **Références Techniques Conservées** : Maintien des références aux modules Python dans les fichiers de configuration (ex. : `"module": "mcp_server.main"`)

#### Amélioration du Guide d'Étude (study_guide.md)
- **Carte Visuelle du Curriculum** : Ajout de la nouvelle section "11. Laboratoires d'Intégration de Base de Données" avec visualisation complète de la structure des laboratoires
- **Structure du Référentiel** : Mise à jour passant de dix à onze sections principales avec description détaillée de 11-MCPServerHandsOnLabs
- **Orientation du Parcours d'Apprentissage** : Instructions de navigation améliorées couvrant les sections 00-11
- **Couverture Technologique** : Ajout de FastMCP, PostgreSQL, détails d'intégration des services Azure
- **Résultats d'Apprentissage** : Mise en avant du développement de serveurs prêts pour la production, des modèles d'intégration de bases de données, et de la sécurité d'entreprise

#### Amélioration de la Structure Principale du README
- **Terminologie Basée sur les Laboratoires** : Mise à jour du README.md principal dans 11-MCPServerHandsOnLabs pour utiliser systématiquement la structure "Lab"
- **Organisation du Parcours d'Apprentissage** : Progression claire des concepts fondamentaux à l'implémentation avancée jusqu’au déploiement en production
- **Focus Réel** : Accent sur l'apprentissage pratique, concret avec des modèles et technologies d'entreprise

### Améliorations de la Qualité et de la Cohérence de la Documentation
- **Accent sur l'Apprentissage Pratique** : Renforcement de l'approche basée sur les laboratoires dans toute la documentation
- **Focus sur les Modèles d'Entreprise** : Mise en lumière des implémentations prêtes pour la production et des considérations de sécurité d'entreprise
- **Intégration Technologique** : Couverture complète des services Azure modernes et des modèles d’intégration IA
- **Progression de l'Apprentissage** : Parcours clair et structuré des concepts basiques au déploiement en production

## 26 septembre 2025

### Amélioration des Études de Cas - Intégration GitHub MCP Registry

#### Études de Cas (09-CaseStudy/) - Focus sur le Développement de l'Écosystème
- **README.md** : Expansion majeure avec étude de cas complète sur GitHub MCP Registry
  - **Étude de Cas GitHub MCP Registry** : Nouvelle étude de cas complète examinant le lancement du registre MCP GitHub en septembre 2025
    - **Analyse du Problème** : Examen détaillé des défis de découverte et déploiement fragmentés des serveurs MCP
    - **Architecture de la Solution** : Approche centralisée du registre GitHub avec installation VS Code en un clic
    - **Impact Commercial** : Améliorations mesurables de l'intégration et productivité des développeurs
    - **Valeur Stratégique** : Focus sur le déploiement modulaire d'agents et l'interopérabilité entre outils
    - **Développement de l'Écosystème** : Positionnement comme plateforme fondamentale pour l’intégration agentique
  - **Structure Améliorée de l’Étude de Cas** : Mise à jour des sept études de cas avec formatage cohérent et descriptions détaillées
    - Azure AI Travel Agents : Accent sur l’orchestration multi-agent
    - Intégration Azure DevOps : Focus sur l’automatisation des workflows
    - Récupération de Documentation en Temps Réel : Implémentation client console Python
    - Générateur de Plan d'Étude Interactif : Application web conversationnelle Chainlit
    - Documentation Dans l'Éditeur : Intégration VS Code et GitHub Copilot
    - Azure API Management : Modèles d’intégration API entreprise
    - GitHub MCP Registry : Développement de l’écosystème et plateforme communautaire
  - **Conclusion Complète** : Réécriture de la section conclusion soulignant les sept études de cas couvrant plusieurs dimensions d'implémentation MCP
    - Intégration en entreprise, orchestration multi-agent, productivité des développeurs
    - Développement de l’écosystème, applications éducatives catégorisées
    - Analyse approfondie des modèles architecturaux, stratégies d’implémentation et meilleures pratiques
    - Mise en avant du MCP comme protocole mature et prêt pour la production

#### Mises à Jour du Guide d’Étude (study_guide.md)
- **Carte Visuelle du Curriculum** : Mindmap mise à jour incluant GitHub MCP Registry dans la section Études de Cas
- **Description des Études de Cas** : Enrichie passant de descriptions génériques à une décomposition détaillée des sept études de cas complètes
- **Structure du Référentiel** : Mise à jour de la section 10 pour refléter la couverture complète des études de cas avec détails spécifiques d’implémentation
- **Intégration du Changelog** : Ajout de l’entrée du 26 septembre 2025 documentant l’ajout du GitHub MCP Registry et les améliorations des études de cas
- **Mise à Jour de la Date** : Mise à jour du timestamp du pied de page reflétant la dernière révision (26 septembre 2025)

### Améliorations de la Qualité de la Documentation
- **Amélioration de la Cohérence** : Standardisation du formatage et de la structure des études de cas sur les sept exemples
- **Couverture Complète** : Études couvrant désormais les scénarios entreprises, productivité développeur et développement de l’écosystème
- **Positionnement Stratégique** : Accent renforcé sur MCP comme plateforme fondamentale de déploiement de systèmes agents
- **Intégration des Ressources** : Mise à jour des ressources supplémentaires incluant le lien GitHub MCP Registry

## 15 septembre 2025

### Expansion des Sujets Avancés - Transports Personnalisés & Ingénierie du Contexte

#### Transports Personnalisés MCP (05-AdvancedTopics/mcp-transport/) - Nouveau Guide Avancé d’Implémentation
- **README.md** : Guide complet d’implémentation des mécanismes de transport MCP personnalisés
  - **Transport Azure Event Grid** : Implémentation complète de transport événementiel serverless
    - Exemples en C#, TypeScript et Python avec intégration Azure Functions
    - Modèles d’architecture événementielle pour solutions MCP scalables
    - Récepteurs webhook et gestion poussée des messages
  - **Transport Azure Event Hubs** : Implémentation de transport streaming haute performance
    - Capacités de streaming en temps réel pour scénarios à faible latence
    - Stratégies de partitionnement et gestion des checkpoints
    - Regroupement de messages et optimisation des performances
  - **Modèles d’Intégration d’Entreprise** : Exemples architecturaux prêts pour la production
    - Traitement MCP distribué sur plusieurs Azure Functions
    - Architectures hybrides combinant plusieurs types de transport
    - Durabilité, fiabilité et gestion des erreurs des messages
  - **Sécurité & Monitoring** : Intégration Azure Key Vault et modèles d’observabilité
    - Authentification par identité managée et accès en moindre privilège
    - Télémetrie Application Insights et surveillance des performances
    - Coupures de circuit et modèles de tolérance aux pannes
  - **Cadres de Tests** : Stratégies complètes de tests pour transports personnalisés
    - Tests unitaires avec doubles de test et frameworks de moquage
    - Tests d’intégration avec Azure Test Containers
    - Considérations pour tests de performance et charge

#### Ingénierie du Contexte (05-AdvancedTopics/mcp-contextengineering/) - Discipline IA Émergente
- **README.md** : Exploration complète de l’ingénierie du contexte en tant que domaine émergent
  - **Principes Clés** : Partage complet du contexte, prise de décision des actions, gestion des fenêtres de contexte
  - **Alignement avec le Protocole MCP** : Comment la conception MCP répond aux défis de l’ingénierie du contexte
    - Limitations des fenêtres de contexte et stratégies de chargement progressif
    - Détermination de la pertinence et récupération dynamique du contexte
    - Gestion multimodale du contexte et considérations de sécurité
  - **Approches d’Implémentation** : Architectures mono-thread vs multi-agent
    - Fragmentation et priorisation du contexte
    - Chargement progressif du contexte et stratégies de compression
    - Approches en couches du contexte et optimisation de la récupération
  - **Cadre de Mesure** : Métriques émergentes pour évaluer l’efficacité du contexte
    - Efficacité des entrées, performance, qualité, expérience utilisateur
    - Approches expérimentales pour optimiser le contexte
    - Analyse des échecs et méthodologies d’amélioration

#### Mises à Jour de la Navigation dans le Curriculum (README.md)
- **Structure de Module Améliorée** : Mise à jour du tableau du curriculum pour inclure les nouveaux sujets avancés
  - Ajout des entrées Ingénierie du Contexte (5.14) et Transport Personnalisé (5.15)
  - Formatage cohérent et liens de navigation dans tous les modules
  - Descriptions mises à jour reflétant le périmètre actuel

### Améliorations de la Structure des Répertoires
- **Standardisation des Noms** : Renommage de "mcp transport" en "mcp-transport" pour cohérence avec les autres dossiers topics avancés
- **Organisation du Contenu** : Tous les dossiers 05-AdvancedTopics suivent désormais un schéma de nommage cohérent (mcp-[topic])

### Améliorations de la Qualité de la Documentation
- **Alignement avec la Spécification MCP** : Tout le contenu nouveau fait référence à la Spécification MCP 2025-06-18
- **Exemples Multilingues** : Exemples de code complets en C#, TypeScript et Python
- **Focus Entreprise** : Modèles prêts pour la production et intégration cloud Azure tout au long
- **Documentation Visuelle** : Diagrammes Mermaid pour l’architecture et la visualisation des flux

## 18 août 2025

### Mise à Jour Complète de la Documentation - Normes MCP 2025-06-18

#### Meilleures Pratiques de Sécurité MCP (02-Security/) - Modernisation Complète
- **MCP-SECURITY-BEST-PRACTICES-2025.md** : Réécriture complète alignée avec la Spécification MCP 2025-06-18
  - **Exigences Obligatoires** : Ajout des exigences explicites MUST / MUST NOT de la spécification officielle avec indicateurs visuels clairs
  - **12 Pratiques de Sécurité Clés** : Restructuration de la liste de 15 items en domaines de sécurité complets
    - Sécurité des Tokens & Authentification avec intégration fournisseur d’identité externe
    - Gestion des Sessions & Sécurité des Transports avec exigences cryptographiques
    - Protection Spécifique IA avec intégration Microsoft Prompt Shields
    - Contrôle d’Accès & Permissions avec principe du moindre privilège
    - Sécurité de Contenu & Monitoring avec intégration Azure Content Safety
    - Sécurité de la Chaîne d’Approvisionnement avec vérification complète des composants
    - Sécurité OAuth & Prévention des “Confused Deputy” avec mise en œuvre PKCE
    - Réponse aux Incidents & Reprise avec capacités automatisées
    - Conformité & Gouvernance avec alignement réglementaire
    - Contrôles de Sécurité Avancés avec architecture zero trust
    - Intégration Écosystème Sécurité Microsoft avec solutions complètes
    - Évolution Continue de la Sécurité avec pratiques adaptatives
  - **Solutions de Sécurité Microsoft** : Orientation renforcée sur Prompt Shields, Azure Content Safety, Entra ID, et GitHub Advanced Security
  - **Ressources d’Implémentation** : Liens complets catégorisés en Documentation MCP Officielle, Solutions de Sécurité Microsoft, Normes de Sécurité, et Guides d’Implémentation

#### Contrôles de Sécurité Avancés (02-Security/) - Implémentation Entreprise
- **MCP-SECURITY-CONTROLS-2025.md** : Refonte complète avec cadre de sécurité d’entreprise
  - **9 Domaines de Sécurité Complets** : Expansion des contrôles basiques en cadre détaillé
    - Authentification & Autorisation Avancées avec intégration Microsoft Entra ID
    - Sécurité des Tokens & Contrôles Anti-Passthrough avec validation complète
    - Contrôles de Sécurité des Sessions avec prévention du détournement
    - Contrôles de Sécurité IA avec prévention injection de prompt et empoisonnement d'outils
    - Prévention des Attaques Confused Deputy avec sécurité proxy OAuth
    - Sécurité d’Exécution des Outils avec sandboxing et isolation
    - Contrôles Sécurité Chaîne d’Approvisionnement avec vérification des dépendances
    - Contrôles de Monitoring & Détection avec intégration SIEM
    - Réponse aux Incidents & Reprise avec capacités automatisées
  - **Exemples d’Implémentation** : Ajout de blocs YAML détaillés et exemples de code
  - **Intégration des Solutions Microsoft** : Couverture complète des services de sécurité Azure, GitHub Advanced Security, et gestion d'identité entreprise

#### Sujets Avancés Sécurité (05-AdvancedTopics/mcp-security/) - Implémentation Prête pour la Production
- **README.md** : Réécriture complète pour implémentation sécurité entreprise
  - **Alignement Spécification Actuelle** : Mise à jour selon Spécification MCP 2025-06-18 avec exigences de sécurité obligatoires
  - **Authentification Renforcée** : Intégration Microsoft Entra ID avec exemples complets .NET et Java Spring Security
  - **Intégration Sécurité IA** : Mise en œuvre Microsoft Prompt Shields et Azure Content Safety avec exemples détaillés Python
  - **Atténuation des Menaces Avancées** : Exemples complets d’implémentation pour
    - Prévention des attaques Confused Deputy avec PKCE et validation consentement utilisateur
    - Prévention Passthrough des tokens avec validation de l’audience et gestion sécurisée des tokens
    - Prévention du détournement de session avec liaison cryptographique et analyse comportementale
  - **Intégration Sécurité Entreprise** : Monitoring Azure Application Insights, pipelines détection de menaces, et sécurité chaîne d’approvisionnement
  - **Check-list d’Implémentation** : Contrôles de sécurité obligatoires vs recommandés clairement définis avec avantages de l'écosystème Microsoft

### Qualité de la Documentation & Alignement aux Standards
- **Références de Spécification** : Mise à jour de toutes les références à la spécification MCP actuelle 2025-06-18  
- **Écosystème de Sécurité Microsoft** : Orientation d'intégration améliorée dans l'ensemble de la documentation de sécurité  
- **Mise en Œuvre Pratique** : Ajout d'exemples de code détaillés en .NET, Java et Python avec des modèles d'entreprise  
- **Organisation des Ressources** : Classification complète des documents officiels, normes de sécurité et guides de mise en œuvre  
- **Indicateurs Visuels** : Marquage clair des exigences obligatoires vs. des pratiques recommandées  


#### Concepts de Base (01-CoreConcepts/) - Modernisation Complète  
- **Mise à Jour de la Version du Protocole** : Mise à jour pour référencer la spécification MCP actuelle 2025-06-18 avec versionnage basé sur la date (format AAAA-MM-JJ)  
- **Affinement de l'Architecture** : Descriptions améliorées des Hôtes, Clients et Serveurs pour refléter les modèles architecturaux MCP actuels  
  - Hôtes désormais clairement définis comme des applications IA coordonnant plusieurs connexions clients MCP  
  - Clients décrits comme connecteurs de protocole maintenant des relations un-à-un avec les serveurs  
  - Serveurs enrichis avec scénarios de déploiement local vs. distant  
- **Restructuration des Primitives** : Refonte complète des primitives serveur et client  
  - Primitives Serveur : Ressources (sources de données), Invites (modèles), Outils (fonctions exécutables) avec explications détaillées et exemples  
  - Primitives Client : Échantillonnage (complétions LLM), Sollicitation (entrée utilisateur), Journalisation (debug/monitoring)  
  - Mise à jour avec les modèles courants pour découverte (`*/list`), récupération (`*/get`) et exécution (`*/call`)  
- **Architecture de Protocole** : Introduction d’un modèle d'architecture à deux couches  
  - Couche Données : Fondation JSON-RPC 2.0 avec gestion du cycle de vie et primitives  
  - Couche Transport : Mécanismes de transport STDIO (local) et HTTP Streamable avec SSE (distant)  
- **Cadre de Sécurité** : Principes de sécurité complets incluant consentement explicite de l’utilisateur, protection de la vie privée, sûreté d’exécution des outils, et sécurité de la couche transport  
- **Schémas de Communication** : Messages du protocole mis à jour pour montrer l’initialisation, la découverte, l’exécution et les flux de notification  
- **Exemples de Code** : Exemples multilingues actualisés (.NET, Java, Python, JavaScript) reflétant les modèles actuels du SDK MCP  

#### Sécurité (02-Security/) - Révision Complète de la Sécurité  
- **Alignement sur les Normes** : Conformité totale avec les exigences de sécurité de la spécification MCP 2025-06-18  
- **Évolution de l'Authentification** : Documentation de l’évolution des serveurs OAuth personnalisés vers la délégation aux fournisseurs d’identité externes (Microsoft Entra ID)  
- **Analyse des Menaces Spécifiques à l'IA** : Couverture accrue des vecteurs d’attaque IA modernes  
  - Scénarios détaillés d’attaques par injection d’invites avec exemples réels  
  - Mécanismes d’empoisonnement d’outils et schémas d’attaque « rug pull »  
  - Empoisonnement de la fenêtre de contexte et attaques de confusion du modèle  
- **Solutions de Sécurité IA Microsoft** : Couverture complète de l’écosystème de sécurité Microsoft  
  - Boucliers d’Invites IA avec détection avancée, mise en avant et techniques de délimitation  
  - Modèles d’intégration Azure Content Safety  
  - GitHub Advanced Security pour la protection de la chaîne d’approvisionnement  
- **Atténuation Avancée des Menaces** : Contrôles de sécurité détaillés pour  
  - Détournement de session avec scénarios d’attaque spécifiques MCP et exigences cryptographiques pour les ID de session  
  - Problèmes de délégué confus dans les scénarios de proxy MCP avec exigences de consentement explicite  
  - Vulnérabilités de passage de jetons avec contrôles de validation obligatoires  
- **Sécurité de la Chaîne d’Approvisionnement** : Extension de la couverture de la chaîne d’approvisionnement IA incluant modèles de base, services d’implémentation, fournisseurs de contexte et API tierces  
- **Sécurité Fondamentale** : Intégration renforcée avec les modèles de sécurité d’entreprise incluant l’architecture zero trust et l’écosystème de sécurité Microsoft  
- **Organisation des Ressources** : Liens de ressources classés par type (Docs Officiels, Normes, Recherche, Solutions Microsoft, Guides de Mise en Œuvre)  

### Améliorations de la Qualité de la Documentation  
- **Objectifs d’Apprentissage Structurés** : Objectifs d’apprentissage améliorés avec résultats spécifiques et exploitables  
- **Références Croisées** : Ajout de liens entre les sujets liés à la sécurité et aux concepts de base  
- **Informations à Jour** : Mise à jour de toutes les références de date et liens de spécification vers les normes actuelles  
- **Guides de Mise en Œuvre** : Ajout de directives spécifiques et exploitables tout au long des deux sections  

## 16 juillet 2025

### Améliorations du README et de la Navigation  
- Refonte complète de la navigation du curriculum dans README.md  
- Remplacement des balises `<details>` par un format tabulaire plus accessible  
- Création d’options de mise en page alternatives dans le nouveau dossier "alternative_layouts"  
- Ajout d’exemples de navigation par cartes, onglets et accordéon  
- Mise à jour de la section structure du dépôt pour inclure tous les fichiers récents  
- Amélioration de la section « Comment utiliser ce curriculum » avec recommandations claires  
- Mise à jour des liens vers la spécification MCP pointant vers les bonnes URL  
- Ajout de la section Ingénierie du Contexte (5.14) à la structure du curriculum  

### Mises à Jour du Guide d’Étude  
- Révision complète du guide d’étude pour aligner avec la structure actuelle du dépôt  
- Ajout de nouvelles sections pour MCP Clients et Outils, et Serveurs MCP Populaires  
- Mise à jour de la Carte Visuelle du Curriculum pour refléter précisément tous les sujets  
- Amélioration des descriptions des Sujets Avancés pour couvrir toutes les spécialisations  
- Mise à jour de la section Études de Cas avec des exemples réels  
- Ajout de ce journal des modifications complet  

### Contributions Communautaires (06-CommunityContributions/)  
- Ajout d’informations détaillées sur les serveurs MCP pour génération d’images  
- Ajout d’une section complète sur l’utilisation de Claude dans VSCode  
- Ajout des instructions de configuration et d’utilisation du client terminal Cline  
- Mise à jour de la section client MCP pour inclure toutes les options clients populaires  
- Amélioration des exemples de contribution avec des échantillons de code plus précis  

### Sujets Avancés (05-AdvancedTopics/)  
- Organisation de tous les dossiers de sujets spécialisés avec une nomenclature cohérente  
- Ajout de matériaux et exemples d’ingénierie du contexte  
- Ajout de documentation d’intégration de l’agent Foundry  
- Amélioration de la documentation d’intégration de sécurité Entra ID  

## 11 juin 2025

### Création Initiale  
- Publication de la première version du curriculum MCP pour débutants  
- Création de la structure de base pour les 10 sections principales  
- Mise en œuvre d’une Carte Visuelle du Curriculum pour la navigation  
- Ajout de projets exemples initiaux en plusieurs langages de programmation  

### Premiers Pas (03-GettingStarted/)  
- Création des premiers exemples d’implémentation serveur  
- Ajout de guides de développement client  
- Intégration des instructions pour clients LLM  
- Ajout de la documentation pour intégration VS Code  
- Mise en œuvre des exemples de serveur avec Server-Sent Events (SSE)  

### Concepts de Base (01-CoreConcepts/)  
- Ajout d’une explication détaillée de l’architecture client-serveur  
- Création de documentation sur les composants clés du protocole  
- Documenté les schémas de messagerie dans MCP  

## 23 mai 2025

### Structure du Dépôt  
- Initialisation du dépôt avec structure de dossiers basique  
- Création de fichiers README pour chaque section majeure  
- Mise en place de l’infrastructure de traduction  
- Ajout d’assets images et diagrammes  

### Documentation  
- Création du README.md initial avec vue d’ensemble du curriculum  
- Ajout de CODE_OF_CONDUCT.md et SECURITY.md  
- Mise en place de SUPPORT.md avec guides pour obtenir de l’aide  
- Création de la structure préliminaire du guide d’étude  

## 15 avril 2025

### Planification et Cadre  
- Planification initiale du curriculum MCP pour débutants  
- Définition des objectifs d’apprentissage et du public cible  
- Esquisse de la structure en 10 sections du curriculum  
- Élaboration du cadre conceptuel pour les exemples et études de cas  
- Création des prototypes d’exemples initiaux pour les concepts clés

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->