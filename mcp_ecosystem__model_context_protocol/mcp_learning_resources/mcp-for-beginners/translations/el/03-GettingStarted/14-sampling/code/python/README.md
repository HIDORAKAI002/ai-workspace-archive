# Εκτέλεση του δείγματος

## Δημιουργία εικονικού περιβάλλοντος

```sh
python -m venv venv
source ./venv/bin/activate
```

## Εγκατάσταση εξαρτήσεων

```sh
pip install "mcp[cli]"
```

## Εκτέλεση του διακομιστή

```sh
uvicorn server:app --port 8000
```

## Δοκιμή του διακομιστή με το GitHub Copilot και το VS Code

Προσθέστε την εγγραφή στο mcp.json ως εξής:

```json
"servers": {
    "my-mcp-server-999e9ea3": {
        "url": "http://localhost:8001/sse",
        "type": "http"
    }
}
```

Βεβαιωθείτε ότι έχετε πατήσει "start" στον διακομιστή.

Στο GitHub Copilot επικολλήστε το ακόλουθο αίτημα:

```text
create a blog post named "Where Python comes from", the content is "Python is actually named after Monty Python Flying Circus"
```

Την πρώτη φορά θα σας ζητηθεί αν θέλετε να αποδεχτείτε μια ενέργεια Sampling, στη συνέχεια θα σας ζητηθεί να αποδεχτείτε το εργαλείο να εκτελέσει το "create_blog". Θα πρέπει να δείτε μια απάντηση παρόμοια με:

```json
{
  "result": "{\"id\": \"Where Python comes from\", \"abstract\": \"# Python's Origin\\n\\nPython, the popular programming language, derives its name from **Monty Python's Flying Circus**, the British comedy troupe, rather than the snake. This naming choice reflects the creator's desire to make programming more fun and accessible.\"}"
}
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης AI [Co-op Translator](https://github.com/Azure/co-op-translator). Παρόλο που επιδιώκουμε την ακρίβεια, παρακαλούμε να λάβετε υπόψη ότι οι αυτόματες μεταφράσεις μπορεί να περιέχουν σφάλματα ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες συνιστάται επαγγελματική μετάφραση από ανθρώπινο μεταφραστή. Δεν φέρουμε καμία ευθύνη για τυχόν παρανοήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->