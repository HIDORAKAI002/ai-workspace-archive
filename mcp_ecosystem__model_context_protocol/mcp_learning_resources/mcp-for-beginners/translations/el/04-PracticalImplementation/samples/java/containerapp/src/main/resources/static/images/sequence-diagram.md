```mermaid
sequenceDiagram
    actor User
    participant WebApp as Web App<br/>(ContentSafetyController)
    participant SafetyService as Υπηρεσία Ασφάλειας Περιεχομένου
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP Client
    participant McpServer as MCP Calculator Server<br/>(Port 8080)
    participant CalcService as Υπηρεσία Υπολογισμών

    %% Αλληλεπίδραση Χρήστη
    User->>WebApp: Εισαγωγή εντολής υπολογισμού
    WebApp->>WebApp: Δημιουργία PromptRequest

    %% Έλεγχος Ασφάλειας Περιεχομένου
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Έλεγχος αν το περιεχόμενο είναι ασφαλές<br/>(βαθμός σοβαρότητας < 2 για όλες τις κατηγορίες)

    %% Ροή Επεξεργασίας - Ασφαλές Περιεχόμενο
    alt Το περιεχόμενο είναι ασφαλές
        SafetyService->>LangChain: Δώσε την εντολή στο Bot.chat()
        LangChain->>McpClient: Επεξεργασία εντολής
        McpClient->>McpServer: Κλήση κατάλληλου εργαλείου υπολογισμού μέσω SSE
        McpServer->>CalcService: Εκτέλεση υπολογισμού<br/>(πρόσθεση, αφαίρεση, πολλαπλασιασμός, κλπ.)
        CalcService-->>McpServer: Αποτέλεσμα υπολογισμού
        McpServer-->>McpClient: Αποτέλεσμα εκτέλεσης εργαλείου
        McpClient-->>LangChain: Αποτέλεσμα εργαλείου
        LangChain-->>SafetyService: Απάντηση Bot
        SafetyService-->>WebApp: Επιστροφή χάρτη αποτελεσμάτων<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Εμφάνιση αποτελέσματος υπολογισμού και πληροφοριών ασφαλείας
    else Το περιεχόμενο δεν είναι ασφαλές
        SafetyService-->>WebApp: Επιστροφή χάρτη αποτελεσμάτων<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Εμφάνιση προειδοποίησης ασφαλείας<br/>(χωρίς υπολογισμό)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->