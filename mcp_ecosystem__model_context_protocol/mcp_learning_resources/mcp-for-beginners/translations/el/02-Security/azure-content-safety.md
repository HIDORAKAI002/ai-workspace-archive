# Προηγμένη Ασφάλεια MCP με το Azure Content Safety

> **Διευθετημένος Κίνδυνος OWASP MCP**: [MCP06 - Παραβίαση Ροής Προθέσεων](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Το Azure Content Safety παρέχει πολλά ισχυρά εργαλεία που μπορούν να βελτιώσουν την ασφάλεια των υλοποιήσεών σας MCP. Για πρακτική εμπειρία υλοποίησης, δείτε το [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/), Camp 3: I/O Security.

## Ασπίδες Προτροπής

Οι AI Prompt Shields της Microsoft παρέχουν ισχυρή προστασία κατά των άμεσων και έμμεσων επιθέσεων έγχυσης προτροπής μέσω:

1. **Προηγμένη Ανίχνευση**: Χρησιμοποιεί μηχανική μάθηση για τον εντοπισμό κακόβουλων εντολών ενσωματωμένων στο περιεχόμενο.
2. **Φωτισμός**: Μετατρέπει το εισαγόμενο κείμενο ώστε να βοηθά τα συστήματα AI να διαχωρίζουν τις έγκυρες εντολές από εξωτερικές εισροές.
3. **Οριοθέτες και Σήμανση Δεδομένων**: Επισημαίνει τα όρια μεταξύ αξιόπιστων και μη αξιόπιστων δεδομένων.
4. **Ενσωμάτωση Content Safety**: Συνεργάζεται με το Azure AI Content Safety για την ανίχνευση προσπαθειών παραβίασης και επιβλαβούς περιεχομένου.
5. **Συνεχής Ενημέρωση**: Η Microsoft ενημερώνει τακτικά τους μηχανισμούς προστασίας κατά των νέων απειλών.

## Υλοποίηση του Azure Content Safety με MCP

Αυτή η προσέγγιση παρέχει προστασία πολλαπλών επιπέδων:
- Σάρωση εισόδων πριν την επεξεργασία
- Επικύρωση εξόδων πριν την επιστροφή
- Χρήση μαύρων λιστών για γνωστά επιβλαβή μοτίβα
- Αξιοποίηση των συνεχώς ενημερωμένων μοντέλων ασφάλειας περιεχομένου του Azure

## Πόροι Azure Content Safety

Για να μάθετε περισσότερα σχετικά με την υλοποίηση του Azure Content Safety με τους διακομιστές MCP σας, συμβουλευτείτε αυτούς τους επίσημους πόρους:

1. [Τεκμηρίωση Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Επίσημη τεκμηρίωση για το Azure Content Safety.
2. [Τεκμηρίωση Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Μάθετε πώς να αποτρέπετε επιθέσεις έγχυσης προτροπής.
3. [Αναφορά API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Λεπτομερής αναφορά API για την υλοποίηση του Content Safety.
4. [Γρήγορη Εκκίνηση: Azure Content Safety με C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Οδηγός γρήγορης υλοποίησης με C#.
5. [Βιβλιοθήκες Πελατών Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Βιβλιοθήκες πελατών για διάφορες γλώσσες προγραμματισμού.
6. [Ανίχνευση Προσπαθειών Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Ειδικές οδηγίες για την ανίχνευση και πρόληψη προσπαθειών jailbreak.
7. [Βέλτιστες Πρακτικές για Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Βέλτιστες πρακτικές για αποτελεσματική υλοποίηση ασφάλειας περιεχομένου.

Για πιο λεπτομερή υλοποίηση, δείτε τον [οδηγό υλοποίησης Azure Content Safety](./azure-content-safety-implementation.md).

## Τι Ακολουθεί

- Διαβάστε: [Υλοποίηση Azure Content Safety](./azure-content-safety-implementation.md)
- Επιστροφή σε: [Επισκόπηση Μονάδας Ασφαλείας](./README.md)
- Συνέχεια σε: [Μονάδα 3: Ξεκινώντας](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->