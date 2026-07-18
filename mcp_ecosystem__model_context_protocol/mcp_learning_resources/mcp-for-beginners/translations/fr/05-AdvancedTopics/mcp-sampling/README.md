> [DÉPRÉCIÉ : CANDIDAT À LA VERSION DU 28-07-2026](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Échantillonnage dans le Model Context Protocol

> **Avis de dépréciation :** le candidat à la spécification MCP `2026-07-28` marque l’échantillonnage comme déprécié au profit d’une intégration directe avec les API des fournisseurs LLM. L’échantillonnage continue de fonctionner dans `2025-11-25` et pendant au moins un an après toute dépréciation formelle, donc tout ce qui est dans cette leçon reste valide — mais les nouvelles conceptions de serveur devraient évaluer le modèle de remplacement. Voir [Ce qui change dans MCP : Le candidat à la version du 28-07-2026](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

L’échantillonnage est une fonctionnalité puissante du MCP qui permet aux serveurs de demander des complétions LLM via le client, permettant des comportements agentiques sophistiqués tout en maintenant la sécurité et la confidentialité. La bonne configuration de l’échantillonnage peut améliorer considérablement la qualité des réponses et les performances. MCP fournit une méthode standardisée pour contrôler la manière dont les modèles génèrent du texte avec des paramètres spécifiques influençant l’aléatoire, la créativité et la cohérence.

## Introduction

Dans cette leçon, nous explorerons comment configurer les paramètres d’échantillonnage dans les requêtes MCP et comprendre les mécanismes sous-jacents du protocole d’échantillonnage.

## Objectifs d’apprentissage

À la fin de cette leçon, vous serez capable de :

- Comprendre les principaux paramètres d’échantillonnage disponibles dans MCP.
- Configurer les paramètres d’échantillonnage pour différents cas d’usage.
- Mettre en œuvre un échantillonnage déterministe pour des résultats reproductibles.
- Ajuster dynamiquement les paramètres d’échantillonnage en fonction du contexte et des préférences des utilisateurs.
- Appliquer des stratégies d’échantillonnage pour améliorer les performances du modèle dans divers scénarios.
- Comprendre comment l’échantillonnage fonctionne dans le flux client-serveur de MCP.

## Fonctionnement de l’échantillonnage dans MCP

Le flux d’échantillonnage dans MCP suit ces étapes :

1. Le serveur envoie une requête `sampling/createMessage` au client
2. Le client examine la requête et peut la modifier
3. Le client effectue un échantillonnage depuis un LLM
4. Le client examine la complétion
5. Le client retourne le résultat au serveur

Ce design avec intervention humaine assure que les utilisateurs gardent le contrôle sur ce que le LLM voit et génère.

## Aperçu des paramètres d’échantillonnage

MCP définit les paramètres d’échantillonnage suivants qui peuvent être configurés dans les requêtes client :

| Paramètre | Description | Plage typique |
|-----------|-------------|---------------|
| `temperature` | Contrôle l’aléatoire dans la sélection des tokens | 0.0 - 1.0 |
| `maxTokens` | Nombre maximum de tokens à générer | Valeur entière |
| `stopSequences` | Séquences personnalisées qui arrêtent la génération lorsqu'elles sont rencontrées | Tableau de chaînes |
| `metadata` | Paramètres supplémentaires spécifiques au fournisseur | Objet JSON |

De nombreux fournisseurs LLM supportent des paramètres additionnels via le champ `metadata`, qui peuvent inclure :

| Paramètre d’extension courant | Description | Plage typique |
|-----------|-------------|---------------|
| `top_p` | Échantillonnage nucléaire - limite les tokens à la probabilité cumulative supérieure | 0.0 - 1.0 |
| `top_k` | Limite la sélection aux K premières options | 1 - 100 |
| `presence_penalty` | Pénalise les tokens en fonction de leur présence dans le texte précédent | -2.0 - 2.0 |
| `frequency_penalty` | Pénalise les tokens en fonction de leur fréquence dans le texte précédent | -2.0 - 2.0 |
| `seed` | Graine aléatoire spécifique pour des résultats reproductibles | Valeur entière |

## Exemple de format de requête

Voici un exemple de requête d’échantillonnage d’un client dans MCP :

```json
{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

## Format de réponse

Le client retourne un résultat de complétion :

```json
{
  "model": "string",  // Name of the model used
  "stopReason": "endTurn" | "stopSequence" | "maxTokens" | "string",
  "role": "assistant",
  "content": {
    "type": "text",
    "text": "string"
  }
}
```

## Contrôles avec intervention humaine

L’échantillonnage MCP est conçu avec une supervision humaine en tête :

- **Pour les prompts** :
  - Les clients doivent montrer aux utilisateurs le prompt proposé
  - Les utilisateurs doivent pouvoir modifier ou rejeter les prompts
  - Les prompts système peuvent être filtrés ou modifiés
  - L’inclusion du contexte est contrôlée par le client

- **Pour les complétions** :
  - Les clients doivent montrer aux utilisateurs la complétion
  - Les utilisateurs doivent pouvoir modifier ou rejeter les complétions
  - Les clients peuvent filtrer ou modifier les complétions
  - Les utilisateurs contrôlent le modèle utilisé

Avec ces principes en tête, voyons comment implémenter l’échantillonnage dans différents langages de programmation, en se concentrant sur les paramètres communément supportés par les fournisseurs LLM.

## Considérations de sécurité

Lors de l’implémentation de l’échantillonnage dans MCP, considérez ces bonnes pratiques de sécurité :

- **Valider tout le contenu des messages** avant de l’envoyer au client
- **Nettoyer les informations sensibles** des prompts et complétions
- **Mettre en place des limites de taux** pour prévenir les abus
- **Surveiller l’utilisation de l’échantillonnage** pour détecter des schémas inhabituels
- **Chiffrer les données en transit** en utilisant des protocoles sécurisés
- **Gérer la confidentialité des données utilisateur** selon les réglementations pertinentes
- **Auditer les requêtes d’échantillonnage** pour conformité et sécurité
- **Contrôler l’exposition aux coûts** avec des limites appropriées
- **Mettre en place des délais d’expiration** pour les requêtes d’échantillonnage
- **Gérer les erreurs du modèle avec souplesse** via des solutions de repli adaptées

Les paramètres d’échantillonnage permettent de peaufiner le comportement des modèles linguistiques pour atteindre un équilibre désiré entre sorties déterministes et créatives.

Voyons comment configurer ces paramètres dans différents langages de programmation.

# [.NET](#tab-dotnet)

```csharp
// .NET Example: Configuring sampling parameters in MCP
public class SamplingExample
{
    public async Task RunWithSamplingAsync()
    {
        // Create MCP client with sampling configuration
        var client = new McpClient("https://mcp-server-url.com");
        
        // Create request with specific sampling parameters
        var request = new McpRequest
        {
            Prompt = "Generate creative ideas for a mobile app",
            SamplingParameters = new SamplingParameters
            {
                Temperature = 0.8f,     // Higher temperature for more creative outputs
                TopP = 0.95f,           // Nucleus sampling parameter
                TopK = 40,              // Limit token selection to top K options
                FrequencyPenalty = 0.5f, // Reduce repetition
                PresencePenalty = 0.2f   // Encourage diversity
            },
            AllowedTools = new[] { "ideaGenerator", "marketAnalyzer" }
        };
        
        // Send request using specific sampling configuration
        var response = await client.SendRequestAsync(request);
        
        // Output results
        Console.WriteLine($"Generated with Temperature={request.SamplingParameters.Temperature}:");
        Console.WriteLine(response.GeneratedText);
    }
}
```

Dans le code précédent, nous avons :

- Créé un client MCP avec une URL de serveur spécifique.
- Configuré une requête avec des paramètres d’échantillonnage tels que `temperature`, `top_p` et `top_k`.
- Envoyé la requête et affiché le texte généré.
- Utilisé :
    - `allowedTools` pour spécifier quelles outils le modèle peut utiliser durant la génération. Dans ce cas, nous avons autorisé les outils `ideaGenerator` et `marketAnalyzer` pour aider à générer des idées d’applications créatives.
    - `frequencyPenalty` et `presencePenalty` pour contrôler la répétition et la diversité dans la sortie.
    - `temperature` pour contrôler l’aléatoire de la sortie, où des valeurs plus élevées donnent des réponses plus créatives.
    - `top_p` pour limiter la sélection des tokens à ceux qui contribuent à la masse de probabilité cumulative supérieure, améliorant la qualité du texte généré.
    - `top_k` pour restreindre le modèle aux K tokens les plus probables, ce qui peut aider à générer des réponses plus cohérentes.
    - `frequencyPenalty` et `presencePenalty` pour réduire la répétition et encourager la diversité dans le texte généré.

# [JavaScript](#tab/javascript)

```javascript
// Exemple JavaScript : configuration de la température et de l'échantillonnage Top-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Initialiser le client MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Configurer la requête avec différents paramètres d'échantillonnage
  const creativeSampling = {
    temperature: 0.9,    // Température plus élevée = plus d'aléatoire/créativité
    topP: 0.92,          // Considérer les tokens avec une masse de probabilité de 92 % au sommet
    frequencyPenalty: 0.6, // Réduire la répétition des séquences de tokens
    presencePenalty: 0.4   // Pénaliser les tokens déjà apparus dans le texte jusqu'à présent
  };
  
  const factualSampling = {
    temperature: 0.2,    // Température plus basse = plus déterministe/factuelle
    topP: 0.85,          // Sélection de tokens légèrement plus ciblée
    frequencyPenalty: 0.2, // Pénalité minime de répétition
    presencePenalty: 0.1   // Pénalité minime de présence
  };
  
  try {
    // Envoyer deux requêtes avec différentes configurations d'échantillonnage
    const creativeResponse = await client.sendPrompt(
      "Generate innovative ideas for sustainable urban transportation",
      {
        allowedTools: ['ideaGenerator', 'environmentalImpactTool'],
        ...creativeSampling
      }
    );
    
    const factualResponse = await client.sendPrompt(
      "Explain how electric vehicles impact carbon emissions",
      {
        allowedTools: ['factChecker', 'dataAnalysisTool'],
        ...factualSampling
      }
    );
    
    console.log('Creative Response (temperature=0.9):');
    console.log(creativeResponse.generatedText);
    
    console.log('\nFactual Response (temperature=0.2):');
    console.log(factualResponse.generatedText);
    
  } catch (error) {
    console.error('Error demonstrating sampling:', error);
  }
}

demonstrateSampling();
```

Dans le code précédent, nous avons :

- Initialisé un client MCP avec une URL de serveur et une clé API.
- Configuré deux ensembles de paramètres d’échantillonnage : un pour les tâches créatives et un autre pour les tâches factuelles.
- Envoyé des requêtes avec ces configurations, permettant au modèle d’utiliser des outils spécifiques à chaque tâche.
- Affiché les réponses générées pour démontrer les effets des différents paramètres d’échantillonnage.
- Utilisé `allowedTools` pour spécifier quels outils le modèle peut utiliser durant la génération. Dans ce cas, nous avons autorisé `ideaGenerator` et `environmentalImpactTool` pour les tâches créatives, et `factChecker` et `dataAnalysisTool` pour les tâches factuelles.
- Utilisé `temperature` pour contrôler l’aléatoire de la sortie, où des valeurs plus élevées donnent des réponses plus créatives.
- Utilisé `top_p` pour limiter la sélection des tokens à ceux qui contribuent à la masse de probabilité cumulative supérieure, améliorant la qualité du texte généré.
- Utilisé `frequencyPenalty` et `presencePenalty` pour réduire la répétition et encourager la diversité dans la sortie.
- Utilisé `top_k` pour restreindre le modèle aux K tokens les plus probables, ce qui peut aider à générer des réponses plus cohérentes.

---

## Échantillonnage déterministe

Pour les applications nécessitant des résultats cohérents, l’échantillonnage déterministe garantit des résultats reproductibles. Cela se fait en utilisant une graine aléatoire fixe et en réglant la température à zéro.

Voyons ci-dessous un exemple d’implémentation pour démontrer l’échantillonnage déterministe dans différents langages de programmation.

# [Java](#tab/java)

```java
// Exemple Java : Réponses déterministes avec graine fixe
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Utilisation d'une graine fixe pour des résultats déterministes
        
        // Première requête avec graine fixe
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Température zéro pour un maximum de déterminisme
            .build();
            
        // Deuxième requête avec la même graine
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Exécuter les deux requêtes
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Les réponses doivent être identiques en raison de la même graine et température=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Dans le code précédent, nous avons :

- Créé un client MCP avec une URL de serveur spécifiée.
- Configuré deux requêtes avec le même prompt, une graine fixe et une température nulle.
- Envoyé les deux requêtes et affiché le texte généré.
- Montré que les réponses sont identiques grâce à la nature déterministe de la configuration d’échantillonnage (même graine et température).
- Utilisé `setSeed` pour spécifier une graine aléatoire fixe, garantissant que le modèle génère la même sortie pour la même entrée à chaque fois.
- Réglé la `temperature` à zéro pour assurer un maximum de déterminisme, ce qui signifie que le modèle choisira toujours le token suivant le plus probable sans aléatoire.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Exemple JavaScript : Réponses déterministes avec contrôle de la graine
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Première requête avec graine fixe
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Température zéro pour un maximum de déterminisme
    });
    
    // Deuxième requête avec même graine et température
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Troisième requête avec graine différente mais même température
    const response3 = await client.sendPrompt(prompt, {
      seed: 67890,
      temperature: 0.0
    });
    
    console.log('Response 1:', response1.generatedText);
    console.log('Response 2:', response2.generatedText);
    console.log('Response 3:', response3.generatedText);
    console.log('Responses 1 and 2 match:', response1.generatedText === response2.generatedText);
    console.log('Responses 1 and 3 match:', response1.generatedText === response3.generatedText);
    
  } catch (error) {
    console.error('Error in deterministic sampling demo:', error);
  }
}

deterministicSampling();
```

Dans le code précédent, nous avons :

- Initialisé un client MCP avec une URL de serveur.
- Configuré deux requêtes avec le même prompt, une graine fixe et une température nulle.
- Envoyé les deux requêtes et affiché le texte généré.
- Montré que les réponses sont identiques grâce à la nature déterministe de la configuration d’échantillonnage (même graine et température).
- Utilisé `seed` pour spécifier une graine aléatoire fixe, garantissant que le modèle génère la même sortie pour la même entrée à chaque fois.
- Réglé la `temperature` à zéro pour assurer un maximum de déterminisme, ce qui signifie que le modèle choisira toujours le token suivant le plus probable sans aléatoire.
- Utilisé une graine différente pour la troisième requête afin de montrer que le changement de graine produit des sorties différentes, même avec le même prompt et la même température.

---

## Configuration dynamique de l’échantillonnage

L’échantillonnage intelligent adapte les paramètres selon le contexte et les exigences de chaque requête. Cela signifie ajuster dynamiquement des paramètres comme la température, le top_p, et les pénalités selon le type de tâche, les préférences utilisateur ou les performances historiques.

Voyons comment implémenter l’échantillonnage dynamique dans différents langages de programmation.

# [Python](#tab/python)

```python
# Exemple Python : Échantillonnage dynamique basé sur le contexte de la requête
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Définir des préréglages d'échantillonnage pour différents types de tâches
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Sélectionner le préréglage de base
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Ajuster en fonction des préférences utilisateur si fournies
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Adapter la température selon la préférence de créativité (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Ajuster top_p en fonction de la diversité de réponse souhaitée
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Créer et envoyer la requête avec des paramètres d’échantillonnage personnalisés
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Retourner la réponse avec les métadonnées d’échantillonnage pour la transparence
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Dans le code précédent, nous avons :

- Créé une classe `DynamicSamplingService` qui gère l’échantillonnage adaptatif.
- Défini des presets d’échantillonnage pour différents types de tâches (créatif, factuel, code, analytique).
- Sélectionné un preset d’échantillonnage de base selon le type de tâche.
- Ajusté les paramètres d’échantillonnage selon les préférences utilisateur, comme le niveau de créativité et de diversité.
- Envoyé la requête avec les paramètres d’échantillonnage configurés dynamiquement.
- Renvoyé le texte généré avec les paramètres d’échantillonnage appliqués et le type de tâche pour transparence.
- Utilisé `temperature` pour contrôler l’aléatoire de la sortie, où des valeurs plus élevées donnent des réponses plus créatives.
- Utilisé `top_p` pour limiter la sélection des tokens à ceux qui contribuent à la masse de probabilité cumulative supérieure, améliorant la qualité du texte généré.
- Utilisé `frequency_penalty` pour réduire la répétition et encourager la diversité dans la sortie.
- Utilisé `user_preferences` pour permettre la personnalisation des paramètres d’échantillonnage selon les niveaux de créativité et diversité définis par l’utilisateur.
- Utilisé `task_type` pour déterminer la stratégie d’échantillonnage appropriée pour la requête, permettant des réponses plus adaptées à la nature de la tâche.
- Utilisé la méthode `send_request` pour envoyer le prompt avec les paramètres d’échantillonnage configurés, assurant que le modèle génère du texte selon les exigences spécifiées.
- Utilisé `generated_text` pour récupérer la réponse du modèle, qui est ensuite renvoyée avec les paramètres d’échantillonnage et le type de tâche pour une analyse ou affichage ultérieur.
- Utilisé les fonctions `min` et `max` pour s’assurer que les préférences utilisateur sont limitées dans des plages valides, empêchant des configurations non valides.

# [JavaScript Dynamique](#tab/javascript-dynamic)

```javascript
// Exemple JavaScript : configuration d'échantillonnage dynamique basée sur le contexte utilisateur
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Définir les profils d'échantillonnage de base
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Suivre la performance historique
    this.performanceHistory = [];
  }
  
  // Détecter le type de tâche à partir de l'invite
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Détection heuristique simple - pourrait être améliorée avec une classification ML
    if (context.taskType) return context.taskType;
    
    if (promptLower.includes('code') || 
        promptLower.includes('function') || 
        promptLower.includes('program')) {
      return 'code';
    }
    
    if (promptLower.includes('explain') || 
        promptLower.includes('what is') || 
        promptLower.includes('how does')) {
      return 'factual';
    }
    
    if (promptLower.includes('creative') || 
        promptLower.includes('imagine') || 
        promptLower.includes('story')) {
      return 'creative';
    }
    
    // Par défaut, considérer comme conversationnel si aucun type clair n'est détecté
    return 'conversational';
  }
  
  // Calculer les paramètres d'échantillonnage en fonction du contexte et des préférences utilisateur
  getSamplingParameters(prompt, context = {}) {
    // Détecter le type de tâche
    const taskType = this.detectTaskType(prompt, context);
    
    // Obtenir le profil de base
    let params = {...this.samplingProfiles[taskType]};
    
    // Ajuster selon les préférences utilisateur
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Échelle de 1 à 10 vers une plage de température appropriée
        params.temperature = 0.1 + (creativity * 0.09); // 0,1-1,0
      }
      
      if (precision !== undefined) {
        // Une précision plus élevée signifie un topP plus bas (sélection plus ciblée)
        params.topP = 1.0 - (precision * 0.05); // 0,5-1,0
      }
      
      if (consistency !== undefined) {
        // Une cohérence plus élevée signifie des pénalités plus faibles
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0,1-0,9
      }
    }
    
    // Appliquer les ajustements appris à partir de l'historique des performances
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Logique adaptative simple - pourrait être améliorée avec des algorithmes plus sophistiqués
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Considérer uniquement l'historique récent
    
    if (relevantHistory.length > 0) {
      // Calculer les scores de performance moyens
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Si la performance est en dessous du seuil, ajuster les paramètres
      if (avgScore < 0.7) {
        // Léger ajustement vers des valeurs plus sûres
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Enregistrer la performance pour des ajustements futurs
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Évaluation de 0 à 1 de la qualité de la réponse
    });
    
    // Limiter la taille de l'historique
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Obtenir les paramètres d'échantillonnage optimisés
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Envoyer la requête avec les paramètres optimisés
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Si l'utilisateur fournit un retour, l'enregistrer pour une optimisation future
    if (context.recordPerformance) {
      this.recordPerformance(prompt, samplingParams, response, context.feedbackScore || 0.5);
    }
    
    return {
      response,
      appliedSamplingParams: samplingParams,
      detectedTaskType: this.detectTaskType(prompt, context)
    };
  }
}

// Exemple d'utilisation
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Tâche créative avec préférences utilisateur personnalisées
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Créativité élevée (1-10)
          consistency: 3  // Faible cohérence (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Tâche de génération de code
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Faible créativité
          precision: 8,   // Précision élevée
          consistency: 9  // Cohérence élevée
        }
      }
    );
    
    console.log('\nCode Task:');
    console.log(`Detected type: ${codeResult.detectedTaskType}`);
    console.log('Applied sampling:', codeResult.appliedSamplingParams);
    console.log(codeResult.response.generatedText);
    
  } catch (error) {
    console.error('Error in adaptive sampling demo:', error);
  }
}

demonstrateAdaptiveSampling();
```

Dans le code précédent, nous avons :

- Créé une classe `AdaptiveSamplingManager` qui gère l’échantillonnage dynamique selon le type de tâche et les préférences utilisateur.
- Défini des profils d’échantillonnage pour différents types de tâches (créatif, factuel, code, conversationnel).
- Implémenté une méthode pour détecter le type de tâche à partir du prompt en utilisant des heuristiques simples.
- Calculé les paramètres d’échantillonnage selon le type de tâche détecté et les préférences utilisateur.
- Appliqué des ajustements appris basés sur les performances historiques pour optimiser les paramètres d’échantillonnage.
- Enregistré les performances pour ajustements futurs, permettant au système d’apprendre des interactions passées.
- Envoyé des requêtes avec paramètres d’échantillonnage configurés dynamiquement et renvoyé le texte généré avec les paramètres appliqués et le type de tâche détecté.
- Utilisé :
    - `userPreferences` pour permettre la personnalisation des paramètres d’échantillonnage selon les niveaux de créativité, de précision et de cohérence définis par l’utilisateur.
    - `detectTaskType` pour déterminer la nature de la tâche basée sur le prompt, permettant des réponses plus adaptées.
    - `recordPerformance` pour enregistrer les performances des réponses générées, permettant au système de s’adapter et d’améliorer avec le temps.
    - `applyLearnedAdjustments` pour modifier les paramètres d’échantillonnage basés sur les performances historiques, améliorant la capacité du modèle à générer des réponses de haute qualité.
    - `generateResponse` pour encapsuler le processus complet de génération d’une réponse avec échantillonnage adaptatif, simplifiant son appel avec différents prompts et contextes.
    - `allowedTools` pour spécifier les outils que le modèle peut utiliser durant la génération, permettant des réponses plus conscientes du contexte.
    - `feedbackScore` pour permettre aux utilisateurs de fournir des retours sur la qualité de la réponse générée, utilisés pour affiner davantage les performances du modèle au fil du temps.
    - `performanceHistory` pour maintenir un historique des interactions passées, permettant au système d’apprendre des succès et échecs précédents.
    - `getSamplingParameters` pour ajuster dynamiquement les paramètres d’échantillonnage en fonction du contexte de la requête, permettant un comportement du modèle plus flexible et réactif.
    - `detectTaskType` pour classifier la tâche basée sur le prompt, permettant au système d’appliquer des stratégies d’échantillonnage appropriées selon le type de requête.
    - `samplingProfiles` pour définir des configurations de base d’échantillonnage pour différents types de tâches, permettant des ajustements rapides selon la nature de la requête.

---

## Prochaine étape

- [5.7 Scaling](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->