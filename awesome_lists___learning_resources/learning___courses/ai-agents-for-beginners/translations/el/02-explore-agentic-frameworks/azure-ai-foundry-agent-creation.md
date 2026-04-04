# Ανάπτυξη Υπηρεσίας Πράκτορα Azure AI

Σε αυτή την άσκηση, χρησιμοποιείτε τα εργαλεία υπηρεσίας Azure AI Agent στην [πύλη Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst) για να δημιουργήσετε έναν πράκτορα για Κράτηση Πτήσεων. Ο πράκτορας θα είναι σε θέση να αλληλεπιδρά με χρήστες και να παρέχει πληροφορίες σχετικά με πτήσεις.

## Προαπαιτούμενα

Για να ολοκληρώσετε αυτή την άσκηση, χρειάζεστε τα εξής:
1. Έναν λογαριασμό Azure με ενεργή συνδρομή. [Δημιουργήστε έναν λογαριασμό δωρεάν](https://azure.microsoft.com/free/?WT.mc_id=academic-105485-koreyst).
2. Χρειάζεστε δικαιώματα για να δημιουργήσετε ένα hub Microsoft Foundry ή να έχετε ένα που να έχει δημιουργηθεί για εσάς.
    - Εάν ο ρόλος σας είναι Contributor ή Owner, μπορείτε να ακολουθήσετε τα βήματα σε αυτό το tutorial.

## Δημιουργία hub Microsoft Foundry

> **Σημείωση:** Το Microsoft Foundry ήταν προηγουμένως γνωστό ως Azure AI Studio.

1. Ακολουθήστε αυτές τις οδηγίες από το [blog post Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst) για τη δημιουργία ενός hub Microsoft Foundry.
2. Όταν δημιουργηθεί το έργο σας, κλείστε τυχόν συμβουλές που εμφανίζονται και ανασκοπήστε τη σελίδα έργου στην πύλη Microsoft Foundry, που θα πρέπει να μοιάζει με την παρακάτω εικόνα:

    ![Microsoft Foundry Project](../../../translated_images/el/azure-ai-foundry.88d0c35298348c2f.webp)

## Ανάπτυξη μοντέλου

1. Στο τμήμα στα αριστερά για το έργο σας, στην ενότητα **Τα περιουσιακά μου στοιχεία**, επιλέξτε τη σελίδα **Models + endpoints**.
2. Στη σελίδα **Models + endpoints**, στην καρτέλα **Model deployments**, στο μενού **+ Deploy model**, επιλέξτε **Deploy base model**.
3. Αναζητήστε το μοντέλο `gpt-4o-mini` στη λίστα και στη συνέχεια επιλέξτε το και επιβεβαιώστε.

    > **Σημείωση**: Η μείωση του TPM βοηθά στην αποφυγή υπερβολικής χρήσης του διαθέσιμου ποσοστώματος στη συνδρομή που χρησιμοποιείτε.

    ![Model Deployed](../../../translated_images/el/model-deployment.3749c53fb81e18fd.webp)

## Δημιουργία πράκτορα

Τώρα που έχετε αναπτύξει ένα μοντέλο, μπορείτε να δημιουργήσετε έναν πράκτορα. Ένας πράκτορας είναι ένα μοντέλο συνομιλίας AI που μπορεί να χρησιμοποιηθεί για να αλληλεπιδρά με χρήστες.

1. Στο τμήμα στα αριστερά για το έργο σας, στην ενότητα **Build & Customize**, επιλέξτε τη σελίδα **Agents**.
2. Κάντε κλικ στο **+ Create agent** για να δημιουργήσετε έναν νέο πράκτορα. Στο παράθυρο διαλόγου **Agent Setup**:
    - Εισάγετε ένα όνομα για τον πράκτορα, όπως `FlightAgent`.
    - Βεβαιωθείτε ότι το μοντέλο `gpt-4o-mini` που αναπτύξατε προηγουμένως είναι επιλεγμένο.
    - Ορίστε τις **Οδηγίες** σύμφωνα με την οδηγία που θέλετε να ακολουθεί ο πράκτορας. Να ένα παράδειγμα:
    ```
    You are FlightAgent, a virtual assistant specialized in handling flight-related queries. Your role includes assisting users with searching for flights, retrieving flight details, checking seat availability, and providing real-time flight status. Follow the instructions below to ensure clarity and effectiveness in your responses:

    ### Task Instructions:
    1. **Recognizing Intent**:
       - Identify the user's intent based on their request, focusing on one of the following categories:
         - Searching for flights
         - Retrieving flight details using a flight ID
         - Checking seat availability for a specified flight
         - Providing real-time flight status using a flight number
       - If the intent is unclear, politely ask users to clarify or provide more details.
        
    2. **Processing Requests**:
        - Depending on the identified intent, perform the required task:
        - For flight searches: Request details such as origin, destination, departure date, and optionally return date.
        - For flight details: Request a valid flight ID.
        - For seat availability: Request the flight ID and date and validate inputs.
        - For flight status: Request a valid flight number.
        - Perform validations on provided data (e.g., formats of dates, flight numbers, or IDs). If the information is incomplete or invalid, return a friendly request for clarification.

    3. **Generating Responses**:
    - Use a tone that is friendly, concise, and supportive.
    - Provide clear and actionable suggestions based on the output of each task.
    - If no data is found or an error occurs, explain it to the user gently and offer alternative actions (e.g., refine search, try another query).
    
    ```
> [!NOTE]
> Για ένα λεπτομερές prompt, μπορείτε να δείτε [αυτό το αποθετήριο](https://github.com/ShivamGoyal03/RoamMind) για περισσότερες πληροφορίες.
    
> Επιπλέον, μπορείτε να προσθέσετε **Knowledge Base** και **Actions** για να ενισχύσετε τις δυνατότητες του πράκτορα να παρέχει περισσότερες πληροφορίες και να εκτελεί αυτοματοποιημένες εργασίες βάσει αιτημάτων χρηστών. Για αυτή την άσκηση, μπορείτε να παραλείψετε αυτά τα βήματα.
    
![Agent Setup](../../../translated_images/el/agent-setup.9bbb8755bf5df672.webp)

3. Για να δημιουργήσετε έναν νέο πολυ-AI πράκτορα, απλώς κάντε κλικ στο **New Agent**. Ο νεοδημιουργημένος πράκτορας θα εμφανιστεί στη σελίδα Agents.

## Δοκιμή του πράκτορα

Μετά τη δημιουργία του πράκτορα, μπορείτε να τον δοκιμάσετε για να δείτε πώς ανταποκρίνεται σε ερωτήματα χρηστών στην πλατφόρμα Microsoft Foundry portal playground.

1. Στην κορυφή του παραθύρου **Setup** για τον πράκτορά σας, επιλέξτε **Try in playground**.
2. Στο παράθυρο **Playground**, μπορείτε να αλληλεπιδράσετε με τον πράκτορα πληκτρολογώντας ερωτήματα στο παράθυρο συνομιλίας. Για παράδειγμα, μπορείτε να ζητήσετε από τον πράκτορα να αναζητήσει πτήσεις από το Σιατλ στη Νέα Υόρκη στις 28.

    > **Σημείωση**: Ο πράκτορας ενδέχεται να μην παρέχει ακριβείς απαντήσεις, καθώς δεν χρησιμοποιούνται δεδομένα σε πραγματικό χρόνο σε αυτή την άσκηση. Ο σκοπός είναι να δοκιμάσετε την ικανότητα του πράκτορα να κατανοεί και να απαντά σε ερωτήματα χρηστών βάσει των παρεχόμενων οδηγιών.

    ![Agent Playground](../../../translated_images/el/agent-playground.dc146586de715010.webp)

3. Μετά τη δοκιμή του πράκτορα, μπορείτε να τον προσαρμόσετε περαιτέρω προσθέτοντας περισσότερα intents, δεδομένα εκπαίδευσης και ενέργειες για να βελτιώσετε τις δυνατότητές του.

## Καθαρισμός πόρων

Όταν ολοκληρώσετε τη δοκιμή του πράκτορα, μπορείτε να τον διαγράψετε για να αποφύγετε περαιτέρω κόστη.
1. Ανοίξτε την [πύλη Azure](https://portal.azure.com) και δείτε τα περιεχόμενα της ομάδας πόρων όπου αναπτύξατε τους πόρους hub που χρησιμοποιήσατε σε αυτή την άσκηση.
2. Στη γραμμή εργαλείων, επιλέξτε **Delete resource group**.
3. Εισάγετε το όνομα της ομάδας πόρων και επιβεβαιώστε ότι θέλετε να την διαγράψετε.

## Πόροι

- [Τεκμηρίωση Microsoft Foundry](https://learn.microsoft.com/en-us/azure/ai-studio/?WT.mc_id=academic-105485-koreyst)
- [Πύλη Microsoft Foundry](https://ai.azure.com/?WT.mc_id=academic-105485-koreyst)
- [Ξεκινώντας με το Azure AI Studio](https://techcommunity.microsoft.com/blog/educatordeveloperblog/getting-started-with-azure-ai-studio/4095602?WT.mc_id=academic-105485-koreyst)
- [Βασικές έννοιες για AI πράκτορες στο Azure](https://learn.microsoft.com/en-us/training/modules/ai-agent-fundamentals/?WT.mc_id=academic-105485-koreyst)
- [Azure AI Discord](https://aka.ms/AzureAI/Discord)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση Ευθυνών**:  
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία αυτόματης μετάφρασης AI [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να λάβετε υπόψη ότι οι αυτόματες μεταφράσεις ενδέχεται να περιέχουν σφάλματα ή ανακρίβειες. Το αρχικό έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η επίσημη πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρανοήσεις ή λανθασμένες ερμηνείες που απορρέουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->