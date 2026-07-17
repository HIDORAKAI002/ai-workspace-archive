> [ΑΠΟΜΑΚΡΥΝΘΗΚΕ: 2026-07-28 RELEASE CANDIDATE](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/#roots-sampling-and-logging-are-deprecated)

# Δειγματοληψία στο Πρωτόκολλο Πλαισίου Μοντέλου

> **Ειδοποίηση απομάκρυνσης:** ο υποψήφιος προς έκδοση προδιαγραφής MCP `2026-07-28` δηλώνει τη Δειγματοληψία ως απομακρυσμένη υπέρ άμεσης ενσωμάτωσης με τα API παρόχων LLM. Η δειγματοληψία συνεχίζει να λειτουργεί στο `2025-11-25` και για τουλάχιστον ένα έτος μετά από οποιαδήποτε επίσημη απομάκρυνση, οπότε όλα σε αυτό το μάθημα παραμένουν έγκυρα - αλλά τα νέα σχέδια διακομιστών πρέπει να αξιολογήσουν το πρότυπο αντικατάστασης. Δείτε [Τι αλλάζει στο MCP: Ο υποψήφιος προς έκδοση 2026-07-28](../../01-CoreConcepts/mcp-2026-07-28-release-candidate.md).

Η δειγματοληψία είναι μια ισχυρή λειτουργία MCP που επιτρέπει στους διακομιστές να ζητούν ολοκληρώσεις LLM μέσω του πελάτη, επιτρέποντας προηγμένες συμπεριφορές πρακτόρων ενώ διατηρείται η ασφάλεια και το απόρρητο. Η κατάλληλη διαμόρφωση δειγματοληψίας μπορεί να βελτιώσει δραματικά την ποιότητα της απόκρισης και την απόδοση. Το MCP παρέχει ένα τυποποιημένο τρόπο ελέγχου πώς τα μοντέλα παράγουν κείμενο με συγκεκριμένες παραμέτρους που επηρεάζουν την τυχαιότητα, τη δημιουργικότητα και τη συνοχή.

## Εισαγωγή

Σε αυτό το μάθημα, θα εξερευνήσουμε πώς να ρυθμίσουμε τις παραμέτρους δειγματοληψίας σε αιτήματα MCP και να κατανοήσουμε τους υποκείμενους μηχανισμούς πρωτοκόλλου της δειγματοληψίας.

## Στόχοι Μάθησης

Μέχρι το τέλος αυτού του μαθήματος, θα είστε σε θέση να:

- Κατανοήσετε τις βασικές παραμέτρους δειγματοληψίας διαθέσιμες στο MCP.
- Διαμορφώσετε παραμέτρους δειγματοληψίας για διάφορες περιπτώσεις χρήσης.
- Υλοποιήσετε καθοριστική δειγματοληψία για αναπαραγώγιμα αποτελέσματα.
- Προσαρμόζετε δυναμικά τις παραμέτρους δειγματοληψίας βάσει του πλαισίου και των προτιμήσεων χρήστη.
- Εφαρμόσετε στρατηγικές δειγματοληψίας για να βελτιώσετε την απόδοση του μοντέλου σε διάφορα σενάρια.
- Κατανοήσετε πώς λειτουργεί η δειγματοληψία στη ροή πελάτη-διακομιστή του MCP.

## Πώς Λειτουργεί η Δειγματοληψία στο MCP

Η ροή δειγματοληψίας στο MCP ακολουθεί τα εξής βήματα:

1. Ο διακομιστής στέλνει ένα αίτημα `sampling/createMessage` στον πελάτη
2. Ο πελάτης εξετάζει το αίτημα και μπορεί να το τροποποιήσει
3. Ο πελάτης πραγματοποιεί δειγματοληψία από ένα LLM
4. Ο πελάτης ελέγχει την ολοκλήρωση
5. Ο πελάτης επιστρέφει το αποτέλεσμα στον διακομιστή

Αυτός ο σχεδιασμός με συμμετοχή ανθρώπου εξασφαλίζει ότι οι χρήστες διατηρούν τον έλεγχο σε ό,τι βλέπει και παράγει το LLM.

## Επισκόπηση Παραμέτρων Δειγματοληψίας

Το MCP ορίζει τις ακόλουθες παραμέτρους δειγματοληψίας που μπορούν να ρυθμιστούν στα αιτήματα πελατών:

| Παράμετρος | Περιγραφή | Τυπικό Εύρος |
|-----------|-------------|---------------|
| `temperature` | Ελέγχει την τυχαιότητα στην επιλογή του token | 0.0 - 1.0 |
| `maxTokens` | Μέγιστος αριθμός tokens προς δημιουργία | Ακέραια τιμή |
| `stopSequences` | Προσαρμοσμένες ακολουθίες που σταματούν τη δημιουργία όταν εντοπιστούν | Πίνακας συμβολοσειρών |
| `metadata` | Πρόσθετες παράμετροι ειδικές για τον πάροχο | Αντικείμενο JSON |

Πολλοί πάροχοι LLM υποστηρίζουν πρόσθετες παραμέτρους μέσω του πεδίου `metadata`, οι οποίες μπορεί να περιλαμβάνουν:

| Κοινή Παράμετρος Επέκτασης | Περιγραφή | Τυπικό Εύρος |
|-----------|-------------|---------------|
| `top_p` | Δειγματοληψία πυρήνα - περιορίζει τα tokens στο κορυφαίο σωρευτικό πιθανό βάρος | 0.0 - 1.0 |
| `top_k` | Περιορίζει την επιλογή tokens στις κορυφαίες K επιλογές | 1 - 100 |
| `presence_penalty` | Επιβάλλει ποινή στα tokens βάσει της παρουσίας τους μέχρι τώρα στο κείμενο | -2.0 - 2.0 |
| `frequency_penalty` | Επιβάλλει ποινή στα tokens βάσει της συχνότητας τους μέχρι τώρα στο κείμενο | -2.0 - 2.0 |
| `seed` | Συγκεκριμένος τυχαίος σπόρος για αναπαραγώγιμα αποτελέσματα | Ακέραια τιμή |

## Παράδειγμα Μορφοποίησης Αιτήματος

Ακολουθεί ένα παράδειγμα αιτήματος δειγματοληψίας από έναν πελάτη στο MCP:

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

## Μορφοποίηση Απόκρισης

Ο πελάτης επιστρέφει ένα αποτέλεσμα ολοκλήρωσης:

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

## Έλεγχοι Ανθρώπου στη Ροή

Η δειγματοληψία MCP έχει σχεδιαστεί με επίβλεψη ανθρώπου στο μυαλό:

- **Για προτροπές**:
  - Οι πελάτες πρέπει να εμφανίζουν στους χρήστες την προτεινόμενη προτροπή
  - Οι χρήστες πρέπει να μπορούν να τροποποιούν ή να απορρίπτουν τις προτροπές
  - Οι συστηματικές προτροπές μπορούν να φιλτραριστούν ή να τροποποιηθούν
  - Η συμπερίληψη του πλαισίου ελέγχεται από τον πελάτη

- **Για ολοκληρώσεις**:
  - Οι πελάτες πρέπει να εμφανίζουν στους χρήστες την ολοκλήρωση
  - Οι χρήστες πρέπει να μπορούν να τροποποιούν ή να απορρίπτουν τις ολοκληρώσεις
  - Οι πελάτες μπορούν να φιλτράρουν ή να τροποποιούν τις ολοκληρώσεις
  - Οι χρήστες ελέγχουν ποιο μοντέλο χρησιμοποιείται

Λαμβάνοντας υπόψη αυτές τις αρχές, ας δούμε πώς να υλοποιήσουμε τη δειγματοληψία σε διάφορες γλώσσες προγραμματισμού, εστιάζοντας στις παραμέτρους που υποστηρίζονται συνήθως από παρόχους LLM.

## Θέματα Ασφάλειας

Κατά την υλοποίηση της δειγματοληψίας στο MCP, λάβετε υπόψη αυτές τις βέλτιστες πρακτικές ασφάλειας:

- **Επαληθεύστε όλο το περιεχόμενο μηνύματος** πριν το αποστείλετε στον πελάτη
- **Απολυμάνετε ευαίσθητες πληροφορίες** από προτροπές και ολοκληρώσεις
- **Υλοποιήστε όρια ρυθμού** για να αποτρέψετε καταχρήσεις
- **Παρακολουθήστε τη χρήση δειγματοληψίας** για ασυνήθιστα μοτίβα
- **Κρυπτογραφήστε τα δεδομένα κατά τη μεταφορά** χρησιμοποιώντας ασφαλή πρωτόκολλα
- **Διαχειριστείτε το απόρρητο δεδομένων χρήστη** σύμφωνα με τις σχετικές ρυθμίσεις
- **Ελέγξτε τα αιτήματα δειγματοληψίας** για συμμόρφωση και ασφάλεια
- **Ελέγξτε την έκθεση κόστους** με κατάλληλα όρια
- **Υλοποιήστε χρονικά όρια** για αιτήματα δειγματοληψίας
- **Χειριστείτε τα σφάλματα μοντέλου ευγενικά** με κατάλληλες εναλλακτικές λύσεις

Οι παράμετροι δειγματοληψίας επιτρέπουν τη λεπτομερή ρύθμιση της συμπεριφοράς των γλωσσικών μοντέλων για την επίτευξη της επιθυμητής ισορροπίας μεταξύ καθοριστικών και δημιουργικών αποτελεσμάτων.

Ας δούμε πώς να διαμορφώσουμε αυτές τις παραμέτρους σε διαφορετικές γλώσσες προγραμματισμού.

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

Στον προηγούμενο κώδικα έχουμε:

- Δημιουργήσει έναν πελάτη MCP με συγκεκριμένο URL διακομιστή.
- Διαμορφώσει ένα αίτημα με παραμέτρους δειγματοληψίας όπως `temperature`, `top_p`, και `top_k`.
- Στείλει το αίτημα και εκτυπώσει το παραγόμενο κείμενο.
- Χρησιμοποιήσει:
    - `allowedTools` για να καθορίσει ποια εργαλεία μπορεί να χρησιμοποιήσει το μοντέλο κατά τη δημιουργία. Σε αυτή την περίπτωση, επιτρέψαμε τα εργαλεία `ideaGenerator` και `marketAnalyzer` για να βοηθήσουν στη δημιουργία δημιουργικών ιδεών εφαρμογών.
    - `frequencyPenalty` και `presencePenalty` για να ελέγξει την επανάληψη και την ποικιλία στην έξοδο.
    - `temperature` για να ελέγξει την τυχαιότητα της εξόδου, όπου υψηλότερες τιμές οδηγούν σε πιο δημιουργικές αποκρίσεις.
    - `top_p` για να περιορίσει την επιλογή των tokens σε αυτά που συνεισφέρουν στη σωρευτική κορυφαία πιθανότητα, βελτιώνοντας την ποιότητα του παραγόμενου κειμένου.
    - `top_k` για να περιορίσει το μοντέλο στα κορυφαία K πιο πιθανά tokens, που μπορεί να βοηθήσει στη δημιουργία πιο συνεκτικών απαντήσεων.
    - `frequencyPenalty` και `presencePenalty` για να μειώσει την επανάληψη και να ενθαρρύνει την ποικιλία στο παραγόμενο κείμενο.

# [JavaScript](#tab/javascript)

```javascript
// Παράδειγμα JavaScript: Διαμόρφωση θερμοκρασίας και δειγματοληψίας Top-P
const { McpClient } = require('@mcp/client');

async function demonstrateSampling() {
  // Αρχικοποίηση του πελάτη MCP
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com',
    apiKey: process.env.MCP_API_KEY
  });
  
  // Διαμόρφωση της αίτησης με διαφορετικές παραμέτρους δειγματοληψίας
  const creativeSampling = {
    temperature: 0.9,    // Υψηλότερη θερμοκρασία = περισσότερη τυχαιότητα/δημιουργικότητα
    topP: 0.92,          // Λήψη υπόψη των tokens με πιθανότητα κορυφαίου 92%
    frequencyPenalty: 0.6, // Μείωση της επανάληψης ακολουθιών tokens
    presencePenalty: 0.4   // Επιβολή ποινής σε tokens που έχουν εμφανιστεί στο κείμενο μέχρι τώρα
  };
  
  const factualSampling = {
    temperature: 0.2,    // Χαμηλότερη θερμοκρασία = πιο καθοριστική/αληθοφανής αποτελεσματικότητα
    topP: 0.85,          // Ελαφρώς πιο εστιασμένη επιλογή tokens
    frequencyPenalty: 0.2, // Ελάχιστη ποινή επανάληψης
    presencePenalty: 0.1   // Ελάχιστη ποινή παρουσίας
  };
  
  try {
    // Αποστολή δύο αιτήσεων με διαφορετικές ρυθμίσεις δειγματοληψίας
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

Στον προηγούμενο κώδικα έχουμε:

- Αρχικοποιήσει έναν πελάτη MCP με URL διακομιστή και κλειδί API.
- Διαμορφώσει δύο σύνολα παραμέτρων δειγματοληψίας: ένα για δημιουργικές εργασίες και ένα για πραγματολογικές εργασίες.
- Στείλει αιτήματα με αυτές τις ρυθμίσεις, επιτρέποντας στο μοντέλο να χρησιμοποιήσει συγκεκριμένα εργαλεία για κάθε εργασία.
- Εκτύπωσε τις παραγόμενες απαντήσεις για να δείξει τις επιδράσεις διαφορετικών παραμέτρων δειγματοληψίας.
- Χρησιμοποίησε `allowedTools` για να καθορίσει ποια εργαλεία μπορεί να χρησιμοποιήσει το μοντέλο κατά τη δημιουργία. Σε αυτή την περίπτωση επιτρέψαμε τον `ideaGenerator` και το `environmentalImpactTool` για δημιουργικές εργασίες, και τους `factChecker` και `dataAnalysisTool` για πραγματολογικές εργασίες.
- Χρησιμοποίησε `temperature` για να ελέγξει την τυχαιότητα της εξόδου, όπου υψηλότερες τιμές οδηγούν σε πιο δημιουργικές αποκρίσεις.
- Χρησιμοποίησε `top_p` για να περιορίσει την επιλογή των tokens σε αυτά που συνεισφέρουν στη σωρευτική κορυφαία πιθανότητα, βελτιώνοντας την ποιότητα του παραγόμενου κειμένου.
- Χρησιμοποίησε `frequencyPenalty` και `presencePenalty` για να μειώσει την επανάληψη και να ενθαρρύνει την ποικιλία στην έξοδο.
- Χρησιμοποίησε `top_k` για να περιορίσει το μοντέλο στα κορυφαία K πιο πιθανά tokens, που μπορεί να βοηθήσει στη δημιουργία πιο συνεκτικών απαντήσεων.

---

## Καθοριστική Δειγματοληψία

Για εφαρμογές που απαιτούν συνεπή αποτελέσματα, η καθοριστική δειγματοληψία εξασφαλίζει αναπαραγώγιμα αποτελέσματα. Αυτό επιτυγχάνεται χρησιμοποιώντας έναν σταθερό τυχαίο σπόρο και θέτοντας τη θερμοκρασία στο μηδέν.

Ας δούμε το παρακάτω παράδειγμα υλοποίησης για να δείξουμε την καθοριστική δειγματοληψία σε διάφορες γλώσσες προγραμματισμού.

# [Java](#tab/java)

```java
// Παράδειγμα Java: Ντετερμινιστικές απαντήσεις με σταθερό σπόρο
public class DeterministicSamplingExample {
    public void demonstrateDeterministicResponses() {
        McpClient client = new McpClient.Builder()
            .setServerUrl("https://mcp-server-example.com")
            .build();
            
        long fixedSeed = 12345; // Χρήση σταθερού σπόρου για ντετερμινιστικά αποτελέσματα
        
        // Πρώτο αίτημα με σταθερό σπόρο
        McpRequest request1 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0) // Μηδενική θερμοκρασία για μέγιστο ντετερμινισμό
            .build();
            
        // Δεύτερο αίτημα με τον ίδιο σπόρο
        McpRequest request2 = new McpRequest.Builder()
            .setPrompt("Generate a random number between 1 and 100")
            .setSeed(fixedSeed)
            .setTemperature(0.0)
            .build();
        
        // Εκτέλεση και των δύο αιτημάτων
        McpResponse response1 = client.sendRequest(request1);
        McpResponse response2 = client.sendRequest(request2);
        
        // Οι απαντήσεις πρέπει να είναι ταυτόσημες λόγω του ίδιου σπόρου και θερμοκρασίας=0
        System.out.println("Response 1: " + response1.getGeneratedText());
        System.out.println("Response 2: " + response2.getGeneratedText());
        System.out.println("Are responses identical: " + 
            response1.getGeneratedText().equals(response2.getGeneratedText()));
    }
}
```

Στον προηγούμενο κώδικα έχουμε:

- Δημιουργήσει έναν πελάτη MCP με συγκεκριμένο URL διακομιστή.
- Διαμορφώσει δύο αιτήματα με την ίδια προτροπή, σταθερό σπόρο και θερμοκρασία μηδέν.
- Στείλει και τα δύο αιτήματα και εκτύπωσε το παραγόμενο κείμενο.
- Έδειξε ότι οι αποκρίσεις είναι ταυτόσημες λόγω της καθοριστικής φύσης της διαμόρφωσης δειγματοληψίας (ίδιος σπόρος και θερμοκρασία).
- Χρησιμοποιήσει `setSeed` για να ορίσει έναν σταθερό τυχαίο σπόρο, εξασφαλίζοντας ότι το μοντέλο παράγει πάντα το ίδιο αποτέλεσμα για το ίδιο εισαγωγικό κείμενο.
- Έθεσε `temperature` στο μηδέν για να διασφαλίσει τη μέγιστη καθοριστικότητα, που σημαίνει ότι το μοντέλο θα επιλέξει πάντα το πιο πιθανό επόμενο token χωρίς τυχαιότητα.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Παράδειγμα JavaScript: Ντετερμινιστικές απαντήσεις με έλεγχο του σπόρου
const { McpClient } = require('@mcp/client');

async function deterministicSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const fixedSeed = 12345;
  const prompt = "Generate a random password with 8 characters";
  
  try {
    // Πρώτο αίτημα με σταθερό σπόρο
    const response1 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0  // Μηδενική θερμοκρασία για μέγιστο ντετερμινισμό
    });
    
    // Δεύτερο αίτημα με τον ίδιο σπόρο και θερμοκρασία
    const response2 = await client.sendPrompt(prompt, {
      seed: fixedSeed,
      temperature: 0.0
    });
    
    // Τρίτο αίτημα με διαφορετικό σπόρο αλλά ίδια θερμοκρασία
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

Στον προηγούμενο κώδικα έχουμε:

- Αρχικοποιήσει έναν πελάτη MCP με URL διακομιστή.
- Διαμορφώσει δύο αιτήματα με την ίδια προτροπή, σταθερό σπόρο και θερμοκρασία μηδέν.
- Στείλει και τα δύο αιτήματα και εκτύπωσε το παραγόμενο κείμενο.
- Έδειξε ότι οι αποκρίσεις είναι ταυτόσημες λόγω της καθοριστικής φύσης της διαμόρφωσης δειγματοληψίας (ίδιος σπόρος και θερμοκρασία).
- Χρησιμοποιήσει `seed` για να ορίσει έναν σταθερό τυχαίο σπόρο, εξασφαλίζοντας ότι το μοντέλο παράγει πάντα το ίδιο αποτέλεσμα για το ίδιο εισαγωγικό κείμενο.
- Έθεσε `temperature` στο μηδέν για να διασφαλίσει τη μέγιστη καθοριστικότητα, που σημαίνει ότι το μοντέλο θα επιλέξει πάντα το πιο πιθανό επόμενο token χωρίς τυχαιότητα.
- Χρησιμοποίησε διαφορετικό σπόρο για το τρίτο αίτημα για να δείξει ότι η αλλαγή του σπόρου οδηγεί σε διαφορετικά αποτελέσματα, ακόμη και με την ίδια προτροπή και θερμοκρασία.

---

## Δυναμική Διαμόρφωση Δειγματοληψίας

Η έξυπνη δειγματοληψία προσαρμόζει τις παραμέτρους βάσει του πλαισίου και των απαιτήσεων κάθε αιτήματος. Αυτό σημαίνει την δυναμική προσαρμογή παραμέτρων όπως temperature, top_p, και ποινών με βάση τον τύπο εργασίας, τις προτιμήσεις του χρήστη ή την ιστορική απόδοση.

Ας δούμε πώς να υλοποιήσουμε τη δυναμική δειγματοληψία σε διάφορες γλώσσες προγραμματισμού.

# [Python](#tab/python)

```python
# Παράδειγμα Python: Δυναμική δειγματοληψία βασισμένη στο πλαίσιο του αιτήματος
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Ορίστε προκαθορισμένες ρυθμίσεις δειγματοληψίας για διαφορετικούς τύπους εργασιών
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Επιλέξτε βασικό προκαθορισμένο
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Προσαρμόστε με βάση τις προτιμήσεις του χρήστη αν παρέχονται
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Κλιμακώστε τη θερμοκρασία με βάση την προτίμηση δημιουργικότητας (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Προσαρμόστε το top_p με βάση τη ζητούμενη πολυμορφία απάντησης
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Δημιουργήστε και στείλτε αίτημα με προσαρμοσμένες παραμέτρους δειγματοληψίας
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Επιστρέψτε την απάντηση με μεταδεδομένα δειγματοληψίας για διαφάνεια
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Στον προηγούμενο κώδικα έχουμε:

- Δημιουργήσει μια κλάση `DynamicSamplingService` που διαχειρίζεται την προσαρμοστική δειγματοληψία.
- Ορίσει προεπιλογές δειγματοληψίας για διάφορους τύπους εργασιών (δημιουργικές, πραγματολογικές, κωδικά, αναλυτικές).
- Επιλέξει μια βασική προεπιλογή δειγματοληψίας βάσει του τύπου εργασίας.
- Προσαρμόσει τις παραμέτρους δειγματοληψίας βάσει των προτιμήσεων χρήστη, όπως το επίπεδο δημιουργικότητας και ποικιλίας.
- Στείλει το αίτημα με τις δυναμικά ρυθμισμένες παραμέτρους δειγματοληψίας.
- Επέστρεψε το παραγόμενο κείμενο μαζί με τις εφαρμοσμένες παραμέτρους δειγματοληψίας και τον τύπο εργασίας για διαφάνεια.
- Χρησιμοποίησε `temperature` για να ελέγξει την τυχαιότητα της εξόδου, όπου υψηλότερες τιμές οδηγούν σε πιο δημιουργικές αποκρίσεις.
- Χρησιμοποίησε `top_p` για να περιορίσει την επιλογή των tokens σε αυτά που συνεισφέρουν στη σωρευτική κορυφαία πιθανότητα, βελτιώνοντας την ποιότητα του παραγόμενου κειμένου.
- Χρησιμοποίησε `frequency_penalty` για να μειώσει την επανάληψη και να ενθαρρύνει την ποικιλία στην έξοδο.
- Χρησιμοποίησε `user_preferences` για να επιτρέψει την προσαρμογή των παραμέτρων δειγματοληψίας με βάση τα ορισμένα από τον χρήστη επίπεδα δημιουργικότητας και ποικιλίας.
- Χρησιμοποίησε `task_type` για να καθορίσει τη κατάλληλη στρατηγική δειγματοληψίας για το αίτημα, επιτρέποντας πιο εξατομικευμένες αποκρίσεις βάσει της φύσης της εργασίας.
- Χρησιμοποίησε τη μέθοδο `send_request` για να στείλει την προτροπή με τις διαμορφωμένες παραμέτρους δειγματοληψίας, εξασφαλίζοντας ότι το μοντέλο παράγει κείμενο σύμφωνα με τις καθορισμένες απαιτήσεις.
- Χρησιμοποίησε `generated_text` για να ανακτήσει την απάντηση του μοντέλου, η οποία στη συνέχεια επιστρέφεται μαζί με τις παραμέτρους δειγματοληψίας και τον τύπο εργασίας για περαιτέρω ανάλυση ή εμφάνιση.
- Χρησιμοποίησε τις συναρτήσεις `min` και `max` για να εξασφαλίσει ότι οι προτιμήσεις του χρήστη περιορίζονται εντός έγκυρων ορίων, αποτρέποντας μη έγκυρες διαμορφώσεις δειγματοληψίας.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// Παράδειγμα JavaScript: Δυναμική διαμόρφωση δειγματοληψίας βάσει του πλαισίου χρήστη
class AdaptiveSamplingManager {
  constructor(mcpClient) {
    this.client = mcpClient;
    
    // Ορισμός βασικών προφίλ δειγματοληψίας
    this.samplingProfiles = {
      creative: { temperature: 0.85, topP: 0.94, frequencyPenalty: 0.7, presencePenalty: 0.5 },
      factual: { temperature: 0.2, topP: 0.85, frequencyPenalty: 0.3, presencePenalty: 0.1 },
      code: { temperature: 0.25, topP: 0.9, frequencyPenalty: 0.4, presencePenalty: 0.3 },
      conversational: { temperature: 0.7, topP: 0.9, frequencyPenalty: 0.6, presencePenalty: 0.4 }
    };
    
    // Παρακολούθηση ιστορικής απόδοσης
    this.performanceHistory = [];
  }
  
  // Ανίχνευση τύπου εργασίας από το prompt
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Απλή ευρετική ανίχνευση - μπορεί να ενισχυθεί με ταξινόμηση ML
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
    
    // Προεπιλογή σε συνομιλιακό αν δεν ανιχνευθεί σαφής τύπος
    return 'conversational';
  }
  
  // Υπολογισμός παραμέτρων δειγματοληψίας βάσει πλαισίου και προτιμήσεων χρήστη
  getSamplingParameters(prompt, context = {}) {
    // Ανίχνευση τύπου εργασίας
    const taskType = this.detectTaskType(prompt, context);
    
    // Λήψη βασικού προφίλ
    let params = {...this.samplingProfiles[taskType]};
    
    // Ρύθμιση βάσει προτιμήσεων χρήστη
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Κλιμάκωση από 1-10 στο κατάλληλο εύρος θερμοκρασίας
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Υψηλότερη ακρίβεια σημαίνει χαμηλότερο topP (πιο εστιασμένη επιλογή)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Υψηλότερη συνέπεια σημαίνει χαμηλότερες ποινές
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Εφαρμογή προσαρμογών που μάθαμε από το ιστορικό απόδοσης
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Απλή προσαρμοστική λογική - μπορεί να ενισχυθεί με πιο προηγμένους αλγόριθμους
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Λαμβάνουμε υπόψη μόνο το πρόσφατο ιστορικό
    
    if (relevantHistory.length > 0) {
      // Υπολογισμός μέσων όρων αποδόσεων
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Αν η απόδοση είναι κάτω από το όριο, ρύθμιση παραμέτρων
      if (avgScore < 0.7) {
        // Ελαφριά προσαρμογή προς πιο ασφαλείς τιμές
        params.temperature = Math.max(params.temperature * 0.9, 0.1);
        params.topP = Math.max(params.topP * 0.95, 0.5);
      }
    }
  }
  
  recordPerformance(prompt, samplingParams, response, score) {
    // Καταγραφή απόδοσης για μελλοντικές προσαρμογές
    this.performanceHistory.push({
      timestamp: Date.now(),
      taskType: this.detectTaskType(prompt),
      samplingParams,
      responseLength: response.generatedText.length,
      score // Αξιολόγηση 0-1 για την ποιότητα της απάντησης
    });
    
    // Περιορισμός μεγέθους ιστορικού
    if (this.performanceHistory.length > 100) {
      this.performanceHistory.shift();
    }
  }
  
  async generateResponse(prompt, context = {}) {
    // Λήψη βελτιστοποιημένων παραμέτρων δειγματοληψίας
    const samplingParams = this.getSamplingParameters(prompt, context);
    
    // Αποστολή αιτήματος με βελτιστοποιημένες παραμέτρους
    const response = await this.client.sendPrompt(prompt, {
      ...samplingParams,
      allowedTools: context.allowedTools || []
    });
    
    // Εάν ο χρήστης παρέχει ανατροφοδότηση, καταγραφή για μελλοντική βελτιστοποίηση
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

// Παράδειγμα χρήσης
async function demonstrateAdaptiveSampling() {
  const client = new McpClient({
    serverUrl: 'https://mcp-server-example.com'
  });
  
  const samplingManager = new AdaptiveSamplingManager(client);
  
  try {
    // Δημιουργική εργασία με προσαρμοσμένες προτιμήσεις χρήστη
    const creativeResult = await samplingManager.generateResponse(
      "Write a short poem about artificial intelligence",
      {
        userPreferences: {
          creativity: 9,  // Υψηλή δημιουργικότητα (1-10)
          consistency: 3  // Χαμηλή συνέπεια (1-10)
        }
      }
    );
    
    console.log('Creative Task:');
    console.log(`Detected type: ${creativeResult.detectedTaskType}`);
    console.log('Applied sampling:', creativeResult.appliedSamplingParams);
    console.log(creativeResult.response.generatedText);
    
    // Εργασία δημιουργίας κώδικα
    const codeResult = await samplingManager.generateResponse(
      "Write a JavaScript function to calculate the Fibonacci sequence",
      {
        userPreferences: {
          creativity: 2,  // Χαμηλή δημιουργικότητα
          precision: 8,   // Υψηλή ακρίβεια
          consistency: 9  // Υψηλή συνέπεια
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

Στον προηγούμενο κώδικα έχουμε:

- Δημιουργήσει μια κλάση `AdaptiveSamplingManager` που διαχειρίζεται δυναμική δειγματοληψία βάσει τύπου εργασίας και προτιμήσεων χρήστη.
- Ορίσει προφίλ δειγματοληψίας για διαφορετικούς τύπους εργασιών (δημιουργικές, πραγματολογικές, κωδικά, συνομιλητικές).
- Υλοποίησε μια μέθοδο για την ανίχνευση τύπου εργασίας από την προτροπή χρησιμοποιώντας απλά ευρετήρια.
- Υπολόγισε τις παραμέτρους δειγματοληψίας βάσει του ανιχνευμένου τύπου εργασίας και προτιμήσεων χρήστη.
- Εφάρμοσε προσαρμογές μάθησης βάσει ιστορικής απόδοσης για να βελτιστοποιήσει τις παραμέτρους δειγματοληψίας.
- Κατέγραψε απόδοση για μελλοντικές προσαρμογές, επιτρέποντας στο σύστημα να μαθαίνει από προηγούμενες αλληλεπιδράσεις.
- Έστειλε αιτήματα με δυναμικά ρυθμισμένες παραμέτρους δειγματοληψίας και επέστρεψε το παραγόμενο κείμενο μαζί με τις εφαρμοσμένες παραμέτρους και τον ανιχνευμένο τύπο εργασίας.
- Χρησιμοποίησε:
    - `userPreferences` για να επιτρέψει την προσαρμογή των παραμέτρων δειγματοληψίας με βάση τα ορισμένα από τον χρήστη επίπεδα δημιουργικότητας, ακρίβειας και συνέπειας.
    - `detectTaskType` για να καθορίσει τη φύση της εργασίας βάσει της προτροπής, επιτρέποντας πιο εξατομικευμένες αποκρίσεις.
    - `recordPerformance` για να καταγράψει την απόδοση των παραγόμενων απαντήσεων, δίνοντας τη δυνατότητα στο σύστημα να προσαρμόζεται και να βελτιώνεται με το χρόνο.
    - `applyLearnedAdjustments` για να τροποποιήσει τις παραμέτρους δειγματοληψίας βασισμένο στην ιστορική απόδοση, ενισχύοντας την ικανότητα του μοντέλου να παράγει ποιοτικές αποκρίσεις.
    - `generateResponse` για να καλύψει όλη τη διαδικασία παραγωγής απάντησης με προσαρμοστική δειγματοληψία, καθιστώντας εύκολη την κλήση με διαφορετικές προτροπές και πλαίσια.
    - `allowedTools` για να καθορίσει ποια εργαλεία μπορεί να χρησιμοποιήσει το μοντέλο κατά τη δημιουργία, επιτρέποντας πιο ευφυείς αποκρίσεις βάσει πλαισίου.
    - `feedbackScore` για να επιτρέψει στους χρήστες να παρέχουν ανατροφοδότηση για την ποιότητα της παραγόμενης απάντησης, η οποία μπορεί να χρησιμοποιηθεί για τη περαιτέρω βελτίωση της απόδοσης του μοντέλου με το χρόνο.
    - `performanceHistory` για να διατηρήσει αρχείο των προηγούμενων αλληλεπιδράσεων, δίνοντας τη δυνατότητα στο σύστημα να μαθαίνει από προηγούμενες επιτυχίες και αποτυχίες.
    - `getSamplingParameters` για να προσαρμόζει δυναμικά τις παραμέτρους δειγματοληψίας βασισμένο στο πλαίσιο του αιτήματος, επιτρέποντας πιο ευέλικτη και ανταποκρινόμενη συμπεριφορά του μοντέλου.
    - `detectTaskType` για να ταξινομήσει την εργασία βάσει της προτροπής, δίνοντας τη δυνατότητα στο σύστημα να εφαρμόσει κατάλληλες στρατηγικές δειγματοληψίας για διαφορετικούς τύπους αιτημάτων.
    - `samplingProfiles` για να ορίσει βασικές διαμορφώσεις δειγματοληψίας για διαφορετικούς τύπους εργασιών, επιτρέποντας γρήγορες προσαρμογές βάσει της φύσης του αιτήματος.

---

## Τι ακολουθεί

- [5.7 Κλιμάκωση](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->