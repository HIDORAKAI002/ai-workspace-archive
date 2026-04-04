[![Agentic RAG](../../../translated_images/fr/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Cliquez sur l'image ci-dessus pour regarder la vidéo de cette leçon)_

# Agentic RAG

Cette leçon offre un aperçu complet de l'Agentic Retrieval-Augmented Generation (Agentic RAG), un paradigme émergent en IA où les grands modèles de langage (LLMs) planifient de manière autonome leurs prochaines étapes tout en puisant des informations dans des sources externes. Contrairement aux schémas statiques de type retrieval-then-read, l'Agentic RAG implique des appels itératifs au LLM, entrecoupés d'appels d'outils ou de fonctions et de sorties structurées. Le système évalue les résultats, affine les requêtes, invoque des outils supplémentaires si nécessaire et poursuit ce cycle jusqu'à l'obtention d'une solution satisfaisante.

## Introduction

Cette leçon couvrira

- **Understand Agentic RAG:**  Learn about the emerging paradigm in AI where large language models (LLMs) autonomously plan their next steps while pulling information from external data sources.
- **Grasp Iterative Maker-Checker Style:** Comprehend the loop of iterative calls to the LLM, interspersed with tool or function calls and structured outputs, designed to improve correctness and handle malformed queries.
- **Explore Practical Applications:** Identify scenarios where Agentic RAG shines, such as correctness-first environments, complex database interactions, and extended workflows.

## Learning Goals

After completing this lesson, you will know how to/understand:

- **Understanding Agentic RAG:** Learn about the emerging paradigm in AI where large language models (LLMs) autonomously plan their next steps while pulling information from external data sources.
- **Iterative Maker-Checker Style:** Grasp the concept of a loop of iterative calls to the LLM, interspersed with tool or function calls and structured outputs, designed to improve correctness and handle malformed queries.
- **Owning the Reasoning Process:** Comprehend the system's ability to own its reasoning process, making decisions on how to approach problems without relying on pre-defined paths.
- **Workflow:** Understand how an agentic model independently decides to retrieve market trend reports, identify competitor data, correlate internal sales metrics, synthesize findings, and evaluate the strategy.
- **Iterative Loops, Tool Integration, and Memory:** Learn about the system's reliance on a looped interaction pattern, maintaining state and memory across steps to avoid repetitive loops and make informed decisions.
- **Handling Failure Modes and Self-Correction:** Explore the system's robust self-correction mechanisms, including iterating and re-querying, using diagnostic tools, and falling back on human oversight.
- **Boundaries of Agency:** Understand the limitations of Agentic RAG, focusing on domain-specific autonomy, infrastructure dependence, and respect for guardrails.
- **Practical Use Cases and Value:** Identify scenarios where Agentic RAG shines, such as correctness-first environments, complex database interactions, and extended workflows.
- **Governance, Transparency, and Trust:** Learn about the importance of governance and transparency, including explainable reasoning, bias control, and human oversight.

## What is Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) est un paradigme émergent en IA dans lequel les grands modèles de langage (LLMs) planifient de manière autonome leurs prochaines étapes tout en extrayant des informations de sources externes. Contrairement aux schémas statiques de type retrieval-then-read, l'Agentic RAG implique des appels itératifs au LLM, entrecoupés d'appels d'outils ou de fonctions et de sorties structurées. Le système évalue les résultats, affine les requêtes, invoque des outils supplémentaires si nécessaire et poursuit ce cycle jusqu'à l'obtention d'une solution satisfaisante. Ce style itératif de type « maker-checker » améliore la justesse, gère les requêtes mal formées et garantit des résultats de haute qualité.

Le système prend activement en charge son processus de raisonnement, réécrivant les requêtes échouées, choisissant différentes méthodes de recherche et intégrant plusieurs outils—tels que la recherche vectorielle dans Azure AI Search, des bases de données SQL ou des API personnalisées—avant de finaliser sa réponse. La qualité distinctive d'un système agentique est sa capacité à s'approprier son processus de raisonnement. Les implémentations RAG traditionnelles reposent sur des chemins prédéfinis, tandis qu'un système agentique détermine de manière autonome la séquence d'étapes en fonction de la qualité des informations qu'il trouve.

## Defining Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) est un paradigme émergent dans le développement de l'IA où les LLMs non seulement extraient des informations de sources de données externes, mais planifient aussi de manière autonome leurs prochaines étapes. Contrairement aux schémas statiques retrieval-then-read ou aux séquences d'invite soigneusement scénarisées, l'Agentic RAG implique une boucle d'appels itératifs au LLM, entrecoupés d'appels d'outils ou de fonctions et de sorties structurées. À chaque étape, le système évalue les résultats obtenus, décide s'il doit affiner ses requêtes, invoque des outils supplémentaires si nécessaire et poursuit ce cycle jusqu'à l'obtention d'une solution satisfaisante.

Ce style itératif de fonctionnement « maker-checker » est conçu pour améliorer la justesse, gérer les requêtes mal formées vers des bases de données structurées (par ex. NL2SQL) et garantir des résultats équilibrés et de haute qualité. Plutôt que de s'appuyer uniquement sur des chaînes d'invites finement conçues, le système prend activement en charge son processus de raisonnement. Il peut réécrire des requêtes qui échouent, choisir différentes méthodes de recherche et intégrer plusieurs outils—tels que la recherche vectorielle dans Azure AI Search, des bases de données SQL ou des API personnalisées—avant de finaliser sa réponse. Cela élimine le besoin de cadres d'orchestration excessivement complexes. À la place, une boucle relativement simple « appel LLM → utilisation d'outil → appel LLM → … » peut produire des sorties sophistiquées et bien fondées.

![Agentic RAG Core Loop](../../../translated_images/fr/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Owning the Reasoning Process

La qualité distinctive qui rend un système « agentic » est sa capacité à s'approprier son processus de raisonnement. Les implémentations RAG traditionnelles dépendent souvent d'humains définissant à l'avance un chemin pour le modèle : une chaîne de pensée qui décrit ce qu'il faut récupérer et quand.
Mais lorsqu'un système est véritablement agentic, il décide en interne de la manière d'aborder le problème. Il n'exécute pas simplement un script ; il détermine de façon autonome la séquence d'étapes en fonction de la qualité des informations qu'il trouve.
Par exemple, s'il lui est demandé de créer une stratégie de lancement de produit, il ne s'appuie pas uniquement sur une invite qui décrit l'intégralité du travail de recherche et de prise de décision. Au lieu de cela, le modèle agentic décide de manière indépendante de :

1. Retrieve current market trend reports using Bing Web Grounding
2. Identify relevant competitor data using Azure AI Search.
3.	Correlate historical internal sales metrics using Azure SQL Database.
4. Synthesize the findings into a cohesive strategy orchestrated via Azure OpenAI Service.
5.	Evaluate the strategy for gaps or inconsistencies, prompting another round of retrieval if necessary.
All of these steps—refining queries, choosing sources, iterating until “happy” with the answer—are decided by the model, not pre-scripted by a human.

## Iterative Loops, Tool Integration, and Memory

![Tool Integration Architecture](../../../translated_images/fr/tool-integration.0f569710b5c17c10.webp)

Un système agentic repose sur un schéma d'interaction en boucle :

- **Initial Call:** The user’s goal (aka. user prompt) is presented to the LLM.
- **Tool Invocation:** If the model identifies missing information or ambiguous instructions, it selects a tool or retrieval method—like a vector database query (e.g. Azure AI Search Hybrid search over private data) or a structured SQL call—to gather more context.
- **Assessment & Refinement:** After reviewing the returned data, the model decides whether the information suffices. If not, it refines the query, tries a different tool, or adjusts its approach.
- **Repeat Until Satisfied:** This cycle continues until the model determines that it has enough clarity and evidence to deliver a final, well-reasoned response.
- **Memory & State:** Because the system maintains state and memory across steps, it can recall previous attempts and their outcomes, avoiding repetitive loops and making more informed decisions as it proceeds.

Au fil du temps, cela crée une impression de compréhension évolutive, permettant au modèle de naviguer des tâches complexes en plusieurs étapes sans nécessiter l'intervention humaine constante ou la reformulation permanente de l'invite.

## Handling Failure Modes and Self-Correction

L'autonomie de l'Agentic RAG implique également des mécanismes robustes d'auto-correction. Lorsque le système rencontre des impasses—comme la récupération de documents non pertinents ou des requêtes mal formées—il peut :

- **Iterate and Re-Query:** Instead of returning low-value responses, the model attempts new search strategies, rewrites database queries, or looks at alternative data sets.
- **Use Diagnostic Tools:** The system may invoke additional functions designed to help it debug its reasoning steps or confirm the correctness of retrieved data. Tools like Azure AI Tracing will be important to enable robust observability and monitoring.
- **Fallback on Human Oversight:** For high-stakes or repeatedly failing scenarios, the model might flag uncertainty and request human guidance. Once the human provides corrective feedback, the model can incorporate that lesson going forward.

Cette approche itérative et dynamique permet au modèle de s'améliorer continuellement, garantissant qu'il ne s'agit pas simplement d'un système en une seule exécution, mais d'un système qui apprend de ses erreurs au cours d'une session donnée.

![Self Correction Mechanism](../../../translated_images/fr/self-correction.da87f3783b7f174b.webp)

## Boundaries of Agency

Malgré son autonomie au sein d'une tâche, l'Agentic RAG n'est pas analogue à une Intelligence Artificielle Générale. Ses capacités « agentic » sont limitées aux outils, aux sources de données et aux politiques fournis par les développeurs humains. Il ne peut pas inventer ses propres outils ni sortir des limites du domaine qui ont été définies. En revanche, il excelle à orchestrer dynamiquement les ressources disponibles.
Les différences clés par rapport à des formes d'IA plus avancées incluent :

1. **Domain-Specific Autonomy:** Agentic RAG systems are focused on achieving user-defined goals within a known domain, employing strategies like query rewriting or tool selection to improve outcomes.
2. **Infrastructure-Dependent:** The system’s capabilities hinge on the tools and data integrated by developers. It can’t surpass these boundaries without human intervention.
3. **Respect for Guardrails:** Ethical guidelines, compliance rules, and business policies remain very important. The agent’s freedom is always constrained by safety measures and oversight mechanisms (espérons-le ?)

## Practical Use Cases and Value

Agentic RAG brille dans des scénarios nécessitant un affinement itératif et de la précision :

1. **Correctness-First Environments:** In compliance checks, regulatory analysis, or legal research, the agentic model can repeatedly verify facts, consult multiple sources, and rewrite queries until it produces a thoroughly vetted answer.
2. **Complex Database Interactions:** When dealing with structured data where queries might often fail or need adjustment, the system can autonomously refine its queries using Azure SQL or Microsoft Fabric OneLake, ensuring the final retrieval aligns with the user’s intent.
3. **Extended Workflows:** Longer-running sessions might evolve as new information surfaces. Agentic RAG can continuously incorporate new data, shifting strategies as it learns more about the problem space.

## Governance, Transparency, and Trust

Au fur et à mesure que ces systèmes gagnent en autonomie dans leur raisonnement, la gouvernance et la transparence deviennent cruciales :

- **Explainable Reasoning:** The model can provide an audit trail of the queries it made, the sources it consulted, and the reasoning steps it took to reach its conclusion. Tools like Azure AI Content Safety and Azure AI Tracing / GenAIOps can help maintain transparency and mitigate risks.
- **Bias Control and Balanced Retrieval:** Developers can tune retrieval strategies to ensure balanced, representative data sources are considered, and regularly audit outputs to detect bias or skewed patterns using custom models for advanced data science organizations using Azure Machine Learning.
- **Human Oversight and Compliance:** For sensitive tasks, human review remains essential. Agentic RAG doesn’t replace human judgment in high-stakes decisions—it augments it by delivering more thoroughly vetted options.

Disposer d'outils fournissant un enregistrement clair des actions est essentiel. Sans eux, déboguer un processus en plusieurs étapes peut être très difficile. Voir l'exemple suivant de Literal AI (société derrière Chainlit) pour une exécution d'Agent :

![AgentRunExample](../../../translated_images/fr/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusion

Agentic RAG représente une évolution naturelle dans la manière dont les systèmes d'IA traitent des tâches complexes et riches en données. En adoptant un schéma d'interaction en boucle, en sélectionnant de manière autonome des outils et en affinant les requêtes jusqu'à l'obtention d'un résultat de haute qualité, le système dépasse le simple suivi d'invites statiques pour devenir un décideur plus adaptatif et conscient du contexte. Bien qu'il reste limité par des infrastructures et des directives éthiques définies par des humains, ces capacités agentiques permettent des interactions IA plus riches, plus dynamiques et, en fin de compte, plus utiles pour les entreprises et les utilisateurs finaux.

### Got More Questions about Agentic RAG?

Join the [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) to meet with other learners, attend office hours and get your AI Agents questions answered.

## Additional Resources
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Mettre en œuvre la génération augmentée par récupération (RAG) avec Azure OpenAI Service: Découvrez comment utiliser vos propres données avec le service Azure OpenAI. Ce module Microsoft Learn fournit un guide complet sur la mise en œuvre de RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Évaluation des applications d'IA générative avec Microsoft Foundry: Cet article couvre l'évaluation et la comparaison des modèles sur des jeux de données publics, y compris les applications d'IA agentique et les architectures RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">Qu'est-ce que Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG : Guide complet sur la génération augmentée par récupération basée sur des agents – Actualités de generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG : dynamisez votre RAG avec la reformulation de requêtes et l'auto-requête ! Hugging Face Cookbook IA open source</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Ajouter des couches agentiques à RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">Le futur des assistants de connaissance : Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Comment construire des systèmes Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Utiliser Microsoft Foundry Agent Service pour mettre à l'échelle vos agents IA</a>

### Articles académiques

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine : Affinement itératif avec auto-rétroaction</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion : Agents linguistiques avec apprentissage par renforcement verbal</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC : Les grands modèles de langage peuvent s'auto-corriger grâce à une critique interactive avec des outils</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation : Une revue sur Agentic RAG</a>

## Leçon précédente

[Modèle d'utilisation d'outils](../04-tool-use/README.md)

## Leçon suivante

[Construire des agents d'IA dignes de confiance](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Avis de non-responsabilité :
Ce document a été traduit à l'aide du service de traduction par IA [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforcions d'assurer l'exactitude, veuillez noter que les traductions automatiques peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue d'origine doit être considéré comme la source faisant foi. Pour les informations critiques, une traduction professionnelle réalisée par un traducteur humain est recommandée. Nous ne saurions être tenus responsables des éventuels malentendus ou interprétations erronées résultant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->