[![Agentic RAG](../../../translated_images/pt-PT/lesson-5-thumbnail.20ba9d0c0ae64fae.webp)](https://youtu.be/WcjAARvdL7I?si=BCgwjwFb2yCkEhR9)

> _(Clique na imagem acima para ver o vídeo desta aula)_

# Agentic RAG

Esta lição fornece uma visão abrangente do Agentic Retrieval-Augmented Generation (Agentic RAG), um paradigma emergente de IA em que modelos de linguagem de grande dimensão (LLMs) planeiam autonomamente os seus próximos passos enquanto extraem informação de fontes externas. Ao contrário dos padrões estáticos de recuperar e depois ler, o Agentic RAG envolve chamadas iterativas ao LLM, intercaladas com chamadas a ferramentas ou funções e resultados estruturados. O sistema avalia os resultados, refina as consultas, invoca ferramentas adicionais se necessário e continua este ciclo até alcançar uma solução satisfatória.

## Introduction

Esta lição irá abordar

- **Understand Agentic RAG:**  Aprender sobre o paradigma emergente em IA onde modelos de linguagem de grande dimensão (LLMs) planeiam autonomamente os seus próximos passos enquanto extraem informação de fontes de dados externas.
- **Grasp Iterative Maker-Checker Style:** Compreender o ciclo de chamadas iterativas ao LLM, intercaladas com chamadas a ferramentas ou funções e saídas estruturadas, concebido para melhorar a corretidão e lidar com consultas malformadas.
- **Explore Practical Applications:** Identificar cenários onde o Agentic RAG se destaca, como ambientes com prioridade à corretidão, interações complexas com bases de dados e fluxos de trabalho prolongados.

## Learning Goals

Depois de completar esta lição, saberá/compreenderá:

- **Understanding Agentic RAG:** Aprender sobre o paradigma emergente em IA onde modelos de linguagem de grande dimensão (LLMs) planeiam autonomamente os seus próximos passos enquanto extraem informação de fontes de dados externas.
- **Iterative Maker-Checker Style:** Compreender o conceito de um ciclo de chamadas iterativas ao LLM, intercaladas com chamadas a ferramentas ou funções e saídas estruturadas, concebido para melhorar a corretidão e lidar com consultas malformadas.
- **Owning the Reasoning Process:** Compreender a capacidade do sistema de assumir o seu processo de raciocínio, tomando decisões sobre como abordar problemas sem depender de caminhos pré-definidos.
- **Workflow:** Entender como um modelo agentic decide de forma independente recuperar relatórios de tendências de mercado, identificar dados de concorrentes, correlacionar métricas internas de vendas, sintetizar conclusões e avaliar a estratégia.
- **Iterative Loops, Tool Integration, and Memory:** Aprender sobre a dependência do sistema num padrão de interação em ciclo, mantendo estado e memória ao longo dos passos para evitar loops repetitivos e tomar decisões mais informadas.
- **Handling Failure Modes and Self-Correction:** Explorar os mecanismos robustos de autocorreção do sistema, incluindo iterações e novas consultas, uso de ferramentas de diagnóstico e recurso a supervisão humana.
- **Boundaries of Agency:** Compreender as limitações do Agentic RAG, focando-se na autonomia específica de domínio, dependência de infraestrutura e respeito por guardrails.
- **Practical Use Cases and Value:** Identificar cenários onde o Agentic RAG se destaca, como ambientes com prioridade à corretidão, interações complexas com bases de dados e fluxos de trabalho prolongados.
- **Governance, Transparency, and Trust:** Aprender sobre a importância da governação e transparência, incluindo raciocínio explicável, controlo de viés e supervisão humana.

## What is Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) é um paradigma emergente de IA em que modelos de linguagem de grande dimensão (LLMs) planeiam autonomamente os seus próximos passos enquanto extraem informação de fontes externas. Ao contrário dos padrões estáticos de recuperar e depois ler, o Agentic RAG envolve chamadas iterativas ao LLM, intercaladas com chamadas a ferramentas ou funções e saídas estruturadas. O sistema avalia os resultados, refina as consultas, invoca ferramentas adicionais se necessário e continua este ciclo até alcançar uma solução satisfatória. Este estilo iterativo de “maker-checker” melhora a corretidão, lida com consultas malformadas e garante resultados de alta qualidade.

O sistema assume ativamente o seu processo de raciocínio, reescrevendo consultas falhadas, escolhendo diferentes métodos de recuperação e integrando múltiplas ferramentas — como pesquisa vetorial no Azure AI Search, bases de dados SQL ou APIs personalizadas — antes de finalizar a resposta. A qualidade distintiva de um sistema agentic é a sua capacidade de assumir o seu processo de raciocínio. Implementações tradicionais de RAG dependem de caminhos pré-definidos, mas um sistema agentic determina autonomamente a sequência de passos com base na qualidade da informação que encontra.

## Defining Agentic Retrieval-Augmented Generation (Agentic RAG)

Agentic Retrieval-Augmented Generation (Agentic RAG) é um paradigma emergente no desenvolvimento de IA onde os LLMs não só extraem informação de fontes de dados externas, como também planeiam autonomamente os seus próximos passos. Ao contrário de padrões estáticos de recuperar e depois ler ou sequências de prompts cuidadosamente escritas, o Agentic RAG envolve um ciclo de chamadas iterativas ao LLM, intercaladas com chamadas a ferramentas ou funções e saídas estruturadas. A cada passo, o sistema avalia os resultados obtidos, decide se deve refinar as suas consultas, invoca ferramentas adicionais se necessário e continua este ciclo até atingir uma solução satisfatória.

Este estilo iterativo de operação “maker-checker” é concebido para melhorar a corretidão, lidar com consultas malformadas a bases de dados estruturadas (por exemplo, NL2SQL) e garantir resultados equilibrados e de alta qualidade. Em vez de depender exclusivamente de cadeias de prompts cuidadosamente engenheiradas, o sistema assume ativamente o seu processo de raciocínio. Pode reescrever consultas que falham, escolher diferentes métodos de recuperação e integrar múltiplas ferramentas — como pesquisa vetorial no Azure AI Search, bases de dados SQL ou APIs personalizadas — antes de finalizar a sua resposta. Isto elimina a necessidade de frameworks de orquestração excessivamente complexos. Em vez disso, um ciclo relativamente simples de “chamada LLM → uso de ferramenta → chamada LLM → …” pode produzir saídas sofisticadas e bem fundamentadas.

![Agentic RAG Core Loop](../../../translated_images/pt-PT/agentic-rag-core-loop.c8f4b85c26920f71.webp)

## Owning the Reasoning Process

A qualidade distintiva que torna um sistema “agentic” é a sua capacidade de assumir o seu processo de raciocínio. Implementações tradicionais de RAG muitas vezes dependem de humanos a pré-definirem um caminho para o modelo: uma cadeia de pensamento que descreve o que recuperar e quando.
Mas quando um sistema é verdadeiramente agentic, decide internamente como abordar o problema. Não está apenas a executar um script; está a determinar autonomamente a sequência de passos com base na qualidade da informação que encontra.
Por exemplo, se lhe for pedido para criar uma estratégia de lançamento de produto, não depende apenas de um prompt que descreva todo o fluxo de trabalho de investigação e tomada de decisão. Em vez disso, o modelo agentic decide de forma independente:

1. Recuperar relatórios atuais de tendências de mercado usando Bing Web Grounding
2. Identificar dados relevantes de concorrentes usando Azure AI Search.
3.	Correlacionar métricas históricas internas de vendas usando Azure SQL Database.
4.	Sintetizar as conclusões numa estratégia coerente orquestrada via Azure OpenAI Service.
5.	Avaliar a estratégia quanto a lacunas ou inconsistências, acionando outra ronda de recuperação se necessário.
Todos estes passos — refinar consultas, escolher fontes, iterar até ficar “satisfeito” com a resposta — são decididos pelo modelo, não pré-escritos por um humano.

## Iterative Loops, Tool Integration, and Memory

![Tool Integration Architecture](../../../translated_images/pt-PT/tool-integration.0f569710b5c17c10.webp)

Um sistema agentic baseia-se num padrão de interação em ciclo:

- **Initial Call:** O objetivo do utilizador (também conhecido por prompt do utilizador) é apresentado ao LLM.
- **Tool Invocation:** Se o modelo identificar informação em falta ou instruções ambíguas, seleciona uma ferramenta ou método de recuperação — como uma consulta a uma base de dados vetorial (por exemplo, pesquisa híbrida Azure AI Search sobre dados privados) ou uma chamada SQL estruturada — para obter mais contexto.
- **Assessment & Refinement:** Após analisar os dados retornados, o modelo decide se a informação é suficiente. Se não for, refina a consulta, experimenta outra ferramenta ou ajusta a sua abordagem.
- **Repeat Until Satisfied:** Este ciclo continua até o modelo determinar que tem clareza e evidência suficientes para entregar uma resposta final, bem fundamentada.
- **Memory & State:** Como o sistema mantém estado e memória ao longo dos passos, pode recordar tentativas anteriores e os seus resultados, evitando loops repetitivos e tomando decisões mais informadas à medida que avança.

Com o tempo, isto cria uma sensação de compreensão evolutiva, permitindo ao modelo navegar em tarefas complexas e multi-etapa sem exigir que um humano intervenha constantemente ou reformule o prompt.

## Handling Failure Modes and Self-Correction

A autonomia do Agentic RAG envolve também mecanismos robustos de autocorreção. Quando o sistema encontra impasses — como recuperar documentos irrelevantes ou encontrar consultas malformadas — pode:

- **Iterate and Re-Query:** Em vez de devolver respostas de baixo valor, o modelo tenta novas estratégias de pesquisa, reescreve consultas a bases de dados ou analisa conjuntos de dados alternativos.
- **Use Diagnostic Tools:** O sistema pode invocar funções adicionais concebidas para o ajudar a depurar os seus passos de raciocínio ou confirmar a corretidão dos dados recuperados. Ferramentas como Azure AI Tracing serão importantes para permitir observabilidade e monitorização robustas.
- **Fallback on Human Oversight:** Para cenários de alto risco ou falhas repetidas, o modelo pode assinalar incerteza e solicitar orientação humana. Assim que o humano fornece feedback corretivo, o modelo pode incorporar essa lição nas interações subsequentes.

Esta abordagem iterativa e dinâmica permite ao modelo melhorar continuamente, garantindo que não é apenas um sistema de tentativa única, mas sim um que aprende com os seus erros durante uma dada sessão.

![Self Correction Mechanism](../../../translated_images/pt-PT/self-correction.da87f3783b7f174b.webp)

## Boundaries of Agency

Apesar da sua autonomia dentro de uma tarefa, o Agentic RAG não é análogo à Inteligência Artificial Geral. As suas capacidades “agentic” estão limitadas às ferramentas, fontes de dados e políticas fornecidas por desenvolvedores humanos. Não pode inventar as suas próprias ferramentas nem ultrapassar os limites de domínio definidos. Em vez disso, destaca-se na orquestração dinâmica dos recursos disponíveis.
As diferenças chave em relação a formas de IA mais avançadas incluem:

1. **Domain-Specific Autonomy:** Sistemas Agentic RAG focam-se em atingir objetivos definidos pelo utilizador dentro de um domínio conhecido, empregando estratégias como reescrita de consultas ou seleção de ferramentas para melhorar os resultados.
2. **Infrastructure-Dependent:** As capacidades do sistema dependem das ferramentas e dados integrados pelos desenvolvedores. Não pode ultrapassar esses limites sem intervenção humana.
3. **Respect for Guardrails:** Diretrizes éticas, regras de conformidade e políticas empresariais continuam a ser muito importantes. A liberdade do agente é sempre limitada por medidas de segurança e mecanismos de supervisão (esperançosamente?)

## Practical Use Cases and Value

Agentic RAG destaca-se em cenários que exigem refinamento iterativo e precisão:

1. **Correctness-First Environments:** Em verificações de conformidade, análises regulamentares ou pesquisa jurídica, o modelo agentic pode verificar factos repetidamente, consultar múltiplas fontes e reescrever consultas até produzir uma resposta minuciosamente validada.
2. **Complex Database Interactions:** Ao lidar com dados estruturados onde as consultas podem falhar frequentemente ou necessitar de ajuste, o sistema pode refinar autonomamente as suas consultas usando Azure SQL ou Microsoft Fabric OneLake, assegurando que a recuperação final alinha com a intenção do utilizador.
3. **Extended Workflows:** Sessões de longa duração podem evoluir à medida que nova informação surge. O Agentic RAG pode incorporar continuamente novos dados, alterando estratégias conforme aprende mais sobre o espaço do problema.

## Governance, Transparency, and Trust

À medida que estes sistemas se tornam mais autónomos no seu raciocínio, a governação e a transparência são cruciais:

- **Explainable Reasoning:** O modelo pode fornecer um rasto de auditoria das consultas que realizou, das fontes que consultou e dos passos de raciocínio que tomou para chegar à sua conclusão. Ferramentas como Azure AI Content Safety e Azure AI Tracing / GenAIOps podem ajudar a manter a transparência e mitigar riscos.
- **Bias Control and Balanced Retrieval:** Os desenvolvedores podem afinar estratégias de recuperação para garantir que se consideram fontes de dados equilibradas e representativas, e auditar regularmente as saídas para detetar viés ou padrões enviesados usando modelos personalizados para organizações avançadas de ciência de dados que utilizam Azure Machine Learning.
- **Human Oversight and Compliance:** Para tarefas sensíveis, a revisão humana continua a ser essencial. O Agentic RAG não substitui o julgamento humano em decisões críticas — complementa-o ao fornecer opções mais cuidadosamente verificadas.

Ter ferramentas que forneçam um registo claro de ações é essencial. Sem elas, depurar um processo multi-etapa pode ser muito difícil. Veja o exemplo seguinte da Literal AI (empresa por trás do Chainlit) para uma execução de agente:

![AgentRunExample](../../../translated_images/pt-PT/AgentRunExample.471a94bc40cbdc0c.webp)

## Conclusion

O Agentic RAG representa uma evolução natural na forma como os sistemas de IA lidam com tarefas complexas e intensivas em dados. Ao adotar um padrão de interação em ciclo, selecionar ferramentas de forma autónoma e refinar consultas até alcançar um resultado de alta qualidade, o sistema ultrapassa o seguimento estático de prompts e transforma-se num decisor mais adaptativo e consciente do contexto. Embora ainda esteja limitado pela infraestrutura e pelas diretrizes éticas definidas por humanos, estas capacidades agentic permitem interações de IA mais ricas, dinâmicas e, em última análise, mais úteis tanto para empresas como para utilizadores finais.

### Got More Questions about Agentic RAG?

Junte-se ao [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) para se encontrar com outros aprendizes, participar em horas de atendimento e ver as suas dúvidas sobre AI Agents esclarecidas.

## Additional Resources
- <a href="https://learn.microsoft.com/training/modules/use-own-data-azure-openai" target="_blank">Implemente Retrieval Augmented Generation (RAG) com o Azure OpenAI Service: Aprenda a usar os seus próprios dados com o Azure OpenAI Service. Este módulo do Microsoft Learn fornece um guia abrangente sobre a implementação de RAG</a>
- <a href="https://learn.microsoft.com/azure/ai-studio/concepts/evaluation-approach-gen-ai" target="_blank">Avaliação de aplicações de IA generativa com o Microsoft Foundry: Este artigo aborda a avaliação e comparação de modelos em conjuntos de dados publicamente disponíveis, incluindo aplicações de IA com agentes e arquiteturas RAG</a>
- <a href="https://weaviate.io/blog/what-is-agentic-rag" target="_blank">O que é o Agentic RAG | Weaviate</a>
- <a href="https://ragaboutit.com/agentic-rag-a-complete-guide-to-agent-based-retrieval-augmented-generation/" target="_blank">Agentic RAG: Um Guia Completo para Retrieval Augmented Generation baseada em agentes – Notícias de generation RAG</a>
- <a href="https://huggingface.co/learn/cookbook/agent_rag" target="_blank">Agentic RAG: Potencie o seu RAG com reformulação de consultas e auto-consulta! Livro de Receitas de IA Open-Source da Hugging Face</a>
- <a href="https://youtu.be/aQ4yQXeB1Ss?si=2HUqBzHoeB5tR04U" target="_blank">Adicionando Camadas Agentic ao RAG</a>
- <a href="https://www.youtube.com/watch?v=zeAyuLc_f3Q&t=244s" target="_blank">O Futuro dos Assistentes de Conhecimento: Jerry Liu</a>
- <a href="https://www.youtube.com/watch?v=AOSjiXP1jmQ" target="_blank">Como Construir Sistemas Agentic RAG</a>
- <a href="https://ignite.microsoft.com/sessions/BRK102?source=sessions" target="_blank">Usar o Microsoft Foundry Agent Service para escalar os seus agentes de IA</a>

### Artigos Académicos

- <a href="https://arxiv.org/abs/2303.17651" target="_blank">2303.17651 Self-Refine: Refinamento Iterativo com Auto-Feedback</a>
- <a href="https://arxiv.org/abs/2303.11366" target="_blank">2303.11366 Reflexion: Agentes de Linguagem com Aprendizagem por Reforço Verbal</a>
- <a href="https://arxiv.org/abs/2305.11738" target="_blank">2305.11738 CRITIC: Grandes Modelos de Linguagem Podem Autocorrigir-se com Crítica Interactiva por Ferramentas</a>
- <a href="https://arxiv.org/abs/2501.09136" target="_blank">2501.09136 Agentic Retrieval-Augmented Generation: Uma Revisão sobre Agentic RAG</a>

## Lição Anterior

[Padrão de Utilização de Ferramentas](../04-tool-use/README.md)

## Próxima Lição

[Construção de Agentes de IA Confiáveis](../06-building-trustworthy-agents/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
Isenção de responsabilidade:
Este documento foi traduzido utilizando o serviço de tradução por IA Co-op Translator (https://github.com/Azure/co-op-translator). Embora nos esforcemos por garantir a precisão, tenha em atenção que traduções automáticas podem conter erros ou imprecisões. O documento original, na sua língua nativa, deve ser considerado a fonte autorizada. Para informação crítica, recomenda-se uma tradução profissional feita por um tradutor humano. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->