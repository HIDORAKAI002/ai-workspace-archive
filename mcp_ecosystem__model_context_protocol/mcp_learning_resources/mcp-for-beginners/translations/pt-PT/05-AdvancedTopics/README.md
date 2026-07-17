# Tópicos Avançados em MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/pt-PT/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Clique na imagem acima para ver o vídeo desta aula)_

Este capítulo aborda uma série de tópicos avançados na implementação do Protocolo de Contexto de Modelo (MCP), incluindo integração multimodal, escalabilidade, melhores práticas de segurança e integração empresarial. Estes tópicos são cruciais para construir aplicações MCP robustas e prontas para produção que possam satisfazer as exigências dos sistemas de IA modernos.

## Visão Geral

Esta aula explora conceitos avançados na implementação do Protocolo de Contexto de Modelo, focando na integração multimodal, escalabilidade, melhores práticas de segurança e integração empresarial. Estes tópicos são essenciais para construir aplicações MCP de nível de produção que possam lidar com requisitos complexos em ambientes empresariais.

> **Perspectivas futuras:** vários tópicos abaixo são afetados pelo candidato a versão da especificação MCP `2026-07-28` — Contextos Raiz (5.4) e Amostragem (5.6) baseiam-se em primitivas que o candidato a versão assinala como obsoletas, e a funcionalidade experimental de Tarefas referenciada em Funcionalidades do Protocolo (5.16) passa para uma extensão dedicada de Tarefas. Consulte [O que está a mudar no MCP: O candidato a versão de 2026-07-28](../01-CoreConcepts/mcp-2026-07-28-release-candidate.md) para detalhes.

## Objetivos de Aprendizagem

No final desta aula, você será capaz de:

- Implementar capacidades multimodais dentro dos frameworks MCP
- Projetar arquiteturas MCP escaláveis para cenários de alta demanda
- Aplicar melhores práticas de segurança alinhadas com os princípios de segurança do MCP
- Integrar MCP com sistemas e frameworks empresariais de IA
- Otimizar desempenho e fiabilidade em ambientes de produção

## Aulas e Projetos Exemplares

| Link | Título | Descrição |
|------|-------|-------------|
| [5.1 Integração com Azure](./mcp-integration/README.md) | Integração com Azure | Aprenda a integrar o seu Servidor MCP na Azure |
| [5.2 Exemplo multimodal](./mcp-multi-modality/README.md) | Exemplos multimodais MCP  | Exemplos para áudio, imagem e resposta multimodal |
| [5.3 Exemplo MCP OAuth2](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demo MCP OAuth2 | Aplicação minimalista Spring Boot demonstrando OAuth2 com MCP, tanto como Servidor de Autorização como de Recursos. Demonstra emissão segura de tokens, endpoints protegidos, implementação em Azure Container Apps e integração com API Management. |
| [5.4 Contextos Raiz](./mcp-root-contexts/README.md) | Contextos raiz  | Saiba mais sobre contextos raiz e como implementá-los (obsoleto no candidato a versão `2026-07-28`; ainda válido para `2025-11-25`) |
| [5.5 Encaminhamento](./mcp-routing/README.md) | Encaminhamento | Aprenda os diferentes tipos de encaminhamento |
| [5.6 Amostragem](./mcp-sampling/README.md) | Amostragem | Aprenda a trabalhar com amostragem (obsoleto no candidato a versão `2026-07-28`; ainda válido para `2025-11-25`) |
| [5.7 Escalonamento](./mcp-scaling/README.md) | Escalonamento  | Aprenda sobre escalonamento |
| [5.8 Segurança](./mcp-security/README.md) | Segurança  | Proteja o seu Servidor MCP |
| [5.9 Exemplo de Pesquisa Web](./web-search-mcp/README.md) | Pesquisa Web MCP | Servidor Python MCP e cliente integrando com SerpAPI para pesquisa em tempo real na web, notícias, produtos e perguntas & respostas. Demonstra orquestração mult Ferramentas, integração com API externa e gestão robusta de erros. |
| [5.10 Streaming em Tempo Real](./mcp-realtimestreaming/README.md) | Streaming  | A transmissão de dados em tempo real tornou-se essencial no mundo orientado a dados de hoje, onde empresas e aplicações exigem acesso imediato à informação para tomar decisões oportunas.|
| [5.11 Pesquisa Web em Tempo Real](./mcp-realtimesearch/README.md) | Pesquisa Web | Pesquisa web em tempo real: como o MCP transforma a pesquisa web em tempo real ao fornecer uma abordagem padronizada para a gestão de contexto entre modelos de IA, motores de busca e aplicações.| 
| [5.12 Autenticação Entra ID para Servidores do Protocolo de Contexto de Modelo](./mcp-security-entra/README.md) | Autenticação Entra ID | Microsoft Entra ID oferece uma solução robusta de gestão de identidade e acesso baseada na cloud, ajudando a garantir que somente utilizadores e aplicações autorizados possam interagir com o seu servidor MCP.|
| [5.13 Integração com o Agente Microsoft Foundry](./mcp-foundry-agent-integration/README.md) | Integração Microsoft Foundry | Aprenda a integrar servidores do Protocolo de Contexto de Modelo com agentes Microsoft Foundry, permitindo orquestração poderosa de ferramentas e capacidades empresariais de IA com ligações padronizadas a fontes de dados externas.|
| [5.14 Engenharia de Contexto](./mcp-contextengineering/README.md) | Engenharia de Contexto | A oportunidade futura das técnicas de engenharia de contexto para servidores MCP, incluindo otimização de contexto, gestão dinâmica de contexto e estratégias para engenharia eficaz de prompts dentro dos frameworks MCP.|
| [5.15 Transporte Personalizado MCP](./mcp-transport/README.md) | Transporte Personalizado | Aprenda a implementar mecanismos de transporte personalizados para cenários de comunicação MCP especializados.|
| [5.16 Exploração Profunda das Funcionalidades do Protocolo](./mcp-protocol-features/README.md) | Funcionalidades do Protocolo | Domine funcionalidades avançadas do protocolo incluindo notificações de progresso, cancelamento de pedidos, templates de recursos e padrões de tratamento de erros.|
| [5.17 Raciocínio Mult-agente Adversarial](./mcp-adversarial-agents/README.md) | Agentes Adversariais | Use dois agentes com posições opostas, partilhando um único conjunto de ferramentas MCP, para detectar alucinações, revelar casos extremos e produzir outputs melhor calibrados através de debate estruturado.|

> **Novo na Especificação MCP 2025-11-25**: A especificação agora inclui suporte experimental para **Tarefas** (operações de longa duração com acompanhamento de progresso), **Anotações de Ferramentas** (metadados sobre o comportamento da ferramenta para segurança), **Elicitação por Modo URL** (pedido de conteúdo URL específico aos clientes) e **Raízes** melhoradas (para gestão de contexto de ambientes de trabalho). Veja o [registo de alterações da Especificação MCP](https://spec.modelcontextprotocol.io/) para detalhes completos.

## Referências Adicionais

Para obter as informações mais atualizadas sobre tópicos avançados MCP, consulte:
- [Documentação MCP](https://modelcontextprotocol.io/)
- [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositório GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riscos de segurança e mitigação
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formação prática em segurança

## Principais Conclusões

- As implementações multimodais MCP estendem as capacidades de IA para além do processamento de texto
- A escalabilidade é essencial para implementações empresariais e pode ser abordada através de escalonamento horizontal e vertical
- Medidas completas de segurança protegem dados e garantem controlo adequado de acesso
- A integração empresarial com plataformas como Azure OpenAI e Microsoft AI Foundry potencia as capacidades do MCP
- Implementações MCP avançadas beneficiam de arquiteturas otimizadas e gestão cuidadosa de recursos

## Exercício

Desenhe uma implementação MCP de nível empresarial para um caso de uso específico:

1. Identifique requisitos multimodais para o seu caso de uso
2. Delineie os controlos de segurança necessários para proteger dados sensíveis
3. Projete uma arquitetura escalável que possa lidar com cargas variáveis
4. Planeie pontos de integração com sistemas de IA empresariais
5. Documente potenciais gargalos de desempenho e estratégias de mitigação

## Recursos Adicionais

- [Documentação Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentação Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## O que vem a seguir

Explore as aulas deste módulo começando por: [5.1 Integração MCP](./mcp-integration/README.md)

Depois de concluir este módulo, continue para: [Módulo 6: Contribuições da Comunidade](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->