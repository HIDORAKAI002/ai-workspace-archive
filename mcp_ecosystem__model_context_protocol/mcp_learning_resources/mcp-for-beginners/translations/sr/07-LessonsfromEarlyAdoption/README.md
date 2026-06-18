# 🌟 Поучне приче раних усвајача

[![Поучне приче раних усвајача MCP-а](../../../translated_images/sr/08.980bb2babbaadd8a.webp)](https://youtu.be/jds7dSmNptE)

_(Кликните на слику горе да бисте гледали видео о овој лекцији)_

## 🎯 Шта овај модул обухвата

Овај модул истражује како стварне организације и програмери користе Протокол контекста модела (MCP) за решавање стварних изазова и подстицање иновација. Кроз детаљне студије случаја, практичне пројекте и примере, открићете како MCP омогућава безбедну, скалабилну интеграцију вештачке интелигенције која повезује језичке моделе, алате и податке предузећа.

### 📚 Погледајте MCP у акцији

Желите да видите примењене ове принципе у алатима спремним за продукцију? Погледајте наш [**10 Microsoft MCP сервера који трансформишу продуктивност програмера**](microsoft-mcp-servers.md), који приказује праве Microsoft MCP сервере које можете користити већ данас.

## Преглед

Ова лекција приказује како су рани усвајачи користили Протокол контекста модела (MCP) за решавање стварних изазова и подстицање иновација у различитим индустријама. Кроз детаљне студије случаја и практичне пројекте, видећете како MCP омогућава стандардизовану, безбедну и скалабилну интеграцију вештачке интелигенције – повезујући велике језичке моделе, алате и податке предузећа у јединственом оквиру. Стекнућете практично искуство у дизајнирању и изградњи решења заснованих на MCP-у, научити о провереним моделима имплементације и открити најбоље праксе за распоређивање MCP-а у продуктивним окружењима. Лекција такође истиче нове трендове, будуће смернице и ресурсe отвореног кода који ће вам помоћи да останете на челу MCP технологије и њеног еволуирајућег екосистема.

## Циљеви учења

- Анализирати реалне имплементације MCP-а у различитим индустријама  
- Дизајнирати и изградити комплетне апликације засноване на MCP-у  
- Истражити нове трендове и будуће смернице у MCP технологији  
- Применити најбоље праксе у стварним развојним сценаријима  

## Реалне MCP имплементације

### Студија случаја 1: Аутоматизација корисничке подршке у предузећима

Међународна корпорација имплементирала је решење засновано на MCP-у да стандардује интеракције са вештачком интелигенцијом у својим системима корисничке подршке. Ово им је омогућило да:

- Креирају јединствени интерфејс за више добављача LLM модела  
- Одржавају доследно управљање упитима у различитим одељењима  
- Спроведу робусне контроле безбедности и усаглашености  
- Лако мењају између разних AI модела на основу специфичних потреба  

**Техничка имплементација:**

```python
# Имплементација Python MCP сервера за корисничку подршку
import logging
import asyncio
from modelcontextprotocol import create_server, ServerConfig
from modelcontextprotocol.server import MCPServer
from modelcontextprotocol.transports import create_http_transport
from modelcontextprotocol.resources import ResourceDefinition
from modelcontextprotocol.prompts import PromptDefinition
from modelcontextprotocol.tool import ToolDefinition

# Конфигуриши евиденцију
logging.basicConfig(level=logging.INFO)

async def main():
    # Креирај конфигурацију сервера
    config = ServerConfig(
        name="Enterprise Customer Support Server",
        version="1.0.0",
        description="MCP server for handling customer support inquiries"
    )
    
    # Иницијализуј MCP сервер
    server = create_server(config)
    
    # Региструј ресурсе базе знања
    server.resources.register(
        ResourceDefinition(
            name="customer_kb",
            description="Customer knowledge base documentation"
        ),
        lambda params: get_customer_documentation(params)
    )
    
    # Региструј шаблоне упита
    server.prompts.register(
        PromptDefinition(
            name="support_template",
            description="Templates for customer support responses"
        ),
        lambda params: get_support_templates(params)
    )
    
    # Региструј алате за подршку
    server.tools.register(
        ToolDefinition(
            name="ticketing",
            description="Create and update support tickets"
        ),
        handle_ticketing_operations
    )
    
    # Покрени сервер са HTTP транспортом
    transport = create_http_transport(port=8080)
    await server.run(transport)

if __name__ == "__main__":
    asyncio.run(main())
```
  
**Резултати:** 30% смањење трошкова модела, 45% побољшање конзистентности одговора и повећана усаглашеност у глобалним операцијама.

### Студија случаја 2: Помоћник за здравствену дијагностику

Пружалац здравствених услуга развио је MCP инфраструктуру да интегрише више специјализованих медицинских AI модела уз обезбеђивање заштите осетљивих података пацијената:

- Безпрекорно пребацивање између општих и специјалистичких медицинских модела  
- Строга контрола приватности и записи о ревизији  
- Интеграција са постојећим системима електронских здравствених картона (EHR)  
- Доследно креирање упита уз медицинску терминологију  

**Техничка имплементација:**

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
  
**Резултати:** Побољшани предлози за дијагнозу лекара уз пуну HIPAA усаглашеност и значајно смањење пребацивања контекста између система.

### Студија случаја 3: Анализа ризика у финансијским услугама

Финансијска институција имплементирала је MCP ради стандардизације процеса анализе ризика у различитим одељењима:

- Креиран јединствени интерфејс за моделе ризика кредита, преваре и инвестиција  
- Спроведене строге контроле приступа и верзионисање модела  
- Осигурана ревизија свих AI препорука  
- Одржано доследно форматирање података у различитим системима  

**Техничка имплементација:**

```java
// Јава MCP сервер за процену финансијског ризика
import org.mcp.server.*;
import org.mcp.security.*;

public class FinancialRiskMCPServer {
    public static void main(String[] args) {
        // Креирај MCP сервер са функцијама финансијске усклађености
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
  
**Резултати:** Појачана регулаторна усаглашеност, 40% бржи циклуси развоја модела и побољшана конзистентност процене ризика у одељењима.

### Студија случаја 4: Microsoft Playwright MCP сервер за аутоматизацију прегледача

Microsoft је развио [Playwright MCP сервер](https://github.com/microsoft/playwright-mcp) за омогућавање безбедне, стандардизоване аутоматизације прегледача преко Протокола контекста модела. Овај сервер спреман за продукцију омогућава AI агентима и LLM-овима интеракцију са веб прегледачима на контролисан, ревидирајући и проширив начин — омогућавајући случајеве коришћења као што су аутоматско тестирање веба, екстракција података и крај-до-крај радни токови.

> **🎯 Алат спреман за продукцију**  
>  
> Ова студија случаја приказује прави MCP сервер који можете користити већ данас! Сазнајте више о Playwright MCP серверу и још 9 других Microsoft MCP сервера у нашем [**Водичу за Microsoft MCP сервере**](microsoft-mcp-servers.md#8--playwright-mcp-server).

**Кључне карактеристике:**  
- Излаже могућности аутоматизације прегледача (навигација, попуњавање формулара, снимање слика екрана итд.) као MCP алате  
- Имплементира строге контроле приступа и изолацију да спречи неовлашћене акције  
- Обезбеђује детаљне логове свих интеракција са прегледачем  
- Подржава интеграцију са Azure OpenAI и осталим LLM добављачима за аутоматизацију вођену агентима  
- Покреће функције GitHub Copilot-овог агента за кодирање са могућностима веб прегледа  

**Техничка имплементација:**

```typescript
// TypeScript: Регистрација алата за аутоматизацију претраживача Playwright на MCP серверу
import { createServer, ToolDefinition } from 'modelcontextprotocol';
import { launch } from 'playwright';

const server = createServer({
  name: 'Playwright MCP Server',
  version: '1.0.0',
  description: 'MCP server for browser automation using Playwright'
});

// Региструј алат за навигацију до URL адресе и снимање снимака екрана
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

// Покрени MCP сервер
server.listen(8080);
```
  
**Резултати:**  

- Омогућена безбедна, програмски управљана аутоматизација прегледача за AI агенте и LLM-ове  
- Смањен ручни рад у тестирању и побољшана покривеност тестовима веб апликација  
- Обезбеђен поновљив и проширив оквир за интеграцију алата заснованих на прегледачу у корпоративним окружењима  
- Покреће могућности веб прегледа GitHub Copilota  

**Референце:**  

- [Playwright MCP Server GitHub репозиторијум](https://github.com/microsoft/playwright-mcp)  
- [Microsoft AI и решења за аутоматизацију](https://azure.microsoft.com/en-us/products/ai-services/)  

### Студија случаја 5: Azure MCP – Протокол контекста модела као услуга за предузећа

Azure MCP сервер ([https://aka.ms/azmcp](https://aka.ms/azmcp)) је Microsoft-ова управљана, предузећима прилагођена имплементација Протокола контекста модела, дизајнирана да пружи скалабилне, безбедне и усаглашене могућности MCP сервера као сервис у облаку. Azure MCP омогућава организацијама брзо распоређивање, управљање и интеграцију MCP сервера са Azure AI, подацима и безбедносним услугама, смањујући оперативни трошак и убрзавајући усвајање AI технологија.

> **🎯 Алат спреман за продукцију**  
>  
> Ово је прави MCP сервер који можете користити већ данас! Сазнајте више о Microsoft Foundry MCP серверу у нашем [**Водичу за Microsoft MCP сервере**](microsoft-mcp-servers.md).

- Потпуно управљан хостинг MCP сервера са уграђеним скалирањем, надзором и безбедношћу  
- Натична интеграција са Azure OpenAI, Azure AI Search и другим Azure услугама  
- Аутентикација и ауторизација за предузећа преко Microsoft Entra ID  
- Подршка за прилагођене алате, шаблоне упита и конекторе ресурса  
- Усаглашеност са безбедносним и регулаторним захтевима предузећа  

**Техничка имплементација:**

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
  
**Резултати:**  
- Скратило време до вредности за AI пројекте у предузећима обезбеђујући спремну за употребу, усаглашену MCP сервер платформу  
- Једноставнија интеграција LLM модела, алата и извора података предузећа  
- Побољшана безбедност, видљивост и оперативна ефикасност за MCP радне оптерећења  
- Побољшан квалитет кода уз најбоље праксе Azure SDK и актуелне обрасце аутентификације  

**Референце:**  
- [Azure MCP документација](https://aka.ms/azmcp)  
- [Azure MCP Server GitHub репозиторијум](https://github.com/Azure/azure-mcp)  
- [Azure AI услуге](https://azure.microsoft.com/en-us/products/ai-services/)  
- [Microsoft MCP центар](https://mcp.azure.com)  

## Студија случаја 6: NLWeb  

MCP (Протокол контекста модела) је нови протокол за ћаскање ботова и AI асистената који комуницирају са алатима. Свака NLWeb инстанца је такође MCP сервер, који подржава једну основну методу, ask (питај), која се користи за постављање питања веб сајту на природном језику. Одговор се враћа користећи schema.org, широко коришћен речник за описивање веб података. У општем смислу, MCP је NLWeb као што је Http према HTML-у. NLWeb комбинује протоколе, schema.org формате и пример кода да би помогао сајтовима да брзо креирају ове крајње тачке, користећи погодности како за људе кроз конверзацијски интерфејс, тако и за машине кроз природну интеракцију агенат-према-агенту.

Постоје две значајне компоненте NLWeb-а.  
- Протокол, веома једноставан за почетак, за интеракцију са сајтом на природном језику и формат, користећи json и schema.org за враћени одговор. Погледајте документацију о REST API-ју за више детаља.  
- Једноставна имплементација (1), која користи постојеће означавање, за сајтове које се могу апстраховати као листе ставки (производи, рецепти, атракције, рецензије итд.). Заједно са скупом уређаја корисничког интерфејса, сајтови лако могу пружити конверзацијске интерфејсе за свој садржај. Погледајте документацију о Life of a chat query за више детаља о функционисању.  
 
**Референце:**  
- [Azure MCP документација](https://aka.ms/azmcp)  
- [NLWeb](https://github.com/microsoft/NlWeb)  

### Студија случаја 7: Microsoft Foundry MCP сервер – интеграција AI агената у предузећима

Microsoft Foundry MCP сервери показују како се MCP може користити за оркестрацију и управљање AI агентима и радним токовима у предузећима. Интеграцијом MCP-а са Microsoft Foundry, организације могу стандардизовати интеракције агената, користити управљање радним токовима Foundry-а и обезбедити безбедна, скалабилна распоређивања.

> **🎯 Алат спреман за продукцију**  
>  
> Ово је прави MCP сервер који можете користити већ данас! Сазнајте више о Microsoft Foundry MCP серверу у нашем [**Водичу за Microsoft MCP сервере**](microsoft-mcp-servers.md#9--microsoft-foundry-mcp-server).

**Кључне карактеристике:**  
- Комплетан приступ Azure AI екосистему, укључујући каталоге модела и управљање распоређивањем  
- Индексација знања уз Azure AI Search за RAG апликације  
- Алатке за процену перформанси AI модела и осигурање квалитета  
- Интеграција са Microsoft Foundry Catalog и Labs за најсавременије истраживачке моделе  
- Управљање агентима и могућности евалуације за продуктивне сценарије  

**Резултати:**  
- Брзо прототипирање и робусно праћење AI агентских радних токова  
- Беспрекорна интеграција са Azure AI услугама за напредне сценарије  
- Јединствени интерфејс за изградњу, распоређивање и надзор агентских цевовода  
- Побољшана безбедност, усаглашеност и оперативна ефикасност у предузећима  
- Убрзано усвајање AI уз контролу сложених процеса вођених агентима  

**Референце:**  
- [Microsoft Foundry MCP Server GitHub репозиторијум](https://github.com/azure-ai-foundry/mcp-foundry)  
- [Интеграција Azure AI агената са MCP (Microsoft Foundry блог)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)  

### Студија случаја 8: Foundry MCP Playground – експериментисање и прототипизација

Foundry MCP Playground пружа окружење спремно за употребу за експериментисање са MCP серверима и интеграцијама Microsoft Foundry-а. Програмери могу брзо правити прототипове, тестирати и процењивати AI моделе и агентске радне токове користећи ресурсе из Microsoft Foundry каталога и лабораторија. Playgorund поједностављује подешавање, пружа примерке пројеката и подржава сараднички развој, олакшавајући истраживање најбољих пракси и нових сценарија са минималним оптерећењем. Посебно је користан тимовима који желе да потврде идеје, деле експерименте и убрзају учење без потребе за сложеном инфраструктуром. Смањујући баријере за улазак, игралиште помаже у подстицању иновација и доприноса заједнице у MCP и Microsoft Foundry екосистему.

**Референце:**

- [Foundry MCP Playground GitHub репозиторијум](https://github.com/azure-ai-foundry/foundry-mcp-playground)

### Студија случаја 9: Microsoft Learn Docs MCP сервер – приступ документацији покретаној AI-јем

Microsoft Learn Docs MCP сервер је услуга у облаку која AI асистентима пружа приступ званичној Microsoft документацији у реалном времену преко Протокола контекста модела. Овај сервер спреман за продукцију повезује се са свеобухватним Microsoft Learn екосистемом и омогућава семантичко претраживање свих званичних Microsoft извора.

> **🎯 Алат спреман за продукцију**  
>  
> Ово је прави MCP сервер који можете користити већ данас! Сазнајте више о Microsoft Learn Docs MCP серверу у нашем [**Водичу за Microsoft MCP сервере**](microsoft-mcp-servers.md#1--microsoft-learn-docs-mcp-server).

**Кључне карактеристике:**  
- Приступ у реалном времену званичној Microsoft документацији, Azure документацији и Microsoft 365 документацији  
- Напредне могућности семантичког претраживања које разумеју контекст и намеру  
- Увек ажуриране информације како Microsoft Learn садржај се објављује  
- Комплетна покривеност Microsoft Learn, Azure документације и Microsoft 365 извора  
- Враћа до 10 квалитетних делова садржаја са насловима чланака и URL адресама  

**Зашто је критично:**  
- Решава проблем „застарелог AI знања“ за Microsoft технологије  
- Осигурава да AI асистенти имају приступ најновијим .NET, C#, Azure и Microsoft 365 функцијама  
- Пружа ауторативне, првокласне информације за прецизно генерисање кода  
- Неопходно за програмере који раде са брзо развијајућим Microsoft технологијама  

**Резултати:**  
- Драматично побољшана прецизност AI-јем генерисаног кода за Microsoft технологије  
- Скраћено време претраге актуелне документације и најбољих пракси  
- Побољшана продуктивност програмера уз приступ документацији осетљивој на контекст  
- Беспрекорна интеграција са развојним токовима без напуштања IDE-а  

**Референце:**  
- [Microsoft Learn Docs MCP сервер GitHub репозиторијум](https://github.com/MicrosoftDocs/mcp)  
- [Microsoft Learn документација](https://learn.microsoft.com/)  

## Практични пројекти

### Пројекат 1: Направите MCP сервер са више провајдера

**Циљ:** Креирати MCP сервер који може усмеравати захтеве ка више провајдера AI модела на основу специфичних критеријума.

**Захтеви:**

- Подршка за најмање три различита провајдера модела (нпр. OpenAI, Anthropic, локални модели)  
- Имплементација механизма усмеравања заснованог на метаподацима захтева  
- Креирање система конфигурације за управљање акредитивима провајдера  
- Додавање кеширања за оптимизацију перформанси и трошкова  
- Изградња једноставне контролне табле за праћење коришћења  

**Кораци имплементације:**

1. Подесите основну инфраструктуру MCP сервера  
2. Имплементирајте адаптере провајдера за сваки AI сервис модела  
3. Креирајте логику усмеравања засновану на атрибутима захтева  
4. Додајте механизме кеширања за честе захтеве  
5. Развијте контролну таблу за праћење  
6. Тестирајте са разним шемама захтева  

**Технологије:** Изаберите између Python ( .NET/Java/Python у складу са вашим преференцијама), Redis за кеширање и једноставан веб фрејмворк за контролну таблу.

### Пројекат 2: Систем управљања шаблонима упита за предузећа

**Циљ:** Развити систем заснован на MCP-у за управљање, верзионисање и распоређивање шаблона упита у оквиру организације.

**Захтеви:**
- Креирајте централно складиште за шаблоне упита
- Имплементирајте верзионисање и токове одобравања
- Изградите могућности тестирања шаблона са примерима уноса
- Развијте контролу приступа засновану на улогама
- Креирајте API за преузимање и примењивање шаблона

**Кораци имплементације:**

1. Дизајнирајте шему базе података за чување шаблона
2. Креирајте основни API за CRUD операције са шаблонима
3. Имплементирајте систем верзионисања
4. Изградите ток одобравања
5. Развијте оквир за тестирање
6. Креирајте једноставан веб интерфејс за управљање
7. Интегришите се са MCP сервером

**Технологије:** Ваш избор backend фрејмворка, SQL или NoSQL базе података, и frontend фрејмворка за интерфејс управљања.

### Пројекат 3: Платформа за генерисање садржаја заснована на MCP

**Циљ:** Изградити платформу за генерисање садржаја која користи MCP како би обезбедила конзистентне резултате преко различитих типова садржаја.

**Захтеви:**

- Подршка за више формата садржаја (блог постови, друштвени медији, маркетиншки текстови)
- Имплементација генерације засноване на шаблонима са опцијама прилагођавања
- Креирање система за ревизију садржаја и повратне информације
- Праћење метрика перформанси садржаја
- Подршка за верзионисање и итерацију садржаја

**Кораци имплементације:**

1. Поставите MCP клиентску инфраструктуру
2. Креирајте шаблоне за различите типове садржаја
3. Изградите пипелине за генерисање садржаја
4. Имплементирајте систем ревизије
5. Развијте систем за праћење метрика
6. Креирајте кориснички интерфејс за управљање шаблонима и генерисање садржаја

**Технологије:** Ваша омиљена програмска језика, веб фрејмворк и систем базе података.

## Будући правци MCP технологије

### Успонући трендови

1. **Мулти-модални MCP**
   - Проширење MCP-а за стандардизацију интеракција са моделима слика, звука и видеа
   - Развој способности крос-модалног резоновања
   - Стандардизовани формати упита за различите модалитете

2. **Децентрализована MCP инфраструктура**
   - Распоређене MCP мреже које могу делити ресурсе између организација
   - Стандардизовани протоколи за безбедно дељење модела
   - Технике рачунања који штите приватност

3. **MCP тржишта**
   - Екосистеми за дељење и монетизацију MCP шаблона и плагина
   - Процеси осигурања квалитета и сертификовања
   - Интеграција са тржиштима модела

4. **MCP за ивично рачунање (Edge Computing)**
   - Прилагођавање MCP стандарда за уређаје са ограниченим ресурсима
   - Оптимизовани протоколи за окружења са малим протоком података
   - Специјализоване MCP имплементације за IoT екосистеме

5. **Регулаторни оквири**
   - Развој MCP проширења за регулаторну усаглашеност
   - Стандардизовани ревизорски трагови и интерфејси за објашњивост
   - Интеграција са новоусталим оквирима управљања вештачком интелигенцијом

### MCP решења од Microsoft-а

Microsoft и Azure развили су неколико open-source репозиторијума који помажу програмерима да имплементирају MCP у различитим сценаријима:

#### Microsoft организација

1. [playwright-mcp](https://github.com/microsoft/playwright-mcp) - Playwright MCP сервер за аутоматизацију прегледача и тестирање
2. [files-mcp-server](https://github.com/microsoft/files-mcp-server) - OneDrive MCP сервер имплементација за локално тестирање и допринос заједници
3. [NLWeb](https://github.com/microsoft/NlWeb) - NLWeb је збирка отворених протокола и повезаних алата отвореног кода. Главни фокус је успостављање основног слоја за AI Web

#### Azure-Samples организација

1. [mcp](https://github.com/Azure-Samples/mcp) - Линкови ка узорцима, алатима и ресурсима за изградњу и интеграцију MCP сервера на Azure користећи више језика
2. [mcp-auth-servers](https://github.com/Azure-Samples/mcp-auth-servers) - Референтни MCP сервери који показују аутентификацију према тренутној спецификацији Model Context Protocol-а
3. [remote-mcp-functions](https://github.com/Azure-Samples/remote-mcp-functions) - Почетна страница за имплементације Remote MCP Server-а у Azure Functions са линковима ка репоима за различите језике
4. [remote-mcp-functions-python](https://github.com/Azure-Samples/remote-mcp-functions-python) - Премијер шаблон за изградњу и деплојовање прилагођених remote MCP сервера коришћењем Azure Functions са Python-ом
5. [remote-mcp-functions-dotnet](https://github.com/Azure-Samples/remote-mcp-functions-dotnet) - Премијер шаблон за изградњу и деплојовање прилагођених remote MCP сервера коришћењем Azure Functions са .NET/C#
6. [remote-mcp-functions-typescript](https://github.com/Azure-Samples/remote-mcp-functions-typescript) - Премијер шаблон за изградњу и деплојовање прилагођених remote MCP сервера коришћењем Azure Functions са TypeScript-ом
7. [remote-mcp-apim-functions-python](https://github.com/Azure-Samples/remote-mcp-apim-functions-python) - Azure API Management као AI Gateway ка remote MCP серверима коришћењем Python-а
8. [AI-Gateway](https://github.com/Azure-Samples/AI-Gateway) - APIM ❤️ AI експерименти укључујући MCP могућности, интеграцију са Azure OpenAI и AI Foundry

Ови репозиторијуми нуде различите имплементације, шаблоне и ресурсе за рад са Model Context Protocol-ом у различитим програмским језицима и Azure услугама. Обухватају низ случајева употребе од основних имплементација сервера до аутентификације, облачног деплоја и сценарија корпоративне интеграције.

#### MCP Resources Directory

[Каталог MCP Resources](https://github.com/microsoft/mcp/tree/main/Resources) у званичном Microsoft MCP репозиторијуму пружа курирани скуп узорака ресурса, шаблона упита и дефиниција алата за употребу са Model Context Protocol серверима. Овај каталог је осмишљен да помогне програмерима да брзо почну са MCP пружајући поново употребљиве грађевинске блокове и примере најбољих пракси за:

- **Шаблони упита:** Спремни за употребу шаблони упита за уобичајене AI задатке и сценарије, који се могу прилагодити вашим имплементацијама MCP сервера.
- **Дефиниције алата:** Примерне шеме алата и метаподаци за стандардизацију интеграције и позива алата у различитим MCP серверима.
- **Примери ресурса:** Примерне дефиниције ресурса за повезивање са изворима података, API-јима и спољним услугама у MCP оквиру.
- **Референтне имплементације:** Практични узорци који демонстрирају како структурирати и организовати ресурсе, упите и алате у реалним MCP пројектима.

Ови ресурси убрзавају развој, промовишу стандардизацију и помажу у обезбеђивању најбољих пракси приликом изградње и имплементације решења заснованих на MCP-у.

#### MCP Resources Directory

- [MCP Resources (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)

### Истраживачке прилике

- Ефикасне технике оптимизације упита у MCP оквирима
- Безбедносни модели за MCP имплементације са више корисника
- Мерење перформанси различитих MCP имплементација
- Формалне методе верификације за MCP сервере

## Закључак

Model Context Protocol (MCP) брзо обликује будућност стандардизоване, безбедне и интероперабилне интеграције вештачке интелигенције у различитим индустријама. Кроз студије случајева и практичне пројекте у овом лекцији, видели сте како рани усвајачи — укључујући Microsoft и Azure — користе MCP за решавање стварних изазова, убрзавање усвајања AI, и обезбеђење усаглашености, безбедности и скалабилности. Модуларни приступ MCP-а омогућава организацијама повезивање великих језичких модела, алата и корпоративних података у јединствен, ревидирајући оквир. Како MCP наставља да се развија, останак ангажован у заједници, проучавање open-source ресурса и примена најбољих пракси ће бити кључни за изградњу робусних решења спремних за будућност AI.

## Додатни ресурси

- [MCP Foundry GitHub репозиторијум](https://github.com/azure-ai-foundry/mcp-foundry)
- [Foundry MCP Playground](https://github.com/azure-ai-foundry/foundry-mcp-playground)
- [Интеграција Azure AI агената са MCP (Microsoft Foundry блог)](https://devblogs.microsoft.com/foundry/integrating-azure-ai-agents-mcp/)
- [MCP GitHub репозиторијум (Microsoft)](https://github.com/microsoft/mcp)
- [MCP Resources Directory (Sample Prompts, Tools, and Resource Definitions)](https://github.com/microsoft/mcp/tree/main/Resources)
- [MCP заједница и документација](https://modelcontextprotocol.io/introduction)
- [MCP спецификација (2025-11-25)](https://spec.modelcontextprotocol.io/specification/2025-11-25/)
- [Azure MCP документација](https://aka.ms/azmcp)
- [OWASP MCP ТОП 10](https://microsoft.github.io/mcp-azure-security-guide/mcp/) - Најбоље безбедносне праксе
- [Playwright MCP Server GitHub репозиторијум](https://github.com/microsoft/playwright-mcp)
- [Files MCP Server (OneDrive)](https://github.com/microsoft/files-mcp-server)
- [Azure-Samples MCP](https://github.com/Azure-Samples/mcp)
- [MCP Auth Servers (Azure-Samples)](https://github.com/Azure-Samples/mcp-auth-servers)
- [Remote MCP Functions (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions)
- [Remote MCP Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-python)
- [Remote MCP Functions .NET (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-dotnet)
- [Remote MCP Functions TypeScript (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-functions-typescript)
- [Remote MCP APIM Functions Python (Azure-Samples)](https://github.com/Azure-Samples/remote-mcp-apim-functions-python)
- [AI-Gateway (Azure-Samples)](https://github.com/Azure-Samples/AI-Gateway)
- [Microsoft AI and Automation Solutions](https://azure.microsoft.com/en-us/products/ai-services/)

## Вежбе

1. Анализирајте једну од студија случаја и предложите алтернативни приступ имплементације.
2. Изаберите једну од идеја за пројекат и креирајте детаљну техничку спецификацију.
3. Истражите индустрију која није обухваћена студијама случаја и опишите како би MCP могао да реши њене специфичне изазове.
4. Проучите један од будућих праваца и креирајте концепт новог MCP проширења које га подржава.

## Шта следи

Истражите више: [Microsoft MCP Servers](./microsoft-mcp-servers.md)

Наставите са: [Модул 8: Најбоље праксе](../08-BestPractices/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Изјава о одрицању одговорности**:
Овај документ је преведен коришћењем услуге за аутоматски превод [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, имајте у виду да аутоматски преводи могу садржати грешке или нетачности. Оригинални документ на његовом изворном језику треба сматрати ауторитативним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења која произилазе из коришћења овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->