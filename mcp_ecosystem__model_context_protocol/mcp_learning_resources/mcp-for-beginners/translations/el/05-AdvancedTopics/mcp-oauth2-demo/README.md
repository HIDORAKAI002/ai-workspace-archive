# Επίδειξη MCP OAuth2

## Εισαγωγή

Το OAuth2 είναι το πρωτόκολλο βιομηχανικού προτύπου για εξουσιοδότηση, επιτρέποντας ασφαλή πρόσβαση σε πόρους χωρίς κοινή χρήση διαπιστευτηρίων. Στις υλοποιήσεις MCP (Πρωτόκολλο Πλαισίου Μοντέλου), το OAuth2 παρέχει έναν στιβαρό τρόπο αυθεντικοποίησης και εξουσιοδότησης πελατών (όπως πράκτορες AI) για την πρόσβαση σε MCP διακομιστές και τα εργαλεία τους.

Αυτό το μάθημα δείχνει πώς να υλοποιήσετε αυθεντικοποίηση OAuth2 για διακομιστές MCP χρησιμοποιώντας το Spring Boot, ένα κοινό μοτίβο για επιχειρησιακές και παραγωγικές αναπτύξεις.

## Στόχοι Μάθησης

Στο τέλος αυτού του μαθήματος, θα μπορείτε να:
- Κατανοείτε πώς το OAuth2 ενσωματώνεται με τους διακομιστές MCP
- Υλοποιείτε έναν Spring Authorization Server για την έκδοση token
- Προστατεύετε τα endpoints MCP με αυθεντικοποίηση βασισμένη σε JWT
- Ρυθμίζετε τη ροή client credentials για επικοινωνία μηχανής με μηχανή

## Προαπαιτούμενα

- Βασική κατανόηση Java και Spring Boot
- Εξοικείωση με έννοιες MCP από προηγούμενα μαθήματα
- Εγκατεστημένα Maven ή Gradle

---

## Επισκόπηση Έργου

Αυτό το έργο είναι μια **ελάχιστη εφαρμογή Spring Boot** που λειτουργεί ως:

* **Spring Authorization Server** (εκδίδοντας JWT access tokens μέσω της ροής `client_credentials`), και  
* **Resource Server** (προστατεύοντας το δικό του endpoint `/hello`).

Αντιγράφει τη ρύθμιση που παρουσιάστηκε στο [άρθρο του Spring blog (2 Απρ 2025)](https://spring.io/blog/2025/04/02/mcp-server-oauth2).

---

## Γρήγορη εκκίνηση (τοπικά)

```bash
# κατασκευή και εκτέλεση
./mvnw spring-boot:run

# απόκτηση ενός διακριτικού
curl -u mcp-client:secret -d grant_type=client_credentials \
     http://localhost:8081/oauth2/token | jq -r .access_token > token.txt

# κλήση του προστατευμένου σημείου τερματισμού
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello
```

---

## Δοκιμή της Ρύθμισης OAuth2

Μπορείτε να δοκιμάσετε τη ρύθμιση ασφαλείας OAuth2 με τα παρακάτω βήματα:

### 1. Επιβεβαιώστε ότι ο διακομιστής λειτουργεί και είναι ασφαλής

```bash
# Αυτό θα πρέπει να επιστρέφει 401 Unauthorized, επιβεβαιώνοντας ότι η ασφάλεια OAuth2 είναι ενεργή
curl -v http://localhost:8081/
```

### 2. Πάρτε ένα access token χρησιμοποιώντας client credentials

```bash
# Λάβετε και εξαγάγετε την πλήρη απόκριση token
curl -v -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access"

# Ή εξαγάγετε μόνο το token (απαιτεί jq)
curl -s -X POST http://localhost:8081/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic bWNwLWNsaWVudDpzZWNyZXQ=" \
  -d "grant_type=client_credentials&scope=mcp.access" | jq -r .access_token > token.txt
```

Σημείωση: Η κεφαλίδα Basic Authentication (`bWNwLWNsaWVudDpzZWNyZXQ=`) είναι η κωδικοποίηση Base64 του `mcp-client:secret`.

### 3. Πρόσβαση στο προστατευμένο endpoint χρησιμοποιώντας το token

```bash
# Χρησιμοποιώντας το αποθηκευμένο διακριτικό
curl -H "Authorization: Bearer $(cat token.txt)" http://localhost:8081/hello

# Ή απευθείας με την τιμή του διακριτικού
curl -H "Authorization: Bearer eyJra...token_value...xyz" http://localhost:8081/hello
```

Μια επιτυχής απάντηση με το μήνυμα "Hello from MCP OAuth2 Demo!" επιβεβαιώνει ότι η ρύθμιση OAuth2 λειτουργεί σωστά.

---

## Δημιουργία Container

```bash
docker build -t mcp-oauth2-demo .
docker run -p 8081:8081 mcp-oauth2-demo
```

---

## Ανάπτυξη σε **Azure Container Apps**

```bash
az containerapp up -n mcp-oauth2 \
  -g demo-rg -l westeurope \
  --image <your-registry>/mcp-oauth2-demo:latest \
  --ingress external --target-port 8081
```

Το FQDN εισόδου γίνεται ο **issuer** σας (`https://<fqdn>`).  
Το Azure παρέχει αυτόματα ένα αξιόπιστο πιστοποιητικό TLS για το `*.azurecontainerapps.io`.

---

## Ενσωμάτωση σε **Azure API Management**

Προσθέστε αυτή την εισερχόμενη πολιτική στο API σας:

```xml
<inbound>
  <validate-jwt header-name="Authorization">
    <openid-config url="https://<fqdn>/.well-known/openid-configuration"/>
    <audiences>
      <audience>mcp-client</audience>
    </audiences>
  </validate-jwt>
  <base/>
</inbound>
```

Το APIM θα ανακτά το JWKS και θα επικυρώνει κάθε αίτηση.

---

## Τι ακολουθεί

- [5.4 Root contexts](../mcp-root-contexts/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:  
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης Τεχνητής Νοημοσύνης [Co-op Translator](https://github.com/Azure/co-op-translator). Παρόλο που επιδιώκουμε την ακρίβεια, παρακαλούμε να λάβετε υπόψη ότι οι αυτόματες μεταφράσεις ενδέχεται να περιέχουν σφάλματα ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αξιόπιστη πηγή. Για κρίσιμες πληροφορίες συνιστάται επαγγελματική μετάφραση από ανθρώπινο μεταφραστή. Δεν φέρουμε καμία ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->