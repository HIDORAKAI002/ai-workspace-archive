# Ρύθμιση Δημοφιλών Πελατών Κεντρικών Φιλοξενιών MCP

Αυτός ο οδηγός καλύπτει το πώς να ρυθμίσετε και να χρησιμοποιήσετε διακομιστές MCP με δημοφιλείς εφαρμογές φιλοξενίας AI. Κάθε κεντρικός υπολογιστής έχει τη δική του προσέγγιση ρύθμισης, αλλά μόλις ρυθμιστούν, όλοι επικοινωνούν με τους διακομιστές MCP χρησιμοποιώντας το τυποποιημένο πρωτόκολλο.

## Τι είναι ένας Κεντρικός Φιλοξενίας MCP;

Ένας **Κεντρικός Φιλοξενίας MCP** είναι μια εφαρμογή AI που μπορεί να συνδεθεί με διακομιστές MCP για να επεκτείνει τις δυνατότητές του. Σκεφτείτε τον ως το "front end" με το οποίο αλληλεπιδρούν οι χρήστες, ενώ οι διακομιστές MCP παρέχουν τα "back end" εργαλεία και δεδομένα.

```mermaid
flowchart LR
    User[👤 Χρήστης] --> Host[🖥️ Διακομιστής MCP]
    Host --> S1[MCP Διακομιστής Α]
    Host --> S2[MCP Διακομιστής Β]
    Host --> S3[MCP Διακομιστής Γ]
    
    subgraph "Δημοφιλείς Διακομιστές"
        H1[Έπιπλο Claude]
        H2[VS Code]
        H3[Cursor]
        H4[Cline]
        H5[Windsurf]
    end
```
## Προαπαιτούμενα

- Ένας διακομιστής MCP για σύνδεση (βλ. [Module 3.1 - First Server](../01-first-server/README.md))
- Η εφαρμογή φιλοξενίας εγκατεστημένη στο σύστημά σας
- Βασική εξοικείωση με αρχεία ρύθμισης JSON

---

## 1. Claude Desktop

Το **Claude Desktop** είναι η επίσημη εφαρμογή επιφάνειας εργασίας της Anthropic που υποστηρίζει εγγενώς το MCP.

### Εγκατάσταση

1. Κατεβάστε το Claude Desktop από [claude.ai/download](https://claude.ai/download)
2. Εγκαταστήστε και συνδεθείτε με τον λογαριασμό Anthropic σας

### Ρύθμιση

Το Claude Desktop χρησιμοποιεί ένα αρχείο ρύθμισης JSON για να ορίσει διακομιστές MCP.

**Τοποθεσία αρχείου ρύθμισης:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Παράδειγμα ρύθμισης:**

```json
{
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"],
      "env": {
        "PYTHONPATH": "/path/to/your/server"
      }
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-server/build/index.js"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/mydb"
      }
    }
  }
}
```

### Επιλογές Ρύθμισης

| Πεδίο | Περιγραφή | Παράδειγμα |
|-------|-------------|---------|
| `command` | Το εκτελέσιμο που θα τρέξει | `"python"`, `"node"`, `"npx"` |
| `args` | Ορίσματα γραμμής εντολών | `["-m", "my_server"]` |
| `env` | Μεταβλητές περιβάλλοντος | `{"API_KEY": "xxx"}` |
| `cwd` | Κατάλογος εργασίας | `"/path/to/server"` |

### Δοκιμή της Ρύθμισής σας

1. Αποθηκεύστε το αρχείο ρύθμισης
2. Κλείστε και ανοίξτε ξανά πλήρως το Claude Desktop
3. Ανοίξτε μια νέα συνομιλία
4. Ψάξτε για το εικονίδιο 🔌 που υποδεικνύει συνδεδεμένους διακομιστές
5. Δοκιμάστε να ζητήσετε από το Claude να χρησιμοποιήσει ένα από τα εργαλεία σας

### Επίλυση Προβλημάτων Claude Desktop

**Ο διακομιστής δεν εμφανίζεται:**
- Ελέγξτε τη σύνταξη του αρχείου ρύθμισης με έναν JSON validator
- Βεβαιωθείτε ότι η διαδρομή της εντολής είναι σωστή
- Ελέγξτε τα αρχεία καταγραφής του Claude Desktop: Βοήθεια → Εμφάνιση Καταγραφών

**Ο διακομιστής καταρρέει κατά την εκκίνηση:**
- Δοκιμάστε πρώτα τον διακομιστή χειροκίνητα στο τερματικό
- Ελέγξτε ότι οι μεταβλητές περιβάλλοντος έχουν οριστεί σωστά
- Βεβαιωθείτε ότι όλες οι εξαρτήσεις είναι εγκατεστημένες

---

## 2. VS Code με GitHub Copilot

Το VS Code υποστηρίζει το MCP μέσω επεκτάσεων GitHub Copilot Chat.

### Προαπαιτούμενα

1. Εγκατεστημένο VS Code έκδοση 1.99+
2. Εγκατεστημένη επέκταση GitHub Copilot
3. Εγκατεστημένη επέκταση GitHub Copilot Chat

### Ρύθμιση

Το VS Code χρησιμοποιεί το `.vscode/mcp.json` στον χώρο εργασίας ή στις ρυθμίσεις χρήστη.

**Ρύθμιση χώρου εργασίας** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "my-calculator": {
      "type": "stdio",
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    },
    "my-database": {
      "type": "sse",
      "url": "http://localhost:8080/sse"
    }
  }
}
```

**Ρυθμίσεις χρήστη** (`settings.json`):

```json
{
  "mcp.servers": {
    "global-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-memory"]
    }
  },
  "mcp.enableLogging": true
}
```

### Χρήση MCP στο VS Code

1. Ανοίξτε το πάνελ Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Πληκτρολογήστε `@` για να δείτε τα διαθέσιμα εργαλεία MCP
3. Χρησιμοποιήστε φυσική γλώσσα για να καλέσετε τα εργαλεία: "Calculate 25 * 48 using the calculator"

### Επίλυση Προβλημάτων VS Code

**Οι διακομιστές MCP δεν φορτώνουν:**
- Ελέγξτε το πάνελ Εξόδου → "MCP" για αρχεία καταγραφής σφαλμάτων
- Φορτώστε εκ νέου το παράθυρο: Ctrl+Shift+P → "Developer: Reload Window"
- Επιβεβαιώστε ότι ο διακομιστής τρέχει αυτόνομα πρώτα

---

## 3. Cursor

Το **Cursor** είναι ένας editor κώδικα με επίκεντρο την AI και ενσωματωμένη υποστήριξη MCP.

### Εγκατάσταση

1. Κατεβάστε το Cursor από [cursor.sh](https://cursor.sh)
2. Εγκαταστήστε και συνδεθείτε

### Ρύθμιση

Το Cursor χρησιμοποιεί παρόμοιο φορμάτ ρύθμισης με το Claude Desktop.

**Τοποθεσία αρχείου ρύθμισης:**
- **macOS**: `~/.cursor/mcp.json`
- **Windows**: `%USERPROFILE%\.cursor\mcp.json`
- **Linux**: `~/.cursor/mcp.json`

**Παράδειγμα ρύθμισης:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Χρήση MCP στο Cursor

1. Ανοίξτε τη συνομιλία AI του Cursor (Ctrl+L / Cmd+L)
2. Τα εργαλεία MCP εμφανίζονται αυτόματα στις προτάσεις
3. Ζητήστε από την AI να εκτελέσει εργασίες χρησιμοποιώντας τους συνδεδεμένους διακομιστές

---

## 4. Cline (Βασισμένο σε Τερματικό)

Το **Cline** είναι ένας MCP πελάτης βασισμένος σε τερματικό, ιδανικός για ροές εργασίας γραμμής εντολών.

### Εγκατάσταση

```bash
npm install -g @anthropic/cline
```

### Ρύθμιση

Το Cline χρησιμοποιεί μεταβλητές περιβάλλοντος και ορίσματα γραμμής εντολών.

**Χρήση μεταβλητών περιβάλλοντος:**

```bash
export ANTHROPIC_API_KEY="your-api-key"
export MCP_SERVER_CALCULATOR="python -m mcp_calculator_server"
```

**Χρήση ορισμάτων γραμμής εντολών:**

```bash
cline --mcp-server "calculator:python -m mcp_calculator_server" \
      --mcp-server "weather:node /path/to/weather/index.js"
```

**Αρχείο ρύθμισης** (`~/.clinerc`):

```json
{
  "apiKey": "your-api-key",
  "mcpServers": {
    "calculator": {
      "command": "python",
      "args": ["-m", "mcp_calculator_server"]
    }
  }
}
```

### Χρήση Cline

```bash
# Ξεκινήστε μια διαδραστική συνεδρία
cline

# Μοναδικό ερώτημα με MCP
cline "Calculate the square root of 144 using the calculator"

# Καταγράψτε τα διαθέσιμα εργαλεία
cline --list-tools
```

---

## 5. Windsurf

Το **Windsurf** είναι ένας ακόμη κωδικογράφος AI με υποστήριξη MCP.

### Εγκατάσταση

1. Κατεβάστε το Windsurf από [codeium.com/windsurf](https://codeium.com/windsurf)
2. Εγκαταστήστε και δημιουργήστε λογαριασμό

### Ρύθμιση

Η ρύθμιση του Windsurf διαχειρίζεται μέσω του UI των ρυθμίσεων:

1. Ανοίξτε τις Ρυθμίσεις (Ctrl+, / Cmd+,)
2. Αναζητήστε "MCP"
3. Κάντε κλικ στο "Επεξεργασία στο settings.json"

**Παράδειγμα ρύθμισης:**

```json
{
  "windsurf.mcp.servers": {
    "my-tools": {
      "command": "python",
      "args": ["/path/to/server.py"],
      "env": {}
    }
  },
  "windsurf.mcp.enabled": true
}
```

---

## Σύγκριση Τύπων Μεταφοράς

Διάφοροι οικοδεσπότες υποστηρίζουν διαφορετικούς μηχανισμούς μεταφοράς:

| Κεντρικός Φιλοξενίας | stdio | SSE/HTTP | WebSocket |
|------|-------|----------|-----------|
| Claude Desktop | ✅ | ❌ | ❌ |
| VS Code | ✅ | ✅ | ❌ |
| Cursor | ✅ | ✅ | ❌ |
| Cline | ✅ | ✅ | ❌ |
| Windsurf | ✅ | ✅ | ❌ |

**stdio** (τυπική είσοδος/έξοδος): Κατάλληλο για τοπικούς διακομιστές που ξεκινούν από τον κεντρικό
**SSE/HTTP**: Κατάλληλο για απομακρυσμένους διακομιστές ή διακομιστές που μοιράζονται πολλοί πελάτες

---

## Συχνά Προβλήματα

### Ο διακομιστής δεν ξεκινά

1. **Δοκιμάστε πρώτα τον διακομιστή χειροκίνητα:**
   ```bash
   # Για Python
   python -m your_server_module
   
   # Για Node.js
   node /path/to/server/index.js
   ```

2. **Ελέγξτε τη διαδρομή της εντολής:**
   - Χρησιμοποιήστε απόλυτες διαδρομές όπου είναι δυνατόν
   - Βεβαιωθείτε ότι το εκτελέσιμο είναι στη διαδρομή PATH σας

3. **Επιβεβαιώστε τις εξαρτήσεις:**
   ```bash
   # Πύθων
   pip list | grep mcp
   
   # Node.js
   npm list @modelcontextprotocol/sdk
   ```

### Ο διακομιστής συνδέεται αλλά τα εργαλεία δεν λειτουργούν

1. **Ελέγξτε τα αρχεία καταγραφής διακομιστή** - Οι περισσότεροι κεντρικοί υπολογιστές διαθέτουν επιλογές καταγραφής
2. **Επιβεβαιώστε την εγγραφή εργαλείων** - Χρησιμοποιήστε το MCP Inspector για δοκιμή
3. **Ελέγξτε τα δικαιώματα** - Ορισμένα εργαλεία χρειάζονται πρόσβαση σε αρχεία/δικτύο

### Οι μεταβλητές περιβάλλοντος δεν περνούν

- Ορισμένοι κεντρικοί υπολογιστές καθαρίζουν τις μεταβλητές περιβάλλοντος
- Χρησιμοποιήστε ρητά το πεδίο ρύθμισης `env`
- Αποφύγετε ευαίσθητα δεδομένα σε αρχεία ρύθμισης (χρησιμοποιήστε διαχείριση μυστικών)

---

## Καλές Πρακτικές Ασφαλείας

1. **Ποτέ μην καταχωρείτε κλειδιά API** στα αρχεία ρύθμισης
2. **Χρησιμοποιήστε μεταβλητές περιβάλλοντος** για ευαίσθητα δεδομένα
3. **Περιορίστε τα δικαιώματα διακομιστή** μόνο στα απαραίτητα
4. **Ελέγξτε τον κώδικα διακομιστή** πριν δώσετε πρόσβαση στο σύστημά σας
5. **Χρησιμοποιήστε λίστες επιτρεπόμενων** για πρόσβαση σε αρχεία και δίκτυο

---

## Τι Ακολουθεί

- [3.13 - Debugging with MCP Inspector](../13-mcp-inspector/README.md)
- [3.1 - Δημιουργία του πρώτου διακομιστή MCP](../01-first-server/README.md)
- [Module 5 - Προχωρημένα Θέματα](../../05-AdvancedTopics/README.md)

---

## Επιπρόσθετοι Πόροι

- [Τεκμηρίωση Claude Desktop MCP](https://docs.anthropic.com/en/docs/claude-desktop/mcp)
- [Επέκταση VS Code MCP](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-mcp)
- [Προδιαγραφή MCP - Μεταφορές](https://spec.modelcontextprotocol.io/specification/2025-11-25/basic/transports/)
- [Επίσημο Μητρώο Διακομιστών MCP](https://github.com/modelcontextprotocol/servers)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση Ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία αυτόματης μετάφρασης AI [Co-op Translator](https://github.com/Azure/co-op-translator). Αν και προσπαθούμε για ακρίβεια, παρακαλώ να γνωρίζετε ότι οι αυτόματες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη γλώσσα του πρέπει να θεωρείται η επίσημη πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική μετάφραση από ανθρώπινο μεταφραστή. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->