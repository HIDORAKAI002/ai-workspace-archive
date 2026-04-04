# Context Engineering for AI Agents

[![Context Engineering](../../../translated_images/pcm/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Klik di image wey dey up make you watch video for dis lesson)_

To sabi as di application wey you dey build AI agent for dey complex, na important matter if you wan make am reliable. We need build AI Agents wey fit manage information well make dem fit solve mata wey pass just prompt engineering.

For dis lesson, we go look wetin context engineering be and wetin e mean for building AI agents.

## Introduction

Dis lesson go cover:

• **Wetyn Context Engineering be** and why e different from prompt engineering.

• **Strategies for effective Context Engineering**, including how to write, select, compress, and isolate information.

• **Common Context Failures** wey fit scatter your AI agent and how to fix dem.

## Learning Goals

After you finish dis lesson, you go sabi:

• **Define context engineering** and know how e different from prompt engineering.

• **Identify di key components of context** for Large Language Model (LLM) applications.

• **Apply strategies for writing, selecting, compressing, and isolating context** to make agent performance better.

• **Recognize common context failures** like poisoning, distraction, confusion, and clash, and apply ways to reduce dem.

## What is Context Engineering?

For AI Agents, context na wetin dey drive how AI Agent go plan to do certain actions. Context Engineering na di practice wey dey make sure say AI Agent get correct information to finish di next step for di task. Context window get limited size, so as agent builders we gats build systems and processes to manage how we dey add, remove, and condense information for di context window.

### Prompt Engineering vs Context Engineering

Prompt engineering dey focus on one set of static instructions wey go guide AI Agents with set of rules. Context engineering na how you go manage dynamic set of information, including di initial prompt, to make sure say AI Agent get wetin e need over time. Di main idea for context engineering na to make dis process repeatable and reliable.

### Types of Context

[![Types of Context](../../../translated_images/pcm/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

Make you remember say context no be only one kind thing. Di information wey AI Agent need fit come from different sources and na our duty make sure say di agent fit access dem:

Types of context wey AI agent fit need manage include:

• **Instructions:** Dem be like di agent "rules" – prompts, system messages, few-shot examples (wey dey show di AI how to do something), and descriptions of tools wey e fit use. Na here prompt engineering join with context engineering.

• **Knowledge:** Dis cover facts, information wey dem retrieve from databases, or long-term memories wey di agent don collect. E fit include to put together a Retrieval Augmented Generation (RAG) system if agent need access to different knowledge stores and databases.

• **Tools:** Dem be definitions of external functions, APIs and MCP Servers wey di agent fit call, plus di feedback (results) wey e dey get from using dem.

• **Conversation History:** Di ongoing dialogue wit user. As time dey go, conversations go long and complex, so dem go occupy space for di context window.

• **User Preferences:** Information wey dem don learn about user likes or dislikes over time. Dem fit store am and call am when dem dey make important decisions to help di user.

## Strategies for Effective Context Engineering

### Planning Strategies

[![Context Engineering Best Practices](../../../translated_images/pcm/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Good context engineering dey start wit good planning. Dis na approach wey go help you start to reason how to apply di concept of context engineering:

1. **Define Clear Results** - Di results of di tasks wey AI Agents go do suppose clear. Answer di question - "How di world go be When AI Agent don finish im task?" In oda words, which change, information, or response the user suppose get after dem interact wit di AI Agent.
2. **Map the Context** - Once you don define di results wey AI Agent suppose bring, you gots answer di question "Wetin AI Agent need to fit complete dis task?". This way you fit start map di context and where dat information dey.
3. **Create Context Pipelines** - Now wey you sabi where di information dey, you gots answer di question "How di Agent go take get dis information?". Dis one fit do many ways including RAG, use of MCP servers and oda tools.

### Practical Strategies

Planning important but once information start flow into our agent context window, we gats get practical strategies to manage am:

#### Managing Context

Some information go just add to di context window automatically, but context engineering mean to take active role for di information and you fit do am wit few strategies:

 1. **Agent Scratchpad**
 Dis one allow AI Agent to note relevant information about di current tasks and user interactions during one session. E suppose dey outside di context window inside file or runtime object wey di agent fit retrieve later during di same session if e need am.

 2. **Memories**
 Scratchpads dey good for manage information outside di context window of one session. Memories enable agents to store and retrieve relevant information across multiple sessions. Dis fit include summaries, user preferences and feedback wey go help improve tings later.

 3. **Compressing Context**
  Once di context window don grow and dey near im limit, techniques like summarization and trimming fit help. Dis mean either keep only di most relevant information or remove older messages.
  
 4. **Multi-Agent Systems**
  Build multi-agent systems na one form of context engineering because each agent get im own context window. How dat context dey share and pass to oda agents na another thing to plan when you dey build these systems.
  
 5. **Sandbox Environments**
  If agent need run code or process big amount of information for document, e fit use plenty tokens to process results. Instead of keep all inside context window, agent fit use sandbox environment wey fit run di code and only read di results and oda relevant information.
  
 6. **Runtime State Objects**
   Dis one mean create containers of information to manage situations wen Agent need access to certain information. For complex task, dis go allow Agent store results of each subtask step-by-step, so di context remain connected only to dat specific subtask.
  
### Example of Context Engineering

Make we suppose say we want AI agent to **"Book me a trip to Paris."**

• One simple agent wey only use prompt engineering fit just respond: **"Okay, when would you like to go to Paris?**". E only process di direct question wen user ask that time.

• One agent wey use di context engineering strategies wey we don talk about go do plenty pass dat. Before e even respond, im system fit:

  ◦ **Check your calendar** for available dates (retrieve real-time data).

  ◦ **Recall past travel preferences** (from long-term memory) like your preferred airline, budget, or if you prefer direct flights.

  ◦ **Identify available tools** for flight and hotel booking.

- Then, example response fit be:  "Hey [Your Name]! I see you're free the first week of October. Shall I look for direct flights to Paris on [Preferred Airline] within your usual budget of [Budget]?". Dis richer, context-aware response show di power of context engineering.

## Common Context Failures

### Context Poisoning

**Wetyn e be:** Na when hallucination (false information wey LLM generate) or error enter di context and people dey reference am again and again, make di agent begin pursue impossible goals or create nonsense strategies.

**Wetyn make you do:** Put **context validation** and **quarantine**. Validate information before you add am to long-term memory. If you suspect say poisoning happen, start fresh context threads to stop di bad information from spread.

**Travel Booking Example:** Your agent go hallucinate **direct flight from small local airport to far international city** wey no dey offer international flights. Dis non-existent flight detail go save inside di context. Later when you ask agent to book, e go still dey try find tickets for that impossible route, causing repeated errors.

**Solution:** Add step wey **validate flight existence and routes with a real-time API** _before_ you put di flight detail inside agent working context. If validation fail, put di wrong information for "quarantine" make e no dey use am again.

### Context Distraction

**Wetyn e be:** Na when di context don too big say model begin focus too much on all di old history instead of wetin e learn for training, make e dey do repetitive or unhelpful actions. Models fit begin make mistakes even before di context window full.

**Wetyn make you do:** Use **context summarization**. Compress accumulated information into shorter summaries from time to time, keep important details and remove redundant history. Dis help "reset" di focus.

**Travel Booking Example:** You don dey discuss many dream travel destinations for long time, including long story about your backpacking trip from two years ago. When you finally ask **"find me a cheap flight for next month,"** di agent go get stuck for old irrelevant details and keep asking about your backpacking gear or past itineraries, instead of handling your current request.

**Solution:** After certain number of turns or when context don too large, agent suppose **summarize di most recent and relevant parts of di conversation** – focus on your current travel dates and destination – and use dat condensed summary for di next LLM call, discard di less relevant historical chat.

### Context Confusion

**Wetyn e be:** Na when unnecessary context, often as too many available tools, make model generate bad responses or call irrelevant tools. Smaller models dey especially prone to dis.

**Wetyn make you do:** Implement **tool loadout management** using RAG techniques. Store tool descriptions inside vector database and select _only_ di most relevant tools for each task. Research dey show say make tool selection stay under 30.

**Travel Booking Example:** Your agent get access to dozens of tools: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations`, etc. You ask, **"What's the best way to get around Paris?"** Because tool list too many, agent go confused and try call `book_flight` _within_ Paris, or `rent_car` even though you prefer public transport, because tool descriptions fit overlap or e no fit choose di best one.

**Solution:** Use **RAG over tool descriptions**. When you ask about getting around Paris, system go dynamically retrieve _only_ di most relevant tools like `rent_car` or `public_transport_info` based on your query, present focused "loadout" of tools to di LLM.

### Context Clash

**Wetyn e be:** Na when conflicting information dey inside context, make reasoning inconsistent or final response bad. This one dey happen when information dey come in stages and early wrong assumptions still dey inside context.

**Wetyn make you do:** Use **context pruning** and **offloading**. Pruning mean remove outdated or conflicting information when new details show. Offloading mean give model separate "scratchpad" workspace to process information without cluttering main context.

**Travel Booking Example:** You first tell agent, **"I want to fly economy class."** Later you change mind and talk, **"Actually, for this trip, let's go business class."** If both instructions still for context, agent fit get conflicting search results or no sabi which preference to follow.

**Solution:** Implement **context pruning**. When new instruction contradict old one, remove older instruction or explicitly override am in context. Or agent fit use **scratchpad** to reconcile conflicting preferences before e decide, make sure only final consistent instruction guide im actions.

## Got More Questions About Context Engineering?

Join di [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet wit oda learners, attend office hours and make your AI Agents questions get answer.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Disclaimer:
Dis document na wetin AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator) translate. Even though we dey try make am correct, abeg note say automated translations fit get errors or mistake. The original document for im own language na di main authoritative source. For important matter, better make you use professional human translator. We no go responsible for any misunderstanding or wrong interpretation wey fit arise from di use of this translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->