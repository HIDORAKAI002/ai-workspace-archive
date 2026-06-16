# Segurança Avançada MCP com Azure Content Safety

> **Risco MCP da OWASP Tratado**: [MCP06 - Subversão do Fluxo de Intenção](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

O Azure Content Safety fornece várias ferramentas poderosas que podem melhorar a segurança das suas implementações MCP. Para uma experiência prática de implementação, consulte [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Segurança I/O.

## Escudos de Prompt

Os Escudos de Prompt da Microsoft AI oferecem proteção robusta contra ataques diretos e indiretos de injeção de prompt através de:

1. **Deteção Avançada**: Utiliza machine learning para identificar instruções maliciosas incorporadas no conteúdo.
2. **Destaque**: Transforma o texto de entrada para ajudar os sistemas de IA a distinguir entre instruções válidas e entradas externas.
3. **Delimitadores e Marcação de Dados**: Marca os limites entre dados confiáveis e não confiáveis.
4. **Integração com Content Safety**: Trabalha com o Azure AI Content Safety para detetar tentativas de jailbreak e conteúdos nocivos.
5. **Atualizações Contínuas**: A Microsoft atualiza regularmente os mecanismos de proteção contra ameaças emergentes.

## Implementação do Azure Content Safety com MCP

Esta abordagem oferece proteção em múltiplas camadas:
- Análise das entradas antes do processamento
- Validação das saídas antes da devolução
- Utilização de listas bloqueadas para padrões nocivos conhecidos
- Aproveitamento dos modelos de segurança de conteúdo continuamente atualizados do Azure

## Recursos do Azure Content Safety

Para saber mais sobre a implementação do Azure Content Safety com os seus servidores MCP, consulte estes recursos oficiais:

1. [Documentação do Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentação oficial do Azure Content Safety.
2. [Documentação do Prompt Shield](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Saiba como prevenir ataques de injeção de prompt.
3. [Referência da API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Referência detalhada da API para implementar o Content Safety.
4. [Quickstart: Azure Content Safety com C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Guia rápido de implementação usando C#.
5. [Bibliotecas Cliente do Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Bibliotecas cliente para várias linguagens de programação.
6. [Detetar Tentativas de Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Orientações específicas sobre a deteção e prevenção de tentativas de jailbreak.
7. [Melhores Práticas para Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Melhores práticas para implementar de forma eficaz a segurança de conteúdo.

Para uma implementação mais detalhada, consulte o nosso [Guia de Implementação do Azure Content Safety](./azure-content-safety-implementation.md).

## O que Segue

- Leia: [Implementação do Azure Content Safety](./azure-content-safety-implementation.md)
- Voltar para: [Visão Geral do Módulo de Segurança](./README.md)
- Continuar para: [Módulo 3: Introdução](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->