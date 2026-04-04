[![Conception multi-agents](../../../translated_images/fr/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Cliquez sur l'image ci-dessus pour regarder la vidéo de cette leçon)_
# Métacognition dans les agents IA

## Introduction

Bienvenue dans la leçon sur la métacognition chez les agents IA ! Ce chapitre est conçu pour les débutants qui se demandent comment les agents IA peuvent réfléchir à leurs propres processus de pensée. À la fin de cette leçon, vous comprendrez les concepts clés et disposerez d'exemples pratiques pour appliquer la métacognition dans la conception d'agents.

## Objectifs d'apprentissage

Après avoir terminé cette leçon, vous serez capable de :

1. Comprendre les implications des boucles de raisonnement dans les définitions d'agents.
2. Utiliser des techniques de planification et d'évaluation pour aider les agents à s'auto-corriger.
3. Créer vos propres agents capables de manipuler du code pour accomplir des tâches.

## Introduction à la métacognition

La métacognition fait référence aux processus cognitifs de haut niveau qui impliquent de réfléchir à sa propre pensée. Pour les agents IA, cela signifie être capable d'évaluer et d'ajuster leurs actions en fonction de la conscience de soi et des expériences passées. La métacognition, ou « penser à propos de la pensée », est un concept important dans le développement de systèmes IA agentiques. Elle implique que les systèmes d'IA soient conscients de leurs propres processus internes et capables de surveiller, réguler et adapter leur comportement en conséquence. Un peu comme nous le faisons lorsque nous « lisons la salle » ou examinons un problème. Cette conscience de soi peut aider les systèmes d'IA à prendre de meilleures décisions, identifier des erreurs et améliorer leurs performances au fil du temps — revenant encore une fois au test de Turing et au débat sur la question de savoir si l'IA va prendre le dessus.

Dans le contexte des systèmes IA agentiques, la métacognition peut aider à résoudre plusieurs défis, tels que :
- Transparence: Veiller à ce que les systèmes d'IA puissent expliquer leur raisonnement et leurs décisions.
- Raisonnement: Améliorer la capacité des systèmes d'IA à synthétiser l'information et à prendre des décisions solides.
- Adaptation: Permettre aux systèmes d'IA de s'ajuster à de nouveaux environnements et à des conditions changeantes.
- Perception: Améliorer la précision des systèmes d'IA dans la reconnaissance et l'interprétation des données provenant de leur environnement.

### Qu'est-ce que la métacognition?

La métacognition, ou « penser à propos de la pensée », est un processus cognitif de haut niveau qui implique la conscience de soi et l'autorégulation des processus cognitifs. Dans le domaine de l'IA, la métacognition permet aux agents d'évaluer et d'adapter leurs stratégies et actions, ce qui conduit à de meilleures capacités de résolution de problèmes et de prise de décision. En comprenant la métacognition, vous pouvez concevoir des agents IA non seulement plus intelligents, mais aussi plus adaptables et efficaces. Dans une véritable métacognition, vous verriez l'IA raisonner explicitement sur son propre raisonnement.

Example: “I prioritized cheaper flights because… I might be missing out on direct flights, so let me re-check.”.
Garder une trace de la manière ou de la raison pour laquelle elle a choisi un certain itinéraire.
- Noter qu'elle a commis des erreurs parce qu'elle s'est trop appuyée sur les préférences de l'utilisateur de la fois précédente, donc elle modifie sa stratégie de prise de décision et pas seulement la recommandation finale.
- Diagnostiquer des schémas comme : « Chaque fois que je vois l'utilisateur mentionner 'trop bondé', je ne devrais pas seulement supprimer certaines attractions, mais aussi réfléchir au fait que ma méthode de sélection des 'principales attractions' est défaillante si je classe toujours par popularité. »

### Importance de la métacognition dans les agents IA

La métacognition joue un rôle crucial dans la conception des agents IA pour plusieurs raisons :

![Importance de la métacognition](../../../translated_images/fr/importance-of-metacognition.b381afe9aae352f7.webp)

- Auto-réflexion : Les agents peuvent évaluer leurs propres performances et identifier des axes d'amélioration.
- Adaptabilité : Les agents peuvent modifier leurs stratégies en fonction des expériences passées et des environnements changeants.
- Correction d'erreurs : Les agents peuvent détecter et corriger des erreurs de manière autonome, conduisant à des résultats plus précis.
- Gestion des ressources : Les agents peuvent optimiser l'utilisation des ressources, telles que le temps et la puissance de calcul, en planifiant et en évaluant leurs actions.

## Composants d'un agent IA

Avant d'aborder les processus métacognitifs, il est essentiel de comprendre les composants de base d'un agent IA. Un agent IA se compose généralement de :

- Persona: La personnalité et les caractéristiques de l'agent, qui définissent comment il interagit avec les utilisateurs.
- Tools: Les capacités et fonctions que l'agent peut exécuter.
- Skills: Les connaissances et l'expertise que possède l'agent.

Ces composants travaillent ensemble pour créer une "unité d'expertise" qui peut accomplir des tâches spécifiques.

**Exemple**:
Considérez un agent de voyage, un service d'agent qui non seulement planifie vos vacances mais ajuste aussi son parcours en fonction des données en temps réel et des expériences passées des clients.

### Exemple : Métacognition dans un service d'agent de voyage

Imaginez que vous concevez un service d'agent de voyage alimenté par l'IA. Cet agent, "Agent de voyage", aide les utilisateurs à planifier leurs vacances. Pour intégrer la métacognition, l'Agent de voyage doit évaluer et ajuster ses actions en fonction de la conscience de soi et des expériences passées. Voici comment la métacognition pourrait intervenir :

#### Tâche actuelle

La tâche actuelle est d'aider un utilisateur à planifier un voyage à Paris.

#### Étapes pour accomplir la tâche

1. **Collecter les préférences de l'utilisateur**: Demander à l'utilisateur ses dates de voyage, son budget, ses centres d'intérêt (par ex., musées, gastronomie, shopping) et toute exigence spécifique.
2. **Récupérer des informations**: Rechercher des options de vols, d'hébergement, d'attractions et de restaurants correspondant aux préférences de l'utilisateur.
3. **Générer des recommandations**: Fournir un itinéraire personnalisé avec les détails des vols, des réservations d'hôtel et des activités suggérées.
4. **Ajuster en fonction des retours**: Demander à l'utilisateur son avis sur les recommandations et effectuer les ajustements nécessaires.

#### Ressources requises

- Accès aux bases de données de réservation de vols et d'hôtels.
- Informations sur les attractions et restaurants parisiens.
- Données de retours d'utilisateurs provenant d'interactions précédentes.

#### Expérience et auto-réflexion

L'Agent de voyage utilise la métacognition pour évaluer ses performances et tirer des enseignements des expériences passées. Par exemple :

1. **Analyse des retours utilisateurs**: L'Agent de voyage passe en revue les retours des utilisateurs pour déterminer quelles recommandations ont été bien reçues et lesquelles ne l'ont pas été. Il ajuste ses suggestions futures en conséquence.
2. **Adaptabilité**: Si un utilisateur a déjà mentionné qu'il n'aime pas les endroits bondés, l'Agent de voyage évitera de recommander des lieux touristiques populaires aux heures de pointe à l'avenir.
3. **Correction d'erreurs**: Si l'Agent de voyage a commis une erreur lors d'une réservation passée, par exemple en suggérant un hôtel complet, il apprend à vérifier la disponibilité plus rigoureusement avant de faire des recommandations.

#### Exemple pratique pour développeurs

Voici un exemple simplifié de ce à quoi le code de l'Agent de voyage pourrait ressembler lorsqu'il intègre la métacognition :

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Rechercher des vols, des hôtels et des attractions en fonction des préférences
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        # Analyser les retours et ajuster les recommandations futures
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Exemple d'utilisation
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

#### Pourquoi la métacognition importe

- **Auto-réflexion**: Les agents peuvent analyser leurs performances et identifier des axes d'amélioration.
- **Adaptabilité**: Les agents peuvent modifier leurs stratégies en fonction des retours et des conditions changeantes.
- **Correction d'erreurs**: Les agents peuvent détecter et corriger des erreurs de manière autonome.
- **Gestion des ressources**: Les agents peuvent optimiser l'utilisation des ressources, comme le temps et la puissance de calcul.

En intégrant la métacognition, l'Agent de voyage peut fournir des recommandations de voyage plus personnalisées et précises, améliorant ainsi l'expérience utilisateur globale.

---

## 2. Planification chez les agents

La planification est un composant critique du comportement des agents IA. Elle consiste à définir les étapes nécessaires pour atteindre un objectif, en tenant compte de l'état actuel, des ressources et des obstacles possibles.

### Éléments de la planification

- **Tâche actuelle**: Définir clairement la tâche.
- **Étapes pour accomplir la tâche**: Décomposer la tâche en étapes gérables.
- **Ressources requises**: Identifier les ressources nécessaires.
- **Expérience**: Utiliser les expériences passées pour éclairer la planification.

**Exemple**:
Voici les étapes que l'Agent de voyage doit suivre pour aider un utilisateur à planifier efficacement son voyage :

### Étapes pour l'Agent de voyage

1. **Collecter les préférences de l'utilisateur**
   - Demander à l'utilisateur des détails sur ses dates de voyage, son budget, ses centres d'intérêt et toute exigence spécifique.
   - Exemples : "Quand prévoyez-vous de voyager ?" "Quel est votre fourchette de budget ?" "Quelles activités appréciez-vous en vacances ?"

2. **Récupérer des informations**
   - Rechercher des options de voyage pertinentes en fonction des préférences de l'utilisateur.
   - **Vols**: Rechercher des vols disponibles dans le budget et aux dates préférées de l'utilisateur.
   - **Hébergements**: Trouver des hôtels ou des locations correspondant aux préférences de l'utilisateur en matière d'emplacement, de prix et d'équipements.
   - **Attractions et restaurants**: Identifier des attractions populaires, activités et options de restauration en accord avec les intérêts de l'utilisateur.

3. **Générer des recommandations**
   - Compiler les informations récupérées en un itinéraire personnalisé.
   - Fournir des détails tels que les options de vol, les réservations d'hôtel et les activités suggérées, en veillant à adapter les recommandations aux préférences de l'utilisateur.

4. **Présenter l'itinéraire à l'utilisateur**
   - Partager l'itinéraire proposé avec l'utilisateur pour qu'il l'examine.
   - Exemple : "Voici un itinéraire suggéré pour votre voyage à Paris. Il inclut les détails des vols, les réservations d'hôtel et une liste d'activités et de restaurants recommandés. Faites-moi part de vos impressions !"

5. **Collecter des retours**
   - Demander à l'utilisateur son avis sur l'itinéraire proposé.
   - Exemples : "Aimez-vous les options de vol ?" "L'hôtel convient-il à vos besoins ?" "Y a-t-il des activités que vous souhaitez ajouter ou supprimer ?"

6. **Ajuster en fonction des retours**
   - Modifier l'itinéraire en fonction des retours de l'utilisateur.
   - Apporter les changements nécessaires aux recommandations de vols, d'hébergement et d'activités pour mieux correspondre aux préférences de l'utilisateur.

7. **Confirmation finale**
   - Présenter l'itinéraire mis à jour à l'utilisateur pour une confirmation finale.
   - Exemple : "J'ai effectué les ajustements en fonction de vos retours. Voici l'itinéraire mis à jour. Tout vous convient-il ?"

8. **Réserver et confirmer les réservations**
   - Une fois que l'utilisateur approuve l'itinéraire, procéder à la réservation des vols, des hébergements et des activités pré-planifiées.
   - Envoyer les détails de confirmation à l'utilisateur.

9. **Fournir un support continu**
   - Rester disponible pour aider l'utilisateur en cas de modifications ou de demandes supplémentaires avant et pendant son voyage.
   - Exemple : "Si vous avez besoin d'une assistance supplémentaire pendant votre voyage, n'hésitez pas à me contacter à tout moment !"

### Exemple d'interaction

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Exemple d'utilisation dans une requête de huées
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

## 3. Système RAG correctif

Commençons d'abord par comprendre la différence entre RAG Tool et Pre-emptive Context Load

![RAG vs Chargement du contexte](../../../translated_images/fr/rag-vs-context.9eae588520c00921.webp)

### Génération augmentée par récupération (RAG)

La RAG combine un système de recherche avec un modèle génératif. Lorsqu'une requête est effectuée, le système de récupération récupère des documents ou des données pertinents depuis une source externe, et ces informations récupérées sont utilisées pour enrichir l'entrée du modèle génératif. Cela aide le modèle à générer des réponses plus précises et contextuellement pertinentes.

Dans un système RAG, l'agent récupère des informations pertinentes d'une base de connaissances et les utilise pour générer des réponses ou des actions appropriées.

### Approche RAG corrective

L'approche RAG corrective se concentre sur l'utilisation des techniques RAG pour corriger les erreurs et améliorer la précision des agents IA. Cela implique :

1. **Technique de prompting**: Utiliser des invites spécifiques pour guider l'agent dans la récupération d'informations pertinentes.
2. **Outil**: Mettre en œuvre des algorithmes et des mécanismes qui permettent à l'agent d'évaluer la pertinence des informations récupérées et de générer des réponses précises.
3. **Évaluation**: Évaluer en continu les performances de l'agent et apporter des ajustements pour améliorer sa précision et son efficacité.

#### Exemple : RAG correctif dans un agent de recherche

Considérez un agent de recherche qui récupère des informations sur le web pour répondre aux requêtes des utilisateurs. L'approche RAG corrective pourrait impliquer :

1. **Technique de prompting**: Formuler des requêtes de recherche en fonction de l'entrée de l'utilisateur.
2. **Outil**: Utiliser le traitement du langage naturel et des algorithmes d'apprentissage automatique pour classer et filtrer les résultats de recherche.
3. **Évaluation**: Analyser les retours des utilisateurs pour identifier et corriger les inexactitudes dans les informations récupérées.

### RAG correctif dans l'Agent de voyage

Le RAG correctif (Retrieval-Augmented Generation) améliore la capacité d'une IA à récupérer et générer des informations tout en corrigeant les inexactitudes. Voyons comment l'Agent de voyage peut utiliser l'approche RAG corrective pour fournir des recommandations de voyage plus précises et pertinentes.

Cela implique :

- **Technique de prompting:** Utiliser des invites spécifiques pour guider l'agent dans la récupération d'informations pertinentes.
- **Outil:** Mettre en œuvre des algorithmes et des mécanismes qui permettent à l'agent d'évaluer la pertinence des informations récupérées et de générer des réponses précises.
- **Évaluation:** Évaluer en continu les performances de l'agent et apporter des ajustements pour améliorer sa précision et son efficacité.

#### Étapes pour implémenter le RAG correctif dans l'Agent de voyage

1. **Interaction initiale avec l'utilisateur**
   - L'Agent de voyage recueille les préférences initiales de l'utilisateur, telles que la destination, les dates de voyage, le budget et les centres d'intérêt.
   - Exemple :

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Récupération des informations**
   - L'Agent de voyage récupère des informations sur les vols, les hébergements, les attractions et les restaurants en fonction des préférences de l'utilisateur.
   - Exemple :

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Génération des recommandations initiales**
   - L'Agent de voyage utilise les informations récupérées pour générer un itinéraire personnalisé.
   - Exemple :

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Collecte des retours utilisateurs**
   - L'Agent de voyage demande à l'utilisateur son avis sur les recommandations initiales.
   - Exemple :

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Processus RAG correctif**
   - **Technique de prompting**: L'Agent de voyage formule de nouvelles requêtes de recherche en fonction des retours utilisateurs.
     - Exemple :

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Outil**: L'Agent de voyage utilise des algorithmes pour classer et filtrer les nouveaux résultats de recherche, en mettant l'accent sur la pertinence basée sur les retours utilisateurs.
     - Exemple :

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Évaluation**: L'Agent de voyage évalue continuellement la pertinence et la précision de ses recommandations en analysant les retours utilisateurs et en apportant les ajustements nécessaires.
     - Exemple :

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Exemple pratique

Voici un exemple de code Python simplifié incorporant l'approche RAG corrective dans l'Agent de voyage :

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)
        new_itinerary = self.generate_recommendations()
        return new_itinerary

# Exemple d'utilisation
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
new_itinerary = travel_agent.adjust_based_on_feedback(feedback)
print("Updated Itinerary:", new_itinerary)
```

### Chargement contextuel pré-emptif
Le chargement préemptif du contexte consiste à charger des informations pertinentes ou des éléments de contexte dans le modèle avant de traiter une requête. Cela signifie que le modèle a accès à ces informations dès le départ, ce qui peut l'aider à générer des réponses mieux informées sans avoir besoin de récupérer des données supplémentaires pendant le processus.

Voici un exemple simplifié de ce à quoi pourrait ressembler un chargement préemptif du contexte pour une application d'agent de voyage en Python :

```python
class TravelAgent:
    def __init__(self):
        # Précharger les destinations populaires et leurs informations
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Récupérer les informations sur la destination depuis le contexte préchargé
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Exemple d'utilisation
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Explication

1. **Initialization (`__init__` method)** : La classe `TravelAgent` précharge un dictionnaire contenant des informations sur des destinations populaires telles que Paris, Tokyo, New York et Sydney. Ce dictionnaire inclut des détails comme le pays, la monnaie, la langue et les principales attractions pour chaque destination.

2. **Retrieving Information (`get_destination_info` method)** : Lorsqu'un utilisateur interroge une destination spécifique, la méthode `get_destination_info` récupère les informations pertinentes du dictionnaire de contexte préchargé.

En préchargeant le contexte, l'application d'agent de voyage peut répondre rapidement aux requêtes des utilisateurs sans avoir à récupérer ces informations depuis une source externe en temps réel. Cela rend l'application plus efficace et réactive.

### Bootstrapping the Plan with a Goal Before Iterating

Initialiser un plan avec un objectif consiste à commencer avec un objectif clair ou un résultat cible en tête. En définissant cet objectif dès le départ, le modèle peut l'utiliser comme principe directeur tout au long du processus itératif. Cela aide à s'assurer que chaque itération rapproche l'issue souhaitée, rendant le processus plus efficace et ciblé.

Voici un exemple de la manière dont vous pourriez initialiser (bootstrap) un plan de voyage avec un objectif avant d'itérer pour un agent de voyage en Python :

### Scénario

Un agent de voyage souhaite planifier des vacances personnalisées pour un client. L'objectif est de créer un itinéraire de voyage qui maximise la satisfaction du client en fonction de ses préférences et de son budget.

### Étapes

1. Définir les préférences et le budget du client.
2. Initialiser le plan initial en fonction de ces préférences.
3. Itérer pour affiner le plan, en l'optimisant pour la satisfaction du client.

#### Python Code

```python
class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def bootstrap_plan(self, preferences, budget):
        plan = []
        total_cost = 0

        for destination in self.destinations:
            if total_cost + destination['cost'] <= budget and self.match_preferences(destination, preferences):
                plan.append(destination)
                total_cost += destination['cost']

        return plan

    def match_preferences(self, destination, preferences):
        for key, value in preferences.items():
            if destination.get(key) != value:
                return False
        return True

    def iterate_plan(self, plan, preferences, budget):
        for i in range(len(plan)):
            for destination in self.destinations:
                if destination not in plan and self.match_preferences(destination, preferences) and self.calculate_cost(plan, destination) <= budget:
                    plan[i] = destination
                    break
        return plan

    def calculate_cost(self, plan, new_destination):
        return sum(destination['cost'] for destination in plan) + new_destination['cost']

# Exemple d'utilisation
destinations = [
    {"name": "Paris", "cost": 1000, "activity": "sightseeing"},
    {"name": "Tokyo", "cost": 1200, "activity": "shopping"},
    {"name": "New York", "cost": 900, "activity": "sightseeing"},
    {"name": "Sydney", "cost": 1100, "activity": "beach"},
]

preferences = {"activity": "sightseeing"}
budget = 2000

travel_agent = TravelAgent(destinations)
initial_plan = travel_agent.bootstrap_plan(preferences, budget)
print("Initial Plan:", initial_plan)

refined_plan = travel_agent.iterate_plan(initial_plan, preferences, budget)
print("Refined Plan:", refined_plan)
```

#### Explication du code

1. **Initialization (`__init__` method)** : La classe `TravelAgent` est initialisée avec une liste de destinations potentielles, chacune ayant des attributs comme le nom, le coût et le type d'activité.

2. **Bootstrapping the Plan (`bootstrap_plan` method)** : Cette méthode crée un plan de voyage initial basé sur les préférences et le budget du client. Elle parcourt la liste des destinations et les ajoute au plan si elles correspondent aux préférences du client et entrent dans le budget.

3. **Matching Preferences (`match_preferences` method)** : Cette méthode vérifie si une destination correspond aux préférences du client.

4. **Iterating the Plan (`iterate_plan` method)** : Cette méthode affine le plan initial en essayant de remplacer chaque destination du plan par une meilleure option, en tenant compte des préférences du client et des contraintes budgétaires.

5. **Calculating Cost (`calculate_cost` method)** : Cette méthode calcule le coût total du plan actuel, y compris une éventuelle nouvelle destination.

#### Exemple d'utilisation

- **Plan initial** : L'agent de voyage crée un plan initial basé sur les préférences du client pour les visites touristiques et un budget de $2000.
- **Plan affiné** : L'agent de voyage itère le plan, en l'optimisant pour les préférences et le budget du client.

En initialisant le plan avec un objectif clair (par exemple, maximiser la satisfaction du client) et en itérant pour affiner le plan, l'agent de voyage peut créer un itinéraire personnalisé et optimisé pour le client. Cette approche garantit que le plan de voyage est aligné sur les préférences et le budget du client dès le départ et s'améliore à chaque itération.

### Taking Advantage of LLM for Re-ranking and Scoring

Les grands modèles de langage (LLM) peuvent être utilisés pour le reranking et le scoring en évaluant la pertinence et la qualité des documents récupérés ou des réponses générées. Voici comment cela fonctionne :

**Retrieval :** L'étape de récupération initiale récupère un ensemble de documents ou de réponses candidats en fonction de la requête.

**Re-ranking :** Le LLM évalue ces candidats et les rerangée en fonction de leur pertinence et de leur qualité. Cette étape garantit que les informations les plus pertinentes et de meilleure qualité sont présentées en premier.

**Scoring :** Le LLM attribue des scores à chaque candidat, reflétant leur pertinence et leur qualité. Cela aide à sélectionner la meilleure réponse ou le meilleur document pour l'utilisateur.

En tirant parti des LLM pour le reranking et le scoring, le système peut fournir des informations plus précises et contextuellement pertinentes, améliorant l'expérience utilisateur globale.

Voici un exemple de la manière dont un agent de voyage pourrait utiliser un grand modèle de langage (LLM) pour reranker et scorer des destinations de voyage en fonction des préférences de l'utilisateur en Python :

#### Scénario - Voyage basé sur les préférences

Un agent de voyage souhaite recommander les meilleures destinations de voyage à un client en fonction de ses préférences. Le LLM aidera à reranker et scorer les destinations afin de garantir que les options les plus pertinentes sont présentées.

#### Étapes :

1. Collecter les préférences de l'utilisateur.
2. Récupérer une liste de destinations potentielles.
3. Utiliser le LLM pour reranker et scorer les destinations en fonction des préférences de l'utilisateur.

Voici comment vous pouvez mettre à jour l'exemple précédent pour utiliser Azure OpenAI Services :

#### Exigences

1. Vous devez disposer d'un abonnement Azure.
2. Créez une ressource Azure OpenAI et obtenez votre clé API.

#### Exemple de code Python

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Générer une invite pour Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Définir les en-têtes et la charge utile pour la requête
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Appeler l'API Azure OpenAI pour obtenir les destinations reclassées et notées
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Extraire et renvoyer les recommandations
        recommendations = response_data['choices'][0]['text'].strip().split('\n')
        return recommendations

    def generate_prompt(self, preferences):
        prompt = "Here are the travel destinations ranked and scored based on the following user preferences:\n"
        for key, value in preferences.items():
            prompt += f"{key}: {value}\n"
        prompt += "\nDestinations:\n"
        for destination in self.destinations:
            prompt += f"- {destination['name']}: {destination['description']}\n"
        return prompt

# Exemple d'utilisation
destinations = [
    {"name": "Paris", "description": "City of lights, known for its art, fashion, and culture."},
    {"name": "Tokyo", "description": "Vibrant city, famous for its modernity and traditional temples."},
    {"name": "New York", "description": "The city that never sleeps, with iconic landmarks and diverse culture."},
    {"name": "Sydney", "description": "Beautiful harbour city, known for its opera house and stunning beaches."},
]

preferences = {"activity": "sightseeing", "culture": "diverse"}
api_key = 'your_azure_openai_api_key'
endpoint = 'https://your-endpoint.com/openai/deployments/your-deployment-name/completions?api-version=2022-12-01'

travel_agent = TravelAgent(destinations)
recommendations = travel_agent.get_recommendations(preferences, api_key, endpoint)
print("Recommended Destinations:")
for rec in recommendations:
    print(rec)
```

#### Explication du code - Preference Booker

1. **Initialization** : La classe `TravelAgent` est initialisée avec une liste de destinations de voyage potentielles, chacune ayant des attributs comme le nom et la description.

2. **Getting Recommendations (`get_recommendations` method)** : Cette méthode génère une invite (prompt) pour le service Azure OpenAI basée sur les préférences de l'utilisateur et effectue une requête HTTP POST à l'API Azure OpenAI pour obtenir des destinations rerankées et scorées.

3. **Generating Prompt (`generate_prompt` method)** : Cette méthode construit une invite pour Azure OpenAI, incluant les préférences de l'utilisateur et la liste des destinations. L'invite guide le modèle pour reranker et scorer les destinations en fonction des préférences fournies.

4. **API Call** : La bibliothèque `requests` est utilisée pour effectuer une requête HTTP POST au point de terminaison de l'API Azure OpenAI. La réponse contient les destinations rerankées et scorées.

5. **Exemple d'utilisation** : L'agent de voyage collecte les préférences de l'utilisateur (par exemple, intérêt pour les visites touristiques et la diversité culturelle) et utilise le service Azure OpenAI pour obtenir des recommandations rerankées et scorées pour les destinations de voyage.

Assurez-vous de remplacer `your_azure_openai_api_key` par votre clé API Azure OpenAI réelle et `https://your-endpoint.com/...` par l'URL réelle du point de terminaison de votre déploiement Azure OpenAI.

En tirant parti du LLM pour le reranking et le scoring, l'agent de voyage peut fournir des recommandations de voyage plus personnalisées et pertinentes aux clients, améliorant ainsi leur expérience globale.

### RAG: Prompting Technique vs Tool

La génération augmentée par récupération (RAG) peut être à la fois une technique de prompting et un outil dans le développement d'agents IA. Comprendre la distinction entre les deux peut vous aider à tirer meilleur parti de RAG dans vos projets.

#### RAG en tant que technique de prompting

**Qu'est-ce que c'est ?**

- En tant que technique de prompting, RAG consiste à formuler des requêtes ou des invites spécifiques pour guider la récupération d'informations pertinentes à partir d'un large corpus ou d'une base de données. Ces informations sont ensuite utilisées pour générer des réponses ou des actions.

**Comment ça marche :**

1. **Formuler des prompts** : Créez des invites ou des requêtes bien structurées en fonction de la tâche ou de l'entrée de l'utilisateur.
2. **Récupérer des informations** : Utilisez les prompts pour rechercher des données pertinentes dans une base de connaissances ou un ensemble de données préexistant.
3. **Générer une réponse** : Combinez les informations récupérées avec des modèles génératifs pour produire une réponse complète et cohérente.

**Exemple dans un agent de voyage** :

- Entrée utilisateur : "I want to visit museums in Paris."
- Prompt : "Find top museums in Paris."
- Informations récupérées : Détails sur le musée du Louvre, le Musée d'Orsay, etc.
- Réponse générée : "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

#### RAG en tant qu'outil

**Qu'est-ce que c'est ?**

- En tant qu'outil, RAG est un système intégré qui automatise le processus de récupération et de génération, facilitant ainsi l'implémentation de fonctionnalités IA complexes sans avoir à élaborer manuellement des prompts pour chaque requête.

**Comment ça marche :**

1. **Intégration** : Intégrez RAG dans l'architecture de l'agent IA, ce qui lui permet de gérer automatiquement les tâches de récupération et de génération.
2. **Automatisation** : L'outil gère l'ensemble du processus, de la réception de l'entrée utilisateur à la génération de la réponse finale, sans nécessiter des prompts explicites pour chaque étape.
3. **Efficacité** : Améliore les performances de l'agent en rationalisant le processus de récupération et de génération, permettant des réponses plus rapides et plus précises.

**Exemple dans un agent de voyage** :

- Entrée utilisateur : "I want to visit museums in Paris."
- Outil RAG : récupère automatiquement des informations sur les musées et génère une réponse.
- Réponse générée : "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

### Comparison

| Aspect                 | Prompting Technique                                        | Tool                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Manual vs Automatic**| Formulation manuelle des prompts pour chaque requête.       | Processus automatisé pour la récupération et la génération.       |
| **Control**            | Offre plus de contrôle sur le processus de récupération.    | Rationalise et automatise la récupération et la génération.|
| **Flexibility**        | Permet des prompts personnalisés en fonction des besoins spécifiques.      | Plus efficace pour les implémentations à grande échelle.       |
| **Complexity**         | Nécessite de rédiger et d'ajuster les prompts.              | Plus facile à intégrer dans l'architecture d'un agent IA.      |

### Practical Examples

**Prompting Technique Example:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Tool Example:**

```python
class Travel_Agent:
    def __init__(self):
        self.rag_tool = RAGTool()

    def get_museums_in_paris(self):
        user_input = "I want to visit museums in Paris."
        response = self.rag_tool.retrieve_and_generate(user_input)
        return response

travel_agent = Travel_Agent()
museums = travel_agent.get_museums_in_paris()
print("Top Museums in Paris:", museums)
```

### Evaluating Relevancy

L'évaluation de la pertinence est un aspect crucial des performances d'un agent IA. Elle garantit que les informations récupérées et générées par l'agent sont appropriées, exactes et utiles pour l'utilisateur. Explorons comment évaluer la pertinence dans les agents IA, y compris des exemples pratiques et des techniques.

#### Concepts clés pour évaluer la pertinence

1. **Conscience du contexte** :
   - L'agent doit comprendre le contexte de la requête de l'utilisateur pour récupérer et générer des informations pertinentes.
   - Exemple : Si un utilisateur demande "best restaurants in Paris", l'agent devrait prendre en compte les préférences de l'utilisateur, comme le type de cuisine et le budget.

2. **Précision** :
   - Les informations fournies par l'agent doivent être factuellement correctes et à jour.
   - Exemple : Recommander des restaurants actuellement ouverts avec de bonnes critiques plutôt que des options obsolètes ou fermées.

3. **Intention de l'utilisateur** :
   - L'agent doit déduire l'intention de l'utilisateur derrière la requête pour fournir l'information la plus pertinente.
   - Exemple : Si un utilisateur demande "budget-friendly hotels", l'agent devrait prioriser les options abordables.

4. **Boucle de rétroaction** :
   - Collecter et analyser en continu les retours des utilisateurs aide l'agent à affiner son processus d'évaluation de la pertinence.
   - Exemple : Intégrer les notes et les retours des utilisateurs sur les recommandations précédentes pour améliorer les réponses futures.

#### Techniques pratiques pour évaluer la pertinence

1. **Relevance Scoring** :
   - Attribuer un score de pertinence à chaque élément récupéré en fonction de son adéquation avec la requête et les préférences de l'utilisateur.
   - Exemple :

     ```python
     def relevance_score(item, query):
         score = 0
         if item['category'] in query['interests']:
             score += 1
         if item['price'] <= query['budget']:
             score += 1
         if item['location'] == query['destination']:
             score += 1
         return score
     ```

2. **Filtering and Ranking** :
   - Filtrer les éléments non pertinents et classer les éléments restants en fonction de leurs scores de pertinence.
   - Exemple :

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Retourne les 10 éléments les plus pertinents
     ```

3. **Natural Language Processing (NLP)** :
   - Utiliser des techniques de NLP pour comprendre la requête de l'utilisateur et récupérer des informations pertinentes.
   - Exemple :

     ```python
     def process_query(query):
         # Utilisez le TAL pour extraire les informations clés de la requête de l'utilisateur
         processed_query = nlp(query)
         return processed_query
     ```

4. **User Feedback Integration** :
   - Collecter les retours des utilisateurs sur les recommandations fournies et les utiliser pour ajuster les évaluations de pertinence futures.
   - Exemple :

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Exemple : Évaluer la pertinence dans Travel Agent

Voici un exemple pratique de la manière dont Travel Agent peut évaluer la pertinence des recommandations de voyage :

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        ranked_hotels = self.filter_and_rank(hotels, self.user_preferences)
        itinerary = create_itinerary(flights, ranked_hotels, attractions)
        return itinerary

    def filter_and_rank(self, items, query):
        ranked_items = sorted(items, key=lambda item: self.relevance_score(item, query), reverse=True)
        return ranked_items[:10]  # Renvoie les 10 éléments les plus pertinents

    def relevance_score(self, item, query):
        score = 0
        if item['category'] in query['interests']:
            score += 1
        if item['price'] <= query['budget']:
            score += 1
        if item['location'] == query['destination']:
            score += 1
        return score

    def adjust_based_on_feedback(self, feedback, items):
        for item in items:
            if item['name'] in feedback['liked']:
                item['relevance'] += 1
            if item['name'] in feedback['disliked']:
                item['relevance'] -= 1
        return items

# Exemple d'utilisation
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_items = travel_agent.adjust_based_on_feedback(feedback, itinerary['hotels'])
print("Updated Itinerary with Feedback:", updated_items)
```

### Search with Intent

La recherche avec intention consiste à comprendre et interpréter le but ou l'objectif sous-jacent derrière la requête d'un utilisateur afin de récupérer et générer les informations les plus pertinentes et utiles. Cette approche va au-delà de la simple correspondance de mots-clés et se concentre sur la compréhension des besoins réels et du contexte de l'utilisateur.

#### Concepts clés de la recherche avec intention

1. **Comprendre l'intention de l'utilisateur** :
   - L'intention de l'utilisateur peut être catégorisée en trois types principaux : informationnelle, de navigation et transactionnelle.
     - **Informational Intent** : L'utilisateur recherche des informations sur un sujet (par ex., "What are the best museums in Paris?").
     - **Navigational Intent** : L'utilisateur veut accéder à un site ou une page spécifique (par ex., "Louvre Museum official website").
     - **Transactional Intent** : L'utilisateur vise à effectuer une transaction, comme réserver un vol ou faire un achat (par ex., "Book a flight to Paris").

2. **Conscience du contexte** :
   - Analyser le contexte de la requête de l'utilisateur aide à identifier précisément son intention. Cela inclut la prise en compte des interactions précédentes, des préférences de l'utilisateur et des détails spécifiques de la requête actuelle.

3. **Natural Language Processing (NLP)** :
   - Des techniques de NLP sont employées pour comprendre et interpréter les requêtes en langage naturel fournies par les utilisateurs. Cela inclut des tâches comme la reconnaissance d'entités, l'analyse de sentiment et le parsing de requêtes.

4. **Personnalisation** :
   - Personnaliser les résultats de recherche en fonction de l'historique de l'utilisateur, de ses préférences et de ses retours améliore la pertinence des informations récupérées.

#### Exemple pratique : Recherche avec intention dans Travel Agent

Prenons Travel Agent comme exemple pour voir comment la recherche avec intention peut être mise en œuvre.

1. **Collecte des préférences de l'utilisateur**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Comprendre l'intention de l'utilisateur**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Conscience du contexte**


   ```python
   def analyze_context(query, user_history):
       # Combiner la requête actuelle avec l'historique de l'utilisateur pour comprendre le contexte
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Rechercher et personnaliser les résultats**

   ```python
   def search_with_intent(query, preferences, user_history):
       intent = identify_intent(query)
       context = analyze_context(query, user_history)
       if intent == "informational":
           search_results = search_information(query, preferences)
       elif intent == "navigational":
           search_results = search_navigation(query)
       elif intent == "transactional":
           search_results = search_transaction(query, preferences)
       personalized_results = personalize_results(search_results, user_history)
       return personalized_results

   def search_information(query, preferences):
       # Exemple de logique de recherche pour une intention informationnelle
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Exemple de logique de recherche pour une intention de navigation
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Exemple de logique de recherche pour une intention transactionnelle
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Exemple de logique de personnalisation
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Retourner les 10 meilleurs résultats personnalisés
   ```

5. **Exemple d'utilisation**

   ```python
   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   user_history = ["Louvre Museum website", "Book flight to Paris"]
   query = "best museums in Paris"
   results = search_with_intent(query, preferences, user_history)
   print("Search Results:", results)
   ```

---

## 4. Génération de code comme outil

Les agents générateurs de code utilisent des modèles d'IA pour écrire et exécuter du code, résoudre des problèmes complexes et automatiser des tâches.

### Agents générateurs de code

Les agents générateurs de code utilisent des modèles d'IA générative pour écrire et exécuter du code. Ces agents peuvent résoudre des problèmes complexes, automatiser des tâches et fournir des informations utiles en générant et en exécutant du code dans divers langages de programmation.

#### Applications pratiques

1. **Génération automatique de code**: Générer des extraits de code pour des tâches spécifiques, telles que l'analyse de données, le web scraping ou le machine learning.
2. **SQL en tant que RAG**: Utiliser des requêtes SQL pour récupérer et manipuler des données à partir de bases de données.
3. **Résolution de problèmes**: Créer et exécuter du code pour résoudre des problèmes spécifiques, comme optimiser des algorithmes ou analyser des données.

#### Exemple : Agent générateur de code pour l'analyse de données

Imaginez que vous concevez un agent générateur de code. Voici comment il pourrait fonctionner :

1. **Tâche**: Analyser un jeu de données pour identifier des tendances et des motifs.
2. **Étapes**:
   - Charger le jeu de données dans un outil d'analyse de données.
   - Générer des requêtes SQL pour filtrer et agréger les données.
   - Exécuter les requêtes et récupérer les résultats.
   - Utiliser les résultats pour générer des visualisations et des insights.
3. **Ressources requises**: Accès au jeu de données, outils d'analyse de données et capacités SQL.
4. **Expérience**: Utiliser les résultats d'analyses passées pour améliorer la précision et la pertinence des analyses futures.

### Exemple : Agent générateur de code pour un agent de voyage

Dans cet exemple, nous concevrons un agent générateur de code, Travel Agent, pour aider les utilisateurs à planifier leurs voyages en générant et exécutant du code. Cet agent peut gérer des tâches telles que récupérer des options de voyage, filtrer les résultats et compiler un itinéraire en utilisant l'IA générative.

#### Présentation de l'agent générateur de code

1. **Collecte des préférences utilisateur**: Recueille les informations de l'utilisateur telles que destination, dates de voyage, budget et centres d'intérêt.
2. **Génération de code pour récupérer des données**: Génère des extraits de code pour récupérer des données sur les vols, les hôtels et les attractions.
3. **Exécution du code généré**: Exécute le code généré pour obtenir des informations en temps réel.
4. **Génération d'un itinéraire**: Compile les données récupérées en un plan de voyage personnalisé.
5. **Ajustement en fonction des retours**: Reçoit les retours des utilisateurs et régénère le code si nécessaire pour affiner les résultats.

#### Implémentation étape par étape

1. **Collecte des préférences utilisateur**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Génération de code pour récupérer des données**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Exemple : Générer du code pour rechercher des vols en fonction des préférences de l'utilisateur
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Exemple : Générer du code pour rechercher des hôtels
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Exécution du code généré**

   ```python
   def execute_code(code):
       # Exécuter le code généré en utilisant exec
       exec(code)
       result = locals()
       return result

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   
   flight_code = generate_code_to_fetch_data(preferences)
   hotel_code = generate_code_to_fetch_hotels(preferences)
   
   flights = execute_code(flight_code)
   hotels = execute_code(hotel_code)

   print("Flight Options:", flights)
   print("Hotel Options:", hotels)
   ```

4. **Génération d'un itinéraire**

   ```python
   def generate_itinerary(flights, hotels, attractions):
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   attractions = search_attractions(preferences)
   itinerary = generate_itinerary(flights, hotels, attractions)
   print("Suggested Itinerary:", itinerary)
   ```

5. **Ajustement en fonction des retours**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Ajuster les préférences en fonction des retours des utilisateurs
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Régénérer et exécuter le code avec les préférences mises à jour
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Tirer parti de la conscience de l'environnement et du raisonnement

S'appuyer sur le schéma de la table peut en effet améliorer le processus de génération de requêtes en exploitant la conscience de l'environnement et le raisonnement.

Voici un exemple de la façon dont cela peut être réalisé :

1. **Comprendre le schéma**: Le système comprendra le schéma de la table et utilisera ces informations pour ancrer la génération de requêtes.
2. **Ajuster en fonction des retours**: Le système ajustera les préférences utilisateur en fonction des retours et réfléchira aux champs du schéma qui doivent être mis à jour.
3. **Génération et exécution de requêtes**: Le système générera et exécutera des requêtes pour récupérer des données de vols et d'hôtels mises à jour en fonction des nouvelles préférences.

Voici un exemple de code Python mis à jour qui intègre ces concepts :

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Ajuster les préférences en fonction des retours de l'utilisateur
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Raisonnement basé sur le schéma pour ajuster d'autres préférences connexes
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Logique personnalisée pour ajuster les préférences en fonction du schéma et des retours
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Générer du code pour récupérer les données de vols en fonction des préférences mises à jour
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Générer du code pour récupérer les données d'hôtels en fonction des préférences mises à jour
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simuler l'exécution du code et retourner des données factices
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Générer un itinéraire basé sur les vols, les hôtels et les attractions
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Exemple de schéma
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Exemple d'utilisation
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Régénérer et exécuter le code avec les préférences mises à jour
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Explication - Réservation basée sur les retours

1. **Conscience du schéma**: Le dictionnaire `schema` définit comment les préférences doivent être ajustées en fonction des retours. Il inclut des champs tels que `favorites` et `avoid`, avec des ajustements correspondants.
2. **Ajustement des préférences (méthode `adjust_based_on_feedback`)**: Cette méthode ajuste les préférences en fonction des retours utilisateur et du schéma.
3. **Ajustements basés sur l'environnement (méthode `adjust_based_on_environment`)**: Cette méthode personnalise les ajustements en fonction du schéma et des retours.
4. **Génération et exécution de requêtes**: Le système génère du code pour récupérer des données de vols et d'hôtels mises à jour en fonction des préférences ajustées et simule l'exécution de ces requêtes.
5. **Génération d'un itinéraire**: Le système crée un itinéraire mis à jour en fonction des nouvelles données de vols, d'hôtels et d'attractions.

En rendant le système conscient de l'environnement et en lui permettant de raisonner à partir du schéma, il peut générer des requêtes plus précises et pertinentes, ce qui conduit à de meilleures recommandations de voyage et à une expérience utilisateur plus personnalisée.

### Utiliser SQL comme technique de Retrieval-Augmented Generation (RAG)

SQL (Structured Query Language) est un outil puissant pour interagir avec des bases de données. Lorsqu'il est utilisé dans le cadre d'une approche Retrieval-Augmented Generation (RAG), SQL peut récupérer des données pertinentes dans des bases de données pour informer et générer des réponses ou des actions dans les agents d'IA. Explorons comment SQL peut être utilisé comme technique RAG dans le contexte de Travel Agent.

#### Concepts clés

1. **Interaction avec la base de données**:
   - SQL est utilisé pour interroger les bases de données, récupérer des informations pertinentes et manipuler des données.
   - Exemple : récupérer les détails des vols, les informations sur les hôtels et les attractions depuis une base de données de voyage.

2. **Intégration avec RAG**:
   - Les requêtes SQL sont générées en fonction des entrées et des préférences de l'utilisateur.
   - Les données récupérées sont ensuite utilisées pour générer des recommandations ou des actions personnalisées.

3. **Génération dynamique de requêtes**:
   - L'agent IA génère des requêtes SQL dynamiques en fonction du contexte et des besoins de l'utilisateur.
   - Exemple : personnaliser les requêtes SQL pour filtrer les résultats en fonction du budget, des dates et des centres d'intérêt.

#### Applications

- **Génération automatique de code**: Générer des extraits de code pour des tâches spécifiques.
- **SQL en tant que RAG**: Utiliser des requêtes SQL pour manipuler des données.
- **Résolution de problèmes**: Créer et exécuter du code pour résoudre des problèmes.

**Exemple**:
Un agent d'analyse de données :

1. **Tâche**: Analyser un jeu de données pour trouver des tendances.
2. **Étapes**:
   - Charger le jeu de données.
   - Générer des requêtes SQL pour filtrer les données.
   - Exécuter les requêtes et récupérer les résultats.
   - Générer des visualisations et des insights.
3. **Ressources**: Accès au jeu de données, capacités SQL.
4. **Expérience**: Utiliser les résultats passés pour améliorer les analyses futures.

#### Exemple pratique : Utiliser SQL dans Travel Agent

1. **Collecte des préférences utilisateur**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Génération de requêtes SQL**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Exécution des requêtes SQL**

   ```python
   import sqlite3

   def execute_sql_query(query, database="travel.db"):
       connection = sqlite3.connect(database)
       cursor = connection.cursor()
       cursor.execute(query)
       results = cursor.fetchall()
       connection.close()
       return results
   ```

4. **Génération de recommandations**

   ```python
   def generate_recommendations(preferences):
       flight_query = generate_sql_query("flights", preferences)
       hotel_query = generate_sql_query("hotels", preferences)
       attraction_query = generate_sql_query("attractions", preferences)
       
       flights = execute_sql_query(flight_query)
       hotels = execute_sql_query(hotel_query)
       attractions = execute_sql_query(attraction_query)
       
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   itinerary = generate_recommendations(preferences)
   print("Suggested Itinerary:", itinerary)
   ```

#### Exemples de requêtes SQL

1. **Requête de vol**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Requête d'hôtel**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Requête d'attraction**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

En exploitant SQL dans le cadre de la technique Retrieval-Augmented Generation (RAG), des agents d'IA comme Travel Agent peuvent récupérer et utiliser dynamiquement des données pertinentes pour fournir des recommandations précises et personnalisées.

### Exemple de métacognition

Pour démontrer une implémentation de la métacognition, créons un agent simple qui réfléchit à son processus de prise de décision pendant qu'il résout un problème. Pour cet exemple, nous construirons un système où un agent essaie d'optimiser le choix d'un hôtel, puis évalue son propre raisonnement et ajuste sa stratégie lorsqu'il commet des erreurs ou fait des choix sous-optimaux.

Nous simulerons cela en utilisant un exemple basique où l'agent sélectionne des hôtels en fonction d'une combinaison de prix et de qualité, mais il "réfléchira" à ses décisions et s'ajustera en conséquence.

#### Comment cela illustre la métacognition :

1. **Décision initiale**: L'agent choisira l'hôtel le moins cher, sans comprendre l'impact sur la qualité.
2. **Réflexion et évaluation**: Après le choix initial, l'agent vérifiera si l'hôtel est un "mauvais" choix en utilisant les retours des utilisateurs. S'il constate que la qualité de l'hôtel était trop faible, il réfléchira à son raisonnement.
3. **Ajustement de la stratégie**: L'agent ajustera sa stratégie en se basant sur sa réflexion, passant de "le moins cher" à "meilleure qualité", améliorant ainsi son processus de prise de décision lors des itérations futures.

Voici un exemple :

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Stocke les hôtels choisis précédemment
        self.corrected_choices = []  # Stocke les choix corrigés
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Stratégies disponibles

    def recommend_hotel(self, hotels, strategy):
        """
        Recommend a hotel based on the chosen strategy.
        The strategy can either be 'cheapest' or 'highest_quality'.
        """
        if strategy == 'cheapest':
            recommended = min(hotels, key=lambda x: x['price'])
        elif strategy == 'highest_quality':
            recommended = max(hotels, key=lambda x: x['quality'])
        else:
            recommended = None
        self.previous_choices.append((strategy, recommended))
        return recommended

    def reflect_on_choice(self):
        """
        Reflect on the last choice made and decide if the agent should adjust its strategy.
        The agent considers if the previous choice led to a poor outcome.
        """
        if not self.previous_choices:
            return "No choices made yet."

        last_choice_strategy, last_choice = self.previous_choices[-1]
        # Supposons que nous ayons des retours d'utilisateurs qui nous indiquent si le dernier choix était bon ou non
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Ajuster la stratégie si le choix précédent était insatisfaisant
            new_strategy = 'highest_quality' if last_choice_strategy == 'cheapest' else 'cheapest'
            self.corrected_choices.append((new_strategy, last_choice))
            return f"Reflecting on choice. Adjusting strategy to {new_strategy}."
        else:
            return "The choice was good. No need to adjust."

    def get_user_feedback(self, hotel):
        """
        Simulate user feedback based on hotel attributes.
        For simplicity, assume if the hotel is too cheap, the feedback is "bad".
        If the hotel has quality less than 7, feedback is "bad".
        """
        if hotel['price'] < 100 or hotel['quality'] < 7:
            return "bad"
        return "good"

# Simuler une liste d'hôtels (prix et qualité)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Créer un agent
agent = HotelRecommendationAgent()

# Étape 1: L'agent recommande un hôtel en utilisant la stratégie « la moins chère »
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Étape 2: L'agent réfléchit au choix et ajuste la stratégie si nécessaire
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Étape 3: L'agent recommande à nouveau, cette fois en utilisant la stratégie ajustée
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Capacités de métacognition des agents

L'essentiel ici est la capacité de l'agent à :
- Évaluer ses choix précédents et son processus de prise de décision.
- Ajuster sa stratégie en fonction de cette réflexion, c'est-à-dire mettre la métacognition en action.

Ceci est une forme simple de métacognition où le système est capable d'ajuster son processus de raisonnement en fonction de retours internes.

### Conclusion

La métacognition est un outil puissant qui peut considérablement améliorer les capacités des agents d'IA. En incorporant des processus métacognitifs, vous pouvez concevoir des agents plus intelligents, adaptables et efficaces. Utilisez les ressources supplémentaires pour explorer davantage le monde fascinant de la métacognition dans les agents d'IA.

### Vous avez d'autres questions sur le modèle de conception Métacognition ?

Rejoignez le [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) pour rencontrer d'autres apprenants, participer à des heures de bureau et obtenir des réponses à vos questions sur les agents d'IA.

## Leçon précédente

[Patron de conception multi-agent](../08-multi-agent/README.md)

## Leçon suivante

[Agents IA en production](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Avertissement :
Ce document a été traduit à l'aide du service de traduction par IA [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçons d'assurer l'exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d'origine doit être considéré comme la version faisant foi. Pour les informations critiques, il est recommandé de faire appel à une traduction professionnelle réalisée par un traducteur humain. Nous déclinons toute responsabilité en cas de malentendus ou de mauvaises interprétations résultant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->