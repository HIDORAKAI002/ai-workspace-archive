```mermaid
sequenceDiagram
    actor User
    participant WebApp as Веб-додаток<br/>(ContentSafetyController)
    participant SafetyService as Служба безпеки контенту
    participant AzureAPI as Azure Content Safety API
    participant LangChain as LangChain4j
    participant McpClient as MCP Клієнт
    participant McpServer as MCP Сервер калькулятора<br/>(Порт 8080)
    participant CalcService as Служба калькулятора

    %% Взаємодія з користувачем
    User->>WebApp: Введіть запит на обчислення
    WebApp->>WebApp: Створити PromptRequest

    %% Перевірка безпеки контенту
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyzeTextResult
    SafetyService->>SafetyService: Перевірити, чи контент безпечний<br/>(ступінь серйозності < 2 для всіх категорій)

    %% Потік обробки – безпечний контент
    alt Контент безпечний
        SafetyService->>LangChain: Передати запит у Bot.chat()
        LangChain->>McpClient: Обробити запит
        McpClient->>McpServer: Виклик відповідного інструмента калькулятора через SSE
        McpServer->>CalcService: Виконати обчислення<br/>(додати, відняти, множити тощо)
        CalcService-->>McpServer: Результат обчислення
        McpServer-->>McpClient: Результат виконання інструмента
        McpClient-->>LangChain: Результат інструмента
        LangChain-->>SafetyService: Відповідь бота
        SafetyService-->>WebApp: Повернути карту результатів<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Відобразити результат обчислення та інформацію про безпеку
    else Контент небезпечний
        SafetyService-->>WebApp: Повернути карту результатів<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Відобразити попередження про безпеку<br/>(без обчислення)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->