# Segurança Avançada MCP com Azure Content Safety

> **Risco OWASP MCP Abordado**: [MCP06 - Injeção de Prompt via Payloads Contextuais](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

O Azure Content Safety fornece várias ferramentas poderosas que podem aprimorar a segurança das suas implementações MCP. Para uma experiência prática de implementação, veja o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Segurança de Entrada/Saída.

## Escudos de Prompt

Os Escudos de Prompt de IA da Microsoft oferecem proteção robusta contra ataques de injeção de prompt diretos e indiretos por meio de:

1. **Detecção Avançada**: Usa aprendizado de máquina para identificar instruções maliciosas embutidas no conteúdo.
2. **Destaque**: Transforma o texto de entrada para ajudar os sistemas de IA a distinguirem entre instruções válidas e entradas externas.
3. **Delimitadores e Marcação de Dados**: Marca os limites entre dados confiáveis e não confiáveis.
4. **Integração com Content Safety**: Funciona com Azure AI Content Safety para detectar tentativas de jailbreak e conteúdo prejudicial.
5. **Atualizações Contínuas**: A Microsoft atualiza regularmente os mecanismos de proteção contra ameaças emergentes.

## Implementando Azure Content Safety com MCP

Essa abordagem fornece proteção em múltiplas camadas:
- Escaneando entradas antes do processamento
- Validando saídas antes de retornar
- Usando listas de bloqueio para padrões nocivos conhecidos
- Aproveitando os modelos de segurança de conteúdo continuamente atualizados da Azure

## Recursos do Azure Content Safety

Para saber mais sobre a implementação do Azure Content Safety com seus servidores MCP, consulte esses recursos oficiais:

1. [Documentação do Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentação oficial do Azure Content Safety.
2. [Documentação do Escudo de Prompt](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Aprenda como prevenir ataques de injeção de prompt.
3. [Referência da API do Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Referência detalhada da API para implementar Content Safety.
4. [Início Rápido: Azure Content Safety com C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Guia rápido de implementação em C#.
5. [Bibliotecas de Cliente do Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Bibliotecas cliente para várias linguagens de programação.
6. [Detectando Tentativas de Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Orientações específicas para detectar e prevenir tentativas de jailbreak.
7. [Melhores Práticas para Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Melhores práticas para implementar segurança de conteúdo efetivamente.

Para uma implementação mais detalhada, consulte nosso [Guia de Implementação do Azure Content Safety](./azure-content-safety-implementation.md).

## Próximos Passos

- Leia: [Implementação do Azure Content Safety](./azure-content-safety-implementation.md)
- Voltar para: [Visão Geral do Módulo de Segurança](./README.md)
- Continuar para: [Módulo 3: Começando](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, por favor, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autoritativa. Para informações críticas, recomenda-se tradução profissional realizada por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->