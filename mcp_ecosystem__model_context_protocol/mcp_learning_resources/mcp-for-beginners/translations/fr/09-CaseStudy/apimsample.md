# Étude de cas : Exposer une API REST dans API Management en tant que serveur MCP

Azure API Management est un service qui fournit une passerelle au-dessus de vos points de terminaison API. Son fonctionnement est qu’Azure API Management agit comme un proxy devant vos APIs et peut décider quoi faire des requêtes entrantes.

En l’utilisant, vous ajoutez toute une série de fonctionnalités telles que :

- **Sécurité**, vous pouvez utiliser tout, des clés API, JWT à l’identité managée.
- **Limitation du débit**, une fonctionnalité excellente est la possibilité de décider combien d’appels passent par unité de temps. Cela aide à garantir que tous les utilisateurs ont une excellente expérience et aussi que votre service n’est pas submergé par les requêtes.
- **Mise à l’échelle et équilibrage de charge**. Vous pouvez configurer plusieurs points de terminaison pour répartir la charge et vous pouvez aussi décider comment "équilibrer la charge".
- **Fonctionnalités d’IA comme la mise en cache sémantique**, la limite de jetons, la surveillance des jetons et plus encore. Ce sont d’excellentes fonctionnalités qui améliorent la réactivité tout en vous aidant à maîtriser vos dépenses de jetons. [En savoir plus ici](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities).

## Pourquoi MCP + Azure API Management ?

Le Model Context Protocol devient rapidement un standard pour les applications d’IA agentique et la manière d’exposer outils et données de façon cohérente. Azure API Management est un choix naturel lorsque vous devez "gérer" des APIs. Les serveurs MCP s’intègrent souvent avec d’autres APIs pour résoudre des requêtes vers un outil, par exemple. Combiner Azure API Management avec MCP a donc beaucoup de sens.

## Vue d’ensemble

Dans ce cas d’usage spécifique, nous allons apprendre à exposer des points de terminaison API en tant que serveur MCP. Ce faisant, nous pouvons facilement rendre ces points de terminaison partie d’une application agentique tout en tirant parti des fonctionnalités d’Azure API Management.

## Fonctionnalités clés

- Vous sélectionnez les méthodes des points de terminaison à exposer en tant qu’outils.
- Les fonctionnalités supplémentaires que vous obtenez dépendent de ce que vous configurez dans la section politique pour votre API. Ici, nous vous montrerons comment ajouter une limitation du débit.

## Pré-étape : importer une API

Si vous avez déjà une API dans Azure API Management, parfait, vous pouvez passer cette étape. Sinon, consultez ce lien, [importer une API dans Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Exposer l’API en tant que serveur MCP

Pour exposer les points de terminaison API, suivez ces étapes :

1. Naviguez vers le portail Azure à l’adresse suivante <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp>  
Naviguez vers votre instance de gestion d’API.

1. Dans le menu de gauche, sélectionnez APIs > MCP Servers > + Créer un nouveau serveur MCP.

1. Dans API, sélectionnez une API REST à exposer en tant que serveur MCP.

1. Sélectionnez une ou plusieurs opérations d’API à exposer en tant qu’outils. Vous pouvez sélectionner toutes les opérations ou seulement des opérations spécifiques.

    ![Sélectionner les méthodes à exposer](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Sélectionnez **Créer**.

1. Allez dans les options de menu **APIs** et **MCP Servers**, vous devriez voir ceci :

    ![Voir le serveur MCP dans le panneau principal](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Le serveur MCP est créé et les opérations API sont exposées en tant qu’outils. Le serveur MCP est listé dans le panneau MCP Servers. La colonne URL montre le point de terminaison du serveur MCP que vous pouvez appeler pour tester ou dans une application cliente.

## Optionnel : configurer des politiques

Azure API Management possède le concept central de politiques où vous définissez différentes règles pour vos points de terminaison, comme par exemple la limitation du débit ou la mise en cache sémantique. Ces politiques sont écrites en XML.

Voici comment vous pouvez configurer une politique pour limiter le débit de votre serveur MCP :

1. Dans le portail, sous APIs, sélectionnez **MCP Servers**.

1. Sélectionnez le serveur MCP que vous avez créé.

1. Dans le menu de gauche, sous MCP, sélectionnez **Policies**.

1. Dans l’éditeur de politique, ajoutez ou modifiez les politiques que vous souhaitez appliquer aux outils du serveur MCP. Les politiques sont définies au format XML. Par exemple, vous pouvez ajouter une politique pour limiter les appels aux outils du serveur MCP (dans cet exemple, 5 appels par 30 secondes par adresse IP client). Voici un XML qui appliquera une limitation du débit :

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Voici une image de l’éditeur de politique :

    ![Éditeur de politique](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Essayez-le

Assurons-nous que notre serveur MCP fonctionne comme prévu.

Pour cela, nous utiliserons Visual Studio Code et GitHub Copilot en mode Agent. Nous allons ajouter le serveur MCP dans un fichier *mcp.json*. Ce faisant, Visual Studio Code agira comme un client avec des capacités agentiques et les utilisateurs finaux pourront taper une invite et interagir avec le serveur.

Voici comment, pour ajouter le serveur MCP dans Visual Studio Code :

1. Utilisez la commande MCP : **Ajouter un serveur depuis la palette de commandes**.

1. Lorsque demandé, sélectionnez le type de serveur : **HTTP (HTTP ou Server Sent Events)**.

1. Entrez l’URL du serveur MCP dans API Management. Exemple : **https://<nom-service-apim>.azure-api.net/<nom-api>-mcp/sse** (pour le point de terminaison SSE) ou **https://<nom-service-apim>.azure-api.net/<nom-api>-mcp/mcp** (pour le point de terminaison MCP), notez que la différence entre les transports est `/sse` ou `/mcp`.

1. Entrez un ID serveur de votre choix. Ce n’est pas une valeur importante mais cela vous aidera à vous rappeler de cette instance de serveur.

1. Sélectionnez si vous souhaitez enregistrer la configuration dans les paramètres de votre espace de travail ou dans les paramètres utilisateur.

  - **Paramètres de l’espace de travail** - La configuration du serveur est enregistrée dans un fichier .vscode/mcp.json disponible uniquement dans l’espace de travail actuel.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    ou si vous choisissez HTTP en streaming comme transport, ce serait légèrement différent :

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Paramètres utilisateur** - La configuration du serveur est ajoutée à votre fichier global *settings.json* et est disponible dans tous les espaces de travail. La configuration ressemble à ceci :

    ![Paramètre utilisateur](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Vous devez aussi ajouter une configuration, un en-tête pour vous assurer que l’authentification se fait correctement vers Azure API Management. Il utilise un en-tête appelé **Ocp-Apim-Subscription-Key**.

    - Voici comment vous pouvez l’ajouter aux paramètres :

    ![Ajout de l’en-tête pour l’authentification](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), ceci fera apparaître une invite vous demandant la valeur de la clé API que vous pouvez trouver dans le portail Azure pour votre instance Azure API Management.

   - Pour l’ajouter dans *mcp.json* à la place, vous pouvez l’ajouter comme ceci :

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Utilisez le mode Agent

Maintenant que tout est configuré, soit dans les paramètres soit dans *.vscode/mcp.json*, essayons.

Il devrait y avoir une icône Outils comme ceci, où les outils exposés de votre serveur sont listés :

![Outils du serveur](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Cliquez sur l’icône des outils et vous devriez voir une liste d’outils comme ceci :

    ![Outils](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Entrez une invite dans le chat pour invoquer l’outil. Par exemple, si vous avez sélectionné un outil pour obtenir des informations sur une commande, vous pouvez demander à l’agent à propos d’une commande. Voici un exemple d’invite :

    ```text
    get information from order 2
    ```

    Vous verrez alors une icône d’outils vous invitant à continuer en appelant un outil. Sélectionnez pour continuer l’exécution de l’outil, vous devriez maintenant voir un résultat comme ceci :

    ![Résultat de l’invite](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **ce que vous voyez dépend des outils que vous avez configurés, mais l’idée est que vous obteniez une réponse textuelle comme ci-dessus**


## Références

Voici comment en apprendre davantage :

- [Tutoriel sur Azure API Management et MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Exemple Python : sécuriser les serveurs MCP à distance avec Azure API Management (expérimental)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [Laboratoire d’autorisation client MCP](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Utiliser l’extension Azure API Management pour VS Code pour importer et gérer des APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Enregistrer et découvrir des serveurs MCP distants dans Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Excellente ressource montrant de nombreuses capacités IA avec Azure API Management
- [Ateliers AI Gateway](https://azure-samples.github.io/AI-Gateway/) Contient des ateliers utilisant Azure Portal, une excellente façon de commencer à évaluer les capacités IA.

## Quelle étape suivante

- Retour à : [Vue d’ensemble des études de cas](./README.md)
- Suivant : [Agents de voyage Azure AI](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :  
Ce document a été traduit à l’aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforcions d’assurer l’exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d’origine doit être considéré comme la source faisant foi. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle humaine. Nous déclinons toute responsabilité en cas de malentendus ou de mauvaises interprétations résultant de l’utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->