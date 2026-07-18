# Ιστορικό αλλαγών

Όλες οι σημαντικές αλλαγές στο μάθημα **AI Agents for Beginners** καταγράφονται σε αυτό το αρχείο.

## [Κυκλοφόρησε] — 2026-07-13

Αυτή η έκδοση προσθέτει δύο νέα μαθήματα που ολοκληρώνουν την καμπύλη ανάπτυξης — κλιμάκωση πρακτόρων έως το Microsoft Foundry και μείωση σε έναν μόνο υπολογιστή εργασίας — συν μια διαδικασία δοκιμών καπνού, ανανεωμένη πλοήγηση μαθήματος, νέες δεξιότητες μαθητών και ενημερωμένη εταιρική ταυτότητα.

### Προστέθηκαν

- **Μάθημα 16 — Ανάπτυξη Κλιμακούμενων Πρακτόρων με το Microsoft Foundry.** Νέο μάθημα [16-deploying-scalable-agents/README.md](./16-deploying-scalable-agents/README.md) και εκτελέσιμο σημειωματάριο [16-python-agent-framework.ipynb](./16-deploying-scalable-agents/code_samples/16-python-agent-framework.ipynb) που κατασκευάζει έναν παραγωγικό πράκτορα υποστήριξης πελατών (εργαλεία, RAG, μνήμη, δρομολόγηση μοντέλου, προσωρινή αποθήκευση απαντήσεων, ανθρώπινη έγκριση, πύλη αξιολόγησης, και καταγραφή OpenTelemetry), με διαγράμματα ανάπτυξης/εκτέλεσης Mermaid, έλεγχο γνώσεων, ανάθεση και πρόκληση.
- **Μάθημα 17 — Δημιουργία Τοπικών Πρακτόρων AI με Foundry Local και Qwen.** Νέο μάθημα [17-creating-local-ai-agents/README.md](./17-creating-local-ai-agents/README.md) και σημειωματάριο [17-local-agent-foundry-local.ipynb](./17-creating-local-ai-agents/code_samples/17-local-agent-foundry-local.ipynb) που κατασκευάζει έναν πλήρως τοπικό βοηθό μηχανικού (κλήση συναρτήσεων Qwen μέσω Foundry Local, εργαλεία αρχείων σε sandbox, τοπικό RAG με Chroma, προαιρετικό τοπικό MCP), με διαγράμματα μόνο-τοπικών/τοπικό-RAG/κλήσεων εργαλείων, έλεγχο γνώσεων, ανάθεση, και πρόκληση.
- **Διαδικασία δοκιμών καπνού.** Νέα ροή εργασίας [AI Smoke Test](https://github.com/marketplace/actions/ai-smoke-test) [.github/workflows/smoke-test.yml](../../.github/workflows/smoke-test.yml) συν καταλόγους ανά μάθημα υπό [tests/](./tests/README.md) για τους πρακτόρες που αναπτύσσονται στα Μαθήματα 01, 04, 05 και 16, με ένα γενικό README που χαρτογραφεί κάθε κατάλογο στο μάθημά του και το όνομα του πράκτορα που φιλοξενείται. Το μάθημα 16 αποκτά ενότητα "Επικύρωση Αναπτυγμένου Πράκτορα με Δοκιμές Καπνού". Τα μαθήματα 01/04/05 αποκτούν προαιρετική δείξη δοκιμών καπνού.
- **Δεξιότητες μαθητή.** Νέες Δεξιότητες Πρακτόρων κάτω από `.agents/skills/`: [deploying-scalable-agents](./.agents/skills/deploying-scalable-agents/SKILL.md), [local-ai-agents](./.agents/skills/local-ai-agents/SKILL.md) (πακετάρισμα των οδηγιών των Μαθημάτων 16 και 17), και [testing-course-samples](./.agents/skills/testing-course-samples/SKILL.md) (πώς να επικυρώσετε τα παραδείγματα σημειωματαρίων έναντι ζωντανής εγκατάστασης Microsoft Foundry / Azure OpenAI).
- **Εκτελεστής επικύρωσης σημειωματαρίων.** Νέο [scripts/validate-notebooks.ps1](../../scripts/validate-notebooks.ps1) που εκτελεί κάθε σημειωματάριο Python χωρίς GUI με `nbconvert` και εκτυπώνει έναν πίνακα PASS/FAIL (συν `results.json`). Αυτόματα εντοπίζει τη ρίζα του αποθετηρίου και το Python, εξαιρεί μη-μαθήματα σημειωματάρια (`.venv`, `site-packages`, `translations`, πρότυπα δεξιοτήτων) και `.NET` σημειωματάρια από προεπιλογή, και υποστηρίζει `-Filter`, `-Timeout`, `-List`, `-IncludeDotnet`, και `-Python`.
- **Πλοήγηση μαθήματος.** Προστέθηκαν σύνδεσμοι Προηγούμενου/Επόμενου μαθήματος στα Μαθήματα 11–15 (που έλειπαν προηγουμένως) ώστε ολόκληρο το μάθημα να συνδέεται 00 → 18 και στις δύο κατευθύνσεις.
- **Νέες μικρογραφίες.** Μικρογραφίες μαθημάτων για τα Μαθήματα 16 και 17, συν ανανεωμένη κοινωνική εικόνα αποθετηρίου [images/repo-thumbnailv3.png](./images/repo-thumbnailv3.png) (που διαφημίζει τα δύο νέα μαθήματα και το URL `aka.ms/ai-agents-beginners`).
- **Εξαρτήσεις** ([requirements.txt](../../requirements.txt)): προστέθηκαν `foundry-local-sdk` και `chromadb` για το Μάθημα 17.

### Αλλαγές

- **Κύριος πίνακας [README.md](./README.md)**: Τα Μαθήματα 16 και 17 τώρα συνδέονται με το περιεχόμενό τους (αντί "Coming Soon"). Η εικόνα αποθετηρίου ανανεώθηκε σε `repo-thumbnailv3.png`.
- **[STUDY_GUIDE.md](./STUDY_GUIDE.md)**: Προστέθηκαν τα Μαθήματα 16 και 17 στον οδηγό ανα μάθημα και στα μονοπάτια εκμάθησης, καθώς και μια ενότητα "Επικύρωση Αναπτυγμένων Πρακτόρων με Δοκιμές Καπνού".
- **[AGENTS.md](./AGENTS.md)**: Ενημερώθηκε ο αριθμός/περιγραφή μαθημάτων (00–18), προστέθηκε ενότητα επικύρωσης δοκιμών καπνού, και παραδείγματα ονομασίας για τα Μαθήματα 16/17.
- **[18-securing-ai-agents/README.md](./18-securing-ai-agents/README.md)**: Η "Προηγούμενη Διδασκαλία" τώρα δείχνει στο Μάθημα 17 (ήταν το Μάθημα 15), κλείνοντας την αλυσίδα.
- **Τυποποιημένες αναφορές μοντέλων σε μη αποσυρθέντα μοντέλα.** Αντικαταστάθηκαν όλες οι αναφορές σε `gpt-4o` / `gpt-4o-mini` σε όλο το μάθημα (ντοκουμέντα, `.env.example`, Python/.NET σημειωματάρια και παραδείγματα) με `gpt-4.1-mini` — το `gpt-4o` (όλες οι εκδόσεις) αποσύρεται το 2026. Το παράδειγμα δρομολόγησης μοντέλου στο Μάθημα 16 διατηρεί μια αντίθεση μικρού/μεγάλου χρησιμοποιώντας `gpt-4.1-mini` (μικρό) και `gpt-4.1` (μεγάλο). Τα Python σημειωματάρια επιλέγουν πλέον το μοντέλο από περιβαλλοντικές μεταβλητές (`AZURE_AI_MODEL_DEPLOYMENT_NAME` / `AZURE_OPENAI_DEPLOYMENT`) αντί να κωδικοποιούν το όνομα μοντέλου.

### Σημειώσεις και γνωστοί περιορισμοί

- **Δεν εκτελούνται εναντίον ζωντανού Azure.** Τα νέα μαθησιακά σημειωματάρια είναι εκπαιδευτικά παραδείγματα· εκτελέστε και επικυρώστε τα έναντι της δικής σας εγκατάστασης Microsoft Foundry / Foundry Local. Η ροή εργασίας δοκιμών καπνού απαιτεί να αναπτύξετε τον πράκτορα του μαθήματος και να ρυθμίσετε τα μυστικά Azure OIDC (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`) με το ρόλο **Azure AI User** στο επίπεδο έργου Foundry.
- **Το Μάθημα 17 είναι μόνο τοπικό.** Δεν έχει endpoint Foundry Responses, οπότε η ενέργεια δοκιμών καπνού δεν εφαρμόζεται· επικυρώστε το τρέχοντας το σημειωματάριο στον υπολογιστή εργασίας σας.

## [Κυκλοφόρησε] — 2026-07-06

Αυτή η έκδοση μεταφέρει το μάθημα στο **Azure OpenAI Responses API**, τυποποιεί την ονομασία προϊόντων σε **Microsoft Foundry** και **Microsoft Agent Framework (MAF)**, αποσύρει τα GitHub Models, ενημερώνει εκδόσεις SDK, και προσθέτει νέο περιεχόμενο για τοπικά μοντέλα και φιλοξενία άλλων πλαισίων στο Foundry.

### Προστέθηκαν


- **Δεξιότητα Μεταφοράς** — Εγκατεστημένη η Agent Skill [`azure-openai-to-responses`](./.agents/skills/azure-openai-to-responses/SKILL.md) (από [Azure-Samples/azure-openai-to-responses](https://github.com/Azure-Samples/azure-openai-to-responses)) κάτω από `.agents/skills/`, συμπεριλαμβανομένων των αναφορών και του σεναρίου σαρωτή της.
- **Foundry Local (εκτέλεση μοντέλων στη συσκευή)** — Νέα ενότητα "Alternative Provider: Foundry Local" στο [00-course-setup/README.md](./00-course-setup/README.md) που καλύπτει την εγκατάσταση (`winget` / `brew`), το `foundry model run`, το `foundry-local-sdk`, και τη σύνδεση του `FoundryLocalManager` με το Microsoft Agent Framework μέσω του `OpenAIChatClient`.
- **Φιλοξενία πρακτόρων LangChain / LangGraph στο Microsoft Foundry** — Νέα ενότητα στο [14-microsoft-agent-framework/README.md](./14-microsoft-agent-framework/README.md) καθώς και ένα δείγμα που τρέχει [14-langchain-hosted-agent.py](../../14-microsoft-agent-framework/code-samples/14-langchain-hosted-agent.py) χρησιμοποιώντας `langchain-azure-ai[hosting]` και `ResponsesHostServer` (το πρωτόκολλο `/responses`), βασισμένο σε [Microsoft Learn](https://learn.microsoft.com/azure/foundry/how-to/develop/langchain-hosted-agents).
- **Microsoft Project Opal** — Νέα ενότητα "Παράδειγμα Πραγματικού Κόσμου: Microsoft Project Opal" στο [15-browser-use/README.md](./15-browser-use/README.md) που τοποθετεί το Opal ως έναν επιχειρησιακό πράκτορα χρήσης υπολογιστή και το συνδέει με τις έννοιες του μαθήματος (άνθρωπος στο βρόχο, εμπιστοσύνη/ασφάλεια, σχεδιασμός, Δεξιότητες).
- **Δεύτερο δείγμα Python Μαθήματος 02** — Προστέθηκε το [02-python-agent-framework-azure-openai.ipynb](./02-explore-agentic-frameworks/code_samples/02-python-agent-framework-azure-openai.ipynb) (βλέπε "Changed" — μεταφέρθηκε από το προηγούμενο σημειωματάριο Semantic Kernel) και συνδέθηκε στο README του μαθήματος.
- Προστέθηκε ενότητα **Μοντέλα και Πάροχοι** στο [STUDY_GUIDE.md](./STUDY_GUIDE.md).

### Αλλαγές

- **Chat Completions → Responses API (Python).** Τα δείγματα που καλούσαν το μοντέλο απευθείας μεταφέρθηκαν από το Chat Completions στο Responses API (`client.responses.create(input=..., store=False)`, `resp.output_text`), χρησιμοποιώντας τον πελάτη `OpenAI` απέναντι στο σταθερό τελικό σημείο Azure OpenAI `/openai/v1/` (χωρίς `api_version`). Τα επηρεασμένα δείγματα περιλαμβάνουν:
  - [06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb](./06-building-trustworthy-agents/code_samples/06-system-message-framework.ipynb)
  - [06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb](./06-building-trustworthy-agents/code_samples/06-human-in-the-loop.ipynb)
  - [04-tool-use/README.md](./04-tool-use/README.md) — η πλήρης περιήγηση στην κλήση λειτουργίας (το σχήμα εργαλείου απλοποιήθηκε στη μορφή Responses, τα αποτελέσματα εργαλείου επιστράφηκαν ως `function_call_output`, `max_output_tokens`, κλπ.).
- **GitHub Models → Azure OpenAI.** Τα GitHub Models καταργούνται (αποσυρόμενα **Ιούλιος 2026**) και δεν υποστηρίζουν το Responses API. Όλοι οι κώδικες GitHub Models μετατράπηκαν σε Azure OpenAI / Microsoft Foundry σε παραδείγματα Python και .NET:
  - Python: Σημειωματάρια ροής εργασίας Μαθήματος 08 (`01`–`03`), Μάθημα 14 (`14-handoff`, `14-human-loop`, `hotel_booking_workflow_sample.py`).
  - .NET: `01`–`04`, `07`, `08` `*-dotnet-agent-framework.cs` + συνοδευτικά `.md` έγγραφα, και τα σημειωματάρια/`.md` ροής εργασίας Μάθημα 08 dotNET (`01`–`03`) τώρα χρησιμοποιούν `AzureOpenAIClient(...).GetOpenAIResponseClient(deployment).CreateAIAgent(...)` με `AzureCliCredential`.
- **Semantic Kernel → Microsoft Agent Framework.** Το προηγούμενο `02-semantic-kernel.ipynb` ξαναγράφηκε για να χρησιμοποιεί το Microsoft Agent Framework με Azure OpenAI (Responses API) και μετονομάστηκε σε `02-python-agent-framework-azure-openai.ipynb`.
- **Τυποποιήθηκε σε `FoundryChatClient` + `as_agent`.** Ο κώδικας README και σημειωματαρίων που αναφερόταν σε `AzureAIProjectAgentProvider` τυποποιήθηκε στο κανονικό μοτίβο που χρησιμοποιείται από το Μάθημα 01 και τα δικά του παραδείγματα πλαισίου: `FoundryChatClient(project_endpoint=..., model=..., credential=AzureCliCredential())` με `provider.as_agent(...)`. Ενημερώθηκε σε όλα τα README και σημειωματάρια των μαθημάτων 02–14 (π.χ., μνήμη μαθήματος 13, όλα τα σημειωματάρια μαθήματος 14, `11-agentic-protocols/code_samples/github-mcp/app.py`).
- **Ονομασία προϊόντος.** Μετονομάστηκε σε όλο το αγγλικό περιεχόμενο:
  - "Azure AI Foundry" / "Azure AI Studio" → **Microsoft Foundry**
  - "Azure AI Agent Service" → **Microsoft Foundry Agent Service**
  - (Αμετάβλητο: "Azure OpenAI", "Azure AI Search", "Azure AI Inference" και ονόματα μεταβλητών περιβάλλοντος.)
- **Εξαρτήσεις** ([requirements.txt](../../requirements.txt)):
  - Κλειδωμένο `agent-framework>=1.10.0`, `agent-framework-foundry>=1.10.0`, `agent-framework-openai>=1.10.0`.
  - Κλειδωμένο `openai>=1.108.1` (ελάχιστο για το Responses API).
  - Αφαιρέθηκε το `azure-ai-inference` (χρησιμοποιούταν μόνο από τα μεταφερμένα δείγματα GitHub Models).
- **Ρύθμιση περιβάλλοντος** ([.env.example](../../.env.example)): αφαιρέθηκαν οι μεταβλητές GitHub Models (`GITHUB_TOKEN`, `GITHUB_ENDPOINT`, `GITHUB_MODEL_ID`); προστέθηκαν `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, και προαιρετικό `AZURE_OPENAI_API_KEY`; ενημερώθηκε η ονοματοδοσία για Microsoft Foundry.
- **Τεκμηρίωση** — Ενημερώθηκαν τα [00-course-setup/README.md](./00-course-setup/README.md), [AGENTS.md](./AGENTS.md), [README.md](./README.md), και [STUDY_GUIDE.md](./STUDY_GUIDE.md) για τα παραπάνω (ρύθμιση env vars, απόσπασμα επαλήθευσης, οδηγίες παρόχου, ονοματοδοσία).

### Αφαιρέθηκαν

- Βήματα έναρξης GitHub Models και μεταβλητές περιβάλλοντος από τα έγγραφα εγκατάστασης (αντικαταστάθηκαν από Azure OpenAI / Microsoft Foundry).

### Ασφάλεια / Ιδιωτικότητα (καθαρισμός δημόσιας κοινής χρήσης)

- Εκκαθαρίστηκαν τα αποτελέσματα εκτέλεσης σημειωματαρίων Jupyter που διέρρευσαν ένα πραγματικό **Azure subscription ID**, ονόματα resource-group / πόρων, και το ID σύνδεσης Bing, καθώς και **τοπικές διαδρομές αρχείων και ονόματα χρήστη** προγραμματιστών, σε:

  - `08-multi-agent/code_samples/workflows-agent-framework/dotNET/04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb`

  - `08-multi-agent/code_samples/workflows-agent-framework/python/04.python-agent-framework-workflow-aifoundry-condition.ipynb`
  - `15-browser-use/15-browser-user.ipynb`
- Επιβεβαιώθηκε ότι δεν υπάρχουν κλειδιά API, tokens, IDs συνδρομής ή προσωπικές διαδρομές στο παρακολουθούμενο αγγλικό περιεχόμενο (οι αναφορές `GITHUB_TOKEN` που απομένουν είναι το token των GitHub Actions στα workflows και το PAT του GitHub MCP server στη ρύθμιση της Διδασκαλίας 11 — και τα δύο νόμιμα και άσχετα με τα GitHub Models).

### Σημειώσεις και γνωστοί περιορισμοί

- **Δεν εκτελέστηκαν/συνελέχθησαν.** Πρόκειται για εκπαιδευτικά δείγματα ενημερωμένα για ορθότητα API/ονόματος· δεν εκτελέστηκαν σε ζωντανούς πόρους Azure, και τα .NET δείγματα δεν συνελέγησαν σε αυτό το περιβάλλον. Επιβεβαιώστε στην δική σας ανάπτυξη Microsoft Foundry / Azure OpenAI.
- **Η ανάπτυξη μοντέλου πρέπει να υποστηρίζει το API Απαντήσεων (Responses API).** Χρησιμοποιήστε μια ανάπτυξη όπως `gpt-4.1-mini`, `gpt-4.1`, ή μοντέλο `gpt-5.x`. Τα παλαιότερα μοντέλα υποστηρίζουν βασική λειτουργικότητα Απαντήσεων αλλά όχι όλες τις δυνατότητες.
- **Έκδοση του agent-framework.** Τα δείγματα στοχεύουν στη νεότερη MAF (`>=1.10.0`). Η κανονική κλήση δημιουργίας agent είναι `client.as_agent(...)`· τα API επαληθεύτηκαν με βάση τα δημοσιευμένα docs του framework και την εγκατεστημένη έκδοση. Αν χρησιμοποιήσετε διαφορετική έκδοση, επιβεβαιώστε τη διαθεσιμότητα της μεθόδου (`as_agent` vs `create_agent`).
- **Το workflow notebook 04 της Διδασκαλίας 08** διατηρεί σκόπιμα το `AzureAIAgentClient` (από `agent-framework-azure-ai`) επειδή χρησιμοποιεί εργαλεία φιλοξενούμενα από την υπηρεσία Microsoft Foundry Agent (Bing grounding, μεταφραστής κώδικα)· ήδη βασίζεται σε Απαντήσεις.
- **Προεπιλεγμένη ανάπτυξη .NET.** Δύο δείγματα workflow dotNET στη Διδασκαλία 08 είχαν προηγουμένως σκληρά κωδικοποιημένο συγκεκριμένο μοντέλο· τώρα προεπιλέγουν `AZURE_OPENAI_DEPLOYMENT` (`gpt-4.1-mini`). Αν ένα δείγμα βασίζεται σε πολυτροπική/οπτική είσοδο, ορίστε `AZURE_OPENAI_DEPLOYMENT` σε κατάλληλο μοντέλο.
- **Foundry Local** εκθέτει ένα συμβατό με OpenAI endpoint **Chat Completions** και προορίζεται για τοπική ανάπτυξη· χρησιμοποιήστε Azure OpenAI / Microsoft Foundry για το πλήρες σετ δυνατοτήτων του Responses API.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Αποποίηση ευθυνών**:
Αυτό το έγγραφο έχει μεταφραστεί χρησιμοποιώντας την υπηρεσία μετάφρασης με τεχνητή νοημοσύνη [Co-op Translator](https://github.com/Azure/co-op-translator). Ενώ επιδιώκουμε την ακρίβεια, παρακαλούμε να έχετε υπόψη ότι οι αυτοματοποιημένες μεταφράσεις ενδέχεται να περιέχουν λάθη ή ανακρίβειες. Το πρωτότυπο έγγραφο στη μητρική του γλώσσα πρέπει να θεωρείται η αυθεντική πηγή. Για κρίσιμες πληροφορίες, συνιστάται επαγγελματική ανθρώπινη μετάφραση. Δεν φέρουμε ευθύνη για τυχόν παρεξηγήσεις ή λανθασμένες ερμηνείες που προκύπτουν από τη χρήση αυτής της μετάφρασης.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->