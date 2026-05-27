# HTTPS Streaming avec le Model Context Protocol (MCP)

Ce chapitre fournit un guide complet pour mettre en œuvre un streaming sécurisé, évolutif et en temps réel avec le Model Context Protocol (MCP) utilisant HTTPS. Il couvre la motivation pour le streaming, les mécanismes de transport disponibles, comment implémenter HTTP streamable dans MCP, les meilleures pratiques de sécurité, la migration depuis SSE, et des conseils pratiques pour construire vos propres applications MCP en streaming.

## Mécanismes de Transport et Streaming dans MCP

Cette section explore les différents mécanismes de transport disponibles dans MCP et leur rôle dans l’activation des capacités de streaming pour la communication en temps réel entre clients et serveurs.

### Qu’est-ce qu’un Mécanisme de Transport ?

Un mécanisme de transport définit comment les données sont échangées entre le client et le serveur. MCP supporte plusieurs types de transport pour convenir à différents environnements et besoins :

- **stdio** : Entrée/sortie standard, adapté aux outils locaux et basés sur la ligne de commande. Simple mais non adapté au web ou au cloud.
- **SSE (Server-Sent Events)** : Permet aux serveurs d’envoyer des mises à jour en temps réel aux clients via HTTP. Bon pour les interfaces web, mais limité en évolutivité et flexibilité. Depuis la spécification MCP 2025-06-18, le transport SSE autonome (Server-Sent Events) a été déprécié et remplacé par le transport "Streamable HTTP".
- **Streamable HTTP** : Transport de streaming moderne basé sur HTTP, supportant les notifications et une meilleure évolutivité. Recommandé pour la plupart des scénarios en production et cloud.

### Tableau de Comparaison

Voici un tableau comparatif pour comprendre les différences entre ces mécanismes de transport :

| Transport         | Mises à jour en temps réel | Streaming | Évolutivité | Cas d’usage             |
|-------------------|----------------------------|-----------|-------------|------------------------|
| stdio             | Non                        | Non       | Faible      | Outils CLI locaux       |
| SSE               | Oui                        | Oui       | Moyenne     | Web, mises à jour temps réel |
| Streamable HTTP   | Oui                        | Oui       | Élevée      | Cloud, multi-clients    |

> **Astuce :** Choisir le bon transport impacte les performances, l’évolutivité et l’expérience utilisateur. **Streamable HTTP** est recommandé pour des applications modernes, évolutives et prêtes pour le cloud.

Notez les transports stdio et SSE présentés dans les chapitres précédents et comment Streamable HTTP est le transport abordé dans ce chapitre.

## Streaming : Concepts et Motivation

Comprendre les concepts fondamentaux et la motivation derrière le streaming est essentiel pour implémenter des systèmes de communication en temps réel efficaces.

Le **streaming** est une technique en programmation réseau qui permet d’envoyer et recevoir des données en petits morceaux gérables ou comme une séquence d’événements, plutôt que d’attendre que toute la réponse soit prête. Ceci est particulièrement utile pour :

- Les gros fichiers ou ensembles de données.
- Les mises à jour en temps réel (p. ex., chat, barres de progression).
- Les calculs longs où l’on souhaite tenir l’utilisateur informé.

Voici ce que vous devez savoir sur le streaming à un niveau général :

- Les données sont livrées de façon progressive, pas d’un coup.
- Le client peut traiter les données au fur et à mesure de leur arrivée.
- Réduit la latence perçue et améliore l’expérience utilisateur.

### Pourquoi utiliser le streaming ?

Les raisons d’utiliser le streaming sont les suivantes :

- Les utilisateurs reçoivent un retour immédiatement, pas seulement à la fin
- Permet des applications temps réel et des interfaces réactives
- Utilisation plus efficace des ressources réseau et de calcul

### Exemple Simple : Serveur & Client HTTP en Streaming

Voici un exemple simple montrant comment le streaming peut être implémenté :

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

Cet exemple montre un serveur envoyant une série de messages au client au fur et à mesure qu’ils sont disponibles, plutôt que d’attendre que tous les messages soient prêts.

**Comment cela fonctionne :**

- Le serveur émet chaque message dès qu’il est prêt.
- Le client reçoit et affiche chaque morceau dès son arrivée.

**Exigences :**

- Le serveur doit utiliser une réponse en streaming (par exemple, `StreamingResponse` dans FastAPI).
- Le client doit traiter la réponse comme un flux (`stream=True` dans requests).
- Le type de contenu est généralement `text/event-stream` ou `application/octet-stream`.

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

- Utilise la pile réactive Spring Boot avec `Flux` pour le streaming
- `ServerSentEvent` fournit un streaming d’événements structuré avec des types d’événements
- `WebClient` avec `bodyToFlux()` permet de consommer le streaming de façon réactive
- `delayElements()` simule un temps de traitement entre les événements
- Les événements peuvent avoir des types (`info`, `result`) pour une meilleure gestion côté client

### Comparaison : Streaming Classique vs Streaming MCP

Les différences entre la manière dont le streaming fonctionne de manière « classique » versus dans MCP peuvent être illustrées ainsi :

| Fonctionnalité          | Streaming HTTP Classique      | Streaming MCP (Notifications)    |
|------------------------|------------------------------|---------------------------------|
| Réponse principale     | En morceaux (chunked)         | Unique, à la fin                |
| Mises à jour de progression | Envoyées en morceaux de données | Envoyées sous forme de notifications |
| Exigences côté client  | Doit traiter le flux           | Doit implémenter un gestionnaire de messages |
| Cas d’usage            | Gros fichiers, flux de jetons IA | Progression, journaux, retours temps réel |

### Différences Clés Observées

En plus, voici quelques différences clés :

- **Schéma de communication :**
  - Streaming HTTP classique : utilisation du transfert par morceaux (chunked) pour envoyer des données en morceaux
  - Streaming MCP : système structuré de notifications avec protocole JSON-RPC

- **Format des messages :**
  - HTTP classique : morceaux de texte brut avec des retours à la ligne
  - MCP : objets LoggingMessageNotification structurés avec métadonnées

- **Implémentation client :**
  - HTTP classique : client simple qui traite la réponse en streaming
  - MCP : client plus sophistiqué avec gestionnaire de messages pour traiter différents types de messages

- **Mises à jour de progression :**
  - HTTP classique : la progression fait partie du flux principal
  - MCP : la progression est envoyée via des messages de notification séparés tandis que la réponse principale vient à la fin

### Recommandations

Voici quelques recommandations concernant le choix entre implémenter un streaming classique (comme un endpoint montré ci-dessus utilisant `/stream`) versus un streaming via MCP.

- **Pour des besoins simples en streaming :** Le streaming HTTP classique est plus simple à implémenter et suffisant pour les besoins basiques.

- **Pour des applications complexes et interactives :** Le streaming MCP offre une approche plus structurée avec des métadonnées plus riches et une séparation claire entre notifications et résultats finaux.

- **Pour les applications IA :** Le système de notifications MCP est particulièrement utile pour les tâches IA de longue durée où l’on souhaite tenir les utilisateurs informés de la progression.

## Streaming dans MCP

Vous avez vu jusqu’ici des recommandations et comparaisons entre streaming classique et streaming dans MCP. Entrons maintenant dans le détail de la manière dont vous pouvez exploiter le streaming dans MCP.

Comprendre comment le streaming fonctionne dans le cadre MCP est essentiel pour construire des applications réactives qui fournissent un retour en temps réel aux utilisateurs lors d’opérations longues.

Dans MCP, le streaming ne consiste pas à envoyer la réponse principale en morceaux, mais à envoyer des **notifications** au client pendant qu’un outil traite une requête. Ces notifications peuvent inclure des mises à jour de progression, des journaux ou d’autres événements.

### Comment cela fonctionne

Le résultat principal est toujours envoyé sous forme d’une seule réponse. Cependant, des notifications peuvent être envoyées en messages séparés pendant le traitement et ainsi mettre à jour le client en temps réel. Le client doit pouvoir gérer et afficher ces notifications.

## Qu’est-ce qu’une Notification ?

Nous avons parlé de « Notification », que signifie ce terme dans le contexte de MCP ?

Une notification est un message envoyé du serveur au client pour informer de la progression, du statut, ou d’autres événements durant une opération longue. Les notifications améliorent la transparence et l’expérience utilisateur.

Par exemple, un client est censé envoyer une notification une fois le handshake initial avec le serveur réalisé.

Une notification ressemble à ceci dans un message JSON :

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

Pour que la journalisation fonctionne, le serveur doit l’activer comme fonctionnalité/capacité ainsi :

```json
{
  "capabilities": {
    "logging": {}
  }
}
```

> [!NOTE]
> Selon le SDK utilisé, la journalisation peut être activée par défaut ou vous devrez explicitement l’activer dans la configuration de votre serveur.

Il existe différents types de notifications :

| Niveau     | Description                    | Exemple d’usage              |
|------------|-------------------------------|-----------------------------|
| debug      | Informations détaillées pour débogage | Points d’entrée/sortie de fonction |
| info       | Messages d’information générale | Mises à jour de progression |
| notice     | Événements normaux mais significatifs | Changements de configuration   |
| warning    | Conditions d’avertissement     | Utilisation de fonction dépréciée |
| error      | Conditions d’erreur            | Échecs d’opération           |
| critical   | Conditions critiques           | Pannes de composants système |
| alert      | Action immédiate requise       | Corruption de données détectée |
| emergency  | Système inutilisable           | Panne complète du système    |

## Implémenter des Notifications dans MCP

Pour implémenter des notifications dans MCP, vous devez configurer à la fois le serveur et le client pour gérer les mises à jour en temps réel. Cela permet à votre application de fournir un retour immédiat aux utilisateurs lors d’opérations longues.

### Côté Serveur : Envoi des Notifications

Commençons par le côté serveur. Dans MCP, vous définissez des outils pouvant envoyer des notifications pendant le traitement des requêtes. Le serveur utilise l’objet de contexte (souvent `ctx`) pour envoyer des messages au client.

#### Python

```python
@mcp.tool(description="A tool that sends progress notifications")
async def process_files(message: str, ctx: Context) -> TextContent:
    await ctx.info("Processing file 1/3...")
    await ctx.info("Processing file 2/3...")
    await ctx.info("Processing file 3/3...")
    return TextContent(type="text", text=f"Done: {message}")
```

Dans l’exemple précédent, l’outil `process_files` envoie trois notifications au client pendant le traitement de chaque fichier. La méthode `ctx.info()` est utilisée pour envoyer des messages d’information.

De plus, pour activer les notifications, assurez-vous que votre serveur utilise un transport en streaming (comme `streamable-http`) et que votre client implémente un gestionnaire de messages pour traiter les notifications. Voici comment configurer le serveur pour utiliser le transport `streamable-http` :

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

Dans cet exemple .NET, l’outil `ProcessFiles` est décoré avec l’attribut `Tool` et envoie trois notifications au client pendant le traitement de chaque fichier. La méthode `ctx.Info()` est utilisée pour envoyer des messages d’information.

Pour activer les notifications dans votre serveur MCP .NET, assurez-vous d’utiliser un transport en streaming :

```csharp
var builder = McpBuilder.Create();
await builder
    .UseStreamableHttp() // Enable streamable HTTP transport
    .Build()
    .RunAsync();
```

### Côté Client : Réception des Notifications

Le client doit implémenter un gestionnaire de messages pour traiter et afficher les notifications au fur et à mesure de leur arrivée.

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

Dans ce code, la fonction `message_handler` vérifie si le message entrant est une notification. Si c’est le cas, elle affiche la notification ; sinon, elle la traite comme un message serveur classique. Notez aussi comment `ClientSession` est initialisé avec `message_handler` pour gérer les notifications entrantes.

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

Dans cet exemple .NET, la fonction `MessageHandler` vérifie si le message entrant est une notification. Si oui, elle affiche la notification ; sinon, elle la traite comme un message serveur classique. Le `ClientSession` est initialisé avec le gestionnaire de messages via `ClientSessionOptions`.

Pour activer les notifications, assurez-vous que votre serveur utilise un transport en streaming (comme `streamable-http`) et que votre client implémente un gestionnaire de messages pour traiter les notifications.

## Notifications de Progression & Scénarios

Cette section explique le concept de notifications de progression dans MCP, pourquoi elles sont importantes, et comment les implémenter avec Streamable HTTP. Vous trouverez aussi un exercice pratique pour renforcer votre compréhension.

Les notifications de progression sont des messages en temps réel envoyés du serveur au client pendant des opérations longues. Plutôt que d’attendre la fin du processus, le serveur tient le client informé de l’état actuel. Cela améliore la transparence, l’expérience utilisateur et facilite le débogage.

**Exemple :**

```text

"Processing document 1/10"
"Processing document 2/10"
...
"Processing complete!"

```

### Pourquoi utiliser les notifications de progression ?

Les notifications de progression sont essentielles pour plusieurs raisons :

- **Meilleure expérience utilisateur :** Les utilisateurs voient les mises à jour au fur et à mesure de l’avancement du travail, pas seulement à la fin.
- **Retour en temps réel :** Les clients peuvent afficher des barres de progression ou des journaux, ce qui rend l’application plus réactive.
- **Débogage et surveillance facilités :** Les développeurs et utilisateurs peuvent voir où un processus pourrait ralentir ou être bloqué.

### Comment implémenter les notifications de progression

Voici comment implémenter les notifications de progression dans MCP :

- **Côté serveur :** Utilisez `ctx.info()` ou `ctx.log()` pour envoyer des notifications à chaque élément traité. Cela envoie un message au client avant que le résultat principal soit prêt.
- **Côté client :** Implémentez un gestionnaire de messages qui écoute et affiche les notifications à leur arrivée. Ce gestionnaire distingue notifications et résultat final.

**Exemple Serveur :**

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

Lors de l’implémentation de serveurs MCP avec des transports basés sur HTTP, la sécurité devient un enjeu primordial nécessitant une attention particulière à plusieurs vecteurs d’attaque et mécanismes de protection.

### Vue d’ensemble

La sécurité est critique quand on expose des serveurs MCP via HTTP. Streamable HTTP introduit de nouvelles surfaces d’attaque qui exigent une configuration prudente.

### Points Clés

- **Validation de l’en-tête Origin** : Toujours valider l’en-tête `Origin` pour éviter les attaques de rebinding DNS.
- **Binding sur localhost** : Pour le développement local, lier les serveurs à `localhost` afin d’éviter leur exposition sur Internet public.
- **Authentification** : Implémentez une authentification (ex. clés API, OAuth) pour les déploiements en production.
- **CORS** : Configurez les politiques Cross-Origin Resource Sharing (CORS) pour restreindre l’accès.
- **HTTPS** : Utilisez HTTPS en production pour chiffrer le trafic.

### Meilleures Pratiques

- Ne jamais faire confiance aux requêtes entrantes sans validation.
- Journalisez et monitorisez tous les accès et erreurs.
- Mettez régulièrement à jour les dépendances pour corriger les vulnérabilités.

### Défis
- Équilibrer la sécurité avec la facilité de développement
- Assurer la compatibilité avec divers environnements clients

## Passage de SSE à Streamable HTTP

Pour les applications actuellement utilisant les Server-Sent Events (SSE), migrer vers Streamable HTTP offre des capacités améliorées et une meilleure durabilité à long terme pour vos implémentations MCP.

### Pourquoi migrer ?

Il y a deux raisons convaincantes de migrer de SSE vers Streamable HTTP :

- Streamable HTTP offre une meilleure évolutivité, compatibilité et un support plus riche des notifications que SSE.
- C’est le transport recommandé pour les nouvelles applications MCP.

### Étapes de migration

Voici comment vous pouvez migrer de SSE à Streamable HTTP dans vos applications MCP :

- **Mettre à jour le code serveur** pour utiliser `transport="streamable-http"` dans `mcp.run()`.
- **Mettre à jour le code client** pour utiliser `streamablehttp_client` à la place du client SSE.
- **Implémenter un gestionnaire de messages** dans le client pour traiter les notifications.
- **Tester la compatibilité** avec les outils et flux de travail existants.

### Maintien de la compatibilité

Il est recommandé de maintenir la compatibilité avec les clients SSE existants pendant le processus de migration. Voici quelques stratégies :

- Vous pouvez supporter à la fois SSE et Streamable HTTP en exécutant les deux transports sur des points d’accès différents.
- Migrer progressivement les clients vers le nouveau transport.

### Défis

Assurez-vous de relever les défis suivants lors de la migration :

- Assurer que tous les clients sont mis à jour
- Gérer les différences dans la livraison des notifications

## Considérations de sécurité

La sécurité doit être une priorité absolue lors de l’implémentation de tout serveur, en particulier lorsqu’on utilise des transports basés sur HTTP comme Streamable HTTP dans MCP.

Lors de l’implémentation des serveurs MCP avec des transports HTTP, la sécurité devient un enjeu primordial nécessitant une attention particulière aux multiples vecteurs d’attaque et mécanismes de protection.

### Vue d’ensemble

La sécurité est critique lors de l’exposition des serveurs MCP via HTTP. Streamable HTTP introduit de nouvelles surfaces d’attaque et nécessite une configuration rigoureuse.

Voici quelques considérations clés de sécurité :

- **Validation de l’en-tête Origin** : Toujours valider l’en-tête `Origin` pour prévenir les attaques de rebinding DNS.
- **Binding localhost** : Pour le développement local, lier les serveurs à `localhost` pour éviter l’exposition à internet public.
- **Authentification** : Implémenter une authentification (par exemple, clés API, OAuth) pour les déploiements en production.
- **CORS** : Configurer les politiques de Cross-Origin Resource Sharing (CORS) pour restreindre l’accès.
- **HTTPS** : Utiliser HTTPS en production pour chiffrer le trafic.

### Bonnes pratiques

De plus, voici quelques bonnes pratiques à suivre lors de l’implémentation de la sécurité dans votre serveur de streaming MCP :

- Ne jamais faire confiance aux requêtes entrantes sans validation.
- Journaliser et surveiller tous les accès et erreurs.
- Mettre régulièrement à jour les dépendances pour corriger les vulnérabilités de sécurité.

### Défis

Vous ferez face à quelques défis en implémentant la sécurité dans les serveurs de streaming MCP :

- Équilibrer la sécurité avec la facilité de développement
- Assurer la compatibilité avec divers environnements clients

### Exercice : Construisez votre propre application MCP streaming

**Scénario :**
Construisez un serveur et un client MCP où le serveur traite une liste d’éléments (par exemple, fichiers ou documents) et envoie une notification pour chaque élément traité. Le client doit afficher chaque notification à son arrivée.

**Étapes :**

1. Implémentez un outil serveur qui traite une liste et envoie des notifications pour chaque élément.
2. Implémentez un client avec un gestionnaire de messages pour afficher les notifications en temps réel.
3. Testez votre implémentation en lançant le serveur et le client, et observez les notifications.

[Solution](./solution/README.md)

## Lectures complémentaires & Étapes suivantes

Pour poursuivre votre parcours avec le streaming MCP et étendre vos connaissances, cette section fournit des ressources supplémentaires et des étapes suggérées pour construire des applications plus avancées.

### Lectures complémentaires

- [Microsoft : Introduction au streaming HTTP](https://learn.microsoft.com/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430#streaming)
- [Microsoft : Server-Sent Events (SSE)](https://learn.microsoft.com/azure/application-gateway/for-containers/server-sent-events?tabs=server-sent-events-gateway-api&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Microsoft : CORS dans ASP.NET Core](https://learn.microsoft.com/aspnet/core/security/cors?view=aspnetcore-8.0&WT.mc_id=%3Fwt.mc_id%3DMVP_452430)
- [Python requests : Requêtes en streaming](https://requests.readthedocs.io/en/latest/user/advanced/#streaming-requests)

### Étapes suivantes

- Essayez de construire des outils MCP plus avancés utilisant le streaming pour des analyses en temps réel, des chats ou de l’édition collaborative.
- Explorez l’intégration du streaming MCP avec des frameworks frontend (React, Vue, etc.) pour des mises à jour live de l’interface utilisateur.
- Suivant : [Utilisation de AI Toolkit pour VSCode](../07-aitk/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->