# Розширена безпека MCP з Azure Content Safety

> **Вирішена ризик OWASP MCP**: [MCP06 - Підміна потоку намірів](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety надає кілька потужних інструментів, які можуть підвищити безпеку ваших реалізацій MCP. Для практичного досвіду впровадження дивіться [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Захист підказок (Prompt Shields)

AI Prompt Shields від Microsoft забезпечують надійний захист від як прямих, так і непрямих атак підміни підказок за допомогою:

1. **Розширене виявлення**: Використовує машинне навчання для ідентифікації шкідливих інструкцій, вбудованих у вміст.
2. **Підсвічування**: Трансформує вхідний текст, щоб допомогти системам ШІ відрізняти дійсні інструкції від зовнішніх введень.
3. **Роздільники та маркування даних**: Позначає межі між довіреними та недовіреними даними.
4. **Інтеграція Content Safety**: Працює з Azure AI Content Safety для виявлення спроб зламу та шкідливого вмісту.
5. **Постійні оновлення**: Microsoft регулярно оновлює механізми захисту від нових загроз.

## Впровадження Azure Content Safety з MCP

Цей підхід забезпечує багаторівневий захист:
- Сканування вводів перед обробкою
- Перевірка виводів перед поверненням
- Використання блоклистів для відомих шкідливих патернів
- Використання постійно оновлюваних моделей безпеки вмісту Azure

## Ресурси Azure Content Safety

Щоб дізнатися більше про впровадження Azure Content Safety з вашими серверами MCP, ознайомтесь з цими офіційними ресурсами:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Офіційна документація для Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Дізнайтесь, як запобігти атакам підміни підказок.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Детальна API-документація для впровадження Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Швидкий посібник із впровадження з використанням C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Клієнтські бібліотеки для різних мов програмування.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Специфічні рекомендації з виявлення та запобігання спробам зламу.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Кращі практики для ефективного впровадження безпеки вмісту.

Для більш глибокого впровадження дивіться наш [Посібник із впровадження Azure Content Safety](./azure-content-safety-implementation.md).

## Що далі

- Читати: [Впровадження Azure Content Safety](./azure-content-safety-implementation.md)
- Повернутися до: [Огляд модуля безпеки](./README.md)
- Продовжити до: [Модуль 3: Початок роботи](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->