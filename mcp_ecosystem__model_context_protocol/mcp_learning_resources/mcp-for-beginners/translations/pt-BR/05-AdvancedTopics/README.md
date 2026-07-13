# Tópicos Avançados em MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/pt-BR/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Clique na imagem acima para assistir ao vídeo desta lição)_

Este capítulo aborda uma série de tópicos avançados na implementação do Protocolo de Contexto de Modelo (MCP), incluindo integração multimodal, escalabilidade, melhores práticas de segurança e integração empresarial. Esses tópicos são cruciais para construir aplicações MCP robustas e prontas para produção capazes de atender às demandas dos sistemas modernos de IA.

## Visão geral

Esta lição explora conceitos avançados na implementação do Protocolo de Contexto de Modelo, focando na integração multimodal, escalabilidade, melhores práticas de segurança e integração empresarial. Esses tópicos são essenciais para construir aplicações MCP de nível produtivo que possam lidar com requisitos complexos em ambientes corporativos.

> **Olhando adiante:** vários tópicos abaixo são afetados pelo candidato a lançamento da especificação MCP `2026-07-28` — Contextos Raiz (5.4) e Amostragem (5.6) constroem sobre primitivas que o candidato a lançamento marca como obsoletas, e o recurso experimental Tarefas referenciado em Recursos do Protocolo (5.16) migra para uma extensão dedicada de Tarefas. Veja [O que está mudando no MCP: O candidato a lançamento de 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para detalhes.

## Objetivos de Aprendizagem

Ao final desta lição, você será capaz de:

- Implementar capacidades multimodais dentro de frameworks MCP
- Projetar arquiteturas MCP escaláveis para cenários de alta demanda
- Aplicar melhores práticas de segurança alinhadas aos princípios de segurança do MCP
- Integrar MCP com sistemas e frameworks de IA empresariais
- Otimizar desempenho e confiabilidade em ambientes de produção

## Lições e projetos exemplo

| Link | Título | Descrição |
|------|-------|-------------|
| [5.1 Integração com Azure](./mcp-integration/README.md) | Integração com Azure | Aprenda como integrar seu Servidor MCP no Azure |
| [5.2 Exemplo multimodal](./mcp-multi-modality/README.md) | Exemplos multimodais MCP | Exemplos para áudio, imagem e respostas multimodais |
| [5.3 Exemplo MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demonstração MCP OAuth2 | Aplicação mínima Spring Boot mostrando OAuth2 com MCP, tanto como Servidor de Autorização quanto como Servidor de Recursos. Demonstra emissão segura de tokens, endpoints protegidos, implantação em Azure Container Apps e integração com API Management. |
| [5.4 Contextos Raiz](./mcp-root-contexts/README.md) | Contextos raiz | Saiba mais sobre contexto raiz e como implementá-los |
| [5.5 Roteamento](./mcp-routing/README.md) | Roteamento | Aprenda diferentes tipos de roteamento |
| [5.6 Amostragem](./mcp-sampling/README.md) | Amostragem | Aprenda como trabalhar com amostragem |
| [5.7 Escalabilidade](./mcp-scaling/README.md) | Escalabilidade | Aprenda sobre escalabilidade |
| [5.8 Segurança](./mcp-security/README.md) | Segurança | Proteja seu Servidor MCP |
| [5.9 Exemplo de Busca Web](./web-search-mcp/README.md) | Busca Web MCP | Servidor e cliente Python MCP integrando com SerpAPI para busca em tempo real na web, notícias, produtos e perguntas e respostas. Demonstra orquestração de múltiplas ferramentas, integração com API externa e tratamento robusto de erros. |
| [5.10 Streaming em Tempo Real](./mcp-realtimestreaming/README.md) | Streaming | Streaming de dados em tempo real tornou-se essencial no mundo orientado a dados de hoje, onde negócios e aplicações exigem acesso imediato à informação para tomar decisões oportunas.|
| [5.11 Busca Web em Tempo Real](./mcp-realtimesearch/README.md) | Busca Web | Busca web em tempo real: como o MCP transforma a busca web em tempo real fornecendo uma abordagem padronizada para gerenciamento de contexto entre modelos de IA, motores de busca e aplicações.| 
| [5.12 Autenticação Entra ID para Servidores Model Context Protocol](./mcp-security-entra/README.md) | Autenticação Entra ID | Microsoft Entra ID fornece uma solução robusta de identidade e gerenciamento de acesso baseada em nuvem, ajudando a garantir que apenas usuários e aplicações autorizados possam interagir com seu servidor MCP.|
| [5.13 Integração do Agente Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Integração Microsoft Foundry | Aprenda a integrar servidores do Protocolo de Contexto de Modelo com agentes Microsoft Foundry, habilitando uma poderosa orquestração de ferramentas e capacidades de IA empresarial com conexões padronizadas para fontes de dados externas.|
| [5.14 Engenharia de Contexto](./mcp-contextengineering/README.md) | Engenharia de Contexto | As oportunidades futuras das técnicas de engenharia de contexto para servidores MCP, incluindo otimização de contexto, gerenciamento dinâmico de contexto e estratégias para engenharia eficaz de prompts dentro dos frameworks MCP.|
| [5.15 Transporte Customizado MCP](./mcp-transport/README.md) | Transporte Customizado | Aprenda como implementar mecanismos de transporte customizados para cenários especializados de comunicação MCP.|
| [5.16 Mergulho Profundo em Recursos do Protocolo](./mcp-protocol-features/README.md) | Recursos do Protocolo | Domine recursos avançados do protocolo incluindo notificações de progresso, cancelamento de requisições, templates de recursos e padrões de tratamento de erros.|
| [5.17 Raciocínio Multi-Agente Adversarial](./mcp-adversarial-agents/README.md) | Agentes Adversariais | Use dois agentes com posições opostas, compartilhando um único conjunto de ferramentas MCP, para detectar alucinações, revelar casos extremos e produzir saídas melhor calibradas através de debates estruturados.|

> **Novidades na Especificação MCP 2025-11-25**: A especificação agora inclui suporte experimental para **Tarefas** (operações de longa duração com rastreamento de progresso), **Anotações de Ferramentas** (metadados sobre comportamento das ferramentas para segurança), **Elicitação de Modo URL** (solicitação de conteúdo específico de URL de clientes), e **Raízes** aprimoradas (para gerenciamento de contexto de espaço de trabalho). Veja o [changelog da especificação MCP](https://spec.modelcontextprotocol.io/) para detalhes completos.

## Referências Adicionais

Para as informações mais atualizadas sobre tópicos avançados MCP, consulte:
- [Documentação MCP](https://modelcontextprotocol.io/)
- [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositório GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riscos e mitigação de segurança
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Treinamento prático de segurança

## Principais Conclusões

- Implementações multimodais MCP estendem as capacidades de IA além do processamento de texto
- Escalabilidade é essencial para implantações empresariais e pode ser resolvida por meio de escalonamento horizontal e vertical
- Medidas abrangentes de segurança protegem dados e garantem controle apropriado de acesso
- Integração empresarial com plataformas como Azure OpenAI e Microsoft AI Foundry potencializa capacidades MCP
- Implementações avançadas MCP beneficiam-se de arquiteturas otimizadas e gerenciamento cuidadoso de recursos

## Exercício

Projete uma implementação MCP de nível empresarial para um caso de uso específico:

1. Identifique os requisitos multimodais para seu caso de uso
2. Delineie os controles de segurança necessários para proteger dados sensíveis
3. Projete uma arquitetura escalável que possa lidar com cargas variáveis
4. Planeje pontos de integração com sistemas de IA empresariais
5. Documente possíveis gargalos de desempenho e estratégias de mitigação

## Recursos Adicionais

- [Documentação Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentação Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## O que vem a seguir

Explore as lições deste módulo começando por: [5.1 Integração MCP](./mcp-integration/README.md)

Assim que concluir este módulo, continue para: [Módulo 6: Contribuições da Comunidade](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->