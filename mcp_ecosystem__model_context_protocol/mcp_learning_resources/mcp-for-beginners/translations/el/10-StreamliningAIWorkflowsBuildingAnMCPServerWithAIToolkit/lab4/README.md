# 🐙 Ενότητα 4: Πρακτική Ανάπτυξη MCP - Προσαρμοσμένος Διακομιστής Κλωνοποίησης GitHub

![Duration](https://img.shields.io/badge/Duration-30_minutes-blue?style=flat-square)
![Difficulty](https://img.shields.io/badge/Difficulty-Intermediate-orange?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-Custom%20Server-purple?style=flat-square&logo=github)
![VS Code](https://img.shields.io/badge/VS%20Code-Integration-blue?style=flat-square&logo=visualstudiocode)
![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Agent%20Mode-green?style=flat-square&logo=github)

> **⚡ Γρήγορη Εκκίνηση:** Δημιουργήστε έναν παραγωγικό διακομιστή MCP που αυτοματοποιεί την κλωνοποίηση αποθετηρίων GitHub και την ενσωμάτωση με το VS Code σε μόλις 30 λεπτά!

## 🎯 Στόχοι Μάθησης

Στο τέλος αυτού του εργαστηρίου, θα μπορείτε να:

- ✅ Δημιουργήσετε έναν προσαρμοσμένο διακομιστή MCP για ρεαλιστικές ροές εργασίας ανάπτυξης
- ✅ Υλοποιήσετε δυνατότητα κλωνοποίησης αποθετηρίων GitHub μέσω MCP
- ✅ Ενσωματώσετε προσαρμοσμένους διακομιστές MCP με το VS Code και τον Agent Builder
- ✅ Χρησιμοποιήσετε τη λειτουργία Agent Mode του GitHub Copilot με προσαρμοσμένα εργαλεία MCP
- ✅ Δοκιμάσετε και αναπτύξετε προσαρμοσμένους διακομιστές MCP σε περιβάλλοντα παραγωγής

## 📋 Προαπαιτούμενα

- Ολοκλήρωση των Εργαστηρίων 1-3 (θεμελιώδεις έννοιες MCP και προηγμένη ανάπτυξη)
- Συνδρομή GitHub Copilot ([διαθέσιμη δωρεάν εγγραφή](https://github.com/github-copilot/signup))
- VS Code με το Microsoft Foundry Toolkit και επεκτάσεις GitHub Copilot
- Εγκατεστημένο και ρυθμισμένο Git CLI

## 🏗️ Επισκόπηση Έργου

### **Πραγματική Πρόκληση Ανάπτυξης**
Ως προγραμματιστές, χρησιμοποιούμε συχνά το GitHub για να κλωνοποιούμε αποθετήρια και να τα ανοίγουμε στο VS Code ή VS Code Insiders. Αυτή η χειροκίνητη διαδικασία περιλαμβάνει:
1. Άνοιγμα τερματικού/γραμμής εντολών
2. Πλοήγηση στον επιθυμητό φάκελο
3. Εκτέλεση της εντολής `git clone`
4. Άνοιγμα του VS Code στον κλωνοποιημένο φάκελο

**Η λύση MCP μας το απλοποιεί σε μια ενιαία έξυπνη εντολή!**

### **Τι θα Δημιουργήσετε**
Έναν **Διακομιστή Κλωνοποίησης GitHub MCP** (`git_mcp_server`) που παρέχει:

| Χαρακτηριστικό | Περιγραφή | Όφελος |
|---------|-------------|---------|
| 🔄 **Έξυπνη Κλωνοποίηση Αποθετηρίων** | Κλωνοποίηση αποθετηρίων GitHub με επικύρωση | Αυτοματοποιημένος έλεγχος σφαλμάτων |
| 📁 **Έξυπνη Διαχείριση Καταλόγων** | Έλεγχος και ασφαλής δημιουργία φακέλων | Αποφυγή αντικατάστασης |
| 🚀 **Πλατφόρμα-ανεξάρτητη Ενσωμάτωση VS Code** | Άνοιγμα έργων σε VS Code/Insiders | Αδιάκοπη ροή εργασίας |
| 🛡️ **Αξιόπιστη Διαχείριση Σφαλμάτων** | Αντιμετώπιση δικτύου, δικαιωμάτων και θεμάτων διαδρομών | Αξιοπιστία παραγωγικού συστήματος |

---

## 📖 Βήμα-βήμα Υλοποίηση

### Βήμα 1: Δημιουργία GitHub Agent στον Agent Builder

1. **Έναρξη Agent Builder** μέσω της επέκτασης Microsoft Foundry Toolkit
2. **Δημιουργία νέου agent** με την ακόλουθη ρύθμιση:
   ```
   Agent Name: GitHubAgent
   ```

3. **Αρχικοποίηση προσαρμοσμένου διακομιστή MCP:**
   - Μεταβείτε σε **Tools** → **Add Tool** → **MCP Server**
   - Επιλέξτε **"Create A new MCP Server"**
   - Επιλέξτε **Python template** για μέγιστη ευελιξία
   - **Όνομα Διακομιστή:** `git_mcp_server`

### Βήμα 2: Ρύθμιση GitHub Copilot Agent Mode

1. **Ανοίξτε το GitHub Copilot** στο VS Code (Ctrl/Cmd + Shift + P → "GitHub Copilot: Open")
2. **Επιλέξτε το Agent Model** στη διεπαφή του Copilot
3. **Επιλέξτε το μοντέλο Claude 3.7** για αυξημένες ικανότητες συλλογισμού
4. **Ενεργοποιήστε την ενσωμάτωση MCP** για πρόσβαση στα εργαλεία

> **💡 Επαγγελματική Συμβουλή:** Το Claude 3.7 παρέχει ανώτερη κατανόηση των ροών εργασίας ανάπτυξης και προτύπων διαχείρισης σφαλμάτων.

### Βήμα 3: Υλοποίηση Κύριας Λειτουργικότητας Διακομιστή MCP

**Χρησιμοποιήστε την παρακάτω αναλυτική προτροπή με το GitHub Copilot Agent Mode:**

```
Create two MCP tools with the following comprehensive requirements:

🔧 TOOL A: clone_repository
Requirements:
- Clone any GitHub repository to a specified local folder
- Return the absolute path of the successfully cloned project
- Implement comprehensive validation:
  ✓ Check if target directory already exists (return error if exists)
  ✓ Validate GitHub URL format (https://github.com/user/repo)
  ✓ Verify git command availability (prompt installation if missing)
  ✓ Handle network connectivity issues
  ✓ Provide clear error messages for all failure scenarios

🚀 TOOL B: open_in_vscode
Requirements:
- Open specified folder in VS Code or VS Code Insiders
- Cross-platform compatibility (Windows/Linux/macOS)
- Use direct application launch (not terminal commands)
- Auto-detect available VS Code installations
- Handle cases where VS Code is not installed
- Provide user-friendly error messages

Additional Requirements:
- Follow MCP 1.9.3 best practices
- Include proper type hints and documentation
- Implement logging for debugging purposes
- Add input validation for all parameters
- Include comprehensive error handling
```

### Βήμα 4: Δοκιμή Διακομιστή MCP

#### 4α. Δοκιμή στον Agent Builder

1. **Εκκινήστε τη ρύθμιση αποσφαλμάτωσης** για τον Agent Builder
2. **Ρυθμίστε τον agent σας με την εξής συστηματική προτροπή:**

```
SYSTEM_PROMPT:
You are my intelligent coding repository assistant. You help developers efficiently clone GitHub repositories and set up their development environment. Always provide clear feedback about operations and handle errors gracefully.
```

3. **Δοκιμάστε με ρεαλιστικά σενάρια χρήστη:**

```
USER_PROMPT EXAMPLES:

Scenario : Basic Clone and Open
"Clone {Your GitHub Repo link such as https://github.com/kinfey/GHCAgentWorkshop
 } and save to {The global path you specify}, then open it with VS Code Insiders"
```

![Agent Builder Testing](../../../../translated_images/el/DebugAgent.81d152370c503241.webp)

**Αναμενόμενα Αποτελέσματα:**
- ✅ Επιτυχής κλωνοποίηση με επιβεβαίωση διαδρομής
- ✅ Αυτόματη εκκίνηση του VS Code
- ✅ Καθαρά μηνύματα σφάλματος για μη έγκυρα σενάρια
- ✅ Σωστή διαχείριση ακριανών περιπτώσεων

#### 4β. Δοκιμή στον MCP Inspector

![MCP Inspector Testing](../../../../translated_images/el/DebugInspector.eb5c95f94c69a8ba.webp)

---



**🎉 Συγχαρητήρια!** Δημιουργήσατε με επιτυχία έναν πρακτικό, παραγωγικό διακομιστή MCP που επιλύει πραγματικές προκλήσεις ροών εργασίας ανάπτυξης. Ο προσαρμοσμένος διακομιστής κλωνοποίησης GitHub αποδεικνύει τη δύναμη του MCP στην αυτοματοποίηση και βελτίωση της παραγωγικότητας των προγραμματιστών.

### 🏆 Κατορθώματα:
- ✅ **MCP Developer** - Δημιουργία προσαρμοσμένου διακομιστή MCP
- ✅ **Workflow Automator** - Απλοποίηση διαδικασιών ανάπτυξης  
- ✅ **Integration Expert** - Σύνδεση πολλαπλών εργαλείων ανάπτυξης
- ✅ **Έτοιμος για Παραγωγή** - Δημιουργία λύσεων για ανάπτυξη

---

## 🎓 Ολοκλήρωση Εργαστηρίου: Το Ταξίδι σας με το Model Context Protocol

**Αγαπητέ συμμετέχοντα στο εργαστήριο,**

Συγχαρητήρια για την ολοκλήρωση και των τεσσάρων ενοτήτων του εργαστηρίου Model Context Protocol! Έχετε προχωρήσει από την κατανόηση βασικών εννοιών του Microsoft Foundry Toolkit μέχρι τη δημιουργία παραγωγικών διακομιστών MCP που επιλύουν πραγματικές προκλήσεις ανάπτυξης.

### 🚀 Ανακεφαλαίωση της Διαδρομής Μάθησής σας:

**[Ενότητα 1](../lab1/README.md)**: Ξεκινήσατε εξερευνώντας τις θεμελιώδεις έννοιες του Microsoft Foundry Toolkit, τη δοκιμή μοντέλων και τη δημιουργία του πρώτου AI agent.

**[Ενότητα 2](../lab2/README.md)**: Μάθατε την αρχιτεκτονική MCP, ενσωματώσατε το Playwright MCP και δημιουργήσατε τον πρώτο agent αυτοματισμού φυλλομετρητή.

**[Ενότητα 3](../lab3/README.md)**: Προχωρήσατε στην ανάπτυξη προσαρμοσμένου διακομιστή MCP με τον Weather MCP server και κατακτήσατε εργαλεία αποσφαλμάτωσης.

**[Ενότητα 4](../lab4/README.md)**: Εφαρμόσατε όλα όσα μάθατε για να δημιουργήσετε ένα πρακτικό εργαλείο αυτοματισμού ροής εργασίας GitHub.

### 🌟 Τι Έχετε Κατακτήσει:

- ✅ **Οικοσύστημα Microsoft Foundry Toolkit**: Μοντέλα, agents και πρότυπα ενσωμάτωσης
- ✅ **Αρχιτεκτονική MCP**: Σχεδιασμός πελάτη-διακομιστή, πρωτόκολλα μεταφοράς και ασφάλεια
- ✅ **Εργαλεία Ανάπτυξης**: Από το Playground έως τον Inspector και στην παραγωγή
- ✅ **Προσαρμοσμένη Ανάπτυξη**: Δημιουργία, δοκιμή και ανάπτυξη δικών σας διακομιστών MCP
- ✅ **Πρακτικές Εφαρμογές**: Επίλυση πραγματικών προκλήσεων ροών εργασίας με AI

### 🔮 Τα Επόμενα Βήματά Σας:

1. **Δημιουργήστε τον δικό σας διακομιστή MCP**: Εφαρμόστε αυτές τις δεξιότητες για να αυτοματοποιήσετε τις μοναδικές ροές εργασίας σας  
2. **Γίνετε μέλος της κοινότητας MCP**: Μοιραστείτε τις δημιουργίες σας και μάθετε από άλλους  
3. **Εξερευνήστε προχωρημένες ενσωματώσεις**: Συνδέστε διακομιστές MCP με συστήματα επιχειρήσεων  
4. **Συμβάλλετε στο Ανοικτό Λογισμικό**: Βοηθήστε στη βελτίωση εργαλείων και τεκμηρίωσης MCP

Να θυμάστε, αυτό το εργαστήριο είναι μόνο η αρχή. Το οικοσύστημα Model Context Protocol εξελίσσεται ταχύτατα και τώρα είστε εξοπλισμένοι για να βρίσκεστε στην αιχμή των εργαλείων ανάπτυξης τροφοδοτούμενων από AI.

**Σας ευχαριστούμε για τη συμμετοχή και την αφοσίωση στη μάθηση!**

Ελπίζουμε το εργαστήριο να έχει πυροδοτήσει ιδέες που θα μεταμορφώσουν τον τρόπο που δημιουργείτε και αλληλεπιδράτε με εργαλεία AI στο ταξίδι ανάπτυξής σας.

**Καλή κωδικοποίηση!**

---

## Τι Ακολουθεί

Συγχαρητήρια για την ολοκλήρωση όλων των εργαστηρίων της Ενότητας 10!

- Επιστροφή στο: [Επισκόπηση Ενότητας 10](../README.md)
- Συνεχίστε στο: [Ενότητα 11: Εργαστήρια MCP Server Hands-On](../../11-MCPServerHandsOnLabs/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->