# Implementar a Segurança de Conteúdo Azure com MCP

> **Risco MCP OWASP Abordado**: [MCP06 - Subversão do Fluxo de Intenção](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Para reforçar a segurança do MCP contra injeção de prompts, envenenamento de ferramentas e outras vulnerabilidades específicas de IA, é fortemente recomendada a integração do Azure Content Safety. Este guia de implementação está alinhado com o [Workshop MCP Security Summit (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: Segurança I/O.

## Integração com o Servidor MCP

Para integrar o Azure Content Safety com o seu servidor MCP, adicione o filtro de segurança de conteúdo como middleware na sua pipeline de processamento de pedidos:

1. Inicialize o filtro durante o arranque do servidor  
2. Valide todos os pedidos de ferramentas recebidos antes de os processar  
3. Verifique todas as respostas enviadas antes de as devolver aos clientes  
4. Registe e alerte sobre violações de segurança  
5. Implemente tratamento de erros adequado para falhas nas verificações de segurança de conteúdo  

Isto proporciona uma defesa robusta contra:  
- Ataques de injeção de prompts  
- Tentativas de envenenamento de ferramentas  
- Exfiltração de dados através de entradas maliciosas  
- Geração de conteúdo prejudicial  

## Melhores Práticas para a Integração com Azure Content Safety

1. **Listas de Bloqueio Personalizadas**: Crie listas de bloqueio personalizadas especificamente para padrões de injeção MCP  
2. **Ajuste de Severidade**: Ajuste os limiares de severidade com base no seu caso de uso específico e na tolerância ao risco  
3. **Cobertura Abrangente**: Aplique verificações de segurança de conteúdo a todas as entradas e saídas  
4. **Otimização de Desempenho**: Considere implementar cache para verificações repetidas de segurança de conteúdo  
5. **Mecanismos de Recurso**: Defina comportamentos claros de recurso quando os serviços de segurança de conteúdo estiverem indisponíveis  
6. **Feedback ao Utilizador**: Forneça um feedback claro aos utilizadores quando o conteúdo for bloqueado por questões de segurança  
7. **Melhoria Contínua**: Atualize regularmente as listas de bloqueio e padrões com base em ameaças emergentes  

## Recursos Adicionais

### Orientação de Segurança MCP OWASP
- [Guia de Segurança Azure MCP OWASP](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 completo OWASP MCP com implementação Azure  
- [MCP06 - Injeção de Prompt](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Padrões detalhados de mitigação de injeção de prompt  
- [Workshop MCP Security Summit](https://azure-samples.github.io/sherpa/) - Camp 3 prático: Segurança I/O cobre segurança de conteúdo  

### Documentação Azure
- [Visão Geral do Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Documentação Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Quickstart Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Próximos Passos

- Voltar para: [Visão Geral do Módulo de Segurança](./README.md)  
- Continuar para: [Módulo 3: Introdução](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido utilizando o serviço de tradução automática [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, esteja ciente de que traduções automáticas podem conter erros ou imprecisões. O documento original na sua língua nativa deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas resultantes da utilização desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->