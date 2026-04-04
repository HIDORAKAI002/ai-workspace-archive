# Implementação do Azure Content Safety com MCP

> **Risco OWASP MCP Abordado**: [MCP06 - Injeção de Prompt via Cargas Contextuais](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Para reforçar a segurança do MCP contra injeção de prompt, envenenamento de ferramentas e outras vulnerabilidades específicas de IA, é altamente recomendada a integração do Azure Content Safety. Este guia de implementação está alinhado com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Integração com o Servidor MCP

Para integrar o Azure Content Safety com o seu servidor MCP, adicione o filtro de segurança de conteúdo como middleware na sua cadeia de processamento de pedidos:

1. Inicialize o filtro durante a arranque do servidor
2. Valide todos os pedidos de ferramentas recebidos antes de processar
3. Verifique todas as respostas enviadas antes de as devolver aos clientes
4. Registe e alerte sobre violações de segurança
5. Implemente tratamento adequado de erros para falhas nas verificações de segurança de conteúdo

Isto proporciona uma defesa robusta contra:
- Ataques de injeção de prompt
- Tentativas de envenenamento de ferramentas
- Exfiltração de dados através de entradas maliciosas
- Geração de conteúdos nocivos

## Melhores Práticas para Integração do Azure Content Safety

1. **Listas de Bloqueio Personalizadas**: Crie listas de bloqueio personalizadas especificamente para padrões de injeção MCP
2. **Ajuste de Severidade**: Ajuste os limiares de severidade com base no seu caso de uso específico e tolerância ao risco
3. **Cobertura Abrangente**: Aplique verificações de segurança de conteúdo a todas as entradas e saídas
4. **Otimização de Performance**: Considere implementar cache para verificações repetidas de segurança de conteúdo
5. **Mecanismos de Contingência**: Defina comportamentos claros de fallback quando os serviços de segurança de conteúdo não estiverem disponíveis
6. **Feedback ao Utilizador**: Forneça feedback claro aos utilizadores quando o conteúdo for bloqueado por motivos de segurança
7. **Melhoria Contínua**: Atualize regularmente listas de bloqueio e padrões com base em ameaças emergentes

## Recursos Adicionais

### Orientações de Segurança OWASP MCP
- [Guia de Segurança OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 OWASP MCP abrangente com implementação Azure
- [MCP06 - Injeção de Prompt](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Padrões detalhados de mitigação de injeção de prompt
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Camp 3 prático: I/O Security cobre segurança de conteúdo

### Documentação Azure
- [Visão Geral do Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Documentação Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)
- [Início Rápido Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)

## Próximos Passos

- Voltar para: [Visão Geral do Módulo de Segurança](./README.md)
- Continuar para: [Módulo 3: Introdução](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:  
Este documento foi traduzido utilizando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original no seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->