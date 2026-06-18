# 🚀 Modulo 1: Fondamenti di Microsoft Foundry Toolkit

[![Duration](https://img.shields.io/badge/Duration-15%20minutes-blue.svg)]()
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green.svg)]()
[![Prerequisites](https://img.shields.io/badge/Prerequisites-VS%20Code-orange.svg)]()

## 📋 Obiettivi di Apprendimento

Al termine di questo modulo, sarai in grado di:
- ✅ Installare e configurare l'estensione Microsoft Foundry Toolkit per VS Code
- ✅ Navigare nel Catalogo Modelli e comprendere le diverse fonti di modelli
- ✅ Usare il Playground per testare e sperimentare modelli
- ✅ Creare agenti AI personalizzati usando Agent Builder
- ✅ Confrontare le prestazioni dei modelli tra diversi provider
- ✅ Applicare le migliori pratiche per l'ingegneria dei prompt

## 🧠 Introduzione a Microsoft Foundry Toolkit

L'**Estensione Microsoft Foundry Toolkit per VS Code** è l'estensione di punta di Microsoft che trasforma VS Code in un ambiente di sviluppo AI completo. Colma il divario tra la ricerca AI e lo sviluppo di applicazioni pratiche, rendendo la AI generativa accessibile a sviluppatori di tutti i livelli di competenza.

### 🌟 Capacità Chiave

| Funzionalità | Descrizione | Caso d'uso |
|---------|-------------|----------|
| **🗂️ Catalogo Modelli** | Accesso a 100+ modelli da GitHub, ONNX, OpenAI, Anthropic, Google | Scoperta e selezione modelli |
| **🔌 Supporto BYOM** | Integra i tuoi modelli (locali/remoti) | Distribuzione modelli personalizzati |
| **🎮 Playground Interattivo** | Test in tempo reale con interfaccia chat | Prototipazione e test rapidi |
| **📎 Supporto Multi-Modale** | Gestione di testo, immagini e allegati | Applicazioni AI complesse |
| **⚡ Elaborazione Batch** | Eseguire più prompt simultaneamente | Workflow di test efficienti |
| **📊 Valutazione Modelli** | Metriche integrate (F1, rilevanza, similarità, coerenza) | Valutazione delle prestazioni |

### 🎯 Perché Microsoft Foundry Toolkit È Importante

- **🚀 Sviluppo Accelerato**: Dall'idea al prototipo in pochi minuti
- **🔄 Flusso di lavoro Unificato**: Un'interfaccia per più provider AI
- **🧪 Sperimentazione Facile**: Confronta modelli senza configurazioni complesse
- **📈 Pronto per la Produzione**: Passaggio fluido da prototipo a distribuzione

## 🛠️ Prerequisiti & Configurazione

### 📦 Installa l'Estensione Microsoft Foundry Toolkit

**Passo 1: Accedi al Marketplace delle Estensioni**
1. Apri Visual Studio Code
2. Naviga alla vista Estensioni (`Ctrl+Shift+X` o `Cmd+Shift+X`)
3. Cerca "Microsoft Foundry Toolkit"

**Passo 2: Scegli la tua versione**
- **🟢 Release**: Consigliata per uso in produzione
- **🔶 Pre-release**: Accesso anticipato a funzionalità all'avanguardia

**Passo 3: Installa e Attiva**

![Microsoft Foundry Toolkit Extension](../../../../translated_images/it/aitkext.d28945a03eed003c.webp)

### ✅ Checklist di Verifica
- [ ] L'icona Microsoft Foundry Toolkit appare nella barra laterale di VS Code
- [ ] L'estensione è abilitata e attivata
- [ ] Nessun errore di installazione nel pannello output

## 🧪 Esercizio Pratico 1: Esplorare i Modelli GitHub

**🎯 Obiettivo**: Padroneggiare il Catalogo Modelli e testare il tuo primo modello AI

### 📊 Passo 1: Naviga nel Catalogo Modelli

Il Catalogo Modelli è la tua porta d'accesso all'ecosistema AI. Aggrega modelli da più provider, facilitando la scoperta e il confronto.

**🔍 Guida alla Navigazione:**

Clicca su **MODELS - Catalog** nella barra laterale di Microsoft Foundry Toolkit

![Model Catalog](../../../../translated_images/it/aimodel.263ed2be013d8fb0.webp)

**💡 Consiglio Pro**: Cerca modelli con capacità specifiche che corrispondano al tuo caso d'uso (es. generazione codice, scrittura creativa, analisi).

**⚠️ Nota**: I modelli ospitati su GitHub (cioè GitHub Models) sono gratuiti ma soggetti a limiti di rate su richieste e token. Se vuoi accedere a modelli non-GitHub (cioè modelli esterni ospitati tramite Azure AI o altri endpoint), dovrai fornire la relativa chiave API o autenticazione.

### 🚀 Passo 2: Aggiungi e Configura il Tuo Primo Modello

**Strategia di Selezione Modello:**
- **GPT-4.1**: Ideale per ragionamenti complessi e analisi
- **Phi-4-mini**: Leggero, risposte rapide per compiti semplici

**🔧 Procedura di Configurazione:**
1. Seleziona **OpenAI GPT-4.1** dal catalogo
2. Clicca **Add to My Models** - registra il modello per l'uso
3. Scegli **Try in Playground** per avviare l'ambiente di prova
4. Attendi l'inizializzazione del modello (la prima configurazione potrebbe richiedere un momento)

![Playground Setup](../../../../translated_images/it/playground.dd6f5141344878ca.webp)

**⚙️ Comprendere i Parametri del Modello:**
- **Temperature**: Controlla la creatività (0 = deterministico, 1 = creativo)
- **Max Tokens**: Lunghezza massima della risposta
- **Top-p**: Campionamento nucleus per diversità di risposta

### 🎯 Passo 3: Padroneggiare l'Interfaccia del Playground

Il Playground è il tuo laboratorio di sperimentazione AI. Ecco come massimizzarne il potenziale:

**🎨 Best Practices per il Prompt Engineering:**
1. **Sii Specifico**: Istruzioni chiare e dettagliate portano a risultati migliori
2. **Fornisci Contesto**: Includi informazioni di fondo rilevanti
3. **Usa Esempi**: Mostra al modello cosa vuoi con esempi
4. **Itera**: Affina i prompt in base ai risultati iniziali

**🧪 Scenari di Test:**
```markdown
# Example 1: Code Generation
"Write a Python function that calculates the factorial of a number using recursion. Include error handling and docstrings."

# Example 2: Creative Writing
"Write a professional email to a client explaining a project delay, maintaining a positive tone while being transparent about challenges."

# Example 3: Data Analysis
"Analyze this sales data and provide insights: [paste your data]. Focus on trends, anomalies, and actionable recommendations."
```

![Testing Results](../../../../translated_images/it/result.1dfcf211fb359cf6.webp)

### 🏆 Esercizio Sfida: Confronto delle Prestazioni dei Modelli

**🎯 Obiettivo**: Confronta diversi modelli usando prompt identici per comprenderne i punti di forza

**📋 Istruzioni:**
1. Aggiungi **Phi-4-mini** al tuo spazio di lavoro
2. Usa lo stesso prompt per GPT-4.1 e Phi-4-mini

![set](../../../../translated_images/it/set.88132df189ecde2c.webp)

3. Confronta qualità della risposta, velocità e accuratezza
4. Documenta le tue osservazioni nella sezione risultati

![Model Comparison](../../../../translated_images/it/compare.97746cd0f9074955.webp)

**💡 Approfondimenti Chiave da Scoprire:**
- Quando usare LLM vs SLM
- Trade-off tra costo e prestazioni
- Capacità specializzate di diversi modelli

## 🤖 Esercizio Pratico 2: Creare Agenti Personalizzati con Agent Builder

**🎯 Obiettivo**: Creare agenti AI specializzati per compiti e workflow specifici

### 🏗️ Passo 1: Comprendere Agent Builder

Agent Builder è il vero punto di forza di Microsoft Foundry Toolkit. Permette di creare assistenti AI su misura che combinano la potenza di grandi modelli linguistici con istruzioni personalizzate, parametri specifici e conoscenze specializzate.

**🧠 Componenti dell'Architettura Agente:**
- **Modello Core**: LLM di base (GPT-4, Groks, Phi, ecc.)
- **System Prompt**: Definisce personalità e comportamento dell’agente
- **Parametri**: Impostazioni ottimizzate per prestazioni ideali
- **Integrazione Strumenti**: Connessione ad API esterne e servizi MCP
- **Memoria**: Contesto della conversazione e persistenza della sessione

![Agent Builder Interface](../../../../translated_images/it/agentbuilder.25895b2d2f8c02e7.webp)

### ⚙️ Passo 2: Approfondimento sulla Configurazione Agente

**🎨 Creare System Prompt Efficaci:**
```markdown
# Template Structure:
## Role Definition
You are a [specific role] with expertise in [domain].

## Capabilities
- List specific abilities
- Define scope of knowledge
- Clarify limitations

## Behavior Guidelines
- Response style (formal, casual, technical)
- Output format preferences
- Error handling approach

## Examples
Provide 2-3 examples of ideal interactions
```

*Naturalmente, puoi anche usare Generate System Prompt per farti aiutare dall'AI a generare e ottimizzare i prompt*

**🔧 Ottimizzazione Parametri:**
| Parametro | Intervallo Consigliato | Caso d'Uso |
|-----------|-----------------------|------------|
| **Temperature** | 0.1-0.3 | Risposte tecniche/fattuali |
| **Temperature** | 0.7-0.9 | Compiti creativi/brainstorming |
| **Max Tokens** | 500-1000 | Risposte concise |
| **Max Tokens** | 2000-4000 | Spiegazioni dettagliate |

### 🐍 Passo 3: Esercizio Pratico - Agente di Programmazione Python

**🎯 Missione**: Creare un assistente specializzato per codifica Python

**📋 Passi di Configurazione:**

1. **Selezione Modello**: Scegli **Claude 3.5 Sonnet** (eccellente per codice)

2. **Progettazione System Prompt**:
```markdown
# Python Programming Expert Agent

## Role
You are a senior Python developer with 10+ years of experience. You excel at writing clean, efficient, and well-documented Python code.

## Capabilities
- Write production-ready Python code
- Debug complex issues
- Explain code concepts clearly
- Suggest best practices and optimizations
- Provide complete working examples

## Response Format
- Always include docstrings
- Add inline comments for complex logic
- Suggest testing approaches
- Mention relevant libraries when applicable

## Code Quality Standards
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle exceptions gracefully
- Write readable, maintainable code
```

3. **Configurazione Parametri**:
   - Temperature: 0.2 (per codice affidabile e coerente)
   - Max Tokens: 2000 (spiegazioni dettagliate)
   - Top-p: 0.9 (creatività equilibrata)

![Python Agent Configuration](../../../../translated_images/it/pythonagent.5e51b406401c165f.webp)

### 🧪 Passo 4: Testare il Tuo Agente Python

**Scenari di Test:**
1. **Funzione Base**: "Crea una funzione per trovare numeri primi"
2. **Algoritmo Complesso**: "Implementa un albero di ricerca binaria con metodi inserisci, elimina e cerca"
3. **Problema Reale**: "Costruisci un web scraper che gestisca rate limiting e retry"
4. **Debugging**: "Correggi questo codice [incolla codice con errori]"

**🏆 Criteri di Successo:**
- ✅ Il codice funziona senza errori
- ✅ Include documentazione adeguata
- ✅ Rispetta le migliori pratiche Python
- ✅ Fornisce spiegazioni chiare
- ✅ Suggerisce miglioramenti

## 🎓 Conclusione Modulo 1 & Prossimi Passi

### 📊 Verifica delle Conoscenze

Metti alla prova la tua comprensione:
- [ ] Riesci a spiegare la differenza tra i modelli nel catalogo?
- [ ] Hai creato e testato con successo un agente personalizzato?
- [ ] Comprendi come ottimizzare i parametri per diversi casi d'uso?
- [ ] Sai progettare prompt di sistema efficaci?

### 📚 Risorse Aggiuntive

- **Documentazione Microsoft Foundry Toolkit**: [Docs Ufficiali Microsoft](https://github.com/microsoft/vscode-ai-toolkit)
- **Guida al Prompt Engineering**: [Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- **Modelli in Microsoft Foundry Toolkit**: [Modelli in Sviluppo](https://github.com/microsoft/vscode-ai-toolkit/blob/main/doc/models.md)

**🎉 Congratulazioni!** Hai padroneggiato i fondamenti di Microsoft Foundry Toolkit e sei pronto a costruire applicazioni AI più avanzate!

### 🔜 Continua al Modulo Successivo

Pronto per funzionalità più avanzate? Continua a **[Modulo 2: Fondamenti MCP con Microsoft Foundry Toolkit](../lab2/README.md)** dove imparerai a:
- Collegare i tuoi agenti a strumenti esterni usando Model Context Protocol (MCP)
- Creare agenti per automazione browser con Playwright
- Integrare server MCP con i tuoi agenti Microsoft Foundry Toolkit
- Potenziare i tuoi agenti con dati e capacità esterne

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Questo documento è stato tradotto utilizzando il servizio di traduzione AI [Co-op Translator](https://github.com/Azure/co-op-translator). Sebbene ci impegniamo per garantire la precisione, si prega di notare che le traduzioni automatizzate possono contenere errori o imprecisioni. Il documento originale nella sua lingua nativa deve essere considerato la fonte autorevole. Per informazioni critiche, si raccomanda una traduzione professionale effettuata da un essere umano. Non siamo responsabili per eventuali malintesi o interpretazioni errate derivanti dall’uso di questa traduzione.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->