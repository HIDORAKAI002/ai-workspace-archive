# Sécurité MCP : Protection complète pour les systèmes d'IA

[![MCP Security Best Practices](../../../translated_images/fr/03.175aed6dedae133f.webp)](https://youtu.be/88No8pw706o)

_(Cliquez sur l'image ci-dessus pour visionner la vidéo de cette leçon)_

La sécurité est fondamentale dans la conception des systèmes d'IA, c’est pourquoi nous la plaçons en deuxième section. Cela s’aligne avec le principe **Secure by Design** de Microsoft issu de l’[Initiative Secure Future](https://www.microsoft.com/security/blog/2025/04/17/microsofts-secure-by-design-journey-one-year-of-success/).

Le Model Context Protocol (MCP) apporte de puissantes capacités aux applications pilotées par l’IA tout en introduisant des défis uniques en matière de sécurité qui vont au-delà des risques logiciels traditionnels. Les systèmes MCP font face à la fois à des enjeux de sécurité établis (codage sécurisé, moindre privilège, sécurité de la chaîne d’approvisionnement) et à de nouvelles menaces spécifiques à l’IA telles que l’injection de prompt, l’empoisonnement d’outils, le détournement de session, les attaques du délégué confus, les vulnérabilités de passage de jetons et la modification dynamique des capacités.

Cette leçon explore les risques de sécurité les plus critiques dans les implémentations MCP — couvrant l’authentification, l’autorisation, les permissions excessives, l’injection indirecte de prompt, la sécurité des sessions, les problèmes de délégué confus, la gestion des jetons et les vulnérabilités de la chaîne d’approvisionnement. Vous apprendrez des mesures concrètes et des meilleures pratiques pour atténuer ces risques tout en tirant parti des solutions Microsoft telles que Prompt Shields, Azure Content Safety et GitHub Advanced Security pour renforcer votre déploiement MCP.

## Objectifs d'apprentissage

À la fin de cette leçon, vous serez capable de :

- **Identifier les menaces spécifiques à MCP** : Reconnaître les risques de sécurité uniques aux systèmes MCP, y compris l’injection de prompt, l’empoisonnement d’outils, les permissions excessives, le détournement de session, les problèmes de délégué confus, les vulnérabilités de passage de jetons et les risques liés à la chaîne d’approvisionnement
- **Appliquer les contrôles de sécurité** : Mettre en œuvre des atténuations efficaces comme une authentification robuste, un accès au moindre privilège, une gestion sécurisée des jetons, des contrôles de sécurité des sessions et la vérification de la chaîne d’approvisionnement
- **Exploiter les solutions de sécurité Microsoft** : Comprendre et déployer Microsoft Prompt Shields, Azure Content Safety et GitHub Advanced Security pour la protection des charges de travail MCP
- **Valider la sécurité des outils** : Reconnaître l’importance de la validation des métadonnées des outils, surveiller les modifications dynamiques et se défendre contre les attaques indirectes d’injection de prompt
- **Intégrer les meilleures pratiques** : Combiner les fondamentaux de la sécurité établis (codage sécurisé, durcissement des serveurs, zero trust) avec les contrôles spécifiques à MCP pour une protection complète

# Architecture & Contrôles de Sécurité MCP

Les implémentations modernes de MCP nécessitent des approches de sécurité stratifiées qui couvrent à la fois la sécurité logicielle traditionnelle et les menaces spécifiques à l’IA. La spécification MCP en évolution rapide continue de faire mûrir ses contrôles de sécurité, permettant une meilleure intégration avec les architectures de sécurité d'entreprise et les bonnes pratiques établies.

Les recherches du [Microsoft Digital Defense Report](https://aka.ms/mddr) démontrent que **98 % des violations signalées seraient évitées par une hygiène de sécurité rigoureuse**. La stratégie de protection la plus efficace combine des pratiques de sécurité fondamentales avec des contrôles spécifiques MCP — les mesures de sécurité de base avérées restent les plus impactantes pour réduire globalement le risque.

## Paysage actuel de la sécurité

> **Note :** Ces informations reflètent les normes de sécurité MCP en date du **5 février 2026**, alignées avec la **Spécification MCP 2025-11-25**. Le protocole MCP continue d’évoluer rapidement et les futures implémentations pourraient introduire de nouveaux schémas d’authentification et des contrôles renforcés. Référez-vous toujours à la [Spécification MCP](https://spec.modelcontextprotocol.io/), au [référentiel GitHub MCP](https://github.com/modelcontextprotocol) et à la [documentation des meilleures pratiques de sécurité](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) pour les directives les plus récentes.

## 🏔️ Atelier Sommet de Sécurité MCP (Sherpa)

Pour une **formation pratique à la sécurité**, nous recommandons vivement l’**Atelier Sommet de Sécurité MCP** (Sherpa) — une expédition guidée complète pour sécuriser les serveurs MCP sur Microsoft Azure.

### Aperçu de l'atelier

L’[Atelier Sommet de Sécurité MCP](https://azure-samples.github.io/sherpa/) offre une formation pratique et concrète en sécurité à travers une méthodologie éprouvée « vulnérable → exploitation → correction → validation ». Vous allez :

- **Apprendre en cassant les choses** : Expérimenter les vulnérabilités en exploitant des serveurs intentionnellement non sécurisés
- **Utiliser la sécurité native Azure** : Exploiter Azure Entra ID, Key Vault, API Management et AI Content Safety
- **Suivre une approche Défense en profondeur** : Progression à travers des camps construisant des couches de sécurité complètes
- **Appliquer les standards OWASP** : Chaque technique correspond au [Guide de Sécurité MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)
- **Obtenir du code de production** : Repartir avec des implémentations fonctionnelles et testées

### Le parcours de l’expédition

| Camp | Focus | Risques OWASP couverts |
|------|-------|-----------------------|
| **Camp de Base** | Fondamentaux MCP & vulnérabilités d’authentification | MCP01, MCP07 |
| **Camp 1 : Identité** | OAuth 2.1, Azure Managed Identity, Key Vault | MCP01, MCP02, MCP07 |
| **Camp 2 : Passerelle** | API Management, Endpoints Privés, gouvernance | MCP02, MCP07, MCP09 |
| **Camp 3 : Sécurité I/O** | Injection de prompt, protection PII, sécurité du contenu | MCP03, MCP05, MCP06 |
| **Camp 4 : Surveillance** | Log Analytics, tableaux de bord, détection des menaces | MCP08 |
| **Le Sommet** | Test d’intégration Red Team / Blue Team | Tous |

**Commencez ici** : [https://azure-samples.github.io/sherpa/](https://azure-samples.github.io/sherpa/)

## Top 10 des Risques de Sécurité MCP OWASP

Le [Guide de Sécurité MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) détaille les dix risques de sécurité les plus critiques pour les implémentations MCP :

| Risque | Description | Atténuation Azure |
|--------|-------------|-------------------|
| **MCP01** | Mauvaise gestion des jetons & exposition des secrets | Azure Key Vault, Managed Identity |
| **MCP02** | Él evation de privilèges via extension de scope | RBAC, accès conditionnel |
| **MCP03** | Empoisonnement d’outils | Validation des outils, vérification de l’intégrité |
| **MCP04** | Attaques sur la chaîne d’approvisionnement | GitHub Advanced Security, scan des dépendances |
| **MCP05** | Injection et exécution de commandes | Validation des entrées, sandboxing |
| **MCP06** | Injection de prompt via charges contextuelles | Azure AI Content Safety, Prompt Shields |
| **MCP07** | Authentification & autorisation insuffisantes | Azure Entra ID, OAuth 2.1 avec PKCE |
| **MCP08** | Manque d’audit & de télémétrie | Azure Monitor, Application Insights |
| **MCP09** | Serveurs MCP fantômes | Gouvernance API Center, isolation réseau |
| **MCP10** | Injection de contexte & surexposition | Classification des données, exposition minimale |

### Évolution de l’authentification MCP

La spécification MCP a évolué significativement dans son approche d’authentification et d’autorisation :

- **Approche originale** : Les premières spécifications demandaient aux développeurs d’implémenter des serveurs d’authentification personnalisés, les serveurs MCP agissant comme serveurs d’autorisation OAuth 2.0 gérant l’authentification utilisateur directement
- **Norme actuelle (2025-11-25)** : La spécification mise à jour permet aux serveurs MCP de déléguer l’authentification à des fournisseurs d’identité externes (tels que Microsoft Entra ID), améliorant la posture de sécurité et réduisant la complexité de mise en œuvre
- **Sécurité de la couche transport** : Support renforcé des mécanismes de transport sécurisé avec des schémas d’authentification adaptés tant pour les connexions locales (STDIO) que distantes (Streamable HTTP)

## Sécurité de l’authentification & l’autorisation

### Défis actuels en sécurité

Les implémentations modernes de MCP font face à plusieurs défis liés à l’authentification et à l’autorisation :

### Risques & vecteurs d’attaque

- **Logique d’autorisation mal configurée** : Une implémentation erronée de l’autorisation dans les serveurs MCP peut exposer des données sensibles et appliquer incorrectement les contrôles d’accès
- **Compromission de jetons OAuth** : Le vol de jetons du serveur MCP local permet à un attaquant de se faire passer pour le serveur et d’accéder à des services descendants
- **Vulnérabilités de passage de jetons** : Une gestion inappropriée des jetons crée des contournements de contrôles de sécurité et des lacunes en matière de responsabilité
- **Permissions excessives** : Des serveurs MCP sur-priviliégiés enfreignent les principes du moindre privilège et agrandissent la surface d’attaque

#### Passage de jetons : un anti-pattern critique

**Le passage de jetons est explicitement interdit** dans la spécification d’autorisation MCP actuelle en raison de graves implications en sécurité :

##### Contournement des contrôles de sécurité
- Les serveurs MCP et les API en aval mettent en œuvre des contrôles critiques (limitation de débit, validation des requêtes, surveillance du trafic) qui nécessitent une validation appropriée des jetons
- L’utilisation directe des jetons client vers API contourne ces protections essentielles, sapant l’architecture de sécurité

##### Problèmes de responsabilité et d’audit  
- Les serveurs MCP ne peuvent pas distinguer les clients utilisant des jetons émis en amont, compromettant les pistes d’audit
- Les logs des serveurs de ressources en aval montrent des origines trompeuses des requêtes au lieu des intermédiaires MCP réels
- L’investigation des incidents et les audits de conformité deviennent significativement plus difficiles

##### Risques d’exfiltration de données
- Des revendications de jetons non validées permettent à des acteurs malveillants munis de jetons volés d’utiliser les serveurs MCP comme proxy pour l’exfiltration de données
- Ces violations des périmètres de confiance autorisent des accès non autorisés contournant les contrôles de sécurité prévus

##### Vecteurs d’attaques multi-services
- Des jetons compromis acceptés par plusieurs services permettent des déplacements latéraux à travers des systèmes connectés
- Les hypothèses de confiance entre services peuvent être violées quand l’origine des jetons ne peut être vérifiée

### Contrôles et mesures d’atténuation de sécurité

**Exigences critiques en sécurité :**

> **OBLIGATOIRE** : Les serveurs MCP **NE DOIVENT PAS** accepter de jetons qui n’ont pas été explicitement émis pour le serveur MCP

#### Contrôles d’authentification & d’autorisation

- **Revue rigoureuse des autorisations** : Effectuer des audits complets de la logique d’autorisation des serveurs MCP pour garantir que seuls les utilisateurs et clients prévus peuvent accéder aux ressources sensibles
  - **Guide d’implémentation** : [Azure API Management comme passerelle d’authentification pour les serveurs MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
  - **Intégration d’identité** : [Utilisation de Microsoft Entra ID pour l’authentification des serveurs MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

- **Gestion sécurisée des jetons** : Appliquer les [meilleures pratiques Microsoft de validation et cycle de vie des jetons](https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens)
  - Valider que les claims audience correspondent à l’identité du serveur MCP
  - Implémenter une rotation et expiration correctes des jetons
  - Prévenir les attaques par relecture et usages non autorisés

- **Stockage protégé des jetons** : Sécuriser le stockage des jetons par chiffrement au repos et en transit
  - **Meilleures pratiques** : [Directives pour le stockage sécurisé et le chiffrement des jetons](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

#### Mise en œuvre du contrôle d’accès

- **Principe du moindre privilège** : Accorder aux serveurs MCP uniquement les permissions minimales nécessaires à leur fonction
  - Revoir et mettre à jour régulièrement les permissions pour éviter la dérive des privilèges
  - **Documentation Microsoft** : [Accès sécurisé au moindre privilège](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)

- **Contrôle d’accès basé sur les rôles (RBAC)** : Implémenter des rôles fins et précis
  - Cibler les rôles sur des ressources et actions spécifiques
  - Éviter les permissions trop larges ou inutiles augmentant la surface d’attaque

- **Surveillance continue des permissions** : Mettre en place des audits et une surveillance régulière des accès
  - Surveiller les schémas d’utilisation pour détecter des anomalies
  - Corriger rapidement les privilèges excessifs ou inutilisés

## Menaces spécifiques à l’IA en sécurité

### Attaques par injection de prompt & manipulation d’outils

Les implémentations modernes MCP font face à des vecteurs d’attaque sophistiqués spécifiques à l’IA que les mesures de sécurité traditionnelles ne couvrent pas complètement :

#### **Injection de prompt indirecte (Injection de prompt inter-domaines)**

L’**injection de prompt indirecte** est une des vulnérabilités les plus critiques dans les systèmes IA activés par MCP. Les attaquants intègrent des instructions malveillantes dans des contenus externes — documents, pages web, emails ou sources de données — que les systèmes IA traitent ensuite comme des commandes légitimes.

**Scénarios d’attaque :**  
- **Injection dans des documents** : Instructions malveillantes cachées dans des documents traités qui déclenchent des actions IA non désirées  
- **Exploitation de contenu web** : Pages web compromises contenant des prompts intégrés manipulant le comportement IA lors du scraping  
- **Attaques par email** : Prompts malveillants dans les emails qui poussent les assistants IA à divulguer des informations ou effectuer des actions non autorisées  
- **Contamination de sources de données** : Bases de données ou API compromises fournissant du contenu corrompu aux systèmes IA

**Impact réel** : Ces attaques peuvent aboutir à l’exfiltration de données, des violations de la vie privée, la génération de contenu nuisible et la manipulation des interactions utilisateurs. Pour une analyse détaillée, voir [Prompt Injection in MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/).

![Prompt Injection Attack Diagram](../../../translated_images/fr/prompt-injection.ed9fbfde297ca877.webp)

#### **Attaques d’empoisonnement d’outils**

L’**empoisonnement d’outils** cible les métadonnées qui définissent les outils MCP, exploitant la manière dont les LLM interprètent les descriptions et paramètres des outils pour prendre des décisions d’exécution.

**Mécanismes d’attaque :**  
- **Manipulation des métadonnées** : Les attaquants injectent des instructions malveillantes dans les descriptions d’outils, les définitions de paramètres ou les exemples d’utilisation  
- **Instructions invisibles** : Prompts cachés dans les métadonnées d’outils traités par les modèles IA mais invisibles pour les utilisateurs humains  
- **Modification dynamique des outils ("rug pulls")** : Outils approuvés par les utilisateurs modifiés ensuite pour exécuter des actions malveillantes sans connaissance utilisateur  
- **Injection de paramètres** : Contenu malveillant inséré dans les schémas de paramètres d’outil qui influencent le comportement du modèle

**Risques liés aux serveurs hébergés** : Les serveurs MCP distants présentent des risques accrus car les définitions d’outils peuvent être mises à jour après approbation utilisateur initiale, créant des scénarios où des outils précédemment sûrs deviennent malveillants. Pour une analyse complète, voir [Tool Poisoning Attacks (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks).

![Tool Injection Attack Diagram](../../../translated_images/fr/tool-injection.3b0b4a6b24de6bef.webp)

#### **Vecteurs d’attaque IA supplémentaires**

- **Injection de prompt inter-domaines (XPIA)** : Attaques sophistiquées utilisant du contenu provenant de plusieurs domaines pour contourner les contrôles de sécurité
- **Modification dynamique des capacités** : Changements en temps réel des capacités des outils qui échappent aux évaluations de sécurité initiales  
- **Empoisonnement de la fenêtre contextuelle** : Attaques qui manipulent de larges fenêtres contextuelles pour masquer des instructions malveillantes  
- **Attaques de confusion du modèle** : Exploitation des limites du modèle pour créer des comportements imprévisibles ou dangereux  


### Impact des risques de sécurité IA

**Conséquences à fort impact :**  
- **Exfiltration de données** : Accès non autorisé et vol de données sensibles d’entreprise ou personnelles  
- **Violations de confidentialité** : Exposition d’informations personnelles identifiables (PII) et de données confidentielles  
- **Manipulation des systèmes** : Modifications non intentionnelles des systèmes critiques et des processus de travail  
- **Vol d'identifiants** : Compromission des jetons d'authentification et des identifiants de service  
- **Mouvement latéral** : Utilisation de systèmes IA compromis comme points pivot pour des attaques réseau plus larges  

### Solutions de sécurité IA Microsoft

#### **Boucliers de prompt IA : Protection avancée contre les attaques par injection**

Microsoft **AI Prompt Shields** offre une défense complète contre les attaques d'injection de prompt directes et indirectes via plusieurs couches de sécurité :

##### **Mécanismes de protection essentiels :**

1. **Détection avancée & filtrage**  
   - Algorithmes d’apprentissage automatique et techniques de TALN détectent les instructions malveillantes dans le contenu externe  
   - Analyse en temps réel de documents, pages web, emails et sources de données pour détecter des menaces intégrées  
   - Compréhension contextuelle des modèles de prompt légitimes vs malveillants  

2. **Techniques de mise en lumière**  
   - Distingue les instructions système de confiance des entrées externes potentiellement compromises  
   - Méthodes de transformation du texte qui améliorent la pertinence du modèle tout en isolant le contenu malveillant  
   - Aide les systèmes IA à maintenir une hiérarchie d’instructions correcte et à ignorer les commandes injectées  

3. **Systèmes de délimitation & marquage des données**  
   - Définition explicite des frontières entre messages système de confiance et texte d'entrée externe  
   - Marqueurs spéciaux qui soulignent les limites entre sources de données fiables et non fiables  
   - Séparation claire pour éviter la confusion des instructions et l’exécution non autorisée des commandes  

4. **Veille continue sur les menaces**  
   - Microsoft surveille en continu les nouveaux schémas d’attaque et met à jour les défenses  
   - Chasse proactive aux menaces pour détecter de nouvelles techniques d’injection et vecteurs d’attaque  
   - Mises à jour régulières des modèles de sécurité pour maintenir l’efficacité face aux menaces évolutives  

5. **Intégration Azure Content Safety**  
   - Partie intégrante de la suite complète Azure AI Content Safety  
   - Détection supplémentaire des tentatives de jailbreak, contenus nuisibles et violations de politiques de sécurité  
   - Contrôles de sécurité unifiés à travers les composants d’applications IA  

**Ressources d’implémentation** : [Documentation Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)

![Microsoft Prompt Shields Protection](../../../translated_images/fr/prompt-shield.ff5b95be76e9c78c.webp)


## Menaces avancées sur la sécurité MCP

### Vulnérabilités de détournement de session

Le **détournement de session** constitue un vecteur d’attaque critique dans les implémentations MCP avec état, où des parties non autorisées obtiennent et abusent d’identifiants légitimes de session pour usurper des clients et effectuer des actions non autorisées.

#### **Scénarios d’attaque & risques**

- **Injection de prompt par détournement de session** : Les attaquants avec des ID de session volés injectent des événements malveillants sur des serveurs partageant l’état de session, pouvant déclencher des actions nuisibles ou accéder à des données sensibles  
- **Usurpation directe** : Les ID de session volés permettent des appels directs au serveur MCP en contournant l’authentification, traitant les attaquants comme des utilisateurs légitimes  
- **Flux résumables compromis** : Les attaquants peuvent interrompre prématurément les requêtes, obligeant les clients légitimes à reprendre avec un contenu potentiellement malveillant  

#### **Contrôles de sécurité pour la gestion des sessions**

**Exigences critiques :**  
- **Vérification d'autorisation** : Les serveurs MCP mettant en œuvre l’autorisation **DOIVENT** vérifier **TOUTES** les requêtes entrantes et **NE DOIVENT PAS** s’appuyer sur les sessions pour l’authentification  
- **Génération sécurisée des sessions** : Utiliser des ID de session cryptographiquement sécurisés, non déterministes, générés avec des générateurs de nombres aléatoires sécurisés  
- **Association spécifique utilisateur** : Associer les ID de session à des informations utilisateur spécifiques via des formats comme `<user_id>:<session_id>` pour éviter l’abus de session cross-utilisateur  
- **Gestion du cycle de vie des sessions** : Implémenter expiration, rotation et invalidation appropriées pour limiter les fenêtres de vulnérabilité  
- **Sécurité du transport** : HTTPS obligatoire pour toute communication afin d’éviter l’interception des ID de session  

### Problème du délégué confus

Le **problème du délégué confus** survient lorsque les serveurs MCP agissent comme proxies d’authentification entre clients et services tiers, créant des opportunités de contournement d’autorisation par exploitation d’ID client statiques.

#### **Mécaniques d’attaque & risques**

- **Contournement par consentement basé sur cookies** : L’authentification utilisateur précédente crée des cookies de consentement que les attaquants exploitent via des requêtes d’autorisation malveillantes avec URI de redirection falsifiées  
- **Vol de code d’autorisation** : Les cookies de consentement existants peuvent amener les serveurs d’autorisation à éviter l’affichage des écrans de consentement, redirigeant les codes vers des endpoints contrôlés par les attaquants  
- **Accès API non autorisé** : Les codes d’autorisation volés permettent l’échange de jetons et l’usurpation d’utilisateur sans approbation explicite  

#### **Stratégies d'atténuation**

**Contrôles obligatoires :**  
- **Exigence de consentement explicite** : Les serveurs proxy MCP utilisant des ID client statiques **DOIVENT** obtenir le consentement utilisateur pour chaque client enregistré dynamiquement  
- **Implémentation de sécurité OAuth 2.1** : Suivre les meilleures pratiques de sécurité OAuth actuelles incluant PKCE (Proof Key for Code Exchange) pour toutes les requêtes d’autorisation  
- **Validation stricte des clients** : Mettre en place une validation rigoureuse des URI de redirection et des identifiants clients pour éviter les exploitations  

### Vulnérabilités liées au passage de jetons  

Le **passage de jetons** représente un anti-pattern explicite où les serveurs MCP acceptent des jetons client sans validation adéquate et les transmettent aux API en aval, violant les spécifications d’autorisation MCP.

#### **Implications de sécurité**

- **Contournement des contrôles** : L’usage direct de jetons client vers l’API contourne les contrôles critiques de limitation de débit, validation et surveillance  
- **Corruption de la traçabilité** : Les jetons émis en amont rendent l’identification client impossible, compromettant les capacités d’investigation d’incidents  
- **Exfiltration de données par proxy** : Les jetons non validés permettent aux acteurs malveillants d’utiliser les serveurs comme proxies pour l’accès non autorisé aux données  
- **Violations des frontières de confiance** : Les hypothèses de confiance des services en aval peuvent être violées lorsque l’origine des jetons ne peut être vérifiée  
- **Expansion des attaques multi-services** : Les jetons compromis acceptés partout facilitent le mouvement latéral  

#### **Contrôles de sécurité requis**

**Exigences non négociables :**  
- **Validation des jetons** : Les serveurs MCP **NE DOIVENT PAS** accepter les jetons non explicitement émis pour le serveur MCP  
- **Vérification de l'audience** : Valider systématiquement que les affirmations d’audience du jeton correspondent à l’identité du serveur MCP  
- **Cycle de vie correct du jeton** : Mettre en œuvre des jetons d’accès à courte durée de vie avec des pratiques sécurisées de rotation  

## Sécurité de la chaîne d'approvisionnement pour les systèmes IA

La sécurité de la chaîne d'approvisionnement a évolué au-delà des dépendances logicielles traditionnelles pour couvrir l’ensemble de l’écosystème IA. Les implémentations modernes MCP doivent vérifier et surveiller rigoureusement tous les composants liés à l’IA, chacun introduisant des vulnérabilités potentielles pouvant compromettre l’intégrité du système.

### Composants étendus de la chaîne d'approvisionnement IA

**Dépendances logicielles traditionnelles :**  
- Bibliothèques et frameworks open source  
- Images de conteneurs et systèmes de base  
- Outils de développement et pipelines de build  
- Composants et services d’infrastructure  

**Éléments spécifiques à la chaîne d’approvisionnement IA :**  
- **Modèles fondamentaux** : Modèles pré-entraînés par divers fournisseurs nécessitant une vérification de la provenance  
- **Services d’embedding** : Services externes de vectorisation et recherche sémantique  
- **Fournisseurs de contexte** : Sources de données, bases de connaissances et référentiels documentaires  
- **API tierces** : Services IA externes, pipelines ML et points de traitement de données  
- **Artefacts de modèles** : Poids, configurations et variantes de modèles affinés  
- **Sources de données d’entraînement** : Jeux de données utilisés pour l’entraînement et l’ajustement des modèles  

### Stratégie globale de sécurité de la chaîne d’approvisionnement

#### **Vérification des composants & confiance**  
- **Validation de la provenance** : Vérifier l’origine, les licences et l’intégrité de tous les composants IA avant intégration  
- **Évaluation de sécurité** : Effectuer des scans de vulnérabilités et des revues de sécurité pour modèles, sources de données et services IA  
- **Analyse de réputation** : Évaluer les antécédents de sécurité et les pratiques des fournisseurs de services IA  
- **Vérification de conformité** : S’assurer que tous les composants respectent les exigences organisationnelles de sécurité et réglementaires  

#### **Pipelines de déploiement sécurisés**  
- **Sécurité CI/CD automatisée** : Intégrer des scans de sécurité dans les pipelines de déploiement automatisés  
- **Intégrité des artefacts** : Mettre en œuvre une vérification cryptographique pour tous les artefacts déployés (code, modèles, configurations)  
- **Déploiement par étapes** : Utiliser des stratégies de déploiement progressif avec validation de sécurité à chaque étape  
- **Répertoires d’artefacts fiables** : Déployer uniquement depuis des registres et dépôts vérifiés et sécurisés  

#### **Surveillance continue & réponse**  
- **Scan des dépendances** : Surveillance continue des vulnérabilités pour toutes les dépendances logicielles et composants IA  
- **Surveillance des modèles** : Évaluation continue du comportement des modèles, dérives de performances et anomalies de sécurité  
- **Suivi de la santé des services** : Surveillance des services IA externes pour la disponibilité, incidents de sécurité et changements de politique  
- **Intégration de la veille sur les menaces** : Incorporer des flux de renseignements sur les menaces spécifiques à la sécurité IA et ML  

#### **Contrôle d’accès & moindre privilège**  
- **Permissions par composant** : Restreindre l’accès aux modèles, données et services en fonction des besoins métiers  
- **Gestion des comptes de service** : Utiliser des comptes de service dédiés avec les permissions minimales requises  
- **Segmentation réseau** : Isoler les composants IA et limiter l’accès réseau entre les services  
- **Contrôles des passerelles API** : Utiliser des passerelles API centralisées pour contrôler et surveiller l’accès aux services IA externes  

#### **Réponse aux incidents & récupération**  
- **Procédures de réponse rapides** : Processus établis pour patcher ou remplacer les composants IA compromis  
- **Rotation des identifiants** : Systèmes automatisés de rotation des secrets, clés API et identifiants de service  
- **Capacité de repli** : Possibilité de revenir rapidement à des versions connues sûres des composants IA  
- **Récupération après compromission de la chaîne** : Procédures spécifiques pour répondre aux compromissions des services IA en amont  

### Outils et intégration Microsoft Security

**GitHub Advanced Security** offre une protection complète de la chaîne d’approvisionnement incluant :  
- **Scan des secrets** : Détection automatisée des identifiants, clés API et jetons dans les dépôts  
- **Scan des dépendances** : Évaluation des vulnérabilités pour les dépendances open source et bibliothèques  
- **Analyse CodeQL** : Analyse statique du code pour détecter vulnérabilités et problèmes de codage  
- **Insights sur la chaîne d’approvisionnement** : Visibilité sur la santé des dépendances et leur statut de sécurité  

**Intégration Azure DevOps & Azure Repos :**  
- Intégration fluide des scans de sécurité sur les plateformes de développement Microsoft  
- Contrôles de sécurité automatisés dans Azure Pipelines pour les charges de travail IA  
- Application des politiques pour un déploiement sécurisé des composants IA  

**Pratiques internes Microsoft :**  
Microsoft met en œuvre d’importantes pratiques de sécurité de la chaîne d’approvisionnement sur l’ensemble des produits. Découvrez les approches éprouvées dans [The Journey to Secure the Software Supply Chain at Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/).


## Bonnes pratiques fondamentales de sécurité

Les implémentations MCP héritent et s’appuient sur la posture de sécurité existante de votre organisation. Renforcer les pratiques fondamentales de sécurité améliore significativement la sécurité globale des systèmes IA et des déploiements MCP.

### Principes fondamentaux de sécurité

#### **Pratiques sécurisées de développement**  
- **Conformité OWASP** : Protection contre les vulnérabilités des applications web listées dans [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- **Protections spécifiques IA** : Implémentation de contrôles pour [OWASP Top 10 pour LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559)  
- **Gestion sécurisée des secrets** : Utilisation de coffres dédiés pour les jetons, clés API et données de configuration sensibles  
- **Chiffrement de bout en bout** : Mise en œuvre de communications sécurisées à travers tous les composants applicatifs et flux de données  
- **Validation des entrées** : Validation rigoureuse de toutes les entrées utilisateurs, paramètres API et sources de données  

#### **Renforcement de l’infrastructure**  
- **Authentification multi-facteurs** : MFA obligatoire pour tous les comptes administratifs et de service  
- **Gestion des correctifs** : Application automatisée et en temps opportun des correctifs pour OS, frameworks et dépendances  
- **Intégration des fournisseurs d’identité** : Gestion centralisée des identités via fournisseurs d’identité d’entreprise (Microsoft Entra ID, Active Directory)  
- **Segmentation réseau** : Isolation logique des composants MCP pour limiter le potentiel de mouvement latéral  
- **Principe du moindre privilège** : Permissions minimales nécessaires pour tous les composants système et comptes  

#### **Surveillance & détection de sécurité**  
- **Journalisation complète** : Enregistrement détaillé des activités des applications IA, y compris les interactions client-serveur MCP  
- **Intégration SIEM** : Gestion centralisée des informations et événements de sécurité pour détection d’anomalies  
- **Analyse comportementale** : Surveillance assistée par IA pour détecter des motifs inhabituels dans le comportement système et utilisateur  
- **Veille sur les menaces** : Intégration de flux externes de renseignements sur les menaces et indicateurs de compromission (IOC)  
- **Réponse aux incidents** : Procédures bien définies pour détection, réponse et récupération en cas d’incident de sécurité  

#### **Architecture Zero Trust**  
- **Ne jamais faire confiance, toujours vérifier** : Vérification continue des utilisateurs, appareils et connexions réseau  
- **Micro-segmentation** : Contrôles réseau granulaires isolant les charges de travail et services individuels  
- **Sécurité centrée sur l’identité** : Politiques de sécurité basées sur des identités vérifiées plutôt que la localisation réseau  
- **Évaluation continue des risques** : Évaluation dynamique de la posture de sécurité selon le contexte et le comportement  
- **Accès conditionnel** : Contrôles d’accès adaptatifs en fonction des facteurs de risque, localisation et confiance de l’appareil  

### Modèles d’intégration en entreprise

#### **Intégration dans l’écosystème de sécurité Microsoft**  
- **Microsoft Defender for Cloud** : Gestion complète de la posture de sécurité cloud  
- **Azure Sentinel** : Capacités SIEM et SOAR natives cloud pour protection des charges IA  
- **Microsoft Entra ID** : Gestion d’identité et d’accès en entreprise avec politiques d’accès conditionnel  
- **Azure Key Vault** : Gestion centralisée des secrets avec support de module de sécurité matérielle (HSM)  
- **Microsoft Purview** : Gouvernance des données et conformité pour les sources et processus IA  

#### **Conformité & gouvernance**  
- **Alignement réglementaire** : Veiller à ce que les implémentations MCP respectent les exigences spécifiques de conformité sectorielle (RGPD, HIPAA, SOC 2)  
- **Classification des données** : Catégorisation et traitement adéquats des données sensibles traitées par les systèmes IA  
- **Traçabilité** : Journalisation complète pour conformité réglementaire et investigation judiciaire  
- **Contrôles de confidentialité** : Mise en œuvre des principes de protection de la vie privée dès la conception des architectures IA  
- **Gestion des changements** : Processus formalisés pour revue de sécurité lors des modifications des systèmes IA  

Ces pratiques fondamentales établissent une base de sécurité robuste qui renforce l’efficacité des contrôles de sécurité spécifiques MCP et offre une protection globale pour les applications pilotées par IA.
## Principaux points clés de sécurité

- **Approche de sécurité multicouche** : Combiner les pratiques fondamentales de sécurité (codage sécurisé, moindre privilège, vérification de la chaîne d'approvisionnement, surveillance continue) avec des contrôles spécifiques à l'IA pour une protection complète

- **Paysage de menaces spécifiques à l'IA** : Les systèmes MCP sont exposés à des risques uniques incluant l'injection de prompt, l'empoisonnement d'outils, le détournement de session, les problèmes de délégué confus, les vulnérabilités de passage de jetons et les permissions excessives nécessitant des mitigations spécialisées

- **Excellence en authentification et autorisation** : Mettre en œuvre une authentification robuste utilisant des fournisseurs d'identité externes (Microsoft Entra ID), appliquer une validation appropriée des jetons et ne jamais accepter de jetons non explicitement émis pour votre serveur MCP

- **Prévention des attaques IA** : Déployer Microsoft Prompt Shields et Azure Content Safety pour se défendre contre les attaques d'injection indirecte de prompt et d'empoisonnement d'outils, tout en validant les métadonnées des outils et en surveillant les modifications dynamiques

- **Sécurité des sessions et du transport** : Utiliser des identifiants de session non déterministes, cryptographiquement sécurisés et liés aux identités utilisateur, mettre en œuvre une gestion correcte du cycle de vie des sessions, et ne jamais utiliser les sessions pour l'authentification

- **Meilleures pratiques de sécurité OAuth** : Prévenir les attaques de délégué confus via un consentement explicite de l'utilisateur pour les clients enregistrés dynamiquement, une mise en œuvre correcte d'OAuth 2.1 avec PKCE, et une validation stricte des URI de redirection

- **Principes de sécurité des jetons** : Éviter les anti-modèles de passage de jetons, valider les revendications d'audience des jetons, mettre en œuvre des jetons à courte durée de vie avec une rotation sécurisée, et maintenir des frontières de confiance claires

- **Sécurité complète de la chaîne d'approvisionnement** : Traiter tous les composants de l'écosystème IA (modèles, embeddings, fournisseurs de contexte, API externes) avec la même rigueur de sécurité que les dépendances logicielles traditionnelles

- **Évolution continue** : Rester à jour avec les spécifications MCP en rapide évolution, contribuer aux standards de la communauté de sécurité, et maintenir des postures de sécurité adaptatives à mesure que le protocole mûrit

- **Intégration de la sécurité Microsoft** : Tirer parti de l'écosystème complet de sécurité Microsoft (Prompt Shields, Azure Content Safety, GitHub Advanced Security, Entra ID) pour une protection renforcée des déploiements MCP

## Ressources complètes

### **Documentation officielle de sécurité MCP**
- [Spécification MCP (Actuelle : 2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Meilleures pratiques de sécurité MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spécification d'autorisation MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Dépôt GitHub MCP](https://github.com/modelcontextprotocol)

### **Ressources de sécurité OWASP MCP**
- [Guide de sécurité Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 complet avec conseils d'implémentation Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risques officiels de sécurité MCP par OWASP
- [Atelier Sécurité MCP Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formation pratique en sécurité MCP sur Azure

### **Normes et meilleures pratiques de sécurité**
- [Meilleures pratiques de sécurité OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 pour la sécurité des applications web](https://owasp.org/www-project-top-ten/)
- [OWASP Top 10 pour les grands modèles linguistiques](https://genai.owasp.org/download/43299/?tmstv=1731900559)
- [Rapport Microsoft Digital Defense](https://aka.ms/mddr)

### **Recherche et analyse en sécurité IA**
- [Injection de prompt dans MCP (Simon Willison)](https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/)
- [Attaques d'empoisonnement d'outils (Invariant Labs)](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- [Briefing de recherche de sécurité MCP (Wiz Security)](https://www.wiz.io/blog/mcp-security-research-briefing#remote-servers-22)

### **Solutions de sécurité Microsoft**
- [Documentation Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Service Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Sécurité Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Meilleures pratiques de gestion des jetons Azure](https://learn.microsoft.com/entra/identity-platform/access-tokens)
- [GitHub Advanced Security](https://github.com/security/advanced-security)

### **Guides d'implémentation et tutoriels**
- [Azure API Management comme passerelle d'authentification MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Authentification Microsoft Entra ID avec serveurs MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)
- [Stockage sécurisé des jetons et chiffrement (Vidéo)](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2)

### **DevOps et sécurité de la chaîne d'approvisionnement**
- [Sécurité Azure DevOps](https://azure.microsoft.com/products/devops)
- [Sécurité Azure Repos](https://azure.microsoft.com/products/devops/repos/)
- [Parcours sécurité de la chaîne d'approvisionnement Microsoft](https://devblogs.microsoft.com/engineering-at-microsoft/the-journey-to-secure-the-software-supply-chain-at-microsoft/)

## **Documentation de sécurité supplémentaire**

Pour des conseils de sécurité complets, consultez ces documents spécialisés dans cette section :

- **[Meilleures pratiques de sécurité MCP 2025](./mcp-security-best-practices-2025.md)** - Pratiques de sécurité complètes pour les implémentations MCP
- **[Implémentation Azure Content Safety](./azure-content-safety-implementation.md)** - Exemples pratiques d'intégration Azure Content Safety  
- **[Contrôles de sécurité MCP 2025](./mcp-security-controls-2025.md)** - Derniers contrôles et techniques de sécurité pour les déploiements MCP
- **[Référence rapide des meilleures pratiques MCP](./mcp-best-practices.md)** - Guide de référence rapide pour les pratiques essentielles de sécurité MCP

### **Formation pratique en sécurité**

- **[Atelier Sécurité MCP Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Atelier pratique complet pour sécuriser les serveurs MCP sur Azure avec des camps progressifs du Base Camp au Summit
- **[Guide de sécurité Azure OWASP MCP](https://microsoft.github.io/mcp-azure-security-guide/)** - Architecture de référence et conseils d'implémentation pour tous les risques OWASP MCP Top 10

---

## Quelles sont les prochaines étapes

Suivant : [Chapitre 3 : Premiers pas](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avis de non-responsabilité** :
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforcions d’assurer l’exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle humaine. Nous déclinons toute responsabilité en cas de malentendus ou de mauvaises interprétations résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->