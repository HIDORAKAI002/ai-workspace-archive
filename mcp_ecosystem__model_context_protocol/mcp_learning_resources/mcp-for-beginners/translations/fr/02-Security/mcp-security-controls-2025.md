# Contrôles de Sécurité MCP - Mise à Jour Février 2026

> **Norme Actuelle** : Ce document reflète les exigences de sécurité de la [Spécification MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) et les [Bonnes Pratiques de Sécurité Officielles MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Le Model Context Protocol (MCP) a considérablement mûri avec des contrôles de sécurité renforcés qui adressent à la fois la sécurité logicielle traditionnelle et les menaces spécifiques à l'IA. Ce document fournit des contrôles de sécurité complets pour des implémentations MCP sécurisées alignées avec le cadre OWASP MCP Top 10.

## 🏔️ Formation Pratique en Sécurité

Pour une expérience pratique d'implémentation de la sécurité, nous recommandons l'**[Atelier du Sommet de Sécurité MCP (Sherpa)](https://azure-samples.github.io/sherpa/)** - une expédition guidée complète pour sécuriser les serveurs MCP dans Azure en utilisant une méthodologie "vulnérable → exploitation → correction → validation".

Tous les contrôles de sécurité de ce document sont alignés avec le **[Guide de Sécurité Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**, qui fournit des architectures de référence et des recommandations d'implémentation spécifiques à Azure pour les risques OWASP MCP Top 10.

## **Exigences de Sécurité OBLIGATOIRES**

### **Interdictions Critiques de la Spécification MCP :**

> **INTERDIT** : Les serveurs MCP **NE DOIVENT PAS** accepter des tokens non explicitement émis pour le serveur MCP
>
> **PROHIBÉ** : Les serveurs MCP **NE DOIVENT PAS** utiliser de sessions pour l'authentification  
>
> **REQUIS** : Les serveurs MCP implémentant l'autorisation **DOIVENT** vérifier TOUTES les requêtes entrantes
>
> **OBLIGATOIRE** : Les serveurs proxy MCP utilisant des identifiants clients statiques **DOIVENT** obtenir le consentement de l'utilisateur pour chaque client enregistré dynamiquement

---

## 1. **Contrôles d'Authentification & d'Autorisation**

### **Intégration de Fournisseur d'Identité Externe**

La **Norme MCP Actuelle (2025-11-25)** permet aux serveurs MCP de déléguer l'authentification à des fournisseurs d'identité externes, représentant une amélioration majeure en matière de sécurité :

**Risque OWASP MCP Adressé** : [MCP07 - Authentification & Autorisation Insuffisantes](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Bénéfices Sécuritaires :**
1. **Élimine les Risques d'Authentification Personnalisée** : Réduit la surface de vulnérabilité en évitant des implémentations d’authentification personnalisées
2. **Sécurité de Niveau Entreprise** : Exploite des fournisseurs d'identité établis comme Microsoft Entra ID avec des fonctionnalités avancées de sécurité
3. **Gestion Centralisée des Identités** : Simplifie la gestion du cycle de vie utilisateur, le contrôle d'accès et l'audit de conformité
4. **Authentification Multi-Facteurs** : Hérite des capacités MFA des fournisseurs d'identité d’entreprise
5. **Politiques d'Accès Conditionnel** : Bénéficie de contrôles d'accès basés sur les risques et d'authentification adaptative

**Exigences d'Implémentation :**
- **Validation de l'Audience des Tokens** : Vérifier que tous les tokens sont explicitement émis pour le serveur MCP
- **Vérification de l'Émetteur** : Valider que l'émetteur du token correspond au fournisseur d'identité attendu
- **Validation de la Signature** : Validation cryptographique de l'intégrité du token
- **Application de l'Expiration** : Respect strict des limites de durée de vie des tokens
- **Validation des Périmètres (Scope)** : S'assurer que les tokens contiennent les permissions appropriées pour les opérations demandées

### **Sécurité de la Logique d'Autorisation**

**Contrôles Critiques :**
- **Audits Complets de l'Autorisation** : Revue régulière de la sécurité de tous les points de décision d'autorisation
- **Valeurs par Défaut Sécurisées** : Refuser l'accès lorsque la logique d’autorisation ne peut prendre de décision définitive
- **Limites de Permissions** : Séparation claire entre différents niveaux de privilèges et accès aux ressources
- **Journalisation des Audits** : Enregistrement complet de toutes les décisions d’autorisation pour la surveillance de la sécurité
- **Revue Périodique d'Accès** : Validation régulière des permissions et attributions de privilèges utilisateur

## 2. **Sécurité des Tokens & Contrôles Anti-Passthrough**

**Risque OWASP MCP Adressé** : [MCP01 - Mauvaise Gestion des Tokens & Exposition des Secrets](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prévention du Passthrough de Tokens**

**Le passthrough de tokens est explicitement interdit** dans la Spécification d'Autorisation MCP en raison de risques critiques de sécurité :

**Risques de Sécurité Adressés :**
- **Contournement des Contrôles** : Évite des contrôles de sécurité essentiels comme la limitation de taux, la validation des requêtes et la surveillance du trafic
- **Rupture de Responsabilité** : Rend impossible l’identification du client, corrompant ainsi les pistes d’audit et l’investigation des incidents
- **Exfiltration via Proxy** : Permet à des acteurs malveillants d’utiliser les serveurs comme proxy pour un accès non autorisé aux données
- **Violation des Frontières de Confiance** : Brise les hypothèses de confiance des services en aval concernant l’origine des tokens
- **Mouvement Latéral** : Les tokens compromis à travers plusieurs services permettent une expansion plus large des attaques

**Contrôles d'Implémentation :**
```yaml
Token Validation Requirements:
  audience_validation: MANDATORY
  issuer_verification: MANDATORY  
  signature_check: MANDATORY
  expiration_enforcement: MANDATORY
  scope_validation: MANDATORY
  
Token Lifecycle Management:
  rotation_frequency: "Short-lived tokens preferred"
  secure_storage: "Azure Key Vault or equivalent"
  transmission_security: "TLS 1.3 minimum"
  replay_protection: "Implemented via nonce/timestamp"
```

### **Modèles de Gestion Sécurisée des Tokens**

**Bonnes Pratiques :**
- **Tokens à Durée de Vie Courte** : Réduire la fenêtre d’exposition avec une rotation fréquente des tokens
- **Émission Juste-à-Temps** : Émettre les tokens uniquement lorsqu'ils sont nécessaires pour des opérations spécifiques
- **Stockage Sécurisé** : Utiliser des modules matériels de sécurité (HSM) ou des coffres à clés sécurisés
- **Association des Tokens** : Lier les tokens à des clients, sessions ou opérations spécifiques autant que possible
- **Surveillance & Alertes** : Détection en temps réel des usages abusifs des tokens ou accès non autorisés

## 3. **Contrôles de Sécurité des Sessions**

### **Prévention du Détournement de Session**

**Vecteurs d'Attaque Adressés :**
- **Injection dans le Prompt de Détournement de Session** : Événements malveillants injectés dans l’état partagé de la session
- **Usurpation de Session** : Usage non autorisé d’ID de session volés pour contourner l'authentification
- **Attaques de Reprise de Flux** : Exploitation de la reprise des événements envoyés par le serveur pour injection de contenu malveillant

**Contrôles Obligatoires des Sessions :**
```yaml
Session ID Generation:
  randomness_source: "Cryptographically secure RNG"
  entropy_bits: 128 # Minimum recommended
  format: "Base64url encoded"
  predictability: "MUST be non-deterministic"

Session Binding:
  user_binding: "REQUIRED - <user_id>:<session_id>"
  additional_identifiers: "Device fingerprint, IP validation"
  context_binding: "Request origin, user agent validation"
  
Session Lifecycle:
  expiration: "Configurable timeout policies"
  rotation: "After privilege escalation events"
  invalidation: "Immediate on security events"
  cleanup: "Automated expired session removal"
```

**Sécurité du Transport :**
- **Application de HTTPS** : Toute communication de session en TLS 1.3
- **Attributs de Cookies Sécurisés** : HttpOnly, Secure, SameSite=Strict
- **Pinning de Certificat** : Pour les connexions critiques afin d’éviter les attaques MITM

### **Considérations Stateful vs Stateless**

**Pour les implémentations stateful :**
- L’état partagé de session nécessite une protection supplémentaire contre les attaques par injection
- La gestion des sessions basée sur files d’attente nécessite une vérification d’intégrité
- Plusieurs instances serveur requièrent une synchronisation sécurisée de l’état de session

**Pour les implémentations stateless :**
- Gestion des sessions par tokens JWT ou similaires
- Vérification cryptographique de l’intégrité de l’état de session
- Surface d’attaque réduite mais nécessite une validation robuste des tokens

## 4. **Contrôles de Sécurité Spécifiques à l'IA**

**Risques OWASP MCP Adressés** :
- [MCP06 - Subversion du Flux d’Intentions](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)
- [MCP03 - Empoisonnement d’Outils](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)
- [MCP05 - Injection & Exécution de Commandes](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)

### **Défense contre l’Injection dans les Prompts**

**Intégration Microsoft Prompt Shields :**
```yaml
Detection Mechanisms:
  - "Advanced ML-based instruction detection"
  - "Contextual analysis of external content"
  - "Real-time threat pattern recognition"
  
Protection Techniques:
  - "Spotlighting trusted vs untrusted content"
  - "Delimiter systems for content boundaries"  
  - "Data marking for content source identification"
  
Integration Points:
  - "Azure Content Safety service"
  - "Real-time content filtering"
  - "Threat intelligence updates"
```

**Contrôles d’Implémentation :**
- **Assainissement des Entrées** : Validation et filtre complets de toutes les entrées utilisateurs
- **Définition des Limites de Contenu** : Séparation claire entre instructions système et contenu utilisateur
- **Hiérarchie des Instructions** : Règles de priorité appropriées pour des instructions conflictuelles
- **Surveillance des Sorties** : Détection des sorties potentiellement nuisibles ou manipulées

### **Prévention de l’Empoisonnement des Outils**

**Cadre de Sécurité des Outils :**
```yaml
Tool Definition Protection:
  validation:
    - "Schema validation against expected formats"
    - "Content analysis for malicious instructions" 
    - "Parameter injection detection"
    - "Hidden instruction identification"
  
  integrity_verification:
    - "Cryptographic hashing of tool definitions"
    - "Digital signatures for tool packages"
    - "Version control with change auditing"
    - "Tamper detection mechanisms"
  
  monitoring:
    - "Real-time change detection"
    - "Behavioral analysis of tool usage"
    - "Anomaly detection for execution patterns"
    - "Automated alerting for suspicious modifications"
```

**Gestion Dynamique des Outils :**
- **Flux d’Approbation** : Consentement explicite utilisateur pour modification des outils
- **Capacités de Repli** : Possibilité de revenir à des versions antérieures des outils
- **Audit des Modifications** : Historique complet des changements de définition des outils
- **Évaluation des Risques** : Analyse automatisée de la posture de sécurité des outils

## 5. **Prévention de l’Attaque du Député Confus**

### **Sécurité du Proxy OAuth**

**Contrôles de Prévention des Attaques :**
```yaml
Client Registration:
  static_client_protection:
    - "Explicit user consent for dynamic registration"
    - "Consent bypass prevention mechanisms"  
    - "Cookie-based consent validation"
    - "Redirect URI strict validation"
    
  authorization_flow:
    - "PKCE implementation (OAuth 2.1)"
    - "State parameter validation"
    - "Authorization code binding"
    - "Nonce verification for ID tokens"
```

**Exigences d’Implémentation :**
- **Vérification du Consentement Utilisateur** : Ne jamais passer outre les écrans de consentement pour l’enregistrement dynamique des clients
- **Validation de l’URI de Redirection** : Validation stricte basée sur une liste blanche des destinations de redirection
- **Protection des Codes d’Autorisation** : Codes à usage unique et durée de vie limitée
- **Vérification d'Identité du Client** : Validation robuste des identifiants clients et métadonnées

## 6. **Sécurité de l’Exécution des Outils**

### **Sandboxing & Isolation**

**Isolation Basée sur Conteneurs :**
```yaml
Execution Environment:
  containerization: "Docker/Podman with security profiles"
  resource_limits:
    cpu: "Configurable CPU quotas"
    memory: "Memory usage restrictions"
    disk: "Storage access limitations"
    network: "Network policy enforcement"
  
  privilege_restrictions:
    user_context: "Non-root execution mandatory"
    capability_dropping: "Remove unnecessary Linux capabilities"
    syscall_filtering: "Seccomp profiles for syscall restriction"
    filesystem: "Read-only root with minimal writable areas"
```

**Isolation des Processus :**
- **Contextes de Processus Séparés** : Chaque exécution d’outil dans un espace processus isolé
- **Communication Inter-Processus** : Mécanismes IPC sécurisés avec validation
- **Surveillance des Processus** : Analyse comportementale en temps réel et détection d’anomalies
- **Application des Ressources** : Limites strictes sur CPU, mémoire et opérations I/O

### **Mise en Œuvre du Moindre Privilège**

**Gestion des Permissions :**
```yaml
Access Control:
  file_system:
    - "Minimal required directory access"
    - "Read-only access where possible"
    - "Temporary file cleanup automation"
    
  network_access:
    - "Explicit allowlist for external connections"
    - "DNS resolution restrictions" 
    - "Port access limitations"
    - "SSL/TLS certificate validation"
  
  system_resources:
    - "No administrative privilege elevation"
    - "Limited system call access"
    - "No hardware device access"
    - "Restricted environment variable access"
```

## 7. **Contrôles de Sécurité de la Chaîne d’Approvisionnement**

**Risque OWASP MCP Adressé** : [MCP04 - Attaques sur la Chaîne d’Approvisionnement Logicielle & Altération des Dépendances](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Vérification des Dépendances**

**Sécurité Globale des Composants :**
```yaml
Software Dependencies:
  scanning: 
    - "Automated vulnerability scanning (GitHub Advanced Security)"
    - "License compliance verification"
    - "Known vulnerability database checks"
    - "Malware detection and analysis"
  
  verification:
    - "Package signature verification"
    - "Checksum validation"
    - "Provenance attestation"
    - "Software Bill of Materials (SBOM)"

AI Components:
  model_verification:
    - "Model provenance validation"
    - "Training data source verification" 
    - "Model behavior testing"
    - "Adversarial robustness assessment"
  
  service_validation:
    - "Third-party API security assessment"
    - "Service level agreement review"
    - "Data handling compliance verification"
    - "Incident response capability evaluation"
```

### **Surveillance Continue**

**Détection des Menaces de la Chaîne d’Approvisionnement :**
- **Surveillance de la Santé des Dépendances** : Évaluation continue de toutes les dépendances pour des problèmes de sécurité
- **Intégration du Renseignement sur les Menaces** : Mises à jour en temps réel sur les menaces émergentes de la chaîne d’approvisionnement
- **Analyse Comportementale** : Détection de comportements inhabituels dans les composants externes
- **Réponse Automatisée** : Contention immédiate des composants compromis

## 8. **Contrôles de Surveillance & Détection**

**Risque OWASP MCP Adressé** : [MCP08 - Manque d’Audit et de Télémétrie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Gestion des Informations de Sécurité et des Événements (SIEM)**

**Stratégie Complète de Journalisation :**
```yaml
Authentication Events:
  - "All authentication attempts (success/failure)"
  - "Token issuance and validation events"
  - "Session creation, modification, termination"
  - "Authorization decisions and policy evaluations"

Tool Execution:
  - "Tool invocation details and parameters"
  - "Execution duration and resource usage"
  - "Output generation and content analysis"
  - "Error conditions and exception handling"

Security Events:
  - "Potential prompt injection attempts"
  - "Tool poisoning detection events"
  - "Session hijacking indicators"
  - "Unusual access patterns and anomalies"
```

### **Détection des Menaces en Temps Réel**

**Analyse Comportementale :**
- **Analyse du Comportement Utilisateur (UBA)** : Détection de modèles d’accès utilisateur inhabituels
- **Analyse du Comportement des Entités (EBA)** : Surveillance du comportement du serveur MCP et des outils
- **Détection d’Anomalies par Apprentissage Automatique** : Identification assistée par IA des menaces de sécurité
- **Corrélation avec le Renseignement sur les Menaces** : Correspondance des activités observées avec des schémas d’attaque connus

## 9. **Réponse aux Incidents & Reprise**

### **Capacités de Réponse Automatisée**

**Actions de Réponse Immédiate :**
```yaml
Threat Containment:
  session_management:
    - "Immediate session termination"
    - "Account lockout procedures"
    - "Access privilege revocation"
  
  system_isolation:
    - "Network segmentation activation"
    - "Service isolation protocols"
    - "Communication channel restriction"

Recovery Procedures:
  credential_rotation:
    - "Automated token refresh"
    - "API key regeneration"
    - "Certificate renewal"
  
  system_restoration:
    - "Clean state restoration"
    - "Configuration rollback"
    - "Service restart procedures"
```

### **Capacités Forensics**

**Soutien à l’Enquête :**
- **Préservation de la Piste d’Audit** : Journalisation immuable avec intégrité cryptographique
- **Collecte de Preuves** : Rassemblement automatisé des artefacts de sécurité pertinents
- **Reconstruction de la Chronologie** : Séquence détaillée des événements conduisant aux incidents de sécurité
- **Évaluation de l’Impact** : Analyse de l’étendue de la compromission et de l’exposition des données

## **Principes Clés d’Architecture de Sécurité**

### **Défense en Profondeur**
- **Multiples Couches de Sécurité** : Pas de point unique de défaillance dans l’architecture de sécurité
- **Contrôles Redondants** : Mesures de sécurité qui se chevauchent pour les fonctions critiques
- **Mécanismes de Sécurité par Défaut** : Configurations sécurisées lorsque les systèmes rencontrent des erreurs ou attaques

### **Mise en œuvre du Zero Trust**
- **Ne Jamais Faire Confiance, Toujours Vérifier** : Validation continue de toutes les entités et requêtes
- **Principe du Moindre Privilège** : Droits d’accès minimaux pour tous les composants
- **Micro-Segmentation** : Contrôles réseau et d’accès granulaires

### **Évolution Continue de la Sécurité**
- **Adaptation au Paysage des Menaces** : Mises à jour régulières pour traiter les nouvelles menaces
- **Efficacité des Contrôles de Sécurité** : Évaluation continue et amélioration des contrôles
- **Conformité à la Spécification** : Alignement avec les normes de sécurité MCP en évolution

---

## **Ressources d’Implémentation**

### **Documentation Officielle MCP**
- [Spécification MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Bonnes Pratiques de Sécurité MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [Spécification d’Autorisation MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

### **Ressources de Sécurité OWASP MCP**
- [Guide de Sécurité Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 complet avec implémentation Azure
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - Risques de sécurité MCP officiels OWASP
- [Atelier Sommet de Sécurité MCP (Sherpa)](https://azure-samples.github.io/sherpa/) - Formation pratique en sécurité MCP sur Azure

### **Solutions de Sécurité Microsoft**
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [GitHub Advanced Security](https://github.com/security/advanced-security)
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)

### **Normes de Sécurité**
- [Bonnes Pratiques de Sécurité OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)
- [OWASP Top 10 pour Grands Modèles de Langage](https://genai.owasp.org/)
- [Cadre de Cybersécurité NIST](https://www.nist.gov/cyberframework)

---

> **Important** : Ces contrôles de sécurité reflètent la spécification MCP actuelle (2025-11-25). Vérifiez toujours avec la dernière [documentation officielle](https://spec.modelcontextprotocol.io/) car les standards évoluent rapidement.

## Étapes Suivantes

- Retourner à : [Aperçu du Module de Sécurité](./README.md)
- Continuer vers : [Module 3 : Démarrage](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->