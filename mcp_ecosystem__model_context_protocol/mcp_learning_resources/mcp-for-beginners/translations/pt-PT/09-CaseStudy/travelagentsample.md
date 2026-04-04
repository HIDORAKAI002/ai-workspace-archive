# Estudo de Caso: Azure AI Travel Agents – Implementação de Referência

## Visão Geral

[Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents) é uma solução de referência abrangente desenvolvida pela Microsoft que demonstra como construir uma aplicação de planeamento de viagens com múltiplos agentes e impulsionada por IA, utilizando o Protocolo de Contexto de Modelo (MCP), Azure OpenAI e Azure AI Search. Este projeto apresenta as melhores práticas para orquestrar múltiplos agentes de IA, integrar dados empresariais e fornecer uma plataforma segura e extensível para cenários do mundo real.

## Características Principais
- **Orquestração Multi-Agente:** Utiliza MCP para coordenar agentes especializados (ex.: agentes de voo, hotel e itinerário) que colaboram para cumprir tarefas complexas de planeamento de viagens.
- **Integração de Dados Empresariais:** Liga-se ao Azure AI Search e outras fontes de dados empresariais para fornecer informações atualizadas e relevantes para recomendações de viagens.
- **Arquitetura Segura e Escalável:** Aproveita os serviços Azure para autenticação, autorização e implementação escalável, seguindo as melhores práticas de segurança empresarial.
- **Ferramentas Extensíveis:** Implementa ferramentas MCP reutilizáveis e modelos de prompt, permitindo uma rápida adaptação a novos domínios ou requisitos de negócio.
- **Experiência do Utilizador:** Oferece uma interface conversacional para os utilizadores interagirem com os agentes de viagem, alimentada pelo Azure OpenAI e MCP.

## Arquitetura
![Architecture](https://raw.githubusercontent.com/Azure-Samples/azure-ai-travel-agents/main/docs/ai-travel-agents-architecture-diagram.png)

### Descrição do Diagrama da Arquitetura

A solução Azure AI Travel Agents é arquitetada para modularidade, escalabilidade e integração segura de múltiplos agentes de IA e fontes de dados empresariais. Os principais componentes e fluxo de dados são os seguintes:

- **Interface do Utilizador:** Os utilizadores interagem com o sistema através de uma UI conversacional (como um chat web ou bot do Teams), que envia perguntas dos utilizadores e recebe recomendações de viagens.
- **Servidor MCP:** Serve como orquestrador central, recebendo a entrada do utilizador, gerindo o contexto e coordenando as ações dos agentes especializados (ex.: FlightAgent, HotelAgent, ItineraryAgent) via Protocolo de Contexto de Modelo.
- **Agentes de IA:** Cada agente é responsável por um domínio específico (voos, hotéis, itinerários) e é implementado como uma ferramenta MCP. Os agentes utilizam modelos de prompt e lógica para processar pedidos e gerar respostas.
- **Serviço Azure OpenAI:** Fornece compreensão e geração avançadas de linguagem natural, permitindo que os agentes interpretem a intenção do utilizador e gerem respostas conversacionais.
- **Azure AI Search & Dados Empresariais:** Os agentes consultam o Azure AI Search e outras fontes de dados empresariais para obter informações atualizadas sobre voos, hotéis e opções de viagem.
- **Autenticação e Segurança:** Integra com Microsoft Entra ID para autenticação segura e aplica controlos de acesso com privilégios mínimos a todos os recursos.
- **Implementação:** Concebido para implementação em Azure Container Apps, garantindo escalabilidade, monitorização e eficiência operacional.

Esta arquitetura permite a orquestração fluída de múltiplos agentes de IA, integração segura com dados empresariais e uma plataforma robusta e extensível para construir soluções de IA específicas por domínio.

## Explicação Passo a Passo do Diagrama da Arquitetura
Imagine planear uma grande viagem e ter uma equipa de assistentes especializados a ajudar em cada detalhe. O sistema Azure AI Travel Agents funciona de forma semelhante, utilizando diferentes partes (como membros da equipa) que têm cada uma uma tarefa especial. Eis como tudo se encaixa:

### Interface do Utilizador (UI):
Pense nisto como a receção do seu agente de viagens. É onde você (o utilizador) faz perguntas ou pedidos, como “Encontra-me um voo para Paris.” Isto pode ser uma janela de chat num website ou numa aplicação de mensagens.

### Servidor MCP (O Coordenador):
O Servidor MCP é como o gestor que ouve o seu pedido na receção e decide qual o especialista que deve tratar de cada parte. Ele acompanha a sua conversa e garante que tudo corre bem.

### Agentes de IA (Assistentes Especialistas):
Cada agente é um especialista numa área específica—um conhece tudo sobre voos, outro sobre hotéis, e outro sobre planeamento de itinerários. Quando pede uma viagem, o Servidor MCP envia o pedido para o(s) agente(s) certo(s). Estes agentes usam os seus conhecimentos e ferramentas para encontrar as melhores opções para si.

### Serviço Azure OpenAI (Especialista em Linguagem):
Isto é como ter um especialista em linguagem que entende exatamente o que está a pedir, independentemente da forma como o diz. Ajuda os agentes a entender os seus pedidos e a responder em linguagem natural e conversacional.

### Azure AI Search & Dados Empresariais (Biblioteca de Informação):
Imagine uma enorme biblioteca atualizada com todas as últimas informações de viagens—horários de voos, disponibilidade de hotéis, e mais. Os agentes pesquisam nesta biblioteca para obter as respostas mais precisas para si.

### Autenticação e Segurança (Guarda de Segurança):
Tal como um guarda de segurança verifica quem pode entrar em certas áreas, esta parte garante que só pessoas e agentes autorizados podem aceder a informações sensíveis. Mantém os seus dados seguros e privados.

### Implementação em Azure Container Apps (O Edifício):
Todos estes assistentes e ferramentas trabalham juntos dentro de um edifício seguro e escalável (a cloud). Isto significa que o sistema pode tratar muitos utilizadores ao mesmo tempo e está sempre disponível quando precisar.

## Como tudo funciona em conjunto:

Começa por fazer uma pergunta na receção (UI).
O gestor (Servidor MCP) descobre qual o especialista (agente) que deve ajudar.
O especialista usa o especialista em linguagem (OpenAI) para entender o seu pedido e a biblioteca (AI Search) para encontrar a melhor resposta.
O guarda de segurança (Autenticação) garante que tudo está seguro.
Tudo isto acontece dentro de um edifício fiável e escalável (Azure Container Apps), para que a sua experiência seja fluida e segura.
Este trabalho em equipa permite que o sistema o ajude a planear a sua viagem rápida e seguramente, tal como uma equipa de agentes de viagem especializados a trabalhar juntos num escritório moderno!

## Implementação Técnica
- **Servidor MCP:** Aloja a lógica central da orquestração, expõe ferramentas de agentes e gere o contexto para fluxos de trabalho de planeamento de viagem em múltiplas etapas.
- **Agentes:** Cada agente (ex.: FlightAgent, HotelAgent) é implementado como uma ferramenta MCP com os seus próprios modelos de prompt e lógica.
- **Integração Azure:** Usa Azure OpenAI para compreensão de linguagem natural e Azure AI Search para recuperação de dados.
- **Segurança:** Integra com Microsoft Entra ID para autenticação e aplica controlos de acesso com privilégios mínimos a todos os recursos.
- **Implementação:** Suporta implementação em Azure Container Apps para escalabilidade e eficiência operacional.

## Resultados e Impacto
- Demonstra como MCP pode ser utilizado para orquestrar múltiplos agentes de IA num cenário real e de nível de produção.
- Acelera o desenvolvimento de soluções ao fornecer padrões reutilizáveis para coordenação de agentes, integração de dados e implementação segura.
- Serve como modelo para construir aplicações específicas por domínio, impulsionadas por IA, usando MCP e serviços Azure.

## Referências
- [Repositório GitHub Azure AI Travel Agents](https://github.com/Azure-Samples/azure-ai-travel-agents)
- [Serviço Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service/)
- [Azure AI Search](https://azure.microsoft.com/en-us/products/ai-services/ai-search/)
- [Protocolo de Contexto de Modelo (MCP)](https://modelcontextprotocol.io/)

## O que vem a seguir

- Voltar para: [Visão Geral dos Estudos de Caso](./README.md)
- Seguinte: [Atualizando Itens ADO a partir do YouTube](./UpdateADOItemsFromYT.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos por garantir a precisão, esteja ciente de que as traduções automáticas podem conter erros ou imprecisões. O documento original no seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se a tradução profissional por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->