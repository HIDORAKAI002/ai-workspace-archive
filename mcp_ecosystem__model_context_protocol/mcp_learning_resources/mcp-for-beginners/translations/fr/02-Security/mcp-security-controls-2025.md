# Contrôles de sécurité MCP - Mise à jour de février 2026

> **Norme actuelle** : Ce document reflète les exigences de sécurité de la [spécification MCP 2025-11-25](https://spec.modelcontextprotocol.io/specification/2025-11-25/) et les [meilleures pratiques de sécurité MCP officielles](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices).

Le Model Context Protocol (MCP) a considérablement mûri avec des contrôles de sécurité améliorés couvrant à la fois la sécurité logicielle traditionnelle et les menaces spécifiques à l'IA. Ce document fournit des contrôles de sécurité complets pour des implémentations sécurisées de MCP alignées sur le cadre OWASP MCP Top 10.

## 🏔️ Formation pratique en sécurité

Pour une expérience pratique de mise en œuvre de la sécurité, nous recommandons l’**[atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/)** – une expédition guidée complète pour sécuriser les serveurs MCP dans Azure en utilisant une méthodologie « vulnérable → exploitation → correction → validation ».

Tous les contrôles de sécurité de ce document sont alignés avec le **[Guide de sécurité MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/)**, qui fournit des architectures de référence et des conseils d’implémentation spécifiques à Azure pour les risques OWASP MCP Top 10.

## **Exigences de sécurité OBLIGATOIRES**

### **Interdictions critiques issues de la spécification MCP :**

> **INTERDIT** : Les serveurs MCP **NE DOIVENT PAS** accepter des jetons non explicitement émis pour le serveur MCP  
>
> **PROHIBÉ** : Les serveurs MCP **NE DOIVENT PAS** utiliser des sessions pour l’authentification  
>
> **REQUIS** : Les serveurs MCP implémentant l’autorisation **DOIVENT** vérifier TOUTES les requêtes entrantes  
>
> **OBLIGATOIRE** : Les serveurs proxy MCP utilisant des IDs clients statiques **DOIVENT** obtenir le consentement utilisateur pour chaque client enregistré dynamiquement

---

## 1. **Contrôles d’authentification et d’autorisation**

### **Intégration de fournisseurs d’identité externes**

La **norme MCP actuelle (2025-11-25)** permet aux serveurs MCP de déléguer l’authentification à des fournisseurs d’identité externes, ce qui représente une amélioration majeure en matière de sécurité :

**Risque OWASP MCP adressé** : [MCP07 - Authentification et autorisation insuffisantes](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp07-authz/)

**Avantages de sécurité :**  
1. **Élimination des risques liés à l’authentification personnalisée** : Réduit la surface de vulnérabilité en évitant les implémentations personnalisées  
2. **Sécurité de niveau entreprise** : S’appuie sur des fournisseurs d’identité établis comme Microsoft Entra ID et ses fonctionnalités avancées  
3. **Gestion centralisée des identités** : Simplifie la gestion du cycle de vie utilisateur, le contrôle d’accès et les audits de conformité  
4. **Authentification multi-facteurs (MFA)** : Hérite des capacités MFA des fournisseurs d’identité d’entreprise  
5. **Politiques d’accès conditionnel** : Bénéficie de contrôles d’accès basés sur les risques et d’authentification adaptative  

**Exigences d’implémentation :**  
- **Validation de l’audience du jeton** : Vérifier que tous les jetons sont explicitement émis pour le serveur MCP  
- **Vérification de l’émetteur** : Valider que l’émetteur du jeton correspond au fournisseur d’identité attendu  
- **Vérification de la signature** : Validation cryptographique de l’intégrité du jeton  
- **Application stricte de l’expiration** : Application rigoureuse des limites de durée de vie du jeton  
- **Validation des scopes** : S’assurer que les jetons contiennent les autorisations appropriées pour les opérations demandées  

### **Sécurité de la logique d’autorisation**

**Contrôles critiques :**  
- **Audits complets d’autorisation** : Revues de sécurité régulières de tous les points de décision d’autorisation  
- **Valeurs par défaut sécurisées** : Refuser l’accès lorsque la logique d’autorisation ne peut pas prendre de décision définitive  
- **Limites d’autorisation** : Séparation claire entre les différents niveaux de privilèges et les accès aux ressources  
- **Journalisation des audits** : Journalisation complète de toutes les décisions d’autorisation pour la surveillance de sécurité  
- **Revue périodique des accès** : Validation régulière des droits utilisateurs et des attributions de privilèges  

## 2. **Sécurité des jetons et contrôles anti-passthrough**

**Risque OWASP MCP adressé** : [MCP01 - Mauvaise gestion des jetons et exposition des secrets](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp01-token-mismanagement/)

### **Prévention du passthrough de jetons**

Le **passthrough de jetons est explicitement interdit** par la spécification d’autorisation MCP en raison des risques critiques pour la sécurité :

**Risques de sécurité adressés :**  
- **Contournement des contrôles** : Contourne les contrôles essentiels comme la limitation du débit, la validation des requêtes et la surveillance du trafic  
- **Rupture de la traçabilité** : Rend impossible l’identification des clients, corrompt les pistes d’audit et les enquêtes sur incidents  
- **Exfiltration via proxy** : Permet aux acteurs malveillants d’utiliser les serveurs comme des proxys pour un accès non autorisé aux données  
- **Violation des frontières de confiance** : Brise les hypothèses de confiance des services aval concernant l’origine des jetons  
- **Mouvements latéraux** : Les jetons compromis utilisés à travers plusieurs services permettent une expansion étendue des attaques  

**Contrôles d’implémentation :**  
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

### **Modèles de gestion sécurisée des jetons**

**Meilleures pratiques :**  
- **Jetons à courte durée de vie** : Minimiser la fenêtre d’exposition par une rotation fréquente des jetons  
- **Émission juste-à-temps** : Émettre les jetons uniquement lorsque nécessaire pour des opérations spécifiques  
- **Stockage sécurisé** : Utiliser des modules matériels de sécurité (HSM) ou des coffres-forts de clés sécurisés  
- **Liaison des jetons** : Associer les jetons aux clients, sessions ou opérations spécifiques lorsque possible  
- **Surveillance et alertes** : Détection en temps réel des usages abusifs ou des accès non autorisés aux jetons  

## 3. **Contrôles de sécurité des sessions**

### **Prévention du détournement de session**

**Vecteurs d’attaque adressés :**  
- **Injection de prompt dans le détournement de session** : Événements malveillants injectés dans l’état partagé de session  
- **Usurpation de session** : Utilisation non autorisée d’identifiants de session volés pour contourner l’authentification  
- **Attaques sur flux résumables** : Exploitation de la reprise d’événements serveur pour injection de contenu malveillant  

**Contrôles de session obligatoires :**  
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

**Sécurité des transports :**  
- **Application obligatoire de HTTPS** : Toutes les communications de session doivent utiliser TLS 1.3  
- **Attributs sécurisés des cookies** : HttpOnly, Secure, SameSite=Strict  
- **Pinning de certificat** : Pour les connexions critiques afin de prévenir les attaques MITM  

### **Considérations états sans état vs avec état**

**Pour les implémentations avec état :**  
- L’état de session partagé nécessite une protection accrue contre les injections  
- La gestion des sessions basée sur les files d’attente nécessite une vérification de l’intégrité  
- Plusieurs instances serveur requièrent une synchronisation sécurisée de l’état des sessions  

**Pour les implémentations sans état :**  
- Gestion des sessions basée sur JWT ou jetons similaires  
- Vérification cryptographique de l’intégrité de l’état de session  
- Surface d’attaque réduite mais nécessite une validation robuste des jetons  

## 4. **Contrôles de sécurité spécifiques à l’IA**

**Risques OWASP MCP abordés :**  
- [MCP06 - Injection de prompt via charges contextuelles](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)  
- [MCP03 - Empoisonnement d’outils](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp03-tool-poisoning/)  
- [MCP05 - Injection et exécution de commandes](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp05-command-injection/)  

### **Défense contre l’injection de prompt**

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

**Contrôles d’implémentation :**  
- **Assainissement des entrées** : Validation complète et filtrage de toutes les entrées utilisateurs  
- **Définition de la frontière des contenus** : Séparation claire entre instructions système et contenu utilisateur  
- **Hiérarchie des instructions** : Règles de priorité appropriées pour les instructions conflictuelles  
- **Surveillance des sorties** : Détection des sorties potentiellement nuisibles ou manipulées  

### **Prévention de l’empoisonnement des outils**

**Cadre de sécurité des outils :**  
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

**Gestion dynamique des outils :**  
- **Flux de validation** : Consentement utilisateur explicite pour les modifications des outils  
- **Capacités de retour arrière** : Possibilité de revenir aux versions précédentes des outils  
- **Audit des modifications** : Historique complet des modifications des définitions d’outils  
- **Évaluation des risques** : Évaluation automatisée de la posture de sécurité des outils  

## 5. **Prévention des attaques du substitut confus (Confused Deputy)**

### **Sécurité du proxy OAuth**

**Contrôles pour prévention des attaques :**  
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

**Exigences d’implémentation :**  
- **Vérification du consentement utilisateur** : Ne jamais sauter les écrans de consentement pour l’enregistrement dynamique des clients  
- **Validation de l’URI de redirection** : Validation stricte basée sur liste blanche des destinations de redirection  
- **Protection des codes d’autorisation** : Codes à courte durée de vie avec usage unique obligatoire  
- **Validation de l’identité client** : Validation robuste des identifiants et métadonnées client  

## 6. **Sécurité d’exécution des outils**

### **Bac à sable et isolation**

**Isolation basée sur conteneurs :**  
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

**Isolation des processus :**  
- **Contextes de processus séparés** : Chaque exécution d’outil dans un espace de processus isolé  
- **Communication inter-processus** : Mécanismes IPC sécurisés avec validation  
- **Surveillance des processus** : Analyse comportementale en temps réel et détection d’anomalies  
- **Limitation des ressources** : Plafonds stricts sur CPU, mémoire et opérations I/O  

### **Mise en œuvre du principe du moindre privilège**

**Gestion des permissions :**  
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

## 7. **Contrôles de sécurité de la chaîne d’approvisionnement**

**Risque OWASP MCP adressé** : [MCP04 - Attaques sur la chaîne d’approvisionnement](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp04-supply-chain/)

### **Vérification des dépendances**

**Sécurité complète des composants :**  
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

### **Surveillance continue**

**Détection des menaces sur la chaîne d’approvisionnement :**  
- **Surveillance de la santé des dépendances** : Évaluation continue de toutes les dépendances pour des problèmes de sécurité  
- **Intégration du renseignement sur les menaces** : Mises à jour en temps réel sur les menaces émergentes  
- **Analyse comportementale** : Détection de comportements inhabituels dans les composants externes  
- **Réponse automatisée** : Contention immédiate des composants compromis  

## 8. **Contrôles de surveillance et de détection**

**Risque OWASP MCP adressé** : [MCP08 - Manque d’audit et de télémétrie](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp08-telemetry/)

### **Gestion des informations et des événements de sécurité (SIEM)**

**Stratégie complète de journalisation :**  
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

### **Détection des menaces en temps réel**

**Analyses comportementales :**  
- **Analyse du comportement utilisateur (UBA)** : Détection de modèles d’accès utilisateur inhabituels  
- **Analyse du comportement des entités (EBA)** : Surveillance du comportement des serveurs MCP et des outils  
- **Détection d’anomalies par apprentissage automatique** : Identification assistée par IA des menaces de sécurité  
- **Corrélation avec le renseignement sur les menaces** : Correspondance des activités observées avec des schémas d’attaque connus  

## 9. **Réponse aux incidents et reprise**

### **Capacités de réponse automatisée**

**Actions de réponse immédiate :**  
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

### **Capacités judiciaires**

**Soutien à l’investigation :**  
- **Préservation de la piste d’audit** : Journalisation immuable avec intégrité cryptographique  
- **Collecte des preuves** : Rassemblement automatisé des artefacts de sécurité pertinents  
- **Reconstruction temporelle** : Séquence détaillée des événements menant aux incidents de sécurité  
- **Évaluation de l’impact** : Évaluation de la portée du compromis et de l’exposition des données  

## **Principes clés de l’architecture de sécurité**

### **Défense en profondeur**  
- **Multiples couches de sécurité** : Aucun point de défaillance unique dans l’architecture de sécurité  
- **Contrôles redondants** : Mesures de sécurité chevauchantes pour les fonctions critiques  
- **Mécanismes de sécurité par défaut** : Paramètres sécurisés lorsque les systèmes rencontrent des erreurs ou attaques  

### **Mise en œuvre du Zero Trust**  
- **Ne jamais faire confiance, toujours vérifier** : Validation continue de toutes les entités et requêtes  
- **Principe du moindre privilège** : Droits d’accès minimaux pour tous les composants  
- **Micro-segmentation** : Contrôles granulaires du réseau et des accès  

### **Évolution continue de la sécurité**  
- **Adaptation au paysage des menaces** : Mises à jour régulières face aux menaces émergentes  
- **Efficacité des contrôles de sécurité** : Évaluation et amélioration constantes des contrôles  
- **Conformité aux spécifications** : Alignement avec les normes MCP de sécurité en évolution  

---

## **Ressources d’implémentation**

### **Documentation officielle MCP**  
- [Spécification MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)  
- [Meilleures pratiques de sécurité MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)  
- [Spécification d’autorisation MCP](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)  

### **Ressources de sécurité OWASP MCP**  
- [Guide de sécurité MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) – OWASP MCP Top 10 complet avec implémentation Azure  
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) – Risques officiels de sécurité MCP OWASP  
- [Atelier MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) – Formation pratique en sécurité pour MCP sur Azure  

### **Solutions de sécurité Microsoft**  
- [Microsoft Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [GitHub Advanced Security](https://github.com/security/advanced-security)  
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/)  

### **Normes de sécurité**  
- [Meilleures pratiques de sécurité OAuth 2.0 (RFC 9700)](https://datatracker.ietf.org/doc/html/rfc9700)  
- [OWASP Top 10 pour les modèles de langage étendus](https://genai.owasp.org/)  
- [Cadre de cybersécurité NIST](https://www.nist.gov/cyberframework)  

---

> **Important** : Ces contrôles de sécurité reflètent la spécification MCP actuelle (2025-11-25). Vérifiez toujours avec la [documentation officielle la plus récente](https://spec.modelcontextprotocol.io/) car les normes évoluent rapidement.

## Étapes suivantes

- Retour à : [Vue d’ensemble du module sécurité](./README.md)
- Continuer vers : [Module 3 : Prise en main](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforcions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des imprécisions. Le document original dans sa langue d'origine doit être considéré comme la source faisant autorité. Pour les informations critiques, une traduction professionnelle réalisée par un humain est recommandée. Nous déclinons toute responsabilité en cas de malentendus ou d’interprétations erronées résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->