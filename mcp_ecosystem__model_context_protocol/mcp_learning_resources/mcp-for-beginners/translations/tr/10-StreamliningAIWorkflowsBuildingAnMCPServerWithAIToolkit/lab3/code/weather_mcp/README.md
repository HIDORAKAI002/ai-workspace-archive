# Weather MCP Server

Bu, sahte yanıtlarla hava durumu araçlarını uygulayan Python'da örnek bir MCP Sunucusudur. Kendi MCP Sunucunuz için bir iskelet olarak kullanılabilir. Aşağıdaki özellikleri içerir:

- **Hava Durumu Aracı**: Verilen konuma göre sahte hava durumu bilgisi sağlayan bir araç.
- **Agent Builder'a Bağlanma**: MCP sunucusunu test ve hata ayıklama için Agent Builder'a bağlamanızı sağlayan bir özellik.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) ile Hata Ayıklama**: MCP Sunucusunu MCP Inspector kullanarak hata ayıklamanızı sağlayan bir özellik.

## Weather MCP Server şablonuyla başlayın

> **Önkoşullar**
>
> MCP Sunucusunu yerel geliştirme makinenizde çalıştırmak için şunlara ihtiyacınız olacak:
>
> - [Python](https://www.python.org/)
> - (*İsteğe bağlı - uv tercih ediyorsanız*) [uv](https://github.com/astral-sh/uv)
> - [Python Hata Ayıklayıcı Eklentisi](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Ortamı hazırlayın

Bu proje için ortamı kurmanın iki yaklaşımı vardır. Tercihinize göre birini seçebilirsiniz.

> Not: Sanal ortamı oluşturduktan sonra kullanılan python'un sanal ortamdan olduğundan emin olmak için VSCode veya terminali yeniden başlatın.

| Yaklaşım | Adımlar |
| -------- | ------- |
| `uv` kullanarak | 1. Sanal ortam oluşturun: `uv venv` <br>2. VSCode Komutunu çalıştırın "***Python: Select Interpreter***" ve oluşturulan sanal ortamdan python'u seçin <br>3. Bağımlılıkları (geliştirme dahil) yükleyin: `uv pip install -r pyproject.toml --extra dev` |
| `pip` kullanarak | 1. Sanal ortam oluşturun: `python -m venv .venv` <br>2. VSCode Komutunu çalıştırın "***Python: Select Interpreter***" ve oluşturulan sanal ortamdan python'u seçin<br>3. Bağımlılıkları (geliştirme dahil) yükleyin: `pip install -e .[dev]` |

Ortamı kurduktan sonra, MCP İstemcisi olarak Agent Builder üzerinden yerel geliştirme makinenizde sunucuyu çalıştırabilirsiniz:
1. VS Code Hata Ayıklama panelini açın. `Debug in Agent Builder` seçin veya MCP sunucusunu hata ayıklamaya başlamak için `F5` tuşuna basın.
2. Microsoft Foundry Toolkit Agent Builder'ı kullanarak [bu prompt](../../../../../../../../../../../open_prompt_builder) ile sunucuyu test edin. Sunucu otomatik olarak Agent Builder'a bağlanacaktır.
3. Prompt ile sunucuyu test etmek için `Run` düğmesine tıklayın.

**Tebrikler**! Agent Builder üzerinden MCP İstemcisi olarak yerel geliştirme makinenizde Weather MCP Server'ı başarıyla çalıştırdınız.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Şablonda neler var

| Klasör / Dosya | İçerikler                                  |
| -------------- | ------------------------------------------ |
| `.vscode`      | Hata ayıklama için VSCode dosyaları        |
| `.aitk`        | Microsoft Foundry Toolkit için yapılandırmalar |
| `src`          | weather mcp sunucusunun kaynak kodu         |

## Weather MCP Server nasıl hata ayıklanır

> Notlar:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) MCP sunucularını test ve hata ayıklama için görsel bir geliştirici aracıdır.
> - Tüm hata ayıklama modları kesme noktalarını destekler, böylece araç uygulama koduna kesme noktaları ekleyebilirsiniz.

| Hata Ayıklama Modu | Açıklama | Hata Ayıklama Adımları |
| ------------------ | -------- | ----------------------- |
| Agent Builder | MCP sunucusunu Microsoft Foundry Toolkit üzerinden Agent Builder'da hata ayıklayın. | 1. VS Code Hata Ayıklama panelini açın. `Debug in Agent Builder` seçin ve MCP sunucusunu hata ayıklamaya başlamak için `F5` tuşuna basın.<br>2. Microsoft Foundry Toolkit Agent Builder'ı kullanarak [bu prompt](../../../../../../../../../../../open_prompt_builder) ile sunucuyu test edin. Sunucu otomatik bağlanacaktır.<br>3. Prompt ile sunucuyu test etmek için `Run` düğmesine tıklayın. |
| MCP Inspector | MCP sunucusunu MCP Inspector kullanarak hata ayıklayın. | 1. [Node.js](https://nodejs.org/) kurun<br> 2. Inspector'ı kurun: `cd inspector` ve `npm install` <br> 3. VS Code Hata Ayıklama panelini açın. `Debug SSE in Inspector (Edge)` veya `Debug SSE in Inspector (Chrome)` seçin. Hata ayıklamaya başlamak için F5'e basın.<br> 4. MCP Inspector tarayıcıda açıldığında, bu MCP sunucusuna bağlanmak için `Connect` düğmesine tıklayın.<br> 5. Ardından `List Tools` yapabilir, bir araç seçebilir, parametre girebilir ve sunucu kodunuzu hata ayıklamak için `Run Tool` yapabilirsiniz.<br> |

## Varsayılan Portlar ve Özelleştirmeler

| Hata Ayıklama Modu | Portlar | Tanımlar | Özelleştirmeler | Not |
| ------------------ | ------- | -------- | --------------- | --- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Yukarıdaki portları değiştirmek için [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) dosyalarını düzenleyin. | Yok |
| MCP Inspector | 3001 (Sunucu); 5173 ve 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Yukarıdaki portları değiştirmek için [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) dosyalarını düzenleyin.| Yok |

## Geri bildirim

Bu şablonla ilgili herhangi bir geri bildiriminiz veya öneriniz varsa, lütfen [Microsoft Foundry Toolkit GitHub deposunda](https://github.com/microsoft/vscode-ai-toolkit/issues) bir konu açın.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:
Bu belge, AI çeviri hizmeti [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba sarf etsek de, otomatik çevirilerin hata veya yanlışlık içerebileceğini lütfen unutmayınız. Orijinal belge, kendi dilinde yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı sonucu ortaya çıkabilecek yanlış anlamalardan veya yanlış yorumlamalardan sorumlu değiliz.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->