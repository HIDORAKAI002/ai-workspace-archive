# Weather MCP Server

Ini adalah contoh MCP Server dalam Python yang melaksanakan alat cuaca dengan respons tiruan. Ia boleh digunakan sebagai kerangka untuk MCP Server anda sendiri. Ia merangkumi ciri-ciri berikut:

- **Alat Cuaca**: Alat yang menyediakan maklumat cuaca tiruan berdasarkan lokasi yang diberikan.
- **Alat Klon Git**: Alat yang mengklon repositori git ke folder yang ditentukan.
- **Alat Buka VS Code**: Alat yang membuka folder dalam VS Code atau VS Code Insiders.
- **Sambung ke Agent Builder**: Ciri yang membolehkan anda menyambungkan pelayan MCP ke Agent Builder untuk ujian dan pengesanan ralat.
- **Debug dalam [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Ciri yang membolehkan anda debug MCP Server menggunakan MCP Inspector.

## Mula dengan templat Weather MCP Server

> **Prasyarat**
>
> Untuk menjalankan MCP Server di mesin pembangunan tempatan anda, anda memerlukan:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Diperlukan untuk alat git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) atau [VS Code Insiders](https://code.visualstudio.com/insiders/) (Diperlukan untuk alat open_in_vscode)
> - (*Pilihan - jika anda lebih suka uv*) [uv](https://github.com/astral-sh/uv)
> - [Sambungan Debugger Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Sediakan persekitaran

Terdapat dua pendekatan untuk menyediakan persekitaran bagi projek ini. Anda boleh memilih mana-mana berdasarkan keutamaan anda.

> Nota: Muat semula VSCode atau terminal untuk memastikan python persekitaran maya digunakan selepas mencipta persekitaran maya.

| Pendekatan | Langkah |
| --------- | ------ |
| Menggunakan `uv` | 1. Cipta persekitaran maya: `uv venv` <br>2. Jalankan Perintah VSCode "***Python: Select Interpreter***" dan pilih python dari persekitaran maya yang dicipta <br>3. Pasang kebergantungan (termasuk kebergantungan pembangunan): `uv pip install -r pyproject.toml --extra dev` |
| Menggunakan `pip` | 1. Cipta persekitaran maya: `python -m venv .venv` <br>2. Jalankan Perintah VSCode "***Python: Select Interpreter***" dan pilih python dari persekitaran maya yang dicipta<br>3. Pasang kebergantungan (termasuk kebergantungan pembangunan): `pip install -e .[dev]` |

Selepas menyediakan persekitaran, anda boleh menjalankan pelayan di mesin pembangunan tempatan anda melalui Agent Builder sebagai MCP Client untuk memulakan:
1. Buka panel Debug VS Code. Pilih `Debug in Agent Builder` atau tekan `F5` untuk mula debug MCP server.
2. Gunakan AI Toolkit Agent Builder untuk menguji pelayan dengan [prompt ini](../../../../../../../../../../../open_prompt_builder). Pelayan akan disambungkan secara automatik ke Agent Builder.
3. Klik `Run` untuk menguji pelayan dengan prompt tersebut.

**Tahniah**! Anda berjaya menjalankan Weather MCP Server di mesin pembangunan tempatan anda melalui Agent Builder sebagai MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Apa yang disertakan dalam templat

| Folder / Fail | Kandungan                                   |
| ------------- | ------------------------------------------ |
| `.vscode`     | Fail VSCode untuk debugging                 |
| `.aitk`       | Konfigurasi untuk AI Toolkit                 |
| `src`         | Kod sumber untuk weather mcp server          |

## Cara debug Weather MCP Server

> Nota:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) adalah alat pembangun visual untuk menguji dan melakukan debug MCP servers.
> - Semua mod debug menyokong breakpoint, jadi anda boleh tambah breakpoint pada kod pelaksanaan alat.

## Alat yang Tersedia

### Alat Cuaca
Alat `get_weather` menyediakan maklumat cuaca tiruan untuk lokasi yang ditentukan.

| Parameter | Jenis | Penerangan |
| --------- | ----- | ---------- |
| `location` | string | Lokasi untuk mendapat cuaca (contoh: nama bandar, negeri, atau koordinat) |

### Alat Klon Git
Alat `git_clone_repo` mengklon repositori git ke folder yang ditentukan.

| Parameter | Jenis | Penerangan |
| --------- | ----- | ---------- |
| `repo_url` | string | URL repositori git yang akan diklon |
| `target_folder` | string | Laluan ke folder tempat repositori akan diklon |

Alat ini mengembalikan objek JSON dengan:
- `success`: Boolean yang menunjukkan sama ada operasi berjaya
- `target_folder` atau `error`: Laluan repositori yang diklon atau mesej ralat

### Alat Buka VS Code
Alat `open_in_vscode` membuka folder dalam aplikasi VS Code atau VS Code Insiders.

| Parameter | Jenis | Penerangan |
| --------- | ----- | ---------- |
| `folder_path` | string | Laluan ke folder untuk dibuka |
| `use_insiders` | boolean (pilihan) | Sama ada hendak guna VS Code Insiders dan bukan VS Code biasa |

Alat ini mengembalikan objek JSON dengan:
- `success`: Boolean yang menunjukkan sama ada operasi berjaya
- `message` atau `error`: Mesej pengesahan atau mesej ralat

| Mod Debug | Penerangan | Langkah untuk debug |
| --------- | ---------- | ------------------- |
| Agent Builder | Debug pelayan MCP dalam Agent Builder melalui AI Toolkit. | 1. Buka panel Debug VS Code. Pilih `Debug in Agent Builder` dan tekan `F5` untuk mula debug MCP server.<br>2. Gunakan AI Toolkit Agent Builder untuk menguji pelayan dengan [prompt ini](../../../../../../../../../../../open_prompt_builder). Pelayan akan disambungkan automatik ke Agent Builder.<br>3. Klik `Run` untuk menguji pelayan dengan prompt tersebut. |
| MCP Inspector | Debug pelayan MCP menggunakan MCP Inspector. | 1. Pasang [Node.js](https://nodejs.org/)<br> 2. Sediakan Inspector: `cd inspector` && `npm install` <br> 3. Buka panel Debug VS Code. Pilih `Debug SSE in Inspector (Edge)` atau `Debug SSE in Inspector (Chrome)`. Tekan F5 untuk mulakan debug.<br> 4. Bila MCP Inspector dilancarkan dalam pelayar, klik butang `Connect` untuk sambungkan MCP server ini.<br> 5. Kemudian anda boleh `List Tools`, pilih alat, masukkan parameter, dan `Run Tool` untuk debug kod pelayan anda.<br> |

## Port Lalai dan pengubahsuaian

| Mod Debug | Port | Definisi | Pengubahsuaian | Nota |
| --------- | ---- | -------- | ------------- | ---- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Sunting [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) untuk mengubah port tersebut. | N/A |
| MCP Inspector | 3001 (Pelayan); 5173 dan 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Sunting [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) untuk mengubah port tersebut.| N/A |

## Maklum Balas

Jika anda mempunyai sebarang maklum balas atau cadangan untuk templat ini, sila buka isu di repositori [AI Toolkit GitHub](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan perkhidmatan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Walaupun kami berusaha untuk ketepatan, sila ambil maklum bahawa terjemahan automatik mungkin mengandungi kesilapan atau ketidakakuratan. Dokumen asal dalam bahasa asalnya hendaklah dianggap sebagai sumber yang sah. Untuk maklumat penting, terjemahan profesional oleh manusia adalah disyorkan. Kami tidak bertanggungjawab atas sebarang salah faham atau salah tafsir yang timbul daripada penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->