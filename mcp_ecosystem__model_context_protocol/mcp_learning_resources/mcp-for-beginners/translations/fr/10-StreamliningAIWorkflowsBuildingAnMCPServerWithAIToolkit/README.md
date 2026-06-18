# Rationalisation des flux de travail en IA : création d'un serveur MCP avec Microsoft Foundry Toolkit

[![MCP Spec](https://img.shields.io/badge/MCP%20Spec-2025--11--25-blue.svg)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
[![Python](https://img.shields.io/badge/Python-3.10+-green.svg)](https://python.org)
[![VS Code](https://img.shields.io/badge/VS%20Code-Latest-orange.svg)](https://code.visualstudio.com/)

![logo](../../../translated_images/fr/logo.ec93918ec338dadd.webp)

## 🎯  Aperçu

[![Build AI Agents in VS Code: 4 Hands-On Labs with MCP and Microsoft Foundry Toolkit](../../../translated_images/fr/11.0f6db6a0fb606885.webp)](https://youtu.be/r34Csn3rkeQ)

_(Cliquez sur l'image ci-dessus pour visionner la vidéo de cette leçon)_

Bienvenue au **Workshop Model Context Protocol (MCP)** ! Cet atelier pratique complet combine deux technologies de pointe pour révolutionner le développement d’applications d’IA :

- **🔗 Model Context Protocol (MCP)** : un standard ouvert pour une intégration fluide des outils d’IA
- **🛠️ Extension Microsoft Foundry Toolkit pour VS Code** : l’extension puissante de Microsoft pour le développement IA

### 🎓 Ce que vous apprendrez

À la fin de cet atelier, vous maîtriserez l’art de construire des applications intelligentes qui relient les modèles d’IA aux outils et services réels. Des tests automatisés aux intégrations personnalisées d’API, vous acquerrez des compétences pratiques pour résoudre des défis commerciaux complexes.

## 🏗️ Pile technologique

### 🔌 Model Context Protocol (MCP)

MCP est le **« USB-C pour l’IA »** — une norme universelle qui connecte les modèles d’IA aux outils et sources de données externes.

**✨ Fonctionnalités clés :**

- 🔄 **Intégration standardisée** : interface universelle pour les connexions outils-IA
- 🏛️ **Architecture flexible** : serveurs locaux et distants via transport stdio/SSE
- 🧰 **Écosystème riche** : outils, prompts et ressources unifiés dans un seul protocole
- 🔒 **Prêt pour l’entreprise** : sécurité et fiabilité intégrées

**🎯 Pourquoi MCP est important :**  
Tout comme l’USB-C a éliminé le chaos des câbles, MCP élimine la complexité des intégrations IA. Un protocole, des possibilités infinies.

### 🤖 Extension Microsoft Foundry Toolkit pour VS Code

L’extension phare de Microsoft pour le développement IA qui transforme VS Code en une centrale IA.

**🚀 Capacités principales :**

- 📦 **Catalogue de modèles** : accès aux modèles Azure AI, GitHub, Hugging Face, Ollama
- ⚡ **Inférence locale** : exécution CPU/GPU/NPU optimisée ONNX
- 🏗️ **Agent Builder** : développement visuel d’agents IA avec intégration MCP
- 🎭 **Multi-modal** : prise en charge texte, vision, et sortie structurée

**💡 Avantages pour le développement :**

- Déploiement de modèles sans configuration
- Ingénierie de prompts visuelle
- Terrain de test en temps réel
- Intégration transparente du serveur MCP

## 📚 Parcours d’apprentissage

### [🚀 Module 1 : Fondamentaux Microsoft Foundry Toolkit](./lab1/README.md)

**Durée** : 15 minutes

- 🛠️ Installation et configuration de Microsoft Foundry Toolkit pour VS Code
- 🗂️ Exploration du Catalogue de modèles (plus de 100 modèles GitHub, ONNX, OpenAI, Anthropic, Google)
- 🎮 Maîtrise du Playground interactif pour tests de modèles en temps réel
- 🤖 Création de votre premier agent IA avec Agent Builder
- 📊 Évaluation des performances des modèles avec métriques intégrées (F1, pertinence, similarité, cohérence)
- ⚡ Découverte du traitement par lots et prise en charge multi-modale

**🎯 Objectif d’apprentissage** : créer un agent IA fonctionnel avec compréhension approfondie des capacités de Microsoft Foundry Toolkit

### [🌐 Module 2 : MCP avec Microsoft Foundry Toolkit Fondamentaux](./lab2/README.md)

**Durée** : 20 minutes

- 🧠 Maîtrise de l’architecture et des concepts du Model Context Protocol (MCP)
- 🌐 Exploration de l’écosystème des serveurs MCP Microsoft
- 🤖 Création d’un agent d’automatisation navigateur avec serveur MCP Playwright
- 🔧 Intégration des serveurs MCP avec Agent Builder de Microsoft Foundry Toolkit
- 📊 Configuration et tests des outils MCP dans vos agents
- 🚀 Exportation et déploiement d’agents propulsés par MCP en production

**🎯 Objectif d’apprentissage** : déployer un agent IA dopé aux outils externes via MCP

### [🔧 Module 3 : Développement MCP avancé avec Microsoft Foundry Toolkit](./lab3/README.md)

**Durée** : 20 minutes

- 💻 Création de serveurs MCP personnalisés avec Microsoft Foundry Toolkit
- 🐍 Configuration et utilisation du dernier SDK Python MCP (v1.9.3)
- 🔍 Mise en place et utilisation de MCP Inspector pour le débogage
- 🛠️ Construction d’un serveur Weather MCP avec workflows professionnels de débogage
- 🧪 Débogage des serveurs MCP dans Agent Builder et environnement Inspector

**🎯 Objectif d’apprentissage** : développer et déboguer des serveurs MCP personnalisés avec des outils modernes

### [🐙 Module 4 : Développement pratique MCP - Serveur de clonage GitHub personnalisé](./lab4/README.md)

**Durée** : 30 minutes

- 🏗️ Création d’un serveur GitHub Clone MCP réel pour les workflows de développement
- 🔄 Implémentation d’un clonage intelligent de dépôt avec validation et gestion des erreurs
- 📁 Gestion intelligente des répertoires et intégration VS Code
- 🤖 Utilisation du mode Agent GitHub Copilot avec outils MCP personnalisés
- 🛡️ Mise en œuvre de fiabilité prête pour la production et compatibilité multiplateforme

**🎯 Objectif d’apprentissage** : déployer un serveur MCP prêt pour la production qui rationalise les workflows de développement réels

## 💡 Applications concrètes et impact

### 🏢 Cas d’usage en entreprise

#### 🔄 Automatisation DevOps

Transformez votre workflow de développement grâce à l’automatisation intelligente :

- **Gestion intelligente des dépôts** : revue de code et décisions de fusion pilotées par IA
- **CI/CD intelligente** : optimisation automatisée des pipelines selon les modifications de code
- **Triage des tickets** : classification et affectation automatique des bugs

#### 🧪 Révolution Assurance Qualité

Élevez les tests grâce à l’automatisation IA :

- **Génération intelligente de tests** : création automatique de suites de tests complètes
- **Tests de régression visuels** : détection des changements UI par IA
- **Surveillance des performances** : identification proactive et résolution des problèmes

#### 📊 Intelligence des pipelines de données

Construisez des workflows de traitement de données plus intelligents :

- **Processus ETL adaptatifs** : transformations de données auto-optimisées
- **Détection d’anomalies** : contrôle qualité des données en temps réel
- **Routage intelligent** : gestion intelligente du flux des données

#### 🎧 Amélioration de l’expérience client

Créez des interactions clients exceptionnelles :

- **Support contextuel** : agents IA avec accès à l’historique client
- **Résolution proactive des problèmes** : service client prédictif
- **Intégration multicanale** : expérience IA unifiée sur toutes les plateformes

## 🛠️ Prérequis & installation

### 💻 Configuration système

| Composant           | Exigence              | Notes                                     |
|---------------------|-----------------------|-------------------------------------------|
| **Système d’exploitation** | Windows 10+, macOS 10.15+, Linux | Tout OS moderne                          |
| **Visual Studio Code** | Dernière version stable | Requis pour Microsoft Foundry Toolkit    |
| **Node.js**          | v18.0+ et npm         | Pour développement serveur MCP            |
| **Python**           | 3.10+                 | Optionnel pour serveurs MCP Python        |
| **Mémoire**          | 8 Go RAM minimum      | 16 Go recommandés pour modèles locaux     |

### 🔧 Environnement de développement

#### Extensions VS Code recommandées

- **Microsoft Foundry Toolkit** (ms-windows-ai-studio.windows-ai-studio)
- **Python** (ms-python.python)
- **Python Debugger** (ms-python.debugpy)
- **GitHub Copilot** (GitHub.copilot) - optionnel mais utile

#### Outils optionnels

- **uv** : gestionnaire de paquets Python moderne
- **MCP Inspector** : outil visuel de débogage pour serveurs MCP
- **Playwright** : pour exemples d’automatisation web

## 🎖️ Résultats d’apprentissage & parcours de certification

### 🏆 Liste de maîtrise des compétences

En terminant cet atelier, vous atteindrez la maîtrise de :

#### 🎯 Compétences clés

- [ ] **Maîtrise du protocole MCP** : compréhension approfondie de l’architecture et des modèles d’implémentation
- [ ] **Maîtrise de Microsoft Foundry Toolkit** : usage expert de Microsoft Foundry Toolkit pour développement rapide
- [ ] **Développement de serveurs personnalisés** : création, déploiement et maintenance de serveurs MCP en production
- [ ] **Excellence de l’intégration d’outils** : connexion fluide de l’IA aux workflows de développement existants
- [ ] **Application en résolution de problèmes** : appliquer les compétences acquises à des défis business réels

#### 🔧 Compétences techniques

- [ ] Installation et configuration de Microsoft Foundry Toolkit dans VS Code
- [ ] Conception et implémentation de serveurs MCP personnalisés
- [ ] Intégration des modèles GitHub à l’architecture MCP
- [ ] Construction de workflows de test automatisés avec Playwright
- [ ] Déploiement d’agents IA en production
- [ ] Débogage et optimisation des performances des serveurs MCP

#### 🚀 Capacités avancées

- [ ] Architecturer des intégrations IA à l’échelle entreprise
- [ ] Mettre en œuvre les meilleures pratiques de sécurité pour les applications IA
- [ ] Concevoir des architectures de serveurs MCP évolutives
- [ ] Créer des chaînes d’outils personnalisées pour des domaines spécifiques
- [ ] Encadrer d’autres développeurs en développement natif IA

## 📖 Ressources supplémentaires

- [Spécification MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Dépôt GitHub Microsoft Foundry Toolkit](https://github.com/microsoft/vscode-ai-toolkit)
- [Collection d’exemples de serveurs MCP](https://github.com/modelcontextprotocol/servers)
- [Guide des meilleures pratiques](https://modelcontextprotocol.io/docs/best-practices)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - meilleures pratiques de sécurité

---

**🚀 Prêt à révolutionner votre workflow de développement IA ?**

Construisons ensemble le futur des applications intelligentes avec MCP et Microsoft Foundry Toolkit !

## Et après ?

Continuez avec : [Module 11 : Laboratoires pratiques de serveur MCP](../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->