[![Multi-Agent Design](../../../translated_images/pcm/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Klik di pikja insait wey to see video for dis lesson)_
# Metacognition for AI Agents

## Introduction

Welcome to di lesson wey dey talk about metacognition for AI agents! Dis chapter na for beginners wey dey curious how AI agents fit think about dia own thinking process dem. By di time you finish dis lesson, you go sabi di important tins dem and go fit use beta example wey go help you do metacognition for AI agent design.

## Learning Goals

After you don complete dis lesson, you go fit:

1. Understand wetin reason loops mean for agent definition dem.
2. Use planning and evaluation ways to help self-correcting agents.
3. Create your own agents wey fit change code make dem fit do beta work.

## Introduction to Metacognition

Metacognition na di big-level thinking wey involve to think about how person dey think. For AI agents, dis mean say dem go fit check and change dia actions based on how dem sabi diaself and wetin dem don experience before. Metacognition, wey be "thinking about thinking," na beta idea for how to develop agentic AI systems. E mean say AI systems dey aware of dia own inside process dem and fit watch, control, and change dia behavior the correct way. E be like how we dey read di room or check sometin wey get problem. Dis kind self-awareness fit help AI systems make beta decisions, find mistakes, and better dia work over time- e still join di Turing test and di kain talk about whether AI go ready take over.

For agentic AI systems, metacognition fit help solve many wahala like:
- Transparency: Make sure say AI systems fit explain their reason and decisions.
- Reasoning: Make AI systems fit join info well and make solid decisions.
- Adaptation: Make AI systems fit change as environment or condition change.
- Perception: Make AI systems dey accurate to recognize and understand data from their environment.

### Wetin be Metacognition?

Metacognition, or "thinking about thinking," na big-level thinking process of self-awareness and self-control about your own brain work. For AI matter, metacognition dey enable agents to check and change dia plans and actions, so dem fit solve problems and make better decisions. If you sabi metacognition, you fit create AI agents wey no just smart but also flexible and quick. For true metacognition, you go see AI reason clear about how e reason itself.

Example: “I choose cheaper flights because… I fit dey miss direct flights, so make I check again.”  
Keep track of how or why e choose some route.  
- Noting say e make mistake because e rely too much on user likes from before, so e change dia decision style and no just update final suggestion.  
- Find patterns like, “Anytime I hear user talk ‘too crowded,’ I no go just remove some attractions but also think say my way to pick ‘top attractions’ na wahala if I always use popularity.”

### Why Metacognition Important for AI Agents

Metacognition get big role for AI agent design because:

![Importance of Metacognition](../../../translated_images/pcm/importance-of-metacognition.b381afe9aae352f7.webp)

- Self-Reflection: Agents fit check dia own work and find how dem go improve.
- Adaptability: Agents fit change strategy based on past experience and environment.
- Error Correction: Agents fit find and correct mistakes by diaselves, so result go better.
- Resource Management: Agents fit manage resources like time and computer power well by planning and checking actions.

## Components of an AI Agent

Before we start to talk about metacognitive process, na important to sabi di basic parts of AI agent. AI agent usually get:

- Persona: Di personality and characteristics of agent, wey show how e dey interact with users.
- Tools: Di skills and tins wey di agent fit do.
- Skills: Di knowledge and experience wey agent get.

Di parts work together make "expertise unit" wey fit perform special work.

**Example**:  
Think about travel agent, di kind agent wey no just dey plan your holiday but e sabi change dia path based on real-time data and past customer journey experience.

### Example: Metacognition for Travel Agent Service

Imagine say you dey build travel agent wey AI power dey inside. Dis agent "Travel Agent," dey help people plan dia vacation. To use metacognition, Travel Agent go need check and change dia moves based on how e sabi diaself and past experience. Na so metacognition fits work:

#### Current Task

Di current work na to help user plan trip go Paris.

#### Steps to Finish Di Task

1. **Gather User Preferences**: Ask user about travel dates, budget, wetin dem like (e.g., museum, food, shopping), and any special request.
2. **Retrieve Information**: Find flight options, hotels, attractions, and restaurants wey fit user likes.
3. **Generate Recommendations**: Give personalize itinerary with flight details, hotel booking, and activity suggestions.
4. **Adjust Based on Feedback**: Ask user feedback on top di suggestions and change if e need am.

#### Wetin You Go Need

- Access to flight and hotel booking databases.
- Information about Paris attractions and restaurants.
- User feedback from past interactions.

#### Experience and Self-Reflection

Travel Agent dey use metacognition to check how e perform and learn from past experience. For example:

1. **Analyzing User Feedback**: Travel Agent go check user comment to know which suggestion be correct and which no be. E go change future suggestion based on dat.
2. **Adaptability**: If user talk before say e no like crowded place, Travel Agent no go suggest popular tourist spot during busy hours next time.
3. **Error Correction**: If Travel Agent make mistake for booking before, e.g., suggest hotel wey full, e go learn to check better before next suggestion.

#### Practical Developer Example

Here na small example of how Travel Agent code fit look to use metacognition:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Find flights, hotels, and attractions wey match your choice dem
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
        # Look feedback well well and change how we go recommend tins for future
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# How e take dey use am example
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

#### Why Metacognition Matter

- **Self-Reflection**: Agents fit check dia work and find areas to improve.
- **Adaptability**: Agents fit change strategy based on feedback and condition.
- **Error Correction**: Agents fit find and fix mistakes by diaselves.
- **Resource Management**: Agents fit make better use of time and computer power.

With metacognition, Travel Agent fit offer more personalize and correct travel suggestions, make user experience better.

---

## 2. Planning for Agents

Planning na serious part of AI agent behavior. E mean say you go list steps wey you need do to reach your goal, thinking about current situation, resources, and wahala wey fit show.

### Elements of Planning

- **Current Task**: Clearly say wetin di task be.
- **Steps to Complete the Task**: Break am down into smaller steps.
- **Required Resources**: Know materials or tools wey you need.
- **Experience**: Use past experience for planning.

**Example**:  
Dis na steps wey Travel Agent go do to help user plan trip well:

### Steps for Travel Agent

1. **Gather User Preferences**  
   - Ask user about travel dates, budget, likes, and special requests.  
   - Example: "When you wan travel?" "How much you fit spend?" "Which activity you like for vacation?"

2. **Retrieve Information**  
   - Search travel options wey match user preferences.  
   - **Flights**: Find available flights within user budget and travel dates.  
   - **Accommodations**: Look for hotels or rental wey fit location, price, and comfort like user want.  
   - **Attractions and Restaurants**: Pick popular attractions, things to do, and places wey serve food wey user like.

3. **Generate Recommendations**  
   - Join the information to make one personalized travel plan.  
   - Give flight options, hotel booking, and activity suggestions wey fit user preference.

4. **Present Itinerary to User**  
   - Show the travel plan to user so dem fit check am.  
   - Example: "Dis na travel plan for your trip to Paris. E get flight details, hotel booking, plus attractions and restaurant suggestions. Tell me wetin you think!"

5. **Collect Feedback**  
   - Ask user wetin dem think about the travel plan.  
   - Example: "You like the flight options?" "Di hotel good for you?" "You want add or remove any activity?"

6. **Adjust Based on Feedback**  
   - Change the plan based on user feedback.  
   - Make corrections for flight, hotel, and activity to better match user wants.

7. **Final Confirmation**  
   - Show the updated plan to user for final approval.  
   - Example: "I don update the plan based on your feedback. How e be now?"

8. **Book and Confirm Reservations**  
   - After user agree, go ahead book flights, hotels, and planned activities.  
   - Send booking details to user.

9. **Provide Ongoing Support**  
   - Stay ready to help user if dem want change anything before or during the trip.  
   - Example: "If you want any help during your trip, just reach me anytime!"

### Example Interaction

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

# Example wey you fit use for booing request
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

## 3. Corrective RAG System

First make we sabi di difference between RAG Tool and Pre-emptive Context Load

![RAG vs Context Loading](../../../translated_images/pcm/rag-vs-context.9eae588520c00921.webp)

### Retrieval-Augmented Generation (RAG)

RAG na mix of retrieval system plus one generative model. When you ask question, di retrieval system go find important documents or data from somewhere outside, then di info wey e find go help di generative model make better and accurate answers. Dis dey help model generate correct and context-based responses.

For RAG system, di agent go fetch info from knowledge base and use am to give correct answer or actions.

### Corrective RAG Approach

Corrective RAG approach na to use RAG technique to fix mistakes and make AI agents more accurate. Dis approach get:

1. **Prompting Technique**: Use specific prompt to guide agent to find correct info.
2. **Tool**: Use algorithm and method wey fit help agent check if di info e get correct and make accurate response.
3. **Evaluation**: Di agent dey always check dia work and dey adjust to improve how e dey perform.

#### Example: Corrective RAG for Search Agent

Think about search agent wey dey find info from web to answer questions. Corrective RAG fit be like:

1. **Prompting Technique**: Make search query based on user question.
2. **Tool**: Use natural language processing and machine learning to rank and sort search result.
3. **Evaluation**: Check user feedback, find errors for the retrieved info and fix them.

### Corrective RAG for Travel Agent

Corrective RAG (Retrieval-Augmented Generation) dey improve AI power to find and create info, and also fix mistakes. Make we see how Travel Agent fit use Corrective RAG to provide more accurate and correct travel recommendations.

Dis one get:

- **Prompting Technique:** Use prompt to guide agent to find correct info.
- **Tool:** Use algorithm to check if info dey relevant and create correct answer.
- **Evaluation:** Continually check agent work and adjust to make am better.

#### Steps to Use Corrective RAG for Travel Agent

1. **Initial User Interaction**  
   - Travel Agent go collect initial preferences from user, like where user wan go, travel dates, budget, and wetin user like.  
   - Example:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Retrieval of Information**  
   - Travel Agent go fetch info for flights, hotels, attractions, and restaurants based on user preference.  
   - Example:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Generating Initial Recommendations**  
   - Travel Agent go use info wey e collect make personalized itinerary.  
   - Example:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Collecting User Feedback**  
   - Travel Agent go ask user wetin dem think of di recommendations.  
   - Example:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Corrective RAG Process**  
   - **Prompting Technique**: Travel Agent go make new search queries based on user feedback.  
     - Example:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Tool**: Travel Agent go use algorithm to rank and filter new results based on user feedback.  
     - Example:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Evaluation**: Travel Agent go keep checking di relevance and accuracy of dia suggestion by analyzing user feedback and make changes.  
     - Example:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Practical Example

Here na small Python code example to add Corrective RAG in Travel Agent:

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

# Example wey you fit use am
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

### Pre-emptive Context Load
Pre-emptive Context Load mean say you dey load relevant context or background information inside di model before e start process query. Dis one mean say di model don get access to dis information from di start, and dis fit help am generate better response wey get more sense without e need come find extra data during di process.

Dis na simplified example of how pre-emptive context load fit be for travel agent application wey dem write for Python:

```python
class TravelAgent:
    def __init__(self):
        # Pre-load popular destinations and their information
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Fetch destination information from pre-loaded context
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Example usage
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Explanation

1. **Initialization (`__init__` method)**: Di `TravelAgent` class dey pre-load dictionary wey get information about popular destinations like Paris, Tokyo, New York, and Sydney. Dis dictionary get details like di country, currency, language, and main attractions for each destination.

2. **Retrieving Information (`get_destination_info` method)**: When person ask about one destination, di `get_destination_info` method go fetch di relevant information from di pre-loaded context dictionary.

By pre-loading di context, di travel agent application fit respond fast to user queries without e need find dis information from outside source during di time. Dis one make di application work well and dey quick.

### Bootstrapping the Plan with a Goal Before Iterating

Bootstrapping plan with goal mean say you start with clear objective or target wey you want achieve. If you define dis goal upfront, di model fit use am as guideline during di iterative process. Dis go help make sure say each time e go dey move closer to di goal wey you want achieve, and di process go dey more efficient and focused.

Dis example show how you fit bootstrap travel plan with goal before you start iterate for travel agent for Python:

### Scenario

One travel agent want plan custom vacation for client. Di goal na to create travel itinerary wey go maximize di client's satisfaction based on dia preferences and budget.

### Steps

1. Define di client's preferences and budget.
2. Bootstrap di initial plan based on dem preferences.
3. Iterate to refine di plan, make am better for di client's satisfaction.

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

# Example wawid for use
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

#### Code Explanation

1. **Initialization (`__init__` method)**: Di `TravelAgent` class dey initialized with list of potential destinations, wey each get attributes like name, cost, and type of activity.

2. **Bootstrapping the Plan (`bootstrap_plan` method)**: Dis method dey create initial travel plan based on di client's preferences and budget. E go check each destination for di list and add dem to di plan if dem match di client's preferences and di plan fit for di budget.

3. **Matching Preferences (`match_preferences` method)**: Dis method go check if destination go match di client's preferences.

4. **Iterating the Plan (`iterate_plan` method)**: Dis method dey refine di initial plan by trying swap each destination for better one, based on client's preferences and budget limit.

5. **Calculating Cost (`calculate_cost` method)**: Dis method dey calculate total cost of di current plan, including any new destination wey dem add.

#### Example Usage

- **Initial Plan**: Di travel agent create initial plan based on client's preferences for sightseeing and budget wey be $2000.
- **Refined Plan**: Di travel agent go iterate di plan, optimize am for di client's preferences and budget.

By bootstrap di plan with clear goal (for example, maximize client satisfaction) and iterate to refine di plan, di travel agent fit create travel itinerary wey sure and customize for di client. Dis approach make di travel plan dey align well with di client's preferences and budget from di start and e go improve each time una iterate.

### Taking Advantage of LLM for Re-ranking and Scoring

Large Language Models (LLMs) fit dey used for re-ranking and scoring by evaluating how relevant and good di retrieved documents or generated responses be. Dis na how e dey work:

**Retrieval:** First step na to fetch candidate documents or responses wey base on di query.

**Re-ranking:** Di LLM go evaluate all di candidates and rank dem again based on how relevant and good dem be. Dis one make sure say di best and correct information dey come first.

**Scoring:** Di LLM go give score to each candidate to show how relevant and good each one be. Dis one help select di best response or document for di user.

By using LLM for re-ranking and scoring, di system fit give more accurate and correct information wey match di context well, and dis way di user experience go better.

Example how travel agent fit use Large Language Model (LLM) for re-ranking and scoring travel destinations based on user preferences for Python:

#### Scenario - Travel based on Preferences

One travel agent want recommend di best travel destinations to client based on dia preferences. Di LLM go help do re-ranking and scoring to make sure only di best options show.

#### Steps:

1. Collect user preferences.
2. Retrieve list of possible travel destinations.
3. Use di LLM to re-rank and score dem based on user preferences.

Here how you fit update di previous example to use Azure OpenAI Services:

#### Requirements

1. You need get Azure subscription.
2. Create Azure OpenAI resource and get your API key.

#### Example Python Code

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Make one prompt for the Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Set headers and payload for di request
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Call di Azure OpenAI API to get di place dem wey dem rank and score
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Take out and return di recommendations
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

# Example of how to use am
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

#### Code Explanation - Preference Booker

1. **Initialization**: Di `TravelAgent` class dey initialized with list of potential travel destinations, wey each get attributes like name and description.

2. **Getting Recommendations (`get_recommendations` method)**: Dis method go generate prompt for Azure OpenAI service based on user preferences and go make HTTP POST request to Azure OpenAI API to get re-ranked and scored destinations.

3. **Generating Prompt (`generate_prompt` method)**: Dis method dey build prompt for Azure OpenAI, including user preferences and list of destinations. Di prompt dey guide di model to re-rank and score destinations based on di preferences wey you give.

4. **API Call**: Dem dey use `requests` library to make HTTP POST request to Azure OpenAI API. Di response get di re-ranked and scored destinations.

5. **Example Usage**: Di travel agent collect user preferences (like interest for sightseeing and diverse culture) and use Azure OpenAI service to get better ranked and scored recommendations for travel destinations.

Make sure say you replace `your_azure_openai_api_key` with your real Azure OpenAI API key and `https://your-endpoint.com/...` with di actual endpoint URL for your Azure OpenAI deployment.

By taking advantage of LLM for re-ranking and scoring, di travel agent fit give more personalized and relevant travel recommendations to clients, to boost their overall experience.

### RAG: Prompting Technique vs Tool

Retrieval-Augmented Generation (RAG) fit be both prompting technique and tool for development of AI agents. To sabi di difference between di two go help you use RAG better for your projects.

#### RAG as a Prompting Technique

**Wetin e mean?**

- As prompting technique, RAG dey involve form form di queries or prompts wey go guide retrieval of relevant information from large corpus or database. Di information go then dey used to generate answers or actions.

**How e dey work:**

1. **Formulate Prompts**: Create well-structured prompts or queries based on di task or di user's input.
2. **Retrieve Information**: Use di prompts find relevant data from knowledge base or dataset wey already dey.
3. **Generate Response**: Combine di information wey dem retrieve with generative AI model to produce correct and complete response.

**Example for Travel Agent**:

- User Input: "I want to visit museums in Paris."
- Prompt: "Find top museums in Paris."
- Retrieved Information: Details about Louvre Museum, Musée d'Orsay, etc.
- Generated Response: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

#### RAG as a Tool

**Wetin e mean?**

- As tool, RAG na system wey dey automate retrieval and generation process, e make am easy for developers to implement complex AI functionality without them need to manually craft prompts for each query.

**How e dey work:**

1. **Integration**: Embed RAG inside AI agent's architecture, so that e fit handle retrieval and generation tasks automatically.
2. **Automation**: Di tool go manage everything, from receiving user input to generate final answers, without need prompts for each time.
3. **Efficiency**: E improve agent's performance by making retrieval and generation process faster and more accurate.

**Example for Travel Agent**:

- User Input: "I want to visit museums in Paris."
- RAG Tool: Automatically go find information about museums and generate answer.
- Generated Response: "Here are some top museums in Paris: Louvre Museum, Musée d'Orsay, and Centre Pompidou."

### Comparison

| Aspect                 | Prompting Technique                                        | Tool                                                  |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Manual vs Automatic**| Manual formulation of prompts for each query.               | Automated process for retrieval and generation.       |
| **Control**            | Offers more control over the retrieval process.             | Streamlines and automates the retrieval and generation.|
| **Flexibility**        | Allows for customized prompts based on specific needs.      | More efficient for large-scale implementations.       |
| **Complexity**         | Requires crafting and tweaking of prompts.                  | Easier to integrate within an AI agent's architecture. |

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

Evaluating relevancy na very important part for AI agent performance. E dey make sure say information wey di agent retrieve and generate dey appropriate, correct, and useful to di user. Make we check how to evaluate relevancy for AI agents, including examples and techniques.

#### Key Concepts in Evaluating Relevancy

1. **Context Awareness**:
   - Di agent must sabi di context of di user's query to retrieve and generate relevant information.
   - Example: If user ask "best restaurants in Paris," di agent suppose consider user's preferences like kind of food and budget.

2. **Accuracy**:
   - Di info wey di agent give must dey factually correct and updated.
   - Example: Recommend restaurants wey dey open currently with good reviews, no outdated or closed one.

3. **User Intent**:
   - Di agent must understand di actual meaning or intention behind di query to give best info.
   - Example: If user ask "budget-friendly hotels," di agent suppose put affordable options first.

4. **Feedback Loop**:
   - Continuous collection and analysis of user feedback help agent refine how e evaluate relevancy.
   - Example: Use user ratings and feedback on previous recommendations to improve future answers.

#### Practical Techniques for Evaluating Relevancy

1. **Relevance Scoring**:
   - Assign relevance score to each retrieved item based on how well e match di user's query and preferences.
   - Example:

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

2. **Filtering and Ranking**:
   - Remove irrelevant items and rank di remaining ones based on their relevance scores.
   - Example:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Return di top 10 items wey make sense
     ```

3. **Natural Language Processing (NLP)**:
   - Use NLP methods to understand user's query and find relevant info.
   - Example:

     ```python
     def process_query(query):
         # Use NLP to comot main tins from di user question
         processed_query = nlp(query)
         return processed_query
     ```

4. **User Feedback Integration**:
   - Collect user feedback on recommendations given and use am to adjust future relevance evaluation.
   - Example:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Example: Evaluating Relevancy in Travel Agent

Dis na practical example of how Travel Agent fit evaluate relevancy of travel recommendations:

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
        return ranked_items[:10]  # Return di top 10 tings wey relate

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

# Example how to use am
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

Searching with intent mean say you understand and interpret di underlying purpose or goal behind di user's query to find and generate the most relevant and useful info. Dis approach pass just matching keywords, e dey try grasp di user's true needs and context.

#### Key Concepts in Searching with Intent

1. **Understanding User Intent**:
   - User intent fit fall into three main types: informational, navigational, and transactional.
     - **Informational Intent**: User want information about topic (ex: "What are the best museums in Paris?").
     - **Navigational Intent**: User want find specific website or page (ex: "Louvre Museum official website").
     - **Transactional Intent**: User want do transaction like booking flight or buy something (ex: "Book a flight to Paris").

2. **Context Awareness**:
   - Analyze context of user's query to correctly identify dem intent. Dis fit include previous interactions, user preferences, and details of current query.

3. **Natural Language Processing (NLP)**:
   - Use NLP techniques to understand and interpret natural language queries. This fit include entity recognition, sentiment analysis, parsing query.

4. **Personalization**:
   - Personalize search results based on user's history, preferences, and feedback to improve relevancy of info found.

#### Practical Example: Searching with Intent in Travel Agent

Make we use Travel Agent as example to see how searching with intent fit work.

1. **Gathering User Preferences**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Understanding User Intent**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Context Awareness**
   ```python
   def analyze_context(query, user_history):
       # Join wetin user don yan before with dis query to sabi wetin e mean for inside
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Search and Personalize Results**

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
       # Example search logic for informational intent
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Example search logic for navigational intent
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Example search logic for transactional intent
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Example personalization logic
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Return top 10 personalized results
   ```

5. **Example Usage**

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

## 4. Generating Code as a Tool

Code generating agents dey use AI models to write and run code, wen dem dey solve complex problems and dey automate tasks.

### Code Generating Agents

Code generating agents dey use generative AI models to write and run code. Dem fit solve complex problems, automate tasks, and provide beta insights by generating and running code for different programming languages.

#### Practical Applications

1. **Automated Code Generation**: Generate code snippets for specific tasks, like data analysis, web scraping, or machine learning.
2. **SQL as a RAG**: Use SQL queries to collect and manipulate data from databases.
3. **Problem Solving**: Create and run code to solve particular problems, like making algorithms beta or analyzing data.

#### Example: Code Generating Agent for Data Analysis

Imagine sey you dey design code generating agent. Dis na how e fit work:

1. **Task**: Analyze dataset to see trends and patterns.
2. **Steps**:
   - Load the dataset into data analysis tool.
   - Generate SQL queries to filter and arrange the data.
   - Run the queries and collect the results.
   - Use the results take generate visuals and insights.
3. **Required Resources**: Access to dataset, data analysis tools, and SQL powers.
4. **Experience**: Use past analysis results to improve how accurate and relevant future analysis go be.

### Example: Code Generating Agent for Travel Agent

For this example, we go design a code generating agent, Travel Agent, wey go help users plan their travel by generating and running code. Dis agent fit do things like fetch travel options, filter results, and compile itinerary using generative AI.

#### Overview of the Code Generating Agent

1. **Gathering User Preferences**: Collect user input like destination, travel date dem, budget, and interests.
2. **Generating Code to Fetch Data**: Generate code snippets wey go collect data about flights, hotels, and attractions.
3. **Executing Generated Code**: Run the generated code to fetch real-time info.
4. **Generating Itinerary**: Arrange the fetched data into personal travel plan.
5. **Adjusting Based on Feedback**: Take user feedback and generate code again if e need to improve the results.

#### Step-by-Step Implementation

1. **Gathering User Preferences**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generating Code to Fetch Data**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Example: Make code wey go find flights based on wetin person like
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Example: Make code wey go find hotels
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Executing Generated Code**

   ```python
   def execute_code(code):
       # Run the code wey dem generate wit exec
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

4. **Generating Itinerary**

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

5. **Adjusting Based on Feedback**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Change di settings based on wetin di user talk
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Make code again and run am with di new settings
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Leveraging environmental awareness and reasoning

Based on how the table schema be fit make query generation better by using environmental awareness and reasoning.

Here na example how you fit do am:

1. **Understanding the Schema**: The system go sabi how the table schema be and use am take guide the query generation.
2. **Adjusting Based on Feedback**: The system go adjust user preferences base on feedback and reason which field for the schema need update.
3. **Generating and Executing Queries**: The system go generate and run queries to get updated flight and hotel data based on new preferences.

Here be updated Python code example wey join these things:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Change how e go be based on wetin user talk
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Reasoning based on schema to change other related preferences
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Custom logic to change preferences based on schema and feedback
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Make code to collect flight data based on updated preferences
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Make code to collect hotel data based on updated preferences
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Try run code for play and return fake data
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Make itinerary based on flights, hotels, and places wey people like
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Example schema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Example usage
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Make code again and run am with updated preferences
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Explanation - Booking Based on Feedback

1. **Schema Awareness**: The `schema` dictionary dey define how to adjust preferences based on feedback. E get fields like `favorites` and `avoid` with their adjustment dem.
2. **Adjusting Preferences (`adjust_based_on_feedback` method)**: This method dey change preferences based on user feedback and the schema.
3. **Environment-Based Adjustments (`adjust_based_on_environment` method)**: This method dey customize adjustments based on schema and feedback.
4. **Generating and Executing Queries**: The system dey generate code to fetch updated flight and hotel data based on adjusted preferences and e dey pretend run the queries.
5. **Generating Itinerary**: The system go create updated itinerary based on new flight, hotel, and attraction data.

If system sabi environment well and reason based on schema, e go fit generate more correct and relevant queries, wey go make travel recommendations beta and user experience more personalized.

### Using SQL as a Retrieval-Augmented Generation (RAG) Technique

SQL (Structured Query Language) na strong tool for interacting with databases. When you use am as part of Retrieval-Augmented Generation (RAG) approach, SQL fit collect relevant data from databases to help generate responses or actions for AI agents. Make we check how SQL fit take act as RAG technique inside Travel Agent.

#### Key Concepts

1. **Database Interaction**:
   - SQL dey used to query databases, carry relevant info come and manipulate data.
   - Example: Fetch flight detail dem, hotel info, and attractions from travel database.

2. **Integration with RAG**:
   - SQL queries dey generated based on user input and preferences.
   - The data wey dem collect go then dey used to generate personalized recommendations or actions.

3. **Dynamic Query Generation**:
   - The AI agent dey generate dynamic SQL queries based on context and user needs.
   - Example: Customize SQL queries to filter results based on budget, dates, and interests.

#### Applications

- **Automated Code Generation**: Generate code snippets for special tasks.
- **SQL as a RAG**: Use SQL queries to manipulate data.
- **Problem Solving**: Create and run code to solve problems.

**Example**:
Data analysis agent:

1. **Task**: Analyze dataset to find trends.
2. **Steps**:
   - Load the dataset.
   - Generate SQL queries to filter data.
   - Run queries and collect results.
   - Generate visuals and insights.
3. **Resources**: Dataset access, SQL skills.
4. **Experience**: Use past results to improve future analyses.

#### Practical Example: Using SQL in Travel Agent

1. **Gathering User Preferences**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Generating SQL Queries**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Executing SQL Queries**

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

4. **Generating Recommendations**

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

#### Example SQL Queries

1. **Flight Query**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Hotel Query**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Attraction Query**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

By using SQL as part of Retrieval-Augmented Generation (RAG) technique, AI agents like Travel Agent fit dynamically fetch and use relevant data to provide accurate and personalized recommendations.

### Example of Metacongition

Make we show implementation of metacognition by creating simple agent wey *reflect on how e dey make decisions* while e dey solve problem. For this example, we go build system wey agent dey try optimize how e take choose hotel, but e go first evaluate im own reasoning and change strategy when e make mistake or bad choices.

We go simulate dis using simple example where agent dey select hotels based on combination of price and quality, but e go "reflect" on decisions and change am well.

#### How dis show metacognition:

1. **Initial Decision**: Agent go pick cheapest hotel, without understanding quality.
2. **Reflection and Evaluation**: After first choice, agent go check if hotel na "bad" choice based on user feedback. If e find say hotel quality no good, e go reflect on its reasoning.
3. **Adjusting Strategy**: Agent go change strategy based on reflection from "cheapest" to "highest_quality", so e fit make beta decision for future.

Here na example:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # De store di hotels wey dem bin choose before
        self.corrected_choices = []  # De store di correct choices
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Strategies wey dey available

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
        # Make we assume say we get some user feedback wey tell us if di last choice good or no
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Change strategy if di last choice no satisfy
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

# Make list of hotels (price and quality) like for example
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Make one agent
agent = HotelRecommendationAgent()

# Step 1: Di agent dey recommend hotel wit di "cheapest" strategy
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Step 2: Di agent dey think for di choice and e change strategy if e need
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Step 3: Di agent go recommend again, dis time e go use di adjusted strategy
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Agents Metacognition Abilities

Wetin important here na the agent ability to:
- Check how e take choose before plus decision making process.
- Change strategy based on the reflection, dat na metacognition for action.

Dis na simple form of metacognition where system fit adjust reasoning based on internal feedback.

### Conclusion

Metacognition na powerful tool wey fit improve how AI agents dey operate. If you add metacognitive processes, you fit design agents wey smarter, adaptable, and efficient. Use the extra materials to sabi more about the beta world of metacognition for AI agents.

### Got More Questions about the Metacognition Design Pattern?

Join [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet other learners, attend office hours and make you fit ask all your AI Agents questions.

## Previous Lesson

[Multi-Agent Design Pattern](../08-multi-agent/README.md)

## Next Lesson

[AI Agents in Production](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even tho we dey try make am correct, abeg sabi say automated translation fit get errors or wahala. Di original document wey e dey for im correct language na di main pipo suppose trust. For important mata, e better make person wey sabi translate am well do am. We no go responsible for any misunderstanding or wrong meaning wey fit happen based on dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->