[![Come Progettare Buoni Agenti AI](../../../translated_images/it/lesson-4-thumbnail.546162853cb3daff.webp)](https://youtu.be/vieRiPRx-gI?si=cEZ8ApnT6Sus9rhn)

> _(Clicca sull'immagine sopra per vedere il video di questa lezione)_

# Pattern di Progettazione per l'Uso di Strumenti

Gli strumenti sono interessanti perché permettono agli agenti AI di avere una gamma più ampia di capacità. Invece di avere un insieme limitato di azioni che l'agente può compiere, aggiungendo uno strumento, l'agente può ora eseguire una vasta gamma di azioni. In questo capitolo, esamineremo il Pattern di Progettazione per l'Uso di Strumenti, che descrive come gli agenti AI possono utilizzare strumenti specifici per raggiungere i loro obiettivi.

## Introduzione

In questa lezione, cercheremo di rispondere alle seguenti domande:

- Cos'è il pattern di progettazione per l'uso di strumenti?
- Quali sono i casi d'uso a cui può essere applicato?
- Quali sono gli elementi/blocchi costitutivi necessari per implementare il pattern di progettazione?
- Quali sono le considerazioni speciali per utilizzare il Pattern di Progettazione per l'Uso di Strumenti per costruire agenti AI affidabili?

## Obiettivi di Apprendimento

Dopo aver completato questa lezione, sarai in grado di:

- Definire il Pattern di Progettazione per l'Uso di Strumenti e il suo scopo.
- Identificare i casi d'uso in cui il Pattern di Progettazione per l'Uso di Strumenti è applicabile.
- Comprendere gli elementi chiave necessari per implementare il pattern di progettazione.
- Riconoscere le considerazioni per garantire l'affidabilità negli agenti AI che utilizzano questo pattern di progettazione.

## Cos'è il Pattern di Progettazione per l'Uso di Strumenti?

Il **Pattern di Progettazione per l'Uso di Strumenti** si concentra nel dare ai LLM la capacità di interagire con strumenti esterni per raggiungere obiettivi specifici. Gli strumenti sono codice che può essere eseguito da un agente per compiere azioni. Uno strumento può essere una funzione semplice come una calcolatrice, o una chiamata API a un servizio esterno come il controllo del prezzo delle azioni o la previsione del tempo. Nel contesto degli agenti AI, gli strumenti sono progettati per essere eseguiti dagli agenti in risposta a **chiamate di funzione generate dal modello**.

## A quali casi d'uso può essere applicato?

Gli agenti AI possono sfruttare gli strumenti per completare compiti complessi, recuperare informazioni o prendere decisioni. Il pattern di progettazione per l'uso di strumenti è spesso usato in scenari che richiedono un'interazione dinamica con sistemi esterni, come database, servizi web o interpreti di codice. Questa capacità è utile per diversi casi d'uso, tra cui:

- **Recupero Dinamico di Informazioni:** Gli agenti possono interrogare API esterne o database per ottenere dati aggiornati (ad esempio, interrogare un database SQLite per l'analisi dei dati, recuperare prezzi di azioni o informazioni meteo).
- **Esecuzione e Interpretazione del Codice:** Gli agenti possono eseguire codice o script per risolvere problemi matematici, generare rapporti o effettuare simulazioni.
- **Automazione dei Flussi di Lavoro:** Automatizzare flussi di lavoro ripetitivi o multi-step integrando strumenti come pianificatori di attività, servizi email o pipeline di dati.
- **Supporto Clienti:** Gli agenti possono interagire con sistemi CRM, piattaforme di ticketing o basi di conoscenza per risolvere le richieste degli utenti.
- **Generazione e Modifica di Contenuti:** Gli agenti possono sfruttare strumenti come correttori grammaticali, sintetizzatori di testi o valutatori di sicurezza dei contenuti per assistere nei compiti di creazione di contenuti.

## Quali sono gli elementi/blocchi necessari per implementare il pattern di uso strumenti?

Questi blocchi costitutivi permettono all'agente AI di svolgere una vasta gamma di compiti. Esaminiamo gli elementi chiave necessari per implementare il Pattern di Progettazione per l'Uso di Strumenti:

- **Schemi di Funzioni/Strumenti**: Definizioni dettagliate degli strumenti disponibili, inclusi nome della funzione, scopo, parametri richiesti e output attesi. Questi schemi permettono al LLM di comprendere quali strumenti sono disponibili e come costruire richieste valide.

- **Logica di Esecuzione delle Funzioni**: Regola come e quando gli strumenti vengono invocati in base all'intento dell'utente e al contesto della conversazione. Questo può comprendere moduli pianificatori, meccanismi di instradamento o flussi condizionali che determinano l'uso degli strumenti dinamicamente.

- **Sistema di Gestione dei Messaggi**: Componenti che gestiscono il flusso conversazionale tra input dell'utente, risposte del LLM, chiamate agli strumenti e output degli strumenti.

- **Framework di Integrazione degli Strumenti**: Infrastruttura che connette l'agente ai vari strumenti, siano essi funzioni semplici o servizi esterni complessi.

- **Gestione degli Errori e Validazione**: Meccanismi per gestire i fallimenti nell'esecuzione degli strumenti, validare i parametri e gestire risposte inattese.

- **Gestione dello Stato**: Tiene traccia del contesto della conversazione, delle interazioni precedenti con gli strumenti e dei dati persistenti per assicurare coerenza nelle interazioni multi-turno.

Passiamo ora ad analizzare nel dettaglio la Chiamata di Funzioni/Strumenti.
 
### Chiamata di Funzioni/Strumenti

La chiamata di funzioni è il modo principale con cui permettiamo ai Modelli di Linguaggio di Grandi Dimensioni (LLM) di interagire con gli strumenti. Vedrai spesso i termini 'Funzione' e 'Strumento' usati in modo intercambiabile perché le 'funzioni' (blocchi di codice riutilizzabile) sono gli 'strumenti' che gli agenti usano per portare a termine i compiti. Affinché venga eseguito il codice di una funzione, un LLM deve confrontare la richiesta dell'utente con la descrizione delle funzioni. Per fare questo, uno schema contenente le descrizioni di tutte le funzioni disponibili viene inviato al LLM. Il LLM seleziona quindi la funzione più appropriata per il compito e restituisce il suo nome e gli argomenti. La funzione selezionata viene invocata, la sua risposta viene inviata al LLM, che usa l'informazione per rispondere alla richiesta dell'utente.

Per gli sviluppatori che vogliono implementare la chiamata di funzioni per gli agenti, serviranno:

1. Un modello LLM che supporti la chiamata di funzioni
2. Uno schema contenente le descrizioni delle funzioni
3. Il codice per ogni funzione descritta

Usiamo l'esempio di ottenere l'ora corrente in una città per illustrare:

1. **Inizializzare un LLM che supporta la chiamata di funzioni:**

    Non tutti i modelli supportano la chiamata di funzioni, quindi è importante verificare che l'LLM che stai usando la supporti.     <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/function-calling" target="_blank">Azure OpenAI</a> supporta la chiamata di funzioni. Possiamo iniziare avviando il client OpenAI contro la **Responses API** di Azure OpenAI (l'endpoint stabile `/openai/v1/` — non è necessario `api_version`). 

    ```python
    # Inizializza il client OpenAI per Azure OpenAI (API Risposte, endpoint v1)
    client = OpenAI(
        base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT'].rstrip('/')}/openai/v1/",
        api_key=os.environ["AZURE_OPENAI_API_KEY"],
    )
    deployment_name = os.environ["AZURE_OPENAI_DEPLOYMENT"]
    ```

1. **Creare uno Schema di Funzione**:

    Successivamente definiremo uno schema JSON che contiene il nome della funzione, la descrizione di cosa fa la funzione, e i nomi e descrizioni dei parametri della funzione.
    Quindi passeremo questo schema al client creato precedentemente, insieme alla richiesta dell'utente per trovare l'ora a San Francisco. È importante notare che viene restituita una **chiamata a uno strumento**, **non** la risposta finale alla domanda. Come detto prima, l'LLM restituisce il nome della funzione che ha selezionato per il compito e gli argomenti che le saranno passati.

    ```python
    # Descrizione della funzione per la lettura del modello (formato flat tool API Risposte)
    tools = [
        {
            "type": "function",
            "name": "get_current_time",
            "description": "Get the current time in a given location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city name, e.g. San Francisco",
                    },
                },
                "required": ["location"],
            },
        }
    ]
    ```
   
    ```python
  
    # Messaggio iniziale dell'utente
    messages = [{"role": "user", "content": "What's the current time in San Francisco"}]

    # Prima chiamata API: chiedi al modello di usare la funzione
    response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        tool_choice="auto",
        store=False,
    )

    # L'API Responses restituisce le chiamate agli strumenti come elementi function_call in response.output.
    # Aggiungili alla conversazione in modo che il modello abbia il contesto completo nel turno successivo.
    messages += response.output

    print("Model's response:")
    print(response.output)
  
    ```

    ```bash
    Model's response:
    [ResponseFunctionToolCall(arguments='{"location":"San Francisco"}', call_id='call_pOsKdUlqvdyttYB67MOj434b', name='get_current_time', type='function_call')]
    ```
  
1. **Il codice della funzione necessario per portare a termine il compito:**

    Ora che l'LLM ha scelto quale funzione deve essere eseguita, il codice che svolge il compito deve essere implementato ed eseguito.
    Possiamo implementare il codice per ottenere l'ora corrente in Python. Dobbiamo anche scrivere il codice per estrarre il nome e gli argomenti dalla response_message per ottenere il risultato finale.

    ```python
      def get_current_time(location):
        """Get the current time for a given location"""
        print(f"get_current_time called with location: {location}")  
        location_lower = location.lower()
        
        for key, timezone in TIMEZONE_DATA.items():
            if key in location_lower:
                print(f"Timezone found for {key}")  
                current_time = datetime.now(ZoneInfo(timezone)).strftime("%I:%M %p")
                return json.dumps({
                    "location": location,
                    "current_time": current_time
                })
      
        print(f"No timezone data found for {location_lower}")  
        return json.dumps({"location": location, "current_time": "unknown"})
    ```

     ```python
    # Gestire le chiamate alle funzioni
    tool_calls = [item for item in response.output if item.type == "function_call"]
    if tool_calls:
        for tool_call in tool_calls:
            if tool_call.name == "get_current_time":

                function_args = json.loads(tool_call.arguments)

                time_response = get_current_time(
                    location=function_args.get("location")
                )

                # Restituire il risultato dello strumento come elemento function_call_output
                messages.append({
                    "type": "function_call_output",
                    "call_id": tool_call.call_id,
                    "output": time_response,
                })
    else:
        print("No tool calls were made by the model.")

    # Seconda chiamata API: ottenere la risposta finale dal modello
    final_response = client.responses.create(
        model=deployment_name,
        input=messages,
        tools=tools,
        store=False,
    )

    return final_response.output_text
     ```

     ```bash
      get_current_time called with location: San Francisco
      Timezone found for san francisco
      The current time in San Francisco is 09:24 AM.
     ```

La chiamata di funzioni è al centro della maggior parte, se non di tutto il design dell'uso strumenti negli agenti, tuttavia implementarla da zero può a volte essere impegnativo.
Come abbiamo appreso nella [Lezione 2](../../../02-explore-agentic-frameworks), i framework agentici ci forniscono blocchi pre-costruiti per implementare l'uso di strumenti.
 
## Esempi di Uso di Strumenti con Framework Agentici

Ecco alcuni esempi di come puoi implementare il Pattern di Progettazione per l'Uso di Strumenti usando diversi framework agentici:

### Microsoft Agent Framework

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Agent Framework</a> è un framework AI open-source per costruire agenti AI. Semplifica il processo di utilizzo della chiamata a funzioni permettendoti di definire gli strumenti come funzioni Python con il decoratore `@tool`. Il framework gestisce la comunicazione tra il modello e il tuo codice. Fornisce anche accesso a strumenti pre-costruiti come File Search e Code Interpreter tramite `FoundryChatClient`.

Il diagramma seguente illustra il processo di chiamata di funzione con il Microsoft Agent Framework:

![function calling](../../../translated_images/it/functioncalling-diagram.a84006fc287f6014.webp)

Nel Microsoft Agent Framework, gli strumenti sono definiti come funzioni decorate. Possiamo convertire la funzione `get_current_time` vista in precedenza in uno strumento usando il decoratore `@tool`. Il framework serializzerà automaticamente la funzione e i suoi parametri, creando lo schema da inviare al LLM.

```python
import os
from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="never_require")
def get_current_time(location: str) -> str:
    """Get the current time for a given location"""
    ...

# Crea il client
provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Crea un agente ed esegui con lo strumento
agent = provider.as_agent(name="TimeAgent", instructions="Use available tools to answer questions.", tools=get_current_time)
response = await agent.run("What time is it?")
```
  
### Microsoft Foundry Agent Service

<a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a> è un framework agentico più recente progettato per permettere agli sviluppatori di costruire, distribuire e scalare agenti AI di alta qualità ed estensibili in modo sicuro senza dover gestire le risorse di calcolo e storage sottostanti. È particolarmente utile per applicazioni enterprise in quanto è un servizio completamente gestito con sicurezza di livello enterprise.

Rispetto allo sviluppo diretto con l'API LLM, Microsoft Foundry Agent Service offre alcuni vantaggi, tra cui:

- Chiamata automatica degli strumenti – non è necessario analizzare una chiamata a uno strumento, invocare lo strumento e gestire la risposta; tutto questo ora avviene lato server
- Dati gestiti in modo sicuro – invece di gestire lo stato della conversazione, puoi affidarti ai threads per memorizzare tutte le informazioni necessarie
- Strumenti out-of-the-box – Strumenti che puoi usare per interagire con le tue fonti dati, come Bing, Azure AI Search e Azure Functions.

Gli strumenti disponibili in Microsoft Foundry Agent Service possono essere divisi in due categorie:

1. Strumenti di Conoscenza:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview" target="_blank">Grounding con Bing Search</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/file-search?tabs=python&pivots=overview" target="_blank">Ricerca File</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-ai-search?tabs=azurecli%2Cpython&pivots=overview-azure-ai-search" target="_blank">Azure AI Search</a>

2. Strumenti di Azione:
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/function-calling?tabs=python&pivots=overview" target="_blank">Chiamata di Funzioni</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/code-interpreter?tabs=python&pivots=overview" target="_blank">Code Interpreter</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/openapi-spec?tabs=python&pivots=overview" target="_blank">Strumenti definiti da OpenAPI</a>
    - <a href="https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/azure-functions?pivots=overview" target="_blank">Azure Functions</a>

Il Agent Service ci permette di poter utilizzare questi strumenti insieme come un `toolset`. Utilizza inoltre i `threads` che tengono traccia della cronologia dei messaggi di una particolare conversazione.

Immagina di essere un agente di vendita in un'azienda chiamata Contoso. Vuoi sviluppare un agente conversazionale che possa rispondere a domande riguardanti i dati di vendita.

L'immagine seguente illustra come potresti usare Microsoft Foundry Agent Service per analizzare i tuoi dati di vendita:

![Agentic Service In Action](../../../translated_images/it/agent-service-in-action.34fb465c9a84659e.webp)

Per usare uno qualsiasi di questi strumenti con il servizio possiamo creare un client e definire uno strumento o un toolset. Per implementare concretamente possiamo usare il seguente codice Python. L'LLM potrà guardare il toolset e decidere se usare la funzione creata dall'utente, `fetch_sales_data_using_sqlite_query`, o il Code Interpreter pre-costruito a seconda della richiesta dell'utente.

```python 
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from fetch_sales_data_functions import fetch_sales_data_using_sqlite_query # funzione fetch_sales_data_using_sqlite_query che si trova in un file fetch_sales_data_functions.py.
from azure.ai.projects.models import ToolSet, FunctionTool, CodeInterpreterTool

project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Inizializza il set di strumenti
toolset = ToolSet()

# Inizializza l'agente di chiamata funzione con la funzione fetch_sales_data_using_sqlite_query e la aggiunge al set di strumenti
fetch_data_function = FunctionTool(fetch_sales_data_using_sqlite_query)
toolset.add(fetch_data_function)

# Inizializza lo strumento Code Interpreter e lo aggiunge al set di strumenti.
code_interpreter = CodeInterpreterTool()toolset.add(code_interpreter)

agent = project_client.agents.create_agent(
    model="gpt-4.1-mini", name="my-agent", instructions="You are helpful agent", 
    toolset=toolset
)
```

## Quali sono le considerazioni speciali per usare il Pattern di Progettazione per l'Uso di Strumenti per costruire agenti AI affidabili?

Una preoccupazione comune con SQL generato dinamicamente da LLM è la sicurezza, in particolare il rischio di SQL injection o azioni malevole, come cancellare o manomettere il database. Sebbene queste preoccupazioni siano valide, possono essere efficacemente mitigate configurando adeguatamente i permessi di accesso al database. Per la maggior parte dei database questo comporta configurare il database in sola lettura. Per servizi di database come PostgreSQL o Azure SQL, l'app dovrebbe essere assegnata a un ruolo di sola lettura (SELECT).

Eseguire l'app in un ambiente sicuro aumenta ulteriormente la protezione. In scenari enterprise, i dati vengono tipicamente estratti e trasformati dai sistemi operativi in un database o data warehouse in sola lettura con uno schema user-friendly. Questo approccio garantisce che i dati siano sicuri, ottimizzati per prestazioni e accessibilità, e che l'app abbia accesso ristretto in sola lettura.

## Codici di Esempio

- Python: [Agent Framework](./code_samples/04-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/04-dotnet-agent-framework.md)

## Hai altre domande sul Pattern di Progettazione per l'Uso di Strumenti?

Unisciti a [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) per incontrare altri studenti, partecipare alle office hours e far rispondere alle tue domande sugli Agenti AI.

## Risorse Aggiuntive

- <a href="https://microsoft.github.io/build-your-first-agent-with-azure-ai-agent-service-workshop/" target="_blank">Workshop Azure AI Agents Service</a>
- <a href="https://github.com/Azure-Samples/contoso-creative-writer/tree/main/docs/workshop" target="_blank">Workshop Multi-Agente Contoso Creative Writer</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Panoramica Microsoft Agent Framework</a>


## Test di Fumo di Questo Agente (Opzionale)

Dopo aver imparato come distribuire agenti in [Lezione 16](../16-deploying-scalable-agents/README.md), puoi fare un test di fumo del `TravelToolAgent` di questa lezione (funziona ancora con i suoi strumenti e risponde?) con [`tests/lesson-04-smoke-tests.json`](../../../tests/lesson-04-smoke-tests.json). Vedi [`tests/README.md`](../tests/README.md) per sapere come eseguirlo.

## Lezione Precedente

[Comprendere i Pattern di Design Agentico](../03-agentic-design-patterns/README.md)

## Prossima Lezione

[Agentic RAG](../05-agentic-rag/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->