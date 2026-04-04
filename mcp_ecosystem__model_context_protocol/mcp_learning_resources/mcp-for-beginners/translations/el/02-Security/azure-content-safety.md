# Προηγμένη Ασφάλεια MCP με Azure Content Safety

> **OWASP MCP Αντιμετωπιζόμενο Κίνδυνο**: [MCP06 - Έγχυση Εντολών μέσω Περιεχομένου Στοίχισης](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Το Azure Content Safety παρέχει διάφορα ισχυρά εργαλεία που μπορούν να ενισχύσουν την ασφάλεια των υλοποιήσεων MCP σας. Για πρακτική εμπειρία υλοποίησης, δείτε το [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Ασφάλεια Εισόδου/Εξόδου.

## Ασπίδες Εντολών (Prompt Shields)

Οι Ασπίδες Εντολών AI της Microsoft παρέχουν ισχυρή προστασία ενάντια σε άμεσες και έμμεσες επιθέσεις έγχυσης εντολών (prompt injection) μέσω:

1. **Προηγμένης Ανίχνευσης**: Χρησιμοποιεί μηχανική μάθηση για τον εντοπισμό κακόβουλων οδηγιών ενσωματωμένων στο περιεχόμενο.
2. **Φωτισμού (Spotlighting)**: Μετασχηματίζει το κείμενο εισόδου για να βοηθήσει τα συστήματα AI να διακρίνουν ανάμεσα σε έγκυρες οδηγίες και εξωτερικές εισόδους.
3. **Οριοθετητών και Σηματοδότησης Δεδομένων (Delimiters and Datamarking)**: Επισημαίνει τα όρια μεταξύ αξιόπιστων και μη αξιόπιστων δεδομένων.
4. **Ενσωμάτωσης Content Safety**: Συνεργάζεται με το Azure AI Content Safety για την ανίχνευση απόπειρας παραβίασης (jailbreak) και επιβλαβούς περιεχομένου.
5. **Συνεχούς Ενημέρωσης**: Η Microsoft ενημερώνει τακτικά τους μηχανισμούς προστασίας έναντι νέων απειλών.

## Εφαρμογή Azure Content Safety με MCP

Αυτή η προσέγγιση παρέχει πολυεπίπεδη ασφάλεια:
- Σάρωση εισόδων πριν την επεξεργασία
- Επικύρωση εξόδων πριν την επιστροφή
- Χρήση λιστών αποκλεισμού για γνωστά επιβλαβή πρότυπα
- Αξιοποίηση των μοντέλων ασφαλείας περιεχομένου του Azure που ενημερώνονται συνεχώς

## Πόροι Azure Content Safety

Για να μάθετε περισσότερα σχετικά με την εφαρμογή του Azure Content Safety με τους MCP διακομιστές σας, συμβουλευτείτε αυτούς τους επίσημους πόρους:

1. [Τεκμηρίωση Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Επίσημη τεκμηρίωση για το Azure Content Safety.
2. [Τεκμηρίωση Ασπίδας Εντολών (Prompt Shield)](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Μάθετε πώς να αποτρέψετε επιθέσεις έγχυσης εντολών.
3. [Αναφορά API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Αναλυτική αναφορά API για την εφαρμογή Content Safety.
4. [Γρήγορη Έναρξη: Azure Content Safety με C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Οδηγός γρήγορης υλοποίησης με χρήση C#.
5. [Βιβλιοθήκες Πελατών Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Βιβλιοθήκες πελατών για διάφορες γλώσσες προγραμματισμού.
6. [Ανίχνευση Απόπειρας Παραβίασης](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Ειδικές οδηγίες για την ανίχνευση και αποτροπή απόπειρας παραβίασης.
7. [Καλές Πρακτικές για Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Καλές πρακτικές για την αποτελεσματική εφαρμογή του content safety.

Για πιο λεπτομερή υλοποίηση, δείτε τον [Οδηγό Εφαρμογής Azure Content Safety](./azure-content-safety-implementation.md).

## Τι Ακολουθεί

- Διάβασε: [Εφαρμογή Azure Content Safety](./azure-content-safety-implementation.md)
- Επιστροφή στο: [Επισκόπηση Μονάδας Ασφάλειας](./README.md)
- Συνέχεια στο: [Μονάδα 3: Ξεκινώντας](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση Ευθυνών**:  
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Παρόλο που προσπαθούμε για ακρίβεια, παρακαλούμε να γνωρίζετε ότι οι αυτόματες μεταφράσεις ενδέχεται να περιέχουν σφάλματα ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν ευθυνόμαστε για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->