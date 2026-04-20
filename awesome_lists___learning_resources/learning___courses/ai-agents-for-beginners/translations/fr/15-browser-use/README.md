# Construire des agents d’utilisation informatique (CUA)

Les agents d’utilisation informatique peuvent interagir avec les sites web de la même manière qu’une personne : en ouvrant un navigateur, en inspectant la page, et en prenant la meilleure action possible à partir de ce qu’ils voient. Dans cette leçon, vous allez construire un agent d’automatisation de navigateur qui recherche Airbnb, extrait des données structurées des annonces, et identifie le séjour le moins cher à Stockholm.

La leçon combine Browser-Use pour la navigation pilotée par IA, Playwright et le protocole Chrome DevTools (CDP) pour le contrôle du navigateur, Azure OpenAI pour un raisonnement avec vision, et Pydantic pour l’extraction structurée.

## Introduction

Cette leçon couvrira :

- Comprendre quand les agents d’utilisation informatique sont plus adaptés que l’automatisation uniquement par API
- Combiner Browser-Use avec Playwright et CDP pour une gestion fiable du cycle de vie du navigateur
- Utiliser Azure OpenAI vision et la sortie structurée Pydantic pour extraire des données d’annonces depuis des pages web dynamiques
- Décider quand utiliser un workflow d’automatisation de navigateur agent-first, actor-first, ou hybride

## Objectifs d’apprentissage

Après avoir terminé cette leçon, vous saurez :

- Configurer Browser-Use avec Azure OpenAI et Playwright
- Construire un workflow d’automatisation de navigateur qui navigue sur un site réel et gère des éléments d’interface utilisateur dynamiques
- Extraire des résultats typés depuis le contenu visible de la page et les transformer en logique métier en aval
- Choisir entre les modèles agent et acteur en fonction de la prévisibilité de la tâche navigateur

## Exemple de code

Cette leçon comprend un tutoriel en notebook :

- [15-browser-user.ipynb](./15-browser-user.ipynb) : Lance une session Chrome via CDP, recherche des annonces Airbnb à Stockholm, extrait les prix avec Browser-Use vision, et retourne l’option la moins chère sous forme de données structurées.

## Prérequis

- Python 3.12+
- Déploiement Azure OpenAI configuré dans votre environnement
- Chrome ou Chromium installé localement
- Dépendances Playwright installées
- Connaissances basiques en Python asynchrone

## Installation

Installez les paquets utilisés dans le notebook :

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Configurez les variables d’environnement Azure OpenAI utilisées par le notebook :

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Optionnel : utilise par défaut la dernière version de l'API lorsqu'aucune version n'est spécifiée
AZURE_OPENAI_API_VERSION=...
```

## Aperçu de l’architecture

Le notebook démontre un workflow hybride d’automatisation de navigateur :

1. Chrome démarre avec CDP activé pour que Playwright et Browser-Use partagent la même session navigateur.
2. Un agent Browser-Use gère des tâches de navigation ouvertes comme ouvrir Airbnb, fermer les pop-ups, et rechercher Stockholm.
3. La page active est inspectée à l’aide d’un schéma structuré Pydantic pour extraire les titres des annonces, prix par nuit, évaluations, et URLs.
4. La logique Python compare les annonces extraites et met en avant le résultat le moins cher.

Cette approche conserve le raisonnement flexible basé sur la vision dans lequel Browser-Use excelle tout en vous donnant un contrôle déterministe du navigateur quand vous en avez besoin.

## Points clés et bonnes pratiques

### Quand utiliser Agent vs Acteur

| Scénario | Utiliser Agent | Utiliser Acteur |
|----------|----------------|-----------------|
| Layouts dynamiques | Oui, l’IA peut s’adapter aux changements de page | Non, les sélecteurs fragiles peuvent casser |
| Structure connue | Non, un agent est plus lent que le contrôle direct | Oui, rapide et précis |
| Trouver des éléments | Oui, le langage naturel fonctionne bien | Non, des sélecteurs exacts sont requis |
| Contrôle du timing | Non, moins prévisible | Oui, contrôle total des attentes et des tentatives |
| Workflows complexes | Oui, gère les états d’UI inattendus | Non, nécessite un branchement explicite |

### Bonnes pratiques Browser-Use

1. Commencez avec un agent pour l’exploration et la navigation dynamique.
2. Passez au contrôle direct de la page quand l’interaction devient prévisible.
3. Utilisez des modèles de sortie structurés pour que les données extraites soient validées et typées.
4. Ajoutez des délais stratégiques après les actions déclenchant des changements visibles d’UI.
5. Prenez des captures d’écran pendant l’itération pour faciliter le débogage en cas d’échec.
6. Prévoyez que les sites web changent et concevez des stratégies de repli pour les pop-ups et décalages de mise en page.
7. Mélangez les modèles agent et acteur pour obtenir flexibilité et précision.

### Applications réelles

- Réservation de voyages et suivi des prix
- Comparaison de prix e-commerce et vérifications de disponibilité
- Extraction structurée de sites web dynamiques
- Tests et vérifications UI assistés par vision
- Surveillance de site web et alertes
- Remplissage intelligent de formulaires sur des flux multi-étapes

## Ressources supplémentaires

- [Modèle d’intégration Browser-Use Playwright](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Paramètres acteur et extraction de contenu Browser-Use](https://docs.browser-use.com/customize/actor/all-parameters)
- [Configuration du cours](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforcions d’assurer l’exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant foi. Pour les informations critiques, une traduction professionnelle humaine est recommandée. Nous ne sommes pas responsables des malentendus ou des mauvaises interprétations résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->