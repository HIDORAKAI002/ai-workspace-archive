# Ρύθμιση Μαθήματος

## Εισαγωγή

Αυτό το μάθημα θα καλύψει πώς να εκτελείτε τα δείγματα κώδικα αυτού του μαθήματος.

## Συμμετοχή με άλλους μαθητές και λήψη βοήθειας

Πριν ξεκινήσετε να κλωνοποιείτε το αποθετήριο σας, εγγραφείτε στο [κανάλι Discord AI Agents For Beginners](https://aka.ms/ai-agents/discord) για να λάβετε οποιαδήποτε βοήθεια σχετικά με τη ρύθμιση, ερωτήσεις για το μάθημα, ή για να συνδεθείτε με άλλους μαθητές.

## Κλωνοποίηση ή Fork αυτού του αποθετηρίου

Για να ξεκινήσετε, παρακαλώ κλωνοποιήστε ή κάντε fork το αποθετήριο GitHub. Αυτό θα δημιουργήσει τη δική σας έκδοση του περιεχομένου του μαθήματος ώστε να μπορείτε να εκτελείτε, να δοκιμάζετε και να τροποποιείτε τον κώδικα!

Αυτό μπορεί να γίνει κάνοντας κλικ στο σύνδεσμο για <a href="https://github.com/microsoft/ai-agents-for-beginners/fork" target="_blank">να κάνετε fork το αποθετήριο</a>

Πλέον θα πρέπει να έχετε τη δική σας διακλαδωμένη έκδοση αυτού του μαθήματος στο παρακάτω σύνδεσμο:

![Forked Repo](../../../translated_images/el/forked-repo.33f27ca1901baa6a.webp)

### Ρηχή κλωνοποίηση (συνιστάται για εργαστήρια / Codespaces)

  >Ολόκληρο το αποθετήριο μπορεί να είναι μεγάλο (~3 GB) όταν κατεβάζετε ολόκληρο το ιστορικό και όλα τα αρχεία. Αν παρακολουθείτε μόνο το εργαστήριο ή χρειάζεστε μόνο μερικούς φακέλους μαθημάτων, μια ρηχή κλωνοποίηση (ή σπαρτική κλωνοποίηση) αποφεύγει το μεγαλύτερο μέρος αυτής της λήψης περικόπτοντας το ιστορικό και/ή παραλείποντας blobs.

#### Γρήγορη ρηχή κλωνοποίηση — ελάχιστο ιστορικό, όλα τα αρχεία

Αντικαταστήστε το `<your-username>` στις εντολές παρακάτω με το URL του fork σας (ή το URL upstream αν προτιμάτε).

Για να κλωνοποιήσετε μόνο την πιο πρόσφατη ιστορία commit (μικρή λήψη):

```bash|powershell
git clone --depth 1 https://github.com/<your-username>/ai-agents-for-beginners.git
```

Για να κλωνοποιήσετε ένα συγκεκριμένο κλαδί:

```bash|powershell
git clone --depth 1 --branch <branch-name> https://github.com/<your-username>/ai-agents-for-beginners.git
```

#### Μερική (σπαρτική) κλωνοποίηση — ελάχιστα blobs + μόνο επιλεγμένοι φάκελοι

Αυτό χρησιμοποιεί μερική κλωνοποίηση και sparse-checkout (απαιτεί Git 2.25+ και συνιστάται μοντέρνο Git με υποστήριξη μερικής κλωνοποίησης):

```bash|powershell
git clone --depth 1 --filter=blob:none --sparse https://github.com/<your-username>/ai-agents-for-beginners.git
```

Πλοηγηθείτε μέσα στο φάκελο του αποθετηρίου:

```bash|powershell
cd ai-agents-for-beginners
```

Στη συνέχεια καθορίστε ποιοι φάκελοι θέλετε (παράδειγμα παρακάτω δείχνει δύο φακέλους):

```bash|powershell
git sparse-checkout set 00-course-setup 01-intro-to-ai-agents
```

Μετά την κλωνοποίηση και την επαλήθευση των αρχείων, αν χρειάζεστε μόνο αρχεία και θέλετε να απελευθερώσετε χώρο (χωρίς ιστορικό git), παρακαλώ διαγράψτε τα μεταδεδομένα του αποθετηρίου (💀ανεπίστρεπτο — θα χάσετε όλη τη λειτουργικότητα του Git: χωρίς commits, pulls, pushes ή πρόσβαση στο ιστορικό).

```bash
# zsh/bash
rm -rf .git
```

```powershell
# PowerShell
Remove-Item -Recurse -Force .git
```

#### Χρήση GitHub Codespaces (συνιστάται για αποφυγή τοπικών μεγάλων λήψεων)

- Δημιουργήστε ένα νέο Codespace για αυτό το αποθετήριο μέσω της [GitHub UI](https://github.com/codespaces).  

- Στο τερματικό του νεοδημιουργημένου codespace, εκτελέστε μία από τις εντολές ρηχής/σπαρτικής κλωνοποίησης παραπάνω για να φέρετε μόνο τους φακέλους μαθημάτων που χρειάζεστε στον χώρο εργασίας Codespace.
- Προαιρετικά: μετά την κλωνοποίηση μέσα στο Codespaces, αφαιρέστε το .git για να επαναφέρετε επιπλέον χώρο (δείτε τις εντολές απομάκρυνσης παραπάνω).
- Σημείωση: Αν προτιμάτε να ανοίξετε το αποθετήριο απευθείας στο Codespaces (χωρίς επιπλέον κλωνοποίηση), λάβετε υπόψη ότι το Codespaces θα κατασκευάσει το περιβάλλον devcontainer και μπορεί ακόμα να προμηθεύσει περισσότερα απ’ όσα χρειάζεστε. Η ρηχή κλωνοποίηση μέσα σε ένα νέο Codespace σας δίνει πιο μεγάλο έλεγχο στη χρήση δίσκου.

#### Συμβουλές

- Πάντα αντικαθιστάτε το URL κλωνοποίησης με το fork σας αν θέλετε να επεξεργαστείτε/υποβάλετε αλλαγές.
- Αν αργότερα χρειαστείτε περισσότερο ιστορικό ή αρχεία, μπορείτε να τα κατεβάσετε ή να ρυθμίσετε το sparse-checkout ώστε να συμπεριλάβετε επιπλέον φακέλους.

## Εκτέλεση του Κώδικα

Αυτό το μάθημα προσφέρει μια σειρά από Jupyter Notebooks που μπορείτε να εκτελέσετε για να αποκτήσετε πρακτική εμπειρία στην κατασκευή AI Agents.

Τα δείγματα κώδικα χρησιμοποιούν το **Microsoft Agent Framework (MAF)** με τον `FoundryChatClient`, που συνδέεται με την **Microsoft Foundry Agent Service V2** (το Responses API) μέσω της **Microsoft Foundry**.

Όλα τα Python notebooks φέρουν την ετικέτα `*-python-agent-framework.ipynb`.

## Απαιτήσεις

- Python 3.12+
  - **ΣΗΜΕΙΩΣΗ**: Αν δεν έχετε εγκαταστήσει το Python3.12, βεβαιωθείτε ότι το εγκαθιστάτε. Έπειτα δημιουργήστε το venv σας χρησιμοποιώντας python3.12 για να βεβαιωθείτε ότι οι σωστές εκδόσεις εγκαθίστανται από το αρχείο requirements.txt.
  
    >Παράδειγμα

    Δημιουργία καταλόγου εικονικού περιβάλλοντος Python:

    ```bash|powershell
    python -m venv venv
    ```

    Έπειτα ενεργοποιήστε το περιβάλλον venv για:

    ```bash
    # zsh/bash
    source venv/bin/activate
    ```
  
    ```dos
    # Command Prompt for Windows
    venv\Scripts\activate
    ```

- .NET 10+: Για τα δείγματα κώδικα που χρησιμοποιούν .NET, βεβαιωθείτε ότι εγκαθιστάτε το [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) ή νεότερο. Έπειτα, ελέγξτε την εγκατεστημένη έκδοση SDK .NET:

    ```bash|powershell
    dotnet --list-sdks
    ```

- **Azure CLI** — Απαιτείται για αυθεντικοποίηση. Εγκαταστήστε από [aka.ms/installazurecli](https://aka.ms/installazurecli).
- **Azure Subscription** — Για πρόσβαση στην Microsoft Foundry και την Microsoft Foundry Agent Service.
- **Microsoft Foundry Project** — Ένα έργο με αναπτυγμένο μοντέλο (π.χ., `gpt-4.1-mini`). Δείτε [Βήμα 1](#βήμα-1-δημιουργία-έργου-microsoft-foundry) παρακάτω.

Έχουμε συμπεριλάβει ένα αρχείο `requirements.txt` στη ρίζα αυτού του αποθετηρίου που περιέχει όλα τα απαραίτητα πακέτα Python για να εκτελέσετε τα δείγματα κώδικα.

Μπορείτε να τα εγκαταστήσετε τρέχοντας την ακόλουθη εντολή στο τερματικό σας στη ρίζα του αποθετηρίου:

```bash|powershell
pip install -r requirements.txt
```

Συνιστούμε να δημιουργήσετε ένα εικονικό περιβάλλον Python για να αποφύγετε συγκρούσεις και προβλήματα.

## Ρύθμιση VSCode

Βεβαιωθείτε ότι χρησιμοποιείτε τη σωστή έκδοση Python στο VSCode.

![image](https://github.com/user-attachments/assets/a85e776c-2edb-4331-ae5b-6bfdfb98ee0e)

## Ρύθμιση Microsoft Foundry και Microsoft Foundry Agent Service

### Βήμα 1: Δημιουργία έργου Microsoft Foundry

Χρειάζεστε ένα Microsoft Foundry **hub** και **project** με αναπτυγμένο μοντέλο για να εκτελέσετε τα notebooks.

1. Μεταβείτε στο [ai.azure.com](https://ai.azure.com) και συνδεθείτε με το λογαριασμό σας Azure.
2. Δημιουργήστε ένα **hub** (ή χρησιμοποιήστε ένα υπάρχον). Δείτε: [Επισκόπηση πόρων Hub](https://learn.microsoft.com/azure/ai-foundry/concepts/ai-resources).
3. Μέσα στο hub, δημιουργήστε ένα **project**.
4. Αναπτύξτε ένα μοντέλο (π.χ., `gpt-4.1-mini`) από **Models + Endpoints** → **Deploy model**.

### Βήμα 2: Ανάκτηση τελικού σημείου έργου και ονόματος ανάπτυξης μοντέλου

Από το έργο σας στην πύλη Microsoft Foundry:

- **Τελικό Σημείο Έργου** — Μεταβείτε στη σελίδα **Overview** και αντιγράψτε το URL τελικού σημείου.

![Project Connection String](../../../translated_images/el/project-endpoint.8cf04c9975bbfbf1.webp)

- **Όνομα Ανάπτυξης Μοντέλου** — Μεταβείτε στα **Models + Endpoints**, επιλέξτε το αναπτυγμένο μοντέλο σας, και σημειώστε το **Deployment name** (π.χ., `gpt-4.1-mini`).

### Βήμα 3: Σύνδεση στο Azure με το `az login`

Όλα τα notebooks χρησιμοποιούν **`AzureCliCredential`** για αυθεντικοποίηση — δεν χρειάζονται κλειδιά API για διαχείριση. Αυτό απαιτεί να έχετε συνδεθεί μέσω της CLI του Azure.

1. **Εγκαταστήστε την Azure CLI** αν δεν το έχετε ήδη κάνει: [aka.ms/installazurecli](https://aka.ms/installazurecli)

2. **Συνδεθείτε** εκτελώντας:

    ```bash|powershell
    az login
    ```

    Ή αν βρίσκεστε σε περιβάλλον απομακρυσμένο/Codespace χωρίς πρόγραμμα περιήγησης:

    ```bash|powershell
    az login --use-device-code
    ```

3. **Επιλέξτε τη συνδρομή σας** αν σας ζητηθεί — επιλέξτε αυτή που περιέχει το έργο Foundry σας.

4. **Επαληθεύστε** ότι έχετε συνδεθεί:

    ```bash|powershell
    az account show
    ```

> **Γιατί `az login`;** Τα notebooks αυθεντικοποιούνται χρησιμοποιώντας `AzureCliCredential` από το πακέτο `azure-identity`. Αυτό σημαίνει ότι η συνεδρία Azure CLI παρέχει τα διαπιστευτήρια — δεν αποθηκεύονται κλειδιά API ή μυστικά στο αρχείο `.env` σας. Αυτή είναι μια [καλύτερη πρακτική ασφαλείας](https://learn.microsoft.com/azure/developer/ai/keyless-connections).

### Βήμα 4: Δημιουργία αρχείου `.env`

Αντιγράψτε το δείγμα αρχείο:

```bash
# zsh/bash
cp .env.example .env
```

```powershell
# PowerShell
Copy-Item .env.example .env
```

Ανοίξτε το `.env` και συμπληρώστε αυτές τις δύο τιμές:

```env
AZURE_AI_PROJECT_ENDPOINT=https://<your-project>.services.ai.azure.com/api/projects/<your-project-id>
AZURE_AI_MODEL_DEPLOYMENT_NAME=gpt-4.1-mini
```

| Μεταβλητή | Πού τη βρίσκετε |
|----------|-----------------|
| `AZURE_AI_PROJECT_ENDPOINT` | πύλη Foundry → το έργο σας → σελίδα **Overview** |
| `AZURE_AI_MODEL_DEPLOYMENT_NAME` | πύλη Foundry → **Models + Endpoints** → όνομα αναπτυγμένου μοντέλου |

Αυτό είναι για τα περισσότερα μαθήματα! Τα notebooks θα αυθεντικοποιηθούν αυτόματα μέσω της συνεδρίας `az login` σας.

### Βήμα 5: Εγκαταστήστε τις Python Εξαρτήσεις

```bash|powershell
pip install -r requirements.txt
```

Συνιστούμε να τρέξετε αυτό μέσα στο εικονικό περιβάλλον που δημιουργήσατε νωρίτερα.

## Πρόσθετη Ρύθμιση για το Μάθημα 5 (Agentic RAG)

Το μάθημα 5 χρησιμοποιεί **Azure AI Search** για ανακτηση-ενισχυμένη γενιά. Αν σκοπεύετε να εκτελέσετε αυτό το μάθημα, προσθέστε αυτές τις μεταβλητές στο αρχείο `.env` σας:

| Μεταβλητή | Πού τη βρίσκετε |
|----------|-----------------|
| `AZURE_SEARCH_SERVICE_ENDPOINT` | πύλη Azure → πόρος **Azure AI Search** → **Overview** → URL |
| `AZURE_SEARCH_API_KEY` | πύλη Azure → πόρος **Azure AI Search** → **Settings** → **Keys** → κύριο διαχειριστικό κλειδί |

## Πρόσθετη Ρύθμιση για Μαθήματα που Καλούν Azure OpenAI Άμεσα (Μαθήματα 6 και 8)

Μερικά notebooks στα μαθήματα 6 και 8 καλούν **Azure OpenAI** απευθείας (χρησιμοποιώντας το **Responses API**) αντί να περνούν από έργο Microsoft Foundry. Αυτά τα δείγματα χρησιμοποιούσαν προηγουμένως GitHub Models, που είναι απαρχαιωμένα (θα αποσυρθούν τον Ιούλιο του 2026) και δεν υποστηρίζουν το Responses API. Αν σκοπεύετε να εκτελέσετε αυτά τα δείγματα, προσθέστε αυτές τις μεταβλητές στο αρχείο `.env` σας:

| Μεταβλητή | Πού τη βρίσκετε |
|----------|-----------------|
| `AZURE_OPENAI_ENDPOINT` | πύλη Azure → πόρος **Azure OpenAI** → **Keys and Endpoint** → Endpoint (π.χ. `https://<your-resource>.openai.azure.com`) |
| `AZURE_OPENAI_DEPLOYMENT` | Όνομα του αναπτυγμένου μοντέλου σας (π.χ. `gpt-4.1-mini`) που υποστηρίζει το Responses API |
| `AZURE_OPENAI_API_KEY` | Προαιρετικό — μόνο αν χρησιμοποιείτε αυθεντικοποίηση με κλειδί αντί για `az login` / Entra ID |

> Το Responses API χρησιμοποιεί το σταθερό τελικό σημείο `/openai/v1/`, οπότε δεν απαιτείται `api-version`. Συνδεθείτε με `az login` για να χρησιμοποιήσετε αυθεντικοποίηση Entra ID χωρίς κλειδί.

## Εναλλακτικός Πάροχος: MiniMax (Συμβατό με OpenAI)

[MiniMax](https://platform.minimaxi.com/) παρέχει μοντέλα μεγάλης μνήμης συμφραζομένων (έως 204K tokens) μέσω ενός OpenAI-συμβατού API. Εφόσον ο `OpenAIChatClient` του Microsoft Agent Framework λειτουργεί με οποιοδήποτε OpenAI-συμβατό τελικό σημείο, μπορείτε να χρησιμοποιήσετε το MiniMax ως άμεση εναλλακτική του Azure OpenAI ή OpenAI.

Προσθέστε αυτές τις μεταβλητές στο αρχείο `.env` σας:

| Μεταβλητή | Πού τη βρίσκετε |
|----------|-----------------|
| `MINIMAX_API_KEY` | [Πλατφόρμα MiniMax](https://platform.minimaxi.com/) → Κλειδιά API |
| `MINIMAX_BASE_URL` | Χρησιμοποιήστε `https://api.minimax.io/v1` (προεπιλεγμένη τιμή) |
| `MINIMAX_MODEL_ID` | Όνομα μοντέλου για χρήση (π.χ., `MiniMax-M3`) |

**Παραδείγματα μοντέλων**: `MiniMax-M3` (συνιστώμενο), `MiniMax-M2.7`, `MiniMax-M2.7-highspeed` (γρηγορότερες απαντήσεις). Τα ονόματα μοντέλων και η διαθεσιμότητα μπορούν να αλλάξουν με τον χρόνο, και η πρόσβαση σε συγκεκριμένο μοντέλο μπορεί να εξαρτάται από το λογαριασμό ή την περιοχή σας — ελέγξτε την [Πλατφόρμα MiniMax](https://platform.minimaxi.com/) για τη τρέχουσα λίστα. Αν το `MiniMax-M3` δεν είναι διαθέσιμο στο λογαριασμό σας, ορίστε το `MINIMAX_MODEL_ID` σε μοντέλο στο οποίο έχετε πρόσβαση (π.χ. `MiniMax-M2.7`).

Τα δείγματα κώδικα που χρησιμοποιούν `OpenAIChatClient` (π.χ. ροή εργασίας κράτησης ξενοδοχείου στο Μάθημα 14) θα εντοπίζουν και θα χρησιμοποιούν αυτόματα τη ρύθμιση MiniMax όταν το `MINIMAX_API_KEY` έχει οριστεί.

## Εναλλακτικός Πάροχος: Foundry Local (Εκτέλεση μοντέλων στη συσκευή)

[Foundry Local](https://foundrylocal.ai) είναι ένα ελαφρύ runtime που κατεβάζει, διαχειρίζεται και εξυπηρετεί γλωσσικά μοντέλα **αποκλειστικά στον δικό σας υπολογιστή** μέσω ενός OpenAI-συμβατού API — χωρίς σύννεφο, χωρίς συνδρομή Azure, και χωρίς κλειδιά API. Είναι ιδανική επιλογή για ανάπτυξη χωρίς σύνδεση στο διαδίκτυο, πειραματισμούς χωρίς κόστος σύννεφου, ή για διατήρηση των δεδομένων στη συσκευή.

Επειδή ο `OpenAIChatClient` του Microsoft Agent Framework λειτουργεί με οποιοδήποτε OpenAI-συμβατό τελικό σημείο, το Foundry Local είναι μια άμεση τοπική εναλλακτική του Azure OpenAI.

**1. Εγκαταστήστε το Foundry Local**

```bash
# Windows
winget install Microsoft.FoundryLocal

# macOS
brew install foundrylocal
```

**2. Κατεβάστε και τρέξτε ένα μοντέλο** (αυτό επίσης ξεκινά την τοπική υπηρεσία):

```bash
foundry model list          # δες διαθέσιμα μοντέλα
foundry model run phi-4-mini
```

**3. Εγκαταστήστε το Python SDK** που χρησιμοποιείται για να ανακαλύψει το τοπικό τελικό σημείο:

```bash
pip install foundry-local-sdk
```

**4. Καθορίστε το Microsoft Agent Framework για το τοπικό μοντέλο σας:**

```python
from foundry_local import FoundryLocalManager
from agent_framework.openai import OpenAIChatClient

# Κατεβάζει (αν χρειάζεται) και εξυπηρετεί το μοντέλο τοπικά, στη συνέχεια εντοπίζει το τερματικό σημείο/θύρα.
manager = FoundryLocalManager("phi-4-mini")

chat_client = OpenAIChatClient(
    base_url=manager.endpoint,      # π.χ. http://localhost:<port>/v1
    api_key=manager.api_key,        # πάντα "μη απαιτούμενο" για το Foundry Local
    model_id=manager.get_model_info("phi-4-mini").id,
)

agent = chat_client.as_agent(
    name="LocalAgent",
    instructions="You are a helpful assistant running fully on-device.",
)
```

> **Σημείωση:** Το Foundry Local εκθέτει ένα OpenAI-συμβατό τελικό σημείο **Chat Completions**. Χρησιμοποιήστε το για τοπική ανάπτυξη και σενάρια χωρίς σύνδεση. Για το πλήρες σύνολο λειτουργιών **Responses API** (καταστάσεις συνομιλιών, βαθιά ορχήστρωση εργαλείων, και ανάπτυξη τύπου agent), στοχεύστε στο **Azure OpenAI** ή σε project **Microsoft Foundry** όπως φαίνεται στα μαθήματα. Δείτε την [τεκμηρίωση Foundry Local](https://foundrylocal.ai) για τον τρέχοντα κατάλογο μοντέλων και υποστήριξη πλατφόρμας.


## Πρόσθετη Ρύθμιση για το Μάθημα 8 (Ροή Εργασίας Bing Grounding)

Το notebook με ροή εργασίας υπό συνθήκη στο μάθημα 8 χρησιμοποιεί **Bing grounding** μέσω Microsoft Foundry. Αν σκοπεύετε να τρέξετε αυτό το παράδειγμα, προσθέστε αυτήν τη μεταβλητή στο αρχείο `.env` σας:

| Μεταβλητή | Πού να την βρείτε |
|----------|-----------------|
| `BING_CONNECTION_ID` | Πύλη Microsoft Foundry → το έργο σας → **Διαχείριση** → **Συνδεδεμένοι πόροι** → η σύνδεση Bing σας → αντιγράψτε το ID σύνδεσης |

## Αντιμετώπιση Προβλημάτων

### Σφάλματα Επαλήθευσης Πιστοποιητικού SSL σε macOS

Αν βρίσκεστε σε macOS και αντιμετωπίσετε σφάλμα όπως:

```plaintext
ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self-signed certificate in certificate chain
```

Αυτό είναι ένα γνωστό πρόβλημα με την Python σε macOS όπου τα πιστοποιητικά SSL του συστήματος δεν εμπιστεύονται αυτόματα. Δοκιμάστε τις ακόλουθες λύσεις με τη σειρά:

**Επιλογή 1: Τρέξτε το script Install Certificates της Python (συνιστάται)**

```bash
# Αντικαταστήστε το 3.XX με την εγκατεστημένη έκδοση Python σας (π.χ., 3.12 ή 3.13):
/Applications/Python\ 3.XX/Install\ Certificates.command
```

**Επιλογή 2: Χρησιμοποιήστε `connection_verify=False` στο notebook σας (μόνο για notebooks GitHub Models)**

Στο notebook του Μάθημα 6 (`06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb`), υπάρχει ήδη μια σχολιασμένη λύση. Ξεσχολιάστε το `connection_verify=False` όταν δημιουργείτε τον πελάτη:

```python
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
    connection_verify=False,  # Απενεργοποιήστε την επαλήθευση SSL αν αντιμετωπίσετε σφάλματα πιστοποιητικού
)
```

> **⚠️ Προειδοποίηση:** Η απενεργοποίηση της επαλήθευσης SSL (`connection_verify=False`) μειώνει την ασφάλεια παρακάμπτοντας την επαλήθευση πιστοποιητικών. Χρησιμοποιήστε το μόνο ως προσωρινή λύση σε περιβάλλοντα ανάπτυξης, ποτέ σε παραγωγή.

**Επιλογή 3: Εγκαταστήστε και χρησιμοποιήστε το `truststore`**

```bash
pip install truststore
```

Στη συνέχεια προσθέστε το παρακάτω στην αρχή του notebook ή του script σας πριν κάνετε οποιεσδήποτε κλήσεις δικτύου:

```python
import truststore
truststore.inject_into_ssl()
```

## Κόλλησες Κάπου;

Αν έχετε οποιοδήποτε πρόβλημα με αυτή τη ρύθμιση, επισκεφτείτε το <a href="https://discord.gg/kzRShWzttr" target="_blank">Azure AI Community Discord</a> ή <a href="https://github.com/microsoft/ai-agents-for-beginners/issues?WT.mc_id=academic-105485-koreyst" target="_blank">δημιουργήστε ένα θέμα</a>.

## Επόμενο Μάθημα

Τώρα είστε έτοιμοι να τρέξετε τον κώδικα για αυτό το μάθημα. Καλή μάθηση για τον κόσμο των πράκτορων AI!

[Εισαγωγή στους Πράκτορες AI και τις Περιπτώσεις Χρήσης Πρακτόρων](../01-intro-to-ai-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->