# Δειγματοληψία στο Πρωτόκολλο Συμφραζόμενου Μοντέλου (Model Context Protocol)

Η δειγματοληψία είναι μια ισχυρή δυνατότητα του MCP που επιτρέπει στους διακομιστές να ζητούν ολοκληρώσεις LLM μέσω του πελάτη, επιτρέποντας εξελιγμένες συμπεριφορές πράκτορα ενώ διατηρείται η ασφάλεια και το απόρρητο. Η σωστή διαμόρφωση δειγματοληψίας μπορεί να βελτιώσει σημαντικά την ποιότητα απάντησης και την απόδοση. Το MCP παρέχει έναν τυποποιημένο τρόπο ελέγχου του πώς τα μοντέλα παράγουν κείμενο με συγκεκριμένες παραμέτρους που επηρεάζουν την τυχαιότητα, τη δημιουργικότητα και τη συνοχή.

## Εισαγωγή

Σε αυτό το μάθημα, θα εξερευνήσουμε πώς να διαμορφώσουμε τις παραμέτρους δειγματοληψίας σε αιτήματα MCP και να κατανοήσουμε τους υποκείμενους μηχανισμούς πρωτοκόλλου της δειγματοληψίας.

## Στόχοι Μάθησης

Στο τέλος αυτού του μαθήματος, θα μπορείτε να:

- Κατανοείτε τις βασικές παραμέτρους δειγματοληψίας που είναι διαθέσιμες στο MCP.
- Διαμορφώνετε παραμέτρους δειγματοληψίας για διαφορετικές περιπτώσεις χρήσης.
- Εφαρμόζετε ντετερμινιστική δειγματοληψία για αναπαραγώγιμα αποτελέσματα.
- Προσαρμόζετε δυναμικά τις παραμέτρους δειγματοληψίας βάσει συμφραζομένων και προτιμήσεων χρήστη.
- Εφαρμόζετε στρατηγικές δειγματοληψίας για τη βελτίωση της απόδοσης μοντέλου σε διάφορα σενάρια.
- Κατανοείτε πώς λειτουργεί η δειγματοληψία στη ροή πελάτη-διακομιστή του MCP.

## Πώς Λειτουργεί η Δειγματοληψία στο MCP

Η ροή δειγματοληψίας στο MCP ακολουθεί τα εξής βήματα:

1. Ο διακομιστής στέλνει αίτημα `sampling/createMessage` στον πελάτη
2. Ο πελάτης εξετάζει το αίτημα και μπορεί να το τροποποιήσει
3. Ο πελάτης παίρνει δείγματα από ένα LLM
4. Ο πελάτης εξετάζει την ολοκλήρωση
5. Ο πελάτης επιστρέφει το αποτέλεσμα στον διακομιστή

Αυτός ο σχεδιασμός ανθρώπου-στον-βρόχο διασφαλίζει ότι οι χρήστες διατηρούν τον έλεγχο για το τι βλέπει και παράγει το LLM.

## Επισκόπηση Παραμέτρων Δειγματοληψίας

Το MCP ορίζει τις ακόλουθες παραμέτρους δειγματοληψίας που μπορούν να διαμορφωθούν στα αιτήματα πελάτη:

| Παράμετρος | Περιγραφή | Τυπικό Εύρος |
|-----------|-------------|---------------|
| `temperature` | Ελέγχει την τυχαιότητα στην επιλογή των tokens | 0.0 - 1.0 |
| `maxTokens` | Μέγιστος αριθμός tokens για παραγωγή | Ακέραια τιμή |
| `stopSequences` | Προσαρμοσμένες ακολουθίες που σταματούν την παραγωγή όταν εμφανίζονται | Πίνακας από συμβολοσειρές |
| `metadata` | Επιπλέον παράμετροι ειδικές για τον πάροχο | Αντικείμενο JSON |

Πολλοί πάροχοι LLM υποστηρίζουν επιπρόσθετες παραμέτρους μέσω του πεδίου `metadata`, που μπορεί να περιλαμβάνουν:

| Συνήθης Παράμετρος Επέκτασης | Περιγραφή | Τυπικό Εύρος |
|-----------|-------------|---------------|
| `top_p` | Δειγματοληψία πυρήνα - περιορίζει tokens στην κορυφαία σωρευτική πιθανότητα | 0.0 - 1.0 |
| `top_k` | Περιορίζει την επιλογή token στις κορυφαίες K επιλογές | 1 - 100 |
| `presence_penalty` | Επιβάλλει ποινή σε tokens βάσει της παρουσίας τους μέχρι τώρα στο κείμενο | -2.0 - 2.0 |
| `frequency_penalty` | Επιβάλλει ποινή σε tokens βάσει της συχνότητας τους στο κείμενο μέχρι τώρα | -2.0 - 2.0 |
| `seed` | Συγκεκριμένος τυχαίος σπόρος για αναπαραγώγιμα αποτελέσματα | Ακέραια τιμή |

## Παράδειγμα Μορφής Αιτήματος

Εδώ είναι ένα παράδειγμα αιτήματος δειγματοληψίας από πελάτη στο MCP:

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

## Μορφή Απάντησης

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

## Έλεγχοι Ανθρώπου στον Βρόχο

Η δειγματοληψία MCP έχει σχεδιαστεί με επίβλεψη ανθρώπου στο μυαλό:

- **Για τις προτροπές**:
  - Οι πελάτες πρέπει να δείχνουν στους χρήστες την προτεινόμενη προτροπή
  - Οι χρήστες πρέπει να μπορούν να τροποποιούν ή να απορρίπτουν τις προτροπές
  - Οι συστηματικές προτροπές μπορούν να φιλτραριστούν ή να τροποποιηθούν
  - Η συμπερίληψη συμφραζομένων ελέγχεται από τον πελάτη

- **Για τις ολοκληρώσεις**:
  - Οι πελάτες πρέπει να δείχνουν στους χρήστες την ολοκλήρωση
  - Οι χρήστες πρέπει να μπορούν να τροποποιούν ή να απορρίπτουν τις ολοκληρώσεις
  - Οι πελάτες μπορούν να φιλτράρουν ή να τροποποιούν τις ολοκληρώσεις
  - Οι χρήστες ελέγχουν ποιο μοντέλο χρησιμοποιείται

Με αυτές τις αρχές κατά νου, ας δούμε πώς να υλοποιήσουμε τη δειγματοληψία σε διάφορες γλώσσες προγραμματισμού, με έμφαση στις παραμέτρους που υποστηρίζονται συνήθως από παρόχους LLM.

## Θέματα Ασφαλείας

Κατά την υλοποίηση της δειγματοληψίας στο MCP, λάβετε υπόψη τις εξής βέλτιστες πρακτικές ασφαλείας:

- **Επαληθεύστε όλο το περιεχόμενο μηνυμάτων** πριν το στείλετε στον πελάτη
- **Απολυμάνετε ευαίσθητες πληροφορίες** από προτροπές και ολοκληρώσεις
- **Εφαρμόστε όρια ρυθμού** για αποφυγή κατάχρησης
- **Παρακολουθήστε τη χρήση δειγματοληψίας** για ασυνήθιστα πρότυπα
- **Κρυπτογραφήστε τα δεδομένα κατά τη μετάδοση** με ασφαλή πρωτόκολλα
- **Διαχειριστείτε το απόρρητο των δεδομένων χρήστη** σύμφωνα με τους σχετικούς κανονισμούς
- **Ελέγξτε τα αιτήματα δειγματοληψίας** για συμμόρφωση και ασφάλεια
- **Ελέγξτε το κόστος έκθεσης** με κατάλληλα όρια
- **Εφαρμόστε χρονικούς περιορισμούς** για τα αιτήματα δειγματοληψίας
- **Χειριστείτε τα σφάλματα μοντέλου με ευελιξία** με κατάλληλα εφεδρικά σχέδια

Οι παράμετροι δειγματοληψίας επιτρέπουν τη λεπτομερή ρύθμιση της συμπεριφοράς των γλωσσικών μοντέλων για την επίτευξη της επιθυμητής ισορροπίας μεταξύ ντετερμινιστικών και δημιουργικών αποτελεσμάτων.

Ας δούμε πώς να διαμορφώσουμε αυτές τις παραμέτρους σε διάφορες γλώσσες προγραμματισμού.

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

- Δημιουργήσει πελάτη MCP με συγκεκριμένο URL διακομιστή.
- Διαμορφώσει αίτημα με παραμέτρους δειγματοληψίας όπως `temperature`, `top_p` και `top_k`.
- Στείλει το αίτημα και εκτυπώσει το παραγόμενο κείμενο.
- Χρησιμοποιήσει:
    - `allowedTools` για να καθορίσει ποια εργαλεία μπορεί να χρησιμοποιεί το μοντέλο κατά τη δημιουργία. Στην περίπτωση αυτή, επιτρέψαμε στα εργαλεία `ideaGenerator` και `marketAnalyzer` να βοηθήσουν στη δημιουργία πρωτότυπων ιδεών εφαρμογών.
    - `frequencyPenalty` και `presencePenalty` για τον έλεγχο της επανάληψης και της ποικιλίας στην έξοδο.
    - `temperature` για τον έλεγχο της τυχαιότητας της εξόδου, όπου υψηλότερες τιμές οδηγούν σε πιο δημιουργικές απαντήσεις.
    - `top_p` για να περιορίσει την επιλογή των tokens σε εκείνα που συμβάλλουν στο κορυφαίο σωρευτικό ποσοστό πιθανότητας, βελτιώνοντας την ποιότητα του παραγόμενου κειμένου.
    - `top_k` για να περιορίσει το μοντέλο στα κορυφαία K πιο πιθανά tokens, γεγονός που μπορεί να βοηθήσει στην παραγωγή πιο συνεκτικών απαντήσεων.
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
  
  // Διαμόρφωση αιτήματος με διαφορετικές παραμέτρους δειγματοληψίας
  const creativeSampling = {
    temperature: 0.9,    // Υψηλότερη θερμοκρασία = περισσότερη τυχαιότητα/δημιουργικότητα
    topP: 0.92,          // Λήψη υπόψη tokens με το 92% της πιθανότητας
    frequencyPenalty: 0.6, // Μείωση επανάληψης ακολουθιών tokens
    presencePenalty: 0.4   // Τιμωρία tokens που έχουν εμφανιστεί στο κείμενο μέχρι τώρα
  };
  
  const factualSampling = {
    temperature: 0.2,    // Χαμηλότερη θερμοκρασία = πιο ντετερμινιστικό/καθημερινό
    topP: 0.85,          // Ελαφρώς πιο στοχευμένη επιλογή tokens
    frequencyPenalty: 0.2, // Ελάχιστη τιμωρία επανάληψης
    presencePenalty: 0.1   // Ελάχιστη τιμωρία παρουσίας
  };
  
  try {
    // Αποστολή δύο αιτημάτων με διαφορετικές ρυθμίσεις δειγματοληψίας
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

- Αρχικοποιήσει πελάτη MCP με URL διακομιστή και κλειδί API.
- Διαμορφώσει δύο σύνολα παραμέτρων δειγματοληψίας: ένα για δημιουργικές εργασίες και ένα για πραγματολογικές εργασίες.
- Στείλει αιτήματα με αυτές τις διαμορφώσεις, επιτρέποντας στο μοντέλο να χρησιμοποιεί συγκεκριμένα εργαλεία για κάθε εργασία.
- Εκτύπωσε τις παραγόμενες απαντήσεις για να δείξει τις επιδράσεις διαφορετικών παραμέτρων δειγματοληψίας.
- Χρησιμοποίησε `allowedTools` για να καθορίσει ποια εργαλεία μπορεί να χρησιμοποιεί το μοντέλο κατά τη δημιουργία. Στην περίπτωση αυτή, επιτρέψαμε το `ideaGenerator` και το `environmentalImpactTool` για δημιουργικές εργασίες, και το `factChecker` και το `dataAnalysisTool` για πραγματολογικές εργασίες.
- Χρησιμοποίησε `temperature` για να ελέγξει την τυχαιότητα της εξόδου, όπου υψηλότερες τιμές οδηγούν σε πιο δημιουργικές απαντήσεις.
- Χρησιμοποίησε `top_p` για να περιορίσει την επιλογή των tokens σε εκείνα που συμβάλλουν στο κορυφαίο σωρευτικό ποσοστό πιθανότητας, βελτιώνοντας την ποιότητα του παραγόμενου κειμένου.
- Χρησιμοποίησε `frequencyPenalty` και `presencePenalty` για να μειώσει την επανάληψη και να ενθαρρύνει την ποικιλία στην έξοδο.
- Χρησιμοποίησε `top_k` για να περιορίσει το μοντέλο στα κορυφαία K πιο πιθανά tokens, γεγονός που μπορεί να βοηθήσει στην παραγωγή πιο συνεκτικών απαντήσεων.

---

## Ντετερμινιστική Δειγματοληψία

Για εφαρμογές που απαιτούν συνεπή αποτελέσματα, η ντετερμινιστική δειγματοληψία εξασφαλίζει αναπαραγώγιμα αποτελέσματα. Αυτό επιτυγχάνεται χρησιμοποιώντας έναν σταθερό τυχαίο σπόρο και ορίζοντας τη θερμοκρασία στο μηδέν.

Ας δούμε το ακόλουθο δείγμα υλοποίησης για να δείξουμε τη ντετερμινιστική δειγματοληψία σε διαφορετικές γλώσσες προγραμματισμού.

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

- Δημιουργήσει πελάτη MCP με καθορισμένο URL διακομιστή.
- Διαμορφώσει δύο αιτήματα με την ίδια προτροπή, σταθερό σπόρο και θερμοκρασία μηδέν.
- Στείλει και τα δύο αιτήματα και εκτύπωσε το παραγόμενο κείμενο.
- Έδειξε ότι οι απαντήσεις είναι ταυτόσημες λόγω της ντετερμινιστικής φύσης της διαμόρφωσης δειγματοληψίας (ίδιος σπόρος και θερμοκρασία).
- Χρησιμοποίησε `setSeed` για να καθορίσει έναν σταθερό τυχαίο σπόρο, διασφαλίζοντας ότι το μοντέλο παράγει την ίδια έξοδο για την ίδια είσοδο κάθε φορά.
- Έθεσε τη `temperature` στο μηδέν για να εξασφαλίσει μέγιστη ντετερμινιστικότητα, δηλαδή το μοντέλο θα επιλέγει πάντα το πιο πιθανό επόμενο token χωρίς τυχαιότητα.

# [JavaScript](#tab/javascript-deterministic)

```javascript
// Παράδειγμα JavaScript: Ντετερμινιστικές απαντήσεις με έλεγχο σπόρου
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

- Αρχικοποιήσει πελάτη MCP με URL διακομιστή.
- Διαμορφώσει δύο αιτήματα με την ίδια προτροπή, σταθερό σπόρο και θερμοκρασία μηδέν.
- Στείλει και τα δύο αιτήματα και εκτύπωσε το παραγόμενο κείμενο.
- Έδειξε ότι οι απαντήσεις είναι ταυτόσημες λόγω της ντετερμινιστικής φύσης της διαμόρφωσης δειγματοληψίας (ίδιος σπόρος και θερμοκρασία).
- Χρησιμοποίησε `seed` για να καθορίσει έναν σταθερό τυχαίο σπόρο, διασφαλίζοντας ότι το μοντέλο παράγει την ίδια έξοδο για την ίδια είσοδο κάθε φορά.
- Έθεσε τη `temperature` στο μηδέν για να εξασφαλίσει μέγιστη ντετερμινιστικότητα, δηλαδή το μοντέλο θα επιλέγει πάντα το πιο πιθανό επόμενο token χωρίς τυχαιότητα.
- Χρησιμοποίησε διαφορετικό σπόρο για το τρίτο αίτημα για να δείξει ότι η αλλαγή του σπόρου οδηγεί σε διαφορετικές εξόδους, ακόμα και με την ίδια προτροπή και θερμοκρασία.

---

## Δυναμική Διαμόρφωση Δειγματοληψίας

Η ευφυής δειγματοληψία προσαρμόζει παραμέτρους βάσει του συμφραζόμενου και των απαιτήσεων κάθε αιτήματος. Αυτό σημαίνει δυναμική ρύθμιση παραμέτρων όπως `temperature`, `top_p` και ποινές βάσει του τύπου της εργασίας, των προτιμήσεων χρήστη ή της ιστορικής απόδοσης.

Ας δούμε πώς να υλοποιήσουμε δυναμική δειγματοληψία σε διάφορες γλώσσες προγραμματισμού.

# [Python](#tab/python)

```python
# Παράδειγμα Python: Δυναμική δειγματοληψία βασισμένη στο πλαίσιο αιτήματος
class DynamicSamplingService:
    def __init__(self, mcp_client):
        self.client = mcp_client
        
    async def generate_with_adaptive_sampling(self, prompt, task_type, user_preferences=None):
        """Uses different sampling strategies based on task type and user preferences"""
        
        # Ορισμός προκαθορισμένων δειγματοληψίας για διαφορετικούς τύπους εργασιών
        sampling_presets = {
            "creative": {"temperature": 0.9, "top_p": 0.95, "frequency_penalty": 0.7},
            "factual": {"temperature": 0.2, "top_p": 0.85, "frequency_penalty": 0.2},
            "code": {"temperature": 0.3, "top_p": 0.9, "frequency_penalty": 0.5},
            "analytical": {"temperature": 0.4, "top_p": 0.92, "frequency_penalty": 0.3}
        }
        
        # Επιλογή βασικού προκαθορισμένου
        sampling_params = sampling_presets.get(task_type, sampling_presets["factual"])
        
        # Προσαρμογή βάσει προτιμήσεων χρήστη αν παρέχεται
        if user_preferences:
            if "creativity_level" in user_preferences:
                # Κλιμάκωση θερμοκρασίας βάσει προτίμησης δημιουργικότητας (1-10)
                creativity = min(max(user_preferences["creativity_level"], 1), 10) / 10
                sampling_params["temperature"] = 0.1 + (0.9 * creativity)
            
            if "diversity" in user_preferences:
                # Προσαρμογή top_p βάσει επιθυμητής ποικιλίας απάντησης
                diversity = min(max(user_preferences["diversity"], 1), 10) / 10
                sampling_params["top_p"] = 0.6 + (0.39 * diversity)
        
        # Δημιουργία και αποστολή αιτήματος με προσαρμοσμένες παραμέτρους δειγματοληψίας
        response = await self.client.send_request(
            prompt=prompt,
            temperature=sampling_params["temperature"],
            top_p=sampling_params["top_p"],
            frequency_penalty=sampling_params["frequency_penalty"]
        )
        
        # Επιστροφή απάντησης με μεταδεδομένα δειγματοληψίας για διαφάνεια
        return {
            "text": response.generated_text,
            "applied_sampling": sampling_params,
            "task_type": task_type
        }
```

Στον προηγούμενο κώδικα έχουμε:

- Δημιουργήσει κλάση `DynamicSamplingService` που διαχειρίζεται την προσαρμοστική δειγματοληψία.
- Ορίσει προκαθορισμένες ρυθμίσεις δειγματοληψίας για διαφορετικούς τύπους εργασιών (δημιουργικές, πραγματολογικές, κώδικα, αναλυτικές).
- Επιλέξει βασική προκαθορισμένη ρύθμιση δειγματοληψίας βάσει τύπου εργασίας.
- Ρυθμίσει τις παραμέτρους δειγματοληψίας βάσει των προτιμήσεων χρήστη, όπως επίπεδο δημιουργικότητας και ποικιλίας.
- Στείλει το αίτημα με τις δυναμικά διαμορφωμένες παραμέτρους δειγματοληψίας.
- Επέστρεψε το παραγόμενο κείμενο μαζί με τις εφαρμοσμένες παραμέτρους δειγματοληψίας και τον τύπο εργασίας για διαφάνεια.
- Χρησιμοποίησε `temperature` για να ελέγξει την τυχαιότητα της εξόδου, όπου υψηλότερες τιμές οδηγούν σε πιο δημιουργικές απαντήσεις.
- Χρησιμοποίησε `top_p` για να περιορίσει την επιλογή των tokens σε εκείνα που συμβάλλουν στο κορυφαίο σωρευτικό ποσοστό πιθανότητας, βελτιώνοντας την ποιότητα του παραγόμενου κειμένου.
- Χρησιμοποίησε `frequency_penalty` για να μειώσει την επανάληψη και να ενθαρρύνει την ποικιλία στην έξοδο.
- Χρησιμοποίησε `user_preferences` για να επιτρέψει την προσαρμογή των παραμέτρων δειγματοληψίας βάσει ορισμένων από τον χρήστη επιπέδων δημιουργικότητας και ποικιλίας.
- Χρησιμοποίησε `task_type` για να καθορίσει την κατάλληλη στρατηγική δειγματοληψίας για το αίτημα, επιτρέποντας πιο εξατομικευμένες απαντήσεις βάσει της φύσης της εργασίας.
- Χρησιμοποίησε τη μέθοδο `send_request` για να στείλει την προτροπή με τις διαμορφωμένες παραμέτρους δειγματοληψίας, διασφαλίζοντας ότι το μοντέλο παράγει κείμενο σύμφωνα με τις καθορισμένες απαιτήσεις.
- Χρησιμοποίησε `generated_text` για να ανακτήσει την απάντηση του μοντέλου, η οποία επιστρέφεται μαζί με τις παραμέτρους δειγματοληψίας και τον τύπο εργασίας για περαιτέρω ανάλυση ή εμφάνιση.
- Χρησιμοποίησε τις συναρτήσεις `min` και `max` για να διασφαλίσει ότι οι προτιμήσεις χρήστη περιορίζονται εντός έγκυρων ορίων, αποτρέποντας μη έγκυρες ρυθμίσεις δειγματοληψίας.

# [JavaScript Dynamic](#tab/javascript-dynamic)

```javascript
// Παράδειγμα JavaScript: Δυναμική ρύθμιση δειγματοληψίας με βάση το πλαίσιο χρήστη
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
  
  // Ανίχνευση τύπου εργασίας από την προτροπή
  detectTaskType(prompt, context = {}) {
    const promptLower = prompt.toLowerCase();
    
    // Απλός ευριστικός εντοπισμός - μπορεί να βελτιωθεί με ταξινόμηση ML
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
    
    // Προεπιλογή σε συνομιλιακό αν δεν εντοπιστεί σαφής τύπος
    return 'conversational';
  }
  
  // Υπολογισμός παραμέτρων δειγματοληψίας βασισμένων σε πλαίσιο και προτιμήσεις χρήστη
  getSamplingParameters(prompt, context = {}) {
    // Ανίχνευση του τύπου εργασίας
    const taskType = this.detectTaskType(prompt, context);
    
    // Λήψη βασικού προφίλ
    let params = {...this.samplingProfiles[taskType]};
    
    // Προσαρμογή βάσει προτιμήσεων χρήστη
    if (context.userPreferences) {
      const { creativity, precision, consistency } = context.userPreferences;
      
      if (creativity !== undefined) {
        // Κλίμακα από 1-10 στο κατάλληλο εύρος θερμοκρασίας
        params.temperature = 0.1 + (creativity * 0.09); // 0.1-1.0
      }
      
      if (precision !== undefined) {
        // Μεγαλύτερη ακρίβεια σημαίνει χαμηλότερο topP (πιο στοχευμένη επιλογή)
        params.topP = 1.0 - (precision * 0.05); // 0.5-1.0
      }
      
      if (consistency !== undefined) {
        // Μεγαλύτερη συνέπεια σημαίνει μικρότερες ποινές
        params.frequencyPenalty = 0.1 + ((10 - consistency) * 0.08); // 0.1-0.9
      }
    }
    
    // Εφαρμογή διδαγμένων προσαρμογών από το ιστορικό απόδοσης
    this.applyLearnedAdjustments(params, taskType);
    
    return params;
  }
  
  applyLearnedAdjustments(params, taskType) {
    // Απλή προσαρμοστική λογική - μπορεί να βελτιωθεί με πιο προηγμένους αλγορίθμους
    const relevantHistory = this.performanceHistory
      .filter(entry => entry.taskType === taskType)
      .slice(-5); // Λαμβάνει υπόψη μόνο το πρόσφατο ιστορικό
    
    if (relevantHistory.length > 0) {
      // Υπολογισμός μέσων βαθμολογιών απόδοσης
      const avgScore = relevantHistory.reduce((sum, entry) => sum + entry.score, 0) / relevantHistory.length;
      
      // Εάν η απόδοση είναι κάτω από το όριο, προσαρμόστε τις παραμέτρους
      if (avgScore < 0.7) {
        // Ελαφριά προσαρμογή προς ασφαλέστερες τιμές
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
      score // Αξιολόγηση ποιότητας απόκρισης από 0 έως 1
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
    
    // Εάν ο χρήστης παρέχει ανατροφοδότηση, καταγράψτε την για μελλοντική βελτιστοποίηση
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

- Δημιουργήσει κλάση `AdaptiveSamplingManager` που διαχειρίζεται τη δυναμική δειγματοληψία βάσει τύπου εργασίας και προτιμήσεων χρήστη.
- Ορίσει προφίλ δειγματοληψίας για διαφορετικούς τύπους εργασιών (δημιουργικές, πραγματολογικές, κώδικα, συνομιλίας).
- Υλοποίησε μέθοδο ανίχνευσης του τύπου εργασίας από την προτροπή χρησιμοποιώντας απλά ευρετικά.
- Υπολόγισε τις παραμέτρους δειγματοληψίας βάσει του ανιχνευμένου τύπου εργασίας και των προτιμήσεων χρήστη.
- Εφάρμοσε προσαρμογές που μαθαίνονται βάσει ιστορικής απόδοσης για βελτιστοποίηση των παραμέτρων δειγματοληψίας.
- Κατέγραψε την απόδοση για μελλοντικές προσαρμογές, επιτρέποντας στο σύστημα να μαθαίνει από παλιές αλληλεπιδράσεις.
- Στείλει αιτήματα με δυναμικά διαμορφωμένες παραμέτρους δειγματοληψίας και επέστρεψε το παραγόμενο κείμενο μαζί με εφαρμοσμένες παραμέτρους και ανιχνευμένο τύπο εργασίας.
- Χρησιμοποίησε:
    - `userPreferences` για να επιτρέψει την προσαρμογή των παραμέτρων δειγματοληψίας βάσει ορισμένων από τον χρήστη επιπέδων δημιουργικότητας, ακρίβειας και συνέπειας.
    - `detectTaskType` για να καθορίσει τη φύση της εργασίας βάσει της προτροπής, επιτρέποντας πιο εξατομικευμένες απαντήσεις.
    - `recordPerformance` για καταγραφή της απόδοσης των παραγόμενων απαντήσεων, δίνοντας στο σύστημα τη δυνατότητα να προσαρμόζεται και να βελτιώνεται με την πάροδο του χρόνου.
    - `applyLearnedAdjustments` για τροποποίηση των παραμέτρων δειγματοληψίας βάσει ιστορικής απόδοσης, βελτιώνοντας την ικανότητα του μοντέλου να παράγει απαντήσεις υψηλής ποιότητας.
    - `generateResponse` για να περιλαμβάνει ολόκληρη τη διαδικασία παραγωγής απάντησης με προσαρμοστική δειγματοληψία, καθιστώντας εύκολη την κλήση με διαφορετικές προτροπές και συμφραζόμενα.
    - `allowedTools` για να καθορίσει ποια εργαλεία μπορεί να χρησιμοποιεί το μοντέλο κατά τη δημιουργία, επιτρέποντας πιο συμφραζόμενες απαντήσεις.
    - `feedbackScore` για να επιτρέπει στους χρήστες να παρέχουν ανατροφοδότηση για την ποιότητα της παραγόμενης απάντησης, η οποία μπορεί να χρησιμοποιηθεί για περαιτέρω βελτίωση της απόδοσης του μοντέλου με την πάροδο του χρόνου.
    - `performanceHistory` για να διατηρεί αρχείο παλαιότερων αλληλεπιδράσεων, δίνοντας στο σύστημα τη δυνατότητα να μαθαίνει από προηγούμενες επιτυχίες και αποτυχίες.
    - `getSamplingParameters` για να προσαρμόζει δυναμικά τις παραμέτρους δειγματοληψίας βάσει του συμφραζόμενου του αιτήματος, επιτρέποντας πιο ευέλικτη και ανταποκρινόμενη συμπεριφορά μοντέλου.
    - `detectTaskType` για να ταξινομεί την εργασία βάσει της προτροπής, επιτρέποντας στο σύστημα να εφαρμόζει κατάλληλες στρατηγικές δειγματοληψίας για διαφορετικούς τύπους αιτημάτων.
    - `samplingProfiles` για να ορίζει βασικές διαμορφώσεις δειγματοληψίας για διαφορετικούς τύπους εργασιών, επιτρέποντας γρήγορες προσαρμογές βάσει της φύσης του αιτήματος.

---

## Τι Ακολουθεί

- [5.7 Κλιμάκωση](../mcp-scaling/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->