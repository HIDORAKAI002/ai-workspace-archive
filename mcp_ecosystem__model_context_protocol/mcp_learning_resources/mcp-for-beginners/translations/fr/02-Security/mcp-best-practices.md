# Meilleures Pratiques de Sécurité MCP 2025

Ce guide complet décrit les meilleures pratiques essentielles de sécurité pour la mise en œuvre des systèmes Model Context Protocol (MCP) basées sur la dernière **Spécification MCP 2025-11-25** et les normes actuelles de l'industrie. Ces pratiques abordent à la fois les préoccupations traditionnelles de sécurité et les menaces spécifiques à l’IA uniques aux déploiements MCP.

## Exigences Critiques de Sécurité

### Contrôles de Sécurité Obligatoires (Exigences MUST)

1. **Validation des Jetons** : Les serveurs MCP **NE DOIVENT PAS** accepter de jetons non explicitement émis pour le serveur MCP lui-même
2. **Vérification de l'Autorisation** : Les serveurs MCP mettant en œuvre une autorisation **DOIVENT** vérifier TOUS les requêtes entrantes et **NE DOIVENT PAS** utiliser de sessions pour l’authentification  
3. **Consentement Utilisateur** : Les serveurs proxy MCP utilisant des ID client statiques **DOIVENT** obtenir un consentement explicite de l’utilisateur pour chaque client enregistré dynamiquement
4. **Identifiants de Session Sécurisés** : Les serveurs MCP **DOIVENT** utiliser des identifiants de session cryptographiquement sécurisés, non déterministes, générés avec des générateurs de nombres aléatoires sécurisés

## Pratiques de Sécurité Fondamentales

### 1. Validation & Assainissement des Entrées
- **Validation Complète des Entrées** : Valider et assainir toutes les entrées pour prévenir les attaques par injection, les problèmes d’ambassadeur confus, et les vulnérabilités d’injection de prompt
- **Application stricte des Schémas de Paramètres** : Mettre en œuvre une validation stricte des schémas JSON pour tous les paramètres d’outils et les entrées API
- **Filtrage de Contenu** : Utiliser Microsoft Prompt Shields et Azure Content Safety pour filtrer le contenu malveillant dans les prompts et réponses
- **Assainissement des Sorties** : Valider et assainir toutes les sorties du modèle avant présentation aux utilisateurs ou systèmes en aval

### 2. Excellence en Authentification & Autorisation  
- **Fournisseurs d’Identité Externes** : Déléguer l’authentification à des fournisseurs d’identité établis (Microsoft Entra ID, fournisseurs OAuth 2.1) plutôt que d’implémenter une authentification personnalisée
- **Permissions Granulaires** : Mettre en œuvre des permissions fines spécifiques aux outils suivant le principe du moindre privilège
- **Gestion du Cycle de Vie des Jetons** : Utiliser des jetons d’accès à durée de vie courte avec rotation sécurisée et validation correcte de l’audience
- **Authentification Multi-facteurs** : Exiger l’AMF pour tous les accès administratifs et opérations sensibles

### 3. Protocoles de Communication Sécurisés
- **Sécurité de la Couche de Transport** : Utiliser HTTPS/TLS 1.3 pour toutes les communications MCP avec validation appropriée des certificats
- **Chiffrement de Bout en Bout** : Mettre en œuvre des couches de chiffrement supplémentaires pour les données hautement sensibles en transit et au repos
- **Gestion des Certificats** : Maintenir une gestion appropriée du cycle de vie des certificats avec processus de renouvellement automatisés
- **Application de la Version du Protocole** : Utiliser la version actuelle du protocole MCP (2025-11-25) avec négociation correcte de la version

### 4. Limitation Avancée du Débit & Protection des Ressources
- **Limitation du Débit Multi-couches** : Mettre en place une limitation du débit au niveau utilisateur, session, outil, et ressource pour prévenir les abus
- **Limitation Adaptative du Débit** : Utiliser une limitation du débit basée sur l’apprentissage machine qui s’adapte aux schémas d’usage et aux indicateurs de menace
- **Gestion des Quotas de Ressources** : Définir des limites appropriées pour les ressources de calcul, l’utilisation mémoire, et le temps d’exécution
- **Protection DDoS** : Déployer des systèmes complets de protection DDoS et d’analyse du trafic

### 5. Journalisation Complète & Surveillance
- **Journalisation Structurée d’Audit** : Mettre en œuvre des journaux détaillés et consultables pour toutes les opérations MCP, exécutions d’outils, et événements de sécurité
- **Surveillance de Sécurité en Temps Réel** : Déployer des systèmes SIEM avec détection d’anomalies alimentée par IA pour les charges MCP
- **Journalisation Conforme à la Vie Privée** : Enregistrer les événements de sécurité en respectant les exigences et réglementations de confidentialité des données
- **Intégration de la Réponse aux Incidents** : Connecter les systèmes de journalisation aux workflows automatisés de réponse aux incidents

### 6. Pratiques Avancées de Stockage Sécurisé
- **Modules de Sécurité Matérielle** : Utiliser un stockage des clés supporté par HSM (Azure Key Vault, AWS CloudHSM) pour les opérations cryptographiques critiques
- **Gestion des Clés de Chiffrement** : Mettre en œuvre une rotation appropriée des clés, une ségrégation et des contrôles d’accès pour les clés de chiffrement
- **Gestion des Secrets** : Stocker toutes les clés API, jetons, et identifiants dans des systèmes dédiés de gestion des secrets
- **Classification des Données** : Classifier les données selon les niveaux de sensibilité et appliquer les mesures de protection adéquates

### 7. Gestion Avancée des Jetons
- **Prévention de la Transmission de Jetons** : Interdire explicitement les motifs de transmission de jetons qui contournent les contrôles de sécurité
- **Validation de l’Audience** : Toujours vérifier que les revendications d’audience du jeton correspondent à l’identité prévue du serveur MCP
- **Autorisation Basée sur les Réclamations** : Mettre en œuvre une autorisation fine basée sur les revendications de jeton et les attributs utilisateur
- **Association des Jetons** : Associer les jetons à des sessions, utilisateurs, ou dispositifs spécifiques lorsque cela est approprié

### 8. Gestion Sécurisée des Sessions
- **Identifiants de Session Cryptographiques** : Générer des identifiants de session à l’aide de générateurs aléatoires cryptographiquement sécurisés (pas de séquences prévisibles)
- **Association Spécifique à l’Utilisateur** : Associer les identifiants de session à des informations utilisateur spécifiques en utilisant des formats sécurisés tels que `<user_id>:<session_id>`
- **Contrôles du Cycle de Vie des Sessions** : Mettre en œuvre une expiration, rotation, et invalidation appropriées des sessions
- **En-têtes de Sécurité des Sessions** : Utiliser les en-têtes HTTP de sécurité appropriés pour la protection des sessions

### 9. Contrôles de Sécurité Spécifiques à l’IA
- **Défense contre l’Injection de Prompt** : Déployer Microsoft Prompt Shields avec mise en évidence, délimiteurs, et techniques de datamarking
- **Prévention de l’Empoisonnement d’Outils** : Valider les métadonnées des outils, surveiller les changements dynamiques, et vérifier l’intégrité des outils
- **Validation des Sorties du Modèle** : Scanner les sorties modèles pour détection de fuites potentielles de données, contenu nuisible, ou violations des politiques de sécurité
- **Protection de la Fenêtre de Contexte** : Mettre en œuvre des contrôles pour prévenir l’empoisonnement et les attaques de manipulation de la fenêtre de contexte

### 10. Sécurité de l’Exécution des Outils
- **Exécution en Sandbox** : Exécuter les outils dans des environnements conteneurisés, isolés avec des limites sur les ressources
- **Séparation des Privilèges** : Exécuter les outils avec les privilèges minimaux nécessaires et des comptes de service séparés
- **Isolation Réseau** : Mettre en œuvre une segmentation réseau pour les environnements d’exécution des outils
- **Surveillance de l’Exécution** : Surveiller l’exécution des outils pour détecter comportements anormaux, utilisation des ressources, et violations de sécurité

### 11. Validation Continue de la Sécurité
- **Tests de Sécurité Automatisés** : Intégrer les tests de sécurité dans les pipelines CI/CD avec des outils comme GitHub Advanced Security
- **Gestion des Vulnérabilités** : Scanner régulièrement toutes les dépendances, y compris modèles IA et services externes
- **Tests de Pénétration** : Mener régulièrement des évaluations de sécurité ciblant spécifiquement les implémentations MCP
- **Revues de Code de Sécurité** : Mettre en place des revues de sécurité obligatoires pour tous les changements de code liés à MCP

### 12. Sécurité de la Chaîne d’Approvisionnement pour l’IA
- **Vérification des Composants** : Vérifier la provenance, l’intégrité et la sécurité de tous les composants IA (modèles, embeddings, API)
- **Gestion des Dépendances** : Maintenir un inventaire à jour de tous les logiciels et dépendances IA avec suivi des vulnérabilités
- **Dépôts de Confiance** : Utiliser des sources vérifiées et de confiance pour tous les modèles IA, bibliothèques, et outils
- **Surveillance de la Chaîne d’Approvisionnement** : Surveiller en continu les compromissions chez les fournisseurs de services IA et dépôts de modèles

## Modèles de Sécurité Avancés

### Architecture Zero Trust pour MCP
- **Ne jamais faire confiance, Toujours vérifier** : Mettre en œuvre une vérification continue pour tous les participants MCP
- **Micro-segmentation** : Isoler les composants MCP avec des contrôles granulaire réseau et d’identité
- **Accès Conditionnel** : Mettre en œuvre des contrôles d’accès basés sur le risque qui s’adaptent au contexte et comportement
- **Évaluation Continue du Risque** : Évaluer dynamiquement la posture de sécurité en fonction des indicateurs de menace actuels

### Mise en œuvre d’IA Respectueuse de la Vie Privée
- **Minimisation des Données** : Exposer uniquement le minimum nécessaire de données pour chaque opération MCP
- **Confidentialité Différentielle** : Mettre en œuvre des techniques préservant la vie privée pour le traitement des données sensibles
- **Chiffrement Homomorphe** : Utiliser des techniques avancées de chiffrement pour le calcul sécurisé sur les données chiffrées
- **Apprentissage Fédéré** : Mettre en œuvre des approches d’apprentissage distribuées qui préservent la localité et la confidentialité des données

### Réponse aux Incidents pour Systèmes IA
- **Procédures d’Incident Spécifiques à l’IA** : Développer des procédures de réponse aux incidents adaptées aux menaces spécifiques à l’IA et MCP
- **Réponse Automatisée** : Mettre en œuvre la contention et remédiation automatisées pour les incidents courants de sécurité IA  
- **Capacités Médico-légales** : Maintenir une préparation médico-légale pour les compromissions de systèmes IA et violations de données
- **Procédures de Récupération** : Établir des procédures pour la récupération suite à empoisonnement de modèle IA, attaques d’injection de prompt, et compromissions de service

## Ressources & Normes d’Implémentation

### 🏔️ Formation Pratique à la Sécurité
- **[Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - Atelier pratique complet pour sécuriser les serveurs MCP dans Azure
- **[Guide de Sécurité MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** - Architecture de référence et guide d’implémentation du Top 10 OWASP MCP

### Documentation Officielle MCP
- [Spécification MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) - Spécification actuelle du protocole MCP
- [Meilleures Pratiques de Sécurité MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) - Recommandations officielles de sécurité
- [Spécification d’Autorisation MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) - Modèles d’authentification et d’autorisation
- [Sécurité du Transport MCP](https://modelcontextprotocol.io/specification/2025-11-25/transports/) - Exigences de sécurité de la couche transport

### Solutions de Sécurité Microsoft
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Protection avancée contre l’injection de prompts
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Filtrage complet de contenu IA
- [Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) - Gestion d’identité et d’accès en entreprise
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/basic-concepts) - Gestion sécurisée des secrets et identifiants
- [GitHub Advanced Security](https://github.com/security/advanced-security) - Analyse de sécurité de la chaîne d’approvisionnement et du code

### Normes et Cadres de Sécurité
- [Meilleures Pratiques de Sécurité OAuth 2.1](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics) - Recommandations actuelles de sécurité OAuth
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Risques de sécurité des applications web
- [OWASP Top 10 pour LLMs](https://genai.owasp.org/download/43299/?tmstv=1731900559) - Risques spécifiques de sécurité IA
- [Cadre de Gestion des Risques IA NIST](https://www.nist.gov/itl/ai-risk-management-framework) - Gestion complète des risques IA
- [ISO 27001:2022](https://www.iso.org/standard/27001) - Systèmes de management de la sécurité de l’information

### Guides et Tutoriels d’Implémentation
- [Azure API Management comme Passerelle Auth MCP](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690) - Modèles d’authentification d’entreprise
- [Microsoft Entra ID avec les Serveurs MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/) - Intégration des fournisseurs d’identité
- [Implémentation du Stockage Sécurisé de Jetons](https://youtu.be/uRdX37EcCwg?si=6fSChs1G4glwXRy2) - Meilleures pratiques de gestion des jetons
- [Chiffrement de Bout en Bout pour l’IA](https://learn.microsoft.com/azure/architecture/example-scenario/confidential/end-to-end-encryption) - Modèles avancés de chiffrement

### Ressources Avancées de Sécurité
- [Cycle de Vie du Développement Sécurisé Microsoft](https://www.microsoft.com/sdl) - Pratiques de développement sécurisé
- [Guide de l’Équipe Rouge IA](https://learn.microsoft.com/security/ai-red-team/) - Tests de sécurité spécifiques IA
- [Modélisation des Menaces pour Systèmes IA](https://learn.microsoft.com/security/adoption/approach/threats-ai) - Méthodologie de modélisation des menaces IA
- [Ingénierie de la Vie Privée pour l’IA](https://www.microsoft.com/security/blog/2021/07/13/microsofts-pet-project-privacy-enhancing-technologies-in-action/) - Techniques d’IA respectueuses de la confidentialité

### Conformité & Gouvernance
- [Conformité GDPR pour l’IA](https://learn.microsoft.com/compliance/regulatory/gdpr-data-protection-impact-assessments) - Conformité à la vie privée dans les systèmes IA
- [Cadre de Gouvernance IA](https://learn.microsoft.com/azure/architecture/guide/responsible-ai/responsible-ai-overview) - Mise en œuvre responsable de l’IA
- [SOC 2 pour les Services IA](https://learn.microsoft.com/compliance/regulatory/offering-soc) - Contrôles de sécurité pour fournisseurs de services IA
- [Conformité HIPAA pour l’IA](https://learn.microsoft.com/compliance/regulatory/offering-hipaa-hitech) - Exigences de conformité IA dans la santé

### DevSecOps & Automatisation
- [Pipeline DevSecOps pour l’IA](https://learn.microsoft.com/azure/devops/migrate/security-validation-cicd-pipeline) - Pipelines sécurisés de développement IA
- [Tests de Sécurité Automatisés](https://learn.microsoft.com/security/engineering/devsecops) - Validation continue de la sécurité
- [Sécurité de l’Infrastructure as Code](https://learn.microsoft.com/security/engineering/infrastructure-security) - Déploiement sécurisé de l’infrastructure
- [Sécurité des Conteneurs pour l’IA](https://learn.microsoft.com/azure/container-instances/container-instances-image-security) - Sécurisation de la containerisation des charges IA

### Surveillance & Réponse aux Incidents  
- [Azure Monitor pour Charges IA](https://learn.microsoft.com/azure/azure-monitor/overview) - Solutions complètes de surveillance
- [Réponse aux Incidents de Sécurité IA](https://learn.microsoft.com/security/compass/incident-response-playbooks) - Procédures d’incident spécifiques à l’IA
- [SIEM pour Systèmes IA](https://learn.microsoft.com/azure/sentinel/overview) - Gestion des informations et événements de sécurité
- [Renseignement sur les Menaces pour l’IA](https://learn.microsoft.com/security/compass/security-operations-videos-and-decks#threat-intelligence) - Sources d’intelligence sur les menaces IA

## 🔄 Amélioration Continue

### Rester à Jour avec les Normes Évolutives
- **Mises à Jour de la Spécification MCP** : Surveiller les changements officiels de la spécification MCP et les avis de sécurité
- **Renseignement sur les Menaces** : S’abonner aux flux de menaces de sécurité IA et bases de données de vulnérabilités  
- **Engagement communautaire** : Participer aux discussions et groupes de travail de la communauté de sécurité MCP  
- **Évaluation régulière** : Réaliser des évaluations trimestrielles de la posture de sécurité et mettre à jour les pratiques en conséquence

### Contribution à la sécurité MCP
- **Recherche en sécurité** : Contribuer à la recherche en sécurité MCP et aux programmes de divulgation des vulnérabilités  
- **Partage des meilleures pratiques** : Partager les implémentations de sécurité et les leçons apprises avec la communauté  
- **Développement des normes** : Participer au développement des spécifications MCP et à la création de standards de sécurité  
- **Développement d’outils** : Développer et partager des outils et bibliothèques de sécurité pour l’écosystème MCP

---

*Ce document reflète les meilleures pratiques de sécurité MCP au 18 décembre 2025, basé sur la spécification MCP 2025-11-25. Les pratiques de sécurité doivent être régulièrement revues et mises à jour à mesure que le protocole et le paysage des menaces évoluent.*

## Quelle est la suite

- Lire : [MCP Security Best Practices 2025](./mcp-security-best-practices-2025.md)  
- Retourner à : [Security Module Overview](./README.md)  
- Continuer vers : [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatisée [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçons d’assurer la précision, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source faisant autorité. Pour les informations critiques, une traduction professionnelle réalisée par un humain est recommandée. Nous déclinons toute responsabilité en cas de malentendus ou d’interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->