# Tópicos Avançados em MCP

[![MCP Avançado: Agentes de IA Seguros, Escaláveis e Multimodais](../../../translated_images/pt-PT/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Clique na imagem acima para ver o vídeo desta lição)_

Este capítulo aborda uma série de tópicos avançados na implementação do Protocolo de Contexto de Modelo (MCP), incluindo integração multimodal, escalabilidade, melhores práticas de segurança e integração empresarial. Estes tópicos são cruciais para construir aplicações MCP robustas e prontas para produção que possam satisfazer as exigências dos sistemas modernos de IA.

## Visão Geral

Esta lição explora conceitos avançados na implementação do Protocolo de Contexto de Modelo, focando na integração multimodal, escalabilidade, melhores práticas de segurança e integração empresarial. Estes tópicos são essenciais para construir aplicações MCP de nível de produção que possam lidar com requisitos complexos em ambientes empresariais.

> **Perspetiva futura:** vários tópicos abaixo são afetados pela versão candidata da especificação MCP `2026-07-28` — Contextos Raiz (5.4) e Amostragem (5.6) baseiam-se em primitivas que a versão candidata marca como obsoletas, e a funcionalidade experimental de Tarefas referenciada em Funcionalidades do Protocolo (5.16) passa para uma extensão dedicada de Tarefas. Veja [O que está a mudar no MCP: a Versão Candidata de 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para detalhes.

## Objetivos de Aprendizagem

No final desta lição, será capaz de:

- Implementar capacidades multimodais dentro dos frameworks MCP
- Projetar arquiteturas MCP escaláveis para cenários de alta procura
- Aplicar melhores práticas de segurança alinhadas com os princípios de segurança do MCP
- Integrar MCP com sistemas e frameworks empresariais de IA
- Otimizar desempenho e fiabilidade em ambientes de produção

## Lições e Projetos de Exemplo

| Ligação | Título | Descrição |
|------|-------|-------------|
| [5.1 Integração com Azure](./mcp-integration/README.md) | Integração com Azure | Aprenda a integrar o seu Servidor MCP no Azure |
| [5.2 Exemplo Multimodal](./mcp-multi-modality/README.md) | Exemplos MCP Multimodais  | Exemplos para áudio, imagem e resposta multimodal |
| [5.3 Exemplo MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demonstração MCP OAuth2 | Aplicação mínima Spring Boot mostrando OAuth2 com MCP, tanto como Servidor de Autorização como Servidor de Recursos. Demonstra emissão segura de tokens, endpoints protegidos, implementação no Azure Container Apps e integração com API Management. |
| [5.4 Contextos Raiz](./mcp-root-contexts/README.md) | Contextos raiz  | Saiba mais sobre contexto raiz e como implementá-los |
| [5.5 Roteamento](./mcp-routing/README.md) | Roteamento | Aprenda diferentes tipos de roteamento |
| [5.6 Amostragem](./mcp-sampling/README.md) | Amostragem | Aprenda a trabalhar com amostragem |
| [5.7 Escalabilidade](./mcp-scaling/README.md) | Escalabilidade  | Aprenda sobre escalabilidade |
| [5.8 Segurança](./mcp-security/README.md) | Segurança  | Proteja o seu Servidor MCP |
| [5.9 Exemplo de Pesquisa Web](./web-search-mcp/README.md) | Pesquisa Web MCP | Servidor e cliente MCP em Python integrando com SerpAPI para pesquisa web, notícias, produtos e perguntas e respostas em tempo real. Demonstra orquestração multi-ferramentas, integração de API externa e tratamento robusto de erros. |
| [5.10 Streaming em Tempo Real](./mcp-realtimestreaming/README.md) | Streaming  | Streaming de dados em tempo real tornou-se essencial no mundo orientado por dados de hoje, onde negócios e aplicações requerem acesso imediato a informação para tomar decisões atempadas.|
| [5.11 Pesquisa Web em Tempo Real](./mcp-realtimesearch/README.md) | Pesquisa Web | Pesquisa web em tempo real e como o MCP transforma a pesquisa web em tempo real ao fornecer uma abordagem padronizada para gestão de contexto entre modelos de IA, motores de pesquisa e aplicações.| 
| [5.12 Autenticação Entra ID para Servidores do Protocolo de Contexto de Modelo](./mcp-security-entra/README.md) | Autenticação Entra ID | O Microsoft Entra ID fornece uma solução robusta baseada na nuvem para gestão de identidade e acesso, ajudando a garantir que apenas utilizadores e aplicações autorizados podem interagir com o seu servidor MCP.|
| [5.13 Integração do Agente Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Integração Microsoft Foundry | Aprenda como integrar servidores do Protocolo de Contexto de Modelo com agentes Microsoft Foundry, possibilitando orquestração poderosa de ferramentas e capacidades empresariais de IA com ligações padronizadas a fontes de dados externas.|
| [5.14 Engenharia de Contexto](./mcp-contextengineering/README.md) | Engenharia de Contexto | A oportunidade futura das técnicas de engenharia de contexto para servidores MCP, incluindo otimização de contexto, gestão dinâmica de contexto e estratégias para engenharia eficaz de prompts dentro dos frameworks MCP.|
| [5.15 Transporte Personalizado MCP](./mcp-transport/README.md) | Transporte Personalizado | Aprenda como implementar mecanismos de transporte personalizados para cenários especializados de comunicação MCP.|
| [5.16 Análise Detalhada das Funcionalidades do Protocolo](./mcp-protocol-features/README.md) | Funcionalidades do Protocolo | Domine funcionalidades avançadas do protocolo incluindo notificações de progresso, cancelamento de pedidos, templates de recursos e padrões de tratamento de erros.|
| [5.17 Raciocínio Multi-Agente Adversarial](./mcp-adversarial-agents/README.md) | Agentes Adversariais | Utilize dois agentes com posições opostas, partilhando um único conjunto de ferramentas MCP, para detectar alucinações, identificar casos limítrofes e produzir respostas melhor calibradas através de debate estruturado.|

> **Novo na Especificação MCP 2025-11-25**: A especificação agora inclui suporte experimental para **Tarefas** (operações de longa duração com acompanhamento de progresso), **Anotações de Ferramentas** (metadados sobre o comportamento da ferramenta para segurança), **Elicitação em Modo URL** (requerendo conteúdo URL específico dos clientes) e **Raízes** melhoradas (para gestão de contexto em espaços de trabalho). Veja o [changelog da Especificação MCP](https://spec.modelcontextprotocol.io/) para detalhes completos.

## Referências Adicionais

Para a informação mais atualizada sobre tópicos avançados do MCP, consulte:
- [Documentação MCP](https://modelcontextprotocol.io/)
- [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositório GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riscos de segurança e mitigação
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formação prática em segurança

## Pontos-Chave

- Implementações MCP multimodais estendem capacidades de IA para além do processamento de texto
- A escalabilidade é essencial para implementações empresariais e pode ser abordada através de escalamento horizontal e vertical
- Medidas abrangentes de segurança protegem dados e asseguram controlo de acesso adequado
- Integração empresarial com plataformas como Azure OpenAI e Microsoft AI Foundry melhora capacidades MCP
- Implementações avançadas MCP beneficiam de arquiteturas otimizadas e gestão cuidadosa de recursos

## Exercício

Desenhe uma implementação MCP de nível empresarial para um caso de uso específico:

1. Identifique requisitos multimodais para o seu caso de uso
2. Delineie os controlos de segurança necessários para proteger dados sensíveis
3. Projete uma arquitetura escalável que possa lidar com cargas variáveis
4. Planeie pontos de integração com sistemas empresariais de IA
5. Documente possíveis gargalos de desempenho e estratégias de mitigação

## Recursos Adicionais

- [Documentação Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentação Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## O que vem a seguir

Explore as lições deste módulo começando por: [5.1 Integração MCP](./mcp-integration/README.md)

Depois de concluir este módulo, continue para: [Módulo 6: Contribuições da Comunidade](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->