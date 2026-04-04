# Tópicos Avançados em MCP

[![Advanced MCP: Secure, Scalable, and Multi-modal AI Agents](../../../translated_images/pt-PT/06.42259eaf91fccfc6.webp)](https://youtu.be/4yjmGvJzYdY)

_(Clique na imagem acima para ver o vídeo desta lição)_

Este capítulo aborda uma série de tópicos avançados na implementação do Protocolo de Contexto de Modelo (MCP), incluindo integração multimodal, escalabilidade, melhores práticas de segurança e integração empresarial. Estes tópicos são cruciais para construir aplicações MCP robustas e prontas para produção que possam satisfazer as exigências dos sistemas de IA modernos.

## Visão geral

Esta lição explora conceitos avançados na implementação do Protocolo de Contexto de Modelo, focando na integração multimodal, escalabilidade, melhores práticas de segurança e integração empresarial. Estes tópicos são essenciais para construir aplicações MCP de nível de produção que possam lidar com requisitos complexos em ambientes empresariais.

## Objetivos de aprendizagem

No final desta lição, será capaz de:

- Implementar capacidades multimodais dentro de frameworks MCP
- Projetar arquiteturas MCP escaláveis para cenários de alta procura
- Aplicar melhores práticas de segurança alinhadas com os princípios de segurança do MCP
- Integrar MCP com sistemas e frameworks empresariais de IA
- Otimizar desempenho e fiabilidade em ambientes de produção

## Lições e projetos de exemplo

| Link | Título | Descrição |
|------|--------|-----------|
| [5.1 Integration with Azure](./mcp-integration/README.md) | Integração com Azure | Aprenda a integrar o seu Servidor MCP na Azure |
| [5.2 Multi modal sample](./mcp-multi-modality/README.md) | Exemplos multimodais MCP | Exemplos para resposta áudio, imagem e multimodal |
| [5.3 MCP OAuth2 sample](../../../05-AdvancedTopics/mcp-oauth2-demo) | Demonstração MCP OAuth2 | Aplicação mínima Spring Boot mostrando OAuth2 com MCP, tanto como Servidor de Autorização como Servidor de Recursos. Demonstra emissão segura de tokens, endpoints protegidos, deployment em Azure Container Apps, e integração com API Management. |
| [5.4 Root Contexts](./mcp-root-contexts/README.md) | Contextos raiz | Saiba mais sobre contextos raiz e como implementá-los |
| [5.5 Routing](./mcp-routing/README.md) | Roteamento | Aprenda diferentes tipos de roteamento |
| [5.6 Sampling](./mcp-sampling/README.md) | Amostragem | Aprenda a trabalhar com amostragem |
| [5.7 Scaling](./mcp-scaling/README.md) | Escalabilidade | Aprenda sobre escalabilidade |
| [5.8 Security](./mcp-security/README.md) | Segurança | Proteja o seu Servidor MCP |
| [5.9 Web Search sample](./web-search-mcp/README.md) | Pesquisa Web MCP | Servidor e cliente MCP Python integrando com SerpAPI para pesquisa web, notícias, produtos e Q&A em tempo real. Demonstra orquestração multi-ferramentas, integração com APIs externas e gestão robusta de erros. |
| [5.10 Realtime Streaming](./mcp-realtimestreaming/README.md) | Streaming | O streaming de dados em tempo real tornou-se essencial no mundo atual orientado por dados, onde negócios e aplicações requerem acesso imediato à informação para tomadas de decisão rápidas. |
| [5.11 Realtime Web Search](./mcp-realtimesearch/README.md) | Pesquisa Web | Pesquisa web em tempo real e como o MCP transforma essa pesquisa ao fornecer uma abordagem padronizada para gestão de contexto entre modelos de IA, motores de busca e aplicações. |
| [5.12  Entra ID Authentication for Model Context Protocol Servers](./mcp-security-entra/README.md) | Autenticação Entra ID | Microsoft Entra ID fornece uma solução robusta baseada na cloud para gestão de identidade e acesso, ajudando a garantir que apenas utilizadores e aplicações autorizados possam interagir com o seu servidor MCP. |
| [5.13 Azure AI Foundry Agent Integration](./mcp-foundry-agent-integration/README.md) | Integração Azure AI Foundry | Aprenda a integrar servidores MCP com agentes Azure AI Foundry, permitindo orquestração poderosa de ferramentas e capacidades empresariais de IA com ligações padronizadas a fontes de dados externas. |
| [5.14 Context Engineering](./mcp-contextengineering/README.md) | Engenharia de Contexto | A oportunidade futura das técnicas de engenharia de contexto para servidores MCP, incluindo otimização de contexto, gestão dinâmica de contexto e estratégias para engenharia eficaz de prompts dentro dos frameworks MCP. |
| [5.15 MCP Custom Transport](./mcp-transport/README.md) | Transporte Customizado | Aprenda a implementar mecanismos de transporte customizados para cenários especializados de comunicação MCP. |
| [5.16 Protocol Features Deep Dive](./mcp-protocol-features/README.md) | Funcionalidades do Protocolo | Domine funcionalidades avançadas do protocolo incluindo notificações de progresso, cancelamento de pedidos, templates de recursos e padrões de gestão de erros. |

> **Novo na Especificação MCP 2025-11-25**: A especificação agora inclui suporte experimental para **Tasks** (operações de longa duração com acompanhamento de progresso), **Anotações de Ferramentas** (metadados sobre comportamento das ferramentas para segurança), **Elaboração de Modo URL** (requisição de conteúdo URL específico dos clientes), e raízes aprimoradas (**Roots**) (para gestão de contexto de workspace). Veja o [changelog da Especificação MCP](https://spec.modelcontextprotocol.io/) para detalhes completos.

## Referências adicionais

Para obter a informação mais atualizada sobre tópicos avançados de MCP, consulte:
- [Documentação MCP](https://modelcontextprotocol.io/)
- [Especificação MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Repositório GitHub](https://github.com/modelcontextprotocol)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Riscos de segurança e mitigação
- [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) - Formação prática em segurança

## Principais pontos

- Implementações MCP multimodais alargam as capacidades de IA além do processamento de texto
- Escalabilidade é essencial para deployments empresariais e pode ser tratada através de escalamento horizontal e vertical
- Medidas abrangentes de segurança protegem os dados e garantem controlo de acesso correto
- Integração empresarial com plataformas como Azure OpenAI e Microsoft AI Foundry potencia as capacidades MCP
- Implementações avançadas MCP beneficiam de arquiteturas otimizadas e gestão cuidadosa dos recursos

## Exercício

Projete uma implementação MCP de nível empresarial para um caso de uso específico:

1. Identifique os requisitos multimodais para o seu caso de uso
2. Defina os controlos de segurança necessários para proteger dados sensíveis
3. Projete uma arquitetura escalável que possa lidar com variações de carga
4. Planeie pontos de integração com sistemas empresariais de IA
5. Documente potenciais gargalos de desempenho e estratégias de mitigação

## Recursos adicionais

- [Documentação Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Documentação Microsoft AI Foundry](https://learn.microsoft.com/en-us/ai-services/)

---

## O que vem a seguir

Explore as lições deste módulo começando por: [5.1 MCP Integration](./mcp-integration/README.md)

Depois de concluir este módulo, continue para: [Módulo 6: Contribuições da Comunidade](../06-CommunityContributions/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, tenha em conta que as traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional feita por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->