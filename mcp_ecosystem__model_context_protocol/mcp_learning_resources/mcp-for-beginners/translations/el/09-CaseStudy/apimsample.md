# Μελέτη Περίπτωσης: Έκθεση REST API στο API Management ως MCP server

Το Azure API Management είναι μια υπηρεσία που παρέχει μια Πύλη πάνω από τα API Endpoints σας. Ο τρόπος λειτουργίας του είναι ότι το Azure API Management λειτουργεί ως μεσολαβητής μπροστά από τα APIs σας και μπορεί να αποφασίσει τι να κάνει με τις εισερχόμενες αιτήσεις.

Χρησιμοποιώντας το, προσθέτετε ολόκληρο ένα σύνολο λειτουργιών όπως:

- **Ασφάλεια**, μπορείτε να χρησιμοποιήσετε από κλειδιά API, JWT μέχρι διαχειριζόμενη ταυτότητα.
- **Περιορισμός ρυθμού**, μια εξαιρετική λειτουργία είναι η δυνατότητα να αποφασίσετε πόσες κλήσεις περνούν ανά συγκεκριμένη μονάδα χρόνου. Αυτό βοηθά να εξασφαλιστεί ότι όλοι οι χρήστες έχουν μια εξαιρετική εμπειρία και επίσης ότι η υπηρεσία σας δεν επιβαρύνεται υπερβολικά με αιτήσεις.
- **Κλιμάκωση & Ισορροπία Φορτίου**. Μπορείτε να ορίσετε έναν αριθμό endpoints για να ισορροπείται το φορτίο και επίσης μπορείτε να αποφασίσετε πώς θα γίνεται η «ισορροπία φορτίου».
- **Λειτουργίες AI όπως η σημασιολογική προσωρινή αποθήκευση**, όριο tokens και παρακολούθηση tokens και άλλα. Αυτές είναι εξαιρετικές λειτουργίες που βελτιώνουν την ανταπόκριση καθώς και σας βοηθούν να παραμένετε ενημερωμένοι για τη χρήση των tokens σας. [Διαβάστε περισσότερα εδώ](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities). 

## Γιατί MCP + Azure API Management;

Το Model Context Protocol γίνεται γρήγορα πρότυπο για agentic εφαρμογές AI και για το πώς να εκθέτεις εργαλεία και δεδομένα με συνεπή τρόπο. Το Azure API Management είναι μια φυσική επιλογή όταν χρειάζεστε να «διαχειριστείτε» APIs. Οι MCP Servers συχνά ενσωματώνονται με άλλα APIs για να επιλύσουν αιτήματα προς ένα εργαλείο, για παράδειγμα. Επομένως, ο συνδυασμός του Azure API Management και MCP έχει πολύ νόημα.

## Επισκόπηση

Σε αυτή τη συγκεκριμένη περίπτωση χρήσης θα μάθουμε πώς να εκθέτουμε τα API endpoints ως MCP Server. Κάνοντας αυτό, μπορούμε εύκολα να ενσωματώσουμε αυτά τα endpoints σε μια agentic εφαρμογή ενώ εκμεταλλευόμαστε και τις λειτουργίες του Azure API Management.

## Κύρια Χαρακτηριστικά

- Επιλέγετε τις μεθόδους endpoint που θέλετε να εκθέσετε ως εργαλεία.
- Οι επιπλέον λειτουργίες που λαμβάνετε εξαρτώνται από το τι διαμορφώνετε στο τμήμα πολιτικής για το API σας. Εδώ θα σας δείξουμε πώς να προσθέσετε περιορισμό ρυθμού.

## Προέτοιμη Βήμα: εισαγωγή ενός API

Εάν έχετε ήδη ένα API στο Azure API Management, τέλεια, τότε μπορείτε να παραλείψετε αυτό το βήμα. Αν όχι, δείτε αυτόν τον σύνδεσμο, [εισαγωγή ενός API στο Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/import-and-publish#import-and-publish-a-backend-api).

## Έκθεση του API ως MCP Server

Για να εκθέσουμε τα API endpoints, ας ακολουθήσουμε τα παρακάτω βήματα:

1. Μεταβείτε στο Azure Portal και στην ακόλουθη διεύθυνση <https://portal.azure.com/?Microsoft_Azure_ApiManagement=mcp> 
Μεταβείτε στην περίπτωση API Management σας.

1. Στο αριστερό μενού, επιλέξτε APIs > MCP Servers > + Δημιουργία νέου MCP Server.

1. Στο API, επιλέξτε ένα REST API για έκθεση ως MCP server.

1. Επιλέξτε μία ή περισσότερες λειτουργίες API (API Operations) για έκθεση ως εργαλεία. Μπορείτε να επιλέξετε όλες τις λειτουργίες ή μόνο συγκεκριμένες.

    ![Επιλογή μεθόδων για έκθεση](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/create-mcp-server-small.png)


1. Επιλέξτε **Δημιουργία**.

1. Μεταβείτε στην επιλογή μενού **APIs** και **MCP Servers**, θα πρέπει να δείτε τα εξής:

    ![Δείτε τον MCP Server στο κύριο παράθυρο](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-list.png)

    Ο MCP server δημιουργήθηκε και οι λειτουργίες API εκτέθηκαν ως εργαλεία. Ο MCP server εμφανίζεται στο παράθυρο MCP Servers. Η στήλη URL δείχνει το endpoint του MCP server που μπορείτε να καλέσετε για δοκιμές ή μέσα σε μια πελατειακή εφαρμογή.

## Προαιρετικό: Διαμόρφωση πολιτικών

Το Azure API Management έχει τον βασικό μηχανισμό των πολιτικών, όπου ορίζετε διαφορετικούς κανόνες για τα endpoints σας, όπως για παράδειγμα περιορισμό ρυθμού ή σημασιολογική προσωρινή αποθήκευση. Αυτές οι πολιτικές δημιουργούνται σε μορφή XML.

Δείτε πώς μπορείτε να ρυθμίσετε μια πολιτική για περιορισμό ρυθμού στο MCP Server σας:

1. Στο portal, κάτω από APIs, επιλέξτε **MCP Servers**.

1. Επιλέξτε τον MCP server που δημιουργήσατε.

1. Στο αριστερό μενού, κάτω από MCP, επιλέξτε **Policies**.

1. Στο πρόγραμμα επεξεργασίας πολιτικών (policy editor), προσθέστε ή επεξεργαστείτε τις πολιτικές που θέλετε να εφαρμόσετε στα εργαλεία του MCP server. Οι πολιτικές ορίζονται σε μορφή XML. Για παράδειγμα, μπορείτε να προσθέσετε μια πολιτική για να περιορίσετε τις κλήσεις προς τα εργαλεία του MCP server (σε αυτό το παράδειγμα, 5 κλήσεις ανά 30 δευτερόλεπτα ανά IP διεύθυνση πελάτη). Δείτε ένα XML που θα προκαλέσει τον περιορισμό ρυθμού:

    ```xml
     <rate-limit-by-key calls="5" 
       renewal-period="30" 
       counter-key="@(context.Request.IpAddress)" 
       remaining-calls-variable-name="remainingCallsPerIP" 
    />
    ```

    Εδώ είναι μια εικόνα του προγράμματος επεξεργασίας πολιτικών:

    ![Πρόγραμμα επεξεργασίας πολιτικών](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-policies-small.png)
 
## Δοκιμάστε το

Ας βεβαιωθούμε ότι ο MCP Server μας λειτουργεί όπως αναμένεται.

Για αυτό, θα χρησιμοποιήσουμε το Visual Studio Code και το GitHub Copilot στην λειτουργία Agent. Θα προσθέσουμε τον MCP server σε ένα αρχείο *mcp.json*. Με αυτό τον τρόπο, το Visual Studio Code θα λειτουργεί ως πελάτης με agentic δυνατότητες και οι τελικοί χρήστες θα μπορούν να πληκτρολογούν ένα prompt και να αλληλεπιδρούν με τον server.

Ας δούμε πώς, για να προσθέσετε τον MCP server στο Visual Studio Code:

1. Χρησιμοποιήστε την εντολή MCP: **Add Server από το Command Palette**.

1. Όταν σας ζητηθεί, επιλέξτε τον τύπο διακομιστή: **HTTP (HTTP ή Server Sent Events)**.

1. Πληκτρολογήστε το URL του MCP server στο API Management. Παράδειγμα: **https://<apim-service-name>.azure-api.net/<api-name>-mcp/sse** (για SSE endpoint) ή **https://<apim-service-name>.azure-api.net/<api-name>-mcp/mcp** (για MCP endpoint), σημειώστε τη διαφορά μεταξύ των transport που είναι `/sse` ή `/mcp`.

1. Πληκτρολογήστε ένα αναγνωριστικό server της επιλογής σας. Δεν είναι σημαντική τιμή αλλά θα σας βοηθήσει να θυμάστε ποια είναι αυτή η περίπτωση server.

1. Επιλέξτε αν θα αποθηκεύσετε τη διαμόρφωση στις ρυθμίσεις του workspace ή του χρήστη.

  - **Ρυθμίσεις Workspace** - Η διαμόρφωση του server αποθηκεύεται σε ένα αρχείο .vscode/mcp.json που είναι διαθέσιμο μόνο στο τρέχον workspace.

    *mcp.json*

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "sse",
            "url": "url-to-mcp-server/sse"
        }
    }
    ```

    ή αν επιλέξετε streaming HTTP ως μεταφορά θα διαφέρει ελαφρώς:

    ```json
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp"
        }
    }
    ```

  - **Ρυθμίσεις Χρήστη** - Η διαμόρφωση του server προστίθεται στο παγκόσμιο αρχείο *settings.json* και είναι διαθέσιμη σε όλα τα workspaces. Η διαμόρφωση μοιάζει ως εξής:

    ![Ρύθμιση χρήστη](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-servers-visual-studio-code.png)

1. Πρέπει επίσης να προσθέσετε διαμόρφωση, μια κεφαλίδα για να βεβαιωθείτε ότι γίνεται σωστή αυθεντικοποίηση προς το Azure API Management. Χρησιμοποιεί μια κεφαλίδα με όνομα **Ocp-Apim-Subscription-Key*. 

    - Δείτε πως μπορείτε να την προσθέσετε στις ρυθμίσεις:

    ![Προσθήκη κεφαλίδας για αυθεντικοποίηση](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/mcp-server-with-header-visual-studio-code.png), αυτό θα εμφανίσει μια προτροπή για να εισάγετε την τιμή του κλειδιού API, το οποίο μπορείτε να βρείτε στο Azure Portal για την περίπτωση Azure API Management σας.

   - Για να το προσθέσετε στο *mcp.json* αντί αυτού, μπορείτε να το προσθέσετε ως εξής:

    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "apim_key",
        "description": "API Key for Azure API Management",
        "password": true
      }
    ]
    "servers": {
        "APIM petstore" : {
            "type": "http",
            "url": "url-to-mcp-server/mcp",
            "headers": {
                "Ocp-Apim-Subscription-Key": "Bearer ${input:apim_key}"
            }
        }
    }
    ```

### Χρήση λειτουργίας Agent

Τώρα που είμαστε έτοιμοι είτε στις ρυθμίσεις είτε στο *.vscode/mcp.json*, ας το δοκιμάσουμε. 

Θα υπάρχει ένα εικονίδιο Εργαλεία, όπου θα εμφανίζονται τα εργαλεία που εκτέθηκαν από τον server σας:

![Εργαλεία από τον server](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/tools-button-visual-studio-code.png)

1. Κάντε κλικ στο εικονίδιο εργαλείων και θα βλέπετε μια λίστα εργαλείων όπως η παρακάτω:

    ![Εργαλεία](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/select-tools-visual-studio-code.png)

1. Πληκτρολογήστε ένα prompt στη συνομιλία για να καλέσετε το εργαλείο. Για παράδειγμα, αν επιλέξατε ένα εργαλείο για να λάβετε πληροφορίες παραγγελίας, μπορείτε να ρωτήσετε τον agent για μια παραγγελία. Ιδού ένα παράδειγμα prompt:

    ```text
    get information from order 2
    ```

    Τώρα θα σας εμφανιστεί ένα εικονίδιο εργαλείων που θα σας ζητεί να συνεχίσετε την κλήση ενός εργαλείου. Επιλέξτε να συνεχίσετε την εκτέλεση του εργαλείου, θα δείτε τώρα μια έξοδο όπως η παρακάτω:

    ![Αποτέλεσμα από το prompt](https://learn.microsoft.com/en-us/azure/api-management/media/export-rest-mcp-server/chat-results-visual-studio-code.png)

    **το τι βλέπετε παραπάνω εξαρτάται από τα εργαλεία που έχετε ρυθμίσει, αλλά η ιδέα είναι να λάβετε μια λεκτική απάντηση όπως παραπάνω**


## Αναφορές

Δείτε πώς μπορείτε να μάθετε περισσότερα:

- [Εκπαιδευτικό για Azure API Management και MCP](https://learn.microsoft.com/en-us/azure/api-management/export-rest-mcp-server)
- [Παράδειγμα Python: Ασφαλείς απομακρυσμένοι MCP servers με Azure API Management (πειραματικό)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)

- [MCP client authorization lab](https://github.com/Azure-Samples/AI-Gateway/tree/main/labs/mcp-client-authorization)

- [Χρήση της επέκτασης Azure API Management για VS Code για εισαγωγή και διαχείριση APIs](https://learn.microsoft.com/en-us/azure/api-management/visual-studio-code-tutorial)

- [Εγγραφή και ανακάλυψη απομακρυσμένων MCP servers στο Azure API Center](https://learn.microsoft.com/en-us/azure/api-center/register-discover-mcp-server)
- [AI Gateway](https://github.com/Azure-Samples/AI-Gateway) Εξαιρετικό αποθετήριο που δείχνει πολλές δυνατότητες AI με το Azure API Management
- [Εργαστήρια AI Gateway](https://azure-samples.github.io/AI-Gateway/) Περιέχει εργαστήρια που χρησιμοποιούν το Azure Portal, που είναι ένας εξαιρετικός τρόπος για να ξεκινήσετε την αξιολόγηση των λειτουργιών AI.

## Τι ακολουθεί

- Πίσω στο: [Επισκόπηση Μελετών Περίπτωσης](./README.md)
- Επόμενο: [Azure AI Travel Agents](./travelagentsample.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:  
Το παρόν έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία αυτόματης μετάφρασης AI [Co-op Translator](https://github.com/Azure/co-op-translator). Παρότι καταβάλλουμε προσπάθειες για ακρίβεια, παρακαλούμε λάβετε υπόψη ότι οι αυτόματες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η επίσημη πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->