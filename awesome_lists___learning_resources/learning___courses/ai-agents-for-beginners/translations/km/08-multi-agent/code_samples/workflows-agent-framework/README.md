# ការបង្កើតកម្មវិធីច្រើនភ្នាក់ងារ ជាមួយ Microsoft Agent Framework Workflow

មេរៀននេះនឹងណែនាំអ្នកពីការយល់ដឹង និងការបង្កើតកម្មវិធីច្រើនភ្នាក់ងារ ដោយប្រើ Microsoft Agent Framework។ យើងនឹងស្វែងយល់ពីមូលដ្ឋានគ្រឹះនៃប្រព័ន្ធច្រើនភ្នាក់ងារ កិច្ចសំណើរផ្នែកសំណុំរចនាសម្ព័ន្ធរបស់ Workflow ហើយតាមដានឧទាហរណ៍ប្រើប្រាស់ជាក់ស្តែងទាំង Python និង .NET សម្រាប់លំនាំការងារផ្សេងៗ។

## 1\. យល់ដឹងអំពីប្រព័ន្ធច្រើនភ្នាក់ងារ

Agent AI គឺជាប្រព័ន្ធដែលលើសពីសមត្ថភាពរបស់ Large Language Model (LLM) ស្តង់ដារ។ វាអាចយល់ស្គាល់បរិដ្ឋាន សម្រេចចិត្ត ហើយអនុវត្តន៍សកម្មភាពដើម្បីសម្រេចនូវគោលដៅជាក់លាក់មួយ។ ប្រព័ន្ធច្រើនភ្នាក់ងារ មានភ្នាក់ងារច្រើនដែលសហការគ្នា ដើម្បីដោះស្រាយបញ្ហាមួយដែលភ្នាក់ងារតែមួយមិនអាចដោះស្រាយឬពិបាកក្នុងការដោះស្រាយបាន។

### ស្ថានการณ์ពេញចិត្តក្នុងកម្មវិធី

  * **ដោះស្រាយបញ្ហាស្មុគស្មាញ**: បំបែកកិច្ចការធំមួយ (ឧ. រៀបចំព្រឹត្តិការណ៍ជាក្រុមហ៊ុនទាំងមូល) ទៅជាកិច្ចការរងតូចៗ ដែលភ្នាក់ងារពិសេសៗជួសជុល (ឧ. ភ្នាក់ងារ​ថវិកា, ភ្នាក់ងារ​ដឹកជញ្ជូន, ភ្នាក់ងារទីផ្សារ)។
  * **ជំនួយគាំទ្រថតវីឌីអូ**: ភ្នាក់ងារជំនួយមួយដឹកនាំកិច្ចការដូចជាកំណត់កាលវិភាគ ស្រាវជ្រាវ និងកក់ ជូនទៅភ្នាក់ងារ​ពិសេសផ្សេងៗ។
  * **បង្កើតមាតិកាដោយស្វ័យប្រវត្តិ**: វិធីសាស្រ្តមួយដែលភ្នាក់ងារមួយរៀបចំខ Dra�t មាតិកា ភ្នាក់ងារមួយផ្សេងពិនិត្យអំពីភាពត្រឹមត្រូវនិងសម្លេង ហើយភ្នាក់ងារមួយផ្សេងទៀតបោះពុម្ពផ្សាយ។

### លំនាំប្រព័ន្ធច្រើនភ្នាក់ងារ

ប្រព័ន្ធច្រើនភ្នាក់ងារ អាចត្រូវបានរៀបចំក្នុងលំនាំជាច្រើន ដែលកំណត់របៀបដែលពួកវាផ្ទាក់ទំនាក់ទំនងគ្នា៖

  * **រៀងតាមលំដាប់ (Sequential)**: ភ្នាក់ងារធ្វើការតាមលំដាប់ដែលបានកំណត់ ម្យ៉ាងដូចជាស្វុច្ឆនិក។ ផលបញ្ចេញពីភ្នាក់ងារមួយក្លាយជាការបញ្ចូលសម្រាប់ភ្នាក់ងារបន្ទាប់។
  * **សមកាលិក (Concurrent)**: ភ្នាក់ងារធ្វើការដូចគ្នាប្រកបដោយសមកាលិកលើផ្នែកផ្សេងៗនៃកិច្ចការ ហើយលទ្ធផលរបស់ពួកវាត្រូវបានបញ្ចូលជាអ្នកសរុបនៅចុងក្រោយ។
  * **លក្ខខណ្ឌ (Conditional)**: Workflow នាំអោយដើរតាមផ្លូវផ្សេងៗ ដោយផ្អែកលើលទ្ធផលពីភ្នាក់ងារ ទុក្ខណៈដូចជា if-then-else។

## 2\. វិទ្យាស្ថានស្ថាបត្យកម្ម Microsoft Agent Framework Workflow

ប្រព័ន្ធ workflow របស់ Agent Framework ជាម៉ាស៊ីនរៀបចំនិងគ្រប់គ្រងចុងក្រោយដែលរចនាឡើងដើម្បីគ្រប់គ្រងការទំនាក់ទំនងស្មុគស្មាញរវាងភ្នាក់ងារច្រើន។ វាត្រូវបានសាងសង់លើស្ថាបត្យកម្មប្លង់ក្រាហ្វដែលប្រើ [Pregel-style execution model](https://kowshik.github.io/JPregel/pregel_paper.pdf) ដែលកំណត់ថាការដំណើរការមាននៅក្នុងជំហានដែលត្រូវបានសមកាលិកហៅថា "supersteps"។

### ធាតុស្នូល

ស្ថាបត្យកម្មត្រូវបានសមាសធាតុជាបីផ្នែកសំខាន់ៗ៖

1.  **Executors**: នេះគឺជាឯកតាដំណើរការមូលដ្ឋាន។ នៅក្នុងឧទាហរណ៍របស់យើង `Agent` គឺជា​ប្រភេទនៃ executor។ រាល់ executor អាចមានអ្នកដំណើរការសារ (message handlers) ច្រើន ដែលត្រូវបានហៅដោយស្វ័យប្រវត្តិ ផ្អែកលើប្រភេទសារដែលទទួលបាន។
2.  **Edges**: វាកំណត់ផ្លូវដែលសារធ្វើដំណើរវាង executors។ Edges អាចមានលក្ខខណ្ឌ ដែលអនុញ្ញាតឱ្យមានការ​រៀបចំ​ផ្លូវព័ត៌មានឱ្យមាន​ភាពបត់បែនតាមលំនាំក្រាហ្វ workflow។
3.  **Workflow**: ធាតុនេះរៀបចំដំណើរទាំងមូល គ្រប់គ្រង executors, edges និងលំនឹងនៃការអនុវត្ត។ វាធានាថាសារត្រូវបានដំណើរការផ្អែកលើលំដាប់ត្រឹមត្រូវ និងបញ្ចេញព្រឹត្តិការណ៍សម្រាប់ការអង្កេតមើល។

*រូបភាពបង្ហាញអំពីធាតុស្នូលនៅក្នុងប្រព័ន្ធ workflow។*

រចនាសម្ព័ន្ធនេះអនុញ្ញាតឱ្យសាងសង់កម្មវិធីរឹងមាំ និងអាចពង្រីកបាន ដោយប្រើលំនាំមូលដ្ឋានដូចជា ខ្សែតាមលំដាប់ (sequential chains), fan-out/fan-in សម្រាប់ដំណើរការសមកាលិក និងលទ្ធសាស្ត្រ switch-case សម្រាប់លំហូរដែលមានលក្ខខណ្ឌ។

## 3\. ឧទាហរណ៍ជាក់ស្តែង និងវិភាគកូដ

ឥឡូវនេះ យើងមកស្វែងយល់ពីរបៀបអនុវត្តលំនាំ workflow ផ្សេងៗ ដោយប្រើ framework។ យើងនឹងមើលកូដទាំង Python និង .NET សម្រាប់រៀងរាល់ឧទាហរណ៍។

### Case 1: Basic Sequential Workflow

នេះគឺជាលំនាំសាមញ្ញបំផុត ដែលផលបញ្ចេញពីភ្នាក់ងារមួយត្រូវបានផ្ទេរប្រយោគទៅភ្នាក់ងារផ្សេងទៀត។ ស្ថានភាពរបស់យើងជាភ្ញៀវសណ្ឋាគារមួយដែលមានភ្នាក់ងារ `FrontDesk` ផ្តល់អនុសាសន៍ដំណើរកម្សាន្ត ហើយបន្ទាប់មកត្រូវបានពិនិត្យឡើងវិញដោយភ្នាក់ងារ `Concierge`។

*រូបភាពនៃ workflow មូលដ្ឋាន FrontDesk -\> Concierge។*

#### Scenario Background

អ្នកធ្វើដំណើរម្នាក់ស្នើរសុំអនុសាសន៍នៅទីក្រុង Paris ។

1.  ភ្នាក់ងារ `FrontDesk` ដែលរចនាចេញជា​ចំណុចខ្លី ផ្ដល់អនុសាសន៍ទៅលើការទស្សនាសារមន្ទីរ Louvre។
2.  ភ្នាក់ងារ `Concierge` ដែលផ្តោតលើបទពិសោធន៍ដើមទទួលបានអនុសាសន៍នេះ។ វាសុៀងពិនិត្យវិចារណា និងផ្តល់មតិយោបល់ ដោយស្នើអនុសាសន៍ជាជម្រើសម្យ៉ាងដែលមានបរិយាកាសសៀវភៅកាន់តែទៀងទាត់ជាមួយម៉ូលដ្ឋានតំបន់។

#### Python Implementation Analysis

នៅក្នុងឧទាហរណ៍ Python យើងកំណត់ និងបង្កើតភ្នាក់ងារទាំងពីរដែលមានសេចក្តីណែនាំជាក់លាក់ជារៀងរាល់។

```python
# 01.python-agent-framework-workflow-ghmodel-basic.ipynb

# កំណត់តួនាទី និងការណែនាំរបស់ភ្នាក់ងារ
REVIEWER_NAME = "Concierge"
REVIEWER_INSTRUCTIONS = """
    You are an are hotel concierge who has opinions about providing the most local and authentic experiences for travelers...
    """

FRONTDESK_NAME = "FrontDesk"
FRONTDESK_INSTRUCTIONS = """
    You are a Front Desk Travel Agent with ten years of experience and are known for brevity...
    """

# បង្កើតវត្ថុ (instances) របស់ភ្នាក់ងារ
reviewer_agent = chat_client.create_agent(
    instructions=(REVIEWER_INSTRUCTIONS),
    name=REVIEWER_NAME,
)

front_desk_agent = chat_client.create_agent(
    instructions=(FRONTDESK_INSTRUCTIONS),
    name=FRONTDESK_NAME,
)
```

បន្ទាប់មក `WorkflowBuilder` ត្រូវបានប្រើដើម្បីកសាងក្រាហ្វ។ `front_desk_agent` ត្រូវ​បានកំណត់ជា​ចំណុចចាប់ផ្តើម ហើយមានការបង្កើត edge ដើម្បីភ្ជាប់ផលបញ្ចេញរបស់វាទៅកាន់ `reviewer_agent`។

```python
# 01.ភាយថុន-ភ្នាក់ងារ-រចនាសម្ព័ន្ធ-លំហូរការងារ-ghmodel-មូលដ្ឋាន.ipynb

workflow = WorkflowBuilder().set_start_executor(front_desk_agent).add_edge(front_desk_agent, reviewer_agent).build()
```

ចុងក្រោយ workflow ត្រូវបានអនុវត្តជាមួយ prompt ដើមពីអ្នកប្រើ។

```python
# 01.python-agent-framework-workflow-ghmodel-basic.ipynb

result =''
# វិធីសាស្ត្រ run_stream អនុវត្តលំហូរការងារ ហើយផ្សាយព្រឹត្តិការណ៍ជាបន្ត។
async for event in workflow.run_stream('I would like to go to Paris.'):
    if isinstance(event, WorkflowEvent):
        result += str(event.data)
```

#### .NET (C\#) Implementation Analysis

ការអនុវត្ត់ក្នុង .NET មានយុទ្ធសាស្ត្រដូចគ្នាដោយប្រភពសាមញ្ញ។ ជាមុនសិន កំណត់ constants សម្រាប់ឈ្មោះភ្នាក់ងារ និងសេចក្តីណែនាំ។

```csharp
// 01.dotnet-agent-framework-workflow-ghmodel-basic.ipynb

const string ReviewerAgentName = "Concierge";
const string ReviewerAgentInstructions = @"
    You are an are hotel concierge who has opinions about providing the most local and authentic experiences for travelers...";

const string FrontDeskAgentName = "FrontDesk";
const string FrontDeskAgentInstructions = @"""
    You are a Front Desk Travel Agent with ten years of experience and are known for brevity...";
```

ភ្នាក់ងារទាំងនេះត្រូវបានបង្កើតដោយប្រើ `OpenAIClient` ហើយ `WorkflowBuilder` កំណត់លំហូរ sequential ដោយបន្ថែម edge ពី `frontDeskAgent` ទៅ `reviewerAgent`។

```csharp
// 01.dotnet-agent-framework-workflow-ghmodel-basic.ipynb

// Create AIAgent instances
AIAgent reviewerAgent = openAIClient.GetChatClient(github_model_id).CreateAIAgent(
    name:ReviewerAgentName,instructions:ReviewerAgentInstructions);
AIAgent frontDeskAgent  = openAIClient.GetChatClient(github_model_id).CreateAIAgent(
    name:FrontDeskAgentName,instructions:FrontDeskAgentInstructions);

// Build the workflow
var workflow = new WorkflowBuilder(frontDeskAgent)
            .AddEdge(frontDeskAgent, reviewerAgent)
            .Build();
```

បន្ទាប់មក workflow ត្រូវបានរត់ជាមួយសារ​របស់អ្នកប្រើ និងលទ្ធផលត្រូវបានចំហាយតាម stream។

### Case 2: Multi-Step Sequential Workflow

លំនាំនេះពង្រីកលំដាប់មូលដ្ឋាន ដើម្បីរួមបញ្ចូលភ្នាក់ងារច្រើន។ វាសមសម្រាប់ដំណើរការដែលត្រូវការវគ្គច្រើនសម្រាប់ការកែលម្អ ឬបម្លែង។

#### Scenario Background

អ្នកប្រើផ្តល់រូបភាពនៃបន្ទប់ទទួលភ្ញៀវ និងស្នើរសុំសម្រង់តម្លៃសង្ឃឹមរស់រឿងបរិក្ខារ។

1.  **Sales-Agent**: កំណត់ផលិតផលគ្រឿងសង្ហារឹមក្នុងរូប និងបង្កើតបញ្ជី។
2.  **Price-Agent**: យកបញ្ជីធាតុនោះ ហើយផ្តល់ការបំបែកតម្លៃលម្អិត រួមមានជម្រើសថវិកា មធ្យម និងពេញលេញ។
3.  **Quote-Agent**: ទទួលបានបញ្ជីដែលមានតម្លៃ ហើយបំលែងវាចូលជា ឯកសារ Quote ជារបៀប Markdown។

*រូបភាពនៃ Sales -\> Price -\> Quote workflow។*

#### Python Implementation Analysis

ភ្នាក់ងារបីត្រូវបានកំណត់ គ្រប់នាក់មានតួនាទីពិសេស។ Workflow ត្រូវបានកសាងដោយប្រើ `add_edge` ដើម្បីបង្កើតខ្សែ៖ `sales_agent` -\> `price_agent` -\> `quote_agent`។

```python
# 02.python-agent-framework-workflow-ghmodel-sequential.ipynb

# បង្កើតភ្នាក់ងារពិសេសបីរូប
sales_agent = chat_client.create_agent(...)
price_agent = chat_client.create_agent(...)
quote_agent = chat_client.create_agent(...)

# បង្កើតលំហូរងារតាមលំដាប់
workflow = WorkflowBuilder().set_start_executor(sales_agent).add_edge(sales_agent, price_agent).add_edge(price_agent, quote_agent).build()
```

ការបញ្ចូលគឺជា `ChatMessage` ដែលរួមមានអត្ថបទ និង URI រូបភាព។ Framework នាំយកការផ្ទេរផលបញ្ចេញពីភ្នាក់ងារមួយទៅអ្នកបន្ទាប់រហូតដល់ការផលិតសម្រង់ចុងក្រោយ។

```python
# 02.python-agent-framework-workflow-ghmodel-sequential.ipynb

# សាររបស់អ្នកប្រើមានទាំងអត្ថបទ និងរូបភាព
message = ChatMessage(
        role=Role.USER,
        contents=[
            TextContent(text="Please find the relevant furniture..."),
            DataContent(uri=image_uri, media_type="image/png")
        ]
)

# រត់លំហូរការងារ
async for event in workflow.run_stream(message):
    ...
```

#### .NET (C\#) Implementation Analysis

ឧទាហរណ៍ .NET ស្រដៀងទៅនឹង Python។ ភ្នាក់ងារបី (`salesagent`, `priceagent`, `quoteagent`) ត្រូវបានបង្កើត។ `WorkflowBuilder` ភ្ជាប់ពួកគេទៅតាមលំដាប់។

```csharp
// 02.dotnet-agent-framework-workflow-ghmodel-sequential.ipynb

// Create agent instances
AIAgent salesagent = openAIClient.GetChatClient(github_model_id).CreateAIAgent(...);
AIAgent priceagent  = openAIClient.GetChatClient(github_model_id).CreateAIAgent(...);
AIAgent quoteagent = openAIClient.GetChatClient(github_model_id).CreateAIAgent(...);

// Build the workflow by adding edges sequentially
var workflow = new WorkflowBuilder(salesagent)
            .AddEdge(salesagent,priceagent)
            .AddEdge(priceagent, quoteagent)
            .Build();
```

សាររបស់អ្នកប្រើត្រូវបានកសាងជាមួយទិន្នន័យរូបភាព (ជាអំបោះ bytes) និង prompt ក្នុងអត្ថបទ។ វិធីសាស្ត្រ `InProcessExecution.StreamAsync` ចាប់ផ្តើម workflow ហើយលទ្ធផលចុងក្រោយត្រូវបានយកពី stream។

### Case 3: Concurrent Workflow

លំនាំនេះប្រើបច្ចេកទេសនៅពេលដែលកិច្ចការ​អាចអនុវត្តប្រជុំជា​សមកាលិក ដើម្បីសន្សំពេលវេលា។ វារួមមាន "fan-out" ទៅភ្នាក់ងារច្រើន និង "fan-in" ដើម្បីសរុបលទ្ធផល។

#### Scenario Background

អ្នកប្រើស្នើឱ្យរៀបចំដំណើរកម្សាន្តទៅ Seattle។

1.  **Dispatcher (Fan-Out)**: សំណើររបស់អ្នកប្រើត្រូវបានផ្ញើទៅភ្នាក់ងារពីរដែលដំណើរការណាមួយនៅពេលដាច់ខែ។
2.  **Researcher-Agent**: ស្រាវជ្រាវអំពីទេសចរណ៍ អាកាសធាតុ និងចំណុចសំខាន់សម្រាប់ដំណើរកម្សាន្តនៅ Seattle នៅខែធ្នូ។
3.  **Plan-Agent**: បង្កើតកម្មវិធីនៃព្រឹត្តិការណ៍រៀងគ្នាផ្ទាល់លំដាប់ថ្ងៃ។
4.  **Aggregator (Fan-In)**: រួមបញ្ចូលលទ្ធផលពី researcher និង planner ហើយបង្ហាញជាលទ្ធផលចុងក្រោយ។

*រូបភាពនៃ Researcher និង Planner ដំណើរការដោយសមកាលិក។*

#### Python Implementation Analysis

`ConcurrentBuilder` ធ្វើឱ្យការបង្កើតលំនាំនេះកាន់តែសាមញ្ញ។ អ្នកគ្រាន់តែបញ្ជីភ្នាក់ងារដែលចូលរួម ហើយ builder នឹងបង្កើត fan-out និង fan-in ដោយស្វ័យប្រវត្តិ។

```python
# 03.python-agent-framework-workflow-ghmodel-concurrent.ipynb

research_agent = chat_client.create_agent(name="Researcher-Agent", ...)
plan_agent = chat_client.create_agent(name="Plan-Agent", ...)

# ConcurrentBuilder គ្រប់គ្រងតុល្យកម្មនៃការចែកចេញ និងការបញ្ចូលវិញ (fan-out/fan-in)
workflow = ConcurrentBuilder().participants([research_agent, plan_agent]).build()

# រត់លំហូរដំណើរការ
events = await workflow.run("Plan a trip to Seattle in December")
```

Framework ធានាថា `research_agent` និង `plan_agent` ប្រតិបត្តិការជាសមកាលិក ហើយលទ្ធផលចុងក្រៅរបស់ពួកវាត្រូវបានប្រមូលជា​តារាង(List)។

#### .NET (C\#) Implementation Analysis

នៅក្នុង .NET លំនាំនេះត្រូវការកំណត់យ៉ាងច្បាស់ជាងមុន។ Executors ផ្ទាល់ខ្លួន (`ConcurrentStartExecutor` និង `ConcurrentAggregationExecutor`) ត្រូវបានបង្កើតដើម្បីដោះស្រាយលក្ខណៈ fan-out និង fan-in។

```csharp
// 03.dotnet-agent-framework-workflow-ghmodel-concurrent.ipynb

// Custom executor to broadcast the message to all agents
public class ConcurrentStartExecutor() : ...
{
    public async ValueTask HandleAsync(string message, IWorkflowContext context)
    {
        // Send message to all connected agents
        await context.SendMessageAsync(new ChatMessage(ChatRole.User, message));
        // Send a token to start processing
        await context.SendMessageAsync(new TurnToken(emitEvents: true));
    }
}

// Custom executor to collect results
public class ConcurrentAggregationExecutor() : ...
{
    private readonly List<ChatMessage> _messages = [];
    public async ValueTask HandleAsync(ChatMessage message, IWorkflowContext context)
    {
        this._messages.Add(message);
        // Once both agents have responded, yield the final output
        if (this._messages.Count == 2)
        {
            ...
            await context.YieldOutputAsync(formattedMessages);
        }
    }
}
```

បន្ទាប់មក `WorkflowBuilder` ប្រើ `AddFanOutEdge` និង `AddFanInEdge` ដើម្បីកសាងក្រាហ្វ ជាមួយ executors ផ្ទាល់ខ្លួន និងភ្នាក់ងារ។

```csharp
// 03.dotnet-agent-framework-workflow-ghmodel-concurrent.ipynb

var workflow = new WorkflowBuilder(startExecutor)
            .AddFanOutEdge(startExecutor, targets: [researcherAgent, plannerAgent])
            .AddFanInEdge(aggregationExecutor, sources: [researcherAgent, plannerAgent])
            .WithOutputFrom(aggregationExecutor)
            .Build();
```

### Case 4: Conditional Workflow

Conditional workflows បន្ថែមតុល្យភាព branching ដែលអាចអនុញ្ញាតឱ្យប្រព័ន្ធជ្រើសផ្លូវផ្សេងៗ ដោយផ្អែកលើលទ្ធផលកណ្តាល។

#### Scenario Background

Workflow នេះអូតូម៉ាទិកក្នុងការបង្កើត និងផ្សព្វផ្សាយមេរៀនបច្ចេកទេសមួយ។

1.  **Evangelist-Agent**: រក្សារមតិ និងសរសេរទូទៅពីមេរៀន ដោយផ្អែកលើទ្រាទាំងសេចក្តីសង្ខេប និង URLs។
2.  **ContentReviewer-Agent**: ពិនិត្យអត្ថបទខ Dra�t។ វាកំណត់ថារូបបានលើស 200 ពាក្យឬអត់។
3.  **Conditional Branch**:
      * **If Approved (`Yes`)**: Workflow នឹងបន្តទៅកាន់ `Publisher-Agent`។
      * **If Rejected (`No`)**: Workflow នឹងបញ្ឈប់ និងបញ្ចេញមូលហេតុនៃការបដិសេធ។
4.  **Publisher-Agent**: ប្រសិនបើ draft ត្រូវបានអនុម័ត ភ្នាក់ងារនេះនឹងរក្សាមាតិកាទៅជា ឯកសារ Markdown។

#### Python Implementation Analysis

ឧទាហរណ៍នេះប្រើ function ផ្ទាល់ខ្លួន `select_targets` ដើម្បីអនុវត្តលក្ខណ្ឌនេះ។ function នេះត្រូវបានផ្ដល់ទៅ `add_multi_selection_edge_group` និងយកចរន្ត workflow ផ្អែកលើវាល `review_result` ពីលទ្ធផលនៃអ្នកពិនិត្យ។

```python
# 04.python-agent-framework-workflow-aifoundry-condition.ipynb

# មុខងារនេះកំណត់ជំហានបន្ទាប់ផ្អែកលើលទ្ធផលនៃការពិនិត្យ
def select_targets(review: ReviewResult, target_ids: list[str]) -> list[str]:
    handle_review_id, save_draft_id = target_ids
    if review.review_result == "Yes":
        # បើបានអនុម័ត បន្តទៅអ្នកអនុវត្ត 'save_draft'
        return [save_draft_id]
    else:
        # បើបដិសេធ បន្តទៅអ្នកអនុវត្ត 'handle_review' ដើម្បីរាយការណ៍ការបរាជ័យ
        return [handle_review_id]

# កម្មវិធីបង្កើត workflow នេះប្រើមុខងារជម្រើសសម្រាប់ការបញ្ជូន
workflow = (
    WorkflowBuilder()
        .set_start_executor(evangelist_agent)
        .add_edge(evangelist_agent, reviewer_agent)
        .add_edge(reviewer_agent, to_reviewer_result)
        # ខ្សែច្រើនជម្រើស (multi-selection edge) អនុវត្តនូវលក្ខខណ្ឌ
        .add_multi_selection_edge_group(
            to_reviewer_result,
            [handle_review, save_draft],
            selection_func=select_targets,
        )
        .add_edge(save_draft, publisher_agent)
        .build()
)
```

Executors ផ្ទាល់ខ្លួនដូចជា `to_reviewer_result` ត្រូវបានប្រើដើម្បីបកប្រែលទ្ធផល JSON ពីភ្នាក់ងារ និងបម្លែងវាទៅជា objects ដែលមានប្រភេទច្បាស់ដែល function ជ្រើសរើសអាចពិនិត្យបាន។

#### .NET (C\#) Implementation Analysis

កំណែ .NET ប្រើវិធីសាស្ត្រដូចគ្នាជាមួយ​ condition function។ កំណត់ `Func<object?, bool>` ដើម្បីត្រួតពិនិត្យ property `Result` នៃអូបជែក `ReviewResult`។

```csharp
// 04.dotnet-agent-framework-workflow-aifoundry-condition.ipynb

// This function creates a lambda for the condition check
public Func<object?, bool> GetCondition(string expectedResult) =>
        reviewResult => reviewResult is ReviewResult review && review.Result == expectedResult;

// The workflow is built with conditional edges
var workflow = new WorkflowBuilder(draftExecutor)
            .AddEdge(draftExecutor, contentReviewerExecutor)
            // Add an edge to the publisher only if the review result is "Yes"
            .AddEdge(contentReviewerExecutor, publishExecutor, condition: GetCondition(expectedResult: "Yes"))
            // Add an edge to the reviewer feedback executor if the result is "No"
            .AddEdge(contentReviewerExecutor, sendReviewerExecutor, condition: GetCondition(expectedResult: "No"))
            .Build();
```

ប៉ារ៉ាម៉ែត្រ `condition` នៃវិធីសាស្ត្រ `AddEdge` អនុញាតឱ្យ `WorkflowBuilder` បង្កើតផ្លូវ branching។ Workflow នឹងតែអនុវត្ត edge ទៅ `publishExecutor` ដោយមានលក្ខខណ្ឌ `GetCondition(expectedResult: "Yes")` ត្រឹមត្រូវ ប្រសិនបើមិនដូច្នោះ វានឹងដើរតាមផ្លូវទៅ `sendReviewerExecutor`។

## Conclusion

Microsoft Agent Framework Workflow ផ្តល់មូលដ្ឋានរឹងមាំ និងបត់បែនសម្រាប់រៀបចំនិងគ្រប់គ្រងប្រព័ន្ធច្រើនភ្នាក់ងារដែលស្មុគស្មាញ។ ដោយអาศัยស្ថាបត្យកម្មផ្អែកក្រាហ្វ និងធាតុស្នូលរបស់វា នរណាក៏អាចរចនានិងអនុវត្ត workflow ស្មុគស្មាញក្នុង Python និង .NET បាន។ មិនថាកម្មវិធីរបស់អ្នកត្រូវការការដំណើរការតាមលំដាប់សាមញ្ញ ការអនុវត្តសមកាលិក ឬតុល្យភាពនៃលក្ខខណ្ឌ dynamic ទេ Framework នេះផ្តល់ឧបករណ៍ដើម្បីសាងសង់ដំណោះស្រាយដែលមានឥទ្ធិពល អាចពង្រីក និងមានសុវត្ថិភាពប្រភេទ។

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
ឯកសារនេះត្រូវបានបកប្រែដោយប្រើសេវាកម្មបកប្រែ AI [Co-op Translator](https://github.com/Azure/co-op-translator). ខណៈពេលដែលយើងខិតខំដើម្បីភាពត្រឹមត្រូវ សូមជម្រាបជូនថា ការបកប្រែដោយស្វ័យប្រវត្តិអាចមានកំហុស ឬភាពមិនត្រឹមត្រូវ។ ឯកសារដើមនៅក្នុងភាសាដើមគួរត្រូវបានចាត់ទុកជាប្រភពដែលមានសិទ្ធិផ្ដាច់មុខ។ សម្រាប់ព័ត៌មានសំខាន់ៗ យើងសូមណែនាំឱ្យប្រើការបកប្រែដោយមនុស្សជំនាញវិជ្ជាជីវៈ។ យើងមិនទទួលខុសត្រូវចំពោះការយល់ច្រឡំ ឬការបកស្រាយខុសណាមួយដែលកើតឡើងពីការប្រើការបកប្រែនេះទេ។
<!-- CO-OP TRANSLATOR DISCLAIMER END -->