# 🐙 Module 4 : Développement Pratique MCP - Serveur de Clone GitHub Personnalisé

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Démarrage rapide :** Construisez un serveur MCP prêt pour la production qui automatise le clonage des dépôts GitHub et l’intégration VS Code en seulement 30 minutes !

## 🎯 Objectifs d’apprentissage

À la fin de ce laboratoire, vous serez capable de :

- ✅ Créer un serveur MCP personnalisé pour des workflows de développement réels
- ✅ Implémenter la fonctionnalité de clonage de dépôts GitHub via MCP
- ✅ Intégrer des serveurs MCP personnalisés avec VS Code et Agent Builder
- ✅ Utiliser GitHub Copilot en mode Agent avec des outils MCP personnalisés
- ✅ Tester et déployer des serveurs MCP personnalisés en environnement de production

## 📋 Prérequis

- Avoir complété les laboratoires 1 à 3 (fondamentaux MCP et développement avancé)
- Abonnement à GitHub Copilot ([inscription gratuite disponible](https://github.com/github-copilot/signup))
- VS Code avec les extensions Microsoft Foundry Toolkit et GitHub Copilot installées
- Git CLI installé et configuré

## 🏗️ Présentation du projet

### **Défi de développement réel**
En tant que développeurs, nous utilisons fréquemment GitHub pour cloner des dépôts et les ouvrir dans VS Code ou VS Code Insiders. Ce processus manuel implique :
1. Ouvrir un terminal ou invite de commandes
2. Naviguer vers le répertoire désiré
3. Exécuter la commande `git clone`
4. Ouvrir VS Code dans le répertoire cloné

**Notre solution MCP rationalise tout cela en une seule commande intelligente !**

### **Ce que vous allez construire**
Un **serveur MCP de clonage GitHub** (`git_mcp_server`) qui offre :

| Fonctionnalité | Description | Avantage |
|----------------|-------------|----------|
| 🔄 **Clonage intelligent de dépôts** | Cloner les dépôts GitHub avec validation | Vérification d’erreurs automatisée |
| 📁 **Gestion intelligente des répertoires** | Vérifier et créer les répertoires en toute sécurité | Évite l’écrasement |
| 🚀 **Intégration multiplateforme VS Code** | Ouvrir les projets dans VS Code/Insiders | Transition fluide dans le workflow |
| 🛡️ **Gestion robuste des erreurs** | Gérer les problèmes réseau, permissions, et chemins | Fiabilité prête pour la production |

---

## 📖 Implémentation étape par étape

### Étape 1 : Créer un agent GitHub dans Agent Builder

1. **Lancez Agent Builder** via l’extension Microsoft Foundry Toolkit
2. **Créez un nouvel agent** avec la configuration suivante :
   ```
   Agent Name: GitHubAgent
   ```

3. **Initialisez le serveur MCP personnalisé :**
   - Allez dans **Outils** → **Ajouter un outil** → **Serveur MCP**
   - Sélectionnez **"Créer un nouveau serveur MCP"**
   - Choisissez le **modèle Python** pour une flexibilité maximale
   - **Nom du serveur :** `git_mcp_server`

### Étape 2 : Configurer GitHub Copilot en mode Agent

1. **Ouvrez GitHub Copilot** dans VS Code (Ctrl/Cmd + Maj + P → "GitHub Copilot : Ouvrir")
2. **Sélectionnez le modèle Agent** dans l’interface Copilot
3. **Choisissez le modèle Claude 3.7** pour des capacités de raisonnement avancées
4. **Activez l’intégration MCP** pour accéder aux outils

> **💡 Astuce de pro :** Claude 3.7 offre une compréhension supérieure des workflows de développement et des modèles de gestion d’erreurs.

### Étape 3 : Implémenter les fonctionnalités principales du serveur MCP

**Utilisez la consigne détaillée suivante avec GitHub Copilot en mode Agent :**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Étape 4 : Tester votre serveur MCP

#### 4a. Tester dans Agent Builder

1. **Lancez la configuration de débogage** dans Agent Builder
2. **Configurez votre agent avec cette consigne système :**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Testez avec des scénarios utilisateurs réalistes :**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/fr/DebugAgent.81d152370c503241.webp)

**Résultats attendus :**
- ✅ Clonage réussi avec confirmation du chemin
- ✅ Lancement automatique de VS Code
- ✅ Messages d’erreur clairs pour les scénarios invalides
- ✅ Gestion correcte des cas limites

#### 4b. Tester dans MCP Inspector


![MCP Inspector Testing](../../../../translated_images/fr/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Félicitations !** Vous avez créé avec succès un serveur MCP pratique et prêt pour la production qui résout de réels problèmes de workflow de développement. Votre serveur de clonage GitHub personnalisé démontre la puissance de MCP pour automatiser et améliorer la productivité des développeurs.

### 🏆 Succès débloqué :
- ✅ **Développeur MCP** - Création d’un serveur MCP personnalisé
- ✅ **Automatisation des workflows** - Simplification des processus de développement  
- ✅ **Expert en intégration** - Connexion de multiples outils de développement
- ✅ **Prêt pour la production** - Solutions prêtes au déploiement

---

## 🎓 Fin du workshop : Votre parcours avec le Model Context Protocol

**Cher participant au workshop,**

Félicitations pour avoir complété les quatre modules du workshop Model Context Protocol ! Vous avez parcouru un long chemin, depuis la compréhension des concepts fondamentaux de Microsoft Foundry Toolkit jusqu’à la création de serveurs MCP prêts pour la production qui répondent à des défis réels de développement.

### 🚀 Récapitulatif de votre parcours d’apprentissage :

**[Module 1](../lab1/README.md)** : Vous avez débuté par l’exploration des fondamentaux de Microsoft Foundry Toolkit, les tests de modèles, et la création de votre premier agent IA.

**[Module 2](../lab2/README.md)** : Vous avez appris l’architecture MCP, intégré Playwright MCP, et construit votre premier agent d’automatisation de navigateur.

**[Module 3](../lab3/README.md)** : Vous êtes passé au développement de serveurs MCP personnalisés avec le serveur météo MCP et maîtrisé les outils de débogage.

**[Module 4](../lab4/README.md)** : Vous avez maintenant appliqué tout cela pour créer un outil d’automatisation pratique du workflow de dépôt GitHub.

### 🌟 Ce que vous avez maîtrisé :

- ✅ **Écosystème Microsoft Foundry Toolkit** : Modèles, agents, et modèles d’intégration
- ✅ **Architecture MCP** : Architecture client-serveur, protocoles de transport, et sécurité
- ✅ **Outils développeurs** : De Playground à Inspector jusqu’au déploiement en production
- ✅ **Développement personnalisé** : Construction, test, et déploiement de vos propres serveurs MCP
- ✅ **Applications pratiques** : Résolution de défis réels de workflow avec l’IA

### 🔮 Vos prochaines étapes :

1. **Construisez votre propre serveur MCP :** Appliquez ces compétences pour automatiser vos workflows uniques
2. **Rejoignez la communauté MCP :** Partagez vos créations et apprenez des autres
3. **Explorez l’intégration avancée :** Connectez les serveurs MCP aux systèmes d’entreprise
4. **Contribuez à l’open source :** Aidez à améliorer les outils et la documentation MCP

Rappelez-vous, ce workshop n’est que le début. L’écosystème Model Context Protocol évolue rapidement, et vous êtes maintenant équipé pour être à la pointe des outils de développement propulsés par l’IA.

**Merci pour votre participation et votre engagement à apprendre !**

Nous espérons que ce workshop a suscité des idées qui transformeront votre façon de construire et d’interagir avec les outils IA dans votre parcours de développement.

**Bon codage !**

---

## Quelle est la suite

Félicitations pour avoir terminé tous les laboratoires du Module 10 !

- Retour à : [Aperçu du Module 10](../README.md)
- Continuer vers : [Module 11 : Laboratoires pratiques MCP Server](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->