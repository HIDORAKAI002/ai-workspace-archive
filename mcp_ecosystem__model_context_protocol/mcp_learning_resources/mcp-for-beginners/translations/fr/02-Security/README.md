# Sécurité MCP : Protection Complète pour les Systèmes d'IA

[![Meilleures Pratiques de Sécurité MCP](../../../translated_images/fr/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Cliquez sur l'image ci-dessus pour visionner la vidéo de cette leçon)_

La sécurité est fondamentale dans la conception des systèmes d'IA, c'est pourquoi nous la plaçons en deuxième section de priorité. Cela s'aligne avec le principe **Secure by Design** de Microsoft issu de l’[Initiative Secure Future](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Le Protocole Model Context (MCP) apporte des capacités puissantes aux applications pilotées par l'IA tout en introduisant des défis de sécurité uniques qui vont au-delà des risques logiciels traditionnels. Les systèmes MCP doivent affronter à la fois des préoccupations de sécurité établies (codage sécurisé, moindre privilège, sécurité de la chaîne d'approvisionnement) et de nouvelles menaces spécifiques à l'IA incluant injection de commandes, empoisonnement d'outils, détournement de session, attaques par substitut confus, vulnérabilités de passage de jetons et modification dynamique des capacités.

Cette leçon explore les risques de sécurité les plus critiques dans les implémentations MCP — couvrant authentification, autorisation, permissions excessives, injection indirecte, sécurité des sessions, problèmes de substitut confus, gestion des jetons et vulnérabilités de la chaîne d'approvisionnement. Vous apprendrez des contrôles exploitables et des meilleures pratiques pour atténuer ces risques tout en utilisant les solutions Microsoft telles que Prompt Shields, Azure Content Safety, et GitHub Advanced Security pour renforcer votre déploiement MCP.

## Objectifs d'Apprentissage

À la fin de cette leçon, vous serez capable de :

- **Identifier les Menaces Spécifiques au MCP** : Reconnaître les risques uniques de sécurité des systèmes MCP incluant injection de commandes, empoisonnement d'outils, permissions excessives, détournement de sessions, problèmes de substitut confus, vulnérabilités de passage de jetons et risques liés à la chaîne d'approvisionnement
- **Appliquer des Contrôles de Sécurité** : Mettre en œuvre des atténuations efficaces comme une authentification robuste, un accès au moindre privilège, une gestion sécurisée des jetons, des contrôles de sécurité des sessions et une vérification de la chaîne d'approvisionnement
- **Exploiter les Solutions de Sécurité Microsoft** : Comprendre et déployer Microsoft Prompt Shields, Azure Content Safety, et GitHub Advanced Security pour la protection des charges de travail MCP
- **Valider la Sécurité des Outils** : Reconnaître l’importance de la validation des métadonnées des outils, surveiller les modifications dynamiques, et défendre contre les attaques d’injection de commandes indirectes
- **Intégrer les Meilleures Pratiques** : Combiner les fondamentaux de sécurité établis (codage sécurisé, durcissement des serveurs, zero trust) avec les contrôles spécifiques MCP pour une protection complète

# Architecture & Contrôles de Sécurité MCP

Les implémentations modernes du MCP nécessitent des approches de sécurité en couches qui abordent à la fois la sécurité logicielle traditionnelle et les menaces spécifiques à l'IA. La spécification MCP en rapide évolution continue de faire mûrir ses contrôles de sécurité, permettant une meilleure intégration avec les architectures de sécurité d'entreprise et les meilleures pratiques établies.

Les recherches du [Microsoft Digital Defense Report](https://aka.ms/mddr) démontrent que **98 % des violations signalées seraient évitées par une hygiène de sécurité robuste**. La stratégie de protection la plus efficace combine les pratiques de sécurité fondamentales avec les contrôles spécifiques MCP — des mesures de sécurité de base éprouvées restent les plus impactantes pour réduire le risque global.

## Paysage Actuel de la Sécurité

> **Note :** Ces informations reflètent les normes de sécurité MCP au **5 février 2026**, alignées avec la **Spécification MCP 2025-11-25**. Le protocole MCP continue d’évoluer rapidement, et les futures implémentations pourraient introduire de nouveaux modèles d'authentification et des contrôles améliorés. Référez-vous toujours à la [Spécification MCP actuelle](https://spec.modelcontextprotocol.io/), au [dépôt GitHub MCP](https://github.com/modelcontextprotocol) et à la [documentation des meilleures pratiques de sécurité](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pour obtenir les conseils les plus récents.

> **À venir :** la version candidate `2026-07-28` renforce davantage l'autorisation — les clients doivent valider le paramètre `iss` dans les réponses d'autorisation (RFC 9207), déclarer un `application_type` OpenID Connect lors de l'enregistrement dynamique du client, et lier les identifiants enregistrés au serveur d'autorisation émetteur. Voir [Ce qui change dans MCP : la version candidate 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pour la liste complète des SEPs sur l’autorisation.

## 🏔️ Atelier MCP Security Summit (Sherpa)

Pour une **formation pratique en sécurité**, nous recommandons vivement l'**Atelier MCP Security Summit** (Sherpa) - une expédition guidée complète pour sécuriser les serveurs MCP dans Microsoft Azure.

### Présentation de l'Atelier

L'[Atelier MCP Security Summit](https://azure-samples.github.io/sherpa/) offre une formation en sécurité pratique et exploitable via une méthodologie éprouvée « vulnérable → exploiter → corriger → valider ». Vous allez :

- **Apprendre en cassant des choses** : Vivre les vulnérabilités de première main en exploitant des serveurs intentionnellement peu sûrs
- **Utiliser la Sécurité Natif Azure** : Exploiter Azure Entra ID, Key Vault, API Management, et AI Content Safety
- **Suivre la Défense en Profondeur** : Progresser à travers des camps en construisant des couches de sécurité complètes
- **Appliquer les Normes OWASP** : Chaque technique correspond au [Guide de Sécurité MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obtenir du Code de Production** : Repartez avec des implémentations fonctionnelles et testées

### Le Parcours de l'Expédition

| Camp | Focus | Risques OWASP Couverts |
|------|-------|---------------------|
| **Camp de Base** | Fondamentaux MCP & vulnérabilités d'authentification | MCP01, MCP07 |
| **Camp 1 : Identité** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2 : Passerelle** | API Management, Points de terminaison privés, gouvernance | MCP02, MCP06, MCP07, MCP09 |
| **Camp 3 : Sécurité E/S** | Injection de commandes, protection des PII, sécurité du contenu | MCP03, MCP05, MCP06, MCP10 |
| **Camp 4 : Surveillance** | Log Analytics, tableaux de bord, détection de menaces | MCP04, MCP08 |
| **Le Sommet** | Test d’intégration Red Team / Blue Team | Tous |

**Commencez ici** : [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 des Risques de Sécurité MCP selon OWASP

Le [Guide de Sécurité MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) détaille les dix risques de sécurité les plus critiques pour les implémentations MCP :

| Risque | Description | Atténuation Azure |
|------|-------------|------------------|
| **MCP01** | Mauvaise gestion des jetons & exposition des secrets | Azure Key Vault, Managed Identity |
| **MCP02** | Escalade de privilège via extension de portée | RBAC, accès conditionnel |
| **MCP03** | Empoisonnement d'outils | Validation des outils, vérification d’intégrité |
| **MCP04** | Attaques sur la chaîne d'approvisionnement logicielle & altération des dépendances | GitHub Advanced Security, scan des dépendances |
| **MCP05** | Injection et exécution de commandes | Validation des entrées, sandboxing |
| **MCP06** | Subversion du flux d’intention | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Authentification & autorisation insuffisantes | Azure Entra ID, OAuth 2.1 avec PKCE |
| **MCP08** | Manque d’audit et de télémétrie | Azure Monitor, Application Insights |
| **MCP09** | Serveurs MCP fantômes | Gouvernance API Center, isolation réseau |
| **MCP10** | Injection de contexte & exposition excessive | Classification des données, exposition minimale |

### Évolution de l'Authentification MCP

La spécification MCP a considérablement évolué dans son approche de l’authentification et de l’autorisation :

- **Approche Originale** : Les premières spécifications exigeaient que les développeurs implémentent des serveurs d’authentification personnalisés, avec les serveurs MCP agissant en tant que serveurs d'autorisation OAuth 2.0 gérant directement l’authentification des utilisateurs
- **Standard Actuel (2025-11-25)** : La spécification mise à jour permet aux serveurs MCP de déléguer l’authentification à des fournisseurs d’identité externes (tels que Microsoft Entra ID), améliorant la posture de sécurité et réduisant la complexité d’implémentation
- **Sécurité du Transport** : Support renforcé des mécanismes de transport sécurisé avec des modèles d’authentification adéquats pour les connexions locales (STDIO) et distantes (HTTP streamable)

## Sécurité de l'Authentification & de l'Autorisation

### Défis de Sécurité Actuels

Les implémentations modernes du MCP font face à plusieurs défis d’authentification et d’autorisation :

### Risques & Vecteurs de Menace

- **Logique d’Autorisation Mal Configurée** : Une mise en œuvre défaillante de l’autorisation côté serveur MCP peut exposer des données sensibles et appliquer incorrectement les contrôles d’accès
- **Compromission de Jetons OAuth** : Le vol de jetons sur le serveur MCP local permet aux attaquants de usurper le serveur et accéder aux services en aval
- **Vulnérabilités de Passage de Jetons** : Une mauvaise gestion des jetons provoque des contournements de contrôles de sécurité et des lacunes en matière de responsabilité
- **Permissions Excessives** : Des serveurs MCP trop privilégiés violent le principe du moindre privilège et étendent la surface d’attaque

#### Passage de Jetons : Un anti-modèle critique

**Le passage de jetons est explicitement interdit** dans la spécification actuelle d’autorisation MCP en raison de ses graves implications sécuritaires :

##### Contournement des Contrôles de Sécurité
- Les serveurs MCP et les API en aval mettent en œuvre des contrôles critiques (limitation du débit, validation des requêtes, surveillance du trafic) dépendant d'une validation correcte des jetons
- L’utilisation directe des jetons client vers l’API contourne ces protections essentielles, sapant l’architecture de sécurité

##### Enjeux de Responsabilité et d'Audit  
- Les serveurs MCP ne peuvent distinguer les clients utilisant des jetons émis en amont, brisant la traçabilité des audits
- Les journaux des serveurs ressources en aval montrent des origines de requêtes erronées plutôt que les intermédiaires MCP réels
- Les investigations d’incidents et audits de conformité deviennent beaucoup plus difficiles

##### Risques d’Exfiltration de Données
- Les affirmations de jetons non validées permettent aux acteurs malveillants disposant de jetons volés d’utiliser les serveurs MCP comme proxy pour l’exfiltration de données
- Les violations des frontières de confiance permettent des accès non autorisés contournant les contrôles de sécurité prévus

##### Vecteurs d'Attaque Multi-Services
- Les jetons compromis acceptés par plusieurs services facilitent le déplacement latéral à travers les systèmes connectés
- Les hypothèses de confiance entre services peuvent être violées lorsque l’origine des jetons ne peut être vérifiée

### Contrôles et Atténuations de Sécurité

**Exigences de Sécurité Critiques :**

> **OBLIGATOIRE** : Les serveurs MCP **NE DOIVENT PAS** accepter des jetons qui n’ont pas été explicitement émis pour le serveur MCP

#### Contrôles d'Authentification & d'Autorisation

- **Revue Rigoureuse de l’Autorisation** : Mener des audits complets de la logique d’autorisation des serveurs MCP pour s’assurer que seuls les utilisateurs et clients autorisés accèdent aux ressources sensibles
  - **Guide d’Implémentation** : [Azure API Management comme passerelle d’authentification pour serveurs MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Intégration Identité** : [Utiliser Microsoft Entra ID pour l’authentification des serveurs MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestion Sécurisée des Jetons** : Appliquer [les meilleures pratiques de validation et cycle de vie des jetons de Microsoft](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valider que les claims d'audience du jeton correspondent à l’identité du serveur MCP
  - Implémenter des politiques appropriées de rotation et d’expiration des jetons
  - Prévenir les attaques par rejeu et usages non autorisés des jetons

- **Stockage Protégé des Jetons** : Stockage sécurisé des jetons avec chiffrement au repos et en transit
  - **Meilleures Pratiques** : [Directives pour le stockage sécurisé des jetons et le chiffrement](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Mise en œuvre du Contrôle d'Accès

- **Principe du Moindre Privilège** : Accorder aux serveurs MCP uniquement les permissions minimales requises pour la fonctionnalité prévue
  - Révisions régulières des permissions pour prévenir l’extension progressive de privilèges
  - **Documentation Microsoft** : [Sécuriser l’accès au moindre privilège](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Contrôle d’Accès Basé sur les Rôles (RBAC)** : Implémenter des attributions de rôles granulaires
  - Définir les rôles de manière stricte selon les ressources et actions spécifiques
  - Éviter les permissions larges ou inutiles qui augmentent la surface d’attaque

- **Surveillance Continue des Permissions** : Implémenter un audit et une surveillance permanents des accès
  - Surveiller les schémas d’utilisation des permissions pour détecter les anomalies
  - Remédier rapidement aux privilèges excessifs ou inutilisés

## Menaces Spécifiques à l'IA

### Injection de Commandes & Attaques de Manipulation d'Outils

Les implémentations modernes MCP sont confrontées à des vecteurs d’attaque sophistiqués spécifiques à l’IA que les mesures de sécurité traditionnelles ne couvrent pas entièrement :

#### **Injection Indirecte de Commande (Injection Cross-Domaine)**

L’**Injection Indirecte de Commande** représente l’une des vulnérabilités les plus critiques dans les systèmes IA activés par MCP. Les attaquants intègrent des instructions malveillantes dans des contenus externes — documents, pages web, emails ou sources de données — que les systèmes IA traitent ensuite comme des commandes légitimes.

**Scénarios d’Attaque :**
- **Injection basée sur documents** : instructions malveillantes cachées dans des documents traités déclenchant des actions IA non prévues
- **Exploitation de contenu web** : pages web compromises contenant des prompts intégrés manipulant le comportement IA lors du scraping
- **Attaques par email** : prompts malveillants dans des emails provoquant la fuite d’informations ou des actions non autorisées par les assistants IA
- **Contamination des sources de données** : bases de données ou APIs compromises fournissant un contenu corrompu aux systèmes IA

**Impact Réel** : Ces attaques peuvent entraîner l’exfiltration de données, des violations de confidentialité, la génération de contenus nuisibles, et la manipulation des interactions utilisateurs. Pour une analyse détaillée, voir [Injection de Commande dans MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Schéma d'Attaque d'Injection de Commande](../../../translated_images/fr/prompt-injection.ed9fbfde297ca877.webp)

#### **Attaques d'Empoisonnement d'Outils**

L’**Empoisonnement d'Outils** cible les métadonnées qui définissent les outils MCP, exploitant la manière dont les LLM interprètent les descriptions et paramètres des outils pour décider de l’exécution.

**Mécanismes d’Attaque :**
- **Manipulation des métadonnées** : Les attaquants injectent des instructions malveillantes dans les descriptions d’outils, la définition des paramètres ou les exemples d’utilisation
- **Instructions invisibles** : Prompts cachés dans les métadonnées d’outils traités par les modèles IA mais invisibles aux utilisateurs humains
- **Modification dynamique des outils (« Rug Pulls »)** : Outils initialement approuvés par les utilisateurs modifiés ensuite pour effectuer des actions malveillantes à leur insu
- **Injection de paramètres** : Contenus malveillants intégrés dans les schémas des paramètres d’outils influençant le comportement du modèle


**Risques des serveurs hébergés** : Les serveurs MCP distants présentent des risques accrus car les définitions d'outils peuvent être mises à jour après l'approbation initiale de l'utilisateur, créant des scénarios où des outils auparavant sûrs deviennent malveillants. Pour une analyse complète, voir [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/fr/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vecteurs d'attaque IA supplémentaires**

- **Injection de prompt inter-domaines (XPIA)** : Attaques sophistiquées exploitant le contenu de plusieurs domaines pour contourner les contrôles de sécurité
- **Modification dynamique des capacités** : Changements en temps réel des capacités des outils échappant aux évaluations de sécurité initiales
- **Empoisonnement de la fenêtre contextuelle** : Attaques manipulant de grandes fenêtres contextuelles pour cacher des instructions malveillantes
- **Attaques de confusion du modèle** : Exploitation des limites du modèle pour créer des comportements imprévisibles ou dangereux


### Impact des risques de sécurité IA

**Conséquences à fort impact :**
- **Exfiltration de données** : Accès non autorisé et vol de données sensibles d'entreprise ou personnelles
- **Atteintes à la vie privée** : Exposition d'informations personnellement identifiables (PII) et de données commerciales confidentielles  
- **Manipulation des systèmes** : Modifications non intentionnelles des systèmes critiques et des flux de travail
- **Vol d'identifiants** : Compromission des jetons d'authentification et des identifiants de service
- **Mouvement latéral** : Utilisation des systèmes IA compromis comme pivot pour des attaques réseau plus larges

### Solutions de sécurité Microsoft pour l'IA

#### **Boucliers de prompt IA : Protection avancée contre les attaques par injection**

Microsoft **AI Prompt Shields** offre une défense complète contre les attaques par injection de prompt directes et indirectes via plusieurs couches de sécurité :

##### **Mécanismes de protection principaux :**

1. **Détection et filtrage avancés**
   - Algorithmes d'apprentissage automatique et techniques NLP détectent les instructions malveillantes dans le contenu externe
   - Analyse en temps réel des documents, pages web, e-mails et sources de données pour les menaces intégrées
   - Compréhension contextuelle des motifs de prompt légitimes vs malveillants

2. **Techniques de mise en évidence**  
   - Différencie les instructions système de confiance des entrées externes potentiellement compromises
   - Méthodes de transformation de texte qui améliorent la pertinence pour le modèle tout en isolant le contenu malveillant
   - Aide les systèmes IA à maintenir une hiérarchie d'instructions correcte et à ignorer les commandes injectées

3. **Systèmes de délimitation et de marquage de données**
   - Définition explicite des frontières entre messages système de confiance et texte d'entrée externe
   - Marqueurs spéciaux soulignent les limites entre sources de données fiables et non fiables
   - Séparation claire évite la confusion des instructions et l'exécution de commandes non autorisées

4. **Renseignement sur les menaces en continu**
   - Microsoft surveille en continu les schémas d'attaque émergents et met à jour les défenses
   - Chasse proactive aux menaces pour les nouvelles techniques et vecteurs d'injection
   - Mises à jour régulières des modèles de sécurité pour maintenir l'efficacité contre les menaces évolutives

5. **Intégration Azure Content Safety**
   - Partie intégrante de la suite complète Azure AI Content Safety
   - Détection supplémentaire des tentatives de jailbreak, contenu nuisible et violations de politique de sécurité
   - Contrôles de sécurité unifiés à travers les composants d'application IA

**Ressources d'implémentation** : [Microsoft Prompt Shields Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/fr/prompt-shield.ff5b95be76e9c78c.webp)


## Menaces avancées de sécurité MCP

### Vulnérabilités de détournement de session

Le **détournement de session** représente un vecteur d'attaque critique dans les implémentations MCP à état où des parties non autorisées obtiennent et abusent des identifiants de session légitimes pour usurper des clients et effectuer des actions non autorisées.

#### **Scénarios d'attaque et risques**

- **Injection de prompt par détournement de session** : Les attaquants avec des ID de session volés injectent des événements malveillants dans des serveurs partageant l'état de session, pouvant déclencher des actions nuisibles ou accéder à des données sensibles
- **Usurpation directe** : Les ID de session volés permettent des appels directs au serveur MCP contournant l'authentification, traitant les attaquants comme des utilisateurs légitimes
- **Flux résumables compromis** : Les attaquants peuvent terminer prématurément des requêtes, forçant les clients légitimes à reprendre avec un contenu potentiellement malveillant

#### **Contrôles de sécurité pour la gestion des sessions**

**Exigences critiques :**
- **Vérification d'autorisation** : Les serveurs MCP implémentant l'autorisation **DOIVENT** vérifier TOUTES les requêtes entrantes et **NE DOIVENT PAS** s'appuyer sur les sessions pour l'authentification
- **Génération sécurisée de sessions** : Utiliser des IDs de session cryptographiquement sécurisés, non déterministes générés avec des générateurs aléatoires sécurisés
- **Liaison spécifique à l'utilisateur** : Lier les IDs de session aux informations spécifiques à l'utilisateur en utilisant des formats tels que `<user_id>:<session_id>` pour prévenir les abus de session inter-utilisateurs
- **Gestion du cycle de vie des sessions** : Implémenter expiration, rotation et invalidation appropriées pour limiter les fenêtres de vulnérabilité
- **Sécurité du transport** : HTTPS obligatoire pour toutes les communications afin d'empêcher l'interception des IDs de session

### Problème du procureur confus

Le **problème du procureur confus** survient lorsque les serveurs MCP agissent comme des proxys d'authentification entre clients et services tiers, créant des opportunités de contournement d'autorisation via l'exploitation d'ID client statiques.

#### **Mécanismes d'attaque et risques**

- **Contournement du consentement basé sur les cookies** : Une authentification utilisateur préalable crée des cookies de consentement que les attaquants exploitent via des requêtes d'autorisation malveillantes avec des URI de redirection conçues
- **Vol de code d'autorisation** : Les cookies de consentement existants peuvent conduire les serveurs d'autorisation à ignorer les écrans de consentement, redirigeant des codes vers des points de terminaison contrôlés par l'attaquant  
- **Accès API non autorisé** : Les codes d'autorisation volés permettent l'échange de jetons et l'usurpation d'identité sans approbation explicite

#### **Stratégies d'atténuation**

**Contrôles obligatoires :**
- **Exigences de consentement explicite** : Les serveurs proxy MCP utilisant des IDs client statiques **DOIVENT** obtenir le consentement utilisateur pour chaque client enregistré dynamiquement
- **Implémentation de la sécurité OAuth 2.1** : Suivre les meilleures pratiques de sécurité OAuth actuelles incluant PKCE (Proof Key for Code Exchange) pour toutes les demandes d'autorisation
- **Validation stricte du client** : Mettre en œuvre une validation rigoureuse des URI de redirection et des identifiants client pour prévenir l'exploitation

### Vulnérabilités de transmission de jetons  

La **transmission de jetons** représente un anti-pattern explicite où les serveurs MCP acceptent des jetons clients sans validation appropriée et les transmettent aux API en aval, violant les spécifications d'autorisation MCP.

#### **Implications de sécurité**

- **Contournement du contrôle** : L'utilisation directe de jetons client vers API contourne les limites de débit critiques, la validation et les contrôles de surveillance
- **Corruption de la traçabilité** : Les jetons émis en amont rendent impossible l'identification du client, brisant les capacités d'investigation d'incidents
- **Exfiltration de données par proxy** : Les jetons non validés permettent aux acteurs malveillants d'utiliser les serveurs comme proxy pour l'accès non autorisé aux données
- **Violations des frontières de confiance** : Les hypothèses de confiance des services en aval peuvent être violées lorsque l'origine des jetons ne peut être vérifiée
- **Expansion d'attaque multi-services** : Les jetons compromis acceptés par plusieurs services facilitent le mouvement latéral

#### **Contrôles de sécurité requis**

**Exigences non négociables :**
- **Validation des jetons** : Les serveurs MCP **NE DOIVENT PAS** accepter les jetons non explicitement émis pour le serveur MCP
- **Vérification de l'audience** : Toujours valider que les revendications d'audience du jeton correspondent à l'identité du serveur MCP
- **Cycle de vie adéquat des jetons** : Utiliser des jetons d'accès à courte durée de vie avec des pratiques sécurisées de rotation


## Sécurité de la chaîne d'approvisionnement pour les systèmes IA

La sécurité de la chaîne d'approvisionnement a évolué au-delà des dépendances logicielles traditionnelles pour englober l'ensemble de l'écosystème IA. Les implémentations MCP modernes doivent vérifier et surveiller rigoureusement tous les composants liés à l'IA, car chacun introduit des vulnérabilités potentielles pouvant compromettre l'intégrité du système.

### Composants étendus de la chaîne d'approvisionnement IA

**Dépendances logicielles traditionnelles :**
- Bibliothèques et frameworks open-source
- Images de conteneurs et systèmes de base  
- Outils de développement et pipelines de construction
- Composants et services d'infrastructure

**Éléments spécifiques à l'IA dans la chaîne d'approvisionnement :**
- **Modèles fondamentaux** : Modèles pré-entraînés de divers fournisseurs nécessitant une vérification de provenance
- **Services d'embedding** : Services externes de vectorisation et de recherche sémantique
- **Fournisseurs de contexte** : Sources de données, bases de connaissances et dépôts documentaires  
- **APIs tierces** : Services IA externes, pipelines ML et points de traitement des données
- **Artefacts de modèle** : Poids, configurations et variantes de modèles fine-tunés
- **Sources de données d'entraînement** : Jeux de données utilisés pour l'entraînement et le fine-tuning des modèles

### Stratégie globale de sécurité de la chaîne d'approvisionnement

#### **Vérification et confiance des composants**
- **Validation de la provenance** : Vérifier l'origine, la licence et l'intégrité de tous les composants IA avant intégration
- **Évaluation de sécurité** : Effectuer des analyses de vulnérabilités et des revues de sécurité sur les modèles, les sources de données et les services IA
- **Analyse de réputation** : Évaluer l'historique de sécurité et les pratiques des fournisseurs de services IA
- **Vérification de conformité** : S'assurer que tous les composants répondent aux exigences de sécurité et réglementaires de l'organisation

#### **Pipelines de déploiement sécurisés**  
- **Sécurité automatisée CI/CD** : Intégrer la détection de vulnérabilités tout au long des pipelines de déploiement automatisés
- **Intégrité des artefacts** : Implémenter une vérification cryptographique pour tous les artefacts déployés (code, modèles, configurations)
- **Déploiement par étapes** : Utiliser des stratégies de déploiement progressif avec validation de sécurité à chaque étape
- **Dépôts d’artefacts de confiance** : Déployer uniquement à partir de registres et dépôts d’artefacts vérifiés et sécurisés

#### **Surveillance continue et réponse**
- **Analyse des dépendances** : Surveillance continue des vulnérabilités pour toutes les dépendances logicielles et composants IA
- **Surveillance des modèles** : Évaluation continue du comportement des modèles, dérive de performance et anomalies de sécurité
- **Suivi de la santé des services** : Surveiller la disponibilité, incidents de sécurité et changements de politiques des services IA externes
- **Intégration du renseignement sur les menaces** : Incorporer des flux de menaces spécifiques à la sécurité IA et ML

#### **Contrôle d'accès et principe du moindre privilège**
- **Permissions au niveau des composants** : Restreindre l'accès aux modèles, données et services selon la nécessité métier
- **Gestion des comptes de service** : Mettre en œuvre des comptes de service dédiés avec permissions minimales requises
- **Segmentation réseau** : Isoler les composants IA et limiter l'accès réseau inter-services
- **Contrôles des passerelles API** : Utiliser des API gateways centralisées pour contrôler et surveiller l’accès aux services IA externes

#### **Réponse aux incidents et récupération**
- **Procédures de réponse rapide** : Processus établis pour patcher ou remplacer les composants IA compromis
- **Rotation des identifiants** : Systèmes automatisés pour faire tourner secrets, clés API et identifiants de service
- **Capacités de retour en arrière** : Possibilité de revenir rapidement aux versions précédentes connues saines des composants IA
- **Récupération après compromission de la chaîne d'approvisionnement** : Procédures spécifiques pour répondre aux compromissions des services IA en amont

### Outils de sécurité Microsoft et intégration

**GitHub Advanced Security** offre une protection complète de la chaîne d'approvisionnement incluant :
- **Analyse des secrets** : Détection automatique des identifiants, clés API et jetons dans les dépôts
- **Analyse des dépendances** : Évaluation des vulnérabilités pour dépendances et bibliothèques open-source
- **Analyse CodeQL** : Analyse statique de code pour vulnérabilités de sécurité et problèmes de codage
- **Visibilité de la chaîne d'approvisionnement** : Visibilité sur la santé des dépendances et leur statut de sécurité

**Intégration Azure DevOps & Azure Repos :**
- Intégration fluide de la détection de sécurité sur les plateformes de développement Microsoft
- Contrôles de sécurité automatisés dans Azure Pipelines pour les charges IA
- Application des politiques pour déploiement sécurisé des composants IA

**Pratiques internes Microsoft :**
Microsoft met en œuvre des pratiques étendues de sécurité de la chaîne d’approvisionnement sur tous les produits. Découvrez les approches éprouvées dans [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Meilleures pratiques fondamentales de sécurité

Les implémentations MCP héritent et renforcent la posture de sécurité existante de votre organisation. Le renforcement des pratiques fondamentales de sécurité améliore considérablement la sécurité globale des systèmes IA et des déploiements MCP.

### Fondamentaux essentiels de la sécurité

#### **Pratiques de développement sécurisé**
- **Conformité OWASP** : Protection contre les vulnérabilités web [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- **Protections spécifiques à l'IA** : Mise en œuvre de contrôles pour [OWASP Top 10 pour LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- **Gestion sécurisée des secrets** : Utilisation de coffres-forts dédiés pour jetons, clés API et données de configuration sensibles
- **Chiffrement de bout en bout** : Mise en œuvre de communications sécurisées à travers tous les composants applicatifs et flux de données
- **Validation des entrées** : Validation rigoureuse de toutes les entrées utilisateur, paramètres API et sources de données

#### **Renforcement de l'infrastructure**
- **Authentification multi-facteurs** : MFA obligatoire pour tous les comptes administratifs et de service
- **Gestion des correctifs** : Correctifs automatisés et ponctuels pour systèmes d'exploitation, frameworks et dépendances  
- **Intégration de fournisseur d'identité** : Gestion centralisée des identités via fournisseurs d'entreprise (Microsoft Entra ID, Active Directory)
- **Segmentation réseau** : Isolation logique des composants MCP pour limiter les possibilités de mouvement latéral
- **Principe du moindre privilège** : Permissions minimales requises pour tous les composants système et comptes

#### **Surveillance et détection de sécurité**
- **Journalisation complète** : Journaux détaillés des activités des applications IA, incluant interactions client-serveur MCP
- **Intégration SIEM** : Gestion centralisée des informations et événements de sécurité pour détection d'anomalies
- **Analyses comportementales** : Surveillance assistée par IA pour détecter des comportements inhabituels des systèmes et utilisateurs
- **Renseignement sur les menaces** : Intégration de flux externes de menaces et indicateurs de compromission (IOCs)
- **Réponse aux incidents** : Procédures bien définies pour la détection, la réponse et la récupération des incidents de sécurité

#### **Architecture Zero Trust**
- **Ne jamais faire confiance, toujours vérifier** : Vérification continue des utilisateurs, appareils et connexions réseau
- **Micro-segmentation** : Contrôles réseau granulaires isolant charges de travail et services individuels
- **Sécurité centrée sur l'identité** : Politiques de sécurité basées sur identités vérifiées plutôt que la localisation réseau
- **Évaluation continue des risques** : Évaluation dynamique de la posture de sécurité basée sur le contexte et le comportement actuels
- **Accès conditionnel** : Contrôles d'accès adaptatifs basés sur facteurs de risque, localisation et confiance de l'appareil

### Modèles d'intégration d'entreprise

#### **Intégration dans l'écosystème de sécurité Microsoft**
- **Microsoft Defender for Cloud** : Gestion complète de la posture de sécurité cloud
- **Azure Sentinel** : Capacités SIEM et SOAR natives cloud pour la protection des charges IA
- **Microsoft Entra ID** : Gestion des identités et accès d'entreprise avec politiques d'accès conditionnel
- **Azure Key Vault** : Gestion centralisée des secrets avec module matériel de sécurité (HSM)
- **Microsoft Purview** : Gouvernance des données et conformité pour les sources de données et flux IA

#### **Conformité et gouvernance**
- **Alignement réglementaire** : S'assurer que les implémentations MCP répondent aux exigences de conformité sectorielles (RGPD, HIPAA, SOC 2)

- **Classification des données** : Catégorisation et gestion appropriées des données sensibles traitées par les systèmes d'IA
- **Pistes d'audit** : Journalisation complète pour la conformité réglementaire et l'enquête médico-légale
- **Contrôles de confidentialité** : Mise en œuvre des principes de confidentialité dès la conception dans l'architecture des systèmes d'IA
- **Gestion des changements** : Processus formels pour les revues de sécurité des modifications des systèmes d'IA

Ces pratiques fondamentales créent une base de sécurité solide qui améliore l'efficacité des contrôles de sécurité spécifiques à MCP et offre une protection complète pour les applications pilotées par l'IA.

## Principaux enseignements en matière de sécurité

- **Approche de sécurité en couches** : Combiner les pratiques fondamentales de sécurité (codage sécurisé, moindre privilège, vérification de la chaîne d'approvisionnement, surveillance continue) avec des contrôles spécifiques à l'IA pour une protection complète

- **Paysage des menaces spécifiques à l'IA** : Les systèmes MCP font face à des risques uniques incluant l'injection de prompt, l’empoisonnement d’outils, le détournement de session, les problèmes de délégué confus, les vulnérabilités de passage de jetons, et les permissions excessives nécessitant des mesures spécialisées

- **Excellence en authentification et autorisation** : Implémenter une authentification robuste utilisant des fournisseurs d’identité externes (Microsoft Entra ID), appliquer une validation correcte des jetons, et ne jamais accepter des jetons non explicitement émis pour votre serveur MCP

- **Prévention des attaques IA** : Déployer Microsoft Prompt Shields et Azure Content Safety pour se défendre contre les attaques indirectes d’injection de prompt et d’empoisonnement d’outils, tout en validant les métadonnées des outils et en surveillant les changements dynamiques

- **Sécurité des sessions et du transport** : Utiliser des identifiants de session cryptographiquement sécurisés et non déterministes liés aux identités des utilisateurs, implémenter une gestion correcte du cycle de vie des sessions, et ne jamais utiliser les sessions pour l’authentification

- **Meilleures pratiques de sécurité OAuth** : Prévenir les attaques de délégué confus via un consentement explicite de l’utilisateur pour les clients enregistrés dynamiquement, une implémentation correcte d’OAuth 2.1 avec PKCE, et une validation stricte de l’URI de redirection  

- **Principes de sécurité des jetons** : Éviter les anti-patrons de passage de jetons, valider les revendications d’audience des jetons, implémenter des jetons à courte durée de vie avec rotation sécurisée, et maintenir des frontières de confiance claires

- **Sécurité complète de la chaîne d’approvisionnement** : Traiter tous les composants de l’écosystème IA (modèles, embeddings, fournisseurs de contexte, APIs externes) avec la même rigueur de sécurité que les dépendances logicielles traditionnelles

- **Évolution continue** : Se tenir à jour avec les spécifications MCP en rapide évolution, contribuer aux standards de la communauté de sécurité, et maintenir des postures de sécurité adaptatives à mesure que le protocole mûrit

- **Intégration de la sécurité Microsoft** : Exploiter l’écosystème complet de sécurité Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pour une protection renforcée des déploiements MCP

## Ressources complètes

### **Documentation officielle de sécurité MCP**
- [Spécification MCP (Actuelle : 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Bonnes pratiques de sécurité MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spécification d’autorisation MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Dépôt GitHub MCP](https://github.com/modelcontextprotocol)

### **Ressources de sécurité OWASP MCP**
- [Guide de sécurité OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP complet avec conseils d’implémentation Azure
- [Top 10 OWASP MCP](https://owasp.org/www-project-mcp-top-10/) - Risques officiels de sécurité OWASP MCP
- [Atelier Sommet Sécurité MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Formation pratique à la sécurité pour MCP sur Azure

### **Normes et meilleures pratiques de sécurité**
- [Meilleures pratiques de sécurité OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [Top 10 OWASP Sécurité des applications web](https://owasp.org/www-project-top-ten/)
- [Top 10 OWASP pour modèles linguistiques de grande taille](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Rapport de défense numérique Microsoft](https://aka.ms/mddr)

### **Recherches et analyses en sécurité IA**
- [Injection de prompt dans MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Attaques d’empoisonnement d’outils (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing recherche sécurité MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Solutions de sécurité Microsoft**
- [Documentation Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Service Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Sécurité Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Meilleures pratiques de gestion des jetons Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guides d’implémentation & tutoriels**
- [Azure API Management comme passerelle d’authentification MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Authentification Microsoft Entra ID avec serveurs MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Stockage sécurisé des jetons et chiffrement (vidéo)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps & sécurité de la chaîne d’approvisionnement**
- [Sécurité Azure DevOps](https://azure.microsoft.com/products/devops)
- [Sécurité Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Parcours de sécurité de la chaîne d’approvisionnement Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentation de sécurité supplémentaire**

Pour des conseils de sécurité complets, référez-vous à ces documents spécialisés dans cette section :

- **[Bonnes pratiques de sécurité MCP 2025](./mcp-security-best-practices-2025.md)** - Pratiques complètes de sécurité pour les implémentations MCP
- **[Implémentation Azure Content Safety](./azure-content-safety-implementation.md)** - Exemples pratiques d’intégration Azure Content Safety  
- **[Contrôles de sécurité MCP 2025](./mcp-security-controls-2025.md)** - Derniers contrôles et techniques de sécurité pour les déploiements MCP
- **[Référence rapide des meilleures pratiques MCP](./mcp-best-practices.md)** - Guide de référence rapide des pratiques essentielles de sécurité MCP
- **[BlueHat 2026 : Sécuriser l’avenir de l’IA : Sécuriser MCP avec des modèles de défense en profondeur](https://www.youtube.com/watch?v=cVWB58kEt-Y)** - Modèles de défense en profondeur du Microsoft Security Response Center (MSRC)

### **Formations pratiques en sécurité**

- **[Atelier Sommet Sécurité MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - Atelier pratique complet pour sécuriser les serveurs MCP dans Azure avec des camps progressifs du Camp de Base au Sommet
- **[Guide de sécurité OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/)** - Architecture de référence et conseils d’implémentation pour tous les risques OWASP MCP Top 10

---

## Et après

Suivant : [Chapitre 3 : Premiers pas](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->