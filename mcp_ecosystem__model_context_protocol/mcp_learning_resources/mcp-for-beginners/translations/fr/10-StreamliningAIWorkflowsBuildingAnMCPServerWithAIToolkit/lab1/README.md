# 🚀 Module 1 : Fondamentaux du Microsoft Foundry Toolkit

[![Durée](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulté](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prérequis](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Objectifs d'apprentissage

À la fin de ce module, vous serez capable de :
- ✅ Installer et configurer l'extension Microsoft Foundry Toolkit pour VS Code
- ✅ Naviguer dans le Catalogue de modèles et comprendre les différentes sources de modèles
- ✅ Utiliser le Playground pour tester et expérimenter avec des modèles
- ✅ Créer des agents IA personnalisés avec Agent Builder
- ✅ Comparer la performance des modèles entre différents fournisseurs
- ✅ Appliquer les bonnes pratiques pour la conception de prompts

## 🧠 Introduction au Microsoft Foundry Toolkit

L’**extension Microsoft Foundry Toolkit pour VS Code** est l’extension phare de Microsoft qui transforme VS Code en un environnement complet de développement IA. Elle fait le lien entre la recherche IA et le développement d’applications pratiques, rendant l’IA générative accessible aux développeurs de tous niveaux.

### 🌟 Capacités clés

| Fonctionnalité | Description | Cas d’utilisation |
|---------------|-------------|-------------------|
| **🗂️ Catalogue de modèles** | Accès à plus de 100 modèles de GitHub, ONNX, OpenAI, Anthropic, Google | Découverte et sélection de modèles |
| **🔌 Support BYOM** | Intégrez vos propres modèles (locaux/à distance) | Déploiement de modèles personnalisés |
| **🎮 Playground interactif** | Test en temps réel des modèles avec interface de chat | Prototypage et tests rapides |
| **📎 Support multimodal** | Gestion de texte, images et pièces jointes | Applications IA complexes |
| **⚡ Traitement par lots** | Exécution simultanée de plusieurs prompts | Flux de test efficaces |
| **📊 Évaluation des modèles** | Métriques intégrées (F1, pertinence, similarité, cohérence) | Évaluation des performances |

### 🎯 Pourquoi Microsoft Foundry Toolkit est important

- **🚀 Développement accéléré** : De l’idée au prototype en quelques minutes
- **🔄 Flux de travail unifié** : Une seule interface pour plusieurs fournisseurs IA
- **🧪 Expérimentation facile** : Comparez les modèles sans configuration complexe
- **📈 Prêt pour la production** : Transition fluide du prototype au déploiement

## 🛠️ Prérequis & configuration

### 📦 Installer l'extension Microsoft Foundry Toolkit

**Étape 1 : Accéder au Marketplace des extensions**
1. Ouvrez Visual Studio Code
2. Rendez-vous dans la vue Extensions (`Ctrl+Shift+X` ou `Cmd+Shift+X`)
3. Recherchez "Microsoft Foundry Toolkit"

**Étape 2 : Choisir votre version**
- **🟢 Version stable** : Recommandée pour un usage en production
- **🔶 Version préliminaire** : Accès anticipé aux fonctionnalités de pointe

**Étape 3 : Installer et activer**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/fr/aitkext.d28945a03eed003c.webp)

### ✅ Checklist de vérification
- [ ] L’icône Microsoft Foundry Toolkit apparaît dans la barre latérale de VS Code
- [ ] L’extension est activée et opérationnelle
- [ ] Pas d’erreurs d’installation dans le panneau de sortie

## 🧪 Exercice pratique 1 : Exploration des modèles GitHub

**🎯 Objectif** : Maîtriser le Catalogue de modèles et tester votre premier modèle IA

### 📊 Étape 1 : Naviguer dans le Catalogue de modèles

Le Catalogue de modèles est votre porte d’entrée vers l’écosystème IA. Il agrège des modèles de plusieurs fournisseurs, facilitant leur découverte et comparaison.

**🔍 Guide de navigation :**

Cliquez sur **MODELS - Catalog** dans la barre latérale Microsoft Foundry Toolkit

![Catalogue de modèles](../../../../translated_images/fr/aimodel.263ed2be013d8fb0.webp)

**💡 Astuce** : Cherchez des modèles avec des capacités spécifiques adaptées à votre cas d’usage (par ex., génération de code, écriture créative, analyse).

**⚠️ Note** : Les modèles hébergés sur GitHub (c’est-à-dire Modèles GitHub) sont gratuits mais soumis à des limites de taux sur les requêtes et les tokens. Pour accéder à des modèles hors GitHub (modèles externes hébergés via Azure AI ou autres points de terminaison), vous devrez fournir la clé API ou l’authentification appropriée.

### 🚀 Étape 2 : Ajouter et configurer votre premier modèle

**Stratégie de sélection de modèle :**
- **GPT-4.1** : Idéal pour le raisonnement complexe et l’analyse
- **Phi-4-mini** : Léger, réponses rapides pour tâches simples

**🔧 Processus de configuration :**
1. Sélectionnez **OpenAI GPT-4.1** dans le catalogue
2. Cliquez sur **Add to My Models** - cela enregistre le modèle pour usage
3. Choisissez **Try in Playground** pour lancer l’environnement de test
4. Patientez pour l’initialisation du modèle (la première configuration peut prendre un instant)

![Configuration du Playground](../../../../translated_images/fr/playground.dd6f5141344878ca.webp)

**⚙️ Comprendre les paramètres du modèle :**
- **Temperature** : Contrôle la créativité (0 = déterministe, 1 = créatif)
- **Max Tokens** : Longueur maximale de la réponse
- **Top-p** : Échantillonnage par noyau pour diversité des réponses

### 🎯 Étape 3 : Maîtriser l’interface du Playground

Le Playground est votre laboratoire d’expérimentation IA. Voici comment en tirer le meilleur parti :

**🎨 Bonnes pratiques de conception de prompt :**
1. **Soyez précis** : Des instructions claires et détaillées donnent de meilleurs résultats
2. **Fournissez un contexte** : Incluez les informations contextuelles pertinentes
3. **Utilisez des exemples** : Montrez au modèle ce que vous voulez via des exemples
4. **Itérez** : Affinez les prompts selon les résultats initiaux

**🧪 Scénarios de test :**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Résultats des tests](../../../../translated_images/fr/result.1dfcf211fb359cf6.webp)

### 🏆 Exercice défi : Comparaison des performances des modèles

**🎯 But** : Comparez différents modèles avec des prompts identiques pour comprendre leurs forces

**📋 Instructions :**
1. Ajoutez **Phi-4-mini** à votre espace de travail
2. Utilisez le même prompt pour GPT-4.1 et Phi-4-mini

![ensemble](../../../../translated_images/fr/set.88132df189ecde2c.webp)

3. Comparez la qualité, la rapidité et la précision des réponses
4. Documentez vos observations dans la section résultats

![Comparaison de modèles](../../../../translated_images/fr/compare.97746cd0f9074955.webp)

**💡 Points clés à découvrir :**
- Quand utiliser LLM vs SLM
- Compromis coût vs performance
- Capacités spécialisées des différents modèles

## 🤖 Exercice pratique 2 : Construire des agents personnalisés avec Agent Builder

**🎯 Objectif** : Créer des agents IA spécialisés adaptés à des tâches et flux de travail spécifiques

### 🏗️ Étape 1 : Comprendre Agent Builder

Agent Builder est le point fort du Microsoft Foundry Toolkit. Il permet de créer des assistants IA conçus sur mesure combinant la puissance des grands modèles de langage avec des instructions personnalisées, des paramètres spécifiques et des connaissances spécialisées.

**🧠 Composants de l’architecture d’un agent :**
- **Modèle principal** : LLM fondamental (GPT-4, Groks, Phi, etc.)
- **Prompt système** : Définit la personnalité et le comportement de l’agent
- **Paramètres** : Réglages affinés pour une performance optimale
- **Intégration d’outils** : Connexion aux API externes et services MCP
- **Mémoire** : Contexte de la conversation et persistance de session

![Interface Agent Builder](../../../../translated_images/fr/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Étape 2 : Exploration détaillée de la configuration de l’agent

**🎨 Créer des prompts système efficaces :**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Bien sûr, vous pouvez également utiliser "Generate System Prompt" pour que l’IA vous aide à générer et optimiser les prompts*

**🔧 Optimisation des paramètres :**
| Paramètre | Plage recommandée | Cas d’utilisation |
|-----------|-------------------|-------------------|
| **Temperature** | 0.1-0.3 | Réponses techniques/factuelles |
| **Temperature** | 0.7-0.9 | Tâches créatives/de brainstorming |
| **Max Tokens** | 500-1000 | Réponses concises |
| **Max Tokens** | 2000-4000 | Explications détaillées |

### 🐍 Étape 3 : Exercice pratique - Agent de programmation Python

**🎯 Mission** : Créer un assistant spécialisé en codage Python

**📋 Étapes de configuration :**

1. **Sélection du modèle** : Choisissez **Claude 3.5 Sonnet** (excellent pour le code)

2. **Conception du prompt système** :
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Configuration des paramètres** :
   - Temperature : 0.2 (pour un code constant et fiable)
   - Max Tokens : 2000 (explications détaillées)
   - Top-p : 0.9 (créativité équilibrée)

![Configuration agent Python](../../../../translated_images/fr/pythonagent.5e51b406401c165f.webp)

### 🧪 Étape 4 : Tester votre agent Python

**Scénarios de test :**
1. **Fonction basique** : "Créez une fonction pour trouver les nombres premiers"
2. **Algorithme complexe** : "Implémentez un arbre binaire de recherche avec insertion, suppression et recherche"
3. **Problème réel** : "Construisez un scraper web qui gère la limitation de débit et les retries"
4. **Débogage** : "Corrigez ce code [collez le code bogué]"

**🏆 Critères de réussite :**
- ✅ Le code s’exécute sans erreurs
- ✅ La documentation est correcte
- ✅ Suit les bonnes pratiques Python
- ✅ Fournit des explications claires
- ✅ Propose des améliorations

## 🎓 Conclusion du Module 1 & étapes suivantes

### 📊 Vérification des connaissances

Testez votre compréhension :
- [ ] Pouvez-vous expliquer la différence entre les modèles du catalogue ?
- [ ] Avez-vous créé et testé avec succès un agent personnalisé ?
- [ ] Comprenez-vous comment optimiser les paramètres selon les cas d’usage ?
- [ ] Pouvez-vous concevoir des prompts système efficaces ?

### 📚 Ressources supplémentaires

- **Documentation Microsoft Foundry Toolkit** : [Docs officielles Microsoft](https://github.com/microsoft/vscode-ai-toolkit)
- **Guide de conception de prompts** : [Bonnes pratiques](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modèles dans Microsoft Foundry Toolkit** : [Modèles en développement](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Félicitations !** Vous avez maîtrisé les fondamentaux du Microsoft Foundry Toolkit et êtes prêt à construire des applications IA plus avancées !

### 🔜 Passez au module suivant

Prêt pour des fonctionnalités plus avancées ? Continuez vers **[Module 2 : MCP avec Microsoft Foundry Toolkit Fundamentals](../lab2/README.md)** où vous apprendrez à :
- Connecter vos agents à des outils externes via le Model Context Protocol (MCP)
- Créer des agents d’automatisation de navigateur avec Playwright
- Intégrer des serveurs MCP avec vos agents Microsoft Foundry Toolkit
- Booster vos agents avec des données et capacités externes

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->