# Weather MCP Server

Αυτό είναι ένα δείγμα MCP Server σε Python που υλοποιεί εργαλεία καιρικών συνθηκών με προσομοιωμένες απαντήσεις. Μπορεί να χρησιμοποιηθεί ως υπόβαθρο για το δικό σας MCP Server. Περιλαμβάνει τις ακόλουθες λειτουργίες:

- **Εργαλείο Καιρού**: Ένα εργαλείο που παρέχει προσομοιωμένες πληροφορίες καιρού βάσει της δοθείσας τοποθεσίας.
- **Σύνδεση με Agent Builder**: Μια λειτουργία που σας επιτρέπει να συνδέσετε τον MCP server με το Agent Builder για δοκιμές και αποσφαλμάτωση.
- **Αποσφαλμάτωση στο [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Μια λειτουργία που σας επιτρέπει να αποσφαλματώσετε τον MCP Server χρησιμοποιώντας το MCP Inspector.

## Ξεκινώντας με το πρότυπο Weather MCP Server

> **Προαπαιτούμενα**
>
> Για να εκτελέσετε τον MCP Server στον τοπικό σας υπολογιστή ανάπτυξης, θα χρειαστείτε:
>
> - [Python](https://www.python.org/)
> - (*Προαιρετικό - αν προτιμάτε uv*) [uv](https://github.com/astral-sh/uv)
> - [Επέκταση Python Debugger](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Προετοιμασία περιβάλλοντος

Υπάρχουν δύο προσεγγίσεις για την εγκατάσταση του περιβάλλοντος για αυτό το έργο. Μπορείτε να επιλέξετε οποιαδήποτε βάση της προτίμησής σας.

> Σημείωση: Κάντε επαναφόρτωση του VSCode ή του τερματικού για να διασφαλίσετε ότι χρησιμοποιείται η python του εικονικού περιβάλλοντος αφού δημιουργήσετε το εικονικό περιβάλλον.

| Προσέγγιση | Βήματα |
| -------- | ----- |
| Χρήση `uv` | 1. Δημιουργήστε εικονικό περιβάλλον: `uv venv` <br>2. Εκτελέστε την εντολή VSCode "***Python: Select Interpreter***" και επιλέξτε την python από το δημιουργηθέν εικονικό περιβάλλον <br>3. Εγκαταστήστε τις εξαρτήσεις (συμπεριλαμβανομένων των εξαρτήσεων ανάπτυξης): `uv pip install -r pyproject.toml --extra dev` |
| Χρήση `pip` | 1. Δημιουργήστε εικονικό περιβάλλον: `python -m venv .venv` <br>2. Εκτελέστε την εντολή VSCode "***Python: Select Interpreter***" και επιλέξτε την python από το δημιουργηθέν εικονικό περιβάλλον<br>3. Εγκαταστήστε τις εξαρτήσεις (συμπεριλαμβανομένων των εξαρτήσεων ανάπτυξης): `pip install -e .[dev]` | 

Μετά τη ρύθμιση του περιβάλλοντος, μπορείτε να εκτελέσετε τον server στον τοπικό σας υπολογιστή ανάπτυξης μέσω του Agent Builder ως MCP Client για να ξεκινήσετε:
1. Ανοίξτε το πάνελ αποσφαλμάτωσης (Debug) του VS Code. Επιλέξτε `Debug in Agent Builder` ή πατήστε `F5` για να ξεκινήσετε την αποσφαλμάτωση του MCP server.
2. Χρησιμοποιήστε το AI Toolkit Agent Builder για να δοκιμάσετε τον server με [αυτό το prompt](../../../../../../../../../../../open_prompt_builder). Ο server θα συνδεθεί αυτόματα με το Agent Builder.
3. Πατήστε `Run` για να δοκιμάσετε τον server με το prompt.

**Συγχαρητήρια**! Έχετε εκτελέσει με επιτυχία τον Weather MCP Server στον τοπικό σας υπολογιστή ανάπτυξης μέσω Agent Builder ως τον MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Τι περιλαμβάνεται στο πρότυπο

| Φάκελος / Αρχείο | Περιεχόμενα                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Αρχεία VSCode για αποσφαλμάτωση                   |
| `.aitk`      | Ρυθμίσεις για το AI Toolkit                |
| `src`        | Ο πηγαίος κώδικας για τον weather MCP server   |

## Πώς να αποσφαλματώσετε τον Weather MCP Server

> Σημειώσεις:
> - Το [MCP Inspector](https://github.com/modelcontextprotocol/inspector) είναι ένα οπτικό εργαλείο για προγραμματιστές για δοκιμές και αποσφαλμάτωση MCP servers.
> - Όλοι οι τρόποι αποσφαλμάτωσης υποστηρίζουν σημεία διακοπής, έτσι μπορείτε να προσθέσετε σημεία διακοπής στον κώδικα υλοποίησης εργαλείων.

| Τρόπος Αποσφαλμάτωσης | Περιγραφή | Βήματα Αποσφαλμάτωσης |
| ---------- | ----------- | --------------- |
| Agent Builder | Αποσφαλμάτωση του MCP server στον Agent Builder μέσω AI Toolkit. | 1. Ανοίξτε το πάνελ αποσφαλμάτωσης του VS Code. Επιλέξτε `Debug in Agent Builder` και πατήστε `F5` για να ξεκινήσετε την αποσφαλμάτωση του MCP server.<br>2. Χρησιμοποιήστε το AI Toolkit Agent Builder για να δοκιμάσετε τον server με [αυτό το prompt](../../../../../../../../../../../open_prompt_builder). Ο server θα συνδεθεί αυτόματα με το Agent Builder.<br>3. Πατήστε `Run` για να δοκιμάσετε τον server με το prompt. |
| MCP Inspector | Αποσφαλμάτωση του MCP server χρησιμοποιώντας το MCP Inspector. | 1. Εγκαταστήστε το [Node.js](https://nodejs.org/)<br> 2. Ρυθμίστε το Inspector: `cd inspector` && `npm install` <br> 3. Ανοίξτε το πάνελ αποσφαλμάτωσης του VS Code. Επιλέξτε `Debug SSE in Inspector (Edge)` ή `Debug SSE in Inspector (Chrome)`. Πατήστε F5 για να ξεκινήσετε την αποσφαλμάτωση.<br> 4. Όταν το MCP Inspector ανοίξει στον περιηγητή, πατήστε το κουμπί `Connect` για να συνδέσετε αυτόν τον MCP server.<br> 5. Στη συνέχεια, μπορείτε να κάνετε `List Tools`, να επιλέξετε ένα εργαλείο, να εισάγετε παραμέτρους και να πατήσετε `Run Tool` για να αποσφαλματώσετε τον κώδικά σας.<br> |

## Προεπιλεγμένες θύρες και προσαρμογές

| Τρόπος Αποσφαλμάτωσης | Θύρες | Ορισμοί | Προσαρμογές | Σημείωση |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Επεξεργαστείτε τα [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) για να αλλάξετε τις παραπάνω θύρες. | N/A |
| MCP Inspector | 3001 (Server); 5173 και 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Επεξεργαστείτε τα [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) για να αλλάξετε τις παραπάνω θύρες. | N/A |

## Ανατροφοδότηση

Εάν έχετε οποιαδήποτε ανατροφοδότηση ή προτάσεις για αυτό το πρότυπο, παρακαλώ ανοίξτε ένα issue στο [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση Ευθυνών**:  
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία αυτόματης μετάφρασης AI [Co-op Translator](https://github.com/Azure/co-op-translator). Παρότι καταβάλλουμε προσπάθεια για ακρίβεια, παρακαλούμε να λάβετε υπόψη ότι οι αυτόματες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για σημαντικές πληροφορίες, συνιστάται επαγγελματική μετάφραση από ανθρώπινο μεταφραστή. Δεν φέρουμε καμία ευθύνη για οποιεσδήποτε παρεξηγήσεις ή λανθασμένες ερμηνείες προκύψουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->