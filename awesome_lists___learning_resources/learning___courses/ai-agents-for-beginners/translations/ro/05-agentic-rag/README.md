[![Agentic RAG](../../../translated_images/ro/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Faceți clic pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_

# Agentic RAG

Această lecție oferă o prezentare cuprinzătoare a Agentic Retrieval-Augmented Generation (Agentic RAG), un paradigme emergentă în AI în care modelele lingvistice mari (LLM) își planifică în mod autonom pașii următori în timp ce extrag informații din surse externe. Spre deosebire de modelele statice de tip retrieval-then-read, Agentic RAG implică apeluri iterative către LLM, presărate cu apeluri către instrumente sau funcții și output-uri structurate. Sistemul evaluează rezultatele, rafinează interogările, invocă instrumente suplimentare dacă este necesar și continuă acest ciclu până când se obține o soluție satisfăcătoare.

## Introduction

Această lecție va acoperi

- **Understand Agentic RAG:**  Aflați despre paradigma emergentă în AI în care modelele lingvistice mari (LLM) își planifică în mod autonom pașii următori în timp ce extrag informații din surse de date externe.
- **Grasp Iterative Maker-Checker Style:** Înțelegeți bucla apelurilor iterative către LLM, presărate cu apeluri către instrumente sau funcții și output-uri structurate, concepută pentru a îmbunătăți corectitudinea și a gestiona interogările malformate.
- **Explore Practical Applications:** Identificați scenarii în care Agentic RAG strălucește, cum ar fi medii în care corectitudinea este esențială, interacțiuni complexe cu baze de date și fluxuri de lucru extinse.

## Learning Goals

După finalizarea acestei lecții, veți ști cum să/înțelegeți:

- **Understanding Agentic RAG:** Aflați despre paradigma emergentă în AI în care modelele lingvistice mari (LLM) își planifică în mod autonom pașii următori în timp ce extrag informații din surse de date externe.
- **Iterative Maker-Checker Style:** Înțelegeți conceptul unei bucle de apeluri iterative către LLM, presărate cu apeluri către instrumente sau funcții și output-uri structurate, concepută pentru a îmbunătăți corectitudinea și a gestiona interogările malformate.
- **Owning the Reasoning Process:** Înțelegeți capacitatea sistemului de a-și asuma procesul de raționament, luând decizii asupra modului de abordare a problemelor fără a se baza pe căi predefinite.
- **Workflow:** Înțelegeți cum un model agentic decide în mod independent să recupereze rapoarte despre trendurile pieței, să identifice date despre concurenți, să coreleze metrici interne de vânzări, să sintetizeze concluziile și să evalueze strategia.
- **Iterative Loops, Tool Integration, and Memory:** Aflați despre dependența sistemului de un model de interacțiune în buclă, menținând stare și memorie pe tot parcursul pașilor pentru a evita bucle repetitive și pentru a lua decizii bine informate.
- **Handling Failure Modes and Self-Correction:** Explorați mecanismele robuste de autocorecție ale sistemului, inclusiv iterarea și re-interogarea, utilizarea instrumentelor de diagnostic și revenirea la supravegherea umană.
- **Boundaries of Agency:** Înțelegeți limitele Agentic RAG, concentrându-vă pe autonomie specifică domeniului, dependența de infrastructură și respectarea ghidurilor.
- **Practical Use Cases and Value:** Identificați scenarii în care Agentic RAG strălucește, cum ar fi medii în care corectitudinea este prioritară, interacțiuni complexe cu baze de date și fluxuri de lucru extinse.
- **Governance, Transparency, and Trust:** Aflați despre importanța guvernanței și transparenței, inclusiv raționamentul explicabil, controlul biasului și supravegherea umană.

## What is Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) este un paradigm emergent în AI în care modelele lingvistice mari (LLM) își planifică în mod autonom pașii următori în timp ce extrag informații din surse externe. Spre deosebire de modelele statice de tip retrieval-then-read, Agentic RAG implică apeluri iterative către LLM, presărate cu apeluri către instrumente sau funcții și output-uri structurate. Sistemul evaluează rezultatele, rafinează interogările, invocă instrumente suplimentare dacă este necesar și continuă acest ciclu până când se obține o soluție satisfăcătoare. Acest stil iterativ „maker-checker” îmbunătățește corectitudinea, gestionează interogările malformate și asigură rezultate de înaltă calitate.

Sistemul își asumă în mod activ procesul de raționament, rescriind interogările eșuate, alegând metode diferite de recuperare și integrând multiple instrumente — cum ar fi vector search în Azure AI Search, baze de date SQL sau API-uri personalizate — înainte de a-și finaliza răspunsul. Calitatea distinctivă a unui sistem agentic este capacitatea sa de a-și asuma propriul proces de raționament. Implementările tradiționale RAG se bazează pe căi predefinite, dar un sistem agentic determină în mod autonom secvența de pași pe baza calității informațiilor pe care le găsește.

## Defining Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) este un paradigm emergent în dezvoltarea AI în care LLM-urile nu doar extrag informații din surse de date externe, ci și își planifică în mod autonom pașii următori. Spre deosebire de modelele statice retrieval-then-read sau de secvențele de prompturi atent scriptate, Agentic RAG implică o buclă de apeluri iterative către LLM, presărate cu apeluri către instrumente sau funcții și output-uri structurate. La fiecare pas, sistemul evaluează rezultatele obținute, decide dacă trebuie să rafineze interogările, invocă instrumente suplimentare dacă este nevoie și continuă acest ciclu până când obține o soluție satisfăcătoare.

Acest stil iterativ „maker-checker” este conceput pentru a îmbunătăți corectitudinea, a gestiona interogările malformate către baze de date structurate (de ex. NL2SQL) și a asigura rezultate echilibrate și de înaltă calitate. În loc să se bazeze exclusiv pe lanțuri de prompturi atent proiectate, sistemul își asumă activ procesul de raționament. Poate rescrie interogările care eșuează, alege metode de recuperare diferite și integrează multiple instrumente — cum ar fi vector search în Azure AI Search, baze de date SQL sau API-uri personalizate — înainte de a finaliza răspunsul. Aceasta elimină necesitatea unor cadre de orchestrare excesiv de complexe. În schimb, o buclă relativ simplă de „apel LLM → utilizare instrument → apel LLM → …” poate genera output-uri sofisticate și bine fundamentate.

![Agentic RAG Core Loop](../../../translated_images/ro/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Owning the Reasoning Process

Calitatea distinctivă care face un sistem „agentic” este capacitatea sa de a-și asuma procesul de raționament. Implementările tradiționale RAG depind adesea de oameni care predefiniesc o cale pentru model: un chain-of-thought care descrie ce să recupereze și când. Dar atunci când un sistem este cu adevărat agentic, acesta decide intern cum să abordeze problema. Nu execută doar un script; determină în mod autonom secvența de pași pe baza calității informațiilor pe care le găsește.
De exemplu, dacă i se cere să creeze o strategie de lansare a unui produs, nu se bazează exclusiv pe un prompt care descrie întregul flux de lucru pentru cercetare și luarea deciziilor. În schimb, modelul agentic decide independent să:

1. Retrieve current market trend reports using Bing Web Grounding
2. Identify relevant competitor data using Azure AI Search.
3.	Correlate historical internal sales metrics using Azure SQL Database.
4. Synthesize the findings into a cohesive strategy orchestrated via Azure OpenAI Service.
5.	Evaluate the strategy for gaps or inconsistencies, prompting another round of retrieval if necessary.
Toate aceste etape — rafinarea interogărilor, alegerea surselor, iterarea până când este „mulțumit” de răspuns — sunt decise de model, nu pre-scriptate de un om.

## Iterative Loops, Tool Integration, and Memory

![Tool Integration Architecture](../../../translated_images/ro/tool-integration.0f569710b5c17c10.webp)

Un sistem agentic se bazează pe un model de interacțiune în buclă:

- **Initial Call:** Scopul utilizatorului (aka. promptul utilizatorului) este prezentat LLM-ului.
- **Tool Invocation:** Dacă modelul identifică informații lipsă sau instrucțiuni ambigue, selectează un instrument sau o metodă de recuperare — cum ar fi o interogare într-o bază de date vectorială (de ex. Azure AI Search Hybrid search over private data) sau un apel SQL structurat — pentru a aduna mai mult context.
- **Assessment & Refinement:** După revizuirea datelor returnate, modelul decide dacă informațiile sunt suficiente. Dacă nu, rafinează interogarea, încearcă un instrument diferit sau își ajustează abordarea.
- **Repeat Until Satisfied:** Acest ciclu continuă până când modelul determină că are suficientă claritate și dovezi pentru a oferi un răspuns final, bine fundamentat.
- **Memory & State:** Deoarece sistemul menține stare și memorie pe parcursul pașilor, poate reține încercările anterioare și rezultatele acestora, evitând buclele repetitive și luând decizii mai bine informate pe măsură ce avansează.

În timp, aceasta creează un sentiment de înțelegere în evoluție, permițând modelului să navigheze sarcini complexe în mai mulți pași fără a necesita intervenția constantă a unui om sau remodelarea promptului.

## Handling Failure Modes and Self-Correction

Autonomia Agentic RAG implică, de asemenea, mecanisme robuste de autocorecție. Când sistemul întâmpină impasuri — cum ar fi recuperarea unor documente irelevante sau întâlnirea unor interogări malformate — acesta poate:

- **Iterate and Re-Query:** În loc să returneze răspunsuri cu valoare scăzută, modelul încearcă noi strategii de căutare, rescrie interogările bazei de date sau consultă seturi de date alternative.
- **Use Diagnostic Tools:** Sistemul poate invoca funcții suplimentare concepute pentru a-l ajuta să depaneze pașii de raționament sau să confirme corectitudinea datelor recuperate. Instrumente precum Azure AI Tracing vor fi importante pentru a permite observabilitate și monitorizare robuste.
- **Fallback on Human Oversight:** Pentru scenarii cu miză mare sau care eșuează repetat, modelul poate semnala incertitudinea și solicita ghidare umană. Odată ce persoana oferă feedback corectiv, modelul poate încorpora acea lecție pe viitor.

Această abordare iterativă și dinamică permite modelului să se îmbunătățească continuu, asigurând că nu este doar un sistem one-shot, ci unul care învață din greșelile sale în timpul unei sesiuni date.

![Self Correction Mechanism](../../../translated_images/ro/self-correction.da87f3783b7f174b.webp)

## Boundaries of Agency

În ciuda autonomiei sale în cadrul unei sarcini, Agentic RAG nu este analog cu Inteligența Artificială Generală. Capacitățile sale „agentice” sunt limitate la instrumentele, sursele de date și politicile furnizate de dezvoltatorii umani. Nu își poate inventa propriile instrumente sau ieși în afara limitelor domeniului stabilite. În schimb, excelează în orchestrarea dinamică a resurselor la dispoziție.
Diferențe cheie față de formele mai avansate de AI includ:

1. **Domain-Specific Autonomy:** Sistemele Agentic RAG sunt concentrate pe atingerea obiectivelor definite de utilizator în cadrul unui domeniu cunoscut, folosind strategii precum rescrierea interogărilor sau selecția instrumentelor pentru a îmbunătăți rezultatele.
2. **Infrastructure-Dependent:** Capacitățile sistemului depind de instrumentele și datele integrate de dezvoltatori. Nu poate depăși aceste limite fără intervenție umană.
3. **Respect for Guardrails:** Ghidurile etice, regulile de conformitate și politicile de business rămân foarte importante. Libertatea agentului este întotdeauna constrânsă de măsurile de siguranță și mecanismele de supraveghere (sperăm).

## Practical Use Cases and Value

Agentic RAG strălucește în scenarii care necesită rafinare iterativă și precizie:

1. **Correctness-First Environments:** În verificări de conformitate, analize reglamentare sau cercetare juridică, modelul agentic poate verifica repetat faptele, consulta multiple surse și rescrie interogările până când produce un răspuns complet verificat.
2. **Complex Database Interactions:** Când se lucrează cu date structurate unde interogările pot eșua frecvent sau necesita ajustări, sistemul poate rafina autonom interogările folosind Azure SQL sau Microsoft Fabric OneLake, asigurând că recuperarea finală se aliniază cu intenția utilizatorului.
3. **Extended Workflows:** Sesiunile cu durată mai lungă se pot transforma pe măsură ce apar informații noi. Agentic RAG poate încorpora continuu date noi, schimbând strategiile pe măsură ce învață mai multe despre domeniul problemei.

## Governance, Transparency, and Trust

Pe măsură ce aceste sisteme devin mai autonome în raționamentul lor, guvernanța și transparența devin cruciale:

- **Explainable Reasoning:** Modelul poate oferi o pistă de audit a interogărilor pe care le-a făcut, a surselor consultate și a pașilor de raționament pe care i-a urmat pentru a ajunge la concluzie. Instrumente precum Azure AI Content Safety și Azure AI Tracing / GenAIOps pot ajuta la menținerea transparenței și la diminuarea riscurilor.
- **Bias Control and Balanced Retrieval:** Dezvoltatorii pot ajusta strategiile de recuperare pentru a asigura luarea în considerare a surselor de date echilibrate și reprezentative și pot audita periodic output-urile pentru a detecta bias sau tipare distorsionate folosind modele personalizate pentru organizații avansate de data science care utilizează Azure Machine Learning.
- **Human Oversight and Compliance:** Pentru sarcinile sensibile, revizuirea umană rămâne esențială. Agentic RAG nu înlocuiește judecata umană în deciziile cu miză mare — o completează prin furnizarea de opțiuni mai bine verificate.

A avea instrumente care oferă un registru clar al acțiunilor este esențial. Fără ele, depanarea unui proces în mai mulți pași poate fi foarte dificilă. Vezi exemplul următor de la Literal AI (company behind Chainlit) pentru o rulare a agentului:

![AgentRunExample](../../../translated_images/ro/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusion

Agentic RAG reprezintă o evoluție naturală în modul în care sistemele AI gestionează sarcini complexe, intensive în date. Prin adoptarea unui model de interacțiune în buclă, selectarea autonomă a instrumentelor și rafinarea interogărilor până la obținerea unui rezultat de înaltă calitate, sistemul trece dincolo de urmarea statică a prompturilor spre un factor de decizie mai adaptiv și conștient de context. Deși rămâne încadrat de infrastructuri și ghiduri etice definite de oameni, aceste capabilități agentice permit interacțiuni AI mai bogate, mai dinamice și, în final, mai utile pentru întreprinderi și utilizatori finali.

### Got More Questions about Agentic RAG?

Join the [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet with other learners, attend office hours and get your AI Agents questions answered.

## Additional Resources
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implementați Retrieval Augmented Generation (RAG) cu Azure OpenAI Service: Aflați cum să utilizați propriile date cu Azure OpenAI Service. Acest modul Microsoft Learn oferă un ghid cuprinzător privind implementarea RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Evaluarea aplicațiilor AI generative cu Microsoft Foundry: Acest articol acoperă evaluarea și compararea modelelor pe seturi de date disponibile public, inclusiv aplicații AI agentice și arhitecturi RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Ce este Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Un ghid complet pentru Retrieval Augmented Generation bazat pe agenți – Noutăți de la generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: turbocharge your RAG with query reformulation and self-query! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Adăugarea unor straturi agentice la RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Viitorul asistenților de cunoaștere: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Cum să construiești sisteme Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Utilizarea Microsoft Foundry Agent Service pentru a scala agenții AI</a>

### Lucrări academice

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Rafinare iterativă cu auto-feedback</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Agenți de limbaj cu învățare prin întărire verbală</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Modelele mari de limbaj se pot autocorecta prin criticare interactivă cu instrumente</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: O sinteză asupra Agentic RAG</a>

## Lecția anterioară

[Model de proiectare pentru utilizarea instrumentelor](../04-tool-use/README.md)

## Lecția următoare

[Construirea agenților AI de încredere](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să rețineți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă trebuie considerat sursa autoritativă. Pentru informații critice, se recomandă o traducere profesională efectuată de un traducător uman. Nu ne asumăm răspunderea pentru eventualele neînțelegeri sau interpretări greșite care rezultă din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->