# Weather MCP Sunucusu

Bu, sahte yanıtlarla hava durumu araçlarını uygulayan Python'da bir örnek MCP Sunucusudur. Kendi MCP Sunucunuz için bir iskelet olarak kullanılabilir. Aşağıdaki özellikleri içerir:

- **Hava Durumu Aracı**: Verilen konuma dayalı olarak sahte hava durumu bilgisi sağlayan bir araç.
- **Agent Builder'a Bağlanma**: MCP sunucusunu test ve hata ayıklama için Agent Builder'a bağlamanızı sağlayan bir özellik.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) ile Hata Ayıklama**: MCP Sunucusunu MCP Inspector kullanarak hata ayıklamanıza olanak tanıyan bir özellik.

## Weather MCP Sunucu şablonuna başlarken

> **Önkoşullar**
>
> MCP Sunucuyu yerel geliştirme makinenizde çalıştırmak için ihtiyacınız olacak:
>
> - [Python](https://www.python.org/)
> - (*İsteğe bağlı - uv tercih ederseniz*) [uv](https://github.com/astral-sh/uv)
> - [Python Hata Ayıklayıcı Uzantısı](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Ortamı hazırlama

Bu proje için ortam kurulumunun iki yolu vardır. Tercihinize göre birini seçebilirsiniz.

> Not: Sanal ortam oluşturduktan sonra sanal ortam python'unun kullanılmasını sağlamak için VSCode veya terminali yeniden yükleyin.

| Yöntem | Adımlar |
| ------- | ------- |
| `uv` kullanarak | 1. Sanal ortam oluşturun: `uv venv` <br>2. VSCode Komutunu çalıştırın "***Python: Select Interpreter***" ve oluşturulan sanal ortamın python'unu seçin <br>3. Bağımlılıkları (geliştirme bağımlılıkları dahil) yükleyin: `uv pip install -r pyproject.toml --extra dev` |
| `pip` kullanarak | 1. Sanal ortam oluşturun: `python -m venv .venv` <br>2. VSCode Komutunu çalıştırın "***Python: Select Interpreter***" ve oluşturulan sanal ortamın python'unu seçin<br>3. Bağımlılıkları (geliştirme bağımlılıkları dahil) yükleyin: `pip install -e .[dev]` |

Ortamı ayarladıktan sonra yerel geliştirme makinenizde Agent Builder aracılığıyla MCP İstemcisi olarak sunucuyu çalıştırarak başlayabilirsiniz:
1. VS Code Hata Ayıklama panelini açın. `Debug in Agent Builder` seçeneğini seçin veya MCP sunucusunu hata ayıklamaya başlamak için `F5` tuşuna basın.
2. AI Toolkit Agent Builder'ı kullanarak [bu istemle](../../../../../../../../../../../open_prompt_builder) sunucuyu test edin. Sunucu otomatik olarak Agent Builder'a bağlanacaktır.
3. İstemle sunucuyu test etmek için `Run` (Çalıştır) düğmesine tıklayın.

**Tebrikler**! Weather MCP Sunucusunu yerel geliştirme makinenizde Agent Builder aracılığıyla MCP İstemcisi olarak başarıyla çalıştırdınız.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Şablonda neler var

| Klasör / Dosya| İçerik                                    |
| --------------| ----------------------------------------- |
| `.vscode`     | Hata ayıklama için VSCode dosyaları      |
| `.aitk`       | AI Toolkit yapılandırmaları               |
| `src`         | Hava durumu mcp sunucusunun kaynak kodu  |

## Weather MCP Sunucusunu nasıl hata ayıklarsınız

> Notlar:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector), MCP sunucularını test etmek ve hata ayıklamak için görsel bir geliştirici aracıdır.
> - Tüm hata ayıklama modları kesme noktalarını destekler, böylece araç uygulama koduna kesme noktaları ekleyebilirsiniz.

| Hata Ayıklama Modu | Açıklama | Hata Ayıklama Adımları |
| ------------------ | -------- | ---------------------- |
| Agent Builder | AI Toolkit aracılığıyla MCP sunucusunu Agent Builder içinde hata ayıklayın. | 1. VS Code Hata Ayıklama panelini açın. `Debug in Agent Builder` seçin ve MCP sunucusunu hata ayıklamaya başlamak için `F5` tuşuna basın.<br>2. AI Toolkit Agent Builder'ı kullanarak [bu istemle](../../../../../../../../../../../open_prompt_builder) sunucuyu test edin. Sunucu otomatik olarak Agent Builder'a bağlanacaktır.<br>3. İstemle sunucuyu test etmek için `Run` (Çalıştır) düğmesine tıklayın. |
| MCP Inspector | MCP Inspector kullanarak MCP sunucusunu hata ayıklayın. | 1. [Node.js](https://nodejs.org/) yükleyin<br> 2. Inspector'ı ayarlayın: `cd inspector` && `npm install` <br> 3. VS Code Hata Ayıklama panelini açın. `Debug SSE in Inspector (Edge)` veya `Debug SSE in Inspector (Chrome)` seçin. Hata ayıklamayı başlatmak için F5'e basın.<br> 4. MCP Inspector tarayıcıda başlatıldığında, bu MCP sunucusuna bağlanmak için `Connect` düğmesine tıklayın.<br> 5. Ardından `List Tools` (Araçları Listele), bir araç seçin, parametreleri girin ve `Run Tool` (Aracı Çalıştır) ile sunucu kodunuzu hata ayıklayın.<br> |

## Varsayılan Portlar ve Özelleştirmeler

| Hata Ayıklama Modu | Portlar | Tanımlar | Özelleştirmeler | Not |
| ------------------ | ------- | -------- | --------------- | --- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Yukarıdaki portları değiştirmek için [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) dosyalarını düzenleyin. | YOK |
| MCP Inspector | 3001 (Sunucu); 5173 ve 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Yukarıdaki portları değiştirmek için [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) dosyalarını düzenleyin. | YOK |

## Geri bildirim

Bu şablonla ilgili geri bildiriminiz veya önerileriniz varsa, lütfen [AI Toolkit GitHub deposunda](https://github.com/microsoft/vscode-ai-toolkit/issues) bir sorun açın.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu belge, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluğa özen göstersek de, otomatik çevirilerin hatalar veya yanlışlıklar içerebileceğini lütfen unutmayınız. Orijinal belge, bulunduğu dildeki resmi ve yetkili kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımından doğacak herhangi bir yanlış anlama veya yorum hatasından sorumlu tutulamayız.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->