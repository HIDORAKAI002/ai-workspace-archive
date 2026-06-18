# 🌟 Уроки від ранніх користувачів

[![Lessons from MCP Early Adopters](../../../translated_images/uk/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Клацніть на зображення вище, щоб переглянути відео цього уроку)_

## 🎯 Що охоплює цей модуль

Цей модуль досліджує, як реальні організації та розробники використовують Протокол Контексту Моделі (MCP) для розв’язання реальних задач і впровадження інновацій. Через детальні кейси, практичні проекти й приклади ви дізнаєтеся, як MCP забезпечує безпечну, масштабовану інтеграцію штучного інтелекту, що з’єднує мовні моделі, інструменти та корпоративні дані.

### 📚 Побачте MCP у дії

Хочете побачити ці принципи у готових до виробництва інструментах? Ознайомтеся з нашим [**10 серверів MCP Microsoft, що змінюють продуктивність розробників**](microsoft-mcp-servers.md), у яких представлені реальні сервери MCP від Microsoft, доступні для використання сьогодні.

## Огляд

Цей урок досліджує, як ранні користувачі застосували Protocol Context Model (MCP) для розв’язання реальних викликів і впровадження інновацій у різних галузях. Через детальні кейси та практичні проекти ви побачите, як MCP дозволяє стандартизовану, безпечну та масштабовану інтеграцію ШІ — поєднуючи великі мовні моделі, інструменти й корпоративні дані в уніфікованій системі. Ви отримаєте практичний досвід у проєктуванні та створенні рішень на базі MCP, дізнаєтеся перевірені моделі впровадження та найкращі практики розгортання MCP у виробничому середовищі. Урок також висвітлює новітні тенденції, майбутні напрямки розвитку та відкриті ресурси з відкритим кодом, щоб допомогти залишатися на передовій технології MCP і її екосистеми.

## Навчальні цілі

- Аналізувати реальні впровадження MCP у різних галузях
- Проєктувати та створювати повні додатки на основі MCP
- Досліджувати новітні тенденції та майбутні напрямки розвитку MCP
- Застосовувати найкращі практики у реальних сценаріях розробки

## Реальні впровадження MCP

### Кейc 1: Автоматизація служби підтримки клієнтів підприємства

Міжнародна корпорація впровадила рішення на базі MCP, щоб стандартизувати взаємодію зі ШІ у їхніх системах підтримки клієнтів. Це дозволило їм:

- Створити уніфікований інтерфейс для кількох постачальників LLM
- Підтримувати послідовне керування запитами у різних відділах
- Впровадити надійний контроль безпеки та відповідності
- Легко переключатися між різними моделями ШІ залежно від потреб

**Технічна реалізація:**

```python
# Реалізація сервера Python MCP для підтримки клієнтів
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Налаштування логування
logging.basicConfig(level=logging.INFO)

async def main():
    # Створення конфігурації сервера
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Ініціалізація сервера MCP
    server = create_server(config)
    
    # Реєстрація ресурсів бази знань
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Реєстрація шаблонів підказок
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Реєстрація інструментів підтримки
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Запуск сервера з HTTP транспортом
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Результати:** Зниження витрат на моделі на 30%, покращення послідовності відповідей на 45%, підвищення відповідності в глобальних операціях.

### Кейc 2: Помічник діагностики в охороні здоров’я

Постачальник медичних послуг створив інфраструктуру MCP для інтеграції декількох спеціалізованих медичних моделей ШІ при забезпеченні захисту чутливих даних пацієнтів:

- Безперебійне перемикання між загальними і спеціалізованими медичними моделями
- Строгий контроль конфіденційності та ведення аудиту
- Інтеграція з існуючими системами електронних медичних записів (EHR)
- Послідовне створення запитів для медичної термінології

**Технічна реалізація:**

```csharp
// C# MCP host application implementation in healthcare application
using Microsoft.Extensions.DependencyInjection;
using ModelContextProtocol.SDK.Client;
using ModelContextProtocol.SDK.Security;
using ModelContextProtocol.SDK.Resources;

public class DiagnosticAssistant
{
    private readonly MCPHostClient _mcpClient;
    private readonly PatientContext _patientContext;
    
    public DiagnosticAssistant(PatientContext patientContext)
    {
        _patientContext = patientContext;
        
        // Configure MCP client with healthcare-specific settings
        var clientOptions = new ClientOptions
        {
            Name = "Healthcare Diagnostic Assistant",
            Version = "1.0.0",
            Security = new SecurityOptions
            {
                Encryption = EncryptionLevel.Medical,
                AuditEnabled = true
            }
        };
        
        _mcpClient = new MCPHostClientBuilder()
            .WithOptions(clientOptions)
            .WithTransport(new HttpTransport("https://healthcare-mcp.example.org"))
            .WithAuthentication(new HIPAACompliantAuthProvider())
            .Build();
    }
    
    public async Task<DiagnosticSuggestion> GetDiagnosticAssistance(
        string symptoms, string patientHistory)
    {
        // Create request with appropriate resources and tool access
        var resourceRequest = new ResourceRequest
        {
            Name = "patient_records",
            Parameters = new Dictionary<string, object>
            {
                ["patientId"] = _patientContext.PatientId,
                ["requestingProvider"] = _patientContext.ProviderId
            }
        };
        
        // Request diagnostic assistance using appropriate prompt
        var response = await _mcpClient.SendPromptRequestAsync(
            promptName: "diagnostic_assistance",
            parameters: new Dictionary<string, object>
            {
                ["symptoms"] = symptoms,
                patientHistory = patientHistory,
                relevantGuidelines = _patientContext.GetRelevantGuidelines()
            });
            
        return DiagnosticSuggestion.FromMCPResponse(response);
    }
}
```
  
**Результати:** Покращені діагностичні пропозиції для лікарів при повній відповідності HIPAA та значному зниженні необхідності перемикання контекстів між системами.

### Кейc 3: Аналіз ризиків у фінансових послугах

Фінансова установа впровадила MCP для стандартизації процесів аналізу ризиків по різних відділах:

- Створила уніфікований інтерфейс для моделей кредитного ризику, виявлення шахрайства та інвестиційних ризиків
- Впровадила жорсткий контроль доступу та версіонування моделей
- Забезпечила аудиту всіх рекомендацій штучного інтелекту
- Підтримувала послідовне форматування даних у різноманітних системах

**Технічна реалізація:**

```java
// Java MCP сервер для оцінки фінансових ризиків
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Створити MCP сервер з функціями фінансової відповідності
        MCPServer server = new MCPServerBuilder()
            .withModelProviders(
                new ModelProvider("risk-assessment-primary", new AzureOpenAIProvider()),
                new ModelProvider("risk-assessment-audit", new LocalLlamaProvider())
            )
            .withPromptTemplateDirectory("./compliance/templates")
            .withAccessControls(new SOCCompliantAccessControl())
            .withDataEncryption(EncryptionStandard.FINANCIAL_GRADE)
            .withVersionControl(true)
            .withAuditLogging(new DatabaseAuditLogger())
            .build();
            
        server.addRequestValidator(new FinancialDataValidator());
        server.addResponseFilter(new PII_RedactionFilter());
        
        server.start(9000);
        
        System.out.println("Financial Risk MCP Server running on port 9000");
    }
}
```
  
**Результати:** Підвищена регуляторна відповідність, на 40% швидші цикли розгортання моделей, покращена послідовність оцінки ризиків у відділах.

### Кейc 4: Сервер Microsoft Playwright MCP для автоматизації браузера

Microsoft розробила [сервер Playwright MCP](https://github.com/microsoft/playwright-mcp) для забезпечення безпечної, стандартизованої автоматизації браузера за допомогою Протоколу Контексту Моделі. Цей готовий до виробництва сервер дозволяє агентам ШІ та LLM взаємодіяти з веб-браузерами контрольовано, піддаючись аудиту та маючи можливості розширення — що відкриває сценарії автоматизованого веб-тестування, вилучення даних та повних робочих процесів.

> **🎯 Готовий до виробництва інструмент**  
>   
> Цей кейс демонструє реальний сервер MCP, яким ви можете користуватися вже сьогодні! Дізнайтеся більше про Playwright MCP Server та 9 інших виробничих серверів MCP від Microsoft у нашому [**Посібнику серверів MCP Microsoft**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Основні характеристики:**  
- Надає можливості автоматизації браузера (навігація, заповнення форм, знімки екрана тощо) як інструменти MCP  
- Впроваджує жорсткий контроль доступу та ізоляцію для запобігання несанкціонованим діям  
- Забезпечує детальні журнали аудиту всіх взаємодій із браузером  
- Підтримує інтеграцію з Azure OpenAI та іншими постачальниками LLM для автоматизації на основі агентів  
- Живить агента кодування GitHub Copilot із можливістю роботи з веб-браузером  

**Технічна реалізація:**

```typescript
// TypeScript: Реєстрація інструментів автоматизації браузера Playwright на сервері MCP
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Зареєструвати інструмент для переходу за URL та захоплення скріншота
server.tools.register(
  new ToolDefinition({
    name: 'navigate_and_screenshot',
    description: 'Navigate to a URL and capture a screenshot',
    parameters: {
      url: { type: 'string', description: 'The URL to visit' }
    }
  }),
  async ({ url }) => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    return { screenshot };
  }
);

// Запустити сервер MCP
server.listen(8080);
```
  
**Результати:**  

- Забезпечення безпечної програмної автоматизації браузера для агентів ШІ та LLM  
- Зниження ручного тестування та покращення покриття тестами для веб-застосунків  
- Надає багаторазову, розширювану платформу для інтеграції браузерних інструментів у корпоративному середовищі  
- Живить можливості веб-перегляду GitHub Copilot

**Посилання:**  

- [Репозиторій Playwright MCP Server на GitHub](https://github.com/microsoft/playwright-mcp)  
- [Штучний інтелект і рішення для автоматизації Microsoft](https://azure.microsoft.com/en-us/products/ai-services/)

### Кейc 5: Azure MCP – Протокол Контексту Моделі корпоративного класу як сервіс

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) — це кероване, корпоративного класу впровадження Протоколу Контексту Моделі від Microsoft, розроблене для надання масштабованих, безпечних і відповідних стандартам можливостей серверу MCP як хмарної послуги. Azure MCP дозволяє організаціям швидко розгортати, керувати та інтегрувати сервери MCP з Azure AI, даними та безпекою, знижуючи операційні витрати й пришвидшуючи впровадження ШІ.

> **🎯 Готовий до виробництва інструмент**  
>   
> Це реальний сервер MCP, який ви можете використовувати сьогодні! Дізнайтеся більше про Microsoft Foundry MCP Server у нашому [**Посібнику серверів MCP Microsoft**](microsoft-mcp-servers.md).

- Повністю керований хостинг серверу MCP з вбудованим масштабуванням, моніторингом і безпекою  
- Рідна інтеграція з Azure OpenAI, Azure AI Search та іншими сервісами Azure  
- Корпоративна автентифікація та авторизація через Microsoft Entra ID  
- Підтримка користувацьких інструментів, шаблонів запитів і конекторів ресурсів  
- Відповідність корпоративним стандартам безпеки та регуляторним вимогам  

**Технічна реалізація:**

```yaml
# Example: Azure MCP server deployment configuration (YAML)
apiVersion: mcp.microsoft.com/v1
kind: McpServer
metadata:
  name: enterprise-mcp-server
spec:
  modelProviders:
    - name: azure-openai
      type: AzureOpenAI
      endpoint: https://<your-openai-resource>.openai.azure.com/
      apiKeySecret: <your-azure-keyvault-secret>
  tools:
    - name: document_search
      type: AzureAISearch
      endpoint: https://<your-search-resource>.search.windows.net/
      apiKeySecret: <your-azure-keyvault-secret>
  authentication:
    type: EntraID
    tenantId: <your-tenant-id>
  monitoring:
    enabled: true
    logAnalyticsWorkspace: <your-log-analytics-id>
```
  
**Результати:**  
- Скорочення часу виходу на ринок для корпоративних проєктів ШІ завдяки готовій до використання та сумісній платформі сервера MCP  
- Спрощена інтеграція LLM, інструментів та корпоративних джерел даних  
- Підвищена безпека, спостережливість та операційна ефективність робочих навантажень MCP  
- Покращена якість коду за рахунок найкращих практик Azure SDK та сучасних шаблонів автентифікації  

**Посилання:**  
- [Документація Azure MCP](https://aka.ms/azmcp)  
- [Репозиторій Azure MCP Server на GitHub](https://github.com/Azure/azure-mcp)  
- [Сервіси Azure AI](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP Center](https://mcp.azure.com)

## Кейc 6: NLWeb  
MCP (Протокол Контексту Моделі) — це новітній протокол для чатботів і асистентів ШІ для взаємодії з інструментами. Кожен екземпляр NLWeb також є сервером MCP, що підтримує один основний метод ask, який використовується для запитів до вебсайту природною мовою. Повернена відповідь використовує schema.org — широко поширену словникову базу для опису веб-даних. Спрощено кажучи, MCP для NLWeb, як HTTP для HTML. NLWeb поєднує протоколи, формати Schema.org і приклади коду, щоб допомогти сайтам швидко створювати такі кінцеві точки, які корисні як людям через розмовні інтерфейси, так і машинам через природну взаємодію агентів.

Є два окремі компоненти NLWeb.  
- Протокол, дуже простий для початку, для інтерфейсу з сайтом природною мовою та форматом, що використовує json та schema.org для відповіді. Детальніше див. документацію REST API.  
- Проста реалізація (пункт 1), що використовує наявну розмітку, для сайтів, які можна відобразити як списки об’єктів (продукти, рецепти, пам’ятки, відгуки тощо). Разом із набором віджетів інтерфейсу користувача сайти можуть легко надати розмовні інтерфейси до свого контенту. Детальніше див. документацію Life of a chat query.

**Посилання:**  
- [Документація Azure MCP](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Кейc 7: Microsoft Foundry MCP Server – інтеграція корпоративних агентів ШІ

Сервери Microsoft Foundry MCP демонструють, як MCP можна використовувати для оркестрації й керування агентами ШІ та робочими процесами у корпоративних середовищах. Інтегруючи MCP з Microsoft Foundry, організації можуть стандартизувати взаємодію агентів, використовувати менеджмент робочих процесів Foundry та забезпечувати безпечні, масштабовані розгортання.

> **🎯 Готовий до виробництва інструмент**  
>   
> Це реальний сервер MCP, який ви можете використовувати вже сьогодні! Дізнайтеся більше про Microsoft Foundry MCP Server у нашому [**Посібнику серверів MCP Microsoft**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Основні характеристики:**  
- Повний доступ до екосистеми AI Azure, включно з каталогами моделей та управлінням розгортаннями  
- Індексація знань із Azure AI Search для застосунків RAG  
- Інструменти оцінки продуктивності моделей ШІ та контролю якості  
- Інтеграція з каталогом і лабораторіями Microsoft Foundry для передових дослідницьких моделей  
- Керування агентами та їх оцінка для виробничих сценаріїв  

**Результати:**  
- Швидке прототипування та надійний моніторинг робочих процесів агентів ШІ  
- Безшовна інтеграція зі службами Azure AI для складних сценаріїв  
- Уніфікований інтерфейс для створення, розгортання та моніторингу конвеєрів агентів  
- Підвищена безпека, відповідність та операційна ефективність для підприємств  
- Прискорене впровадження ШІ при збереженні контролю над складними процесами на базі агентів  

**Посилання:**  
- [Репозиторій Microsoft Foundry MCP Server на GitHub](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Інтеграція агентів Azure AI з MCP (блог Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Кейc 8: Foundry MCP Playground – експерименти та прототипування

Foundry MCP Playground пропонує готове середовище для експериментів із серверами MCP і інтеграціями Microsoft Foundry. Розробники можуть швидко робити прототипи, тестувати та оцінювати моделі ШІ і робочі процеси агентів, використовуючи ресурси каталогу й лабораторій Microsoft Foundry. Плейграунд спрощує налаштування, надає приклади проєктів і підтримує спільну розробку, що дозволяє легко вивчати найкращі практики й нові сценарії з мінімальними витратами. Він особливо корисний для команд, що хочуть перевіряти ідеї, ділитися експериментами і пришвидшувати навчання без складної інфраструктури. Зниження бар’єрів допомагає стимулювати інновації та внески спільноти в екосистему MCP і Microsoft Foundry.

**Посилання:**  

- [Репозиторій Foundry MCP Playground на GitHub](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Кейc 9: Сервер Microsoft Learn Docs MCP – доступ до документації зі ШІ

Сервер Microsoft Learn Docs MCP — це хмарний сервіс, який надає помічникам ШІ доступ у режимі реального часу до офіційної документації Microsoft через Protocol Context Model. Цей готовий до використання сервер підключається до повної екосистеми Microsoft Learn і забезпечує семантичний пошук за всіма офіційними джерелами Microsoft.

> **🎯 Готовий до виробництва інструмент**  
>   
> Це реальний сервер MCP, яким ви можете користуватися вже сьогодні! Дізнайтеся більше про Microsoft Learn Docs MCP Server у нашому [**Посібнику серверів MCP Microsoft**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Основні характеристики:**  
- Доступ у режимі реального часу до офіційної документації Microsoft, документації Azure та Microsoft 365  
- Розвинені можливості семантичного пошуку, що розуміють контекст і наміри  
- Інформація завжди актуальна, оскільки контент Microsoft Learn постійно оновлюється  
- Повне охоплення Microsoft Learn, документації Azure і джерел Microsoft 365  
- Повертає до 10 одиниць відповідного контенту з заголовками статей і URL  

**Чому це важливо:**  
- Вирішує проблему застарілих знань ШІ щодо технологій Microsoft  
- Гарантує, що помічники ШІ мають доступ до найновіших функцій .NET, C#, Azure і Microsoft 365  
- Забезпечує авторитетну першу руку інформацію для точного генерування коду  
- Необхідно для розробників, що працюють із швидкозмінними технологіями Microsoft  

**Результати:**  
- Значне підвищення точності коду, створеного ШІ для технологій Microsoft  
- Скорочення часу на пошук актуальної документації і найкращих практик  
- Покращення продуктивності розробників завдяки контекстно-залежному пошуку документації  
- Безшовна інтеграція в робочі процеси розробки без виходу з IDE  

**Посилання:**  
- [Репозиторій Microsoft Learn Docs MCP Server на GitHub](https://github.com/MicrosoftDocs/mcp)  
- [Документація Microsoft Learn](https://learn.microsoft.com/)

## Практичні проекти

### Проєкт 1: Створіть багатопровайдерський сервер MCP

**Мета:** Створити сервер MCP, який може перенаправляти запити до кількох постачальників моделей ШІ на основі певних критеріїв.

**Вимоги:**

- Підтримка принаймні трьох різних провайдерів моделей (наприклад, OpenAI, Anthropic, локальні моделі)  
- Реалізація механізму маршрутизації на основі метаданих запиту  
- Створення системи конфігурації для керування обліковими даними провайдерів  
- Додавання кешування для оптимізації продуктивності та зниження витрат  
- Розробка простого дашборда для моніторингу використання  

**Кроки реалізації:**  

1. Налаштувати базову інфраструктуру сервера MCP  
2. Реалізувати адаптери провайдерів для кожного сервісу моделей ШІ  
3. Створити логіку маршрутизації на основі атрибутів запиту  
4. Додати механізми кешування для частих запитів  
5. Розробити дашборд моніторингу  
6. Протестувати з різними сценаріями запитів  

**Технології:** Оберіть із Python (.NET/Java/Python на ваш вибір), Redis для кешування та простий веб-фреймворк для дашборда.

### Проєкт 2: Корпоративна система керування запитами

**Мета:** Розробити систему на базі MCP для керування, версіонування та розгортання шаблонів запитів у межах організації.

**Вимоги:**
- Створити централізований репозиторій для шаблонів запитів
- Впровадити версіонування та робочі процеси затвердження
- Побудувати можливості тестування шаблонів із використанням зразкових вхідних даних
- Розробити контроль доступу на основі ролей
- Створити API для отримання та розгортання шаблонів

**Кроки реалізації:**

1. Спроєктувати схему бази даних для зберігання шаблонів
2. Створити основний API для операцій CRUD із шаблонами
3. Впровадити систему версіонування
4. Побудувати робочий процес затвердження
5. Розробити фреймворк для тестування
6. Створити простий веб-інтерфейс для управління
7. Інтегрувати з MCP сервером

**Технології:** Ваш вибір бекенд-фреймворку, SQL або NoSQL бази даних та фронтенд-фреймворку для інтерфейсу управління.

### Проєкт 3: Платформа генерації контенту на базі MCP

**Мета:** Побудувати платформу генерації контенту, що використовує MCP для забезпечення послідовних результатів у різних типах контенту.

**Вимоги:**

- Підтримка кількох форматів контенту (блог-пости, соціальні мережі, маркетингові тексти)
- Впровадження генерації на основі шаблонів з можливістю налаштування
- Створення системи перегляду контенту та зворотного зв’язку
- Відстеження показників ефективності контенту
- Підтримка версіонування та ітерації контенту

**Кроки реалізації:**

1. Налаштувати інфраструктуру клієнта MCP
2. Створити шаблони для різних типів контенту
3. Побудувати конвеєр генерації контенту
4. Впровадити систему перегляду
5. Розробити систему відстеження показників
6. Створити користувацький інтерфейс для управління шаблонами та генерації контенту

**Технології:** Обрана вами мова програмування, веб-фреймворк та система баз даних.

## Майбутні напрямки розвитку технології MCP

### Нові тенденції

1. **Мультимодальний MCP**
   - Розширення MCP для стандартизації взаємодії з моделями зображень, аудіо та відео
   - Розробка можливостей крос-модального розуміння
   - Стандартизовані формати запитів для різних модальностей

2. **Федеративна інфраструктура MCP**
   - Розподілені мережі MCP, які можуть ділитися ресурсами між організаціями
   - Стандартизовані протоколи для безпечного спільного використання моделей
   - Техніки обчислень із збереженням конфіденційності

3. **Маркетплейси MCP**
   - Екосистеми для обміну та монетизації шаблонів і плагінів MCP
   - Процеси забезпечення якості та сертифікації
   - Інтеграція з маркетплейсами моделей

4. **MCP для краєвих обчислень**
   - Адаптація стандартів MCP для ресурсозалежних пристроїв на краю мережі
   - Оптимізовані протоколи для середовищ із низькою пропускною здатністю
   - Спеціалізовані реалізації MCP для екосистем Інтернету речей (IoT)

5. **Регуляторні рамки**
   - Розробка розширень MCP для відповідності нормативам
   - Стандартизовані аудиторські журнали та інтерфейси пояснюваності
   - Інтеграція з новими рамками управління ШІ

### Рішення MCP від Microsoft

Microsoft та Azure розробили кілька відкритих репозиторіїв для допомоги розробникам під час впровадження MCP у різних сценаріях:

#### Організація Microsoft

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) — MCP сервер Playwright для автоматизації браузера та тестування
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) — Реалізація MCP сервера для OneDrive для локального тестування та внеску спільноти
3. [NLWeb](https://github.com/microsoft/NlWeb) — NLWeb є колекцією відкритих протоколів і пов’язаних інструментів з відкритим кодом. Його основна мета — створити базовий шар для AI Web

#### Організація Azure-Samples

1. [mcp](https://github.com/Azure-Samples/mcp) — Посилання на приклади, інструменти та ресурси для побудови і інтеграції MCP серверів на Azure з використанням різних мов
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) — Репозитарій прикладів MCP серверів із демонстрацією аутентифікації за поточною специфікацією Model Context Protocol
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) — Лендінг-пейдж для реалізацій віддалених MCP серверів в Azure Functions з посиланнями на репозиторії мов
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) — Шаблон швидкого початку для створення і розгортання кастомних віддалених MCP серверів із Azure Functions на Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) — Шаблон швидкого початку для створення і розгортання кастомних віддалених MCP серверів із Azure Functions на .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) — Шаблон швидкого початку для створення і розгортання кастомних віддалених MCP серверів із Azure Functions на TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) — Azure API Management як AI Gateway до віддалених MCP серверів на Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) — Експерименти APIM ❤️ AI, включаючи можливості MCP, інтеграція з Azure OpenAI та AI Foundry

Ці репозиторії надають різні реалізації, шаблони та ресурси для роботи з Model Context Protocol у різних мовах програмування та сервісах Azure. Вони охоплюють широкий спектр випадків використання від базових реалізацій серверів до аутентифікації, хмарного розгортання та корпоративної інтеграції.

#### Каталог ресурсів MCP

[Каталог ресурсів MCP](https://github.com/microsoft/mcp/tree/main/Resources) в офіційному репозиторії Microsoft MCP надає відбірку зразкових ресурсів, шаблонів запитів та визначень інструментів для використання з MCP серверами. Цей каталог допомагає розробникам швидко розпочати роботу з MCP, пропонуючи багаторазові будівельні блоки та приклади найкращих практик для:

- **Шаблонів Запитів:** Готові до використання шаблони для типових завдань ШІ та сценаріїв, які можна адаптувати для власних MCP серверів.
- **Визначень Інструментів:** Приклади схем інструментів і метаданих для стандартизації інтеграції та виклику інструментів серед різних MCP серверів.
- **Прикладних Ресурсів:** Визначення ресурсів для підключення до джерел даних, API і зовнішніх сервісів у межах фреймворку MCP.
- **Референсних Реалізацій:** Практичні приклади структурування і організації ресурсів, запитів і інструментів у реальних MCP проєктах.

Ці ресурси прискорюють розробку, сприяють стандартизації і допомагають гарантувати найкращі практики під час створення і розгортання рішень на основі MCP.

#### Каталог ресурсів MCP

- [Ресурси MCP (зразкові запити, інструменти та визначення ресурсів)](https://github.com/microsoft/mcp/tree/main/Resources)

### Можливості для досліджень

- Ефективні технології оптимізації запитів у рамках MCP
- Моделі безпеки для багатокористувацьких MCP розгортань
- Бенчмаркінг продуктивності різних MCP реалізацій
- Методи формальної верифікації MCP серверів

## Висновок

Model Context Protocol (MCP) швидко формує майбутнє стандартизованої, безпечної та сумісної інтеграції ШІ у різних галузях. Через кейси та практичні проєкти цього уроку ви побачили, як ранні користувачі — зокрема Microsoft та Azure — застосовують MCP для вирішення реальних задач, прискорення впровадження ШІ та забезпечення відповідності, безпеки й масштабованості. Модульний підхід MCP дає змогу організаціям поєднувати великі мовні моделі, інструменти та корпоративні дані в єдине, аудиторське середовище. Оскільки MCP продовжує розвиватися, залученість до спільноти, вивчення відкритих ресурсів і впровадження найкращих практик будуть ключем до створення надійних, готових до майбутнього рішень ШІ.

## Додаткові ресурси

- [Репозиторій Foundry MCP на GitHub](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Інтеграція Azure AI агентів із MCP (блог Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [Репозиторій MCP на GitHub (Microsoft)](https://github.com/microsoft/mcp)
- [Каталог ресурсів MCP (зразкові запити, інструменти та визначення ресурсів)](https://github.com/microsoft/mcp/tree/main/Resources)
- [Спільнота MCP та документація](https://modelcontextprotocol.io/introduction)
- [Специфікація MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Документація Azure MCP](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) — найкращі практики безпеки
- [Playwright MCP Server на GitHub](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Рішення Майкрософт з ШІ та автоматизації](https://azure.microsoft.com/en-us/products/ai-services/)

## Вправи

1. Проаналізуйте один з кейсів і запропонуйте альтернативний підхід до реалізації.
2. Оберіть одну з ідей проєктів і створіть детальну технічну специфікацію.
3. Вивчіть галузь, не розглянуту у кейсах, і опишіть, як MCP може вирішити її конкретні проблеми.
4. Дослідіть один з майбутніх напрямів і розробіть концепцію нового розширення MCP для його підтримки.

## Що далі

Дізнайтеся більше: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

Продовжити до: [Модуль 8: Найкращі практики](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Відмова від відповідальності**:
Цей документ було перекладено за допомогою сервісу штучного інтелекту для перекладу [Co-op Translator](https://github.com/Azure/co-op-translator). Хоча ми прагнемо до точності, будь ласка, майте на увазі, що автоматичні переклади можуть містити помилки або неточності. Оригінальний документ рідною мовою слід вважати авторитетним джерелом. Для критично важливої інформації рекомендується професійний людський переклад. Ми не несемо відповідальності за будь-які непорозуміння або неправильні тлумачення, що виникли внаслідок використання цього перекладу.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->