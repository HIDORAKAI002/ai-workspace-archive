[![Cum să proiectăm agenți AI buni](../../../translated_images/ro/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Faceți clic pe imaginea de mai sus pentru a viziona videoclipul acestei lecții)_
# Principiile Designului Agentic AI

## Introducere

Există multe moduri de a gândi construirea Sistemelor Agentice AI. Având în vedere că ambiguitatea este o caracteristică și nu o eroare în designul AI generativ, uneori este dificil pentru ingineri să înțeleagă de unde să înceapă. Am creat un set de Principii de Design UX centrate pe om pentru a permite dezvoltatorilor să construiască sisteme agentice centrate pe client pentru a-și rezolva nevoile de business. Aceste principii de design nu sunt o arhitectură prescrisă ci mai degrabă un punct de plecare pentru echipele care definesc și construiesc experiențe agentice.

În general, agenții ar trebui să:

- Lărgească și să scaleze capacitățile umane (brainstorming, rezolvarea problemelor, automatizare etc.)
- Să acopere lacunele de cunoștințe (să mă pună la curent cu domeniile de cunoștințe, traducerea etc.)
- Să faciliteze și să sprijine colaborarea în modurile în care noi, ca indivizi, preferăm să lucrăm cu alții
- Să ne facă versiuni mai bune ale noastre înșine (de exemplu, antrenor de viață/manager de sarcini, ajutându-ne să învățăm reglarea emoțională și abilități de mindfulness, construind reziliență etc.)

## Ce va acoperi această lecție

- Ce sunt Principiile de Design Agentic
- Care sunt câteva linii directoare de urmat în implementarea acestor principii de design
- Exemple de utilizare a principiilor de design

## Obiective de învățare

După ce veți finaliza această lecție, veți putea:

1. Explica ce sunt Principiile de Design Agentic
2. Explica liniile directoare pentru utilizarea Principiilor de Design Agentic
3. Înțelege cum să construiți un agent folosind Principiile de Design Agentic

## Principiile de Design Agentic

![Principiile de Design Agentic](../../../translated_images/ro/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agent (Spațiu)

Acesta este mediul în care operează agentul. Aceste principii informează cum proiectăm agenții pentru a interacționa în lumi fizice și digitale.

- **Conectare, nu colapsare** – ajută la conectarea oamenilor cu alți oameni, evenimente și cunoștințe acționabile pentru a permite colaborarea și conexiunea.
- Agenții ajută la conectarea evenimentelor, cunoștințelor și oamenilor.
- Agenții aduc oamenii mai aproape unii de alții. Nu sunt proiectați să înlocuiască sau să minimalizeze oamenii.
- **Ușor accesibil, dar ocazional invizibil** – agentul operează în mare parte în fundal și ne atenționează doar când este relevant și potrivit.
  - Agentul este ușor de descoperit și accesibil pentru utilizatorii autorizați pe orice dispozitiv sau platformă.
  - Agentul suportă inputuri și outputuri multimodale (sunet, voce, text etc.).
  - Agentul poate face tranziția fără probleme între prim-plan și fundal; între proactiv și reactiv, în funcție de percepția nevoilor utilizatorului.
  - Agentul poate opera într-o formă invizibilă, dar ruta sa de procesare în fundal și colaborarea cu alți agenți sunt transparente și controlabile de către utilizator.

### Agent (Timp)

Aceasta este maniera în care agentul operează în timp. Aceste principii informează cum proiectăm agenții care interacționează peste trecut, prezent și viitor.

- **Trecut**: Reflectarea asupra istoriei care include atât starea cât și contextul.
  - Agentul oferă rezultate mai relevante bazate pe analiza datelor istorice mai bogate dincolo de eveniment, oameni sau stări.
  - Agentul creează conexiuni din evenimentele trecute și reflectă activ asupra memoriei pentru a se angaja în situații curente.
- **Acum**: Împingând mai mult decât notificând.
  - Agentul întruchipează o abordare cuprinzătoare pentru interacțiunea cu oamenii. Când se întâmplă un eveniment, Agentul merge dincolo de notificarea statică sau alte formalități statice. Agentul poate simplifica fluxurile sau genera dinamic indicii pentru a direcționa atenția utilizatorului în momentul potrivit.
  - Agentul oferă informații bazate pe mediul contextual, schimbările sociale și culturale și adaptate la intenția utilizatorului.
  - Interacțiunea agentului poate fi graduală, evoluând/dezvoltându-se în complexitate pentru a împuternici utilizatorii pe termen lung.
- **Viitor**: Adaptare și evoluție.
  - Agentul se adaptează la diverse dispozitive, platforme și modalități.
  - Agentul se adaptează la comportamentul utilizatorului, nevoile de accesibilitate și este personalizabil în mod liber.
  - Agentul este modelat și evoluează prin interacțiunea continuă cu utilizatorul.

### Agent (Nucleu)

Acestea sunt elementele cheie din nucleul designului unui agent.

- **Îmbrățișează incertitudinea, dar stabilește încrederea**.
  - Un anumit nivel de incertitudine a Agentului este de așteptat. Incertitudinea este un element cheie al designului agentului.
  - Încrederea și transparența sunt straturi fundamentale ale designului Agentului.
  - Oamenii controlează când Agentul este activ/inactiv, iar starea Agentului este vizibilă clar în orice moment.

## Ghiduri pentru implementarea acestor principii

Când utilizați principiile de design de mai sus, folosiți următoarele linii directoare:

1. **Transparență**: Informați utilizatorul că AI este implicat, cum funcționează (inclusiv acțiunile trecute), și cum să ofere feedback și să modifice sistemul.
2. **Control**: Permiteți utilizatorului să personalizeze, să specifice preferințe și să personalizeze, și să aibă control asupra sistemului și atributelor sale (inclusiv abilitatea de a uita).
3. **Consistență**: Țintiți experiențe consistente, multimodale pe diferite dispozitive și puncte finale. Utilizați elemente UI/UX familiare unde este posibil (de exemplu, iconița de microfon pentru interacțiunea vocală) și reduceți sarcina cognitivă a clientului cât mai mult posibil (de exemplu, răspunsuri concise, ajutoare vizuale și conținut „Află mai multe”).

## Cum să proiectați un Agent de Călătorii folosind aceste Principii și Ghiduri

Imaginați-vă că proiectați un Agent de Călătorii, iată cum ați putea gândi utilizarea Principiilor și Ghidurilor de Design:

1. **Transparență** – Informați utilizatorul că Agentul de Călătorii este un agent AI activat. Oferiți câteva instrucțiuni de bază despre cum să înceapă (de ex., un mesaj „Salut”, sugestii de prompturi). Documentați clar aceste informații pe pagina produsului. Arată lista de prompturi pe care utilizatorul le-a folosit în trecut. Clarificați cum se poate oferi feedback (degete în sus și în jos, butonul Trimitere Feedback etc.). Articulați clar dacă agentul are restricții privind utilizarea sau tema.
2. **Control** – Asigurați-vă că este clar cum utilizatorul poate modifica agentul după ce a fost creat cu elemente precum promptul de sistem. Permiteți utilizatorului să aleagă cât de verbose este agentul, stilul său de scriere și orice limitări despre ce nu ar trebui să discute agentul. Permiteți utilizatorului să vizualizeze și să șteargă orice fișiere sau date asociate, prompturi și conversații anterioare.
3. **Consistență** – Asigurați-vă că icoanele pentru partajarea promptului, adăugarea unui fișier sau fotografii și etichetarea cuiva sau ceva sunt standard și ușor de recunoscut. Folosiți iconița agrafă pentru a indica încărcarea/partajarea fișierelor cu agentul și o iconiță de imagine pentru a indica încărcarea graficelor.

## Coduri Exemple

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Aveți întrebări despre Modelele de Design Agentic AI?

Alăturați-vă [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) pentru a întâlni alți cursanți, a participa la orele de birou și a vă răspunde întrebărilor despre agenții AI.

## Resurse suplimentare

- <a href="https://openai.com" target="_blank">Practici pentru guvernarea sistemelor AI agentice | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Proiectul HAX Toolkit - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Responsabile AI Toolbox</a>

## Lecția anterioară

[Explorarea Framework-urilor Agentice](../02-explore-agentic-frameworks/README.md)

## Lecția următoare

[Model de design pentru utilizarea uneltelor](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Declinare de responsabilitate**:  
Acest document a fost tradus folosind serviciul de traducere AI [Co-op Translator](https://github.com/Azure/co-op-translator). Deși ne străduim pentru acuratețe, vă rugăm să fiți conștienți că traducerile automate pot conține erori sau inexactități. Documentul original în limba sa nativă ar trebui considerat sursa autorizată. Pentru informații critice, se recomandă traducerea profesională realizată de un specialist uman. Nu ne asumăm răspunderea pentru orice neînțelegeri sau interpretări greșite rezultate din utilizarea acestei traduceri.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->