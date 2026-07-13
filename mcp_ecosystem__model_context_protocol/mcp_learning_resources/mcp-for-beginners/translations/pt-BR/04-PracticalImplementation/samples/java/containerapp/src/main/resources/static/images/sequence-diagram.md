```mermaid
sequenceDiagram
    actor User
    participant WebApp as Aplicativo Web<br/>(ContentSafetyController)
    participant SafetyService as Serviço de Segurança de Conteúdo
    participant AzureAPI as API de Segurança de Conteúdo Azure
    participant LangChain as LangChain4j
    participant McpClient as Cliente MCP
    participant McpServer as Servidor de Calculadora MCP<br/>(Porta 8080)
    participant CalcService as Serviço de Calculadora

    %% Interação do Usuário
    User->>WebApp: Insira o prompt de cálculo
    WebApp->>WebApp: Criar PromptRequest

    %% Verificação de Segurança de Conteúdo
    WebApp->>SafetyService: processarPrompt(prompt)
    SafetyService->>AzureAPI: analisarTexto(prompt)
    AzureAPI-->>SafetyService: ResultadoAnaliseTexto
    SafetyService->>SafetyService: Verificar se o conteúdo é seguro<br/>(gravidade < 2 para todas as categorias)

    %% Fluxo de Processamento - Conteúdo Seguro
    alt Conteúdo é seguro
        SafetyService->>LangChain: Passar prompt para Bot.chat()
        LangChain->>McpClient: Processar prompt
        McpClient->>McpServer: Chamar a ferramenta de calculadora apropriada via SSE
        McpServer->>CalcService: Executar cálculo<br/>(adicionar, subtrair, multiplicar, etc.)
        CalcService-->>McpServer: Resultado do cálculo
        McpServer-->>McpClient: Resultado da execução da ferramenta
        McpClient-->>LangChain: Resultado da ferramenta
        LangChain-->>SafetyService: Resposta do Bot
        SafetyService-->>WebApp: Retornar mapa de resultado<br/>{isSafe: "true", botResponse: resultado, safetyResult: detalhes}
        WebApp-->>User: Exibir resultado do cálculo e informações de segurança
    else Conteúdo é inseguro
        SafetyService-->>WebApp: Retornar mapa de resultado<br/>{isSafe: "false", safetyResult: detalhes}
        WebApp-->>User: Exibir aviso de segurança<br/>(sem cálculo)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Aviso Legal**:
Este documento foi traduzido usando o serviço de tradução por IA [Co-op Translator](https://github.com/Azure/co-op-translator). Embora nos esforcemos pela precisão, por favor, esteja ciente de que traduções automatizadas podem conter erros ou imprecisões. O documento original em seu idioma nativo deve ser considerado a fonte autorizada. Para informações críticas, recomenda-se tradução profissional humana. Não nos responsabilizamos por quaisquer mal-entendidos ou interpretações incorretas decorrentes do uso desta tradução.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->