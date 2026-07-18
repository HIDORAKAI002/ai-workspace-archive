# 🎯 Προγραμματισμός & Σχεδιαστικά Πρότυπα με Azure OpenAI (Responses API) (.NET)

## 📋 Μαθησιακοί Στόχοι

Αυτό το τετράδιο παρουσιάζει επιχειρησιακά πρότυπα προγραμματισμού και σχεδιασμού για την κατασκευή έξυπνων πρακτόρων χρησιμοποιώντας το Microsoft Agent Framework στο .NET με το Azure OpenAI (Responses API). Θα μάθετε να δημιουργείτε πράκτορες που μπορούν να διασπούν σύνθετα προβλήματα, να σχεδιάζουν πολύ-βηματικές λύσεις και να εκτελούν σύνθετες ροές εργασίας με τα επιχειρησιακά χαρακτηριστικά του .NET.

## ⚙️ Προαπαιτούμενα & Ρύθμιση

**Περιβάλλον Ανάπτυξης:**
- .NET 9.0 SDK ή νεότερο
- Visual Studio 2022 ή VS Code με επέκταση C#
- Μια συνδρομή Azure με ένα πόρο Azure OpenAI και μια ανάπτυξη μοντέλου
- Το Azure CLI — συνδεθείτε με `az login`

**Απαραίτητες Εξαρτήσεις:**
```xml
<PackageReference Include="Microsoft.Extensions.AI" Version="10.*" />
<PackageReference Include="Microsoft.Agents.AI" Version="1.*-*" />
<PackageReference Include="Microsoft.Agents.AI.OpenAI" Version="1.*-*" />
<PackageReference Include="Azure.AI.OpenAI" Version="2.1.0" />
<PackageReference Include="Azure.Identity" Version="1.13.1" />
<PackageReference Include="DotNetEnv" Version="3.1.1" />
```

**Διαμόρφωση Περιβάλλοντος (αρχείο .env):**
```env
AZURE_OPENAI_ENDPOINT=https://<your-resource>.openai.azure.com
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

## Εκτέλεση Κώδικα

Αυτό το μάθημα περιλαμβάνει υλοποίηση .NET Single File App. Για να το εκτελέσετε:

```bash
# Κάντε το αρχείο εκτελέσιμο (Linux/macOS)
chmod +x 07-dotnet-agent-framework.cs

# Εκτελέστε την εφαρμογή
./07-dotnet-agent-framework.cs
```

Ή χρησιμοποιήστε την εντολή dotnet run:

```bash
dotnet run 07-dotnet-agent-framework.cs
```

## Υλοποίηση Κώδικα

Η πλήρης υλοποίηση είναι διαθέσιμη στο `07-dotnet-agent-framework.cs`, το οποίο παρουσιάζει:

- Φόρτωση διαμόρφωσης περιβάλλοντος με DotNetEnv
- Διαμόρφωση του πελάτη Azure OpenAI και δημιουργία AI πράκτορα χρησιμοποιώντας `GetChatClient().AsAIAgent()`
- Ορισμό δομημένων μοντέλων δεδομένων (Plan και TravelPlan) με σειριοποίηση JSON
- Δημιουργία AI πράκτορα με δομημένη έξοδο χρησιμοποιώντας JSON σχήμα
- Εκτέλεση αιτημάτων σχεδιασμού με τύπους ασφαλείς απαντήσεις

## Βασικές Έννοιες

### Δομημένος Σχεδιασμός με Τύπους-Ασφαλή Μοντέλα

Ο πράκτορας χρησιμοποιεί κλάσεις C# για να ορίσει τη δομή των αποτελεσμάτων σχεδιασμού:

```csharp
public class Plan
{
    [JsonPropertyName("assigned_agent")]
    public string? Assigned_agent { get; set; }

    [JsonPropertyName("task_details")]
    public string? Task_details { get; set; }
}

public class TravelPlan
{
    [JsonPropertyName("main_task")]
    public string? Main_task { get; set; }

    [JsonPropertyName("subtasks")]
    public IList<Plan> Subtasks { get; set; }
}
```

### JSON Σχήμα για Δομημένες Εξόδους

Ο πράκτορας διαμορφώνεται να επιστρέφει απαντήσεις που ταιριάζουν με το σχήμα TravelPlan:

```csharp
ChatClientAgentOptions agentOptions = new()
{
    Name = AGENT_NAME,
    Description = AGENT_INSTRUCTIONS,
    ChatOptions = new()
    {
        ResponseFormat = ChatResponseFormatJson.ForJsonSchema(
            schema: AIJsonUtilities.CreateJsonSchema(typeof(TravelPlan)),
            schemaName: "TravelPlan",
            schemaDescription: "Travel Plan with main_task and subtasks")
    }
};
```

### Οδηγίες Πράκτορα Σχεδιασμού

Ο πράκτορας δρα ως συντονιστής, αναθέτοντας εργασίες σε εξειδικευμένους υποπράκτορες:

- FlightBooking: Για κράτηση πτήσεων και παροχή πληροφοριών πτήσεων
- HotelBooking: Για κράτηση ξενοδοχείων και παροχή πληροφοριών ξενοδοχείων
- CarRental: Για κράτηση αυτοκινήτων και παροχή πληροφοριών ενοικίασης αυτοκινήτων
- ActivitiesBooking: Για κράτηση δραστηριοτήτων και παροχή πληροφοριών δραστηριοτήτων
- DestinationInfo: Για παροχή πληροφοριών σχετικά με προορισμούς
- DefaultAgent: Για την διαχείριση γενικών αιτημάτων

## Αναμενόμενο Αποτέλεσμα

Όταν εκτελείτε τον πράκτορα με αίτημα σχεδιασμού ταξιδιού, θα αναλύσει το αίτημα και θα δημιουργήσει ένα δομημένο σχέδιο με κατάλληλες αναθέσεις εργασιών σε εξειδικευμένους πράκτορες, μορφοποιημένο ως JSON σύμφωνα με το σχήμα TravelPlan.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->