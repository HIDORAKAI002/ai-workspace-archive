# Weather MCP Sunucusu

Bu, sahte yanıtlarla hava araçlarını uygulayan Python'da örnek bir MCP Sunucusudur. Kendi MCP Sunucunuz için bir iskelet olarak kullanılabilir. Şu özellikleri içerir:

- **Hava Aracı**: Verilen konuma göre sahte hava durumu bilgisi sağlayan bir araç.
- **Git Clone Aracı**: Bir git deposunu belirtilen klasöre klonlayan bir araç.
- **VS Code Açma Aracı**: Bir klasörü VS Code veya VS Code Insiders uygulamasında açan bir araç.
- **Agent Builder'a Bağlanma**: MCP sunucusunu test ve hata ayıklama için Agent Builder'a bağlamanızı sağlayan bir özellik.
- **[MCP Inspector](https://github.com/modelcontextprotocol/inspector) ile Hata Ayıklama**: MCP Sunucusunu MCP Inspector kullanarak hata ayıklamanızı sağlayan bir özellik.

## Weather MCP Sunucusu şablonuna başlama

> **Önkoşullar**
>
> MCP Sunucusunu yerel geliştirme makinenizde çalıştırmak için ihtiyacınız olacak:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (git_clone_repo aracı için gerekli)
> - [VS Code](https://code.visualstudio.com/) veya [VS Code Insiders](https://code.visualstudio.com/insiders/) (open_in_vscode aracı için gerekli)
> - (*Opsiyonel - uv tercih ederseniz*) [uv](https://github.com/astral-sh/uv)
> - [Python Hata Ayıklayıcı Eklentisi](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Ortamı Hazırlama

Bu proje için ortamı hazırlamanın iki yolu vardır. Tercihinize göre birini seçebilirsiniz.

> Not: Sanal ortam oluşturulduktan sonra sanal ortam Python'un kullanıldığından emin olmak için VSCode veya terminali yeniden başlatın.

| Yöntem | Adımlar |
| -------- | ----- |
| `uv` kullanarak | 1. Sanal ortam oluşturun: `uv venv` <br>2. VSCode Komutundan "***Python: Interpreter Seç***" çalıştırın ve oluşturulan sanal ortamın Python'unu seçin<br>3. Bağımlılıkları (geliştirme bağımlılıkları dahil) yükleyin: `uv pip install -r pyproject.toml --extra dev` |
| `pip` kullanarak | 1. Sanal ortam oluşturun: `python -m venv .venv` <br>2. VSCode Komutundan "***Python: Interpreter Seç***" çalıştırın ve oluşturulan sanal ortamın Python'unu seçin<br>3. Bağımlılıkları (geliştirme bağımlılıkları dahil) yükleyin: `pip install -e .[dev]` |

Ortam hazırlandıktan sonra, yerel geliştirme makinenizde Agent Builder üzerinden MCP Client olarak sunucuyu çalıştırabilirsiniz:
1. VS Code Hata Ayıklama panelini açın. `Agent Builder'da Hata Ayıkla` seçeneğini seçin veya MCP sunucusunu hata ayıklamaya başlamak için `F5` tuşuna basın.
2. AI Toolkit Agent Builder'ı kullanarak [bu istemle](../../../../../../../../../../../open_prompt_builder) sunucuyu test edin. Sunucu otomatik olarak Agent Builder'a bağlanacaktır.
3. İstemle sunucuyu test etmek için `Çalıştır` butonuna tıklayın.

**Tebrikler**! Weather MCP Sunucusunu yerel geliştirme makinenizde Agent Builder üzerinden MCP Client olarak başarıyla çalıştırdınız.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Şablonda neler var

| Klasör / Dosya| İçerik                                      |
| ------------ | -------------------------------------------- |
| `.vscode`    | Hata ayıklama için VSCode dosyaları          |
| `.aitk`      | AI Toolkit yapılandırmaları                   |
| `src`        | Weather MCP sunucusunun kaynak kodu          |

## Weather MCP Sunucusunu nasıl hata ayıklarsınız

> Notlar:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector), MCP sunucularını test etmek ve hata ayıklamak için görsel bir geliştirici aracıdır.
> - Tüm hata ayıklama modları kesme noktalarını destekler, böylece araç uygulama koduna kesme noktaları ekleyebilirsiniz.

## Mevcut Araçlar

### Hava Aracı
`get_weather` aracı, belirtilen konum için sahte hava durumu bilgisi sağlar.

| Parametre | Tür | Açıklama |
| --------- | ---- | ----------- |
| `location` | string | Hava bilgisi alınacak konum (örn. şehir adı, eyalet veya koordinatlar) |

### Git Clone Aracı
`git_clone_repo` aracı, bir git deposunu belirtilen klasöre klonlar.

| Parametre | Tür | Açıklama |
| --------- | ---- | ----------- |
| `repo_url` | string | Klonlanacak git deposunun URL'si |
| `target_folder` | string | Depo klonlanacak klasör yolu |

Araç şu yapıda bir JSON döner:
- `success`: İşlemin başarılı olup olmadığını gösteren Boolean
- `target_folder` veya `error`: Klonlanan deponun yolu veya hata mesajı

### VS Code Açma Aracı
`open_in_vscode` aracı, bir klasörü VS Code veya VS Code Insiders uygulamasında açar.

| Parametre | Tür | Açıklama |
| --------- | ---- | ----------- |
| `folder_path` | string | Açılacak klasörün yolu |
| `use_insiders` | boolean (opsiyonel) | Normal VS Code yerine VS Code Insiders kullanılıp kullanılmayacağı |

Araç şu yapıda bir JSON döner:
- `success`: İşlemin başarılı olup olmadığını gösteren Boolean
- `message` veya `error`: Onay mesajı veya hata mesajı

| Hata Ayıklama Modu | Açıklama | Hata Ayıklama Adımları |
| ---------- | ----------- | --------------- |
| Agent Builder | MCP sunucusunu AI Toolkit üzerinden Agent Builder'da hata ayıklayın. | 1. VS Code Hata Ayıklama panelini açın. `Agent Builder'da Hata Ayıkla` seçeneğini seçin ve MCP sunucusunun hata ayıklamasını başlatmak için `F5`'e basın.<br>2. AI Toolkit Agent Builder ile [bu istemle](../../../../../../../../../../../open_prompt_builder) sunucuyu test edin. Sunucu otomatik olarak Agent Builder'a bağlanacaktır.<br>3. İstemle sunucuyu test etmek için `Çalıştır` butonuna tıklayın. |
| MCP Inspector | MCP Inspector kullanarak MCP sunucusunu hata ayıklayın. | 1. [Node.js](https://nodejs.org/) kurun<br> 2. Inspector kurulumu: `cd inspector` && `npm install` <br> 3. VS Code Hata Ayıklama panelini açın. `Inspector'da SSE'yi Hata Ayıkla (Edge)` veya `Inspector'da SSE'yi Hata Ayıkla (Chrome)` seçin. Hata ayıklamayı başlatmak için F5'e basın.<br> 4. MCP Inspector tarayıcıda açıldığında, bu MCP sunucusuna bağlanmak için `Bağlan` butonuna tıklayın.<br> 5. Sonra `Araçları Listele`, bir araç seç, parametreleri gir ve `Aracı Çalıştır` ile sunucu kodunuzu hata ayıklayın.<br> |

## Varsayılan Portlar ve Özelleştirmeler

| Hata Ayıklama Modu | Portlar | Tanımlar | Özelleştirmeler | Not |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Yukarıdaki portları değiştirmek için [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) dosyalarını düzenleyin. | Uygulanamaz |
| MCP Inspector | 3001 (Sunucu); 5173 ve 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Yukarıdaki portları değiştirmek için [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) dosyalarını düzenleyin.| Uygulanamaz |

## Geribildirim

Bu şablon hakkında herhangi bir geri bildiriminiz veya öneriniz varsa, lütfen [AI Toolkit GitHub deposunda](https://github.com/microsoft/vscode-ai-toolkit/issues) bir issue açın.

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Feragatname**:  
Bu doküman, AI çeviri servisi [Co-op Translator](https://github.com/Azure/co-op-translator) kullanılarak çevrilmiştir. Doğruluk için çaba gösterilse de, otomatik çevirilerin hata veya eksiklikler içerebileceğini lütfen unutmayınız. Orijinal dokümanın kendi dilindeki versiyonu otoritatif kaynak olarak kabul edilmelidir. Kritik bilgiler için profesyonel insan çevirisi önerilir. Bu çevirinin kullanımı nedeniyle oluşabilecek herhangi bir yanlış anlama veya yanlış yorumdan sorumlu olmayız.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->