# Implementando Azure Content Safety com MCP

> **Risco MCP OWASP Abordado**: [MCP06 - Injeção de Prompt via Payloads Contextuais](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Para reforçar a segurança do MCP contra injeção de prompt, envenenamento de ferramentas e outras vulnerabilidades específicas de IA, a integração do Azure Content Safety é altamente recomendada. Este guia de implementação está alinhado com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Segurança de E/S.

## Integração com o Servidor MCP

Para integrar o Azure Content Safety ao seu servidor MCP, adicione o filtro de segurança de conteúdo como middleware no seu pipeline de processamento de requisições:

1. Inicialize o filtro durante a inicialização do servidor
2. Valide todas as requisições de ferramentas recebidas antes de processá-las
3. Verifique todas as respostas enviadas antes de retorná-las aos clientes
4. Registre e alerte sobre violações de segurança
5. Implemente tratamento adequado de erros para falhas nas verificações de segurança de conteúdo

Isso proporciona uma defesa robusta contra:
- Ataques de injeção de prompt
- Tentativas de envenenamento de ferramentas
- Exfiltração de dados via entradas maliciosas
- Geração de conteúdo nocivo

## Boas Práticas para Integração do Azure Content Safety

1. **Listas de Bloqueio Personalizadas**: Crie listas de bloqueio específicas para padrões de injeção MCP
2. **Ajuste de Severidade**: Ajuste os limiares de severidade com base no seu caso de uso e tolerância a riscos
3. **Cobertura Abrangente**: Aplique verificações de segurança de conteúdo em todas as entradas e saídas
4. **Otimização de Performance**: Considere implementar cache para verificações repetidas de segurança de conteúdo
5. **Mecanismos de Contingência**: Defina comportamentos claros de fallback quando os serviços de segurança de conteúdo não estiverem disponíveis
6. **Feedback ao Usuário**: Forneça feedback claro aos usuários quando o conteúdo for bloqueado por motivos de segurança
7. **Melhoria Contínua**: Atualize regularmente as listas de bloqueio e padrões com base em ameaças emergentes

## Recursos Adicionais

### Orientações de Segurança MCP OWASP
- [Guia de Segurança MCP Azure OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - OWASP MCP Top 10 abrangente com implementação no Azure
- [MCP06 - Injeção de Prompt](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Padrões detalhados para mitigação de injeção de prompt
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Camp 3 prático: Segurança de E/S cobre segurança de conteúdo

### Documentação do Azure
- [Visão Geral do Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Documentação do Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Quickstart do Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Próximos Passos

- Voltar para: [Visão Geral do Módulo de Segurança](./README.md)
- Continuar para: [Módulo 3: Começando](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos para garantir a precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autoritária. Para informações críticas, recomenda-se tradução profissional feita por humanos. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações equivocadas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->