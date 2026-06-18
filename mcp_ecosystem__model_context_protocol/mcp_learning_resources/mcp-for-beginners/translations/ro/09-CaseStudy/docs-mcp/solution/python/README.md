# Generator de Plan de Studiu cu Chainlit & Microsoft Learn Docs MCP

## Cerințe preliminare

- Python 3.8 sau versiune superioară
- pip (gestionarul de pachete Python)
- Acces la internet pentru conectarea la serverul Microsoft Learn Docs MCP

## Instalare

1. Clonează acest depozit sau descarcă fișierele proiectului.
2. Instalează dependențele necesare:

   ```bash
   pip install -r requirements.txt
   ```

## Utilizare

### Scenariul 1: Interogare simplă către Docs MCP
Un client din linia de comandă care se conectează la serverul Docs MCP, trimite o interogare și afișează rezultatul.

1. Rulează scriptul:
   ```bash
   python scenario1.py
   ```
2. Introdu întrebarea ta privind documentația la prompt.

### Scenariul 2: Generator plan de studiu (aplicație web Chainlit)
O interfață web (folosind Chainlit) care permite utilizatorilor să genereze un plan de studiu personalizat, săptămână cu săptămână, pentru orice subiect tehnic.

1. Pornește aplicația Chainlit:
   ```bash
   chainlit run scenario2.py
   ```
2. Deschide adresa URL locală afișată în terminalul tău (de exemplu, http://localhost:8000) în browser.
3. În fereastra de chat, introdu subiectul de studiu și numărul de săptămâni pentru care dorești să studiezi (de exemplu, „certificare AI-900, 8 săptămâni”).
4. Aplicația va răspunde cu un plan de studiu săptămânal, incluzând linkuri către documentația relevantă Microsoft Learn.

**Variabile de mediu necesare:**

Pentru a folosi Scenariul 2 (aplicația web Chainlit cu Azure OpenAI), trebuie să setezi următoarele variabile de mediu într-un fișier `.env` în directorul `python`:

```
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=
```

Completează aceste valori cu detaliile resursei tale Azure OpenAI înainte de a rula aplicația.

> [!TIP]
> Poți implementa cu ușurință propriile modele folosind [Microsoft Foundry](https://ai.azure.com/).

### Scenariul 3: Documentație în editor cu server MCP în VS Code

În loc să schimbi tab-urile browserului pentru a căuta documentație, poți aduce Microsoft Learn Docs direct în VS Code folosind serverul MCP. Acest lucru îți permite să:
- Cauți și să citești documentația în interiorul VS Code fără să părăsești mediul tău de codare.
- Să referențiezi documentația și să inserezi linkuri direct în fișierele README sau de curs.
- Să folosești GitHub Copilot și MCP împreună pentru un flux de lucru AI integrat și eficient.

**Exemple de utilizare:**
- Adaugă rapid linkuri de referință într-un README în timp ce scrii documentația pentru un curs sau proiect.
- Folosește Copilot pentru a genera cod și MCP pentru a găsi și cita instant documentația relevantă.
- Rămâi concentrat în editor și crește productivitatea.

> [!IMPORTANT]
> Asigură-te că ai un fișier valid [`mcp.json`](../../../../../../09-CaseStudy/docs-mcp/solution/scenario3/mcp.json) în spațiul tău de lucru (locația este `.vscode/mcp.json`).

## De ce Chainlit pentru Scenariul 2?

Chainlit este un cadru modern open-source pentru construirea aplicațiilor web conversaționale. Face ușoară crearea interfețelor utilizator bazate pe chat care se conectează la servicii backend precum serverul Microsoft Learn Docs MCP. Acest proiect utilizează Chainlit pentru a oferi o modalitate simplă și interactivă de a genera planuri personalizate de studiu în timp real. Prin folosirea Chainlit, poți construi rapid și implementa unelte chat care îmbunătățesc productivitatea și procesul de învățare.

## Ce face această aplicație

Această aplicație permite utilizatorilor să creeze un plan de studiu personalizat pur și simplu introducând un subiect și o durată. Aplicația interpretează inputul tău, interoghează serverul Microsoft Learn Docs MCP pentru conținut relevant și organizează rezultatele într-un plan structurat săptămână cu săptămână. Recomandările pentru fiecare săptămână sunt afișate în chat, facilitând urmărirea progresului. Integrarea asigură că primești întotdeauna cele mai noi și relevante resurse de învățare.

## Exemple de interogări

Încearcă aceste interogări în fereastra de chat pentru a vedea cum răspunde aplicația:

- `certificare AI-900, 8 săptămâni`
- `Învață Azure Functions, 4 săptămâni`
- `Azure DevOps, 6 săptămâni`
- `Inginierie de date pe Azure, 10 săptămâni`
- `Fundamente de securitate Microsoft, 5 săptămâni`
- `Power Platform, 7 săptămâni`
- `Servicii Azure AI, 12 săptămâni`
- `Arhitectură cloud, 9 săptămâni`

Aceste exemple demonstrează flexibilitatea aplicației pentru obiective și perioade de învățare diferite.

## Referințe

- [Documentația Chainlit](https://docs.chainlit.io/)
- [Documentația MCP](https://github.com/MicrosoftDocs/mcp)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->