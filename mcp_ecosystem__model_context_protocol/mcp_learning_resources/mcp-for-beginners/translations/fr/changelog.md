# Journal des modifications : Programme MCP pour débutants

Ce document sert de registre de tous les changements significatifs apportés au programme Model Context Protocol (MCP) pour débutants. Les modifications sont documentées en ordre chronologique inverse (les plus récentes en premier).

## 5 février 2026

### Améliorations générales de validation de dépôt et de navigation

#### Nouveau contenu de programme ajouté

**Module 03 - Premiers pas**  
- **12-mcp-hosts/README.md** : Nouveau guide complet pour configurer les hôtes MCP  
  - Exemples de configuration Claude Desktop, VS Code, Cursor, Cline, Windsurf  
  - Modèles JSON de configuration pour tous les principaux hôtes  
  - Tableau comparatif des types de transport (stdio, SSE/HTTP, WebSocket)  
  - Résolution des problèmes courants de connexion  
  - Meilleures pratiques de sécurité pour la configuration des hôtes  

- **13-mcp-inspector/README.md** : Nouveau guide de débogage pour MCP Inspector  
  - Méthodes d’installation (npx, npm global, depuis la source)  
  - Connexion aux serveurs via stdio et HTTP/SSE  
  - Outils de test, ressources et workflows de invites (prompts)  
  - Intégration VS Code avec MCP Inspector  
  - Scénarios courants de débogage avec solutions  

**Module 04 - Mise en œuvre pratique**  
- **pagination/README.md** : Nouveau guide d’implémentation de pagination  
  - Modèles de pagination basée sur cursor en Python, TypeScript, Java  
  - Gestion de la pagination côté client  
  - Stratégies de conception des curseurs (opaque vs structuré)  
  - Recommandations d’optimisation des performances  

**Module 05 - Sujets avancés**  
- **mcp-protocol-features/README.md** : Nouvel approfondissement des fonctionnalités du protocole  
  - Mise en œuvre des notifications de progression  
  - Modèles d’annulation de requête  
  - Modèles de ressources avec motifs URI  
  - Gestion du cycle de vie serveur  
  - Contrôle des niveaux de journalisation  
  - Modèles de gestion d’erreurs avec codes JSON-RPC  

#### Corrections de navigation (plus de 24 fichiers mis à jour)  

**README principaux des modules**  
 Maintenant des liens vers la première leçon ET le module suivant  

**Sous-fichiers 02-Sécurité**  
- Les 5 documents de sécurité complémentaires ont désormais tous une navigation « Quoi ensuite » :  

**Fichiers 09-ÉtudeDeCas**  
- Tous les fichiers d’étude de cas ont désormais une navigation séquentielle :  

**Laboratoires 10-StreamliningAI**  
Ajout de la section Quoi ensuite dans la vue d’ensemble du module 10 et du module 11  

#### Corrections de code et de contenu  

**Mises à jour SDK et dépendances**  
Correction de la version openai vide vers `^4.95.0`  
Mise à jour du SDK de `^1.8.0` à `>=1.26.0`  
Mises à jour des versions mcp à `>=1.26.0`  

**Corrections de code**  
Correction du modèle invalide `gpt-4o-mini` en `gpt-4.1-mini`  

**Corrections de contenu**  
Correction du lien cassé `READMEmd` → `README.md`, correction de l’en-tête du programme `Module 1-3` → `Module 0-3`, correction de chemin sensible à la casse  
Suppression du contenu dupliqué corrompu de l’étude de cas 5  

**Améliorations pour débutants**  
Ajout d’une introduction appropriée, d’objectifs d’apprentissage et de prérequis pour les débutants  

#### Mises à jour du programme  

**README principal**  
- Ajout des entrées 3.12 (Hôtes MCP), 3.13 (Inspecteur MCP), 4.1 (Pagination), 5.16 (Fonctionnalités du protocole) dans le tableau du programme  

**README des modules**  
Ajout des leçons 12 et 13 à la liste des leçons  
Ajout de la section Guides pratiques avec lien pagination  
Ajout des leçons 5.15 (Transport personnalisé) et 5.16 (Fonctionnalités du protocole)  

**study_guide.md**  
- Mise à jour de la carte mentale avec tous les nouveaux sujets : configuration des hôtes MCP, Inspecteur MCP, stratégies de pagination, approfondissement des fonctionnalités du protocole  

## 28 janvier 2026

### Revue de conformité à la spécification MCP 2025-11-25

#### Amélioration des concepts fondamentaux (01-CoreConcepts/)  
- **Nouveau primitif client – Roots** : Ajout d’une documentation complète sur le primitif client Roots, permettant aux serveurs de comprendre les frontières du système de fichiers et les permissions d’accès  
- **Annotations d’outils** : Ajout de documentation sur les annotations comportementales des outils (`readOnlyHint`, `destructiveHint`) pour de meilleures décisions d’exécution d’outils  
- **Appel d’outils dans Sampling** : Mise à jour de la documentation Sampling pour inclure les paramètres `tools` et `toolChoice` pour l’invocation pilotée par modèle pendant les requêtes d’échantillonnage  
- **Mode d’élucidation par URL** : Ajout de documentation sur l’élucidation basée sur l’URL pour les interactions web externes initiées par le serveur  
- **Tâches (expérimental)** : Ajout d’une nouvelle section documentant la fonctionnalité expérimentale des tâches pour des wrappers d’exécution durables et la récupération différée des résultats  
- **Support des icônes** : Mention que les outils, ressources, templates de ressources et invites peuvent désormais inclure des icônes comme métadonnées supplémentaires  

#### Mises à jour de la documentation  
- **README.md** : Ajout de la référence à la spécification MCP 2025-11-25 et explication de versionnage basé sur la date  
- **study_guide.md** : Mise à jour de la carte du programme pour inclure les Tâches et Annotations d’outils dans la section Concepts fondamentaux ; mise à jour de l’horodatage du document  

#### Vérification de conformité à la spécification  
- **Version du protocole** : Vérification que toute la documentation fait référence à la spécification MCP 2025-11-25 en vigueur  
- **Alignement architectural** : Confirmation de l’exactitude de la documentation de l’architecture à deux couches (couche données + couche transport)  
- **Documentation des primitifs** : Validation des primitifs serveur (Ressources, Invites, Outils) et primitifs client (Sampling, Élucidation, Journalisation, Roots)  
- **Mécanismes de transport** : Vérification de la précision de la documentation sur STDIO et transport HTTP streamable  
- **Conseils de sécurité** : Confirmation de l’alignement avec les meilleures pratiques de sécurité MCP actuelles  

#### Principales fonctionnalités MCP 2025-11-25 documentées  
- **Découverte OpenID Connect** : Découverte du serveur d’authentification via OIDC  
- **Documents de métadonnées d’ID client OAuth** : Mécanisme recommandé d’enregistrement client  
- **JSON Schema 2020-12** : Dialecte par défaut des définitions de schémas MCP  
- **Système d’échelonnement SDK** : Exigences formalisées pour la prise en charge et la maintenance des fonctionnalités SDK  
- **Structure de gouvernance** : Formalisation des groupes de travail et groupes d’intérêt dans la gouvernance MCP  

### Mise à jour majeure de la documentation sécurité (02-Security/)

#### Intégration du MCP Security Summit Workshop (Sherpa)  
- **Nouvelle ressource de formation pratique** : Intégration complète avec le [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) dans toute la documentation sécurité  
- **Couverture du parcours d’expédition** : Documentation complète de la progression camp-à-camp depuis le camp de base jusqu’au sommet  
- **Alignement OWASP** : Toute la documentation sécurité correspond désormais aux risques OWASP du MCP Azure Security Guide  

#### Intégration du OWASP MCP Top 10  
- **Nouvelle section** : Ajout du tableau OWASP MCP Top 10 des risques de sécurité avec mitigations Azure dans le README principal Sécurité  
- **Documentation basée sur les risques** : Mise à jour de mcp-security-controls-2025.md avec références aux risques OWASP MCP pour chaque domaine de sécurité  
- **Architecture de référence** : Lien vers l’architecture de référence OWASP MCP Azure Security Guide et modèles d’implémentation  

#### Fichiers de sécurité mis à jour  
- **README.md** : Ajout de la vue d’ensemble Sherpa Workshop, tableau du parcours d’expédition, résumé des risques OWASP MCP Top 10 et section formation pratique  
- **mcp-security-controls-2025.md** : Mise à jour de l’en-tête à février 2026, ajout des références aux risques OWASP (MCP01-MCP08), correction d’incohérences de version de spécification  
- **mcp-security-best-practices-2025.md** : Ajout de la section ressources Sherpa et OWASP, mise à jour de l’horodatage  
- **mcp-best-practices.md** : Ajout de la section formation pratique avec liens Sherpa et OWASP  
- **azure-content-safety-implementation.md** : Ajout de la référence OWASP MCP06, alignement avec Sherpa Camp 3, et section ressources supplémentaires  

#### Nouveaux liens de ressources ajoutés  
- [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/)  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/)  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)  
- Pages individuelles des risques OWASP MCP (MCP01-MCP10)  

### Alignement programme entier sur spécification MCP 2025-11-25  

#### Module 03 - Premiers pas  
- **Documentation SDK** : Ajout du SDK Go à la liste officielle des SDK ; mise à jour de toutes les références SDK pour alignement avec spécification MCP 2025-11-25  
- **Clarification transport** : Mise à jour des descriptions des transports STDIO et HTTP Streaming avec références explicites à la spécification  

#### Module 04 - Mise en œuvre pratique  
- **Mises à jour SDK** : Ajout du SDK Go ; mise à jour de la liste SDK avec référence à la version de spécification  
- **Spécification d’autorisation** : Mise à jour du lien de la spécification d’autorisation MCP vers la version actuelle 2025-11-25  

#### Module 05 - Sujets avancés  
- **Nouvelles fonctionnalités** : Ajout d’une note concernant les nouvelles fonctionnalités MCP Specification 2025-11-25 (Tâches, Annotations d’outils, Élucidation par mode URL, Roots)  
- **Ressources sécurité** : Ajout des liens OWASP MCP Top 10 et Sherpa Workshop dans les références supplémentaires  

#### Module 06 - Contributions communautaires  
- **Liste SDK** : Ajout des SDK Swift et Rust ; mise à jour du lien vers la spécification 2025-11-25  
- **Référence spécification** : Mise à jour du lien vers la spécification MCP vers l’URL directe de la spécification  

#### Module 07 - Leçons des premières utilisations  
- **Mises à jour des ressources** : Ajout du lien MCP Specification 2025-11-25 et OWASP MCP Top 10 dans les ressources supplémentaires  

#### Module 08 - Meilleures pratiques  
- **Version spécification** : Mise à jour de la référence MCP Specification vers 2025-11-25  
- **Ressources sécurité** : Ajout de OWASP MCP Top 10 et Sherpa Workshop aux références supplémentaires  

#### Module 10 - Rationalisation des flux AI  
- **Mise à jour du badge** : Refonte du badge version MCP du numéro SDK (1.9.3) vers la version spécification (2025-11-25)  
- **Liens ressources** : Mise à jour du lien MCP Specification ; ajout de OWASP MCP Top 10  

#### Module 11 - Laboratoires pratiques MCP Server  
- **Référence spécification** : Mise à jour du lien MCP Specification vers la version 2025-11-25  
- **Ressources sécurité** : Ajout de OWASP MCP Top 10 aux ressources officielles  

## 18 décembre 2025

### Mise à jour de la documentation sécurité – Spécification MCP 2025-11-25  

#### Meilleures pratiques de sécurité MCP (02-Security/mcp-best-practices.md) – Mise à jour de version spécification  
- **Mise à jour de la version du protocole** : Référencement de la dernière spécification MCP 2025-11-25 (publiée le 25 novembre 2025)  
  - Mise à jour de toutes les références de version de spécification de 2025-06-18 à 2025-11-25  
  - Mise à jour des références de date des documents d’août 18, 2025 à décembre 18, 2025  
  - Vérification que toutes les URL de spécification pointent vers la documentation actuelle  
- **Validation du contenu** : Validation complète des meilleures pratiques de sécurité selon les normes les plus récentes  
  - **Solutions de sécurité Microsoft** : Vérification de la terminologie et des liens actuels pour Prompt Shields (anciennement « détection de risque jailbreak »), Azure Content Safety, Microsoft Entra ID et Azure Key Vault  
  - **Sécurité OAuth 2.1** : Confirmation de la conformité avec les meilleures pratiques de sécurité OAuth les plus récentes  
  - **Normes OWASP** : Validation des références OWASP Top 10 pour les LLM restent actuelles  
  - **Services Azure** : Vérification de tous les liens de documentation et meilleures pratiques Microsoft Azure  
- **Alignement aux normes** : Confirmation de la conformité avec les normes de sécurité référencées  
  - Cadre NIST de gestion des risques AI  
  - ISO 27001:2022  
  - Meilleures pratiques de sécurité OAuth 2.1  
  - Cadres de sécurité et conformité Azure  
- **Ressources d’implémentation** : Validation de tous les liens de guides et ressources d’implémentation  
  - Modèles d’authentification Azure API Management  
  - Guides d’intégration Microsoft Entra ID  
  - Gestion des secrets Azure Key Vault  
  - Pipelines DevSecOps et solutions de monitoring  

### Assurance qualité de la documentation  
- **Conformité à la spécification** : Garantie que toutes les exigences MCP sécurité obligatoires (DOIT/NE DOIT PAS) sont conformes à la dernière spécification  
- **Actualité des ressources** : Vérification de l’actualité de tous les liens externes vers la documentation Microsoft, normes de sécurité et guides d’implémentation  
- **Couverture des meilleures pratiques** : Confirmation de la couverture complète de l’authentification, autorisation, menaces spécifiques AI, sécurité de la chaîne d’approvisionnement et modèles d’entreprise  

## 6 octobre 2025

### Expansion de la section Premiers pas – Usage avancé des serveurs & authentification simple  

#### Usage avancé des serveurs (03-GettingStarted/10-advanced)  
- **Nouveau chapitre ajouté** : Introduction d’un guide complet sur l’usage avancé des serveurs MCP, couvrant à la fois les architectures Serveur régulières et bas niveau  
  - **Serveur régulier vs bas niveau** : Comparaison détaillée et exemples de code en Python et TypeScript pour les deux approches  
  - **Conception basée sur gestionnaires** : Explication de la gestion des outils/ressources/invites via gestionnaires pour des implémentations serveurs évolutives et flexibles  
  - **Modèles pratiques** : Scénarios réels où les modèles serveur bas niveau sont bénéfiques pour les fonctionnalités avancées et l’architecture  

#### Authentification simple (03-GettingStarted/11-simple-auth)  
- **Nouveau chapitre ajouté** : Guide étape par étape pour implémenter une authentification simple sur les serveurs MCP  
  - **Concepts d’authentification** : Explications claires de l’authentification vs autorisation, et gestion des identifiants  
  - **Implémentation d’authentification basique** : Modèles d’authentification basés sur middleware en Python (Starlette) et TypeScript (Express), avec exemples de code  
  - **Progression vers la sécurité avancée** : Conseils pour partir d’une authentification simple vers OAuth 2.1 et RBAC, avec références aux modules de sécurité avancée  

Ces ajouts fournissent des conseils pratiques et concrets pour construire des implémentations de serveurs MCP plus robustes, sécurisées et flexibles, faisant le lien entre concepts fondamentaux et modèles avancés en production.  

## 29 septembre 2025

### Laboratoires d’intégration base de données MCP Server – Parcours complet d’apprentissage pratique  

#### 11-MCPServerHandsOnLabs – Nouveau programme complet d’intégration base de données  

- **Parcours d'apprentissage complet en 13 laboratoires** : Ajout d'un programme pratique complet pour créer des serveurs MCP prêts pour la production avec intégration de base de données PostgreSQL  
  - **Implémentation en conditions réelles** : Cas d'utilisation analytique de Zava Retail démontrant des modèles adaptés aux entreprises  
  - **Progression d'apprentissage structurée** :  
    - **Labs 00-03 : Fondations** - Introduction, architecture principale, sécurité & multi-locataires, configuration de l’environnement  
    - **Labs 04-06 : Construction du serveur MCP** - Conception & schéma de base de données, implémentation du serveur MCP, développement d’outils  
    - **Labs 07-09 : Fonctionnalités avancées** - Intégration de recherche sémantique, tests & débogage, intégration VS Code  
    - **Labs 10-12 : Production & bonnes pratiques** - Stratégies de déploiement, surveillance & observabilité, bonnes pratiques & optimisation  
  - **Technologies d’entreprise** : Framework FastMCP, PostgreSQL avec pgvector, embeddings Azure OpenAI, Azure Container Apps, Application Insights  
  - **Fonctionnalités avancées** : Sécurité au niveau ligne (RLS), recherche sémantique, accès multi-locataires aux données, embeddings vectoriels, surveillance en temps réel  

#### Standardisation de la terminologie - Conversion Module en Laboratoire  
- **Mise à jour complète de la documentation** : Mise à jour systématique de tous les fichiers README dans 11-MCPServerHandsOnLabs pour utiliser la terminologie "Lab" au lieu de "Module"  
  - **En-têtes de section** : Modification de "What This Module Covers" en "What This Lab Covers" dans les 13 laboratoires  
  - **Description du contenu** : Remplacement de "This module provides..." par "This lab provides..." dans toute la documentation  
  - **Objectifs d’apprentissage** : Mise à jour de "By the end of this module..." en "By the end of this lab..."  
  - **Liens de navigation** : Conversion de toutes les références "Module XX:" en "Lab XX:" dans les renvois et navigation  
  - **Suivi d’achèvement** : Modification de "After completing this module..." en "After completing this lab..."  
  - **Références techniques conservées** : Maintien des références aux modules Python dans les fichiers de configuration (ex. `"module": "mcp_server.main"`)  

#### Amélioration du guide d’étude (study_guide.md)  
- **Carte visuelle du cursus** : Ajout de la nouvelle section "11. Database Integration Labs" avec visualisation complète de la structure des laboratoires  
- **Structure du dépôt** : Mise à jour de dix à onze sections principales avec description détaillée de 11-MCPServerHandsOnLabs  
- **Orientation du parcours d’apprentissage** : Instructions de navigation améliorées couvrant les sections 00-11  
- **Couverture technologique** : Ajout des détails sur FastMCP, PostgreSQL, intégration des services Azure  
- **Résultats d’apprentissage** : Accent mis sur le développement de serveurs prêts pour la production, modèles d’intégration de base de données, et sécurité d’entreprise  

#### Amélioration de la structure du README principal  
- **Terminologie basée sur les laboratoires** : Mise à jour du README.md principal de 11-MCPServerHandsOnLabs pour utiliser systématiquement la structure "Lab"  
- **Organisation du parcours d’apprentissage** : Progression claire des concepts fondamentaux à l’implémentation avancée jusqu’au déploiement en production  
- **Focus sur le monde réel** : Accent sur l’apprentissage pratique avec des modèles et technologies adaptés aux entreprises  

### Améliorations de la qualité & cohérence de la documentation  
- **Accent sur l’apprentissage pratique** : Renforcement de l’approche par laboratoires tout au long de la documentation  
- **Focus sur les modèles d’entreprise** : Mise en avant des implémentations prêtes pour la production et des considérations de sécurité d’entreprise  
- **Intégration technologique** : Couverture complète des services Azure modernes et des modèles d’intégration AI  
- **Progression pédagogique** : Parcours clair et structuré des concepts de base jusqu’au déploiement en production  

## 26 septembre 2025

### Amélioration des études de cas - Intégration GitHub MCP Registry  

#### Études de cas (09-CaseStudy/) - Focus sur le développement de l’écosystème  
- **README.md** : Extension majeure avec étude de cas complète sur GitHub MCP Registry  
  - **Étude de cas GitHub MCP Registry** : Nouvelle étude approfondie sur le lancement de GitHub MCP Registry en septembre 2025  
    - **Analyse du problème** : Examen détaillé des défis liés à la découverte fragmentée et au déploiement des serveurs MCP  
    - **Architecture de la solution** : Approche centralisée du registre GitHub avec installation en un clic sur VS Code  
    - **Impact commercial** : Améliorations mesurables dans l’intégration et la productivité des développeurs  
    - **Valeur stratégique** : Accent sur le déploiement modulaire d’agents et l’interopérabilité multiplateforme  
    - **Développement de l’écosystème** : Positionnement comme plateforme fondatrice pour l’intégration agentique  
  - **Structure améliorée des études de cas** : Mise à jour de toutes les sept études avec mise en forme cohérente et descriptions exhaustives  
    - Agents de voyage Azure AI : Accent sur l’orchestration multi-agents  
    - Intégration Azure DevOps : Focus sur l’automatisation des workflows  
    - Récupération documentaire en temps réel : Implémentation client console Python  
    - Générateur de plan d’étude interactif : Application web Chainlit conversationnelle  
    - Documentation intégrée à l’éditeur : Intégration VS Code et GitHub Copilot  
    - Gestion d’API Azure : Modèles d’intégration API d’entreprise  
    - GitHub MCP Registry : Développement de l’écosystème et plateforme communautaire  
  - **Conclusion complète** : Réécriture de la conclusion mettant en lumière sept études couvrant plusieurs dimensions d’implémentation MCP  
    - Intégration d’entreprise, orchestration multi-agent, productivité des développeurs  
    - Développement d’écosystème, catégorisation des applications éducatives  
    - Perspectives enrichies sur les modèles architecturaux, stratégies d’implémentation et meilleures pratiques  
    - Mise en avant de MCP comme protocole mature et prêt pour la production  

#### Mises à jour du guide d’étude (study_guide.md)  
- **Carte visuelle du cursus** : Mise à jour du mindmap pour inclure GitHub MCP Registry dans la section Études de cas  
- **Description des études de cas** : Amélioration de descriptions génériques à une décomposition détaillée de sept études complètes  
- **Structure du dépôt** : Mise à jour de la section 10 pour refléter la couverture complète des études de cas avec détails d’implémentation spécifiques  
- **Intégration du journal des modifications** : Ajout de l’entrée du 26 septembre 2025 documentant l’ajout de GitHub MCP Registry et les améliorations des études de cas  
- **Mise à jour des dates** : Actualisation de l’horodatage du pied de page pour refléter la dernière révision (26 septembre 2025)  

### Améliorations de la qualité de la documentation  
- **Amélioration de la cohérence** : Standardisation de la mise en forme et de la structure des études de cas sur les sept exemples  
- **Couverture exhaustive** : Études couvrant dorénavant les scénarios d’entreprise, de productivité développeur, et de développement d’écosystème  
- **Positionnement stratégique** : Accent renforcé sur MCP comme plateforme fondatrice pour le déploiement de systèmes agentiques  
- **Intégration des ressources** : Mise à jour des ressources complémentaires pour inclure le lien vers GitHub MCP Registry  

## 15 septembre 2025

### Expansion des sujets avancés - Transports personnalisés & ingénierie du contexte  

#### Transports personnalisés MCP (05-AdvancedTopics/mcp-transport/) - Nouveau guide d’implémentation avancé  
- **README.md** : Guide complet d’implémentation pour les mécanismes de transport MCP personnalisés  
  - **Transport Azure Event Grid** : Implémentation complète d’un transport événementiel serverless  
    - Exemples en C#, TypeScript, et Python avec intégration Azure Functions  
    - Modèles d’architecture événementielle pour solutions MCP scalables  
    - Récepteurs webhook et gestion de messages par push  
  - **Transport Azure Event Hubs** : Implémentation de transport streaming à haute capacité  
    - Capacités de streaming en temps réel pour scénarios à faible latence  
    - Stratégies de partitionnement et gestion de points de contrôle  
    - Regroupement des messages et optimisation des performances  
  - **Modèles d’intégration entreprise** : Exemples architecturaux prêts pour la production  
    - Traitement MCP distribué sur plusieurs Azure Functions  
    - Architectures hybrides combinant plusieurs types de transport  
    - Stratégies de durabilité, fiabilité et gestion des erreurs des messages  
  - **Sécurité & surveillance** : Intégration Azure Key Vault et modèles d’observabilité  
    - Authentification par identité managée et accès au moindre privilège  
    - Télémétrie Application Insights et surveillance des performances  
    - Disjoncteurs et modèles de tolérance aux pannes  
  - **Cadres de test** : Stratégies de test complètes pour transports personnalisés  
    - Tests unitaires avec doubles de test et frameworks de mock  
    - Tests d’intégration avec Azure Test Containers  
    - Considérations sur les tests de performance et de charge  

#### Ingénierie du contexte (05-AdvancedTopics/mcp-contextengineering/) - Discipline AI émergente  
- **README.md** : Exploration complète de l’ingénierie du contexte en tant que domaine émergent  
  - **Principes fondamentaux** : Partage complet du contexte, prise de décision d’action, gestion des fenêtres de contexte  
  - **Alignement protocole MCP** : Comment le design MCP répond aux défis de l’ingénierie du contexte  
    - Limites des fenêtres de contexte et stratégies de chargement progressif  
    - Détermination de pertinence et récupération dynamique du contexte  
    - Gestion multimodale du contexte et enjeux de sécurité  
  - **Approches d’implémentation** : Architectures mono-thread vs multi-agent  
    - Découpage et priorisation du contexte  
    - Chargement progressif et stratégies de compression du contexte  
    - Approches en couches et optimisation de la récupération  
  - **Cadre de mesure** : Métriques émergentes pour l’évaluation de l’efficacité du contexte  
    - Efficacité d’entrée, performance, qualité et expérience utilisateur  
    - Approches expérimentales d’optimisation du contexte  
    - Analyse des échecs et méthodologies d’amélioration  

#### Mises à jour de la navigation du cursus (README.md)  
- **Structure améliorée des modules** : Mise à jour du tableau du cursus pour inclure les nouveaux sujets avancés  
  - Ajout de Ingénierie du Contexte (5.14) et Transport Personnalisé (5.15)  
  - Formatage cohérent et liens de navigation dans tous les modules  
  - Descriptions mises à jour pour refléter la portée actuelle du contenu  

### Améliorations de la structure des dossiers  
- **Standardisation des noms** : Renommage de "mcp transport" en "mcp-transport" pour cohérence avec les autres dossiers de sujets avancés  
- **Organisation du contenu** : Tous les dossiers 05-AdvancedTopics suivent désormais le même modèle de nommage (mcp-[topic])  

### Améliorations de la qualité de la documentation  
- **Alignement sur la spécification MCP** : Tout le nouveau contenu fait référence à la Spécification MCP 2025-06-18  
- **Exemples multi-langages** : Exemples de code complets en C#, TypeScript et Python  
- **Focus entreprise** : Modèles prêts pour la production et intégration Azure cloud sur toute la ligne  
- **Documentation visuelle** : Diagrammes Mermaid pour visualisation de l’architecture et des flux  

## 18 août 2025

### Mise à jour complète de la documentation - Normes MCP 2025-06-18  

#### Bonnes pratiques de sécurité MCP (02-Security/) - Modernisation complète  
- **MCP-SECURITY-BEST-PRACTICES-2025.md** : Réécriture complète alignée avec la Spécification MCP 2025-06-18  
  - **Exigences obligatoires** : Ajout des exigences MUST/MUST NOT explicites de la spécification officielle avec indicateurs visuels clairs  
  - **12 pratiques clés de sécurité** : Restructuration d’une liste de 15 items en domaines de sécurité complets  
    - Sécurité des tokens & authentification avec intégration fournisseur d’identité externe  
    - Gestion de sessions & sécurité transport avec exigences cryptographiques  
    - Protection des menaces spécifiques AI avec intégration Microsoft Prompt Shields  
    - Contrôle d’accès & permissions avec principe du moindre privilège  
    - Sécurité du contenu & surveillance avec intégration Azure Content Safety  
    - Sécurité de la chaîne d’approvisionnement avec vérification complète des composants  
    - Sécurité OAuth & prévention du Député Confus avec implémentation PKCE  
    - Réponse aux incidents & récupération avec capacités automatisées  
    - Conformité & gouvernance avec alignement réglementaire  
    - Contrôles de sécurité avancés avec architecture zero trust  
    - Intégration écosystème Microsoft Security avec solutions complètes  
    - Évolution continue de la sécurité avec pratiques adaptatives  
  - **Solutions Microsoft Security** : Guide d’intégration renforcé pour Prompt Shields, Azure Content Safety, Entra ID, et GitHub Advanced Security  
  - **Ressources d’implémentation** : Liens classifiés par Documentation officielle MCP, Solutions Microsoft Security, Normes de sécurité et Guides d’implémentation  

#### Contrôles avancés de sécurité (02-Security/) - Implémentation entreprise  
- **MCP-SECURITY-CONTROLS-2025.md** : Refonte complète avec cadre de sécurité entreprise  
  - **9 domaines de sécurité complets** : Expansion des contrôles basiques à un cadre détaillé entreprise  
    - Authentification & autorisation avancées avec intégration Microsoft Entra ID  
    - Sécurité des tokens & contrôles anti-passthrough avec validations approfondies  
    - Contrôles de sécurité des sessions avec prévention du détournement  
    - Contrôles de sécurité spécifiques AI avec prévention des injections de prompt et empoisonnement d’outil  
    - Prévention des attaques Député Confus avec sécurité proxy OAuth  
    - Sécurité d’exécution des outils avec sandboxing et isolation  
    - Contrôles de sécurité de la chaîne d’approvisionnement avec vérification des dépendances  
    - Contrôles de surveillance & détection avec intégration SIEM  
    - Réponse aux incidents & récupération avec automatismes  
  - **Exemples d’implémentation** : Ajout de blocs de configuration YAML détaillés et exemples de code  
  - **Intégration des solutions Microsoft** : Couverture complète des services de sécurité Azure, GitHub Advanced Security et gestion d’identité entreprise  

#### Sujets avancés sécurité (05-AdvancedTopics/mcp-security/) - Implémentation prête pour production  
- **README.md** : Réécriture complète pour implémentation sécurité entreprise  
  - **Alignement sur la spécification actuelle** : Mise à jour avec Spécification MCP 2025-06-18 et exigences de sécurité obligatoires  
  - **Authentification améliorée** : Intégration Microsoft Entra ID avec exemples complets .NET et Java Spring Security  
  - **Intégration sécurité AI** : Implémentation Microsoft Prompt Shields et Azure Content Safety avec exemples Python détaillés  
  - **Atténuation des menaces avancées** : Exemples complets pour  
    - Prévention des attaques Député Confus avec PKCE et validation du consentement utilisateur  
    - Prévention du passthrough des tokens avec validation de l’audience et gestion sécurisée des tokens  
    - Prévention du détournement de session avec liaison cryptographique et analyse comportementale  
  - **Intégration sécurité entreprise** : Surveillance Azure Application Insights, pipelines de détection des menaces, et sécurité de la chaîne d’approvisionnement  
  - **Checklist d’implémentation** : Contrôles de sécurité obligatoires vs recommandés clairement distingués avec bénéfices de l’écosystème Microsoft Security  

### Qualité & alignement aux standards de la documentation  
- **Références à la spécification** : Mise à jour de toutes les références vers la Spécification MCP 2025-06-18  
- **Écosystème Microsoft Security** : Renforcement des guides d’intégration dans toute la documentation sécurité  
- **Implémentation pratique** : Ajout d’exemples de code détaillés en .NET, Java et Python avec modèles entreprise  
- **Organisation des ressources** : Classification complète de la documentation officielle, normes de sécurité et guides d’implémentation  
- **Indicateurs visuels** : Marquage clair des exigences obligatoires vs bonnes pratiques recommandées  

#### Concepts fondamentaux (01-CoreConcepts/) - Modernisation complète  
- **Mise à jour de la version protocole** : Référence à la spécification MCP actuelle 2025-06-18 avec versionnement basé sur la date (format AAAA-MM-JJ)  
- **Affinement de l’architecture** : Descriptions améliorées des Hôtes, Clients et Serveurs reflétant les modèles actuels d’architecture MCP
  - Les hôtes sont désormais clairement définis comme des applications d’IA coordonnant plusieurs connexions clients MCP
  - Les clients sont décrits comme des connecteurs de protocole maintenant des relations serveur un-à-un
  - Les serveurs sont enrichis avec des scénarios de déploiement local vs distant
- **Restructuration des primitives** : Révision complète des primitives serveur et client
  - Primitives serveur : Ressources (sources de données), Invites (modèles), Outils (fonctions exécutables) avec explications détaillées et exemples
  - Primitives client : Échantillonnage (complétions LLM), Élicitation (entrée utilisateur), Journalisation (débogage/surveillance)
  - Mise à jour avec les modèles actuels de méthodes de découverte (`*/list`), récupération (`*/get`) et d’exécution (`*/call`)
- **Architecture du protocole** : Introduction d’un modèle d’architecture à deux couches
  - Couche de données : fondation JSON-RPC 2.0 avec gestion du cycle de vie et primitives
  - Couche de transport : STDIO (local) et HTTP streamable avec SSE (transport distant)
- **Cadre de sécurité** : Principes de sécurité complets incluant le consentement explicite des utilisateurs, protection de la confidentialité des données, sécurité d’exécution des outils et sécurité de la couche transport
- **Modèles de communication** : Actualisation des messages du protocole pour montrer les flux d’initialisation, découverte, exécution et notification
- **Exemples de code** : Actualisation des exemples multilingues (.NET, Java, Python, JavaScript) reflétant les modèles actuels du SDK MCP

#### Sécurité (02-Security/) - Révision complète de la sécurité  
- **Alignement sur les normes** : Plein alignement avec les exigences de sécurité de la spécification MCP 2025-06-18
- **Évolution de l’authentification** : Documentation de l’évolution des serveurs OAuth personnalisés vers la délégation de fournisseurs d’identité externes (Microsoft Entra ID)
- **Analyse des menaces spécifiques à l’IA** : Couverture renforcée des vecteurs d’attaque modernes pour l’IA
  - Scénarios détaillés d’attaques par injection d’invite avec exemples concrets
  - Mécanismes d’empoisonnement d’outils et modèles d’attaque de “rug pull”
  - Empoisonnement de la fenêtre de contexte et attaques de confusion des modèles
- **Solutions de sécurité Microsoft AI** : Couverture complète de l’écosystème de sécurité Microsoft
  - Boucliers de prompt IA avec détection avancée, surlignage et techniques de délimitation
  - Intégration Azure Content Safety
  - GitHub Advanced Security pour la protection de la chaîne d’approvisionnement
- **Atténuation avancée des menaces** : Contrôles de sécurité détaillés pour
  - Détournement de session avec scénarios d’attaque spécifiques MCP et exigences cryptographiques d’ID de session
  - Problèmes de délégué confus dans les scénarios de proxy MCP avec exigences de consentement explicite
  - Vulnérabilités de passage de jetons avec contrôles de validation obligatoires
- **Sécurité de la chaîne d’approvisionnement** : Extension de la couverture des chaînes d’approvisionnement IA incluant les modèles de base, les services d’embedding, les fournisseurs de contexte et les API tierces
- **Sécurité de la fondation** : Intégration renforcée avec les modèles de sécurité d’entreprise, y compris l’architecture zero trust et l’écosystème Microsoft sécurité
- **Organisation des ressources** : Catégorisation des liens de ressources complets par type (Docs officielles, Normes, Recherche, Solutions Microsoft, Guides d’implémentation)

### Améliorations de la qualité de la documentation  
- **Objectifs d’apprentissage structurés** : Amélioration des objectifs d’apprentissage avec des résultats spécifiques et actionnables
- **Références croisées** : Ajout de liens entre les sujets de sécurité et de concepts fondamentaux apparentés
- **Informations à jour** : Actualisation de toutes les références de date et liens de spécifications vers les normes actuelles
- **Guides d’implémentation** : Ajout de directives spécifiques et pratiques tout au long des deux sections

## 16 juillet 2025

### Améliorations du README et de la navigation  
- Refonte complète de la navigation du cursus dans README.md
- Remplacement des balises `<details>` par un format plus accessible basé sur des tableaux
- Création d’options de mise en page alternatives dans le nouveau dossier "alternative_layouts"
- Ajout d’exemples de navigation par cartes, sous onglets, et en accordéon
- Mise à jour de la section structure du dépôt pour inclure tous les fichiers récents
- Amélioration de la section "Comment utiliser ce cursus" avec des recommandations claires
- Mise à jour des liens de spécification MCP vers les URL corrects
- Ajout de la section Ingénierie du Contexte (5.14) dans la structure du cursus

### Mises à jour du guide d’étude  
- Révision complète du guide d’étude pour aligner avec la structure actuelle du dépôt
- Ajout de nouvelles sections pour les clients MCP, les outils, et les serveurs MCP populaires
- Mise à jour de la carte visuelle du cursus pour refléter précisément tous les sujets
- Amélioration des descriptions des sujets avancés pour couvrir toutes les spécialités
- Mise à jour de la section études de cas pour refléter des exemples réels
- Ajout de ce journal de modifications complet

### Contributions communautaires (06-CommunityContributions/)  
- Ajout d’informations détaillées sur les serveurs MCP pour la génération d’images
- Ajout d’une section complète sur l’utilisation de Claude dans VSCode
- Ajout des instructions de configuration et d’utilisation du client terminal Cline
- Mise à jour de la section client MCP pour inclure toutes les options clients populaires
- Amélioration des exemples de contribution avec des échantillons de code plus précis

### Sujets avancés (05-AdvancedTopics/)  
- Organisation de tous les dossiers de sujets spécialisés avec une nomenclature cohérente
- Ajout de matériel et d’exemples d’ingénierie du contexte
- Ajout de la documentation d’intégration de l’agent Foundry
- Amélioration de la documentation d’intégration de sécurité Entra ID

## 11 juin 2025

### Création initiale  
- Publication de la première version du cursus MCP pour débutants
- Création de la structure de base pour les 10 sections principales
- Mise en œuvre de la carte visuelle du cursus pour la navigation
- Ajout des premiers projets exemples en plusieurs langages de programmation

### Premiers pas (03-GettingStarted/)  
- Création des premiers exemples d’implémentation de serveur
- Ajout de directives pour le développement client
- Inclusion des instructions d’intégration du client LLM
- Ajout de la documentation d’intégration VS Code
- Mise en œuvre des exemples de serveur Server-Sent Events (SSE)

### Concepts fondamentaux (01-CoreConcepts/)  
- Ajout d’explications détaillées sur l’architecture client-serveur
- Création de documentation sur les composants clés du protocole
- Documentation des modèles de messagerie dans MCP

## 23 mai 2025

### Structure du dépôt  
- Initialisation du dépôt avec la structure de dossier de base
- Création des fichiers README pour chaque section principale
- Mise en place de l’infrastructure de traduction
- Ajout des ressources d’images et schémas

### Documentation  
- Création du README.md initial avec aperçu du cursus
- Ajout des fichiers CODE_OF_CONDUCT.md et SECURITY.md
- Mise en place de SUPPORT.md avec des conseils pour obtenir de l’aide
- Création de la structure préliminaire du guide d’étude

## 15 avril 2025

### Planification et cadre  
- Planification initiale du cursus MCP pour débutants
- Définition des objectifs d’apprentissage et du public cible
- Esquisse de la structure du cursus en 10 sections
- Développement du cadre conceptuel pour les exemples et études de cas
- Création des prototypes initiaux d’exemples pour les concepts clés

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçons d’assurer l’exactitude, veuillez noter que les traductions automatiques peuvent comporter des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source faisant autorité. Pour toute information critique, il est recommandé de faire appel à une traduction professionnelle réalisée par un humain. Nous déclinons toute responsabilité en cas de malentendus ou de mauvaises interprétations résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->