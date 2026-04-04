# Weather MCP Server

Ini adalah contoh MCP Server dalam Python yang mengimplementasikan alat cuaca dengan respons palsu. Ini dapat digunakan sebagai kerangka untuk MCP Server Anda sendiri. Ini mencakup fitur-fitur berikut: 

- **Weather Tool**: Alat yang menyediakan informasi cuaca palsu berdasarkan lokasi yang diberikan.
- **Git Clone Tool**: Alat yang mengkloning repositori git ke folder yang ditentukan.
- **VS Code Open Tool**: Alat yang membuka folder di VS Code atau VS Code Insiders.
- **Connect to Agent Builder**: Fitur yang memungkinkan Anda menghubungkan server MCP ke Agent Builder untuk pengujian dan debugging.
- **Debug in [MCP Inspector](https://github.com/modelcontextprotocol/inspector)**: Fitur yang memungkinkan Anda melakukan debug MCP Server menggunakan MCP Inspector.

## Memulai dengan template Weather MCP Server

> **Persyaratan Awal**
>
> Untuk menjalankan MCP Server di mesin dev lokal Anda, Anda memerlukan:
>
> - [Python](https://www.python.org/)
> - [Git](https://git-scm.com/) (Diperlukan untuk alat git_clone_repo)
> - [VS Code](https://code.visualstudio.com/) atau [VS Code Insiders](https://code.visualstudio.com/insiders/) (Diperlukan untuk alat open_in_vscode)
> - (*Opsional - jika Anda lebih suka uv*) [uv](https://github.com/astral-sh/uv)
> - [Python Debugger Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy)

## Persiapkan lingkungan

Ada dua cara untuk mengatur lingkungan untuk proyek ini. Anda dapat memilih salah satu sesuai preferensi Anda.

> Catatan: Muat ulang VSCode atau terminal untuk memastikan python lingkungan virtual digunakan setelah membuat lingkungan virtual.

| Cara     | Langkah-langkah                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------ |
| Menggunakan `uv` | 1. Buat lingkungan virtual: `uv venv` <br>2. Jalankan Perintah VSCode "***Python: Select Interpreter***" dan pilih python dari lingkungan virtual yang dibuat <br>3. Instal dependensi (termasuk dev dependencies): `uv pip install -r pyproject.toml --extra dev` |
| Menggunakan `pip` | 1. Buat lingkungan virtual: `python -m venv .venv` <br>2. Jalankan Perintah VSCode "***Python: Select Interpreter***" dan pilih python dari lingkungan virtual yang dibuat<br>3. Instal dependensi (termasuk dev dependencies): `pip install -e .[dev]` |

Setelah mengatur lingkungan, Anda dapat menjalankan server di mesin dev lokal Anda melalui Agent Builder sebagai MCP Client untuk memulai:
1. Buka panel Debug VS Code. Pilih `Debug in Agent Builder` atau tekan `F5` untuk mulai melakukan debugging server MCP.
2. Gunakan AI Toolkit Agent Builder untuk menguji server dengan [prompt ini](../../../../../../../../../../../open_prompt_builder). Server akan terkoneksi otomatis ke Agent Builder.
3. Klik `Run` untuk menguji server dengan prompt tersebut.

**Selamat!** Anda telah berhasil menjalankan Weather MCP Server di mesin dev lokal Anda melalui Agent Builder sebagai MCP Client.
![DebugMCP](https://raw.githubusercontent.com/microsoft/windows-ai-studio-templates/refs/heads/dev/mcpServers/mcp_debug.gif)

## Apa yang termasuk dalam template

| Folder / File| Isi                                             |
| ------------ | ------------------------------------------------ |
| `.vscode`    | File VSCode untuk debugging                     |
| `.aitk`      | Konfigurasi untuk AI Toolkit                     |
| `src`        | Kode sumber untuk weather mcp server             |

## Cara melakukan debug Weather MCP Server

> Catatan:
> - [MCP Inspector](https://github.com/modelcontextprotocol/inspector) adalah alat pengembang visual untuk pengujian dan debugging server MCP.
> - Semua mode debugging mendukung breakpoint, sehingga Anda dapat menambahkan breakpoint ke kode implementasi alat.

## Tools yang tersedia

### Weather Tool
Alat `get_weather` menyediakan informasi cuaca palsu untuk lokasi tertentu.

| Parameter | Tipe | Deskripsi |
| --------- | ---- | --------- |
| `location` | string | Lokasi untuk mendapatkan cuaca (misalnya nama kota, negara bagian, atau koordinat) |

### Git Clone Tool
Alat `git_clone_repo` mengkloning sebuah repositori git ke folder yang ditentukan.

| Parameter | Tipe | Deskripsi |
| --------- | ---- | --------- |
| `repo_url` | string | URL repositori git yang akan dikloning |
| `target_folder` | string | Jalur ke folder tempat repositori akan dikloning |

Alat mengembalikan objek JSON dengan:
- `success`: Boolean yang menunjukkan apakah operasi berhasil
- `target_folder` atau `error`: Jalur repositori yang dikloning atau pesan kesalahan

### VS Code Open Tool
Alat `open_in_vscode` membuka folder di aplikasi VS Code atau VS Code Insiders.

| Parameter | Tipe | Deskripsi |
| --------- | ---- | --------- |
| `folder_path` | string | Jalur ke folder yang akan dibuka |
| `use_insiders` | boolean (opsional) | Apakah menggunakan VS Code Insiders sebagai pengganti VS Code biasa |

Alat mengembalikan objek JSON dengan:
- `success`: Boolean yang menunjukkan apakah operasi berhasil
- `message` atau `error`: Pesan konfirmasi atau pesan kesalahan

| Mode Debug | Deskripsi | Langkah untuk debug |
| ---------- | --------- | ------------------- |
| Agent Builder | Debug server MCP dalam Agent Builder melalui AI Toolkit. | 1. Buka panel Debug VS Code. Pilih `Debug in Agent Builder` dan tekan `F5` untuk mulai debug server MCP.<br>2. Gunakan AI Toolkit Agent Builder untuk menguji server dengan [prompt ini](../../../../../../../../../../../open_prompt_builder). Server akan terkoneksi otomatis ke Agent Builder.<br>3. Klik `Run` untuk menguji server dengan prompt. |
| MCP Inspector | Debug server MCP menggunakan MCP Inspector. | 1. Instal [Node.js](https://nodejs.org/)<br>2. Siapkan Inspector: `cd inspector` && `npm install` <br>3. Buka panel Debug VS Code. Pilih `Debug SSE in Inspector (Edge)` atau `Debug SSE in Inspector (Chrome)`. Tekan F5 untuk mulai debug.<br>4. Saat MCP Inspector diluncurkan di browser, klik tombol `Connect` untuk menghubungkan server MCP ini.<br>5. Kemudian Anda dapat `List Tools`, memilih alat, memasukkan parameter, dan `Run Tool` untuk debug kode server Anda.<br> |

## Port Default dan kustomisasi

| Mode Debug | Port | Definisi | Kustomisasi | Catatan |
| ---------- | ----- | -------- | ------------ | -------- |
| Agent Builder | 3001 | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) untuk mengubah port di atas. | N/A |
| MCP Inspector | 3001 (Server); 5173 dan 3000 (Inspector) | [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json) | Edit [launch.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/launch.json), [tasks.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.vscode/tasks.json), [\_\_init\_\_.py](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/src/__init__.py), [mcp.json](../../../../../../10-StreamliningAIWorkflowsBuildingAnMCPServerWithAIToolkit/lab4/code/github_mcp_server/.aitk/mcp.json) untuk mengubah port di atas. | N/A |

## Umpan balik

Jika Anda memiliki umpan balik atau saran untuk template ini, silakan buka issue di [AI Toolkit GitHub repository](https://github.com/microsoft/vscode-ai-toolkit/issues)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Penafian**:  
Dokumen ini telah diterjemahkan menggunakan layanan terjemahan AI [Co-op Translator](https://github.com/Azure/co-op-translator). Meskipun kami berupaya untuk memberikan terjemahan yang akurat, harap diingat bahwa terjemahan otomatis dapat mengandung kesalahan atau ketidaktepatan. Dokumen asli dalam bahasa aslinya harus dianggap sebagai sumber yang sahih. Untuk informasi penting, disarankan menggunakan layanan terjemahan profesional manusia. Kami tidak bertanggung jawab atas kesalahpahaman atau interpretasi yang salah yang timbul dari penggunaan terjemahan ini.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->