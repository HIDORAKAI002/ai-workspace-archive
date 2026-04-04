[![Design Multiagente](../../../translated_images/pt-PT/lesson-9-thumbnail.38059e8af1a5b71d.webp)](https://youtu.be/His9R6gw6Ec?si=3_RMb8VprNvdLRhX)

> _(Clique na imagem acima para ver o vídeo desta lição)_
# Metacognição em Agentes de IA

## Introdução

Bem-vindo à lição sobre metacognição em agentes de IA! Este capítulo é destinado a iniciantes curiosos sobre como agentes de IA podem pensar sobre os seus próprios processos de pensamento. No final desta lição, irá compreender conceitos-chave e estará equipado com exemplos práticos para aplicar a metacognição no design de agentes de IA.

## Objetivos de Aprendizagem

Após concluir esta lição, será capaz de:

1. Compreender as implicações de ciclos de raciocínio nas definições de agentes.
2. Utilizar técnicas de planeamento e avaliação para ajudar agentes a autocorrigirem-se.
3. Criar os seus próprios agentes capazes de manipular código para realizar tarefas.

## Introdução à Metacognição

Metacognição refere-se aos processos cognitivos de ordem superior que envolvem pensar sobre o próprio pensamento. Para agentes de IA, isto significa ser capaz de avaliar e ajustar as suas ações com base na autoconsciência e em experiências passadas. Metacognição, ou "pensar sobre pensar", é um conceito importante no desenvolvimento de sistemas de IA agentiva. Envolve sistemas de IA estarem conscientes dos seus próprios processos internos e serem capazes de monitorizar, regular e adaptar o seu comportamento em conformidade. Tal como fazemos quando avaliamos a situação ou analisamos um problema. Esta autoconsciência pode ajudar os sistemas de IA a tomar melhores decisões, identificar erros e melhorar o seu desempenho ao longo do tempo — novamente ligando ao teste de Turing e ao debate sobre se a IA vai dominar.

No contexto de sistemas agentivos de IA, a metacognição pode ajudar a resolver vários desafios, tais como:
- Transparência: Garantir que os sistemas de IA conseguem explicar o seu raciocínio e decisões.
- Raciocínio: Melhorar a capacidade dos sistemas de IA em sintetizar informação e tomar decisões fundamentadas.
- Adaptação: Permitir que os sistemas de IA se ajustem a novos ambientes e a condições em mudança.
- Perceção: Aprimorar a precisão dos sistemas de IA no reconhecimento e interpretação de dados do seu ambiente.

### O que é Metacognição?

Metacognição, ou "pensar sobre pensar", é um processo cognitivo de ordem superior que envolve autoconsciência e autorregulação dos próprios processos cognitivos. No domínio da IA, a metacognição capacita agentes a avaliar e adaptar as suas estratégias e ações, levando a melhorias na resolução de problemas e na tomada de decisões. Ao compreender a metacognição, pode desenhar agentes de IA que sejam não apenas mais inteligentes, mas também mais adaptáveis e eficientes. Na verdadeira metacognição, veria a IA a raciocinar explicitamente sobre o seu próprio raciocínio.

Exemplo: “Priorizei voos mais baratos porque… posso estar a perder voos diretos, por isso vou verificar novamente.”.
Manter registo de como ou por que escolheu uma determinada rota.
- Notar que cometeu erros porque se apoiou excessivamente nas preferências do utilizador da última vez, pelo que modifica a sua estratégia de tomada de decisão e não apenas a recomendação final.
- Diagnosticar padrões como, “Sempre que vejo o utilizador mencionar 'demasiado cheio', não devo apenas remover certas atrações, mas também refletir que o meu método de escolher 'principais atrações' está defeituoso se eu sempre as ordenar por popularidade.”

### Importância da Metacognição em Agentes de IA

A metacognição desempenha um papel crucial no design de agentes de IA por várias razões:

![Importância da Metacognição](../../../translated_images/pt-PT/importance-of-metacognition.b381afe9aae352f7.webp)

- Autorreflexão: Os agentes podem avaliar o seu próprio desempenho e identificar áreas para melhoria.
- Adaptabilidade: Os agentes podem modificar as suas estratégias com base em experiências passadas e ambientes em mudança.
- Correção de Erros: Os agentes podem detetar e corrigir erros de forma autónoma, conduzindo a resultados mais precisos.
- Gestão de Recursos: Os agentes podem otimizar o uso de recursos, como tempo e poder computacional, através do planeamento e avaliação das suas ações.

## Componentes de um Agente de IA

Antes de mergulhar nos processos metacognitivos, é essencial compreender os componentes básicos de um agente de IA. Um agente de IA tipicamente consiste em:

- Persona: A personalidade e as características do agente, que definem como interage com os utilizadores.
- Ferramentas: As capacidades e funções que o agente pode executar.
- Competências: O conhecimento e a experiência que o agente possui.

Estes componentes trabalham em conjunto para criar uma "unidade de especialização" que pode realizar tarefas específicas.

**Exemplo**:
Considere um agente de viagens, um serviço de agente que não só planeia as suas férias mas também ajusta o seu percurso com base em dados em tempo real e em experiências de jornadas de clientes anteriores.

### Exemplo: Metacognição num Serviço de Agente de Viagens

Imagine que está a conceber um serviço de agente de viagens alimentado por IA. Este agente, "Agente de Viagens", auxilia os utilizadores a planear as suas férias. Para incorporar metacognição, o Agente de Viagens precisa de avaliar e ajustar as suas ações com base na autoconsciência e em experiências passadas. Eis como a metacognição poderia intervir:

#### Tarefa Atual

A tarefa atual é ajudar um utilizador a planear uma viagem a Paris.

#### Passos para Completar a Tarefa

1. **Recolher Preferências do Utilizador**: Perguntar ao utilizador sobre as datas da viagem, orçamento, interesses (por exemplo, museus, gastronomia, compras) e quaisquer requisitos específicos.
2. **Obter Informação**: Procurar opções de voos, alojamento, atrações e restaurantes que correspondam às preferências do utilizador.
3. **Gerar Recomendações**: Fornecer um itinerário personalizado com detalhes dos voos, reservas de hotéis e atividades sugeridas.
4. **Ajustar com Base no Feedback**: Pedir ao utilizador feedback sobre as recomendações e fazer os ajustes necessários.

#### Recursos Necessários

- Acesso a bases de dados de reservas de voos e hotéis.
- Informação sobre atrações e restaurantes parisienses.
- Dados de feedback de utilizadores de interações anteriores.

#### Experiência e Autorreflexão

O Agente de Viagens usa metacognição para avaliar o seu desempenho e aprender com experiências passadas. Por exemplo:

1. **Analisar o Feedback do Utilizador**: O Agente de Viagens revê o feedback do utilizador para determinar quais recomendações foram bem recebidas e quais não foram. Ajusta as suas sugestões futuras em conformidade.
2. **Adaptabilidade**: Se um utilizador mencionou anteriormente que não gosta de locais muito movimentados, o Agente de Viagens evitará recomendar pontos turísticos populares durante as horas de pico no futuro.
3. **Correção de Erros**: Se o Agente de Viagens cometeu um erro numa reserva anterior, como sugerir um hotel que estava totalmente lotado, aprende a verificar a disponibilidade de forma mais rigorosa antes de fazer recomendações.

#### Exemplo Prático para Desenvolvedores

Aqui está um exemplo simplificado de como o código do Agente de Viagens pode parecer quando incorpora metacognição:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        # Pesquisar voos, hotéis e atrações com base nas preferências
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        # Analisar o feedback e ajustar as recomendações futuras
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Exemplo de utilização
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

#### Porque a Metacognição é Importante

- **Autorreflexão**: Os agentes podem analisar o seu desempenho e identificar áreas para melhoria.
- **Adaptabilidade**: Os agentes podem modificar estratégias com base em feedback e condições em mudança.
- **Correção de Erros**: Os agentes podem detetar e corrigir erros autonomamente.
- **Gestão de Recursos**: Os agentes podem otimizar o uso de recursos, como tempo e poder computacional.

Ao incorporar metacognição, o Agente de Viagens pode fornecer recomendações de viagem mais personalizadas e precisas, melhorando a experiência geral do utilizador.

---

## 2. Planeamento em Agentes

O planeamento é um componente crítico do comportamento de um agente de IA. Envolve delinear os passos necessários para atingir um objetivo, considerando o estado atual, recursos e possíveis obstáculos.

### Elementos do Planeamento

- **Tarefa Atual**: Definir a tarefa de forma clara.
- **Passos para Completar a Tarefa**: Dividir a tarefa em passos geríveis.
- **Recursos Necessários**: Identificar os recursos necessários.
- **Experiência**: Utilizar experiências passadas para informar o planeamento.

**Exemplo**:
Aqui estão os passos que o Agente de Viagens precisa de seguir para ajudar um utilizador a planear eficazmente a sua viagem:

### Passos para o Agente de Viagens

1. **Recolher Preferências do Utilizador**
   - Perguntar ao utilizador por detalhes sobre as datas da viagem, orçamento, interesses e quaisquer requisitos específicos.
   - Exemplos: "Quando planeia viajar?" "Qual é a sua faixa de orçamento?" "Que atividades aprecia nas férias?"

2. **Obter Informação**
   - Procurar opções de viagem relevantes com base nas preferências do utilizador.
   - **Voos**: Procurar voos disponíveis dentro do orçamento do utilizador e nas datas preferidas.
   - **Alojamento**: Encontrar hotéis ou propriedades de aluguer que correspondam às preferências do utilizador quanto à localização, preço e comodidades.
   - **Atrações e Restaurantes**: Identificar atrações populares, atividades e opções de restauração que se alinhem com os interesses do utilizador.

3. **Gerar Recomendações**
   - Compilar a informação obtida num itinerário personalizado.
   - Fornecer detalhes como opções de voos, reservas de hotel e atividades sugeridas, garantindo que as recomendações estão adaptadas às preferências do utilizador.

4. **Apresentar o Itinerário ao Utilizador**
   - Partilhar o itinerário proposto com o utilizador para a sua revisão.
   - Exemplo: "Aqui está um itinerário sugerido para a sua viagem a Paris. Inclui detalhes dos voos, reservas de hotel e uma lista de atividades e restaurantes recomendados. Diga-me o que acha!"

5. **Recolher Feedback**
   - Perguntar ao utilizador pelo feedback sobre o itinerário proposto.
   - Exemplos: "Gosta das opções de voo?" "O hotel é adequado às suas necessidades?" "Há atividades que gostaria de adicionar ou remover?"

6. **Ajustar com Base no Feedback**
   - Modificar o itinerário com base no feedback do utilizador.
   - Fazer as alterações necessárias às recomendações de voos, alojamento e atividades para corresponder melhor às preferências do utilizador.

7. **Confirmação Final**
   - Apresentar o itinerário atualizado ao utilizador para confirmação final.
   - Exemplo: "Fiz os ajustes com base no seu feedback. Aqui está o itinerário atualizado. Está tudo bem para si?"

8. **Reservar e Confirmar**
   - Uma vez que o utilizador aprove o itinerário, proceder à reserva de voos, alojamentos e quaisquer atividades pré-planeadas.
   - Enviar os detalhes de confirmação ao utilizador.

9. **Fornecer Suporte Contínuo**
   - Manter-se disponível para ajudar o utilizador com quaisquer alterações ou pedidos adicionais antes e durante a viagem.
   - Exemplo: "Se precisar de mais assistência durante a viagem, não hesite em contactar-me a qualquer momento!"

### Exemplo de Interação

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)

# Exemplo de uso num pedido de vaias
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
travel_agent.adjust_based_on_feedback(feedback)
```

## 3. Sistema RAG Corretivo

Firstly let's start by understanding the difference between RAG Tool and Pre-emptive Context Load

![RAG vs Carregamento de Contexto](../../../translated_images/pt-PT/rag-vs-context.9eae588520c00921.webp)

### Geração Aumentada por Recuperação (RAG)

RAG combina um sistema de recuperação com um modelo generativo. Quando é feita uma consulta, o sistema de recuperação obtém documentos ou dados relevantes a partir de uma fonte externa, e essa informação recuperada é usada para aumentar a entrada do modelo generativo. Isto ajuda o modelo a gerar respostas mais precisas e contextualmente relevantes.

Numa arquitetura RAG, o agente recupera informação relevante de uma base de conhecimento e usa-a para gerar respostas ou ações apropriadas.

### Abordagem RAG Corretiva

A abordagem RAG Corretiva foca-se na utilização de técnicas RAG para corrigir erros e melhorar a precisão dos agentes de IA. Isto envolve:

1. **Técnica de Prompt**: Usar prompts específicos para guiar o agente na recuperação de informação relevante.
2. **Ferramenta**: Implementar algoritmos e mecanismos que permitam ao agente avaliar a relevância da informação recuperada e gerar respostas precisas.
3. **Avaliação**: Avaliar continuamente o desempenho do agente e fazer ajustes para melhorar a sua precisão e eficiência.

#### Exemplo: RAG Corretivo num Agente de Pesquisa

Considere um agente de pesquisa que recupera informação da web para responder a questões dos utilizadores. A abordagem RAG Corretiva pode envolver:

1. **Técnica de Prompt**: Formular consultas de pesquisa com base na entrada do utilizador.
2. **Ferramenta**: Usar processamento de linguagem natural e algoritmos de machine learning para classificar e filtrar os resultados da pesquisa.
3. **Avaliação**: Analisar o feedback do utilizador para identificar e corrigir imprecisões na informação recuperada.

### RAG Corretivo no Agente de Viagens

O RAG Corretivo (Retrieval-Augmented Generation) melhora a capacidade de uma IA em recuperar e gerar informação enquanto corrige eventuais imprecisões. Vejamos como o Agente de Viagens pode usar a abordagem RAG Corretiva para fornecer recomendações mais precisas e relevantes de viagem.

Isto envolve:

- **Técnica de Prompt:** Usar prompts específicos para guiar o agente na recuperação de informação relevante.
- **Ferramenta:** Implementar algoritmos e mecanismos que permitam ao agente avaliar a relevância da informação recuperada e gerar respostas precisas.
- **Avaliação:** Avaliar continuamente o desempenho do agente e fazer ajustes para melhorar a sua precisão e eficiência.

#### Passos para Implementar o RAG Corretivo no Agente de Viagens

1. **Interação Inicial com o Utilizador**
   - O Agente de Viagens recolhe preferências iniciais do utilizador, tais como destino, datas de viagem, orçamento e interesses.
   - Exemplo:

     ```python
     preferences = {
         "destination": "Paris",
         "dates": "2025-04-01 to 2025-04-10",
         "budget": "moderate",
         "interests": ["museums", "cuisine"]
     }
     ```

2. **Recuperação de Informação**
   - O Agente de Viagens recupera informação sobre voos, alojamentos, atrações e restaurantes com base nas preferências do utilizador.
   - Exemplo:

     ```python
     flights = search_flights(preferences)
     hotels = search_hotels(preferences)
     attractions = search_attractions(preferences)
     ```

3. **Gerar Recomendações Iniciais**
   - O Agente de Viagens usa a informação recuperada para gerar um itinerário personalizado.
   - Exemplo:

     ```python
     itinerary = create_itinerary(flights, hotels, attractions)
     print("Suggested Itinerary:", itinerary)
     ```

4. **Recolher Feedback do Utilizador**
   - O Agente de Viagens pede ao utilizador feedback sobre as recomendações iniciais.
   - Exemplo:

     ```python
     feedback = {
         "liked": ["Louvre Museum"],
         "disliked": ["Eiffel Tower (too crowded)"]
     }
     ```

5. **Processo RAG Corretivo**
   - **Técnica de Prompt**: O Agente de Viagens formula novas consultas de pesquisa com base no feedback do utilizador.
     - Exemplo:

       ```python
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       ```

   - **Ferramenta**: O Agente de Viagens utiliza algoritmos para classificar e filtrar novos resultados de pesquisa, enfatizando a relevância com base no feedback do utilizador.
     - Exemplo:

       ```python
       new_attractions = search_attractions(preferences)
       new_itinerary = create_itinerary(flights, hotels, new_attractions)
       print("Updated Itinerary:", new_itinerary)
       ```

   - **Avaliação**: O Agente de Viagens avalia continuamente a relevância e precisão das suas recomendações analisando o feedback do utilizador e fazendo os ajustes necessários.
     - Exemplo:

       ```python
       def adjust_preferences(preferences, feedback):
           if "liked" in feedback:
               preferences["favorites"] = feedback["liked"]
           if "disliked" in feedback:
               preferences["avoid"] = feedback["disliked"]
           return preferences

       preferences = adjust_preferences(preferences, feedback)
       ```

#### Exemplo Prático

Aqui está um exemplo simplificado de código Python incorporando a abordagem RAG Corretiva no Agente de Viagens:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        itinerary = create_itinerary(flights, hotels, attractions)
        return itinerary

    def adjust_based_on_feedback(self, feedback):
        self.experience_data.append(feedback)
        self.user_preferences = adjust_preferences(self.user_preferences, feedback)
        new_itinerary = self.generate_recommendations()
        return new_itinerary

# Exemplo de utilização
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
new_itinerary = travel_agent.adjust_based_on_feedback(feedback)
print("Updated Itinerary:", new_itinerary)
```

### Carregamento de Contexto Preemptivo
O pré-carregamento de contexto envolve carregar contexto relevante ou informação de fundo no modelo antes de processar uma consulta. Isto significa que o modelo tem acesso a essa informação desde o início, o que pode ajudá-lo a gerar respostas mais informadas sem precisar de recuperar dados adicionais durante o processo.

Aqui está um exemplo simplificado de como um pré-carregamento de contexto pode ser para uma aplicação de agente de viagens em Python:

```python
class TravelAgent:
    def __init__(self):
        # Pré-carregar destinos populares e as suas informações
        self.context = {
            "Paris": {"country": "France", "currency": "Euro", "language": "French", "attractions": ["Eiffel Tower", "Louvre Museum"]},
            "Tokyo": {"country": "Japan", "currency": "Yen", "language": "Japanese", "attractions": ["Tokyo Tower", "Shibuya Crossing"]},
            "New York": {"country": "USA", "currency": "Dollar", "language": "English", "attractions": ["Statue of Liberty", "Times Square"]},
            "Sydney": {"country": "Australia", "currency": "Dollar", "language": "English", "attractions": ["Sydney Opera House", "Bondi Beach"]}
        }

    def get_destination_info(self, destination):
        # Obter informação do destino a partir do contexto pré-carregado
        info = self.context.get(destination)
        if info:
            return f"{destination}:\nCountry: {info['country']}\nCurrency: {info['currency']}\nLanguage: {info['language']}\nAttractions: {', '.join(info['attractions'])}"
        else:
            return f"Sorry, we don't have information on {destination}."

# Exemplo de utilização
travel_agent = TravelAgent()
print(travel_agent.get_destination_info("Paris"))
print(travel_agent.get_destination_info("Tokyo"))
```

#### Explicação

1. **Initialization (`__init__` method)**: A classe `TravelAgent` pré-carrega um dicionário que contém informações sobre destinos populares, tais como Paris, Tóquio, Nova Iorque e Sydney. Este dicionário inclui detalhes como país, moeda, língua e principais atrações para cada destino.

2. **Retrieving Information (`get_destination_info` method)**: Quando um utilizador pergunta sobre um destino específico, o método `get_destination_info` obtém a informação relevante a partir do dicionário de contexto pré-carregado.

Ao pré-carregar o contexto, a aplicação de agente de viagens pode responder rapidamente às consultas dos utilizadores sem ter de recuperar esta informação a partir de uma fonte externa em tempo real. Isto torna a aplicação mais eficiente e responsiva.

### Inicializar o Plano com um Objetivo Antes de Iterar

Inicializar um plano com um objetivo envolve começar com um objetivo claro ou um resultado desejado em mente. Ao definir este objetivo desde o início, o modelo pode usá-lo como princípio orientador ao longo do processo iterativo. Isto ajuda a garantir que cada iteração se aproxime do resultado desejado, tornando o processo mais eficiente e focado.

Aqui está um exemplo de como pode inicializar um plano de viagem com um objetivo antes de iterar para um agente de viagens em Python:

### Cenário

Um agente de viagens pretende planear umas férias personalizadas para um cliente. O objetivo é criar um itinerário de viagem que maximize a satisfação do cliente com base nas suas preferências e orçamento.

### Passos

1. Definir as preferências e o orçamento do cliente.
2. Inicializar o plano inicial com base nessas preferências.
3. Iterar para refinar o plano, otimizando para a satisfação do cliente.

#### Código Python

```python
class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def bootstrap_plan(self, preferences, budget):
        plan = []
        total_cost = 0

        for destination in self.destinations:
            if total_cost + destination['cost'] <= budget and self.match_preferences(destination, preferences):
                plan.append(destination)
                total_cost += destination['cost']

        return plan

    def match_preferences(self, destination, preferences):
        for key, value in preferences.items():
            if destination.get(key) != value:
                return False
        return True

    def iterate_plan(self, plan, preferences, budget):
        for i in range(len(plan)):
            for destination in self.destinations:
                if destination not in plan and self.match_preferences(destination, preferences) and self.calculate_cost(plan, destination) <= budget:
                    plan[i] = destination
                    break
        return plan

    def calculate_cost(self, plan, new_destination):
        return sum(destination['cost'] for destination in plan) + new_destination['cost']

# Exemplo de utilização
destinations = [
    {"name": "Paris", "cost": 1000, "activity": "sightseeing"},
    {"name": "Tokyo", "cost": 1200, "activity": "shopping"},
    {"name": "New York", "cost": 900, "activity": "sightseeing"},
    {"name": "Sydney", "cost": 1100, "activity": "beach"},
]

preferences = {"activity": "sightseeing"}
budget = 2000

travel_agent = TravelAgent(destinations)
initial_plan = travel_agent.bootstrap_plan(preferences, budget)
print("Initial Plan:", initial_plan)

refined_plan = travel_agent.iterate_plan(initial_plan, preferences, budget)
print("Refined Plan:", refined_plan)
```

#### Explicação do Código

1. **Initialization (`__init__` method)**: A classe `TravelAgent` é inicializada com uma lista de potenciais destinos, cada um com atributos como nome, custo e tipo de atividade.

2. **Bootstrapping the Plan (`bootstrap_plan` method)**: Este método cria um plano de viagem inicial com base nas preferências e no orçamento do cliente. Percorre a lista de destinos e adiciona-os ao plano se corresponderem às preferências do cliente e se estiverem dentro do orçamento.

3. **Matching Preferences (`match_preferences` method)**: Este método verifica se um destino corresponde às preferências do cliente.

4. **Iterating the Plan (`iterate_plan` method)**: Este método refina o plano inicial tentando substituir cada destino no plano por uma opção melhor, considerando as preferências do cliente e as restrições orçamentais.

5. **Calculating Cost (`calculate_cost` method)**: Este método calcula o custo total do plano atual, incluindo um possível novo destino.

#### Exemplo de Utilização

- **Plano Inicial**: O agente de viagens cria um plano inicial com base nas preferências do cliente por passeios turísticos e um orçamento de $2000.
- **Plano Refinado**: O agente de viagens itera o plano, otimizando para as preferências do cliente e o orçamento.

Ao inicializar o plano com um objetivo claro (por exemplo, maximizar a satisfação do cliente) e iterar para refinar o plano, o agente de viagens pode criar um itinerário de viagem personalizado e otimizado para o cliente. Esta abordagem garante que o plano de viagem esteja alinhado com as preferências e o orçamento do cliente desde o início e melhora a cada iteração.

### Aproveitar os LLM para Reordenação e Pontuação

Modelos de Linguagem de Grande Escala (LLMs) podem ser usados para reordenação e pontuação ao avaliar a relevância e a qualidade de documentos recuperados ou respostas geradas. Eis como funciona:

**Recuperação:** A etapa inicial de recuperação obtém um conjunto de documentos ou respostas candidatas com base na consulta.

**Reordenação:** O LLM avalia estes candidatos e reordena-os com base na sua relevância e qualidade. Esta etapa assegura que a informação mais relevante e de maior qualidade seja apresentada primeiro.

**Pontuação:** O LLM atribui pontuações a cada candidato, refletindo a sua relevância e qualidade. Isto ajuda a selecionar a melhor resposta ou documento para o utilizador.

Ao tirar partido dos LLM para reordenação e pontuação, o sistema pode fornecer informação mais precisa e contextualmente relevante, melhorando a experiência geral do utilizador.

Aqui está um exemplo de como um agente de viagens pode usar um Modelo de Linguagem de Grande Escala (LLM) para reordenar e pontuar destinos de viagem com base nas preferências dos utilizadores em Python:

#### Cenário - Viagens com base nas Preferências

Um agente de viagens pretende recomendar os melhores destinos de viagem a um cliente com base nas suas preferências. O LLM ajudará a reordenar e pontuar os destinos para garantir que as opções mais relevantes sejam apresentadas.

#### Passos:

1. Recolher as preferências do utilizador.
2. Recuperar uma lista de potenciais destinos de viagem.
3. Usar o LLM para reordenar e pontuar os destinos com base nas preferências do utilizador.

Aqui está como pode atualizar o exemplo anterior para usar os Serviços Azure OpenAI:

#### Requisitos

1. Precisa de ter uma subscrição Azure.
2. Criar um recurso Azure OpenAI e obter a sua chave de API.

#### Código de Exemplo em Python

```python
import requests
import json

class TravelAgent:
    def __init__(self, destinations):
        self.destinations = destinations

    def get_recommendations(self, preferences, api_key, endpoint):
        # Gerar um prompt para o Azure OpenAI
        prompt = self.generate_prompt(preferences)
        
        # Definir os cabeçalhos e o payload para a requisição
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        payload = {
            "prompt": prompt,
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        # Chamar a API Azure OpenAI para obter os destinos reordenados e pontuados
        response = requests.post(endpoint, headers=headers, json=payload)
        response_data = response.json()
        
        # Extrair e devolver as recomendações
        recommendations = response_data['choices'][0]['text'].strip().split('\n')
        return recommendations

    def generate_prompt(self, preferences):
        prompt = "Here are the travel destinations ranked and scored based on the following user preferences:\n"
        for key, value in preferences.items():
            prompt += f"{key}: {value}\n"
        prompt += "\nDestinations:\n"
        for destination in self.destinations:
            prompt += f"- {destination['name']}: {destination['description']}\n"
        return prompt

# Exemplo de utilização
destinations = [
    {"name": "Paris", "description": "City of lights, known for its art, fashion, and culture."},
    {"name": "Tokyo", "description": "Vibrant city, famous for its modernity and traditional temples."},
    {"name": "New York", "description": "The city that never sleeps, with iconic landmarks and diverse culture."},
    {"name": "Sydney", "description": "Beautiful harbour city, known for its opera house and stunning beaches."},
]

preferences = {"activity": "sightseeing", "culture": "diverse"}
api_key = 'your_azure_openai_api_key'
endpoint = 'https://your-endpoint.com/openai/deployments/your-deployment-name/completions?api-version=2022-12-01'

travel_agent = TravelAgent(destinations)
recommendations = travel_agent.get_recommendations(preferences, api_key, endpoint)
print("Recommended Destinations:")
for rec in recommendations:
    print(rec)
```

#### Explicação do Código - Gestor de Preferências

1. **Initialization**: A classe `TravelAgent` é inicializada com uma lista de potenciais destinos de viagem, cada um com atributos como nome e descrição.

2. **Getting Recommendations (`get_recommendations` method)**: Este método gera um prompt para o serviço Azure OpenAI com base nas preferências do utilizador e faz um pedido HTTP POST para a API Azure OpenAI para obter destinos reordenados e pontuados.

3. **Generating Prompt (`generate_prompt` method)**: Este método constrói um prompt para o Azure OpenAI, incluindo as preferências do utilizador e a lista de destinos. O prompt orienta o modelo a reordenar e pontuar os destinos com base nas preferências fornecidas.

4. **API Call**: A biblioteca `requests` é usada para efetuar um pedido HTTP POST ao endpoint da API Azure OpenAI. A resposta contém os destinos reordenados e pontuados.

5. **Example Usage**: O agente de viagens recolhe as preferências do utilizador (por exemplo, interesse em passeios turísticos e cultura diversa) e usa o serviço Azure OpenAI para obter recomendações reordenadas e pontuadas para destinos de viagem.

Certifique-se de substituir `your_azure_openai_api_key` pela sua chave de API do Azure OpenAI real e `https://your-endpoint.com/...` pela URL do endpoint real da sua implantação Azure OpenAI.

Ao aproveitar os LLM para reordenação e pontuação, o agente de viagens pode fornecer recomendações de viagem mais personalizadas e relevantes aos clientes, melhorando a sua experiência geral.

### RAG: Técnica de Criação de Prompts vs Ferramenta

Retrieval-Augmented Generation (RAG) pode ser tanto uma técnica de criação de prompts como uma ferramenta no desenvolvimento de agentes de IA. Compreender a distinção entre os dois pode ajudá-lo a tirar mais proveito do RAG nos seus projetos.

#### RAG como Técnica de Criação de Prompts

**O que é?**

- Como técnica de criação de prompts, o RAG envolve formular consultas ou prompts específicos para orientar a recuperação de informação relevante a partir de um grande corpus ou base de dados. Esta informação é então usada para gerar respostas ou ações.

**Como funciona:**

1. **Formular Prompts**: Criar prompts ou consultas bem estruturadas com base na tarefa em mãos ou na entrada do utilizador.
2. **Recuperar Informação**: Usar os prompts para procurar dados relevantes numa base de conhecimento ou conjunto de dados pré-existente.
3. **Gerar Resposta**: Combinar a informação recuperada com modelos generativos de IA para produzir uma resposta completa e coerente.

**Exemplo no Agente de Viagens**:

- Entrada do Utilizador: "Quero visitar museus em Paris."
- Prompt: "Encontrar os melhores museus em Paris."
- Informação Recuperada: Detalhes sobre o Museu do Louvre, Musée d'Orsay, etc.
- Resposta Gerada: "Aqui estão alguns dos melhores museus em Paris: Museu do Louvre, Musée d'Orsay e Centre Pompidou."

#### RAG como Ferramenta

**O que é?**

- Como ferramenta, o RAG é um sistema integrado que automatiza o processo de recuperação e geração, tornando mais fácil para os desenvolvedores implementar funcionalidades complexas de IA sem criar manualmente prompts para cada consulta.

**Como funciona:**

1. **Integração**: Incorporar o RAG na arquitetura do agente de IA, permitindo-lhe gerir automaticamente as tarefas de recuperação e geração.
2. **Automação**: A ferramenta gere todo o processo, desde receber a entrada do utilizador até gerar a resposta final, sem exigir prompts explícitos para cada etapa.
3. **Eficiência**: Melhora o desempenho do agente ao simplificar o processo de recuperação e geração, permitindo respostas mais rápidas e precisas.

**Exemplo no Agente de Viagens**:

- Entrada do Utilizador: "Quero visitar museus em Paris."
- Ferramenta RAG: Recupera automaticamente informação sobre museus e gera uma resposta.
- Resposta Gerada: "Aqui estão alguns dos melhores museus em Paris: Museu do Louvre, Musée d'Orsay e Centre Pompidou."

### Comparação

| Aspeto                 | Técnica de Criação de Prompts                                | Ferramenta                                             |
|------------------------|-------------------------------------------------------------|-------------------------------------------------------|
| **Manual vs Automatic**| Formulação manual de prompts para cada consulta.            | Processo automatizado para recuperação e geração.     |
| **Control**            | Oferece mais controlo sobre o processo de recuperação.       | Simplifica e automatiza a recuperação e a geração.     |
| **Flexibility**        | Permite prompts personalizados com base nas necessidades.    | Mais eficiente para implementações em grande escala.  |
| **Complexity**         | Requer elaboração e ajuste de prompts.                       | Mais fácil de integrar na arquitetura de um agente de IA. |

### Exemplos Práticos

**Exemplo de Técnica de Criação de Prompts:**

```python
def search_museums_in_paris():
    prompt = "Find top museums in Paris"
    search_results = search_web(prompt)
    return search_results

museums = search_museums_in_paris()
print("Top Museums in Paris:", museums)
```

**Exemplo de Ferramenta:**

```python
class Travel_Agent:
    def __init__(self):
        self.rag_tool = RAGTool()

    def get_museums_in_paris(self):
        user_input = "I want to visit museums in Paris."
        response = self.rag_tool.retrieve_and_generate(user_input)
        return response

travel_agent = Travel_Agent()
museums = travel_agent.get_museums_in_paris()
print("Top Museums in Paris:", museums)
```

### Avaliação da Relevância

Avaliar a relevância é um aspeto crucial do desempenho de um agente de IA. Garante que a informação recuperada e gerada pelo agente é adequada, precisa e útil para o utilizador. Vamos explorar como avaliar a relevância em agentes de IA, incluindo exemplos práticos e técnicas.

#### Conceitos Principais na Avaliação da Relevância

1. **Consciência de Contexto**:
   - O agente deve compreender o contexto da consulta do utilizador para recuperar e gerar informação relevante.
   - Exemplo: Se um utilizador pede "melhores restaurantes em Paris", o agente deve considerar as preferências do utilizador, como tipo de culinária e orçamento.

2. **Precisão**:
   - A informação fornecida pelo agente deve ser factualmente correta e atualizada.
   - Exemplo: Recomendar restaurantes atualmente abertos com boas avaliações em vez de opções desatualizadas ou encerradas.

3. **Intenção do Utilizador**:
   - O agente deve inferir a intenção do utilizador por detrás da consulta para fornecer a informação mais relevante.
   - Exemplo: Se um utilizador pede "hotéis económicos", o agente deve priorizar opções acessíveis.

4. **Ciclo de Feedback**:
   - A recolha e análise contínua de feedback dos utilizadores ajudam o agente a refinar o seu processo de avaliação de relevância.
   - Exemplo: Incorporar classificações e feedback dos utilizadores sobre recomendações anteriores para melhorar respostas futuras.

#### Técnicas Práticas para Avaliar a Relevância

1. **Pontuação de Relevância**:
   - Atribuir uma pontuação de relevância a cada item recuperado com base em quão bem corresponde à consulta e às preferências do utilizador.
   - Exemplo:

     ```python
     def relevance_score(item, query):
         score = 0
         if item['category'] in query['interests']:
             score += 1
         if item['price'] <= query['budget']:
             score += 1
         if item['location'] == query['destination']:
             score += 1
         return score
     ```

2. **Filtragem e Ordenação**:
   - Filtrar itens irrelevantes e ordenar os restantes com base nas suas pontuações de relevância.
   - Exemplo:

     ```python
     def filter_and_rank(items, query):
         ranked_items = sorted(items, key=lambda item: relevance_score(item, query), reverse=True)
         return ranked_items[:10]  # Retornar os 10 itens mais relevantes
     ```

3. **Processamento de Linguagem Natural (NLP)**:
   - Usar técnicas de NLP para compreender a consulta do utilizador e recuperar informação relevante.
   - Exemplo:

     ```python
     def process_query(query):
         # Utilize o processamento de linguagem natural (PLN) para extrair as informações-chave da consulta do utilizador
         processed_query = nlp(query)
         return processed_query
     ```

4. **Integração de Feedback do Utilizador**:
   - Recolher feedback do utilizador sobre as recomendações fornecidas e usá-lo para ajustar avaliações de relevância futuras.
   - Exemplo:

     ```python
     def adjust_based_on_feedback(feedback, items):
         for item in items:
             if item['name'] in feedback['liked']:
                 item['relevance'] += 1
             if item['name'] in feedback['disliked']:
                 item['relevance'] -= 1
         return items
     ```

#### Exemplo: Avaliação da Relevância no Agente de Viagens

Aqui está um exemplo prático de como o Agente de Viagens pode avaliar a relevância de recomendações de viagem:

```python
class Travel_Agent:
    def __init__(self):
        self.user_preferences = {}
        self.experience_data = []

    def gather_preferences(self, preferences):
        self.user_preferences = preferences

    def retrieve_information(self):
        flights = search_flights(self.user_preferences)
        hotels = search_hotels(self.user_preferences)
        attractions = search_attractions(self.user_preferences)
        return flights, hotels, attractions

    def generate_recommendations(self):
        flights, hotels, attractions = self.retrieve_information()
        ranked_hotels = self.filter_and_rank(hotels, self.user_preferences)
        itinerary = create_itinerary(flights, ranked_hotels, attractions)
        return itinerary

    def filter_and_rank(self, items, query):
        ranked_items = sorted(items, key=lambda item: self.relevance_score(item, query), reverse=True)
        return ranked_items[:10]  # Retornar os 10 itens mais relevantes

    def relevance_score(self, item, query):
        score = 0
        if item['category'] in query['interests']:
            score += 1
        if item['price'] <= query['budget']:
            score += 1
        if item['location'] == query['destination']:
            score += 1
        return score

    def adjust_based_on_feedback(self, feedback, items):
        for item in items:
            if item['name'] in feedback['liked']:
                item['relevance'] += 1
            if item['name'] in feedback['disliked']:
                item['relevance'] -= 1
        return items

# Exemplo de utilização
travel_agent = Travel_Agent()
preferences = {
    "destination": "Paris",
    "dates": "2025-04-01 to 2025-04-10",
    "budget": "moderate",
    "interests": ["museums", "cuisine"]
}
travel_agent.gather_preferences(preferences)
itinerary = travel_agent.generate_recommendations()
print("Suggested Itinerary:", itinerary)
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_items = travel_agent.adjust_based_on_feedback(feedback, itinerary['hotels'])
print("Updated Itinerary with Feedback:", updated_items)
```

### Pesquisa com Intenção

Pesquisar com intenção envolve compreender e interpretar o propósito subjacente ou objetivo por detrás da consulta de um utilizador para recuperar e gerar a informação mais relevante e útil. Esta abordagem vai além da simples correspondência de palavras-chave e foca-se em captar as reais necessidades e o contexto do utilizador.

#### Conceitos Principais na Pesquisa com Intenção

1. **Compreensão da Intenção do Utilizador**:
   - A intenção do utilizador pode ser categorizada em três tipos principais: informativa, de navegação e transacional.
     - **Intenção Informativa**: O utilizador procura informação sobre um tópico (ex.: "Quais são os melhores museus em Paris?").
     - **Intenção de Navegação**: O utilizador quer navegar para um site ou página específica (ex.: "Site oficial do Museu do Louvre").
     - **Intenção Transacional**: O utilizador pretende realizar uma transação, como reservar um voo ou efetuar uma compra (ex.: "Reservar um voo para Paris").

2. **Consciência de Contexto**:
   - Analisar o contexto da consulta do utilizador ajuda a identificar com precisão a sua intenção. Isto inclui considerar interações anteriores, preferências do utilizador e os detalhes específicos da consulta atual.

3. **Processamento de Linguagem Natural (NLP)**:
   - Técnicas de NLP são empregues para compreender e interpretar as consultas em linguagem natural fornecidas pelos utilizadores. Isto inclui tarefas como reconhecimento de entidades, análise de sentimento e parsing da consulta.

4. **Personalização**:
   - Personalizar os resultados de pesquisa com base no histórico, preferências e feedback do utilizador aumenta a relevância da informação recuperada.

#### Exemplo Prático: Pesquisa com Intenção no Agente de Viagens

Vamos usar o Agente de Viagens como exemplo para ver como a pesquisa com intenção pode ser implementada.

1. **Recolha das Preferências do Utilizador**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Compreensão da Intenção do Utilizador**

   ```python
   def identify_intent(query):
       if "book" in query or "purchase" in query:
           return "transactional"
       elif "website" in query or "official" in query:
           return "navigational"
       else:
           return "informational"
   ```

3. **Consciência de Contexto**
   ```python
   def analyze_context(query, user_history):
       # Combine a consulta atual com o histórico do utilizador para compreender o contexto
       context = {
           "current_query": query,
           "user_history": user_history
       }
       return context
   ```

4. **Pesquisar e Personalizar Resultados**

   ```python
   def search_with_intent(query, preferences, user_history):
       intent = identify_intent(query)
       context = analyze_context(query, user_history)
       if intent == "informational":
           search_results = search_information(query, preferences)
       elif intent == "navigational":
           search_results = search_navigation(query)
       elif intent == "transactional":
           search_results = search_transaction(query, preferences)
       personalized_results = personalize_results(search_results, user_history)
       return personalized_results

   def search_information(query, preferences):
       # Exemplo de lógica de pesquisa para intenção informativa
       results = search_web(f"best {preferences['interests']} in {preferences['destination']}")
       return results

   def search_navigation(query):
       # Exemplo de lógica de pesquisa para intenção de navegação
       results = search_web(query)
       return results

   def search_transaction(query, preferences):
       # Exemplo de lógica de pesquisa para intenção transacional
       results = search_web(f"book {query} to {preferences['destination']}")
       return results

   def personalize_results(results, user_history):
       # Exemplo de lógica de personalização
       personalized = [result for result in results if result not in user_history]
       return personalized[:10]  # Devolver os 10 melhores resultados personalizados
   ```

5. **Exemplo de Utilização**

   ```python
   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   user_history = ["Louvre Museum website", "Book flight to Paris"]
   query = "best museums in Paris"
   results = search_with_intent(query, preferences, user_history)
   print("Search Results:", results)
   ```

---

## 4. Gerar Código como Ferramenta

Os agentes geradores de código utilizam modelos de IA para escrever e executar código, resolvendo problemas complexos e automatizando tarefas.

### Agentes Geradores de Código

Os agentes geradores de código utilizam modelos de IA generativos para escrever e executar código. Estes agentes podem resolver problemas complexos, automatizar tarefas e fornecer insights valiosos ao gerar e executar código em várias linguagens de programação.

#### Aplicações Práticas

1. **Geração Automática de Código**: Gerar trechos de código para tarefas específicas, tais como análise de dados, web scraping ou machine learning.
2. **SQL como RAG**: Utilizar consultas SQL para recuperar e manipular dados em bases de dados.
3. **Resolução de Problemas**: Criar e executar código para resolver problemas específicos, como otimizar algoritmos ou analisar dados.

#### Exemplo: Agente Gerador de Código para Análise de Dados

Imagine que está a desenhar um agente gerador de código. Eis como poderia funcionar:

1. **Tarefa**: Analisar um conjunto de dados para identificar tendências e padrões.
2. **Passos**:
   - Carregar o conjunto de dados numa ferramenta de análise de dados.
   - Gerar consultas SQL para filtrar e agregar os dados.
   - Executar as consultas e obter os resultados.
   - Usar os resultados para gerar visualizações e insights.
3. **Recursos Necessários**: Acesso ao conjunto de dados, ferramentas de análise de dados e capacidades de SQL.
4. **Experiência**: Usar resultados de análises passadas para melhorar a precisão e relevância de análises futuras.

### Exemplo: Agente Gerador de Código para Agente de Viagens

Neste exemplo, vamos desenhar um agente gerador de código, Agente de Viagens, para ajudar utilizadores a planear as suas viagens através da geração e execução de código. Este agente pode tratar tarefas como obter opções de viagem, filtrar resultados e compilar um itinerário usando IA generativa.

#### Visão Geral do Agente Gerador de Código

1. **Recolha de Preferências do Utilizador**: Recolhe input do utilizador, como destino, datas da viagem, orçamento e interesses.
2. **Geração de Código para Obter Dados**: Gera trechos de código para recuperar dados sobre voos, hotéis e atrações.
3. **Execução do Código Gerado**: Executa o código gerado para obter informação em tempo real.
4. **Geração de Itinerário**: Compila os dados recolhidos num plano de viagem personalizado.
5. **Ajuste com Base no Feedback**: Recebe feedback do utilizador e regenera código, se necessário, para refinar os resultados.

#### Implementação Passo a Passo

1. **Recolha de Preferências do Utilizador**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Geração de Código para Obter Dados**

   ```python
   def generate_code_to_fetch_data(preferences):
       # Exemplo: Gerar código para procurar voos com base nas preferências do utilizador
       code = f"""
       def search_flights():
           import requests
           response = requests.get('https://api.example.com/flights', params={preferences})
           return response.json()
       """
       return code

   def generate_code_to_fetch_hotels(preferences):
       # Exemplo: Gerar código para procurar hotéis
       code = f"""
       def search_hotels():
           import requests
           response = requests.get('https://api.example.com/hotels', params={preferences})
           return response.json()
       """
       return code
   ```

3. **Execução do Código Gerado**

   ```python
   def execute_code(code):
       # Execute o código gerado usando exec
       exec(code)
       result = locals()
       return result

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   
   flight_code = generate_code_to_fetch_data(preferences)
   hotel_code = generate_code_to_fetch_hotels(preferences)
   
   flights = execute_code(flight_code)
   hotels = execute_code(hotel_code)

   print("Flight Options:", flights)
   print("Hotel Options:", hotels)
   ```

4. **Geração de Itinerário**

   ```python
   def generate_itinerary(flights, hotels, attractions):
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   attractions = search_attractions(preferences)
   itinerary = generate_itinerary(flights, hotels, attractions)
   print("Suggested Itinerary:", itinerary)
   ```

5. **Ajuste com Base no Feedback**

   ```python
   def adjust_based_on_feedback(feedback, preferences):
       # Ajustar preferências com base no feedback do utilizador
       if "liked" in feedback:
           preferences["favorites"] = feedback["liked"]
       if "disliked" in feedback:
           preferences["avoid"] = feedback["disliked"]
       return preferences

   feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
   updated_preferences = adjust_based_on_feedback(feedback, preferences)
   
   # Regenerar e executar o código com as preferências atualizadas
   updated_flight_code = generate_code_to_fetch_data(updated_preferences)
   updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)
   
   updated_flights = execute_code(updated_flight_code)
   updated_hotels = execute_code(updated_hotel_code)
   
   updated_itinerary = generate_itinerary(updated_flights, updated_hotels, attractions)
   print("Updated Itinerary:", updated_itinerary)
   ```

### Aproveitar a consciência ambiental e o raciocínio

Com base no esquema da tabela, é possível melhorar o processo de geração de consultas ao aproveitar a consciência do ambiente e o raciocínio.

Aqui está um exemplo de como isto pode ser feito:

1. **Compreender o Esquema**: O sistema entenderá o esquema da tabela e usará esta informação para fundamentar a geração de consultas.
2. **Ajustar com Base no Feedback**: O sistema ajustará as preferências do utilizador com base no feedback e raciocinará sobre quais campos do esquema precisam de ser atualizados.
3. **Gerar e Executar Consultas**: O sistema gerará e executará consultas para obter dados atualizados de voos e hotéis com base nas novas preferências.

Aqui está um exemplo atualizado em Python que incorpora estes conceitos:

```python
def adjust_based_on_feedback(feedback, preferences, schema):
    # Ajustar preferências com base no feedback do utilizador
    if "liked" in feedback:
        preferences["favorites"] = feedback["liked"]
    if "disliked" in feedback:
        preferences["avoid"] = feedback["disliked"]
    # Raciocínio baseado no esquema para ajustar outras preferências relacionadas
    for field in schema:
        if field in preferences:
            preferences[field] = adjust_based_on_environment(feedback, field, schema)
    return preferences

def adjust_based_on_environment(feedback, field, schema):
    # Lógica personalizada para ajustar preferências com base no esquema e no feedback
    if field in feedback["liked"]:
        return schema[field]["positive_adjustment"]
    elif field in feedback["disliked"]:
        return schema[field]["negative_adjustment"]
    return schema[field]["default"]

def generate_code_to_fetch_data(preferences):
    # Gerar código para obter dados de voos com base nas preferências atualizadas
    return f"fetch_flights(preferences={preferences})"

def generate_code_to_fetch_hotels(preferences):
    # Gerar código para obter dados de hotéis com base nas preferências atualizadas
    return f"fetch_hotels(preferences={preferences})"

def execute_code(code):
    # Simular a execução do código e devolver dados fictícios
    return {"data": f"Executed: {code}"}

def generate_itinerary(flights, hotels, attractions):
    # Gerar um itinerário com base nos voos, hotéis e atrações
    return {"flights": flights, "hotels": hotels, "attractions": attractions}

# Exemplo de esquema
schema = {
    "favorites": {"positive_adjustment": "increase", "negative_adjustment": "decrease", "default": "neutral"},
    "avoid": {"positive_adjustment": "decrease", "negative_adjustment": "increase", "default": "neutral"}
}

# Exemplo de utilização
preferences = {"favorites": "sightseeing", "avoid": "crowded places"}
feedback = {"liked": ["Louvre Museum"], "disliked": ["Eiffel Tower (too crowded)"]}
updated_preferences = adjust_based_on_feedback(feedback, preferences, schema)

# Regenerar e executar código com as preferências atualizadas
updated_flight_code = generate_code_to_fetch_data(updated_preferences)
updated_hotel_code = generate_code_to_fetch_hotels(updated_preferences)

updated_flights = execute_code(updated_flight_code)
updated_hotels = execute_code(updated_hotel_code)

updated_itinerary = generate_itinerary(updated_flights, updated_hotels, feedback["liked"])
print("Updated Itinerary:", updated_itinerary)
```

#### Explicação - Reserva com Base no Feedback

1. **Consciência do Esquema**: O dicionário `schema` define como as preferências devem ser ajustadas com base no feedback. Inclui campos como `favorites` e `avoid`, com ajustes correspondentes.
2. **Ajuste de Preferências (método `adjust_based_on_feedback`)**: Este método ajusta as preferências com base no feedback do utilizador e no esquema.
3. **Ajustes com Base no Ambiente (método `adjust_based_on_environment`)**: Este método personaliza os ajustes com base no esquema e no feedback.
4. **Gerar e Executar Consultas**: O sistema gera código para obter dados atualizados de voos e hotéis com base nas preferências ajustadas e simula a execução dessas consultas.
5. **Gerar Itinerário**: O sistema cria um itinerário atualizado com base nos novos dados de voos, hotéis e atrações.

Ao tornar o sistema consciente do ambiente e a raciocinar com base no esquema, pode-se gerar consultas mais precisas e relevantes, levando a melhores recomendações de viagem e a uma experiência de utilizador mais personalizada.

### Usar SQL como Técnica de Retrieval-Augmented Generation (RAG)

SQL (Structured Query Language) é uma ferramenta poderosa para interagir com bases de dados. Quando usada como parte de uma abordagem Retrieval-Augmented Generation (RAG), o SQL pode recuperar dados relevantes de bases de dados para informar e gerar respostas ou ações em agentes de IA. Vamos explorar como o SQL pode ser usado como técnica RAG no contexto do Agente de Viagens.

#### Conceitos-Chave

1. **Interação com a Base de Dados**:
   - O SQL é usado para consultar bases de dados, recuperar informação relevante e manipular dados.
   - Exemplo: Obter detalhes de voos, informação sobre hotéis e atrações de uma base de dados de viagens.

2. **Integração com RAG**:
   - As consultas SQL são geradas com base no input e nas preferências do utilizador.
   - Os dados recuperados são depois usados para gerar recomendações ou ações personalizadas.

3. **Geração Dinâmica de Consultas**:
   - O agente de IA gera consultas SQL dinâmicas com base no contexto e nas necessidades do utilizador.
   - Exemplo: Personalizar consultas SQL para filtrar resultados consoante o orçamento, datas e interesses.

#### Aplicações

- **Geração Automática de Código**: Gerar trechos de código para tarefas específicas.
- **SQL como RAG**: Usar consultas SQL para manipular dados.
- **Resolução de Problemas**: Criar e executar código para resolver problemas.

**Exemplo**:
Um agente de análise de dados:

1. **Tarefa**: Analisar um conjunto de dados para encontrar tendências.
2. **Passos**:
   - Carregar o conjunto de dados.
   - Gerar consultas SQL para filtrar os dados.
   - Executar consultas e obter resultados.
   - Gerar visualizações e insights.
3. **Recursos**: Acesso ao conjunto de dados, capacidades de SQL.
4. **Experiência**: Usar resultados passados para melhorar análises futuras.

#### Exemplo Prático: Usar SQL no Agente de Viagens

1. **Recolha de Preferências do Utilizador**

   ```python
   class Travel_Agent:
       def __init__(self):
           self.user_preferences = {}

       def gather_preferences(self, preferences):
           self.user_preferences = preferences
   ```

2. **Geração de Consultas SQL**

   ```python
   def generate_sql_query(table, preferences):
       query = f"SELECT * FROM {table} WHERE "
       conditions = []
       for key, value in preferences.items():
           conditions.append(f"{key}='{value}'")
       query += " AND ".join(conditions)
       return query
   ```

3. **Execução de Consultas SQL**

   ```python
   import sqlite3

   def execute_sql_query(query, database="travel.db"):
       connection = sqlite3.connect(database)
       cursor = connection.cursor()
       cursor.execute(query)
       results = cursor.fetchall()
       connection.close()
       return results
   ```

4. **Geração de Recomendações**

   ```python
   def generate_recommendations(preferences):
       flight_query = generate_sql_query("flights", preferences)
       hotel_query = generate_sql_query("hotels", preferences)
       attraction_query = generate_sql_query("attractions", preferences)
       
       flights = execute_sql_query(flight_query)
       hotels = execute_sql_query(hotel_query)
       attractions = execute_sql_query(attraction_query)
       
       itinerary = {
           "flights": flights,
           "hotels": hotels,
           "attractions": attractions
       }
       return itinerary

   travel_agent = Travel_Agent()
   preferences = {
       "destination": "Paris",
       "dates": "2025-04-01 to 2025-04-10",
       "budget": "moderate",
       "interests": ["museums", "cuisine"]
   }
   travel_agent.gather_preferences(preferences)
   itinerary = generate_recommendations(preferences)
   print("Suggested Itinerary:", itinerary)
   ```

#### Exemplos de Consultas SQL

1. **Consulta de Voos**

   ```sql
   SELECT * FROM flights WHERE destination='Paris' AND dates='2025-04-01 to 2025-04-10' AND budget='moderate';
   ```

2. **Consulta de Hotéis**

   ```sql
   SELECT * FROM hotels WHERE destination='Paris' AND budget='moderate';
   ```

3. **Consulta de Atrações**

   ```sql
   SELECT * FROM attractions WHERE destination='Paris' AND interests='museums, cuisine';
   ```

Ao aproveitar o SQL como parte da técnica Retrieval-Augmented Generation (RAG), agentes de IA como o Agente de Viagens podem recuperar dinamicamente e utilizar dados relevantes para fornecer recomendações precisas e personalizadas.

### Exemplo de Metacognição

Para demonstrar uma implementação de metacognição, vamos criar um agente simples que reflita sobre o seu processo de tomada de decisão enquanto resolve um problema. Para este exemplo, vamos construir um sistema onde um agente tenta otimizar a escolha de um hotel, mas depois avalia o seu próprio raciocínio e ajusta a sua estratégia quando comete erros ou escolhas subótimas.

Vamos simular isto usando um exemplo básico em que o agente seleciona hotéis com base numa combinação de preço e qualidade, mas que irá "refletir" sobre as suas decisões e ajustar em conformidade.

#### Como isto ilustra a metacognição:

1. **Decisão Inicial**: O agente escolherá o hotel mais barato, sem perceber o impacto da qualidade.
2. **Reflexão e Avaliação**: Após a escolha inicial, o agente verificará se o hotel foi uma escolha "má" usando o feedback do utilizador. Se concluir que a qualidade do hotel foi demasiado baixa, refletirá sobre o seu raciocínio.
3. **Ajuste da Estratégia**: O agente ajustará a sua estratégia com base na reflexão, mudando de "mais barato" para "maior_qualidade", melhorando assim o seu processo de tomada de decisão em iterações futuras.

Eis um exemplo:

```python
class HotelRecommendationAgent:
    def __init__(self):
        self.previous_choices = []  # Armazena os hotéis escolhidos anteriormente
        self.corrected_choices = []  # Armazena as escolhas corrigidas
        self.recommendation_strategies = ['cheapest', 'highest_quality']  # Estratégias disponíveis

    def recommend_hotel(self, hotels, strategy):
        """
        Recommend a hotel based on the chosen strategy.
        The strategy can either be 'cheapest' or 'highest_quality'.
        """
        if strategy == 'cheapest':
            recommended = min(hotels, key=lambda x: x['price'])
        elif strategy == 'highest_quality':
            recommended = max(hotels, key=lambda x: x['quality'])
        else:
            recommended = None
        self.previous_choices.append((strategy, recommended))
        return recommended

    def reflect_on_choice(self):
        """
        Reflect on the last choice made and decide if the agent should adjust its strategy.
        The agent considers if the previous choice led to a poor outcome.
        """
        if not self.previous_choices:
            return "No choices made yet."

        last_choice_strategy, last_choice = self.previous_choices[-1]
        # Vamos assumir que temos algum feedback do utilizador que nos diz se a última escolha foi boa ou não
        user_feedback = self.get_user_feedback(last_choice)

        if user_feedback == "bad":
            # Ajustar a estratégia se a escolha anterior foi insatisfatória
            new_strategy = 'highest_quality' if last_choice_strategy == 'cheapest' else 'cheapest'
            self.corrected_choices.append((new_strategy, last_choice))
            return f"Reflecting on choice. Adjusting strategy to {new_strategy}."
        else:
            return "The choice was good. No need to adjust."

    def get_user_feedback(self, hotel):
        """
        Simulate user feedback based on hotel attributes.
        For simplicity, assume if the hotel is too cheap, the feedback is "bad".
        If the hotel has quality less than 7, feedback is "bad".
        """
        if hotel['price'] < 100 or hotel['quality'] < 7:
            return "bad"
        return "good"

# Simular uma lista de hotéis (preço e qualidade)
hotels = [
    {'name': 'Budget Inn', 'price': 80, 'quality': 6},
    {'name': 'Comfort Suites', 'price': 120, 'quality': 8},
    {'name': 'Luxury Stay', 'price': 200, 'quality': 9}
]

# Criar um agente
agent = HotelRecommendationAgent()

# Passo 1: O agente recomenda um hotel usando a estratégia "mais barato"
recommended_hotel = agent.recommend_hotel(hotels, 'cheapest')
print(f"Recommended hotel (cheapest): {recommended_hotel['name']}")

# Passo 2: O agente reflete sobre a escolha e ajusta a estratégia se necessário
reflection_result = agent.reflect_on_choice()
print(reflection_result)

# Passo 3: O agente recomenda novamente, desta vez usando a estratégia ajustada
adjusted_recommendation = agent.recommend_hotel(hotels, 'highest_quality')
print(f"Adjusted hotel recommendation (highest_quality): {adjusted_recommendation['name']}")
```

#### Capacidades de Metacognição dos Agentes

O essencial aqui é a capacidade do agente para:
- Avaliar as suas escolhas anteriores e o processo de tomada de decisão.
- Ajustar a sua estratégia com base nessa reflexão, ou seja, metacognição em ação.

Isto é uma forma simples de metacognição onde o sistema é capaz de ajustar o seu processo de raciocínio com base em feedback interno.

### Conclusão

A metacognição é uma ferramenta poderosa que pode melhorar significativamente as capacidades dos agentes de IA. Ao incorporar processos metacognitivos, pode conceber agentes mais inteligentes, adaptáveis e eficientes. Utilize os recursos adicionais para explorar mais o fascinante mundo da metacognição em agentes de IA.

### Tem mais perguntas sobre o Padrão de Design de Metacognição?

Junte-se ao [Discord da Microsoft Foundry](https://aka.ms/ai-agents/discord) para encontrar outros aprendizes, participar em horas de atendimento e obter respostas às suas perguntas sobre Agentes de IA.

## Aula Anterior

[Padrão de Design Multi-Agente](../08-multi-agent/README.md)

## Próxima Aula

[Agentes de IA em Produção](../10-ai-agents-production/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Isenção de responsabilidade**:
Este documento foi traduzido com recurso ao serviço de tradução automática por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos empenhemos em garantir a precisão, tenha em atenção que as traduções automatizadas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional por um tradutor humano. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações erradas decorrentes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->