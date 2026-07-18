[![Esplorando i Framework per Agenti AI](../../../translated_images/it/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Clicca sull'immagine sopra per vedere il video di questa lezione)_

# Esplora i Framework per Agenti AI

I framework per agenti AI sono piattaforme software progettate per semplificare la creazione, il deployment e la gestione di agenti AI. Questi framework offrono agli sviluppatori componenti predefiniti, astrazioni e strumenti che facilitano lo sviluppo di sistemi AI complessi.

Questi framework aiutano gli sviluppatori a concentrarsi sugli aspetti unici delle loro applicazioni fornendo approcci standardizzati alle sfide comuni nello sviluppo di agenti AI. Migliorano la scalabilità, l'accessibilità e l'efficienza nella costruzione di sistemi AI.

## Introduzione 

Questa lezione tratterà:

- Cosa sono i Framework per Agenti AI e cosa consentono agli sviluppatori di realizzare?
- Come i team possono usare questi strumenti per prototipare rapidamente, iterare e migliorare le capacità del loro agente?
- Quali sono le differenze tra i framework e gli strumenti creati da Microsoft (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> e il <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Posso integrare direttamente gli strumenti del mio ecosistema Azure esistente o ho bisogno di soluzioni standalone?
- Cos'è Microsoft Foundry Agent Service e come mi aiuta?

## Obiettivi di apprendimento

Gli scopi di questa lezione sono aiutarti a comprendere:

- Il ruolo dei Framework per Agenti AI nello sviluppo AI.
- Come sfruttare i Framework per Agenti AI per costruire agenti intelligenti.
- Le capacità chiave abilitate dai Framework per Agenti AI.
- Le differenze tra Microsoft Agent Framework e Microsoft Foundry Agent Service.

## Cosa sono i Framework per Agenti AI e cosa permettono agli sviluppatori di fare?

I Framework AI tradizionali possono aiutarti a integrare l'AI nelle tue app e migliorare queste app nei seguenti modi:

- **Personalizzazione**: L'AI può analizzare il comportamento e le preferenze degli utenti per fornire raccomandazioni, contenuti ed esperienze personalizzate.
Esempio: Servizi di streaming come Netflix utilizzano l'AI per suggerire film e programmi in base alla cronologia di visione, migliorando l'engagement e la soddisfazione dell'utente.
- **Automazione ed Efficienza**: L'AI può automatizzare compiti ripetitivi, snellire i flussi di lavoro e migliorare l'efficienza operativa.
Esempio: App di assistenza clienti utilizzano chatbot basati su AI per gestire richieste comuni, riducendo i tempi di risposta e liberando gli agenti umani per problemi più complessi.
- **Esperienza utente migliorata**: L'AI può migliorare l'esperienza utente complessiva fornendo funzionalità intelligenti come riconoscimento vocale, elaborazione del linguaggio naturale e testo predittivo.
Esempio: Assistenti virtuali come Siri e Google Assistant utilizzano l'AI per comprendere e rispondere ai comandi vocali, facilitando l'interazione degli utenti con i loro dispositivi.

### Sembra tutto ottimo, giusto? Allora perché abbiamo bisogno del Framework per Agenti AI?

I framework per agenti AI rappresentano qualcosa di più rispetto ai semplici framework AI. Sono progettati per consentire la creazione di agenti intelligenti che possono interagire con gli utenti, altri agenti e l'ambiente per raggiungere obiettivi specifici. Questi agenti possono mostrare comportamenti autonomi, prendere decisioni e adattarsi a condizioni in evoluzione. Vediamo alcune capacità chiave abilitate dai Framework per Agenti AI:

- **Collaborazione e coordinamento degli agenti**: Consentono la creazione di più agenti AI che possono lavorare insieme, comunicare e coordinarsi per risolvere compiti complessi.
- **Automazione e gestione dei compiti**: Forniscono meccanismi per automatizzare flussi di lavoro multi-step, la delega di compiti e la gestione dinamica delle attività tra agenti.
- **Comprensione contestuale e adattamento**: Dotano gli agenti della capacità di comprendere il contesto, adattarsi a ambienti mutevoli e prendere decisioni basate su informazioni in tempo reale.

In sintesi, gli agenti ti permettono di fare di più, portare l'automazione al livello successivo, creare sistemi più intelligenti che possono adattarsi e apprendere dal loro ambiente.

## Come prototipare, iterare e migliorare rapidamente le capacità dell’agente?

Questo è un panorama in rapido movimento, ma alcune caratteristiche comuni nella maggior parte dei Framework per Agenti AI ti aiutano a prototipare e iterare rapidamente, in particolare componenti modulari, strumenti collaborativi e apprendimento in tempo reale. Approfondiamo questi punti:

- **Usa componenti modulari**: Gli SDK AI offrono componenti predefiniti come connettori AI e di memoria, chiamate di funzioni tramite linguaggio naturale o plugin di codice, template di prompt e altro ancora.
- **Sfrutta strumenti collaborativi**: Progetta agenti con ruoli e compiti specifici, permettendo loro di testare e perfezionare flussi di lavoro collaborativi.
- **Apprendi in tempo reale**: Implementa cicli di feedback in cui gli agenti apprendono dalle interazioni e adattano dinamicamente il loro comportamento.

### Usa componenti modulari

SDK come il Microsoft Agent Framework offrono componenti predefiniti come connettori AI, definizioni di strumenti e gestione degli agenti.

**Come i team possono usarli**: I team possono assemblare rapidamente questi componenti per creare un prototipo funzionale senza partire da zero, permettendo una sperimentazione e iterazione rapide.

**Come funziona in pratica**: Puoi utilizzare un parser predefinito per estrarre informazioni dall'input utente, un modulo memoria per archiviare e recuperare dati e un generatore di prompt per interagire con gli utenti, tutto senza dover costruire questi componenti da zero.

**Codice di esempio**. Vediamo un esempio di come usare il Microsoft Agent Framework con `FoundryChatClient` per far rispondere il modello all'input utente con chiamate a strumenti:

``` python
# Esempio di Microsoft Agent Framework in Python

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Definire una funzione di esempio per prenotare un viaggio
@tool(approval_mode="never_require")
def book_flight(date: str, location: str) -> str:
    """Book travel given location and date."""
    return f"Travel was booked to {location} on {date}"


async def main():
    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="travel_agent",
        instructions="Help the user book travel. Use the book_flight tool when ready.",
        tools=[book_flight],
    )

    response = await agent.run("I'd like to go to New York on January 1, 2025")
    print(response)
    # Esempio di output: Il tuo volo per New York il 1° gennaio 2025 è stato prenotato con successo. Buon viaggio! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

Da questo esempio puoi vedere come si può sfruttare un parser predefinito per estrarre informazioni chiave dall'input utente, come origine, destinazione e data di una richiesta di prenotazione volo. Questo approccio modulare ti permette di concentrarti sulla logica ad alto livello.

### Sfrutta strumenti collaborativi

Framework come il Microsoft Agent Framework facilitano la creazione di più agenti che possono lavorare insieme.

**Come i team possono usarli**: I team possono progettare agenti con ruoli e compiti specifici, permettendo loro di testare e perfezionare flussi di lavoro collaborativi e migliorare l'efficienza complessiva del sistema.

**Come funziona in pratica**: Puoi creare un team di agenti dove ciascun agente ha una funzione specializzata, come recupero dati, analisi o presa di decisioni. Questi agenti possono comunicare e condividere informazioni per raggiungere un obiettivo comune, come rispondere a una domanda utente o completare un compito.

**Codice di esempio (Microsoft Agent Framework)**:

```python
# Creazione di più agenti che lavorano insieme utilizzando il Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Agente di recupero dati
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Agente di analisi dati
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Eseguire gli agenti in sequenza su un compito
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

Nel codice precedente si vede come creare un'attività che coinvolge più agenti che lavorano insieme per analizzare dati. Ogni agente svolge una funzione specifica, e il compito viene eseguito coordinando gli agenti per raggiungere il risultato desiderato. Creando agenti dedicati con ruoli specializzati si può migliorare l'efficienza e le prestazioni del compito.

### Apprendi in tempo reale

Framework avanzati offrono capacità di comprensione contestuale e adattamento in tempo reale.

**Come i team possono usarli**: I team possono implementare cicli di feedback in cui gli agenti apprendono dalle interazioni e adattano il loro comportamento dinamicamente, portando a miglioramenti e perfezionamenti continui delle capacità.

**Come funziona in pratica**: Gli agenti possono analizzare feedback degli utenti, dati ambientali e risultati dei compiti per aggiornare la loro base di conoscenza, adattare gli algoritmi decisionali e migliorare le prestazioni nel tempo. Questo processo iterativo permette agli agenti di adattarsi a condizioni mutevoli e preferenze degli utenti, aumentando l'efficacia complessiva del sistema.

## Quali sono le differenze tra Microsoft Agent Framework e Microsoft Foundry Agent Service?

Ci sono molti modi per confrontare questi approcci, ma vediamo alcune differenze chiave in termini di design, capacità e casi d'uso target:

## Microsoft Agent Framework (MAF)

Microsoft Agent Framework offre un SDK semplificato per costruire agenti AI usando `FoundryChatClient`. Permette agli sviluppatori di creare agenti che sfruttano i modelli Azure OpenAI con chiamate a strumenti integrate, gestione della conversazione e sicurezza di livello aziendale tramite l'identità Azure.

**Casi d'uso**: Costruire agenti AI pronti per la produzione con uso di strumenti, flussi di lavoro multi-step e scenari di integrazione aziendale.

Ecco alcuni concetti fondamentali importanti del Microsoft Agent Framework:

- **Agenti**. Un agente viene creato tramite `FoundryChatClient` e configurato con un nome, istruzioni e strumenti. L'agente può:
  - **Processare i messaggi degli utenti** e generare risposte usando i modelli Azure OpenAI.
  - **Chiamare strumenti** automaticamente in base al contesto della conversazione.
  - **Mantenere lo stato della conversazione** attraverso molteplici interazioni.

  Ecco uno snippet di codice che mostra come creare un agente:

    ```python
    import os
    from agent_framework.foundry import FoundryChatClient
    from azure.identity import AzureCliCredential

    provider = FoundryChatClient(
        project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
        model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
        credential=AzureCliCredential(),
    )
    agent = provider.as_agent(
        name="my_agent",
        instructions="You are a helpful assistant.",
    )

    response = await agent.run("Hello, World!")
    print(response)
    ```

- **Strumenti**. Il framework supporta la definizione di strumenti come funzioni Python che l'agente può invocare automaticamente. Gli strumenti vengono registrati durante la creazione dell'agente:

    ```python
    def get_weather(location: str) -> str:
        """Get the current weather for a location."""
        return f"The weather in {location} is sunny, 72\u00b0F."

    agent = provider.as_agent(
        name="weather_agent",
        instructions="Help users check the weather.",
        tools=[get_weather],
    )
    ```

- **Coordinamento multi-agente**. Puoi creare più agenti con specializzazioni diverse e coordinare il loro lavoro:

    ```python
    planner = provider.as_agent(
        name="planner",
        instructions="Break down complex tasks into steps.",
    )

    executor = provider.as_agent(
        name="executor",
        instructions="Execute the planned steps using available tools.",
        tools=[execute_tool],
    )

    plan = await planner.run("Plan a trip to Paris")
    result = await executor.run(f"Execute this plan: {plan}")
    ```

- **Integrazione con Azure Identity**. Il framework utilizza `AzureCliCredential` (o `DefaultAzureCredential`) per un'autenticazione sicura senza chiavi, eliminando la necessità di gestire direttamente le chiavi API.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service è un'aggiunta più recente, introdotta a Microsoft Ignite 2024. Permette lo sviluppo e il deployment di agenti AI con modelli più flessibili, come la chiamata diretta a LLM open-source come Llama 3, Mistral e Cohere.

Microsoft Foundry Agent Service fornisce meccanismi di sicurezza enterprise più robusti e metodi di storage dei dati, rendendolo adatto ad applicazioni aziendali.

Funziona out-of-the-box con Microsoft Agent Framework per costruire e distribuire agenti.

Questo servizio è attualmente in anteprima pubblica e supporta Python e C# per la creazione di agenti.

Usando l'SDK Python di Microsoft Foundry Agent Service, possiamo creare un agente con uno strumento definito dall'utente:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Definire le funzioni degli strumenti
def get_specials() -> str:
    """Provides a list of specials from the menu."""
    return """
    Special Soup: Clam Chowder
    Special Salad: Cobb Salad
    Special Drink: Chai Tea
    """

def get_item_price(menu_item: str) -> str:
    """Provides the price of the requested menu item."""
    return "$9.99"


async def main() -> None:
    credential = DefaultAzureCredential()
    project_client = AIProjectClient.from_connection_string(
        credential=credential,
        conn_str="your-connection-string",
    )

    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="Host",
        instructions="Answer questions about the menu.",
        tools=[get_specials, get_item_price],
    )

    thread = project_client.agents.create_thread()

    user_inputs = [
        "Hello",
        "What is the special soup?",
        "How much does that cost?",
        "Thank you",
    ]

    for user_input in user_inputs:
        print(f"# User: '{user_input}'")
        message = project_client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=user_input,
        )
        run = project_client.agents.create_and_process_run(
            thread_id=thread.id, agent_id=agent.id
        )
        messages = project_client.agents.list_messages(thread_id=thread.id)
        print(f"# Agent: {messages.data[0].content[0].text.value}")


if __name__ == "__main__":
    asyncio.run(main())
```

### Concetti fondamentali

Microsoft Foundry Agent Service ha i seguenti concetti fondamentali:

- **Agente**. Microsoft Foundry Agent Service si integra con Microsoft Foundry. All'interno di Microsoft Foundry, un Agente AI agisce come un microservizio "intelligente" che può essere utilizzato per rispondere a domande (RAG), eseguire azioni o automatizzare completamente flussi di lavoro. Raggiunge questo combinando la potenza di modelli AI generativi con strumenti che gli permettono di accedere e interagire con fonti di dati reali. Ecco un esempio di un agente:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    In questo esempio, un agente viene creato con il modello `gpt-4.1-mini`, un nome `my-agent` e istruzioni `You are helpful agent`. L'agente è equipaggiato con strumenti e risorse per svolgere compiti di interpretazione del codice.

- **Thread e messaggi**. Il thread è un altro concetto importante. Rappresenta una conversazione o interazione tra un agente e un utente. I thread possono essere usati per tracciare il progresso di una conversazione, memorizzare informazioni contestuali e gestire lo stato dell'interazione. Ecco un esempio di thread:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Chiedi all'agente di eseguire il lavoro sul thread
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Recupera e registra tutti i messaggi per vedere la risposta dell'agente
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    Nel codice precedente, un thread viene creato. Successivamente, un messaggio viene inviato al thread. Chiamando `create_and_process_run`, si chiede all'agente di svolgere un lavoro sul thread. Infine, i messaggi vengono recuperati e registrati per vedere la risposta dell'agente. I messaggi indicano il progresso della conversazione tra utente e agente. È anche importante capire che i messaggi possono essere di diversi tipi come testo, immagine o file, cioè il lavoro degli agenti ha prodotto ad esempio un'immagine o una risposta testuale. Come sviluppatore, puoi poi usare queste informazioni per elaborare ulteriormente la risposta o mostrarla all'utente.

- **Si integra con Microsoft Agent Framework**. Microsoft Foundry Agent Service funziona perfettamente con Microsoft Agent Framework, il che significa che puoi costruire agenti usando `FoundryChatClient` e distribuirli tramite Agent Service per scenari di produzione.

**Casi d'uso**: Microsoft Foundry Agent Service è pensato per applicazioni aziendali che richiedono un deployment sicuro, scalabile e flessibile di agenti AI.

## Qual è la differenza tra questi approcci?
 
Sembra ci sia sovrapposizione, ma ci sono alcune differenze chiave in termini di design, capacità e casi d'uso target:
 
- **Microsoft Agent Framework (MAF)**: È un SDK pronto per la produzione per costruire agenti AI. Fornisce un'API semplificata per creare agenti con chiamate a strumenti, gestione della conversazione e integrazione di Azure identity.
- **Microsoft Foundry Agent Service**: È una piattaforma e un servizio di deployment in Microsoft Foundry per agenti. Offre connettività integrata a servizi come Azure OpenAI, Azure AI Search, Bing Search ed esecuzione di codice.
 
Ancora indeciso su quale scegliere?

### Casi d’uso
 
Vediamo se possiamo aiutarti esaminando alcuni casi d’uso comuni:
 
> Q: Sto costruendo applicazioni AI per agenti in produzione e voglio iniziare rapidamente
>

>A: Microsoft Agent Framework è una ottima scelta. Fornisce una API semplice e pythonica via `FoundryChatClient` che ti permette di definire agenti con strumenti e istruzioni in poche linee di codice.

>Q: Ho bisogno di un deployment di livello enterprise con integrazioni Azure come Search ed esecuzione di codice
>
> A: Microsoft Foundry Agent Service è la scelta migliore. È un servizio piattaforma che fornisce capacità integrate per più modelli, Azure AI Search, Bing Search e Azure Functions. Ti permette di costruire i tuoi agenti nel Portale Foundry e distribuirli su larga scala.
 
> Q: Sono ancora confuso, dammi solo un’opzione
>
> A: Inizia con Microsoft Agent Framework per costruire i tuoi agenti, poi usa Microsoft Foundry Agent Service quando necessiti distribuirli e scalarli in produzione. Questo approccio ti consente di iterare rapidamente sulla logica degli agenti avendo una chiara strada verso il deployment enterprise.
 
Riassumiamo le differenze chiave in una tabella:

| Framework | Focus | Concetti Core | Casi d’Uso |
| --- | --- | --- | --- |
| Microsoft Agent Framework | SDK agenti semplificato con chiamate a strumenti | Agenti, Strumenti, Azure Identity | Costruzione agenti AI, uso strumenti, flussi multi-step |
| Microsoft Foundry Agent Service | Modelli flessibili, sicurezza enterprise, generazione codice, chiamate a strumenti | Modularità, Collaborazione, Orchestrazione Processi | Deployment agenti AI sicuro, scalabile e flessibile |

## Posso integrare direttamente gli strumenti del mio ecosistema Azure esistente o ho bisogno di soluzioni standalone?


La risposta è sì, puoi integrare direttamente i tuoi strumenti esistenti dell'ecosistema Azure con Microsoft Foundry Agent Service soprattutto, poiché è stato progettato per funzionare senza problemi con altri servizi Azure. Potresti ad esempio integrare Bing, Azure AI Search e Azure Functions. C'è anche una profonda integrazione con Microsoft Foundry.

Il Microsoft Agent Framework si integra inoltre con i servizi Azure tramite `FoundryChatClient` e l'identità Azure, permettendoti di chiamare direttamente i servizi Azure dai tuoi strumenti agenti.

## Codici di esempio

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Hai altre domande sugli AI Agent Framework?

Unisciti a [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) per incontrare altri studenti, partecipare a sessioni di supporto e ottenere risposte alle tue domande sugli AI Agents.

## Riferimenti

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Lezione precedente

[Introduzione agli AI Agents e casi d'uso degli agenti](../01-intro-to-ai-agents/README.md)

## Lezione successiva

[Comprendere i modelli di progettazione agentica](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->