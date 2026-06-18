# Weather MCP Server

Αυτό είναι ένα δείγμα MCP Server σε Python που υλοποιεί εργαλεία καιρού με ψεύτικες απαντήσεις. Μπορεί να χρησιμοποιηθεί ως βάση για το δικό σας MCP Server. Περιλαμβάνει τις εξής λειτουργίες:

- **Weather Tool**: Ένα εργαλείο που παρέχει ψεύτικες πληροφορίες καιρού με βάση την δεδομένη τοποθεσία.
- **Σύνδεση με Agent Builder**: Μια λειτουργία που σας επιτρέπει να συνδέσετε τον MCP server με τον Agent Builder για δοκιμή και αποσφαλμάτωση.
- **Αποσφαλμάτωση στο [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Μια λειτουργία που σας επιτρέπει να αποσφαλματώσετε τον MCP Server χρησιμοποιώντας τον MCP Inspector.

## Ξεκινώντας με το πρότυπο Weather MCP Server

> **Προαπαιτούμενα**
>
> Για να τρέξετε τον MCP Server στο τοπικό σας μηχάνημα ανάπτυξης, θα χρειαστείτε:
>
> - [Python](https://www.python.org/)
> - (*Προαιρετικό - αν προτιμάτε uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Προετοιμασία περιβάλλοντος

Υπάρχουν δύο τρόποι για να στήσετε το περιβάλλον για αυτό το έργο. Μπορείτε να επιλέξετε όποιον προτιμάτε.

> Σημείωση: Επαναφορτώστε το VSCode ή το τερματικό για να βεβαιωθείτε ότι χρησιμοποιείται η python του εικονικού περιβάλλοντος μετά τη δημιουργία του.

| Τρόπος  | Βήματα |
| -------- | ----- |
| Χρήση `uv` | 1. Δημιουργία εικονικού περιβάλλοντος: `uv venv` <br>2. Εκτελέστε την εντολή VSCode "***Python: Select Interpreter***" και επιλέξτε την python από το δημιουργημένο εικονικό περιβάλλον <br>3. Εγκαταστήστε τις εξαρτήσεις (συμπεριλαμβανομένων των εξαρτήσεων ανάπτυξης): `uv pip install -r pyproject.toml --extra dev` |
| Χρήση `pip` | 1. Δημιουργία εικονικού περιβάλλοντος: `python -m venv .venv` <br>2. Εκτελέστε την εντολή VSCode "***Python: Select Interpreter***" και επιλέξτε την python από το δημιουργημένο εικονικό περιβάλλον<br>3. Εγκαταστήστε τις εξαρτήσεις (συμπεριλαμβανομένων των εξαρτήσεων ανάπτυξης): `pip install -e .[dev]` | 

Μετά τη ρύθμιση του περιβάλλοντος, μπορείτε να τρέξετε τον server στο τοπικό σας μηχάνημα ανάπτυξης μέσω Agent Builder ως MCP Client για να ξεκινήσετε:
1. Ανοίξτε το πάνελ αποσφαλμάτωσης του VS Code. Επιλέξτε `Debug in Agent Builder` ή πατήστε `F5` για να ξεκινήσετε την αποσφαλμάτωση του MCP server.
2. Χρησιμοποιήστε το Microsoft Foundry Toolkit Agent Builder για να δοκιμάσετε τον server με [αυτήν την προτροπή](../../../../../../../../../../../open_prompt_builder). Ο server θα συνδεθεί αυτόματα με τον Agent Builder.
3. Πατήστε `Run` για να δοκιμάσετε τον server με την προτροπή.

**Συγχαρητήρια**! Έχετε τρέξει επιτυχώς τον Weather MCP Server στο τοπικό σας μηχάνημα ανάπτυξης μέσω Agent Builder ως MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Τι περιλαμβάνεται στο πρότυπο

| Φάκελος / Αρχείο | Περιεχόμενα                                |
| ------------ | -------------------------------------------- |
| `.vscode`    | Αρχεία VSCode για αποσφαλμάτωση               |
| `.aitk`      | Ρυθμίσεις για το Microsoft Foundry Toolkit                |
| `src`        | Ο πηγαίος κώδικας για τον weather mcp server   |

## Πώς να αποσφαλματώσετε τον Weather MCP Server

> Σημειώσεις:
> - Ο [MCP Inspector](https://github.com/modelcontextprotocol/inspector) είναι ένα οπτικό εργαλείο προγραμματιστή για τη δοκιμή και αποσφαλμάτωση MCP servers.
> - Όλοι οι τρόποι αποσφαλμάτωσης υποστηρίζουν σημεία διακοπής, οπότε μπορείτε να προσθέσετε σημεία διακοπής στον κώδικα υλοποίησης του εργαλείου.

| Τρόπος Αποσφαλμάτωσης | Περιγραφή | Βήματα αποσφαλμάτωσης |
| ---------- | ----------- | --------------- |
| Agent Builder | Αποσφαλμάτωση του MCP server στον Agent Builder μέσω Microsoft Foundry Toolkit. | 1. Ανοίξτε το πάνελ αποσφαλμάτωσης του VS Code. Επιλέξτε `Debug in Agent Builder` και πατήστε `F5` για να ξεκινήσετε την αποσφαλμάτωση του MCP server.<br>2. Χρησιμοποιήστε το Microsoft Foundry Toolkit Agent Builder για να δοκιμάσετε τον server με [αυτήν την προτροπή](../../../../../../../../../../../open_prompt_builder). Ο server θα συνδεθεί αυτόματα με τον Agent Builder.<br>3. Πατήστε `Run` για να δοκιμάσετε τον server με την προτροπή. |
| MCP Inspector | Αποσφαλμάτωση του MCP server χρησιμοποιώντας τον MCP Inspector. | 1. Εγκαταστήστε το [Node.js](https://nodejs.org/)<br> 2. Στήστε τον Inspector: `cd inspector` && `npm install` <br> 3. Ανοίξτε το πάνελ αποσφαλμάτωσης του VS Code. Επιλέξτε `Debug SSE in Inspector (Edge)` ή `Debug SSE in Inspector (Chrome)`. Πατήστε F5 για να ξεκινήσετε την αποσφαλμάτωση.<br> 4. Όταν ανοίξει ο MCP Inspector στον περιηγητή, πατήστε το κουμπί `Connect` για να συνδέσετε αυτόν τον MCP server.<br> 5. Στη συνέχεια μπορείτε να κάνετε `List Tools`, να επιλέξετε ένα εργαλείο, να εισάγετε παραμέτρους και να κάνετε `Run Tool` για να αποσφαλματώσετε τον κώδικα του server σας.<br> |

## Προεπιλεγμένες Θύρες και προσαρμογές

| Τρόπος Αποσφαλμάτωσης | Θύρες | Ορισμοί | Προσαρμογές | Σημείωση |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Επεξεργαστείτε τα [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) για να αλλάξετε τις παραπάνω θύρες. | Μη διαθέσιμο |
| MCP Inspector | 3001 (Server); 5173 και 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Επεξεργαστείτε τα [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) για να αλλάξετε τις παραπάνω θύρες.| Μη διαθέσιμο |

## Ανατροφοδότηση

Αν έχετε οποιαδήποτε ανατροφοδότηση ή προτάσεις για αυτό το πρότυπο, παρακαλούμε ανοίξτε ένα θέμα στο [Microsoft Foundry Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->