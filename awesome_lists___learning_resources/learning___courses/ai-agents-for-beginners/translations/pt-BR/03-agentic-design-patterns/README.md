[![Como projetar bons agentes de IA](../../../translated_images/pt-BR/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Clique na imagem acima para assistir ao vídeo desta lição)_
# Princípios de Design Agencial de IA

## Introdução

Existem muitas maneiras de pensar sobre a construção de Sistemas Agenciais de IA. Dado que a ambiguidade é uma característica e não um erro no design de IA Generativa, às vezes é difícil para os engenheiros descobrirem por onde começar. Criamos um conjunto de Princípios de Design centrados no usuário para permitir que desenvolvedores construam sistemas agenciais voltados ao cliente para resolver suas necessidades de negócio. Esses princípios de design não são uma arquitetura prescritiva, mas sim um ponto de partida para equipes que estão definindo e construindo experiências de agente.

Em geral, os agentes devem:

- Ampliar e escalar capacidades humanas (brainstorming, resolução de problemas, automação, etc.)
- Preencher lacunas de conhecimento (colocar-me a par de domínios de conhecimento, tradução, etc.)
- Facilitar e apoiar a colaboração nas formas como preferimos trabalhar com outras pessoas
- Tornar-nos versões melhores de nós mesmos (por exemplo, coach de vida/gerenciador de tarefas, ajudando-nos a aprender regulação emocional e habilidades de mindfulness, construir resiliência, etc.)

## Esta Lição Abrangerá

- Quais são os Princípios de Design Agencial
- Quais são algumas diretrizes a seguir ao implementar esses princípios de design
- Quais são alguns exemplos de uso dos princípios de design

## Objetivos de Aprendizagem

Após completar esta lição, você será capaz de:

1. Explicar o que são os Princípios de Design Agencial
2. Explicar as diretrizes para usar os Princípios de Design Agencial
3. Entender como construir um agente usando os Princípios de Design Agencial

## Os Princípios de Design Agencial

![Princípios de Design Agencial](../../../translated_images/pt-BR/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agente (Espaço)

Este é o ambiente no qual o agente opera. Esses princípios informam como projetamos agentes para se envolver nos mundos físico e digital.

- **Conectar, não colapsar** – ajudar a conectar pessoas a outras pessoas, eventos e conhecimento acionável para possibilitar colaboração e conexão.
- Agentes ajudam a conectar eventos, conhecimento e pessoas.
- Agentes aproximam as pessoas. Eles não são projetados para substituir ou menosprezar as pessoas.
- **Facilmente acessível, mas ocasionalmente invisível** – o agente opera em grande parte em segundo plano e só nos estimula quando é relevante e apropriado.
  - O agente é facilmente descoberto e acessível para usuários autorizados em qualquer dispositivo ou plataforma.
  - O agente suporta entradas e saídas multimodais (som, voz, texto, etc.).
  - O agente pode transitar perfeitamente entre primeiro plano e segundo plano; entre proativo e reativo, dependendo de sua percepção das necessidades do usuário.
  - O agente pode operar de forma invisível, ainda que seu caminho de processo em segundo plano e colaboração com outros agentes seja transparente e controlável pelo usuário.

### Agente (Tempo)

É assim que o agente opera ao longo do tempo. Esses princípios informam como projetamos agentes que interagem com o passado, presente e futuro.

- **Passado**: Refletindo sobre a história que inclui tanto estado quanto contexto.
  - O agente fornece resultados mais relevantes com base na análise de dados históricos mais ricos, além de apenas o evento, pessoas ou estados.
  - O agente cria conexões a partir de eventos passados e reflete ativamente sobre a memória para interagir com situações atuais.
- **Agora**: Sugerir mais do que notificar.
  - O agente incorpora uma abordagem abrangente para interagir com as pessoas. Quando um evento acontece, o agente vai além da notificação estática ou outra formalidade estática. O agente pode simplificar fluxos ou gerar dinamicamente sinais para direcionar a atenção do usuário no momento certo.
  - O agente entrega informações com base no ambiente contextual, mudanças sociais e culturais e adaptadas à intenção do usuário.
  - A interação com o agente pode ser gradual, evoluindo/crescendo em complexidade para empoderar os usuários a longo prazo.
- **Futuro**: Adaptando e evoluindo.
  - O agente se adapta a vários dispositivos, plataformas e modalidades.
  - O agente se adapta ao comportamento do usuário, necessidades de acessibilidade e é livremente personalizável.
  - O agente é moldado por e evolui através da interação contínua do usuário.

### Agente (Núcleo)

Estes são os elementos-chave no núcleo do design de um agente.

- **Abraçar a incerteza, mas estabelecer confiança**.
  - Um certo nível de incerteza do agente é esperado. A incerteza é um elemento-chave do design do agente.
  - Confiança e transparência são camadas fundamentais do design do agente.
  - Humanos estão no controle de quando o agente está ligado/desligado e o estado do agente é claramente visível em todos os momentos.

## As Diretrizes para Implementar Esses Princípios

Quando você estiver usando os princípios de design anteriores, use as seguintes diretrizes:

1. **Transparência**: Informar o usuário de que IA está envolvida, como ela funciona (incluindo ações passadas) e como dar feedback e modificar o sistema.
2. **Controle**: Permitir que o usuário personalize, especifique preferências e personalize, e tenha controle sobre o sistema e seus atributos (incluindo a capacidade de esquecer).
3. **Consistência**: Buscar experiências consistentes e multimodais entre dispositivos e pontos de acesso. Usar elementos de UI/UX familiares quando possível (por exemplo, ícone de microfone para interação por voz) e reduzir ao máximo a carga cognitiva do cliente (por exemplo, visar respostas concisas, auxílios visuais e conteúdo “Saiba Mais”).

## Como Projetar um Agente de Viagem usando Estes Princípios e Diretrizes

Imagine que você está projetando um Agente de Viagem; aqui está como você poderia pensar em usar os Princípios e Diretrizes de Design:

1. **Transparência** – Informe o usuário de que o Agente de Viagem é um agente habilitado por IA. Forneça algumas instruções básicas sobre como começar (por exemplo, uma mensagem de “Olá”, prompts de exemplo). Documente isso claramente na página do produto. Mostre a lista de prompts que um usuário pediu no passado. Deixe claro como dar feedback (joinha e desgosto, botão Enviar Feedback, etc.). Articule claramente se o agente tem restrições de uso ou de tópico.
2. **Controle** – Certifique-se de que está claro como o usuário pode modificar o agente depois que ele for criado com coisas como o System Prompt. Permita que o usuário escolha quão verboso o agente é, seu estilo de escrita e quaisquer ressalvas sobre o que o agente não deve abordar. Permita que o usuário visualize e exclua quaisquer arquivos ou dados associados, prompts e conversas passadas.
3. **Consistência** – Certifique-se de que os ícones para Share Prompt, adicionar um arquivo ou foto e marcar alguém ou algo sejam padrão e reconhecíveis. Use o ícone de clipe de papel para indicar envio/compartilhamento de arquivo com o agente, e um ícone de imagem para indicar envio de gráficos.

## Códigos de Exemplo

- Python: [Framework de Agente](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Framework de Agente](./code_samples/03-dotnet-agent-framework.md)


## Tem mais perguntas sobre Padrões de Design Agencial de IA?

Participe do [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) para encontrar outros aprendizes, participar de horas de atendimento e obter respostas para suas perguntas sobre Agentes de IA.

## Recursos Adicionais

- <a href="https://openai.com" target="_blank">Práticas para Governar Sistemas de IA Agencial | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">Projeto HAX Toolkit - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Caixa de Ferramentas de IA Responsável</a>

## Lição Anterior

[Explorando Frameworks Agenciais](../02-explore-agentic-frameworks/README.md)

## Próxima Lição

[Padrão de Uso de Ferramentas](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Isenção de responsabilidade**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a versão autorizada. Para informações críticas, recomenda-se tradução profissional realizada por um tradutor humano. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações equivocadas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->