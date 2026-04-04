# Engenharia de Contexto para Agentes de IA

[![Context Engineering](../../../translated_images/pt-PT/lesson-12-thumbnail.ed19c94463e774d4.webp)](https://youtu.be/F5zqRV7gEag)

> _(Clique na imagem acima para ver o vídeo desta lição)_

Compreender a complexidade da aplicação para a qual está a construir um agente de IA é importante para criar um agente fiável. Precisamos construir Agentes de IA que gerem eficazmente a informação para responder a necessidades complexas para além da engenharia de prompts.

Nesta lição, vamos ver o que é a engenharia de contexto e o seu papel na construção de agentes de IA.

## Introdução

Esta lição irá cobrir:

• **O que é Engenharia de Contexto** e por que é diferente da engenharia de prompts.

• **Estratégias para uma Engenharia de Contexto eficaz**, incluindo como escrever, selecionar, comprimir e isolar informação.

• **Falhas Comuns de Contexto** que podem descarrilar o seu agente de IA e como corrigi-las.

## Objetivos de Aprendizagem

Depois de completar esta lição, irá compreender como:

• **Definir engenharia de contexto** e diferenciá-la da engenharia de prompts.

• **Identificar os componentes chave do contexto** em aplicações de Grandes Modelos de Linguagem (LLM).

• **Aplicar estratégias para escrever, selecionar, comprimir e isolar contexto** para melhorar o desempenho do agente.

• **Reconhecer falhas comuns de contexto** como envenenamento, distração, confusão e conflito, e implementar técnicas de mitigação.

## O que é Engenharia de Contexto?

Para Agentes de IA, contexto é o que orienta o planeamento de um Agente de IA para tomar certas ações. Engenharia de Contexto é a prática de garantir que o Agente de IA tem a informação certa para completar a próxima etapa da tarefa. A janela de contexto é limitada em tamanho, por isso, como construtores de agentes, precisamos construir sistemas e processos para gerir a adição, remoção e condensação da informação na janela de contexto.

### Engenharia de Prompt vs Engenharia de Contexto

A engenharia de prompt foca-se num conjunto único de instruções estáticas para guiar eficazmente os Agentes de IA com um conjunto de regras. A engenharia de contexto é como gerir um conjunto dinâmico de informação, incluindo o prompt inicial, para garantir que o Agente de IA tem o que precisa ao longo do tempo. A ideia principal da engenharia de contexto é tornar este processo repetível e fiável.

### Tipos de Contexto

[![Types of Context](../../../translated_images/pt-PT/context-types.fc10b8927ee43f06.webp)](https://youtu.be/F5zqRV7gEag)

É importante lembrar que o contexto não é apenas uma coisa. A informação que o Agente de IA precisa pode vir de várias fontes diferentes e cabe a nós garantir que o agente tem acesso a estas fontes:

Os tipos de contexto que um agente de IA pode precisar gerir incluem:

• **Instruções:** Estas são como as "regras" do agente – prompts, mensagens do sistema, exemplos few-shot (mostrando à IA como fazer algo) e descrições de ferramentas que pode usar. É aqui que o foco da engenharia de prompts combina com a engenharia de contexto.

• **Conhecimento:** Isto cobre factos, informação recuperada de bases de dados ou memórias de longo prazo que o agente acumulou. Isto inclui integrar um sistema de Retrieval Augmented Generation (RAG) se o agente precisar de aceder a diferentes repositórios de conhecimento e bases de dados.

• **Ferramentas:** Estas são as definições de funções externas, APIs e MCP Servers que o agente pode chamar, juntamente com o feedback (resultados) que obtém ao usá-las.

• **Histórico da Conversa:** O diálogo contínuo com um utilizador. À medida que o tempo passa, estas conversas tornam-se mais longas e complexas, o que significa que ocupam espaço na janela de contexto.

• **Preferências do Utilizador:** Informação aprendida sobre gostos ou desgostos do utilizador ao longo do tempo. Estas podem ser armazenadas e chamadas quando necessárias para ajudar o utilizador a tomar decisões importantes.

## Estratégias para uma Engenharia de Contexto Eficaz

### Estratégias de Planeamento

[![Context Engineering Best Practices](../../../translated_images/pt-PT/best-practices.f4170873dc554f58.webp)](https://youtu.be/F5zqRV7gEag)

Boa engenharia de contexto começa com um bom planeamento. Aqui está uma abordagem que o ajudará a começar a pensar em como aplicar o conceito de engenharia de contexto:

1. **Definir Resultados Claros** - Os resultados das tarefas que os Agentes de IA irão executar devem ser claramente definidos. Responda à pergunta - "Como será o mundo quando o Agente de IA terminar a sua tarefa?" Em outras palavras, que mudança, informação ou resposta o utilizador deve ter depois de interagir com o Agente de IA.

2. **Mapear o Contexto** - Depois de definir os resultados do Agente de IA, precisa responder à questão "Que informação o Agente de IA precisa para completar esta tarefa?". Desta forma pode começar a mapear o contexto de onde essa informação pode estar localizada.

3. **Criar Fluxos de Contexto** - Agora que sabe onde está a informação, precisa responder à questão "Como é que o Agente irá conseguir esta informação?". Isto pode ser feito de várias formas, incluindo RAG, uso de servidores MCP e outras ferramentas.

### Estratégias Práticas

O planeamento é importante, mas assim que a informação começa a fluir para a janela de contexto do nosso agente, precisamos ter estratégias práticas para a gerir:

#### Gestão de Contexto

Embora alguma informação seja adicionada automaticamente à janela de contexto, a engenharia de contexto trata de ter um papel mais ativo nesta informação, o que pode ser feito através de algumas estratégias:

 1. **Bloco de Notas do Agente**  
 Isto permite que um Agente de IA tome notas de informação relevante sobre as tarefas atuais e interações com o utilizador durante uma única sessão. Deve existir fora da janela de contexto, num ficheiro ou objeto de runtime que o agente possa posteriormente recuperar durante esta sessão, se necessário.

 2. **Memórias**  
 Os blocos de notas são bons para gerir informação fora da janela de contexto de uma única sessão. As memórias permitem que os agentes armazenem e recuperem informação relevante através de múltiplas sessões. Isto pode incluir resumos, preferências do utilizador e feedback para melhorias futuras.

 3. **Compressão do Contexto**  
 Quando a janela de contexto cresce e está perto do limite, podem ser usadas técnicas como sumarização e corte. Isto inclui manter apenas a informação mais relevante ou remover mensagens mais antigas.

 4. **Sistemas Multi-Agente**  
 Desenvolver sistemas multi-agente é uma forma de engenharia de contexto porque cada agente tem a sua própria janela de contexto. Como esse contexto é partilhado e passado para diferentes agentes é outra coisa a planear ao construir estes sistemas.

 5. **Ambientes Sandbox**  
 Se um agente precisa de executar algum código ou processar grandes quantidades de informação num documento, isso pode consumir muitos tokens ao processar os resultados. Em vez de ter tudo isto armazenado na janela de contexto, o agente pode usar um ambiente sandbox capaz de executar esse código e apenas ler os resultados e outras informações relevantes.

 6. **Objetos de Estado em Runtime**  
 Isto é feito criando contentores de informação para gerir situações em que o Agente precise de aceder a certa informação. Para uma tarefa complexa, isto permitiria a um Agente armazenar os resultados de cada subtarefa passo a passo, mantendo o contexto ligado apenas àquela subtarefa específica.

### Exemplo de Engenharia de Contexto

Vamos supor que queremos que um agente de IA **"Reserve-me uma viagem para Paris."**

• Um agente simples usando apenas engenharia de prompt poderia apenas responder: **"Ok, quando gostaria de ir para Paris?"**. Ele processa apenas a sua pergunta direta no momento em que o utilizador a faz.

• Um agente usando as estratégias de engenharia de contexto abordadas faria muito mais. Antes sequer de responder, o seu sistema poderia:

  ◦ **Verificar o seu calendário** para datas disponíveis (recuperando dados em tempo real).

  ◦ **Recordar preferências de viagens anteriores** (da memória de longo prazo), como a sua companhia aérea preferida, orçamento, ou se prefere voos diretos.

  ◦ **Identificar ferramentas disponíveis** para reserva de voos e hotéis.

- Depois, uma resposta de exemplo poderia ser:  "Olá [Seu Nome]! Vejo que está livre na primeira semana de outubro. Quer que procure voos diretos para Paris na [Companhia Aérea Preferida] dentro do seu orçamento habitual de [Orçamento]?" Esta resposta mais rica e consciente do contexto demonstra o poder da engenharia de contexto.

## Falhas Comuns de Contexto

### Envenenamento do Contexto

**O que é:** Quando uma alucinação (informação falsa gerada pelo LLM) ou um erro entra no contexto e é repetidamente referenciada, fazendo com que o agente persiga objetivos impossíveis ou desenvolva estratégias sem sentido.

**O que fazer:** Implementar **validação do contexto** e **quarentena**. Validar informação antes de ser adicionada à memória de longo prazo. Se for detectado potencial envenenamento, iniciar novos fios de contexto para evitar que a má informação se espalhe.

**Exemplo de Reserva de Viagem:** O seu agente alucina um **voo direto de um pequeno aeroporto local para uma cidade internacional distante** que na realidade não oferece voos internacionais. Este detalhe de voo inexistente fica guardado no contexto. Mais tarde, quando pede ao agente para reservar, ele continua a tentar encontrar passagens para esta rota impossível, levando a erros repetidos.

**Solução:** Implementar um passo que **valide a existência e rotas do voo com uma API em tempo real** _antes_ de adicionar o detalhe do voo ao contexto de trabalho do agente. Se a validação falhar, a informação errada é "quarentenada" e não usada mais.

### Distração do Contexto

**O que é:** Quando o contexto se torna tão grande que o modelo foca-se demasiado no histórico acumulado em vez de usar o que aprendeu durante o treino, levando a ações repetitivas ou inúteis. Os modelos podem começar a cometer erros mesmo antes da janela de contexto ficar cheia.

**O que fazer:** Usar **sumarização do contexto**. Periodicamente comprimir a informação acumulada em resumos mais curtos, mantendo detalhes importantes e removendo histórico redundante. Isto ajuda a "resetar" o foco.

**Exemplo de Reserva de Viagem:** Tem vindo a discutir vários destinos de sonho durante muito tempo, incluindo uma descrição detalhada da sua viagem de mochilão de há dois anos. Quando finalmente pede para **"encontrar um voo barato para o próximo mês"**, o agente fica atolado em detalhes antigos e irrelevantes e continua a perguntar sobre o seu equipamento de mochilão ou itinerários passados, ignorando o seu pedido atual.

**Solução:** Depois de um certo número de interações ou quando o contexto fica grande demais, o agente deve **resumir as partes mais recentes e relevantes da conversa** – focando-se nas suas datas atuais de viagem e destino – e usar esse resumo condensado na próxima chamada ao LLM, descartando o chat histórico menos relevante.

### Confusão do Contexto

**O que é:** Quando contexto desnecessário, frequentemente na forma de demasiadas ferramentas disponíveis, faz com que o modelo gere respostas erradas ou chame ferramentas irrelevantes. Modelos mais pequenos são especialmente suscetíveis a isto.

**O que fazer:** Implementar **gestão da carga de ferramentas** usando técnicas RAG. Armazenar descrições das ferramentas numa base de dados vetorial e selecionar _apenas_ as ferramentas mais relevantes para cada tarefa específica. A pesquisa mostra limitar a seleção a menos de 30 ferramentas.

**Exemplo de Reserva de Viagem:** O seu agente tem acesso a dezenas de ferramentas: `book_flight`, `book_hotel`, `rent_car`, `find_tours`, `currency_converter`, `weather_forecast`, `restaurant_reservations`, etc. Você pergunta, **"Qual é a melhor forma de se deslocar em Paris?"** Devido ao grande número de ferramentas, o agente fica confuso e tenta chamar `book_flight` _dentro_ de Paris, ou `rent_car` mesmo que prefira transporte público, porque as descrições das ferramentas podem sobrepor-se ou ele simplesmente não consegue identificar a melhor.

**Solução:** Usar **RAG sobre as descrições das ferramentas**. Quando pergunta sobre deslocações em Paris, o sistema recupera dinamicamente _apenas_ as ferramentas mais relevantes como `rent_car` ou `public_transport_info` com base na sua pergunta, apresentando uma "carga" focada de ferramentas ao LLM.

### Conflito de Contexto

**O que é:** Quando existem informações conflitantes dentro do contexto, levando a raciocínios inconsistentes ou respostas finais erradas. Isso acontece frequentemente quando a informação chega em fases, e suposições iniciais incorretas permanecem no contexto.

**O que fazer:** Usar **poda do contexto** e **descarregamento**. Poda significa remover informação desatualizada ou conflituosa à medida que chegam novos detalhes. Descarregar dá ao modelo um espaço de trabalho "bloco de notas" separado para processar informação sem poluir o contexto principal.

**Exemplo de Reserva de Viagem:** Inicialmente diz ao seu agente, **"Quero voar em classe económica."** Mais tarde na conversa, muda de ideias e diz, **"Na verdade, para esta viagem, vamos em classe executiva."** Se ambas as instruções permanecerem no contexto, o agente pode receber resultados de pesquisa conflitantes ou ficar confuso sobre qual preferência priorizar.

**Solução:** Implementar **poda do contexto**. Quando uma nova instrução contradiz uma antiga, a instrução mais antiga é removida ou explicitamente sobreposta no contexto. Alternativamente, o agente pode usar um **bloco de notas** para reconciliar preferências conflitantes antes de decidir, garantindo que apenas a instrução final e consistente orienta as suas ações.

## Tem mais perguntas sobre Engenharia de Contexto?

Junte-se ao [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) para conhecer outros aprendizes, participar em horas de atendimento e obter respostas às suas questões sobre Agentes de IA.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, esteja ciente de que as traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte oficial. Para informações críticas, recomenda-se a tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->