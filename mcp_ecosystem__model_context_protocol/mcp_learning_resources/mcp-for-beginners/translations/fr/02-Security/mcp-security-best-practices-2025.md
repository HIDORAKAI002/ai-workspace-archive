# Meilleures pratiques de sécurité MCP - Mise à jour février 2026

> **Important** : Ce document reflète les dernières exigences de sécurité de la [Spécification MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) et les [Meilleures pratiques de sécurité MCP officielles](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices). Référez-vous toujours à la spécification actuelle pour obtenir les conseils les plus récents.

## 🏔️ Formation pratique en sécurité

Pour une expérience d'implémentation pratique, nous recommandons le **[Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** - une expédition guidée complète pour sécuriser les serveurs MCP dans Azure. L’atelier couvre tous les risques OWASP MCP Top 10 via une méthodologie « vulnérable → exploitation → correction → validation ».

Toutes les pratiques de ce document sont conformes au **[Guide de sécurité MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)** pour les conseils spécifiques à Azure.

## Pratiques essentielles de sécurité pour les implémentations MCP

Le Model Context Protocol introduit des défis de sécurité uniques qui vont au-delà de la sécurité logicielle traditionnelle. Ces pratiques abordent à la fois les exigences fondamentales de sécurité et les menaces spécifiques au MCP incluant l'injection de prompt, l'empoisonnement d'outils, le détournement de session, les problèmes de représentant confus et les vulnérabilités de passage de jetons.

### **Exigences de sécurité OBLIGATOIRES** 

**Exigences critiques de la spécification MCP :**

### **Exigences de sécurité OBLIGATOIRES** 

**Exigences critiques de la spécification MCP :**

> **NE DOIVENT PAS** : Les serveurs MCP **NE DOIVENT PAS** accepter de jetons qui n'ont pas été explicitement émis pour le serveur MCP  
>  
> **DOIVENT** : Les serveurs MCP mettant en œuvre l'autorisation **DOIVENT** vérifier TOUTES les requêtes entrantes  
>  
> **NE DOIVENT PAS** : Les serveurs MCP **NE DOIVENT PAS** utiliser de sessions pour l’authentification  
>  
> **DOIVENT** : Les serveurs proxy MCP utilisant des ID clients statiques **DOIVENT** obtenir le consentement utilisateur pour chaque client enregistré dynamiquement  

---

## 1. **Sécurité des jetons & Authentification**

**Contrôles d’authentification & d’autorisation :**  
   - **Revue rigoureuse de l’autorisation** : Effectuer des audits complets de la logique d’autorisation des serveurs MCP pour garantir que seuls les utilisateurs et clients prévus peuvent accéder aux ressources  
   - **Intégration de fournisseurs d’identité externes** : Utiliser des fournisseurs d’identité établis comme Microsoft Entra ID plutôt que d’implémenter une authentification personnalisée  
   - **Validation de l’audience des jetons** : Valider systématiquement que les jetons ont été explicitement émis pour votre serveur MCP - ne jamais accepter les jetons en amont  
   - **Cycle de vie correct des jetons** : Mettre en œuvre une rotation sécurisée des jetons, des politiques d’expiration et prévenir les attaques de relecture de jetons  

**Stockage protégé des jetons :**  
   - Utiliser Azure Key Vault ou des stockages d’identifiants sécurisés similaires pour tous les secrets  
   - Mettre en place un chiffrement des jetons au repos et en transit  
   - Rotation régulière des identifiants et surveillance des accès non autorisés  

## 2. **Gestion des sessions & Sécurité des transports**

**Pratiques sécurisées pour les sessions :**  
   - **Identifiants de session cryptographiquement sécurisés** : Utiliser des identifiants de session sécurisés et non déterministes générés par des générateurs de nombres aléatoires sécurisés  
   - **Association spécifique à l’utilisateur** : Lier les ID de session aux identités utilisateur via des formats tels que `<user_id>:<session_id>` pour éviter les abus inter-utilisateurs  
   - **Gestion du cycle de vie des sessions** : Implémenter une expiration, rotation et invalidation appropriées pour limiter les fenêtres de vulnérabilité  
   - **Application obligatoire de HTTPS/TLS** : HTTPS obligatoire pour toutes les communications afin de prévenir l’interception d’ID de session  

**Sécurité de la couche de transport :**  
   - Configurer TLS 1.3 si possible avec une bonne gestion des certificats  
   - Mettre en œuvre le pinning de certificats pour les connexions critiques  
   - Rotation régulière des certificats et vérification de leur validité  

## 3. **Protection contre les menaces spécifiques à l’IA** 🤖

**Défense contre l’injection de prompt :**  
   - **Boucliers de prompt Microsoft** : Déployer les Boucliers de Prompt IA pour une détection avancée et un filtrage des instructions malveillantes  
   - **Assainissement des entrées** : Valider et assainir toutes les entrées pour prévenir les attaques par injection et les problèmes de représentant confus  
   - **Délimitations de contenu** : Utiliser des systèmes de délimiteurs et d’étiquetage de données pour distinguer les instructions fiables du contenu externe  

**Prévention de l’empoisonnement d’outils :**  
   - **Validation des métadonnées d’outils** : Mettre en œuvre des contrôles d’intégrité pour les définitions d’outils et surveiller les modifications inattendues  
   - **Surveillance dynamique des outils** : Surveiller le comportement à l’exécution et configurer des alertes pour les exécutions inattendues  
   - **Flux d’approbation** : Exiger une approbation explicite de l’utilisateur pour les modifications d’outils et de capacités  

## 4. **Contrôle d’accès & Permissions**

**Principe du moindre privilège :**  
   - Attribuer aux serveurs MCP uniquement les permissions minimales nécessaires à leur fonctionnement  
   - Mettre en œuvre un contrôle d’accès basé sur les rôles (RBAC) avec des permissions fines  
   - Réaliser des revues régulières des permissions et une surveillance continue de l’escalade de privilèges  

**Contrôles des permissions en temps d’exécution :**  
   - Appliquer des limites de ressources pour éviter les attaques par épuisement de ressources  
   - Utiliser l’isolation par conteneur pour les environnements d’exécution d’outils  
   - Mettre en œuvre l’accès juste-à-temps pour les fonctions administratives  

## 5. **Sécurité du contenu & Surveillance**

**Mise en œuvre de la sécurité du contenu :**  
   - **Intégration Azure Content Safety** : Utiliser Azure Content Safety pour détecter les contenus nuisibles, tentatives de jailbreak et violations de politique  
   - **Analyse comportementale** : Mettre en place une surveillance comportementale à l’exécution pour détecter les anomalies dans le serveur MCP et l’exécution d’outils  
   - **Journalisation exhaustive** : Consigner toutes les tentatives d’authentification, invocations d’outils et événements de sécurité dans un stockage sécurisé et infalsifiable  

**Surveillance continue :**  
   - Alertes en temps réel pour les schémas suspects et tentatives d’accès non autorisées  
   - Intégration avec des systèmes SIEM pour une gestion centralisée des événements de sécurité  
   - Audits de sécurité réguliers et tests de pénétration des implémentations MCP  

## 6. **Sécurité de la chaîne d’approvisionnement**

**Vérification des composants :**  
   - **Analyse des dépendances** : Utiliser des scans automatisés de vulnérabilités pour toutes les dépendances logicielles et composants IA  
   - **Validation de la provenance** : Vérifier l’origine, la licence et l’intégrité des modèles, sources de données et services externes  
   - **Packages signés** : Utiliser des packages signés cryptographiquement et vérifier les signatures avant déploiement  

**Pipeline de développement sécurisé :**  
   - **Sécurité avancée GitHub** : Mettre en œuvre le scanning des secrets, l’analyse des dépendances et l’analyse statique CodeQL  
   - **Sécurité CI/CD** : Intégrer la validation de sécurité tout au long des pipelines automatisés de déploiement  
   - **Intégrité des artefacts** : Mettre en place une vérification cryptographique des artefacts et configurations déployés  

## 7. **Sécurité OAuth & Prévention du représentant confus**

**Implémentation OAuth 2.1 :**  
   - **Implémentation PKCE** : Utiliser Proof Key for Code Exchange (PKCE) pour toutes les requêtes d’autorisation  
   - **Consentement explicite** : Obtenir le consentement de l’utilisateur pour chaque client enregistré dynamiquement afin de prévenir les attaques de représentant confus  
   - **Validation stricte des URI de redirection** : Mettre en œuvre une validation rigoureuse des URI de redirection et des identifiants clients  

**Sécurité proxy :**  
   - Empêcher la contournement d’autorisation via l’exploitation des ID clients statiques  
   - Mettre en œuvre des flux d’approbation appropriés pour l’accès API tiers  
   - Surveiller le vol de code d’autorisation et les accès API non autorisés  

## 8. **Réponse aux incidents & Reprise**

**Capacités de réponse rapide :**  
   - **Réponse automatisée** : Mettre en œuvre des systèmes automatisés pour la rotation des identifiants et la confinement des menaces  
   - **Procédures de retour arrière** : Capacité de revenir rapidement aux configurations et composants connus comme sûrs  
   - **Capacités forensiques** : Traces d’audit détaillées et journalisation pour l’investigation des incidents  

**Communication & coordination :**  
   - Procédures claires d’escalade pour les incidents de sécurité  
   - Intégration avec les équipes organisationnelles de réponse aux incidents  
   - Simulations régulières d’incidents de sécurité et exercices sur table  

## 9. **Conformité & Gouvernance**

**Conformité réglementaire :**  
   - S’assurer que les implémentations MCP respectent les exigences sectorielles (RGPD, HIPAA, SOC 2)  
   - Mettre en œuvre la classification des données et les contrôles de confidentialité pour le traitement des données IA  
   - Maintenir une documentation complète pour les audits de conformité  

**Gestion des changements :**  
   - Processus formels de revue de sécurité pour toutes les modifications des systèmes MCP  
   - Contrôle de version et flux d’approbation pour les changements de configuration  
   - Évaluations régulières de conformité et analyses des écarts  

## 10. **Contrôles de sécurité avancés**

**Architecture Zero Trust :**  
   - **Ne jamais faire confiance, toujours vérifier** : Vérification continue des utilisateurs, dispositifs et connexions  
   - **Micro-segmentation** : Contrôles réseau granulaires isolant les composants MCP individuels  
   - **Accès conditionnel** : Contrôles d’accès basés sur le risque, adaptés au contexte et comportement actuels  

**Protection d’application à l’exécution :**  
   - **Protection d’application en temps d’exécution (RASP)** : Déployer des techniques RASP pour la détection en temps réel des menaces  
   - **Surveillance des performances applicatives** : Surveiller les anomalies de performances pouvant indiquer des attaques  
   - **Politiques de sécurité dynamiques** : Mettre en œuvre des politiques de sécurité adaptatives basées sur le paysage des menaces actuel  

## 11. **Intégration avec l’écosystème de sécurité Microsoft**

**Sécurité Microsoft complète :**  
   - **Microsoft Defender for Cloud** : Gestion de la posture de sécurité cloud pour les charges MCP  
   - **Azure Sentinel** : Capacités SIEM et SOAR natives cloud pour la détection avancée des menaces  
   - **Microsoft Purview** : Gouvernance des données et conformité pour les flux IA et sources de données  

**Gestion des identités & accès :**  
   - **Microsoft Entra ID** : Gestion des identités d’entreprise avec politiques d’accès conditionnel  
   - **Gestion des identités privilégiées (PIM)** : Accès juste-à-temps et flux d’approbation pour les fonctions administratives  
   - **Protection d’identité** : Accès conditionnel basé sur le risque et réponses automatisées aux menaces  

## 12. **Évolution continue de la sécurité**

**Se tenir à jour :**  
   - **Surveillance des spécifications** : Revue régulière des mises à jour de la spécification MCP et des changements des directives de sécurité  
   - **Renseignement sur les menaces** : Intégration de flux spécifiques IA et d’indicateurs de compromission  
   - **Engagement communautaire en sécurité** : Participation active à la communauté de sécurité MCP et aux programmes de divulgation de vulnérabilités  

**Sécurité adaptative :**  
   - **Sécurité basée sur l’apprentissage automatique** : Utiliser la détection d’anomalies ML pour identifier des modèles d’attaque nouveaux  
   - **Analytique prédictive de sécurité** : Implémenter des modèles prédictifs pour l’identification proactive des menaces  
   - **Automatisation de la sécurité** : Mises à jour automatisées des politiques de sécurité basées sur le renseignement sur les menaces et les changements de spécifications  

---

## **Ressources critiques de sécurité**

### **Documentation officielle MCP**
- [Spécification MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Meilleures pratiques de sécurité MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spécification d’autorisation MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Ressources de sécurité OWASP MCP**
- [Guide de sécurité MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 complet avec implémentation Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risques de sécurité MCP officiels OWASP  
- [Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formation pratique en sécurité MCP sur Azure  

### **Solutions de sécurité Microsoft**
- [Boucliers de Prompt Microsoft](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Sécurité Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/secure-least-privileged-access)
- [Sécurité avancée GitHub](https://github.com/security/advanced-security)

### **Normes de sécurité**
- [Meilleures pratiques de sécurité OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 pour les modèles de langage large](https://genai.owasp.org/)
- [Cadre de gestion des risques NIST pour l’IA](https://www.nist.gov/itl/ai-risk-management-framework)

### **Guides d’implémentation**
- [Passerelle d’authentification MCP Azure API Management](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-your-auth-gateway-for-mcp-servers/4402690)
- [Microsoft Entra ID avec serveurs MCP](https://den.dev/blog/mcp-server-auth-entra-id-session/)

---

> **Avis de sécurité** : Les pratiques de sécurité MCP évoluent rapidement. Vérifiez toujours auprès de la [spécification MCP actuelle](https://spec.modelcontextprotocol.io/) et de la [documentation de sécurité officielle](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) avant toute implémentation.

## Et ensuite

- Lire : [Contrôles de sécurité MCP 2025](./mcp-security-controls-2025.md)  
- Retour à : [Vue d’ensemble du module de sécurité](./README.md)  
- Continuer vers : [Module 3 : Prise en main](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçons d’assurer l’exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant foi. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle humaine. Nous ne sommes pas responsables des malentendus ou des erreurs d’interprétation résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->