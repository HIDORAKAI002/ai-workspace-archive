# 🔍 Εξερεύνηση του Microsoft Agent Framework - Βασικός Agent (.NET)

## 📋 Μαθησιακοί Στόχοι

Αυτό το παράδειγμα εξερευνά τις βασικές έννοιες του Microsoft Agent Framework μέσω μιας βασικής υλοποίησης agent σε .NET. Θα μάθετε βασικά μοτίβα agent και θα κατανοήσετε πώς λειτουργούν οι έξυπνοι agents στην ουσία χρησιμοποιώντας C# και το οικοσύστημα .NET.

### Τι Θα Ανακαλύψετε

- 🏗️ **Αρχιτεκτονική Agent**: Κατανόηση της βασικής δομής των AI agents στο .NET
- 🛠️ **Ενσωμάτωση Εργαλείων**: Πώς οι agents χρησιμοποιούν εξωτερικές λειτουργίες για να επεκτείνουν τις δυνατότητες  
- 💬 **Ροή Συνομιλίας**: Διαχείριση συνομιλιών πολλών βημάτων και συμφραζομένων με διαχείριση νήματος
- 🔧 **Πρότυπα Διαμόρφωσης**: Βέλτιστες πρακτικές για τη ρύθμιση και διαχείριση agent στο .NET

## 🎯 Κύριες Έννοιες που Καλύπτονται

### Αρχές Πλαισίου Agentic

- **Αυτονομία**: Πώς οι agents παίρνουν ανεξάρτητες αποφάσεις χρησιμοποιώντας τις αφαιρέσεις AI του .NET
- **Αντιδραστικότητα**: Αντιμετώπιση περιβαλλοντικών αλλαγών και εισόδων χρηστών
- **Προδραστικότητα**: Ανάληψη πρωτοβουλίας βασισμένη σε στόχους και συμφραζόμενα
- **Κοινωνική Ικανότητα**: Αλληλεπίδραση μέσω φυσικής γλώσσας με νήματα συνομιλίας

### Τεχνικά Συστατικά

- **AIAgent**: Κεντρικός συντονισμός agent και διαχείριση συνομιλιών (.NET)
- **Λειτουργίες Εργαλείων**: Επέκταση δυνατοτήτων agent με μεθόδους και χαρακτηριστικά C#
- **Ενσωμάτωση Azure OpenAI**: Αξιοποίηση μοντέλων γλώσσας μέσω του Azure OpenAI Responses API
- **Ασφαλής Διαμόρφωση**: Διαχείριση σημείων πρόσβασης βασισμένη στο περιβάλλον

## 🔧 Τεχνικό Στοίβαγμα

### Βασικές Τεχνολογίες

- Microsoft Agent Framework (.NET)
- Ενσωμάτωση Azure OpenAI (Responses API)
- Πρότυπα πελατών Azure.AI.OpenAI
- Διαμόρφωση βασισμένη στο περιβάλλον με DotNetEnv

### Ικανότητες Agent

- Κατανόηση και δημιουργία φυσικής γλώσσας
- Κλήση λειτουργιών και χρήση εργαλείων με χαρακτηριστικά C#
- Απαντήσεις με επίγνωση συμφραζομένων μέσω συνεδριών συνομιλίας
- Επεκτάσιμη αρχιτεκτονική με πρότυπα dependency injection

## 📚 Σύγκριση Πλαισίων

Αυτό το παράδειγμα παρουσιάζει την προσέγγιση του Microsoft Agent Framework σε σύγκριση με άλλα agentic πλαίσια:

| Χαρακτηριστικό | Microsoft Agent Framework | Άλλα Πλαίσια |
|---------|-------------------------|------------------|
| **Ενσωμάτωση** | Φυσικό οικοσύστημα Microsoft | Διαφορετική συμβατότητα |
| **Απλότητα** | Καθαρό, διαισθητικό API | Συχνά σύνθετη ρύθμιση |
| **Επεκτασιμότητα** | Εύκολη ενσωμάτωση εργαλείων | Εξαρτάται από το πλαίσιο |
| **Έτοιμο για Επιχειρήσεις** | Κατασκευασμένο για παραγωγή | Διαφέρει ανάλογα με το πλαίσιο |

## 🚀 Ξεκινώντας

### Προαπαιτούμενα

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ή ανώτερο
- Μια [συνδρομή Azure](https://azure.microsoft.com/free/) με ένα πόρο Azure OpenAI και ανάπτυξη μοντέλου
- Το [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) — σύνδεση με `az login`

### Απαραίτητες Μεταβλητές Περιβάλλοντος

```bash
# zsh/bash
export AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
export AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
# Στη συνέχεια, συνδεθείτε ώστε το AzureCliCredential να μπορεί να πάρει ένα διακριτικό
az login
```

```powershell
# PowerShell
$env:AZURE_OPENAI_ENDPOINT = "https://<your-resource>.openai.azure.com"
$env:AZURE_OPENAI_DEPLOYMENT = "gpt-4.1-mini"
# Στη συνέχεια συνδεθείτε ώστε το AzureCliCredential να μπορεί να λάβει ένα διακριτικό
az login
```

### Παραδειγματικός Κώδικας

Για να εκτελέσετε το παράδειγμα κώδικα,

```bash
# zsh/bash
chmod +x ./02-dotnet-agent-framework.cs
./02-dotnet-agent-framework.cs
```

Ή χρησιμοποιώντας το dotnet CLI:

```bash
dotnet run ./02-dotnet-agent-framework.cs
```

Δείτε το [`02-dotnet-agent-framework.cs`](../../../../02-explore-agentic-frameworks/code_samples/02-dotnet-agent-framework.cs) για τον πλήρη κώδικα.

```csharp
#!/usr/bin/dotnet run

#:package Microsoft.Extensions.AI@10.*
#:package Microsoft.Agents.AI.OpenAI@1.*-*
#:package Azure.AI.OpenAI@2.1.0
#:package Azure.Identity@1.13.1

using System.ComponentModel;

using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

using Azure.AI.OpenAI;
using Azure.Identity;

// Tool Function: Random Destination Generator
// This static method will be available to the agent as a callable tool
// The [Description] attribute helps the AI understand when to use this function
// This demonstrates how to create custom tools for AI agents
[Description("Provides a random vacation destination.")]
static string GetRandomDestination()
{
    // List of popular vacation destinations around the world
    // The agent will randomly select from these options
    var destinations = new List<string>
    {
        "Paris, France",
        "Tokyo, Japan",
        "New York City, USA",
        "Sydney, Australia",
        "Rome, Italy",
        "Barcelona, Spain",
        "Cape Town, South Africa",
        "Rio de Janeiro, Brazil",
        "Bangkok, Thailand",
        "Vancouver, Canada"
    };

    // Generate random index and return selected destination
    // Uses System.Random for simple random selection
    var random = new Random();
    int index = random.Next(destinations.Count);
    return destinations[index];
}

// Azure OpenAI with the Responses API (stable v1 endpoint). Sign in with `az login`.
var azureEndpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deployment = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT") ?? "gpt-4.1-mini";

var azureClient = new AzureOpenAIClient(new Uri(azureEndpoint), new AzureCliCredential());

// Define Agent Identity and Comprehensive Instructions
// Agent name for identification and logging purposes
var AGENT_NAME = "TravelAgent";

// Detailed instructions that define the agent's personality, capabilities, and behavior
// This system prompt shapes how the agent responds and interacts with users
var AGENT_INSTRUCTIONS = """
You are a helpful AI Agent that can help plan vacations for customers.

Important: When users specify a destination, always plan for that location. Only suggest random destinations when the user hasn't specified a preference.

When the conversation begins, introduce yourself with this message:
"Hello! I'm your TravelAgent assistant. I can help plan vacations and suggest interesting destinations for you. Here are some things you can ask me:
1. Plan a day trip to a specific location
2. Suggest a random vacation destination
3. Find destinations with specific features (beaches, mountains, historical sites, etc.)
4. Plan an alternative trip if you don't like my first suggestion

What kind of trip would you like me to help you plan today?"

Always prioritize user preferences. If they mention a specific destination like "Bali" or "Paris," focus your planning on that location rather than suggesting alternatives.
""";

// Create AI Agent with Advanced Travel Planning Capabilities
// Get the Responses client for the deployment and create the AI agent
// Configure agent with name, detailed instructions, and available tools
// This demonstrates the .NET agent creation pattern with full configuration
AIAgent agent = azureClient
    .GetChatClient(deployment)
    .AsAIAgent(
        name: AGENT_NAME,
        instructions: AGENT_INSTRUCTIONS,
        tools: [AIFunctionFactory.Create(GetRandomDestination)]
    );

// Create New Session for Context Management.
// Initialize a new conversation session to maintain context across multiple interactions
// Sessions enable the agent to remember previous exchanges and maintain conversational state
// This is essential for multi-turn conversations and contextual understanding
AgentSession session = await agent.CreateSessionAsync();

// Execute Agent: First Travel Planning Request
// Run the agent with an initial request that will likely trigger the random destination tool
// The agent will analyze the request, use the GetRandomDestination tool, and create an itinerary
// Using the session parameter maintains conversation context for subsequent interactions
await foreach (var update in agent.RunStreamingAsync("Plan me a day trip", session))
{
    await Task.Delay(10);
    Console.Write(update);
}

Console.WriteLine();

// Execute Agent: Follow-up Request with Context Awareness
// Demonstrate contextual conversation by referencing the previous response
// The agent remembers the previous destination suggestion and will provide an alternative
// This showcases the power of conversation sessions and contextual understanding in .NET agents
await foreach (var update in agent.RunStreamingAsync("I don't like that destination. Plan me another vacation.", session))
{
    await Task.Delay(10);
    Console.Write(update);
}
```

## 🎓 Κύρια Συμπεράσματα

1. **Αρχιτεκτονική Agent**: Το Microsoft Agent Framework προσφέρει μια καθαρή, τύπου ασφαλή προσέγγιση για δημιουργία AI agents σε .NET
2. **Ενσωμάτωση Εργαλείων**: Λειτουργίες που είναι διακοσμημένες με χαρακτηριστικά `[Description]` γίνονται διαθέσιμα εργαλεία για τον agent
3. **Συμφραζόμενα Συνομιλίας**: Η διαχείριση συνεδριών επιτρέπει συνομιλίες πολλών βημάτων με πλήρη επίγνωση συμφραζομένων
4. **Διαχείριση Διαμόρφωσης**: Μεταβλητές περιβάλλοντος και ασφαλής διαχείριση διαπιστευτηρίων ακολουθούν τις βέλτιστες πρακτικές του .NET
5. **Azure OpenAI Responses API**: Ο agent χρησιμοποιεί το Azure OpenAI Responses API μέσω του Azure.AI.OpenAI SDK

## 🔗 Πρόσθετοι Πόροι

- [Τεκμηρίωση Microsoft Agent Framework](https://learn.microsoft.com/agent-framework)
- [Azure OpenAI στο Microsoft Foundry](https://learn.microsoft.com/azure/ai-services/openai/)
- [Microsoft.Extensions.AI](https://learn.microsoft.com/dotnet/ai/microsoft-extensions-ai)
- [.NET Single File Apps](https://devblogs.microsoft.com/dotnet/announcing-dotnet-run-app)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->