# Segurança Avançada MCP com Azure Content Safety

> **Risco MCP OWASP Abordado**: [MCP06 - Subversão do Fluxo de Intenção](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

O Azure Content Safety oferece várias ferramentas poderosas que podem aprimorar a segurança das suas implementações MCP. Para uma experiência prática de implementação, veja [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Escudos de Prompt

Os Escudos de Prompt da Microsoft para IA fornecem proteção robusta contra ataques de injeção de prompt diretos e indiretos através de:

1. **Detecção Avançada**: Usa aprendizado de máquina para identificar instruções maliciosas incorporadas no conteúdo.
2. **Destaque**: Transforma o texto de entrada para ajudar os sistemas de IA a distinguirem entre instruções válidas e entradas externas.
3. **Delimitadores e Marcação de Dados**: Marca os limites entre dados confiáveis e não confiáveis.
4. **Integração com Content Safety**: Funciona com o Azure AI Content Safety para detectar tentativas de jailbreak e conteúdo nocivo.
5. **Atualizações Contínuas**: A Microsoft atualiza regularmente os mecanismos de proteção contra ameaças emergentes.

## Implementando Azure Content Safety com MCP

Esta abordagem fornece proteção em múltiplas camadas:
- Escanear entradas antes do processamento
- Validar saídas antes do retorno
- Usar listas de bloqueio para padrões nocivos conhecidos
- Aproveitar os modelos de segurança de conteúdo continuamente atualizados da Azure

## Recursos do Azure Content Safety

Para saber mais sobre como implementar o Azure Content Safety com seus servidores MCP, consulte esses recursos oficiais:

1. [Documentação Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) - Documentação oficial do Azure Content Safety.
2. [Documentação do Escudo de Prompt](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Aprenda como prevenir ataques de injeção de prompt.
3. [Referência da API Content Safety](https://learn.microsoft.com/rest/api/contentsafety/) - Referência detalhada da API para implementação do Content Safety.
4. [Início rápido: Azure Content Safety com C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Guia rápido de implementação usando C#.
5. [Bibliotecas Cliente do Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Bibliotecas cliente para várias linguagens de programação.
6. [Detecção de Tentativas de Jailbreak](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Orientação específica para detectar e prevenir tentativas de jailbreak.
7. [Melhores Práticas para Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Melhores práticas para implementar segurança de conteúdo efetivamente.

Para uma implementação mais aprofundada, veja nosso [Guia de Implementação do Azure Content Safety](./azure-content-safety-implementation.md).

## Próximos Passos

- Leia: [Implementação do Azure Content Safety](./azure-content-safety-implementation.md)
- Retorne para: [Visão Geral do Módulo de Segurança](./README.md)
- Continue para: [Módulo 3: Começando](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->