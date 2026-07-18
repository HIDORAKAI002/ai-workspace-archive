# Streaming HTTPS avec le protocole Model Context Protocol (MCP)

Ce chapitre fournit un guide complet pour implémenter un streaming sécurisé, évolutif et en temps réel avec le Model Context Protocol (MCP) utilisant HTTPS. Il couvre la motivation pour le streaming, les mécanismes de transport disponibles, comment implémenter un HTTP streamable dans MCP, les meilleures pratiques de sécurité, la migration depuis SSE, et des conseils pratiques pour construire vos propres applications MCP utilisant le streaming. 

> **À venir :** cette leçon décrit le HTTP streamable sous la **spécification MCP 2025-11-25**, où une session est établie lors de l'`initialize` et fixée avec un en-tête `Mcp-Session-Id`. Le candidat à la version `2026-07-28` supprime entièrement la négociation et l'ID de session, rendant chaque requête autonome et routable vers n'importe quelle instance serveur sans sessions persistantes. Voir [Quoi de neuf dans MCP : Le candidat à la version 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) pour plus de détails.

## Mécanismes de transport et streaming dans MCP

Cette section explore les différents mécanismes de transport disponibles dans MCP et leur rôle dans l'activation des capacités de streaming pour la communication en temps réel entre clients et serveurs.

### Qu'est-ce qu'un mécanisme de transport ?

Un mécanisme de transport définit comment les données sont échangées entre le client et le serveur. MCP supporte plusieurs types de transport adaptés à différents environnements et besoins :

- **stdio** : entrée/sortie standard, adapté aux outils locaux et en ligne de commande. Simple mais pas adapté au web ou au cloud.
- **SSE (Server-Sent Events)** : Permet aux serveurs de pousser des mises à jour en temps réel vers les clients via HTTP. Bon pour les interfaces web, mais limité en scalabilité et flexibilité. Depuis la spécification MCP 2025-06-18, le transport SSE seul est déprécié et remplacé par le transport "Streamable HTTP".
- **Streamable HTTP** : Transport de streaming moderne basé sur HTTP, supportant les notifications et une meilleure scalabilité. Recommandé pour la plupart des scénarios en production et cloud.

### Tableau comparatif

Consultez le tableau comparatif ci-dessous pour comprendre les différences entre ces mécanismes de transport :

| Transport         | Mises à jour en temps réel | Streaming | Scalabilité | Cas d’usage              |
|-------------------|----------------------------|-----------|-------------|--------------------------|
| stdio             | Non                        | Non       | Faible      | Outils CLI locaux        |
| SSE               | Oui                        | Oui       | Moyenne     | Web, mises à jour temps réel |
| Streamable HTTP   | Oui                        | Oui       | Élevée      | Cloud, multi-clients     |

> **Conseil :** Le choix du transport impacte la performance, la scalabilité, et l'expérience utilisateur. **Streamable HTTP** est recommandé pour des applications modernes, scalables et prêtes pour le cloud.

Notez les transports stdio et SSE présentés dans les chapitres précédents et comment le Streamable HTTP est le transport abordé dans ce chapitre.

## Streaming : concepts et motivation

Comprendre les concepts fondamentaux et les motivations derrière le streaming est essentiel pour implémenter des systèmes de communication en temps réel efficaces.

Le **streaming** est une technique en programmation réseau qui permet l'envoi et la réception de données en petits morceaux gérables ou sous forme d'une séquence d'événements, plutôt que d'attendre qu'une réponse entière soit prête. Cela est particulièrement utile pour :

- Les fichiers ou ensembles de données volumineux.
- Les mises à jour en temps réel (ex. : chat, barres de progression).
- Les calculs de longue durée où l’on veut tenir l’utilisateur informé.

Voici ce que vous devez savoir sur le streaming en général :

- Les données sont délivrées de manière progressive, pas toutes en même temps.
- Le client peut traiter les données dès leur arrivée.
- Réduit la latence perçue et améliore l'expérience utilisateur.

### Pourquoi utiliser le streaming ?

Les raisons d’utiliser le streaming sont les suivantes :

- Les utilisateurs reçoivent un retour immédiatement, pas seulement à la fin.
- Permet les applications en temps réel et interfaces réactives.
- Utilisation plus efficace des ressources réseau et calcul.

### Exemple simple : serveur et client de streaming HTTP

Voici un exemple simple de comment le streaming peut être implémenté :

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

Cet exemple montre un serveur envoyant une série de messages au client au fur et à mesure qu’ils deviennent disponibles, plutôt que d’attendre que tous les messages soient prêts.

**Comment ça marche :**

- Le serveur produit chaque message dès qu'il est prêt.
- Le client reçoit et affiche chaque morceau à son arrivée.

**Contraintes requises :**

- Le serveur doit utiliser une réponse de streaming (ex. : `StreamingResponse` dans FastAPI).
- Le client doit traiter la réponse en tant que flux (`stream=True` dans requests).
- Le Content-Type est habituellement `text/event-stream` ou `application/octet-stream`.

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

**Notes sur l’implémentation Java :**

- Utilise la pile réactive de Spring Boot avec `Flux` pour le streaming
- `ServerSentEvent` fournit un streaming événementiel structuré avec types d’événements
- `WebClient` avec `bodyToFlux()` permet de consommer le streaming de façon réactive
- `delayElements()` simule le temps de traitement entre événements
- Les événements peuvent avoir des types (`info`, `result`) pour une meilleure gestion côté client

### Comparaison : Streaming classique vs Streaming MCP

Les différences entre le fonctionnement streaming "classique" et celui dans MCP peuvent être représentées ainsi :

| Fonctionnalité         | Streaming HTTP classique    | Streaming MCP (Notifications)   |
|-----------------------|-----------------------------|---------------------------------|
| Réponse principale    | En morceaux (chunked)       | Unique, à la fin                |
| Mises à jour de progression | Envoyées en morceaux       | Envoyées comme notifications   |
| Exigences client      | Doit traiter le flux         | Doit implémenter un gestionnaire de messages |
| Cas d’usage           | Fichiers volumineux, flux de tokens IA | Progression, logs, retours temps réel |

### Différences clés observées

De plus, voici quelques différences clés :

- **Modèle de communication :**
  - Streaming HTTP classique : utilise un encodage simple en morceaux pour envoyer les données
  - Streaming MCP : utilise un système structuré de notifications avec protocole JSON-RPC

- **Format des messages :**
  - HTTP classique : morceaux de texte brut avec des sauts de ligne
  - MCP : objets structurés LoggingMessageNotification avec métadonnées

- **Implémentation client :**
  - HTTP classique : client simple qui traite les réponses de streaming
  - MCP : client plus sophistiqué avec un gestionnaire de messages pour différents types de messages

- **Mises à jour de progression :**
  - HTTP classique : la progression fait partie du flux de réponse principal
  - MCP : la progression est envoyée via des messages de notification séparés tandis que la réponse principale arrive à la fin

### Recommandations

Voici quelques recommandations pour choisir entre implémenter un streaming classique (comme l’endpoint `/stream` montré plus haut) ou choisir le streaming via MCP.

- **Pour des besoins simples de streaming :** le streaming HTTP classique est plus simple à implémenter et suffit pour des besoins basiques.

- **Pour des applications complexes et interactives :** le streaming MCP offre une approche plus structurée avec des métadonnées riches et une séparation entre notifications et résultats finaux.

- **Pour les applications IA :** le système de notifications de MCP est particulièrement utile pour les tâches IA longues où l’on souhaite tenir les utilisateurs informés de la progression.

## Streaming dans MCP

D’accord, vous avez vu jusqu’ici des recommandations et comparaisons sur les différences entre le streaming classique et le streaming dans MCP. Entrons dans le détail de comment exploiter précisément le streaming dans MCP.

Comprendre comment le streaming fonctionne dans le cadre MCP est essentiel pour construire des applications réactives qui fournissent un retour en temps réel aux utilisateurs pendant les opérations de longue durée.

Dans MCP, le streaming ne consiste pas à envoyer la réponse principale en morceaux, mais à envoyer des **notifications** au client pendant qu'un outil traite une requête. Ces notifications peuvent inclure des mises à jour de progression, des logs, ou d’autres événements.

### Comment ça fonctionne

Le résultat principal est toujours envoyé sous forme d'une réponse unique. Cependant, des notifications peuvent être envoyées comme messages séparés pendant le traitement pour mettre le client à jour en temps réel. Le client doit pouvoir gérer et afficher ces notifications.

## Qu’est-ce qu’une Notification ?

Nous avons parlé de "Notification", que signifie ce terme dans le contexte MCP ?

Une notification est un message envoyé du serveur au client pour informer sur la progression, le statut ou d’autres événements lors d’une opération longue. Les notifications améliorent la transparence et l'expérience utilisateur.

Par exemple, un client est censé envoyer une notification une fois la négociation initiale avec le serveur effectuée.

Une notification ressemble à cela dans un message JSON :

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

> **Avis de dépréciation :** le candidat à la version MCP `2026-07-28` marque l'élément Logging comme déprécié au profit de `stderr` pour les transports stdio et d'OpenTelemetry pour une observabilité structurée. Logging continue de fonctionner en version `2025-11-25` et pendant au moins un an après toute dépréciation formelle. Voir [Quoi de neuf dans MCP : Le candidat à la version 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Pour activer le logging, le serveur doit le configurer comme fonctionnalité/capacité ainsi :

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

| Niveau    | Description                     | Cas d’utilisation exemple         |
|-----------|---------------------------------|-----------------------------------|
| debug     | Informations détaillées de débogage | Points d’entrée/sortie de fonction |
| info      | Messages d’information générale  | Mises à jour de progression        |
| notice    | Événements normaux mais significatifs | Changements de configuration      |
| warning   | Conditions d’avertissement       | Utilisation de fonctionnalités dépréciées |
| error     | Conditions d’erreur              | Échecs d’opérations                |
| critical  | Conditions critiques             | Pannes de composants système       |
| alert     | Action à prendre immédiatement  | Corruption de données détectée    |
| emergency | Système inutilisable             | Panne totale du système            |

## Implémentation des notifications dans MCP

Pour implémenter les notifications dans MCP, vous devez préparer à la fois le serveur et le client pour gérer les mises à jour en temps réel. Cela permet à votre application de fournir un retour immédiat aux utilisateurs lors d’opérations longues.

### Côté serveur : envoyer des notifications

Commençons par le côté serveur. Dans MCP, vous définissez des outils qui peuvent envoyer des notifications pendant le traitement des requêtes. Le serveur utilise l’objet de contexte (généralement `ctx`) pour envoyer des messages au client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Dans l’exemple précédent, l’outil `process_files` envoie trois notifications au client au fur et à mesure du traitement de chaque fichier. La méthode `ctx.info()` est utilisée pour envoyer des messages d’information.

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

Dans cet exemple .NET, l’outil `ProcessFiles` est décoré avec l’attribut `Tool` et envoie trois notifications au client pendant le traitement de chaque fichier. La méthode `ctx.Info()` est utilisée pour envoyer des messages d'information.

Pour activer les notifications dans votre serveur MCP .NET, assurez-vous d’utiliser un transport en streaming :

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Côté client : recevoir les notifications

Le client doit implémenter un gestionnaire de messages pour traiter et afficher les notifications à mesure qu'elles arrivent.

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

Dans ce code, la fonction `message_handler` vérifie si le message entrant est une notification. Si oui, elle affiche cette notification ; sinon, elle le traite comme un message serveur classique. Notez également comment la `ClientSession` est initialisée avec le `message_handler` pour gérer les notifications entrantes.

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

Dans cet exemple .NET, la fonction `MessageHandler` vérifie si le message entrant est une notification. Si oui, elle affiche la notification ; sinon, elle la traite comme un message serveur normal. La `ClientSession` est initialisée avec le gestionnaire de messages via les `ClientSessionOptions`.

Pour activer les notifications, assurez-vous que votre serveur utilise un transport de streaming (comme `streamable-http`) et que votre client implémente un gestionnaire de messages pour traiter les notifications.

## Notifications de progression & scénarios

Cette section explique le concept de notifications de progression dans MCP, pourquoi elles sont importantes, et comment les implémenter avec Streamable HTTP. Vous trouverez aussi un exercice pratique pour renforcer votre compréhension.

Les notifications de progression sont des messages en temps réel envoyés du serveur au client pendant des opérations longues. Plutôt que d’attendre la fin complète du processus, le serveur tient le client informé de l’état actuel. Cela améliore la transparence, l’expérience utilisateur, et facilite le débogage.

**Exemple :**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Pourquoi utiliser les notifications de progression ?

Les notifications de progression sont essentielles pour plusieurs raisons :

- **Meilleure expérience utilisateur :** les utilisateurs voient les mises à jour au fur et à mesure que le travail avance, pas seulement à la fin.
- **Retour en temps réel :** les clients peuvent afficher des barres de progression ou des logs, rendant l’application plus réactive.
- **Débogage et surveillance facilités :** développeurs et utilisateurs peuvent voir où un processus est lent ou bloqué.

### Comment implémenter les notifications de progression

Voici comment vous pouvez implémenter les notifications de progression dans MCP :

- **Côté serveur :** Utilisez `ctx.info()` ou `ctx.log()` pour envoyer des notifications au fur et à mesure du traitement de chaque élément. Cela envoie un message au client avant que le résultat principal soit prêt.
- **Côté client :** Implémentez un gestionnaire de messages qui écoute et affiche les notifications à leur arrivée. Ce gestionnaire distingue entre notifications et résultat final.

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

**Exemple Client :**

#### Python

```python
async def message_handler(message):
    if isinstance(message, types.ServerNotification):
        print("NOTIFICATION:", message)
    else:
        print("SERVER MESSAGE:", message)
```

## Considérations de Sécurité

Lors de la mise en œuvre de serveurs MCP avec des transports basés sur HTTP, la sécurité devient une préoccupation majeure qui nécessite une attention particulière à plusieurs vecteurs d'attaque et mécanismes de protection.

### Vue d'ensemble

La sécurité est cruciale lors de l'exposition de serveurs MCP via HTTP. HTTP Streamable introduit de nouvelles surfaces d'attaque et nécessite une configuration rigoureuse.

### Points Clés

- **Validation de l'en-tête Origin** : Validez toujours l'en-tête `Origin` pour empêcher les attaques de rebinding DNS.
- **Liaison à localhost** : Pour le développement local, liez les serveurs à `localhost` pour éviter de les exposer à l'internet public.
- **Authentification** : Mettez en place une authentification (par exemple, clés API, OAuth) pour les déploiements en production.
- **CORS** : Configurez les politiques de Cross-Origin Resource Sharing (CORS) pour restreindre l'accès.
- **HTTPS** : Utilisez HTTPS en production pour chiffrer le trafic.

### Bonnes Pratiques

- Ne faites jamais confiance aux requêtes entrantes sans validation.
- Enregistrez et surveillez tous les accès et erreurs.
- Mettez régulièrement à jour les dépendances pour corriger les vulnérabilités de sécurité.

### Défis

- Trouver l'équilibre entre sécurité et facilité de développement
- Assurer la compatibilité avec divers environnements clients

## Passage de SSE à HTTP Streamable

Pour les applications utilisant actuellement Server-Sent Events (SSE), migrer vers HTTP Streamable offre des capacités améliorées et une meilleure durabilité à long terme pour vos implémentations MCP.

### Pourquoi mettre à jour ?

Il y a deux raisons convaincantes de passer de SSE à HTTP Streamable :

- HTTP Streamable offre une meilleure évolutivité, compatibilité et un support de notifications plus riche que SSE.
- C'est le transport recommandé pour les nouvelles applications MCP.

### Étapes de migration

Voici comment vous pouvez migrer de SSE à HTTP Streamable dans vos applications MCP :

- **Mettez à jour le code serveur** pour utiliser `transport="streamable-http"` dans `mcp.run()`.
- **Mettez à jour le code client** pour utiliser `streamablehttp_client` à la place du client SSE.
- **Implémentez un gestionnaire de messages** dans le client pour traiter les notifications.
- **Testez la compatibilité** avec les outils et flux de travail existants.

### Maintien de la compatibilité

Il est recommandé de maintenir la compatibilité avec les clients SSE existants pendant le processus de migration. Voici quelques stratégies :

- Vous pouvez supporter à la fois SSE et HTTP Streamable en exécutant les deux transports sur différents points de terminaison.
- Migrez progressivement les clients vers le nouveau transport.

### Défis

Assurez-vous d'aborder les défis suivants lors de la migration :

- Veiller à ce que tous les clients soient mis à jour
- Gérer les différences dans la livraison des notifications

## Considérations de Sécurité

La sécurité doit être une priorité absolue lors de la mise en œuvre de tout serveur, en particulier lors de l'utilisation de transports basés sur HTTP comme HTTP Streamable dans MCP.

Lors de la mise en œuvre de serveurs MCP avec des transports basés sur HTTP, la sécurité devient une préoccupation majeure qui nécessite une attention particulière à plusieurs vecteurs d'attaque et mécanismes de protection.

### Vue d'ensemble

La sécurité est cruciale lors de l'exposition de serveurs MCP via HTTP. HTTP Streamable introduit de nouvelles surfaces d'attaque et nécessite une configuration rigoureuse.

Voici quelques considérations clés en matière de sécurité :

- **Validation de l'en-tête Origin** : Validez toujours l'en-tête `Origin` pour empêcher les attaques de rebinding DNS.
- **Liaison à localhost** : Pour le développement local, liez les serveurs à `localhost` pour éviter de les exposer à l'internet public.
- **Authentification** : Mettez en place une authentification (par exemple, clés API, OAuth) pour les déploiements en production.
- **CORS** : Configurez les politiques de Cross-Origin Resource Sharing (CORS) pour restreindre l'accès.
- **HTTPS** : Utilisez HTTPS en production pour chiffrer le trafic.

### Bonnes Pratiques

De plus, voici quelques bonnes pratiques à suivre lors de la mise en œuvre de la sécurité dans votre serveur de streaming MCP :

- Ne faites jamais confiance aux requêtes entrantes sans validation.
- Enregistrez et surveillez tous les accès et erreurs.
- Mettez régulièrement à jour les dépendances pour corriger les vulnérabilités de sécurité.

### Défis

Vous ferez face à certains défis lors de la mise en œuvre de la sécurité dans les serveurs de streaming MCP :

- Trouver l'équilibre entre sécurité et facilité de développement
- Assurer la compatibilité avec divers environnements clients

### Exercice : Construisez votre propre application MCP en streaming

**Scénario :**
Construisez un serveur et un client MCP où le serveur traite une liste d’éléments (par exemple des fichiers ou documents) et envoie une notification pour chaque élément traité. Le client doit afficher chaque notification à son arrivée.

**Étapes :**

1. Implémentez un outil serveur qui traite une liste et envoie des notifications pour chaque élément.
2. Implémentez un client avec un gestionnaire de messages pour afficher les notifications en temps réel.
3. Testez votre implémentation en exécutant à la fois le serveur et le client, et observez les notifications.

[Solution](./solution/README.md)

## Lectures complémentaires & Étapes suivantes

Pour poursuivre votre parcours avec le streaming MCP et étendre vos connaissances, cette section fournit des ressources supplémentaires et des suggestions d’étapes suivantes pour construire des applications plus avancées.

### Lectures complémentaires

- [Microsoft : Introduction au streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft : Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft : CORS dans ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests : Requêtes en streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Étapes suivantes

- Essayez de construire des outils MCP plus avancés qui utilisent le streaming pour des analyses en temps réel, la messagerie ou l’édition collaborative.
- Explorez l’intégration du streaming MCP avec des frameworks frontend (React, Vue, etc.) pour des mises à jour UI en direct.
- Suivant : [Utilisation de la boîte à outils IA pour VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->