# Εξερεύνηση του Πλαισίου Microsoft Agent

![Agent Framework](../../../translated_images/el/lesson-14-thumbnail.90df0065b9d234ee.webp)

### Εισαγωγή

Το μάθημα αυτό θα καλύψει:

- Κατανόηση του Πλαισίου Microsoft Agent: Βασικά Χαρακτηριστικά και Αξία  
- Εξερεύνηση των Κύριων Εννοιών του Πλαισίου Microsoft Agent
- Προχωρημένα Πρότυπα MAF: Ροές εργασίας, Middleware και Μνήμη

## Στόχοι Μάθησης

Μετά την ολοκλήρωση αυτού του μαθήματος, θα ξέρετε πώς να:

- Δημιουργείτε Παραγωγικούς Έτοιμους AI Πράκτορες χρησιμοποιώντας το Πλαίσιο Microsoft Agent
- Εφαρμόζετε τα βασικά χαρακτηριστικά του Πλαισίου Microsoft Agent στις χρήσεις σας με πράκτορες
- Χρησιμοποιείτε προχωρημένα πρότυπα όπως ροές εργασίας, middleware και παρατηρησιμότητα

## Παραδείγματα Κώδικα 

Παραδείγματα κώδικα για το [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) μπορούν να βρεθούν σε αυτό το αποθετήριο στα αρχεία `xx-python-agent-framework` και `xx-dotnet-agent-framework`.

## Κατανόηση του Πλαισίου Microsoft Agent

![Framework Intro](../../../translated_images/el/framework-intro.077af16617cf130c.webp)

Το [Microsoft Agent Framework (MAF)](https://aka.ms/ai-agents-beginners/agent-framework) είναι το ενοποιημένο πλαίσιο της Microsoft για τη δημιουργία AI πρακτόρων. Προσφέρει την ευελιξία να αντιμετωπίσει την ποικιλία των χρήσεων πρακτόρων που βλέπουμε τόσο σε παραγωγικά όσο και σε ερευνητικά περιβάλλοντα, όπως:

- **Αυστηρή διαχείριση πρακτόρων κατά σειρά** σε σενάρια όπου απαιτούνται βήμα-βήμα ροές εργασίας.
- **Παράλληλη διαχείριση** σε σενάρια όπου οι πράκτορες πρέπει να ολοκληρώσουν εργασίες ταυτόχρονα.
- **Ομαδική διαχείριση συνομιλιών** σε σενάρια όπου οι πράκτορες μπορούν να συνεργαστούν για μια εργασία.
- **Διαχείριση παραδόσεων εργασιών** σε σενάρια όπου οι πράκτορες παραδίδουν την εργασία ο ένας στον άλλο καθώς ολοκληρώνονται οι υποεργασίες.
- **Μαγνητική διαχείριση** σε σενάρια όπου ένας διαχειριστής πράκτορας δημιουργεί και τροποποιεί λίστα εργασιών και συντονίζει τους υποπράκτορες για την ολοκλήρωση της εργασίας.

Για την παράδοση AI Πρακτόρων σε Παραγωγή, το MAF έχει επίσης συμπεριλάβει χαρακτηριστικά για:

- **Παρατηρησιμότητα** μέσω της χρήσης του OpenTelemetry όπου κάθε ενέργεια του AI Πράκτορα, συμπεριλαμβανομένης της κλήσης εργαλείων, βημάτων ορχήστρωσης, ροών συλλογισμού και παρακολούθησης απόδοσης μέσω των Microsoft Foundry dashboards.
- **Ασφάλεια** με τη φιλοξενία πρακτόρων εγγενώς στο Microsoft Foundry που περιλαμβάνει ελέγχους ασφαλείας όπως πρόσβαση με βάση ρόλους, διαχείριση ιδιωτικών δεδομένων και ενσωματωμένη ασφάλεια περιεχομένου.
- **Ανθεκτικότητα** καθώς τα νήματα και οι ροές εργασίας των πρακτόρων μπορούν να παύσουν, να επανεκκινηθούν και να ανακάμψουν από σφάλματα, επιτρέποντας μακροχρόνιες διεργασίες.
- **Έλεγχος** καθώς υποστηρίζονται ροές εργασίας ανθρώπου στο βρόχο όπου οι εργασίες επισημαίνονται ως απαιτούσες ανθρώπινη έγκριση.

Το Microsoft Agent Framework εστιάζει επίσης στο να είναι διαλειτουργικό μέσω:

- **Επαναχρησιμοποίηση ανεξάρτητου cloud** - Οι πράκτορες μπορούν να τρέχουν σε containers, on-prem και σε πολλαπλά διαφορετικά clouds.
- **Ανεξαρτησία προμηθευτών** - Οι πράκτορες μπορούν να δημιουργηθούν μέσω του προτιμώμενου SDK σας, περιλαμβανομένων Azure OpenAI και OpenAI
- **Ενσωμάτωση ανοιχτών προτύπων** - Οι πράκτορες μπορούν να χρησιμοποιούν πρωτόκολλα όπως Agent-to-Agent(A2A) και Model Context Protocol (MCP) για να ανακαλύπτουν και να χρησιμοποιούν άλλους πράκτορες και εργαλεία.
- **Plugins και Συνδέσεις** - Μπορούν να γίνουν συνδέσεις με υπηρεσίες δεδομένων και μνήμης όπως το Microsoft Fabric, SharePoint, Pinecone και Qdrant.

Ας δούμε πώς αυτά τα χαρακτηριστικά εφαρμόζονται σε μερικές από τις βασικές έννοιες του Microsoft Agent Framework.

## Κύριες Έννοιες του Microsoft Agent Framework

### Πράκτορες

![Agent Framework](../../../translated_images/el/agent-components.410a06daf87b4fef.webp)

**Δημιουργία Πρακτόρων**

Η δημιουργία πράκτορα γίνεται ορίζοντας την υπηρεσία συμπερασμού (LLM Provider), ένα
σύνολο οδηγιών που ο AI Πράκτορας πρέπει να ακολουθεί, και ένα εκχωρημένο `name`:

```python
agent = AzureOpenAIChatClient(credential=AzureCliCredential()).create_agent( instructions="You are good at recommending trips to customers based on their preferences.", name="TripRecommender" )
```

Το παραπάνω χρησιμοποιεί το `Azure OpenAI` αλλά οι πράκτορες μπορούν να δημιουργηθούν χρησιμοποιώντας μια ποικιλία υπηρεσιών συμπεριλαμβανομένου του `Microsoft Foundry Agent Service`:

```python
AzureAIAgentClient(async_credential=credential).create_agent( name="HelperAgent", instructions="You are a helpful assistant." ) as agent
```

Απαντήσεις OpenAI `Responses`, `ChatCompletion` APIs

```python
agent = OpenAIResponsesClient().create_agent( name="WeatherBot", instructions="You are a helpful weather assistant.", )
```

```python
agent = OpenAIChatClient().create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ή [MiniMax](https://platform.minimaxi.com/), που παρέχει ένα API συμβατό με το OpenAI με μεγάλες περιοχές περιβάλλοντος (έως 204K tokens):

```python
agent = OpenAIChatClient(base_url="https://api.minimax.io/v1", api_key=os.environ["MINIMAX_API_KEY"], model_id="MiniMax-M3").create_agent( name="HelpfulAssistant", instructions="You are a helpful assistant.", )
```

ή απομακρυσμένους πράκτορες που χρησιμοποιούν το πρωτόκολλο A2A:

```python
agent = A2AAgent( name=agent_card.name, description=agent_card.description, agent_card=agent_card, url="https://your-a2a-agent-host" )
```

**Εκτέλεση Πρακτόρων**

Οι πράκτορες τρέχουν χρησιμοποιώντας τις μεθόδους `.run` ή `.run_stream` για μη ροή ή ροή απαντήσεων αντίστοιχα.

```python
result = await agent.run("What are good places to visit in Amsterdam?")
print(result.text)
```

```python
async for update in agent.run_stream("What are the good places to visit in Amsterdam?"):
    if update.text:
        print(update.text, end="", flush=True)

```

Κάθε εκτέλεση πράκτορα μπορεί επίσης να έχει επιλογές για προσαρμογή παραμέτρων όπως `max_tokens` που χρησιμοποιούνται από τον πράκτορα, `tools` που ο πράκτορας μπορεί να καλέσει, και ακόμη και το ίδιο το `model` που χρησιμοποιείται για τον πράκτορα.

Αυτό είναι χρήσιμο σε περιπτώσεις όπου απαιτούνται συγκεκριμένα μοντέλα ή εργαλεία για την ολοκλήρωση μιας εργασίας χρήστη.

**Εργαλεία**

Τα εργαλεία μπορούν να οριστούν τόσο κατά τον ορισμό του πράκτορα:

```python
def get_attractions( location: Annotated[str, Field(description="The location to get the top tourist attractions for")], ) -> str: """Get the top tourist attractions for a given location.""" return f"The top attractions for {location} are." 


# Όταν δημιουργείτε έναν ChatAgent απευθείας

agent = ChatAgent( chat_client=OpenAIChatClient(), instructions="You are a helpful assistant", tools=[get_attractions]

```

όσο και κατά την εκτέλεση του πράκτορα:

```python

result1 = await agent.run( "What's the best place to visit in Seattle?", tools=[get_attractions] # Εργαλείο που παρέχεται μόνο για αυτήν την εκτέλεση )
```

**νήματα Πρακτόρων**

Τα νήματα πρακτόρων χρησιμοποιούνται για τη διαχείριση συζητήσεων πολλαπλών γύρων. Τα νήματα μπορούν να δημιουργηθούν είτε με:

- Χρήση του `get_new_thread()` που επιτρέπει την αποθήκευση του νήματος με την πάροδο του χρόνου
- Αυτόματη δημιουργία νήματος κατά την εκτέλεση πράκτορα και το νήμα να διαρκεί μόνο κατά τη διάρκεια της τρέχουσας εκτέλεσης.

Για να δημιουργήσετε ένα νήμα, ο κώδικας είναι ως εξής:

```python
# Δημιουργήστε ένα νέο νήμα.
thread = agent.get_new_thread() # Εκτελέστε τον πράκτορα με το νήμα.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)

```

Μπορείτε στη συνέχεια να σειριοποιήσετε το νήμα για να αποθηκευτεί για μελλοντική χρήση:

```python
# Δημιουργήστε ένα νέο νήμα.
thread = agent.get_new_thread() 

# Εκτελέστε τον πράκτορα με το νήμα.

response = await agent.run("Hello, how are you?", thread=thread) 

# Σειριοποιήστε το νήμα για αποθήκευση.

serialized_thread = await thread.serialize() 

# Αποσειριοποιήστε την κατάσταση του νήματος μετά τη φόρτωση από την αποθήκευση.

resumed_thread = await agent.deserialize_thread(serialized_thread)
```

**Middleware Πρακτόρων**

Οι πράκτορες αλληλεπιδρούν με εργαλεία και LLM για να ολοκληρώσουν τις εργασίες των χρηστών. Σε ορισμένα σενάρια, θέλουμε να εκτελέσουμε ή να παρακολουθήσουμε ανάμεσα σε αυτές τις αλληλεπιδράσεις. Το middleware των πρακτόρων μας επιτρέπει να το κάνουμε αυτό μέσω:

*Middleware Λειτουργίας*

Αυτό το middleware μας επιτρέπει να εκτελέσουμε μια ενέργεια μεταξύ του πράκτορα και μιας συνάρτησης/εργαλείου που θα καλέσει. Ένα παράδειγμα χρήσης είναι όταν θέλετε να κάνετε καταγραφή (logging) της κλήσης της συνάρτησης.

Στον παρακάτω κώδικα, το `next` καθορίζει αν θα κληθεί το επόμενο middleware ή η ίδια η συνάρτηση.

```python
async def logging_function_middleware(
    context: FunctionInvocationContext,
    next: Callable[[FunctionInvocationContext], Awaitable[None]],
) -> None:
    """Function middleware that logs function execution."""
    # Προ-επεξεργασία: Καταγραφή πριν την εκτέλεση της συνάρτησης
    print(f"[Function] Calling {context.function.name}")

    # Συνέχεια στο επόμενο middleware ή εκτέλεση συνάρτησης
    await next(context)

    # Μετα-επεξεργασία: Καταγραφή μετά την εκτέλεση της συνάρτησης
    print(f"[Function] {context.function.name} completed")
```

*Middleware Συνομιλίας*

Το middleware αυτό μας επιτρέπει να εκτελέσουμε ή να καταγράψουμε μια ενέργεια ανάμεσα στον πράκτορα και τα αιτήματα προς το LLM.

Περιλαμβάνει σημαντικές πληροφορίες όπως τα `messages` που αποστέλλονται στην υπηρεσία AI.

```python
async def logging_chat_middleware(
    context: ChatContext,
    next: Callable[[ChatContext], Awaitable[None]],
) -> None:
    """Chat middleware that logs AI interactions."""
    # Προεπεξεργασία: Καταγραφή πριν την κλήση AI
    print(f"[Chat] Sending {len(context.messages)} messages to AI")

    # Συνέχεια στο επόμενο ενδιάμεσο λογισμικό ή υπηρεσία AI
    await next(context)

    # Μετα-επεξεργασία: Καταγραφή μετά την απόκριση AI
    print("[Chat] AI response received")

```

**Μνήμη Πρακτόρων**

Όπως καλύφθηκε στο μάθημα `Agentic Memory`, η μνήμη είναι σημαντικό στοιχείο για την ενεργοποίηση λειτουργίας του πράκτορα σε διαφορετικά συμφραζόμενα. Το MAF προσφέρει διάφορους τύπους μνήμης:

*Εσωτερική Αποθήκευση Μνήμης*

Πρόκειται για τη μνήμη που αποθηκεύεται στα νήματα κατά το χρόνο εκτέλεσης της εφαρμογής.

```python
# Δημιουργήστε ένα νέο νήμα.
thread = agent.get_new_thread() # Εκτελέστε τον πράκτορα με το νήμα.
response = await agent.run("Hello, I am here to help you book travel. Where would you like to go?", thread=thread)
```

*Επίμονες Ειδοποιήσεις*

Αυτή η μνήμη χρησιμοποιείται κατά την αποθήκευση του ιστορικού συνομιλιών σε διαφορετικές συνεδρίες. Ορίζεται μέσω του `chat_message_store_factory`:

```python
from agent_framework import ChatMessageStore

# Δημιουργήστε ένα προσαρμοσμένο κατάστημα μηνυμάτων
def create_message_store():
    return ChatMessageStore()

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a Travel assistant.",
    chat_message_store_factory=create_message_store
)

```

*Δυναμική Μνήμη*

Αυτή η μνήμη προστίθεται στο συμφραζόμενο πριν από την εκτέλεση των πρακτόρων. Αυτές οι μνήμες μπορούν να αποθηκευτούν σε εξωτερικές υπηρεσίες όπως το mem0:

```python
from agent_framework.mem0 import Mem0Provider

# Χρήση του Mem0 για προηγμένες δυνατότητες μνήμης
memory_provider = Mem0Provider(
    api_key="your-mem0-api-key",
    user_id="user_123",
    application_id="my_app"
)

agent = ChatAgent(
    chat_client=OpenAIChatClient(),
    instructions="You are a helpful assistant with memory.",
    context_providers=memory_provider
)

```

**Παρατηρησιμότητα Πρακτόρων**

Η παρατηρησιμότητα είναι σημαντική για την κατασκευή αξιόπιστων και συντηρήσιμων συστημάτων πρακτόρων. Το MAF ενσωματώνεται με το OpenTelemetry για να παρέχει παρακολούθηση και μετρητές για καλύτερη παρατηρησιμότητα.

```python
from agent_framework.observability import get_tracer, get_meter

tracer = get_tracer()
meter = get_meter()
with tracer.start_as_current_span("my_custom_span"):
    # κάνε κάτι
    pass
counter = meter.create_counter("my_custom_counter")
counter.add(1, {"key": "value"})
```

### Ροές Εργασίας

Το MAF προσφέρει ροές εργασίας που είναι προκαθορισμένα βήματα για την ολοκλήρωση μιας εργασίας και περιλαμβάνουν AI πράκτορες ως συστατικά σε αυτά τα βήματα.

Οι ροές εργασίας αποτελούνται από διάφορα στοιχεία που επιτρέπουν καλύτερο έλεγχο ροής. Επιπλέον, οι ροές εργασίας υποστηρίζουν **ορχήστρωση πολλαπλών πρακτόρων** και **σημεία ελέγχου** για την αποθήκευση καταστάσεων ροής εργασίας.

Τα βασικά στοιχεία μιας ροής εργασίας είναι:

**Εκτελεστές**

Οι εκτελεστές λαμβάνουν εισερχόμενα μηνύματα, εκτελούν τις ανατιθέμενες εργασίες τους και παράγουν ένα εξερχόμενο μήνυμα. Αυτό προωθεί τη ροή εργασίας προς την ολοκλήρωση μιας μεγαλύτερης εργασίας. Οι εκτελεστές μπορεί να είναι είτε AI πράκτορες είτε προσαρμοσμένη λογική.

**Ακμές**

Οι ακμές χρησιμοποιούνται για να ορίσουν τη ροή των μηνυμάτων σε μια ροή εργασίας. Αυτές μπορούν να είναι:

*Άμεσες ακμές* - Απλές συνδέσεις ένα προς ένα μεταξύ των εκτελεστών:

```python
from agent_framework import WorkflowBuilder

builder = WorkflowBuilder()
builder.add_edge(source_executor, target_executor)
builder.set_start_executor(source_executor)
workflow = builder.build()
```

*Υπό Όρους Ακμές* - Ενεργοποιούνται όταν πληρείται μια συγκεκριμένη συνθήκη. Για παράδειγμα, όταν τα δωμάτια ξενοδοχείων δεν είναι διαθέσιμα, ένας εκτελεστής μπορεί να προτείνει άλλες επιλογές.

*Ακμές εναλλαγής-περίπτωσης* - Δρομολογούν μηνύματα σε διαφορετικούς εκτελεστές βάσει ορισμένων συνθηκών. Για παράδειγμα, αν ένας πελάτης ταξιδιού έχει προτεραιότητα πρόσβασης, οι εργασίες του θα διαχειρίζονται μέσω μιας άλλης ροής εργασίας.

*Ακμές πολλαπλής διάδοσης* - Στέλνουν ένα μήνυμα σε πολλούς στόχους.

*Ακμές πολλαπλής εισροής* - Συλλέγουν πολλαπλά μηνύματα από διαφορετικούς εκτελεστές και τα στέλνουν σε έναν στόχο.

**Γεγονότα**

Για να παρέχει καλύτερη παρατηρησιμότητα στις ροές εργασίας, το MAF προσφέρει ενσωματωμένα γεγονότα εκτέλεσης όπως:

- `WorkflowStartedEvent`  - Ξεκινά η εκτέλεση της ροής εργασίας
- `WorkflowOutputEvent` - Η ροή εργασίας παράγει έξοδο
- `WorkflowErrorEvent` - Η ροή εργασίας αντιμετωπίζει σφάλμα
- `ExecutorInvokeEvent`  - Ο εκτελεστής ξεκινά την επεξεργασία
- `ExecutorCompleteEvent`  -  Ο εκτελεστής ολοκληρώνει την επεξεργασία
- `RequestInfoEvent` - Εκδίδεται ένα αίτημα

## Προχωρημένα Πρότυπα MAF

Τα παραπάνω τμήματα καλύπτουν τις βασικές έννοιες του Microsoft Agent Framework. Καθώς δημιουργείτε πιο πολύπλοκους πράκτορες, εδώ είναι μερικά προχωρημένα πρότυπα για να σκεφτείτε:

- **Σύνθεση Middleware**: Συνδέστε πολλαπλούς χειριστές middleware (καταγραφή, αυθεντικοποίηση, περιορισμός ρυθμού) χρησιμοποιώντας middleware λειτουργίας και συνομιλίας για λεπτομερή έλεγχο της συμπεριφοράς του πράκτορα.
- **Σημεία ελέγχου ροής εργασίας**: Χρησιμοποιήστε γεγονότα ροής εργασίας και σειριοποίηση για να αποθηκεύσετε και να συνεχίσετε μακροχρόνιες διεργασίες πρακτόρων.
- **Δυναμική επιλογή εργαλείων**: Συνδυάστε RAG με τις περιγραφές εργαλείων και την καταχώριση εργαλείων του MAF για να παρουσιάζετε μόνο σχετικά εργαλεία ανά ερώτημα.
- **Παράδοση μεταξύ πολλαπλών πρακτόρων**: Χρησιμοποιήστε ακμές και υπό όρους δρομολόγηση ροής εργασίας για να οργανώσετε παραδόσεις μεταξύ εξειδικευμένων πρακτόρων.

## Φιλοξενία Πρακτόρων LangChain / LangGraph στο Microsoft Foundry

Το Microsoft Agent Framework είναι **διαλειτουργικό πλαίσιο** — δεν περιορίζεστε σε πράκτορες γραμμένους με το MAF. Αν ήδη έχετε έναν πράκτορα χτισμένο με **LangChain** ή **LangGraph**, μπορείτε να τον τρέξετε ως **πράκτορα φιλοξενούμενο στο Microsoft Foundry** έτσι ώστε το Foundry να διαχειρίζεται το runtime, τις συνεδρίες, την κλιμάκωση, την ταυτότητα και τα σημεία τερματισμού πρωτοκόλλου για εσάς, ενώ η λογική του πράκτορα παραμένει στο LangGraph.

Αυτό γίνεται με το πακέτο `langchain_azure_ai.agents.hosting`, το οποίο εκθέτει έναν μεταγλωττισμένο γράφο LangGraph μέσω των ίδιων πρωτοκόλλων που χρησιμοποιούν οι πράκτορες φιλοξενούμενοι στο Foundry.

**1. Εγκαταστήστε το hosting επιπλέον πακέτο:**

```bash
pip install -U "langchain-azure-ai[hosting]>=1.2.4" azure-identity
```

Το `hosting` επιπλέον πακέτο εγκαθιστά τις βιβλιοθήκες πρωτοκόλλου Foundry: `azure-ai-agentserver-responses` (το συμβατό με OpenAI endpoint `/responses`) και `azure-ai-agentserver-invocations` (το γενικό endpoint `/invocations`).

**2. Επιλέξτε πρωτόκολλο φιλοξενίας:**

| Πρωτόκολλο | Κλάση Φιλοξενίας | Τερματικό Σημείο | Χρήση όταν |
|----------|-----------|----------|----------|
| **Responses** | `ResponsesHostServer` | `/responses` | Θέλετε συνομιλία συμβατή με OpenAI, streaming, ιστορικό απαντήσεων, και νήμα συνομιλίας — η προτεινόμενη προεπιλογή για συνομιλητικούς πράκτορες. |
| **Invocations** | `InvocationsHostServer` | `/invocations` | Χρειάζεστε προσαρμοσμένο JSON μορφή, endpoint τύπου webhook, ή μη συνομιλητική επεξεργασία. |

Επειδή το **Responses API είναι το κύριο API για την ανάπτυξη πρακτόρων στο Foundry**, ξεκινήστε με `ResponsesHostServer` για τους περισσότερους πράκτορες.

**3. Διαμορφώστε μεταβλητές περιβάλλοντος** (`az login` πρώτα για να μπορέσει να πιστοποιηθεί το `DefaultAzureCredential`):

```bash
export FOUNDRY_PROJECT_ENDPOINT="https://<resource>.services.ai.azure.com/api/projects/<project>"
export FOUNDRY_MODEL_NAME="gpt-4.1"
```

Όταν ο πράκτορας τρέχει αργότερα ως φιλοξενούμενος πράκτορας στο Foundry, η πλατφόρμα εγχέει αυτόματα το `FOUNDRY_PROJECT_ENDPOINT`.

**4. Εμφανίστε έναν πράκτορα LangGraph μέσω του πρωτοκόλλου Responses:**

```python
import os

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from langchain.agents import create_agent
from langchain_openai import ChatOpenAI
from langchain_azure_ai.agents.hosting import ResponsesHostServer

_AZURE_AI_SCOPE = "https://ai.azure.com/.default"


def build_chat_model() -> ChatOpenAI:
    project_endpoint = os.environ["FOUNDRY_PROJECT_ENDPOINT"].rstrip("/")
    deployment = os.environ.get("FOUNDRY_MODEL_NAME", "gpt-4.1")
    credential = DefaultAzureCredential()
    project = AIProjectClient(endpoint=project_endpoint, credential=credential)
    openai_client = project.get_openai_client()
    token_provider = get_bearer_token_provider(credential, _AZURE_AI_SCOPE)

    # Το ChatOpenAI εδώ στοχεύει στο συμβατό με OpenAI σημείο τερματισμού (Απαντήσεις) του έργου Foundry.
    return ChatOpenAI(
        model=deployment,
        base_url=str(openai_client.base_url),
        api_key=token_provider,
    )


def main() -> None:
    graph = create_agent(build_chat_model(), tools=[])
    port = int(os.environ.get("PORT", "8088"))
    ResponsesHostServer(graph).run(port=port)


if __name__ == "__main__":
    main()
```

Τρέξτε το τοπικά με `python main.py`, στη συνέχεια στείλτε ένα αίτημα Responses στο `http://localhost:8088/responses`.

**Κύριες συμπεριφορές:**

- **Συνομιλίες**: Οι πελάτες συνεχίζουν μια συνομιλία περνώντας `previous_response_id` ή έναν αναγνωριστικό συνομιλίας (`conversation`). Αν ο γράφος σας είναι μεταγλωττισμένος με έναν LangGraph checkpointer, το Foundry συνδέει την κατάσταση της συνομιλίας με το σημείο ελέγχου (χρησιμοποιήστε τουλάχιστον έναν ανθεκτικό checkpointer σε παραγωγή· το `MemorySaver` είναι αρκετό για τοπικές δοκιμές).
- **Άνθρωπος-στο-βρόχο**: Αν ο γράφος σας χρησιμοποιεί το LangGraph `interrupt()`, το `ResponsesHostServer` εμφανίζει την εκκρεμή διακοπή ως αντικείμενο `function_call` / `mcp_approval_request` του Responses, και οι πελάτες συνεχίζουν με το αντίστοιχο `function_call_output` / `mcp_approval_response`.
- **Ανάπτυξη στο Foundry**: Χρησιμοποιήστε το Azure Developer CLI — `azd ext install azure.ai.agents`, `azd ai agent init -m <manifest>`, `azd ai agent run` (τοπικά, απαιτεί Docker), και έπειτα `azd provision` και `azd deploy`. Η ανάπτυξη φιλοξενούμενου πράκτορα απαιτεί τον ρόλο **Foundry Project Manager**.

Μια εκτελέσιμη έκδοση αυτού του παραδείγματος βρίσκεται στο [code-samples/14-langchain-hosted-agent.py](../../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py). Για το πλήρες walkthrough (πρωτόκολλο Invocations, προσαρμοσμένα σχήματα αιτήματος και αντιμετώπιση προβλημάτων), δείτε [Host LangGraph agents as Foundry hosted agents](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).

## Παραδείγματα Κώδικα 

Παραδείγματα κώδικα για το Microsoft Agent Framework μπορούν να βρεθούν σε αυτό το αποθετήριο στα αρχεία `xx-python-agent-framework` και `xx-dotnet-agent-framework`.

## Έχετε Περισσότερες Ερωτήσεις για το Microsoft Agent Framework;

Ενταχθείτε στο [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) για να συναντήσετε άλλους μαθητές, να παρακολουθήσετε ώρες γραφείου και να απαντήσετε στις ερωτήσεις σας σχετικά με τους AI Πράκτορες.
## Προηγούμενο Μάθημα

[Μνήμη για AI Πράκτορες](../13-agent-memory/README.md)

## Επόμενο Μάθημα

[Δημιουργία Πρακτόρων Χρήσης Υπολογιστή (CUA)](../15-browser-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->