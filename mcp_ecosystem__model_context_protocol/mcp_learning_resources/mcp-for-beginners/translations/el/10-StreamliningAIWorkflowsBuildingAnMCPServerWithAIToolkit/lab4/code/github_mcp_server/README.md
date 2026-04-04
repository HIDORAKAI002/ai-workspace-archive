# Weather MCP Server

Αυτός είναι ένας δείγμα MCP Server σε Python που υλοποιεί εργαλεία καιρού με ψεύτικες απαντήσεις. Μπορεί να χρησιμοποιηθεί ως υπόβαθρο για τον δικό σας MCP Server. Περιλαμβάνει τις ακόλουθες λειτουργίες:

- **Εργαλείο Καιρού**: Ένα εργαλείο που παρέχει ψεύτικες πληροφορίες καιρού με βάση την δοθείσα τοποθεσία.
- **Εργαλείο Git Clone**: Ένα εργαλείο που κλωνοποιεί ένα αποθετήριο git σε έναν συγκεκριμένο φάκελο.
- **Εργαλείο Άνοιγμα σε VS Code**: Ένα εργαλείο που ανοίγει έναν φάκελο στο VS Code ή VS Code Insiders.
- **Σύνδεση με Agent Builder**: Μια λειτουργία που σας επιτρέπει να συνδέσετε τον MCP server με το Agent Builder για δοκιμές και debugging.
- **Debug στο [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Μια λειτουργία που σας επιτρέπει να κάνετε debugging του MCP Server χρησιμοποιώντας τον MCP Inspector.

## Ξεκινήστε με το πρότυπο Weather MCP Server

> **Προαπαιτούμενα**
>
> Για να εκτελέσετε τον MCP Server στον τοπικό σας υπολογιστή ανάπτυξης, θα χρειαστείτε:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Απαραίτητο για το εργαλείο git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) ή [VS Code Insiders](https://code.visualstudio.com/insiders/) (Απαραίτητο για το εργαλείο open_in_vscode)
> - (*Προαιρετικό - αν προτιμάτε το uv*) [uv](https://github.com/astral-sh/uv)
> - [Επέκταση Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Προετοιμασία περιβάλλοντος

Υπάρχουν δύο προσεγγίσεις για να ρυθμίσετε το περιβάλλον για αυτό το έργο. Μπορείτε να επιλέξετε οποιαδήποτε από τις δύο ανάλογα με την προτίμησή σας.

> Σημείωση: Επανεκκινήστε το VSCode ή το τερματικό για να βεβαιωθείτε ότι χρησιμοποιείται το python του εικονικού περιβάλλοντος μετά τη δημιουργία του εικονικού περιβάλλοντος.

| Προσέγγιση | Βήματα |
| -------- | ----- |
| Χρήση `uv` | 1. Δημιουργία εικονικού περιβάλλοντος: `uv venv` <br>2. Εκτέλεση της εντολής στο VSCode "***Python: Select Interpreter***" και επιλογή του python από το δημιουργημένο εικονικό περιβάλλον <br>3. Εγκατάσταση εξαρτήσεων (συμπεριλαμβανομένων των αναπτυξιακών): `uv pip install -r pyproject.toml --extra dev` |
| Χρήση `pip` | 1. Δημιουργία εικονικού περιβάλλοντος: `python -m venv .venv` <br>2. Εκτέλεση της εντολής στο VSCode "***Python: Select Interpreter***" και επιλογή του python από το δημιουργημένο εικονικό περιβάλλον<br>3. Εγκατάσταση εξαρτήσεων (συμπεριλαμβανομένων των αναπτυξιακών): `pip install -e .[dev]` |

Μετά τη ρύθμιση του περιβάλλοντος, μπορείτε να εκτελέσετε τον διακομιστή στον τοπικό σας υπολογιστή μέσω του Agent Builder ως MCP Client για να ξεκινήσετε:
1. Ανοίξτε τον πίνακα Debug στο VS Code. Επιλέξτε `Debug in Agent Builder` ή πατήστε `F5` για να ξεκινήσετε το debugging του MCP server.
2. Χρησιμοποιήστε το AI Toolkit Agent Builder για να δοκιμάσετε τον server με [αυτό το prompt](../../../../../../../../../../../open_prompt_builder). Ο server θα συνδεθεί αυτόματα στον Agent Builder.
3. Πατήστε `Run` για να δοκιμάσετε τον server με το prompt.

**Συγχαρητήρια**! Εκτελέσατε με επιτυχία τον Weather MCP Server στον τοπικό σας υπολογιστή μέσω του Agent Builder ως MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Τι περιλαμβάνεται στο πρότυπο

| Φάκελος / Αρχείο | Περιεχόμενα                                   |
| ---------------- | -------------------------------------------- |
| `.vscode`        | Αρχεία VSCode για debugging                   |
| `.aitk`          | Ρυθμίσεις για το AI Toolkit                    |
| `src`            | Ο πηγαίος κώδικας για τον weather mcp server |

## Πώς να κάνετε debugging τον Weather MCP Server

> Σημειώσεις:
> - Ο [MCP Inspector](https://github.com/modelcontextprotocol/inspector) είναι ένα οπτικό εργαλείο για προγραμματιστές για δοκιμές και debugging MCP servers.
> - Όλοι οι τρόποι debugging υποστηρίζουν σημεία διακοπής, ώστε να μπορείτε να προσθέσετε σημεία διακοπής στον κώδικα υλοποίησης των εργαλείων.

## Διαθέσιμα Εργαλεία

### Εργαλείο Καιρού
Το εργαλείο `get_weather` παρέχει ψεύτικες πληροφορίες καιρού για μια συγκεκριμένη τοποθεσία.

| Παράμετρος | Τύπος | Περιγραφή |
| ---------- | ----- | --------- |
| `location` | string | Τοποθεσία για την οποία ζητείται ο καιρός (π.χ. όνομα πόλης, πολιτεία ή συντεταγμένες) |

### Εργαλείο Git Clone
Το εργαλείο `git_clone_repo` κλωνοποιεί ένα αποθετήριο git σε έναν συγκεκριμένο φάκελο.

| Παράμετρος | Τύπος | Περιγραφή |
| ---------- | ----- | --------- |
| `repo_url` | string | Η διεύθυνση URL του αποθετηρίου git που θέλετε να κλωνοποιήσετε |
| `target_folder` | string | Η διαδρομή του φακέλου όπου θα κλωνοποιηθεί το αποθετήριο |

Το εργαλείο επιστρέφει ένα αντικείμενο JSON με:
- `success`: Boolean που δείχνει αν η λειτουργία ήταν επιτυχής
- `target_folder` ή `error`: Η διαδρομή του κλωνοποιημένου αποθετηρίου ή μήνυμα λάθους

### Εργαλείο Άνοιγμα σε VS Code
Το εργαλείο `open_in_vscode` ανοίγει φάκελο στην εφαρμογή VS Code ή VS Code Insiders.

| Παράμετρος | Τύπος | Περιγραφή |
| ---------- | ----- | --------- |
| `folder_path` | string | Η διαδρομή του φακέλου που θα ανοίξει |
| `use_insiders` | boolean (προαιρετικό) | Αν θα χρησιμοποιηθεί το VS Code Insiders αντί του κανονικού VS Code |

Το εργαλείο επιστρέφει ένα αντικείμενο JSON με:
- `success`: Boolean που δείχνει αν η λειτουργία ήταν επιτυχής
- `message` ή `error`: Μήνυμα επιβεβαίωσης ή μήνυμα λάθους

| Λειτουργία Debug | Περιγραφή | Βήματα για debugging |
| ---------------- | --------- | -------------------- |
| Agent Builder | Κάντε debugging τον MCP server στον Agent Builder μέσω AI Toolkit. | 1. Ανοίξτε τον πίνακα Debug στο VS Code. Επιλέξτε `Debug in Agent Builder` και πατήστε `F5` για να ξεκινήσετε το debugging του MCP server.<br>2. Χρησιμοποιήστε το AI Toolkit Agent Builder για να δοκιμάσετε τον server με [αυτό το prompt](../../../../../../../../../../../open_prompt_builder). Ο server θα συνδεθεί αυτόματα στον Agent Builder.<br>3. Πατήστε `Run` για να δοκιμάσετε τον server με το prompt. |
| MCP Inspector | Κάντε debugging τον MCP server χρησιμοποιώντας τον MCP Inspector. | 1. Εγκαταστήστε το [Node.js](https://nodejs.org/)<br> 2. Ρυθμίστε τον Inspector: `cd inspector` && `npm install` <br> 3. Ανοίξτε τον πίνακα Debug στο VS Code. Επιλέξτε `Debug SSE in Inspector (Edge)` ή `Debug SSE in Inspector (Chrome)`. Πατήστε F5 για να ξεκινήσει το debugging.<br> 4. Όταν ο MCP Inspector ξεκινήσει στο πρόγραμμα περιήγησης, πατήστε το κουμπί `Connect` για να συνδεθεί αυτός ο MCP server.<br> 5. Μετά μπορείτε να κάνετε `List Tools`, να επιλέξετε εργαλείο, να εισάγετε παραμέτρους και να κάνετε `Run Tool` για debugging του κώδικα του server.<br> |

## Προεπιλεγμένες θύρες και παραμετροποιήσεις

| Λειτουργία Debug | Θύρες | Ορισμοί | Παραμετροποιήσεις | Σημείωση |
| ---------------- | ----- | -------- | ----------------- | -------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Επεξεργαστείτε τα [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) για να αλλάξετε τις παραπάνω θύρες. | N/A |
| MCP Inspector | 3001 (Server); 5173 και 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Επεξεργαστείτε τα [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) για να αλλάξετε τις παραπάνω θύρες.| N/A |

## Ανατροφοδότηση

Αν έχετε παρατηρήσεις ή προτάσεις για αυτό το πρότυπο, παρακαλούμε ανοίξτε ένα issue στο [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:  
Το παρόν έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Παρόλο που καταβάλλουμε προσπάθεια για ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν σφάλματα ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η επίσημη πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->