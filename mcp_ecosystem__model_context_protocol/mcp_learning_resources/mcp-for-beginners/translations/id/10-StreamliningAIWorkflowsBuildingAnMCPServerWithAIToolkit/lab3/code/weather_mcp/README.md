# Weather MCP Server

Ini adalah contoh MCP Server dalam Python yang mengimplementasikan alat cuaca dengan respons tiruan. Ini dapat digunakan sebagai kerangka untuk MCP Server Anda sendiri. Ini mencakup fitur-fitur berikut:

- **Alat Cuaca**: Sebuah alat yang menyediakan informasi cuaca tiruan berdasarkan lokasi yang diberikan.
- **Menghubungkan ke Agent Builder**: Fitur yang memungkinkan Anda menghubungkan MCP server ke Agent Builder untuk pengujian dan debugging.
- **Debug di [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Fitur yang memungkinkan Anda melakukan debug MCP Server menggunakan MCP Inspector.

## Memulai dengan template Weather MCP Server

> **Prasyarat**
>
> Untuk menjalankan MCP Server di mesin pengembangan lokal Anda, Anda memerlukan:
>
> - [Python](https://www.python.org/)
> - (*Opsional - jika Anda memilih uv*) [uv](https://github.com/astral-sh/uv)
> - [Ekstensi Debugger Python](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Menyiapkan lingkungan

Ada dua pendekatan untuk mengatur lingkungan untuk proyek ini. Anda dapat memilih salah satu berdasarkan preferensi Anda.

> Catatan: Muat ulang VSCode atau terminal untuk memastikan python lingkungan virtual digunakan setelah membuat lingkungan virtual.

| Pendekatan | Langkah-langkah |
| -------- | ----- |
| Menggunakan `uv` | 1. Buat lingkungan virtual: `uv venv` <br>2. Jalankan Perintah VSCode "***Python: Select Interpreter***" dan pilih python dari lingkungan virtual yang dibuat <br>3. Instal dependensi (termasuk dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| Menggunakan `pip` | 1. Buat lingkungan virtual: `python -m venv .venv` <br>2. Jalankan Perintah VSCode "***Python: Select Interpreter***" dan pilih python dari lingkungan virtual yang dibuat<br>3. Instal dependensi (termasuk dev dependencies): `pip install -e .[dev]` |

Setelah menyiapkan lingkungan, Anda dapat menjalankan server di mesin pengembangan lokal Anda melalui Agent Builder sebagai MCP Client untuk memulai:
1. Buka panel Debug VS Code. Pilih `Debug in Agent Builder` atau tekan `F5` untuk mulai melakukan debug MCP server.
2. Gunakan AI Toolkit Agent Builder untuk menguji server dengan [prompt ini](../../../../../../../../../../../open_prompt_builder). Server akan terhubung otomatis ke Agent Builder.
3. Klik `Run` untuk menguji server dengan prompt tersebut.

**Selamat**! Anda telah berhasil menjalankan Weather MCP Server di mesin pengembangan lokal Anda melalui Agent Builder sebagai MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Apa saja yang termasuk dalam template

| Folder / File| Isi                                     |
| ------------ | -------------------------------------------- |
| `.vscode`    | Berkas VSCode untuk debugging                   |
| `.aitk`      | Konfigurasi untuk AI Toolkit                |
| `src`        | Kode sumber untuk weather mcp server   |

## Cara melakukan debug Weather MCP Server

> Catatan:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) adalah alat pengembang visual untuk menguji dan debug server MCP.
> - Semua mode debugging mendukung breakpoint, jadi Anda dapat menambahkan breakpoint pada kode implementasi alat.

| Mode Debug | Deskripsi | Langkah untuk debug |
| ---------- | ----------- | --------------- |
| Agent Builder | Debug MCP server di Agent Builder melalui AI Toolkit. | 1. Buka panel Debug VS Code. Pilih `Debug in Agent Builder` dan tekan `F5` untuk memulai debug MCP server.<br>2. Gunakan AI Toolkit Agent Builder untuk menguji server dengan [prompt ini](../../../../../../../../../../../open_prompt_builder). Server akan terhubung otomatis ke Agent Builder.<br>3. Klik `Run` untuk menguji server dengan prompt tersebut. |
| MCP Inspector | Debug MCP server menggunakan MCP Inspector. | 1. Instal [Node.js](https://nodejs.org/)<br> 2. Siapkan Inspector: `cd inspector` && `npm install` <br> 3. Buka panel Debug VS Code. Pilih `Debug SSE in Inspector (Edge)` atau `Debug SSE in Inspector (Chrome)`. Tekan F5 untuk mulai debug.<br> 4. Ketika MCP Inspector terbuka di browser, klik tombol `Connect` untuk menghubungkan MCP server ini.<br> 5. Kemudian Anda bisa `List Tools`, pilih alat, input parameter, dan `Run Tool` untuk debug kode server Anda.<br> |

## Port Default dan kustomisasi

| Mode Debug | Port | Definisi | Kustomisasi | Catatan |
| ---------- | ----- | ------------ | -------------- |-------------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) untuk mengubah port di atas. | N/A |
| MCP Inspector | 3001 (Server); 5173 dan 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab3/code/weather_mcp/.aitk/mcp.json) untuk mengubah port di atas.| N/A |

## Umpan balik

Jika Anda memiliki umpan balik atau saran untuk template ini, silakan buka isu di [repositori GitHub AI Toolkit](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk mencapai akurasi, harap diketahui bahwa terjemahan otomatis mungkin mengandung kesalahan atau ketidaktepatan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sah dan utama. Untuk informasi penting, disarankan menggunakan penerjemahan profesional oleh manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau salah penafsiran yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->