# 🌟 Уроки от ранних пользователей

[![Lessons from MCP Early Adopters](../../../translated_images/ru/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Нажмите на изображение выше, чтобы посмотреть видео этого урока)_

## 🎯 Что охватывает этот модуль

В этом модуле рассматривается, как реальные организации и разработчики используют Протокол Контекста Модели (MCP) для решения реальных задач и стимулирования инноваций. Через подробные тематические исследования, практические проекты и примеры вы узнаете, как MCP обеспечивает безопасную, масштабируемую интеграцию ИИ, которая связывает языковые модели, инструменты и корпоративные данные.

### 📚 Посмотрите MCP в действии

Хотите увидеть, как эти принципы применяются в готовых к использованию инструментах? Ознакомьтесь с нашим [**10 серверами MCP от Microsoft, которые меняют продуктивность разработчиков**](microsoft-mcp-servers.md), где представлены реальные серверы MCP Microsoft, которыми вы можете воспользоваться уже сегодня.

## Обзор

Этот урок исследует, как ранние пользователи применили Протокол Контекста Модели (MCP) для решения практических задач и стимулирования инноваций в различных отраслях. Через подробные тематические исследования и практические проекты вы увидите, как MCP обеспечивает стандартизированную, безопасную и масштабируемую интеграцию ИИ — объединяя большие языковые модели, инструменты и корпоративные данные в единую систему. Вы получите практический опыт проектирования и разработки решений на основе MCP, изучите проверенные шаблоны внедрения и узнаете лучшие практики развертывания MCP в производственной среде. Урок также выделяет новые тенденции, направления развития и ресурсы с открытым исходным кодом, которые помогут вам оставаться на переднем крае технологий MCP и его развивающейся экосистемы.

## Цели обучения

- Анализировать реальные реализации MCP в различных отраслях
- Проектировать и создавать полноценные приложения на базе MCP
- Исследовать новые тенденции и направления развития технологии MCP
- Применять лучшие практики в реальных сценариях разработки

## Реальные реализации MCP

### Тематическое исследование 1: Автоматизация поддержки клиентов в корпоративном секторе

Многонациональная корпорация внедрила решение на базе MCP для стандартизации взаимодействий ИИ в системах поддержки клиентов. Это позволило им:

- Создать единый интерфейс для нескольких поставщиков больших языковых моделей (LLM)
- Поддерживать согласованное управление подсказками в разных отделах
- Реализовать надежные меры безопасности и контроля соответствия требованиям
- Легко переключаться между различными ИИ-моделями в зависимости от конкретных задач

**Техническая реализация:**

```python
# Реализация сервера Python MCP для поддержки клиентов
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Настроить логирование
logging.basicConfig(level=logging.INFO)

async def main():
    # Создать конфигурацию сервера
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Инициализировать сервер MCP
    server = create_server(config)
    
    # Зарегистрировать ресурсы базы знаний
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Зарегистрировать шаблоны подсказок
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Зарегистрировать инструменты поддержки
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Запустить сервер с HTTP транспортом
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Результаты:** Сокращение затрат на модели на 30%, повышение согласованности ответов на 45% и улучшение соответствия нормативным требованиям в глобальных операциях.

### Тематическое исследование 2: Диагностический помощник в здравоохранении

Поставщик медицинских услуг разработал инфраструктуру MCP для интеграции нескольких специализированных медицинских моделей ИИ при обеспечении защиты конфиденциальных данных пациентов:

- Плавное переключение между универсальными и специализированными медицинскими моделями
- Строгий контроль конфиденциальности и аудит
- Интеграция с существующими системами электронных медицинских записей (EHR)
- Единообразное создание подсказок для медицинской терминологии

**Техническая реализация:**

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
  
**Результаты:** Улучшенные диагностические рекомендации для врачей при полном соблюдении требований HIPAA и значительном снижении необходимости переключения между системами.

### Тематическое исследование 3: Анализ рисков в финансовых услугах

Финансовое учреждение внедрило MCP для стандартизации процессов анализа рисков в различных департаментах:

- Создан единый интерфейс для моделей анализа кредитных рисков, обнаружения мошенничества и инвестиционных рисков
- Реализован строгий контроль доступа и версионирование моделей
- Обеспечена возможность аудита всех рекомендаций ИИ
- Поддержано единообразное форматирование данных в разных системах

**Техническая реализация:**

```java
// Java MCP сервер для оценки финансовых рисков
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Создать MCP сервер с функциями финансового соответствия
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
  
**Результаты:** Улучшение соответствия нормативным требованиям, ускорение циклов развертывания моделей на 40%, повышение согласованности оценки рисков между отделами.

### Тематическое исследование 4: Сервер Microsoft Playwright MCP для автоматизации браузера

Microsoft разработала [Playwright MCP сервер](https://github.com/microsoft/playwright-mcp), который обеспечивает безопасную и стандартизированную автоматизацию браузера через Протокол Контекста Модели. Этот готовый к производству сервер позволяет ИИ-агентам и LLM взаимодействовать с веб-браузерами в контролируемом, проверяемом и расширяемом формате, что позволяет реализовывать сценарии автоматизированного тестирования сайтов, извлечения данных и полноценных рабочих процессов.

> **🎯 Готовый к производству инструмент**  
>   
> В этом тематическом исследовании представлен реальный MCP сервер, которым вы можете пользоваться уже сегодня! Узнайте больше о Playwright MCP Server и еще 9 других готовых к производству серверах MCP от Microsoft в нашем [**Руководстве по серверам MCP Microsoft**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Ключевые особенности:**  
- Обеспечивает возможности автоматизации браузера (навигация, заполнение форм, создание скриншотов и т.д.) в виде MCP-инструментов  
- Реализует строгий контроль доступа и песочницу для предотвращения несанкционированных действий  
- Предоставляет подробные журналы аудита всех взаимодействий с браузером  
- Поддерживает интеграцию с Azure OpenAI и другими поставщиками LLM для автоматизации через агентов  
- Обеспечивает возможности веб-навигатора для Coding Agent GitHub Copilot

**Техническая реализация:**

```typescript
// TypeScript: Регистрация инструментов автоматизации браузера Playwright в сервере MCP
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Зарегистрировать инструмент для перехода по URL и снятия скриншота
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

// Запустить сервер MCP
server.listen(8080);
```
  
**Результаты:**

- Обеспечена безопасная программируемая автоматизация браузера для ИИ-агентов и LLM  
- Снижены усилия на ручное тестирование и улучшено покрытие тестами веб-приложений  
- Создана многоразовая и расширяемая платформа для интеграции браузерных инструментов в корпоративных средах  
- Обеспечена поддержка веб-навигации для GitHub Copilot

**Ссылки:**  

- [Репозиторий Playwright MCP Server на GitHub](https://github.com/microsoft/playwright-mcp)  
- [Решения Microsoft ИИ и автоматизации](https://azure.microsoft.com/en-us/products/ai-services/)

### Тематическое исследование 5: Azure MCP – корпоративный Protokol Context Model как услуга

Azure MCP Server ([https://aka.ms/azmcp](https://aka.ms/azmcp)) — это управляемая, корпоративного уровня реализация Протокола Контекста Модели от Microsoft, предназначенная для обеспечения масштабируемых, безопасных и соответствующих нормативам возможностей MCP серверов в облаке. Azure MCP позволяет организациям быстро развертывать, управлять и интегрировать MCP серверы с Azure AI, данными и сервисами безопасности, снижая операционные издержки и ускоряя внедрение ИИ.

> **🎯 Готовый к использованию инструмент**  
>   
> Это реальный MCP сервер, который вы можете использовать сегодня! Узнайте больше о Microsoft Foundry MCP Server в нашем [**Руководстве по серверам MCP Microsoft**](microsoft-mcp-servers.md).

- Полностью управляемый хостинг MCP серверов с встроенным масштабированием, мониторингом и безопасностью  
- Нативная интеграция с Azure OpenAI, Azure AI Search и другими сервисами Azure  
- Корпоративная аутентификация и авторизация через Microsoft Entra ID  
- Поддержка пользовательских инструментов, шаблонов подсказок и коннекторов ресурсов  
- Соответствие корпоративным требованиям безопасности и регуляторным нормам

**Техническая реализация:**

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
  
**Результаты:**  
- Сократило время достижения результата в корпоративных проектах ИИ, предоставив готовую к использованию, соответствующую требованиям платформу MCP сервера  
- Упростило интеграцию больших языковых моделей, инструментов и корпоративных источников данных  
- Повысило безопасность, наблюдаемость и эффективность эксплуатации MCP-нагрузок  
- Улучшило качество кода с помощью лучших практик Azure SDK и современных шаблонов аутентификации

**Ссылки:**  
- [Документация Azure MCP](https://aka.ms/azmcp)  
- [Репозиторий Azure MCP Server на GitHub](https://github.com/Azure/azure-mcp)  
- [AI-сервисы Azure](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Центр MCP Microsoft](https://mcp.azure.com)

## Тематическое исследование 6: NLWeb  
MCP (Протокол Контекста Модели) — это новый протокол для чат-ботов и ИИ-ассистентов для взаимодействия с инструментами. Каждый экземпляр NLWeb также является MCP сервером, поддерживающим один основной метод — ask, который используется для того, чтобы задать сайту вопрос на естественном языке. Возвращаемый ответ использует schema.org — широко применяемый словарь для описания веб-данных. Говоря упрощенно, MCP — это NLWeb, как HTTP — к HTML. NLWeb объединяет протоколы, форматы Schema.org и примерный код, чтобы помочь сайтам быстро создавать такие конечные точки, принося пользу как людям через разговорные интерфейсы, так и машинам через естественное взаимодействие агентов.

В NLWeb есть две отдельные компоненты:  
- Протокол, очень простой для начала, для взаимодействия с сайтом на естественном языке и формат, использующий json и schema.org для возвращаемого ответа. Подробнее смотрите в документации по REST API.  
- Простая реализация (1), использующая существующую разметку, для сайтов, которые можно представить в виде списков элементов (продукты, рецепты, достопримечательности, отзывы и т.д.). Вместе с набором виджетов пользовательского интерфейса сайты могут легко обеспечить разговорные интерфейсы для своего контента. Подробнее смотрите документацию «Жизнь запроса в чате».

**Ссылки:**  
- [Документация Azure MCP](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)

### Тематическое исследование 7: Microsoft Foundry MCP Server – интеграция корпоративных ИИ-агентов

Серверы Microsoft Foundry MCP демонстрируют, как MCP может использоваться для оркестровки и управления ИИ-агентами и рабочими процессами в корпоративных средах. Интегрируя MCP с Microsoft Foundry, организации могут стандартизировать взаимодействия агентов, использовать управление рабочими процессами Foundry и обеспечивать безопасное и масштабируемое развертывание.

> **🎯 Готовый к производству инструмент**  
>   
> Это реальный MCP сервер, который вы можете использовать сегодня! Подробнее о Microsoft Foundry MCP Server в нашем [**Руководстве по серверам MCP Microsoft**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Ключевые особенности:**  
- Комплексный доступ к экосистеме Azure AI, включая каталоги моделей и управление развертыванием  
- Индексация знаний с помощью Azure AI Search для приложений RAG  
- Инструменты оценки производительности моделей ИИ и обеспечение качества  
- Интеграция с каталогом и лабораториями Microsoft Foundry для передовых исследовательских моделей  
- Управление агентами и возможности оценки для производственных сценариев

**Результаты:**  
- Быстрая прототипизация и надежный мониторинг рабочих процессов ИИ-агентов  
- Бесшовная интеграция с сервисами Azure AI для продвинутых сценариев  
- Единый интерфейс для создания, развертывания и мониторинга агентовых цепочек  
- Повышенная безопасность, соответствие требованиям и эффективность эксплуатации в корпорациях  
- Ускоренное внедрение ИИ при сохранении контроля над сложными агентными процессами

**Ссылки:**  
- [Репозиторий Microsoft Foundry MCP Server на GitHub](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Интеграция Azure AI Agents с MCP (блог Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)

### Тематическое исследование 8: Foundry MCP Playground – эксперименты и прототипирование

Foundry MCP Playground предлагает готовую среду для экспериментов с MCP серверами и интеграцией Microsoft Foundry. Разработчики могут быстро создавать прототипы, тестировать и оценивать модели ИИ и рабочие процессы агентов, используя ресурсы из каталога и лабораторий Microsoft Foundry. Плейграунд упрощает настройку, предоставляет примерные проекты и поддерживает совместную разработку, облегчая изучение лучших практик и новых сценариев с минимальными затратами. Он особенно полезен для команд, которые хотят проверить идеи, поделиться экспериментами и ускорить обучение без сложной инфраструктуры. Снижая порог входа, плейграунд способствует инновациям и развитию сообщества в экосистеме MCP и Microsoft Foundry.

**Ссылки:**

- [Репозиторий Foundry MCP Playground на GitHub](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Тематическое исследование 9: Microsoft Learn Docs MCP Server – доступ к документации с поддержкой ИИ

Microsoft Learn Docs MCP Server — это облачный сервис, который предоставляет ИИ-ассистентам доступ к официальной документации Microsoft в режиме реального времени через Протокол Контекста Модели. Этот готовый к производству сервер подключается к обширной экосистеме Microsoft Learn и обеспечивает семантический поиск по всем официальным источникам документов Microsoft.

> **🎯 Готовый к производству инструмент**  
>   
> Это реальный MCP сервер, который вы можете использовать сегодня! Подробнее о Microsoft Learn Docs MCP Server в нашем [**Руководстве по серверам MCP Microsoft**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Ключевые особенности:**  
- Доступ в реальном времени к официальной документации Microsoft, документации Azure и Microsoft 365  
- Продвинутые возможности семантического поиска с пониманием контекста и намерений  
- Всегда актуальная информация по мере публикации контента Microsoft Learn  
- Полное покрытие Microsoft Learn, документации Azure и источников Microsoft 365  
- Возвращает до 10 качественных фрагментов контента с заголовками статей и URL

**Почему это важно:**  
- Решает проблему устаревших знаний ИИ по технологиям Microsoft  
- Обеспечивает ИИ-ассистентов доступом к последним функциям .NET, C#, Azure и Microsoft 365  
- Предоставляет авторитетную, первоисточниковую информацию для точной генерации кода  
- Необходим для разработчиков, работающих с быстро развивающимися технологиями Microsoft

**Результаты:**  
- Существенно повысилась точность кода, генерируемого ИИ, для технологий Microsoft  
- Сократилось время поиска актуальной документации и лучших практик  
- Повышена продуктивность разработчиков за счет контекстно-зависимого доступа к документации  
- Беспрепятственная интеграция с рабочими процессами разработки без выхода из IDE

**Ссылки:**  
- [Репозиторий Microsoft Learn Docs MCP Server на GitHub](https://github.com/MicrosoftDocs/mcp)  
- [Документация Microsoft Learn](https://learn.microsoft.com/)

## Практические проекты

### Проект 1: Создание MCP сервера с несколькими провайдерами

**Цель:** Создать MCP сервер, который может направлять запросы к нескольким поставщикам моделей ИИ на основе определенных критериев.

**Требования:**

- Поддержка как минимум трех разных поставщиков моделей (например, OpenAI, Anthropic, локальные модели)  
- Реализация механизма маршрутизации на основе метаданных запроса  
- Создание системы конфигурации для управления учетными данными провайдеров  
- Добавление кэширования для оптимизации производительности и сокращения затрат  
- Разработка простого дашборда для мониторинга использования

**Этапы реализации:**

1. Настройка базовой инфраструктуры MCP сервера  
2. Реализация адаптеров провайдеров для каждого сервиса моделей ИИ  
3. Создание логики маршрутизации на основе атрибутов запроса  
4. Добавление механизмов кэширования для частых запросов  
5. Разработка дашборда мониторинга  
6. Тестирование с разными шаблонами запросов

**Технологии:** Выбор из Python (.NET/Java/Python на ваш выбор), Redis для кэширования и простого веб-фреймворка для дашборда.

### Проект 2: Корпоративная система управления подсказками

**Цель:** Разработать систему на базе MCP для управления, версионирования и развертывания шаблонов подсказок в организации.

**Требования:**
- Создать централизованное хранилище для шаблонов запросов
- Реализовать версионирование и рабочие процессы утверждения
- Построить возможности тестирования шаблонов с использованием примерных входных данных
- Разработать ролевые механизмы контроля доступа
- Создать API для получения и развертывания шаблонов

**Шаги реализации:**

1. Спроектировать схему базы данных для хранения шаблонов
2. Создать основной API для операций CRUD с шаблонами
3. Реализовать систему версионирования
4. Построить рабочий процесс утверждения
5. Разработать тестовую инфраструктуру
6. Создать простой веб-интерфейс для управления
7. Интегрировать с MCP сервером

**Технологии:** Выбор фреймворка для бэкенда, SQL или NoSQL базы данных и фронтенд-фреймворка для интерфейса управления.

### Проект 3: Платформа генерации контента на основе MCP

**Цель:** Создать платформу генерации контента, которая использует MCP для обеспечения единообразных результатов в разных типах контента.

**Требования:**

- Поддержка нескольких форматов контента (блог-посты, социальные сети, маркетинговые тексты)
- Реализация генерации на основе шаблонов с возможностью настройки
- Создание системы рецензирования и обратной связи по контенту
- Отслеживание метрик производительности контента
- Поддержка версионирования и итераций контента

**Шаги реализации:**

1. Настроить инфраструктуру клиента MCP
2. Создать шаблоны для разных типов контента
3. Построить конвейер генерации контента
4. Реализовать систему рецензирования
5. Разработать систему отслеживания метрик
6. Создать пользовательский интерфейс для управления шаблонами и генерацией контента

**Технологии:** Предпочитаемый язык программирования, веб-фреймворк и система баз данных.

## Будущие направления технологии MCP

### Новые тренды

1. **Мультимодальный MCP**
   - Расширение MCP для стандартизации взаимодействия с моделями изображений, аудио и видео
   - Разработка кросс-модальных возможностей рассуждения
   - Стандартизированные форматы запросов для разных модальностей

2. **Федеративная инфраструктура MCP**
   - Распределённые сети MCP, способные обмениваться ресурсами между организациями
   - Стандартизированные протоколы для безопасного обмена моделями
   - Техники конфиденциальных вычислений

3. **Маркетплейсы MCP**
   - Экосистемы для обмена и монетизации шаблонов и плагинов MCP
   - Процессы обеспечения качества и сертификации
   - Интеграция с маркетплейсами моделей

4. **MCP для Edge-вычислений**
   - Адаптация стандартов MCP для устройств с ограниченными ресурсами на периферии сети
   - Оптимизированные протоколы для условий низкой пропускной способности
   - Специализированные реализации MCP для IoT-экосистем

5. **Регуляторные рамки**
   - Разработка расширений MCP для обеспечения соответствия нормативным требованиям
   - Стандартизированные журналы аудита и интерфейсы объяснимости
   - Интеграция с развивающимися рамками управления ИИ

### Решения MCP от Microsoft

Microsoft и Azure разработали несколько открытых репозиториев для помощи разработчикам в реализации MCP в различных сценариях:

#### Организация Microsoft

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) — MCP сервер Playwright для автоматизации браузера и тестирования
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) — MCP сервер OneDrive для локального тестирования и внесения вкладов сообщества
3. [NLWeb](https://github.com/microsoft/NlWeb) — NLWeb — это набор открытых протоколов и сопутствующих опенсорсных инструментов. Главная цель — создание базового слоя для AI Web

#### Организация Azure-Samples

1. [mcp](https://github.com/Azure-Samples/mcp) — ссылки на примеры, инструменты и ресурсы для создания и интеграции MCP серверов на Azure с использованием разных языков программирования
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) — эталонные MCP серверы, демонстрирующие аутентификацию по текущей спецификации Model Context Protocol
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) — посадочная страница для реализаций удалённых MCP серверов в Azure Functions с ссылками на языковые репозитории
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) — стартовый шаблон для создания и развертывания кастомных удалённых MCP серверов с использованием Azure Functions на Python
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) — стартовый шаблон для создания и развертывания кастомных удалённых MCP серверов с Azure Functions на .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) — стартовый шаблон для создания и развертывания кастомных удалённых MCP серверов с Azure Functions на TypeScript
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) — Azure API Management как AI Gateway к удалённым MCP серверам на Python
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) — эксперименты APIM ❤️ AI включая возможности MCP, интеграция с Azure OpenAI и AI Foundry

Эти репозитории предлагают различные реализации, шаблоны и ресурсы для работы с Model Context Protocol на разных языках программирования и службах Azure. Они покрывают широкий спектр сценариев — от базовых серверных реализаций до аутентификации, облачного развертывания и корпоративной интеграции.

#### Каталог ресурсов MCP

[Каталог ресурсов MCP](https://github.com/microsoft/mcp/tree/main/Resources) в официальном репозитории Microsoft MCP содержит кураторскую подборку примерных ресурсов, шаблонов запросов и определений инструментов для использования с MCP серверами. Этот каталог разработан для помощи разработчикам в быстром старте с MCP, предлагая повторно используемые строительные блоки и примеры лучших практик для:

- **Шаблонов запросов:** Готовые к использованию шаблоны для распространённых AI задач и сценариев, которые можно адаптировать для собственных реализаций MCP серверов.
- **Определений инструментов:** Примеры схем и метаданных инструментов для стандартизации интеграции и вызова инструментов на разных MCP серверах.
- **Примеров ресурсов:** Примеры описаний ресурсов для подключения к источникам данных, API и внешним сервисам в рамках MCP.
- **Референсных реализаций:** Практические образцы, демонстрирующие структуру и организацию ресурсов, шаблонов и инструментов в реальных MCP проектах.

Эти ресурсы ускоряют разработку, способствуют стандартизации и помогают соблюдать лучшие практики при создании и развертывании решений на базе MCP.

#### Каталог ресурсов MCP

- [Ресурсы MCP (примерные запросы, инструменты и определения ресурсов)](https://github.com/microsoft/mcp/tree/main/Resources)

### Возможности для исследований

- Эффективные методы оптимизации запросов в рамках MCP
- Модели безопасности для многоарендных MCP-развёртываний
- Бенчмаркинг производительности различных реализаций MCP
- Методы формальной верификации MCP серверов

## Заключение

Протокол Model Context Protocol (MCP) быстро формирует будущее стандартизированной, безопасной и совместимой интеграции ИИ во многих отраслях. На примерах кейсов и практических проектов этого урока вы увидели, как первопроходцы — включая Microsoft и Azure — используют MCP для решения реальных задач, ускорения внедрения ИИ и обеспечения соответствия требованиям, безопасности и масштабируемости. Модульный подход MCP позволяет организациям подключать большие языковые модели, инструменты и корпоративные данные в единую, аудитируемую систему. По мере развития MCP важно оставаться вовлечённым в сообщество, изучать открытые ресурсы и применять лучшие практики для создания надежных и готовых к будущему AI-решений.

## Дополнительные ресурсы

- [GitHub репозиторий MCP Foundry](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Интеграция Azure AI агентов с MCP (блог Microsoft Foundry)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [GitHub репозиторий MCP (Microsoft)](https://github.com/microsoft/mcp)
- [Каталог ресурсов MCP (примерные запросы, инструменты и определения ресурсов)](https://github.com/microsoft/mcp/tree/main/Resources)
- [Сообщество и документация MCP](https://modelcontextprotocol.io/introduction)
- [Спецификация MCP (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Документация Azure MCP](https://aka.ms/azmcp)
- [OWASP MCP Top 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) — рекомендации по безопасности
- [GitHub репозиторий Playwright MCP Server](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Решения Microsoft для ИИ и автоматизации](https://azure.microsoft.com/en-us/products/ai-services/)

## Упражнения

1. Проанализируйте один из кейсов и предложите альтернативный подход реализации.
2. Выберите одну из идей проектов и создайте подробную техническую спецификацию.
3. Исследуйте отрасль, не рассмотренную в кейсах, и опишите, как MCP может решить её специфические задачи.
4. Изучите одно из будущих направлений и разработайте концепцию нового расширения MCP для поддержки этого направления.

## Что дальше

Изучайте больше: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

Продолжить: [Модуль 8: Лучшие практики](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Отказ от ответственности**:
Этот документ был переведен с использованием сервиса машинного перевода [Co-op Translator](https://github.com/Azure/co-op-translator). Несмотря на наши усилия по обеспечению точности, имейте в виду, что автоматический перевод может содержать ошибки или неточности. Оригинальный документ на его исходном языке следует считать авторитетным источником. Для получения критически важной информации рекомендуется обратиться к профессиональному человеческому переводу. Мы не несем ответственности за любые недоразумения или неправильные толкования, возникшие в результате использования этого перевода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->