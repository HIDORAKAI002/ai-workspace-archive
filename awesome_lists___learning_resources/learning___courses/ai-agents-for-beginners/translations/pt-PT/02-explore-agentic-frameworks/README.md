[![Exploring AI Agent Frameworks](../../../translated_images/pt-PT/lesson-2-thumbnail.c65f44c93b8558df.webp)](https://youtu.be/ODwF-EZo_O8?si=1xoy_B9RNQfrYdF7)

> _(Clique na imagem acima para ver o vídeo desta lição)_

# Explorar Frameworks de Agentes de IA

Frameworks de agentes de IA são plataformas de software desenhadas para simplificar a criação, implementação e gestão de agentes de IA. Estes frameworks fornecem aos desenvolvedores componentes pré-construídos, abstrações e ferramentas que agilizam o desenvolvimento de sistemas de IA complexos.

Estes frameworks ajudam os desenvolvedores a focar-se nos aspetos únicos das suas aplicações, fornecendo abordagens padronizadas para desafios comuns no desenvolvimento de agentes de IA. Eles melhoram a escalabilidade, acessibilidade e eficiência na construção de sistemas de IA.

## Introdução 

Esta lição irá cobrir:

- O que são Frameworks de Agentes de IA e o que permitem aos desenvolvedores alcançar?
- Como podem as equipas usar estes para prototipar rapidamente, iterar e melhorar as capacidades dos seus agentes?
- Quais são as diferenças entre os frameworks e ferramentas criados pela Microsoft (<a href="https://aka.ms/ai-agents-beginners/ai-agent-service" target="_blank">Microsoft Foundry Agent Service</a> e o <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework</a>)?
- Posso integrar diretamente as minhas ferramentas existentes do ecossistema Azure, ou preciso de soluções independentes?
- O que é o Microsoft Foundry Agent Service e como isso me está a ajudar?

## Objetivos de aprendizagem

Os objetivos desta lição são ajudar a compreender:

- O papel dos Frameworks de Agentes de IA no desenvolvimento de IA.
- Como tirar partido dos Frameworks de Agentes de IA para construir agentes inteligentes.
- Principais capacidades habilitadas por Frameworks de Agentes de IA.
- As diferenças entre o Microsoft Agent Framework e o Microsoft Foundry Agent Service.

## O que são Frameworks de Agentes de IA e o que permitem aos desenvolvedores fazer?

Frameworks tradicionais de IA podem ajudar a integrar IA nas suas aplicações e melhorar estas aplicações das seguintes formas:

- **Personalização**: A IA pode analisar o comportamento e as preferências dos utilizadores para fornecer recomendações, conteúdos e experiências personalizadas.
Exemplo: Serviços de streaming como Netflix usam IA para sugerir filmes e séries com base no histórico de visualização, aumentando o envolvimento e satisfação dos utilizadores.
- **Automação e Eficiência**: A IA pode automatizar tarefas repetitivas, simplificar fluxos de trabalho e melhorar a eficiência operacional.
Exemplo: Aplicações de serviço ao cliente usam chatbots alimentados por IA para tratar de consultas comuns, reduzindo tempos de resposta e libertando agentes humanos para questões mais complexas.
- **Experiência de Utilizador Melhorada**: A IA pode melhorar a experiência global do utilizador fornecendo funcionalidades inteligentes como reconhecimento de voz, processamento de linguagem natural e texto preditivo.
Exemplo: Assistentes virtuais como Siri e Google Assistant usam IA para entender e responder a comandos de voz, facilitando a interação dos utilizadores com os seus dispositivos.

### Tudo isso soa muito bem, certo? Então, por que precisamos do Framework de Agentes de IA?

Frameworks de Agentes de IA representam algo mais do que apenas frameworks de IA. Eles são desenhados para possibilitar a criação de agentes inteligentes que podem interagir com utilizadores, outros agentes e o ambiente para alcançar objetivos específicos. Estes agentes podem exibir comportamento autónomo, tomar decisões e adaptar-se a condições em mudança. Vamos ver algumas capacidades chave proporcionadas por Frameworks de Agentes de IA:

- **Colaboração e Coordenação de Agentes**: Permitem a criação de múltiplos agentes de IA que podem trabalhar juntos, comunicar e coordenar para resolver tarefas complexas.
- **Automação e Gestão de Tarefas**: Fornecem mecanismos para automatizar fluxos de trabalho multi-etapas, delegação de tarefas e gestão dinâmica de tarefas entre agentes.
- **Compreensão Contextual e Adaptação**: Dotam os agentes da capacidade de entender o contexto, adaptar-se a ambientes em mudança e tomar decisões baseadas em informação em tempo real.

Em resumo, os agentes permitem fazer mais, elevar a automação a outro nível e criar sistemas mais inteligentes que podem adaptar-se e aprender com o seu ambiente.

## Como prototipar, iterar e melhorar rapidamente as capacidades do agente?

Este é um panorama em rápida evolução, mas há alguns aspetos comuns na maioria dos Frameworks de Agentes de IA que podem ajudar a prototipar rapidamente e iterar, nomeadamente componentes modulares, ferramentas colaborativas e aprendizagem em tempo real. Vamos aprofundar estes tópicos:

- **Usar Componentes Modulares**: SDKs de IA oferecem componentes pré-construídos como conectores de IA e Memória, chamadas de funções usando linguagem natural ou plugins de código, templates de prompts e mais.
- **Aproveitar Ferramentas Colaborativas**: Projetar agentes com papéis e tarefas específicas, permitindo-lhes testar e refinar fluxos de trabalho colaborativos.
- **Aprender em Tempo Real**: Implementar ciclos de feedback onde os agentes aprendem com as interações e ajustam o seu comportamento dinamicamente.

### Usar Componentes Modulares

SDKs como o Microsoft Agent Framework oferecem componentes pré-construídos como conectores de IA, definições de ferramentas e gestão de agentes.

**Como as equipas podem usar isto**: As equipas podem rapidamente montar estes componentes para criar um protótipo funcional sem começar do zero, permitindo experimentação e iteração rápidas.

**Como funciona na prática**: Pode usar um parser pré-construído para extrair informações a partir da entrada do utilizador, um módulo de memória para armazenar e recuperar dados, e um gerador de prompts para interagir com os utilizadores, tudo isto sem necessidade de construir estes componentes do zero.

**Exemplo de código**. Vamos ver um exemplo de como pode usar o Microsoft Agent Framework com `FoundryChatClient` para fazer o modelo responder à entrada do utilizador com chamada a ferramentas:

``` python
# Exemplo em Python do Microsoft Agent Framework

import asyncio
import os

from agent_framework import tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


# Defina uma função de ferramenta de exemplo para reservar viagens
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
    # Exemplo de saída: O seu voo para Nova Iorque no dia 1 de janeiro de 2025 foi reservado com sucesso. Boas viagens! ✈️🗽


if __name__ == "__main__":
    asyncio.run(main())
```

O que pode ver a partir deste exemplo é como pode aproveitar um parser pré-construído para extrair informações chave da entrada do utilizador, como origem, destino e data de um pedido de reserva de voo. Esta abordagem modular permite focar-se na lógica de alto nível.

### Aproveitar Ferramentas Colaborativas

Frameworks como o Microsoft Agent Framework facilitam a criação de múltiplos agentes que podem trabalhar em conjunto.

**Como as equipas podem usar isto**: As equipas podem projetar agentes com papéis e tarefas específicas, permitindo-lhes testar e refinar fluxos de trabalho colaborativos e melhorar a eficiência geral do sistema.

**Como funciona na prática**: Pode criar uma equipa de agentes onde cada agente tem uma função especializada, como recolha de dados, análise ou tomada de decisão. Estes agentes podem comunicar e partilhar informação para alcançar um objetivo comum, como responder a uma pergunta do utilizador ou completar uma tarefa.

**Exemplo de código (Microsoft Agent Framework)**:

```python
# Criar múltiplos agentes que trabalham juntos usando o Microsoft Agent Framework

import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

provider = FoundryChatClient(
    project_endpoint=os.environ["AZURE_AI_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=AzureCliCredential(),
)

# Agente de Recuperação de Dados
agent_retrieve = provider.as_agent(
    name="dataretrieval",
    instructions="Retrieve relevant data using available tools.",
    tools=[retrieve_tool],
)

# Agente de Análise de Dados
agent_analyze = provider.as_agent(
    name="dataanalysis",
    instructions="Analyze the retrieved data and provide insights.",
    tools=[analyze_tool],
)

# Executar agentes sequencialmente numa tarefa
retrieval_result = await agent_retrieve.run("Retrieve sales data for Q4")
analysis_result = await agent_analyze.run(f"Analyze this data: {retrieval_result}")
print(analysis_result)
```

O que vê no código anterior é como pode criar uma tarefa que envolve múltiplos agentes a trabalharem juntos para analisar dados. Cada agente realiza uma função específica, e a tarefa é executada coordenando os agentes para alcançar o resultado desejado. Ao criar agentes dedicados com papéis especializados, pode melhorar a eficiência e desempenho da tarefa.

### Aprender em Tempo Real

Frameworks avançados fornecem capacidades para compreensão contextual em tempo real e adaptação.

**Como as equipas podem usar isto**: As equipas podem implementar ciclos de feedback onde os agentes aprendem com as interações e ajustam o seu comportamento dinamicamente, levando a melhoria contínua e refinamento das capacidades.

**Como funciona na prática**: Os agentes podem analisar o feedback dos utilizadores, dados ambientais e resultados das tarefas para atualizar a base de conhecimento, ajustar algoritmos de tomada de decisão e melhorar o desempenho ao longo do tempo. Este processo iterativo de aprendizagem permite que os agentes se adaptem a condições em mudança e preferências dos utilizadores, reforçando a eficácia global do sistema.

## Quais são as diferenças entre o Microsoft Agent Framework e o Microsoft Foundry Agent Service?

Existem muitas formas de comparar estas abordagens, mas vamos olhar para algumas diferenças chave em termos do seu design, capacidades e casos de uso-alvo:

## Microsoft Agent Framework (MAF)

O Microsoft Agent Framework fornece um SDK simplificado para construção de agentes de IA usando `FoundryChatClient`. Permite aos desenvolvedores criar agentes que utilizam modelos Azure OpenAI com chamadas de ferramentas integradas, gestão de conversação e segurança empresarial via identidade Azure.

**Casos de Uso**: Construção de agentes de IA prontos para produção com uso de ferramentas, fluxos de trabalho multi-etapas e cenários de integração empresarial.

Aqui estão alguns conceitos centrais importantes do Microsoft Agent Framework:

- **Agentes**. Um agente é criado via `FoundryChatClient` e configurado com um nome, instruções e ferramentas. O agente pode:
  - **Processar mensagens do utilizador** e gerar respostas usando modelos Azure OpenAI.
  - **Chamar ferramentas** automaticamente com base no contexto da conversa.
  - **Manter estado da conversa** através de múltiplas interações.

  Aqui está um trecho de código mostrando como criar um agente:

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

- **Ferramentas**. O framework suporta definir ferramentas como funções Python que o agente pode invocar automaticamente. As ferramentas são registadas durante a criação do agente:

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

- **Coordenação Multi-Agente**. Pode criar múltiplos agentes com especializações diferentes e coordenar o seu trabalho:

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

- **Integração com Azure Identity**. O framework usa `AzureCliCredential` (ou `DefaultAzureCredential`) para autenticação segura e sem chaves, eliminando a necessidade de gerir chaves de API diretamente.

## Microsoft Foundry Agent Service

Microsoft Foundry Agent Service é uma adição mais recente, introduzida na Microsoft Ignite 2024. Permite o desenvolvimento e implementação de agentes de IA com modelos mais flexíveis, como chamadas diretas a LLMs open-source como Llama 3, Mistral e Cohere.

Microsoft Foundry Agent Service fornece mecanismos de segurança empresarial mais robustos e métodos de armazenamento de dados, tornando-o adequado para aplicações empresariais.

Funciona imediatamente com o Microsoft Agent Framework para construir e implementar agentes.

Este serviço está atualmente em Preview Público e suporta Python e C# para construção de agentes.

Usando o SDK Python do Microsoft Foundry Agent Service, podemos criar um agente com uma ferramenta definida pelo utilizador:

```python
import asyncio
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

# Definir funções da ferramenta
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

### Conceitos principais

Microsoft Foundry Agent Service tem os seguintes conceitos principais:

- **Agente**. Microsoft Foundry Agent Service integra-se com Microsoft Foundry. Dentro do Microsoft Foundry, um Agente de IA atua como um microserviço "inteligente" que pode ser usado para responder a perguntas (RAG), executar ações ou automatizar completamente fluxos de trabalho. Isso é conseguido combinando o poder de modelos generativos de IA com ferramentas que lhe permitem aceder e interagir com fontes de dados do mundo real. Aqui está um exemplo de agente:

    ```python
    agent = project_client.agents.create_agent(
        model="gpt-4.1-mini",
        name="my-agent",
        instructions="You are helpful agent",
        tools=code_interpreter.definitions,
        tool_resources=code_interpreter.resources,
    )
    ```

    Neste exemplo, um agente é criado com o modelo `gpt-4.1-mini`, um nome `my-agent` e instruções `You are helpful agent`. O agente está equipado com ferramentas e recursos para realizar tarefas de interpretação de código.

- **Thread e mensagens**. O thread é outro conceito importante. Representa uma conversa ou interação entre um agente e um utilizador. Threads podem ser usados para acompanhar o progresso de uma conversa, guardar informações de contexto e gerir o estado da interação. Aqui está um exemplo de um thread:

    ```python
    thread = project_client.agents.create_thread()
    message = project_client.agents.create_message(
        thread_id=thread.id,
        role="user",
        content="Could you please create a bar chart for the operating profit using the following data and provide the file to me? Company A: $1.2 million, Company B: $2.5 million, Company C: $3.0 million, Company D: $1.8 million",
    )
    
    # Peça ao agente para realizar trabalho na thread
    run = project_client.agents.create_and_process_run(thread_id=thread.id, agent_id=agent.id)
    
    # Buscar e registar todas as mensagens para ver a resposta do agente
    messages = project_client.agents.list_messages(thread_id=thread.id)
    print(f"Messages: {messages}")
    ```

    No código anterior, um thread é criado. Depois, uma mensagem é enviada ao thread. Ao chamar `create_and_process_run`, pede-se ao agente para executar trabalho no thread. Finalmente, as mensagens são obtidas e registadas para ver a resposta do agente. As mensagens indicam o progresso da conversa entre o utilizador e o agente. É também importante compreender que as mensagens podem ser de diferentes tipos, como texto, imagem ou ficheiro, que são os resultados do trabalho dos agentes, por exemplo uma imagem ou uma resposta em texto. Como desenvolvedor, pode então usar esta informação para processar ainda mais a resposta ou apresentá-la ao utilizador.

- **Integra-se com o Microsoft Agent Framework**. Microsoft Foundry Agent Service funciona perfeitamente com o Microsoft Agent Framework, o que significa que pode construir agentes usando `FoundryChatClient` e implementá-los através do Agent Service para cenários de produção.

**Casos de Uso**: Microsoft Foundry Agent Service é desenhado para aplicações empresariais que requerem implementação segura, escalável e flexível de agentes de IA.

## Qual é a diferença entre estas abordagens?
 
Parece que há alguma sobreposição, mas existem diferenças chave em termos do seu design, capacidades e casos de uso-alvo:
 
- **Microsoft Agent Framework (MAF)**: É um SDK pronto para produção para construção de agentes de IA. Fornece uma API simplificada para criar agentes com chamada a ferramentas, gestão de conversações e integração com identidade Azure.
- **Microsoft Foundry Agent Service**: É uma plataforma e serviço de implementação no Microsoft Foundry para agentes. Oferece conectividade integrada a serviços como Azure OpenAI, Azure AI Search, Bing Search e execução de código.
 
Ainda não tem a certeza do que escolher?

### Casos de Uso
 
Vamos ver se conseguimos ajudar passando por alguns casos de uso comuns:
 
> P: Estou a construir aplicações de agentes de IA para produção e quero começar rapidamente
>

>R: O Microsoft Agent Framework é uma ótima escolha. Fornece uma API simples e Pythonica via `FoundryChatClient` que permite definir agentes com ferramentas e instruções em apenas algumas linhas de código.

>P: Preciso de uma implementação com nível empresarial com integrações Azure como Search e execução de código
>
> R: Microsoft Foundry Agent Service é a melhor opção. É um serviço de plataforma que fornece capacidades integradas para múltiplos modelos, Azure AI Search, Bing Search e Azure Functions. Facilita a criação dos seus agentes no portal Foundry e a sua implementação em escala.
 
> P: Ainda estou confuso, dê-me apenas uma opção
>
> R: Comece pelo Microsoft Agent Framework para construir os seus agentes e depois use o Microsoft Foundry Agent Service quando precisar de implementar e escalar em produção. Esta abordagem permite iterar rapidamente na lógica do agente enquanto tem um caminho claro para implementação empresarial.
 
Vamos resumir as diferenças chave numa tabela:

| Framework | Foco | Conceitos Centrais | Casos de Uso |
| --- | --- | --- | --- |
| Microsoft Agent Framework | SDK simplificado para agentes com chamada a ferramentas | Agentes, Ferramentas, Identidade Azure | Construção de agentes de IA, uso de ferramentas, fluxos multi-etapas |
| Microsoft Foundry Agent Service | Modelos flexíveis, segurança empresarial, geração de código, chamada a ferramentas | Modularidade, Colaboração, Orquestração de Processos | Implementação segura, escalável e flexível de agentes de IA |

## Posso integrar diretamente as minhas ferramentas existentes do ecossistema Azure, ou preciso de soluções independentes?


A resposta é sim, pode integrar as suas ferramentas existentes do ecossistema Azure diretamente com o Microsoft Foundry Agent Service especialmente, uma vez que foi construído para funcionar perfeitamente com outros serviços Azure. Poderia, por exemplo, integrar o Bing, o Azure AI Search, e o Azure Functions. Existe também uma integração profunda com o Microsoft Foundry.

O Microsoft Agent Framework também se integra com serviços Azure através do `FoundryChatClient` e da identidade Azure, permitindo-lhe chamar serviços Azure diretamente a partir das suas ferramentas de agente.

## Códigos de Exemplo

- Python: [Agent Framework (Microsoft Foundry)](./code_samples/02-python-agent-framework.ipynb)
- Python: [Agent Framework (Azure OpenAI Responses API)](./code_samples/02-python-agent-framework-azure-openai.ipynb)
- .NET: [Agent Framework](./code_samples/02-dotnet-agent-framework.md)

## Tem Mais Questões sobre AI Agent Frameworks?

Junte-se ao [Microsoft Foundry Discord](https://discord.com/invite/ATgtXmAS5D) para conhecer outros aprendizes, participar em horas de escritório e obter respostas às suas perguntas sobre AI Agents.

## Referências

- <a href="https://techcommunity.microsoft.com/blog/azure-ai-services-blog/introducing-azure-ai-agent-service/4298357" target="_blank">Azure Agent Service</a>
- <a href="https://learn.microsoft.com/azure/ai-services/openai/how-to/responses" target="_blank">Microsoft Agent Framework - Azure OpenAI Responses</a>
- <a href="https://learn.microsoft.com/azure/ai-services/agents/overview" target="_blank">Microsoft Foundry Agent Service</a>

## Aula Anterior

[Introdução a Agentes de IA e Casos de Uso de Agentes](../01-intro-to-ai-agents/README.md)

## Próxima Aula

[Compreendendo Padrões de Design Agentes](../03-agentic-design-patterns/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->