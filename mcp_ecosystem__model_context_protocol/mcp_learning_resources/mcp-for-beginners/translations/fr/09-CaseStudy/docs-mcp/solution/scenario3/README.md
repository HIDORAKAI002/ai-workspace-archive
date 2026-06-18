# Scénario 3 : Documentation intégrée dans l’éditeur avec le serveur MCP dans VS Code

## Vue d’ensemble

Dans ce scénario, vous apprendrez comment intégrer Microsoft Learn Docs directement dans votre environnement Visual Studio Code à l’aide du serveur MCP. Au lieu de passer constamment d’un onglet de navigateur à un autre pour chercher de la documentation, vous pouvez accéder, rechercher et référencer la documentation officielle directement dans votre éditeur. Cette approche rationalise votre flux de travail, maintient votre concentration et permet une intégration fluide avec des outils comme GitHub Copilot.

- Rechercher et lire la documentation dans VS Code sans quitter votre environnement de codage.
- Référencer la documentation et insérer des liens directement dans votre README ou vos fichiers de cours.
- Utiliser GitHub Copilot et MCP ensemble pour un flux de travail documentaire fluide et assisté par IA.

## Objectifs d’apprentissage

À la fin de ce chapitre, vous saurez comment configurer et utiliser le serveur MCP dans VS Code pour améliorer votre flux de travail documentaire et de développement. Vous serez capable de :

- Configurer votre espace de travail pour utiliser le serveur MCP lors des recherches de documentation.
- Rechercher et insérer de la documentation directement depuis VS Code.
- Combiner la puissance de GitHub Copilot et MCP pour un flux de travail plus productif, augmenté par l’IA.

Ces compétences vous aideront à rester concentré, à améliorer la qualité de la documentation et à augmenter votre productivité en tant que développeur ou rédacteur technique.

## Solution

Pour accéder à la documentation depuis l’éditeur, vous suivrez une série d’étapes qui intègrent le serveur MCP avec VS Code et GitHub Copilot. Cette solution est idéale pour les auteurs de cours, les rédacteurs de documentation et les développeurs qui souhaitent rester concentrés dans l’éditeur tout en travaillant avec la documentation et Copilot.

- Ajouter rapidement des liens de référence à un README lors de la rédaction d’un cours ou d’une documentation de projet.
- Utiliser Copilot pour générer du code et MCP pour trouver et citer instantanément les documents pertinents.
- Rester concentré dans votre éditeur et améliorer votre productivité.

### Guide étape par étape

Pour commencer, suivez ces étapes. Pour chaque étape, vous pouvez ajouter une capture d’écran depuis le dossier assets pour illustrer visuellement le processus.

1. **Ajouter la configuration MCP :**
   Dans la racine de votre projet, créez un fichier `.vscode/mcp.json` et ajoutez la configuration suivante :
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   
   Cette configuration indique à VS Code comment se connecter au [`serveur MCP Microsoft Learn Docs`](https://github.com/MicrosoftDocs/mcp).
   
   ![Étape 1 : Ajouter mcp.json au dossier .vscode](../../../../../../translated_images/fr/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Ouvrir le panneau GitHub Copilot Chat :**
   Si vous n’avez pas encore installé l’extension GitHub Copilot, rendez-vous dans la vue Extensions de VS Code et installez-la. Vous pouvez la télécharger directement depuis le [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Ensuite, ouvrez le panneau Copilot Chat depuis la barre latérale.

   ![Étape 2 : Ouvrir le panneau Copilot Chat](../../../../../../translated_images/fr/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Activer le mode agent et vérifier les outils :**
   Dans le panneau Copilot Chat, activez le mode agent.

   ![Étape 3 : Activer le mode agent et vérifier les outils](../../../../../../translated_images/fr/step3-agent-mode.cdc32520fd7dd1d1.webp)

   Après avoir activé le mode agent, vérifiez que le serveur MCP est listé parmi les outils disponibles. Cela garantit que l’agent Copilot peut accéder au serveur de documentation pour récupérer les informations pertinentes.
   
   ![Étape 3 : Vérifier l’outil serveur MCP](../../../../../../translated_images/fr/step3-verify-mcp-tool.76096a6329cbfecd.webp)

4. **Démarrer une nouvelle discussion et interroger l’agent :**
   Ouvrez une nouvelle discussion dans le panneau Copilot Chat. Vous pouvez maintenant interroger l’agent avec vos requêtes de documentation. L’agent utilisera le serveur MCP pour récupérer et afficher la documentation Microsoft Learn pertinente directement dans votre éditeur.

   - *« J’essaie de rédiger un plan d’étude pour le sujet X. Je vais l’étudier pendant 8 semaines. Pour chaque semaine, suggère-moi du contenu à suivre. »*

   ![Étape 4 : Interroger l’agent dans le chat](../../../../../../translated_images/fr/step4-prompt-chat.12187bb001605efc.webp)

5. **Requête en direct :**

   > Prenons une requête en direct de la section [#get-help](https://discord.gg/D6cRhjHWSC) sur le Discord Microsoft Foundry ([voir le message original](https://discord.com/channels/1113626258182504448/1385498306720829572)) :
   
   *« Je cherche des réponses sur comment déployer une solution multi-agent avec des agents IA développés sur Azure AI Foundry. Je vois qu’il n’existe pas de méthode de déploiement directe, comme les canaux Copilot Studio. Quelles sont donc les différentes manières de faire ce déploiement pour que les utilisateurs d’entreprise puissent interagir et accomplir leurs tâches ? Il y a de nombreux articles/blogs qui disent que nous pouvons utiliser le service Azure Bot pour faire ce travail, qui peut agir comme un pont entre MS Teams et les agents Azure AI Foundry. Cela va-t-il fonctionner si je configure un bot Azure connecté à l’agent Orchestrator sur Azure AI Foundry via une fonction Azure pour réaliser l’orchestration, ou dois-je créer une fonction Azure pour chaque agent IA faisant partie de la solution multi-agent afin d’assurer l’orchestration dans le Bot Framework ? Toutes autres suggestions sont les bienvenues. »*

   ![Étape 5 : Requêtes en direct](../../../../../../translated_images/fr/step5-live-queries.49db3e4a50bea273.webp)

   L’agent répondra avec des liens vers la documentation pertinente et des résumés, que vous pourrez insérer directement dans vos fichiers markdown ou utiliser comme références dans votre code.

### Requêtes d’exemple

Voici quelques requêtes exemples que vous pouvez tester. Ces requêtes démontreront comment le serveur MCP et Copilot peuvent travailler ensemble pour fournir instantanément une documentation contextuelle et des références sans quitter VS Code :

- « Montre-moi comment utiliser les triggers d’Azure Functions. »
- « Insère un lien vers la documentation officielle d’Azure Key Vault. »
- « Quelles sont les meilleures pratiques pour sécuriser les ressources Azure ? »
- « Trouve un guide de démarrage rapide pour les services Azure AI. »

Ces requêtes démontreront comment le serveur MCP et Copilot peuvent travailler ensemble pour fournir instantanément une documentation contextuelle et des références sans quitter VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->