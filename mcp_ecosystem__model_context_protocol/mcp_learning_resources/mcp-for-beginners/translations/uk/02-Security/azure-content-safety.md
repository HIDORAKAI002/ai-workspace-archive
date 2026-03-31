# Розширений захист MCP за допомогою Azure Content Safety

> **Виправлена загроза MCP від OWASP**: [MCP06 - Ін’єкції в підказки через контекстні навантаження](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Azure Content Safety пропонує кілька потужних інструментів, які можуть посилити безпеку ваших реалізацій MCP. Для практичного досвіду впровадження див. [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Camp 3: I/O Security.

## Захист підказок

AI Prompt Shields від Microsoft забезпечують надійний захист від прямих та непрямих атак ін’єкції в підказки за допомогою:

1. **Розвиненого виявлення**: Використовує машинне навчання для ідентифікації шкідливих інструкцій, вбудованих у контент.
2. **Виокремлення**: Трансформує вхідний текст, допомагаючи AI-системам розрізняти дійсні інструкції та зовнішній ввід.
3. **Роздільників і маркування даних**: Позначає межі між довіреними та недовіреними даними.
4. **Інтеграції з Content Safety**: Працює з Azure AI Content Safety для виявлення спроб «виходу з-під контролю» (jailbreak) та небезпечного контенту.
5. **Безперервних оновлень**: Microsoft регулярно оновлює механізми захисту від нових загроз.

## Впровадження Azure Content Safety з MCP

Цей підхід забезпечує багаторівневий захист:
- Сканування вхідних даних до обробки
- Перевірка вихідних даних перед поверненням
- Використання чорних списків для відомих шкідливих зразків
- Використання моделей безпеки контенту Azure, які постійно оновлюються

## Ресурси Azure Content Safety

Щоб дізнатися більше про впровадження Azure Content Safety з вашими серверами MCP, зверніться до цих офіційних ресурсів:

1. [Azure AI Content Safety Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/) - Офіційна документація Azure Content Safety.
2. [Prompt Shield Documentation](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/prompt-shield) - Дізнайтеся, як запобігти атакам ін’єкції в підказки.
3. [Content Safety API Reference](https://learn.microsoft.com/rest/api/contentsafety/) - Детальна документація API для реалізації Content Safety.
4. [Quickstart: Azure Content Safety with C#](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-csharp) - Швидкий старт впровадження з використанням C#.
5. [Content Safety Client Libraries](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-client-libraries-rest-api) - Клієнтські бібліотеки для різних мов програмування.
6. [Detecting Jailbreak Attempts](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection) - Конкретні вказівки щодо виявлення та запобігання спробам виходу з-під контролю.
7. [Best Practices for Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/best-practices) - Кращі практики для ефективного впровадження безпеки контенту.

Для детального впровадження дивіться наш [Azure Content Safety Implementation guide](./azure-content-safety-implementation.md).

## Що далі

- Читати: [Azure Content Safety Implementation](./azure-content-safety-implementation.md)
- Повернутися до: [Security Module Overview](./README.md)
- Продовжити: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу автоматичного перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується звертатися до професійного людського перекладу. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, які можуть виникнути внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->