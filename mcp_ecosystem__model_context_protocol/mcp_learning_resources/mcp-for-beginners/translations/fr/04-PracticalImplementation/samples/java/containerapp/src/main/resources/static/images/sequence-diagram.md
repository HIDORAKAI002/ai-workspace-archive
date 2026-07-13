```mermaid
sequenceDiagram
    actor User
    participant WebApp as Application Web<br/>(ContentSafetyController)
    participant SafetyService as Service de sécurité du contenu
    participant AzureAPI as API Azure Content Safety
    participant LangChain as LangChain4j
    participant McpClient as Client MCP
    participant McpServer as Serveur calculateur MCP<br/>(Port 8080)
    participant CalcService as Service de calcul

    %% Interaction utilisateur
    User->>WebApp: Saisir la requête de calcul
    WebApp->>WebApp: Créer PromptRequest

    %% Vérification de la sécurité du contenu
    WebApp->>SafetyService: processPrompt(prompt)
    SafetyService->>AzureAPI: analyzeText(prompt)
    AzureAPI-->>SafetyService: AnalyseTextResult
    SafetyService->>SafetyService: Vérifier si le contenu est sûr<br/>(gravité < 2 pour toutes les catégories)

    %% Flux de traitement - Contenu sûr
    alt Le contenu est sûr
        SafetyService->>LangChain: Transmettre la requête à Bot.chat()
        LangChain->>McpClient: Traiter la requête
        McpClient->>McpServer: Appeler l'outil calculateur approprié via SSE
        McpServer->>CalcService: Exécuter le calcul<br/>(addition, soustraction, multiplication, etc.)
        CalcService-->>McpServer: Résultat du calcul
        McpServer-->>McpClient: Résultat de l'exécution de l'outil
        McpClient-->>LangChain: Résultat de l'outil
        LangChain-->>SafetyService: Réponse du bot
        SafetyService-->>WebApp: Retourner la carte des résultats<br/>{isSafe: "true", botResponse: result, safetyResult: details}
        WebApp-->>User: Afficher le résultat du calcul et les informations de sécurité
    else Le contenu n'est pas sûr
        SafetyService-->>WebApp: Retourner la carte des résultats<br/>{isSafe: "false", safetyResult: details}
        WebApp-->>User: Afficher l'avertissement de sécurité<br/>(sans calcul)
    end
```

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Avertissement** :
Ce document a été traduit à l'aide du service de traduction automatique [Co-op Translator](https://github.com/Azure/co-op-translator). Bien que nous nous efforçions d'assurer l'exactitude, veuillez noter que les traductions automatisées peuvent contenir des erreurs ou des inexactitudes. Le document original dans sa langue native doit être considéré comme la source faisant autorité. Pour les informations critiques, il est recommandé de recourir à une traduction professionnelle réalisée par un humain. Nous ne saurions être tenus responsables des malentendus ou erreurs d'interprétation découlant de l'utilisation de cette traduction.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->