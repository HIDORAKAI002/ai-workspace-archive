# Имплементација Azure Content Safety са MCP

> **OWASP MCP Ризик који се третира**: [MCP06 - Prompt Injection преко Contextual Payloads](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/)

Да бисте оснажили MCP безбедност против prompt injection-а, тровања алата и других AI-специфичних слабости, топло се препоручује интеграција Azure Content Safety. Овај водич за имплементацију је у складу са [MCP Security Summit Workshop (Sherpa)](https://azure-samples.github.io/sherpa/) Камп 3: I/O Безбедност.

## Интеграција са MCP сервером

Да бисте интегрисали Azure Content Safety са вашим MCP сервером, додајте content safety филтер као middleware у ваш pipeline обраде захтева:

1. Иницијализујте филтер при покретању сервера  
2. Верификујте све долазне захтеве алата пре обраде  
3. Проверавајте све одлазне одговоре пре него што их вратите клијентима  
4. Логовање и упозорења о прекршајима безбедности  
5. Имплементирајте одговарајућу обраду грешака за пропале content safety провере  

Ово пружа јаку одбрану против:  
- Напада prompt injection-а  
- Пokušaja тровања алата  
- Експлоатације података путем злонамерних уноса  
- Генерисања штетног садржаја  

## Најбоље праксе за интеграцију Azure Content Safety

1. **Прилагођене блок-листе**: Направите прилагођене блок-листе посебно за MCP injection шаблоне  
2. **Подешавање озбиљности (Severity)**: Прилагодите прагове озбиљности у складу са вашим специфичним случајем коришћења и толеранцијом ризика  
3. **Комплетна покривеност**: Примена content safety провера на све уносе и излазе  
4. **Оптимизација перформанси**: Размотри кеширање за поновљене content safety провере  
5. **Механизми резервне опције**: Дефинишите јасне fallback понашања када content safety сервиси нису доступни  
6. **Повратна информација корисницима**: Обезбедите јасан фидбек корисницима када садржај буде блокиран због безбедносних разлога  
7. **Континуирано унапређење**: Редовно ажурирајте блок-листе и шаблоне на основу нових претњи  

## Додатни ресурси

### OWASP MCP Упутства за безбедност  
- [OWASP MCP Azure Security Guide](https://microsoft.github.io/mcp-azure-security-guide/) - Свеобухватан OWASP MCP Топ 10 са Azure имплементацијом  
- [MCP06 - Prompt Injection](https://microsoft.github.io/mcp-azure-security-guide/mcp/mcp06-prompt-injection/) - Детаљни шаблони за ублажавање prompt injection-а  
- [MCP Security Summit Workshop](https://azure-samples.github.io/sherpa/) - Hands-on Камп 3: I/O Безбедност покрива content safety  

### Azure документација  
- [Azure Content Safety Преглед](https://learn.microsoft.com/azure/ai-services/content-safety/)  
- [Prompt Shields документација](https://learn.microsoft.com/azure/ai-services/content-safety/concepts/jailbreak-detection)  
- [Azure AI Content Safety Quickstart](https://learn.microsoft.com/azure/ai-services/content-safety/quickstart-text)  

## Шта следи

- Вратите се на: [Security Module Overview](./README.md)  
- Наставите на: [Module 3: Getting Started](../03-GettingStarted/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Резервисање одговорности**:
Овај документ је преведен уз помоћ AI сервиса за превођење [Co-op Translator](https://github.com/Azure/co-op-translator). Иако тежимо тачности, молимо вас да имате у виду да аутоматизовани преводи могу садржати грешке или неточности. Оригинални документ на његовом језику сматра се ауторитетним извором. За критичне информације препоручује се професионални људски превод. Нисмо одговорни за било каква неспоразума или погрешна тумачења настала коришћењем овог превода.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->