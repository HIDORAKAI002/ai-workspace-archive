# AGENTS.md

## Vue d'ensemble du projet

**MCP pour Débutants** est un programme éducatif open-source pour apprendre le Model Context Protocol (MCP) - un cadre standardisé pour les interactions entre modèles IA et applications clientes. Ce dépôt fournit des supports d'apprentissage complets avec des exemples de code pratiques dans plusieurs langages de programmation.

### Technologies clés

- **Langages de programmation** : C#, Java, JavaScript, TypeScript, Python, Rust
- **Frameworks & SDKs** : 
  - MCP SDK (`@modelcontextprotocol/sdk`)
  - Spring Boot (Java)
  - FastMCP (Python)
  - LangChain4j (Java)
- **Bases de données** : PostgreSQL avec extension pgvector
- **Plateformes cloud** : Azure (Container Apps, OpenAI, Content Safety, Application Insights)
- **Outils de build** : npm, Maven, pip, Cargo
- **Documentation** : Markdown avec traduction automatisée multilingue (plus de 48 langues)

### Architecture

- **11 Modules principaux (00-11)** : Parcours pédagogique séquentiel des bases aux sujets avancés
- **Ateliers pratiques** : Exercices avec solutions complètes en plusieurs langages
- **Projets d’exemple** : Implémentations fonctionnelles de serveur et client MCP
- **Système de traduction** : Workflow GitHub Actions pour support multilingue automatisé
- **Ressources images** : Répertoire centralisé avec versions traduites

## Commandes d’installation

Il s’agit d’un dépôt axé sur la documentation. La plupart des installations se font dans les projets d’exemple et ateliers individuels.

### Installation du dépôt

```bash
# Cloner le dépôt
git clone https://github.com/microsoft/mcp-for-beginners.git
cd mcp-for-beginners
```

### Travailler avec les projets d’exemple

Les projets d’exemple se trouvent dans :
- `03-GettingStarted/samples/` - Exemples spécifiques par langage
- `03-GettingStarted/01-first-server/solution/` - Premières implémentations serveur
- `03-GettingStarted/02-client/solution/` - Implémentations client
- `11-MCPServerHandsOnLabs/` - Ateliers approfondis d’intégration base de données

Chaque projet d’exemple contient ses propres instructions d’installation :

#### Projets TypeScript/JavaScript
```bash
cd <project-directory>
npm install
npm start
```

#### Projets Python
```bash
cd <project-directory>
pip install -r requirements.txt
# ou
pip install -e .
python main.py
```

#### Projets Java
```bash
cd <project-directory>
mvn clean install
mvn spring-boot:run
```

## Flux de développement

### Structure de la documentation

- **Modules 00-11** : Contenu principal en ordre séquentiel
- **translations/** : Versions spécifiques aux langues (générées automatiquement, ne pas éditer)
- **translated_images/** : Versions localisées des images (générées automatiquement)
- **images/** : Images source et diagrammes

### Faire des modifications à la documentation

1. Modifier uniquement les fichiers markdown en anglais dans les dossiers modules racines (00-11)
2. Mettre à jour les images dans le répertoire `images/` si nécessaire
3. Le GitHub Action co-op-translator génère automatiquement les traductions
4. Les traductions sont régénérées à chaque push vers la branche main

### Travailler avec les traductions

- **Traduction automatisée** : Workflow GitHub Actions gère toutes les traductions
- **Ne PAS modifier manuellement** les fichiers dans le dossier `translations/`
- Les métadonnées de traduction sont intégrées à chaque fichier traduit
- Langues supportées : plus de 48 langues incluant arabe, chinois, français, allemand, hindi, japonais, coréen, portugais, russe, espagnol, et bien d’autres

## Instructions de test

### Validation de la documentation

Étant donné qu’il s’agit principalement d’un dépôt documentaire, les tests se concentrent sur :

1. **Validation des liens** : Vérifier que tous les liens internes fonctionnent
```bash
# Vérifiez les liens markdown cassés
find . -name "*.md" -type f | xargs grep -n "\[.*\](../../.*)"
```

2. **Validation des exemples de code** : Tester que les exemples compilent/s’exécutent
```bash
# Naviguer vers un échantillon spécifique et exécuter ses tests
cd 03-GettingStarted/samples/typescript
npm install && npm test
```

3. **Linting Markdown** : Vérifier la cohérence du formatage
```bash
# Utilisez markdownlint si nécessaire
npx markdownlint-cli2 "**/*.md" "#node_modules"
```

### Test des projets d’exemple

Chaque exemple spécifique à un langage inclut sa propre approche de test :

#### TypeScript/JavaScript
```bash
npm test
npm run build
```

#### Python
```bash
pytest
python -m pytest tests/
```

#### Java
```bash
mvn test
mvn verify
```

## Directives de style de code

### Style de documentation

- Utiliser un langage clair et accessible aux débutants
- Inclure des exemples de code dans plusieurs langages quand applicable
- Suivre les bonnes pratiques Markdown :
  - Utiliser des en-têtes au style ATX (`#`)
  - Utiliser des blocs de code délimités avec identificateurs de langage
  - Fournir un texte alternatif descriptif pour les images
  - Garder des longueurs de ligne raisonnables (pas de limite stricte, mais être sensé)

### Style des exemples de code

#### TypeScript/JavaScript
- Utiliser les modules ES (`import`/`export`)
- Respecter les conventions strictes TypeScript
- Inclure les annotations de types
- Cibler ES2022

#### Python
- Suivre les recommandations PEP 8
- Utiliser les annotations de type quand approprié
- Inclure des docstrings pour fonctions et classes
- Employer des fonctionnalités modernes de Python (3.8+)

#### Java
- Suivre les conventions Spring Boot
- Utiliser les fonctionnalités Java 21
- Respecter la structure Maven standard
- Ajouter des commentaires Javadoc

### Organisation des fichiers

```
<module-number>-<ModuleName>/
├── README.md              # Main module content
├── samples/               # Code examples (if applicable)
│   ├── typescript/
│   ├── python/
│   ├── java/
│   └── ...
└── solution/              # Complete working solutions
    └── <language>/
```

## Construction et déploiement

### Déploiement de la documentation

Le dépôt utilise GitHub Pages ou équivalent pour héberger la documentation (si applicable). Les modifications dans la branche main déclenchent :

1. Le workflow de traduction (`.github/workflows/co-op-translator.yml`)
2. La traduction automatisée de tous les fichiers markdown anglais
3. La localisation des images selon les besoins

### Pas de processus de build requis

Ce dépôt contient principalement de la documentation markdown. Aucune étape de compilation ou build n’est nécessaire pour le contenu du cursus principal.

### Déploiement des projets d’exemple

Les projets d’exemple individuels peuvent inclure des instructions de déploiement :
- Voir `03-GettingStarted/09-deployment/` pour guide de déploiement du serveur MCP
- Exemples de déploiement Azure Container Apps dans `11-MCPServerHandsOnLabs/`

## Directives pour contribuer

### Processus de pull request

1. **Fork et clone** : Forker le dépôt et cloner localement votre fork
2. **Créer une branche** : Utiliser des noms de branches descriptifs (ex. `fix/typo-module-3`, `add/python-example`)
3. **Faire les modifications** : Modifier uniquement les fichiers markdown en anglais (pas les traductions)
4. **Tester localement** : Vérifier le rendu correct du markdown
5. **Soumettre la PR** : Utiliser des titres et descriptions clairs pour la PR
6. **CLA** : Signer le Contrat de Licence de Contribution Microsoft lorsqu’il est demandé

### Format des titres de PR

Utiliser des titres clairs et descriptifs :
- `[Module XX] Brève description` pour changements liés à un module
- `[Samples] Description` pour modifications des exemples de code
- `[Docs] Description` pour mises à jour générales de la documentation

### Que contribuer

- Corrections de bugs dans la documentation ou exemples de code
- Nouveaux exemples de code dans d’autres langages
- Clarifications et améliorations du contenu existant
- Nouvelles études de cas ou exemples pratiques
- Rapports de problèmes pour contenu peu clair ou incorrect

### Que ne PAS faire

- Ne pas modifier directement les fichiers dans `translations/`
- Ne pas modifier le dossier `translated_images/`
- Ne pas ajouter de gros fichiers binaires sans discussion préalable
- Ne pas modifier les fichiers du workflow de traduction sans coordination

## Notes supplémentaires

### Maintien du dépôt

- **Changelog** : Tous les changements significatifs sont documentés dans `changelog.md`
- **Guide d’étude** : Utiliser `study_guide.md` pour la navigation dans le cursus
- **Templates de tickets** : Utiliser les templates GitHub pour bugs et demandes de fonctionnalités
- **Code de conduite** : Tous les contributeurs doivent respecter le Code de conduite Open Source Microsoft

### Parcours d’apprentissage

Suivre les modules dans l’ordre séquentiel (00-11) pour un apprentissage optimal :
1. **00-02** : Fondamentaux (Introduction, Concepts de base, Sécurité)
2. **03** : Mise en route avec mise en œuvre pratique
3. **04-05** : Mise en œuvre pratique et sujets avancés
4. **06-10** : Communauté, bonnes pratiques, et cas réels
5. **11** : Ateliers complets d’intégration base de données (13 ateliers séquentiels)

### Ressources de support

- **Documentation** : https://modelcontextprotocol.io/
- **Spécification** : https://spec.modelcontextprotocol.io/
- **Communauté** : https://github.com/orgs/modelcontextprotocol/discussions
- **Discord** : Serveur Microsoft Foundry Discord
- **Cours associés** : Voir README.md pour d’autres parcours Microsoft

### Résolution de problèmes courants

**Q : Ma PR échoue la vérification de traduction**  
R : Assurez-vous d’avoir modifié uniquement les fichiers markdown anglais dans les dossiers racines de module, pas les versions traduites.

**Q : Comment ajouter une nouvelle langue ?**  
R : Le support des langues est géré via le workflow co-op-translator. Ouvrez un ticket pour discuter de l’ajout.

**Q : Les exemples de code ne fonctionnent pas**  
R : Vérifiez avoir suivi les instructions d’installation du README de l’exemple spécifique. Vérifiez les versions des dépendances.

**Q : Les images ne s’affichent pas**  
R : Vérifiez que les chemins des images sont relatifs et utilisent des slashs. Les images doivent être dans `images/` ou `translated_images/` pour les versions localisées.

### Considérations sur la performance

- Le workflow de traduction peut prendre plusieurs minutes
- Les images volumineuses doivent être optimisées avant d’être ajoutées
- Garder les fichiers markdown individuels ciblés et de taille raisonnable
- Utiliser des liens relatifs pour une meilleure portabilité

### Gouvernance du projet

Ce projet suit les pratiques open source Microsoft :  
- Licence MIT pour le code et la documentation  
- Code de conduite Open Source Microsoft  
- CLA requis pour contribuions  
- Problèmes de sécurité : Suivre les directives de SECURITY.md  
- Support : Voir SUPPORT.md pour les ressources d’aide

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->