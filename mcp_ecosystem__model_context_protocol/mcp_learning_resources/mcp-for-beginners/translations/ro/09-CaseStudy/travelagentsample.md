# Studiu de Caz: Agenții de Turism Azure AI – Implementare de Referință

## Prezentare generală

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) este o soluție de referință cuprinzătoare dezvoltată de Microsoft care demonstrează cum să construiești o aplicație de planificare a călătoriilor cu mai mulți agenți, alimentată de AI, folosind Model Context Protocol (MCP), Azure OpenAI și Azure AI Search. Acest proiect prezintă cele mai bune practici pentru a orchestra mai mulți agenți AI, a integra date de la întreprinderi și a oferi o platformă sigură și extensibilă pentru scenarii din lumea reală.

## Caracteristici cheie
- **Orchestrare Multi-Agent:** Utilizează MCP pentru a coordona agenți specializați (de exemplu, agenți de zboruri, hoteluri și itinerarii) care colaborează pentru a îndeplini sarcini complexe de planificare a călătoriilor.
- **Integrarea Datelor Enterprise:** Se conectează la Azure AI Search și alte surse de date enterprise pentru a furniza informații actualizate și relevante pentru recomandările de călătorie.
- **Arhitectură sigură și scalabilă:** Valorifică serviciile Azure pentru autentificare, autorizare și implementare scalabilă, urmând cele mai bune practici în securitatea enterprise.
- **Instrumente Extensibile:** Implementează unelte reutilizabile MCP și șabloane de prompturi care permit adaptarea rapidă la noi domenii sau cerințe de afaceri.
- **Experiență Utilizator:** Oferă o interfață conversațională pentru utilizatori pentru a interacționa cu agenții de turism, alimentată de Azure OpenAI și MCP.

## Arhitectură
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Descrierea Diagramei Arhitecturii

Soluția Azure AI Travel Agents este arhitecturată pentru modularitate, scalabilitate și integrare sigură a mai multor agenți AI și surse de date enterprise. Componentele principale și fluxul de date sunt următoarele:

- **Interfața Utilizator:** Utilizatorii interacționează cu sistemul printr-o interfață conversațională (cum ar fi un chat pe web sau un bot Teams), care trimite întrebările utilizatorului și primește recomandări de călătorie.
- **Server MCP:** Servește ca orchestrator central, primind input-ul utilizatorului, gestionând contextul și coordonând acțiunile agenților specializați (de exemplu, FlightAgent, HotelAgent, ItineraryAgent) prin Model Context Protocol.
- **Agenți AI:** Fiecare agent este responsabil pentru un domeniu specific (zboruri, hoteluri, itinerarii) și este implementat ca o unealtă MCP. Agenții utilizează șabloane de prompturi și logică pentru a procesa cererile și a genera răspunsuri.
- **Serviciul Azure OpenAI:** Oferă o înțelegere și generare avansată a limbajului natural, permițând agenților să interpreteze intenția utilizatorului și să genereze răspunsuri conversaționale.
- **Azure AI Search & Date Enterprise:** Agenții interoghează Azure AI Search și alte surse de date enterprise pentru a obține informații actualizate despre zboruri, hoteluri și opțiuni de călătorie.
- **Autentificare & Securitate:** Se integrează cu Microsoft Entra ID pentru autentificare sigură și aplică controale de acces cu privilegiu minim la toate resursele.
- **Implementare:** Proiectat pentru implementare pe Azure Container Apps, asigurând scalabilitate, monitorizare și eficiență operațională.

Această arhitectură permite o orchestrare fără întreruperi a mai multor agenți AI, integrare sigură cu datele enterprise și o platformă robustă și extensibilă pentru construirea de soluții AI specifice domeniului.

## Explicație pas cu pas a diagramei arhitecturii
Imaginează-ți că planifici o călătorie mare și ai o echipă de asistenți experți care te ajută cu fiecare detaliu. Sistemul Azure AI Travel Agents funcționează într-un mod similar, folosind părți diferite (ca membri ai echipei) care fiecare au un rol special. Iată cum se potrivește totul:

### Interfața Utilizator (UI):
Gândește-te la asta ca la recepția agentului tău de turism. Aici tu (utilizatorul) pui întrebări sau faci cereri, cum ar fi „Găsește-mi un zbor spre Paris.” Acesta poate fi o fereastră de chat pe un site web sau o aplicație de mesagerie.

### Server MCP (Coordonatorul):
Serverul MCP este ca un manager care ascultă cererea ta la recepție și decide care specialist ar trebui să se ocupe de fiecare parte. El păstrează evidența conversației și se asigură că totul funcționează lin.

### Agenți AI (Asistenți Specialiști):
Fiecare agent este expert într-un domeniu specific – unul știe totul despre zboruri, altul despre hoteluri și altul despre planificarea itinerariului. Când ceri o călătorie, Serverul MCP trimite cererea ta către agentul/agenții potriviți. Aceștia folosesc cunoștințele și uneltele lor pentru a găsi cele mai bune opțiuni pentru tine.

### Serviciul Azure OpenAI (Expertul Lingvistic):
Acesta este ca un expert în limbi care înțelege exact ce ceri, indiferent cum formulezi cererea. Ajută agenții să înțeleagă solicitările tale și să răspundă într-un mod natural și conversațional.

### Azure AI Search & Date Enterprise (Biblioteca de Informații):
Imaginează-ți o bibliotecă uriașă, mereu actualizată, cu toate cele mai noi informații despre călătorii – orare de zbor, disponibilitate hoteluri și altele. Agenții caută în această bibliotecă pentru a-ți oferi cele mai precise răspunsuri.

### Autentificare & Securitate (Paznicul de Securitate):
Asemenea unui paznic care verifică cine poate intra în anumite zone, această componentă se asigură că doar persoanele și agenții autorizați pot accesa informații sensibile. Îți păstrează datele în siguranță și confidențiale.

### Implementare pe Azure Container Apps (Clădirea):
Toți acești asistenți și unelte lucrează împreună într-o clădire sigură și scalabilă (cloud-ul). Aceasta înseamnă că sistemul poate gestiona mulți utilizatori simultan și este mereu disponibil când ai nevoie.

## Cum funcționează împreună:

Începi prin a pune o întrebare la recepție (UI).
Managerul (Server MCP) identifică specialistul (agentul) care să te ajute.
Specialistul folosește expertul lingvistic (OpenAI) pentru a înțelege cererea ta și biblioteca (AI Search) pentru a găsi cel mai bun răspuns.
Paznicul de securitate (Autentificarea) se asigură că totul este în siguranță.
Toate acestea au loc într-o clădire fiabilă și scalabilă (Azure Container Apps), astfel încât experiența ta să fie fluidă și sigură.
Această muncă în echipă permite sistemului să te ajute rapid și în siguranță să-ți planifici călătoria, la fel ca o echipă de agenți de turism experți care lucrează împreună într-un birou modern!

## Implementare Tehnică
- **Server MCP:** Găzduiește logica centrală de orchestrare, expune uneltele agenților și gestionează contextul pentru fluxurile de lucru multi-step de planificare a călătoriilor.
- **Agenți:** Fiecare agent (de exemplu, FlightAgent, HotelAgent) este implementat ca unealtă MCP cu propriile șabloane de prompturi și logică.
- **Integrarea Azure:** Folosește Azure OpenAI pentru înțelegerea limbajului natural și Azure AI Search pentru preluarea datelor.
- **Securitate:** Se integrează cu Microsoft Entra ID pentru autentificare și aplică controale de acces cu privilegiu minim la toate resursele.
- **Implementare:** Suportă implementarea pe Azure Container Apps pentru scalabilitate și eficiență operațională.

## Rezultate și Impact
- Demonstrează cum MCP poate fi folosit pentru a orchestra mai mulți agenți AI într-un scenariu real, de nivel producție.
- Accelerează dezvoltarea soluțiilor prin furnizarea de tipare reutilizabile pentru coordonarea agenților, integrarea datelor și implementarea securizată.
- Servește ca model pentru construirea de aplicații AI specifice domeniului folosind MCP și serviciile Azure.

## Referințe
- [Azure AI Travel Agents GitHub Repository](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## Ce urmează

- Înapoi la: [Case Studies Overview](./README.md)
- Următorul: [Updating ADO Items from YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare a responsabilității**:  
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autoritară. Pentru informații critice, se recomandă traducerea profesională realizată de un traducător uman. Nu ne asumăm responsabilitatea pentru eventualele neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->