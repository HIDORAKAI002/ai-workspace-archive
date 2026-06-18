# Générateur de plan d'étude avec Chainlit & Microsoft Learn Docs MCP

## Pré requis

- Python 3.8 ou supérieur
- pip (gestionnaire de paquets Python)
- Accès Internet pour se connecter au serveur Microsoft Learn Docs MCP

## Installation

1. Clonez ce dépôt ou téléchargez les fichiers du projet.
2. Installez les dépendances requises :

   ```bash
   pip install -r requirements.txt
   ```

## Utilisation

### Scénario 1 : Requête simple vers Docs MCP
Un client en ligne de commande qui se connecte au serveur Docs MCP, envoie une requête et affiche le résultat.

1. Exécutez le script :
   ```bash
   python scenario1.py
   ```
2. Entrez votre question de documentation à l'invite.

### Scénario 2 : Générateur de plan d'étude (application web Chainlit)
Une interface web (utilisant Chainlit) qui permet aux utilisateurs de générer un plan d'étude personnalisé, semaine par semaine, pour n'importe quel sujet technique.

1. Lancez l'application Chainlit :
   ```bash
   chainlit run scenario2.py
   ```
2. Ouvrez l'URL locale fournie dans votre terminal (par exemple, http://localhost:8000) dans votre navigateur.
3. Dans la fenêtre de chat, saisissez votre sujet d'étude et le nombre de semaines pendant lesquelles vous souhaitez étudier (par exemple, "Certification AI-900, 8 semaines").
4. L'application répondra avec un plan d'étude semaine par semaine, incluant des liens vers la documentation Microsoft Learn pertinente.

**Variables d'environnement requises :**

Pour utiliser le scénario 2 (application web Chainlit avec Azure OpenAI), vous devez définir les variables d'environnement suivantes dans un fichier `.env` dans le répertoire `python` :

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Remplissez ces valeurs avec les détails de votre ressource Azure OpenAI avant d'exécuter l'application.

> [!TIP]
> Vous pouvez déployer facilement vos propres modèles en utilisant [Microsoft Foundry](https://ai.azure.com/).

### Scénario 3 : Documentation dans l'éditeur avec serveur MCP dans VS Code

Au lieu de changer d’onglet de navigateur pour chercher la documentation, vous pouvez importer Microsoft Learn Docs directement dans votre VS Code via le serveur MCP. Cela vous permet de :
- Rechercher et lire la documentation dans VS Code sans quitter votre environnement de développement.
- Référencer la documentation et insérer des liens directement dans vos fichiers README ou de cours.
- Utiliser GitHub Copilot et MCP ensemble pour un flux de travail documenté assisté par IA.

**Cas d’utilisation exemples :**
- Ajouter rapidement des liens de référence à un README lors de la rédaction d’un cours ou d’une documentation de projet.
- Utiliser Copilot pour générer du code et MCP pour trouver instantanément et citer la documentation correspondante.
- Rester concentré dans votre éditeur et améliorer la productivité.

> [!IMPORTANT]
> Assurez-vous d'avoir une configuration [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) valide dans votre espace de travail (emplacement `.vscode/mcp.json`).

## Pourquoi Chainlit pour le Scénario 2 ?

Chainlit est un framework open-source moderne pour créer des applications web conversationnelles. Il facilite la création d'interfaces utilisateur basées sur le chat qui se connectent à des services back-end comme le serveur Microsoft Learn Docs MCP. Ce projet utilise Chainlit pour offrir un moyen simple et interactif de générer des plans d’étude personnalisés en temps réel. En tirant parti de Chainlit, vous pouvez rapidement construire et déployer des outils basés sur le chat qui améliorent la productivité et l’apprentissage.

## Ce que fait cette application

Cette application permet aux utilisateurs de créer un plan d’étude personnalisé en saisissant simplement un sujet et une durée. L'application analyse votre entrée, interroge le serveur Microsoft Learn Docs MCP pour obtenir du contenu pertinent, et organise les résultats en un plan structuré semaine par semaine. Les recommandations de chaque semaine sont affichées dans la conversation, facilitant le suivi et la progression. L’intégration garantit que vous obtenez toujours les ressources d’apprentissage les plus récentes et les plus pertinentes.

## Exemples de requêtes

Essayez ces requêtes dans la fenêtre de chat pour voir comment l'application répond :

- `Certification AI-900, 8 semaines`
- `Apprendre Azure Functions, 4 semaines`
- `Azure DevOps, 6 semaines`
- `Ingénierie des données sur Azure, 10 semaines`
- `Fondamentaux de la sécurité Microsoft, 5 semaines`
- `Power Platform, 7 semaines`
- `Services Azure AI, 12 semaines`
- `Architecture cloud, 9 semaines`

Ces exemples démontrent la flexibilité de l’application pour différents objectifs d’apprentissage et durées.

## Références

- [Documentation Chainlit](https://docs.chainlit.io/)
- [Documentation MCP](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->