[![Como Projetar Bons Agentes de IA](../../../translated_images/pt-PT/lesson-3-thumbnail.1092dd7a8f1074a5.webp)](https://youtu.be/m9lM8qqoOEA?si=4KimounNKvArQQ0K)

> _(Clique na imagem acima para ver o vídeo desta lição)_
# Princípios de Design de Agentes de IA

## Introdução

Existem muitas formas de pensar na construção de Sistemas Agentes de IA. Dado que a ambiguidade é uma característica e não um problema no design de IA Generativa, por vezes é difícil para os engenheiros perceberem por onde começar. Criámos um conjunto de Princípios de Design centrados no Utilizador para permitir aos desenvolvedores construir sistemas agentes centrados no cliente para resolver as suas necessidades empresariais. Estes princípios de design não são uma arquitetura prescritiva, mas sim um ponto de partida para equipas que estão a definir e a desenvolver experiências com agentes.

Em geral, os agentes devem:

- Ampliar e aumentar as capacidades humanas (brainstorming, resolução de problemas, automação, etc.)
- Colmatar lacunas de conhecimento (por exemplo, atualizar-me sobre domínios do conhecimento, tradução, etc.)
- Facilitar e apoiar a colaboração da forma como, enquanto indivíduos, preferimos trabalhar com os outros
- Tornar-nos versões melhores de nós próprios (por ex., treinador de vida/gestor de tarefas, ajudando a aprender habilidades de regulação emocional e mindfulness, construindo resiliência, etc.)

## Esta Lição Vai Abranger

- O que são os Princípios de Design Agentes
- Quais as diretrizes a seguir na implementação destes princípios de design
- Alguns exemplos de utilização dos princípios de design

## Objetivos de Aprendizagem

Após concluir esta lição, será capaz de:

1. Explicar o que são os Princípios de Design Agentes
2. Explicar as diretrizes para usar os Princípios de Design Agentes
3. Compreender como construir um agente utilizando os Princípios de Design Agentes

## Os Princípios de Design Agentes

![Princípios de Design Agentes](../../../translated_images/pt-PT/agentic-design-principles.1cfdf8b6d3cc73c2.webp)

### Agente (Espaço)

Este é o ambiente em que o agente opera. Estes princípios orientam como projetamos agentes para se envolverem em mundos físicos e digitais.

- **Conectar, não colapsar** – ajudar a conectar pessoas a outras pessoas, eventos e conhecimentos acionáveis para permitir colaboração e ligação.
- Agentes ajudam a conectar eventos, conhecimento e pessoas.
- Agentes aproximam as pessoas. Não são concebidos para substituir ou diminuir as pessoas.
- **Facilmente acessível, mas ocasionalmente invisível** – o agente opera em grande parte em segundo plano e só nos avisa quando é relevante e apropriado.
  - O agente é facilmente descoberto e acessível para utilizadores autorizados em qualquer dispositivo ou plataforma.
  - O agente suporta entradas e saídas multimodais (som, voz, texto, etc.).
  - O agente pode transitar fluentemente entre primeiro plano e segundo plano; entre proativo e reativo, dependendo da perceção das necessidades do utilizador.
  - O agente pode operar em forma invisível, mas o seu processo de fundo e colaboração com outros agentes são transparentes e controláveis pelo utilizador.

### Agente (Tempo)

Este é o modo como o agente opera ao longo do tempo. Estes princípios orientam como projetamos agentes que interagem com o passado, presente e futuro.

- **Passado**: Refletir sobre a história que inclui estado e contexto.
  - O agente fornece resultados mais relevantes baseados na análise de dados históricos mais ricos além do evento, pessoas ou estados.
  - O agente cria conexões a partir de eventos passados e reflete ativamente na memória para se envolver em situações atuais.
- **Agora**: Aconselhar mais do que notificar.
  - O agente incorpora uma abordagem abrangente para interagir com pessoas. Quando um evento ocorre, o agente vai além da notificação estática ou qualquer outra formalidade estática. O agente pode simplificar fluxos ou gerar dinamicamente pistas para direcionar a atenção do utilizador no momento certo.
  - O agente fornece informação baseada no contexto ambiental, mudanças sociais e culturais e adaptada à intenção do utilizador.
  - A interação com o agente pode ser gradual, evoluindo/crescendo em complexidade para capacitar os utilizadores a longo prazo.
- **Futuro**: Adaptar e evoluir.
  - O agente adapta-se a vários dispositivos, plataformas e modalidades.
  - O agente adapta-se ao comportamento do utilizador, necessidades de acessibilidade, e é livremente personalizável.
  - O agente é moldado e evolui através da interação contínua com o utilizador.

### Agente (Núcleo)

Estes são os elementos chave no núcleo do design de um agente.

- **Abraçar a incerteza mas estabelecer confiança**.
  - Um certo nível de incerteza do agente é esperado. A incerteza é um elemento chave do design do agente.
  - A confiança e transparência são camadas fundamentais do design do agente.
  - Os humanos têm controlo de quando o agente está ligado/desligado e o estado do agente é claramente visível em todos os momentos.

## As Diretrizes para Implementar Estes Princípios

Ao usar os princípios de design anteriores, utilize as seguintes diretrizes:

1. **Transparência**: Informar o utilizador que a IA está envolvida, como funciona (incluindo ações passadas), e como dar feedback e modificar o sistema.
2. **Controlo**: Permitir ao utilizador personalizar, especificar preferências e personalizar, e ter controlo sobre o sistema e seus atributos (incluindo a capacidade de esquecer).
3. **Consistência**: Almejar experiências consistentes e multimodais em dispositivos e pontos finais. Usar elementos UI/UX familiares sempre que possível (por ex., ícone de microfone para interação por voz) e reduzir ao máximo a carga cognitiva do cliente (por ex., respostas concisas, ajudas visuais e conteúdo ‘Saber Mais’).

## Como Projetar um Agente de Viagens usando Estes Princípios e Diretrizes

Imagine que está a projetar um Agente de Viagens, veja como poderia pensar em usar os Princípios e Diretrizes de Design:

1. **Transparência** – Informar o utilizador que o Agente de Viagens é um agente ativado por IA. Fornecer algumas instruções básicas sobre como começar (por ex., uma mensagem de “Olá”, exemplos de comandos). Documentar claramente isto na página do produto. Mostrar a lista de comandos que o utilizador já pediu no passado. Explicar claramente como dar feedback (polegares para cima e para baixo, botão Enviar Feedback, etc.). Articular claramente se o Agente tem restrições de uso ou de tópicos.
2. **Controlo** – Garantir que é claro como o utilizador pode modificar o Agente após a criação com coisas como o Prompt do Sistema. Permitir que o utilizador escolha o nível de detalhamento do agente, o estilo de escrita e quaisquer ressalvas sobre o que o Agente não deve abordar. Permitir ao utilizador ver e eliminar quaisquer ficheiros ou dados associados, comandos e conversas passadas.
3. **Consistência** – Garantir que os ícones para Partilhar Comando, adicionar um ficheiro ou foto e marcar alguém ou algo são padrão e reconhecíveis. Usar o ícone de clipe para indicar upload/partilha de ficheiros com o Agente, e um ícone de imagem para indicar upload de gráficos.

## Códigos de Exemplo

- Python: [Agent Framework](./code_samples/03-python-agent-framework.ipynb)
- .NET: [Agent Framework](./code_samples/03-dotnet-agent-framework.md)


## Tem Mais Questões sobre Padrões de Design Agentic de IA?

Junte-se ao [Microsoft Foundry Discord](https://aka.ms/ai-agents/discord) para conhecer outros aprendizes, participar de horas de atendimento e obter respostas às suas questões sobre Agentes de IA.

## Recursos Adicionais

- <a href="https://openai.com" target="_blank">Práticas para Governar Sistemas Agentes de IA | OpenAI</a>
- <a href="https://microsoft.com" target="_blank">O Projeto HAX Toolkit - Microsoft Research</a>
- <a href="https://responsibleaitoolbox.ai" target="_blank">Caixa de Ferramentas para IA Responsável</a>

## Lição Anterior

[Explorando Frameworks Agentes](../02-explore-agentic-frameworks/README.md)

## Próxima Lição

[Padrão de Design para Uso de Ferramentas](../04-tool-use/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que as traduções automáticas podem conter erros ou imprecisões. O documento original no seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional por um tradutor humano. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->