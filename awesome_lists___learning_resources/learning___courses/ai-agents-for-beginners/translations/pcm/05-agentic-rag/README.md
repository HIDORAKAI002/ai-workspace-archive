[![Agentic RAG](../../../translated_images/pcm/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Click di pikshọ̀n wey dey up to watch video of dis lekshọn)_

# Agentic RAG

Dis lekshọn go give una full gist about Agentic Retrieval-Augmented Generation (Agentic RAG), one kind AI waka wey big language models (LLMs) dey plan wetin dem go do next by dere ownself as dem dey pull info from outside sources. E no be like di static retrieval-then-read way, Agentic RAG involve call LLM many times, put tool or function calls and structured outputs inside. Di system go check di results, improve wetin dem dey ask, call more tools if e need am, and continue this waka till e find beta solution.

## Introduction

Dis lekshọn go cover

- **Understand Agentic RAG:** Learn about dis new AI style wey big language models (LLMs) dey plan their next step by themselves as dem dey pull info from outside data sources.
- **Grasp Iterative Maker-Checker Style:** Understand how dem dey do iterative calls to LLM, join am with tool or function calls plus structured outputs, wey fit improve correctness and fix bad queries.
- **Explore Practical Applications:** Know places wey Agentic RAG dey useful, like correct-first environment, complex database wahala, and longer workflow palava dem.

## Learning Goals

After you finish dis lekshọn, you go sabi how to/understand:

- **Understanding Agentic RAG:** Learn about dis new AI style wey big language models (LLMs) dey plan their next step by themselves as dem dey pull info from outside data sources.
- **Iterative Maker-Checker Style:** Understand how iterative call to LLM, join am with tool or function call and structured outputs dey improve correctness and fix bad queries.
- **Owning the Reasoning Process:** Know how di system get control of how e de reason, dey decide how e go take solve problem without follow set path.
- **Workflow:** Know how agentic model dey decide to comot market trend reports, find competitor info, join internal sales data, put all together, and check strategy.
- **Iterative Loops, Tool Integration, and Memory:** Learn how system dey rely on loop interaction wey keep memory and state so e no go dey repeat or confuse.
- **Handling Failure Modes and Self-Correction:** Know how system dey fix itself wella when e miss road: dey try again, use diagnostic tools, and bring human help if e too hard.
- **Boundaries of Agency:** Understand wetin Agentic RAG fit do and wetin e no fit do — focus on domain autonomy, infrastructure dependency, and respect for boundaries.
- **Practical Use Cases and Value:** Know where Agentic RAG dey shine wella like correct-first places, complex database work, and long session workflow.
- **Governance, Transparency, and Trust:** Learn about di importance of governance with explainable reasoning, controlling bias, and human monitoring.

## What is Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) na new AI style wey big language models (LLMs) dey plan dia next moves by themselves as dem dey pull info from outside. No be like static retrieval then read way, Agentic RAG dey call LLM many times, combine am with tool or function calls and structured output. Di system dey check wetin e get, improve wetin e dey ask, call more tools if e need and continue dis cycle till e find correct answer. Dis “maker-checker” way dey improve accuracy, fix bad queries, and make sure result beta.

Di system sef dey jog e own reasoning way, e fit rewrite query wey no work, choose different retrieval style, and use different tools like vector search for Azure AI Search, SQL database, or custom APIs before e give final answer. Wetin make agentic system special na say e get power to control e own reasoning way. Traditional RAG dem dey rely on pre-set paths, but agentic system dey decide steps on dia own based on info wey e find.

## Defining Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) na new AI style wey LLMs no just pull info from outside data sources, but dem still dey plan their next step alone. No be like static retrieval-then-read or scripted prompt sequences, Agentic RAG na loop wey dey call LLM many times, combine tool or function calls with structured output. For each step, system go check result, decide if e go change query, call more tools if e need, and continue till e get solution wey dey satisfy.

Dis “maker-checker” way dey improve accurate result, fit handle bad query for structured database (like NL2SQL), and make result balance and beta. No be only prompt chains system dey depend on, e self fit own e reasoning style. E fit rewrite failed queries, choose different ways to get info, join many tools like vector search for Azure AI Search, SQL databases, or custom APIs before e finalize answer. Dis one mean no need too complicated orchestration framework but simple loop of “LLM call → tool use → LLM call → …” fit produce correct and strong output.

![Agentic RAG Core Loop](../../../translated_images/pcm/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Owning the Reasoning Process

The thing wey make system “agentic” na say e fit control e own reasoning process. Traditional RAG them dey use humans to pre-define path for model: chain-of-thought to talk wetin to retrieve and when.

But when system really agentic, e go decide inside how e go solve the problem. E no be just follow script; e dey plan steps by itself based on quality of info wey e get.

For example, if dem ask am to create product launch strategy, e no go just rely on prompt wey show full research and decision workflow. Instead, agentic model go decide on e own to:

1. Retrieve current market trend reports using Bing Web Grounding
2. Identify relevant competitor data using Azure AI Search.
3. Correlate historical internal sales metrics using Azure SQL Database.
4. Synthesize the findings into one solid strategy wey e go manage through Azure OpenAI Service.
5. Check the strategy for gaps or anything wey no correct, then if e need, e go do another retrieval round.
All these steps — improve queries, choose sources, do am till e “happy” with answer — na model go decide, no be human script.

## Iterative Loops, Tool Integration, and Memory

![Tool Integration Architecture](../../../translated_images/pcm/tool-integration.0f569710b5c17c10.webp)

Agentic system dey rely on loop interaction style:

- **Initial Call:** User goal (aka user prompt) go show for LLM.
- **Tool Invocation:** If model find say info dey miss or question no clear, e go pick tool or retrieval way — like vector database query (e.g. Azure AI Search Hybrid search on private data) or structured SQL call — to get more context.
- **Assessment & Refinement:** After e check data wey return, model go decide if the info enough. If no, e go improve query, try different tool, or change approach.
- **Repeat Until Satisfied:** Dis cycle go continue till model find say e get enough clear info and data to give correct answer.
- **Memory & State:** System go keep state and memory across steps so e fit remember previous tries and their result, no repeat wahala and make better decisions as e de waka.

As time dey go, dis create better understanding, make model fit handle waka wey need many steps without human waka inside or change prompt.

## Handling Failure Modes and Self-Correction

Agentic RAG autonomy include strong self-correction system. If e jam dead ends like wrong document or corrupted query, e fit:

- **Iterate and Re-Query:** Instead of give low-value answer, model go try new search style, rewrite database queries, or try different data sets.
- **Use Diagnostic Tools:** System fit call extra functions to help debug e reasoning steps or check correctness of data. Tools like Azure AI Tracing go important to help observe and monitor well.
- **Fallback on Human Oversight:** For serious or many-time problems, model fit notify say e no sure and ask human help. After human give feedback, model go learn and use am next time.

Dis iterative and flexible style help model improve steady, no be just one time system but one wey dey learn from error for one session.

![Self Correction Mechanism](../../../translated_images/pcm/self-correction.da87f3783b7f174b.webp)

## Boundaries of Agency

Even though e dey autonomous for task, Agentic RAG no be Artificial General Intelligence. E “agentic” power dey limited to tools, data source, and rules wey human developers provide. E no fit create im own tools or waka outside domain wey set for am. Instead, e dey do well to organize resources wey e get.

Main difference from better AI na:

1. **Domain-Specific Autonomy:** Agentic RAG system dey focused to deliver user goals for known domain, dey use query rewrite or tool pick to improve result.
2. **Infrastructure-Dependent:** System power depend on the tools and data developers join. E no fit pass dis limit without human intervention.
3. **Respect for Guardrails:** Ethics rules, compliance, and business policy dey very important. Agent freedom always based on safety and human supervision (hope so?)

## Practical Use Cases and Value

Agentic RAG dey shine for cases wey need better work and accuracy:

1. **Correctness-First Environments:** For compliance check, regulation analysis, or legal research, agentic model fit check facts many times, check many sources, and rewrite query till e get correct answer.
2. **Complex Database Interactions:** When e deal with structured data wey query fit fail or need correction, system fit improve query alone using Azure SQL or Microsoft Fabric OneLake, so retrieval go match user intent.
3. **Extended Workflows:** Long session fit change as new info show. Agentic RAG fit add new data steady, change strategy as e understand more about problem.

## Governance, Transparency, and Trust

As the system dey more independent for reasoning, governance and transparency na big matter:

- **Explainable Reasoning:** Model fit show audit trail of queries wey e do, sources wey e check, and reasoning wey e follow to reach conclusion. Tools like Azure AI Content Safety and Azure AI Tracing / GenAIOps fit help keep transparency and reduce risks.
- **Bias Control and Balanced Retrieval:** Developers fit tune retrieval style to balance data sources, and check output regular to find bias or wrong pattern using custom models for advanced data science with Azure Machine Learning.
- **Human Oversight and Compliance:** For sensitive wahala, human check still dey important. Agentic RAG no replace human judgment for serious decision — e just add beta options with proper check.

Tools wey fit keep clear records very important. Without dem, to debug multi-step process fit hard. See example from Literal AI (company behind Chainlit) for Agent run:

![AgentRunExample](../../../translated_images/pcm/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusion

Agentic RAG na natural step forward for how AI system dey handle complex, data-heavy tasks. E use loop interaction, select tools by itself, improve queries till e get correct answer, system move pass static prompt-following enter adaptive, context-aware decision maker. Even though e still dey limited by human infrastructure and ethics rule, dis agentic power enable richer, more flexible and beta AI interaction for companies and end-users.

### Got More Questions about Agentic RAG?

Join di [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet other learners, attend office hours and get your AI Agents questions answer.

## Additional Resources
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implement Retrieval Augmented Generation (RAG) wit Azure OpenAI Service: Learn how to use your own data wit di Azure OpenAI Service. Dis Microsoft Learn module dey provide beta guide on how to implement RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Evaluation of generative AI applications wit Microsoft Foundry: Dis article go cover how to evaluate and compare models for public datasets, including Agentic AI applications and RAG architectures</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Wetin be Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Beta Full Guide to Agent-Based Retrieval Augmented Generation – News from generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: turbocharge your RAG wit query reformulation and self-query! Hugging Face Open-Source AI Cookbook</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Adding Agentic Layers to RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">The Future of Knowledge Assistants: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">How to Build Agentic RAG Systems</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Using Microsoft Foundry Agent Service to scale your AI agents</a>

### Academic Papers

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Iterative Refinement wit Self-Feedback</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Language Agents wit Verbal Reinforcement Learning</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Large Language Models Fit Self-Correct wit Tool-Interactive Critiquing</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: A Survey on Agentic RAG</a>

## Previous Lesson

[Tool Use Design Pattern](../04-tool-use/README.md)

## Next Lesson

[Building Trustworthy AI Agents](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:
Dis dokument don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even though we dey try make am correct, abeg know say automatic translations fit get some errors or wahala. Di original dokument for im own language na di correct source. For important mata dem, e better make person wey sabi do human translation help you. We no go responsible if person use dis translation misunderstand or misinterpret anything.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->