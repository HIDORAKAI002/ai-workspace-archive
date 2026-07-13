```mermaid
sequenceDiagram
    actor User
    participant WebApp as Aplicación Web<br/>(ContentSafetyController)
    participant SafetyService as Servicio de Seguridad de Contenido
    participant AzureAPI as API de Seguridad de Contenido de Azure
    participant LangChain as LangChain4j
    participant McpClient as Cliente MCP
    participant McpServer as Servidor Calculador MCP<br/>(Puerto 8080)
    participant CalcService as Servicio de Calculadora

    %% Interacción del Usuario
    User->>WebApp: Introducir solicitud de cálculo
    WebApp->>WebApp: Crear PromptRequest

    %% Comprobación de Seguridad de Contenido
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: Resultado de Análisis de Texto
    SafetyService->>SafetyService: Verificar si el contenido es seguro<br/>(gravedad < 2 para todas las categorías)

    %% Flujo de Procesamiento - Contenido Seguro
    alt El contenido es seguro
        SafetyService->>LangChain: Pasar prompt a Bot.chat()
        LangChain->>McpClient: Procesar solicitud
        McpClient->>McpServer: Llamar a la herramienta calculadora adecuada vía SSE
        McpServer->>CalcService: Ejecutar cálculo<br/>(sumar, restar, multiplicar, etc.)
        CalcService-->>McpServer: Resultado del cálculo
        McpServer-->>McpClient: Resultado de ejecución de la herramienta
        McpClient-->>LangChain: Resultado de herramienta
        LangChain-->>SafetyService: Respuesta del Bot
        SafetyService-->>WebApp: Devolver mapa de resultados<br/>{isSafe: "true", botResponse: resultado, safetyResult: detalles}
        WebApp-->>User: Mostrar resultado del cálculo e información de seguridad
    else El contenido no es seguro
        SafetyService-->>WebApp: Devolver mapa de resultados<br/>{isSafe: "false", safetyResult: detalles}
        WebApp-->>User: Mostrar advertencia de seguridad<br/>(sin cálculo)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Descargo de responsabilidad**:
Este documento ha sido traducido utilizando el servicio de traducción automática [Co-op Translator](https://github.com/Azure/co-op-translator). Aunque nos esforzamos por la precisión, tenga en cuenta que las traducciones automatizadas pueden contener errores o inexactitudes. El documento original en su idioma nativo debe considerarse la fuente autorizada. Para información crítica, se recomienda una traducción profesional humana. No somos responsables de cualquier malentendido o interpretación errónea que surja del uso de esta traducción.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->