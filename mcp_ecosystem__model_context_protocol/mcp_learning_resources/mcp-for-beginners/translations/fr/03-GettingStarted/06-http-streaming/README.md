# Streaming HTTPS avec le Model Context Protocol (MCP)

Ce chapitre fournit un guide complet pour mettre en œuvre un streaming sécurisé, évolutif et en temps réel avec le Model Context Protocol (MCP) utilisant HTTPS. Il couvre la motivation du streaming, les mécanismes de transport disponibles, comment implémenter le HTTP streamable dans MCP, les bonnes pratiques de sécurité, la migration depuis SSE, et des conseils pratiques pour créer vos propres applications MCP en streaming.

> **En regardant vers l'avenir :** cette leçon décrit le HTTP Streamable sous la **spécification MCP 2025-11-25**, où une session est établie lors de l'`initialize` et fixée avec un en-tête `Mcp-Session-Id`. La version candidate du `2026-07-28` supprime entièrement la négociation et l'identifiant de session, rendant chaque requête autonome et routable vers n'importe quelle instance serveur sans sessions persistantes. Voir [Quoi de neuf dans MCP : la version candidate 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pour plus de détails.

## Mécanismes de Transport et Streaming dans MCP

Cette section explore les différents mécanismes de transport disponibles dans MCP et leur rôle dans la prise en charge du streaming pour la communication temps réel entre clients et serveurs.

### Qu'est-ce qu'un Mécanisme de Transport ?

Un mécanisme de transport définit la manière dont les données sont échangées entre le client et le serveur. MCP prend en charge plusieurs types de transport adaptés à différents environnements et besoins :

- **stdio** : Entrée/sortie standard, adapté aux outils locaux et basés sur la CLI. Simple mais non adapté au web ou au cloud.
- **SSE (Server-Sent Events)** : Permet aux serveurs d'envoyer des mises à jour en temps réel aux clients via HTTP. Bon pour les interfaces web, mais limité en évolutivité et flexibilité. Depuis la spécification MCP 2025-06-18, le transport SSE autonome a été déprécié et remplacé par le transport "Streamable HTTP".
- **Streamable HTTP** : Transport de streaming moderne basé sur HTTP, supportant les notifications et une meilleure évolutivité. Recommandé pour la plupart des scénarios de production et cloud.

### Tableau comparatif

Jetez un œil au tableau comparatif ci-dessous pour comprendre les différences entre ces mécanismes de transport :

| Transport         | Mises à jour en temps réel | Streaming | Évolutivité | Cas d'utilisation        |
|-------------------|----------------------------|-----------|-------------|-------------------------|
| stdio             | Non                        | Non       | Faible      | Outils CLI locaux        |
| SSE               | Oui                        | Oui       | Moyenne     | Web, mises à jour temps réel |
| Streamable HTTP   | Oui                        | Oui       | Élevée      | Cloud, multi-client      |

> **Astuce :** Le choix du transport impacte les performances, l'évolutivité, et l'expérience utilisateur. **Streamable HTTP** est recommandé pour les applications modernes, évolutives et prêtes pour le cloud.

Notez les transports stdio et SSE présentés dans les chapitres précédents et comment le streaming HTTP streamable est le transport traité dans ce chapitre.

## Streaming : Concepts et motivation

Comprendre les concepts fondamentaux et la motivation derrière le streaming est essentiel pour mettre en œuvre des systèmes de communication en temps réel efficaces.

**Le streaming** est une technique en programmation réseau qui permet d'envoyer et de recevoir des données en petits morceaux gérables ou en une séquence d'événements, au lieu d'attendre qu'une réponse complète soit prête. Cela est particulièrement utile pour :

- Les fichiers ou ensembles de données volumineux.
- Les mises à jour en temps réel (par exemple, chat, barres de progression).
- Les calculs de longue durée où vous souhaitez tenir l'utilisateur informé.

Voici ce que vous devez savoir sur le streaming à un niveau élevé :

- Les données sont livrées progressivement, pas toutes en même temps.
- Le client peut traiter les données à mesure qu'elles arrivent.
- Réduit la latence perçue et améliore l'expérience utilisateur.

### Pourquoi utiliser le streaming ?

Les raisons d’utiliser le streaming sont les suivantes :

- Les utilisateurs reçoivent un retour immédiatement, pas seulement à la fin.
- Permet des applications en temps réel et des interfaces réactives.
- Utilisation plus efficace des ressources réseau et informatiques.

### Exemple simple : serveur et client HTTP en streaming

Voici un exemple simple de mise en œuvre du streaming :

#### Python

**Serveur (Python, utilisant FastAPI et StreamingResponse) :**

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import time

app = FastAPI()

async def event_stream():
    for i in range(1, 6):
        yield f"data: Message {i}\n\n"
        time.sleep(1)

@app.get("/stream")
def stream():
    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**Client (Python, utilisant requests) :**

```python
import requests

with requests.get("http://localhost:8000/stream", stream=True) as r:
    for line in r.iter_lines():
        if line:
            print(line.decode())
```

Cet exemple démontre un serveur envoyant une série de messages au client à mesure qu’ils deviennent disponibles, au lieu d’attendre que tous les messages soient prêts.

**Comment cela fonctionne :**

- Le serveur émet chaque message dès qu’il est prêt.
- Le client reçoit et affiche chaque morceau dès son arrivée.

**Prérequis :**

- Le serveur doit utiliser une réponse de type streaming (par exemple, `StreamingResponse` dans FastAPI).
- Le client doit traiter la réponse comme un flux (`stream=True` dans requests).
- Le Content-Type est généralement `text/event-stream` ou `application/octet-stream`.

#### Java

**Serveur (Java, utilisant Spring Boot et Server-Sent Events) :**

```java
@RestController
public class CalculatorController {

    @GetMapping(value = "/calculate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> calculate(@RequestParam double a,
                                                   @RequestParam double b,
                                                   @RequestParam String op) {
        
        double result;
        switch (op) {
            case "add": result = a + b; break;
            case "sub": result = a - b; break;
            case "mul": result = a * b; break;
            case "div": result = b != 0 ? a / b : Double.NaN; break;
            default: result = Double.NaN;
        }

        return Flux.<ServerSentEvent<String>>just(
                    ServerSentEvent.<String>builder()
                        .event("info")
                        .data("Calculating: " + a + " " + op + " " + b)
                        .build(),
                    ServerSentEvent.<String>builder()
                        .event("result")
                        .data(String.valueOf(result))
                        .build()
                )
                .delayElements(Duration.ofSeconds(1));
    }
}
```

**Client (Java, utilisant Spring WebFlux WebClient) :**

```java
@SpringBootApplication
public class CalculatorClientApplication implements CommandLineRunner {

    private final WebClient client = WebClient.builder()
            .baseUrl("http://localhost:8080")
            .build();

    @Override
    public void run(String... args) {
        client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/calculate")
                        .queryParam("a", 7)
                        .queryParam("b", 5)
                        .queryParam("op", "mul")
                        .build())
                .accept(MediaType.TEXT_EVENT_STREAM)
                .retrieve()
                .bodyToFlux(String.class)
                .doOnNext(System.out::println)
                .blockLast();
    }
}
```

**Notes d’implémentation Java :**

- Utilise la pile réactive de Spring Boot avec `Flux` pour le streaming.
- `ServerSentEvent` fournit un streaming d’événements structuré avec des types d’événements.
- `WebClient` avec `bodyToFlux()` permet la consommation réactive du streaming.
- `delayElements()` simule le temps de traitement entre événements.
- Les événements peuvent avoir des types (`info`, `result`) pour une meilleure gestion côté client.

### Comparaison : Streaming classique vs Streaming MCP

Les différences entre la manière classique de faire du streaming et celle utilisée dans MCP peuvent être illustrées ainsi :

| Fonctionnalité         | Streaming HTTP Classique       | Streaming MCP (Notifications)     |
|-----------------------|-------------------------------|-----------------------------------|
| Réponse principale     | Découpée                      | Unique, en fin                    |
| Mises à jour de progrès| Envoyées en données par morceaux| Envoyées en notifications         |
| Exigences client       | Doit traiter le flux           | Doit implémenter un gestionnaire de messages |
| Cas d'utilisation      | Fichiers volumineux, flux de jetons IA | Progression, logs, retours en temps réel |

### Principales différences observées

En outre, voici quelques différences clés :

- **Modèle de communication :**
  - Streaming HTTP classique : Utilise un encodage de transfert par morceaux simple pour envoyer les données.
  - Streaming MCP : Utilise un système de notifications structuré avec le protocole JSON-RPC.

- **Format des messages :**
  - HTTP classique : Morceaux de texte brut avec des retours à la ligne.
  - MCP : Objets LoggingMessageNotification structurés avec métadonnées.

- **Implémentation côté client :**
  - HTTP classique : Client simple traitant des réponses en streaming.
  - MCP : Client plus sophistiqué avec un gestionnaire de messages pour traiter différents types de messages.

- **Mises à jour de progression :**
  - HTTP classique : La progression fait partie du flux principal de la réponse.
  - MCP : La progression est envoyée via des messages de notification séparés tandis que la réponse principale arrive à la fin.

### Recommandations

Quelques recommandations pour choisir entre le streaming classique (comme l'endpoint montré ci-dessus utilisant `/stream`) et le streaming via MCP.

- **Pour des besoins de streaming simples :** Le streaming HTTP classique est plus simple à implémenter et suffisant pour des besoins basiques.

- **Pour des applications complexes et interactives :** Le streaming MCP fournit une approche plus structurée avec des métadonnées enrichies et une séparation entre notifications et résultats finaux.

- **Pour les applications IA :** Le système de notifications MCP est particulièrement utile pour les tâches IA longues où vous voulez tenir les utilisateurs informés de la progression.

## Streaming dans MCP

Vous avez maintenant vu quelques recommandations et comparaisons sur la différence entre le streaming classique et le streaming dans MCP. Entrons dans les détails de la manière exacte de tirer parti du streaming dans MCP.

Comprendre comment le streaming fonctionne dans le cadre MCP est essentiel pour construire des applications réactives qui fournissent un retour en temps réel aux utilisateurs lors d’opérations longues.

Dans MCP, le streaming ne consiste pas à envoyer la réponse principale en morceaux, mais à envoyer des **notifications** au client pendant qu’un outil traite une requête. Ces notifications peuvent inclure des mises à jour de progression, des logs, ou d’autres événements.

### Comment ça fonctionne

Le résultat principal est toujours envoyé en une seule réponse. Cependant, les notifications peuvent être envoyées en messages distincts pendant le traitement, mettant ainsi à jour le client en temps réel. Le client doit pouvoir gérer et afficher ces notifications.

## Qu’est-ce qu’une Notification ?

Nous avons parlé de "Notification", que signifie ce terme dans le contexte MCP ?

Une notification est un message envoyé du serveur au client pour informer de la progression, du statut ou d’autres événements lors d’une opération de longue durée. Les notifications améliorent la transparence et l’expérience utilisateur.

Par exemple, un client est censé envoyer une notification une fois la négociation initiale avec le serveur terminée.

Une notification ressemble à ceci sous forme de message JSON :

```json
{
  jsonrpc: "2.0";
  method: string;
  params?: {
    [key: string]: unknown;
  };
}
```

Les notifications appartiennent à un sujet dans MCP appelé ["Logging"](https://modelcontextprotocol.io/specification/draft/server/utilities/logging).

Pour faire fonctionner le logging, le serveur doit l’activer en tant que fonctionnalité/capacité comme suit :

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Selon le SDK utilisé, le logging peut être activé par défaut, ou vous devrez peut-être l’activer explicitement dans la configuration de votre serveur.

Il existe différents types de notifications :

| Niveau     | Description                   | Exemple d’utilisation            |
|-----------|-------------------------------|---------------------------------|
| debug     | Informations détaillées pour le débogage | Points d’entrée/sortie de fonctions |
| info      | Messages d’information générale | Mises à jour de progression     |
| notice    | Événements normaux mais significatifs | Changements de configuration    |
| warning   | Conditions d’alerte            | Usage de fonctionnalités obsolètes |
| error     | Conditions d’erreur            | Échecs d’opération              |
| critical  | Conditions critiques           | Pannes de composants systèmes    |
| alert     | Action immédiate requise       | Corruption de données détectée |
| emergency | Système inutilisable           | Panne complète du système       |

## Implémentation des Notifications dans MCP

Pour implémenter les notifications dans MCP, vous devez configurer les deux côtés, serveur et client, pour gérer les mises à jour en temps réel. Cela permet à votre application de fournir un retour immédiat aux utilisateurs lors d’opérations longues.

### Côté serveur : Envoi des Notifications

Commençons par le serveur. Dans MCP, vous définissez des outils qui peuvent envoyer des notifications pendant le traitement des requêtes. Le serveur utilise l’objet de contexte (généralement `ctx`) pour envoyer des messages au client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Dans l’exemple précédent, l’outil `process_files` envoie trois notifications au client au fur et à mesure qu’il traite chaque fichier. La méthode `ctx.info()` est utilisée pour envoyer des messages d’information.

De plus, pour activer les notifications, assurez-vous que votre serveur utilise un transport de streaming (comme `streamable-http`) et que votre client implémente un gestionnaire de messages pour traiter les notifications. Voici comment configurer le serveur pour utiliser le transport `streamable-http` :

```python
mcp.run(transport="streamable-http")
```

#### .NET

```csharp
[Tool("A tool that sends progress notifications")]
public async Task<TextContent> ProcessFiles(string message, ToolContext ctx)
{
    await ctx.Info("Processing file 1/3...");
    await ctx.Info("Processing file 2/3...");
    await ctx.Info("Processing file 3/3...");
    return new TextContent
    {
        Type = "text",
        Text = $"Done: {message}"
    };
}
```

Dans cet exemple .NET, l’outil `ProcessFiles` est annoté avec l’attribut `Tool` et envoie trois notifications au client pendant le traitement de chaque fichier. La méthode `ctx.Info()` est utilisée pour envoyer des messages d’information.

Pour activer les notifications dans votre serveur MCP .NET, assurez-vous d’utiliser un transport de streaming :

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Côté client : Réception des Notifications

Le client doit implémenter un gestionnaire de messages pour traiter et afficher les notifications à leur arrivée.

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)

async with ClientSession(
   read_stream, 
   write_stream,
   logging_callback=logging_collector,
   message_handler=message_handler,
) as session:
```

Dans le code précédent, la fonction `message_handler` vérifie si le message entrant est une notification. Si oui, elle affiche la notification ; sinon, elle traite le message comme un message serveur normal. Notez aussi comment `ClientSession` est initialisé avec `message_handler` pour gérer les notifications entrantes.

#### .NET

```csharp
// Define a message handler
void MessageHandler(IJsonRpcMessage message)
{
    if (message is ServerNotification notification)
    {
        Console.WriteLine($"NOTIFICATION: {notification}");
    }
    else
    {
        Console.WriteLine($"SERVER MESSAGE: {message}");
    }
}

// Create and use a client session with the message handler
var clientOptions = new ClientSessionOptions
{
    MessageHandler = MessageHandler,
    LoggingCallback = (level, message) => Console.WriteLine($"[{level}] {message}")
};

using var client = new ClientSession(readStream, writeStream, clientOptions);
await client.InitializeAsync();

// Now the client will process notifications through the MessageHandler
```

Dans cet exemple .NET, la fonction `MessageHandler` vérifie si le message entrant est une notification. Si oui, elle affiche la notification ; sinon, elle la traite comme un message serveur classique. `ClientSession` est initialisé avec le gestionnaire de messages via `ClientSessionOptions`.

Pour activer les notifications, assurez-vous que votre serveur utilise un transport de streaming (comme `streamable-http`) et que votre client implémente un gestionnaire de messages pour les notifications.

## Notifications de Progression & Scénarios

Cette section explique le concept des notifications de progression dans MCP, pourquoi elles sont importantes et comment les implémenter en utilisant Streamable HTTP. Vous trouverez aussi un exercice pratique pour renforcer votre compréhension.

Les notifications de progression sont des messages en temps réel envoyés du serveur au client lors d’opérations de longue durée. Au lieu d’attendre la fin du processus, le serveur tient le client informé du statut actuel. Cela améliore la transparence, l'expérience utilisateur et facilite le débogage.

**Exemple :**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Pourquoi utiliser les notifications de progression ?

Les notifications de progression sont essentielles pour plusieurs raisons :

- **Meilleure expérience utilisateur :** Les utilisateurs voient les mises à jour au fur et à mesure, pas seulement à la fin.
- **Retour en temps réel :** Les clients peuvent afficher des barres de progression ou des logs, rendant l'application réactive.
- **Débogage et surveillance facilités :** Les développeurs et utilisateurs peuvent voir où un processus peut être lent ou bloqué.

### Comment implémenter les notifications de progression

Voici comment implémenter les notifications de progression dans MCP :

- **Côté serveur :** Utilisez `ctx.info()` ou `ctx.log()` pour envoyer des notifications à mesure que chaque élément est traité. Cela envoie un message au client avant que le résultat principal ne soit prêt.
- **Côté client :** Implémentez un gestionnaire de messages qui écoute et affiche les notifications à leur arrivée. Ce gestionnaire fait la distinction entre notifications et résultat final.

**Exemple serveur :**

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    for i in range(1, 11):
        await ctx.info(f"Processing document {i}/10")
    await ctx.info("Processing complete!")
    return TextContent(type="text", text=f"Done: {message}")
```

**Exemple client :**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Considérations de Sécurité

Lors de la mise en œuvre de serveurs MCP avec des transports basés sur HTTP, la sécurité devient une préoccupation capitale nécessitant une attention minutieuse aux multiples vecteurs d’attaque et mécanismes de protection.

### Vue d’ensemble

La sécurité est critique lors de l’exposition des serveurs MCP sur HTTP. Streamable HTTP introduit de nouvelles surfaces d’attaque et nécessite une configuration attentive.

### Points clés


- **Validation de l'en-tête Origin** : Validez toujours l'en-tête `Origin` pour prévenir les attaques de rebinding DNS.
- **Liaison à localhost** : Pour le développement local, liez les serveurs à `localhost` afin d'éviter de les exposer à l'internet public.
- **Authentification** : Mettez en œuvre une authentification (par exemple, clés API, OAuth) pour les déploiements en production.
- **CORS** : Configurez les politiques de partage des ressources entre origines (CORS) pour restreindre l'accès.
- **HTTPS** : Utilisez HTTPS en production pour chiffrer le trafic.

### Meilleures pratiques

- Ne faites jamais confiance aux requêtes entrantes sans validation.
- Enregistrez et surveillez tous les accès et erreurs.
- Mettez régulièrement à jour les dépendances pour corriger les vulnérabilités de sécurité.

### Défis

- Trouver un équilibre entre sécurité et facilité de développement
- Assurer la compatibilité avec divers environnements clients

## Passage de SSE à Streamable HTTP

Pour les applications utilisant actuellement les Server-Sent Events (SSE), migrer vers Streamable HTTP offre des capacités améliorées et une meilleure durabilité à long terme pour vos implémentations MCP.

### Pourquoi effectuer la mise à niveau ?

Il existe deux raisons convaincantes de passer de SSE à Streamable HTTP :

- Streamable HTTP offre une meilleure évolutivité, compatibilité et un support de notifications plus riche que SSE.
- C'est le transport recommandé pour les nouvelles applications MCP.

### Étapes de migration

Voici comment vous pouvez migrer de SSE à Streamable HTTP dans vos applications MCP :

- **Mettez à jour le code serveur** pour utiliser `transport="streamable-http"` dans `mcp.run()`.
- **Mettez à jour le code client** pour utiliser `streamablehttp_client` au lieu du client SSE.
- **Implémentez un gestionnaire de messages** dans le client pour traiter les notifications.
- **Testez la compatibilité** avec les outils et flux de travail existants.

### Maintien de la compatibilité

Il est recommandé de maintenir la compatibilité avec les clients SSE existants pendant le processus de migration. Voici quelques stratégies :

- Vous pouvez prendre en charge à la fois SSE et Streamable HTTP en exécutant les deux transports sur des points de terminaison différents.
- Migrer progressivement les clients vers le nouveau transport.

### Défis

Assurez-vous de traiter les défis suivants lors de la migration :

- S'assurer que tous les clients sont mis à jour
- Gérer les différences dans la diffusion des notifications

## Considérations de sécurité

La sécurité doit être une priorité absolue lors de la mise en œuvre de tout serveur, en particulier lorsqu'on utilise des transports HTTP comme Streamable HTTP dans MCP.

Lors de la mise en œuvre de serveurs MCP utilisant des transports basés sur HTTP, la sécurité devient une préoccupation majeure nécessitant une attention particulière à plusieurs vecteurs d'attaque et mécanismes de protection.

### Vue d'ensemble

La sécurité est cruciale lors de l'exposition de serveurs MCP via HTTP. Streamable HTTP introduit de nouvelles surfaces d'attaque et nécessite une configuration rigoureuse.

Voici quelques considérations clés en matière de sécurité :

- **Validation de l'en-tête Origin** : Validez toujours l'en-tête `Origin` pour prévenir les attaques de rebinding DNS.
- **Liaison à localhost** : Pour le développement local, liez les serveurs à `localhost` afin d'éviter de les exposer à l'internet public.
- **Authentification** : Mettez en œuvre une authentification (par exemple, clés API, OAuth) pour les déploiements en production.
- **CORS** : Configurez les politiques de partage des ressources entre origines (CORS) pour restreindre l'accès.
- **HTTPS** : Utilisez HTTPS en production pour chiffrer le trafic.

### Meilleures pratiques

En outre, voici quelques bonnes pratiques à suivre lors de la mise en œuvre de la sécurité dans votre serveur streaming MCP :

- Ne faites jamais confiance aux requêtes entrantes sans validation.
- Enregistrez et surveillez tous les accès et erreurs.
- Mettez régulièrement à jour les dépendances pour corriger les vulnérabilités de sécurité.

### Défis

Vous rencontrerez certains défis lors de la mise en œuvre de la sécurité dans les serveurs streaming MCP :

- Trouver un équilibre entre sécurité et facilité de développement
- Assurer la compatibilité avec divers environnements clients

### Exercice : Construisez votre propre application MCP streaming

**Scénario :**
Construisez un serveur MCP et un client où le serveur traite une liste d’éléments (par ex. fichiers ou documents) et envoie une notification pour chaque élément traité. Le client doit afficher chaque notification à son arrivée.

**Étapes :**

1. Implémentez un outil serveur qui traite une liste et envoie des notifications pour chaque élément.
2. Implémentez un client avec un gestionnaire de messages pour afficher les notifications en temps réel.
3. Testez votre implémentation en exécutant à la fois le serveur et le client, et observez les notifications.

[Solution](./solution/README.md)

## Lectures complémentaires & Et après ?

Pour poursuivre votre parcours avec le streaming MCP et approfondir vos connaissances, cette section fournit des ressources supplémentaires et des étapes suggérées pour construire des applications plus avancées.

### Lectures complémentaires

- [Microsoft : Introduction au streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft : Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft : CORS dans ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests : Requêtes en streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Et après ?

- Essayez de construire des outils MCP plus avancés qui utilisent le streaming pour des analyses en temps réel, le chat, ou l’édition collaborative.
- Explorez l’intégration du streaming MCP avec des frameworks frontend (React, Vue, etc.) pour des mises à jour UI en direct.
- Suivant : [Utilisation de AI Toolkit pour VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->