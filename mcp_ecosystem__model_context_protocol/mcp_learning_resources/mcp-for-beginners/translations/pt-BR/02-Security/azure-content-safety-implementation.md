# Implementando Azure Content Safety com MCP

> **Risco MCP abordado pelo OWASP**: [MCP06 - Subversão do Fluxo de Intenção](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Para fortalecer a segurança do MCP contra injeção de prompts, envenenamento de ferramentas e outras vulnerabilidades específicas de IA, a integração do Azure Content Safety é altamente recomendada. Este guia de implementação está alinhado com o [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Acampamento 3: Segurança de E/S.

## Integração com o Servidor MCP

Para integrar o Azure Content Safety ao seu servidor MCP, adicione o filtro de segurança de conteúdo como middleware no seu pipeline de processamento de requisições:

1. Inicialize o filtro durante a inicialização do servidor  
2. Valide todas as requisições de ferramentas recebidas antes do processamento  
3. Verifique todas as respostas enviadas antes de retorná-las aos clientes  
4. Registre e alerte sobre violações de segurança  
5. Implemente tratamento de erros apropriado para verificações de segurança de conteúdo que falhem  

Isso fornece uma defesa robusta contra:  
- Ataques de injeção de prompts  
- Tentativas de envenenamento de ferramentas  
- Exfiltração de dados via entradas maliciosas  
- Geração de conteúdo prejudicial  

## Melhores Práticas para Integração do Azure Content Safety

1. **Listas de Bloqueio Personalizadas**: Crie listas de bloqueio customizadas especificamente para padrões de injeção MCP  
2. **Ajuste de Severidade**: Ajuste os limites de severidade conforme seu caso de uso e tolerância a riscos  
3. **Cobertura Abrangente**: Aplique verificações de segurança de conteúdo a todas as entradas e saídas  
4. **Otimização de Desempenho**: Considere implementar cache para verificações repetidas de segurança de conteúdo  
5. **Mecanismos de Contingência**: Defina comportamentos claros de fallback quando os serviços de segurança de conteúdo estiverem indisponíveis  
6. **Feedback ao Usuário**: Forneça feedback claro aos usuários quando conteúdo for bloqueado por preocupações de segurança  
7. **Melhoria Contínua**: Atualize regularmente as listas de bloqueio e padrões com base em ameaças emergentes  

## Recursos Adicionais

### Orientações de Segurança OWASP MCP
- [Guia de Segurança OWASP MCP Azure](https://microsoft.github.io/mcp-azure-security-guide/) - Top 10 completo OWASP MCP com implementação Azure  
- [MCP06 - Injeção de Prompt](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Padrões detalhados de mitigação de injeção de prompt  
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Acampamento prático 3: Segurança de E/S cobre segurança de conteúdo  

### Documentação do Azure
- [Visão Geral do Azure Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Documentação do Prompt Shields](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Introdução Rápida ao Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Próximos Passos

- Retornar para: [Visão Geral do Módulo de Segurança](./README.md)  
- Continuar para: [Módulo 3: Introdução](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->