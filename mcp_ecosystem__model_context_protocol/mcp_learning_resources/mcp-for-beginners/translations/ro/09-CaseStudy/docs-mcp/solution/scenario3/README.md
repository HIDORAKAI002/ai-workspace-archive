# Scenariul 3: Documentație în editor cu serverul MCP în VS Code

## Prezentare generală

În acest scenariu, vei învăța cum să aduci Microsoft Learn Docs direct în mediul tău Visual Studio Code folosind serverul MCP. În loc să comuți constant între filele browser-ului pentru a căuta documentație, poți accesa, căuta și face referire la documentația oficială chiar din editor. Această abordare optimizează fluxul de lucru, te ajută să rămâi concentrat și permite o integrare perfectă cu instrumente precum GitHub Copilot.

- Caută și citește documentația în VS Code fără a părăsi mediul de programare.
- Fă referire la documentație și inserează linkuri direct în fișierele README sau cursuri.
- Folosește GitHub Copilot și MCP împreună pentru un flux de lucru alimentat de AI, fără întreruperi.

## Obiective de învățare

La finalul acestui capitol, vei ști cum să configurezi și să utilizezi serverul MCP în VS Code pentru a-ți îmbunătăți fluxul de lucru de documentare și dezvoltare. Vei putea să:

- Configurezi spațiul de lucru pentru a folosi serverul MCP pentru căutarea documentației.
- Cauți și inserezi documentație direct din VS Code.
- Combină puterea GitHub Copilot și MCP pentru un flux de lucru mai productiv, augmentat de AI.

Aceste abilități te vor ajuta să rămâi concentrat, să îmbunătățești calitatea documentației și să-ți crești productivitatea ca dezvoltator sau redactor tehnic.

## Soluție

Pentru a obține acces la documentație în editor, vei urma o serie de pași care integrează serverul MCP cu VS Code și GitHub Copilot. Această soluție este ideală pentru autori de cursuri, redactori de documentație și dezvoltatori care vor să rămână concentrați în editor în timp ce lucrează cu documentația și Copilot.

- Adaugă rapid linkuri de referință într-un README în timp ce scrii documentația unui curs sau proiect.
- Folosește Copilot pentru a genera cod și MCP pentru a găsi și cita instant documentația relevantă.
- Rămâi concentrat în editor și crește-ți productivitatea.

### Ghid pas cu pas

Pentru a începe, urmează acești pași. Pentru fiecare pas, poți adăuga o captură de ecran din folderul assets pentru a ilustra vizual procesul.

1. **Adaugă configurația MCP:**
   În rădăcina proiectului, creează un fișier `.vscode/mcp.json` și adaugă următoarea configurație:
   ```json
   {
     "servers": {
       "LearnDocsMCP": {
         "url": "https://learn.microsoft.com/api/mcp"
       }
     }
   }
   ```
   Această configurație spune VS Code cum să se conecteze la [`Microsoft Learn Docs MCP server`](https://github.com/MicrosoftDocs/mcp).
   
   ![Pasul 1: Adaugă mcp.json în folderul .vscode](../../../../../../translated_images/ro/step1-mcp-json.c06a007fccc3edfa.webp)
    
2. **Deschide panoul GitHub Copilot Chat:**
   Dacă nu ai deja extensia GitHub Copilot instalată, accesează vizualizarea pentru Extensii în VS Code și instaleaz-o. Poți să o descarci direct din [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat). Apoi, deschide panoul Copilot Chat din bara laterală.

   ![Pasul 2: Deschide panoul Copilot Chat](../../../../../../translated_images/ro/step2-copilot-panel.f1cc86e9b9b8cd1a.webp)

3. **Activează modul agent și verifică instrumentele:**
   În panoul Copilot Chat, activează modul agent.

   ![Pasul 3: Activează modul agent și verifică instrumentele](../../../../../../translated_images/ro/step3-agent-mode.cdc32520fd7dd1d1.webp)

   După activarea modului agent, verifică dacă serverul MCP este listat ca unul dintre instrumentele disponibile. Aceasta asigură că agentul Copilot poate accesa serverul de documentație pentru a prelua informații relevante.
   
   ![Pasul 3: Verifică instrumentul server MCP](../../../../../../translated_images/ro/step3-verify-mcp-tool.76096a6329cbfecd.webp)
4. **Începe o conversație nouă și interacționează cu agentul:**
   Deschide o conversație nouă în panoul Copilot Chat. Acum poți interoga agentul cu întrebările tale de documentație. Agentul va folosi serverul MCP pentru a prelua și afișa documentația relevantă Microsoft Learn direct în editor.

   - *"Încerc să scriu un plan de studiu pentru subiectul X. Voi studia timp de 8 săptămâni, pentru fiecare săptămână sugerează-mi conținut pe care ar trebui să îl parcurg."*

   ![Pasul 4: Interacționează cu agentul în chat](../../../../../../translated_images/ro/step4-prompt-chat.12187bb001605efc.webp)

5. **Interogare live:**

   > Haideți să luăm o interogare live din secțiunea [#get-help](https://discord.gg/D6cRhjHWSC) în Microsoft Foundry Discord ([vizualizează mesajul original](https://discord.com/channels/1113626258182504448/1385498306720829572)):
   
   *"Caut răspunsuri despre cum să implementez o soluție multi-agent cu agenți AI dezvoltați pe Azure AI Foundry. Observ că nu există o metodă directă de implementare, cum ar fi canalele Copilot Studio. Deci, care sunt diferitele moduri de a face această implementare pentru ca utilizatorii enterprise să interacționeze și să finalizeze sarcinile?
Există numeroase articole/bloguri care spun că putem folosi serviciul Azure Bot pentru acest lucru, care poate acționa ca o punte între MS Teams și agenții Azure AI Foundry, dar va funcționa dacă configurez un bot Azure care se conectează la Agentul Orchestrator din Azure AI Foundry printr-o funcție Azure pentru a realiza orchestrarea sau trebuie să creez o funcție Azure pentru fiecare agent AI parte a soluției multi-agent pentru a face orchestrarea în Bot Framework? Orice alte sugestii sunt binevenite."*

   ![Pasul 5: Interogări live](../../../../../../translated_images/ro/step5-live-queries.49db3e4a50bea273.webp)

   Agentul va răspunde cu linkuri și rezumate relevante din documentație, pe care le poți insera direct în fișierele tale markdown sau le poți folosi ca referințe în cod.

### Interogări exemplu

Iată câteva interogări pe care le poți încerca. Aceste interogări vor demonstra cum serverul MCP și Copilot pot lucra împreună pentru a oferi documentație și referințe instantanee, adaptate contextului, fără a părăsi VS Code:

- "Arată-mi cum să folosesc trigger-ele Azure Functions."
- "Inserează un link către documentația oficială pentru Azure Key Vault."
- "Care sunt cele mai bune practici pentru securizarea resurselor Azure?"
- "Găsește un quickstart pentru serviciile Azure AI."

Aceste interogări vor demonstra cum serverul MCP și Copilot pot lucra împreună pentru a oferi documentație și referințe instantanee, adaptate contextului, fără a părăsi VS Code.

---

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). În timp ce ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un om. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite care decurg din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->